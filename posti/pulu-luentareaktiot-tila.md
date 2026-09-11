# Pulu: Marseillen luentareaktiot — yhteinen tilannekortti

Päivitetty 11.9.2026. Ylläpitäjä: Codex; Fable toimittaa muutokset omaan git-postiinsa.
Tämä kortti on nykytila, postit ovat historia. Säilytetään claude/postilaatikko-haaralla, ei mergeä pelin mainiin.

- Tavoite: kuusi tekstikohtaista reaktiota oikean Marseille-äänitteen tahtiin, hiljainen sivulause ja hallittu loppu/keskeytys.
- Rajaus: vain Marseille; muut kaupungit omistajan katselmuksen jälkeen. Ei uusia ääniä, kuvia, kohdistuksia tai asusteita.
- Fable omistaa: luenta.js, luentareaktiot.js, tarina, kohdistustyökalut ja reaktiorekisteri.
- Codex omistaa: livia-eleet.js, livia-svg.js, livia-tilanteet.js ja niiden testit.
- Julkaisuvastuu: Fablelle ehdotettu koko ominaisuuden koordinointi, kuittaus puuttuu. Voimassa oleva järjestys: Fable julkaisee oman moottoriosuutensa; Codex päivittää ja julkaisee oman PR:n porttien jälkeen.
- Main: f630593c0b591499e2a9a348121c49dac3f2512f / v1756, PR #2233; Fable-moottorikorjaus mainissa, julkaisu ilmoitettu Fablen viestissä ccb354ae. Codexin julkinen readback vielä tekemättä.
- Codex: DRAFT PR #2227, remote c08e9ed7e35794f301fb126eac6c21f4d5b3a65e, CI 34580358900 SUCCESS.
- Fable-korjaus: 3240c62260058753401be4d29a9b393f3572fcdf sisältyy Fablen mukaan v1756:een; korjaushaara poistettu.
- Yhteiskoe: 9571d4e3e5a22cdb77593bdea46421a05267b6d9.
- Rajapinta: Fablen korjaushaaran docs/pulu-reaktiot.md + hyväksytty 40f14181-sopimus. reaction.luentaTunnus=sama Audio; matkakirja:luenta-loppu ennen luonnollista pausea; narrationEnd.luonnollinenLoppu; yksi jälkireaktio 500 ms vastaanottoikkunassa, reactionEnd/uusi luenta katkaisee.
- Hyväksytty yhteiskoe: oikea alkuperä + aito media; normaali, metadata +1500 ms ja reduced-motion 6/6. pause-seek, seek-end, tail-stop, voice-swap PASS. Node22 2642 PASS / 0 FAIL / 13 SKIP.
- Todisteet: ca5d19757c16c7e52960067fb6a293653566029e, posti/matkakirja-eurooppa-20260909.md; paikalliset JSON/PNG-polut siinä.
- Avoin raja: standalone-selainsavukkeen 30 s load-timeout EI PASS; Freesound-varareitin toisto auditissa. Buildin läpäisy ei kuittaa selainsavuketta. Fable kirjasi erilliseksi asiaksi pilotin ulkopuolelle viestissä ccb354ae.
- Seuraava siirto: Codex, Fablen ccb354ae-julkaisukuittauksen valtuuttamana: tuore main, #2227:n päivitys, versionosto/testit/CI, julkaisu, julkisten tiedostojen readback ja oikean pelin QA.
- Valmis vasta: molemmat osat julkaistu, julkinen peli todennettu ja omistajan Marseille-katselmus tehty. Tästä ei vielä ole kuittausta.
- Seuranta: automaatio PAUSED; ei lyhyen välin pollausta.
