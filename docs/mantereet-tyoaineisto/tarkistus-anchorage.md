# Anchoragen faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä faktapohjan
omiin sitaatteihin luotettu. Kiistanalaiset väitteet haettiin
`grep -o` -täsmähaulla sanatarkkoina merkkijonoina. Koordinaatit
haettiin itse (`list=geosearch`) ja kaikki 28 kohdeparin etäisyyttä
laskettiin itse haversinilla.

Luetut artikkelit: **Anchorage, Alaska**, **1964 Alaska earthquake**,
**Ship Creek (Alaska)**, **Bears in Anchorage**, **Chugach State Park**,
**Flattop Mountain (Anchorage, Alaska)**, **Climate of Anchorage**,
**Anchorage Depot**, **Alaska Engineering Commission Cottage No. 23**,
**Wendler Building**, **Alaska Center for the Performing Arts**,
**Anchorage Museum**, **Anchorage Memorial Park**,
**Oscar Anderson House Museum**, **Delaney Park Strip**,
**Alaska Native Heritage Center**, **Fur Rendezvous Festival**,
**Alaska Purchase**, **Alaska Railroad**, **Port of Alaska**.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–F ratkaisut tehdään.** Yksi kohta on suoranainen virhe pääartikkelissa
ja se on korjattava; kaksi on lähteiden sisäisiä ristiriitoja, yksi on
epätarkkuus, jota ei saa pyöristää, ja kaksi ovat linjauskysymyksiä.

---

## A. VIRHE PÄÄARTIKKELISSA — vuoden 1964 uhriluku

**Lähde 1 ("Anchorage, Alaska", History), sanatarkasti:**
*"killing 115 people and causing $116 million in damages"*

**Lähde 2 ("1964 Alaska earthquake", Death toll), sanatarkasti:**
*"139 people are believed to have died: Fifteen died as a result of the
earthquake itself and another 124 died from the subsequent tsunamis"*

**Lähde 2 lisäksi (Anchorage area), sanatarkasti:**
*"Anchorage was not hit by tsunamis"*

**Ratkaisu:** pääartikkelin lukua **115 ei käytetä**. Se lukee
lauseessa, joka väittää järistyksen tappaneen ne Anchoragessa, mutta
tarkempi artikkeli sanoo koko järistyksen kuolonuhrimääräksi 139,
joista vain 15 kuoli itse järistyksessä ja loput 124 tsunameissa —
eikä Anchorageen osunut tsunamia. Luvut eivät voi olla molemmat
totta. **Lehti käyttää tarkempaa artikkelia ja sanoo asian
lukijalle täsmällisesti:** koko järistyksessä kuoli 139 ihmistä,
heistä 15 itse tärinässä, ja Anchoragessa tuho oli aineellista —
maanvyöryt ja juoksettunut maaperä. Ratkaisu kirjataan
lohkokommenttiin. Vahinkosumma **116 miljoonaa dollaria** on
molemmissa lähteissä ja kelpaa.

---

## B. RISTIRIITA — karhujen määrä

**Lähde 1 ("Anchorage, Alaska", Wildlife), sanatarkasti:**
*"Approximately 250 [[American black bear|black bears]] and 60
[[grizzly bear]]s live in the area"*

**Lähde 2 ("Bears in Anchorage", Bear population), sanatarkasti:**
*"between 200 and 300 [[American Black Bear|black bears]]"* ja
*"at least 36 [[grizzly bears]]"* — jälkimmäisestä lähde lisää itse:
*"(That figure, however, is likely an underestimate…)"*

**Ratkaisu:** **ero kirjoitetaan auki.** Nosto sanoo mustakarhuja
olevan arviolta kahdesta kolmeensataa ja harmaakarhujen luvun olevan
epävarma: DNA-näytteistä on tunnistettu vähintään 36, mutta lähde
sanoo itse luvun olevan todennäköisesti aliarvio, ja kaupungin oma
artikkeli puhuu kuudestakymmenestä. Kumpaakaan lukua ei esitetä
varmana. Perustelu kirjataan lohkokommenttiin.

---

## C. RISTIRIITA — Köppenin ilmastoluokka

**Lähde 1 ("Anchorage, Alaska", infolaatikko), sanatarkasti:**
*"custom_data_sec2 = [[Subarctic climate|Dfc]]"*

**Lähde 2 ("Climate of Anchorage", johdanto), sanatarkasti:**
*"has a subarctic climate with the code ''Dsc''"*

