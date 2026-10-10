# Todistusajo: hoyrykone-174 cd7e8904

**hoyrykone-174 cd7e8904: PUUTE — 2: Soundly-höyrykone latautui: ei lokiriviä**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-hoyrykone-174.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-hoyrykone-174-20261010-0843`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt cd7e8904 = cd7e89047
- **OK** haaran 33a57e2ad sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap 993 1297 0.1` | lähetetty |
| `ui-puu: linssivalikko auki` | OK: 'Kuumailmapallo' näkyy (668.8 1251.5) |
| `tap-teksti Kuumailmapallo → tap 668.8 1251.5` | lähetetty |
| `ui-puu: linssin kortti` | OK: 'Aktivoi' näkyy (665.8 1271.2) |
| `tap-teksti Aktivoi → tap 665.8 1271.2` | lähetetty |
| `oletus: opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: kaupunkinäkymä auki` | OK: opas: siirtymä valmis |
| `oletus: Soundly-höyrykone latautui` | PUUTE: ei riviä 90 s:ssa |

- **PUUTE** Soundly-höyrykone latautui: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [k01-stromkajen.png](kuvat/k01-stromkajen.png): Strömkajen 140 m, höyry- ja saaristolaivat (täysi miksaus) (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 24.99 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **OK** aani mittaa: rms 0.08646, huippu 0.5577, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 70 [vene pikkulautta:laiva.lautta@0,70, vene 
- **HUOM** [hoyrykone-a-taysi-natiivi.wav](aani/hoyrykone-a-taysi-natiivi.wav): pcm_s16le 44100 Hz 2 kan, 0.0 s, mean ? dB, max ? dB — hiljainen
- **OK** [hoyrykone-a-taysi.wav](aani/hoyrykone-a-taysi.wav): pcm_s16le 24000 Hz 2 kan, 30.0 s, mean -20.2 dB, max -3.4 dB
- **HUOM** [hoyrykone-b-ilman-kertojaa-natiivi.wav](aani/hoyrykone-b-ilman-kertojaa-natiivi.wav): pcm_s16le 44100 Hz 2 kan, 0.0 s, mean ? dB, max ? dB — hiljainen
- **OK** [hoyrykone-b-ilman-kertojaa.wav](aani/hoyrykone-b-ilman-kertojaa.wav): pcm_s16le 24000 Hz 2 kan, 20.0 s, mean -21.2 dB, max -5.6 dB

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 13.63)

## 8. Ei testattu
- **EI** kuuluvuus riippuu siitä, osuuko höyrylaiva kameran lähelle (reitit satunnaisia); lokirivi todistaa latauksen
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
