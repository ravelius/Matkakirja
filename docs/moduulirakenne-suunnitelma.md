# Pelin moduulirakenne — suunnitelma

*(Fable max 17.8.2026, docs/tyolista-maxille.md kohta 1. TILA:
ODOTTAA OMISTAJAN HYVÄKSYNTÄÄ — yhtään koodimuutosta ei ole tehty
eikä tehdä ennen hyväksyntää. Kartoitus tehty tuoreesta mainista
(v806); kaikki portit ajettu lähtötilassa vihreinä: 739/739 testiä,
ei kaksoisavaimia, standalone kokoontuu.)*

## 1. Tehtävä

Omistajan tilaus 16.8.2026: pelille selkeä moduulirakenne —
mitkä ovat moduulit, kullekin vastuu, datapaketit ja rajapinnat;
koodijakoehdotus paisuneelle js/ui.js:lle (19 167 riviä) ja arvio
css/styles.css:lle (14 143 riviä); turvallinen siirtymäpolku.

## 2. Nykytila

### 2.1 Koodikanta lukuina

| Alue | Tiedostoja | Rivejä | Huomio |
|---|---|---|---|
| js/ui.js | 1 | 19 167 | 41 % kaikesta js/-juuren koodista |
| js/ muut | 32 | ~28 000 | suurimmat: pollo 3 098, mapart 3 033, game 2 513, lukija 1 750 |
| js/packs/ | 90 | 131 882 | sisältödataa — jo moduulimaista |
| js/linssit/ | 11 | ~11 000 | paras nykyinen moduuliesimerkki (rekisteri + sopimus) |
| css | 4 | 16 760 | styles.css 14 143; radio.css laiskasti ladattava ennakkotapaus |
| tyohuone.html | 1 | 1 733 | sisältää ~1 515 rivin inline-sovelluksen |
| testit | 34 | — | 739 testiä; osa lukee ui.js:ää TEKSTINÄ (ks. 2.4) |

### 2.2 ui.js:n sisäinen rakenne

Tiedosto on kaksiosainen: **moduulitaso** (rivit 1–2245) ja yksi
**UI-luokka** (2246–19167, ~379 metodia, ei alaluokkia).

Moduulitaso: tuonnit (1–103 ja toinen lohko 677–750), lautojen
sisältötaulujen yhdistely (104–256), wiki-välimuistit (257–308),
luentajoukot eli tieto generoiduista äänitteistä (309–621),
galleriataulut (622–676), ajoitus- ja zoomivakiot (752–1600) sekä
puhtaat apufunktiot ja ikonikirjasto (1611–2245). Tämä puolisko on
lähes kokonaan dataa ja puhtaita funktioita — ei this-riippuvuutta.

UI-luokan päärypäät (rivialue, ~koko):

| Rypäs | Rivit | ~riviä |
|---|---|---|
| rakennin: ~146 getElementById + kuuntelijat | 2247–2952 | 706 |
| näkymän mittaus, iOS-elvytykset | 2965–3375 | 410 |
| viewbox, zoom, panorointi, rasterointi | 3642–6128 | 2 500 |
| laudan piirto (drawBoard ym.) | 6432–7320 | 890 |
| vuoropalkki, toimintorivi, matkustusvalinta | 7321–8015 | 700 |
| päiväkirjakortti + äänimaisema | 8016–8887 | 870 |
| saapuminen, esilataus, lehtikoneisto, sää, uutiset | 8888–11670 | 2 800 |
| maalehti (etusivu, numerot, sisällys) | 11671–12156 | 490 |
| kohdekartta, Matkailijalle, liput, karttazoom | 12157–13213 | 1 060 |
| nähtävyysjutut | 13214–13787 | 570 |
| Matkailijan opas (opas 2.x) | 13788–14295 | 510 |
| minitehtävä, galleriat, wiki-artikkeli, lightbox | 14296–15041 | 750 |
| intro, aloitusportti, periaatteet, palaute | 15042–15523 | 480 |
| ääni ja luenta (kertoja, häivytykset) | 15524–15949 | 430 |
| matkalaukku, passi, lähteet | 16119–16436 | 320 |
| radio (ohut kääre) + vertailutila | 16438–16875 | 440 |
| linssit-UI | 16876–17334 | 460 |
| visa, kohtaamiset, kaksintaistelu, tiimalasi | 17410–18129 | 720 |
| aarteen paljastus | 18130–18358 | 230 |
| toiminnot ja animaatiot (run/doAction, lento, botti) | 18359–19167 | 810 |

