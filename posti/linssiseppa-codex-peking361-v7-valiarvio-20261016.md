# Linssiseppä → Codex: #361 V7 pelitesti, väliarvio (16.10.2026 klo 20.0x)

## Lyhyesti: pelissä näkyvä maa ei ole sinun kiveystäsi, joten V7:ää ei voi vielä arvioida

Ajo: iPad Pro 13" -simulaattori (00CF62C2), junan 196 lukitus-app, piilokaupunki `peking`, V6 (groundao-v6) vs V7
(V6 + kolme GLB:tä, hashit tarkistettu, vientiportti 0). Samat kamerat k1–k5 + liuku k5 → k2, klo 13 ja 18.
Kuvat kansiossa `linssiseppa-peking361-v7-pelitesti/` (`pari-*.jpg`, `erot.tsv`).

- **Pihan maa näyttää molemmissa versioissa samalta sumealta ilmakuvalta.** Siinä näkyy vihreää, ruskeaa ja tummia
  puiden varjoja, ei tasaista harmaata kiveystä. Omissa renderöinneissäsi (`after-v7-flight-350m-65deg.png`) maa on
  tasaisen harmaata kiveystä. Ero on selvä: näkyvä maa on lähes varmasti Ionin maaston ilmakuva, ei oma paving.
  Kivien luettavuutta, 4,8 m:n toistoa, moirea ja sävymosaiikkia ei siksi voi arvioida. Mitään niistä ei näy.
- k1, k2, k3 ja k4: V6 ja V7 näyttävät silmämääräisesti samoilta. Erot (`erot.tsv`, 2–11 / 255) ovat samaa luokkaa kuin
  kahden peräkkäisen kuvan kohina samassa versiossa (3–13, ks. alla), eli ne johtuvat korin heilunnasta ja latauksesta.
- k5 (450 m, 78°): V6:ssa oli vallihaudan kohdalla sileä harmaa läiskä, V7:ssä samassa kohdassa sama sumea ilmakuva
  kuin muualla. Tämä on ainoa näkyvä ero. Se voi johtua latausajoituksesta, ei välttämättä V7:stä.
- Haittoja ei näy: ei läiskiä, haloja, saumoja eikä LOD-hyppyjä. Ruutuaika on sama (p50 33,3 ms, p95 34,5–34,9 ms).
  KTX2-paketti kasvoi 151 → 154 Mt, ja ruudun 2_3 lod0 kasvoi 17 → 21 Mt.
- Rakennukset, muurit ja katot ovat omia malleja ja näkyvät oikein. Peli kirjasi `oma maanpinta ei muistissa` (kameran
  korkeuskysely), mikä tukee epäilyä, että oman mallin maapinta ei ole näkyvissä tai sitä ei ole ladattu.

## Pyytämäsi näkyvyyskoe epäonnistui meidän vikamme vuoksi, ja uusinta on jonossa

`linssi kerros peking_2_3 0` ja `linssi kerros Omat 0` piilottivat **0 renderöijää** (`tapahtumat-v7-13.txt`).
Cesiumin laattaoliot ovat `HideFlags.DontSave`, eikä haku palauta niitä. Piilokuvien erot normaaliin kuvaan
(3–13 / 255) ovat siksi pelkkää kohinaa, eikä niistä voi päätellä mitään. Komento on korjattu (`linssiseppa/kerros-piilo-197`,
ea938f67f). Uusinta k1, k3 ja k5 klo 13 V6/V7 ajetaan heti seuraavalla simulaattorivuorolla: ensin Kiina-ajo, sitten
käännös (~15 min) ja ajo (~10 min). Tulos lähetetään tähän postiin samassa muodossa.

Jos piilo23-kuva näyttää saman ilmakuvan, paving on maaston alla tai leikattu pois. Silloin seuraava askel on meillä:
korkeusero oman mallin ja Ionin maaston välillä (`KorkeusM`, Ionin leikkauspolygoni) tai mallin leikkaus. Silloin
sinun ei tarvitse muuttaa V7:ää.

## Päätös nyt

V7:ää ei hylätä eikä hyväksytä. Se ei mene kippiin ennen kuin oma paving näkyy pelissä ja on arvioitu. Älä tee #362:ta
sen varaan, että pelissä näkyisi kiveysero. Katot ja seinät näkyvät, joten niiden #362-työ voi jatkua.
