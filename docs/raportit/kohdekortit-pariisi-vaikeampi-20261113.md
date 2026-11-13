# Kolme Pariisin kohdekorttia: Tour Saint-Jacques, Saint-Eustache, Pompidou-keskus (SK 13.11.2026; KK 13.41 osa 1; korjattu KK 13.53 ja 14.17; Pompidou ilman kuvaa ja kaikki ilman miniatyyriä KK 21.59; korjaukset 22.03: Saint-Eustache "Kirkon paikalla", Saint-Jacques kaupan ehto ja Pascal-virke; kohta 2: Eustachen 3. ja 4. kappale yhdistetty yhdeksi, kortissa nyt kolme kappaletta)

**Korjaukset 13.53 (10 kpl) ja nimi 14.17 tehty tähän tiedostoon; vuosivirkkeet sanatarkasti ennallaan.** Kortin ja lapun nimi on **Pompidou-keskus** (ei "Centre Pompidou"; pelin muut Pariisin kohteet käyttävät suomenkielistä nimeä ja kartan malli on jo sillä nimellä). Ranskankieliset lähde- ja tiedostonimet (centrepompidou.fr, Commons-tiedostot) säilyvät sellaisinaan.

Vain docs. Muoto kuten `js/packs/nahtavyysjutut.js` (`aika`, `teksti` 2–3 kappaletta, `kuvat`, `lahde`). PK vie datan vasta KK:n sanalla. Lähderiviä ei näytetä pelaajalle (omistaja 13.09); ne kulkevat tässä tarkistukseen asti (kortti lahteet-ja-tarkistus 1–5). Hyväksytyt vuosivirkkeet ovat sanatarkasti kunkin tekstin ensimmäisenä. Jokaisella luvulla vähintään kaksi itsenäistä lähdettä (Wikipedian kieliversiot = yksi). Haettu 13.11.2026; sivut luettu itse.

## 1. Tour Saint-Jacques (`aika: '1509–1523'`)

```js
'Tour Saint-Jacques': {
  aika: '1509–1523',
  teksti: 'Tour Saint-Jacques rakennettiin 1509–1523, ja se on ainoa jäljelle '
      + 'jäänyt osa keskiaikaisesta Saint-Jacques-de-la-Boucherien kirkosta. '
      + 'Kirkko seisoi Grande Boucherien, Pariisin teurastajien kaupunginosan, '
      + 'keskellä. '
      + 'Tornin juurelta alkaa yhä Via Turonensis, yksi Santiago de '
      + 'Compostelaan vievistä pyhiinvaellusreiteistä.'
    + '\n\n'
    + 'Vallankumouksen vuosina kirkko myytiin louhokseksi, ja sen kivet '
      + 'kelpasivat rakennusaineeksi. Kellotorni säästyi: kaupan ehtona '
      + 'kerrotaan olleen, ettei tornia saa purkaa. Vuonna 1836 Pariisin kaupunki osti '
      + 'tornin, ja 1850-luvulla sen ympärille tehtiin '
      + 'puisto, kun Haussmannin työt avasivat Rue de Rivolin ja Boulevard '
      + 'de Sébastopolin juuri tornin eteen.'
    + '\n\n'
    + 'Huipulla seisoo pyhä Jaakob pyhiinvaeltajana. Alkuperäinen patsas '
      + 'syöstiin alas vallankumouksen aikana, ja nykyinen on 1800-luvun '
      + 'jäljennös. Tornin juurella on Blaise Pascalin patsas, koska hänen '
      + 'sanotaan tehneen tornissa ilmanpainekokeita — tosin historioitsijat '
      + 'ovat tästä eri mieltä. Sääasema perustettiin torniin vasta 1891.',
  kuvat: [
    {
      tiedosto: 'Tour Saint-Jacques and Fontaine du Palmier, South-East View 140207 1.jpg',
      lyhyt: 'Tour Saint-Jacques (1509–1523) on ainoa jäljellä oleva osa keskiajan Saint-Jacques-kirkosta.',
      selite: 'Tour Saint-Jacques rakennettiin 1509–1523, ja se on ainoa jäljelle jäänyt osa keskiaikaisesta Saint-Jacques-de-la-Boucherien kirkosta.',
      lahde: 'DXR, Wikimedia Commons (CC BY-SA 3.0)',
    },
  ],
  lahde: 'Wikipedia',
},
```

