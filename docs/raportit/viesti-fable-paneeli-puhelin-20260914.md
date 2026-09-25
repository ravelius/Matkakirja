# Viesti Fablelle: maapaneeli saapumisnäkymän mukaan joka laitteella

Opus-työagentti, 14.9.2026. Haara
`claude/bold-ride-vow4ki-paneeli-puhelin` (main v1898).
Ei versionostoa, ei Raamattua, ei ankkurimuutosta.

## 1. Mitä tehtiin

Maapaneeli mitoitettiin samalla periaatteella kuin nimikyltit v1885:ssä:
vertailu on **kunkin laitteen oma saapumisnäkymä**
(`lauta.saapumisenSkaala`, css-px per lautayksikkö uloimmalla sallitulla
zoomilla), ei laitetunnistus eikä ruutuun ankkurointi.

- `js/pallolauta/maapaneeli.js`: uusi vakio
  `MAAPANEELIN_KATTO_RUUDUSTA = 0.095` ja `paneelinMitat`in kolmas raja

      perusta ≤ KATTO_RUUDUSTA × kotelon leveys / (LEVEYS_PX × vertailuskaala)

  Kaksi vanhaa rajaa (maan laatikon leveys- ja korkeusosuus) ovat
  ennallaan; tiukin voittaa. Kortin ruutuleveys saapumisessa on tasan
  `LEVEYS_PX × perusta × vertailuskaala`, joten yksi jako riittää.
- `js/pallolauta/lauta.js`: paneelikerros saa `saapumisnakyma()`n
  (vertailuskaala + kotelon leveys), ja `tahdistaZoomirajat` kutsuu
  `maapaneeli.tahdistaKoko()` — vertailu on tiedossa vasta kun maan
  laatikko on luettu ja rajat tahdistettu.
- **Karttasidonta säilyy (PÄÄTÖKSET 9).** Katto sitoo vain `perusta`n
  eli paneelin LAUTAMITAN; siitä eteenpäin kortti skaalautuu kartan
  mukana kuten ennen. Mitattu: `skaala × korkeus` on vakio kolmella
  zoomitasolla (hajonta 0 %), ja paneelin leipätekstin suhde noston
  kylttiin on vakio zoomeilla (v1885:n vartio, ks. taulukko).
- Katto on 9,5 % eikä 10 %: saapumiskorkeus heilahtaa ajosta toiseen
  muutaman prosentin, ja savukkeen väite mittaa tasan 10 %:n kattoa.
- Saapumisrajauksen laatikko (`paneelinLaatikko`) lasketaan yhä
  KATTAMATTOMASTA paneelikoosta. Se on turvallinen suunta (laatikko on
  korkeintaan liian iso, ei liian pieni), ja se katkaisee takaisinkytkennän
  "paneeli pienenee → laatikko pienenee → vertailu muuttuu".

## 2. Mittaustaulukko (Chromium, dpr 1, Ranska, pelaaja Pariisissa)

Kortin `getBoundingClientRect().width` saapumisnäkymässä ja yhden
zoomiportaan (korkeus × 0,5) sisempänä. Kotelo = karttaruutu, ei ikkuna.

| ruutu | kotelo | saapumisenSkaala | ENNEN kortti | NYT kortti | osuus | +1 zoomi | leipäteksti | suhde nostokylttiin (zoom 1 / 0,5 / 0,25) |
|---|---|---|---|---|---|---|---|---|
| 390 × 844 | 374 × 775 | 2,336 | 81,1 px (21,7 %) | **35,5 px** | **9,51 %** | 71,1 px | 1,62 px | 0,1909 / 0,1909 / 0,1907 |
| 393 × 852 | 377 × 783 | 2,360 | 81,9 px (21,8 %) | **35,8 px** | **9,51 %** | 71,6 px | 1,64 px | 0,1925 / 0,1924 / 0,1928 |
| 844 × 390 | 823 × 369 | 1,112 | 38,6 px | 38,6 px | 4,69 % | 77,2 px | 1,76 px | 0,2075 / 0,2075 / 0,2074 |
| 1400 × 900 | 1379 × 821 | 2,474 | 85,9 px | 85,9 px | 6,23 % | 171,8 px | 3,92 px | 0,4617 / 0,4616 / 0,4615 |
| 2560 × 1352 | 2539 × 1273 | 3,836 | 133,2 px | 133,2 px | 5,25 % | 266,4 px | 6,08 px | 0,7158 / 0,7157 / 0,7156 |

Katto sitoo siis VAIN pystypuhelimella; vaakapuhelimella, työpöydällä ja
isolla ruudulla maan laatikon osuus on yhä tiukempi eikä mikään muutu
(luvut pikselilleen entiset). Suhde nostokylttiin on vakio zoomeilla
joka laitteella — v1885:n vartio pitää.

**Kirjattava sivuvaikutus:** puhelimen leipäteksti kutistuu 3,70 px →
1,62 px. Se on seuraus siitä, mitä omistaja pyysi (paneeli ≤ 10 %
ruudusta) eikä oma päätös: PÄÄTÖKSET 7 kieltää fonttikoon alarajan ja
sisällön tiivistämisen. Jos teksti halutaan luettavaksi pystypuhelimella,
se on sisällön karsimista tai paneelin omaa mitoitusta — ei tämän katon
asia.

## 3. Näkyvyys puhelimella saapuessa — MITATTU

