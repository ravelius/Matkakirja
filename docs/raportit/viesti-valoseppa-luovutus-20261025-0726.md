# Valoseppä: luovutus 25.10.2026 klo 07.26 (kova raja 35 %, Postivahti)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe, NS: local_8254cd90-9a85-4d61-8a06-085e7562f05f,
LT: local_88cfd2dd-bbf9-406c-8f11-4f9740508e26, JU: local_d8cad7de-3ff8-4f4b-8787-baa80836e175. Päiväkirja
`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 25.10. 05.1x–07.2x). Lue tämä kokonaan ennen jatkoa.

## 0. AJOSSA NYT: B9-varmistus (ketju-33)

- B9 **51fa787d3** (haara `linssiseppa2/omistajapari-10`) = B8 6cd66ba7b + vesi **8f4d815a3** + valoarvot **5479991b2**.
  Metal 440/0 + pipeline ok, käännös L2 valmis 07.24, simuajo `sk-omistaja21.txt` (oletusarvot, ei QA-ohituksia; kuvat v9-01/02/05/03/04)
  alkoi 07.24. Loki `kierros2/ketju-omistaja33.log`, ajo `kierros2/ajo-omistaja29-51fa787d3.log`, parit `kierros2/omistaja29-51fa787d3/`.
  Jos ajoa ei ole (nollaus katkaisi): `zsh kierros2/aja-omistaja29.zsh 51fa787d3` taustalle (nohup, kuten kaynnista-33.zsh).
- Mittaa: `python3 -I /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/raakamit.py "nimi=x0,y0,x1,y1;…" <kuvat/raaka/v9-*.png>` (ev −1 -kuville `ev.py`), alueet (03: lahi 0.2,0.6,0.8,0.95 / kauko 0.25,0.2,0.75,0.35;
  02: 0.38,0.55,0.62,0.95; 05: lattia 0.3,0.7,0.7,0.95, seinä 0.02,0.3,0.15,0.6; 01: 0.25,0.5,0.75,0.95; 04: 0.3,0.6,0.7,0.95) tai `alueet-810.py` pareista.
  Odotus (tarkennuksesta t3 + marmori 0,6): 02 ~208 (havainne 203), 03 lähi ~209 (194), kauko ~215 (214), 01 ~189 (206), sali ~166.
- Kun ok: **kuvapari 03A + 04 PT:lle** (PT 06.1x pyysi) ja **NS:lle kuittaus**: grafiikka-211 bddb29f0e, 82cfb92c8, 8f4d815a3, 5479991b2 runkoon
  (B8:n kaksi ensimmäistä NS jo otti rungossa 406d88bb6). Raamattu 9.1: Metal tehty (B9 metal-loki `kierros2/metal-51fa787d3.log`).

## 1. VALO JA MATERIAALIT TÄNÄÄN (grafiikka-211, wt `/Users/Shared/Claude/wt/proto-linssiseppa2-grafiikka`)

- **bddb29f0e**: avointen huoneiden "Floor tile" → pihan kivilaatta (laji 2), "Warm stone" -jalustat → harmaa lohkokivi (11); `_JuoksuMarmoriK`
  + QA `valo marmori x`. Syy: LR:n Floor tile 0,61–0,72 lineaarisena ≈ sRGB 210 (04 sali valkoinen). Simussa sali nyt harmaa kivilaatta ✓.
- **82cfb92c8**: V4_marmori → laji 16 kaikissa osissa (Taihedianin terassi oli mallin tasavärinä 0,88 → 03A puhki; diagnoosi omistaja26).
- **8f4d815a3**: avovesi `_Uoma 2` – taustan ja rakennusten V4_vesi (vallihauta, järvet; kk-tausta V4_vesi 0,10/0,26/0,28) siniseksi, taivas
  heijastuu (PT 07-yläkuva tummanvihreä). Sokkelon lampi ja Taihemenin joki ennallaan. **Ei vielä nähty pelissä** → B9-ajossa ei 07-kuvaa;
  tarkista havainne-editorilla (`REF=<haara> zsh tyokalut/havainne/editori.sh kaikki`, natiivi-ui/havainne-editori-210 3c4271037) tai simulla.
- **5479991b2** ValoKohteet: aurinko 1,55 → 0,9, ambientK 1,45 → 2,3, leivottu 1,25 → 0,7, aurinkoraja 0,45 → 0,25, täyttö 0,75 → 0,4, marmori 0,6.
- Opit: (1) kaikki `valo …`-QA:t päivittyvät heti (KaytaValo → PeliValo), joten viritys = yksi juoksu/kohta, kamera jäädytettynä, kuvat peräkkäin.
  (2) Leivotuilla alueilla (01/02/03) aurinkovoima ei vaikuta; valo = atlas × kerroin × 1,15 + ympäristö × täyttö. (3) Mittaa ev −1:llä, kun kuva
  leikkautuu 248:aan (muunnos × 2^1,45 lineaarisena). (4) Eri juoksuissa varjotila vaihtelee samassa kohdassa → vertaa vain saman juoksun kuvia.
  (5) `palatsi alku` ilman `valo sijoita` vie reitille (04 sali: sijoita −147,6 417 0).

## 2. AVOIMET

1. **05 porttikäytävä tumma** kaikilla arvoilla (lattia ~152 vs 204, seinä ~83 vs 137): leivotun varjon ja auringon suhde liian suuri. Ehdotus:
   leivotun valon kontrastin pehmennys (esim. atlas^0,8 tai täyttö vain varjo-osaan) – erillinen koe.
2. **Lehvästö v1** valmis LR:lle: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/puut-962964/` (3 glb, MASK 0,5, 130 korttia/puu, ~1,3 k kolmiota;
   LUE.md, esik-3.png, kortit.py, lehvasto.py, glb_mask.py). PT:lle ilmoitettu 06.5x. Pelikuva LR:n paketin jälkeen; jos J nousee → 90 korttia.
3. Varjotilan vaihtelu samoissa kohdissa eri juoksuissa (B7) – selvittämättä.
4. Jonossa ennestään: rakettivideo (fc40d1ae7, horisonttiraita), levyvahti.zsh pyörii (pid levyvahti.pid; käynnistä uudelleen jos sammunut).

## 3. MUUTA TEHTYÄ

- Ruutuaika half→float isolla iPadilla (LT): J GPU 10,37 ms, p95 16,83 → vihreä (avoin 2 suljettu).
- JU:n levysiivous: poistettu 5 mergettyä proto-worktreetä (jalki, raketti-muisti, rijks, tulivuoret, varina), jäi grafiikka, rakettivideo,
  hutong, nostot, pimennys. Levy 91 Gi.
