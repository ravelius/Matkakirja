# PT:n luovutus 12.11.2026 klo 09.59 (konteksti 30 %)

Korvaa -0850:n (cd4c7c788). Tallenne /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-12-klo-0856-0959.md. Viestit send_message id:llä (osoitekirja). Pt-ok-tiedostot: /Users/Shared/Claude/julkaisija-tyokalut/linkki-224-uutta/ (ei-numeroiduille nimetty tiedosto).

## Tämä vuoro
- KUNTOTARKASTUS (omistaja 08.5x, KK 08.57/09.03): tools/kunto/kuntotarkastus.py mainissa (PR 6592); 13 lukua (12 päällekkäiset kirjaukset, 13 Raamatun ovi). Ajastettu tehtävä "Matkakirja kuntotarkastus" 06.30 → yksi viesti KK:lle; ajettava kopio /Users/Shared/Claude/_kunto/kuntotarkastus.py (tehtävä hakee origin/mainista), historia _kunto/historia.csv (1 päivä). Valmis, kun 13.11. rivi tullut.
- RAAMATUN OVI, pala 1 (omistaja 09.12 YKKÖSPRIORITEETTI, KK 09.26): tools/kirjaa.mjs + docs/raamattu/ mainissa (PR 6595 = 5df8b9152). 8/8 hyväksymiskoetta (tools/kirjaa-kokeet.mjs, tests/kirjaa.test.mjs). Kirjaukset kulkevat työpuun /Users/Shared/Claude/wt/raamattu haarasta `kirjaus` PR:nä "Kirjaus: Raamattu" → PT YHDISTÄÄ vihreänä. KK hyväksyi vastuuroolit, alusta/hyvaksy-aihe, P-paikanpitäjät; js/tyohuone-raamattu.js pysyy (lukee web: ui.js, sw.js, build-standalone, vienti 1.27) kunnes vaihe 5.
- TILINVAIHTO: EI tänään (omistaja 09.12: Fable-nollaus käyttämättä). Kohde A vvi@vvi.fi (KK 09.21). Valmistelu scratchpad/paatoimittaja/tilinvaihto-valmistelu-20261113.md; uudella tilillä ajastukset (yösiivous + kuntotarkastus) ENSIN.
- JUNA 224: linkissä .103 (luennat v11), .104 (NS äänitysjono). JU:lla: .105 NUI introrivit erä 3, .106 KS kehämuurit 0d25a3abf, .107 NUI luennat-asetus 0b7f0e02f (ehto täyttyi), .108 NS Sumea e09a3694f. Tausta v133e viety (LAV, PK vaihtaa kansion). Luennat v13/v14 viety, asetus v12 (JU PR 6597); v15 KK:n päätös.
- Mainiin: 6591 NS, 6593 + 6594 SK (Bergen/Valletta), 6592, 6595.
- Työlista: 6 vanhaa työn alla -riviä hoidettu; uusi kärki "Raamattu uusiksi ja yksi kirjaamistapa" (KK, jarj 0).

## Auki
- SK:n PR:t 6599 (kuvatekstit erä 3 + Sofia), 6600 (luentapalat 2a/2b), 6601 (erä 3 + äänitysjono.tsv): CI kesken → yhdistä vihreinä (6600/6601 voivat törmätä tsv:ssä). SK luovuttaa, Postivahti nollaa.
- PK a552d1db8 PisteKaarella (558 → 38 hyppyä): odottaa KK:n junasanaa + JU:n Mac-ajoa → pt-ok. PK B1 a405aeb07: KK:n junasana yhä puuttuu.
- NUI:n seuraaja: Sofian introrivi 2ab496c14 IntroNimet-tauluun.
- KK tuo seuraavat Raamattu-palat (A/B/C, kamera-kortti kulkee kirjaa-PR:nä).
- PT tuntikierros (Raamattu 7.38): CronCreate "13 * * * *" uusiksi aloituksessa.
