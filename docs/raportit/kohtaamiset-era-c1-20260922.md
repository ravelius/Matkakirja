# Kohtaamiset erä C1: 6 kaupunkia eniten nostoja ilman kohtaamista (2026-09-22)

Sisältökirjuri (Sonnet), Fablen tilaus: sisältöinventaarion kohta 3 (41
kaupunkia ilman nimettyä kohtaamishahmoa). Aloitettu kuudesta kaupungista,
joissa on eniten nostoja kohdekartalla (js/packs/maakartat.js
KAUPUNKIKARTAT[city].kohteet) ilman kohtaamista:

| Kaupunki | Nostoja kohdekartalla |
| --- | ---: |
| Pariisi | 31 |
| Rooma | 16 |
| Wien | 16 |
| Helsinki | 15 |
| Istanbul | 14 |
| Amsterdam | 13 (tasapelissä Ateenan kanssa, valittu tähän erään) |

Rakenne per kaupunki noudattaa js/packs/kohtaamiset.js:n olemassa olevaa
kaavaa (hahmo, nappi, frame, tervehdys+luenta, loyto+luenta, tyhja,
vaarin, neljä tunnetagia). Ei vielä kirjoitettu js/packs/kohtaamiset.js:ään
— tarkastukseesi ensin, kuten pyysit.

## Läpikäyvät huomiot ennen kaupunkikohtaisia tekstejä

1. **Nuori Fogg ei puhu -sääntö (docs/tarina.md, 21.9.2026):** kaikki 6
   uutta luentoa noudattavat tätä — ei pelaaja-roolin repliikkejä
   loytoLuenta-kentissä, vain kertoja+hahmo. Olemassa oleva lontoo-
   esimerkki js/packs/kohtaamiset.js:ssä sisältää vielä vanhan
   pelaaja-repliikin ("Ja minä olen jo myöhässä!") — tämä on ristiriidassa
   uuden linjauksen kanssa. Ehdotan, että se korjataan samalla kun nämä
   kuusi lisätään, tai omana pikakorjauksenaan.
2. **Kolme hahmoa on jo olemassa mutta ei vielä pelissä:**
   - Pariisi: bukinisti Colette, kuvakonsepti jo tarkistettu
     (js/kohtaamiskuvat-data.js, id pariisi-kirjamyyjat-pulu).
   - Wien: suntio Anton, kuva jo hyväksytty (wien-anton-katakombit-v2.jpg)
     — MUTTA docs/kuvatuotanto-kohtaamiset.md:n taulukossa on ERI Anton-
     konsepti (pörssirakennuksen juoksija). Ristiriita, päätöstä tarvitaan
     kumpi jää voimaan.
   - Amsterdam: Yara, jo sekä hyväksytyt6-paketissa että tarinakaaren
     (KAARI_PAKETIT) hahmona — käytetty suoraan, ei uutta hahmoa.
   Rooma, Helsinki ja Istanbul saivat kokonaan uudet hahmot (Fabrizio,
   Saana, Kemal) — Rooma tietoisesti ERI kuin tarinakaaren oma Enzo-hahmo
   (suihkulähdetyö), jotta ei synny päällekkäisyyttä.
3. **docs/kuvatuotanto-kohtaamiset.md on paikoin vanhentunut** (Amsterdamin
   rivillä yhä vanha Willem-hahmo Yaran sijaan) — kannattaa päivittää
   erikseen.


---

# Kohtaaminen: Pariisi — luonnos Fablen hyväksyttäväksi

Sisältökirjuri-sessio, 2026-09-22. Uusi `pariisi`-rivi
`js/packs/kohtaamiset.js`-tiedostoon EI ole vielä lisätty tiedostoon —
tämä on vain raportti, Fable päättää ja tekee lisäyksen.

Hahmo valittu tietoisesti samaksi kuin jo hyväksytyssä
kohtaamiskuvan tyylikokeessa (`js/kohtaamiskuvat-data.js`, id
`pariisi-kirjamyyjat-pulu`, hahmo "Colette", tila "tarkistettu"):
Seinen rannan bukinisti. Näin teksti ja jo olemassa oleva kuvakonsepti
tukevat toisiaan eikä synny kahta kilpailevaa Pariisi-hahmoa.

## Pariisi — bukinisti Colette

