# Saapumisnäkymä: web vs natiivi (mitat)

Natiiviseppä (Opus-agentti), 24.9.2026 klo 16.21. Haara `natiiviseppa/saapumisnakyma` (proto-git).
Web = `origin/main` 4d6b01ff7 (Matkakirja-3d-selvittaja, `git show origin/main:…`, ei haaranvaihtoa).

## Miten mitattu

- **Web**: webin oma koodi Nodessa, `Kartta-testit/Kultaiset/tee-saapuminen.mjs <webin juuri>`:
  `maanLautalaatikko(maapolygonit.json)` → `saapumisenValjennys` → `luoPallokamera(...).kotiin({ kesto: 0, bbox })`,
  pallon `pointOfView` kirjataan. Kaupunkinäkymä samalla `kotiin({ bbox: null })`. Tulos
  `Kartta-testit/Kultaiset/saapuminen.json` (18 kaupunkia × 3 ruutua).
- **Natiivi**: `Assets/Matkakirja/Kartta/Saapumisnakyma.cs` (puhdas C#), `Kartta-testit/kaanna.sh`.
  Laatikko natiivin tapaan maarajat.jsonista (`LueMaarajat`: renkaat + muutRenkaat → `MaanLautalaatikko` → `Valjenna`).
  Taulukon maarajat = tuore vienti webin työkalulla (`tools/vienti/maarajat.mjs maarajaRivit`, skeema 1.29+, sama kuin tuotannon paketti).
  Uusiksi: `SAAPUMINEN_MITAT=mitat-taulukko.md SAAPUMINEN_MAARAJAT=<maarajat.json> ./Kartta-testit/kaanna.sh Mittaus`.
- Ruudut pisteinä (webin kotelo css-px): iPad Pro 11" vaaka 1210 × 834 (dpr 2), pysty 834 × 1210, iPhone pysty 390 × 844 (dpr 3). FOV 50° pysty.

## Webin vakiot ja lähteet (origin/main 4d6b01ff7)

| vakio | arvo | lähde |
|---|---|---|
| PALLO_FOV | 50° (pysty) | js/pallolauta/kamera.js:80 |
| PALLO_KORKEUS_MAX | 2,5 R | kamera.js:82 |
| PALLOLAUDAN_SAAPUMISLEVEYS (kaupunkinäkymä) | 240 lautayksikköä ruudun leveydellä | kamera.js:111 |
| SAAPUMISRAJAUKSEN_MARGINAALI | 0,01 → vara 1 + 2 × 0,01 = 1,02 | kamera.js:143 |
| SAAPUMISRAJAUKSEN_MAX (katto) | 2000 yksikköä (60°) | kamera.js:159 |
| SAAPUMISRAJAUKSEN_KATTOVARA | 1,10 | kamera.js:170 |
| PALLOLAUDAN_SIIRTOLEVEYS / LAHIN_LEVEYS | 120 / 60 yksikköä | kamera.js:230, 375 |
| PALLOKAMERAN_AJO_MS | 1400 ms | kamera.js:232 |
| PUHELIMEN_LAHIZOOMIN_KERROIN, PUHELIMEN_RUUTU_PX | 1,5; 480 px (dpr ≥ 2) → lähin 40 yks | kamera.js:419, 421, 427 |
| PERIMETRIN_NAYTTEET | 12 (kehä 4 × 13 pistettä) | kamera.js:615 |
| KORKEUSSOVITUKSEN_HAARUKAT, _KIERROKSET | 24, 3 | kamera.js:710–711 |
| laatikonTarve / laatikkoMahtuu | max(w, h · W/H) × 1,10 ≤ 2000 | kamera.js:1022, 1041 |
| pallonKorkeus / korkeuteenSovitus / kameranKohde / kotiin | | kamera.js:667, 769, 823, 1170 |
| SAAPUMISEN_VARA (väljennys joka suuntaan) | 0,05 | js/pallolauta/maapaneeli.js:729 (732 saapumisenValjennys) |
| SAARIVARA | 0,2 × pidempi sivu | js/maanaariviivat.js:172 (240 maanLautalaatikko) |
| SAAPUMISEN_KAUPUNKI | (0,42; 0,78) ruudusta | js/saapumisasento.js:63 (123 saapumisenPallonKohta) |
| SAATON_RAMPPI / MATKARAJAUKSEN_PALUU_MS | 0,3 / 1400 ms | js/siirtokoreografia.js:250, 599 |
| lauta (Miller) | leveys 12000, lon0 −175, pohjoinen 76 | js/packs/fokus-grc.js:871, js/fokusmitat.js:279, 291 |

Kutsujat webissä: `lauta.saavu` (lauta.js:5407) ← ui.js:22817 palaaMaanRajaukseen (maa-, bussi- ja merimatka
kaupunkiin), siirto.js:679 (lento perillä), ui.js:4378 (laudan avaus), lauta.js:5314 (paikanvaihto ilman
siirtoa, esim. mannerlento kaupasta). Avauslento: siirto.js:678 `kamera.kotiin({ kesto })` ilman laatikkoa =
kaupunkinäkymä. Reitin varteen päättyvä matka: ei ajoa.

## Natiivin kutsukohdat (PeliOhjain.Saavu → PalloKierto.AjaSaapumisnakymaan, 1,4 s, kallistus → 0)

- `Kartalle(kameraPelaajaan: true)`: uusi peli, jatka matkaa, kauppa joka siirsi pelaajan (oli kaari 18,6°).
- `Perilla`: jokainen kaupunkiin päättyvä matka (nappula, lento, ilman nappulaa); aloituslento ilman maan laatikkoa.
- `LehtiSuljettu`: lehden aikana tehty mannerlento (oli kaari 18,6°).
- Ennallaan: matkan aikaiset ajot (Napautettu/Matkalla, AloitaLiike ilman nappulaa), yleiskuva, KaupunkiMerkit, PuluChat.

## Tulokset (natiivi maarajat vs web maapolygonit)

Korkeus R = pallonsäteinä (km = × 6378,137). "PalloKierron rajoin" = mihin PalloKierto.Aja rajaa korkeuden
(MinKorkeus minKaari 3,6° kapeammassa suunnassa, MaxKorkeus täyttö 0,92); "=" = ei rajausta.

| maa | kaupunki | ruutu | tapa | natiivi lat, lon | web lat, lon | natiivi korkeus R (km) | web korkeus R (km) | ero | PalloKierron rajoin R | natiivi leveys yks |
|---|---|---|---|---|---|---|---|---|---|---|
| GRC | ateena | ipad-vaaka | Molempiin | 38,32, 23,93 | 38,33, 23,94 | 0,1458 (930) | 0,1458 (930) | 0,0 % | = | 377 |
| GRC | ateena | ipad-pysty | Korkeuteen | 38,32, 23,74 | 38,33, 23,74 | 0,1458 (930) | 0,1458 (930) | 0,0 % | = | 179 |
| GRC | ateena | iphone-pysty | Korkeuteen | 38,32, 23,74 | 38,33, 23,74 | 0,1458 (930) | 0,1458 (930) | 0,0 % | **0,1458** | 120 |
| FRA | pariisi | ipad-vaaka | Molempiin | 46,35, 2,39 | 46,35, 2,21 | 0,2047 (1306) | 0,2049 (1307) | -0,1 % | = | 529 |
| FRA | pariisi | ipad-pysty | Korkeuteen | 46,35, 2,33 | 46,35, 2,33 | 0,2047 (1306) | 0,2049 (1307) | -0,1 % | = | 251 |
| FRA | pariisi | iphone-pysty | Korkeuteen | 46,35, 2,33 | 46,35, 2,33 | 0,2047 (1306) | 0,2049 (1307) | -0,1 % | = | 168 |
| ESP | madrid | ipad-vaaka | Molempiin | 39,89, −2,49 | 39,89, −2,49 | 0,1667 (1063) | 0,1667 (1063) | 0,0 % | = | 431 |
| ESP | madrid | ipad-pysty | Korkeuteen | 39,89, −3,71 | 39,89, −3,71 | 0,1667 (1063) | 0,1667 (1063) | 0,0 % | = | 205 |
| ESP | madrid | iphone-pysty | Korkeuteen | 39,89, −3,71 | 39,89, −3,71 | 0,1667 (1063) | 0,1667 (1063) | 0,0 % | = | 137 |
| GBR | lontoo | ipad-vaaka | Molempiin | 55,60, −3,20 | 55,61, −3,20 | 0,2313 (1476) | 0,2316 (1477) | -0,1 % | = | 598 |
| GBR | lontoo | ipad-pysty | Molempiin | 55,60, −3,20 | 55,61, −3,20 | 0,2313 (1476) | 0,2316 (1477) | -0,1 % | = | 284 |
| GBR | lontoo | iphone-pysty | Korkeuteen | 55,60, −3,20 | 55,61, −3,20 | 0,2313 (1476) | 0,2316 (1477) | -0,1 % | = | 190 |
| NOR | oslo | ipad-vaaka | Molempiin | 64,97, 17,85 | 64,97, 17,85 | 0,2852 (1819) | 0,2852 (1819) | 0,0 % | = | 737 |
| NOR | oslo | ipad-pysty | Korkeuteen | 64,97, 17,85 | 64,97, 17,85 | 0,2852 (1819) | 0,2852 (1819) | 0,0 % | = | 350 |
| NOR | oslo | iphone-pysty | Korkeuteen | 64,97, 15,04 | 64,97, 15,04 | 0,2852 (1819) | 0,2852 (1819) | 0,0 % | = | 235 |
| JPN | tokio | ipad-vaaka | Molempiin | 35,32, 134,73 | 35,31, 134,38 | 0,4394 (2803) | 0,4398 (2805) | -0,1 % | = | 1136 |
| JPN | tokio | ipad-pysty | Korkeuteen | 35,32, 134,73 | 35,31, 134,38 | 0,4394 (2803) | 0,4398 (2805) | -0,1 % | = | 539 |
| JPN | tokio | iphone-pysty | Korkeuteen | 35,32, 138,52 | 35,31, 138,60 | 0,4394 (2803) | 0,4398 (2805) | -0,1 % | = | 362 |
| USA | newyork | ipad-vaaka | Kaupunkinakyma | 42,29, −73,42 | 42,29, −73,42 | 0,0929 (592) | 0,0929 (592) | 0,0 % | = | 240 |
| USA | newyork | ipad-pysty | Kaupunkinakyma | 43,82, −73,40 | 43,82, −73,40 | 0,1955 (1247) | 0,1955 (1247) | 0,0 % | = | 240 |
| USA | newyork | iphone-pysty | Kaupunkinakyma | 45,26, −73,38 | 45,26, −73,38 | 0,2916 (1860) | 0,2916 (1860) | 0,0 % | = | 240 |
| ITA | rooma | ipad-vaaka | Molempiin | 41,99, 12,56 | 41,44, 12,56 | 0,2192 (1398) | 0,2434 (1553) | -9,9 % | = | 567 |
| ITA | rooma | ipad-pysty | Korkeuteen | 41,99, 12,49 | 41,44, 12,56 | 0,2192 (1398) | 0,2434 (1553) | -9,9 % | = | 269 |
| ITA | rooma | iphone-pysty | Korkeuteen | 41,99, 12,49 | 41,44, 12,49 | 0,2192 (1398) | 0,2434 (1553) | -9,9 % | = | 180 |
| FIN | helsinki | ipad-vaaka | Molempiin | 65,18, 26,10 | 65,18, 26,10 | 0,2208 (1408) | 0,2208 (1408) | 0,0 % | = | 571 |
| FIN | helsinki | ipad-pysty | Molempiin | 65,18, 26,10 | 65,18, 26,10 | 0,2208 (1408) | 0,2208 (1408) | 0,0 % | = | 271 |
| FIN | helsinki | iphone-pysty | Korkeuteen | 65,18, 26,10 | 65,18, 26,10 | 0,2208 (1408) | 0,2208 (1408) | 0,0 % | = | 182 |
| DEU | berliini | ipad-vaaka | Molempiin | 51,25, 10,44 | 51,26, 10,44 | 0,1646 (1050) | 0,1646 (1050) | 0,0 % | = | 425 |
| DEU | berliini | ipad-pysty | Korkeuteen | 51,25, 10,44 | 51,26, 10,44 | 0,1646 (1050) | 0,1646 (1050) | 0,0 % | = | 202 |
| DEU | berliini | iphone-pysty | Korkeuteen | 51,25, 11,82 | 51,26, 11,83 | 0,1645 (1049) | 0,1646 (1050) | 0,0 % | = | 135 |
| CHL | valparaiso | ipad-vaaka | Kaupunkinakyma | −31,61, −70,52 | −31,61, −70,52 | 0,0929 (592) | 0,0929 (592) | 0,0 % | = | 240 |
| CHL | valparaiso | ipad-pysty | Molempiin | −38,21, −73,61 | −38,21, −73,61 | 0,7723 (4926) | 0,7723 (4926) | 0,0 % | = | 948 |
| CHL | valparaiso | iphone-pysty | Molempiin | −38,21, −73,61 | −38,21, −73,61 | 0,7723 (4926) | 0,7723 (4926) | 0,0 % | = | 636 |
| IDN | jakarta | ipad-vaaka | Korkeuteen | −2,52, 108,26 | −2,53, 108,28 | 0,3392 (2163) | 0,3396 (2166) | -0,1 % | = | 876 |
| IDN | jakarta | ipad-pysty | Korkeuteen | −2,52, 107,00 | −2,53, 107,00 | 0,3390 (2162) | 0,3394 (2165) | -0,1 % | = | 416 |
| IDN | jakarta | iphone-pysty | Korkeuteen | −2,52, 107,00 | −2,53, 107,00 | 0,3390 (2162) | 0,3394 (2165) | -0,1 % | = | 279 |
| BEL | bryssel | ipad-vaaka | Molempiin | 50,50, 4,45 | 50,50, 4,45 | 0,0421 (269) | 0,0421 (269) | 0,0 % | **0,0674** | 109 |
| BEL | bryssel | ipad-pysty | Korkeuteen | 50,50, 4,35 | 50,50, 4,35 | 0,0489 (312) | 0,0489 (312) | 0,0 % | **0,0977** | 60 |
| BEL | bryssel | iphone-pysty | Korkeuteen | 50,50, 4,35 | 50,50, 4,35 | 0,0486 (310) | 0,0486 (310) | 0,0 % | **0,1458** | 40 |
| NLD | amsterdam | ipad-vaaka | Molempiin | 52,14, 5,27 | 52,14, 5,27 | 0,0580 (370) | 0,0582 (371) | -0,2 % | **0,0674** | 150 |
| NLD | amsterdam | ipad-pysty | Korkeuteen | 52,14, 4,98 | 52,14, 4,98 | 0,0580 (370) | 0,0582 (371) | -0,2 % | **0,0977** | 71 |
| NLD | amsterdam | iphone-pysty | Korkeuteen | 52,14, 4,89 | 52,14, 4,89 | 0,0580 (370) | 0,0582 (371) | -0,2 % | **0,1458** | 48 |
| DNK | kobenhavn | ipad-vaaka | Molempiin | 56,16, 10,38 | 56,17, 10,38 | 0,0671 (428) | 0,0673 (429) | -0,2 % | **0,0674** | 174 |
| DNK | kobenhavn | ipad-pysty | Korkeuteen | 56,16, 10,56 | 56,17, 10,56 | 0,0671 (428) | 0,0673 (429) | -0,2 % | **0,0977** | 82 |
| DNK | kobenhavn | iphone-pysty | Korkeuteen | 56,16, 11,34 | 56,17, 11,34 | 0,0671 (428) | 0,0673 (429) | -0,2 % | **0,1458** | 55 |
| PRT | lissabon | ipad-vaaka | Molempiin | 39,60, −7,85 | 39,59, −7,85 | 0,1087 (693) | 0,1090 (695) | -0,3 % | = | 281 |
| PRT | lissabon | ipad-pysty | Molempiin | 39,60, −7,85 | 39,59, −7,85 | 0,1087 (693) | 0,1090 (695) | -0,3 % | = | 133 |
| PRT | lissabon | iphone-pysty | Korkeuteen | 39,60, −7,85 | 39,59, −7,85 | 0,1087 (693) | 0,1090 (695) | -0,3 % | **0,1458** | 89 |
| RUS | moskova | ipad-vaaka | Kaupunkinakyma | 57,15, 38,71 | 57,15, 38,71 | 0,0929 (592) | 0,0929 (592) | 0,0 % | = | 240 |
| RUS | moskova | ipad-pysty | Kaupunkinakyma | 58,69, 38,75 | 58,69, 38,75 | 0,1955 (1247) | 0,1955 (1247) | 0,0 % | = | 240 |
| RUS | moskova | iphone-pysty | Kaupunkinakyma | 60,13, 38,80 | 60,13, 38,80 | 0,2916 (1860) | 0,2916 (1860) | 0,0 % | = | 240 |
| AUS | sydney | ipad-vaaka | Kaupunkinakyma | −32,21, 151,68 | −32,21, 151,68 | 0,0929 (592) | 0,0929 (592) | 0,0 % | = | 240 |
| AUS | sydney | ipad-pysty | Korkeuteen | −27,26, 135,08 | −27,26, 140,79 | 0,6833 (4358) | 0,6843 (4364) | -0,1 % | = | 839 |
| AUS | sydney | iphone-pysty | Korkeuteen | −27,26, 142,46 | −27,26, 148,18 | 0,6834 (4359) | 0,6843 (4364) | -0,1 % | = | 562 |

## Havainnot

1. **Kaava on sama kuin webissä.** Kun natiiville annetaan webin oma laatikko, 54/54 tapausta osuu webin
   `kotiin`-tulokseen: lat/lon < 1e-6°, korkeus < 1e-7 R (testit MaanNakymaKuinWebissa ja KaupunkinakymaKuinWebissa).
2. **Laatikon ero tulee viennistä, ei kaavasta.** maarajat.json on harvennettu 0,05° ja vienti pudottaa alle
   4 pisteen renkaat: ITA −9,9 % (Lampedusa puuttuu, h 508 → 460), AUS (Lord Howe puuttuu, keskipiste 5,7° lännempänä),
   JPN −0,1 %, FRA −0,1 %. Ilman muutRenkaita (pelkät `renkaat`) ero olisi GBR 15 % (Shetland), JPN 17 %, GRC 7 %, CHL 13 %,
   joten Saapumisrajaus lukee nyt myös muutRenkaat.
3. **PalloKierron lähin korkeus on webin lähintä kauempana.** Natiivin MinKorkeus (3,6° kapeammassa suunnassa)
   nostaa pienten maiden saapumisen: BEL iPhone 0,049 → 0,146 R (3×), NLD, DNK ja PRT iPhonella samoin; iPadilla
   BEL 0,042 → 0,067 R. Web: lähin 60 yks ruudun leveydellä (puhelimella 40).
4. Pehmennys: natiivi käyttää omistajan 24.9. oletusta smootherstep; web siirtoajonPehmennys (trapetsi, ramppi 0,3).

## Avoimet

- ITA/AUS-ero: Siirtosepän vienti voisi pitää pienet renkaat (tai viedä valmiin lautalaatikon maittain).
- MinKorkeus vs webin lähin (60/40 yks): muutetaanko PalloKierron minKaari webin mukaiseksi (vaikuttaa myös pelaajan zoomiin)?
