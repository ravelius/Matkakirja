# Astronautin kamera natiiviin: tekninen kuvaus (pallopolku)

*Linssiseppä 23.9.2026 (Sonnet-agentin luenta). Web: js/linssit/satelliitti.js, satelliitti-data.js,
satelliitti-avaruus.js, satelliitti-aani.js, satelliitti-nimiot.js, astro-sumu.js,
astronaut-kysymykset.js, css/satelliitti.css, js/livia-astronautti.js.*

## Pelaajalle

- **Avaus:** yläpalkki piiloon, vain ✕ oikeassa yläkulmassa; kartan pinnat pois (laatat, nostot,
  pisteet, rajat, nimet); Livialle kypärä; muut äänet vaikenevat. Musta otsikkokortti ≥ 1800 ms
  (otsikon häivytys 700, mustan 1100). Kamera: pallo 65 %:sta kapeimmasta sivusta, 5000 ms:n
  kuutiollinen ease-in-out lepokorkeuteen `avausKorkeus · 0,72`. Automaattikierto 0,16°/s
  ensimmäiseen kosketukseen.
- **Selailu:** vain vihreät pisteet napautettavissa (44 px:n osumasäde, lähin voittaa, vain
  kameran puolella). Nimet näkyviin alle `0,25 · avauskorkeus`, pois yli `0,29` (hystereesi).
- **Kuvanäkymä:** kuva `contain`, ✕ sulkee kuvan, selite vasemmassa yläkulmassa (otsikkorivi
  kohde — seutu; runko kuvateksti ja ⌄ lisätiedot: aineisto ja tekijä, kuvausaika, paikka,
  kuvaustapa + retkikunta + kuvaaja, kuvatunnus, lisenssi, NASA-linkit). Ensikerralla selite
  auki 1500 ms (sessionStorage per kohde). Nipistyszoomi `min(8, luonnollinen/näytetty)`.
  Pikkukuvat vasemmassa alakulmassa, jos kuvia on useita. Minipulu oikeassa alakulmassa:
  kaksi valmista kysymystä + vapaa kenttä, kaikki mallille (`polloUlkoinenKysymys`).
- **Sulku:** kuvan ✕ / Esc → pallo; linssin ✕ palauttaa pallon lähtötilaan.

## Data

`SATELLIITTI_LAHDE {aineisto, tekija, lisenssi, osoite, katalogi, haettu}`.
`SATELLIITTI_KOHTEET`: 64 kohdetta, 83 havaintoa: `tunnus, nimi, seutu, selite, lat, lon, oletus?,
havainnot[{id, aika, teksti, kuvaustapa, retkikunta, kuvaaja?, mitat [w, h], kuva, pikku, sivu?}]`.
Kuvat `https://media.matkakirja.app/linssit/astronautin-kamera/{id}~large.jpg` / `~small.jpg`
(tai NASA-ämpäri). Oletuskuva `oletus` tai uusin `aika` (satelliitti.js 291–308).
`ASTRONAUTIN_KYSYMYKSET[tunnus] = {kysymykset[2], vastaukset[…]}` (vastauksia ei näytetä).

## Piirto

- **ISS:** `lat = asin(sin i · sin u)`, `lng = solmu + atan2(cos i · sin u, cos u)`, i = 51,6°,
  `u = 360·t/75`, `solmu = −360·t/900`, korkeus 0,06 R; kaari 240 pistettä, 1,3 px,
  rgba(16,26,44,0.62); merkki 24×12 px SVG #f2f8ff; näkyy vain kameran puolella ja kiekon sisällä.
- **Aurinko:** kiinteä kalvo, varjo vasemmalla (alfa 0,55 viimeisellä 12 %:lla säteestä), valoreuna
  oikealla (0,18 / 8 %), sivuhäivytys 0,62. Ilmakehä #7fb6ff, korkeus 0,25.
- **Tähdet:** js/pallolauta/tahdet.js, siemen 20260907: kaukaiset 1200 × 0,9 #c9d4e8 [5,4–6,5] R,
  kirkkaat 260 × 1,35 #fff [4,8–5,8] R, pöly 730 × 1,3 #93a6c4 [2,6–3,4] R; kerroin 1,6.
- **Pilvet (astro-sumu.js):** kuori 1,01 R, `pilvet-bluemarble-2048.jpg` (luminanssi → alfa),
  kierto 0,5°/min, peitto 0,9 · lineaarinen [0,25 → 0,65] × avauskorkeus, napahäivytys 66–80°.
- **Avaruussumu:** kamera↔pallo-harso, kaksi kerrosta (etu 760 px, nopeus (5,5, −2,2); taka paino
  0,72, 1340 px, (−2,4, 1,3)), peitto 1,3 × → 0,15, 0,6 × → 0,62, 0,22 × → 0.
- **Maa:** natiivissa reliefisarja (Web Mercator) kylläisyydellä 0,8; web kumoaa pallon valon
  `1/(1 + 0,6·max(0, sin lat))`; reliefin alfa häivytetään navoilla [70°, 76°] ja [−52°, −58°].
- **Kamera:** `avausKorkeus` = kokoPallonKorkeus-kaava (fov 50, marginaali 0,08); zoomi
  `min = max(0,1, alt·0,084)`, `max = alt·1,3` (R-yksiköissä); lat rajataan ±55° uudelleensovituksessa.

## Pisteet ja nimiöt

Piste: hehku 28 px (rgba(93,255,168) 0,26 → 0, screen), ydin 5 px (#eafff3 → #5dffa8), ei
pulssia, fade-in 320 ms. Nimiöt (satelliitti-nimiot.js): kyljet ala → ylä → oikea → vasen,
etäisyys 11 px, rako muihin nimiöihin 2 px, muiden pisteiden ydin 6×6 px on este; edellinen kylki
ensin; ei vapaata → piiloon; järjestys aineiston järjestys; ≤ 120 ms välein.

## Ääni

Humina `https://media.matkakirja.app/matkakirja/aanet/linssit/astronautin-kamera/20260916/…mp3`
(silmukka, voima 0,45, nousu 2000 ms, taustaäänikanava). Musiikki pois (`MUSIIKKI_KAYTOSSA
false`, voima 0,11, nousu 3000). Lasku 600 ms. Osoitteet: sisältöpaketin
kokoelmat/linssiaineisto.json rivi astronautin-aanet.

## Natiivin jako

| Osa | Kuka |
|---|---|
| Data, ISS, peittokäyrät, nimiöiden ladonta, avauskamera (puhdas C#) | Linssiseppä |
| Tähtitaivas, pilvikuori, ISS-viiva ja -merkki, pisteet (Linssit-kansio) | Linssiseppä (Natiivisepän luvalla) |
| Relief-kerros kylläisyydellä 0,8, kartan pinnat pois | KarttaKerrokset (Natiiviseppä) |
| Kuvanäkymä, selite, galleria, minipulu | Natiivi-UI |
| Humina, pulun mallikutsu | Pelikoodari |
