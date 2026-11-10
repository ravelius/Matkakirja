# Karttaseppä: luovutus 10.11.2026 klo 17.40 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -1631:n.
Työlista: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava KS` (rivit kirjoittaa PT).
HUOM kello: aja `date` ennen jokaista aikaleimaa.

## SUUNTA: OMISTAJAN PÄÄTÖS 16.17 "Maltillinen korostus" + 16.18 (raivatut talot takaisin uuden koon mukaan)
Kaikki Pariisin nähtävyydet samassa suhteessa hieman todellista suurempina; erottuvat yhdellä vilkaisulla, eivät peitä kortteleita.
iPad-parit (lähin, lähin-70, viisto + ND:n lähikuva) PT:lle → PT/KK-kortti "kelpaako junaan".

## TEHTY (proto-repo, worktree /Users/Shared/Claude/wt/proto-karttaseppa-notredame, haara karttaseppa/korostus, EI pushattu, ei junassa)
Ketju: 93ba52043 korostus K → c1e811eed VS kyltti → 3c3c12be6 vaakakatto → 7f0a42222 pohjat K2 → **c1a15236d PT:n korjaukset (kärki)**.
- K = 2 (Mac 44: K 1,5 ei erota RK/ND viistosta; K 2 × koko vei Invalidit 800 m:iin). Korostus.cs:
  Perus(L,H) = K, mutta kapea (L ≤ 60 m) vähintään 150 m korkea (vain RK → K 3, PT 17.1x); Vaaka(L,H) = min(Perus, (L+150)/L) (jalanjälki ≤ +150 m);
  pysty = Perus. Tripo (Akselit) ja koodimallit (OhjelmaKohteet.KorostusKoko verkon mitoista) samalla parilla (VS tarkisti).
- Koodirakennukset (Pompidou, Hôtel de Ville …) EIVÄT korostu (vain Korvaa-koodimallit RK/ND/Eiffel), PT 17.1x: "ND:lle etusija". Kerrottu PT:lle.
- Lopputulos K2: ND 256×192, SC 72×150, Louvre 850×80, Eiffel 250×660, GP 390×90, RK 150×150, Panthéon 220×166, Opéra 323×124,
  Invalidit 550×214, SC-kirkko 170×166, Montparnasse 100×420.
- Raivaus (_tyo/karttaseppa/korostus/, SUUNNITELMA.md TILA-rivi): tee-raivaus.py (Perus+katto mukana) → k20-d4/ (7 aluetta) + k20-d4-rk/ (RK uusi);
  korvaus-k2.json → tee-talot-nd-k.py KAIKKI=1 → nd-k2b/ (21 eroavaa) → **palat-v23-k2b** (v22-klooni + eroavat, 354 Mt). palat-v23-k2 = vanha 7f0a42222:lle.
  Pohjat Resources/NotreDameKoe/*-k2.png (skenaariossa koepohja <alue> NotreDameKoe/<pohja>-k2).
- Skenaariot: tee-sk-k2.py → sk-mac/sk-ipad-korostus-k2b.txt (22 kuvaa: nyt | k2; yleis, rk ×3, nd ×3 + tornit, invalidit-viisto, eiffel ×2).
  Parit: `python3 -I _tyo/karttaseppa/korostus/parit.py <loki> k2 <U> <näkymät pilkulla>` (U-kansiot koodimallit/kuvat/u4…u6).
- Katsottu: Mac 44 (u4), Mac 45 + 45b 7f0a42222 (u5, Eiffel mukana; VS hyväksyi Eiffelin K2: jalat Marskentällä, kyltti juurella),
  iPad I4 16/22 (u6; aikaraja). PT 17.0x: Invalidit, ND ja saari hyvät; RK katosi viistosta ja Pompidou/HdV hallitsivat → c1a15236d.

## KESKEN
1. **Mac 46 JU:lla** (c1a15236d, sk-mac-korostus-k2b → lokit/karttaseppa-korostus-k2b-c1a15236d, 22 kuvaa) ajossa 17.4x. Katso täysikoossa:
   RK viisto/lähin-70 (150 m erottuu?), nd-lahin (Pompidou/HdV oikeassa koossa, ND hallitsee?), Invalidit. Parit u7 → PT ≤ 3 riviä. VS katsoo RK-kyltin.
2. **iPad I4 uusinta** JU:lla (PK:n latausruudun jälkeen, 30 min raja) 7f0a42222 → lokit/karttaseppa-korostus-k2-ipad-b-7f0a42222 (PT 17.12: I4 vanhalla).
   c1a15236d iPadille vasta PT:n pyynnöstä (tarvitsee laitekäännöksen + Documents/talopalat-pariisi-v23-k2b).
3. Avoin: Invalidien länsisiipi ~70 m vanhan maskin yli (Mac 45: talot eivät pistä läpi, näyttää hyvältä).

## Vahdit
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
  WT vaihdettu 17.0x: /Users/Shared/Claude/Matkakirja-karttaseppa (vanha wt/karttaseppa-postilaatikko poistunut levysiivouksessa).
- Mac 46 kuvavahti: until-silmukka lokikansion png-määrälle (22).
