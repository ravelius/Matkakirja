# Aihenostot (PAATOKSET 27 TARKENNUS 2) — KESKEN

Haara: `claude/bold-ride-vow4ki-aihenostot` (pariisi-lahizoom-haaran päällä).
Sessio katkesi kontin tuhoutumiseen ennen kuin koodimuutoksia ehdittiin
kirjoittaa. Alla selvitystyön tulos, jotta seuraava agentti ei aloita nollasta.

## KESKEN: mitä jäi tekemättä

Kaikki toteutus. Yhtään riviä koodia ei muutettu; tässä commitissa on vain
tämä muistiinpano.

1. Kaupunkijäsenyys nostoriville.
2. `ryhmitaNostot`: aina-yhdistys kaupungin sisällä.
3. Aihenoston nimiö (tärkein nimi + `…`) ja piirto.
4. Lukumäärän poisto pallosta.
5. Vartiot (savuke-pariisi-lahizoom, tests/aihemerkit.test.mjs).
6. Kuva `docs/raportit/kuvat/aihenostot-390-20260916.jpg`.

## Selvitetty pohjatyö (seuraavalle)

### 1. Ryhmityssääntö — mistä kaupunkijäsenyys saadaan

`js/pallolauta/aihemerkit.js` `ryhmitaNostot` yhdistää nyt vain, jos
nimiölaatikot leikkaavat TAI merkkien ruutuetäisyys ≤ 44 px
(`RYHMITYKSEN_ETAISYYS_PX`), ja `maasto: true` jää aina ulos.

Kaupunkijäsenyyttä ei ole vielä nostorivillä. Koodin oma
kaupunkijäsenyyden mitta on `js/fokuskohteet.js`:

- `KAUPUNKIKATON_SADE = 8` (rivi 761) — "kaupungin rykelmä"
  (`karsiKaupunkiruuhka`, rivi 773); säde laudan yksiköissä kaupungin
  laatasta. Ei vielä vietynä ulos moduulista.
- `KAUPUNGIN_KOHDALLA_SADE = 7` (rivi 620) — kaupunkikartalle kuuluvien
  nostojen karsinta.
- kohdekarttojen nostolinkit (nostotunnus → kaupunki) antavat
  eksplisiittisen jäsenyyden lähizoomiin palautetuille nostoille.

Suositus: `maanKohdemerkit` (js/fokuskohteet.js rivi 3451) lisää riville
`kaupunkiAvain`-kentän: ensin nostolinkin kaupunki, muuten lähin
`tynka.fokuskohdeKaupungit`-kaupunki ≤ `KAUPUNKIKATON_SADE` laudan
yksikköä merkin ladotusta pisteestä (x, y). Kenttä kulkee
`js/pallolauta/nostot.js` rivin `rivit.push({ ... })` kautta (n. rivi 985)
ryhmitykseen. `ryhmitaNostot`-silmukkaan ehto: maasto ulos, aiheiden oltava
sama, ja jos molemmilla sama ei-tyhjä `kaupunkiAvain` → yhdistä AINA;
muuten nykyinen limitys/etäisyys-ehto (kaupunkien ulkopuoliset nostot).

### 2. Nimiö

`nostosymLyhennaNimio` (js/fokusnosto-symbolit.js rivi 1783) katkaisee
18 merkkiin (`NOSTOSYM_NIMIO_MERKKEJA`, rivi 1670) ja lisää perään YHDEN
pisteen. Kolmen pisteen merkki muualla pelissä on yksi `…`-merkki
(js/pollo.js, js/ui-apurit.js, js/kuvagalleria.js).

Nimiö on siis rakennettava lyhennetystä nimestä: poista mahdollinen
lopun `.` ja lisää `…`; piirrettäessä ja mitattaessa on annettava
`enintaan` = valmiin nimiön pituus, jottei `nostosymNimioTeksti`
lyhennä sitä uudelleen ja syö `…`-merkkiä.

Piirto: `asetteleAihemerkki` (js/pallolauta/aihemerkit.js) piirtää nyt
vain pohjan, lautasen, kehän ja symbolin sekä `d.maara > 1` -luvun.
Luku poistetaan ja tilalle `piirraNostosymNimio(g, teksti, symLaji,
puoli, enintaan)`. `aihemerkinLaatikko` on laajennettava kattamaan
nimiö samaan tapaan kuin `nostonLaatikko` (js/pallolauta/nostot.js),
jotta sovittelu ja osumapinta mittaavat samaa. Aihemerkkirivi on myös
otettava mukaan sovitteluun (`lappuja`, js/pallolauta/nostot.js n. rivi
1547) — nyt sinne poimitaan vain `nimioNakyy && nimi` -rivit, ja
aihemerkin datumilla on `nimioNakyy: false` (rivi ~1390 ja ~1410).

### 3. Mittaukset

Ei ajettuja mittauksia tässä erässä. Edellisen erän luvut (Pariisi,
390 × 844, dpr 2) ovat `js/pallolauta/nostot.js`:n taulukossa ja
`tools/savukkeet/savuke-pariisi-lahizoom.mjs`:n alkukommentissa.
