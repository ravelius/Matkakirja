# Viesti Fablelle: Saksan hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-deu`
(pohja origin/main 88f43233, v1956). **29 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu.

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli
  taulukossa. Yhtään lukua ei ole arvattu. Kohteilla, joiden omalla artikkelilla ei ollut pistettä,
  käytetty saman paikan artikkelia (Sächsische Schweiz: "Saxon Switzerland").
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs`
  `laudat`, `osuuLehteen('DEU')`): **29/29 osuu Saksan fokuslehteen**.
- Saksan ainoa pelikaupunki on Berliini. Etäisyys pääkartan laudalla: lähin ehdotus on Spreewald
  33,1 (raja `KAUPUNGIN_KOHDALLA_SADE` on 7), joten yksikään ei ole kaupungin kohdalla.
- Päällekkäisyys: verrattu `nostojenKarttapaikat()`-tulosteeseen (DEU:n 40 nykyistä nostoa) ja
  fokuskohteet-deu.js:n kohteisiin. Nykyisiä ovat mm. Zugspitze, Watzmann, Feldberg, Großer Arber,
  Brocken, Pohjanmeri, Itämeri, Bodenjärvi, Rein, Elbe, Tonava, Oder, Weser, Brandenburgin portti,
  Sanssouci, Hampuri, Kölnin tuomiokirkko, München, Dresden, Wartburg, Ruhrin alue, Neuschwanstein,
  Valhekivet (Würzburg), Röntgen 1895, Gutenberg 1454, Luther 1517 ja Berliinin nostot.
  Yksikään ehdotus ei ole samalla paikalla; lähimmät nykyiset ovat Oberammergau – Zugspitze 7,9,
  Bad Ems – Rein 8,7, Rüdesheim – Rein 9,6, Meissen – Dresden 9,8 lautayksikköä.
- Ei kaupunkeja: Hampuri, München, Köln, Frankfurt, Nürnberg, Bremen, Aachen, Trier, Heidelberg,
  Lübeck, Bamberg, Weimar, Ulm, Berliinin naapuripaikat jne. jätetty pois. Mukana on pieniä
  kaupunkeja ja kyliä (Rothenburg, Bayreuth, Quedlinburg, Meissen, Jena, Ansbach, Hameln), koska
  niiden merkitys on kohde (festivaalitalo, porcelain, Zeiss), ei kaupunki. Bayreuth ja Jena ovat
  suurimmat (noin 70 000 ja 110 000 asukasta) ja voin pudottaa ne, jos haluat.
- Tyypit ovat pelin oma `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi;
  muut historia, kulttuuri, ruoka, kauppa, tekniikka).

## Lista

### Luonto (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-saechsische-schweiz | Saksilainen Sveitsi | vuori | 50,9333 / 14,2 | Saxon Switzerland | Elben hiekkakivikalliot ja kalliokärjet Dresdenin kaakkoispuolella, romantiikan maalareiden maisema. |
| 2 | hahmotelma-ruegen | Rügenin liitukalliot | saari | 54,5731 / 13,6625 | Königsstuhl (Rügen) | Itämeren Rügenin saaren valkoiset liitukalliot, joita Caspar David Friedrich maalasi. |
| 3 | hahmotelma-sylt | Sylt | saari | 54,9 / 8,3333 | Sylt | Pohjanmeren pisin saari Saksan pohjoisrannikolla, jonka hiekkadyynit ja tuuli muovaavat jatkuvasti. |
| 4 | hahmotelma-helgoland | Helgoland | saari | 54,1825 / 7,8853 | Heligoland | Pohjanmeren punainen kalliosaari, jonka Britannia vaihtoi Saksalle 1890. |
| 5 | hahmotelma-lueneburger-heide | Lüneburgin nummi | jarvi | 53,1686 / 9,9397 | Lüneburg Heath | Pohjois-Saksan laaja kanervanummi ja yksi Saksan vanhimmista suojelualueista. |
| 6 | hahmotelma-spreewald | Spreewald | jarvi | 51,9139 / 13,9263 | Spree Forest | Sprée-joen sadat kanavat ja lehtimetsä, jossa liikutaan veneellä. |
| 7 | hahmotelma-chiemsee | Chiemsee | jarvi | 47,89 / 12,47 | Chiemsee | Baijerin suurin järvi, jonka saarelle Ludwig II rakennutti myöhemmin oman Versailles'nsa. |

