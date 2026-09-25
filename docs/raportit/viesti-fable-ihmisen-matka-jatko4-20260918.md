# Viesti Fablelle: Ihmisen matka — JATKO 4 (kuvat isommiksi, zoomi nopeammaksi, nykäisy pois)

Opus-agentti, 18.9.2026 klo 02.00 Suomen aikaa.
Haara `claude/bold-ride-vow4ki-ihmisen-matka-jatko4` (origin/mainin päältä,
lähtökohta 3d243c9b = v1934). **Ei PR:ää** (Raamattu AGENTIT TARKENNUS 8);
`node tools/build-standalone.mjs` ajettu ennen jokaista pushia, dist/ ei
mukana. **Vaatii versionoston** — `tools/uusi-versio.mjs` on ajamatta,
kuten pyydettiin.

Tehtävä: Raamattu "IHMISEN MATKA -LINSSI: RINTAMAN VALKKYMINEN, MUSTA
ALKU, LIIKU" → JATKO 4 kohdat 1–4 (omistaja 18.9.2026 klo 01.15, iPhone-
kuva v1934 Omon laaksosta).

## 1) Kohdekuva isona ja reunat häivytettyinä — TEHTY

- `KUVAN_OSUUS` 0,22 → **0,66** (js/linssit/ihmisen-matka-esitys.js),
  css-katto 260 px → 560 px.
- Kehys, pergamenttitausta ja varjo **pois**; reunat häivytetään
  `mask-image: radial-gradient(ellipse 52% 52% …, transparent 94%)`
  (css/aikajana.css). **Ei `filter`iä** — kartan ja pallon kerroksilla se
  ei piirry iOS-kuoressa (css:n oma mittausmuistio tiedoston alussa).
- Paikka siirtyi pisteen SIVUSTA sen **yläpuolelle**
  (`translate(-50%, calc(-100% - 1.1rem))`): iso kuva ei peitä
  kohdepistettä eikä alalaidan tekstilaatikkoa. Kuvateksti-elementtiä ei
  esityksen kuvassa ole (kuvateksti on nostokortilla), joten mitään ei
  jäänyt pois. Napautus avaa yhä noston kortin.
- **Säteet mitattiin kahdesti.** Ensimmäinen versio (`ellipse 62% 62%`)
  näytti kaappauksessa suoran leikkauksen vasemmassa ja yläreunassa:
  CSS:n `62%` on 62 % laatikon LEVEYDESTÄ, joten liuku loppui vasta 12 %
  laatikon ulkopuolella. Nyt säteet ovat 52 % ja liuku päättyy 94 %:n
  kohdalla eli 48,9 %:ssa — alfa on nolla ennen reunaa joka suuntaan.

Mitattu 390 × 844: leveys **257 px = 0,66 ruudusta**, korkeus 172 px,
maski olemassa ja päättyy läpinäkyvään, `filter: none`, taustaväri
`rgba(0,0,0,0)`, varjo `none`, kuvan alareuna 378 px ja tekstirivin
yläreuna selvästi sen alapuolella.
Kaappaus: `/tmp/claude-501/jatko4-390/savuke-ihmisen-esitys-6b-kohdekuva-iso.png`
(834 px:n vastine samassa ajossa: `/tmp/claude-501/jatko4-kaappaukset/…-6b-….png`).

## 2) Zoomi noin sekunnin nopeammaksi — TEHTY

`ZOOMIN_JATKO_MS` 5000 → **4000**. Lähtöhetki (`zoomPerus`) ja koko
luennan ajoitus ennallaan; zoomi päättyy sekunnin aiemmin. Marokon ajo
alkaa yhä **vasta zoomin päätyttyä** (JATKO 3 TARKENNUS 2) ja pitää
entisen pituutensa: mitattu `kohdeajonMyohassa = 4000 ms` ja ajon kesto
19,9 s, eli kertomus ja luenta etenevät ennallaan.
Mitattu: zoomin kesto **10 219 ms** (ennen 11 219 ms).

## 3) Viimeinen keskitetty lause jo alareunaan — TEHTY

Rivi laskeutuu **yhtä lausetta aiemmin**: uusi lippu `tila.avausLasku`
nousee vain avauksen VIIMEISELLÄ jaksolla ('afrikka'), ja lasku alkaa jo
toiseksi viimeisen lauseen häipyessä (`paivitaTeksti`), joten viimeinen
lause tulee näkyviin vasta alalaidassa. Yksisuuntainen kuten `avausOhi`.
Mitattu 390 px: viimeisellä avauslauseella `keskella === false` ja rivin
keskikohta 83 % ruudun korkeudesta.

## 4) Nykäisy zoomin lopussa — JUURISYY MITATTU JA KORJATTU

**Juurisyy.** 'afrikka'-jakso alkaa KESKEN avauszoomin ja ajoi tähän asti
saman Afrikan rajauksen **uudestaan** jäljellä olevalla ajalla
(`aloitaJakso` → `ajaAlueeseen(jakso.alue, avaruuttaJaljella())`). Laudan
ajo (js/pallolauta/kamera.js `ajaKamera`) aloittaa aina nykyisestä
näkymästä ja **käyrän alusta**, joten nopeus putosi lähes nollaan ja
nousi uudestaan. Ei siis ease-out/ease-in -sauma eikä tauon
pointOfView-asetus.

**Mittaus** (kameran korkeuden aikasarja 16 ms välein, sama savuke
molemmilla versioilla, raakasarja talteen tiedostoon `korkeussarja.json`
kaappausten viereen; nopeus log-korkeudesta, 5 näytteen ikkuna):

