# Junan 173 iPad-jetsam: mittaus ennen korjausta (Natiiviseppä, 10.10.2026 klo 00.2x)

Laite iPad Pro 13 M1 8 Gt (00008103), Release, Pariisi, B-polku (intro pois). Mittausloki MuistiTarkka 100 ms välein:
phys_footprint (jetsam-mittari), vapaa, Metal-grafiikka (task_vm_info), malloc, VM-alueet tunnisteittain, Unityn laskurit,
Cesium-laatat ryhmittäin (Google G, omat mallit O) ja laattavalinnan kamerat.

## Tulos

- **Jetsam-raja ~5,1 Gt** (footprint + vapaa 5091–5162 Mt kaikissa ajoissa).
- **B-polun piikki = Notre-Damen oman mallin LOD0:n lataus kaupunkikierroksen alussa.** Kierroksen alkaessa laattavalintaan
  tulee 3 reittikameraa (puolikas tarkkuus) laskeutumiskameran lisäksi. Omien mallien SSE 4 valitsee ND lod0:n, ja noin
  1 s:ssa footprint nousee +650–890 Mt: malloc +350–500 Mt (kuvien purku), GPU +240–320 Mt ja pakattu muisti +180–360 Mt. Sen
  jälkeen tulee jetsam. Ajossa R3 (kerroin 2,72) piikin aikana ei latautunut yhtään Googlen laattaa (g% 100, G +0), joten piikki
  johtuu kokonaan omasta mallista. Muistivahti (2 s välein) ei ehdi reagoida.
- **Juurisyy: Notre-Damen glb:ssä 90 puukortti-instanssia ja jokaiselle oma tekstuuri.** ND lod0 ja lod1 sisältävät
  4 puumeshiä × 22–23 solmua. Cesium for Unity luo jokaiselle solmu × primitiiville oman Texture2D:n. Laitteella mitattu ND lod1
  (yksi laatta): 102 renderöijää, 103 yksilöllistä tekstuuria (96 × 1024² RGBA8 + mipit) = **557 Mt GPU:ta**, vaikka glb:ssä on
  vain 12 kuvaa (71 Mt). Lod0:n rakenne on sama, joten ND vie yhteensä ~1,1 Gt GPU:ta. Lisäksi purun CPU-kopiot jäävät muistiin:
  kaupungin avauksessa malloc +577 Mt, eikä se palaudu.
- **BUILD 172: sama data.** 172 lukee osoitinta uusin-2 → v6b. Sen ND lod1/lod0:ssa on sama 103 solmun puurakenne (tarkistettu
  glb:stä). "172 kaatuu samoin" on siis R2-datan regressio, ei koodin. **Laitteella vahvistettu (R4, 00.21):** 172:ssa omat mallit
  vievät jo avauksessa 635 Mt GPU:ta (3 laattaa: ND lod2 + lod1 + Concorde lod2). Google kertoimella 1,70 (SSE 27) on 394
  laattaa (329 Mt), ja RT:t MSAA 4× ovat 420 Mt. Footprint on 5,04–5,09 Gt ja vapaata 33–76 Mt 15 s ajan. Kierroksen alussa
  reittikamerat käynnistyvät (g% 100 → 39) → jetsam.
- **Ilman omia malleja** (diagnostiikka-asetus `omatmallit 0`) koko kierros menee läpi:
  - kerroin 4,25: fp ennen kierrosta 2,72 Gt, kierroksella max 3,94 Gt, vapaa min 1,18 Gt
  - kerroin 2,72: fp 2,82 Gt → max 4,30 Gt, vapaa min 0,82 Gt (portti ≥ 0,5 Gt täyttyy)

  Nykydatan omat mallit lisäävät ~1,0–1,2 Gt jo ennen kierrosta (kerroin 4,25: 2,72 → 3,97 Gt).
- **Kerroin 4,25:** nykyisellä kärjellä (PieniLataus) Googlen kaupunki näkyy 4,25:llä karkeana (R1-ruudut). 4,25 ei ole tarpeen,
  kun ND-puut on korjattu.

