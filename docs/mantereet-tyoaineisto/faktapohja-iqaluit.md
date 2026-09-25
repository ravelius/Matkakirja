# Iqaluit — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `iqaluit`, en-Wikipedia "Iqaluit".
Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) ja koordinaatit rajapinnasta
(`action=query&prop=coordinates&redirects=1`) **7.9.2026**. Malli ja
mitat luettu tiedostoista `docs/aasia-tyoaineisto/lehtityo-resepti.md`
(SITOVA), `docs/moduulit/kaupunkilehti.md`,
`docs/mantereet-tyoaineisto/spec-mantereet.md` ja
`docs/tyolista-opukselle.md` (O9, ETUSIVUKUVAN KAAVA, kustannussääntö).
Esikuvana `faktapohja-denver.md` ja `faktapohja-lagos.md`.

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Iqaluit"**,
**"Nunavut"**, **"Frobisher Bay"**, **"Martin Frobisher"**,
**"Charles Francis Hall"**, **"Sylvia Grinnell Territorial Park"**,
**"Apex, Iqaluit"**, **"Iqaluit Airport"**,
**"St. Jude's Cathedral (Iqaluit)"**, "Legislative Building of
Nunavut", "Legislative Assembly of Nunavut", "Nunatta Sunakkutaangit
Museum", "Inuksuk High School", "Astro Hill Complex", "Nunavut Arctic
College", "Inuit throat singing", "Inuktitut", "Inuit art",
"Qaummaarviit Territorial Park", "Distant Early Warning Line",
"Nunavut Land Claims Agreement".

Kaupungin visa on tarkistettu tiedostosta
`js/packs/northamerica-questions.js` (kohta `iqaluit`, viisi
kysymystä: minkä territorion pääkaupunki, mikä kansa on enemmistö,
mitä nimi Iqaluit tarkoittaa, miten tavarat saapuvat, millä
inuktitutia kirjoitetaan). Kaikki viisi aihetta esiintyvät tässä
faktapohjassa. **Minitehtävä ei saa kysyä yhtään näistä viidestä.**
Ehdotus osiossa 7.

Olemassa olevat `js/packs/northamerica-valokuvat.js`:n ja
`js/packs/northamerica-saapumiset.js`:n iqaluit-lohkot on luettu
ristiriitojen varalta: saapumisteksti puhuu tiettömyydestä,
inuktitutinkielisistä kadunnimistä ja jään lukutaidosta, ja
valokuvataulussa on ranta, kurkkulaulu, Hunter's Market ja nykykuva
Joamie Hillin päältä. Ristiriitoja ei ole. Karttanosto
`js/packs/maastokohteet-can.js` "Baffininsaari" kertoo jo saaren
nimihistorian (Helluland, Frobisher 1576, Baffin 1616, Parry 1821) ja
mainitsee nimenmuutoksen 1987 — **lehti ei saa toistaa saaren
nimihistoriaa**, ja nimenmuutos kerrotaan kaupungin näkökulmasta.
Kanadan maalehden (`js/packs/maa-kategoriat.js`, CAN) aiheet ovat
historia, alkuperäiskansat, luonto, ruoka ja urheilu; sen
alkuperäiskansanostot koskevat métisejä, totem-paalua, inuksukia ja
sisäoppilaitoksia — **lehti ei toista näitä**. CAN-eläintäky
(`js/packs/elaintakyt.js`) on jääkarhunpentu ja Churchillin
karhuvankila — **jääkarhu ei ole lehden nosto**.

**1873-KEHYS:** isoisän matkavuonna paikalla ei ollut kaupunkia
lainkaan. Koojesse Inletin ranta oli inuiittien kalastuspaikka, ja
lahdella oli eurooppalaisilla kaksi merkitystä. Toinen oli Martin
Frobisherin kolme matkaa 1576–1578, joiden 200 tonnin "kultamalmi"
osoittautui arvottomaksi hornblende-kiveksi. Toinen oli tuore:
amerikkalainen Charles Francis Hall oli asunut inuiittien parissa
1861–1862, todennut ensimmäisenä ei-alkuperäisenä että Frobisherin
"salmi" on umpilahti, ja kerännyt inuiittien suullisesta perinteestä
tiedot Frobisherin miehistä 280 vuoden takaa. Hall kuoli marraskuussa
1871, eli **isoisän matkavuonna kartta oli kaksi vuotta vanha ja sen
tekijä kaksi vuotta kuollut**. Kirjoittaja EI saa sijoittaa
lentokenttää, kaupunkia, katedraalia eikä Nunavutia vuoteen 1873.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Iqaluit"

**Johdanto (ehdotus, n. 200 merkkiä):**

> Iqaluit on Kanadan pohjoisin kaupunki ja sen pienin pääkaupunki:
> 7 429 asukasta puurajan pohjoispuolella, ilman tietä tai rataa
> muualle. Isoisän matkavuonna 1873 rannalla ei ollut kaupunkia
> lainkaan — vain kalapaikka, jonka nimi kertoo miksi.

