# lataus-ja-kaynnistys · vastuu NS · tarkistettu 12.11.2026

TAVOITE: Pelaaja ei odota verkkoa kohdassa, jonka peli tiesi tulevan: seuraava vaihe on jo ladattu, kun sinne tullaan. Lataus toimii samoin kaikilla verkoilla eikä kysy mitään.

SÄÄNNÖT:
1. Jokaisella siirtymällä tiedetään, mitä seuraavaksi voi näkyä, ja se ladataan edellisen vaiheen aikana, piilossa vaiheissa, jotka kestävät joka tapauksessa (lento, kortti, luenta). [R-6.12]
2. Intron ja aarrekysymyksen aikana esilataus jatkuu; vastaus ei vapauta ladattua kaupunkia. [R-2.219]
3. Valinnan ja lennon aikana ladataan kaikki, mitä saapuminen tarvitsee. Kun kohteet näkyvät tai matka alkaa, kohdekaupunki saa saman kohtelun. [R-6.12]
4. Joutilaana ladataan ensin tämän kaupungin isot kuvat, lehdet, puheet ja näkyvän alueen linssidata, sitten nopalla saavutettavat kaupungit. Linssi avautuu kaari pienenä ja kaksi ensimmäistä pysäkkiä täysinä. [R-6.12]
5. Asennuspaketissa ovat koodi, fontit, UI-grafiikka, Pulu, lentokone, efektiäänet, logo, avauskuva, pallon pohja Z0–Z5 ja aloitusnäytön tiedot. [R-6.12]
6. Ei esiladata koko maailman Z9–Z11:tä, muiden kaupunkien gallerioita ja wikitekstejä eikä taidemuseota. [R-6.12]
7. Lataus, esilataus ja päivitys toimivat samoin Wi-Fillä, mobiiliverkossa ja datansäästössä: ei kokorajoja, lykkäystä, Wi-Fi-asetusta eikä kysymyksiä. Verkkotyyppejä erottelevia ehdotuksia ei tehdä. [R-6.1]
8. Sisältöpaketin päivitys haetaan taustalla eikä estä pelaamista; se otetaan käyttöön seuraavassa käynnistyksessä tai joutilaana. Asetukset ovat paketin dataa, eikä peli käytä pakettia, joka on vanhempi kuin asennuspaketin mukana testattu. [R-6.12] [R-10.14] [R-10.7]
9. Ruudulla näkyvä lataus ohittaa taustalatauksen, ja epäonnistunut esilataus uusitaan. Virransäästössä ja kuumana joutilaan ja ennakoinnin lataus pysähtyy. [R-6.13] [R-6.14]
10. Offline-kartat ladataan maanosittain tai kaikki, ei maittain: Z8 koko maailmasta, Z9 kaupunkien ympäriltä. [R-2.197] [R-6.12]
11. Latauskuva vain 3D-maailmoihin; se täyttää ruudun myös kierron jälkeen, liike on vähäeleinen, ja kuumailmapallo heiluu selvästi. Muualla väistämätön lataus näkyy pienenä palkkina todellisesta edistymisestä, ja näkymä aukeaa vasta valmiina. [R-4.27] [R-4.7] [R-2.82]
12. Esirenderöity video ladataan kokonaan ennen omaa kohtaustaan. [R-4.21]

EI VIKA:
- Mobiiliverkossa ladataan yhtä paljon kuin Wi-Fillä.
- Muiden kaupunkien galleriat ja tarkimmat laatat haetaan vasta katsottaessa.

TEKOTAPA:
- Esilataaja: docs/raportit/esilataaja-suunnitelma-20260925.md.
- Osumaprosentti ja verkko-odotus vaiheittain: loki ja savuke.
- Palkin ulkoasu: tyylikirja. Äänten lähde: media-ja-ampari.
- Offline-karttojen tasot: palvelimen offline.json, ei koodissa.
