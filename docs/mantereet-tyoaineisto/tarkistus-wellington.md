# Wellington — faktantarkistus

Riippumaton tarkistus faktapohjalle `faktapohja-wellington.md`. Lähteet
tarkistettu **23.8.2026** en-Wikipediasta (`action=raw`-API ja MediaWikin
`prop=coordinates`-rajapinta), `NODE_USE_ENV_PROXY=1`, kasvavalla
takaisinvetäytymisviiveellä 429-vastauksiin (haku törmäsi toistuvasti
piiloitettuun "too many requests" -vastaukseen, HTTP 200 mutta
tekstisisällössä virhe — jokainen vastaus tarkistettiin ennen jäsentämistä).
Luetut artikkelit: "Wellington", "1855 Wairarapa earthquake", "Wellington
Cable Car", "Te Papa", "Old St Paul's, Wellington", "New Zealand Parliament
Buildings", "Government House, Wellington", "Zealandia (wildlife
sanctuary)", "Wellington Harbour", "Wētā Workshop", "Taranaki Whānui ki te
Upoko o te Ika", "Ngāti Pōneke". Jokainen luku-, vuosiluku- ja
nimivälitteinen väittämä (n. 90 kpl: 16 nostoa, 5 jaksoehdotusta, 10
kohdekarttapistettä koordinaatteineen, säätiedot, kuva-aiheiden
kategorianimet) on tarkistettu erikseen alkuperäisestä artikkelista —
faktapohjan omia lähdemerkintöjä ei ole hyväksytty sellaisenaan.
Visavertailu tehty `js/packs/oceania-questions.js`:n `wellington`-kohtaa
vasten (viisi kysymystä, vaihtoehdot ja `fact`-kentät).

**Yleisarvio: poikkeuksellisen huolellista työtä.** Kaikki koordinaatit
(10/10), kaikki säätiedot, molemmat erityisesti pyydetyt tarkistuskohteet
(Wahine-uhriluku 53, kuvernööri Bowenin muutto 1873) ja lähes kaikki
yksittäiset vuosiluvut/nimet täsmäsivät lähteisiin sanatarkasti. **Yksi
kohta on kuitenkin todellinen ja vakava virhe**: H1-nosto paljastaa visan
Q5-kysymyksen oikean vastausvaihtoehdon sanasta sanaan, ja faktapohjan oma
laadunvarmistusosio (7.5) väittää virheellisesti, ettei näin tapahdu. Lisäksi
kaksi muuta kohtaa vaativat kirjoittajan huomion ennen julkaisua.

---

## VIRHEET JA VUODOT (korjattava ennen käyttöä)

### 1. [VAKAVA] H1-nosto paljastaa visan Q5-vastauksen sanasta sanaan — JA faktapohja väittää itse päinvastaista

**VÄITE (H1-nosto, osio 2):** *"...vuosikymmenten mutkien kautta samasta
perustasta kasvoi lopulta Te Papa — **Uuden-Seelannin kansallismuseo**, joka
avautui nykymuodossaan vasta 1998..."*

**FAKTAPOHJA SANOO (osio 7.5, kohta "Kysymys 5"):** *"H1- ja N2-nostot
käsittelevät Te Papaa, mutta H1 kertoo museon 1865-syntyhistoriasta **(ei
mainita "kansallismuseo" visan sanamuodolla)**..."*

**LÄHDE SANOO:** `js/packs/oceania-questions.js`, `wellington[4]`:
`q: 'Mikä on Te Papa?'`, `options: ['Uuden-Seelannin kansallismuseo',
'satama', 'vuori', 'juhla']`, `correct: 0`.

Nämä kaksi eivät täsmää: H1:n blockquote-teksti käyttää ilmausta "Uuden-
Seelannin kansallismuseo" **sana sanasta identtisesti** visan oikean
vastausvaihtoehdon kanssa, vaikka faktapohjan oma laadunvarmistus (osio 7.5)
nimenomaan väittää, ettei tätä sanamuotoa käytetä. Kyseessä ei ole pelkkä
visavuoto vaan myös faktapohjan sisäinen ristiriita oman analyysinsa kanssa
— osio 7 on juuri se kohta jonka piti estää tällaiset tapaukset, ja tässä
tapauksessa se antoi väärän vihreän valon.

