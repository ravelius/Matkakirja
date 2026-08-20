# Singapore-faktapohjan riippumaton tarkistus

Tarkistettu 20.8.2026 en-Wikipedian raakateksteistä (`action=raw`,
NODE_USE_ENV_PROXY=1). Tarkistetut artikkelit: "Singapore", "Cavenagh
Bridge", "Thian Hock Keng Temple", "Sri Mariamman Temple, Singapore",
"Raffles Hotel", "Kampong Glam", "Chinatown, Singapore", "Fort Canning
Hill", "1819 Singapore Treaty", "Port of Singapore", "Empress Place
Building", "Boat Quay", "Merlion", "Malay Heritage Centre", "Istana
Kampong Glam", "History of Singapore", "P&O". Koordinaattien
ristiintarkistukseen käytetty myös OpenStreetMap/Nominatim (Overpass
API ei ollut tästä ympäristöstä tavoitettavissa — TLS-yhteys
overpass-api.de:hen katkesi toistuvasti; Nominatim toimi ja antoi
samat pisteet <100 m tarkkuudella Wikipedian arvoista, joten
ristiriitakynnys 100 m ei ylittynyt).

## Yhteenveto

**Ei löytynyt yhtään asiavirhettä.** Kaikki tarkistetut päivämäärät,
nimet, summat, koordinaatit ja lainaukset (K1–K4, T1–T4, jaksot 1–5,
osion 4 koordinaatit) vastaavat en-Wikipedian raakatekstiä sanatarkasti
tai asiallisesti. Faktapohjan tekijän oma epävarmuusosio (7) on
perusteltu ja rehellinen — sen kaksi avointa aukkoa saatiin nyt
täytettyä (ks. alla), ja Suez-varovaisuus osoittautui tarpeettomaksi
liian tiukaksi rajaukseksi (parempi lähde löytyi toisesta artikkelista).

## 1. Kampong Glam / Istana Kampong Glam -koordinaatti (aukko täytetty)

Kirjoittaja jätti kohteen 10 pois kartalta, koska "Kampong Glam"
-artikkelin infoboksissa ei ole `coordinates`-kenttää. Tämä pitää
paikkansa. Löysin kuitenkin koordinaatit kahdesta läheisestä,
suoraan aihetta koskevasta Wikipedia-artikkelista, ja vahvistin ne
riippumattomasti OpenStreetMapista:

- **Malay Heritage Centre** (en-Wikipedia, infoboksi):
  `{{Coord|1|18|08|N|103|51|37|E}}` = 1°18′08″N 103°51′37″E
  (1,302222°N, 103,860278°E)
- **Istana Kampong Glam** (en-Wikipedia, infoboksi):
  `{{Coord|1.3029|103.85988}}` = 1°18′10,4″N 103°51′35,6″E
  (1,3029°N, 103,85988°E)
- **OSM/Nominatim** riippumattomasti: Malay Heritage Centre
  1,3028652°N 103,8598269°E; Istana Kampong Glam 1,3025865°N
  103,8599650°E — molemmat alle 90 m Wikipedia-arvoista, ei
  ristiriitaa.

**Suositus kirjoittajalle:** käytä esim. Istana Kampong Glamin
koordinaattia **1°18′10″N 103°51′36″E** (≈1,3029°N, 103,8599°E)
kohteelle 10, lähteinä "Istana Kampong Glam" ja/tai "Malay Heritage
Centre" (en-Wikipedia) — molemmat viittaavat samaan rakennuskompleksiin
ja poikkeavat toisistaan vain n. 90 metriä.

**Tärkeä korjaus etäisyysarvioon:** Faktapohjan osiossa 4
kirjoittaja arvioi Kampong Glamin sijaitsevan "muutaman sadan metrin
päässä koillisessa Chinatownista/Boat Quaysta" — tämä arvio on
selvästi liian pieni. Laskin haversine-etäisyydet nyt saaduilla
koordinaateilla:

- Boat Quay → Kampong Glam/MHC: **n. 2,1 km**
- Chinatown → Kampong Glam/MHC: **n. 2,7 km**
- Fort Canning → Kampong Glam/MHC: **n. 1,7 km**
- Kaupungin keskipiste (infoboksi) → Kampong Glam/MHC: **n. 3,7 km**

Sen sijaan kohteiden 2–9 (Merlion, Cavenagh-silta, Empress Place,
Boat Quay, Thian Hock Keng, Sri Mariamman, Chinatown, Fort Canning)
muodostama klusteri on todella tiivis — laskin suurimman
pisteparietäisyyden (Thian Hock Keng ↔ Fort Canning) **n. 1,49 km:ksi**,
joten kirjoittajan "alle 2 km" -arvio tälle klusterille pitää
täsmälleen paikkansa. Kampong Glam ei siis kuulu samaan tiiviiseen
klusteriin vaan on selvästi oma, erillinen kohteensa n. 2 km
koilliseen — tämä kannattaa ottaa huomioon kartan rajauksessa
(esim. kahtena erillisenä kartta-alueena tai laajempana yleiskarttana).

