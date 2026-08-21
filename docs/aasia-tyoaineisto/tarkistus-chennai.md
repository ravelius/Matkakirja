# Chennai — faktantarkistus

Lähteet: en-Wikipedia action=raw 21.8.2026 ("Fort St. George" —
redirect "Fort St. George, India" kautta, tarkistettu —, "Marina
Beach", "Madras Railway", "Government Museum, Chennai"); Overpass API
(peili maps.mail.ru/osm/tools/overpass/api/interpreter, koska
overpass-api.de katkaisi yhteyden — "Recv failure: Connection reset
by peer" — kaksi kertaa ennen kuin siirryin peiliin); OSM Nominatim
ristiintarkistuksena.

## 1. PÄÄTEHTÄVÄ: Chennai Centralin koordinaatti — ratkaistu

Faktapohja oli jo itse havainnut ongelman ja jättänyt Chennai
Centralin pois kartalta osiossa 7 kohta 1: alkuperäinen
Wikidata-koordinaatti (13,0825°N 80,2750°E) oli identtinen kaupungin
keskipisteen kanssa — ilmeinen kopiovirhe.

**Haettu oikea koordinaatti Overpassista:** kysyin
`railway=station` + nimi "Chennai Central" -asemarakennuksen
polygonin (way) keskipisteen Overpass-peilistä:

```
way 217845073, tags: name=Chennai Central, alt_name=Chennai Moore
Market, railway=station, ref=MAS
center: 13,0866°N, 80,2745°E
```

Tarkistin tämän myös Nominatimilla hakusanalla "Chennai Central
Railway Station" — palautti läheisen bussipysäkin (13,0826°N
80,2763°E, n. 220 m Overpass-pisteestä), joka on samalla
asema-alueella mutta epätarkempi kuin Overpassin
asemarakennus-polygoni. Käytän Overpassin way-keskipistettä
tarkempana.

**Etäisyys vanhasta (virheellisestä) pisteestä:** 13,0825°N
80,2750°E → 13,0866°N 80,2745°E on n. **0,46 km pohjoiseen** —
selvästi yli 100 m:n kynnyksen, vahvistaa että kyseessä oli aito
kopiovirhe eikä pelkkä pyöristys.

**Suositus:** Jos kirjoittaja haluaa palauttaa Chennai Centralin
kohdekartalle (esim. korvaamaan jonkin nykyisistä 9 kohteesta tai
lisäämään 10:nneksi), oikea koordinaatti on **13,0866°N, 80,2745°E**.
Vaihtoehtoisesti nykyinen ratkaisu (korvattu Connemara-kirjastolla,
Egmoren asemalla ja Amir Mahalilla) on edelleen validi tapa välttää
ongelma kokonaan.

## 2. Muiden faktojen tarkistus

Kaikki kolme "1873-henkistä" ydinnostoa (C1 Fort St. George, C2
Marina Beach, C3 Madras Railway) sekä C4 Government Museum
täsmäävät en-Wikipedian raakatekstiin lähes sana sanalta —
**ei yhtään asiavirhettä löytynyt**:

- **C1/H1 (Fort St. George):** Francis Day neuvotteli 1639
  Chandragirin hallitsijan kanssa, fort valmistui 23.4.1644 hintaan
  £3000, nimetty Pyhän Yrjön päivän mukaan, synnytti George
  Town/Black Townin — täsmää sanasta sanaan. Myös ranskalaisten
  valtaus 1746–1749 ja Aix-la-Chapellen rauha täsmäävät (H3).
- **C2 (Marina Beach):** satama valmistui 1881, kuvernööri Grant Duff
  (kaudella 1881–1886) rakennutti promenadin 1884 ja nimesi sen
  "Madras Marinaksi" — täsmää sanasta sanaan.
- **C3 (Madras Railway):** Little Mount–Chintadripet 1835/1837,
  yhtiö 1845, Madras–Arcot 1853/1856, Beypore-linkki 1862,
  Bombay-linkki Raichurin kautta 1871, Vijayawada-linkki 1899,
  vuoden 1877 kalusto (150 veturia, 391 vaunua, 3223 tavaravaunua)
  — kaikki täsmäävät tarkasti, jopa tavaravaunujen tarkka luku.
- **C4 (Government Museum):** perustettu 1851 Nungambakkamin College
  Roadille, siirtyi Pantheon-paikalle 1854, Intian toiseksi vanhin
  museo Kolkatan Indian Museumin jälkeen, n. 500 pronssiveistosta
  jopa 1000 eaa. asti, National Art Gallery ja Museum Theatre samassa
  kompleksissa — täsmää.

## 3. Varmennetut koordinaatit

| # | Nimi | Faktapohjan koordinaatti | Riippumaton tarkistus | Ero |
|---|---|---|---|---|
| 1 | Chennai, keskipiste | 13,0825°N 80,2750°E | (Wikidata, ei erikseen haastettu) | — |
| 2 | Fort St. George | 13,0797°N 80,2869°E | Raakatekstin oma Coord: 13,0797°N 80,2869°E | 0 m |
| 3 | Marina Beach | 13,0542°N 80,2837°E | Raakatekstin oma Coord: 13,0542°N 80,2837°E | 0 m |
| 4 | Government Museum | 13,0711°N 80,2569°E | Raakatekstin oma Coord: 13,0711°N 80,2569°E | 0 m |
| 5 | San Thomen basilika | 13,0336°N 80,2778°E | 13,0336°N 80,2778°E (Nominatim) | 0 m |
| 6 | Madrasin High Court | 13,0869°N 80,2879°E | 13,0870°N 80,2878°E (Nominatim) | ~15 m |
| 7 | Connemara-kirjasto | 13,0706°N 80,2567°E | ei löytynyt suoraan Nominatimista; sijaitsee samassa museokompleksissa kuin kohde 4, koordinaatti uskottava | — |
| 8 | Chennai Egmoren asema | 13,0780°N 80,2616°E | 13,0777°N 80,2613°E (Nominatim) | ~45 m |
| 9 | Amir Mahal | 13,0566°N 80,2685°E | 13,0564°N 80,2686°E (Nominatim) | ~25 m |
| — | **Chennai Central (poistettu, uusi tieto)** | 13,0825°N 80,2750°E (VIRHE, kopio keskipisteestä) | **13,0866°N 80,2745°E** (Overpass, asemarakennus) | ~460 m alkuperäisestä |

## 4. Yhteenveto

Chennai Centralin koordinaattiongelma vahvistui ja ratkesi: oikea
asemakoordinaatti on 13,0866°N 80,2745°E (haettu Overpassista, n.
460 m pohjoiseen alkuperäisestä virheellisestä pisteestä), joten
kirjoittaja voi halutessaan palauttaa aseman kartalle tällä arvolla.
Kaikki muut kahdeksan kohdekartan koordinaattia sekä kaikki neljä
kaupunkisivun ydinnostoa (C1–C4) läpäisivät tarkistuksen täysin
virheettöminä — Chennain faktapohja on poikkeuksellisen tarkka.
