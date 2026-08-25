# Saksan fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin. Kaikki tiedot koottu 25.8.2026.
Sisarpaperi: docs/mantereet-tyoaineisto/fokuskohteet-italia.md, jonka
rakennetta tämä noudattaa rivi riviltä.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohdat
KOHDEKOROSTUS ja ETENEMINEN): pelilaattojen lisäksi fokusnäkymän
kartalla näkyy muita kaupunkeja, jokia, järviä ja vuoria; aarteen
löydyttyä niitä voi klikata, jolloin kartta korostaa juuri sen kohteen
niukalla taustalla ja avaa pienen pop-up-tietoruudun. Tämä dokumentti
on faktapohja niille pop-up-teksteille — ei lopullista pelitekstiä
eikä UI-suunnitelmaa.

## Saksan pelilaatat — mitä kartalla JO on

**Saksassa on vain YKSI pelilaatta: Berliini.** Tarkistettu koodista:

- `js/packs/maailmankartta.js` rivi 212 — `berliini`, (6279.2, 1278.3),
  lentokenttä, ja `"la":"start"` eli **lähtökaupunki**.
- `js/packs/europe.js` rivi 364 — `berliini`, (468, 512), lentokenttä.
- `CITY_COUNTRY`-taulussa (maailmankartta.js rivi 951) `"berliini"`
  on ainoa `"DEU"`-merkintä. Samoin `js/packs/europe-countries.js`
  rivi 401.
- Grep ei löytänyt laattaa Münchenille, Hampurille, Kölnille,
  Dresdenille eikä Frankfurtille kummaltakaan laudalta.
- **Fokuskohdepakkaa ei ole:** `js/packs/` sisältää
  `fokuskohteet-bgr/bih/grc/ita/rou/tur.js` mutta **ei** `-deu.js`.

Tämä on Italiaan verrattuna päinvastainen tilanne: Italiassa neljä
laattaa rajasi kohteita pois, Saksassa **koko maa Berliiniä lukuun
ottamatta on vapaana**. Alla olevista neljästätoista kohteesta
yksikään ei ole Berliini eikä ole ristiriidassa laattojen kanssa.

## Tarkistustapa

