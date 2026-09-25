# Ranska-pilotti: maalehden sivut nostoiksi, lisäkaupungit, Pariisin nostot lähizoomille

*(Opus-työsessio → Fable, 14.9.2026. Haara
`claude/bold-ride-vow4ki-ranska-sisalto`, pohja
`claude/bold-ride-vow4ki-nostot` (nosto-erä #2437). Ei versionostoa, ei
muutoslokiriviä, ei dist/:iä, ei mediatiedostoja repoon. Lähteet:
tehtävänanto; Raamattu KARTTAUUDISTUS + PAATOKSET 1, 6, 9, 10, 12, 13;
docs/raportit/viesti-fable-nostot-20260914.md;
viesti-fable-merkkirajat-20260914.md; viesti-fable-karttauudistus-era5- ja
era10-20260913.md; docs/moduulit/maalehti.md.)*

## 0. Lyhyesti

- **Maalehden 24 nostosta 18 on nyt kartalla omana klikattavana
  palanaan.** Kuusi jäi siirtämättä: viisi on kaksoiskappale (sama asia on
  jo kartalla) ja yksi on ilman paikkaa (luku 3).
- **Teksti ei siirtynyt vaan jaettiin.** Kortti LUKEE maalehden datan ajon
  aikana, joten kopiota ei ole olemassa: `js/packs/maalehtinostot-fra.js`
  on pelkkä jakosuunnitelma, ja otsikko, leipäteksti ja kuva tulevat
  `js/packs/maa-kategoriat.js`:n FRA-taulusta. Mitattu: 18/18 paria
  identtisiä (luku 6).
- **Maalehti on koskematon.** `node tools/vertaa-sisaltodiff.mjs` sanoo
  *"Muuttuneita kenttiä: 0"* — sivut, Lisää-valikko ja sivujen omat
  tehtävät ovat ennallaan.
- **Seitsemän kaupunkia lisää kartalle**: Lyon, Bordeaux, Lille,
  Strasbourg, Nizza, Toulouse, Nantes. Ne EIVÄT ole matkakohteita.
- **Pariisin ja Marseillen kohdekartan 17 nostoa näkyvät nyt myös
  pääkartalla** — lähizoomiportin takana, kohdekartta ennallaan, ilman
  yhtäkään kaksoiskappaletta datassa.
- **Ranskan merkkiluku pääkartalla 20 → 62**, mutta saapumisnäkymässä yhä
  **21** (portti v1867). Loput 41 tulevat zoomatessa.
- Portit: `npm test` **3355 / 0**, `savuke-ranska-sisalto` **28/28**,
  `savuke-merkkirajat` **28/28**, kaksoisavaimet, niputus ja savukelista
  kunnossa.
- **Kaksi asiaa vaatii sinun päätöksesi** (luku 10): lisäkaupunkien
  kortittomuus ja kaksi uutta nimiöleikkausta lähizoomissa.

## 1. Mitä tehtiin ja missä

| tiedosto | muutos |
| --- | --- |
| `js/packs/maalehtinostot-fra.js` | **uusi.** Jakosuunnitelma: 18 riviä, joista kukin osoittaa maalehden omaan nostoon (`sivu` + `nosto`) ja lisää kartan oman aineiston: tunnus, nimiö, symboli, ankkuri, `lahi`-lippu ja mahdollinen minikysymys. Kortti kootaan lehden datasta ajon aikana |
| `js/packs/nakyvat-kaupungit-fra.js` | **uusi.** Seitsemän kaupunkikohdetta, joilla `vainNimi: true` |
| `js/packs/fokusvirta-pariisi.js` | yksi tuonti + `...MAALEHTINOSTOT_FRA` `takynostot`-listan LOPPUUN (vanhojen rivien järjestys ei muutu) |
| `js/fokuskohteet.js` | `KOHDEKARTAN_NOSTOT_LAHIZOOMIIN` (FRA): kohdekartan nosto ei enää putoa pääkartalta vaan saa `lahi: true`. `karsiKaupunkiruuhka` ohittaa `lahi`-merkit. `lahinKohde` ohittaa `vainNimi`-kohteet. Näkyvien kaupunkien liitos `KOHDE_MAAT.FRA`:han |
| `js/fokusnosto.js` | `lahi`-kenttä kulkee täkynostolta merkkiriville (muuten portti ei näe sitä) |
| `js/pallolauta/nostot.js` | kaksi pientä lisäystä: `vainNimi` merkkiriville, ja `vainNimi`-rivit pois osumalistalta |
| `tools/tarkista-nostopaikat.mjs` | uusi syyluokka `lähizoomi`; `lahi`-lippu luetaan katon jälkeisestä rivistä |
| `tests/nostot-kartalla.test.mjs` | kaksi dokumentoitua pilottipoikkeusta (luku 8) |
| `tests/pallonimet.test.mjs` | `osumat`-rivin muotoväite päivitetty |
| `tools/savukkeet/savuke-ranska-sisalto.mjs` | **uusi** savuke, 28 vartiota vastakokeineen |
| `tools/savukkeet/savuke-merkkirajat.mjs` | lähtötasotauluun FRA 62 perusteluineen |
| `tools/savukkeet/README.md`, `tools/build-standalone.mjs`, `sw.js` | uudet moduulit listoille |

**Koskemattomat:** `js/maalehti.js`, `js/packs/maa-kategoriat.js`,
kaupunkilehdet, Raamattu, tarinatekstit, versionumero, muutosloki,
`js/pallolauta/nimet.js`, `merkit.js`, `maapaneeli.js`, `kamera.js`.

## 2. Jakotaulukko: maalehden sivu → karttanostot

| lehden nosto | otsikko | mrk | uusi tunnus | ankkuri | lauta (mk x/y) | visa | kuva |
| --- | --- | ---: | --- | --- | --- | --- | --- |
| historia[3] | Sali, joka rakennettiin valosta | 417 | `maalehti-peilisali` | Versailles | 5904 / 1441,8 | **on** | on |
| ruoka[0] | Juusto kypsyy vuoren sisällä | 558 | `maalehti-roquefort` | Roquefort-sur-Soulzon | 5933,1 / 1643,8 | **on** | on |
| ruoka[2] | Rengasfirma alkoi arvostella ravintoloita | 551 | `maalehti-michelin-opas` | Clermont-Ferrand | 5936,1 / 1569,4 | — | on |
| ruoka[3] | Helmikuun toisena paistetaan ohukaisia | 499 | `maalehti-chandeleur` | Bretagne (Rennes) | 5777,7 / 1472 | — | on |
| keksinnot[0] | Kuningas katsoi, kun kori nousi taivaalle | 538 | `maalehti-montgolfier` | Annonay | 5989 / 1591,8 | — | on |
| keksinnot[1] | Poika teki sotilaiden salakirjoituksesta aakkoset | 586 | `maalehti-braille` | Pariisi | 5911,7 / 1439,6 | — | on |
| keksinnot[2] | Kemisti, joka ei ollut lääkäri | 543 | `maalehti-pasteur-meister` | Pasteur-instituutti | 5910,4 / 1440,3 | — | on |
| keksinnot[3] | Ensimmäinen elokuvayleisö mahtui yhteen huoneeseen | 527 | `maalehti-cinematographe` | Lyon | 5994,5 / 1570 | **on** | on |
| luonto[0] | Hiekkavuori vaeltaa metsän päälle | 464 | `maalehti-dune-du-pilat` | Dune du Pilat | 5792,9 / 1618,6 | **on** | on |
| luonto[1] | Hevonen vaihtaa väriä kasvaessaan | 474 | `maalehti-camarguen-hevoset` | Camargue | 5983,3 / 1661,8 | — | on |
| luonto[2] | Rivi tulivuoria luultiin kaivosjätteeksi | 509 | `maalehti-chaine-des-puys` | Puy de Dôme | 5932,1 / 1569,8 | — | on |
| luonto[3] | Meri palaa saaren ympärille | 517 | `maalehti-couesnonin-vuorovesi` | Mont-Saint-Michelin lahti | 5783 / 1449,1 | — | on |
| urheilu[0] | Voittaja tuli maaliin kolme tuntia muita edellä | 498 | `maalehti-tour-de-france-1903` | Pariisi | 5911,7 / 1439,6 | — | on |
| urheilu[1] | Peli keksittiin ystävälle, joka ei voinut juosta | 545 | `maalehti-petanque` | La Ciotat | 6020,3 / 1676,2 | **on** | on |
| urheilu[2] | Tenniskisa on nimetty lentäjän mukaan | 503 | `maalehti-roland-garros` | Stade Roland Garros | 5908,2 / 1440 | — | on |
| urheilu[3] | Kisassa lasketaan matkaa, ei aikaa | 525 | `maalehti-le-mans` | Le Mans | 5839,9 / 1475,9 | — | on |
| arki[1] | Saippuassa lukee 72 | 462 | `maalehti-marseillen-saippua` | Marseille | 6012,3 / 1671,4 | — | on |
| tavat[1] | Seinen vihreät kirjalaatikot | 512 | `maalehti-bouquinistit` | Seinen rantakaiteet | 5911,6 / 1439,8 | **on** | on |

Sivuittain: historia 1/4, ruoka 3/4, keksinnöt 4/4, luonto 4/4, urheilu
4/4, arki 1/2, tavat 1/2, menovinkit 0 (sivu on linkkilista, ei nostoja).

**Minikysymyksiä 6/18** eli keskimäärin joka kolmas; kiintiö
`floor(18/3) = 6` täyttyy tasan. Palkkio on kerroksen oma **25 puntaa**
(js/fokusnosto.js `NOSTON_VISA_PALKKIO`), ja jokainen kysymys on eri
sivulta. Yksikään ei toista sivun omaa tehtävää.

**Ankkurien lähteet.** Kaikki asteet on haettu en-Wikipedian
`prop=coordinates`-rajapinnasta 14.9.2026 paitsi Bretagne (Rennes) ja
Pariisi, jotka luettiin pelin omasta tarkistetusta aineistosta
(`js/packs/fokus-grc.js` FOKUS_LISANIMET.FRA ja `js/packs/maakartat.js`
FRA). Laudan koordinaatit laskettiin pelin omalla kaavalla
(`tools/johda-maastokohteet.mjs laudat`), eikä yhtäkään lukua luettu
kartalta silmällä. Jokainen lähde on rivin viereen kirjattu tiedostoon.

**Kaksi ankkuria on tekstin ulkopuolelta**, ja se on merkitty datassa
näkyviin: Michelinin opas → Clermont-Ferrand (en-Wikipedia "Michelin",
pääkonttori; teksti nimeää veljekset muttei kaupunkia) ja Pasteurin
rokote → Pasteur-instituutti (teksti mainitsee instituutin muttei
kaupunkia). Kummassakaan tapauksessa kortin TEKSTIIN ei lisätty mitään.

## 3. Mitä jäi siirtämättä ja miksi

| lehden nosto | syy | missä sama asia jo on |
| --- | --- | --- |
| historia[0] "Neljä poikaa ja koira löysivät luolan" | kaksoiskappale | kohde `lascaux`: sama löytöpäivä, sama koira, 600 maalausta, 17 000 v, sulkeminen 1963 — laajempana |
| historia[1] "Seitsemänkymmentä metriä sarjakuvaa pellavalle" | kaksoiskappale | kohde `bayeux-seinavaate`: sama mitta, sama kirjontatapa, sama 1066, lisäksi kohtaus- ja hahmomäärät |
| historia[2] "Linnoituksessa oli vain seitsemän vankia" | kaksoiskappale | kohde `bastilji`: sama seitsemän vankia, sama päivä, sama purku |
| arki[0] "Laivat roikkuvat katossa" | kaksoiskappale | täkynosto `exvotot` (Marseille) on KIRJOITETTU tästä lehden nostosta — sen oma lähderivi sanoo sen ääneen |
| tavat[0] "Patongista kilpaillaan joka vuosi" | kaksoiskappale | täkynosto `nosto-pariisin-patonki` (sama kilpailu, samat säännöt, sama raati) |
| ruoka[1] "Kakussa on jotain kovaa" (galette des rois) | **ei paikkaa** | tekstissä ei ole yhtään paikkaa. Ankkurin keksiminen olisi ollut uusi faktaväite |

Kaikki kuusi ovat yhä lehdessä sellaisinaan.

**Pudotettua ainesta ei ole.** Yhdestäkään siirretystä nostosta ei
pudotettu sanaakaan: `lunastus` on lehden `teksti` kokonaisena, ja kuvan
neljä kenttää (tiedosto, lyhyt, selite, lähde) ovat lehden omat. Tämä ei
ole lupaus vaan rakenne — kirjoittavaa mallia ei ole missään kohdassa
lehden ja kortin välissä, koska kortti lukee lehteä ajon aikana.

## 4. Lisäkaupungit

| kaupunki | asteet | lauta (maailmankartta) | lähde |
| --- | --- | --- | --- |
| Lyon | 4,8281 E / 45,772 N | 5994,3 / 1569,8 | FOKUS_LISANIMET.FRA (pelin oma aineisto) |
| Bordeaux | −0,597 E / 44,852 N | 5813,4 / 1607,9 | FOKUS_LISANIMET.FRA |
| Lille | 3,0781 E / 50,6519 N | 5935,9 / 1361,7 | FOKUS_LISANIMET.FRA |
| Strasbourg | 7,75 E / 48,58 N | 6091,7 / 1451,5 | FOKUS_LISANIMET.FRA |
| Nizza | 7,2631 E / 43,717 N | 6075,4 / 1654,3 | FOKUS_LISANIMET.FRA |
| Toulouse | 1,448 E / 43,6219 N | 5881,6 / 1658,2 | FOKUS_LISANIMET.FRA |
| Nantes | −1,5528 E / 47,2181 N | 5781,6 / 1509,3 | en-Wikipedia "Nantes", prop=coordinates (14.9.2026) |

Kuudella seitsemästä koordinaatti oli jo repossa: `FOKUS_LISANIMET.FRA`
on jäänne siltä ajalta, jolloin nimet poltettiin fokuslehteen, ja se on
kantanut nämä luvut asteineen koko ajan. Nantes puuttui listalta, ja sen
laudan luvut on laskettu pelin omalla kaavalla.

**Ne eivät ole matkakohteita.** Rivit ovat maan kohdemerkkejä
(`KOHDE_MAAT`), eivät laudan kaupunkeja
(`js/packs/maailmankartta.js` CITIES). Reitit, noppa, bussi ja
Liiku-valikko eivät näe niitä lainkaan; savukkeen vartio 2 mittaa sen.

**Niillä ei ole korttia — ja se on tietoinen valinta.** Muiden maiden 135
ei-pelattavalla kaupungilla on tietoruutu ja sen teksti. Tässä erässä
tekstiä ei saanut kirjoittaa, eikä Ranskan aineistossa ole valmista
tarkistettua kuvausta näistä seitsemästä. Vaihtoehdot olivat keksitty
teksti tai tyhjä kortti; kumpikaan ei kelpaa. Rivi on siksi merkitty
`vainNimi: true`: kartalla on merkki ja nimi, mutta merkki ei ota
napautusta — se on karttatypografiaa, samaa lajia kuin maan tai meren
nimi. Ks. luku 10, kohta 1.

## 5. Pariisin nostot pääkartalle lähizoomilla

Nostoraportin (14.9.2026, luku 2) kahdesta vaihtoehdosta toteutettiin
**(b)**: osa Pariisin nostoista palaa pääkartalle. Ehto oli, ettei
datassa synny kaksoiskappaletta — eikä syntynyt.

**Toteutus on yksi ajonaikainen päätös, ei datarivi.**
`js/fokuskohteet.js karsiKaupunkikartanNostot` pudotti tähän asti
kohdekartan pisteeseen linkitetyn noston pääkartalta. Ranskassa
(`KOHDEKARTAN_NOSTOT_LAHIZOOMIIN`) se ei enää pudota riviä vaan antaa
sille `lahi: true` — merkki EI piirry saapumisnäkymässä lainkaan, vaan
tulee näkyviin zoomatessa. Sama tunnus, sama teksti, sama kortti; vain
näkyvyys on kaksiportainen. Kohdekartta ei muutu millään tavalla.

Kaupunkinostojen katto (3 merkkiä / 8 yksikköä) ohittaa `lahi`-merkit,
koska katto suojaa juuri sitä näkymää, jossa nämä eivät ole.

Mukana tulevat 17: Pariisista `tuileries`, `bastilji`, kolme
syvennystarinaa, kaksi skandaalia ja yhdeksän täkynostoa; Marseillesta
`syvennys-marseille-exvotot`.

## 6. Sisältöpistokoe (VANHA/UUSI)

**Koneellinen tulos ensin.**

```
node tools/vertaa-sisaltodiff.mjs origin/claude/bold-ride-vow4ki-nostot HEAD \
  js/packs/maa-kategoriat.js MAA_KATEGORIAT 5
→ Muuttuneita kenttiä: 0
```

Maalehden dataa ei siis koskettu lainkaan. Kartan puolella vertailu
tehdään pari kerrallaan (savukkeen vartio 0): **18/18 paria identtisiä**
`===`-vertailussa otsikon, leipätekstin ja kuvatiedoston osalta.
Vastakoe (vartio 0b): sama vertailu naapurinoston tekstiin eroaa
jokaisessa 18 tapauksessa, joten vertailu ei ole tyhjä.

**Otos luettavaksi.** Alla viisi tasavälein valittua paria ja suurin
(pisin) muutos. Otos on deterministinen: sama komento antaa saman otoksen.

### 1/6 `maalehti-peilisali` (historia, 417 mrk) — SAMA

> **VANHA (maalehti):** *Sali, joka rakennettiin valosta*
> Versaillesin peilisali on 73 metriä pitkä käytävä, jonka toisella
> seinällä on ikkunat puutarhaan ja toisella yhtä monta peiliä niitä
> vastapäätä. Peilejä on 357. Se oli 1600-luvulla tavaton ylellisyys:
> peili oli kallis ja Venetsia varjeli valmistustaitoaan tarkasti. Kun
> kynttilät sytytettiin illalla, valo heijastui edestakaisin ja sali
> näytti kaksi kertaa suuremmalta. Nykyään sinne pääsee tavallisella
> pääsylipulla.
>
> **UUSI (karttanosto):** *Sali, joka rakennettiin valosta* — sama teksti
> merkki merkiltä.

### 2/6 `maalehti-montgolfier` (keksinnöt, 538 mrk) — SAMA

> **VANHA:** *Kuningas katsoi, kun kori nousi taivaalle*
> Veljekset Joseph ja Étienne Montgolfier tekivät paperia Annonayn
> kaupungissa. Joseph huomasi, että tulen yllä kuivuva pyykki pullistui
> ylöspäin, ja veljekset alkoivat rakentaa kangaspalloja, jotka nousivat
> kuuman ilman varassa. Ennen kuin kukaan uskalsi nousta itse, oli
> kokeiltava eläimillä. 19. syyskuuta 1783 pallo nousi Versailles'n
> linnan pihalta kuninkaan ja väkijoukon edessä, ja korissa matkusti
> kolme eläintä: lammas, ankka ja kukko. Lento kesti kahdeksan minuuttia
> ja vei matkustajat kolmen kilometrin päähän. Kaikki selvisivät.
>
> **UUSI:** sama teksti merkki merkiltä.

### 3/6 `maalehti-cinematographe` (keksinnöt, 527 mrk) — SAMA

> **VANHA:** *Ensimmäinen elokuvayleisö mahtui yhteen huoneeseen*
> Veljekset Auguste ja Louis Lumière tekivät valokuvaustarvikkeita
> Lyonissa. Helmikuussa 1895 he patentoivat cinématographen, laatikon,
> joka toimi yhtä aikaa kameran, kopiokoneen ja projektorin virkaa.
> Ensimmäinen maksullinen näytös pidettiin 28. joulukuuta 1895, ja
> yleisöä oli noin neljäkymmentä. Elokuvia esitettiin kymmenen, ja
> jokainen kesti alle minuutin: työläiset kävelevät ulos tehtaan
> portista, vauva syö lusikasta, meri lyö rantaan. Joukossa oli
> ensimmäinen elokuvakomedia, jossa poika astuu puutarhurin letkun
> päälle.
>
> **UUSI:** sama teksti merkki merkiltä.

### 4/6 `maalehti-couesnonin-vuorovesi` (luonto, 517 mrk) — SAMA

> **VANHA:** *Meri palaa saaren ympärille*
> Normandian rannikolla Mont-Saint-Michelin lahdessa vuoroveden
> korkeusero on noin neljätoista metriä, yksi Euroopan suurimmista.
> Kalliosaari oli ennen kiinni mantereessa vain laskuveden aikaan. Vuonna
> 1879 sinne rakennettiin pengertie, mutta se pysäytti veden virtauksen
> ja lahti alkoi liettyä umpeen. Penger purettiin, tilalle tuli
> pilareilla seisova silta, ja Couesnon-jokeen padottiin vettä, joka
> päästetään huuhtomaan lietettä pois. 21. maaliskuuta 2015
> poikkeuksellisen korkea vuoksi peitti uuden sillan kokonaan.
>
> **UUSI:** sama teksti merkki merkiltä.

### 5/6 `maalehti-roland-garros` (urheilu, 503 mrk) — SAMA

> **VANHA:** *Tenniskisa on nimetty lentäjän mukaan*
> Roland Garros ei ollut tennispelaaja vaan lentäjä: hän lensi
> ensimmäisenä yksin Välimeren yli ja kuoli ensimmäisessä
> maailmansodassa. Kun Pariisiin rakennettiin 1928 stadion Davis Cupia
> varten, se nimettiin hänen mukaansa, ja samaa nimeä kantaa yhä Ranskan
> avoin tennisturnaus. Kentän kuuluisa punainen pinta ei ole savea vaan
> kalkkikiveä, jonka päälle on jyrätty muutaman millimetrin kerros
> jauhettua tiiltä ja kasteltu se vedellä. Otteluiden välissä pintaa
> tasoitetaan raahaamalla sen yli ketjumattoa.
>
> **UUSI:** sama teksti merkki merkiltä.

### 6/6 SUURIN: `maalehti-braille` (keksinnöt, 586 mrk) — SAMA

> **VANHA:** *Poika teki sotilaiden salakirjoituksesta aakkoset*
> Louis Braille loukkasi kolmevuotiaana silmänsä isänsä
> satulasepänverstaassa, kun naskali luiskahti nahasta, ja tulehdus vei
> näön myös toisesta silmästä. Pariisin sokeainkouluun tuotiin Charles
> Barbier'n järjestelmä, jossa sanat kirjoitettiin kohopistein:
> kaksitoista pistettä muodosti yhden äänteen, ja niitä oli
> kolmekymmentäkuusi. Braille huomasi vian heti — kahdentoista pisteen
> ryhmä ei mahtunut sormenpään alle kerralla, joten lukeminen oli
> hidasta. Viisitoistavuotiaana hän esitti oman ratkaisunsa: yhteen
> merkkiin riittää kuusi pistettä, ja merkki vastaa kirjainta eikä
> äännettä.
>
> **UUSI:** sama teksti merkki merkiltä.

**Tarkista siis kolme asiaa:** (1) uudessa ei ole faktaa, jota vanhassa ei
ollut — ei voi olla, koska teksti on sama olio; (2) pudotettua ainesta ei
ole; (3) minikysymykset (luku 2) ovat ainoa uusi teksti tässä erässä, ja
ne ovat kysymyksiä eivät faktaväitteitä: jokaisen oikea vastaus on
sanatarkasti noston omassa tekstissä ja jokainen `fakta`-rivi on saman
tekstin oma tieto.

## 7. Merkkimäärät — mitattu, ei arvattu

### Node (pelin oma passi ja pelin oma portti)

| mitta | ennen | jälkeen |
| --- | ---: | ---: |
| FRA:n merkit pääkartalla yhteensä | 20 | **62** |
| → saapumisnäkymässä (portti) | 20 | **21** |
| → lähizoomiin | 0 | **41** |
| polttovelka (poltettu muste, jota portti ei voi piilottaa) | 0 | **0** |
| FRA:n nostorivejä datassa yhteensä | 37 | **62** |

62 = 20 vanhaa + 18 maalehden nostoa + 17 kohdekartalta palannutta + 7
näkyvää kaupunkia. **Polttovelka on nolla**, joten portin päätös näkyy
Ranskassa oikeasti ruudulla — ei ole poltettua mustetta, jota se ei voisi
piilottaa.

### Selain (Chromium, saapumisnäkymä `saavu({ kesto: 0 })`)

| mitta | 390 × 844 | 1400 × 900 |
| --- | ---: | ---: |
| näkyvä leveys saapumisessa (lautayksikköä) | 570,8 | 754,4 |
| portti päästää saapumisessa | **21** | **21** |
| lähizoomiin jää | 40 | 40 |
| näkyvä leveys lähizoomissa (2 porrasta) | 142,7 | 188,6 |
| portti päästää lähizoomissa | **62** | **62** |
| napautettavia ruudulla lähizoomissa | 40 | 12 |
| uusia maalehtinostoja ruudulla lähizoomissa | 14 / 18 | 5 / 18 |

Työpöytäruudulla ruudulla on lähizoomissa vähemmän merkkejä kuin
puhelimella, koska sama zoomiporras kattaa leveämmän alueen mutta
korkeussuunnassa vähemmän: osa merkeistä on ruudun ulkopuolella. Portti
päästää molemmilla kaikki 62.

### Saapumisnäkymän 21: mitkä

Kaupungit ensin (merkinTarkeys), sitten muut datan järjestyksessä:
**7 näkyvää kaupunkia** + montblanc, vignemale, valimeri, biskajanlahti,
loire, rhone, mont-saint-michel, carcassonne, lascaux, chartres,
pont-du-gard, carnac, avignon, chambord.

**Kuusi vanhaa merkkiä siirtyi saapumisnäkymästä lähizoomiin**, koska
kaupungit ottavat seitsemän paikkaa katosta: `douaumont`,
`bayeux-seinavaate`, `millaun-silta`, `syvennys-marseille-cosquer`,
`syvennys-marseille-roquefavour` ja `skandaali-kaulanauhajuttu-1785`.
Mitään ei poistettu — kaikki kuusi tulevat näkyviin yhdellä
zoomiportaalla. Jos tämä ei ole se, mitä haluat, järjestys on yhden
kentän päässä (`ihme`-luokka tai oma tärkeysrivi datassa).

### Nimiöiden päällekkäisyys

| näkymä | leikkauksia yhteensä | joissa tämän erän merkki |
| --- | ---: | ---: |
| saapuminen 390 × 844 | 12 | **0** |
| saapuminen 1400 × 900 | 1 | **0** |
| lähizoomi 390 × 844 | 11 | **2** |

Saapumisnäkymän 12 leikkausta puhelimella ovat **vanhojen merkkien
keskinäisiä** (loire × bastilji, tuileries × chartres, valimeri ×
vignemale, montblanc × eläintäky-CHE …) eivätkä tämän erän tekemiä. Kaksi
uutta leikkausta on lähizoomissa; ks. luku 10, kohta 2.

## 8. Testit, savukkeet ja vastakokeet

| portti | tulos |
| --- | --- |
| `npm test` | **# pass 3355, # fail 0** |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 389 moduulia, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | kunnossa |
| `savuke-ranska-sisalto` (uusi) | **28/28** |
| `savuke-merkkirajat` | **28/28** (lähtötasotauluun lisätty FRA 62) |

**Vastakokeet** (pakollisia, kaikki ajettu):

| vastakoe | tulos |
| --- | --- |
| **0b.** kortin teksti vs. NAAPURInoston teksti | eroaa 18/18 — vertailu ei ole tyhjä |
| **3b.** sama merkkijoukko portti auki | 62 — saapumisnäkymän 21 on portin eikä datan ansiota |
| **8b.** `vainNimi`-lippu pois ajon ajaksi | Lyon ilmestyy osumalistalle — vartio 8a mittaa juuri lippua |
| `savuke-merkkirajat` 0b | seitsemän vanhaa ylitystä + FRA 62 yhä datassa |
| `savuke-merkkirajat` 3b | `lahi`-lipun poisto palauttaa kohteen saapumisnäkymään |

**Kaksi testiä sai dokumentoidun pilottipoikkeuksen**, ja kumpikin on
kirjattu koodiin omistajan sanoineen:

1. `tests/nostot-kartalla.test.mjs` *"kohdekartalla asuva nosto EI ole
   pääkartalla"* — ehto ohittaa nyt `lahi`-merkit. Perustelu: `lahi`-merkki
   ei piirry saapumisnäkymässä lainkaan, eli se ei ole "pääkartalla" siinä
   merkityksessä, jota sääntö 2.9.2026 tarkoitti. Muissa maissa sääntö on
   ennallaan.
2. Sama tiedosto, *"kaupungin kohdalla olevien nostojen työlista ei
   kasva"* — uusi syyluokka `lähizoomi` on sallittu ja rajattu luvuista
   pois. Työlista (52 / 48) ei kasvanut yhdelläkään muulla syyllä.

**Kuva:** `docs/raportit/kuvat/ranska-sisalto-lahi-390x844.jpg` (35 kt) —
Ranskan lähizoomi puhelinruudulla, maalehden nostot kartalla.

## 9. Mitä EI tehty

Ei versionostoa (`tools/uusi-versio.mjs` ajamatta), ei muutoslokiriviä, ei
mergeä, ei `dist/`:iä, ei mediatiedostoja repoon (kuvat ovat lehden omia
URL-viittauksia samaan mediaan), ei muiden maiden sisältöä, ei
kaupunkilehtien muutoksia, ei Raamattua, ei tarinatekstejä. Toisten
agenttien tiedostoihin (`js/pallolauta/nimet.js`, `merkit.js`,
`maapaneeli.js`, `kamera.js`, laattapoltto) ei koskettu;
`js/pallolauta/nostot.js`:ään tehtiin kaksi pientä lisäystä, jotka data
vaati.

## 9b. Regressio ja korjaus (mainin merge, v1882)

Haara pohjautui nosto-erään **ennen v1878:aa**, joka toi merkkiportin myös
POLTTOKETJUUN (`tools/fokuskartta/nostot.mjs` +
`tests/nostopoltto-merkkiportti.test.mjs`). Kun haara mergettiin mainiin,
testi *"poltettavat ovat täsmälleen ne, jotka elävä portti päästäisi"*
kaatui: **73 !== 32**.

### Mitattu: kumpi puoli oli väärässä

**Kumpikaan.** Molemmat päät ajavat SAMAA funktiota (`merkkiPortti`,
`lahella = false`), ja ne antavat saman vastauksen:

| mittaus | lähde | tulos |
| --- | --- | ---: |
| `tilasto.porttiPiiloon` | polttoketjun oma kirjanpito (tools/fokuskartta/nostot.mjs) | **73** |
| testin oma `karsittuja` | elävä pää: `maanKohdemerkit` + `merkkiPortti` | **73** |

Maittain: GRC 12, TUR 8, DEU 7, **FRA 41**, HRV 2, ITA 1, RUS 1, ESP 1.
Ilman tätä erää luvut ovat GRC 12, TUR 8, DEU 7, HRV 2, ITA 1, RUS 1,
ESP 1 = **32**; ero on täsmälleen **FRA 41**, eli 62 − 21 — tämän erän oma
sisältö lähizoomiportin takana. **Luku 32 ei siis ollut väite vaan
päivämäärä.**

Kolme epäilyä tarkistettiin erikseen, ja kaikki kolme ovat kunnossa:

| epäily | mitattu |
| --- | --- |
| tunteeko polton portti `lahi: true`? | kyllä: FRA:n 62 merkistä poltettavia on **19**, eikä yksikään 35 `lahi`-merkistä ole niiden joukossa |
| poltetaanko `vainNimi`-kaupungit? | kyllä, ja se on oikein: ne ovat pysyvää karttamustetta. Napautettavuus ei silti palaa — `js/pallolauta/nostot.js` jättää `vainNimi`-rivit osumalistalta pois myös poltettuna |
| syntyykö viittausnostoista kaksoiskappaleita? | ei: maan sisäisiä kaksoistunnuksia **0** |

### Mitä korjattiin

1. **Kiinteä 32 → kahden riippumattoman mittauksen yhtäpitävyys.**
   `assert.equal(tilasto.porttiPiiloon, karsittuja)` on se invariantti,
   jota testi oikeasti tarkoitti: jos polttoketju ja elävä kerros
   ajautuvat eri sääntöön, luvut eroavat. Se ei vanhene sisällön
   kasvaessa. Maakohtainen jakauma kulkee virheviestissä, jotta luvun
   muutos kertoo heti mistä se tuli. (Sama ratkaisu kuin
   kaupunkikortit-haarassa; alaraja ≥ 30 säilyi.)
2. **Vartion 3 datasilmukka oli tyhjä väite, ja se korjattiin.** Se luki
   lippua polttoketjun merkiltä (`m.kohde?.lahi`), mutta sen
   merkkioliossa EI OLE `kohde`-kenttää lainkaan (kentät: tunnus, x, y,
   ankkuriX, ankkuriY, symboli, laji, nimio, …, poltettava, tiiviste,
   perhe, iso, s). Ehto oli aina epätosi. Lippu luetaan nyt elävältä
   puolelta, ja aineistossa on **35** `lahi`-merkkiä, joten väite mittaa
   oikeasti; alaraja ≥ 35 estää silmukan palaamisen tyhjäksi.
3. **Savukkeen mittaus rauhoitettiin.** `saavu({ kesto: 0 })` palaa ennen
   kuin kamera on paikallaan, ja kiinteä uni luki satunnaisesti LENNOSSA
   olevan näkymän: mitattu samassa ikkunassa peräkkäin **388,6** (oikea)
   ja **60,0** (kesken lennon) lautayksikköä — jälkimmäisellä
   lähizoomiportti on auki jo "saapumisessa", ja vartiot 4 ja 6 kaatuivat
   väärästä syystä. Näkymä luetaan nyt kunnes kaksi peräkkäistä lukemaa
   ovat samat. **Tuotekoodia ei muutettu.**

### Vastakoe (pakollinen)

Polttoketjun portti avattiin ajon ajaksi (`lahella = true`):

```
not ok 1 - yksikään maa ei polta yli pääkartan merkkikaton
not ok 2 - poltettavat ovat täsmälleen ne, jotka elävä portti päästäisi
not ok 3 - lähizoomin kohde (lahi: true) ei pala koskaan
          error: 'FRA/tuileries on lahi-kohde mutta palaa'
ok 4 - portti ei siirrä ladontaa
```

Kolme neljästä vartiosta kaatuu, ja vartio 3 osoittaa nimeltä yhden
`lahi`-kohteen — eli korjattu silmukka mittaa juuri sitä, mitä pitääkin.
Tilastotiedostoa ei tarvinnut generoida uudelleen: `tilasto` lasketaan
ajossa eikä ole tiedosto.

### Portit mergen jälkeen

| portti | tulos |
| --- | --- |
| `node --test` (235 tiedostoa kahdessa erässä, koska koko sarja ei enää mahdu 600 s:iin) | **# pass 1467 + 1886 = 3353, # fail 0** |
| — kuormavartio | `tests/pollo.test.mjs` *"indeksi rakentuu"* punastui yhdellä välikierroksella (3 754 ms rajan 3 000 yli) ja on vihreä sekä yksin ajettuna (124/0) että lopullisessa ajossa. Sama aikamittari on kirjattu nosto-erässä #2437 |
| `tarkista-kaksoisavaimet`, `tarkista-niputus`, `tarkista-savukkeet` | kunnossa |
| `savuke-merkkirajat` | **28/28** |
| `savuke-ranska-sisalto` | **28/28** |
| `tests/nostopoltto-merkkiportti.test.mjs` | **4/4** |

## 10. Avoimet — sinun päätettäväksesi

1. **Lisäkaupungeilla ei ole korttia.** Ne ovat kartalla nimenä ja
   merkkinä mutta eivät ota napautusta. Tämä on poikkeus
   klikattavuuslinjaan, ja se tehtiin tietoisesti: kortin teksti olisi
   ollut uutta sisältöä, jota tässä erässä ei saanut kirjoittaa. Jos
   haluat ne napautettaviksi, ne tarvitsevat kortin tekstin — se on
   sisältöerä ja kirjoittajan työ. Lippu on silloin yksi rivi pois
   (`vainNimi`).
2. **Kaksi uutta nimiöleikkausta lähizoomissa.**
   `nosto-maalehti-chaine-des-puys` × `nosto-maalehti-michelin-opas`:
   Puy de Dôme ja Clermont-Ferrand ovat 4 lautayksikköä (noin 10 km)
   toisistaan, ja sovittelu ei erota niitä syvässä zoomissa. Kumpikin
   ankkuri on oikea. Vaihtoehdot: hyväksytään, tai toinen ankkuri
   siirretään (Michelinin pääkonttori on Clermont-Ferrandin
   Cataroux'ssa, mikä ei auta paljon), tai toiselle annetaan `lahi`-portin
   sijaan kokonaan oma zoomitaso. Sano kumman haluat.
3. **Ankkurit, jotka eivät ole tekstissä** (Michelin → Clermont-Ferrand,
   Pasteur → Pasteur-instituutti). Kummankin lähde on kirjattu datan
   viereen, eikä kortin tekstiin lisätty mitään — mutta jos linjasi on,
   ettei ankkuria saa ottaa tekstin ulkopuolelta, nämä kaksi siirretään
   tai pudotetaan.
4. **Galette des rois jäi kartan ulkopuolelle** paikattomuuden takia. Jos
   haluat sen kartalle, se tarvitsee yhden virkkeen verran paikkaa —
   sinun kirjoittamanasi.
5. **Pilotti on yhdessä maassa.** `KOHDEKARTAN_NOSTOT_LAHIZOOMIIN` on
   `new Set(['FRA'])` ja maalehtijako on Ranskan oma. Kun sanot, että
   tämä toimii, sama tehdään muille maille — kohdekartan puoli on yhden
   rivin levitys, maalehtijako on maakohtaista työtä.
6. **Saapumisnäkymän 12 nimiöleikkausta puhelimella** ovat vanhoja eivätkä
   tämän erän tekemiä, mutta ne ovat olemassa. Jos ne häiritsevät, ne
   ovat oma eränsä (sovittelu tai 21:n järjestys).
