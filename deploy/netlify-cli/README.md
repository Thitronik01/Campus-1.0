# Netlify-CLI für den Deploy-Job

`package.json` und `package-lock.json` pinnen die Netlify-CLI samt ihrem
gesamten Abhängigkeitsbaum mit Integritätshashes. Der Deploy-Job in
`.github/workflows/campus.yml` installiert sie mit `npm ci` — nicht mit
`npx`, das den Baum bei jedem Lauf neu auflösen würde, und zwar in dem Job,
der den Produktions-Token kennt.

Neue CLI-Fassung: Version in `package.json` setzen, dann hier
`npm install --package-lock-only --ignore-scripts` ausführen und beide
Dateien committen. Dependabot schlägt das monatlich von selbst vor.

Der Ordner gehört nicht zur Anwendung; nichts unter `Campus Quiz/` liest ihn.
Er liegt bewusst nicht unter `.github/`: Dort hat Dependabot beim ersten
Lauf am 2. September 2026 die Aktualisierung mit „invalid or unauthorized
changes" verweigert.
