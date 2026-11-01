# Valosepän luovutus 1.11.2026 klo 10.10

Syy: konteksti 25 % (pehmeä raja, luonteva tauko: k06z20 odottaa levyä). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(rivit 08.5x–10.1x). Edellinen: viesti-valoseppa-luovutus-20261101-0831.md (työtavat voimassa). Proto: haara `linssiseppa2/k17-piha06-216`
(worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k17), kärki **d1415715d**. Skriptit `_tyo/linssiseppa2/skriptit-20261031/pari-k06z19…20.zsh`
(ajavat nyt k17:stä; p11-worktree poistettu PT:n pyynnöstä, samoin linssiseppa2-posti).

## TEHTY (PT 08.3x:n b5-ehdot; PT 10.2x kuittasi k06z19:n)
- e30ca990f kaiteet ohi räystäskartasta (nimi-regex Kaide: muurikate c2, palatsi osat (A3/A5), kaide-, kaiteet, portaat) + vianhaku:
  QA `valo raystasjalki 1` (ennen latausta: lähde soluihin) ja `valo raystaskartta-kuva <nimi>` (PNG + lähdeluettelo esikatselun kansioon;
  R = alin alapinta askelina, G/B = lähde, A = alin katto).
- k06z19 (lokit/pari-k06z19-20261101-094112, portti-k0-k5vanha-k5-k7-d2.png): laikut poissa (17,7 → 11,2 M kolmiota), b5-profiili ennallaan
  0,70 0,64 0,70 0,76 0,83 0,89 0,93 0,96 … 1,00; suorakaiteet jäivät 0,45 m:llä (0,7 m:llä poissa).
- Jälki (rk-k06z19.png/.txt): suorakaiteet = sokkelon mallipohjat (moduulit, kortteli-, halli- ja vanha_halli-pohjat, esteiden pohjat)
  sokkelon origossa, joka on Meridiaaniportin muurin edessä → 7e7554663: sokkelon pohjat JuoksuRaystasKartta.Pohja-merkinnällä
  (JuoksuSokkeloMaailma.cs), este-/aarrepohjat Ohi-regexiin. Ulos pysyy 0,45.
- b1fead5dc b5 oletukseksi: ValoKohteet.JuoksuRaystasLiuku voima 1, alku 0,5, pituus 3,5, ulos 0,45.
- d1415715d oletusta varten: varjostajakolmiot vapautetaan rasteroinnin jälkeen (vain instanssipohjien jäävät sarjoille), Paalla vaatii
  JuoksuV4Maailma.PalatsiPaalla (kartta vain palatsissa).

## AVOIN 1: todennus k06z20 → NS:lle runkoon 216 + pari PT:lle
- pari-k06z20.zsh (d1415715d): bo/ko = oletus ilman QA:ta (lähi + kauko), b0/k0 = voima 0. Käynnistetty taustalle 10.0x, odottaa levyä
  ≥ 70 Gi (4 h; 10.08 levy 62). Tarkista `pgrep -fl pari-k06z20` ja `cat _tyo/linssiseppa2/skriptit-20261031/pari-k06z20.log`;
  jos prosessi ei ole käynnissä eikä lokissa ole VALMIS, aja uudelleen: `zsh pari-k06z20.zsh k06z20 > pari-k06z20.log 2>&1` (taustalla).
  Jos levy < 70: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/levy/siirra_lokit_t7.py --aja` (PT:n lupa), muuten JUMI PT:lle.
- Tarkista: tulos.txt ei `error CS`; bo-profiili = b5 (≈ 0,70 0,64 0,70 0,76 …); ko: ei suorakaiteita portin vierellä, ei kaidelaikkuja;
  räystäskartan raportti (b0-rivin QA-paluu) ~11,2 M kolmiota.
- Sitten NS:lle runkoon junaan 216 poimittavat (k17-haara, 13fe8b7a5:n jälkeen): 548a1b169 87c821fd3 11e8044fa 9f498cdc9 e30ca990f
  7e7554663 b1fead5dc d1415715d (96a0a64fe/5d75ef4d7/2fc42c04b korvautuivat; tarkista, ettei UV2-räystäsliukukoodia jää, jos poimitaan
  koko haaraero). Pari PT:lle: lähikuva bo vs b0 ja kauko ko vs k0 (kooste kuten raystaskartta-b0-b5.jpg).
- Mahdollinen siivous ennen runkoa, jos PT haluaa: vianhakunäkymät (voima 2/3), raystasjalki ja raystaskartta-kuva.

## AVOIN 2 (ennallaan)
- Lokit T7:lle kuittausten jälkeen; LAV v4 odottaa levyä ≥ 70 Gi. linssiseppa-pohja-lento-worktree jätetty (ei mergetty mainiin).

## LISÄYS 10.3x: AVOIN 1 TEHTY
- k06z20 (lokit/pari-k06z20-20261101-100859): oletus ilman QA:ta = b5 (0,70 0,64 0,70 0,76 0,83 0,89 0,94 0,97 … 1,00), 10,9 M kolmiota,
  ei error CS; kaukokuvassa ei suorakaiteita eikä kaidelaikkuja. Pari raystas-oletus-b0-bo.jpg + raystas-oletus-kauko-k0-ko.jpg → PT.
- 8 committia (548a1b169 87c821fd3 11e8044fa 9f498cdc9 e30ca990f 7e7554663 b1fead5dc d1415715d) → NS:lle runkoon 216 (viesti lähetetty).
- Seuraajalle: odota PT:n kuittausta parille ja NS:n vahvistusta rungosta; vianhakunäkymien siivous vain PT:n pyynnöstä. Muuten ei avointa.
