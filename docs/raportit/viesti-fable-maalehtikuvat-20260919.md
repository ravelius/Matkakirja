# Viesti Fablelle: maalehtinostot-fra.js — 18 nostolle toinen Commons-kuva

19.9.2026 klo 12.04–12.16 Suomen aikaa, Opus-sisältöagentti (kuvaerä).
Haara `claude/bold-ride-vow4ki-maalehtikuvat`, pohja
`claude/bold-ride-vow4ki` (55e9d577).

Tehtävä oli Raamatun KARTTAUUDISTUKSEN PAATOKSET 44 kohta 2:n viimeinen
avoin rivi: Sonnetin tarkistus
(docs/raportit/viesti-fable-ranska-nostot-tarkistus-20260919.md) totesi,
että `js/packs/maalehtinostot-fra.js`:n kaikilla 18 nostolla on täsmälleen
yksi kuva — "rakenteellisesti", koska kuva luetaan lehdestä. Nyt
**jokaisella 18 nostolla on kaksi kuvaa** (tarkistettu ajamalla pakka:
18/18 = 2).

## TÄRKEIN LÖYDÖS: kenttä on `galleria`, ei `kuvat`

Erän ohje pyysi `kuvat`-listaa "samalla rakenteella kuin
maastokohteet-fra.js:ssä". Renderöijän tarkistus näytti, että se EI olisi
näkynyt kortilla:

- **Nosto** piirtyy js/fokusnosto.js:llä, ja sen kuvalista luetaan
  funktiossa `nostonKuvat` (rivi ~1292):
  `[nosto?.kuva, ...(Array.isArray(nosto?.galleria) ? nosto.galleria : [])]`.
  Kenttää `kuvat` ei lueta nostolta lainkaan.
- **Kohde** piirtyy js/fokuskohteet.js:llä, ja sen lista on `kuvat`
  (`kohteenKuvat`, rivi ~4792). Siksi maastokohteet-fra.js ja
  hahmotelma-fra.js (jotka menevät `KOHDE_MAAT`-tauluun) käyttävät
  oikeutetusti `kuvat`-kenttää.
- MAALEHTINOSTOT_FRA menee `js/packs/fokusvirta-pariisi.js`:n
  nostolistaan, eli se on nosto. Kuvat kirjattiin siis `galleria`-kenttään.

**Renderöintikorjausta ei tarvittu.** `galleria` on ollut nostolla
ensiluokkainen kenttä 2.9.2026 alkaen (karttauudistuksen erä 10), ja kahden
kuvan nosto piirtyy valmiilla selailunuolilla
(`piirraNostonKuvasarja`). Kuvatietueen muoto on merkilleen sama kuin
maastokohteet-fra.js:ssä (osoite, lyhyt, selite, lahde, tekija, lahdeUrl,
lisenssi, lisenssiUrl), ja `osoite` kulkee `assetOsoite`n läpi
sellaisenaan, koska se on valmis ämpäriosoite (js/media.js rivi 417).

## Mitä tehtiin

- Uusi taulu `KUVAT` tiedoston sisään (ei `JAKO`-riveihin: jakosuunnitelma
  kertoo mistä lehden sivusta kortti syntyy ja mihin se ankkuroidaan,
  eivätkä kartan omat kuvat kuulu sinne). `korttiLehdesta` liittää sen
  kortille `galleria`-kenttänä.
- Yhteensä **18 uutta Commons-kuvaa**, kaikki ladattu 1800 px leveinä.
- Lehden omaan aineistoon (js/packs/maa-kategoriat.js FRA), teksteihin,
  minikysymyksiin, symboleihin eikä ankkureihin ei koskettu.

## Kuvat nostoittain

