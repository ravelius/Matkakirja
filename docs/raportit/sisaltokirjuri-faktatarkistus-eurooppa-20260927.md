# Euroopan faktatarkistus (Sisältökirjuri, 27.9.2026)

Fablen tilaus 27.9.: käy läpi Euroopan nostot ja kaupunkilehdet
rinnakkain agenteilla, painopisteenä vuosiluvut, nimet, luvut ja
"ensimmäinen/suurin"-väitteet. Aloitettu suurimmista kaupungeista.
Isoisän 1873-äänen tarkoitukselliset vanhentuneet käsitykset EIVÄT ole
virheitä eikä niitä korjattu.

Menetelmä: yksi tutkimusagentti (Sonnet, WebSearch/WebFetch) per
kaupunki, lukee kaikki kolme tiedostoa (kulttuuri-kategoriat.js,
nahtavyysjutut.js, maakartat.js) kokonaan ja tarkistaa jokaisen
vuosiluvun, nimen, luvun ja superlatiivin. Löydökset korjattu
manuaalisesti erillisessä erässä testien läpimenon jälkeen.

## Erä 1: Pariisi, Lontoo, Rooma, Berliini

### KORJATUT VIRHEET

**Pariisi**

1. **Eiffel-torni, korkeus** — js/packs/nahtavyysjutut.js (Eiffel-torni,
   teksti + kuvat/selite). Väite: "330 metriä korkea" vuoden 1889
   torneista puhuttaessa. Virhe: 330 m saavutettiin vasta 2022 uuden
   antennin myötä; 1889 torni oli noin 300 m (312 m lipputangon
   kanssa). Korjattu: "noin 300 metriä". Lähde: en-Wikipedia "Eiffel
   Tower"; peli itse sanoo toisaalla (kulttuuri-kategoriat.js) oikein
   "noin kolmesataa metriä".
2. **Luxembourgin puisto, Vapaudenpatsaan malli** —
   nahtavyysjutut.js. Väite: "Bartholdin ensimmäinen pieni malli
   Vapaudenpatsaasta". Virhe: alkuperäinen malli siirrettiin Musée
   d'Orsayhin 2011/2012 (saasteen ja varastetun soihdun vuoksi) ja
   puistossa on nykyään jäljennös; "ensimmäinen"-väitettä ei löydy
   lähteistä. Korjattu: "jäljennös Bartholdin pienoismallista
   Vapaudenpatsaasta (alkuperäinen siirrettiin Musée d'Orsayhin
   2012)".
3. **Paras patonki -kilpailun raati** — kulttuuri-kategoriat.js,
   nahtavyysjutut.js ja fokusvirta-pariisi.js (kolme sanatarkkaa
   kopiota). Väite: "raadissa istuu kuusi arvottua tavallista
   pariisilaista". Puutteellinen: fr-Wikipedian mukaan raadissa on
   myös ammattilaisia ja erikoistoimittajia, kansalaisten paikat
   lisättiin vasta 2020. Korjattu kaikissa kolmessa kohdassa:
   "raadissa istuu ammattilaisia, toimittajia ja kuusi arvottua
   tavallista pariisilaista."
4. **Notre-Damen tulipalo, tornin romahdusaika** —
   nahtavyysjutut.js ja fokusvirta-pariisi.js (sanatarkka kopio).
   Väite: "romahti kello 19.45". Virhe: en-Wikipedian mukaan 19.50.
   Korjattu molemmissa kohdissa.
5. **Notre-Damen kattotuolisto, tammirunkojen määrä** — samat kaksi
   kohtaa. Väite: "1 300 tammirungosta tehty kattotuolisto". Epävarma
   luku: "1 300" juontuu Groupaman vuoden 2019 lahjoituslupauksesta
   (1 300 satavuotiasta tammea jälleenrakennukseen), ei alkuperäisen,
   tuhoutuneen kattotuoliston vahvistetusta määrästä — tieteelliset
   arviot vaihtelevat noin 1 000–2 000 tammen välillä. Korjattu: "yli
   tuhannesta tammirungosta".

