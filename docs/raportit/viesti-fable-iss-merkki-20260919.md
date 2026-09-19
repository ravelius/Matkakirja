# Opus → Fable: ISS-merkki pallon kiekon ulkopuolella (19.9.2026)

Erä `opus-local-iss-merkki`, Matkakirja Opus local (Mac Studio), 22.00–22.12 Suomen aikaa.
Pohja origin/main (24ee78bc, v1967). Lähde: Sonnet 1 kierros 14 (v1966), kuvat b-11 ja b-13.
**Erä keskeytettiin omistajan tauolla klo 22.11. Tila kirjattu alle.**

## Juurisyy

Rata on 6 % pinnan yläpuolella (`ISS_KORKEUS`). `radallaEdessa` (kamera · piste > R²)
pitää näkyvänä myös asemaa, joka on reunan takana mutta horisontin yllä. Se projisoituu
pallon kiekon ULKOPUOLELLE, laitekuvassa b-11 noin 15–25 px kiekon alareunan alapuolelle.
Mitattu vanhalla koodilla (30 s, 60 näytettä, 390 px): 15 näkyvästä näytteestä
**9 oli kiekon ulkopuolella**, pahimmillaan 15 px.

## Korjaus (`js/linssit/satelliitti-avaruus.js`)

- Uusi puhdas funktio `issKiekonSisalla(piste, keskus, sadePx, vara = 2)`.
- Merkki näkyy, kun asema on kameraa kohti olevalla puoliskolla (`radallaEdessa`) JA sen
  ruutupiste on kiekon sisällä. Kiekon keskipiste on kotelon keskipiste, johon myös varjo
  ja valoreuna asettuvat.
- Ratakaari piirretään ennallaan ja saa jatkua reunan yli.

## Vartiot

- `tests/satelliitti-avaruus.test.mjs`: uusi testi 52e (keskellä, reunan sisällä, b-11:n
  kaltainen ulkopuoli, 2 px:n vara, virheelliset syötteet).
- `savuke-astro-pallo.mjs` **52e**: 30 s, 500 ms välein. Joka näkyvän (opacity 1) näytteen
  on oltava kiekon sisällä.

| Ajo (puhelin 390 × 844) | 52e | Näkyviä / kiekon ulkopuolella näkyviä |
| --- | --- | --- |
| Vastakoe (vanha koodi) | FAIL | 15 / **9** (pahin 15 px) |
| Korjattu, ajo 1 | OK | 6 / 0 |
| Korjattu, ajo 2 | OK | 2 / 0 |

`node --test tests/*.test.mjs`: pass 3704, fail 0.

## AVOIN (kirjattu tauon vuoksi, ei selvitetty)

**45b** ("pinta pisteen vieressä on kirkkaampi kuin kaukana") oli punainen molemmissa
korjatuissa ajoissa (ero −5,7 ja −5,9, vaadittu ≥ 3) ja vihreä vastakokeessa (vanha koodi).
Korjaus muuttaa vain ISS-merkin opacityä. En ehtinyt todentaa, liittyykö 45b tähän.
Mahdollisia selityksiä: merkki tai sen puuttuminen osuu näytealueelle, tai kyse on
maastosta riippuvasta häilynnästä (vrt. 45c aiemmin). Tämä on tutkittava ennen kuin erä
menee julkaisuun: sama näkymä ajetaan ISS piilotettuna ja näkyvissä, ja verrataan
10/40 px:n kehiä. **Erää ei pidä vielä viedä julkaisuun.**
