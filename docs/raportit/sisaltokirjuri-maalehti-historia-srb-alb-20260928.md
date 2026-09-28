# Maalehti: Historia-aihe — Serbia (SRB) ja Albania (ALB)

*(Sisältökirjuri, 28.9.2026. Fablen tilaus: SRB/ALB/MKD/MNE/MDA/BLR puuttuvat
kokonaan `js/packs/maa-kategoriat.js`:stä, vaikka ääriviivat ovat jo kartalla
[VAIN EUROOPPA]. Tämä raportti kattaa SRB:n ja ALB:n; MKD/MNE/MDA/BLR tehdään
muissa agenteissa. Malli: MLT:n `historia`-aihe, rivit ~1622–1738. Skeema ja
ohjeet: docs/moduulit/maalehti.md kohdat 2, 2b ja 3.)*

## Huomio skeemasta: `tehtava` on aiheen, ei yksittäisen noston kenttä

Tarkistin MLT:n ja koko `maa-kategoriat.js`:n käytännön (`grep -c "tehtava:"`
→ 39 osumaa, kaikki `nostot`-taulukon SULKEVAN `]`:n jälkeen, samalla
sisennystasolla kuin `nimi:`/`nostot:`). `tehtava` on siis aina **aiheen**
kenttä, ei minkään yksittäisen noston sisällä oleva kenttä — vaikka sen
kysymyksen vastaus tuleekin yhden tietyn noston tekstistä. Olen noudattanut
tätä oikeaa, koodikannassa vallitsevaa muotoa (ei tehtävänannon kirjaimellista
`nostot: [ {..., tehtava?} ]` -kuvausta), koska Raamatun periaatteen mukaan
toteutunut koodi/malli on tässä täsmällisempi ohje kuin tiivistetty kuvaus.

## Kuvien tarkistus — kaikki 8 kuvaa katsottu silmin (480 px thumb)

Kolme kuvaa vaihdettiin ensimmäisen haun jälkeen, koska thumb paljasti
huonon osuman:
- **SRB Petrovaradin**: `Clock_tower_at_Petrovaradin_Fortress_1.jpg` (jo
  pelissä maakuntakortilla) näytti vain tornin sivun ilman kellotaulua →
  vaihdettu tiedostoon `..._2.jpg`, jossa molemmat päinvastaiset kellotaulut
  näkyvät selvästi.
- **SRB Studenica**: `Studenica_monastery,_01.jpg` osoittautui kuvaksi
  vanhoista hautakivistä muurin vieressä, ei kirkosta → vaihdettu
  `Manastir Studenica, Bogorodičina crkva.jpg`:hen (valkomarmorinen
  Neitsyt Marian kirkko, juuri oikea aihe).
- **ALB Vlorë**: `Independence_Monument,_Vlorë.jpg` (jo pelissä
  maakuntakortilla) oli hämärä ilta/yökuva, jossa patsasryhmän jalustassa
  näkyy graffitia → vaihdettu päiväkuvaan `Monumenti i Pavarësisë.jpg`
  (sama monumentti, siisti, kirkas taivas, ei graffitia).

Kaikki lopulliset 8 kuvaa on nyt katsottu ja hyväksytty: ei väripalkkeja,
vesileimoja eikä kollaaseja; kaikki ≥1200 px; kaikki PD/CC0/CC BY/CC BY-SA.

---

## SRB

