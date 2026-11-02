# Lavastajan luovutus 2.11.2026 (tiivis, PT 15.2x) — LUE TÄMÄ, ÄLÄ VANHAA

Vanha luovutus docs/raportit/viesti-fable-luovutus-20261027-lavastaja-1255.md (344 kt, lisäykset 1–253) on VAIN VIITE: älä lue sitä
kokonaan; hae tarvittaessa otsikolla (grep -n "LISÄYS 25" …). Uudet lisäykset TÄHÄN tiedostoon.

## Rooli ja tapa
- Lavastaja (ent. Linnanrakentaja): palatsin rakennukset, tausta, esto, lähikoristeet. Työkansiot /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/,
  paketit /Users/Shared/Claude/proto-3d/_valmiit/. Viestit send_messagella id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä.
- Haara lavastaja/lisays-217 (push: git push origin <paikallinen>:lavastaja/lisays-217).
- Kulku: PT nimeää salin → tee → kuvapari PT:lle → PT kuittaa → paketit → JU:lle vientipyyntö + PK:lle kytkentärivi.

## Palatsin sisätilat (vaihe 2): tehty tänään
| sali | kansio | malli | paketit (SHA256SUMS) | tila |
|---|---|---|---|---|
| 翊坤宫 2a | sisatilat-2a/y-v1 | y-yikungong | rak v101/v102, tausta v102, esto v27 | viety |
| 永寿宫 2b | sisatilat-2b/ys-v1 | ys-yongshougong | rak v103, tausta v103, esto v28 | viety 14.40 |
| 体和殿 2c | sisatilat-2c/th-v1 | th-tihedian | rak v104 8768c0dd365d, tausta v104 70a574434a80, esto v29 df8a1b97336e | kuitattu, JU-pyyntö 14.45 |
| 太极殿 2d | sisatilat-2d/tj-v1 | tj-taijidian | rak v105 f4335f490ad0, tausta v105 6ebd88f50f6c, esto v30 cb8a7d60e3da | kuitattu, JU-pyyntö 14.5x |
Kunkin kansion LUE.md = mitat, erolista [A], reitti, tarkistus, ajojärjestys. Uusin pohja kopioitavaksi: sisatilat-2d.

## Sisätilan tekotapa (uusi sali, esim. 2e)
1. Kopioi sisatilat-2d/tyokalut → sisatilat-2X/tyokalut; vaihda kehys_c SW/SE/PAIKKA (OSM-pohja pohja.json:sta:
   /Users/Shared/Claude/proto-3d/_valmiit/juoksupeli-kk-pohja-v1d-pk8-vienti-20261031/…/pohja.json), analysoi_c/tausta_talo/iou_y POHJA + uusin tausta (v105).
2. tausta_talo.py (missä laatassa), analysoi_c.py + seinat_c.py → seinät, pylväät, jalusta, puuttuva pääty (vaihtelee: 2a–2c länsi, 2d itä).
3. Vakiot: kehys_c (U/W, LATTIA, PYLVAAT_U), kuori_c (RAJA [tarkista naapurit], KATTO_Y, KESKI/OVI ikkunoiden väliin, SEINAT, pohjoisraja), sisa_c (UX, KORKEUS,
   KESKI_U, SEINA_H, OVI, portaat jalustan reunasta, tunnusosat), merkinta_c (reitti lähimmän avoimen huoneen liitoksista: avoimet-sijoitus.json).
4. Ajoskriptit tj-v1:stä (kokoa → iou_y → valmistele [pohja = edellisen salin tausta-lahde + rk] → leivo (taustalle, ~3 min) → kartta_c → kuvapari).
5. Kuittauksen jälkeen tausta-v1NN.zsh / rakennukset-v1NN.zsh / esto-vNN.zsh (edellisestä kopioiden). Esto: worktree
   `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree add --detach /Users/Shared/Claude/wt/proto-lavastaja-esto-2X natiiviseppa/juna-218`
   (paikallinen haara; estokoodi b0ea927c8 ei muuttunut 3a22dbaf2:een asti), ajon jälkeen `worktree remove`. Esto-paketti käsin (LAHTEET.md + SHA256SUMS kuten esto-v30).

## Bugi 2 (lähikoristeet, juna 218)
- Pelin x on peilattu (itä = −X; JuoksuPalatsi.Pohjaan). lahipuut-v13 poisti VÄÄRÄN (itäisen) rakennuksen dougong-intercolumn-rivit.
- lahipuut-v14 = v13 − LÄNTISEN rakennuksen rivit y 9,59 (etu z −7,67…−6,93, taka z −22,50…−21,75; 26 + 26) → _valmiit/juoksupeli-kk-lavastaja-lahipuut-v14-vienti-20261102
  (809458bef99b). JU-pyyntö lähetetty 14.5x. Kysytty PK:lta: palautetaanko v13:n itäiset rivit (v15 = v14 + v12:n itäiset rivit x 66…89, z −2,3 / −17,2)?

## JONO (PT 15.2x)
1. ENSIN: PK:n lähikoristerivi (lahipuut-v14 / mahdollinen v15) — vastaa PK:n viestiin, tee v15 jos pyydetään.
2. Varmista JU:n viennit: v104/v104/esto-v29, v105/v105/esto-v30, lahipuut-v14.
3. 体元殿 (way/40631789, keskipiste −163,01; 343,25; 太极殿:n pohjoispuolella, sen takana 长春宫戏台) → sisatilat-2e.
4. 长春宫 (way/40631798, −164,21; 373,73).
5. 咸福宫 (way/40631832, −165,75; 424,46).
