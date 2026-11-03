# Pelikoodari: luovutus 3.11.2026 klo 09.57 – juna 218

Edellinen: -20261103-0650 (85b1439d3, osio "Jatko 09.0x") – voimassa, ellei alla toisin. Syy: konteksti (hook 26 %).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (paikallinen), kärki **2bf9e1ae2**.
Testit: bash Peli-testit/kaanna.sh (EI zsh) 803/803; zsh tyokalut/tarkista.sh → unity-tarkistus 0.

## Rungot (proto, paikalliset haarat; kaikki = kapea-reitti-218 + piirtajat-218 b51e69a8b, merge-tree + commit-tree)
- sali-218z **9cf0c1c2c** = 218y + 455c3446a (matalan salin varakorkeus katon huipun alle). Sarja valmis 09.53 (taso1b-218z ajossa).
- sali-218aa **f10e9ad6e** = 218z + 2bf9e1ae2 (polkukamera myös, kun kameran nykyisen paikan ja tavoitteen välissä on muuri;
  ty 218y/218z s 58,6 tiyuandianin portti: kamera oikaisi kulman pielen läpi → suoja-vedot 2,9/3,3 m + räystäsnosto massaan, 52 ruutua).
  Loki: "polkukamera alkaa … (kulma kameran takana)". **JU:lle pyydetty 10.1x** 218z:n taso1b:n perään:
  `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218aa/ketju-aa.zsh ty xf th yk cx tj cc ys taso1b`.

## Taulukot PT:lle (sali-218b/)
- taulukko-218y.md (218v/218y) ja **taulukko-218z.md** (218v/218y/218z) lähetetty. Summat m/r(yläraja)/p/v:
  218v 190/763/466/901 → 218y 166/386/160/765 → 218z 158/376/145/855.
- Ehdotettu PT:lle 09.5x: **218z voittajaksi** → yhdistä natiiviseppa/juna-218:n (8d18d7047, valo 0ffb7e562) päälle ennen kuvia (PT:n
  ohje 09.1x: sali-218y/z on vanhemmalla pohjalla, salikuvissa vanha valo). merge-tree juna-218 + sali-218z = puhdas. PT ei vielä kuitannut.
  Jos 218aa on parempi (ty massassa 57 → ~0 odotettu), voittaja 218aa samoin juna-218:n päälle.
- SEURAAVA: 218aa-sarjan jälkeen `cd sali-218b; python3 -I mittari-taulukko.py yk-218z yk-218aa … (8 salia + taso1b, z ja aa)` →
  taulukko-218aa.md + PT:lle ≤ 3 riviä. Tarkista ty-218aa:n s 58,6 (kamera-*.txt x 151–157, z -746…-737; huom-*-ty.txt).

## Mittari (sali-218b/mittari-taulukko.py)
- Uusi sarake "reunassa (yläraja pois)": kiinni → uudestaan -odotuksen poisto seuraavasta yhteenvedosta (cx-218y 394 → 4; kiinniotossa
  kamera seisoo seinän vieressä joka ruudussa ja yhteenveto tulee vain 10 s välein). Tuntee -218y/-218z/-218aa (n[:-len(r)]).
- taso1b: aja-sk.zsh teki videon kansiosta taso1b, tallenne on juoksu → korjattu sali-218z/ ja sali-218aa/aja-sk.zsh.

## Avoimet
1. 218aa-taulukko (yllä) ja voittajan yhdistys juna-218:n päälle PT:n kuittauksella → JU:lle kuvat/juna.
2. Ennallaan: tj massassa 44 (174,5–178,5 s 218y), ys massassa 46–56, xf/th piilossa ~22/45. Havainnot: sali-218b/salit-218l-havainnot.md (loppu).
3. Ei tehty: vesiastiat vedenkantajan täyttöpaikoiksi (LAV: pronssit-esi/vesiastiat-pk.json) – vedenkantajaa ei ole; arkiset hahmot
   odottavat Codexia (työlista). Ennallaan: ys 1.2 räystään parrut, seinähäivytys pois (omistaja 10.43), KK:n paketti vasta puhtaana.
4. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-0540 (PR 6085 auki).
