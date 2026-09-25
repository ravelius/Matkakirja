# Opus 2 → Fable: nostotason uudelleenpoltto NLD, HUN, IRL, HRV, SWE (erä L)

19.9.2026 klo 21.50–22.05 Suomen aikaa. Haara `opus2-nostotaso-poltto`
(origin/main v1967). Poltettu paikallisesti, **ei viety**. Vienti tehdään
sinun kauttasi (tiedostot alla). DNK poltetaan viimeisenä, kun v1968 on
mainissa.

## Päätökset (sinun, klo 21.48)

- **(b)** Poltetaan vain aiemmin poltetut, hahmotelmat jäävät eläviksi.
  Uusi generaattorilippu `--ilman-hahmotelmia`
  (`tools/generoi-laattapyramidi.mjs`): `hahmotelma-*` jää pois
  poltettavista mutta on yhä ladonnassa. Poltettavien määrät ovat samat
  kuin ämpärissä ennestään.
- **Kylkeä ei tiivisteeseen**, koska se vanhentaisi koko maailman
  poltot.

## Poltto

Ajettu `generoi-laattapyramidi.mjs <kansio> --nostotaso --nostoversio
2026-09-19-L --nostomaa <ISO> --ilman-hahmotelmia` kahdesti maata kohden:
`--tasot 5-7` ja `--tasoja 9 --tasot 8`. Kukin ajo kesti 1–3 s, joten
kuorma oli mitätön.

| Maa | Poltettuja | z5 | z6 | z7 | z8 | Laattoja |
|---|---|---|---|---|---|---|
| NLD | 21 | 2 | 2 | 6 | 15 | 25 |
| HUN | 21 | 3 | 4 | 6 | 18 | 31 |
| IRL | 19 | 3 | 4 | 7 | 16 | 30 |
| HRV | 23 | 1 | 4 | 9 | 17 | 31 |
| SWE | 21 | 5 | 9 | 18 | 31 | 63 |
| **yht.** | 105 | | | | | **180** |

### Luettelo koottiin käsin, koska generaattorin oma luettelo EI kelpaa

Suora ajo kirjoitti luettelon ylätasolle omat kenttänsä (`versio`
2026-09-07a → 2026-09-19, `patina` kevyt → taysi, `viivataso`,
`erat`), ja z8-ajo korvasi maan kirjauksen (`tasot` [8]). Vietävä
`pyramidi.json` on siksi **ämpärin nykyinen luettelo**, jossa on
vaihdettu vain `nostotasot[NLD|HUN|IRL|HRV|SWE]`. Kirjaus on
z5–z7- ja z8-ajojen yhdistelmä: `versio` 2026-09-19-L, `tasot`
[5,6,7,8], `nostot` (samat molemmissa) ja `laatastot` 5–8.

Todennettu: ylätason kentistä muuttui vain `nostotasot`, ja siinä vain
nämä viisi maata. Tiedosto on pienempi kuin ämpärissä (2 334 597 vs.
2 406 663 tavua), koska se on kirjoitettu ilman sisennyksiä; sisältö on
muuten sama.

**Velka (polttoskriptin tai generaattorin korjaus, ei tässä):**
maakohtainen suora ajo yhteiseen kansioon ei saa yhdistää kirjausta
tasoittain eikä kirjoittaa ylätason kenttiä.
`tools/polta-paikallisesti.sh` hoitaa tämän omassa kokoamisessaan.

## Portit

- **Ennen:** `node tools/tarkista-polton-tuoreus.mjs` antoi NLD 4, HUN 4,
  IRL 4, HRV 2, SWE 1 ja DNK 6 vanhentunutta.
- **Jälkeen** (`--luettelo <vietävä pyramidi.json>`): NLD, HUN, IRL,
  HRV ja SWE **0**. Jäljelle jäävät DNK 6 (v1968:n jälkeen) ja uutena
  **EST 1 (pärnu)**, joka tuli v1967:n Viron mukana ja on seuraavan
  polton asia.
- **Selain** (Chromium 390 × 844 dpr 3, ämpäripyynnöt ohjattu
  vietävään kansioon): kaksoispiirrettyjä poltettuja on
  **Amsterdamissa 4 → 0** ja **Budapestissa 1 → 0**. Luetun luettelon
  NLD-versio oli 2026-09-19-L.

## Vientiin (sinulle)

Paikallinen kansio: `/Users/samireivinen/Matkakirja-nostot-kuvat/nostotaso-L-20260919/`

| Paikallinen | Ämpäriin |
|---|---|
| `2026-09-19-L/nostot/<ISO>/z<t>/<s>/<r>.webp` (180 laattaa) | `julisteet/pyramidi/2026-09-19-L/nostot/<ISO>/z<t>/<s>/<r>.webp` |
| `pyramidi.json` | `julisteet/pyramidi/pyramidi.json` (**laatat ensin, luettelo viimeisenä**) |

- Polku on sama kaava kuin pelissä (`nostotasonKansio`:
  `<versio>/nostot/<ISO>`).
- Pallon sarjaa ei tarvitse polttaa, koska maittaiset nostot luetaan
  pyramidista.
- Tarkista viennin jälkeen HEAD jollekin laatalle, esim.
  `julisteet/pyramidi/2026-09-19-L/nostot/NLD/z8/…`.

## DNK

DNK poltetaan samalla tavalla, kun v1968 (trelleborg-slagelse pois,
Storebæltin nimiö tyhjä) on mainissa. Ilmoita, niin ajan sen ja
toimitan saman rakenteen: yksi maa ja luettelo, joka on koottu **silloisen**
ämpärin luettelon päälle.
