# Bosnia ja Hertsegovinan fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin, ei committia. Kaikki tiedot koottu
25.8.2026. Malli ja rakenne:
docs/mantereet-tyoaineisto/fokuskohteet-kreikka.md.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohdat
KOHDEKOROSTUS/ETENEMINEN): pelilaatan (Sarajevo) lisäksi fokusnäkymän
kartalla näkyy muita kaupunkeja, jokia, järviä ja vuoria; aarteen
löydyttyä niitä voi klikata, jolloin kartta korostaa juuri sen
kohteen niukalla taustalla ja avaa pienen pop-up-tietoruudun. Tämä
dokumentti on faktapohja niille pop-up-teksteille — ei lopullista
pelitekstiä eikä UI-suunnitelmaa. Rakenne on tarkoituksella sama kuin
Kreikan kohdelistalla, jotta koodipuolen olio (vrt.
js/packs/fokuskohteet-grc.js: `nimi`, `tyyppi`, `kuva`, `teksti`,
`lahde`, `nappi`) syntyy suoraan.

## Tarkistustapa

- **Koordinaatit:** en-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates&coprop=type|name`, `redirects=1`),
  haettu 25.8.2026 curlilla. **Ei yhtään koordinaattia muistista.**
  Rajapinta vastasi ajoittain "You are making too many requests"
  (Wikimedian kiintiö) — haut uusittu kasvavalla viiveellä
  (8 s → 16 s → 24 s), kaikki lopulta läpi.
- **Popup-faktat:** en-Wikipedian artikkeleista,
  `prop=extracts&explaintext=1`. Jokaisen nostetun faktan kohdalla
  alla on merkitty artikkeli JA mihin kohtaan artikkelia se nojaa
  (johdanto / History / nimetty alaotsikko).
- **Suomenkieliset nimet:** tarkistettu fi-Wikipediasta
  (`action=query&titles=...&redirects=1`) seuraamalla
  uudelleenohjaus perille. Kolme huomiota:
  - "Mostarin silta" **ohjautuu** fi-Wikipediassa artikkeliin
    **"Stari most"** (pienellä m:llä; en-Wikipediassa "Stari Most").
  - **"Una"** on fi-Wikipediassa **MONISELITESIVU** ("Una voi
    tarkoittaa:") — ei jokiartikkeli. Joesta puhuttaessa on
    käytettävä muotoa "Una-joki" tekstissä, koska pelkkä linkkinimi
    veisi väärään paikkaan.
  - fi-Wikipediassa EI ole artikkelia näistä: Blagaj, Vjetrenica,
    Hutovo Blato, Sutjeskan kansallispuisto, Maglić. Ne kirjoitetaan
    paikallisella nimellä ja selitetään tekstissä.
- **Commons-kuvat:** jokainen ehdotettu tiedosto on tarkistettu
  erikseen `action=query&prop=imageinfo&iiprop=size|mime|
  extmetadata|user` commons.wikimedia.orgista — koko, lisenssi,
  tekijä ja päiväys alla. **Ei arvattuja tiedostonimiä.** Kaikki ovat
  PD, CC0, CC BY tai CC BY-SA.
- Kaikki lähteet en-Wikipediasta paitsi nimien vahvistus
  fi-Wikipediasta ja kuvat Commonsista.

## 1873-kerros

Isoisä matkusti 1873, jolloin koko maa oli ottomaanien hallinnossa
(Itävalta-Unkarin miehitys alkoi 1878 Berliinin kongressin
päätöksellä, liittäminen 1908). Kohteissa, joissa tällä on väliä,
on erillinen **1873-huomio**. Sitä ei ole pakko käyttää
popup-tekstissä, mutta se on kirjoitettu näkyviin, jotta kaanoniin ei
livahda anakronismia.

---

## Kohteet

### 1. Mostar

- **Nimi:** Mostar (fi-Wikipedia, ei uudelleenohjausta). Kaupungin
  vanha silta: Stari Most / fi. "Stari most".
- **Tyyppi:** kaupunki (+ silta).
- **Koordinaatit:** 43,34361°N, 17,8075°E — en-Wikipedia "Mostar"
  (coordinates-rajapinta). **HUOM:** en-Wikipedian artikkelilla
  "Stari Most" EI ole omia koordinaatteja — käytä kaupungin pistettä.
- **Popup-teksti (438 merkkiä):**

  > Kaupunki on saanut nimensä sillanvartijoista, *mostari*, jotka
  > vartioivat Vanhaa siltaa ottomaanien aikaan. Sulttaani Suleiman
  > Suuri tilasi sillan 1557, ja sen suunnitteli Mimar Hayruddin,
  > Istanbulin suurmestarin Mimar Sinanin oppilas. Silta valmistui
  > yhdeksän vuotta myöhemmin ja oli valmistuessaan maailman levein
  > ihmiskätten tekemä kaari. Sitä ennen paikalla heilui puinen
  > riippusilta, jonka yli kuljettiin ottomaanimaantieteilijän
  > mukaan "kuolemanpelossa".

- **Lähde:** en-Wikipedia "Stari Most", johdanto ja osio "History"
  (nimi mostari-sillanvartijoista; Suleiman tilasi 1557; Mimar
  Hayruddin, Mimar Sinanin oppilas; rakentaminen kesti yhdeksän
  vuotta, valmis 974 AH = 19.7.1566–7.7.1567; "Upon its completion,
  it was the widest human-made arch in the world"; Katip Çelebi
  vanhasta puusillasta: "it swayed so much that people crossing it
  did so in mortal fear").
- **Kuva (tarkistettu):** `Mostar Old Town Panorama 2007.jpg`
  (2390×1600, **CC BY-SA 4.0**, Ramirez, 10.7.2007).
- **1873-huomio:** silta oli paikallaan ja täysin ehjä. Nykyinen
  silta on vuonna 2004 valmistunut jälleenrakennus (alkuperäinen
  tuhoutui 9.11.1993); pelin popupissa tästä riittää yksi
  neutraali lause tai ei mitään — ks. Hylätyt/rajaukset kohta 2.
- **Käänteinen lisä (varmennettu, valinnainen):** silta on ollut
  hyppypaikka pitkään, ja **muodollinen hyppykilpailu on järjestetty
  vuosittain vuodesta 1968**. Lähde: sama artikkeli, osio "Diving".

### 2. Blagajin tekija ja Bunan lähde

- **Nimi:** Blagajska tekija / Vrelo Bune (fi-Wikipediassa EI
  artikkelia kummastakaan — tarkistettu). Suomeksi tekstissä
  "Blagajin dervissiluostari Bunan lähteellä".
- **Tyyppi:** muu (lähde + rakennusryhmä).
- **Koordinaatit:** 43,257266°N, 17,903581°E — en-Wikipedia
  "Blagaj Tekke", joka **ohjautuu artikkeliin "Vrelo Bune"**
  (coordinates-rajapinta, type: river).
- **Popup-teksti (392 merkkiä):**

  > Buna-joki ei ala purosta vaan syöksyy valmiina esiin valtavasta
  > luolasta pystysuoran kallioseinän alta. Se on yksi Euroopan
  > suurimmista lähteistä: vettä tulee noin 30 kuutiometriä
  > sekunnissa, ja se on poikkeuksellisen kylmää ja kirkasta. Kallion
  > juureen, aivan lähteen viereen, rakennettiin dervissiluostari
  > viimeistään noin vuonna 1520 — sen vierashuone ja mausoleumi
  > ovat yhä pystyssä.

- **Lähde:** en-Wikipedia "Vrelo Bune", johdanto ja osiot "Vrelo
  Bune" ja "Blagaj tekke" ("...emerges from a vast cavern beneath a
  towering vertical cliff"; "The Buna's source ranks among the
  largest springs in Europe, yielding approximately 30 m^3/s of
  exceptionally cold and pristine water"; "The ensemble of the Blagaj
  Tekke likely emerged shortly after the establishment of Ottoman
  rule in Herzegovina, around 1520 at the latest"; musafirhana ja
  türbe säilyneet, musafirhana ennen vuotta 1664, korjattu 1851).
- **Kuva (tarkistettu):** `Blagaj Tekke, the spring of the Buna
  river, Bosnia and Herzegovina 01.jpg` (3000×4000, **CC0**,
  Bosancica by MK, 10.9.2024). CC0 = ei edes nimeämisvaatimusta,
  mutta merkitään silti pelin tapaan.
- **1873-huomio:** tekija oli paikallaan; musafirhana oli korjattu
  vain 22 vuotta aiemmin (1851).

### 3. Una-joki ja Unan kansallispuisto

- **Nimi:** Una-joki (fi-Wikipediassa "Una" on **moniselitesivu**,
  ks. Tarkistustapa — älä käytä paljasta muotoa "Una" linkkinimenä).
  Paikallinen: Una / Уна.
- **Tyyppi:** joki (+ kansallispuisto).
- **Koordinaatit:** **44,49527°N, 16,13499°E** — en-Wikipedia
  "Una National Park". Vaihtoehto, jos kartalla halutaan joen
  laskukohta: 45,27°N, 16,918°E — en-Wikipedia "Una (Sava)"
  (suistopiste Savaan Jasenovacin luona). **Suositus:
  kansallispuiston piste**, koska se osuu joen näyttävimpään osaan
  eikä maan pohjoisrajalle.
- **Popup-teksti (401 merkkiä):**

  > Paikallisen tarinan mukaan joen nimesivät roomalaiset: nähtyään
  > sen ensi kerran he sanoivat *una* — "ainoa", "yksi ainoa" —
  > kuvaillakseen sen kauneutta. 212 kilometrin mittainen Una on
  > täynnä koskia, putouksia ja karstilähteitä, ja sen yläjuoksu
  > kuuluu Unan kansallispuistoon. Suurin putous on Štrbački buk.
  > Joen varren tärkein kaupunki on Bihać.

- **Lähde:** en-Wikipedia "Una (Sava)", johdanto ja osio "Etymology"
  ("According to local legends, the river was named by the Romans
  who, after seeing it for the first time, said una (lat. one, as a
  reference to its unique beauty)"; kokonaispituus 212 km; "The river
  is characterized by a multitude of waterfalls, rapids, karst
  springs"; yläjuoksu kansallispuistossa; Štrbački buk suurin
  putouksista; tärkein kaupunki Bihać).
- **Kuva (tarkistettu):** `Štrbački buk 1.jpg` (4899×3266,
  **CC BY-SA 3.0**, Julian Nyča, 8.9.2018).
- **Nimiselityksen varmuus:** lähde itse sanoo "According to local
  legends" — kirjoita "tarinan mukaan", ei "nimi tulee latinasta".
- **Bihaćin koordinaatit** siltä varalta, että kaupunki halutaan
  omaksi pisteekseen: 44,8147°N, 15,8692°E (en-Wikipedia "Bihać").

### 4. Jajce

- **Nimi:** Jajce (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki (+ vesiputous).
- **Koordinaatit:** 44,34167°N, 17,26944°E — en-Wikipedia "Jajce".
- **Popup-teksti (447 merkkiä):**

  > Jajce on kaupunki, jonka keskellä on vesiputous: Pliva-joki
  > syöksyy Vrbasiin keskellä vanhaakaupunkia. Täällä oli itsenäisen
  > Bosnian kuningaskunnan viimeinen pääkaupunki, ja täällä
  > viimeinen kuningas Stjepan Tomašević otti vastaan kruununsa
  > paavi Pius II:lta. Kaupungin alla on myös Mithras-temppeli
  > 100-luvulta, yksi Euroopan parhaiten säilyneistä — se löytyi
  > vahingossa, kun yksityistaloa rakennettiin.

- **Lähde:** en-Wikipedia "Jajce", johdanto (Plivan ja Vrbasin
  yhtymäkohta), osiot "Ancient times" (Mithraeum 100-luvulta,
  kunnostettu 300-luvulla, "renowned as one of the best preserved in
  Europe", "discovered accidentally during the construction of a
  private house") ja "Banate of Jajce" ("Jajce was the final
  residence of the last Bosnian king Stjepan Tomašević where he
  received the royal crown from Pope Pius II"; ottomaanit
  teloittivat hänet 1463).
- **Kuva (tarkistettu):** `Pliva Waterfall, Jajce, 2022.jpg`
  (4032×3024, **CC0**, YxMb, 11.7.2022).
- **IKÄSOPIVUUSRAJAUS:** artikkeli kertoo kuninkaan teloituksesta;
  popup-tekstiin on otettu vain kruunaus. Jos loppu halutaan
  mainita, riittää "kuningaskunta päättyi 1463".
- **Valinnainen lisä (varmennettu):** 29.11.1943 Jajcessa pidettiin
  AVNOJ:n toinen kokous, jossa päätettiin liittovaltiollisesta
  Jugoslaviasta ja siitä, että Bosnia ja Hertsegovina on yksi sen
  tasavalloista. Sama artikkeli, osio "World War II". Tämä on
  ehkä liian raskas popupiin, mutta se on maan historian
  avainhetki — Fablen päätettäväksi.

### 5. Višegrad ja Mehmed-pasha Sokolovićin silta

- **Nimi:** Višegrad (fi-Wikipedia, ei uudelleenohjausta). Silta:
  Mehmed-paša Sokolovićin silta (fi-Wikipediassa ei omaa artikkelia
  — tarkistettu Mostarin sillan yhteydessä).
- **Tyyppi:** muu (silta) tai kaupunki.
- **Koordinaatit:** 43,78278°N, 19,29111°E — en-Wikipedia
  "Višegrad". **HUOM:** artikkelilla "Mehmed Paša Sokolović Bridge"
  EI ole omia koordinaatteja; käytä kaupungin pistettä.
- **Popup-teksti (426 merkkiä):**

  > Drina-joen yli kaartuu yksitoista kivikaarta, yhteensä 179,5
  > metriä. Sillan tilasi suurvisiiri Mehmed-pasha Sokolović
  > kotiseutunsa kunniaksi, ja sen suunnitteli sama Mimar Sinan, joka
  > rakensi sulttaanin tärkeimmät rakennukset — työ valmistui 1577.
  > Silta on Unescon maailmanperintökohde vuodesta 2007, ja se on
  > koko maailmalle tuttu Ivo Andrićin romaanista *Drinan silta*.

- **Lähde:** en-Wikipedia "Mehmed Paša Sokolović Bridge", johdanto ja
  osiot "Characteristics", "History" ja "In literature" (valmistui
  1577, Mimar Sinan, suurvisiirin toimeksianto; 11 kaarta, pituus
  179,5 m; rakennettu 1571–1577; "as a tribute to his native region";
  Unesco 2007; Andrićin 1945 ilmestynyt kirja).
- **Kuva (tarkistettu):** `Mehmed Paša Sokolović Bridge,
  Višegrad.JPG` (3531×1907, **CC BY-SA 3.0**, Pudelek / Marcin
  Szala, 8/2012).
- **1873-huomio:** silta oli paikallaan (ja on ollut vuodesta 1577).
  Kolme kaarta tuhoutui ensimmäisessä maailmansodassa ja viisi
  vaurioitui toisessa; kaikki on korjattu. Romaani ilmestyi 1945,
  eli isoisä ei sitä tuntenut.
- **Rakentajan tarina** on erillinen klikkiotsikkoehdokas, ks.
  takynostot-bosnia.md ehdokas 5.

### 6. Neretva

- **Nimi:** Neretva (fi-Wikipedia, ei uudelleenohjausta).
  Historiallinen nimi myös Narenta.
- **Tyyppi:** joki.
- **Koordinaatit:** 43,01972°N, 17,445°E — en-Wikipedia "Neretva"
  (coordinates-rajapinta, type: river; kyseessä on joen suistopiste
  Adrianmerellä Kroatian puolella). **HUOM:** jos kartalla halutaan
  piste Bosnian puolelta, valitse se pelisuunnittelullisesti
  (esim. Mostarin tai Konjicin kohdalta) — tästä faktapohjasta ei
  saa muuta varmennettua pistettä.
- **Popup-teksti (376 merkkiä):**

  > Neretva on Dinaaristen Alppien suurin karstijoki: 225 kilometriä,
  > josta 208 Bosnia ja Hertsegovinan puolella. Nimen arvellaan
  > tulevan indoeurooppalaisesta juuresta *ner*, "sukeltaa" — sama
  > juuri näkyy bosnian sanassa *roniti*. Joki on niin kylmää, että
  > Mostarin sillalta hyppääminen vaatii harjoittelua, ja sen
  > vesistössä elää poikkeuksellisen paljon kotoperäisiä kaloja.

- **Lähde:** en-Wikipedia "Neretva", johdanto ja osiot "Geography and
  hydrology" ja "Endemic and endangered species" ("Its name has been
  suggested to come from the Indo-European root *ner, meaning 'to
  dive'. The same root is seen in the Bosnian root 'roniti'"; "It is
  the largest karst river in the Dinaric Alps"; pituus 225 km, joista
  208 km BiH:ssa; "Dinaric karst water systems support 25% of the
  total of 546 fish species in Europe, many endemic"; "The degree of
  endemism in the karst ecoregion is greater than 10%"). Kylmyys:
  en-Wikipedia "Stari Most", osio "Diving" ("As the Neretva is very
  cold, this is a risky feat and requires skill and training").
- **Kuva (tarkistettu):** `Bosnia IMG 9590 Konjic Neretva river.JPG`
  (5184×3456, **CC BY-SA 3.0**, Bjoertvedt, 23.6.2012).
  (Kanjonikuva `Neretva, kaňon řeky.jpg` on myös vapaa mutta vain
  640×480 — liian pieni suurennokseen.)
- **Nimiselityksen varmuus:** lähde sanoo "has been suggested" —
  kirjoita "arvellaan", ei "nimi tulee".

### 7. Sutjeskan kansallispuisto, Perućica ja Maglić

- **Nimi:** Nacionalni park Sutjeska (fi-Wikipediassa EI artikkelia
  — tarkistettu). Suomeksi tekstissä "Sutjeskan kansallispuisto".
- **Tyyppi:** vuori / kansallispuisto.
- **Koordinaatit:** puisto 43,33333°N, 18,68333°E — en-Wikipedia
  "Sutjeska National Park". Maan korkein huippu **Maglić**
  43,28111°N, 18,73694°E — en-Wikipedia "Maglić (mountain)"
  (coprop type: mountain).
- **Popup-teksti (434 merkkiä):**

  > Puiston sydämessä on Perućica, aarniometsä jota ei ole koskaan
  > hakattu. Pyökit kasvavat siellä yli 60 metriä korkeiksi ja osa
  > puista on 300 vuotta vanhoja. Puistossa on nähty karhuja,
  > gemssejä, susia, villikissoja ja villivuohia, ja se on koti yli
  > 300 lintulajille — muun muassa maakotkalle ja muuttohaukalle.
  > Yllä kohoaa Maglić, maan korkein huippu.

- **Lähde:** en-Wikipedia "Sutjeska National Park", osiot "Flora"
  ("The trees in the Perućica primeval forest have never been logged
  and some of them are as old as 300 years"; pyökit "as high as 60
  metres ... or more"; kasvilajeja 2 600) ja "Fauna" ("Bear, chamois,
  boar, wolf, pine marten and mink marten, wildcat, fox, and wild
  goats have been sighted in the park, particularly in the Perućica
  forests. The park has more than 300 species of birds ... golden
  eagle, grouse, peregrine falcon, blackbird and rock partridge").
  Maglićin korkeus (2 386 m) on **Commons-tiedoston nimestä ja
  yleistiedosta**, EI tästä artikkelista — ks. varmuushuomio.
- **Kuva (tarkistettu):** `Np sutjeska maglic.JPG` (4000×2656,
  **CC BY-SA 3.0**, Darko Gavrić, 3.7.2011) — Maglić.
  Metsäkuva: `Perućica primeval forest (7901927430).jpg`
  (3648×2736, **CC BY 2.0**, Erwan Martin, 17.8.2012).
- **VARMUUSHUOMIO:** lähde sanoo eläimistä "have been sighted" —
  kirjoita "puistossa on nähty", ei "puistossa elää". **Maglićin
  tarkkaa korkeuslukua EI varmennettu tässä erässä** en-Wikipedian
  artikkelitekstistä (vain koordinaatit); jos luku halutaan
  popupiin, se on haettava erikseen.
- **Eläintäky:** ks. takyt-sarajevo.md täky 18.

### 8. Travnik

- **Nimi:** Travnik (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 44,22639°N, 17,65972°E — en-Wikipedia "Travnik".
- **Popup-teksti (429 merkkiä):**

  > Travnik oli Bosnian kuvernöörien pääkaupunki vuosina 1699–1850 —
  > täältä maata hallittiin puolitoista vuosisataa, ja siltä ajalta
  > on jäänyt sen kulttuuriperintö. Kaupunki on Lašva-joen laaksossa
  > 514 metrin korkeudessa, ja sen yllä kohoaa Vlašić, yksi maan
  > korkeimmista vuorista (1 933 m). Vanhankaupungin keskellä,
  > linnan alta, purskahtaa esiin suuri karstilähde Plava Voda.

- **Lähde:** en-Wikipedia "Travnik", johdanto ("Historically, it was
  the capital city of the governors of Bosnia from 1699 to 1850, and
  has a cultural heritage dating from that period") ja osio
  "Geography" (Lašva-joki; 514 m; Vlašić 1 933 m, "one of the tallest
  mountains in the country", nimetty vlahien mukaan; "A large karst
  spring, the Plava Voda wellspring, rises under Vlašić mountain,
  just below Travnik Castle, in the very center of the Old Town").
- **Kuva (tarkistettu):** `Travnik western panorama.jpg`
  (4608×3456, **CC BY-SA 4.0**, Dans, 17.8.2014).
- **1873-huomio: erinomainen.** Isoisän matkan aikaan Travnik oli
  menettänyt kuvernöörin istuimen vasta 23 vuotta aiemmin — kaupunki
  oli tuoreeltaan entinen pääkaupunki.
- **Valinnainen lisä (varmennettu, eri artikkeli):** Travnikissa
  syntyi 9.10.1892 **Ivo Andrić**, ainoa Nobel-kirjallisuuspalkinnon
  saanut kirjailija entisen Jugoslavian alueelta (en-Wikipedia
  "Ivo Andrić", johdanto: "Born in Travnik in Austria-Hungary,
  modern-day Bosnia and Herzegovina"). Ks. myös
  takynostot-bosnia.md ehdokas 6.

### 9. Neum

- **Nimi:** Neum (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki (+ rannikko).
- **Koordinaatit:** 42,925°N, 17,61667°E — en-Wikipedia "Neum"
  (coprop type: city).
- **Popup-teksti (443 merkkiä):**

  > Bosnia ja Hertsegovinalla on merenrantaa 20 kilometriä, ja Neum
  > on sen ainoa kaupunki — koko maan ainoa yhteys Adrianmerelle.
  > Kaistale syntyi vuoden 1699 Karlowitzin rauhassa: Ragusan
  > tasavalta luovutti kaksi puskurivyöhykettä ottomaaneille
  > estääkseen kilpailijaansa Venetsiaa hyökkäämästä maitse. Kapea
  > käytävä katkaisee yhä Kroatian rannikon kahtia, ja siitä tuli
  > kansainvälinen raja 1991.

- **Lähde:** en-Wikipedia "Neum", johdanto ja osiot "Geography" ja
  "History" ("It is the only town on the Bosnia and Herzegovina
  coastline, making it the country's only access to the Adriatic
  Sea"; 20 km rannikkoa; "The Neum corridor dates back to the Treaty
  of Karlowitz of 1699, whereby the Republic of Ragusa was separated
  from the Dalmatian possessions of its rival Venice by two buffer
  zones ceded by Ragusa to the Ottoman Empire to prevent the
  possibility of Venice invading via land"; "Since 1991 ... the
  border ... has been an international border").
- **Kuva (tarkistettu):** `Neum, costa.jpg` (4071×2208,
  **CC BY-SA 4.0**, LBM1948, 30.3.2010). Panoraama:
  `Neum panorama 7x1.jpg` (18125×2589, CC BY 3.0, Aktron) —
  **erittäin leveä**, sopii vain kaistalenostoon, ei popupiin.
- **Miksi tämä on kartan paras yksittäinen "aha":** pelaaja näkee
  kartalta heti, että maalla on vain yksi pikkuinen kosketus mereen
  — ja saa siihen 300 vuotta vanhan syyn.

### 10. Banja Luka

- **Nimi:** Banja Luka (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 44,7725°N, 17,1925°E — en-Wikipedia "Banja Luka".
- **Popup-teksti (418 merkkiä):**

  > Maan toiseksi suurin kaupunki Vrbas-joen varrella. Nimi mainitaan
  > ensi kerran 6.2.1494, ja se tarkoittaa todennäköisesti "banin
  > niittyä" — ei kylpylää, vaikka moni niin luulee. Kaupungin
  > keskellä seisoo Kastel, jonka juuret ovat roomalaisessa
  > linnakkeessa. 1800-luvulla tänne muutti sefardijuutalaisia ja
  > trappistimunkkeja, joiden luostari antoi nimensä kokonaiselle
  > kaupunginosalle — ja maailmalle trappistijuuston.

- **Lähde:** en-Wikipedia "Banja Luka", johdanto, osiot "Name"
  ("first mentioned in a document dated 6 February 1494 ...
  interpreted as the 'Ban's meadow' ... popular etymology combines
  the modern words banja ('bath' or 'spa')"), "Roman times"
  (Kastel/Castra roomalainen linnake kaupungin keskustassa) ja
  "Ottoman rule" ("In the 19th century, Sephardic Jews and Trappists
  migrated to the city ... The Trappist monastery built in the 19th
  century lent its name to the neighbourhood of Trappisti and has
  left a significant legacy in the area through its Trappist cheese
  and its beer production").
- **Kuva (tarkistettu):** `Vrbas from Kastel Banja Luka 2019.jpg`
  (1152×864, **CC BY-SA 4.0**, 130309p, 19.7.2019). **HUOM: melko
  pieni** (1152×864) — riittää popupiin, ei koko ruudun kuvaksi.
  Jos isompaa tarvitaan, tarkista `Rijeka Vrbas i tvrdjava Kastel
  Banja Luka.jpg` erikseen (ei tarkistettu tässä erässä).
- **1873-huomio:** trappistiluostari perustettiin 1800-luvulla —
  lähde ei anna tarkkaa vuotta, joten **älä väitä että se oli
  olemassa 1873**. Sano vain "1800-luvulla".

### 11. Vjetrenican luola

- **Nimi:** Vjetrenica (fi-Wikipediassa EI artikkelia —
  tarkistettu). Nimi tarkoittaa "tuuliluolaa": lämpimänä
  vuodenaikana suusta puhaltaa voimakas kylmä ilmavirta.
- **Tyyppi:** muu (luola).
- **Koordinaatit:** 42,8458°N, 17,9839°E — en-Wikipedia
  "Vjetrenica", joka **ohjautuu artikkeliin "Vjetrenica Cave"**
  (coprop type: landmark).
- **Popup-teksti (431 merkkiä):**

  > Maan suurin luola on samalla **maailman lajirikkain luola**:
  > sieltä on löydetty yli kaksisataa lajia, joista noin 37
  > kuvattiin tieteelle ensimmäisen kerran juuri täällä. Nimi
  > tarkoittaa tuuliluolaa — kesähelteellä suuaukosta puhaltaa
  > kylmä viima keskelle kuivaa karstimaisemaa. Käytäviä on kartoitettu
  > 7 014 metriä, ja geologit arvelevat luolan ulottuvan aina
  > Adrianmerelle asti. Unescon maailmanperintökohde 2024.

- **Lähde:** en-Wikipedia "Vjetrenica Cave", johdanto ja osiot
  "Popovo Polje and cave location" ja "UNESCO nomination"
  ("the largest cave in Bosnia and Herzegovina, and the most
  biodiverse cave in the world"; "During the warmer parts of the
  year, a strong blast of cold air blows from its entrance"; "The
  cave has been explored and described to a total distance of
  7,014 m"; "geologists have predicted that Vjetrenica could stretch
  right to the Adriatic Sea in the Republic of Croatia, 15–20 km
  away from its entrance"; "among more than two hundred different
  species are registered in it ... about 37 were discovered and
  described in Vjetrenica for the first time"; "In 2024, the
  Vjetrenica Cave was designated a UNESCO World Heritage Site").
- **Kuva (tarkistettu):** `Vjetrenica Cave Inside 2024.jpg`
  (4032×3024, **CC0**, Bdx, 29.8.2024).
- **VARMUUSHUOMIO (tärkeä):** artikkeli **ei mainitse olmia**
  (*Proteus anguinus*) lainkaan. Jos popupissa halutaan puhua
  "ihmiskalasta", se on sanottava alueen tasolla ("Hertsegovinan
  karstin maanalaisissa vesissä") tai haettava erillinen lähde. Ks.
  takyt-sarajevo.md täky 16.

### 12. Hutovo Blaton lintukosteikko

- **Nimi:** Hutovo Blato (fi-Wikipediassa EI artikkelia —
  tarkistettu).
- **Tyyppi:** muu (kosteikko / luonnonsuojelualue).
- **Koordinaatit:** 43,06°N, 17,79°E — en-Wikipedia "Hutovo Blato"
  (coprop type: landmark). **HUOM:** kaksi desimaalia on karkeampi
  kuin muilla kohteilla — rajapinta antaa tälle vain tämän
  tarkkuuden.
- **Popup-teksti (424 merkkiä):**

  > Neretvan alajuoksun soilla lepää muuttomatkallaan yli 240
  > lintulajia, ja muuttoaikaan järven ympärille kerääntyy
  > kymmeniätuhansia lintuja kerralla. Alue on Ramsar-kosteikko
  > vuodesta 2001. Kosteikon läpi kulkeva Krupa-joki on Euroopassa
  > ainutlaatuinen: se virtaa **molempiin suuntiin** — kun Neretvan
  > vesi nousee, se työntää Krupan takaisin ylävirtaan.

- **Lähde:** en-Wikipedia "Hutovo Blato", johdanto ja osiot "Ramsar
  site" ja "Krupa River" ("It is home to over 240 types of migratory
  birds ... In the migration season, tens of thousands of birds fill
  the lake and its surroundings"; "Hutovo Blato since 2001" Ramsar;
  "the Krupa River is a unique river in Europe, because the river
  flows both ways ... This happens when, due to high water level and
  large quantity of water, river Neretva pushes the Krupa river in
  the opposite direction").
- **Kuva (tarkistettu):** `Hutovo Blato Wetlands 01.jpg` (3264×4896,
  **CC BY-SA 4.0**, CV1958 / Colin Viney, 21.5.2022). Pystykuva —
  huomioi popupin muoto.
- **Valinnainen lisä (varmennettu):** vuonna 2008 Mostarin ja Lundin
  yliopistojen arkeologit löysivät alueelta **Desilon**,
  illyrialaisen kauppapaikan yli 2 000 vuoden takaa — ja pohjasta
  uponneita veneitä, jotka olivat **täynnä roomalaisia
  viiniamforoita** 100-luvulta eaa. Sama artikkeli, osio "Desilo
  archaeological site". Tämä voisi olla oma täkynsä.

---

## Yhteenveto: koordinaattitaulukko

| # | Kohde | Tyyppi | Koordinaatit | Lähdeartikkeli |
|---|---|---|---|---|
| 1 | Mostar | kaupunki | 43,34361°N 17,8075°E | Mostar |
| 2 | Blagajin tekija / Vrelo Bune | muu | 43,257266°N 17,903581°E | Blagaj Tekke → Vrelo Bune |
| 3 | Una-joki / Unan kansallispuisto | joki | 44,49527°N 16,13499°E | Una National Park |
| 4 | Jajce | kaupunki | 44,34167°N 17,26944°E | Jajce |
| 5 | Višegrad (Sokolovićin silta) | muu | 43,78278°N 19,29111°E | Višegrad |
| 6 | Neretva | joki | 43,01972°N 17,445°E (suisto) | Neretva |
| 7 | Sutjeskan kansallispuisto | vuori | 43,33333°N 18,68333°E | Sutjeska National Park |
| 7b | — Maglić (huippu) | vuori | 43,28111°N 18,73694°E | Maglić (mountain) |
| 8 | Travnik | kaupunki | 44,22639°N 17,65972°E | Travnik |
| 9 | Neum | kaupunki | 42,925°N 17,61667°E | Neum |
| 10 | Banja Luka | kaupunki | 44,7725°N 17,1925°E | Banja Luka |
| 11 | Vjetrenica | muu | 42,8458°N 17,9839°E | Vjetrenica → Vjetrenica Cave |
| 12 | Hutovo Blato | muu | 43,06°N 17,79°E | Hutovo Blato |

(Vertailuksi pelilaatta **Sarajevo: 43,85639°N 18,41306°E** —
en-Wikipedia "Athens"-vastine eli "Sarajevo", ei oma kohde tässä
listassa vaan laatta itse.)

---

## Varapenkki — tarkistetut koordinaatit, ei popup-tekstiä

Nämä kuusi kohdetta on koordinaattitarkistettu samalla rajapinnalla
ja ovat valmiita otettaviksi, jos 12 kohdetta on liian vähän tai
jokin yllä olevista karsiutuu. Popup-tekstejä EI ole kirjoitettu.

| Kohde | Tyyppi | Koordinaatit | Miksi kelpaisi |
|---|---|---|---|
| Počitelj | muu (kylä) | 43,13333°N 17,73333°E | Ottomaanikylä, joka menetti merkityksensä **1878** — ja juuri siksi säilyi alkuperäisenä (en-Wikipedia "Počitelj, Čapljina", osio History). Suora 1873/1878-kytkös. |
| Kravican putous | muu (putous) | 43,154121°N 17,603672°E | Trebižat-joen 25 m korkea putousviuhka; erittäin kuvallinen. |
| Tuzla | kaupunki | 44,53806°N 18,67611°E | Nimi tarkoittaa suolaa; kaupungin alla on suolaesiintymä. (Faktat EI vielä tarkistettu.) |
| Radimljan stećak-hautausmaa | muu | 43,09222°N 17,92417°E | Keskiaikaiset stećak-hautakivet, Unescon maailmanperintöä; oma kuvakieli. |
| Trebinje | kaupunki | 42,71194°N 18,34611°E | Eteläisin kaupunki, Trebišnjica-joki. |
| Bihać | kaupunki | 44,8147°N 15,8692°E | Unan varren tärkein kaupunki. |
| Livno + Cincar | kaupunki / vuori | 43,82694°N 17,0075°E / 43,90222°N 17,06278°E | **Villihevoslauma** (yli 700 yksilöä, suojeltu 2010) — ks. takyt-sarajevo.md täky 17. Vahvin eläinkohde-ehdokas kartalle. |

---

## Hylätyt / epävarmat

1. **Kolme kohdetta jäi ilman omia koordinaatteja Wikipediassa**
   (Stari Most, Mehmed Paša Sokolović Bridge, Blagajin tekija
   erikseen). Kahdessa ensimmäisessä käytetään kaupungin pistettä
   (Mostar, Višegrad), kolmannessa artikkelin "Vrelo Bune"
   koordinaattia. Merkitty kunkin kohdan yhteyteen, jotta koodiin ei
   siirry harhaanjohtavaa tarkkuutta.

2. **Mostarin sillan tuho 1993 ja jälleenrakennus 2004.** Fakta on
   varmennettu ja se on osa kohteen nykytotuutta, mutta
   popup-tekstiin sitä EI ole otettu: aihe on sota, ja
   tehtävänannon ohje sekä Perustuslain ikäsopivuuskohta puoltavat
   varovaisuutta. Suositus: yksi neutraali lause pelin muualla
   ("silta tuhoutui sodassa 1993 ja rakennettiin uudelleen
   entisillä menetelmillä; se avattiin 2004"), ei popupissa
   dramatisoituna. Fable päättää.

3. **Maglićin korkeuslukua ei varmennettu.** en-Wikipedian
   "Maglić (mountain)" -artikkelista haettiin vain koordinaatit;
   korkeus (yleisesti 2 386 m) on tarkistettava erikseen ennen kuin
   se kirjoitetaan popupiin.

4. **Vjetrenica ja olmi.** Luola-artikkeli ei mainitse lajia. Ks.
   kohta 11 ja takyt-sarajevo.md täky 16 — tämä on koko paketin
   tärkein yksittäinen "älä oikaise" -merkintä, koska yhteys on
   niin houkutteleva.

5. **Una-joen fi-nimi.** fi-Wikipedian "Una" on moniselitesivu.
   Popup-otsikoksi "Una-joki".

6. **Banja Lukan trappistiluostarin perustamisvuosi** ei ole
   lähteessä — vain "19th century". Älä sido sitä vuoteen 1873.

7. **Bosnian pyramidit (Visoko)** EIVÄT ole kartalla kohteena.
   Ne ovat todistetusti luonnonmuodostumia ja Euroopan
   arkeologiyhdistyksen mukaan "julma huijaus"; kohteena kartalla ne
   antaisivat väärän vaikutelman. Aihe kuuluu klikkiotsikoihin
   nimenomaan **myytinmurtajana** — ks. takynostot-bosnia.md
   ehdokas 1.

8. **Medjugorje** jätettiin pois harkiten: se on maan
   kävijämäärältään merkittävimpiä kohteita, mutta aihe on
   uskonnollisesti latautunut (ilmestykset), eikä sen käsittelyyn
   ole tässä paketissa selkeää linjaa. Fablen päätettäväksi.

9. **Sarajevon oma ympäristö** (Bjelašnica, Igman, Jahorina,
   Trebević, Vrelo Bosne) jätettiin pois karttakohteista, koska
   Vrelo Bosne on jo pelissä ja loput ovat käytännössä laatan
   sisällä — fokusnäkymän idea on nostaa katse **pois**
   pelikaupungista.
