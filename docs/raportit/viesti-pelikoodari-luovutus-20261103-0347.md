# Pelikoodari: luovutus 3.11.2026 klo 03.47 – juna 218

Edellinen: -20261103-0310 (cd537028f) ja -0250: niiden tiedot (KK:n linja: yksi koottu paketti, ei leikkauksia; valtaistuimet) ovat
voimassa, ellei alla toisin. Syy: konteksti (kontekstivahti 27 %).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (paikallinen), kärki **2b35d116f**.
Rungot (merge-tree kärki + piirtajat-218 b51e69a8b): **sali-218l 4b66cc5d1** (+ ovilehti 29ce76631), **sali-218m 64ae0d7cd**
(+ laattareuna f4c11adf8), **sali-218n 6bd1e7463** (+ syyloki 2b35d116f). Peli-testit 800/800, unity-tarkistus 0 virhettä.

## Tehty tässä vuorossa
- **29ce76631** ovilehden kamerasiirto (OviLehtiJanalla) vain, kun jana osuu itse lehteen. taso1b6:n hyppy "kamera ovilehden edessä
  0.1 m" ei enää laukea (taso1b7), MUTTA hyppy jäi: syy oli toinen (alla, avoin 1).
- **f4c11adf8** peittokartta MatalaReuna 0,1 → 0,15 m (+ testi): avoimen työhuoneen (avoimet-v52/tyohuone.glb) lattia on 6 m:n
  laattoja, 0,11 m paksuja (−0,09…0,02); pystyreunat huoneen keskilinjalla (= kameran reitti) → "rakennusmassassa ala −0.1" koko
  huoneen läpi ja Massassa-nosto huipun yli. Todennäköinen syy vikaan 1 (yk 0,5 s ja 6–7 s: kamera kattotiilissä/palkistossa) ja
  cx:n alkuun (0,5–1 s kattotiilet, ylityssuoja 5,1 m). Ei vielä nähty pelissä (yk/cx rungolla 218n pyydetty).
- **2b35d116f** kamerasuojan syyloki: "kamerasuoja syy, kamera ennen (…): (x, z) huippu H ala A [huoneessa];" = mikä suojan viidestä
  pisteestä (±KameraSuoja.Vara) oli massassa. + Peli-testit/Testit/SaliSolmuDiag.cs (verkon solmut pisteiden ympärillä; käyttö tiedoston
  alussa, juuri /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juuri-v117).
- MAALI VALTAISTUIMEN ETEEN: sk3-{yk,cx,tj,ty,cc,xf,ys}.txt maali = valtaistuimen eteläinen kehäsolmu (SaliSolmuDiag): yk −107.55,375.48;
  cx −109.88,426.93; tj −163.64,320.46; ty −164.35,340.45; cc −165.41,370.43; xf −165.67,419.95; ys −106.21,323.50. th ennallaan.
  Syy: cx:ssä maali oli 6 m valtaistuimen takana → keisari kiersi sermin taakse, kamera kulki sermin ja seinän läpi 8–11 s ennen kierrosta.
  Joka salissa 4 solmun kehä valtaistuimen ympärillä. HUOM: tee-sk3.zsh ei tunne uusia maaleja (älä aja sitä uudelleen tai päivitä se).
- Havainnot: tallenne-218t/taso1b6-havainnot.md, sali-218b/salit-218l-havainnot.md, arkit sali-218b/arkki-*-{yk,cx}.jpg.

## Tulokset (218l)
- taso1b6 (218k): kujaportti-3:n umpimassa POISSA (v114/v37 toimii). taso1b7 (218l): ks. avoin 1.
- yk 032709: VALTAISTUIN OK (sijoitus + kierros + Maali-kortti, Puyi korokkeella kasvot kameraan). Vika 1 yhä (→ 218m/n).
- cx 033318: valtaistuin OK kierroksessa; vika: 8–11 s sermi + seinä (→ maali korjattu), 0,5–1 s kattotiilet (→ laattareuna?).
- th 033818 valmis, EI KATSOTTU (12 PIILOSSA-riviä, 26 suoja/ylityssuoja-riviä lokissa). Ketju jatkuu tj ty cc xf ys (uudet maalit).

## Avoimet
1. KUJAPORTTI-3 HYPPY (taso1 ~42 s, kamera.txt ~ruutu 2116): "kamerasuoja veto 2.3 m (ruutuja 2) … s 26.3" portin alla: kamera 2,50 m
   (läpikulun katto, alapinta 3,0) z −833,6 → 1,42 m z −836,2 keisarin päälaelle. Kuvassa ei estettä. Portin LOD2:ssa ei kynnystä,
   taustassa v114 ei mitään (PeittoKohtaDiag pohja −138.4,441.x). Syy auki → taso1b9:n syyloki kertoo pisteen, huipun ja alan.
   Vaihtoehto, jos syy on peittokartan 1 m:n ruutu: kamerasuoja ei vedä läpikulun katon alla (läpikulku pitää jo kameran alapinnan alla).
2. Salit: tj ty cc xf ys (218l, uudet maalit) + yk cx (218n) + taso1b8 (218m) + taso1b9 (218n) tulossa JU:lta. Tarkista viat 1–3,
   PIILOSSA, valtaistuin, ettei Puyi kierrä valtaistuimen taakse.
3. Yksi koottu paketti KK:lle vasta kun kaikki 8 + tason 1 alku puhtaita (viat kerrottuina, siirto kierroksen leikkauksessa).
4. Arkiset hahmot (Codexin paketti ei postilaatikossa 03.2x). 5. VS:n sade (koe, ei junaan; odottaa). 6. Siivoukset.

## JU:lle pyydetty (03.25, 03.31, 03.46)
- käynnissä: L1 `RUNKO=pelikoodari/sali-218l … ketju8s.zsh yk cx th tj ty cc xf ys` (yk cx th valmiit), L2 taso1b8 (218m).
- sen jälkeen: `RUNKO=pelikoodari/sali-218n zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218b/ketju8s.zsh yk cx` ja
  `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/tallenne-218t/ketju-taso1b9.zsh`. (ketju-taso1b8 = 218m.)
