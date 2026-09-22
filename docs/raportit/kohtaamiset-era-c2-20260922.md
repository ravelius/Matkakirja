# Kohtaamiset erä C2: seuraavat 6 kaupunkia eniten nostoja ilman kohtaamista (2026-09-22)

Sisältökirjuri (Sonnet), jatkoa erälle C1. Kuusi seuraavaa kaupunkia
nostomäärän mukaan (js/packs/maakartat.js KAUPUNKIKARTAT):

| Kaupunki | Nostoja | Huomio |
| --- | ---: | --- |
| Ateena | 13 | Kaksi olemassa olevaa kuvakonseptia (Nikos, Dafni) EIVÄT kelpaa — Dafni on jo varattu kaupungin kaari-kohtaamiseen, Nikos korvattu — uusi kolmas hahmo Iason. |
| København | 12 | Olemassa oleva Freja-kuva on jo kaaren oma — uusi hahmo Sofie. |
| Sofia | 12 | Kaaren oma Nadia-hahmo/kuva sopii jo suoraan, käytetty uudelleen. |
| Firenze | 11 | Ei aiempaa materiaalia — kokonaan uusi hahmo Ilaria. |
| Lissabon | 11 | Olemassa oleva Inês-kuva sopii jo suoraan, käytetty uudelleen. |
| Budapest | 10 | Kolme ristiriitaista kuvakonseptia dokumentaatiossa — todellinen aktiivinen on Márta (Széchenyi-kylpylä); "Réka" osoittautui dokumentaatiovirheeksi, ei kelpaa. |

Rakenne sama kuin erä C1 ja olemassa olevat kaupungit. Ei vielä
kirjoitettu js/packs/kohtaamiset.js:ään — tarkastukseesi ensin.

## Läpikäyvät huomiot

1. Kaikki inline-luentatagit tarkistettu englanniksi (ElevenLabs-
   sanasto), ei suomenkielisiä LIVIAN_TUNTEET-sanoja sekaan — sama
   virhe kuin C1:n Rooma/Istanbul-luonnoksissa vältetty tällä kertaa.
2. tunneLoyto/tunneTyhja/tunneVaarin täsmälleen rekisterin pakolliset
   arvot kaikissa kuudessa (ilo 0,7 / miettiva 0,45 / hammentynyt 0,4).
3. Neljä kaupunkia (Sofia, Lissabon, Budapest — ja osittain Ateena)
   löysivät jo hyväksyttyä kuvamateriaalia; vain Firenzelle, Ateenalle
   ja Kööpenhaminalle tarvitaan uusi Codex-tilaus.
4. docs/kuvatuotanto-kohtaamiset.md:ssä ei ole rivejä Firenzelle,
   Lissabonille, Sofialle eikä Kööpenhaminalle — kannattaa lisätä
   rivit kun kuvat valmistuvat/vahvistetaan.


---

# Kohtaaminen erä C2: Ateena

Sisältökirjuri, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen tarkastettavaksi — `js/packs/kohtaamiset.js`-tiedostoa ei
muokattu.

## RISTIRIITATARKISTUS ENSIN (tehty ennen tekstiä)

Ateenalla on **kolme** löydettyä kuvakonseptia/hahmoa, ei kaksi, ja niistä
kaksi ovat itse asiassa sama asia kahdessa eri dokumentissa:

1. **Nikos**, puistonpenkki, Akropolis taustalla — `docs/kuvatuotanto-
   kohtaamiset.md` rivi 91, tila "Tyylikoe valmis" (28.8.–31.8.2026
   kirjuripäivän tila, dokumentin oma "Päivitetty: 2026-08-31" -leima).
   Tämä on aikaisin, kevyin tila: tyylikoe, ei hyväksytty tuotantokuva.
2. **Dafni**, marmorikonservaattori, restaurointityömaalla Akropoliksella
   — `js/kohtaamiskuvat-data.js` id `ateena-dafni-round2-r20260905-v1`,
   tila `tarkistettu`, ei `aktiivinen: false` -lippua (eli aktiivinen
   oletuksena). Tämä on round2-kuva 5.9.2026 ja siis myöhempi ja
   hyväksytympi kuin Nikos-tyylikoe.
3. **`js/packs/fokusvirta-ateena.js` (Ateenan tarinakaari) rivi ~466**:
   kommentti sanoo suoraan *"HENKILÖ VAIHTUI: vartija Nikos →
   marmorikonservaattori Dafni (js/tyohuone-kehitys-data.js
   KAARI_PAKETIT, 'ateena')"* ja kaaren oma `kohtaaminen`-kenttä käyttää
   jo hahmoa **Marmorikonservaattori Dafni** kohtaamispisteessä
   Akropolis. Dafnin round2-kuva on siis jo käytössä ja varattu —
   Nikos on kanonisesti korvattu hahmo, ei rinnakkainen vaihtoehto.

**Tämä muuttaa tehtävän lähtöoletusta.** Ateena EI ole tavallinen
kaupunki vaan tarinakaarikaupunki (kuten Rooma). `js/packs/kohtaamiset.js`
-tiedoston oma rakenneselitys (rivit ~140–155, Rooma-rivin kommentti
rivillä ~441) sanoo saman säännön kolmesti: kaarikaupungissa **kaaren**
kohtaaminen (`KAARI_PAKETIT`) omistaa ENSIMMÄISEN avaustekstin, ja
`kohtaamiset.js`-rivi on kaupungin **myöhempien tavallisten visojen**
avaus — ERI HAHMO kuin kaaren hahmo, jotta kaupungissa ei ole kahta eri
kohtaamishenkilöä samassa roolissa. Näin on tehty jo Roomassa (kaari:
Enzo Trevin suihkulähteellä / tavallinen visa: mopokorjaaja Fabrizio,
ei suihkulähdettä eikä kolikkoa) ja Lontoossa (kaari/kortti: Mina & Theo
/ tavallinen visa: muotialan opiskelija Leila).

