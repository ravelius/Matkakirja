# Aikajanamoottori natiiviin: tekninen kuvaus (pallopolku)

*Linssiseppä 23.9.2026 (Sonnet-agentin luenta, tarkistettu otteittain). Kohde: js/aikajana.js
(6442 r.), js/aikajana-virrat.js, js/aikajana-virrat-laskenta.js, js/aikajana-vanat.js.
Käyttäjät: keksinnöt (pysäkkikello) ja ihmisen matka (kertomus → js/linssit/ihmisen-matka-esitys.js
ottaa kellon ja kameran). Rivinumerot viittaavat mainin tilaan 23.9.2026.*

## 1. API ja linssin `aikajana`-lohko

`kaynnistaAikajana(ui, linssi)`, `pysaytaAikajana(ui)`, `aikajanaPaalla(ui)` (6387–6442). Luokka
`Aikajana` (2459–6185). Pakolliset: `otsikko, alku, loppu, alue, tapahtumat`. Valinnaiset:
`asteikko` ('vuosi' | 'vuosiaSitten'), `yksikko` ('v. sitten'), `jakso`, `laskuri` ('valoa'),
`musiikki`, `luentajuuri`, `esittely {otsikko, teksti, kuva?, taustakuvat?}`,
`tiedeliiteAlkusanat`, `kuvasovitus`, `pienetKuvat` (true), `loppupuhe`, `loppusanat`,
`kertomus` (vaihtaa ajon esitykselle), `kertomusRunko`, `lahikuva` (434 lautayks.),
`hyppykamera`, `reitti`, `lauta`, `tummennus` (true), `virrat {virrat, retki?, vanha?, peitto?,
maamaski, vanat?, pysakit?, piirtokerroin?}`.

Pysäkki: `vuosi | vuosiaSitten, ajoitus, paikka | kaupunki, otsikko, henkilo, selite, ilmio,
ilmioSarja, kuva, kuvaToinen, kuvaAito, juttu, lat, lon, paalu, hiljainen, valinaytos {otsikko,
kertoja, pulu}`.

Ihmisen matka: `asteikko 'vuosiaSitten'`, `hyppykamera`, `reitti false`, `tummennus false`,
`virrat`, `kertomus` + `kertomusRunko`, `pienetKuvat false`, `kuvasovitus 'contain'`,
`loppupuhe`. Keksinnöt: oletusasteikko, reitti ja tummennus.

## 2. Elinkaari

1. `kaynnista` (4270): rakenne; kertomuksella `luoEsitys`, muuten musiikki. Linssimuistista
   jatketaan ilman avausjaksoa.
2. Avausjakso (4438–4629): pimennys 500 ms, kamera-ajo pimeässä 700 ms, taustan odotus ≤ 2500 ms,
   laatikko näkyviin ≥ 900 ms, taustakuvien Ken Burns kun ladattu (≤ 4000 ms). Käynnistä-nappi
   odottaa virtojen laskennan (`odotaVirtoja`); poistuma 700 ms.
3. Pysäkkikello (`kehys` 4811 → puhdas `aikajanaAskel(tila, dt, tapahtumat, tahti)` 1024–1073):
   pysäkillä viive vähenee; kello hiipii tauon aikana `0,6·(1 − viive/täysi)`; ajo nopeusprofiililla
   8 ms:n aliaskelin. Viive: paalu 3200, hiljainen 0, muu 4600 ms. Luenta pidättää: viive ≥ 900 ms
   niin kauan kuin luenta soi, katto 14 000 ms.
4. `sytyta(i)` (5263): valo, virrat.sytyta, reitti, ääni, paneeli, kamera, esilataa 2 seuraavaa.
   Hiljainen: vain piste. Välinäytös (5349): kello seis, rivit 1900 ms välein tai luennan mukaan
   (osuus 0,92), pulun kupla 600 ms, Jatka hehkuu 2500 ms.
5. Tauko/jatka (4690–4718): musiikki 0,5. Selaus `siirry(i)`: kaikki valot palavat.
6. Tiedeliite ei pysäytä kelloa; musiikki vaimenee.
7. `lopeta` (4925): kamera koko kaareen 1400 ms (ellei virrat ohjaa), loppusanat.
8. `alusta` (4736): ilman avausjaksoa. `pura` (6187): muisti talteen, kerrokset ja äänet takaisin.

## 3. Kello

- 'vuosi': paikka = vuosiluku.
- 'vuosiaSitten' (`luoAsteikko` 2152): pysäkit tasavälein `ASTEIKON_VALI = 10`, alku −5,
  loppu (n−1)·10. Lukema (2092): `i = floor(p/10), f = p/10 − i`; jos päät > 0:
  `a·(b/a)^f`, muuten lineaarinen. Käänteinen (2126): `f = ln(v/a)/ln(b/a)`.
- Näyttö: alle 1900 v. sitten → `v = round(2000 − lukema)`, "n. v jaa." / "n. |v| eKr." (2077).
- Naksahdusaskel: `[100…50000]`, 6 muutosta välillä (2010–2065).
- Nopeus (283–291): `osuus(e) = ln(1 + e/0,2) / ln(1 + 1,5/0,2)`, `nopeus = clamp(osuus, 0,035, 1)`,
  e = etäisyys pysäkkiin vuosina; perusnopeus 1 v / 260 ms.

