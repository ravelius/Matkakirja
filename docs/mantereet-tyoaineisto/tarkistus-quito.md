# Quito — riippumaton tarkistus faktapohjalle

Tarkistuskohde: `docs/mantereet-tyoaineisto/faktapohja-quito.md`. Kaikki
väitteet tarkistettu itsenäisesti en-Wikipediasta (`Special:Export`,
`action=raw`-vastine, sekä `action=query&prop=coordinates` koordinaateille)
23.8.2026, NODE_USE_ENV_PROXY=1 -periaatteen mukaisesti proxyn kautta
(curl + `/root/.ccr/ca-bundle.crt`). Faktapohjan lähdeviitteisiin ei ole
luotettu — artikkelit haettu ja luettu itse tästä sessiosta käsin. Koordi-
naattien 429-vastauksiin käytetty kasvavaa 3–6 s viivettä ja uusintaa.

Haetut artikkelit: "Quito", "Quito Astronomical Observatory", "Cotopaxi",
"French Geodesic Mission to the Equator", "Gabriel García Moreno",
"Sebastián de Belalcázar" (ks. korjaus 2). Lisäksi `js/packs/
southamerica-questions.js` (`quito`-avain, 5 kysymystä).

**Yhteenveto:** 2 pakollista korjausta, 10 huomiota. Kaksi erityisesti
pyydettyä tarkistusta (observatorion avaus 1873/García Moreno; Cotopaxin
toinen nousu 1873/Stübel + 4 ecuadorilaista) osoittautuivat molemmat
**oikeiksi ja sanatarkasti lähteen tukemiksi**.

---

## PAKOLLISET KORJAUKSET

### 1. Sivu A:n johdanto ylittää merkkirajan

**Väite:** Kirjoittaja ilmoitti kaikkien kolmen johdannon olevan
"216–251 merkkiä" ja totesi tämän mahdollisesti ylittävän rajan —
tarkistuspyyntö vahvistettu todeksi.

**Mitattu:** Sivu A ("kaupunki") johdanto on **251 merkkiä**. Speksi
(`docs/moduulit/kaupunkilehti.md`, rivi 131: "1–2 virkettä... 154–232 mrk")
sallii enintään 232 merkkiä. **Ylitys 19 merkkiä.**

Sivu B:n johdanto (224 merkkiä) ja Sivu C:n johdanto (216 merkkiä) ovat
molemmat sallitun 154–232 merkin sisällä — näissä ei korjaustarvetta.

Kaikki 12 nostoa mitattu myös: 444–645 merkkiä, kaikki speksin
440–660 merkin sisällä. Ei korjaustarvetta nostoissa.

**Korjaus:** Lyhennä Sivu A:n johdanto vähintään 19 merkillä (esim.
poista "lähes" tai tiivistä "kupeessa"-lause).

**Lähde:** `docs/moduulit/kaupunkilehti.md` (rivi 131, 159); merkkimäärät
laskettu Python-skriptillä faktapohjan blockquote-lohkoista.

### 2. QC1:n kirjoitusasuperustelu on virheellinen — henkilön oma artikkeli on nimeltään "Belalcázar", ei "Benalcázar"

**Väite (faktapohja, QC1 HUOM):** "...käytetty leipätekstin muotoa
[Benalcázar], koska se toistuu useammin ja on myös henkilön oman
Wikipedia-artikkelin otsikkomuoto."

**Tarkistettu, molemmat perustelut virheellisiä:**

- Henkilön oma en-Wikipedia-artikkeli on nimeltään **"Sebastián de
  Belalcázar"** (L-kirjoitusasu). Hakiessani `Special:Export/Sebastián_de_
  Benalcázar` (N-muoto) sain redirect-sivun, joka ohjaa artikkeliin
  "Sebastián de Belalcázar" — eli N-muoto EI ole artikkelin oma otsikko,
  vaan pelkkä uudelleenohjaus siihen. Tämä on suoraan päinvastoin kuin
  faktapohjan väite.
- "Toistuu useammin" -väite ei myöskään pidä paikkaansa "Quito"-artikkelin
  sisällä: infobox käyttää muotoa "[[Sebastián de Belalcázar]]" (rivi
  `founder =`) ja leipäteksti (Colonial period -osio) muotoa "[[Sebastián
  de Benalcázar]]" — kumpikin esiintyy täsmälleen **kerran**, ei siis
  "useammin" kumpaakaan.

**Oikea tieto:** Wikipedian kanonisoitu, henkilön oman artikkelin
otsikkomuoto on **"Belalcázar"**, ei "Benalcázar". Jos kirjoittaja haluaa
seurata Wikipedian ensisijaista kirjoitusasua, oikea valinta olisi
"Belalcázar" — ei nykyinen "Benalcázar". Vaihtoehtoisesti "Benalcázar"
voidaan säilyttää (se on yhtä lailla esiintyvä muoto ja monissa
espanjankielisissä lähteissä yleisempi), mutta silloin HUOM-rivin
perustelu pitää korjata vastaamaan tosiasioita eikä vedota virheelliseen
"oma artikkeli käyttää tätä muotoa" -argumenttiin.

**Lähde:** en-Wikipedia `Special:Export/Sebastián_de_Benalcázar` (palauttaa
`#redirect [[Sebastián de Belalcázar]]`); en-Wikipedia "Sebastián de
Belalcázar" (artikkelin todellinen otsikko); en-Wikipedia "Quito"
(infobox `founder=`; Colonial period -kappale).