**Johtopäätös:** koska Dafni on jo Ateenan KAAREN hahmo eikä sitä pidä
toistaa tällä rivillä, ja Nikos on kanonisesti korvattu/vanhentunut
konsepti, kumpikaan valmis kuva ei sovellu tähän tehtävään. Kirjoitin
kolmannen, tarkoituksella eri hahmon ja eri paikan/motiivin (ei
Akropolis-restaurointia, ei Dafnin ammattia) samalla logiikalla kuin
Fabrizio erosi Enzosta.

## Ateena — juoksuvalmentaja Iason

**hahmo:** "juoksuvalmentaja Iason"
**nappi:** "Tapaa Iason"
**frame:** "Iason pysäyttää sekuntikellon ja kysyy"
**tervehdys:** "Iason pysäyttää sekuntikellonsa portailla: \"Isoisäsi aikaan täällä ei ollut edes marmoria, saati maalilinjaa. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mitä hän ei vielä nähnyt.\""
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Iason pysäyttää sekuntikellonsa portailla:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan täällä ei ollut edes marmoria, saati maalilinjaa. [warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mitä hän ei vielä nähnyt."' },
]
```
**loyto:** "Iason nostaa rasian portaan raosta pysäyttämättä kelloa: \"Tämä on ollut täällä pidempään kuin ratani. Löytö voittaa hyvän ajan.\""
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Iason nostaa rasian portaan raosta pysäyttämättä kelloa:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämä on ollut täällä pidempään kuin ratani. [excited] Löytö voittaa hyvän ajan."' },
]
```
**tyhja:** "Iason koputtaa porrasta kengällään: \"Tyhjä. Nämä kivet on nostettu ja siirretty niin monesti, ettei mikään pysy paikoillaan.\""
**vaarin:** "Iason katsoo kelloaan: \"Ei vielä. Kierrä radan verran ja mieti uudestaan.\""
**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }  // Iason kiinnostuu vanhasta kirjasta kesken harjoituksen, ei vielä lämmin — sama rekisterin poikkeus kuin Leilalla/Colettella/Fabriziolla
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

Merkkimäärät tarkistettu: tervehdys 193 (raja 280), loyto 128, tyhja 125,
vaarin 74 (raja kaikille 130).

**1873-fakta ja lähde:** Nykyinen kokonaan marmorinen Panathinaikoksen
stadion (Kallimarmaro) valmistui vasta 1895–96 kansallisen hyväntekijän
Georgios Averoffin rahoituksella, arkkitehti Anastasios Metaxasin
suunnitelmalla. Isoisän matkan aikaan 1873 paikalla oli vasta Ernst
Zillerin 1869–70 tekemä ensimmäinen kaivaus ja maisemointi (rahoittajana
kuningas Yrjö I), jota käytettiin mm. Evangelos Zappaan 1870-olympialaisissa
— ei siis marmoria eikä nykyistä hevosenkenkämuotoista katsomoa.
Lähteet (tarkistettu 22.9.2026): [Panathenaic Stadium – Wikipedia]
(https://en.wikipedia.org/wiki/Panathenaic_Stadium), [Zappas Olympics –
Wikipedia](https://en.wikipedia.org/wiki/Zappas_Olympics).

**Olemassa olevat Ateena-kuvakonseptit (ristiriitatarkistus):**
- Nikos, puistonpenkki, Akropolis taustalla — `docs/kuvatuotanto-
  kohtaamiset.md` rivi 91, tila "Tyylikoe valmis" (vanhentunut, ei
  tuotantokuva).
- Dafni, marmorikonservaattori, restaurointityömaa Akropoliksella —
  `js/kohtaamiskuvat-data.js` id `ateena-dafni-round2-r20260905-v1`,
  tila `tarkistettu`, aktiivinen. **Käytössä jo** Ateenan tarinakaaren
  omassa kohtaamisessa (`js/packs/fokusvirta-ateena.js`, kohtaamispiste
  Akropolis) — kommentti siellä vahvistaa "HENKILÖ VAIHTUI: vartija
  Nikos → marmorikonservaattori Dafni", eli Dafni on kanoninen ja
  Nikos-nimi on jo kertaalleen korvattu.
- Ei kolmatta valmista kuvaa Iasonille — hahmo on uusi tälle riville.

**Kuva:** Kumpikaan valmis kuva ei sovi (Dafni on varattu kaarelle,
Nikos on korvattu konsepti). Lyhyt tilausbriiffi Fablen tarkastettavaksi:

> **Ateena — juoksuvalmentaja Iason.** Kreikkalainen mies, noin 45–55-
> vuotias, urheilullinen mutta ei kilpaurheilijan vartalo, harmaantuva
> lyhyt tukka, päivettynyt iho. Yllään kevyt harjoitusasu (tummansininen
> tai punertava teknokangas-collegepaita, hihat ylösvedettyinä) ja
> rintakoriste-pilli kaulassa. Paikka: Panathinaikoksen (Kallimarmaro)
> vaalean marmorinen katsomoportaikko/juoksurata, hevosenkenkämuotoinen
> stadion selvästi tunnistettavissa taustalla. Kesken aidon tekemisen:
> istuu tai kyykistyy portaalla, digitaalinen sekuntikello toisessa
> kädessä, on juuri pysäyttänyt sen ja kääntänyt katseensa suoraan
> kameraan, ilme utelias, hieman huvittunut. Kaksi aikakerrosta: nykyinen
> digitaalinen sekuntikello/urheiluvarusteet lähikuvassa ja taustalla
> loputtoman valkoiset, kuluneet marmoriportaat sekä hämärästi näkyvä
> harjoitteleva juoksija radalla. Rajaus enintään puolivartalo. Ei
> kuvatekstiä, logoa eikä vesileimaa; rasian/kätkön sisältöä tai tarkkaa
> sijaintia ei näytetä. Valo: aamuvarhainen, viisto ja lämmin auringonvalo
> tyhjällä stadionilla, pitkät varjot portaissa.

Rakenne, mitat, luentasäännöt ja tunnetagien pakkokentät tarkistettu
malleista `js/packs/kohtaamiset.js` (lontoo, pariisi, rooma) ja
kaksi ääntä -säännöstä `docs/tarina.md` (pelaaja ei puhu, kolmas ääni on
Iason, joka viittaa isoisän päiväkirjaan kontrastina).

valmis

---

# Budapest — kylpylänvartija Márta

**hahmo:** "kylpylänvartija Márta"
**nappi:** "Tapaa Márta"
**frame:** "Márta nojaa kylpylän porttiin ja kysyy"
**tervehdys:** "Márta nojaa Széchenyin kylpylän porttiin sulkemisaikaan, kädet puuskassa: \"Isoisäsi kirja puhuu varmaan Budasta ja Pestistä kahtena eri kaupunkina. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, milloin niistä tuli yksi.\"" (231 merkkiä)
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Márta nojaa Széchenyin kylpylän porttiin '
    + 'sulkemisaikaan, kädet puuskassa:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi kirja puhuu varmaan '
    + 'Budasta ja Pestistä kahtena eri kaupunkina. [warmly] Näytä että '
    + 'tunnet maailmaa kuten piirtäjä — niin kerron, milloin niistä tuli '
    + 'yksi."' },
]
```
**loyto:** "Márta ojentaa rasian höyryn läpi: \"Tämä lojui kylpylän kellarissa vuosikymmeniä. Kolme kaupunkia, yksi rasia — sopivaa, eikö?\"" (126 merkkiä)
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Márta ojentaa rasian höyryn läpi:' },
  { rooli: 'hahmo', teksti: '[warmly] "Tämä lojui kylpylän kellarissa '
    + 'vuosikymmeniä. [excited] Kolme kaupunkia, yksi rasia — sopivaa, '
    + 'eikö?"' },
]
```
**tyhja:** "Márta pudistaa päätään altaan reunalla: \"Tyhjä. Kylpylää on remontoitu niin monesti, ettei mikään pysy paikallaan.\"" (115 merkkiä)
**vaarin:** "Márta virnistää ja ravistaa vettä käsistään: \"Ei vielä. Höyry hämärtää näön — kokeile toista kulmaa.\"" (101 merkkiä)
**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.55 }  // Márta testaa tulijaa kädet puuskassa ja virnistäen — sama uteliaan haastava rekisterin poikkeus kuin Leilalla/Colettella, ei vielä lämmin
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