| | ennen korjausta | korjattu |
|---|---|---|
| nopeus juuri ennen jakson vaihtoa | 0,86 | 0,78 |
| nopeus heti jakson vaihdon jälkeen | **0,06** | 0,77 |
| paluu puoleen huipusta | 575 ms myöhemmin | ei notkoa |
| lovinäytteitä sarjassa | **12** | **0** |
| hyppyjä (derivaatta > 2 × naapuri) | 0 | 0 |

**Korjaus.** Kun avauszoomi on yhä matkalla (`zoomiKesken`), 'afrikka'-
jakson aluerajausta ei ajeta uudestaan: ajo on jo matkalla samaan maaliin
samalla kellolla. Korkeus ja sijainti jatkuvat C1-pehmeästi zoomista
taukoon ja tauosta Marokon ajoon (Marokon käyrä lähtee nollanopeudesta,
kuten ennenkin).

## Mittarit ja savukkeet

- `tools/savukkeet/savuke-ihmisen-esitys.mjs` sai kolme uutta väitettä
  (JATKO 4 / ZOOMI, / NYKÄISY, / TEKSTI) ja JATKO 4 / KUVA -mitan
  (leveys, osuus, maskin alfa-liuku, ei suodatinta, ei kehystä, kuva
  tekstirivin yläpuolella). Vanha "KUVA: löytökuva nousee pienenä"
  -väite päivitettiin isoon mittaan.
- Savuke osaa nyt myös puhelinmitan ilman koodin muokkausta:
  `LEVEYS=390 KORKEUS=844 VAIN_AVAUS=1 …`.
- Nykäisymittarin ikkunat on **mitattu, ei arvattu**: raakasarjasta
  näkyi, että 16 ms:n näytteenotto ja rAF-piirto tuottavat pelkkää
  aliasta (21 "hyppyä" ja 18 "lovea" myös tasaisessa liikkeessä), joten
  nopeus lasketaan 80 ms:n ikkunasta; loven ikkunat (400 ms taakse,
  800 ms eteen) tulevat vanhan koodin ramppin mitasta.

### Ajot

- `VAIN_AVAUS=1 PORTTI=9017 LEVEYS=390 KORKEUS=844 …
  savuke-ihmisen-esitys.mjs` → **17/17 läpi**
  (kaappaukset `/tmp/claude-501/jatko4-390`).
- `KOOT=390 PORTTI=9012 … savuke-ihmisen-kappaleet.mjs` → **21/23**.
  Kaksi huomiota alla.
- `node --test tests/*.test.mjs` → **3572/3572 läpi** (13 skipattua).

### Kaksi havaintoa kappaleet-savukkeesta

1. `zoomi kestää 4000 ms entistä pidempään` kaatui `ZOOMIN_JATKO_MS ===
   5000` -vartioon; vartio päivitettiin 4000:een (ajo tehtiin ennen
   korjausta).
2. `saapuminen siirtyy tasan ZOOMIN_JATKO_MS jakson alun yli` kaatuu yhä
   viimeiseen ehtoonsa: mallin ajo 19 905 ms, mutta kamera on 0,5
   yksikön päässä maalista jo 15 748 ms:n kohdalla — tasan
   `MAROKON_JARRU` (0,8) × ajon kesto. Kyse on **mittarin** liian
   tiukasta 2 000 ms:n varasta pitkällä ajolla, ei ajosta: `myohassa`
   on tasan 4 000 ms ja ajo alkaa vasta tauon jälkeen. En koskenut
   siihen — se on JATKO 3:n mittari ja oman päätöksen paikka (ehdotan
   varaksi esim. `(1 − MAROKON_JARRU) × kesto + 1 000 ms`).

## Oletukset, jotka tein itse (ei kysymyskorttia käytettävissä)

1. **Kuvan koko 0,66** (tehtävän haarukka 60–70 %) ja katto 560 px, jotta
   työpöydällä kuva ei kasva ruudun levyiseksi.
2. **Paikka pisteen yläpuolella** sivun sijaan: iso kuva pisteen vieressä
   olisi mennyt joko pisteen tai ruudun laidan päälle. Kuva seuraa yhä
   pistettä (kehys on lampun CSS2D-elementissä), joten se pysyy kohteen
   luona kameran liikkuessa.
3. **Lasku alkaa toiseksi viimeisen lauseen häipyessä**, ei viimeisen
   alkaessa: näin viimeinen lause on JO alhaalla, kun se ilmestyy —
   omistajan sanamuoto oli "olla jo sijoitettu alareunaan".
4. Nykäisymittarin kynnykset (kohina 25 % huipusta, lovi alle 15 %
   huipusta) valittiin niin, että ne erottavat vanhan ja uuden koodin
   samasta aineistosta — ne validoitiin talletetuista raakasarjoista
   ilman uusia selainajoja.

## Muutetut tiedostot

- `js/linssit/ihmisen-matka-esitys.js` (KUVAN_OSUUS, ZOOMIN_JATKO_MS,
  `tila.avausLasku`, `paivitaTeksti`, `zoomiKesken`)
- `css/aikajana.css` (`.aikajana-kertomuskuva` + maski)
- `tests/ihmisen-matka-esitys.test.mjs` (vartiot kaikille neljälle
  kohdalle)
- `tools/savukkeet/savuke-ihmisen-esitys.mjs`,
  `tools/savukkeet/savuke-ihmisen-kappaleet.mjs`

Raamattuun, sarjat.jsoniin, satelliitti-/nostot-tiedostoihin,
kertomuksen teksteihin tai ääniin ei koskettu.
