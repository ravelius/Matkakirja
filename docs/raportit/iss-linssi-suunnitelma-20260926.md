# ISS-linssi (avaruuslinssi) todellisella radalla: suunnitelma (Linssiseppä 26.9.2026)

*Omistajan tarkennus klo 14.4x Fablen kautta. Vain natiivi. Toteutus vasta build 22:n ja myllyjen jälkeen, ja omistaja
kuittaa kortista. Tässä ei ole koodia.*

**Näkymä.** Maapallo nykyisellä topografiakartalla (natiivin topografiapohja, kuten radiolinssissä) ja efektit.
ISS on siellä, missä se on juuri nyt, ja liikkuu todellisella vauhdilla (7,66 km/s, kierros noin 92 min).

## Data

- **Rata:** CelesTrak GP -data (NORAD 25544, julkinen). Actions hakee TLE:n 6 tunnin välein ämpäriin
  (`media.matkakirja.app/data/iss-tle.json`), joten pelaajat eivät kuormita CelesTrakia. Sovellus hakee sen linssin
  avautuessa ja tallentaa levylle. Jokaiseen buildiin paketoidaan viennin hetken TLE, joten jotain on aina.
- **Laskenta:** SGP4 puhtaana C#:na ytimessä (Linssit/Ydin/Iss/Sgp4.cs). Pohjana on joko oma käännös Vallado 2006
  -viitetoteutuksesta, jonka testivektorit tulevat artikkelista, tai MIT-lisensoitu SGP.NET. Valinta tehdään
  toteutusvaiheessa. Tarkkuus on noin 1 km epookin kohdalla ja 1–3 km/vrk sen jälkeen.
- **Aurinko:** alihajapiste UTC-kellosta (Meeus, noin 0,01°) → Natiivisepän Aurinko-rajapinta (suunta ja korkeus).
  Verkkoa ei tarvita.

## Kamera (kolme tilaa, vaihto yhdellä napautuksella)

1. **Kaukonäkymä (oletus):** koko pallo. ISS-merkki, edellinen kierros haalistuvana kynänjälkenä ja seuraava
   katkoviivana (Kynäviiva-varjostin, kuten kuljettu reitti).
2. **Seuranta:** kamera ISS:n takana ja yllä (noin 1 200 km). Maa liukuu todellisella nopeudella, ja kamera-ajot
   tehdään yhteisellä käyräkirjastolla.
3. **Ikkuna (Cupola, omistaja 14.5x, sitova):** realistinen näkymä ISS:n korkeudelta, ei koko palloa.
   - Kamera on ISS:n todellisessa paikassa ja korkeudessa (SGP4:n korkeus, noin 420 km) ja katsoo radan suuntaan.
   - Horisontti on noin 2 350 km:n päässä ja 20,3° vaakatason alapuolella. Maa täyttää 139° näkökentästä (kulmasäde
     69,7°), joten kaarevuus näkyy loivana kaarena ruudun yläosassa.
   - Ilmakehän kaari on ohut: noin 100 km:n sininen kaista horisontin yllä (Ilmakeha-varjostin ohuena kuorena) ja
     musta avaruus sen yläpuolella.
   - Kenttäkulma on Cupolan keskilasin mukainen. Lasin halkaisija on 80 cm ja silmä noin 45 cm:n päässä, joten
     pystykenttä on noin 80° (iPhone pystyssä) ja vaakakenttä lasin mukaan. Kamera kallistuu 55° alaspäin, joten
     horisontti asettuu ruudun ylimpään neljännekseen.
   - Maa liukuu todellisella nopeudella: 7,66 km/s maan pinnalla on noin 1°/s näkymässä. Pienet ISS:n asennon
     heilahdukset jätetään pois.
   - Etualalla Cupola-kehys rekvisiittana (Kuvaputken tekstuurit, ks. tilaus alla): keskimmäinen pyöreä lasi ja sen
     ympärillä kuuden trapetsilasin pokat ja tuet. Maa näkyy lasien läpi. Lasissa on kevyt heijastus omana
     kerroksenaan, ja se liikkuu hitaasti 0,5°:n heilunnalla. Kehys on UI-kerros (Natiivi-UI) tai kameran
     lähitaso (Linssiseppä), ja valinta tehdään mittauksen perusteella.
   - Yöpuolella näkyvät kaupunkien valot, ja päiväpuolella pilvet ja topografia.

