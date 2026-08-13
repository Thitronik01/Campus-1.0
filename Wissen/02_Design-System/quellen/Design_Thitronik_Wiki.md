# THITRONIK Wiki — Design & UI/UX Spezifikation

Dieses Dokument hält das (fast perfekte) Design des Thitronik Knowledge Wikis verbindlich fest. Es dient als "Source of Truth" für die Portierung auf das Hauptprojekt oder künftige Iterationen (z.B. Next.js).

---

## 1. Design-Philosophie & Vision

Das Design des Wikis spiegelt die Identität von THITRONIK als Hersteller hochtechnologischer, deutscher Alarmtechnik wider.
*   **Dark Mode First:** Die Standard-Ansicht ist dunkel. Das reduziert die Augenbelastung der Analysten/Techniker bei langem Lesen und wirkt modern, premium und technisch.
*   **Neon-Grün als Fokus-Element:** Das charakteristische THITRONIK-Grün (`#AFCA05`) wird schonungslos, aber extrem gezielt eingesetzt. Es leitet das Auge, markiert aktive Zustände und erzeugt durch "Glow"-Effekte ein Gefühl von Lebendigkeit.
*   **Glassmorphismus & Tiefe:** Semi-transparente Ebenen, Unschärfe (Blur) im Hintergrund und feine Schlagschatten erzeugen eine saubere, übersichtliche Z-Achsen-Architektur.
*   **Flüssige Micro-Animationen:** Nichts wirkt starr. Hover-Zustände federn leicht, Menüs klappen weich auf, das Auge wird sanft geführt.

---

## 2. Visuelle Darstellung (Agent Snapshot)

Um das Resultat unserer gemeinsamen Arbeit festzuhalten, hier die Ansichten, wie ich sie als KI gerendert evaluiert habe (Screenshots liegen im Ordner `./Design_Assets/`):

### Das Dashboard
Ein starker Einstieg mit Navy-Gradient, Neon-Text-Akzent und kompaktem "Glass"-Grid.
![Dashboard UI](Design_Assets/01_Dashboard.png)

### Die Artikel-Ansicht (Referenz: WiPro III)
Fokus auf den Lesefluss, weiche Tabellen-Kontraste und sauber strukturierte Inhaltsverzeichnisse.
![Artikel UI](Design_Assets/02_Artikel.png)

*(Falls du die Screenshots nicht laden kannst, stelle sicher, dass sie im Ordner `Design_Assets` direkt neben dieser Datei liegen!)*

---

## 3. Core Design Tokens (Die Formel)

### 3.1 Farbpalette (Dark Mode Base)
Diese Variablen müssen exakt übernommen werden:

```css
:root {
  /* Brand Core */
  --brand-navy: #1D3661;
  --brand-cyan: #3BA9D3;
  --brand-red: #CE132D;
  --brand-lime: #AFCA05;           /* DAS Thitronik Neon-Grün */
  --brand-lime-dark: #8BA304;      /* Für feine Verläufe */
  
  /* Spezifische Glow & Border Effekte */
  --brand-lime-glow: rgba(175, 202, 5, 0.2); 
  --brand-lime-subtle: rgba(175, 202, 5, 0.08);

  /* Oberflächen (Surfaces) */
  --bg-primary: #0A0F1C;           /* Seiten-Hintergrund */
  --bg-sidebar: #080D1A;           /* Sidebar (noch dunkler!) */
  --bg-card: #111B32;              /* Standard Karten */
  --bg-card-hover: #152240;        /* Card Hover */
  --bg-glass: rgba(14, 21, 41, 0.75); /* Topbar & Overlay */

  /* Typografie-Farben */
  --text-primary: #E8EBF2;         /* Fließtext base */
  --text-secondary: #8B95A8;       /* Untertitel, Muted */
  --text-heading: var(--brand-lime); /* Alle H1, H2, H3 sind GRÜN */
}
```

### 3.2 Typografie (Inter)
Wir nutzen die Google Font **Inter** wegen ihrer technischen, schnörkellosen Präzision.

*   `font-family: 'Inter', -apple-system, sans-serif;`
*   **H1 (Titel):** 2.25rem, Font-Weight 800 (ExtraBold).
*   **H2 (Sektionen):** 1.375rem, Font-Weight 700 (Bold).
*   **Body (Fließtext):** 0.9375rem, Font-Weight 400. Zeilenabstand (Line-height) von `1.65` zwingend erforderlich für optimale Lesbarkeit!
*   **Hero Gradient Text:**
    ```css
    background: linear-gradient(135deg, var(--brand-lime), #D4E157);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    ```

