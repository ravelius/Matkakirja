# Viesti Fablelle: nostojen kiinteät kartta-ankkurit (PAATOKSET 32, erä 1)

Opus-agentti 17.9.2026 klo 21.45 Suomen aikaa. Haara
`claude/bold-ride-vow4ki-nostoankkurit` origin/mainin (v1933) päältä.
Tämä erä on PAATOKSET 32:n kohdat **1, 2, 4 ja 5**; kohta 3 (viuhka
listaksi) on toisen agentin erä, eikä tässä ole koskettu viuhkan
piirtoon, `viuhkanAsemat`iin eikä viuhkan CSS:ään.

## 1. Juurisyy: miksi nostot liikkuivat zoomatessa

Merkin oma paikka (lat/lng) ei ole koskaan liikkunut. Liikkui kaikki
muu, mikä ruudulla määrää sen paikan — kolme erillistä syytä:

1. **Nimiön väistö on zoomin funktio.** `sovitteleLaput`
   (`js/pallolauta/sovittelu.js`) siirtää nimiötä ruutupikseleinä
   (`SOVITTELUN_SIIRTO_PX` 6) ja vaihtaa sen kylkeä sen mukaan, mitä
   *juuri sillä zoomilla* on tiellä. Sama nosto sai eri kyljen ja eri
   siirron joka zoomiportaassa.
2. **Aihenoston paikka on jäsentensä keskiarvo**, ja jäsenyys
   laskettiin ruutumitoilla (`RYHMITYKSEN_ETAISYYS_PX` 44 px ja
   laatikoiden limitys, `js/pallolauta/aihemerkit.js`). Kun kamera
   zoomasi, kaupungin ulkopuoliset rykelmät hajosivat ja syntyivät
   uudelleen — ja aihemerkin keskipiste hyppäsi mukana. Juuri tämä
   näkyi omistajan kuvissa (*Kaulanauhajuttu*, *Braillen pisteet*,
   *Seinen.*).
3. **Nimiön mitta kasvoi kartan mukana** (PAATOKSET 14), joten myös
   laatikot — ja niiden myötä ryhmitys ja väistö — olivat eri kokoisia
   joka zoomilla.

## 2. Ratkaisu

Uusi moduuli **`js/pallolauta/nostoankkurit.js`** (perustelut ja
algoritmi siellä), kytkettynä `js/pallolauta/nostot.js`:n ladontaan.

- **Saapumiskehys.** Ryhmitys ja levitys lasketaan kehyksessä, jossa
  kamera on uloimmassa sallitussa asennossaan: ruutupiste × `uloinOsuus`.
  Kartan mittakaava on täsmälleen kääntäen verrannollinen tähän lukuun
  (2,12 px/yks × osuus = vakio, mitattu 16.9.), joten kehyksen
  etäisyydet ovat maantieteellisiä eivätkä kameran. **Ryhmitys ei siis
  enää riipu zoomista** — syy 2 poistuu.
- **Levitys.** Merkkejä työnnetään erilleen (pienimmän limityksen
  akselia pitkin), kunnes jokaisen laatikon välissä on
  `ANKKURIN_VALJYYS_PX` = 7 px. Kiinteitä esteitä ovat poltettu muste,
  kaupunkimerkit ja **pelinappula** (laatikot tulevat laudalta,
  `merkit.laatikot('peli')`). Siirtokatto 260 px pitää levityksen
  kaupungin ympäristössä. Varaus lasketaan **aina nimiöllisenä**, myös
  kun nimiö on juuri nyt piilossa — muuten ankkuri riippuisi zoomista
  juuri sen kentän kautta, jonka takia se laskettiin.
