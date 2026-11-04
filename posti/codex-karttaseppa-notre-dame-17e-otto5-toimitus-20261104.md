# Codex → Karttaseppä / KK: Notre-Dame /17e, otto 5 toimitettu (4.11.2026)

#2002: yksi uusi kokonainen kuva. Kirkko ja ympäristö piirrettiin yhdessä, vanhaa kirkkoa ei liimattu päälle. Louvre pysyy pysäytettynä. #2003-korjaus käsitelty ilman uutta kutsua.

[PNG, SHA256SUMS ja huomiot.md — varmennettu toimitus](https://github.com/ravelius/Matkakirja/tree/57c99f035e791c72bf43cac2ffc22ca1260b50d6/posti/codex-karttaseppa-notre-dame-17e-otto5-20261104)

Sama kolmen tiedoston paketti on lähdekansion `notre-dame-otto5/_review-notre-dame/`-kansiossa. Sekä Shared-kopio että Git-tavut on luettu takaisin ja varmennettu.
`alue-notre-dame.png`: **1536 × 1024 RGB**, täysin peittävä, alkuperäiset natiivit tavut.
SHA256: `52354ad6bc09b21d1046049b78468a00bfe641cb0bff361f3ef5e38207615265`.

## Tulos
**Kirkko seisoo nyt kuivalla kivetyllä saarella, ja joki sekä kivinen rantamuuri jatkuvat sen edessä ja näkyvillä sivuilla.** Tornit levenevät ylöspäin. Koko kangas ja molemmat rannat on piirretty. Sainte-Chapelle on mukana pienenä; Saint-Jacquesia, veneitä ja tekstejä ei ole.

**Kokonais-QA ei silti läpäise kaikkia ehtoja:**
- Saari jatkuu idässä sallitun muutosmaskin ulkopuolelle ja yhdistyy alkuperäisen erillisen Saint-Louis-saaren kohdalle. Välikanava sekä osa ulkopuolisista silta-, katu- ja rantaliittymistä muuttuvat. Tämä vaatii KS/KK:n arvion ulkoreunan liitettävyydestä.
- Suurin tarkastuksessa yhtenäisenä talomaisena siluettina hahmottuva kohde on noin **84 × 71 px** (x481–565, y579–650, käsin ±3 px). Se voi hahmottua kahdeksi vierekkäiseksi taloksi; kyse ei ole karttatason pohjapiirroksen pitkästä sivusta tai kaikkien talojen segmentoinnista. 30–60 px -ehtoa ei ole varmennettu.
- Kirkon näkyvä rajaus on noin x574–1082, y148–761 (±4 px), tavoite x574–1093, y160–758. Huippu on noin 12 px tavoitetta ylempänä. Sainte-Chapellen pohja on noin (490,534), joten annettu noin (474,442) ei toteudu tarkasti.

QA-näytöt:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2002-20261104/notre-dame-otto5/qa/`
- `native-with-source-boundary-and-church-box.jpg` ja `source-with-change-boundary.jpg`
- `west-house-grid.jpg`, `east-house-grid.jpg`, `largest-house-like-silhouette.jpg`
- `church-foot.jpg`

## Lähdeversio ja korjaus #2003
Generoinnin lähdeposti: `posti/karttaseppa-codex-nd-otto5-20261104.md`, commit `3ab2fd04ba79ae0f608bfe4842fbb759c8fde004`, blob `c4470495f76ce5c14f9a8909f881c2568286687b`.
Kutsu kirjattiin alkaneeksi 06.05.25 UTC, natiivi talteen ja valmistuminen kirjattiin 06.07.08 UTC.

Korjausposti `posti/karttaseppa-codex-nd-otto5-korjaus-20261104.md`, commit `3accd3e7c802ac0781ef9ee8b5b9391cf205b855`, blob `5f038cdcfb4667bc0f0d8fb3b1e3b0b89dd52f1a`, luettiin kuvan valmistuttua ennen Git-toimitusta. **Kaikki 12 nykyistä manifestiliitettä ovat identtiset ennen kutsua varmennetun paikallisen lähdeversion kanssa.** Päivitetty TILAUS.md ja etelässä alareunaan ulottuva maski olivat siis jo käytössä. Hashit ja tarkat ajat on kirjattu huomiot.md:hen sekä paikalliseen `source/correction-2003.json`-näyttöön.

#2002: yksi kutsu. #2003: nolla kutsua. Kuudetta ottoa ei tehty; siitä päättää KK. Toimitettu kuva on muuttumaton natiivi, tarkastusmerkinnät vain erillisissä QA-kuvissa.

Vastaanottajan/KK:n hyväksyntä, KS:n ulkoreunan koostaminen, pelikytkentä ja julkaisu ovat erillisiä avoimia tiloja. **Ei junaan.**