---

## 4. Layout Architektur

Das Layout ist als hoch-responsive "App-Shell" konzipiert, es verhält sich wie eine native Applikation, nicht wie eine stumpfe Webseite.

### 4.1 Die Sidebar (Links)
*   Fixierte Breite: `260px`
*   Background: `--bg-sidebar` (wirkt abgesetzt vom Rest).
*   Rechter Border: `1px solid rgba(175, 202, 5, 0.06)` (fast unsichtbar, gliedert aber sauber).
*   **Zustände:** Ein ausgewählter Menüpunkt (Active) erhält keinen plumpe Box, sondern ein weiches Highlight: `background: rgba(175, 202, 5, 0.1)` und Schrift in Neon-Grün.
*   **Smooth Dropdown:** Die Untermenüs haben animiertes Aufklappen (`max-height` transition) mit einem rotierenden Winkel (Chevron).

### 4.2 Glassmorphic Topbar
*   Fixierte Höhe: `56px`, dockt am oberen Rand des Content-Bereichs an.
*   Kern-Feature: **Backdrop Blur**
    ```css
    background: var(--bg-glass);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    ```
*   Inhalte: Animierter Theme-Toggle (Sonne/Mond) und die prominente Suchleiste.

### 4.3 Content Frame
*   Maximale Breite der inneren Inhalte: `1100px` (zentriert via `margin: 0 auto;`).
*   Padding: Üppige Abstände (`32px` oder `var(--space-8)`) lassen die Inhalte atmen.

---

## 5. UI-Komponenten im Detail

### 5.1 Die Cards (Kacheln)
Karten werden für Fahrzeugfamilien, Schnellzugriffe und Features genutzt. Sie machen das UI anfassbar.
*   Standard Status: `background: var(--bg-card)`, `border-radius: 14px`, `border: 1px solid rgba(175, 202, 5, 0.08)`.
*   **Der "Float & Glow" Hover-Effekt:**
    Bewegt sich der Cursor auf eine Card, erhebt sie sich um 2 Pixel und das Border leuchtet in Neon-Grün!
    ```css
    .card:hover {
      background: var(--bg-card-hover);
      transform: translateY(-2px);
      border-color: rgba(175, 202, 5, 0.2);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 10px rgba(175, 202, 5, 0.15);
    }
    ```

### 5.2 Das Master-Search UI (Cmd+K)
Eine Suchfunktion ist der Dreh- und Angelpunkt eines Wikis.
*   Erscheinung als Modal/Popup, Blur-Overlay über der ganzen Seite.
*   Kein schwerer Kasten, sondern `border-radius: 24px` mit feinem Schatten.
*   Ergebnisse werden visuell durch Micro-Badges getrennt (z.B. ein roter Badge für "Fahrzeug", grün für "Glossar", cyan für "Artikel").
*   Fuzzy-Suche (Fuse.js) hebt das gefundene Wort hervor:
    ```css
    mark {
      background: rgba(175, 202, 5, 0.25);
      color: var(--brand-lime);
      border-radius: 2px;
    }
    ```

### 5.3 Badges (Fahrzeug- oder Glossar-Tags)
*   Voll abgerundet (`border-radius: 9999px`).
*   Farbgebung: Background immer als `<Farbe> mit 10% Opacity`, Text als `<Farbe> 100%`. So wirken sie leuchtend, stören aber nicht den dunklen Raum.

---

## 6. Übertragung auf das Hauptprojekt

Wenn diese UI auf dein Hauptprojekt (Next.js) übertragen wird, achte auf diese 3 goldenen "Muss-Regeln", damit das Gefühl nicht verloren geht:

1. **Die Radien:** Halte dich an die `--radius-lg: 14px` für Karten und `6px` für kleine Boxen. Harte Ecken (0px) zerstören den "Fluid"-Look.
2. **Keine Grau-Töne im Background:** Ein echter Dark Mode nutzt _kein_ neutrales Grau (wie `#333`). Er nutzt extrem abgedunkelte Blautöne (hier auf Basis eures Navy-Blau). Es ist `#0A0F1C`, nicht `#111`. Das gibt dem ganzen Projekt Tiefe.
3. **Animations-Dauer:** Hover-Effekte auf Links und Karten laufen über eine Transition von `250ms cubic-bezier(0.16, 1, 0.3, 1)`. Das macht sie zackig, aber nie unnatürlich abrupt.

---
_Erstellt über die Thitronik Wiki AI-Umgebung am 22.04.2026. Design validiert und für perfekt befunden._
