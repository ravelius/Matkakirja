# Täkyehdokkaat: Berliini

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten. Sama malli ja
sama laatutaso kuin docs/mantereet-tyoaineisto/takyt-rooma.md
(fokusmaa-erä) ja docs/mantereet-tyoaineisto/takyt-istanbul.md
(eläintäkymalli). Fokusmaa: **SAKSA**, fokuskaupunki **BERLIINI**.

**Tila:** kartoitus. EI koodia, EI muutoksia olemassa oleviin
tiedostoihin. Fable valitsee, mitkä viedään peliin ja missä
sanamuodossa.

---

## Laudan ja kaaren tila (tarkistettu repossa)

Tehtävänannon kysymys tarkistettiin koodista, ei muistista:

- **Berliini ON maailmankartta-laudalla.** `js/packs/maailmankartta.js`
  rivi 212: `{"id":"berliini","name":"Berliini","wiki":"Berliini",
  "ambience":"kaupunki","x":6279.2,"y":1278.3,"airport":true,
  "la":"start","lx":17,"ly":-16}`. Se on siis pelattava laatta
  maailmankartalla ja lisäksi **lähtökaupunki** (`"la":"start"`).
  Yhteydet: Amsterdam (4), Praha (2), Varsova (4), Kööpenhamina (2),
  Alpit (4). `CITY_COUNTRY`-taulussa `"berliini":"DEU"`.
- **Berliini on myös Euroopan laudalla.** `js/packs/europe.js` rivi
  364, sama tunnus, koordinaatit (468, 512), lentokenttä. Lennot
  Lontooseen ja Roomaan (rivit 593, 596).
- **KAARIDATA ON OLEMASSA.** `js/tyohuone-kehitys-data.js`,
  `KAARI_PAKETIT.kohteet`, rivi 288 alkaen: `id: 'berliini'`,
  otsikko **"Berliini — kaukoputki joka katsoi tyhjää"**. Paketti on
  täysi: saapuminen (tähtitorni, barometrin lukema messingissä),
  henkilö (tähtitornin hoitaja **Lotte**), kohtaaminen (havaintokirja
  vuodelta 1873), kysymys (Neptunus löydettiin laskemalla ja sitten
  Berliinin observatoriolla 1846) ja aarre (jalustan ontosta jalasta
  löytyvä kätkö). Kaikki kolme osaa on merkitty mykistetyiksi.
- **Saksa on ainoa fokusmaaehdokas, jolla on vain YKSI pelilaatta.**
  Yksikään muu Saksan kaupunki (München, Hampuri, Köln, Dresden,
  Frankfurt) ei ole laattana kummallakaan laudalla — tarkistettu
  grepillä. Tämä on hyvä uutinen fokuskohteille: koko muu Saksa on
  vapaana karttakohteiksi (ks. fokuskohteet-saksa.md).
- **Fokuskohdepakkaa ei vielä ole.** `js/packs/` sisältää
  `fokuskohteet-bgr/bih/grc/ita/rou/tur.js` — **ei** `-deu.js`.

---

## Tarkistustapa

- Wikipedia-artikkelit haettu 25.8.2026 Noden fetchillä
  (`NODE_USE_ENV_PROXY=1`) MediaWiki-rajapinnasta
  `action=query&prop=extracts&explaintext=1&redirects=1`,
  User-Agent-otsakkeen kanssa. 429-vastauksiin uusi yritys kasvavalla
  viiveellä (4 s → 8 s → …).
- **Kaksi kieltä.** Osa Berliinin parhaista täyistä EI OLE
  en-Wikipediassa lainkaan (Trockenwohner, Bobby-gorilla, Rohrpost,
  Bärenzwinger, keisarin kulmaikkuna). Näiden lähde on
  **de-Wikipedia**, ja se on merkitty kohdittain. Missä molemmat
  kielet kattavat asian, on käytetty en-versiota ja de-versio on
  toiminut ristiintarkistuksena.
- Ei mitään muistinvaraista. Jokaisen täyn alla on artikkeli, sen
  **osio nimeltä** ja lainaus, johon väite nojaa.
- **Koordinaatit** en-Wikipedian `prop=coordinates`-rajapinnasta,
  EIVÄT arvattuja. Kolme kohdetta (Altes Palais, Rathaus Köpenick,
  Bärenzwinger) ei anna rajapinnasta koordinaatteja — niille on
  merkitty lähin artikkeli, joka antaa, ja se on sanottu ääneen.
- **Kuvat:** jokaisen ehdotetun Commons-tiedoston olemassaolo, koko,
  MIME, lisenssi, tekijä, päiväys ja **Restrictions-kenttä** on kysytty
  erikseen Commonsin `imageinfo`-rajapinnalla
  (`iiprop=url|size|mime|extmetadata`) — ei arvattuja tiedostonimiä.
  **Kaikkien alla ehdotettujen Restrictions-kenttä oli tyhjä.** Kaikki
  ovat PD, CC0 tai CC BY / CC BY-SA.
- **SILMÄTARKISTUS-varoitus** on merkitty jokaiseen kuvaan, jossa voi
  olla eläviä tunnistettavia ihmisiä (eläintarha-, museo-, katu- ja
  junakuvat). Ne on katsottava silmin ennen käyttöä; koonti on
  tämän dokumentin lopussa.

---

## Olemassa oleva Berliini-sisältö repossa (grep js/packs/)

**Alla olevat täyt on valittu kiertämään kaikki nämä.**

