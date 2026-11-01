# Neljä yhteistä simulaattoria (Julkaisija 1.11.2026, omistaja KK 10.41)

1. **Yhteiset (T7-sarja, simctl rename):** yhteinen-iPad13 00CF62C2, yhteinen-iPad11 F7513985, yhteinen-iPhone18 A885020B,
   yhteinen-iPhone DA0AAEEA. `proto-3d/tyokalut/simusarja-udid.tsv`: nämä 4 + vanhat nimet aliaksina (sarake 3: vanha sisäinen ja
   vanha T7-UDID → `mk_kaanna`/`mk_udid` ohjaavat saman laitetyypin yhteiseen). Vanha taulu: `simusarja-udid.tsv.ennen-yhteiset-20261101`.
2. **Vuorolukko:** `proto-3d/tyokalut/simu-lukko.sh kaari <rooli> <simu> -- <komento>` (myös `varaa`/`vapauta`/`tila`), lukko
   `/tmp/matkakirja-simu-<UDID>.lukko`, varattu → 75. Lukon ajaksi käynnistyy simu-muistivahti (`SIMU_MUISTIRAJA`, oletus 12 Gt);
   vapautus sammuttaa simun. Muistivahti ei ollut rikki: se käynnistyi vain käsin vuoron annossa (viimeksi 28.10.), nyt aina lukon kautta.
3. **Viittaukset:** 863 täyttä UDID:tä 772 skriptissä (proto-3d/tyokalut, proto-3d/_tyo, julkaisija-tyokalut) korvattu saman
   laitetyypin yhteisellä; alkuperäiset `/Users/Shared/Claude/_levy/simu-korvaus-alkuperaiset-20261101.tar.gz`. 8-merkkiset jäivät
   vain kommentteihin. Tässä PR:ssä `tools/pariteetti-ajo.mjs`. Peili `Matkakirja-proto/tyokalut/palvelu/` (juna-ajo.sh,
   proto-kaanna.sh, taulut) on vielä vanha → NS:n peilipäivitys.
   **Poistokomento (omistaja ajaa):** `/Users/Shared/Claude/_levy/simu-poisto-20261101.sh` – 28 T7-simua 265,1 Gt +
   T7/Simulaattorit/Devices 115 Gt + sisäinen D9822C57 3,2 Gt ≈ 383 Gt.
4. **Löydökset:** juna-vahti "VIKA tarkista:" (471×): pysyvä taukolippu katosi lokien siivouksessa (28.10.) → vahti yritti
   10 min välein vanhaa juna/b37:ää, jonka Unity 6000.7.0b5 puuttuu. Korjaus `juna-ajo.sh`: lippu myös `tyokalut/juna-tauko`
   (palautettu), epäonnistunutta kärkeä ei yritetä uudelleen (`juna-vika-viimeisin.txt`), SIMS ilman kaksoiskappaleita.
   `siivoa-pariteettisimut.sh` pois käytöstä (tynkä + `.pois-kaytosta-20261101`), yösiivous korvaa.
