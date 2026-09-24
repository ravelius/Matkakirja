# Luovutus: Sisältökirjuri — 24.9.2026 (e), klo 14.50 EEST

Konteksti 71 %, Fablen käskystä luovutus ja nollaus. Edellinen luovutus:
`docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-c.md` (sää-vaihe
alkoi vasta tämän vuoron aikana — tämä on ensimmäinen kokonainen
raportti sen jälkeen). Tämä vuoro teki sisältöinventaarion (#3045) koko
kentän: sää KAIKILLE 71:lle, galleria- ja ennenNyt-tutkimuksen 46:lle
mergetylle N8–N16-kaupungille, ja aloitti kohdekartat.

## 1. Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`
2. Raamatun "TYÖTAPA JA SESSIOT" (kohta 2)
3. `docs/raportit/sisalto-inventaario-20260924.md` (PR #3045) — KOKO
   sisältöinventaarion tila, kohdat 1–7. Tämä raportti viittaa siihen
   toistuvasti, äläkä kopioi sen sisältöä tähän.
4. Tämä raportti kokonaan

## 2. Tila

`main = v2175`, SHA `083933d62`. Tämän vuoron julkaistut/avatut PR:t
(kaikki v2175, koska moni haara on avattu peräkkäin ilman mergeä
välissä — versionumero tuplautuu tarkoituksella, ks. kohta 8):

| PR | Sisältö | Tila |
|---|---|---|
| #3045 | Sisältöinventaario (raportti, päivitetty 3x tässä vuorossa) | Auki |
| #3047–#3050, #3052–#3053, #3056, #3058, #3060, #3062–#3065 | Sää: kaikki 71 uutta kaupunkia (14 erää) | Auki, kaikki testit 0 fail |
| #3066 | Galleria: Kap Horn + Norfolk | Auki |
| #3068 | Galleria: Karthago | Auki |
| #3069 | EnnenNyt: 35/46 kaupunkia | Auki |

**Sää-vaihe on TÄYSIN VALMIS** kaikille 71 kaupungille (14 PR:ää).
**Galleria-vaihe on VALMIS tutkimukselta** 46/46 mergetylle kaupungille
(3 sai gallerian). **EnnenNyt-vaihe on VALMIS** 46/46:lle (35 sai
parin). Yksityiskohdat, syyt ja kaupunkikohtaiset listat: inventaario
kohdat 2, 6, 7.

## 3. Pushatut mutta julkaisemattomat haarat

Kaikki yllä olevan taulukon haarat ovat pushattu ja PR auki — ei
katoavaa työtä. Lisäksi:

- **`sisalto-kohdekartta-pilotti-20260924`** (ei PR:ää vielä) — WIP.
  Sisältää `tools/piirra-kaupunkikartta.mjs`:n uuden `kalgoorlie`-rivin
  (rajaus tutkittu ja levennetty niin että Paddy Hannanin patsas JA
  Hannans North -kaivos mahtuvat samaan kuvaan). **Ei PNG:tä eikä
  KAUPUNKIKARTAT-riviä** — Overpass (molemmat peilit, overpass-api.de
  ja overpass.kumi.systems) antoi vain 504:iä koko loppuvuoron. Kohta
  5 kertoo, mistä jatketaan.

## 4. Kesken — tee nämä ensin

### 4.1 Kohdekartat (inventaario kohta 5.5) — KESKEN, aloita tästä

Putki TOIMII (validoitu ajamalla venetsia ja kalgoorlie uudelleen,
molemmat onnistuivat aiemmin tässä vuorossa) — `npm ci` on ajettu
tässä checkoutissa (`node_modules` on olemassa), ja Chromium löytyy
`~/Library/Caches/ms-playwright/chromium-1234/`. **Aja työkalu näin:**

```
export CHROMIUM="/Users/koodaus/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
node tools/piirra-kaupunkikartta.mjs kalgoorlie
```

Jos Overpass antaa 504:n toistuvasti (näin kävi koko loppuvuoron),
kokeile `OVERPASS_PALVELIMET=https://overpass.kumi.systems/api/interpreter`
edellä, tai yritä myöhemmin uudelleen — palvelin on ulkoinen ja
ruuhkautuu ajoittain, ei korjattavissa tästä päästä.

**Rajattu 12 kaupungin lista hyväksytty (Fable):** Kalgoorlie, Mount
Isa, Broome, Geraldton, Porto Velho, Santarém, João Pessoa, Macapá,
Cayenne, Kimberley, Gao, Al Kufra. Perustelu ja hylätty 18:n lista
inventaariossa kohta 5.5 — **HUOM: en ehtinyt kirjoittaa tätä
päätöstä inventaarioon, tee se ensimmäisenä.**

**Löydökset, jotka muuttavat mittakaavaa (KIRJAA INVENTAARIOON):**
- Kartta-tyyli vaatii oikean katuruudukon: Norfolk (~1700 as.)
  piirtyi tyhjäksi (yksi tie, muutama rakennus). Kalgoorlie (~30 000
  as.) piirtyi hyvin heti. **Siksi 12 kaupungin listalla vain
  >10-30 tuhannen asukkaan paikat.**
- **Kohteiden juttu: KÄYTÄ PLAIN `teksti`-KENTTÄÄ, EI `nosto:`-linkkiä**
  (Fable hyväksyi tämän kevyemmän tavan). `nosto:`-kenttä kytkeytyy
  koko pelin globaaliin "jokainen nosto jollain kartalla" -sääntöön
  (`tests/nostot-kartalla.test.mjs`, `tools/tarkista-nostopaikat.mjs`,
  `js/fokuskohteet.js`) tunnus- ja sanatarkka-tekstivertailulla — väärä
  käyttö voi rikkoa TOISTEN kaupunkien nostosijoitteluita. Plain
  `teksti` (`js/nahtavyydet.js` `avaaNahtavyys`, `piste.teksti`-
  fallback) ei koske tätä järjestelmää lainkaan — turvallinen.
- **Vain aidosti paikannettavat kohteet, väh. 2/kaupunki, muuten
  kartta jätetään tekemättä.** Kalgoorlien 6 nostosta vain 2 on
  paikannettavia (patsas, kaivos) — loput ovat teemallisia. Tämä
  malli toistuu todennäköisesti muillakin: N8–N16-kaupungit on
  kirjoitettu 5-6 teemanoston kaavalla, ei Venetsian/Rooman
  kymmenien nostojen syvyydellä.

**Kalgoorlien valmiit kohdekoordinaatit** (Nominatim-haettu,
tarkistettu): Paddy Hannanin patsas -30.7490175/121.4705657, Hannans
North -kaivos -30.7268005/121.4716290. Rajaus
`tools/piirra-kaupunkikartta.mjs`:ssä valmiina (kalgoorlie-rivi).

**Jatka näin:** 1) aja työkalu (ks. yllä), KATSO kuva, 2) kirjoita
`js/packs/maakartat.js` KAUPUNKIKARTAT-riville kalgoorlie: `polku`,
`lahde: '© OpenStreetMap-tekijät (ODbL)'`, `rajat` (työkalun
tulosteesta), `esittely`-kappale, `kohteet: [{nimi, lat, lon, teksti}]`
(teksti = lyhyt OMA muotoilu, EI sanatarkka kopio, pohjautuen
`js/packs/kulttuuri-kategoriat.js`:n kalgoorlie-lohkon nostoihin
"Isoisä käveli kullan yli tietämättään" ja "Kuiluista nousi
metripaksuinen kultasuoni"), 3) `node tools/tarkista-karttapisteet.mjs
kalgoorlie` (piste ei saa osua veteen), 4) `node --test tests/*.test.mjs`
(0 fail, ERITYISESTI `tests/nostot-kartalla.test.mjs` pysyy vihreänä),
5) versio+build+commit+PR, 6) toista loput 11 kaupungille samalla
kaavalla (bbox Nominatimista, render, katso, pisteet, testit, PR —
5 kaupunkia/erä Fablen ohjeen mukaan).

### 4.2 N2/N4/N5/N6:n 20 kaupunkia — odottaa mergeä

Näiden PR:t (#2996, #3002, #3004, #3006) ovat AUKI (Julkaisijan
jonossa). Kun ne mergetään: tee niille SAMA kolmen vaiheen käsittely
(sää, galleria-tutkimus, ennenNyt-tutkimus) kuin N8–N16:lle. Menetelmä
on nyt tunnettu ja nopea (ks. inventaario kohdat 2, 6, 7) — käytä
samaa `tools/hae-saaperusdata.mjs`-työkalua säälle, ja tarkista
ensin `js/packs/*-valokuvat.js` ennenNyt-pareille ennen Commons-hakua.

### 4.3 Turistiopas (inventaario kohta 5.4) — TOISTAISEKSI OHITETTU

Ei data-poiminta, vaatii kokonaisen "Matkailijan X" -artikkelin
(Wikivoyage-pohjalta, lehtimallin mukaan, ks. `docs/moduulit/
kaupunkilehti.md` Lontoo-esimerkki). Fable hyväksyi ohituksen
toistaiseksi. **Merkitse inventaarioon, mitkä 71:stä ylipäätään
sopivat konseptiin** (ei asumattomia saaria — sanambrosio — eikä
konfliktialueita — darfur/el fasher on yhä sodassa) ennen kuin
aloitat — tätä en ehtinyt tehdä.

### 4.4 Churchill-nosto (Arktinen merijää) — odottaa

Vanha velka edellisestä luovutuksesta. PR #3016 (N9, Churchill) ON
NYT mergetty — tarkista `gh pr view 3016 --json mergedAt` varmuuden
vuoksi, ja lisää Churchilliin Arktinen merijää -nosto samalla kaavalla
kuin Nuuk/Nome (PR #3036/#3026), kolmannella eri Commons-kuvalla
samasta NASA SVS -sarjasta ainutkertaisuuden vuoksi.

## 5. Odottaa omistajan päätöstä

Ei omistajalle asti nousseita kysymyksiä — kaikki tämän vuoron
päätökset (galleria-yield, ennenNyt-menetelmä, turistioppaan ohitus,
kohdekartta-rajaus ja -tekniikka) on käsitelty Fablen kanssa suoraan
ja kirjattu inventaarioon.

## 6. Voimassa olevat työtavat

Ei muutoksia perussääntöihin — ks. Raamatun "TYÖTAPA JA SESSIOT".
**Tässä vuorossa opittua/vahvistettua** (ei uusia pysyviä sääntöjä,
vain toimintatapoja tälle sisältöinventaariolle):

- Yksi haara per erä, `origin/main`-pohjainen, PR per erä — paitsi
  kohdekartta-työ, joka jatkuu samalla `sisalto-kohdekartta-
  pilotti-20260924`-haaralla kunnes ensimmäinen kaupunki on valmis.
- Versionumeroiden tuplautuminen usean rinnakkaisen haaran välillä on
  ODOTETTUA (`docs/roolitus.md` "Julkaisusäännöt" kohta 2) — Julkaisija
  ajaa `uusi-versio.mjs`:n uudelleen mergehetkellä, ei tarvitse korjata
  etukäteen.

## 7. Julkaisukaava

Ei muutoksia. `git fetch origin main` → `node tools/uusi-versio.mjs
"<rivi, alle 60 merkkiä>"` → `node --test tests/*.test.mjs` (0 fail) →
`node tools/tarkista-kaksoisavaimet.mjs` → `node tools/build-standalone.mjs`
→ commit (data + sw.js + js/main.js + js/muutokset.js) → push → PR.
Kohdekartta-erissä lisäksi `node tools/tarkista-karttapisteet.mjs
<kaupunki>` version-nostin JÄLKEEN, ennen committia.

## 8. Ympäristö ja infra

- **Työkansio:** `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
  (oma checkout), Mac Studio.
- **`npm ci` on ajettu tässä checkoutissa tänään** — `node_modules`
  on olemassa (aiemmin ei ollut, ks. kohta 10 opetukset). Ei tarvitse
  ajaa uudelleen paitsi jos `package-lock.json` muuttuu.
- **Chromium (Playwright):** `~/Library/Caches/ms-playwright/
  chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/
  Contents/MacOS/Google Chrome for Testing`. Aseta `CHROMIUM`-
  ympäristömuuttuja tähän AINA kun ajat `tools/piirra-kaupunkikartta.mjs`
  — työkalun oma oletus (`/opt/pw-browsers/chromium`) on vanha
  konttipolku, EI toimi tällä koneella.
- **Overpass-rajapinta** (kartat): kaksi julkista peiliä
  (overpass-api.de, overpass.kumi.systems), molemmat ruuhkautuivat
  504:llä loppuvuoron ajan. Ei omaa infraa — yritä myöhemmin.
- **dist/-kansio EI committoida** (build-standalone ajetaan aina
  uudelleen mergen jälkeen, `.gitignore`).
- Ei uusia rutiineja, ajastuksia tai trigger-id:itä perustettu tässä
  vuorossa.

## 9. Avoimet velat ja opetukset

### Velat

1. Inventaariota (`docs/raportit/sisalto-inventaario-20260924.md`)
   ei ole päivitetty kohdekartta-vaiheen 12-kaupungin päätöksellä
   eikä turistioppaan kelpoisuuslistalla — tee ennen kuin jatkat
   kumpaakaan vaihetta, ettei päätös katoa.
2. `assets/kartat/venetsia-keskusta.png` ja `-svg` palautettiin
   alkuperäisiksi koeajon jälkeen (ei jäänyttä diffiä) — tarkista
   `git status` ennen ensimmäistä committia siltä varalta, että
   joku toinen sessio on koskenut samaan tiedostoon välissä.
3. N2/N4/N5/N6:n 20 kaupungin sää/galleria/ennenNyt on tekemättä
   (odottaa mergeä, ks. 4.2) — muista koko kolmen vaiheen kaava, ei
   vain säätä.

### Opetukset

- **Kohdekartta on paljon syvempi järjestelmä kuin "piirrä kartta":**
  `nosto:`-linkitys koskettaa koko pelin globaalia nosto-
  sijoittelusääntöä. Plain `teksti`-fallback on olemassa juuri tätä
  varten (`js/nahtavyydet.js` `avaaNahtavyys`) — käytä sitä uudelle
  sisällölle, säästä `nosto:` vain silloin kun oikeasti halutaan
  linkittää olemassa olevaan, jo paikannettuun nostoon.
- **Kartta-tyyli ei toimi pienille paikoille.** Testaa AINA yksi
  kaupunki ennen erän aloittamista — Norfolk paljasti tämän yhdellä
  ajolla, säästi tutkimasta koko 30 kaupungin listaa turhaan.
- **Tarkista faktat, kun kaksi paikkaa jakaa nimen.** "Batalha de
  Campo Grande" -maalaus kuvasi taistelua Paraguayssa 1869, ei
  Brasilian kaupunkia — yksi Wikipedia-haku (pt.wikipedia) esti
  virheellisen tiedon pääsyn peliin.
- **`galleria`- ja `ennenNyt`-kentät eivät ole yhtä työläitä.**
  `ennenNyt` on JO valmiina `js/packs/*-valokuvat.js`:ssä useimmille
  kaupungeille (76 % yield, mekaaninen kopiointi) — tarkista SE
  ENSIN aina, ennen kuin haet Commonsista mitään uutta.
- **Pieni saari + ERA5-sääruutu = huono data.** ERA5:n 0,25° ruutu
  osuu pienen saaren (Norfolk, St. Helena, San Ambrosio) kohdalla
  usein enimmäkseen mereen; `tools/hae-saanormaalit.mjs`:n TARKISTA-
  merkki paljastaa tämän luotettavasti — korvaa Wikipedian
  asematiedolla tai sanallisella kuvauksella, tai jätä arvioksi
  merkittynä jos mitään ei löydy.
- **`npm ci` checkoutissa on normaali askel, ei ympäristömuutos**
  (Fablen linjaus tässä vuorossa) — jos `node_modules` puuttuu, aja
  se suoraan, ei tarvitse kysyä lupaa.

## 10. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main

Lue: CLAUDE.md, docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT",
docs/raportit/sisalto-inventaario-20260924.md (KOKO, kohdat 1-7),
ja tämä raportti kokonaan (docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-e.md).

TILA: sää-vaihe VALMIS kaikille 71 kaupungille (14 PR:ää auki).
Galleria- ja ennenNyt-tutkimus VALMIS 46/46 mergetylle N8-N16-kaupungille
(3 gallerialla, 35 ennenNyt-parilla, PR:t #3066 #3068 #3069).
Turistiopas ohitettu toistaiseksi. Kohdekartat KESKEN.

ENSIMMÄINEN TEHTÄVÄ: jatka kohdekarttoja haarassa
sisalto-kohdekartta-pilotti-20260924. Aseta ensin
export CHROMIUM="/Users/koodaus/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
ja aja node tools/piirra-kaupunkikartta.mjs kalgoorlie (rajaus on
jo tiedostossa). Jos Overpass antaa 504:n, kokeile
OVERPASS_PALVELIMET=https://overpass.kumi.systems/api/interpreter
etuliitteenä tai yritä myöhemmin. Kun kuva on hyvä, kirjoita
js/packs/maakartat.js:n KAUPUNKIKARTAT-riville kalgoorlie (polku,
lahde, rajat, esittely, kohteet: plain teksti-kentällä, EI nosto:-
linkillä — ks. luovutuksen kohta 4.1 miksi). Pisteet: Paddy Hannanin
patsas -30.7490175/121.4705657, Hannans North -kaivos
-30.7268005/121.4716290. Testaa tools/tarkista-karttapisteet.mjs,
node --test tests/*.test.mjs (0 fail, nostot-kartalla.test.mjs
vihreä), versio+build+commit+PR. Jatka samalla kaavalla 11 muulle
kaupungille (Mount Isa, Broome, Geraldton, Porto Velho, Santarém,
João Pessoa, Macapá, Cayenne, Kimberley, Gao, Al Kufra) — 5
kaupunkia/erä. Kirjaa 12 kaupungin lista ja hylkäysperuste 18:lle
inventaarioon ENNEN kuin aloitat (kohta 5.5, puuttuu vielä).

Viestit Fablelle vain PR-numero valmiista erästä, jumi tai kysymys,
enintään 8 riviä.
```
