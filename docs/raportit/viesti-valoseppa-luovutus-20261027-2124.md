# Valosepän luovutus 27.10.2026 klo 21.24 (kontekstiraja)

Lue ensin: tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 27.10. 19.1x →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara `linssiseppa2/seinat-211` (natiivi-backup, pushattu), kärki **1158e9df0**.
Parit: `REF=<sha> MALLIT=file://<juuri>/ zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/editori-vs.sh 02 01 05`.
Lähikuvan rajaus (reunus): 02/peli.png crop (0,673,376,986) → 600×500; sokkeli: crop (0,400,520,833). Kuvien katselu Sonnet-agentille.

## Tehty 19.03 jälkeen
- **Juna 213 (NS, runko 795561b69 vihreä):** seinat-211 3985a20cf (reunakivi, OMISTAJA 20.05 "Kyllä") + a1d79e26e (rosoisuus, KK hyväksyi
  pari 204545; kattotiilien 4 näytettä 8e0d8ef7b; taivas 7b0a48563 + perutus 49411729c = netto 0; int-ternäärin korjaus).
  LR:n mallit juuri-v89m/tausta-v60 junassa.
- **Urien valkoiset viivat:** syy LR:n UV:ssa (urien seinien u poikki + u-akseli 1e-4 vinossa) → LR korjasi (v83 → juuri-v89m).
- **Väreily:** LT:n iPad-parit vaihtelevat ajosta toiseen 0,36–2,93 % (kuja02-3) → eivät erota muutoksia. Oma toistettava editorikoe
  (scratchpad varinakoe.zsh / varina-mittaa.py, kopio JONO:ssa kuvattu): kuvabias 0/1/2 ja kattotiili-AA kohinan sisällä → bias 1 pysyy.
- **Taivas:** pelissä ei porrastusta (askeleet 1/255); vyöhykkeet Codexin v1-JPEG:ssä → Codex toimitti **päivätaivas v2** (#1185, posti
  353d6223b, 16-bit PNG, SHA ok) → `_tyo/linssiseppa2/taivas-paiva-v2-codex/` (taivas8.png = ffmpeg `-sws_dither ed` 8-bit). Kuittaus
  Codexille 7309a7664. **b912ee03b**: lataa `taivas-paiva-codex-v2/taivas.png` pakkaamatta (muuten jpg); **e57e27820**: dither ±1,5/255
  kolmio. Editorikuva skaalataan → ditheriä ei voi arvioida editorissa, vain iPadilla.
- **Sokkeli (OMISTAJA 20.06):** LR v84 (juuri-v90m): kansi → V4_sokkeli seinän tasoon. Pilarien beige = auringon puoleiset pystypinnat
  → **1158e9df0**: laji 11 pystypinnan suora aurinko × (0,80/0,83/0,90) (222/208/192 → 192/182/174).

## Kesken (seuraava Valoseppä)
1. **KK:n kuittaus parille 211947** (taivas v2 + sokkelin aurinkopinnat, 1158e9df0 + juuri-v90m-taivas2) – lähetetty 21.2x.
2. Kuittauksen jälkeen: **JU vie `taivas-paiva-codex-v2/` (taivas.png = taivas8.png + taivas.json) ämpäriin** ENNEN kuin b912ee03b on
   junassa (muuten päivätaivas proseduraalinen); sitten NS: seinat-211 a1d79e26e..1158e9df0 junaan; METAL 440/0 ajettu 1158e9df0:lla.
   Muista NS:n testit (EiIntTernaariaMetalille, BooliFloat).
3. **LT iPad:** keski52-a taivas v2:lla (porrastus) – vasta kun app sisältää v2:n.
4. **KK 21.3x (omistaja):** kujien kivet (reunakivi, sokkeli, lattia) Codexilta havainnekuvan paloina (PK tilaa, LR kokoaa) → kivimateriaalin
   säätö SEIS; VS:n osuus valo/aurinko, kun palat ovat paikoillaan.
5. Tilapäiset juuret `_tyo/linssiseppa2/juuri-v89m-taivas2`, `juuri-v90m-taivas2` (symlinkit + v2-taivas) voi poistaa, kun v2 ämpärissä.
