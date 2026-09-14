# Reittiviuhka on matkasessio: Liikusta perille tai peruutukseen

Opus-agentti Fablelle 14.9.2026. Haara `claude/era-reitit-piiloon`, PR #2411.
Versiota EI nostettu — Fable versioi ja julkaisee.

Raamattu **KARTTAUUDISTUKSEN PAATOKSET 8** (omistaja 14.9.2026, sanatarkasti):
*"reittiviuhka tulee nakyviin heti kun pelaaja painaa 'liiku' nappia ja on
kokoajan nakyvissa kunnes pelaaja saapuu uuteen kaupunkiin tai peruuttaa
liikkumisen eli jaakin nykyiseen kaupunkiin"*.

Lähtötilaus samana päivänä: *"onko kaupunkien valiset siirtymalinjat ja
merireitit omalla tasollaan? jos on niin ne voi ottaa pois nakyvista ja
palauttaa vasta kun pelaaja painaa liiku nappia"*.

## Mihin tila asetetaan ja mistä se nollataan

| Mitä | Missä |
| --- | --- |
| Kenttä `this.matkaSessio` (lähtökaupungin tunnus tai null) | `js/ui.js:3146` (rakennin) |
| **ASETUS** — Liiku-napin painallus avaa liu'un | `js/ui.js:11614` (`vaihdaLiuku`) |
| **NOLLAUS** — perillä tai peruutus, yksi ehto | `js/ui.js:7727–7746` (`matkaSessioKesken`) |
| Sääntö, joka lukee sen | `js/ui.js:7758` (`matkareittienValinta`) |

```js
// vaihdaLiuku (js/ui.js:11614)
if (this.liukuAuki) this.matkaSessio = this.game.cityOf?.()?.id ?? 'kesken';

// matkaSessioKesken (js/ui.js:7727)
if (!this.matkaSessio) return false;
if (!kaupunki) return true;                                    // kesken reittiä
if (kaupunki.id !== this.matkaSessio) { this.matkaSessio = null; return false; }  // perillä
const auki = this.liukuAuki || this.travelExpanded
  || game.phase === 'move' || (game.phase === 'roll' && !game.autoTravel);
if (!auki) this.matkaSessio = null;                            // peruutus
return auki;

// matkareittienValinta (js/ui.js:7758)
const reittiTunnukset = kaupunki
  ? (matkalla ? [...(game.board.adj.get(kaupunki.id) ?? [])] : [])
  : (kesken ? [kesken] : []);
```

### Miksi juuri nämä ehdot — mitattu, ei arvattu

1. **Liiku-nappi kulkee vain `vaihdaLiuku`-metodin kautta.** Monitoiminappi on
   ainoa kuuntelija (`js/ui.js:11465`), ja liuku on ainoa tie matkanappeihin
   (`piirraToimintorivi`). Mitattu oikeasta napautusketjusta selaimessa.
2. **"Perillä" on ASEMA, ei tapahtuma.** Sessio muistaa lähtökaupungin, ja
   matka on ohi kun `game.cityOf()` on jokin muu kaupunki. Näin se kestää
   bussin ja lennon (yksi toiminto kaupungista toiseen), liftauksen ja laivan
   (monta askelta) sekä **monen vuoron matkan**: reitin varrella
   `game.jatkaMatkaaItsestaan` (js/game.js:1658) jatkaa samaa matkaa, ja koska
   kesken reittiä ei olla missään kaupungissa, sessio ei nollaudu vuoron
   vaihtuessa. Mitattu: vartiot 4a ja 4b.
3. **`vaihe === 'roll'` ei yksin kelpaa matkan merkiksi.** Kaupungissa se on
   myös LEPOTILA: kun noppatapoja on yksi, `game.beginTurn` esivalitsee tavan
   (`autoTravel`, js/game.js:1627) ja vuoro alkaa heti heittovaiheesta ilman
   että pelaaja on painanut mitään — juuri sitä omistaja katsoi. Pelaajan itse
   valitsema tapa jättää `autoTravel` epätodeksi, ja silloin heittovaihe on
   aito matkan vaihe. Mitattu Varsovassa: lepotila `vaihe roll, autoTravel
   true, liukuAuki false`.
