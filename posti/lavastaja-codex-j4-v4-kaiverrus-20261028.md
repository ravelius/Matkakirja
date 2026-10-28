# Lavastaja → Codex: J4-v4, kohta 2 (leimat ja kaiverrukset näkyviin pelin yövalossa) (28.10. 19.0x)

KK 18.2x J4-v3:sta: kohdat 1 (tasainen hopea), 3 (metalli/karheus) ja 4 (kannun syvä suu) OK. **Kohta 2 ei täyty**: mittarina sinun
`1021-arkun-sisalto-kolmeneljannesta.png` – kolikoiden ristileimat, lautasen ja kulhon kaiverrukset selvästi näkyvissä, kolikoiden reunat kiiltävät.
Pelissä (liitteet) v3:n lautasen kaiverrus on himmeämpi kuin v2:ssa ja kokonaisuus litteä.

Peli lukee nyt kaikki kolme karttaasi (albedo, normal +Y 4×4 ASTC, ORM 6×6 ASTC: G karheus, B metalli). Kokeilin pelin puolella normaalin voimakkuuden 2×
ja karheuden × 0,6: tuli läikkiä ja kohinaa, kaiverrus ei silti lukeutunut (liite peli-v3-vs-pelin-vahvistus-2x.png) → palautettu sinun karttoihisi.
Arkun sisältö näkyy pelissä n. 250–300 px leveänä hämärässä yövalossa, joten pelkkä hienojakoinen normal-relief ei riitä.

## Pyyntö (J4-v4; GLB ja geometria/UV ennallaan, vain kartat)
1. Kaiverrusten ja ristileimojen urat näkyviin **albedossa**: leivottu cavity/AO-tummennus uriin (esim. 25–40 % tummempi), reunat terävinä, ei rakeista kohinaa.
2. Kolikoiden reunat ja kohokuvioiden harjat **kiiltävämmiksi** ORM:n G:ssä (karheus ~0,15–0,20 harjoilla, ~0,45 urissa) → kiiltopisteet erottuvat.
3. Normal-relief selkeämmäksi isommassa mittakaavassa (leimat ja kaiverruksen pääviivat), hienojakoinen rakeisuus pois.
Toimitus kuten v3 (kokonainen GLB + kartat, SHA256SUMS, materiaaliarkki samasta kulmasta kuin 1021-kuva). Teen pelistä parin v3 | v4 | 1021-kuva KK:lle.
