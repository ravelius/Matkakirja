# Pelikoodari: luovutus 3.11.2026 klo 04.38 – juna 218

Edellinen: -20261103-0407 (78ad77fe3) – voimassa, ellei alla toisin. Syy: konteksti (25 %).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (paikallinen), kärki **9655e4bae**.
Rungot (= kärki + piirtajat-218 b51e69a8b, merge-tree + commit-tree): **sali-218r be9e92cce** (JU:n ajossa), **sali-218s a9226c5cf** (EI vielä lähetetty).
Peli-testit 803/803, unity-tarkistus 0 virhettä.

## PT:n linja 04.3x (SITOVA)
Ei enää sali kerrallaan: jokainen korjaus ajetaan KOKO sarjaa vastaan (8 salia yk cx tj ty th xf cc ys + taso1b10), ja tulos PT:lle
taulukkona. Tavoite 0 (kamera massassa, massan reunassa, PELAAJA PIILOSSA) kaikissa ennen KK:ta.
Taulukko: `python3 -I /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218b/mittari-taulukko.py` (markdown; sarakkeet massassa,
reunassa, piilossa, suojan vetoja, jaksojen ajat). Massa-sarakkeet vain rungoilla, joissa kameramittari 485105cdc (218r be9e92cce →).

## Tehty tässä vuorossa
- **93e8545e6** suoja läpikulussa taas päällä (vara 0), mutta ei vetoa alle KameraSuoja.LapikulkuLahin 2 m rinnasta (pielen ruutu) +
  testi KameraSuojaLapikulussaEiPaalaelle. Syy: ys 041142 (218q) – 7b99e6a1d:n "ei vetoa läpikulussa" päästi kameran ristikon ja sermin läpi.
- **485105cdc** kameramittari: JuoksuV4Maailma.KameraMassassaNyt/KameraReunassaNyt (suojan jälkeen, reuna 0,25 m sivut + ylä);
  mittarin yhteenvetoon "kamera massassa N, massan reunassa M", jaksorivi "KAMERA MASSASSA ruudut N (t s)".
- **9655e4bae** polkukamera myös läpikulussa: Tukossa näkee peittokartan massan PolkuRintaY 1,5 m:ssä (tunnelissa || katonAlitus).
  Syy: ys 043017 (218r) – "polkukamera alkaa" 0 kertaa; Hk on katon alla lattiaa → kamera oikaisi kulman seinän läpi (2.2) ja tuli
  sermin taakse 1,3 m:iin (3.1–3.3). → runko **218s a9226c5cf**.
- th: 体和殿 on läpikulkuhalli ilman valtaistuinta (rakennukset-v117) → maali oikein (PT kuitannut).
- Havainnot: sali-218b/salit-218l-havainnot.md (ys 041142 ja 043017 + th). Arkit arkki-041142-ys.jpg, arkki-043017-ys.jpg.
  Arkin ruudun → kameran paikka: scratchpadin arkkikamera.py ei säily; sama: kamera-*.txt sarake 2 = aika, t = v3:n alku + i/2.

## Ajojen tila (JU)
- L1 218r: ys valmis (043017, mutta vielä 69d9ef321 ilman mittaria), cx tj ty th xf cc yk ajossa be9e92cce:llä.
  Pyydetty JU:lta: ketjun lopuksi ys + taso1b10 uudelleen 218r:llä (mittari mukaan).
- L2 taso1b10 218r (69d9ef321) ajossa 04.30 – kujaportti-3 (s 26) ja s 68: tarkista, ettei veto keisarin päälaelle palannut (93e8545e6).

## SEURAAVA
1. Kun 218r-sarja valmis: taulukko → PT (≤ 3 riviä + polku). Tämä on lähtötaso.
2. Lähetä 218s koko sarjana JU:lle: `RUNKO=pelikoodari/sali-218s zsh …/sali-218b/ketju8s.zsh yk cx tj ty th xf cc ys` + taso1b10
   (vaihda ketju-taso1b10.zsh:n runko 218s:ään). Vertaa taulukot 218r vs 218s.
3. Jäljellä ys:ssä: 1.2 räystään parrut alussa (kamera 4,1 m, läpikulun katto 4,6 → katto-raja liian lähellä alapintaa?), 2.2 seinä
   kulmassa (läpikulussa vara 0 → hipoo seinää; polkukamera 218s voi korjata). xf:n ovisarjan vedot (luovutus 0407 kohta 2) – katso
   218r:n xf:n syyrivit ja taulukko.
4. Seinähäivytys on pois yhtenäisessä dronessa (omistaja 10.43) – ei käytetä ratkaisuna ilman omistajan päätöstä.
5. Muut luovutuksen 0407 avoimet (KK:n koottu paketti vasta puhtaana, arkiset hahmot, VS:n sade, siivoukset) ennallaan.