**KORJAUS:** Poista tai muotoile uudelleen H1:n lause niin, ettei se sisällä
sanaparia "Uuden-Seelannin kansallismuseo". Esimerkiksi: *"...kasvoi
lopulta nykyinen Te Papa, joka avautui nykymuodossaan vasta 1998..."*
(museon identiteetti käy silti ilmi asiayhteydestä ja otsikosta, mutta
tarkkaa vaihtoehtotekstiä ei toisteta). Char-määrä pysyy lähes ennallaan.

### 2. [Kohtalainen] N2-nosto paljastaa Te Papan nimen merkityksen — lähellä visan omaa selitystekstiä

**VÄITE (N2-nosto, osio 2):** *"...ja nimi tarkoittaa vapaasti 'aarteiden
säilytyspaikkaa'."*

**FAKTAPOHJA SANOO:** Osio 7.5 toteaa H1:n ja N2:n osalta vain, ettei
kumpikaan "mainitse jättikalmarinäytettä eikä ilmaista sisäänpääsyä" —
nimen merkityksen toistamista ei käsitellä lainkaan riskinä.

**LÄHDE SANOO:** `oceania-questions.js`, `wellington[4].fact`: *"...Nimi
tarkoittaa maorin kielessä aarreaittaa tai kotia."* Sekä en-Wikipedia "Te
Papa": *"Te Papa Tongarewa translates literally to 'container of
treasures'..."* — molemmat lähteet vahvistavat käännöksen olevan asiasisällöltään
oikea, mutta N2:n muotoilu ("aarteiden säilytyspaikkaa") on merkitykseltään
lähes identtinen visan oman vihjetekstin ("aarreaittaa tai kotia") kanssa.
Toisin kuin H1-tapaus (kohta 1), tämä ei ole sanasta sanaan sama teksti eikä
yksi visan MCQ-vaihtoehdoista, joten kyse on lievemmästä, mutta silti
todellisesta riskistä: pelaaja joka on lukenut N2-noston tietää jo visan
"vihjeen" sisällön etukäteen.

**KORJAUS:** Harkitse nimen merkityksen poistamista N2:sta kokonaan (nosto
toimii ilman sitäkin — hotellin siirto kiskoilla on itsessään vahva tarina),
tai jätä korjaus kirjoittajan harkintaan ja mainitse riski työlistassa.

### 3. [Huomio] "Taranaki Whānui ki te Upoko o te Ika" -artikkeli ON OLEMASSA — faktapohjan osio 7.4 on väärässä

**VÄITE (osio 7.4):** *"En löytänyt erillistä, ajantasaista en-Wikipedia-
artikkelia iwi-järjestöstä 'Taranaki Whānui ki Te Upoko o Te Ika' (haku
palautti 404 — artikkelia ei ole tällä tarkalla nimellä, tai se on
uudelleenohjattu tavalla jota en ehtinyt jäljittää)."*

