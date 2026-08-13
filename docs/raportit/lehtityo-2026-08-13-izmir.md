# İzmir — raportti 13.8.2026

*Nipun 2 kuudes kaupunki. Doha v587, Nikosia v592, Kuwait v594,
Masqat v597, Bagdad v598.*

## Mitä valmistui

İzmirin kaupunkilehti kokonaan: kohdekartta, kansisivu, aihesivu `arki`
minitehtävineen ja kuusi nähtävyysjuttua.

Kohdekartta on Konakin aukiolta antiikin agoralle. Kemeraltin pääkuja
kaartuu kartalla puolikuuna, ja kaari on vanhan rantaviivan muoto —
basaari kasvoi umpeen liettyneen sisälahden päälle. Kadifekalen
linnavuori jää ulos, koska sen ja agoran välissä on jyrkkä rinne, joka
venyttäisi rajauksen kaksinkertaiseksi.

## Kolme kiertoilmausta, jotka piti purkaa

Peli ei käsittele nykykonflikteja, ja İzmirissä rajaus tarkoittaa, ettei
vuoden 1919 maihinnousua, vuoden 1922 paloa eikä väestönvaihtoa
käsitellä. Rajaustarkistin sai ohjeen etsiä nimenomaan **kiertoilmauksia**
— Kuwaitin erässä kaksi kirjoittajaa oli muotoillut sotavaurion
neutraaliksi remontiksi — ja löysi kolme:

1. Kemeraltı: *"Sitä vanhemmat Suuri ja Pieni Vezir Han eivät
   säilyneet."* Katoamismaininta ilman syytä. Lähde sanoo vain "have not
   survived to this day" eikä kerro miksi. Virke kirjoitettiin uusiksi
   niin, että hanit esitellään rakennettuina eikä kadonneina.
2. Hisarin moskeija: *"rakennus on korjattu vaurioiden jälkeen neljä
   kertaa, vuosina 1813, 1881, 1927 ja 1980."* Vuosiluvut ovat
   Wikipediasta sanatarkasti, mutta lähde ei kerro vaurion syytä, ja
   İzmirissä vuosi 1927 saa lukijan täydentämään sen itse. Vuodet
   jäivät, "vaurioiden jälkeen" poistui.
3. Salepçioğlun moskeija: sama kaava minareetin korjauksissa 1927 ja
   1974. Sama korjaus.

Kaikki kolme lausetta olisivat läpäisseet sanahaun: yksikään ei sisällä
kiellettyä sanaa. Ne löytyivät vain kysymällä jokaisesta korjaus- ja
katoamismaininnasta, **miksi tämä lause on tässä ja mitä lähde sanoo
syyksi.**

## Väite, jota kaksi kirjoittajaa teki ja kolmas kieltäytyi tekemästä

Kemeraltin ja Salepçioğlun jutut väittivät kumpikin itsenäisesti, että
Hisarin moskeija on İzmirin (tai Kemeraltin) **vanhin** ottomaanien
rakennus. Hisarin oma kirjoittaja oli nimenomaan kieltäytynyt tästä
väitteestä, koska englanninkielinen Wikipedia ei sano sitä.

Tarkistin lähteen itse: artikkeli sanoo *"one of the biggest in the city
centre"* — sanaa "oldest" ei esiinny artikkelissa lainkaan. Väite
poistettiin molemmista jutuista. Kirjoittaja, joka kieltäytyi, oli
oikeassa.

## Sulu Hanin juttu on tarkoituksella kuvaton

Sulu Hanin kirjoittaja palautti tyhjän kuvalistan ja kertoi suoraan
miksi: Commonsissa ei ole yhtään kuvaa tästä hanista. Se listasi
tekemänsä haut (geohaku 200 metrin säteellä, viisi Kemeralti-luokkaa) ja
totesi, ettei halua käyttää naapurihanin kuvaa väärällä selitteellä.

Tarkistin asian itse: Commonsin haku ja geohaku 150 metrin säteellä
antavat vain naapurirakennuksia (Şadırvanaltın moskeija, Yeni Kavaflar).
**Kirjoittaja oli oikeassa.**

