> **ARKISTOITU 15.8.2026** — kertaluontoinen tilannekuva tai toteutettu suunnitelma. Ei sisällä voimassa olevia ohjeita; ne ovat Raamatussa (js/tyohuone-raamattu.js) ja sen dokumenttikartan tiedostoissa.

# Sonnet 1:n tilannekuva — luovutuskuntoinen (kirjoitettu 10.8.2026 ilta)

*Käsittelykuva tilinvaihtoa varten. Kirjoitettu niin, että toisen
tilin UUSI QA-sessio voi jatkaa suoraan TÄSTÄ tiedostosta ilman pääsyä
edeltävään keskusteluun. Lue tämä ENSIN, sitten `CLAUDE.md` ja
`docs/roolitus.md`.*

## Kuka olen

- **Sonnet 1 — tarkastaja: QA ja työhuone.** Malli `claude-sonnet-5`.
  Oma sessio-id: `session_01MAirFte9MpE1HnVRpCj2Mb` (ks. roolitus.md
  taulukko — tarkista sieltä ajantasainen sessio-id, jos tämä on
  vanhentunut).
- Raportoin VAIN Fablelle (`persistent_session_id`
  `session_01R1jVv12E56gbU5qtH5xGaG`), en suoraan omistajalle. Fable
  raportoi omistajalle.
