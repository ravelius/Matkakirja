# Sonnet 2: nähtävyysjuttujen tilanne (10.8.2026, tilinvaihdon jälkeen)

Tämä dokumentti on kirjoitettu niin, että toisen tilin uusi Sonnet-
sessio voi jatkaa suoraan tästä ilman edeltävää kontekstia. Lue tämä,
CLAUDE.md ja docs/roolitus.md ennen kuin teet mitään.

## Rooli

Kirjoitat "nähtävyysjuttuja" — kaupunkikartan kohteiden popup-
tarinoita — alkuperäisinä suomenkielisinä tiivistelminä
englanninkielisestä Wikipediasta (EI käännöksiä). Sisältö menee
AINOASTAAN `js/packs/nahtavyysjutut.js`-tiedostoon ylikirjoituksena;
`js/packs/maakartat.js`:ää (Opus 2:n vastuualue) et koske koskaan.
Raportoit Fablelle. Käytät Workflow-työkalua (tutkimus- ja
kuvakuraatioagentit per kaupunki) ja Agent-työkalua (Playwright-QA
taustalla) — älä tee tutkimusta tai kuvahakua itse käsin, se on
liian hidasta.

## Tilanne juuri nyt

**EUROOPPA ON TÄYSIN KATETTU.** Kaikki 37 Euroopan kohdekartta-
kaupunkia `js/packs/maakartat.js`:ssä ovat saaneet nähtävyysjutut.
`js/packs/nahtavyysjutut.js` sisältää 37 kaupunkiavainta, ja tämä
täsmää tarkalleen `maakartat.js`:n Euroopan kaupunkien kanssa.

Ainoa `maakartat.js`:n kaupunki, jolla EI ole nähtävyysjuttua, on
**dubai** — mutta se on Lähi-idän kaupunki, ei Euroopan, ja on
tarkoituksella jätetty tämän tehtävän ulkopuolelle (ks. "Seuraavaksi"
alla).

Main on tällä hetkellä versiossa **v508** (haara nollattu tuoreeseen
mainiin, ei avoimia PR:iä, ei kesken olevaa työtä). Työhaara on
`claude/matkakirja-peli-kehitys-rtrn23`.

**ÄLÄ ALOITA UUTTA ERÄÄ ITSENÄISESTI** ennen kuin Fable/omistaja
antaa luvan — tämä on omistajan nimenomainen ohje tilinvaihdon takia.
Odota jatkokuittausta.

## Valmistuneet erät (kaikki mainissa)

Jokainen erä = yksi PR = yksi versionosto. Kaikki alla mainitut ovat
squash-mergetty mainiin.

| Erä | Kaupungit | PR | Versio |
| --- | --- | --- | --- |
| Pilotti | Berliini | — | v367–v372 |
| 1 | Kairo, Venetsia | — | — |
| 2 | Madrid, Tukholma | — | — |
| 3 | Lontoo (muunto vanhasta mallista) | — | — |
| 4 | Praha, Wien, Budapest, Pariisi | — | v426 |
| 5 | Helsinki (+ Suomenlinna-kainalo) | #604 | v431 |
| 6 | Ateena, Amsterdam, Dublin | #624 | v436 |
| 7 | Istanbul, Marseille, Edinburgh | #678 | v468 |
| 8 | Lissabon, Barcelona, Granada | #693 | v477 |
| 9 | Rooma, Krakova, Varsova, Tallinna | #708 | v488 |
| 10 | Sofia, Bukarest, Sarajevo | #723 | v495 (kollisio v494:stä) |
| 11 | Kiova, Pietari, Moskova, Odessa | #733 | v502 |
| 12 | Tromssa, Dubrovnik, Riika | #736 | v504 |
| 13 | Vilna, Oslo, Kööpenhamina | #742 | v508 (kollisio v507:stä) |

Versiot tarkistettu `js/muutokset.js`:stä 10.8.2026. Jos tarvitset
täsmällisen historian, `git log -p -- js/muutokset.js`.

## Lukittu sisältömalli (EI POIKKEAMIA)

