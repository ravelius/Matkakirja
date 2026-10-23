# Todistusajo: juna151-b 6a4d92de

**juna151-b 6a4d92de: PUUTE — 2: elementtiä 'Ranska' ei ui-puussa; 2: elementtiä 'Pariisi' ei ui-puussa; 2: valinta kirjautui: ei lokiriviä**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna151b.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna151-b-20261006-1735`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 6a4d92de = 6a4d92de

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 33.64 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: aloitusvalikko auki` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `tap-teksti Eurooppa → tap 63.9 290.1` | lähetetty |
| `tap-teksti Ranska` | EI LÖYDY ui-puusta |
| `tap-teksti Pariisi` | EI LÖYDY ui-puusta |
| `oletus: valinta kirjautui` | PUUTE: ei riviä 40 s:ssa |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu linssistä` | EI LÖYDY ui-puusta |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | PUUTE |

- **PUUTE** elementtiä 'Ranska' ei ui-puussa
- **PUUTE** elementtiä 'Pariisi' ei ui-puussa
- **PUUTE** valinta kirjautui: ei lokiriviä
- **PUUTE** elementtiä 'Poistu linssistä' ei ui-puussa
- **PUUTE** kartta palaa ehjänä oppaan jälkeen: 'Liiku' ei näy

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-aloitusvalikko.png](kuvat/01-aloitusvalikko.png): Aloitusvalikko ennen valintaa (1206×2622 px, pysty)
- **OK** [02-maat.png](kuvat/02-maat.png): Maanosa Eurooppa: maat (1206×2622 px, pysty)
- **OK** [03-kaupungit.png](kuvat/03-kaupungit.png): Ranska: kaupungit (1206×2622 px, pysty)
- **OK** [04-pariisi.png](kuvat/04-pariisi.png): Opas valinnan jälkeen (Pariisi) (1206×2622 px, pysty)
- **OK** [05-valikko.png](kuvat/05-valikko.png): ≡-valikko (1206×2622 px, pysty)
- **OK** [06-kartta.png](kuvat/06-kartta.png): Kartta oppaan sulkemisen jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.54 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 154.88): xcodebuild | kuormitus 154.88 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
