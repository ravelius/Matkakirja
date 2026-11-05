# Lavastajan luovutus 5.11.2026 22.30 (lattia25) — LUE TÄMÄ KOKONAAN

L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen/lattiakoe. Loki: muuri/KORJAUS.md (22.0x, 22.1x, 22.2x, 22.3x). Ei vientejä.

## Odottaa PT:n päätöstä
Lattia25, x 500:n ulkoalue. PT:lle lähti 22.28 vaihtoehdot:
- A: ulkoalue jää, riski kirjattuna, ja lennon ruutu katsotaan ennen vientiä (suositukseni).
- B: tarkkojen poisto ja kenttä x 500:n ulkopuolelle, iso muutos.
aja25d oli PT:n sanoin viimeinen ajo tästä asiasta: ÄLÄ pyydä uutta ajoa äläkä korjaa ilman PT:n sanaa. B vain PT:n sanalla. Ei vientiä, ei kuittausta kokonaisena.

## Mitä on todettu
- Itä z -185 (rajaukset25/b-ita-saha.png, b-ita-sauma-ala.png): x 500 askel noin 4 cm ja x noin 508 tarkan palan reuna noin 12 cm. UV ehjä, syy korkeus. Vanha: x > 500 samat arvot lattia21:ssä. Koko ulkoalue: itä enintään 25 cm, länsi 13 cm (ulkoreuna.py).
- Portin D tunneli (kuvat25d-koe, rajaukset25/d-portti-kauko-3x.png): sahaa ei näy, x 500:n paikkaa ei tunnistettu, kuva tunnelista eikä aukon suulta.
- z -185 sisäpuolelta muuri täyttää näkymän (kuva ja lasku).
- Avauslento laskettu (nakyy25-tulos.txt): alue kuvassa, 25 cm enintään 1,58 px. Ei kuvaa: kello jäi 0,0:aan, avauslento-lahin on lennon alkukuva. Syy selvittämättä.
- Todistamatta: A pelaajan oikealta solmulta, lennon ruutu, sokkeli -40,6 (-481,8; -113,8), kaista z 675-679, x -500. Mainitse nämä kaikissa tulosriveissä.

## Opit (jos asiaan vielä palataan)
- `palatsi alku` ei vaikuta tasolla 1: JuoksuV4.cs:593 käyttää taso?.Alku ?? PalatsiAlku. Ajot olivat tasolla 1. `ui juoksupeli taso pois` (JuoksupeliNakyma.cs:1788) ennen avausta on kokeilematta. Solmun id tulostuu vain nimetyistä kohteista (loki: D=232).
- `sijoita` on pohjan kehyksessä (-2,03° kierto), mallin x eroaa z:n mukaan useita metrejä: pohja (393; -185) oli muurin sisällä.
- `paikka` kertoo reitin paikan, ei sijoitusta; kamerarivi on silti oikea.
- testikameran suunta = hahmo miinus pelikamera, ja pelikamera voi olla jäljessä: kuvasuuntaa ei voi pitää annettuna (KORJAUS 22.1x).
- nakyy25.py:n rasteri ohitti muunnokselliset solmut: sen näkölinjalistat eivät ole luotettavia; poikkileikkaus25.py samoin. Pikselilasku ei käytä rasteria.
- Testikamera: `testikamera korkeus taakse alas fov` (ei etäisyys ensin).

## Jonossa, ei aloitettu
Kuten -2135 (git show 53b7d09b2:docs/raportit/viesti-lavastaja-luovutus-20261105-2135.md, kohta Jonossa): PK:n konsoli, räystään alapinta, marmoriterassi; muurien kiertosuunta + V4_gold-räystäs; h-zhongyoumen, h-zhongzuomen; valkoinen viiva (13; -407); (-87,5; 302,5); S-rengas-itä harmaa levy; vaakalevyt x -420; puita ilman tyveä x 136 ja 300. ND odottaa. Uusi sivuhuomio: harmaassa sokkelissa laikkuinen valo (peli-ita-z-185-sisalta.png), ei selvitetty.
Jos PT:n päätös on A, aloita jonosta PT:n järjestyksellä; jos jono on tyhjä, rivi "JONO TYHJÄ: Lavastaja".
