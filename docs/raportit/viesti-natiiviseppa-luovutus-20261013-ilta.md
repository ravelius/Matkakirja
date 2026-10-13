# Natiivisepän luovutus 13.10.2026 klo 21.3x (tilinvaihto, PT 21.30)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot: natiiviseppa-skriptit/juna188/jono-188.txt (juna 188) ja juna187/jono-187.txt (koko 13.10. päivän kirjaus).

## TILA

- **BUILD 187 julkaistu** (OMISTAJA PYYSI JULKAISUA 18.33): proto master **6b14ba649** (juna/b15 bc4677a89), lukituskäännös c7620ff38 (L1).
  iOS TF ajo 38425085365 (Julkaisija), **Mac 1.1 (187) TF-ajo 38425170382 SUCCESS** (UPLOAD SUCCEEDED 18.56). Web-merget 7/7 tehty (Julkaisija).
  Muistiportti 187 (iPad Pro 13): Olavinlinna 5 tilan kanssa vapaa min 1056 Mt, museo 2495, shakki 2792, Kööpenhaminan kippi 754 Mt (Pariisin kipin tasolla).
  Lukituskaava: juna187/lukitse187-a.sh + lukitse187-b.sh (+ build187-viesti.txt, muutosloki-187.txt). Peilipush hylkääntyi kilpailuun → tarkista ls-remote.
- **Juna 188 -runko** natiiviseppa/juna-188 (wt/proto-natiiviseppa-ehdokas) = **f9170af15**, testit Linssit 1744/1744, Peli 584/584, Kartta 490/490, tarkista 0.
  Yhdistys `zsh juna188/yhdista-erat.sh <erälista>` (rivit SHA|viesti), testit `zsh juna188/testit188.sh` (run_in_background).
  Mukana (kaikki PT:n kuittaamia): LS1 vesi-v18 ce8f49cdb (⊃ v17 77825ca2c ⊃ v16b 8c6aa45c3), LS2 veneaanet-raja 6ba38960a,
  LS1 maa-tukholma-v3 b4769884a, PK raketti-kehittaja-188 357069b3d. **Lisää muistia: kyllä** (Tukholman maa 16 → 40 Mt).
  **Tukholman muistiajo tehty** (tukholma188.sh, 17f72ab8b): 188 fp huippu 3783 / vapaa min 1336 Mt (v3 ladattu), 187 3786 / 1333 Mt (v2), 0 muistivaroitusta → OK.
- **Web-merget junaan 188** (Julkaisija vasta omistajan julkaisupyynnöllä): #4569 (SK saapumisintro paikat 6/8, kasvava PR).
- **iPad Pro 13 vapaa** (LAITE VAPAA 20.26). Ei käynnissä olevia ajoja.
- Unity-beeta 13.10.: ei uutta (09.04-ajastus luotu uudelleen 15.5x, istuntokohtainen).

## AUKI (järjestyksessä)

1. **Juna 188 kertyy**: yhdistä vain PT:n kuittaamat. ODOTTAA YHDISTYSTÄ (LS1 21.3x: PT kuittasi; tilinvaihdon takia ei yhdistetty): LS1 vesi-v19-189
   **8f6273082** (⊃ vesi-v18 ce8f49cdb, index-v19, korvaa v18:n; testit 1670/1671 tunnettu) → erat-7.txt + testit188.sh. Tulossa myös: LS1 museo-palaute-188 **f7679f89d** (Vermeer puhki TF 187:ssä: pehmeä polvi 0,7 → 0,95
   ennen käänteistä AgX:ää + _MuseoTeosValotus = 2^−MuseoEV käänteisen JÄLKEEN; NS katselmoi 21.2x: ei ristiriitaa, matematiikka oikein; ehdotettu
   testi "savy museo 0|0.6" → teos ei saa muuttua; KaytaSavy myös Savytoisto.Muuttui-tapahtumasta). Ei vielä PT:n kuittausta.
2. **Muistiajo 188 ennen lukitusta**, jos uusia muistia lisääviä eriä tulee (pohjat: juna187/ketju187a.sh = B1 uusi → lepo → A1 vertailu → museo → shakki;
   kaupunkikohtainen: juna188/tukholma188.sh, juna187/kph187.sh; muistitarkka-ipad.sh tukee nyt KAUPUNKI=<kaupunkitila-nimi>).
   Vertailuappi: lokit/natiiviseppa-app-savy-laite (BUILD 186 + sävytoisto; 186-laiteapp katosi 12.08–13.17) tai lokit/natiiviseppa-app-187-laite-kph (≈ 187).
3. **Lukitus 188 vain "OMISTAJA PYYSI JULKAISUA"**: kopioi lukitse187-a/b.sh → 188 (master tällöin 6b14ba649, haara juna/b16), muutosloki PT:ltä (≤ 350 merkkiä),
   Mac 188 L2:lla (juna186/mac186.sh <BUILD> 188; TF: gh workflow run proto3d-mac-testflight.yml --repo ravelius/Matkakirja --ref main
   -f app_polku=<lokit/natiiviseppa-mac-tf-188/Matkakirja.app> -f versio=1.1 -f build=188 -f lataa=true vasta Julkaisijan "TF NYT":llä).
4. **Oma jono**: iPhonella yläpalkin pilleri mustaksi, kun sävytoisto vaihdetaan kesken ajon (savy agx 0). Ei estä junaa (PT). Epäily: Mobile_RPAsset
   (ainoa jossa m_UseFastSRGBLinearConversion 1, renderScale 0,8) + colorGradingMode vaihto ajossa. Pelaajalle ei näy (vain testikomento).
5. **Unity-beetaseuranta** klo 09.04 (CronCreate on istuntokohtainen → luo uudelleen "4 9 * * *" + aja unity-julkaisut.py).

## OPITUT 13.10. ilta (sitovia)

- **Laitevuoron lippu ja peräkkäiset ketjut**: edellinen ketju poistaa lokit/natiiviseppa-laitevuoro-ok vasta lopussa → uusi ketju näkee lipun heti.
  Käynnistä seuraava ketju vasta, kun edellisen prosessi on päättynyt (until ! pgrep -qf '<ketju> <sha>'), ja lepo sen jälkeen.
- **sed \| BSD:ssä ei toimi** alternaationa → suodatin hiljeni (ketju näytti päättyvän tyhjänä). Käytä grep -E.
- **Testitarkistus**: zsh/BSD grep -takaisinviittaus `\([0-9]*\)/\1` ei toiminut odotetusti → käytä awk-vertailua (juna188-ketjuissa).
- **Mac-uudelleenkäynnistys tappaa taustaketjut**; laitevuoron lippu jää → poista ennen uutta ketjua.
- **Sävytoiston iPad-mittaus**: lämpö vaihtaa renderScalen (Kuuma 0,7) → pakota "lampo normaali" (peli-komento) A/B:n ajaksi; ratkaiseva luku GPU-aika
  (KehysMittari gpuMs konsolissa), ei vsync-rajattu kehysaika. Työkalut savy/savy-ipad-ab.sh + savy-ab-analyysi.py.
