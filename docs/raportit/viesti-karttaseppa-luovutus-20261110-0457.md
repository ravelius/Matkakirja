# Karttaseppä: luovutus 10.11.2026 klo 04.57 (KS)
Syy: konteksti 26 % (hook), pehmeä raja, luonteva tauko (odotan JU:ta). Korvaa -0325:n. Vanhemmat historiaa.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  `B=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/b3-lontoo/`  (ei git-repoja)

## VALMIIT TÄSSÄ VUOROSSA
1. **Pariisin katot koe7 = saumat 0, PT HYVÄKSYI Mac-parin 04.4x.** Syy: _tliitokset (katot.py) palautti koko talon korjaamattomaksi
   "kierteessä" (koe6:ssa 72 taloa; saumat = way/54661742). koe7: `KATOT_KIERRE_OHITA=1` → vain toistuva kolmio pois, palautuksia 0
   (Pariisi ja Lontoo). saumat.py 906 → 0, räystäät ennallaan, Lontoo ≈ sama. Kaikki luvut `$K/koe6-tulos.md` lopussa.
   HUOM: tA1:n 84 % oli harhaa (546802:n uusi mansardi, ei sauma) → arvioi saumat `$K/profiloi/saumat.py`:llä (boksi), ei eroalueesta.
2. **Committi 8d8e987b0** haarassa karttaseppa/katot-koe7 (pushattu, EI PR:ää vielä): tools/katot-luuranko/ (skriptit + README)
   + smaragdikommentit kulttuuri-kategoriat.js:571 ja fokusvirta-lontoo.js:454 (jonon kohta e TEHTY). Worktree /Users/Shared/Claude/wt/karttaseppa-katot-koe7.
3. **Lontoon kuvat (jonon b) TEHTY**: 02-a rajattu 1640×658 alkuperäisestä, 07-b vaihdettu Hollarin luonnokseen 670 px (PD);
   `$B/pelinakyma/havainnot-lontoo.md`, LAHTEET.md, vanhat `$B/commons-kuvat/vanha-0335/`.

## TYÖN ALLA / JONO
a. **iPad-pari koe6/koe7** (PT:n ehto ennen junaa): JU:n jonossa I1–I2 (NS- ja NUI-ajojen jälkeen), ohje `$K/ajopyynto-ipad.md`,
   lokit /Users/Shared/Claude/proto-3d/lokit/karttaseppa-katot-ipad-pariisi-{koe6,koe7} (kuvat ka-ipad-pariisi-*-lahi-{45,70}).
   Kun JU kuittaa: tarkista "talot tila: palat" > 0 ja komennot perillä; pari (koe6|koe7 + saumarajaus kuten
   `$K/kuvat/a/pt/rajaus-pariisi-koe6-koe7-lahi-*.png`; saumakohdat eri ruudussa iPadilla, etsi silmällä) → PT 3 riviä → PT kuittaa junaan.
   Sen jälkeen: PR haarasta karttaseppa/katot-koe7 (vihreä → yhdistä kaavan mukaan) ja palojen vienti JU:lle PT:n ohjeen mukaan.
c. Sisäkulmien rypyt: koe7:n Mac-kuvissa ei näkynyt tarvetta; ei avata ilman PT:tä.
d. Nimiäänet Lontoolle vasta Pariisin oton jälkeen (KK 01.0x); nimilista 43 (`$B/sijainnit.json` lontoo:*).

## Tiedoksi
- katot.py:ssä myös `KATOT_KATKOLOKI=polku` (palautusten kirjaus); `$K/aja-katkoloki.zsh N`, `$K/aja-koe7.zsh`.
- Mac-ajojen numerointi `$K/ajopyynto-mac.md`: viimeisin 31 (24 ajettiin vaikka peruttiin).
- Faktakorjausten kopiot ja korjausskripti: ks. -0325 Tiedoksi.

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Omia ajoja ei käynnissä.
