# Winnipegin faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä
faktapohjan omiin sitaatteihin luotettu. Kiistanalaiset väitteet
haettiin `grep -o -F` -täsmähaulla sanatarkkoina merkkijonoina
(55 tarkistettua väitettä, ajolista
`<scratchpad>/winnipeg-stjohns/tarkista.sh`). Kohteiden koordinaatit
haettiin itse (`prop=coordinates` ja `list=geosearch`) ja **kaikki 28
kohdeparin etäisyyttä laskettiin itse haversinilla**.

Luetut artikkelit: **Winnipeg**, **History of Winnipeg**, **Red River
Colony**, **Battle of Seven Oaks**, **Fort Garry**, **Red River
Rebellion**, **Manitoba Act, 1870**, **Treaty 1**, **Louis Riel**,
**The Forks, Winnipeg**, **Winnipeg general strike**, **Manitoba
Legislative Building**, **Golden Boy (Manitoba)**, **Winnipeg
(bear)**, **Harry Colebourn**, **Manitoba Museum**, **Nonsuch (1650
ship)**, **Union Station (Winnipeg)**, **Countess of Dufferin**,
**Winnipeg Railway Museum**, **Exchange District**, **Burton Cummings
Theatre**, **Manitoba Hydro Place**, **Canadian Museum for Human
Rights**, **St. Boniface Cathedral**, **Portage and Main**,
**Winnie-the-Pooh**.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–F ratkaisut tehdään.** Asiavirheitä ei löytynyt. Kolme kohtaa on
Wikipedian sisäisiä ristiriitoja, kaksi on linjauskysymystä ja yksi
on aiherajaus muihin peliteksteihin nähden.

---

## A. RISTIRIITA — pörssikorttelin koko ja viljapörssin vuodet

**Lähde 1 ("Winnipeg", Cityscape), sanatarkasti:**
*"Downtown Winnipeg's Exchange District is named after the area's
original grain exchange, which operated from 1880 to 1913. … The
30-block district received National Historic Site of Canada status in
1997; it includes North America's most extensive collection of early
20th-century terracotta and cut stone architecture…"*

**Lähde 2 ("Exchange District", johdanto ja History), sanatarkasti:**
*"the Exchange District comprises twenty city blocks and
approximately 150 heritage buildings"* ja *"The Exchange District's
name originates from the Winnipeg Grain Exchange … as well as other
commodity exchanges that developed in Winnipeg between 1881–1918"*.

**Ratkaisu:** käytetään **kohteen omaa artikkelia**: kaksikymmentä
korttelia, noin 150 perintörakennusta, hyödykepörssit 1881–1918
(ennakkotapaus: v925/v932/v937, tarkempi lähde voittaa yleisemmän).
**Kansallisen historiallisen kohteen päivä 27. syyskuuta 1997**
tulee samasta artikkelista ja on molemmissa yhtäpitävä. Ero
kirjataan maakartat.js:n lohkokommenttiin; korttelilukua ei
esitetä lehdessä kahtena vaihtoehtona, koska se olisi lukijalle
turhaa kohinaa.

---

## B. RISTIRIITA — ihmisoikeusmuseon avaamispäivä

**Lähde 1 ("Winnipeg", Culture):** *"the museum opened to the public
27 September 2014"*.

**Lähde 2 ("Canadian Museum for Human Rights"):** *"The Museum held
its opening ceremonies on 19 September 2014"* ja *"The museum's
official grand opening on 20 September 2014"*.

**Ratkaisu:** nämä eivät ole keskenään ristiriitaisia vaan eri
tapahtumia: **avajaisseremonia 19.9., viralliset avajaiset 20.9. ja
ovet yleisölle 27.9.2014**. Nähtävyysjuttu kertoo **avajaisseremonian
päivän ja yleisölle avaamisen päivän**, ei kolmea numeroa peräkkäin.

---

## C. RISTIRIITA — kenen kielestä nimi Winnipeg tulee

**Lähde 1 ("Winnipeg", johdanto), sanatarkasti:**
*"the name 'Winnipeg' comes from the Western Cree words for 'muddy
water' – winipīhk."*

**Lähde 2 ("Winnipeg", Etymology), sanatarkasti:**
*"English explorer Henry Kelsey may have been the first European to
see the lake in 1690. He adopted the Cree and Ojibwe name, win-nipi
(also transcribed win-nipiy or ouenpig), meaning 'murky water' or
'muddy water'…"*

