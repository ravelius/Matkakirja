# Täkyehdokkaat: Ateena

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten. Kaikki täkyt on
tarkistettu en-Wikipediasta (tai muusta nimetystä lähteestä) hakemalla
artikkelin raakateksti curlilla. Ei mitään muistinvaraista.

## Tarkistustapa

- Wikipedia-artikkelit haettu komennolla
  `curl -sS "https://en.wikipedia.org/w/api.php?action=query&titles=<ARTIKKELI>&prop=extracts&explaintext=1&format=json&formatversion=2&redirects=1"`.
- 429-vastauksiin (rajoitus) uusi yritys kasvavalla viiveellä (2 s, 4 s,
  6 s...). Kaikki tässä raportissa käytetyt haut onnistuivat lopulta.
- Jokainen täky perustuu suoraan lainattuun tai tiivistettyyn kohtaan
  haetusta artikkelista — ei ennakkotietoon. Kohdat, joita ei löytynyt
  varmennettuna (esim. "ateenalaisten pyhä käärme kieltäytyi syömästä
  ennen Salamista"), on jätetty pois tai siirretty Hylätyt-osioon.
- Koordinaatit ovat karttatuntemukseen perustuvia likiarvoja
  (paikkojen yleistä sijaintia), EIVÄT peräisin viitatusta
  Wikipedia-tekstistä — merkitty "n." ja tarkistettava kartalta ennen
  julkaisua, jos tarkkuus on tärkeä.

## Olemassa oleva Ateena-sisältö repossa

Nopea `grep -ri "ateena\|athens\|akropoli" js/packs/ docs/` -katsaus:

- **js/packs/nahtavyysjutut.js** (rivit n. 2963–3167): kuusi valmista
  nähtävyysjuttua Ateenasta — Antiikin agora (Hefaistoksen temppeli,
  Attaloksen pylväikkö, 1931–1935 kaivaukset, orjapoika Lesiksen
  lyijykirje), Akropolis (Persian tuho 480 eaa., Perikleen
  jälleenrakennus, Erekhteionin karyatidit, Manolis Glezosin
  lipunrepäisy 1941), Zeuksen temppeli (600 v. rakennusaika,
  jäljellä 15/104 pylvästä), Sýntagman aukio (perustuslakivaatimus
  1843, evzon-kaartilaiset, 400 laskosta hameessa), Lykavittós
  (Athena-legenda, Pyhän Yrjön kappeli), Kallimarmaro (Herodes
  Atticus, 1896-olympialaiset, Spyridon Louis, pöllökaiverrukset
  penkeissä).
- **js/packs/kulttuuri-kategoriat.js** (rivit n. 5080–5520): laaja
  "Matkailijan Ateena" -kokonaisuus — Pireus-satama ja metrokaivausten
  arkeologia, Plakan asutushistoria kivikaudesta, Kolonakin nimipylväs,
  Exarcheia 1870-luvulta, frappé-kahvi (keksitty 1991), Ateenan
  pääkaupunkistatus 1834 (400 taloa), hellevirkamies, Tuulten torni
  (roomalaisajan kahdeksankulmainen kellotorni tuulenjumalineen —
  TÄMÄ ON JO SE "vesikello"-esimerkki tehtävänannosta, ei siis uusi
  täky), souvlaki-kääre, Panathinaikon stadion.
- **js/packs/pollo-kysymykset.js** (rivi 476): pöllön kysymyspatteri
  Ateenasta (Akropolis, pääkaupunkistatus, marmoripatsaiden
  puhdistus).
- **js/packs/europe.js**: Ateena kartalla lähtöpisteenä/satamana,
  reittitiedot, Akropolis-merkki kartalla.
- **js/packs/europe-artikkelit.js**: tiivis Ateena-artikkeli
  (demokratia, Akropolis, pääkaupunkistatus 1834).

**Johtopäätös:** Agora, Akropolis (Parthenon, Persian tuho, Glezos),
Zeuksen temppeli, Sýntagman aukio/evzonit, Lykavittós, Kallimarmaro/
Spyridon Louis, Tuulten torni, Plaka/Kolonaki/Exarcheia, frappé,
Pireus/metrokaivaukset ja souvlaki ovat KAIKKI JO KÄYTÖSSÄ. Alla
olevat täkyt on valittu välttämään päällekkäisyys näiden kanssa —
uusia paikkoja ja yksityiskohtia, jotka voivat täydentää tai laajentaa
olemassa olevia juttuja (esim. Akropoliin, Agoran ja Zappeionin
lähistöltä) mutta eivät toista niiden sisältöä.

---

## Täkyt

### 1. Filosofi, joka asui savisaviastiassa ja etsi valehtelijaa lyhdyllä

Kyynikkofilosofi Diogenes vietti Ateenassa talvensa asuen ruoan-
säilytykseen tarkoitetussa isossa saviastiassa (pithos), koska ei
välittänyt mukavuuksista. Kun eräs nuorukainen kerran rikkoi hänen
astiansa, ateenalaiset kunnioittivat häntä niin, että hankkivat uuden
tilalle. Päiväsaikaan Diogenes kierteli torilla lyhty kädessä ja
selitti etsivänsä "rehellistä ihmistä" — vihjaten, ettei sellaista
löytynyt keskellä kirkasta päivää.

- **Paikka:** Antiikin agora, Ateenan keskusta. n. 37.9755°N, 23.7229°E
- **Lähde:** en.wikipedia.org/wiki/Diogenes
- **Lainaus/perustelu:** "Diogenes spent his mild winters in Athens, surviving by begging and taking shelter in a large ceramic jar (pithos), originally meant for food storage. The Athenians reportedly held him in high regard, even replacing his jar when a youth broke it... Diogenes was also known to wander the marketplace by day with a lit lamp, saying 'I am looking for a man'."
- **Varmuus:** VARMA — suoraan lähteessä.

### 2. Kaupunginmuuri, joka on rakennettu kuolleiden hautakivistä

Kun persialaiset olivat tuhonneet Ateenan 480 eaa., kaupunki rakensi
kiireesti uuden puolustusmuurin. Valtiomies Themistokleen ehdotuksesta
muuriin muurattiin suoraan vanhoja hautamuistomerkkejä ja patsaita —
osa kivistä on yhä paikallaan, ja tarkkasilmäinen kävelijä näkee
Kerameikoksen muurinpätkässä hautakirjoituksia ja kuvanveiston
katkelmia siellä, minne ne 2 500 vuotta sitten kiireessä tungettiin.

- **Paikka:** Kerameikos, muinainen savenvalajien kaupunginosa ja
  hautausmaa, Dipylon-portin luona. n. 37.9784°N, 23.7211°E
- **Lähde:** en.wikipedia.org/wiki/Kerameikos
- **Lainaus/perustelu:** "The building of the new city wall in 478 BC, following the Persian sack of Athens in 480 BC, fundamentally changed the appearance of the area. At the suggestion of Themistocles, all of the funerary sculptures were built into the city wall..."
- **Varmuus:** VARMA — suoraan lähteessä.

### 3. Kukkula, jolla sotajumala joutui oikeuteen — ja apostoli piti puheen

Areiopagi on kallioinen kukkula Akropoliin luona, nimetty sotajumala
Areen mukaan: myytin mukaan jumalat tuomitsivat hänet täällä Poseidonin
pojan murhasta. Vuosisatoja myöhemmin samalla kalliolla apostoli Paavali
piti kuuluisan saarnansa ateenalaisille "tuntemattomasta jumalasta"
(Apostolien teot 17) — puhe, joka johti muutaman kuulijan, muun muassa
Dionysios Areiopagilaisen, kääntymykseen.

- **Paikka:** Areiopagi (Areios pagos), Akropoliin luoteispuolella.
  n. 37.9722°N, 23.7237°E
- **Lähde:** en.wikipedia.org/wiki/Areopagus
- **Lainaus/perustelu:** "The war god Ares was supposed to have been tried by the other gods on the Areopagus for the murder of Poseidon's son Halirrhothius..." ja "Acts 17:16-34 prominently features the Areopagus as the setting for the Apostle Paul's Areopagus sermon during his visit to Athens, notably leading to the conversion of Dionysius the Areopagite."
- **Varmuus:** VARMA myytin ja Paavalin vierailun osalta (suoraan
  lähteessä). EPÄVARMA se, pitikö Paavali puheensa juuri kalliolla vai
  neuvoston edessä muualla — lähde toteaa tämän itse epäselväksi:
  "it is unclear whether Paul gave his speech before the Areopagus
  Council... or on the physical location of the Areopagus hill".

### 4. Kivi, josta demokratia syntyi

Pnyx-kukkulan kyljessä on kallioon veistetty tasainen korokkeenreuna,
béma — puhujankoroke, jolta muun muassa Perikles ja Demosthenes puhuivat
kokoontuneelle kansankokoukselle jo 500-luvulta eaa. lähtien. Paikka on
yksi maailman vanhimmista säilyneistä demokratian näyttämöistä: tavallinen
kansalainen sai nousta samalle kivelle ja vaatia puheenvuoroa.

- **Paikka:** Pnyx, alle kilometri Akropoliksesta länteen.
  n. 37.9706°N, 23.7208°E
- **Lähde:** en.wikipedia.org/wiki/Pnyx
- **Lainaus/perustelu:** "The Pnyx is a small, rocky hill... with a large flat platform of eroded stone set into its side... the flat stone platform was the bema, the 'stepping stone' or speakers' platform. Pericles, Aristides and Alcibiades spoke here... Demosthenes delivered his vilifications of Philip II of Macedon."
- **Varmuus:** VARMA — suoraan lähteessä.

### 5. Jumalten kilpailun jäljet kalliossa

Legendan mukaan Athena ja Poseidon kilpailivat siitä, kumpi saisi antaa
nimensä kaupungille. Poseidon iski kolmikärkensä kallioon ja synnytti
suolaisen lähteen; Athena istutti ensimmäisen oliivipuun ja voitti.
Erekhteionin kuistin lattiassa näytetään yhä "kolmikärjen jälkiä", ja
temppelin vieressä kasvaa pyhä oliivipuu Athenan lahjan muistoksi.

- **Paikka:** Erekhteion, Akropolis. n. 37.9722°N, 23.7263°E
- **Lähde:** en.wikipedia.org/wiki/Erechtheion ja
  en.wikipedia.org/wiki/Athena
- **Lainaus/perustelu:** Erechtheion: "Orlandos reconstructs an obliquely orientated hexastyle amphiprostyle temple, which would have contained the 'trident marks' in its pronaos" ja "...the sacred olive tree of Athena would have been." Athena-artikkeli: "Poseidon struck the ground with his trident and a salt water spring sprang up... Athena offered the first domesticated olive tree... Cecrops accepted this gift and declared Athena the patron goddess of Athens."
- **Varmuus:** VARMA myytin osalta (suoraan lähteissä). EPÄVARMA
  "kolmikärjen jälkien" tarkka nykyinen näkyvyys turistille — lähde
  puhuu arkeologisesta rekonstruktiosta ("would have contained"), ei
  vahvista asiaa nähtävissä olevaksi yksiselitteisesti.

### 6. Kuusi sisarta ja käärmekuoppa

Erekhteionin kuuluisaa "neitsytkuistia" kannattelee kuusi naishahmoista
pylvästä, karyatidia. Yksi kuudesta ei ole enää paikallaan: Lordi Elgin
irrotti sen 1800-luvun alussa ja vei Britanniaan, missä se on yhä
British Museumissa. Samalla temppelillä, pohjoiskuistin alla, on
maanalainen kuoppa, joka oli aikoinaan varattu — käärmeille.

- **Paikka:** Erekhteion, Akropolis. n. 37.9722°N, 23.7263°E
- **Lähde:** en.wikipedia.org/wiki/Erechtheion
- **Lainaus/perustelu:** "...its despoliation by antique collectors, including Elgin. This is how one of the caryatids was separated from the rest of the building and ended up in the British Museum." ja "East of the north doorway is an underground opening that leads to a crypt under the north porch with a pit for snakes."
- **Varmuus:** VARMA — suoraan lähteessä. (Käärmekuopan tarkempi
  käyttötarkoitus/legenda pyhästä vartijakäärmeestä EI ole
  varmennettu tässä lähteessä — jätetty pois, ks. Hylätyt.)

### 7. Voitonjumalatar, jolta leikattiin siivet pois

Akropoliin pienin temppeli on omistettu Athena Nikelle, voitonjumalattarel-
le. Sen kaiteessa seisoi kuuluisa marmoripatsas siivettömästä Nikestä.
Myöhemmät ateenalaiset selittivät siivettömyyden niin, että patsaalta
riistettiin siivet tarkoituksella — jotta Voitto ei koskaan voisi lentää
pois kaupungista.

- **Paikka:** Athena Niken temppeli, Akropoliin lounaiskulma, Propylaian
  vieressä. n. 37.9719°N, 23.7253°E
- **Lähde:** en.wikipedia.org/wiki/Temple_of_Athena_Nike
- **Lainaus/perustelu:** "Nike was originally the 'winged victory' goddess... The Athena Nike statue's absence of wings led Athenians in later centuries to call it Apteros Nike or wingless victory, and the story arose that the statue was deprived of wings so that it could never leave the city."
- **Varmuus:** VARMA — suoraan lähteessä (lähde itse toteaa tarinan
  syntyneen myöhemmin selityksenä, ei alkuperäiseksi syyksi).

### 8. Lyhty, jossa Byron majoittui ja munkki kasvatti Kreikan ensimmäiset tomaatit

Pieni pyöreä Lysikrateen muistomerkki pystytettiin 300-luvulla eaa.
juhlimaan kuoromusiikkikilpailun voittoa. 1600-luvulla ranskalainen
kapusiinimunkkiluostari osti sen kirjastokseen, ja lordi Byron majoittui
luostarissa toisella Kreikan-matkallaan. Vuonna 1818 munkki Francis
istutti luostarin puutarhaan Kreikan ensimmäiset tomaattitaimet.

- **Paikka:** Lysikrateen aukio, Plaka, Tripodon-kadun varrella.
  n. 37.9701°N, 23.7297°E
- **Lähde:** en.wikipedia.org/wiki/Choragic_Monument_of_Lysicrates
- **Lainaus/perustelu:** "Lord Byron stayed at the monastery during his second visit to Greece. In 1818, friar Francis planted in its gardens the first tomato plants in Greece."
- **Varmuus:** VARMA — suoraan lähteessä.

### 9. Rakennus, jonka seinän sisällä on rakentajan oma pää

Zappeion-palatsi rakennettiin ensimmäisiä nykyaikaisia olympialaisia
varten kreikkalais-egyptiläisen liikemiehen Evangelis Zappaan
lahjoituksella. Zappas kuoli ennen kuin rakennus valmistui — mutta
hänen päänsä on silti läsnä avajaisissa lähtien: se on haudattu
rakennuksen seinän sisään.

- **Paikka:** Zappeion, Kansallispuutarhan vieressä. n. 37.9698°N,
  23.7357°E
- **Lähde:** en.wikipedia.org/wiki/Zappeion
- **Lainaus/perustelu:** "Unfortunately for its benefactor, Evangelis Zappas, he did not live long enough to see the Zappeion built... The head of Evangelos Zappas is 'buried' inside a wall in the Zappeion."
- **Varmuus:** VARMA — suoraan lähteessä. Peruskivi muuten muurattiin
  20.1.1874 — vain kuukausia isoisän 1873-matkan jälkeen.

### 10. Troijan kultaa löytäneen miehen palatsi Ateenan keskustassa (1873!)

Heinrich Schliemann kaivoi Hisarlikin kummulla vuodesta 1870, ja juuri
vuonna 1873 — samana vuonna kuin isoisän matkapäiväkirja — hän löysi
kaivauksen viimeisenä päivänä kultaa, jonka uskoi kuningas Priamoksen
aarteeksi. Muutamaa vuotta myöhemmin Schliemann rakennutti Ateenan
keskustaan komean "Iliou Melathron" -palatsin kodikseen; se toimii
nykyään numismaattisena museona, ja sen frieesissä on kuvattuna hän itse
kaivamassa.

- **Paikka:** Iliou Melathron / Numismaattinen museo, Panepistimiou-katu
  12. n. 37.9793°N, 23.7332°E
- **Lähde:** en.wikipedia.org/wiki/Heinrich_Schliemann
- **Lainaus/perustelu:** "In 1870, Schliemann began digging a trench at Hissarlik, and by 1873 had discovered nine buried cities... The day before digging was to stop, 15 June 1873, Schliemann discovered gold, which he took to be Priam's Treasure trove." ja "Schliemann's magnificent residence in the city centre of Athens, the Iliou Melathron ('Palace of Ilium'), today houses the Numismatic Museum of Athens... The frieze circling the outside of the mausoleum shows Schliemann conducting the excavations..."
- **Varmuus:** VARMA — suoraan lähteessä. Erinomainen 1873-kytkös.

### 11. Kirkko keskellä kauppakatua, jonka kuningas pelasti purkukoneilta

1000-luvun bysanttilainen Kapnikarean kirkko seisoo yhä keskellä
Ateenan vilkkainta ostoskatua, Ermou-katua — ja ohikulkijaliikenne
kiertää sen molemmin puolin. Kun kuningas Otto rakennutti uuden
kaupunkisuunnitelman 1800-luvulla, kirkko oli tarkoitus purkaa tieltä,
mutta Baijerin kuningas Ludvig I puuttui asiaan ja pelasti sen.

- **Paikka:** Kapnikarea, Ermou-kadun keskellä, Plakan reunalla.
  n. 37.9762°N, 23.7286°E
- **Lähde:** en.wikipedia.org/wiki/Kapnikarea
- **Lainaus/perustelu:** "When King Otto I, King of the Kingdom of Greece, brought the Bavarian architect Leo von Klenze to draw the new city plan of Athens, the church was considered for demolition and it was the King of Bavaria, Ludwig I who objected the decision and saved the church." ja "The church is located in the center of the modern city of Athens, right in the middle of the high-traffic shopping area of Ermou street."
- **Varmuus:** VARMA — suoraan lähteessä.

### 12. Kirkko, jonka seinät on muurattu yhdeksästäkymmenestä antiikin palasesta

Pieni "Vanha Metropoli" -kirkko Mitropoleos-torilla on rakennettu
lähes kokonaan uusiokäytetyistä marmoripaloista — antiikin ajan
veistoksista aina 1100–1200-luvulle asti — jotka on muurattu suoraan
kirkon seiniin ilman yhtäkään tiiltä (kupolia lukuun ottamatta).
Seinissä on peräti 90 erillistä veistoskuvaa toisiinsa liittymättömistä
rakennuksista ja aikakausista. Vuosina 1841–1863 rakennus toimi
Ateenan julkisena kirjastona, ennen kuin se vihittiin uudelleen
kirkoksi.

- **Paikka:** Little Metropolis / Panagia Gorgoepikoos, Mitropoleos-
  tori, Ateenan tuomiokirkon (Great Metropolis) vieressä.
  n. 37.9744°N, 23.7297°E
- **Lähde:** en.wikipedia.org/wiki/Little_Metropolis
- **Lainaus/perustelu:** "The walls are built exclusively of reused marble spolia, comprising undecorated masonry up to the height of the windows, and featuring a total of ninety sculptures above that; this feature makes the church unique among Byzantine sacred architecture. Unlike common practice in contemporary Byzantine architecture, no bricks have been used, except for the dome." ja "From 1841 it housed the public library of Athens until 1863, when it was re-dedicated as a church, first to Christ the Saviour, and then to Saint Eleutherios."
- **Varmuus:** VARMA — suoraan lähteessä. Vuonna 1873, isoisän
  matkan aikaan, rakennus oli jo ollut kirkkona kymmenen vuotta
  (kirjasto muutti pois 1863) — hyvä pieni ajoituskytkös.

### 13. Etupenkin nimikkotuolit teatterissa

Dionysoksen teatterin etupenkeissä istuivat aikoinaan papit ja
korkeat virkamiehet — ei tavallisilla penkeillä vaan yksilöllisillä
marmorituoleilla, joista jokaiseen on kaiverrettu istujansa nimi ja
virka. Keskimmäinen, komein tuoli kuului Dionysoksen ylipapille.

- **Paikka:** Dionysoksen teatteri, Akropoliin eteläkupeella.
  n. 37.9691°N, 23.7278°E
- **Lähde:** en.wikipedia.org/wiki/Theatre_of_Dionysus
- **Lainaus/perustelu:** "The two fronts rows, still partially preserved today, consist of Pentelic stone chairs or thrones; these were the prohedria or seats of honour. Originally sixty-seven in number, the surviving ones each bear the name of the priest or official who occupied it... The central throne... belonged to the priest of Dionysus."
- **Varmuus:** VARMA — suoraan lähteessä.

### 14. Nukkuva tyttö ja aarteenetsijän oma hauta

Ateenan ensimmäisellä hautausmaalla lepää Heinrich Schliemann komeassa,
Ernst Zillerin suunnittelemassa haudassa. Samalla hautausmaalla on myös
yksi Kreikan tunnetuimmista hautaveistoksista: "Nukkuva tyttö"
(I Koimomeni), kuolleen nuoren tytön patsas, jonka veisti Tinos-saarelta
kotoisin oleva Yannoulis Chalepas.

- **Paikka:** Ateenan ensimmäinen hautausmaa, Zeuksen temppelin ja
  Kallimarmaron takana. n. 37.9646°N, 23.7368°E
- **Lähde:** en.wikipedia.org/wiki/First_Cemetery_of_Athens
- **Lainaus/perustelu:** "The cemetery includes several impressive tombs such as those of Heinrich Schliemann, designed by Ernst Ziller... and one tomb with a famous sculpture of a dead young girl called I Koimomeni ('The Sleeping Girl') and sculpted by Yannoulis Chalepas from the island of Tinos."
- **Varmuus:** VARMA — suoraan lähteessä. (Tarinaa siitä, miksi tyttö
  kuoli — esim. juuri ennen häitä — EI löytynyt tästä lähteestä,
  joten sitä ei väitetä.)

### 15. Laiva, joka upposi antiikin aarteineen — ja nousi kahdessa vuodessa

Kun lordi Elgin kuljetti irrottamiaan Parthenonin veistoksia Britanniaan
1800-luvun alussa, yksi lastilaiva, Mentor, joutui myrskyyn ja upposi
Kytheran saaren edustalla. Elgin maksoi omasta pussistaan sukelluksen,
joka kesti kaksi vuotta ennen kuin marmorit saatiin pinnalle.

- **Paikka:** Tapahtuma liittyy Parthenoniin, Akropolis (marmorit
  irrotettiin sieltä); haaksirikko tapahtui Kytheran saaren edustalla,
  Ateenan ulkopuolella. Parthenon n. 37.9715°N, 23.7267°E
- **Lähde:** en.wikipedia.org/wiki/Elgin_Marbles
- **Lainaus/perustelu:** "One shipload of marbles on board the British brig Mentor was caught in a storm off Cape Matapan in southern Greece and sank near Kythera, but was salvaged at the Earl's personal expense; it took two years to bring them to the surface."
- **Varmuus:** VARMA — suoraan lähteessä.

### 16. Portti, joka väittää olevansa raja — vaikka ei ole

Hadrianuksen portissa on kaksi antiikin kaiverrusta, jotka on suunnattu
vastakkaisiin suuntiin ja jotka molemmat nimeävät Ateenan perustajaksi
sekä Theseuksen että Hadrianuksen. Pitkään uskottiin, että portti
merkitsi rajaa antiikin ja Hadrianuksen uuden kaupunginosan välillä —
mutta myöhemmät kaivaukset ovat osoittaneet tämän suositun tarinan
vääräksi: portti ei koskaan seurannut mitään muuria.

- **Paikka:** Hadrianuksen portti, Vasilissis Amalias -bulevardin
  varrella, 325 m Akropoliksesta kaakkoon. n. 37.9687°N, 23.7317°E
- **Lähde:** en.wikipedia.org/wiki/Arch_of_Hadrian_(Athens)
- **Lainaus/perustelu:** "There were two inscriptions on the arch, facing in opposite directions, naming both Theseus and Hadrian as founders of Athens... The early idea, however, that the arch marked the line of the ancient city wall, and thus the division between the old and the new regions of the city, has been shown to be false by further excavation."
- **Varmuus:** VARMA — suoraan lähteessä. (Suosittu turistitarina
  siitä, että toinen kyltti sanoisi kirjaimellisesti "tämä ei ole
  Theseuksen kaupunki", EI ole vahvistettu tässä lähteessä — vain se,
  että molemmat kaiverrukset nimeävät kaksi eri perustajaa. Kannattaa
  kertoa pöllön suulla juuri tämä varmennettu versio: kaksi nimeä,
  vastakkaiset suunnat, ja suosittu selitys muurin rajasta osoittautui
  myöhemmin vääräksi.)

### 17. Piilokylä Akropoliin kupeessa

Anafiotika on pieni, kartanolta piiloutuva kortteli aivan Akropoliin
kalliojuurella: matalia, valkoisia kykladisaaren-tyylisiä taloja
kapeine kujineen. Sen ensimmäiset asukkaat olivat rakennustyöläisiä
Anafi-saarelta, jotka tulivat 1830–60-luvuilla kuningas Otton palatsin
kunnostustöihin — ja rakensivat samalla itselleen oman pikku kylän
keskelle pääkaupunkia.

- **Paikka:** Anafiotika, Plakan koillisosa, Akropoliin kupeessa.
  n. 37.9738°N, 23.7273°E
- **Lähde:** en.wikipedia.org/wiki/Anafiotika
- **Lainaus/perustelu:** "The first houses were built in the era of Otto of Greece, when workers from the island of Anafi came to Athens in order to work as construction workers in the refurbishment of King Otto's Palace... The neighborhood was built according to typical Cycladic architecture... In the modern era, there are only 45 houses remaining, while the little streets... are still unnamed."
- **Varmuus:** VARMA — suoraan lähteessä.

### 18. Runoilijan nimikirjaimet pylväässä (Attika, ei Ateena)

Sounionin niemellä, Poseidonin temppelin raunioilla, yhden pylvään
jalustaan on kaiverrettu nimi "Byron". Lordi Byron vieraili Sounionissa
kahdesti vuosina 1810–11 ennen kuin hänestä tuli kuuluisa runoilija —
mutta kukaan ei voi todistaa, veistikö hän nimensä itse.

- **Paikka:** Cape Sounion, Poseidonin temppeli, n. 70 km Ateenasta
  kaakkoon. n. 37.6501°N, 24.0247°E — MUUALTA ATTIKASTA, ei Ateenasta.
- **Lähde:** en.wikipedia.org/wiki/Sounion
- **Lainaus/perustelu:** "The inscribed name of Lord Byron, carved into the base of one of the columns of the Temple of Poseidon, possibly dates from his first visit to Greece... Byron spent several months in 1810–11 in Athens, including two documented visits to Sounion. There is, however, no direct evidence that the inscription was made by Byron himself."
- **Varmuus:** VARMA nimikirjoituksen olemassaolosta ja Byronin
  vierailuista (suoraan lähteessä). EPÄVARMA/lähde itse toteaa
  epävarmaksi, veistikö Byron nimen itse.

### 19. Kaksi maakumpua, joissa taistelun kaatuneet lepäävät (Attika, ei Ateena)

Marathonin taistelukentällä haudattiin kaatuneet ateenalaiset ja
plataialaiset kahteen maakumpuun suoraan taistelukentälle — perinne,
joka poikkesi tavallisesta tavasta haudata sotilaat kotikaupunkiin.
Ateenalaisten kummulla oli aikoinaan Simonideen sepittämä hautarunoa.

- **Paikka:** Marathonin taistelukenttä / Soros (kumpu), n. 42 km
  Ateenasta koilliseen. n. 38.1194°N, 23.9767°E — MUUALTA ATTIKASTA,
  ei Ateenasta. (Liittyy jo pelissä olevaan Kallimarmaro/Spyridon
  Louis -maratontarinaan.)
- **Lähde:** en.wikipedia.org/wiki/Battle_of_Marathon
- **Lainaus/perustelu:** "The Athenian and Plataean dead of Marathon were buried on the battlefield in two tumuli. On the tomb of the Athenians this epigram composed by Simonides was written..."
- **Varmuus:** VARMA — suoraan lähteessä.

---

## Hylätyt ehdokkaat

- **Sokrateen vankila** ("Socrates' Prison"): Wikipediassa ei ole
  omaa artikkelia aiheesta (haku palautti "missing"), eikä
  liittyvistä artikkeleista (Philopappos-monumentti) löytynyt mainintaa
  kalliokammioista, joita perinteisesti kutsutaan Sokrateen vankilaksi.
  Tunnistus on joka tapauksessa kiistanalainen — hylätty, koska ei
  löytynyt luotettavaa lähdevahvistusta.
- **Klepsydra-lähde** Akropoliin juurella: Wikipedia-haku
  ("Klepsydra (spring)") palautti "missing" — ei artikkelia
  varmennettavaksi. Hylätty toistaiseksi.
- **Nymfien kukkula** ("Hill of the Nymphs"): Wikipedia-artikkeli
  ohjautuu suoraan Philopappos-monumentin artikkeliin eikä sisällä
  erillistä sisältöä nymfeistä tai observatoriosta tällä kukkulalla —
  hylätty päällekkäisyytenä, ei tuo mitään uutta.
- **Ateenan pyhä vartijakäärme** (legenda, jonka mukaan Akropoliksen
  käärme kieltäytyi kerran syömästä hunajakakkuaan ja ateenalaiset
  tulkitsivat sen merkiksi evakuoida kaupunki ennen Salamista):
  tarkistin sekä Athena- että Themistokles-artikkelit, kummastakaan ei
  löytynyt mainintaa käärmeestä tai Salamiin evakuoinnista tässä
  yhteydessä. Tarina on laajalti tunnettu (Herodotos/Plutarkhos), mutta
  koska en saanut sitä suoraan Wikipediasta vahvistettua tässä haussa,
  hylätty tästä raportista. (Erekhteionin fyysinen käärmekuoppa sen
  sijaan ON vahvistettu, ks. täky 6.)
- **Philopappoksen monumentti** sellaisenaan: sisältö vahvistui hyvin
  (syyrialainen ruhtinas, roomalainen konsuli, hautamonumentti Muusien
  kukkulalla), mutta yksityiskohdat ovat enemmän oppikirjamaisia
  (arvonimet, veistokset) kuin yllättävä koukku — ei tarpeeksi "täky"-
  luonnetta verrattuna muihin ehdokkaisiin. Jätetty pois tilan
  säästämiseksi, vaikka olisi periaatteessa kelvollinen.
- **Kansallinen observatorio** (perustettu 1842, Kreikan vanhin
  tutkimuslaitos, teki ensimmäisen Kuu-kartan): sisältö vahvistui
  hyvin lähteestä, mutta on luonteeltaan enemmän oppikirjafakta
  (perustamisvuosi, tutkijoiden nimet) kuin katukuvasta löytyvä
  yksityiskohta — ei valittu mukaan täkylistaan, koska "vesikello"-
  tyyppistä yllätyskoukkua ei löytynyt.
- **Suosittu tarina Hadrianuksen portin kyltistä** ("tämä ei ole
  Theseuksen kaupunki"): tarkka kansanomainen käännös EI löytynyt
  Wikipedia-artikkelista sellaisenaan — vain vahvistus, että kyltit
  nimeävät kaksi eri perustajaa ja että suosittu tulkinta portista
  kaupunginosien rajana on osoitettu vääräksi. Käytetty täky 16:ssa
  vain lähteen tarkasti tukemassa muodossa, karsittu liioiteltu
  käännösversio pois.

---

## Yhteenveto

**VARMOJA täkyjä (suoraan lähteestä vahvistettu): 17/19**
(täkyt 1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19 ovat
kokonaan VARMOJA. Täkyt 3, 5 ja 18 ovat VARMOJA pääosiltaan, mutta
sisältävät yhden osaväitteen, jonka lähde itse toteaa epäselväksi/
todistamattomaksi — merkitty kunkin kohdan Varmuus-kentässä erikseen.
Yksikään täky ei jäänyt kokonaan vahvistamatta.)

**Kolme parasta ehdotustani:**

1. **#10 — Troijan kultaa löytäneen miehen palatsi Ateenan keskustassa
   (1873!):** täydellinen osuma pelin 1873-teemaan — päivämäärä
   (15.6.1873) ja paikka (Numismaattinen museo, käveltävissä oleva
   osoite) ovat molemmat tarkkoja, ja tarina (kultaa löytyi juuri
   viimeisenä kaivauspäivänä) on aidosti jännittävä.
2. **#9 — Rakennus, jonka seinän sisällä on rakentajan oma pää:**
   klassinen Firenze-tyylinen täky — konkreettinen, hieman karmiva
   yksityiskohta yhdestä tunnetuimmista Ateenan rakennuksista, joka saa
   pelaajan haluamaan käydä paikan päällä katsomassa.
3. **#1 — Filosofi, joka asui savisaviastiassa ja etsi valehtelijaa
   lyhdyllä:** sijoittuu suoraan Agoralle, jossa pelillä on jo
   sisältöä — täydentää olemassa olevaa juttua ilman päällekkäisyyttä,
   ja Diogenes-hahmo on visuaalisesti ja tarinallisesti erittäin
   vahva koukku 13+-yleisölle.

Kunniamaininta: **#7 (siivetön Voitto)** ja **#2 (hautakivimuuri)**
ovat molemmat lyhyitä, iskeviä ja suoraan paikkaan sidottuja — hyviä
varapelaajia, jos kolme kärkeä eivät sovi juuri siihen kohtaan
tarinaa, jota ollaan rakentamassa.
