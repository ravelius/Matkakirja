# Linnanrakentajan luovutus 2.10.2026 klo 18.3x (LOPULLINEN 22.2x, tilinvaihto) (Opus high; tilin viikkoraja lähellä)

## TILA 23.4x: OMISTAJA HYVÄKSYI skinnatut hahmot (peili dad4d0f39cd2c9c2). PR #3885 mainiin (Julkaisijan juna),
## Siirtoseppä vaihtaa osoittimen. Seuraavaksi: webin AnimationMixer vasta Päätoimittajan käskystä; Allymes odottaa.

## 3.10. 15.x: MARCUS v13 (v13_marcus, --kohde marcus --kertoja …/marcus-aurelius/kertoja-v1/ajat.json): luvut marcus-luvut-v13.json
## (6f314058e) Pelikoodarilla, stillit Päätoimittajalla, leikkausajat Linssisepällä. ODOTTAA: Sisältökirjurin rajatut värittömät
## kaiut (kaiku-sade/uhri/kuolinvuode.png → proto-3d/_lahteet/marcus-aurelius/gobot-v13/, sitten luvut uudelleen ja stillit).
## Savu v5 (savu-v5/savu-atlas-v5.png) Pelikoodarilla; omistaja päätti 14.2x savu oletukseksi, väritön, oma musiikki.

## 3.10. 10.x: v13c (--v13c: rajatut kaiut viistosti, ei reunahehkua, virta väistää; --kaikuvari seepia|neutraali;
## --savu <kansio>: savukiekuran maski kaikkiin projektoreihin, sokrates_savu.py → proto-3d/_lahteet/sokrates/savu-v1/) luvut
## sokrates-luvut-v13c.json + gobot-v13cA Pelikoodarilla (lippuina A/B, väri, savu). Savun koevideo v13c-savu-koe.mp4 (df639c875).
## Varasto-havainnekuva tools/linssit/blender/ajattelijat_varasto.py → docs/raportit/kuvat/ajattelijat-varasto/ (f1f86dc90).
## Kaikusarja B odottaa Codexia (vaalea marmori, oraakkeli ilman pylvästä, sotilas, Sokrates yksin).

## SOKRATES v12–v13b VALMIS (Päätoimittaja hyväksyi 3.10.; sotilaan kuva paikkamerkki, Codex korvaa): sokrates_bysti.py --v13 TAUSTA SYKE [--kertoja ajat.json] (= v12 intro: musiikki alusta,
## leikkaukset 17,35/20,85/21,6/22,4, Rembrandt 24,1 s, sivuvalo; + v13 kierrokset kertojan Iv4 William -oletusoton mukaan, alku 28,0 s).
## Luvut docs/raportit/ajattelijat-v11/sokrates-luvut-v13.json (haara linnanrakentaja-sokrates-bysti ffa1c9c94) Pelikoodarilla,
## stillit Päätoimittajalla. Kaiut keskisävy (sokrates_kaiku.py keski) → proto-3d/_lahteet/sokrates/gobot-v13/. Marcus ei muuttunut.
## Ajo: --v7 <gobot-v13> <ulos> --koko 540 1170 --naytteita 24 --v13 <gobot-v10> <syke.json> --vinjetti 32 --terava --ruudut …
## (syötteet scratchpad ef21bbc6…/ajat). Linssiseppä sai intron leikkausajat.

## AJATTELIJAT v11 (3.10. 00.3x, Päätoimittaja hyväksyi): sokrates_bysti.py --v11 (= --v10 + alkukuvat varjon puolelta,
## taustavirta 25 mm/s ±15 %, kaikukamera lähempänä). Luvut docs/raportit/ajattelijat-v11/ (haara linnanrakentaja-sokrates-bysti
## d7b51a99f) lähetetty Pelikoodarille. Syötteet: scratchpad ef21bbc6…/ajat (gobot-v4, gobot-v10, syke.json, marcus/).

## SEURAAVA ASKEL (tilinvaihto 22.2x)
0c. **23.2x:** irralliset liekit (fatabuuri/keittiö/laituri) = tunnelman JSON-liekit, joita natiivi ei leikkaa (vain tyhja:-liekit);
   rakenna.mjs jättää kohdistamattoman tilan liekit pois (1bb745076, testi dioraama-blender). Kaikkien liekkien alla teline 0–5 cm
   (glb-mittaus). **Uusin peili dad4d0f39cd2c9c2**; Siirtoseppä kuvaa fatabuurin, keittiön, laiturin. Huoneliekit natiivissa tuplana (JSON+tyhjä).
0b. **23.1x:** vartija kääntyi 0,8 m tulikorista ("tulessa") → partio x −15,2; vesipoika irti tulisijasta ja pöytä/säkkiraosta;
   reittitesti: liekit vartalon korkeudella ≥ 1,0 m, laatikko-/pyöreät esineet reunasta ≥ 0,35 m (6cbed3004).
   **Uusin peili 6cd8735b3a42ea3c** (blender 916731d7); Siirtoseppä kuvaa Muurinharjan ja keittiön.
