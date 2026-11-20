# tyolista-ja-karjet · vastuu KK · tarkistettu 20.11.2026

TAVOITE: Pelaaja saa valmiita kokonaisuuksia, koska työ keskittyy harvaan asiaan kerrallaan. Työlistasta näkee, mitä tehdään seuraavaksi, eikä pyyntö katoa.

SÄÄNNÖT:
1. KK omistaa työlistan rivit, kärjet, järjestyksen ja osiin jaon. Lista on koko suunnitelma, ei vain omistajan pyynnöt; roolit ja PT kirjaavat siihen tilan. [P-261110-9]
2. KK:n tehtävät ovat työlistassa omina riveinään, ei omassa listassa. KK lukee listan nollauksen jälkeen ja ennen kuin kertoo omistajalle työn tilasta. [R-7.4]
3. Suunnitelman osat omina riveinään, ei koontirivejä. Rivillä on tekijä, paikka jonossa ja kärki; tekijällä on enintään yksi rivi työn alla, ja omistajaa odottava este alkaa sanalla SINÄ. [P-261110-9]
4. Uusi pyyntö kirjataan riviksi samalla vuorolla, kun se välitetään; iso muutospyyntö odottaa KK:n suunnitelmaa. Omistajan vikahavainto menee kärkensä jonon alkuun ja hänen kärkeen nimeämänsä lisäys listan kärkeen. [P-261110-9] [R-7.48] [P-261120-2] [P-261120-3]
5. Kärjen ulkopuolinen työ alkaa vain omistajan sanalla ohi jonon, ja kärjet vaihtaa vain omistaja. Kärkeen vain tulkinnan kautta kuuluvaa työtä tai kokeita ei aloiteta; odottavaa riviä ei poisteta. [R-7.49] [P-261105-7]
6. Tauolla olevaan tai peruttuun projektiin ei tehdä uutta erää ilman omistajan sanaa. [R-2.200]
7. Rivi on valmis, kun työ on asennettavissa versiossa, ja versio kirjataan riville. KK tarkistaa rivin roolin raportista tai uudesta versiosta; julkaisu ajaa ESI-ISÄTARKISTUKSEN (sivu-tila.py esi-isat). [P-261110-9]
8. Valmiin, estyneen tai ajoa odottavan työn jälkeen rooli jatkaa samassa vuorossa seuraavalla jonorivillään ilman kuittausta; kuva katsotaan, kun se tulee. Ajon odotus ei ole lepotila. Tyhjästä jonosta rivi KK:lle heti; jokaisella roolilla on vähintään kaksi työtä jonossa. [R-7.40] [P-261114-12]
9. Iltaisin PT laatii työlistasta yösuunnitelman: jokaisen roolin jono täyteen ja raskaat ajot yöhön. Tehdyt rivit suljetaan, päätöstä vaativat KK:lle; aamulla KK kertoo omistajalle, mitä valmistui. [R-7.46]
10. Omistajan myöhemmäksi ajoittamaa työtä ei aikaisteta, vaikka konetta tai kiintiötä vapautuisi. [R-7.46]
11. Asemataulu on jäädytetty omistajan sanaan asti: ei avata, päivitetä eikä kehitetä. Työlista ja junatiedot säilyvät; tilannekuvan omistaja saa KK:lta. [R-7.39]
12. Kuntotarkastus mittaa talon tilan päivittäin ja lähettää luvut KK:lle; KK korjaa punaiset samalla vuorolla ja kertoo omistajalle yhden rivin. [P-261112-11]
13. Käytössä olevat vahdit ja ajastukset ovat kuntotarkastuksen vahtiluettelossa; lopetettu vahti poistetaan heti ajosta ja luettelosta. [R-7.41]

EI VIKA:
- Asemataulu ei päivity.
- Kärjen ulkopuolinen pyyntö odottaa työlistalla aloittamatta.

TEKOTAPA:
- Rivit: tools/asemataulu/tyolista.py (lisaa, jono, valmis, tilanne, seuraava).
- Järjestys: scratchpad/keskustelukanava/jarjestys.md.
- Mittaus tools/kunto/kuntotarkastus.py; vahdit tools/kunto/VAHDIT.md.
