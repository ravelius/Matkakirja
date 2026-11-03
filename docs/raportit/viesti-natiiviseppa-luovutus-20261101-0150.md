# Natiivisepän luovutus 1.11.2026 klo 01.50 (konteksti 31 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261101-0005.md (sen JONO 2–4 ennallaan alla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Yksi Unity kerrallaan linjalla (lukot). Ei keskeneräisiä ajoja eikä agentteja.
Koko 60 fps -työ: proto-3d/_tyo/natiiviseppa/fps60/LOYDOS.md (osiot "GC ja Nimikerros", "Nimikerros-korjaus", "Lado / GC / Cesium",
"Ruutuprojektio"); työkalut samassa kansiossa (README-tyyliset otsakkeet skripteissä).

## LISÄYS 01.55 (voittaa alla olevan)
- PT kuittasi ruutuprojektion: **juna 216 runko = 513998a40** (99593f61d + 6c1f3f297, puu = 6c1f3f297), testit 2223/782/575, tarkista 0,
  peilissä juna-216. JONO 1 tehty. iPadilla 6c1f3f297 = rungon puu.
- Seuraavat (PT 01.5x): GC-allokoinnit ja KokoSivuPeitto (JONO 2), sama kaava.

## JONO
1. **Ruutuprojektio 6c1f3f297 odottaa PT:n junakuittausta** (raportoitu PT:lle 01.50: Lado −42 %, KaupunkiMerkit −43 %, ≥ 16 ms ruudut
   203 → 167, vartija 0,0039 px, testit 2223/782/575, kuvaparit lokit/natiiviseppa-nimikuvat-pari-projektio-20261101).
   Kuittaus → wt/proto-natiiviseppa-ehdokas: `git merge --no-ff 6c1f3f297` → testit → peili juna-216 → runko-SHA PT:lle.
   Haara natiiviseppa/fps-projektio-216 (peilissä), worktree wt/proto-natiiviseppa-fps.
2. **60 fps -jatko samalla kaavalla** (PT: löydös + YKSI ehdotus ≤ 3 riviä → kuittaus → haara → mittaus ennen/jälkeen ilman muistitarkkaa
   + nimikuvat → junaan erillisellä kuittauksella). Jäljellä (LOYDOS "Lado / GC / Cesium"):
   - GC-allokoinnit: viipaleet ≤ 30 ms, 15 sykliä/210 s; allokoijat Nimikerros.LisaaElavat, PiiloVartija.LaskettuSuodin,
     Sisaltokerrokset.NimiNakyy, NostotKartalla.*, PalloKierto.Puhelin (SystemInfo.deviceModel joka kutsulla), EsilataaSaapumisalue.
   - KokoSivuPeitto: UQuery joka ruutu, mediaani 4 ms, ≥ 8 ms 18 kertaa.
   - Lado ruuduille pilkottuna (projektion jälkeen p99 7, max 11 ms).
   - Cesium on tasainen ~1 ms/ruutu, ei piikkien lähde.
3. **VS:n kiiltokoe piha 06** (koehaara natiiviseppa/koe67-piha06 = 5a51c8181, wt/proto-natiiviseppa-koe67, ÄLÄ poista): tulos VS:ltä ei tullut.
4. **PK:n taustan LOD -erä EI junaan 216** (PT 31.10.).

## TILA
- **Juna 216 runko = 99593f61d** (a29bb5d3f + Nimikerros 0c9874fd7, PT kuittasi 1.11.; puu = 0c9874fd7), testit 2223/782/575, tarkista 0,
  peilissä natiivi-backup peili/proto/natiiviseppa/juna-216. Sisältää MuistiTarkka-kytkimen: Documents/muisti-tarkka.txt sisällöllä
  "pois"/0 = pois (devicectl ei poista laitteelta); ilman tiedostoa ennallaan pois.
- **Ison iPadin muisti-tarkka.txt = "pois"** (asetettu 1.11.); vanhoilla äpeillä (ennen e056310e3) sisältö "pois" ei sammuta → muistitarkka päällä.
- **iPadilla nyt 6c1f3f297** (projektiohaara). Rungon puu: lokit/natiiviseppa-app-216-nimikerros (0c9874fd7) – asenna, jos tarvitaan runko.
- Laiteäpit lokit/natiiviseppa-app-216-{mtkytkin e056310e3, nimikerros 0c9874fd7, projektio 6c1f3f297}; T7-selvityskopio
  proto-natiiviseppa-unity-b7 (PROTO_LAITE_KOPIO), käännösvuoro aina JU:lta ("KÄÄNNÖS NYT" → VALMIS JU:lle).
- Mittaus: `AB=projektio zsh _tyo/natiiviseppa/fps60/nimikerros-ab.zsh kaanna|mittaa` (mittaa ipad-lukko.sh kaari NS:n kautta; muuta
  ENNEN/JALKEEN uudelle erälle). Analyysi: piikit-trace.py (vienti), kutsukestot.py, jaksot-ryhmittain.py, funktio-erittely.py (RAJA=…),
  allokoijat.py, gc-syklit.py, kuvapari.py. ÄLÄ vaihda haaraa työpuussa testien ollessa ajossa.
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py) → luo uudelleen uudessa sessiossa.
- R2-osoittimet ennallaan (uusin-5 → v6k28, uusin-4 → v6k26, uusin-3 → v6h3).

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut, -koe67, -fps eikä T7-kopioita.