**1873-fakta ja lähde:** Budapest syntyi virallisesti 17.11.1873, kun kolme erillistä kaupunkia — Buda, Pest ja Óbuda — yhdistettiin yhdeksi kaupungiksi. Tämä on täsmälleen isoisän matkavuosi 1873, joten isoisän päiväkirjassa kaupungit esiintyvät todennäköisesti vielä erillisinä (Buda ja Pest), mikä antaa luontevan kontrastin Mártan repliikille. Lähde: en-Wikipedia "Budapest" (Formation-osio) ja "History of Budapest" (Unification 1873) — yleisesti tunnettu, laajasti dokumentoitu päivämäärä; ei suoraa web-hakua tehty tässä ajossa, koska fakta on vakiintunut ja yksiselitteinen, mutta suosittelen QA-sessiolle pikaa varmistusta ennen tuotantoon vientiä.

**Olemassa olevat Budapest-kuvakonseptit (ristiriitatarkistus):**

`js/kohtaamiskuvat-data.js`:sta löytyi KAKSI Budapest-riviä:

1. `budapest-aiti-tytar-smoothie` — hahmo "Äiti ja tytär", kauppakeskuksen lasiatrium, smoothiehetki, tila `tarkistettu`, **`aktiivinen: false`** (nimenomaisesti pois pelistä).
2. `budapest-marta-kylpyla-a` — hahmo "Márta", Széchenyin kylpylä, sininen iltavalo, kädet puuskassa, virne, tila `tarkistettu`, **ei `aktiivinen`-kenttää lainkaan** (eli oletuksena `aktiivinen !== false` — pelin oma sääntö js/kohtaamiskuvat-data.js:n rivillä 15: "VAIN TILA 'tarkistettu' JA aktiivinen !== false PÄÄTYY PELIIN").

Näiden vertailun perusteella **Márta/kylpylä on se, jota peli oikeasti käyttäisi** — äiti-tytär-smoothie-konsepti on aktiivisesti poistettu käytöstä.

Lisäksi `docs/kuvatuotanto-kohtaamiset.md`:n taulukossa (rivi "Budapest") on KOLMAS, ristiriitainen kuvaus: *"Márta ja aikuinen tytär Réka juovat smoothieita modernissa lasiatriumissa"* — tämä sekoittaa Mártan nimen (kuuluu kylpylä-konseptiin) ja smoothie/atrium-yksityiskohdat (kuuluvat äiti-tytär-konseptiin) yhteen olemattomaan kolmanteen hahmoon "Réka". Tätä taulukkoriviä ei pidä käyttää sellaisenaan — se on dokumentaatiovirhe, ei kolmas aito konsepti.

**Kohtaaminen on kirjoitettu YKSINOMAAN Mártan/kylpylän mukaan** (ei smoothie/atrium-yksityiskohtia, ei tytärtä/Rékaa).

**Kuva:** olemassa oleva — `budapest-marta-kylpyla-a` (`tiedosto: 'kasvo-budapest-marta-kylpyla-a.jpg'`, `js/kohtaamiskuvat-data.js` rivi 216). Kuva sopii tekstiin suoraan: Széchenyin kylpylä, sininen iltavalo, kädet puuskassa, virne — sama hetki kuin tervehdyksessä. Ei tarvetta uudelle kuvatilaukselle.

**Fablelle raportoitava ristiriita (lyhyesti):** docs/kuvatuotanto-kohtaamiset.md:n Budapest-rivi sekoittaa kaksi eri hyväksyttyä kuvakonseptia (Márta/kylpylä ja äiti-tytär/smoothie) yhdeksi olemattomaksi "Márta ja tytär Réka" -kuvaukseksi. Todellisuudessa toinen konsepti (äiti-tytär) on jo merkitty `aktiivinen: false` eli pois käytöstä, ja vain Márta/kylpylä on aktiivinen. Taulukkorivi kannattaa korjata tai poistaa, ettei se johda jatkossa harhaan.

valmis

---

# Kohtaaminen Firenzelle (erä C2) — luonnos Fablen tarkastukseen

