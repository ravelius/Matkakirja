# Ääniportti koko _valmiit-arkistolle (Äänittäjä 21.10.2026, yöjono kohta 6)

Ajettu `aaniportti.py` jokaiselle paketille (ilman --puhe). Vain poikkeamat; hylkäys ei kaada vanhaa jo viettyä pakettia, mutta kertoo mitä uusi vienti ei läpäisisi.

169 pakettia, täysin puhdasta 155, hylkäyksiä 8 pakettia, pelkkiä varoituksia 6.

## Hylkäykset
- **aanipankki-v1** (64 tiedostoa, hylättyjä 1, varoituksia 17): kielipakko: kieli.json puuttuu (ElevenLabs-puhepaketti ilman kielipakon kirjausta; tyokalut/elevenlabs_kieli.py kirjoita_kieli_json)
- **iss-kertoja-fi-vienti-20261018** (31 tiedostoa, hylättyjä 1, varoituksia 0): kielipakko: kieli.json puuttuu (ElevenLabs-puhepaketti ilman kielipakon kirjausta; tyokalut/elevenlabs_kieli.py kirjoita_kieli_json)
- **iss-kupoli-johdanto-vienti-20261013** (6 tiedostoa, hylättyjä 1, varoituksia 0): kielipakko: kieli.json puuttuu (ElevenLabs-puhepaketti ilman kielipakon kirjausta; tyokalut/elevenlabs_kieli.py kirjoita_kieli_json)
- **iss-lahtolasku-vienti-20261013** (8 tiedostoa, hylättyjä 1, varoituksia 0): kielipakko: kieli.json puuttuu (ElevenLabs-puhepaketti ilman kielipakon kirjausta; tyokalut/elevenlabs_kieli.py kirjoita_kieli_json)
- **juoksupeli-aanet-v3-vienti-20261020** (22 tiedostoa, hylättyjä 3, varoituksia 6): juoksupeli/aanet-v3/esineet/kivi-jade-5.mp3          1.50 s  kovuus +8.2 dB perheestä kivi-jade; juoksupeli/aanet-v3/esineet/metalli-5.mp3            2.50 s  kovuus -7.1 dB perheestä metalli; juoksupeli/aanet-v3/esineet/puu-4.mp3                5.06 s  kovuus -9.9 dB perheestä puu
- **juoksupeli-kaanto-eleven-20261020** (17 tiedostoa, hylättyjä 6, varoituksia 0): kaanto-eleven-1.mp3                                  1.00 s  kovuus +13.9 dB perheestä kaanto-eleven; kaanto-eleven-2.mp3                                  1.00 s  kovuus +15.0 dB perheestä kaanto-eleven; kaanto-eleven-3.mp3                                  1.00 s  kovuus +14.1 dB perheestä kaanto-eleven; raaka/kaanto-eleven-1.mp3                            1.00 s  kovuus -7.4 dB perheestä kaanto-eleven; raaka/kaanto-eleven-2.mp3                            1.00 s  kovuus -12.0 dB perheestä kaanto-eleven; raaka/kaanto-eleven-4.mp3                            1.00 s  kovuus -11.3 dB perheestä kaanto-eleven
- **juoksupeli-rytmit-v2-20261019** (29 tiedostoa, hylättyjä 1, varoituksia 2): keveasti-leikkisa/rummut.wav                        45.18 s  hiljainen -121 LUFS; kovuus -96.8 dB perheestä rummut
- **kiina-kertoja-vienti-20261017** (30 tiedostoa, hylättyjä 1, varoituksia 0): kielipakko: kieli.json puuttuu (ElevenLabs-puhepaketti ilman kielipakon kirjausta; tyokalut/elevenlabs_kieli.py kirjoita_kieli_json)

## Pelkät varoitukset
- avaruuskavely: 2 varoitusta, esim. v1/aanet/avaruuskavely/v1/pulu-2.mp3                 8.80 s  true peak -0.6 dBTP
- juoksupeli-aanet-v2-vienti-20261019: 4 varoitusta, esim. juoksupeli/aanet-v2/esineet/lasi-3.mp3               0.66 s  kovuus -4.1 dB perheestä lasi
- juoksupeli-avaus-puhe-vienti-20261020: 1 varoitusta, esim. audio/juoksupeli/avaus-puhe-v1/03-eunukki-majesteetti.mp3   1.44 s  true peak -0.8 dBTP
- juoksupeli-avaus-puhe2-vienti-20261020: 1 varoitusta, esim. audio/juoksupeli/avaus-puhe-v2/03-eunukki-majesteetti.mp3   1.36 s  true peak -0.4 dBTP
- juoksupeli-avaus-puhe3-vienti-20261020: 1 varoitusta, esim. audio/juoksupeli/avaus-puhe-v3/05-vanha-eunukki-majesteetti.mp3   1.44 s  true peak -0.4 dBTP
- juoksupeli-avaus-puhe4-vienti-20261020: 1 varoitusta, esim. audio/juoksupeli/avaus-puhe-v3/05-vanha-eunukki-majesteetti-pitka.mp3   2.03 s  true peak -0.4 dBTP
