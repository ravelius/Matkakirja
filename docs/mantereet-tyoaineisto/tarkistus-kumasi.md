# Kumasin faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet ladattiin ja luettiin uudelleen alkuperäisistä tiedostoista
eikä faktapohjan omiin sitaatteihin luotettu. Kiistanalaiset väitteet
haettiin `grep -o` -täsmähaulla sanatarkkoina merkkijonoina.
Koordinaatit haettiin itse, ja **kaikki 28 kohdeparin etäisyyttä
laskettiin itse haversinilla** (skripti scratchpadissa).

Luetut artikkelit: **Kumasi**, **Asante Empire**, **Golden Stool**,
**Okomfo Anokye**, **Osei Kofi Tutu I**, **Anglo-Ashanti wars**,
**Kejetia Market**, **Manhyia Palace**, **Lake Bosumtwi**,
**Owabi Wildlife Sanctuary**, **Kumasi Zoo**, **Prempeh II Jubilee
Museum**, **Centre for National Culture (Kumasi)**, **Asante
Traditional Buildings**, **Rattray Park**, **Armed Forces Museum
(Ghana)**, **Komfo Anokye Teaching Hospital**, **Ramseyer Memorial
Presbyterian Church**, **Baba Yara Stadium**, **Kumawood**,
**Bonwire**, **List of rulers of Asante**, **Adum**, **Bantama**,
**Kwame Nkrumah University of Science and Technology**.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–G ratkaisut tehdään.** Asiavirheitä ei löytynyt. Kolme kohtaa on
Wikipedian sisäisiä ristiriitoja, kaksi lähteen omia varauksia
(`citation needed` / `clarify`), yksi sävylinjaus ja yksi
karttamittaus.

---

## A. RISTIRIITA — milloin Kumasi perustettiin ja milloin siitä
tuli pääkaupunki

**Lähde 1 ("Kumasi", infobox):** `established_date = 1680`.

**Lähde 2 ("Kumasi", Early settlement), sanatarkasti:**
*"Kumasi was founded in the 1680s by Asantehene Osei Kofi Tutu I as
the capital of the Ashanti Empire."*

**Lähde 3 ("Kumasi", Ashanti Empire), sanatarkasti:**
*"The city rose to prominence in 1695, when it became the capital of
the Ashanti Empire due to the activities of its ruler, Osei Tutu."*

**Lähde 4 ("Kumasi", infobox, historical affiliations):**
Ashanti Empire **1701–1901**.

**Lähde 5 ("Asante Empire", infobox):** `date_start = 1701`.

**Ratkaisu:** kirjoittaja ei anna yhtä vuotta. Nosto sanoo, että
kaupunki **perustettiin 1680-luvulla**, että se **nousi
merkittäväksi 1695**, kun siitä tuli Asanten pääkaupunki, ja että
**valtakunnan itsenäisyys luetaan vuodesta 1701**, jolloin Denkyira
kukistettiin Feyiasessa. Kolme vuotta ovat eri asioita eivätkä
keskenään ristiriidassa, kun ne sanotaan auki; ratkaisu kirjataan
lohkokommenttiin.

---

## B. SÄVYLINJAUS — Kumasi 1873 eurooppalaisin silmin

**Lähde ("Kumasi", Ashanti Empire), sanatarkasti tarkistettu:**
- Brackenbury (n. 1873): *"the streets are generally very broad and
  clean, and ornamented with many beautiful banyan-trees affording
  grateful shade from the powerful rays of the sun."*
- F. Boyle (1874): kaupungin hajut *"are never those of sewage"*.
- William Butler: *"a filthier and far more blood-stained collection
  of mud and wattle hovels than any other village in the forest."*

**Ratkaisu:** kaksi ensimmäistä siteerataan; **Butlerin lause
referoidaan mutta ei siteerata sanatarkasti**. Perustelu:
Perustuslain Kunnioitus-pilari kieltää aikakauden halventavan
kielen toistamisen sellaisenaan, mutta pilari 4 (ei kaunistelua)
vaatii kertomaan, että kuvaukset olivat vastakkaisia. Lehti sanoo
siis, että samasta kaupungista kirjoitettiin samaan aikaan sekä
ylistäviä että halveksivia kuvauksia, ja antaa numeroituna vain
myönteiset sitaatit lähteineen. **Tämä on tietoinen valinta ja
kirjataan lohkokommenttiin.**

---

## C. RISTIRIITA — Kumasin väkiluku Asanten aikana

