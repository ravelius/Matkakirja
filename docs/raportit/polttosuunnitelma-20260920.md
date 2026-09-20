# Polttosuunnitelma: koko pyramidi uusiksi yhdellä kertaa (Karttaseppä 20.9.2026)

Omistajan päätös (Fable 20.9.2026 ilta): koko laattapyramidi poltetaan
uudestaan YHDELLÄ kertaa — joet POHJAAN (ei erillistä jokitasoa) — ja
poltto odottaa, kunnes kartan elävöittämisen muut muutokset on päätetty.
Poltto alkaa vasta Fablen sanasta. Tämä on suunnitelma; ei polttoa, ei
luetteloa, ei osoitinta.

Mittausten lähde: tämän päivän paikallisen polton lokit
(`~/pyramidi-poltto/lokit`, Mac Studio 16 ydintä), `tools/polta-paikallisesti.sh`.

## 1. Mitä poltetaan (sarjat ja versiot)

| # | Sarja | Tasot | Sisältö | Versio (ehdotus) |
|---|---|---|---|---|
| 1 | **Pohja** | z0–z8 | paperi, hypsometria, meri syvyysrampilla, **JOET** (uudelleen pohjaan: `piirraJoetKankaalle` pohjapassissa on jo olemassa; nykyinen 2026-09-20-pohja on poltettu ennen jokikorjausta), ilman rantaviivaa (`--ilman-rantaviivaa`), ilman reittejä ja nimiöitä (`nimiot: false`), + omistajan valitsema meren elävöitys (luku 3) | `2026-09-2X-pohja` |
| 2 | **Ranta** | z0–z8 | rantaviiva omalla läpinäkyvällä tasolla (V4) | `2026-09-2X-ranta` |
| 3 | **Viivat** | z0–z8 | reitit + rajat, **ilman jokia** (joet pohjassa → viivatasolta pois, muuten tuplamuste tasokartalla). Tarvitsee generaattoriin lipun `--eijoet` (peili 20.9. tehdylle `--eireitit`/`--eirajat`-lipulle haarassa karttaseppa-jokitaso, 64e402d3 — sama VIIVAOSAT/passit-mekanismi, ~20 riviä) | `2026-09-2X-viivat` |
| 4 | **Nostotaso maittain** | z5–z8 | 112 maata, `--ilman-hahmotelmia`, LTU:n 4 vanhentunutta nostoa korjaantuvat samalla | `2026-09-2X-nostot` |
| 5 | **Nimiötaso** (ehdollinen) | z4–z8 | vain jos Pelikoodari tarvitsee poltetut nimiöt (merinimiöt, 1873-maakunnat) erillisenä kytkettävänä kerroksena — ks. luku 4; muuten nimiöt jäävät eläviksi kuten nyt | `2026-09-2X-nimiot` |
| 6 | **Pallosarja** | Mercator z0–z8 | koottu pohjasta + viivoista (+ rannasta jos `--pallon-ranta`), `--pallo-ilman-nostoja` (nostot maittain lepokerroksessa) | tunniste `2026092X<a-z>` |
| 7 | **Väritasot / tasoitus** | z4–z8, 27+ maata | EI polteta uudestaan (oma luettelokenttä `varitasot`, ei riipu pohjasta); luettelon kokoaja kantaa `varitasot` ja `erat` sellaisenaan (`kokoa-nostotasot.mjs --ampari`) | ennallaan |
| 8 | **Reliefipyramidi** (topografialinssi) | — | oma luettelo, ei kosketa | ennallaan |

Pohjan ja viivatason vaihto → pallosarja perään (Raamatun sääntö); rannan
vaihto ei vaadi sarjaa jos sarja poltetaan rannattomana (nykyinen k: `ranta: null`).

## 2. Kesto (mitattu 20.9.2026, per shardi, 16 ydintä)

