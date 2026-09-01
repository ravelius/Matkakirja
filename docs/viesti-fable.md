# Opus (kartta) → Fable: kolme omistajan asiaa 1.9.2026 illalta

Haara `worktree-agent-aa3cebc155a1c873b`, kaksi committia. En nostanut
versiota enkä avannut PR:ää — julkaisu on sinun.

Kaikki alla olevat luvut on mitattu tässä kontissa (Chromium
`/opt/pw-browsers/chromium`, 390×844 dpr3, 4× CPU-kuristus). Kone on
hitaampi kuin aiempien mittausten kone, joten VERTAA VAIN SARAKKEITA
KESKENÄÄN, älä aiempiin absoluuttilukuihin.

## 1. "Kaikki elementit pitää pysyä päällä kun karttaa liikutetaan tai zoomataan"

Commit `2c39728c`. Eleenaikainen piilotus on purettu KOKONAAN — ei
kuollutta koodia eikä kytkinvakiota jäljelle.

Poistettu: `js/kartta.js` `piilotaMerkit` / `naytaMerkit` /
`merkitEsiin` / `paljastaMerkit` ja koko niiden tilakone (paluuviive,
uusi yritys liikeluokkien takia, odotuksen katto, häivytysajastin ja
sen varareitti taustavälilehdelle, kehysvaraus, `merkitPiilossa`);
runkoluokat `kartta-merkit-haipyy` / `kartta-merkit-piilossa` ja
nimikerroksen opacity-siirtymä (`css/styles.css`); paluupolut
`js/ui.js`:n destroysta ja jumivahdista (eleKesken).

Vastaskaala: `js/elaintaky.js`:stä poistettiin oikotie
`if (ui.merkitPiilossa && suhde !== 1) return;`. Nyt lehdettömän
varapolun ruutumittaiset kerrokset vastaskaalataan JOKA KEHYS koko
eleen ajan, ei vain eleen päättävässä `vastaskaalaaMerkit(1)`
-kutsussa. Fokusnäkymässä (vakioskaala) silmukkaa ei ajeta lainkaan,
kuten ennenkin — merkit kasvavat kartan mukana.

**Mitattu** (`tools/savukkeet/savuke-maailmanakyma.mjs`, kehittäjän
maailmanäkymä Kreikassa = raskain tapaus; longtaskien summa per ajo,
6 pyyhkäisyä + 4 nipistystä per ajo):

| variantti | panorointi | nipistys |
| --- | --- | --- |
| piilotus päällä (3 ajoa) | 724 / 840 / 767 ms (med. **767**) | 1203 / 1412 / 1420 ms (med. **1412**) |
| piilotus poissa (5 ajoa) | 313 / 422 / 492 / 254 / 357 ms (med. **357**) | 925 / 1070 / 1104 / 1135 / 857 ms (med. **1070**) |

Purku on siis myös NOPEAMPI, ja sarjat eivät mene panoroinnissa
päällekkäin lainkaan. Syy on kirjattu koodiin: piilotus vaihtoi eleen
molemmissa päissä runkoluokan, joka pakotti koko dokumentin
tyylinlaskun ja otti kuusi SVG-kerrosta ulos asettelusta ja takaisin
sisään — juuri niissä kehyksissä, joissa nykäys tuntuu.

**Hinta, joka omistajan on hyvä tietää:** polttamattomat kerrokset
(erityisesti `js/karttanimet.js`) ladotaan RUUTUAVARUUDESSA, joten ne
skaalautuvat nipistyksen aikana laudan mukana ja asettuvat omaan
kokoonsa vasta eleen jälkeen. Sen napsahduksen piilotus aikanaan
peitti (31.8. linjaus "kaikki poltamaton pois zoomatessa"); nyt se on
näkyvissä. Uusi linjaus kumoaa vanhan — Raamatun päivitys on sinun.

Savukkeen väitteet 1b/1c on käännetty: elävä sisältö (tummennus JA
kohdemerkit) on näkyvissä kesken eleen.

## 2. "Kartan tummennuksen voisi ottaa pois päältä kehittäjä tilassa"

Commit `8951a587`. Uusi kytkinrivi **tummennus** hammasratasvalikkoon,
oletus **päällä**.

- `index.html`: `#kehittaja-tummennus-btn` maailma/mittari/kysymykset
  -rivien joukkoon, sama `kehittaja-kytkin`-muotti.
- `js/ui-apurit.js`: avain `matkakirja-kehittaja-tummennus`,
  KÄÄNTEINEN muihin nähden (puuttuva avain = päällä, levylle
  kirjoitetaan vain poiskytkentä `'0'`), muisti mukana
  `unohdaKehittajaKytkimet`-joukossa ja siten storage-tapahtumassa.
