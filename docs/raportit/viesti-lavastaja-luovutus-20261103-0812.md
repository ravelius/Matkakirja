# Lavastajan luovutus 3.11.2026 klo 08.12 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-0749.md (rooli, tapa, pronssit). Syy: kontekstin pehmeä raja.

## Rooli ja tapa (ennallaan)
- Lavastaja: palatsin rakennukset, tausta, esto, osasarja, lähikoristeet. Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/ (kielletty-rakennukset → T7).
- PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä), JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, PK local_91a1bc27-6870-46aa-9886-66fd33b68880.
- Blender/Unity vain JU:n "VUORO NYT" -viestillä, lopuksi "VAPAA" (JU 08.3x: lyhyet Blender-parit ilman vuoroa, kun L1/L2:lla ei tallennetta kesken; nyt pyydä).

## KESKEN: työlistan rivi 52 kohta 1 (kujaseinien yläreuna) — PT valitsi A 08.1x
Kaikki: proto-3d/lokit/lav-kohta1-pari-20261103/LUE.md (pari-v114-v115.jpg = viimeisin, molemmat kujan 02 seinät saavat friisin).
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset
- osasarja-v7: K/osasarja-v7/kielletty-osasarja-v7 (UV1 + valo.json tehty, EI LEIVOTTU). Työkalu K/tyokalut/osasarja_v7_osat.py (v5-ketju + friisi 3,62–4,30,
  1 cm edessä, kuva koko kaistalle, 1 kierto / 2 m, räystäänalus pois). Rakennus: cd K/osasarja-v3; python3 ../tyokalut/osasarja_v7_osat.py <ulos>
  <v99-maailma-v4>/kielletty-c2-v24 kielletty-tausta-v81; ladonta.json = v6:n. Hylätyt K/osasarja-v7/hylatty-*.
- tausta-v115: K/tausta-v115/kielletty-tausta-v115 = tausta-v114 + friisikaista taustan V4_red-seiniin osasarjan seinäosien kohdalla
  (K/tyokalut/tausta_friisi_v115.py, OSASARJA=…/kielletty-osasarja-v7, 2760 kolmiota lod0, 3 cm edessä, UV1 taustasta → ei leivontaa). Valmis paketoitavaksi.
- Esto: tausta-v115 + osasarja-v7 + rakennukset-v118 → 46f5dfbdb765 = esto-v38 tavulleen (K/tausta-v115/esto-tarkistus) → ei PK-riviä.
- Pari-työkalut: K/osasarja-v7/osasarja_pari.py + aja_pari.zsh [v6|v7|v115] (Workbench tasainen valo, kuja 02: kuja + lähi).
- Peitto-mittari K/osasarja-v7/peitto.py (taustan punainen osasarjan edessä: 1052/2332 osaa, 4–24 cm).

## Seuraavaksi (PT:n kuittaus 08.4x-pariin odottaa)
1. Ohut punainen rako friisin yläreunan (4,30) ja taustan konsolin (4,34) välissä lähikuvassa: harkitse Y1 = 4,34 taustatyökalussa (vain tausta) → uusi ajo
   kopioon v114:stä (tausta-v115 nimi vielä vapaa, ei viety) + esto + pari.
2. osasarja-v7 leivonta: zsh K/tyokalut/aja_leivonta_osasarja.zsh vaatii tyhjän kohteen → kopioi pohja-v7 uuteen nimeen tai aja vaiheet 5–6
   (leivo_osasarja.py + leivonta_karki.py) olemassa olevaan v7:ään; varjostajiksi RK=rakennukset-v118, T=tausta-v115 (JU:n vuoro, ~40 min).
3. Paketit _valmiit/juoksupeli-kk-lavastaja-{osasarja-v7,tausta-v115}-vienti-<pvm> (LAHTEET.md + SHA256SUMS) → JU-vienti + PK-kytkentärivi
   (OsasarjaKansio v7, tausta v115) → editoripari 01/02/03b PT:lle.
4. Sitten rivi 52 kohta 3 (sokkeli ja reunakivet), järjestys 1 → 3 → 2 → 4 → 5; kohta 4 ensin PK:n kanssa.