### Sivu B — teemasivu, id `luonto`, nimi "Tundra ja vuorovesi"

**Perustelu:** `luonto` on vakioaihe `AIHE_IKONIT`-listalla
(js/ui-apurit.js), eikä uusia sivu-id:itä tehdä. Aihe kantaa oman
sivunsa: Frobisherinlahden suppilomainen vuorovesi, puuraja ja
arktinen paju, tundrailmasto ennätyksineen ja jää kulkuväylänä ovat
neljä eri asiaa eivätkä mahdu kaupunkisivun neljään nostoon. Laudan
`ambience` on iqaluitilla `pohjoinen` (js/packs/northamerica.js).

**Johdanto (ehdotus, n. 190 merkkiä):**

> Kaupungin edessä nousee ja laskee joka päivä seitsemästä
> yhteentoista metriä vettä, ja takana alkaa tundra, jolla korkein
> puu yltää polveen. Sää tekee täällä sen, mitä kartta ei kerro.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

Mitat: teksti 440–660 merkkiä, nostoja 4 per sivu (resepti).

### Sivu `kaupunki` — 4 nostoa

**K1. Paikka, jossa on paljon kalaa**

- Iqaluit on ollut inuiittien ja heidän edeltäjiensä — paleoeskimoiden
  (dorset-kulttuuri) ja thule-kansan — perinteinen kalastuspaikka
  tuhansien vuosien ajan. — "Iqaluit" (History)
- Nimi tulee inuktitutin sanasta *Iqaluit* (ᐃᖃᓗᐃᑦ), joka merkitsee
  "paikkaa, jossa on paljon kalaa". — "Iqaluit" (History)
- Kaupungin asukkaita kutsutaan nimellä *Iqalummiut* (yksikkö
  *Iqalummiuq*). — "Iqaluit" (johdanto)
- Nimen kala on nieriä (Arctic char), joka viihtyy Sylvia Grinnell
  -joessa. Joen nieriäkanta romahti 1900-luvulla Apexin pienen
  säilyketehtaan kalastuksen takia, ja vasta noin 2008 kanta osoitti
  merkkejä palautumisesta tasolle, joka tekee nimestä jälleen
  perustellun. — "Sylvia Grinnell Territorial Park" (History),
  "Apex, Iqaluit" (History)
- Kaupunki on Baffininsaaren kaakkoisosassa Frobisherinlahden
  poukamassa nimeltä Koojesse Inlet, Everett Mountains -kukkuloilla.
  Se on Kanadan pohjoisin kaupunki, 63 astetta päiväntasaajasta
  pohjoiseen — ja silti selvästi napapiirin eteläpuolella. —
  "Iqaluit" (Geography)
- **KIRJOITUSOHJE:** visan kysymykset 3 ja 2 (nimen merkitys,
  inuiitit enemmistönä) on katettava tässä tai nostossa K4.

**K2. Musta kivi, joka ei ollut kultaa**

- Martin Frobisher purjehti 1576 etsimään Luoteisväylää. *Gabriel*
  saavutti Baffininsaaren eteläkärjen, jonka Frobisher nimesi
  Queen Elizabeth's Forelandiksi, ja lähti sitten länteen ylös
  lahtea, jota hän piti väylän suuna ja nimesi Frobisher's
  Straitiksi. — "Martin Frobisher" (First voyage)
- Retkikunta kohtasi inuiitteja 18.8.1576. Viisi Frobisherin miestä
  jäi rannalle eikä palannut; inuiittien suullisen perinteen mukaan
  miehet elivät heidän parissaan omasta tahdostaan muutaman vuoden ja
  kuolivat yrittäessään lähteä saarelta itse tekemällään veneellä. —
  "Martin Frobisher" (First voyage)
- Frobisher toi mukanaan mustan kiven. Lontoossa kuninkaallinen ja
  kaksi muuta koetusmestaria totesivat sen arvottomaksi markasiitiksi,
  mutta italialainen alkemisti Giovanni Battista Agnello väitti
  löytäneensä siitä kultaa. Kysyttäessä miksi muut eivät löytäneet,
  hän vastasi: *"Bisogna sapere adulare la natura"* — luontoa pitää
  osata imarrella. — "Martin Frobisher" (First voyage)
- Vuoden 1577 toinen matka toi kotiin noin **200 tonnia** "malmia".
  Kolmas matka 1578 lähti Plymouthista 3.6.1578 viidellätoista
  aluksella ja aikoi perustaa sadan miehen siirtokunnan. — "Martin
  Frobisher" (Second voyage, Third voyage)
- Malmi vietiin Dartfordiin varta vasten rakennettuun sulattoon.
  Viiden vuoden yritysten jälkeen se todettiin arvottomaksi,
  hornblendea sisältäväksi kiveksi, ja se käytettiin lopulta
  tienpohjaksi ja muureihin. Cathay Company meni konkurssiin ja
  Michael Lok joutui useita kertoja velkavankilaan. — "Martin
  Frobisher" (Third voyage)
