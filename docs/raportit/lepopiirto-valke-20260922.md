# Lepopiirron strobovälke: syy, mittaus ja korjaus (22.9.2026)

Omistajan tuntumatesti v2104:stä iPhonella: **"kartta välkkyy kuin
strobovalo"**. Fable teki hätäkorjauksen (v2105: lepopiirto oletuksena
pois). Tämä raportti kertoo, mikä välkkeen aiheutti, miten se mitattiin
ja miksi valittu korjaus on juuri tämä.

## Oire ja sen aiempi tulkinta

v2101–v2104 (sulavuuskatsaus kohta 18) ohitti `renderer.render`-kutsun,
kun mikään ei muuttunut. Silloin havaittiin, että Playwrightin
`page.screenshot` antaa WebKitissä TYHJÄN kankaan (mitattu 47,38,33 =
pelkkä tausta), ja se tulkittiin automaation erikoisuudeksi: lepopiirto
sammutettiin `navigator.webdriver`illa ja savukkeet pyysivät sen
`?koe=lepopiirto`-lipulla.

**Tulkinta oli väärä.** Tyhjä kaappaus oli sama vika, jonka omistaja
näki näytöllä: kartta katosi kokonaan ohitetuilla kehyksillä ja palasi
piirretyillä, eli 15 kertaa sekunnissa (hehkupisteen syke, kohta 4
päätöspuussa). Se on strobovalo.

## Mittari: kaappaus sommittelijan kautta, ei readPixels

`readPixels` lukee sen puskurin, johon juuri piirrettiin — se ei näe
välkettä koskaan. Välkkeen näkee vain se polku, joka näyttää kuvan:
sommittelija. Playwrightin WebKit-kaappaus kulkee sitä polkua.

Mittarina PNG:n koko: tyhjä kangas (pelkkä tausta + DOM-kuoret)
pakkautuu murto-osaan täydestä kartasta, joten 12–14 kaappauksen
`max/min`-suhde erottaa vakaan välkkyvästä ilman kuvakirjastoa.
Ajo: Ranska, lepo, kaappaus 70 ms välein.

| toteutus | kaappausten kokoero levossa |
| --- | --- |
| piirto joka kehys (`?koe=levovanha`) | 1,12 × |
| **renderin ohitus (v2101–v2104)** | **24,0 ×** ← välke |
| **renderin ohitus + `preserveDrawingBuffer: true`** | **18,4 ×** ← välke |
| **tickin ohitus (valittu korjaus)** | **1,00 ×** |

Pulun lennon aikana (CSS-animaatio kartan päällä) valitulla korjauksella
1,00 ×.

## Miksi preserveDrawingBuffer ei auta

Ensimmäinen arvaus oli, että vika on piirtopuskurin tyhjentämisessä
esityksen jälkeen. Se todettiin vääräksi mittaamalla: lippu meni
oikeasti läpi (`getContextAttributes().preserveDrawingBuffer === true`)
ja välke jäi. WebKit ei siis anna sommittelijalle kankaan edellistä
kuvaa silloin, kun sivu animoi eikä kangasta piirretty tällä
kehyksellä — puskurin säilyttäminen ei muuta sitä. Lippu olisi maksanut
kopion joka kehyksellä eikä olisi korjannut mitään.

## Miksi tickin ohitus toimii

Kirjaston tick tekee muutakin kuin renderin:

    controls.update() → renderer.render() → extraRenderers (CSS2D)
    → hover-säteenjäljitys → tweenGroup.update()

Renderin ohitus jätti kaikki muut pyörimään, eli sivu animoi ja kangas
sommiteltiin joka kehys — ilman uutta piirtoa. Kun koko tick ohitetaan,
kangasta ei kosketa lainkaan, eikä CSS2D kirjoita DOMiin: sivu on
levossa samalla tavalla kuin staattinen WebGL-kangas, joka piirretään
kerran ja jätetään näkyviin. Se toimii iOS Safarissa (ja on se tapa,
jolla Mapbox ja deck.gl lepäävät).

Toteutus: oma rAF on kello ja tekee saman päätöksen kuin ennen; tarve →
`resumeAnimation()` (sykli heti, silmukka päälle 60 Hz), ei tarvetta →
`pauseAnimation()`. `renderer.render`-kääre jäi, mutta vain
tarkkailijaksi, joka kirjaa piirron hetken sykettä varten.

## Muut muutokset samassa erässä

- **Oletus pysyy POIS (Fable 22.9.2026).** Lepopiirto on käytössä vain
  `?koe=lepopiirto`-lipulla. WebKit-toisto ei yksin riitä oletuksen
  kääntämiseen, koska edellinen vartija petti täsmälleen tässä kohdassa;
  omistaja toteaa levon ensin oikealla iPhonella lipullisella
  osoitteella, ja oletus käännetään vasta sen jälkeen omana PR:nään.
- **Automaation poikkeus pois.** Lippu on nyt SAMA pelaajalle ja
  automaatiolle: `navigator.webdriver`-poikkeusta ei ole. Juuri se
  poikkeus esti vartijaa näkemästä välkkeen — CI mittasi eri polkua kuin
  pelaaja ajoi. `?koe=levovanha` voittaa lipun.