## 2. Raffles Hotelin koordinaatit (aukko täytetty)

Wikipedia-artikkelin "Raffles Hotel" infoboksissa koordinaattimalline
on todella tyhjä (`{{Coord|format=dms|display=title}}` ilman arvoja) —
kirjoittajan havainto pitää paikkansa. Löysin koordinaatit
OpenStreetMap/Nominatimista täsmällisellä osoitehaulla; osoite täsmää
Wikipedian infoboksin osoitteeseen ("1 Beach Road, Singapore 189673")
sanatarkasti:

- **Raffles Hotel** (OSM node, osoite "1, Beach Road ... 189673"):
  **1,2946815°N, 103,8546412°E** = 1°17′40,9″N 103°51′16,7″E

Etäisyys kaupungin keskipisteestä n. 2,68 km; Boat Quaysta n. 1,04 km.
Koska tämä ei ole suoraan Wikipediasta vaan OSM:stä, se kannattaa
merkitä lehden lähdeviitteissä selvästi erilliseksi (esim.
"OpenStreetMap/Nominatim, tarkistettu [pvm]") eikä en-Wikipedia-
viitteeksi.

## 3. Suezin kanava -yhteys — parempi lähde löytyi

Kirjoittaja totesi oikein, ettei "Singapore"-, "Port of Singapore"- tai
"Cavenagh Bridge" -artikkeleista löydy suoraa 1800-luvun
syy-seuraus-lausetta Suezin kanavan ja Singaporen kaupan kasvun
välillä. Tarkistin lisäksi artikkelin **"History of Singapore"**, jota
kirjoittaja ei käynyt läpi — sieltä löytyy täsmälleen tarvittava,
suoraan lainattava lähde:

> "Its success was due to several reasons including the opening of the
> Chinese market, the advent of ocean-going steamships, the dramatic
> reduction in the time and cost of shipping goods to Europe after the
> opening of the Suez Canal in 1869, and the production of rubber and
> tin in Malaya." — en-Wikipedia, "History of Singapore"

> "The later opening of the Suez Canal in 1869 would further boost
> trade in Singapore. By 1880, over 1.5 million tons of goods were
> passing through Singapore each year..." — en-Wikipedia, "History of
> Singapore"

**Suositus kirjoittajalle:** Suez-yhteys voidaan siis ottaa mukaan
lehteen ihan suoralla Wikipedia-tuella — lähteeksi "History of
Singapore" (en-Wikipedia) eikä "Singapore"-pääartikkeli. Cavenagh-
sillan valmistumisvuoden (1869) ja Suezin kanavan avaamisen (1869)
samanaikaisuus voidaan siis mainita kevyenä ajallisena rinnastuksena,
mutta K4-noston oma syy-seuraussuhde (silta juhlii Straitsin
siirtokuntien 1867 kruununsiirtokunta-asemaa / Singaporen 1819-
perustamisen 50-vuotispäivää) on edelleen se, mitä "Cavenagh Bridge"-
ja "1819 Singapore Treaty" -artikkelit itse sanovat sillasta — Suez ei
liity siihen artikkeleiden mukaan suoraan.

## 4. Sivuhuomio: kaksi Wikipedia-artikkelia ovat keskenään ristiriidassa Cavenagh-sillan perustelusta

Ei virhe faktapohjassa (K4 lainaa oikein "Cavenagh Bridge" -artikkelia),
mutta kannattaa tietää: artikkeli **"1819 Singapore Treaty"** antaa
sillalle *toisen* perustelun kuin "Cavenagh Bridge" -artikkeli itse:

- "Cavenagh Bridge" -artikkeli: silta avattiin marraskuussa 1869
  juhlistamaan Straitsin siirtokuntien kruununsiirtokunta-asemaa
  vuodelta **1867**.
- "1819 Singapore Treaty" -artikkeli: "Cavenagh Bridge was opened in
  1869 to celebrate **the 50th anniversary of the modern foundation of
  Singapore**" (viitaten 1819-sopimukseen).

Molemmat ovat sinänsä ajallisesti mahdollisia (1869 on sekä
1867+2 että 1819+50), mutta artikkelit painottavat eri syytä. K4-nosto
seuraa "Cavenagh Bridge" -artikkelia, mikä on validi valinta, koska se
on aiheen pääartikkeli — ei tarvitse muuttaa, mutta jos kirjoittaja
haluaa mainita myös 50-vuotisjuhla-selityksen, se on löydettävissä
"1819 Singapore Treaty" -artikkelista.

