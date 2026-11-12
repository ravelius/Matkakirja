# opas-ja-kuumailmapallo · vastuu KS · tarkistettu 12.11.2026

TAVOITE: Pelaaja nousee kuumailmapallon koriin ja liitää hyvin mallinnetun kaupungin ylle. Opas kertoo kohteista, pallo kiertää ne pehmeästi, ja pelaaja voi kysyä tai lentää vapaasti.

SÄÄNNÖT:
1. Opas ja pallo ovat vain kaupungeissa, joissa on hyvä 3D-aineisto. Muita ei tarjota ehdotuksissa, täkyissä, listoissa eikä puheella, eikä vapaata kohdehakua ole. [R-2.75]
2. Pelaaja näkee vain kehityskaupunkien pallot; muiden pallot näkyvät vain kehittäjälle harmaina. Lontoo, Praha ja Ateena avataan tässä järjestyksessä PT:n tarkistettua kierroksen pelikuvista, muut vasta omistajan päätöksellä. [R-2.87] [R-2.78]
3. Kartalla kaupungin kohdalla on kiinnitetty Kuumailmapallo. Lento sinne muualta maksaa £200, ja napautus avaa vain sen kaupungin oppaan. [R-2.77] [R-2.78] [R-2.79]
4. Linssivalikon opas avautuu täkyluetteloon ja maanosa–maa–kaupunki-valintaan; ilman täkyjä opas alkaa suoraan. [R-2.85]
5. Kaupunki alkaa noin 20 s avauksella. Esittele kaupunki vie noin 8 pysähdyksen kierroksen lukitusta kohdelistasta ja päättyy kysymykseen. [R-2.80] [R-2.82]
6. Pysähdyksellä pallo laskeutuu spiraalina kohteen ympäri katse kohteessa, ja koko rakennus näkyy korin yläpuolella. Reitti on lyhin ja kääntöä vähän; pallo lähtee päivänvalossa. [R-2.96] [R-2.82]
7. Kierroksella näkyy vain tauko, joka pysäyttää kerronnan ja lennon; lopetus kysyy vahvistuksen. Tapit ovat vain vapaassa lennossa, josta Palaa kierrokselle jatkaa keskeytyskohdasta. [R-2.84] [R-2.86]
8. Alareunan napit Kysy, Liiku, mikrofoni ja näppäimistö toimivat vain kaupungin sisällä. [R-2.81] [R-2.78]
9. Korin reunalla on oikeaa pohjoista näyttävä messinkikompassi, jonka merkki osoittaa seuraavaa kohdetta. Kori keinuu, kaupunki pysyy vakaana. [R-2.79] [R-2.80]
10. Esittelyt tehdään ja tarkistetaan etukäteen; livenä vastataan vain pelaajan kysymyksiin. Wikipedian tekstejä ja Googlen paikkatietoja ei käytetä. [R-2.76] [R-2.81]
11. Palloon viitataan oikein termein vain harvoin, ei koskaan kohteen kuvauksen keskellä. [R-2.97]
12. Kuvat tulevat vain ämpärin tarkistetusta kuvalistasta; ajonaikaista kuvahakua ei ole. [R-2.83]
13. Googlen laatat tulevat vain Cesium ionin kautta; julkaisu odottaa maksullista lisenssiä ja Cesiumin kirjallista vahvistusta. Näkymässä ei ole muuta karttakuvaa; Bing kelpaa vain Googlen katkon ajaksi. [R-2.87] [R-2.88]
14. Googlen logo näkyy aina. Laattoja ei tallenneta, niiden korkeuksia ei lueta, eikä laatoista johdeta korostuksia, vettä tai generoinnin kuvia. [R-2.89] [R-2.90] [R-2.86]

EI VIKA:
- Googlen sumentama kohde ohitetaan korkeammalta.
- Laattojen reiässä on perussävy ilman karttakuvaa.
- Tekstitys saa peittää kohteen.

TEKOTAPA:
- Sallitut kaupungit: palvelimen sallitut-3d-lista. Kuvaerät: tools/pollo/tee-opas-kuvat.mjs.
- Sanasto: docs/raportit/pallosanasto-kertoja-20261008.md. Reiät: LahtoLaatatTestit.
- Liike: kamera. Äänet: kertojaaanet. Omat mallit: nahtavyydet.