4. **Ensimmäisen kierroksen `liukuAuki`-ehto oli väärä mitta.** Liuku
   sulkeutuu JOKAISESTA matkanapista (`js/ui.js:11512`
   `liuku.addEventListener('click', …)`), eli heti nopanheiton jälkeen.
   Mitattu: heiton jälkeen `liukuAuki false`, `vaihe move`.

### Kaikki löytämäni peruutustavat

Peruutus tunnistetaan TILASTA eikä napeista, koska tapoja on monta ja lisää
voi tulla. Jokainen näistä päätyy samaan tilaan — lähtökaupunki, ei liukua,
ei kohdelistaa, ei aitoa heittovaihetta — ja yksi ehto kattaa ne kaikki:

| # | Tapa | Reitti koodissa |
| --- | --- | --- |
| 1 | Liiku-napin toinen painallus | `vaihdaLiuku` (js/ui.js:11591) |
| 2 | Napautus kartalle liu'un ollessa auki | `kytkeLiukuSulku` → `suljeLiuku` (js/ui.js:11885) |
| 3 | Kohdelistan "Takaisin" (bussi, laiva, lento) | `suljeMatkavalikko` + `render` (js/ui.js:11176) |
| 4 | "Vaihda matkustustapa" ennen heittoa | `game.actionCancelTravel` (js/game.js:1781) → vaihe `action` |
| 5 | Linssikartan avaus | `js/pallolauta/linssikartta.js:166, 202` → `ui.suljeLiuku` |
| 6 | Pöllön avaaminen | `js/pollo.js:4229` → `ui.suljeLiuku` |
| 7 | Liiku-napin katoaminen rivistä | `piirraToimintorivi` `else this.liukuAuki = false` (js/ui.js:11477, 11516) |
| 8 | Toinen toiminto samassa kaupungissa (Tutki, lehti, modaali) | render sulkee liu'un, vaihe ei ole `roll`/`move` |

Vartiot 6a (tapa 1) ja 6b (tapa 2, sama metodi jonka tapa 5 ja 6 kutsuvat)
mittaavat nämä selaimessa. Tavat 3, 4, 7 ja 8 päätyvät samaan mitattuun
tilaan; yksikkötesti ajaa niistä vaiheparit (`action`) ja (`roll` +
`autoTravel`).

**Epäselvä kohta, jota en arvannut:** `game.autoTravel` ei nollaudu
`actionCancelTravel`issa. Jos pelaaja peruu esivalitun tavan ja valitsee sitten
itse liftauksen, `autoTravel` jää todeksi ja liu'un sulkeminen tulkitaan
peruutukseksi. Seuraus on pieni ja palautuva — viuhka katoaa, ja Liiku tuo sen
takaisin — enkä koskenut `game.js`:ään. Kirjattu Fablelle.

## Tilannetaulukko (mitattu selaimessa, 2560 × 1352, Varsova = 4 maareittiä)

Luvut ovat PALLON OMISTA KERROKSISTA (`pathsData` reittiviivat ilman
varjokaksoisia, `pointsData` askelhelmet, `arcsData` lentokaaret). Matka
ajetaan oikeilla napeilla: Liiku ja "Heitä noppa" napautetaan
alanappiriviltä, ei kirjoiteta kenttiin.

| Tilanne | ENNEN (erää edeltävä sääntö) | JÄLKEEN |
| --- | --- | --- |
| Lepotila kaupungissa ennen Liikua (`roll`, autoTravel) | **4 viivaa, 10 helmeä** | **0 viivaa, 0 helmeä** |
| **Liiku painettu** (liuku auki) | 4 viivaa, 10 helmeä | 4 viivaa, 10 helmeä, `matkaSessio = varsova` |
| **Nopanheiton jälkeen** (liuku sulkeutui, vaihe `move`) | 4 viivaa | **4 viivaa**, sessio yhä auki |
| Kohdelista auki (bussi/laiva/lento, liuku kiinni) | piirtyi vain vanhentuneena kerroksena | 4 viivaa, piirretään oikeasti |
| Kesken reittiä (sessio tallessa) | 1 viiva, 3 helmeä | 1 viiva, 3 helmeä |
| Kesken reittiä sivunlatauksen jälkeen (ei sessiota) | 1 viiva, 3 helmeä | 1 viiva, 3 helmeä |
| **Perillä uudessa kaupungissa** | 0 viivaa (sessiota ei ollut) | 0 viivaa, sessio päättynyt |
| **Peruutus Liiku-napista** | **4 viivaa jäi päälle** | **0 viivaa**, sessio päättynyt |
| **Peruutus kartalta** (`suljeLiuku`) | **4 viivaa jäi päälle** | **0 viivaa**, sessio päättynyt |
| Katselutila (sessio ja liuku auki) | 0 viivaa | 0 viivaa |
| Botin vuoro (sessio ja liuku auki) | 0 viivaa | 0 viivaa |
| Ateena: lentolista auki | 3 viivaa, **1 kaari** | 3 viivaa, **1 kaari** |
| Ateena: ei listaa | 0 viivaa, 0 kaarta | 0 viivaa, 0 kaarta |

