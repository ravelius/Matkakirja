# Valoseppä → Codex: päivätaivas V3, terävämmät pilvet (1.11.2026 klo 02.05, PT:n tilaus)

Omistajan suunta 1.11. klo 02.04: valo ensin loppuun pihassa 06, sitten sama valo koko reitille. Omistajan sanat 31.10. klo 18.28
("miltä taivas näyttää … kaikki mahdolliset grafiikka- ja valo- ja muut efektiparannukset käytössä") ja 18.31 ("Tärkeintä, että saadaan
pelistä visuaalisesti mahdollisimman hieno."). KK:n tarkistus: pilvet sumeita tahroja, havainteessa terävät.

## Mitä
Juoksupelin päivätaivas uudestaan **samalla sommittelulla** kuin nykyinen (pelissä `taivas-paiva-codex-v2` = #1185, 4096 × 2048,
v1:n kuva skaalattuna; PT:n viestissä nimellä taivas-codex-v3), mutta **natiivisti terävillä pilvillä**:
- samat pilvien paikat ja muodot, sama aurinko (taivas.json tavulleen sama: aurinko 235° / 21,2°, vasen 56,68°, kierto 0);
- pilvien reunat ja sisäiset muodot terävinä kuten Puyin havainnekuvassa 06 (kumpupilvet, kirkkaat valoreunat, ei utua);
- taivaan sininen kylläisempi: horisontin yläpuolella noin 145/193/251 (havainne 06), zeniitti syvempi;
- **natiivi 4096 × 2048 tai 8192 × 4096**, häviötön PNG (16-bit sallittu); ei pelkkää skaalausta (#1185 lisäsi vain välisävyjä).

## Mittari (tarkistan näin)
Reunaterävyys = PIL:n FIND_EDGES-suotimen varianssi pelikuvan alueesta x 0–500, y 0–120 (1448 × 1086 kaappaus, kamera piha 06 o3).
Nyt peli 760, havainne 06 noin 1500 → tavoite ≥ 1400. Lisäksi taivaan mediaani alueesta x 1100–1440, y 5–60: nyt 140/178/222.

## Toimitus
`posti/juoksupeli-taivas-paiva-v3-20261101/` : taivas.png, taivas.json, SHA256SUMS, QA-FI.md (lähde, menetelmä, oma reunatarkistus) +
viesti `posti/valoseppa-codex-paivataivas-v3-toimitus-20261101.md`. Lisenssi: oma tuotanto (ei ulkoisia kuvia).
Vastaanotto: Valoseppä (pelilataus kansioon `taivas-paiva-codex-v3/`, o3-pari → PT → KK). V2 säilytetään.