**LÄHDE SANOO:** Artikkeli on olemassa juuri tällä otsikolla (pienellä
alkukirjaimella "ki te", ei "Ki Te") ja on suora, toimiva linkki myös
pääartikkelista "Wellington" (Culture-osiossa: *"...and indigenous
[[Taranaki Whānui ki te Upoko o te Ika|Taranaki Whānui]] communities"*).
Sisältö vahvistaa faktapohjan jo käyttämät faktat täsmälleen (mana whenua
-viisikko Te Ātiawa/Taranaki/Ngāti Ruanui/Ngāti Tama/Ngāti Toa, Deed of
Settlement allekirjoitettu **19.8.2008** Port Nicholson Block Settlement
Trustin ja kruunun välillä — molemmat täsmäävät sanatarkasti) mutta
sisältää myös lisätietoa, jota faktapohja ei käyttänyt: rohe (heimoalue)
ulottuu Remutaka Rangelta Turakiraeen ja Tawaan asti, ja alkuperäiset
maakauppa-asiakirjat ovat vuosilta 1839 ja 1844.

**KORJAUS:** Ei vaadi korjausta jo kirjoitettuihin nostoihin (mana whenua-
ja 2008-faktat pitivät jo paikkansa), mutta kirjoittajan kannattaa lukea
tämä artikkeli suoraan pilari 3 -lauseen muotoiluun (osio 7.4:n suositus
"yksi lause... täyttäisi pilari 3:n vaatimuksen") — se tarjoaa täsmällisemmän
ja ajantasaisemman lähteen kuin pääartikkelin sivumaininnat.

---

## MUUT HUOMIOT (ei virheitä, mutta kirjoittajan syytä tietää)

### 4. Kohdekartan piste #9 "Government House" voi sekoittua H4-noston eri rakennukseen

Faktapohjan kohdekartassa (osio 4) piste 9 "Government House" viittaa
koordinaatteihin 41,3061°S 174,7811°E, lähdeartikkeli "Government House,
Wellington" — tämä on **nykyinen (kolmas), vuonna 1910 valmistunut**
Government House Newtownissa (vahvistettu: *"The Governor-General's
residence, Government House (the current building completed in 1910) is
situated in Newtown, opposite the Basin Reserve."*). H4-nosto taas kertoo
**toisesta** Government Housesta (Clayton, valmistui n. 1871, Bowenin
ensimmäinen asukas 1873, purettu myöhemmin) — eri rakennus, eri paikka
(sijaitsi Parlamenttitalon vieressä, nykyisen Beehiven kohdalla; vahvistettu
Wellington-artikkelista: *"The original Government House (now the site of
the Beehive)..."*). Faktapohja itse huomaa oikein (osio 7.3), ettei
kohdekartassa ole erillistä pistettä toiselle Government Houselle — mutta
koska kartalla ON piste nimellä pelkkä "Government House" (nykyinen), lukija
saattaa erehtyä yhdistämään sen H4-noston tarinaan. **Lisälöytö:** sama
Clayton-rakennus (H4:n kohde) toimi myös väliaikaisena parlamenttitalona
vuosina 1907–1918/1922 Parlamentin palon jälkeen (vahvistettu "New Zealand
Parliament Buildings" ja "Government House, Wellington" -artikkeleista) —
eli H3- ja H4-nostot kertovat itse asiassa saman fyysisen rakennuksen kahdesta
eri elämänvaiheesta, mitä faktapohjan osio 1 (Sivu B:n perustelu, "eivät
toista toisiaan") ei mainitse. Ei virhe kummassakaan nostossa, mutta
kirjoittaja voisi joko hyödyntää yhteyden vahvuutena (linkittää nostot
toisiinsa) tai varmistaa ettei kartan "Government House"-pisteen kuvateksti
anna ymmärtää sen olevan H4:n rakennus.

### 5. L1-noston "mustekit" on epäselvä suomen sana

**VÄITE (L1-nosto, osio 2):** *"...ympäröitiin pedottomaksi tarkoitetulla
aidalla, jonka tarkoitus on sulkea ulos rotat, **mustekit** ja muut ihmisen
tuomat nisäkkäät..."*

Lähde (en-Wikipedia "Zealandia (wildlife sanctuary)") listaa aidan
ulkopuolelle jäävinä lajeina mm. rotat (black rat, Norway rat), **possumit**
(common brushtail possum) ja **kärpät** (stoat) — ei mitään, mikä
kääntyisi suomeksi "mustekki" (joka ei ole vakiintunut suomen sana; lähinnä
"mustekala" tai käsittämättömäksi jäävä lyhennys sanasta "mustelidi" eli
näätäeläin/kärppä). Tämä ei ole faktavirhe sisällöltään (possumit ja kärpät
KUULUVAT aidan ulkopuolelle torjuttaviin lajeihin) vaan kielellinen
epäselvyys/mahdollinen kirjoitusvirhe, joka pitää korjata ennen julkaisua —
esim. "possut ja kärpät" tai "possut ja muut näätäeläimet".

### 6. Pieni tarkennus: Sivu A:n johdanto voisi täsmentää "itsenäisen valtion"

**VÄITE (Sivu A, johdanto-ainesta):** *"Wellington on maailman eteläisin
pääkaupunki (41°17'S)..."*

**LÄHDE SANOO:** en-Wikipedia "Wellington": *"It is the world's southernmost
capital **of a sovereign state**."* Ilman tarkennusta "itsenäisen valtion"
väite on teknisesti epätäsmällinen, koska esim. Port Stanley (Falklandinsaaret,
Britannian merentakainen alue) sijaitsee eteläisempänä muttei ole itsenäisen
valtion pääkaupunki. Tämä on vain johdanto-ainesta (ei valmis nosto), mutta
kannattaa täsmentää samalla tavalla kuin visan oma `fact`-kenttä jo tekee
("maailman eteläisin **itsenäisen valtion** pääkaupunki").

---

## ERITYISESTI PYYDETYT TARKISTUKSET — MOLEMMAT VAHVISTETTU OIKEIKSI

### A. Wahine-onnettomuuden kuolonuhrien luku (53) — VAHVISTETTU, ei virhettä

**VÄITE (L4-nosto ja osio 7.2):** Kokonaisluku 53, ja huomautus että
"Wellington Harbour" -artikkelin sisällä esiintyy sekä muotoilu "51 kuoli
tuolloin, 2 myöhemmin" että "loss of 53 lives" — sama luku eri tavoin
ilmaistuna, ei todellinen ristiriita.

**LÄHDE SANOO (en-Wikipedia "Wellington Harbour"):**
- *"In 1968, the inter-island passenger ferry Wahine grounded at Barrett
  Reef... **Fifty-one people died at the time and two more died much later**
  from injuries suffered that day."* (51+2=53)
- *"...the sinking of the inter-island ferry TEV Wahine in 1968, with the
  **loss of 53 lives**."*

Molemmat kohdat vahvistuivat sanatarkasti juuri niin kuin faktapohja kuvaa.
Faktapohjan päätös käyttää riidatonta kokonaislukua 53 ilman 51+2-jaon
auki kirjoittamista on perusteltu ja oikea. **Ei korjaustarvetta.**

### B. Kuvernööri Bowenin muutto toiseen Government Houseen 1873 — VAHVISTETTU, ei virhettä

**VÄITE (H4-nosto):** Toinen Government House valmistui noin 1871
(arkkitehti William Henry Clayton, italialaistyylinen, kokonaan puinen,
tornillinen), ja sen ensimmäinen asukas oli kenraalikuvernööri Sir George
Ferguson Bowen, joka muutti taloon vuonna 1873.

**LÄHDE SANOO (en-Wikipedia "Government House, Wellington", osio "Second
Government House"):** *"Designed by William Henry Clayton (1823–1877) and
completed around 1871 the second Government House commanded expansive views
over the city and harbour... **Its first occupant was Sir George Ferguson
Bowen in 1873.**"* Myös suunnittelun alkamisvuosi (1868) ja
italialaistyylin valinta goottilaisen sijaan ("at least partly because it
was a cheaper option") täsmäävät sanatarkasti. **Ei korjaustarvetta** —
tämä on faktapohjan vahvin ja tarkimmin lähteistetty yksittäinen väite.

---

## MUUT TARKISTETUT JA VAHVISTETUT FAKTAT (laaja otos, ei virheitä)

Seuraavat tarkistin suoraan lähdeartikkeleista ja ne täsmäävät koostajan
tekstiin sanatarkasti tai käytännössä sanatarkasti:

- **Pääkaupunkiasema:** Domett'n päätöslauselma marraskuussa 1863,
  australialaiskomissaarit, koko Royal Navyn laivasto olisi mahtunut
  satamaan, parlamentti kokoontui ensin 26.7.1865, väkiluku tuolloin 4 900 —
  kaikki täsmäävät en-Wikipedia "Wellington", osio "National capital".
- **1855 Wairarapa-maanjäristys:** 23.1.1855 klo 21.17, magnitudi "at least
  8.2" (vahvistettu juuri tällä sanamuodolla Geology-osiosta, ei liioittelu),
  Uuden-Seelannin voimakkain siirtomaa-ajan järistys, 2–3 metrin pystynousu,
  Lambton Quay 100–200 m rannasta, "Shoreline 1840" -laatat — kaikki täsmää.
- **Wellington Cable Car:** avattu 22.2.1902, yksiraiteinen ohituspaikalla,
  yläasema Kasvitieteellisen puutarhan vieressä, Kelburnin kioski 1905
  (paloi, tilalle Skyline-ravintola 1984) — täsmää.
- **Te Papa / Colonial Museum:** perustettu 1865, James Hector johtajana
  1865–1903 tarkalleen, nimenmuutos Dominion Museumiksi 1907, nykyinen Te
  Papa perustettu lailla 1992, avautui 1998, hotellin siirto kiskoilla 1993
  (200 m, 16 m syvyyteen tiivistys, yli 50 000 painoa, jopa 30 tonnia/30 m
  korkeudesta) — kaikki täsmää sanatarkasti.
- **Old St Paul's:** perustuskivi 21.8.1865 kuvernööri Greyn toimesta,
  vihitty 6.6.1866 piispa Abrahamin toimesta, arkkitehti Frederick Thatcher,
  goottilainen puurakennus, "one of the best examples of timber Gothic
  Revival architecture in the world" — täsmää.
- **Parlamenttitalot:** puinen kaksikerroksinen maakuntaneuvoston rakennus,
  1880-luvun kolmikerroksinen goottilainen (Turnbull), tuhoutui tulipalossa
  1907 paitsi kirjasto (rautainen palo-ovi), parlamentti majoittui
  viereiseen Government Houseen kymmeneksi vuodeksi, uusklassinen
  Parliament House valmistui 1922, kirjasto 1899 vanhin osa — täsmää.
- **Zealandia:** perustettu 1999, 225 ha, "world's first fully-fenced urban
  ecosanctuary", torjuu rotat/possumit/kärpät, tui- ja kaka-havainnot
  lisääntyneet — täsmää.
- **Wellington Harbour / Matiu-Somes:** kolme saarta (Matiu/Somes,
  Mākaro/Ward, Mokopuna), vain Matiu/Somes asutukseen sopiva, karanteeni +
  internointileiri molemmissa maailmansodissa, nyt luonnonsuojelusaari,
  lauttayhteys päiväsaikaan — täsmää.
- **Wētā Workshop:** RT Effects 1987 → Weta Workshop 1993, Richard Taylor +
  Tania Rodger, yksityisomistuksessa, erillinen Weta FX:stä (Peter
  Jackson), "Wellywood"-lempinimi, Unesco City of Film 2019 — täsmää.
- **Kahvikulttuuri / Cuba Street:** enemmän kahviloita/asukas kuin New
  Yorkissa, italialaiset ja kreikkalaiset toivat kulttuurin 1900-luvun
  alussa (Mt Victoria, Island Bay, Miramar), tuoreempi etiopialaisvaikute,
  flat white "perfected" Wellingtonissa, "coolest little capital"
  (Positively Wellington Tourism, levinnyt mm. Chicago Tribuneen) — täsmää.
- **NZSL-viittoma:** etu-, keski- ja nimetön sormi W-muotoon, kämmen
  eteenpäin, kahdesti heilautus — täsmää sanatarkasti.
- **Ngāti Pōneke:** "The city's central marae, the community supporting it
  and its kapa haka group have the pseudo-tribal name of Ngāti Pōneke" —
  täsmää faktapohjan väitteeseen sanatarkasti (löytyy pääartikkelin
  Toponymy-osiosta, ei vain erillisestä stub-artikkelista).
- **Säätiedot:** Köppen Cfb, ylittää harvoin 26°C / alle 4°C, ennätykset
  31,1°C / −1,9°C, sademäärä n. 1250 mm, kesä–heinäkuu sateisimmat,
  2 055 aurinkotuntia/vuosi — kaikki täsmää sanatarkasti.
- **Geografia:** 500 km² alueellisia puistoja (Ōtari-Wilton's Bush
  mainittuna nimeltä), Hutt Valleyn teollisuus (elintarvike, konepajat,
  ajoneuvot, öljynjalostus), Wellingtonin lentokenttä Rongotain kannaksella
  Miramarin niemimaalla — täsmää.
- **Hidas maanjäristys:** joka viides vuosi, ensin mitattu 2003, toistunut
  2008 ja 2013, magnitudin 7 energiamäärä, ei vahinkoa — täsmää.
- **1996-restauroitu hallintorakennus** (Jakso 4): "the largest wooden
  building in the Southern Hemisphere" — täsmää.

---

## KOORDINAATIT (osio 4) — kaikki 10/10 vahvistettu MediaWikin
`prop=coordinates`-rajapinnasta

| Kohde | Faktapohjan luku | Oma haku (API) |
|---|---|---|
| Wellington (keskipiste) | 41,2889°S 174,7772°E | -41,28889°, 174,77722° ✓ |
| Te Papa | 41,2906°S 174,7819°E | -41,2906°, 174,7819° ✓ |
| Parlamenttitalo | 41,2780°S 174,7770°E | -41,278°, 174,777° ✓ |
| Botanic Garden | 41,2829°S 174,7660°E | -41,2829°, 174,766° ✓ |
| Cuba Street | 41,2935°S 174,7756°E | -41,2935°, 174,7756° ✓ |
| Mount Victoria | 41,2961°S 174,7942°E | -41,29611°, 174,79417° ✓ |
| Old St Paul's | 41,2763°S 174,7804°E | -41,27626°, 174,78039° ✓ |
| Zealandia | 41,2944°S 174,7500°E | -41,29444°, 174,75° ✓ |
| Government House (nyk.) | 41,3061°S 174,7811°E | -41,30611°, 174,78108° ✓ |
| Cable Car -alaasema (bonus) | 41,2843°S 174,7746°E | ks. huomio alla |

**Huomio bonuspisteestä:** MediaWikin `prop=coordinates` palauttaa
artikkelille "Wellington Cable Car" oletuksena YLÄASEMAN koordinaatit
(-41,28535°, 174,76783° — Kelburnin pää), koska se on artikkelin
ensimmäinen/ensisijainen `{{coord}}`-tagi. Koostaja on kuitenkin oikein
poiminut ALAASEMAN koordinaatin (Cable Car Lane, Lambton Quay) suoraan
artikkelin leipätekstin omasta `{{coord|41|17|03.3|S|174|46|28.7|E}}`-
tagista, joka muunnettuna on täsmälleen 41,2843°S 174,7746°E — sama luku
kuin faktapohjassa. Tämä on **oikein**, mutta metodologisesti huomionarvoista:
suora API-kysely olisi antanut väärän (yläaseman) koordinaatin tähän
tarkoitukseen. Ei korjaustarvetta, vain kiitos huolellisuudesta.

---

## Yhteenveto korjattavista kohdista

1. **[VAKAVA] H1-nosto:** poista tai muotoile uudelleen ilmaus "Uuden-
   Seelannin kansallismuseo" (sanasta sanaan visan Q5:n oikea vastaus;
   faktapohjan oma osio 7.5 väittää virheellisesti ettei tätä käytetä).
2. **[Kohtalainen] N2-nosto:** harkitse Te Papan nimen merkityksen
   ("aarteiden säilytyspaikkaa") poistamista tai uudelleenmuotoilua —
   lähellä visan omaa selitystekstiä ("aarreaittaa tai kotia").
3. **[Tarkennus] Osio 7.4:** "Taranaki Whānui ki te Upoko o te Ika"
   -artikkeli ON olemassa en-Wikipediassa — käytä sitä pilari 3 -lauseen
   lähteenä, tarkempi kuin pääartikkelin sivumaininnat.
4. **[Huomio] Kohdekartan piste 9** ("Government House", nykyinen 1910)
   on eri rakennus kuin H4-noston toinen Government House (1871–n.1918,
   purettu, Beehiven paikalla) — harkitse kuvatekstin täsmennystä tai
   nostojen välisen yhteyden hyödyntämistä.
5. **[Kielivirhe] L1-nosto:** "mustekit" ei ole vakiintunut suomen sana —
   korjaa esim. "possut ja kärpät".
6. **[Pieni] Sivu A:n johdanto:** täsmennä "maailman eteläisin
   **itsenäisen valtion** pääkaupunki" (sama tarkennus kuin visan oma
   `fact`-kenttä käyttää).

**Ei korjaustarvetta (erityisesti pyydetyt tarkistukset):** Wahine-
onnettomuuden 53 kuolonuhria ja kuvernööri Bowenin muutto toiseen
Government Houseen 1873 vahvistuivat molemmat täysin oikeiksi.

Kaikki muu käytetty aines (koordinaatit 10/10, säätaulukko, nimihistoria,
rakennusvuodet, henkilönimet) sai riippumattoman vahvistuksen eikä sitä
tarvitse pudottaa tai muuttaa.