### Sivunlataus kesken matkaa

Tila ei säily sivunlatauksessa: `matkaSessio` on null, kun peli latautuu
uudelleen nappulan ollessa reitin päällä. Mitattu erikseen (vartio 4b,
`sessio: null`): **1 viiva, 3 helmeä** — sama kuin sessiolla. Kesken matkaa
oleva reitti ei kulje session kautta lainkaan vaan `pos.type === 'edge'`
-poikkeuksen kautta, joka on tallessa ja mitattu. Nappula ei siis koskaan
kulje tyhjän päällä.

### Bussi ja lento

Bussi, laiva ja lento valitaan Liiku-napista, joten sessio on jo päällä kun
kohdelista aukeaa. Aiemmin se kerros jäi ruudulle vain siksi, ettei sitä
piirretty uudelleen (`naytetaan` oli epätosi vaiheessa `action` liu'un
sulkeuduttua); nyt sama kuva piirtyy oikeasti. Lentokaaren ehtoon ei
koskettu: se on yhä `travelExpanded && travelSuodatin === 'air'` tai valitun
lennon `lentoKaari`. Mitattu oikeasta ketjusta Ateenassa (Liiku › Lentäen):
ennen listaa 0 kaarta, lista auki 1 kaari.

## Portit

| Portti | Tulos |
| --- | --- |
| `npm test` | **# pass 3354, # fail 0** (# tests 3367, # skipped 13) |
| `node tools/tarkista-kaksoisavaimet.mjs` | `ei kaksoisavaimia` |
| `node tools/tarkista-niputus.mjs` | `niputus kunnossa: 387 moduulia, 4211 top-level-julistusta, ei törmäyksiä` |
| `node tools/tarkista-savukkeet.mjs` | `savukkeet kunnossa: 1622 ui-viittausta, 405 metodia, 534 kenttää` |
| `grep -rn '^<<<<<<<' js css tests tools` | ei osumia |

### Testi

`tests/pallolauta.test.mjs` — testi **ajaa säännön oikealla pelillä**
(`UI.prototype.matkareittienValinta` ja `matkaSessioKesken`) eikä etsi
lähteestä lauseita. Kattaa: ennen Liikua tyhjä (kaikki vaiheet), Liiku →
viuhka, heiton yli viuhka, kohdelistan yli viuhka, kesken reittiä sessiolla ja
ilman, perillä tyhjä, peruutus kahdessa vaiheparissa, itse valittu
matkustustapa EI ole peruutus, katselu ja botti, lentokaaret.

| Ajo | Tulos |
| --- | --- |
| Muutos päällä | 27/27 (`# pass 27, # fail 0`) |
| **VASTAKOE** (muutos palautettuna) | 26/27 — uusi testi punaisena |

### Savuke

`tools/savukkeet/savuke-reitit-piiloon.mjs` (rekisteröity
`tools/savukkeet/README.md`:hen).

    NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
      node tools/savukkeet/savuke-reitit-piiloon.mjs docs/raportit/kuvat jalkeen

| Ajo | Tulos |
| --- | --- |
| Muutos päällä | **15/15 läpi** |
| **VASTAKOE** (sääntö ja sessiokirjaus palautettu) | **9/15 läpi** |

