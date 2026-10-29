# Todistusajo: prahapallo6-iphone 47030235

**prahapallo6-iphone 47030235: OK**

Laite iphone `0AC1815C-3372-4E20-A9B4-EDA798818943`, skenaario `sk-prahapallo6-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-prahapallo6-iphone-20261014-1947`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 47030235 = 47030235

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: pallokierroksen data natiiviin (v2)` | OK: linssit: opas: pallokierros praha (pallokierros-praha-v5): 8 pysähdystä (Petřínin näkötorni, Malá Strana, Prahan linna ja Pyhän Vituksen katedraali, Kaarlensilta, Josefov ja Vanhauusi synagoga |
| `ei-oletus: workerin liiku-listaa ei haeta` | OK: ei riviä 5 s:ssa |
| `oletus: siirto (Praha) ohi` | OK: linssit: opas: esitys alkaa (praha): avaus + opastus (1. kyyti) [opas/esittely-v1b/praha.json] |
| `oletus: kierros alkaa` | OK: linssit: opas: esitys: kaupunkikierros |
| `oletus: kierros datasta` | OK: linssit: opas: kaupunkikierros 8 kohdetta (pallokierros-praha-v5/praha): Petřínin näkötorni, Malá Strana, Prahan linna ja Pyhän Vituksen katedraali, Kaarlensilta, Josefov ja Vanhauusi synagoga,  |
| `oletus: saapuminen 1 Petřínin näkötorni` | OK: linssit: opas: saapui Petřínin näkötorni (50,0835, 14,3951), ääni soi, laatat 95 %, saapumisportti 17,4 s (tasanne), tarkkuus 0,18, peitto 1,00 |
| `oletus: pysäkki 2 datasta ja omalla äänellä` | OK: linssit: opas: vastaus 2 Malá Strana (pallokierros 2/8, ääni pysahdys-2.mp3, 50,2 s) |
| `oletus: saapuminen 2 Malá Strana` | OK: linssit: opas: saapui Malá Strana (50,0881, 14,4039), ääni soi, laatat 100 %, saapumisportti 8,4 s (tasanne), tarkkuus 0,50, peitto 1,00 |
| `oletus: lyhyt väli 2 → 3 liukuna (≤ 12,5 s)` | OK: linssit: opas: lento Prahan linna ja Pyhän Vituksen katedraali 357 m, kesto 12,0 s, suurin kiihtyvyys 19,2 m/s², suurin lasku 3,5 m/s |
| `oletus: saapuminen 3 Prahan linna ja katedraali` | OK: linssit: opas: saapui Prahan linna ja Pyhän Vituksen katedraali (50,0906, 14,4008), ääni soi, laatat 100 %, saapumisportti 9,1 s (tasanne), tarkkuus 0,30, peitto 1,00 |
| `oletus: saapuminen 4 Kaarlensilta` | OK: linssit: opas: saapui Kaarlensilta (50,0866, 14,4106), ääni soi, laatat 86 %, saapumisportti 25,6 s (tasanne), tarkkuus 0,60, peitto 1,00 |
| `oletus: saapuminen 5 Josefov` | OK: linssit: opas: saapui Josefov ja Vanhauusi synagoga (50,0900, 14,4186), ääni soi, laatat 100 %, saapumisportti 10,2 s (tasanne), tarkkuus 0,67, peitto 1,00 |
| `oletus: lyhyt väli 5 → 6 liukuna (≤ 12,5 s)` | OK: linssit: opas: lento Vanhankaupungin aukio ja astronominen kello 366 m, kesto 12,0 s, suurin kiihtyvyys 14,5 m/s², suurin lasku 15,3 m/s |
| `oletus: saapuminen 6 Vanhankaupungin aukio` | OK: linssit: opas: saapui Vanhankaupungin aukio ja astronominen kello (50,0870, 14,4207), ääni soi, laatat 100 %, saapumisportti 8,6 s (tasanne), tarkkuus 0,55, peitto 1,00 |
| `oletus: saapuminen 7 Venceslauksen aukio` | OK: linssit: opas: saapui Venceslauksen aukio ja Kansallismuseo (50,0789, 14,4308), ääni soi, laatat 100 %, saapumisportti 8,6 s (tasanne), tarkkuus 0,40, peitto 1,00 |
| `oletus: lento Vyšehradille alkaa` | OK: linssit: opas: lento Vyšehrad 1863 m, kesto 16,2 s, suurin kiihtyvyys 62,7 m/s², suurin lasku 24,8 m/s |
| `oletus: saapuminen 8 Vyšehrad` | OK: linssit: opas: saapui Vyšehrad (50,0644, 14,4176), ääni soi, laatat 82 %, saapumisportti 25,7 s, tarkkuus 0,28, peitto 1,00 |
| `oletus: loppunousu` | OK: linssit: opas: pallokierros: loppu (nousu yleiskuvaan 1100 m / 50° 30 s:ssa) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [a01-avaus.png](kuvat/a01-avaus.png): Avausnäkymä 1 100 m / 50° kohti Malá Stranaa: Petřín alakolmanneksessa, Vltava mutkana (2622×1206 px, vaaka)
- **OK** [k01-petrin.png](kuvat/k01-petrin.png): Petřínin näkötorni +4 s (silmä 29–41 m) (2622×1206 px, vaaka)
- **OK** [k02-mala-strana.png](kuvat/k02-mala-strana.png): Malá Strana +4 s (Pyhän Nikolauksen kupoli) (2622×1206 px, vaaka)
- **OK** [k03-linna.png](kuvat/k03-linna.png): Prahan linna ja Pyhän Vituksen katedraali +4 s (molemmat kuvassa, silmä 48–68 m; metrolinjassa linna korostettu) (2622×1206 px, vaaka)
- **OK** [k04-kaarlensilta.png](kuvat/k04-kaarlensilta.png): Kaarlensilta +4 s (ei ruskeaa verhokaarta joen yllä) (2622×1206 px, vaaka)
- **OK** [k05-josefov.png](kuvat/k05-josefov.png): Josefov ja Vanhauusi synagoga +4 s (v5: luoteesta, silmä 70–85 m, ei repeytynyttä etualaa) (2622×1206 px, vaaka)
- **OK** [k06-vanhakaupunki.png](kuvat/k06-vanhakaupunki.png): Vanhankaupungin aukio +4 s (Týnin tornit, silmä 40–56 m; metrolinjassa aukio korostettu) (2622×1206 px, vaaka)
- **OK** [k07-venceslas.png](kuvat/k07-venceslas.png): Venceslauksen aukio ja Kansallismuseo +4 s (2622×1206 px, vaaka)
- **OK** [l08-lento-vysehrad.png](kuvat/l08-lento-vysehrad.png): Lento Vyšehradille puolivälissä (Tanssiva talo ei kuvan keskellä) (2622×1206 px, vaaka)
- **OK** [k08-vysehrad.png](kuvat/k08-vysehrad.png): Vyšehrad +4 s (v4: 75°, kamera tasanteella, ei rinteen yllä) (2622×1206 px, vaaka)
- **OK** [z02-nousu.png](kuvat/z02-nousu.png): Nousu puolivälissä (+16 s) (2622×1206 px, vaaka)
- **OK** [z03-yleiskuva.png](kuvat/z03-yleiskuva.png): Yleiskuva 1 100 m / 50°, koko joki kuvassa (2622×1206 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.23 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 27.37): xcodebuild | kuormitus 27.37 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