- Kolmannen matkan aikana pidettiin ensimmäinen tunnettu anglikaaninen
  jumalanpalvelus Kanadassa. "Frobisher Bay" -artikkelin mukaan
  ensimmäinen Englannin kirkon jumalanpalvelus Pohjois-Amerikan
  maaperällä oli ehtoollinen Frobisherinlahdella elokuun viimeisinä
  päivinä tai syyskuun alussa 1578; kirkko on merkinnyt muistopäiväksi
  3. syyskuuta, ja pappi oli "Maister Wolfall". — "Frobisher Bay"
  (History), "Martin Frobisher" (Third voyage)
- **KIRJOITUSOHJE:** kaappaukset kerrotaan tapahtumina neutraalisti,
  ilman yksityiskohtia (pilari 4, spec-mantereet linjaus 1). Inuiitit
  kuvataan toimijoina, joiden perimätieto säilyi — ei uhreina.

**K3. 1873: lahti, joka ei ollutkaan salmi**

- Charles Francis Hall (n. 1821 – 8.11.1871) oli amerikkalainen
  arktinen tutkija, joka tunnetaan parhaiten inuiittien todistusten
  keräämisestä Franklinin retkikunnasta. — "Charles Francis Hall"
  (johdanto)
- Ensimmäisellä matkallaan (1860–1862) Hall pääsi mukaan valaanpyytäjä
  *George Henryn* kyytiin, joka joutui talvehtimaan
  Baffininsaarella. Paikalliset inuiitit kertoivat Hallille
  Frobisherin kaivosyrityksen jäännöksistä Frobisherinlahdella, ja
  Hall matkasi katsomaan niitä. Oppaikseen hän sai aviopari
  **Ipirvikin ja Taqulittuqin**. — "Charles Francis Hall" (First
  expedition)
- Vuonna 1861 Hallista tuli ensimmäinen ei-alkuperäinen ihminen, joka
  matkasi alueelle inuiittien avulla, ja ensimmäinen joka tajusi, että
  Frobisherinlahti on **lahti eikä luoteisväylän salmi Kiinaan**, kuten
  oli uskottu. Hän nimesi seudun paikkoja rahoittajiensa mukaan; järvi
  ja joki saivat nimen ystävänsä ja tukijansa Henry Grinnellin
  tyttären Sylvia Grinnellin mukaan. — "Sylvia Grinnell Territorial
  Park" (History)
- Ennen Hallin matkaa 1861 eurooppalaiset pitivät lahtea salmena, joka
  erottaa Baffininsaaren toisesta saaresta. — "Frobisher Bay"
  (History)
- Hall kuoli 8.11.1871 Thank God Harborissa Grönlannissa *Polaris*-
  retkikunnan johtajana. Hän syytti ennen kuolemaansa miehistön
  jäseniä myrkytyksestä; ruumiin avaus 1968 osoitti, että hän oli
  niellyt suuren määrän arseenia viimeisten kahden viikkonsa aikana.
  Virallinen kuolinsyy oli aivohalvaus. — "Charles Francis Hall"
  (johdanto)
- **KIRJOITUSOHJE:** tämä on 1873-nosto. Kärki on inuiittien
  perimätieto, joka kantoi 280 vuotta ja ratkaisi eurooppalaisen
  karttakiistan. Kuolinsyykiista kerrotaan yhdellä neutraalilla
  virkkeellä ilman yksityiskohtia. Sylvia Grinnellin nimeäminen
  mainitaan, mutta puisto itsessään on kohdekartan kohde eikä sen
  sisältöä kerrota tässä.

**K4. Nimi, joka otettiin takaisin**

- Toinen maailmansota toi alueelle ei-inuiitteja, kun Yhdysvallat
  rakensi 1942 Frobisher Bay Air Basen Kanadan hallituksen pitkällä
  vuokrasopimuksella. Sotilaslentokenttä tunnettiin nimellä **Crystal
  Two** ja kuului Crimson Route -reittiin. — "Iqaluit" (History)
- Iqaluitin ensimmäinen vakituinen asukas oli **Nakasuk**, inuiittiopas,
  joka auttoi Yhdysvaltain ilmavoimien suunnittelijoita valitsemaan
  paikan, jossa oli riittävän laaja tasainen alue kiitotielle. —
  "Iqaluit" (History)
- Yhdysvaltain ja Kanadan viranomaiset nimesivät paikan **Frobisher
  Bayksi** sen lahden mukaan, jonka rannalla se on. — "Iqaluit"
  (History)
- 1950-luvun puolivälissä väkiluku kasvoi nopeasti DEW-linjan
  tutka-asemien rakentamisen aikana. Satoja enimmäkseen ei-inuiitteja
  rakennustyöläisiä, sotilaita ja virkamiehiä muutti yhteisöön, ja
  useita satoja inuiitteja seurasi työn ja tukikohdan tarjoaman
  lääkärinhoidon perässä. **Vuonna 1957 kaupungin 1 200 asukkaasta 489
  oli inuiitteja.** — "Iqaluit" (History)
