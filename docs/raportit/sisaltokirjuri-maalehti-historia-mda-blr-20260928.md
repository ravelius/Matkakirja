# Sisältökirjuri: maalehden "Historia"-aihe — Moldova (MDA) ja Valko-Venäjä (BLR)

*(28.9.2026, Fablen tilaus: kuusi Euroopan puuttuvaa lehtimaata,
tässä erässä MDA ja BLR. Muut neljä — SRB/ALB/MKD/MNE — toisissa
agenteissa. Skeema MLT:n `historia`-aiheen mukaan,
js/packs/maa-kategoriat.js rivit ~1622-1737. Vain raportti — EI
committoitu suoraan pakkiin, integroija vie tekstit
`MAA_KATEGORIAT.MDA` / `MAA_KATEGORIAT.BLR` -taulukoihin.)*

Genetiivitarkistus: `maanGenetiivi()`-sääntö tuottaa "Moldova" →
"Moldovan" ja "Valko-Venäjä" → "Valko-Venäjän" oikein ilman
`MAAN_GENETIIVIT`-poikkeustaulun laajennusta (molemmat päättyvät
vokaaliin).

Kaikki kuvat on tarkistettu silmin (480 px thumb) väripalkkien,
vesileimojen ja kollaasien varalta — huomiot kunkin kuvan kohdalla.
Kaksi ensimmäistä Sfatul Tării -hakutulosta (ryhmäkuva "Sfatul Ţării,
10 December 1918.jpg" ja "Council of the country from Basarabia.jpg")
osoittautuivat juhlavuosikollaaseiksi (ovaalikehystetyt muotokuvat +
koristereunus) ja hylättiin tämän vuoksi; myös
"Belarus-Polatsk-Cathedral of Sophia-6.jpg" osoittautui pelkäksi
seinälaataksi eikä rakennuskuvaksi.

---

## MDA — Moldova

### Kuvat (Commons-URL:t integroijan tarkistusta varten)

1. **Sfatul Tării Palace in Chișinău.jpg** — CC BY 3.0, 1270×822,
   n. 1920 postikortti. Rakennus, jossa Sfatul Tării kokousti (ent.
   poikien lyseo nro 3). HUOM: postikortin kulmissa painettu teksti
   "Chișinău" / "Liceul de Băeți No. 3" — ei kollaasi, mutta
   integroijan kannattaa katsoa vielä itse ennen käyttöä.
   https://commons.wikimedia.org/wiki/File:Sfatul_%C8%9A%C4%83rii_Palace_in_Chi%C8%99in%C4%83u.jpg
2. **Orheiul Vechi Looking Southeast (41120829460).jpg** — CC BY 2.0
   (Flickr: John Pavelka), 5472×3648. Räutin joen mutka ja
   kalkkikivijyrkänne ilmakuvamaisesta kulmasta.
   https://commons.wikimedia.org/wiki/File:Orheiul_Vechi_Looking_Southeast_(41120829460).jpg
3. **Cetatea Sorocii.jpg** — CC BY-SA 3.0 (Vadim Sterbate), 6919×2379.
   Neljän kuvan panoraama koko linnoituksesta joen rannalla. HUOM:
   erittäin leveä kuvasuhde (n. 2,9:1) — tarkista taitossa, ettei
   rajaus leikkaa torneja pois.
   https://commons.wikimedia.org/wiki/File:Cetatea_Sorocii.jpg
4. **Caves Milestii Mici Moldavie.jpg** — CC BY-SA 3.0 (Myrabella,
   "Valued image"), 3020×2005. Maanalainen käytävä pullohyllyineen.
   https://commons.wikimedia.org/wiki/File:Caves_Milestii_Mici_Moldavie.jpg

### JS-lohko

```js
MDA: [
  {
    id: 'historia',
    nimi: 'Historia',
    johdanto: 'Prutin ja Dnestrin välissä oleva pieni maa on ollut kahlaamo, jota '
      + 'tataarit, ritarikunnat ja imperiumit ovat vuosisatoja vartioineet. Samoihin '
      + 'kalkkikivijyrkänteisiin on kaiverrettu sekä 1200-luvun luolaluostari että '
      + 'maailman suurimmat viinikellarit, ja vuonna 1918 maan oma kansanneuvosto '
      + 'äänesti sen liittymisestä Romaniaan.',
    nostot: [
      {
        otsikko: 'Neuvosto äänesti maan kohtalosta',
        aika: '27.3.1918',
        tiedosto: 'Sfatul Țării Palace in Chișinău.jpg',
        teksti: 'Maaliskuun 27. päivänä 1918 Sfatul Tării, Bessarabian kansanvaltainen '
          + 'neuvosto, kokoontui entisen poikien lyseon juhlasaliin Chișinăussa '
          + 'äänestämään maansa kohtalosta. 86 edustajaa äänesti liittymisen puolesta, '
          + '3 vastaan ja 36 pidättäytyi. Puheenjohtaja Ion Inculeț ja neuvosto '
          + 'liittivät Bessarabian Romaniaan sillä ehdolla, että maareformi ja '
          + 'alueellinen itsehallinto säilyisivät. Ehdot pyyhittiin pois vasta saman '
          + 'vuoden marraskuun lopulla, kun neuvosto äänesti Bucureștissa uudelleen ja '
          + 'julisti liittymisen ehdottomaksi. Rakennus tunnetaan nykyään Sfatul '
          + 'Tării -palatsina.',
        lyhyt: 'Sfatul Tării äänesti Bessarabian liittymisestä Romaniaan maaliskuussa '
          + '1918.',
        selite: 'Kuva esittää rakennusta, jossa Bessarabian kansanvaltainen neuvosto '
          + 'Sfatul Tării kokoontui 1917-1918. Se tunnettiin aiemmin poikien lyseona '
          + 'ja on nykyään Sfatul Tării -palatsi.',
        lahde: 'Tuntematon kuvaaja, Wikimedia Commons (CC BY 3.0)',
        wiki: 'Sfatul Țării',
      },
      {
        otsikko: 'Luola kaiverrettiin kallioon',
        aika: '1200-luvulta',
        tiedosto: 'Orheiul Vechi Looking Southeast (41120829460).jpg',
        teksti: 'Räutin joen mutkassa kohoaa kalkkikivijyrkänne, johon ortodoksimunkit '
          + 'kaivoivat luolaluostarin 1200-luvulla. Kammioissa asuttiin lähes '
          + '1700-luvun loppuun, kunnes paikka autioitui vuosisadoiksi. Samaan '
          + 'jyrkänteeseen ja sen alle kerrostuu yli 2000 vuotta historiaa: '
          + 'geto-daakialainen linnavuori, Kultaisen ordan aikainen kaupunki ja Tsehi '
          + 'Suuren 1400-luvulla rakennuttama linnoitus. Moldovan itsenäistyttyä 1991 '
          + 'munkit palasivat luoliin vuonna 1996 ensi kertaa vuosikymmeniin, '
          + 'siivosivat kammiot ja aloittivat rukoukset uudelleen samoissa kallioon '
          + 'hakatuissa seinissä.',
        lyhyt: 'Räutin joen jyrkänteeseen kaiverrettu keskiaikainen luolaluostari '
          + 'Orheiul Vechissä.',
        selite: 'Orheiul Vechi on arkeologinen alue Trebujenin kylän liepeillä. '
          + 'Kalkkikivijyrkänteeseen on kerrostunut yli 2000 vuoden asutushistoria.',
        lahde: 'John Pavelka, Wikimedia Commons (CC BY 2.0)',
        wiki: 'Orheiul Vechi',
      },
      {
        otsikko: 'Muurari allekirjoitti työnsä',
        aika: '1499/1546',
        tiedosto: 'Cetatea Sorocii.jpg',
        teksti: 'Vuonna 1499 Tsehi Suuri pystytti Dnestrin kahlaamon suojaksi puisen '
          + 'linnakkeen, joka pysäytti tataarien ratsujoukkoja. Puolen vuosisadan '
          + 'kuluttua Petru Rareș muurautti sen kivestä: ympyrän muotoinen linnoitus '
          + 'on halkaisijaltaan 37,5 metriä, ja sitä vartioi viisi bastionia, neljä '
          + 'pyöreää ja yksi suorakulmainen porttitorni. Muurit ovat yli kolme metriä '
          + 'paksut ja nousevat 21 metriin. Työn tekivät Transilvaniasta kutsutut '
          + 'muurarit mestari Iacobin johdolla, ja Iacob jätti seinään kaiverruksen, '
          + 'jossa hän muistuttaa jälkipolvia: tämän linnan rakensi Iacob.',
        lyhyt: 'Soroca on Moldovan parhaiten säilynyt keskiaikainen ympyrälinnoitus.',
        selite: 'Cetatea Soroca seisoo Dnestr-joen rannalla. Sen viisi bastionia ja '
          + 'paksut muurit suojasivat kahlaamoa tataarien hyökkäyksiltä.',
        lahde: 'Vadim Sterbate, Wikimedia Commons (CC BY-SA 3.0)',
        wiki: 'Soroca Fort',
      },
      {
        otsikko: 'Görkingin viinit päätyivät kalkkiluolaan',
        aika: '1950-luvulta',
        tiedosto: 'Caves Milestii Mici Moldavie.jpg',
        teksti: 'Mileștii Micin hylätystä kalkkikivilouhoksesta louhittiin 1900-luvun '
          + 'puolivälin jälkeen 200 kilometriä käytäviä, joissa lepää lähes kaksi '
          + 'miljoonaa pulloa viiniä - Guinnessin ennätyskirjan mukaan maailman '
          + 'suurin viinikokoelma. Naapurissa Cricovan 120 kilometrin luolastoon '
          + 'kätkeytyy synkempi tarina: kun puna-armeija valtasi Berliinin 1945, se '
          + 'takavarikoi natsijohtaja Hermann Göringin yksityisen viinikellarin. Osa '
          + 'saaliista kulki Moskovan ja Krimin kautta lopulta Cricovaan, jossa 129 '
          + 'pulloa on yhä esillä sotahistorian todistajina 12-14 asteisessa, '
          + 'tasaisessa kalkkikiviluolassa.',
        lyhyt: 'Mileștii Micin maanalaiset käytävät säilyttävät lähes kahta miljoonaa '
          + 'viinipulloa.',
        selite: 'Kuva on entisestä kalkkikivilouhoksesta, joka muutettiin '
          + 'viinikellariksi 1900-luvun puolivälissä. Naapurissa Cricovan luolastossa '
          + 'säilytetään myös sotasaalisviinejä.',
        lahde: 'Myrabella, Wikimedia Commons (CC BY-SA 3.0)',
        wiki: 'Mileștii Mici',
      },
    ],
    tehtava: {
      kysymys: 'Minä vuonna Sfatul Tării äänesti Bessarabian liittymisestä Romaniaan?',
      vaihtoehdot: [
        '1917',
        '1918',
        '1924',
        '1940',
      ],
      oikea: 1,
      fakta: 'Sfatul Tării äänesti Bessarabian liittymisestä Romaniaan 27. maaliskuuta '
        + '1918 - 86 edustajaa puolesta, 3 vastaan.',
    },
  },
],
```

---

## BLR — Valko-Venäjä

### Kuvat (Commons-URL:t integroijan tarkistusta varten)

1. **Berezyna.jpg** — PD (January Suchodolski, k. 1875), 4576×3136.
   Suchodolskin n. 1859 maalaus Berezinan ylityksestä, Poznańin
   kansallismuseo.
   https://commons.wikimedia.org/wiki/File:Berezyna.jpg
2. **Belarus Mir Castle Complex (248358971).jpeg** — CC BY-SA 4.0
   (Alexxx Malev), 2048×1365. Koko linnan julkisivu aurinkoisena
   päivänä, muutama kävijä nurmikolla.
   https://commons.wikimedia.org/wiki/File:Belarus_Mir_Castle_Complex_(248358971).jpeg
3. **2022.08.27 Bison bonasus in Bielaviežskaja Pušča National Park
   07.jpg** — CC BY-SA 4.0 (Rabbi Mendl), 4032×2889. Emobiisoni ja
   vasikka niityllä aamuvalossa; hylkäsin tämän sarjan muut kuvat ja
   erillisen "European bisons.jpg" -tiedoston, koska ne oli kuvattu
   joko aidatussa katselutarhassa läheltä tai kokonaan Ranskassa
   (Monts d'Azurin luonnonpuistossa) — tämä on selkeästi Belarusin
   Belovežan Puščassa avoimella niityllä.
   https://commons.wikimedia.org/wiki/File:2022.08.27_Bison_bonasus_in_Bielavie%C5%BEskaja_Pu%C5%A1%C4%8Da_National_Park_07.jpg
4. **2023.03.25 Cathedral of Saint Sophia in Polack.jpg** — CC BY-SA
   4.0 (Dina Panayotis), 2977×3991 (pysty). Kirkon barokkijulkisivu
   sinistä taivasta vasten, ei kylttejä. Pystykuva, koska aihe on
   tornipari — sallittu (`.pysty`, kaupunkilehden sääntö pätee
   maalehteen).
   https://commons.wikimedia.org/wiki/File:2023.03.25_Cathedral_of_Saint_Sophia_in_Polack.jpg

### JS-lohko

```js
BLR: [
  {
    id: 'historia',
    nimi: 'Historia',
    johdanto: 'Tiheät metsät ja suuret joet ovat sekä suojelleet että tuhonneet: '
      + 'samassa aarniometsässä selvisi Euroopan viimeinen villi biisonikanta, kun '
      + 'taas Berezina-joesta tuli Napoleonin suurarmeijan hauta. Linnat ja '
      + 'kivikirkot todistavat, että alueella on hallinnut niin ruhtinaita, '
      + 'mahtisukuja kuin ritarikuntiakin jo tuhat vuotta.',
    nostot: [
      {
        otsikko: 'Kolme päivää jäisellä joella',
        aika: '26.-29.11.1812',
        tiedosto: 'Berezyna.jpg',
        teksti: 'Napoleonin Grande Armée pakeni Moskovasta lokakuussa 1812 ja saapui '
          + 'marraskuun lopulla riutuneena Berezina-joelle lähelle Barysaŭia. '
          + 'Venäläisjoukot uhkasivat sulkea ansan joka suunnalta. Kenraali Éblén '
          + 'insinöörit, monet heistä hollantilaisia ponttoonisiltureita, seisoivat '
          + 'jääkylmässä vedessä vyötäisiä myöten ja rakensivat kaksi puusiltaa. Noin '
          + '60 000 sotilasta ehti ylittää 26.-29. marraskuuta, ennen kuin sillat '
          + 'poltettiin ja lähes 10 000 ihmistä jäi itärannalle vihollisen armoille. '
          + 'Tapahtumasta tuli ranskan kieleen sana "Bérézina", joka tarkoittaa '
          + 'täydellistä katastrofia.',
        lyhyt: 'Napoleonin armeija ylitti jäisen Berezina-joen paetessaan Venäjältä '
          + 'marraskuussa 1812.',
        selite: 'January Suchodolskin maalaus vuodelta noin 1859 kuvaa Ranskan '
          + 'armeijan kaoottista ylitystä Berezina-joen yli. Teos on nykyään '
          + 'Poznańin kansallismuseossa.',
        lahde: 'January Suchodolski, Wikimedia Commons (PD)',
        wiki: 'Battle of Berezina',
      },
      {
        otsikko: 'Linna joka selvisi joka sodasta',
        aika: '1500-luvulta',
        tiedosto: 'Belarus Mir Castle Complex (248358971).jpeg',
        teksti: 'Aatelismies Jurij Iljinitš aloitti linnan rakentamisen 1400-luvun '
          + 'lopulla tatarien ratsioiden ja naapuririitojen vuoksi. 1500-luvun '
          + 'jälkipuoliskolla linna siirtyi mahtisuku Radziwiłłeille, ja Mikołaj '
          + 'Kristof "Orpo" Radziwiłł laajensi sitä kolmikerroksisilla '
          + 'asuinsiivillä, uudisti torneja ja kaivatti vallihaudan. Vuosisatojen '
          + 'ajan linna koki hyökkäyksiä, tuhoja ja jälleenrakennuksia - viimeksi '
          + 'toisessa maailmansodassa, jolloin sen muurien sisään perustettiin '
          + 'juutalaisghetto. Pitkän kunnostuksen jälkeen Unesco lisäsi Mirin linnan '
          + 'maailmanperintöluetteloon vuonna 2000.',
        lyhyt: 'Mirin linna on yksi harvoista säilyneistä myöhäisgoottilaisista '
          + 'linnoista Valko-Venäjällä.',
        selite: 'Linna sijaitsee Mirin kaupungissa Hrodnan alueella. '
          + 'Radziwiłł-suku laajensi sen 1500-luvulla renessanssityyliseksi '
          + 'asuinlinnaksi.',
        lahde: 'Alexxx Malev, Wikimedia Commons (CC BY-SA 3.0)',
        wiki: 'Mir Castle Complex',
      },
      {
        otsikko: 'Metsä joka pelasti biisonin',
        aika: '1929 alkaen',
        tiedosto: '2022.08.27 Bison bonasus in Bielaviežskaja Pušča National Park 07.jpg',
        teksti: 'Metsästä on kirjallisia mainintoja jo 900-luvulta, ja 1400-luvulla '
          + 'suurruhtinaat rauhoittivat sen kuninkaalliseksi metsästysmaaksi - '
          + 'suojelu jatkui liettualaisista ruhtinaista Puolan kuninkaisiin ja '
          + 'Venäjän tsaareihin asti. Juuri tämä vuosisatoja jatkunut rauhoitus '
          + 'pelasti Euroopan raskaimman maanisän: villi biisonikanta hävisi '
          + 'metsästyksen takia täysin ensimmäisen maailmansodan jälkeen, mutta '
          + 'eläintarhoihin selvinneistä yksilöistä aloitettu paluu vuodesta 1929 '
          + 'alkaen on kasvattanut Belovežan Puščan kannan yli 1200 biisoniin - '
          + 'Euroopan suurimmaksi vapaana laiduntavaksi laumaksi.',
        lyhyt: 'Belovežan Pušča on Euroopan viimeinen laaja aarniometsä ja biisonien '
          + 'viimeinen turvapaikka.',
        selite: 'Kuvassa emobiisoni ja vasikka laiduntavat Belovežan Puščan '
          + 'kansallispuistossa. Puisto on Unescon maailmanperintökohde.',
        lahde: 'Rabbi Mendl, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Belovezhskaya Pushcha National Park',
      },
      {
        otsikko: 'Velhoruhtinaan kivikirkko',
        aika: '1044-1066',
        tiedosto: '2023.03.25 Cathedral of Saint Sophia in Polack.jpg',
        teksti: 'Polotskin ruhtinaskunta on yksi vanhimmista itäslaavilaisista '
          + 'valtioista, ja sen varhaishistoriaan kuuluu synkkä tarina: kun Vladimir '
          + 'Suuri surmasi ruhtinas Rogvolodin ja tämän pojat vuonna 978, hän otti '
          + 'väkisin vaimokseen Rogvolodin tyttären Rognedan. Sata vuotta myöhemmin '
          + 'heidän jälkeläisensä, "velhoruhtinas" Vseslav, rakennutti kaupunkiin '
          + 'Pyhän Sofian kirkon vuosina 1044-1066 - Kiovan ja Novgorodin '
          + 'Sofia-kirkkojen sisarrakennuksen, jossa kohosi alun perin seitsemän '
          + 'kupolia. Se on Valko-Venäjän vanhin kivirakennus, vaikka nykyinen '
          + 'barokkijulkisivu on 1700-luvulta.',
        lyhyt: 'Pyhän Sofian kirkko Polotskissa on Valko-Venäjän vanhin '
          + 'kivirakennus.',
        selite: 'Nykyinen barokkijulkisivu on 1700-luvulta, mutta perustukset ja osa '
          + 'muureista ovat 1000-luvulta. Kirkko seisoo Dvina-joen rannalla.',
        lahde: 'Dina Panayotis, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Saint Sophia Cathedral, Polotsk',
      },
    ],
    tehtava: {
      kysymys: 'Minä vuonna Napoleonin armeija ylitti Berezina-joen pakomatkallaan '
        + 'Venäjältä?',
      vaihtoehdot: [
        '1805',
        '1812',
        '1815',
        '1848',
      ],
      oikea: 1,
      fakta: 'Napoleonin Grande Armée ylitti jäisen Berezina-joen 26.-29. marraskuuta '
        + '1812 paetessaan Venäjältä; tapahtumasta tuli ranskan kieleen synonyymi '
        + 'täydelliselle katastrofille.',
    },
  },
],
```

---

## Huomiot integroijalle

- **Aika NYKYAJASSA -linjaus**: tämä on historia-aihe, ei
  kartta-aihe, joten AIKA-linjausta (kartta nykyajassa, vain
  estetiikka vanhaa) ei koske tätä sisältöä sellaisenaan — nostot
  kertovat menneisyydestä kuten muidenkin maiden historia-aiheet.
- **BLR:n nykypolitiikka**: tehtävänannon mukaisesti aihe pysyy
  kokonaan historiassa (1812, 1500-luku, keskiaika) eikä sivua
  nykyisiin poliittisiin kysymyksiin — myöskään Belovežan
  Puščan joulukuun 1991 sopimusta (Neuvostoliiton hajottaminen) ei
  mainita, koska se sivuaisi nykypolitiikkaa; nosto pysähtyy
  biisonikannan 1929 alkaneeseen elpymiseen.
  - Historian hetket -kytkentä: Bessarabian liittyminen 1918 (MDA1)
  ja Berezinan ylitys 1812 (BLR1) on kirjoitettu ERI KULMASTA kuin
  oletan karttatyökalun kohtaustekstien olevan (en nähnyt niitä
  itse) — MDA1 painottaa äänestystä ja rakennusta, BLR1 keskittyy
  siltojen rakentajiin ja "Bérézina"-sanan syntyyn. Integroijan
  kannattaa vertailla varsinaisiin kohtausteksteihin
  päällekkäisyyksien varalta.
- **Merkkimäärät tarkistettu ohjelmallisesti**: kaikki kahdeksan
  `teksti`-kenttää ovat 555-585 merkin välillä (vaatimus 440-660).
- **Sorocan panoraaman kuvasuhde** (n. 2,9:1) ja Sfatul Tării
  -palatsin postikortin kulmatekstit ovat ainoat kaksi kuvaa, joissa
  suosittelen integroijaa vielä tarkistamaan silmämääräisesti ennen
  julkaisua — kaikki muut kuusi kuvaa ovat puhtaita valokuvia ilman
  vesileimoja, väripalkkeja tai kollaaseja.
- Kaikki kahdeksan kuvaa täyttävät leveysvaatimuksen (≥ 1200 px) ja
  ovat PD/CC0/CC BY/CC BY-SA -lisensoituja.
