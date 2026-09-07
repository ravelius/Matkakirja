# Kano — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `kano`, maa NGA, en-Wikipedia "Kano".
Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Malli ja mitat luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`, `tools/parvi/kohdekartta-ohje.md`,
`docs/moduulit/kaupunkilehti.md`, `docs/aasia-tyoaineisto/
lehtityo-resepti.md` ja `docs/mantereet-tyoaineisto/spec-mantereet.md`.
Malli: Lagosin ja Fèsin lehdet (v1670).

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Kano (city)"**,
**"Kano Chronicle"**, **"Kano Emirate"**, **"Dalla Hill"**,
**"Kurmi Market"**, **"Gidan Rumfa"**, **"Great Mosque of Kano"**,
**"Gidan Makama Museum Kano"**, **"Ancient Kano City Walls"**,
**"Gates of Hausa kingdoms"**, **"Kofar Mata Dye Pits"**,
**"Muhammad Rumfa"**, **"Durbar festival"**, **"Morocco leather"**,
**"Hausa architecture"**, **"Trans-Saharan trade"**,
**"Sokoto Caliphate"**, **"Heinrich Barth"**, **"Sabon Gari"**,
**"Sabon Gari Market"**, **"Sani Abacha Stadium"**,
**"Kano Pillars F.C."**, **"Fagge"**, **"Kano State"**,
**"Bayero University Kano"**, **"Hausa-language cinema"**,
**"Harmattan"**.

## 0. Rajaus tälle lehdelle

**Nigerian maalehti (js/packs/maa-kategoriat.js, NGA) on jo tehty, ja
sen aiheita EI toisteta.** Maalehti kertoo: **Amina ja Zazzaun
savimuurit**, Oyon tyhjä kalebassi, **Nana Asmaʼu ja jajit
(Sokoto)**, vuoden 1929 naisten sota; jollof, suya, egusi, iyán;
puhuva rumpu, banjon juuret, Grammy-ehdokkuus, afrobeat; Ifen päät,
Beninin ovi, Ben Enwonwu, **adire eli jorubanaisten sitomalla ja
liottamalla värjäämä indigokangas Abeokutassa ja Ibadanissa**;
Tutuola, Achebe, Soyinka, Onitshan toriproosa.

**Indigo esiintyy siis maalehdessä, mutta aivan eri asiana:** adire on
**joruban** kangastekniikka Lounais-Nigeriassa (adi = sitoa, re =
liottaa), kun taas Kanon Kofar Matan kuopat ovat **hausalainen
värjäämölaitos** ja maailman pitkäikäisimpiä. Ero sanotaan ääneen
lohkokommentissa, eikä adiren tekniikkaa selosteta uudestaan.

**Karttanostot on luettu eikä niitä toisteta:**
`js/packs/maastokohteet-nga.js` (Chappal Waddi, Guineanlahti,
Nigerjoki, Benue, Sukur, Osun-Osogbo, Zuma Rock, Igbo-Ukwu, Yankari,
Kainji, Nok, Badagry) ja `js/packs/skandaalit.js` NGA (Beninin
retkikunta 1897, Jaja, Lugardin protektoraatti).
`js/packs/elaintakyt.js` NGA: drilli.

**Lagosin kaupunkilehti (v1670) on luettu kokonaan.** Se kertoo
aworien perustamistarusta, Beninin sotaleiristä, vuoden 1861
luovutussopimuksesta, saro- ja aguda-paluumuuttajista, Shitta-Beyn
moskeijasta, Eyo-kulkueesta, laguunista, Makokosta, silloista ja
Lekin luonnonsuojelukeskuksesta. **Yksikään Kanon aihe ei ole sama.**
Ainoa kosketuskohta on siirtomaakausi, ja se kerrotaan Kanossa
pohjoisen näkökulmasta (Sokoton kalifaatti, epäsuora hallinto),
Lagosissa rannikon.

**Tämä lehti pysyy kaupungissa:** Kanon kronikka, islamin tulo ja
sultanaatti, Rumfan vuosisata, **vuosi 1873 Sokoton kalifaatin
emiirikuntana**, durbar-ratsastus; teemasivulla Kurmin tori,
marokiininahka, maapähkinä ja rautatie sekä hausa kauppakielenä.

Kaupungin visa on luettu tiedostosta `js/packs/africa-questions.js`
(avain `kano`, viisi kysymystä: **maa Nigeria**, **Afrikan väkirikkain
maa**, **värjäämökuopissa värjätään kankaita**, **muurit ovat
savesta**, **hausa on yleisin kieli**). **Minitehtävä ei saa kysyä
yhtään näistä viidestä.** Litteän taulun `js/packs/africa-kulttuuri.js`
(`kano`) kulttuurivisa kysyy, **kuinka kauan indigokuopat ovat olleet
käytössä** — vastauksen on siis näyttävä pelissä, ja se näkyy
kohdekartan Kofar Mata -jutussa sekä teemasivun johdannossa.

**Litteää taulua `africa-kulttuuri.js` EI muuteta** (sama ratkaisu
kuin Lagosissa): sen värjäämökuva, durbar- ja muurinostot jäävät
peliin, ja lehden nostot eivät käytä samaa kuvatiedostoa
(`Kofar Mata Dye Pit, Kano.jpg`).

Olemassa olevat lohkot on luettu:
- `js/packs/africa-saapumiset.js` (`kano`): **valmis, ei kosketa**
  (harmattanin pöly, savimuurit, isoisän indigokädet).
- `js/packs/africa-valokuvat.js` (`kano`): valokuvataulu on olemassa.
- `js/packs/africa-artikkelit.js` (`Kano`): intro on **kolme
  virkettä** eli reseptin alle (7–10 virkettä). **Intro kirjoitetaan
  uusiksi**; `artikkeli`-kenttä jää ennalleen (Kapkaupunki-malli).
- `js/packs/africa-questions.js` `AFRICA_FACTS` (`kano`): **harmattan
  ja lentojen myöhästyminen**, **Kannywood ja intialaiset esikuvat**,
  isoisän savimuurit ja värjäämöt. **Lehti ei tee harmattanista eikä
  Kannywoodista omaa nostoa** — molemmat ovat jo sähkeinä. Harmattan
  mainitaan vain matkaoppaan sääjaksossa lukuina.

**1873-KEHYS:** isoisän matkavuonna Kano oli **Sokoton kalifaatin
emiirikunta** — viimeinen sultaani oli kukistettu 1805, ja Kano oli
jo silloin kalifaatin suurin ja vauras provinssi. Heinrich Barth oli
käynyt kaupungissa **1851** ja kutsunut sitä **Keski-Afrikan
suurimmaksi kauppapaikaksi**. Kaupunkia ympäröi **noin kymmenen
mailin pituinen ja 30 jalkaa korkea savimuuri**, ja asukkaita oli
Barthin mukaan **30 000**. Emiirin palatsin **Kofar Kudun portin
rakensi emiiri Abdullahi Maje Karofi 1800-luvun jälkipuoliskolla**.
**Vuosi 1873 on yksi artikkelin luettelemista nälkävuosista.**

---

## 1. Nimi ja Kanon kronikka

**Lähteet: "Kano (city)", Etymology & Founding; "Kano Chronicle".**

- Kano tunnettiin alun perin nimellä **Dala kukkulan mukaan**, ja
  bornulaiset lähteet käyttivät sitä nimeä **1400-luvun loppuun ja
  1500-luvun alkuun asti**.
- **Kanon kronikka** (arabiaksi *Tārīkh arbāb hādhā al-balad
  al-musammā Kanō*) on arabiankielinen käsikirjoitus, joka luettelee
  Kanon hallitsijat **900-luvulle asti**.
- Kronikka kertoo **yhdestätoista animistiklaanista** (mm.
  suolankeittäjiä, oluenpanijoita ja seppiä), joita hengellinen
  johtaja varoitti, että tulee muukalainen, joka kaataa heidän pyhän
  puunsa ja riistää heiltä vallan: *"If he comes not in your time,
  assuredly he will come in the time of your children, and will
  conquer all in this country"* (Palmer 1928). Pian saapui
  **Bagauda**, joka valloitti ja josta tuli kronikan mukaan Kanon
  ensimmäinen kuningas.
- **Nykyinen kronikka on todennäköisesti kirjoitettu 1880-luvulla**;
  kirjoittajaksi arvellaan **Malam Barkaa**, korkea-arvoista
  *Dan Rimi* -virkamiestä, joka palveli **emiiri Muhammad Belloa
  (1882–1893)**. Teos saattaa olla varhaisempien töiden yhdistelmä;
  alkuperäiskappale on yhä Malam Idris al-Khilawiyn jälkeläisillä
  Kanossa.
- **Tunnetuin käännös on Sir Richmond Palmerin englanninnos 1908.**
  Rupert M. East teki hausannoksen **1933** (*Labarun Hausawa da
  Makwabtansu*); **se perustuu eri lähteeseen kuin Palmerin käännös,
  joten teksteissä on eroja**.
- Kronikan kuningasluettelon alku: Bagauda (999–1063), Warisi
  (1063–1095), **Gijimasu (1095–1134)**, Nawata ja Gawata
  (1134–1136), **Yusa eli Tsaraki (1136–1194)** … **Osumanu
  Zamnagawa (1343–1349)**, Yaji I (1349–1385) … **Muhammad Rimfa
  (1463–1499)** … Muhammad Zaki (1582–1618).

## 2. Islam, sultanaatti ja kaupungin asema

**Lähde: "Kano (city)", johdanto & Middle Ages.**

- Kano on yksi seitsemästä keskiaikaisesta **hausakaupungista**.
  Pääasukkaat ovat **hausat ja fulanit**.
- **Vuosisatoja ennen brittihallintoa Kano oli vahvasti
  kosmopoliittinen**, ja siellä oli vakinaisia **arabi-, tuaregi- ja
  kanuriväestöjä**; niin on yhä, ja **hausa on alueen lingua franca,
  jota puhuu yli 70 miljoonaa ihmistä**.
- **Islam saapui kaupunkiin 1000-luvulla tai aiemmin, pääosin
  Saharan-kaupan kautta.** Sen myötä Kano rikastui ja siitä tuli
  alueen ja Pohjois-Nigerian **kaupan hermokeskus**; sitä sanotaan
  yhä "kaupan keskukseksi".
- **1100-luvulla Ali Yaji** Kudawa-suvusta luopui **Tsumburbura-kultin
  palvonnasta**, kääntyi islamiin ja julisti **sultanaatin**, joka
  kesti **1800-luvun loppuun asti**. Yajin hallituskausi aloitti
  laajentumisen kauden.

## 3. Rumfan vuosisata (1463–1499)

**Lähde: "Kano (city)", Middle Ages; "Gidan Rumfa"; "Kurmi Market".**

- **Muhammad Rumfa nousi valtaistuimelle 1463** ja hallitsi 1499
  asti.
- Nousevan **Songhain valtakunnan** poliittinen paine pakotti hänet
  ottamaan vaimokseen **Auwan, Askia Suuren tyttären**; Auwasta tuli
  myöhemmin **Kanon ensimmäinen naispuolinen Madaki**.
- Rumfa oli rikas ja komeileva kuningas: **ylellinen vaatetus ja
  kalliit strutsinsulkakengät olivat tavallisia virkamiehillä**.
  **Kakaki-torvi otettiin ensi kerran käyttöön hänen aikanaan.**
- Varallisuus perustui Kanon kaupalliseen kukoistukseen. **Kanon maine
  Saharan-kaupan tärkeänä keskuksena oli keskiajalla huipussaan
  luultavasti juuri hänen aikanaan.**
- **Leo Africanuksen kuvauksen Kanosta uskotaan olevan Rumfan
  ajalta.** Hän kuvasi paikallisia **"varakkaiksi kauppiaiksi ja
  taitaviksi käsityöläisiksi"**, kehui sulttaanin armeijan
  ratsuväkeä ja pani merkille **riisin, maissin, puuvillan ja
  sitrushedelmien runsauden**.
- Rumfa uudisti kaupungin, **laajensi sahelilaistyylistä Gidan
  Rumfaa** (emiirin palatsia) ja edisti islamin leviämistä.

## 4. Vuosi 1873: kalifaatin emiirikunta

**Lähde: "Kano (city)", Kano under the Sokoto Caliphate.**

- 1800-luvun alussa fulanien islamilainen johtaja **Usman dan Fodio**
  johti jihadin, joka mursi habe-kuningaskunnat ja johti **Sokoton
  kalifaatin** syntyyn. **Vuonna 1805 Kanon viimeinen sultaani
  kukistettiin** fulanien Jobe-klaanin toimesta, ja **Kanosta tuli
  kalifaatin emiirikunta**. **Kano oli jo tuolloin valtakunnan suurin
  ja vaurain provinssi.**
- **Nälänhädät:** kaupunki kärsi nälänhädistä **1807–1810,
  1830-luvulla, 1847, 1855, 1863, 1873, 1884 ja 1889–1890**.
- 1800-luvulla Kano kukoisti kaupan keskuksena: **kudonta, värjäys ja
  nahkatyö kulkivat kauppatavarana pohjoisessa Marokkoon asti ja
  sieltä Eurooppaan. Puuvillakangas kulki Tripoliin, Tšad-järvelle ja
  Timbuktuun.**
- **Heinrich Barth 1851:** Kanossa oli **noin kymmenen mailin
  pituinen ja 30 jalkaa korkea savimuuri** ja **30 000 asukasta**,
  ja kauppa ja käsityö olivat runsaita. Hänen mukaansa **"sen valtava
  tori oli kapeiden kujien sokkelo, jossa myytiin kaikkea
  vihanneksista orjiin"**. Hän kutsui Kanoa **Keski-Afrikan
  suurimmaksi kauppapaikaksi** ja arvioi orjuutettujen osuuden
  kaupungissa **vähintään puoleksi**; suurin osa asui orjakylissä.
  Lähde toteaa tämän olleen yksi viimeisistä suurista orjayhteisöistä
  kauan Atlantin orjakaupan katkettua. (**Artikkeli merkitsee
  Barthin orjuusarvion `citation needed` -merkinnällä** — ks.
  tarkistusraportti, kohta C.)
- 1893–1895 kaksi valtaistuinvaatijaa kävi sisällissodan (*Basasa*);
  **Yusufu voitti veljensä Tukurin** ja otti emiirin arvon.
- **Maaliskuussa 1903** kaupunkivaltio liitettiin Britannian
  imperiumiin **Kanon taistelun** jälkeen. Kano korvasi nopeasti
  Lokojan Pohjois-Nigerian hallintokeskuksena.
- **Vuoden 1903 brittiläinen lehtikirjoitus kutsui Kanoa "Nigerian
  Manchesteriksi"** ja korosti sen mainetta tekstiilinvalmistuksessa
  ja indigovärjäyksessä.

## 5. Durbar

**Lähteet: "Durbar festival"; "Kano (city)", Equestrianism.**

- Kano on perinteisesti **ratsastusyhteiskunta**, ja se näkyy
  vuotuisessa **durbar-juhlassa**.
- Juhla alkaa **rukouksilla aamunkoitteessa**, ja sitä seuraa
  emiirin ja hänen ratsastajiensa, muusikkojensa ja tykkimiestensä
  värikäs kulkue. Ylimykset saapuvat kunnioittamaan emiiriä ja
  vahvistamaan uskollisuutensa.
- **Juhla on yli 200 vuotta vanha** ja juontuu ajasta, jolloin
  hevosia alettiin käyttää sodankäynnissä Kanossa. **Kanon durbar on
  neljän päivän tapahtuma.**
- Osat: **Hawan Sallah**, **Hawan Daushe**, Hawan Nassarawa ja Hawan
  Doriya. **Vaikuttavin on Hawan Daushe**, johon kuuluu **Jahi**.
- **Jahi on ratsastajien tervehdys:** ratsastajat kiitävät täyttä
  laukkaa kohti emiiriä, pysähtyvät jyrkästi hänen edessään,
  heiluttavat miekkaansa tai lippuaan ja poistuvat.
- Hawan Daushe alkaa, kun emiiri seurueineen ratsastaa ulos
  **Gidan Rumfasta**, **Kofar Kwarun ohi Babban Dakiin,
  kuningataräidin palatsiin**, jossa hän kunnioittaa äitiään. Paluu
  palatsiin tapahtuu **Kofar Kudun portin kautta**, ja Jahin jälkeen
  palatsin vartijat ampuvat ilmaan.
- Durbaria vietetään useissa Pohjois-Nigerian kaupungeissa (Kano,
  Katsina, Sokoto, Zazzau, Bauchi, Bida, Gombe, Lafia, Akko).
- **UNESCO tunnusti juhlan aineettomaksi kulttuuriperinnöksi
  joulukuussa 2024.**
- Juhla peruttiin **2012** ensi kertaa 200 vuoteen emiirin huonon
  terveydentilan takia. (**Artikkelin analyytikkoarvio Boko Haramin
  osuudesta jätetään pois** — nykykonfliktilinjaus.)

## 6. Teemasivun aineisto: kauppa

### 6.1 Kurmin tori ("Kurmi Market")

- **Muhammad Rumfa perusti Kurmin torin 1400-luvulla**; lähdekirjan
  nimi on "A History of Kurmi Market, Kano **1463**–1999".
- Tori rakennettiin **Jakaran kaupunginosaan** kaupan ja varastoinnin
  keskukseksi, kun alueellinen ja **Saharan-kauppa** kasvoivat.
- Kano oli tuolloin maataloustuotteiden alueellinen kauppakeskus,
  jolla oli toimiva teollisuus **kudonnassa, kankaanvärjäyksessä,
  nahkatyössä ja savenvalannassa**; se veti kiertäviä kauppiaita
  **Länsi-Sudanista, Tripolista ja Ghadamesista**.
- Esikoloniaalisena aikana tori oli **nelikulmion muotoinen**, ja
  **bambukojut muodostivat rivejä kuin epäsäännöllisiä katuja**;
  eri kortteleissa myytiin eri tavaroita, ja **karjakauppa oli
  torin läntisimmässä osassa ja laitamilla**. Toria hallinnoivat
  henkilöt, jotka valvoivat kukin omaa kortteliaan tai
  tuoteosastoaan.
- **Tori toimi merkittävänä orjatorina orjakaupan aikana**
  (kerrotaan yhtenä lauseena, ilman yksityiskohtia).
- **1904 vanha tori purettiin** ja tilalle rakennettiin uusi Kanon
  natiivihallinnon verotulojen parantamiseksi. **Uusi tori avattiin
  1909**, ja siinä oli **755 savikojua sekä moskeija ja
  oikeustalo**. Katuja levennettiin, ja osa karjakauppiaista
  siirrettiin muualle.
- Kaupan suunta kääntyi **pois Saharan-kaupasta etelän naapureihin
  ja eurooppalaisiin**.
- **1969** torin hallinto siirtyi Kanon paikallishallinnolle. Sen
  jälkeen on syntynyt erikoistuneita toreja: **Yan Kaba
  vihanneksille ja Kantin Kwari tekstiileille**. Nykyään Kurmi
  palvelee enimmäkseen paikallisia kuluttajia.

### 6.2 Marokkonahka ("Morocco leather")

- **Morocco leather** (ransk. *maroquin*, saks. *Saffian*
  Marokon **Safin** kaupungin mukaan) on **kasviparkittua nahkaa**,
  joka tunnetaan pehmeydestään, taipuisuudestaan ja
  värinottokyvystään. Sitä on käytetty käsineisiin, naisten kenkien
  ja miesten matalien kenkien päällisiin sekä **lompakoihin,
  matkalaukkujen vuorauksiin ja kirjansidontaan**.
- **Nimestään huolimatta Marokko ei yleensä ollut nahan
  alkuperäinen lähde.** Osa **parhaimmasta kirjansidontaan
  käytetystä marokkonahasta — yleensä vuohennahkaa — hankittiin
  Pohjois-Nigeriasta, erityisesti hausakaupunkivaltioista Kanosta,
  Katsinasta ja Zazzausta.**
- Ensimmäisen marokkonahan valmistus liitetään **ennen 1000-lukua
  eläneisiin maureihin**; se oli aluksi alunaparkittua ja värjätty
  vaaleanpunaiseksi.
- **Parhaat laadut ovat vuohennahkaa**, mutta 1800-luvun lopulla
  käytäntönä oli usein korvata se lampaan- tai halkaistulla
  vasikannahalla; esimerkiksi "ranskalainen marokkonahka" on
  lampaannahkaa.
- Nahka ei ollut Englannissa ja Pohjois-Euroopassa tavallista ennen
  1600-lukua, mutta Italiassa sitä käytettiin jo ennen vuotta 1600.

### 6.3 Maapähkinä, vuodat ja rautatie ("Kano (city)", Economy;
British conquest)

- Kanon taloushistoria ulottuu keskiaikaan, jolloin kaupunki oli
  **Saharan-kauppareittien eteläisin piste**. Kano oli hyvin
  yhteydessä moniin Pohjois-Afrikan ja joihinkin Etelä-Euroopan
  kaupunkeihin.
- **Kano liitettiin Atlantin-kauppaan 1911, kun rautatie ulottui
  kaupunkiin.**
- Kano on merkittävä **vuotien, nahkojen, maapähkinöiden ja
  puuvillan** tuotanto- ja vientikeskus.
- **1913–1914 maapähkinäkauppa laajeni ja maapähkinäpyramidit
  yleistyivät Kanossa**; samaan aikaan kaupunkia koetteli suuri
  **kuivuus, joka aiheutti nälänhädän**.
- Kaupunki tuotti **Afrikan rikkaimman miehen, Aliko Dangoten**,
  jonka **isoisoisä Alhassan Dantata oli 1900-luvun puolivälissä
  Länsi-Afrikan rikkain mies**.
- Nykyään talous nojaa **kauppaan, vähittäismyyntiin ja palveluihin**;
  epäjohdonmukainen politiikka ja katkonainen sähkönsaanti ovat
  haitanneet teollisuutta.

### 6.4 Kaupunki ja kieli

- Ks. luku 2: kosmopoliittinen väestö, hausa lingua francana yli
  70 miljoonalle puhujalle. Kaksi Afrikan halki kulkevaa
  autoreittiä kulkee Kanon kautta: **Algiers–Lagos-valtatie** ja
  **Dakar–Ndjamena-valtatie**.
- Rautatie Kanosta Lagosiin kunnostettiin **vuoteen 2013 mennessä**;
  junamatka Lagosiin kestää **30 tuntia** ja maksaa noin 12
  dollaria eli neljänneksen bussimatkasta.

## 7. Matkaoppaan aineisto

- **Sijainti:** kaupunki on **Saharan eteläpuolella Sudanin
  savannivyöhykkeessä**, joka ulottuu Sahelin eteläpuolella.
  Lähellä yhtyvät lounaasta tulevat **Kano- ja Challawa-joki** ja
  muodostavat **Hadejia-joen**, joka laskee lopulta Tšad-järveen.
- **Korkeus 481 metriä merenpinnasta.**
- **Ilmasto:** trooppinen savanni-ilmasto (Köppen Aw). Sademäärä
  keskimäärin **980 mm vuodessa**, **valtaosa kesäkuusta
  syyskuuhun**. Kuuminta on **huhtikuussa**. **Joulu–helmikuussa
  aamulämpötilat ovat keskimäärin 14–16 °C.** Sääruudun (1991–2020)
  kuukausikeskiarvot: tammikuu 21,3 °C, huhtikuu 32,0 °C (vuoden
  korkein), elokuu 25,9 °C; vuoden keskiarvo 26,9 °C. Ennätyslämpö
  44,8 °C (toukokuu), ennätyskylmä 5,0 °C (tammikuu).
- **Arkkitehtuuri:** Kano on **sudanilais-sahelilaisen
  arkkitehtuurin johtavia keskuksia** ja kehitti paikallisen
  **Tubali**-tyylin, joka näkyy moskeijoissa, muureissa, tavallisissa
  pihapiireissä ja porteissa. **Julkisivujen ulkoinen koristelu** on
  yhä laajasti käytössä, ja kaupungissa on useita taitavia
  käsityöläisiä.
  Hausa-arkkitehtuurin pääosat kaupungissa ovat **puolustusmuuri,
  palatsi, moskeijat, tori ja asuinrakennukset**; rakennuksissa on
  kolme pääosaa: **päähuone, sisäpiha ja muuri**. Tärkein
  rakennusmateriaali on **lateriitti**. Rakennuksen orgaaniset
  muodot syntyvät **sateen kuluttamina**, ja **jokaisena kuivana
  kautena talot korjataan takaisin siisteiksi**. Julkisivun
  koristeet kertovat usein vauraudesta, ja koristelu jaetaan
  kolmeen ryhmään: **pintakuviot, ornamentit ja kalligrafia**.
- **Liikenne:** rautatieasema, jolta kulkee junia Lagosiin Kadunan
  kautta; **Mallam Aminu Kano International Airport** on lähellä.
  Koska Kano on Kadunan risteyksen pohjoispuolella, sillä on yhtä
  hyvä yhteys sekä Lagosin että Port Harcourtin satamiin.
- **Yliopistot:** **Bayero University Kano** on kaupungin vanhin
  yliopisto; siemenenä oli **Isa Kaitan 1962 perustama Ahmadu Bello
  College**, joka nostettiin **University Collegeksi 1975** ja josta
  tuli **liittovaltion yliopisto 1977**.
- **Uskonto:** rukoushuoneista valtaosa on moskeijoita; kaupungissa
  on myös useiden kirkkokuntien kirkkoja (Nigerian kirkko,
  roomalaiskatolinen Kanon hiippakunta, baptistit, presbyteerit,
  helluntailaiset).

## 8. Kohdekartan kahdeksan kohdetta

Koordinaatit haettu **7.9.2026**. Lähdejärjestys: (1) artikkelin oma
`{{coord}}` raakatekstistä, (2) Wikidatan `P625` samasta kohteesta,
kun artikkelissa ei ole koordinaattia tai kun artikkelien
koordinaatit ovat keskenään ristiriidassa (ks. tarkistusraportti,
kohta F). **Kaikki 28 väliä on mitattu haversinilla.**

| # | Kohde | lat | lon | lähde |
| --- | --- | --- | --- | --- |
| 1 | Sabon Garin tori | 12.015400 | 8.539900 | artikkeli |
| 2 | Dala-kukkula | 12.009280 | 8.506980 | Wikidata |
| 3 | Kofar Matan värjäämökuopat | 12.000853 | 8.526099 | Wikidata |
| 4 | Sani Abachan stadion | 11.999722 | 8.529167 | artikkeli |
| 5 | Kanon suurmoskeija | 11.994855 | 8.517640 | Wikidata |
| 6 | Gidan Rumfa | 11.992300 | 8.516000 | Wikidata |
| 7 | Kofar Nassarawan portti | 11.990889 | 8.530678 | OSM |
| 8 | Gidan Makaman museo | 11.988802 | 8.521058 | Wikidata |

**Kurmin tori jäi pois kartalta, koska sille ei ole luotettavaa
koordinaattia** (ks. tarkistusraportti, kohta F): artikkelin
`{{coord}}` on täsmälleen sama piste kuin Wikidatan Gidan Rumfa, eikä
OSM:ssä ole nimettyä Kurmi-kohdetta koko vanhassa kaupungissa. Tori
kerrotaan siksi **teemasivun nostona**, ei kartan kohteena.

### 8.1 Sabon Garin tori

- **Sabon Gari** tarkoittaa hausaksi **"uutta kaupunkia"**. Se on
  Pohjois-Nigerian, Nigerin ja Pohjois-Kamerunin kaupunkien
  kaupunginosa, jonka asukkaat ovat myöhemmin tulleita tai eivät
  ole kotoisin hausamaasta.
- **Jo ennen brittien saapumista Pohjois-Nigeriaan 1900** oli
  vakiintuneita uudisasukkaiden yhteisöjä, jotka asuivat erillään
  vanhoista asutuksista mutta emiirin vallan alaisina.
- Brittihallinnon ja **uusien rautateiden** myötä Etelä-Nigeriasta
  tuli paljon työläisiä ja kauppiaita; nämä asettuivat uusiin
  kaupunkeihin, joita paikalliset kutsuivat *sabon garuruwa*.
  **Vuoden 1914 Cantonments Proclamation vakiinnutti tämän
  asuinalueiden erottelun.**
- **Tyypillinen pohjoisnigerialainen kaupunki koostui neljästä
  osasta:** muurien sisäinen vanhakaupunki, sabon gari, *tudun wada*
  (pohjoisnigerialaisille, jotka eivät olleet paikallisia) ja
  muutama eurooppalaisten asuinalue.
- **Sabon Garin tori rakennettiin 1914, mutta se avattiin vasta
  1915.** Se **rakennettiin uudelleen nykyaikaisena 1983** Kanon
  hallinnon toimesta, ja **se on Kanon suurin tori**.
- Tori on **Faggen paikallishallintoalueella**, jonka pinta-ala on
  21 km² ja väkiluku 198 828 (2006) ja jonka päätoimiala on kauppa.

### 8.2 Dala-kukkula ("Dalla Hill")

- Kukkula on **534 metriä** korkea, ja sen juurelta huipulle vie
  **101 porrasta**. (Artikkeli itse merkitsee korkeusluvun
  epäselväksi — ks. tarkistusraportti, kohta B.)
- **600-luvulla kukkula oli metsästäjä- ja keräilijäyhteisön
  asuinpaikka, ja yhteisö teki rautatöitä.**
- Kukkula on Kanon historian ydin. **Barbushen** kerrotaan asuneen
  siellä satoja vuosia sitten: kookas ja voimakas mies, joka
  metsästi norsuja kepillään ja kantoi ne selässään kukkulalle.
- Barbushe rakensi kukkulalle **pyhäkön Tsumburbura-nimiselle
  jumaluudelle**, jota hausat palvoivat ennen islamin tuloa.
  **Vain Barbushe sai käydä pyhäkössä**; kerrotaan, että jokainen
  luvatta sisään mennyt kuoli traagisesti. **Barbushe laskeutui
  kukkulalta vain kahtena juhlapäivänä**, ja niiden lähestyessä
  ympäristön asukkaat toivat uhrieläimiä saadakseen Tsumburburan
  suosion.
- Tarina liittyy myös **Bayajidda-legendaan**, kertomukseen
  Bagdadista tulleeksi uskotusta muukalaisesta, joka meni naimisiin
  hallitsijasukuun ja josta polveutuivat **Hausa Bakwai** -liiton
  seitsemän kaupunkivaltion hallitsijat.

### 8.3 Kofar Matan värjäämökuopat ("Kofar Mata Dye Pits")

- Perinteisiä indigovärjäyskuoppia **vanhassa Kanon kaupungissa**;
  paikkaa pidetään **yhtenä Länsi-Afrikan pitkäikäisimmistä
  yhtäjaksoisesti toimivista värjäämöistä**.
- Kuopat ovat **historiallisen Kofar Matan portin lähellä** Kanon
  kaupunginmuurissa, ja ne ovat olleet käytössä **useita
  vuosisatoja**; ne tuottavat käsin värjättyjä tekstiilejä
  luonnonindigolla.
- Alkuperää jäljitetään **yli 500 vuoden taakse**, aikaan jolloin
  Kano oli Saharan-kaupan merkittävä keskus. Indigovärjäys kehittyi
  kaupungin tekstiilituotannon rinnalla sekä paikalliseen käyttöön
  että kaukokauppaan.
- Esikoloniaalisena aikana Kanossa värjättyä kangasta myytiin
  laajalti nykyisen Pohjois-Nigerian alueella ja kauempanakin.
  **Kuopat toimivat siirtomaakauden läpi ja ovat toiminnassa
  2000-luvullakin.**
- **Menetelmä:** kuopat ovat syviä, pyöreitä maahan kaivettuja
  altaita, joissa kussakin on käynyt indigoliuos. **Kangas kastetaan
  altaaseen toistuvasti ja annetaan hapettua ilmassa**, jolloin
  syntyy syvä sininen väri.
- **Tieto värin valmistuksesta ja kankaan käsittelystä siirtyy
  suvuittain**, ja työn tekevät pääosin miesvärjärit menetelmillä,
  jotka ovat muuttuneet vähän sukupolvien aikana.
- Huoli: ympäristöpaine, kaupunkirakentaminen ja nuorempien
  polvien vähenevä kiinnostus.

### 8.4 Sani Abachan stadion

- Monitoimistadion Kanossa, pääosin jalkapallo- ja
  yleisurheilukäytössä. **Kotistadion Kano Pillars -seuralle.**
  **Katsojapaikkoja 16 000.** Nimetty entisen valtionpäämiehen,
  kenraali Sani Abachan mukaan.
- Stadion on isännöinyt useita kansainvälisiä kilpailuja, mm.
  **vuoden 2000 Afrikan cupia** ja **vuoden 2009 alle 17-vuotiaiden
  MM-kisoja** sekä **vuoden 1999 nuorten MM-kisoja**.
- **Kaudella 2017 Kano Pillarsin kotiyleisö oli keskimäärin 10 000 —
  Nigerian liigan kaikkien aikojen korkein keskiarvo.**

### 8.5 Kanon suurmoskeija ("Great Mosque of Kano")

- **Nigerian vanhin moskeija.** Rakennettiin **Muhammad Rumfalle
  1400-luvulla**; se oli savesta ja **soro- eli tornityyppinen**.
- **Muhammad Zaki siirsi sen uudelle paikalle 1582**, ja
  **Abdullahi Dan Dabo rakensi sen uudelleen 1800-luvun
  puolivälissä**.
- **Sokoton jihadin jälkeen emiiri Suleiman**, jota pidettiin Kanon
  imaamina, **johti perjantairukoukset itse**; myöhemmät emiirit
  ovat delegoineet tehtävän nimitetylle imaamille.
- **Moskeija tuhoutui 1950-luvulla ja rakennettiin uudelleen
  brittien tuella.**
- (Vuoden 1980 väkivaltaisuudet jätetään pois — nykykonfliktilinjaus,
  sama ratkaisu kuin Aleppossa ja Bagdadissa.)

### 8.6 Gidan Rumfa ("Gidan Rumfa")

- **Kanon emiirin palatsi**, jota sanotaan myös **Gidan Sarkiksi**
  ("emiirin talo"). Rakennettiin alun perin **1400-luvun lopulla**,
  ja siihen tehtiin muutoksia ja lisäyksiä **1900-luvulle asti**.
- **Rumfan ajoista lähtien se on ollut yhtäjaksoisesti Kanon
  perinteisen hallitsijan asuinpaikka**, ja **fulanien jihadistit,
  jotka ottivat vallan 1800-luvun alussa, säilyttivät sen.**
- Palatsi rakennettiin alun perin **kaupungin laidalle**, mikä
  laajensi kaupunkia ja **johti Kurmin torin perustamiseen**.
- **Pinta-ala noin 33 eekkeriä** (n. 13 hehtaaria), **avoin
  pohjakaava muurien ympäröimänä; muurit ovat jopa 15 jalkaa
  korkeat.** Rakennus on suorakaiteen muotoinen, ja sen maisema
  jakautuu kolmeen: **avoimet tilat, puutarhat sekä asuin- ja
  rakennetut alueet**.
- Rakennuksia ovat mm. **Kofar Kudu eli eteläinen portti**,
  toimistot, moskeija, **Soron ingila (englantilainen sali)**,
  kuninkaalliset oikeussalit, ala- ja yläkoulu sekä asuintilat.
  **Ikonisen Kofar Kudun portin rakensi emiiri Abdullahi Maje
  Karofi 1800-luvun jälkipuoliskolla.**
- Palatsissa asuu emiiri vaimoineen, lapsineen ja avustajineen;
  **emiirin yksityistiloissa asuu jopa 200 henkeä** ja koko
  rakennuksessa **yli tuhat**. Rakennusta ympäröivät puutarhat.

### 8.7 Kofar Nassarawan portti ja Kanon muurit

**Lähteet: "Ancient Kano City Walls"; "Gates of Hausa kingdoms";
"Kano (city)", Fortifications.**

- Muurin hausankielinen nimi on **ganuwa**. Perustuksen laski
  **Sarki Gijimasu (hall. 1095–1134)**, Kanon kuningaskunnan
  kolmas kuningas Kanon kronikan mukaan.
- **RISTIRIITA (kirjoitetaan auki):** "Kano (city)" -artikkelin
  Founding-osio sanoo, että Gijimasu aloitti muurit Dala-kukkulan
  juurella ja **hänen poikansa Tsaraki (1136–1194) sai ne valmiiksi**;
  saman artikkelin Fortifications-osio sanoo, että muuri **valmistui
  1300-luvun puolivälissä Zamnagawan aikana** ja sitä laajennettiin
  vielä 1500-luvulla.
- Mitat: alun perin **30–50 jalkaa korkea** ja **noin 40 jalkaa
  paksu tyveltä**, ja ympärillä **15 porttia**. ("Gates of Hausa
  kingdoms" sanoo Kanolla olevan 15 porttia ja luettelee ne;
  suurin osa vanhankaupungin porteista on säilynyt.)
- **Frederick Lugard kirjoitti vuoden 1903 raportissaan Kanon
  muureista, ettei ollut "koskaan nähnyt mitään vastaavaa
  Afrikassa".**
- **Portit ja portinvartijat:** jokaisella portilla on nimi ja
  vartija, **Sarkin Kofa** ("portin kuningas"). Ennen vartija
  vastasi yhdestä portista kaikkina aikoina, erityisesti öisin;
  nykyään kaikki portit on annettu yhdelle henkilölle. Jokaisella
  portilla on avain, ja **kun portit suljettiin yöksi, ne avattiin
  vasta aamunkoitteessa**. Kaupunkiin sai tulla vain porttien
  kautta. **Sarkin Kofan virka periytyy isältä lapsille.**
- Portit rakennettiin **savesta, kuivatusta heinästä, puusta,
  metallista ja kivestä**; keskimäärin noin **viisi metriä korkeita
  ja kymmenen metriä pitkiä**, koristeltuja hausalaisin kuvioin ja
  merkein, mm. **tambarin arewa** -tunnuksella. Osa porteista
  maalataan, osa jätetään savenruskeaksi.
- Kanon porttien luettelossa mm. **Kansakali** (rakennettu
  1095–1135, ensimmäinen kaupunginportti), **Nassarawa**, **Gidan
  Rumfan portti** (palatsin pääsisäänkäynti), **Sabuwar Kofa**
  (rakennettu sen jälkeen kun Kano kukistui briteille 1903),
  **Dan Agundi**, **Naisa**, **Gadankaya**, **Dukawiya**,
  **Kabuga**, **Waika**, **Ruwa**, **Dawanau**, **Wambai**,
  **Mazugal** ja **Mata**.
- Osa muurista on rapautunut heikon ylläpidon takia.

### 8.8 Gidan Makaman museo ("Gidan Makama Museum Kano")

- **Kanon museo.** Rakennus toimi **Kanon hausakuninkaiden
  väliaikaisena palatsina ennen kuin nykyinen palatsi Gidan Rumfa
  rakennettiin 1400-luvulla.**
- Talo rakennettiin alun perin **1400-luvulla nuorelle Muhammad
  Rumfalle**, joka oli juuri nimitetty **Makama Kanoksi**
  (perinteinen arvonimi). Myöhemmin Rumfasta tuli kuningas ja hän
  muutti uuteen palatsiin, mutta seuraavat makamat asuivat
  rakennuksessa.
- **Brittien vallattua Kanon 1903** rakennus toimi lyhyen aikaa
  siirtomaavirkamiesten toimistona. Sen jälkeen rakennus jaettiin
  kolmeen osaan: **museo**, **alakoulu** ja **asuinrakennus**.
- Museo kuuluu nykyään **National Commission of Museums and
  Monuments** -viraston museoihin ja on yksi vanhoista rakennuksista,
  jotka esittävät perinteistä **hausa-arkkitehtuuria**. Seinät olivat
  alun perin savea; myöhemmin on tehty nykyaikaisia korjauksia.
- Museo on **Emir Palace Roadin varrella** ja jakautuu **11
  galleriaan**, jotka ovat vanhojen makamojen huoneita ja pihoja.
  Sisäänkäynnillä on **Kofar Kabugan portilta kaivettuja
  historiallisia ruukkuja** ja **kaksi siirtomaa-ajan tykkiä**.
- Galleriat: (1) hausa-arkkitehtuuri ja rakennusmateriaalit;
  (2) **Kofar Kabugan portit, joiden kautta britit tulivat
  kaupunkiin**, ja Kanon muurien kartta; (3) Kanon uskonnollinen
  historia kuvina sekä Bagaudan tarina; (4) fulanien vaikutus
  1800-luvulta; (5) Kanon sisällissota; (6) vanha Kanon talous ja
  durbar; (7) siirtomaakausi ja 1900-luvun poliittisia hahmoja;
  (8) islamilainen perintö; (9) elinkeinot, maatalousvälineet,
  korityö ja tekstiilit; (10) soittimet; (11) perinteinen
  hausamorsiamen huone.
- Museon sisäpihaa käytetään **Koroso-tanssi- ja teatteriryhmän
  esiintymislavana**.

## 9. Avoimet kysymykset päätoimittajalle

1. **Orjuus Barthin 1851 kuvauksessa** (vähintään puolet
   kaupungista orjuutettuja; artikkelin merkintä `citation needed`).
   Ehdotus: mainitaan yhtenä lauseena lähteen varauksella
   ("Barthin arvion mukaan"), ilman lukua toistavaa korostusta, ja
   Kurmin torin orjatorimenneisyys todetaan yhtenä lauseena.
   Perustuslain pilari 4 kieltää kaunistelun.
2. **Muurien valmistumisvuosi** on Wikipedian sisäinen ristiriita
   (Tsaraki 1136–1194 vs. Zamnagawa 1343–1349). Ehdotus: molemmat
   kerrotaan, kumpaakaan ei valita.
3. **Sani Abachan stadionin nimi** viittaa entiseen sotilaalliseen
   valtionpäämieheen. Ehdotus: nimi mainitaan neutraalina
   tosiasiana ilman poliittista arviota, ja juttu kertoo
   jalkapallosta.
4. **Sabon Garin historia** sisältää lähteessä myös vuoden 1966
   väkivallan ja nykyiset jännitteet. Ehdotus: juttu päättyy vuoden
   1983 uudisrakennukseen eikä käsittele niitä lainkaan (ei
   nykypolitiikkaa, ei nykyväkivaltaa).
