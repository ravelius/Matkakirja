# Natiivisepän luovutus 9.11.2026 klo 15.03

Edellinen: git show c2a2c70fb:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1422.md (korkeuskoe, p-5a, FPV).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 26 % (7.37), odotetaan JU:n ajoja.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (prompt: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md rivit 6–7;
/opt/homebrew/bin/python3.14 …/natiiviseppa-skriptit/unity-julkaisut.py ILMAN -I:tä, UUSI-rivit → PT "UNITY UUSI: …").

## TEHTY 14.28–15.03
- OMISTAJA 14.34 lennon korkeusliioittelu "Ei, kuten nyt" → koe b998fa447 pois (haara jää), työlista päivitetty.
- p-5a (NUI fb77e12b1) katsottu täysikoossa → PT: terävä, kelpaa; etualan laattasauma jatkokohta (proto-3d/lokit/natiiviseppa-p5a-tarkistus-fb77e12b1/).
- HUIPPUNIMET (PT; vikakorjaus juna 223:n 108246c2f päälle, haara natiiviseppa/huippunimet, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-huippunimet):
  bf4017da8 ElavaNimet.Paikannimi.Ele + Nimikerros.HaePaikka: huipun pinta = KorkeusKerroin.Piirretty(ele); paikat uusiksi kertoimen muuttuessa.
  Ajo bf4017da8 HYLÄTTY itse (pari-*.png lokit/natiiviseppa-huippunimet-1-jalkeen-ipad-bf4017da8): nostetut nimet häipyivät KallistusPeitolla (c-k2: 18/20 pois).
  → 31b609027: katselukulma (KallistusPeitto) huippunimelle merenpinnan kohdasta (Paikka.kulmaKeski). unity-tarkistus 0, Kartta-testit 729/729 (bf4017da8).
- FPV-PUHELINKUVAT (PT, KOE): a425b8868 (natiiviseppa/fpv-latauskuva, worktree wt/proto-natiiviseppa-fpv-lataus): KuvaPuhelinVaaka/Pysty → JU vei 14.36
  media julisteet/fpv/drone-merikallio/20261109/. Huom PT:lle: merikallio (päivä) vs iPadin lumivuori – eri maisemat; Codexin mukaan vaakakuva sopii myös iPadille.
- FPV-VUORET (OMISTAJA 14.59 "vähemmän teräviä", PT, KOE; pohja NUI fpv-napit 5efe9e346, haara natiiviseppa/fpv-vuoret, worktree wt/proto-natiiviseppa-fpv-vuoret):
  syy: FPV lentää kohokartan kertoimella 15 (ei 2, KK:n oletus väärä; loki "kerroin 15"). 9edbc14a9 FpvLento.LentoKerroin = 3 lennon ajaksi, palautus OnDestroy,
  komento `fpv kerroin k`. NUI:lle kerrottu (vain FpvLento.cs). Skenaario _tyo/natiiviseppa/sk-fpv-vuoret-1.txt: v-15 (ennen), v-3 (jälkeen), v-2, v-5.

## ODOTTAA (JU ajaa; lokit proto-3d/lokit/)
1. natiiviseppa-huippunimet-2-jalkeen-ipad-31b609027 (sk-huippunimet-1.txt; ennen-kuvat: natiiviseppa-huippunimet-1-ennen-ipad-108246c2f): parit
   `/opt/homebrew/bin/python3.14 -P /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pari.py A B ulos "ENNEN" "JÄLKEEN"` (tai sips) → katso: nimet huipuilla JA yhtä monta kuin ennen → PT 3 riviä.
   Jos yhä katoaa: syy "jättikoko" (ElavaHaipyyPt 34) tai kiinteä ladonta (pinta kanonisessa tasossa) – tarkista `ui nimet etsi`-tyyppisellä komennolla.
2. natiiviseppa-fpv-latauskuva-2-{ipad,iphone,iphone-vaaka}-a425b8868 (fl-1, fl-2): koko drone potkureineen kaikilla kolmella → PT (+ maisemaero-huomio).
3. natiiviseppa-fpv-vuoret-1-ipad-9edbc14a9: valitse luonnollisin (oletus 3; jos 2/5 parempi, vaihda LentoKerroin) → pari v-15|valittu → PT, yksi suositus.
4. iPhone bf4017da8 -ajo (JU ajoi loppuun) ei raportoida.
- unity-tarkistus: `sh Peli-testit/unity-tarkistus.sh` (EI zsh).