Pelin vuosi 1873: kaikki väitteet pätevät silloin (1836 osto, puisto 1850-luvulta, 1891 mainittu myöhempänä). Kortti on kirjoitettu nykyaikaiseen sävyyn kuten Garnier-kortti ("yhä" vain pyhiinvaellusreitistä).

### Lähderivit (kaksi itsenäistä jokaiselle)
| Väite | Lähde 1 | Lähde 2 (+3) |
|---|---|---|
| Torni 1509–1523 (hyväksytty virke) | Pariisin kaupunki `paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432`: "En 1509 débute… s'achève en 1523" | en-Wikipedia (viite Villain 1758); Mérimée PA00086479: 1509–1525 (poikkeama, kirjattu 13.25) |
| Ainoa jäljellä oleva osa | paris.fr ("vestige d'une église", kirkko purettu) | Mérimée ("Tour de l'ancienne église"); en-/fr-Wikipedia |
| Kaupunginosa Grande Boucherie, nimi | paris.fr ("quartier de la Grande Boucherie") | en-Wikipedia ("Saint James of the Meat Market", Les Hallesin teurastajat) |
| Via Turonensis alkaa tornin juurelta | paris.fr ("la via Turonensis démarre à son pied") | en-Wikipedia ("pilgrims setting out on the road that led to Tours"); UNESCO 1998 (en + fr) |
| Myytiin louhokseksi ("vallankumouksen vuosina"; myynti 1797, Direktorion aika, joten ei "heti vallankumouksen jälkeen") | paris.fr (vendue comme carrière en 1797) | Mérimée ("En 1797, l'église est vendue comme carrière"); en-Wikipedia ("treated as a quarry") |
| Ehto: torni säästetään ("kerrotaan") | paris.fr ("sous réserve que son clocher… soit épargné") | Mérimée ("une clause interdit la démolition du clocher"); fr-Wikipedia sanoo ehdon olemassaolon kiistanalaiseksi → siksi "kerrotaan" |
| Kaupunki osti 1836 | paris.fr (27.8.1836) | Mérimée ("En 1836… acheté par la Ville"); en- ja fr-Wikipedia |
| Puisto 1850-luvulla ("puisto", ei "Pariisin ensimmäisiä": superlatiivi poistettu 13.53); Haussmann, Rivoli, Sébastopol | paris.fr (Haussmann, 1853; puisto Ballun johdolla; Rivoli ja Sébastopol "se croisent devant le monument") | Mérimée ("En 1854, un décret autorise la création d'un square"); fr-Wikipedia (puisto 1856, Ballu 1854–1858); en-Wikipedia (Ballu, Rue de Rivoli) |
| Pyhä Jaakob huipulla, alkuperäinen syöksetty, nykyinen 1800-luvun | paris.fr ("précipitée en l'an IV… sa reproduction du XIXe siècle") | fr-Wikipedia (abattue à la Révolution; korvaaja Chenillon); en-Wikipedia (patsas 1800-luvulla huipulle) |
| Pascal-patsas; kokeet kiistanalaiset | paris.fr (kokeet tornin huipulla ja juurella; patsas 1800-luvun ensimmäisessä restauroinnissa) | en-Wikipedia (patsas juurella; "it is debated whether they were performed here"); siksi "sanotaan… eri mieltä" |
| Sääasema 1891 | paris.fr ("à partir de 1891") | Mérimée ("En 1891, installation d'une station météorologique"); fr-Wikipedia |

### Poikkeamat (ei tekstiin; kirjattu)
- Korkeus: en-Wikipedia 52 m, paris.fr 54 m terassille, fr-Wikipedia 54 m parvekkeeseen → ei lukua kortissa.
- Kirkon purku: en-Wikipedia 1793, paris.fr, Mérimée ja fr-Wikipedia 1797 → kortissa ei vuotta.
- Valmistuminen: Mérimée 1525 (kellot), Structurae 1522 (hakuote) → kuten 13.25.
- Charlemagne-legenda (fr-Wikipedia: Pseudo-Turpin) ja "tykinkuulatehdas 1824" vain Wikipedian kieliversioissa → jätetty pois.
- Tornin ylläpito/restaurointi 2006–2009 vs fr-Wikipedia 2013 → ei mainita; paris.fr: vierailut suljettu (päivitetty 29.5.2026) → ei mainita.

