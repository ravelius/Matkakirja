# Kapkaupungin faktapohjan tarkistus

Tarkistettu **6.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä
faktapohjan omiin sitaatteihin luotettu. Kiistanalaiset väitteet
haettiin `grep -o` -täsmähaulla sanatarkkoina merkkijonoina, jotta
lainaus ei voi liukua. Koordinaatit haettiin itse
(`prop=coordinates&redirects=1`) ja kaikki 28 kohdeparin etäisyyttä
laskettiin itse haversinilla.

Luetut artikkelit: **Cape Town**, **History of Cape Town**, **Table
Mountain**, **Bo-Kaap**, **Cape Malays**, **Arabic Afrikaans**,
**Abu Bakr Effendi**, **Castle of Good Hope**, **Company's Garden**,
**Robben Island**, **District Six**, **District Six Museum**,
**Kaapse Klopse**, **Greenmarket Square**, **Slave Lodge, Cape
Town**, **Cape Town City Hall**, **Iziko South African Museum**,
**V&A Waterfront**, **Rust en Vreugd**, Cape Town railway station.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–F ratkaisut tehdään.** Numerot ja päivämäärät täsmäsivät
lähteisiin. Yhtään asiavirhettä ei löytynyt, mutta kuusi kohtaa on
Wikipedian sisäisiä ristiriitoja tai epätarkkuuksia, jotka on
resepti­sääntöjen mukaan joko kirjoitettava auki lukijalle tai
ratkaistava tarkempaan lähteeseen nojaten (ennakkotapaukset v925,
v932, v937).

---

## A. RISTIRIITA — Pöytävuoren khoekhoe-nimi

**Lähde 1 ("Table Mountain", History), sanatarkasti:**
*"These original inhabitants of the area so-called "Khoekhoen",
called Table Mountain Huriǂ'oaxa – "ocean-emerging (mountain)"."*

**Lähde 2 ("History of Cape Town", Portuguese explorers):**
*"The name given to the mountain by the Khoi inhabitants was Hoeri
'kwaggo ("sea mountain")."*

**Ratkaisu:** kirjoittaja käyttää **vain** artikkelin "Table
Mountain" muotoa **Huriǂ'oaxa** ja käännöstä "merestä nouseva
vuori", koska se on vuoren omassa artikkelissa ja tarkemmin
translitteroitu (klikkimerkit mukana). Toista muotoa ei mainita
lehdessä lainkaan — kaksi eri translitteraatiota samasta nimestä ei
ole lukijalle informatiivinen ristiriita vaan kohina. Ratkaisu
kirjataan lohkokommenttiin.

---

## B. RISTIRIITA — kuinka monta kasvilajia Pöytävuorella on

**Lähde 1 ("Table Mountain", Flora), sanatarkasti:**
*"an estimated 2,285 species of plants are confined to Table
Mountain and the Cape Peninsula range"* — ja edelleen: *"Of the
2,285 species on the Peninsula 1,500 occur in the 57 km2 area
comprising Table Mountain and the Back Table, a number at least as
large as all the plant species in the whole of the United Kingdom."*

**Lähde 2 ("Cape Town", Flora and fauna):**
*"an estimated 2,200 species of plants are confined to Table
Mountain – more than exist in the whole of the United Kingdom which
has 1200 plant species and 67 endemic plant species."*

**Ongelma:** luvut eroavat (2 285 / 2 200) ja niiden **rajaus on eri**:
ensimmäinen koskee Pöytävuorta JA koko Kapin niemimaan vuorijonoa,
toinen pelkkää Pöytävuorta. Vertailukohta Yhdistyneeseen
kuningaskuntaan liitetään lähteissä eri lukuun.

**Ratkaisu:** kirjoittaja käyttää **vuoren oman artikkelin lukuja ja
sen omaa rajausta**: 2 285 lajia Pöytävuorella ja Kapin niemimaan
vuorijonossa, joista **1 500 lajia 57 km²:n alalla** — ja UK-vertaus
liitetään juuri tähän 1 500:aan, kuten lähde tekee. Luku 2 200 jää
pois. Perustelu kirjataan lohkokommenttiin.