Biskajanlahden ankkuri on pystypuhelimella saapumisnäkymässä **ruudun
ulkopuolella länteen**, sekä ennen että jälkeen tämän erän:

| tilanne | kortti x | ruutu | näkyvissä |
|---|---|---|---|
| 390 × 844, saapuminen (ennen) | −221,3 … −140,2 | 0 … 374 | ei lainkaan |
| 390 × 844, saapuminen (nyt) | −198,5 … −163,0 | 0 … 374 | ei lainkaan |
| 393 × 852, saapuminen (nyt) | −200,9 … −165,1 | 0 … 377 | ei lainkaan |
| 390 × 844, panorointi länsirajalle (saapumiszoomi) | −13,1 … 22,4 | 0 … 374 | osittain (63 % kortista) |
| 390 × 844, panorointi länsirajalle, zoom 0,5 | −5,7 … 65,3 | 0 … 374 | osittain (92 % kortista) |

Kuvat: `docs/raportit/kuvat/paneeli-saapuminen-20260914-puhelin.jpg`
(paneelia ei näy), `…-tyopoyta.jpg` (näkyy Biskajanlahdella) ja
`paneeli-panorointi-20260914-puhelin.jpg` (länsirajalla kortti on
vasemmassa laidassa ja leikkautuu).

Havainto: panorointiraja (maan laatikko × 1,3) ei riitä tuomaan korttia
KOKONAAN ruudulle pystypuhelimella — se jää saapumiszoomilla 13 px ja
yhden zoomiportaan sisempänäkin 6 px ruudun laidan yli.

**Kaksi vaihtoehtoa omistajalle (ei toteutettu kumpaakaan):**

- **(a) Puhelimelle oma ankkuri.** Paneeli Välimerelle / Lyoninlahden
  päälle Ranskan eteläreunan alle, esim. 42,4 N / 4,3 E: pystyruudulla
  saapumisnäkymä on korkeuteen sovitettu, joten maan etelä–pohjois-suunta
  on kokonaan ruudulla ja eteläpuoli osuu ruudun sisään. Hinta: paneelin
  paikka riippuisi laitteesta (kaksi ankkuria samalle maalle), ja
  Lyoninlahti on ahtaampi kuin Biskajanlahti — kortin mahtuminen merelle
  olisi mitattava uudestaan (savukkeen väite 2).
- **(b) Pysyy Biskajalla.** Paneeli on puhelimella saapuessa ruudun
  ulkopuolella ja tulee esiin panoroimalla länteen — mutta mittauksen
  mukaan vain osittain. Hinta: pystypuhelimen pelaaja ei näe maan
  perustietoja ilman panorointia eikä kokonaan silloinkaan; etu:
  yksi ankkuri per maa, kartta pysyy siistinä ja Ranska keskellä.

Kumpikin vaatii omistajan sanan (PÄÄTÖKSET 9 kohta 1: Ranska on pilotti).

## 4. Savuke ja vastakokeet

`tools/savukkeet/savuke-era12.mjs`: **19/19** (ennen 17/19).

- Väite 6 (leveys ≤ 10 % saapumisessa) on nyt vihreä: 390 px 9,51 %,
  1400 px 6,23 %.
- **Vastakoe G korjattu.** Koukku `korkeuteenSovitus → null` oli erässä
  14 kirjoitettu kirjaimelle `E`, joten G ajoi täysin normaalilla
  koodilla ja oli siksi punainen. Nyt G ajaa oikealla muutoksella:
  sitova akseli vaihtuu X:ksi ja pystyyn jää mitattu 57,1 % tyhjää →
  korkeussovitusväite kaatuu.
- **Vastakoe E uusittu** juuri tämän erän falsifioinniksi:
  `MAAPANEELIN_KATTO_RUUDUSTA → 10` (katto pois) → 390 px 21,71 % →
  leveysväite kaatuu. Vanha muoto (TEKSTIKERROIN 1) ei enää kaataisi
  väitettä siitä syystä, jota väite mittaa — uusi katto leikkaisi
  paneelin kymmenesosaan kertoimesta riippumatta.
- **Vastakokeet B ja C piti sovittaa uuteen kokoon**, muuten ne olisivat
  jääneet mittaamatta mitään (molemmat mitattu punaisiksi vasta
  korjauksen jälkeen):
  - B (ankkuri eteläreunaan) purkaa nyt myös katon — pieni kortti mahtui
    Ranskan eteläreunallakin merelle (osumia 0), iso osuu Espanjaan (3).
  - C (skaalakatto kesken pelialueen) käyttää lukua 0,5 entisen
    `3 × TEKSTIKERROIN` sijaan: ruutuskaala on kutistunut kahdesti
    (erän 13 kerroin ja tämän erän katto), ja vanha luku ei enää sitonut
    kolmen zoomin sisällä (hajonta 0 → väite olisi jäänyt läpi).

## 5. Portit

| portti | tulos |
|---|---|
| `npm test` | 3440 testiä: **pass 3427, fail 0**, skipped 13 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 390 moduulia, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | kunnossa (1694 ui-viittausta) |
| `savuke-era12.mjs` | 19/19 |

## 6. Mitä EI tehty

Ei ankkurimuutosta (kohta 3 odottaa omistajaa), ei kamera.js:ää, ei
Raamattua, ei versionostoa, ei mergeä, ei dist/:iä.