Sama artikkeli sanoo siis kahdessa kohdassa eri asian: johdanto
antaa nimen **läntiselle creelle yksin**, etymologiaosio **creelle
ja odžibwelle yhdessä**, ja merkitykseksi joko "mutainen vesi" tai
"samea vesi".

**Ratkaisu:** lehti käyttää **etymologiaosion tarkempaa muotoa** —
nimi on creen ja odžibwen sana, jonka Kelsey omaksui, ja merkitys
annetaan lähteen molemmilla sanoilla ("samea eli mutainen vesi").
Kirjoittaja **ei väitä nimeä yhden kielen omaksi**. Ratkaisu
kirjataan kulttuuri-kategoriat.js:n lohkokommenttiin.

---

## D. RISTIRIITA — Winnipegin väkiluku

**Lähde ("Winnipeg", johdanto), sanatarkasti:** *"As of 2021,
Winnipeg had a city population of 749,607 and a metropolitan
population of 834,678"* ja heti perään *"In 2025, Winnipeg surpassed
850,000 residents, the city's estimated population reaching
850,260."*

Sama artikkeli (Demographics) sanoo kuitenkin: *"Statistics Canada's
estimate of the Winnipeg CMA population as of 1 July 2020 is
850,056"* — eli **sama luokkaa oleva luku 850 000 esiintyy kerran
kaupungin väkilukuna 2025 ja kerran metropolialueen väkilukuna
2020**. Jompikumpi on Wikipedian oma sekaannus.

**Ratkaisu:** lehti käyttää **vain vuoden 2021 väestönlaskennan
lukuja** (kaupunki 749 607, metropolialue 834 678), jotka ovat
yksiselitteiset ja lähteen omassa laskentataulukossa. **850 000:n
arviota ei käytetä lainkaan.** Ratkaisu kirjataan
kulttuuri-kategoriat.js:n lohkokommenttiin.

---

## E. LINJAUS — mitä yleislakosta 1919 kerrotaan

Lähde ("Winnipeg", Modern history) kertoo, että lakko päättyi
21. kesäkuuta 1919 mellakkalain lukemiseen, ratsupoliisit
hyökkäsivät lakkolaisjoukkoon, **kaksi lakkolaista kuoli ja ainakin
kolmekymmentä loukkaantui**, ja päivä tunnetaan nimellä *Bloody
Saturday*.

**Ratkaisu:** tapahtuma kerrotaan **neutraalina historiana ilman
yksityiskohtien korostusta** (Raamattu, sisältölinjaus). Se
kerrotaan **kohdekartan Burton Cummings -teatterin jutussa**, koska
juuri siinä talossa pidettiin vuoden 1918 kokous, joka johti lakkoon
— ei lehden nostona, jotta lehti ei kanna kahta väkivaltaista
tapahtumaa. Nykypolitiikkaa ei kirjoiteta: J. S. Woodsworthin
myöhempi puolue mainitaan vain nimeltä ja vuosiluvuitta.

---

## F. AIHERAJAUS — mikä kuuluu maalehdelle eikä tälle lehdelle

`js/packs/maa-kategoriat.js` (CAN, osio *Alkuperäiskansat*) kertoo
noston "Kansa, joka syntyi turkiskaupan varrella": **métis-kansan
synty ja Punaisenjoen kärryt**. Kanadan maalehti kertoo myös
Hudson's Bay Companyn peruskirjan 1670 ja Rupert's Landin sekä
North-West Mounted Policen perustamisen 1873.

**Ratkaisu:** kaupunkilehti **ei kerro métis-kansan synnystä eikä
Punaisenjoen kärrystä** eikä toista HBC:n peruskirjaa. Se kertoo
métis-väestä vain siltä osin kuin se kuuluu kaupungin omaan
tarinaan: **Punaisenjoen kapina 1869–70, Manitoba Act 1870 ja se,
että kaupungin nimen antoi métis-lainsäätäjä James McKay.**
Väestöluvut (Winnipegissä on Kanadan suurin métis-väestö sekä
osuutena että lukumääränä) kuuluvat matkaoppaaseen, eivät nostoon.

Vastaavasti **Nalle Puh on pelin oman visan vastaus**
(`northamerica-questions.js`, `winnipeg`), joten karhun tarina
**kuuluu lehteen** — visan vastauksen on löydyttävä lehden
teksteistä. **Teemasivun minitehtävä kysyy siksi kokonaan muuta**
(auringonpaistetuntien sija), eikä se toista yhtäkään viidestä
visakysymyksestä.

