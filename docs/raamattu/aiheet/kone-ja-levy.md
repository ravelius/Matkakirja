# kone-ja-levy · vastuu PT · tarkistettu 15.11.2026

TAVOITE: Mac Studiolla omistaja työskentelee häiriöttä; roolien ajot väistävät hänen ohjelmiaan. Levyllä on väljästi tilaa, eikä siivous hävitä mitään.

SÄÄNNÖT:
1. Omistajan ollessa koneella testit, piirrot, laskennat, paistot ja apulaiset odottavat, ja vain verkkolataukset jatkuvat; GUI-automaatiota ei ajeta. Muulloin kone on roolien, myös päivällä. [R-12.13] [R-7.46]
2. Raskas ajo saa alennetun prioriteetin. Rinnakkain enintään kaksi Mac-savuketta ja yksi paisto; paisto alkaa vasta riittävällä muistilla ja vapaalla käännöslukolla. [R-12.12]
3. Mittausikkunan aikana ei pushata eikä ajeta savukkeita; commit odottaa paikallisena. [R-12.13]
4. Toisen prosessia ei pysäytetä jumissakaan: prioriteetin saa laskea, ja pid kerrotaan omistajalleen. [R-12.13]
5. Salasanaton sudo kattaa vain neljä huoltokomentoa, ja uuden lisää vain omistaja. Komento ajetaan yksin sallintarivin muodossa; PT saa rivin. [R-12.11]
6. Vapaata tilaa riittää 110 Gi; 150 Gi:tä ei ajeta takaa eikä omistajaa muistuteta. [P-261115-2] Alle 100 Gi:n lukemasta lähtee rivi PT:lle, ja alle 20 Gi:n ei aloiteta käännöksiä, Mac-ajoja eikä paistoja. [R-12.19]
7. Käynnistyslevyllä on vain päivän työ. Työn alla oleva aineisto, työkalut ja välimuistit T7:llä; pysyvä arkisto on NAS:lla ilman linkkejä. Uusi aineisto suoraan paikalleen. [R-12.19]
8. Tila vapautetaan siirtämällä: alkuperäinen lähtee vasta, kun kopion koko ja tarkistussumma täsmäävät. Poistaa saa vain omistajan nimeämiä palautuvia välimuisteja yösiivouksessa sekä roolin oman työpuun (puhdas, ei prosessia, 48 h ilman muutoksia; junahaaran sisältö junassa tai mainissa, koehaaran kärki varmuuskopiossa; ohitetuissa vain uudelleen syntyviä): `git worktree remove` ilman --forcea, haara jää, rivi _levy/tyopuut-poistettu-*.tsv:hen. [P-261109-6] [R-12.19] [P-261115-13] [P-261115-15] [P-261116-1]
9. Kansion siirtää sen omistava rooli. Käytössä olevaa käännöstä, jonon kohdetta tai toisen roolin appia ei siirretä. [R-12.19] [R-12.9]
10. Toisen työkalun NAS-kansioon ei kirjoiteta: oma lataus omaan alikansioon. [R-12.19]
11. Roolin käännöskansiossa on enintään kaksi uusinta appia ja käytössä oleva. Lokikansioon jäävät kuvat, konsoli, raportti ja uusin appi. [R-12.19]
12. Natiivipelin koodi kopioidaan GitHub-peiliin tunneittain ja NAS:lle öisin, ja kuntotarkastus valvoo kopioiden ikää. Ajastettuja taustatehtäviä muutetaan vain KK:n sanalla; niiden tiedostoja ei siirretä linkeiksi. [P-261112-14]

EI VIKA:
- Vapaan tilan nopea pudotus voi olla swapia: tarkista se ensin.
- Siirretyn kansion paikalla on linkki T7:lle.

TEKOTAPA:
- Siirrot tools/levy/ika_kartoitus.py ja siirra_t7.py (ei Julkaisijan laitekäännöksiä). Yösiivous tools/levy/simu_yosiivous.py.
- Ennen GPU-työtä tools/gpu-vapaa.sh. Sudo-lista /etc/sudoers.d/matkakirja-huolto.
- Worktreet ja prosessien lopetus: agentit-ja-komennot. Simulaattorien siivous: kortti laitteet-ja-simulaattorit.
