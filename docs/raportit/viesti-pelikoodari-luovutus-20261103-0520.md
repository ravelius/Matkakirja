# Pelikoodari: luovutus 3.11.2026 klo 05.20 – juna 218

Edellinen: -20261103-0438 (01398be98) – voimassa, ellei alla toisin. Syy: konteksti (~30 %).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (paikallinen), kärki **a31589350**.
Rungot (= kärki + piirtajat-218 b51e69a8b, merge-tree + commit-tree): 218r be9e92cce (sarja ajossa), 218s a9226c5cf (vain taso1b11),
**sali-218t b3daaf599** (koko sarja jonossa). Peli-testit 803/803, unity-tarkistus 0 virhettä, liike- ja kameravahti ok.

## PT:n linja 04.3x (SITOVA, ennallaan)
Jokainen korjaus koko sarjaa vastaan (yk cx tj ty th xf cc ys + taso1b), tulos PT:lle taulukkona ≤ 3 riviä + polku. Tavoite 0 (massassa,
reunassa, piilossa) ennen KK:ta. `python3 -I /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218b/mittari-taulukko.py [nimet]`.

## Tehty tässä vuorossa
- **cfd94d57a** mittari: maalikuvan kamera massassa/reunassa erikseen ("(maalikuvassa M/R)" yhteenvetoon). Syy: cx/tj/ty 218r:ssä
  ~350–480 ruutua maalikierroksessa hallin häivytetyn katon sisällä, kuva siisti. Taulukko erottaa myös vanhat ajot (peli = viimeinen
  yhteenveto ennen maalia, merkitty ≥; maali ~).
- **a31589350** läpikulun katto myös avoimen oven aukosta: JuoksuSokkeloMaailma.OviAukonYla (avoin ovi, jonka aukon jana kamera → keisarin
  edusta ylittää → lehtien yläreuna), raja = yläreuna − 0,5 (≥ DroneNosto.OviMinYla 1,8). Syy: th 045523 0,6–0,8 s päätyoven palkki
  täytti ruudun (katto 4,2 m porttirakennuksesta, ovipalkit eivät ole peittokartassa). → runko 218t.
- mittari-taulukko.py: sarake "maalikuvassa", taso1-tallenteen väärä "VIKA kuvia ei syntynyt" ohitetaan (video syntyy, png:t ei).
- Ajoskriptit: sali-218b/ketju8t.zsh (tallettaa 218r:n lokit aja-<n>-218r.log, sitten ketju8s rungolla 218t),
  tallenne-218t/ketju-taso1b11.zsh (218s), ketju-taso1b12.zsh (218t).
- Havainnot: sali-218b/salit-218l-havainnot.md (cx, tj, ty, th 218r + taso1b10).

## 218r-tulokset tähän asti (peli / maalikuva)
- cx: massassa 3, reunassa ≥169, piilossa 53 | maali ~28/~477. v3 1,6–3,0 s kamera ristikkoseinän kulmassa.
- tj: 47, ≥12, 28 | ~481/~69. s ~24 ristikkoseinän palkki; s 43–45 valtaistuinsalin oven/sermin läpi.
- ty: 21, ≥9, 55 | ~349/~150. s 13,4–14 räystäsnosto 6,7 m:iin juuri ennen läpikulkuhallia → ristikon läpi, suoja veti 3,2 m.
- th: 41, ≥222, 73 | ~0/~30. alku s 0–11: päätyoven palkki (→ a31589350), kapean ristikkokäytävän seinä (polkukamera ei alkanut).
- xf: 61 (182 s juuri ennen maalia), ≥39, 248 (92 ruutua juhlasalin räystään takana) | ~464/~24.
- cc: 0, ≥1, 14 | ~419/~61. yk: 44 (239,7 s), ≥40, 45 | ~468/~2.
- taso1b10 (be9e92cce): massassa 8, reunassa 18, piilossa 0, vetoja 15. Päälakiveto ei palannut.
- Yhteinen kuvio: kulma/ristikkojulkisivu juuri läpikulun tai hallin edessä → 218s:n polkukamera (katonAlitus) on tähän tarkoitettu.

- taso1b11 (218s a9226c5cf): 8/19/0, vetoja 15 = sama kuin 218r.
- **Taulukko lähetetty PT:lle 05.1x**: sali-218b/taulukko-218r.md (ys vielä vanha 69d9ef321).

## Ajojen tila (JU 05.16)
- L1: ys-uusinta (218r mittari), sitten ketju8t (218t koko sarja; 218r-lokit talteen aja-<n>-218r.log).
- L2: VS pim4, sitten taso1b12 (218t).

## SEURAAVA
0. **PT 05.2x (kuitattu lähtötaso, mittarijako oikein): ENSIN xf (massassa 61 @182,4 s, piilossa 248, 92 ruutua @182,8 s juhlasalin
   räystään takana) – selvitä syy ennen pienempiä.** Loki /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261103-045946, video
   sali-218b/20261103-045946-xf-v3.mp4. 218t:n taulukko PT:lle RINNAKKAIN 218r:n kanssa (per sali muutos): mittari-taulukko.py yk-218r yk cx-218r cx …
1. ys-uusinnan (218r) rivi taulukko-218r.md:hen (ys-218r, jos ketju8t jo kopioi).
2. 218t-sarjan valmistuttua sama taulukko → vertailu 218r vs 218t PT:lle. Tarkista erityisesti th alku (ovipalkki), ty s 14, cx s 14, tj s 24.
3. Jos kulma/ristikkojulkisivu jää: räystäsnosto juuri ennen läpikulkuhallia (ty s 13,4: "räystäs kameran vieressä … 6,1 → 6,7") vie
   kameran yli → harkitse nostoa pois, kun keisarin edessä LapikulkuEdessaM:n sisällä on halli/läpikulku. Polkukamera ei ala juoksun alussa
   (polkuhistoria tyhjä, th).
4. Ennallaan edellisistä: ys 1.2 räystään parrut, xf:n ovisarja, seinähäivytys pois (omistaja 10.43), KK:n paketti vasta puhtaana.