## Efektit

- **Päivä ja yö oikein:** terminaattori pallon varjostimessa ja 6°:n pehmeä hämäräkaista (Natiiviseppä). Yöpuolelle
  Black Marble -valot emissiivisenä kerroksena (Z0–Z6 on valmiina, Karttaseppä).
- **ISS maan varjossa:** merkki himmenee varjon mukaan, ja radalla nähdään noin 16 auringonnousua vuorokaudessa.
  Nousuhetkellä merkissä näkyy pieni välähdys.
- **Pilvet:** aluksi nykyinen Pilvikuori (Blue Marble -pilvet, PD). Myöhemmin päivän pilvet NASA GIBS
  -päiväkuvasta johdettuna maskina Actionsissa (vaatii erillisen selvityksen).
- **Omat ideat (vapaat kädet):**
  - "Seuraava ylilento": milloin ISS kulkee pelaajan kaupungin yli ja näkyykö se paljaalla silmällä (ISS
    auringossa ja taivas pimeä). Kortti Natiivi-UI:lta.
  - Maajälki kaupunkien kohdalla: "ISS ylitti juuri Ateenan".
  - Revontulet: NOAA SWPC:n OVATION-soikio, julkinen data. Myöhemmin, jos se on kevyt.

## Kehysbudjetti (iPhone)

- SGP4 yhdelle satelliitille kerran kehyksessä vie alle 0,05 ms. Rata (2 × 240 pistettä) lasketaan uudelleen
  10 s:n välein.
- Terminaattori ja yövalot vievät noin 0,2 ms pallon varjostimessa.
- Linssin lisäkuorma on yhteensä ≤ 1,5 ms, ja liikkeessä pidetään 60 fps.
- **Kaukonäkymässä** ISS liikkuu noin 4°/min, joten merkki ja rata piirretään elävällä kerroksella 10 fps:llä, eikä
  koko palloa tarvitse piirtää. Seuranta ja ikkuna piirretään täydellä taajuudella.
- Lämpösäännöt (serious/critical) laskevat taajuutta tavalliseen tapaan.

## Kun verkkoa ei ole

| TLE:n ikä | Toiminta |
|---|---|
| ≤ 7 vrk | täysi tarkkuus |
| 7–30 vrk | SGP4, pieni merkintä "rata-arvio N päivän takaa" |
| > 30 vrk tai ei TLE:tä | havainnollinen rata (nykyinen 51,6°:n malli oikealla 92 min:n vauhdilla), merkintä "ISS:n rata (arvio)" |

Aurinko ja terminaattori ovat aina oikein, koska ne tarvitsevat vain kellon.

## Mitä 1873-estetiikasta säilyy

- Maapallo on nykyaikainen (omistaja).
- Kaikki tieto piirretään isoisän tyylillä:
  - rata musteena kynänjälkenä
  - ISS kaiverrustyylisenä siluettina (löydöksen 160 paletti)
  - tietokortit paperilla ja käsialafontilla
  - kompassiruusu kaukonäkymän kulmassa
  - aikaleima "26.9.2026 klo 14.47 UTC+3" samassa kortissa kuin matkakirjan päiväys

## Kuvaputken tilaus: Cupola-kehys (Sisältökirjuri välittää Codex-postiin)

