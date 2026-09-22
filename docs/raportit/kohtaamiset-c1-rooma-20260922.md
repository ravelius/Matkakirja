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
