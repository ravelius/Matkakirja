# Karttaseppä → Codex: kadonneiden ihmeiden pyörivä tähti piirroskartan tyylillä (omistaja 2.11.2026 klo 09.4x, PT)

**Omistajan päätös 09.4x:** viittä kadonneen ihmeen leikettä (toimitus c42384a4e) **ei käytetä kartalla**. Työ oli tilauksen mukainen,
eikä mitään tarvitse korvata tai tehdä uudelleen; leikkeet jäävät arkistoon. Tilalle tulee yhdeksään kohteeseen sama hitaasti
pyörivä tähti (5 kadonnutta paikkaa + 4 nykyrakennuksen viereen). Info + kioski -aukio (7d3772f4e) jatkuu ennallaan.

## Aineisto `proto-3d/_tyo/codex/pariisi-kadonneet-ihmeet/tahti-tilaus-20261102/` (SHA256SUMS)
- `tyyliviite-kartta.png`: piirroskartta, jonka tyyliin tähti tehdään (viiva, väritys, valon ja varjon suunta).
- `mittakaava-temple-torni.png`: Temple-tornin leike 190 px; tähti on kartalla n. 40–50 px, eli selvästi rakennusta pienempi.

## Tilaus: YKSI tähti, hidas pyörähdys läpinäkyvänä PNG-kuvasarjana
- Viisisakarainen tähti (sama ★ kuin kylttien tähtimerkki), kultainen, hieman kohokuvioitu ja särmikäs, jotta pyöriminen näkyy,
  karttapiirroksen tyylillä (sama ääriviiva ja värisävy, valo vasemmalta ylhäältä kuten kartassa). Ei tekstiä, ei kehystä, ei varjoa maahan.
- Pyörii pystyakselinsa ympäri yhden kokonaisen kierroksen. **Saumaton silmukka:** viimeistä kuvaa seuraa ensimmäinen ilman nykäystä.
  Esim. 72 kuvaa (peli toistaa n. 12 kuvaa/s → kierros n. 6 s); jokainen ruutu yhtä kaukana edellisestä.
- Tekotapa vapaa (esim. 3D-malli renderöitynä piirrostyyliin), kunhan kaikki ruudut ovat samaa tähteä samassa valossa ja koossa
  ja keskipiste pysyy samassa kohdassa.
- `tahti-NNN.png` (001–072): RGBA, 256 × 256 px, tähti keskellä, läpinäkyvä tausta, pehmeä 1–2 px reuna. **Ei videotiedostoa peliin.**
- `hehku.png`: erillinen pieni pehmeä kullankeltainen valohehku vain tähden ympärille (RGBA 256 × 256, sama keskipiste); peli piirtää
  sen tähden alle, ei pyöri.
- `arkki.png`: kaikki ruudut ruudukossa tarkistusta varten, ja `kartalla-temple-torni.png`: ruutu 001 + hehku 48 px:n kokoisena
  mittakaavakuvan päällä tornin kohdalla.

## Toimitus `_review-tahti-20261102/` + posti: SHA256 ja kutsumäärät. **Vain claude/postilaatikko.**
Teen kuvasarjasta esikatseluvideon omistajalle (PT → KK) ennen peliin vientiä. Generointi: Codexin kuvien pysyvä lupa
(1 tähti, enintään 2 ottoa).
