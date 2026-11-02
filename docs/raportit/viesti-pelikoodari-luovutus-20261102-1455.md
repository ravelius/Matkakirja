# Pelikoodari: luovutus 2.11.2026 klo 14.55 – juna 218

Edellinen: -20261102-1435 (PR 5994, a46f766e4): sen jono ja huomiot ovat voimassa, ellei alla toisin. Syy: konteksti pehmeällä
rajalla (27 %). Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218
(commitit paikallisia, ei originia), kärki **58ba0b403**.

## Tehty tässä vuorossa
- **9e31aa94e** 永寿宫 2b kytketty: rakennukset-v103, tausta-v103, palatsi-esto-v28. Testit oikealla juurella 796/796: palatsi
  1634 → 1664 solmua, kaikki saavutettavissa, umpikujia 0 (+ sali 1); unity-tarkistus 0. Testijuuri (symlinkit _valmiit/:iin):
  /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/77046d2a-c63a-47fc-bf3a-0336f66c5252/scratchpad/juuri-ys,
  ympäristö MK_JUURI=<juuri-ys> MK_POHJA=kk-pohja-v1d-pk8 MK_RAKENNUKSET=kielletty-rakennukset-v103 MK_TAUSTA=kielletty-tausta-v103
  MK_ESTO=palatsi-esto-v28 MK_OSAMALLIT=osamallit791-v10 MK_PUUT=kielletty-lahipuut-v13 ./kaanna.sh. Rivi PT:lle lähetetty.
