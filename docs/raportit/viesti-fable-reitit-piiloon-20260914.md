# Naapurireitit piiloon kunnes pelaaja painaa Liiku (ei versionostoa)

Opus-agentti Fablelle 14.9.2026. Haara `claude/era-reitit-piiloon`.
Versiota EI nostettu — Fable versioi ja julkaisee.

Omistajan pyyntö (14.9.2026, sanatarkasti): *"onko kaupunkien valiset
siirtymalinjat ja merireitit omalla tasollaan? jos on niin ne voi ottaa
pois nakyvista ja palauttaa vasta kun pelaaja painaa liiku nappia"*.

## Muutos yhtenä lauseena

`js/ui.js:7685` (`matkareittienValinta`, funktio alkaa riviltä 7676):

```js
    const reittiTunnukset = kaupunki
      ? (this.liukuAuki ? [...(game.board.adj.get(kaupunki.id) ?? [])] : [])
      : (kesken ? [kesken] : []);
```

Aiemmin kaupunkihaara antoi naapuriviuhkan aina, ja `naytetaan`-ehdon
`vaiheessa`-osa (`phase === 'roll' || phase === 'move'`) piti sen
ruudulla koko sen ajan, jonka pelaaja seisoi kaupungissa.

**Miksi juuri tähän haaraan eikä `naytetaan`-lauseeseen:** `naytetaan`
ohjaa myös lentokaaria, joilla on oma, omistajan 1.9.2026 päättämä
elinikänsä. Reittitunnusten porttaaminen jättää lentokaaret
koskemattomiksi — mitattu, ks. luku "Lentokaaret".

Perustelu on kirjoitettu funktion omaan kommenttiin
(`js/ui.js:7629–7649`) ja pallon piirtäjän tiedostokommentti
(`js/pallolauta/reitit.js`) päivitettiin vastaamaan sääntöä. Muuta ei
koskettu: piirto, lentokaaret, kamera ja CSS ovat ennallaan.

## Tilannetaulukko (mitattu selaimessa, pallolauta, 2560 × 1352)

Luvut ovat PALLON OMISTA KERROKSISTA (`pathsData` reittiviivat ilman
varjokaksoisia, `pointsData` askelhelmet, `arcsData` lentokaaret) eli
sitä, mitä pelaaja näkee — ei säännön paluuarvoa. Kaupunki Varsova
(4 maareittiä), lentovartio Ateena (1 maa + 2 meri + lentokenttä).

| Tilanne | ENNEN | JÄLKEEN |
| --- | --- | --- |
| Kaupunki, liuku kiinni, vaihe `action` | 0 viivaa, 0 helmeä | 0 viivaa, 0 helmeä (ei muutu) |
| Kaupunki, liuku kiinni, vaihe `roll` | **4 viivaa, 10 helmeä** | **0 viivaa, 0 helmeä** |
| Kaupunki, liuku kiinni, vaihe `move` | **4 viivaa, 10 helmeä** | **0 viivaa, 0 helmeä** |
| Kaupunki, liuku auki | 4 viivaa, 10 helmeä | 4 viivaa, 10 helmeä |
| Kesken reittiä, liuku kiinni, vaihe `move` | 1 viiva (`berliini\|varsova`), 3 helmeä | 1 viiva, 3 helmeä |
| Katselutila (liuku auki) | 0 viivaa | 0 viivaa |
| Botin vuoro (liuku auki) | 0 viivaa | 0 viivaa |
| Ateena, lentolista auki | 3 viivaa, 7 helmeä, **1 kaari** | 3 viivaa, 7 helmeä, **1 kaari** |
| Ateena, ei listaa, liuku kiinni | 0 viivaa, 0 kaarta | 0 viivaa, 0 kaarta |

Erä muuttaa siis tasan kaksi riviä: kaupungissa seisovan pelaajan
vaiheet `roll` ja `move`. Kaikki muu on numeroa myöten ennallaan.

### Bussi ja lento

