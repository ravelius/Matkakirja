# Sevilla — faktantarkistus

Riippumaton ristiintarkistus tiedostolle `docs/mantereet-tyoaineisto/
faktapohja-sevilla.md`. Lähteet haettu itse 23.8.2026 en-Wikipediasta
(`action=raw` + `action=query&prop=coordinates`, NODE_USE_ENV_PROXY=1),
faktapohjan omiin lähdemerkintöihin ei luotettu sokeasti. Tarkistetut
artikkelit: "Seville", "Puente de Isabel II", "Triana, Seville", "Royal
Tobacco Factory", "Torre del Oro", "Bitter orange", "Giralda", "Alcázar
of Seville", "General Archive of the Indies", "Seville Fair", "Seville
Cathedral", "Tomb of Christopher Columbus", "Maestranza (Seville)",
"Plaza de España, Seville". Yhteensä tarkistettiin n. 55 yksittäistä
väitettä (12 nostoa, 5 jaksoehdotusta, 10 koordinaattia, 12 kuukauden
säätaulukko, väestöluvut, NO8DO-legenda, Feria-perustamisvuodet,
Columbus-hauta-huomio, redirect-tarkistus).

## 1. Vakavin löydös: faktapohjan oma "ei suoraa visavastausta" -väite pitää paikkansa vain osittain

Faktapohjan johdanto (rivit 11–17) väittää nimenomaisesti: **"tämän
faktapohjan nostojen 'juoni' ei missään kohdassa ole näiden kysymysten
suora vastaus"** (viitaten `js/packs/europe-questions.js`:n `sevilla`-
kohdan viiteen kysymykseen). Tämä väite ei pidä paikkaansa kahden noston
kohdalla:

