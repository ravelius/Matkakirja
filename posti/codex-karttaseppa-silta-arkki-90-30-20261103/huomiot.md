# Silta-arkki 90° / 30° — #1973, yksi otto

Lähde `posti/karttaseppa-codex-silta-arkki-90-30-20261103.md`, commit 446537cc853ca26f79978ba5042fa22fc4456eab, blob d06c5f340d92d7476b1bc318879c2e5ae3bd0556. TILAUS.md luettu kokonaan ja kaikki 9 manifestitiedostoa SHA256-varmennettu. 1 ImageGen-kutsu / 1 uusi kuva. Edellistä 65°/125°-arkkia ei tehty uudelleen.

`silta-arkki-90-30.png`: 1536 × 1024 RGBA. Natiivin generoinnin tavut säilytetty muuttamatta; ei skaalausta, kiertoa, leikkausta, värikorjausta eikä alfa-korjausta.
SHA256: `7692204e8e57eda1a7321cf885d24edbd9715d46ee9014a3a28f612108470a95`.

| Ruutu | Tavoite, pituus / kulma | Mitattu kansi | Mitattu kulma | Näkyviä kaaria |
|---|---|---|---|---|
| 1 | 60 px / 90° | 56.0 px | 90.0° | 0 |
| 2 | 90 px / 90° | 88.0 px | 90.0° | 0 |
| 3 | 130 px / 90° | 128.0 px | 90.0° | 0 |
| 4 | 60 px / 30° | 59.0 px | 27.8° | 2 |
| 5 | 90 px / 30° | 92.3 px | 28.6° | 3 |
| 6 | 130 px / 30° | 132.0 px | 29.4° | 5 |

Ruutujen 1–3 kannen pituus on keskiviivan alpha≥128-pituus (±1 px); 4–6 on avoimien päätyjen keskikohtien välinen pituus koordinaattiruudukosta (arviolta ±3 px). Kulma vaakatasosta oikealle ylös. Kaikki pituusarviot ovat ±10 %:n sisällä; kulmat ovat likimääräisiä. Ylärivissä kaaria ei kuulu näkyä. Alarivin kaarimäärät 2/3/5 täyttyvät.

**Päät ja muoto:** molemmat ajopinnan päät ovat visuaalisesti auki. Kannen yli ei ole päätyseinää eikä porttia. Pitkittäiskaiteiden päissä on pyöristettyjä päätykiviä. Ylärivillä näkyvät vain kansi ja kaiteet; alarivillä etukylki kaarineen. Ei vettä, varjoa, autoja tai muita ympäristöesineitä.

**Poikkeamat, oma kokonais-QA EI LÄPÄISSYT:**
- Kansi ei ole tasainen #f4d8aa (244,216,170). Keskipisteiden RGB-näytteet: 1: (241, 213, 173); 2: (241, 214, 172); 3: (237, 208, 164); 4: (241, 212, 173); 5: (238, 204, 160); 6: (235, 203, 160). Jokaisessa 7×7-keskialueessa on 36–42 eri RGB-arvoa; kannessa näkyy sävyvaihtelua.
- Alfa min/max 0/254. Alpha0-pikseleitä 1528017; alpha255-pikseleitä 0; osittaisia 44847. Näistä 24368 on alpha1–15. Myös yli 2 px päässä näkyvistä silueteista on alpha1–6-pikseleitä. Tiukka 0/255- ja hehkuttomuusehto ei täyty, vaikka sinisellä QA-taustalla hajapikselit eivät juuri erotu.
- Kannen 24 px:n täsmäleveys ei ole varmennettu: kaiteiden välinen vapaa ajopinta on ylärivillä noin 18–19 px ja alarivillä noin 14–16 px. Ylärivin koko siluetin leveys kaiteineen on 33/34/34 px. Vastaanottajan on tarkistettava tarkoitettu kannen rajaus.

Tämä on yhden oton arviointitoimitus poikkeamineen. Vastaanottajan hyväksyntä, mahdollinen tekninen korjaus, runtime-kytkentä ja julkaisu ovat avoinna. Ei uusia yrityksiä tämän tilauksen perusteella.

Täysi kehote, natiivi alkuperäinen, koordinaattikuvat ja mittaus-JSON: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/silta-90-30`.