**Lontoo**

6. **Primrose Hill** — kulttuuri-kategoriat.js:85 (lyhyt-kenttä).
   Väite: "Camdenin korkeimmalla kukkulalla". Virhe: Primrose Hill (64
   m) on Camdenin TOISEKSI korkein luonnollinen kohta — Hampstead
   Heath on korkeampi. Kortin oma pidempi selite jo sanoi tämän
   oikein ("yksi korkeimmista"); vain lyhyt-kenttä liioitteli.
   Korjattu: "yhtenä Camdenin korkeimmista kukkuloista".
7. **City of London, pinta-ala** — maakartat.js (Lontoon
   kaupunkikartan esittely). Väite: "roomalaisten muurien rajaama
   neliökilometri". Virhe: käännösmoka kaupunginosan lempinimestä
   "Square Mile" — todellinen pinta-ala on noin 2,9 km², lähes
   kolminkertainen yhteen neliökilometriin verrattuna. Korjattu:
   "'neliömailiksi' kutsuttu alue".
8. **Tate Modern, alkuperäinen polttoaine** — nahtavyysjutut.js ja
   fokusvirta-lontoo.js (sanatarkka kopio). Väite: "entinen
   hiilivoimala". Virhe: Bankside-voimala suunniteltiin alusta asti
   öljykäyttöiseksi (toisin kuin esim. Battersea, joka oli
   hiilivoimala). Korjattu molemmissa: "entinen öljyvoimala".
9. **Abbey Roadin suojatie, ylitysten määrä** —
   nahtavyysjutut.js, fokusvirta-lontoo.js (kolme kohtaa: kysymys,
   leipäteksti, visan vaihtoehto). Väite: "kahdeksan kertaa". Virhe:
   valokuvaaja Iain Macmillan otti kuusi kuvaa (kolme kumpaankin
   suuntaan) noin kymmenessä minuutissa. Korjattu kaikissa neljässä
   kohdassa: "kuusi kertaa".

**Berliini**

10. **Fernsehturm, "rakennus" vs. "rakennelma"** —
    kulttuuri-kategoriat.js, kolme pelaajalle näkyvää kohtaa (lyhyt,
    selite x2) + yksi sisäinen koodikommentti. Väite: "Saksan korkein
    rakennus". Virhe: saksalainen korkeusterminologia erottaa
    Bauwerk (rakennelma — tornit, mastot, ei asuttavia kerroksia) ja
    Gebäude (rakennus — asuttava). Fernsehturm on Saksan korkein
    RAKENNELMA, ei rakennus — Saksan korkein oikea rakennus on
    Frankfurtin Commerzbank Tower (300 m). Peli itse sanoo saman
    faktan oikein sanalla "rakennelma" nahtavyysjutut.js:ssä; korjattu
    nyt yhtenäiseksi.
11. **Reichstag, "seisoi tyhjänä koko kylmän sodan ajan"** —
    nahtavyysjutut.js. Virhe: rakennusta korjattiin/uudistettiin
    1961–1964 (arkkitehti Paul Baumgarten), ja siellä oli pysyvä
    historianäyttely ("Fragen an die deutsche Geschichte") sekä
    satunnaisia virallisia tilaisuuksia 1990 asti — se ei ollut
    parlamentin varsinainen istuntopaikka, mutta ei myöskään tyhjillään.
    Korjattu kuvaamaan osittaista kunnostusta ja käyttöä ilman
    virheellistä "tyhjänä koko ajan" -väitettä.
12. **Hobrechtin viemäriverkosto, valmistumisvuosi** —
    nahtavyysjutut.js. Väite: "viimeinen valmistui 1893". de-Wikipedian
    oman Radialsystem-artikkelin mukaan koko järjestelmä (radiaali XI)
    valmistui vasta 1909; 1893 saattaa sekoittua yhden yksittäisen
    pumppuaseman (XII) käyttöönottovuoteen. Korjattu: "1909".