| Sarja | Shardeja | CPU-min (mitattu) | Laattoja | Koko |
|---|---|---|---|---|
| pohja z0–z6 | 1 | 27 | 5 933 | 159 Mt |
| pohja z7 (a–d) | 4 | 82 | 17 407 | 465 Mt |
| pohja z8 | 85 | 341 | 69 628 | 1 826 Mt |
| ranta z0–z7 + z8 | 1 + 11 | 19 | 12 096 | 150 Mt |
| viivat z0–z7 + z8 | 1 + 11 | 9 | 14 146 | 106 Mt |
| nostot 112 maata (z5–z7 + z8) | 224 | 14 | 4 883 | 24 Mt |
| pallosarja | 48 osaa | ~290 (verkkosidonnainen: lähdelaatat ämpäristä, 6 min/osa) | 101 000 | ~420 Mt |
| **yhteensä** | | **~780 CPU-min ≈ 13 ydintuntia** | ~225 000 | **~3,1 Gt** |

Seinäkello 16 ytimellä: pohja ~35 min (z8-shardit 4 min × 85 / 16 = 22 min
rinnan z7:n 20 min:n kanssa; z0–z6 27 min yksin) → ranta+viivat+nostot
~10 min → luettelo → pallosarja ~20–25 min (48 osaa / 16; lähteet
levyltä jos `--siivoa` ei ole päällä, muuten ämpäristä) → **≈ 1 h 15 min**
+ vienti ämpäriin (3,1 Gt; edellinen 2,45 Gt pohja vei ~20 min). Uudet
generaattorimuutokset (luku 3) eivät muuta kestoa merkittävästi paitsi
rannikkoviivoitus (+10–20 % pohjaan, arvio).

Mac on CI:n runner: koko ajan (~1,5 h) **ei PR-savukkeita** — Julkaisija
pitää CI-tauon, ei avaa PR:iä eikä käynnistä workflow_dispatchia.

## 3. Generaattorimuutokset ennen polttoa

1. **Joet pohjaan** — valmis (`piirraJoetKankaalle` pohjapassissa, JOKIREGRESSIO 20.9.); vartio `tests/viivataso` mittaa. Lisäksi `--eijoet` viivatasolle (uusi, ~20 riviä; malli 64e402d3).
2. **Merinimiöt merelle ja pois rantaviivan alta** — nimiöt eivät ole pohjassa (`nimiot: false`), Biskajanlahti ym. ovat eläviä maastokohteita (js/packs/maastokohteet-*.js, Sisältökirjurin "nimiöiden reunasiirto" -erä). Polttoon tämä kuuluu VAIN, jos tehdään nimiötaso (luku 4): silloin ladonta merelle = nimiön ankkuri meripolygonin sisään + siirto rannasta ≥ puoli kirjainkorkeutta (uusi passi, ~1 pv). Ilman nimiötasoa: ei generaattorimuutosta, elävien nimiöiden paikat korjataan aineistossa.
3. **1873-maakuntien ja merien harvennetut kapiteelit** — aineistoa ei ole (ei maakuntapolygoneja 1873, ei merinimistöä maailmanlaajuisesti repossa). Tarvitaan: NE `ne_10m_admin_1` (nykyiset) TAI 1873-rajat käsin Euroopalle (Fable/Sisältökirjuri), merinimet `ne_10m_geography_marine_polys`. Ladonta: harvennettu kapiteeli (letter-spacing) polygonin pääakselille, vain z4–z6 (kaukokuva), pohjaan tai nimiötasoon. Arvio 1–2 pv aineisto + 0,5 pv ladonta. **Ei ehdi tähän polttoon ilman omistajan päätöstä aineistosta.**
4. **Rannikkoviivoitus TAI syvyysvyöhykkeet** (omistaja valitsee kortilla):
   - a) *Syvyysvyöhykkeet* ovat JO pohjassa (maailmapiirto.js syvyysramppi, litistys 0,20 "bandingin" takia 30.8.). Muutos = litistyksen palautus (0,20 → 0,5–0,7) ja portaiden lukumäärä (`SYVYYS`-asteikko tools/patina.mjs): ~1 h + koelaatta. Kesto ei muutu.
   - b) *Rannikkoviivoitus* (rannan suuntaiset ohuet viivat merellä, 2–4 kaistaa, 1800-luvun kaiverrustyyli) on UUSI passi: rannikkopolygonin offsetit (sama `tyonnaUlos`-kaava kuin aluevesirajalla) ja häivytys ulospäin; ~1 pv + koelaatat; pohjan piirtoaika +10–20 %. Rannan pikkusaaret ja fjordit vaativat harvennuksen ettei viivoitus tukkeudu.
   - Suositus: a) nyt (halpa, jo mitattu banding-raja tiedossa), b) jonoon ellei omistaja halua kaiverrusilmettä juuri nyt.