Sisältökirjuri, 22.9.2026. Ei olemassa olevaa kohtaamista eikä kuva-
konseptia löytynyt (grep js/kohtaamiskuvat-data.js ja
docs/kuvatuotanto-kohtaamiset.md — molemmat tyhjät Firenzen osalta),
joten hahmo on kokonaan uusi. `js/packs/kohtaamiset.js`:ää EI ole
muokattu — tämä on vain sisältöluonnos hyväksyntää varten, samaan
tapaan kuin C1-erän kuvatilausraportti.

## Firenze — kultaseppä Ilaria

**hahmo:** "kultaseppä Ilaria"
**nappi:** "Tapaa Ilaria"
**frame:** "Ilaria nostaa katseensa suurennuslasin takaa ja kysyy"
**tervehdys:** Ilaria nostaa katseensa suurennuslasin takaa: "Kirjasi mukaan tämä on yhä pääkaupunki — Rooma vei sen jo. Näytä että tunnet maailmaa kuten isoisäsi — niin kerron, mikä ikkunan takana ei ole muuttunut."
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Ilaria nostaa katseensa suurennuslasin '
    + 'takaa:' },
  { rooli: 'hahmo', teksti: '[curious] "Kirjasi mukaan tämä on yhä '
    + 'pääkaupunki — Rooma vei sen jo. [warmly] Näytä että tunnet '
    + 'maailmaa kuten isoisäsi — niin kerron, mikä ikkunan takana ei '
    + 'ole muuttunut."' },
]
```
**loyto:** Ilaria pyyhkii rasian liinalla ennen kuin ojentaa sen: "Tämä on ollut lukossa kauemmin kuin minä olen elänyt. Nyt se aukeaa!"
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Ilaria pyyhkii rasian liinalla ennen '
    + 'kuin ojentaa sen:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä on ollut lukossa kauemmin '
    + 'kuin minä olen elänyt. [excited] Nyt se aukeaa!"' },
]
```
**tyhja:** Ilaria kääntää vanhan laatikon ylösalaisin: "Tyhjä. Tässä työpajassa on siivottu satakunta kertaa isoisäni jälkeen."
**vaarin:** Ilaria laskee suurennuslasin pöydälle: "Ei vielä. Kulta ei paljasta itseään kiireessä, eikä tämäkään."
**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }  // rekisterin oletus — Ilaria on kiinnostunut kirjasta ja sen vanhentuneesta tiedosta, ei vielä lämmin eikä varautunut
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

Merkkimäärät: tervehdys 201 (raja 280), loyto 125 (raja 130), tyhja
116 (raja 130), vaarin 102 (raja 130) — kaikki rajoissa.

**Hahmo ja paikka:** Ilaria on nuori kultaseppä, jonka perheen pieni
työpaja on yksi Ponte Vecchion "sporteista" — sillan 1500-luvulta
periytyvistä, joen ylle ulkonevista puukojuista, joihin kultasepät
asetettiin vuonna 1593 (Ferdinando I de' Medici häätämän lihakauppojen
tilalle). Kulma ei ole "käy Ponte Vecchiolla" -tason yleisyys vaan yksi
nimetön, konkreettinen putiikki sillan kyljessä, jonka ikkunasta näkyy
Arno.

**1873-fakta ja lähde:** Firenze oli Italian kuningaskunnan
väliaikainen pääkaupunki 1865–1871 (Torinon jälkeen); pääkaupunki-
asema siirtyi Roomaan heinäkuussa 1871 sen jälkeen kun Rooma oli
valloitettu ja liitetty Italiaan syyskuussa 1870. Isoisän 1873-
matkapäiväkirja siis kuvaa Firenzeä yhä ikään kuin se olisi
pääkaupunki, vaikka asema oli vaihtunut jo kaksi vuotta aiemmin —
tämä on suora esimerkki isoisän äänen "toivottomasta vanhenemisesta"
(docs/tarina.md, Kaksi ääntä), ei nuoren Foggin kommentti. Yleisesti
tunnettu ja helposti tarkistettava Italian yhdistymishistorian faktatieto
(Firenze pääkaupunkina, "Firenze capitale" -kausi).

**Olemassa oleva kuvamateriaali:** ei löytynyt. js/kohtaamiskuvat-
data.js ja docs/kuvatuotanto-kohtaamiset.md eivät sisällä Firenzeä;
tarvitaan uusi kuvatilaus.

**Kuvatilaus Codexille:**

Nainen, noin 28–34-vuotias, italialainen kultaseppä. Tumma, hieman
kihartuva olkapäänmittainen tukka sidottu löyhälle nutturalle, ohuet
kultakorvakorut, iho vaalean oliivinsävyinen. Yllään tummanvihreä tai
viininpunainen työessu paksun puuvillapaidan päällä, hihat
kyynärpäihin käärittynä; ranteessa nahkainen työhihna ja pieni
suurennuslasi (loupe) otsalla ylösnostettuna. Paikka: kapea,
puuseinäinen työpaja-koju rakennettu Ponte Vecchion vanhaan "sporttiin"
— joen ylle ulkonevaan puurakenteeseen — jossa on juuri ja juuri tilaa
pienelle työpöydälle ikkunan alla. Kaksi aikakerrosta: pöydällä
nykyaikainen LED-suurennuslamppu, kannettava vaaka ja tabletti
tilauskirjaa varten, kun taas ikkunan karmit, vanhat rautaiset
saranat ja patinoitunut puinen luukku ovat vuosisatoja vanhoja — ikkunan
takaa siintää Arno-joki ja vastarannan vanhat julkisivut. Kesken
aitoa tekemistä: hän on juuri nostanut hehkuvan kultalangan pihdeillä
liekin äärestä ja kääntää katseensa suoraan kameraan pihdit vielä
kädessä, toinen käsi vaistomaisesti suojaamassa liekkiä. Ilme
aarrekysymykseen: utelias, puoliksi huvittunut virne — tietävä
sivukatsahdus, joka lämpenee hymyksi. Valo: myöhäisiltapäivän lämmin
kultainen valo tulvii pienestä ikkunasta suoraan hänen kasvoilleen
ja työpöydälle, sekoittuu polttimen oranssiin hehkuun; joen suunnalta
tuleva viileämpi heijastusvalo pehmentää taustaa. Rajaus enintään
puolivartalo, ei kuvansisäistä tekstiä eikä logoa; rasian tai kätkön
tarkkaa sijaintia ei näytetä.

