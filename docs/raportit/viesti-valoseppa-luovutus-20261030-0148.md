# Valosepän luovutus 30.10.2026 klo 01.48

Lue ensin tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 29.10. 23.53 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara **linssiseppa2/vyo-215** (362182ba5:n päällä), kärki **7e602ee85**
(pushattu natiivi-backup). pinnat-215 d2e439517 (lohkokivi) on jo junassa 215 (runko 362182ba5).

## TAUSTA-AJO KESKEN
- Pari 03/03b REF 7e602ee85 juuri-pk7-v90: tulos `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa-2/a4be9339-067a-4040-b2c3-eb1e5f370169/scratchpad/pari-7e60.txt`
  (viimeinen rivi "HAVAINNE VALMIS <kansio>"). Jos kesken jäi, uusinta:
  `REF=7e602ee85 zsh <scratchpad>/pari-06.zsh juuri-pk7-v90 03 03b` (scratchpad yllä).
  Tarkista: Taihemenin siipimuurien vyö (03, vasen ja oikea yläreuna) näyttää 1067:n kuvion (ennen tasainen 31/49/72), halli 03b ennallaan
  (pohja havainne-editori-20261030-012655). Sitten pari PT:lle 3 rivillä. METAL ei tarvita (vain C# + kommentti; a67a2ba20 METAL 446/0).

## Tehty tässä vuorossa
1. **V4_jalusta_lohkokivi** (pinnat-215 d4ea42592 → d2e439517, da16d6122 pintasarja.json): sokkeli-v03 isompana (UV / 1,2 × 1,6,
   JalustaKiviKoko), _KujaKivi 4, JuoksuJalustaKivi 0,80/0,82/0,95, lohkojen sävyvaihtelu × 1,6. KK hyväksyi 00.29, PT junaan 215.
2. **Vyö** (vyo-215): a67a2ba20 kattotiilen sävy vain _PalatsiKatto 1 (ehto osui vyöhön), sininen (b > g) ennallaan, vyö 0,46/0,46/1,4
   (sovitettu hyväksyttyyn tulokseen, vyo_sovitus2.py). 7e602ee85 JUURISYY: JuoksuSokkeloMaailma.Palatsi.cs KattoPalat pilkkoo
   kattosolmun > 1 m erillisiin paloihin ja kopioi vain UV1:n → UV0 (0,0) → kuvan kulman tummansininen. Nyt UV0 myös paloihin.
   LR:n malli oli oikein; PT:lle 01.1x lähetetty "LR:n UV osuu reunanauhaan" -ohje oli väärä (korjattu PT:lle 01.4x-viestissä).
3. **Sali 04 musta katto** (PT 01.3x): syy pinta – juhlasali.glb (avoimet-v51) "Katto alapinta ruoteet" baseColorFactor 0,09 ×
   raitakuva. Koe bc 1 + 1067 (havainne-editori-20261030-014033/04) näyttää palkiston. Ohje LR:lle PT:n kautta lähetetty.

## Kesken / seuraava askel
1. Pari 03/03b (yllä) → PT; PT:n kuittaus vyo-215 (a67a2ba20 + 7e602ee85) junaan 215.
2. Sali 04: odottaa LR:n materiaalikorjausta → pari 04 PK:n salikameralla (`pari-sali.zsh <juuri>`, REF 91a20d842). Katto on vihreämpi
   kuin havainteen sini-vihreä (vyösävy vain AukionRakennus f-/g-); sävy vasta, jos PT pyytää.
3. B2/B3 (keskiovi, nimitaulu) ovat LR v83:n glb:issä, clamp valmiina → PK:n pari.
4. Valo (varjot, usva, kamera) omistajan kortilla myöhemmin.

## Työkalut (scratchpad a4be9339…/scratchpad)
pari-06.zsh `<juuri> <kohdat>` (REF ympäristöstä), pari-juuri.zsh `<juuren polku> <kohdat>`, pari-sali.zsh `<juuri>` (drone sali 1 +
osasarja), metal2/3.zsh, alue.py (alueen keskisävy), uv_mitta.py (m/UV), vyo_sovitus2.py, glb_katto_koe.py (materiaalin bc/kuva glb-JSONiin),
juuri-katto/ (koejuuri). glb_mat.py ja glb_pura.py: 413a008e…/scratchpad.

## Opit
- Kattosolmun osat kulkevat KattoPalat-pilkonnan kautta: kaikki verkon kanavat (UV0, UV1, värit) on kopioitava paloihin.
- Tasainen väri ilman kuviota lähikuvassakin = UV puuttuu (0,0), ei mip eikä mallin UV.
- Kertoimet ketjuuntuvat: tarkista, ettei aiempi sävyhaara (ehto "> 0.5") osu samaan materiaaliin.
- Koejuuri: symlinkit LR:n juureen + muokattu glb (vain JSON) → materiaalikoe ilman LR:ää.