Harkitsin kohteen vaihtamista Kızlarağası Haniin, joka on Kemeraltin
tunnetuin han ja jolla on viisitoista kuvaa Commonsissa. Se ei käy:
Kızlarağası on 38,42139 / 27,13306 eli **yhdentoista pikselin päässä**
Hisarin moskeijan pisteestä samalla kartalla — kaksi numeroympyrää olisi
käytännössä päällekkäin, ja Hisarilla on jo kuvitettu juttu.

`ui.js` osaa jättää kuvakehyksen pois (`kuvat.length ? ... : null`), ja
selaintarkistus vahvisti, että juttu näyttää ehyeltä ilman kuvaa.
Perustelu on kirjoitettu `nahtavyysjutut.js`:n izmir-kommenttiin, jottei
sitä myöhemmin luulla unohdukseksi.

## Kaksi virhettä omassa tehtävänannossani

Kirjoittajat korjasivat kolme lukua, jotka olin itse antanut väärin:

- **Kellotornin kello ei ole Vilhelm II:n lahja.** Annoin sen
  tehtävänannossa; englanninkielinen Wikipedia ei tue väitettä millään
  tavalla, ja kirjoittaja jätti sen pois ja sanoi miksi.
- **Hisarin moskeija 1597 → 1598** ja **Salepçioğlu 1902–1907 → 1905**,
  molemmat lähteen mukaan.

Faktatarkistin vahvisti kaikki kolme korjausta erikseen. Tämä on hyvä
merkki työtavasta: kirjoittajalla on lupa olla eri mieltä
tehtävänannosta, kun lähde on sen puolella.

## Toistotutkan jäljelle jäävä pari

`tarkista-aihetoisto` nostaa Hisarin ja Salepçioğlun jutut samaksi
pariksi (yhdeksän yhteistä harvinaista sanaa). Poistin ensin
ristiviittauksen, jonka olin itse jättänyt Salepçioğluun — se laski
lukua yhdellä. Loput ovat moskeijasanastoa: kupoli, pääkupoli,
sisäänkäynti, sisäpinta, Kemeraltı, basaarikortteli.

Jätin parin ennalleen. Rakennukset ovat aidosti eri: 1598 ja 1905,
pihallinen ja pihaton, kiinni oleva ja irrallinen minareetti,
pilarikannatus ja pendentiivit. Kaksi moskeijaa samassa korttelissa
jakaa väistämättä sanaston, ja tutka on varoitin eikä tuomari — pelissä
on ennestään neljätoista vastaavaa paria.

## Mitat

Kuusi nähtävyysjuttua 953–1 391 merkkiä, yksi niistä kuvaton.
Kansisivu kolmella kansikuvalla ja kolmella nostolla, aihesivu `arki`
(boyoz, kumru, lautat) minitehtävineen. Kuvia 20, joista yksikään ei ole
pelissä ennestään eikä toistu kaupungin sisällä. `npm test` puhdas,
`tarkista-kaksoisavaimet` puhdas, `tarkista-karttapisteet` kaikki
pisteet maalla, yksikään ei peitä mittakaavajanaa eikä toista
numeroympyrää.

**Säätiedot puuttuvat** — Open-Meteon vuorokausikiintiö oli käytetty.
Säälohko on vapaaehtoinen (43 kohdekartasta kymmenellä on se), ja İzmir
täydennetään myöhemmin Bagdadin kanssa.

## Jonossa

Ankaran kohdekartta on valmis ja tarkistettu (linnavuori, Augustuksen
temppeli, roomalainen kylpylä, Julianuksen pylväs, Anatolian
sivilisaatioiden museo, linnanportin kellotorni). Sen jälkeen Aleppo,
Damaskos, Luxor, Riad, Sana, Aden, Salalah, Mosul, Tabriz, Teheran ja
Isfahan — ja Lähi-idän jälkeen Aasia. Mekka ja Medina odottavat yhä
omistajan päätöstä.
