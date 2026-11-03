# Todistusajo: luettnyk-linssit-iphone fc621a0d

**luettnyk-linssit-iphone fc621a0d: PUUTE — 2: Pulun taulu: 'Minne katsotaan' ei näy; 2: elementtiä 'ISS-ohjaamo' ei ui-puussa; 2: ISS-ohjaamo: ei lokiriviä**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-luett-linssit-iphone.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-luettnyk-linssit-iphone-20261014-2040`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt fc621a0d = fc621a0d
- **OK** haaran fc621a0d sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `ui-puu: Pulun taulu` | OK: 'Minne katsotaan' näkyy (91.5 576.0) |
| `ui-puu: Pulun taulu` | PUUTE |
| `tap-teksti ISS-ohjaamo` | EI LÖYDY ui-puusta |
| `oletus: ISS-ohjaamo` | PUUTE: ei riviä 60 s:ssa |
| `oletus: opas auki` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `tap-teksti Ohita` | EI LÖYDY ui-puusta |

- **PUUTE** Pulun taulu: 'Minne katsotaan' ei näy
- **PUUTE** elementtiä 'ISS-ohjaamo' ei ui-puussa
- **PUUTE** ISS-ohjaamo: ei lokiriviä
- **PUUTE** elementtiä 'Ohita' ei ui-puussa

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [l01-valitsin.png](kuvat/l01-valitsin.png): 1 linssien valitsin (1206×2622 px, pysty)
- **OK** [l02-linssiselite.png](kuvat/l02-linssiselite.png): 2 linssiselite (1206×2622 px, pysty)
- **OK** [l03-pulun-taulu.png](kuvat/l03-pulun-taulu.png): 3 Pulun taulu (astronautin kamera) (1206×2622 px, pysty)
- **OK** [l04-astrokuva.png](kuvat/l04-astrokuva.png): 4 astronautin kuva: selite ja AUTO-lappu (1206×2622 px, pysty)
- **OK** [l05-iss-paneeli.png](kuvat/l05-iss-paneeli.png): 5 ISS-ohjaamo: paneeli (1206×2622 px, pysty)
- **OK** [l06-iss-lista.png](kuvat/l06-iss-lista.png): 6 ISS: lista (1206×2622 px, pysty)
- **OK** [l07-iss-kohdevalikko.png](kuvat/l07-iss-kohdevalikko.png): 7 ISS: kohdevalikko (Aika ja sää) (1206×2622 px, pysty)
- **OK** [l08-opas.png](kuvat/l08-opas.png): 8 opas: nimilappu ja napit (1206×2622 px, pysty)
- **OK** [l09-opasvalikko.png](kuvat/l09-opasvalikko.png): 9 oppaan valikko (1206×2622 px, pysty)
- **OK** [l10-opas-aika.png](kuvat/l10-opas-aika.png): 10 oppaan Aika ja sää (1206×2622 px, pysty)
- **OK** [l11-ajattelija.png](kuvat/l11-ajattelija.png): 11 ajattelijan lappu (1206×2622 px, pysty)
- **OK** [l12-aikaselain.png](kuvat/l12-aikaselain.png): 12 keksinnöt: aikaselain (1206×2622 px, pysty)
- **OK** [l13-linssivalikko.png](kuvat/l13-linssivalikko.png): 13 linssin ☰-valikko (1206×2622 px, pysty)
- **OK** [l14-radio.png](kuvat/l14-radio.png): 14 radio (1206×2622 px, pysty)
- **OK** [l15-vuosi.png](kuvat/l15-vuosi.png): 15 maapallon vuosi (1206×2622 px, pysty)
- **OK** [l16-vertailu.png](kuvat/l16-vertailu.png): 16 vertailu (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 72.34 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 60.56): kuormitus 60.56 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
