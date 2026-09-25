# Viesti Fablelle: maailmatilassa saa taas loitontaa koko palloon (PÄÄTÖKSET 34 kohta 19)

Opus-agentti 18.9.2026. Haara `claude/bold-ride-vow4ki-maailmatila-zoomi`
(pohja main = v1942). Ei PR:ää, ei versionnostoa, Raamattuun ja
sarjat.jsoniin ei koskettu.

## Omistajan havainto

> "Vaikka maailma tila päällä, peli ei anna zoomata ulospäin"
> (iPhone, v1942)

## Juurisyy: kaksi vikaa, molemmat js/pallolauta/lauta.js

**1. Maailmanappi ei tahdistanut zoomirajoja lainkaan (pääsyy).**
`tahdistaZoomirajat()` — se ainoa paikka, joka kirjoittaa
OrbitControlsin `minDistance`/`maxDistance` — ajettiin vain maan
vaihtuessa, ruudun mitatessa (`mitoita`), linssin syrjäytyksestä
(`asetaZoomirajat`) ja matkan vapautuksesta. Maailmanapin kytkin
(`js/ui.js paivitaKehittajaMaailma` → `pallolauta.paivita()`) EI ollut
listalla. `maanZoomiraja()` kyllä palauttaa maailmatilassa `null`, mutta
kukaan ei kysynyt sitä uudelleen: `maxDistance` jäi siihen lukuun,
jonka kohdemaan saapumisnäkymä oli asettanut. Nipistys ja rulla
kulkevat suoraan OrbitControlsin läpi (js/pallo.js päästää ctrl/cmd-
rullan ja kahden sormen eleen kirjastolle), joten ne pysähtyivät
saapumisnäkymään — täsmälleen omistajan havainto.

**2. Laudan oma katto ei riitä pystyruudulle (jäänyt vika).**
Vaikka rajat olisi tahdistettu, maailmatilassa katto olisi ollut
`PALLO_KORKEUS_MAX = 2,5`. Globe.gl:n fov on PYSTYkulma, joten
pystyruudulla mitta on ruudun kapeampi sivu: 390 × 844 vaatii korkeuden
**4,37** (`js/pallolauta/kamera.js kokoPallonKorkeus`), jotta pallo
mahtuu kokonaan. 2,5:ssä pallo on yhä ruutua isompi. Työpöydällä
(1440 × 800) sama kaava antaa 1,63, eli siellä 2,5 oli aina riittänyt —
siksi vika näkyi vain puhelimella.

**Kohta 15 c on syytön.** Puhelimen zoomiraja 60 → 40 lautayksikköä
(`lahizoominSyvennys`, `lahinLeveys`) koskee VAIN `korkeusMin()`-haaraa
eli `minDistance`ia. Se ei kirjoita `maxDistance`ia eikä maailmatilan
poikkeusta. Mitattu vahvistus: maailmatila pois, 374 px kangas →
`minAlt 0,0463`, `maxAlt 0,0600`; korjauksen jälkeen minimi on sama
luku. Uloszoomausta se ei siis kaventanut.

**Tasokartta oli kunnossa.** `js/kartta.js fokusRajaukset()` ja
`panorointiVapaa()` palauttavat maailmanapilla `null`/`true` ja ne
kysytään joka eleessä — tasokartalla ei ole pallon kaltaista
kertaalleen kirjoitettavaa kirjaston rajaa.

## Korjaus (js/pallolauta/lauta.js)

1. `maailmatilassa()` — yksi kysymys (kehittäjätila JA maailmanappi JA
   ei katselukuva); `maanZoomiraja` ja `maanPanoraja` lukevat sitä.
2. `maailmatilanKatto()` = `Math.max(PALLO_KORKEUS_MAX,
   kokoPallonKorkeus({ leveys, korkeus, fov }))` — sama kaava kuin
   satelliitti- ja topografialinssillä, ei kolmatta kopiota. `Math.max`
   pitää työpöydän entisen 2,5:n voimassa.
3. `tahdistaZoomirajat`: maailmatilassa (kun maan kattoa ei ole)
   `max = maailmatilanKatto()`.
4. `paivita`: maailmatilan kytkeytyminen tahdistaa rajat heti, samassa
   hetkessä kuin kerman kytkentä (`asetaTasoituksenMaailma`).
   `kattoPuristus` nollataan samalla, kuten linssin syrjäytyksessä —
   maailmatila SALLII koko pallon, ei vie sinne.

Maailmatila pois → raja kuten ennen (kohdemaan saapumisnäkymä + kohta
15 c:n lähiraja), koodipolku koskematon.

## Mittaus: uusi savuke `tools/savukkeet/savuke-maailmatila-zoomi.mjs`

Chromium 390 × 844, dpr 3, kosketus päällä, Fogg Budapestissa, laatat
ämpäristä route-välityksellä. Kangas 374 × 771 css-px.

| vaihe | katto (altitude) | korkeus loitonnuksen jälkeen | pallon halkaisija |
|---|---|---|---|
| A maailmatila pois | **0,0600** | 0,0600 (kiinni katossa) | 4702 px ≫ ruutu 374 px |
| B maailmatila päällä, heti kytkennästä | **4,1223** | — | — |
| B rulla ulos pohjaan | 4,1223 | **4,1223** | **329 px ≤ 374 px** |
| C nipistys ulos (CDP-kosketus) | 4,1223 | **4,1223** (sama kuin rulla) | — |

A:n katto 0,0600 on Unkarin saapumisnäkymä KORKEUTEEN sovitettuna
(PÄÄTÖKSET 17, kapea ruutu) — se on se luku, johon loitonnus pysähtyy
maailmatilan ollessa pois, ja se säilyi ennallaan.

Nipistys mitattiin erikseen (`Input.dispatchTouchEvent`, kaksi sormea
150 px → 14 px), koska iPhonella loitonnus tehdään nipistämällä: se vie
kameran samaan korkeuteen kuin rulla.

**Vastakoe** (`--vastakoe`, korjaus pois tarjoilussa) toistaa vian
sellaisenaan: maailmatila päällä katto pysyy 0,0600:ssa, rulla ja
nipistys eivät liikuta kameraa, pallon halkaisija 4702 px. V2, V3 ja V4
kaatuvat — 3/6. Korjattuna 6/6.

WebKit-ajoa ei tehty: savukkeessa on `--webkit`-lippu, mutta C-vaihe
(CDP-kosketus) ei ole siellä käytettävissä ja mitattava raja on
kirjaston `maxDistance`, joka on moottorista riippumaton. Aikakatto ja
kahden ajon sääntö käytettiin kohdemittaukseen ja vastakokeeseen.

## Portit

- `node --test tests/*.test.mjs` → 3636 testiä, 0 fail (13 skip).
- `node tools/tarkista-savukkeet.mjs` → kunnossa (2046 ui-viittausta).

## Ehdotus Raamattuun (Fable päättää)

PÄÄTÖKSET 34 kohta 19: maailmatilassa uloszoomauksen katto on koko
pallon näkymä (`kokoPallonKorkeus`), ei laudan 2,5 — ja kytkin
tahdistaa rajat heti. Vartio:
`tools/savukkeet/savuke-maailmatila-zoomi.mjs`.
