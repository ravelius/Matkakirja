# Opus → Fable: pelinäkymän panorointi ja zoom (20.9.2026)

Erä `opus-local-zoom-pan`, Matkakirja Opus local (Mac Studio), 01.40–02.20 Suomen aikaa.
Pohja `origin/claude/bold-ride-vow4ki-v1970` (b621e124). Omistaja: *"Pystyykö normaalin
pelinäkymän zoomausta ja panorointia parantamaan? Nyt vähän tökkii"*.

## Mittaustapa: tökkiminen näkyy vasta kuristetulla suorittimella

Macilla kehysaika oli vedossa sama kuin levossa (p95 26 ms molemmissa), eli mittari ei
erottanut elettä lepotilasta. Kuristin suorittimen kuudesosaan (CDP
`Emulation.setCPUThrottlingRate 6`), jolloin ero näkyi heti. Kaikki luvut alla ovat
390 × 844, dpr 2, kuristus 6×, samat eleet (2 s veto, 40 rullaklikkausta).

## Juurisyy (CPU-profiili vedon ja zoomin ajalta)

| Osuus näytteistä | Funktio |
| --- | --- |
| **10,8 %** | `kaupunkiliuska.js nimiAvain` |
| 6,3 % | globe.gl `updateMatrixWorld` |
| 2,2 % | `nostot.js paivita` |
| 1,3 % | `kaupunkiliuska.js etaisyysKm` |
| 0,7 % | `nahtavyydet.js kaupunkikartanSiirretyt` |

Ladonta ajetaan liikkeen aikana viidesti sekunnissa (`LADONNAN_TAHTI_MS` = 200), ja joka
ajolla laskettiin kaupunkien sisäiset nostot uudelleen: jokainen rivi jokaista kaupunkia
vasten, ja nimen normalisointi (`toLocaleLowerCase('fi')`) tehtiin rivien ja kaupunkien
TULONA. Jäsenyys ei kuitenkaan muutu panoroinnissa eikä zoomissa — se on datan tieto.
Lisäksi `kaupunkikartanSiirretyt` rakensi joka ladonnassa uudet oliot ja sulkeumat
jokaiselle kaupungille, vaikka lähde on vakio.

## Korjaus (kolme tiedostoa, tulos ennallaan)

1. `js/pallolauta/kaupunkiliuska.js`: uusi `luoSisaisyysTesti(kaupunki, sadeKm)` laskee
   kaupungin nimen ja keskuksen KERRAN ja palauttaa testifunktion. Noston oma nimi
   normalisoidaan kerran per rivi (WeakMap). Vertailuja on siis rivit + kaupungit, ei
   rivit × kaupungit. Haversine ajetaan vasta, kun karkea astelaatikko sallii sen.
   `onKaupunginSisainen` ja `kaupunginNostot` käyttävät samaa testiä, joten tulos on sama.
2. `js/pallolauta/nostot.js`: ladonta luo testin kerran kaupunkia kohti.
3. `js/nahtavyydet.js`: `kaupunkikartanSiirretyt` muistaa tuloksen ui-kohtaisessa
   WeakMapissa kaupungeittain.

## Mittaukset (kuristus 6×)

| Vaihe | Ennen | Vaihe 1 (jäsenyys) | Lopullinen |
| --- | --- | --- | --- |
| Panorointi, kehysajan p95 | **61,6 ms** | 34,9 ms | **17,8 ms** |
| Panorointi, pisin kehys | 157,8 ms | 150,8 ms | 109,6 ms |
| Panorointi, pitkiä tehtäviä | **29** (pisin 93 ms) | 3 (54 ms) | **0** |
| Rullazoom, p95 | 26,7 ms | 26,7 ms | 14,5 ms |
| Rullazoom, pitkiä tehtäviä | 3 (pisin 84 ms) | 0 | 0 |
| Lepo (vertailu), p95 | 26,8 ms | 26,6 ms | 24,3 ms |

Profiilissa `nimiAvain` putosi 10,8 %:sta pois kärkilistalta ja joutokäynti nousi
12 %:sta 22 %:iin.

## Vartio

Uusi `tools/savukkeet/savuke-zoom-pan.mjs` (lisätty julkaisusarjaan): kuristaa suorittimen
6×, ajaa vedon ja rullazoomin, mittaa kehysvälit ja pitkät tehtävät. Rajat ovat mitatun
korjatun ja korjaamattoman tason välissä: panoroinnin p95 ≤ 40 ms, rullazoomin p95 ≤ 30 ms,
pitkiä tehtäviä enintään 8. Väite "ele mitattiin" varmistaa, että veto ja rulla menivät
oikeasti perille.

| Ajo | Tulos |
| --- | --- |
| Vastakoe (vanha koodi) | **3/5**: panoroinnin p95 49,5 ms, pitkiä 22 (pisin 87 ms) |
| Korjattu | **5/5** |

`node --test tests/*.test.mjs`: pass 3712, fail 0. `tarkista-savukkeet`: kunnossa.

## Jäi tekemättä

- Jäljellä olevat yksittäiset piikit (109 ms) ovat eleen alussa ja tulevat laattojen
  maalauksesta (`pallolaatat.js maalaaKermaMaamaskilla`, `getImageData`). Sitä ei tässä
  erässä siirretty pois pääsäikeeltä.
- Nipistys: Playwrightin synteettinen kosketusele ei mene pelin osoitinkäsittelijöihin, joten
  kahden sormen zoomia ei mitattu. Rullazoom kulkee samaa kamerapolkua.
- Laitemittaus (iPhone/iPad) on tekemättä; kuristettu Chromium on jäljitelmä.
