# AGENTS.md — agentin ensimmäinen päivä

Tämä tiedosto on tiivis sisääntulo agentille, joka aloittaa työn
Matkakirja-repossa. Se ei ole uusi säännöstö: kaikki alla oleva on
koottu tiedostoista `CLAUDE.md`, `docs/roolitus.md`, `CONTRIBUTING.md`,
`js/tyohuone-raamattu.js` (Raamattu) ja `tools/parvi/agentin-yhteiset-saannot.md`.
Ristiriitatilanteessa **Raamattu voittaa**, ja kaanonia (tarina) koskevissa
asioissa `docs/tarina.md` ja `docs/isoisan-raamattu.md`.

## Agenttimallien sääntö (sitova)

**Claude-agentit ajetaan vain Opuksella tai Sonnetilla.** Fable-mallia ei
käytetä agenttina lainkaan (omistajan sääntö 1.9. ja 7.9.2026; Fablemax-
agenttityyppi on poistettu). Parvina saa ajaa. Työnjako: Opus koodiin ja
sisältöön, Sonnet lukevaan työhön ja tarkistuksiin.

Sääntö koskee Clauden agentteja. ChatGPT/Codex-sessio saa käyttää Solia,
Terraa ja Lunaa (omistajan täsmennys 11.9.2026).

## Mikä projekti on

**Matkakirja ja unohdettu aarre** — suomenkielinen selainpohjainen
seikkailupeli, jossa nuori Fogg seuraa isoisänsä vuoden 1873
matkapäiväkirjaa ja etsii Aarnin luettelon unohdettuja aarteita.
Samalla oppii maailmasta.

- **Kohderyhmä on 13 vuotta täyttäneet ja aikuiset — tämä ei ole
  lastenpeli.** Vaikeita aiheita ei kaunistella eikä kauhistella.
- **Ei build-vaihetta.** Peli on ES-moduuleja, jotka selain lataa
  sellaisenaan, plus service worker (`sw.js`). Yhden tiedoston versio
  kootaan vasta Pages-julkaisussa.
- **Ei riippuvuuksia pelin puolella.** `package.json`:n riippuvuudet
  (playwright, sharp) ovat vain työkaluja ja testejä varten.

## Lue ensin

| Tiedosto | Mitä siellä on |
| --- | --- |
| `CLAUDE.md` | sisääntulo, osoittaa muualle |
| `js/tyohuone-raamattu.js` (**Raamattu**) | pelin idea ja kaikki oleelliset linjaukset yhdessä paketissa; viimeinen osio on täydellinen kartta muihin ohjedokumentteihin |
| `docs/roolitus.md` | työnjako kolmen session kesken, viestintä, julkaisusäännöt |
| `CONTRIBUTING.md` | kysymysten, lautojen ja linssien lisääminen, tekniset periaatteet |
| `docs/tarina.md`, `docs/isoisan-raamattu.md` | tarinan kaanon, sitova kaikessa sisällössä |
| `tools/parvi/agentin-yhteiset-saannot.md` | parviagentin työtapa ja portit |
| `docs/moduulit/` | moduulikohtaiset reseptit (lehdet, linssit, tarinakaari, pallolauta, äänet…) |

Dokumenttia, jota ei ole Raamatun kartalla, ei ole olemassa ohjeena.
`tests/dokumentit.test.mjs` valvoo tätä koneellisesti: uusi
`docs/*.md`- tai `docs/moduulit/*.md`-tiedosto kaataa testin, ellei sitä
lisätä karttaan (kartan kirjoittaa Fable) tai arkistoida.

`docs/arkisto/` sisältää vanhentuneita suunnitelmia ja kertaraportteja.
**Älä lue sieltä ohjeita.**

## Hakemistorakenne

