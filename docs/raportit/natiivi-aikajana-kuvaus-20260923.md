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

## 8. Ihmisen matkan esitys (js/linssit/ihmisen-matka-esitys.js ja apumoduulit)

**Tilakone.** `luoEsitys({ajo})` (r.1118) → `{aloita, esikatsele, valitse, taukoTaiJatka, tauko,
jatka, pura, tila}`. Vaiheet `pimea → valot → matka × N → hyppy → loppu`; `aloitaJakso(i)` (2058) →
`seuraavaJakso` (2053) → `paata` (2511). Moottorin pysäkkikello ei käy.

**Ajuri on äänikello.** `kehys` (2380): `kulunut = luenta.kulunut()`, ilman ääntä seinäkello. Vaihto
luennan rajavahdista (`onRaja`, putki) tai varareitistä `kulunut ≥ kesto`.

**Vakiot (230–588):** VALOJEN 2600, KEHYKSEN_LIUKU 500, AVARUUDEN_KORKEUS 300, AVARUUDEN 7000,
AVARUUDEN_MIN 1200, ZOOMIN_JATKO 4000, AFRIKAN_VIIVE 700, TAHTIEN_HAIVE 0,55, AVARUUDEN_HARSO 0,35,
MUSTAN_OSUUS 0,35, TAHTIEN_FEIDI 1800, FEIDIN_OSUUS 0,45, LAUSEEN_HAIVE 340, TEKSTIN_LASKU 900,
OSAN_MERKIT 240, OSAN_VIRKKEET 3, PULUN_SISAANTULO 2000, PULUN_ELEEN 2200, KELAUKSEN 2400,
PULUN_VARA 2600, PULUN_VAIMENNUS_PUTKESSA 0,55, KAMERAN_POHJA 1400, KAMERAN_KATTO 9000,
KAMERAN_OSUUS 0,85, MAROKON_JARRU 0,8, MAROKON_POHJA 1600, MAROKON_TAUKO 1200, MAROKON_ESIVAIHE 1,35,
KUVAN_POISTUMA 420, LOPUN_ASETUS 1200, KUVAN_OSUUS 0,66, ESITYKSEN_LAHIKUVA 1200 (ms ellei muuta).

**Avaus** `avauksenVaiheet({lauseet, sana, kesto})` (983–1021): `afrikka = min(sanan "Afrik" hetki
+ 700, kesto)`; `musta = min(lauseet[1] ?? afrikka·0,35, afrikka − 1200)`; `feidi = min(1800,
(afrikka − musta)·0,45)`; `piste = musta + feidi`; `zoomPerus = clamp(afrikka − piste, 1200, 7000)`;
`zoomAlku = max(musta, afrikka − zoomPerus)`; `zoomKesto = zoomPerus + 4000`. Zoomi `bbox 'afrikka'`
päättyy sanan jälkeen; perillä `sytytaValot` (2243): kehys takaisin, `virrat.asetaPito(true)`
pysyvästi, musiikki; sitten kohdeajo Jebel Irhoudiin tauon 1200 jälkeen käyrällä
`marokonKaari(t) = marokonPehmennys(t^1,35)` (1040–1072, kuutiollinen kiihdytys 0,8:aan, paraabelinen
jarrutus).

**Kello jaksossa** `paivitaKello` (2360): `osuus = min(1, kulunut/luenta)`, lukema `alku + (loppu −
alku)·osuus`, `jaksonTahti` (675–690): loppu = seuraavan `vuosia`, mutta jos seuraava on hyppy,
`loppu = alku`. Hyppyjakso: ensin kelaus `min(1, kulunut/2400)` ease-in-out-neliönä
kelauksenAlku → alku, sitten normaalisti.

**Kamera jaksossa.** Kohde: `jaksonRajaus` (605–640) = kohde + jakson kellovälillä liikkuvien vanojen
kärjet 5 näytteestä [0, ,25, ,5, ,75, 1]; selkäranka ≤ 80°, haara ≤ 45°, liike ≥ 2°. Leveys
`max(1200, rajauksenLeveys(rajaus, kuvasuhde, 0,14))`. Alue: `ESITYKSEN_ALUEET` (269–284: afrikka,
afrikka-ita, keski-aasia, maailma = koko pallo), `kokonaan: true`. Kesto `clamp(luenta·0,85, 1400,
9000)`; ajo saa jäädä kesken; `paata` asettaa viimeisen rajauksen 1200 ms:ssa.
`rajauksenLeveys` (tutkimus.js 198–204): `leveysAst·(12000/360)·(1 + 2·0,12)`, korkeus × kuvasuhde,
clamp(900, 12000). `vananRajaus` purkaa antimeridiaanin (±360° lähimmäksi edellistä).

**Muut.** Kuva lampun viereen 0,66 × ruutu (`naytaKuva` 1739). `tunne` → `ilmoitaLivianTunne`.
`valitse(id)` hyppää jakson alkuun, `esikatsele(osuus)` hiljainen tauko + kelaus + vanat heti.
Muisti `jatkaMuistista` (2641): ei avausta, pito `pitoMin`, tutkimusvaiheeseen suoraan.

**Kertomus** (ihmisen-matka-kertomus.js, 20 jaksoa): `id, vaihe, kohde, hiljaiset, alue, maisema,
vuosia, teksti, luenta (ElevenLabs-tagit), pulu, tunne`.

**Luenta** (ihmisen-matka-luenta.js): `${luentajuuri}/kertomus-manifesti.json`, luentajuuri
`https://media.matkakirja.app/aikajana/ihmisen-matka/puhe`. Muoto `{tiedosto, yhtena, jaksot:
[{tunnus, alku, loppu, lauseet, sanat:[{sana, alku}]}]}`; `kesto = seuraavan alku − oma alku`,
`puhe = loppu − alku`. Putki: yksi mp3 `${juuri}/${runko}.mp3`; muuten
`ihmisen-matka-kertomus-<id>.mp3`. Varakesto `max(2500, round(merkit/14·1000))`. Pulun välihuomio
0,55, kertoja ei väisty.

**Äänimaisema** (ihmisen-matka-aanimaisema.js): `${AANI_JUURI}aanet/tehosteet/ihmisen-matka/manifesti.json`
`{tehosteet:[{tunnus, tiedosto}]}`, risti 2500 ms, voima 0,1. **Ei kytketty esitykseen webissä**
(maisema-kentällä ei ole kuluttajaa).

**Kortti, kysymykset, tutkimus, muisti.** Yksi nostokortti (20 löytöpaikkaa + 20 lisänostoa),
kuvat: `${KUVAJUURI}/<tunnus>.jpg`, esine `${ESINEJUURI}/ihmisen-matka-esine-<tunnus>-r20260907.jpg`,
lisänosto `${KUVAJUURI}/nosto/<tunnus>.jpg`. Kysymyksiin esikirjoitetut vastaukset
(`IHMISEN_MATKAN_KYSYMYKSET`), muuten pulun mallikutsu. Tutkimusvaihe: kello seis, nostot sykkivinä
pisteinä, viisi virtanappia (kääntö 1500 ms, vanan korostus, yhteenveto). Muisti
`matkakirja-linssimuisti-<tunnus>` `{versio 1, vaihe, jakso, kulunut, pitoMin, kamera, kortti,
virta, aika}`, ikä ≤ 30 vrk, ei tallenneta mustan aikana. Pulukysymykset: avoin kortti tai lähin
edeltävä kohde.