### Valokuvaehdokkaat (vain ehdotus, ei latauksia)
1. `File:Tour Saint-Jacques and Fontaine du Palmier, South-East View 140207 1.jpg` — DXR, CC BY-SA 3.0, otettu 7.2.2014 Île de la Citéltä; torni ja Fontaine du Palmier -pylväs. **Ensisijainen.** Katsottu silmin (kuvassa torni selvästi, kullattu pylväspatsas vasemmalla).
2. `File:Tour Saint-Jacques BLS.jpg` — Benh LIEU SONG, CC BY-SA 4.0, 5.4.2015; torni auringonnousussa Rue Nicolas-Flamelilta, talojen välissä. Katsottu silmin.
(Pelissä on jo `Tour Saint-Jacques au crépuscule.jpg`, Fabien Barrau, CC BY-SA 4.0 — Matkaopas; ei toistoa.)

## 2. Saint-Eustache (`aika: '1532–1637'`)

```js
'Saint-Eustache': {
  aika: '1532–1637',
  teksti: 'Saint-Eustachea alettiin rakentaa vuonna 1532, ja kirkko vihittiin '
      + 'vuonna 1637. Länsijulkisivu on myöhempi: sitä alettiin rakentaa '
      + 'uudelleen vuonna 1754.'
    + '\n\n'
    + 'Kirkko seisoo Les Hallesin, Pariisin entisen ruokatorin, vieressä; '
      + 'tori siirrettiin Rungisiin vuonna 1969. '
      + 'Kirkon paikalla oli ennen vaatimaton kappeli vuodelta 1213, mutta '
      + 'seurakunta kasvoi ja kappeli kävi pieneksi. Rakentaminen kesti yli '
      + 'sata vuotta, ja tulos on sekoitus: rakenne on goottilaista, koristeet '
      + 'renessanssia.'
    + '\n\n'
    + 'Julkisivun uusimiseen johti Colbert, seurakuntalainen, joka hoiti '
      + 'kirkon raha-asioita ja josta tuli myöhemmin Ludvig XIV:n ministeri: '
      + 'hän rakennutti 1655 tornien alle kaksi kappelia, ja julkisivu '
      + 'heikkeni niin, että se piti purkaa. Uusi julkisivu jäi kesken. '
      + 'Täällä on kastettu Richelieu ja Molière, ja nuori Ludvig XIV kävi '
      + 'täällä ensimmäisellä ehtoollisellaan 1649. '
      + 'Vallankumouksessa kirkko suljettiin ja siitä tehtiin Maanviljelyksen '
      + 'temppeli. Arkkitehti Victor Baltard johti sen korjausta 1846–1854.',
  kuvat: [
    {
      tiedosto: 'Saint Eustache.jpg',
      lyhyt: 'Saint-Eustachea alettiin rakentaa 1532 ja kirkko vihittiin 1637; goottilaista rakennetta, renessanssikoristeet.',
      selite: 'Saint-Eustachea alettiin rakentaa vuonna 1532, ja kirkko vihittiin vuonna 1637; rakenne on goottilaista ja koristeet renessanssia.',
      lahde: 'Benh LIEU SONG, Wikimedia Commons (CC BY 3.0)',
    },
  ],
  lahde: 'Wikipedia',
},
```

