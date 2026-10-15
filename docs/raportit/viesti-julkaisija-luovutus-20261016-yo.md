# Julkaisijan luovutus 16.10.2026 klo 01.5x (Postivahti: kova raja 35 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -120). Edellinen: `viesti-julkaisija-luovutus-20261015-ilta3.md`.
Asemataulu (TÄMÄ TILI): https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm (talo/eteneminen). Osoitekirja /Users/Shared/Claude/osoitekirja.md.

## 0. ENSIN (nollauksen jälkeen)
1. **Taustakääreet kuolevat nollauksessa** (näin kävi 15.10. 21.2x): tarkista heti
   `ps -ax -o pid,etime,command | grep -E 'proto-kaanna|julkaisija-tyokalut|zsh (pelikoodari|valoseppa|linssiseppa|etusija|ls196g)' | grep -v grep`
   ja käynnistä puuttuvat kohdan 2 järjestyksessä (`nohup zsh <kääre>.zsh > <loki> 2>&1 &`).
2. **Cron NAS-bundle** (session-only): `CronCreate "3 4 * * *"` → `/Users/Shared/Claude/proto-3d/tyokalut/bundle-natiivi-nas.sh` (aloitusviesti kohta 4).
3. Monitorit: kääreiden lokit (grep KÄÄNNETTY|VIKA), `valoseppa-vahti.log` (KÄÄNNETTY|SIMU-PYYNTÖ|SIMU ALKAA|SIMU VAPAA|VIKA|EI TULLUT).

## 1. JUNA 196 – OMISTAJA PYYSI JULKAISUA 00.31 (ehdollinen)
- Sanatarkasti: "Julkaise juna kun kaikki pyyntöni valmiina. Ei testejä". **Odota PT:n "LUKITSE 196"** (Asemataulun tarkistuslista).
- Lukitushetkellä web-PR:t mergeen (PT 00.3x): **#4629** (apurahapallo, CLEAN) ja **#4685** (merinostot-korjaus; testit olivat kesken 00.35 → tarkista vihreä).
- Muistiportti: luo `julkaisija-tyokalut/muistiajo-196.txt` 1. rivi `OHITETTU omistaja 16.10. 00.31 "Ei testejä" (…)` kuten muistiajo-195.txt.
- NS antaa BUILD-SHA + M-SHA → `zsh julkaisija-tyokalut/tf-kaynnista.sh 196 <BUILD> <M>`; Monitor `tf196-ketju.log`; taulu talo/eteneminen
  joka vaiheessa (if_version); SISÄINEN → rivi PT (local_5df52e10…) + KK (local_dfa7296a…); BETA-ARVIO/ULKOINEN → rivi; VANHENNUS 195.
- Juna 195 VALMIS 15.10.: TF 22.03 sisäinen, 22.27 ulkoinen + beta-arvio, vanhennus 194 22.28 (BUILD 64e1efcd1, M 1a60554b1).

## 2. L2-JONO 01.57 (järjestys PT:n linjalla; kaikki kääreet julkaisija-tyokalut/)
L2 = lukkokilpa, ei FIFO. **UUSI OPPI: proto-kaanna.sh luopuu tunnin lukko-odotuksen jälkeen** ("VIKA jono: lukko ei vapautunut tunnissa")
→ käynnistä kääre uudelleen. Etusija tehdään odotusskripteillä (`until grep -q <sha> /tmp/matkakirja-kaannospalvelu-2.lukko/kuka`).
1. LS1 s2-haivytys-196 b5b1bb275 – KÄYNNISSÄ 01.51. LS korvasi kuvat-196g:llä → `s2-lippu-pois.zsh` nimeää lipun .ei-ajeta (ei ajeta).
2. **NUI 122169f34** (junan 196 ehto, hävisi kilvan tunnin) – NUI ajaa itse; ainoa odottaja. Sen jälkeen NUI bb85d1808 (NUI:n oma).
3. **Valoseppä testi-196 68a606437** (junan 196 ehto) – `etusija-nui196.zsh` käynnistää NUI:n lukon jälkeen → _tyo/linssiseppa2/tulivuoret/app.
4. PK kohtaaminen-196 59b2068b5 → asennus iPhone 17 96044270 + kohtaaminen-196-app (etusija-nui196.zsh, testi-196:n lukon jälkeen).
5. LS1 kuvat-196g eb5357715 (`ls196g-jonoon.zsh`, kohtaamisen lukon jälkeen) → lippu simu-kuvat196g.nyt (00CF62C2).
6. PK taidemuseo-196 (kärki 4eb11bcbc; `pelikoodari-taidemuseo196.zsh` odottaa kohtaamisen lukkoa) → 96044270, video PT:lle.
7. SS Mac-käännös f7ffbff4d (SS ajaa itse NUI:n lukon jälkeen); Mac-appi ikkunassa ~5 min vain omistajan idle ≥ 10 min.
KÄÄNNETTY-rivit rooleille send_messagella; Valoseppä/LS: KÄÄNNETTY + SIMU NYT.

## 3. Simut ja vahti 01.57
- **A26BC7D0 Valosepällä** (video + kierrokset + raketti + yovalot-tele A/B) → **valovahti TAUOLLA** (`/tmp/matkakirja-valovahti-tauko`):
  poista (mv) kun Valoseppä ilmoittaa SIMU VAPAA. Vahdin simuvuoro = `touch /tmp/matkakirja-valovahti-simu.nyt` (vahti odottaa 60 min).
- 123B4B25 + F7513985 NUI:lla (ilmoittaa SIMU VAPAA). 96044270 PK:lle kohtaaminen/taidemuseo. 00CF62C2, 95EEDB48, 8362879F, 39644E75 vapaat.
- Käytetyt LS-liput nimetään .kaytetty SIMU VAPAA:n jälkeen.

## 4. Levy
PT 23.3x: viennit/käännökset sallittu yksi kerrallaan, **pysäytys vain jos < 22 Gi** (PT:n levyvahti ilmoittaa). 01.0x: 40 Gi.
Unity-IL2CPP-vaihe vie hetkellisesti ~25 Gi /private/var/folders-kansioon (palautuu käännöksen jälkeen).

## 5. Tänä yönä tehty (SHA:t lokissa)
TF 195 kokonaan; #4636, #4665 mergetty; viennit: revontulet-pyöreä 1, kohokohtakortit 7, pääkaupungit-11 44, peking-piilo 98;
~25 L2-käännöstä (PK, Valoseppä, LS1, SS, NUI); T7 iPhone 17 96044270 otettu PK:n käyttöön (ei omistajaa).
