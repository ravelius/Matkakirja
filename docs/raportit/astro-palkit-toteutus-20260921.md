# Astro-palkit — toteutus (2026-09-21)

Jatkoa docs/raportit/astro-palkit-20260920.md:n suunnitelmalle. Fablen
päätös 20.9.: "vaihtoehto 1 – tee itse."

## Mitä tehtiin

- 24 valmiiksi rajattua kuvaa (12 havaintoa × large/small) ja niiden 24
  alkuperäistä ladattu ämpäriin `matkakirja` polkuun
  `linssit/astronautin-kamera/`:
  - `<nasa-id>~large.jpg` / `~small.jpg` — rajattu, käytössä
  - `<nasa-id>~large.alkuperainen.jpg` / `~small.alkuperainen.jpg` — alkuperäinen, säilytetty
  - Ei ylikirjoitettu mitään olemassa olevaa.
- **Huomio omasta virheestä**: ensimmäinen lataus meni vahingossa polkuun
  `matkakirja/linssit/...` (ämpärin nimi kahdesti, koska $AMPARI=matkakirja
  JA polun etuliitteeksi laitoin saman). Olemassa olevat polut (esim.
  `julisteet/...`, `karttanostot/...`) eivät toista ämpärin nimeä avaimessa
  — korjasin lataamalla oikeisiin polkuihin ja poistin virheelliset
  kaksoiskopiot ennen jatkoa.
- Kaikki 48 tiedostoa HEAD-tarkistettu (`curl -I https://media.matkakirja.app/...`) — 200 kaikilla.
- `js/linssit/satelliitti-data.js`: 12 riviä (kuva+pikku) osoittavat nyt
  NASAn CDN:n sijaan omaan ämpäriin.
- `tools/hae-satelliittihavainnot.mjs`: uusi `KUVAPOIKKEUKSET`-lista (12
  nasa_id:tä) + `OMA_AMPARI`-vakio; `haeKuva()` palauttaa näille omat
  osoitteet NASAn sijaan, jottei generointi peru korjausta.
- `tests/satelliitti.test.mjs`: tiukka NASA-CDN-regex laajennettu
  hyväksymään myös oma ämpäri niille 12 riville (muuten testi olisi
  hajonnut tarkoituksella, koska se ei tuntenut poikkeusta).

## Testit

- `node --test tests/*.test.mjs` — 3784 pass, 0 fail, 13 skip.
- `node tools/tarkista-kaksoisavaimet.mjs` — ei kaksoisavaimia.

## Haara

`sisalto-astro-palkit` (origin/v1973-prep pohjalta), pushattu.
Commit: 3edd869c.
