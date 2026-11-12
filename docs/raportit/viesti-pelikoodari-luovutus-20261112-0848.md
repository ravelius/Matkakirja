# Pelikoodari: luovutus 12.11.2026 klo 08.48 (konteksti ~32 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261112-0534.md (7ac8bfaf5). Sen kohdat 2 (massamittarin syy) ja 3 (työkopiot) ennallaan.

## 1. KAMERALAITE PALA 2: KK:N 05.4x PÄÄTÖKSET KOODISSA, ODOTETAAN KK:N VASTAUSTA (viesti KK:lle 08.47, PT kopio)
Koodi: natiivi-backup kameralaite/pala-2 @ b66a3ae47 (wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite), pushattu. Kytkin pois.
Tulos: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/TULOS-paatokset-0544.md (LUE KOKONAAN).
- Tehty: KatseSAhdas-liuku (Tyyli + ku), 5a pois, 2a takuu (ISeurantaYmparisto.Tarkka = JuoksuKulkuKartta.TarkkaEt(R), sovitin + JuoksuV4Maailma
  välittävät TarkkaEtR), ikkuna min(4; D − 0,5), 2b SeinaTyontoK 0 (koodi vielä paikallaan), 2c U-käännös 3,0 m:n matkasta, 2d nousu dy/ds.
  Testit: T07 avoin + ahdas, T15 (150° / 0,35 s). Oletus 43/44 (T14 kuja 32,1°), toisto T14 OK. Unity-tarkistus EI tehty.
- Ei Mac-ajoa: ahtaat rivit (0,125; 0,20; 1,5) × KatseS 0,15 / 0,125 / 0,10: T7 ahdas rulla 2,23–2,25°, T14 välit 1,0–1,2 m; toistossa laite
  408 askelta ei-kuljettavalla, 406 säännön 1–5 m:n paikkahypyn jälkeen (sama syy kaikkiin a/j/ω-huippuihin). KK:lle 4 kysymystä.
- Mittaukset: MITTAUS=c3 sh Linssit-testit/kaanna.sh C3 (keinoradat); MITTAUS=c3 kameratoisto.sh C3Mittaus [C3_RIVI=1–4];
  MITTAUS=c3sarja C3_SARJA=siemen:t0:t1 C3_RIVI=n kameratoisto.sh C3Sarja; MITTAUS=huiput C3_RIVI=n kameratoisto.sh Huiput.
  Tunnettu pikkuvika: C3Mittauksen "yhtenäisiä jaksoja" laskee 0 (edRike-päivitys väärässä kohdassa); askelmäärät oikein.
- SEURAAVAKSI: KK:n vastaus → koodiin → valinta (suurin KatseS, jolla ehdot) → Unity-tarkistus → Mac-ajo JU:lle siemenellä 1942463309
  (vanha + uusi) + peittoruutujen vienti 2749b7b77 + massatuomari.
- MASSATUOMARI (KK 05.19) EI TEHTY: GLB-lähteet välimuistissa /Users/Shared/Claude/proto-3d/valimuisti/juoksupeli-mallit-L1/juoksupeli/
  (maailma-v4/kielletty-tausta-v132/*-lod1.glb; leivottu-v3/juoksupeli/maailma-v4/avoimet-v52/*.glb @x,z,qy,qw avoimet-sijoitus.json:sta;
  kielletty-rakennukset-v127 @x,z). Edelliset komentorivit PK:n transkriptissa ~/.claude/projects/-Users-Shared-Claude-Matkakirja-pelikoodari/
  70a1124e-*.jsonl. Juna 224 käyttää taustaa v133c → tarkista versio. Tuomari: pysty y ± 0,3 < 0,3 m tai sisällä (säde­testi), "massassa N, joista tosia M".

## 2. B1 (pelikoodari/seinat-taso1, bcf32314c `botti maali`): PT 08.5x: LAV ajoi a2-nyt junan 224 v133c:llä; haara on vanhan mainin päällä (v132).
B1 muuttaa vain koodia (JuoksuKulkuKartta, JuoksuV4.Vapaa, JuoksuV4, JuoksupeliNakyma, testit) → rebase origin/main:n päälle ennen KK:n junasanaa
(huom. JuoksuKulkuKartta.cs muuttuu myös kameralaitehaarassa: TarkkaEt).
Ei agentteja käynnissä. Ei uusia lupia.
