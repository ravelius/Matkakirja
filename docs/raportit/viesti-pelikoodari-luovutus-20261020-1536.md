# Pelikoodarin luovutus 20.10.2026 klo 15.36 (Postivahdin KOVA RAJA 37 %)

Edellinen: viesti-pelikoodari-luovutus-20261020-1355.md (sen ENSIN-kohdat tehty). Rooli: Pelikoodari (Opus, high).
Proto-repo paikallinen (ei pushia), worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206, haara
**pelikoodari/ilmestymiset-208 = 7fef1e3df (v5)**. Seurannan ulkopuolella vain Peli-testit/Testit/TilapainenVerkkoVienti.cs (EI committia).

## JUNASSA / TARJOTTU
- **v3 = haara pelikoodari/ilmestymiset-208v3 = 2a825f04d**: PT OK 15.2x (omistaja pelaa) → tarjottu NS:lle junaan 208 runkoon,
  korvaa palatsi-208 83ba2501e:n. Simu v3: sisältö horisonttiin, uusi juoksu valmiina, ei muurikameraa, 59–63 fps.

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei omia ajoja eikä agentteja. JU kääntää **v5 7fef1e3df** → /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/ilmestymiset-208v5-app,
  sitten JU:lta SIMU NYT (kuorma < 16).

## ENSIN (seuraaja)
1. JU:n SIMU NYT → `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-sokkelo-206/aja-ilmestymiset-208v5.zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/ilmestymiset-208v5-app/Matkakirja3D.app`
   taustalle (loki ajo-ilmestymiset-208v5.log samassa kansiossa). Valmis → **SIMU VAPAA → JU**.
2. Tarkista:
   - fps ja nykäykset videon kehysväleistä: `python3 -I <scratch>/kehysvalit.py <mp4> 5` (skripti alla) + awk-lista > 50 ms:n
     väleistä. v4b:ssä juoksussa 230–330 ms ruudut juoksuajoissa ~2,8 / 5,2 / 15,6 s (A-video ~8,8 / 11,2 / 21,6 s) → v5:ssä pitää
     olla poissa. Alun 0–6 s (tulosikkuna, piilossa lataus, lämmitys) saa olla pitkiä ruutuja.
   - G-video: kamera ei katon yllä/takana hallien kohdalla (v4b: iPhone G ~19–22 s). Puomiloki konsolissa (`grep puomiloki
     konsoli-stdout.log`): hallissa ehdokkaat PPPPPPPP → valittu (0,30, 0,40), EI enää (0,35, 1,70) eikä kamera y > 20.
   - kuva-arkki.png (I1–I7) täysikokoisena.
3. OK → 3 riviä PT:lle (local_8d8ebf72…): sha, fps, polku `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-ilmestymiset-208v5-*/`;
   PT:n OK:lla NS:lle (local_fcc10552…) v5 korvaamaan v3:n junassa (luo haara pelikoodari/ilmestymiset-208v5 shaan).
4. Omat appit: poista ilmestymiset-208v4b-app, kun v5 on todettu.

kehysvalit.py (kirjoita scratchpadiin, jos puuttuu): lukee `ffprobe -show_entries frame=pts_time`, tulostaa ka fps, p50, p95,
välit > 25 ms ja > 50 ms ja suurimman välin (alku-sekunnit ohitetaan 2. argumentilla).

## TEHTY TÄLLÄ VUOROLLA (proto, haara pelikoodari/ilmestymiset-208)
- e707a2475 testi VerkkoAvoimistaTiloista: odotus säteen mukaan (koodi oli oikein; testipalatsin pohjoispää > 200 m).
- 1f7990139 v2: uusi juoksu piilossa (cullingMask 0), kunnes sisältö valmis, myös uusintajuoksussa; kamera asettuu piilossa (dt);
  alue ja ennakot paloina piilossa (40 + 60 / ruutu); peittokarttaan vaakasuora alakatto (KattoMin 2,5 m, < huippu − 1 m) → kamera
  ei portin tunnelin yläpuolisessa muurissa.
- 2a825f04d v3: sisältö koko pelialalle (omistaja 14.40 iPad): KaukoRaja 160 → 1000 m (kasvu 60 m), AlueSade 200 → 1200 m.
- d72d6e3a0 v4: palatsin LOD-tasot lämmitetään (Lammita → LammitaPalatsi), juoksu alkaa vasta Lammitetty (6 ruutua). EI ollut
  nykäysten syy, mutta jää.
- 015dfa3d9 v4b: puomiloki reitin osilla kerran sekunnissa (selvitystyökalu, jää).
- 7fef1e3df v5: AlueJonoon solmupari-avaimin (HashSet<long>), risteys 1,7 Mt → 1–2 kt (GC-tauot); Peittaa: Puyin vapaasäteellä
  pään yläpuolinen rakenne peittää (LahiYli 2,5 m) ja jyrkällä linjalla näytteet myös pystyssä 1 m välein.
- Testit 678/678 (+ tilapäiset ohitukset), unity-tarkistus 0, liikevahti ok (kirjattu).

## AVOIMET / HUOMIOT
- Varjot syttyvät keskietäisyydellä (iPad): VS:n linssiseppa2/varjohaive-208 41096802e PT:n kautta NS:lle; VS: usva ok.
- Uusi juoksu: piilovaihe ~3 s (beige + HUD) koko palatsin sisällön luonnissa; hyväksyttävä, mutta lyhennettävissä (raja 60/ruutu).
- Varasokkelo (ruudukko, jos palatsi ei lataudu): solmut 64–80 m renkaana → poksahdus mahdollinen, ei korjattu.
- Tilapäiset mittaustyökalut: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/palatsi-208/tilapaiset/ (TilapainenAskelMittaus.cs =
  askelten kesto ja allokointi oikealla pohjalla; TilapainenSisaltoMaara.cs = sisällön määrä AlueSaden mukaan). Kopioi Testit/:iin,
  aja `PALATSI_SISAAN=<pohja.json> ./kaanna.sh AskelMittaus`; pohja: media.matkakirja.app/juoksupeli/maailma-v4/kk-pohja-v1d/pohja.json.
- Omistajan päätös 15.11 (Raamattu 7.22): luovutus ≤ 5–10 kt, vain voimassa oleva tila.
