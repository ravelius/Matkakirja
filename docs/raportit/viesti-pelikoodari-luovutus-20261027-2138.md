# Pelikoodari: luovutus 27.10.2026 klo 21.38

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus: 5c2187d4b (-20261027-1930).

## Haara
- Proto `pelikoodari/liikkeet-213` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211, paikallinen proto-git, ei pushia), pää 12252cb31.
  Pohja natiiviseppa/juna-213 26abe306e. Ketju: 3c71bc56b liiketiedostot → 86abc48e9 tankosarja → 5e5260302 vault → f2f8db4f7 NRE
  Codex-reitillä → 7f748fd53 myöhäinen alku → 12252cb31 tiivistys vain otteeseen + botti hyppää aiemmin. Peli 765/765, unity-tarkistus 0 virhettä. EI JUNAAN ennen KK:n videota (PT 20.1x).
- Muut vanhat wt:t poistettu levysiivouksessa (diag-tiedostot _tyo/pelikoodari/diag-arkisto-20261027).

## Tehty (junassa 213)
- JETSAM korjattu: LT iPad 4924a87b6 – 2. avaus ei kaadu, ei kertymää. Erä jetsam-213 3b0b4402f junassa 213 (NS).
- KIINNIOTTO v7 (OMISTAJAN PÄÄTÖS 19.52 "Kyllä"): video rimpuilu-ylakulma-20261027/rimpuiluvideo7-7ac355ba4.mp4; Codexin eunukkien
  takapinta 18ff0e05c + perus-Puyin land_heavy b984a22a7 (vain leike siirretty, scratchpad-työkalu glbvaihda.py) → hahmot-v9-koe →
  ämpäri hahmot-v4 (JU, SHA OK). Erä eunukit-213 0ecf2a1c2 (c2-fg-212 + juna-213 + OletusJuuri hahmot-v4) junassa 213 (NS, vihreä).

## Parkour-pelikoe (PT 20.1x; kesken)
- LIIKETIEDOSTOT (Codex 44de2de4 → vastaus 418a9e2e5, Codex kuittasi d7bbfb79f): kumulatiiviset puyi-perus-liikkeet.glb / puyi-liikkeet.glb
  (vain luuranko + leikkeet, sama nimi korvaa). Lukija DioraamaGlb.LueLiikkeet, GlbLeikeLainaus.Lainaa(korvaa), JuoksuHahmot.LiikkeetPerus/
  LiikkeetViitta (null = ei pyyntöä; QA `hahmot liikkeet <perus> <viitta>|pois`). Koejuuri _tyo/pelikoodari/hahmot-v10-koe = v9 (kovat
  linkit) + Codexin robe-motion-review-v1 liiketiedostot (11 leikettä; idle/run = päämallin data).
- LIIKESARJA (Peli/Juoksupeli/JuoksuLiikesarja.cs): Codexin leikkeet ulkoisella juurikäyrällä (ROOT-SAMPLES.csv → tyokalut/codex_juurikayra.py →
  JuoksuLiikesarjaData*.cs 60 Hz), kello MATKASTA viitepisteeseen; JuoksuLeike.Sarjassa (kiinnitetty aika, sarjan saumat ilman häivytystä),
  DioraamaSekoitin.AsetaAika. V4Maailma.Liikesarja: puomi → tankosarja (bar_*), hyppyeste 0,5 m → vault_low / vault_hand vuorotellen.
  Myöhäinen alku (botti hyppää puomille 0,9 m ennen) tiivistää ponnistuksen (LahtoZ…0). QA `tanko 0|1`, `vault 0|1`.
- Simu: parkour2 (f2f8db4f7) kaikki 4 sarjaa alkoivat ja loppuivat juoksuun, 0 poikkeusta; löytyi korkeushyppy → 7f748fd53.
- parkour3 (7f748fd53) video _tyo/pelikoodari/parkour-20261027/parkourvideo1-7f748fd53.mp4 (32 s, EI lähetetty KK:lle). Ruututarkistus
  (Sonnet, ruudut scratchpadissa): ei nykäyksiä/leijumista, MUTTA tangon ponnistus ~0,1 s ja heilautus liian nopea (botti hyppäsi 0,9 m
  ennen, tiivistys) → 12252cb31; vault_low näkyy kaukaa ja este (valkoinen laatta) ei erotu; vault_hand: vartalo uppoaa laatikkoesteen
  yläpintaan, käsituki ei erotu (hyppy-laatikot korkeampi kuin Codexin 0,5 m? → tarkista estemallin korkeus, LR/Codex).
- SEURAAVA: JU kääntää parkour-app-122 (pyydetty 21.38) → SIMU NYT → `zsh _tyo/pelikoodari/parkour-20261027/aja-parkour4.zsh`
  → videon koodaus (ffmpeg -ss 2 ääni, 960 leveä) → ruututarkistus Sonnetilla → KK (video + tunnetut puutteet) → SIMU VAPAA.
- Käsikirjoitus _tyo/pelikoodari/parkour-20261027/simu-parkour1.txt (sokkelo 0, taso 1: hyppy osa 0, puomi osa 6, hyppy osa 11).
  Ajo: todistusajo.sh --era parkourN-<sha> --app _tyo/pelikoodari/parkour-app-<sha3> --skenaario … --laite ipad (JU kääntää, SIMU NYT 00CF62C2).
- Löydös: Codex-reitillä (sokkelo 0) NRE joka ruutu (edessaAla ilman Sokkelossa-ehtoa, fde4336e1, 21.10.) – korjattu f2f8db4f7;
  sama rivi on junan 213 rungossa (pelaajat käyttävät sokkeloa, vain QA-reitti).

## Seuraavaksi
1. KK:n arvio parkour-videosta → muutokset → merge-pyyntö liikkeet-213 junaan (liiketiedostot ämpäriin JU:lla, LiikkeetPerus/Viitta-oletus).
2. Kaavun morfi: robe-motion-review-v2 (weights-kanavat, SHA OK) – lukijaan weights-kanavat (DioraamaGlb.cs:~500 ohittaa nyt; Muodot luetaan),
   päämalliin morfi v2:n apply_robe_morph.py:llä (kokonainen päämalli) → jump_robe / stairs_robe.
3. run_upstairs portaisiin (V4Leike ennen run-haaraa, ehto reitin nousu), jump_down (maailmassa ei reunoja → PT päättää).
4. Kujien kivet (omistaja 21.2x / KK): tilaus Codexille ee02c438f + LR:n mitat f33860009 → LR kokoaa, pari KK:lle (PK vain välittää).
5. Codexin loikat (jump_small/jump_long): vastattu 58b867385 (ilmassa 0,6/0,9 s, kello matkasta, ROOT-SAMPLES).

## Opit
- zsh: `$C:r…` tulkitaan muokkaimeksi → `${C}:refs/heads/…`; muuttujan rivit taulukoksi `F=(${(f)"$(…)"})`.
- IL2CPP-simulokissa ei rivinumeroita: NRE-haku Opus-agentilla koodista (Sokkelossa-ehdot) toimi nopeasti.
- Liikesarjan juuri ei saa alkaa ponnistuksen jälkeen: tarkista korkeus alkumatkassa (testi MyohainenAlkuEiHyppaaKorkeuteen).