---

## C. RISTIRIITA LÄHTEEN SISÄLLÄ — Bo-Kaapin värit

**Lähde ("Bo-Kaap"), sanatarkasti, yksi ja sama kappale:**
*"The brightly coloured facades are attributed to an expression of
freedom by the new homeowners, as all the houses were painted white
while on lease, although it appears that the tradition of brightly
coloured homes began in the late 20th century, rather than earlier."*

**Ongelma:** repossa on jo nosto (`js/packs/africa-kulttuuri.js`,
`kapkaupunki`), joka sanoo: *"värit olivat vapauden ja oman kodin
merkki"* — eli esittää selityksen tosiasiana ja sijoittaa sen
vapautumisen aikaan. Lähde sanoo, että perinne näyttää alkaneen
vasta 1900-luvun lopulla.

**Ratkaisu:** lehden nosto **kirjoittaa ristiriidan auki**: selitys
kerrotaan sinä mitä se on (asukkaiden oma selitys: vuokralla ollessa
talot oli maalattava valkoisiksi), ja perään todetaan, että
maalaustapa näyttää yleistyneen vasta 1900-luvun lopulla.
`africa-kulttuuri.js`:n vanhaa nostoa EI muuteta tässä erässä (se on
Tutki-kortin sisältöä, ei lehteä), mutta ristiriita kirjataan
raporttiin Fablelle.

---

## D. RISTIRIITA — Abu Bakr Effendin teoksen vuosi

**Lähde 1 ("Arabic Afrikaans"), sanatarkasti:**
*"The most professional version was written in 1869 by Abu Bakr
Effendi, who came from Istanbul to the Cape in 1862."*

**Lähde 2 ("Abu Bakr Effendi"), sanatarkasti:**
*"Bayân al-Dîn (meaning "the exposition of the religion") in 1877,
printed by the Turkish Ministry of Education in Istanbul."*

**Ratkaisu:** kirjoittaja **ei anna teokselle vuosilukua lainkaan**.
Lehdessä kerrotaan varmat asiat: Effendi saapui Kapiin 17.1.1863,
opetti hanafilaista koulukuntaa, ja hänen oppikirjansa painettiin
Istanbulissa arabialaisin kirjaimin mutta afrikaansin kielellä.
Vuosiluku on ainoa kiistanalainen tieto, ja se jätetään pois.
Ratkaisu kirjataan lohkokommenttiin.

**Tarkistettu erikseen:** saapumispäivä. Lähde ("Abu Bakr Effendi",
Early life): *"They arrived in the Cape on 17 January 1863."*
Keisarillinen määräys: *"On 3 September or October 1862"* — lähde
itse epäröi kuukauden, joten lehti käyttää vain vuotta 1862
lähtökohtana ja päivämäärää 17.1.1863 saapumisena.

---

## E. KOHDEKARTTA — etäisyydet mitattu uudelleen

Kaikki 28 paria laskettiin haversinilla en-Wikipedian omista
koordinaateista. **Yksikään pari ei alita 200 metriä.** Viisi
pienintä:

| väli | kohteet |
|------|---------|
| 273 m | kaupungintalo – District Six -museo |
| 318 m | Greenmarket Square – Slave Lodge |
| 323 m | Slave Lodge – kaupungintalo |
| 367 m | kaupungintalo – Hyväntoivonlinnoitus |
| 418 m | District Six -museo – Rust en Vreugd |

**Pudotetut kohteet ja syyt (mitattu, ei arvattu):**

- **Groote Kerk** (−33,9248 / 18,4209): **55 m** Slave Lodgesta.
  200 metrin sääntö.
- **St George's Cathedral** (−33,9250 / 18,41944): **88 m** Slave
  Lodgesta. 200 metrin sääntö.
- **Grand Parade** (−33,92472 / 18,42472): **99 m** kaupungintalosta.
  200 metrin sääntö; sama aihe.