- **Koordinaatit:** en-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates`, `redirects=1`), haettu 25.8.2026
  Noden fetchillä (`NODE_USE_ENV_PROXY=1`) User-Agent-otsakkeen
  kanssa. EI yhtään koordinaattia muistista. **Kahdeksan artikkelia ei
  antanut koordinaatteja ensimmäisellä yrityksellä** (Zugspitze,
  Brocken, Neuschwanstein, Jasmund, Bayreuth Festspielhaus,
  Rothenburg, Heidelberg Castle, Rhine Gorge) — toinen tai kolmas
  yritys onnistui kaikilla paitsi Heidelberg Castlella; ks. kohde 10.
- **Popup-faktat:** en-Wikipedian artikkeleista
  (`prop=extracts&explaintext=1`, johdanto ja tarvittaessa nimetty
  alaotsikko). Jokaisen kohdan alla on artikkeli JA se osio, johon
  väite nojaa.
- **Suomenkieliset nimet:** tarkistettu fi-Wikipediasta
  (`titles=...&redirects=1`). Löytyivät: Bodenjärvi, Vattimeri,
  Schwarzwald, Hampuri, Kölnin tuomiokirkko, Rügen, Rein, Zugspitze,
  Neuschwanstein, Bayreuth, Heidelberg, Dresden, München. **Ei
  löytynyt:** *Brocken* (kokeiltu myös "Brocken (vuori)") eikä
  *Reinin laakso* — näille on merkitty saksankielinen nimi ja
  varaus.
- **Kuvat:** jokaisen ehdotetun TIEDOSTON olemassaolo, koko, MIME,
  lisenssi, tekijä, päiväys ja **Restrictions-kenttä** on tarkistettu
  Commonsin `imageinfo`-rajapinnalla. Ei arvattuja tiedostonimiä.
  **Kaikkien alla olevien Restrictions-kenttä oli tyhjä.** Kaikki ovat
  PD, CC0 tai CC BY / CC BY-SA; tekijä on merkitty, koska CC BY vaatii
  maininnan.
- **HERKKYYS-huomiot** (Raamatun Perustuslaki 3–4) on merkitty
  kohteittain kaikkialle, missä 1900-luvun historia tulee vastaan.
  Perussääntö tässä aineistossa: **tapahtuma saa olla, yksityiskohdat
  eivät.** Tuho mainitaan, tuhon kuvaus ei; jälleenrakennus ja
  ihmisten teot ovat popupin sisältö.

---

## Kohteet

### 1. Kölnin tuomiokirkko

- **Nimi:** Kölnin tuomiokirkko (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Kölner Dom.
- **Tyyppi:** kirkko / kaupunki (Köln).
- **Koordinaatit:** 50,9414°N, 6,9583°E — en-Wikipedia "Cologne
  Cathedral".
- **Popup-teksti (n. 420 merkkiä):**

  > Kölnin tuomiokirkon rakentaminen alkoi vuonna 1248 ja pysähtyi
  > 1560-luvun tienoilla — keskeneräisenä, nosturi tornin päällä.
  > Työ aloitettiin uudelleen 1814 tienoilla, mutta kunnollinen
  > rahoitus tuli vasta 1840-luvulla, ja kirkko valmistui
  > keskiaikaisten piirustusten mukaan vuonna 1880. Isoisän
  > matkavuonna tornit olivat siis vielä telineissä. Valmistuessaan
  > 157-metrinen kirkko oli maailman korkein rakennus — 632
  > rakennusvuoden jälkeen.

- **Lähde:** en-Wikipedia "Cologne Cathedral", johdanto ja osio
  "Baptistry" ("Construction of Cologne Cathedral began in 1248, but
  was halted in the years around 1560. Attempts to complete
  construction began around 1814, but the project was not properly
  funded until the 1840s. The edifice was completed to its original
  medieval plan in 1880"; "Work on Cologne Cathedral was finished in
  1880. At that time, the cathedral had a height of 157 metres,
  making it the tallest building in the world – after a total of 632
  years of construction"). Virke isoisän matkavuodesta on oma
  ajoituspäätelmäni.
- **Kuva:** Commons **2010-09 Ausschnitt Kölner Dom2 (MF).JPG**
  (4234×2780, CC BY-SA 3.0, Martin Falbisoner, 2010).
  **Aikalaisvaihtoehto:** **Gezicht op de De Dom van Keulen Der Dom,
  von St. Andreas gesehen (titel op object) Köln (serietitel op
  object), RP-F-00-779 (cropped).jpg** (1409×2146, **CC0**,
  Rijksmuseum, 1890) — valokuva vasta valmistuneesta kirkosta
  kymmenen vuotta isoisän matkan jälkeen.
- **1873-KYTKÖS:** vahva. Kirkko oli isoisän käydessä Euroopan
  kuuluisin keskeneräinen rakennustyömaa.
- **HERKKYYS:** en-artikkelissa on kuva "Cologne Cathedral stands
  intact amidst the destruction caused by Allied air raids, 9 March
  1945". Sitä EI käytetä eikä sotaa mainita popupissa — tämän kohteen
  tarina on 632 vuoden rakentaminen.

### 2. Neuschwanstein

- **Nimi:** Neuschwanstein / Neuschwansteinin linna (fi-Wikipedia,
  otsikko "Neuschwanstein").
- **Tyyppi:** linna.
- **Koordinaatit:** 47,5575°N, 10,7494°E — en-Wikipedia
  "Neuschwanstein Castle" (**toinen hakuyritys**; ensimmäinen ei
  palauttanut koordinaatteja).
- **Popup-teksti (n. 440 merkkiä):**

  > Baijerin kuningas Ludwig II halusi pois Münchenin hovista ja
  > rakennutti Alppien reunalle linnan, joka näyttää keskiaikaiselta
  > mutta on 1800-luvun työtä. Peruskivi laskettiin 5. syyskuuta
  > 1869; vuonna 1872 kellari oli valmis, ja isoisän matkavuonna
  > paikalla oli vasta perustuksia ja telineitä. Kuningas maksoi
  > kaiken omista varoistaan ja lainarahalla — ei valtion kassasta.
  > Hän kuoli 1886, ja linna avattiin yleisölle pian sen jälkeen.

- **Lähde:** en-Wikipedia "Neuschwanstein Castle", johdanto ja osio
  "Construction" ("The foundation stone for the palace was laid on
  5 September 1869; in 1872, its cellar was completed, and in 1876,
  everything up to the first floor"; "Ludwig II chose to pay for the
  palace out of his personal fortune and by means of extensive
  borrowing rather than Bavarian public funds. The castle was intended
  to serve as a private residence for the king, but he died in 1886,
  and it was opened to the public shortly after his death").
- **Kuva:** Commons **Johannes Bernhard Neuschwanstein Baustelle
  1882-85 (01).jpg** (2024×1443, **public domain**, Johannes Bernhard,
  1882–85) — **linna työmaana**, telineineen, alle kymmenen vuotta
  isoisän matkan jälkeen. Vahvin ajoituksellinen kuvaosuma tällä
  listalla. Nykykuva: **Aerial image of Neuschwanstein Castle (view
  from the northwest).jpg** (4500×2800, CC BY-SA 4.0, Carsten Steger,
  2023).
- **HUOM (RISTIRIITA):** fi-Wikipedia sanoo rakennusvuosiksi
  "1868–1892", en-Wikipedia laskee peruskivestä 5.9.1869 (1868
  purettiin vanhat rauniot). **Käytä en-versiota tai sano "1860-luvun
  lopulta 1890-luvun alkuun"**, älä valitse fi-lukua vastoin
  en-lähdettä.
- **1873-KYTKÖS:** erinomainen. Sama rakenne kuin Italian Torinossa
  (Mole Antonelliana): kuuluisa rakennus oli isoisän käydessä
  keskeneräinen työmaa.

### 3. München

- **Nimi:** München (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 48,1375°N, 11,575°E — en-Wikipedia "Munich".
- **Popup-teksti (n. 430 merkkiä):**

  > Münchenistä on ensimmäinen maininta vuodelta 1158, ja siitä tuli
  > Baijerin kuningaskunnan pääkaupunki 1806. Wittelsbachin suku
  > hallitsi vuoteen 1918. Kaupungin kuuluisin tapahtuma alkoi
  > häistä: ensimmäinen Oktoberfest pidettiin 12. lokakuuta 1810
  > kruununprinssi Ludwigin ja prinsessa Thereseneiden hääjuhlana, ja
  > juhlakenttä kantaa yhä morsiamen nimeä. Nykyään München on
  > Saksan tiheimmin asuttu kunta.

- **Lähde:** en-Wikipedia "Munich", johdanto ("The first record of
  Munich dates to 1158"; "Munich became the capital of the Kingdom of
  Bavaria in 1806"; "The House of Wittelsbach ruled until 1918"; "With
  4,800 people per km2, Munich is Germany's most densely populated
  municipality"); en-Wikipedia "Oktoberfest", johdanto ("The first
  Oktoberfest was held on 12 October 1810 to celebrate the wedding of
  Crown Prince Ludwig and Princess Therese of Saxony-Hildburghausen").
- **Kuva:** Commons **Frauenkirche Munich - View from Peterskirche
  Tower2.jpg** (3952×2464, CC BY 2.5, Diliff, 2006).
  Aikalaisvaihtoehto: **Adam Pferderennen Oktoberfest 1823.jpg**
  (660×450, public domain, Heinrich Adam, n. 1823) — **pieni**.
- **HUOM (sanamuoto):** *Theresienwiese* on nimetty morsiamen mukaan;
  tämä on yleistieto, jota en-artikkeli ei sano suoraan siinä
  muodossa. **Turvallisin muoto:** "juhlakenttä on nimetty
  Theresienwieseksi" ilman selitystä, tai selitys on haettava
  erikseen — tässä erässä sitä EI tarkistettu.
- **HERKKYYS:** en-artikkelissa on runsaasti 1920–40-luvun aineistoa
  (mm. kuva "Hitler-Putsch, München, Marienplatz"). Popupissa
  hypätään 1918:sta nykypäivään; sotienvälinen aika ei kuulu
  karttakohteen tietoruutuun.

### 4. Hampuri

- **Nimi:** Hampuri (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Hamburg, alasaksaksi Hamborg.
- **Tyyppi:** kaupunki / satama.
- **Koordinaatit:** 53,55°N, 10°E — en-Wikipedia "Hamburg".
- **Popup-teksti (n. 440 merkkiä):**

  > Hampuri oli Hansaliiton jäsen ja Pyhän saksalais-roomalaisen
  > keisarikunnan vapaakaupunki, ja **ennen Saksan yhdistymistä
  > 1871 se oli täysin itsenäinen kaupunkivaltio** — isoisän
  > matkasta vain kaksi vuotta taaksepäin. Elben suistoon
  > rakennettiin vuodesta 1883 alkaen Speicherstadt, maailman suurin
  > varastokaupunki, jonka talot seisovat tammipaaluilla veden
  > päällä. Hampurin satama on yhä Saksan suurin.

- **Lähde:** en-Wikipedia "Hamburg", johdanto ("The official name
  reflects Hamburg's history as a member of the medieval Hanseatic
  League and a free imperial city of the Holy Roman Empire. Before the
  1871 unification of Germany, it was a fully sovereign city state";
  "The Port of Hamburg is Germany's largest and Europe's
  third-largest"); en-Wikipedia "Speicherstadt", johdanto ("the
  largest warehouse district in the world where the buildings stand on
  timber-pile foundations—oak logs, in this particular case… was built
  from 1883 to 1927"; Unescon maailmanperintökohde 5.7.2015).
- **Kuva:** Commons **Hamburg, Speicherstadt, Wasserschloss -- 2016 --
  2971.jpg** (4957×3305, CC BY-SA 4.0, Dietmar Rabich, 2016).
  **SILMÄTARKISTUS:** kaupunkikuva, tarkista ohikulkijat.
- **1873-KYTKÖS:** vahva ja siisti. Isoisä olisi nähnyt kaupungin,
  joka oli juuri lakannut olemasta oma valtionsa ja jonka
  tunnetuinta rakennuskokonaisuutta ei ollut vielä aloitettu.
- **HERKKYYS:** en-artikkeli luettelee johdannossa kolme
  katastrofia, mm. vuoden 1943 pommitukset. **Popupissa ei mainita
  kumpaakaan sotaa** — Hampurin tarina on tässä satama, itsenäisyys ja
  tammipaalut.

### 5. Ylä-Keski-Reinin laakso (Reinin rotko)

- **Nimi:** **fi-Wikipediassa ei ole artikkelia "Reinin laakso"**
  (haettu, *missing*). Joki itse on fi-Wikipediassa **Rein**.
  Saksankielinen nimi: Oberes Mittelrheintal. **Karttanimeksi
  suositellaan "Reinin rotko" tai "Keski-Rein" varauksella** — Fable
  päättää.
- **Tyyppi:** jokilaakso.
- **Koordinaatit:** 50,1736°N, 7,6942°E — en-Wikipedia "Rhine Gorge"
  (uudelleenohjaa artikkeliin "Upper Middle Rhine Valley").
  **HUOM:** en-Wikipedian "Rhine"-artikkelin koordinaatti (51,9817°N,
  4,0806°E) on joen SUU **Alankomaissa** — sitä ei saa käyttää Saksan
  kartalla.
- **Popup-teksti (n. 420 merkkiä):**

  > Koblenzin ja Rüdesheimin välillä Rein kulkee 65 kilometriä
  > kapeassa rotkossa, jonka seinämät ovat kaksisataa metriä korkeat.
  > Kivi on devonikautista liusketta, ja rotko syöpyi vasta paljon
  > myöhemmin maankohoamisen aikana. Kuuluisin kohta on Loreley.
  > Rinteet on terassoitu viininviljelyyn vuosisatojen ajan, ja
  > rotkolla on oma pienilmastonsa, jossa elää lajeja, joita ei
  > muualta seudulta löydy. Unescon maailmanperintökohde 2002.

- **Lähde:** en-Wikipedia "Upper Middle Rhine Valley", johdanto
  ("Upper Middle Rhine Valley is the 65 km southern section of the
  Middle Rhine between Koblenz and Rüdesheim… added to the UNESCO list
  of World Heritage Sites in June 2002"; "The region's rocks were laid
  down in the Devonian period… The gorge was carved out during a much
  more recent uplift to leave the river contained within steep walls
  200 m high, the most famous feature being the Loreley"; "The gorge
  produces its own microclimate and has acted as a corridor for
  species not otherwise found in the region. Its slopes have long been
  terraced for agriculture, in particular viticulture").
- **Kuva:** Commons **Aerial image of the Upper Middle Rhine
  Valley.jpg** (5200×3600, CC BY-SA 4.0, Carsten Steger, 2021).
  Vaihtoehto, jos halutaan yksi kohde eikä laakso:
  **Pfalzgrafenstein Kaub fg02.jpg** (1000×665, CC BY-SA 2.5, Fritz
  Geller-Grimm, 2006) — tullilinna keskellä jokea.
- **HUOM:** Loreleyn tarusta ei tässä erässä haettu erillistä
  artikkelia. Popup mainitsee vain nimen; jos taru halutaan peliin,
  se on tarkistettava erikseen.

### 6. Bodenjärvi

- **Nimi:** Bodenjärvi (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Bodensee.
- **Tyyppi:** järvi.
- **Koordinaatit:** 47,5833°N, 9,4667°E — en-Wikipedia "Lake
  Constance".
- **Popup-teksti (n. 410 merkkiä):**

  > Bodenjärvi ei ole yksi järvi vaan kolme vesialuetta Reinin
  > varrella Alppien juurella: Yläjärvi, Alajärvi ja niitä yhdistävä
  > jokiosuus. Sen rannat kuuluvat Saksalle, Sveitsille ja
  > Itävallalle — mutta missä rajat kulkevat **järven sisällä**, siitä
  > ei ole sopimusta: kaikilla kolmella maalla on asiasta eri
  > käsitys. Rein virtaa järveen etelästä ja ulos länteen, ja Reinin
  > mukana kulkee suurin osa järven vedestä.

- **Lähde:** en-Wikipedia "Lake Constance", johdanto ("refers to three
  bodies of water on the Rhine at the northern foot of the Alps: Upper
  Lake Constance (Obersee), Lower Lake Constance (Untersee), and a
  connecting stretch of the Rhine, called the Seerhein"; "The lake is
  situated where Germany, Switzerland, and Austria meet… The actual
  locations of the country borders within the lake are disputed, with
  Austria, Germany and Switzerland all holding different opinions on
  the matter"; "The Alpine Rhine… flows into the lake from the south.
  The High Rhine flows westbound out of the lake").
- **Kuva:** Commons **Bodensee, Meersburg, reger Schiffsverkehr und
  die Nagelfluhkette im Allgäu.jpg** (4000×2000, CC BY-SA 4.0,
  JoachimKohlerBremen, 2013). **SILMÄTARKISTUS:** kuvassa on
  laivaliikennettä ja mahdollisesti matkustajia — tarkista.
- **HUOM (fi-Wikipedia bonus, ristiintarkistus):** fi-Wikipedia sanoo
  Bodenjärven olevan Keski-Euroopan kolmanneksi suurin järvi
  Balatonin ja Genevenjärven jälkeen. Tämä EI ole en-artikkelin
  johdannossa; jos luku halutaan peliin, se on merkittävä
  fi-lähteeksi tai jätettävä pois.

### 7. Zugspitze

- **Nimi:** Zugspitze (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** vuori.
- **Koordinaatit:** 47,4211°N, 10,9853°E — en-Wikipedia "Zugspitze"
  (**toinen hakuyritys**).
- **Popup-teksti (n. 420 merkkiä):**

  > Saksan korkein huippu on 2 962 metriä, ja sen läntinen laki on
  > Itävallan rajalla — vuori on siis kahden maan. Sen kyljissä ovat
  > Saksan ainoat merkittävät jäätiköt: Pohjoinen Schneeferner ja
  > Höllentalferner. Kolmas, Eteläinen Schneeferner, kutistui niin
  > paljon, että se menetti jäätikköasemansa vuonna 2022.
  > Ensimmäisenä huipulle nousi 27. elokuuta 1820 Josef Naus
  > mittausapulaisensa ja oppaansa kanssa.

- **Lähde:** en-Wikipedia "Zugspitze", johdanto ("at 2,962 m above sea
  level, is the highest peak of the Wetterstein Mountains and the
  highest mountain in Germany… the Austria–Germany border is on its
  western summit"; "On the flanks of the Zugspitze are two glaciers,
  the largest in Germany: the Northern Schneeferner… and Höllentalferner…
  Shrinking of the Southern Schneeferner led to the loss of glacier
  status in 2022"; "The Zugspitze was first climbed on 27 August 1820
  by Josef Naus; his survey assistant, Maier, and mountain guide,
  Johann Georg Tauschl").
- **Kuva:** Commons **Eibsee & Zugspitze.jpg** (3825×2519, CC BY 3.0,
  Octagon, 2009) — vuori ja Eibsee-järvi.
- **ILMASTOKYTKÖS:** vuoden 2022 jäätikkötieto on pelin
  ilmastolinssin (js/packs/linssi-ilmasto.js) kanssa samaa maailmaa —
  se kannattaa sanoa neutraalina havaintona, kuten lähde sen sanoo.

### 8. Schwarzwald

- **Nimi:** Schwarzwald (fi-Wikipedia, ei uudelleenohjausta;
  fi-artikkeli antaa käännöksen "Mustametsä").
- **Tyyppi:** vuoristo / metsäalue.
- **Koordinaatit:** 48,25°N, 8,05°E — en-Wikipedia "Black Forest".
  (Alueen likimääräinen keskipiste, ei täsmäpaikka — sama varaus kuin
  Italian aineiston Sardiniassa.)
- **Popup-teksti (n. 420 merkkiä):**

  > Lounais-Saksan metsävuoristo on noin 160 kilometriä pitkä ja
  > enimmillään 50 kilometriä leveä, ja korkein huippu Feldberg
  > kohoaa 1 493 metriin. Täältä alkavat sekä Tonava että Neckar.
  > Roomalaisille se oli Silva Marciana, "rajametsä". Alue eli pitkään
  > metsätaloudesta ja malmista; nykyään elinkeino on matkailu.
  > Puunveisto on ollut kotiteollisuutta vuosisatoja — tunnetuin
  > tuote on käkikello.

- **Lähde:** en-Wikipedia "Black Forest", johdanto ("bounded by the
  Rhine Valley to the west and south… It is the source of the Danube
  and Neckar rivers"; "a length of 160 kilometres and breadth of up to
  50 km… Its highest peak is the Feldberg with an elevation of 1,493
  metres"; "Historically, the area was known for forestry and the
  mining of ore deposits, but tourism has now become the primary
  industry"), osio "History" ("In Roman times… it was given the name
  Silva Marciana ('Marcynian Forest', from the Germanic word marka,
  'border')") ja osio "Crafts" ("Wood carving is a traditional cottage
  industry in the region… Cuckoo clocks are a popular example").
- **Kuva:** Commons **Clockmakers black forest.jpg** (1352×944,
  public domain, J. Waibel's Verlag Freiburg, L. Sigwarthin akvarellin
  mukaan, n. 1900) — **aikalaiskuva kellosepistä**, sopii peliin
  paremmin kuin nykyinen maisemakuva ja on lisäksi PD.
- **HUOM:** en-artikkelin osio "Culture" luettelee myös
  Schwarzwaldin kakun, kinkun, kirsikkaviinan ja "Black Forest
  gnomes" — jos popupiin halutaan ruokakulma, se on tässä
  tarkistettuna.

### 9. Dresden ja Frauenkirche

- **Nimi:** Dresden (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 51,05°N, 13,74°E — en-Wikipedia "Dresden".
- **Popup-teksti (n. 450 merkkiä):**

  > Dresden oli vuosisatoja Saksin vaaliruhtinaiden ja kuninkaiden
  > pääkaupunki ja hovi. Kaupungin tunnus, Frauenkirche, tuhoutui
  > toisessa maailmansodassa, ja rauniot jätettiin lähes puoleksi
  > vuosisadaksi muistomerkiksi. Vuonna 1993 alkoi työ, jossa
  > raunioläjä purettiin kivi kiveltä, jokainen käyttökelpoinen
  > kappale mitattiin ja luetteloitiin ja sen alkuperäinen paikka
  > pääteltiin. Yli 8 500 alkuperäistä kiveä pelastettiin, noin
  > 3 800 palasi paikalleen — ne erottuvat tummina.

- **Lähde:** en-Wikipedia "Dresden", johdanto ("Dresden has a long
  history as the capital and royal residence for the Electors and
  Kings of Saxony"); en-Wikipedia "Frauenkirche, Dresden", johdanto ja
  osio jälleenrakennuksesta ("Destroyed during the Allied firebombing
  of Dresden towards the end of World War II, the church was
  reconstructed between 1994 and 2005"; "the remaining ruins were left
  for nearly half a century as a war memorial"; "A rubble-sorting
  ceremony started the event in January 1993"; "The heap of rubble was
  documented and carried off stone by stone. The approximate original
  position of each stone could be determined from its position in the
  heap. Every usable piece was measured and catalogued"; "more than
  8,500 original stones were salvaged from the original church and
  approximately 3,800 reused in the reconstruction… As the older
  stones are covered with a darker patina… the difference between old
  and new stones will be clearly visible for many years").
- **Kuva:** Commons **FrauenkircheCataloguedFragments gobeirne.jpg**
  (2196×3426, CC BY 2.5, Greg O'Beirne, syyskuu 1999) —
  **luetteloidut kivenkappaleet riveissä maassa.** Tämä on koko
  listan paras kuva pelin oman idean kannalta: aarteen palauttaminen
  palasista. Kokonaiskuva: **Luftbild Frauenkirche Dresden
  2014-03-29 - 2.JPG** (2709×1814, **CC0**, Carsten Pietzsch, 2014).
  **SILMÄTARKISTUS:** kivikuva on ulkona — tarkista ihmiset.
- **HERKKYYS (tärkein tässä aineistossa):** Dresdenin pommitus on
  yksi 1900-luvun raskaimmista aiheista. **Popup-teksti sanoo sen
  yhdellä lauseella ilman yhtään yksityiskohtaa ja käyttää loput
  tilastaan siihen, miten kirkko rakennettiin takaisin.** Uhrilukuja,
  päivämääriä eikä pommituksen kuvausta EI oteta mukaan. Lähde kutsuu
  jälleenrakennettua kirkkoa sovinnon symboliksi ("a symbol of
  reconciliation between former warring enemies") — se on oikea sävy,
  mutta senkin voi sanoa tekona eikä julistuksena.

### 10. Heidelberg ja Suuri tynnyri

- **Nimi:** Heidelberg (fi-Wikipedia, ei uudelleenohjausta).
  Tynnyrin saksankielinen nimi: Großes Fass.
- **Tyyppi:** kaupunki (ja linna).
- **Koordinaatit:** 49,4167°N, 8,7167°E — en-Wikipedia "Heidelberg".
  **HUOM:** en-Wikipedian "Heidelberg Castle" EI palauta
  koordinaatteja koordinaattirajapinnasta (kokeiltu kahdesti);
  koordinaatit on siksi otettu kaupungin artikkelista, kuten Italian
  aineistossa tehtiin Materan kohdalla.
- **Popup-teksti (n. 440 merkkiä):**

  > Heidelbergin yliopisto perustettiin 1386, ja se on Saksan vanhin;
  > kaupungin noin 163 000 asukkaasta suunnilleen neljännes on
  > opiskelijoita. Linnan kellarissa on toista sataa vuotta ennen
  > isoisän matkaa rakennettu Suuri tynnyri: vuoden 1751 mitoituksella
  > siihen mahtui 221 726 litraa viiniä, ja sen tekemiseen kerrotaan
  > menneen 130 tammea. Viininsäilytykseen sitä on käytetty harvoin
  > — sen päälle rakennettiin tanssilattia.

- **Lähde:** en-Wikipedia "Heidelberg", johdanto ("with a population
  of about 163,000, of which roughly a quarter consists of students";
  "Heidelberg University, founded in 1386, is Germany's oldest");
  en-Wikipedia "Heidelberg Tun", johdanto ("In 1751, the year of its
  construction, the present one had a capacity of 221,726 litres… One
  hundred and thirty oak trees were reputedly used in its
  construction. It has only rarely been used as a wine barrel, and in
  fact presently enjoys more use as a tourist attraction, and also as
  a dance floor since one was constructed on top of the tun").
- **Kuva:** Commons **Grossesfass.jpg** (1500×2000, public domain,
  Ramessos, 2008) — itse tynnyri.
- **VARMUUS:** tammien määrästä lähde sanoo itse *"reputedly"* —
  kerro "kerrotaan menneen 130 tammea", älä "meni".
- **HUOM:** en-artikkeli kertoo myös Perkeo-tarun (hovinarri
  tynnyrin ikuisena vartijana) ja ranskalaisten sotilaiden kirveenjäljet
  tynnyrissä. Ne on tarkistettu ja käytettävissä, mutta lähde nimeää
  Perkeon "according to tradition and local legend" — legendana siis.

### 11. Brocken

- **Nimi:** **fi-Wikipediassa ei ole artikkelia** (haettu "Brocken" ja
  "Brocken (vuori)", molemmat *missing*). Karttanimeksi
  **Brocken** sellaisenaan; vaihtoehtoinen saksalainen nimi
  Blocksberg.
- **Tyyppi:** vuori (Harz).
- **Koordinaatit:** 51,8006°N, 10,6172°E — en-Wikipedia "Brocken"
  (**toinen hakuyritys**).
- **Popup-teksti (n. 440 merkkiä):**

  > Pohjois-Saksan korkein vuori on vain 1 141 metriä, mutta se
  > käyttäytyy kuin tuhat metriä korkeampi: puurajan yläpuolella on
  > lunta syyskuusta toukokuuhun, vuosikeskilämpötila on 2,9 astetta
  > ja huippu on sumun peitossa jopa 300 päivänä vuodessa. Sumu
  > synnyttää Brockenin haamun: kiipeäjän varjo lankeaa sumuun ja
  > kasvaa jättiläiseksi. Vuori on aina liitetty noitiin ja
  > paholaisiin, ja Goethe käytti niitä taruja Faustissa.

- **Lähde:** en-Wikipedia "Brocken", johdanto ("a 1,141 m mountain
  near Schierke… The highest peak in the Harz mountain range, and in
  Northern Germany, it is subalpine, yet has a microclimate resembling
  that of mountains nearly 1,000 m higher. The elevation above its
  tree line tends to have snowcover from September to May, and mists
  and fogs shroud it up to 300 days a year. The mean annual
  temperature is only 2.9 °C"; "Brocken has always played a role in
  legends and has been connected with witches and devils; Johann
  Wolfgang von Goethe took up the legends in his two-part tragic play
  Faust. The Brocken spectre is a common phenomenon on this misty
  mountain, where a climber's shadow cast upon fog creates eerie
  optical effects"; "A narrow-gauge steam railway, the Brocken
  Railway, takes visitors to the railway station at an elevation of
  1,125 m").
- **Kuva:** Commons **Brockenbahn.jpg** (1824×1368, CC BY-SA 3.0,
  Nawi112, 2008) — kapearaiteinen höyryjuna vuorella.
  **SILMÄTARKISTUS:** junakuva, matkustajia mahdollisesti näkyvissä.
  Vaihtoehto ilman ihmisiä: **Brocken vom Torfhaus.jpg** (786×544,
  public domain, Axel Hindemith, 2006) — **pieni**.
- **HUOM:** Brockenin rautatie ei ollut olemassa 1873 (en-artikkeli ei
  anna avausvuotta johdannossa; sitä EI tarkistettu tässä erässä).
  **Älä väitä popupissa, että isoisä olisi voinut mennä junalla.**

### 12. Rügen ja Jasmundin liitukalliot

- **Nimi:** Rügen (fi-Wikipedia, ei uudelleenohjausta).
  Kansallispuisto: Nationalpark Jasmund.
- **Tyyppi:** saari / kalliorannikko.
- **Koordinaatit:** 54,55°N, 13,65°E — en-Wikipedia "Jasmund National
  Park" (**toinen hakuyritys**).
- **Popup-teksti (n. 430 merkkiä):**

  > Rügenin koillisnurkassa Itämeri on syönyt maasta valkoiset
  > liitukalliot. Korkein niistä, Königsstuhl eli kuninkaanistuin,
  > nousee 118 metriä merenpinnasta. Kalliot ja niiden takana kasvava
  > pyökkimetsä muodostavat Saksan pienimmän kansallispuiston, vain
  > 30 neliökilometriä; sen perusti syyskuussa 1990 Itä-Saksan
  > viimeinen hallitus juuri ennen yhdistymistä. Pyökkimetsä
  > liitettiin maailmanperintöluetteloon 2011.

- **Lähde:** en-Wikipedia "Jasmund National Park", johdanto ("famous
  for containing the largest Rügen chalk cliffs in Germany, the
  highest of which is Königsstuhl… rising to 118 m above the Baltic
  Sea"; "Consisting of only 30 km2, this is the smallest national park
  in Germany. The park was founded in September 1990 by the last
  government of East Germany (GDR) prior to the German reunification";
  "On 25 June 2011 the beech forest in the park was added to the
  UNESCO World Heritage List").
- **Kuva:** Commons **Rügen Kreidefelsen Königsstuhl 2011.jpg**
  (2515×3771, CC BY 3.0, Pe-sa, 2011).
- **HUOM:** Caspar David Friedrichin maalaus *Kreidefelsen auf Rügen*
  (1818) on ilmeisin kulttuurikytkös, mutta **sitä EI tarkistettu
  tässä erässä** — jos se halutaan peliin, artikkeli ja kuva on
  haettava erikseen.

### 13. Bayreuthin juhlanäyttämö

- **Nimi:** Bayreuth (fi-Wikipedia, ei uudelleenohjausta).
  Rakennuksen nimi: Bayreuther Festspielhaus, virallisesti
  Richard-Wagner-Festspielhaus.
- **Tyyppi:** oopperatalo.
- **Koordinaatit:** 49,96°N, 11,5797°E — en-Wikipedia "Bayreuth
  Festspielhaus" (**toinen hakuyritys**).
- **Popup-teksti (n. 430 merkkiä):**

  > Richard Wagner rakennutti Bayreuthiin oopperatalon, joka on
  > omistettu pelkästään hänen omille teoksilleen. Peruskivi
  > laskettiin 22. toukokuuta 1872, Wagnerin 59. syntymäpäivänä —
  > eli isoisän matkavuonna talo oli työmaa. Ensimmäinen esitys
  > kuultiin vasta 13.–17. elokuuta 1876, kun koko Nibelungin sormus
  > esitettiin peräkkäin. Ulkoa talo on paljasta tiiltä; sisältä se on
  > puuta, ja se on suurimpia koskaan rakennettuja vapaasti seisovia
  > puurakenteita.

- **Lähde:** en-Wikipedia "Bayreuth Festspielhaus", johdanto ja osio
  "Design" ("an opera house north of Bayreuth, Germany, built by the
  19th-century German composer Richard Wagner and dedicated solely to
  the performance of his stage works"; "Ludwig II of Bavaria provided
  the primary funding for the work. The foundation stone was laid on
  22 May 1872, Wagner's 59th birthday. The building was first opened
  for the premiere of the complete four-opera cycle of Der Ring des
  Nibelungen, from 13 to 17 August 1876"; "Only the entry façade
  exhibits the typical late-19th-century ornamentation, while the
  remainder of the exterior is modest and shows mostly undecorated
  bricks. The interior is mainly wood… The Festspielhaus is one of the
  largest free-standing timber structures ever erected").
- **Kuva:** Commons **Aerial image of Bayreuth Festspielhaus (view
  from the southeast, 2024).jpg** (4000×3000, CC BY-SA 4.0, Carsten
  Steger, 2024). **Aikalaisvaihtoehto:** **Zuschauerraum des
  Bayreuther Festspielhauses (1870s engraving).png** (1029×590,
  public domain, Édouard Schuré, 1885) — katsomo piirroksena.
- **1873-KYTKÖS:** vahva ja tarkka. Wagner rahoitti taloa Ludwig
  II:n tuella samaan aikaan kun sama kuningas rakennutti
  Neuschwansteinia (kohde 2). Kaksi Saksan kuuluisinta rakennusta
  olivat isoisän matkavuonna molemmat kesken ja molemmat saman
  kuninkaan rahoilla.
- **HERKKYYS:** Bayreuthin ja Wagnerin 1900-luvun historia on
  poliittisesti latautunut. **Popup pysyy vuosissa 1872–1876.**

### 14. Vattimeri

- **Nimi:** Vattimeri (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Wattenmeer.
- **Tyyppi:** merialue / vuorovesialue.
- **Koordinaatit:** 53,9021°N, 8,2902°E — en-Wikipedia "Wadden Sea
  National Parks". **HUOM:** en-Wikipedian "Wadden Sea" -artikkeli ei
  palauta koordinaatteja; luku on siksi otettu
  kansallispuistoartikkelista, joka kattaa Saksan puolen.
- **Popup-teksti (n. 430 merkkiä):**

  > Pohjanmeren kaakkoisreunassa meri vetäytyy vuorovedessä ja
  > paljastaa liejutasankoja niin pitkälle kuin silmä kantaa. Alue
  > ulottuu Alankomaista Saksan jokisuiden ohi Tanskaan asti, noin
  > 500 kilometrin matkalla ja 10 000 neliökilometrin alalla.
  > Vattimeri on tärkeä sekä pesivien että muuttavien lintujen
  > alue — satojatuhansia kahlaajia, sorsia ja hanhia pysähtyy
  > tänne — ja se on koti sekä kirjohylkeille että hallille.

- **Lähde:** en-Wikipedia "Wadden Sea", johdanto ("an intertidal zone
  in the southeastern part of the North Sea… forming a shallow body of
  water with tidal flats and wetlands. It has high biological
  diversity and is an important area for both breeding and migrating
  birds"; "stretches from Den Helder… past the great river estuaries of
  Germany to its northern boundary at Skallingen in Denmark along a
  total coastline of some 500 km and a total area of about 10,000 km2";
  "In 2009, the Dutch and German parts of the Wadden Sea were
  inscribed on UNESCO's World Heritage List") ja osio luonnosta
  ("Hundreds of thousands of waders, ducks, and geese use the area as
  a migration stopover or wintering site"; "The Wadden Sea is an
  important habitat for both harbour and grey seals").
- **Kuva:** Commons **Phoca vitulina-face.jpg** (1527×1173, **public
  domain**, M. Buschmann, 2007) — kirjohylje, Commonsin kategoriassa
  "Phoca vitulina in Germany". Maisemakuva:
  **13-09-29-nordfriesisches-wattenmeer-RalfR-05.jpg** (4145×1798,
  CC BY-SA 3.0, Ralf Roletschek, 2013) — Pohjois-Friisin
  liejutasangot.
- **ELÄINKOHDE:** tämä on listan ainoa varsinainen eläinkohde ja
  sopii sellaisenaan myös täkynostoksi (ks. takynostot-saksa.md).
- **HUOM:** liejukävelyä (Wattwandern) EI mainita en-artikkelin
  luetuissa osioissa — älä lisää sitä popupiin ilman uutta lähdettä.

---

## Hylätyt / harkintaan jätetyt

- **Elbe** (53,9222°N, 8,7222°E — koordinaatti tarkistettu, mutta se
  on joen SUU Cuxhavenin kohdalla, ei koko joen keskipiste):
  menee kartalla päällekkäin sekä Hampurin (kohde 4) että Dresdenin
  (kohde 9) kanssa, koska molemmat ovat Elben varrella. Jätetty
  varapenkille, jos kohteita halutaan enemmän kuin neljätoista;
  silloin merkki on sijoitettava suistoon tai nimikilpi vedettävä
  jokea pitkin, kuten Italian aineistossa tehtiin Polle.
- **Leipzig** (51,34°N, 12,375°E) ja **Trier** (49,7567°N, 6,6414°E):
  koordinaatit tarkistettu ja tallessa. Kummallekaan ei löytynyt
  tässä erässä popup-tekstin arvoista yhden asian koukkua, joka ei
  olisi oppikirjafaktaa. Trier on ilmeisin seuraava, jos halutaan
  antiikin Saksa (Porta Nigra).
- **Rothenburg ob der Tauber** (49,3833°N, 10,1833°E) ja **Wartburg**
  (50,9661°N, 10,3064°E): koordinaatit tarkistettu. Molemmat ovat
  hyviä kohteita, mutta faktoja ei haettu tässä erässä.
- **Zollverein, Essen** (51,4914°N, 7,0461°E): koordinaatit
  tarkistettu. Ruhrin teollisuusperintö olisi hyvä pari
  Gründerzeit-täyille (takyt-berliini.md), mutta faktoja ei haettu.
- **Sylt** (54,9°N, 8,3333°E): koordinaatit tarkistettu; menee
  päällekkäin Vattimeren (kohde 14) kanssa.
- **Teufelsberg, Berliini** (52,4975°N, 13,2411°E): koordinaatit
  tarkistettu, mutta kohde on Berliinissä eli pelilaatan sisällä —
  ei fokuskohde vaan enintään täky. Ks. takyt-berliini.md täky 15,
  jossa Teufelsberg esiintyy sivujuonteena.

## Yhteenveto

**14 kohdetta, kaikki koordinaatit ja kaikki kuvat tarkistettu
rajapinnasta.** Kahdeksan koordinaattia vaati toisen hakuyrityksen,
yksi vaati kiertotien (Heidelberg Castle → Heidelberg), yksi otettiin
kansallispuistoartikkelista (Vattimeri) ja yksi on tarkoituksella
likiarvo (Schwarzwald = alueen keskipiste) — kaikki merkitty kohteen
kohdalle. **Kaksi kohdetta jäi ilman suomenkielistä
Wikipedia-artikkelia** (Brocken, Reinin rotko) ja on merkitty niin.

**HERKKYYS-huomiot on kirjattu kuuteen kohteeseen** (1 Köln, 3
München, 4 Hampuri, 9 Dresden, 13 Bayreuth ja epäsuorasti 12 Rügen).
Yhdessäkään popup-tekstissä ei ole 1900-luvun väkivallan
yksityiskohtia. Raskain kohde on **9 Dresden**, ja siihen on
kirjoitettu erillinen ohje: yksi lause tuhosta, loput
jälleenrakennuksesta.

**Kolme parasta ehdotustani:**

1. **#9 Dresden ja Frauenkirche.** Tämä on koko listan tärkein
   kohde, ja syy on pelin oma idea. Frauenkirchen jälleenrakennus on
   kirjaimellisesti aarteenetsintää: raunioläjä purettiin kivi
   kiveltä, jokainen käyttökelpoinen kappale mitattiin ja
   luetteloitiin, sen alkuperäinen paikka pääteltiin siitä, missä se
   läjässä makasi, ja 3 800 kiveä palasi paikalleen. Ne erottuvat
   tummina yhä. Kuva **FrauenkircheCataloguedFragments gobeirne.jpg**
   näyttää kivet riveissä maassa — se on Aarnin luettelo kivinä.
   Ja se on samalla se kohta, jossa peli voi kohdata 1900-luvun
   Saksan ilman että se kertoo yhtään kauhutarinaa: se kertoo, mitä
   ihmiset tekivät jälkeenpäin.

2. **#2 Neuschwanstein yhdessä #13 Bayreuthin kanssa.** Suosittelen
   näitä parina, ei erikseen. Molemmat olivat isoisän matkavuonna
   keskeneräisiä työmaita, ja molempia rahoitti sama mies, Baijerin
   kuningas Ludwig II: Neuschwansteinin peruskivi 5.9.1869, kellari
   valmis 1872; Bayreuthin peruskivi 22.5.1872, avajaiset 1876.
   Kaksi Saksan kuuluisinta rakennusta, kaksi tarkistettua
   päivämäärää, jotka molemmat sanovat "ei vielä". Ja Neuschwansteinin
   kuvaksi löytyi **PD-valokuva linnasta työmaana 1882–85** — pelaaja
   näkee tasan sen, mitä isoisä ei ehtinyt nähdä valmiina.

3. **#4 Hampuri.** Vahvin puhtaasti 1873-kytköksinen kaupunki koko
   listalla, ja se toimii kuten Italian Torino: Hampuri oli **ennen
   vuotta 1871 täysin itsenäinen valtio** ja lakkasi olemasta sitä
   kaksi vuotta ennen isoisän matkaa. Sen tunnetuinta rakennusta,
   tammipaalujen päälle nostettua varastokaupunkia, ei ollut vielä
   edes aloitettu — se alkoi 1883. Kohde tekee kartasta ajassa
   elävän: sama piste, kaksi eri Saksaa, kymmenen vuoden välein.

Kunniamaininnat: **#6 Bodenjärvi** on paras yhden yllätyksen kohde
(kolme maata, eikä yksikään tiedä missä raja järvessä kulkee);
**#11 Brocken** on paras, jos halutaan taru ja luonnonilmiö samassa
ruudussa (noidat, Faust, Brockenin haamu); **#14 Vattimeri** on ainoa
eläinkohde ja siksi välttämätön, jos ELÄINTÄYT-linjaus halutaan
näkyviin myös kartalla eikä vain täkyvirrassa.
