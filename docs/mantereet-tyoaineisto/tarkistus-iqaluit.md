# Iqaluit-faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) ja koordinaattirajapinnasta
(`action=query&prop=coordinates&redirects=1`). Tarkistus on
**menetelmällisesti erillinen vaihe**: lähteet luettiin uudelleen
alkuperäisistä latauksista eikä faktapohjan omiin sitaatteihin
luotettu. Väitteet haettiin `grep -o` -täsmähaulla sanatarkkoina
merkkijonoina, jotta lainaus ei voi liukua.

Luetut artikkelit: **Iqaluit**, **Frobisher Bay**, **Martin
Frobisher**, **Charles Francis Hall**, **Sylvia Grinnell Territorial
Park**, **Apex, Iqaluit**, **Iqaluit Airport**, **St. Jude's Cathedral
(Iqaluit)**, Legislative Building of Nunavut, Nunatta Sunakkutaangit
Museum, Inuksuk High School, Astro Hill Complex, Nunavut Arctic
College, Inuit throat singing, Nunavut, Inuktitut.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi kahden
korjauksen jälkeen.** Numerot ja päivämäärät täsmäsivät lähteisiin
hyvin. Yksi mittayksikkövirhe (kohta A) ja yksi lähteen sisäinen
ristiriita, jota faktapohja ei ollut huomannut (kohta B), on
korjattava ennen kirjoittamista. Loput ovat tarkennuksia.

---

## A. MITTAYKSIKKÖVIRHEEN RISKI (pakollinen tarkennus) — arktinen paju

**Faktapohjan väite (L2):** arktinen paju "voi olla vaakasuunnassa
noin 7,6 metriä pitkä mutta vain noin 15 senttimetriä korkea".

**Lähde ("Iqaluit", Climate), sanatarkasti:** *"The Arctic willow may
be up to around {{cvt|25|ft|order=flip}} horizontally, but only
{{cvt|6|in|order=flip}} tall."*