### Luokat (R1, kerroin 4,25, kaupunki vakaana ennen kierrosta, fp 3,97 Gt)

| Luokka | Mt | Sisältö |
|---|---|---|
| GPU (IOAccelerator) | ~1930 | omat mallit 749 (ND lod1 557), RenderTexturet 183, muut Unity-tekstuurit ~540 (napakalotit 106 ja latauskuvat 84 jäävät kaupunkiin), Googlen laatat 39 |
| malloc | ~1370 | Unity native ~390, loput cesium-native + omien mallien puretut kuvat |
| tunnisteeton VM | ~620 | IL2CPP-keko (GC käytössä ~480) |
| pakattu (sisältyy yllä oleviin) | ~720 | muistipaineessa pakatut sivut |

## Suositus (PT päättää ennen korjausta)

1. **Data ensin.** Ei vaadi käännöstä ja korjaa myös TF 172:n. ND lod0/lod1 uudelleen niin, että 90 puusolmua yhdistetään
   yhdeksi meshiksi per puutyyppi (4 tekstuuria, ei 90+). Väliaikaisesti puut voi myös jättää pois. Korjaus sekä v6b:hen
   (uusin-2) että v6h:hon (uusin-3). Arvio ND ~1,1 Gt → ~0,15 Gt. Lisäksi omat_mallit_tileset.py hylkää tai yhdistää glb:n,
   jossa sama mesh on useassa solmussa. Omistaja: LR / mallinrakentaja.
2. **Sovellus, juna 173** (lisää muistia: ei, vähentää). Pienellä muistilla omien mallien tilesetille: rinnakkain 2,
   preloadAncestors ja forbidHoles pois, välimuisti 64 Mt (lod1 ja lod0 eivät ole muistissa yhtä aikaa). Lisäksi lokivaroitus,
   jos oma laatta luo yli 32 tekstuuria.
3. **Kerroin:** PieniKarkeinLisa 2,5 → 1,6 (= 2,72, kuten ennen 5458e7777).
4. **Junan 173 iPad-portti uudelleen** (A + B) korjatulla datalla.

## Ajot ja työkalut

| Ajo | Käännös | Asetus | Tulos |
|---|---|---|---|
| R1 | 173 + loki 680111fb0 | kerroin 4,25 pakotettu | jetsam kierroksen 1. s (fp 3,97 → 4,86 Gt) |
| R2 | 173 + loki b5b927bda | 4,25, omatmallit 0 | läpi, vapaa min 1,18 Gt |
| R3 | b5b927bda | 2,72 | jetsam kierroksen 1. s (ND lod1 557 Mt, lod0 latautumassa) |
| R3b | b5b927bda | 2,72, omatmallit 0 | läpi, vapaa min 0,82 Gt |
| R4 | 172 + loki 65db09ce5 | 172 sellaisenaan (1,70) | jetsam kierroksen 1. s; jo ennen sitä vapaa 33–76 Mt (omat 635 Mt) |

- Lokit: `proto-3d/lokit/natiiviseppa-muistitarkka-<aika>-<ajo>/` (muisti-tarkka.log, analyysi.txt, konsoli.txt, ruudut).
- Mittausloki: proto `natiiviseppa/muistitarkka-173` (b7150aed6 → b5b927bda; Plugins/iOS/MatkakirjaMuisti.mm +
  Linssit/Unity/MuistiTarkka.cs, päälle vain tiedostolla Documents/muisti-tarkka.txt). 172-versio:
  `natiiviseppa/muistitarkka-172` 65db09ce5.
- Ajo: `proto-3d/tyokalut/natiiviseppa-ajot/muistitarkka-ipad.sh <nimi> <kerroin|0> "<asetukset|->" [intro] [s]`.
  Analyysi: `muistitarkka-analyysi.py <muisti-tarkka.log>`.
- glb-tarkistus: solmut × mesh (scratchpad glbnodes.py). ND v6h ja v6b: mesh puu_0–3 käytössä 23/23/22/22 solmussa.
