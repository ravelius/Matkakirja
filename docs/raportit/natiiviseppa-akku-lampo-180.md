# Akku- ja lämpömittaus TF 180 (iPad Pro 13, 10.10.2026 klo 23.35–23.52)

Tilaus: PT 21.0x (omistaja: "se että akku ei kulu ja ipad kuumene niin paljon on tärkeä juttu"). Ei muutoksia ennen PT:n kuittausta.

## Ajo
- Koodi TF 180 (BUILD 180 04c2af364), Release-laitekäännös kehitys-bundlella, jotta ajo voidaan ohjata devicectl-komennoin. iPad Pro 12,9" (5. sukupolvi, iPad13,8).
- Yhtäjaksoisesti 15 min: kartta levossa 5 min → Pariisin pallokierros 5 min (opas, saapui Tuileries) → Olavinlinna 5 min (poikkileikkaus). Ääni pelin oletuksella.
- Lähtötila: iPad viileä (thermal 0), 2 h edellisestä ajosta.
- Mittari: pelin omat rivit (kehysajat 5 s välein: thermal, akku, piirretyt kehykset, GPU ms; lampo 30 s välein).
- Loki: /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-akku180-20261010-2334 (akku-tulos.md, konsoli.log, ajo.log).

**Rajoitukset:** iPad oli johdossa ja täynnä (lataus Full), joten akkuprosentti pysyi 100:ssa eikä kerro kulutusta. Instruments Power Profiler
(xctrace, koko järjestelmä) ei tallentanut: Power Profiler -pohja hylkäsi --all-processes-tilan, eikä --attach löytänyt prosessia. Blank-pohjalla
tallennus käynnistyi, mutta jäi jumiin aikarajan jälkeen ilman dataa, ja suljettiin. Kulutus arvioidaan siksi GPU-kuormasta (GPU ms × piirretyt kehykset)
ja lämpötilasta. Varsinainen akkuprosenttimittaus vaatii, että iPad irrotetaan johdosta (omistaja paikalla) tai että ajo tehdään langattomasti.

## Tulos
| Vaihe | fps (piirretty) | GPU ms / kehys | GPU-kuorma | Lämpö |
|---|---:|---:|---:|---|
| Kartta levossa | 4,9 (silmukka 30 Hz, piirto 1/60) | 27,1 | 13 % | normaali koko 5 min |
| Pariisin pallo, 60 fps | 58,9 | 17,8 | **~100 %** (GPU täynnä) | normaali → **kuuma 2 min 10 s:ssa** |
| Pariisin pallo, 30 fps (peli laski itse kuumana) | 30,9 | 14,5 | 45 % | kuuma loppuun asti |
| Olavinlinna | 29,9 | 17,3 | 52 % | kuuma koko vaiheen (jäi Pariisista) |

Lämpö ei laskenut 9,5 minuutissa 30 fps:llä takaisin normaaliksi. Peli siis pitää iPadin kuumana, kun se on kerran kuumentunut.

## Säästöehdotukset (vaikutus = arvio GPU-kuormasta ja lämmöstä; ei toteutettu)
1. **Pallokierros 30 fps (tai 40 fps ProMotionilla) myös viileänä.** Nyt 60 fps täyttää GPU:n, ja iPad kuumenee 2 minuutissa. 30 fps:llä GPU-kuorma on
   45 % (−55 %). Arvio: iPad pysyy normaali/lämmin-tilassa, ja SoC-teho laskee pallossa noin 35–45 %. Hinta: pallon liike on vähemmän sulava.
   40 fps (iPad Pro 120 Hz) ≈ −35 % ja sulavampi.
2. **Lämpösääntö aikaisemmaksi: 60 → 30 fps jo tilassa "lämmin" (thermal 1) eikä vasta "kuuma" (2).** Arvio: kuuma-tila jää useimmiten tulematta.
   Kuumana iOS itse kuristaa, ja akku kuluu lämpöhäviöihin. Vaikutus näkyy vain pitkissä istunnoissa.
3. **Kartan lepo: pelisilmukka 30 Hz → 10 Hz, kun kuva on paikallaan (piirto on jo 1/60).** CPU herää 3× harvemmin. Arvio: koko laitteen teho
   −5–10 % kartalla levossa (näyttö hallitsee). Riski pieni: kosketus nostaa heti takaisin 30/60 Hz:iin.
4. **Olavinlinna ja kaupungit: renderöintiresoluutio 0,8×, kun lämpö ≥ lämmin.** GPU ms/kehys −25–35 %. Hinta: kuva hieman pehmeämpi kuumana.
5. **Kaupunki ja linna paikallaan (ei kosketusta, ei kameraliikettä): piirtoväli kuten kartalla** (OnDemandRendering, animaatiot 15–20 fps).
   Arvio: GPU-kuorma −50–70 % paikallaan katsellessa. Isompi muutos, koska vesi, hahmot ja liekit animoituvat.

Suositus: 1 + 2 ensin (pieni muutos, suurin vaikutus lämpöön), sitten 3. 4 ja 5 vasta mittauksen jälkeen. Varmistus: sama 15 min ajo ennen/jälkeen
ja akkuprosentti johdotta (omistajan paikalla ollessa).

## Uusintamittaus juna 181 (säästökatot 1–3, 11.10.2026 klo 00.21–00.38; 5eb15ef80, sama 15 min ajo, lähtö viileänä)
| Vaihe | TF 180 | Juna 181 |
|---|---|---|
| Kartta levossa | silmukka 30,4 Hz, piirto 4,9 fps, GPU 13 % | silmukka **12,8 Hz** (−58 %), piirto 4,5 fps, GPU 12 %; normaali |
| Pariisin pallo | 59 fps, GPU ~100 %, **kuuma 2 min 10 s:ssa** | **40 fps, GPU 59 %**, kuuma vasta **4 min 50 s:ssa** |
| Olavinlinna | 30 fps, GPU 52 %, kuuma | 30 fps, GPU 51 %, kuuma (jäi Pariisista) |

- Lämmin-sääntö (kohta 2) ei lauennut: iPad Pro 13 hyppäsi molemmissa ajoissa suoraan nominal (0) → serious (2), eikä fair (1) näkynyt
  5 s:n näytteissä. Sääntö on silti voimassa laitteille, joilla fair-tila näkyy (iPhone).
- Pallo 40 fps siirsi kuumaksi menon 2 min 10 s → 4 min 50 s, mutta 5 minuutin yhtäjaksoinen pallo kuumentaa iPadin yhä. Johdossa ja täynnä
  (lataus Full) laite on lämpimämpi kuin akulla, joten johdoton ajo voi näyttää paremmalta.
- Seuraava askel (ei toteutettu, PT päättää): pallon katto 30 fps (GPU ~45 %) tai kohta 4 (renderScale 0,8 pallossa), ja johdoton akkuajo tiistaina.
- Loki: /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-akku181-20261011-0020 (akku-tulos.md).
