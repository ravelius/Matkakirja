# Kaavunnoston tuontikorjaus, Pelikoodari1187

V2 täydentää f2ab390a3:n 11 leikkeen liikekirjastoja kahdella weights-kanavalla: jump_robe ja stairs_robe. Kaikki aiemmat luukanavat, solmut/nimet/lepotransformit ja näytteet ovat tavutarkasti samat. Ei mallin, riggauksen tai liikkeen uutta muotoilua. Ei uusia Tripo-kutsuja.

Käytä tämän kansion motions/puyi-perus-liikkeet.glb ja motions/puyi-liikkeet.glb. Molemmat ovat receiver1187:n erillisiä liiketiedostoja ilman verkkoa/materialeja/kuvia. Weights kohdistetaan päämalliin solmun nimellä, muodon nimi robeHemLiftLeft; yksi paino. Vanhoissa leikkeissä ei weights-kanavaa: sovitun lukijan pitää nollata morfi niiden aikana. Tiedostot eivät ole itsenäisiä renderöitäviä malleja.

Käytä tämän V2:n tools/apply_robe_morph.py:tä V1:n manifestin ja muuttumattoman robeHemLiftLeft.bin:n kanssa. Uusi asennin lisää vain morfigeometrian/default0:n päämallin kopioon; ei yhtään animaation weights-kanavaa. Vanha V1-asennin lisäsi painokanavat päämalliin, joten se on korvattu tähän tuontitapaan. Työkalu ei muuta alkuperäistä eikä hyväksy muuttunutta topologiaa, riggiä tai jo morfitettua syötettä. Ei tarvitse tuoda kaavuluuleikkeitä päämalliin etukäteen. Valmis päämalli vaihdetaan kokonaisena Pelikoodarin puolella.

QA: kaikki vanhat accessor-taulukot ja kanavat samoja; uudet weights-näytteet tavutarkasti tarkistetusta full-mallista. Uudelleentuonti solmun nimellä ja 194 poseerausta/asumalli: kaikkien skinnattujen kärkien maksimaalinen ero0m alkuperäiseen tarkistettuun versioon. Tämä on paikallinen lukijasopimuksen simulointi, ei pelin testi. Pelikoodarin weights-lukijatuki, pelikoe ja KK/omistajan hyväksyntä vielä erillisiä.

V1:n visuaaliset arkit ja rajoitukset pysyvät: oikea hihan/kainalon täyskorjaus on eri työ. Tässä ei vaihdeta päämallin geometriaa muilta osin. Tavallinen taunt_run on vielä työehdokas eikä mukana tässä11leikkeen paketissa.
