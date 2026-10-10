# Linssiseppä 2 – luovutus 10.10.2026 klo 20.5x (konteksti 63 %, nollaus)

Rooli ja työkalut kuten edellisessä luovutuksessa (viesti-linssiseppa2-luovutus-20261010-paiva.md alkuosa). PT = PÄÄTOIMITTAJA (Opus, max),
Julkaisija jakaa käännös- ja simuvuorot (SendMessage "Julkaisija (Opus, high)"; älä käynnistä proto-kaannaa ennen KÄÄNNÖS NYT -viestiä,
simu vain SIMULAATTORI NYT -viestillä, yksi simu kerrallaan, lopuksi "SIMU VAPAA"). Proto-worktree `wt/proto-linssiseppa2-muisti`,
skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/` ja `…/maa-ei-pyori/`, arkit `docs/raportit/kaappaukset/linssiseppa2-180-20261010/`.
Pitkät ajot: `perl -e 'use POSIX setsid; fork and exit; setsid; exec @ARGV' zsh <skripti>` (ei zsh -c).

## KESKEN (järjestys)
1. **PEKING-KIERROS 3 VALMIS ja PT:llä** (20.5x): arkki kaappaukset/linssiseppa2-180-20261010/peking-omistajalle-3.jpg (käännös a6f8b0431 =
   c8dde7a17 + peking5). Mittaus (mittaa-peking3.py, kierros 2 → 3): vihreä ylhäältä 2,6 → 3,8 % (S2 30 %), yleis 2,3 → 3,1 %; katto/piha
   R/G/B 1,19/1,03/0,75 → 1,16/0,99/0,77 (S2 1,05/0,88/0,73: katot yhä ~10 % liian kirkkaat); punainen yleiskuvan palatsialueella 10,6 → 7,8 %.
   Puut 67 141/67 141, lataus 1,2 s. HUOM: ylhäältä mitatut FC:n pihat pysyivät 134/130/129 → ne ovat LR:n kiveysmateriaalia, eivät
   KS:n pohjakuvaa (KS:n korjaus näkyy vain mallien ulkopuolisessa maassa) → LR:n kiveys ~×0,8, jos PT haluaa. Odottaa PT:n palautetta.
2. **PYÖRIMISLINSSI (Jos Maa lakkaisi pyörimästä) kierros 2b**: koodi proto `linssiseppa2/maa-ei-pyori` **51b4342e4** (NUI:n yläpalkki
   a9a528145 yhdistetty; rantaviiva vain merkin vaihtuessa, hehku pois). Kierroksen 2 kuvat (def917449) lokit/todistus-maa-*-20261010-20{29,32}
   ovat hyviä muuten, mutta Itämeren lahdet/Laatokka harmaina ja hehku näkyi → EI lähetetty PT:lle. Julkaisija antaa KÄÄNNÖS NYT ~21.45 (PT: vasta nollauksen jälkeen):
   `maa-ei-pyori/kaanna-maa.zsh` (51b4342e4), sitten SIMULAATTORI NYT → `maa-ei-pyori/aja-maa.zsh <käännös-SHA>` → päivitä
   arkki-maa.py:n todistuskansiot (i, p) → `python3 -I arkki-maa.py <arkit>` (iPhone rajataan neliöksi, KS-kartta reunustetaan) → tarkista
   itse (sedimentti ei valkoinen, turkoosi matala, ei läiskää, Eurooppa 0 %: Helsinki ~4,1 km) → PT. Muisti: R16 16 Mt + BMNG 43 Mt.
3. **ND v5e** (LR 20.4x, _valmiit/notre-dame-v1/tekoaly-v5e): pari oikea | v5d | v5e (portaalit lähelle + tornit viistosta) PT:n
   järjestyksen mukaan: nd3k-paketti.sh POHJA=nd3/v6k14 → nd3/v6k17-tyyppinen testipaketti + The wub -rivi, vuoro-nd5d.sh/arkit-nd5d.py-malli.
   v5d-pari meni omistajalle (PT 20.4x); v6k16:n vienti ja osoitin omistajan päätöksellä.
4. **Viennit odottavat PT:n kuittausta**: puudata `_valmiit/puut-vienti-20261010b` (puukortit + maa-peking → kartta/puut/v1);
   Peking v5 vientipaketti tekemättä (vienti-v6k15.py-malli: v6k14 + peking5 → v6k17); ND v5d testipaketti nd3/v6k16 (vienti vasta
   omistajan päätöksellä). v6k15 (Peking v4) on ämpärissä, osoitin uusin-4 ennallaan v6k14:ssä.

## TÄNÄÄN VALMISTA (ilta)
- Lattiaheijastus siirtyi LS1:lle (otti karheus²-mipin ja katseet); oma haara linssiseppa2/museo-lattia 50071113d varalla.
- ND v6k14 viety. ND v5d -pari PT:lle (nd-v5d-edesta-ylha.jpg, L 153).
- Pekingin vesikerroin 2c2305012 (junaan 180, PT kuittasi). Pekingin puut: KaupunkiPuut + KaupunkiPuu.shader + Ydin KaupunkiPuuData.
- Pyörimislinssi: MeriTasapaino (Karttasepän taulukko, A 11 004,5 m), MaaEiPyoriKuori + MaaEiPyori.shader + MaaEiPyoriSovitin,
  testikomennot `maa nopeus|peili|tila`, NUI:n UI (MaanPyoriminen.cs, säädin) yhdistetty.
- Punaisen syy Pekingissä: LOD2:sta puuttuivat katot (mittaa-katot-lod.py) → LR v5 korjasi.
