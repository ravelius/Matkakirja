# Astronautin kamera: ISS:n kyyti (Linssisepän suositus 28.9.2026)

*Omistajan kysymys 27.9. klo 23.5x: "pääseekö astronautin kamerassa jo iss:n kyytiin?" Fable kirjasi erän Linssisepälle
(natiivi) ja Pelikoodarille (web on malli). Pohjana on 26.9. hyväksytty ISS-linssin suunnitelma
(docs/raportit/iss-linssi-suunnitelma-20260926.md), jonka kaukonäkymä (SGP4-rata ja maajälki) on jo natiivissa. Tämä on
yksi yhteinen suositus natiiville ja webille. Kuvapari tehdään natiivin ensimmäisestä käännöksestä.*

## 1. Kokemus: kolme tilaa, yksi napautus kerrallaan

1. **Kaukonäkymä (nykyinen):** koko pallo, ISS hohtavana pisteenä todellisella radallaan ja maajälki.
   - ISS-pisteen osuma-ala on 44 pt. Piste sykkii kerran linssin avautuessa (0,6 s), jotta sen huomaa napautettavaksi.
   - Tekstiä tai nappia ei lisätä.
2. **Kyyti (seuranta):** kamera lentää 2,5 s:ssa ISS:n taakse ja yläpuolelle (etäisyys ISS:ään 1 200 km, kallistus 55°,
   suunta radan suuntaan).
   - ISS näkyy pienenä 3D-mallina ruudun keskellä juuri maan reunan alapuolella. Ohut ilmakehän kaari ja musta avaruus
     ovat yläreunassa.
   - Maa liukuu alla todellisella nopeudella (7,66 km/s).
   - Malli: ristikko, neljä paria kullanruskeita aurinkopaneeleja, valkoiset moduulit ja radiaattorit. Se on liioiteltu
     pelikokoon (noin 90 pt leveä) kuten erikoismallit, ja sen tekee Mallinseppä (CC0, LOD0 ≤ 1 500 kolmiota).
3. **Ikkuna (Cupola):** uusi napautus vie 1,2 s:ssa ISS:n sisälle Cupolan ikkunaan.
   - Kamera on ISS:n todellisessa paikassa (SGP4:n korkeus, noin 420 km), katsoo radan suuntaan ja on kallistettu
     55° alas. Kenttäkulma on 80° pystyyn, Cupolan keskilasin mukaan.
   - Horisontti on 20,3° vaakatason alapuolella eli ruudun ylimmässä kymmenyksessä. Maan kaarevuus näkyy loivana kaarena.
   - Etualalla on Cupola-kehys (Codexin toimitus 26.9., ämpärissä): keskilasi ja kuusi trapetsilasia pokineen, sekä
     lasin heijastus omana kerroksenaan hitaalla 0,5°:n heilunnalla.
   - Maa liukuu ikkunan alla noin 1°/s.
4. **Paluu:** uusi napautus ikkunassa palaa seurantaan. ✕ oikeassa yläkulmassa (sama kuin kuvanäkymässä) palaa
   kaukonäkymään 2 s:ssa.

**Ohjaus kyydissä:** kamera on kiinni ISS:ssä, joten veto, nipistys ja kierto eivät liikuta sitä. Vähennetty liike:
siirtymät ovat häivytyksiä ilman lentoa.

**Tietorivi:** vasemmassa yläkulmassa on kuvanäkymän nimipillerin tyylinen rivi "ISS · 418 km · 27 580 km/h".
- Arvot päivittyvät kerran sekunnissa.
- Pillerissä ei ole muuta tekstiä, joten UI pysyy kevyenä.
- Kun TLE puuttuu tai on yli 30 vrk vanha, rivin loppuun tulee "rata-arvio" (suunnitelman taulukko).

## 2. Miksi näin

- **Napautus ISS:ään on luonnollisin tapa päästä kyytiin.** Nappi toisi yhden UI-elementin lisää linssiin, jossa on jo
  kuvanäkymä, ‹ › ja minipulu.
- **Seuranta ennen ikkunaa:** pelaaja näkee ensin, missä asema on ja mihin se on menossa. Sen jälkeen ikkuna tuntuu
  sisälle astumiselta eikä hypyltä.