```js
SRB: [
  {
    id: 'historia',
    nimi: 'Historia',
    johdanto: 'Serbian historia kulkee luostarin valkoisesta marmorista '
      + 'linnoituksen väärinpäin käyvään kelloon ja lopulta pimeään '
      + 'museohuoneeseen, jossa loistaa kultainen pallo. Neljä pysähdystä '
      + 'näyttävät, miten keskiajan kuningaskunta, Habsburgien '
      + 'raja-linnoitus ja nykyaikaisen tieteen sankari kietoutuvat samaan '
      + 'tarinaan Tonavan rannalla.',
    nostot: [
      {
        otsikko: 'Linnoitus, joka pelastui mutta ei pelastanut',
        aika: '1456–1459',
        tiedosto: 'Sava and Danube in Belgrade, view from Kalemegdan Park at the Victor statue.jpg',
        teksti: 'Heinäkuussa 1456 sulttaani Mehmed II piiritti '
          + 'Nándorfehérvárin linnoitusta, nykyistä Belgradia. Serbian '
          + 'despootti Đurađ Branković, 79-vuotias, saattoi vain katsoa '
          + 'vierestä: hänen oma 9 000 miehen armeijansa oli murskattu '
          + 'lähistöllä jo kolme viikkoa aiemmin, 18. kesäkuuta. '
          + 'Piirityksen mursivat lopulta János Hunyadin joukot ja '
          + 'talonpoikaisristiretkeläiset 22. heinäkuuta. Branković kuoli '
          + 'joulukuussa samana vuonna omassa Smederevon linnassaan. '
          + 'Voitto jäi lyhytaikaiseksi: kolme vuotta myöhemmin, 1459, '
          + 'Smederevo itse – Serbian viimeinen pääkaupunki – antautui '
          + 'sulttaanille, ja maa katosi kartalta vuosisadoiksi.',
        lyhyt: 'Belgradin Kalemegdan-linnoitus, jonka juurella Sava laskee '
          + 'Tonavaan – ottomaanien piirityksen 1456 näyttämö.',
        selite: 'Näkymä Kalemegdanin puistosta Voittajan patsaan luota '
          + 'Savan ja Tonavan yhtymäkohtaan. Linnoitus oli 1456 Unkarin '
          + 'hallussa, ei Serbian.',
        lahde: 'Radosław Botev, Wikimedia Commons (CC BY 3.0 pl)',
        wiki: 'Siege of Belgrade (1456)',
      },
      {
        otsikko: 'Kello, joka käy väärinpäin',
        aika: '1692–1780',
        tiedosto: 'Clock tower at Petrovaradin Fortress 2.jpg',
        teksti: 'Kun Habsburgit valtasivat Petrovaradinin osmaneilta, '
          + 'keisari Leopold I käski 1692 rakentaa vanhan linnoituksen '
          + 'tilalle täysin uuden. Työmaa venyi 88 vuoteen ja viiden '
          + 'hallitsijan ajalle, ja suunnittelun uskotaan nojanneen '
          + 'ranskalaisen Vaubanin tähtimalliin. Tuloksena oli niin vahva '
          + 'pesäke, että sitä alettiin kutsua Tonavan Gibraltariksi. '
          + 'Linnoituksen kellotornissa iso viisari näyttää tunnit ja '
          + 'pieni minuutit, päinvastoin kuin tavallisesti – näin kaukaa '
          + 'joelta tulevat laivurit erottivat kellonajan helpommin. '
          + 'Lämpötilaherkkä koneisto käy kesällä edellä ja talvella '
          + 'jäljessä, minkä vuoksi paikalliset kutsuvat sitä '
          + 'Humalaiseksi kelloksi.',
        lyhyt: 'Petrovaradinin linnoituksen kellotorni Novi Sadissa, '
          + 'jonka iso viisari näyttää tunnit.',
        selite: 'Petrovaradinin kellotornin kaksi kellotaulua läheltä. '
          + 'Tornin nykyinen koneisto on 1700-luvun puolivälistä.',
        lahde: 'Miluša Snidová, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Petrovaradin Fortress',
      },
      {
        otsikko: 'Kuningas, josta tuli munkki',
        aika: '1190–1196',
        tiedosto: 'Manastir Studenica, Bogorodičina crkva.jpg',
        teksti: 'Stefan Nemanja yhdisti Serbian pirstoutuneet '
          + 'ruhtinaskunnat ja perusti Nemanjić-suvun, joka hallitsi '
          + 'maata yli kaksisataa vuotta. Hän aloitti Studenican '
          + 'luostarin rakentamisen 1180-luvulla ja pystytti sen '
          + 'sydämeen valkoisesta marmorista Neitsyt Marian kirkon. '
          + 'Maaliskuun 25. päivänä 1196 hän luopui vallasta poikansa '
          + 'Stefanin hyväksi ja otti munkiksi vihkimisessä nimen '
          + 'Simeon. Syksyllä 1197 hän matkasi Athos-vuorelle '
          + 'liittyäkseen sinne jo aiemmin lähteneeseen nuorimpaan '
          + 'poikaansa Rastkoon, josta tuli myöhemmin pyhä Sava, Serbian '
          + 'ortodoksisen kirkon perustaja. Studenica on Unescon '
          + 'maailmanperintöä vuodesta 1986.',
        lyhyt: 'Studenican luostarin Neitsyt Marian kirkko, jonka '
          + 'perusti kuningas Stefan Nemanja.',
        selite: 'Studenican luostarin valkomarmorinen Neitsyt Marian '
          + 'kirkko Kraljevon lähellä. Nemanjić-suvun hallitsijoita on '
          + 'haudattu Serbian keskiaikaisiin luostareihin.',
        lahde: 'BrankaVV, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Studenica Monastery',
      },
      {
        otsikko: 'Kultapallo pimeässä huoneessa',
        aika: '1943–1957',
        tiedosto: 'Urn with Teslas ashes.jpg',
        teksti: 'Nikola Tesla kuoli yksin hotellihuoneessaan New '
          + 'Yorkissa 7. tammikuuta 1943, 86-vuotiaana ja käytännössä '
          + 'varattomana. Ruumis tuhkattiin, mutta uurna jäi '
          + 'vuosikymmeniksi Yhdysvaltoihin, kunnes se tuotiin '
          + 'Belgradiin vuonna 1957. Kuvanveistäjä Nebojša Mitrić '
          + 'suunnitteli tuhkille kultapinnoitetun pallon, sillä pallo '
          + 'oli Tesla itse nimennyt täydellisimmäksi geometriseksi '
          + 'muodoksi. Pallo lepää marmorijalustalla pimennetyssä '
          + 'huoneessa Nikola Tesla -museossa, ja se on museon käydyin '
          + 'kohde. Serbiaan syntynyt, Yhdysvaltoihin muuttanut keksijä '
          + 'palasi lopulta kotimaahansa – tosin vasta pallon muodossa, '
          + 'museon perustamisvuonna 1957.',
        lyhyt: 'Nikola Teslan tuhkaa säilyttävä kultapinnoitettu pallo '
          + 'Belgradin Tesla-museossa.',
        selite: 'Kuvanveistäjä Nebojša Mitrićin suunnittelema urna '
          + 'lepää marmorijalustalla pimennetyssä huoneessa.',
        lahde: 'Vasenka, Wikimedia Commons (CC BY 2.0)',
        wiki: 'Nikola Tesla Museum',
      },
    ],
    tehtava: {
      kysymys: 'Miksi Petrovaradinin kellotornin iso viisari näyttää '
        + 'tunnit eikä minuutteja?',
      vaihtoehdot: [
        'Kellorakentaja teki virheen',
        'Jotta joen laivurit erottivat ajan kaukaa',
        'Kello on peräisin toisesta tornista',
        'Se on vain koriste eikä oikeasti käy',
      ],
      oikea: 1,
      fakta: 'Petrovaradinin linnoituksen kellotornissa iso viisari '
        + 'näyttää tunnit ja pieni viisari minuutit, jotta Tonavalla '
        + 'kulkevat laivurit erottaisivat kellonajan kaukaa.',
    },
  },
],
```

