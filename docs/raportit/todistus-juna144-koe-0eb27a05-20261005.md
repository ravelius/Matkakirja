# Todistusajo: juna144-koe 0eb27a05

**juna144-koe 0eb27a05: PUUTE — 2: kuvaselite lukeutuu: ei lokiriviä; 5: aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP); 5: [kuvaselite-natiivi.wav](aani/kuvaselite-natiivi.wav): pcm_s16le 44100 Hz 2 kan, 0.0 s, mean ? dB, max ? dB — HILJAINEN**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna144.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna144-koe-20261005-1549`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 0eb27a05 = 0eb27a05

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 32.31 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: asetukset datana, ei tiedostoa` | OK: peli-komento: 33.31 asetus → ok asetukset: oletukset (ei tiedostoa) [Kartta] |
| `tap 109 603` | lähetetty |
| `oletus: kuvaselite lukeutuu` | PUUTE: ei riviä 20 s:ssa |
| `tap 374 784` | lähetetty |
| `tap 317 650` | lähetetty |
| `tap 264 682` | lähetetty |
| `oletus: Laituri k1` | OK: linssit: poikki: kuunnelma laituri alkaa (edellinen -) |

- **PUUTE** kuvaselite lukeutuu: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-taulu.png](kuvat/01-taulu.png): Pulun taulu (satelliitti-linssi) (1206×2622 px, pysty)
- **OK** [02-kuvakatselin.png](kuvat/02-kuvakatselin.png): Astronauttien kuvat, kuvakatselin auki (1206×2622 px, pysty)
- **OK** [03-linna-yleis.png](kuvat/03-linna-yleis.png): Linna yleisnäkymä (portrait-simu kiertää vaakaa) (2622×1206 px, vaaka)
- **OK** [04-linna-valikko.png](kuvat/04-linna-valikko.png): Linnan valikko auki (2622×1206 px, vaaka)
- **OK** [05-linna-laituri.png](kuvat/05-linna-laituri.png): Laituri huonekortti (2622×1206 px, vaaka)

## 5. Ääni
- **OK** testimykistys päällä (ei Macin kaiuttimiin)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP)
- **OK** aani mittaa: rms 0.06692, huippu 0.4526, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [DioraamaKertaaanet:@0,71], istunto: luokka
- **PUUTE** [kuvaselite-natiivi.wav](aani/kuvaselite-natiivi.wav): pcm_s16le 44100 Hz 2 kan, 0.0 s, mean ? dB, max ? dB — HILJAINEN
- **PUUTE** [kuvaselite.wav](aani/kuvaselite.wav): pcm_s16le 24000 Hz 2 kan, 8.0 s, mean -91.0 dB, max -91.0 dB — HILJAINEN
- **HUOM** [laituri-natiivi.wav](aani/laituri-natiivi.wav): pcm_s16le 44100 Hz 2 kan, 0.0 s, mean ? dB, max ? dB — hiljainen
- **OK** [laituri.wav](aani/laituri.wav): pcm_s16le 24000 Hz 2 kan, 8.0 s, mean -24.3 dB, max -6.9 dB

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 28.77): kuormitus 28.77 > 16 ydintä

## 8. Ei testattu
- **EI** linnan latauspalkki nimiruudussa, Pulu napautuksesta, kamera puhujaan, laineet: ei erillistä todistetta tässä ajossa (nimiruutu lataus ohi ennen stilliä)
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