Tiedostot ovat kansiossa
`/Users/samireivinen/Matkakirja-fable/.claude/tmp-maalehtikuvat/`
(worktreen ulkopuolinen tilapäiskansio, ei repossa), ja osoitteet pakassa
ovat muotoa `https://media.matkakirja.app/karttanostot/20260919/<tiedosto>`.
**Kuvia ei ole viety ämpäriin** — vienti on Fablen työ, ja siihen asti
osoitteet vastaavat 404:llä (sama tila kuin hahmotelma-fra.js:n ja
maastokohteet-fra.js:n kuvilla). Puuttuva kuva pudotetaan sarjasta, joten
kortti näyttää siihen asti vain lehden oman kuvan eikä tyhjää kehystä.

| Nosto | Lisätty kuva | Tekijä | Lisenssi | lahdeUrl | Tiedosto |
| ----- | ------------ | ------ | -------- | -------- | -------- |
| maalehti-peilisali | Rauhansopimuksen allekirjoitus peilisalissa 28.6.1919 | Helen Johns Kirtland ja Lucian Swift Kirtland | Public domain | commons.wikimedia.org/wiki/File:Treaty_of_Versailles_Signing,_Hall_of_Mirrors.jpg | `fra-maalehti-peilisali-a22fa9d8.jpg` |
| maalehti-roquefort | Suuri kypsytysluola Combalou-vuoren sisällä | Daniel Villafruela | CC BY-SA 3.0 | .../File:Roquefort_sur_Soulzon-Grande_cave-20140628.jpg | `fra-maalehti-roquefort-28df3754.jpg` |
| maalehti-michelin-opas | Ensimmäisen Michelin-oppaan kansi 1900 | tuntematon | Public domain | .../File:Guidem_michelin_1900.jpg | `fra-maalehti-michelin-opas-707cb9ef.jpg` |
| maalehti-chandeleur | Ohukaisten paistoa kynttilänpäivänä 2.2.1934 | Agence Rol | Public domain | .../File:2-2-34,_Chandeleur_(fabrication_de_crêpes)_-_btv1b532912784.jpg | `fra-maalehti-chandeleur-5eb70599.jpg` |
| maalehti-montgolfier | Veljesten muistomerkki Annonayssa | Jacques Forêt (Sequajectrof) | CC BY-SA 3.0 | .../File:Annonay_Montgolfier_2011-08-01-032.jpg | `fra-maalehti-montgolfier-84c01965.jpg` |
| maalehti-braille | Kaksi sormea lukee pistekirjoitussivua | Antonio X. Alonso | CC BY 2.0 | .../File:A_person_reading_a_braille_book.jpg | `fra-maalehti-braille-ac1fa422.jpg` |
| maalehti-pasteur-meister | Rabiesrokotus Pasteurin vastaanotolla, litografia | F. Pirodon L.-L. Gsellin mukaan (Wellcome) | CC BY 4.0 | .../File:Rabies_vaccination_in_Pasteur's_clinic_in_Paris._Lithograph_Wellcome_L0003730.jpg | `fra-maalehti-pasteur-meister-219fe1ca.jpg` |
| maalehti-cinematographe | Cinématographe Institut Lumièren kokoelmassa | Victor Grigas | CC BY-SA 4.0 | .../File:Institut_Lumière_-_CINEMATOGRAPHE_Camera.jpg | `fra-maalehti-cinematographe-e35af7e5.jpg` |
| maalehti-dune-du-pilat | Dyynin itärinne ja La Teste-de-Buchin mäntymetsä | Rundvald | CC BY-SA 4.0 | .../File:Dune-du-Pilat+pinede-byMmeRundvald.jpg | `fra-maalehti-dune-du-pilat-cb0307f3.jpg` |
| maalehti-camarguen-hevoset | Valkoinen tamma ja tummanruskea varsa | Elliott Brown | CC BY 2.0 | .../File:Camargue_Jument_et_son_poulain.jpg | `fra-maalehti-camarguen-hevoset-de271f45.jpg` |
| maalehti-chaine-des-puys | Tulivuoriketju Puy de Dômen laelta | Tangopaso | Public domain | .../File:Chaîne_des_Puys_from_Puy_de_Dome.jpg | `fra-maalehti-chaine-des-puys-0401261b.jpg` |
| maalehti-couesnonin-vuorovesi | Vuosisadan vuorovesi maaliskuussa 2015 | Édouard Hue | CC BY-SA 4.0 | .../File:March_2015_equinox_spring_tide_at_Mont_Saint-Michel-2.jpg | `fra-maalehti-couesnonin-vuorovesi-62337764.jpg` |
| maalehti-tour-de-france-1903 | Ensimmäisen Tourin reittikartta heinäkuulta 1903 | L'Auto-vélo | Public domain | .../File:L'itinéraire_du_premier_Tour_de_France_cycliste,_en_juillet_1903.jpg | `fra-maalehti-tour-de-france-1903-56fde3f3.jpg` |
| maalehti-petanque | Jeu provençal Avignonin puistokujalla | Fif' | CC BY-SA 2.0 | .../File:Jeu_provençal_allées_de_l'Oulle_Avignon.jpg | `fra-maalehti-petanque-933799cc.jpg` |
| maalehti-roland-garros | Lentäjä Roland Garros Demoiselle-koneensa edessä 1910 | Agence Meurisse | Public domain | .../File:Roland_Garros_1910.jpg | `fra-maalehti-roland-garros-96be9593.jpg` |
| maalehti-le-mans | Brasier-autot varikolla ensimmäisen kisan jälkeen 27.5.1923 | Agence Rol | Public domain | .../File:27-5-23,_Le_Mans,_les_Brasier_après_la_course_(automobile_des_24_heures)_-_btv1b531077586.jpg | `fra-maalehti-le-mans-d9fc444d.jpg` |
| maalehti-marseillen-saippua | Saippuamassan leikkuu veitsellä, puupiirros 1873 | Louis Figuier ja Jules Férat | CC BY 2.0 | .../File:Les_merveilles_de_l'industrie,_1873_"Coupage_du_savon_de_Marseille_en_pains,_au_moyen_du_couteau"._(4618578904).jpg | `fra-maalehti-marseillen-saippua-d96c8915.jpg` |
| maalehti-bouquinistit | Kirjalaatikot Quai Saint-Michelillä 1967 | Daniel Villafruela | CC BY-SA 4.0 | .../File:Paris_75005_Quai_Saint-Michel_towards_Notre-Dame_Bouquinistes_1967.jpg | `fra-maalehti-bouquinistit-11d8e477.jpg` |

