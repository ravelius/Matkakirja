# juna-ja-julkaisu · vastuu JU · tarkistettu 18.11.2026

TAVOITE: Omistaja saa asennuslinkistä aina uusimman toimivan version, testaaja TestFlightista kokonaisen, joka ei riko vanhaa asennusta.

SÄÄNNÖT:
1. Auki on yksi juna; hyväksytty yhdistetään siihen heti, keskeneräinen odottaa. [R-10.2]
2. Junaan KK:n sanalla (sha + versiorivi); pysäyttää vain yhdistymisristiriita tai kääntymätön versio, ei mittaus. Mittaukset, sarjat ja vahdit yöllä junan kärjelle; punaiset aamulla rooleille. [P-261111-6] [R-10.9] [P-261116-21] [P-261117-55]
3. KK:n ehto vain kokeille ja kuvina näytettävälle, kirjanpitoon EHTO lähteineen; numero pois linkistä kunnes näytetty. [P-261112-5]
4. Ennen linkkiä: käännös virheetön (testit: 2), sisältö ja media palvelimella, Uutta-rivi selkokielellä. [P-261112-5]
5. Linkistä rivi tekijälle ja PT:lle; KK:lle, kun se asetti ehdon tai asia kerrotaan omistajalle. Omistajalle kerran per versio, vain linkissä oleva. Linkin jälkeen KK tarkistaa Kesken ja Jonossa. [P-261112-5] [P-261117-110]
6. Linkki enintään 4 kertaa päivässä, kun junassa on uutta; ylimääräinen vain KK:n sanalla. TF enintään kaksi päivässä, ellei omistaja pyydä. [R-10.2] [P-261114-9]
7. TestFlight ja lukitus vain omistajan pyynnöstä, jonka KK välittää sanatarkasti. [R-10.2] [P-261111-5]
8. Osittaista julkaisua ei ehdoteta; junaa viivästävä osa kärkeen. Omistajan "heti" ohittaa ehdot, julkaisu ilman testejä myös ajot. [P-261024-1] [P-261117-109] [P-261118-5]
9. Versio valitaan haetusta päähaarasta; version nostaa juna, ei yksittäinen muutos. [R-10.1]
10. Web-repon sisältö-, raportti- ja ohjemuutokset PT yhdistää vihreinä ilman korttia. [R-10.12] [P-261109-1]
11. Palaute-erä junaan, kun pääosa todennettu; PT tarkistaa puuttuvat. [R-10.9]
12. TF-vienti: muutoslokirivi päähaaraan, paketti, sitten TF. Editori kiinni, yksi vienti kerralla. [R-10.14] [R-10.6]
13. Muutosloki kulkee junan mukana; TF:n Mitä testata siitä. [R-10.8]
14. TF sisäisillä: rivi PT:lle ja KK:lle; hyväksytty build samana versiona beta-arvioon ja testiryhmille. [R-10.2] [R-10.8]
15. Osoittimet yhteisiä kaikille versioille: vanhalle osaamaton data saa uuden osoittimen; vastaus muuttuu vain lisäävästi. [R-9.8]
16. Sisällön osoitin vaihtuu päähaaraan yhdistettäessä; mallipakettien osoittimen vaihtaa JU PT:n kuittauksella. [R-10.14]
17. Juna ajetaan käynnissä olevan ajon jälkeen kuva-ajojen ohi; yli 10 min vuoro osiin. Päättömät testit omalla kaistallaan rinnan. Erän hyväksytyt muutokset käännetään yhteen versioon; punainen yksitellen. [P-261114-4]

EI VIKA:
- Juna lähti, vaikka osa töistä on kesken.
- Vanhempaa buildia ei voi asentaa.
- Linkistä puuttuu numero, jonka ehto on kesken.

TEKOTAPA:
- Junarivit: tools/asemataulu/juna.py.
- Jono ja versiorivit: julkaisija-tyokalut/linkki-224-uutta/.
- Uutta-tekstin tarkistus: jako-paketoi.zsh. Vanhan sisällön esto: osoittimen minSovellus.
- Muutosloki: tools/vienti/muutosloki-natiivi.json. Sisällön vienti: vie-sisalto.yml.
