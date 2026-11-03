# Natiivisepän luovutus 1.11.2026 klo 21.50 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261101-1550.md (sisältö tässä ajan tasalla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Yksi Unity kerrallaan linjalla (lukot). Ei keskeneräisiä ajoja.

## JONO
1. **TF 216 JU:lla (omistajan Pariisi-OK 21.35):** runko **b1909a35b**. JU vie ensin paketin
   `_valmiit/pariisi-tasot-hill-20261101-vienti-20261101` (54 hillittyä laattaa kansioon piirroskartta/pariisi/hill-20261101/, --kuiva ok)
   ja kääntää TF:n. KS:n pariisi-tasot-hill-vienti-20261101 (samat nimet) EI viedä: vie-paketti ei ylikirjoita, eikä laitteen
   välimuisti tarkista muutosta. Jos JU kysyy, vastaa tällä.
2. **Seuraavat runkoon tulevat erät:** PT:n kuittauksella (VS, PK, NUI, KS tuovat SHA:n), merge `--no-ff`, testit, peili, SHA PT:lle + tekijälle
   (+ JU:lle, jos TF on kesken).
3. **60 fps:** uusinta tehty (alla). Seuraavat kohteet LOYDOS.md:ssä (LisaaElavat-rivien luonti, Cesium, latausjaksot "muu" 100–360 ms) –
   vain PT:n tilauksesta.
4. **Pariisi uudelleen / VS:n kiiltokoe piha 06:** ennallaan (ks. 1550-luovutus).

## TILA
- **Juna 216 runko = b1909a35b** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-216, peili natiivi-backup
  peili/proto/natiiviseppa/juna-216). Testit 2223/787/585, tarkista 0. Tänään 65ceff743:n päälle (kaikki PT:n kuittaamia):
  PK kivi-216b ad98dfc8f (leivottu valo oletukseksi, kujakivi valotilan mukaan; PT valitsi tämän VS 89280ca51 + PK cc8b5ad92 -parin sijaan,
  vanha koostumus tagissa natiiviseppa/runko-216-pari-a43fa7505) + VS 6fad3642c (06 testikamera) → 79f226be7 ·
  VS varjo-inst 0e357fe46 → 02a7743af · VS sali 990497d2f → 73f3288e7 · NUI piirros-popup e0bcdadf0 → 0100aede3 ·
  VS ilmakuva 7bec74dfa → 30ab21cdc · KS Pariisin porrastetut tasot 1fe11dd1b → 12e66804b · VS varjo2 1a60b2499 → a711ee8be ·
  VS täyttö 0,7 f564ede54 → 2913a381d · VS k01 1698af586 → 1cbab246f · VS vesi07 5677e3b79 → 6ad4b8b6b ·
  VS ilma07 5c8529d25 → 8147db8d1 (tarkista rc=1 VALOVAHTI) + korjaus 203ce44b2 → d062430f5 · NUI piirros-nimiot 0891d2df0 → dae35fa9f ·
  NS TasoVersio be3f18e01 + testi b1909a35b.
- **TasoVersio (NS 21.4x):** PiirrosKerros.TasoVersio = "hill-20261101": porrastetut tasot (laaja/vali/lahig) haetaan
  `<PariisiOsoite><TasoVersio>/` ja välimuistinimessä on kansio (`hill-20261101_laaja-0-0.jpg`). Seuraava laattavärimuutos = uusi
  TasoVersio + uusi kansio + uusi paketti. 1 m/px -laatat ennallaan juuressa. Testi PiirrosLahinTestit vartioi.
- **60 fps uusinta (PT 17.5x):** samassa istunnossa eddff7063 94 vs 30ab21cdc 77 ≥ 20 ms -jaksoa (ruudut > 17,5 ms 23,1 → 19,1 %);
  aiempi 84 → 96 oli ajovaihtelua. Taulukko proto-3d/_tyo/natiiviseppa/fps60/LOYDOS.md loppu (AB=uusinta nimikerros-ab.zsh:ssä).
  Ison iPadin äppi nyt 30ab21cdc (lokit/natiiviseppa-app-216-runko-30ab2).
- **Worktreet (Postivahti 1.11.):** proto-natiiviseppa-fps poistettu. ÄLÄ poista ehdokas (runko), -muisti, -tyokalut, -koe67, -varjo
  (VS:n diagnoosihaarat) eikä T7-kopioita.
- Havainnekoonnit: oletusvalo on nyt leivottu (VS/PK 16.0x); vertailuvalo QA:lla `valo vertailu 1`.
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py) → luo uudelleen.
- **Simut (omistaja 10.41):** vain neljä yhteistä, ajo AINA `proto-3d/tyokalut/simu-lukko.sh kaari natiiviseppa yhteinen-iPad13 -- …`.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- Toisen roolin commit puuttuu: `git fetch natiivi-backup peili/proto/<rooli>/<haara>`; puhtaus etukäteen `git merge-tree --write-tree HEAD <sha>`.
- Laitekäännös: push peiliin, `git -C "/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b7" fetch natiivi-backup <ref>`, sitten
  käännösvuoro JU:lta (KÄÄNNÖS NYT) ja `AB=… zsh proto-3d/_tyo/natiiviseppa/fps60/nimikerros-ab.zsh kaanna`.
- iPad-mittaus: `zsh wt/proto-natiiviseppa-ehdokas/tyokalut/ipad-lukko.sh kaari NS -- …`; analyysi piikit-trace.py (vie time-profile.xml)
  → jaksot-ryhmittain.py, ruudut.py.
- tarkista rc=1 → `zsh tyokalut/tarkista.sh` työpuussa näyttää syyn (LIIKEVAHTI, VALOVAHTI …); korjaus tekijän haaraan, ei poikkeusta ilman PT:tä.