- **Aihe:** ISS:n Cupola-näköalamoduulin sisäpuoli etualan kehyksenä, jonka lasiaukot ovat läpinäkyviä.
  Todenmukainen, ei 1873-tyyliä: vaalea alumiini, harmaat pokat, pultit, luukkujen saranat ja tuet.
  Ei tekstejä eikä logoja.
- **Viitekuvat:** NASA Image and Video Library, haku "Cupola window" / "Cupola interior" (NASAn kuvat ovat PD NASAn
  mediaohjeiden mukaan). Viitekuvien osoitteet ja kuvatunnukset kirjataan lahde-kenttään.
- **Toimitus, läpinäkyvä PNG (RGBA, suora alfa), kaksi kokoa kustakin:**
  1. `cupola-keski.png`: keskilasin pyöreä kehys (aukon halkaisija 72 % leveydestä, aukko täysin läpinäkyvä),
     2048 × 2048 ja 1024 × 1024.
  2. `cupola-kokonainen.png`: keskilasi ja kuusi trapetsilasia pokineen pystynäkymään, 1536 × 2732 (iPad) ja
     1206 × 2622 (iPhone). Lasiaukot ovat läpinäkyviä, ja kehyksen reunat ulottuvat ruudun reunoihin.
  3. `cupola-heijastus.png`: lasin heijastus omana kerroksenaan (valkoinen tai sininen, alfa 5–12 %), samat koot kuin
     kohdassa 2.
- **Valaistus:** neutraali ja pehmeä ylhäältä sisätilan valona. Kehyksen reunat ovat hieman tummat, jotta maa on kuvan
  kirkkain osa.
- **Hyväksyntä:** Linssiseppä sovittaa kehyksen simulaattorissa, ja omistaja hyväksyy kuvaparin (ikkuna ilman kehystä
  ja kehyksen kanssa).

## Astronautin kamera: jatkoideat ISS-linssin jälkeen (omistaja 15.5x)

Omistaja hyväksyi nämä jonoon ISS-linssin jälkeen. Koodia ei tehdä ennen ISS-kaukonäkymää.
1. **ISS-kytkentä:** kun todellinen ISS on havaintopisteen yllä (etäisyys ≤ 600 km radan maajäljestä), pisteestä
   tulee korostettu ja kortti "Astronautti näki tämän juuri tästä". Napautus avaa kuvan.
2. **Arvaa kohde:** Pulu näyttää astronautin kuvan, pelaaja napauttaa palloa, ja pisteet tulevat etäisyydestä samalla
   kaavalla kuin Lippuarvauksessa. Kierroksessa on 5 kuvaa.
3. **Aikasarjat:** sama kohde eri vuosina (esim. Aralmeri, Dubain rannikko), ja aikaselaimen liuku vaihtaa kuvan
   pehmeällä ristihäivytyksellä.
4. **Kamera-ajo kuvan kuvakulmaan:** pallo kääntyy ISS:n kuvauspisteeseen kuvan metatiedoista (nadir-piste,
   kallistus ja kenttäkulma polttovälistä). Kuva häivyttyy pallon päälle samaan kohtaan ja sitten täysikokoiseksi.
   Ajossa käytetään yhteistä käyräkirjastoa.
- **Työnjako:** Linssiseppä tekee natiivin osuuden, Pelikoodari webin osuuden (kohdat 2–3), ja Sisältökirjuri kuratoi
  noin 100 uutta kohdetta erissä, metatiedot mukaan lukien (NASA Gateway to Astronaut Photography, PD).

## Työnjako

- Linssiseppä: SGP4-ydin testeineen, kamerat, rata, varjo, ylilennot.
- Natiiviseppä: terminaattori ja yövalot pallon varjostimessa sekä Aurinko-suunta.
- Siirtoseppä: TLE Actionsista ämpäriin ja buildiin.
- Natiivi-UI: tietokortti ja tilanvaihto.

Järjestys: SGP4 ja kaukonäkymä (kuvapari) → terminaattori ja valot → seuranta ja ikkuna (video) → ylilento.
