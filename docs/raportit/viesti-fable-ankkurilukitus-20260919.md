# Opus 2 → Fable: hahmotelmanostojen ankkurilukitus (erä I, PAATOKSET 48:n velka)

19.9.2026 klo 20.05–20.27 Suomen aikaa. Haara `opus2-ankkurilukitus`
(pohja origin/main). **Tehty:** työkalu ja mittaus. **Ei tehty:**
tauluja, `LUKITUT_MAAT`-muutosta eikä polttoa. Ne odottavat päätöstäsi
(kysymykset lopussa).

## Tulos lyhyesti

- `tools/lukitse-nostoankkurit-maalle.mjs` on nyt maakohtainen
  (`--maa ISO`, oletus FRA) ja sisältää **saaripoikkeuksen**.
  FRA:n kuiva-ajo antaa saman tuloksen kuin ennen (62 ankkuria,
  0 uutta, 0 siirrettyä).
- Pelin karkeat maarenkaat pudottavat saaret ja niemet renkaan
  ulkopuolelle. Maamaski (ne50) korjaa suurimman osan, koska se tuntee
  Elban, Rügenin ja Bornholmin kokoiset saaret. **1:50M-maskista
  puuttuu kuitenkin viisi saarta:** Stromboli 67 km, Helgoland 56 km,
  Antikythera 44 km, Berlengas 22 km ja Capri 17 km "merellä". Ilman
  poikkeusta lukitus veisi ne mantereelle. Poikkeus pitää saaren oman
  koordinaatin, kun nosto on saari (tyyppi `saari` tai lista `SAARET`:
  Stromboli, jonka tyyppi on `vuori`) ja maskin siirto olisi yli 10 km.
- Merinostot (Välimeri, Pohjanmeri, Itämeri, Joonianmeri…) siirtyvät
  lähimmälle rannalle, kuten Ranskassa v1941:stä lähtien (FRA-taulun
  `valimeri` ja `biskajanlahti` ovat rannalla). Omistajan sääntö:
  ankkuri on maalla.

## Mittaus

Pelin rengas = `maanRenkaatAsteina(maapolygonit.json, ISO)` pallolaudan
käännöksellä (sama kuin maakorostuksessa). Maa = `tools/maamaski.mjs`
(ne50.geojson, sama aineisto kuin pelin rantaviiva). Elävät nostot =
pääkartan nostot ilman kaupunkipisteitä. Lukko-sarakkeet ovat työkalun
`--kuiva`-ajosta, jossa kaupungin sisäiset nostot on karsittu kuten
Ranskassa.

| Maa | Nostoja | joista hahmotelma | Renkaan ulkopuolella | – maskin mukaan maalla | – maskin mukaan merellä | Merellä yhteensä | Lukkotaulun ankkureita | Siirto merestä maalle | Saari pidetty |
|---|---|---|---|---|---|---|---|---|---|
| ESP | 71 | 30 | 3 | 0 | 3 | 4 | 54 | 4 | 0 |
| ITA | 68 | 29 | 10 | 1 | 9 | 10 | 50 | 5 | 2 |
| DEU | 67 | 29 | 5 | 1 | 4 | 4 | 57 | 3 | 1 |
| PRT | 53 | 29 | 5 | 0 | 5 | 13 | 48 | 7 | 1 |
| GRC | 71 | 29 | 15 | 6 | 9 | 12 | 62 | 11 | 1 |
| AUT | 56 | 29 | 0 | 0 | 0 | 0 | 44 | 0 | 0 |
| NLD | 57 | 29 | 5 | 2 | 3 | 3 | 49 | 3 | 0 |
| BEL | 26 | 26 | 2 | 2 | 0 | 0 | 26 | 0 | 0 |
| POL | 52 | 27 | 4 | 3 | 1 | 1 | 45 | 1 | 0 |
| CZE | 51 | 27 | 0 | 0 | 0 | 0 | 46 | 0 | 0 |
| DNK | 24 | 0 | 10 | 0 | 10 | 10 | 20 | 6 | 0 |
| HUN | 23 | 0 | 2 | 2 | 0 | 0 | 23 | 0 | 0 |
| SWE | 25 | 0 | 4 | 1 | 3 | 9 | 20 | 4 | 0 |