---

## G. TÄSMÄHAKUJEN TULOS (55 väitettä)

Kaikki alla luetellut löytyivät sanatarkkoina merkkijonoina
alkuperäisistä raakateksteistä. Poimintoja:

| Väite | Artikkeli, osio | Tulos |
| --- | --- | --- |
| "On 8 November 1873, Winnipeg was incorporated as a city" | Winnipeg, Early history | OK |
| "Métis legislator and interpreter … James McKay … named the city" | Winnipeg, Early history | OK |
| Fort Rouge 1738, Fort Gibraltar 1809, Fort Garry 1822 | Winnipeg, Early history | OK |
| "A flood destroyed the fort in 1826 and it was not rebuilt until 1835" | Winnipeg, Early history | OK |
| "fought at the Battle of Seven Oaks in 1816" | Winnipeg, Early history | OK |
| Treaty 1 "was signed on 3 August 1871" | Winnipeg, Early history | OK |
| "the January mean average around −16.4 °C" | Winnipeg, Climate | OK |
| "2,353 hours of sunshine per year … second-sunniest city in Canada" | Winnipeg, Climate | OK |
| "317.8 days per year with measurable sunshine" | Winnipeg, Climate | OK |
| "The wind chill has gone down as low as −57.1 °C" | Winnipeg, Climate | OK |
| 42,2 °C "on 11 July 1936" | Winnipeg, Climate | OK |
| "on 12 July 2026 a humidex reading of 48.0 °C was measured" | Winnipeg, Climate | OK |
| "The last spring frost is on average around 23 May" | Winnipeg, Climate | OK |
| "The federal government estimated damage at over $26 million" | Winnipeg, Modern history | OK |
| "North America's largest extant mature urban elm forest" | Winnipeg, Geography | OK |
| "By 1911, Winnipeg was Canada's third-largest city" | Winnipeg, Modern history | OK |
| "More than 30,000 workers walked off their jobs in May 1919" | Winnipeg, Modern history | OK |
| Karhun osto 24.8.1914 ja jättö Lontoon eläintarhaan 9.12.1914 | Winnipeg (bear), History | OK |
| "who frequently visited the bear starting from 1924" | Winnipeg (bear), History | OK |
| Kultapoika 1 650 kg, 77 m, Gardet 1915, valimo pommitettiin | Golden Boy (Manitoba) | OK |
| "making two trips across the Mediterranean and five transatlantic crossings" | Golden Boy (Manitoba), Delivery | OK |
| "Of the 67 submissions" | Manitoba Legislative Building, History | OK |
| Ensimmäinen lakitalo "until its destruction by fire in 1873" | Manitoba Legislative Building, History | OK |
| "Kelly stealing many of the materials to build his own house" | Manitoba Legislative Building, Construction | OK |
| Union Station 1911, arkkitehdit Warren and Wetmore | Union Station (Winnipeg), infobox | OK |
| "the first steam locomotive to operate in the Canadian prairie provinces" | Countess of Dufferin | OK |
| "arriving October 9, 1877" | Countess of Dufferin, History | OK |
| Nonsuchin jäljennös "placed on permanent display in 1973" | Nonsuch (1650 ship), Replica | OK |
| HBC:n kokoelmalahjoitus 1994 | Manitoba Museum | OK |
| Walker Theatre "grand opening on 18 February 1907", 1 798 paikkaa | Burton Cummings Theatre, History | OK |
| Vuoden 1918 kokous, joka johti yleislakkoon | Burton Cummings Theatre, History | OK |
| "LEED Platinum certification in May 2012" | Manitoba Hydro Place | OK |
| "100 submissions from 21 countries" | Canadian Museum for Human Rights | OK |
| Runnymeden kivi ja peruskivi 3.7.2010; 1 669 lasia | Canadian Museum for Human Rights | OK |
| Saint-Bonifacen palo 22.7.1968 ja uusi kirkko 1972 julkisivun taakse | St. Boniface Cathedral | OK |

Kaksi hakua palautti aluksi "ei löydy" pelkästään siksi, että
hakumerkkijonossa oli aksentti (**Métis**) tai rivinvaihto keskellä
lausetta (**turskan kanta 1992**); molemmat varmistettiin uudelleen
löysemmällä haulla ja ne pitävät paikkansa.

