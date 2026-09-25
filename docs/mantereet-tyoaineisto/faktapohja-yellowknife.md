# Yellowknife — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `yellowknife`, maa CAN,
en-Wikipedia "Yellowknife". Kaikki tiedot haettu en-Wikipedian
raakatekstistä (`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`,
uusinnat kasvavalla viiveellä) **7.9.2026**. Malli ja mitat luettu
tiedostoista `tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/kohdekartta-ohje.md`, `docs/moduulit/kaupunkilehti.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md` ja
`docs/mantereet-tyoaineisto/spec-mantereet.md`. Malli: Lagosin ja
Sansibarin lehdet (v1670).

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Yellowknife"**,
**"Northwest Territories"**, **"Great Slave Lake"**,
**"Yellowknives"**, **"Old Fort Providence"**, **"Con Mine"**,
**"Giant Mine"**, **"Diavik Diamond Mine"**, **"Ekati Diamond Mine"**,
**"The Wildcat Cafe"** (ohjaus "Wildcat Cafe"),
**"Bank of Toronto (Yellowknife)"**, **"Back Bay Cemetery"**,
**"Weaver & Devore Trading"**, **"Log School House"**,
**"Ragged Ass Road (Yellowknife)"**, **"The Gold Range"**,
**"Prince of Wales Northern Heritage Centre"**,
**"Northwest Territories Legislative Building"**, **"Dettah"**,
**"Snowking Winter Festival"**,
**"Tibbitt to Contwoyto Winter Road"**.

## 0. Rajaus tälle lehdelle

**Kanadan maalehti (js/packs/maa-kategoriat.js, CAN) on jo tehty, eikä
sen aiheita toisteta** — sama luettelo kuin faktapohja-whitehorse.md:n
kohdassa 0 (viikingit, Hudson's Bay Company, konfederaatio, punatakit;
métis, totem, inuksuk, sisäoppilaitokset; Banff, Fundy, majavapato,
Wood Buffalo; vaahterasiirappi, poutine, Nanaimo, ketsuppisipsit;
jääkiekko, koripallo, curling).

Karttanostot on luettu: `maastokohteet-can.js` (mm. **Naha Dehé**, joka
on Yellowknifesta noin 500 km länteen, ja Dawson City),
`skandaalit.js` (CAN: Tyynenmeren skandaali 1873) ja `elaintakyt.js`
(CAN: **jääkarhu Churchillissä**). Yksikään näistä ei ole tämän lehden
aihe: Nahannin jokea ei mainita, ja arktinen eläinaihe jätetään
kokonaan pois.

Kanadan valmiit kaupunkilehdet on luettu (Vancouver, Toronto, Montreal,
Halifax) eikä niiden aiheita toisteta. **Whitehorsen lehti tehdään
samassa erässä**, joten yhteiset aiheet on jaettu: kultaryntäys ja
siipiratasalukset ovat Whitehorsen puolella, kaivosteollisuus ja
timantit tämän lehden puolella, ja kumpikin kertoo oman
alkuperäiskansansa omalla nimellään.

Kaupungin kysymyspakka `js/packs/northamerica-questions.js`
(`yellowknife`, viisi kysymystä): revontulet, Isonorjajärvi,
timanttikaivokset, miksi revontulia näkyy usein, talvitiet.
**Minitehtävä ei saa kysyä yhtään näistä viidestä.**
Kulttuurivisan erillistä `kysymys`-kenttää ei ole
Pohjois-Amerikan laudalla.

Olemassa olevat lohkot on luettu:
- `js/packs/northamerica-saapumiset.js` (`yellowknife`): **valmis, ei
  kosketa.** Siinä on kulta, timantit ja revontulet.