- **ENSISIJAINEN raportointireitti: `create_trigger` +
  `persistent_session_id`, `run_once_at` ~2-5 min päähän** (`date -u
  +%Y-%m-%dT%H:%M:%SZ` juuri ennen kutsua, muuten "run_once_at must be
  in the future" -virhe).
- **VARAREITTI (roolitus.md:n sääntö, käytä jos create_trigger jää
  lupakyselyyn odottamaan yli minuutin):** keskeytä kutsu, kirjoita
  raportti tiedostoon `docs/viesti-fable.md` (jaettu tiedosto — LISÄÄ
  oma otsikoitu lohko alkuun tai loppuun, älä ylikirjoita muiden
  sessioiden lohkoja), commitoi ja pushaa omalle haaralle
  (`claude/matkakirja-game-dev-la16ae`). Fable lukee sen sieltä. Tämä
  reitti on jo käytössä ja toiminut (ks. tiedoston nykyinen sisältö
  esimerkkinä muotoilusta: `# <Lähettäjä> → Fable: <aihe> (<pvm>)`).
- Vain lukevia tehtäviä tai täsmälleen ohjeistettuja mekaanisia
  muutoksia. **Ei versionostoja eikä mergejä ilman Fablen
  tehtävänantoa.** En korjaa löydöksiä itse — raportoin ja odotan.
- Kontti kierrätetään silloin tällöin (omistajan/Fablen aloitteesta,
  usein lupakyselyjumin purkamiseksi). Muisti EI säily kierrätyksen
  yli — siksi tämä tiedosto. Repo kloonataan tuoreena mainista.
  Ensimmäinen asia uuden kontin jälkeen: `git status`, `git log -1
  --oneline`, tarkista olenko oikealla haaralla.

## Työkalut ja niiden nykyinen tila

- `ToolSearch`, `Bash`, `Read`, `Grep`, `Glob`, `WebSearch` toimivat
  luotettavasti.
- `mcp__Claude_Code_Remote__create_trigger` on TOIMINUT lähes koko
  ajan (yksi lupakyselyjumi kierrätettiin pois 10.8. yöllä) — kokeile
  sitä ensin, mutta älä jää jumiin: ks. varareitti yllä.
- Playwright/Chromium: `/opt/pw-browsers/chromium`,
  `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` on jo asetettu — älä aja
  `playwright install`. **Chromium EI pääse tässä hiekkalaatikossa
  ulos konttiympäristöstä ulkoisiin HTTPS-osoitteisiin** (R2-peili,
  Commons), vaikka `curl`/Node `fetch` pääsevät (`HTTPS_PROXY`
  toimii niille automaattisesti). Tästä johtuen R2-kuvat näyttävät
  selainkuvakaappauksissa aina tyhjiltä (`naturalWidth === 0`,
  `currentSrc === ''`), vaikka kuva olisi täysin kunnossa. **ÄLÄ
  raportoi tätä kuvavikana** ennen kuin olet `curl`illa varmistanut,
  ettei kuva OIKEASTI ole olemassa (ks. resepti alla). Tämä on
  ympäristörajoitus, ei sisältövika, ja se on toistuvasti varmistettu
  useassa QA-kierroksessa.

## QA-resepti (toistettavat tekniikat)

### 1. Perussykli joka kierroksella

1. `git fetch origin main && git merge --ff-only origin/main` (EI
   koskaan ilman tätä ennen tarkistuksen aloitusta — main elää
   nopeasti rinnakkaisten sessioiden takia).
2. `node --test tests/*.test.mjs` — pitää olla vihreä ennen kuin teen
   mitään muuta. Jos joku muu testi on punaisena kuin oma alueeni,
   raportoin sen enkä korjaa.
3. Paikallinen palvelin selaintestejä varten (ES-moduulit vaativat
   http:n, ei file://):
   ```
   python3 -m http.server 8123 &
   ```
4. Playwright-skripti `/opt/pw-browsers/chromium`,
   `args: ['--no-sandbox']` (ei `--proxy-server`-flagia — se ei auta,
   ks. yllä).

### 2. Pelin sisäinen konsolikäsittely (nopein tapa testata sääntöjä)

Peli asettaa `window.matkakirja = { game, ui, sfx }` kun sivu on
ladattu — EI pelkkää `window.game`. Katselutila
`?lauta=<packId>` (esim. `?lauta=europe`) avaa laudan suoraan ilman
porttia ja ilman tallennuksen ylikirjoitusta — paras tapa testata
yksittäisiä kaupunkeja/kysymyksiä nopeasti:

```js
await page.goto(`${BASE}/index.html?lauta=europe`, { waitUntil: 'load' });
await page.waitForFunction(() => window.matkakirja?.game);
const { game, ui } = window.matkakirja;
// Aseta pelaaja suoraan kaupunkiin ja avaa pysähdys:
game.player.pos = { type: 'city', city: 'dublin' };
game.phase = 'offer';
const res = game.actionQuiz();   // avaa kaaren kohtaamisen/pulman/tavallisen visan säännön mukaan
game.answerQuiz(game.quiz.correct);  // vastaa oikein
game.closeQuiz();                // sulkee ja päättää/jatkaa vuoron säännön mukaan
ui.render();                     // päivittää DOM:n (tarvitaan ennen kuvakaappausta)
```

Aidon pelin (ei katselutila, jotta tallennus toimii) saa myös suoraan
moduulituonnilla ilman valikon läpikäyntiä:
```js
const mod = await import('/js/game.js');
const { EUROPE } = await import('/js/packs/europe.js');
const g = new mod.Game({ players: [{ name: 'Testi', quizLevel: 'normal' }], pack: EUROPE });
```

Laatan pakottaminen kaupunkiin (jotta paljastus/pulma-laatta-polku
laukeaa varmasti satunnaisuudesta riippumatta):
`game.tokens.set('ateena', 'ruby');`

Maalehti (i-nappi) avataan `ui.avaaMaalehti('ISO3')` (esim. `'IRQ'`) —
palauttaa `ui.tutkiSivut`-taulukon, jonka pituudesta näkee sivumäärän.
**HUOM sivuindeksi ei ole sama kuin `tutkiSivut`-taulukon indeksi**,
jos kaupungilla on `id: 'kaupunki'` -kategoria (lehtikaupunki): silloin
näytöllä on YKSI YLIMÄÄRÄINEN etusivu ennen taulukon ensimmäistä
alkiota (johdanto+kansikuvat omana sivunaan, kaupungin nostot saavat
oman sivunsa heti perään). Käytännössä: jos `tutkiSivut.length === 3`,
näytöllä on 4 sivua, ja `ui.naytaTutkiSivu(i, {heti:true})` indeksillä
`i = tutkiSivut.length` (ei `length-1`) näyttää VIIMEISEN sivun
(yleensä menovinkit). Tarkista aina `document.querySelector` tai
sivunumeropallo (`"4 / 4"`), älä luota pelkkään taulukkoindeksiin.

### 3. Kuvien lataus (R2-rajoitteen kiertäminen)

```js
const imgs = await page.evaluate(() => [...document.querySelectorAll('img')]
  .filter((im) => im.src)
  .map((im) => ({ src: im.src, naturalWidth: im.naturalWidth })));
const broken = imgs.filter((i) => i.naturalWidth === 0);
```
Kerää kaikki `broken`-listan uniikit `src`-arvot ja `curl`-tarkista ne
erikseen (Bash, EI Playwright):
```bash
curl -s -o /dev/null -w "%{http_code}\n" "<url>"
```
Vain jos `curl` EI palauta 200, kyseessä on oikea löydös. Muuten
kirjaa "epävarma verkkohavainto, curlilla poissuljettu" ja jatka.

### 4. Minitehtävän sisältötarkistus ("vastaus samalla sivulla")

Omistajan/Fablen erityinen huolenaihe: minitehtävän (`kategoria.tehtava`)
kysymyksen vastauksen pitää löytyä SAMAN aihesivun omasta tekstistä
(`nostot[].teksti`), ei toiselta sivulta. Tämä ei ole
selainrenderöinnin vaan SISÄLLÖN tarkistus — helpointa tehdä lukemalla
data suoraan Node-skriptillä (ei selainta):
```js
const { KULTTUURI_KATEGORIAT } = await import('/home/user/Matkakirja/js/packs/kulttuuri-kategoriat.js');
// kategoria.tehtava.oikeaTeksti pitää löytyä (tai olla suoraan pääteltävissä)
// SAMAN kategoria.nostot[].teksti -kentän sisällöstä.
```
Kävin tällä tekniikalla läpi 8 minitehtävää 9.-10.8. — kaikki
täsmäsivät (ks. alla "Tehdyt kierrokset").

### 5. Pelisääntöjen todentaminen koodista ennen selaintestiä

Kannattaa aina ensin lukea itse säännön toteutus `js/game.js`:stä
(usein `actionQuiz`, `answerQuiz`, `closeQuiz`, `pendingPuzzle`,
`kaariTarina`) ennen selaintestin kirjoittamista — säästää aikaa, kun
tietää etukäteen mitä kenttää/tilaa pitää lukea todentaakseen tuloksen.

## Tehdyt QA-kierrokset (kaikki mainissa, kaikki puhtaita — ei avoimia
löydöksiä ellei toisin mainita)

1. **Alkuperäinen aineisto-QA** (v~331): äänet, kuvat, peilikattavuus,
   muutosloki. Arkistoitu `docs/arkisto/qa-raportti-2026-08-08.md`.
2. **Työhuoneen Kehitys-välilehti** (PR #475, v352) ja **työhuoneen
   uudistus 7→5 välilehteä** (PR #482, v356) — omaa koodaustyötä, ei
   QA:ta.
3. **Loppu-QA kierros 1** (linkit, lisenssit, duplikaatit, Mercator,
   nimiVasen, äänet) — laaja read-only-kierros, tulokset raportoitu
   Fablelle triggerillä.
4. **Kierros 2** (selainlinkkitarkistus, duplikaattien
   tarkka luokittelu uuden politiikan mukaan, PR #630 regressio) —
   raportoitu.
5. **26 kahdesti esiintyvän kuvan a/b/c-luokittelu** —
   löydökset päätyivät `docs/kuvaduplikaatit.md`:hen (Fable/Opus 1
   jatkoivat siitä). **17/17 alkuperäisestä listasta korjattu, 6 UUTTA
   syntynyt myöhemmin nähtävyysjuttueristä — ks. alla "Avoimet
   löydökset".**
6. **PR #644 regressiotarkistus** (siirtoerä) — puhdas.
7. **30 Euroopan kaarikohteen faktatarkistus** (lissabon…islanti,
   `js/tyohuone-kehitys-data.js`) — **YKSI anakronismi löytyi ja
   korjattiin**: Sarajevon Sebilj-kaivo rakennettiin vasta 1891, ei
   ollut olemassa isoisän 1873-käynnillä. Fable korjasi heti (v463,
   #675) muuttamalla tarinan koskemaan PALANEEN kaivon muistoa
   1873:ssa, nykyhetken kohtaaminen/aarre koskee 1891 kaivoa. **Kaikki
   muut 29 kohdetta+29×3 faktaväitettä tarkistettu, puhtaita.**
8. **Tarinakaaren peli-integraatio (v460)**: saapumiskortti+
   kohtaaminen+paljastus 5 kaupungille, laudan rajaus (Suomi/Istanbul
   EI kaarta, Eurooppa/maailmankartta KYLLÄ), tallennus/lataus kesken
   kaarivisan (oikea sivun reload, ei vain JSON-kierrätys) — kaikki
   puhtaita.
9. **Dubai/Lähi-itä-kytkentä (v471)**: Dubain 3-sivuinen kaupunkilehti
   + jaettu menovinkkisivu, kohdekartan 6 pistettä, kolme lehdetöntä
   ME-maata (Irak/Iran/Jemen, `avaaMaalehti()` ei kaadu, 2 sivua
   kummallakin) — puhtaita.
10. **8 uutta lehteä + v478-sääntö + v479 Engel (v482)**: Kreeta/
    Sisilia/Alpit (aluelehdet) + Dubrovnik/Riika/Vilna/Oslo/
    Kööpenhamina (kaupunkilehdet) — kaikilla 4 sivua (etusivu+
    kaupunki-nostot+aihesivu+menovinkit), 8 minitehtävää sisältö-
    tarkistettu (kaikki vastaukset löytyvät samalta sivulta), 72
    uniikkia R2-kuvaa curl-varmistettu (kaikki 200). v478-sääntö
    (pulmakaupungin AINOA tehtävä on pulma laatallisessa kaupungissa,
    ei toista tehtävää perään) todennettu suoraan `game.js`-tasolla
    Ateenan pylväspulmalla, molemmat haarat (laatallinen/laatatön).
    Engel-henkilöjuttu (Helsinki, Tuomiokirkko) avautuu nimestä,
    muotokuva `CFEngel-2.jpg` curl-varmistettu (200, 155 kt).

**HUOM: kohta 10 testasi v478-sääntöä, EI v506:ta** (ks. seuraava
tehtävä alla — v506 on uudempi ja muutti sääntöä lisää, ei ole vielä
testattu).

## SEURAAVA TEHTÄVÄ — odottaa Fablen ilmoitusta erä 13:sta

**ÄLÄ ALOITA ENNEN KUIN FABLE ILMOITTAA (triggerillä tai
`docs/viesti-fable.md`:n kautta), että erä 13 on mainissa.** Tarkista
myös suoraan: `git log --oneline -5 origin/main` ja
`git log --grep="erä 13"` — jos joku muu sessio on jo maininnut sen
maininneen mainiin, voit tulkita sen ilmoitukseksi, mutta varmista
ensin ettei kukaan muu ole jo aloittanut samaa QA-kierrosta (tarkista
`docs/viesti-fable.md` ja `docs/fable-tilanne.md` tuoreimmat
merkinnät).

Tehtävä on **kokoava koko Euroopan QA** ennen omistajan omaa testiä.
Kattaa NELJÄ osa-aluetta — tee kaikki, laajasti, koko Euroopan
laudalta (ei vain otantaa muutamasta kaupungista, paitsi jos aikaa ei
riitä — silloin kerro raportissa mitä jäi otannan ulkopuolelle):

### A) Peli — v506-sääntö "kohtaaminen ensin joka kaupungissa"

Tätä EI ole vielä testattu tässä sessiossa (edellinen kierros testasi
vanhempaa v478-sääntöä). Lue ensin itse muutos:
`git show 090f734 -- js/game.js js/ui.js` (commit "Kohtaaminen ensin
joka kaupungissa, lehti aina luettavissa (v506) (#738)"). Ydinkohdat
commit-viestin mukaan:
- Tarinakaaren kohtaaminen on kaupungin ENSIMMÄINEN tehtävä JOKA
  kaupungissa — myös laatattomissa ja pulmakaupungeissa (ei enää vaadi
  `tokenHere()`-laattaa laukeamiseen).
- Laatatön kohtaaminen palkitsee kuten tutkiminen; pulma tulee VASTA
  kohtaamisen JÄLKEISELLÄ pysähdyksellä (ei samalla kertaa).
- Botti ei kuluta yhteistä kaarta (tarkista tämä nimenomaan — botin
  vuoro ei saa "käyttää loppuun" kaupungin kaarikohtaamista ihmis-
  pelaajalta).
- Saapumiskortin nappi nimeää henkilön ("Tapaa Nikos" tms.) — tarkista
  että kutsumanimi näkyy oikein useammalla kaupungilla, ei vain
  oletusarvoa.
- **Tutki-nappi on AINA tarjolla kaupungissa, tehtävänappi piiloutuu
  kun tehtävät on tehty — lehden pitää silti pysyä luettavissa.**
  Omistajan alkuperäinen Ateena-bugiraportti oli juuri tämä: kahden
  väärän vastauksen jälkeen lehtisivulle ei päässyt ollenkaan.
  **Testaa nimenomaan tätä polkua**: vastaa kaarikysymykseen VÄÄRIN,
  varmista että Tutki-nappi/lehti on silti auki ja luettavissa.
- 5 uutta testiä lisätty `tests/rules.test.mjs`:ään — nämä ajaa
  `node --test` automaattisesti, mutta suosittelen silti käytännön
  selaintestiä 3-5 kaupungilla (kaari-kaupunki + tavallinen kaupunki +
  pulmakaupunki), koska omistajan alkuperäinen bugi löytyi nimenomaan
  käytännön pelaamisesta, ei testiajosta.

### B) Kaupunkilehdet ja aihesivut — kaikki Euroopan kaupungit

Sama menetelmä kuin kohdassa 10 yllä (sivumäärä, minitehtävän
sisältötarkistus samalta sivulta, kuvat curlilla) mutta laajenna KOKO
Euroopan laudan kaupunkeihin, ei vain niihin 8:aan jotka jo tarkistin.
Tarkista erityisesti kaikki batch 12 (Tromssa/Dubrovnik/Riika, v504)
ja batch 13 (todennäköisesti Vilna/Oslo/Kööpenhamina tai mikä ikinä
Fable ilmoittaa) — huomaa että Dubrovnik/Riika/Vilna/Oslo/Kööpenhamina
NEWSPAPER-taso (kulttuuri-kategoriat.js) on jo tarkistettu (kohta 10),
mutta **NÄHTÄVYYSJUTUT (`nahtavyysjutut.js`, Sonnet 2:n tuottamat
kohdekartan pisteiden jutut) EIVÄT OLE vielä QA-tarkastettu näille
kaupungeille** — tämä on juuri se, mitä erä 12/13 tuotti. Avaa jokainen
uusi nähtävyysjuttu (`ui.avaaNahtavyys(kohde, numero)` tai klikkaamalla
kohdekartan pistettä) ja tarkista: teksti järkevä, kuvat lataa (curl),
lähdemerkinnät mukana, ei JS-virheitä, henkilölinkit (jos joku maininta
täsmää `HENKILOT`/`HENKILOLINKIT`-tauluun, ks. Engel-malli) toimivat.

### C) Luennat (äänitiedostot)

Fable dokumentoi tämän reseptin (ei itse vielä koeajettu tässä
sessiossa) — `?lauta=europe`-katselutila MYKISTÄÄ äänet oletuksena.
Ohita: `(await import('/js/sound.js')).sfx.enabled = true;` ennen
testiä. Todenna luennan käynnistyminen instrumentoimalla `Audio`-
konstruktori sivulla (`page.addInitScript` tms.) ja tarkkaile, että
oikea `assets/audio/puhe-...-<id>.mp3`-polku pyydetään oikeaan aikaan
(saapuminen/kohtaaminen/aarre). Kaikkien näiden tiedostojen
OLEMASSAOLO kannattaa tarkistaa myös suoraan tiedostojärjestelmästä
(`find assets/audio -name "puhe-*-<id>.mp3"`) ennen selaintestiä —
nopeampi ensitarkistus. Visan sulkeminen vaatii `#quiz-continue`-napin
klikkauksen (näkyy vasta kun paljastusteksti on kirjoittunut loppuun;
klikkaus voi osua `doAction`-busy-ikkunaan, jolloin täytyy klikata
uudelleen). Tapahtumakortti (`event`-muoto) päättää vuoron
`#event-ok`-napilla — muista kuitata sekin, ettei testi jää jumiin.

### D) Kuusi avointa kuvaduplikaattia

Lue `docs/kuvaduplikaatit.md` kokonaan ensin (siinä on jo 17/17
aiemman erän tausta ja perusteet). Rivi 70: "Vielä auki: Latin Bridge
Sarajevo (kulttuuri-kategoriat ↔ nähtävyysjutut)". Fable/Opus 1
mainitsivat 10.8. illalla YHTEENSÄ KUUSI uutta duplikaattia (mm.
Baščaršija.jpg ja Latin Bridge kahdessa paikassa), syntyneet
nähtävyysjuttueristä (12-13). **Näitä KAIKKIA kuutta ei ole vielä
listattu tiedostoon eksplisiittisesti — sinun pitää ajaa duplikaatti-
haku itse tuoreena** (sama tekniikka kuin aiemmin, ks. alla) ja
verrata Fablen/Opus 1:n mainitsemiin, jotta löydät kaikki kuusi eikä
vain Latin Bridgen. Duplikaattihaku (Node, ei selain, nopea):
```js
// Lue kaikki js/packs/*.js, poimi 'tiedosto: ...' -kentät regexillä
// (sama kuin tools/peilaa-media.mjs:n regex), laske esiintymät per
// tiedostonimi, suodata >1.
```
Luokittele KUKIN kuudesta samaan tapaan kuin aiempi 26 kuvan erä: (a)
perusteltu — eri yhteys, EI korjata; (b) tuskin tarkoitettu — sama
aihe ja asiayhteys, kannattaa vaihtaa; (c) rajatapaus + perustelu.
Raportoi vain (b)+(c) tiedosto+rivi-tarkkuudella, kuten aiemmin —
ÄLÄ korjaa itse, se on Opus 1:n työtä Fablen ohjauksessa.

### Raportin muoto

Sama kuin aiemmin: yksi kattava raportti Fablelle (`create_trigger` tai
varareitti), jaettu selkeisiin osiin A/B/C/D, "puhdas" merkittynä
eksplisiittisesti niiltä osin jotka ovat kunnossa, löydökset
priorisoituna file+line-tarkkuudella. Käytä kalibrointimerkintää
verkkolöydöksille ("varma sisältövika" vs. "epävarma verkkohavainto —
curlilla poissuljettu/vahvistettu").

## Julkaisumekaniikka (kertaus — EI tarvita omaan QA-työhön, koska en
korjaa itse, mutta hyvä tuntea kontekstina)

`git fetch origin main` JUURI ennen versionumeron valintaa. Kaava:
`sw.js` CACHE + `js/main.js` APP_VERSION samaan versioon; rivi
`js/muutokset.js`:ään (≤60 merkkiä, ei loppupistettä, uusin ylin);
`node --test tests/*.test.mjs`; `node tools/tarkista-kaksoisavaimet.mjs`;
`node tools/build-standalone.mjs`. Squash-merge "(vNNN) (#PR)". Mergen
jälkeen oma haara nollataan mainiin (`git checkout -B <haara>
origin/main` + `push --force-with-lease`). Pelkkä docs-muutos (kuten
tämä tiedosto) EI nosta versiota.

## Nykytila kirjoitushetkellä

- HEAD: `1e554b8` ("Tilannetaulu ajan tasalle: v503–v506, erätilat,
  duplikaattijono (#740)"), APP_VERSION `2026-08-09.506`.
- `node --test tests/*.test.mjs`: 576/577 pass, 1 skip, 0 fail.
- Työpuu puhdas, haara `claude/matkakirja-game-dev-la16ae` pushattu.
- Sonnet 2 työstää erää 13 (workflow käynnissä Fablen viimeisimmän
  vahtikierroksen mukaan). Opus 1 työstää ME-erää C (Egypti+Kuwait).
