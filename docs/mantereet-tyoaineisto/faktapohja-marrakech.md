# Marrakech — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `marrakech`, en-Wikipedia
"Marrakesh". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Mitat ja säännöt luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/agentin-yhteiset-saannot.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`,
`docs/mantereet-tyoaineisto/spec-mantereet.md` ja
`docs/tyolista-opukselle.md`. Esikuvana `faktapohja-halifax.md` ja
repon tuorein lehtilohko (halifax).

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Marrakesh"**
(Etymology, History, Geography, Climate, Water, Economy, Tourism,
Landmarks, Culture, Transport), **"Jemaa el-Fnaa"**, **"Kutubiyya
Mosque"**, **"Saadian Tombs"**, **"Bahia Palace"**, **"El Badi
Palace"**, **"Ben Youssef Madrasa"**, **"Majorelle Garden"**,
**"Menara Gardens"**, **"Almoravid Qubba"**, **"Bab Agnaou"**,
**"Marrakech Museum"**, **"Dar Si Said"**, **"Agdal Gardens"**,
**"Dar el Bacha"**, **"Mouassine Fountain"**.

## 0. Mitä repossa jo on (luettu ristiriitojen varalta)

- `js/packs/africa-artikkelit.js` avain **Marrakech**: `intro` on
  vanhaa mallia (3 virkettä), `artikkeli` kolmiosainen. Resepti
  vaatii 7–10 virkkeen etusivun leipätekstin → **intro kirjoitetaan
  uusiksi, `artikkeli` jätetään ennalleen.**
- `js/packs/africa-saapumiset.js` avain `marrakech`: valmis
  (punainen savi, rummut, Atlaksen lumihuiput, tarinankertojan
  piiri). **Ei kosketa.**
- `js/packs/africa-kulttuuri.js` avain `marrakech`: litteät nostot
  (Jemaa el-Fna, halqa, tajine) ja **kulttuurivisa: "Ketkä kokoavat
  yleisön piiriin Jemaa el-Fnan torilla iltaisin?" →
  tarinankertojat.** Visan vastaus on siis oltava kansisivun
  nostoissa; **minitehtävä ei saa kysyä tarinankertojista.**
- `js/packs/africa-valokuvat.js` avain `marrakech`: ennen–nyt-pari
  tarkistettu (Koutoubian minareetti noin 1924 / sama minareetti
  2025) ja lisäkuvina Jemaa el-Fna 2024, tarinapiiri 2007 ja
  Toubkalin massiivi 2017. **Ennen–nyt kopioidaan lehteen
  tiedostoineen, vuosineen ja lähteineen, selitteet kirjoitetaan
  uusiksi yhdeksi virkkeeksi.**
- `js/packs/maastokohteet-mar.js`, `js/packs/skandaalit.js` ja
  `js/packs/maa-kategoriat.js` **MAR** luettu; maalehden aiheet
  lueteltu `faktapohja-tanger.md`:n osiossa 0. **Marrakechin nostot
  eivät toista niitä** — erityisesti maalehden Käsityö-sivu kertoo
  jo Fèsin parkitsemosta, zellijistä ja Safin savesta, ja
  Musiikki-sivu al-Alasta, malhunista, Nass El Ghiwanesta ja
  ahwashista.

## 1. Perustiedot ja nimi

- Marrakech sijaitsee Tensift-joen laaksossa, joki kulkee kaupungin
  pohjoisreunaa. Ourikan laakso on noin 30 km etelään.
  **Lumihuippuisen Korkean Atlaksen keskikorkeus on yli 3000 m**, ja
  vuoristo koostuu pääosin jurakauden kalkkikivestä. (Geography.)
- Nimen merkitys on kiistanalainen: yksi selitys on berberin
  *amur n akuc*, "Jumalan maa". Historioitsija Susan Searightin
  mukaan nimi on ensi kerran kirjattu **1000-luvun käsikirjoituksessa
  Fèsin Qarawiyyinin kirjastossa**, jossa merkitykseksi annetaan
  "Kushin poikien maa". (Etymology.)
- **Keskiajalta 1900-luvun alkuun koko Marokkoa kutsuttiin nimellä
  "Marrakechin kuningaskunta"**, ja Marokon eurooppalaiset nimet
  (Marruecos, Marrocos, Maroc, Marokko) johtuvat suoraan nimestä
  *Murrākuš*. Persiaksi ja urduksi Marokko on yhä "Marrakesh".
  Nimet erkanivat vasta Fèsin sopimuksen jälkeen, ja vanha
  päällekkäiskäyttö jatkui laajalti noin vuoteen 1953–1955.
  (Etymology.)
- Lisänimiä: **punainen kaupunki** (al-Madīnat al-Ḥamrāʾ),
  okrakaupunki ja aavikon tytär. (Etymology.)

## 2. Perustaminen ja keisarikaudet

- Alue oli berberiviljelijöiden asuttama neoliittiselta ajalta;
  kivityökaluja on löydetty runsaasti. **Kaupungin perusti Abu Bakr
  ibn Umar**, almoravidikuningas Yusuf ibn Tashfinin serkku.
  Lähteet antavat vuosiksi **1062 (Ibn Abi Zar, Ibn Khaldun) ja 1078
  (al-Idrisi); nykyhistorioitsijat käyttävät useimmiten vuotta
  1070.** *Ristiriita kirjoitetaan auki lukijalle.* (History.)
- Almoravidien emiraatti ulottui Senegalin reunalta Espanjan
  keskiosiin ja Atlantilta Algeriin. Ensimmäisiä rakennuksia oli
  linnoitettu residenssi **Ksar al-Hajjar** nykyisen Koutoubian
  vieressä. **Nykyinen Jemaa el-Fna syntyi almoravidipalatsin
  porttien edessä olleesta aukiosta (Rahbat al-Ksar)**, ja suurimmat
  sukit kehittyivät tämän aukion ja kaupungin päämoskeijan väliin,
  missä ne ovat yhä. Andalusialaiset käsityöläiset Cordobasta ja
  Sevillasta rakensivat ja koristivat monumentteja; cordobalainen
  umaijadityyli yhdistyi Saharan ja Länsi-Afrikan muotokieleen.
- **Ali ibn Yusuf rakensi Ben Youssefin moskeijan 1120–1132**,
  **muuritti kaupungin ensimmäisen kerran 1126–1127** ja laajensi
  vesihuoltoa maanalaisella **khettara**-järjestelmällä.
- Ibn Tumart asettui **1125** Tin Maliin ja perusti almohadiliikkeen;
  Marrakechin piiritys 1130 epäonnistui. **Abd al-Mu'min valtasi
  kaupungin 1147** usean kuukauden piirityksen jälkeen ja teki siitä
  almohadien pääkaupungin. **Koutoubian moskeija perustettiin
  1147**, **Menaran puutarhat 1157**, ja Abu Ya'qub Yusuf
  (1163–1184) aloitti **Agdalin puutarhat**. **Ya'qub al-Mansur
  (1184–1199) rakensi kasbahin** eli linnoitetun palatsikorttelin
  kaupungin eteläpuolelle. Kaupungissa vieraili mm. **Averroes**.
- Yusuf II:n kuolema 1224 aloitti epävakaan kauden. **Marinidit
  valloittivat Marrakechin 1269**, ja pääkaupungiksi tuli Fès;
  Marrakech taantui suhteellisesti.
- **1500-luvun alussa Marrakech oli taas Marokon pääkaupunki.**
  Saadilaissulttaanien Abdallah al-Ghalibin ja Ahmad al-Mansurin
  aikana koettiin uusi kulta-aika.

## 3. Isoisän matkavuosi 1873

- **"Vuoteen 1867 asti eurooppalaisilta kristityiltä oli kielletty
  pääsy kaupunkiin ilman sulttaanin erityislupaa; itäeurooppalaiset
  juutalaiset saivat tulla."** (History, Saadi period -osion loppu.)
  Isoisän matkavuonna 1873 kaupunki oli siis ollut eurooppalaisille
  matkustajille avoin vasta muutaman vuoden.
- **Seitsemän pyhimyksen perinne:** Marrakech tunnetaan Marokon
  seitsemän suojeluspyhimyksen hautojen kaupunkina (*sabʿatu
  rijāl*). Sufilaisuuden ollessa suosionsa huipulla Moulay Ismailin
  hallituskaudella 1600-luvun lopulla **Abu Ali al-Hassan al-Yusi
  perusti pyhimysjuhlan sulttaanin pyynnöstä**, ja tunnettujen
  hahmojen hautoja siirrettiin Marrakechiin pyhiinvaeltajien
  houkuttelemiseksi. Pyhiinvaellus kiertää haudat määrätyssä
  järjestyksessä: Sidi Yusuf ibn Ali Sanhaji (1196–97),
  qadi Iyyad (1083–1149), Sidi Bel Abbas (1130–1204, kaupungin
  suojeluspyhimys ja seudun kunnioitetuin), Sidi Muhammad
  al-Jazuli (k. 1465), Abdelaziz al-Tebaa (k. 1508), Abdallah
  al-Ghazwani (k. 1528) ja Abu al-Qasim al-Suhayli (k. 1185).
  **Ziyara kestää seitsemän päivää.**
- 1900-luvun alussa Bahian palatsi oli juuri valmistumassa;
  **suurvisiiri Ba Ahmed hallitsi tosiasiassa Marokkoa 1894–1900**
  nuoren sulttaani Abdelazizin puolesta.

## 4. 1900-luku

- Émile Mauchamp murhattiin Marrakechissa **1907**; Ranska käytti
  tapausta verukkeena joukkojen lähettämiseen Algeriasta Oujdaan.
  **Ranskan protektoraatti perustettiin 30. maaliskuuta 1912**, ja
  ranskalaiset ottivat Marrakechin Sidi Bou Othmanin taistelun
  jälkeen syyskuussa 1912.
- **T'hami El Glaoui, "Atlaksen herra", oli Marrakechin pasha
  käytännössä koko protektoraatin ajan 1912–1956.** Mohammed Ben
  Youssef sai palata maanpaosta marraskuussa 1955, mikä päätti
  Glaouin vallan; **itsenäisyyspöytäkirja allekirjoitettiin
  2. maaliskuuta 1956**.
- **Unesco julisti Marrakechin vanhankaupungin
  maailmanperintökohteeksi 1985.** Medinan väestöosuus laski: 1984
  medinassa asui noin 51 % kaupungin väestöstä, 2004 enää 22 %.
- 1960- ja 1970-luvuilla kaupungista tuli muotipaikka
  taiteilijoille ja muusikoille; **Yves Saint Laurent osti
  Majorellen puutarhan ja kunnosti sen.**
- **Marrakeshin sopimus Maailman kauppajärjestön perustamisesta
  allekirjoitettiin täällä 15. huhtikuuta 1994**, ja maaliskuussa
  1997 kaupunki isännöi Maailman vesineuvoston ensimmäistä
  vesifoorumia (yli 500 osallistujaa).
- **Syyskuun 2023 maanjäristys** vaurioitti kaupunkia; useita
  monumentteja suljettiin korjausten ajaksi ja avattiin uudelleen
  lokakuussa 2023 (El Badi, Saadilaisten haudat) tai marraskuussa
  2023 (Dar el Bacha). Dar Si Saidin arvioitiin tarvitsevan
  vähintään puoli vuotta korjauksia. **Käsitellään neutraalina
  luonnontapahtumana ja vain matkaoppaan käytännön tietona; ei
  uhrilukuja eikä yksityiskohtia.** Vuoden 2011 pommi-isku EI ole
  lehden aihe (ei nykyrikollisuutta eikä -politiikkaa).

## 5. Jemaa el-Fna (kulttuurivisan aihe)

- Nimen alkuperä on epäselvä: *jamaa* on "kokoontuminen" tai
  "moskeija", *fna* voi tarkoittaa kuolemaa, tuhoa tai rakennuksen
  edustan avointa tilaa. **Historioitsijoiden kannattama selitys:
  saadilaissulttaani Ahmad al-Mansur aloitti aukiolle
  monumentaalisen perjantaimoskeijan, mutta rakennus jäi kesken
  (todennäköisesti ruttoepidemioiden takia), rappeutui raunioiksi ja
  antoi aukiolle nimen "raunioituneen moskeijan aukio".** Raunion
  ääriviivat näkyivät vielä 1800-luvulla. Nimi esiintyy ensi kerran
  1600-luvulla länsiafrikkalaisen historioitsijan Abderrahman
  as-Sa'idin kronikassa.
- Aukio oli alun perin **Rahbat al-Ksar**, almoravidilinnoituksen
  itäpuolinen markkinatila. Almoravidiemiiri Ali ibn Yusuf rakensi
  linnoituksen eteläpuolelle palatsin, jonka itäpuolella oli
  monumentaalinen kiviportti; hallitsija saattoi istua portin
  edessä jakamassa oikeutta viikoittain. Siksi aukiosta tuli
  julkisten teloitusten, sotilasparaatien ja juhlien paikka.
- **24. tammikuuta 1864 aukion alueella tapahtui suuri räjähdys**:
  funduqin tulipalo sytytti 500 kvintaalia siellä vaarallisesti
  säilytettyä ruutia. Räjähdys vaurioitti taloja laajalta alueelta.
  (Uhriluku 300 — *lehteen ei kirjoiteta uhrilukua*.)
- Päivällä aukiolla on appelsiinimehukojuja, vedenmyyjiä nahkaisine
  vesisäkkeineen ja messinkikuppeineen sekä käärmeenlumoajia.
  Illalla lumoajat lähtevät ja tilalle tulevat tanssijat,
  **tarinankertojat, taikurit ja perinnelääkkeiden kauppiaat**;
  pimeän tullen aukio täyttyy kymmenistä ruokakojuista.
- **1922 (Ranskan hallinnon aikana) säädettiin ensimmäiset lait
  aukion kulttuuritilan suojelemiseksi. Unesco julisti aukion
  suulliseksi ja aineettomaksi kulttuuriperinnöksi 2001, ja 2008 se
  liitettiin ihmiskunnan aineettoman kulttuuriperinnön
  luetteloon.** **Koko Unescon "Masterpieces of the Oral and
  Intangible Heritage of Humanity" -ohjelman idea syntyi juuri
  Jemaa el-Fnaa koskeneesta huolesta** — asukkaat vaativat
  kansainvälistä tunnustusta "kulttuuritilojen" suojelemiseksi.

## 6. Koutoubia, muurit ja portit

- **Koutoubian moskeija perustettiin 1147** (Abd al-Mu'min);
  toinen versio rakennettiin kokonaan uudelleen noin 1158, ja
  **Ya'qub al-Mansur viimeisteli minareetin mahdollisesti noin
  1195**. **Minareetti on 77 metriä ja kaupungin korkein**; se
  vaikutti todennäköisesti Sevillan Giraldaan ja Rabatin Hassanin
  torniin.
- **Muurit rakensivat almoravidit 1100-luvulla; ne kiertävät
  medinaa noin 19 km, ovat oranssinpunaista savea ja kalkkia** — ja
  antavat kaupungille punaisen kaupungin lisänimen. **20 porttia ja
  200 tornia.**
- **Bab Agnaou** on Ya'qub al-Mansurin rakennuttama, valmistunut
  noin **1188–1190**, ja se oli kuninkaallisen kasbahin pääportti.
  Nimen *agnaou* uskotaan olevan berberiä; raportoituja merkityksiä
  ovat "mykät" ja myöhemmin "mustat ihmiset" (gnawa) sekä
  "sarveton lammas" — täsmällinen merkitys on epäselvä.
  Portti oli alun perin kahden bastionin välissä ja sen käytävä
  kääntyi 90 astetta holvatun eteisen kautta; bastionit ja eteinen
  ovat kadonneet, ja kaariaukko on osin muurattu umpeen pienemmäksi
  tiilikaareksi (todennäköisesti Sidi Muhammad ibn Abdallahin
  aikana). Julkisivu on hiekkakiveä, luultavasti louhittu Guelizin
  alueelta; koristelu on kaiverrettua kiveä, ja kehyksenä on
  **Koraanin al-Hijr-suuran katkelmia lehväkufilaisin kirjaimin**.
  Kivi kärsii liukoisista suoloista ja ilmansaasteista.

## 7. Kohdekartan kahdeksan kohdetta (koordinaatit ja perustelut)

Koordinaatit en-Wikipedian `list=geosearch`-rajapinnasta 7.9.2026.
Pienin keskinäinen väli on **190 m (Saadilaisten haudat – Bab
Agnaou)**; kaikki muut yli 240 m. Väli on alle Halifaxin 200 metrin
nyrkkisäännön, mutta kartan ruutu on vain 2,2 × 1,6 km eli
kolmasosa Halifaxin ruudusta, joten merkit erottuvat — tarkistettu
silmin valmiista kuvasta.

| # | Kohde | lat | lon |
| --- | --- | --- | --- |
| 1 | Ben Youssefin medresa | 31.631944 | −7.986194 |
| 2 | Dar el Bacha | 31.631573 | −7.992403 |
| 3 | Mouassinen suihkulähde | 31.630000 | −7.989444 |
| 4 | Dar Si Said | 31.623333 | −7.983806 |
| 5 | Bahian palatsi | 31.621592 | −7.982231 |
| 6 | El Badin palatsi | 31.618300 | −7.985800 |
| 7 | Saadilaisten haudat | 31.617300 | −7.988702 |
| 8 | Bab Agnaou | 31.617500 | −7.990700 |

**Pois jätetyt ja miksi.** *Jemaa el-Fna* ja *Koutoubia* ovat lehden
omien nostojen aiheita. *Almoravidien qubba* (107 m medresasta),
*Marrakechin museo* (96 m) ja *Ben Youssefin moskeija* (54 m) ovat
kaikki samassa korttelissa medresan kanssa — vain yksi otetaan.
*Mellahin Slat al-Azaman synagoga* on 165 m Bahian palatsista.
*Menaran ja Agdalin puutarhat* ovat lehden teemasivun aihe ja
kaukana ruudun ulkopuolella.

Kohteiden faktat (en-Wikipedia 7.9.2026):

1. **Ben Youssefin medresa.** Nimetty viereisen Ben Youssefin
   moskeijan mukaan; **saadilaissulttaani Abdallah al-Ghalib
   tilasi sen ja se valmistui 1564–65** (972 AH), mistä on
   piirtokirjoitus. Paikan ensimmäisen medresan perusti al-Ifranin
   mukaan marinidisulttaani Abu al-Hasan (1331–1348). **Valmistuttuaan
   se oli Maghrebin suurin medresa: 130 opiskelijahuonetta ja jopa
   800 opiskelijaa.** Pohja on lähes neliö, noin **40 × 43 metriä**;
   keskellä pihaa on matala peiliallas noin 3 × 7 metriä,
   kaakkoispäässä rukoussali. Pesuhuoneessa oli neljä
   marmoripylvästä ja keskellä nelikulmainen allas; **siellä Jean
   Gallotti pani 1921 merkille 1000-luvun cordobalaisen
   marmorialtaan.** Suljettiin 1960, avattiin yleisölle
   historiallisena kohteena 1982, suljettiin taas marraskuussa 2018
   ja avattiin huhtikuussa 2022.
2. **Dar el Bacha** ("pashan talo"). **Rakennettu 1910**; T'hami El
   Glaouin residenssi — hänet nimitti Marrakechin pashaksi sulttaani
   Moulay Youssef 1912. Ylellinen yksityispalatsi vieraiden
   vaikuttamiseksi. **Fondation nationale des musées kunnosti sen
   Musée des Confluences -museoksi, jonka Mohammed VI vihki
   9. heinäkuuta 2017.** Suorakaiteinen sisäpiha, jonka riad-puutarha
   on jaettu neljään osaan; joka sivulla pylväikön edeltämä sali,
   lisäksi hammam, palvelutilat (douiria) ja perheen puoli.
   Zellij-mosaiikkia, kaiverrettua stukkoa, kaiverretut ja maalatut
   setripuiset ovet ja katot. Yksi ensimmäisistä Marrakechin
   palatseista, joissa oli näyttävä ulkokoristelu.
3. **Mouassinen suihkulähde.** Osa Mouassinen moskeijan
   kokonaisuutta, jonka Abdallah al-Ghalib rakennutti **1562–63 →
   1572–73**; kokonaisuuteen kuuluivat moskeija, kirjasto,
   pesuhuone (mîdhâ), hammam, koraanikoulu ja suihkulähde.
   **Medinan 45 juomavesilähteestä tämä on suurimpia.**
   Suihkulähteen viereen rakennettiin kolme kaarta, joiden takana
   olivat eläinten juottokaukalot — suuri lähde ihmisille, kaukalot
   varsinkin aaseille. **Neljä kaarta yhdessä vievät 18,1 × 4,7
   metrin tilan.** Setripuinen kaari ja ulkoneva katos, maalattuja
   ja taltattuja kasviaiheita; sisällä laaja stukkofriisi, jonka
   kahdeksansakaraista tähtikuviota kutsutaan nimellä "Mtemmen
   maa'kous", ja kapeammissa friiseissä toistuu ylistys
   "kunnia Jumalalle". Vedenanto on islamilaisessa maailmassa
   kunnioitetuimpia almuja.
4. **Dar Si Said.** Rakennettu **1894–1900**; rakennuttaja Si Sa'id
   ibn Musa oli veljensä Ba Ahmadin, käytännössä Marokkoa
   hallinneen suurvisiirin, sotaministeri. Vuoden 1914 jälkeen
   Ranskan protektoraatin aikana Marrakechin aluejohdon toimipaikka,
   **museoksi 1930 tai 1932** (alkuperäistaide ja puutyöt), 1957
   jaettu museoksi ja käsityöviraston tiloiksi. **Avattiin 2018
   uudelleen kansallisena kudonnan ja mattojen museona.**
   Rakennettu useaan kerrokseen (toisin kuin Bahia), ylimmässä
   kerroksessa suuri vastaanottosali ja suuri riad-puutarha, jonka
   keskellä maalatun puun paviljonki. Kokoelmaan kuului
   **Madinat al-Zahrassa 1002–1007 tehty andalusialainen
   marmoriallas**, joka on palautettu Ben Youssefin medresaan.
   Vaurioitui syyskuun 2023 maanjäristyksessä.
5. **Bahian palatsi.** Aloitti **Si Musa**, sulttaani Muhammad ibn
   Abd al-Rahmanin (hallitsi 1859–1873) suurvisiiri, **1860-luvulla**;
   Grand Riadin sivuhuoneiden piirtokirjoitus ajoittaa ne vuosiin
   **1866–67**. Poika **Ba Ahmed** laajensi palatsia **1894–1900**
   ollessaan Moulay Abdelazizin suurvisiiri ja käytännössä maan
   hallitsija. **Noin 150 huonetta** useiden sisäpihojen ja
   riad-puutarhojen ympärillä; kuuluisin koristeistaan, etenkin
   maalatuista puukatoista, veistetystä stukosta ja zellijistä.
   Marmoripäällysteinen suuri piha on vuosilta **1896–97**.
   Arkkitehti oli **Muhammad ibn Makki al-Misfiwi** (1857–1926)
   Safista. Nimi *al-Bahia*, "loistava", oli kuulemma Ba Ahmedin
   lempivaimon nimi. **Koko palatsi rakennettiin yhteen tasoon**,
   mahdollisesti siksi että Ba Ahmedin oli vaikea kulkea portaissa.
   Si Musa polveutui makhzenia palvelleesta orjasuvusta, joka nousi
   maan korkeimpiin virkoihin.
6. **El Badin palatsi** ("verraton"; nimi on yksi Jumalan 99
   nimestä). **Ahmad al-Mansur tilasi sen muutama kuukausi
   valtaannousunsa jälkeen 1578**, ja rakentaminen alkoi al-Ifranin
   mukaan joulukuussa 1578 ja kesti viisitoista vuotta vuoteen 1593;
   Gaston Deverdun huomauttaa, että **vuoden 1585 "portugalilainen
   pohjapiirros" näyttää palatsin jo valmiina**, vaikka al-Mansur
   osti marmoria vielä 1602 — pääosat siis valmiit 1580-luvun
   alussa ja koristelu jatkui kuolemaan asti. *Ristiriita
   kirjoitetaan auki.* Rahoitus tuli todennäköisesti Portugalin
   maksamista lunnaista kolmen kuninkaan taistelun (1578) jälkeen ja
   sokerikaupasta. **Marmoripylväät tuotiin Italiasta, kalkki ja
   kipsi Timbuktusta**; työväkeä haettiin Eurooppaa myöten, ja
   työmaan viereen syntyi oma markkinapaikka. Al-Mansur järjesti
   työläisilleen lastenhoitoa, jotta työ ei keskeytyisi.
   Al-Mansurin kuoltua 1603 palatsi rappeutui; **Moulay Ismail
   määräsi 1707–08 sen purettavaksi ja materiaalit siirrettiin
   Meknèsiin**, joskin purku tapahtui todellisuudessa vähitellen.
   Raunioista tuli laidunmaa ja pöllöjen tyyssija. Nykyään
   näyttelytila, jossa on esillä **Koutoubian moskeijan 1100-luvun
   almoravidiminbar**. Vaurioitui 2023, avattiin uudelleen
   lokakuussa 2023.
7. **Saadilaisten haudat.** Kuninkaallinen nekropoli Kasbahin
   moskeijan eteläpuolella. Paikka lienee ollut hautausmaa jo
   almohadien aikaan; **marinidisulttaani Abu al-Hasan haudattiin
   tänne väliaikaisesti 1351**, ja hänen marmorinen hautakivensä on
   yhä Kolmen syvennyksen kammiossa. Itäinen mausoleumi rakennettiin
   ensin, **Abdallah al-Ghalibin toimesta 1557–1574**, kunnioittamaan
   hänen isäänsä Muhammad al-Shaykhia. Kokonaisuus ajoittuu
   pääosin **Ahmad al-Mansurin aikaan (1578–1603)**. Kaksi
   rakennusta puutarhan ympäröiminä; tärkeimmät haudat ovat hienosti
   kaiverrettua marmoria, muut värikästä zellijiä. **Al-Mansurin
   hautakammiossa on kaiverrettu ja maalattu setripuinen katto
   kahdentoista carraranmarmorisen pylvään varassa.**
   **Nekropoli eristettiin ympäröivistä kaduista ja jäi pois
   käytöstä, kunnes Marokon Service des Beaux-Arts "löysi" sen
   uudelleen 1917** ja aloitti tarkan ennallistuksen käyttäen
   säilyneitä osia mallina; samalla paikka avattiin ensi kertaa
   yleisölle. Vaurioitui 2023 (pahiten viereiset rakenteet), avattu
   lokakuussa 2023.
8. **Bab Agnaou** — ks. osio 6.

## 8. Teemasivun aineisto: vesi, puutarhat ja vuoret

- **Khettara** on almoravidien rakentama maanalainen
  kuivatustunneli, joka tuo pohjaveden maan pintaan ja jakaa sen
  kaupunkiin ja pelloille. Se koostuu **pystykuiluista, jotka
  yhdistyvät loivasti viettävään tunneliin**; kuilut kaivetaan
  ensin ja toimivat sen jälkeen tuuletuksena ja huoltoreittinä.
  Vesi vietiin sisternoihin ja altaisiin, moskeijoiden
  pesuhuoneisiin, hammameihin ja suihkulähteisiin. Pohjaveden pinnan
  lasku ja väestönkasvu ovat tehneet järjestelmästä riittämättömän,
  ja se on hylätty; khettaroita pidetään marokkolaisena
  kulttuuriperintönä ja niiden säilyttämistä on vaadittu.
  ("Mouassine Fountain", Water source: khettara.)
- **Menaran puutarhat perustettiin 1157** (Abd al-Mu'min); ne ovat
  suuren vesialtaan ympärillä hedelmätarhojen ja oliivilehtojen
  keskellä, ja **altaan reunalla on 1800-luvun paviljonki**.
  **Pinta-ala noin 96 hehtaaria.**
- **Agdalin puutarhat** perustettiin Abu Ya'qub Yusufin aikana
  (1163–1184); useita vesialtaita ja palatsirakenteita,
  **noin 340 hehtaaria**, ympärillä savimuurien kehä.
  **Molempien altaat saivat vetensä khettaroista**, jotka toivat
  veden Atlasvuorten juurelta.
- **Majorellen puutarha** oli maisemamaalari **Jacques Majorellen**
  koti; Yves Saint Laurent osti ja kunnosti sen. **Avoinna
  yleisölle vuodesta 1947**; kokoelmassa kasveja viideltä
  mantereelta, mm. kaktuksia, palmuja ja bambua. Tummansinisessä
  rakennuksessa toimi islamilaisen taiteen museo, ja Majorellen
  huvila muutettiin **berberimuseoksi 2011**.
- Koutoubian puutarhoissa on appelsiini- ja palmupuita, ja niissä
  viihtyvät **kattohaikarat**. Mamounian puutarhat ovat yli sata
  vuotta vanhat.
- **Vesitilanne:** pohjavesivarat ovat laskeneet asteittain 40
  vuoden ajan ja jyrkästi 2000-luvun alussa. **Vuodesta 2002 pinta
  on laskenut keskimäärin 0,9 metriä vuodessa 80 prosentilla
  Marrakechin alueesta**, ja pahimmalla alueella yhteensä 37 metriä
  (yli 2 m vuodessa). (Water.)
- **Ilmasto** on kuuma puoliaava (Köppen **BSh**): pitkät kuumat ja
  kuivat kesät, lyhyet leudot tai viileät talvet. **Vuosien
  1961–1990 keskisade 281,3 mm.** Sääruudun luvut: vuoden
  keskilämpö **20,6 °C**, keskiylin 27,6 °C, keskialin 13,6 °C;
  heinäkuun keskiylin **37,7 °C**, tammikuun 19,1 °C.
  **Ennätyslämpö 49,6 °C heinäkuussa, ennätyspakkanen −3,6 °C
  tammikuussa.** Sadetta **221,0 mm vuodessa ja 29,1 sadepäivää**;
  aurinkoa tammikuussa 230,1 ja heinäkuussa 330,4 tuntia.
  Maantieteilijä Barrows huomautti, ettei seutu ole aavikkoa vaan
  kausisateiden aluetta, **jossa kosteus liikkuu maan alla eikä
  pintavesinä** — ja että Atlaksen pohjoispuolinen sijainti estää
  kutsumasta Marrakechia aavikkokaupungiksi.

## 9. Sukit, ruoka ja matkaopas

- **Marokon suurin perinteinen markkina.** Sukit jakautuivat
  historiallisesti tavaralajeittain (nahka, matot, metallityöt,
  keramiikka), ja jako on yhä suunnilleen voimassa. **18 sukia,
  yli 40 000 työntekijää.** Tinkiminen on olennainen osa kauppaa.
  Ensemble Artisanal Koutoubian lähellä on valtion ylläpitämä
  käsityökeskus, jonka takaosassa opetetaan nuoria oppipoikia.
- **Mechouar Alley** eli Mechoui-kuja on kuulu hitaasti paahdetusta
  lampaasta.
- **Tanjia marrakshia** on kaupungin oma ruoka ja sen keittiön
  symboli, hellästi *bint ar-rimad*, "tuhkan tytär": naudanlihaa,
  mausteita ja smeniä hitaasti kypsennettynä keraamisessa ruukussa
  kuumassa tuhkassa.
- Jälkiruokia ovat **chebakia** (seesamileivos, tarjotaan yleensä
  ramadanin aikaan), kuivattuja hedelmiä filotaikinassa ja
  taatelijuustokakku. Katkarapu-, kana- ja sitruunatäytteiset
  **briouat**it ovat kaupungin erikoisuus. Jemaa el-Fnan kojuilla
  myydään keftaa, maksaa, merguezia ja sisälmyspataa.
- **Minttutee** kaadetaan kaarevasta nokasta pieniin laseihin
  sokerin kera.
- **Liikenne.** Kaupunkiin tulee rata pohjoisesta (Tanger–Marrakech,
  ONCF); lisätiedot Tangerin faktapohjassa. Turisteja yli
  **kaksi miljoonaa vuodessa**; **yli 400 hotellia**. Riad on
  marokkolainen kaupunkitalo, jossa on korkeiden muurien ympäröimä
  sisäpuutarha — malli on roomalaisesta huvilasta, ja rakenne antaa
  yksityisyyttä ja viilentää taloa. Vanhimmat dokumentoidut riadit
  ovat saadilaisajalta (1500–1600-luku).
- **La Mamounia** on vuonna 1925 rakennettu art deco- ja
  marokkolaistyylin yhdistelmä; Winston Churchill maalasi sen
  puutarhoissa.

## 10. Minitehtävä ja visa

Visa kysyy Jemaa el-Fnan tarinankertojista → **minitehtävä ei saa
kysyä torista eikä tarinankertojista.** Teemasivun tehtäväksi
ehdotetaan khettaran toimintaperiaatetta tai Menaran puutarhojen
perustamisvuotta 1157; kummankin vastaus on samalla sivulla.

## 11. Sisältörajaukset

Ei nykypolitiikkaa, ei nykyrikollisuutta, ei vuoden 2011 iskua.
Uskonto historiallis-kulttuurisena ilmiönä ja kunnioittavasti.
Orjuus mainitaan vain siltä osin kuin lähde sen kertoo
(saadilaisten sokeriteollisuus, Si Musan suku) ja neutraalisti,
ilman yksityiskohtia. Maanjäristys todetaan tapahtumana ilman
uhrilukuja.