Bussi, laiva ja lento valitaan Liiku-napin liu'usta. Napautusketju
mitattiin oikeasta käyttöliittymästä (Ateena, Liiku › Lentäen): sillä
piirtokierroksella, jolla lista aukeaa, `liukuAuki` on **vielä tosi**
(liu'un oma sulkija ajetaan vasta tapahtuman kuplinnassa perässä), joten
viuhka ja kaari piirtyvät kuten ennenkin. Mittaus:

    Liiku painettu  → liukuAuki true,  travelExpanded false, viivoja 3, kaaria 0
    Lentäen painettu → liukuAuki false, travelExpanded true,  viivoja 3, kaaria 1

Tämä toimii täsmälleen samoin ennen ja jälkeen muutoksen.

### Lentokaaret

Omistajan 1.9.2026 sääntöä ei muutettu. `lennot`-listaa ja
`lentoLahto`-kenttää ei kosketa, eikä `avain` voi tyhjentyä kaarten alta:
avain on epätyhjä aina kun `lennot.length > 0`. Savukkeen vartiot 5a/5b
ovat vihreitä sekä ennen että jälkeen.

## Automaattinen nopanheitto (eran suurin riski — mitattu, ei paateltu)

**Havainto: automaattinen nopanheitto ei koskaan tapahdu kaupungissa,
joten erä ei kosketa sitä.** `game.jatkaMatkaaItsestaan()`
(`js/game.js:1658–1665`) ja lipun asetus `beginTurn`issa
(`js/game.js:1643–1646`) vaativat molemmat `player.pos.type === 'edge'`.
Automaatti on siis reitin varren jatkoheitto — ja juuri siinä tilassa
`kesken`-poikkeus pitää sen yhden reitin näkyvissä (taulukon rivi
"Kesken reittiä": 1 viiva, 3 helmeä, ennallaan).

Kaupungissa `beginTurn` tekee vain **automaattivalinnan**
(KARTTAUUDISTUKSEN PAATOKSET 5: liftaus tai laiva valitaan valmiiksi,
bussi ei estä sitä), ja vuoro alkaa vaiheesta `roll` niin, että pelaaja
painaa itse "Heitä noppa". Ajoin tämän vuoron läpi oikeassa pelissä
(Varsova, rahaa 300 p, tehtävä vaimennettu, muutos päällä):

| Hetki | Vaihe | Noppa | Reittiviivoja | Kohdemerkkejä pallolla |
| --- | --- | --- | --- | --- |
| Vuoron alku (automaattivalinta tehty) | `roll` | – | 0 | 0 |
| Heiton hetki (nappi painettu) | `move` | 6 | 0 | 0 |
| Heiton jälkeen | `move` | 6 | 0 | **8** |

Pelaaja siis näkee nopan ja heiton jälkeen kahdeksan napautettavaa
kohdemerkkiä kaupunkien nimineen — hän tietää, minne pääsee. Mitä hän
EI enää näe, on se viiva, joka kertoo mitä kautta kukin kohde on. Laattaan
poltettu reittiVERKKO on yhä kartalla, mutta kohdemaan värillisen pinnan
päällä se on maan sisällä käytännössä lukukelvoton (näkyy kuvista:
`reitit-kaupunki-automaattiheitto-ennen.png` vs. `-jalkeen.png`).

**En laajentanut erää enkä keksinyt omaa ratkaisua.** Jätän Fablelle
päätettäväksi yhden kysymyksen: **palautetaanko viuhka vaiheessa `move`
(eli heti kun noppa on heitetty ja pelaaja valitsee kohdetta), vaikka
liuku on kiinni?** Se olisi yhden sanan muutos samaan lauseeseen
(`this.liukuAuki || game.phase === 'move'`), ja savukkeen vartio 1c
kertoo sen vaikutuksen suoraan. Omistajan pyyntö luki "palautetaan kun
pelaaja painaa liiku", joten toteutin sen kirjaimellisesti.

## Portit

| Portti | Tulos |
| --- | --- |
| `npm test` | **# pass 3349, # fail 0** (# tests 3362, # skipped 13, 135 s) |
| `node tools/tarkista-kaksoisavaimet.mjs` | `ei kaksoisavaimia` |
| `node tools/tarkista-niputus.mjs` | `niputus kunnossa: 387 moduulia, 4211 top-level-julistusta, ei törmäyksiä` |
| `node tools/tarkista-savukkeet.mjs` | `savukkeet kunnossa: 1615 ui-viittausta, 404 metodia, 533 kenttää, 31 lehtitilan kenttää` |
| `grep -rn '^<<<<<<<' js css tests tools` | ei osumia |

### Testi

Laajensin olemassa olevaa `tests/pallolauta.test.mjs`-tiedostoa (siellä
oli jo "Reitit: yksi sääntö, kaksi piirtäjää" -lohko) yhdellä uudella
testillä, joka **ajaa säännön oikealla pelillä** eikä etsi lähteestä
lauseita: `UI.prototype.matkareittienValinta.call(...)` Varsovassa ja
Ateenassa. Se mittaa kaikki taulukon rivit sekä sen, ettei pallon
piirtäjä tunne `liukuAuki`-kenttää lainkaan.

### Savuke

`tools/savukkeet/savuke-reitit-piiloon.mjs` (uusi, rekisteröity
`tools/savukkeet/README.md`:hen). Olemassa olevat reittisavukkeet eivät
sopineet laajennettaviksi: `savuke-pallo-reitit` mittaa reitinpäiden
GEOMETRIAA puhelimen ruudulla ja asettaa itse `liukuAuki = true`, ja
`savuke-liiku` mittaa Liiku-napin kulkutapoja ja hintoja. Kumpikaan ei
mittaa näkyvyyttä eikä aja laajalla ruudulla.

    NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
      node tools/savukkeet/savuke-reitit-piiloon.mjs docs/raportit/kuvat jalkeen

| Ajo | Tulos |
| --- | --- |
| Muutos päällä | **11/11 läpi** |
| **VASTAKOE** (muutos palautettu, sama savuke) | **9/11 läpi** — punaisina tasan 1b (vaihe `roll`: 4 viivaa, 10 helmeä) ja 1c (vaihe `move`: 4 viivaa, 10 helmeä) |

Vastakoe ajettiin palauttamalla se yksi rivi `js/ui.js`:ssä, ajamalla
savuke ja palauttamalla muutos takaisin; ero on juuri ne kaksi vartiota,
ei mikään muu.

### Kuvat (kaapattu 2560 × 1352, talletettu 768 × 406)

Kartan pergamenttipinta on kohinaa: täysikokoinen png on yli 2 Mt, joten
kaappaus pienennetään selaimen omalla kankaalla samalla kaavalla kuin
`savuke-liiku` (n. 435 kt / kuva). Mittaukset luetaan pallon kerroksista
eikä kuvasta, joten mittakaava ei vaikuta yhteenkään lukuun.

| Tilanne | ENNEN | JÄLKEEN |
| --- | --- | --- |
| Kaupunki, liuku kiinni, vaihe `action` | `docs/raportit/kuvat/reitit-kaupunki-kiinni-ennen.png` | `docs/raportit/kuvat/reitit-kaupunki-kiinni-jalkeen.png` |
| Kaupunki, liuku auki | `docs/raportit/kuvat/reitit-kaupunki-auki-ennen.png` | `docs/raportit/kuvat/reitit-kaupunki-auki-jalkeen.png` |
| Kaupunki, liuku kiinni, vaihe `roll` | `docs/raportit/kuvat/reitit-kaupunki-automaattiheitto-ennen.png` | `docs/raportit/kuvat/reitit-kaupunki-automaattiheitto-jalkeen.png` |
| Kesken matkaa | `docs/raportit/kuvat/reitit-kesken-matkaa-ennen.png` | `docs/raportit/kuvat/reitit-kesken-matkaa-jalkeen.png` |

Ratkaiseva pari on `automaattiheitto`: ENNEN-kuvassa Varsovasta lähtee
neljä katkoviivaa askelhelmineen, JÄLKEEN-kuvassa kartta on puhdas.
`kiinni`-pari on tarkoituksella identtinen — vaiheessa `action` viuhka
oli piilossa jo ennen erää.

## Mitä EI tehty

- **Ei versionostoa** (`tools/uusi-versio.mjs` ajamatta), ei mergeä, ei
  pushia mainiin.
- **Lentokaarten sääntöä ei muutettu** millään tavalla.
- Ei koskettu tiedostoihin `js/pallolauta/maapaneeli.js`, `css/styles.css`
  eikä maan rajan piirtokoodiin. Muutos ei vaatinut CSS:ää.
- Ei muutettu Raamattua eikä kaanonia.
- Vaiheen `move` viuhkaa **ei** palautettu (ks. luku "Automaattinen
  nopanheitto") — se on Fablen päätös.

## Sivuhavainto (kirjattu, ei korjattu)

Lentolistan auettua (`travelExpanded`, `liukuAuki` jo epätosi) seuraava
`paivitaMatkareitit`-kutsu tyhjentäisi kerroksen, koska `naytetaan` on
silloin epätosi — kaari ja viuhka jäävät ruudulle vain siksi, ettei
kerrosta piirretä uudelleen. Tämä on ennallaan eikä liity tähän erään,
mutta se on hauras: mikä tahansa uusi kutsu siinä tilassa veisi
lentokaaren. En koskenut siihen.