**Lähde ("Kumasi", Ashanti Empire), sanatarkasti:**
*"In the early 19th century, Ashanti sources estimated a populace of
100,000, while European sources gave a figure around 12–15,000.
According to historian Ivor Wilks, the city may have had a
population of 40,000 in the 1860s."*

**Täsmähaut:** `populace of 100,000` ✔, `12–15,000` ✔,
`population of 40,000 in the 1860s` ✔.

**Ratkaisu:** **kaikki kolme lukua kerrotaan lähteineen**, eikä
yhtä valita. Ero on itsessään kiinnostava tieto (kuka laski ja
kenen puolesta). Sama ratkaisu kuin Lagosin väkilukukiistassa.

---

## D. LÄHTEEN OMA VARAUS — Okomfo Anokyen miekka ja tikari

**Lähde ("Okomfo Anokye"), sanatarkasti:**
*"Okomfo Anokye is said to have commanded down a golden stool named
'Sika Dwa Kofi' from the sky during a durbar in the Ashanti empire,
This stool is said to have fallen on the then King of the Ashante
Osei Tutu I."*
*"It is believed he planted an Unremovable sword in the grounds in
Kumasi where to this day none has been able to remove it, this sword
is located in the Komfo Anokye teaching hospital."*

**Erillinen väite samassa artikkelissa on merkitty lähteettömäksi:**
*"Anokye is also said to have placed a dagger in the middle of the
Ashanti region, which the Europeans have not been able to take out
with any type of technology for over 500 years.{{citation needed …}}"*
(`grep -c "citation needed"` = 1 osuma tässä artikkelissa.)

**Ratkaisu:** miekka kerrotaan **perimätietona lähteen omalla
varauksella** ("kerrotaan", "uskotaan") kohdekartan
sairaalajutussa; **eurooppalaisia ja tekniikkaa koskevaa
tikariväitettä ei kerrota lainkaan**, koska artikkeli itse merkitsee
sen lähteettömäksi. Kultajakkaran taivaasta laskeutuminen kerrotaan
niin ikään perimätietona ("sanotaan"), ei tapahtumana.

---

## E. TARKISTETUT LUVUT (ei huomautettavaa)

Kaikki alla olevat haettiin sanatarkkoina merkkijonoina:

| Väite | Lähde | Täsmähaku |
| --- | --- | --- |
| Kultajakkaran täysi nimi Sika Dwa Kofi, "perjantaina syntynyt" | Golden Stool | ✔ |
| Jakkara ei saa koskaan koskettaa maata | Golden Stool | ✔ |
| Istuin 46 cm korkea, alusta 61 × 30 cm | Golden Stool | ✔ |
| Anokye muutti liiton "kansalliseksi" 1695 | Okomfo Anokye | ✔ |
| Feyiasen taistelu 1701 | Asante Empire | ✔ |
| Wolseley nimitettiin 13.8.1873 | Anglo-Ashanti wars | ✔ |
| 237 siltaa | Anglo-Ashanti wars | ✔ |
| Amoaful 31.1.1874, britit Kumasissa 4.2.1874 | Anglo-Ashanti wars | ✔ |
| Fomena 7/1874, 50 000 unssia kultaa | Anglo-Ashanti wars | ✔ |
| Kejetia: yli 8 000 myymälää, 50 000 kävijää, 20 000 myyjää | Kejetia Market | ✔ |
| Kejetia perustettu 1924 | Kejetia Market | ✔ |
| Bosumtwe-kraatteri 1,07 miljoonaa vuotta | Lake Bosumtwi | ✔ |
| Owabi: 161 lintulajia, Ramsar 22.2.1988, Ghanan ainoa sisämaakohde | Owabi | ✔ |
| Fry ja Drew laativat ensimmäisen kaavan 1945 | Kumasi | ✔ |
| Kumawoodin budjetti 6 860–11 440 dollaria | Kumasi | ✔ |
| Linnake 1896 raunioaineksesta, korvaava 1897, museo 1953 | Armed Forces Museum | ✔ |
| Baba Yara 40 528 paikkaa | Baba Yara Stadium | ✔ |
| Rattrayn puisto vihittiin 20.6.2015 | Rattray Park | ✔ |

---

## F. LINJAUS — orjakauppa Asanten taloudessa

**Lähde ("Asante Empire", johdanto), sanatarkasti:**
*"The economy of the Asante Empire was mainly based on the trade of
gold and agricultural exports as well as slave trading, craft work
and trade with markets further north."*

**Ratkaisu:** mainitaan **kerran, neutraalisti ja ilman
yksityiskohtia** siinä nostossa, jossa Feyiasen voitto avaa
rannikkokaupan (kulta, maataloustuotteet, orjakauppa,
pohjoisen karavaanikauppa). Pois jättäminen olisi pilarin 4
vastaista kaunistelua; korostaminen taas rikkoisi
Kunnioitus-pilaria. Sama ratkaisu kuin Sansibarin ja Lagosin
lehdissä.