### Historia (6)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 8 | hahmotelma-hermannsdenkmal | Hermannsdenkmal | historia | 51,9117 / 8,8394 | Hermannsdenkmal | Teutoburgin metsän jättiläismäinen Arminius-patsas, valmistunut 1875. |
| 9 | hahmotelma-externsteine | Externsteine | historia | 51,869 / 8,9173 | Externsteine | Teutoburgin metsän hiekkakivikalliot, joihin on veistetty keskiaikainen reliefi ja luolia. |
| 10 | hahmotelma-saalburg | Saalburg | historia | 50,2714 / 8,5667 | Saalburg | Roomalaisen limes-rajalinnan jälleenrakennettu linnake Taunuksen vuorilla. |
| 11 | hahmotelma-hohenzollern | Hohenzollernin linna | historia | 48,3232 / 8,9677 | Hohenzollern Castle | Preussin ja Saksan keisarisuvun kantalinna, jonka nykyinen muoto rakennettiin 1850–1867. |
| 12 | hahmotelma-quedlinburg | Quedlinburg | historia | 51,7917 / 11,1472 | Quedlinburg | Saksan ensimmäisen kuninkaan Henrik Linnustajan kaupunki, jonka vanhakaupunki on ehjä keskiaikainen. |
| 13 | hahmotelma-maulbronn | Maulbronnin luostari | historia | 49,0011 / 8,8128 | Maulbronn Monastery | Pohjoisalppien parhaiten säilynyt keskiaikainen sisterssiläisluostari. |

### Kulttuuri ja ruoka (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 14 | hahmotelma-rothenburg | Rothenburg ob der Tauber | kulttuuri | 49,3833 / 10,1833 | Rothenburg ob der Tauber | Muurien ympäröimä keskiaikainen kaupunki, joka tunnetaan lähes muuttumattomasta ilmeestään. |
| 15 | hahmotelma-bayreuth | Bayreuthin Festspielhaus | kulttuuri | 49,96 / 11,5797 | Bayreuth Festspielhaus | Wagnerin oopperoille rakennettu festivaalitalo, jonka peruskivi laskettiin 1872. |
| 16 | hahmotelma-ruedesheim | Rüdesheim ja Rheingau | ruoka | 49,9833 / 7,9306 | Rüdesheim am Rhein | Reinin rinnerieslingin viinitarhat Reinin jyrkillä rinteillä. |
| 17 | hahmotelma-bernkastel | Bernkastel ja Mosel | ruoka | 49,9161 / 7,0694 | Bernkastel-Kues | Moselin jyrkät viinitarharinteet ja ristikkotalojen vanhakaupunki. |
| 18 | hahmotelma-triberg | Triberg | kulttuuri | 48,1308 / 8,2317 | Triberg im Schwarzwald | Mustan metsän käkikellojen ja vesiputousten kaupunki. |
| 19 | hahmotelma-hameln | Hameln | kulttuuri | 52,1 / 9,3667 | Hamelin | Kaupunki, jonka kuuluisa Hamelnin pillipiiparin taru kertoo lasten katoamisesta 1284. |
| 20 | hahmotelma-oberammergau | Oberammergau | kulttuuri | 47,5967 / 11,0644 | Oberammergau | Alppikylä, jossa lupauksen perusteella esitetään Passionnäytelmää kymmenen vuoden välein. |