- `js/maatummennus.js` `tunniste()`: `kehittajaTilaPaalla() &&
  !kehittajaTummennusPaalla()` → `null`. Ehto on siellä, koska se on
  kerroksen ainoa näkyvyysehto: kytkin käyttää samaa purkupolkua kuin
  zoomirajan ylitys. **Pelaajaan kytkin ei vaikuta** — avainta ei edes
  lueta ilman kehittäjätilaa.
- `js/ui.js` `paivitaKehittajaTummennus()`: `nollaaMaatummennus` +
  `paivitaMaatummennus`. Nollaus on pakko, koska kerroksen tunniste on
  pelkkä maa eikä muutu kytkimen vaihdosta.
- `js/main.js`: napin kytkentä, tilarivi, title-tekstit, vihjerivi.

**Vartijat:** `tests/rules.test.mjs` tarkistaa ketjun viisi lenkkiä
erikseen (rivi, avain+oletus, muistin nollaus, kytkentä, näkyvyysehto,
nollausjärjestys). `savuke-maailmanakyma` sai väitteet 2b/2c: mitattu
selaimessa 2 solmua → 0 → 2 ilman sivulatausta.

## 3. "Saako kartan skrollausta jotenkin paremmalla koodilla sujuvammaksi?" — ARVIO

Ei toteutettu, kuten pyydettiin. Profiloin pelaajan näkymän (ei
kehittäjän maailmanäkymää) Ateenan lähikuvassa: 6 pyyhkäisyä, 4×
kuristus, CDP-näytteistys 100 µs + longtaskit ikkunoitiin erikseen
sormen ollessa ruudulla ja sormen irrotessa.

**Ratkaiseva luku:**

    longtaskit  sormi ruudulla    107 ms (2 kpl)
                sormen irrotessa  510 ms (6 kpl)   ← 83 % ja tasan
                                                     yksi per pyyhkäisy

Eli **per-kehys-työ eleen aikana on jo kunnossa** (`asetaPan` 26 ms ja
`rajaaKasinPan` 25 ms 70 kutsulla = ~0,7 ms/kehys 4× kuristuksella),
ja koko tökkiminen on YHDESSÄ ~85 ms:n tehtävässä, joka laukeaa
sormen irrotessa. Kokonaisajat samasta ajosta:

    306 ms  paata            @ kartta.js   (pointerup-käsittelijä)
    297 ms   └ taydennaTaide @ ui.js
    250 ms      └ paivitaMaastonimet @ ui.js
     64 ms          └ paivitaFokuskohteet @ fokuskohteet.js
    259 ms  ajaFokusmitat    @ fokusmitat.js  (mikrotehtävä perään)
    206 ms   └ paivitaNappipaikka (yksi getBoundingClientRect)
    253 ms  getBoundingClientRect (koko ajon itseaika)
    421 ms  roskienkeruu

Ehdotukset paremmuusjärjestyksessä:

**1. Eleen jälkeinen ladonta pois yhdestä tehtävästä (ENSIMMÄINEN
KOKEILTAVA).** Tänään `paata` ajaa synkronisesti koko ketjun
pyramidista karttanimiin ja fokusmittoihin. Jaa se kehyksille
prioriteettijärjestyksessä — laatat → kohdemerkit → karttanimet →
tummennus/eläintäyt/selite → fokusmitat — yksi askel per
`requestAnimationFrame` (tai `scheduler.postTask`, jos saa nojata
siihen). Perustelu: 510/617 ms longtaskeista on täsmälleen tässä, ja
silmä ei ehdi nähdä välitilaa, jos järjestys on tärkeysjärjestys.
Odotettu hyöty: ~85 ms:n tehtävä pilkkoutuu alle 16 ms:n paloihin →
sormen irrotessa ei pudotettuja kehyksiä. Riski: hetkellinen
epäjohdonmukaisuus kerrosten välillä; rajattavissa siihen, että
mittakaavasta riippuvat kerrokset (kohdemerkit, karttanimet) menevät
samaan askeleeseen.

**2. Yksi asettelunluku eleen lopussa, ja se ENSIN.** `ajaFokusmitat`
lukee asettelua (`mittaaPerusta`, `kalusteLaatikot`,
`paivitaNappipaikka`) VASTA sen jälkeen kun `paivitaMaastonimet` on
kirjoittanut DOMiin — siksi yksi `getBoundingClientRect`
(`paivitaNappipaikka`) kantaa 206 ms:n laskun koko pakotetusta
uudelleenasettelusta. Sama resepti kuin `paivitaKehittajaMaailma`
-metodissa jo on ("KAIKKI ASETTELUNLUVUT ENSIN"): nosta luvut ketjun
alkuun. Lisäksi `--fokus-nappipaikka` riippuu vain kartuutsin
tekstistä ja ruudun leveydestä — se voi jäädä väliin, kun kumpikaan ei
ole muuttunut. Halpa ja lähes riskitön; tekee osan 1:n hyödystä
näkyväksi heti.