0. **23.0x:** Päätoimittaja löysi erän 1b videolta törmäyksen (Muurinharjan vartija talonpojan läpi) → reitti x −16,0…−11,4, vesipoika
   1,05 m kokista, reittitesti hahmot 1,0 m + kävelijäparit (a3dd64661). **Uusin peili 01fb6118454642bf** (blender 916731d7);
   Siirtoseppä kuvaa Muurinharjan ja keittiön uudelleen → Päätoimittaja → omistaja.
1. (vanha) Odota Siirtosepän iPhone-pelikuvia peilistä **275a276538ace40a** (= erä 1b, kampauskorjaus, sisäinen kuva
   `_valmiit/linna-hahmot/v1/kokoelma-era1b.jpg`; edellinen peili 5de728bc ilman y-korjausta) → Päätoimittaja → omistaja.
2. Omistajan OK:n jälkeen: PR haarasta `linnanrakentaja-linna-skin` mainiin (blender.json 916731d7, hahmot-skin.json, reitit,
   rakenna.mjs/vie-blender.sh, reittitesti) ja osoitin käsiajolla osoitin=true (omistajan lupa).
3. Webin AnimationMixer (Linnanrakentajan, vasta omistajan OK:n jälkeen).
Älä aloita uutta ennen näitä.

## Kärki nyt: linnan väki skinnatuiksi hahmoiksi (omistaja 18.0x, polku (a))
- Omistaja: "haluan ne valmiit mallit joiden päälle vain vaihdetaan vaatteet ... tärkeintä mahdollisimman sulava liike".
- **Vartija v1 valmis** `_valmiit/vartija-skin/v1/` (vartija.glb 3 Mt, vartija.json, LAHTEET.md, esikatselu): Quaternius CC0
  (Outfits Fantasy: Male_Ranger sävytettynä villaväriin #6b6259; Universal Base Characters: pää + parta; Universal Animation
  Library: idle/kavely/puhe/tyo). 65 luuta, kasvot +Z, kävely in-place, kavely_sykli_m 1,273 / leike 1,333 s.
- Työkalu `tools/dioraama/blender/hahmo_skin.py -- <asu.gltf> <ulos> <nimi> [--parta] [--hiukset Hair_X] [--korvaa KUVA=polku]`.
  Lähteet: `proto-3d/_lahteet/quaternius-{ubc,asut,ual}/` (+ T_Ranger_vartija.png). Asut Standard-paketissa: Peasant ja Ranger (m/n).
- **Siirtoseppä** tekee natiivin: DioraamaGlb skin + oma sekoitin (crossFade 0,25 s, timeScale = nopeus × kesto / sykli),
  haara `siirtoseppa/linna-skin`; iPhone-video Päätoimittajalle ennen kuin kaikki 17 vaihdetaan.
- **Päivitys 18.4x:** vartija v2 `_valmiit/vartija-skin/v2` (8 988 kolmiota, vain perusväri 512; Siirtosepän budjetti 8–10 k).
  Peilipaketti **b116ad23cc81bcab** (blender 6293384c, ei osoitinta) haarasta `linnanrakentaja-linna-skin` (ei PR:ää):
  `henkilot[id].malli3d.skin` = rakenna.mjs lisaaBlender + `js/dioraama/hahmot-skin.json`, vie-blender.sh vie `hahmot/*.glb`
  (lähde `_valmiit/olavinlinna-blender-v26/hahmot/<henkilo>.glb`). Siirtoseppä kuvaa Muurinharjan vartijan iPhonella.
- **Päivitys 19.3x:** vartija v3 (perusväri nostettu 1,35·p^0,8, parta värjätty kuvaan; natiivin kärkivärit/AO kunnossa,
  tummuus oli tekstuurissa) + reittikorjaus (Muurinharja z −19,6, keskushalli z −9,9; `tests/dioraama-reitit.test.mjs`,
  keittiö ja kierreportaat todo) → peilipaketti **2abec0c92507d1fc** (blender 19545e38). Siirtoseppä kuvasi videon
  `proto-3d/lokit/siirtoseppa-skin3/vartija-v3-kavely-rajattu.mp4` → Päätoimittaja → omistaja. ODOTTAA OMISTAJAN OK:TA;
  sen jälkeen osoitin (käsiajo osoitin=true haarasta linnanrakentaja-linna-skin tai PR), muut 16 hahmoa hahmo_skin.py:llä
  (Peasant-asut) ja webin AnimationMixer.
- **Päivitys 20.3x:** omistaja hyväksyi liikkeen (20.1x); moonwalk korjattu moottorissa (Siirtoseppä 6ad1ab62, GLB oikein:
  kasvot +Z, tukijalka −Z). **Erä 1 (11 henkilöä, kaikki 16 esiintymää)** `_valmiit/linna-hahmot/v1/` (+ kokoelma-era1.jpg,
  LAHTEET.md, era1.sh) → Päätoimittajan tarkistukseen; OK:n jälkeen peilipaketti: kopioi glb:t `olavinlinna-blender-v26/hahmot/`,
  lisää henkilöt `js/dioraama/hahmot-skin.json`:iin (skaala = henkilot.js pituus / json pituus_m), vie-blender + vie-dioraama
  (osoitin=false) haarasta linnanrakentaja-linna-skin; keittiön ja kierreportaiden reitit korjattava (todo-testit).