- **js/packs/nahtavyysjutut.js** (rivit 362–560), avain `berliini`:
  kuusi valmista nähtävyysjuttua — **Valtiopäivätalo** (1894, palo
  1933, lippu katolla 1945, Fosterin kupoli), **Brandenburgin portti**
  (1791, Napoleonin viemä kvadriga, Reaganin puhe), **Checkpoint
  Charlie** (1961, panssarivaunut vastakkain), **Museosaari** (1830,
  Pergamon, Ištar-portti, **Nefertiti**), **Tv-torni** (1969, "paavin
  kosto") ja **East Side Gallery** (1990, Vrubelin suudelma, Trabant).
- **js/packs/kulttuuri-kategoriat.js** (rivi 2749 alkaen): "Matkailijan
  Berliini" — liikkuminen, muurin paikka, vapaapäivä ulkona,
  **katuruoka (currywurst 1949, döner)**, ilta, etäisyydet, käteinen,
  sunnuntain sulut, talven pimeys, vuodenajat, linkit. Nostot:
  **Gaertner maalasi Berliinin talo talolta** (viisi maalausta),
  **Hattupäinen ukkeli sai jäädä** (Ampelmännchen), **Tyttö
  Schönebergistä lauloi maailman ympäri** (Marlene Dietrich),
  **Aurinko piirsi torniin ristin**, **Kelloa pyöritti Trabantin
  vaihteisto** (Urania-maailmankello).
- **Avauskuvien selitteissä** (kulttuuri-kategoriat.js) on jo yksi
  1873-fakta: *"Voitonpylväs vihittiin 2. syyskuuta 1873"*. Se on
  **selite, ei tarina** — ks. täky 1 ja sen päällekkäisyyshuomio.
- **js/packs/europe-artikkelit.js** rivi 1520: `Berliini`-artikkeli
  (suo, Preussi, **1871 keisarikunnan pääkaupunki**, 1920 Groß-Berlin,
  1933, 1961 muuri 155 km, 1990 pääkaupunki).
- **js/packs/europe-questions.js** rivi 538: kysymykset Saksasta,
  muurista, Brandenburgin portista, Museosaaresta; **maailmankartan
  kysymyksissä myös "Minä vuonna Berliinin muuri avattiin?"**
  (maailmankartta.js rivi 686).
- **js/packs/europe-saapumiset.js** rivi 356, **julisteet.js**,
  **miniatyyrit.js**, **europe-valokuvat.js**: Berliini-aineistoa on.

**Johtopäätös:** muuri, Brandenburgin portti, Valtiopäivätalo,
Museosaari, Nefertitin rintakuva kuvana, tv-torni, East Side Gallery,
Ampelmännchen, Dietrich, currywurstin keksimisvuosi ja "pääkaupunki
1871" ovat JO KÄYTÖSSÄ. Uudet täyt tulevat niiden ohi: **1873-vuosi
tarinana** (jota pelissä ei ole lainkaan), **Gründerzeit ja sen
romahdus**, **eläimet** ja **paikat, joita pelissä ei ole**
(Köpenick, Köllnischer Park, Unter den Lindenin akvaario, Rohrpost,
Siegesallee).

---

## 1873 — mitä Berliinissä oli meneillään isoisän matkavuonna

Tämä osio on tarkoitettu Fablen kehykseksi: se on täkyjen yhteinen
ajallinen selkäranka, ja jokainen fakta on tarkistettu.

- **Keisarikunta oli kaksivuotias.** Saksan keisarikunta perustettiin
  1871; en-Wikipedia "Panic of 1873" sanoo suoraan: *"Two years after
  the foundation of the German Empire, the panic came and became known
  as the Gründerkrach."*
- **Raha vaihtui matkavuonna.** Kultamarkka otettiin käyttöön
  **9. heinäkuuta 1873** koko keisarikunnan valuutaksi, ja se korvasi
  jäsenvaltioiden hopearahat. Lähde: en-Wikipedia "Panic of 1873",
  osio "Germany and Austria-Hungary": *"culminated in the introduction
  of the gold mark on 9 July 1873 as the currency for the newly founded
  German Empire, replacing the silver coins of all constituent lands."*
  Isoisä olisi siis nähnyt kaupungin, jossa kolikot olivat juuri
  vaihtuneet.
- **Gründerjahre eli perustajavuodet olivat huipussaan ja loppuivat
  samana vuonna.** Ranskan sotakorvaukset valuivat markkinoille,
  yhtiölaki oli vapautettu, ja rahat menivät rautateihin, tehtaisiin,
  satamiin ja höyrylaivoihin. Lähde: sama artikkeli, sama osio.
- **Wienin pörssi romahti 9. toukokuuta 1873** ja veti Berliinin
  mukanaan. Lähde: sama artikkeli; ks. täky 2 tarkkoine
  päivämäärineen (de-Wikipedia "Gründerkrach").
- **Ranskan maksut päättyivät syyskuussa 1873** ja pahensivat
  supistumista: *"The contraction of the German economy was
  exacerbated by the conclusion of payments by France in September
  1873."*
- **Voitonpylväs vihittiin 2. syyskuuta 1873** (täky 1).
- **Berliinin viemäriverkon pääputkien rakentaminen alkoi 1873**
  (täky 5).
- **Alfred Brehm johti Unter den Lindenin akvaariota vuoteen 1873**,
  jolloin hän jätti tehtävän (täky 8).
- **Kauppaministeri kreivi Itzenplitz joutui eroamaan 1873**
  Strousbergin rahoitustapojen paljastuttua (täky 3).

**HERKKYYS (Raamatun Perustuslaki 3–4).** en-Wikipedia "Panic of 1873"
toteaa itse, että romahduksen jälkeen pikkusijoittajat syyttivät
tappioistaan juutalaisia ja että lehdistössä esitettiin
antisemitistisiä syytöksiä. **Tämä ei kuulu pelitekstiin
yksityiskohtina.** Jos aihetta halutaan käsitellä, se sanotaan yhtenä
neutraalina lauseena ("romahdusta seurasi syyllisten etsintä, joka
kohdistui vääriin ihmisiin") — eikä toistettuna sitaattina eikä
nimillä. Sama koskee täkyä 3: Strousbergin tausta EI ole täyn asia.

---

## Täkyt

### 1. Pylväs vihittiin viikkoa ennen kuin sitä ehti sanoa voitonpylvääksi — ja berliiniläiset ristivät sen "Kulta-Liisaksi"

Heinrich Strack suunnitteli pylvään vuoden 1864 jälkeen muistoksi
voitosta Tanskasta. Ennen kuin se ehdittiin vihkiä, Preussi oli
voittanut myös Itävallan (1866) ja Ranskan (1870–71), ja pylväs sai
uuden merkityksen: harjalle lisättiin 8,3 metriä korkea pronssinen
Victoria, jota alkuperäisissä suunnitelmissa ei ollut. Vihkiäiset
pidettiin **2. syyskuuta 1873** — isoisän matkavuonna. Berliiniläiset
eivät jääneet juhlapuheiden varaan vaan antoivat patsaalle
lempinimen *Goldelse*, "Kulta-Liisa", vuonna 1866 ilmestyneen
E. Marlittin romaanin sankarittaren mukaan. Pylväs ei ole enää siellä,
missä isoisä sen näki: se seisoi Königsplatzilla, ja vuosina 1938–39
se siirrettiin Großer Sternille ja korotettiin samalla 6,5 metriä.

- **Paikka:** Siegessäule, Großer Stern, Tiergarten. 52,5144°N,
  13,35°E (en-Wikipedia "Berlin Victory Column", coordinates).
- **Lähde:** en.wikipedia.org/wiki/Berlin_Victory_Column, johdanto ja
  osiot "Design" ja "Locations".
- **Lainaus/perustelu:** *"Designed by Heinrich Strack after 1864 to
  commemorate the Prussian victory over Denmark… by the time it was
  inaugurated on 2 September 1873, Prussia had also defeated Austria…
  and France… giving the statue a new purpose."* — *"Berliners have
  given the statue the nickname Goldelse, meaning something like
  'Golden Lizzy', named after an 1866 novel by E. Marlitt."* —
  *"In 1938/1939… the Nazis relocated the column to its present site
  at the Großer Stern… the column was augmented by another 6.5
  metres."*
- **Kuva:** Commons **Einweihung Siegessaeule Berlin.jpg**
  (1000×1435, public domain, tekijä tuntematon, **päiväys
  2.9.1873**) — aikalaiskuva **tasan vihkiäispäivältä**. Tämä on koko
  aineiston vahvin ajoituksellinen kuvaosuma. Nykykuvaksi:
  **Siegessäule Berlin - victory column Berlin - 01.jpg** (4420×5600,
  CC BY-SA 3.0, Norbert Nagel, 2014).
- **Varmuus:** VARMA — suoraan lähteessä.
- **PÄÄLLEKKÄISYYS (tärkeä):** pelissä on jo **selite**
  kulttuuri-kategoriat.js:n avauskuvassa: *"Voitonpylväs vihittiin
  2. syyskuuta 1873…"*. Vuosiluku ei siis ole uusi — **uutta on
  Goldelse-lempinimi, syy uuteen merkitykseen ja siirto 1938–39**.
  Jos täky viedään peliin, selite ja täky on syytä lukea rinnakkain,
  ettei sama lause toistu kahdesti.
- **HERKKYYS:** siirto tehtiin Germania-suunnitelman takia. Riittää
  "pylväs siirrettiin 1938–39, kun keskustaa suunniteltiin uusiksi" —
  ei suunnitelman nimeä eikä laajempaa kontekstia.

### 2. Keisari sanoi, että kaikki menee erinomaisesti — kahdeksan päivää myöhemmin poliisi sulki pörssin

Wienin maailmannäyttely avattiin 1. toukokuuta 1873, ja keisari Frans
Joosef avasi sen sanomalla, että Itävalta-Unkari on "kaikkiin
suuntiin ilahduttavassa nousussa". Kupla oli jo puhkeamassa.
**9. toukokuuta 1873** aamulla ensimmäisenä ilmoitti maksukyvyttömyy-
destään Adolf Petschek, jota pidettiin "välitysliikkeiden kuninkaana".
Samana aamupäivänä 120 muuta pankkia kaatui, ja kello 13 poliisi
sulki pörssin. Päivä jäi Itävallan historiaan mustana perjantaina.
Berliinissä sama isku kaatoi Bethel Henry Strousbergin
rautatieimperiumin, ja sitä kutsuttiin **Gründerkrachiksi**,
perustajien romahdukseksi. Nimi oli käytössä jo saman vuoden
syyskuussa. Isoisä matkusti keskelle tätä: keisarikunta oli
kaksivuotias, raha oli juuri vaihdettu kultamarkaksi, ja kaupunki,
joka oli kaksi vuotta rakentanut kaikkea kerralla, sai laskun.

- **Paikka:** Berliinin pörssi. 52,4967°N, 13,29°E (en-Wikipedia
  "Börse Berlin", coordinates — **HUOM:** tämä on nykyisen pörssin
  osoite, ei vuoden 1873 rakennus Burgstraßella; jos kartalle
  halutaan historiallinen paikka, se on haettava erikseen).
- **Lähde:** de.wikipedia.org/wiki/Gründerkrach, johdanto ja osiot
  "Euphorie vor der Weltausstellung", "Spekulationsblase" ja
  "Schwarzer Freitag"; en.wikipedia.org/wiki/Panic_of_1873, osio
  "Germany and Austria-Hungary".
- **Lainaus/perustelu:** *"Am 1. Mai 1873 eröffnete Kaiser Franz
  Joseph I. die Weltausstellung mit dem Satz, Österreich-Ungarn sei
  'nach allen Richtungen in erfreulichem Aufschwunge begriffen'."* —
  *"In den Morgenstunden des 9. Mai 1873 brach der Damm. Als erster
  gab Adolf Petschek seine Zahlungsunfähigkeit bekannt… Noch am
  gleichen Vormittag wurden 120 weitere Banken insolvent. Um 13 Uhr
  wurde die Börse polizeilich geschlossen."* — *"Der Begriff
  Gründerkrach wurde bereits im Jahr 1873 verwendet, so etwa am
  26. September 1873 in einem Artikel der Tageszeitung Das
  Vaterland."* — en: *"In Berlin, the railway empire of Bethel Henry
  Strousberg crashed after a ruinous settlement with the government of
  Romania, bursting the speculation bubble in Germany."*
- **Kuva:** Commons **Bethel Henry Strousberg.jpg** (413×503, public
  domain, tekijä tuntematon, ennen 1876) — **PIENI, tarkista
  riittääkö**. Isompi ja aiheeseen sopiva: **Palais Strousberg -
  Facade.jpg** (1020×800, public domain, August Orth, 1896) — se
  palatsi, jonka romahtanut rautatiekuningas oli rakennuttanut.
- **Varmuus:** VARMA — suoraan lähteissä.
- **KYTKÖS PELIIN:** Wien on pelilaatta (europe.js) ja Bukarest on
  fokuskaupunki (fokusvirta-bukarest.js). Tämä täky sitoo Berliinin,
  Wienin ja Romanian yhteen yhdellä vuodella — harvinaisen hyvä
  laattojen välinen kytkös.
- **HERKKYYS:** ks. 1873-osion loppuhuomio. Romahduksen jälkeisiä
  syytöksiä EI kuvata.

### 3. Hän istui Lontoossa pakkotyötä kavalluksesta — ja palasi Saksan rautatiekuninkaaksi

Bethel Henry Strousberg oli muuttanut nuorena Lontooseen. Heinäkuussa
1847 hän hoiti rakennusyhdistysten jäsenmaksuja, otti rahaa ja osti
laivalipun Amerikkaan — mutta höyrylaiva joutui palaamaan
Southamptoniin, koska siihen oli lastattu väärää hiiltä, ja hän jäi
kiinni. Tuomio oli kuusi kuukautta pakkotyötä. Kaksikymmentä vuotta
myöhemmin sama mies oli Saksan tunnetuin rautatieyrittäjä: hän
rakennutti Berliini–Görlitz-radan, osti Hannoverin valimon ja piti
Berliinin karjatoria, ja rakennutti itselleen Wilhelmstraßelle
palatsin, josta tuli myöhemmin **Britannian suurlähetystö**. Hänen
menetelmänsä oli, että urakoitsijoille maksettiin osakkeilla — jolloin
osakkeiden nimellisarvo karkasi rakennuskustannuksista. Romanian
rataurakka kaatui häneen 1872, ja poliittinen vastustaja Eduard Lasker
puhui hänen rahoitustavoistaan julkisesti niin, että Preussin
kauppaministeri kreivi Itzenplitz joutui eroamaan 1873.

- **Paikka:** Palais Strousberg, Wilhelmstraße, Berlin-Mitte.
  52,5079°N, 13,3774°E (en-Wikipedia "Wilhelmstrasse", coordinates —
  kadun koordinaatti, ei talon). Hauta: Alter St.-Matthäus-Kirchhof,
  Schöneberg.
- **Lähde:** en.wikipedia.org/wiki/Bethel_Henry_Strousberg, osio
  "Life".
- **Lainaus/perustelu:** *"In July 1847, Strousberg was working as an
  agent for several building societies… he took an amount of money and
  booked a passage to America, but was found out when the steamer had
  to return to Southampton having loaded the wrong grade of coal.
  Strousberg was tried, found guilty, and served six months
  imprisonment with hard labour."* — *"He cemented his social standing
  with the construction of the Palais Strousberg in Berlin's
  Wilhelmstrasse… which later became the seat of the British
  Embassy."* — *"He himself had to raise less capital while
  Strousberg's stockholders initially generated high profits, however,
  the nominal value of the shares reached dubious heights."* — *"His
  political opponents, led by the National Liberal Eduard Lasker,
  openly denounced his financing methods… enforcing the Prussian trade
  minister Count Itzenplitz to resign in 1873."*
- **Kuva:** Commons **Palais Strousberg - Facade.jpg** (1020×800,
  public domain, August Orth, 1896) tai **Bethel Henry
  Strousberg.jpg** (413×503, PD — pieni).
- **Varmuus:** VARMA — suoraan lähteessä.
- **TÄRKEÄ TARKKUUSHUOMIO:** lähde sanoo nimenomaan, että Strousberg
  **selvisi vuoden 1873 paniikista vahingoittumatta** ja meni
  konkurssiin vasta 1875: *"Though Strousberg came out of the Panic of
  1873 unscathed, he was declared bankrupt in 1875."* Älä siis
  kirjoita, että vuoden 1873 romahdus tuhosi hänet — 1873 kaatui
  ministeri, 1875 kaatui mies.
- **BRITTIKYTKÖS:** vahva pelin päähenkilölle. Nuoren herra Foggin
  isoisä kulkee Berliinissä 1873 ohi talon, joka oli rakennettu
  Lontoossa tuomitun miehen rahoilla ja josta tuli Britannian
  lähetystö.
- **HERKKYYS:** ks. 1873-osio. Strousbergin uskonnollinen tausta ja
  romahduksen jälkeiset syytökset EIVÄT kuulu täkyyn.

### 4. Berliinissä oli ammatti, jonka työ oli hengittää: uusiin taloihin palkattiin ihmisiä kuivaamaan seiniä

Gründerzeitin rakennusbuumissa Berliiniin nousi kokonaisia
kortteleita kerralla. Sementtilaastia kalliimpaa oli kalkkilaasti,
joka kovettuessaan vapautti vielä lisää vettä, ja niin uusi talo oli
tyypillisesti kolme kuukautta asuinkelvoton. Ratkaisu keksittiin:
taloihin otettiin ilmaiseksi tai lähes ilmaiseksi asukkaita, jotka
lämmittivät taloa pelkällä läsnäolollaan ja joiden uloshengityksen
hiilidioksidi nopeutti laastin kovettumista. Heitä kutsuttiin nimellä
*Trockenwohner*, kuivaan-asuja. Sana keksittiin pilalehti
Kladderadatschissa 1863, ja lehti määritteli sen näin: "Berliinissä
kutsutaan trockenwohnereiksi niitä proletaareja, joille
talokeinottelijat luovuttavat asunnot vastavalmistuneista taloistaan
ilman vuokraa, kunnes kaikki kosteus on kadonnut uudisrakennuksesta ja
talo on asuttava maksaville vuokralaisille." Vaihtoehto oli
asunnottomuus. Talvi kosteassa talossa ei ollut terveellinen, huonekaluja
ei useimmiten ollut eikä lämmitystä, ja kolmen kuukauden välein piti
muuttaa uudestaan.

- **Paikka:** koko 1870-luvun Berliini; ilmiö liittyi
  Mietskaserne-kortteleihin. Ei omaa koordinaattia — kartalla tämä on
  kaupungin oma täky.
- **Lähde:** de.wikipedia.org/wiki/Trockenwohner, osiot
  "Wortgeschichte", "Bautechnischer Hintergrund" ja
  "Gesellschaftlicher Hintergrund". **HUOM: ei en-Wikipedia-vastinetta
  löytynyt.**
- **Lainaus/perustelu:** *"Der Begriff 'Trockenwohner' wurde 1863 von
  der Satirezeitschrift Kladderadatsch geprägt."* — *"'Trockenwohner'
  nennt man in Berlin die Proletarier, welchen die Häuserspekulanten
  die Wohnungen in ihren neu erbauten, eben fertig gewordenen Häusern
  ohne Forderung eines Mietzinses überlassen, bis jede Feuchtigkeit aus
  dem Neubau verschwunden ist."* — *"ein mit solchem Mörtel gebautes
  Haus typischerweise drei Monate benötigte, bis es bewohnbar war…
  die das Haus schon allein durch ihre Anwesenheit beheizten und
  außerdem mit dem Kohlenstoffdioxid ihrer Atemluft zur schnelleren
  Aushärtung des Mörtels beitrugen."* — *"stellte das 'Trockenwohnen'
  eine Alternative zur Obdachlosigkeit dar."*
- **Kuva:** Commons **Heinrich Zille Hinterhof.jpg** (922×1200, public
  domain, Heinrich Zille, 1907 jälkeen) — berliiniläinen takapiha
  Zillen piirtämänä. **HUOM:** kuva ei esitä nimenomaan
  trockenwohnereita, vaan sitä miljöötä, jota Zille lähteen mukaan
  kuvasi; selitteessä on sanottava se näin. Aikalaisvaihtoehto
  aiemmalta ajalta: **Adolph von Menzel - Rear of House and Backyard -
  WGA15047.jpg** (1191×900, PD, n. 1846).
- **Varmuus:** VARMA lähteen (de) osalta. **EPÄVARMA/ei tarkistettu:**
  kuinka moni berliiniläinen tosiasiassa asui näin ja milloin tapa
  loppui — lähde ei anna lukuja. Älä keksi niitä.
- **Kirjallinen kytkös (bonus, lähteessä):** Theodor Fontane käyttää
  sanaa romaanissa *Effi Briest* (1894), Karl Kraus ja Walter Benjamin
  tekivät siitä metaforan. Fontane on paras, jos halutaan
  aikalaisääni.
- **IKÄSOPIVUUS:** 13+ kestää tämän hyvin, kun se kerrotaan
  keksintönä ja työnä eikä kurjuuden kuvauksena. Terveyshaitat
  mainitaan yhdellä lauseella, ei enempää.

### 5. Isoisä saapui kaupunkiin, jossa likavedet olivat vielä kadulla — työmaa alkoi juuri sinä vuonna

James Hobrecht oli laatinut Berliinin laajenemissuunnitelman jo
1862, mutta hänet oli erotettu ennen kuin se valmistui. Hän lähti
Stettiniin rakentamaan vesijohtoa ja viemäriä, ja palasi Berliiniin
1869 saatuaan tehtäväkseen koko kaupungin viemäröinnin. Kaksi
liittolaista teki sen mahdolliseksi: hänen veljensä Arthur Hobrecht,
josta tuli Berliinin ylipormestari 1872, ja lääkäri-poliitikko Rudolf
Virchow. Hobrecht suunnitteli kahdentoista pääsuunnan säteittäisen
järjestelmän, joka johti jätevedet kaupungin laidalle
sadetuskentille. **Pääputkien rakentaminen alkoi 1873**, ja viimeinen
valmistui 1893. Samalla miehellä teetettiin sen jälkeen viemärit 30
saksalaiseen kaupunkiin sekä Moskovaan, Tokioon ja Kairoon.

- **Paikka:** Berliini, koko kaupunki; Hobrechtin muistolaatta
  Hallesches Ufer 78. Lähin koordinaatti, joka rajapinnasta saatiin:
  Charité 52,5267°N, 13,3797°E (Virchow'n työpaikka) —
  **Hobrechtille itselleen ei ole koordinaattia**.
- **Lähde:** en.wikipedia.org/wiki/James_Hobrecht, osio "Biography".
- **Lainaus/perustelu:** *"he was able to return to Berlin in 1869,
  where he was commissioned to build a sewer system for the city. This
  was enabled by his brother Arthur Hobrecht, who became lord mayor of
  Berlin in 1872, and Rudolf Virchow… He laid out plans for a radial
  system of 12 main routes of canalization from the city to new sewage
  farms on the outskirts of Berlin. Soon after his brother took
  office, the grand pipes were constructed from 1873 until the last
  one in 1893. While the works were ongoing, he was called to help
  with the planning of the sewer systems of 30 German cities and the
  sewer systems in Moscow, Tokyo, and Cairo."*
- **Kuva:** Commons **Canalisation von Berlin. Blatt 10.png**
  (3600×2945, public domain, James Hobrecht, 1884) — Hobrechtin oma
  viemärikartta. Iso, tarkka ja aikalainen. Vaihtoehto:
  **Bebauungsplan der Umgebungen Berlins - Hobrecht-Plan 1862.png**
  (2056×1500, CC BY-SA 3.0, S. Gollin) tai **James Hobrecht.jpg**
  (946×1266, PD).
- **Varmuus:** VARMA — suoraan lähteessä. **EI VAHVISTETTU tässä
  haussa:** millainen Berliinin katujen tilanne oli tarkalleen ennen
  1873 (avoviemärit, rännit). Lähde puhuu koleraepidemiasta 1868 ja
  "katastrofaalisista asuinoloista", muttei kuvaa katukuvaa. Käytä
  siis muotoa "viemäriä ei vielä ollut" — älä maalaile.
- **KYTKÖS:** Tokio, Moskova ja Kairo ovat kaikki pelin kohteita
  (maailmankartta.js). Yksi berliiniläinen insinööri kulkee niiden
  kaikkien alle — hyvä kaaren pikkukoukku.

### 6. Berliinissä posti kulki putkessa — ja järjestelmä rakennettiin, jotta pörssikurssit ehtisivät perille

Preussin kuninkaallinen lennätinhallinto tilasi Siemens & Halskelta
Berliiniin paineilmapostin, ja ensimmäinen linja avattiin
**18. marraskuuta 1865**. Se kulki pääsähkötyslaitokselta
Französische Straßella Berliinin pörssin lennätinasemalle — eli
järjestelmän ensimmäinen tehtävä oli siirtää pörssinoteerauksia niin
nopeasti kuin fysiikka salli. Vuonna 1868 verkkoon liitettiin
Brandenburgin portin ja Potsdamer Platzin asemat, ja verkkoa oli 18
kilometriä. **Tavallinen ihminen pääsi lähettämään putkipostia vasta
1. joulukuuta 1876** — kolme vuotta isoisän matkan jälkeen: 15
konttoria, 25,9 kilometriä, kortteja ja kirjeitä 20 grammaan ja
kokoon 14 × 9 cm asti. Laajimmillaan verkko oli 1940: lähes 400
kilometriä ja noin kahdeksan miljoonaa lähetystä vuodessa.

- **Paikka:** Haupttelegraphenamt, Französische Straße 33b/c,
  Berlin-Mitte — **koordinaattia ei saatu rajapinnasta**; lähin
  annettu on Unter den Linden -alue (Neue Wache 52,5175°N,
  13,3956°E).
- **Lähde:** de.wikipedia.org/wiki/Rohrpost_in_Berlin, johdanto ja
  osiot "Anfänge" ja "Entwicklung bis zum Jahre 1945".
  **Ei en-Wikipedia-vastinetta.**
- **Lainaus/perustelu:** *"Der Betrieb der ersten Linie der
  Pneumatischen Depeschenbeförderung wurde am 18. November 1865
  aufgenommen und verlief zwischen dem ersten Haupttelegraphenamt…
  und der Telegraphenstation in der Berliner Börse… Es ging um die
  schnelle Beförderung von Börsennotierungen."* — *"Am 1. Dezember
  1876 wurde das auf 15 Rohrpostämter erweiterte Netz mit einer
  Gesamtlänge von 25,9 km der breiten Öffentlichkeit zugänglich
  gemacht. Es konnten Postkarten und Briefe bis zu einem Gewicht von
  20 Gramm (Maximalmaß: 14 cm × 9 cm) verschickt werden."* — *"Im Jahr
  1940 erreichte das Berliner Rohrpostnetz mit einer maximalen
  Streckenlänge von fast 400 km seine größte Ausdehnung… rund acht
  Millionen Sendungen jährlich."*
- **Kuva:** Commons **Rohrpost Berlin 1885.jpg** (2470×1940, public
  domain, Königlich Preußische Telegraphendirektion, 1885) —
  viranomaisen oma verkkokartta kahdentoista vuoden päästä isoisän
  matkasta.
- **Varmuus:** VARMA. **RISTIRIITA MERKITTÄVÄ:** sama artikkeli antaa
  lopetusvuodeksi kaksi eri asiaa — johdanto sanoo Länsi-Berliinissä
  1963 ja Itä-Berliinissä 1976, historiaosio sanoo *"Der Betrieb der
  Berliner Rohrpost als öffentlich zugängliches System der
  Nachrichtenübermittlung wurde 1976 endgültig eingestellt"*. **Älä
  käytä lopetusvuotta lainkaan**, tai sano "1900-luvun
  jälkipuoliskolle asti".
- **1873-KYTKÖS:** hyvä ja tarkka. Isoisän matkavuonna putkiposti oli
  olemassa mutta suljettu — sitä sai käyttää vain lennätinlaitos ja
  pörssi. Kolme vuotta myöhemmin sen sai käyttöönsä kuka tahansa.

### 7. Keisari juoksi ikkunaan, koska niin luki matkaoppaassa

Wilhelm I asui Unter den Lindenillä palatsissa, jonka
työhuoneen kadunpuoleista, aivan vasemmanpuoleisinta ikkunaa
kutsutaan **historialliseksi kulmaikkunaksi**. Keisari ilmestyi siihen
joka päivä keskipäivällä katsomaan vahdinvaihtoa vinosti vastapäätä
olevalla Neue Wachella. Tapa mainittiin **matkaoppaissa 1870-luvulta
lähtien** ja veti paikalle katsojia. Perimätiedon mukaan Wilhelm
keskeytti tärkeän neuvottelun sen takia sanoen: *"Vahti tulee, minun
täytyy ikkunaan! Ihmiset odottavat tervehdystäni — niinhän
Baedekerissä sanotaan!"* Isoisä olisi 1873 voinut seisoa siinä
joukossa. Kun keisari kuoli palatsissaan 9. maaliskuuta 1888, ikkuna
verhottiin lopullisesti.
**Sama osoite, toinen täky (ja se on tarkistuksessa kaatunut legenda):**
sitkeimpiin Berliini-tarinoihin kuuluu, ettei palatsissa ollut
kylpyhuonetta ja että keisarille kannettiin amme vastapäisestä Hotel
de Romesta. Lähde nimeää tämän legendaksi ja kertoo, että Augustan
asunnossa oli alusta asti kylpyamme, jonne Wilhelm pääsi
kierreportaita, ja että hän sai oman ammeensa 1885 — eikä käyttänyt
sitä.

- **Paikka:** Altes Palais (Kaiser-Wilhelm-Palais), Unter den Linden,
  Berlin-Mitte. **Koordinaatteja ei saatu rajapinnasta** (artikkeli
  palautti *missing* en-hakuna); lähin annettu on Neue Wache
  52,5175°N, 13,3956°E, joka on juuri se rakennus, jota keisari
  ikkunasta katsoi.
- **Lähde:** de.wikipedia.org/wiki/Altes_Palais_(Berlin), osio
  palatsin historiasta ("In der Kaiserzeit entwickelte sich das Palais
  zu einer der bedeutendsten Sehenswürdigkeiten Berlins…").
  **Ei en-vastinetta tällä sisällöllä.**
- **Lainaus/perustelu:** *"Wilhelm erschien stets am straßenseitigen
  'historischen Eckfenster' seines Arbeitszimmers ganz links im
  Erdgeschoss, um mittags den Wachaufzug Unter den Linden an der
  schräg gegenüberliegenden Neuen Wache zu beobachten. Das regelmäßig
  wiederkehrende Ereignis fand seit den 1870er Jahren in Reiseführern
  Erwähnung und lockte zahlreiche Zuschauer an."* — *"'Die Wache
  kommt, da muß ich ans Fenster! Die Leute warten auf meinen Gruß – so
  steht's im Baedeker!'"* — *"Unter großer öffentlicher Anteilnahme
  verstarb Wilhelm I. am 9. März 1888 in seinem Palais. Im Anschluss
  wurde das Eckfenster für immer verhängt."* — *"Als unausrottbar gilt
  die Legende, wonach das Palais kein Badezimmer enthielt… Dazu
  bemerkte der Oberhofbaurat Albert Geyer, es hätte sich von Anfang an
  ein Wannenbad in der Wohnung Augustas befunden."*
- **Kuva:** Commons **Altes Palais in Berlijn Das Königl. Palais.
  Berlin (titel op object) Ansichten von Deutschland Berlin und
  Potsdam (serietitel op object), RP-F-F13261.jpg** (7132×3654,
  **CC0, Rijksmuseum, kuvattu 1868–1870**) — valokuva palatsista
  kolmesta viiteen vuotta ennen isoisän matkaa. Erittäin iso ja
  vapaasti käytettävä.
- **Varmuus:** VARMA ikkunatavan ja Baedeker-sitaatin osalta (lähde
  merkitsee sitaatin muodolla *"Es ist überliefert"* = perimätietona —
  kerro se siis "kerrotaan, että hän sanoi"). **Kylpyammetarina on
  lähteen itsensä mukaan legenda** — se on täkynä käytettävissä VAIN
  purettuna, ei väitteenä.
- **MIKSI TÄMÄ ON KÄRKEÄ:** se on täsmälleen isoisän oma tilanne.
  Vuonna 1873 matkailija otti Baedekerin, meni oikeaan paikkaan
  oikeaan aikaan ja näki keisarin ikkunassa — koska kirja niin sanoi.
  Peli kertoo matkasta, jota tehdään vanhan matkakirjan mukaan.

### 8. Unter den Lindenillä oli 300 metrin luola, jossa asui hylkeitä — ja sen johtaja lähti juuri 1873 (ELÄINTÄKY)

Berliinin porvaristo halusi 1860-luvulla kaupungille eläintarhan
rinnalle kunnollisen akvaarion. Eläintieteilijä **Alfred Brehm** —
sama, jonka *Brehms Tierleben* on eläinkirjojen klassikko — hoiti
neuvottelut ja sai talon Unter den Lindenin ja Schadowstraßen
kulmaan. Rahoitus koottiin myymällä 1 500 osaketta à 200 taaleria.
Sisällä kävijä kulki **300 metriä pitkää polkua** epäsuorasti
valaistujen syvennysten ja luolien ohi; kiviaines oli tuotu eri
puolilta Saksan vuoristoja, ja "geologinen luola" ulottui molempien
kerrosten läpi näyttäen maankuoren leikkauksen. Alakerrassa olivat
vesieläimet, yläkerrassa muut: käärmeitä, liskoja, kaloja, majavia,
**hylkeitä**, papukaijoja. Avajaisiin 11. toukokuuta 1869 saapui
kuningas Wilhelm I. Yksi ongelma oli: kirkasta merivettä ei ollut
saatu keinotekoisesti aikaan, ja se onnistui vasta syksyllä 1869.
**Brehm johti taloa vuoteen 1873**, jolloin hän jätti tehtävän
seuraajalleen Otto Hermesille. Akvaario suljettiin lopullisesti
30. syyskuuta 1910, ja eläimet menivät Leipzigiin ja Frankfurtiin.

- **Paikka:** Unter den Linden 68, Schadowstraßen kulma,
  Berlin-Mitte. **Koordinaatteja ei saatu rajapinnasta** (rakennusta
  ei enää ole); lähin annettu on Unter den Lindenin alue, ks. täky 7.
- **Lähde:** de.wikipedia.org/wiki/Berliner_Aquarium_Unter_den_Linden,
  johdanto ja osiot "Vorgeschichte", "Das Gebäude" ja "Erfolg und
  Niedergang". **Ei en-vastinetta.**
- **Lainaus/perustelu:** *"Das Berliner Aquarium Unter den Linden
  bestand auf dem Grundstück Unter den Linden Nr. 68 zwischen 1869 und
  1910."* — *"Der Zoologe Alfred Brehm beteiligte sich intensiv an den
  Vorbereitungen… und wurde dessen erster Direktor."* — *"Im Inneren
  führte ein 300 Meter langer Weg die Besucher an indirekt
  beleuchteten Nischen und Grotten vorbei… Die 'Geologische Grotte'
  erstreckte sich über beide Stockwerke."* — *"Zur Eröffnung am
  11. Mai 1869 erschien König Wilhelm I. mit großem Gefolge.
  Allerdings war es bis zu diesem Zeitpunkt… nicht gelungen, für die
  Seefische des Aquariums klares, durchsichtiges Meerwasser künstlich
  herzustellen; erst im Herbst 1869 stand es in ungetrübter Qualität
  zur Verfügung."* — *"Ausgestellt wurden nicht nur Schlangen, Echsen
  und Fische, sondern auch Biber und Seehunde, Papageien und andere
  Tierarten."* — *"Alfred Brehm leitete das Unternehmen bis 1873."*
- **Kuva:** Commons **Aquarium Unter den Linden 1.jpg** (1098×741,
  public domain, tekijä tuntematon, n. 1885) — aikalaiskuva
  akvaariosta.
- **Varmuus:** VARMA — suoraan lähteessä.
- **IKÄSOPIVUUS / RAJAUS:** artikkeli kertoo myös gorilla M'Pungusta
  (1876–77), joka kuoli vuoden kuluessa saapumisestaan, ja siitä että
  seuraavien vuosien kädellisten elinajat vaihtelivat viikoista
  kolmeen vuoteen. **Tämä ei kuulu täkyyn.** Täky on rakennuksesta,
  Brehmistä ja siitä, mitä 1873 kävelevä ihminen näki — ei
  eläinkuolemista.
- **1873-KYTKÖS:** täsmällinen ja käyttökelpoinen. Isoisä olisi
  ehtinyt akvaarioon juuri sinä vuonna, kun sen kuuluisa johtaja
  jätti sen.

### 9. Gorilla, joka on yhä eläintarhan logo — vaikka kuoli 1935 (ELÄINTÄKY)

Eläinkirjailija Paul Eipper osti Marseillessa eläinvälittäjältä
kuusitoistakiloisen gorillanpoikasen ja toi sen junalla Berliiniin.
**30. maaliskuuta 1928** noin kaksivuotias **Bobby** muutti Berliinin
eläintarhaan ensimmäisenä gorillana. Hoitaja August Liebetreun
huomassa siitä kasvoi 262-kiloinen täysikasvuinen uros ja kaupungin
suosikki. Bobby kuoli umpilisäkkeen tulehdukseen 1. elokuuta 1935.
Kuoleman jälkeen kuvanveistäjä Fritz Behniltä tilattiin
graniittipatsas, joka seisoo eläintarhassa yhä, ja Bobbyn
dermoplastiikka on Luonnontieteellisessä museossa; sen tekivät
berliiniläiset preparaattorit Karl Kaestner ja Gerhard Schröder 1935
itse kehittämällään osittaisparafinointitekniikalla. Bobby innoitti
myös iskelmän *Mein Gorilla hat 'ne Villa im Zoo*, jonka Hans Albers
lauloi 1933. **Ja tärkein: Bobby koristaa eläintarhan logoa yhä
tänäänkin.**

- **Paikka:** Zoologischer Garten Berlin, 52,5083°N, 13,3375°E
  (en-Wikipedia "Berlin Zoo", coordinates). Dermoplastiikka: Museum
  für Naturkunde, 52,53°N, 13,3794°E.
- **Lähde:** de.wikipedia.org/wiki/Bobby_(Gorilla), osiot "Leben" ja
  "Ehrungen". **Ei en-artikkelia**, mutta en-Wikipedia "Museum für
  Naturkunde" vahvistaa itsenäisesti: *"'Bobby' the gorilla, a Berlin
  Zoo celebrity from the 1920s and 1930s."*
- **Lainaus/perustelu:** *"Bobby (* ca. 1926; † 1. August 1935) war ein
  männlicher Gorilla, der am 30. März 1928 – im Alter von etwa zwei
  Jahren – als erster Gorilla in den Zoologischen Garten Berlin einzog
  und bis heute das Logo des Zoos ziert."* — *"Der Tierschriftsteller
  Paul Eipper hatte das Gorillakind – damals noch 16 Kilogramm schwer
  – von einem Tierzwischenhändler in Marseille übernommen und per Zug
  nach Berlin transportiert."* — *"Unter der Obhut von Pfleger August
  Liebetreu entwickelte sich Bobby zu einem ansehnlichen,
  ausgewachsenen Gorilla mit einem Körpergewicht von 262 Kilogramm."*
  — *"Nach seinem Tod wurde bei Bildhauer Fritz Behn eine
  Granitstatue in Auftrag gegeben… Die Dermoplastik Bobbys steht im
  Museum für Naturkunde."*
- **Kuva:** Commons **2013-03 Taxidermie Gorilla Bobby
  Naturkundemuseum anagoria.JPG** (3168×4752, CC BY 3.0, Anagoria,
  2013) tai **2013-03 Naturkundemuseum Taxidermie Gorilla Bobby
  anagoria.JPG** (3000×3432, CC BY 3.0, sama tekijä).
  **SILMÄTARKISTUS:** museokuva — tarkista, ettei taustalla ole
  tunnistettavia kävijöitä.
- **Varmuus:** VARMA de-lähteen osalta; museomaininta
  ristiintarkistettu en-Wikipediasta.
- **HUOM:** logoväite on de-Wikipedian oma ("ziert bis heute das Logo
  des Zoos"). Jos se halutaan peliin, sen voi tarkistaa vielä
  eläintarhan omalta sivulta (zoo-berlin.de vastasi HTTP 200
  25.8.2026) — mutta lähdeviite on tässä.

### 10. Lehti kysyi, pitäisikö jääkarhunpoikasen antaa kuolla — ja lapset menivät kadulle (ELÄINTÄKY)

Berliinin eläintarhassa syntyi 5. joulukuuta 2006 kaksi
jääkarhunpentua. Emo Tosca hylkäsi ne, ja hoitajat nostivat pennut
aitauksesta ongenhaavilla; toinen kuoli neljän päivän kuluttua.
Marsunkokoinen **Knut** vietti ensimmäiset 44 päiväänsä
lämpökaapissa, ja sitten hoitaja Thomas Dörflein alkoi kasvattaa sitä
— nukkuen patjalla pennun laatikon vieressä, syöttäen pullosta joka
toinen tunti kalanmaksaöljyllä terästettyä äidinmaidonkorviketta.
Maaliskuussa 2007 Bild-lehti julkaisi eläinoikeusaktivistin
kannanoton, jonka mukaan pentu olisi pitänyt lopettaa eikä kasvattaa
ihmisen käsin. Vastaus oli maailmanlaajuinen: lapset seisoivat
eläintarhan edessä kylteillä "Knut Must Live" ja "We Love Knut", ja
kirjeitä tuli ympäri maailmaa. "Knutmania" toi eläintarhalle arviolta
viisi miljoonaa euroa lisää ja kävijämäärän 30 prosentin nousun —
tarhan tuottoisimman vuoden sen 163-vuotisessa historiassa. Knut
kuoli yllättäen 19. maaliskuuta 2011 nelivuotiaana. Nykyään hänet voi
nähdä Luonnontieteellisessä museossa, mutta museo korostaa, ettei
Knutia ole täytetty: kyseessä on veistos, joka on päällystetty hänen
omalla turkillaan.

- **Paikka:** Zoologischer Garten Berlin, 52,5083°N, 13,3375°E;
  museo 52,53°N, 13,3794°E (molemmat en-Wikipedia, coordinates).
- **Lähde:** en.wikipedia.org/wiki/Knut_(polar_bear), johdanto ja
  osiot "Infancy", "Controversy and media coverage" ja
  kuolemanjälkeinen osio.
- **Lainaus/perustelu:** *"Rejected by his mother at birth, he was
  raised by zookeepers… Zookeepers rescued the cubs by scooping them
  out of the enclosure with an extended fishing net… Only the size of
  a guinea pig, the cub spent the first 44 days of his life in an
  incubator."* — *"German tabloid Bild-Zeitung carried a quote by
  animal rights activist Frank Albrecht who said that Knut should have
  been killed rather than be raised by humans… A group of children
  protested at the zoo, holding up placards reading 'Knut Must Live'."*
  — *"the cub was largely responsible for a significant increase in
  revenue, estimated at €5 million… Attendance figures for the year
  increased by an estimated 30 percent, making it the most profitable
  year in its 163-year history."* — *"It's important to make clear we
  haven't had Knut stuffed. It is an artistically valuable sculpture
  with the original fur."*
- **Kuva:** Commons **Eisbär Knut - panoramio.jpg** (1600×1200,
  CC BY-SA 3.0, Arnold Schott, 14.8.2007) — elävä Knut.
  **SILMÄTARKISTUS:** eläintarhakuva, tarkista tausta.
  Museovaihtoehto: **Knut im Museum für Naturkunde 20150223
  173845.jpg** (1836×3264, **CC0**, Daniel Mietchen, 2015) —
  sama silmätarkistushuomio.
- **Varmuus:** VARMA — suoraan lähteessä.
- **HENKILÖRAJAUS (tärkeä täkynostoja varten):** aktivisti Frank
  Albrecht on ilmeisesti elossa. Raamatun "vain kuolleita henkilöitä"
  -sääntö koskee **täkynostoja**; täkytekstissä hänet voi jättää
  nimeämättä ("eläinoikeusaktivisti"), ja lähde kertoo itse, että
  Albrechtin oma tavoite oli kiinnittää huomiota lakiin, ei tappaa
  pentua. Hoitaja Thomas Dörflein kuoli 2008.
- **IKÄSOPIVUUS:** aihe on suru- ja kohuvoittoinen mutta täysin 13+
  -kelpoinen. Kuolinsyyn lääketieteelliset yksityiskohdat ja tarhaan
  lähetetty uhkausviesti EIVÄT kuulu täkyyn.

### 11. Kaupunki, joka piti vaakunaeläintään elävänä — ja jonka nimi ei tarkoita karhua vaan suota (ELÄINTÄKY)

Berliinin sinetissä on ollut karhu yhtäjaksoisesti **22. maaliskuuta
1280** lähtien; ensimmäinen todistettu sinetti on turkkurien
kiltakirjeessä, ja siinä lukee *"Sigillum burgensium de berlin sum"*,
"olen Berliinin porvarien sinetti". Vitsi on siinä, että karhulla ei
todennäköisesti ole nimen kanssa mitään tekemistä: vallitsevan
tutkimuskäsityksen mukaan paikannimi on slaavilaista perua sanasta
*berl*, "suo", ja karhu on kansanetymologiaa — puhuva vaakuna.
Berliini otti asian silti kirjaimellisesti. **17. elokuuta 1939**
kaupunki sai neljä elävää karhua, jotka asetettiin Köllnischer
Parkiin lämmitettävään tiiliseen tarhaan vallihautoineen. Sinne
muutti karhusukupolvi toisensa jälkeen: Nante ja Jette, joka synnytti
33 pentua ja jonka poikasille berliiniläiset lapset saivat ehdottaa
nimiä vuodesta 1949 ja joita ristittiin julkisissa juhlissa; sitten
Taps ja Schnute. **Viimeinen Berliinin kaupunginkarhu Schnute
lopetettiin vaikean nivelrikon takia 11. lokakuuta 2015.** Tarhasta
tehtiin 2017 taidetila.

- **Paikka:** Köllnischer Park, Berlin-Mitte. 52,5131°N, 13,4147°E
  (en-Wikipedia "Köllnischer Park", coordinates). **Huom:**
  Bärenzwinger itsellään ei ole omaa artikkelia eikä koordinaattia
  kummallakaan kielellä.
- **Lähde:** de.wikipedia.org/wiki/Berliner_Bär, osiot "1200–1900" ja
  "Bärenzwinger". **Ei en-vastinetta tällä sisällöllä.**
- **Lainaus/perustelu:** *"Die herrschende Meinung in der Forschung
  geht beim Ortsnamen von einem slawischen Ursprung aus, nämlich als
  Ableitung des Wortes berl ('Sumpf'). Der Stadtname ist bildhaft in
  ein 'Bärlein' umgesetzt. Es handelt sich hierbei um ein klassisches
  'redendes Wappen' (Volksetymologie)."* — *"Das erste nachgewiesene
  Siegel mit Bären stammt vom 22. März 1280… Das Siegel trägt die
  Inschrift 'Sigillum burgensium de berlin sum'."* — *"Als lebende
  Wappentiere wurden vier Bären am 17. August 1939 an das Märkische
  Museum in Berlin-Mitte übergeben."* — *"In dieser Zeit gebar Jette
  33 Junge… Berliner Jungen und Mädchen wurden 1949 aufgerufen,
  Namensvorschläge einzusenden."* — *"Durch die krankheitsbedingte
  Einschläferung von Schnute am 11. Oktober 2015 ist auch der letzte
  Berliner Bär verstorben."* — *"Das Bezirksamt Mitte wandelte den
  Bärenzwinger 2017 in einen Kunstort um."*
- **Kuva:** Commons **Bundesarchiv Bild 183-10721-0004, Berlin,
  Köllnischer Park, Bärenzwinger.jpg** (800×580, CC BY-SA 3.0 de,
  valokuvaaja Schack, 23.5.1951) — aikalaiskuva tarhasta.
  **SILMÄTARKISTUS:** Bundesarchiv-kuvassa voi olla tunnistettavia
  ihmisiä; vuosi 1951 pienentää riskiä muttei poista sitä. Nykyinen
  vaihtoehto ilman ihmisiä: **Sculpture bear Köllnischer Park
  Berlin-Mitte.jpg** (6000×4000, **CC0**, Singlespeedfahrer, 2022).
- **Varmuus:** VARMA de-lähteen osalta. Nimen etymologiasta lähde
  sanoo itse "herrschende Meinung" ja "Vermutungen zufolge" —
  kerro siis "tutkijoiden pääsääntöinen käsitys on", älä "nimi
  tarkoittaa".
- **PÄÄLLEKKÄISYYS:** kulttuuri-kategoriat.js sanoo jo Berliinistä
  *"Suolle rakennettu kaupunki"*. Suo on siis pelissä — **karhun ja
  suon yhteys ei ole.** Se on tämän täyn ydin.
- **IKÄSOPIVUUS:** artikkeli kertoo myös, että pito arvosteltiin
  2010-luvulla epäasianmukaiseksi eikä karhuja siirretty ajoissa. Se
  voi olla mukana yhtenä lauseena ja se sopii pelin sävyyn — se on
  rehellinen loppu, ei mässäily.

### 12. Villisiat leikkivät Berliinin leikkipuistoissa keskellä päivää (ELÄINTÄKY)

Villisika on löytänyt Berliinin. Se on ottanut kaupungin lähimetsät
elinympäristökseen ja tunkeutuu esikaupunkeihin — toisinaan aivan
keskustaan asti: toukokuussa 2003 kaksi villisikaa ilmestyi
Alexanderplatzille. Berliinin metsähallinnon arvion mukaan (tilanne
2010) kaupungin ympärillä on noin 10 000 villisikaa ja **varsinaisella
kaupunkialueella noin 4 000**. Ne kaivavat puutarhoja ja puistoja ja
penkovat roskiksia. Ja ne oppivat: älykkäät eläimet huomaavat hyvin
nopeasti, ettei asuinalueilla uhkaa metsästys, ja muuttuvat
toisinaan **päiväaktiivisiksi** — muutamassa Berliinin puistossa
poikasia voi nähdä leikkimässä keskellä kirkasta päivää. Berliinin
senaatti on säätänyt tiukan ruokintakiellon, jotta kaupunkiin ei
houkuteltaisi lisää.

- **Paikka:** koko Berliini; havainnot erityisesti Spandaun ja
  Grunewaldin metsäreunoilta. Ei omaa koordinaattia.
- **Lähde:** de.wikipedia.org/wiki/Wildschwein, osio "Vordringen in
  den städtischen Lebensraum" ja osio kaupunkikäyttäytymisestä.
  **en-Wikipedian "Wild boar" -artikkelin Berliini-maininta koskee
  vain Tierpark Berlinistä Yhdysvaltoihin vietyjä eläimiä — se EI
  kelpaa lähteeksi tähän.**
- **Lainaus/perustelu:** *"Die Anpassungsfähigkeit der Wildschweine
  zeigt sich besonders deutlich in Berlin… So mussten im Mai 2003 zwei
  Wildschweine erschossen werden, die auf dem Alexanderplatz
  auftauchten."* — *"Der Bestand an Wildschweinen rund um Berlin wird
  mittlerweile (Stand 2010) auf 10.000 Tiere geschätzt. Im
  unmittelbaren Stadtgebiet fühlen sich nach Schätzungen der Berliner
  Forstverwaltung rund 4.000 Tiere wohl."* — *"Die intelligenten Tiere
  registrieren sehr schnell, dass ihnen in Wohngebieten keine Bejagung
  droht, und werden gelegentlich sogar tagaktiv. So sind in einigen
  Berliner Stadtparks am helllichten Tag spielende Jungtiere zu
  beobachten. Der Berliner Senat hat ein strenges Fütterungsverbot
  erlassen."*
- **Kuva:** Commons **Wild boars on a playground in Berlin-Spandau
  01.jpg** (4896×2754, CC BY-SA 4.0, Leonhard Lenz, 19.3.2017) —
  villisikoja leikkipuistossa, tasan se mistä täky kertoo.
  **SILMÄTARKISTUS PAKOLLINEN:** leikkipuistokuva, tarkista ettei
  kuvassa ole lapsia eikä muita tunnistettavia ihmisiä. Varmempi
  vaihtoehto: **Wild boars in a park in Berlin-Spandau 03.jpg**
  (4896×2754, CC BY-SA 4.0, sama tekijä ja päivä).
- **Varmuus:** VARMA lähteen osalta. **VANHENTUMISVAROITUS:**
  eläinmäärät ovat vuodelta 2010 ja lähde sanoo sen itse ("Stand
  2010"). Jos luvut viedään peliin, ne on merkittävä vuosiluvulla tai
  jätettävä pois ("tuhansia").
- **SANAMUOTO:** Alexanderplatzin tapaus päättyi eläinten
  ampumiseen. Se on lähteen tieto, mutta täky ei tarvitse sitä:
  riittää "kaksi eksyi Alexanderplatzille asti".

### 13. Maailman kuuluisin fossiili myytiin lehmän hinnalla (ELÄINTÄKY)

Berliinin luonnontieteellisen museon keskushallissa on lasin alla
kivilaatta, jossa näkyy pieni hampaallinen olento siipineen,
kynsineen ja pitkine liskomaisine häntineen — ja höyhenten painaumat
ympäröivässä kivessä. Se on Archaeopteryxin **Berliinin yksilö**,
lajin kahdestatoista löydetystä yksilöstä täydellisin ja ensimmäinen,
jolla on kokonainen pää. Fossiili löytyi 1874 tai 1875 Eichstättin
lähellä Blumenbergiltä, ja löytäjä oli maanviljelijä **Jakob
Niemeyer**. Hän myi sen 1876 majatalonpitäjä Johann Dörrille — saadakseen
rahat lehmän ostoon. Dörr myi sen eteenpäin, ja vuosina 1877–1881
fossiili oli myynnissä; ostajaehdokkaisiin kuului Yalen O. C. Marsh.
Lopulta Berliinin museo osti sen **20 000 kultamarkalla**, ja kaupan
rahoitti **Ernst Werner von Siemens** — sama mies, jonka yhtiö oli
rakentanut Berliinin putkipostin (täky 6).

- **Paikka:** Museum für Naturkunde, Invalidenstraße, Berlin-Mitte.
  52,53°N, 13,3794°E (en-Wikipedia "Museum für Naturkunde Berlin",
  coordinates).
- **Lähde:** en.wikipedia.org/wiki/Archaeopteryx, osio yksilöistä
  ("Since then, twelve specimens have been recovered"); taustaksi
  en.wikipedia.org/wiki/Museum_für_Naturkunde, osiot "Dinosaur Hall"
  ja "Archaeopteryx".
- **Lainaus/perustelu:** *"The Berlin Specimen (HMN 1880/81) was
  discovered in 1874 or 1875 on the Blumenberg near Eichstätt,
  Germany, by farmer Jakob Niemeyer. He sold this precious fossil for
  the money to buy a cow in 1876, to innkeeper Johann Dörr, who again
  sold it to Ernst Otto Häberlein… Placed on sale between 1877 and
  1881, with potential buyers including O. C. Marsh of Yale
  University's Peabody Museum, it eventually was bought for 20,000
  Goldmark by the Berlin's Natural History Museum… The transaction was
  financed by Ernst Werner von Siemens."* — *"it is the most complete
  specimen, and the first with a complete head."*
- **Kuva:** Commons **Berlin Archaeopteryx.jpg** (3926×4691,
  CC BY-SA 4.0, Emily Willoughby, 2014) — koko fossiili. Vaihtoehto:
  **Archaeopteryx lithographica (Berlin specimen).jpg** (1888×2552,
  CC BY-SA 3.0, H. Raab).
- **Varmuus:** VARMA Archaeopteryx-artikkelin osalta.
  **RISTIRIITA MERKITTÄVÄ, MERKITSE:** en-Wikipedian "Museum für
  Naturkunde" -artikkeli sanoo samasta yksilöstä *"Recovered from the
  German Solnhofen limestone beds in 1871"*, kun taas
  Archaeopteryx-artikkeli sanoo *"discovered in 1874 or 1875"*.
  **Käytä muotoa "1870-luvun puolivälissä" tai jätä vuosi pois** —
  älä valitse toista lukua ilman kolmatta lähdettä. Lehmä-, hinta- ja
  Siemens-tiedot ovat vain Archaeopteryx-artikkelissa eivätkä ole
  ristiriidassa minkään kanssa.
- **1873-KYTKÖS:** hieno käänteinen. Isoisän matkavuonna maailman
  kuuluisin fossiili oli vielä maassa Baijerissa. Kolme vuotta
  myöhemmin se vaihtoi omistajaa lehmän hinnalla.

### 14. Suutari osti kapteenin univormun palasina, valtasi kaupungintalon — ja keisari armahti hänet

Wilhelm Voigt oli istunut elämänsä aikana yhteensä 25 vuoden edestä
tuomioita ja päässyt vapaaksi helmikuussa 1906. Berliinin poliisi
karkotti hänet kaupungista elokuussa pelkästään siksi, että hän oli
entinen vanki. **16. lokakuuta 1906** hän puki ylleen preussilaisen
kaartinkapteenin univormun, jonka hän oli ostanut palasina eri
kaupoista ja jonka vaikutusta sotilaisiin hän oli ensin koekäyttänyt.
Hän pysäytti kadulla neljä krenatööriä ja kersantin, otti myöhemmin
kuusi lisää ampumaradalta, vei joukkonsa junalla Köpenickiin, miehitti
kaupungintalon ja käski poliisin "huolehtia järjestyksestä" ja estää
puhelut Berliiniin tunnin ajaksi. Hän pidätytti pormestari Georg
Langerhansin ja rahastonhoitajan sekä takavarikoi kassasta **4 002
markkaa ja 37 penniä** — ja antoi kuitin, jonka hän allekirjoitti
entisen vanginvartijansa nimellä. Sitten hän vaihtoi siviilivaatteet
ja katosi. Kiinni jäätyään hänet tuomittiin neljäksi vuodeksi, mutta
keisari Wilhelm II armahti hänet 16. elokuuta 1908. Neljä päivää
vapautumisensa jälkeen Voigt oli jo vahakabinetissa Unter den
Lindenillä.

- **Paikka:** Rathaus Köpenick, Berlin-Köpenick. Köpenickin
  koordinaatti 52,4458°N, 13,5772°E (en-Wikipedia "Köpenick",
  coordinates). **Kaupungintalolla itsellään ei ole koordinaattia
  rajapinnassa.**
- **Lähde:** en.wikipedia.org/wiki/Wilhelm_Voigt, johdanto ja osiot
  "Early life", "Captain of Köpenick", "Unraveling and capture" ja
  "Aftermath".
- **Lainaus/perustelu:** *"Between 1864 and 1891, Voigt was sentenced
  to prison for a total of 25 years."* — *"He had purchased parts of
  used Prussian Guards captain's uniforms from different shops and
  tested their effect on soldiers."* — *"He had the treasurer von
  Wiltberg and mayor Georg Langerhans arrested for political
  corruption, and confiscated 4002 marks and 37 pfennigs, issuing a
  receipt for the money signed with his former prison warden's name."*
  — *"German Kaiser Wilhelm II pardoned him on 16 August 1908."* —
  *"His wax figure appeared in the wax museum in Unter den Linden four
  days after his release."*
- **Kuva:** Commons **Wilhelm Voigt 1906 10 26.jpg** (562×856, public
  domain, Preussische Polizei, päiväys **26.10.1906** eli
  pidätyspäivä) — poliisin oma kuva. Isompi ja nykyinen:
  **Berlin-Koepenick-12-Hauptmann Wilhelm Voigt-2017-gje.jpg**
  (2674×4490, CC BY-SA 4.0, Gerd Eichmann, 2017) — patsas
  kaupungintalon edessä. **SILMÄTARKISTUS:** katukuva, tarkista
  ohikulkijat.
- **Varmuus:** VARMA — suoraan lähteessä. Voigt kuoli 3.1.1922
  Luxemburgissa, eli täkynostojen "vain kuolleita" -sääntö täyttyy.
- **BRITTIKYTKÖS (todella hyvä):** lähde kertoo, että tapaus huvitti
  brittilehdistöä ja että **G. K. Chesterton** kirjoitti siitä
  *Illustrated London Newsissä* 27.10.1906: *"the point at which the
  Mayor asked for a warrant, and the Captain pointed to the bayonets
  of his soldiery and said, 'These are my authority'… One would have
  thought anyone would have known that no soldier would talk like
  that."* Jos halutaan englantilainen ääni saksalaisesta
  skandaalista, tässä se on — ja se on tarkistettu.
- **IKÄSOPIVUUS:** täysin kunnossa. Lähde puhuu myös brittiläisestä
  propagandakäytöstä; se on historiaa eikä kannanotto, mutta täkyyn
  riittää huvittunut kummastus.

### 15. Kaupungin patsaat haudattiin presidentin puutarhaan ja kaivettiin ylös 32 vuotta myöhemmin

Keisari Wilhelm II tilasi 1895 syntymäpäivänään Tiergarteniin
puistokadun, jota reunustaisi 96 valkoista marmoripatsasta:
kolmekymmentäkaksi Brandenburgin ja Preussin hallitsijaa,
kummankin takana kaksi rintakuvaa neuvonantajista. Työ vihittiin
18. joulukuuta 1901. Berliiniläiset eivät olleet vaikuttuneita: he
ristivät sen *Puppenalleeksi*, nukkekujaksi, ja keisarin
**Denkmalwillyksi**, muistomerkki-Villeksi. Jopa keisarinna oli
lähteen mukaan yrittänyt suostutella miestään luopumaan hankkeesta.
Naisia patsaissa oli yksi. Speer siirsi koko rivistön 1938 pois
suunnitellun uuden akselin tieltä. Sodan jälkeen brittiläinen
miehityshallinto purki jäänteet 1947 ja aikoi viedä ne
Teufelsbergille, Berliinin suurimmalle raunioläjälle. Maakunnan
muistomerkkivalvoja **Hinnerk Schaper** puuttui asiaan ja **hautasi
suurimman osan patsaista Schloss Bellevuen puistoon** — nykyisen
liittopresidentin virka-asunnon maahan — siinä toivossa, että ne
joskus nousisivat esiin, kun Saksa kestäisi katsoa menneisyyttään.
Ne löydettiin ja kaivettiin ylös **1979**. Nykyään säilyneet ovat
esillä Spandaun sitadellissa näyttelyssä *Enthüllt – Berlin und seine
Denkmäler* (avattu huhtikuussa 2016).

- **Paikka:** Siegesallee, Tiergarten (52,5142°N, 13,3708°E);
  hautauspaikka Schloss Bellevue (52,5175°N, 13,3533°E); nykysijainti
  Zitadelle Spandau (52,5414°N, 13,2122°E). Kaikki en-Wikipedia,
  coordinates.
- **Lähde:** en.wikipedia.org/wiki/Siegesallee, johdanto ja osiot
  "Contemporary reaction" ja "After the monarchy".
- **Lainaus/perustelu:** *"On 27 January 1895, the 36th birthday of
  William II… the Emperor's commissioning of 96 white marble
  statues… Dedicated on 18 December 1901, they consisted firstly of 32
  'main' statues… while behind each one were two busts of associates
  or advisors."* — *"It was dubbed the 'Puppenallee' (Avenue of the
  Dolls)… Berlin folklore dubbed the Kaiser Denkmalwilly (Monument
  Billy)."* — *"Just one woman was depicted."* — *"in 1947 the British
  Occupation Forces dismantled the Siegesallee remains, these
  apparently being bound for the Teufelsberg."* — *"State curator
  Hinnerk Schaper intervened, however, and buried most of the statues
  in the grounds of the nearby Schloss Bellevue… In 1979 they were
  rediscovered and disinterred."*
- **Kuva:** Commons **Berlin, Tiergarten, Berlin - Siegesallee (Zeno
  Ansichtskarten).jpg** (2152×1361, public domain, Finkenrath &
  Grasnick, 1899) — aikalaispostikortti kadusta, jota ei enää ole.
  Nykyinen: **Standbilder 2 Siegesallee Zitadelle.JPG** (800×600,
  CC BY-SA 3.0, Lienhard Schulz, 2009) — **pieni, tarkista
  riittävyys**.
- **Varmuus:** VARMA — suoraan lähteessä. **HUOM:** lähde sanoo
  brittien aikeesta "apparently being bound for the Teufelsberg" —
  siis epävarmasti. Kerro se muodossa "kerrotaan, että ne oli määrä
  viedä…".
- **1873-KYTKÖS:** ei suora, mutta kaunis pari täylle 1: sama puisto,
  sama pylväs, sama siirto 1938–39 — kaksi eri tapaa, joilla Berliini
  on kohdellut omia patsaitaan.

### 16. Bismarck haastoi hänet kaksintaisteluun — ja se makkaratarina, jonka kaikki tietävät, ei näy saksalaisissa lähteissä

Rudolf Virchow oli lääkäri, patologi ja poliitikko: hän nimesi
leukemian, kehitti ensimmäisen järjestelmällisen ruumiinavausmenetel-
män ja toi hiusanalyysin rikostutkintaan. Hän oli myös liberaalin
edistyspuolueen perustajia ja Bismarckin kärkevimpiä vastustajia
valtiopäivillä. Kun Virchow vastusti sotilasbudjettia riittävän
äänekkäästi, **Bismarck haastoi hänet kaksintaisteluun vuonna 1865**.
Virchow kieltäytyi, koska piti kaksintaistelua sivistymättömänä
tapana ratkaista riita. Ja tässä on täkyn toinen puoli: englanniksi
kerrotaan sitkeästi toisenlainen versio, "makkarakaksintaistelu", jossa
haastettu Virchow olisi saanut valita aseet ja valinnut kaksi
sianlihamakkaraa, joista toiseen oli ujutettu trikiinin toukkia —
minkä jälkeen Bismarck perääntyi. Lähde toteaa itse: saksankielisiä
asiakirjoja, jotka vahvistaisivat tämän version, ei ole.

- **Paikka:** Charité, Berlin-Mitte. 52,5267°N, 13,3797°E
  (en-Wikipedia "Charité", coordinates).
- **Lähde:** en.wikipedia.org/wiki/Rudolf_Virchow, johdanto ja osio
  "The duel challenge by Bismarck".
- **Lainaus/perustelu:** *"He was opposed to Bismarck's excessive
  military budget, which angered Bismarck sufficiently that he
  challenged Virchow to a duel in 1865. Virchow declined because he
  considered dueling an uncivilized way to solve a conflict. Various
  English-language sources purport a different version of events, the
  so-called 'Sausage Duel'… However, there are no German-language
  documents confirming this version."* — *"He was the first to
  describe and name diseases such as leukemia… He developed the first
  systematic method of autopsy, and introduced hair analysis in
  forensic investigation."*
- **Kuva:** Commons **Rudolf Ludwig Karl Virchow by Carl Günther circa
  1890.png** (689×1069, public domain, Carl Günther, n. 1890).
- **Varmuus:** VARMA sekä haasteen että sen osalta, että
  makkaraversio on vahvistamaton — **lähde sanoo molemmat itse.**
  Tämä on juuri sen tyyppinen täky, jossa Perustuslain
  totuudellisuuspilari saa loistaa: kerrotaan tarina ja sen jälkeen
  se, ettei tarina pidä paikkaansa.
- **KYTKÖS:** Virchow esiintyy myös täyssä 5 (viemäriverkko). Sama
  mies teki Berliinistä terveemmän ja kieltäytyi ampumasta
  liittokansleria.
- **HERKKYYS:** en-Wikipedian Berliinin eläintarha -artikkeli kertoo
  Virchow'n 1881 pitämästä esitelmästä, joka oli rodullistava ja
  ihmisarvoa loukkaava. **Se ei kuulu tähän täkyyn eikä mihinkään
  muuhunkaan pelitekstiin.** Jos Virchow'sta halutaan täky, se on
  tämä ja täky 5 — ei koko henkilökuva.

### 17. Rintakuvasta kiisteltiin jo sata vuotta sitten — ja kiista koskee sitä, mitä laatikossa näytettiin (HERKKYYS)

Nefertitin rintakuva löytyi Amarnasta 6. joulukuuta 1912 saksalaisen
retkikunnan kaivauksissa. Löytöjen jakoa käsiteltiin
20. tammikuuta 1913 kokouksessa, ja saksalaisen seuran omassa
arkistossa säilyneen muistion mukaan retkikunnan johtaja Ludwig
Borchardt "halusi pelastaa rintakuvan meille". Egypti on vaatinut
esineen palauttamista siitä lähtien, kun se asetettiin näytteille
1924, ja syyttää Borchardtia siitä, että tämä kääri rintakuvan niin,
ettei sen arvo näkynyt. Lähteen mukaan Borchardt näytti Egyptin
ranskalaiselle pääinspehtorille Gustave Lefebvrelle valokuvan, jossa
rintakuva ei näyttänyt parhaimmillaan, ja itse esine oli tarkastuksen
aikaan jo pakattuna laatikkoon hämärässä huoneessa; ei tiedetä,
nostiko Lefebvre sitä ylös. Borchardt ilmoitti materiaaliksi kipsin,
vaikka rintakuva on kalkkikiveä. Saksalainen seura pitää jakoa
oikeudenmukaisena ja huomauttaa, että Nefertiti oli vaihtolistan
kärjessä ja että inspehtori olisi voinut tutkia kaiken tarkasti.

- **Paikka:** Neues Museum, Museosaari. 52,5206°N, 13,3978°E
  (en-Wikipedia "Neues Museum", coordinates).
- **Lähde:** en.wikipedia.org/wiki/Nefertiti_Bust, johdanto ja osio
  "Discovery and removal from Egypt".
- **Lainaus/perustelu:** *"Egypt accuses Borchardt of 'wrapping the
  bust to conceal its value and smuggling it out of the country'."* —
  *"Borchardt 'wanted to save the bust for us', referring to
  Germany."* — *"Borchardt showed Egypt's French chief antiques
  inspector, Gustave Lefebvre, a photograph of the bust 'that didn't
  show Nefertiti in her best light'… the bust was already wrapped up
  in a box sitting in a dimly lit room. It is unknown whether Lefebre
  'went to the trouble of lifting the bust out of the box'. Borchardt
  also wrongly claimed the bust was made of gypsum, instead of
  limestone."* — *"The German Oriental Society maintains that the
  finds of the dig were divided fairly."*
- **Kuva:** Commons **Nofretete Neues Museum.jpg** (1282×1877,
  CC BY-SA 3.0, Philip Pikart, 2009). **SILMÄTARKISTUS:** museokuva.
  **ÄLÄ käytä tiedostoa "Nefertiti Bust Neues Museum Berlin.jpg" —
  se on JO PELISSÄ** (nahtavyysjutut.js, Museosaari).
- **Varmuus:** VARMA siitä, että kiista on olemassa ja mitä kumpikin
  osapuoli sanoo. **Yksikään väite ei ole ratkaistu**, ja lähde
  esittää ne väitteinä. Kerro se siis kiistana, älä tuomiona.
- **HERKKYYS (Perustuslaki 3–4):** tämä on koko listan herkin täky.
  Se koskee elävää kansainvälistä riitaa ja siirtomaa-ajan perintöä.
  **Sääntö:** molemmat osapuolet kuullaan yhtä pitkästi, kumpaakaan
  ei tuomita, eikä kysymystä ratkaista pelin puolesta. Time-lehden
  "Top 10 Plundered Artifacts" -listaus on lähteessä mutta EI kuulu
  pelitekstiin — se on kannanotto. Jos tämä tuntuu liian
  vaikealta, se on hyvä jättää varapenkille: peli ei kaipaa sitä,
  mutta jos 13+ -aineistoa halutaan, tämä on aitoa sellaista.
- **PÄÄLLEKKÄISYYS:** Museosaari ja Nefertiti ovat jo pelissä
  (nahtavyysjutut.js) — mutta vain esineenä ("3 300 vuotta vanha
  kuningatar Nefertitin rintakuva"). **Kiista ei ole pelissä.**

---

## Varapenkki (tarkistettu, ei mahtunut seitsemäntoista joukkoon)

- **Currywurstin keksijä ja hänen tavaramerkkinsä.** Herta Heuwer
  (30.6.1913 – 3.7.1999) piti kioskia Länsi-Berliinissä ja hänen
  ansiokseen luetaan currywurstin keksiminen, lähteen sanoin
  *"supposedly on 4 September 1949"*. **Tammikuussa 1951** hän
  rekisteröi kastikkeelleen tavaramerkin nimellä **Chillup**.
  Parhaimmillaan kioski oli auki yötä päivää ja työllisti 19
  myyjätärtä. Muistolaatta paljastettiin 29.6.2003, ja Berliinin
  rahapaja löi hänen kunniakseen muistomitalin 2019. Lähde:
  en.wikipedia.org/wiki/Herta_Heuwer, johdanto ja osio "Other claims
  to currywurst" — joka toteaa itse, että keksijyydestä kiistellään
  (Duisburg 1936, Hampuri) ja että ruokahistorioitsijat pitävät
  syntyä usean ihmisen työnä. Kuva tarkistettu: **Gedenktafel von
  Herta Heuwer in Berlin.jpg** (1600×1200, CC BY-SA 3.0, Jiaoe,
  2012), SILMÄTARKISTUS katukuvana. **Miksi penkille:** pelissä on jo
  currywurstin keksimisvuosi 1949 (kulttuuri-kategoriat.js,
  "Katuruoan kaupunki"). Uutta olisi vain nimi, tavaramerkki ja
  kiista — hyvä täkynosto, ohut täky. **HUOM:** laajalti kerrottua
  väitettä, että Heuwer sai ainekset brittisotilailta, EI ole
  artikkelissa; älä kerro sitä.
- **Betonisylinteri, joka todisti Berliinin seisovan hiekalla.**
  Tempelhofissa seisoo 12 650 tonnin betonisylinteri, joka rakennettiin
  1941–42 mittaamaan, kestääkö Berliinin soinen ja hiekkainen maaperä
  jättirakennuksen painon. Jos se olisi painunut alle 6 cm, maa olisi
  kelvannut; kahdessa ja puolessa vuodessa se painui **19 cm**.
  Mittaukset lopetettiin kesäkuussa 1944 ja tulokset analysoitiin
  vasta 1948. Räjäyttää sitä ei voi lähellä olevien ratapihan ja
  asuintalojen takia, ja vuodesta 1995 se on suojeltu. Lähde:
  en.wikipedia.org/wiki/Schwerbelastungskörper, johdanto ja osiot
  "Heavy load-exerting body" ja "Public perception". Kuva
  tarkistettu: **Berlin belastungskoerper.jpg** (1136×852,
  CC BY-SA 3.0, Dieter Brügmann, 2005). Koordinaatit 52,484°N,
  13,3716°E. **Miksi penkille:** kohde on natsiajan rakennushanke ja
  lähde kertoo, että sen rakensivat ranskalaiset sotavangit
  pakkotyössä. Sylinteri **liittyy täkyyn 11 kauniisti** (Berliini
  seisoo suolla ja hiekalla, ja sen sai selville betoni), mutta
  Perustuslaki 3–4 vaatii, että konteksti kerrotaan neutraalisti ja
  lyhyesti tai ei lainkaan. Fablen päätettäväksi.
- **Eläintarha, jonka ensimmäiset eläimet olivat kuninkaan lahja.**
  Berliinin eläintarha avattiin 1. elokuuta 1844, ja ensimmäiset
  eläimet lahjoitti Preussin kuningas Friedrich Wilhelm IV
  Pfaueninselin eläinkokoelmastaan ja Tiergartenin fasaanitarhasta.
  Lähde: en.wikipedia.org/wiki/Berlin_Zoological_Garden, osio
  "History". **Miksi penkille:** hyvä pohjatieto täkyihin 9 ja 10,
  mutta yksinään vain vuosiluku. **HERKKYYSVAROITUS:** saman
  artikkelin osiot "Human Zoos 1878–1932", "Third Reich" ja "World
  War II" sisältävät aineistoa, joka EI kuulu peliin — jos joku
  hakee tästä artikkelista lisää, hänen on tiedettävä se etukäteen.

---

## Hylätyt / tarkistuksessa kaatuneet

1. **Berliinin satakielet omana täkynään.** de-Wikipedian
   "Nachtigall"-artikkelista löytyi Berliini-aineistoa (Freie
   Universitätin tutkimusryhmä, Ringelnatzin runo ja muistolaatta
   Brixplatzilla, berliiniläinen sanonta *"Nachtigall, ick hör dir
   trapsen"*), mutta **ei numeroa eikä väitettä siitä, että Berliini
   olisi satakielten pääkaupunki**. Yleisesti toistettu väite jäi
   siis vahvistamatta. Ei käyttöön ilman uutta lähdettä.
2. **Berliinin eläintarhan virtahepo Knautschke ja "91 eloonjäänyttä
   3 715:stä".** Tieto on en-Wikipediassa (Berlin Zoo, osio "World
   War II") ja on aito, mutta se on sotatarina, jossa eläimet
   kuolevat. Perustuslaki 3–4 huomioiden se ei ole täky vaan
   sotakertomus. Ei käyttöön tässä erässä.
3. **Kaupunkilokit / muut kaupunkieläimet Rooman malliin.** Haettiin,
   ei löytynyt Berliinille vastaavaa lähdettyä ilmiötä. Villisiat
   (täky 12) kattavat kaupunkieläinkulman.
4. **Bärenzwinger omana artikkelinaan.** Sekä
   "Bärenzwinger (Berlin)" että "Bärenzwinger im Köllnischen Park"
   palauttivat *missing* de-Wikipediasta, ja Commonsin vastaavat
   kategoriat olivat tyhjiä. Tieto on silti varmennettu — se asuu
   artikkelin "Berliner Bär" osiossa "Bärenzwinger" (täky 11).
5. **Herta Heuwer ja brittisotilaiden Worcestershire-kastike.** Ei ole
   en-Wikipedian artikkelissa. Ei käyttöön.
6. **Keisari Wilhelmin puuttuva kylpyhuone väitteenä.** Lähde nimeää
   sen legendaksi ja kumoaa sen (täky 7). Käytettävissä vain
   purettuna.
7. **"Makkarakaksintaistelu" tositapahtumana.** Ks. täky 16 — lähde
   sanoo, ettei saksankielisiä asiakirjoja ole.

---

## Silmätarkistusta vaativat kuvat (koonti)

Nämä on katsottava silmin ennen kuin ne viedään peliin — mahdollisia
eläviä tunnistettavia ihmisiä:

1. **Wild boars on a playground in Berlin-Spandau 01.jpg** (täky 12) —
   leikkipuisto. **Korkein riski koko listalla.**
2. **Eisbär Knut - panoramio.jpg** (täky 10) — eläintarha, yleisöä.
3. **Knut im Museum für Naturkunde 20150223 173845.jpg** (täky 10) —
   museo.
4. **2013-03 Taxidermie Gorilla Bobby Naturkundemuseum anagoria.JPG**
   ja sen sisarkuva (täky 9) — museo.
5. **Berlin-Koepenick-12-Hauptmann Wilhelm Voigt-2017-gje.jpg**
   (täky 14) — katupatsas, ohikulkijoita.
6. **Gedenktafel von Herta Heuwer in Berlin.jpg** (varapenkki) —
   katulaatta.
7. **Nofretete Neues Museum.jpg** (täky 17) — museo.
8. **Bundesarchiv Bild 183-10721-0004 … Bärenzwinger.jpg** (täky 11) —
   1951, mahdollisia kävijöitä; pienempi mutta ei olematon riski.
9. **Standbilder 2 Siegesallee Zitadelle.JPG** (täky 15) —
   näyttelytila.

**Ei silmätarkistustarvetta** (aikalaispainatteita, karttoja,
fossiileja, tyhjiä rakennuskuvia): Einweihung Siegessaeule Berlin.jpg,
Palais Strousberg - Facade.jpg, Bethel Henry Strousberg.jpg,
Heinrich Zille Hinterhof.jpg, Canalisation von Berlin. Blatt 10.png,
Rohrpost Berlin 1885.jpg, Altes Palais … RP-F-F13261.jpg,
Aquarium Unter den Linden 1.jpg, Berlin Archaeopteryx.jpg,
Wilhelm Voigt 1906 10 26.jpg, Berlin, Tiergarten … Siegesallee (Zeno
Ansichtskarten).jpg, Rudolf Ludwig Karl Virchow … 1890.png,
Sculpture bear Köllnischer Park Berlin-Mitte.jpg,
Berlin belastungskoerper.jpg.

---

## Yhteenveto

**17 täkyä, kaikki tarkistettu; yksikään ei jäänyt kokonaan
vahvistamatta.** Viisi kohtaa on merkitty erikseen, koska lähde itse
epäröi tai lähteet ovat ristiriidassa: Archaeopteryxin löytövuosi
(1871 vs. 1874–75, kaksi en-artikkelia), Rohrpostin lopetusvuosi
(1963 vs. 1976, saman artikkelin sisällä), Berliinin nimen etymologia
("herrschende Meinung"), keisarin Baedeker-sitaatti ("es ist
überliefert") ja Siegesalleen patsaiden aiottu kohtalo
("apparently"). Kaksi täkyä on rakennettu nimenomaan sen varaan, että
tunnettu tarina EI pidä paikkaansa (16 makkarakaksintaistelu, 7
kylpyamme).

**Eläintäyt (Raamatun ELÄINTÄYT-vaatimus, väh. 2 per maa): kuusi.**
#8 Unter den Lindenin akvaario (hylkeet, majavat, papukaijat),
#9 Bobby-gorilla, #10 Knut, #11 Berliinin karhut, #12 villisiat,
#13 Archaeopteryx. Näistä #10, #11 ja #12 ovat söpöjä ja eläviä
(#11 ja #12 nykypäivää), #8, #9 ja #13 historiallisia.

**Kaksikielisyys:** seitsemän täkyä (4, 6, 7, 8, 9, 11, 12) nojaa
**de-Wikipediaan**, koska en-Wikipediassa ei ole vastinetta. Tämä on
uutta verrattuna Italian ja Kreikan aineistoihin, joissa kaikki
tarkistettiin en-puolelta. Jos Sonnetin QA tarkistaa aineiston, sen on
tiedettävä lukea saksaa tai luotettava tässä esitettyihin lainauksiin.

**Kolme parasta ehdotustani:**

1. **#7 — Keisari juoksi ikkunaan, koska niin luki matkaoppaassa.**
   Tämä on koko listan täydellisin osuma pelin omaan ideaan. Isoisä
   matkusti 1873 Baedeker kädessä; keisari ilmestyi kulmaikkunaan
   keskipäivällä *koska matkaoppaassa luki niin*, ja hän tiesi sen
   itse. Peli, jossa nuori herra Fogg kulkee vanhan matkakirjan
   ohjeiden mukaan, saa tässä täkynsä ja teesinsä samassa lauseessa.
   Kuva on lisäksi poikkeuksellisen hyvä: Rijksmuseumin CC0-valokuva
   samasta palatsista vuosilta 1868–70, 7132 pikseliä leveä. Ja
   päälle tulee ilmainen bonus: kylpyammelegenda, jonka lähde itse
   purkaa — täsmälleen sitä totuudellisuutta, jota Perustuslaki
   vaatii.

2. **#1 + #2 parina — Voitonpylväs 2.9.1873 ja pörssin romahdus
   9.5.1873.** Suosittelen näitä yhdessä, en erikseen. Ne ovat saman
   vuoden kaksi puolta: keväällä keisari vakuuttaa, että kaikki menee
   erinomaisesti, ja poliisi sulkee pörssin kahdeksan päivää
   myöhemmin; syksyllä sama valtakunta vihkii kultaisen
   voitonpatsaan. Isoisä käveli molempien läpi. Täky 1:llä on
   aineiston vahvin kuva (aikalaiskuva **tasan vihkiäispäivältä**),
   ja täky 2 sitoo Berliinin Wieniin ja Bukarestiin, jotka molemmat
   ovat pelissä. Tämä on se aikakausikoukku, jota Berliinistä on
   pelissä tähän asti puuttunut kokonaan.

3. **#11 — Kaupunki, joka piti vaakunaeläintään elävänä.**
   Paras eläintäky, koska siinä on kolme kerrosta yhdessä: sinetti
   vuodelta 1280, nimi joka ei tarkoita karhua vaan suota, ja
   oikeat karhut, joita pidettiin puistossa 1939–2015 ja joiden
   pentuja berliiniläiset lapset saivat nimetä. Se on söpö
   (nimikilpailu, 33 pentua), se on yllättävä (nimi = suo), ja sen
   loppu on rehellinen eikä siloteltu. Ja se osuu suoraan pelissä jo
   olevaan lauseeseen "suolle rakennettu kaupunki" täydentäen sitä
   sen sijaan että toistaisi sen.

Kunniamaininnat: **#13 (fossiili lehmän hinnalla)** on lyhin ja
iskevin yhden lauseen täky koko listalla ja kantaa suoraan
täkynostoksi; **#4 (Trockenwohner)** on paras "tästä et ole kuullut"
-täky ja ainoa, joka kertoo, millaista Gründerzeitin Berliinissä oli
tavalliselle ihmiselle; **#14 (Köpenickin kapteeni)** on paras, jos
halutaan täky, jossa on brittiääni (Chesterton) saksalaisesta
skandaalista.