Renkaan ulkopuolella, mutta **maalla** (lukitus ei siirrä):
- ITA Brennero
- DEU Bodensee
- GRC Strymonas, Evros, Prespa, Navagio, Navarino, Simonides
- NLD Vaalserberg, Bourtange
- BEL Semois, Zwin
- POL Rysy, Śnieżka, Białowieża
- HUN Írottkő, Drava
- SWE Tornionjoki

Nämä ovat rajan tuntumassa (vuoret, joet, järvet), eli karkea rengas
on väärässä, ei piste.

Suurimmat siirrot merestä rannalle:

| Maa | Nosto | Siirto |
|---|---|---|
| ITA | Tyrrhenanmeri | 166 km |
| GRC | Joonianmeri | 122 km |
| DEU | Pohjanmeri | 100 km |
| ITA | Adrianmeri | 89 km |
| SWE | Pohjanlahti | 72 km |
| ITA | Ligurianmeri | 67 km |
| PRT | Atlantti | 61 km |
| GRC | Kreetanmeri | 55 km |
| NLD, DNK | Pohjanmeri | 50 km |
| POL | Itämeri | 50 km |
| ESP | Välimeri | 44 km |
| GRC | Egeanmeri ja Traakianmeri | 39 km |
| ESP | Finisterre | 11 km (majakka on 1:50M-rannan ulkopuolella) |
| DNK | Storebæltin silta | 11 km |

Muut siirrot ovat rannan tuntumassa (1:50M:n yleistyksen minimi 6 km,
VARA 0,05°).

## Miksi en kirjoittanut tauluja enkä kytkenyt `LUKITUT_MAAT`ia

1. **Lukittu ankkuri ohittaa levityksen** (`js/pallolauta/nostoankkurit.js`
   lukittuAnkkuri). FRA-taulu vietiin aikanaan pelistä, eli puhelimen
   saapumiskehyksen levitetyt pisteet (`tools/vie-nostoankkurit.mjs`,
   Playwright). Jos uusi maa lukittaisiin suoraan datapisteisiin, sen
   rykelmät (Madrid, Rooma, Berliini…) menettäisivät levityksen, ja
   nimiöt limittyisivät elävillä pisteillä heti.
2. **`LUKITUT_MAAT` on polttoketjun ehto:** taulullisen maan merkki
   ilman ankkuria ei pala lainkaan. Se koskee siis vasta polttoa.

## Ehdotettu ketju ja kysymykset sinulle

Ketju maata kohden:
1. `vie-nostoankkurit.mjs --iso ESP --yhdista` (Playwright, puhelimen
   kehys; selainajo, yksi kerrallaan, noin 2–3 min maata kohden).
2. `lukitse-nostoankkurit-maalle.mjs --maa ESP` (maalle + saaret).
3. Taulu `js/packs/nostoankkurit-esp.js` `LUKITUT_ANKKURIT`-tuontiin,
   ESP `LUKITUT_MAAT`iin ja **nostotason poltto** (sinun ajosi, kuorma).

Kysymykset:
- **K1:** Ajanko vaiheet 1–2 kaikille 13 maalle nyt (noin 40 min
  selainaikaa, yksi selain kerrallaan) ja jätän vaiheen 3 kytkennän
  sekä polton sinulle? Vai vain maat, joiden poltto on seuraavana?
- **K2:** Merinostot rannalle (FRA-linja) vai merelle? Joonianmeren
  122 km:n ja Tyrrhenanmeren 166 km:n siirto vie ne kauas kohteestaan.
  Vaihtoehto on poikkeus tyypille `meri` (piste pidetään, koska meri
  on kohde).
- DNK, HUN ja SWE: mainissa niillä ei vielä ole hahmotelmia (0), vaan
  vanhat nostot; DNK ja HUN tulevat v1963:ssa. Mittaus koskee nykyisiä
  rivejä.
