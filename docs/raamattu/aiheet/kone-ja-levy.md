# kone-ja-levy · vastuu PT · tarkistettu 12.11.2026

TAVOITE: Mac Studio on yhteinen kone, jolla omistaja työskentelee aina häiriöttä ja roolien ajot väistävät hänen ohjelmiaan. Levyllä on väljästi tilaa, siivous ei hävitä mitään, eikä varmuuskopio vanhene huomaamatta.

SÄÄNNÖT:
1. Omistajan ollessa koneella testit, piirrot, laskennat, paistot ja apulaiset odottavat, ja vain verkkolataukset jatkuvat; GUI-automaatiota ei ajeta. Omistajan poissa ollessa kone on kokonaan roolien käytössä myös päivällä. [R-12.13] [R-7.46]
2. Raskas ajo saa alennetun prioriteetin. Mac-savukkeita on rinnakkain enintään kaksi ja paistoja yksi; paisto alkaa vasta, kun muistia on riittävästi ja käännöslukko on vapaa. [R-12.12]
3. Mittausikkunan aikana ei pushata eikä ajeta savukkeita; commit odottaa paikallisena. [R-12.13]
4. Jumissa olevalla koneella toisen prosessia ei pysäytetä: sen prioriteetin saa laskea, ja pid kerrotaan omistajalleen. Näytön auki pitävä taustapalvelu jää käyntiin. [R-12.13] [R-7.41]
5. Salasanaton sudo kattaa vain neljä huoltokomentoa, ja uuden lisää vain omistaja. Komento ajetaan yksin sallintarivin muodossa, ja PT saa siitä rivin. [R-12.11]
6. Vapaata tilaa tavoitellaan pysyvästi 150 Gi tai enemmän. Alle 100 Gi:n lukemasta lähtee rivi PT:lle, ja 20 Gi on pysäytysraja. [R-12.19]
7. Käynnistyslevyllä on vain päivittäinen työ. Työn alla oleva aineisto, työkalut ja välimuistit ovat T7:llä; pysyvä arkisto on NAS:lla ilman linkkejä. Uusi aineisto tallennetaan suoraan oikeaan paikkaan. [R-12.19]
8. Tilaa vapautetaan siirtämällä, ei poistamalla: alkuperäinen lähtee vasta, kun kopion koko ja tarkistussumma täsmäävät. Poistaa saa vain omistajan nimeämiä itsestään palautuvia välimuisteja yösiivouksessa (iPad-asennukset, simulaattorien taustakuvat). [P-261109-6] [R-12.19]
9. Kansion siirtää sen omistava rooli. Käytössä olevaa käännöstä, jonon kohdetta tai toisen roolin appia ei siirretä eikä poisteta; tilanpuutteesta kerrotaan PT:lle. [R-12.19] [R-12.9]
10. Toisen työkalun NAS-kansioon ei kirjoiteta: oma lataus menee omaan alikansioon. [R-12.19]
11. Roolin käännöskansiossa on enintään kaksi uusinta appia ja käytössä oleva. Lokikansioon jäävät vain kuvat, konsoli, raportti ja yksi uusin appi. [R-12.19]
12. Natiivipelin koodi kopioidaan GitHub-peiliin tunneittain ja NAS:lle öisin, ja kuntotarkastus valvoo kopioiden ikää. Ajastettuja taustatehtäviä muutetaan vain KK:n sanalla. [P-261112-14]

EI VIKA:
- Raskaita ajoja päivällä, kun omistaja on poissa.
- Vapaa tila putoaa hetkessä kymmeniä gigatavuja: syy on swap.
- Siirretyn kansion vanhassa paikassa on linkki T7:lle.

TEKOTAPA:
- Siirrot tools/levy/ika_kartoitus.py ja siirra_t7.py; Julkaisijan laitekäännökset rajataan pois. Yösiivous tools/levy/simu_yosiivous.py.
- Ennen GPU-työtä tools/gpu-vapaa.sh. Sudo-lista /etc/sudoers.d/matkakirja-huolto.
- Worktreet ja prosessien lopetus: agentit-ja-komennot. Simulaattorien siivous: kortti laitteet-ja-simulaattorit.
