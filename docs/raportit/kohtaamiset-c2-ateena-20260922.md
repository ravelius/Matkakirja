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