---

## H. KOORDINAATIT JA KOHDEVÄLIT (laskettu itse)

Koordinaatit haettiin **prop=coordinates**- ja
**list=geosearch**-rajapinnoista 7.9.2026. Kaikki **28 kohdeparia**
laskettiin haversinilla (`<scratchpad>/winnipeg-stjohns/valit.mjs`,
maapallon säde 6 371 008,8 m).

| # | Kohde | lat | lon |
| --- | --- | --- | --- |
| 1 | Manitoban museo | 49.900000 | −97.136667 |
| 2 | Pörssikortteli (Exchange District) | 49.898500 | −97.140300 |
| 3 | Burton Cummings -teatteri | 49.895833 | −97.143611 |
| 4 | Manitoba Hydro Place | 49.892397 | −97.146400 |
| 5 | Union Station | 49.888889 | −97.134167 |
| 6 | Kanadan ihmisoikeusmuseo | 49.890797 | −97.130997 |
| 7 | Saint-Bonifacen katedraali | 49.889300 | −97.122000 |
| 8 | Manitoban parlamenttitalo | 49.884400 | −97.146900 |

**Pienin väli 309 m** (Manitoban museo – pörssikortteli), toiseksi
pienin **311 m** (Union Station – ihmisoikeusmuseo), kolmanneksi
pienin **380 m** (pörssikortteli – Burton Cummings). **Suurin väli
1 883 m** (Manitoban museo – parlamenttitalo). **Kaikki 28 väliä
ovat yli 200 metriä**, joten kohdekarttaohjeen vähimmäisväli
täyttyy.

**Kohteita jäi pois 200 metrin säännöllä ja aiherajauksella:**
- *Pantages Playhouse Theatre* (49.898900 / −97.137900) on vain
  **149 metrin** päässä Manitoban museosta.
- *Royal Manitoba Theatre Centre* (49.898750 / −97.136417) on
  **112 metrin** päässä Pantagesista.
- *Millennium Library* ja *Canada Life Centre* mahtuisivat ruutuun,
  mutta kahdeksan kohdetta täyttyi ilman niitä.
- **The Forks jätetään pois aiherajauksella:** se on lehden noston
  W1 koko aihe, ja lisäksi matkakirjan valokuvataulussa
  (northamerica-valokuvat.js, winnipeg) on jo The Forks Marketin
  kuva. Kohdekartta ei toista lehden juttuja (New Yorkin sääntö).
- **Esplanade Riel jätetään pois** samasta syystä: se on
  valokuvataulun uusi puoli ennen–nyt-parissa.
- *Upper Fort Garryn portti* Main Streetin ja Broadwayn kulmassa on
  noston W1 loppu, joten se ei ole numeroitu kohde.

**Rajaus** (tools/piirra-kaupunkikartta.mjs, `winnipeg`):
pohjoinen 49.9020, etelä 49.8825, länsi −97.1500, itä −97.1180 —
noin **2,3 × 2,2 km**. Ruutuun mahtuvat kaikki kahdeksan kohdetta,
Punaisen- ja Assiniboinejoen yhtymä sekä Saint-Bonifacen puoli.

---

## I. MITÄ JÄTETTIIN POIS JA MIKSI

- **Nykypolitiikka:** artikkelin *Crime*-osio, ihmisoikeusmuseon
  avajaisiin liittyneet mielenosoitukset ja niiden aihepiiri sekä
  Manitoban kielikiista 1890 (*Manitoba Schools Question*) jäävät
  pois. Vuoden 1890 päätös mainitaan artikkelissa yhdellä
  virkkeellä, mutta se on nykyäänkin elävä poliittinen kiista, eikä
  lehti ota siihen kantaa.
- **If Day 1942** (natsimiehityksen lavastus sotalainakampanjassa)
  on lähteessä, mutta se jätetään pois: aihe vaatisi sotakehyksen,
  jota tämä lehti ei kanna.
- **Sisäoppilaitokset** ovat maalehden aihe (CAN,
  *Alkuperäiskansat*), eikä niitä toisteta.
- **Säärivi** jätetään pois koko erästä (Fablen ohje 7.9.2026,
  poikkeama 2). Oppaan sääjakso nojaa siksi en-Wikipedian
  Climate-osioon ja sanoo sen ääneen.
