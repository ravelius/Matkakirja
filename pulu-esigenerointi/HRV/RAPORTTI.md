# Pulu HRV: pilviajon raportti

- Vastauksia: vaihe 1 = 240 (48 kohtaa x 5), vaihe 2 = 544 (linkkitaso); yhteensä 784.
- Kesto: noin 54 min (vaiheet 0-2, tarkistukset ja paketti).
- Agentit: 17 Sonnet-agenttia (effort low), 10 vaiheessa 1 ja 7 vaiheessa 2; enintään 2 rinnakkain. Tokenit yhteensä noin 2,58 milj. (vaihe 1 noin 1,01 milj., vaihe 2 noin 1,57 milj.).
- tarkista-era.mjs: vaihe 1 ja vaihe 2 virheitä 0. Agentit korjasivat itse ajon aikana käsitemäärävirheet (mm. 11.4, 13.4, 13.5, 14.2, 17.2, 19.1, 19.4, 27.1, 27.2, 29.2), puuttuvan vastauksen 11.5 ja liian pitkän jatkokysymyksen 35.2.
- tarkista-valmis.mjs: vaihe 1 ei virheitä paitsi odotettu "linkki ilman lisaa-avainta" (täyttyy vaiheessa 2); vaihe 2 viisi virhettä, kaikki väärähälytyksiä: [[Mali Lošinj]] ja [[Mali Ston]] ovat kroatialaisia kaupunkeja (tarkistin tulkitsee "Mali" Maliksi), ja Zadarin "lause pienellä" on käsitteen avain (marasca-ketju), ei lauseen alku. Varoitukset (Mali, Iran/Ramsar, Egypti) luettu: asiallisia.
- Faktojen pistokoetta (30 vastausta) ei tehty koneella eikä agentilla; agentit raportoivat muistinvaraisia yleistietoja kohdissa 296, 297, 300, 302 ja 318 (Vis, Rijeka, Pag). Ne kannattaa tarkistaa pistokokeessa.
- Paketti: pulu-esigenerointi/HRV/HRV.json (48 kohtaa, 240 kysymysvastausta, 544 linkkivastausta). maat.json päivitetty (vain HRV-rivi). Ranskan FRA/ ei muutettu.