```
index.html            pelin sisääntulo
sw.js                 service worker; SHELL-lista kaikista js-moduuleista
manifest.webmanifest  PWA-manifesti
js/                   pelin moduulit (~150 tiedostoa)
  packs/              karttapaketit: laudat, kysymykset, projisoidut aineistot
  linssit/            linssimoduulit (yksi LINSSI-vakio per tiedosto) + rekisteri.js
  pallolauta/         karttapallon moduulit
css/                  tyylit
assets/               kuvat, kartat, liput, data (ei äänitiedostoja — ne ovat ämpärissä)
tests/                node:test -testit, yksi tiedosto per aihe
tools/                työkalut (hae-*, generoi-*, tee-*, tarkista-*)
  parvi/              parviagenttien ohjeet ja apuskriptit
  mapdata/            linssien asteaineistot (lon/lat) — eivät kuulu offline-pakettiin
  savukkeet/          savuketestien sarjat
docs/                 ohjeet, kaanon, moduulireseptit, raportit, arkisto
worker/               Cloudflare-workerit (ehdotukset, sähke)
ios/                  iOS-kuori (XcodeGen, ks. ios/OHJE.md)
posti/                git-postilaatikko sessioiden väliseen viestintään
.github/workflows/    CI ja generointityönkulut
```

## Asennus ja ajaminen

```bash
npm install                # vain työkalut ja testit; peli ei tarvitse mitään
npm start                  # python3 -m http.server 8000 → http://localhost:8000
```

Konttiympäristössä Noden `fetch` tarvitsee ympäristömuuttujan
`NODE_USE_ENV_PROXY=1`. Chromium on polussa `/opt/pw-browsers/chromium`.

## Testit ja portit

```bash
npm test                              # node --test "tests/*.test.mjs"
```

**Lue `# pass`- ja `# fail` -rivit itse**, älä katkaistua häntää.

Portit, joiden pitää mennä läpi ennen committia:

```bash
node --test tests/*.test.mjs
node tools/tarkista-kaksoisavaimet.mjs
node tools/tarkista-niputus.mjs
node tools/tarkista-savukkeet.mjs
node tools/tarkista-nimiolimitys.mjs
```

Jos muutit karttamerkkejä, lisäksi:

```bash
node tools/tarkista-nostopaikat.mjs
node tools/tarkista-karttapisteet.mjs
```

Ennen pull requestia myös:

```bash
node tools/build-standalone.mjs   # yhden tiedoston versio kokoontuu virheittä
node tools/source-report.mjs      # lähteiden kattavuus
```

CI ajaa samat portit (`.github/workflows/testit.yml`), ja PR:n
Testit-tarkistuksen on oltava vihreä ennen mergeä. Savukkeet ajetaan
PR:n Savukkeet-työnkulussa.

## Koodityyli ja kielivalinnat

- **Kaikki suomeksi:** kommentit, dokumentaatio, commit-viestit, PR-kuvaukset
  ja pelaajalle näkyvä teksti. Uudet tunnisteet ja tiedostonimet ovat
  suomeksi (`linssit/`, `tarkista-*.mjs`, `fokusvirta.js`); vanhoissa
  moduuleissa on englanninkielisiä nimiä, eikä niitä nimetä uudelleen
  ohimennen.
- **ES-moduulit**, ei bundleria, ei transpilointia. Selain lataa
  tiedostot sellaisenaan.
- **Kommentti kertoo miksi, ei mitä.** Repon tapa on kirjoittaa
  moduulin alkuun kappale, joka selittää tarkoituksen ja tehdyt
  ratkaisut — katso malliksi `js/die.js`.
- Sisennys kahdella välilyönnillä, yksinkertaiset lainausmerkit,
  puolipisteet. Erillistä linteriä tai formatteria ei ole.
- **Faktakuri:** jokainen pelin väittämä on tarkistettavissa. Kysymyksiin,
  kaksintaisteluihin ja paikkatietoihin merkitään `source`. Hae raakateksti
  rajapinnasta, älä arvaa muistista. Väärä fakta on pahempi kuin puuttuva.
- **Kuvat ja media vain PD/CC**, lisenssi ja tekijä tarkistettuina
  Commonsin rajapinnasta. Kuvaton on parempi kuin tarkistamaton.
  Älä generoi kuvia itse — kuvaputki tekee ne tilauksesta; kirjaa
  raporttiin, mitkä kohteet tarvitsevat kuvan.
