# Linnanrakentajan luovutus 2.10.2026 klo 18.3x (päivitys 21.xx) (Opus high; tilin viikkoraja lähellä)

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
- `/Users/Shared/Claude/wt/linnanrakentaja-sokrates-bysti` (ajattelijat, ei PR:ää) ja `/Users/Shared/Claude/wt/linnanrakentaja-linna-alfa`
  (PR #3851; poista `tools/uusi-worktree.sh --poista` mergen jälkeen).
