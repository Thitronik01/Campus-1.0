/* ============================================================================
   THITRONIK Campus 2026 - Lichtstrahlen im Hintergrund

   Portierung von LightRays (reactbits.dev) auf reines WebGL.

   Das Original ist eine React-Komponente auf Basis der Bibliothek ogl. Beides
   gibt es in diesem Projekt nicht, und beides nur fuer eine Dekoration
   einzufuehren waere zu teuer: der Bogen soll eine einzelne Datei bleiben, die
   per Doppelklick laeuft, ohne Build und ohne Paketverwaltung. Der Effekt
   selbst haengt an keiner der beiden Abhaengigkeiten - er ist ein einzelnes
   Dreieck ueber die volle Flaeche mit einem Fragment-Shader. Genau das steht
   hier, in etwa hundert Zeilen und ohne Fremdcode.

   Die Shader-Logik ist unveraendert uebernommen. Angepasst sind nur:
     - die Praezisionsangabe ist abgesichert, damit auch aeltere Handy-GPUs
       ohne highp im Fragment-Shader nicht auf einen Linkfehler laufen
     - Aufbau, Groessenanpassung und Lebenszyklus sind neu geschrieben

   EINSATZORT: nur auf den beiden dunkelblauen Flaechen, also im Kopfbereich
   und in der Danke-Ansicht. Auf der grauen Formularflaeche waeren helle
   Strahlen entweder unsichtbar oder sie wuerden den Text stoeren. Der Bogen
   ist ein Arbeitsmittel, kein Schaustueck.

   RUECKSICHTNAHME:
     - kein WebGL vorhanden, Shader defekt oder Kontext verloren: es bleibt
       beim bisherigen Hintergrund, nichts bricht
     - ausserhalb des Sichtfensters oder Tab im Hintergrund: Schleife pausiert
     - prefers-reduced-motion: ein einziges Standbild statt Animation
   ========================================================================== */
