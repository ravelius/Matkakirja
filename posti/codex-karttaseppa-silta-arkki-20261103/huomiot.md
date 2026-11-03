# Kivisilta-arkki — tilaus #1970, yksi otto

Lähdecommit 30c0fffac2f38b1ede1c1f7b3e8d06a3f1173f60, blob 33b2c44e19b8c59e611d20ff794ce490b359d247. TILAUS.md ja manifestiliitteet luettu ja SHA256-varmennettu. Nähtävyydet toimitettiin ensin. Yksi ImageGen-kutsu, yksi 1536 × 1024 RGBA PNG; kuusi siltaa yhdessä kuvassa. Alkuperäiset generoidut tavut säilytetty, ei jälkimuokkausta tai uusintaa.

SHA256 `f910ec725fc7ece04bef8387a08fb4d661db42fc06afab905a95bb3e8a66ded8`.

| Ruutu | Kannen pituus px: mitattu / tavoite | Kulma: mitattu / tavoite | Kaaria: näkyvä / tavoite | Alfarajauksen keskikohta |
|---|---:|---:|---:|---|
| 1 | noin 84.8 / 60 | noin 62.2° / 65° | 2 / 2 | [266.0, 262.5] |
| 2 | noin 138.8 / 90 | noin 60.7° / 65° | 3 / 3 | [770.0, 259.5] |
| 3 | noin 212.8 / 130 | noin 61.5° / 65° | 6 / 5 | [1284.5, 260.0] |
| 4 | noin 84.6 / 60 | noin 125.4° / 125° | 2 / 2 | [262.0, 774.5] |
| 5 | noin 132.7 / 90 | noin 127.3° / 125° | 3 / 3 | [766.5, 773.5] |
| 6 | noin 201.8 / 130 | noin 126.8° / 125° | 6 / 5 | [1280.0, 772.0] |

Mittaus: kannen avointen päätyjen keskipisteet arvioitu 3x koordinaattikuvista, kummankin pisteen epävarmuus noin ±3 px. Pituus päätypisteiden etäisyys, ei koko sillan alfarajaus; kaarevan kannen pituutta pintaa pitkin ei mitattu. Kulma vaakatasosta kohti ylempää päätyä. Natiivit pisteet ja laskelmat tallessa `qa/checks.json`:ssa. Sijoittumisen keskipisteet taulukossa ovat koko sillan alpha≥128-rajauksen keskipisteitä, eivät kansien keskipisteitä.

Kuusi siltaa kahteen suuntaan, lämmin kivi, ruskea viiva, avoimet kansien päät, matalat kaiteet ja läpinäkyvät kaariaukot. Ei ympäristöä, tekstiä tai ruudukkoa. Sinisellä QA-taustalla ei näkyvää haloa. Kaikki sillat pysyvät omissa ruuduissaan. Koot ylittävät tavoitteen; pitkissä silloissa kuusi kaarta viiden sijaan. Tarkkaa 60 asteen kuvakulmaa ei ole mitattu. NW-valo on silmämääräisesti yhtenäinen, mutta ei geometrisesti varmennettu.

**Oma kokonais-QA EI LÄPÄISSYT**: pituudet ovat tavoitetta suuremmat, pitkissä silloissa on yksi ylimääräinen kaari ja alfa on [0, 254] (täysin peittäviä 255-pikseleitä 0). Täysin läpinäkyviä pikseleitä 1496564, osittaisia 76300. Matala-alfaista jäännöstä on kuvan ulkoalueilla. Näitä ei korjattu alkuperäiseen kuvaan. Vastaanottaja arvioi mahdollisen koko-/alfasovituksen ja kaaripoikkeaman hyväksyttävyyden.

Tämä on yhden sallitun oton arviointitoimitus. Vastaanottajan hyväksyntää, kirjastoon käyttöönottoa, runtime-integraatiota tai julkaisua ei ole varmennettu.

Alkuperäinen, täydellinen kehote, QA-koordinaattikuvat ja mitat: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/silta
