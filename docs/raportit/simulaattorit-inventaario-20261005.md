# CoreSimulator/Devices -inventaario 5.10.2026 klo ~16.0x (Laitetestaaja, vain luku — mitään ei poistettu)

Yhteensä **119,9 Gi** (`/Users/koodaus/Library/Developer/CoreSimulator/Devices`, 24 laitetta, kaikki iOS 27.0, kaikki Shutdown). Viimeisin käyttö = `data/Library/Logs/CoreSimulator/CoreSimulator.log`:n muokkausaika (device.plist ei kirjaa käynnistysaikaa).
**Pääsyyllinen on iOS:n oma `Library/Application Support/PRBPosterExtensionDataStore` (taustakuva/poster-data): 54,4 Gi yhteensä (45 % kaikesta)**, ei peli: pelin app+data on 0,2–1,6 Gi/laite.

| Laite (UDID) | Nimi | Koko | PRB | Peli (bundle+data) | Viimeksi | Omistaja (Raamattu/roolit) |
|---|---|---|---|---|---|---|
| FB234D08 | iPhone 17 | 14,8 Gi | 8,7 | 0,8 | 5.10. 15.44 | Natiivi-UI |
| 1572C658 | iPhone 18 Pro | 13,0 Gi | 6,0 | 1,6 | 5.10. 15.52 | Laitetestaaja |
| F989814A | siirtoseppa-iPhone | 11,9 Gi | 7,8 | 0 | 5.10. 15.40 | Siirtoseppä |
| F2D9B022 | linssiseppa2-iPhone | 10,3 Gi | 6,4 | 0 | 5.10. 15.33 | Linssiseppä 2 |
| 4CE6C737 | linssiseppa2-iPad13 | 10,0 Gi | 5,9 | 0 | **3.10. 18.32** | Linssiseppä 2 (≈2,9 d, vanhin) |
| FBBD41D7 | natiiviseppa-iPhone | 9,4 Gi | 4,4 | 1,1 | 5.10. 14.43 | Natiiviseppä |
| D0D2CD1E | linssiseppa-iPhone | 8,6 Gi | 4,5 | 0 | 5.10. 11.09 | Linssiseppä |
| AD119F7B | natiivi-ui-iPad11 | 7,5 Gi | 3,5 | 0,7 | 5.10. 14.35 | Natiivi-UI |
| CD526454 | pelikoodari-iPad13 | 6,9 Gi | 3,3 | 0,8 | 5.10. 02.35 | Pelikoodari |
| D5900D45 | siirtoseppa-iPad13 | 6,3 Gi | 3,2 | 0 | 4.10. 22.52 | Siirtoseppä |
| 3B4CDACB | iPad Pro 13-inch (M5) | 5,2 Gi | 0,2 | 0,5 | 5.10. 12.32 | Laitetestaaja (1024 pt) |
| C1D5E34C | pariteetti-iPad11-834 | 4,9 Gi | 0,4 | 0,9 | 5.10. 14.15 | Pariteetti (vahti asentaa junan) |
| A2FD9C9F | pariteetti-iPhone | 4,6 Gi | 0,4 | 0,7 | 5.10. 14.13 | Pariteetti |
| 903C2B91 | linssiseppa-iPad11 | 3,5 Gi | 0,2 | 0 | **2.10. 10.49** | Linssiseppä (3,2 d, vanha) |
| 993F8873 | pariteetti-iPhone-vaaka | 2,7 Gi | 0,3 | 0,5 | 5.10. 12.33 | Pariteetti |
| 88939C12, EA8A340D, E765DF34, DC74067B, D2EBA4C0, 926C58CD, 4AC5DFFF, 46EC73E2 | pariteetti-iPad13, iPad Air 11/13, iPad mini, iPad (A16), iPhone Air, iPhone 17e, iPhone 18 Pro Max | 0,0 Gi | – | – | ei käytetty | **ei omistajaa** (oletuslaitteet, ei Raamatussa; eivät vie tilaa) |

## Ehdotukset (EI toteutettu; jokaiseen omistajan kuittaus)
1. **PRBPosterExtensionDataStore tyhjennys sammutetuista laitteista** (suurin voitto): n. **48 Gi** jos kaikki kymmenen ≥3 Gi:n PRB:tä tyhjennetään (FB234D08 8,7; F989814A 7,8; F2D9B022 6,4; 1572C658 6,0; D0D2CD1E 4,5; FBBD41D7 4,4; AD119F7B 3,5; CD526454 3,3; D5900D45 3,2; 4CE6C737 5,9 jos laite säilyy). Muistiinpano `simulaattori-erase-levy`: oman sammutetun laitteen PRB-poisto sallittu, `simctl erase` ei. Kukin omistaja tyhjentää omansa (laite Shutdown, `rm -rf …/data/Library/Application Support/PRBPosterExtensionDataStore`); iOS luo hakemiston uudelleen ja kasvaa takaisin ajan mittaan (5–7 Gi) → tämä on **toistuva** korjaus, ei pysyvä.
2. **Poistettavat laitteet (≥3 d käyttämättä):** 4CE6C737 linssiseppa2-iPad13 (10,0 Gi, Linssiseppä 2) ja 903C2B91 linssiseppa-iPad11 (3,5 Gi, Linssiseppä): yhteensä **13,5 Gi** (sisältää niiden PRB:n; jos laite poistetaan, erillistä PRB-tyhjennystä ei tarvita → vähennä 6,1 Gi kohdasta 1 → nettohyöty yhdessä ≈ 54 Gi). Omistajan kuittaus: kumpaakin tarvitaanko vielä.
3. **Omistajattomat tyhjät laitteet (8 kpl, 0 Gi):** poisto siistii listan, ei vapauta tilaa (Päätoimittaja päättää).
4. **Isojen laitteiden sisällä (pieni, ≈1 Gi/laite):** 1572C658 pelidata 1,2 Gi (linnan latausvälimuisti/`dioraama`, kuvat): Laitetestaaja tyhjentää omansa (`uninstall app.matkakirja.proto3d`) — arviolta 1,1 Gi; FBBD41D7 0,6 Gi, CD526454 0,4 Gi, C1D5E34C 0,4 Gi: omistajat. Sovelluksen bundle 0,5 Gi/laite (junan .app) ei ole kasautunut: asennus korvaa vanhan.
5. **Estä uusi kasvu:** PRB kasvaa itsestään — käytännössä sama sim kerrallaan, vältä uusia simulaattoreita; tarvittaessa `simctl erase` omistajan luvalla (luokitin estää, ks. muistiinpano).

**Arvio vapautuvasta tilasta:** ~48 Gi (PRB, 9–10 laitetta) + 13,5 Gi (kaksi vanhaa laitetta; osa päällekkäin PRB:n kanssa) → **≈ 50–55 Gi yhteensä**, levy 35 → ~85–90 Gi vapaana. Oma osuuteni (1572C658 + 3B4CDACB): PRB 6,2 Gi + pelidata 1,1 Gi ≈ **7,3 Gi** — tyhjennän vasta kuittauksella.
