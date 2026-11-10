# Karttaseppä: luovutus 10.11.2026 klo 09.25 (KS)
Syy: konteksti 26 % (hook, Raamattu 7.37), luonteva väli: ajot 34–36 raportoitu PT:lle. Korvaa -0825:n.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  `F=/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/pariisi-pino-20261110/`
Työlista on jono: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava KS`.
HUOM kello: aja `date` ennen jokaista aikaleimaa (edellinen vuoro kirjoitti vahingossa 09.xx klo 08.4x; korjattu tiedostoihin).

## VALMIIT TÄSSÄ VUOROSSA (kaikki PT:lle raportoitu 09.24, PT ei vielä vastannut)
1. **[210] Lontoo koe8 Mac-parit** (ajot 32–33): `$K/kuvat/a/lontoo8/pt/` (7 paria + LUE.md). Katot kunnossa, 0 katkoa.
2. **Greenwich-uusinta** (ajo 34): ajon 33 puuttuva Thames = latausajoitus, ei aineisto. PT kuittasi.
3. **BM koe9** (ajo 36; `$K/aja-lontoo-koe9.zsh`, skripti `$K/skriptit/tee-palat-lontoo-luuranko-k9.py`, KATOT_KAPEA=7):
   kapeat (< 7 m, 1 730 taloa) tasakatoiksi reunuksella, 0 katkoa. EI KORJANNUT sahalaitaa: BM:n sahalaitatalot ovat ≥ 7 m
   (BM-alueella säännön auma 343 leveää / 151 kapeaa; `$K/skriptit/kapeat-bm.py`). Rajaus `$K/kuvat/a/lontoo8/rajaus-koe8-koe9-bm-0-300.png`.
4. **Sacré-Cœur koko puisto** (ajo 35, koehaara proto `karttaseppa/sc-koko-puisto-koe` 2c7f80081, worktree
   /Users/Shared/Claude/wt/proto-karttaseppa-sc-koko = juna 224 68d365e65 + `Resources/NotreDameKoe/sacre-coeur-pohja-koko.png`;
   skenaario `_tyo/karttaseppa/sk-pariisi-sc-koko.txt`, `komento koepohja`): ero pieni (3,4 %), pohja piirtyy lännessä
   talojen päälle → haamutalot. `$F/6-sacre-coeur-puisto.md` PELIPARI-osio + kuvat. Suositus PT:lle: pohja rajataan oikeaan puiston rajaan.
5. **Pino 7 Louvre** (ajo 35): `$F/7-louvre-kirkko.md` valmis (kortti + pelikuvat 7-louvre-kirkko-yla/-45.png). PT katsoo → KK.

## SEURAAVAKSI
0. Odota PT:n vastausta 09.24-viestiin (Sacré-Cœurin rajaus, BM:n jatko, pino 7).
1. **BM-sahalaita** (PT 08.4x: korjaus ennen iPad-paria; Lontoo ei junaan ennen iPad-paria): ehdotus = rivitalojen harjat rivin
   suuntaan: naapurireuna päädyksi (nb) myös korkeuserolla (nyt ds=0 vain jos naapuri ≥ ylin−2 m, rivi `ds=[0.0 if min(nh2…`), tai
   leveän rivitalon säännön auma → harja. Uusi k10-skripti k9:stä, ajo kuten koe9, Mac bm-45 + muut 6, sitten iPad-pari.
2. Jono: [3] "Pariisi valmis: Seine ja sillat -katsaus".
3. Koe7 iPad-pari ja Louvren korttelit: ennallaan (työlistalla odottaa/este).
4. Nimiotto Lontoolle: ennallaan (-0625 c).

## Levysiirto NAS:lle
Uudelleenajo käynnissä taustalla 09.0x (`/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/siirto-worktreet-20261110.sh`, loki .log).
0625:n DIFF korjattu (rsync --delete vain NAS-kopiolle). 09.24: talot ja tietonapautus siirretty, yhteinen kesken. Valmis (loki "VALMIS")
→ rivi PT:lle: montako, Gt. Uusi worktree proto-karttaseppa-sc-koko on käytössä, ei siirretä.

## Vahdit
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
