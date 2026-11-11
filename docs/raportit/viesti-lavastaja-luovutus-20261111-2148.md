# Lavastaja: luovutus 11.11.2026 klo 21.48 (konteksti pehmeä raja)

Edellinen: viesti-lavastaja-luovutus-20261111-1222.md (commit 4f1db5698, haara lavastaja/luovutus-20261111-1222) – lue sen "SALI", "LISÄYS 18.2x"
ja "LISÄYS 18.3x" yhä voimassa olevina. Työpolku W=/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-v5-tyo (leivonta-216/uusinta/leivonta-v5
on symlinkki tähän). Id:t: KK local_d5f31591, PT local_8d8ebf72, NS local_0f7f169f, JU local_2a7d6c96, PK local_d3bb1f78, Postivahti local_1f31f830.

## KÄYNNISSÄ: LEIVONTA-V5 (pala 3.1)
- 21.19 v5 pysähtyi levyrajaan (vapaana 11 Gi; rakennukset 156/156 VALMIS, myös 48 mustaa uusittu). Poistin omat koe-npy:t (3 Gt) → 14 Gi.
  leivonta-v5.zsh:n levyraja 25 → 10 Gi; uudelleen käynnistetty 21.47 (nohup, ajo-leivonta-v5.log), vaihe 4 OSASARJA ajossa.
- kk-tausta-1-2 VALMIS 21.23 (tausta-1-2.zsh). HUOM: katto-longzongmen 1008 kolmiota (v133c 1041) → tarkista ennen pakettia (33 puuttuu?).
- SALI: aja_sali.zsh vaatii nyt pienen kokeen (SALI_KOE=1 NAYTTEET=64 zsh aja_sali.zsh <koekansio>, sitten touch $W/SALI-KOE-OK); v5 päättyy
  "PAKETTI ODOTTAA SALIA". PIENI KOE KAATUI 21.23: avoin_uv2.py (kielletty-rakennukset/tyokalut) ValueError: accessor count 0 avoimet-v52/juhlasali.glb:ssä
  (tyhjä primitiivi) → korjaa avoin_uv2.py ohittamaan count 0 -primitiivit, aja koe uudelleen, katso kuva, sitten SALI-KOE-OK ja v5 uudelleen (vaihe 5–6).
- Paketti tarvitsee leivonta-216/uusinta/LAHTEET-leivonta-v5.md (kirjoittamatta).

## PALA 3.1b (KK 18.31: tapa B HYVÄKSYTTY, tehtävänannon kohta 4c, versio 3)
- Tarkkuuskartta + ehdotus: $W/EHDOTUS-KK-pala3-1b.md, $W/tarkkuus-z/ (työkalu $W/tarkkuuskartta.py).
- Koeputki $W/koe-b/: aja_koe.zsh <pala> <x0,x1,z0,z1> [koko], leivo_koe.py (= leivo_koe_alku.py (leivo_valo.py:n näkymä) + leivo_koe_loppu.py; kokoa uudelleen
  muutosten jälkeen: { echo "import sys; sys.path.insert(0, '<tyokalut>')"; cat alku loppu; } > leivo_koe.py), koe_apu.py (PIL/numpy-ketju).
- KOE VALMIS 21.36: $W/koe-b/ulos-6.25/kk-tausta-1-3-lod0.glb ja ulos-12.5/... (valo_rgbm 4096², UV1 uusi, koealue pohjassa x −180…−95, z 290…470;
  koelattia 6,4 / 12,3 cm, koealueen seinät 12,2 / 11,8 cm, muu pala 48 / 24 cm). Kerrokset erikseen *-valo-rgbm-suora.npy / -pehmea.npy.
  Pehmeä = polvi⁻¹(v5) − karkea suora (sama valo_pakkaa-ketju); negatiivisia 0,68 %. 2048 ei riittänyt (muu pala karkeni), 4096 automaattisesti.
- kk-tausta-kuja-1-3: v5:n lattia on jo 5,4 cm → koetta ei tarvita (käytä v5:n glb:tä sellaisenaan; skriptin nan-tarkistus korjattu 21.4x).
- KAMERAT (NS 21.46): lokit/natiiviseppa-juoksu-pala3-koekamera-1 (nykypeli, K1–K6). LAV pyysi uusinnan: K7 = sijoita −136 336 suunta 180 (V2-kohta,
  kujan suu), K6 → sijoita −136 425 suunta 0 (vanha K6 seinän sisällä). NS ajaa saman skenaarion koe-glb:illä (`palatsi mallit file://…`).
- SEURAAVAKSI: (1) NS:lle/JU:lle koe-glb:t pariajoon (vanha `valo elava kaikki` v5 | koe `valo elava pelaaja`), molemmat tarkkuudet; (2) parit KK:lle
  täysikokoisina (Raamattu: pari sama kohde kokonaan); (3) täysi tarkka leivonta VASTA KK:n sanalla. Muisti: 4096² valoatlas palaa kohden on koeratkaisu, ei paketti.
- LISÄYS 21.5x (NS): koekamera-2 tilattu JU:lta (nykypeli, 0f851ddbd) → lokit/natiiviseppa-juoksu-pala3-koekamera-2: K6 (−136 425 0) ja K7 (−136 336 180) pelikameralla, K7b = K7 + testikamera 2.7 7.1 12 29. Vain K1/K1b ovat koekamera-1:ssä pelikameralla (K5 testikamera 3.0 6.88 10 45; lokin kamera = pelikameran paikka). Koe-glb-pariajo on erikseen pyydetty NS:ltä.