### SRB — kuvat tarkistettavaksi (Commons-URL + huomiot)

1. **Belgradin piiritys / Kalemegdan** —
   https://commons.wikimedia.org/wiki/File:Sava_and_Danube_in_Belgrade,_view_from_Kalemegdan_Park_at_the_Victor_statue.jpg
   (4000×3000, CC BY 3.0 pl, Radosław Botev). Jo käytössä pelissä SRB:n
   `Grad Beograd` -maakuntakortilla — sama kuva, eri konteksti (maalehden
   historia-aihe vs. maakuntakortti), joten ei ole sama "kaupunki" tässä
   mielessä, mutta merkitsen toistokäytön näkyviin integroijalle.
2. **Petrovaradinin kellotorni** —
   https://commons.wikimedia.org/wiki/File:Clock_tower_at_Petrovaradin_Fortress_2.jpg
   (6193×4129, CC BY-SA 4.0, Miluša Snidová). HUOM: eri tiedosto kuin
   pelissä jo oleva `..._1.jpg` (Južno-Backi-maakuntakortti) — valittu
   tarkoituksella, koska tämä versio näyttää kellotaulun selvästi.
3. **Studenican luostari, Neitsyt Marian kirkko** —
   https://commons.wikimedia.org/wiki/File:Manastir_Studenica,_Bogorodičina_crkva.jpg
   (5184×3456, CC BY-SA 4.0, BrankaVV). Eri tiedosto kuin pelissä jo oleva
   Raški-maakuntakortin `Studenica_monastery,_01.jpg` (joka kuvaa
   hautakiviä, ei kirkkoa).
