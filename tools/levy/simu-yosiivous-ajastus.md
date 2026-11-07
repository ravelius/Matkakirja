---
name: matkakirja-simu-yosiivous
description: Päivittäin klo 4.00: tyhjentää iPad-asennuksen välimuistin ja sammutettujen T7-simulaattorien poster-välimuistin, ilmoittaa vian Päätoimittajalle.
---

Matkakirja-projektin yösiivous (omistaja 1.11.2026 klo 11.2x: ajetaan Clauden ajastuksena, koska macOS estää taustapalvelua (launchd) lukemasta T7-levyä; omistaja 7.11.2026 klo 17.48: myös iPad-asennuksen välimuisti joka yö; skripti on Julkaisijan, repossa tools/levy/simu_yosiivous.py, ajettava kopio /Users/Shared/Claude/_levy/). Kaikki viestit suomeksi. Älä muuta, poista tai käännä mitään muuta – tämä tehtävä vain ajaa skriptin ja ilmoittaa vian.

1. Aja Bash-työkalulla taustalla (run_in_background: true) komento:
   nice -n 15 python3 -I /Users/Shared/Claude/_levy/simu_yosiivous.py --aja
   Skripti tyhjentää vain kaksi asiaa: iPad-asennuksen välimuistin AppInstallationBinaryDeltas/fi.matkakirja.peli.kehitys (ohittaa, jos devicectl tai iPad-lukko on käynnissä) ja T7-sarjan SAMMUTETUISTA simulaattoreista lukitusnäytön poster-välimuistin (data/Library/Application Support/PRBPosterExtensionDataStore; ohittaa käynnissä olevat laitteet). Se kirjaa rivit tiedostoon /Users/Shared/Claude/_levy/simu-yosiivous-<vvvvkkpp>.log. Ajo voi kestää kymmeniä minuutteja: odota valmistumisilmoitusta, älä kysele tilaa toistuvasti.
2. Kun ajo on päättynyt: jos tulosteen viimeisellä rivillä on teksti "loppu: vapautettu", lopeta, älä lähetä mitään.
3. Muuten (skripti kaatui, T7-sarjaa ei löytynyt tai muu vika): lue osoitekirja /Users/Shared/Claude/osoitekirja.md, poimi taulukosta PÄÄTOIMITTAJA-rivin session id, lataa työkalu ToolSearchilla (query "select:mcp__ccd_session_mgmt__send_message") ja lähetä send_messagella (session_id = id) YKSI rivi: "Simu-yösiivous VIKA: <tulosteen viimeinen rivi>".