- **Uni kulkee lepopiirron kautta.** lauta.js nukuttaa pallon, kun sitä
  ei katsota (lehti auki, kuori piilossa, sivu taustalla). Ennen se
  kutsui `pauseAnimation`ia suoraan; nyt `pallo.__piirto.uni(bool)`,
  jotta kirjaston silmukalla on yksi omistaja eikä kaksi, jotka
  kumoaisivat toisensa.
- **Silmukan tila luetaan piirroista.** Jos joku muu herättää silmukan
  (satelliitti-avaruus.js `varmistaKehykset` pakottaa kehyksen
  pause+resume-parilla), odottamaton piirto korjaa lipun, eikä silmukka
  jää pyörimään 60 Hz:llä.
- **Vartija savuke-lepopiirto V5**: levossa sommittelijan kaappaukset
  ovat kaikki karttaa (kokoero ≤ 1,5 ×). Tämä väite olisi nähnyt vian.

## Todennus

| mittaus | tulos |
| --- | --- |
| savuke-lepopiirto webkit | 10/10 (V5 ero 1,00 ×, lepo 14,5 fps, vedossa 0 pysähdystä) |
| savuke-lepopiirto chromium | 10/10 (V5 ero 1,00 ×, lepo 14,5 fps) |
| julkaisusarja (57 savuketta) | ks. alla |
| `node --test tests/*.test.mjs` | 3925 testiä, 0 punaista |
| lepo 38 s kamera-ajon jälkeen | 14,3–15,0 fps, `pakko` 0 (ks. alla) |

**Laitetodennus jäi kesken.** Laitetestaajalla oli simulaattori, ei
oikeaa iPhonea, ja `simctl screenshot`/`recordVideo` ei nähnyt eroa
kummassakaan tilassa (uusi korjaus tai `?koe=levovanha`): suurin
kehysten välinen kirkkausmuutos 0,26/255 molemmilla. Se ei vahvista
eikä kumoa — simulaattorin kaappaus kulkee eri sommittelupolkua kuin
näytön skannaus, samasta syystä kuin readPixels ei näe välkettä.
Sommittelijan polku on tavoitettavissa kaappaamalla Simulatorin ikkuna
macOS:n puolelta (`screencapture`), ei simctl:llä; sitä pyydettiin
kokeilemaan.

Vahvin olemassa oleva todiste on WebKit-toisto: sama moottori kuin iOS
Safarissa, oire täsmälleen omistajan kuvaama, ja korjaus poistaa sen
mitattavasti. Lopullinen tarkistus on omistajan silmä, ja siksi oletus
pysyy tässä erässä pois: omistaja avaa pelin iPhonella osoitteella
`?koe=lepopiirto` ja katsoo, onko lepo vakaa. Oletuksen kääntö on oma
PR:nsä sen jälkeen.

## Sivuhavainto 32 fps: laattojen laskeutuminen, ei vuoto

Laitetestaaja mittasi simulaattorissa levossa 32,3 fps ja lähes kaikki
piirrot `pakko`-syystä. Mitattu WebKitissä (kamera uuteen paikkaan,
sitten lepoa 38 s, `tarvitaan`-kutsujen pinot kerättynä):

| ikkuna kamera-ajon jälkeen | piirtoja | syyt |
| --- | --- | --- |
| 0–3 s | 29,6 fps | pakko 64, hidas 23, kamera 1 |
| 3–6 s | 15,0 fps | **pakko 0**, hidas 45 |
| 10–13 s | 14,7 fps | **pakko 0**, hidas 44 |
| 20–23 s | 14,7 fps | **pakko 0**, hidas 44 |
| 35–38 s | 14,3 fps | **pakko 0**, hidas 43 |

`pakko` katoaa siis kokonaan noin kolmessa sekunnissa eikä palaa: kyse
ei ole vuodosta vaan LASKEUTUMISIKKUNASTA. Kutsujat järjestyksessä
(3 s:n ikkuna kamera-ajon jälkeen): nimiöiden `asetaKaikki → likaa`
(1031), nimiöiden crossfade `peitto` glnimiot-sovittimen
`etenaHaivytykset`istä (204 + 152), laattojen `haiveAskel` (60),
rasterien `varaa` (48) ja nostojen `jaaNostot` (23). Kaikki ovat
saapuvia laattoja, nimiöitä ja häiveitä — juuri sitä, mikä KUULUU
piirtää. Laitetestaajan luku on siis mittaushetki laskeutumisikkunassa
(simulaattorilla laatat tulevat hitaammin), ei lepoa.

Asettunut lepo on **14,3–15,0 fps**, ja se on kokonaan hehkupisteen
syke (`hidas`, 15 fps). Ilman hehkupistettä lepo olisi sykkeen 4 fps.
Tämä vastaa suunniteltua.

## Avoin

Ei avoimia tämän erän osalta. Oletuksen kääntö päälle odottaa omistajan
silmää iPhonella (`?koe=lepopiirto`).
