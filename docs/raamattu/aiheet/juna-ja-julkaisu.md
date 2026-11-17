# juna-ja-julkaisu · vastuu JU · tarkistettu 16.11.2026

TAVOITE: Omistaja saa asennuslinkistä aina uusimman toimivan version ja testaaja TestFlightista yhden kokonaisen, joka ei riko vanhaa asennusta.

SÄÄNNÖT:
1. Auki on yksi juna; hyväksytty yhdistetään siihen heti, keskeneräinen odottaa. [R-10.2]
2. Junaan KK:n sanalla (sha + versiorivi); pysäyttää vain yhdistymisristiriita tai kääntymätön versio, ei mittaus. Mittaus, sarjat, vahdit, tarkista.sh yöllä junan kärjelle; huonot ja punaiset aamulla rooleille. [P-261111-6] [R-10.9] [P-261116-21] [P-261117-55]
3. KK:n ehto vain kokeille ja kuvina näytettävälle, kirjanpitoon EHTO lähteineen; numero pois linkistä kunnes näytetty. [P-261112-5]
4. Ennen linkkiä: käännös virheetön (testit: 2), sisältö ja media palvelimella, Uutta-rivi selkokielellä. [P-261112-5]
5. Linkistä rivi tekijälle ja PT:lle; KK:lle, kun KK asetti ehdon tai asia kerrotaan omistajalle. Omistajalle kerrotaan kerran per versio, vain linkissä oleva. [P-261112-5]
6. Käännös ja linkki enintään 4 kertaa päivässä, kun junassa on uutta (JU ja PT), ylimääräinen vain KK:n sanalla. TestFlight-junia lähtee enintään kaksi päivässä, ellei omistaja pyydä. [R-10.2] [P-261114-9]
7. TestFlight ja lukitus vain omistajan pyynnöstä, jonka KK välittää sanatarkasti. [R-10.2] [P-261111-5]
8. Osittaista julkaisua ei ehdoteta; junaa viivästävä osa kärkeen. Kun omistaja pyytää julkaisua heti valmiin osan ehdolla, KK toteaa osan junassa ja julkaisu lähtee kärjestä odottamatta muita ehtoja. [P-261024-1] [P-261117-109]
9. Versio valitaan juuri haetusta päähaarasta; version nostaa juna, ei yksittäinen muutos. [R-10.1]
10. Web-repon sisältö-, raportti- ja ohjemuutokset PT yhdistää vihreinä ilman korttia. [R-10.12] [P-261109-1]
11. Palaute-erä junaan, kun pääosa todennettu; PT tarkistaa puuttuvat erät. [R-10.9]
12. TF-vienti: muutoslokirivi päähaaraan, paketin vienti, sitten TF. Editori kiinni, yksi vienti kerrallaan. [R-10.14] [R-10.6]
13. Muutosloki kulkee junan mukana; TF:n Mitä testata tulee siitä. [R-10.8]
14. TF sisäisillä: rivi PT:lle ja KK:lle; hyväksytty build samana versiona beta-arvioon ja testiryhmille. [R-10.2] [R-10.8]
15. Osoittimet ovat yhteisiä kaikille versioille: vanhalle osaamaton data saa uuden osoittimen; vastaus muuttuu vain lisäävästi. [R-9.8]
16. Julkaisun jälkeen KK tarkistaa asennussivun osiot Kesken ja Jonossa rivi riviltä todellista tilaa vasten; korjaukset PT:lle yhtenä viestinä. [P-261117-110]
16. Sisällön osoitin vaihtuu itse päähaaraan yhdistettäessä; mallipakettien osoittimen vaihtaa JU PT:n kuittauksella. [R-10.14]
17. Juna ajetaan käynnissä olevan ajon jälkeen kuva-ajojen ohi; yli 10 min vuoro osiin. Päättömät testit omalla kaistallaan rinnan. Erän hyväksytyt muutokset käännetään yhteen versioon (tekijät nimetty); punainen → yksitellen. [P-261114-4]

EI VIKA:
- Juna lähti, vaikka osa töistä on kesken.
- Vanhempaa buildia ei voi asentaa.
- Linkistä puuttuu numero, jonka ehto on kesken.

TEKOTAPA:
- Junarivit: tools/asemataulu/juna.py, tarkista-junat.py.
- Jono ja versiorivit: julkaisija-tyokalut/linkki-224-uutta/.
- Uutta-tekstin tarkistus: jako-paketoi.zsh. Vanhan sisällön esto: osoittimen minSovellus.
- Muutosloki: tools/vienti/muutosloki-natiivi.json. Sisällön vienti: vie-sisalto.yml.
