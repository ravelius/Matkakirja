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

## 45b RATKAISTU 20.9.2026: ei liity ISS-merkkiin

Mittasin saman ajon sisällä samalta pisteeltä ja samasta kamera-asennosta 45b:n luvut
kahdesti: ISS-merkki ja ratakaari näkyvissä ja `display: none` -tilassa.

| Ajo | Piste | Merkki näkyvissä (10 px / 40 px, ero) | Merkki piilossa (ero) |
| --- | --- | --- | --- |
| 1 | 349, 346 | 74,7 / 71,2 → **3,5** | 74,6 / 71,2 → **3,4** |
| 2 | 76, 274 | 77,9 / 74,1 → **3,8** | 77,8 / 74,1 → **3,7** |

Merkin vaikutus on 0,1 yksikköä eli mittauskohinaa. 45b riippuu siitä, minkä pisteen savuke
valitsee (lähin ruudun keskeltä) ja millaista maastoa sen ympärillä on: pyörivä pallo antaa
joka ajossa eri pisteen. Fable oli kirjannut saman jo 18.9.2026 savukkeen kommenttiin
("maastonaytteen vaihtelu, mitattu 4,6 kuormassa; valaisu 45c on tarkempi mitta").

Aiemmat kaksi punaista (−5,7 ja −5,9) osuivat siis pisteeseen, jonka ympärillä maasto oli
kauempana kirkkaampaa. **ISS-merkin rajaus kiekon sisälle ei aiheuta 45b:tä, eikä erän
julkaisulle ole tästä estettä.** Koekoukut poistettiin savukkeesta mittausten jälkeen.

## Alkuperäinen avoin kohta (19.9.2026, ratkaistu yllä)

**45b** ("pinta pisteen vieressä on kirkkaampi kuin kaukana") oli punainen molemmissa
korjatuissa ajoissa (ero −5,7 ja −5,9, vaadittu ≥ 3) ja vihreä vastakokeessa (vanha koodi).
Korjaus muuttaa vain ISS-merkin opacityä. En ehtinyt todentaa, liittyykö 45b tähän.
Mahdollisia selityksiä: merkki tai sen puuttuminen osuu näytealueelle, tai kyse on
maastosta riippuvasta häilynnästä (vrt. 45c aiemmin). Tämä on tutkittava ennen kuin erä
menee julkaisuun: sama näkymä ajetaan ISS piilotettuna ja näkyvissä, ja verrataan
10/40 px:n kehiä. **Erää ei pidä vielä viedä julkaisuun.**
