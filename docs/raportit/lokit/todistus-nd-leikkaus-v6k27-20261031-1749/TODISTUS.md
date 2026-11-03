# Todistusajo: nd-leikkaus-v6k27 20a6e031

**nd-leikkaus-v6k27 20a6e031: OK**

Laite iphone `A885020B-772D-4452-BFC8-E9F422BBDD21`, skenaario `sk-nd.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-nd-leikkaus-v6k27-20261031-1749`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 20a6e031 = 20a6e0311
- **OK** haaran natiivi-ui/kierros-vaaka-216 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: testiotsake päällä` | OK: linssit: opas: sallitut kaupungit 46: Barcelona, Berliini, Budapest, Firenze, Granada, Helsinki, Kööpenhamina, Lissabon, Ljubljana, Lontoo, Madrid, Marseille, Pariisi, Rooma, Tukholma, Wien, Dublin, |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: siirto Pariisiin ohi` | OK: linssit: opas: esitys alkaa (pariisi): avaus + opastus (1. kyyti) [opas/esittely-v1h/pariisi.json] |
| `oletus: 1. kohde (Notre-Dame) saapui` | OK: linssit: opas: saapui Notre-Dame (48,8530, 2,3498), ääni soi, laatat 100 %, saapumisportti 4,9 s (tasanne), tarkkuus 0,83, peitto 1,00 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **HUOM** pitkiä ruutuja kameran liikkeessä 2395 (kone kuormassa; pitkat-ruudut.txt)

## 4. Stillit tiloista
- **OK** [K1-notre-dame.png](kuvat/K1-notre-dame.png): Pysähdys Notre-Dame: lista kutistunut, nimi yläreunassa, tekstitys tummalla taustalla (2622×1206 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 32.14 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 4.32): Blender 

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
