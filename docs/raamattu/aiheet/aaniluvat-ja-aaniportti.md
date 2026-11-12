# aaniluvat-ja-aaniportti · vastuu ÄÄ · tarkistettu 12.11.2026

TAVOITE: Pelaaja kuulee tasaista, selvää ja säröttömää ääntä. Jokainen maksullinen ajo on luvallinen ja hinnaltaan tiedossa, ja tulos tarkistetaan ennen kuin kukaan kuulee sen.

SÄÄNNÖT:
1. Puheäänityksen ajon alle 3 % kuukauden kiintiöstä luvittaa ja tarkastaa KK, myös uusinnan, koeoton ja uuden äänen. Iso lista jaetaan osiin, ja seuraava osa ajetaan vasta edellisen portin jälkeen; portin hylkäämän palan uusinta kuuluu samaan ajoon. Muuta uusintaa rooli ei hyväksy itse, ja kulutus kerrotaan KK:lle jälkikäteen. [R-5.1] [R-5.2] [P-261112-17]
2. Yli 3 %:n puheajoon sekä generoituun musiikkiin ja tekoälyn tehosteisiin tarvitaan omistajan lupa kortilla määrineen ja hintoineen, ajo kerrallaan. Lisäys tai uusinta vaatii uuden luvan; lupa ei siirry toiselle tilille. [R-5.1] [R-5.2]
3. Kokonaan uudet luettavat tekstit hyväksyy KK listana ennen äänitystä. Näyte omistajalle vain hänen pyynnöstään, mukana koko prompti tunnetageineen. [R-5.1] [P-261111-5]
4. Pelin hyväksytyt ajonaikaiset puhetoiminnot (luenta, Pulun chat, museon ympyrät workerin kautta) eivät tarvitse ajolupaa. [R-5.3]
5. Testit eivät tuota striimiääntä; ohitus vain omistajan luvalla. Vapaa valmis äänite tai hyväksytyn äänen uudelleenkoodaus ei ole generointia. [R-5.2]
6. Hinta-arvio ja 3 %:n raja lasketaan kuiva-ajosta: lähetetyistä merkeistä tageineen ja esiteksteineen sekä viimeisimmästä toteumahinnasta. [R-5.2]
7. Puhepyynnöt kulkevat yhteisen pyyntötien kautta, jotta loki ja kielitieto jäävät; ilman lokia kieltä ei vahvisteta. [P-261111-14]
8. Maksullisen generoinnin raakatuotos tallennetaan ennen käsittelyä versioituna äänimastereihin (T7), joista on varmuuskopio; raakaa ei poisteta eikä ylikirjoiteta. [R-5.13]
9. Ääni tilataan ja tasoitetaan PCM:nä ja pakataan kerran masterista; true peak enintään −1 dBTP. Luentapalat tasataan samaan kiinteään keskitasoon, ei huipun mukaan. [R-5.10] [P-261111-15]
10. Jokainen äänipaketti läpäisee ääniportin ennen vientiä (huippu, leikkautuminen, hiljaisuus, saman perheen kovuusero, kieli suomi; puheessa myös sanaportti). Poikkeus vain perusteltuna portin listalla. [R-5.11]
11. Tekoäly kuuntelee jokaisen puheoton sokkona ennen vientiä. Lippu varmistetaan äänestä tai tekstistä, ja varmistettu poikkeama on uusinta. Litteroinnin epäily ei yksin pysäytä vientiä, mutta KK voi uusia sen perusteella. [R-5.11] [R-5.1]

EI VIKA:
- Omistaja ei ole kuullut puheäänitystä: KK:n tarkastus riittää.

TEKOTAPA:
- Portti proto-3d/tyokalut/aaniportti.py, pakollisena vaiheena julkaisijan vie-paketti.sh.
- Pyyntötie: pyynto-funktio, tools/elevenlabs_kieli.py.
- Luentaputki (kuiva-ajo, avain, ääntämisasu, esiteksti): proto-3d/tyokalut/pelikoodari-ajot/esigeneroi-luennat.py.
- Musiikin ja tehosteiden sisältö: musiikki-ja-tehosteet. Mitä luetaan: kertojaaanet.
