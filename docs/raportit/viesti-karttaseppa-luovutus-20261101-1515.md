# Karttaseppä: luovutus 1.11.2026 klo 15.15 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-1343.md (käsitelty). Syy: kontekstivahti 25 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`. Jokaisessa kansiossa MUISTIO.md.
Postilaatikko: `C/postilaatikko-tyokalut/kuittaa.sh <md> <polku> <viesti>` (vaihda S= omaan scratchpadiin, rivi 4).
Codexin vahti: odotusskripti, joka fetchaa origin/claude/postilaatikko minuutin välein ja päättyy, kun tulee ei-"Karttaseppä"-commit
(Bash run_in_background; malli edellisen session scratchpadissa, kirjoita uudelleen 10 riviä).

## TEHTY (13.46–15.15)
- **ND 0,5 m/px -koepala** c21035113 (SHA ok) → kolmikko PT:lle → **OMISTAJAN PÄÄTÖS 13.54 "Ei, tavallinen tarkkuus":** 0,5 m/px EI
  tilata, koko Pariisi (ja myöhemmin muut kaupungit) ~1 m/px. SUUNNITELMA.md päivitetty; Codexille kerrottu (koepala vain vertailu);
  muisti kaupunkien-lahitaso-1m-px.md.
- **Rengas 1 lähdeongelma:** G ja välitaso eroavat G:n reunoilla ~100–250 px → täsmennys ad411d1b0 (PT hyväksyi): G voittaa,
  ulkopuoli sovitetaan ~500 px:ssä, maamerkit paikallaan.
- **Rengas 1 tullut** 3b2ca18b6 (SHA 12/12; `proto-3d/_tyo/codex/pariisi-lahitaso/_review-era1-20261101/`, raakat ja keep-maskit
  `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-lahitaso-era1-20261101/{raw,guides}`).
  Tarkastus `C/lahitaso-20261101/TARKASTUS-ERA1.md`: 19/23 saumaa näkyy kamerassa (liimausviiva + G:n vaalea reunahehku),
  Invalidit ~240 px idässä, Panthéon −23 %, r09c09 puisto kadonnut; Garnier −9 % kelpaa.
- Saumatasoitus ilman generointia (PT:n käsky) kokeiltu 2 tavalla (saumat.py v1/v2): EI toimi (rakenteellinen katkos). Ei käytetä.
- Codexille 8684f900f: uudet otot r09c09 puisto, Invalidit (r08c08 + r07c08), Panthéon 440 px (r09c10) – **työn alla**;
  19 saumaa maskattuna → **Codex 81f1175f3: image_gen ei tue maskia, 0 kutsua.**
- **Rengas 2 muutos 7cc396323 (PT):** ei kaistakopiota; Codex piirtää myös limityksen (naapuri vain viitteenä), KS leikkaa sauman.
- Uudet työkalut `C/lahitaso-20261101/`: kokoa.py (G-origo-kokoaja, parit, saumat, viivaimet), kamera-saumat.py (pelin kamera +
  näkyvyysluku, 1,0 = ei erotu), liitos.py (min-cut-saumaleikkaus per limityssivu + σ10 häivytys; mekaniikka testattu), saumat.py.

## AVOIN (järjestyksessä)
1. **PT:n vastaus (lähetetty 15.1x, jonossa):** ehdotus rengas 1 uudelleen renkaan 2 tavalla (12 uutta ottoa, koko pala myös
   limityksessä, G/naapurit viitteenä) ja leikkaus liitos.py:llä **G:n uloimman 128 px:n sisällä** (PT:n raja 15.0x).
   Kun PT kuittaa → Codexille tilaus (yhdistä jo tilattujen korjausten kanssa) samaan postiin.
2. **liitos.py:hyn syvyysraja:** leikkaus saa mennä G:hen enintään 128 px (sakko DP-kustannukseen G:n sisäosassa); G:n sisäosa
   pikselilleen. Testaa, kun palat tulevat; kamera-saumat.py ennen/jälkeen → pari PT:lle.
3. Codexin toimitukset → SHA → kokoa → kamera → PT; rengas 2 vasta kun rengas 1 kelpaa (KS + PT).
4. Renkaat 3–6 PT:n luvalla (ohjeet.py VALI=v2); tee-tasot.py ja NS-LISTA (luovutus 13.43 kohta 3) ennallaan.
5. Siivottavissa: `pariisi-pohja/_muokkaa_*.py`, `*.ennen-*.py`; lahitaso-kansion kokeilukoostot (*-tasoitettu*, *-v2.png, *-raaka.png).
