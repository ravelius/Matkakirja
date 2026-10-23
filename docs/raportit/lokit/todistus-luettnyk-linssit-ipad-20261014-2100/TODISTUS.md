# Todistusajo: luettnyk-linssit-ipad fc621a0d

**luettnyk-linssit-ipad fc621a0d: PUUTE — 2: Pulun taulu: 'Minne katsotaan' ei näy; 2: elementtiä 'ISS-ohjaamo' ei ui-puussa; 2: ISS-ohjaamo: ei lokiriviä**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-luett-linssit-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-luettnyk-linssit-ipad-20261014-2100`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt fc621a0d = fc621a0d
- **OK** haaran fc621a0d sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `ui-puu: Pulun taulu` | OK: 'Minne katsotaan' näkyy (470.5 1034.5) |
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
- **OK** [l01-valitsin.png](kuvat/l01-valitsin.png): 1 linssien valitsin (2420×1668 px, vaaka)
- **OK** [l02-linssiselite.png](kuvat/l02-linssiselite.png): 2 linssiselite (2420×1668 px, vaaka)
- **OK** [l03-pulun-taulu.png](kuvat/l03-pulun-taulu.png): 3 Pulun taulu (astronautin kamera) (2420×1668 px, vaaka)
- **OK** [l04-astrokuva.png](kuvat/l04-astrokuva.png): 4 astronautin kuva: selite ja AUTO-lappu (2420×1668 px, vaaka)
- **OK** [l05-iss-paneeli.png](kuvat/l05-iss-paneeli.png): 5 ISS-ohjaamo: paneeli (2420×1668 px, vaaka)
- **OK** [l06-iss-lista.png](kuvat/l06-iss-lista.png): 6 ISS: lista (2420×1668 px, vaaka)
- **OK** [l07-iss-kohdevalikko.png](kuvat/l07-iss-kohdevalikko.png): 7 ISS: kohdevalikko (Aika ja sää) (2420×1668 px, vaaka)
- **OK** [l08-opas.png](kuvat/l08-opas.png): 8 opas: nimilappu ja napit (2420×1668 px, vaaka)
- **OK** [l09-opasvalikko.png](kuvat/l09-opasvalikko.png): 9 oppaan valikko (2420×1668 px, vaaka)
- **OK** [l10-opas-aika.png](kuvat/l10-opas-aika.png): 10 oppaan Aika ja sää (1668×2420 px, pysty)
- **OK** [l11-ajattelija.png](kuvat/l11-ajattelija.png): 11 ajattelijan lappu (2420×1668 px, vaaka)
- **OK** [l12-aikaselain.png](kuvat/l12-aikaselain.png): 12 keksinnöt: aikaselain (2420×1668 px, vaaka)
- **OK** [l13-linssivalikko.png](kuvat/l13-linssivalikko.png): 13 linssin ☰-valikko (2420×1668 px, vaaka)
- **OK** [l14-radio.png](kuvat/l14-radio.png): 14 radio (2420×1668 px, vaaka)
- **OK** [l15-vuosi.png](kuvat/l15-vuosi.png): 15 maapallon vuosi (2420×1668 px, vaaka)
- **OK** [l16-vertailu.png](kuvat/l16-vertailu.png): 16 vertailu (2420×1668 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 85.99 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 23.87): Unity -batchmode | kuormitus 23.87 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
