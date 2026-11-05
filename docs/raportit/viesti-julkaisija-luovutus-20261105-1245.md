# Julkaisija: luovutus 5.11.2026 klo 12.45 (Macin kello), konteksti noin 26 %

Rooli: Julkaisija (JU). Korvaa -1130:n ALOITA-osan; sen omistajan päätökset, VIRHE ja OPIT sekä -1021:n, -0658:n, -0652:n ja -2216:n OPIT ovat voimassa. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt (lue 30 viimeistä riviä).

## ALOITA TÄSTÄ
1. Jonot tyhjät: Mac L1 ja L2 vapaat, yhteinen-iPhone18 vapaa, iPad ei käytössä. Ei omia ajoja käynnissä.
2. Pariisin työhaara: julkaisija/pariisi-219 99035b765 (natiivi-backup), worktree /Users/Shared/Claude/wt/julkaisija-pariisi-219 = runko 0a353e6d0 + kääntö ebc8ce01e + VS:n 694e1783a ja e4180ac69. 7f64cd657 ohitettu (rungossa uudempi raja ff216e7d4). ElavaTyyliVersio e30 (PT hyväksyi). Unity 0 error CS. PT hyväksyi kärjen. Pariisin piirros tuodaan haaraan erikseen myöhemmin (PT). Ei junaan, ei iPadia.
3. Odottaa NS:ltä: tulkinta ajosta lokit/natiiviseppa-aloituslento-b2-99035b765 (19 kuvaa). Katsomassani kuvassa näkymä oli koko Ranskan korkeudelta, ei 8 km:n kaarelta; NS tarkistaa, ottaako "komento aja" korkeuden. Pariisin lähikuvaa ei siis vielä ole, pohjaa ei ole todistettu Pariisissa. Uusi ajo: malli T/ns-osa-b2.zsh.
4. NUI:n kylttikuva 13355a9c2: PT:n poikkeus antaa yhden Mac-ajon, jos NUI vielä pyytää; se on jo ajettu kahdesti.

## OMISTAJAN PÄÄTÖS TÄNÄÄN (sitova)
12.17 (PT, Raamattu 4.42): lippu ja palmu odottavat, kunnes Pariisi on valmis. Lippua ei Pariisin haaraan eikä lippuajoja jonoon. Jonoon vain juoksupelin ja Pariisin ajot (2.209); muut takaisin pyytäjälle + rivi PT:lle.

## TEHTY TÄLLÄ VUOROLLA (11.33–12.45)
- LAV levypari (T/lav-levyt.zsh) ja kohdepari (T/lav-kohteet.zsh) 980bb115c: kuvat LAV:lla, rivit annettu.
- VS pyynnot ja pyynnot2 9afad1ef6: rivit annettu. VS:n ikkuna-ajo hylätty (omistaja Macilla, 12.13; ikkuna toimii vain etualalla); VS ratkaisi batchilla: komento maasto siirtyma 5 0 30.
- NUI b558a2d00 ja 13355a9c2 (omat ajot), PK ab92d15c5 ja 6e87fe375 (omat ajot).
- Pariisin pohja-ajo T/pariisi-pohja.zsh, NS osa B T/ns-osa-b.zsh (ei kelpaa, HUOM-tiedosto kansiossa) ja T/ns-osa-b2.zsh.

## VIRHEET, JOTKA EIVÄT SAA TOISTUA
- Ilmoitin ef02dd214:stä "tarkistus ok", vaikka se ei kääntynyt: luin paluukoodin putkesta. Tarkista.sh ilman putkea, tulos tiedostoon, rc ja "virheitä yhteensä" -rivi. Peli- ja Kartta-testit eivät kerro Unity-käännöstä.
- pgrep -f osuu seurannan omaan komentoriviin: ketju odotti turhaan 12.17–12.24. Odota pid:llä (kill -0) tai ankkuroidulla ps-grepillä.
- tarkista.sh muuttaa Tyylikirja-tiedostoja (lähde-sha); palauta ne ennen committia, ei haaran sisältöä.

## OPIT
- Tyhjä tarkistus ei riitä: puute 0 kävi kuville, jotka olivat aloitusvalikosta. Katso kuva ja hae lokista "ohitettu".
- Skenaariossa komennot muodossa "komento aja/suunta/kallista", ja alku-rivi tarvitaan.
- esikatselu-rungolla.zsh vapauttaa työkalulukon ajojen välissä: moniosainen ketju voi ottaa lukon uudelleen. Vapaalle linjalle siirto: oma odottava pid, ei lukon haltijaa.
- Sama ArgumentOutOfRange joka ajossa on Unityn UnityEditor.Search.SearchDatabase, ei pelin vika.
