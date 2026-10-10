# Pulu PRT: raportti (pilviajo, haara pulu-prt-pilvi)

- Vastauksia: vaihe 1 = 245 (49 kohtaa x 5), vaihe 2 = 598; yhteensä 843.
- Kesto: noin 85 minuuttia vaiheen 0 päättymisestä (agentit enintään 2 rinnakkain).
- Agenttien tokenit yhteensä: noin 3,4 milj. (vaihe 1: 1,07 milj.; korjaukset: 0,49 milj.; vaihe 2: 1,84 milj.). Mallina Sonnet, effort low.
- Tarkistus: tarkista-era.mjs vaihe1 ja vaihe2: ensimmäisellä ajolla vaihe 1: 58 virhettä (48 käsitemäärää 0–1 + 10 puuttuvaa paikkaa erässä 6), toisella 8 (erä 3), kolmannella 0. Vaihe 2: 4 virhettä (käsitemäärä 1), korjattu, 0.
- tarkista-valmis.mjs: ensimmäisellä ajolla 2 virhettä (rivinvaihto V1 #179, metalause V2 "Torres Vedrasin linjat"), korjattu; lopuksi 0 virhettä, 40 varoitusta (ulkomainen maininta tekstissä: Intia, Brasilia, Iran jne.; vastaukset ovat Portugalin historiaa, luettava silmin).
- Ei tehty: faktojen pistokoe (30 vastausta); se jää Päätoimittajalle/Julkaisijalle.
- Huomio: virheenesto-ohje (7 kohtaa) annettiin agenteille tiedostona (scratchpad), ei kehotteen sisällä.
- Paketti: pulu-esigenerointi/PRT/PRT.json (49 kohtaa, 245 kysymysvastausta, 598 linkkivastausta); maat.json päivitetty (PRT-rivi).