Vastakokeessa punaisina 1, 2, 3, 5, 6a ja 6b. Näistä **visuaalisesti**
väärässä ovat 1 (viuhka näkyy lepotilassa ennen Liikua: 4 viivaa, 10 helmeä)
sekä 6a ja 6b (viuhka jää päälle peruutuksen jälkeen: 4 viivaa). Vartiot 2, 3
ja 5 kaatuvat sessiokentän puuttumiseen — vanha sääntö näyttää niissä samat
viivat, mutta ei tiedä matkasta mitään, joten se ei osaa myöskään lopettaa
sitä.

### Kuvat (kaapattu 2560 × 1352, talletettu 768 × 406, n. 435 kt/kuva)

Kartan pergamenttipinta on kohinaa: täysikokoinen png on yli 2 Mt, joten
kaappaus pienennetään selaimen omalla kankaalla samalla kaavalla kuin
`savuke-liiku`. Mittaukset luetaan pallon kerroksista eikä kuvasta.

| Tilanne | ENNEN | JÄLKEEN |
| --- | --- | --- |
| Ennen Liikua | `docs/raportit/kuvat/reitit-ennen-liikua-ennen.png` | `…-ennen-liikua-jalkeen.png` |
| Liiku painettu | `…-liiku-painettu-ennen.png` | `…-liiku-painettu-jalkeen.png` |
| Nopanheiton jälkeen | `…-heiton-jalkeen-ennen.png` | `…-heiton-jalkeen-jalkeen.png` |
| Kesken matkaa | `…-kesken-matkaa-ennen.png` | `…-kesken-matkaa-jalkeen.png` |
| Perillä uudessa kaupungissa | `…-perilla-ennen.png` | `…-perilla-jalkeen.png` |
| Peruutus | `…-peruutus-ennen.png` | `…-peruutus-jalkeen.png` |

Ratkaisevat parit ovat **ennen-liikua** (ENNEN neljä katkoviivaa, JÄLKEEN
puhdas kartta) ja **peruutus** (sama ero). **heiton-jalkeen** on sama
molemmissa — ja juuri se on omistajan päätöksen ydin: viuhka EI saa kadota
siinä.

## Automaattinen nopanheitto (edellisen kierroksen mittaus, yhä voimassa)

`game.jatkaMatkaaItsestaan` (js/game.js:1658) ja lipun asetus `beginTurn`issa
(js/game.js:1643) vaativat molemmat `pos.type === 'edge'`, joten automaattinen
heitto on reitin varren jatkoheitto eikä tapahdu koskaan kaupungissa. Kesken
reittiä viuhkaa ei ole vaan se yksi reitti, joka näkyy sessiosta riippumatta.
Kaupungissa `beginTurn` tekee vain matkustustavan esivalinnan, ja juuri se
esivalinta teki vaiheesta 'roll' lepotilan — se on nyt erotettu matkasta
`autoTravel`-lipulla (ks. yllä kohta 3).

**Mitä päätettiin ja miten se toteutettiin.** Edellisessä raportissa kysyin,
palautetaanko viuhka vaiheessa `move` (kohdetta valitessa). Omistaja vastasi
laajemmin: viuhka ei ole vaihe- eikä liukusidonnainen vaan **matkasessio** —
se syttyy Liiku-napista ja palaa kunnes matka päättyy perille tai peruutukseen.
Toteutus on yllä: yksi kenttä, yksi asetuskohta, yksi nollausehto, ja
näkyvyyssääntö yhä samassa `reittiTunnukset`-haarassa.

## Mitä EI tehty

- **Ei versionostoa** (`tools/uusi-versio.mjs` ajamatta), ei mergeä, ei pushia
  mainiin.
- **Lentokaarten sääntöä ei muutettu.** Ehto on sanasta sanaan ennallaan.
- Ei koskettu tiedostoihin `js/pallolauta/maapaneeli.js`, `css/styles.css`
  eikä maan rajan piirtokoodiin. Muutos ei vaatinut CSS:ää.
- Ei kirjoitettu Raamattuun — PAATOKSET 8 tuli Fablelta ja mergettiin tähän
  haaraan sellaisenaan.
- Ei korjattu lentokaaren haurautta (kerros jää ruudulle vain koska sitä ei
  piirretä uudelleen); Fable on kirjannut sen erikseen.
- Ei muutettu `game.js`:ää, vaikka `autoTravel` jää todeksi
  `actionCancelTravel`in jälkeen (ks. "Epäselvä kohta" yllä).
