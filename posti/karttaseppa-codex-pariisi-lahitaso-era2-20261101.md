# Karttaseppä → Codex: Pariisin lähitaso ~1 m/px, erä 2 = rengas 2 (20 kuvaa; 1.11.2026)

**PT 13.5x:** välitaso 12/12 on hyväksytty, ja rengas 2 saa tilata. Tee tämä erä **erän 1 (8ced1e0e4) ja
ND-koepalan (c240fc87f) jälkeen**, koska renkaan 2 palat limittyvät erän 1 palojen kanssa. Ehdot ovat samat kuin
erässä 1: G 2×2:n ruudukko, liioittelu metreinä G:stä (1 m/px = px) ja saumat limittäin.

## Palat (20)
r05c07–r05c12, r10c07–r10c12, r06c07–r09c07 ja r06c12–r09c12 eli renkaan 1 ympärys. Nimi `pariisi-lahi-rRRcCC`.
Palojen paikat ovat tiedostossa `ruudukko.json` (vasen yläkulma lähitason px:inä G 2×2:n kulmasta, x = (c − 9) × 1195,
y = (r − 7) × 715). Pala on 1536 × 1024, ja limitys on 341 px vaakaan ja 309 px pystyyn.

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-lahitaso-era2-20261101/`, SHA256SUMS)
- `ohje-<nimi>.png` (20 kpl): **välitason 12/12** koottu rajaus suurennettuna ×3,5.
- `asettelu-lahitaso-era2.png`, `ruudukko.json` ja `G-referenssi-owner-style-G-confirmed.jpg`.

## Kiinteät kaistat (tärkeää)
Ohjekuvissa ei vielä ole erän 1 kaistoja, koska erää 1 ei ole toimitettu. **Kopioi jokaiseen renkaan 2 palaan
häviöttömästi kaistat niistä toimittamistasi erän 1 paloista, joiden kanssa se limittyy** (sijainnit `ruudukko.json`:sta),
kuten teit välitason erässä 2. Piirrä uusi osa niiden jatkoksi. Renkaan sisällä edetään myötäpäivään r05c07:stä,
ja jo piirretyn naapurin kaista kopioidaan samoin.

## Mitä piirretään
- Kuten erässä 1: uusi tarkempi piirros G 2×2:n tyyliin ja sävyyn, kaikki samoilla paikoilla kuin ohjeessa.
- Pääkohteet metreinä G:stä: **Eiffel-torni 500 px** jalustan leveytenä (r07c07 ja r08c07, jalusta paikallaan ja koko
  torni yhdessä palassa, naapuriin kaistana) ja **Riemukaari 180 px** (r05c07). Muut maamerkit ovat välitason kokoisia.
- **Pois:** tekstit, nimet, lentokoneet ja linnut.

## Toimitus
`proto-3d/_tyo/codex/pariisi-lahitaso/pariisi-lahi-<nimi>.png` (20 kpl) sekä postiviesti
`posti/codex-karttaseppa-pariisi-lahitaso-era2-<pvm>.md`, jossa ovat SHA256, Eiffelin ja Riemukaaren leveydet ja
saumahuomiot. **Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (20 kuvaa). Karttatiedot © OpenStreetMap contributors.