## 5. Kaikki muut tarkistetut faktaväitteet — täsmäävät

Käytiin sanatarkasti läpi ja todettiin oikeiksi (ei listata erikseen,
koska ei löytynyt poikkeamia):

- K1: Raffles saapui 28.1.1819; Tengku Long/Hussein Shah, 5000/3000
  dollarin korvaukset; Singaporen sopimus 6.2.1819 — täsmää.
- K2: n. 1000 asukasta ennen Rafflesia; yli 80 000 v. 1860, yli puolet
  kiinalaisia; pippuri/gambier-viljelmät; Straitsin siirtokunnat 1826,
  pääkaupunki 1836 — täsmää.
- K3: vapaasatama, kiinalaiset alajuoksulla / englantilaiset country
  traders yläjuoksulla, Batavian ohitus 1830-luvulla, kolme
  kauppaverkostoa — täsmää sanatarkasti "Port of Singapore" -artikkelia.
- K4: Cavenagh-silta marraskuu 1869, Glasgow, Collyer & Ordish
  (artikkelissa mainitaan myös kolmas suunnittelija A. H. De Wind, jota
  nosto ei mainitse — ei virhe, vain osittainen valinta), vanhin
  alkuperäismuotoinen silta — täsmää.
- T1: Jackson-suunnitelma 1822, "comfort and security of the different
  classes of inhabitants" -lainaus, kansanryhmien alueet — täsmää.
- T2: Thian Hock Keng 1821–22 → 1839 uudelleenrakennus → 1842 valmis,
  Tan Tock Seng, painolastimateriaalit, Chulia-yhteisön apu — täsmää.
- T3: Naraina Pillai, Penang, toukokuu 1819, rakennusyhtiö,
  tekstiilikauppa, 1827 temppeli, Sinna Amman, vanhimmat tiiliosat 1843
  — täsmää.
- T4: Sarkies-veljekset, 1.12.1887, 10 huonetta, 1890/1894 laajennukset,
  1899 päärakennus, Bidwell, ensimmäiset sähkövalot — täsmää.
- Jaksot 1–5: Changi 1981/Paya Lebar, kaksi maayhteyttä Malesiaan,
  yli 60 saarta; Bukit Timah 163,63 m, 580→770 km² maantäyttö, Jurong/
  Tekong/Ubin/Sentosa; Bukit Larangan, Government House, 1859/1861,
  Charles Canning; 1824 koko saari Britannian alle, Temasek 1300-luku;
  Köppen Af, 23–32 °C, marras–helmikuu monsuuni, heinä–lokakuu haze
  Sumatralta — kaikki täsmäävät.
- Osion 4 koordinaatit (kohteet 1–9): jokainen tarkistettu suoraan
  vastaavan artikkelin `{{coord}}`-mallineesta — täsmäävät
  merkki merkiltä.

## 6. Sisältölinjaushuomiot (siirtomaahistoria, uskonto)

- Siirtomaahistoria on kuvattu faktapohjassa neutraalisti: kauppa,
  hallinto, väestönkasvu, ei nykysotaa/nykypolitiikkaa. Ei
  korjattavaa.
- Uskonto (Thian Hock Keng, Sri Mariamman) on käsitelty
  historiallis-kulttuurisena ilmiönä (temppelien perustaminen,
  yhteisöjen rooli, arkkitehtuuri) — ei uskonnollista julistusta. Ei
  korjattavaa.
- Osion 7 kohta 9 (nykyaikaiset faktat rajattu pois 1873-nostoista) on
  linjassa Perustuslain periaatteiden kanssa — ei korjattavaa.

## Lopputulos kirjoittajalle

Faktapohja on luotettava sellaisenaan. Kaksi konkreettista lisäystä
suositellaan ennen käyttöä:

1. Kampong Glam / Istana Kampong Glam -koordinaatiksi
   **1°18′10″N 103°51′36″E** (Istana Kampong Glam / Malay Heritage
   Centre, en-Wikipedia + OSM-vahvistus), ja kohteen 10 kuvaus
   "rajausehdotus"-tekstissä on korjattava — kohde on n. 1,7–3,7 km
   päässä muista kohteista, ei "muutaman sadan metrin päässä".
2. Raffles Hotelin koordinaatiksi **1°17′41″N 103°51′17″E**
   (OpenStreetMap/Nominatim, osoite täsmää Wikipedian "1 Beach Road,
   189673" -tietoon), merkittynä erilliseksi ei-Wikipedia-lähteeksi.
3. Suez-Singapore-kauppayhteys voidaan lisätä lehteen lähteellä
   "History of Singapore" (en-Wikipedia) — suora lainaus löytyy,
   toisin kuin kirjoittaja aiemmin epäili.
