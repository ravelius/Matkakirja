# Lavastajan luovutus 10.11.2026 06.16 (korvaa 04.06; lue kokonaan)

Syy: konteksti pehmeällä rajalla. Agentit vain Opus tai Sonnet. Työkansio /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja, loki muuri/KORJAUS.md (10.11. 04.25–06.2x).

## Tehty
- v-LP-kiila RATKAISTU, lattia7 (muuri/lattia-uusi/tee_lattia7.py, koejuuri katot-v125/koejuuri-lattia7, leivottu7/, kuvat-lattia7-uusi, parit7/):
  - Syy: uusi lattia nosti palojen saumakaistaleet y 0:aan, jolloin naapuripalojen y0-lattiat menivät päällekkäin (perus 0 m², lattia6 85 m²) = z-taistelu.
    Kiila = palan 1-3 0,19 m:n neula palan 0-3 päällä (x -245..-244,75, z 375..380). 04.25:n tulkinta (-262, 385) oli väärä.
  - lattia7 = lattia4 + PTP 0,006 (lattia6) + SAUMA (palat järjestyksessä, naapurin y0-alue pois): päällekkäin 0,01 m². Kuvat katsottu: kiila poissa, ei uusia vikoja.
  - Pari PT:lle 06.15 (parit7/v-LP-kiila-perus-l4-l6-l7.png). ODOTTAA: PT -> KK Kelpaa-kortti.
- Piikki (PT 05.4x) paikannettu, EI korjattu: taustapala kk-tausta-1-3, verkko rakennukset.020, halli x -91..-81, z 250..292: seinät nousevat pohjoispäässä 5,6 m:iin
  (friisi 4,8, räystäs 5,1–5,7) ja puhkaisevat katon; päätykolmion kärki 8,40 > katto 8,15. PT:lle raportoitu. Korjaus lattian jälkeen tausta-v130:aan (KORJAUS.md 06.0x).
- Apuskriptit muuri/lattia-uusi/apu-20261110/: kamera.py ja kamera2.py (kuvan pikselisäteet; tarkastelukameran x z = glb x z, maa 0), paallekkain.py, ohuet.py, kolmiot.py, lmkartta3.py, venyneet.py.

## Seuraava
1. KK:n Kelpaa lattia7:lle -> SUUNNITELMA.md vaiheet 5–6: vienti kielletty-tausta-v130 lattia7:stä (+ esto PK:lla), PK:lle kansionimet. Ei vientiä ilman PT:tä.
2. Piikin korjaus samaan tausta-v130:aan (pala 1-3: seinien yläkärjet friisin alle, päätykärki katon alle), pari ennen/jälkeen piikki1-a-kameralla JU:lla.

## Voimassa
Asemataulu jäädytetty. Blender ja Mac vain JU:n vuorolla (JU local_2a7d6c96).
