# Opus 2 → Fable: Malta kartalle (erä K)

19.9.2026 klo 21.30–21.55 Suomen aikaa. Haara `opus2-malta` (pohja
origin/main). Ei versionostoa, ei PR:ää.

## Tehty

1. **Maan muoto** `countryShapes.MLT` (`js/packs/maailmankartta.js`)
   tehtiin samalla työkalulla kuin Kirgisia, Luxemburg ja Slovenia
   (`tools/maat-lisaa-maailmankartalle.mjs`, Natural Earth 1:50M
   `ne50.geojson`). MLT lisättiin työkalun listaan asetuksilla
   `minKoko: 0` ja `sieto: 0,3` (kuten Hongkong ja Singapore) ja ankkurilla
   MKD:n perään.
   - Tulos: **2 rengasta** (Malta ja Gozo, 14 pistettä), keskus
     6314,4 / 1961,6.
   - Comino ja Filfla ovat 1:50M:ssä liian pieniä omiksi renkaikseen.
2. **Maapolygoni** `assets/data/maapolygonit.json` generoitiin uudelleen
   (`tools/generoi-maapolygonit.mjs`, Natural Earth 10m). Maita on nyt
   135/135 ja MLT:llä 2 rengasta. Tarkistettu: yhdenkään muun maan
   polygoni ei muuttunut.
3. **FOKUS_POHJAT.MLT** (`js/packs/fokus-grc.js`):
   - `rajaus` { x 6301, y 1949,5, w 23,3, h 21 }: saaristo ja vain
     5 lautayksikön marginaali (muilla maillä noin 20 = 0,6°), jotta
     saaret täyttävät lehden.
   - `bbox` samalla kaavalla kuin muilla maillä (korkeus 1,3 ×
     rajaus, kuvasuhde 1,6).
   - Lisäksi rivi `paikallinen: 'Malta'`, `valtiomuoto: 'Britannian
     kruununsiirtomaa v. 1873'` (en-Wikipedia, Crown Colony of Malta).
4. **Lippu** `assets/liput/malta.png` (Commons *Flag of Malta.svg*, PD)
   haettiin `tools/fetch-flags.mjs`:llä, ja
   `js/packs/liput-paikalliset.js` sai rivin. Työkalu haki samalla
   yhdeksän muuta puuttuvaa lippua ja kirjoitti rekisteriin roskarivin
   (`["\n + ", '.png']`), joten rajasin muutoksen käsin vain Maltaan.
   **Velka:** muiden puuttuvien lippujen tarve ja työkalun
   jäsennysvika selvitetään omana eränään.
5. **Genetiivi** `Malta → Maltan`
   (`tests/maa-otsikot.test.mjs`, sanatarkistustaulu).

`node --test tests/*.test.mjs`: 3698 / 0.

## Lehtikuvaa MLT.webp ei tehty, eikä tarvita

Lehtijärjestelmä purettiin v1365:ssä (*"Vanha lehtijärjestelmä purettu,
laatat ainoa kartta"*, `tools/tee-fokuskartta.mjs` poistettiin). Kartta on
nykyään laattapyramidi, joka kattaa koko maailman, Malta mukaan lukien.
FOKUS_POHJAT-rivistä peli lukee vain kentät `lauta`, `bbox` ja
`rajaus` (nostoladonta ja lehden osuus). `tiedosto: 'MLT.webp'` on
kirjoitettu vain siksi, että `tests/fokuspohjat` vaatii nimen kuten
muilla riveillä. **Ämpäriin ei siis vietävää ole.**

Jos Maltalle halutaan kohdemaan värillinen topografia (väritaso, kuten
muilla EU-mailla), se on nostotason tapaan pyramidin poltto
(`tools/generoi-laattapyramidi.mjs` VÄRITASO, `varitasot.MLT`). Se on
eri päätös.

## osuuLehteen('MLT')

Sonnet 2:n paketti (`hahmotelma-mlt.js`) ei ollut vielä haarana, joten
tarkistin rajauksen 11 tyypillisellä kohteella. **Kaikki ovat lehdellä
(true):**
- Valletta, Mdina, Ħaġar Qim, Blue Grotto
- Marsaxlokk (itäisin)
- Ġgantija ja Dwejra (Gozon länsikärki)
- Comino Blue Lagoon, Mellieħa, St Paul's Islands
- Filfla (eteläisin)

Kohteet ovat 0,5–2 lautayksikön päässä toisistaan (esim. Valletta
6317,2/1961,4 ja Mdina 6313,4/1961,8).

## Reitti Maltan lehteen ilman kaupunkia (kirjattava päätös)

Mitattu koodista:
- **Kohdemaa johdetaan pelaajan kaupungista** (`js/fokuskohteet.js`
  `nykyinenIso` → `cityCountry[kaupunki]`). Ilman kaupunkia Malta ei
  koskaan ole kohdemaa, joten **hahmotelmanostot eivät näy kartalla
  lainkaan** normaalissa pelissä. Sama koskee Belgiaa, Slovakiaa ja
  Sloveniaa (Sonnet 1 kierros 12: Belgian napautus avasi Lille-kortin).
- **Maalehti** (`avaaMaalehti`) aukeaa "Maiden tiedot" -näkymästä
  (`js/vertailu.js`): Maltan muodon napautus näyttää maapilleri, ja
  pilleri avaa lehden. Lehdessä on vain maan perussivut
  (MAAKARTAT/MAA_KATEGORIAT, jos ne kirjoitetaan). Nostoja siellä ei
  ole, koska kartan nostokerros seuraa kohdemaata.

Vaihtoehdot päätettäväksi:
1. **Pelikaupunki Valletta** (reitti Sisilia ⇄ Valletta meritse). Tämä
   on ainoa reitti, joka tekee Maltasta kohdemaan ilman koodimuutosta.
2. **Naapurimaan kohdemaa:** Sisiliasta (ITA) Maltan nostot näkyisivät
   naapurina, jos MLT poltetaan nostotasoon ja naapurimuste sallitaan.
   Nyt `NAYTA_VAIN_KOHDEMAAN_NOSTOT` rajaa sen pois.
3. **Kohdemaa kamerasta:** kaupungittoman maan nostot näytetään, kun
   kamera on sen lehden rajauksen sisällä. Tämä on koodimuutos
   `nykyinenIso`on, ja se koskee myös BEL/SVK/SVN:ää.