Historia + nykypäivä -pari toteutuu kymmenellä nostolla (peilisali,
michelin-opas, chandeleur, pasteur-meister, tour-de-france-1903,
roland-garros, le-mans, marseillen-saippua, bouquinistit sekä
montgolfier muistomerkin kautta). Lopuilla kelvollista vanhaa kuvaa ei
löytynyt, joten pari on toinen näkökulma nykypäivästä — Roquefortilla
lehden juustokuvan pariksi tuli kypsytysluola, Camarguessa aikuisen
hevosen pariksi tummanruskea varsa ja Dune du Pilat'lla dyynin
metsänpuoleinen rinne.

## Lisenssilinja

Kelpuutettiin vain Public domain, CC0, CC BY ja CC BY-SA. Jokaisen
lisenssi, tekijä, koko ja lähdesivu luettiin Commonsin omasta API:sta
(`extmetadata`: LicenseShortName, UsageTerms, LicenseUrl, Artist,
ImageDescription) ennen latausta — ei siis pakoista eikä muistista.
Yhtään NC-, ND-, GFDL- tai FAL-ehtoista tai "No restrictions" -merkittyä
tiedostoa ei otettu mukaan.

## Hylätyt ja miksi

| Commons-tiedosto | Aiottu nosto | Lisenssi | Hylkäyksen syy |
| ---------------- | ------------ | -------- | -------------- |
| `Etienne et Joseph de Montgolfier frères … btv1b55001632f.jpg` | montgolfier | Public domain | Kaunis Houdon-medaljongin kaiverrus, mutta skannattu arkkina: leveät tyhjät paperimarginaalit ja BnF:n "B.R"-leima kuvan alla käyttäytyvät kuin vesileima (sama syy kuin edellisen erän Trutat-lasilevyllä). |
| `Bouquinistes, quais de Seine, Paris. PH28906(1).jpg` | bouquinistit | CC0 | Museovedos pahvipohjalla: beige paspartuu vie lähes puolet kuva-alasta ja kulmassa on käsin kirjoitettu numero Ph28906. Itse kirjalaatikot jäävät kaukaiseksi yksityiskohdaksi. |
| `Medaillon en bronze des freres Montgolfier par Houdon … P1010424.JPG` | montgolfier | CC BY-SA 3.0 | Kelvollinen museokuva, mutta Annonayn muistomerkki kertoo saman ja näyttää myös pallon. Ei ladattu peliin (ladattu, katsottu, poistettu). |
| `Roquefort-sur-Soulzon - 2009 - 01…12.jpg` | roquefort | CC BY-SA 4.0 | Kyläkuvia; noston aihe on kypsytys vuoren sisällä, joten luolakuva voitti. |
| Kaikki "No restrictions" -merkityt (mm. Woodrow Wilson -arkiston Versailles-kuvat) | peilisali | — | Lisenssimerkintä ei ole mikään erikseen sallituista; sivuutettiin heti hakutuloksissa. |

