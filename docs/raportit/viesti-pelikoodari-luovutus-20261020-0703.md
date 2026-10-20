# Pelikoodarin luovutus 20.10.2026 klo 07.03 (Postivahdin KOVA RAJA 37 %)

Edellinen: viesti-pelikoodari-luovutus-20261020-0516.md (sen ENSIN-kohdat tehty, ks. alla). Rooli: Pelikoodari (Opus, high).
Proto-repo paikallinen (ei pushia), worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206, nyt haarassa
**pelikoodari/halli-208 = fe6db12fb** (puhdas).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Simu halli-208b (fe6db12fb, käännös 8e864ffdd, _tyo/pelikoodari/halli-208b-app) aja-halli-208.zsh alkoi 07.02, valmis ~07.12
  (lokit/todistus-juoksu-halli-208-{iphone,ipad}-20261020-07xx). Jos ajo ehti loppua ennen nollausta, edellinen vuoro hoiti SIMU VAPAA:n.
  Jos ei: tarkista `pgrep -f aja-halli-208` → kun loppunut, **SIMU VAPAA → JU (local_24e63224…)** heti.

## ENSIN
1. Jos SIMU VAPAA puuttuu (ks. yllä), lähetä se JU:lle.
2. Katso uuden ajon H1 täysikokoisena: KK 07.0x vaati, että hallin katto on JO POISSA, kun Puyi astuu ovesta (ei laajaa pistekuviota).
   Myös H2/H3 + video halli-juoksu.mp4. Lähetä KK:lle (local_8e4fcfed…, kopio PT local_8d8ebf72…): polut + "katto poissa ovella" -havainto.
3. Junaan 208 menee **fe6db12fb** (PT 07.0x: clip vain varianteissa jää, vaikka +20 ms:n syy olisi SSAO). Ehdot: LT:n iPad-mittaus
   fe6db12fb:stä ~207-tasolla (NS teki laiteäpin 06.59, lokit/natiiviseppa-app-207-halli-208-laite/) + KK:n OK H1:lle → PT antaa NS:lle.
   PT on jo antanut NS:lle 5acab1fde:n (jonossa 207-lukitukseen asti); fe6db12fb ⊃ 5acab1fde korvaa sen.

## TEHTY TÄLLÄ VUOROLLA (kaikki proto-haarassa, testit 664/664, tarkista.sh 0, unity-tarkistus 0)
- 485650794 kujan puolikkaille väistöesteet ja kääretaulut (korttelireitillä ei rikkoutunut mitään → R0 ei lauennut).
- dc6c1ac0f + 5acab1fde: seinän häivytys Puyin edestä (JuoksuHaivytys.hlsl JuoksuSeinaHaivytys, _JuoksuNakyma), KK valitsi saman kameran
  (sisäkamera vain QA `korttelikamera 1`). Simu 208c KK OK (Puyi näkyy K2–K4, video, R0 OK).
- Pöly aa2bc8345 → NS junaan 207 (KK OK 06.3x, viesti lähetetty).
- 17db02fc8 HALLI: Korttelisto.Halli (juuren "kortteli2-…"), JuoksuSokkelo.HalliKuja (25 % parittomien sarakkeiden N–S-kujista),
  JatkaHieno → Profiili, JuoksuSokkeloMaailma lataa kortteli2-halli-punakulta.glb; QA `hallit 0|1`. Simu d1557201 KK OK.
- fe6db12fb: clip() vain avainsanoilla (JUOKSU_HAIVYTYS paikallinen katon materiaalikopioille häivytyksen ajan, JUOKSU_SEINA globaali
  vain korttelin/hallin osalla + 3 lämmitysruutua); KattoHaivytys.Ennakko max(2,5 m, 0,4 s), kesto 0,2 s (testi KattoPoissaEnnenOvea).
  NS:n laiteäppi: shader error 0; JuoksuLattia:86/88 SokkelonPinta-varoitus on VS:n 10cdabfa6:sta (ei uusi).
- Varaversio c941aa07d (haara pelikoodari/halli-208-katto: vain kattokorjaus ilman varianttia) – PT: EI käytetä.
- POHJAPIIRROS omistajalle (KK 07.1x): /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/pohjapiirros/pohjapiirros-777.png + pohjapiirros.py
  (data: tilapäinen Peli-testit-vienti, ei committia). Havainto KK:lle/PT:lle: päärakennusten ovet tasan kaikkiin suuntiin (satunnainen
  kierto), ei pääkujia, vain hallit N–S. Jos omistaja haluaa ovet etelään → Kierto() vain asentoihin, joissa päärakennuksen ovi etelään.

## AVOIMET
- Simuskriptit: _tyo/pelikoodari/simu-sokkelo-206/aja-208c-korttelit.zsh, aja-halli-208.zsh (+ sk-*.txt).
- Ensimmäinen JUOKSU_HAIVYTYS-katon häivytys voi nykäistä yhden ruudun (ei lämmitystä); seurataan LT:n mittauksessa.
- Ennallaan: hurraa-isommat odottaa omistajaa, iPadin loppukortti = PT:n UI-pohjakysymys.
