# Astronautin kamera: ISS:n kyyti (Linssisepän suositus 28.9.2026)

**Toteutus:** proto-haara `linssiseppa/iss-kyyti` **e0ad2b73** (astro-selaimen 74f21d92 päällä). Linssit-testit 361/361 (uusi
IssKyytiTestit 10), unity-tarkistus 0 virhettä. Pelikoodari kuittasi 07.1x luvut sellaisinaan webiin. Natiiviseppä kuittasi
kenttäkulman (oma arvo tallennetaan ja palautetaan kaikilla poistumisteillä, liu'utetaan) ja antoi yökuoren linssin
omaksi kerrokseksi.

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
- **Päivä ja yö:** pallolla ei ole terminaattoria, eikä se ole Natiivisepän jonossa (kuittaus 28.9.). Siksi kyydissä on
  väliaikainen yökuori linssin omana kerroksena (Yokuori):
  - kuori on pilvien yllä (1,012 × säde) ja tumma yöpuolella auringon suunnan mukaan
  - hämäräkaista on aurinko −6° … +2°
  - kuori näkyy vain kyydissä, ja kaukonäkymä pysyy webin kaltaisena
  - A/B: `astro kyyti yo 0|1`.
- **ISS-malli** (IssMalli, 176 kolmiota, oma CC0):
  - ristikko 100 m ja neljä paria kullanruskeita siipiä 12 × 35 m
  - valkoinen moduulijono lentosuunnassa ja radiaattorit
  - näkyy 90 pt leveänä, ja Z-akseli on maajäljen suuntaan.
- **Testikomennot:** `astro kyyti` (napautus), `astro kyyti pois`, `astro kyyti tila` ja `ui linssi kehys 0|1`.
- **Ajoskripti:** `proto-3d/tyokalut/linssiseppa-ajot/ajo-iss-kyyti.sh`, joka tuottaa kuvat ja videon.

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

## 6. Cupola-erä (omistajan palaute 28.9. klo 09.3x, Fablen päätökset)

Omistaja: Cupola on hyvä, mutta tummemmaksi ja näkyvä valonlähde, jonka valo muuttaa sisäpintaa; horisontissa liikaa
sinistä (musta avaruus); lasi aidommaksi pienine reunavirheineen; osa asemaa ikkunan taakse kerroksellisuudeksi. Omistaja
valitsi kehyksen (ei ilman). Natiivi: proto `linssiseppa/iss-kyyti` (SHA ja laitekuvat alla, kun kuvapari on valmis).

**Kehys 3D-kerroksena omalla varjostimella** (UI Toolkit ei valaise kuvaa): koko ruudun neliö kameran edessä
(CupolaKerros + Cupola.shader), kolme kerrosta takaa eteen:
1. **Ulkona:** Canadarm2 (olkapuomi, kyynärnivel, kyynärvarsi ja tarttuja; sylinterivarjostus ja eristeen saumat) ja
   aurinkopaneelin kulma oikeassa yläikkunassa perspektiivissä (reunat suppenevat, kennot tihenevät kauempana,
   kullanruskea sävy, ohuet raot ja saumat, hopeinen reunus, kiilto auringon suunnasta, harmaa masto). Kun ISS on maan
   varjossa, vain maavalo alhaalta. Raot ja saumat reunanpehmennetään pikselin leveydestä, jottei ruudukko muutu
   pistekuvioksi.
2. **Lasi:** vihertävä sävy (peitto 0,09), heijastuskuva huojuu 0,4 % ruudusta noin 11 s:n jaksolla, reunojen sameus ja
   valon siroaminen lasin reunassa, tahrat, pöly ja lyhyet hiusviivanaarmut satunnaisissa suunnissa (noin joka viides
   6 %:n ruutu). Nämä syttyvät vain valossa.
3. **Kehys:** Codexin kehyskuva tummennettuna (0,42) ja valaistuna:
   - aurinkotäplä ikkunoista auringon suunnasta (siirtyy radan mukana)
   - sinertävä maavalo ikkunoiden läheltä, vaihtelee hitaasti kuin pilvet ohittaisivat
   - kaksi kapeaa lämmintä LED-valonauhaa sivuilla hehkuineen (näkyvä valonlähde; pallomainen hehku ylivalottui)
   - pinnan kohokuvio kehyskuvan kirkkaus- ja alfagradientista.

**Valo** (CupolanValo, testit): auringon suunta kameraan nähden, ISS:n varjo (sylinteri) ja maavalo.

**Ilmakehä ja taivas kyydissä:**
- Kaukonäkymän 1,25 R -hehku häipyy (kamera oli sen sisällä, joten koko taivas sinersi).
- Tilalle ohut analyyttinen kaari R + 120 km: kirkkaus exp(−h/22 km), sävy vaaleasta (0,72; 0,88; 1) syvään siniseen
  (0,12; 0,30; 0,86), kirkkaus auringon mukaan sivuamispisteessä (yöllä 0,06). Maan päällä hento vaalea usva ilmamatkan
  mukaan (katto 0,42). Yläpuolella musta avaruus (#04060e). Siirtymä 0,8 s.
- Tähdet 0,3 (päivävalo), rata piiloon koko kyydin ajaksi ja pilvet noin 8 km:iin (kaukonäkymän 64 km:n kuoren reuna
  nousi horisontin yläpuolelle ja vaalensi sen).

**Omistajan päätös 28.9. klo 11.0x** (Fablen kautta, sanatarkasti): "Pyydä Codexilta vain uusi kuva tuosta
kupolasta. Se tulee paremman näköiseksi, kun Codex itse tuottaa oikeanlaisen kuvan valoineen ja varjoineen, ja se saisi
olla tummempi kuin mikä tuo nykyinen on. Ja pyydä siltä myös nuo kupolan ulkopuolella olevat ISS-elementit, ja ne
saisivat melkein olla vain mustia varjokuvia. Näin maa hehkuisi paremmin ja kupolan sisätilakin olisi enemmän tumma kuin
vaalea. Ja lisää noihin vihreällä näkyviin nopeustietoihin sana "live" tai joku vastaava, että käyttäjä tajuaa, että ISS
on oikeastikin juuri tuolla kohtaa menossa tällä hetkellä."

- **Codex-tilaus** (postilaatikko `posti/linssiseppa-codexille-cupola-20260928.md`, 1ac968bc9):
  - uusi kehys tummana sisätilana valoineen ja varjoineen (keskikirkkaus 35–55/255, nyt 124–138)
  - aukot täsmälleen nykyisessä geometriassa ja uusi heijastus
  - ISS:n ulko-osat lähes mustina siluetteina omana kerroksenaan (parallaksi enintään 1,5 %)
  - ämpäriin `karttanostot/20260928/iss-cupola2-*`
- **Natiivi:** kuvat kytketään kolmena kerroksena (ulko-osat, kehys, heijastus) Codexin toimituksen jälkeen. Yllä kuvattu
  3D-kehys jää varalle.
- **LIVE** (natiivi 853259ec): "● LIVE · ISS · 436 km · 27 530 km/h".
  - Punainen piste rgb(255, 86, 86), 7 pt, sykkii: peitto 1 ↔ 0,25, 0,9 s ease-in-out. Vähennetty liike: paikallaan.
  - LIVE lihavoituna pillerin vihreällä (93, 255, 168), väli 5 pt.
  - Ilman tuoretta TLE:tä ei LIVE-merkkiä, vaan loppuun "· rata-arvio" kuten ennen.

**Web (Pelikoodari):**
- Cupola: Codexin uudet kuvat kolmena CSS-kerroksena samassa järjestyksessä kuin natiivissa (ulko-osat, kehys, heijastus;
  cover). Varjostinta ei tarvita.
- Ilmakehän kaari: sama analyyttinen kuori (R + 120 km, exp(−h/22 km)); kaukonäkymän hehku häivytetään kyydissä.
- Tähdet 0,3, rata piiloon ja pilvet matalalle kyydin ajaksi.
- LIVE-merkki samoin luvuin.
