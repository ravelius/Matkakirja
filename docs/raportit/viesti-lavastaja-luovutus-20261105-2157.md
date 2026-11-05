# Lavastajan luovutus 5.11.2026 (lattia25) — LUE TÄMÄ KOKONAAN

L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen/lattiakoe. Loki: muuri/KORJAUS.md (21.4x, 21.5x). Ei vientejä.

## Käynnissä
JU ajaa L/aja25b.zsh linjalla 2 (kopio T/lav-aja25b-l2.zsh), 3 kuvaa, juuri koejuuri-lattia25, tulos L/kuvat25b-koe. JU ilmoittaa LAV:lle. Älä pyydä uutta ajoa.

## PT:n käsky (sitova, 21.5x)
Lattia25 hyväksytty jatkoon näiltä osin, EI vientiä, EI kuittausta kokonaisena. Lupa yhteen ajoon, enintään 3 kuvaa (tämä). Korjausta ei ennen kuvia. Tulos riviksi PT:lle täysikokoisten kuvien jälkeen, ja samalle riville: näkyvätkö upoksissa olevat sokkelit (>2 cm 117→125) kuvassa. Uusi vika → vaihtoehdot PT:lle, ei paikkausta. Viestit PT:lle ≤ 3 riviä.

## Kun kuvat tulevat
1. Tarkista unity.log: juuririvi lattia25, "avataan", ainoa "ulkorengas 24 palaa", ei muita juuria (L/kuvat25b-koe/unity.log).
2. Rajaa täysikokoisina (PIL crop, L/rajaukset25/), katso ennen "en näe":
- kaista-pohjoinen: hahmo (-455; 671) lattia 0; kaista x -450...-470, z 675-679 hahmon edessä; malli taitos 21 0,729 → 25 0,782.
- x500-ita-z-180: hahmo (502; -185) lattia 0,34; x 500 askel suurin 0,044 z -180; sokkeli (497,9; -173,9) -6,5 cm, muut lähellä (497,8; -168,1) -2,1, (486,6; -173,9) -3,5, (493,7; -195,2) -10,5.
- x500-lansi-z330: hahmo (-498; 330) lattia 0,14; x 500 askel 0,063-0,066. Lännen suurin 0,077 on z 370:ssä, mutta puut peittävät; kuva ei näytä pahinta. Upoksissa olevaa sokkelia ei tässä kuvassa; syvimmät länsi (-481,8; -113,8) -40,6 cm jäävät kuvaamatta: sano se PT:lle.
Peittoarvio oli mallista oletetulla kameralla (8 taakse, 10 ylös); puu voi silti peittää. Jos kohta ei näy kuvassa, sano se rivillä, älä väitä nähneesi.
3. Kirjaa KORJAUS.md:hen, rivi PT:lle.

## Avaintiedot lattia25:stä
Rakennus L/tee25.py (pohja koejuuri-lattia21; valokuva ja UV1 tee23:sta). Tulokset tee25-tulos.txt, tark25-tulos.txt (21, 23, 24b, 24d, 24e), tark25-tulos-25.txt, tark24-tulos-25.txt. Tarkistus L/tark25.py (taitosraja 0,35 on alaraja: 0,348 ei näy, 0,683 näkyy, väli mittaamatta).
Kuvat 1. ajosta kuvat25-koe, rajaukset25/: ei uutta näkyvää vikaa viidessä kuvassa; PT katsoi kolme rajausta. Selvittämättä: länsi z -512:n ohut varjoviiva (myös 24e:ssä), itä z -512:n pieni tumma merkki (rajaus ita-z-512-700.png noin 490, 340).
Ulkona x > 500 idän yli 0,30:n taitosruutuja hieman enemmän (7848 → 8107). Kuvan ajo-oppi: hahmo tarvitsee `sijoita X Z suunta lattia`, muuten y 0.

## Jonossa, ei aloitettu
Kuten -2135 (git show 53b7d09b2:docs/raportit/viesti-lavastaja-luovutus-20261105-2135.md, kohta Jonossa): PK:n konsoli, räystään alapinta, marmoriterassi; muurien kiertosuunta + V4_gold-räystäs; h-zhongyoumen, h-zhongzuomen; valkoinen viiva (13; -407); (-87,5; 302,5); S-rengas-itä harmaa levy; vaakalevyt x -420; puita ilman tyveä x 136 ja 300. ND odottaa.
