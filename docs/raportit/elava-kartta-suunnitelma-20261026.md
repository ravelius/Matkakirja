# Elävä kartta lähitasoille — suunnitelma (Karttaseppä 26.10.2026)

Omistajan kortti 25.10. klo 14.28 "Elävä kartta mieluummin" (Raamattu 6.9, PR 5231). Omistajan kysymys sanatarkasti:
"Pystyykö meidän karttaa tarkentamaan yhtä lähelle kuin tätä ja onko tästä siihen apua ja miten iso työ olisi tarkentaa lähemmäs.
Ja kannattaisiko nykyistä lähemmillä tarkkuuksilla siirtyä ei esipoltettuun karttaan ja olisiko se mahdollista ja mitä haittaa siitä olisi?"

## Vastaus lyhyesti (omistajalle)

- **Kyllä, yhtä lähelle pääsee.** Nyt lähin näkymä on noin 125 km leveä, esimerkissä noin 8–10 km. Ero on noin 15-kertainen, eli
  tarvitaan viisi tarkkuustasoa lisää.
- **Esimerkistä on apua tietolähteenä, ei tyylinä.** Se käyttää samaa ilmaista avointa karttadataa (OpenFreeMap / OpenMapTiles,
  OpenStreetMapista), jota mekin käyttäisimme. Tyyli tehdään omaksi pergamenttikartaksemme, eikä esimerkin tyyliä kopioida.
- **Lähitasot kannattaa piirtää elävänä.** Viiden lisätason esipoltto koko maailmasta olisi satoja miljoonia kuvia (pelkkä maa-alue), eikä sitä voi
  tehdä eikä ladata. Elävänä laite piirtää vain ne palat, joita pelaaja katsoo, ja muistaa ne seuraavalla kerralla.
- **Haitat:** palan ensimmäinen piirto vaatii verkon (kaupunkien ympäristö voidaan ladata valmiiksi kuten nyt), ja laite tekee
  hieman enemmän työtä tarkentaessa. Piirto on rajattu niin, ettei laite lämpene, eikä levossa piirretä mitään.
  Lisäksi tarvitaan OpenStreetMapin tekijämaininta.
- **Työmäärä:** koeversio Thamesin suulle noin 2 päivää, peliin valmiiksi noin 2 viikkoa.

## Tekniikka Unityssä

1. **Kaukotasot ennallaan.** Esipoltettu pohja Z0–Z9 koko maailmasta ja Z10 kaupunkien ympäriltä pysyy. Lähitasot Z11–Z15 piirretään
   laitteella. Z15:llä iPadin vaakanäyttö on noin 7 km leveä, joka vastaa esimerkkiä.
2. **Sama reitti kuin nyt.** Pallo on Cesium-tileset, jonka pohjakuva haetaan pelin omalta paikalliselta laattapalvelimelta
   (`Laattapalvelin`). Palvelin osaa jo tehdä puuttuvan Z10-palan lennossa Z9:stä (`Vanhemmasta` + `Suurenna`). Samaan kohtaan tulee
   uusi lähde: palan pyyntö Z11–Z15 → vektoridatasta piirretty pala. Siksi pala kulkee samoja jonoja, saa saman paperipatinan
   varjostimessa (`RadioHamara`) eikä vie kolmesta rasteripaikasta yhtään. Pohjakerroksen yläraja nostetaan 10:stä 15:een ja
   lähin zoom (`PalloKierto.lahinLeveys` 60 → noin 4) samassa muutoksessa.
3. **Piirto.** OpenMapTiles-vektoripala (z14 on tarkin taso; z15 piirretään z14:n datasta) puretaan C#:lla ilman uusia
   kirjastoja. Purku on noin 200 riviä, ja Pythonissa se onnistui jo. Alueet kolmioidaan (nykyinen `Jarvikolmiot` laajennetaan
   reikiin), ja viivat piirretään GPU:lla 512 px:n kuvaan. Koodaus JPEG:ksi tehdään taustasäikeessä, ja pala menee levyvälimuistiin.
