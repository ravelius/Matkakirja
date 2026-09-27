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

## Korjausten tila

Kaikki 13 vahvistettua virhettä korjattu haarassa
`sisaltokirjuri-faktatarkistus-e1`, PR tulossa. EPÄSELVÄT-kohdat
jätetty ennalleen ja ilmoitettu Fablelle.

## Seuraava erä

Wien, Madrid, Ateena, Istanbul (agentit käynnissä/jonossa).