(() => {
  'use strict';

  const VERT = `attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

  const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`;

  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m
      ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
      : [1, 1, 1];
  }

  /* Der Ursprung liegt absichtlich ein Stueck ausserhalb der Flaeche. Saesse er
     genau auf der Kante, liefen alle Strahlen sichtbar in einem Punkt zusammen. */
  function anchorAndDir(origin, w, h) {
    const aussen = 0.2;
    switch (origin) {
      case 'top-left': return { anchor: [0, -aussen * h], dir: [0, 1] };
      case 'top-right': return { anchor: [w, -aussen * h], dir: [0, 1] };
      case 'left': return { anchor: [-aussen * w, 0.5 * h], dir: [1, 0] };
      case 'right': return { anchor: [(1 + aussen) * w, 0.5 * h], dir: [-1, 0] };
      case 'bottom-left': return { anchor: [0, (1 + aussen) * h], dir: [0, -1] };
      case 'bottom-center': return { anchor: [0.5 * w, (1 + aussen) * h], dir: [0, -1] };
      case 'bottom-right': return { anchor: [w, (1 + aussen) * h], dir: [0, -1] };
      default: return { anchor: [0.5 * w, -aussen * h], dir: [0, 1] };
    }
  }

  function compile(gl, type, quelle) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, quelle);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)');

  function lichtstrahlen(wirt, einstellungen) {
    if (!wirt) return;

    const o = Object.assign({
      raysOrigin: 'top-center',
      raysColor: '#ffffff',
      raysSpeed: 1,
      lightSpread: 1,
      rayLength: 2,
      pulsating: false,
      fadeDistance: 1,
      saturation: 1,
      followMouse: false,
      mouseInfluence: 0,
      noiseAmount: 0,
      distortion: 0
    }, einstellungen);

    const huelle = document.createElement('div');
    huelle.className = 'rays';
    huelle.setAttribute('aria-hidden', 'true');

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', {
      alpha: true, premultipliedAlpha: true, antialias: false,
      depth: false, stencil: false, powerPreference: 'low-power'
    }) || canvas.getContext('experimental-webgl', { alpha: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    /* Ein Dreieck, das ueber die ganze Flaeche hinausragt. Billiger als zwei
       Dreiecke fuer ein Rechteck und ohne Naht in der Diagonale. */
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const ort = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(ort);
    gl.vertexAttribPointer(ort, 2, gl.FLOAT, false, 0, 0);

    const u = {};
    ['iTime', 'iResolution', 'rayPos', 'rayDir', 'raysColor', 'raysSpeed',
      'lightSpread', 'rayLength', 'pulsating', 'fadeDistance', 'saturation',
      'mousePos', 'mouseInfluence', 'noiseAmount', 'distortion']
      .forEach((name) => { u[name] = gl.getUniformLocation(prog, name); });

    gl.uniform3fv(u.raysColor, hexToRgb(o.raysColor));
    gl.uniform1f(u.raysSpeed, o.raysSpeed);
    gl.uniform1f(u.lightSpread, o.lightSpread);
    gl.uniform1f(u.rayLength, o.rayLength);
    gl.uniform1f(u.pulsating, o.pulsating ? 1 : 0);
    gl.uniform1f(u.fadeDistance, o.fadeDistance);
    gl.uniform1f(u.saturation, o.saturation);
    gl.uniform1f(u.mouseInfluence, o.mouseInfluence);
    gl.uniform1f(u.noiseAmount, o.noiseAmount);
    gl.uniform1f(u.distortion, o.distortion);
    gl.uniform2f(u.mousePos, 0.5, 0.5);
    gl.clearColor(0, 0, 0, 0);

    huelle.appendChild(canvas);
    wirt.insertBefore(huelle, wirt.firstChild);

    let breite = 0;
    let hoehe = 0;

    function anpassen() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(wirt.clientWidth * dpr));
      const h = Math.max(1, Math.round(wirt.clientHeight * dpr));
      if (w === breite && h === hoehe) return false;
      breite = w;
      hoehe = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.iResolution, w, h);
      const { anchor, dir } = anchorAndDir(o.raysOrigin, w, h);
      gl.uniform2f(u.rayPos, anchor[0], anchor[1]);
      gl.uniform2f(u.rayDir, dir[0], dir[1]);
      return true;
    }

    function zeichnen(zeit) {
      gl.uniform1f(u.iTime, zeit);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    const maus = { x: 0.5, y: 0.5 };
    const weich = { x: 0.5, y: 0.5 };
    let laeuft = false;
    let sichtbar = false;
    let rahmen = 0;
    let verloren = false;

    function schleife(t) {
      if (!laeuft || verloren) return;
      anpassen();
      if (o.followMouse && o.mouseInfluence > 0) {
        weich.x = weich.x * 0.92 + maus.x * 0.08;
        weich.y = weich.y * 0.92 + maus.y * 0.08;
        gl.uniform2f(u.mousePos, weich.x, weich.y);
      }
      zeichnen(t * 0.001);
      rahmen = window.requestAnimationFrame(schleife);
    }

    /* Ein einzelnes Standbild: der Effekt bleibt als Flaeche erhalten, ohne
       dass sich etwas bewegt. Besser als ihn ganz wegzunehmen, denn gewuenscht
       ist die Ruhe, nicht ein anderer Hintergrund. */
    function standbild() {
      anpassen();
      zeichnen(11.5);
    }

    function starten() {
      if (verloren) return;
      if (reduziert.matches) { standbild(); return; }
      if (laeuft) return;
      laeuft = true;
      rahmen = window.requestAnimationFrame(schleife);
    }

    function anhalten() {
      laeuft = false;
      if (rahmen) { window.cancelAnimationFrame(rahmen); rahmen = 0; }
    }

    function pruefen() {
      if (sichtbar && !document.hidden) starten();
      else anhalten();
    }

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      verloren = true;
      anhalten();
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((eintraege) => {
        sichtbar = eintraege[0].isIntersecting;
        pruefen();
      }, { threshold: 0 }).observe(wirt);
    } else {
      sichtbar = true;
    }

    document.addEventListener('visibilitychange', pruefen);
    reduziert.addEventListener('change', () => { anhalten(); pruefen(); if (reduziert.matches) standbild(); });

    if ('ResizeObserver' in window) {
      new ResizeObserver(() => {
        if (anpassen() && !laeuft) standbild();
      }).observe(wirt);
    } else {
      window.addEventListener('resize', () => { if (anpassen() && !laeuft) standbild(); });
    }

    if (o.followMouse && o.mouseInfluence > 0 && !reduziert.matches) {
      window.addEventListener('mousemove', (e) => {
        const r = wirt.getBoundingClientRect();
        if (!r.width || !r.height) return;
        maus.x = (e.clientX - r.left) / r.width;
        maus.y = (e.clientY - r.top) / r.height;
      }, { passive: true });
    }

    /* Das erste Bild sofort, damit im Kopfbereich nicht kurz ein leeres Blau
       steht, bevor der Beobachter das erste Mal meldet. Die Schleife startet
       aber erst, wenn der Beobachter Sichtbarkeit bestaetigt: die Danke-Ansicht
       ist beim Aufbau noch versteckt und soll bis zum Schluss nichts rechnen. */
    standbild();
    pruefen();
  }

  /* Kopfbereich: das Licht kommt von oben auf den Streifen, wie eine Aufhellung
     ueber dem Logo. Ruhig eingestellt, denn dieser Bereich steht auf jedem
     Schritt im Bild und darf nie um Aufmerksamkeit bitten.

     lightSpread ist mit Absicht sehr hoch. Der Kopf ist auf dem Smartphone nur
     rund 76 px hoch, und der Shader dunkelt zum unteren Rand hin ab. Mit einem
     engen Fächer landet der komplette Effekt in den obersten Pixeln der Mitte
     und ist auf dem Geraet schlicht nicht zu sehen - gemessen: oben Mitte
     rgb(40,118,177), 70 px weiter links schon wieder Grundton. Weit geoeffnet
     wird daraus ein Lichtschein ueber die ganze Breite. */
  lichtstrahlen(document.querySelector('.masthead'), {
    raysOrigin: 'top-center',
    raysColor: '#45A6CE',
    raysSpeed: 0.45,
    lightSpread: 4.2,
    rayLength: 3.2,
    fadeDistance: 2.6,
    saturation: 1.2,
    followMouse: false,
    mouseInfluence: 0,
    noiseAmount: 0.05,
    distortion: 0
  });

  /* Danke-Ansicht: der Abschluss darf etwas mehr. Volle Flaeche, Strahlen von
     unten, langsame Bewegung und ein leichtes Mitgehen mit dem Zeiger. */
  lichtstrahlen(document.querySelector('.done'), {
    raysOrigin: 'bottom-center',
    raysColor: '#3BA9D3',
    raysSpeed: 0.9,
    lightSpread: 1.8,
    rayLength: 2.2,
    fadeDistance: 1.2,
    saturation: 1.6,
    followMouse: true,
    mouseInfluence: 0.08,
    noiseAmount: 0.08,
    distortion: 0.04
  });
})();