**Ratkaisu:** **koodia ei käytetä lainkaan.** Kirjainkoodi ei kerro
pelaajalle mitään, ja se on lähteissä eri. Oppaan sääjakso sanoo
"subarktinen ilmasto, jonka kesät ovat lyhyet ja viileät" — se on
molempien lähteiden yhteinen sisältö.

---

## D. EPÄTARKKUUS — kaupunkikaavan vuosi

**Lähde 1 ("Anchorage, Alaska", History):** kaupunkitontit kaavoitettiin
telttakaupungin eteläpuolelle korkeammalle maalle; sanatarkasti
*"a town site was mapped out on higher ground to the south of the tent
city"*. Kappale kertoo tapahtumat vuoden **1915** yhteydessä (samana
kesänä äänestettiin nimestä).

**Lähde 2 ("Delaney Park Strip", History), sanatarkasti:**
*"established as part of the original Anchorage township plat in 1917"*

**Ratkaisu:** kaavoitusvuotta **ei esitetä yhtenä lukuna**. Lehti
kertoo tapahtumaketjun: telttakaupunki 1915, tontit kaavoitettiin
törmille kieltolakiehdolla, kaupunkioikeudet 23.11.1920.
Delaney Park Stripin oma juttu käyttää oman artikkelinsa vuotta 1917
ja sanoo sen olevan puiston perustamisvuosi kaupunkikaavan osana —
kumpikaan ei siis väitä toista vääräksi. Anchorage Memorial Parkin
oma artikkeli sanoo hautausmaan perustetun **1915** osana samaa
kaavaa; sekin kerrotaan sen omassa jutussa sen omalla vuodella.
Ero mainitaan lohkokommentissa.

---

## E. TARKISTETTU JA VAHVISTETTU — hirvien luvut

**Lähde ("Anchorage, Alaska", Wildlife), sanatarkasti:**
*"in the Anchorage Bowl, there is a summer population of approximately
250 moose, increasing to as many as 1,000 during the winter"* ja
*"over 100 moose killed by cars each year"*.

Molemmat luvut vahvistuivat täsmähaulla. Myös *"Two people were
stomped to death, in 1993 and 1995, in Anchorage"* vahvistui.
**Ratkaisu:** luvut käytetään sellaisinaan. Kuolemantapaukset
mainitaan yhtenä neutraalina lauseena ilman yksityiskohtia
(Kunnioitus-pilari), koska ne ovat se syy, miksi paikalliset
suhtautuvat hirveen vakavasti.

---

## F. LINJAUSKYSYMYKSET

1. **Pääkaupungin siirtoäänestykset 1960–1978 jätetään pois.** Ne ovat
   puoluepolitiikkaa ja alueiden välistä kiistelyä, eivät kulttuuria.
   Lehti sanoo vain sen riidattoman asian, että Juneau on pääkaupunki
   mutta Anchoragessa työskentelee enemmän osavaltion virkamiehiä
   (6 800 vs. 3 800, "Anchorage, Alaska", Economy).
2. **Sotahistoria pidetään talouden osana.** Elmendorf, Fort
   Richardson ja JBER mainitaan työllistäjinä ja kaupungin kasvun
   syynä; kylmän sodan komentokeskusroolia ei käsitellä.
3. **Alaskan kauppa 1867 kerrotaan tapahtumana.** Pilkkanimet
   ("Sewardin hulluus", "Sewardin jääkaappi", "Mursuvenäjä") ovat
   lähteen omia ja kertovat aikalaisten suhtautumisesta; ne kelpaavat.
   Venäläisajan tautien vaikutus alkuperäisväestöön kerrotaan lähteen
   omalla muotoilulla (väestö puolittui kymmenessä vuodessa
   ensimmäisestä laskennasta) ilman yksityiskohtien korostusta.
4. **Dena'inat kerrotaan ensin.** Perustuslain ensimmäinen pilari:
   paikan oma kansa ja sen oma nimi (Dgheyay Kaq', puron nimi
   Dgheyaytnu) tulevat ennen Cookia ja ennen rautatietä.

---

## G. KOORDINAATIT JA VÄLIT — laskettu itse

Koordinaatit haettiin `list=geosearch`-rajapinnasta (keskipiste
61,2170 / −149,8900, säde 3 000 m) ja ristiintarkistettiin
artikkelien `coord`-malleista:

| kohde | artikkelin coord | geosearch |
|-------|------------------|-----------|
| Anchorage Depot | 61°13′18″N 149°53′26″W | 61,22167 / −149,89056 |
| A.E.C. Cottage No. 23 | 61°13′12″N 149°53′40″W | 61,22000 / −149,89444 |
| Wendler Building | 61°13′6″N 149°53′23″W | 61,21833 / −149,88972 |
| Performing Arts | 61.21707 / −149.894393 | 61,21707 / −149,89439 |
| Anchorage Memorial Park | 61°12′54″N 149°52′34″W | 61,21500 / −149,87611 |

**Kaikki täsmäsivät.** Anchorage Museumilla, Oscar Andersonin talolla
ja Delaney Park Stripillä ei ole artikkelissa erillistä
coord-mallia infolaatikon ulkopuolella, joten niille käytetään
geosearchin arvoja.

Kaikki **28 kohdeparin väliä** laskettiin haversinilla. Kuusi
pienintä:

| väli | kohteet |
|------|---------|
| 279 m | Rautatieasema – A.E.C.:n mökki 23 |
| 287 m | Wendlerin talo – Performing Arts |
| 314 m | A.E.C.:n mökki 23 – Wendlerin talo |
| 326 m | A.E.C.:n mökki 23 – Performing Arts |
| 374 m | Wendlerin talo – Anchorage Museum |
| 374 m | Rautatieasema – Wendlerin talo |

**Arvio: kaikki 28 väliä ylittävät kohdekarttaohjeen 200 metrin
vähimmäisvälin.** Anchoragen keskusta on ruutukaava leveine
kortteleineen, joten tässä ei tarvita Fèsin tai Nuukin kaltaista
poikkeusta. `tools/tarkista-karttapisteet.mjs anchorage` vahvistaa
sen koneellisesti ennen committia.

---

## H. TARKISTETUT MUTTA RIIDATTOMAT LUVUT

Nämä haettiin uudelleen ja täsmäsivät faktapohjaan:

- Väkiluku **291 247** (2020), **lähes 40 %** osavaltion väestöstä,
  metropolialue **398 328**, maapinta-ala **1 706 neliömailia**
  ("Anchorage, Alaska", johdanto).
- Järistys: **27.3.1964 klo 17.36**, magnitudi **9,2–9,3**, kesto
  **4 min 38 s**, episentri **78 mailia** Anchoragesta itään,
  Turnagain menetti **75 taloa**, alue on nyt **Earthquake Park**,
  lennonjohtotorni romahti ("1964 Alaska earthquake").
- Cook: **15.5.1778**, HMS Resolution, **kymmenen päivää**, Bligh
  pohjoiselle haaralle, "River Turnagain" matalikolle ajon jälkeen
  ("Anchorage, Alaska", History).
- Alaskan kauppa: **7,2 miljoonaa dollaria**, **noin kaksi senttiä
  eekkeriltä**, 1867 ("Anchorage, Alaska", History; "Alaska Purchase").
- Kulta Turnagain Armilta **1888**; rautatien rakentaminen alkoi
  **1914**, valmis **1923**; kaupunkioikeudet **23.11.1920**
  ("Anchorage, Alaska", History).
- Ship Creek: **maailman ainoa kaupunkialueen kuningaslohijoki**,
  virtaamamittaus vuodesta **1946**, keskivirtaama **262 cfs**
  ("Ship Creek (Alaska)").
- Chugach State Park: **495 204 eekkeriä**, laki allekirjoitettu
  **6.8.1970**, **kolmanneksi suurin osavaltionpuisto**
  ("Chugach State Park"). Flattop **3 510 jalkaa**, **osavaltion
  kiivetyin vuori** ("Flattop Mountain").
- Ilmasto: pisin päivä **19 h 21 min**, lyhin **5 h 28 min**,
  ennätyslämpö **90 °F 4.7.2019**, helmikuun ennätyspakkanen
  **−38 °F**, talven lumisade keskimäärin **1,92 m**
  ("Climate of Anchorage").
- Lentoasema **maailman kolmanneksi vilkkain rahdissa**; satama
  vastaanottaa **95 %** Alaskaan menevästä tavarasta
  ("Anchorage, Alaska", Economy).
- Fur Rendezvous: ensimmäinen **1935**, Vern Johnson, kaupungissa noin
  **3 000** asukasta; sotatauko, jatkui **1946**; Running of the
  Reindeer vuodesta **2008** ("Fur Rendezvous Festival").
- Alaska Native Heritage Center: avattu **1999**, **26 eekkeriä**,
  **11 kulttuuriryhmää**, **kuusi asumusta** Tiulana-järven ympärillä
  ("Alaska Native Heritage Center").