### Kauppa ja tekniikka (5)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 21 | hahmotelma-voelklingen | Völklingenin rautatehdas | tekniikka | 49,2444 / 6,85 | Völklingen Ironworks | Ehjänä säilynyt 1800–1900-lukujen masuunitehdas Saarlandissa, maailmanperintökohde. |
| 22 | hahmotelma-freiberg | Freibergin hopeakaivokset | kauppa | 50,9119 / 13,3428 | Freiberg | Saksin hopeaesiintymän kaupunki ja Euroopan vanhin kaivosakatemia. |
| 23 | hahmotelma-meissen | Meissenin posliini | kauppa | 51,1667 / 13,4833 | Meissen | Euroopan ensimmäisen posliinin valmistuspaikka Elben rannalla. |
| 24 | hahmotelma-jena | Jena ja Zeiss | tekniikka | 50,9272 / 11,5861 | Jena | Mikroskooppien ja linssien kaupunki, jossa Carl Zeiss ja Ernst Abbe kehittivät optiikkaa. |
| 25 | hahmotelma-muengsten | Müngstenin silta | tekniikka | 51,1606 / 7,1333 | Müngsten Bridge | Saksan korkein rautatiesilta Wupper-joen yllä, valmistunut 1897. |

### Skandaalit ja hetket (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 26 | hahmotelma-hambach | Hambachin linna | historia | 49,3247 / 8,1183 | Hambach Castle | Vuoden 1832 Hambachin juhla, jossa tuhannet vaativat vapautta ja yhtenäistä Saksaa. |
| 27 | hahmotelma-bad-ems | Bad Ems | historia | 50,3381 / 7,7106 | Bad Ems | Kylpyläkaupunki, jonka sähkeestä 1870 syntyi Ranskan ja Preussin sota. |
| 28 | hahmotelma-peenemuende | Peenemünde | historia | 54,1333 / 13,7667 | Peenemünde | Usedomin saaren niemi, jossa kehitettiin V2-ohjuksia toisen maailmansodan aikana. |
| 29 | hahmotelma-ansbach | Ansbach | historia | 49,3 / 10,5833 | Ansbach | Kaupunki, jossa arvoitukselliseksi jäänyt Kaspar Hauser puukotettiin 1833. |

## Huomiot Fablelle

1. **Etäisyys DEU-renkaaseen** (pelin maailmankartan DEU-rengas, pistemäinen sisällä-testi; lautayksikköä
   renkaan reunasta): saaret ovat renkaan ulkopuolella — Rügen (Königsstuhl) 19,3, Sylt 10,8,
   Helgoland 22,3, Peenemünde (Usedom) 1,4. Muut 25 ovat renkaan sisällä; rannikko- ja rajakohteista
   Saksilainen Sveitsi 2,9, Völklingen 3,5 ja Chiemsee 8,1. Kiel Canal (Brunsbüttel) pudotettiin, koska
   sen piste jäi 0,6 yksikköä renkaan ulkopuolelle — korvasi Müngstenin silta.
2. **Läheisyys**: Oberammergau – Zugspitze 7,9, Bad Ems – Rein 8,7, Rüdesheim – Rein 9,6,
   Meissen – Dresden 9,8 lautayksikköä. Kaikki yli kaupunkirajan (7), mutta merkit voivat
   törmätä lähizoomissa; pudotan tarvittaessa.
3. **1873:n jälkeiset**: Hermannsdenkmal (1875), Bayreuth (peruskivi 1872, avattiin 1876), Müngsten
   (1897), Völklingen (1873 perustettu rautatehdas, nykyinen laajuus myöhemmin), Peenemünde (1936–45).
   Nappi-alaotsikko 1873-näkökulmasta ("tänne nousee myöhemmin…"); Hambach, Bad Ems ja Ansbach ovat ennen 1873.
4. **Kuvariskit**: Peenemünde (vain nykykuvat ja muistomerkkejä, ei aseita), Ansbach ja Bad Ems
   (vähän kelvollisia kuvia); jätän pois, jos kahta kelvollista kuvaa ei löydy, ja korvaan sisämaan
   kohteella (esim. Goslar, Görlitz, Lübbenau) niin että 29 säilyy.
5. "Miksi"-virkkeet on kirjoitettu muistista listaa varten ja tarkistetaan Wikipedian tekstistä
   vaiheessa 2; vaiheessa 2 tekstit kirjoitetaan vain artikkelien pohjalta.

Odotan hyväksyntää (tai muutoksia) ennen vaihetta 2.
