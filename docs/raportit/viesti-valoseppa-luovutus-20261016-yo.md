# Valoseppä – luovutus 16.10.2026 yö (21.2x, KOVA RAJA 36 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261016-ilta.md (b41e08263).
Viestit `send_message` TÄYDELLÄ id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3, Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914,
Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Päiväkirja: $D/JONO.md (kaikki rivit 18.4x–21.2x lopussa). proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto.

## 0. ENSIMMÄISENÄ: TAUSTA-AJOT JA AGENTIT (kuolevat nollauksessa → tarkista ja käynnistä uudelleen)
Simulaattori A26BC7D0 (set "/Volumes/T7 4TB/Simulaattorit/Sarja") on yhteinen. ODOTUSEHTO (opittu 20.2x–21.0x):
`while pgrep -f "kuvat-utu|aja-video|sarja-|k53-ats|k54-kuvat|k55-kuvat|todistusajo.*A26BC7D0|A26BC7D0" >/dev/null; do sleep 15; done`
– pelkkä "todistusajo" tarttuu muiden roolien ajoihin muilla simuilla; pelkkä A26BC7D0 ei estä kahta omaa ajoa törmäämästä.
kuvat-utu-mykistetty.sh EI sammuta simua → omat ajot sammuttavat lopuksi (`xcrun simctl --set "/Volumes/T7 4TB/Simulaattorit/Sarja" shutdown A26BC7D0-…`).
Orpo simu (ei ohjaavaa skriptiä, oma appi) saa sammuttaa; muiden ajoja ei.
1) **Louvre k55s** (LR 21.2x): `zsh $D/louvre1/k55-kaikki.zsh` (leivonta lahde-k55 md5 4ef1700d/99ba6bff/27d8a0fb → v6k18-lv2f-k55s →
   k55-kuvat.zsh: L1b/L2/L2lahi × vpA 300° | ats135) → louvre1/lahi-L1-L3/k55s/arkki.jpg + mittaukset k55-kuvat.out → LR (+ PT 135°-arvio).
   Jos leivonta valmis (rakenna-k55s.log VALMIS), aja vain k55-kuvat.zsh.
2) **Valas k1 VALMIS 21.3x** (agentti päättyi): haara linssiseppa2/valas-197 11a815681, käännös 9dd0409d, 1932/1932, arkki valas-havainne/k1/arkki.jpg +
   valas-k1.mp4 → PT (EI junaan vielä). Puutteet: kruunu valkoisina 'hampaina' (Codexissa läpikuultava verho), vaahto harmaa levy 2–3 s,
   usva/renkaat eivät erotu, alustakamerassa isku alareunassa tekstin alla, valaan vatsa kameraan (Codex: tumma selkä). VAT 3,9 Mt repoon.
   valas-blender/ 53 Mt. Seuraava kierros k5 näistä. (Alla vanha rivi:)
   2) **Valas-agentti** (Opus, juna 197): worktree wt/proto-linssiseppa2-valas, haara linssiseppa2/valas-197 (k1–k4, viimeisin 11a815681,
   käännös 9dd0409d); loki $D/valas-havainne/AGENTTI-valas-k1.md (21.19 kuvaus alkoi). Jos kuoli: lue loki, jatka k4a-kuvauksesta
   (oleta-uusi), arkki valas-havainne/k1/arkki.jpg → PT. valas-blender/ ≤ 4 Gt.
3) **Valopohja V0–V2 -agentti** (Opus, juna 198): worktree wt/proto-linssiseppa2-valopohja, haara linssiseppa2/valopohja:
   V0 0ccfad17a (ValoProfiilit + valovahti, lähtötaso 1082), V1 c0ca72b7d (Valo/Perus.asset). Kesken: V1-kuvapari (= sama) ja V2 museo SISÄ +
   ennen/jälkeen-video. Loki $D/valopohja/AGENTTI-V0-V2.md. Suunnitelma docs/valopohja-suunnitelma.md (6693ef896, PT kuittasi).

## 1. PÄÄTÖKSET TÄLLÄ VUOROLLA
- OMISTAJA 18.57 "Junaan 197 nyt": raketin savu k7 → linssiseppa2/juna197-savu **c5b6dcd1a** (runko d6d97384e + 079a231e3) NS:llä.
  Myöhemmin (ei junaan): juuren vaalea ydin, keilat kovareunaisina kolmioina, märät läikät täplinä.
- Varjopuoli: f23d46f7f → **32c2ee110** (taivas 0,32 / maa 0,35 / AO 0,85; L2 109 → 123 vs Codex 126) NS:llä junaan 197, ND/Tukholma ok.
- OMISTAJA 20.44: Louvre k53 junaan 197 → omat mallit **v6k21** (_valmiit/omat-mallit-vienti-20261016-v6k21) VIETY R2:een (Julkaisija 53/53),
  uusin-4 → v6k21 lukituksessa. (v6k20 = k48 vietiin ensin, korvattu.)
- OMISTAJA 20.54: valo/ääni/liike yhteisiksi pohjiksi; Valoseppä = VALO- JA KUVAPOHJA (docs/moduulit/yhteiset-pohjat.md, PR #4727).
  PT: V0–V2, 1. käyttäjä museo (SISÄ), junaan 198, pieni erä + tiivis merge (museossa NUI/Pelikoodari/Siirtoseppä).
- PT 21.2x: Louvren omille malleille aurinko **135°** junaan 198 – EHTO valopohjan paikallinen delta (Louvren rivi / Valopohja.Saada), ei omaa
  valokoodia. → tehtävä V0–V2:n jälkeen samaan haaraan (KaupunkiIlmakeha.OmaAtsimuutti nyt 300° kiinteä; testiasetus `omaatsimuutti 135`).
- PT: Louvre-arkeissa L1-rivi AINA L1b-kamerasta; testikuvissa PYSAKKI=Louvre (kierroslista korostaa oikeaa; omat191/kuvat-utu-mykistetty.sh).

## 2. JONO (järjestys)
1) Kohta 0 (k55s → LR, valas, valopohja).  2) Louvre-delta 135° valopohjaan (junaan 198) + k55 kuvaus deltakäännöksellä → PT/LR.
3) Valopohja V3 (linnan sisätilat SISÄ) PT:n kuittauksen jälkeen.  4) Savun jatkot (juuri, keilat, märät juovat) ja junan 197 vanhat
(nousun hehkupallo, s1:n musta Maa, ISS-efektit k6).

## 3. MUUTA
- Levy: T7 Matkakirja-valoseppa/arkisto-20261016-yo (savu koe1–6, Louvre lv*, k49s, v6k19 kopio jäi paikalleen pariisi-v3/). df 35 Gi 21.0x.
- Louvre-kuvauksen mittauskaistat (julkisivu crop iw*0.9:ih*0.25:iw*0.05:ih*0.42, lattia iw*0.3:ih*0.15:iw*0.35:ih*0.78) – vertailukelpoiset.
- Varianttiasetukset pysyvät varianttien välillä → jokainen variantti asettaa kaikki arvot eksplisiittisesti.
- zsh: `$H[a]` = taulukkoindeksi → käytä `${H}` ffmpeg-suodattimissa.