Kytkentävoimat mitattuina: `this.game` 156 osumaa (kaikkialla),
arrival*-perhe 322 (lehtikoneisto), quiz* 127, taide* 122 (kapea
alue — hyvä), fact* 112, wiki* 104, linssi* 99, tutki* 91.
Löyhimmin kytketyt eli turvallisimmat irrottaa: moduulitason data
ja apurit, Matkailijan opas (ei kosketa this.game/this.svg:hen),
liput (oma dialog), karttazoom-widget (parametrivetoinen),
vertailutila, postikortti, pikkuseloste, palaute. Tiukimmin:
zoom/pan/rasterointi, drawBoard, lehtikoneisto, renderQuiz/render
ja run/doAction-ydin.

Työnjako tiedostojen kesken on jo terve: `game.js` omistaa
pelitilan eikä tunne ui.js:ää; `main.js` käynnistää, tallentaa ja
piirtää päävalikot; `ui.js` piirtää ja välittää syötteet
run/doAction-portin kautta. Ongelma ei ole arkkitehtuuri vaan
ui.js:n koko: kaikki pelin PINNAT asuvat samassa tiedostossa.

### 2.3 css/styles.css

Selkeät osiot kommenttiotsikoin, mutta aiheet pirstoutuneet:
lehtitaitto ~1 210 riviä (8259–9468) JA sivuparannukset ~1 340
(9921–11264) JA sisällysluettelo ym. hajallaan; kartta ~1 460
(3295–4758); pöllö 862 (13171–14032); opas 198 + kainalotaulu 232 +
vuosikäyrä 283. Kaskadijärjestys on merkitsevä ja on jo purrut:
opas 2.1:n lämmin paperi ei ollut koskaan voimassa, koska
`.dialog.arkki .dialog-card` voitti tarkkuudella (korjattu v783);
PIKKUSELOSTE on tarkoituksella tiedoston lopussa kaskadisyistä
(rivi 12937). Johtopäätös: CSS:ää ei saa jakaa RYHMITTELEMÄLLÄ
UUDELLEEN vaan viipaloimalla järjestys säilyttäen (luku 6).

### 2.4 Jakelun ja testien reunaehdot (sitovat siirroille)

1. **Yhden tiedoston build** (tools/build-standalone.mjs): käsin
   ylläpidetty 120 tiedoston MODULES-lista riippuvuusjärjestyksessä;
   import/export-rivit poistetaan regexillä ja KAIKKI tiedostot
   jakavat saman globaalin näkyvyysalueen. Seuraukset: (a) top-level
   -nimet eivät saa törmätä yli tiedostorajojen (17 törmäystä on jo
   purettu käsin nimeämällä), (b) tuonneissa ei aliaksia, (c) jos
   tiedoston moduulitason koodi lukee toisen vientejä, järjestys
   listalla ratkaisee — virhe näkyy vasta selaimessa, (d) buildia
   EI ajeta CI:ssä, joten listavirhe ei näy PR:ssä.
2. **sw.js SHELL**: jokainen js/-, js/packs/- ja js/linssit/-
   moduuli on listattava (tests/sw.test.mjs valvoo). Jokainen uusi
   tiedosto = rivi SHELLiin.
3. **Testit lukevat ui.js:ää tekstinä**: vähintään
   tests/rules.test.mjs (13 kohtaa), tests/aanitasot.test.mjs (2),
   tests/maa-otsikot.test.mjs, tests/lento-ajoitus.test.mjs
   readFileSync+regex-hakevat metodeja ui.js:stä. Jokaisen siirron
   PR päivittää myös näiden polut — muuten testit valehtelevat
   vihreää tai punaista.
4. **Versiokytkös**: js/main.js APP_VERSION + sw.js CACHE +
   js/muutokset.js kärki päivittyvät VAIN tools/uusi-versio.mjs
   -työkalulla; APP_VERSION-rivin muoto ei saa muuttua jaossa.
5. **Dynaamiset tuonnit** ovat sallittu keino pitää moduuli poissa
   standalonesta (linssit, maakayrat) — valmis rajapintamalli.

## 3. Ehdotettu moduulijako

Kaksitoista moduulia. "Koodi" = mihin tiedostoihin moduulin koodi
kootaan (kohdetila; suluissa uusi tiedosto). "Raja­pinnat" = mitä
muut saavat kutsua/lukea. Data virtaa aina packs → moduuli → DOM;
pelitila virtaa game → UI-pinnat → run/doAction → game.

