# Lavastajan luovutus 2.11.2026 klo 17.55 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen viesti-lavastaja-luovutus-20261102-1707.md (lisäykset 261–262) on vain viite. Uudet lisäykset TÄHÄN.

## Rooli ja tapa
- Lavastaja: palatsin rakennukset, tausta, esto, lähikoristeet. Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/, paketit proto-3d/_valmiit/.
  Viestit send_messagella id:llä (osoitekirja); PT:lle ≤ 3 riviä. Kulku: PT nimeää → tee → pari PT:lle → kuittaus → paketit → JU-vientipyyntö
  (local_06f8c680-4618-42bd-a730-9b6a3e17e0b7) + PK-kytkentärivi (local_91a1bc27-6870-46aa-9886-66fd33b68880).
- Esto leivotaan worktreessä /Users/Shared/Claude/wt/proto-lavastaja-esto-2f (wrapper voi palauttaa exit 144, vaikka "1/1 läpi"); xf:n esto-v33.zsh mallina.

## Tila
| asia | tila |
|---|---|
| rakennukset-v112 (8 salin lattia: Stone tile 0,6 m, sauma V4_kivireunus 0,5 cm kehyksenä samassa tasossa) | PT kuittasi 17.5x; paketti 034076c69484, JU-pyyntö + PK-rivi 17.5x LÄHETETTY → varmista vienti ja kytkentä |
| 承乾宫 c3-chengqiangong (vaihe 3a) | koottu ja leivottu (tark.jpg OK: ovet, sali, valtaistuin); uusinta SERMI_TAKA 1,5 ajossa 17.5x (c3-v1/kokoa.log) |

- Pinnat: salipinnat/pinnat.py (v111-versio pinnat-v111.py). Syy v111:n tummiin saumoihin: saumalevy laatan alla jakoi valokartan tekselit.
  PT: 6 000 kolmiota/sali käy; jos LOD käytössä, saumakehys vain lod0:aan (nyt rakennukset-v11x kopioi salien lod0:n kaikkiin lod-tasoihin).

## 承乾宫 (sisatilat-3a/, LUE.md) – PT 17.5x: kuori taustan omasta hallista, 3 huonetta käy
- tausta-v108 kk-tausta-2-3 (EI 1-3). kehys_c.py: OSM way/40631340 + 0,29° hallin seinien suuntaan (akseli +1,82°), PAIKKA (79,31; 385,06), LATTIA 0,15.
- Halli = umpilaatikko, yksipintaiset ulkoseinät u 3,71–23,34, w 3,60–10,07, sokkeli 1,2. kuori_c.py (uusi, 2a:n vanha kuori_c_2a.py): ovet u 12,50–14,56
  y 0,15–3,0 etelä+pohjoinen (seinä, sokkeli, hylly leikataan), keskijänteen eteläikkuna pois; länsipään pieni portti (u < 3) jää taustaan.
- sisa_c.py (uusi; 2a:n sisa_c_2a.py): sisäseinät laatikkoina 0,36 (ulkopinta pois), C-P1/C-P4 pois → huoneet 4,07–7,64 | 7,64–19,43 | 19,43–22,98,
  valtaistuinryhmä keskiakselilla 13,53, sermin takana 1,5; sivuhuoneiden kalusteet SIVU-taulusta; nimilaatta 德成柔顺 ilman tekstiä.
- c3-v1/: kokoa.zsh (koko ketju: kokoa → pinnat → rk → leivo → tarkista), valmistele.zsh (tehty: tausta-lahde = xf:n − 承干宫-halli 2-3 lod0/1/2, rk = xf:n rk
  + xf leivottu + c3), sisa-maski.json, merkinta_c.py (reitti S-N: tyohuone-kuja-338-1:n eteläliitoksen kulma → u 24,4 hallin ja huoneiden välistä →
  etupiha → pääovi → valtaistuimen länsipuolelta u 9,5 → sermin takaa → takaovi → takapiha w 11,7 → u 24,4 → varasto-kuja-338-2:n eteläliitoksen kulma;
  reittiesteet.py: ei esteitä, puut ≥ 1,5 m).
- SEURAAVAKSI: 1) tark.jpg uusinnan jälkeen; sisäkuvan ylänurkissa vinot punaiset kolmiot (ulkoseinän/päädyn osat y > 5,7 runkona) → harkitse
  KATTO_Y tai päätykolmiot kattoon; 2) kuvapari.zsh (xf:n mallista, ennen = tausta-v108 2-3) → pari PT:lle; 3) kuittauksen jälkeen tausta-v109
  (xf tausta-v108.zsh mallina, 2-3 lod0/1/2 tausta_pois_c.py 3a), rakennukset-v113 (pohja v112 + c3 lod0/1/2/törmäys, merkinta_c.py), esto v34 → JU + PK.
- Sitten 钟粹宫, 永和宫, 景阳宫 (reittikartta seuraava-sali/).

- v112 KYTKETTY: PK 60e8b11aa (797/797); salitallenteet v112:lla taso 1 -tallenteiden jälkeen.
- 承乾宫 UUSINTA VALMIS 17.58 (SERMI_TAKA 1,5): c3-v1/leivottu + tark.jpg; jatka kohdasta SEURAAVAKSI 1.
- 20.2x: vinot kolmiot = keskipisteluokitus (isot seinäkolmiot); korjattu kuori_c.py jaa_y (V4_red leikataan KATTO_Y:ssä; vanha kuori_c_v2a.py). Uusi leivonta + kuvapari.zsh → pari-c31.jpg PT:lle 20.2x, ODOTTAA KUITTAUSTA → sitten SEURAAVAKSI 3.
- 20.3x PT:n korjauspyyntö tehty: pinnat.py kaistat() (friisi-v02 CLAMP; vanha pinnat-v112.py), sisa_c.py valtaistuimen osat (vanha sisa_c_v2a.py), kuori_c.py ovileikkaus 1 m kaistoiksi, leivo.zsh SOLU_UV 0,05 (musta pilari = UV1-pinoutuminen seinän kanssa). Uusi pari-c31.jpg PT:lle, ODOTTAA KUITTAUSTA → SEURAAVAKSI 3.
