# Päätoimittaja → Codex: yläpalkin nahka myös iPadille (29.9.2026)

Jatkoa tilauksille `fable-codex-ylapalkki-matkalaukku-20260929.md`, `...-vain-iphone-...` ja `...-lisays-saari-...` sekä
toimitukseesi `codex-fable-ylapalkki-matkalaukku-20260929.md` (kiitos, iPhone-versio on pelissä, TF 1.0.50). Omistaja on nyt
nähnyt iPhonen nahkapalkin pelissä ja sanoi 29.9. klo 17.4x sanatarkasti: "Lisää uusi nahkainen yläpalkki myös iPadille."

## Lukitut asiat (samat kuin iPhonessa)

- Sama nahka, väri, kohopainettu logo (`logo-kohopainatus.png`) ja tyhjä kohopainettu pilleri (`pilleri-kohopainatus.png`),
  sama matkalaukun alareuna ja tikkaus. Ei tekstiä (paitsi logo), ei metallikulmia, ei hampurilaiskuvaketta.
- iPadin palkki näyttää samalta tuotteelta kuin iPhonen, vain leveämpänä.

## iPadin erot

- **Ei Dynamic Islandia:** keskelle ei tarvita 40 %:n tyhjää aluetta. Keskitummennus saa jäädä pois tai olla selvästi
  kevyempi (valo sivuilta kuten iPhonessa, mutta ilman mustaa saarta peitettävänä). Valitse luontevin ja kerro README:ssä.
- **Pyöristetyt kulmat:** omistaja huomasi iPhonessa, että logo ja pilleri jäivät näytön pyöristettyjen kulmien taakse.
  iPadissa logo ja pilleri vähintään kulmasäteen + marginaalin päähän reunasta (noin 64 px @2x kummaltakin sivulta), ja
  pystysuunnassa keskelle palkin näkyvää osaa.
- Logo vasemmalla, pilleri oikealla, kuten iPhonessa.

## Toimitus

1. **Koosteet ensin arviointiin:** iPad pysty 2048 × 260 px ja iPad vaaka 2732 × 260 px sekä `previews/` pelikartan päällä
   (molemmat suunnat). Omistaja haluaa nähdä koosteen heti.
2. **Palat:** käytä iPhonen `nahka-tile.png`:tä, logoa ja pilleriä, jos ne skaalautuvat iPadille siististi (2× tiheys, palkin
   korkeus 130 pt). Jos eivät, toimita iPad-palat erikseen (`-ipad`-päätteellä). Keskitummennus iPadille omana
   `keski-varjo-ipad.png`:nä, jos käytät sitä.
3. `manifest-ipad.json`: logon ja pillerin ankkurit reunasta (pt ja px), 9-slice-rajat ja kerrosjärjestys.

Toimitus kansioon `~/Documents/Codex/<pvm>/ylapalkki-matkalaukku/ipad/` ja ilmoitus
`posti/codex-fable-ylapalkki-ipad-<pvm>.md`.
