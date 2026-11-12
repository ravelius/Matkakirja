# Todistusajo: nd-v6k29-juna216 ec0554ca

**nd-v6k29-juna216 ec0554ca: OK**

Laite iphone `A885020B-772D-4452-BFC8-E9F422BBDD21`, skenaario `sk-nd.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-nd-v6k29-juna216-20261031-2124`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt ec0554ca = ec0554ca8
- **OK** haaran natiiviseppa/juna-216 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: testiotsake päällä` | OK: linssit: opas: sallitut kaupungit 46: Barcelona, Berliini, Budapest, Firenze, Granada, Helsinki, Kööpenhamina, Lissabon, Ljubljana, Lontoo, Madrid, Marseille, Pariisi, Rooma, Tukholma, Wien, Dublin, |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: siirto Pariisiin ohi` | OK: linssit: opas: esitys alkaa (pariisi): avaus + opastus (1. kyyti) [opas/esittely-v1h/pariisi.json] |
| `oletus: 1. kohde (Notre-Dame) saapui` | OK: linssit: opas: saapui Notre-Dame (48,8530, 2,3498), ääni ei, laatat 99 %, saapumisportti 4,4 s (tasanne), tarkkuus 0,73, peitto 0,99 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **HUOM** konsoli hiljaa 278 s (raja 60 s), pääsäie ajaa RunLoopia normaalisti (ei jäätymistä): pinonayte-1.txt
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- **HUOM** pitkiä ruutuja kameran liikkeessä 2395 (kone kuormassa; pitkat-ruudut.txt)
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [K1-notre-dame.png](kuvat/K1-notre-dame.png): Pysähdys Notre-Dame: lista kutistunut, nimi yläreunassa, tekstitys tummalla taustalla (2622×1206 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 310.46 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 574.35): Unity -batchmode | kuormitus 574.35 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
