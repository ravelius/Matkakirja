# Pariteettikuvat — webin näkymät kuviksi natiivin vertailuun

Työkalu: `tools/pariteettikuvat.mjs` (ajo) ja `tools/pariteettikuvat-nakymat.mjs`
(näkymälista). Tilaaja Fable 24.9.2026 Laitetestaajalle: noin 40 näkymää (nyt 44) kahdessa
koossa ilman introa ja UI-polkuja. Kuva vie noin 3–6 s eikä 30–40 s.

## Pikaohje Laitetestaajalle

```sh
cd /Users/Shared/Claude/Matkakirja-<rooli>     # mikä tahansa checkout, jossa on main
node tools/pariteettikuvat.mjs                 # kaikki näkymät, iPhone ja iPad, tuotantoa vastaan
node tools/pariteettikuvat.mjs --lista         # näkymien nimet ja oikotiet
node tools/pariteettikuvat.mjs --nakymat sahke,visa,laukku --koot 393x852
node tools/pariteettikuvat.mjs --url paikallinen   # tämän checkoutin koodi omalla palvelimella
```

Kuvat menevät kansioon `/Users/Shared/Claude/proto-3d/lokit/pariteetti-web-<pvm>/`
nimellä `<nakyma>-<leveys>x<korkeus>.png`. Samassa kansiossa on `yhteenveto.json`
(ok/virhe ja aika per kuva). Epäonnistuneesta käynnistyksestä tallentuu
`<nakyma>-<koko>-VIRHE.png`. Poistumiskoodi on 0 vain, kun kaikki kuvat onnistuivat.

## Valitsimet

| Lippu | Oletus | Selitys |
|---|---|---|
| `--url` | `https://matkakirja.app/` | Tuotanto, mikä tahansa osoite (esim. `http://localhost:8080/`) tai `paikallinen` (oma staattinen palvelin repon juuresta) |
| `--nakymat` | kaikki | Pilkkulista näkymien nimistä (`--lista`) |
| `--koot` | `393x852,834x1194` | Alle 600 px leveä koko on iPhone (`--dpr-iphone`, oletus 3, mobiili ja kosketus), muut ovat iPad 11" (dpr 2) |
| `--ulos` | `/Users/Shared/Claude/proto-3d/lokit/pariteetti-web-<pvm>` | Kuvakansio |
| `--kaupunki` | `marseille` | Tallenteen kaupunki (Ranskassa on kaikki nostolajit) |
| `--siemen` | `5` | Pelin siemen (sama kuin savukkeissa) |
| `--uusinta` | `1` | Montako kertaa epäonnistunut kuva yritetään uudestaan |
| `--gpu` | `metal` | `metal` = `--use-angle=metal` (Mac Studion GPU), `ohjelma` = SwiftShader |

Playwright haetaan järjestyksessä `playwright`, `$PLAYWRIGHT_JS`,
`/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js`, …;
selain on Playwrightin oma Chromium (tai `$CHROMIUM`).

## Resurssit

Yksi Chromium koko ajolle. Näkymät ajetaan peräkkäin (ei rinnakkain), ja
jokaisen kuvan sivu ja konteksti suljetaan heti. Selain suljetaan aina: myös
virheessä, Ctrl-C:ssä ja SIGTERMissä. Älä aja koko listaa samaan aikaan CI:n
savukesarjan kanssa (actions-runner jakaa saman Macin muistin ja GPU:n):
tarkista ensin `pgrep -fl actions-runner/_work` ja aja tarvittaessa vain
muutama näkymä `--nakymat`-lipulla.

## Miten intro ohitetaan (olemassa olevat oikotiet, ei uusia)

Jokainen kuva otetaan tuoreessa selainkontekstissa:

1. **Tallenne localStorageen** (`matkakirja-save-v1`, `addInitScript` ennen latausta):
   `new Game({ players: [{ start: <kaupunki> }], pack: maailmankartta, seed: <siemen> })`,
   `phase = 'action'`. Kaava on sama kuin savukkeissa
   (esim. `tools/savukkeet/savuke-suoraan-kartalle.mjs`), eli aloitusportti ja
   aloituslento jäävät pois.
2. **`?lauta=pallo&koe=suoraan`**: testitila "Suoraan kartalle"
   (`js/piirtokoe-asetus.js`, sama kuin localStorage `matkakirja-suoraan-kartalle=1`).
   Se poistaa "Peli päivittyi" -ikkunan, saapumistrailerin, isot luentakuvat ja
   luennan. Merkinnän teksti on kortissa heti.
