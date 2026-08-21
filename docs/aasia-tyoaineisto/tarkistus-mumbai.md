# Mumbai — faktantarkistus

Lähteet: en-Wikipedia action=raw 21.8.2026 ("Chhatrapati Shivaji
Terminus", "Gateway of India", "University of Mumbai", "Elephanta
Caves", "Crawford Market"); Wikipedia MediaWiki-koordinaattirajapinta
(action=query&prop=coordinates); OSM Nominatim
(nominatim.openstreetmap.org) riippumattomana ristiintarkistuksena.

## 1. KESKIPISTEKYSYMYS — ratkaisu

**Havainto vahvistettu ja täsmennetty.** Wikidatan "Mumbai"-piste
(19,0761°N 72,8775°E) on todellakin kaukana eteläisen historiallisen
ydinkaupungin (Fort/Colaba) kohteista — tämä ei ole faktapohjan
laskuvirhe. Vahvistin asian riippumattomasti myös OSM Nominatimilla:
Nominatimin oma "Mumbai"-kaupunkipiste on 19,0550°N 72,8692°E — eri
lähde, mutta samaa ilmiötä: molemmat viittaavat nykyisen
suurkaupunkialueen hallinnolliseen keskipisteeseen, ei 1873-ajan
kaupunkiin.

**Korjaus matkalla:** Faktapohjan oma kohde #5 "University of Mumbai
(Fort-kampus)" osoittautui VIRHEELLISEKSI — se ei ollut
laskuvirhe, vaan peritty suoraan Wikipedian omasta, viallisesta
Coord-mallineesta (ks. osio 2). Kun tämä korjataan, ydinklusterin
todellinen koko kutistuu selvästi faktapohjan alkuperäistä arviota
("n. 3 km × 5 km") pienemmäksi.

**Korjattu klusteri** (Elephanta-luolat pois lukien, ks. alla; 6
pistettä: CST, Gateway, korjattu Yliopisto/Fort-kampus, Crawford
Market, Bombay High Court, David Sassoon Library):
- Leveysaste: 18,9220°N (Gateway, eteläisin) – 18,9474°N (Crawford
  Market, pohjoisin) → n. **2,8 km** pohjois–eteläsuunnassa.
- Pituusaste: 72,8300°E (korjattu Yliopisto/HC-alue, läntisin) –
  72,8355°E (CST, itäisin) → n. **0,6–1,0 km** itä–länsisuunnassa.
- Klusteri on siis kapea ja pitkänomainen, ei neliömäinen.

**Ehdotettu kartan keskipiste:** kuuden ydinpisteen keskiarvo ≈
**18,933°N, 72,833°E** — osuu Fort-alueelle, lähelle Kala
Ghoda/Horniman Circle -seutua, n. 300 m Bombay High Courtista
koilliseen. Tämä on käytännöllinen, nimettävissä oleva piste
("Fort, Mumbai") kartan keskipisteeksi Wikidatan sijaan.

**Ehdotettu rajaus:** n. **3,5–4 km × 3,5–4 km** neliö tämän
keskipisteen ympärillä kattaa mukavasti kaikki kuusi ydinpistettä
marginaalilla (Gateway of India eteläisin, Crawford Market
pohjoisin). Tämä on TIUKEMPI kuin faktapohjan alkuperäinen "3×5 km"
-arvio, koska se arvio sisälsi virheellisen Yliopisto-koordinaatin.

**Elephanta-luolat** (18,9633°N 72,9314°E, vahvistettu OSM:llä lähes
identtisenä) jäävät korjatustakin keskipisteestä n. 11 km itään —
liian kauas mahtuakseen samaan tiiviiseen rajaukseen. Suositus: sama
ratkaisu kuin Kolkatan Dakshineswar/Belur Math — käsitellä
Elephantaa erillisenä retkikohteena/satelliittimerkkinä kartan
reunalla tai omana pienenä lisäkarttana, ei venyttää päärajausta 11
km asti.

## 2. Löydetty koordinaattivirhe

**Väite** (osio 4, kohde #5): "University of Mumbai (Fort-kampus) |
18,9750°N 72,8258°E".

**Ongelma:** Tämä EI ole Fort-kampuksen (Rajabai Clock Tower
-alueen) koordinaatti. Se on peräisin suoraan Wikipedian
"University of Mumbai" -artikkelin omasta viallisesta
Coord-mallineesta raakatekstissä: `{{Coord|18|58|30|N|72|49|33|E...}}`
= 18,9750°N, 72,8258°E. Käänteisgeokoodasin tämän pisteen
Nominatimilla: se osuu **Red Cross Streetille, Agripada/Byculla
West** -kaupunginosaan — n. 5,3 km Fort-kampuksesta pohjoiseen, ei
missään tekemisissä yliopiston kanssa. Tämä on siis Wikipedian oma
data/Wikidata-virhe (samantyyppinen kuin Chennai Centralin ongelma),
jonka faktakoostaja peri MediaWiki-API:n kautta huomaamatta.

**Oikea koordinaatti:** Yliopiston Fort-kampuksen tunnetuin
maamerkki, Rajabai Clock Tower, sijaitsee OSM:n mukaan **18,9297°N,
72,8300°E** (vahvistettu myös Bombay High Courtin lähialueen kautta,
joka on 300 m päässä samalla kampusalueella). Suositus: korvaa
osion 4 kohde #5 tällä koordinaatilla, tai poista kohde kokonaan
kuten Chennai Centralille tehtiin.

**Lähde:** en-Wikipedia "University of Mumbai" raakateksti (rivi 39,
Coord-malline) + Nominatim-käänteisgeokoodaus (osoite: Red Cross
Street, Agripada, Byculla West) + Nominatim-haku "Rajabai Clock
Tower, Mumbai" (18,9297°N 72,8300°E).

## 3. Post-1873-merkinnät (M1/M2) — vahvistettu asianmukaisiksi

Faktapohja merkitsee itse M1:n ja M2:n ajallisesti myöhäisiksi.
Tarkistin molemmat päivämääräketjut raakatekstistä — kaikki täsmää:

- **CST/Victoria Terminus**: rakennus alkoi 1878, valmis 1887, avattu
  yleisölle 20.5.1888 — täsmää. Vanha Bori Bunder -asema purettiin
  "after 1877" — täsmää. Puuvillapalot 28.3.1864, 16 erillistä
  paloa, syytettiin tuntematonta miestä ja poikaa — täsmää sanasta
  sanaan.
- **Gateway of India**: George V:n maihinnousu 2.12.1911 (kirjoitus
  raakatekstissä: "Second of December MCMXI"), peruskivi
  31.3.1913, valmis 1924, brittijoukkojen lähtö 28.2.1948 — täsmää
  kaikki.

Ei korjaustarvetta näissä.

## 4. Varmennetut koordinaatit

| # | Nimi | Faktapohjan koordinaatti | Riippumaton tarkistus | Ero | Huom |
|---|---|---|---|---|---|
| 1 | Mumbai, Wikidata-keskipiste | 19,0761°N 72,8775°E | Nominatim "Mumbai": 19,0550°N 72,8692°E | ~2,5 km (eri lähde, sama ilmiö) | Ei suositella kartan keskipisteeksi, ks. osio 1 |
| 2 | CST | 18,9399°N 72,8354°E | 18,9399°N 72,8355°E | ~10 m | OK |
| 3 | Gateway of India | 18,9220°N 72,8347°E | 18,9220°N 72,8346°E | ~10 m | OK |
| 4 | Elephanta-luolat | 18,9633°N 72,9314°E | 18,9630°N 72,9319°E | ~55 m | OK, säilytä erillisenä satelliittina |
| 5 | University of Mumbai (Fort-kampus) | 18,9750°N 72,8258°E | **VIRHE** — osoittaa Byculla Westiin | ~5,3 km | **KORJAA:** 18,9297°N 72,8300°E (Rajabai Tower) |
| 6 | Crawford Market | 18,9474°N 72,8347°E | 18,9474–18,9486°N 72,8337–72,8352°E | 0–150 m | OK |
| 7 | Bombay High Court | 18,9312°N 72,8305°E | 18,9307°N 72,8302°E | ~50 m | OK |
| 8 | David Sassoon Library | 18,9280°N 72,8311°E | 18,9277°N 72,8312°E | ~35 m | OK |

## 5. Yhteenveto

Keskipistekysymys ratkaistu: Wikidatan "Mumbai"-piste kuvaa nykyistä
suurkaupunkialuetta eikä sovi 1873-teemaiselle kartalle — suositus on
käyttää n. 18,933°N, 72,833°E keskipisteenä (Fort-alue) ja n.
3,5–4 km × 3,5–4 km rajausta, Elephanta-luolat erillisenä
satelliittikohteena. Työn aikana löytyi lisäksi yksi todellinen
koordinaattivirhe: "University of Mumbai (Fort-kampus)" osoitti
väärään paikkaan (Byculla, ei Fort) Wikipedian oman viallisen
Coord-mallineen takia — korjattu koordinaatti 18,9297°N 72,8300°E.
Kaikki muut seitsemän kohdetta sekä M1/M2-nostojen post-1873-
päivämäärät täsmäävät riippumattomiin lähteisiin erinomaisesti.
