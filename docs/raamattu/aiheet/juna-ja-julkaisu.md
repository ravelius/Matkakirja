# juna-ja-julkaisu · vastuu JU · tarkistettu 12.11.2026

TAVOITE: Omistaja saa asennuslinkistä aina uusimman toimivan version ja testaaja TestFlightista yhden kokonaisen, joka ei riko vanhaa asennusta.

SÄÄNNÖT:
1. Auki on yksi juna; hyväksytty yhdistetään siihen heti, keskeneräinen odottaa. [R-10.2]
2. Muutos pääsee junaan, kun KK on antanut junasanan ja PT pt-ok:n nimetylle commitille. JU poimii sen jonon järjestyksessä; myöhempi muutos vaatii uuden pt-ok:n. [P-261111-6] [R-10.9]
3. KK:n asettama ehto pitää numeron poissa linkistä, kunnes ehto on näytetty; muut saavat mennä ohi. [P-261112-5]
4. Ennen linkkiä: testit läpi, käännös virheetön, sisältö ja media palvelimella, Uutta-rivi selkokielellä. [P-261112-5]
5. Linkistä rivi tekijälle ja PT:lle; KK:lle, kun KK asetti ehdon tai asia kerrotaan omistajalle. Omistajalle kerrotaan kerran per versio, vain linkissä oleva. [P-261112-5]
6. Käännös ja linkki enintään neljästi päivässä, kun junassa on uutta (ajat JU ja PT), ylimääräinen vain KK:n sanalla. TestFlight-junia lähtee enintään kaksi päivässä, ellei omistaja pyydä. [R-10.2] [P-261114-9]
7. TestFlight ja lukitus vain omistajan pyynnöstä, jonka KK välittää sanatarkasti. [R-10.2] [P-261111-5]
8. Osittaista julkaisua ei ehdoteta; junaa viivästävä osa nostetaan työn kärkeen. [P-261024-1]
9. Versio valitaan juuri haetusta päähaarasta; version nostaa juna, ei yksittäinen muutos. [R-10.1]
10. Web-repon sisältö-, raportti- ja ohjemuutokset PT yhdistää vihrein tarkistuksin ilman korttia. [R-10.12] [P-261109-1]
11. Palaute-erä junaan, kun pääosa todennettu; PT tarkistaa puuttuvat erät. [R-10.9]
12. TF-vienti: muutoslokirivi päähaaraan, sisältöpaketin vienti valmiiksi, sitten TF. Unity-editori kiinni, yksi vienti kerrallaan. [R-10.14] [R-10.6]
13. Muutosloki kulkee junan mukana; TF:n Mitä testata tulee siitä. [R-10.8]
14. TF:n tultua sisäisille rivi PT:lle ja KK:lle; hyväksytty build samana versiona beta-arvioon ja testiryhmille. [R-10.2] [R-10.8]
15. Osoittimet ovat yhteisiä kaikille versioille: vanhalle osaamaton data saa uuden osoittimen; vastaus muuttuu vain lisäävin kentin. [R-9.8]
16. Sisällön osoitin vaihtuu itsestään päähaaraan yhdistettäessä; mallipakettien osoittimen vaihtaa JU PT:n kuittauksella. [R-10.14]
17. Juna ajetaan käynnissä olevan ajon jälkeen kuva-ajojen ohi; yli 10 min vuoro jaetaan osiin. Päättömät testit omalla kaistallaan rinnan. Erän hyväksytyt muutokset käännetään yhteen versioon (tekijät nimetty); punainen → yksitellen. [P-261114-4]

EI VIKA:
- Juna lähti, vaikka osa töistä on kesken.
- Vanhempaa buildia ei voi asentaa.
- Linkin numeroista puuttuu numero, jonka ehto on kesken.

TEKOTAPA:
- Junarivit: tools/asemataulu/juna.py, tarkista-junat.py.
- Linkin jono ja pt-ok: julkaisija-tyokalut/linkki-224-uutta/.
- Uutta-tekstin tarkistus: jako-paketoi.zsh. Vanhan sisällön esto: osoittimen minSovellus.
- Muutosloki: tools/vienti/muutosloki-natiivi.json. Sisällön vienti: vie-sisalto.yml.