**hahmo:** "bukinisti Colette"
**nappi:** "Tapaa Colette"
**frame:** "Colette lukitsee kirjalaatikkonsa ja kysyy"
**tervehdys:** "Colette lukitsee laatikkonsa kaiteeseen: "Isoisäsi
aikaan nämä raahattiin pois joka ilta. Näytä että tunnet maailmaa
kuten piirtäjä — niin kerron mikä odottaa.""
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Colette lukitsee laatikkonsa kaiteeseen:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan nämä raahattiin '
    + 'pois joka ilta. [warmly] Näytä että tunnet maailmaa kuten '
    + 'piirtäjä — niin kerron mikä odottaa."' },
]
```
**loyto:** "Colette nostaa rasian pinon alta: "Tämä lojui väärän kirjan
takana vuosia. Kukaan ei koskaan ostanut sitä kirjaa.""
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Colette nostaa rasian pinon alta:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämä lojui väärän kirjan takana '
    + 'vuosia. [warmly] Kukaan ei koskaan ostanut sitä kirjaa."' },
]
```
**tyhja:** "Colette käy laatikon läpi kahdesti: "Tyhjä. Seine tulvii
täällä keväisin — se vie muistot mukanaan.""
**vaarin:** "Colette latoo kirjat takaisin pinoon: "Ei tänään. Katso
tarkemmin, niin kannen alle näkee.""
**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }   // Colette arvioi tulijaa ja kirjaa, ei vielä lämmin — sama rekisteri kuin muualla tiedostossa (esim. dubrovnik, odessa) tervehdyksen avauksessa
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }             // löytö on pelin suuri hetki, rekisterin oletus kaikissa kaupungeissa
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }        // "Seine vie muistot mukanaan" jää pohtimaan, ei moiti pelaajaa; rekisterin oletus
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }     // kannustava korjaus ("katso tarkemmin"), lohduttava sävy kuten muissakin kaupungeissa
```

Merkkimäärät: tervehdys 160, tervehdysLuenta (kertoja+hahmo ilman
tageja, sama teksti kuin tervehdys) 160, loyto 114, tyhja 100, vaarin
91 — kaikki annettujen ylärajojen (tervehdys ~280, repliikit ~130)
sisällä; luenta on hieman ~140:tä pidempi mutta samassa
kokoluokassa kuin lontoo-esimerkin 151 merkkiä.

**1873-fakta ja lähde:** Pariisin bukinistit (Seinen rannan
kirjamyyjät) saivat vuonna 1859 pariisin prefektuurin päätöksellä
(10.10.1859) luvan pystyttää kiinteät puiset laatikot rantojen
kaiteille — mutta laatikot piti silti kantaa pois joka ilta
auringonlaskun jälkeen, koska niitä ei vielä saanut jättää kiinni
kaiteeseen. Vasta vuonna 1891 myyjät saivat luvan lukita laatikot
paikalleen pysyvästi. Isoisä kulki Pariisin läpi 1873 — siis juuri
sinä kautena, jolloin laatikot olivat jo pysyviä rakenteita mutta
myyjän piti yhä raahata ne pois joka ilta. Tästä syntyy Coletten
repliikin kontrasti: nykyään laatikko vain lukitaan kiinni.
Lähde: [Bouquinistes — French Moments](https://frenchmoments.eu/bouquinistes-of-paris/)
ja [A little history of Paris bouquinistes](https://www.unjourdeplusaparis.com/en/paris-bouquiniste/petite-histoire-des-bouquinistes)
(molemmat viittaavat 10.10.1859 prefektuurin päätökseen ja vuoden
1891 pysyvään kiinnityslupaan; ks. myös [en.wikipedia.org/wiki/Bouquinistes](https://en.wikipedia.org/wiki/Bouquinistes)).

**Kuvatilaus Codexille:**

Huom: Pariisilla on jo hyväksytty tyylikoe samalla hahmolla
(`kasvo-pariisi-kirjamyyjat-pulu.jpg`, Colette + tytär Maëlle + pulu-
cameo). Tämä briiffi on sen rinnalle/tarkennukseksi tätä kohtaamista
varten, ei korvaa olemassa olevaa kuvaa — Fable päättää käytetäänkö
vanhaa kuvaa sellaisenaan vai tilataanko uusi versio.

Colette on noin 55–60-vuotias pariisilaisnainen, harmaantuvat hiukset
löyhällä nutturalla, kulunut villatakki ja sormikkaat ilman
sormenpäitä (kirjojen käsittelyyn). Hän on kesken oikean työliikkeen:
nostaa tai lukitsee yhden vihreän puisen bukinisti-laatikon kantta
Seinen rannan kivikaiteella, kirjapinot vielä osin auki tiskillä.
Kaksi aikakerrosta: nykyinen kerros on hänen kätensä liike lukon/
saranan kanssa ja taustalla esimerkiksi pyöräilijä tai joku katsomassa
puhelintaan sillalla; vanha kerros on itse kivikaide ja laatikko —
sama rakenne joka on seissyt paikallaan 1800-luvulta asti, patinoitunut
vihreä maali, kuluneet saranat. Kun matkaaja kysyy aarteesta, Colette
kääntää katseensa suoraan kameraan puoliksi yllättyneenä, puoliksi
huvittuneena — kulmakarva koholla, ei täyttä hymyä, kuin arvioisi
vielä kannattaako vastata. Valo on aamuinen, matala ja hieman kostea
syyskuun valo Seineltä, taivas pilvinen mutta ei sateinen; joen pinta
kiiltää taustalla epätarkkana. Ei kuvan sisäistä tekstiä.

Valmis Fablen tarkistettavaksi.

---

# Kohtaaminen: Rooma (luonnos js/packs/kohtaamiset.js:ää varten)

Tehtävä: sisällöntuotanto — EI kosketa js/packs/kohtaamiset.js:ää. Tämä
raportti on Fablen (päätoimittajan) hyväksyttäväksi; koodiin viedään
vasta hyväksynnän jälkeen.

Tausta tarkistettu ennen kirjoitusta: tiedoston kenttädokumentaatio
(rivit 1–65), `lontoo`-malli (rivit 90–125), `dubrovnik`- ja
`venetsia`-rivit tyylivaihtelun näkemiseksi, docs/tarina.md ("Kaksi
ääntä" -sääntö) sekä docs/kuvatuotanto-kohtaamiset.md kokonaan.
Rooma-avainta ei vielä ole js/packs/kohtaamiset.js:ssä (tarkistettu
grepillä). Rooma ON tarinakaaren (KAARI_PAKETIT id `rooma`) kaupunki,
ja sen kaaren kohtaaminen on eri hahmo — "Enzo" suihkulähteen
huoltotyössä (js/packs/fokusvirta-rooma.js, kaari-visan aihe on Trevin
kolikkotapa). Tämän rivin `tervehdys` EI näy kaaren ensimmäisessä
kohtaamisessa (sen omistaa kaaripaketin oma `kohtaaminen`-kenttä) vaan
on kaupungin MYÖHEMPIEN tavallisten visojen avaus — sama rakenne kuin
Lontoossa, Venetsiassa ja Berliinissä (ks. tiedoston kommentti rivillä
~150). Siksi hahmo, paikka ja motiivi on valittu tarkoituksella eri
kuin Enzo/Trevi: ei suihkulähdettä, ei kolikkoheittoa, ei samaa faktaa
kuin fokusvirran nasonet- tai Lateraani-sopimusnostot.

## Rooma — mopokorjaaja Fabrizio

**hahmo:** "mopokorjaaja Fabrizio"
**nappi:** "Tapaa Fabrizio"
**frame:** "Fabrizio pyyhkii rasvaiset kätensä liinaan ja kysyy"
**tervehdys:** "Fabrizio vilkaisee kirjaasi ketjuöljyisin käsin: \"Tuo aukko takana on vuodelta 1870. Näytä että tunnet maailmaa kuten isoisäsi — niin kerron, mistä se näkyy parhaiten.\"" (168 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Fabrizio vilkaisee kirjaasi ketjuöljyisin käsin:' },
  { rooli: 'hahmo', teksti: '[utelias] "Tuo aukko takana on vuodelta 1870. '
    + '[lammin] Näytä että tunnet maailmaa kuten isoisäsi — niin kerron, '
    + 'mistä se näkyy parhaiten."' },
]
```