**3. Näkymärajaus myös elävälle merkkikerrokselle.** `ui.js`
`paivitaMaailmanRajaus` rajaa vain `.cities`-kerroksen (mitattu
aikanaan 602 → 90 solmua). Nyt kun mikään ei enää piiloudu eleen
ajaksi (kohta 1 yllä), sama ikkunarajaus kannattaa ulottaa
kerroksiin `.fokuskohteet`, `.fokusnosto-symbolit` ja `.elaintakyt`.
Kompositorin kustannus on lineaarinen NÄKYVISSÄ solmuissa, joten
hyöty on suoraan verrannollinen ruudun ulkopuolelle jäävään osaan.
Tämä on eleenaikaisen piilotuksen oikea korvaaja: se ei piilota
mitään, mitä pelaaja voisi nähdä.

**4. Pointer-tapahtumien coalescing ja transformin kirjoitus vain
rAF:ssa.** `pointermove` kirjoittaa `style.transform`in synkronisesti
joka tapahtumalla. 120 Hz:n iPadilla tapahtumia tulee kehyksiä
tiheämmin, jolloin sama kehys mitätöidään monta kertaa. Lue
`e.getCoalescedEvents()`-jonon viimeinen piste ja kirjoita muunnos
kerran kehyksessä. JS-hyöty on pieni (mitattu ~0,7 ms/kehys), joten
tämä on vasta 1–3:n jälkeen — mutta se on halpa ja poistaa
kirjoituksia, joita kukaan ei näe.

**5. Elävä merkkikerros omalle kompositorikerrokselleen.** Koko SVG on
yhden `will-change: transform` -kerroksen sisällä (`.kartta-kuori`),
joten jokainen merkkiin tehty määrekirjoitus rasteroi uudelleen sen
kerroksen palan — myös laatat. Ensimmäinen halpa askel on nostaa
merkkikerros omaksi kerroksekseen (oma `will-change` / `translateZ`),
jolloin pohja pysyy rasteroituna. Tämä on sama suunta kuin Raamatun
"MERKKIKERROKSEN RASTEROINTI ELEEN AJAKSI", mutta ilman bittikarttaa.
Mitattava savukkeella ennen ja jälkeen; riski on iOS:n muisti ja se,
ettei SVG-ryhmän kerrosnosto ole taattu.

**6. Vanhan laattatason purku vasta levossa.** Laattoja ei kiinnitetä
kesken eleen (`!kartanRaahaus`), mutta laatan `load` voi laueta kesken
SEURAAVAN eleen, ja sen käsittelijä ajaa `kaikkiRuudullaLadattu` +
`poistaVanhaTaso` eli DOM-poistoja sormen alla. Siirrä purku samaan
lepohetkeen kuin muukin jälkityö. Pieni, turvallinen, poistaa
satunnaisen nykäyksen jota mittaus ei toista.

## Testit ja portit

- `node --test tests/*.test.mjs` → **1147 pass, 0 fail** (1 skipped)
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `node tools/tarkista-niputus.mjs` → 298 moduulia, ei törmäyksiä
- `node tools/build-standalone.mjs` + `savuke-dist` → `{"peli":true}`,
  ei virheitä
- `tools/savuke-kartan-sujuvuus.mjs` → 40/40 (sama ennen ja jälkeen)
- `tools/savukkeet/savuke-panorointi.mjs` → 11/11
- `tools/savukkeet/savuke-elaintaky.mjs` → 23/23
- `tools/savukkeet/savuke-maailmanakyma.mjs` → 18/20. Kaksi kaatuvaa
  väitettä (3a panoroinnin longtask-summa > 350 ms, 4 nipistys > 750
  ms) kaatuivat **myös ennen muutosta** tässä kontissa (724–840 ms ja
  1203–1420 ms) — rajat on viritetty nopeammalle koneelle. Muutos
  paransi molempia lukuja; rajojen säätö on oma päätöksensä eikä
  kuulunut tähän toimeksiantoon.

## Mitä EN koskenut

Nostojen ladonta (`js/fokusniput.js`, `js/nostoladonta.js`),
reittityyli (`tools/fokuskartta/maailmapiirto.js`), nappulan
siirtoanimaatio ja kameran seuranta nopanheitossa.
