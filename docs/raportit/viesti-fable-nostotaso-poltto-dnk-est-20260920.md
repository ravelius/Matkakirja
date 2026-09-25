# Opus 2 → Fable: DNK ja EST nostotasolle (erän L jatko)

20.9.2026 klo 01.50 Suomen aikaa. Ei repomuutoksia lukuun ottamatta
tätä raporttia; poltettu aineisto on paikallisessa kansiossa vientiä
varten.

## Poltto

Sama menettely ja sama versio kuin erässä L (NLD, HUN, IRL, HRV, SWE):

```
node tools/generoi-laattapyramidi.mjs <kansio> --nostotaso \
  --nostoversio 2026-09-19-L --nostomaa <ISO> --ilman-hahmotelmia
```

kahdesti maata kohden: `--tasot 5-7` ja `--tasoja 9 --tasot 8`.
Hahmotelmat jäävät eläviksi, kuten erässä L.

| Maa | Poltettuja nostoja | Ajoaika |
|---|---|---|
| DNK | 20 | 2,0 s + 1,9 s |
| EST | 21 | 1,6 s + 1,7 s |

Laattoja yhteensä 29, kansio 2,5 Mt.

Mac Studiolla generaattori tarvitsee kaksi ympäristömuuttujaa, koska
oletuspolut ovat kontin: `PLAYWRIGHT_JS` ja **`PW_CHROMIUM`** (ei
`CHROMIUM`, jota savukkeet käyttävät). Ilman niitä ajo kaatuu
`/opt/pw-browsers/chromium`-polkuun.

## Luettelo

Kuten erässä L, luettelo koottiin käsin: ajettiin kumpikin tasoerä
erikseen omaan kansioonsa, luettiin niiden `nostotasot[ISO]` ja
yhdistettiin ne ämpärin nykyisen `pyramidi.json`:in päälle. Tarkistettu
koneellisesti, että `nostot`-tiivisteet ovat samat molemmissa ajoissa ja
että ylätason kenttien joukko ei muuttunut. Tulos: `tasot` [5,6,7,8],
`laatastot` 5–8, versio 2026-09-19-L.

Vietävä `pyramidi.json` on 2 334 548 tavua (ämpärissä 2 334 597).

## Portit

`node tools/tarkista-polton-tuoreus.mjs`:

| | ennen | jälkeen (`--luettelo` vietävä) |
|---|---|---|
| DNK | 7 vanhentunutta | **0** |
| EST | 1 (pärnu) | **0** |
| yhteensä | 14 | **6** |

Jäljelle jäävät **CYP 4** (olympos, khirokitia, asinounkirkko,
kykkoksenluostari), **ITA 1** (po) ja **POL 1** (veiksel). Ne ovat
uusia sitten erän L:n enkä koskenut niihin — kerro jos otan ne.

Selain (Chromium 390 × 844, ämpäripyynnöt ohjattu vietävään kansioon):
Kööpenhaminassa 31 napautettavaa, joista 12 poltettua ja 19 elävää;
Tallinnassa 24, joista 10 poltettua ja 14 elävää. **Jokainen elävä on
hahmotelma** (`hahmotelma-*`), eli poltetut eivät piirry kahteen
kertaan.

## Vienti

`/Users/samireivinen/Matkakirja-nostot-kuvat/nostotaso-M-20260920/`
- `2026-09-19-L/nostot/{DNK,EST}/…` (29 laattaa)
- `pyramidi.json` ämpärin luettelon päälle

Sama versiokansio kuin erässä L, joten laatat menevät entisten viereen.
