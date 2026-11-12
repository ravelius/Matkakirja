# aaniluvat-ja-aaniportti · vastuu ÄÄ · tarkistettu 12.11.2026

TAVOITE: Pelaaja kuulee tasaista, selvää ja säröttömää ääntä. Jokainen maksullinen ajo on luvallinen ja hinnaltaan tiedossa, ja tulos tarkistetaan ennen kuin kukaan kuulee sen.

SÄÄNNÖT:
1. Puheäänityksen ajon alle 3 % kuukauden kiintiöstä luvittaa ja tarkastaa KK, myös uusinnan, koeoton ja uuden äänen, kaikessa puheessa. Rooli ei hyväksy uusintaa itse, ja kulutus kerrotaan KK:lle jälkikäteen. [R-5.1] [R-5.2]
2. Yli 3 %:n puheajoon sekä generoituun musiikkiin ja tekoälyn tehosteisiin tarvitaan omistajan lupa kortilla määrineen ja hintoineen, ajo kerrallaan. Lisäys tai uusinta vaatii uuden luvan; lupa ei siirry toiselle tilille. [R-5.1] [R-5.2]
3. Kokonaan uudet luettavat tekstit hyväksyy KK listana ennen äänitystä. Näyte omistajalle vain hänen pyynnöstään, mukana koko prompti tunnetageineen. [R-5.1] [P-261111-5]
4. Pelin hyväksytyt ajonaikaiset puhetoiminnot (luenta, Pulun chat, museon ympyrät workerin kautta) eivät tarvitse ajolupaa. [R-5.3]
5. Testit eivät tuota striimiääntä; ohitus vain omistajan luvalla. Vapaa valmis äänite tai hyväksytyn äänen uudelleenkoodaus ei ole generointia. [R-5.2]
6. Hinta-arvio lasketaan lähetetyistä merkeistä tageineen ja viimeisimmästä toteumahinnasta ennen ajoa. [R-5.2]
7. Puhepyynnöt kulkevat yhteisen pyyntötien kautta, jotta loki ja kielitieto jäävät; ilman lokia kieltä ei vahvisteta. [P-261111-14]
8. Maksullisen generoinnin raakatuotos tallennetaan versioituun ämpäriavaimeen ennen käsittelyä; raakaa ei poisteta eikä ylikirjoiteta. [R-5.13]
9. Ääni tilataan ja tasoitetaan PCM:nä ja pakataan kerran masterista; true peak enintään −1 dBTP. Lyhyiden leikkeiden sarja tasataan keskitasoltaan mediaaniin ±1,5 dB, ei huipun mukaan. [R-5.10] [P-261111-15]
10. Jokainen äänipaketti läpäisee ääniportin ennen vientiä (huippu, lyhyiden äänten kovuus, kieli suomi). Poikkeus vain perusteltuna portin listalla. [R-5.11]
11. Tekoäly kuuntelee jokaisen puheoton sokkona ennen vientiä; poikkeama on uusinta. Litteroinnin epäily ei yksin pysäytä vientiä, mutta KK voi uusia sen perusteella. [R-5.11] [R-5.1]

EI VIKA:
- Omistaja ei ole kuullut äänitystä: KK:n tarkastus riittää.

TEKOTAPA:
- Portti proto-3d/tyokalut/aaniportti.py, pakollisena vaiheena julkaisijan vie-paketti.sh.
- Pyyntötie: pyynto-funktio, tools/elevenlabs_kieli.py.
- Musiikin ja tehosteiden sisältö: musiikki-ja-tehosteet. Mitä luetaan: kertojaaanet.