3. **`reducedMotion: 'reduce'`** (Playwrightin konteksti → `prefers-reduced-motion`):
   `ui.typeText` kirjoittaa tekstin kerralla (`js/ui.js`). Tämä ohittaa myös visan,
   sähkeen ja kohtaamisen kirjoituskoneen. Ennen kuvaa odotetaan, että päättyvät
   CSS-animaatiot ja -siirtymät ovat valmiita (`document.getAnimations()`, katto 5 s).
4. **Kehittäjätila on POIS** (`matkakirja-kehittaja` puuttuu), joten kuvat vastaavat
   pelaajan näkymää.
5. **Valmiusehto**: pallon lepokerroksen näkyvät laatat ovat täysin scenessä
   (`ui.pallolauta.lepokerros().mittarit()`: `nakyviaTaysin >= nakyvia`, ei `jumissa`,
   kolme perättäistä lukua), fontit on ladattu, näkymän valitsin näkyy ja näkyvät
   `<img>`-kuvat ovat valmiita. Kiinteää odotusta ei ole; lopuksi odotetaan kaksi
   piirtokehystä.
6. **Noden välimuisti**: kaikki pelin ja ämpärin (media.matkakirja.app) pyynnöt
   haetaan kerran per ajo Noden kautta. Ilman sitä GitHub Pages vastasi
   24.9.2026 koeajossa 429 (liikaa pyyntöjä), eikä peli käynnistynyt.
   Välimuisti ratkaisee myös ämpärin CORSin paikallisesta originista.

Käytetyt konsolikomennot (`window.matkakirja = { game, ui, sfx }`, js/main.js):
`ui.openArrival(city)`, `ui.naytaTutkiSivu(n, { heti: true })`, `ui.avaaMaalehti(iso)`,
`ui.openPassport()`, `ui.asetaPaivakirjanKoko(bool)`, `ui.valitseLinssi(id)` ja
`ui.lataaLinssit()`, `ui.pallolauta.napautaNosto(id)` ja `ui.pallolauta.nostot.osumat()`,
`ui.liukuAuki = true; ui.render()`, `game.quiz.correct` (visan oikea vastaus),
`import('/js/fokusvirta.js').avaaFokusKohtaaminen(ui, city)`.
Kehittäjän pikatie `?lauta=pallo&dev=<kaupunki>` (js/kehittaja-pikatie.js) on myös
olemassa, mutta se kytkee kehittäjätilan päälle ja ohittaa saapumisen omalla tavallaan, joten tämä
työkalu käyttää tallennetta.

## Todennus: ok tarkoittaa, että näkymä näkyy

Jokaisella näkymällä on todennus (`nakyy` ja/tai `ehto` tiedostossa
`tools/pariteettikuvat-nakymat.mjs`, taulukko `TODENNUS`). Se tarkistetaan juuri
ennen kuvaa (odotus enintään 12 s) ja heti kuvan jälkeen:

- `nakyy`: jokaisen valitsimen elementin pitää oikeasti näkyä. Laatikosta vähintään
  24 × 24 px on ruudulla, se ei ole piilossa, kertynyt opacity on vähintään 0,9 (häivytys kesken ei kelpaa) ja
  `elementFromPoint` osuu siihen vähintään kahdessa viidestä näytepisteestä
  (ei jää muun alle).
- `ehto`: pelin tila, esimerkiksi siirtovaihe ja näkyvät siirtokohteet, lehden oikea
  sivu tai linssin moottori käynnissä.
- Palloa käyttävissä näkymissä myös laattojen pitää valmistua.

Jos todennus ei täyty, kuva tallentuu nimellä `<nakyma>-<koko>-VIRHE.png` ja
yhteenvedossa on `ok: false` sekä syy (esim. `todennus: .kaupunkipopup: ei DOMissa`).
Näkymää ilman todennusta ei voi lisätä, koska moduuli kaatuu latautuessaan.

## Näkymät