1. **Ydin** — pelitila, säännöt, vuorot, talous, botit, laattapino.
   Koodi: game.js, rules.js, ai.js, die.js, tokens.js, pack.js,
   passport.js sekä ui.js:ään jäävä run/doAction-portti,
   vuoropalkki ja toimintorivi. Data: packs/<lauta>.js-geometriat.
   Rajapinta: Game-luokan action*-metodit ja tapahtumajono
   (emit/takeEvents); vakiot (hinnat). Ydin ei tunne pintoja.
2. **Kartta** — laudan piirto, kamera (zoom/pan), rasterointi,
   maasto, alkuanimaatio. Koodi: mapart.js, (js/kartta.js ←
   ui.js:n piirto- ja kamerarypäät), maakartat-työkalujen tulokset.
   Data: maailmankartta-*.js, maasto-*.js. Rajapinta: piirrä lauta,
   keskitä/zoomaa pisteeseen, ruutu↔koordinaatti-muunnokset.
3. **Linssit** — karttakerrokset ja niiden moottori (nykyinen
   malli, ei muutoksia). Koodi: js/linssit/*. Data:
   packs/linssi-*.js. Rajapinta: linssisopimus (LINSSI-vakio,
   lataa/piirra/selite) + rekisteri; radio erikoislinssinä
   (radiosoitin, viritin, css/radio.css). ui.js:n linssit-UI
   (~460 r) siirtyy aikanaan js/linssit/valikko.js:ään.
4. **Tarinakaari** — matkakirjan imu: saapumiset, kohtaamiset,
   aarretekstit, luennat, aarteen paljastus. Koodi: (js/kaari.js ←
   renderFact, openArrival-kaariosat, playDiaryVoice,
   playTokenReveal), luentajoukot. Data: packs/tarinakaari.js,
   kohtaamiset.js, henkilot.js, *-saapumiset.js, miniatyyrit.js
   (kohtaamiskasvot). Rajapinta: "näytä kaupungin kaari" +
   luentapolku (Äänet-moduulin kautta). Sisältöohje:
   docs/moduulit/tarinakaari.md (nyk. kaariteksti-sapluuna.md).
5. **Kätköpelit** — visa, isoisän väittämä ja pulmat, valokuva- ja
   lippukysymykset, kaksintaistelu, tiimalasi. Koodi: (js/visa.js ←
   renderQuiz/renderDuel/ajastin ~720 r + drawPuzzle-reititys).
   Data: packs/*-questions.js, *-puzzles.js, *-valokuvat.js
   (kysymyskuvat). Rajapinta: "käynnistä kaupungin tehtävä" +
   vastaus Ytimen action-kutsuina.
6. **Kaupunkilehti** — paikallislehti: taitto, kansi, sivupino,
   kuvataitto, sää, uutiset, tv/radio-rivi, minitehtävät. Koodi:
   (js/lehti.js ← lehtikoneisto ~2 800 r), saa.js, uutiset.js,
   wiki.js (Lue lisää -artikkelit — jaettu palvelu, omistaja tämä
   moduuli). Data: kulttuuri-kategoriat.js, saatiedot.js,
   uutislahteet.js, radiot.js, omat-tiivistelmat.js. Rajapinta:
   avaa lehti / sivu; esipuskurointisopimus (CONTRIBUTING).
   Ohje: docs/moduulit/kaupunkilehti.md.
7. **Maalehti ja liput** — maan lehti: aihesivut, Maa numeroina,
   maakartta­sivu, sisällys, vertailutila, lippusivut. Koodi:
   (js/maalehti.js ← avaaMaalehti, piirraMaaEtusivu, numerot,
   sisällys, vertailu ~900 r; js/liput.js ← avaaLippuikkuna 185 r),
   maakayrat.js. Data: maa-kategoriat.js, maakartat.js,
   *-artikkelit.js, *-maatiedot.js, lipputiedot.js,
   lippu-tekijat.js, liput-paikalliset.js, assets/data/
   maakayrat.json. Ohje: docs/moduulit/maalehti.md.
8. **Matkailijan opas** — lehden viihteellinen osa (opas 2.x).
   Koodi: (js/opas.js ← taitaOpas + opas* ~510 r). Data:
   kulttuuri-kategoriat.js:n matkailijalle- ja matkailu-kentät,
   SAATIEDOT (graafi lainataan lehdestä — pysyy yhteisenä).
   Ohje: docs/moduulit/opas.md; kuvakaava Raamatussa.
9. **Nähtävyydet ja kohdekartta** — kaupungin värikartta
   piirroskohteineen, nähtävyysjutut, karttazoom-widget. Koodi:
   (js/nahtavyydet.js ← piirraKaupunkiKartta, avaaNahtavyys ym.
   ~1 630 r; kytkeKarttaZoom yleiswidgetiksi). Data:
   nahtavyysjutut.js, miniatyyrit.js, satelliitti-/värikartat
   assetteina. Ohje: docs/moduulit/nahtavyydet.md.
10. **Äänet ja lukija** — tehosteet, äänimaisemat, kertojaluennat,
    laiteääni (lukija), puheentunnistus... eli kaikki kuuluva.
    Koodi: sound.js, ambience-stream.js, aani-ehdokkaat.js,
    puhe.js, puhe-oletukset.js, lukija.js, (js/luenta.js ←
    ui.js:n luenta-alue ~600 r). Data: packs/viritysaanet.js,
    R2-äänet. Rajapinta: soita/lopeta luenta, väistösääntö
    (puhe väistää taustaa), LUFS-mittausportti. Ohje:
    docs/moduulit/aanet.md.
11. **Viisas Pöllö** — chat-apuri. Koodi: pollo.js, pollo-haku.js.
    Data: packs/pollo-asetukset.js. Palvelin: tools/pollo +
    tools/uutisproxy (workerit). Rajapinta: ankkurointi
    (polloAnkkuri) ja vihjeet — jo nyt siisti neljän kutsun pinta.
12. **Alusta, jakelu ja työhuone** — käynnistys, tallennus,
    valikot, versiot, peili, offline-kuori, iOS-kuori sekä
    kehittäjän työhuone. Koodi: main.js, natiivi.js, media.js,
    sw.js, tools/build-standalone.mjs, tools/uusi-versio.mjs,
    tyohuone.html + tyohuone-*.js (inline-sovellus aikanaan omaksi
    js/tyohuone-app.js:ksi). Jaetut tiedostot dokumentoitu:
    tyohuone-raamattu.js ja -tilanne.js luetaan pelissä
    (kehittäjän liitteet), tyohuone-kehitys-data.js
    tarinakaaresta. Ohjeet: docs/moduulit/tyohuone.md ja
    docs/moduulit/jakelu.md.

Rajapintasäännöt (linssisopimuksen malliin, testattaviksi):

- Data­paketit eivät tuo mitään — ne ovat lehtiä puussa.
- Pinnat (4–9) eivät tuo toisiaan; yhteiset palvelut (Kartta,
  Äänet, wiki.js, media.js) ovat sallittuja tuonteja.
- Ydin ei tuo pintoja; pinnat kutsuvat Ydintä vain
  run/doAction-portin kautta.
- Laiska raja (dynaaminen import) aina, kun moduulin ei kuulu
  standaloneen tai sen lataus voi odottaa (linssit, maakäyrät —
  nykymalli).

## 4. ui.js:n jakosuunnitelma

Kohdetila: ui.js kutistuu UI-rungoksi (~5 000–6 000 riviä):
rakennin, render, run/doAction, laudan piirron ja kameran kutsut,
vuoro- ja toimintorivi — eli Ytimen ja Kartan UI. Muut pinnat
siirtyvät luvun 3 tiedostoihin. Yksikään uusi tiedosto ei saa
ylittää ~2 500 riviä ilman erillistä perustelua.

Kaksi siirtomallia:

- **Malli A — moduulitason koodi** (data, vakiot, puhtaat
  funktiot): siirto sellaisenaan uuteen tiedostoon; ui.js tuo
  tarvitsemansa. Ei käytösmuutosta, diffi = leikkaa-liimaa.
- **Malli B — luokkametodi**: metodi siirtyy moduulifunktioksi,
  jonka ensimmäinen parametri on ui-olio (`opasJakso(ui, …)`).
  Kutsupaikat päivitetään suoraan, kun niitä on ≤3; muuten UI:hin
  jää yhden rivin delegointimetodi. Funktiot käyttävät ui:n
  julkisia metodeja (openWikiArticle, run) — this-kenttien suora
  kirjoitus siirretyistä funktioista kielletään katselmoinnissa.

Nimisäännöt (standalone-yhteisscope): uuden tiedoston top-level
-nimet alkavat moduulisanalla (opas*, lippu*, lehti*, kaari*),
elleivät jo ole yksilöllisiä; törmäykset valvotaan uudella
työkalulla (M0). Tuonteihin ei aliaksia.

## 5. Siirtymäpolku (pienin turvallinen askel kerrallaan)

Jokainen vaihe on oma PR versionostoineen, ja jokaisen portit:
`node --test tests/*.test.mjs` (LUETAAN "# pass"/"# fail"),
`node tools/tarkista-kaksoisavaimet.mjs`,
`node tools/build-standalone.mjs` + `node tools/savuke-dist.mjs`
(koottu versio oikeasti selaimessa), Playwright-kaappaukset ja
niiden katsominen, sekä tekstiä lukevien testien polkupäivitys
samassa PR:ssä. Siirtovaiheissa EI muuteta käytöstä — puhdas
siirto, jonka voi todentaa diffistä.

| Vaihe | Sisältö | Malli | Riski |
|---|---|---|---|
| M0 | Työkalut ennen siirtoja: (a) uusi tools/tarkista-niputus.mjs — havaitsee MODULES-listan tiedostojen top-level-nimitörmäykset ja puuttuvat listaukset; (b) testit.yml ajaa myös build-standalonen; (c) siirrettävien exporttien tuojakartoitus | — | pieni |
| M1 | Sisältötaulut ja luentajoukot irti (ui.js 104–676 → js/sisaltotaulut.js): puhdasta dataa | A | pieni |
| M2 | Apurit, ikonit ja kehysmatematiikka irti (1293–1390, 1611–2245 → js/ui-apurit.js) — testien tuonnit päivittyvät | A | pieni |
| M3 | PILOTTI mallille B: liput (js/liput.js), vertailutila (js/vertailu.js) ja kytkeKarttaZoom yleiswidgetiksi. Todistaa metodinsiirron työtavan pienillä, ei-kuumilla alueilla | B | keski |
| M4 | Opas (js/opas.js) ja nähtävyydet (js/nahtavyydet.js) — VASTA kun sisältöpaketit O4–O7 ovat mainissa; ajoitus päätoimittajalta | B | keski |
| M5 | Lehtikoneisto (js/lehti.js + js/maalehti.js): arrival*/tutki*-tila kootaan yhdeksi lehtitila-olioksi. Suurin askel; jaetaan 2–3 PR:ään (sivupino ja rakennus · kuvataitto+sää+uutiset · maalehti+sisällys) | B | suuri |
| M6 | Visa (js/visa.js) ja luenta (js/luenta.js) | B | keski |
| M7 | Kartta (js/kartta.js): zoom/pan/rasterointi/piirto omaksi Kartta-luokaksi, jolle UI delegoi. Vaativin — tehdään viimeisenä, JOS omistaja katsoo hyödyn riskin arvoiseksi; vaihtoehto on jättää kamera ui.js-runkoon | B | suuri |

