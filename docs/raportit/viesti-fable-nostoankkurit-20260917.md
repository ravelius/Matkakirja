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

---

## Paikkaus 17.9. ilta

Opus-agentti 17.9.2026 illalla Suomen aikaa, samalle haaralle
(`claude/bold-ride-vow4ki-nostoankkurit`, PR #2565). Omistajan kaksi
lisäystä, Raamattu **KARTTAUUDISTUKSEN PAATOKSET 32 TARKENNUS 2**.

### a) Turisti-infon kyltti on samaa kokoa kuin nostot — tehty

Kyltin mitta tuli kahdesta paikasta, molemmissa kaupunkimerkin omalla
kertoimella (`KAUPUNKIMERKIN_KERROIN`, 11,5 px:n nimiö ja lähizoomissa
katon 16 px). Molemmat ovat nyt noston mitta eli poltetun kartan mitta:

- `js/pallolauta/lauta.js` `KYLTIN_LADONTA`: `kaupunki: true` →
  **`false`**. Kenttä ei tarkoittanut tässä tietueessa mitään muuta kuin
  mittakerrointa (`merkinKerroin`); koko tietue menee vain
  `nostonLaatikko`lle, joten samalla korjautuvat **kyltin varaus
  ladonnassa (kohta 6)** ja **siirtyminen sivuun (kohta 7)** — ne
  lasketaan samasta laatikosta.
- `js/pallolauta/lauta.js` `paivitaTuristiInfo`: datumin
  `mitta: nostonMitta(KAUPUNKIMERKIN_KERROIN)` → **`nostonMitta()`**.

Napautus avaa oppaan ennallaan (`avaa`-kenttä, PAATOKSET 31 TARKENNUS 2
kohta 4) — siihen ei koskettu. Mitattu 0,773 **kaikilla kolmella
zoomilla**, sama luku kuin poltetulla (vartio 4 vihreä 3/3).

### b) Pelinappula on este — juurisyy löytyi, korjattu kolmessa kohdassa

Nappulan laatikko **ei ollut väärän kokoinen eikä väärässä kehyksessä**
siinä mielessä, mitä ensin epäiltiin — vika oli, että **kaksi kolmesta
ladontapolusta ei nähnyt nappulaa lainkaan**:

1. **Sovittelu ei tuntenut nappulaa.** `sovitteleLaput`
   (`js/pallolauta/sovittelu.js`) vaihtaa nimiön kylkeä ja siirtää sitä
   ruutupikseleinä *joka levossa ja joka zoomilla*, ja sen esteistössä
   olivat vain kaupunkien nimet ja turisti-infon kyltti. Merkki pysyi
   ankkurissaan, mutta **nimiö käännettiin lähizoomissa nappulan
   puolelle** — täsmälleen omistajan kuva. Korjaus: `ladoLevossa`
   antaa `kiinteat: [...infoTulos, ...merkit.laatikot('peli')]`, sama
   lista kuin nimiladonnan `pinot`.
2. **Ruutuvakio este skaalattiin koosta.** `ankkuroi`
   (`js/pallolauta/nostot.js`) kertoi esteen kaikki neljä nurkkaa
   `uloinOsuus`illa. Nappula on kiinteän kokoinen ruutumerkki (32 × 36
   px, `merkit.js nappulaElementti`), joten lähizoomissa (osuus 0,34)
   sen este oli saapumiskehyksessä **kolmasosan kokoinen**. Nyt
   kehykseen siirtyy vain keskipiste ja laatikko säilyttää mittansa.
3. **Ankkuri saattoi lukittua nappulan alle pysyvästi.** Ankkuri
   valitaan kerran ja pidetään (kohta 1), ja nappula on
   merkkikerroksen elementti, joka syntyy globe.gl:n omalla kellolla.
   Jos ensimmäinen ladonta ehti ennen nappulan elementtiä, `esteet` oli
   tyhjä ja ankkuri jäi sen alle lopullisesti. Korjaus on itsekorjaava:
   **kiinteän esteen alle jäänyt ankkuri ladotaan uudelleen**, ja
   tarkistus tehdään SAAPUMISKEHYKSESSÄ (ahtain mahdollinen näkymä),
   joten kerran irronnut ankkuri on vapaa joka zoomilla eikä ehto enää
   laukea. Samalla korjattiin, että jo ankkuroitu merkki on este
   **omassa ankkurissaan** eikä raa'assa datapisteessään.

Tulos: **yksikään nosto, aihenosto tai niiden nimiö ei ole enää
nappulan laatikon päällä millään zoomilla.** Ennen korjausta
*Kyyhkyposti…*, *Impressionistit…* ja *Tuileriain rauniot…* olivat
nappulan päällä, *Tuileriain rauniot…* kaikilla kolmella zoomilla.

### Mitat (Pariisi 390 × 844, dpr 2, Mac, Chrome for Testing)

`tools/savukkeet/mittaa-nostoankkurit.mjs`, yksi ajo (Fablen ohje: ei
sarjoja eikä vastakoetta; vastakokeen liput `?nostoankkurit=0` ja
`?nostokoko=0` ovat yhä koodissa ja ajettavissa käsin). Mittaan
lisättiin kaksi uutta vartiota (4 ja 5) ja kyltti part 2:n
laatikkojoukkoon. **8/13**, edellinen tila samalla mitalla oli 7/13.

| vartio | ennen paikkausta | jälkeen |
| --- | --- | --- |
| 4 kyltin mitta = poltettu, 3 zoomia | — (11,5/16 px) | **3/3 vihreä, 0,773** |
| 5 nappulan päällä, saapuminen | 4 (Kyyhkyposti…, Impressionistit…, Tuileriain rauniot…, **PARIISI**) | 1 (**PARIISI**) |
| 5 nappulan päällä, välizoomi | 2 (Tuileriain rauniot…, PARIISI) | 1 (PARIISI) |
| 5 nappulan päällä, lähizoomi | 1 (**Tuileriain rauniot…**) | **0 — vihreä** |
| 2 limittyviä pareja, lähizoomi | 1 | **0 — vihreä** |
| 2 limittyviä pareja, välizoomi | 2 | 1 (PARIISI × nappula) |
| 2 limittyviä pareja, saapuminen | 11 | 7 (kaikki Pariisin ulkopuolella) |

Kaappaukset (`tools/savukkeet/kaappaukset/nostoankkurit/`):
`nostoankkurit-saapuminen.png`, `nostoankkurit-valizoomi.png`,
**`nostoankkurit-lahizoomi.png`** (omistajan kuvan näkymä — nappula on
siinä nyt puhdas).

`node --test tests/*.test.mjs`: **3585 testiä, 0 punaista** (3572
vihreää, 13 ohitettua). Kaksi vartijatestiä
(`tests/pallosovittelu.test.mjs`) päivitettiin uuteen päätökseen:
`KYLTIN_LADONTA` `kaupunki: false` ja sovittelun uusi `kiinteat`-lista.

### Mitä jäi punaiseksi ja miksi

1. **PARIISI-nimi on yhä nappulan päällä** (saapuminen ja välizoomi;
   lähizoomissa nimeä ei ole ruudulla). Tämä ei ole nostokerroksen vaan
   **nimikerroksen** asia: `js/karttanimet.js ladoRuutunimet` saa
   nappulan `pinot`-listassa ja varaa sen, mutta pelaajan OMAN
   kaupungin nimi päätyy silti sen päälle. Jätin sen koskematta, koska
   omistajan kohta b nimesi nostojen nimiöt ja korjaus osuisi
   kolmanteen kerrokseen (kaupunkien nimien ladonta) tämän erän
   aikakaton ulkopuolella. **Suositus:** oma pieni erä
   `karttanimet.js`:ään, jossa pelaajan kaupungin nimi väistää pinoa
   samalla säännöllä kuin muutkin.
2. **Vartio 1 (ankkuri ei liiku) näyttää kaksi liikkunutta merkkiä,
   suurin ero 0,093°.** Tämä on korjauksen 3 **tarkoitettu** seuraus,
   ei paluu vanhaan vikaan: merkit, jotka olivat ensimmäisellä
   ladonnalla nappulan alla, irtoavat sieltä kerran heti kun nappulan
   elementti on olemassa — ja mitta lukee perustason ENNEN tuota
   irtoamista. Sen jälkeen ne eivät liiku (välizoomi ja lähizoomi ovat
   samassa pisteessä, ja vartiot 2 ja 5 ovat lähizoomissa vihreät).
   Jos Fable haluaa vartion vihreäksi, perustaso pitää lukea vasta
   toisen ladonnan jälkeen — se on mittarin muutos, ei pelin.
3. **Saapumisnäkymän 7 paria ovat samat kuin erässä 1** (Marseillen
   rykelmä, Camarguen poltettu pari, kaksi kaupunginnimiparia) — syy ja
   jatkoehdotus ovat tämän raportin luvussa 5, eikä niihin koskettu.

### Oletukset (päätin itse, aikakaton alla)

1. **Kaupunkimerkkien 11,5 px säilyy** (PAATOKSET 25 kohta 2).
   TARKENNUS 2 kohta a puhuu turisti-infon kyltistä, ei kartan
   hierarkian kaupunkinimistä.
2. **Vartijatestien päivitys on oikea liike.** Kaksi testiä lukitsi
   lähdetekstistä juuri ne kaksi kohtaa, jotka omistaja kumosi
   (`kaupunki: true`, sovittelun vanha `kiinteat`). Päivitin ne uuteen
   päätökseen perusteluineen sen sijaan, että olisin kiertänyt ne.
3. **Vastakoetta ei ajettu** (Fablen ohje). Vastakoelohko poistettiin
   mittarista; liput jäivät koodiin ja erän 1 vastakoekuvat kansioon.
4. **Versionostoa ei tehty** (`tools/uusi-versio.mjs` ajamatta), kuten
   erässä 1 — pelikoodi muuttuu, joten nosto tarvitaan julkaisussa.