- Vuoden 1959 jälkeen Kanadan hallitus perusti Frobisher Baylle
  pysyvät palvelut: kokopäiväiset lääkärit, koulun ja sosiaalipalvelut.
  Inuiittiväestö kasvoi nopeasti, kun hallitus kannusti inuiitteja
  asettumaan pysyvästi palveluyhteisöihin. — "Iqaluit" (History)
- Amerikkalaiset lähtivät 1963, kun mannertenväliset ohjukset
  vähensivät DEW-linjan ja arktisten tukikohtien merkitystä. Ensimmäiset
  paikallisvaalit yhteisöneuvostoon pidettiin 1964 ja ensimmäinen
  pormestarinvaali 1979. — "Iqaluit" (History)
- Gordon Robertson Educational Centre, nykyinen Inuksuk High School,
  perustettiin 1971. Perustamishetkellä se oli ainoa lukio alueella,
  joka kattoi yli seitsemäsosan Kanadan pinta-alasta. — "Iqaluit"
  (History)
- **1.1.1987 kunnan nimi muutettiin Frobisher Baysta Iqaluitiksi.**
  Muutos yhdenmukaisti virallisen käytännön sen nimen kanssa, jota
  inuiittiväestö oli aina käyttänyt. — "Iqaluit" (History)
- Ei-sitovassa vuoden 1995 kansanäänestyksessä 11.12. tulevan
  territorion asukkaat valitsivat Iqaluitin (Rankin Inletin sijaan)
  pääkaupungiksi. 1999 Iqaluitista tuli Nunavutin pääkaupunki, kun
  Luoteisterritoriot jaettiin kahtia. **19.4.2001 siitä tuli virallisesti
  kaupunki (city).** — "Iqaluit" (johdanto, History)
- Vuoden 2021 väestönlaskennassa asukkaita oli **7 429**; se on Kanadan
  pienin pääkaupunki väkiluvultaan ja ainoa, jota ei yhdistä muihin
  asutuksiin maantie. — "Iqaluit" (johdanto, Transportation)
- Iqaluit on ainoa Kanadan pääkaupunki ilman liikennevaloja, joskin
  tilapäisiä on asennettu. Osoitteet ilmoitetaan rakennusnumeroin;
  kadunnimiä alettiin kehittää vasta noin 2003, eikä katunumeroita ole
  annettu. — "Iqaluit" (Transportation)
- Kielitilanne 2021: äidinkielenään englanti 49,1 %, inuktitut 30,0 %,
  ranska 5,9 %. Englantia puhuu 97,2 % ja inuktitutia 53,1 %
  asukkaista. Enemmistökieltä ei ole. — "Iqaluit" (Language)
- Nunavutin väestöstä valtaosa on inuiitteja, ja inuktitut on
  territorion virallisia kieliä; sitä kirjoitetaan omilla
  tavumerkeillä (Inuktitut syllabics). — "Nunavut", "Inuktitut"

### Teemasivu `luonto` — 4 nostoa

**L1. Suppilo, joka nostaa meren yksitoista metriä**

- Frobisherinlahti on Davisinsalmen poukama Baffininsaaren
  kaakkoiskulmassa. Pituutta on noin **230 km** ja leveyttä
  **40 km** suulla, kaventuen noin **20 km:iin** perukkaa kohti. —
  "Frobisher Bay" (johdanto)
- Lahden suppilomaisen muodon reunustavat kaksi niemimaata: Hall
  Peninsula koillisessa ja Meta Incognita Peninsula lounaassa. Muoto
  saa aikaan sen, että **vuorokautinen vuorovesivaihtelu Iqaluitissa
  on noin 7–11 metriä**. — "Frobisher Bay" (Geography)
- Muoto syntyi kvartäärikauden jäätiköitymisen aikana Foxe Basinin
  ylle keskittyneestä purkautumisjäätiköstä, joka kaivoi lahden
  altaan; meri tulvi sen myöhemmin. — "Frobisher Bay" (Geography)
- Rannat ovat korkeaa kalliota: koillisrannalla noin 330 metriä ja
  lounaisrannalla kaksi kertaa niin paljon. Syy on maankuoren
  kallistuminen paikallisesti varhaistertiäärikaudella. — "Frobisher
  Bay" (Geography)
- Lahti jatkuu lähes 70 mailin (yli sata kilometriä) verran itään
  loivine kukkuloineen ja jäätikköineen ja avautuu Davisinsalmeen,
  joka erottaa Nunavutin Grönlannista. — "Iqaluit" (Architecture and
  attractions)

**L2. Puuraja, joka meni etelään**

