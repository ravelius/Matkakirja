# Lavastajan luovutus 3.11.2026 klo 11.10 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-1020.md (rooli, tapa, K-polut). Syy: konteksti 25 %, kohta 3 odottaa editoriparia.

## Rooli ja tapa (ennallaan)
- Lavastaja: palatsin rakennukset, tausta, esto, osasarja, lähikoristeet. Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/ (K = …/kielletty-rakennukset).
- PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä), JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, PK local_91a1bc27-6870-46aa-9886-66fd33b68880.
- Blender/Unity vain JU:n "VUORO NYT" -viestillä, lopuksi "VAPAA".
- Editoripari: zsh /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99/tyokalut/havainne/editori.sh 01 02 03b, env REF=<sha> RUNKO=<sha>
  PROTO_LINJA=<JU:n linja>; ajo taustalla skriptitiedostosta (malli proto-3d/lokit/lav-kohta3-20261103/unity/aja.zsh).

## Rivi 52 kohta 1 (friisi) — PT KUITTASI 3.11. ~11.00 (pari havainne-editori-20261103-105043, pohja 8b303cc30). Valmis.

## Rivi 52 kohta 3 (reunakivi) — TEHTY, odottaa editoriparia → PT
- Diagnoosi (proto-3d/lokit/lav-kohta3-20261103/KOHTA3-DIAGNOOSI.md, lue KORJAUS-osa): pelin "vino luiska" = osasarjan PELIN ITSE PURSOTTAMA
  reunakivi (ladonta.json profiilit, ei glb:ssä; osasarja_pari.py EI piirrä pursotuksia). Muurilinjat osasarja = tausta (vinous_haku.py: ei vinoutta;
  taustan muuri on itse 2,3° vinossa, kuja kapenee = paikkatieto). Pohja-x = pelin maailma −x.
- PT 11.0x "jatka": osasarja-v9 = v8 + profiilit reunakivi/reunakivi-taka 0,45 × 0,30 m (pystypinta + 2 cm viiste), pinta V4_kujakivi_lattia.
  osat/valo = v8 tavulleen (leivonta ei käytä pursotuksia). Esto K/osasarja-v9/esto-tarkistus.zsh = 46f5dfbdb765 = esto-v38.
- Paketti _valmiit/juoksupeli-kk-lavastaja-osasarja-v9-vienti-20261103 (SHA256SUMS 335ee3af60b4), JU VIETY 11.06.
- PK kytki: pelikoodari/kapea-reitti-218 f8dd0bcaa (= 8b303cc30 + v8→v9). Junaehdokas juna-218-z eb2b057bc vielä v8:lla → v9 junaan PT:n kuittauksen jälkeen.
- AVOIN: editoripari 01 02 03b REF=f8dd0bcaa (JU:n jonossa, "VUORO NYT L<n>") → PT 3 rivillä; katso 02:n oikea alakulma (reunakivi porras, harmaa).
  Jos sävy ei osu: vaihtoehto pinnaksi V4_kujakivi_sokkeli_yla.

## Seuraavat (PT:n järjestys 1 → 3 → 2 → 4 → 5)
- Kohta 3 loppuosa: sokkelin kerrokset (~⅓ seinästä, selvät kivikerrokset) ja kansikivi — pintamuutos erikseen PT:n kanssa.
- Kohta 2, sitten 4 (sali, ensin PK:n kanssa) ja 5 (proto-3d/lokit/havainne-editori-20261103-074203/LAV-erot.md).