### Lähderivit
| Väite | Lähde 1 | Lähde 2 (+3) |
|---|---|---|
| 1532 alku; 1637 vihkiminen; julkisivu 1754 (hyväksytty virke) | paris.fr (`restauration-de-la-facade-occidentale…`): "construite à partir de 1532", "reconstruite à partir de 1754" | Structurae: 1532, 1637 "consacrée", 1754; en-Wikipedia; saint-eustache.org (22.5.1754 peruskivi) |
| Les Halles vieressä; tori siirretty Rungisiin 1969 | paris.fr ("quartier historique des Halles"); saint-eustache.org (Les Hallesin siirto Rungisiin 1969) | en-/fr-Wikipedia (Les Halles market moved to Rungis 1969); en-Wikipedia (near Les Halles) |
| Kappeli 1213 | paris.fr ("chapelle bâtie en 1213") | saint-eustache.org ("une modeste chapelle est bâtie en 1213"); en-Wikipedia |
| Seurakunta kasvoi, KAPPELI kävi pieneksi (ei "kirkko": kirkko ei vielä ollut olemassa) | saint-eustache.org ("la population ne cesse de s'accroître; il faut agrandir l'église") | en-Wikipedia ("too small for its congregation") |
| Rakennus kesti yli sata vuotta | saint-eustache.org ("plus d'un siècle") | Structurae (1532…1637); en-Wikipedia (1532–1632/37) |
| Goottilainen rakenne, renessanssikoristeet | paris.fr ("éléments gothiques… motifs décoratifs sculptés de style Renaissance") | en-Wikipedia ("structure is Flamboyant Gothic… decoration Renaissance and classical") |
| Colbert seurakuntalainen, hoiti kirkon raha-asioita (premier marguillier); myöhemmin Ludvig XIV:n ministeri (1661: Larousse "Colbert lui succède comme ministre d'État (1661)", luettu 13.11.; en-Wikipedia: myöhemmin ministeri; 1655 hän ei vielä ollut ministeri); kaksi kappelia 1655; julkisivu heikkeni, purettiin | saint-eustache.org ("En 1655, Colbert, paroissien et premier marguillier… deux chapelles sous les tours… on doit démolir la façade") | paris.fr (1655); Structurae (1655 chapelles dans les tours); en-Wikipedia |
| Uusi julkisivu jäi kesken | paris.fr ("tour sud… restée inachevée") | Structurae (Moreau-Desproux "laisse la façade inachevée"); en-Wikipedia (principal facade unfinished); fr-Wikipedia (hanke vaillinainen) |
| Richelieu ja Molière kastettu | saint-eustache.org ("Richelieu est baptisé… ainsi que Molière") | en-/fr-Wikipedia |
| Ludvig XIV ensimmäinen ehtoollinen 1649 | saint-eustache.org ("En 1649, le jeune Louis XIV fait sa première communion") | en-Wikipedia (1649); fr-Wikipedia ("vers 1649") |
| Suljettu 1793, Maanviljelyksen temppeli | saint-eustache.org ("en 1793, elle est fermée au culte catholique pour devenir temple de l'Agriculture") | en-Wikipedia (closed 1793, "Temple of Agriculture") |
| Baltard korjaus 1846–1854 | saint-eustache.org ("de 1846 à 1854… dirigée par Victor Baltard") | paris.fr ("de 1846 à 1854… Victor Baltard"); en-Wikipedia (1846–1854) |

### Poikkeamat (ei tekstiin)
- Colbertin kappelit: **fr-Wikipedia "1665"** vs saint-eustache.org, paris.fr, Structurae, en-Wikipedia 1655 (neljä) → 1655; fr-Wikipedia kirjoitusvirhe.
- Peruskivi 1532: Structurae 9.8., saint-eustache.org 19.8. → ei päivää.
- Valmistuminen: paris.fr 1634, en-Wikipedia 1632/1640, Structurae 1637 (vihkiminen) → kortissa vain vihkiminen kuten hyväksytty virke.
- Koko: en-Wikipedia "Pariisin toiseksi suurin", fr-Wikipedia "kolmanneksi suurin" → ei superlatiivia (kortti lahteet-ja-tarkistus 5).
- Julkisivun purku: Structurae 1688 vs saint-eustache.org/en-Wikipedia (heti 1655 jälkeen/ennen 1754) → ei vuotta.
- Mozartin äidin hautajaiset 1778, Berliozin Te Deum 1855, Lisztin messu 1856, 1871 palo: vain Wikipedia → jätetty pois. Les Hallesin siirto Rungisiin 1969: paris.fr + saint-eustache.org + Wikipedia (varalle, ei tekstissä).

### Valokuvaehdokkaat
1. `File:Saint Eustache.jpg` — Benh LIEU SONG, CC BY 3.0, 25.8.2007; kirkko Jardin des Hallesin puolelta (tukikaaret ja apsidi, goottilainen/renessanssi-ilme näkyy). **Ensisijainen.** Katsottu silmin. (Länsijulkisivu ei näy.)
2. `File:Église Saint-Eustache Paris 1er 001.JPG` — Moonik, CC BY-SA 3.0, 22.11.2011; länsijulkisivu (1754, vasemmalla pylväät ja torni) ja etelälaidan koristeet iltavalossa. Katsottu silmin. Sopii, jos kortin kuvan halutaan näyttävän julkisivun.
Varalla: `File:Saint Eustache church Paris P1060101.JPG` — Pline, CC BY-SA 3.0 (julkisivu ja Jardin des Halles, lasipaviljonki edessä; vähemmän puhdas).