4. **Tesla-museon kultapallo** —
   https://commons.wikimedia.org/wiki/File:Urn_with_Teslas_ashes.jpg
   (3456×2592, CC BY 2.0, Vasenka/Flickr, Commonsiin peilattu). Uusi kuva.

---

## ALB

```js
ALB: [
  {
    id: 'historia',
    nimi: 'Historia',
    johdanto: 'Albanian historia on kerrottu vuoristossa: antiikin '
      + 'kaupunki, jonka suot lopulta nielaisivat, tuhannen ikkunan '
      + 'kaupunki vuoren rinteellä, linna jota sulttaanikaan ei saanut '
      + 'valloitettua, ja parveke, jolta nostettu lippu teki maasta '
      + 'itsenäisen. Neljä pysähdystä kattavat yli kaksi vuosituhatta '
      + 'yhden pienen maan tarinaa.',
    nostot: [
      {
        otsikko: 'Yön yli syntynyt lippu',
        aika: '28.11.1912',
        tiedosto: 'Monumenti i Pavarësisë.jpg',
        teksti: 'Marraskuun 28. päivänä 1912 kokoontui Vlorëen 83 '
          + 'edustajaa eri puolilta Albaniaa ja julisti maan '
          + 'itsenäiseksi Osmanien valtakunnasta. Sen jälkeen johtaja '
          + 'Ismail Qemali astui vuokra-asuntonsa parvekkeelle ja nosti '
          + 'punaisen lipun, jossa oli Skanderbegin musta kaksipäinen '
          + 'kotka – symboli oli ollut osmanivallan aikana kiellettyä. '
          + 'Lipun ompelijaksi muistetaan paikallinen aktivisti Marigo '
          + 'Posio, jota kutsutaan yhä Albanian lipun äidiksi; hän teki '
          + 'omalla kustannuksellaan useita kopioita uusille '
          + 'virastoille. Qemalista tuli itsenäisen Albanian '
          + 'ensimmäinen pääministeri, mutta rajat vahvistuivat vasta '
          + 'seuraavana vuonna Lontoon suurvaltaneuvottelussa.',
        lyhyt: 'Vlorën itsenäisyysmonumentti, joka muistuttaa 28. '
          + 'marraskuuta 1912 julistetusta itsenäisyydestä.',
        selite: 'Monumentti kuvaa itsenäisyysjulistuksen allekirjoittajia '
          + 'ja pystytettiin Vlorëen vuosikymmeniä tapahtuman jälkeen.',
        lahde: 'Arianit, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Albanian Declaration of Independence',
      },
      {
        otsikko: 'Valkoinen kaupunki tuhannella ikkunalla',
        aika: '314 eaa. – 2008',
        tiedosto: 'The old town of Berat 2019.jpg',
        teksti: 'Makedonialainen kenraali Kassandros perusti kaupungin '
          + 'nimellä Antipatreia vuonna 314 eaa. isänsä Antipatroksen '
          + 'kunniaksi, vanhan illyrialaisasutuksen paikalle. Bysantin '
          + 'aikaan se tunnettiin nimellä Pulcheriopolis, ja keskiajan '
          + 'slaavilainen nimi Beligrad – Valkoinen kaupunki – kuvasi '
          + 'jo silloin sen valkoisia taloja. Osmanit valtasivat '
          + 'kaupungin 1417. Nykyisin Osum-joen kahta rantaa '
          + 'reunustavat Mangalemin ja Gorican korttelit, joiden '
          + 'rinteille kiipeävissä taloissa on niin paljon ikkunoita, '
          + 'että albaanit kutsuvat kaupunkia tuhannen ikkunan '
          + 'kaupungiksi. Unesco liitti Beratin '
          + 'maailmanperintöluetteloon 2008 yhdessä Gjirokastërin '
          + 'kanssa.',
        lyhyt: 'Beratin vanhakaupunki, jonka valkoiset talot kiipeävät '
          + 'rinnettä ikkunarivi toisensa perään.',
        selite: 'Näkymä Beratin Mangalemin korttelin ylle Kalaja-'
          + 'linnanmäeltä. Kaupunki on ollut Unescon maailmanperintöä '
          + 'vuodesta 2008.',
        lahde: 'Michel NOCTURE, Wikimedia Commons (CC BY-SA 2.0)',
        wiki: 'Berat',
      },
      {
        otsikko: 'Kaupunki, jonka suot nielaisivat',
        aika: '600-luku eaa. – 1928',
        tiedosto: 'Butrint, Theater.jpg',
        teksti: 'Korkyran (nykyisen Korfun) kreikkalaiset perustivat '
          + 'Butrintiin kauppa-asutuksen viimeistään 600-luvulla eaa., '
          + 'ja siitä kasvoi vaurastuva Rooman-kauden kaupunki, jolla '
          + 'oli oma teatteri, kylpylät ja vesijohto. Bysantin aikana '
          + 'kaupungista tuli piispanistuin, ja lyhyen '
          + 'venetsialaiskauden jälkeen ympäristö alkoi soistua. '
          + 'Keskiajan lopulla Butrint hylättiin kokonaan, ja raunioita '
          + 'peitti vuosisatojen ajan malariasuo. Italialainen '
          + 'arkeologi Luigi Maria Ugolini alkoi kaivaa kaupunkia esiin '
          + '1928, ja työ paljasti kerroksia kreikkalaisesta, '
          + 'roomalaisesta ja bysanttilaisesta ajasta päällekkäin. '
          + 'Unesco liitti Butrintin maailmanperintöluetteloon 1992.',
        lyhyt: 'Butrintin antiikin teatteri, kreikkalaisen ja '
          + 'roomalaisen kaupungin jäänne Etelä-Albaniassa.',
        selite: 'Butrintin hyvin säilynyt kreikkalainen teatteri. '
          + 'Kaupunki hylättiin keskiajalla soistumisen vuoksi ja '
          + 'kaivettiin esiin vasta 1920-luvulla.',
        lahde: 'Cosal, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Butrint',
      },
      {
        otsikko: 'Linna, jota sulttaani ei saanut',
        aika: '1450',
        tiedosto: 'Krujë castle during sunset.jpg',
        teksti: 'Marraskuussa 1443 Gjergj Kastrioti eli Skanderbeg '
          + 'karkasi osmanien armeijasta kesken sotaretken, ratsasti '
          + 'Krujëhun väärennetyillä asiakirjoilla ja otti linnan '
          + 'haltuunsa juonella. Hän luopui islamista, palasi '
          + 'kristityksi ja aloitti 25 vuotta kestäneen kapinan. '
          + 'Toukokuussa 1450 sulttaani Murad II saapui linnan juurelle '
          + 'noin 100 000 sotilaan – niistä 60 000 ratsuväkeä – '
          + 'kanssa, mukanaan nuori poikansa, tuleva Mehmed II. '
          + 'Piiritys kesti lokakuuhun asti, yli viisi kuukautta. '
          + 'Ottomaanit menettivät noin 20 000 miestä ja albaanit yli '
          + 'tuhat, ennen kuin sulttaani luovutti ja vetäytyi '
          + 'Edirneen. Krujë pysyi valloittamattomana koko Skanderbegin '
          + 'elinajan.',
        lyhyt: 'Krujën linna, Skanderbegin tukikohta 25 vuotta '
          + 'kestäneessä kapinassa osmaneja vastaan.',
        selite: 'Krujën linna auringonlaskussa. Se kesti kolme suurta '
          + 'piiritystä Skanderbegin elinaikana: 1450, 1466 ja 1467.',
        lahde: 'Ravi Dwivedi, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Skanderbeg',
      },
    ],
    tehtava: {
      kysymys: 'Mitä Beratin keskiaikainen slaavilainen nimi Beligrad '
        + 'tarkoittaa?',
      vaihtoehdot: [
        'Valkoinen kaupunki',
        'Musta kaupunki',
        'Suuri kaupunki',
        'Pyhä kaupunki',
      ],
      oikea: 0,
      fakta: 'Beratin keskiaikainen slaavilainen nimi Beligrad '
        + 'tarkoittaa Valkoista kaupunkia, mikä viittasi jo tuolloin '
        + 'sen valkoisiin taloihin.',
    },
  },
],
```

