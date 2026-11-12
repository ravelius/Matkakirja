# juna-ja-julkaisu · vastuu JU · tarkistettu 12.11.2026

TAVOITE: Omistaja saa asennuslinkistä aina uusimman toimivan version ja testaaja TestFlightista yhden kokonaisen, joka ei riko vanhaa asennusta.

SÄÄNNÖT:
1. Auki on yksi juna, ja kaikki hyväksytty kerätään siihen. Keskeneräinen odottaa seuraavaa. [R-10.2]
2. Muutos pääsee junaan, kun KK on antanut junasanan ja PT pt-ok:n nimetylle commitille. Julkaisija poimii sen, ja se saa seuraavan numeron jonon järjestyksessä; myöhempi muutos vaatii uuden pt-ok:n. [P-261111-junasana] [R-10.9]
3. KK:n asettama ehto pitää numeron poissa linkistä, kunnes ehto on näytetty; muut saavat mennä ohi. [P-261112-linkki]
4. Ennen linkkiä: testit läpi, käännös virheetön, versioon kuuluva sisältö ja media palvelimella ja Uutta-rivi selkokielellä. [P-261112-linkki]
5. Linkkiin tulosta menee rivi tekijälle ja PT:lle; KK:lle, kun KK asetti ehdon tai asia kerrotaan omistajalle. Omistajalle kerrotaan vain linkissä oleva. [P-261112-linkki]
6. Linkin versioilla ei ole päivärajaa. TestFlight-junia lähtee enintään kaksi päivässä, ellei omistaja pyydä enempää. [R-10.2]
7. TestFlight lähtee vain omistajan pyynnöstä, jonka KK välittää sanatarkasti; ennen sitä ei lukitusta. KK ei päätä sitä hänen puolestaan. [R-10.2] [P-261111-paatokset]
8. Osittaista julkaisua ei ehdoteta; junaa viivästävä osa nostetaan työn kärkeen. [P-261024-kokonainen]
9. Versio valitaan juuri haetusta päähaarasta; version nostaa juna, ei yksittäinen muutos. [R-10.1]
10. Web-repon sisältö-, raportti- ja ohjemuutokset PT yhdistää heti vihrein tarkistuksin, ilman korttia. [R-10.12] [P-261109-checks]
11. Omistajan palaute-erä menee junaan, kun pääosa on todennettu; PT tarkistaa joka junassa puuttuvat erät. [R-10.9]
12. TF-vienti: muutoslokirivi päähaaraan, sisältöpaketin vienti valmiiksi, sitten TF. Unity-editori on kiinni, ja vientejä on yksi kerrallaan. [R-10.14] [R-10.6]
13. Muutosloki kulkee junan mukana; TF:n Mitä testata tulee siitä. [R-10.8]
14. TF:n tultua sisäisille Julkaisija lähettää heti rivin PT:lle ja KK:lle. Hyväksytty build menee samana versiona beta-arvioon ja testiryhmille. [R-10.2] [R-10.8]
15. Osoittimet ovat yhteisiä kaikille versioille: vanhan sovelluksen osaamaton data saa uuden osoittimen, ja palvelimen vastaus muuttuu vain lisäävin kentin. [R-9.8]
16. Sisällön osoitin vaihtuu itsestään päähaaraan yhdistettäessä; mallipakettien osoittimen vaihtaa Julkaisija PT:n kuittauksella. [R-10.14]

EI VIKA:
- Juna lähti, vaikka osa töistä on kesken.
- Vanhempaa buildia ei voi asentaa.
- Linkin numeroista puuttuu numero, jonka ehto on kesken.

TEKOTAPA:
- Junarivit: tools/asemataulu/juna.py, tarkista-junat.py.
- Linkin jono ja pt-ok: julkaisija-tyokalut/linkki-224-uutta/.
- Uutta-tekstin tarkistus: jako-paketoi.zsh. Vanhan sisällön esto: osoittimen minSovellus.
- Muutosloki: tools/vienti/muutosloki-natiivi.json. Sisällön vienti: vie-sisalto.yml.