## Muutetut tiedostot

| Tiedosto | Muutos |
| -------- | ------ |
| `js/packs/maalehtinostot-fra.js` | Uusi `KUVAT`-taulu (18 kuvatietuetta) + alkuun erän kuvaus ja perustelu siitä, miksi kenttä on `galleria` eikä `kuvat`. `korttiLehdesta` liittää listan kortille. Jakosuunnitelma, ankkurit, minikysymykset ja lehden data ennallaan. |

Renderöijään (js/fokusnosto.js), lehteen (js/packs/maa-kategoriat.js) eikä
testeihin ei tarvinnut koskea: yksikään testi ei laske maalehtinostojen
kuvia, joten odotuksia ei ollut päivitettävänä.

## Tarkistukset

| Tarkistus | Tulos |
| --------- | ----- |
| `node --test tests/*.test.mjs` | # pass 3650, # fail 0, # skipped 13 (testien odotuksia ei tarvinnut muuttaa) |
| Pakan lataus | `MAALEHTINOSTOT_FRA` 18 nostoa, jokaisella 2 kuvaa |
| Lisenssit Commonsin API:sta | 18/18 tarkistettu, 0 epäkelpoa |
| Kuvat silmällä | Michelin, Montgolfier, Marseillen saippua ja bouquinistit katsottu täysikokoisina; kaksi hylättiin ja korvattiin (ks. yllä) |

## Mitä jäi tekemättä

1. **Kuvien vienti ämpäriin** kansioon `karttanostot/20260919/` (18
   tiedostoa yllä nimetystä kansiosta). Ennen vientiä osoitteet vastaavat
   404:llä. Tämä on Fablen työ, eikä sitä yritetty täällä.
2. Kaikkia 18:aa kuvaa ei ehditty katsoa täysikokoisina aikakaton sisällä
   — neljä riskialteinta (kirjaskannaukset ja arkkivedokset) katsottiin,
   ja loput ovat tavallisia Commons-valokuvia, joiden kuvaus ja koko
   luettiin API:sta. Jos Fablen pistokoe löytää huonon rajauksen, se on
   yhden rivin vaihto `KUVAT`-taulussa.
3. Peliä ei avattu selaimessa; kuvasarjan piirto todettiin lukemalla
   `nostonKuvat` ja `piirraNostonKuvat` js/fokusnosto.js:stä.
4. Raamattuun ei koskettu, versionumeroa ei nostettu, PR:ää ei tehty —
   ohjeen mukaisesti.
