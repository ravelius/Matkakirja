# Valosepän luovutus 29.10.2026 klo 23.49

Lue ensin tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 29.10. 21.28 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara **linssiseppa2/pinnat-215**, kärki **3dc45d778** (pushattu natiivi-backup).
PT on kuitannut junaan 215 aa12b5802 asti; 6214faffa…3dc45d778 (vesi + pääharjan sävy) raportoitu PT:lle 23.4x, kuittaus odottaa.
METAL 442/0, PIPELINE 434/0 (c3624d8bb; 3dc45d778 muuttaa vain C#:a). Ei omia taustaajoja.

## Tehty tässä vuorossa (pinnat-215)
- Palkkimaalaus + friisi siniseksi (KK 03 kohta 2): V4_palkkivyo ja V4_palatsi_friisi → `_PalatsiKatto 2`, kerroin vain vihreille
  pisteille (g > r), `ValoKohteet.JuoksuPalatsiVyoSavy` 0,4/0,85/1,5, QA `valo savy palkkivyo r g b w`. VAIN AUKIOLLA:
  `AukionRakennus(nimi)` = f-/g-mallit (PT 22.2x: kujat 02/05 omistajan hyväksymät, periaate 9). Pari havainne-editori-20261029-222051.
- B1–B3 (Codexin 1268–1270, PT 21.5x): `PintaKiinni` (Lattia.cs) V4_paaharja V-clamp, V4_keskiovi + V4_nimitaulu clamp;
  `tyokalut/pintasarja.json` (osasarja kohta 3; myös LR:n C3_muurikate/C2_*-osat). LR teki V4_paaharja g-taihedian lod0/1/2 (juuri-pk7-v81).
  Pääharja `_PalatsiKatto 1` (sama lasitiilisävy kuin katto): sitruuna h 60–63 → kultainen h 39–44, sauma ei erotu (pari …-233552).
  V4_keskiovi ja V4_nimitaulu odottavat LR/NUI/KS:n geometriaa; PK ajaa parin, kun ne ovat glb:ssä.
- Vesi 07 (PT 22.4x): JUURISYY cf483afbd – palatsin tausta ja rakennukset ladataan nimellä "sokkelo <malli> lod<n>", joten
  25.10. avovesi (_Uoma 2, ehto "ei sokkelo ") ei koskaan tarttunut vallihautaan. Lisäksi `_JuoksuAvoVesi` (ValoKohteet.JuoksuAvoVesi
  0,02/0,10/0,17 + JuoksuAvoVesiHeijastus 0,1, QA `valo savy avovesi r g b w`), heijastus turkoosilla sävyllä.
  Pari …-232340/07: 100/126/154 h 211 l 0,50 vs havainne 56/124/156 h 199 l 0,42. Loppuero = päivän usva (≤ 50 % yli 270 m).

## Kesken / seuraava askel
1. PT 23.4x: UUSI pinta **V4_jalusta_lohkokivi** (havainteen harmaa isokokoinen lohkokivi muurien alla 0–3 m), LR jakaa sen v82:ssa.
   Kuvan lähde kysytty PT:ltä (Codex-tilaus vai sokkeli-v03 isommaksi). Pintasarjaan + varjostin, pari KK:lle + PT:lle.
2. PT:n kuittaus 6214faffa…3dc45d778 (vesi + pääharja) junaan 215.
3. B1–B3: V4_keskiovi ja V4_nimitaulu odottavat geometriaa (LR/NUI/KS); hallin ovet (Taihedian lod1/2 V4_wood) NUI:llä (PT käski).
4. LUOVUTUKSEEN (PT 22.3x, EI NYT): 03b:ssä varjot puuttuvat kokonaan, aukion kaukolattia vaalenee valkoiseksi, kamera eri paikassa
   kuin havainteessa (sivumuurit puuttuvat); 07:n usva vaalentaa koko näkymän → valo omistajan järjestyksessä myöhemmin korttina.
5. Kapea V4_teal-räystäspalkki hallissa yhä vihreä h 161 (ei pyydetty).

## Työkalut (scratchpad 91d5d509…/scratchpad, kopioi tarvittaessa)
pari-v77.zsh `<juuri>` (03/03b/05, REF ympäristöstä), pari-07.zsh, pari-03.zsh, metal.zsh, vyo_sim.py (kertoimen simulointi kuvasta
mip-tasolla), glb-työkalut 413a008e…/scratchpad (glb_mat.py, glb_pura.py).

## Opit
- Mallin nimi latauskoodissa: palatsin osat ovat "sokkelo <malli> lod<n>" (Palatsi.cs) – nimeen perustuvat ehdot tarkistettava sitä vasten.
- Vähäkylläinen pinta kääntyy pelissä taivaan sinisellä ympäristövalolla (+10–40° sävyä): sävytys kylläisyyttä nostamalla, ei vain kertoimella.
- Uusi pinta näkyy aukiolta vasta, kun se on myös lod1/2:ssa (B1: v78:ssa vain lod0).
- Jaettu materiaali (friisi) muuttaa myös omistajan hyväksymät näkymät → rajaa mallinimellä ja tarkista hyväksytyt parit.
