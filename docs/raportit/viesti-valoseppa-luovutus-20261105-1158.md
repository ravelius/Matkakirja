# Valosepän luovutus 5.11.2026 klo 11.58

Syy: konteksti 25 %, pehmeä raja (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261105-1125.md. Linjaukset ja KS:n tiedostojako: -1059 ja sen lisäys 2. Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

Päivän linja voimassa (PT 11.3x): 10.52 ja 10.55. YÖTILA 22.32 EI ole voimassa. Vanhojen scratchpadien poisto oli kertapoikkeus, Raamatun 12.9 ennallaan.

## Tila
Pariisin kartan saumojen syy löytyi, korjaus on tekemättä. Lue ensin _tyo/linssiseppa2/pariisi-tyyli/striimi/pariisi-viat/TULOS-tikkaat-a5323cf4e.md, osiot "Pyyntöloki" ja "Laitteen kokoinen valinta".

## Todettu
- Kaikki aiemmat Mac-tikkaat valitsivat tarkkuuden 640×480-näytöstä, vaikka kuva on 2752×2064. Niiden saumatasot eivät kerro iPadista. sse 5 -kokeen tulos ei päde laitteeseen.
- Laitteen kokoinen valinta batchissa ilman ikkunaa ja koodia: komento `maasto siirtyma 5 0 30` (kerroin 4, 2560×1920, SSE 20 ennallaan). Malli: sk-pyynnot2.txt. Ikkunatila ei käy, kun omistaja on Macilla, ja se pysähtyy peitossa (JU).
- Tällä valinnalla sauma näkyy tasoilla z12, z13 ja z14. Kuvat: lokit/julkaisija-pariisi-pyynnot2-9afad1ef6.
- Syy: kameraa lähin maastoruutu saa yhtä tarkemman kuvatason kuin naapurinsa, ja vierekkäiset tasot on piirretty eri tavalla. Loki: z14-kuvassa z14 x 8296-8299 keskisarakkeeseen, z13 x 4144-4153 muualle. KarttaKerrokset.cs:n kommentti sanoo saman ("Rasterien taso seuraa geometrialaattaa").
- Mitä rajalla muuttuu: z11|z12 kaupunkimassa (SMassaZ12 0,38, z11:llä ei massaa). z12|z13 katot ja pikkukadut alkavat. z13|z14 katot 0,62 → 1, ja tiet ovat maastossa 2× leveämmät, koska pikseliviiva on sama puolikkaalla tarkkuudella.
- Kirkkausero rajan yli on vain 3-7 tasoa 255:stä (scratchpad-mittaus), joten sauman tekee piirron sisältö eikä sävy.
- z15: näkymässä vain z14-paloja, rajaus 2,373:ssa puhdas.

## Ei tiedetä
- Miltä tämä näyttää iPadilla: kerroin 4 on 1920 px, iPad 2064. iPad-ajoja ei nyt tehdä (10.52).
- z15:n länsireunaa ei ole rajattu. z16 ja z17 eivät olleet ajossa.
- Tummien läiskien syy (r-z15 luoteessa). Haamut 0,13:lla ja nimet: ei arvioitu.

## SEURAAVAKSI
1. Korjaus kohdistetaan piirtoon, koska kuvatason vaihtoa ruudun reunalla ei voi poistaa Cesiumin asetuksilla, joita olen löytänyt (Cesiumin lähdekoodi ei ole koneella; ei todistettu). Suositus: lähennä vierekkäisiä tasoja ElavaTyyli.cs:ssä, pienin ensin: z11:lle heikko massa, z12:lle heikot katot tai massan säätö, SKattoZ13 ja TieKerroin z13:lle. Kokeile Macilla sk-pyynnot2:lla.
2. POHJA: julkaisija/pariisi-219 99035b765 (tyyliversio e30, JU 11.54), ei a5323cf4e (e22). Poimi päälle komento `pallo pyynnot` 9afad1ef6. Muuta ElavaTyyliVersio ja lisää SHA:t KS:lle: elävän kartan värien muutos saaren ympärillä ja ElavaTyyli.Striimi-kentän muutos pitää kertoa KS:lle ennen (-1059 lisäys 2).
3. Lukittu k55 on pohja: tasojen välinen lähentäminen muuttaa ilmettä, joten ennen/jälkeen-pari ja rivi KK:lle ja PT:lle ennen kuin tästä tehdään lopullista (Raamattu 9.5). Käytä samaa rajausta (memory: pari-sama-kohde-kokonaan).

## Skriptien opit
- pyynnot.py ja hyppy.py olivat scratchpadissa: tiedostot talletettu pariisi-viat/-kansioon, kun kopioitu tämän luovutuksen kanssa.
- `pallo pyynnot paalle` on annettava ennen jokaista ajaa: siirtymäkoodi voi sulkea lipun. Muistissa olevia paloja ei lokiteta uudelleen, joten loki kertoo vain uudet pyynnöt.
- POIKKEUS ArgumentOutOfRangeException ui-komentojen jälkeen: LAV:n mukaan Unityn oma hakuindeksi (JU 11.54), ei ole vaikuttanut kuviin.

## Muuta
Worktree k30 on haarassa linssiseppa2/pariisi-saumat (9afad1ef6, natiivi-backup). jarvet-koe on tallessa natiivi-backupissa. Vanhat scratchpadit: /Volumes/T7 4TB/koodaus/valoseppa-scratchpadit-20261105.
