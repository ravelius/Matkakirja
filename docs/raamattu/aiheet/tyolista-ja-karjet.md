# tyolista-ja-karjet · vastuu KK · tarkistettu 12.11.2026

TAVOITE: Pelaaja saa valmiita kokonaisuuksia, koska työ keskittyy harvaan asiaan kerrallaan. Työlistasta näkee, mitä tehdään seuraavaksi, eikä pyyntö katoa.

SÄÄNNÖT:
1. KK omistaa työlistan rivit, kärjet, järjestyksen ja osiin jaon. Lista on koko suunnitelma, ei vain omistajan pyynnöt; roolit ja PT kirjaavat siihen tilan. [P-261110-9]
2. KK:lla ei ole omaa tehtävälistaa: sen tehtävät ovat työlistassa omina riveinään. KK lukee listan nollauksen jälkeen ja ennen kuin kertoo omistajalle työn tilasta. [R-7.4]
3. Suunnitelman osat ovat omina riveinään, ei koontirivejä. Rivillä on tekijä, paikka jonossa ja kärki; tekijällä on enintään yksi työn alla oleva rivi, ja omistajaa odottava este alkaa sanalla SINÄ. [P-261110-9]
4. Uusi pyyntö kirjataan riviksi samalla vuorolla, kun se välitetään; iso muutospyyntö odottaa KK:n suunnitelmaa. Omistajan vikahavainto menee kärkensä jonon alkuun. [P-261110-9] [R-7.48]
5. Kärjen ulkopuolinen työ alkaa vain omistajan sanalla ohi jonon, ja kärjet vaihtaa vain omistaja. Kärkeen vain tulkinnan kautta kuuluvaa työtä tai kokeita ei aloiteta; odottavaa riviä ei poisteta. [R-7.49] [P-261105-7]
6. Tauolla olevaan tai peruttuun projektiin ei tehdä uutta erää ilman omistajan sanaa. [R-2.200]
7. Rivi on valmis, kun työ on asennettavissa versiossa, ja versio kirjataan riville. KK tarkistaa rivin, kun rooli raportoi valmiin tai versio ilmestyy. [P-261110-9]
8. Valmiin tai estyneen työn jälkeen rooli jatkaa heti seuraavalla jonorivillään ilman kuittausta. Tyhjästä jonosta rooli kertoo PT:lle ennen lepoa, ja PT antaa uuden työn listan järjestyksessä. [R-7.40]
9. Joka ilta PT laatii työlistasta yösuunnitelman: jokaisen roolin jono täyteen ja raskaat ajot yöhön. Tehdyt rivit suljetaan ja päätöstä vaativat viedään KK:lle; aamulla KK kertoo omistajalle, mitä valmistui. [R-7.46]
10. Työtä, jonka omistaja on ajoittanut myöhemmäksi, ei aikaisteta, vaikka konetta tai kiintiötä vapautuisi. [R-7.46]
11. Asemataulu on jäädytetty: sitä ei avata, päivitetä eikä kehitetä ennen omistajan sanaa. Työlista ja junatiedot säilyvät yhteisenä tietona, ja tilannekuvan omistaja saa KK:lta. [R-7.39]
12. Kuntotarkastus mittaa talon tilan kerran päivässä ja lähettää luvut KK:lle; KK korjaa punaiset samalla vuorolla ja kertoo omistajalle yhden rivin. [P-261112-11]
13. Käytössä olevat vahdit ja ajastukset ovat kuntotarkastuksen vahtiluettelossa; lopetettu vahti poistetaan heti ajosta ja luettelosta. [R-7.41]

EI VIKA:
- Asemataulu ei päivity.
- Kärjen ulkopuolinen pyyntö odottaa työlistalla aloittamatta.

TEKOTAPA:
- Rivit: tools/asemataulu/tyolista.py (lisaa, jono, valmis, tilanne, seuraava).
- Järjestys: scratchpad/keskustelukanava/jarjestys.md.
- Päivän mittaus: tools/kunto/kuntotarkastus.py; vahtiluettelo tools/kunto/VAHDIT.md.
