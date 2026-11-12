# kamera · vastuu PK · tarkistettu 12.11.2026

TAVOITE: Kamera liikkuu koko pelissä kuin hyvässä elokuvassa: se lähtee ja pysähtyy pehmeästi, liikkuu usealla akselilla yhtä aikaa eikä koskaan nykäise tai hyppää. Käsiala on sama kartalla, kaupungeissa, museoissa ja peleissä; vain tahti vaihtuu.

SÄÄNNÖT:
1. Pelissä on yksi kamerakirjasto. Uusi kohtaus käyttää sitä heti; omaa liikutus- tai pehmennyskoodia ei tehdä. [P-261112-kirjasto]
2. Kuvan tuottaa aina sama runko (Kameralaite): kohtaus antaa vain tavoitteen (paikka, katsepiste, kuvakulma), ja runko vie kameran sinne. [P-261112-kirjasto]
3. Tavoitteen antaa yksi kolmesta ajurista: ohjaaja (käsikirjoitettu liike), seuraaja (liikkuva kohde) tai pelaajan ote. [R-4.24]
4. Paikka, nopeus ja kiihtyvyys ovat jatkuvia aina, myös kun liike vaihtuu tai keskeytyy. Leikkaus on sallittu vain täyden peitteen alla tai seuraajan U-käännöksessä; paikan hyppyä ei peitetä leikkauksella. [R-4.24] [P-261112-leikkaus]
5. Unityn kameraan kirjoittaa vain KameraKirjoittaja. [R-4.24]
6. Tahti valitaan nimetystä tyylistä (peli vauhdikas, museo rauhallinen). Kohtauksella ei ole omia aikavakioita. [P-261111-kasiala]
7. Kaikki käyrät ja jouset tulevat Liikepohjasta. Lineaarisia pätkiä ei ole. [R-2.68]
8. Usea akseli liikkuu yhtä aikaa. Kamera ei pyöri paikallaan: se etenee sivuttain tai vinosti ja kääntyy menosuuntaan vain vähän, noin 15 astetta. [R-2.69]
9. Kallistus syntyy kameran omasta sivukiihtyvyydestä ja on kevyt, pari astetta. Nyökkäystä ei jäljitellä, eikä tyyli ole kilpadronen. [P-261111-kasiala]
10. Siirroissa ei ole mustia välähdyksiä eikä häivytyksiä. [R-2.202]
11. Automaattisen ajon tempo vaihtelee: nopea lähestyminen, pehmeä jarrutus, hidas panorointi, kiihtyvä irtautuminen. [R-2.68]
12. Seurattava kohde pysyy kuvassa koko ajan. [R-2.166]
13. Kertoja, tehosteet ja kamera kulkevat samalla aikajanalla. Tauko pysäyttää kertojan ja tekstityksen heti. [R-4.23]
14. Liikkeen lopussa tarvittava ladataan ennen liikkeen alkua. Yli 20 ms:n ruutu liikkeen aikana tai sekunnin sen jälkeen hylkää ajon. [R-4.24]
15. Pelaaja saa panoroida ja loitontaa vapaasti koko pallolla. Nipistyksen pieni kierto ohitetaan, kunnes kääntö ylittää kynnyksen (15–20 astetta). [R-2.15] [R-6.11]
16. Vanha kohtaus siirretään kirjastoon työlistan järjestyksessä. Siirto on valmis vasta, kun vanha toteutus on poistettu. [P-261112-kirjasto]

EI VIKA:
- Kamera ei nyökkää kiihdytyksessä eikä jarrutuksessa.
- Kisko hidastaa mutkissa.
- Käsikirjoitettu liike asettuu perille pehmeästi pienellä viiveellä.

TEKOTAPA:
- Kirjasto: KIRJASTOT.md rivi kamera.
- Suorat kirjoitukset kameraan: tyokalut/kameravahti.py (lähtötaso saa vain pienentyä).
- Omat pehmennykset: tyokalut/liikevahti.py (lähtötaso saa vain pienentyä).
- Radan rajat: Kameratarkastus ja kirjaston testit (Linssit-testit).
- Käsiala arvioidaan tallenteesta.