- Iqaluitin ilmasto on tundrailmasto (Köppen ET, Trewartha Ftkd),
  vaikka kaupunki on selvästi napapiirin eteläpuolella. Talvet ovat
  pitkiä ja kylmiä, kesät lyhyitä ja viileitä, ja **keskilämpötila on
  pakkasen puolella kahdeksana kuukautena vuodessa**. — "Iqaluit"
  (Climate)
- Talvikuukausien lämpötilat vastaavat läntisempiä pohjoisia yhteisöjä
  kuten Yellowknifea ja jossain määrin Fairbanksia. **Kesät ovat sen
  sijaan paljon kylmempiä** itäisen merellisen sijainnin ja kylmän
  Baffin Island Currentin takia. Siksi puuraja kulkee Kanadan
  itäosassa paljon etelämpänä — matalasta korkeudesta huolimatta niin
  etelässä kuin Pohjois-Labradorissa. — "Iqaluit" (Climate)
- Vaikka kaupunki on luontaisen puurajan pohjoispuolella, siellä on
  muutamia lyhyitä, etelään suuntautuneita tuotuja mustakuusia
  (*Picea mariana*), joita lumikinokset suojaavat talvella. —
  "Iqaluit" (Climate)
- Pensaista tavallisin on **arktinen paju** (*Salix arctica*): se voi
  olla vaakasuunnassa noin 7,6 metriä pitkä mutta vain noin 15
  senttimetriä korkea. — "Iqaluit" (Climate)
- Yleisimpiä kasveja Sylvia Grinnellin puistossa on
  rikkaruoholaji purppurarikko (purple mountain saxifrage), joka on
  Nunavutin virallinen kukka. — "Sylvia Grinnell Territorial Park"
  (Fauna and flora)
- **KIRJOITUSOHJE:** purppurarikko kuuluu kohdekartan Sylvia
  Grinnell -juttuun, ei tähän nostoon — valitse toinen.

**L3. Mittarit, jotka liikkuvat**

- Sadetta ja lunta kertyy vuodessa hieman yli **400 mm**, mikä on
  paljon enemmän kuin monilla muilla arktisen saariston paikoilla;
  kesä on sateisin vuodenaika. — "Iqaluit" (Climate)
- Iqaluitin ilmasto on kylmempi kuin Golfvirran vaikutuspiirissä
  olevat samalla leveysasteella olevat paikat: Norjan **Trondheimin
  vuoden keskilämpötila on 15,2 astetta leudompi**. — "Iqaluit"
  (Climate)
- Alin mitattu lämpötila on **−45,6 °C 10.2.1967**, ylin **26,8 °C
  21.7.2008**. — "Iqaluit" (Climate)
- Ilmasto muuttuu. Vuonna 1979 keskilämpötila oli **−9,0 °C**, vuonna
  2023 **−6,8 °C**. Jakson ensimmäisen 23 vuoden aikana 14 vuotta oli
  keskimääräistä kylmempiä ja 9 lämpimämpiä; jälkimmäisen 23 vuoden
  aikana kylmempiä oli vain 3 ja lämpimämpiä 20. — "Iqaluit"
  (Climate)
- **KIRJOITUSOHJE:** ilmastonmuutos todetaan neutraalisti
  luonnontieteellisenä tosiasiana ilman politiikkaa
  (spec-mantereet.md, P-Amerikka: "Nuuk/GRL, Iqaluit, Churchill").

**L4. Jää on tie**

- Kaupunki ja koko Nunavut ovat ilman maantie- tai rautatieyhteyttä
  muuhun Kanadaan, ja laivayhteys toimii vain osan vuotta. — "Iqaluit"
  (johdanto)
- Paikallinen tieverkko ulottuu vain Apexin yhteisöstä Sylvia
  Grinnellin puistoon, kilometrin päähän kaupungista länteen. —
  "Iqaluit" (Transportation)
- Kokeneet paikalliset ylittävät Hudsoninsalmen mantereelta sen
  jäätyessä joko jalan, koiravaljakolla tai moottorikelkalla —
  **yli sadan kilometrin matkan**. — "Iqaluit" (Transportation)
- Autojen määrä kasvaa siinä määrin, että syntyy satunnaisia ruuhkia,
  joita kutsutaan paikallisesti nimellä *"the rush minute"*.
  Autojen rahtaamisen hinta, ankara ilmasto ja karkeat tiet tekevät
  moottorikelkasta silti suositumman kulkuneuvon. — "Iqaluit"
  (Transportation)
- Talvella lähellä oleva Qaummaarviitin territoriopuisto ja kauempana
  Katannilikin territoriopuisto ovat saavutettavissa vain
  moottorikelkalla, koiravaljakolla tai jalan; kesällä molempiin
  pääsee veneellä. Qaummaarviit on saari Peterhead Inletin lähellä,
  ja sieltä on löydetty muun muassa yhdentoista puoliksi maahan
  kaivetun turvetalon jäänteet. — "Iqaluit" (Transportation,
  Architecture and attractions)
