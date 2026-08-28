function canvasPoint(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height)
  };
}

export function prepareInkCanvas(canvas, initialValue, onChange, { lineWidth = 5 } = {}) {
  const width = Math.max(640, Math.round(canvas.getBoundingClientRect().width * 2));
  const height = Math.max(360, Math.round(canvas.getBoundingClientRect().height * 2));
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.strokeStyle = "#CE132D";
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.lineJoin = "round";
  if (initialValue) {
    const image = new Image();
    image.onload = () => context.drawImage(image, 0, 0, width, height);
    image.src = initialValue;
  }

  let drawing = false;
  let moved = false;
  const start = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drawing = true;
    moved = false;
    canvas.setPointerCapture(event.pointerId);
    const point = canvasPoint(canvas, event);
    context.beginPath();
    context.moveTo(point.x, point.y);
  };
  const move = (event) => {
    if (!drawing) return;
    const point = canvasPoint(canvas, event);
    context.lineTo(point.x, point.y);
    context.stroke();
    moved = true;
  };
  const end = (event) => {
    if (!drawing) return;
    if (!moved) {
      const point = canvasPoint(canvas, event);
      context.beginPath();
      context.arc(point.x, point.y, lineWidth / 2, 0, Math.PI * 2);
      context.fillStyle = context.strokeStyle;
      context.fill();
    }
    drawing = false;
    onChange(canvas.toDataURL("image/png"));
  };
  canvas.addEventListener("pointerdown", start);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);
  return () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    onChange("");
  };
}

export function prepareSignatureCanvas(canvas, initialValue = "") {
  const width = Math.max(640, Math.round(canvas.getBoundingClientRect().width * 2));
  const height = 320;
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "#1D3661";
  context.lineWidth = 5;
  context.lineCap = "round";
  context.lineJoin = "round";
  if (initialValue) {
    const image = new Image();
    image.onload = () => context.drawImage(image, 0, 0, width, height);
    image.src = initialValue;
  }
  let drawing = false;
  let hasInk = Boolean(initialValue);
  const start = (event) => {
    drawing = true;
    canvas.setPointerCapture(event.pointerId);
    const point = canvasPoint(canvas, event);
    context.beginPath();
    context.moveTo(point.x, point.y);
  };
  const move = (event) => {
    if (!drawing) return;
    const point = canvasPoint(canvas, event);
    context.lineTo(point.x, point.y);
    context.stroke();
    hasInk = true;
  };
  const end = () => { drawing = false; };
  canvas.addEventListener("pointerdown", start);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);
  return {
    clear() {
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "#1D3661";
      hasInk = false;
    },
    value() { return hasInk ? canvas.toDataURL("image/png") : ""; }
  };
}

export function imageFileToDataUrl(file, { maxWidth = 1600, maxHeight = 1200, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith("image/")) return reject(new Error("Bitte eine Bilddatei auswählen."));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Das Foto konnte nicht gelesen werden."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Das Foto ist beschädigt oder nicht unterstützt."));
      image.onload = () => {
        const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export function startDictation(textarea, button, onValue) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return false;
  const recognition = new Recognition();
  recognition.lang = "de-DE";
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.onstart = () => {
    button.classList.add("is-listening");
    button.setAttribute("aria-pressed", "true");
    button.textContent = "Aufnahme läuft …";
  };
  recognition.onend = () => {
    button.classList.remove("is-listening");
    button.setAttribute("aria-pressed", "false");
    button.textContent = "Diktieren";
  };
  recognition.onerror = () => {
    button.dataset.error = "Diktat nicht verfügbar";
  };
  recognition.onresult = (event) => {
    const spoken = event.results?.[0]?.[0]?.transcript?.trim();
    if (!spoken) return;
    const value = `${textarea.value.trim()}${textarea.value.trim() ? " " : ""}${spoken}`;
    textarea.value = value;
    onValue(value);
  };
  recognition.start();
  return true;
}
