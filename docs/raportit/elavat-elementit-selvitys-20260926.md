# Elävät elementit kaupungeissa: selvitys (Linssiseppä 26.9.2026)

*Fablen tilaus klo 10.0x. Johtoajatus: niukkuus ja sulava, elävä animointi. Kaupunkien aiheet vahvistaa
Sisältökirjuri, ja tässä ovat visuaalit. Omistaja hyväksyi listan ja järjestyksen klo 10.0x. AIKA-säännön
mukaan kartassa eletään nykyajassa ja vain estetiikka on vanhaa, joten 1873-tarkistusta ei tehdä. Toteutus alkaa vasta build 20:n jälkeen, yksi elementti kerrallaan
laitteella. Mallit tekee Natiiviseppä löydöksen 160 tyyliin: omat low-poly-mallit, kärkivärit ja paletti
pinta #c8b898, valo #e8d8b8, varjo #887858, aksentit sage #7a9a92 ja terrakotta #b8785e. Piirto tapahtuu
elävällä kerroksella (161-B).*

## Yhteiset säännöt: miksi ei sekava

1. **Yksi liikkuva aihe kaupunkia kohti**, ja ruudulla liikkuu enintään kaksi yhtä aikaa. Muu kartta on staattinen.
2. **Hidas ja jatkuva liike.** Sykli on vähintään 4 s, eikä ole välähdyksiä, hyppyjä tai satunnaisia nykäyksiä. Kaikki
   käynnistyy ja pysähtyy pehmeästi (ease 0,6 s).
3. **Liikkeen amplitudi on pieni.** Liikkuva osa on korkeintaan kolmannes mallista, ja runko on aina paikallaan.
4. **Paletti on hillitty.** Liike ei tuo uutta väriä. Ainoa poikkeus on terrakottan aksentti (pallon kangas, gondolin
   verho).
5. **Näkyvyys:** liike vain maa- ja kaupunkinäkymässä (15–600 km) ja kun malli on ruudulla. Horisonttiusva häivyttää
   kuten 153/159. Vähennetty liike ja virransäästö pysäyttävät kaiken (malli jää paikalleen, 0 kehystä).
6. **Budjetti (Natiivisepän elävän kerroksen luonnos 26.9.):** animoitu kohde ≤ 0,15 ms GPU/kehys iPhonella
   30 fps:llä; erikoismalli ≤ 3 000 kolmiota; eläin ≤ 500 kolmiota ja ≤ 8 yksilöä ruudulla; koko kerros ≤ 0,5 ms.
   Animaatio on kappaleiden kiertoa, kärkivarjostin tai splinellä liikkuvaa. Luurankoa ei käytetä.

## Ideat

| Kaupunki | Mikä liikkuu | Sykli | Malli ja kolmiot | Miksi ei sekava |
|---|---|---|---|---|
| **Amsterdam** (Zaandamin myllyt) | 3 tuulimyllyä; vain siivet pyörivät, eri vaiheissa ja hieman eri nopeuksilla | 1 kierros / 7–9 s | kolme samaa myllyä instansoituna, 3 × 350; siivet ristikkona, ei kangasta | Liike on toistuvaa ja ennustettavaa kuin kellon heiluri, ja rungot pysyvät paikallaan. Ehdotan tätä ensimmäiseksi kokeiluksi (helpoin, testaa kerroksen). |
| **Kööpenhamina** (Tivoli 1843) | karusellin katos ja hevoset pyörivät, ja hevoset nousevat ja laskevat vuorotellen | kierto 10 s, nousu 2,5 s | 1 800 (8 hevosta, kartiokatos, raidat terrakotta ja valo) | Pyöriminen on paikallaan pysyvä kehä, joten liike ei vaella kartalla. |
| **Pariisi** (Giffardin kiinnitetty ilmapallo, Tuileries 1867/1878) | pallo nousee köyden varassa ja laskee, ja kori heiluu hieman tuulessa | 1 nousu + lasku / 24 s, heilunta 5 s | 900 (pallo, verkko, kori, köysi viivana) | Hidas pystyliike. Terrakottainen kangas on kaupungin ainoa värikäs piste. |
| **Venetsia** | 2 gondolia liukuu Canal Grandella vastakkaisiin suuntiin, ja airo keinuu | matka 30 s splinellä, airo 3 s | 2 × 250 | Vesiväylää pitkin kulkeva liike toistaa kaupungin luonnetta. Kun gondolit ovat pieniä ja tummia, ne eivät kilpaile nimien kanssa. |
| **Lontoo** (omistajan idea) | maailmanpyörä pyörii hitaasti hieman kaupunkipisteen sivussa | 1 kierros / 40 s | 2 000 (kehä, pinnat, 16 koria kiertonsa mukaan pystyssä) | Pyörä on suurin elementti, joten se on myös hitain. Sivuun siirrettynä se ei peitä kaupunkipistettä eikä nimeä. |
| **Alpit** (köysirata, Chamonix–Aiguille du Midi) | kaksi hyttiä liukuu vaijeria pitkin vastakkaisiin suuntiin ja kohtaa puolivälissä, ja hytti heilahtaa pysähtyessään | matka 20 s, tauko 6 s | 500 (2 hyttiä, 2 asemaa, vaijeri viivana) | Suora vaijeri laakson yli on selkeämpi kuin rinteen hammasrata, eikä siinä ole savua. Sykli on symmetrinen ja rauhallinen. |
| **Napoli** (Vesuvius, purkaus 1872) | kraaterista nousee hidas savupatsas, joka kaartuu tuulen mukana | jatkuva; pallo 6 s:n välein | 0 kolmiota (Pehmeapiste-läiskät, ≤ 12 kerrallaan) | Savua on vähän ja se on vaaleaa. Liike on hitaampaa kuin mikään muu kartalla. |
| *Myöhemmin: Afrikka* | norsu- tai kamelijono (3–5 eläintä) kävelee savannia pitkin | askel 1,4 s, siirtymä 0,3 pt/s | 5 × 400; jalat kärkivarjostimen heiluntana | Kulkue on niin hidas, että sen huomaa vasta katsoessaan. Kaukaa se näkyy pelkkänä pistejonona. |

## Tekninen toteutus ja työnjako

- **Natiiviseppä:** mallit Blenderissä ja sijoitus maastoon 160:n tapaan, pyörivät osat omina kappaleinaan
  (pivot valmiina). Lisäksi elävän kerroksen rekisteröinti ja mittaus (kolmiot, ms, lämpö 10 min).
- **Linssiseppä:** animaatioiden ajastus ja käyrät (yhteinen käyräkirjasto, ease 0,6 s), polut splineinä
  (gondolit, köysirata, kulkue), savu (ElavatHetket-koodi uudelleenkäytettynä) sekä näkyvyysehdot (ruudulla,
  zoom, vähennetty liike). Äänet vain, jos omistaja haluaa (myllyn narina, höyrypilli), ja silloin samalla
  hiljaisella tasolla kuin elävissä hetkissä.
- **Sisältökirjuri:** kaupunkien aiheet, sekä tarvittaessa kaupungin lehteen yksi rivi siitä, mikä
  kartalla liikkuu.

## Kokeilujärjestys

1) Amsterdamin myllyt, joilla testataan kerros, kierto ja 0 kehystä levossa. 2) Kööpenhaminan karuselli. 3) Pariisin
pallo. 4) Venetsian gondolit (spline). 5) Lontoon maailmanpyörä. 6) Alppien köysirata ja Vesuviuksen savu. Jokaisesta
kuvapari ja lyhyt video (liike) omistajalle sekä kehysmittaus ennen seuraavaa.