- Frobisherinlahden yli kulkee Katannilikin puistokäytävä ja Soper-
  joki, Kanadan perintöjoki (Canadian Heritage River), joka yhdistää
  Iqaluitin perinteisiä maareittejä pitkin Kimmirutiin (aiemmin Lake
  Harbour). — "Iqaluit" (Architecture and attractions)
- Koiravaljakoita käytetään talvella yhä, mutta pääasiassa
  virkistykseen. — "Iqaluit" (Transportation)
- Syvämerisatama avattiin Iqaluitiin heinäkuussa 2023 viiden vuoden
  rakentamisen jälkeen. Alkuperäisiin suunnitelmiin kuulunut
  autolauttayhteys Happy Valley-Goose Bayhin jätettiin pois
  kustannussyistä. — "Iqaluit" (Transportation)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Matkaopas on NYKYTIETOA (resepti, linjaustarkennus 20.8.2026): kuvat
tuoreita, etusivukuva maltillinen pysty (w/h 0,60–0,85).

**J1. Perille ja liikkeelle.** Iqaluit on Kanadan pienin pääkaupunki
väkiluvultaan ja ainoa, jota ei yhdistä muihin asutuksiin maantie;
saari on kaukana Kanadan tieverkosta, joten sinne pääsee yleensä vain
lentäen ja jääolojen salliessa veneellä. Iqaluitin lentoasema on
nykyaikainen, ja uusi suurempi matkustajaterminaali vanhan pohjoispuolella
valmistui 2018. Canadian North lentää Ottawasta, Yellowknifesta ja
useista Nunavutin yhteisöistä. Kaupungissa ei ollut julkista liikennettä
vuosiin; maaliskuussa 2026 aloitti Iqaluit Transit yhdellä reitillä
arkisin ja lauantaisin, perusmaksu 5 dollaria. Taksipalvelu kattaa koko
kaupungin. Suurimmat tiet ovat asfaltilla, pienemmät soraa, eikä
risteyksissä ole liikennevaloja vaan stop-merkit. — "Iqaluit"
(Transportation), "Iqaluit Airport"

**J2. Igluista ja lasikuidusta.** Iqaluitin arkkitehtuuri on
toiminnallista: materiaalikustannukset minimiin, lämpö sisään, ilmasto
kestettäväksi. Kirjo ulottuu 1950-luvun DEW-linjan parakeista
1970-luvun valkoiseen hypermodernistiseen lasikuitulohkoon (Nakasuk
School, kunnantalo ja jäähalli) ja teräsbetonisiin tornitaloihin
kukkulalla. Apexiin on säilytetty ja kunnostettu vanhoja Hudson's Bay
Companyn ja 1950-luvun alun rakennuksia. Poikkeus toiminnallisuudesta
on Nunavutin parlamenttitalo, jonka värikäs sisustus on koristeltu
parhaalla inuiittitaiteella. — "Iqaluit" (Architecture and attractions)

**J3. Juhlat ja äänet.** Iqaluitissa on vapaaehtoisvoimin järjestettävä
vuotuinen kevätjuhla Toonik Tyme, jossa yhdistyvät perinteiset
inuiittiaktiviteetit ja modernimmat tapahtumat. Alianait Music and Arts
Festival järjestetään viikon mittaisena joka 21. kesäkuuta ja on
houkutellut kanadalaisia ja kansainvälisiä esiintyjiä (Joshua Haulli,
Quantum Tangle, Washboard Hank, Namgar). Inuiittien kurkkulaulu eli
*katajjaq* on kahden naisen vastakkain seisten esittämä duetto ilman
säestystä: toinen aloittaa lyhyen rytmikuvion, toinen täyttää välit, ja
ensimmäisenä hengästyvä tai naurava häviää. Etelä-Baffinilla ja
Nunavikissa laji tunnetaan nimellä katajjaq, Iglulikissa ja
Baffininsaarella nimellä *piqqusiraarniq*. — "Iqaluit" (Architecture
and attractions), "Inuit throat singing"

**J4. Mitä täällä syödään ja mitä se maksaa.** Kaupunki on riippuvainen
kalliista tuontitavarasta, koska maantietä tai rataa ei ole ja
laivayhteys toimii vain osan vuotta; tämä on ollut yksi kasvun
rajoitteista. Nieriä (Arctic char) on nimen kala ja Sylvia Grinnell
-joen laji; kaupallinen nieriänkalastus joessa kiellettiin 1965, ja
ei-inuiitti tarvitsee kalastukseen luvan. Karibu on puiston tärkein
eläin ja merkittävä osa sekä perinteistä että nykyistä inuiittien
ruokavaliota. — "Iqaluit" (johdanto), "Sylvia Grinnell Territorial
Park" (Fauna and flora)