Järjestyksen logiikka: ensin askeleet, joissa ei ole
käytösriskiä (M1–M2), sitten työtavan pilotti alueilla, joita
kukaan ei juuri nyt muokkaa (M3), sitten kuumat sisältöpinnat
pakettien välissä (M4–M5) ja raskain viimeisenä (M7). iOS:n
näkymänmittausrypästä (2965–3375) EI siirretä vaiheissa M1–M6 —
se on herkin alue ja sen siirto vaatisi omistajan laitetestin.

## 6. css/styles.css:n jako

Vaihe C1 (aikaisintaan M3:n jälkeen): **viipalejako järjestys
säilyttäen**. styles.css leikataan osiorajoja pitkin tiedostoiksi
(esim. 01-kehys.css, 02-kortit.css, 03-kartta.css, 04-visa.css,
05-lehti.css, 06-maalehti.css, 07-kohdekartta.css, 08-opas.css,
09-pollo.css, 10-loppu.css), jotka index.html linkittää TÄSMÄLLEEN
alkuperäisessä järjestyksessä. Aiheita EI ryhmitellä uudelleen —
kaskadi ei saa muuttua. Todennus: tarkistustyökalu, joka
konkatenoi uudet tiedostot ja vertaa alkuperäiseen tavu tavulta;
lisäksi build-standalone ja sw.js päivittyvät samassa PR:ssä.