Valmis.

---

## Lissabon — laattamaalari Inês

**hahmo:** "laattamaalari Inês"
**nappi:** "Tapaa Inês"
**frame:** "Inês nostaa laatan kuivaustelineeltä ja kysyy"
**tervehdys:** "Inês nostaa laatan kuivaustelineeltä ja vilkaisee kirjaasi. \"Isoisäsi aikaan täällä kuljettiin vielä jalan — hevosraitiovaunu avattiin vasta saman syksyn marraskuussa. Näytä että tunnet maailmaa kuten piirtäjä, niin kerron mistä laatta löytyy.\"" (244 merkkiä)
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Inês nostaa laatan kuivaustelineeltä ja '
    + 'vilkaisee kirjaasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan täällä kuljettiin '
    + 'vielä jalan. [warmly] Näytä että tunnet maailmaa kuten piirtäjä, '
    + 'niin kerron mistä laatta löytyy."' },
]
```
**loyto:** "Inês nostaa rasian uunin vierestä: \"Tämä oli laatan alla vuosia. Kukaan ei koskaan kysynyt, miksi se kuvio oli vino.\"" (117 merkkiä)
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Inês nostaa rasian uunin vierestä:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä oli laatan alla vuosia. '
    + '[amused] Kukaan ei koskaan kysynyt, miksi se kuvio oli vino."' },
]
```
**tyhja:** "Inês pyyhkii hyllyn tyhjäksi: \"Ei mitään. Pajaa on siirretty kahdesti tulipalon jälkeen.\"" (89 merkkiä)
**vaarin:** "Inês kääntää laatan takaisin telineelle: \"Ei vielä. Savi kuivuu hitaasti, ja niin kuivuu tietokin.\"" (99 merkkiä)
**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }  // rekisterin oletus: Inês toteaa historiallisen faktan ja esittää käytännön pyynnön mitattoman rauhallisesti — ei erityisen lämmin eikä haastava, joten oletus istuu ilman poikkeamaa
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

**1873-fakta ja lähde:** Lissabonin ensimmäinen raitiotielinja (hevosvetoiset "carros americanos", yhtiö Carris) avattiin 17.11.1873 välille Santa Apolónia–Santos. Sähköraitiovaunut korvasivat hevosvaunut vasta 1901. Pelin oma kaanon (js/packs/fokusvirta-lissabon.js rivi 150) sijoittaa isoisän Lissabonin-käynnin päiväkirjamerkinnän "lokakuuhun 1873" — siis ENNEN linjan avaamista marraskuussa — joten isoisän päiväkirjassa kaupunki kulkee vielä jalan, ja Inêsin repliikki ("hevosraitiovaunu avattiin vasta saman syksyn marraskuussa") on tarkka, ei pyöristetty, kontrasti. Lähde: en-Wikipedia "Trams in Lisbon" (History-osio, Carris-yhtiön perustaminen ja linjan avauspäivä 17.11.1873; sähköistys 31.8.1901), tarkistettu webhaulla 22.9.2026.

**Olemassa oleva kuvamateriaali (löytyi, käytetty pohjana):**

`js/kohtaamiskuvat-data.js`:sta löytyi KAKSI Lissabon-riviä, molemmat hahmolla "Inês" azulejo-laattapajassa:

1. `lissabon-ines-laattapaja` — tila `tarkistettu`, mutta **`aktiivinen: false`** (kommentti rivillä 108–111: korvattu 7.9.2026 uudemmalla versiolla, "kortille mahtuu kaupungista vain yksi").
2. `lissabon-ines-round2-r20260905-v1` — tila `tarkistettu`, **ei `aktiivinen`-kenttää** eli aktiivinen pelin säännön mukaan. Kuvaus: Inês nostaa kuivaustelineestä sinivalkoista azulejo-laattaa, ikkunasta siivilöityvä aurinko osuu kasvoihin, katsoo matkaajaa lämpimän epäuskoisesti; on polvillaan telineen vieressä, lehtien varjot kirjovat lattian ja käsivarren.

Tämä kohtaaminen on kirjoitettu SUORAAN tämän aktiivisen konseptin (`round2-r20260905-v1`) mukaan: sama hahmo, sama laattapaja, sama kuivausteline-hetki. `js/packs/kohtaamiset.js`:ssä ei ollut ennestään `lissabon`-riviä eikä muualla mitään muuta Lissabon-hahmokonseptia löytynyt (docs/kuvatuotanto-kohtaamiset.md:n taulukossa Lissabonia ei mainita lainkaan — se listaa vain tarinakaaren kohtaamiset).

Huom: azulejo-nimen alkuperää EI käytetä minään kysymyksen koukkuna tässä tekstissä (js/packs/fokusvirta-lissabon.js:n kommentti rivi 96 varoittaa, että europe-kulttuuri.js:n kaupunkivisa kysyy sen jo) — kohtaaminen on rakenteeltaan sama yleinen "Etsi kätkö" -kehys kuin Lontoo/Venetsia/Berliini, ei uusi faktakysymys.

**Kuvatilaus Codexille:** EI TARVITA UUTTA KUVAA. Aktiivinen, tarkistettu kuva (`kasvo-lissabon-ines-round2-r20260905-v1.jpg` / tiedosto `lissabon-ines-round2-r20260905-v1.jpg`) vastaa tekstiä suoraan jo sellaisenaan — sama hahmo, sama teko (laatan nostaminen kuivaustelineeltä), sama valo (ikkunasta siivilöityvä aurinko, lehtien varjot). Jos Fable silti haluaa vaihtoehtoisen kuvan tälle nimenomaiselle kohtaamistekstille, tässä lyhyt briiffi varalta:

