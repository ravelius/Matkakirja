# Valosepän luovutus 4.11.2026 klo 02.18

Syy: konteksti 32 %, kova raja 35 %. Edellinen: viesti-valoseppa-luovutus-20261104-0150.md (työkalut). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

## Tila
- **k26 = 057520875** (linssiseppa2/pariisi-k17, natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-koko17, p26, 611/611). Lue ensin _tyo/linssiseppa2/pariisi-tyyli/k26/TULOS.md. Parit k26/pari-a-z13.jpg, pari-a-z15.jpg, pari-z17.jpg, pari-gdn.jpg. Ei laitteella, ei Unityssä. PT:llä; KK:n kanta odottaa.
- KK:n lista: lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, osio k25 (ja mahdollinen uudempi). Kohta 8 pyöreys: ei vielä.

## AAMUN KUVA (KK: koko Pariisi parhaasta versiosta viimeistään 05.30, ei junaan)
Vastattu PT:lle 02.0x: ei laatta- eikä vientivaihetta, laatat piirtyvät iPadilla pyynnöstä. Aika = käännös (JU tietää) + ajo 21–30 min (k20, f1fb). Viimeinen aloitus 04.00, jos käännös ≤ 30 min eikä JU:lla ole jonoa. Paras versio nyt k26, jos PT/KK ei toisin sano. Yhdistelmä NS 3332c8e15:een (haivytys-k24-218): merge-tree k26:n kanssa, vain Versio-rivi törmää, ei ajettu yhdessä; k23–k26 Unity-käännös todistamatta. Vuoro PT:ltä.

## Seuraavaksi
1. Odota PT/KK:n kanta k26:een; uusi versio k27/, p27. Havainnot: z15 kadut hallitsevat, julkisivut katoavat pienennettäessä; z13 raidallinen; z17 tummempi ja karkeampi; julkisivu vain itä–länsi-riveillä; kerma z17 20,4 (2029 15,1).
2. Varmista NS:ltä, millä tasolla peli näyttää 2029:n rajauksen (y-laaja 0,08); pari-a-z13/z15 ovat molemmat, tasoa ei ole varmistettu.
3. Tasoraja z15 | z16 on nyt näkyvä (rivimassat vs. pienet talot): katsotaan laiteajosta.
4. Muistia ei mitattu: Z14-palalle voi syntyä kaksi talotusta (noin 2,2 Mt lisää).

## Työkalut
k26/aja.zsh <tunnus> 17 15 13. k26/parit.py k26 <tunnus> (z13, z15, ankkuri Luxembourgin allas, 5,4 m/px; kuvaan m/px). pari-gdn: data k22/data-rata, ELAVA_ALUE=66384,45072,66399,45087, rajaus 1560,0 koko 1950×3023 → 852×1320. pari-z17: 2029 k23/pari.jpg:n vasemmasta, k z17.jpg rajaus 496,928 koko 1124×720 (eri mittakaava, merkitse m/px). Overpass kielletty; robots.txt erillisessä komennossa ennen hakua.

## LISÄYS: NS (k24 + 3332c8e15, Mac 640×480, kuvaa ei vielä katsottu)
z12:lla kermaisia alueita ratapihojen ja hallien kohdalla (esim. Noisy-le-Sec), ne katkeavat suoraan z11-palstarajalla 2,4609 ja puuttuvat z11:ltä. Kuva lokit/esikatselu-20261104-015532/e-0-13.png, x noin 2570, y noin 330–400. NS ei koske ratapihoihin; tämä on VS:n. HYPOTEESI koodista, ei todistettu: landuse-silmukka alkaa z ≥ 12, joten avoinM avaa ratapihan vasta z12:lla, ja k26:n raidenauha alkaa vasta z13:lla, joten z12:n piha jää kermaksi. Tarkista myös, koskeeko tämä koealueen ulkopuolta (2,4609 < 2,4710 + vyö).
