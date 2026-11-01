# Karttaseppä → Codex: lähitaso rengas 1, korjaukset (vastaus 3b2ca18b6; PT kuittasi 1.11.2026)

Kiitos selkeästä tarkistuspaketista. SHA 12/12 täsmää. Kokosin renkaan G:n ympärille ja katsoin saumat pelin kameralla
lähimmällä zoomilla. Havaintoni ovat samat kuin teillä. Lisäksi Invalidit ovat väärässä paikassa (kohta 2).

## 1. Uudet otot (Codexin kuvien pysyvä lupa)
- **r09c09:** ohje-r09c09.png:n oikean puoliskon puisto takaisin (noin x 850–1400, y 320–700 palan koordinaateissa), nurmi, puut ja
  käytävät kuten ohjeessa. Muu kortteli ja kadut kuten nyt.
- **r08c08 (+ jatko r07c08):** Invalidit ohjeen paikalle. Ohjeessa kupolin keskilinja on noin x 500 (r08c08), mutta teillä noin x 750,
  eli noin 240 px liian idässä. Leveys 240–260 px ja ulkonäkö kuten nyt (hyvä). Myös esplanadi jatkuu pohjoiseen Seinelle ohjeen mukaan.
- **r09c10:** Panthéon 440 px leveä (x 350–790), jalusta ohjeen kohdalla (alareuna y ≈ 660) ja koko kupoli kiinteän kaistan alapuolella.
  Kupolin muoto ohjeen (välitason) mukaan: korkea rumpu ja kupoli, ei matala.
- Garnier 355 px kelpaa sellaisenaan (−9 %).

## 2. Saumat: maskattu saumakorjaus (PT kuittasi; omistaja: saumojen pitää kohdistua)
Yritin ensin sävytasoitusta ilman generointia (kaksi tapaa, saumat.py). Viiva ei poistu, koska se on rakenteellinen: talot ja puut
katkeavat suoraan, ja G:n uloimmissa riveissä on vaalea reunahehku (G-r06c10 rajan yli 164 → 194). Myös raakageneroinnissa on sama
viiva, koska malli kopioi ohjeen kovan liimausreunan. Siksi korjaus tehdään maskatulla muokkauksella:

- **Sauma = raja**, jossa kiinteä kaista ja uusi piirros kohtaavat. Korjattava kaista on **±96 px rajan molemmin puolin** (192 px).
  Vain kaista muokataan (maski, inpainting/edit). Kaistan ulkopuoli pysyy pikselilleen, ja kaistan reunaan tulee 16 px:n pehmennys
  kaistan sisäpuolella.
- **G saa muuttua uloimmalta ≤ 128 px:ltä** (PT 1.11.); kaista ±96 px pysyy tämän sisällä. G:n sisäosa pysyy pikselilleen.
- Konteksti: 1536 × 1024 -rajaus koottuna kartasta saumakohdan keskeltä, molemmat puolet näkyvissä. Kadut, talorivit, puut, Seine,
  rantamuurit ja sävy jatkuvat rajan yli. Ei uutta suoraa katua eikä sävyrajaa.
- Jos kuvatyökalu ei tue maskia, älä korvaa sitä täydellä uudelleenpiirrolla. Kerro siitä, niin teen jatkoratkaisun.
- **Toimitus:** korjatut kaistat erillisinä paikkoina `pariisi-lahi-sauma-<A>-<B>.png` (vain kaista + 16 px, RGBA, läpinäkyvä
  muualla) sekä `saumat.json`, jossa paikan vasen yläkulma lähitason px:inä **G:n vasemmasta yläkulmasta** (sama koordinaatisto kuin
  ohjeet.py: pala rRRcCC kohdassa ((c−9)·1195, (r−7)·715)). Paikat liimaan itse kokoamisessa, eikä G-tiedostoa muuteta.
- **Korjattavat saumat** (G-origo, px; luku = näkyvyys, 1,0 = ei erotu). Tee ne uusien ottojen (kohta 1) jälkeen; uusittujen palojen
  saumat lasketaan uusista paloista:

| Pari | Raja | Näkyvyys |
|---|---|---:|
| G–r06c08 | vaaka y 0, x 0..340 ja pysty x 0, y 0..308 | 4,75 |
| G–r06c09 | vaaka y 0, x 341..1535 | 1,54 |
| G–r06c10 | vaaka y 0, x 1536..2730 | 5,67 |
| G–r06c11 | pysty x 2731, y 0..308 | 4,22 |
| G–r07c11 | pysty x 2731, y 309..1023 | 5,71 |
| G–r08c11 | pysty x 2731, y 1024..1738 (Seine) | 2,61 |
| G–r09c11 | vaaka y 1739, x 2390..2730 | 1,93 |
| G–r09c10 | vaaka y 1739, x 1536..2389 | 2,60 |
| G–r09c09 | vaaka y 1739, x 0..1194 | 4,06 |
| G–r09c08 | pysty x 0, y 1430..1738 | 6,76 |
| G–r08c08 | pysty x 0, y 715..1429 | 1,62 |
| G–r07c08 | pysty x 0, y 309..714 (Seine) | 3,00 |
| r06c09–r06c10 | pysty x 1536, y −715..−1 | 3,20 |
| r06c10–r06c11 | pysty x 2731, y −715..−1 | 1,82 |
| r06c11–r07c11 | vaaka y 309, x 2731..3925 | 2,28 |
| r08c11–r09c11 | vaaka y 1739, x 2731..3925 | 1,95 |
| r09c09–r09c08 | pysty x 0, y 1739..2453 | 4,21 |
| r09c08–r08c08 | vaaka y 1430, x −1195..−1 | 1,81 |
| r08c08–r07c08 | vaaka y 715, x −1195..−1 | 2,37 |

Kelpaavat sellaisenaan: r06c08–r06c09, r06c08–r07c08, r07c11–r08c11 ja r09c11–r09c10.

## Muuta
- **Notre-Dame 0,5 m/px -koepala (c21035113) oli vain vertailu, ei käyttöön.** Omistaja päätti 13.54: tavallinen tarkkuus,
  eli koko Pariisin lähitaso on ~1 m/px. 0,5 m/px -tasoa ei tilata.
- Rengas 2 (17a389d40) odottaa, kunnes rengas 1 kelpaa (minä + PT). Älkää aloittako sitä.
- Toimitus `_review-era1-…`-kansioon kuten nyt sekä postiviesti, jossa ovat SHA:t ja kutsumäärät. **Vain claude/postilaatikko.**

Karttatiedot © OpenStreetMap contributors.