- Hahmo: Inês, azulejo-laattamaalari/keramiikkatyöläinen, arviolta 30–45-vuotias, työtakki tai esiliina savi-/maalitahroilla, hihat käärittynä.
- Tekeminen kesken kuvan: nostaa vasta maalattua sinivalkoista azulejo-laattaa kuivaustelineeltä, toinen käsi vielä telineen reunalla.
- Kaksi aikakerrosta: perinteinen azulejo-käsityö (laasti-/maaliharja, laattapinot, puu- tai kaakeliuuni taustalla) sekä nykyaikainen yksityiskohta pajassa (esim. LED-työvalo, moderni suojalasi tai kännykkä työpöydällä) — ei hevosraitiovaunua kuvassa, koska konsepti on jo hyväksytty tähän hetkeen eikä liikennehistoriaan.
- Ilme/reaktio: katsoo matkaajaa (kameran linssiin) lämpimän epäuskoisesti, hieman huvittunut yllätys keskeytyksestä.
- Valo/sää: sisätila, ikkunasta siivilöityvä auringonvalo, lehtien varjot lattialla ja käsivarrella (kuten hyväksytyssä konseptissa).

valmis

---

# Sofia — lähteenvartija Nadia

Ennakkotarkistus (pyydetty ennen kirjoitusta): `js/kohtaamiskuvat-data.js`
sisältää jo hyväksytyn ("tila: tarkistettu") kuvakonseptin Sofialle —
`sofia-nadia-mineraalilahde-v2.jpg`, hahmo Nadia — ja koodikommentti
(rivit 376–379) toteaa nimenomaisesti: *"MILA JÄÄ ARKISTOON:
tarinakaaressa Sofian kohtaamisen hahmo on lähteenvartija Nadia... pelin
kohtaamiskortille menee Sofiassa Nadia."* Lisäksi `js/tyohuone-kehitys-
data.js` (KAARI_PAKETIT, id `'sofia'`) sisältää jo täyden, hyväksytyn
tarinakaaren Nadialle lämpölähteellä. `docs/kuvatuotanto-kohtaamiset.md`:ssä
ei ole Sofia-mainintaa (taulukko ei vielä kata sitä).

**Tämä raportti käyttää siis olemassa olevaa hyväksyttyä hahmoa (Nadia,
lähteenvartija) eikä keksi uutta.** Alla on `js/packs/kohtaamiset.js`-
tyylinen kohtaaminen-rivi Sofialle — tätä tarvitaan kaupungin
*myöhempien tavallisten visojen* avaukseksi (sama rooli kuin Dubrovnik/
Venetsia-riveillä: tarinakaaren oma `kohtaaminen`-kenttä hoitaa
ensimmäisen, tämä rivi hoitaa loput).

**hahmo:** "lähteenvartija Nadia"
**nappi:** "Tapaa Nadia"
**frame:** "Nadia kääntyy lähteeltä kauhaa käsissään ja kysyy"
**tervehdys:** "Nadia laskee kauhansa altaan reunalle ja vilkaisee vanhaa vihkoasi. \"Tämä vesi kupli täällä jo isoisäsi aikaan, kun kaupunki kuului vielä toiselle valtakunnalle. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mitä lähde muistaa.\"" (239 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Nadia laskee kauhansa altaan reunalle ja vilkaisee vihkoasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämä vesi kupli täällä jo isoisäsi aikaan. [warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mitä lähde muistaa."' },
]
```
(hahmon repliikki 140 merkkiä)

