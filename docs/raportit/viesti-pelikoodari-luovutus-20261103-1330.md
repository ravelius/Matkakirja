# Pelikoodari: luovutus 3.11.2026 klo 13.30 – juna 218

Edellinen: -20261103-1206 (30930d302) – voimassa, ellei alla toisin. Syy: konteksti (hook 26 %).
Testit: bash Peli-testit/kaanna.sh (EI zsh) 804/804.

## UUSI TYÖTAPA (KK 12.56, juoksupelin ohjaus KK:lla)
- Korjaukset kohdennetusti: aja vain korjattu sali (ketju-ad.zsh <sali>). Koko 8 salin sarja vain kerran, kun kaikki
  jäljellä olevat kohdat on korjattu. Syy: koko sarja (~1 h) jokaisesta korjauksesta vei toisen käännöslinjan.
- KK sai paketin 218ac (videot + tunnetut viat, 13.12). Seuraava KK katsoo paketin ja vastaa.

## Tehty 12.06–13.30
- **218ac-sarja valmis, PT kuittasi junaan** (13.2x, välitti JU:lle): runko pelikoodari/sali-218ac **3066749f0** = juna-218-z
  eb2b057bc + 5238f873c + c50c8c5ee. Summat massassa/reunassa/piilossa/vetoja 218z 158/376/145/855 → 218ac 122/330/132/704;
  taso1b 0/4/0/15. Taulukko /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218b/taulukko-218ac.md.
- **Mittarin jaksoajat eivät ole videoaikaa**, ja mittari ei näe katon ruoteita / ristikkoseiniä (massassa 0). Viat katsottu
  1 s:n kuva-arkeista: sali-218ac/arkki-<sali>.jpg (ffmpeg fps=1,scale=300:-1,tile=6x4; drawtext ei ole käytössä).
- **Tunnetut viat 218ac (videoaika)**: ys 7 s kamera katon ruoteissa (koko kuva punaista), 10–11 s maalattu seinä/lipas edessä;
  tj 4 s ristikkoseinä, 8 s maalattu seinäke, 10 s kaukana ylhäällä; ty 11–13 s sivusiirto nykii (ylös → keisarin päälle → ylös);
  cx 4 s ja th 4 s paviljongin ristikko edessä; xf 6 s pilari keisarin edessä. yk, cc, taso1b: ei vikoja
  (taso1b: ohje "Pyyhkäise oikealla peukalolla vasemmalle" ruudulla ~36–60 s).
- **ys 7 s -korjaus**: haara pelikoodari/ys-218ad **3fb09b3a9** (worktree /Users/Shared/Claude/wt/proto-pelikoodari-ys-218):
  JuoksuKorkeusKartta.KatonRajassa (alaraja ≥ 2,5 m alle 0,4 m kamerasta ja huippu yllä) → KameraSuojaan (JuoksuV4Maailma)
  kamerasuojan ja sivusuojan esteeksi; mittari (KameraMassassa) ennallaan; syyloki "katon raja ala … huippu …".
  Syy: avoimen varaston seinät 0–2,55 m, katon alapinta ~3,6–4,0 m; kamera y 3,46–3,9 → Massassa:n ±0,3 m:n vara ei laukea.
  JU ajaa: zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218ad/ketju-ad.zsh ys (pyydetty 13.3x).
- **LAV-kytkentä 1ea2a61e9** (pelikoodari/kapea-reitti-218, d02658dc8:n päällä): osasarja-v11 (3b73de48c562), rakennukset-v119
  (cf2cdee95e14), c2-v35 (10fcbea0a759), esto-v38. Lähetetty LAV:lle; LAV ajaa editoriparin 01 02 03b 06 PT:lle.
  Junaan vasta PT:n editoriparikuittauksen jälkeen (juna-218-z:n osasarja v8 → v11 + v119 + c2-v35).
- Tripo kuittasi kaatosopimuksen (e158d35fe): fill-v5, kaatoaukkojen solmut tulevat toimituksessa. Ei toimia ennen toimitusta.

## SEURAAVA
1. ys-218ad valmis → katso video 6–8 s (kuva-arkki 5 fps: ffmpeg -ss 6.2 -t 1.6 … fps=5,tile=4x2) ja grep unity.log
   "katon raja". Jos ruoteet poissa → seuraava kohde. Jos ei → katso syylokista ala/huippu kamerapisteessä.
   mittari-taulukko.py tuntee -218ad.
2. Seuraavat kohteet yksi kerrallaan, ajetaan vain korjattu sali: tj (4 s ristikko, 8 s seinäke), cx/th 4 s ristikko
   (todennäköisesti sama katon raja → aja cx tai th samalla haaralla), ty 11–13 s sivusiirron nykiminen, xf 6 s pilari.
3. Kun kaikki korjattu: koko sarja kerran (ketju-ad.zsh yk cx tj ty th xf cc ys taso1b) → taulukko → PT + KK-paketti.
4. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1330.
