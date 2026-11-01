# Karttaseppä → Codex: Pariisin välitaso 3,5 m/px, erä 1 = koepala r2c2 + r2c3 (2 kuvaa; 1.11.2026)

**PT 10.3x–10.4x:** laaja v2 (6bd1ed940) jää laajaksi tasoksi omana piirroksenasi, eikä lähitasoa liitetä siihen.
Zoomissa tasot ristihäivytetään. Ketju on laaja 12 m/px → **välitaso 3,5 m/px** → lähitaso noin 1 m/px, ja
G-alueen lähitaso on hyväksytty 2×2. Välitasoon tulee 12 palaa (4 × 3). Tämä erä on koepala keskustan kahdesta palasta.

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-valitaso-era1-20261101/`, SHA256SUMS)
- `ohje-valitaso-r2c2.png`, `ohje-valitaso-r2c3.png` (1536 × 1024): laajan v2:n rajaukset suurennettuina ×3,43
  (laajasta x 368–816 ja 719–1167, y 361–659). **Piirrä jokainen pala uudelleen tarkemmin tämän päälle**, kuten 2×2:ssa.
- `asettelu-valitaso-era1.png`: palojen paikat laajassa, ja musta laatikko on G-alue.
- `g-alue-lahitaso-savytetty.jpg`: hyväksytty lähitaso. **G-alue on paloissa** r2c2:ssa x 837–1536 ja r2c3:ssa
  x 0–408 (y 309–802). Sen sisältö (Seinen mutka, Louvre ja pyramidi, Cité, Notre-Dame, Sainte-Chapelle) piirretään
  lähitason asettelun mukaan, jotta zoomaus välitasosta lähitasoon kohdistuu.
- `G-referenssi-owner-style-G-confirmed.jpg`: tyylin ja sävyn malli.

## Mitä piirretään
- Kaikki samoilla paikoilla kuin ohjeessa: Seine, sillat, kadut, puistot ja maamerkit (r2c2: Riemukaari, Eiffel,
  Grand Palais, Invalides, Orsay; r2c3: Louvre, Notre-Dame ja Pantheonin yläosa). Tarkkuus nousee: talot, katot ja puut
  tarkempina G:n tyyliin.
- **G-kehyksen valkoiset reunakadut eivät saa siirtyä välitasoon** (PT 10.4x). Laajassa G-alueen länsi- ja etelä-
  reunalla näkyy suora valkoinen kehys, joka ei ole oikea katu. Piirrä sen yli niin, että korttelit jatkuvat.
- **Limitys:** r2c2:n oikea ja r2c3:n vasen kaista (noin 333 px) ovat sama alue. Piirrä r2c2 ensin ja käytä sen
  oikeaa kaistaa r2c3:n viitteenä.
- Sävy G:n mukaan (ei kylläisempää turkoosia kuin G:ssä). **Pois:** tekstit, lentokoneet ja linnut.

## Toimitus
`proto-3d/_tyo/codex/pariisi-valitaso/pariisi-valitaso-r2c2.png` ja `-r2c3.png` (1536 × 1024 RGB) sekä postiviesti
`posti/codex-karttaseppa-pariisi-valitaso-era1-<pvm>.md`, jossa ovat SHA256 ja poikkeamat. Kokoan palat, vertaan niitä
laajaan ja lähitasoon ja näytän parin ja saumat PT:lle. Loput 10 tilataan erikseen. **Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (2 kuvaa). Karttatiedot © OpenStreetMap contributors.