**J5. Milloin kannattaa tulla.** Nämä luvut ovat en-Wikipedian
"Iqaluit"-artikkelin Climate-osiosta; lehdellä ei ole omaa
vuosigraafia, koska säänormaaleja ei haettu tässä erässä.
Tundrailmasto, kahdeksan pakkaskuukautta, sadetta ja lunta hieman yli
400 mm painottuen kesään, ennätykset −45,6 °C (10.2.1967) ja 26,8 °C
(21.7.2008). Kesäkuun 21. päivänä on Alianait-festivaali. Talvella
Qaummaarviitiin ja Katannilikiin pääsee vain moottorikelkalla,
koiravaljakolla tai jalan. — "Iqaluit" (Climate, Transportation)

**SÄÄRIVIÄ EI TULE.** Fablen ohje 7.9.2026: säärivejä
(`js/packs/saatiedot.js`, Open-Meteo, `tools/hae-saanormaalit.mjs`) ei
tehdä tässä erässä. Oppaan sääjakso nojaa en-Wikipedian
Climate-osioon ja sanoo sen ääneen.

---

## 4. Kahdeksan kohdekartan kohdetta

Koordinaatit haettu en-Wikipedian rajapinnasta
(`action=query&prop=coordinates&redirects=1`) 7.9.2026; lentoaseman ja
Sylvia Grinnellin koordinaatit luettu artikkelien tietolaatikoiden
`{{coord}}`-merkinnöistä. Etäisyydet ovat omia laskelmiani
koordinaattieroista (asteet × 111,32 km, pituusasteille kerroin
cos(63,74°) ≈ 0,4424).

| # | Nimi suomeksi | Koordinaatit | Lähdeartikkeli |
|---|---|---|---|
| 1 | Iqaluitin lentoasema | 63,75667°N 68,55611°W | "Iqaluit Airport" |
| 2 | Sylvia Grinnellin puisto | 63,74861°N 68,56389°W | "Sylvia Grinnell Territorial Park" |
| 3 | Nunavutin parlamenttitalo | 63,75028°N 68,52306°W | "Legislative Building of Nunavut" |
| 4 | Inuksuk-lukio | 63,74917°N 68,51389°W | "Inuksuk High School" |
| 5 | Pyhän Juudaksen katedraali | 63,74750°N 68,51667°W | "St. Jude's Cathedral (Iqaluit)" |
| 6 | Astro Hill | 63,74778°N 68,51111°W | "Astro Hill Complex" |
| 7 | Nunatta Sunakkutaangit -museo | 63,74350°N 68,51380°W | "Nunatta Sunakkutaangit Museum" |
| 8 | Apex eli Niaqunngut | 63,73000°N 68,44583°W | "Apex, Iqaluit" |

**Pienin väli on noin 207 metriä** (Inuksuk-lukio – Astro Hill);
seuraavat ovat 230 m (katedraali – Inuksuk-lukio) ja 276 m
(katedraali – Astro Hill). Kaikki ylittävät 200 metrin rajan, joten
yhtään kohdetta ei tarvitse pudottaa — mutta kartta on tiivis ja
pisteet on katsottava PNG:stä silmin.

**Rajausehdotus:** pohjoinen 63,7610, etelä 63,7250, länsi −68,5720,
itä −68,4390 → noin **6,5 × 4,0 km**. Rajaus on tarkoituksella koko
kaupungin levyinen: Iqaluitin koko tieverkko ulottuu Sylvia
Grinnellin puistosta Apexiin, ja se on kartan varsinainen sisältö.

**POIS JÄTETYT KOHTEET (kohdekartta ei toista lehden juttuja —
New Yorkin sääntö):**

- *Qaummaarviitin territoriopuisto*: noston L4 aihe, ja piste on
  saarella (vesipisteen riski).
- *Katannilikin puisto ja Soper-joki*: noston L4 aihe, ja kymmenien
  kilometrien päässä lahden toisella puolella.
- *Nunavut Arctic College*: rajapinnan koordinaatti
  (63,72761 / −68,44456) osoittaa Apexin suuntaan eikä Nunatta-kampukselle
  keskustassa. Epävarmaa koordinaattia ei käytetä.
- *Nakasuk School*, *Joamie Ilinniarvik School*, *Unikkaarvik*,
  *syvämerisatama*: ei omaa artikkelia eikä julkaistua koordinaattia.
- *Frobisher Inn*: sama rakennus kuin Astro Hill.

---

## 5. Säätiedot

- **Kaupungin koordinaatit:** 63°44′58″N 68°31′18″W
  (63,74944 / −68,52167). — "Iqaluit" (infobox)
- **Köppen-luokka:** ET, tundrailmasto (Trewartha Ftkd). — "Iqaluit"
  (Climate)
- **Sademäärä:** hieman yli 400 mm vuodessa, kesä sateisin. —
  "Iqaluit" (Climate)
- **Ennätykset:** −45,6 °C 10.2.1967; 26,8 °C 21.7.2008. — "Iqaluit"
  (Climate)