Vaihe C2 (myöhemmin, oma päätös): hajallaan olevien aiheiden
(lehti kolmessa paikassa) konsolidointi — vain
kuvakaappausvertailuin ja tarkkuusauditilla, pieninä erinä.
Uusien laiskojen toimintojen tyylit omiin tiedostoihinsa
radio.css:n malliin (soitin liittää linkin itse).

## 7. Riskit ja vastatoimet

1. **Standalonen nimitörmäys tai järjestysvirhe** — näkyy vasta
   selaimessa. Vastatoimi: M0:n tarkistin + savuke-dist joka
   vaiheen portteihin + build CI:hin.
2. **Tekstiä lukevat testit** osoittavat vanhaan tiedostoon.
   Vastatoimi: tuojakartoitus M0:ssa; polkupäivitys samassa
   PR:ssä; testin on hajottava jos kohde puuttuu (ei hiljaista
   ohitusta — talon sääntö).
3. **Rinnakkainen sisältötyö samoihin riveihin** (opas/nähtävyydet
   O4–O7). Vastatoimi: M4–M5 ajoitetaan päätoimittajan kanssa
   pakettien väliin; M1–M3 eivät kosketa kuumia alueita.
4. **iOS-regressiot** (viewport, WKWebView). Vastatoimi:
   näkymänmittaus ei liiku M1–M6:ssa; jokaisen vaiheen kaappaukset
   myös kapealla näkymällä; omistajan laitetesti M5:n ja M7:n
   jälkeen.
