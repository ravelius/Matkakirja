# Alkulentoajo rungolla d2f94a515 (iPad Pro 13, 25.10.2026 klo 08.40–08.43): hyppyä EI toistunut

Tilaus: PT. Aineisto: proto-3d/_tyo/linssiseppa2/varjot-koko/ra1-2alku/ (alku.zsh, normaali v4-alkulento, kuvat Alkulento-1..3) vs. rd2f9-1ja/ (J/A-ajo, jossa hyppy).

## Uusinta (alku.zsh, 60 s)
Kamerahyppyjä 0, hyppysuoja-rivejä 0, nykäyksiä 0 (suurin ruutu 17 ms), pysähdyksiä 0, alkunykäyksiä 0. Alkulennon vaiheet normaalit (PuyiLahtee t 27,4, OhjausPelaajalle t 46,4).

## Alkuperäinen hyppy (rd2f9-1ja/konsoli.txt rivit 1202–1319)
- 108 peräkkäistä "hyppysuoja pehmensi kameran hypyn" -riviä (ruudut 1–108, avaus 24,22 → 27,10 s) ja lopuksi 1 KAMERAHYPPY 0,58 m / 0,0° (t 60,2 s, avaus 27,12, avausW 0,00).
- Kameran sijainti: alussa kp (104,8; 62,6; −581,9), lopussa kp (126,2; 23,2; −699,6); Puyi (126,7; 0; −754,7) eli kamera laskeutuu Puyin taakse, 55 m päähän, alkulennon laskuosuudella. Hyppysuoja ei osu mihinkään kappaleeseen: kaikissa riveissä "osa 0 (0, −1) profiili kyllä" = väylän osa 0, ei estekappaletta/kattoa.
- Syy todennäköisesti testin ajoitus: J/A-skripti (yoC.zsh) antaa `valo jaady 0` ja `uudestaan 777` 50 s `v4`:n jälkeen. Tässä ajossa kenttä latautui nopeammin, joten `valo jaady 0` osui alkulennon keskelle (avaus t ≈ 20,1 s, rivi 1136) eikä sen jälkeen kuten ajoissa 406d (t 37,4) ja 0fef/8e5b (0 hyppyä). Aika vapautui kesken kameran lennon → 108 ruutua hyppysuojaa. Normaalissa alkulennossa hyppyä ei ole.
- Ei toistunut → ei ole rungon d2f94a515 regressio, ellei PK:n kamera ole herkkä aikaan vapautuksen hetkelle kesken alkulennon (PK tarkistaa halutessaan).
