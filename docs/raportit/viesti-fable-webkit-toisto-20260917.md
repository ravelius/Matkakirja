# Viesti Fablelle: Codexin WebApp-löydökset oikealla WebKitillä (v1929)

17.9.2026, Opus (Mac Studio, Playwright WebKit 26.5 + Chromium 151).
Haara `claude/bold-ride-vow4ki-webkit-toisto`. Ei PR:ää, ei
versionostoa, ei Raamattu-muutoksia, **ei pelikoodin muutoksia**.
Tehtävä: Raamattu ASTRONAUTIN KAMERA LISÄYS 13 kohdat 36 ja 37.

## 1. Tulos lyhyesti

| Kohta | Väite | Toistuuko WebKitissä | Toistuuko Chromiumissa |
|---|---|---|---|
| 36 | pisteitä 0, ruskea tyhjä ruutu, vartija `puute=pisteet` | **EI** (0/30 avausta) | **EI** (0/31 avausta) |
| 37 | pallo + 64 pistettä, **tekstuuri musta**, vartija `puute=ei` | **KYLLÄ** (5/30, vain uudelleenavauksissa) | **KYLLÄ** (joka uudelleenavaus, 16/16) |

Kohta 37 ei ole 8k-tekstuurin eikä Safarin 16,7 Mpx:n kangaskaton
vika: musta pinta syntyy myös 390 × 844 -kotelossa, jossa ladonta on
2048 × 1024 (2 Mpx), ja jokainen `ladonta`-rivi on `ok=1`. Juurisyy
on mitattu (osio 4): **globe.gl asettaa pallon materiaalin värin
mustaksi, kun linssi suljetaan**, ja seuraavassa avauksessa musta jää
pinnan sävyttimeksi. Korjaus on yksi rivi, ja se on ehdotettu osiossa 5
— toteutus jää pilvisession haaralle astro-webkit2 sovitusti.

## 2. Miten mitattiin

Skripti `tools/savukkeet/savuke-astro-webkit.mjs` (uusi, tässä
haarassa): `playwright.webkit` ja vastakokeena `playwright.chromium`,
kotelot **2539 × 1321 dpr 1** (Codexin WebApp-ikkuna) ja **390 × 844
dpr 3** (iPhone: isMobile, hasTouch, iPhone-UA). Peli paikalliselta
palvelimelta osoitteella `?lauta=pallo&pallodiag=1`; linssi avataan
pelaajan omilla eleillä (matkalaukku → ruutu → Aktivoi, sama polku
kuin savuke-astro-pallossa) ja suljetaan linssin omalla ✕:llä
(`.satelliitti-linssisulku`), **kolme avausta peräkkäin samassa
sivussa**. Per avaus: pallodiag-loki, `.satelliitti-piste`-määrä
0,5 s välein 15 s, pallon keskipisteen kirkkaus kuvakaappauksesta
1 / 2 / 5 / 15 s kohdalla (savuke-astro-pallon väite 8:n mittari,
13 × 13 px keskeltä + neljä sivupistettä), linssin `tila()` ja
materiaalin kartta.

Kaksi poikkeamaa pelaajan ympäristöön, molemmat mitattuja:

- **Ämpäri Noden välityksellä** (kuten savuke-astro-pallo). Suoraan
  haettuna media.matkakirja.app ei anna CORS-lupaa 127.0.0.1-
  originille, ja WebKit pitää estetyt pyynnöt vireillä yli 200 s,
  jolloin `load` ei laukea koskaan. Välitys lisää vain
  `access-control-allow-origin: *`.
- **Ei standalone-tilaa.** `navigator.standalone` vaikuttaa pelissä
  vain lokiriviin (`itsenainen=`) ja kehittäjäikkunan tekstiin, ei
  avauspolkuun — tarkistettu koodista (js/main.js 1551, js/pollo.js
  6642, satelliitti-avaruus.js 1706).

Ajot: 5 täyttä WebKit-ajoa (à 6 avausta) ja 4 Chromium-ajoa + 3
Chromium iPhone -koeajoa. Kesto per selain × kotelo × 3 avausta noin
80–100 s.

## 3. Taulukko (viimeinen täysi ajo 10.49–10.56, kuvat tästä ajosta)