- **Ankkuri.** Tulos käännetään asteiksi (paikallinen lineaarikuvaus,
  `pikseleistaAsteiksi`) ja talletetaan **muistiin** (ei tallennukseen).
  Varasto on ruutukoon niminen: kameran pudottamien merkkien paluu ei
  lado kaupunkia uudelleen, vaan **jo ankkuroitu nosto pysyy paikallaan
  ja uudet väistävät sitä kiinteänä esteenä**. Ruutukoon vaihtuessa
  ankkurit lasketaan uudelleen.
- **Yksi koko (kohta 4).** `nostonKarttakerroin` = 1: nostot ja
  aihenostot ovat ruutuvakio eli täsmälleen poltetun kartan kokoa
  (nimiö 8,5 px) joka zoomilla. Aihemerkin värilautasen säde
  `AIHEMERKIN_R` oli 9,2 yksikköä, kun noston oma ruutu on
  `NOSTOSYM_MINI_RUUTU` 7,4 — aihenosto piirtyi 1,24-kertaisena; säde
  on nyt sama luku. PAATOKSET 31:n 16 px:n katto jää paikalleen
  (se suojaa myös vastakokeen vanhaa polkua).
- Osumapinta seuraa ankkuria itsestään: `nostonOsat`, `nostonLaatikko`
  ja `osumaLaatikot` lasketaan samasta rivistä, jonka `p`/`lat`/`lng`
  ankkurointi kirjoittaa. Viuhkan lepotesti ajetaan vasta ankkuroinnin
  jälkeen, muuten viuhka sulkeutuisi heti auettuaan.

Vastakokeet: **`?nostoankkurit=0`** (vanha ladonta) ja
**`?nostokoko=0`** (kartan mukana kasvava mitta).

## 3. Mitat (Pariisi 390 × 844, dpr 2, Mac, Chrome for Testing)

Mitta: `tools/savukkeet/mittaa-nostoankkurit.mjs` (kolme zoomia:
saapuminen 1,0 · välizoomi 0,6 · lähizoomi 0,34 saapumiskorkeudesta).

Tulos **7/8 vartiota läpi**:

| | ennen (`?nostoankkurit=0&nostokoko=0`) | jälkeen |
| --- | --- | --- |
| suurin ankkurin ero zoomien välillä | 6 merkkiä liikkui | **0,000000000°** |
| limittyviä laatikkopareja, saapuminen | 14 | **7** (kaikki Pariisin ulkopuolella, ks. luku 5) |
| limittyviä pareja, välizoomi | 4 | **0** |
| limittyviä pareja, lähizoomi | 0 | **0** |
| noston mitta kaikilla zoomeilla | 0,773 → 1,045 → kasvaa | **0,773 = poltettu joka zoomilla** |

Ensimmäinen ajo (ennen varaston korjausta) antoi 3/8: ankkurit
laskettiin uudelleen, koska merkkijoukko kutistuu kameran mukana
(35 → 11 → 9 merkkiä: merkkiportti pudottaa kaukaiset). Varasto on nyt
ruutukoon niminen ja **additiivinen**, ja kokovartio laskee vain
nostoja (kaupunkimerkin 11,5 px on PAATOKSET 25, ei tämän erän asia).
Toinen ajo on tämän raportin luvut; PR:n Savukkeet-työnkulku ajaa
sarjan Mac-runnerilla.

Kaappaukset (`tools/savukkeet/kaappaukset/nostoankkurit/`):
`nostoankkurit-saapuminen.png`, `nostoankkurit-valizoomi.png`,
`nostoankkurit-lahizoomi.png` ja vastakokeen kolme
`nostoankkurit-vastakoe-*.png`.

`node --test tests/*.test.mjs`: 3585 testiä, ensimmäisellä ajolla
1 punainen (sw.js:n SHELL-lista puuttui uusi moduuli) — korjattu, ja
`tests/sw.test.mjs` + `tests/dokumentit.test.mjs` ovat vihreitä.

## 4. Oletukset (päätin itse, aikakaton alla)

