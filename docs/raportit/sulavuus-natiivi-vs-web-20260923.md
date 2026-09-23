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

## Tulokset: iPad natiivi (KOSKETUS) vs. iPad web (KOSKETUS) — reilu pari

3D-selvittäjä lisäsi synteettiset kosketuskomennot (`veto`, `nipistys`) 23.9.
klo 16.06 (PalloKierto, sama koodipolku kuin oikea sormi). Ajoin 3 toistoa
sormivedolla Pariisista etelään/itään (hidas panorointi 0,7 s + nopea
heitto 0,25 s), sama ele-tyyppi kuin omistajan web-kierroksessa.

| Tila | Alusta | Toistoja | p95 | max | yli 20 ms -osuus |
|---|---|---:|---:|---:|---:|
| Paljas kartta | web iPad (Safari, oikea kosketus, omistaja) | 2 | 21–23 ms | 43–52 ms | 7–8 % |
| Täysi tila (1–4, keskiarvo) | web iPad (Safari, oikea kosketus, omistaja) | 4 | 27–40 ms | 44–138 ms | 20–43 % |
| Pariisi-veto+heitto | **natiivi iPad (synteettinen kosketus, sama koodipolku)** | 3 | **8,39–8,51 ms** | **8,43–9,95 ms** | **0 %** |

Kaikki kolme natiivitoistoa erittäin johdonmukaisia (481/481/480 kehystä,
p95-vaihteluväli vain 0,12 ms) — ei viitteitä flakystä. **Tämä ON nyt
sama syötetyyppi (kosketusveto) molemmilla alustoilla**, samalla
laiteluokalla (iPad).

Omistajan oma tuntuma web-kierroksesta (kortti klo 12.4x): "Pelkkä
kartta tökki kaikkein vähiten, mutta siinäkin on yksi tökkäys yleensä...
Syöttökokeet kaikki tökkivät." Natiivi ei tökkinyt kertaakaan kolmessa
toistossa samalla ele-tyypillä.

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

**Lopullinen johtopäätös tälle kierrokselle (23.9., sama laite, sama
ele-tyyppi):** samalla iPadilla, samalla kosketusveto+heitto-eleellä,
natiivi (Unity-prototyyppi) on mitattavasti sulavampi kuin web
(Safari-peli) — **0 % tökkäystä vs. 7–43 % tökkäystä**. Ero on suuri
eikä selity mittaustavalla: molemmat mittaukset lukevat oikean
kosketustapahtuman käsittelevän koodipolun kehysaikoja, ei synteettistä
arviota. Kolme natiivitoistoa olivat keskenään lähes identtiset
(p95-vaihteluväli 0,12 ms), joten tulos ei vaikuta sattumalta.

**Miksi ero on näin suuri — ei vielä selvitetty tässä raportissa.**
Mahdollisia syitä (ei todennettu): web ajaa DOM/Canvas-pinossa selaimen
oman tapahtumasilmukan kautta ja rakentaa/purkaa laattoja/nimiöitä
JS:ssä per kehys (ks. omistajan kierroksen `puskulirjoitukset/kehys`
17–22 täysissä tiloissa), kun taas natiivi Unity-prototyyppi on
huomattavasti yksinkertaisempi (ei vielä täysiä pelitiloja, UI-kerroksia
tai nimiöitä samassa laajuudessa kuin web). **Vertailu ei siis vielä
ole "natiivi lopullinen peli" vs. "web lopullinen peli" — vaan "natiivin
nykyinen, suppea prototyyppi" vs. "webin nykyinen, täysi peli".** Ero voi
kaventua kun natiivi saa lisää ominaisuuksia.

**Rajoitteet:**
1. Natiivi-prototyyppi on ominaisuuksiltaan paljon suppeampi kuin web —
   ei täysiä pelitiloja (oletus/kosketus suoraan/yhteinen kello/molemmat),
   ei nimiöitä/symboleja samassa laajuudessa. Epäreilu vertailu SISÄLLÖN
   suhteen, vaikka ele-tyyppi on nyt sama.
2. Web-Mac-headless-kamera-ajon (ensimmäinen taulukko) 0 % oli
   harhaanjohtava — jätetty raporttiin vain vertailuksi siitä, miten
   paljon synteettinen kamera-ajo eroaa oikeasta kosketuksesta.
3. Vain yksi natiivin komentoreitti (Pariisi-veto+heitto) — ei kata
   nipistystä eikä pitkää istuntoa.

## Seuraava askel

1. **Ei vielä tuotantopäätöksiä tästä luvusta** — ero on rohkaiseva
   mutta johtuu todennäköisesti osin siitä, että natiivi on vielä
   kevyt prototyyppi. Toista mittaus kun natiivi saa lisää sisältöä
   (laatat, nimiöt, UI).
2. Lisää natiivin komentoreittiin nipistys-toisto (zoomivertailu
   omistajan kierroksen kanssa).
3. Kun natiivi saa web-tason sisällön, aja tämä sama koe uudelleen
   samalla menetelmällä pysyvänä sulavuusporttina natiivin julkaisulle.

## Ympäristö

- Natiivi: iPad Pro 11" (M5), UDID 00008142-0019686E02F3801C,
  `Matkakirja 3D` (proto-3d), 23.9.2026 uusin käännös (KehysMittari.cs +
  komentotiedosto). Devicectl-luku: `Documents/mittaus-<nimi>.txt`.
- Web: `PLAYWRIGHT_JS` pinnattu `playwright@1.62.1`, `NAKYMA=puhelin`,
  `KURISTUS=1` (ei CPU-kuristusta).
- Ääni: mykistetty molemmilla ajoilla (ei erikseen todennettu tässä
  kierroksessa `currentTime`-mittarilla, koska kyseessä on kuva-/kehys-
  eikä äänitesti).