### ALB — kuvat tarkistettavaksi (Commons-URL + huomiot)

1. **Vlorën itsenäisyysmonumentti (päiväkuva)** —
   https://commons.wikimedia.org/wiki/File:Monumenti_i_Pavarësisë.jpg
   (5184×3456, CC BY-SA 4.0, Arianit). Sama monumentti kuin pelissä jo
   käytössä olevalla ALB:n `Vlorë`-maakuntakortilla, mutta ERI tiedosto —
   maakuntakortin `Independence_Monument,_Vlorë.jpg` on hämärä kuva, jossa
   patsasjalustassa näkyy graffitia; tämä on siisti päiväkuva samasta
   patsaasta.
2. **Beratin vanhakaupunki** —
   https://commons.wikimedia.org/wiki/File:The_old_town_of_Berat_2019.jpg
   (3264×1840, CC BY-SA 2.0, Michel NOCTURE). SAMA tiedosto kuin pelissä jo
   käytössä ALB:n `Berat`-maakuntakortilla — merkitsen toistokäytön
   näkyviin integroijalle (eri konteksti: maalehti vs. maakuntakortti).
3. **Butrintin teatteri** —
   https://commons.wikimedia.org/wiki/File:Butrint,_Theater.jpg
   (4608×3456, CC BY-SA 4.0, Cosal). Uusi kuva.