**Tarkistus:** `order=flip` kääntää näytön metriseksi, joten
artikkelin lukija näkee ensin metriluvut. 25 jalkaa = 7,62 m ja
6 tuumaa = 15,2 cm. Faktapohjan muunnos on siis oikein — mutta se on
tehty faktapohjassa itse, ei luettu lähteestä, ja lähdeteksti näyttää
raakana imperiaaliselta. **Korjaus:** kirjoita lehteen pyöristetyt
metriluvut ("lähes kahdeksan metriä pitkä ja viisitoista senttiä
korkea") ja kirjaa lohkokommenttiin, että alkuperäinen ilmoitus on
25 ft / 6 in.

---

## B. LÄHTEEN SISÄINEN RISTIRIITA (faktapohja ei huomannut) —
   väestönlaskennan vertailuvuosi

**Lähde ("Iqaluit", johdanto), sanatarkasti:** *"As of the 2021
Canadian census, the population was 7,429 (population centre: 6,991),
a decrease of 4.0 per cent from the [[2011 Canadian census|2016
census]]."*

**Ongelma:** linkin kohde on **2011** ja näyttöteksti **2016**.
Demographics-osio sanoo *"a change of –4% from its 2016 population"*,
mikä tukee vuotta 2016. Linkitys on siis virheellinen artikkelissa.

**Korjaus:** lehti käyttää vain väkilukua 7 429 (2021) eikä ota
kantaa vertailuvuoteen. Prosenttimuutosta ei kirjoiteta lehteen.

---

## C. Tarkennus — Sylvia Grinnellin puiston pinta-ala

Faktapohja tunnisti oikein ristiriidan. Tarkistus vahvistaa:
tietolaatikko sanoo `area = {{cvt|44.3|km2}}`, ja Area-osio sanoo
*"The park covers {{cvt|148|ha}}."* 148 ha = 1,48 km². Ero on
30-kertainen (ei 300-kertainen kuten faktapohja sanoo — **tämäkin
luku korjataan faktapohjassa**). Kumpaakaan lukua ei käytetä
lehdessä; kohdekartan jutussa puisto kuvataan ilman pinta-alaa.

## D. Tarkennus — Hallin ensimmäisen matkan vuosiluvut

"Charles Francis Hall" otsikoi ensimmäisen retkikunnan **1860–1862**,
ja "Sylvia Grinnell Territorial Park" sanoo Hallin saapuneen alueelle
**1861**. Molemmat pitävät paikkansa: matka alkoi 1860, ja
Frobisherinlahdelle hän pääsi 1861. **Kirjoita "1861", kun puhutaan
lahdesta, ja "1860–1862", kun puhutaan koko matkasta.**

Lisäksi "Iqaluit Airport" (Military use) kertoo, että vuoden 1941
tiedustelu ei löytänyt Rooseveltin ehdottamaa paikkaa, koska kartat
olivat epätarkkoja ja **peräisin Charles Francis Hallin vuoden 1865
retkikunnasta**. Tämä on hyvä ja tarkistettu lisäyhteys 1873-kehyksen
ja lentokentän välille — mutta huomaa, että artikkeli sanoo 1865, kun
"Charles Francis Hall" ajoittaa toisen matkan 1863–1869. Ristiriitaa
ei kirjoiteta auki lehdessä; vuosilukua 1865 ei käytetä.

## E. Tarkennus — Frobisherin miesten kohtalo

Faktapohjan muotoilu vastaa lähdettä. Sanatarkasti ("Martin
Frobisher", First voyage): *"Inuit oral tradition tells that the men
lived among them for a few years of their own free will until they
died attempting to leave Baffin Island in a self-made boat."*
Lehti saa kertoa tämän vain perimätietona, ei tosiasiana — **käytä
sanaa "perimätiedon mukaan"**.

Frobisherin ottama vanki purasi kielensä poikki vankeuteensa
suuttuneena ja kuoli Englannissa vilustumiseen. **Tätä yksityiskohtaa
ei kirjoiteta lehteen** (pilari 4: ei julmuuksien yksityiskohtia).
Samoin toisen matkan kolmen kaapatun inuiitin (Kalicho, Arnaq,
Nuttaaq) kuolemat Englannissa jätetään pois yksityiskohtineen; jos
asia mainitaan, se sanotaan yhdellä neutraalilla virkkeellä.

## F. Vahvistetut väitteet (sanatarkka haku onnistui)

- *"place of many fish"* — "Iqaluit" (History). ✔
- *"the northernmost city in Canada"* — "Iqaluit" (johdanto). ✔
- *"It was known as Frobisher Bay from 1942 to 1987"* — johdanto. ✔
- *"On 1 January 1987, the name of the municipality was changed from
  'Frobisher Bay' to 'Iqaluit'."* — History. ✔
- *"On 19 April 2001, it became an official city."* — History. ✔
- *"By 1957, 489 of the town's 1,200 residents were reported to be
  Inuit."* — History. ✔
- *"the population was 7,429"* (2021) — johdanto. ✔
- *"tidal variance at Iqaluit each day is about 7 to 11 m"* —
  "Frobisher Bay" (Geography). ✔
- *"Trondheim has an annual mean temperature that is 15.2 C-change
  milder"* — "Iqaluit" (Climate). ✔
- *"The lowest temperature ever recorded was −45.6 °C on 10 February
  1967"* ja *"The highest … 26.8 °C on 21 July 2008"* — Climate. ✔
- *"In 1979, the mean temperature was −9.0 °C, but in 2023, it was
  −6.8 °C"* — Climate. ✔
- *"Average monthly temperatures are below freezing for eight months
  of the year"* ja *"just over 400 mm of precipitation annually"* —
  Climate. ✔
- *"Its length is about 230 km and its width varies from about 40 km …
  to roughly 20 km"* — "Frobisher Bay" (johdanto). ✔
- *"about 200 tons"* malmia toiselta matkalta — "Martin Frobisher"
  (Second voyage). ✔
- *"Bisogna sapere adulare la natura"* — First voyage. ✔
- *"the ore proved to be a valueless rock containing hornblende and
  was eventually salvaged for road metalling and wall construction"*
  — Third voyage. ✔
- *"The Cathay Company went bankrupt and Michael Lok was ruined,
  being sent to debtors' prison several times."* — Third voyage. ✔
- *"the first Church of England service recorded on North American
  soil was a celebration of Holy Communion at Frobisher Bay in the
  last days of August or early September 1578"* ja muistopäivä
  3.9. — "Frobisher Bay" (History). ✔
- *"Iqaluit's first permanent resident was Nakasuk, an Inuk guide"* —
  "Iqaluit" (History). ✔
- *"the only capital that is not connected to other settlements by a
  highway"* ja *"Iqaluit is the only Canadian capital city not to
  have traffic signals"* — Transportation. ✔
- *"the rush minute"* — Transportation. ✔
- *"a distance of over 100 km"* Hudsoninsalmen yli — Transportation. ✔
- Kielitilasto 2021 (englanti 49,1 %, inuktitut 30,0 %, ranska 5,9 %;
  puhujat 97,2 % / 53,1 %) — Language. ✔
- *"Apex … is about 5 km southeast"*, *"the place where most Inuit
  lived when Iqaluit was a military site"*, HBC:n muutto 1949 ja
  tuberkuloosimuistomerkin "rukousseinä" — "Apex, Iqaluit". ✔
- Igluikatedraali: alkuperäinen 1972, tuhopoltto 5.11.2005, purku
  1.6.2006, nykyinen avattu 3.6.2012, alttariristi kahdesta
  sarvivalaan syöksyhampaasta — "Iqaluit" (Architecture),
  "St. Jude's Cathedral (Iqaluit)". ✔
- Parlamenttitalo: rakentaminen alkoi toukokuussa 1998, valmis 1999,
  vihitty 19.10.1999, hinta 12 milj. CAD, suunnittelu Arcop ja Full
  Circle — "Legislative Building of Nunavut" (infobox). ✔
- Astro Hill: valmis 1976, korkein rakennus 8 kerrosta, Frobisher Inn
  95 huonetta, CBC Northin studiot — "Astro Hill Complex". ✔
- Inuksuk High School: perustettu 1971, luokat 9–12, noin 410
  oppilasta, paneelit mitoitettu kestämään 100 mailin tuntivauhtia
  (n. 160 km/h) — "Inuksuk High School". ✔
- Nunatta Sunakkutaangit: perustettu 1969, entinen HBC-rakennus,
  siirretty telaketjuilla Apexista Iqaluitiin — "Nunatta
  Sunakkutaangit Museum". ✔
- Iqaluitin lentoasema: kiitotie 16/34, 2 623 m; uusi terminaali 2018;
  A380:n kylmätestaus helmikuussa 2006; 172 000 matkustajaa (2019);
  polaarireittien varalentokenttä — "Iqaluit Airport". ✔

## G. Kohdekartan koordinaatit ja välit — tarkistettu uudelleen

Koordinaatit haettiin itse rajapinnasta ja luettiin tietolaatikoista;
etäisyydet laskettiin itse (asteet × 111,32 km, pituusasteille
cos 63,74° ≈ 0,4424). Pienin väli **207 m** (Inuksuk-lukio – Astro
Hill), seuraavat 230 m ja 276 m. Kaikki ylittävät 200 metrin rajan.
Nunavut Arctic Collegen rajapintakoordinaatti (63,72761 / −68,44456)
osoittaa Apexin suuntaan eikä keskustan Nunatta-kampukselle — se
jätettiin pois, ja päätös on kirjattu maakartat.js:n lohkokommenttiin.

## H. Sisältölinjaukset, jotka kirjoittajan on noudatettava

1. **Inuiitit elävinä toimijoina** (spec-mantereet.md linjaus 1):
   perimätieto, kieli ja nykykaupunki — ei "kadonneen kansan"
   kehystä. Nakasuk, Ipirvik ja Taqulittuq nimetään.
2. **Ilmastonmuutos neutraalisti** luonnontieteellisenä tosiasiana
   ilman politiikkaa (spec-mantereet.md, P-Amerikka).
3. **Ei tuberkuloosipotilaiden kohtalon yksityiskohtia** eikä
   sisäoppilaitoshistoriaa: jälkimmäinen on jo Kanadan maalehdessä
   ("Koulut, joita kesti sata kaksikymmentä vuotta").
4. **Ei Baffininsaaren nimihistoriaa** — se on karttanostossa
   (maastokohteet-can.js).
5. **Ei jääkarhua nostona** — CAN-eläintäky hoitaa sen.
