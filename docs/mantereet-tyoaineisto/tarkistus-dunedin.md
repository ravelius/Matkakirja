# Dunedin-faktapohjan riippumaton tarkistus

Tarkistettu 24.8.2026 en-Wikipedian raakatekstistä (`action=raw`,
`NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla viiveellä 429-vastausten
varalta) seuraavista artikkeleista: **Dunedin**, University of Otago,
Larnach Castle, First Church of Otago, Dunedin railway station, Toitū
Otago Settlers Museum, Taiaroa Head, Yellow-eyed penguin, Baldwin
Street, Ōtākou, Ngāi Tahu, Dunedin Chinese Garden, Dunedin Volcano,
Dunedin Airport, Chris Knox, David Low (cartoonist), Dunedin sound,
The Octagon (+ The Octagon, Dunedin), Bank of Otago. Koordinaatit
tarkistettu suoraan artikkeleiden `{{coord}}`-malliteista tai
infobox-koordinaateista ja verrattu faktapohjan taulukkoon, PLUS
riippumaton haversine-etäisyys/suuntalaskenta omalla Node-skriptillä
(ei koostajan skriptiä uudelleenkäytetty). Commons-kategoriat
tarkistettu suoraan `action=query&prop=categoryinfo`- ja
`list=categorymembers`-rajapinnoista jokaiselle mainitulle kategorialle
erikseen.

**Yleisarvio: erittäin huolellista työtä, mutta ei virheetöntä.**
Kaikki tarkistetut vuosiluvut (1848, 1861, 1865, 1869/1871, 1870/1871,
1873-kolmikko, 1874, 1875, 1898, 1906, 1919/1938, 1987/2019/2020,
1988/2002, 2008, 2014, 1962/2024) osoittautuivat riippumattomasti
oikeiksi — myös erityisesti pyydetyt kohdat (Otagon kultaryntäys 1861,
skottiperustus 1848, yliopisto 1869, Larnach 1871). Kaikki yhdeksän
kohdekartan koordinaattia täsmäsivät Wikipedian omiin
`{{coord}}`-malliteisiin desimaalin tarkkuudella, ja oma riippumaton
haversine-suuntalaskenta **ei löytänyt yhtään ilmansuuntavirhettä** —
koostajan aiemmin löytämä ja korjaama pohjoinen/etelä-merkkivirhe on
siis todella korjattu kauttaaltaan. Kaikki 20 pistokokeeksi tarkistettua
Commons-kuvamäärää täsmäsivät tismalleen. Löysin kuitenkin kaksi
todellista **virhettä**: yhden nimivirheen (toistuu kahdesti) ja yhden
väärän "tarkistettu ei ole olemassa" -väitteen kuvakategoriasta, joka
oikeasti on olemassa ja sisältää käyttökelpoisia kuvia.

---

## A. VIRHE — M2: väärä henkilönnimi, toistuu kahdesti

**Väite (M2, proosa):** "Baldwin Street tunnustettiin maailman
jyrkimmäksi kaduksi jo 1987, lähetystoimittaja **Jim Moran**
kaksivuotisen kampanjan tuloksena."

**Sama virhe M2:n lähteet-kohdassa:** "Baldwin Street tunnustettiin
maailman jyrkimmäksi kaduksi 1987 Guinness Book of Recordsin toimesta,
lähetystoimittaja **Jim Moran** kaksivuotisen kampanjan jälkeen..."

**Ongelma:** En-Wikipedian "Baldwin Street" -artikkeli nimeää
kampanjoijan toistuvasti muodossa `[[Jim Mora (broadcaster)|Jim
Mora]]` — ei "Jim Moran". Tarkistin myös, että Wikipedialla on oma
artikkeli "Jim Mora (broadcaster)" tälle henkilölle. Sukunimi on siis
**Mora**, ei Moran — yhden kirjaimen ero, mutta todellinen
nimivirhe, ja se on kirjoitettu identtisesti väärin sekä
julkaistavaksi tarkoitetussa proosassa että faktapohjan omassa
lähdeviittauksessa, joten kyseessä ei ole pelkkä lyöntivirhe vaan
toistuva väärinluku lähteestä.

**Suositus:** Korjaa "Jim Moran" → "Jim Mora" molempiin kohtiin ennen
kirjoitusvaihetta.

---

## B. VIRHE — osio 5: väärä "tarkistettu, ei ole olemassa" -väite Dunedin Volcanon kuvakategoriasta

**Väite (osio 5, Matkaoppaan jaksot -alaosio):** "`Category:Dunedin
Botanic Garden` (74 kuvaa) — täydentäväksi, jos jakso 2:n
geologiateksti kaipaa kuvaa (**Dunedin Volcanolle itselleen ei ole
omaa kuvakategoriaa, TARKISTETTU**, geologiakävelyn kuvat ovat Botanic
Gardenin kategoriassa)."

**Ongelma:** `Category:Dunedin Volcano` **on olemassa** Commonsissa ja
sisältää 3 kuvaa (tarkistettu `action=query&prop=categoryinfo`- ja
`list=categorymembers`-rajapinnoilla):
- File:Lighthouse above cliffs at Taiaroa Head.jpg
- File:Organ pipes columnar joints Dunedin.jpg
- File:Otago Harbour panorama.jpg

Näistä toinen ("Organ pipes columnar joints Dunedin") on itse asiassa
osuvampi jakso 2:n geologiatekstiin (tulivuoren basalttipatsaat) kuin
suositeltu Botanic Garden -yleiskategoria. Väite on siis paitsi
faktavirhe myös menetetty parempi kuvavaihtoehto.

**Suositus:** Poista tai korjaa "TARKISTETTU"-väite; lisää
`Category:Dunedin Volcano` (3 kuvaa) vaihtoehdoksi tai ensisijaiseksi
lähteeksi jakso 2:n kuvalle Botanic Gardenin rinnalle.

---

## C. Huomiot (ei korjaustarvetta faktapohjaan, mutta kirjoittajan hyvä tietää)

1. **Yliopiston perustamisvuosi 1869 vs. 1871 — K2:n "1869" on
   sanatarkasti oikein, mutta kaksitasoinen.** University of Otago
   -artikkeli sanoo: "established by ordinance... in 1869 and **opened
   for teaching in 1871**". Faktapohjan K2-nosto käyttää perustellusti
   1869-vuotta (sama kuin Wikipedian oma "established"-kenttä ja
   Dunedin-pääartikkelin muotoilu), ja tämä on myös yhteensopiva
   `OCEANIA_FACTS`-taulun isoisän-repliikin kanssa ("yliopisto on
   neljä vuotta vanha" 1873-1869=4). Jos yliopisto laskettaisiin
   opetuksen alkamisesta (1871), ero olisi vain kaksi vuotta — tämä ei
   ole virhe faktapohjassa, mutta kirjoittajan kannattaa tietää
   kaksitasoisuus jos yliopiston ikää mainitaan tarkemmin muualla.
2. **Ōtākoun rūnanga vs. Wikipedian oma erikoisnimi "Ōtākou
   Rūnaka".** Faktapohja käyttää läpivievästi muotoa "rūnanga"
   (yleisnimi, "assembly") kun se kuvailee Dunedinin paikallista
   hallintoelintä. Tämä on suoraan Wikipedian oman leipätekstin
   mukaista ("the Ōtākou rūnanga (assembly) of Ngāi Tahu"), mutta
   sama artikkeli käyttää myös elimen omaa, eteläisen murteen mukaista
   erisnimeä "**Ōtākou Rūnaka**" (ng→k, sama ilmiö jota L1-nosto
   itse selittää Kāi Tahu -nimen kohdalla). Ei ristiriita eikä virhe —
   molemmat muodot esiintyvät Wikipediassa rinnakkain eri
   käyttötarkoituksiin — mutta jos kirjoittaja haluaa mainita elimen
   virallisella nimellä, "Rūnaka"-muoto olisi tyylillisesti
   johdonmukaisempi L1:n oman ng→k-selityksen kanssa.
3. **Kāi tahun eteläinen murre oli lähellä sammumista 1900-luvulla.**
   Ngāi Tahu -artikkeli mainitsee: "from the 20th century to the early
   21st century, the dialect came close to extinction and was
   officially discouraged." Faktapohja ei käytä tätä tietoa eikä sen
   puuttuminen ole virhe (spec-mantereet.md ei vaadi mainitsemaan
   kielen historiaa), mutta koska tehtävänanto korosti "elävänä
   kuvattu kansa" -linjausta, kirjoittajan kannattaa tietää tämä
   tausta jos kāi tahun kielitilannetta laajennetaan tekstissä —
   nykytilanne on elvytystä, ei koskaan-uhattua-ollutta jatkuvuutta.

---

## Vahvistettu erityisen huolella (tehtävänannon painotukset)

- **Otagon kultaryntäys 1861, skottiperustus 1848, yliopisto 1869:**
  kaikki kolme vahvistettu sanatarkasti en-Wikipedian "Dunedin"- ja
  "University of Otago" -artikkeleista. 1848: "A Scottish settlement
  was established in 1848 by the Lay Association of the Free Church of
  Scotland." 1861: "In 1861, the discovery of gold at Gabriel's
  Gully... saw Dunedin become New Zealand's first city by growth of
  population in 1865." 1869: "established by ordinance... in 1869...
  New Zealand's oldest university."
- **Larnach 1871:** vahvistettu — "Land for the construction... was
  purchased in 1870... construction begin in 1871" (Larnach Castle
  -artikkeli), täsmää faktapohjan L4-nostoon.
- **1873-kolmikko (First Church, pankkisulautuma, rautatien myynti):**
  kaikki kolme vahvistettu itsenäisesti kolmesta eri artikkelista.
  First Church: vihitty 23.11.1873, perustuskivi toukokuu 1868,
  torni 56,4 m. Bank of Otago: myyty National Bank of New Zealandille
  1.7.1873 (neuvottelut päätökseen 17.4.1873), 12 sivukonttoria,
  avattu huhtikuussa 1863. Dunedin & Port Chalmers -rautatie: avattu
  31.12.1872, myyty maakuntaneuvostolle 9.4.1873 hintaan £187,106 —
  kaikki täsmäävät faktapohjan lukuihin senttilleen.
- **Koordinaatit ja ilmansuunnat (erityispyyntö):** kaikki yhdeksän
  kohdekartan pistettä täsmäsivät Wikipedian omiin `{{coord}}`-
  malliteisiin 5 desimaalin tarkkuudella. Oma riippumaton
  haversine-laskenta (etelän leveysasteet negatiivisina) vahvisti
  KAIKKI kahdeksan suuntaa ja etäisyyttä oikeiksi 8-suuntaisella
  kompassilla — ei yhtään merkkivirhettä löytynyt. Esimerkki: Taiaroa
  Head laskettu 20,575 km / 57,7° (koillinen), faktapohja ilmoittaa
  ~20,53 km koilliseen — täsmää. First Church -ankkuri ("100 metres to
  the south of the city centre") vahvistettu suoraan artikkelin
  tekstistä.
- **Category:Dunedin Sound ja Category:Flying Nun Records (erityispyyntö):**
  vahvistettu MOLEMMAT olemassa mutta 0 kuvatiedostoa (kummallakin 1
  alikategoria: Dunedin Sound → The Chills, Flying Nun Records →
  Flying Nun Records artists → mm. The Chills, Martin Phillipps,
  Sebadoh, Stereolab, The D4). Ehdotetut korvaavat kuvalähteet
  tarkistettu categoryinfo-kutsuilla: `Category:The Chills` = 9 kuvaa
  (täsmää), `Category:David Low` = 10 kuvaa (täsmää),
  `Category:David Low (cartoonist)` olemassa mutta 0 kuvaa (täsmää
  koostajan HUOM-merkintää). The Chills on lisäksi kirjaimellisesti
  Dunedin Sound -kategorian ainoa alikategoria, joten se on paras
  mahdollinen valinta.
- **Spec-mantereet.md Oseania-linjat (erityispyyntö):** maorikulttuuri
  kuvattu elävänä (Ōtākou-rūnanga nykyisenä kotipaikkana, ei
  "kadonneen kansan" kehystä) — vahvistettu sekä faktapohjan tekstistä
  että lähteistä. Ōtepoti-nimi vahvistettu olevan Dunedinin oma,
  Ōtākousta erillinen maorinkielinen nimi (en-Wikipedia: "There was a
  settlement in what is now central Dunedin (Ōtepoti), occupied as
  late as about 1785 but abandoned by 1826") — faktapohja käyttää sitä
  oikein vain päällekkäisyyskeskustelussa, ei sekoita Ōtākouhun.
- **Kaikki 20 pistokokeeksi tarkistettua Commons-kuvamäärää täsmäsivät
  tismalleen** faktapohjan ilmoittamiin lukuihin: Dunedin (34), The
  Octagon Dunedin (37), Otago Harbour (103), Dunedin Railway Station
  (154), Otago Peninsula (119), University of Otago Registry Building
  (39), First Church of Otago (37), Toitū Otago Settlers Museum (44),
  Otakou (5), Taiaroa Head (21), Diomedea sanfordi (21), Megadyptes
  antipodes (79), Larnach Castle (73), Baldwin Street Dunedin (43),
  University of Otago (92), Speight's Brewery (16), Dunedin Chinese
  Garden (51), Dunedin Botanic Garden (74), St Clair New Zealand (28),
  Statue of Robert Burns Dunedin (17).
- **Kaikki väitetyt PUUTTUVAT kategoriat vahvistettu todella
  puuttuviksi:** "Category:Dunedin railway station" (pienet
  alkukirjaimet), "Category:Toitu Otago Settlers Museum" (ei
  pitkää ū:ta), "Category:Speights Brewery" (ei heittomerkkiä),
  "Category:Signal Hill (New Zealand)", "Category:University of Otago
  Clocktower Building", "Category:Yellow-eyed penguin" — kaikki
  palauttivat `"missing":""` MediaWiki-rajapinnasta.
- **Redirect-tarkistukset:** "Otago Museum" → "Tūhura Otago Museum"
  (vahvistettu), "The Octagon" → täsmennyssivu jolla mm. "The Octagon,
  Dunedin" (vahvistettu).
- **Christchurchin faktapohjan ristiviittaus (Ōtākou rūnanga vs. Te
  Rūnanga o Ngāi Tahu / Addington):** tarkistettu suoraan
  faktapohja-christchurch.md:stä — kuvaus täsmää, ei fabrikointia.

---

## Yhteenveto korjattavista kohdista

### PAKOLLISET KORJAUKSET

1. **[VIRHE, nimivirhe] M2:** "Jim Moran" → "Jim Mora" (kahdesti,
   sekä proosassa että lähteet-kohdassa). Ks. kohta A.
2. **[VIRHE, väärä negatiivinen väite] Osio 5:** "Dunedin Volcanolle
   itselleen ei ole omaa kuvakategoriaa, TARKISTETTU" on väärin —
   `Category:Dunedin Volcano` on olemassa ja sisältää 3 kuvaa, yksi
   niistä (basalttipatsaat) osuvampi kuin suositeltu vaihtoehto. Ks.
   kohta B.

### HUOMIOT (ei pakollisia, kirjoittajan hyvä tietää)

3. Yliopiston kaksitasoinen perustamisvuosi (1869 ordinanssi / 1871
   opetuksen alku) — K2:n "1869" on oikein, mutta kaksitasoisuus hyvä
   tietää. Ks. kohta C.1.
4. Ōtākoun rūnangan virallinen nimimuoto on Wikipediassa myös
   "Rūnaka" (eteläisen murteen mukainen) — faktapohjan yleisnimi
   "rūnanga" ei ole virhe, mutta tyylillinen huomio L1:n oman
   ng→k-logiikan kannalta. Ks. kohta C.2.
5. Eteläinen murre oli lähellä sammumista 1900-luvulla — ei vaadita
   mainittavaksi, mutta relevantti tausta jos kieliaihetta laajennetaan.
   Ks. kohta C.3.

---

## Kelpaako-tuomio

**KELPAA PIENIN KORJauksin.** Faktapohja on poikkeuksellisen tarkka —
jokainen erikseen pyydetty tarkistuskohta (1873-vuosiluvut, koordinaattien
ilmansuunnat, Dunedin Sound / Flying Nun Records -kategoriat, Oseania-
linjaukset) osoittautui riippumattomasti oikeaksi, ja 20/20
pistokokeeksi tarkistettua Commons-kuvamäärää täsmäsi tismalleen.
Kahden löydetyn virheen (nimivirhe M2:ssa, väärä
"ei-ole-olemassa"-väite osiossa 5) korjaaminen on nopeaa eikä vaadi
rakenteellisia muutoksia — kirjoitusvaihe (Opus) voi edetä sen jälkeen
kun nämä kaksi kohtaa on korjattu faktapohjaan.
