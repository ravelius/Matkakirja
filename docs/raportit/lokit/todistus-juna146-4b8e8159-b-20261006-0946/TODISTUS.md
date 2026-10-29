# Todistusajo: juna146-4b8e8159-b 5c1d69bf

**juna146-4b8e8159-b 5c1d69bf: PUUTE — 2: elementtiä 'Poistu' ei ui-puussa; 2: kartta palaa ehjänä oppaan jälkeen: 'Liiku' ei näy**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna146b.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna146-4b8e8159-b-20261006-0946`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 5c1d69bf = 5c1d69bf

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 33.14 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: täkyt näkyvät alussa` | OK: linssit: opas: täkyt 8 (ok) |
| `tap-teksti Akropolis → tap 236.1 246.7` | lähetetty |
| `tap-teksti Poistu` | EI LÖYDY ui-puusta |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | PUUTE |

- **PUUTE** elementtiä 'Poistu' ei ui-puussa
- **PUUTE** kartta palaa ehjänä oppaan jälkeen: 'Liiku' ei näy

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-taky.png](kuvat/01-taky.png): Oppaan täkyt alussa (1206×2622 px, pysty)
- **OK** [02-akropolis.png](kuvat/02-akropolis.png): Opas valinnan jälkeen (1206×2622 px, pysty)
- **OK** [03-akropolis-40s.png](kuvat/03-akropolis-40s.png): Opas 40 s valinnan jälkeen (1206×2622 px, pysty)
- **OK** [04-kartta.png](kuvat/04-kartta.png): Kartta oppaan jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.04 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **OK** aani mittaa: rms 0.09612, huippu 0.5897, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [LinssiOhjain:@1,00], istunto: luokka AVAud
- **OK** aani mittaa: rms 0.00106, huippu 0.0292, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 19.29): kuormitus 19.29 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