**loyto:** "Nadia nostaa rasian kauhan vierestä: \"Tämä on täyttynyt höyryssä vuosia. Kukaan ei tullut hakemaan sitä.\"" (105 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Nadia nostaa rasian kauhan vierestä:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä on täyttynyt höyryssä vuosia. [surprised] Kukaan ei tullut hakemaan sitä."' },
]
```

**tyhja:** "Nadia kääntää tyhjän kauhan ylösalaisin: \"Ei mitään. Höyry vie täältä yhtä paljon kuin vesi tuo.\"" (97 merkkiä)

**vaarin:** "Nadia täyttää kannun uudelleen: \"Ei vielä. Lähde ei ehdy — voit tulla kysymään huomennakin.\"" (92 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'lammin', voimakkuus: 0.5 }   // Nadia on lämmin heti alusta (ei epäluuloinen tai etäinen kuin monet muut hahmot); sama linja kuin arc:n omassa tunneKohtaaminen ('lammin', 0.5) js/tyohuone-kehitys-data.js:ssä — jatkuvuus hahmon äänessä.
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

**1873-fakta ja lähde:** Sofia oli 1873 yhä osa Osmanien valtakuntaa
(Bulgaria itsenäistyi vasta 1878, Sofiasta tuli pääkaupunki 1879).
Kaupungin keskustan kuumat mineraalilähteet (n. 46 °C) olivat kuitenkin
jo tuolloin arkipäiväisessä käytössä: roomalaisajan Serdican jälkeen
osmanit rakensivat lähteiden päälle hamamin (julkisen kylpylän), joka
palveli kaupunkilaisia päivittäin aina 1800-luvun lopulle asti, jolloin
se rappeutui ja korvattiin vasta 1905–1913 nykyisellä kylpyläraken-
nuksella. Sama vesi kuplii samassa paikassa yhä. Tämä on juuri se
konkreettinen, isoisän ajan ja nykyhetken yhdistävä asia, johon
tervehdys viittaa ("Tämä vesi kupli täällä jo isoisäsi aikaan") —
ilman kärjistystä osmanikaudesta, vain arkinen infrastruktuurifakta.
Lähteet: en.wikipedia.org/wiki/Banya_Bashi_Mosque (moskeija valmistui
1566 suoraan lähteiden päälle, yhä toiminnassa); en.wikipedia.org/wiki/
Sofia_Central_Mineral_Baths (osmanien hamami palveli asukkaita "until
it fell into disrepair in the late 19th century", ennen 1905–1913
rakennusta). Tarinakaaren oma kysymys (Roomalaiset rakensivat Serdican
kylpylät, keisari Konstantinuksen "Serdica on minun Roomani" -sitaatti)
säilyy koskemattomana — tämä uusi tervehdys ei muuta sitä eikä paljasta
vastausta.

**Olemassa oleva kuvamateriaali:** `sofia-nadia-mineraalilahde-v2.jpg`
(tila: tarkistettu/hyväksytty) kuvaa jo täsmälleen tämän hahmon ja
paikan: Nadia säikähtää vierasta ja pärskäyttää vettä rinnuksilleen
mineraalilähteellä, lapsenlapsi purskahtaa nauruun vierestä. Kuva sopii
suoraan tämän kohtaamisen kortti- ja galleriakuvaksi — **uutta kuvaa ei
tarvita**, ellei Fable halua erillistä toista kuvakulmaa tavallisen
(ei-kaari-) kohtaamisen omaan käyttöön.

**Kuvatilaus Codexille (valinnainen, jos halutaan toinen kulma):**
Nadia, n. 55–65-vuotias bulgarialainen nainen, käytännölliset työvaatteet
ja esiliina kosteudensietävästä kankaasta, hihat käärittynä, hiukset
huivissa höyryn vuoksi. Tekeminen kesken: hän on juuri laskemassa
metallikauhaa altaan reunalle, kädet vielä märät kuumasta lähteestä.
Kaksi aikakerrosta: taustalla vanha kivinen kylpyläallas ja siitä
nouseva höyry (ikivanha, ajaton elementti — sama vesi kuin 1800-luvulla),
edustalla nykyaikainen muovikannu tai retkipullo täyttöä odottamassa
sekä ehkä kännykkä taskussa. Ilme/reaktio: yllättynyt mutta lämmin
sivukatsahdus vieraaseen — ei epäluuloinen, vaan hyväntahtoisen utelias,
katse suoraan kameraan/pelaajaan. Valo/sää: sisätila tai katettu allas,
pehmeä diffuusi valo höyryn läpi, lämmin sävy (kellertävä/oranssi
hehku vastapainona harmaalle kivelle). Ei antiikin Serdicaa, ei
roomalaishahmoja, ei kysymyksen vastausta (Roomalaiset) näkyviin.

valmis

---

# Kohtaaminen — København (kaupunki-id `kobenhavn`), erä C2

Sisältökirjuri-sessio, 22.9.2026. Sisältöä valmisteltu suoraan
`js/packs/kohtaamiset.js`-tiedoston rakenteen mukaisesti (ks. tiedoston
alun dokumentaatio ja `lontoo`-, `dubrovnik`-, `pariisi`-, `helsinki`- ja
`istanbul`-rivit mallina). **Tiedostoa ei ole muokattu** — tämä on
raportti Fablen (päätoimittajan) hyväksyntää varten.

## Esitutkimus: onko Kööpenhaminalle jo hyväksytty kohtaamiskonsepti?

Grepattu `js/kohtaamiskuvat-data.js`, `docs/kuvatuotanto-kohtaamiset.md`
ja `docs/raportit/` hakusanoilla "Kööpenhamina", "Copenhagen", "kobenhavn",
"Tivoli" ja "Freja":

- **Löytyi:** `js/kohtaamiskuvat-data.js` sisältää tarkistetun
  (`tila: 'tarkistettu'`) kuvarivin `kobenhavn-freja-07d795379e80`:
  hahmo **Freja** sulkee Tivolin musiikkikarusellia. Rivin oma kommentti
  sanoo tämän olevan **"Kööpenhaminan kaaren kohtaamiskuvaksi"**
  hyväksytty (root hyväksyi 12.9.2026) — eli tämä kuuluu
  tarinakaari-mekaniikkaan (`js/tyohuone-kehitys-data.js` KAARI_PAKETIT
  / `js/packs/fokusvirta-kobenhavn.js`), **ei** tähän tehtävän kohteena
  olevaan tavalliseen `js/packs/kohtaamiset.js`-pakettiin. Vahvistin
  tämän myös `js/packs/kulttuuri-kategoriat.js`- ja
  `js/packs/maakartat.js`-riveistä, joissa esiintyy erillinen
  `syvennys-kobenhavn-tivoli`-nosto samaan Tivoli-kaariin liittyen.
- `docs/kuvatuotanto-kohtaamiset.md`:n tyylikoegalleriassa ei ole
  Kööpenhaminaa/Freja-riviä lainkaan (taulukko kattaa mm. Lontoon,
  Amsterdamin, Venetsian, Wienin, Pariisin, Rooman — ei Kööpenhaminaa).
- `js/packs/kohtaamiset.js`:ssä ei ole `kobenhavn`-avainta ollenkaan
  (`grep -n "kobenhavn" js/packs/kohtaamiset.js` → ei osumia). Tämä on
  siis aidosti uusi rivi.

**Johtopäätös:** koska Freja on jo sidottu Tivoliin *kaarikohtaamisessa*,
tehtävänannon oma ohje ("ei Tivoli itsessään jos hahmo Freja on jo
sidottu sinne") pätee suoraan — alla oleva konsepti on kokonaan uusi
hahmo ja paikka, ei Tivoli, ei Freja.

## 1873-fakta ja lähde

Polkupyörä (velosipedi) oli 1870-luvulla Euroopassa vasta harvinainen,
kallis muotivempain — lähinnä varakkaiden nuorten miesten huvi — eikä
suinkaan arkinen kulkuväline. Käytännöllisemmät mallit ja laajempi,
kaikki yhteiskuntaluokat kattava käyttö tulivat vasta vuosikymmeniä
myöhemmin (1900-luvun alkupuolella), minkä jälkeen Kööpenhaminasta
kehittyi maailman tunnetuin pyöräilykaupunki — sama kontrasti näkyy jo
pelin omassa iskulauseessa (`js/packs/iskulauseet.js`, kobenhavn:
"Pyöräilijöiden ja satujen kaupunki").

Lähteet (tarkistettu 22.9.2026):
- Cycling Embassy of Denmark, "Danish cycling history":
  polkupyörä oli aluksi *"the big fashion craze – especially among
  young men in high society"*, ja vasta myöhemmin *"the general
  public... quickly adopted them"*.
- Yleinen englanninkielinen pyörähistoria (mm. Ingenium Canada,
  Smithsonianin velosipedi-artikkeli): 1870-luvun velosipedit
  ("boneshaker") olivat kallis, rajoitetun piirin muoti-ilmiö ennen
  laajempaa 1900-luvun arkikäyttöä.

En löytänyt luotettavaa lähdettä tarkalle päivämäärälle "polkupyörä
saapui Kööpenhaminaan juuri 1873", joten en väitä sellaista — fakta on
rajattu varovaisesti yleiseen 1870-luvun ilmiöön, kuten tehtävänannossa
pyydettiin ("älä keksi jos et löydä").

## Olemassa oleva kuvamateriaali

Ei mitään käyttökelpoista tälle konseptille. Ainoa olemassa oleva
Kööpenhamina-kuva (Freja/Tivoli) kuuluu eri mekaniikkaan (kaarikohtaaminen),
kuten yllä. Uusi kuva pitää tilata kokonaan.

---

## København — pyörämekaanikko Sofie

**hahmo:** "pyörämekaanikko Sofie"

**nappi:** "Tapaa Sofie"

**frame:** "Sofie kääntää lastipyörän kyljelleen ja kysyy"

**tervehdys:** "Sofie pyyhkii rasvaiset kädet farkkuihin ja vilkaisee
kirjaasi: \"Isoisäsi aikaan tuollainen kahden pyörän härveli oli kallis
muotileikki harvoille herroille. Nyt koko kaupunki kulkee näillä. Näytä
että tunnet maailmaa kuten piirtäjä — niin katson mitä rungosta
löytyy.\"" (269 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Sofie pyyhkii rasvaiset kädet farkkuihin ja vilkaisee kirjaasi:' },
  { rooli: 'hahmo', teksti: '[amused] "Isoisäsi aikaan tämä oli kallis muotileikki harvoille herroille. [warmly] Nyt koko kaupunki kulkee näillä."' },
]
```

