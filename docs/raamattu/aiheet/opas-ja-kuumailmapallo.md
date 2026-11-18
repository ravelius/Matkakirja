# opas-ja-kuumailmapallo · vastuu KS · tarkistettu 18.11.2026

TAVOITE: Pelaaja nousee kuumailmapallon koriin ja liitää hyvin mallinnetun kaupungin ylle. Opas kertoo kohteista, pallo kiertää ne pehmeästi, ja pelaaja voi kysyä tai lentää vapaasti.

SÄÄNNÖT:
1. Opas ja pallo ovat vain kaupungeissa, joissa on hyvä 3D-aineisto. Muita ei tarjota ehdotuksissa, täkyissä, listoissa eikä puheella; vapaata kohdehakua ei ole. [R-2.75]
2. Pelaaja näkee vain kehityskaupunkien pallot; muut vain kehittäjälle harmaina. Lontoo, Praha ja Ateena avataan järjestyksessä PT:n tarkistettua kierroksen pelikuvista, muut omistajan päätöksellä. [R-2.87] [R-2.78]
3. Kartalla kaupungin kohdalla on kiinnitetty Kuumailmapallo. Lento sinne maksaa £200; napautus avaa vain sen kaupungin oppaan. [R-2.77] [R-2.78] [R-2.79]
4. Linssivalikon opas avautuu täkyluetteloon ja maanosa–maa–kaupunki-valintaan; ilman täkyjä opas alkaa suoraan. [R-2.85]
5. Kaupunki alkaa n. 20 s avauksella. Esittele kaupunki vie n. 8 pysähdyksen kierroksen lukitusta kohdelistasta ja päättyy kysymykseen. [R-2.80] [R-2.82]
6. Pysähdyksellä pallo laskeutuu spiraalina kohteen ympäri katse kohteessa; koko rakennus näkyy korin yläpuolella. Reitti lyhin, kääntöä vähän; pallo lähtee päivänvalossa. [R-2.96] [R-2.82]
7. Kierroksella näkyy vain tauko (pysäyttää kerronnan ja lennon); lopetus kysyy vahvistuksen. Tapit ovat vain vapaassa lennossa, josta Palaa kierrokselle jatkaa keskeytyskohdasta. [R-2.84] [R-2.86]
8. Alareunan napit Kysy, Liiku, mikrofoni ja näppäimistö toimivat vain kaupungin sisällä. [R-2.81] [R-2.78]
9. Korin reunalla messinkikompassi näyttää oikean pohjoisen, merkki seuraavan kohteen. Kori keinuu, kaupunki pysyy vakaana. [R-2.79] [R-2.80]
10. Esittelyt tehdään ja tarkistetaan etukäteen; livenä vastataan vain pelaajan kysymyksiin. Wikipedian tekstejä ja Googlen paikkatietoja ei käytetä. [R-2.76] [R-2.81]
11. Palloon viitataan oikein termein harvoin, ei kohteen kuvauksen keskellä. [R-2.97]
12. Kuvat tulevat vain ämpärin tarkistetusta kuvalistasta; ajonaikaista kuvahakua ei ole. [R-2.83]
13. Google-versiossa laatat tulevat vain Cesium ionin kautta; julkaisu odottaa maksullista lisenssiä ja Cesiumin kirjallista vahvistusta. Näkymässä ei ole muuta karttakuvaa; Bing vain Googlen katkon ajaksi. [R-2.87] [R-2.88]
14. Googlen logo näkyy aina. Laattoja ei tallenneta eikä korkeuksia lueta; niistä ei johdeta korostuksia, vettä tai generoinnin kuvia. [R-2.89] [R-2.90] [R-2.86]
15. Pariisissa pallon napautus kysyy version: Googlen laatat tai pelin oma kartta (reitti ja muu ennallaan). [P-261118-13]

EI VIKA:
- Googlen sumentama kohde ohitetaan korkeammalta.
- Laattojen reiässä on perussävy ilman karttakuvaa.
- Tekstitys saa peittää kohteen.

TEKOTAPA:
- Sallitut kaupungit: palvelimen sallitut-3d-lista. Kuvaerät: tools/pollo/tee-opas-kuvat.mjs.
- Sanasto: docs/raportit/pallosanasto-kertoja-20261008.md. Reiät: LahtoLaatatTestit.
- Liike: kamera. Äänet: kertojaaanet. Omat mallit: nahtavyydet.
