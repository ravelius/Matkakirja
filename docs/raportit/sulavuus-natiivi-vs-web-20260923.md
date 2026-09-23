# Sulavuus: natiivi (Unity-prototyyppi) vs. web (23.9.2026)

Ensimmäinen vertailumittaus natiivin (`Matkakirja 3D`, 3D-selvittäjän
KehysMittari.cs) ja webin (`tools/savukkeet/mittaa-sulavuus.mjs`) välillä.
Kynnykset 120 Hz -laitteelle Fable/omistajan päätöksellä: pieni tökkäys
> 12,5 ms (1,5× 8,33 ms), iso tökkäys > 33 ms. Ääni mykistettynä molemmilla
ajoilla (omistajan pysyvä sääntö 23.9.2026).

## Laitteet

- **Natiivi**: iPad Pro 11" (M5), fyysinen laite USB:ssä, 120 Hz ProMotion.
- **Web (Mac Studio, headless kamera-ajo)**: Chromium (ANGLE Metal, Apple
  M4 Max) headless Mac Studiolla, `NAKYMA=puhelin` (390×844, dpr 3,
  kosketus), 60 Hz, synteettinen kamera-ajo — EI omistajan oikeaa
  kosketuskokemusta.
- **Web (iPad, omistajan oikea kosketuskierros)**: Safari iPadilla,
  omistajan oma sormiveto, v2148, 23.9. klo 12.19–12.22
  (`docs/raportit/kaappaukset/omistaja-20260923/kierros-1222-yhteenveto.md`).
  Tämä on ainoa tässä raportissa oleva OIKEA ihmisen kosketuskokemus.

**Tärkeä huomio ennen lukuja:** kolme eri mittausta, kolme eri asetelmaa.
Natiivi ja web-Mac ajavat ERI kohdenopeuksilla (120 Hz vs. 60 Hz) eri
laitteilla eikä web-Mac käytä oikeaa kosketusta. Ainoa suoraan
vertailukelpoinen pari samalla laitteella (iPad) on natiivi vs.
omistajan oikea web-kokemus — ks. taulukko "iPad natiivi vs. iPad web"
alla. Web-Mac-luvut (alkuperäinen taulukko) kertovat vain, että
headless-kamera-ajo ilman kosketusta on tökkäyksetön — ei sitä, miltä
peli tuntuu oikealla laitteella oikeasta kosketuksesta.

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

## Tulokset: iPad natiivi vs. iPad web (ainoa suoraan vertailukelpoinen pari)

Omistajan oikea kosketuskierros iPadilla, v2148, 23.9. klo 12.19–12.22
(`kierros-1222-yhteenveto.md`), verrattuna samana päivänä natiivilla
iPadilla mitattuun kamera-ajoon. **Huom:** web-luvut ovat kosketusvedosta
(oikea sormi), natiivin luvut ovat vielä kamera-ajosta (ei kosketusta) —
ei siis täysin sama syöte, ks. "Seuraava askel".

| Tila | Alusta | p95 | max | yli 20 ms -osuus |
|---|---|---:|---:|---:|
| Paljas kartta | web iPad (Safari, oikea kosketus) | 21–23 ms | 43–52 ms | 7–8 % |
| Täysi tila (1–4, keskiarvo) | web iPad (Safari, oikea kosketus) | 27–40 ms | 44–138 ms | 20–43 % |
| lepo / ajo / pallo | natiivi iPad (kamera-ajo, ei kosketusta) | 8,55–8,75 ms | 9,0–9,0 ms | 0 % |

Omistajan oma tuntuma samasta kierroksesta (kortti klo 12.4x): "Pelkkä
kartta tökki kaikkein vähiten, mutta siinäkin on yksi tökkäys yleensä...
Syöttökokeet kaikki tökkivät." — web-iPad-kosketus tökkii selvästi
mitattuna JA tuntumalla; natiivin kamera-ajo ei tökkinyt, mutta ei
myöskään testannut samaa asiaa (kosketusta).

## Tulokset: natiivi vs. web-Mac-headless (kamera-ajo, ei kosketusta)

Alkuperäinen mittaus — EI vastaa omistajan oikeaa kokemusta, ks. yllä.

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

**Korjattu johtopäätös (Fablen huomio 23.9.):** web-Mac-headless-kamera-ajo
oli 0 % tökkäystä, mutta se EI edusta omistajan oikeaa kokemusta.
Omistajan oma iPad-kosketuskierros samana päivänä (v2148) tökki
mitattavasti — paljas kartta p95 21–23 ms (yli 20 ms -osuus 7–8 %),
täydet pelitilat p95 27–40 ms (yli 20 ms -osuus 20–43 %) — ja omistaja
itse vahvisti tuntumalla: "Syöttökokeet kaikki tökkivät." Natiivin
kamera-ajo (ei kosketusta) oli 0 % tökkäystä, mutta se ei vielä testaa
samaa asiaa kuin web-iPad-kierros testasi (kosketusvetoa).

**Ei siis vielä voida sanoa, onko natiivi sulavampi kuin web** —
verrattu on kamera-ajo (natiivi) kosketusvetoon (web). Tarvitaan sama
syöte molemmilla ennen johtopäätöstä.

**Rajoitteet tässä kierroksessa:**
1. Natiivi ei vielä kata pan/zoom/nipistys-kosketusta — vain kamera-ajo.
2. Web-Mac-headless (M4 Max, ANGLE Metal) on paljon tehokkaampi kuin
   omistajan oikea iPad-Safari-kokemus, joka jo osoitti tökkäyksiä.
3. Yksi ajo per alusta (paitsi omistajan 8-osainen kierros) — ei vielä
   tilastollista varmuutta flakyn poissulkemiseksi natiivin puolella.

## Seuraava askel (sovittu Fablen kanssa 23.9.)

1. 3D-selvittäjä lisää synteettiset kosketuskomennot (veto, heitto,
   nipistys) komentoprotokollaan.
2. Aja 3 toistokierrosta natiivilla iPadilla SAMALLA reitillä kuin
   omistajan kierros (veto Pariisista etelään/itään, samat pelitilat:
   paljas kartta, oletus, kosketus suoraan, yhteinen kello, molemmat).
3. Päivitä tämä taulukko natiivi-iPad vs. web-iPad (kosketus) -parilla —
   vasta silloin vertailu on aidosti reilu.

## Ympäristö

- Natiivi: iPad Pro 11" (M5), UDID 00008142-0019686E02F3801C,
  `Matkakirja 3D` (proto-3d), 23.9.2026 uusin käännös (KehysMittari.cs +
  komentotiedosto). Devicectl-luku: `Documents/mittaus-<nimi>.txt`.
- Web: `PLAYWRIGHT_JS` pinnattu `playwright@1.62.1`, `NAKYMA=puhelin`,
  `KURISTUS=1` (ei CPU-kuristusta).
- Ääni: mykistetty molemmilla ajoilla (ei erikseen todennettu tässä
  kierroksessa `currentTime`-mittarilla, koska kyseessä on kuva-/kehys-
  eikä äänitesti).