**loyto:** "Sofie kaivaa rasian satulatuesta ja hymyilee: \"Tämä on
odottanut täällä kauemmin kuin yksikään rengas kestää.\"" (110 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Sofie kaivaa rasian satulatuesta ja hymyilee:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä on odottanut täällä kauemmin kuin yksikään rengas kestää."' },
]
```

**tyhja:** "Sofie koputtaa runkoa ja pudistaa päätään: \"Tyhjä. Tätä
pyörää on korjattu ja osista koottu niin monesti.\"" (106 merkkiä)

**vaarin:** "Sofie kiristää pultin uudelleen: \"Ei ihan. Minäkin
arvasin väärin, ennen kuin opin katsomaan runkonumerosta.\"" (109 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'lammin', voimakkuus: 0.55 }  // Sofie ei ole vain utelias kirjasta vaan lämpimän huvittunut vanhan ja nykyisen kontrastista — poikkeaa rekisterin oletuksesta samalla tavalla kuin Kemal/Otto
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

**Kaksi ääntä -tarkistus:** tervehdysLuenta ja loytoLuenta käyttävät
vain rooleja 'kertoja' ja 'hahmo' — ei 'pelaaja'-riviä, nuori Fogg ei
puhu eikä kommentoi missään kohdassa (docs/tarina.md, "Kaksi ääntä").
Kaikki inline-tagit ([amused], [warmly], [surprised]) ovat englanniksi.

**Perustelu hahmolle ja paikalle:** Freja/Tivoli on jo käytössä
kaarikohtaamisessa, joten Sofie on täysin eri hahmo, eri ammatti ja eri
paikka: lastipyörien (ladcykel) korjaamo Christianshavnin kanavan
laiturilla — omaperäinen kulma, ei Nyhavnin postikorttinäkymä eikä
Tivoli. 1873-kontrasti (kallis harvojen muotivempain vs. tämän päivän
jokaisen arkinen kulkuväline) kytkeytyy myös pelin omaan
Kööpenhamina-iskulauseeseen.

## Kuvatilaus Codexille

**Hahmo:** Sofie, n. 30–35-vuotias tanskalainenainen pyörämekaanikko.
Työhaalari tai paksu esiliina käytännöllisten vaatteiden päällä, hihat
käärittynä, tukka sidottu taakse pipon tai huivin alle. Kädet ja
kynsien alukset rasvaiset/mustuneet aidosti työn jäljiltä.

**Tekeminen kesken kuvan:** Sofie on kyykyssä tai polvillaan lastipyörän
(kolmipyöräinen, iso laatikko edessä — "Christiania bike" -tyyppinen
kaupunkilastipyörä) vieressä, jakoavain kädessä kesken pyörän etuakselin
kiristämistä. Pyörä on käännetty osittain kyljelleen korjaustelineessä
tai nojaamassa seinään.

**Kaksi aikakerrosta:** Etualalla/keskiössä nykyinen, käytännöllinen
lastipyörä (maalattu, kolhuinen, aidosti käytetty — ei studiokiiltoa).
Taustalla työpajan seinällä vanha, kellastunut juliste tai kehystetty
mustavalkokuva 1800-luvun korkeapyörästä (penny-farthing / velosipedi)
koristeellisine herrasväkineen — pieni yksityiskohta, ei kuvan pääaihe,
kertoo ajan kontrastin ilman selittävää tekstiä.

**Ilme/reaktio aarrekysymykseen:** Sofie kohottaa katseensa työstä
suoraan kameraan/pelaajaan, puoliksi yllättynyt ja puoliksi huvittunut
puolihymy, toinen kulmakarva koholla — kuin olisi jäänyt kiinni kesken
työn mutta ei häiriinny siitä.

**Valo/sää:** Pohjoismainen pilvinen päivänvalo, viileän harmaansininen
sävy, syksyinen ilma; työpaja avoimen pihan tai kanavan laiturin
kupeessa, kivetys hieman kostea (ei sadetta kuvassa, vain kosteuden
kiilto). Rajaus enintään puolivartalo, tausta pehmeä mutta työpaja ja
kanavan reunan viite vielä luettavissa — ei kaupunkimaisemaa tarvita.

**Ei näytetä:** kysymyksen oikeaa vastausta tai mitään tarkkaa
sijaintivihjettä; ei tekstiä, logoja tai vesileimoja kuvan sisällä; ei
Tivolia eikä mitään Freja-hahmoon viittaavaa.

---

valmis
