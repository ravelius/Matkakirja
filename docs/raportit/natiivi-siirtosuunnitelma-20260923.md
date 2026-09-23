# Natiivin siirtosuunnitelma: koko web-peli inventoituna

*Siirtoseppä 23.9.2026. Tilaaja Fable omistajan linjauksen mukaan: koko
peli kaikkine linsseineen tehdään natiiviin pysähtymättä, web jätetään
kesken ja nopeutukset ovat vapaat.*

## Päivitys 23.9.2026 ilta: Fablen ja omistajan päätökset (sitova)

Nämä kumoavat alla olevat ristiriitaiset rivit (Fablen tarkastus
docs/raportit/natiivi-ajantasaisuus-20260923.md, kohdat A1–A4, A8, A10):
- **Täysi toimintopariteetti.** Kaikki, mitä pelaaja webissä näkee ja voi
  tehdä, tehdään natiiviin. "Harkittava"-karsintoja ei ole. Vain
  kehittäjätyökalut (työhuone, piirtokoe, koeliput, turvatila) jäävät pois.
- **Pois natiivista:** kaksintaistelu ja rosvo (ryöstäjälaatta,
  DUEL_PRIZE), botit (js/ai.js, BOT_SKILL) ja tapahtumakorttien mekaniikka.
  Tapahtumakortit jäävät kaanoniin sisältönä (kokoelma `tapahtumat` on
  paketissa). Paketista poistettiin kaksintaistelut, DUEL_PRIZE, BOT_SKILL,
  ai.js, robber ja vanhat mannerlaudat (skeema 1.14).
- **Lehdet natiivisti** UI Toolkitilla paketin datasta (skeema 1.15:
  typitetyt aiheet ja nostot, kulttuurivisat, sää, maan intro, radio,
  lipputarina ja Maa numeroina). **Ei WKWebView-lehtikuorta.** Rivit
  "Lehtikuori ?lehti=" ja web/lehti.json ovat vanhentuneita.
- **Radio mukaan natiiviin:** kartuschan radiomerkki (valo, viritysääni)
  ja maailmanradio-linssi. Asemien lisenssit tarkistetaan maksulliseen
  appiin (Siirtoseppä, B6). Tämä kumoaa rivin "radiot vain webissä".
- **Pöllö aarteena** on tauolla (24.8.). **Vanha tasokartta** ei ole
  käytössä (VANHA_KARTTA_KAYTOSSA=false), joten sitä ei tehdä linssiksi.
- Tuntitaulukko on laskettu ennen näitä päätöksiä. Kaksintaistelu, botit
  ja lehtikuori pienentävät sitä; natiivilehti ja radio kasvattavat.

## Miten tämä tehtiin

Kuusi Sonnet-agenttia inventoi kukin oman alueensa web-pelistä (haara
siirtoseppa-logiikka, sisältöpaketti skeema 1.5) yhteisellä ohjeella ja
samalla taulukkomuodolla. Siirtoseppä kokosi tulokset, tarkisti niiden
väitteet paketista ja laski yhteenvedon. Alueet ovat pelilogiikka, lauta
ja pallo, linssit, lehdet ja käyttöliittymä, pulu ja tarina sekä äänet
ja alusta. Mukana on 132 toimintoriviä.

**Tuntiarviot ovat agenttien karkeita arvioita** agenttiavusteiselle
Unity-kehittäjälle. Ne on tarkoitettu järjestämiseen ja mittasuhteisiin,
ei aikatauluksi. Kaksi tunnettua vinoumaa:
- **Lauta ja pallo (1575 h)** on arvioitu täydeksi omaksi renderöinniksi.
  Jos natiivi käyttää Cesium for Unityä (raporttien suunta 23.9.), pallo,
  laattojen lataus ja kamera ovat valmiita komponentteja, ja vaiheen 1
  laudan osuus pienenee arviolta puoleen.