**loyto:** "Fabrizio pyyhkii rasian liinalla ennen kuin ojentaa sen: \"Tämä oli jumissa kuin vanha lukko. Nyt se aukeaa.\" — \"Eteenpäin!\"" (123 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Fabrizio pyyhkii rasian liinalla ennen kuin '
    + 'ojentaa sen:' },
  { rooli: 'hahmo', teksti: '[lammin] "Tämä oli jumissa kuin vanha lukko. '
    + '[ilo] Nyt se aukeaa."' },
  { rooli: 'pelaaja', teksti: '[jannitys] "Eteenpäin!"' },
]
```

**tyhja:** "Fabrizio kurottaa syvennykseen käsivarrellaan ja pudistaa päätään: \"Tyhjä. Täällä remontoidaan usein — joku ehti jo ennen meitä.\"" (129 merkkiä)

**vaarin:** "Fabrizio laskee jakoavaimen pöydälle: \"Ei vielä. Ketju ei irtoa väkisin, eikä tämäkään.\"" (88 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
  // Fabrizio kiinnostuu kirjasta ja vanhasta aukosta talossaan — sama
  // rekisterin oletus kuin Lontoossa ja Dubrovnikissa, ei erityistä syytä
  // poiketa (ei lämpöä eikä uhkaa vielä tässä repliikissä).
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
  // Löytö on pelin suuri hetki kaikissa kaupungeissa (rekisterin oletus);
  // pelaajan oma "Eteenpäin!" vahvistaa saman tunteen.
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
  // "Täällä remontoidaan usein" jää pohtimaan syytä eikä moiti pelaajan
  // oikeaa vastausta (rekisterin oletus).
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
  // Fabrizio ei nolaa pelaajaa vaan vertaa väärää vastausta jumiutuneeseen
  // ketjuun — lohduttava, hieman hämmentynyt sävy (rekisterin oletus).
```

**1873-fakta ja lähde:** Rooma ja jäljellä ollut Kirkkovaltio
liitettiin Italian kuningaskuntaan 20. syyskuuta 1870, kun Italian
armeija mursi tykistöllä aukon Aurelianuksen muuriin Porta Pian
luona ("Capture of Rome", 20 September 1870 breach at Porta Pia,
en.wikipedia.org/wiki/Capture_of_Rome). Rooma julistettiin Italian
pääkaupungiksi vuonna 1871 (pääkaupunki siirtyi Firenzestä), ja
paavi Pius IX kieltäytyi tunnustamasta muutosta ja kutsui itseään
"Vatikaanin vangiksi" — tila jatkui vuoteen 1929 Lateraanin
sopimukseen asti (en.wikipedia.org/wiki/Prisoner_in_the_Vatican).
Isoisän päiväkirja on vuodelta 1873 eli vain 2–3 vuotta murron
jälkeen — tapahtuma oli hänen matkallaan yhä tuore uutinen, ei
historiaa. HUOM: tämä on eri fakta kuin fokusvirta-rooma.js:n nasonet-
ja Lateraani-nostot (docs/kuvatuotanto-kohtaamiset.md-tarkistuksen
mukaan kaari käyttää Vatikaanin ikkuna-aihetta 1929-vuosiluvulla;
tässä on sama vuosiluku 1929 vain taustatietona, ei toistettuna
näytöllä — näytölle nostettu vuosiluku on 1870, ei 1929).

**Kuvatilaus Codexille:**

Nykyaikainen dokumentaarinen valokuva, ei muotokuva. Fabrizio on noin
50-vuotias roomalainen mies, oliivinsävyinen iho, harmaantuva
parransänki, tukeva vartalo, hiukset lyhyet ja hieman harmaantuneet.
Yllään öljyntahrima harmaa työpaita, hihat käärittynä, nahkainen
työesiliina. Hän on kesken aidon työn: kyykyssä tai kumartuneena
vanhan Vespa-mopon kyljellä ahtaassa työpajan nurkassa, joka on
rakennettu vanhan kivimuurin syvennykseen — muurissa näkyy karkeaa,
vuosisatoja vanhaa kivipintaa ja yksi selvästi karkeampi, rosoinen
paikka (viittaa 1870 murtoon) modernin työpöydän ja työkaluripustimen
takana. Kaksi aikakerrosta samassa kuvassa: nykyinen mopon rengasrauta/
jakoavain kädessä (moderni toiminta) ja vanha, epätasainen kivimuuri
taustalla (vanha rakenne) — kaupungin nimen ei tarvitse näkyä.
Hän on juuri nostanut katseensa työstä ja kääntynyt suoraan kameraan
(=pelaajaan) päin, ilme on utelias, puoliksi huvittunut hymynkare, kun
matkaaja kysyy aarteesta — ei säikähdystä, vaan "kuka sinä olet ja mitä
tuo vanha kirja on" -katse. Yhdessä kädessä ruuvitaltta tai
rengasrauta, toinen käsi vielä mopon rungolla. Valo: iltapäivän
lämmin, viisto auringonvalo kapeassa roomalaisessa kujassa, pehmeät
varjot, tausta bokehissa mutta kivimuurin tekstuuri vielä luettavissa.
Rajaus enintään puolivartalo. Ei kuvansisäistä tekstiä eikä logoja.
Aarteen vihjettä (murtuman tarkkaa sijaintia) ei saa paljastaa kuvassa.

Valmis.

---

# Kohtaamisehdotus: Wien

Sisällöntuotannon raportti — EI muokattu js/packs/kohtaamiset.js:ää.
Odottaa Fablen (päätoimittajan) hyväksyntää ennen kuin tämä siirretään
peliin.

Huomio taustatyöstä: docs/kuvatuotanto-kohtaamiset.md:n taulukossa Wienin
rivillä lukee "64-vuotias Anton jatkaa juoksuaskelta ... Vanha
pörssirakennus bokehissa", mutta js/kohtaamiskuvat-data.js:ssä on jo
TARKISTETTU (hyväksytty) kuva `wien-anton-katakombit-v2.jpg`, jossa Anton
on katakombiopas/suntio kynttilöineen (myös docs/arkisto/fable-tilanne.md:
"Anton (Wien, suntio)"). Nämä kaksi kuvausta eivät täsmää keskenään —
alla oleva kohtaaminen on kirjoitettu KATAKOMBI-Antonin mukaan, koska
sillä on jo hyväksytty kuva. Pörssirakennus-juoksija vaikuttaa
vanhentuneelta/hylätyltä konseptilta; Fable päättänee kumpi jää voimaan.

## Wien — suntio Anton

**hahmo:** "suntio Anton"

