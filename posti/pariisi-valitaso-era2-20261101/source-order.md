# Karttaseppä → Codex: Pariisin välitaso 3,5 m/px, erä 2 = loput 10 palaa (10 kuvaa; 1.11.2026 klo 13.0x)

**Omistaja hyväksyi laajan v4:n (b5b817add) 1.11. klo 12.10** (KK, PT 13.1x), ja erän 1 r2c2 + r2c3 (08d9ff181) sauma ja
G-alue on hyväksytty. Tilataan loput 10 välitason palaa **erän 1 ehdoin**: liioittelu metreinä G:stä, Louvre 870 m
ja saumat limittäin. Ketju: laaja v4 12 m/px → välitaso 3,5 m/px (4 × 3) → lähitaso noin 1 m/px; zoomissa ristihäivytys.

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-valitaso-era2-20261101/`, SHA256SUMS)
- `ohje-valitaso-<pala>.png` (1536 × 1024, 10 kpl): **laajan v4:n** rajaus suurennettuna ×3,43 (rajaukset alla).
  Niihin on liimattu valmiiksi **erän 1 toimitetut palat** (r2c2, r2c3) kohtiin, joissa pala limittyy niiden kanssa.
- `limitys-<pala>.png`: valkoinen = kiinteä kaista erän 1 palasta. **Kiinteä kaista pidetään pikselilleen samana**
  (kadut, sillat, Seine, talot, sävy). Piirrä vain muu osa uudelleen ja jatka kiinteän kaistan sisältö saumatta sen yli.
- `asettelu-valitaso-era2.png`: kaikki 12 palaa laajassa v4:ssä, erän 1 palat tummennettu, musta laatikko = G-alue.
- `G-referenssi-owner-style-G-confirmed.jpg`: tyylin, sävyn ja liioittelun malli (kuten erässä 1).

| pala | laajasta (x0, y0, x1, y1) | kiinteä kaista palassa (x0, y0, x1, y1) |
|---|---|---|
| r1c1 | 16, 169, 464, 468 | 1207, 658, 1536, 1024 (kulma) |
| r1c2 | 368, 169, 816, 468 | 0, 658, 1536, 1024 (alakaista) |
| r1c3 | 719, 169, 1167, 468 | 0, 658, 1536, 1024 (alakaista) |
| r1c4 | 1071, 169, 1519, 468 | 0, 658, 329, 1024 (kulma) |
| r2c1 | 16, 361, 464, 659 | 1207, 0, 1536, 1024 (oikea kaista) |
| r2c4 | 1071, 361, 1519, 659 | 0, 0, 329, 1024 (vasen kaista) |
| r3c1 | 16, 552, 464, 851 | 1207, 0, 1536, 369 (kulma) |
| r3c2 | 368, 552, 816, 851 | 0, 0, 1536, 369 (yläkaista) |
| r3c3 | 719, 552, 1167, 851 | 0, 0, 1536, 369 (yläkaista) |
| r3c4 | 1071, 552, 1519, 851 | 0, 0, 329, 369 (kulma) |

## Mitä piirretään
- Kuten erässä 1: kaikki samoilla paikoilla kuin ohjeessa (Seine, sillat, kadut, puistot, metsät, kaupungin
  ääriviiva), tarkkuus nousee G:n tyyliin (talot, katot ja puut tarkempina). Ääriviivan ulkopuoli pysyy laajan
  vaaleana taustana.
- **Liioittelu metreinä G:stä** (välitaso 3,5 m/px), sama koko laajassa, välitasossa ja lähitasossa:
  Louvre 870 m = 250 px, Notre-Dame 575 m = 165 px, Sainte-Chapelle 140 m = 40 px, Eiffel-torni 500 m = 145 px,
  Panthéon 440 m = 125 px, Opéra Garnier 390 m = 111 px, **Sacré-Cœur 340 m = 97 px**, Invalidit 240 m = 70 px,
  Riemukaari 180 m = 50 px. Louvre, Notre-Dame, Sainte-Chapelle, Eiffel, Invalidit, Riemukaari, Garnier ja Panthéon
  ovat jo erän 1 kiinteillä kaistoilla: ne jäävät sellaisinaan. **Uusi pääkohde on Sacré-Cœur** (r1c2:n oikea ja
  r1c3:n vasen limitys, laajassa noin x 722–754): 97 px leveä, jalusta oikealla paikallaan. Muut maamerkit
  (Bois de Boulogne, Bois de Vincennes, Buttes-Chaumont, Père-Lachaise, Montparnasse) laajan v4:n kokoisina tai
  korkeintaan ×2.
- **Limitys:** naapuripalat limittyvät 329 px vaakaan ja 369 px pystyyn. Piirrä tässä järjestyksessä ja käytä jo
  piirretyn naapurin kaistaa seuraavan viitteenä: r2c1, r2c4, r1c2, r1c3, r1c1, r1c4, r3c2, r3c3, r3c1, r3c4.
- Ei G-kehyksen valkoisia suoria reunakatuja. Sävy G:n ja erän 1 mukaan (vesi kuten erässä 1, ei kylläisempää
  turkoosia). **Pois:** tekstit, lentokoneet ja linnut.

## Toimitus
`proto-3d/_tyo/codex/pariisi-valitaso/pariisi-valitaso-<pala>.png` (10 kpl, 1536 × 1024 RGB) sekä postiviesti
`posti/codex-karttaseppa-pariisi-valitaso-era2-<pvm>.md`, jossa ovat SHA256, Sacré-Cœurin toteutunut leveys px:inä ja
poikkeamat. Saat toimittaa kahdessa osassa (rivit 1–2 ensin, sitten rivi 3), jos se nopeuttaa. Kokoan 12 palaa,
mittaan pääkohteet itse ja näytän parin laaja | välitaso ja saumat PT:lle. **Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (10 kuvaa). Karttatiedot © OpenStreetMap contributors.