| Selain | Kotelo | Avaus | Pisteitä | Puute | Kirkkaus keski 1 s / 5 s / 15 s | Ladonta | Reliefi | Pinta |
|---|---|---|---|---|---|---|---|---|
| webkit | 2539×1321 | 1 | 64 | ei | 45 / 93 / 99 | 8192×4096 ok | 8k 1390 ms | maasto näkyy |
| webkit | 2539×1321 | 2 | 64 | ei | 46 / 95 / 98 | 8192×4096 ok | 8k 1253 ms | maasto näkyy |
| webkit | 2539×1321 | 3 | 64 | ei | 45 / 93 / 99 | 8192×4096 ok | 8k 1264 ms | maasto näkyy |
| webkit | 390×844 | 1 | 64 | ei | 100 / 91 / 99 | 2048×1024 ok | 4k 349 ms | maasto näkyy |
| webkit | 390×844 | **2** | 64 | **ei** | **2 / 6 / 8** | 2048×1024 ok | 4k 208 ms | **MUSTA** |
| webkit | 390×844 | 3 | 64 | ei | 100 / 91 / 99 | 2048×1024 ok | 4k 204 ms | maasto näkyy (*) |
| chromium | 2539×1321 | 1 | 64 | ei | 52 / 92 / 106 | 8192×4096 ok | 8k 2541 ms | maasto näkyy |
| chromium | 2539×1321 | **2** | 64 | **ei** | **0 / 0 / 0** | 8192×4096 ok | 8k 2307 ms | **MUSTA** |
| chromium | 2539×1321 | 3 | 64 | ei | 52 / 92 / 106 | 8192×4096 ok | 8k 2301 ms | maasto näkyy (*) |
| chromium | 390×844 | 1 | 64 | ei | 100 / 90 / 100 | 2048×1024 ok | 4k 1459 ms | maasto näkyy |
| chromium | 390×844 | **2** | 64 | **ei** | **0 / 0 / 0** | 2048×1024 ok | 4k 1377 ms | **MUSTA** |
| chromium | 390×844 | 3 | 64 | ei | 100 / 90 / 101 | 2048×1024 ok | 4k 1392 ms | maasto näkyy (*) |

(*) Avaus 3 ei ole puhdas mittaus tässä ajossa: mustan avauksen 2
perään ajettu erittely (osio 4) vaihtoi materiaalin uuteen, ja se
korjaa tilan seuraavaan avaukseen. Aiemmissa ajoissa ilman erittelyä
Chromiumin avaukset 2 **ja** 3 olivat mustia (4/4 ja 4/4), WebKitissä
ajossa 10.20 mustia olivat 2539-kotelon avaus 3 sekä 390-kotelon
avaukset 2 ja 3 (kirkkaus 0 / 0 / 0), ajoissa 10.07 ja 10.39 ei yksikään.

Kaikissa 61 avauksessa: `kirjasto yritys=0 ok=1` (116–383 ms),
`avaruus-alku hukassa=0`, kaikki `vaihe ... ok=1`, `ladonta ok=1
tapa=suodatin` ensimmäisellä yrityksellä, `valmis syy=blob`, vartija
`puute=ei pisteita=64` sekä 2,5 s että 12 s kohdalla. 64 pistettä on
DOMissa jo ensimmäisessä näytteessä (< 0,5 s Aktivoi-napautuksesta).
Ei sivuvirheitä. Pisteitä-nolla-tilaa ei syntynyt kertaakaan.

Kuvat (docs/raportit/kuvat/, ≤ 178 kt):

- `astro-webkit-webkit-webapp-1-20260917.jpg` — WebKit 2539×1321, ehjä
- `astro-webkit-webkit-webapp-3-20260917.jpg` — WebKit 2539×1321, avaus 3 ehjä
- `astro-webkit-webkit-iphone-1-20260917.jpg` — WebKit 390×844, ehjä
- **`astro-webkit-webkit-iphone-2-20260917.jpg`** — WebKit 390×844, avaus 2: musta pallo, 64 pistettä, ISS-rata, loki `vartija puute=ei pisteita=64` — sama kuva kuin Codexin kohta 37
- `astro-webkit-chromium-webapp-1-20260917.jpg` — Chromium 2539×1321, ehjä
- **`astro-webkit-chromium-webapp-2-20260917.jpg`** — Chromium 2539×1321, avaus 2: musta
- **`astro-webkit-chromium-iphone-2-20260917.jpg`** — Chromium 390×844, avaus 2: musta
- `astro-webkit-mittaus-20260917.json` — kaikki mittaukset (pistesarjat, kirkkaussarjat, diag-rivit, erittelyt)

## 4. Mustan pinnan erittely — mistä musta tulee