- **Kehys kokonaisena** (keskilasi ja kuusi trapetsilasia), koska omistaja linjasi sen 26.9. (suunnitelma, Ikkuna).
  - Kehys peittää 61 % ruudusta, mikä on enemmän kuin UI:n kevyt raja 45 %.
  - Kehys on kuitenkin itse kokemus, ei koriste. Siksi kuvapari tehdään suunnitelman mukaan: ikkuna ilman kehystä ja
    kehyksen kanssa.

## 3. Toteutus natiivissa (Linssiseppä)

- **Ydin** (puhdas C#, testit):
  - `IssKyyti`: tilat Kauko, Seuranta ja Ikkuna, siirtymät ja napautukset.
  - `IssKuvakulma`: kameran asento SGP4-paikasta ja -nopeudesta.
    - Seuranta: katsekohde on ISS, etäisyys 1 200 km, kallistus 55° ja suuntima on radan suunta.
    - Ikkuna: katsekohde on maan piste, jossa 55°:n katse osuu maahan. 420 km:n korkeudella se on 2,69° edellä,
      etäisyys on 521 km ja kallistus 37,7°, jolloin silmä on ISS:ssä.
  - Siirtymät lasketaan asentojen välillä (leveys, pituus, etäisyys, kallistus, suuntima) yhteisellä käyrällä, koska
    kohde liikkuu ajon aikana.
- **Rajapinta:** ILinssiYmparisto saa kaksi jäsentä, `Kuvaa(Kuvakulma)` ja `KuvausLoppui()`. Sovitin kutsuu niillä
  PalloKierto.Kuvaa- ja SeurantaLoppui-metodeja, joita ElavaKartta jo käyttää, joten Natiiviseppä ei muuta tiedostojaan.
- **Kenttäkulma:** sovitin asettaa ikkunassa kameran fieldOfView-arvon 80°:een ja palauttaa sen 50°:een. Tämä on
  **Natiivisepän kuitattava**, koska PalloKierto lukee fieldOfView-arvon (MaxKorkeus, KallistusRaja).
- **ISS-malli:** AstronauttiKerros vaihtaa hohtopisteen 3D-malliin, kun etäisyys on alle 3 000 km.
- **Cupola-kehys:** UITK-kerros UI/Linssit-kansiossa (Natiivi-UI katselmoi).
  - Kuvat haetaan ämpäristä ensimmäisellä kyydillä ja tallennetaan välimuistiin. Ne eivät kuulu buildiin
    (ESILATAUSPOLITIIKKA): iPhone 3,1 Mt ja iPad 4,2 Mt.
  - Ilman verkkoa ikkuna näytetään ilman kehystä.
- **Päivä ja yö:** pallolla ei ole vielä terminaattoria (suunnitelmassa Natiivisepän osuus), joten yöpuolen ikkuna
  näyttää päivän kartan. **Avoin kysymys Natiivisepälle:** onko terminaattori jonossa? Jos ei, Linssiseppä voi tehdä
  väliaikaisen yökuoren linssin omana kerroksena (tumma kuori auringon suunnan mukaan ja 6°:n hämärä).

## 4. Web (Pelikoodari, web on malli)

- Samat kolme tilaa, luvut, napautukset ja ✕. Kehys on sama kuva CSS-kerroksena, ja heijastus on oma kerroksensa.
- **Rata:** webissä rata on nyt havainnollinen 51,6°:n malli.
  - Kyyti toimii sillä sellaisenaan.
  - Todellinen rata vaatii SGP4:n webiin (esim. satellite.js, MIT) ja saman ämpärin TLE:n (data/iss-tle.json).
    Suositus: SGP4 samaan erään, jotta molemmat näyttävät ISS:n samassa paikassa.
- **Kamera:** satelliitti-avaruus.js:n kameran lento; kenttäkulma 80° vain ikkunassa.

## 5. Mittarit ja todennus

- Kuvapari laitteen ruutuna: seuranta ja ikkuna (ilman kehystä | kehyksen kanssa). Kulma ja versio kuvaan.
- Video: kauko → seuranta → ikkuna → ✕.
- Kehysaika iPhonella: ikkunassa laattoja ladataan jatkuvasti, koska maa liikkuu 7,66 km/s. Tavoite on p95 ≤ 20 ms.
  Mitataan ennen kuvaparia.