- **Koopmans-de Wet House** (−33,920941 / 18,421291): **185 m**
  Greenmarket Squaresta. 200 metrin sääntö.
- **Iziko South African National Gallery** (−33,928984 / 18,417174):
  **200 m** tasan Iziko Etelä-Afrikan museosta. Sääntö ei ylity, ja
  kohteet ovat samalla tontilla — pudotettiin.
- **Centre for the Book** (−33,9271728 / 18,4158362): **206 m**
  museosta; niukasti yli säännön mutta sama kortteli, pudotettiin.
- **Cape Townin rautatieasema** (−33,922222 / 18,426389): etäisyydet
  riittävät (411 m kaupungintalosta), mutta **Commonsista ei löytynyt
  kuvasäännöt täyttävää kuvaa**: ainoa asemarakennuksen sisäkuva on
  täynnä mainoksia (KFC, Vodacom) ja ainoa veturikuva ("Blackie") on
  otettu mainosbanderollin edessä. Kohde pudotettiin kuvasyystä ja
  tilalle otettiin **Rust en Vreugd** (Panamán ja Houstonin
  ennakkotapaus: kartan kohde ei saa jäädä ilman juttukuvaa). Aseman
  historia kerrotaan lehden nostossa K3 ja matkaoppaan jaksossa 1.
- **Bo-Kaap, Company's Garden, Pöytävuori, Robben Island** eivät ole
  kartalla **aihesyistä**: ne ovat lehden omien nostojen ja
  teemasivun aihe, eikä kohdekartta toista lehden juttuja (New Yorkin
  sääntö). Robben Island on lisäksi 6,9 km Bloubergstrandista
  ("Robben Island") eikä mahtuisi ruutuun.

**Ruudun koko** laskettiin uudelleen annetuista rajoista
(−33,8990 / −33,9320 / 18,4060 / 18,4370): **3,67 × 2,86 km**.
Faktapohjan alkuperäinen luku "3,3 × 3,7 km" oli väärin päin ja on
korjattu.

---

## F. RISTIRIITA — Foreshoren maantäyttö

**Lähde 1 ("Cape Town", South African period), sanatarkasti:**
*"In 1945 the expansion of the Cape Town foreshore was completed,
adding an additional 194 ha to the Cape Town CBD"*.

**Lähde 2 ("V&A Waterfront"), sanatarkasti:**
*"In 1938 work was started to reclaim land between the city centre
and the harbour, most notably the new Duncan Dock. The Foreshore
(230 hectares) made city expansion possible."*

**Ratkaisu:** kirjoittaja kertoo **työn kulun** eikä valitse
pinta-alaa: täyttötyö alkoi 1938 ja valmistui 1945. Pinta-ala
jätetään pois, koska lähteet antavat kaksi eri lukua eikä
kumpikaan ole tarkempi. Ratkaisu kirjataan lohkokommenttiin.

---

## G. TARKISTETTU JA VAHVISTETTU (otos)

Nämä väitteet luettiin uudelleen sanatarkasti ja ne pitävät:

- ǁHui ǃGais / "where clouds gather" — "History of Cape Town",
  johdanto, Theophilus Hahnin kirjaamana. **Pitää.**
- 1 070 laivaa 1600–1652; ǁAmmaqua myi 1 839 lammasta ja 149 nautaa
  neljälle laivalle 1601–1608 (Raven-Hart). **Pitää.**
- Salt Riverin taistelu 1510, Almeida ja 64 miestä, koulutettu karja.
  **Pitää.**
- Van Riebeeck maihin 6.4.1652; Hendrik Boom kylvömaa 29.4.1652.
  **Pitää.**
- 402 orjuutettua ihmistä 1658, 20 vuoden 1657 lopussa. **Pitää.**
- Orjuuden lakkautus: "Cape Town" sanoo *"In 1833 slavery was
  abolished in the colony freeing over 5500 slaves in the city,
  almost a third of the city's population at the time"*; "History of
  Cape Town" sanoo *"slaves – estimated to be around 39,000 in
  number – were emancipated in 1834"*. Nämä eivät ole ristiriidassa
  (kaupunki vs. siirtomaa, laki 1833 / voimaan 1834), ja lehti kertoo
  kaupungin luvun. **Pitää.**