Kun keskipiste oli musta 15 s kohdalla, skripti mittasi samassa
sivussa (neljä mustaa avausta, WebKit ja Chromium, tulokset
identtiset):

| Koe | Tulos |
|---|---|
| Piirtääkö kehyssilmukka? | kyllä, 33–60 kehystä/s (`renderer.info.render.frame`) |
| WebGL-kankaan oma keskipikseli (`readPixels` heti `render()`in perään) | `[0,0,0,255]` — musta tulee WebGL:stä, ei DOM-kerroksista |
| Kalvo (`.astro-kalvo`) piiloon | yhä musta |
| `materiaali.needsUpdate = true` (+ kartta) | yhä musta |
| `globeImageUrl` sama osoite uudelleen | yhä musta |
| Kartta pois, `color.set('#ff4040')` | yhä musta — **koska `material.color` on `null`**, set ei tee mitään |
| **`material.color = new Color('#ffffff')`** | **pinta palaa: kirkkaus 65–68, maasto näkyy** |
| `color` takaisin `null`iksi | pinta jää ehjäksi (uniformi on jo saanut arvon) |
| Uusi samanluokkainen materiaali samalla kartalla | pinta ehjä |

Näkymän rakenne (valot AmbientLight π ja DirectionalLight 0,6 π,
pallo r=100 MeshPhongMaterial kartalla, laattaverkot piilossa) ja
materiaalin kaikki ominaisuudet ovat **täsmälleen samat** ehjässä ja
mustassa avauksessa; ainoa ero on `version`. Materiaalin kartta on
molemmissa ladattu `HTMLImageElement` oikeassa koossa (8192×4096 tai
2048×1024, `complete=true`).

Mekanismi globe.gl 2.46.2:n koodista (media.matkakirja.app/vendor/
globe.gl-2.46.2.min.js, `globeImageUrl`-käsittelijä):

```
globeImageUrl ? TextureLoader.load(url, t => { n.map = t; n.color = null; n.needsUpdate = true })
              : !n.color && (n.color = new Color(0))
```

1. Ensimmäinen avaus: materiaalin väri on three.js:n oletus
   (valkoinen) → pinta ehjä; tekstuurin saavuttua globe.gl asettaa
   `color = null`.
2. Linssin sulku: `pallo.globeImageUrl(lahto.kuvaUrl ?? null)`
   (satelliitti-avaruus.js 2145) — lähtöarvo on null, koska peli
   käyttää laattamoottoria → globe.gl:n toinen haara: `color` on null
   → **`color = new Color(0)` = musta**. Mitattu sulun jälkeen:
   `materiaalin väri 000000, kuva null, laatat päällä` (Chromium
   390×844, skriptin sulku-rivi). Pallo on laattamoottorin takana
   piilossa, joten mustaa ei vielä näy.
3. Seuraava avaus: `globeTileEngineUrl(null)` näyttää pallon HETI,
   `globeImageUrl(tekstuuri)` lataa tekstuurin ASYNKRONISESTI. Jos
   yksikin kehys piirtyy ennen tekstuurin saapumista, sävytin-uniformi
   (`diffuse`) saa mustan. Kun tekstuuri saapuu, globe.gl asettaa
   `color = null`, eikä three.js enää kirjoita uniformia (`null`ista
   ei ole mitä kopioida) → **musta × tekstuuri = musta pallo**, vaikka
   kartta, valot ja kangas ovat kunnossa.
4. Kilpailu selittää satunnaisuuden: WebKit lataa 2048×1024-blobin
   noin 200 ms:ssa ja ehtii yleensä ennen ensimmäistä kehystä
   (5/30 mustaa); Chromium headless on hitaampi (1,3–2,5 s) ja
   häviää aina (16/16). Codexin WebApp: avaukset 1–2 eivät edenneet
   tekstuuriin lainkaan (kohta 36), kolmas tuli tähän ansaan.

Tämä selittää myös, miksi kohdan 37 vartija päästi tilan läpi:
`avauksenPuute` katsoo osoitetta, kangasta, koteloa ja pisteitä — kaikki
kunnossa — mutta ei piirron tulosta.

## 5. Mitä tästä seuraa astro-webkit2-korjaukselle

- **16 Mpx:n kangaskatto ei ole kohdan 37 syy** eikä sen tiukentaminen
  poista mustaa palloa: 2048×1024-ladonta mustuu samalla tavalla.
  Katto voi silti olla oikea varotoimi iPad-vaakaan (pallo-musta-
  raportin ennuste), mutta se on eri asia.
