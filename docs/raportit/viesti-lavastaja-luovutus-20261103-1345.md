# Lavastajan luovutus 3.11.2026 klo 13.45 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-1110.md (rooli, tapa, K-polut, editori.sh-käyttö). Syy: konteksti 26 %.

## Rooli ja tapa (ennallaan)
- Lavastaja: palatsin rakennukset, tausta, esto, osasarja, lähikoristeet. Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/ (K = …/kielletty-rakennukset).
- PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä), JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, PK local_91a1bc27-6870-46aa-9886-66fd33b68880.
- Unity/Blender vain JU:n "VUORO NYT L<n>" -viestillä, lopuksi "VAPAA". Ketju: esto-tarkistus (Unity) → paketti → JU VIENTI → PK kytkee → editoripari → PT.
- Editoriparin ajoskriptit: proto-3d/lokit/lav-kohta3-20261103/unity/aja-v11.zsh (malli; REF, kuvat 01 02 03b 06, PROTO_LINJA envistä).
- ESTO-SÄÄNTÖ (opittu): JuoksuPalatsiEsto.Seinat laskee seinäksi vain ≥ 1,5 m korkeat pystykolmiot. Älä pilko kivijalkaprofiilia (saumaurat
  vapauttivat 33 ruutua v10a:ssa); alle 1,5 m osat (kansikivi, reunakivi) eivät vaikuta estoon. Ero: tyokalut/esto_ero.py vanha.bin uusi.bin.

## Rivi 52 kohta 3 (reunakivi + sokkelin kansi) — v11 KYTKETTY, PT:n arvio auki
- v9 kuitattu junaan 218 (f8dd0bcaa). v10 (kansikivi + sokkeli_yla) EI junaan. v11 korvaa: K/osasarja-v11 = v9 + kansikivi 0,10 × 0,12 m
  (tyokalut/osasarja_v10_profiilit.py) + reunakiven pinta V4_kujakivi_porras = lattiakivi × 0,72 (tyokalut/osasarja_v11_porras.py:
  uusi materiaali + sijoittamaton solmu pinta-V4_kujakivi_porras osat.glb/osat-lod1.glb; EtsiPinta löytää, PK vahvisti).
- Esto 46f5dfbdb765 = esto-v38. Paketti _valmiit/juoksupeli-kk-lavastaja-osasarja-v11-vienti-20261103 (3b73de48c562), JU viety 13.17.
- PK kytki 1ea2a61e9 (pelikoodari/kapea-reitti-218): osasarja-v11 + rakennukset-v119 + c2-v35, esto-v38.
- Pari proto-3d/lokit/havainne-editori-20261103-133656 → PT 13.4x. 02: reunakivi harmaampi, yhä havainnetta vaaleampi.
  Jos PT pyytää tummemmaksi: TUMMA-env (esim. 0.6) uuteen v12:een samalla työkalulla.
- Sokkelin kivikerrokset: geometrisina ei voi (esto); jäävät pintakuvaan V4_kujakivi_sokkeli (tiilikuvio jo näkyy).

## Rivi 52 kohta 2 (Meridiaaniportti 06) — v119 KYTKETTY, VIKA AUKI
- PT: kaikki kolme aukkoa auki, mitat piirroksesta, sokkeli 3,0 m. Mallissa (v197 →) on jo 3 läpikulkua. Keskiaukon lehdet ovi_V/ovi_O =
  MAALIPORTIN OVET (peli avaa) → jätetty, kerrottu PT:lle (ei vastausta vielä).
- Kivijalka 1,6 → 3,0 m: tyokalut/meridiaani_kivi3.py (VANHA=1.6 KIVI=3.0; UV0 pareittain, UV1/valo ennallaan) lod0/1/2 + c2:n kaiteeton lod0.
  Työ K/meridiaani-v200 (paketti.zsh, esto-tarkistus.zsh). rakennukset-v119 (cf2cdee95e14) + c2-v35 (10fcbea0a759), JU viety, esto = v38.
- AVOIN: parin 06 pelikuvassa sokkeli näyttää yhä matalalta (~1/8 seinästä). Selvitä ensin: mikä malli piirtyy tuolta etäisyydeltä
  (lod1/lod2? lod2:ssa sokkeli on V4_red, ei kiveä — meridiaani_kivi3 siirsi siellä vain marmorin) ja tuleeko näkyvä alaosa taustasta
  (kielletty-tausta-v115) tai muurikatteen c2:sta. Vertaa pelikuvaa 06/peli.png v118-pariin havainne-editori-20261103-074203/06.
- Suunnitelma ja PT:n vastaukset: proto-3d/lokit/lav-kohta2-20261103/SUUNNITELMA.md.

## Muut tehdyt
- PK:lle valtaistuinkorokkeiden mitat 7 salille: proto-3d/lokit/lav-koroke-20261103/koroke-mitat.md (tyokalut/koroke_mitat.py).

## Seuraavat (PT:n järjestys 1 → 3 → 2 → 4 → 5)
- Kohdan 2 sokkelivika (yllä) → korjaus → pari 06 → PT. Kohdan 3 PT:n arvio v11:stä.
- Sitten 4 (salin sisätila, ensin PK:n kanssa) ja 5 (proto-3d/lokit/havainne-editori-20261103-074203/LAV-erot.md).
