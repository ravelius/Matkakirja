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
3. **Ikkuna:** Cupolan näkymä noin 420 km:stä, 20° eteenpäin viistossa. Horisontissa ilmakehän kaari
   (Ilmakeha-varjostin) ja yöpuolella kaupunkien valot.

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

## Työnjako

- Linssiseppä: SGP4-ydin testeineen, kamerat, rata, varjo, ylilennot.
- Natiiviseppä: terminaattori ja yövalot pallon varjostimessa sekä Aurinko-suunta.
- Siirtoseppä: TLE Actionsista ämpäriin ja buildiin.
- Natiivi-UI: tietokortti ja tilanvaihto.

Järjestys: SGP4 ja kaukonäkymä (kuvapari) → terminaattori ja valot → seuranta ja ikkuna (video) → ylilento.