## 3. Pompidou-keskus rakennuksena (`aika: '1972–1977'`)

Kokoelmakortti (`maa-kategoriat.js` r. 10070, nimi "Centre Pompidou — nykytaiteen kokoelma") jää ennalleen; tämä on oma kohdekortti. Ehdotus PK:lle: kokoelmakortin nimi samaan muotoon "Pompidou-keskus — nykytaiteen kokoelma" (teksti käyttää jo "Pompidou-keskus"-nimeä; r. 10073 sisältää vielä "Centre Pompidou on Pariisin nykytaiteen museo").

```js
'Pompidou-keskus': {
  aika: '1972–1977',
  teksti: 'Pompidou-keskuksen rakennustyöt alkoivat vuonna 1972, ja keskus '
      + 'avattiin vuonna 1977. Keskus on nimetty Ranskan presidentin Georges '
      + 'Pompidoun mukaan, ja sen suunnittelusta järjestettiin 1970–1971 '
      + 'kansainvälinen arkkitehtikilpailu, jonka voittivat italialainen Renzo '
      + 'Piano ja britti Richard Rogers työryhmineen.'
    + '\n\n'
    + 'Voittajat veivät rakenteet, putket, portaat ja hissit ulkopuolelle, '
      + 'jotta sisälle jäisi vapaita tasoja. Putket on maalattu käyttönsä '
      + 'mukaan: ilma on sininen, vesi vihreä, sähkö keltainen ja kulku — '
      + 'liukuportaat ja hissit — punainen. Rakennus vei vain puolet tontista, '
      + 'ja toinen puoli jäi aukioksi, jota sanotaan piazzaksi.'
    + '\n\n'
    + 'Talossa on nykytaiteen museo ja yleinen kirjasto; musiikin ja äänen '
      + 'tutkimuskeskus IRCAM toimii viereisessä rakennuksessa. Ensimmäinen peruskorjaus päättyi vuonna 2000. '
      + 'Nykyään talo on suljettu uuteen peruskorjaukseen, ja sen on määrä '
      + 'avautua uudelleen vuonna 2030.',
  kuvat: [],
  lahde: 'Wikipedia',
},
```

### Lähderivit
| Väite | Lähde 1 | Lähde 2 (+3) |
|---|---|---|
| Työt alkoivat 1972; avaus 1977 (hyväksytty virke) | centrepompidou.fr (`mediation.centrepompidou.fr/…/comment_ca_fonctionne/p3.htm`): "travaux… commencent en mai 1972", 2.2.1977 avaus | Fondazione Renzo Piano (`fondazionerenzopiano.org/en/project/centre-georges-pompidou/`): Construction 1972–1977; fr-Wikipedia 31.1.1977 vihkiäiset, 2.2. avaus |
| Nimetty presidentti Georges Pompidoun mukaan | virallinen nimi: Fondazione Renzo Piano ("Centre Georges Pompidou") | en-Wikipedia ("Centre national d'art et de culture Georges-Pompidou… President"); fr-Wikipedia (1969 presidentti päätti, laki 3.1.1975) |
| Kansainvälinen kilpailu 1970–1971 | Fondazione Renzo Piano ("international competition launched in 1970", Competition 1970–1971) | fr-Wikipedia (kilpailu julistettu joulukuussa 1970, voittaja 1971); en-Wikipedia ("selection announced in 1971") |
| Voittajat Piano ja Rogers (työryhmineen) | Fondazione Renzo Piano ("Studio Piano & Rogers") | centrepompidou.fr (p1: "Renzo Piano et Richard Rogers… équipe"); en-/fr-Wikipedia (Franchini, Happold; kortissa "työryhmineen") |
| Rakenteet ja putket ulos, vapaat tasot ("jäisi") | centrepompidou.fr (p1: "toute la structure… à l'extérieur… plateaux complètement libres") | Fondazione Renzo Piano ("open plan"); fr-Wikipedia; olemassa oleva hyväksytty kokoelmakortti |
| Värit: sininen ilma, vihreä vesi, keltainen sähkö, punainen kulku | centrepompidou.fr (p4: sininen ilma, vihreä vesi, keltainen sähkö, punainen "circulations") | en-Wikipedia (green plumbing, blue climate control, yellow electrical, red circulation/safety) |
| Piazza, puolet tontista | centrepompidou.fr (p1: piazza "occupe la moitié de l'espace") | fr-Wikipedia ("n'occuper que la moitié du terrain… piazza") |
| Museo ja kirjasto talossa | Fondazione Renzo Piano (Bpi, National Museum of Modern Art) | fr-/en-Wikipedia |
| IRCAM EI ole talossa: viereisessä rakennuksessa, place Stravinsky | Ircam.fr (luettu 13.11.): rakennus "jouxte celui du Centre Pompidou"; Ircam perustettu 1977 | fr-Wikipedia (Ircam place Stravinsky); Piano & Rogers suunnittelivat sen (Ircam.fr) |
| Peruskorjaus päättyi 2000 | Fondazione Renzo Piano (Renovation 1996–2000) | fr-Wikipedia (avattiin uudelleen 1.1.2000); en-Wikipedia |
| Suljettu uuteen peruskorjaukseen, uudelleenavaus 2030 | Euronews 11.5.2023 (`fr.euronews.com/2023/05/11/le-centre-pompidou-ferme-de-2025-a-2030`, luettu: "fermé de 2025 à 2030") ja 9.8.2025 (luettu: "réouverture est prévue pour 2030") | The Art Newspaper 11.5.2023 (luettu); en-Wikipedia |