**nappi:** "Tapaa Anton"

**frame:** "suntio Anton pysäyttää kynttilän ja kysyy"

**tervehdys:** "Anton nostaa kynttilän kirjaasi kohti pimenevässä
käytävässä. \"Isoisäsi taisi ihailla näyttelyn ihmeitä, samana kesänä
kun kolera kulki kaupungilla nopeammin kuin sana siitä. Näytä että
tunnet maailmaa kuten piirtäjä — niin näytän, minne historia täällä
oikeasti katosi.\"" (271 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Anton nostaa kynttilän kirjaasi kohti '
    + 'pimenevässä käytävässä.' },
  { rooli: 'hahmo', teksti: '[gravely] "Isoisäsi taisi ihailla näyttelyn '
    + 'ihmeitä, samana kesänä kun kolera kulki kaupungilla nopeammin '
    + 'kuin sana siitä. [warmly] Näytä että tunnet maailmaa kuten '
    + 'piirtäjä — niin näytän, minne historia täällä oikeasti katosi."' },
]
```

**loyto:** "Anton harjaa pölyn esineeltä kynttilänvalossa: \"Tämä ei
kuulu tähän holviin. Joku toi sen tänne aikoja sitten, piiloon.\""
(120 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Anton harjaa pölyn esineeltä '
    + 'kynttilänvalossa:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä ei kuulu tähän holviin. '
    + 'Joku toi sen tänne aikoja sitten, piiloon."' },
]
```

**tyhja:** "Anton siirtää kynttilää syvemmälle koloon: \"Tyhjä. Nämä
holvit ovat vaihtaneet omistajaa monta kertaa vuosisatojen varrella.\""
(125 merkkiä)

**vaarin:** "Anton pudistaa päätään, kynttilä yhä pystyssä: \"Ei tuo.
Täällä alhaalla vastaukset odottavat, kunnes joku katsoo tarkemmin.\""
(124 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'vakava', voimakkuus: 0.5 }
  // Anton ei tervehdi lämpimästi vaan totisesti — kolera-viittaus on
  // dekkarisävyinen kontrasti isoisän innostukseen (rekisterin
  // poikkeus, kuten Lontoon ja Venetsian tervehdyksissä).
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
  // Rekisterin oletus: löytö on pelin suuri hetki.
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
  // Rekisterin oletus: "Tyhjä…" jää pohtimaan, ei moiti.
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
  // Rekisterin oletus: väärä vastaus saa lohduttavan sävyn.
```

**1873-fakta ja lähde:** Wienin maailmannäyttely (Weltausstellung)
pidettiin 1.5.–31.10.1873 Praterissa; kävijöitä oli n. 7,2 miljoonaa
odotetun 20 miljoonan sijaan. Näyttelyn avaamisen jälkeen, 9.5.1873
("musta perjantai"), Wienin pörssi romahti (Gründerkrach). Kesäkuussa
1873 kaupunkia riepotteli vakava koleraepidemia, joka vaati kesän
aikana lähes 3000 kuolonuhria Wienissä ja karkotti näyttelyvieraita.
Kohtaamisen kytkös käyttää koleraepidemiaa (ei väitetä, että uhrit
haudattiin nimenomaan Antonin oppaana kiertämiin katakombeihin — tätä
ei lähteistä vahvistu, joten teksti pitää sen yleisenä ajallisena
kontrastina isoisän innostuneeseen näyttelykuvaukseen).
- en.wikipedia.org/wiki/1873_Vienna_World%27s_Fair
- habsburger.net/en/events/stock-exchange-crash-1873
- en.wikipedia.org/wiki/Panic_of_1873

**Kuvatilaus Codexille:**
Suositus: tarkista ensin, riittääkö jo TARKISTETTU
`wien-anton-katakombit-v2.jpg` (js/kohtaamiskuvat-data.js) sellaisenaan
— sen kuvateksti ("Anton pysähtyy kynttilät kädessään katakombien
portaille... siristää silmänsä vierasta kohti eikä väisty") vastaa jo
tätä kohtaamista, eikä uutta kuvaa välttämättä tarvita. Jos silti
tilataan uusi tai täydentävä kuva, briiffi:
- Hahmo: mies, n. 55–60-vuotias, kirkon suntio/oppaan olemus; siisti
  tummanharmaa virkatakki tai vanhahtava villatakki ja solmio, hieman
  kulunut kangas, iso vanha avainkimppu vyöllä.
- Tekeminen kesken kuvaa: pysähtynyt askel kesken katakombikierroksen
  kivisessä holvikäytävässä; nostaa vahakynttilän tai vanhan lyhdyn
  pelaajan matkakirjaa kohti, toinen käsi vasten kylmää kiviseinää
  tasapainoksi.
- Kaksi aikakerrosta: satoja vuosia vanhat kivi- ja luuholvit taustalla
  (hämärä, ei näy suoraan kalloja lähikuvassa) vs. nykyaikainen pieni
  vihje suntion arjesta (esim. muovinen avainkortti taskussa,
  taskulampun moderni klipsivalo vyöllä) — kirja tuo isoisän ajan.
- Ilme/reaktio aarrekysymykseen: totinen, tutkiva puolihymy — vakava
  muttei pelokas eikä vihamielinen; katsoo suoraan kameran linssiin
  (pelaajaan), ei ohi.
- Valo/sää: sisätila, ei säätä; lämmin, matala kynttilän/lyhdyn valo
  viistosti alhaalta tai sivulta, tausta pehmeästi sumea ja pimeä,
  silmät ja kasvojen keskiosa terävinä. Ei kuvatekstiä, logoja eikä
  luettavissa olevia hautakirjoituksia tai vuosilukuja kuvassa.

Ei valmis: odottaa Fablen tarkistusta (mm. kumpi Anton-konsepti —
katakombit vai pörssirakennuksen juoksija — jää voimaan) ennen siirtoa
js/packs/kohtaamiset.js:ään.

---

# Kohtaaminen: Helsinki (luonnos, ei vielä koodissa)

Tämä on sisällöntuotannon raportti, EI koodimuutos. `js/packs/kohtaamiset.js`
ei ole muokattu — helsinki-rivi lisätään sinne vasta Fablen hyväksynnän
jälkeen (sama rakenne kuin `lontoo`).

## Helsinki — telakkahitsaaja Saana

**hahmo:** "telakkahitsaaja Saana"

**nappi:** "Tapaa Saana"

**frame:** "telakkahitsaaja Saana nostaa visiirin ja kysyy"

**tervehdys:** "Saana nostaa hitsausvisiirin ja vilkaisee kirjaasi:
'Höyrylaiva Tähti rakennettiin tässä telakassa 1873. Minä hitsaan nyt
jäänmurtajaa samalla laiturilla. Näytä että tunnet maailmaa kuten
piirtäjä — niin kerron, minne se vanha laiva päätyi.'" (241 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Saana nostaa hitsausvisiirin ja vilkaisee '
    + 'kirjaasi:' },
  { rooli: 'hahmo', teksti: '[proud] "Höyrylaiva Tähti rakennettiin '
    + 'tässä telakassa 1873. [curious] Näytä että tunnet maailmaa kuten '
    + 'piirtäjä — niin kerron, minne se vanha laiva päätyi."' },
]
```

