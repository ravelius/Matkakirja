# Karttaseppä → Codex: Pariisi uudella linjalla: G:n alue 2×2 tarkempana palana G:stä (koepala, 4 kuvaa; 1.11.2026)

**Omistajan päätös 1.11. klo 08.5x (KK, PT 09.18):** yleistetyn ohjekuvan reitti ei toimi. Kartta tehdään
**vasemman kuvan (G) mukaan kokonaan**, eikä sen tarvitse olla täysin oikea. Codex piirtää vapaasti G-tyyliin ja
porrastetusti: ensin iso alue, sitten jokainen pala uudelleen tarkemmin yläkuvan rajauksesta. Saumat tehdään
limityksellä ja ristihäivytyksellä. Merkit ja nimet ankkuroidaan piirroksen kohteisiin, ei todellisiin koordinaatteihin.
Lukitun pohjan reitti (1 m/px -kooste, yleistetty ohjekuva, 0,5 m/px -palat) jää pois.
Edellinen koepala (a4815ad14) on tällä päätöksellä käsitelty, eikä sitä uusita.

**Tämä koepala:** keskustassa yläkuva on G itse. Piirrä G:n alue uudelleen neljänä tarkempana palana (2×2).

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-g-2x2-koepala-20261101/`, SHA256SUMS)
- `G-referenssi-owner-style-G-confirmed.jpg` (1280 × 815): **yläkuva ja tyylin malli.**
- `asettelu-g-2x2.png`: G, jossa on neljän palan rajaukset (r1c1 vasen ylä, r1c2 oikea ylä, r2c1 vasen ala, r2c2 oikea ala).
- `ohje-g-2x2-r1c1.png` … `-r2c2.png` (1536 × 1024): kunkin palan rajaus G:stä suurennettuna ×2,13.
  **Piirrä jokainen pala uudelleen tämän päälle**, ei suurennusta vaan uusi tarkempi piirros samasta näkymästä.
  Rajaukset G:n pikseleinä: sarakkeet x 0–720 ja 560–1280, rivit y 0–480 ja 335–815.

## Mitä piirretään
- **Kaikki samoilla paikoilla kuin ohjeessa:** Seine ja sen haarat, sillat, Cité, kadut, korttelit, Tuileries, Louvre
  ja pyramidi, Notre-Dame, Sainte-Chapelle ja muut rakennukset. Mittakaava ja kuvakulma pysyvät G:n mukaisina.
- **Tarkkuus nousee:** julkisivuihin ikkunat, katoille mansardit ja savupiiput, puihin lehvästö, maamerkkeihin
  yksityiskohdat. Tyyli on G:n: vaaleat julkisivut, harmaansiniset katot, leveät valkoiset kadut, isot pyöreät puut riveinä.
- **Maamerkit piirretään mukaan** kuten G:ssä (Louvre, pyramidi, Notre-Dame, Sainte-Chapelle). Niille ei jätetä tyhjää kohtaa.
- **Limitykset:** vierekkäisten palojen yhteinen kaista on 341 px (pystysuunnassa 309 px). Kaistan sisällön on oltava
  samoilla paikoilla molemmissa paloissa, koska palat kootaan ristihäivyttäen. Piirrä r1c1 ensin ja käytä sen
  reunakaistaa viitteenä seuraaville paloille (r1c2, r2c1, ja r2c2 kummankin naapurin mukaan).
- **Pois:** lentokoneet, linnut ja tekijänoikeusteksti (G:n vasen alakulma). Missä G:ssä näkyy paperia tai reunaa,
  kaupunki jatkuu palan reunaan asti. Veneet saa pitää, ihmisiä ja autoja saa olla G:n tapaan pieninä.
- Ei tekstejä eikä nimiä kuvaan (nimet tulevat pelissä päälle).

## Toimitus
`proto-3d/_tyo/codex/pariisi-g-2x2/pariisi-g-2x2-r1c1.png` … `-r2c2.png` (1536 × 1024 RGB) ja postiviesti
`posti/codex-karttaseppa-pariisi-g-2x2-koepala-<pvm>.md`, jossa ovat SHA256 ja kohdat, joita et saanut pysymään
(erityisesti limityskaistojen erot). Kokoan palat ja näytän parin G | 2×2 koottuna sekä saumojen lähikuvan PT:lle.
**Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (4 kuvaa). Karttatiedot © OpenStreetMap contributors.
