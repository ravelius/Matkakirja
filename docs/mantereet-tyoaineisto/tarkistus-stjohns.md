# St. John'sin faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä
faktapohjan omiin sitaatteihin luotettu. Kiistanalaiset väitteet
haettiin `grep -o -F` -täsmähaulla sanatarkkoina merkkijonoina
(78 tarkistettua väitettä, ajolista
`<scratchpad>/winnipeg-stjohns/tarkista.sh`). Koordinaatit luettiin
artikkelien omista `{{coord}}`-mallineista ja varmistettiin
geosearchista, ja **kaikki 28 kohdeparin etäisyyttä laskettiin itse
haversinilla**.

Luetut artikkelit: **St. John's, Newfoundland and Labrador**,
**Newfoundland Colony**, **Newfoundland (island)**, **Fort William,
Newfoundland**, **Battle of Signal Hill**, **Signal Hill, St.
John's**, **Cabot Tower (St. John's)**, **The Battery, St. John's**,
**Fort Amherst, St. John's**, **Colonial Building**, **Government
House (Newfoundland and Labrador)**, **Basilica of St. John the
Baptist**, **Cathedral of St. John the Baptist (St. John's)**,
**National War Memorial (Newfoundland)**, **Water Street (St.
John's)**, **Great Fire of 1892**, **Great Fire of 1846**, **Royal
St. John's Regatta**, **Quidi Vidi Lake**, **Grand Banks of
Newfoundland**, **Collapse of the Atlantic northwest cod fishery**,
**Heart's Content Cable Station**, **Transatlantic telegraph cable**,
**Guglielmo Marconi**, **Transatlantic flight of Alcock and Brown**,
**Newfoundland Time Zone**, **Cape Spear**, **Pippy Park**, **Bowring
Park (St. John's)**, **Bannerman Park**, **Murray Premises**, **The
Rooms**, **Georgestown, St. John's**, **St. John's International
Airport**.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–G ratkaisut tehdään.** Asiavirheitä ei löytynyt. Viisi kohtaa on
Wikipedian sisäisiä ristiriitoja, yksi on lähteen varaus, jota ei saa
pyöristää pois, ja yksi on aiherajaus.

---

## A. RISTIRIITA — milloin Newfoundlandista tuli kruununsiirtomaa

**Lähde 1 ("Newfoundland Colony", johdanto), sanatarkasti:**
*"Newfoundland was made a Crown colony in 1824 and a dominion in
1907."*

**Lähde 2 ("Newfoundland Colony", History), sanatarkasti:**
*"It became an official Crown colony in 1825, and Thomas John
Cochrane, an officer of the Royal Navy, was appointed as its first
governor."*

**Ratkaisu:** ero on vuosi, ja lähde antaa molemmat itse.
Kaupunkilehti **ei käytä kumpaakaan vuosilukua**: se sanoo vain, että
**Newfoundland oli 1873 itsehallinnollinen brittiläinen siirtomaa**.
Tämä on riittävä ja kiistaton, ja se pitää 1873-kehyksen selkeänä.
Ratkaisu kirjataan lohkokommenttiin.

---

## B. RISTIRIITA — itsehallinto 1854 vai 1855

**Lähde 1 ("Newfoundland Colony", History), sanatarkasti:**
*"The colony was granted self-governing status in 1854. Philip
Francis Little was the first premier of Newfoundland between 1855 and
1858."*

**Lähde 2 ("Colonial Building", Historic events), sanatarkasti:**
*"It was the site where responsible government was given Newfoundland
in 1855."*

**Ratkaisu:** kyse on todennäköisesti samasta uudistuksesta eri
päivämäärillä (myöntäminen vs. voimaantulo). Nähtävyysjuttu käyttää
**Colonial Buildingin oman artikkelin muotoa** ("talossa Newfoundland
sai parlamentaarisen hallinnon 1855"), koska juttu kertoo juuri siitä
talosta, ja **vuoden 1854 lukua ei esitetä samassa jutussa**.
Kumpaakaan ei väitetä toisen vastaiseksi.

---

## C. RISTIRIITA — Christopher Martinin miehet ja vastustajat 1673

**Lähde 1 ("St. John's", Early history), sanatarkasti:**
*"With 23 men, Martin beat off an attack by three Dutch warships."*

**Lähde 2 ("Fort William, Newfoundland", Second and Third
Anglo-Dutch War), sanatarkasti:**
*"During the Third Anglo-Dutch War, in 1673 Martin, with fewer than
thirty men, successfully defended the harbour from a second Dutch
attack and a separate raid by four pirate vessels."*

Luvut eivät ole keskenään mahdottomia (23 on "alle kolmekymmentä"),
mutta **vastustajat ovat eri**: kolme sotalaivaa vastaan
hollantilaishyökkäys **ja** neljän merirosvoaluksen erillinen retki.

**Ratkaisu:** lehti käyttää **pääartikkelin täsmällistä lukua
(23 miestä)** ja kertoo torjutuksi **hollantilaishyökkäyksen**;
merirosvoretkeä ei mainita, koska vain toinen lähde tuntee sen.
Kuusi tykkiä *Elias Andrews* -aluksesta ja maavalli Chain Rockin
lähellä ovat molemmissa lähteissä yhtäpitävät.

---

## D. RISTIRIITA — turskakannan romahdus 1992 vai 1993

**Lähde 1 ("Collapse of the Atlantic northwest cod fishery",
leipäteksti), sanatarkasti:**
*"In 1992, Northern cod populations fell to 1% of historic levels, in
large part from decades of overfishing."*

**Lähde 2 (saman artikkelin kuvateksti), sanatarkasti:**
*"The Atlantic fishery abruptly collapsed in 1993 after overfishing
from the late 1950s and an earlier partial collapse in the 1970s."*

**Lähde 3 ("Grand Banks of Newfoundland", johdanto), sanatarkasti:**
*"leading to the closure of the Canadian Grand Banks fishery from
1992 to 2024."*

**Ratkaisu:** kaksi kolmesta lähteestä sanoo **1992**, ja se on myös
pyyntikiellon vuosi. Lehti käyttää vuotta **1992** ja kertoo
kiellon kestäneen **vuoteen 2024**, kuten Grand Banks -artikkeli
sanoo. Kuvatekstin vuotta 1993 ei käytetä.

**LÄHTEEN VARAUS, JOTA EI PYÖRISTETÄ:** sama artikkeli sanoo, että
hallitus julisti aluksi **kaksivuotisen** pyyntikiellon
(*"the government announced a two-year moratorium on cod fi[shing]"*).
Lehti ei siis sano, että kalastus lopetettiin kertaheitolla
lopullisesti — se sanoo, että kielto julistettiin 1992 ja että
kalastus pysyi suljettuna vuoteen 2024.

---

## E. RISTIRIITA — Cabot Towerin rakennusvuosi

**Lähde 1 ("St. John's", National Historic Sites), sanatarkasti:**
*"It is the location of Cabot Tower which was built in 1897 to
commemorate the 400th anniversary of John Cabot's arrival in
Newfoundland, and Queen Victoria's Diamond Jubilee."*

**Lähde 2 ("Cabot Tower (St. John's)", johdanto ja History),
sanatarkasti:**
*"Construction of the tower began in 1898"* ja *"Begun in 1898 … Cabot
Tower was completed in 1900"*.

**Ratkaisu:** käytetään **kohteen omaa artikkelia**: rakentaminen
alkoi **1898** ja torni valmistui **1900**. Vuosi 1897 on
todennäköisesti muistovuosi (Cabotin 400-vuotispäivä ja Viktorian
timanttijuhla) eikä rakennusvuosi, ja ero kirjataan
maakartat.js:n lohkokommenttiin. Ennakkotapaus: tarkempi
kohdeartikkeli voittaa yleisemmän (v925/v932/v937).

---

## F. LINJAUS — Marconi ei ole kohdekartan aihe

Marconin vuoden 1901 vastaanotto tapahtui **Cabot Towerin
läheisyydessä Signal Hillillä**, ja se on **teemasivun toisen noston
koko aihe**. Kohdekartan Cabot Tower -juttu **jättää Marconin
tarkoituksella pois** ja kertoo tornin oman tarinan:
muistorakennushankkeen vastustus vuoden 1892 palon ja vuoden 1894
pankkiromahduksen jälkeen, "silkkihattu"-lainaus ja se, että kukkula
oli **lippusignaaliasema jo noin vuodesta 1704 aina vuoteen 1958**.

Sama ratkaisu tehtiin Tangerissa v1670: Pyhän Andreaksen kirkon
jutusta jätettiin pois Matissen maalaus, joka oli kansisivun oma
aihe. Ratkaisu kirjataan maakartat.js:n lohkokommenttiin.

Samasta syystä **vuoden 1762 Signal Hillin taistelua ei kerrota
kohdekartan jutuissa**: se kuuluu kansisivun nostoon S2, joka
kertoo satamansuun puolustuksesta.

---

## G. AIHERAJAUS — mikä kuuluu maalehdelle, karttanostolle tai
## Halifaxin lehdelle

- **L'Anse aux Meadows ja viikingit** ovat sekä Kanadan maalehden
  (`maa-kategoriat.js`, CAN, *Historia*) että karttanoston
  (`maastokohteet-can.js`) aihe. Tämä lehti **ei kerro niistä**;
  paikka mainitaan vain matkaoppaassa yhtenä lauseena saaren
  pohjoiskärjen kohteena. Pelin oma visa
  (`northamerica-questions.js`, `stjohns`) kysyy L'Anse aux
  Meadowsista, ja **vastaus löytyy maalehdestä**, joten visa ei jää
  katteettomaksi.
- **Halifaxin lehden teemasivu** ("Satama, sumu ja myrskyt") kertoo
  jo luonnonsatamasta, Golfvirrasta, hurrikaaneista ja graniitista.
  St. John'sin teemasivu on siksi **tiedesivu** (kaapeli, Marconi,
  lento, aikavyöhyke), ei toinen sääsivu. Sumu ja tuuli kerrotaan
  siellä vain siltä osin kuin ne ovat viestiyhteyksien este, ja
  loput sääasiat ovat matkaoppaan sääjaksossa.
- **Teemasivun minitehtävä** kysyy, mistä Marconin viesti lähetettiin
  (Poldhu, Cornwall). Se **ei toista yhtäkään viidestä
  visakysymyksestä** (Newfoundlandin saari, Grand Banksin turska
  kahdesti, kirkkaanväriset talot, L'Anse aux Meadows), ja vastaus
  on **samalla sivulla** kuten resepti vaatii.

---

## H. KOORDINAATIT JA KOHDEVÄLIT (laskettu itse)

Koordinaatit luettiin artikkelien omista `{{coord}}`-mallineista
(asteminuuttisekunnit muunnettiin desimaaleiksi) ja varmistettiin
`list=geosearch`-rajapinnasta 7.9.2026. Kaikki **28 kohdeparia**
laskettiin haversinilla (`<scratchpad>/winnipeg-stjohns/valit.mjs`,
maapallon säde 6 371 008,8 m).

| # | Kohde | lat | lon | lähde |
| --- | --- | --- | --- | --- |
| 1 | Colonial Building | 47.570928 | −52.706789 | 47°34′15,34″N 52°42′24,44″W |
| 2 | Fort William | 47.570800 | −52.700600 | coord (wikidata) |
| 3 | Cabot Tower | 47.570014 | −52.681772 | 47°34′12,05″N 52°40′54,38″W |
| 4 | The Battery | 47.568892 | −52.690414 | 47°34′08,01″N 52°41′25,49″W |
| 5 | Basilika | 47.567356 | −52.710100 | 47°34′02,48″N 52°42′36,36″W |
| 6 | Kansallinen sotamuistomerkki | 47.567578 | −52.703797 | 47°34′03,28″N 52°42′13,67″W |
| 7 | Anglikaaninen katedraali | 47.565500 | −52.708200 | coord (desimaali) |
| 8 | Water Street | 47.562581 | −52.708647 | 47°33′45,29″N 52°42′31,13″W |

**Pienin väli 251 m** (basilika – anglikaaninen katedraali),
toiseksi pienin **326 m** (anglikaaninen katedraali – Water Street),
kolmanneksi pienin **403 m** (sotamuistomerkki – anglikaaninen
katedraali). **Suurin väli 2 179 m** (Cabot Tower – Water Street).
**Kaikki 28 väliä ovat yli 200 metriä.**

**Kohteita jäi pois 200 metrin säännöllä:**
- *Government House* (47.572053 / −52.704878) on vain **190 metrin**
  päässä Colonial Buildingista. Kahdesta valittiin Colonial
  Building, koska sillä on 1873-kytkös (siirtomaan lakiasäätävä
  kokous istui siellä). Government House kerrotaan matkaoppaassa.
- *Bannerman Park* (47.570527 / −52.707564) on **75 metrin** päässä
  Colonial Buildingista.
- *The Rooms* (47.566236 / −52.711839) on **180 metrin** päässä
  basilikasta; se kerrotaan matkaoppaan museojaksossa.
- *LSPU Hall* (47.566130 / −52.706491) on **146 metrin** päässä
  anglikaanisesta katedraalista, *Masonic Temple* **57 metrin**,
  *St. John's Court House* **125 metrin** ja *Benevolent Irish
  Society* **100 metrin** päässä lähimmästä valitusta kohteesta.
- *George Street* (47.561736 / −52.710803) on **187 metrin** päässä
  Water Streetistä. George Street kerrotaan matkaoppaassa.

**Kohteita jäi pois myös vesisäännöllä:** *Quidi Vidin järvi*
(47.580833 / −52.688889) olisi ollut hieno kohde regatan takia,
mutta **karttapiste osuisi vesialueelle**, ja
`tools/tarkista-karttapisteet.mjs` hylkää sen (sillat ja majakat
saavat olla vedellä, muut eivät). Regatta kerrotaan siksi
**matkaoppaan urheilujaksossa**, ei kohdekartalla.

**Rajaus** (tools/piirra-kaupunkikartta.mjs, `stjohns`):
pohjoinen 47.5745, etelä 47.5595, länsi −52.7160, itä −52.6770 —
noin **2,9 × 1,7 km**. Ruutuun mahtuvat keskusta, satama, Narrows
ja Signal Hill. `meri: true`, koska Atlantti ja satama ovat
OSM:ssä rantaviivan takana.

---

## I. TÄSMÄHAKUJEN TULOS (78 väitettä)

Kaikki tarkistetut väitteet löytyivät sanatarkkoina merkkijonoina.
Poimintoja:

| Väite | Artikkeli, osio | Tulos |
| --- | --- | --- |
| "is the easternmost city in North America" | St. John's, johdanto | OK |
| São João Pedro Reinelin kartalla 1519 | St. John's, Early history | OK |
| Rutin kirje "the first known letter sent from North America" | St. John's, Early history | OK |
| "On 5 August 1583" Gilbertin julistus | St. John's, Early history | OK |
| "Sometime after 1630 … established as a permanent community" | St. John's, Early history | OK |
| de Ruyter "in June 1665" | St. John's, Early history | OK |
| "With 23 men, Martin beat off an attack by three Dutch warships" | St. John's, Early history | OK |
| "was fought in 1762, in St. John's" | St. John's, Early history | OK |
| "destroyed by major fires in 1816, 1817, 1819, 1846 and 1892" | St. John's, Fires | OK |
| "8 July 1892 atop Carter's Hill on Freshwater Road" | St. John's, Fires | OK |
| "when a glue pot boiled over" | St. John's, Fires | OK |
| "Bright colours were introduced in the 1970s when coal was no longer used" | St. John's, Downtown architecture | OK |
| "the foggiest (124 days)" ja "windiest (24.3 km/h average speed)" | St. John's, Climate | OK |
| "annual average 1538.9 mm of precipitation" | St. John's, Climate | OK |
| lunta "approximately 242.8 cm" talvikaudessa | St. John's, Climate | OK |
| hätätila ja 76 cm 17.1.2020 | St. John's, Climate | OK |
| Marconi "on 12 December 1901" Poldhusta | St. John's, Modern history | OK |
| Alcock ja Brown "departing from Lester's Field" | St. John's, Modern history | OK |
| Cabot Tower "began in 1898" ja "completed in 1900" | Cabot Tower | OK |
| "silk hat … can't afford to buy a pair of boots" | Cabot Tower, History | OK |
| "used for flag signalling until 1958" | Cabot Tower, History | OK |
| Colonial Building "January 28, 1850 to July 28, 1959" | Colonial Building | OK |
| Pindikowski "one-month reduction in his sentence" | Colonial Building, Construction | OK |
| kalkkikivi "Little Island, Cork" ja hinta £18 335 | Colonial Building, Construction | OK |
| hallituspuolue istuu vasemmalla "where the heaters were located" | Colonial Building, Construction | OK |
| basilika vihittiin "9 September 1855", suurin kirkko Pohjois-Amerikassa | Basilica | OK |
| basilika "one of the few buildings … to survive" vuoden 1892 palon | Basilica | OK |
| "oriented on a solstitial axis" ja "400,000 bricks from Hamburg" | Basilica | OK |
| anglikaanisen kirkkosali "served as the entire cathedral church for 35 years" | Cathedral | OK |
| "complete destruction of all but two" lasimaalauksesta | Cathedral, History | OK |
| "still lacks the spire" | Cathedral, History | OK |
| Fort William "Built in 1698", purettu 1881, NHS 1952 | Fort William | OK |
| ketju "since as early as 1770", kivien väli "174 metres" | The Battery | OK |
| lumivyöry tammikuussa 2020 | The Battery, Avalanches | OK |
| muistomerkki paljastettiin "1 July 1924", 20 000 ihmistä | National War Memorial | OK |
| "out of 800 men, only 68 reported for roll call" | National War Memorial, Background | OK |
| "About 1,700 Newfoundlanders died in the war; 820 have no known grave" | National War Memorial | OK |
| Water Street Historic District NHS 1987 | Water Street | OK |
| regatta "documented proof of 1816 boat races", elokuun 1. keskiviikko | Royal St. John's Regatta | OK |
| miesten 2,450 km ja naisten 1,225 km; ensimmäinen naisten kilpailu 1856 | Royal St. John's Regatta | OK |
| kaapeli maihin "July 27, 1866", tuoja Great Eastern, asema suljettiin 1965 | Heart's Content Cable Station | OK |
| aikavyöhyke UTC−03:30, ainoa puolen tunnin vyöhyke Amerikoissa | Newfoundland Time Zone | OK |
| Standard Time Act 1935; vuoden 1963 yritys peruttiin | Newfoundland Time Zone | OK |
| "fell to 1% of historic levels" (1992) | Collapse of the … cod fishery | OK |
| Grand Banks suljettu "from 1992 to 2024" | Grand Banks of Newfoundland | OK |
| "rejected confederation with Canada in the period between 1864 and 1869" | Newfoundland Colony | OK |
| Signal Hillillä käy "97% of all tourists to St. John's" | St. John's, National Historic Sites | OK |
| Murray Premises "built after the 1846 fire" | St. John's, National Historic Sites | OK |
| Pippy Park "over 1400 ha", Bowring Park lahjoitettu 1911 | St. John's, Parks | OK |
| metropolialue "approximately 239,316"; kaupunki 1888 | St. John's, johdanto | OK |
| helmikuu −4,7 °C, elokuu 16,5 °C; ennätys 33,9 °C 14.8.1876 | St. John's, Climate | OK |

---

## J. MITÄ JÄTETTIIN POIS JA MIKSI

- **Beothuk-kansan häviäminen** on lähteessä ("Newfoundland Colony":
  *"The Beothuk gradually became extinct as a people…"*). Aihe on
  raskas ja se kuuluu koko saaren eikä kaupungin tarinaan; se
  jätetään pois tästä lehdestä eikä sitä kevennetä eikä pyöristetä.
  Kirjattu Fablelle mahdolliseksi maalehden tai karttanoston aiheeksi.
- **Nykypolitiikka:** artikkelin *Crime*-osio, keskustan
  korkeusrajoituskiista ja basilikan omistusjärjestelyt jäävät pois.
  Korkeusrajoitus mainitaan matkaoppaassa vain siltä osin, että
  keskustassa on perintösäännöt.
- **Toinen maailmansota ja Fort Pepperrell** jätetään pois: aihe
  vaatisi sotakehyksen, jota tämä lehti ei kanna. Ensimmäisen
  maailmansodan muistomerkki kerrotaan **muistomerkkinä**, ei
  taisteluna: Beaumont-Hamel mainitaan neutraalisti ja lyhyesti,
  ilman yksityiskohtien korostusta (Raamattu, sisältölinjaus).
- **Säärivi** jätetään pois koko erästä (Fablen ohje 7.9.2026,
  poikkeama 2). Oppaan sääjakso nojaa siksi en-Wikipedian
  Climate-osioon ja sanoo sen ääneen.