- Vastuullinen hallinto 1872, parlamentti 1854, Cape Qualified
  Franchise. **Pitää.**
- Ensimmäinen rautatie 1859, rataverkon nopea laajennus 1870-luvulla,
  timantit Griqualand Westissä 1867, Witwatersrand 1886. **Pitää.**
- Aallonmurtaja: yli 30 alusta tuhoutui kesäkuun 1858 myrskyissä,
  Lloyd's kieltäytyi, prinssi Alfred kaatoi ensimmäisen kivikuorman
  17.9.1860; Alfred- ja Victoria-altaat 1860–1920. **Pitää.**
- Linnoitus 1666–1679, ensimmäinen kivi 2.1.1666, bastioninimet
  26.4.1679, kello valettu Amsterdamissa 1697 (Claude Fremy), runsaat
  300 kg, kuului 10 km:n päähän, keltainen väri kuumuuden takia.
  **Pitää.**
- Slave Lodge 1679, jopa 500 ihmistä, käyttö päättyi 1811,
  virastotalo 1811–1911, korkein oikeus 1911–1960-luku, museo 1966/67,
  Slave Lodge Museum 1998. **Pitää.**
- Kaupungintalo 1905, Bathin oolittinen kalkkikivi, kilpailu 1893,
  Reid ja Green, urut 3 165 pilliä, Mandelan puhe 11.2.1990, patsas
  24.7.2018. **Pitää.**
- Greenmarket Square 1696 (vahtitupa), Old Town House 1761,
  Central Metropolitan Church 1879, kaupungintalo vei kaupan 1905,
  parkkipaikka 1950-luvulla, kansallismonumentti 1961. **Pitää.**
- District Six: yli 60 000 asukasta siirrettiin; valkoisten alue
  11.2.1966; museo 1994, säätiö 1989, Prince Claus -palkinto 2003;
  nimi palautettiin 17.12.2019. **Pitää.**
- Pöytävuori: synkliini, ylin 600 m ordoviikkista hiekkakiveä
  (450–510 milj. v.), Graafwater 70 m, tasanko n. 3 km, Maclear's
  Beacon 1 086 m ja 19 m köysiratasemaa korkeammalla, Platteklip
  Gorge, de Saldanha 1503. **Pitää.**
- Köysirata: urakka Adolf Bleichert & Co 1926, avattu 4.10.1929,
  alempi asema 302 m, ylempi 1 067 m, Rotair 1996–1997, 20 → 65
  matkustajaa, 360°. **Pitää.**
- Maclear 1865, Lacaille 1750, Everest 1820, päärynän muoto,
  Pöytävuoren massanvetovoima, sama kaarevuus. **Pitää.**
  **HUOM:** sama kuvateksti sanoo kyltin kertovan korkeudeksi
  **1 084 m**, kun leipäteksti sanoo **1 086 m**. Kirjoittaja käyttää
  leipätekstin lukua 1 086 m ja jättää kyltin luvun pois.
- Ilmasto: talvi 18/8,5 °C, kesä 26/16 °C, sade 515 mm (eteläiset
  esikaupungit lähes 1 000 mm), 3 100 aurinkotuntia, Cape Doctor,
  meriveden 10–13 °C vs. 16–17 °C. **Pitää.**
- Kaapse Klopse 2.1., jopa 13 000 esiintyjää, ghoema-rumpu, orjien
  vapaapäivä, orjuus lakkautettiin Kapissa virallisesti 1.12.1834,
  ensimmäinen kulkueryhmä arviolta 1887, vanha nimi on nykyään
  laajalti loukkaavana pidetty. **Pitää.**
