# Karttaseppä: luovutus 29.10.2026 klo 22.10

Edellinen luovutus: 67dc63041 (viesti-karttaseppa-luovutus-20261029-1841.md, PR 5611 auki). PT pyysi nollausta (konteksti 27 %).
**Taustalla ei ole käynnissä olevia ajoja, palvelimia eikä editoriajoja.**

## 1. Maasto, juna 214 (TF 214, omistajan tärkein)

- JU:n z10–12-kopio on valmis. Tarkistin CDN:n klo 22.09:
  - layer.json: maxzoom 12, ei parentUrl:ia, tiles `{z}/{x}/{y}.terrain?v=2026-10-29-maailma`.
  - z10–z12: viisi pistokoetta tavulleen samat kuin 2026-10-16-maailmassa.
  - z7/133/95 on sama kuin paketissa (Alppien saumakorjaus).
- Lähetetty NS:lle klo 22.10: yhdistä `peili/proto/karttaseppa/maasto-214` = 4486eb40b junaan 214. Viesti meni perille.
- Karttasaumojen korjaus (SSE) 5767441da on jo juna-214:ssä (tarkistettu `git branch -r --contains` klo 18.47).
- **SEURAAVA:** tarkista, että 4486eb40b on NS:n `juna-214`:ssä:
  `git -C /Users/Shared/Claude/wt/proto-karttaseppa-maasto-214 fetch -q natiivi-backup; git -C … branch -r --contains 4486eb40b`.
  Sen jälkeen PT:lle yksi rivi: SSE + maasto junassa 214, SHA:t.

## 2. Meridiaaniportti 06, juna 215 (PT:n erä 21.1x)

Kaikki tiedostot kansiossa `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/portti06-215/`.

- **Erolista ja suunnitelma:** `erolista-06.md` (8 kohtaa, suunnitelma A–D). PT kuittasi klo 21.4x.
- **Parit:**
  - `lokit/havainne-editori-20261029-212123/06`: pelikamera.
  - `…-212644/06`: testikamera havainteen kulmasta (4 m korkeus, 8 m taakse, 3° alas, pystykenttä 65°).
  - Testikameraa varten on väliaikainen kopio `wt/proto-karttaseppa-maasto-214/tyokalut/havainne/editori-tk.sh`, jossa on env TK06. Se on commitoimaton, eikä se kuulu NUI:n työkaluun.
  - PK:n ajo 205214/06 ei kelpaa, koska maailma ei latautunut loppuun ennen kuvaa.
- **Codex-osat:** `codex-osat/OSAT.md` sisältää 11 osaa rajauksineen, ja PK otti sen yhteistilaukseen. PT 21.4x: ristikko-ovet ja -ikkunat (1070/1071) sekä palkkimaalaus 1067 ovat jo pintasarjassa. Codexilta tulee vain uusi nimitaulu B3.
- **Muodot k4 (valmis):** LR:n kk_wumen.py:n kopio `K/tyokalut/kk_wumen.py`, KS06-lohko (oletukset = k4; ylikirjoitus env KS06 json).
  - Päälinna:
    - lappeet koverat: jyrkkyys (0,4, 2,2)
    - nurkat ylös
    - yläkatto lähes alaräystään levyinen: yla_ulk 5,5, ala_ulk 2,6
    - alakatto jyrkkä: ala_nousu 4,0
    - korkeus siirretty kattoon pylväistä (pylvas_h 5,4) ja yläseinästä (yla_seina_h 0,45)
    - huippu ennallaan
  - Kulmapaviljongit ja siipihallit: koverammat katot ja nurkat ylös.
  - Vienti `vie-k4/` (LOD0–2 + törmäys + rakennukset.json); paikka, mitat ja huippu ennallaan.
  - Työkalut: `koe.zsh <nimi>` (vienti + renderöinti) ja `renderoi06.py` (Blender, havainteen 06 kamera; vastaa pelin testikamerakuvaa). Parametrit myös tiedostossa `k4-parametrit.json`.
  - Vertailukuvat: `r-k4-pari.png`, `r-k3-zoom.png`.
- **LR (luovutus 2be4ffee9):** seuraava LR-sessio ajaa ketjun 1–5 (C1-räystäät uudelleen, palatsi_pinnat, hallit_pinnat, koristeet, pikkutiili, pintatarkistus) vie-k4:stä versioon rakennukset-v136. Muut mallit pysyvät ennallaan. LR ottaa KS06-lohkon kk_wumen.py:hyn samaan pakettiin (PT: työkalu ei saa haarautua).
  - **Este:** vie-k4:stä puuttuvat valokartan UV:t (TEXCOORD_1/2) ja valo. LR kysyi PK:lta, piirtääkö peli mallin ilman niitä. Kuvat tulevat KS:lle ja PT:lle.
  - PT 22.2x: LR:n v75 sisältää jo portin C1:n.
- **SEURAAVA:**
  1. Kun v136 on valmis, aja pari 06 PK:n ohjeella:
     ```
     J=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kuja05-pk6-20261029/juuri-pk7-v72
     REF=527beacc0 RUNKO=natiiviseppa/juna-214 PALATSI=file://$J/ ESIKOM="ui juoksupeli palatsi url file://$J/kk-pohja-v1d-pk7/pohja.json" zsh tyokalut/havainne/editori.sh 06
     ```
     Juuren rakennukset-paikka pitää osoittaa v136:een (oma juurikopio, kuten LR:n `cp -c -R -P` + `ln -sfn`). Aja editori.sh omasta proto-worktreestä, ei esikatselukopiosta ("VIKA työkalun kopio"). Aja 06 yksinään, koska kamera hyppää edellisestä kohdasta.
  2. Merkitse erolistaan ok/vika kohdille 1, 5 ja 6.
  3. Kohdat 2 ja 4 (Codex ja pintasarja) sekä 7 ja 8 (LR:n osasarja `osasarja-v1/kielletty-osasarja-v1/`, ladonta `osasarja_koe.py`) kytketään, kun ne valmistuvat.
  4. Testit, push ja rivi PT:lle.
- **VS:n pintanimet (vain nämä):** V4_palatsi_katto, V4_palkkivyo (1067), V4_palatsi_friisi, V4_red, V4_portin_ovi, V4_wood (1070), V4_marmori. Puuttuva pinta pyydetään VS:ltä.

## Muuta

- Erä-worktree `/Users/Shared/Claude/wt/karttaseppa-portti06` (haara karttaseppa-portti06): tässä vain tämä luovutus.
- PR 5611 (luovutus 18.41) on auki; tämä luovutus korvaa sen.