- `js/packs/northamerica-valokuvat.js` (`yellowknife`): **ennen–nyt-pari
  on valmiiksi tarkistettu** (Radium King 1930-luvulla / Old Town ja
  N'Dilo 2008), lisäkuvina asuntolaivat, Dettahin jäätie ja revontulet.
  Nämä viisi tiedostonimeä ovat varattuja.
- `js/packs/northamerica-artikkelit.js`: avainta `Yellowknife` EI ole →
  intro ja teksti kirjoitetaan.
- `js/packs/saatiedot.js`: riviä ei ole eikä sitä tehdä tässä erässä.

## 1. Perustiedot (en-Wikipedia "Yellowknife", johdanto)

- Luoteisterritorioiden pääkaupunki ja ainoa kaupunki. Väkiluku 2021:
  **20 340**.
- **Nimi tulee dene-kansasta**, jota kutsuttiin nimillä "Copper
  Indians" tai "Yellowknife Indians" ja joka nykyään on **Yellowknives
  Dene First Nation**. He kävivät kauppaa työkaluilla, jotka oli tehty
  Jäämeren rannikon kuparista.
- **Tłı̨chǫksi (dogrib) kaupunki on Sǫǫ̀mbak'è, "paikka jossa raha
  on".**
- Territorion **yhdestätoista virallisesta kielestä viittä** puhutaan
  Yellowknifessä merkittävissä määrin: dene sųłiné (chipewyan),
  tłı̨chǫ (dogrib), etelä- ja pohjoisslavey, englanti ja ranska.
- Yellowknivesin jäseniä asuu kaupungissa sekä viereisissä
  **Ndilǫn ja Dettahin** yhteisöissä.
- Kaupunki on **Kanadan kilven** päällä; maisema hioutui jääkaudella
  kalliolle, ja se on kivinen ja loivasti kumpuileva, täynnä pieniä
  järviä. Kuusi ja koivu viihtyvät; paljasta jäkäläkalliota on paljon.
- **Päivänvalo vaihtelee viidestä tunnista joulukuussa kahteenkymmeneen
  tuntiin kesäkuussa**, ja hämärä kestää koko yön toukokuun lopusta
  heinäkuun puoliväliin.

## 2. Yellowknives Dene (en-Wikipedia "Yellowknives")

- Nimet: Yellowknives, Copper Indians, Red Knives, **T'atsaot'ine**
  (wíílíídeh-murteella Tetsǫ́t'ınę). Nimi tulee kuparista tehtyjen
  työkalujen väristä.
- Perinteinen alue oli Isonorjajärven pohjois- ja koillispuolella
  Yellowknife-joen ja Yellowknife Bayn ympärillä, pohjoiseen
  Coppermine-joelle ja itään Thelon-joelle. Suuria jokia käytettiin
  kauppareitteinä **Hudsoninlahdelle asti**, missä **Samuel Hearne
  kohtasi heidät 1770-luvulla**. Yellowknives opastivat Hearnen
  tundran halki Jäämerelle etsimään kuparia.
- **1800- ja 1900-luvun alussa Yellowknives oli alueen suurin ja
  vaikutusvaltaisin heimo.**
- **1830-luvulla** raportoitiin tłı̨chǫn (dogrib) ja Yellowknivesin
  välisestä konfliktista, jonka jäljiltä Yellowknives joko hajaantui
  Isonorjajärven eteläpuolelle tai sekoittui tłı̨chǫihin — **lähteen
  mukaan mielipiteet vaihtelevat**.
- **Päällikkö Snuff allekirjoitti Treaty 8:n vuonna 1899.**
- Kullan löytymisen jälkeen tłı̨chǫ-, chipewyan- ja
  Yellowknives-taustaista väkeä kokoontui kaupunkiin sekä Dettahin ja
  Trout Rockin kyliin. **Ndilǫ rakennettiin 1950-luvun puolivälissä**
  Latham Islandin kärkeen valtion rahoituksella.
- **Yellowknives Dene First Nation perustettiin 1991**, ja se
  neuvottelee maaoikeuksistaan Akaitcho-prosessissa.
- **Wíílíídeh-murre** syntyi Yellowknivesin ja tłı̨chǫn välisistä
  avioliitoista, ja sitä puhutaan Dettahissa ja Ndilǫssa.
- **Dettah** (en-Wikipedia "Dettah"): nimi **T'é?ehdaá tarkoittaa
  "palanutta niemeä"** wíílíídeh-murteella ja yksinkertaistui muotoon
  Dettah, koska muut eivät osanneet lausua sitä. Paikka oli
  Tetsǫ́t'inen tavallinen kalapaikka. **Väkiluku 2021: 192.**
  Yellowknifestä **6,5 km jäätietä** talvella tai **27 km
  Ingraham Trailia** ympäri vuoden.

## 3. Vuosi 1873 ja Old Fort Providence

(en-Wikipedia "Old Fort Providence")

- **Old Fort Providence** Yellowknife Bayn suulla oli yksi
  Isonorjajärven ensimmäisistä turkiskauppa-asemista.
- **Peter Pond** ehdotti 1786 kauppaa Isonorjajärven denejen kanssa.
  **Vuonna 1789 Alexander Mackenzie** aloitti kaupan Yellowknivesin ja
  tłı̨chǫn kanssa ja määräsi apulaisensa **Laurent Leroux'n**
  perustamaan aseman.
- Asema ei ollut suuri turkiskaupan keskus vaan lähinnä **muiden
  asemien ja retkikuntien huoltopiste** — esimerkiksi **John Franklinin
  Coppermine-retkikunnan tukikohta 1820**. Se sijaitsi kalaisalla
  paikalla, jota denet olivat käyttäneet sukupolvien ajan.
- **Hudson's Bay Company otti aseman haltuunsa 1821**, mutta yhdyskunta
  oli taantumassa ja **asema suljettiin 1823**. Rakennukset lahosivat;
  rauniot kaivettiin esiin **1969—1971**.
- **Vuonna 1873 paikalla ei siis ollut kauppa-asemaa** — se oli ollut
  suljettuna viisikymmentä vuotta — eikä kaupunkia perustettu vielä
  kuuteenkymmeneen vuoteen.

## 4. Kulta ja kaupungin synty (en-Wikipedia "Yellowknife", History)

- **Dettah oli alueen ensimmäinen kiinteä asutus**, jonka Yellowknives
  perusti 1930-luvulla Yellowknife Bayn itäpuolisella niemellä.
- **Klondikeen matkalla ollut kullanetsijä E. A. Blakeney löysi kultaa
  Yellowknife Bayn alueelta 1898**, mutta löytöä pidettiin
  merkityksettömänä: Klondike vei huomion ja Isonorjajärvi oli liian
  kaukana.
- 1920-luvun lopulla **lentokoneita** alettiin käyttää arktisen Kanadan
  tutkimiseen. Uraania ja hopeaa löytyi Isokarhujärveltä 1930-luvun
  alussa, ja etsijät levittäytyivät laajemmalle.
- Kultaa löytyi **Yellowknife Bayn itäpuolelta 1934** (lyhytikäinen
  Burwash Mine). Kun valtion geologit löysivät kultaa lahden
  länsipuolelta suotuisammasta geologiasta **syksyllä 1935**, syntyi
  pieni valtausryntäys.
- **Con Mine** oli vaikuttavin esiintymä, ja sen kehittäminen johti
  **Yellowknifen ensimmäiseen asutukseen 1936—1937**. Ensimmäisiä
  yrityksiä olivat Corona Inn, **Weaver & Devore Trading**,
  Yellowknife Supplies ja posti sekä **The Wildcat Cafe**.
- **Con Mine aloitti tuotannon 5.9.1938.** Kesällä 1938 kaupunki
  buumasi: Canadian Bank of Commerce, Hudson's Bay Company, Vic
  Ingrahamin ensimmäinen hotelli, apteekki ja biljardisali.
  (en-Wikipedia "Con Mine": valtaus syyskuussa 1935 Consolidated Mining
  and Smelting Company of Canadan nimiin — **nimi "Con" on lyhenne
  sanasta Consolidated**; toiminta 1938—2003, tuotanto yli 5 miljoonaa
  unssia kultaa 12 195 585 tonnista malmia, kaivos yli 6 000 jalkaa
  syvä.)
- **Väkiluku 1 000 vuoteen 1940 mennessä**, ja **1942 alueella oli
  viisi kultakaivosta tuotannossa**. Vuoteen 1944 mennessä tuotanto oli
  pysähtynyt, kun miehiä tarvittiin sotaponnistuksiin. **Giant Minen
  tutkimusohjelma vihjasi 1944 suureen esiintymään**, mistä seurasi
  sodanjälkeinen valtausryntäys.
- **1939—1953** aluetta hallitsi liittovaltion pohjoisasiain
  osasto pienen, osin valitun ja osin nimitetyn neuvoston kautta.
  **1953 Yellowknifestä tuli kunta**, jolla oli oma valtuusto ja
  kaupungintalo; ensimmäinen pormestari **Jock McNiven**.
- **Syyskuussa 1967 Yellowknifestä tuli Luoteisterritorioiden
  pääkaupunki**, mikä käynnisti "kolmannen buumin" ja uusia
  kaupunginosia virkamiehille.
- **Neljäs buumi** alkoi, kun **timantteja löytyi 1991 noin 300
  kilometriä kaupungista pohjoiseen**.

## 5. Kullasta timantteihin (en-Wikipedia "Yellowknife", Economy)

- **Viimeinen kultakaivos suljettiin 2004** kullan hinnan laskun ja
  kohonneiden kustannusten takia.
- **Ekati Diamond Mine avattiin 1998**, **Diavik Diamond Mine aloitti
  tuotannon 2003**. Vuonna 2004 kahden kaivoksen tuotanto oli
  **12 618 000 karaattia, arvoltaan yli 2,1 miljardia Kanadan
  dollaria** — Kanada oli tuolloin **maailman kolmas timanttituottaja
  arvolla ja kuudes painolla**. Snap Lake sai luvat 2005 ja tuotantoon
  2007; Gahcho Kué avattiin 20.9.2016 ja kaupalliseen tuotantoon
  maaliskuussa 2017.
- Diavik on **noin 300 km koilliseen**, Lac de Gras -järven saarella,
  noin 220 km napapiiristä etelään; yhteys etelään jäätietä ja
  lentokenttää pitkin.
- **Arseeni** (en-Wikipedia "Yellowknife", Arsenic contamination):
  alueen kallioperässä on arsenopyriittiä, ja 1900-luvun kullankaivuu
  vapautti ympäristöön suuria määriä arseenia. **Giant Mine (1948—2004)
  jätti paikalle 237 000 tonnia arseenitrioksidia**; kaivos on 4 km
  kaupungin rajojen pohjoispuolella. **Giant Mine Remediation Project
  on miljardin dollarin puhdistushanke, jonka arvioidaan kestävän noin
  kymmenen vuotta.** Asukkaiden arseenipitoisuuksia seurataan useissa
  ohjelmissa.

## 6. Järvi, jää ja tiet

- **Great Slave Lake / Isonorjajärvi**: Luoteisterritorioiden
  toiseksi suurin järvi Isokarhujärven jälkeen, **Pohjois-Amerikan
  syvin järvi 614 metrillä**, maailman **kymmenenneksi suurin
  pinta-alaltaan**. Pituus **469 km**, leveys 20—203 km, pinta-ala
  **27 200 km²**.
- Perinteiset nimet: **Tıdeè** (tłı̨chǫ), **Tinde'e**
  (wíílíídeh/chipewyan), **Tu Nedhé** (dëne sųłıné) ja **Tucho**
  (dehcho dene zhatıé). Englanninkielinen nimi viittaa slavey-kansaan,
  jota cree-kansa kutsui nimellä ''Awokanek''. **2010-luvun lopulla on
  esitetty järven nimeämistä uudelleen** alkuperäisellä nimellä; esiin
  ovat nousseet Tu Nedhé ja Tucho.
- Järvi on **keskimäärin osin jäässä kahdeksan kuukautta vuodessa**.
  Syvin kohta on Christie Bayssa idässä.
- **Tibbitt to Contwoyto Winter Road**: talvinen jäätie, jota pitkin
  rekat vievät tarvikkeita kaivoksille. **Auki tavallisesti
  tammikuun lopusta maaliskuun loppuun tai huhtikuun alkuun**, ja
  Yellowknifestä tulee tuolloin kuljetusten lähtöpiste.
- **Deh Cho -silta avattiin 30.11.2012** ja antoi kaupungille
  ensimmäisen pysyvän maantieyhteyden muuhun Kanadaan; sitä ennen
  Mackenzie-joen yli mentiin lautalla tai jäätietä.
- **Ikirouta** pakottaa uusimaan katujen pinnat 10—20 vuoden välein.
- **Asuntolaivat** (Houseboats): **Jolliffe Island** Yellowknife
  Bayssä on kaupungin julkista maata sen jälkeen, kun Imperial Oil
  luopui paikasta. Saarta ympäröi asuntolaivayhteisö, jossa on asuttu
  **verkon ulkopuolella vuodesta 1978**. Suhde kaupunkiin on
  monimutkainen: laivat ovat nähtävyys, mutta asukkaat ovat kaupungin
  veropiirin ulkopuolella ja käyttävät silti kaupungin palveluja.

## 7. Ilmasto (en-Wikipedia "Yellowknife", Climate)

- Subarktinen ilmasto (Köppen Dfc). Sadetta **alle 300 mm vuodessa**,
  koska kaupunki on lännen vuoristojen sadevarjossa.
- **Tammikuun keskilämpötila noin −26 °C, heinäkuun noin 17 °C.**
  Alin mitattu **−51,2 °C (31.1.1947)**, ylin **32,6 °C (2.8.2021)**.
- **Environment and Climate Change Canadan mukaan Yellowknifessä on
  Kanadan aurinkoisin kesä: keskimäärin 1 034 tuntia kesä—elokuussa.**
  Vuodessa **2 256,5 tuntia auringonpaistetta eli 43,5 prosenttia
  mahdollisesta**, joulukuussa 15,4 % ja kesäkuussa 63,0 %.
- **Vuonna 2014 Environment Canada arvioi Yellowknifellä olevan Kanadan
  kaupungeista kylmin talvi ja pisin lumipeitteinen kausi sekä
  aurinkoisin kevät ja kesä.**
- Hallaton kasvukausi on keskimäärin runsaat 100 vuorokautta;
  kuivin kuukausi on huhtikuu ja sateisin elokuu.
- **Kaupunki on selvästi metsänrajan eteläpuolella** lämpimien
  kesiensä ansiosta, toisin kuin samoilla leveysasteilla idempänä.

## 8. Kulttuuri ja tapahtumat

- **Snowking Winter Festival** (en-Wikipedia "Snowking Winter
  Festival"): järjestetty **joka maaliskuu vuodesta 1996**.
  **Lumilinna rakennetaan Yellowknife Bayn jäälle**; ikkunat ja muut
  yksityiskohdat tehdään jäästä. Suunnittelusta ja rakentamisesta
  vastaa **Snowking, Anthony Foliot**. Linna on kasvanut käsittämään
  katsomon, kahvilan, sisäpihan, liukumäen, rintavarustuksia ja
  torneja. Kuukauden mittaisessa juhlassa on konsertteja,
  taidenäyttelyitä ja lastenteatteria. Alkuvuosina "linna" oli tunneleita
  hangissa Woodyardin naapurustossa.
- **Folk on the Rocks** -musiikkijuhla vuodesta 1980.
- **Midnight Sun Golf Tournament**: pelataan kaupungin valoisina
  kesäöinä, jopa 400 pelaajaa vuodessa.
- **Long John Jamboree** pidettiin ensi kerran 23.—25.3.2012
  Yellowknife Bayn jäällä lumilinnan vieressä.
- **Arktiset talvikisat** järjestettiin ensimmäisen kerran
  Yellowknifessä 1970; kaupunki on isännöinyt niitä myös 1984, 1990,
  1998 ja 2008.
- **Old Town Ramble & Ride** vuodesta 2006, elokuun pitkänä
  viikonloppuna.
- Matkailu on territorion suurin uusiutuva elinkeino, ja Yellowknife on
  matkailijoiden pääportti; moni tulee katsomaan **revontulia**.

## 9. Vuoden 2023 maastopalot

- **16.8.2023** territoriohallinto aloitti kaupungin evakuoinnin, kun
  maastopalot lähestyivät ja **valtatie 3** uhkasi jäädä
  kulkukelvottomaksi.
- **19.8.2023 mennessä 87 prosenttia kaupungista oli evakuoitu**:
  20 000:sta jäljellä oli 2 600, joista 1 000 välttämättömiä
  työntekijöitä. Palo oli tuolloin 162 936 hehtaarin laajuinen ja
  16 kilometrin päässä kaupungista; territoriossa oli 236 aktiivista
  paloa.
- **Evakuointimääräys purettiin 6.9.2023**, ja asukkaat alkoivat palata
  samana päivänä.

## 10. Kohdekartan kahdeksan kohdetta

Koordinaatit en-Wikipedian geosearch-rajapinnasta 7.9.2026. Kohteet
eivät toista lehden juttuja (New Yorkin sääntö).

1. **Bank of Toronto** 62.47 / −114.344 — hirsimökki, jonka rakensi
   **1939 hirsityön mestari John Stakson** asuinkäyttöön. **Lokakuussa
   1944 Bank of Toronto osti mökin ja avasi siihen pankin**; kaupungin
   ensimmäinen pankki oli Bank of Commerce 1938. Pankki tuli
   Giant Minen löytöjen ja valtausryntäyksen synnyttämän rahaliikenteen
   perässä. **Konttori suljettiin elokuussa 1951**, kun kultaryntäys
   loppui. Kullanetsijä **Sam Otto osti mökin 1964**, kunnosti sen ja
   siirsi Latham Islandille vuokra-asunnoksi. Kaupungin
   perintökohteeksi 1998.
2. **The Wildcat Cafe** 62.46652 / −114.34889 — hirsirakennus, joka
   edustaa varhaisen Yellowknifen kaivosleirityyliä. **Avattiin 1937**
   (omistajat Willie Wylie ja Smokey Stout) ja on **kaupungin vanhin
   ravintola**. Myöhemmät omistajat Carl ja Dorothy Jensen (1939—1942)
   ja **Mah Gow (1942—1951), Yellowknifen ensimmäinen kirjattu
   kiinalainen asukas**. Kahvila sulki 1951 Gow'n sairastuttua.
   Rakennus pelastettiin purkamiselta 1950-luvun lopulla, kunnostettiin
   ja avattiin uudelleen 1979. **2011—2013 talo purettiin osiin, kaikki
   osat numeroitiin ja se rakennettiin uudelleen**, koska se oli
   painunut maahan ja kallistunut moneen suuntaan yhtä aikaa; purku
   alkoi 11.5.2011 ja uusi avajaispäivä oli 22.6.2013.
3. **Back Bay Cemetery** 62.4691 / −114.3626 — kaupungin ensimmäinen
   hautausmaa Back Bayn rannalla. **Ensimmäinen kirjattu hautaus
   27.9.1938**; vuosien **1938 ja 1946 välillä yli 40 ihmistä**
   haudattiin tänne, minkä jälkeen hautausmaa suljettiin ja siirrettiin.
   Läheisen puron törmän kuluminen on vahingoittanut hautoja. Kaupungin
   perintökohde.
4. **Weaver & Devore Trading** 62.46444 / −114.35028 — itsenäinen
   sekatavarakauppa, jonka perustivat **1936 turkiskauppiaat ja
   vesikulkijat Harry Weaver ja Ellis "Bud" Devore** Peace Riveristä.
   Ensimmäinen kauppamatka Yellowknife Baylle tehtiin kesällä 1936
   kaivostoiminnan vilkastuttua; **seuraavana vuonna pystytettiin
   pysyvä hirsinen kauppa-asema**. Devore myi osuutensa 1955, Weaver
   kuoli 1957, ja liike pysyi Weaverin suvulla **vuoteen 2025 asti**.
   Turkiskauppa lopetettiin 1980-luvulla; nykyään myydään
   sekatavaraa, tuoretuotteita, erätarvikkeita ja ulkoiluvaatteita.
   **Alkuperäisessä vuoden 1937 asemassa toimii nykyään ravintola.**
5. **Ragged Ass Road** 62.46063 / −114.35256 — lyhyt päällystämätön
   asuinkatu Old Townissa, **noin 150 metriä pitkä**. Katua kutsuttiin
   ulkohuussien takia nimellä Privy Road. **Vuoden 1970 lopulla**
   asukas **Lou Rocher**, joka omisti kadun yhdeksästä tontista kuusi,
   totesi huonon malminetsintäkauden jälkeen ystävineen olevansa
   "ragged ass broke" — ja he pystyttivät kyltin samana yönä. Kaupunki
   ei tunnustanut nimeä virallisesti eikä pystyttänyt kylttejä ennen
   **2010-luvun puoliväliä**, Rocherin kuoleman jälkeen. Rocher teki
   omat kylttinsä ja hitsasi ne lopulta tolppiin, koska matkailijat
   veivät ne. Katua on kutsuttu yhdeksi Kanadan kuuluisimmista, ja
   **Tom Cochrane nimesi vuoden 1995 albuminsa sen mukaan**.
6. **Northwest Territories Legislative Building** 62.45944 /
   −114.38194 — **rakennettu 1993, käyttöön 1994**, ja kuningatar
   Elisabet II vihki sen. Suunnittelijat Ferguson Simek Clark /
   Pin Matthews (Yellowknife) ja Matsuzaki Wright Architects
   (Vancouver). **Kaksikerroksinen, kaksi pyöreää salia** (Great Hall
   ja ryhmähuone). **Istuntosali ja ryhmähuone ovat pyöreitä, koska
   territoriossa hallitaan konsensuksella.** Salin ympärillä on
   tulkkauskopit kaikille yhdelletoista viralliselle kielelle, ja
   kattoikkunat kiertävät salia, koska kesällä valo tulee joka
   suunnasta. Puhemiehen takana on käsintaottu sinkkiseinä, joka
   mukailee lähistön kallioita. **Valtikassa on mursunnorsunluuta ja
   puuta vuoden 1845 Franklinin retkikunnan aluksista.** Pihat
   suunnitteli **Cornelia Oberlander**, ja ne katsovat Frame Lakelle.
7. **Prince of Wales Northern Heritage Centre** 62.45611 / −114.38 —
   Luoteisterritorioiden hallituksen museo ja arkisto. Historia alkoi
   1950-luvulla, kun joukko yellowknifeläisiä haaveili museosta;
   **Museum of the North avautui heinäkuussa 1963** vapaaehtoisvoimin
   ja siirtyi territorion hallinnolle 1970. Uuden laitoksen rakentaminen
   alkoi 1975, ja **prinssi Charles vihki talon 3.4.1979**. Talossa on
   näyttelyiden lisäksi territorion arkisto, ja se **myöntää luvat
   arkeologisiin tutkimuksiin** Luoteisterritorioissa.
8. **Log School House** 62.45194 / −114.37667 — kaupungin ensimmäinen
   koulurakennus, pieni 1930-luvun puolivälin hirsimökki. Sen rakensi
   paikallinen kultakaivosyhtiö, ja **se otettiin kouluksi 1938**, kun
   väkiluku kasvoi. Koulua varten perustettiin **Yellowknife Education
   District No. 1, jonka koululautakunta oli territorion ensimmäinen
   demokraattisesti valittu hallintoelin**. Kahdenkymmenen oppilaan
   ryhmä oli niin ahtaassa tilassa, että **opetus pidettiin kahdessa
   vuorossa**, ja tunteja keskeyttivät ohikulkevat kaivosmiehet, jotka
   tulivat katsomaan tai luulivat taloa baariksi. Kahden vuoden
   kuluttua piiri muutti isompiin tiloihin; mökki toimi sittemmin
   pesulana ja asuntona. **Siirrettiin 1987 Old Townista nykypaikalleen
   Mildred Hallin koulun tontille** ja kunnostettiin.

Pienin väli kahdeksan kohteen välillä on **242 metriä** (The Wildcat
Cafe – Weaver & Devore Trading), eli 200 metrin sääntö täyttyy.

**Pois jätetyt, vaikka ruudussa:** *Hudson's Bay Warehouse* (70 m
Wildcat Cafésta) ja *Canadian Pacific Airlines floatbase* (samalla
kohdalla) putoavat etäisyyssäännöllä; *The Gold Range* on baari, joka
jätetään pois sävysyistä; *Ndilǫ* on Yellowknives Denen yhteisö ja
lehden oman noston aihe, eikä kohdekartta toista lehteä; *Con Mine* ja
*Giant Mine* ovat ruudun ulkopuolella ja lehden juttuja.

## 11. Avoimet kysymykset päätoimittajalle

- **A.** Yellowknivesin ja tłı̨chǫn 1830-luvun konflikti: lähde sanoo
  suoraan "the Dogrib almost wiped out the Yellowknives" ja lisää, että
  **mielipiteet vaihtelevat** siitä, mitä sen jälkeen tapahtui.
  Ehdotus: kerrotaan tapahtumana ilman yksityiskohtia ja sanotaan
  lähteen epävarmuus ääneen; kansa kuvataan nykypäivän toimijana
  (First Nation 1991, Akaitcho-prosessi, wíílíídeh-murre).
- **B.** Giant Minen arseeni: onko liian raskas aihe? Ehdotus:
  **mukaan**, koska se on kaupungin oman historian ydintä ja pilari 4
  kieltää kaunistelun. Kerrotaan lukuina ja puhdistushankkeena, ilman
  syyllisten osoittelua.
- **C.** Isonorjajärven nimen uudelleennimeämiskeskustelu: onko
  nykypolitiikkaa? Ehdotus: **mukaan yhdellä neutraalilla virkkeellä**
  (nimien palauttaminen alkuperäiskielille on kulttuuriasia; sama
  linja kuin muualla pelissä).
- **D.** Konsensushallinto (ei puolueita): ehdotus **mukaan
  rakennetietona** istuntosalin pyöreyden selityksenä, ei
  puoluepolitiikkana. Vrt. Nikosian ennakkotapaus.
- **E.** Vuoden 2023 maastopalot: ehdotus **mukaan matkaoppaan
  "Hyvä tietää" -kohtaan ja yhteen nostoon neutraalina tapahtumana**
  (evakuointi ja paluu), ilman syyllisiä ja ilman ilmastopolitiikkaa.
- **F.** Ragged Ass Roadin nimi on englanniksi arkinen. Ehdotus:
  **kohde nimetään suomeksi kadun englanninkielisellä nimellä** ja
  merkitys selitetään jutussa asiallisesti ("rahaton, riekaleinen") —
  peli on 13 vuotta täyttäneille.