- **HUOM:** kuukausinormaalit ovat artikkelissa mallineen
  `{{Iqaluit weatherbox}}` takana, eivätkä ne siis näy raakatekstissä.
  Lukuja ei arvata. `js/packs/saatiedot.js` jää koskematta (Fablen
  ohje 7.9.2026).

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

**Kansikuvat (3), ehdotus** (laajoja yleiskuvia, omistajan linjaus
21.8.2026):
1. Kaupunki ylhäältä tai kukkulalta, Koojesse Inlet takana.
2. Ranta ja Frobisherinlahti, värikkäät talot rivissä.
3. Kaupungin siluetti talvella tai keskiyön auringossa.

**Avauskuvat (3), ehdotus:** parlamenttitalo ulkoa, igluikatedraali,
Sylvia Grinnellin joki ja putous.

**Ennen ja nyt:** matkakirjan valokuvataulussa
(`js/packs/northamerica-valokuvat.js`, iqaluit) on VAIN nykykuvia
(2010–2025): kaupungissa ei ole ollut mitään kuvattavaa ennen vuotta
1942, joten 1800-luvun vedosta ei ole olemassa. Vanhan puolen ehdokas
olisi 1940–50-luvun tukikohtakuva, mutta sen on täytettävä samat
säännöt (≥ 1200 px, PD/CC). Jos kelvollista ei löydy, lehti taittuu
ilman paria kuten Lagos, Dubai, Doha, Salalah ja Astana.

**Commons-kategoriat kuvahakuun:**
- `Category:Iqaluit`, `Category:Views of Iqaluit`
- `Category:Legislative Building of Nunavut`
- `Category:St. Jude's Cathedral (Iqaluit)`
- `Category:Inuksuk High School`
- `Category:Nunatta Sunakkutaangit Museum`
- `Category:Sylvia Grinnell Territorial Park`
- `Category:Apex, Nunavut`
- `Category:Iqaluit Airport`
- `Category:Frobisher Bay`

**MINIATYYRIT:** kohdekartan kahdeksan kohdetta tarvitsevat
akvarelliminiatyyrit. Kirjoittaja EI generoi niitä
(kustannussääntö) vaan listaa ne raporttiin.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Sylvia Grinnellin puiston pinta-ala on artikkelissa kahdesti eri
   luku.** Tietolaatikko sanoo 44,3 km², leipäteksti 148 ha. Ero on
   30-kertainen (148 ha = 1,48 km2). **Ratkaisu:** älä käytä pinta-alaa lainkaan tai
   kerro ero auki.
2. **Frobisherin malmin määrä.** "Martin Frobisher" antaa toisen
   matkan saaliiksi "about 200 tons"; kolmannen matkan määrää ei
   yksilöidä ("a large quantity"). **Ratkaisu:** puhu 200 tonnista
   vain toisen matkan yhteydessä.
3. **Ensimmäinen anglikaaninen jumalanpalvelus.** "Martin Frobisher"
   sanoo "first known Anglican service in Canada"; "Frobisher Bay"
   sanoo "first Church of England service recorded on North American
   soil". **Ratkaisu:** käytä täsmällisempää muotoilua
   (Frobisherinlahti, elokuun lopun tai syyskuun alun 1578,
   muistopäivä 3.9.) ja kerro että kyse on kirjatusta ensimmäisestä.
4. **Hallin kuolinsyy.** Virallinen tuomio oli aivohalvaus, epäilty
   arseenimyrkytys; 1968 avaus osoitti suuren arseenimäärän.
   **Ratkaisu:** yksi neutraali virke, ei syytöksiä nimeltä.
5. **Iqaluitin joukkoliikenne.** Artikkeli kertoo sekä lakkautetusta
   Iqaluit Public Transitista että maaliskuussa 2026 aloittaneesta
   Iqaluit Transitista. **Ratkaisu:** kerro nykytila (2026) oppaassa.
6. **Nunavut Arctic Collegen koordinaatti** ei vastaa Nunatta-kampuksen
   sijaintia keskustassa (ks. osio 4). Ei käytetä.
7. **EI nykypolitiikkaa.** Nunavutin maaoikeussopimus ja territorion
   perustaminen 1999 kerrotaan tapahtumina; hallintokiistoja,
   nykypäivän puoluepolitiikkaa tai sosiaalisia ongelmatilastoja ei
   käsitellä.
8. **Minitehtäväehdotus (ei osu visaan):** *"Kuinka paljon vuorovesi
   nousee ja laskee Iqaluitissa vuorokaudessa?"* — vastaus
   "seitsemästä yhteentoista metriä", ja se löytyy samalta sivulta
   nostosta L1. Visa ei kysy vuorovedestä mitään.
9. **Kuvateksti on yksi virke** ja ARTIKKELIT-intro 7–10 virkettä
   (700–1 100 merkkiä). `js/packs/northamerica-artikkelit.js` tarvitsee
   avaimen `Iqaluit` (kaupungin wiki-nimi js/packs/northamerica.js:ssä).
