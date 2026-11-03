# Valosepän luovutus 1.11.2026 klo 08.31

Syy: konteksti 26 % (pehmeä raja, luonteva tauko: PT:n kuittausta odotetaan). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(rivit 07.51–08.3x). Edellinen: viesti-valoseppa-luovutus-20261101-0740.md (työtavat voimassa). Proto: haara `linssiseppa2/k17-piha06-216`
(worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k17), kärki **9f498cdc9**. Skriptit `_tyo/linssiseppa2/skriptit-20261031/pari-k06z14…18.zsh`.

## TEHTY: räystäskartta (PT 07.5x, junan 216 viimeinen valoehto)
- 548a1b169 `JuoksuRaystasKartta.cs`: maailmankoordinaattinen korkeuskartta ylhäältä palatsin juuren kehyksessä 0,5 m/solu. Lähteet:
  paikallaan olevat RakennaSolmut-mallit (InstanssiOsat merkitsee pohjat → ohi; nimet " lodN≥1", kauko, keskipuut, ulkorengas ohi) ja
  instanssisarjojen LOD0-palat (Viimeistele → LisaaSarja). Rasterointi taustasäikeessä (17,7 M kolmiota ~5 s). Kärkien UV2-räystäsliuku poistettu.
- 87c821fd3: 4 kerrosta per solu (tavu = korkeus 0,4 m · 2 + alaspäin) — yksi arvo ei riittänyt (alimpana jalustan sisäiset pinnat).
  Varjostin (JuoksuValo.hlsl JuoksuRaystasLiukuK): näyte w + vaakanormaali · 0,45 m, alin kerros seinäpisteen yllä. Vianhaku: voima 2/3.
- 9f498cdc9: liuku myös JuoksuLattia.shaderin seiniin (laji > 9,5 ja !lattia-polku): Meridiaaniportin hallin seinät piirtyvät Lattialla
  (k06z16 `ui juoksupeli mika 0.28 0.27`).
- Muisti: GPU 768² RGBA32 2,25 Mt (ikkuna 384 m, siirto 96 m); CPU-laatat 937 × 16 kt ≈ 15 Mt.
- k06z18 (lokit/pari-k06z18-20261101-081935): **b5 alku 0,5 / pituus 3,5 m: 0,72 0,64 0,70 0,76 0,82 0,89 0,93 0,96 … 1,00** = tavoite;
  alaosa ennallaan. Selvitys `_tyo/linssiseppa2/raystaskartta-tulos.md`; kuvat raystaskartta-b0-b5.jpg + raystaskartta-kauko-k0-k5.jpg → PT 08.3x.

## AVOIN 1: PT:n kuittaus b5:lle
- Kuittaus → ValoKohteet.JuoksuRaystasLiukuVoima 1, Alku 0,5, Pituus 3,5 (Laske seuraa voimasta) + todennus (pari-k06z18.zsh ilman QA-riviä)
  → NS:lle runkoon junaan 216 (poimittavat: 548a1b169 87c821fd3 11e8044fa 9f498cdc9; 96a0a64fe/5d75ef4d7/2fc42c04b korvautuivat, eivät tarvita
  jos poimitaan koko haara-ero — tarkista, ettei UV2-koodia jää).
- Huomiot PT:lle: friisin tummat < 25 0,13 → 1,01 %; kaiteen alaosa saa käsijohteen alusvarjon laikkuina → tarvittaessa kaiteet ohi
  (V4_marmori/kaide-pinnat Rasteroi-lähteistä tai pinnan mukaan varjostimessa).
- Mahdollinen siivous: vianhakunäkymät (voima 2/3) pois ennen runkoa, jos PT haluaa.

## AVOIN 2 (ennallaan)
- Lokit T7:lle kuittausten jälkeen (PT:n siirra_lokit_t7.py); LAV v4 odottaa levyä ≥ 70 Gi.

## LISÄYS 08.4x: PT 08.3x kuittasi b5:n suunnaksi — ENSIN kaksi korjausta, sitten oletus
1) **Marmorikaiteen alaosan laikut** (b5 lähikuva, koko leveydeltä) → kaiteet ohi kartasta. Toteutus: RakennaSolmut-ryhmän pinta (V4_marmori /
   kaide) tai mallin nimi ("kaiteet", g-jalusta-kaiteet, osasarja kaide-*) → ei Kolmiot()-varjostajiksi; tarkista nimet `mika`lla kaiteen kohdalta.
2) **Kaukokuvan k5 kaksi tummaa suorakaidetta** muurin keskiportin molemmin puolin (raystaskartta-kauko-k0-k5.jpg, alempi kuva, portin vasen ja
   oikea puoli, muurin yläpuoliskolla; k0:ssa ei). Terävä yläreuna = alaspäin katsova kerros juuri tuolla korkeudella muurin edessä
   (oletus: muurin sisäinen/portin sivukäytävän katto tai kateosa, joka osuu 0,45 m + solun pyöristyksen sisään). Selvitä vianhaulla
   (`valo raystasliuku 2 0 3.5` kaukokamerassa) + `mika` suorakaiteen kohdalta; korjaus todennäköisesti lähdesuodatuksella tai
   näytteen ulos-etäisyyden kasvatuksella (0,45 → 0,7) tai vaatimalla kerrokselta vähimmäisuloke.
3) Sitten b5 oletukseksi (ValoKohteet: voima 1, alku 0,5, pituus 3,5) → todennus → sha NS:lle runkoon 216 + uusi pari (lähikuva + kauko) PT:lle.
