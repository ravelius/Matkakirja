# Pelikoodari: luovutus 3.11.2026 klo 05.40 – juna 218

Edellinen: -20261103-0520 (f0c488eaf) – voimassa, ellei alla toisin. Syy: konteksti (hook 26 %).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (paikallinen), kärki **fd1b326b2**.
Runko **pelikoodari/sali-218u 3bf45fc3a** (= fd1b326b2 + piirtajat-218 b51e69a8b, merge-tree + commit-tree). Peli-testit 803/803,
unity-tarkistus 0 virhettä.

## PT:n linja (SITOVA)
04.3x ennallaan (koko sarja, taulukko ≤ 3 riviä + polku, tavoite 0/0/0). PT 05.4x: "Jatka eteläoven palkin kameraan; taulukko 218u
rinnakkain 218r/218t kanssa PT:lle kun sarja ajettu."

## Tehty tässä vuorossa
- **xf 045946 syy (PT:n etusija):** massassa 61 = taustan puukortti kk-tausta-1-3-lod1.glb V4_puukortti y 0–12,12 m (pagodipuu)
  peittokartassa umpimassana → nosto kohti 12,1 m:ä ja suojan 5,8 m:n veto yhdessä ruudussa. **Korjaus fd1b326b2**
  (JuoksuSokkeloMaailma.Palatsi.cs RakennaPeitto: PuukortinAines-ryhmät pois; rungot jäävät). PT:lle lähetetty, PT kuittasi.
- Ajot rungolla 218u omassa kansiossa /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218u (ketju-u.zsh, aja-sk.zsh PROTO_LINJA
  ympäristöstä). mittari-taulukko.py: nimi `<sali>-218u` lukee sali-218u-kansiosta (esim. `xf-218r xf xf-218u`).
- JU:lle pyydetty: L2 xf 218u (alkoi 05.38), L1 koko 218u-sarja (yk cx tj ty th cc ys) ketju8t:n (218t) jälkeen.
- taulukko-218r.md: ys-rivi täytetty (47, ≥7, 80, vetoja 350).
- Havainnot: sali-218b/salit-218l-havainnot.md loppu (xf-syy, eteläoven palkki, taso1b12).

## Avoimet
1. **Eteläoven palkki (xf 218r, kameraloki 191,3–191,6):** kamera juhlasalin eteläoven palkissa / räystään tiilissä (y 3,9) Puyin
   kääntyessä ovelta itään. 218t:n OviAukonYla (a31589350) voi korjata (avoin ovi kamera → keisarin edusta). Tarkista 218u-xf:stä
   (sali-218u/<aika>-xf-v3.mp4, kameraloki kamera-<aika>-xf.txt, sama kohta ~1,5 s ennen maalia). Jos jää: kamera oven takana
   räystään sisällä, kun ovi ei enää ole janalla → seuraava korjaus.
2. **taso1b12 (218t) huononi:** 14/24/0, vetoja 34 (218s 8/19/0/15); uusi jakso 225,8 s samassa kulmassa, läpikulun katon kohde 2,2 m
   (218s 2,5) – epäily OviAukonYla, EI varmistettu (ks. havainnot). Lisää loki OviAukonYlaan tai vertaa kameralokit.
3. Kun 218t- ja 218u-sarjat valmiit: `python3 -I sali-218b/mittari-taulukko.py yk-218r yk yk-218u cx-218r cx cx-218u …` → PT:lle
   taulukkona rinnakkain (≤ 3 riviä viestissä + polku). HUOM: ketju8t kirjoittaa 218t:n aja-<n>.log:iin sali-218b:hen.
4. Ennallaan: ty s 13,4 räystäsnosto, polkukamera ei ala juoksun alussa (th), ys 1.2 räystään parrut, seinähäivytys pois
   (omistaja 10.43), KK:n paketti vasta puhtaana.