## 4. Kamera (pallo)

- Lähikuva 434 lautayks. ruudun leveydellä (IM 560); 12000 lautayks. = 360°.
- Ennakko: ajo alkaa round(4600·0,8) = 3680 ms ennen syttymistä, päättyy 300 ms ennen; lyhin 900 ms.
- Hyppy (3746–3778): `huippu = clamp(matka·2,2, lähikuva, 1600)`, matka = kulma° · 12000/360;
  `kaari(e) = sin²(πe)`; `leveys(e) = lähikuva · (huippu/lähikuva)^kaari(e)`; e smootherstep
  `x³(6x² − 15x + 10)`; paikka isoympyrällä. Reitin kärki 0,08 edellä.
- Reitti: isoympyrä 2°:n tihennyksellä, 3 px, rgba(255,208,102,0.95).
- Loppu: kaaren laatikko, jatke pystyssä ylös 0,5 / alas 0,28, vaakana vasen 0,08 / ylös 0,14.

## 5. UI

Valot (liekki tai kolme ympyrää, säde 7, hehku ×1,9, kajo ×7; tilat palaa/nykyinen/tuleva),
tummennus rgba(10,7,5,0.86) reiällä 63 px. Karuselli: mitat [1,45, 0,62, 0,52, 0,44], väli 1,05,
heitto `clamp(v·0,18, ±3)`, ennakko 2000 ms. Paneeli: ilmiökuva tai teksti, ristihäivytys 700 ms,
ennakkohäivytys 600 ms, paluu 900 ms. Tiedeliite `avaaTiedeliite`. Kuvakierto 7000 ms.

## 6. Virrat (aikajana-virrat-laskenta.js)

- Ruudukko 720×360 (0,5°), maamaski varint-rivijuoksuina base64:nä (`puraMaamaski`).
- Per virta Dijkstra (`laskeVirta` 505–657): askelaika `km/(nopeus·kerroin)`, dx·cos(lat),
  sisämaassa kerroin `sisamaa`. Kentät: `lahteet [{lat, lon, aika}]`, `alue`/`pois`
  (pehmeäreunaiset laatikot, `reuna`, `siemen`), `nopeus` (vakio tai `[[alkaen, arvo]]`),
  `portit [{alue, avautuu, hajonta?, luisu {leveys, vuodet}}]` (luisu: `avautuu + vuodet·(−s/leveys)²`),
  `ylitykset [{a, b, ikkuna, kesto}]`, `nauhat [{pisteet [[lat, lon, aika]], sade}]`.
- Tulos `{aika, meri, edeltaja, nauhaPiste, nauhaNro}`; yhdistys: suurin aika voittaa.
- Tila (758–773): `rintama = max(600, 0,1·nyt)`, `ika = saapuminen − nyt`; tulossa:
  `peitto = smoothstep(1 + ika/nousu)`, `nousu = max(300, 0,05·nyt)`; saapunut:
  `w = max(0, 1 − ika/rintama)`. Väri `{vanha, rintama}` w:n mukaan, valinnainen `liuku`.
- Kamera seuraa rintamaa: painopiste yksikkövektoreista, leveys `clamp(2,6·hajonta + 12, 28, 100)`;
  vanoilla `clamp(W0 + 2,2·d, 30, 110)`, τ 2,5 s / 3,5 s, ≤ 12°/s, ele keskeyttää 8 s.
- Kalvo (varapolku `?virrat=kalvo`): 1440×720, bilineaarinen, kerrokset virta → retki → vanha →
  meri, päivitys 80 ms.
- Vanat (oletus, js/aikajana-vanat.js): janat instansseina, fragmenttivarjostin laskee etäisyyden
  janaan, leikataan RANTAMASKI-tekstuurilla (0,125°), leveys `leveysKm` × aluekertoimet × paksuus.
  Janat johdetaan Dijkstran `edeltaja`-ketjusta (`johdaVanat`).

## 7. Äänet ja pulu

Siirtymämusiikki (`aloitaSiirtymamusiikki`, himmennys 0,5 tauolla), ambienssi hiljaa linssin ajan,
selostus `soitaLinssiluenta` (rungot esittely, valinaytos-<vuosi>, loppu, kertomuksen jaksot),
efektit paper, keksinto, vuosi (≥ 125 ms välein). Pulu: kelluvat pois, välinäytöksen kupla,
ihmisen matkan valmiit kysymykset (`ihmisen-matka-pulukysymykset.js`), tutkimusvaihe esityksen
jälkeen (`ihmisen-matka-tutkimus.js`).

## Natiivin jako

| Osa | Missä | Kuka |
|---|---|---|
| Asteikko, kello, nopeusprofiili, kameran hyppykaari | Linssit/Ydin/Aikajana (puhdas C#) | Linssiseppä |
| Virtalaskenta (maski, Dijkstra, tila, kalvon väri) | Linssit/Ydin/Virrat (puhdas C#, kultaiset testit Nodesta) | Linssiseppä (Opus-agentti) |
| Vanat GPU:lla, kalvotekstuuri pallolle | Linssit/Unity + KarttaKerrokset | Linssiseppä + Natiiviseppä |
| Karuselli, paneeli, Tiedeliite, avausjakso, välinäytös | UI | Natiivi-UI |
| Musiikki, luenta, efektit, pulu | Äänet ja pulu | Pelikoodari |