6. **Tarkempi rantaviiva-aineisto z≥7:lle** (Gironde/Arcachon-mittaus 20.9.: ne_10m:n
   janat ovat 4–6 km, joten kehä, rantavektori ja laatan täytön reuna ovat kaikki
   kulmikkaita lähizoomilla). Vaihtoehdot: GSHHS full (LGPL, ~1:250k, rannikko +
   järvet) tai OSM coastline (ODbL). Vaikuttaa KAHTEEN paikkaan: pallon
   vektorisolut (tee-pallovektorit, laji rannikko l4) ja polton meri/ranta
   (maailma.mjs ne_10m_ocean → sama aineisto), muuten kehä ja täyttö eroavat.
   Arvio 1 pv aineisto + polttoaika +10 % (tiheämpi ranta). Omistaja päättää polton
   yhteydessä; ilman tätä lähizoomin kulmikkuus jää.
5. **Nimiötaso** — jos Pelikoodari tarvitsee: uusi `--nimiotaso`-ajo viivatason mallilla (läpinäkyvä, peite nimiölaatikoista), luettelokenttä `nimiotaso`, peli lataa pallolle ja tasokartalle (js/laattapyramidi.js: sama malli kuin jokitaso 64e402d3, ~150 riviä + testit). 1 pv.

## 4. Pelikoodarin tarve (kysytty 20.9. suoraan)

Kysytty: tarvitseeko elävöittäminen erillisen nimiötason vai riittävätkö
elävät nimiöt. Vastaus kirjataan tähän: _(odottaa)_.

## 5. Luettelojärjestys ja julkaisu

1. CI-tauko (Julkaisija): ei PR:iä, ei dispatchia, main vihreä.
2. Poltto: pohja → ranta → viivat → nostot (rinnan, `polta-paikallisesti.sh --sarjat kaikki --ilman-rantaviivaa --versio <pohja> --viivaversio <viivat> --rantaversio <ranta> --nostoversio <nostot> --ei-vie`).
3. Luettelo: `--vain-luettelo` + `kokoa-nostotasot.mjs --ampari <ämpärin pyramidi.json> --pohja-ennallaan` → `varitasot`, `erat` säilyvät; tarkista `tarkista-polton-tuoreus.mjs --luettelo` = 0 vanhentunutta, top-level-kentät samat kuin ämpärissä (+ mahdollinen `nimiotaso`).
4. Vienti ämpäriin: laatat uusiin versiokansioihin (ei ylikirjoita mitään) — luettelo EI vielä.
5. Pallosarja poltetaan uudesta pohjasta/viivoista (`--vain-pallo --pallotunniste <t>`; lähteet levyltä), vienti `julisteet/pallo/laatat/<pohja>-<t>/`.
6. Osoitin koodiin (js/pallo.js PALLO_LAATTAVERSIO + PALLO_LAATTATUNNISTE, + uusi luettelokenttä jos nimiötaso) → PR → merge mainiin → tuotanto.
7. VASTA SITTEN luettelo ämpärin juureen (edellinen talteen `pyramidi.edellinen-<aika>.json`), samalla sekunnilla kuin tuotanto on uudessa versiossa — muuten lepokerros sammuu ("pallon sarja ja pyramidi eri versiota").
8. CI-tauko päättyy; Laitetestaaja: Loire/Seine/Rhône levossa ja liikkeessä, Gironde, meren ilme, nostot LTU.

## 6. Riskit

- Ämpärin koko: 30,5 Gt (Fable 20.9. 01.45) + 3,1 Gt; vanhojen versioiden siivous omistajan päätöksellä ennen tai jälkeen.
- Yksi versionvaihto kaikille tasoille → kaikkien laattojen välimuisti pelaajilla tyhjenee kerralla (3 Gt CDN-liikennettä alkuun); hyväksytty hinta yhdelle kerralle.
- Jos meren elävöitys (luku 3.4) muuttaa `umpimeriSavy`-karsintaa (umpimeriset laatat karsitaan tasaisen sävyn takia), viivoitus estää karsinnan rannikon lähellä → laattamäärä kasvaa; mitataan koeajolla (`--koe`) ennen sarjaa.