**loyto:** "Saana kaivaa rasian telakan arkistolaatikosta: 'Tämä on
odottanut täällä pidempään kuin minun jäänmurtajani.'" (109 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Saana kaivaa rasian telakan '
    + 'arkistolaatikosta:' },
  { rooli: 'hahmo', teksti: '[warmly] "Tämä on odottanut täällä '
    + 'pidempään kuin minun jäänmurtajani."' },
]
```

**tyhja:** "Saana katsoo tyhjää koloa laiturin alta: 'Ei mitään. Tätä
telakkaa on revitty ja rakennettu niin monesti.'" (106 merkkiä)

**vaarin:** "Saana tarttuu takaisin hitsauspoltittimeen: 'Ei vielä.
Sekin laiva vaati minulta monta yritystä.'" (97 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'ylpea', voimakkuus: 0.5 }
  // Poikkeus rekisterin oletuksesta (utelias): Saana ei ole ensisijaisesti
  // utelias kirjasta vaan ylpeä työstään — hän rinnastaa oman
  // jäänmurtajansa suoraan 1873 rakennettuun höyrylaivaan samalla
  // laiturilla. Sama telakka, 150 vuotta väliä.
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
  // Rekisterin oletus: löytö on pelin suuri hetki muissakin kaupungeissa.
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
  // Rekisterin oletus: "Ei mitään" jää pohtimaan eikä moiti pelaajaa.
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
  // Rekisterin oletus: väärä vastaus saa lohduttavan "Ei vielä" -sävyn.
```

**1873-fakta ja lähde:** Höyrylaiva **Tähti** rakennettiin vuonna 1873
Helsingin Hietalahden telakalla (silloin Helsingfors Skeppsdocka /
Hietalahden laivatelakka, perustettu 1865, ensimmäinen laiva
valmistui 1868). Sama telakka-alue on ollut yhtäjaksoisesti käytössä
laivanrakennukseen yli 160 vuotta, ja siellä on rakennettu muun muassa
merkittävä osa maailman toimivista jäänmurtajista — nykyään nimellä
Helsinki Shipyard. Lähteet (englanninkielinen Wikipedia, tarkistettu
tässä sessiossa 22.9.2026):
- "List of ships built at Hietalahti shipyard (1–200)" — Tähti,
  höyryvene, 1873.
- "Hietalahti shipyard" — perustettu 1865, ensimmäinen laiva 1868,
  nykyään osa Helsinki Shipyardia, rakentanut jäänmurtajia yli
  160 vuoden ajan samalla paikalla.

