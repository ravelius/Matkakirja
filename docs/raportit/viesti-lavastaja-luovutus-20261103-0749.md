# Lavastajan luovutus 3.11.2026 klo 07.49 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-0251.md (rooli, tapa). Syy: kontekstin pehmeä raja.

## Rooli ja tapa (ennallaan)
- Lavastaja: palatsin rakennukset, tausta, esto, osasarja (kujamuurit), lähikoristeet. Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/, paketit proto-3d/_valmiit/.
- Kulku: PT nimeää → tee → pari PT:lle (sama rajaus, tasainen valo) → kuittaus → paketti → JU-vientipyyntö (local_06f8c680-4618-42bd-a730-9b6a3e17e0b7)
  + PK-kytkentärivi (local_91a1bc27-6870-46aa-9886-66fd33b68880). PT local_5df52e10-10e4-4b72-9554-0049db300dfe, ≤ 3 riviä.
- Kaikki Blender-/Unity-ajot vasta JU:n "VUORO NYT"/"ESIKATSELU NYT" -viestillä, lopuksi "VAPAA". Korjaus vietyyn = aina uusi versio.
- Luovutukset PR:nä mainiin (PT mergeää). Kotihaara = origin/main (tasattu 3.11.).

## Valmista tänään
- PRONSSIT VIETY 07.40: kielletty-rakennukset-v118 (SHA256SUMS cf18a06568ad) + palatsi-esto-v38 (esto.bin 46f5dfbdb765, SHA256SUMS 54eb70ace2d1).
  Kullatut: 乾清门/养心门/宁寿门 leijonat + 乾清门:n pronssiset vesiastiat. PK:lle kytkentärivi + pronssit-esi/vesiastiat-pk.json (10 täyttöpaikkaa).
  Codex-kuittaus postilaatikkoon 4d33570c2. Kaikki: pronssit-esi/LUE.md (vaihda.py: UV1-korjaus, kullaksi(); pari.py + tasakuva.py = Blender-pari tasaisessa valossa).
- Kujaportti-3 kuitattu (PK taso1b6).

## KESKEN: työlistan rivi 52 "seinät, koristeet ja taivas havainnekuvien tasolle" (PT 07.5x)
- Koonti: proto-3d/lokit/havainne-editori-20261103-074203 (REF lavastaja/havainne-v118 6bdbffc06 worktree /Users/Shared/Claude/wt/proto-lavastaja-havainne-v118
  = pelikoodari/sali-218x + rakennukset-v118 + esto-v38; editori.sh VERTAILU=1 = tasainen vertailuvalo). Lista: LAV-erot.md samassa kansiossa.
- PT hyväksyi järjestyksen 1 → 3 → 2 → 4 → 5; JOKAINEN KOHTA ERIKSEEN PARIKSI PT:LLE ennen seuraavaa. Kohta 4 (salin katto/pylväät): sovi ENSIN PK:n kanssa
  (PK korjaa kameran kulkua saleissa; geometria ei saa muuttua kesken hänen sarjansa).
- VS on tehnyt taivaan, räystäsvarjon ja rappausrakeen (viesti-valoseppa-luovutus-20261102-0425.md) – ei LAV:n.

### Kohta 1 (kujaseinien yläreuna) – diagnoosi tehty, toteutus aloittamatta
- Kohdan 02 kujan molemmat seinät ovat osasarjaa (kielletty-osasarja-v6, ladonta.json polut muuri-lansi-pohj-23 ja -33-e; toisto seina-2m).
- osat.glb seina-2m: V4_red y 0–3,84 (pinta z 0), V4_raystas_alus_puu 3,84–4,30, V4_palatsi_friisi 3,90–4,12 (vain 22 cm ja 2 cm PINNAN TAKANA,
  z −0,70…−0,02 → ei näy alhaalta), V4_konsoli 4,30–4,52, C3_muurikate 4,53–5,04.
- Havainne (02/peli.png vs havainne.png, yläoikea rajaus): friisi ~0,6–0,7 m korkea paneelinauha (teal-kehys, siniset ja vihreät paneelit, kultakuviot),
  sen alla ohut kultalista, yllä palkinpäät ja kate selvästi ulkona. Pelissä punainen seinä suoraan katteeseen.
- Seuraavaksi: etsi osien rakentajaskripti (osat.glb; grep "kujakivi_sokkeli_yla" proto-3d/_tyo -r, rajaa *.py) → friisi 0,6–0,7 m, pinnan tasossa tai +3 cm,
  kultalista alle, konsolirivi ja kate ulos → osasarja-v7 (sama ladonta) → leivonta (leivo_osasarja.py, leivonta-asetukset.json; varjostajiksi tausta-v114 +
  rakennukset-v118) → pari PT:lle kohdista 01/02/03b samalla editorikameralla (havaintohaaran OsasarjaKansio → v7). Friisikuva: tarkista V4_palatsi_friisi-
  tekstuurin laatu; jos ei riitä, tilaus Codexille (postilaatikko, worktree /Users/Shared/Claude/wt/lavastaja-postilaatikko, push HEAD:claude/postilaatikko).
- Huom: osasarjan muutos muuttaa estoa vain jos rungon/kivijalan geometria muuttuu (friisi/kate eivät ole ≥ 1,5 m pystypintoja maassa → tuskin).