4. **Krujën linna auringonlaskussa** —
   https://commons.wikimedia.org/wiki/File:Krujë_castle_during_sunset.jpg
   (4032×1960, CC BY-SA 4.0, Ravi Dwivedi). Uusi kuva.

---

## Tekstipituudet (tarkistettu, 440–660 merkkiä sääntö)

| Nosto | Merkkejä |
|---|---|
| SRB1 Belgradin piiritys | 611 |
| SRB2 Petrovaradin | 640 |
| SRB3 Studenica | 616 |
| SRB4 Tesla | 627 |
| ALB1 Vlorë | 647 |
| ALB2 Berat | 638 |
| ALB3 Butrint | 644 |
| ALB4 Krujë | 648 |

## Erottautuminen olemassa olevista "historian hetket" -kohtauksista

- **SRB / Belgradin piiritys 1456**: HUN:n historia-aiheessa (rivi ~17959,
  "Kellot, jotka jäivät soimaan") sama piiritys on jo kerrottu Hunyadin ja
  kirkonkellojen näkökulmasta. Tämä SRB-nosto on kirjoitettu TÄYSIN eri
  kulmasta: Serbian despootti Đurađ Brankovićin näkökulmasta, oman armeijan
  tuhosta ennen piiritystä, ja — tärkeintä — voiton lyhytaikaisuudesta
  (Smederevo kaatui 1459). Ei yhteistä virkettä tai faktaa HUN-tekstin
  kanssa.
- **ALB / Vlorën itsenäisyys 1912**: pelin "historian hetket" -kohtausta ei
  ole vielä kirjoitettu (tarkistin `js/packs/historian-hetket.js`:stä — ei
  SRB/ALB-mainintoja). Kirjoitin silti oma-aloitteisesti eri kulman
  varalta: lipun ja sen ompelijan (Marigo Posio) näkökulman poliittisen
  julistuksen sijaan, jotta tuleva historian hetki -kohtaus voi vapaasti
  keskittyä itse julistustilaisuuteen ilman päällekkäisyyttä.

## Lähteet (faktantarkistus, kaikki haettu 28.9.2026 WebSearch/WebFetch)

en-Wikipedia: Siege of Belgrade (1456), Đurađ Branković, Siege of Smederevo
(1459), Petrovaradin Fortress, Studenica Monastery, Stefan Nemanja, Nikola
Tesla Museum, Assembly of Vlorë, Marigo Posio, Berat, Butrint, Krujë Castle,
Siege of Krujë (1450), Skanderbeg. Serbia.travel ja Serbia.com
(Petrovaradinin lisänimi "Gibraltar on the Danube").