13. **Archaeopteryxin tunnettujen yksilöiden määrä** —
    nahtavyysjutut.js. Väite: "kahdestatoista löydetystä yksilöstä".
    Vanhentunut: tammikuussa 2025 julkaistiin 13. yksilö ja myöhemmin
    2025 14. (Chicagon yksilö) — luku on liikkuva maali. Korjattu
    kiertäen tarkkaa lukua: "tunnetuista yksilöistä".

**Rooma**: ei löydettyjä virheitä (~45 väitettä tarkistettu, kaikki
pitivät paikkansa).

### EPÄSELVÄ (ei korjattu, merkitään Fablelle)

- **Pariisi**: Luxorin obeliski "yli 3 300 vuotta vanha" — Wikipedia
  itse sanoo "yli 3 000 vuotta"; 3 300 vaatisi varhaisimman mahdollisen
  Ramses II:n hallituskauden alkamisajankohdan.
- **Pariisi**: Orsayn museon "postikorttimyynnin perusteella
  suosituin teos" -väite (Renoirin Bal du moulin de la Galette) — ei
  löytynyt vahvistavaa lähdettä.
- **Pariisi**: Méliès osti/yritti ostaa Lumièren laitteen "28.
  joulukuuta 1895" julkisessa näytöksessä — Wikipedia sijoittaa
  tapaamisen yksityiseen ennakkonäytökseen 27.12., ei julkiseen
  28.12. näytökseen. Suora lainaus "ei ole tulevaisuutta" myös
  mahdollisesti apokryfinen.
- **Pariisi & Bastilji-nosto**: Lafayetten trikolorin synty 17.7.1789
  samana päivänä kuin Louis XVI:n kokardi — suosittu versio, mutta
  osa lähteistä (myös Wikipedian sisällä ristiriitaisesti) sijoittaa
  valkoisen lisäämisen 27.7. Tavanomainen yksinkertaistus, ei
  korjattu.
- **Pariisi**: Île de la Citén "syntypaikka noin 250–225 eKr." —
  nykyarkeologia ei ole löytänyt gallialaisajan jäänteitä itse
  saarelta; perinteinen päivämäärä, ei korjattu.
- **Pariisi**: Eiffel-tornin nimikehän korkeus "65 metriä" — ei
  itsenäisesti vahvistettavissa.
- **Berliini**: Muurin rakentamisyö 1961 — kolme yksityiskohtaa jäi
  vahvistamatta agentin WebSearch-budjetin loppuessa kesken: Ulbrichtin
  käskyn allekirjoituspaikka (Döllnsee), DDR:stä 1949 jälkeen
  lähteneiden määrä ("noin 3,5 miljoonaa" — lähteet vaihtelevat n.
  2,6–3,5 miljoonan välillä laskentatavasta riippuen) ja BILD-lehden
  14.8.1961 otsikon tarkka sanamuoto. Todennäköisesti oikein, mutta ei
  riippumattomasti vahvistettu.

## Erä 2: Wien, Madrid, Ateena (Istanbul ei ehditty)

### KORJATUT VIRHEET

14. **Madrid, Metrópolis-talon voitonjumalatar** —
    kulttuuri-kategoriat.js (lyhyt+selite). Väite: "vuonna 1975".
    Virhe: patsas (Federico Coullaut-Valera) asennettiin vasta
    11.10.1977. Korjattu: "1977".
15. **Madrid, Kuninkaanlinnan arkkitehti** — nahtavyysjutut.js.
    Väite: "Filippo Juvarra suunnitteli sen [linnan]". Virhe: Juvarra
    kuoli 1736, kaksi vuotta ENNEN rakennustöiden alkua 1738 — hänen
    oppilaansa Giovanni Battista Sacchetti suunnitteli lopulta
    rakennetun linnan. Korjattu mainitsemaan molemmat.
