# Todistusajo: nd-v6k28-juna216 9b730809

**nd-v6k28-juna216 9b730809: PUUTE — 1: haaran natiiviseppa/juna-216 EI sisälly käännökseen 9b730809 (tai commit puuttuu proto-gitistä)**

Laite iphone `A885020B-772D-4452-BFC8-E9F422BBDD21`, skenaario `sk-nd.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-nd-v6k28-juna216-20261031-2052`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 9b730809 = 9b7308099
- **PUUTE** haaran natiiviseppa/juna-216 EI sisälly käännökseen 9b730809 (tai commit puuttuu proto-gitistä)

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: testiotsake päällä` | OK: linssit: opas: sallitut kaupungit 46: Barcelona, Berliini, Budapest, Firenze, Granada, Helsinki, Kööpenhamina, Lissabon, Ljubljana, Lontoo, Madrid, Marseille, Pariisi, Rooma, Tukholma, Wien, Dublin, |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: siirto Pariisiin ohi` | OK: linssit: opas: esitys alkaa (pariisi): avaus + opastus (1. kyyti) [opas/esittely-v1h/pariisi.json] |
| `oletus: 1. kohde (Notre-Dame) saapui` | OK: linssit: opas: saapui Notre-Dame (48,8530, 2,3498), ääni soi, laatat 96 %, saapumisportti 4,4 s (tasanne), tarkkuus 0,73, peitto 0,99 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **HUOM** pitkiä ruutuja kameran liikkeessä 2398 (kone kuormassa; pitkat-ruudut.txt)

## 4. Stillit tiloista
- **OK** [K1-notre-dame.png](kuvat/K1-notre-dame.png): Pysähdys Notre-Dame: lista kutistunut, nimi yläreunassa, tekstitys tummalla taustalla (2622×1206 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 33.38 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 37.59): xcodebuild | kuormitus 37.59 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
