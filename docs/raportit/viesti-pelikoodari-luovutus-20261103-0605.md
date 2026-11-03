# Pelikoodari: luovutus 3.11.2026 klo 06.05 – juna 218

Edellinen: -20261103-0540 (1e62938da) – voimassa, ellei alla toisin. Syy: konteksti (hook 25 %).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (paikallinen), kärki **ce9b471d2**.
Runko **pelikoodari/sali-218v 9bb85b321** (= ce9b471d2 + piirtajat-218 b51e69a8b, merge-tree + commit-tree). unity-tarkistus 0 virhettä,
vahdit ok, peli-testit 803/803 (ed796b6e8; myöhemmät muutokset vain Unity-koodia).

## PT:n linja (SITOVA)
04.3x ennallaan (koko sarja, taulukko ≤ 3 riviä + polku, tavoite 0/0/0). PT 05.4x: taulukko rinnakkain PT:lle, kun sarja ajettu.
218u-sarja peruttiin (JU) → taulukko **218r / 218t / 218v**.

## Tehty tässä vuorossa
- **Oviaukko ei ole massaa (ed796b6e8, 52b148eea, ce9b471d2):** peittokartan 1 m:n ruutu oven kohdalla on massaa maasta (pielet + palkki),
  vaikka kamera on 2,4 m:n aukon keskellä (lokin "ovi aukeaa (x, z)" = oviparin keskikohta o.Keski). Syy sekä taso1b12:n 225,8 s
  hypylle (suoja veti 1,8 m) että xf-218u:n ovisarjan vetoihin (305) ja piilojaksoihin. JuoksuSokkeloMaailma.OviAukossa (avoimen
  pariovien saranaväli − 0,35 m, seinän tasosta 1,0 m, lehtien yläreunan alla): ei massaa kamerasuojalle, mittarille (massassa ja
  reunassa, JuoksuV4Maailma.KameraMassassa) eikä peitä näkölinjaa (PelaajaPiilossa → näkyvyysnosto ja piilomittari).
  OviAukonKaista: seinän toisella puolella oleva kamera pysyy aukon sivurajoissa (lähestyessä 2 m pehmeästi, 1 m:n kaistalla heti).
- **Juoksun 1. ruutu (ff16d883a):** puomi suoraan valittuun ehdokkaaseen. Syy avoimeen 1:een (eteläoven palkki): xf-218u v3 0–0,5 s
  kamera aloitti juhlasalin sisältä täydellä puomilla (keisari ulkona, salin ovi ei auki) ja kulki ovipalkin ja räystään läpi;
  mittari ei laskenut (suoja veti), kuvassa palkki/räystäs.
- xf-218u (3bf45fc3a): massassa 61 → 0 (puukortti ok), vetoja 305, piilossa 215. xf-218v (631646db7, ilman puomi- ja 1,0 m -muutosta):
  massassa 0, reunassa 324 (raaka oviruutu, korjattu ce9b471d2), piilossa 148, vetoja 127.
- mittari-taulukko.py: nimet `<sali>-218v` (ja -218u) lukevat omasta kansiosta; puuttuva loki → "ei ajoa".
- Havainnot: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218b/salit-218l-havainnot.md (loppu).

## Ajot (JU)
- 218t-sarja valmis (sali-218b, ketju8t): yk cx tj ty th xf cc ys.
- L2: sali-218v/ketju-v.zsh xf (631646db7, valmis) + taso1b (79cbacf95 = ilman ce9b471d2:ta, alkoi 05.58).
- L1: sali-218v/ketju-v.zsh xf yk cx tj ty th cc ys (9bb85b321, alkoi 06.03). Kansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218v.

## Avoimet
1. Kun L1-sarja valmis: `cd sali-218b; python3 -I mittari-taulukko.py yk-218r yk yk-218v cx-218r cx cx-218v tj-218r tj tj-218v ty-218r ty
   ty-218v th-218r th th-218v xf-218r xf xf-218v cc-218r cc cc-218v ys-218r ys ys-218v` → taulukko tiedostoon + PT:lle ≤ 3 riviä
   (HUOM: 218r-nimet vain jos niiden lokit ovat yhä olemassa; tarkista taulukko-218r.md). Tarkista xf-218v:n v3 alku (0–1 s) kuvina:
   palkki/räystäs poissa?
2. taso1b-218v (79cbacf95) vs taso1b12 (14/24/0/34) ja 218s (8/19/0/15): eteläoven 225,8 s:n hyppy poissa?
3. Ennallaan: ty s 13,4 räystäsnosto, polkukamera ei ala juoksun alussa (th; puomikorjaus voi vaikuttaa), ys 1.2 räystään parrut,
   seinähäivytys pois (omistaja 10.43), KK:n paketti vasta puhtaana.
4. Työlistan hook-kehotus (26 Odottaa-riviä) on PT:n työkalu (tools/asemataulu/tyolista.py) – ei tehty.