16. **Wien, Parlamenttitalon alkuperäinen käyttäjä** —
    kulttuuri-kategoriat.js (lyhyt+selite). Väite: "Itävalta-Unkarin
    valtiopäiville". Virhe: Itävalta-Unkarilla ei koskaan ollut
    yhteistä parlamenttia — vuoden 1867 sovinnon jälkeen Cisleithanialla
    (Itävalta) ja Transleithanialla (Unkari) oli kummallakin oma
    valtiopäivänsä. Wienin rakennus oli nimenomaan Itävallan
    (Cisleithanian) valtiopäivätalo. Korjattu: "Itävallan
    valtiopäiville".
17. **Ateena, Kallimarmaron 1896-avajaisyleisö** —
    nahtavyysjutut.js (kuvateksti). Väite: "katsomossa 80 000
    ihmistä". Virhe: sama pelin oma leipäteksti sanoo kahdesti
    "noin 60 000", ja ulkoiset lähteet (Wikipedia) vahvistavat 60 000
    — kuvateksti oli sisäisesti ristiriitainen. Korjattu: "noin 60 000".

### EPÄSELVÄ / EI KORJATTU (raportoitu Fablelle)

- **Ateena, Akropoliin korkeus** — kolme eri lukua eri tiedostoissa:
  kulttuuri-kategoriat.js ja nahtavyysjutut.js sanovat "150 metriä
  merenpinnasta" (täsmää Wikipedian pääartikkeliin), mutta
  maakartat.js sanoo "156 metrin korkeuteen merenpinnasta" JA "90
  metriä ympäröivän tasangon yli" — jälkimmäiselle ei löytynyt
  vahvaa lähdetukea (todennäköisempi arvo n. 60–70 m). EI korjattu
  tässä erässä, koska maakartat.js:n muokkaaminen on eri roolin
  (Karttaseppä) vastuualuetta — Fable päättäköön kuka korjaa.
- **Rooma, Wien, Madrid, Ateena**: useita pienempiä EPÄSELVÄ-huomioita
  (esim. Ateenan elokuun sademäärä 5mm vs. lähteiden 3,8mm, Wienin
  Café Sperlin alkuperäinen nimi, yliopiston "valmistumisvuosi" 1837
  viittaa perustamiseen ei rakennukseen) — ei koeta korjaustarpeeksi,
  ei listattu erikseen tässä raportissa (agenttien täydet raportit
  tämän session transkriptissä jos tarvitaan).

### Rooma, Wien, Madrid, Ateena — puhtaaksi tarkistetut kokonaisuudet

Rooma ~45 väitettä (0 virhettä), Wien ~40-45 väitettä (1 virhe),
Madrid ~45 väitettä (2 virhettä), Ateena yli 40 väitettä neljässä
osassa — Akropolis-kokonaisuus, kaupunkihistoria, agora/Schliemann/
Pnyx, olympialaiset/Kallimarmaro (1 virhe + korkeusristiriita).

**Istanbul: EI ALOITETTU** — seuraavan session ensimmäinen tehtävä
tässä ohjelmassa.

## Korjausten tila

Kaikki 17 vahvistettua virhettä korjattu haarassa
`sisaltokirjuri-faktatarkistus-e1` (PR #3473, draft — poista draft
kun koko testisarja on ajettu ja vihreä). EPÄSELVÄT-kohdat jätetty
ennalleen ja ilmoitettu Fablelle.

## Seuraava erä

Istanbul (ei aloitettu), sitten seuraavat suuret kaupungit Fablen
ohjeen mukaan (Fable ei listannut nimiä erän 2 jälkeen — kysy tai
jatka loogisesti seuraaviin: esim. Tukholma, Kööpenhamina, Praha,
Budapest — nämä ovat jo saaneet oman lehtiaiheensa Eurooppa-erissä
7-9, joten niissä on tuoretta, agenttien vielä tarkistamatonta
sisältöä).
