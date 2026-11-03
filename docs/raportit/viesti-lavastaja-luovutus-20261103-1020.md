# Lavastajan luovutus 3.11.2026 klo 10.20 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-0812.md (rooli, tapa, K-polut). Syy: kohta 1 valmis vientiin, kohta 3 alkaa puhtaalta pöydältä.

## Rooli ja tapa (ennallaan)
- Lavastaja: palatsin rakennukset, tausta, esto, osasarja, lähikoristeet. Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/ (K = …/kielletty-rakennukset).
- PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä), JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, PK local_91a1bc27-6870-46aa-9886-66fd33b68880.
- Blender/Unity vain JU:n "VUORO NYT" -viestillä, lopuksi "VAPAA" (molemmat VAPAA kuitattu 3.11. ~10.15; ei ajoa kesken).

## Rivi 52 kohta 1 (kujaseinien friisi) — TEHTY, odottaa JU-vientiä ja PK-kytkentää
- Punainen rako korjattu: K/tyokalut/tausta_friisi_v115.py sai YK-muuttujan (kuvan yläreuna); ajo Y1=4.34 YK=4.30 v114-kopioon → K/tausta-v115/kielletty-tausta-v115
  (2787 kolmiota; edellinen talteen hylatty-kielletty-tausta-v115-e2-rako). PT: ei uutta paria, muoto ei muuttunut.
- Esto (linja 2, K/tausta-v115/esto-tarkistus.zsh) = 46f5dfbdb765 = esto-v38 tavulleen → ei estomuutosta.
- osasarja-v7 leivottu (K/osasarja-v7/leivo-v7.zsh, 08.37–10.13, 86 ruutua, varjostajat tausta-v115 + rakennukset-v118 + avoimet-v52).
- Paketit _valmiit/juoksupeli-kk-lavastaja-tausta-v115-vienti-20261103 (SHA256SUMS 1b446b7a3ce5) ja …-osasarja-v7-vienti-20261103 (9e7bcefc44fe),
  LAHTEET.md kummassakin, summat tarkistettu. JU:lle VIENTI-pyyntö ja PK:lle kytkentärivi (OsasarjaKansio v7 + tausta v115) lähetetty ~10.15.
- AVOIN: kun PK kytkenyt + JU vienyt → editoripari 01/02/03b (havainne-editori, VERTAILU=1) PT:lle; tarkista samalla rako lähikuvasta.

## Rivi 52 kohta 3 (seinäsokkeli ja reunakivet) — diagnoosi aloitettu, EI toteutusta
Lähde: proto-3d/lokit/havainne-editori-20261103-074203/LAV-erot.md kohta 3 + kuvat 02, 03b, 05 (vierekkain.png). Työkalut: proto-3d/lokit/lav-kohta3-20261103/
(alue_mat.py = materiaalit alueella, profiili.py = poikkileikkaus z-tasolla, vinot.py, osat_mat.py; python3, tausta-tiedostot lod0).
Havainne: harmaa tiilisokkeli ~⅓ seinästä selvin kerroksin + yläreunan kansikivi; kujan molemmin puolin korotettu reunakivi pystypinnalla ja tasaisella kannella.
Peli (kuja 02, kamera x −246,6 z 303 → z 325, oikea seinä = −x-puoli):
- Näkyvä sokkeli on TAUSTAN oma (kk-tausta-0-3-lod0: V4_kujakivi_sokkeli y −0,98…1,80, V4_kujakivi_sokkeli_yla 1,20…1,90 osin vinona), ei osasarjan
  kivijalka-1m (1,20 m, 4 cm seinän edessä) — sama tilanne kuin friisissä (tausta osasarjan edessä).
- Vasen reunakivi: kk-tausta-kuja-0-3 V4_kujakivi_reuna x ≈ −242,37, 0,25 m, pystypinta + 2 cm viisteet (ei luiska).
- Oikea "vino luiska": todennäköisesti kk-tausta-0-3 V4_kivireunus (z 315,3: pystypinta x −250,64 y 0…0,21, kansi 0,28→0,33 noin 1,3–2,3 m leveä, kallistuu
  seinää kohti). VARMISTA kuvasta (Blender-pari JU:n vuorolla, osasarja_pari.py + tyo-*.json kuja 02) ennen muutosta.
- Pelin koodissa ei luiskaa (grep JuoksuV4Maailma*). sokkelo-pinnat-v5 vain mediassa, ei paikallisesti; tarkista tarvittaessa, kenen se on.
Ehdotettu suunta (ei vielä PT:lle): taustan kivireunuksen kansi vaakaan + kapeampi (≈ 0,4 m) pystypintainen reunakivi, sokkelin kerrokset kuvasta
(V4_kujakivi_sokkeli-tekstuuri / UV) ja yläreunan kansikivi suoraksi. Mittoja ja paikkoja ei muuteta; esto tarkistettava (kivireunus maan tasolla!).
Järjestys PT:n mukaan 1 → 3 → 2 → 4 → 5, jokainen kohta erikseen pariksi PT:lle; kohta 4 ensin PK:n kanssa.

## LISÄYS 10.17: PK KYTKI kohdan 1
PK: osasarja-v7 + tausta-v115 kytketty proto pelikoodari/kapea-reitti-218 f7cd1b75a (paikallinen haara, worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99),
SHA256SUMS täsmää, Peli-testit 803/803; junaan 218z-voittajan yhdistyksen mukana (JU vie paketit). EDITORIPARI 01/02/03b POHJAKSI f7cd1b75a → seuraava askel (JU:n vuorolla).