4. **Ei saumaa.** Elävä pala on läpinäkyvä kerros esipoltetun Z10-vanhemman päällä. Maaston varjostus, maan ja meren sävy sekä
   patina tulevat siis samasta kuvasta kuin nyt, ja päälle piirretään vain tarkka sisältö: rantaviiva ja vesialueet meren
   sävyssä, tiet, rautatiet, rakennukset, kylät ja nimet. Kerros tulee esiin asteittain Z11–Z12 välillä, jolloin rajaa ei näe.
5. **Tyylin siirto pergamenttiin.** Värit tulevat karttapaletista (kerma, seepia, liuske, okra). Muste on seepiaa, ja tiet ovat
   ohuita kaksoisviivoja. Rautatie piirretään poikkiviivoin ja rantaviiva varjoviivoituksella, kuten vanhoissa kartoissa.
   Rakennusten täyttö on okraa. Kylien nimet piirretään kursiivilla pelin omalla fontilla (aluksi palaan, myöhemmin nimikerrokseen).
   Säännöt ovat yhdessä tyylitiedostossa, joten sävyä voi säätää ilman koodimuutosta.
6. **Välimuisti ja lataus.** Vektoripala on noin 30 kt. Sekä vektoripala että piirretty kuva tallennetaan nykyiseen
   levyvälimuistiin samaan karsintaan. Esilataus hakee saapumisalueen ja kohdekaupunkien lähitasot taustajonoon, ja lataus on sama
   kaikilla verkoilla (6.1). OpenFreeMap on ilmainen ja ilman avainta. Jos käyttö kasvaa, Euroopan z11–14 ladataan omaan ämpäriin
   yhtenä PMTiles-tiedostona (avoin muoto), ja koodi vaihtaa vain osoitteen.
7. **Lämpö.** Kehykseen piirretään enintään 2 palaa, ja vain silloin kun pala tulee näkyviin. Levossa ei piirretä. Kuumana raja on
   1 pala ja taustajono seis (6.14). Valmis pala ilmoittaa itsestään `PallonLepo.Valmistui`-kutsulla kuten vektorikerrokset nyt.

## Riskit

- **Sävysauma Z10/Z11.** Tätä torjuu läpinäkyvä kerros vanhemman päällä. Tarkistetaan koekolmikosta.
- **Maaston tarkkuus.** Kohokuvio tulee suurennettuna Z10:stä ja on lähellä pehmeä. Lisätarkkuus DEM-varjostuksesta voidaan tehdä
  myöhemmin samaan palaan.
- **Cesiumin rasterivalinta syvillä tasoilla.** Maastogeometria loppuu Z12:een, joten useampi Z15-pala osuu samaan
  geometriapalaan. `maximumTextureSize` 2048 riittää laskennallisesti, mutta asia mitataan Unity-kokeessa.
- **Ulkoinen palvelu.** Jos OpenFreeMap ei vastaa, käytetään oman ämpärin kopiota tai suurennettua Z10:tä. Pala ei jää tyhjäksi.
- **Nimet palassa kääntyvät pallon mukana.** Ensimmäisessä versiossa tämä hyväksytään, ja pysyvä ratkaisu on nimikerros.

## Vaiheet ja arvio

| Vaihe | Sisältö | Arvio |
|---|---|---|
| 1 koe | Thamesin suu (51,45 / 0,64) kolmikkona **esimerkki \| nyt \| koe**. Koe piirretään Unityn ulkopuolella samalla piirtosäännöllä (Python + oma vektoripurku), Z10-pohja alla. Ei vaadi L1:tä. | 1–2 pv |
| 2 Unity | Laattapalvelimen lähde Z11–Z15, C#-purku ja -piirto, välimuisti, lähin zoom. Simukuvapari Thamesin suulta, kun L1 on vapaa. | 3–4 pv |
| 3 tyyli | Nimet, rautatiet, rantaviivoitus, häivytys Z11–Z12, PT:n ja omistajan kommentit | 3–5 pv |
| 4 kestävyys | Esilataus, lämpörajat, tekijämaininta Tietoja-sivulle, automaattiset testit (purku, kolmiointi, palan raja) | 2 pv |
