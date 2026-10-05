# Olavinlinnan osoitin c116f02f → 8f4eb611 (esittelyn avainsanat) — omistajan Run-rivi

Linnanrakentaja 5.10.2026. Päätoimittaja vie aamulla. Osoittimen vaihto on omistajan käsiajo (pysyvä linja).

## Mitä vaihtuu
- Osoitin `dioraama/olavinlinna/uusin.json`: `c116f02f589bfaaf` → `8f4eb611c0e1cce7`.
- Sisältö: vain esittelyn avainsanat (`kertoja.jaksot[].avainsanat`, 6 kpl: 1475 Rakentaminen alkaa · Erik Akselinpoika Tott ·
  Linnanvouti · 1743 Turun rauha · 1812 Vanha Suomi · Oopperajuhlat). Manifestissa eroaa pelkkä rakennus.json; muut tiedostot samat.
- Siirtoseppä todensi 8f4eb611:n simussa 5.10. yöllä: kaikki 6 avainsanaa ajallaan (natiivi linna-palaute-142 @ f531743e, juna 142).

## Ennakkoehdot (tarkista ennen ajoa)
1. **Ei linna-ajoja käynnissä** simulla eikä iPadilla (Julkaisija tarkistaa; osoitin ei kesken linna-ajon).
2. **PR #3974 on mainissa** (juna 142), ja mainin push-ajon hash on `8f4eb611c0e1cce7` (Julkaisija ilmoittaa). Jos main sisältää
   jo muita olavinlinnan datamuutoksia ja hash on eri, tämä rivi EI päde — kysy Päätoimittajalta.
3. **BUILD 141 sietää uuden datan:** uusi kenttä `avainsanat` on vain lisäys (vanha natiivi ohittaa tuntemattoman kentän),
   kaikki muut tiedostot ovat samat kuin nykyisessä osoittimessa c116f02f. TF 142 toimii myös vanhalla osoittimella ilman avainsanoja.

## Run-rivi (yksi komento)
```bash
gh workflow run vie-dioraama.yml --repo ravelius/Matkakirja --ref main -f rakennus=olavinlinna -f kuiva=false -f osoitin=true
```
Ajo rakentaa mainin paketin (sama hash 8f4eb611, jo ämpärissä, ei uudelleenlatausta) ja vaihtaa osoittimen siihen.

## Tarkistus ajon jälkeen
```bash
curl -s "https://media.matkakirja.app/dioraama/olavinlinna/uusin.json?t=$(date +%s)"
```
Odotettu: `{"rakennus":"olavinlinna","hash":"8f4eb611c0e1cce7","polku":"8f4eb611c0e1cce7/"}`
