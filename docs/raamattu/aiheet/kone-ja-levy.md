# kone-ja-levy · vastuu PT · tarkistettu 20.11.2026

TAVOITE: Mac Studiolla omistaja työskentelee häiriöttä; roolien ajot väistävät hänen ohjelmiaan. Levyllä on väljästi tilaa, eikä siivous hävitä mitään.

SÄÄNNÖT:
1. Omistajan ollessa koneella testit, piirrot, laskennat, paistot ja apulaiset odottavat, ja vain verkkolataukset jatkuvat; ei GUI-automaatiota. Muulloin kone on roolien, myös päivällä. [R-12.13] [R-7.46]
2. Raskas ajo alennetulla prioriteetilla. Rinnakkain ≤ 2 Mac-savuketta ja 1 paisto; paisto vasta riittävällä muistilla ja vapaalla käännöslukolla. [R-12.12]
3. Mittausikkunassa ei pushata eikä ajeta savukkeita; commit odottaa paikallisena. [R-12.13]
4. Toisen prosessia ei pysäytetä jumissakaan; prioriteetin saa laskea, pid sen omistajalle. [R-12.13]
5. Salasanaton sudo kattaa vain neljä huoltokomentoa, ja uuden lisää vain omistaja. Komento ajetaan yksin sallintarivin muodossa. [R-12.11]
6. Vapaata tilaa riittää 110 Gi; 150 Gi:tä ei ajeta takaa eikä omistajaa muistuteta. [P-261115-2] Alle 100 Gi:n lukemasta lähtee rivi PT:lle, ja alle 20 Gi:n ei aloiteta käännöksiä, Mac-ajoja eikä paistoja. [R-12.19]
7. Käynnistyslevyllä on vain päivän työ. Työn alla oleva aineisto, työkalut ja välimuistit T7:llä; pysyvä arkisto on NAS:lla ilman linkkejä. Uusi aineisto suoraan paikalleen. [R-12.19]
8. Tila vapautetaan siirtämällä: alkuperäinen lähtee vasta, kun kopion koko ja tarkistussumma täsmäävät. Poistaa saa vain omistajan nimeämiä välimuisteja yösiivouksessa, kortin nimeämät vanhat lokit, kuvat ja paketit sekä roolin oman työpuun (puhdas, ei prosessia, 48 h ilman muutoksia; junahaaran sisältö junassa tai mainissa, koehaaran kärki varmuuskopiossa; ohitetuissa vain uudelleen syntyviä): `git worktree remove` ilman --forcea, haara jää, rivi _levy/tyopuut-poistettu-*.tsv:hen. [P-261109-6] [R-12.19] [P-261115-13] [P-261115-15] [P-261116-1] [P-261118-6]
9. Kansion siirtää sen omistava rooli; käytössä olevaa käännöstä, jonon kohdetta tai toisen roolin appia ei siirretä. [R-12.19] [R-12.9]
10. Toisen työkalun NAS-kansioon ei kirjoiteta. [R-12.19]
11. Käännöskansiossa enintään kaksi uusinta appia ja käytössä oleva; lokikansioon jäävät kuvat, konsoli, raportti ja uusin appi. [R-12.19]
12. Natiivikoodi kopioidaan GitHub-peiliin tunneittain ja NAS:lle öisin; kuntotarkastus valvoo kopioiden ikää. Ajastettuja taustatehtäviä muutetaan vain KK:n sanalla; niiden tiedostoja ei siirretä linkeiksi. [P-261112-14]
13. KK suunnittelee koneajot ja yhdistää ne (yksi ajo laitetta kohden). Pelkät tarkistusajot yöllä, kehityksen vaatima ajo päivällä. [P-261120-4]

EI VIKA:
- Vapaan tilan nopea pudotus voi olla swapia.
- Siirretyn kansion paikalla linkki T7:lle.

TEKOTAPA:
- Siirrot tools/levy/ika_kartoitus.py, siirra_t7.py; yösiivous simu_yosiivous.py.
- Ennen GPU-työtä tools/gpu-vapaa.sh. Sudo-lista /etc/sudoers.d/matkakirja-huolto.
- Worktreet ja prosessit: agentit-ja-komennot. Simut: laitteet-ja-simulaattorit.
