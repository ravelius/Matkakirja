# kamera · vastuu PK · tarkistettu 18.11.2026

TAVOITE: Kamera liikkuu kuin hyvässä elokuvassa: pehmeästi, usealla akselilla yhtä aikaa, ilman nykäyksiä. Käsiala on sama kartalla, kaupungeissa, museoissa ja peleissä; vain tahti vaihtuu.

SÄÄNNÖT:
1. Pelissä on yksi kamerakirjasto; uusi kohtaus käyttää sitä heti, ei omaa liike- tai pehmennyskoodia. [P-261112-1]
2. Kuvan tuottaa aina sama runko (Kameralaite); kohtaus antaa vain tavoitteen (paikka, katsepiste, kuvakulma). [P-261112-1]
3. Tavoitteen antaa yksi ajuri: ohjaaja (käsikirjoitettu liike), seuraaja (liikkuva kohde) tai pelaajan ote. [R-4.24]
4. Paikka, nopeus ja kiihtyvyys ovat aina jatkuvia, myös liikkeen vaihtuessa tai keskeytyessä. Leikkaus vain täyden peitteen alla tai seuraajan U-käännöksessä; paikan hyppyä ei peitetä leikkauksella. [R-4.24] [P-261112-2]
5. Kameraan kirjoittaa vain KameraKirjoittaja. [R-4.24]
6. Voimakkuus ja tahti tulevat datana olevasta käsialaprofiilista (museo sama hiljempaa). Kohtauksella ei ole omia lukuja. [P-261111-1] [P-261118-18]
7. Kaikki käyrät ja jouset tulevat Liikepohjasta; ei lineaarisia pätkiä. [R-2.68]
8. Usea akseli liikkuu yhtä aikaa. Kamera ei pyöri paikallaan: etenee sivuttain tai vinosti ja kääntyy menosuuntaan vain ~15°. [R-2.69]
9. Lentorata on elokuvan, ei droonin: yksi viiva, pitkiä S-mutkia, joiden kaarevuus muuttuu vähitellen; liike koko ajan, ei nykäyksiä. Kamera kallistuu sille puolelle, jonne rata kaartaa, profiilin rajoissa; peruskartalla sama kaikissa siirtymissä. Suunnittelu suunnittelee radan ja ohjauksen. [P-261118-18] [P-261117-111] [P-261118-31] [P-261118-34] [P-261118-39]
10. Siirroissa ei mustia välähdyksiä eikä häivytyksiä. [R-2.202]
11. Kohteella kamera kaartaa, nousee ja muuttaa etäisyyttä yhtä aikaa; kaarre alkaa jarruttaessa ja jatkuu kiihdytykseen, siirtymässä palaa alemmas. [P-261118-18]
12. Seurattava kohde pysyy aina kuvassa. [R-2.166]
13. Kertoja, tehosteet ja kamera kulkevat samalla aikajanalla. Tauko pysäyttää kertojan ja tekstityksen. [R-4.23]
14. Liikkeen lopussa tarvittava ladataan ennen alkua. Yli 20 ms:n ruutu liikkeen aikana tai 1 s sen jälkeen hylkää ajon. [R-4.24]
15. Pelaaja panoroi ja loitontaa vapaasti koko pallolla; nipistyksen pieni kierto ohitetaan kynnykseen (15–20°) asti. [R-2.15] [R-6.11]
16. Vanha kohtaus siirtyy kirjastoon työlistan järjestyksessä. Valmis, kun vanha on poistettu. [P-261112-1]
17. Kartan sauvat ovat piilossa Ohjain-napin takana ja palaavat sinne 10 s käyttämättöminä. Nappi näkyy aina eikä syki. [P-261113-19]

EI VIKA:
- Kamera ei nyökkää kiihdytyksessä eikä jarrutuksessa.
- Kisko hidastaa mutkissa.
- Käsikirjoitettu liike asettuu perille pehmeästi pienellä viiveellä.

TEKOTAPA:
- Kirjasto: KIRJASTOT.md rivi kamera.
- Vahdit (lähtötaso saa vain pienentyä): tyokalut/kameravahti.py (suorat kirjoitukset), tyokalut/liikevahti.py (omat pehmennykset).
- Radan rajat: Kameratarkastus, Linssit-testit ja kasialamittarin R- ja K-rivit.
- Käsiala arvioidaan tallenteesta.
