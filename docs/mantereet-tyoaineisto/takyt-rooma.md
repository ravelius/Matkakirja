# Täkyehdokkaat: Rooma

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten, sama malli kuin
docs/mantereet-tyoaineisto/takyt-ateena.md. Omistajan KIIREELLINEN
tilaus 25.8.2026 (Raamattu, osio "Fokusmoodi": *"ITALIA/ROOMA jonoon
KIIREELLISENÄ (kaverit kiinnostuneita)"*, beta-tavoite n. 1.9.2026).

**Tila:** kartoitus. EI koodia, EI muutoksia olemassa oleviin
tiedostoihin. Fable valitsee, mitkä viedään peliin ja missä
sanamuodossa.

## Tarkistustapa

- Wikipedia-artikkelit haettu 25.8.2026 komennolla
  `curl -sS -A "<UA>" "https://en.wikipedia.org/w/api.php?action=query&titles=<ARTIKKELI>&prop=extracts&explaintext=1&format=json&formatversion=2&redirects=1"`.
  Rajapinta vastasi ensin 429:llä ("You are making too many requests");
  haut uusittiin kasvavalla viiveellä (4 s → 8 s → 12 s...) ja
  User-Agent-otsakkeen kanssa, jolloin kaikki menivät läpi.
- Ei mitään muistinvaraista. Jokaisen täyn alla on artikkeli, sen
  osio ja lainaus, johon väite nojaa.
- **Koordinaatit** en-Wikipedian `prop=coordinates`-rajapinnasta, EIVÄT
  arvattuja. Kaksi kohdetta (Pasquino, Vatikaanin obeliski) ei anna
  rajapinnasta koordinaatteja — niiden sijainti on kuvattu sanallisesti
  ja merkitty erikseen.
- **Kuvat:** jokaisen ehdotetun Commons-tiedoston olemassaolo, koko,
  lisenssi ja tekijä on kysytty erikseen Commonsin `imageinfo`-
  rajapinnalla — ei arvattuja tiedostonimiä. Kaikki ehdotetut ovat PD,
  CC0 tai CC BY / CC BY-SA.
- **fi-nimet** tarkistettu fi-Wikipediasta (`redirects=1`) siellä missä
  suomenkielinen muoto on käytössä.

---

## Olemassa oleva Rooma-sisältö repossa (grep js/packs/)

`grep -ril "rooma\|italia\|colosseum\|vatikaan" js/packs/` ja tarkennetut
haut antoivat seuraavan. **Alla olevat täkyt on valittu kiertämään
kaikki nämä.**

- **js/packs/nahtavyysjutut.js** (rivit n. 4964–5260), avain `rooma`:
  kuusi valmista nähtävyysjuttua — **Pietarinkirkko** (Konstantinuksen
  vanha kirkko sen alla), **Castel Sant'Angelo** (Hadrianuksen
  mausoleumi), **Espanjalaiset portaat** (1723–25, Keatsin hautakirjoitus
  "writ in water"), **Trevin suihkulähde** (antiikin vesijohdon pää,
  n. 3 000 € kolikoita päivässä), **Pantheon** (kupolin kevenevä betoni,
  Cassius Dion kuvaus) ja **Colosseum** (Vespasianus, Colossus-ennustus
  "Quamdiu stat Colisæus...").
