# Opus 2 → Fable: Astronautin kameran nimiöt eivät enää limity (erä E)

19.9.2026 klo 19.14–19.25 Suomen aikaa. Haara `opus2-astro-nimiot` =
origin/main v1961 + `opus2-zoomikatto`, jotta mittaus tehtiin uudella
katolla 0,084. Ei versionostoa, ei PR:ää.

## Mitattu

WebKit 390 × 844 dpr 3, iPhone-UA, Astronautin kamera avattu pelaajan
eleellä ja kamera Egyptin yllä (29,5 N, 31 E). Mittari laski näkyvien
nimiöiden (opasiteetti > 0,5) laatikot ja parin leikkauksen osuuden
pienemmän nimiön alasta.

| Korkeus | Näkyviä | Ennen (pahin pari) | Jälkeen |
|---|---|---|---|
| lähin sallittu 0,358 (0,084 × avaus) | 7 | Niilin suisto × Suezin kanava **21 %** | 0 % (0 piilossa) |
| 1,3 × lähin = 0,46 (omistajan kuvan korkeus vanhalla katolla) | 10 → 9 | Niilin suisto × Suezin kanava **35 %** | 0 % (1 piilossa: Suezin kanava) |
| Italia 44 N 10 E, lähin | 4 | 0 % | 0 % |
| Japani 36 N 138 E, lähin | 2 | 0 % | 0 % |

Kaappaukset: `docs/raportit/kaappaukset/astro-nimiot-20260919/`:
- `webkit-390-egypti-ennen.jpg`
- `webkit-390-egypti-jalkeen.jpg`
- `webkit-390-egypti-lahin-katto.jpg`: lähimmällä zoomilla kaikki neljä
  nimiötä näkyvät erillään.

## Korjaus

`js/linssit/satelliitti-nimiot.js` (uusi) toimii samalla periaatteella
kuin pelilaudan nimiöladonta (`nostoladonta.js` 'v11-limitys'):
- Nimiö kokeilee kylkiä järjestyksessä ala → ylä → oikea → vasen, ja
  ensimmäinen kylki, joka ei osu jo ladottuun nimiöön eikä toisen
  pisteen ytimeen (6 px), voittaa.
- Jos mikään kylki ei ole vapaa, nimiö piiloutuu (`data-kylki="piilo"`),
  kunnes lähempi zoomi antaa tilaa. Pisteet eivät koskaan piiloudu.
- Edellinen kylki kokeillaan ensin, joten pyörivällä pallolla nimiö ei
  hypi.
- Järjestys on aineiston järjestys, joten sama näkymä antaa aina saman
  ladonnan.
- `satelliitti-avaruus.js` ajaa ladonnan kehyssilmukassa vain nimien
  ollessa näkyvissä ja mittaa ruudun 120 ms:n välein
  (`LADONNAN_VALI_MS`). Purku poistaa attribuutit, ja `tila().nimiot`
  kertoo ladontojen ja piilotettujen määrän.
- `css/satelliitti.css`: kyljet `yla`, `oikea` ja `vasen` samalla 11 px:n
  etäisyydellä. `piilo` voittaa `body.satelliitti-nimet`-sytytyksen.
- `sw.js`: uusi moduuli SHELLiin.

Egyptin tapaus: Niilin suiston nimiö nousee ylös, koska alla se
peittäisi Kairon pisteen. Suezin kanava ja Kairo menevät oikealle,
Faiyum jää alle.

## Todisteet

- `tests/satelliitti-nimiot.test.mjs` (6 testiä): oletuskylki, Egyptin
  rypäs ilman leikkauksia ja peittämättä pisteitä, pisteen ydin,
  saarrettu nimiö piiloon, vakaus ja CSS/kytkentävartio.
- `node --test tests/*.test.mjs`: 3665 / 0 hylättyä.
- **Vartio `savuke-astro-pallo` väite 46** (puhelinrivi, PR-portissa):
  Egypti kahdella korkeudella, pahin leikkaus ≤ 10 % ja vähintään 4
  nimiötä näkyvissä. Tulokset:
  - puhelin **55 / 55** (väite 46: pahin 0 %)
  - työpöytä **49 / 49**
  - Ennen korjausta väite olisi ollut punainen: 21 % ja 35 %.