| Nimi | Mitä | Oikotie |
|---|---|---|
| aloitusportti | Aloitusportti, "Aloita seikkailu" | ei tallennetta, `?koe=suoraan` |
| kartta | Intro ohitettu, pallo kaupungissa | tallenne + `?lauta=pallo&koe=suoraan` |
| matkakirjakortti-auki / -kiinni | Merkintäkortti iso / pieni | `ui.asetaPaivakirjanKoko(false/true)` |
| kaupunkikortti | Naapurikaupungin kortti | `napautaNosto('nakyva-kaupunki-*')` |
| nostokortti / nostokortti-juttu | Karttanosto kuva edellä / juttu auki | `napautaNosto('pont-du-gard')` (+ `.nostokuva-lisaa`) |
| nostovisa | Maalehden noston lukijan kysymys | `napautaNosto('nosto-maalehti-roquefort')` + lisää |
| elaintaky, skandaali, syvennys | Nostolajien kortit | `napautaNosto('elaintaky-FRA' / 'skandaali-*' / 'syvennys-*')` |
| kohtaaminen | Kaupungin kohtaamisen alkukortti | `avaaFokusKohtaaminen(ui, city)` |
| visa | Kohtaamisen kysymys (ajastin käy) | kohtaaminen + `.quiz-aloita` |
| sahke | Sähke (Sofia) | kohtaaminen sähkekaupungissa (`savuke-sahkekortti.mjs`) |
| kaupunkilehti-kansi / -aihe1 / -aihe2 | Kaupunkilehti ja aihesivut | `ui.openArrival(city)`, `naytaTutkiSivu(n)` |
| kaupunkilehti-sisallys | Lehden sisällysvalikko | `.lehti-hampurilainen` |
| kaupunkilehti-luelisaa | "Lue lisää" (wiki) | `.wiki-btn` → `#wiki-dialog` |
| maalehti-kansi / -aihe1 | Maalehden etusivu (sivu 1, kantta ei ole) / ensimmäinen aihesivu (sivu 2) | `ui.avaaMaalehti(iso)`, `naytaTutkiSivu(2)` |
| maalehti-mediarivi | Maalehden etusivun mediarivi (radio) | `#arrival-media` vieritettynä näkyviin |
| laukku | Matkalaukku = passi | `ui.openPassport()` |
| laukku-linssit | Laukku, kaikki linssit omistettuina | `player.linssit` + `openPassport()` |
| linssi-<id> | Jokainen aktiivinen linssi (js/linssit/rekisteri.js) | `player.linssit.push(id)`, `ui.valitseLinssi(id)` |
| linssi-selite | Linssin selite (topografia) | `.linssi-selite` |
| linssi-ihmisen-matka-kaynnissa | Ihmisen matka Käynnistä-napin jälkeen: esitys ensimmäisessä jaksossa (Afrikka), yläpalkki näkyvissä, pallo liikkeellä (noin 13 s avausjakso odotetaan ehdolla) | `ui.valitseLinssi('ihmisen-matka')` + `.aikajana-avaus-nappi`, todennus `ui.aikajana.esitys.tila()` (kaynnissa, indeksi ≥ 1, palkki näkyy, aloituskortti poissa) |
| linssi-karuselli | Ihmisen matka: palkki ja korttikaruselli | `.aikajana-avaus-nappi` |
| liiku | Kulkutapaliuska | `ui.liukuAuki = true` |
| noppa / noppa-siirtolista | Liftauksen noppa / siirtovaiheen kohteet | Liiku → Liftaus |
| ratas | Hammasratas: äänentasot | `#kehittaja-valikko-btn` |
| valikko | Hampurilainen | `#menu-btn` |
| karttaselite | Kartan selite | `.karttaselite-nappi` |
| pollo | Pöllöpaneeli | `.pollo-nappi` |
| aarre | Aarteen paljastus pelin omalla polulla | kohtaaminen → Aloita peli → oikea vastaus (`game.quiz.correct`) |

**Kauppaa ei ole.** Pelissä ei ole kauppaa eikä linssien ostoa: linssit löytyvät
aarteina (`game.linssiAarteet`), ja "pulla" on vain sähkeen vihjeiden maksuväline.
Linssien hankinnan näkymäksi käy `laukku-linssit`.

## Uuden näkymän lisääminen

Lisää rivi `tools/pariteettikuvat-nakymat.mjs`:n `NAKYMAT`-listaan: `nimi`, `kuvaus`,
`avaa(p)` (ajetaan sivulla, `p = { kaupunki, ...parametri }`, palauta `{ virhe }`
jos ei onnistu), `odota` (valitsin) ja tarvittaessa `jalkeen`, `odotaJalkeen`,
`viimeinen` (vieritys kuvien latauduttua) tai `palloJalkeen` (linssit).
Funktiot sarjallistetaan `page.evaluate`en, joten ne eivät saa viitata moduulin
muuttujiin.

## Tunnetut rajat

- Visan ajastin käy, joten sekuntiluku vaihtelee kuvasta toiseen.
- Säärivi ja päivän säätila tulevat tuotannon datasta ja voivat vaihtua päivittäin.
- `sahke` siirtää pelaajan Sofiaan, koska Marseillen kohtaaminen on visa eikä sähke.
- Headless-Chromiumin rAF-tahti vaihtelee, mutta stillkuviin se ei vaikuta.
