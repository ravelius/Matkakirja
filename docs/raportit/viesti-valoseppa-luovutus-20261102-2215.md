# Valosepän luovutus 2.11.2026 klo 22.15

Syy: konteksti 25 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261102-2150.md (pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 21.56–22.1x).
Tulivuorityön tila ja skriptit: `_tyo/linssiseppa2/tulivuoret/TYO-SARJA.md` (osio "Tehty 21.5x–22.3x").

## TEHTY TÄSSÄ SESSIOSSA (proto linssiseppa2/tulivuoret-sarja, worktree wt/proto-linssiseppa2-tulivuoret, pushattu natiivi-backupiin, EI junaan)
- Sarytšev: d4046b2a9 (tuhkavana Lt 120 km, tuhkakerroin 1,5, varjon paino tuhkalle) + 026732a14 (PT 22.0x: kanteen lämmin
  harmaanbeige usva, tuhkalaatta ≥ 35 %). Pari sarja8/sarytsev-pari.jpg (skriptit/kokoa-pari.py). **PT KUITTASI sarja8:n.**
  Pieni jatko (ei estä): aukon itäreunan kirkas valkoinen kaari s3-47:ssä.
- Etna: menetelmä **PT:n kuittaama** (SUUNNITELMA-ETNA-20261102.md: vain purkaus alfakerroksena pelin maan päälle). Oikaisukoe 19018
  **PT:n kuittaama**. Kameramallit maapisteistä (skriptit/etna-kamera.py; 19018 rms 17 px, 19016 rms 14 px), oikaisu
  rantaviivatarkistuksella (Natural Earth 10 m, PD). Pelilauta leivottu: skriptit/etna-leivo.py → aito/etna-sarja (4096², 560 km,
  137 m/px, Etna uv 0,5/0,911, korkeus 4 km): lähiosa 19018, vana ~450 km etelään 19016:sta (levenee ~15 → 50+ km), valkoinen höyry,
  vanan väri erotettu taustasta, kumpupilvikentät pois. Esikatselu etna-koe/lauta3.jpg. **EI VIELÄ PELISSÄ.**

## JONO (seuraaja jatkaa tästä)
1. **Etna peliin** (PT 22.2x: pari aito | peli + ylilento PT:lle): kopioi aito/etna-sarja → Resources/Tulivuoret/etna-sarja (.meta
   sarytsev-sarjan mallista, uusi guid, maxTextureSize 4096); Tulivuoret.cs Etnalle Sarja = "etna-sarja" ja laudan korkeus 4 km
   (RakennaSarja käyttää KansiKm:ää → lisää erillinen SarjaKm, ettei v6 saa pilvikantta); skenaario Sarytševin sk-sarja8.txt:n
   mallilla (hetki etna-2002, siirto Etnan pohjoispuolelle, katse 82/47 + laaja); pari skriptit/kokoa-pari.py:n tapaan (aito 19018 ja 19022).
   Tunnettu: kaukainen vana vaaleanharmaa (aidossa ruskeampi) → tarvittaessa sävy 19018:n ruskeaan etäisyyden mukaan.
2. OMISTAJAN PÄÄTÖS 21.17 (PT): juoksupelin sadesäällä vesi syöksyy terassien marmorikaiteiden lohikäärmeenpäistä; Etnan jälkeen,
   sääsysteemiin kytkentä PK:n kanssa. Suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261102-juoksupeli-arkiset-hahmot.md kohta 7.3.
- Tunnettu (Sarytšev): ohut vaalea viiva/vana laudan alla, selvittämättä.

## Worktreet (proto)
- wt/proto-linssiseppa2-tulivuoret: linssiseppa2/tulivuoret-sarja 026732a14.
- wt/proto-linssiseppa2-seinat218: koehaarat (salipinnat-218, v112-218, c3-218), EI junaan.