Huom: en löytänyt Tähti-laivasta tarkempia teknisiä yksityiskohtia
(esim. käyttötarkoitus, kohtalo) luotettavasta lähteestä tässä
sessiossa — tervehdyksen repliikki ("niin kerron, minne se vanha laiva
päätyi") jättää tarkoituksella auki, minne laiva päätyi, koska en voi
vahvistaa sitä. Jos Fable haluaa tarkemman kohtalon laivalle, se pitää
tarkistaa erikseen ennen kuin sitä väitetään pelissä.

**Kuvatilaus Codexille:**

Nainen, noin 30–35-vuotias, telakkahitsaaja Helsingin Hietalahdessa,
nykyaika. Yllä palonkestävä työhaalari (tummansininen/harmaa),
hihat käärittynä, kädessä paksut nahkakäsineet, hitsausvisiiri
nostettuna otsalle niin että kasvot näkyvät kokonaan. Hiukset
sidottu taakse huivilla tai lippalakilla suojan alla. Poskessa kevyt
noki-/pölytahra, kasvoilla hikeä — kesken aidon työn, ei poseeraa.
Toiminta: on juuri lopettanut hitsaussauman ja kääntynyt katsomaan
suoraan kameraan; toisessa kädessä hitsauspoltin roikkuu alaspäin,
hitsauskipinöitä vielä ilmassa/sammumassa taustalla. Kaksi
aikakerrosta samassa kuvassa: etualalla/taustalla moderni
jäänmurtajan tai suuren teräsrungon kylki telakalla (nykyaikaiset
telineet, valokaaren hohde), ja jossain kuvan reunalla vanha,
patinoitunut rautainen kiinnityspollari tai vanha puinen laiturin
paalu 1800-luvulta, joka on yhä käytössä samalla telakka-alueella —
ei irrallinen rekvisiitta vaan osa toimivaa satamaa. Ilme: ylpeä,
puoliksi huvittunut hymy, kun hän vertaa vanhaa kuvaa/piirrosta
(pelaajan kirjaa) omaan työhönsä — ei hämmästys vaan tunnistava
"tiedän tarkalleen mistä puhut" -katse suoraan objektiiviin. Valo/sää:
pilvinen Itämeren iltapäivä, telakkahallin avoimesta ovesta lankeava
kylmä, viileänsininen päivänvalo sekoittuu hitsauskaaren
oranssinkeltaiseen hehkuun kasvoilla — kontrastivalotus, tausta
pehmeämpi mutta telakka-alue vielä tunnistettava. Rajaus
puolivartalokuva. Ei kuvansisäistä tekstiä eikä logoja.

Valmis: ei valmis (odottaa Fablen tarkastusta ja hyväksyntää ennen
`js/packs/kohtaamiset.js`-riviä ja kuvatilauksen lähettämistä
Codexille).

---

# Kohtaaminen: Istanbul — luonnos Fablen tarkastettavaksi

Tehtävänanto: kirjoita yksi uusi kohtaaminen Istanbulille
`js/packs/kohtaamiset.js`-rakenteen mukaisesti (rakenne: hahmo, nappi,
frame, tervehdys, tervehdysLuenta, loyto, loytoLuenta, tyhja, vaarin,
neljä tunnetagia). Tätä raporttia EI ole viety kohtaamiset.js:ään —
odottaa hyväksyntää.

Huom Istanbulista jo olemassa olevasta materiaalista, jotta tämä ei
mene päällekkäin: `js/kohtaamiskuvat-data.js` sisältää jo hahmon
"Emine" (konservointi-insinööri, roikkuu ylösalaisin Yerekapanin/
Basilica Cisternin pylväiden välissä) — tämä on kytketty
tarinakaaren "Sulttaanin timantti" -minilautaan
(docs/isoisan-raamattu.md rivi 569), EI tavalliseen
kohtaamiset.js-visaan. Istanbulilla ei ollut ennestään riviä
kohtaamiset.js:ssä, joten alla on kokonaan uusi hahmo ja paikka
(ei Emine, ei kisterni, ei Hagia Sofia/Sininen moskeija).

## Istanbul — raitiovaunuseppä Kemal

**hahmo:** "raitiovaunuseppä Kemal"

**nappi:** "Tapaa Kemal"

**frame:** "Kemal nostaa katseensa vaunun penkistä ja kysyy"

**tervehdys:** "Kemal pyyhkii lakkaa penkiltä ennen iltavuoroa: \"Isoisäsi näki hevosvaunun uutena tammikuussa 1873. Tämä on sen kaukainen perillinen. Näytä että tunnet maailmaa kuten hän — niin kerron mitä kellon sisään jäi.\"" (209 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Kemal pyyhkii lakkaa penkiltä ennen iltavuoroa:' },
  { rooli: 'hahmo', teksti: '[miettiva] "Isoisäsi näki hevosvaunun uutena tammikuussa 1873. Tämä on sen kaukainen perillinen. [lammin] Näytä että tunnet maailmaa kuten hän — niin kerron mitä kellon sisään jäi."' },
]
```
(sanasta sanaan sama kuin tervehdys, tunnetageja lukuun ottamatta; ei
pelaajan repliikkiä — docs/tarina.md 21.9.2026: nuori Fogg ei puhu)

**loyto:** "Kemal kolkuttaa kellon kylkeä ja irrottaa rasian sisältä: \"Tämä on kolissut vuosia. Kukaan ei osannut sanoa miksi.\"" (115 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Kemal kolkuttaa kellon kylkeä ja irrottaa rasian sisältä:' },
  { rooli: 'hahmo', teksti: '[utelias] "Tämä on kolissut vuosia. [miettiva] Kukaan ei osannut sanoa miksi."' },
]
```

**tyhja:** "Kemal avaa penkin alla olevan lokeron: \"Tyhjä. Tämä vaunu on purettu ja koottu niin monta kertaa, että kätköt katoavat.\"" (120 merkkiä)

**vaarin:** "Kemal palaa viilaamaan penkkiä: \"Ei tänään. Lakka kuivuu hitaasti, ja niin kuivuu tietokin.\"" (92 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'lammin', voimakkuus: 0.55 }
  // perustelu: isoisän muisto (hevosvaunu 1873) kudotaan suoraan
  // tervehdykseen, samaan tapaan kuin Berliinin posetiivari Otto
  // (tunneTervehdys: lammin 0.6) — lämpimin tervehdystyyppi
  // rekisterissä, koska kohtaaminen nojaa isoisän muistoon eikä
  // pelkkään uteliaisuuteen.
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
  // perustelu: rekisterin oletus (docs/pulu-reaktiot.md E2) — löytö
  // on pelin suuri hetki kaikissa kaupungeissa.
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
  // perustelu: rekisterin oletus — "Tyhjä…" jää pohtimaan syytä
  // (vaunun purku/kokoonpano) eikä moiti pelaajaa.
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
  // perustelu: rekisterin oletus — lohduttava "Ei tänään" ilman
  // moitetta, sama sävy kuin muissa kaupungeissa.
```

**1873-fakta ja lähde:**

Istanbulin (silloisen Konstantinopolin) ensimmäinen hevosvetoinen
raitiovaunulinja avattiin 1871 (Tophanen juhla, Azapkapı–Beşiktaş),
Istanbul Tramway Companyn 1869 saaman konsession pohjalta. Verkko
laajeni nopeasti: Aksaray–Topkapı-linja avattiin liikenteelle
**14. tammikuuta 1873** — täsmälleen isoisän matkapäiväkirjan
vuonna. Ensimmäisenä vuonna hevosvaunut kuljettivat 4,5 miljoonaa
matkustajaa neljällä linjalla (Azapkapı–Galata, Aksaray–Yedikule,
Aksaray–Topkapı, Eminönü–Aksaray), 45 vaunua ja 430 hevosta.

Nykyinen "nostalginen raitiovaunu" İstiklal-kadulla on tästä
verkosta erillinen, myöhempi linja: punaiset sähkövaunut ajoivat
Beyoğlussa ensi kertaa 1914, liikenne lopetettiin 1961, ja linja
herätettiin henkiin matkailija-/paikallislinjana Taksim–Tünel-
välillä 29.1.1990. Kemalin repliikissä "kaukainen perillinen" viittaa
tähän jatkumoon (raitiovaunuperinne, ei sama linja tai tekniikka) —
tarkkuuden vuoksi tekstissä ei väitetä samaa linjaa, vain samaa
kaupungin raitiovaunuperinnettä.

Lähteet (en.wikipedia.org):
- "Trams in Istanbul (1871-1966)" — konsessio 1869, ensimmäinen linja
  1871, Aksaray–Topkapı 14.1.1873, matkustaja-/vaunumäärät.
- "Istanbul nostalgic tramways" — Beyoğlun punainen vaunu 1914–1961,
  elvytys Taksim–Tünel 1990.

**Kuvatilaus Codexille:**

Turkkilainen mies, n. 60–65-vuotias, harmaantuva lyhyt parta,
työkäsivarret paljaina käärityissä paidanhihoissa, tumma nahkaesiliina
tai -liivi paidan päällä, ei mitään aikakauden asuun viittaavaa
(nykyinen työvaatetus). Paikka: pieni konepaja/piha Tünelin
raitiovaunupäätepysäkin kupeessa — puulastuja, lakkapurkki, messinkinen
raitiovaunukello penkillä, vanhoja vaununosia seinillä. Kesken
tekeminen: hän kiillottaa tai lakkaa vaunun puupenkkiä siveltimellä/
rätillä, pysähtyy kesken vedon ja kääntää katseensa suoraan kameraan
(pelaajaan) — ei poseeraa. Kaksi aikakerrosta: ikkunan tai oviaukon
kautta näkyy hämärästi nykyinen punainen nostalginen raitiovaunu
(1990-elvytysvaunu, ei mitään tekstiä/logoa näkyviin) taustalla
ohikulkemassa, kun taas työpöydällä ja seinillä on vanhoja, patinoituneita
messinki- ja puuosia jotka viittaavat 1870-luvun hevosvaunuaikaan. Ilme:
utelias mutta hieman varautunut sivukatsahdus, joka lämpenee — sopii
tervehdyksen "lammin/miettiva" -sävyyn. Rasian/kellon sisältöä ei
näytetä (kätkövihje ei saa paljastua). Valo: myöhäisiltapäivän lämmin,
pölyinen valo kulkeutuu sisään ikkunasta viistosti; sää ei näy sisätilassa,
mutta ikkunan takana on selkeä, aurinkoinen Istanbulin iltapäivä. Rajaus
enintään puolivartalo, kuten muissa kohtaamiskuvissa; ei kuvansisäistä
tekstiä, logoa tai vesileimaa.

---

valmis

---

# Kohtaamiset-raportti: Amsterdam (c1)

Tämä on sisällöntuotantoraportti Fablen (päätoimittajan) tarkastettavaksi.
**Ei kosketettu** `js/packs/kohtaamiset.js`-tiedostoa — rivi lisätään
sinne vasta hyväksynnän jälkeen.

## Amsterdam — muuttotyöntekijä Yara

**hahmo:** "muuttotyöntekijä Yara"
**nappi:** "Tapaa Yara"
**frame:** "Yara pysäyttää nostoköyden hetkeksi ja kysyy"
**tervehdys:** "Yara nojaa kärryyn ja vilkaisee kirjaasi: \"Pääty on yhä yhtä kapea kuin sata viisikymmentä vuotta sitten. Näytä että tunnet mitat kuten minä, niin kerron mistä koukku löytyy.\"" (175 merkkiä)
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Yara nojaa kärryyn ja vilkaisee kirjaasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Pääty on yhä yhtä kapea kuin sata '
    + 'viisikymmentä vuotta sitten. [warmly] Näytä että tunnet mitat kuten '
    + 'minä, niin kerron mistä koukku löytyy."' },
]
```
(sanasta sanaan sama kuin tervehdys, vain tunnetagit lisätty — talon sääntö)

**loyto:** "Yara nostaa rasian kämmenelleen ja hihkaisee yläkertaan: \"Löytyi! Ei tänään lipu ovesta, mutta pääty piti paikkansa.\"" (117 merkkiä)
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Yara nostaa rasian kämmenelleen ja hihkaisee '
    + 'yläkertaan:' },
  { rooli: 'hahmo', teksti: '[surprised] "Löytyi! [pleased] Ei tänään lipu '
    + 'ovesta, mutta pääty piti paikkansa."' },
]
```

**tyhja:** "Yara koputtaa koukun kohdalle ja pudistaa päätään: \"Tyhjä. Tässä päädyssä vaihtuu tavaraa useammin kuin luulisi.\"" (113 merkkiä)

**vaarin:** "Yara laskee köyden hetkeksi: \"Ei ihan. Minäkin luin nuo mitat väärin, kunnes joku opetti katsomaan koukusta asti.\"" (114 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
  // Yara tarkistaa kirjan mitat ammattisilmällä eikä esittele kaupunkia —
  // uteliaisuus kohdistuu kirjaan, ei lämpöön (sama rekisteripoikkeus kuin
  // Leilalla/Maralla, docs/pulu-reaktiot.md E2).
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.65 }
  // Löytö on pelin iloinen hetki, mutta Yara on kiireinen ammattilainen
  // kesken työpäivän — hieman hillitympi kuin rekisterin oletus 0.7.
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
  // Rekisterin oletus: Yara jää pohtimaan kiertoa eikä moiti pelaajan
  // oikeaa vastausta.
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
  // Yara lohduttaa omalla erehdyksellään — sama lohduttava malli kuin
  // muissa kaupungeissa (Lontoo, Dubrovnik).
```