- **Natiivi-UI (1661 h)** sisältää pulun (7500 riviä), fokusvirran
  (7200) ja fokuskohteet (6800). Niiden tuntimäärä riippuu siitä, kuinka
  uskollisesti web-taitto toistetaan. Lehdet tehdään natiivisti paketin
  datasta (päivitys 23.9. ilta); WKWebView-lehtikuori (#2942) poistuu.

## Yhteenveto omistajittain (h)

| Omistaja | Vaihe 1 ydin | Vaihe 2 sisältö | Vaihe 3 linssit ja lisät | Yhteensä |
|---|---|---|---|---|
| Natiiviseppä | 785 | 590 | 200 | 1575 |
| Pelikoodari | 412 | 124 | 74 | 610 |
| Natiivi-UI | 716 | 910 | 35 | 1661 |
| Linssiseppä | 98 | 355 | 169 | 622 |
| Siirtoseppä | 8 | 8 | 0 | 16 |
| **Kaikki** | **2019** | **1987** | **486** | **4492** |

Rivi on laskettu sille omistajalle, joka on solussa ensimmäisenä (esim.
"Natiiviseppä/Pelikoodari" → Natiiviseppä). Kehittäjätyökalut ("ei
natiiviin": työhuone, piirtokoe, koeliput, turvatila) ovat taulukoissa,
mutta niitä ei ole laskettu mukaan. Kaikki-riviin sisältyy 8 h ilman omistajaa.

## Järjestys: pelattava ydin ensin

**Vaihe 1: pelin voi pelata alusta loppuun (noin 2019 h, rinnakkain neljällä roolilla).**
1. *Natiiviseppä:* pallo ja laatat (tai Cesium), kaupunkipisteet
   (`kaupungit`: lat/lon, tarkeys), reittiviivat (`reitit`: lauta, via),
   nappulan liike, kamera ja noppa. Paketti kattaa datan jo nyt.
2. *Pelikoodari:* säännöt (rules.js: siirrot ja etäisyydet), vuorot ja
   päivät, pysähdyksen muoto, visat (`kysymykset`), väittämät, valokuva-
   ja lippukysymykset, laatat ja aarteet (`laatat`), kaupat ja raha
   (`saannot`), voitto ja tallennus (ei kaksintaistelua, botteja eikä
  tapahtumakortteja, päivitys 23.9. ilta). Aloita tallennusmuodosta
   ja `class Game` -tilakoneen pilkkomisesta.
3. *Natiivi-UI:* HUD, saapumisdialogi ja traileri (`saapuminen`,
   `saapumispuheet`), fokusvirran minimiversio, matkalaukku, valikko ja
   luentojen toisto (Horatio-mp3:t `media.json`:ssa).
4. *Äänet (Pelikoodari):* tehosteet ja pohjaraidan valitsin.
5. *Siirtoseppä:* NC/ND-äänet pois oletuksesta ennen TestFlightia
   (App Store -riski), ks. puutelista alla.

**Vaihe 2: sisällön syvyys (noin 1987 h).** Kaupunki- ja maalehti natiivina
paketin datasta (skeema 1.15, ei lehtikuorta), nähtävyydet ja kohdekartat, kohtaamiset ja
tarinakaari, Livia ja pulu (tarvitsee AI-välityspalvelun), elävät
nostot, ambienssi ja kaupunkimusiikki, keksinnöt, ihmisen matka ja
satelliitti.

**Vaihe 3: linssit ja lisät (noin 486 h).** Topografia, vesistöt, vertailu,
maatiedot, radio (maailmanradio-linssi ja kartuschan radiomerkki; lisenssit
maksulliseen appiin), sähke, ehdotukset ja reaktiot. Vanha tasokartta ei
kuulu natiiviin.

## Siirtosepän korjauslista paketille (koottu ja tarkistettu)

Seuraavaksi lisätään pakettiin:
1. **Sääntövakiot, jotka puuttuvat `saannot`-kokoelmasta:**
   tokens.js PIENI_AARRE_ARVO ja ISO_AARRE_ARVO (BOT_SKILL ja
   kaksintaistelu poistettu 1.14:ssä) ja linssien omistus
   (omistus.js LINSSIKYNNYKSET, OPTIKON_HYVITYS, PERUSLINSSIT).
2. **Linssien data ja media:** reliefikuvan ja astronautin sumun
   tekstuurit, astronautin kameran äänet sekä ihmisen matkan
   äänimaisemat `media.json`:iin. Topografian tarkennuslaastari sekä
   ihmisen matkan maskit ja kertomusmanifesti pakettiin.
3. **Ääni:** sound.js SOUNDS ja AMBIENCES (synteesikaavat datana tai
   logiikka-luetteloon), REAL_SAMPLES, siirtymämusiikin raidat ja
   musiikkivalitsimen ketju.
4. **Livian puhe:** cue-data (`livia-pilotti-cuet.js`,
   `assets/aikaleimat/*.eleet.json`).
5. **Rajapintasopimukset liitteeksi** (ei dataa): pulun ja lukijaäänen
   worker, sähke, ehdotukset ja reaktiot sekä localStorage-avainten luettelo.
6. **Tarkistettu, ei puutu:** game.js:n hinnat ja XP ovat kokoelmassa
   `saannot`, ja reittien geometria on päätasolla (skeema 1.5).
   Tapahtumakortit: data on vain `AFRICA.events`. Fablen päätös 23.9.:
   data jää kaanonina pakettiin, mekaniikka ei tule natiiviin.

## Suurimmat riskit

- **Jättitiedostot:** ui.js (23 900 riviä), pollo.js (7500), fokusvirta.js
  (7200), fokuskohteet.js (6800), aikajana.js (6400) ja game.js (3600).
  Natiivissa ne pilkotaan järjestelmiksi, eikä niitä siirretä 1:1.
- **Kaksi lautaa** (pallo ja vanha SVG-kartta linssikarttana)
  kaksinkertaistavat laudan työn. Suositus: vain pallo natiiviin, ja
  linssit piirretään pallolle.
- **Verkkopalvelut:** pulu (Anthropic Haiku), lukijaääni (OpenAI TTS),
  sähke ja ehdotukset ovat Cloudflare-workereita. API-avain ei koskaan
  sovellukseen. Lukijalla on jo natiivisilta (`window.matkakirjaNatiivi.luenta`).
- **Livia** on noin 9000 riviä proseduraalista SVG- ja pikselianimaatiota,
  joten natiiviin tarvitaan uusi hahmoanimaatiojärjestelmä.
- **Lisenssit:** 23 NC/ND-äänitiedostoa soi oletuksena.

---

## 1. Pelilogiikan ydin

Ydin on `js/game.js` (3601 riviä, `class Game` — ~120 metodia: vuoro, kauppa, visat, kaksintaistelu, aarteet, tallennus), `js/rules.js` (364 riviä, puhdas laudan/siirtojen matematiikka), `js/tokens.js` (110 riviä, laattatyypit ja arvonta), `js/ai.js` (191 riviä, botti), `js/die.js` (362 riviä, DOM-nopan 3D-fysiikka+animaatio) ja `js/pack.js` (124 riviä, pakkarekisteri + lähdeapurit). Suurin riski: sisältöpaketti vie vain NIMETYT vakiot (`ASKERS`, `FORM_WEIGHTS`, `TOKEN_TYPES`, `TIETAJATASOT`, hinnat) — itse `class Game` -tilakone, kaikki `js/rules.js`:n reittialgoritmit, botin strategia ja pulmageneraattorien koodi EIVÄT ole paketissa lainkaan, vaan pelkkä data niiden ympäriltä.

| Toiminto | Mitä tekee | Riippuvuudet | Paketin kattavuus | Omistaja | Arvio h | Vaihe |
|---|---|---|---|---|---|---|
| Laudan rakennus ja siirrot | `buildBoard`, `findMoves`, `stepsFrom`, `hasAnyMove` (rules.js) — reitit, askellaskenta, silmäluvun mukaiset päätepisteet | js/rules.js, kokoelmat.kaupungit/reitit | Data (266 kaup., 485 reittiä) on paketissa; itse polkuhaku-algoritmi puuttuu kokonaan | Pelikoodari | 30 | 1 |
| Etäisyydet ja saavutettavuus | `cityDistances` (Dijkstra), `reachableCities`, `distanceOf` — botin ja rahavarauksen pohja | js/rules.js | Puuttuu (algoritmi) | Pelikoodari | 12 | 1 |
| Matkustustavat | maa/laiva/bussi/lento; `travelModes`, `busDestinations`, `busPath`, `airportDestinations`, `actionTravel`, `actionFly` | game.js, rules.js (SEA_FEE 100, FLIGHT_PRICE 300, BUS_FARE 50) | Hinnat viety (saannot); reittilogiikka ei | Pelikoodari | 20 | 1 |
| Nopan heitto (logiikka + 3D-DOM-animaatio) | `rollDie` (game.js) arpoo 1–6; `BoardDie` (die.js) fysiikkasimulaatio kimpoiluineen DOM:iin | js/die.js, js/game.js | Ei paketissa (ei data); visuaalinen osa kuuluu osin Natiiviseppä/Pelikoodari-rajapintaan | Pelikoodari (logiikka) / Natiiviseppä (3D-esitys) | 10 (arvo, ei fysiikkaa) / 20 (Unity-fysiikka) | 1 |
| Vuoro, päivä, kello | `beginTurn`, `endTurn`, `updateSchedule`, `elapsedHours`, `dayCount`, `timeOfDay`, TURN_HOURS=6 | game.js | TURN_HOURS on kokoelmassa saannot; päivälogiikka puuttuu | Pelikoodari | 12 | 1 |
| Isoisän ennätys | `noteRecord`, RECORD_DAYS=80, XP_RECORD=200 — bonus jos aarre löytyy ennätysajassa | game.js | RECORD_DAYS ja XP_RECORD ovat kokoelmassa saannot | Pelikoodari | 4 | 2 |
| Pysähdyksen muoto | `pickForm`, `formWeights`: visa 55 / väittämä 15 / valokuva 10 / lippu 8 / tapahtuma 12 (FORM_WEIGHTS) | game.js | FORM_WEIGHTS viety nimettynä exporttina | Pelikoodari | 6 | 1 |
| Tietovisa (monivalinta) | `actionQuiz`, `pickQuestion`, `answerQuiz`, `closeQuiz`, `timeoutQuiz`, `hardAvailable` — vaikea kysymys +HARD_BONUS 100 | game.js, kysymykset(1407) | Kysymysdata viety (kokoelmat.kysymykset); vastauslogiikka, vaikeustaso, ajastin (45s) eivät | Pelikoodari | 25 | 1 |
| Isoisän väittämä | `openClaim` — tosi/tarua kaksi nappia, sama quiz-olio eri `kind` | game.js, questions.claims | Data mukana (allQuestions suodattaa 'claims' erikseen) | Pelikoodari | 6 | 1 |
| Valokuva- ja lippukysymykset | `openPhotoQuestion`, `openFlagQuestion`, `photoTargets`, `flagTargets`, `setPhotoPool` — PHOTO_CHOICES/FLAG_CHOICES=4 | game.js, media.json | Kuva-URL:t paketissa; poiminta-/pool-logiikka ei | Pelikoodari | 10 | 1 |
| Tapahtumakortti (POIS natiivista, päivitys 23.9. ilta) | `openEvent`, `closeEvent` — vaikutus raha / kyyti / viive; ilmainen, ei laattaa käännä | game.js, pack.events | Tarkistettu: tapahtumadata on vain AFRICA.events (raakakerros); pelattavalla maailmankartalla ei tapahtumia | Pelikoodari | 8 | 1 |
| Kohtaaminen (tarinakaari) | `kaariTilanne`, `kaariTarina`, `kaariYritysLuku` — 2 yritystä (KAARI_YRITYKSET), ainoa ääneen luettu tehtävä, edeltää visaa/pulmaa joka kaupungissa | game.js, packs/tarinakaari.js (85 r.) | tarinakaari(42) kokoelmassa | Pelikoodari + Sisältökirjuri (tekstit) | 14 | 2 |
| Aarteen pysyvä lukitus | `aarreLukittu`, `lukitseAarre` — toinen väärä vastaus sulkee kätkön pysyvästi, tähti siirtyy toiselle laatalle ettei peli jumitu | game.js | Ei dataa, sääntölogiikka | Pelikoodari | 8 | 1 |
| Pöllön sähketehtävä | `avaaAarreSahkeella` — vaihtoehtoinen tapa avata laatta ilman visaa, pienenevä palkkio ohilyönneistä | game.js, fokusvirta.js (ulkopuolinen) | Ei paketissa (mekaniikka pilottivaiheessa, 1 kaupunki) | Pelikoodari | 6 | 2 |
| Pulmat (europe/africa) | 11 generaattoria (`GENERATORS`/`EUROPE_GENERATORS`) + piirto (`piirraAfrikanPulma` ym.); `pulmanGeneraattori` hakee rekisteristä tunnisteella | pulmageneraattorit.js, packs/*-puzzles.js (1058 r. yht.) | Pulmadata (11) viety kokoelmassa; generaattori- JA piirtofunktiot merkitty manifestissa "logiikka" — natiivi kirjoittaa ne itse tunnisteen mukaan | Pelikoodari (logiikka) + Natiiviseppä (piirto) | 30 | 2 |
| Laatat ja aarteet | `TOKEN_TYPES`, `AARRETYYPIT`, `onAarre`, `arvoAarteenArvo` (100–250/500–800 arvottu 10 punnan tarkkuudella), `createTokenPile` (Fisher–Yates) | tokens.js | TOKEN_TYPES-nimet/värit viety; arvonta- ja pinontalogiikka ei | Pelikoodari | 10 | 1 |
| Aarteen paljastus | `revealToken` — pääaarre (mannerkohtainen, STAR_PRIZE 2000/vaellus), ryöstäjä→kaksintaistelu, paikallisaarre→raha; pöllö-mekaniikka POLLO_ON_AARRE (pois päältä) | game.js, tokens.js | Ei dataa; sääntö monimutkainen (manner-siirto ettei jumitu) | Pelikoodari | 16 | 1 |
| Kaupat / raha-apu | `actionHint` (40), `actionFiftyFifty` (80), `actionKaveriapu` (25), `actionPullaVinkki`/`actionPullaOstos`/`pullaOstettu` (25), STRANDED_AID=100 | game.js | Hintavakiot (saannot); osto/tila-logiikka ei | Pelikoodari | 10 | 1 |
| Kaksintaistelu (rosvo) (POIS natiivista, päivitys 23.9. ilta) | `beginDuel`, `actionDuelRelief` (puolet rahasta, 4→2 vaihtoehtoa pois), `answerDuel`, `timeoutDuel`, `closeDuel`, DUEL_PRIZE=200 | game.js, kaksintaistelut(42) | Kysymysdata viety; sääntölogiikka ei | Pelikoodari | 12 | 1 |
| Kulttuuri/minitehtävät/eläintäky/juliste | `actionKulttuuri`, `actionMinitehtava`, `actionElaintaky`, `myonnaJuliste` — pienet sivutehtävät, kertakäyttöiset | game.js | Osittain: elaintayt(109), julisteet(114) datana; suorituslogiikka ei | Pelikoodari | 10 | 2 |
| XP ja tietäjätasot | `awardXp`, `tarkistaTietajataso` (game.js) + `tietajataso`, `tietajatasonNousut`, `tietajatasonOsuus`, `varssynSakeet` (tietajatasot.js, 229 r., 10 tasoa värsseineen) | game.js, tietajatasot.js | TIETAJATASOT-taulukko viety kokonaan (nimetty export); laskentafunktiot eivät | Pelikoodari + Sisältökirjuri (värssyt jo dataa) | 8 | 2 |
| Botit (POIS natiivista, päivitys 23.9. ilta) | `chooseTravel`, `chooseMove`, `wantsFiftyFifty`, `wantsHint`, `chooseQuizAnswer` (BOT_SKILL 0.55), `wantsDuelRelief`, `chooseDuelAnswer` | ai.js, rules.js | Ei paketissa lainkaan (js/ai.js ei ole packs/-kansiossa eikä lahteet.mjs:ssä) | Pelikoodari | 20 | 2 |
| Voitto ja vaellustila | `checkWin` (ensimmäinen tähti + kotikaupunki riittää), `roaming`-lippu jolloin peli ei pääty ja jokainen aarre = raha (STAR_PRIZE) | game.js | Ei dataa | Pelikoodari | 8 | 1 |
| Tallennus | `toJSON`/`fromJSON` (versio 1↔2 -migraatio), `localStorage` (SAVE_KEY, main.js: lataus/poisto/turvatila-leimat rajakohdissa) | game.js (toJSON ~60 kenttää), main.js | Ei osa siirtopakettia — natiivi suunnittelee oman tallennusmuodon | Pelikoodari | 20 | 1 |
| Laudan/pakkien rekisteri | `PACKS`, `packById`, `allQuestions`, lähdeapurit (`sourceList`, `sourceLabel`), kaksi ääntä (`VOICES`, `factVoice`) — nyt yksi pelattava lauta (maailmankartta), muut vain katselu/data-lähde | pack.js | Rakenteellinen tieto (packId, questions-jaottelu) heijastuu moduulit/kokoelmat-tasoon | Pelikoodari | 6 | 3 |

### Puutteet paketissa
- Tapahtumakortit: tarkistettu. Data on vain `AFRICA.events` (raakakerros `moduulit/js/packs/africa.json`); maailmankartalla `events` puuttuu, joten muoto "tapahtuma" ei laukea pelattavalla laudalla. Kaanonikysymys Fablelle: tuodaanko tapahtumat maailmankartalle ennen natiivia.
- Botin (`js/ai.js`) ja sääntöalgoritmien (`js/rules.js`) lähdekoodi eivät ole missään paketin osassa (ei tarkoituskaan, mutta natiivin pitää kirjoittaa nämä täysin uusiksi — ei viitedataa arvojen tarkistukseen paitsi BOT_SKILL=0.55, joka on koodissa vakiona eikä saannoissa vahvistettu).
- `arvoAarteenArvo`-arvovälit (PIENI_AARRE_ARVO 100–250, ISO_AARRE_ARVO 500–800, 10 punnan askelin) eivät ole nimetty vienti-exportissa (`js/tokens.js` ei ole `LISAMODUULIT`-listalla PIENI_AARRE_ARVO/ISO_AARRE_ARVO-vakioille, vain TOKEN_TYPES) — Siirtoseppä: lisää nämä lahteet.mjs:ään.
- Tarkistettu: game.js:n vakiot (FIFTY_FIFTY_PRICE, HINT_PRICE, QUIZ_SECONDS, STAR_PRIZE, DUEL_PRIZE, TURN_HOURS, RECORD_DAYS, XP_*) ovat kokoelmassa `saannot` (28 vakiota). Puuttuvat: tokens.js PIENI_AARRE_ARVO/ISO_AARRE_ARVO, ai.js BOT_SKILL, kaksintaistelun todennäköisyys.

### Riskit ja huomiot
- `class Game` on 3601 rivin tilakone yhdessä tiedostossa — natiivissa tämä kannattaa pilkkoa moduuleiksi jo suunnitteluvaiheessa, muuten Unity-puolella syntyy vastaava jättiluokka.
- Pöllön sähketehtävä (`avaaAarreSahkeella`) ja aarteen pysyvä lukitus (`lukitseAarre`) sisältävät saman "siirrä tähti toiselle laatalle ettei peli jumitu" -suojan kahdessa eri paikassa — natiivissa kannattaa yhdistää yhdeksi apufunktioksi ettei sääntö eriydy.
- Pulmageneraattorit ja niiden piirtofunktiot (11 kpl, 2 pack-tiedostoa) on jo erikseen luokiteltu manifestissa "logiikka"-tyyppiseksi — ne pitää lukea suoraan lähdekoodista (js/packs/europe-puzzles.js, africa-puzzles.js), sisältöpaketti antaa vain pulman metatiedot (id, generaattori-tunniste).
- Tallennusmuodon versiohistoria (v1→v2, mannerkohtaiset aarteet) on esimerkki siitä, että natiivin oma save-formaatti tarvitsee oman migraatiosuunnitelman alusta asti, koska pelaajilla tulee olemaan kesken jääneitä pelejä siirtymävaiheessa.
- Botin taitotaso (BOT_SKILL=0.55) ja rosvon vaikeus (kaksintaistelun `chance = 0.3 + reliefs*0.25`) ovat tasapainotusarvoja koodissa — natiivin täytyy joko kopioida luvut suoraan lähdekoodista tai pyytää ne erikseen "saannot"-kokoelmaan.

---

## 2. Lauta, pallo ja kartta

Alue on peruskerros koko pelille: js/pallolauta/ (26 tiedostoa, ~24 200 riviä), js/kartta*.js-perhe (vanha SVG-lauta, ~10 400 riviä), js/pallolaatat.js (4 788), js/karttanimet.js (2 852), js/fokusmitat.js (2 231), js/reliefipyramidi.js (690), js/etusivupallo.js (1 410) ja js/packs/maakartat.js (16 237, pääosin data). Omistajan 5.9.2026 linjaus (docs/moduulit/karttapallo.md): Globe.gl-pallo on PÄÄLAUTA, vanha SVG-kartta (js/kartta.js) elää enää linssikarttana (avataan vain linssin ajaksi). Iso riski: koko GPU/DOM-piirtoketju on laitteessa natiivissa korvattava kokonaan Unityn omalla renderöinnillä — tästä paketista ei siirry juuri mitään suoraan, vain koordinaatit ja säännöt.

| Toiminto | Mitä tekee | Riippuvuudet | Paketin kattavuus | Omistaja | Arvio h | Vaihe |
|---|---|---|---|---|---|---|
| Globe.gl-pallo runkona | Pallo piirtää Mercator-laatat, kamera pointOfView-tweenillä | js/pallolauta/lauta.js (5 947 r), js/pallo.js | Ei paketissa (kirjastosidonnainen piirto) | Natiiviseppä | 200 | 1 |
| Laattapyramidi (poltto+lataus) | Z0–Z7 Mercator-laatat ämpäristä, taso dpr*skaalalla | js/laattapyramidi.js, js/pallolaatat.js (4 788 r), tools/generoi-laattapyramidi.mjs | media.json antaa ämpäriosoitteet, ei itse laattoja/reseptiä | Natiiviseppä | 120 | 1 |
| Reliefipyramidi (topografia) | Oma korkeuslaatasto, sama ruudukko kuin pohjalaatoilla | js/reliefipyramidi.js (690 r), ETOPO 2022 -lähde | Ei paketissa | Natiiviseppä/Linssiseppä (rajapinta) | 40 | 3 |
| Kaupunkipisteet ja nimet pallolla | Pisteet + elävät CSS2D-nimitekstit laattojen päällä, ladotaan levossa | js/pallolauta/nimet.js (943 r), merkit.js (550 r), glnimiot-sovitin.js (679 r), nimiorasterit.js (698 r) | kokoelmat/kaupungit.json (266, lat/lon) kattaa datan, ladonta-algoritmi puuttuu | Natiiviseppä | 80 | 1 |
| Aihemerkit (teemavalot) | Kaupunkien aihevalot/ikonit pallolla, tapahtumasidonnaiset | js/pallolauta/aihemerkit.js (953 r) | Osittain (esilasketut/saannot), logiikka puuttuu | Natiiviseppä/Pelikoodari | 30 | 2 |
| Elävät nostot (relief-nostot) | Vielä polttamattomat 3D-korkeusnostot pallolla | js/pallolauta/nostot.js (4 505 r), nostoankkurit.js (355 r), js/nostoladonta.js | Ei paketissa, iso logiikkatiedosto | Natiiviseppä | 150 | 2 |
| Kamera-ajot | Ennakkozoomi, saatto, kohdesovitus, sukellus; sama rajapinta molemmilla laudoilla | js/pallolauta/kamera.js (1 260 r), kallistus.js (300 r), kameraloki.js (168 r) | Ei paketissa (puhdas ohjainlogiikka) | Natiiviseppä | 90 | 1 |
| Nappulan liike pallolla | Nappula pysyy pallon pinnalla joka kehys, hyppykaari reitin polyllä | js/pallolauta/siirto.js (683 r), js/siirtokoreografia.js (ei tässä alueessa) | reitit-data (485) paketissa, animaatiologiikka ei | Natiiviseppä/Pelikoodari | 60 | 1 |
| Reittiviivat (polut) | Merireitit via-pisteillä, maareitit käsinpiirretyn mutkan hajautuksella | js/rules.js edgePolyline (rivi 121), js/pallolauta/reitit.js (589 r) | kokoelmat/reitit.json (485, laji+askelia+via) kattaa datan | Natiiviseppä/Pelikoodari | 40 | 1 |
| Noppa-animaatio | 3D-noppa laudan pinnalla, fysiikkakaari, pomppu, hidastuva pyörintä | js/die.js (362 r, sidottu vanhaan SVG-kartan koordinaatistoon) | Ei paketissa | Natiiviseppä | 30 | 1 |
| Suorituskyvyn mittarit | Nimiösulavuus, pääsäie/GPU-jako, lepopiirto (4 fps kun ei muutu) | js/pallolauta/sulavuusmittari.js (272 r), kehysprofiili.js (448 r), lepopiirto.js (250 r), sovittelu.js (364 r) | Ei paketissa (kehitystyökaluja, ei kuulu natiiviin sellaisenaan) | Natiiviseppä | 20 | 3 |
| Sumu ja tähdet | Kartan sumurajaus (kartoittamaton alue) ja Matkakirjan ihmeiden tähdet pallolla | js/pallolauta/sumu.js (237 r), tahdet.js (418 r) | Osittain (paikkatiedot.json 945 kattanee tähtien sijainnit) | Natiiviseppä/Pelikoodari | 30 | 2 |
| Kohdekartat (maakartat) | Kaupunkien/maiden lähikartat kartuutseineen, mittakaava- ja piste-apurit | js/packs/maakartat.js (16 237 r, dataa), kaupunkiliuska.js (381 r), kaupunkiliuska-nimiot.js | Osittain paketissa (moduulit/maakartat.json raakana) | Natiiviseppä | 150 | 2 |
| Vanha SVG-lauta (linssikartta) | Tasokartta avautuu vain linssin ajaksi kuoressa pallon päällä | js/kartta.js (4 534 r), kartta-liike.js, kartta-lataus.js, karttazoom.js, karttamittari.js, karttavalot.js | Ei paketissa | Natiiviseppä/Linssiseppä | 100 | 3 |
| Kartan paikannimet (SVG-lauta) | Nimiöt ladotaan ruutuavaruudessa DPR-riippumattomasti, ei poltettu laattaan | js/karttanimet.js (2 852 r) | Ei paketissa (ladonta-algoritmi) | Natiiviseppä | 50 | 2 |
| Etusivupallo | Esirenderöity, sumennettu pallon pyöritys Lontoo→Aasia, lentokone + punainen viiva + isoisän kuvat | js/etusivupallo.js (1 410 r), tools/tee-etusivupallo.mjs | Ei paketissa (esirenderöinti tuottaa kuvasarjan/videon) | Natiiviseppä/Natiivi-UI | 60 | 2 |
| Fokusmitat | Mittajana, ruutuun ankkuroitu kartuutsi + asteviivaimet; myös laudalta↔astekoordinaatit pallolle | js/fokusmitat.js (2 231 r, laudaltaAsteiksi/projisoiLaudalle jaettu palloon) | Osittain (kaupunkien lat/lon paketissa, laskukaava ei) | Natiiviseppä | 70 | 1 |
| Linssikartta-sovitin | Avaa/purkaa vanhan SVG-kartan kuoren pallon päälle linssin ajaksi | js/pallolauta/linssikartta.js (250 r), linssit.js (878 r, rajapinta Linssisepälle) | Ei paketissa | Natiiviseppä/Linssiseppä | 30 | 3 |
| Kerrokset ja profiilinäyttö | Sallittujen pallokerrosten lista + kehittäjän kerrosprofiilipaneeli | js/pallolauta/kerrokset.js (191 r), profiilinaytto.js (549 r) | Ei paketissa; kehittäjätyökalu, harkittava "ei natiiviin" | Natiiviseppä | 10 | 3 |
| Poltto/tile-baking-putki | Laattapyramidin, reliefin ja nostotasojen tuotanto (poltto) | tools/generoi-laattapyramidi.mjs, tee-pallolaatat.mjs, tee-pallotopografia*.mjs, tee-pallovektorit.mjs, poltto-edistyminen.mjs | Ei kuulu pelipakettiin — natiivi tarvitsee joko saman laattaputken tai valmiit laatat ämpäristä | Natiiviseppä | 80 | 1 |
| Merikoristeet ja isobaatit | Syvyyskäyrät ja meren koristelu poltettu laattoihin (v2015 pohjapoltto) | tools/generoi-laattapyramidi.mjs, js/muutokset.js (muutosloki rivi 149) | Ei paketissa (osa laattapikseleitä) | Natiiviseppä | 20 | 2 |

### Puutteet paketissa
- Ei laatta-/relief-/nosto-poltosta tuotettuja kuva-assetteja tai reseptejä (vain media.json-osoitteet ämpäriin, ei polttologiikkaa).
- Nimiöiden ladonta-algoritmi (törmäystenesto, DPR-riippumaton koko) ei ole datana missään — puhdasta koodia js/karttanimet.js:ssä ja js/pallolauta/nimet.js:ssä.
- Kameran trapetsiajo, siirron koreografia ja hyppykaaren fysiikka puuttuvat (logiikka on koodissa, ei manifestin "logiikka"-luokassa varmistettu — Siirtoseppä: tarkista manifest.json kattaako nämä).
- Maakartat-datan (js/packs/maakartat.js) suhde kokoelmat/paikkatiedot.json:iin ei ole tarkistettu (tarkistamatta).

### Riskit ja huomiot
- Koko piirtokerros (Globe.gl/three.js, GPU-vasteet) on kirjastosidonnaista koodia — natiivissa tämä on täysi uudelleenkirjoitus Unityllä, ei siirto.
- Suorituskykytyö on ollut raskasta ja jatkuvaa (lepopiirto, kehysprofiili, sulavuusmittari) — natiivissa moottorissa moni näistä ongelmista (strobovälke, DPR-koko) ei toistu samalla tavalla, mutta 60 fps -vaatimus pysyy.
- Kaksi rinnakkaista lauta-toteutusta (pallo + vanha SVG-kartta linssikartaksi) kasvattaa siirtotyötä; natiivissa kannattaa harkita vain pallon siirtoa ja linssikartan korvaamista muulla ratkaisulla.
- js/packs/maakartat.js on 16 237 riviä dataa yhdessä tiedostossa — kannattaa varmistaa ennen siirtoa, ettei vienti-paketti jo kata sen kokonaan (moduulit/-kerros).
- Noppa (js/die.js) on kirjoitettu vanhan SVG-kartan koordinaattikuoreen; pallolla nappulan/nopan sijoitus käyttää eri rajapintaa (js/pallolauta/siirto.js) — natiivissa nämä on yhdistettävä yhdeksi 3D-mekaniikaksi.

---

## 3. Linssit

Alueella on 38 tiedostoa `js/linssit/` (yht. 31 117 riviä) sekä kaksi jaettua koneistoa alueen ulkopuolella: `js/aikajana.js` (6 442 riviä, neljän linssin yhteinen aikajanamoottori) ja `css/linssikehys.css` (113 riviä, kehyksen liu'ku). Rekisterissä (`js/linssit/rekisteri.js`) on 9 pelattavaa linssiä ja 9 kommentoitua tulevaa linssiä (historia, ilmasto, kielet, leviäminen, maaluvut, muuttoliike, tähdet, tuulet, yökartta) — niille ei ole yhtään koodia, joten ne eivät ole riveinä alla. Suurin riski: "Ihmisen matka" (14 tiedostoa, ~8 600 riviä) ja "Satelliitti/Astronautin kamera" (8 tiedostoa, ~10 600 riviä) ovat kumpikin yhden linssin kokoisia mutta data, esitys, ääni, luenta ja nimiöt asuvat omissa tiedostoissaan — natiivissa nämä yhdistyvät yhdeksi kaarimoottoriksi per linssi.

| Toiminto | Mitä tekee | Riippuvuudet | Paketin kattavuus | Omistaja | Arvio h | Vaihe |
|---|---|---|---|---|---|---|
| Rekisteri ja kehysmoottori | Listaa aktiiviset linssit, lataa moduulin laiskasti, piirtää/rasteroi linssikerroksen kartalle | rekisteri.js (73), kerros.js (507) | Ei paketissa (koodirakenne, ei sisältödataa) | Pelikoodari | 40 | 1 |
| Linssikehyksen liu'ku (UI) | Yläpalkki/alapalkki/napit liukuvat ruudun ulkopuolelle ja takaisin linssin aukiolon ajaksi | css/linssikehys.css (113) | Ei paketissa (CSS) | Natiivi-UI | 6 | 1 |
| Linssien omistus ja lunastus | Kuka omistaa minkä linssin, tietäjäpisterajat, "hiomassa"-tila, kaupungista löytyvä linssi | omistus.js (307) | Ei paketissa: LINSSIKYNNYKSET [400,800,1400,2200], OPTIKON_HYVITYS 500, PERUSLINSSIT ei viety | Pelikoodari | 20 | 1 |
| Aarrepalkkiolinssit | Iso paikallisaarre voi antaa linssin kylkiäisenä | aarteet.js (34) | LINSSIAARTEET on tyhjä objekti koodissa — ei dataa viedä eikä puuttu | Pelikoodari | 4 | 2 |
| Aikajana- ja aikaselainkoneisto (yhteinen) | Kello, valot, filminauha, kartuscha, Tiedeliite, karuselli + alapalkin aikajanaviivat; neljä linssiä käyttää | js/aikajana.js (6 442), aikaselain.js (345), css/aikajana.css | Ei paketissa (moottorikoodi, ei sisältöä) | Linssiseppä | 90 | 1 |
| Karttapallo-linssi | Avaa maailmanpallon matkalaukusta; ei piirrä karttakerrosta, kerros:false | pallo.js (51) | LINSSI viety kokonaan | Linssiseppä / Natiiviseppä | 8 | 1 |
| Topografialinssi | Täysvärinen reliefikartta + 1′-tarkennuslaastari lähelle zoomattaessa | topografia.js (968), topografia-tarkennus.js (545) | topografia.js LINSSI viety; tarkennus-laastari EI viety (puute) | Linssiseppä / Natiiviseppä | 30 | 3 |
| Vesistölinssi | Joet ja järvet reliefin päällä, oma taso ettei pohjakartta sotkeennu | vesistot.js (700) | LINSSI viety kokonaan | Linssiseppä | 16 | 3 |
| Vertailulinssi | Maa numeroina -vertailu suoraan kartalta, Suomi aina mukana käyrissä | vertailu.js (70) | LINSSI viety (kerros:false) | Linssiseppä | 10 | 3 |
| Maatiedot-linssi | Avaa minkä tahansa maan lehden suoraan kartalta ilman matkustamista | maatiedot.js (69) | LINSSI viety (kerros:false) | Linssiseppä | 8 | 3 |
| Maailmanradio — tila ja logiikka | Kartan tila vaihtuu: kaupungit toimivat play-nappeina, ei kartan muuta toimintoa | radio.js (2 215) | LINSSI viety, mutta linssin sisäiset funktiot kulkevat vain `{ $funktio }`-merkkeinä — logiikka pitää kirjoittaa uudelleen | Linssiseppä / Pelikoodari | 60 | 3 |
| Radion laite, näyttö ja viritinääni | Retroradion piirto, pisteruudukkonäyttö, synteettinen/nauhoitettu viritysääni | radiosoitin.js (1 248), pistenaytto.js (1 430), viritin.js (1 209) | Ei paketissa (piirto- ja äänikoodi, ei sisältödataa) | Linssiseppä | 45 | 3 |
| Keksinnöt-linssi | Ensimmäinen aikajanalinssi: 1769–1928 Euroopan keksinnöt, valot kartalle vuosittain | keksinnot.js (1 859) | KEKSINNOT, LINSSI viety kokonaan | Linssiseppä | 40 | 2 |
| Ihmisen matka — kaari, kytkentä ja aineisto | Toinen aikajanalinssi: 20 pysäkkiä, 300 000 v sitten → 1300 jaa; rekisterikytkentä + kaikki pysäkit/tekstit/kuvat | ihmisen-matka.js (391), ihmisen-matka-data.js (1 876) | LINSSI, ESITYKSEN_KUVAT, ALOITUKSEN_TAUSTAKUVAT, IHMISEN_MATKA(+LISANOSTOT/KYSYMYKSET) viety | Linssiseppä | 50 | 2 |
| Ihmisen matka — esitys, virrat ja maskit | Kaaren piirto yhtenä virtana (viisi väestövirtaa, karuselli, kamera), maa-/rantaviivamaskit piirtoon | ihmisen-matka-esitys.js (2 881), ihmisen-matka-virrat.js (397), ihmisen-matka-maamaski.js (25), ihmisen-matka-rantamaski.js (24) | IHMISEN_MATKA_VIRRAT (+RETKI/VANHA/VANAT) viety; esitys- ja maski-tiedostot EIVÄT (puute, jos maskit tarvitaan natiivipiirtoon) | Linssiseppä | 70 | 2 |
| Ihmisen matka — kertomus ja luenta | Kertojan käsikirjoitus + putkeen menevä ääniluenta, pulu hiljempaa päälle | ihmisen-matka-kertomus.js (385), ihmisen-matka-luenta.js (434) | IHMISEN_MATKA_KERTOMUS viety; luenta-logiikka EI (viittaa kertomus-manifesti.json:iin, ei paketissa) | Linssiseppä | 35 | 2 |
| Ihmisen matka — äänimaisema | Aidot nauhoitetut äänimaisemat jaksoittain (tuuli, sademetsä…) | ihmisen-matka-aanimaisema.js (374) | Ei viety; MAISEMAJUURI-polku ja äänivalinnat puuttuvat paketista (puute) | Linssiseppä | 20 | 2 |
| Ihmisen matka — kysymykset, kortti, muisti, tutkimus, pulukysymykset | Nostokortit, tutkimusvaiheen viisi aluenappia, linssi muistaa paikkansa, pulun valmiit kysymykset | ihmisen-matka-kysymykset.js (511), ihmisen-matka-kortti.js (595), ihmisen-matka-muisti.js (129), ihmisen-matka-tutkimus.js (464), ihmisen-matka-pulukysymykset.js (122) | IHMISEN_MATKAN_KYSYMYKSET viety; kortti/muisti/tutkimus/pulukysymykset-logiikka EI (UI- ja tilalogiikkaa, ei puhdasta dataa) | Linssiseppä | 55 | 2 |
| Satelliitti — linssi ja kytkentä | Astronauttien ottamat valokuvat, kaukoputkinäkymä kohteeseen, oma yläpalkki | satelliitti.js (1 896) | LINSSI viety | Linssiseppä | 35 | 2 |
| Satelliitti — kohdedata ja kysymykset | Havaintokohteiden luettelo, kuvat, lähteet; kaksi valmista kysymystä per kohde | satelliitti-data.js (1 975), astronaut-kysymykset.js (2 072) | SATELLIITTI_KOHTEET, SATELLIITTI_LAHDE, ASTRONAUTIN_KYSYMYKSET viety kokonaan | Linssiseppä | 25 | 2 |
| Astronautin avaruusnäkymä ja sumu | Maa avaruudesta, tähdet, ISS-rata, pilvikerros/avaruussumu zoomin aikana | satelliitti-avaruus.js (3 284), astro-sumu.js (713) | Ei viety (piirto-/shader-koodia); astro-sumu.js PILVIEN_OSOITE (pilvitekstuuri-webp) ei ole media.json:ssa (puute) | Natiiviseppä | 70 | 2 |
| Astronautin kamera — ääni | Aseman humina + valinnainen avaruusmusiikki, tasokytkimet | satelliitti-aani.js (441) | Ei viety; ASTRONAUTIN_HUMINA/-MUSIIKKI (R2-osoitteet) eivät ole media.json:ssa (puute) | Linssiseppä | 15 | 2 |
| Astronautin kamera — nimiöt | Estää nimiöiden (esim. "Niilin suisto", "Kairo") menemisen päällekkäin lähizoomissa | satelliitti-nimiot.js (179) | Ei viety (asettelualgoritmi, ei dataa) | Linssiseppä | 10 | 2 |
| Pallon reliefikuva (yhteinen satelliitti + topografia) | Valitsee 4K/8K reliefitekstuurin laitteen mukaan; sama kuva molemmille linsseille | reliefikuva.js (319) | Ei viety; RELIEFIN_OSOITE ja RELIEFIN_OSOITE_8K (webp-tekstuurit R2:ssa) eivät ole media.json:ssa (puute) | Natiiviseppä | 15 | 1 |

### Puutteet paketissa
- Topografian 1′-tarkennuslaastari (topografia-tarkennus.js) ei ole paketissa.
- Ihmisen matka: esitys-, maski- (maamaski/rantamaski), luenta-, äänimaisema-, kortti-, muisti-, tutkimus- ja pulukysymys-tiedostojen sisältö/parametrit eivät ole paketissa — data on viety, mutta iso osa toiminnasta on koodissa, ei pelkkää dataa.
- Reliefikuvan (reliefikuva.js) ja astronautin sumun (astro-sumu.js) webp/jpg-tekstuuriosoitteet eivät ole media.json:ssa, koska tiedostoja ei ole lahteet.mjs:ssä.
- Astronautin kameran ambienssiäänien URL:t (satelliitti-aani.js) eivät ole media.json:ssa.
- Omistus.js:n säännöt (tietäjäpisterajat, optikon hyvitys, peruslinssit) eivät ole paketissa — nämä ovat pieniä sääntövakioita, jotka pitäisi lisätä `saannot`-kokoelmaan.

### Riskit ja huomiot
- Radio.js:n LINSSI-olio kuljettaa toimintoja vain `{ $funktio }`-merkkeinä (manifest.json:in mukaan) — paketti kertoo että funktio on olemassa, ei mitä se tekee; koko radiotilan pelilogiikka pitää suunnitella uusiksi natiivissa.
- "Ihmisen matka" ja "Satelliitti" ovat kumpikin yhden linssin laajuisia 8–14 tiedoston kokonaisuuksia; niiden natiivitoteutus on selvästi suurempi työ kuin muut linssit yhteensä (yht. ~50 % koko alueen riveistä).
- js/aikajana.js (6 442 riviä) on neljän linssin (keksinnöt, ihmisen-matka, satelliitti osittain, topografia osittain) yhteinen moottori — jos se natiivissa pilkotaan linssikohtaisiksi, riski on eriytyvä käytös (esim. pulun sisäänastumisen ajoitus).
- reliefikuva.js:n päätös (4K vs 8K vs koko pallo) riippuu laitteen pikselitiheydestä ja WebKit-erikoistapauksista — natiivissa tämä logiikka pitää arvioida uudelleen laitekohtaisesti, ei suoraan kopioida.
- ihmisen-matka-maamaski.js ja -rantamaski.js ovat generoituja (node tools/tee-maamaski.mjs / tee-rantamaski.mjs) — jos natiivi tarvitsee samat maskit, ne kannattaa generoida työkalulla uudelleen eikä siirtää käsin.

(topografia-tarkennus.js, radiosoitin.js, pistenaytto.js, viritin.js, satelliitti-avaruus.js, astro-sumu.js, satelliitti-nimiot.js sisällöt tarkistettu vain tiedoston alun ja exporttien perusteella — käyttäytyminen tarkistamatta.)

---

## 4. Lehdet, kartuscha ja käyttöliittymä

Alue kattaa n. 60 tiedostoa ja n. 90 000 riviä (js/ui.js yksin 23 919 riviä — pelin suurin tiedosto, kameran/laudan mitoitus ja kaikki dialogit samassa luokassa). Pöllö (Livia-tekoälykumppani, js/pollo.js) tekee omia fetch-kutsuja palvelimelle — natiivissa tarvitsee oman verkkokerroksen. Sisältöpaketti kattaa datan (lehtisivujen tekstit, kysymykset, julisteet, skandaalit) mutta EI sivujen taittoa, dialogilogiikkaa eikä animaatioita — kaikki tässä taulukossa on web-koodia, jota ei ole paketissa.

| Toiminto | Mitä tekee | Riippuvuudet | Paketin kattavuus | Omistaja | Arvio h | Vaihe |
|---|---|---|---|---|---|---|
| Kaupunkilehti | Lehden sivupino, selaus, sisällysvalikko, lukijakytkennät | js/lehti.js (2819), kaupunkilehdet-data | Data 195 lehteä paketissa; taitto/selaus puuttuu | Natiivi-UI | 90 | 2 |
| Maalehti | Maan tunnusluvut, mediarivit, kielinäyte, V-Dem, kulttuurinostot | js/maalehti.js (1192) | Data 119 maalehteä paketissa; piirto puuttuu | Natiivi-UI | 60 | 2 |
| Lehtikuori ?lehti= (POIS natiivista, päivitys 23.9. ilta) | WKWebView-kuori avaa index.html?lehti=id; LATAA main.jsin koko staattisen tuontipuun | web/lehti.json: 42,9 Mt koodia, 303 Mt tiedostoja yhteensä | Ei kevyt paketti — koko peli mukana | Natiivi-UI/Pelikoodari | (arvioi natiivilehti erikseen, ei tässä) | 1 |
| Nähtävyydet ja kohdekartta | Kaupungin värikartta piirroskohteineen, nähtävyysjuttu-dialogi, karusellit | js/nahtavyydet.js (2755), fokusnosto-symbolit, karttazoom | Data 1520 nähtävyyttä paketissa; piirto puuttuu | Natiivi-UI | 80 | 2 |
| Fokusvirta (annosteluvirta) | Kaupunkiin saapuessa: matkakirja→pöllö→oppitunti→kohtaaminen, 4-vaiheinen kortisto | js/fokusvirta.js (7227, suurin lohko tässä alueessa) | fokusvirrat-data (50) paketissa; koko virtakoneisto puuttuu | Natiivi-UI/Pelikoodari | 140 | 1 |
| Fokuskohteet (popupit) | Kartan erityiskohteiden (vuoret, joet, kaupungit) klikattavat popup-tietoruudut | js/fokuskohteet.js (6821) | Osa maakohtaisista fokuskohteista saanto-luokassa (esim. bgr/bih/grc/ita/rou/tur); DEU merkitty "kuollut" | Natiivi-UI | 130 | 1 |
| Fokuspiste | Vihreä hehkuva kohtaamispiste kartalla (kevyt kulku) | js/fokuspiste.js (419) | Ei erillistä dataa; logiikka puuttuu | Natiivi-UI | 20 | 1 |
| Fokustehtävät | Lehden sivujen 2–3 minitehtävät (aarteen avaus, juliste) | js/fokustehtavat.js (1180), kysymykset-data | Kysymykset (1407) paketissa; tehtävälogiikka puuttuu | Natiivi-UI/Pelikoodari | 50 | 1 |
| Kartuscha (kartan infopaneeli) | Maapaneelin ylös aukeava kortti: lippu, nimi, radionappi, lippuikkuna | js/pallolauta/maapaneeli.js (1634, jaettu Natiiviseppä/3D:n kanssa) | Ei erillistä dataa; UI-osuus puuttuu | Natiivi-UI (jaettu Natiiviseppä) | 70 | 1 |
| Karttaselite | Kartan symbolien selitevalikko, kaksi välilehteä (Nostot/Maakunnat), aihevalot | js/karttaselite.js (508) + js/karttatyokalu-maakunnat.js (625) | Ei erillistä dataa | Natiivi-UI | 60 | 2 |
| Saapumistraileri + -dialogi | Kaupungin minitraileri (3 herokuvaa+nimi), saapumisen avaus (openArrival) | js/saapumistraileri.js (722), ui.js openArrival (14622–), saapumispuheet (45) | Herokuvat/saapumispuheet paketissa; animaatio/järjestys puuttuu | Natiivi-UI | 70 | 1 |
| Matkalaukku (passport) + julisteet | Passi-dialogi: edistyminen, aarteet, löydöt, julistegalleria | ui.js openPassport (17980–), renderJulisteet (18257–) | Julisteet-data (114) paketissa (kaupunginJuliste esilaskettu; `juliste`-export merkitty "kuollut") | Natiivi-UI | 90 | 1 |
| Skandaalit | Maan kohut/huijaukset kartan lisäkohteina, avaa kortin | js/skandaalit.js (500), fokuskohteet.js rekisteröinti | Data 250 skandaalia paketissa; kortti/piirto puuttuu | Natiivi-UI | 40 | 2 |
| Historian hetket -kortit | Erillistä UI-tiedostoa ei löytynyt greppäämällä (tarkistamatta tarkemmin — saattaa asua fokuskohteet.js:ssä) | historianHetket-data (49) | Data paketissa (hetketMaassa, hetkenKuvat esilaskettu) | Natiivi-UI | 30 (tarkistamatta) | 2 |
| Lippuikkuna | Maan lipun, symboliikan, historiallisten asujen ja vaakunoiden ikkuna | js/liput.js (334), lipputiedot-paketti | Data paketissa; ikkunan piirto puuttuu | Natiivi-UI | 25 | 2 |
| Tekijäkortit/lähderivit | Kuvan lähderivin "Tekijästä"-kortti pro-sisällöntuottajille | js/tekijakortti.js (271) | worker/ehdotukset/pro.js ei osa vientipakettia (erillinen palvelin) | Natiivi-UI | 20 | 3 |
| Reaktiot | Sydän/peukku-napit sisällön kylkeen, "Mikä oli vialla?" -kysely | js/reaktiot.js (940) | Ei dataa paketissa (kirjoittaa palautetta); logiikka puuttuu | Natiivi-UI | 35 | 2 |
| Pulu/pöllö (tekoälykumppani) | Chat-paneeli, kontekstinkeruu, paikallinen tietohaku, sanelu, fetch-kutsut AI-palvelimelle | js/pollo.js (7496!), js/pollo-haku.js (626), js/pulu-paneelin-ylla.js (208) | Ei paketissa; vaatii oman AI-taustapalvelun natiivissa | Natiivi-UI/Pelikoodari | 160 | 2 |
| Luennat/lukija | Kertojaäänet, lauserajakatkot, häivytykset, puhujan väistö | js/luenta.js (1487), js/luentareaktiot.js (784), js/lukija.js (2276) | Äänidata (mp3/peilatut) paketissa; ajastus/mixaus puuttuu | Natiivi-UI/Pelikoodari | 90 | 1 |
| Ylä-HUD (raha, päivät, vuoro) | Yläpalkki, vaakatilan piilotus/väkäset, pieni ikonipalkki | js/ylapalkki-vaaka.js (135), js/vakasikoni.js (60), ui.js-osuudet | Ei dataa; layout-logiikka puuttuu | Natiivi-UI | 25 | 1 |
| Linssien hampurilaisvalikko / asetukset | Poistu, aloita alusta, kertoja on/off, musiikki on/off | js/aikajana-valikko.js (240) | Säännöt (28) paketissa osin; toimintologiikka puuttuu | Natiivi-UI | 20 | 1 |
| Piirtokoe-valikko | Kehittäjän piirtokoe ja kehysprofiilikytkin ratasvalikossa | js/piirtokoe-asetus.js (346) | Ei dataa; dev-työkalu | Natiivi-UI | — | ei natiiviin |
| Päivitysloki | Versionumeroa klikkaamalla avautuva tiivis muutosloki | js/muutokset.js (2231, pääosin tekstidataa) | Ei paketissa erikseen | Natiivi-UI | 10 | 3 |
| ui.js (yleisrunko) | 353+ metodia: mitoitus, kamera, dialogit, 45 valikko-viittausta — koko UI:n solmukohta | js/ui.js (23 919) | Ei sovellu (orkestrointikoodi) | Natiivi-UI | (sisältyy yllä oleviin riveihin) | 1 |

### Puutteet paketissa
- Historian hetket -kortin UI-sijainti pitää varmistaa (ei löytynyt erillistä tiedostoa greppäämällä "historianHetki").
- Pöllön (js/pollo.js) AI-taustapalvelun rajapinta (fetch-kohteet) ei ole dokumentoitu paketissa — Siirtoseppä: lisää palvelinosoite/-sopimus pakettiin tai erilliseen liitteeseen.
- Julisteet-datan "kuollut"-merkintä (`js/packs/julisteet.js#juliste`) kannattaa tarkistaa: onko juliste-export oikeasti käytössä muualla vai turvallista jättää pois.
- worker/ehdotukset/pro.js (tekijäkortit) on erillinen palvelin eikä osa vientipakettia — Siirtoseppä: mainitse riippuvuus dokumentaatiossa.

### Riskit ja huomiot
- js/ui.js on 23 919 rivin god-class, jossa kamera/lauta-mitoitus on kietoutunut dialogilogiikkaan — natiivissa nämä on pakko purkaa erillisiksi järjestelmiksi, ei suoraa 1:1-siirtoa.
- js/fokusvirta.js (7227) ja js/fokuskohteet.js (6821) ovat alueen suurimmat yksittäiset tiedostot ja ytimessä olevaa pelilogiikkaa — vaativat tiivistä yhteistyötä Pelikoodarin kanssa.
- Lehtikuori ?lehti= ei ole kevyt paketti: se lataa main.js:n koko staattisen tuontipuun (42,9 Mt koodia) WKWebViewiin — väliaikaisratkaisu, ei malli natiiville lehdelle.
- Pöllö tekee verkkokutsuja ulkoiselle AI-palvelimelle (js/pollo.js rivit ~5890, ~5956) — natiivissa tarvitaan oma verkko-/autentikointikerros, ei pelkkää UI-siirtoa.
- Kartuscha (js/pallolauta/maapaneeli.js) on jaettu Natiiviseppä-alueen kanssa (3D-laudan paneeli), joten omistajuus ja rajapinta kannattaa sopia erikseen.

---

## 5. Pulu, Livia, tarina ja luennat

Alue on kolme kokonaisuutta: Viisas Pöllö / Livia -tietokumppani (chat, paikallishaku,
poiminnat; `js/pollo.js` yksin 7496 riviä), Livian koko animoitu hahmo (SVG/pikseli-ele,
puhe-cuet, foley-äänet; noin 9 tiedostoa, ~5700 riviä) sekä sisältödata (kohtaamiset,
tarinakaari, saapumispuheet, isoisän ja kohtaamisten kuvat) ja lukija (sivujen ääneenluku).
Alueella on myös kolme erillistä Cloudflare Workeria (pöllö+lukijaääni, sähke, ehdotukset) —
jokainen on oma pieni palvelinprojekti, ei osa sisältöpakettia. Kokonaisrivimäärä alueen
ydintiedostoissa ~26 900 riviä; lisäksi riippuvuudet `js/puhe.js` (1232) ja
`tools/pollo/worker.js` (2061) sekä data `js/tyohuone-kehitys-data.js` KAARI_PAKETIT (3877).

| Toiminto | Mitä tekee | Riippuvuudet | Paketin kattavuus | Omistaja | Arvio h | Vaihe |
|---|---|---|---|---|---|---|
| Pöllö/Livia-chat (ydin) | Chat-paneeli, viestivirta, striimaus, historia, kysymysnapit | `js/pollo.js` (luokka Pollo ~5400 riviä), worker POST | Data (kysymykset, paikkatiedot) kyllä; UI/verkkologiikka ei | Natiivi-UI | 70–100 | 2 |
| Paikallinen tietohaku | Poimii osuvimmat katkelmat ennen kysymyksen lähetystä (ei AI:ta) | `js/pollo-haku.js` (626), kokoelmat (nähtävyydet, paikkatiedot) | Data kyllä, hakualgoritmi ei | Natiivi-UI/Pelikoodari | 10–15 | 2 |
| Pöllöpoiminnat | Tallentaa hyvän vastauksen artikkeliin, laitekohtainen | `js/pollopoiminnat.js` (387), localStorage | Ei koske (runtime-tila) | Natiivi-UI | 5–8 | 2 |
| Lukijoiden ehdotukset | Palautelomake kuvineen + PRO-tekijäkanava, oma worker | `js/ehdotukset.js` (1193), EHDOTUS_OSOITE-worker, R2 | Ei paketissa (runtime-palvelu) | Natiivi-UI (tai "ei natiiviin") | 20–30 jos mukaan | 3 |
| Sähke (retkikunta/kaveriapu) | Moninpeli ilman vapaata tekstiä: retkikunta, sähkeet, kaveriapu | `js/sahke.js` (1393), oma SAHKE_OSOITE-worker (KV-tila) | Ei paketissa; vain rakenteet | Pelikoodari + Natiivi-UI | 50–70 | 3 |
| Livia, kokopulun hahmo | Proseduraalinen SVG-hahmo, eleet, optinen lähestyminen | `js/livia.js`, `livia-svg.js`, `livia-svg-paa.js`, `livia-pikselit.js`, `livia-hoyhenet.js`, `livia-eleet.js`, `livia-uudet-versiot.js` (~3200 riviä yht.) | Ei (piirtokoodi, ei dataa) | Natiivi-UI | 80–120 | 2 |
| Livian puhe ja cue-ajastus | Esigeneroitu ElevenLabs-ääni + ms-tarkat eletapahtumat repliikkiin | `js/liviapuhe.js` (1687), `livia-puheleet.js`, `livia-puhetila.js`, `livia-pilotti-cuet.js` (1563, manifestidata) | Media.json antaa mp3-URLt; cue-data EI pakattu erikseen | Natiivi-UI | 40–60 | 2 |
| Livian tilanne-/reaktiokerros | Pelitilanteiden signaalit, asemointi, dialogijärjestys, foley-PCM | `livia-tilanteet.js`, `livia-lehtireaktiot.js`, `livia-dialogitila.js`, `livia-nostotila.js`, `livia-chat-tila.js`, `livia-astronautti.js`, `livia-tehosteet.js`, `livia-kasvot.js`, `livia-puheeleet-lataus.js` (~700 riviä yht.) | Ei dataa, pelkkä logiikka | Natiivi-UI | 25–35 | 2/3 |
| Lukija (ääneenluku) | Lukee sivun leipätekstit; 3-tasoinen varajärjestelmä | `js/lukija.js` (2276) + `js/puhe.js` (1232, ei tällä alueella) | Ei paketissa (DOM-poiminta + TTS-logiikka) | Natiivi-UI | 20–30 | 2 |
| Isoisän valokuvat | Data-taulu R2-kuvista + kuvatekstit ("Isoisän kuva: paikka, 1873") | `js/isoisan-valokuvat.js` (147) | media.json kattaa kuvat | Natiivi-UI | 4–6 | 2 |
| Kohtaamiskuvat | Katalogi + admin-galleria kaupunkien kohtaamiskuville | `js/kohtaamiskuvat-data.js` (1387 data), `kohtaamiskuvat.js` (63, admin-sivu) | Data paketissa (kokoelmat.kohtaamiskuvat); admin-sivu "ei natiiviin" | Natiivi-UI/Siirtoseppä | 6–10 | 2 |
| Kohtaamiset | "Etsi kätkö" -tarinalliset kohtaamiset per kaupunki + tunnetagit | `js/packs/kohtaamiset.js` (2175) | Data paketissa avaimittain | Pelikoodari + Sisältökirjuri | 25–35 | 1 |
| Tarinakaari | 3-osainen tarina (saapuminen/kohtaaminen/aarre) per kohde | `js/packs/tarinakaari.js` (85) + `js/tyohuone-kehitys-data.js` KAARI_PAKETIT (3877) | Data paketissa (kokoelmat.tarinakaari) | Pelikoodari + Sisältökirjuri | 25–35 | 1 |
| Saapumispuheet | Valmiit Horatio-äänitteet (ElevenLabs) kaupunkien saapuessa | `js/packs/saapumispuheet.js` (418) | Data+media kokonaan paketissa | Natiivi-UI | 4–6 | 1 |
| Tietäjägalleria | Matkalaukun i-napin minipopup, 10 tietäjätasoa selityksin | `js/tietajagalleria.js` (104), riippuu `tietajatasot.js` (ei tällä alueella) | Data osin paketissa (kysymykset/säännöt) | Natiivi-UI | 4–6 | 3 |
| Ilme-paketti | Käsinpiirretty-tyylinen SVG-efekti (muste, karhea kehys, korostus) | `js/ilme.js` (517), kirjastot Vivus/Rough.js/rough-notation | Ei koske (tyyliefekti) | Natiivi-UI tai "ei natiiviin" | 0 (pois päältä) / 15–20 jos halutaan | 3 |
| Palvelinpuoli (3 workeria) | Pöllön chat (Anthropic Haiku) + lukijaääni (OpenAI TTS), sähke, ehdotukset — kaikki eri workerit | `tools/pollo/worker.js` (2061, +rajat.js), SAHKE_OSOITE, EHDOTUS_OSOITE | Ei paketissa (infra, ei dataa) | Siirtoseppä/Pelikoodari (integraatio) | (tarkistamatta, riippuu ratkaisusta) | 1/2 |

### Puutteet paketissa
- Livian cue-ajastusdata (`livia-pilotti-cuet.js`, ~1563 riviä manifestia) ja siihen liittyvät `assets/aikaleimat/*.eleet.json`-tiedostot eivät ole sisältöpaketissa — ilman niitä puheen ja eleiden synkronointi pitää rakentaa tyhjästä.
- Ilme-paketin nykytila (oletus POIS 11.9.2026 alkaen) ei näy paketista mitenkään; pitää kertoa natiiville erikseen ettei tätä toteuteta oletuksena.
- Sähkejärjestelmän runtime-tila (retkikunnat, liittymiskoodit, KV-data) elää vain workerilla — paketissa on korkeintaan rakenteelliset mallipohjat (adjektiivit/substantiivit, sähkepohjat), ei live-dataa.
- Ehdotuskanavan PRO-tekijätiedot (oikeudet, nimeämisrivit) eivät ole pelidataa eivätkä kuulu pakettiin — tarkistamatta, onko niitä ylipäätään tarkoitus siirtää natiiviin.
- KAARI_PAKETIT (`js/tyohuone-kehitys-data.js`, 3877 riviä) on jaettu lähde työhuoneen esikatselulle ja pelille; ennen natiiviin vientiä pitää suodattaa pois `luennat: false` -kohteet (Lähi-idän kohteet ilman generoitua ääntä), kuten `packs/tarinakaari.js` jo tekee webissä.

### Riskit ja huomiot
- Livia on ~9000 riviä proseduraalista SVG/pikseli-animaatiota ja PCM-äänisynteesiä (foley) — ei datamigraatio vaan kokonaan uusi hahmoanimaatiojärjestelmä natiivissa (esim. Spine/DOTween-tyylinen rakenne).
- Pöllö-chat ja lukijaääni vaativat live-AI-palvelun (Anthropic Haiku + OpenAI TTS worker.js:n kautta); natiivi tarvitsee saman workerin uudelleenkäytön tai vastaavan oman välityspalvelimen — API-avain ei koskaan sovellukseen.
- Hyvä uutinen: `js/lukija.js` on JO suunniteltu natiiville — kolmiportainen varajärjestelmä sisältää valmiin sillan `window.matkakirjaNatiivi.luenta` (`ios/Matkakirja/Selain/natiivi-silta.js`), joten natiivi-TTS (esim. AVSpeechSynthesizer) voi korvata worker-TTS:n suoraan eikä välttämättä tarvitse verkkoa.
- Sähke ja Ehdotukset ovat kumpikin omalla erillisellä Cloudflare Workerillaan (`matkakirja-sahke.*`, `matkakirja-ehdotukset.*`) — kaksi pientä erillistä backend-projektia sisältöpaketin ulkopuolella, päätettävä erikseen tuleeko natiiviin.
- `js/pollo.js` on 7496 riviä yhdessä tiedostossa (luokka Pollo ~5400 riviä) — UI-logiikan pilkkominen kannattaisi tehdä ennen natiiviporttausta, ei sen aikana.

---

## 6. Äänet, musiikki ja alusta

Alue on n. 13 800 riviä ääni-/musiikkilogiikkaa (js/sound.js, ambience-stream.js,
musiikkivalitsin.js, kaupunkimusiikki.js, siirtymamusiikki.js, musiikkivahvistin.js,
kaiutinmittari.js, media.js, aani-ehdokkaat.js, aani-tausta.js) plus main.js (2388)
ja sw.js (2602). Suurin riski on iOS-erikoistapausten määrä (audioSession-luokka,
volume-ohitus, gesture-herätys) — natiivissa nämä ongelmat eivät toistu samalla
tavalla, mutta korvaava logiikka (mix, väistö, ristihäivytys) pitää silti rakentaa
uudelleen Unityn audiomikserillä. 23 äänitiedostoa on NC/ND-lisensoituja ja soivat
oletuksena (App Store -riski, ks. alla).

| Toiminto | Mitä tekee | Riippuvuudet | Paketin kattavuus | Omistaja | Arvio h | Vaihe |
|---|---|---|---|---|---|---|
| Tehosteäänet (SFX) | Web Audio -synteesi jokaiselle pelitapahtumalle, ei tiedostoja | js/sound.js SOUNDS-taulu (~320 riviä), ei exportattu | Ei paketissa: synteesikaava vain koodissa | Pelikoodari/Natiivi-UI | 40 | 1 |
| Vaihtoehtoiset äänitteet tehosteille | Pelaaja voi valita oikean äänitteen synteesin tilalle /aanet.html:ltä, tallentuu selaimeen | js/sound.js REAL_SAMPLES (ei export), js/aani-ehdokkaat.js EHDOKKAAT (export) | Osittain: EHDOKKAAT-taulu (URLit) mukana, REAL_SAMPLES-kartta puuttuu | Siirtoseppä + Pelikoodari | 8 | 2 |
| Kaupunkien äänimaisema (ambience) | Freesound-striimi maisematyypin/kaupungin mukaan, ristihäivytys, hiljaisuusvahti, varmistus syntetisoituun jos ei verkkoa | js/ambience-stream.js (2093 r.), aani-ehdokkaat.js TYYPPI_EHDOKKAAT/KAUPUNKI_EHDOKKAAT (export) | Osittain: korit exportattu, soittokoneisto (häivytys, arvonta) ei | Natiiviseppä/Pelikoodari | 24 | 2 |
| Radio "Kuuntele kieltä" | Suora nettiradio maan mukaan, ensisijainen; putoaa vanhaan äänitteeseen jos lähetys ei toimi | js/packs/radiot.js RADIOT (113 maata, export), js/packs/vanhat-aanet.js (varaääni) | Kyllä: RADIOT ja radioMaalle exportattu | Pelikoodari | 12 | 2 |
| Viritysäänet (radion haku) | Kohinaäänet radion "virittäytyy"-tilaan, PD/CC0 | js/packs/viritysaanet.js (124 r., 5 näytettä) | Tarkista (tarkistamatta), pieni paketti | Pelikoodari | 2 | 3 |
| Pohjaraidan valitsin | Päättää mikä musiikki soi (etusivu/kaupunki/alue/lehti/matkalaukku/pohjavire) ketjuna | js/musiikkivalitsin.js (507 r.), ei exportattu manifestiin logiikkana | Ei paketissa: vain ALUERAIDAT-data (kaupunkimusiikki.json) mukana | Pelikoodari | 16 | 1 |
| Kaupunkiraidat | Kaupungille oma musiikkikappale pohjavireen tilalle saapuessa | js/kaupunkimusiikki.js (225 r.), ALUERAIDAT/ALUEEN_MAAT exportattu | Kyllä: data mukana, soitin (ambience-stream.js) ei | Natiiviseppä/Pelikoodari | 6 | 2 |
| Siirtymämusiikki | Oma raita matkan ajaksi, eri jalan/laiva/lento | js/siirtymamusiikki.js (693 r.) | Ei paketissa (ei export-taulua, kappaleet Lyria-poluissa media.js:ssä osittain) | Pelikoodari | 10 | 2 |
| Musiikin vahvistin (iOS-korjaus) | Reititys GainNode-ketjuun, koska iOS ei salli `<audio>.volume`-kirjoitusta | js/musiikkivahvistin.js (358 r.) | Ei relevantti natiivissa (Unity Audio Mixer hoitaa tason) | — (ei tarvita) | 0 | — |
| Kaiutinmittari (VU) | Luennan aitoon RMS:ään sidottu 3-kaaren mittari kaiutinkuvakkeessa | js/kaiutinmittari.js (320 r.), lukee AnalyserNodea js/luenta.js:stä | Ei paketissa (visuaalinen, kuuluu Natiivi-UI:lle) | Natiivi-UI | 8 | 2 |
| Media-peili (ämpäri) | Kaikki kuvat/äänet peilattu Cloudflare R2:een, CORS vain ravelius.github.io/matkakirja.app | js/media.js AANI_JUURI, tests/media.test.mjs vartioi peiliä | Kyllä: media.json listaa kaikki viittaukset osoitteineen | Siirtoseppä | 4 | 1 |
| Luentaäänet (Horatio) | Valmiit ElevenLabs/Horatio-mp3:t fokusluentoihin, versioidut polut | js/media.js HORATIO_TUOTANTO, VERSIOIDUT_HORATIO_AANET | Kyllä: täysin exportattu (kestot mukana) | Pelikoodari/Natiivi-UI | 6 | 2 |
| Palvelutyöntekijä / offline-cache | sw.js esilataa kuoren ja pelaa offline; ei koske natiivia sellaisenaan | sw.js (2602 r.), CACHE-versiointi | Ei relevantti natiivissa (Unity ei käytä SW:tä) | — (korvautuu) | 4 | 3 |
| Tallennus (asetukset, valinnat) | localStorage-avaimet äänivalinnoille ja musiikkitilalle | STORAGE_KEY 'matkakirja-aani', AVAIN 'matkakirja-aanivalinnat' | Ei paketissa (avainten nimet vain koodissa) | Pelikoodari | 3 | 1 |
| Käynnistys ja turvatila | `?turvatila=1` GPU-kaatumisen jälkeen, tunnin turvatila, käynnistyslaskuri | js/main.js (2388 r.), localStorage 'matkakirja-atlas-turvatila' | Ei relevantti natiivissa (eri kaatumismalli) | — (uusi ratkaisu) | 4 | 3 |
| Testitilat/koeliput (?koe=) | Kehittäjän pikaliput (mm. dpr, profiili, "Suoraan kartalle") ohittavat normaalin kulun | ~45 osumaa js/*.js:ssä, ei yhtä keskitettyä taulukkoa | Ei paketissa | — merkitse "ei natiiviin" | 0 | 3 |
| Työhuone ja kehittäjälehti | js/tyohuone-*.js: sisäinen työkalu Raamatun/tilastojen/musiikkivalintojen hallintaan | js/tyohuone-musiikki.js, -kehittajalehti.js, -raamattu*.js, -tilanne.js, -tilastot.js, -pelit.js, -kehitys-data.js (yht. ~11 200 r.) | Osittain: MUSIIKKISIVUN_RAIDAT/SFX_NIMET exportattu, muu ei | **ei natiiviin** (vain kehittäjille) | 0 | 3 |
| Analytiikka/reaktiot palvelimelle | Pelaajan reaktiot (tykkäykset) lähetetään EHDOTUS_OSOITE-palvelimelle fetchillä | js/reaktiot.js (940 r.), js/ehdotukset.js | Ei paketissa (palvelinosoite ja protokolla vain koodissa) | Pelikoodari (jos säilytetään) | 6 | 3 |
| Lisenssit: NC/ND-äänet | 23 äänitiedostoa (14 ambienssi, 3 "kuuntele kieltä", 6 musiikkinäyte) ovat CC BY-NC/ND ja soivat oletuksena | docs/raportit/lisenssi-inventaario-20260923*.md (valmis inventaario) | Kattava: koko lista lähteineen jo dokumentoitu | Siirtoseppä/omistaja | 4 | 1 |
| Kielet/lokalisointi | Peli on VAIN suomeksi (`<html lang="fi">`), ei i18n-kehystä eikä käännöstiedostoja | index.html, ei erillistä lokalisointimoduulia | N/A (ei dataongelma) | Natiivi-UI (jos monikielisyys tulevaisuudessa) | 0 | 3 |
| Saavutettavuus (aria) | Niukkaa: vain 3 tiedostoa käyttää aria-live/role="status", ei systemaattista ruudunlukijatukea | js/*.js hajanaisia aria-attribuutteja | N/A | Natiivi-UI | 0 | 3 |

### Puutteet paketissa
- Ääniefektien synteesikaavat (SOUNDS, AMBIENCES, AMBIENCE_EVENTS, REAL_SAMPLES, PULUN_TEHOSTEET sound.js:ssä) eivät ole exportattuja eivätkä paketissa — Siirtoseppä: lisää nämä joko dataeksporttiin tai kuvaile logiikka.mjs:ään.
- Musiikkivalitsimen ketjulogiikka (musiikkivalitsin.js) ja siirtymämusiikin raitataulukko (siirtymamusiikki.js) eivät ole missään export-taulussa — Siirtoseppä: puuttuu.
- localStorage-avainten koko lista (äänet, musiikki, turvatila) ei ole koottuna mihinkään yhteen paikkaan paketissa.
- Testitila-/koelippu-luettelo (?koe=...) ei ole koottu; 45 osumaa hajallaan koodissa.
- reaktiot.js:n palvelinprotokolla (EHDOTUS_OSOITE-rajapinta) ei ole dokumentoitu paketissa.

### Riskit ja huomiot
- 23 NC/ND-äänitiedostoa soi oletuksena ja peli muuttuu maksulliseksi — App Store -riski; korvaus on jo aloitettu (docs/raportit/lisenssi-inventaario-20260923.md).
- iOS-audiosession- ja volume-kikat (musiikkivahvistin.js, sound.js ISTUNNON_LUOKKA) ovat WebKit-spesifisiä eivätkä siirry natiiviin sellaisenaan, mutta sama ilmiö (mix-tasot, väistö, duckaus) pitää silti suunnitella uudelleen Unity Audio Mixerillä.
- Radio (radiot.js) on koneellisesti generoitu (tools/hae-radiot.mjs) ja osoitteet voivat lakata toimimasta ilman varoitusta — natiivissa tarvitaan sama vara-äänite-polku kuin webissä.
- Palvelutyöntekijä (sw.js, 2602 riviä) ja turvatila (main.js) ovat web-alustaspesifisiä kaatumis-/offline-ratkaisuja, jotka pitää korvata kokonaan eri mekanismilla natiivissa, ei siirtää.
- Työhuone/kehittäjälehti (~11 200 riviä js/tyohuone-*.js) ei kuulu natiiviin pelaajalle — vain sisäisenä hallintatyökaluna, jos sellaista tarvitaan jatkossa.