1. **Kaupunkimerkkien 11,5 px säilyy** (PAATOKSET 25 kohta 2): kohta 4
   puhuu nostopalloista ja niiden nimiöistä, ei kartan hierarkian
   kaupunkinimistä. Kaupunkimerkki on nyt kuitenkin *kiinteä* 11,5 px
   joka zoomilla, koska karttakerroin on 1 kaikille.
2. **Turisti-infon kyltti** seuraa samaa kerrointa, joten se on nyt
   11,5 px myös lähizoomissa (ennen 16 px). Tämä on PAATOKSET 32
   kohdan 4 mukainen, mutta se muuttaa PAATOKSET 31 TARKENNUS 2
   kohdan 5 mittaa — Fable päättää, kirjataanko se Raamattuun.
3. **Poltettua mustetta ei voi siirtää.** Kaksi laattaan poltettua
   nostoa (*Camarguen hevoset* × *Camarguenvarsa*) limittyvät kuvassa;
   se korjaantuu vasta uudessa poltossa (R2-ajo). Vartio raportoi
   poltettu×poltettu-parit erikseen eikä kaada mittaa niihin; elävä
   muste väistää poltettua.
4. **Sovittelu jätettiin voimaan**, koska se suojaa kaupunkien nimiltä.
   Se voi yhä siirtää *nimiötä* pikselejä zoomien välillä — merkki ei
   liiku, mutta nimiön kylki voi vaihtua. Jos omistaja haluaa myös
   nimiön kyljen lukkoon, se on yhden rivin jatko (kylki ankkurin
   mukana).

## 5. Mitä jäi auki

- **Kaupungin oma nimi (PARIISI) kasvaa yhä kartan mukana**
  (`js/pallolauta/nimet.js`, PAATOKSET 14) eikä ole tämän erän katon
  alla. Lähizoomissa se on ruudun levyinen, joten sen alle voi jäädä
  nimiöitä, vaikka ankkurit ovat väljällä: nimiladonta väistää
  nostoja, mutta valtava kyltti tarvitsee joko oman katon tai
  PAATOKSET 32 kohdan 4 laajennuksen. **Suositus Fablelle:** kysy
  omistajalta, koskeeko "yksi koko" myös kaupunkien nimikylttejä.
- **Saapumisnäkymän 7 paria (punainen vartio) ovat kaikki Pariisin
  ulkopuolella**: *Marseillen saippua* × *La Bonne Mère…* ×
  *Cosquerin luola* (Marseillen oma rykelmä), *Camarguen hevoset* ×
  *Camarguenvarsa* sekä kaksi kaupunginnimiparia (*Tuileriain rauniot…*
  × Pariisi, *Marseillen saippua* × Marseille). Kaksi syytä: a) nämä
  ankkuroituivat ensimmäisellä ladonnalla, jolloin osa merkeistä oli
  vielä ruudun ulkopuolella (`ruudulla` null → ei ankkuria → ankkuri
  myöhemmin, kun naapurit olivat jo lukossa); b) kaupungin nimikyltti
  ladotaan nostojen JÄLKEEN eikä väistä niitä aina. Kummallekin on
  suora jatko: ankkuroi koko maan nostojoukko kerralla saapumisen
  päätteeksi (ei ruudun mukaan), ja anna nimiladonnalle sama väljyys.
- Levityksen väljyys (7 px) ja siirtokatto (260 px) ovat ensimmäinen
  mitoitus; jos omistaja haluaa vielä väljemmän kuvan, luvut ovat
  yhdessä paikassa (`nostoankkurit.js`).
- **Vaatii versionoston** (pelikoodi muuttuu: `js/pallolauta/nostot.js`,
  `js/pallolauta/aihemerkit.js`, `js/pallolauta/lauta.js`, uusi
  `js/pallolauta/nostoankkurit.js`, `sw.js`). `tools/uusi-versio.mjs`
  on tämän erän ohjeen mukaan jätetty ajamatta.
