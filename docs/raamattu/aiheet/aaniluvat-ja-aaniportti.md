# aaniluvat-ja-aaniportti · vastuu ÄÄ · tarkistettu 17.11.2026

TAVOITE: Pelaaja kuulee tasaista, selvää ja säröttömää ääntä. Jokainen maksullinen ajo on luvallinen ja hinnaltaan tiedossa, ja paketti läpäisee teknisen portin ennen vientiä.

SÄÄNNÖT:
1. Puheäänityksen ajon alle 3 % kuukauden kiintiöstä luvittaa ja tarkastaa KK, myös uusinnan, koeoton ja uuden äänen. Iso lista ajetaan osissa portti kerrallaan; portin hylkäämän palan uusinta kuuluu samaan ajoon, muuta rooli ei hyväksy itse; kulutus KK:lle jälkikäteen. [R-5.1] [R-5.2] [P-261112-17]
2. Yli 3 %:n puheajoon sekä generoituun musiikkiin ja tekoälyn tehosteisiin tarvitaan omistajan lupa kortilla määrineen ja hintoineen, ajo kerrallaan. Lisäys tai uusinta vaatii uuden luvan; lupa ei siirry toiselle tilille. [R-5.1] [R-5.2]
3. Kokonaan uudet luettavat tekstit hyväksyy KK listana ennen äänitystä. Näyte omistajalle vain hänen pyynnöstään, mukana koko prompti tunnetageineen. [R-5.1] [P-261111-5]
4. Pelin hyväksytyt ajonaikaiset puhetoiminnot (luenta, Pulun chat, museon ympyrät) eivät tarvitse ajolupaa. [R-5.3]
5. Testit eivät tuota striimiääntä; ohitus vain omistajan luvalla. Vapaa valmis äänite tai hyväksytyn äänen uudelleenkoodaus ei ole generointia. [R-5.2]
6. Hinta-arvio ja 3 %:n raja lasketaan kuiva-ajosta (merkit tageineen ja esiteksteineen, viimeisin toteumahinta). [R-5.2]
7. Puhepyynnöt kulkevat yhteisen pyyntötien kautta, jotta loki ja kielitieto jäävät; ilman lokia kieltä ei vahvisteta. [P-261111-14]
8. Maksullisen generoinnin raakatuotos tallennetaan ennen käsittelyä versioituna varmuuskopioituihin äänimastereihin (T7); raakaa ei poisteta eikä ylikirjoiteta. [R-5.13]
9. Ääni tilataan ja tasoitetaan PCM:nä ja pakataan kerran masterista; true peak enintään −1 dBTP. Luentapalat tasataan samaan kiinteään keskitasoon, ei huipun mukaan. [R-5.10] [P-261111-15]
10. Jokainen äänipaketti läpäisee teknisen ääniportin ennen vientiä. Poikkeus vain perusteltuna portin listalla. [R-5.11] [P-261115-21]
11. Äänityksiä ei kuunnella tarkistukseksi eikä niistä tehdä tarkistusraporttia; Gemini-kuuntelua ei käytetä koskaan. Jäävät: tekstin kuiva-ajo KK:lle ennen äänitystä, esitekstin leikkaus, tekninen portti (10) ja viennin onnistuminen. Kuuntelua kutsuva ajo pysäytetään ja kerrotaan KK:lle. [P-261117-15] [P-261117-16]
12. Nosto äänitetään vasta, kun se on kokonaan kirjoitettu uudestaan ja sillä on kuvat ja ranskalaiset viivat; sitten ilman kysymystä (ei säännön 1 lupaa). [P-261117-88] S-13

EI VIKA:
- Omistaja ei ole kuullut puheäänitystä, eikä kukaan ole kuunnellut sitä.

TEKOTAPA:
- Portti proto-3d/tyokalut/aaniportti.py, pakollisena vaiheena julkaisijan vie-paketti.sh.
- Pyyntötie: pyynto-funktio, tools/elevenlabs_kieli.py.
- Luentaputki (kuiva-ajo, avain, ääntämisasu, esiteksti): proto-3d/tyokalut/pelikoodari-ajot/esigeneroi-luennat.py.
- Musiikin ja tehosteiden sisältö: musiikki-ja-tehosteet. Mitä luetaan: kertojaaanet.

