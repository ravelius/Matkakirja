# Pelikoodari: luovutus 2.11.2026 klo 03.40 – TF 217

Edellinen: -20261102-0310. Tilaus (PT, omistajan yölupa 23.29): SHA:t NS:lle (local_99130238) runkoon 217, tallenteet PT:lle (local_5df52e10).

## Valmista tässä vuorossa (proto-git, worktree /Users/Shared/Claude/wt/proto-pelikoodari-korjaus-217)
- 22de5be30 (haara pelikoodari/korjaus-217; sisältää effb7dd83) → NS 03.39: kameran FPV-kallistus pieneksi (JuoksuNojaus.Drone*: kääntö 0,11 → 0,035,
  sivu 0,6 → 0,2, katto 16 → 5°). Taso1d-mittari: drone ≤ 4,8° (ennen 11–15°), Puyin nojaus ennallaan 13–17°. JuoksuNojausTestit rajat ≥ 3° / ≤ katto.
  Korjaa PT:n "vinot muurit" (taso1c 0.24–0.27) ja bugin 13 kallistusosan; bugin 13 kääntö (~25° 0,2 s ohjauksen siirrossa) ei tarkistettu.
- 980b0b10a (haara pelikoodari/rakennukset-v93-217, 0de77ca2b:n päälle) → NS 03.3x: RakennusKansio v92 → kielletty-rakennukset-v93 (LAV bugi 9). JU vei 03.32.
- Tallenne: proto-3d/_tyo/pelikoodari/tallenne-217/20261102-031731-taso1d.mp4 (+ -kallistus-20-32s.mp4, -muuriportti-62-68s.mp4) PT:lle.
  Ajettu haarasta pelikoodari/tallenne-217 (31d8e3ea6 = effb7dd83, eli osasarja-peitto PÄÄLLÄ). Loki proto-3d/lokit/esikatselu-20261102-031731.

## KESKEN: kamera kapeissa muurikuluissa (PT:n este 2)
- LÖYDÖS: osasarja (taustasta tausta-v80/v81 poistetut muurit) ladataan RakennaPeitto-kutsujen JÄLKEEN (Palatsi.cs ~550 vs 398/401) eikä sitä
  lisätty peittokarttaan → Huippu/Massassa/PeittaaNakyman/muurihaku eivät näe palatsin muureja.
- Lisätty LisaaOsasarjaPeittoon (Osasarja.cs, ennen Viimeistele, LOD1-palat taustasäikeessä; 3194 palaa, 1,25 M kolmiota, 1 s). QA
  `palatsi osasarja-peitto 1`. OLETUS POIS (22de5be30), koska taso1d 66 s: kamera kulki muuriportin aukon yläpuolisen muurin läpi
  (Puyi ≈ (85, −541) → (82, −537), 0,2 s täysin punaista); taso1c ilman muutosta 0 punaista ruutua. Kameraloki silti "muurit v/o 3.0/3.0",
  huippu 0 → joko muurit ovat kauempana kuin 3 m (portti kulkusuuntaa vastaan poikittain) tai kartan kehys/palat väärin. SELVITÄ ENSIN:
  vertaa Huippu kohdassa (85, −541) kytkimellä 0/1 (QA-lokirivi tai lyhyt skenaario), tarkista kehys = juuri.worldToLocal·palatsiJuuri.localToWorld·pala.
- Vanha taso1c ~1.03 (kahden muurilaatan välinen kulku) ja ~0.45 (kulma z ≈ −687) ennallaan.

## Muut
- Bugi 12 (oliivinharmaa palkki 1.10, ruutu 11_): matalan tasanteen etupinta ilman tekstuuria = mallivika → LAV (voi olla korjautunut osamallit v7/v8:ssa).
- Skenaario: `zsh aja-sk.zsh sk-taso1c.txt <nimi>` kansiossa tallenne-217 (haara pelikoodari/tallenne-217 worktree wt/proto-pelikoodari-kivi-216).
