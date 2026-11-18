# kamera · vastuu PK · tarkistettu 18.11.2026

TAVOITE: Kamera liikkuu kuin hyvässä elokuvassa: lähtee ja pysähtyy pehmeästi, liikkuu usealla akselilla yhtä aikaa eikä nykäise tai hyppää. Käsiala on sama kartalla, kaupungeissa, museoissa ja peleissä; vain tahti vaihtuu.

SÄÄNNÖT:
1. Pelissä on yksi kamerakirjasto; uusi kohtaus käyttää sitä heti, ei omaa liike- tai pehmennyskoodia. [P-261112-1]
2. Kuvan tuottaa aina sama runko (Kameralaite); kohtaus antaa vain tavoitteen (paikka, katsepiste, kuvakulma). [P-261112-1]
3. Tavoitteen antaa yksi kolmesta ajurista: ohjaaja (käsikirjoitettu liike), seuraaja (liikkuva kohde) tai pelaajan ote. [R-4.24]
4. Paikka, nopeus ja kiihtyvyys ovat jatkuvia aina, myös kun liike vaihtuu tai keskeytyy. Leikkaus on sallittu vain täyden peitteen alla tai seuraajan U-käännöksessä; paikan hyppyä ei peitetä leikkauksella. [R-4.24] [P-261112-2]
5. Kameraan kirjoittaa vain KameraKirjoittaja. [R-4.24]
6. Voimakkuus ja tahti tulevat datana olevasta käsialaprofiilista (museo sama hiljempaa). Kohtauksella ei ole omia lukuja. [P-261111-1] [P-261118-18]
7. Kaikki käyrät ja jouset tulevat Liikepohjasta. Lineaarisia pätkiä ei ole. [R-2.68]
8. Usea akseli liikkuu yhtä aikaa. Kamera ei pyöri paikallaan: se etenee sivuttain tai vinosti ja kääntyy menosuuntaan vain vähän, noin 15 astetta. [R-2.69]
9. Kamera kallistuu kaarteissa selvästi ja loogisesti profiilin katon rajoissa; rata ei mutkittele; peruskartalla sama kaikissa siirtymissä. Lentoradan ja kameran ohjauksen suunnittelee Suunnittelu. [P-261118-18] [P-261117-111] [P-261118-31]
10. Siirroissa ei ole mustia välähdyksiä eikä häivytyksiä. [R-2.202]
11. Kohteella kamera kaartaa, nousee ja muuttaa etäisyyttä yhtä aikaa; kaarre alkaa jarruttaessa ja jatkuu kiihdytykseen, siirtymässä se palaa alemmas. [P-261118-18]
12. Seurattava kohde pysyy kuvassa koko ajan. [R-2.166]
13. Kertoja, tehosteet ja kamera kulkevat samalla aikajanalla. Tauko pysäyttää kertojan ja tekstityksen. [R-4.23]
14. Liikkeen lopussa tarvittava ladataan ennen liikkeen alkua. Yli 20 ms:n ruutu liikkeen aikana tai sekunnin sen jälkeen hylkää ajon. [R-4.24]
15. Pelaaja saa panoroida ja loitontaa vapaasti koko pallolla. Nipistyksen pieni kierto ohitetaan, kunnes kääntö ylittää kynnyksen (15–20 astetta). [R-2.15] [R-6.11]
16. Vanha kohtaus siirtyy kirjastoon työlistan järjestyksessä. Valmis, kun vanha on poistettu. [P-261112-1]
17. Kartan sauvat ovat piilossa Ohjain-napin takana ja palaavat sinne 10 s käyttämättöminä. Nappi näkyy aina eikä syki. [P-261113-19]

EI VIKA:
- Kamera ei nyökkää kiihdytyksessä eikä jarrutuksessa.
- Kisko hidastaa mutkissa.
- Käsikirjoitettu liike asettuu perille pehmeästi pienellä viiveellä.

TEKOTAPA:
- Kirjasto: KIRJASTOT.md rivi kamera.
- Vahdit (lähtötaso saa vain pienentyä): tyokalut/kameravahti.py (suorat kirjoitukset), tyokalut/liikevahti.py (omat pehmennykset).
- Radan rajat: Kameratarkastus ja kirjaston testit (Linssit-testit).
- Käsiala arvioidaan tallenteesta.