5. **Käytös muuttuu siirrossa vahingossa.** Vastatoimi: siirto­
   PR:issä nollatoleranssi toimintamuutoksille; katselmointi
   vertaa poistettua ja lisättyä lohkoa; savukkeet + kaappaukset.
6. **Versiokurin lipsuminen** monen PR:n sarjassa. Vastatoimi:
   uusi-versio.mjs joka PR:ssä viimeisenä; muutoslokirivi ≤60 mrk;
   haara nollataan mainiin jokaisen mergen jälkeen.
7. **Puolitiehen jäänyt remontti** on huonompi kuin tekemätön.
   Vastatoimi: jokainen vaihe jättää pelin ehjäksi ja arvokkaaksi
   itsenään; välitilassa ui.js on vain pienempi — ei koskaan
   kahta rinnakkaista totuutta samalle asialle.

## 8. Ehdotus Raamattuun (kirjataan vasta hyväksynnän jälkeen)

Uusi osio "Moduulit" (linjaustaso, ~14 riviä): pelin kaksitoista
moduulia yhden rivin vastuineen ja kolme rajapintasääntöä (data ei
tuo mitään; pinnat eivät tuo toisiaan; Ydin ei tunne pintoja).
Tekninen sisältö (tiedostolistat, siirtomallit) EI kuulu
Raamattuun vaan docs/moduulit/-ohjeisiin. Muotoiluehdotus on
valmiina; kirjaan sen Raamattuun ja karttaan, kun omistaja on
hyväksynyt jaon — isot Raamattu-muutokset koordinoidaan
päätoimittajan kanssa ennen mergeä.

## 9. Mittarit ja hyväksymiskriteerit

- ui.js ≤ ~6 000 riviä M6:n jälkeen; yksikään uusi tiedosto ei
  ylitä ~2 500 riviä ilman perustelua.
- Joka vaiheen jälkeen: testit vihreät luettuina, standalone
  kokoontuu JA toimii selaimessa, kaappaukset katsottu, ei
  käytösmuutoksia.
- Moduuliohjeet syntyvät toteutuksen tahdissa (dokumenttiremontin
  D-vaiheet): kun moduulin koodi irtoaa, sen ohje kirjoitetaan
  samassa yhteydessä.

## 10. Omistajan päätettävät

1. Hyväksytäänkö 12 moduulin jako (luku 3) ja ui.js:n kohdetila
   (luku 4)?
2. M7 (Kartta-luokka): tehdäänkö raskain vaihe vai jätetäänkö
   kamera ui.js-runkoon? Esitykseni: päätetään vasta M5:n
   kokemuksella — M1–M6 ovat arvokkaita ilman M7:ääkin.
3. Ajoitus: M0–M3 voidaan aloittaa heti hyväksynnän jälkeen;
   M4–M5 sisältöpakettien väliin päätoimittajan tahdissa. Sopiiko?
4. CSS-jaon C1 aloitus M3:n jälkeen (esitys) vai aikaisemmin?
