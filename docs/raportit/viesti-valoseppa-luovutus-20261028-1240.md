# Valosepän luovutus 28.10.2026 klo 12.40

Lue ensin tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 28.10. 08.41 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara **linssiseppa2/seinat-211**, kärki **003221b36** (natiivi-backup).
Muut haarat ennallaan: esineet-metalli-213 f7fd394da, j4-pari 2855d8478 (J4 odottaa Codexin J4-v3:a, ks. edellinen luovutus 0855).
Parit: `REF=<sha> MALLIT=file://<juuri>/ zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/editori-vs.sh 02 05 01`
(pelin valo: lisää `ESIKOM="ui juoksupeli valo vertailu 0"`). Metal: `METAL_ETULIITE="Matkakirja/Juoksupeli/Maail" zsh
tyokalut/metal-tarkistus.sh <scratchpad-kansio>`. Huom: koko nimi "…/Maailma" etuliitteenä → "ei MSL-ohjelmia" (pilkkoja ohittaa).
MAC-UUDELLEENKÄYNNISTYS: ei omia taustaajoja; keskeytynyt pari ajetaan samalla komennolla uudelleen.

## Tehty 08.41–12.40
- **Kujakivet kivi kerrallaan (KK 08.5x/09.0x):** Codexin v01-normaalikartoissa vain ~4 px viiste saumassa, sisus z = 1 → reuna ei
  näkynyt. 90040e55a → 003221b36: JuoksuMaailma.KujaKiviKivi – kiven tunniste v01-kuvien saumoista (JuoksuV4Maailma.KiviJako:
  sokkeli 6×8 ½-limitys, yläpinta 6×1, pilarit 2×8 ⅓-limitys, lattialaatat 3 riviä × 4 laattaa taulukkona), tyynyreuna normaaleilla
  akseleittain (ei pyramidia), kiilto Blinn-Phong (valo − ambient, ei uutta varjohakua), sävy kivittäin valmiina mutta oletus 0
  (LR:n v4c-albedo hyväksytty; _KiviSavy 0 sokkeli/lattia). QA `valo savy kujakivikivet sävy leveys kiilto` (data 0 / 0,07 / 0,08).
  Oma pari 091556 ok. METAL 395/0, PIPELINE 392/0, valovahti ok.
- LR (v4d, TUMMA=0) pitää saumat v01-paikoilla → jako osuu. Lopullinen Codexin lattia tulee nimellä -v02- → LR lähettää saumat →
  lisää KiviJakoon (ilman sitä tyynyreuna ei toimi v02:lla). Lattian venymä v93m 4,6 × 1,8 m/kuva → LR pienentää 1,25×:iin.
- Pelikoodari (penkki): valkoinen päällys = VIS_granite ilman kuvaa, lin Y 0,76 → datakorjaus PK:lle, ei varjostinta.
- LT: taivas v2 keski52 iPadilla ok (värinä 0,19 %) → edellisen luovutuksen Kesken 3 tehty.

## Kesken (seuraava Valoseppä)
1. **Kujakivet:** LR ajaa KK-parin v4d + REF 003221b36 → KK. Kuittauksen jälkeen NS: seinat-211 (kärki 003221b36) junaan.
2. **Aukion valo havainnekuvien tasolle (PT 12.3x, junan 213 lista; sävytys LR:n palatsipinnat-v1-parien kanssa; yön sävy ennallaan).**
   Parit 03/03b: 122758 (tasainen), 123021 (`valo vertailu 0`). Mittaukset (Sonnet, scratchpad mittaa.py):
   - **Pelin valossa aukiolla EI varjoja lainkaan** (lattia "varjokohdissa" 181/183 vs aurinko 165; Foggillakaan ei varjoa).
     Havainteessa varjoja 22 % lattiasta, varjo Y 126 sinertävä vs aurinko 204 (62 %). Selvitä ensin: leivottu valo
     (palatsi v2 "esto leivottu") ilman varjoja vai varjokartta pois (VarjotPaalla/"varjot 200 m" lokissa) – kujilla sama?
   - Aurinko: havainteessa vastavalo hallin takaa oikealta (kameran suunnasta pohjoinen ~45–60° oikealle), korkeus 40–50°;
     pelissä K20 30°/188° (takaa). Lokin "korkeus 45°, atsimuutti 215°" on väärä profiili (Valopohja.cs:333 tulostaa päivän
     arvot, ei K20:tä). Suunnan muutos on yhteinen kaikille kujille (KK 27.10. 08.01 päätti pohja-AZ 170) → kysy PT/KK ennen.
     QA-koe: `ui juoksupeli valo aurinko <korkeus> <atsimuutti>` (seuraavasta juoksusta).
   - Lattia lähellä: havainne lämmin 211/190/178, peli viileä harmaa 167/164/167 (tasaisessa 189/182/179).
   - Hallin julkisivu havainteessa tummempi ja punaisempi (Y 80 vs 120), katto vähemmän oranssi (LR:n pinnat).
3. J4 ja esineet-metalli-213: ennallaan (odottaa Codexin J4-v3:a, ks. luovutus 0855 kohta 2).
