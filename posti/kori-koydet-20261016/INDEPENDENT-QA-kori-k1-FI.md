# Riippumaton kuva-QA — korin köydet #374

**Tila: 1/1 havainnekuva tarkistettu henkilökohtaisesti.** Tehtävänanto `sources/fable-codex-kori-koydet-havainne-20261016.md` on luettu kokonaan. Lähde `sources/kori-koydet-nyt-20261016.jpg` ja tulos `images/havainne-kori-k1.png` on katsottu `view_image`-työkalulla.

Kuva tukee molempien näkyvien köysien kiinnittymistä korireunaan ja sopii **PT/omistaja-arvioehdokkaaksi**. Omistajan/vastaanottajan hyväksyntää, pelitoteutusta tai runtime-testausta ei väitetä tehdyksi.

## Vasen kiinnitys

Pääköysi kohtaa korireunan sidontakohdassa ilman selvää irti jäävää väliä. Köydessä näkyy kierretty säierakenne, solmumainen sidonta ja lenkki, joka kulkee alas reunan etupuolelle ja kiertää nahalla peitetyn reunan muotoa. Kiinnityksessä erottuu tikattu tumma nahkasuojus/kaulus. Lyhyet päät liittyvät sidontaan; pitkää irrallista pääköyden jatketta tyhjään ei näy.

Suoraa läpivientiä pajupunoksen läpi ei ole näkyvissä. Kuva havainnollistaa tehtävänannon sallimaa **reunan ympäri kiertävää sidontaa**. Lenkin koko paluureitti peittyy osin reunan/nahkasuojuksen taakse, joten solmun täydellistä topologiaa ei voi todentaa.

## Oikea kiinnitys

Pääköysi kohtaa solmumaisen paksunnoksen ja korireunan nahkasuojuksen. Näkyvät sidontakierrokset ja alas etupinnalle kaartuva lenkki antavat tiiviin reunan ympäri kiinnittyvän vaikutelman. Oikealle osoittava lyhyt pää päättyy sidonnan lähelle; pääköysi ei jatku vapaana alas tyhjään. Tikattu nahkasuojus/kaulus erottuu myös tässä kohdassa.

Pajupunoksen läpi menevää avointa läpivientiä ei näy. Lenkin paluu ja solmun sisäinen reitti ovat osin piilossa; näkyvä sidonta ei ole todiste mekaanisesta kantavuudesta tai oikeasta solmutopologiasta.

## Kamera, tausta ja mittakaava

Sama korkea alaspäin katsova korikamera tunnistuu: kaksi pääköyttä laidoilla, korireuna alhaalla ja fyysinen kompassi vasemmalla. Köysien, paksun pehmustetun reunan ja näkyvän pajupunoksen suhteissa ei havaittu olennaista mittakaavavirhettä. Lyhyitä solmunpäitä ja saman köyden lenkkejä ei lasketa uusiksi ripustusköysiksi.

Peking-taustan keltaiset katot/punaiset seinät vasemmalla, vaalea porrastettu tasanne yläoikealla, aukio ja varjot säilyvät sommittelun pääpaikoissa. Pienet arkkitehtuurin ja materiaalien muodot on havainnollistettu uudestaan; kyseessä ei ole täsmällisen peligeometrian tai historiallisen arkkitehtuurin todiste. Kulunut nahka, luonnonkuitu ja pajupunos tukevat vanhaa matkakirjaestetiikkaa. Etualan tarkkuus on lähdepelikuvaa suurempi, joten lopullinen tyylin yhteensopivuus tarkistetaan natiivissa näkymässä.

Lähde on **902×560 JPEG**, tulos **1588×991 native-PNG**. Kuvasuhteet ovat noin 1,6107 ja 1,6024; pieni ero on kirjattu, mutta olennaista kameran tai rajauksen vaihtumista ei havaittu. QA ei skaalannut tai muokannut kuvia.

## Fyysinen kompassi ja UI

Kompassin pinnassa näkyy epämääräisiä kirjain-/numeromerkkejä. Ne ovat fyysisen esineen pinnassa, eivät uusi HUD-overlay. Ne eivät estä köysikiinnityksen arviointia, mutta asteikko ei ole käyttökelpoinen luettavan tai kalibroidun kompassin mallina. Lähteen alakeskinen taukopainike puuttuu tuloksesta. Ei havaittua uutta HUD:ia, luettavaa päälle lisättyä tekstiä tai selvää vinjettiä.

## Rajat ja versiot

Yksittäinen kuva ei todista solmujen piilopintoja, mekaanista kantavuutta tai köysien ja korin liikkumista samassa tahdissa. Sidontojen, nahkasuojien, punoksen ja kompassin tarkat muodot ovat havainnollistusta. Köysi–kori-animaation synkka sekä natiivin mallin vastaavuus jäävät runtime-tarkistukseen.

Native-PNG SHA-256: `9104e280d195fb6e9e0767198c8230b3da000d6d0a67f779699871965b6ebe2e`

Lähde-JPEG SHA-256: `dd07a81b3c0c2e99d5ccaea0410147baf150d75bafb7c661e4d2ef2b66824cf0`

Koko tehtävänannon SHA-256, katseluevidenssi ja yksityiskohtaiset vasemman/oikean havainnot löytyvät `qa/independent-review.json`-tiedostosta. Tässä QA:ssa ei generoitu, muokattu kuvia, toimitettu postia tai muutettu ledgereitä. Vain tämän uuden scopen kaksi QA-tiedostoa kirjoitettiin. Aiemmat neljä tässä työssä tehtyä ISS-QA-tiedostoa tarkistettiin SHA-256-tunnistein muuttumattomiksi.