## 1873-fakta ja lähde

Amsterdamin kanavatalojen kapeus juontuu 1600-luvulta lähtien käytössä
olleesta kiinteistöverosta, joka laskettiin julkisivun leveyden mukaan —
mitä kapeampi pääty kadulle päin, sitä pienempi vero. Samalta ajalta ovat
peräisin päätyjen **hijsbalk**-nostopuut/-koukut: kauppiaat halusivat
nostaa tavaransa suoraan kanavaveneestä ullakolle, koska portaat olivat
liian jyrkät ja kapeat huonekaluille. Monet talot rakennettiin myös
tarkoituksella hieman etukenoon, jottei nostettava tavara hankaa
julkisivua vasten noustessaan. Vuonna 1873 (isoisän matkavuonna) tämä
järjestelmä oli jo yli 200 vuotta vanha eikä mikään uutuus — ja se on
sanatarkasti sama tänään: koukut ovat yhä käytössä huonekalujen nostoon,
koska portaat eivät edelleenkään mahdu niille. Tämä on siis kontrasti,
jossa isoisän kirja olisi *edelleen täysin oikeassa* eikä vanhentunut —
Yaran repliikki nojaa juuri tähän (”yhä yhtä kapea kuin sata
viisikymmentä vuotta sitten”).

Lähteet: [Canal house — Wikipedia](https://en.wikipedia.org/wiki/Canal_house);
[Why Dutch Houses Have Those Hooks on the Facades — Amsterdamian](https://amsterdamian.com/see/amsterdam/why-dutch-houses-have-those-hooks-on-the-facades/);
[Amsterdam canal houses: why are they so wonderfully weird? — DutchReview](https://dutchreview.com/culture/amsterdam-canal-houses/).

Sama fakta (leveysvero, nostokoukku huonekaluille) on jo pelin omassa
tarkistetussa aineistossa: `js/packs/europe-kulttuuri.js` (amsterdam-kysymys
"Miksi Amsterdamin vanhat kanavatalot ovat niin kapeita?") ja
`js/packs/kulttuuri-kategoriat.js` (nosto "Verotettiin julkisivun
leveydestä") sekä tarinakaaren Amsterdam-kohtaamisen kysymyksenä
(`js/tyohuone-kehitys-data.js` KAARI_PAKETIT / `js/packs/
fokusvirta-amsterdam.js`: "Amsterdamin vanhojen talojen päädyssä on
melkein aina koukku katonrajassa. Mitä varten?" → "Huonekalut nostetaan
sisään ikkunoista, koska portaat ovat liian kapeat"). Tämän rivin teksti
ei siis keksi uutta faktaa vaan viittaa samaan, jo hyväksyttyyn asiaan
eri sanoin paljastamatta sitä suoraan.

## Hyväksytyt6-pohja käytetty: KYLLÄ

`posti/kohtaamiset-hyvaksytyt6-pelitoimitus-2026-09-05.json` (rivi
`amsterdam-yara-feedback-r20260905-v2`) sisälsi jo omistajan hyväksymän
hahmon **Yara — muuttoryhmän vetäjä**, kuvatekstin ja -promptin. Tämä on
myös sama hahmo, jonka Fable on jo ottanut tarinakaaren viralliseksi
Amsterdam-kohtaamiseksi (`js/tyohuone-kehitys-data.js` KAARI_PAKETIT,
kommentti: "HAHMO VAIHDETTU: siltavahti Willem → muuttotyöntekijä Yara
… Fablen päätös klo 20:05 UTC"). Käytin siis Yaraa pohjana enkä keksinyt
uutta hahmoa: sama nimi, ammatti (kanavatalojen muuttokuormat, kaappien
mittaaminen, nostoköysi/-koukku) ja sama tapa puhua nopeasti ja hävitä
kesken lauseen nostamaan jotain raskasta (kuvattu KAARI-paketin
`teksti`-kentässä). Tämä `kohtaamiset.js`-rivi on tarkoitettu kaupungin
**myöhempien** tavallisten visojen avaukseksi (sama rooli kuin Leilalla
Lontoossa ja Maralla Dubrovnikissa) — tervehdys ja repliikit on kirjoitettu
kokonaan uusina, ei kopioitu KAARI-paketin omasta dialogista, jottei
sanasta sanaan -sääntö riko kaarikohtaamisen omaa tekstiä.

Huom: `docs/kuvatuotanto-kohtaamiset.md`-taulukon Amsterdam-rivi on
vanhentunut ja mainitsee yhä vanhan Willem-hahmon
("Willem pysähtyy nykyajan kaupunkipyörällä kanaalisillalle") — sitä ei
ole päivitetty Yara-vaihdoksen jälkeen. En muokannut taulukkoa, koska se
ei kuulunut tähän tehtävään, mutta Fable tai Opus voi haluta korjata sen
erikseen.

## Kuvatilaus Codexille

**Kuva on jo olemassa ja hyväksytty — suositus: käytä sitä sellaisenaan,
älä tilaa uutta.** `amsterdam-yara-feedback-r20260905-v2.jpg` on
merkitty `js/kohtaamiskuvat-data.js`:ssä tilaan `tarkistettu` (rivi 507)
ja sen kuvateksti/`kuvateksti`-kenttä on jo sanatarkasti:

> "Yara on keskeyttänyt kanavatalon muuton vastatakseen matkaajalle.
> Yläikkunasta kurkistava työpari odottaa lupaa jatkaa, kun aarrekysymys
> muuttaa tilanteen suunnan."

Koska `kohtaamiset.js`:n hahmokuva haetaan kaupunkitasolla
(`kohtaamiskuvaKohteelle(quiz.cityId)` — yksi kuva per kaupunki, ei per
repliikki), tämä sama Yara-kuva kelpaa myös tälle uudelle
myöhemmän-vision rivil­le sellaisenaan. **Ehdotan kuvatekstin
säilyttämistä muuttamattomana.**

Jos Fable silti haluaa TOISEN, vaihtoehtoisen kuvan (esim. jos
alkuperäistä ei aktivoida peliin muusta syystä, tai halutaan visuaalista
vaihtelua eri kohtaamishetkille), tässä varabriiffi samalle,
kanonisoidulle hahmolle:

- **Hahmo:** Yara, n. 35 vuotta, tumma iho, lihaksikas/tukeva vartalo,
  epäsymmetriset lyhyet mustat kiharat, pieni hopeinen rengaskorvakoru.
  Vaatetus: violetti t-paita ja farkkuhaalarit (sama kuin hyväksytyssä
  kuvassa — säilytä hahmon jatkuvuus).
- **Tekeminen kesken kuvan:** Yara on tauolla kanavan varrella kesken
  muuttopäivän — nojaa käsikärryyn tai laskee juuri nostoköyden alas,
  kädessä taitettu siirtohuopa. Ei poseerausta: paino yhdellä jalalla,
  vartalo hieman kiertyneenä kohti kameraa.
- **Kaksi aikakerrosta:** taustalla aito, satoja vuosia vanha kanavatalon
  kapea pääty ja siitä työntyvä puinen hijsbalk-nostokoukku (yhä samassa
  käytössä kuin 1800-luvulla); etualalla nykyaikainen muuttokärry,
  pahvilaatikko ja modernit vaatteet.
- **Ilme/reaktio aarrekysymykseen:** puoliksi epäileväinen, puoliksi
  huvittunut suora katse kameraan — kulmakarva koholla, suu tiukasti
  kiinni pidätellyn hymyn ympärillä. Ei stock-photo-hymyä.
- **Valo/sää:** lämmin aamuaurinko sivulta, viileä heijastus
  kanavavedestä ja -taivaasta varjoissa; selkeä sää, ei sadetta.
- Sivuhahmo (työpari) saa olla taustassa ikkunassa, ei katso kameraan.
- Rajaus enintään puolivartalo, molemmat kädet ja koko pää mukana,
  ei kuvatekstiä/logoa kuvassa.

## Yhteenveto

Käytin Yaraa (hyväksytyt6-pohja, sama kuin tarinakaaren kanoninen
Amsterdam-hahmo) enkä keksinyt uutta henkilöä. 1873-fakta (leveysvero,
hijsbalk-nostokoukku) on tarkistettu Wikipediasta ja tukee jo pelin omaa
hyväksyttyä sisältöä. Kuvaa ei tarvitse tilata uudestaan — olemassa oleva
hyväksytty Yara-kuva ja sen kuvateksti riittävät.

valmis
