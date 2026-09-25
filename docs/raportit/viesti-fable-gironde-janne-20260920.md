# Karttaseppä → Fable: Gironden kaksoisviiva — mitattu juurisyy ja korjaus (20.9.2026)

Haara `karttaseppa-gironde` (pohja origin/v1973-prep). Erä 1 tilauksesta
"maan polygonin täyttö kehän alle" — mittaus muutti suunnitelman, ks. luku 3.

## 1. Mitä omistaja näki

Kaappaukset `docs/raportit/kaappaukset/omistaja-20260920/gironde-kaksoisviiva-v1974.webp`
ja `gironde-tayton-reuna-v1979.png`: paksu kehä seuraa suistoa, mutta Médocin
Atlantin rannalla (Pointe de Grave → Arcachon, ~100 km) ei ole kehää eikä
rantaviivaa — näkyvissä on vain laatan meren täytön pehmeä reuna. Se on
"toinen viiva, joka kulkee suorana" (Côte d'Argent on oikeasti suora).

## 2. Mittaus (Chromium, Marseille-tallenne, kamera 45,45 N −0,95 E korkeus 0,055)

Laatat (z8 163/73, 163/74, 162/73, 162/74; pohja, ranta, FRA-väritaso) ovat
oikein: sekä pohjan meren täyttö että tasoituksen kerma seuraavat suistoa.
Pohjaa ei tarvitse polttaa.

Ruudulta luettuna (LineSegmentsGeometry instanceStart/End → asteet):
korostus SISÄLTÄÄ Médocin rannan; siinä on sama jana kuin rannikkosolussa:
−1,199 E 45,121 N → −1,260 E 44,627 N, 0,50 astetta = 55 km YHTENÄ suorana
(ne_10m + 0,006° harvennus jättää suoraan rantaan vain päät; maapolygonit.json
FRA-kärjet 741→742).

| kohta | depthTest päällä | depthTest pois |
|---|---|---|
| jänteen keskikohta −1,2295 E 44,874 N | 0 tummaa px / 2304 | 206 |
| Arcachon −1,245 E 44,70 N | 9 | 303 |
| lyhyt jana 0,16° (−1,150 E 45,20 N) | 368 | 368 |

Juurisyy on piirron geometriaa: LineSegments2 piirtää janan suorana jänteenä,
joka painuu pallon pinnan alle keskeltä R·(1−cos(θ/2)) — 0,5 asteella
9,5·10⁻⁶·R, 0,2 asteella 1,5·10⁻⁶·R. Laattakerros on itsekin pinnan jänteitä
(silmät 0,02–0,25°), ja syvyyssiirto (vektorit −12, laatat −8) kattaa vain
lyhyet janat. Pitkä jänne jää laatan alle ja syvyystesti leikkaa sen keskeltä.
Sama koskee ohutta rantaviivaa (sama jana), siksi rannalla ei ole mitään viivaa.

Ei aineiston, naulauksen eikä harvennuksen vika. savuke-maan-aariviiva mittaa
peittoa vain renkaan KÄRJISSÄ, jotka ovat aina pinnalla — siksi se oli vihreä.

## 3. Korjaus (ei polygonitäyttöä)

`js/pallovektorit.js vektorijanat`: yli `VEKTORIT_JANAN_ENIMMAISPITUUS_AST`
(0,1°) pitkät janat jaetaan tasavälein paloiksi, joiden päät ovat pinnalla
(sauman yli lyhyempää tietä). 0,1° palan painuma 3,8·10⁻⁷·R = neljäsosa
siitä, mikä mitattiin piirtyväksi. Koskee korostusta ja soluja (yksi latoja).

Polygonitäyttöä EI tehty: se ei olisi tuonut kehää rannalle (sama jänne olisi
yhä leikkautunut), vaan vaihtanut vain sen, minkä täytön reuna näkyy ilman
viivaa. Jos Fable haluaa täytön silti (laatan pehmeän 8 px:n rampin
piilottamiseksi kehän alta), se on oma erä — mutta tämän korjauksen jälkeen
Chromiumissa reuna on kehän alla eikä toista viivaa näy.

Kustannus (mitattu janamäärät, sama näkymä ennen → jälkeen): maailma 7 033 →
8 002 (+14 %), Eurooppa 22 497 → 23 048 (+2 %), Ranska 29 355 → 30 245 (+3 %),
Gironde 5 226 → 5 285 (+1 %); korostus FRA 2 111 → 2 223. Rakennus 7,9 →
16,3 ms kumulatiivisesti.

## 4. Vartiot

- `tests/pallovektorit.test.mjs`: uusi testi (palat, ketju, säde, painuma
  < 1/10, sauma), vanha janatesti alle jakorajan.
- `tools/savukkeet/savuke-korostus-janne.mjs` (harva sarja, polut
  pallovektorit/maanaariviivat/pallolaatat/maapolygonit): V1–V5 + vastakoe,
  7/7; ilman jakoa (raja 0) V1 punainen 6/7.
- `node --test tests/*.test.mjs`: 3767 testiä, 0 fail.

## 5. Avoimet asiat / ehdotukset Fablelle

1. Laitetarkistus (Laitetestaaja): Ranskan kartta, Gironde ja Médoc iPadilla —
   kehä yhtenäinen Pointe de Gravesta Arcachoniin ja Landesin rannalle.
2. Raamattuun (Fable kirjaa): Gironden juurisyy on jänteen painuma, ei täytön
   reuna; polygonitäyttö ei tarpeen tälle vialle.
3. Sama vika koskee muita suoria rantoja ja rajoja (Landes, Hollannin
   rannikko, USA–Kanada) — korjaus on yleinen, ei Ranska-kohtainen.
4. savuke-maan-aariviiva voisi mitata myös janojen keskikohtia (velka).
