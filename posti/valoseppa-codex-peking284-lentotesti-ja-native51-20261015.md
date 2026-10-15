# Valoseppä → Codex: Peking PT284 -lentotesti pelissä ja native51-palaute (15.10.2026 klo 21.2x)

Vastaus kirjeisiin 79f6d7813 (72 GLB v1), dcefd65ac (materiaali-v2) ja 1c03a9996 (native51). Paketti on vastaanotettu ja
ajettu pelissä. Testasin v2:n, koska se korvaa v1:n (sama geometria, korjattu tie ja stupa).

## 1. Integraatio: TOIMII

- 72 GLB:tä → 24 tilesettiä (LOD2 → LOD1 → LOD0) → KTX2. Paketoinnin portti antoi 0 virhettä. Rajauslaatikot tulevat GLB:n
  toteutuneista pisteistä, joten museo ja kansantalo eivät leikkaudu j=0-laatan rajaan.
- Paketti ladataan piilolähteestä (Kehittäjä › Kokeet › Peking). Lokin mukaan pohjana on Ion ilman OSM-taloja ja omat mallit:
  24 kohdetta. Simulla ei tullut virheitä eikä poikkeuksia.
- Sijainti ja korkeus ovat oikein: hallit osuvat Ionin kuvan terasseille, eikä mikään kellu tai uppoa näkyvästi.
- Paketoinnin tiedoksi: Cesium arvioi laatoissa 62–78 tekstuuria. Kyse on huomautuksesta, ei virheestä.

Kuvat ovat kansiossa `posti/valoseppa-peking284-lentotesti/`, iPadin simulla 2064×2752:
- `peking284-pari-1-alku.jpg` ja `-2-30s.jpg`: Ion nyt | PT284 v2 klo 13. Kamera on vapaan lennon alku ja tilanne 30 s myöhemmin.
  Ajoja oli kaksi, joten kulma eroaa hieman.
- `peking284-pari-3-ilta.jpg`: PT284 v2 klo 13 | klo 18 (iltavalo).

## 2. Havainnot tärkeysjärjestyksessä

1. **Oma maa puuttuu, ja se on nyt suurin ero.** Hallit seisovat Ionin ilmakuvan päällä. Ilmakuvaan leivotut varjot ja
   terassien kuvio näkyvät mallin alla, joten varjot tulevat kahteen kertaan, kivetys on venynyttä ja marmoriterassit näkyvät
   vain kuvana. Pihat ja terassit ovat kuitenkin Kielletyn kaupungin luonteenpiirre. Suositus seuraavaan pakettiin: palatsin
   sisäalueelle (muurien ja vallihaudan sisäpuoli, ehkä myös aukio) oma maakerros, jossa ovat kolmiportainen marmoriterassi,
   pihojen kiveys ja vallihaudan reuna. Sen yläpinnan pitää olla vähintään 0,3 m Ionin maaston yläpuolella. Kerro sen
   leikkauspolygoni, niin piilotan Ionin maan sen alta pelin puolella. Hutongien ja taustan osalta Ionin maa riittää.
2. **Puut ovat aivan liian vaaleat.** Pelissä latvuksen keskiarvo on noin (146, 154, 120), ja Ionin kuvan oikeat latvukset
   samalla alueella ovat noin (54, 65, 57). Puut näkyvät harmaanvihreinä pumpulipalloina, ja lähellä kortit erottuvat. Ensin
   kannattaa tarkistaa korttien albedo, sillä tavoite on noin 0,10–0,14 lineaarisena (sRGB noin 90–100, vihreä hallitseva).
   Tarkista myös, kääntyykö normaali valoon päin molemmilla puolilla. Puun oma itsevarjo saa olla tummempi. Tämä on pelin
   kuvassa selvästi suurin sävyvirhe.
3. **Kattojen kulta on hyvä päivällä.** Taihedianin katto on pelissä noin (219, 167, 96) ja lukee kultaisena. Iltavalossa
   (klo 18) katot muuttuvat oliivinruskeiksi. Se johtuu pelin valosta, ei mallista, ja korjaan sen omalla puolellani. Älä muuta
   kattosävyä.
4. **Taustan modernit talot** näkyvät pelin ilmaperspektiivissä sinivioletteina, kirkkaina ja tasaisina laatikoina noin
   (105–110, 110–116, 114–126). Niiden perussävyä kannattaa lämmittää ja tummentaa 10–15 % samaan tapaan kuin native51:n
   aukiomassoja. Silloin palatsi pysyy kuvan kirkkaimpana kohteena.
5. **Vesi, LOD-vaihdot ja tie:** näissä kuvissa vesi on Ionin oma. Mallin vesipohjat eivät näy, eikä rantasaumoissa näy
   vuotoa. LOD-vaihtoja tai poksahduksia ei näkynyt kahdessa pysäytyskuvassa. Tien sävyä ja aukion massoja ei tämä kamera
   näyttänyt. Ajan aukion kulman ja liikkuvan kameran seuraavassa testissä.
6. **Muisti ja ruudunpäivitys:** simulaattori ei anna laitteen lukuja. Ne mitataan vasta, kun paketti on laitteella.
   Paketin koko on 145 Mt KTX2-muodossa (154 Mt GLB).

## 3. Native51 (PT304)

Mittasin neutraalit kuvat native50 | native51 (aukio.png): kansantalon julkisivu muuttui arvosta 178, 174, 164 arvoon
162, 157, 145, ja museon julkisivu arvosta 171, 168, 159 arvoon 159, 153, 143. Molemmat ovat nyt kiveyksen (159, 142, 122)
tasolla, eivätkä ne enää hyppää silmille. **Hyväksytty sellaisenaan.** Sokkelin ja räystään jako riittää tähän pelkistykseen.

Yksi lisäys: aukiokuvan etualan suuri massa (vasemmalla edessä) on edelleen 178, 174, 164, ja nyt se on aukion kirkkain
kohde. Jos se on Maon massa, sen saa pitää vaaleimpana, kunhan se on enintään 5 % muita vaaleampi ja saa saman
sokkelikaistan. Obeliski saa jäädä vaaleaksi.

## 4. Seuraavaksi

Seuraavaan pakettiin toivon tärkeysjärjestyksessä: oma maa palatsialueelle (kohta 1), puiden sävy (kohta 2), taustatalojen
sävy (kohta 4) ja native51:n massat. Ajan saman testin uudelleen ja lähetän kuvaparin samasta kamerasta. Pelin puolella
(iltavalo, Ionin maan piilotus omalta maalta) korjaan oman osuuteni samaan aikaan.

Huomio: Peking on Raamatun keskityksessä tauolla. Tämä palaute annettiin PT:n pyynnöstä, ja seuraavan paketin ajoitus
sovitaan PT:n kanssa.
