# Todistusajo: juna153-b 7920e6a0

**juna153-b 7920e6a0: PUUTE — 2: elementtiä 'Kaupunkikierros' ei ui-puussa; 2: kaupunkikierros käynnistyi: ei lokiriviä; 2: elementtiä 'Mikä' ei ui-puussa**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna153b.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna153-b-20261006-2040`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7920e6a0 = 7920e6a0

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 34.42 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: aloitusvalikko auki` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `tap-teksti Sydneyn oopperatalo → tap 224.0 612.4` | lähetetty |
| `oletus: Sydney valittu` | OK: linssit: opas: täky valittu Sydneyn oopperatalo (Sydney, AU) |
| `tap 203 778` | lähetetty |
| `ui-puu: Liiku-paneeli auki` | OK: 'MIHIN SIIRRYTÄÄN' näkyy (259.1 137.5) |
| `tap-teksti Kaupunkikierros` | EI LÖYDY ui-puusta |
| `oletus: kaupunkikierros käynnistyi` | PUUTE: ei riviä 20 s:ssa |
| `tap 144 778` | lähetetty |
| `tap-teksti Mikä` | EI LÖYDY ui-puusta |
| `oletus: Kysy-kysymys kirjautui (puhevastaus)` | OK: linssit: opas: kysymykset 6 (Hyde Park) |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu linssistä → tap 229.5 327.1` | lähetetty |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |

- **PUUTE** elementtiä 'Kaupunkikierros' ei ui-puussa
- **PUUTE** kaupunkikierros käynnistyi: ei lokiriviä
- **PUUTE** elementtiä 'Mikä' ei ui-puussa

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-liiku.png](kuvat/01-liiku.png): Liiku-paneeli (MIHIN SIIRRYTÄÄN?) (1206×2622 px, pysty)
- **OK** [02-kaupunkikierros.png](kuvat/02-kaupunkikierros.png): Kaupunkikierros käynnissä (1206×2622 px, pysty)
- **OK** [03-kysy.png](kuvat/03-kysy.png): Kysy-paneeli (1206×2622 px, pysty)
- **OK** [04-kysy-valinnan-jalkeen.png](kuvat/04-kysy-valinnan-jalkeen.png): Kysy valinnan jälkeen (1206×2622 px, pysty)
- **OK** [05-valikko.png](kuvat/05-valikko.png): ≡-valikko (1206×2622 px, pysty)
- **OK** [06-kartta.png](kuvat/06-kartta.png): Kartta oppaan sulkemisen jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 29.36 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 102.95): kuormitus 102.95 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