- Wikimedian rajapinnoille User-Agent on
  `Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`. Omistajan
  sähköpostiosoitetta ei panna mihinkään.
- Linsseissä on omat tiukat rajoituksensa (ei SVG-suodattimia, ei
  `class`- tai `id`-attribuutteja, ei ajastimia, peittävyys enintään
  0,72) — ks. `CONTRIBUTING.md` ja `docs/moduulit/linssit.md`.

## Kielletyt tiedostot ja teot

Näihin agentti **ei koske**:

- `js/tyohuone-raamattu.js` — Raamattu, vain Fable kirjoittaa
- `js/tyohuone-tilanne.js` — työhuoneen tilannetaulu, vain Fable
- `docs/tarina.md`, `docs/isoisan-raamattu.md` — kaanon, vain Fable
- `dist/` — yhden tiedoston versio rakennetaan julkaisussa, ei committoida
  (on `.gitignore`ssa; historia paisuisi)
- `sw.js`:n `CACHE`-rivi — version nostaa yksi tekijä kerran
  (`node tools/uusi-versio.mjs`), muuten yhtaikaiset nostot rikkovat testin

Lisäksi:

- **Salaisuuksia ei koskaan repoon eikä lokiin.** Ei API-avaimia missään muodossa.
- Äänitiedostot eivät ole repossa (omistajan linjaus 11.9.2026) — varasto
  on ämpäri, repo vain työpöytä.
- `git add -A` on kielletty: lisää vain muuttamasi tiedostot.
- `git stash` on kielletty.
- **Trigger-työkaluja ei käytetä** (`create_trigger`, `fire_trigger`) —
  ne jumittavat session ja tuottavat omistajalle lupakyselyn.
- Työsessio ei päätä vuoroaan avoimeen kysymykseen eikä hyväksynnän
  odotukseen. Esteet kirjataan raporttiin.

## Git-käytännöt

- **Työskentele omassa haarassa**, origin/mainin päällä. Älä koske mainiin
  suoraan äläkä toisen session haaraan.
- **Yksi looginen kokonaisuus per PR**, squash-merge.
- **Commit-viesti suomeksi**, otsikko alle 60 merkkiä ja ASCII.
  Julkaisevan commitin otsikkoon `(vNNN)` ja PR-numero.
- **Versionosto työkalulla, ei käsin:**
  `node tools/uusi-versio.mjs "Muutoslokirivi"`. Se fetchaa mainin ja
  valitsee seuraavan vapaan numeron atomisesti. Aja se viimeisenä ennen
  buildia; jos merge viivästyy ja main ehtii liikkua, aja uudelleen.
  Aja `git fetch origin main` aina juuri ennen versionumeron valintaa —
  sessiot julkaisevat rinnakkain.
- **Pelkkä docs-muutos ei nosta versiota.**
- `js/main.js` **ei ole generoitu tiedosto.** Versiokonfliktissa siitä
  otetaan omasta haarasta vain `APP_VERSION`-rivi, muu sisältö mainista.
- Mergen jälkeen oma haara nollataan mainiin
  (`git checkout -B <haara> origin/main` + force-with-lease).
- **Pushaa vähintään 30 minuutin välein.** Pushaamaton työ katoaa kontin
  mukana — näin on käynyt.
- Parviagentti tekee täsmälleen yhden commitin työn lopuksi eikä pushaa
  tai avaa PR:ää itse, ellei toimeksianto niin sano;
  ks. `tools/parvi/agentin-yhteiset-saannot.md`.
- Scratchpad on yhteinen: tee omat apuskriptisi omaan alikansioosi.

## Loppuraportti

Agentin vastaus tehtävänantajalle sisältää: commitin SHA, muutetut
tiedostot, mitä tehtiin ja mitä jäi tekemättä ja miksi, testien tulos
sekä listan kuvaputkelle tilattavista kuvista (kohde, mitä kuvan pitää
esittää, yksi rivi per kohde). Suomeksi, tiivis.
