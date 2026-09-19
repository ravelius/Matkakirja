# Viesti Fablelle: Košice pelikaupungiksi, erä 1 (Bryssel/Ljubljana-kaava)

20.9.2026, Sonnet-sessio "Sonnet 3", haara `sonnet3-kosice` (pohja origin/v1970-prep b7e698d3).
Versiota ei nostettu, PR:ää ei avattu, Raamattuun ei koskettu, ämpäriin ei viety.

**Tulos:** `node --test tests/*.test.mjs` 3724 testiä, 3711 läpi, **0 kaatunutta**, 13 ohitettua.
`tarkista-kaksoisavaimet`: ei kaksoisavaimia. `tarkista-niputus`: kunnossa (429 moduulia). `savuke-reittihelmet`: 18/18.

## Mitä tehtiin

| Tiedosto | Muutos |
| --- | --- |
| `js/packs/europe.js` | `EU_CITIES`-rivi `kosice` (619, 612; todellinen paikka 48,7164 N / 21,2611 E), perustelukommentti; `EU_EDGES`: vanha `krakova–budapest (3)` → `krakova–kosice (2)` + `kosice–budapest (2)`; `pieniAarre` 31 → 32, kommentti 47 → 48 |
| `js/packs/europe-countries.js` | `kosice: 'SVK'` |
| `js/packs/maailmankartta.js` | kaupunkirivi (6542,0 / 1445,6; Krakovaan 72,8, Budapestiin 88,7, kumpikin ≥ 60), samat kaksi reittiä, `CITY_COUNTRY`, `pieniAarre` 167 → 168. Nimikyltti `start`, lx 20, ly 5 (läpäisee nimipäällekkäisyys- ja nimiölimitystestit, muiden nimiä ei tarvinnut siirtää) |
| `js/packs/europe-questions.js` | `EUROPE_QUESTIONS.kosice`: **10 kysymystä** (taso 1: maa, unkarilainen nimi Kassa; taso 2: tuomiokirkko, 1230, Pentapolitana, Immaculata/rutto 1723, Hornád; taso 3: rautatie Miskolciin 1860, muurien purku 1856, Ylä-Unkarin museo 1872), oikea-indeksit vaihtelevat (0,0,0,1,0,0,0,2,0,0 — toivottavasti riittää; sano jos haluat tasaisemmin); `EUROPE_FACTS.kosice`: 3 tietoa (yksi isoisän äänellä) |
| `js/packs/europe-artikkelit.js` | `Košice`-artikkeli (intro + teksti + lähde), 1873-katse: Kassa Unkarin kuningaskunnassa, Hlavná-katu, tuomiokirkko, Pentapolitana, jesuiittojen yliopisto 1657, hiippakunta 1802, muurit purettu 1856, sähkösanoma 1856, rautatie 1860, Ylä-Unkarin museo 1872. Ei Tšekkoslovakiaa, ei sotia, ei väestötietoa 1873 (vain 1891: 28 884) |
| `js/packs/europe-valokuvat.js` | 2 Commons-kuvaa suoraan Commonsista (`tiedosto`-kenttä; ei paikallista kopiota kuten Bryssel/Ljubljana) |
| `js/packs/fokusvirta-kosice.js` (uusi) + `fokusvirrat.js` | kevyt pakki: `matkakirja.paikkarivi` + `teksti` (**LUONNOS, Fable kirjoittaa kaanonin ≤450 merkkiä**), `pollo.kommentti` (2 kuplaa ≤125), `pollo.tunne` (utelias 0,5), `pollo.kuva` |
| `sw.js`, `tools/build-standalone.mjs` | `fokusvirta-kosice.js` SHELL/MODULES |
| `js/packs/radiot.js` | `SVK`: Rádio Slovensko (Slovenský rozhlas), `https://icecast.stv.livebox.sk/slovensko_128.mp3`, tarkistettu hakemalla 20.9.2026: HTTP 200, `audio/mpeg`. **CORS-otsaketta ei tule** (kuten monella muulla yleisradiolla listassa: soitto toimii, VU-mittari ei mittaa). Kommentti tiedoston alussa |
| `js/packs/paikallisaarteet.js` | `SVK`-pari: pieni "Kremnican kultadukaatti" (rahapaja 1328, kultaflorinit 1335, dukaatit), iso "Banská Štiavnican hopeakaivoksen kätkö" (ruuti kaivoksessa 1627, kaivosakatemia); faktat Slovakian nostojen (hahmotelma-svk) en-Wikipedia-pohjaisia tekstejä. Ei kuvaa → `KUVAA_ODOTTAVAT` |
| `js/kaupunkimusiikki.js` | `SVK: 'keski-eurooppa'` (HUN, CZE, POL samassa) |
| `js/packs/pollo-kysymykset.js` | `kosice.saapuminen`: "Millä unkarilaisella nimellä Košicea kutsuttiin?" ja "Mikä tuomiokirkko kohoaa Košicen pääkadun varrella?" |