- 2–3 lyhyttä kappaletta per kohde, suunnattu n. 8–12-vuotiaille.
  OMA tiivis suomenkielinen kooste englanninkielisen Wikipedian
  faktoista — ei käännös, ei mukailtu lauserakenne. Konkreettisia
  yksityiskohtia (numeroita, tapahtumia, kuriositeetteja), ei
  yleistä turistiesittelyä.
- `aika`-kenttä: yksi vuosiluku tai vuosiväli (valmistuminen/avaus).
- `lainaus` VAIN jos aidosti hieno, tunnettu, aito lainaus löytyy —
  muuten `null`. Tarkista väitetyt lainaukset itse (WebSearch) ennen
  kuin luotat niihin — ainakin kaksi kertaa tässä työssä agentin
  lainaus oli asiasisällöltään oikea mutta sanamuodoltaan liikaa
  koristeltu alkuperäiseen verrattuna; tiivistä silloin lähempänä
  alkuperäistä.
- `lahde: 'Wikipedia'` — EI `wiki`-kenttää, EI "Lue lisää" -linkkiä.
- Kuvat: `tiedosto` (ilman "File:"), `selite` (suomeksi, kuvaa
  TODELLISTA sisältöä), `lahde` ("Tekijä, Wikimedia Commons
  (LISENSSI)"). Ensimmäinen kuva AINA vaakasuuntainen.

### Kuvamäärälinja (voimassa erästä 9 alkaen, omistajan päivittämä)

Pelissä on `kuvakaruselli`-ominaisuus (main v475 alkaen), joka
renderöi useamman kuvan siististi yhtenä kehyksenä. Sen myötä:

- Kaupungin **2–3 tunnetuinta pääkohdetta**: **2–3 kuvaa**.
- **Muut kohteet**: **1–2 kuvaa** — vain jos aidosti hyvää, erilaista
  materiaalia löytyy; älä pakota toista/kolmatta kuvaa turhaan.
- **Aikalaiskuva-bonus**: etsi jokaiselle kohteelle myös mahdollinen
  aikalaiskuva (n. 1800–1900-luvun alun valokuva/kaiverrus/postikortti,
  Public Domain). Jos laadukas löytyy, lisää se. Erityisen hyvä osuma
  on kuva ajalta lähellä vuotta 1873 (isoisän matkavuosi) — näitä on
  löytynyt useita (mm. Rooman Pietarinkirkko 1870-luku, Kööpenhaminan
  Christiansborg ennen v. 1873).
- Kuva pitää KATSOA SILMILLÄ (Read-työkalulla ladatun thumbnailin
  kautta), ei vain lukea tiedostonimeä. Vertaa ≥3 kandidaattia per
  kohde. Kriteerit: hyvä valo, kohde kokonaan näkyvissä, ei vinoa
  horisonttia, ei sotkuista etualaa, riittävä tarkkuus (>1200 px
  mieluiten). Tarkista lopuksi 480 px -kokoisena.

## Prosessi (toimiva putki, kopioi tätä)

1. **Tutkimus + kuvakuraatio**: yksi `Workflow`-ajo, `pipeline(CITIES,
   researchStage, curationStage)` kahdella vaiheella per kaupunki.
   Katso `/tmp/.../scratchpad/monistus/era13-workflow.mjs` (tai mikä
   tahansa era9–era13-workflow.mjs) mallipohjaksi — sisältää
   RESEARCH_SCHEMA:n, CURATION_SCHEMA:n (jossa `aikalaiskuva`-kenttä
   ja `kandidaatteja_katsottu`/`valintaperuste`) ja valmiit
   prompt-funktiot.
2. **Tulosten tallennus**: workflow-tuloksen JSON scratchpadiin
   (`era<N>-result.json`), tarkista sisältö silmämääräisesti
   (erityisesti disambiguointi-herkät kohteet).
3. **Kuvien itsenäinen tarkistus**: OMA Commons-API-tarkistus AINA,
   älä luota pelkkään agentin ilmoitukseen. Skripti:
   `tarkista-era9.mjs`-tyylinen (ks. scratchpad), tarkistaa
   `extmetadata.LicenseShortName`/`UsageTerms` (hyväksy
   PD/Public domain/CC0/CC-BY/CC-BY-SA — myös "No known copyright
   restrictions" LOC/Internet Archive -aineistolle kelpaa, se on
   vakiintunut PD-vastaava merkintä 1800-luvun kokoelmille) ja
   `Artist`-kentän (ei `user`-kenttää, koska monet on ladattu botilla).
   Commons rajoittaa nopeutta — käytä `fetchWithRetry` + ~1.8–4s
   viive per kutsu, ja jos jää kesken rate-limitiin, jatka
   loppuosalla erillisellä ajolla pidemmällä viiveellä.
4. **Koodigenerointi**: `gen-era<N>.mjs`-skripti lukee JSON-tuloksen,
   rakentaa `DATA`-objektin `ORDER`-listojen mukaisessa
   järjestyksessä (sama järjestys kuin `maakartat.js`:n `kohteet[]`),
   ja kirjoittaa `.js`-fragmentin taloin muotoilusäännöin (katso
   tarkka kuvaus alta). **Kirjoita per-kaupunki fragmentit erikseen**
   (`era<N>-<kaupunki>.js`) jotta voit splicettää ja committaa yhden
   kaupungin kerrallaan — tämä on nyt VAKIOKÄYTÄNTÖ, ei vain
   kontinkierrätyksen varalta.
5. **Splicing**: `Edit`-työkalulla lisää `PLACEHOLDER_ERA<N>`-rivi
   tiedoston loppuun ennen `};`, sitten `node -e` -skripti korvaa
   sen fragmentilla + jättää placeholderin seuraavaa kaupunkia varten
   (paitsi viimeisellä kaupungilla, jolloin placeholder poistuu
   kokonaan). `node --check` + `node tools/tarkista-kaksoisavaimet.mjs`
   jokaisen splicen jälkeen.
6. **Välicommit + push per kaupunki** — vakiokäytäntö nyt kaikissa
   erissä, ei vain kriisitilanteissa. `git add
   js/packs/nahtavyysjutut.js && git commit -m "WIP erä N: Kaupunki
   (välicommit)" && git push`.
7. **Testit + Playwright-QA** koko erälle kerralla (ei per kaupunki):
   `node --test tests/*.test.mjs`, sitten `Agent`-työkalu taustalle
   ajamaan Playwright-sweep — KATSO malliprompti mistä tahansa
   era9–era13-batchin QA-kutsusta tässä keskustelussa; toimiva
   navigointireitti: `http://localhost:8080/index.html?lauta=europe`
   + `reducedMotion: 'reduce'` + `ui.doPickStart(cityObj)` (HUOM:
   `await`, ja kaupunkiobjekti `game.board.cityById.get(id)`, ei
   pelkkä id-merkkijono — tämä unohtuu helposti ja jättää dialogin
   `display:none`-tilaan) → `ui.openArrival(game.cityOf())` →
   klikkaa jokainen `.kartta-selite`.
8. **Julkaisu**:
   - `git fetch origin main` JUURI ennen versionumeron valintaa.
   - `git merge origin/main` (tai `checkout -B ... origin/main` jos
     haara on vielä puhdas pohjapiste).
   - `node tools/uusi-versio.mjs "Muutoslokirivi (≤60 merkkiä)"` —
     UUSI TYÖKALU (main v492 alkaen), valitsee versionumeron
     ATOMISESTI tuoreesta mainista (lukee sekä `sw.js` CACHE:n että
     `muutokset.js`:n kärjen, ottaa suuremman+1). KÄYTÄ TÄTÄ ÄLÄKÄ
     KÄSIN bumppaa — silti versiokollisioita voi syntyä, jos toinen
     PR ehtii mergeytyä ennen omaasi (tapahtui 2 kertaa 13 erän
     aikana). Jos PR:n merge epäonnistuu "merge conflicts" -virheellä:
     `git fetch origin main`, `git merge origin/main`, ratkaise
     `js/muutokset.js`:n konflikti käsin (ota molemmat rivit, bumppaa
     omasi +1), `sed`-korjaa `js/main.js`+`sw.js` samaan numeroon
     käsin (ne eivät yleensä konfliktoi automaattisesti vaikka
     numerot törmäävät, koska molemmat puolet kirjoittivat saman
     merkkijonon), `git checkout --theirs dist/*.html`, `git commit`,
     `node tools/build-standalone.mjs`, uusi commit, push, päivitä
     PR:n otsikko, odota CI uudelleen.
   - `node --test tests/*.test.mjs`, `node
     tools/tarkista-kaksoisavaimet.mjs`, `node
     tools/build-standalone.mjs`.
   - Commit + push + `mcp__github__create_pull_request`.
   - `subscribe_pr_activity`.
   - **Odota CI vihreäksi `Monitor`-työkalulla ÄLÄKÄ jätä tätä
     kesken** — jos vuoro/kontti loppuu kesken CI-odotuksen, se on
     virhe. Käytä Monitor-työkalun `curl`-silmukkaa GitHub Actions
     APIin (malliesimerkki mistä tahansa tämän session julkaisusta),
     EI `send_later`-työkalua (ks. viestintärajoitus alla).
   - Squash-merge itse `mcp__github__merge_pull_request`:lla kun CI
     vihreä ja `mergeable_state` on `clean`.
   - `git fetch origin main && git checkout -B <haara> origin/main
     && git push --force-with-lease`.

### Tarkka muotoilusääntö `nahtavyysjutut.js`:lle

Avaimet: lainausmerkeittä jos yksi ASCII/tarke-sana ilman väliä/
väliviivaa (esim. `Üsküdar:`), muuten `'...'`-lainausmerkein (väli,
väliviiva, kaareva heittomerkki `’`). `teksti`-kenttä: ensimmäinen
kappale alkaa `teksti:`-riviltä; rivinvaihdot `+`-ketjutuksena,
jatkorivit sisennettynä `baseIndent+4`, kappaleenvaihtoyhdistäjät
(`+ '\n\n'`) ja seuraavan kappaleen ensimmäinen rivi `baseIndent+2`.
`lainaus`/`kuvat[]`: omat kentät `baseIndent+2`. Rivileveys ~58
merkkiä. Katso mikä tahansa `gen-era*.mjs` scratchpadista — se toteuttaa
tämän täsmälleen (`wrap()`, `emitTeksti()`, `emitWrappedField()`,
`keyFor()`, `emitCity()`).

## Wiki-disambiguointiansat (yleiset opitut kuviot, tarkista aina EN-wikin ensimmäinen virke)

- Sama nimi voi olla usean kaupungin nähtävyys (esim. "Pyhän Sofian
  katedraali" osuu helposti Istanbulin Hagia Sofiaan; "Nevskin
  katedraali" on eri rakennus Tallinnassa ja Sofiassa) — hae AINA
  täsmennetyllä haulla ("X, Kaupunki").
- Peli sisältää itsessään joskus virheellisiä fi-wiki-linkkejä
  historiallisista syistä (esim. Kööpenhaminan "Amalienborg" osoittaa
  peliin ruotsalaiseen panimoon) — näitä EI PIDÄ toistaa, kirjoita
  suoraan oikean EN-wiki-artikkelin pohjalta.
- Kansallispatsaat/-monumentit osuvat helposti kuuluisampaan
  ulkomaiseen vastineeseen (Riian "Vapaudenpatsas" → New Yorkin
  Statue of Liberty).
- Killan/veljeskunnan talot osuvat helposti toisen kaupungin
  samannimiseen (Riian "Mustapäiden talo" vs. Tallinnan).
- Jos `maakartat.js`:n kommenteissa lukee että kohteella EI ole
  fi-wiki-artikkelia, kirjoita silti oma juttu EN-wikin pohjalta —
  tämä ei koske sinun tekstiäsi, vain pelin sisäistä linkitystä.

## Herkkä sisältö: ei sotasisältöä Venäjän/Ukrainan kohteissa (erä 11:stä alkaen sovellettu, koskee myös jatkossa vastaavia kohteita)

Kiova, Pietari, Moskova, Odessa kirjoitettiin PUHTAASTI kulttuuri- ja
arkkitehtuurikohteina. Ei mainintaa Venäjän/Ukrainan sodasta (2014
tai 2022 alkaen) tai muusta ajankohtaisesta konfliktista. Vanhempi
historia (1800-luvun sodat, II maailmansota, keskiajan piiritykset)
on OK normaalina historiatietona lapsille sopivalla, ei-graafisella
tavalla — tätä on käytetty muissakin kaupungeissa (esim. Varsovan/
Sarajevon II maailmansodan tuho, mainittu lyhyesti). Erikoistapaukset:
Kiovan Itsenäisyyden aukio (Maidan) kirjoitettu 1700-luvulta alkavasta
historiasta ilman 2004/2014-tapahtumia; Moskovan Kreml arkkitehtuurina
ei nykypolitiikkana; Odessan Potjomkinin portaat mainitsee Eisensteinin
1925 elokuvan vain taidehistoriallisena kuriositeettina ilman
väkivaltakohtauksen kuvausta.

## Viestintä (TÄRKEÄ MUUTOS kesken tämän session)

**ÄLÄ KÄYTÄ `create_trigger`- ETKÄ `send_later`-työkaluja.** Molemmat
jumittuivat toistuvasti UUID-lupakyselyyn ja aiheuttivat kontin
kierrätyksiä. Raportoi AINA kirjoittamalla `docs/viesti-fable.md`
omalle työhaarallesi ja pushaamalla — Fable lukee haarat suoraan.
Kun kirjoitat viestin, PREPEND (lisää alkuun) uusi otsikollinen
osio — älä ylikirjoita toisten sessioiden (esim. Opus 1:n) viestejä,
jotka saattavat olla samassa tiedostossa jaetulla `main`-haaralla.

## Kontin kierrätys (tapahtuu usein tällä session-tyypillä)

Scratchpad (`/tmp/claude-0/.../scratchpad/`) SÄILYY kierrätyksen yli,
mutta työhakemisto (`/home/user/Matkakirja`) NOLLAUTUU tuoreeksi
git-checkoutiksi. Jos herätät kesken erän: (1) tarkista
`git log --oneline -10` työhaarallasi — välicommitit ovat siellä jos
niitä ehdittiin tehdä; (2) tarkista scratchpadin
`era<N>-result.json`/`.output`-tiedostot — workflow-ajo on saattanut
valmistua taustalla kontin kierrätyksestä huolimatta (tapahtui erässä
12: workflow valmistui, tulos oli talteen tallennettuna, ei mitään
menetetty); (3) `git fetch origin main && git checkout -B <haara>
origin/main` VASTA sen jälkeen kun olet varmistanut ettei paikallista
työtä ole hukkumassa.

## Tunnetut kaksoiskuvat (Opus 1:n vastuulla, ei sinun)

Opus 1 ylläpitää `docs/kuvaduplikaatit.md`-listaa koko pelin
kuvapäällekkäisyyksistä (menovinkit vs. muut paketit, ei
`nahtavyysjutut.js`-sisäisiä). Ei toimenpiteitä sinulta, mutta jos
huomaat oman työsi tuottavan saman kuvan kahdessa nähtävyysjutussa
(ei ole toistaiseksi tapahtunut), korjaa se itse ennen julkaisua.

## Seuraavaksi (EI vielä muodollisesti annettu tehtävä — odota kuittausta)

Fablen aiempi ennakkotieto: Euroopan jälkeen siirrytään Lähi-idän
kaupunki-/maalehtiin (`js/packs/middleeast.js`, ~28 kaupunkia,
mukaan lukien Dubai, jolla on jo kohdekartta muttei nähtävyysjuttua).
ÄLÄ aloita tätä itsenäisesti — omistaja on nimenomaisesti pyytänyt
odottamaan uutta kuittausta tilinvaihdon jälkeen. Tarkista
`docs/viesti-fable.md` ja `docs/fable-tilanne.md` tuoreimmasta
mainista ennen minkään uuden aloittamista.
