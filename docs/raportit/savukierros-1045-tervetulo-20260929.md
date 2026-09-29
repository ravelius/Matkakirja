# 1.0.45 61f5adc2 (Laitetestaaja, 29.9.2026 klo 10.4x-10.5x)

Käännös 61f5adc2 (juna/b13 73e10f44 = BUILD 44 (yhdistelmä) + Linssisepän Pulun ISS-tervetulo +
linssiesittelyt), laite 1572C658 (iPhone). Natiivisepän pyynnöstä, kohdat 1-4. Kaikki PASS.

## 1) Asennus ja käynnistys: PASS
Puhtaasti, ei virheitä. (Unity-vienti käynnissä rinnalla — latausajat pidempiä, huomioitu.)

## 2) Pulun ISS-tervetulo: PASS
Ensimmäinen luonnollinen ISS:n rinnalla -sisäänmeno EI näyttänyt tervetuloa (muisti merkittiin
"kuultu" heti, todennäköisesti aiemman laajan testihistorian takia tällä simulaattorilla tässä
sessiossa — Äänimaisema oli myös aluksi POIS, joka olisi estänyt sen kokonaan). Testasin
debug-työkalulla `ui linssi tervetulo [tila|nollaa|aloita]` (Linssiseppä-speksin mukainen):
Äänimaisema päälle (`ui valikko`) → `nollaa` → `aloita` sisällä ISS-kyydissä → **jakso eteni
täydestä alusta loppuun**: "Puhuu" → sanotut kasvoi kuudeksi repliikiksi [iss-a-1, a-2, b-1, b-2,
c-1, c-2] → "Valmis", toimet [pyorayta rappaise palaa] suoritettu, kamera palasi lepoon, kuva
kiinni. `aani mittaa` vahvisti äänen soivan kesken jakson (rms 0,065, kaksi lähdettä: Pulun
äänite + taustamaisema). Taulu alkoi avautua automaattisesti jakson päätyttyä (näkyi ruudulla).
Täsmää Linssisepän omaan 9/9 PASS -raporttiin.

## 3) Pulun taulu ja kuvan selite: PASS
`linssi satelliitti` → Pulu-napautus avasi taulun suoraan (Santorini-kuva) kuten 1.0.43:ssa.

## 4) Lyhyt: radio tila, nostokortin kaiutin, luennan alku: PASS
- Radio (Lontoo, RESONANCE 104.4 FM): rms 0,129 → 5 s kuluttua rms 0,260, tappikutsut 67 → 77,
  "moottori käy".
- Nostokortti (skandaali:shakkiturkkilainen) kaiutin: rms 0,092.
- `puhe alku` → "ok alku uusi (kohdetasolla)" — 1.0.44:n korjaus edelleen aktiivinen.

## Yhteenveto
1-4 kaikki PASS. ISS-tervetulo toimii Linssisepän speksin mukaisesti kun testattu oikeista
lähtöehdoista (Äänimaisema päällä, muisti nollattuna) — luonnollinen ensitrigge­röinti epäonnistui
tässä sessiossa vain testihistoriasta/äänet-pois-oletuksesta johtuen, ei koodivirheestä.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