- **js/packs/kulttuuri-kategoriat.js** (rivi n. 9403 alkaen):
  "Matkailijan Rooma" — liikkuminen, ilmainen Rooma, neljä pastaa,
  torit, ilta, hintataso, helle, jonot, taskuvarkaat, kävelykengät,
  vuodenajat, linkit. Lisäksi nostot: **Kolikko olan yli** (Trevi,
  Caritas), **Leijona nousi lattian alta** (Colosseumin hypogeum,
  80 pystykuilua), **Areena kauempaa**, **Norsu kantaa obeliskia**
  (Berninin norsu Piazza della Minervalla, "Rooman kolmestatoista
  muinaisobeliskista pienin").
- **js/packs/europe-saapumiset.js**, avain `rooma`: saapumisteksti,
  jossa **Trevin kolikko** ja isoisän lause kahdesta kolikosta —
  vaanijateema. (Tehtävänannon mainitsema Trevi-maininta on tässä.)
- **js/packs/europe-questions.js**, avain `rooma`: kysymykset
  Vatikaanista, Colosseumista, latinasta, Pantheonin kupolista,
  akvedukteista; lisäksi maininnat ilmaisista juomavesihanoista.
- **js/packs/europe-artikkelit.js**: `Rooma`- ja `Italia`-artikkelit
  (seitsemän kukkulaa, 753 eaa., insinöörit, **pääkaupungiksi vasta
  1871**, Vatikaani sisällä).
- **js/packs/europe-valokuvat.js** ja **paivan-kuvat.js**: Trevin
  photochrom 1890-luvulta, Colosseum + Meta Sudans (LOC, PD),
  nykykuvat.
- **js/packs/julisteet.js**: `rooma`, juliste "Rooma 1873", selitteessä
  jo pääkaupunkiuutinen.
- **js/packs/miniatyyrit.js**: kuusi Rooma-miniatyyriä (samat kohteet
  kuin nähtävyysjutuissa).
- **js/packs/europe.js**: Italian pelilaatat ovat **Venetsia, Firenze,
  Rooma ja Sisilia**; kartalla on Colosseum-merkki (494, 804) ja
  tulivuorimerkki Sisilian kaakkoispuolella (498, 924 = Etna).

**Johtopäätös:** Pietarinkirkko, Enkelinlinna, Espanjalaiset portaat,
Keats, Trevi, Pantheon, Colosseumin areena ja Colossus-ennustus,
Berninin norsu, akveduktit, juomavesihanat, Vatikaanin pienuus ja
"pääkaupungiksi 1871" ovat JO KÄYTÖSSÄ. Uudet täyt tulevat niiden ohi:
uusia paikkoja (Torre Argentina, Cestiuksen pyramidi, Aventinus,
Kapusiinien krypta, Pasquino, Passetto), uusia kulmia jo tunnettuun
(Colosseumin kasvitiede, ei areena) ja **1871–73-aikakausikoukku**,
jota pelissä on toistaiseksi vain julisteen selitteessä.

---

## Täkyt

### 1. Kissapyhäkkö Caesarin murhapaikan raunioissa (ELÄINTÄKY)

Largo di Torre Argentinan kaivauskuoppa keskellä Roomaa paljastui
vahingossa: kaupunkia rakennettiin uusiksi Italian yhdistymisen
jälkeen, ja kun korttelia purettiin vuonna 1927, maasta tuli esiin
jättiläispatsaan pää ja käsivarret. Alta löytyi neljä tasavallan ajan
temppeliä ja pala Pompeiuksen teatteria — ja juuri se paikka, jossa
Julius Caesar uskotaan murhatun. Kaivauksen jälkeen paikalle alkoi
kerääntyä kulkukissoja. Ne asuvat siellä yhä: temppeli D:n kohdalla
toimii kissasuoja, jota 1950-luvulta lähtien on pidetty yllä
avaimenperinnöllä näyttelijältä toiselle (mukana mm. Anna Magnani),
ja joka on vuodesta 1993 ollut virallinen, tappamaton suoja.

- **Paikka:** Largo di Torre Argentina, Campus Martius, Rooman
  keskusta. 41,8953°N, 12,4769°E (en-Wikipedia, coordinates).
- **Lähde:** en.wikipedia.org/wiki/Largo_di_Torre_Argentina (johdanto
  ja osio "Cat shelter") sekä en.wikipedia.org/wiki/Torre_Argentina_Cat_Sanctuary.
- **Lainaus/perustelu:** "Julius Caesar was assassinated in the Curia
  of Pompey, and the spot where he is believed to have been assassinated
  is in the square." — "during the demolition work in 1927, the
  colossal head and arms of a marble statue were discovered." — "The
  Torre Argentina Cat Sanctuary is located in Temple D... The cat
  shelter was founded in 1993 and offers sterilization and adoption
  programs... The shelter operates as a no-kill shelter under Law
  no. 281, enacted by the Italian Parliament in 1991."
- **Kuva:** Commons **Cat Sanctuary, Cats, Largo di Torre Argentina,
  Rome - 398 (19257774921).jpg** (5760×3840, CC BY 2.0, Andy Rusch,
  2015) — kissat raunioilla. Vaihtoehto: **Largo di Torre Argentina
  cat 11.jpg** (3072×2304, CC BY-SA 3.0, Wknight94, 2008).
- **Varmuus:** VARMA. **RISTIRIITA MERKITTÄVÄ:** kissojen määrä eroaa
  kahden en-artikkelin välillä — Largo-artikkeli sanoo "an estimated
  350 cats", kissasuoja-artikkeli "around 150 cats". Käytä muotoa
  "toista sataa kissaa" tai jätä luku pois. Caesarin murhapaikasta
  lähde itse sanoo "is believed to have been" — sano "uskotaan", ei
  "on".

### 2. Rooman lokit, jotka alkoivat metsästää rottia (ELÄINTÄKY)

Roomassa asuu suuri kaupunkipopulaatio isokokoisia keltajalkalokkeja,
jotka elävät tavallisesti ihmisten ruoantähteillä. Kun Italia sulkeutui
vuonna 2020 eivätkä katujen roskikset enää täyttyneet, Rooman lokit
vaihtoivat ruokavaliota: ne alkoivat saalistaa niin isoja eläimiä kuin
rottia ja puluja. Sama lintu, joka odottaa turistin pizzapalaa
Colosseumin edessä, osaa siis vaihtaa petolinnuksi parissa viikossa.

- **Paikka:** koko Rooman keskusta; havainnot kaupunkilokeista.
- **Lähde:** en.wikipedia.org/wiki/Yellow-legged_gull, osio ruokailusta.
- **Lainaus/perustelu:** "Although urban populations are generally
  opportunistic scavengers, they can shift to a predatory diet if
  necessary; this was observed during the lockdown of Italy in 2020,
  when the lack of food scraps led the yellow-legged gulls of Rome to
  take prey as large as rats and rock doves."
- **Kuva:** Commons **Pensive seagull in Rome.jpg** (1296×1729,
  CC BY 4.0, Marigold352, 2023).
- **Varmuus:** VARMA — suoraan lähteessä. EPÄVARMA/ei vahvistettu se,
  että lokit pesisivät juuri Colosseumin tai Torre Argentinan päällä
  (tehtävänannon oletus); Wikipedia ei sano tätä, joten sitä ei väitetä.

### 3. Colosseumissa on kasvanut 684 kasvilajia — ja isoisä osui kitkennän jälkeen

Colosseumin raunioiden kasvillisuudesta on tehty luetteloita vuodesta
1643 lähtien, ja kaikkiaan sieltä on tunnistettu 684 kasvilajia. Huippu
oli vuonna 1855, jolloin muureilla kasvoi 420 lajia yhtä aikaa — oma
puutarha keskellä kaupunkia, ja monet lajeista sellaisia, joita ei
kasva muualla Roomassa. Vuonna 1871 kasvit yritettiin hävittää, koska
juurten pelättiin rikkovan kiveä. Isoisä olisi siis vuonna 1873
nähnyt vasta kitketyn Colosseumin. Kasvit palasivat: nykyään lajeja
lasketaan 242, ja niistä 200 on samoja, jotka luetteloitiin jo 1643.

- **Paikka:** Colosseum, 41,8903°N, 12,4922°E (en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/Colosseum, osio "Flora".
- **Lainaus/perustelu:** "The Colosseum has a wide and well-documented
  history of flora ever since Domenico Panaroli made the first catalogue
  of its plants in 1643. Since then, 684 species have been identified
  there. The peak was in 1855 (420 species). Attempts were made in 1871
  to eradicate the vegetation, because of concerns over the damage that
  was being caused to the masonry, but much of it has returned. Two
  hundred forty-two species have been counted today and of the species
  first identified by Panaroli, 200 remain."
- **Kuva:** Commons **Flora of the Colosseum of Rome by Richard
  Deakin.jpg** (1161×1951, public domain, Richard Deakin, 1850-luku) —
  juuri sen kirjan nimiölehti, jossa 420 lajia kuvattiin.
- **Varmuus:** VARMA — suoraan lähteessä. 1871→1873-vertailu on oma
  ajoituspäätelmäni, ei Wikipedian väite. **Ei mene päällekkäin** jo
  pelissä olevan Colosseum-sisällön (hypogeum, Colossus-ennustus)
  kanssa.

### 4. Paavi julistautui oman kaupunkinsa vangiksi — ja pysyi sisällä 59 vuotta

Kun Italian armeija otti Rooman 20.9.1870, paaville tarjottiin omaa
pikkuvaltiota Vatikaanin kukkulalla. Pius IX kieltäytyi. Vuoden 1871
takuulaki olisi antanut hänelle kuninkaan arvoiset kunnianosoitukset
ja oikeuden lähettää lähettiläitä, mutta hän ei hyväksynyt sitäkään:
lain voisi kumota sama valta, joka sen antoi. Niinpä paavi jäi
Vatikaanin palatsiin eikä poistunut sieltä — ei hänkään eikä yksikään
hänen seuraajistaan ennen vuotta 1929. Paavit kieltäytyivät edes
näyttäytymästä Pietarinaukiolle päin antavalla parvekkeella, ja
siunaukset annettiin sisäpihalle. Isoisän matkavuonna 1873 tilanne oli
tuore ja päällä: Rooma oli ollut Italian pääkaupunki kaksi vuotta ja
paavi "Vatikaanin vanki" kolme.

- **Paikka:** Vatikaani / Pietarinaukio, 41,9022°N, 12,4572°E
  (en-Wikipedia "St. Peter's Square").
- **Lähde:** en.wikipedia.org/wiki/Prisoner_in_the_Vatican (johdanto,
  osiot "Beginnings" ja "Law of Guarantees") sekä
  en.wikipedia.org/wiki/Capture_of_Rome.
- **Lainaus/perustelu:** "...from the capture of Rome by the Royal
  Italian Army on 20 September 1870 until the Lateran Treaty of
  11 February 1929... the popes from Pius IX to Pius XI refused the
  proposal and described themselves as prisoners of the new Italian
  state." — "For the next 59 years, the popes refused to leave the
  Vatican... popes also refused to appear at Saint Peter's Square or at
  the balcony of St. Peter's Basilica facing it."
- **Kuva:** Commons **Pius IX, by Adolphe Braun, 1875.jpg** (3172×4000,
  public domain, Adolphe Braun, 13.5.1875) — valokuva paavista kaksi
  vuotta isoisän matkan jälkeen.
- **Varmuus:** VARMA — suoraan lähteessä. **IKÄSOPIVUUS/SÄVY:** aihe on
  poliittis-uskonnollinen ja sitä kannattaa kertoa tapahtumana, ei
  kantana. Lähde mainitsee myös kuninkaan kirkonkirouksen ja
  Garibaldin kärkevän sitaatin paaviudesta — ne EIVÄT kuulu tähän.

### 5. Muurissa on reikä, joka valokuvattiin seuraavana aamuna

Rooman valtaus kesti yhden aamupäivän. Italian tykistö aloitti tulen
kello viideltä 20.9.1870, ja muutaman tunnin päästä Aurelianuksen
muuriin oli ammuttu aukko Porta Pian viereen; siitä joukot virtasivat
kaupunkiin. Taistelussa kuoli 49 italialaista ja 19 paavin sotilasta.
Pietarinkirkon kupoliin nostettiin valkoinen lippu. Aukkoa ei
kuitenkaan tunneta maalauksesta vaan valokuvasta: Ludovico Tuminello
kuvasi murtuman jo seuraavana päivänä, 21. syyskuuta 1870 — ja kun
isoisä kolme vuotta myöhemmin käveli samaa katua, muurinaukko oli
kaupungin tuorein nähtävyys.

- **Paikka:** Porta Pia, 41,9092°N, 12,5011°E (en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/Capture_of_Rome, osio taistelusta.
- **Lainaus/perustelu:** "At 5 a.m. on 20 September, Italian artillery
  began firing at the city walls... After a few hours, the Italian army
  breached the Aurelian Walls near Porta Pia, through where the troops
  flooded into Rome. Forty-nine Italian soldiers and 19 Papal soldiers
  died in the fighting." — "A white flag was hoisted from the dome of
  St. Peter's Basilica."
- **Kuva:** Commons **Ludovico Tuminello - Veduta panoramica della
  breccia di Porta Pia scattata il 21 settembre 1870.jpg** (2048×998,
  public domain, Ludovico Tuminello, 1870).
- **Varmuus:** VARMA — suoraan lähteessä. HUOM: lähde antaa kaksi
  eri uhrilukua (49 + 19, tai 2009 julkaistun Vatikaanin sotahistorian
  mukaan 32 + 12 kuollutta). Jos luku halutaan, käytä muotoa
  "muutamia kymmeniä molemmin puolin" tai jätä pois.

### 6. Roomassa on egyptiläinen pyramidi — ja se säilyi, koska muuri niellä sen

Roomalainen virkamies Gaius Cestius rakennutti itselleen noin vuosina
18–12 eaa. haudan, joka on kopio Nubian pyramideista: 30 metriä leveä,
37 metriä korkea, valkoista marmoria tiilibetonin päällä. Se seisoo
yhä. Syy on epäromanttinen: kun kaupungin ympärille rakennettiin
Aurelianuksen muuri, pyramidi muurattiin suoraan osaksi
puolustusvarustusta — ja siksi se on nykyään Rooman parhaiten
säilyneitä antiikin rakennuksia. Hautakammio oli suljettu ilman
sisäänkäyntiä; kun se avattiin 1660, sisältä löytyi freskoja, mutta ei
mitään muuta: hauta oli ryöstetty jo antiikin aikana.

- **Paikka:** Piramide Cestia, Porta San Paolon vieressä.
  41,8764°N, 12,4808°E (en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/Pyramid_of_Cestius, johdanto ja
  osio "Physical attributes".
- **Lainaus/perustelu:** "It was built in the style of the Nubian
  pyramids as a tomb for Gaius Cestius... Due to its incorporation into
  the city's fortifications, it is today one of the best-preserved
  ancient buildings in Rome." — "The tomb had been sealed when it was
  built, with no exterior entrance, but had been plundered at some time
  thereafter, probably during antiquity."
- **Kuva:** Commons **Piramide Cestia.jpg** (3505×3287, CC BY-SA 4.0,
  Livioandronico2013, 2014).
- **Varmuus:** VARMA — suoraan lähteessä.

### 7. Hautausmaa, jossa kissat kävelevät runoilijoiden yli — ja yksi sydän puuttuu

Pyramidin kyljessä on ei-katolinen hautausmaa, jonne haudattiin ne,
joita ei saanut haudata siunattuun maahan. Hautaukset tehtiin öisin
turvallisuussyistä. Siellä lepäävät John Keats ja Percy Bysshe Shelley
— ja lähteen mukaan hautakivien välissä kävelevät häiritsemättä
kissat, joista paikka on yhtä tunnettu kuin runoilijoistaan. Shelley
hukkui purjehdusonnettomuudessa 1822 ja poltettiin rannalla; kerrotaan,
että hänen sydämensä ei palanut ja että Edward Trelawny sieppasi sen
liekeistä. Sydän päätyi leski Mary Shelleylle, ja kun Mary kuoli, se
löytyi hänen kirjoituspöydästään käärittynä siihen runoon, jonka
Shelley oli kirjoittanut Keatsin kuolemasta. Roomassa olevaan
hautakiveen on kaiverrettu *Cor cordium*, "sydänten sydän" — mutta itse
sydän haudattiin lopulta 1889 Englantiin.

- **Paikka:** Cimitero Acattolico, Testaccio. 41,8764°N, 12,4799°E
  (en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/Protestant_Cemetery,_Rome, johdanto,
  osio "History" ja osiot "John Keats"/"Percy Bysshe Shelley".
- **Lainaus/perustelu:** "...burials occurred at night to avoid
  manifestations of religious fanaticism..." — "...together with the
  cats that walk undisturbed among the tombstones written in all the
  languages of the world, give to this small cemetery a peculiar aura."
  — "Shelley's heart supposedly survived cremation and was snatched out
  of the flames by Trelawny... When Mary Shelley died, the heart was
  found in her desk wrapped in the manuscript of 'Adonais'... Shelley's
  heart was finally buried, encased in silver, in 1889."
- **Kuva:** Commons **9024 - Roma - Cimitero acattolico - Tomba Percy
  Bysshe Shelley (1792-1822) - Foto Giovanni Dall'Orto,
  31-March-2008.jpg** (1360×2048, lisenssi Commonsissa "Attribution",
  Giovanni Dall'Orto) — nimeäminen pakollinen.
- **Varmuus:** VARMA hautausmaan, kissojen ja hautakiven osalta.
  **EPÄVARMA sydämen osalta — lähde itse sanoo "supposedly"**; kerro
  siis "kerrotaan", älä "sieppasi". Keatsin hautakirjoitus ("writ in
  water") on JO PELISSÄ (Espanjalaiset portaat) — älä toista sitä,
  vaan käytä tätä täkyä kissoihin ja Shelleyn sydämeen.

### 8. Kirkko, jonka kellarissa luut ovat sisustusta

Piazza Barberinin kupeessa on kapusiinien kirkko, jonka alla on viiden
kappelin krypta. Kardinaali Antonio Barberini määräsi 1631 tuhansien
kapusiiniveljien jäännökset siirrettäviksi vanhasta luostarista tänne.
Osa luurangoista on kokonaisia ja puettu munkinkaapuun, mutta suurin osa
luista on ladottu seiniin koristekuvioiksi. Kappelin kyltissä lukee
kolmella kielellä: "Se mitä te nyt olette, olimme mekin; se mitä me nyt
olemme, tulette tekin olemaan." Krypta oli aikoinaan yhtä suosittu
matkakohde kuin katakombit — ja isoisän aikaan sitä kannatti käydä
katsomassa juuri siksi.
**Sama osoite, toinen täky:** kirkon ensimmäisessä kappelissa on Guido
Renin maalaus arkkienkeli Mikaelista, joka polkee Saatanaa jalkansa
alle. Legendan mukaan Reni antoi Saatanalle kardinaali Giovanni
Battista Pamphiljin kasvot kostoksi tämän loukkauksesta.

- **Paikka:** Santa Maria della Concezione dei Cappuccini, Via Vittorio
  Veneto 27. 41,9046°N, 12,4887°E (en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/Santa_Maria_della_Concezione_dei_Cappuccini,
  osiot "Crypt" ja "Chapels".
- **Lainaus/perustelu:** "Cardinal Antonio Barberini... in 1631 ordered
  the remains of thousands of Capuchin friars exhumed and transferred
  from the friary Via dei Lucchesi to the crypt... Some of the skeletons
  are intact and draped with Franciscan habits, but for the most part,
  individual bones are used to create elaborate ornamental designs." —
  "A plaque in one of the chapels reads, in three languages, 'What you
  are now, we once were; what we are now, you shall be.'" — "The
  popularity of the crypt as a tourist attraction once rivalled the
  Catacombs." — "According to a legend, Reni had heard that Cardinal
  Giovanni Battista Pamphilj had defamed him... gave rise to a story
  that Reni had represented Satan—crushed under St Michael's foot—with
  the facial features of Cardinal Pamphilj in revenge for the slight."
- **Kuva:** Commons **Capuchin Crypt.jpg** (1280×960, CC BY-SA 2.5,
  Stanthejeep) tai **Roma - Santa Maria della Concezione dei Cappuccini
  - crypt - panoramio.jpg** (672×896, CC BY-SA 3.0, jeffwarder).
  Reni-täkyyn: **GuidoReni MichaelDefeatsSatan.jpg** (1657×2441, public
  domain, Guido Reni, n. 1630–35).
- **Varmuus:** VARMA kryptan osalta. **Lähde ei anna munkkien
  lukumäärää** — se sanoo vain "thousands"; älä siis kirjoita
  "3 700", vaikka luku esiintyy muualla. Renin Saatanan kasvoista lähde
  sanoo itse "according to a legend" ja "gave rise to a story" — kerro
  se legendana. **IKÄSOPIVUUS:** krypta on aito matkailukohde ja
  sopii 13+ -yleisölle asiallisesti kerrottuna; mässäily pois.

### 9. Patsas, joka oli Rooman pilalehti 500 vuotta ennen sanomalehtiä

Parionen kaupunginosasta kaivettiin 1400-luvulla esiin runneltu
antiikin marmoritorso. Se sai nimekseen Pasquino. Kun kardinaali
Oliviero Carafa 1500-luvun alussa puki sen toogaan ja koristi
latinankielisillä epigrammeilla, syntyi tapa: roomalaiset alkoivat
kiinnittää patsaan jalustaan nimettömiä pilkkarunoja, joissa
arvosteltiin paavia ja hänen hallintoaan. Näin syntyi Rooman
ensimmäinen "puhuva patsas" — ja englannin sana *pasquinade*,
nimetön pilkkakirjoitus. Patsas on yhä paikallaan, ja sen jalustaan
kiinnitetään yhä lappuja.

- **Paikka:** Piazza Pasquino, Palazzo Braschin (Museo di Roma)
  luoteiskulma, Piazza Navonan vieressä. **Koordinaatteja ei saatu
  rajapinnasta** — sijainti kuvattu sanallisesti lähteen mukaan.
- **Lähde:** en.wikipedia.org/wiki/Pasquino, johdanto ja osio "History".
- **Lainaus/perustelu:** "The statue is known as the first of the
  talking statues of Rome, because of the tradition of attaching
  anonymous criticisms to its base." — "The Cardinal's actions led to a
  custom of criticizing the pope or his government by the writing of
  satirical poems in broad Roman dialect—called 'pasquinades'... He
  spoke out about the people's dissatisfaction, denounced injustice, and
  assaulted misgovernment by members of the Church."
- **Kuva:** Commons **Pasquino 2018.jpg** (4365×7397, CC BY-SA 4.0,
  Architas, 2018).
- **Varmuus:** VARMA — suoraan lähteessä. Kytkeytyy hyvin täkyyn 4
  (paavin ja kaupungin suhde) ilman että toistaa sitä.

### 10. Valehtelijan käsi katkeaa — mutta esine on todennäköisesti viemärinkansi

Santa Maria in Cosmedin -kirkon eteishallissa seisoo seinää vasten
1 300 kilon marmorinaamio, joka esittää todennäköisesti merenjumala
Okeanosta. Keskiaikaisen legendan mukaan naamio puree käden irti
jokaiselta valehtelijalta, joka työntää kätensä sen suuhun — ja
turistit työntävät yhä. Historioitsijat eivät ole varmoja, mihin kiveä
alun perin käytettiin: yksi arvaus on, että se oli viereisen Hercules
Victorin temppelin sadevesikaivon kansi, toinen että karjakauppiaat
valuttivat sen läpi uhrieläinten veren. Naamio siirrettiin kirkon
seinään vasta 1200-luvulla ja nykypaikalleen 1600-luvulla.

- **Paikka:** Bocca della Verità, Santa Maria in Cosmedin, entinen
  Forum Boarium. 41,8881°N, 12,4817°E (en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/Bocca_della_Verità (johdanto).
- **Lainaus/perustelu:** "According to an enduring medieval legend, it
  will bite off the hand of any liar who places their hand in its
  mouth... The massive marble mask weighs about 1,300 kg... and probably
  depicts the face of the sea titan god Oceanus... Historians are not
  quite certain what the original purpose of the disc was. It was
  possibly used as a drain cover in the nearby Temple of Hercules
  Victor... It is also thought that cattle merchants used it to drain
  the blood of cattle sacrificed to the demi-god Hercules."
- **Kuva:** Commons **Rome (IT), Bocca della Verità -- 2013 --
  3479.jpg** (3451×5176, CC BY-SA 4.0, Dietmar Rabich, 2013).
- **Varmuus:** VARMA legendan ja epävarmuuden osalta (lähde toteaa itse
  alkuperän epäselväksi). **HUOM:** *Loma Roomassa* (1953) mainitaan jo
  pelissä (nahtavyysjutut.js) — elokuvakulma on siis käytetty, käytä
  tässä viemärinkansi-kulmaa.

### 11. Paavin salakäytävä kaupungin muurin sisällä

Vatikaanista Enkelinlinnaan johtaa 800 metrin pituinen käytävä, joka on
rakennettu vanhan kaupunginmuurin sisään. Ylätaso on tavallinen
vartiokäytävä; sen alla kulkee peitetty pakoreitti. Sitä on käytetty
ainakin kahdesti oikeasti: paavi Aleksanteri VI pakeni sitä pitkin
1494 Kaarle VIII:n hyökätessä, ja Klemens VII pelastui samaa reittiä
Rooman ryöstön aikana 1527. Käytävä näkyy kadulle asti — se on se
korkea muuri, jonka ohi kävellään Pietarinkirkolle mennessä.

- **Paikka:** Passetto di Borgo, Borgon kaupunginosa. 41,9033°N,
  12,4617°E (en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/Passetto_di_Borgo, johdanto ja osio
  "History".
- **Lainaus/perustelu:** "The passage is an approximately 800-metre-long
  corridor, built within an old city wall of Rome. Its most significant
  purpose was to provide the Pope with a protected escape route from the
  Vatican, and it was used at least twice for this reason... In its
  current form, it has two levels: the top level is a standard patrol
  walkway, and underneath it is the hidden enclosed escape passage." —
  "Pope Alexander VI crossed it in 1494... Clement VII escaped to safety
  through this passage during the Sack of Rome in 1527."
- **Kuva:** Commons **Passetto di Borgo from Castel Sant'Angelo
  01.jpg** (3264×2448, CC BY-SA 3.0, Chris 73).
- **Varmuus:** VARMA — suoraan lähteessä. **IKÄSOPIVUUSRAJAUS:** lähde
  mainitsee 1527 sveitsiläiskaartin joukkosurman Pietarinkirkon
  portailla. Se EI kuulu täkyyn; riittää "kaupunki oli hyökkäyksen
  kohteena".
- **Ei mene päällekkäin** jo pelissä olevan Castel Sant'Angelo -jutun
  kanssa (se kertoo Hadrianuksen mausoleumista).

### 12. Lukonreiästä näkyy toisen valtion kupoli

Aventinuksen kukkulalla on pieni aukio, jonka toisella laidalla on
Maltan ritarikunnan villa. Sen portin keskellä on avaimenreikä. Kun
siitä katsoo, näkee kolmen valtion läpi kerralla: reiän takana on
ritarikunnan puutarha (jolla on Italiassa eksterritoriaalinen asema),
sen läpi kulkee sypressien rajaama käytävä, ja käytävän päässä
täydellisesti rajautuneena Pietarinkirkon kupoli Vatikaanissa. Portin
suunnitteli 1765 Giovanni Battista Piranesi — kuparipiirrostaiteilija,
joka piti itseään ennen kaikkea arkkitehtina ja jonka harvoista
toteutuneista rakennussuunnitelmista tämä on yksi.

- **Paikka:** Villa del Priorato di Malta, Piazza dei Cavalieri di
  Malta, Aventinus. 41,8836°N, 12,4775°E (en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/Villa_del_Priorato_di_Malta, osiot
  "History", "Site" ja "Keyhole".
- **Lainaus/perustelu:** "The Villa is arguably best known for a small
  keyhole (Il Buco Della Serratura) in the arch-headed central portone,
  through which the copper-green dome of Saint Peter's Basilica, can be
  viewed at the end of a garden allée framed in clipped cypresses." —
  "the monumental entrance screen... designed by Piranesi under
  commission from Cardinal Carlo Rezzonico" — "The villa was granted
  extraterritoriality in 1869."
- **Kuva:** Commons **Knights of Malta Keyhole, Aventine Hill, Rome
  (cropped).jpg** (1536×2150, CC0, Galen Crout, 2016) — näkymä reiän
  läpi.
- **Varmuus:** VARMA — suoraan lähteessä.
- **HUOM FABLELLE:** tämä on täsmälleen se kuva, jota Raamattu käyttää
  täyn määritelmässä (*"tyyliä 'lukonreiästä näkyy täydellisesti
  rajautuva rakennus'"*). Se ei siis ole vain yksi täky vaan koko
  täkytyypin esikuva — ja se on oikeasti Roomassa. Bonus:
  eksterritoriaalisuus myönnettiin 1869, neljä vuotta ennen isoisän
  matkaa.

### 13. Kaupungin viemäri, jota käytiin katsomassa kuin nähtävyyttä

Cloaca Maxima kaivettiin alun perin kuivattamaan Forumin suoalue, ja
perinteen mukaan se aloitettiin kuningas Tarquinius Priscuksen
käskystä noin 600 eaa. Aluksi se oli avoin kanava; kaupungin
kasvaessa tontit kävivät kalliiksi ja kanava katettiin. Ensimmäisellä
vuosisadalla jaa. kaikki yksitoista akveduktia oli kytketty siihen, ja
osa linjastosta on käytössä yhä. Isoisän aikaan se oli jotain muuta
kuin viemäri: 1800-luvulla Cloaca Maximasta oli tullut turistikohde,
jota käytiin ihailemassa insinööritaidon muistomerkkinä.

- **Paikka:** suuaukko Tiberin rannassa Ponte Rotton kohdalla.
  41,8889°N, 12,4803°E (en-Wikipedia).
- **Lähde:** en.wikipedia.org/wiki/Cloaca_Maxima, johdanto ja osio
  "Construction and history".
- **Lainaus/perustelu:** "Built during either the Roman Kingdom or early
  Roman Republic... by the first century AD all eleven Roman aqueducts
  were connected to the sewer. After the Roman Empire fell the sewer was
  still used. By the 19th century, it had become a tourist attraction.
  Some parts of the sewer are still used today." — "According to
  tradition, it may have initially been constructed around 600 BC under
  the orders of the king of Rome, Tarquinius Priscus."
- **Kuva:** Commons **The Mouth of the Cloaca Maxima (I)
  (4924744246).jpg** (1107×1689, CC BY 2.0, Institute for the Study of
  the Ancient World, kuvattu 1968).
- **Varmuus:** VARMA. Rakennusvuodesta lähde sanoo itse "according to
  tradition, it may have" — käytä "perinteen mukaan". Pelissä on jo
  akveduktikysymys (europe-questions.js), mutta VIEMÄRI on eri asia
  eikä toistu.

### 14. Rooman kuuluisin susi ei ehkä olekaan roomalainen (ELÄINTÄKY)

Capitolinuksen susi on Rooman tunnus: pronssinen naarassusi, jonka alla
Romulus ja Remus imevät. Sitä pidettiin pitkään etruskilaisena,
500-luvulta eaa., ja kaksosten arveltiin lisätyn 1400-luvulla. Sitten
tuli restauroija: kun Anna Maria Carruba kunnosti patsaan 1997, hän
huomasi, että se on valettu yhtenä kappaleena — tekniikka, jota
antiikissa ei käytetty, mutta jolla keskiajalla valettiin kirkonkelloja
ja tykkejä. Radiohiiliajoitus 2007 antoi tulokseksi vuodet 1021–1153.
Kiista ei ole ohi: osa tutkijoista pitää ajoitusta virheellisenä ja
huomauttaa, että pronssin kupari on etruskityyppistä, Sardiniasta.

- **Paikka:** Capitolinuksen museot, Kapitolinen kukkula. 41,8931°N,
  12,4828°E (en-Wikipedia "Capitoline Museums").
- **Lähde:** en.wikipedia.org/wiki/Capitoline_Wolf, johdanto ja osio
  "Attribution and dating".
- **Lainaus/perustelu:** "The statue was long thought to be an Etruscan
  work of the fifth century BC, with the twins added in the late 15th
  century AD... radiocarbon and thermoluminescence dating in the 21st
  century has suggested that the wolf portion of the statue may have
  been cast between 1021 and 1153." — "She observed that the statue had
  been cast in a single piece... This technique was not used in
  Classical antiquity." — "The revised dating has not been universally
  accepted... he pointed out that metal from which the wolf is made is
  of the Etruscan type, using copper from Sardinia."
- **Kuva:** Commons **Lupa Capitolina, Rome.jpg** (7489×4876, CC0).
- **Varmuus:** VARMA kiistan olemassaolosta; **lähde toteaa itse, ettei
  konsensusta ole** ("there is yet no consensus for a revised dating").
  Kerro siis kiistana, älä ratkaisuna. **fi/en-RISTIRIITARISKI:** moni
  suomenkielinen lähde esittää patsaan yhä etruskilaisena — jos
  fi-Wikipediaa käytetään rinnalla, tarkista tämä kohta erikseen.

### 15. "Vettä köysille!" — huuto, joka pelasti obeliskin

Pietarinaukion keskellä seisova punagraniittinen obeliski tuotiin
Egyptistä keisari Caligulan käskystä vuonna 40 jaa., ja se on ainoa
Rooman muinaisobeliskeista, joka ei ole koskaan kaatunut. Vuonna 1586
paavi Sixtus V halusi sen siirrettäväksi 260 metriä. Arkkitehti
Domenico Fontana valmisteli työtä kolmetoista kuukautta ja siirsi
obeliskin yhdessä päivässä 10.9.1586: mukana 800 miestä, 160 hevosta ja
45 vinssiä. Kesken noston köydet olivat pettämässä, ja merimies
Benedetto Bresca huusi *"Acqua alle funi"* — vettä köysille. Huuto jäi
historiaan.

- **Paikka:** Pietarinaukio, Vatikaani. 41,9022°N, 12,4572°E
  (en-Wikipedia "St. Peter's Square"; obeliskilla itsellään ei ole
  koordinaatteja rajapinnassa).
- **Lähde:** en.wikipedia.org/wiki/Vatican_obelisk, johdanto ja osio
  "History".
- **Lainaus/perustelu:** "It is the only ancient obelisk in Rome that
  has never fallen." — "Emperor Caligula had it shipped to Rome in 40
  AD." — "it was moved 260 meters at the behest of Pope Sixtus V in a
  single day on September 10, 1586. The work was carried out under the
  direction of the architect Domenico Fontana who required thirteen
  months of preparatory work, 800 men, 160 horses and 45 winches... a
  famous cry by sailor Benedetto Bresca: Acqua alle funi ('Water on the
  ropes!'), in order to avoid breaking the ropes."
- **Kuva:** Commons **Obelisk Saint Peter square Vatican.jpg**
  (3031×4592, CC0, Jebulon, 2013).
- **Varmuus:** VARMA — suoraan lähteessä. **EI VAHVISTETTU:** laajalti
  kerrottu lisä siitä, että Sixtus V olisi kieltänyt puhumisen
  kuolemanrangaistuksen uhalla, EI löydy artikkelista. Älä kerro sitä.
  Berninin norsuobeliski on jo pelissä, mutta se on eri obeliski ja eri
  tarina — ei päällekkäisyyttä.

---

## Varapenkki (tarkistettu, ei mahtunut viidentoista joukkoon)

- **Quirinaali — paavin palatsi, jossa asuu kuningas.** Palatsi oli
  paavien asuinpaikka ja Kirkkovaltion hallinnon keskus vuoteen 1870;
  siellä pidettiin neljä konklaavia (1823, 1829, 1831, 1846). Valtauksen
  jälkeen siitä tuli Italian kuninkaiden virallinen asunto, ja 1873
  isoisä olisi nähnyt sen jo kuninkaan lippu salossa. Lähde:
  en.wikipedia.org/wiki/Quirinal_Palace. Kuva tarkistettu: **Roma -
  Palazzo del Quirinale 02.jpg** (3888×2592, CC BY-SA 4.0, Luca Aless).
  Hyvä pari täylle 4, jos aikakausikulmaa halutaan kaksi.
- **Mausoleum of Augustus, Trajanuksen pylväs, Piazza Navona:** haettu
  ja luettu, mutta jäivät ilman selvää yllätyskoukkua tähän erään.
  Aineisto on tallessa, jos näitä tarvitaan myöhemmin.

## Hylätyt / tarkistuksessa kaatuneet

1. **Aventinuksen avaimenreikä omana artikkelinaan.** Wikipedia-haku
   "Aventine Keyhole" palautti *missing* — artikkelia ei ole. Tieto on
   silti varmennettu, mutta se asuu Villa del Priorato di Malta
   -artikkelin osiossa "Keyhole" (ks. täky 12). Ei siis hylätty tietona,
   vain hakuosumana.
2. **Elävä susi Kapitolisen kukkulan häkissä.** Tunnettu tarina
   (Roomassa pidettiin oikeaa naarassutta kaupungin tunnuksena);
   Capitoline Wolf -artikkelista EI löydy mainintaa elävästä
   sudesta ("cage", "live wolf" eivät osuneet). Ei käyttöön ilman uutta
   lähdettä.
3. **Colosseumin ja Torre Argentinan lokkikolonia.** Tehtävänannon
   ehdotus. Lokkien läsnäolo Roomassa on vahvistettu (täky 2), mutta
   pesintä juuri näillä muinaisjäännöksillä EI ole vahvistettu tässä
   haussa. Käytä täkyä 2 sellaisenaan.
4. **Kapusiinikryptan "3 700 munkkia".** Luku on laajalti toistettu,
   mutta en-Wikipedia sanoo vain "thousands". Ei käyttöön numerona.
5. **Sixtus V:n vaikenemiskäsky obeliskinsiirrossa.** Ks. täky 15 —
   ei löydy lähteestä.
6. **Cestiuksen pyramidin sisätilan freskot nähtävyytenä.** Lähde
   kertoo, että vain hitusia freskoista on jäljellä ja että sisään
   pääsee kaksi lauantaita kuussa ennakkovarauksella — ei tarpeeksi
   koukku, ja tieto vanhenee. Pyramidi itse riittää (täky 6).

---

## Yhteenveto

**15 täkyä, kaikki tarkistettu; yksikään ei jäänyt vahvistamatta.**
Neljässä kohdassa lähde toteaa asian itse epävarmaksi tai kiistellyksi
(Caesarin murhapaikka "is believed", Shelleyn sydän "supposedly",
Renin Saatana "according to a legend", Capitolinuksen suden ajoitus
"no consensus") — nämä on merkitty kohdittain, ja niiden sanamuoto on
kirjoitettava varaukseksi.

**Eläintäyt (Raamatun ELÄINTÄYT-vaatimus, väh. 2 per maa): kolme.**
#1 kissapyhäkkö, #2 Rooman lokit, #14 Capitolinuksen susi (näistä kaksi
ensimmäistä ovat eläviä eläimiä; #7 hautausmaan kissat on neljäs,
sivujuonteena).

**Kolme parasta ehdotustani:**

1. **#1 — Kissapyhäkkö Caesarin murhapaikan raunioissa.** Tämä on koko
   listan täydellisin osuma: se on yhtä aikaa eläintäky (omistajan
   ELÄINTÄYT-linjaus 25.8.2026), antiikin murhamysteeri ja
   kaupunkikuvan yksityiskohta, jonka voi nähdä kadulta ilmaiseksi.
   Kolme kerrosta yhdessä kuvassa: temppelit 200-luvulta eaa., 1927
   sattumalta löytynyt patsaan pää, ja päällä nukkuva kissa. Kuva on
   tarkistettu ja iso, ja sama aihe kantaa myös täkynostoksi
   (takynostot-italia.md ehdokas 1).

2. **#4 — Paavi julistautui oman kaupunkinsa vangiksi.** Vahvin
   aikakausikoukku. Isoisä matkusti 1873, eli tasan kolme vuotta
   Rooman valtauksesta ja kaksi vuotta pääkaupunkipäätöksestä: kaupunki
   oli poliittisesti tuore ja Vatikaani sulkeutunut. Peli mainitsee
   1871:n tähän asti vain julisteen selitteessä — tämä täky tekee
   siitä tarinan, ja se on juuri sitä 13+ -aineistoa, joka erottaa
   pelin lastenpelistä. Pari sille on #5 (muurinaukon valokuva
   21.9.1870), joka antaa saman asian kuvana.

3. **#12 — Lukonreiästä näkyy toisen valtion kupoli.** Raamattu
   käyttää tätä nimenomaista kuvaa täyn määritelmässä — ja se on
   oikeasti Roomassa. Sen ottaminen Rooman täkylistalle on
   itsedokumentoiva valinta: pelaajalle se on paras mahdollinen
   ensimmäinen täky (yksinkertainen teko, välitön palkinto), ja
   Fablelle se on tyylin kalibrointipiste kaikille muille.

Kunniamaininnat: **#3 (Colosseumin 684 kasvilajia)** on paras "sama
paikka, uusi silmä" -täky eikä toista mitään pelissä jo olevaa; **#9
(Pasquino)** on paras, jos halutaan täky, joka puhuu sananvapaudesta
ilman saarnaamista; **#15 ("Vettä köysille")** on lyhin ja iskevin
yhden lauseen täky koko listalla.