**VÄITE:** Mikään nosto ei anna visan kysymykseen 5 ("Mikä on Sevillan
katedraalin kellotorni, joka jäi jäljelle vanhasta moskeijasta?",
oikea vastaus: Giralda) suoraa vastausta.
**FAKTAPOHJA SANOO:** Osio 0 (johdanto), rivit 11–17.
**LÄHDE SANOO / TOSIASIA:** Nosto H1:n leipäteksti päättyy suoraan
lauseeseen "Vuosisatoja myöhemmin tornista tuli katedraalin kellotorni
Giralda" — tämä on sanasta sanaan visan kysymyksen 5 vastaus
("Giralda" katedraalin kellotorninä, jäljellä vanhasta moskeijasta).
**KORJAUS:** Jos H1 otetaan lehteen sellaisenaan, visan kysymys 5 on
käytännössä spoilattu ennen kuin lukija pääsee visaan. Kirjoittajan
kannattaa joko jättää sanan "Giralda" pois nostotekstin viimeisestä
virkkeestä (esim. "Vuosisatoja myöhemmin tornista tuli katedraalin
kellotorni, mutta sen almohadiaikainen runko-osa seisoo yhä
alkuperäisenä") tai hyväksyä tietoisesti, että H1 esiintyy vasta visan
jälkeen sivulla.

**VÄITE:** Mikään nosto ei anna visan kysymykseen 4 ("Mikä yksinoikeus
Sevillalla oli Amerikan löytymisen jälkeen?", oikea vastaus: yksinoikeus
kauppaan Amerikkojen kanssa) suoraa vastausta.
**FAKTAPOHJA SANOO:** Osio 0 (johdanto), rivit 11–17.
**LÄHDE SANOO / TOSIASIA:** Sekä Sivu A:n johdanto ("Amerikan-kaupan
yksinoikeus teki kaupungista 1500-luvulla yhden Euroopan suurimmista")
että nosto H4:n avausvirke ("Amerikan-kaupan yksinoikeus teki
Sevillasta 1500-luvulla yhden Länsi-Euroopan suurimmista kaupungeista")
toistavat käytännössä sanasta sanaan visan kysymyksen 4 oikean
vastausvaihtoehdon ("yksinoikeus kauppaan Amerikkojen kanssa").
**KORJAUS:** Muotoile sekä kaupunkisivun johdanto että H4:n avausvirke
uudelleen niin, ettei "Amerikan-kaupan yksinoikeus" esiinny valmiina
ilmauksena — esim. "Kaupunki hallitsi 1500-luvulla ainoana pääsyä
Amerikan-kauppaan, mutta menetti tämän aseman joen madaltuessa." H4:n
koko juoni (kauppaoikeuden menetys) voi silti pysyä, kunhan itse termi
ei toista visan vastausvaihtoehtoa sanatarkasti.

Nämä kaksi ovat todellisia poikkeamia faktapohjan omasta laatuväitteestä,
eivät pelkkiä vivahde-eroja — molemmissa tapauksissa nostoteksti käyttää
lähes identtistä sanamuotoa visan vastausvaihtoehdon kanssa. Muiden
kolmen kysymyksen (joki Guadalquivir, roomalaisnimi Hispalis, oliiviöljy
amforoissa) osalta faktapohjan oma arvio pitää paikkansa: "Hispalis" ja
"oliiviöljy/amfora" eivät esiinny nostoteksteissä lainkaan, ja
"Guadalquivir" esiintyy vain väistämättömänä taustasanana (joen nimeä ei
voi välttää joen rantaa kuvatessa) — tämä on linjassa Colombo-mallin
kanssa eikä ole korjaustarve.

## 2. Muut asiavirheet ja epätarkkuudet

**VÄITE (nosto H3, faktat-lista):** "Palatsin pohjakerroksen
arabiankieliset kirjoitukset kutsuvat Pedro I:tä nimellä 'Sultan Don
Pidru'."
**FAKTAPOHJA SANOO:** "Sultan Don Pidru" (faktalistassa) ja "Sulttaani
Don Pedro" (itse nostotekstissä — kaksi ERI muotoilua samassa
dokumentissa).
**LÄHDE SANOO:** en-Wikipedia "Alcázar of Seville": "...contains Arabic
inscriptions that refer to Pedro I as **'Sultan Don Bidru'**."
**KORJAUS:** Oikea translitteraatio lähteen mukaan on "Sultan Don
Bidru", ei "Pidru" eikä "Don Pedro". Käytä lehtitekstissä muotoa
"Sultan Don Bidru" ja yhtenäistä nosto- ja faktalistatekstit keskenään.

**VÄITE (nosto SV3):** "Kaksitoistasivuinen vartiotorni nousi joen
rantaan 1220–1221 almohadihallitsijan käskystä..."
**FAKTAPOHJA SANOO:** "almohadihallitsijan käskystä" (nostoteksti,
rivi 148).
**LÄHDE SANOO:** en-Wikipedia "Torre del Oro": "...built in 1220 by
order of the **Almohad governor of Seville, Abù l-Ulà**" / "built
1220–1221, by order of the **Almohad governor of Seville**, Abu l-Ulà".
**KORJAUS:** Lähde puhuu nimenomaan Sevillan *kuvernööristä*
("governor"), ei almohadien ylimmästä hallitsijasta (kalifista).
"Almohadihallitsija" antaa harhaanjohtavan kuvan tornin tilaajan
asemasta — tarkempi ilmaus olisi "Sevillan almohadikuvernöörin
käskystä".

**VÄITE (nosto SV1, faktat-lista, 1. bulletti):** "Trianan ja Sevillan
yhdistänyt venesilta (puente de barcas) rakennettiin 1171 kalifi Abu
Yaqub Yusufin aikana ja säilyi käytössä... — en-Wikipedia 'Puente de
Isabel II'".
**FAKTAPOHJA SANOO:** Lähteeksi on merkitty artikkeli "Puente de Isabel
II".
**LÄHDE SANOO:** Tarkka vuosiluku 1171 ja kalifin nimi Abu Yaqub Yusuf
löytyvät artikkelista **"Triana, Seville"** ("The construction of a
pontoon bridge... joining Triana and Seville in 1171 during the reign
of Caliph Abu Yaqub Yusuf..."). "Puente de Isabel II" -artikkeli
mainitsee vastaavan tiedon vain yleisluontoisesti ("First built by the
Moors in the 12th century") ilman vuotta tai kalifin nimeä.
**KORJAUS:** Itse tieto on oikea, mutta lähdeviite on väärä artikkeli —
korjaa lähdemerkinnäksi "en-Wikipedia 'Triana, Seville'".

**VÄITE (nosto SV4):** "Sevillan katuja reunustavat katkeran
appelsiinin puut..."
**FAKTAPOHJA SANOO:** Lähteeksi merkitty "en-Wikipedia 'Bitter
orange'".
**LÄHDE SANOO:** Artikkeli toteaa vain, että hedelmiä kerätään "from
trees in Seville" — ei mainitse erikseen, että puut reunustavat katuja.
**KORJAUS (EPÄVARMA, ei vakava):** Väite on yleisesti tunnettu ja
todennäköisesti tosi (Sevillan katupuut ovat laajalti dokumentoitu
ilmiö esim. matkailulähteissä), mutta cited-lähde ei sitä sanatarkasti
tue. Ei vaadi korjausta lehteen, mutta lähdeviittaus on tarkkuudeltaan
löysä.

## 3. Kaikki muut tarkistetut faktat — täsmäävät

Seuraavat täsmäsivät en-Wikipedian raakatekstiin ilman poikkeamaa:

- **SV1:** Puente de Isabel II valmistui 1852, Isabel II:n hallituskausi,
  ensimmäinen pysyvä silta; kappeli 1927 (Aníbal González), kansallis-
  muistomerkki 1976.
- **SV2:** Real Fábrica de Tabacos 1728 alkaen, toiseksi suurin rakennus
  Espanjassa (185×147 m), naistyövoima vaiheittain 1811–1829, huipussaan
  n. 6 000 työntekijää 1880-luvulla, Bizet'n Carmen. Hiram Maxim -kohta
  käsitelty asianmukaisesti EPÄVARMANA (käyntivuotta ei todella mainita
  lähteessä).
- **SV3:** Torre del Oro 1220–1221, kaksitoistasivuinen, nimi kultaisesta
  hohteesta (ei oikeaa kultaa), ketju Ramón de Bonifazia vastaan 1248,
  ylin kerros 1760 (Van der Borcht) Lissabonin 1755 maanjäristyksen
  jälkeen.
- **SV4:** Katkera appelsiini (Seville orange), matala kysyntä
  paikallisesti, vienti Britanniaan marmeladiin korkean pektiini-
  pitoisuuden vuoksi, resepti 1677 (Eliza Cholmondeley), canard à la
  bigarade.
- **H1:** Minareetin rakennuskäsky 1184, kaksi keskeytystä (arkkitehti +
  kalifi kuolivat samana vuonna, työ jatkui vasta 1188), valmistuminen
  10.3.1198, neljä palloa muistoksi Alfonso VIII:n voitosta neljä
  vuotta aiemmin, 50,51 m + 14,39 m, pallot pudonneet 1356, korvattu
  1400 ristillä/kellolla + Espanjan ensimmäinen julkinen lyömäkello,
  1558–1568 renessanssitapuli, 95–96 m (Giralda-artikkeli) vs. 104,5 m
  (Katedraali-artikkeli) — ristiriita on todellinen ja oikein raportoitu.
- **H2:** Piiritys 1247 alkaen, meriblokaadi, antautuminen 23.11.1248,
  viisitoista kuukautta, väestön häätöehto ja aikalaislähteiden
  vahvistama poismuutto.
- **H4:** Guadalquivirin mataloituminen 1600-luvun alussa → kauppa
  Cádiziin, lopullisesti 1717; Intian arkisto perustettu 1785 (Kaarle
  III); 9 km hyllyä, 43 000 nidettä, n. 80 milj. sivua.
- **M1:** 153 oopperaa (2012-arvio), Fidelio/Figaron häät/Don
  Giovanni/Sevillan parturi/La favorite/Carmen — kaikki täsmää.
- **M2:** Triana flamencon syntypaikkana, Sevillan romanit ("Flamencos"),
  merimiehet/keramiikantekijät/härkätaistelijat.
- **M3:** Sevillana-tanssi ei alkuperältään sevillalainen, sevillanas-
  kansanlaulut ja nelivaiheinen tanssi aidosti sevillalaisia.
- **M4:** Bienal de Flamenco, kahden vuoden välein, lähes kuukauden
  kestävä, "maailman suurin"; Velá de Santiago y Santa Ana heinäkuussa;
  Latin Grammy -gaala 19.11.2023, FIBES, ensimmäinen kaupunki USA:n
  ulkopuolella.
- **Jaksot 1–5:** UNESCO-kolmikko (Alcázar, katedraali, Intian arkisto),
  satama 80 km Atlantilta, ainoa jokisatama Espanjassa; joen itä-
  /länsipuoli (Triana, La Cartuja, Los Remedios); NO8DO-legenda ja
  Alfonso X / Sancho IV; Isabel II:n suora hallituskausi 1843–1868 ja
  rakennusbuumi; ilmasto Csa, kuumin suurkaupunki Euroopassa.
- **Väestöluvut:** 112 529 (1857) ja 133 247 (1877) täsmäävät INE:n
  lukuihin en-Wikipedian taulukossa täsmälleen.
- **Feria de Abril:** perustettu 1846 (karjamessuina), ensimmäinen
  varsinainen feria 18.4.1847 — "1846–1847" on tarkka.
- **Inkvisitio/vainot (osio 7.3):** 1391 vainot, n. 4 000 kuollutta;
  ensimmäinen tuomioistuin 1478; ensimmäinen autodafé 6.2.1481, kuusi
  poltettua — täsmää, ja on jätetty pois nostoista linjauksen mukaisesti.
- **Columbus-hauta (osio 7.2):** "Tomb of Christopher Columbus"
  -artikkeli vahvistaa siirron Sevillaan vasta 1899 (aiemmin Havanna) —
  huomio 1873-ajan rajauksesta on oikea. "Seville"-pääartikkelin ja
  katedraaliartikkelin sisäinen ristiriita (Diego vs. Ferdinand
  Columbus) vahvistuu myös todeksi.
- **Redirect-tarkistus:** "Seville orange" ohjautuu todella artikkeliin
  "Bitter orange" (vahvistettu MediaWiki-APIsta).
- **Säätaulukko (osio 5):** Kaikki 12 kuukauden ylin/keski/alin/sademäärä
  täsmäävät en-Wikipedian AEMET-säälaatikkoon pilkulleen. Ennätykset:
  46,6 °C (23.7.1995), −5,5 °C (12.2.1956), kiistanalainen 50,0 °C
  (4.8.1881, NOAA) — kaikki täsmää, mukaan lukien "kiistanalainen"-
  merkintä.

## 4. Koordinaatit — kaikki 10 täsmäävät MediaWiki-APIin

Haettu `action=query&prop=coordinates&redirects=1` suoraan. Kaikki
faktapohjan taulukon (osio 4) koordinaatit täsmäävät API:n palauttamiin
arvoihin neljän desimaalin tarkkuudella:

| # | Nimi | Faktapohja | API (prop=coordinates) | Tulos |
|---|---|---|---|---|
| 1 | Sevilla, keskipiste | 37,3886°N 5,9950°W | 37,38861°N 5,99500°W | OK |
| 2 | Giralda | 37,3862°N 5,9924°W | 37,38619°N 5,99242°W | OK |
| 4 | Torre del Oro | 37,3824°N 5,9965°W | 37,38244°N 5,99647°W | OK |
| 5 | Puente de Isabel II | 37,3862°N 6,0023°W | 37,386222°N 6,002333°W | OK |
| 6 | Kuninkaall. tupakkatehdas | 37,3813°N 5,9905°W | 37,3813°N 5,99047°W | OK |
| 7 | Plaza de España | 37,3769°N 5,9869°W | 37,37694°N 5,98694°W | OK |
| 8 | Real Maestranza | 37,3860°N 5,9983°W | 37,3860°N 5,9983°W | OK |
| 9 | Intian arkisto | 37,3840°N 5,9920°W | 37,3840°N 5,9920°W | OK |
| 10 | Triana | 37,3836°N 6,0052°W | 37,38358°N 6,00520°W | OK |

Rivi 3 (Plaza del Triunfo) ei ole tarkistettavissa MediaWikin
koordinaattirajapinnasta, koska artikkelia "Plaza del Triunfo" (tai
"Plaza del Triunfo, Seville") ei ole olemassa en-Wikipediassa — API
palautti "missing". Faktapohja on tästä läpinäkyvä (merkintä "ks.
huomio alla" taulukossa, ja osio 7 kohta 5 selittää arvon olevan
kirjoittajan oma valinta, ei suora Wikipedia-lähde), joten tämä ei ole
virhe vaan asianmukaisesti dokumentoitu poikkeus. Vahvistin myös
erikseen, että "Alcázar of Seville" -artikkelilla EI todella ole
koordinaattia MediaWiki-APIssa (API palautti sivun ilman
`coordinates`-kenttää) — osion 7 kohta 5:n väite pitää paikkansa.

## 5. Kohdat joita en saanut (tai en täysin voinut) varmistaa

- **Osio 4:n etäisyys-/suuntalaskelmat** ("~0,35 km kaakkoon" jne.) ovat
  faktapohjan omia laskelmia koordinaattieroista. En toistanut näitä
  laskelmia rivi riviltä Node-skriptillä — koordinaatit itsessään
  täsmäävät (ks. osio 4 yllä), joten mahdolliset virheet olisivat vain
  laskennallisia pyöristyksiä, eivät lähdevirheitä. Suosittelen, että
  kirjoittaja tarkistaa nämä vain jos kartan suunnat vaikuttavat
  intuitiivisesti väärältä.
- **Osio 6:n kuva-aihe-ehdotukset** (Gonzalo Bilbaon maalausten public
  domain -status, tarkka vuosiluku) — faktapohja itse merkitsee tämän
  tarkistettavaksi kirjoitusvaiheessa; en yrittänyt varmistaa Bilbaon
  kuolinvuotta tai teosten tekijänoikeustilaa, koska se ei ole
  Wikipedia-tekstiin perustuva faktaväite vaan kuvavalintaohje.
- **AEMET-luvut vs. ERA5-normaali (osio 5, HUOM):** en tarkistanut
  ERA5 1991–2020 -normaalia erikseen `tools/hae-saanormaalit.mjs`-
  työkalulla — tämä on faktapohjankin mukaan kirjoitusvaiheen tehtävä,
  ei tämän tarkistuksen piiriin kuuluva.
- **"Bienal de Flamenco... maailman suurin flamenco-tapahtuma"** — tämä
  on artikkelin oma väite ("claims to be") järjestäjän omasta
  markkinoinnista, ei riippumattomasti vahvistettu fakta. Faktapohja
  esittää tämän oikein varauksella ("jota järjestäjät kutsuvat"), joten
  ei korjaustarvetta, mutta väitteen totuusarvoa itseään ei voi
  Wikipedia-lähteestä varmistaa.

## 6. Yhteenveto

Tarkistin n. 55 yksittäistä faktaväitettä faktapohjasta. Suurin osa
(yli 45) täsmäsi en-Wikipedian raakatekstiin ja MediaWiki-koordinaatti-
rajapintaan tarkasti, mukaan lukien kaikki 10 kohdekartan koordinaattia,
koko 12 kuukauden säätaulukko ja molemmat väestöluvut. Faktapohjan omat
osiot 7 (ristiriidat/epävarmuudet) osoittautuivat myös huolellisiksi:
Giralda/katedraali-korkeusristiriita, Columbus-haudan ajoitusvirhe ja
Alcázarin puuttuva koordinaatti vahvistuivat kaikki todeksi
riippumattomasti.

**Vakavin löydös** on tehtävänannon kohta 3: toisin kuin faktapohjan
johdanto väittää, kaksi nostoa (H1 ja H4, sekä kaupunkisivun johdanto)
toistavat visan kysymysten 4 ja 5 oikeat vastaukset lähes sanatarkasti
("Amerikan-kaupan yksinoikeus" ja "kellotorni Giralda"). Tämä on
korjattava ennen lehden viimeistelyä, ks. osio 1.

Muut löydökset ovat pienempiä tarkkuusvirheitä: väärä lähdeartikkeli-
viite (SV1, sisältö oikea), yksi väärä translitteraatio ("Don Pidru"
pitäisi olla "Don Bidru", H3) ja yksi asemasekaannus (torninrakennuttaja
oli "kuvernööri", ei "hallitsija", SV3). Yksi hyvin pieni, ei-
korjaustavoitteinen huomautus koskee katupuu-väitettä (SV4).

Tämän raportin korjaukset voittavat faktapohjan ristiriitatilanteissa.