---

## HUOMIOT

### 3. Molemmat erityispyydetyt tarkistukset vahvistuivat oikeiksi

- **Quiton observatorio, presidentti García Moreno, 1873:** VAHVISTETTU
  sanasta sanaan artikkelin "Quito" osiosta "Points of interest §
  La Alameda": *"In the center of the park is the Quito Observatory,
  which was opened by President García Moreno in 1873."* García Moreno
  oli presidenttinä 1869–1875 (vahvistettu artikkelista "Gabriel García
  Moreno", infobox), joten 1873 osuu hänen kaudelleen — ei ristiriitaa.
  HUOM: artikkeli "Quito Astronomical Observatory" itsessään EI mainitse
  García Morenoa lainkaan (vain vuoden 1873 ja ensimmäisen johtajan
  Mentenin) — faktapohjan kaksoislähdeviite (Quito + Quito Astronomical
  Observatory) on siis perusteltu, koska väite nojaa käytännössä vain
  "Quito"-artikkeliin.
- **Cotopaxin toinen onnistunut nousu 1873, Stübel + neljä nimettyä
  ecuadorilaista:** VAHVISTETTU sanasta sanaan artikkelista "Cotopaxi":
  *"In 1873 it was summitted by German Geologist Moritz Alphons Stübel
  and four Ecuadorians, Rafael Jantui, Melchor Páez, Vicente Ramón and
  Eusebio Rodriguez."* Ensimmäinen nousu 28.11.1872 (Reiss & Escobar) ja
  kolmas 1880 (Whymper) vahvistettu samasta artikkelista — "toinen"-sana
  faktapohjassa on siis oikein.

### 4. Kaksi kirjoittajan itse auki kirjaamaa ristiriitaa vahvistettu todellisiksi

- Cotopaxin purkaus: "Cotopaxi"-artikkeli sanoo yhden purkauksen
  täsmälleen 19.6.1742 (Bouguer & La Condamine, laskeutuessaan Guagua
  Pichincha -vuorelta); "French Geodesic Mission to the Equator"
  -artikkeli sanoo kaksi purkausta "1743 and 1744". Molemmat vahvistettu
  sanatarkasti. Faktapohjan ratkaisu ("1740-luvulla") on perusteltu.
- Toinen ranskalainen retkikunta: "French Geodesic Mission to the
  Equator" ajoittaa sen Ecuadorissa toimimisen "from 1901 to 1906";
  "Quito Astronomical Observatory" sanoo työkalujen olleen käytössä
  "between 1902 and 1914". Molemmat vahvistettu sanatarkasti. Faktapohjan
  ratkaisu ("1900-luvun alussa") on perusteltu.

### 5. Mitad del Mundon etäisyys — molemmat luvut vahvistettu, oma laskelma tarkistettu

Wikipedian "Quito"-artikkeli sanoo leipätekstissä "outside the city"
-osiossa: *"a small village... {{convert|35|km}} north of Quito"* ja GPS-
poikkeaman *"the actual equator is some 240 m north of the monument
area"* — molemmat vahvistettu sanatarkasti. Tarkistin myös faktapohjan
oman koordinaattilaskelman (Plaza Grande 0,2203°S 78,5142°W → Mitad del
Mundo 0,00222°S 78,45583°W): Δleveys ≈ 0,218° × 111,32 km ≈ 24,3 km,
Δpituus ≈ 0,058° × 111,32 km ≈ 6,5 km (leveys ja pituus lähes sama kerroin
päiväntasaajalla), resultantti √(24,3² + 6,5²) ≈ **25,1 km** — täsmää
faktapohjan ilmoittamaan lukuun. Laskelma pitää paikkansa.

### 6. Koordinaattien pistokoe: 6/9 kohdetta tarkistettu MediaWiki-rajapinnasta, kaikki täsmäävät

Tarkistin `action=query&prop=coordinates` -kutsuilla: Quito/katedraali
(-0,2203/-78,5142), El Panecillo (-0,22861/-78,51861), Quiton observatorio
(-0,21494/-78,50258), Mitad del Mundo (-0,00222/-78,45583), Basílica del
Voto Nacional (-0,2150/-78,5074), TelefériQo (-0,19194/-78,51889). Kaikki
täsmäävät faktapohjan taulukkoon (osio 4) metrin/kymmenien metrien
tarkkuudella pyöristyksineen. Ei virheitä löytynyt otoksessa.

### 7. Pieni liioittelu QC3:n nostotekstissä ("yli 5 000")

QC3:n nostoteksti sanoo "yli 5 000 kaupungin omaan suojeluluetteloon
merkittyä kiinteistöä", mutta Wikipedia-lähde ("Points of interest §
Historic center") sanoo täsmälleen *"5,000 properties registered in the
municipal inventory"* — ei "more than/over 5,000". Faktapohjan oma
faktalista (rivi 155) on tarkka ("5 000"), mutta nostoteksti lisää
"yli"-sanan, jota lähde ei tue. Pieni, mutta helposti korjattava: pudota
"yli" tai muuta muotoon "noin 5 000".

### 8. Quito-artikkelin sisäinen korkeuslukema-ero, jota faktapohja ei mainitse

Infobox ilmoittaa Quiton korkeudeksi 2 850 m (sama luku kuin faktapohjassa
ja visassa), mutta artikkelin "Geography"-osion leipäteksti sanoo:
*"Quito's altitude is listed at {{convert|2,820|m}}"* — 30 metrin ero
samassa artikkelissa. Tämä on samantyyppinen sisäinen ristiriita kuin
faktapohjan jo kirjaama sää-luku­ero (osio 5), mutta tätä ei ole mainittu.
Ei vaadi korjausta (2 850 m on infoboxin, visan ja valtaosan lähteiden
käyttämä luku), mutta kannattaa tietää jos joku kysyy "miksi Wikipedia
sanoo toisaalla 2 820".

### 9. UV-indeksi: ääriarvo vs. keskiarvo

QC2 käyttää lukua "UV-indeksi voi nousta jopa lukuun 24" — tämä on
sanasta sanaan Wikipedian leipätekstistä ja asianmukaisesti hedge-muodossa
("voi", "jopa"). Artikkelissa on kuitenkin myös erillinen "Average
Ultraviolet Index" -taulukko (lähde nomadseason.com), jonka mukaan
kuukausikeskiarvot ovat 11–12. Nämä eivät ole varsinaisesti ristiriidassa
(ääriarvo vs. keskiarvo, sama logiikka kuin lämpötilan record-high vs.
keskiarvo), mutta ei ole vahingoksi tietää, että 24 on poikkeuksellinen
huippulukema, ei tyypillinen päivittäinen arvo.

### 10. Merkkimäärätarkistuksen tulokset kootusti

Python-laskennalla faktapohjan kaikista lainauslohkoista:

| Nosto/johdanto | Merkkejä | Raja | Tulos |
|---|---|---|---|
| Johdanto A (kaupunki) | 251 | 154–232 | **YLI** (ks. korjaus 1) |
| Johdanto B (historia) | 224 | 154–232 | OK |
| Johdanto C (tiede) | 216 | 154–232 | OK |
| QC1–QC4, H1–H4, T1–T4 (12 kpl) | 444–645 | 440–660 | Kaikki OK |

### 11. Visatarkistus (js/packs/southamerica-questions.js, `quito`)

Kaikki viisi kysymystä luettu kokonaan. Ei visavuotoja: mikään nosto tai
jakso ei anna suoraan visan oikeaa vastausta valmiiksi puretussa muodossa
— sama havainto kuin faktapohjan omassa osiossa 7, kohta 1, ja tarkistin
sen itsenäisesti läpikäymällä sekä visan viisi kysymystä että kaikki 12
nostoa ja 5 jaksoa. Erityisesti visan kysymys 2 (päivän ja yön yhtä pitkä
kesto) ei esiinny yhdessäkään nostossa tai jaksossa, kuten faktapohja
toteaa.

### 12. Pilari 3 ja pilari 4: kichwat kuvattu elävänä nykykansana

Jakso 3 kuvaa otavaleñot nimenomaisesti nykyisenä, elävänä käsityö- ja
torikulttuurina ("sama kichwaa puhuva kansa... pitää perinnettä elävänä
edelleen tänään"), ei pelkkänä historiallisena kuriositeettina — täyttää
toimeksiannon linjauksen. Wikipedia-lähde ("Quito", El Ejido -osio) tukee
tätä: otavaleñot myyvät nykyään käsityötä torilla, ei menneisyyden
kuvauksena. Siirtomaa-aikaa (Rumiñahuin teloitus, itsenäisyysliikkeen
tukahduttaminen 1810, ~200 kuollutta) käsitellään neutraalisti ilman
väkivallan yksityiskohtien korostamista; García Morenon murha mainitaan
vain päivämäärällä (6.8.1875) ilman asetta/tekijää koskevia
yksityiskohtia, vaikka artikkeli "Gabriel García Moreno" sisältää ne
laajasti (koneellisesti tarkistettu tästä sessiosta: murha-ase oli
machete, tekijä Faustino Rayo) — faktapohjan tietoinen rajaus on siis
perusteltu eikä johdu siitä, ettei tietoa olisi ollut saatavilla.
