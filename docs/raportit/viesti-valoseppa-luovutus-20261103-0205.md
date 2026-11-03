# Valosepän luovutus 3.11.2026 klo 02.05

Syy: konteksti 25 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261103-0145.md (jono ja pysyvät
työtavat -20261101-2124.md, -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`.
Python: `_tyo/linssiseppa2/tulivuoret/venv/bin/python`. Esikatselu vain JU:n "ESIKATSELU NYT" -viestillä (JU: local_06f8c680…),
ajossa `PROTO_LINJA=<JU:n antama linja>`, valmiina "VAPAA" JU:lle.

## KESKEN: jono 1, salamat aidoista ISS-kuvista (koe, ei junaan; PT 01.4x, PT 01.5x vahvisti)
- Lähde: NASA Gateway Technical.pl (feat=lightning, yö) → **ISS030-E-228185…228245** (Oklahoma 11.4.2012 09.21 UTC, 85 mm,
  D3S, 391 km → 38,9 m/px; PD). 61 kuvaa `_tyo/linssiseppa2/salamat-aito/large/` (skriptit/hae-oklahoma.zsh). Välähdyksettömät
  kuvat lähes mustia (ka 0,56) → välähdyskuva = valaistut pilvenhuiput sellaisenaan.
- `salamat-aito/skriptit/leivo-kartta.py`: välähdykset (huippu ≥ 0,004), ryhmät = peräkkäiset kuvat ≤ 400 px = sama salama
  (kuvat = iskut), reunalle osuvat hylätty, normitus ≤ 6×, 60 km/ruutu, kartta 4×4 × 512 (`kartta/`), `asenna-kartta.py` peliin.
  10 ryhmää, 16 ruutua (228245 ei mahtunut). Kartta: `salamat-aito/haku/kartta-pieni.jpg`.
- Proto **linssiseppa2/salamat-aito** (wt/proto-linssiseppa2-tulivuoret, natiivi-backupissa): **aaf2af3b1** Salamat.cs `_Aito=1`
  (oletus pois; oma aitoArpa) → välähdys arpoo aidon ryhmän + kierron, IskuNyt valitsee ruudun, iskukäyrä voiman; 8 levyä
  (60 km, korkeus Pohja + 1,35 × korkein kupoli + 0,5 km) SalamaAito.shader (Blend One One, _AitoKirkkaus 3); kentän sisävalo ja
  hämähäkkisalama pois aito-tilassa. **51701fe5d**: tila-riville aito-diagnostiikka (AitoRivi).
- **sal1** (aaf2af3b1, esikatselu-20261103-015921, ei virheitä): kentän valo sammui oikein aito-tilassa, mutta **aidot levyt eivät
  näy lainkaan** (alue max 10/255; ei poikkeuksia, kartta ja json latautuivat). Koonnit sal1/koonti-kiintea.jpg (ylä z25 a0|a1,
  ala laaja a0|a1), koonti-elava.jpg.
- **SEURAAVAKSI: sal2** valmiina: `salamat-aito/sal2/ajo.zsh` (51701fe5d, skenaario sk-sal2.txt = sal1 + tila aito-tilassa +
  _AitoKirkkaus=60-kuva). Pyydä JU:lta vuoro, lue unity.logista `salamat: kytkin …, aito …, levyt 8, näkyvissä N, levy0 koko …
  kerros … isVisible … kamera … far … maski …`. Epäilyt: kameran maski/kerros, far-taso, ruutu/uv, tekstuurin tuonti (ASTC).
  Kun levyt näkyvät: pari (a0 | a1 sama rajaus) + elävä sarja → PT; sitten jono 2 hurrikaani.
- Huom: `siirra 14 89` ei pitänyt asemaa paikallaan (ISS 19–20N 72E kuvien aikaan), myrsky näkyi silti vasemmalla.

## JONO (ennallaan) 2) hurrikaani 3) pimennys (PT päättänyt: 2024/2017-kuva, sijainti laskennasta) 4) tähdenlennot.
