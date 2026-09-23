# Sulavuus: natiivi (Unity-prototyyppi) vs. web (23.9.2026)

Ensimmäinen vertailumittaus natiivin (`Matkakirja 3D`, 3D-selvittäjän
KehysMittari.cs) ja webin (`tools/savukkeet/mittaa-sulavuus.mjs`) välillä.
Kynnykset 120 Hz -laitteelle Fable/omistajan päätöksellä: pieni tökkäys
> 12,5 ms (1,5× 8,33 ms), iso tökkäys > 33 ms. Ääni mykistettynä molemmilla
ajoilla (omistajan pysyvä sääntö 23.9.2026).

## Laitteet

- **Natiivi**: iPad Pro 11" (M5), fyysinen laite USB:ssä, 120 Hz ProMotion.
- **Web**: Chromium (ANGLE Metal, Apple M4 Max) headless Mac Studiolla,
  `NAKYMA=puhelin` (390×844, dpr 3, kosketus), 60 Hz.

**Tärkeä huomio ennen lukuja:** natiivi ja web ajavat ERI kohdenopeuksilla
(120 Hz vs. 60 Hz) eri laitteilla — raakoja millisekunteja ei voi verrata
suoraan 1:1. Reilu vertailu on **tökkäysten osuus kunkin alustan omasta
kehysbudjetista**, ei absoluuttinen ms-luku.

## Reitti

Natiivilla ei voi ajaa sormipanorointia/nipistystä komentotiedostolla
(3D-selvittäjän vahvistus 23.9.) — vain kamera-ajo (`aja lat lon kaari s`)
vastaa web-version "lento"-vaihetta. Pan/zoom/nipistys jäävät siksi tässä
kierroksessa vain webin puolelle; natiivin kosketustestit vaativat
myöhemmin joko käsin tehdyn kosketuksen tai erillisen syöteautomaation.

**Natiivi** (`Documents/komento.txt`): `kaupunki marseille` → lepo 2 s →
kamera-ajo Pariisiin (`aja 48.8 4.5 8 1.5`) → `pallo`-näkymä 3 s.

**Web**: vakioreitti `mittaa-sulavuus.mjs`:stä (lepo, panorointi, zoom,
nipistys, loitonnus, lento Marseille→Pariisi, heitto) — laajempi kuin
natiivin reitti tässä kierroksessa.

## Tulokset

| Vaihe | Alusta | Kehyksiä | p50 | p95 | p99 | max | Pieniä tökk. (>12,5/>16,7ms*) | Isoja tökk. (>33ms) |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| lepo | natiivi 120 Hz | 241 | 8,34 | 8,75 | 8,89 | 9,01 | 0 (0 %) | 0 (0 %) |
| lepo | web 60 Hz | 120 | 16,7 | 16,8 | — | 16,8 | 0 (0 %)* | 0 (0 %) |
| ajo / lento | natiivi 120 Hz | 241 | 8,33 | 8,73 | 8,92 | 9,00 | 0 (0 %) | 0 (0 %) |
| ajo / lento | web 60 Hz | 114 | 16,7 | 16,7 | — | 16,8 | 0 (0 %)* | 0 (0 %) |
| pallo / zoom | natiivi 120 Hz | 361 | 8,33 | 8,55 | 8,84 | 8,97 | 0 (0 %) | 0 (0 %) |
| pallo / zoom | web 60 Hz | 441 | 16,7 | 16,8 | — | 16,8 | 0 (0 %)* | 0 (0 %) |
| panorointi | web 60 Hz (ei natiivivastinetta) | 394 | 16,7 | 16,8 | — | 16,8 | 0 (0 %) | 0 (0 %) |
| nipistys | web 60 Hz (ei natiivivastinetta) | 216 | 16,7 | 16,8 | — | 16,8 | 0 (0 %) | 0 (0 %) |
| loitonnus | web 60 Hz (ei natiivivastinetta) | 216 | 16,7 | 16,7 | — | 16,8 | 0 (0 %) | 0 (0 %) |
| heitto | web 60 Hz (ei natiivivastinetta) | 192 | 16,7 | 16,7 | — | 16,8 | 0 (0 %) | 0 (0 %) |

\* Webin oma "yli 20 ms" -kynnys (ei sama kuin natiivin 12,5 ms — webin
60 Hz-budjetti itsessään on jo 16,7 ms, joten 12,5 ms -kynnys olisi
merkityksetön sille). Web-luvut yllä `osuusYli`-kentästä (yli 20 ms).

## Tulkinta

**Molemmat alustat täysin siistejä tällä kierroksella**: 0 tökkäystä,
0 % kummallakaan mittarilla, kaikki kehykset lukossa alustansa omaan
kohdenopeuteen (natiivi 8,33 ms / 120 Hz, web 16,7 ms / 60 Hz).
Ei viitteitä suorituskykyongelmasta kummallakaan puolella tässä
suppeassa reitissä (lepo + yksi kamera-ajo + pallonäkymä).

**Rajoitteet tässä kierroksessa:**
1. Natiivi ei kata pan/zoom/nipistys-kosketusta — vain kamera-ajo.
2. Web-kone (Mac Studio, M4 Max, ANGLE Metal) on paljon tehokkaampi kuin
   tuotannon todennäköinen web-kohdelaite (puhelin); natiivin iPad Pro M5
   on myös yläpään laite. Kumpikaan tulos ei siis suoraan ennusta
   suorituskykyä heikommalla laitteella.
3. Yksi ajo per alusta — ei toistoa, ei tilastollista varmuutta
   flakyn poissulkemiseksi.

## Seuraava askel

Jos natiiviin halutaan aidosti pan/zoom-vertailu, tarvitaan joko
kosketussyötteen automaatio (esim. XCTest UI-testi tai laitteen oma
gesturen toisto) tai hyväksytään kamera-ajo-vertailu ainoana yhteisenä
mittarina. Toistokierros (≥3 ajoa per alusta) suositellaan ennen
johtopäätösten tekoa tuotantopäätöksiin.

## Ympäristö

- Natiivi: iPad Pro 11" (M5), UDID 00008142-0019686E02F3801C,
  `Matkakirja 3D` (proto-3d), 23.9.2026 uusin käännös (KehysMittari.cs +
  komentotiedosto). Devicectl-luku: `Documents/mittaus-<nimi>.txt`.
- Web: `PLAYWRIGHT_JS` pinnattu `playwright@1.62.1`, `NAKYMA=puhelin`,
  `KURISTUS=1` (ei CPU-kuristusta).
- Ääni: mykistetty molemmilla ajoilla (ei erikseen todennettu tässä
  kierroksessa `currentTime`-mittarilla, koska kyseessä on kuva-/kehys-
  eikä äänitesti).