---

## G. KARTTAMITTAUS — kahdeksan kohdetta ja 28 väliä

Koordinaatit (7.9.2026): artikkelin oma `{{coord}}` ensisijaisena,
Wikidatan `P625` silloin kun artikkelissa ei ole koordinaattia.

| Kohde | lat | lon | lähde |
| --- | --- | --- | --- |
| Prempeh II:n museo / kulttuurikeskus | 6.700639 | −1.629194 | Wikidata |
| Kumasin eläintarha | 6.701000 | −1.626000 | artikkeli |
| Kejetian tori | 6.698639 | −1.619139 | artikkeli |
| Komfo Anokyen sairaala | 6.697479 | −1.631690 | artikkeli |
| Kumasin linnake | 6.691367 | −1.624872 | artikkeli |
| Ramseyerin muistokirkko | 6.689400 | −1.621600 | Wikidata |
| Rattrayn puisto | 6.681781 | −1.626117 | Wikidata |
| Baba Yaran stadion | 6.682681 | −1.605111 | artikkeli |

**Mittaustulos:** 28 väliä, **pienin 355 metriä** (Prempeh II:n
museo – eläintarha). Muut alle 500 metrin välit: 422 m (linnake –
Ramseyerin kirkko) ja 447 m (museo – sairaala). **Kaikki ylittävät
200 metrin vähimmäisvälin.** Kohteiden ala on 2,14 × 2,94 km.

**Kolme kohdetta pudotettiin:**
1. **Manhyian palatsi** (6.70348 / −1.61579) — **aihesyy**: Ghanan
   maalehden nosto ja `AFRICA_FACTS`-sähkeen aihe. Mahtuisi
   ruutuun.
2. **Kansallinen kulttuurikeskus erillisenä kohteena**
   (6.700639 / −1.629194) — se on **sama piste** kuin Prempeh II:n
   museo, joka sijaitsee sen alueella. Yhdistetty yhdeksi kohteeksi.
3. **Wesleyn metodistikatedraali** (6.693611 / −1.623333) ja
   **St Peterin katedraalibasilika** (6.695337 / −1.618027) —
   **lähdesyy**: molempien en-Wikipedia-artikkelit ovat yhden tai
   kahden virkkeen tynkiä, joista ei saa kirjoitettua kahden
   kappaleen juttua ilman arvailua.

**Kohdekartta ei toista lehden juttuja.** Lähin kosketuskohta on
Komfo Anokyen sairaala: **lehden nosto kertoo kultajakkaran synnystä
ja Asanten liitosta**, kartan juttu **miekasta ja sairaalasta**.
Toinen on Ramseyerin kirkko: **lehden 1873-nosto ei mainitse
vangittuja lähetyssaarnaajia lainkaan**, jotta kirkon juttu voi
kertoa heistä. Kolmas on Kumasin linnake: **vuoden 1900 sota on
GHA-skandaalin aihe**, ja kartan juttu kertoo siitä vain
rakennuksen historiana yhdessä kappaleessa.

---

## H. PIENET HUOMIOT

1. **Järven nimen kirjoitusasu vaihtelee lähteessä itsessään:**
   artikkelin otsikko on *Lake Bosumtwi*, infoboksin nimi
   *Lake Bosumtwi*, leipäteksti *Lake Bosomtwe*, ja artikkelin
   ulkoinen linkki huomauttaa, että **"Bosomtwe" on Kumasin
   yliopiston mukaan oikea kirjoitusasu**. Suomeksi käytetään
   muotoa **Bosumtwe** ja mainitaan, että asu vaihtelee.
2. **Puistojen kunto:** artikkeli sanoo suoraan, että useimpien
   puistojen kunto on heikko ja eläintarha kaipaa korjausta.
   Matkaoppaassa tätä ei kaunistella, mutta sitä ei myöskään
   korosteta — puistokaava kerrotaan historiana ja nykytila
   yhdellä lauseella.
3. **Kumasi Fort -haku ohjautuu Kumasi-artikkeliin**; linnakkeen
   omat tiedot ovat artikkelissa **"Armed Forces Museum (Ghana)"**.
4. **Kumasin väkiluku 443 981 (2021) koskee kaupunkia**, ei
   metropolialuetta (3 490 030); artikkeli sanoo tämän erikseen
   `historical population` -laatikon alaviitteessä. Lehti käyttää
   molempia ja kertoo eron.