- Bo-Kaap: de Waal 1760/1761, huurhuisjes 1763, 71 Wale Street =
  Bo-Kaap Museum, Auwal Mosque 1794, Tana Baru 1804, Nurul Islam
  1844, 56,9 % muslimeja, SAHRA: suurin ennen 1850 rakennetun
  arkkitehtuurin keskittymä, 19 kansallista perintökohdetta 5/2019.
  **Pitää.**
- Arabialainen afrikaans: alkoi 1830-luvulla madrasoissa, ainoa
  germaaninen kieli persialais-arabialaisella kirjaimistolla (paitsi
  1500-luvun saksankielinen käsikirjoitus), 74 säilynyttä tekstiä,
  vanhin 1845, vanhin säilynyt käsikirjoitus 1868 (Abdul-Kahhar ibn
  Abdul-Malik), 36 kirjainta. **Pitää.**
- V&A Waterfront: 123 ha, kaupungin käydyin matkailukohde, van
  Riebeeckin laituri 1654, yhtiö perustettiin marraskuussa 1988.
  **Pitää.**
- Robben Island 1845 alkaen spitaalisiirtola; Mandela istui saarella
  18 vuotta 27:stä. **Pitää** — ja tämä vahvistaa 1873-kehyksen:
  isoisän aikaan saari ei ollut poliittinen vankila.

---

## H. SISÄLTÖLINJAUKSET, JOTKA KIRJOITTAJAN ON NOUDATETTAVA

1. **Pilari 1 ja spec-mantereet.md, linjaus 1:** khoe- ja san-kansat
   tulevat ensimmäisenä nostona ja **omilla nimillään**
   (ǁAmmaqua, !Uriǁʼaekua, Sonqua, Ubiqua) ennen hollantilaisten
   antamia nimiä. Lähteen käyttämiä siirtomaa-ajan haukkumanimiä
   ("Hottentots", "Bushmen", "Strandlopers") EI toisteta muuten kuin
   toteamalla, että hollantilaiset antoivat asukkaille omat nimensä.
   Kansat kuvataan kauppakumppaneina ja toimijoina, ei kohteina.
2. **Orjuus on perushistoriaa** ja kerrotaan suoraan lukuina, ilman
   yksityiskohtien korostusta. Slave Lodge, Greenmarket Squaren
   orjakauppa ja linnoituksen rakentaminen orjatyöllä mainitaan
   neutraalisti tapahtumina.
3. **Apartheid ja District Six** kerrotaan suoraan tapahtumana:
   60 000 asukasta siirrettiin pakolla ja kaupunginosa purettiin.
   Ei osapuolikehystä, ei julmuuksien yksityiskohtia. Nykyisiä
   eriarvoisuuslukuja, työttömyysastetta, "informal settlements"
   -kuvausta tai turvallisuusosiota EI käytetä (ei nykypolitiikkaa,
   ei nykyrikollisuutta) — "Cape Town"-artikkelin Crime-, Safety and
   security-, Government- ja Housing-osiot on jätetty kokonaan pois.
4. **Kaapse Klopse:** karnevaali kerrotaan **yhteisön oman juhlan**
   näkökulmasta (Tweede Nuwe Jaar, orjuutettujen vapaapäivä, selviytymisen
   juhla) eikä minstrel-viihteenä (spec-mantereet.md:n USA-linjauksen
   henki). Vanha nimi todetaan loukkaavana ja nimenmuutos kerrotaan;
   kasvojen mustaamisen kiista todetaan yhdellä neutraalilla
   lauseella tai jätetään pois. Amerikkalaisten kiertueiden vaikutus
   saa näkyä historiana.
5. **Ei vesikriisin politiikkaa:** vuosien 2015–2018 kuivuus
   kerrotaan luonnontieteellisenä ja arjen tapahtumana (kulutus
   puolittui) ilman hallinnollista syyttelyä. Ilmastonmuutosennusteet
   (RCP-skenaariot) jätetään pois lehdestä.
6. **Ei nykyistä taksisota-aineistoa** ("Cape Town", Post-apartheid
   era, 2021) — nykyrikollisuutta ei käsitellä.
