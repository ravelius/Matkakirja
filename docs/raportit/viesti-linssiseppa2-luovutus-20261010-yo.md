# Linssiseppä 2 – luovutus 10.10.2026 klo 20.5x (konteksti 63 %, nollaus)

Rooli ja työkalut kuten edellisessä luovutuksessa (viesti-linssiseppa2-luovutus-20261010-paiva.md alkuosa). PT = PÄÄTOIMITTAJA (Opus, max),
Julkaisija jakaa käännös- ja simuvuorot (SendMessage "Julkaisija (Opus, high)"; älä käynnistä proto-kaannaa ennen KÄÄNNÖS NYT -viestiä,
simu vain SIMULAATTORI NYT -viestillä, yksi simu kerrallaan, lopuksi "SIMU VAPAA"). Proto-worktree `wt/proto-linssiseppa2-muisti`,
skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/` ja `…/maa-ei-pyori/`, arkit `docs/raportit/kaappaukset/linssiseppa2-180-20261010/`.
Pitkät ajot: `perl -e 'use POSIX setsid; fork and exit; setsid; exec @ARGV' zsh <skripti>` (ei zsh -c).

## KESKEN (järjestys)
1. **PEKING-KIERROS 3** (PT 20.1x): AJOSSA 20.36 alkaen (`aja-pekingpuut.zsh`, loki lokit/linssiseppa2-pekingpuut.log, kuvat
   lokit/linssiseppa2-pkp3-{ipad,iphone}/peking). Käännös a6f8b0431 = kaupunki-puut **c8dde7a17** (puut ×1,4 + kaikki 67 141, 39 Mt GPU)
   + OMAT peking5/ktx (LR v5: kultakatto R ×0,88 G ×0,85, LOD2-katot; KS:n korjattu FC-pihojen pohjakuva c8b1dd3c). Kun VUORO VALMIS:
   "SIMU VAPAA" Julkaisijalle → arkki: kopioi arkit-pekingpuut.py → pkp3-kansiot, nimi peking-omistajalle-3 → mittaa: vihreä %
   (ylhäältä o1; S2 30 %), katot/pihat suhteena (mittaa-pekingvesi.py luokat(): S2 1,05/0,88/0,73; albedossa katto/piha 0,149/0,144),
   punainen yleiskuvassa (oli 11,3 %) → PT. Katot pihoja vasten → luvut LR:lle (KS:n pihakorjaus ×0,64–0,74 lineaarisena tummensi pihoja).
2. **PYÖRIMISLINSSI (Jos Maa lakkaisi pyörimästä) kierros 2b**: koodi proto `linssiseppa2/maa-ei-pyori` **51b4342e4** (NUI:n yläpalkki
   a9a528145 yhdistetty; rantaviiva vain merkin vaihtuessa, hehku pois). Kierroksen 2 kuvat (def917449) lokit/todistus-maa-*-20261010-20{29,32}
   ovat hyviä muuten, mutta Itämeren lahdet/Laatokka harmaina ja hehku näkyi → EI lähetetty PT:lle. Julkaisija antaa KÄÄNNÖS NYT ~21.30:
   `maa-ei-pyori/kaanna-maa.zsh` (51b4342e4), sitten SIMULAATTORI NYT → `maa-ei-pyori/aja-maa.zsh <käännös-SHA>` → päivitä
   arkki-maa.py:n todistuskansiot (i, p) → `python3 -I arkki-maa.py <arkit>` (iPhone rajataan neliöksi, KS-kartta reunustetaan) → tarkista
   itse (sedimentti ei valkoinen, turkoosi matala, ei läiskää, Eurooppa 0 %: Helsinki ~4,1 km) → PT. Muisti: R16 16 Mt + BMNG 43 Mt.
3. **Viennit odottavat PT:n kuittausta**: puudata `_valmiit/puut-vienti-20261010b` (puukortit + maa-peking → kartta/puut/v1);
   Peking v5 vientipaketti tekemättä (vienti-v6k15.py-malli: v6k14 + peking5 → v6k17); ND v5d testipaketti nd3/v6k16 (vienti vasta
   omistajan päätöksellä). v6k15 (Peking v4) on ämpärissä, osoitin uusin-4 ennallaan v6k14:ssä.

## TÄNÄÄN VALMISTA (ilta)
- Lattiaheijastus siirtyi LS1:lle (otti karheus²-mipin ja katseet); oma haara linssiseppa2/museo-lattia 50071113d varalla.
- ND v6k14 viety. ND v5d -pari PT:lle (nd-v5d-edesta-ylha.jpg, L 153).
- Pekingin vesikerroin 2c2305012 (junaan 180, PT kuittasi). Pekingin puut: KaupunkiPuut + KaupunkiPuu.shader + Ydin KaupunkiPuuData.
- Pyörimislinssi: MeriTasapaino (Karttasepän taulukko, A 11 004,5 m), MaaEiPyoriKuori + MaaEiPyori.shader + MaaEiPyoriSovitin,
  testikomennot `maa nopeus|peili|tila`, NUI:n UI (MaanPyoriminen.cs, säädin) yhdistetty.
- Punaisen syy Pekingissä: LOD2:sta puuttuivat katot (mittaa-katot-lod.py) → LR v5 korjasi.
