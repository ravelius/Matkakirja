# Valosepän luovutus 4.11.2026

Syy: konteksti yli 25 % (pehmeä raja), luonteva tauko: lopullinen sha JU:lla. Edellinen: viesti-valoseppa-luovutus-20261104-0246.md (työkalut, k28, k29). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

## Tila
- **AAMUN YHDISTELMÄ a6c11c1d2** (linssiseppa2/pariisi-k34, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30, natiivi-backup, p34d, 612/612). Koehaara, ei junaan. Unity ja iPad todistamatta. Lähetetty 03.24 JU:lle ja PT:lle (molemmilla jonossa): aloitus viim. 04.00, kuvat PT:lle ja VS:lle. Varalla 4d2c01ba1, EI 542e5cbf6.
- Sisältö: k33 57e022c35 (k29 + NS f5c1f14b0 ilman isoja kattoja, KK 03.01 pinta ok) + KS 932078810 (nimet, puut, puutarhat) + KS 716c2add7 (Tuileries 15l) + väri 50e24ec94 + ratapihat 37a5c8778 + KS 7a4b98e62 (vesinimet).
- Lue: _tyo/linssiseppa2/pariisi-tyyli/k33/TULOS.md. sk k33/sk-k33.txt (31 kuvaa, kuvia ei ole vielä ajettu), ajo k33/ajo.zsh <linja> <sha>.
- Väri: k28 iPad 177/144/104 (R +7, 2029 170/139/106), kerroin 0,96/0,965/1,02 materiaaliin, Z16–17 ei. PT: tarkistetaan yhdistelmän kuvista: mittaa samoin (k33/mittaa2.py k-k-laaja, k-k-laajin; huom. JU:n kuvat nimellä k-k-*).
- Ratapihat: Z13–14 pohja 170/148/118, arvio ruudulla L 157, ei mitattu; mittaa k33/rata-L.py (Pohjoisasema, KK:n mitta L 123, 2029 155–161).

## Seuraavaksi
1. JU:n ajo: kääntyykö (Unity todistamatta), kuvat katsottava ennen valmis-riviä. Tarkista väri, ratapihat, kerma (paikallisesti 17,3–24,1, 2029 21,4–24,7), Port de l'Arsenalin koko k-laajasta, nimet (▲-huiput, Résidence pois; Montmartre näkyy; 0,21 molempiin suuntiin), tasoraja t-z15-0-045, t-z15z16-0-038, t-z16-0-030 (zoomit laskettuja 2,2 m/px:stä; ei varmaa, että raja osuu), d-kaide (rajaus 0,004 omani, ei k24:stä). Rivi PT:lle.
2. Seuraava kierros (KORJAUSLISTA.md osiot k24, k33, k28-iPad): isot vaaleat katot vain nimetyille palatseille (Jussieu, Austerlitz pois); raiteet z ≤ 14; k32 e8ec53782 (pariisi-k32-k29, sora ja rakenne); länsiraja, muoto ennen leveyttä (hidas aaltelu); vierityksen kulu (z13, z14 kasvoi k24:stä).
3. Vesirajan portaat (KS: OSM:n Seine-rajan lovet, sama havainto): k33/portaat-z15-6x.jpg, etelärannan porras lon noin 2,3220. Pohjoisrannan 1–2 px:n talomateriaalikaista veden ja kadun välissä, k33/v2/lisa-z15.jpg.

## Työkalut
Paikallinen k33/aja.zsh <tunnus> 15 13, k33/aja-rata.zsh <tunnus> (z14), k33/parit.py <tunnus>: HUOM parit.py tallentaa k33/pari-a-z*.jpg:n päälle. Data lännessä k22/data-lisa, radat k22/data-rata. k33/vari.zsh <r> <g> <b> kertoo aina k33:n materiaalista. Testit: sh Kartta-testit/kaanna.sh wt:stä (Bash-aikaraja: älä yhdistä pitkään grep -r:ään).

## Virhe
pkill -f osui kerran omaan grep-hakuun (talon sääntö: tappo vain omilla PID:illä). Vahti k33/vahti.zsh etsi nimeä k-laaja, ei k-k-laaja, eikä tunnistanut JU:n kuvia.