- **Päivitys 21.xx:** Päätoimittaja hyväksyi erän 1 (kaavut/esiliinat puuttuvat = paketin raja); kampaukset aikakauteen
  (huput: talonpoika, renki, vesipoika, apulainen; muut Hair_Buzzed; värit tasaiset). Kaikki 16 esiintymää peilissä
  **5de728bc349cc54a** (blender 916731d7) haarassa linnanrakentaja-linna-skin; keittiön ja kierreportaiden reitit korjattu
  (reittitesti ilman todo:ta). Siirtoseppä kuvaa iPhonella jalkavarjon kanssa → pelikuvat Päätoimittajalle → omistaja.
  Omistajalle EI Blender-kokoelmia, vain pelikuvia. Erän ajo: `tools/dioraama/blender/hahmot_era1.sh`.
- **Päivitys 22.1x:** jalkavarjo (Siirtoseppä) ei vielä näy; mittaus tila-glb:istä: lattia = paikka.y ±1 cm paitsi fatabuuri +0,10
  ja kappalainen +0,22 → korjattu datassa. (22.4x: keskushallin "ei lattiaa" apulaisen/vartija2:n alla oli MITTAUSVIRHE —
  säde osui tarkalleen kolmion reunaan; 2 cm ruudukko: lattia yhtenäinen, y 2,90 = paikka.y. Datassa ei jalkavarjon estettä.)
  **Uusin peili 275a276538ace40a** (blender 916731d7, kaikki skinnatut + reitit + y). Siirtoseppä kuvaa → pelikuvat Päätoimittajalle.
  Seuraavaksi omistajan OK:n jälkeen: osoitin (käsiajo osoitin=true haarasta linnanrakentaja-linna-skin TAI PR mainiin + käsiajo)
  ja webin AnimationMixer (hahmot3d / DioraamaHahmot-pariteetti, malli3d.skin).
- **Webin AnimationMixer on Linnanrakentajan** (Päätoimittaja 2.10.), mutta VASTA kun omistaja on hyväksynyt natiivin vartijavideon.
- AUKI: kolmiobudjetti (32 k/hahmo → LOD 8–10 k
  tarvittaessa); muut hahmot (talonpoika/renki/vesipoika/kokki = Peasant, naiset Female_Peasant), katselu- ja kääntöleikkeitä ei
  UAL Standardissa (katselu = idle, kääntö juurikiertona). (b+)-suunnitelma (16 nivelen spline) on LOPETETTU.

## Tänään valmiit (2.10.)
- **Linna, mustat korttelit**: astc-mip.swift hävitti alfan mip-tasoilta 1+ → puukortit mustina iPadilla. Työkalu korjattu
  (`proto-3d/tyokalut/astc-mip.swift`), puukortit+aluskasvit uudelleen; paketti ec7eb28617fddb9f (blender e75b51a0) **tuotannossa**
  (omistajan osoitinajo, run 37003175157). PR #3851 (blender.json + minikartta.py) Julkaisijan junassa.
- **Pienoiskartta** `_valmiit/olavinlinna-minikartta/v1` (väri + paperi, @2x/@3x, huonepisteet json) → Siirtoseppä; korostus 8 pt
  piste olemassa olevalla tyylillä (Natiivi-UI).
- **Ajattelijat** (ei videoita enää, omistaja 12.1x): Marcuksen kaiut (sadeihme CC BY Kokkonen, uhri PD, Delacroix PD) ja
  kierrokset 2–3 marcus-tekstit.json + marcus-luvut.json; sokrates-luvut.json; kartan 3D-päät Sokrates/Marcus/Platon
  (ämpärissä ajattelijat/kartta/v1); Platon L0–L2 (SMK KAS2111); prologin kytkin (ämpärissä ajattelijat/yhteiset/v1);
  Sokrateen taustavirta 18 katkelmaa + 3 OFL-fonttia (`_lahteet/fontit-kreikka`). Kaikki haarassa `linnanrakentaja-sokrates-bysti`.
  Reitti: aineisto Pelikoodarille (web), Linssiseppä 2 tiedoksi (natiivi muuntaa webin datasta).
- Vientipaketteihin aina LAHTEET.md (Julkaisijan vie-paketti.sh hylkää muuten).

## Odottaa omistajaa
- Marcuksen intromusiikki; Marcuksen jälkeinen ajattelija (Päätoimittaja ehdotti Platonia; kohtausta ei aloitettu).
- Allymes ei aloiteta ennen nykyisiä töitä.

## Worktreet
- `/Users/Shared/Claude/wt/linnanrakentaja-sokrates-bysti` (ajattelijat, ei PR:ää), `linnanrakentaja-linna-skin` (peili, ei PR:ää),
  `linnanrakentaja-mylly-lauta`. linna-alfa poistettu (PR #3851 mergetty 2.10.).
