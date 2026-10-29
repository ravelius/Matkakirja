# Valosepän luovutus 28.10.2026 klo 08.5x

Lue ensin: tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 28.10. 02.35 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11` (nyt haarassa **linssiseppa2/seinat-211**). Haarat natiivi-backupissa:
- **linssiseppa2/seinat-211** kärki **a528e00c9** (kujakivet v4b; kivijalka vain V4_kujakivi_sokkeli*)
- **linssiseppa2/esineet-metalli-213** kärki **f7fd394da** (esineiden metalli + arkun metallivalo; METAL 68/0) – NS:lle vasta KK:n J4-v3-parin jälkeen
- **linssiseppa2/j4-pari** kärki **2855d8478** = esineet-metalli-213 + NS f047065df (ASTC-normaalit paikallisesta juuresta), vain pareihin
- paikalliset koehaarat (EI junaan, ei pushattu): koe-j4-lampo, koe-j4-seina
Parit: `REF=<sha> MALLIT=file://<juuri>/ zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/editori-vs.sh 02 05 01`.
J4-ajo: `zsh tyokalut/esikatselu.sh <SHA> /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/olavinlinna-j4/sk-komero-j4-lahi.txt`
(anna SHA, ei HEAD: HEAD ratkeaa Matkakirja-proto-repon HEADiksi). Metal: `METAL_ETULIITE="Matkakirja/Linssit/DioraamaV" zsh
tyokalut/metal-tarkistus.sh <scratchpad-kansio>` – ÄLÄ vaihda haaraa p11:ssä ajon aikana (tulos epäluotettava).
MAC-UUDELLEENKÄYNNISTYS: ei pitkiä taustaajoja; keskeytynyt pari/esikatselu ajetaan samalla komennolla uudelleen.

## Tehty 02.35–08.3x
- **J4 hopea (Olavinlinnan komero):** komerossa ei valoluotaimia → 58b84be09/8235bb8c7 eivät koskaan aktivoituneet. Korjattu
  luotaimettomaan tilaan: taivasheijastus × 0,35 neutraalina harmaana (5681793be, 70e680b1c), kiiltojen kylläisyys × 0,5.
  "Pronssi" = SeikkailuYo.cs:43 yön SplitToning-highlights (1/0,74/0,48) – kokeilla todistettu (metallin ulostulo neutraali);
  PT valitsi: yön sävy ennallaan, LR viilentää albedon. KK 03.5x: arkun valo VAIN metalliin (SeikkailuValot.MetalliKerros = bitti 6;
  TagManagerissa vain 8 renderöintikerrosta → bitti 8 karsiutui ja valo osui seiniin), heijastuslohko karheuden mukaan (ei laajaa
  WrapLambertia = mattakivi), voima 1,2 / 1,6 m, metallin ulostulo ≤ 0,92 (bloom-halo pois, KK 04.4x). PT 04.5x: läikät, mustat
  kolikot ja leimat = Tripo-mallin vikoja → Codexille (LR, posti 23b9fa03b), EI kompensointia varjostimessa.
- **Kujakivet v4/v4b (PT 08.2x/08.3x):** kivijalka L* 37–38 vs havainne 60–61 → a528e00c9: V4_kujakivi_sokkeli* = _KujaKivi 2,
  oma kerroin _JuoksuKujaKiviSokkeli 1,65/1,65/1,75 (ValoKohteet.JuoksuKujaKiviSokkeli, QA `valo savy kujakivijalka r g b`) +
  kivikohtainen vaihtelu puoleen (mip 5 -keskiarvo) ja kylläisyys 60 %; reuna/pilarit/lattia ennallaan (0,60/0,58/0,66). LR 082215
  (d425c5378): kivijalka hyvä, mutta viirut reunakiven kyljessä → rajattu sokkeliin. METAL 395/0.

## Kesken (seuraava Valoseppä)
1. **Kujakivet v4b:** LR ajaa kokonaisparin REF a528e00c9 (`REF=a528e00c9 zsh K/tyokalut/aja_v86_pari.zsh 02 05 01`) → tarkista
   viirut poissa ja kivijalka vaalea lämmin harmaa; KK:lle (v4b | sävy | havainne) ja SHA PT:lle. Jos kivijalassa tummia läikkiä: sävy
   QA:lla `valo savy kujakivijalka`. Kuluneet vaaleat reunat = tekstuuri (Codex/LR), ellei PT toisin.
   Yön sävyä ei muuteta. KK:n jälkeen NS: seinat-211 junaan 213 (METAL ajettava ennen).
2. **J4:** odottaa Codexin J4-v3-mallia (LR) → LR ajaa parin REF esineet-metalli-213 f7fd394da (tai j4-pari 2855d8478) +
   brass_pot_01 + wooden_crate_01 (Poly Havenin aito metalli B-kanavassa, vastakoe) → KK. Vasta sitten NS: esineet-metalli-213 junaan.
3. **LT iPad:** keski52-a taivas v2:lla, kun app sisältää junan 213.
4. Huomio (ei tehty): SeikkailuValot.LiikkuvaKerros = bitti 7 toimii; uusille kerroksille vain bitit 0–7 (TagManager).