Ei tehty (kuten Bryssel/Ljubljana): täysi kaupunkilehti, kohdekartta, Horatio-saapumisotto ja Livian ääni, luentakuva, paikallisaarrekuvat. Ei Euroopan ulkopuolelle.

## Kuvat ja lisenssit (luettu Commonsin extmetadatasta 20.9.2026)

| Kuva | Käyttö | Tekijä | Lisenssi | Lähde |
| --- | --- | --- | --- | --- |
| `Kosice - St. Elisabeth Cathedral inside.JPG` | pääkuva + fokusvirran pollo.kuva | Maros M r a z | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Kosice_-_St._Elisabeth_Cathedral_inside.JPG |
| `Košice - Hlavná (Main Street) - Statue of an angel at the Immaculata Marian Column, the memorial column for plague victims (July 2009).jpg` | lisäkuva | ZemplinTemplar | CC BY-SA 4.0 | Commons-tiedostosivu (nimi kuvan mukaan) |

Molemmat katsottu esikatselusta; ei tunnistettavia ihmisiä lähikuvassa (enkelikuvan taustalla kaukaisia ohikulkijoita). Tuomiokirkon ulkokuva ja Hlavná-katu ovat jo Slovakian Košice-nostossa, joten nämä ovat eri kuvat.

## Päätettävää: räikkä ja SVK-Košice-nosto

Uusi pelikaupunki vetää **tasan yhden** SVK-noston kaupungin kohdalle: `hahmotelma-kosice` (Košice (Kassa)), **0,3 yksikköä** kaupungin pisteestä (samat koordinaatit) — syy "kohdekarttaa ei ole". Muut Slovakian nostot ovat ≥ 20 yksikön päässä (Spiš 20,4, Bardejov 24,8, Zemplínska šírava 26,1). Räikkä **50 → 51** samalla perustelulla kuin Tervuren ja Ljubljanan suo (kommentti `tests/nostot-kartalla.test.mjs`:ssä). Vaihtoehdot:
1. räikkä 51 (nyt);
2. **nosto pois SVK-listalta** (suosittelen harkitsemaan): kaupungilla on nyt oma artikkeli, kysymykset ja fokusvirta, ja nosto on tuplana kaupungin päällä — mutta ne kuvat/tekstit ovat jo ämpärissä v1965:ssä;
3. Košicelle kohdekartta, jolloin nosto siirtyy sinne.

## Nimiöt

Uusi nimikyltti (`Košice`, oikealle) läpäisee nimipäällekkäisyys- ja nimiölimitystestit ilman `nimio`-kenttiä; muiden kaupunkien nimiä ei siirretty (Krakovan ja Budapestin nimet ovat oikealla, Košice 44 yks. Krakovasta itään — silmämääräistä selaintarkistusta ei tehty).

## Nimetyt poikkeukset testeissä (kuten Bryssel ja Ljubljana)

- `luentakuvakartta` `ILMAN_LUENTAKUVAA`, `saapumispuhe-aineisto` `ILMAN_SAAPUMISOTTOA`, `pulu-tunteet` `AANETTOMAT`: + kosice
- `liiku-nappi` `KEVYET`: + kosice
- luvut: `pollo-valmiskysymykset` 47 → 48, `pulu-tunteet` 47 → 48, `pallonimet` 263 → 264
- `paikallisaarteet` `KUVAA_ODOTTAVAT`: + SVK

## Fablen huomioon

- **Saapumisteksti on luonnos** (`fokusvirta-kosice.js` `matkakirja.teksti`, ~360 merkkiä; paikkarivi "Kassa (Košice), 1873."; päivämäärä ja reitti sinulle. Luonnos mainitsee junan Miskolcista, koska reitti ei ole tiedossa: vaihda Budapestiin/Krakovaan kaanonin mukaan).
- Reitit Krakova–Košice ja Košice–Budapest korvaavat suoran Krakova–Budapest-yhteyden (kuten Bryssel/Ljubljana korvasivat omansa). Jos haluat suoran yhteyden säilyvän rinnalla, se on yksi rivi.
- Koska Košice on Slovakian ensimmäinen pelikaupunki, Slovakian nostot ovat nyt saavutettavissa; nostotason uudelleenpoltto voi olla tarpeen (uusi kaupunki maailmankartalla).

## Päivitys (Fablen päätökset, 20.9.2026)

- `hahmotelma-kosice` **poistettu** `js/packs/hahmotelma-svk.js`:stä (SVK 19 nostoa), otsikkokommentti päivitetty; räikkä **takaisin 50:een** (`tests/nostot-kartalla.test.mjs` samaksi kuin v1970-prepissä). Kuvat jäävät kansioon/ämpäriin koskematta.
- Kysymysten oikea-indeksit tasattu vaihtamalla vaihtoehtojen järjestystä (sisältö ennallaan): Košice 2,1,3,0,2,3,0,1,0,1 (0:3, 1:3, 2:2, 3:2), Ljubljana 3,2,1 (yhteensä 13 kysymystä: 0:3, 1:4, 2:3, 3:3).
- Testit 3724, 3711 läpi, 0 kaatunutta, 13 ohitettua; niputus kunnossa.