- **58ba0b403** jono 2 (KK 13.38 kohta 2) DRONELENTO TASOLLE 1: JuoksuAvaus.AlkuT = 0 (const), PorttiAikajana lento kuten keskeltä
  (LentoAlkaa 0, MaataPitkin 4,35+Y, KuvatekstiPois 16,2+Y), Tahti ja PystyNosto myös tasolla 1. LuoMaailmaAvaimet tasolla 1: keskeltä-
  avaimet 12,4+Y:hyn asti, sitten (16,2+Y; −63,9, 58, 112,5), (19,9+Y; −122,9, 44, 292) ja sukellus kuja-75:n linjalla Luovutus-avaimesta
  mitattuna (3,4 s / 62 m / 26 m), (2,3 / 26 / 9), (1,3 / 9 / 3,2). Keisarin aikajana PorttiViive 0,55 s (PuyiLahteeT 22,4+Y kaikilla;
  Luovutus, LuovutusLoppu, SekoitusAlku/Loppu nyt ominaisuuksia). KatsePiste tasolla 1: lennon katse → oven ohi kujaa pitkin
  (Luovutus − 3,5 s, 2,5 s). Ovien auetessa kamera (−138,7; 3,2; 410,3) eli 18 m oven eteläpuolella. Testit 796/796: tason 1 nykäys
  ≤ 266 m/s³, nopeus ≤ 89 m/s, ammattimittaus (kääntö 51 °/s kaaressa, nyökkäys 19 °/s), ei osu geometriaan koko lennolla; keskeltä-alku
  tavulleen ennallaan. PT päivitti 2.177:n (#5999).
- **Bugi 2 (jono 6) SELVITETTY**: ristikko = LÄNTISEN rakennuksen lähikoristeen kannatinrivit (koristeet.json, LAV:n data). Pelin x on
  peilattu (itä = −X): peli (78,4…84,3; −382,66) = pohja (−75,97…−81,86; −7,15…−7,36) (JuoksuPalatsi.Pohjaan). v13 poisti peilikuvan
  idästä (x 66…89). Rivi LAV:lle 14.5x: lahipuut-v14 = v13 − dougong-intercolumn y 9,59 rivit z −7,67…−6,93 (x −90,23…−69,31, 26) ja
  z −22,50…−21,75 (x −89,70…−68,78, 26). **Kun JU on vienyt v14:n → LahipuutKansio kielletty-lahipuut-v14/ (JuoksuSokkeloMaailma.Lahipuut.cs)
  + MK_PUUT, testit, pari 218q vs uusi samasta kohdasta (104–105,5 s) PT:lle.**

## Jono (KK:n järjestys)
1. **Avaus (KK 13.38 kohta 5) ODOTTAA YHÄ KK:N VASTAUSTA** (ei vastausta 14.55 mennessä) – ks. edellisen luovutuksen kohta 1. Huom:
   lennon jälkeen avaus jatkuu kuten ennen (BottiAskel kääntää keisarin HuoneS 9,5 m:ssä).
2. **Latauskuva** (edellinen kohta 3): Codexin 3:4-kuva ei vielä postilaatikossa (origin/claude/postilaatikko kärki 47438c330).
3. **Todistus KK:lle ja PT:lle** (edellinen kohta 4) kun 1–2 valmiit.
4. **Salitallenne** 储秀宫, 翊坤宫 (ja 永寿宫) → PT, JU:n esikatseluvuorolla. Valmis pohja: proto-3d/_tyo/pelikoodari/sali-218/ (aja-sali.zsh,
   aja-sk.zsh, sk-sali.txt; runko oli pelikoodari/sali-218 = kapea-reitti + piirtajat-218). Uusi runko: merge kapea-reitti-218 (58ba0b403) +
   pelikoodari/piirtajat-218 → pelikoodari/sali-218b. Alku/maali pohjassa (reitin päät, paikka_pohja + paikallinen):
   储秀宫 (−128,97; 417,91) → (−129,61; 439,89); 翊坤宫 (−127,28; 373,01) → (−127,92; 394,99); 永寿宫 (−125,52; 319,01) → (−126,16; 340,99).
   sk-sali.txt käyttää `botti 1` (Autopilotti on nyt pois oletuksena) ja `taso 0`.
5. lahipuut-v14 kytkentä (yllä) heti kun vienti on _valmiit/:ssa.
6. Eunukkikorjaus, eunukkimäärät (12.13), Taso1ReittiPortiltaAukiolle03-siivous, kameratallenne (kamera-218/SEIS) JU:n vuorolla.

## LISÄYS 15.0x: luovutuksen JÄLKEEN tulleet viestit (KÄSITTELEMÄTTÖMIÄ – tee nämä)
- **KK 14.5x: AVAUS HYVÄKSYTTY** (jono 1 auki, kaksi viestiä samaa sisältöä): lento → ovet auki → keisari juoksee kujalle ja PYSÄHTYY
  vastapäisen seinän eteen (uusi seinämekaniikka 7b8456f41) → huuto olan yli ovelle → kamera kiertää ripeästi taakse kujan suuntaan →
  3-2-1 → pelaaja kääntää itse ohjeen kanssa. Jos vastaseinällä voi kääntyä myös OIKEALLE, opeta ensin oikea pyyhkäisy (omistaja 27.10.
  08.26 "ehkä mieluummin vain oikealle"), muuten vasen. T-risteyksen opetus ennallaan. Avauksen botti pois (JuoksupeliNakyma
  AvausKesken-haaran BottiAskel). Tallenne taso 1:n alusta (jono 3) KK:lle ja PT:lle ENNEN junaa; KK tarkistaa omistajan sanoja vasten.
- **JU 14.40**: rakennukset-v103 / tausta-v103 / esto-v28 viety – jo kytketty 9e31aa94e, SHA256SUMS täsmäävät (b07f21d87187,
  451f43567125, f1523df574cc). Ei toimia.
- **LAV: lahipuut-v14 tehty** (809458bef99b, = v13 − läntiset etu- ja takarivit); JU vie → kytke (jono 5). Vastattu LAV:lle 15.0x:
  tee v15 = v14 + v13:n turhaan poistamat itäiset rivit takaisin v12:sta → kytke v15, jos se ehtii, muuten v14.
- **LAV: 体和殿** th-tihedian: rakennukset-v104 + reitti S-N (puutarha-kaista5:n liitoksista keskiakselia läpi), tausta-v104, esto-v29
  (PT kuittasi; JU vie) → kytke kuten 9e31aa94e kun viety. **太极殿** tj-taijidian: rakennukset-v105, tausta-v105, esto-v30 tulossa.
- **LAV 15.0x: lahipuut-v15 tehty** (849fe603e028) = v14 + 52 itäistä riviä takaisin v12:sta (x 66,6…88,1, y 9,586); JU vie →
  kytke v15 (ei v14:ää): LahipuutKansio kielletty-lahipuut-v15/, MK_PUUT, testit, pari 218q vs uusi (104–105,5 s) PT:lle.