### Poikkeamat (ei tekstiin)
- Rakennustyön alku: fr-Wikipedia "1971–1977", RSHP "1971–1977" ovat projektin vuosia → 1972 (centrepompidou.fr, Fondazione Renzo Piano).
- Tuomariston päätöksen päivä: fr-Wikipedia sanoo sekä 15.7. että 19.3.1971 → ei päivää. Ehdotusten määrä 681: fr- ja en-Wikipedia (yksi lähde) → ei lukua.
- Sulkemisen päivä: en-Wikipedia 2.3.2025 ja 22.9.2025; Euronews/muut "2025" → vain "nykyään suljettu… 2030". Remontin budjetti ja alkamisaika vaihtelevat lähteissä → ei mainita.
- Mitat (166 × 45 m, korkeus 42 m: Fondazione Renzo Piano ja fr-Wikipedia sopivat) jätetty pois koristelukuina (kortti lahteet-ja-tarkistus 4); saatavilla varalle.

### Kuva (KK 21.59)
**Pompidousta ei valokuvaa:** Ranskassa ei ole kaupallista panoraamavapautta, ja rakennus on suojattu teos (Piano elää; Rogers kuoli 2021), joten kortti on `kuvat: []`. Edellisen version ehdokkaat (Vellut, Rémih) on poistettu; ei latauksia. Tour Saint-Jacques ja Saint-Eustache säilyttävät kuvaehdokkaansa (1800-lukua vanhemmat rakennukset, ei suojaa). **Ilman miniatyyriä** (ei piirrettyä kutsuminiatyyriä, ei generointia) kaikille kolmelle.

## VANHENEE
- **Pompidou-keskus: uudelleenavaus 2030.** Kortin viimeinen virke ("nykyään suljettu… määrä avautua uudelleen vuonna 2030") vanhenee, kun keskus avataan (lähteet: Euronews 11.5.2023 ja 9.8.2025). Tarkista ennen 2030.
- Kokoelmakortti `maa-kategoriat.js` r. 10070 ("Centre Pompidou — nykytaiteen kokoelma") EI mainitse sulkemista (grep `js/packs/`: ei osumaa "suljettu"/"2030" Pompidoun yhteydessä); se kuvaa kokoelmaa ikään kuin keskus olisi auki. Kirjattu KK:lle ja PK:lle päätettäväksi: lisätäänkö sulkemishuomio vai jätetäänkö se.

## Tila ja seuraava
- Kolme korttia valmiina tarkistukseen; jokainen tekstin väite on kahdesta itsenäisestä lähteestä (pyhäinjäännöslause pudotettu, koska vain Wikipedia). Tour Saint-Jacques 1523: Villain 1758 -ehto kuten 13.25.
- Dataa ei viety; PK:lle ei viestiä (KK 13.41).
- Käytetyt lähteet: paris.fr (Tour Saint-Jacques, Saint-Eustache), Mérimée/POP PA00086479, saint-eustache.org (histoire), Structurae, centrepompidou.fr (mediation), Fondazione Renzo Piano, Euronews (2023, 2025), The Art Newspaper, en-/fr-Wikipedia, Wikimedia Commons API (lisenssit).