- **Yhden rivin korjaus** (pilvisession valittavaksi, kumpi):
  a) sulussa `globeImageUrl(null)`-kutsun jälkeen
     `materiaali.color = new THREE.Color(0xffffff)` (tai palautetaan
     lähtöväri, joka talteen avauksessa), tai
  b) avauksessa ennen `globeImageUrl(tekstuuri)`-kutsua sama
     valkoinen väri. Color-luokan saa ilman globaalia THREE:tä
     `materiaali.specular.constructor`ista (mitattu toimivaksi).
  Vaihtoehto a) on siistimpi: linssi palauttaa pinnan täsmälleen.
- **`pinta-musta`-vartija WebGL-luennalla toimii**: mustassa tilassa
  `gl.readPixels` keskipisteestä on `[0,0,0,255]` heti oman
  `render()`-kutsun perään, ehjässä ~60–70. Luenta on tehtävä samassa
  synkronisessa askeleessa kuin piirto (preserveDrawingBuffer on pois).
- Kohta 36 (pisteitä 0) jää toistamatta sekä oikealla WebKitillä että
  Chromiumilla; sen polku ei ole tässä mittauksessa nähtävissä. Codexin
  lokissa vaiheet ja ladonta olivat ok, mutta pisteet eivät syntyneet —
  jos se toistuu WebAppissa korjauksen jälkeen, seuraava mittari olisi
  `kohteet.length` vs. `.satelliitti-piste`-määrä vs. merkkikerroksen
  olemassaolo (kalvo etsii merkkikerrosta; jos CSS2D-kerros ei synny
  standalone-tilassa, pisteitä ei ole DOMissa).

## 6. Sivuhavainnot (ei korjattu, kirjataan)

- Codexin WebApp-loki näytti `avaruus-alku kotelo=2539x1321`; tässä
  mittauksessa kotelo on 2518×1242 ensimmäisellä ja 2518×1300
  seuraavilla avauksilla (yläpalkin tila eri ensimmäisen sulun
  jälkeen). Ei vaikuta tulokseen, mutta tarkoittaa että linssin
  ensimmäinen ja toinen avaus eivät lähde samasta laudan tilasta.
- WebKit-kaappauksissa 2539×1321-kotelolla pallon ympärillä erottuu
  kotelon suorakaide taustaa hieman vaaleampana (astro-webkit-webkit-
  webapp-1). Chromiumissa sama. Kosmeettinen; ei liity vikaan.
- Playwright-napautukset kestävät Chromium headlessissa raskaalla
  WebGL-sivulla 7–15 s (WebKitissä 2,2–2,4 s) — savukkeiden
  aikamittarit on syytä käynnistää vasta Aktivoi-napautuksesta, kuten
  tämä skripti tekee.

## Fablelle

**Kohta 37 toistuu oikeassa WebKitissä ja Chromiumissa, kohta 36 ei.**
Juurisyy mitattu: globe.gl asettaa pallon materiaalin värin mustaksi
(`Color(0)`), kun linssin sulku kutsuu `globeImageUrl(null)`; seuraavassa
avauksessa musta jää sävyttimeksi, jos yksikin kehys piirtyy ennen
tekstuurin saapumista. Ei liity 8k-kokoon eikä 16 Mpx:n kattoon.

| Selain | Kotelo | Avaukset mustia (kaikki ajot) | Pisteitä 0 |
|---|---|---|---|
| WebKit 26.5 | 2539×1321 dpr 1 | 1 / 15 | 0 / 15 |
| WebKit 26.5 | 390×844 dpr 3 | 4 / 15 | 0 / 15 |
| Chromium 151 | 2539×1321 dpr 1 | 6 / 6 uudelleenavausta | 0 / 12 |
| Chromium 151 | 390×844 dpr 3 | 10 / 10 uudelleenavausta | 0 / 19 |

Korjausehdotus astro-webkit2:lle: sulussa `globeImageUrl(null)`-kutsun
jälkeen `materiaali.color = new Color(0xffffff)` (Color-luokka
`materiaali.specular.constructor`); `pinta-musta`-vartija WebGL-
readPixelsillä toimii (mitattu 0,0,0 mustassa, ~65 ehjässä). Todennan
korjauksen samalla skriptillä (`SELAIMET=webkit,chromium`, 3 avausta).

Kesto: noin 85 min (lukeminen 10, skripti ja CORS-selvitys 20, ajot
5 × 6–7 min, erittely 15, raportti 10). Skripti ja kuvat haarassa
`claude/bold-ride-vow4ki-webkit-toisto`.
