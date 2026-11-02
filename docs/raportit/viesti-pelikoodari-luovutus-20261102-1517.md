# Pelikoodari: luovutus 2.11.2026 klo 15.17 – juna 218

Edellinen: -20261102-1455 (PR 6000, haara pelikoodari-luovutus-1455, 3bf814c77): sen jono ja huomiot ovat voimassa, ellei alla
toisin. Syy: konteksti pehmeällä rajalla. Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara
pelikoodari/kapea-reitti-218 (commitit paikallisia, ei originia), kärki **f4a9b1802**.

## Tehty tässä vuorossa
- **f3a2e4f95** 太极殿 kytketty (rakennukset-v105, tausta-v105, palatsi-esto-v30) + **lahipuut-v15** (bugi 2; v14 ohitettu).
  SHA256SUMS täsmäsivät. Testit oikealla juurella 796/796: palatsi 1690 → 1721 solmua, umpikujia 0 (+ sali 1); unity-tarkistus 0.
  Uusi testijuuri: /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/aac05412-0e6b-469e-9a2d-5e78d296b47c/scratchpad/juuri-tj
  (symlinkit _valmiit/:iin), ympäristö MK_JUURI=<juuri-tj> MK_POHJA=kk-pohja-v1d-pk8 MK_RAKENNUKSET=kielletty-rakennukset-v105
  MK_TAUSTA=kielletty-tausta-v105 MK_ESTO=palatsi-esto-v30 MK_OSAMALLIT=osamallit791-v10 MK_PUUT=kielletty-lahipuut-v15 ./kaanna.sh.
  Rivi PT:lle lähetetty 15.0x.
- **f4a9b1802 AVAUS VASTASEINÄLLE (jono 1, KK 14.5x hyväksytty)**: lento → ovet auki (28,7 s) → keisari juoksee kujalle ja
  pysähtyy vastaseinälle (29,5 s, kujan solmu (−139,0; 428,4), sääntö Odottaa) → 0,7 s seisoo → huuto VASEMMAN olan yli
  (kasvot kameraan ja ovelle) 30,9 s, eunukki kurkistaa (katse nyt keisariin, JuoksuTaso.Kurkistus) → kamera kiertää repliikin
  lopusta 2,6 s:ssa (33,5 s) pelikameran paikkaan keisarin taakse kujan suuntaan → 3-2-1 (35,5 s) → ohjaus 38,5 s.
  - Vastaseinällä pääsee myös OIKEALLE (pohjoiseen p-kujaportille; testi Taso1AvausSeinallaOikeaAuki oikealla juurella) →
    JuoksuAvaus.SeinaKaanto = 1: kamera katsoo pohjoiseen (JuoksuV4Maailma.AvausSeinaYaw pitää kameran kujan suunnassa keisarin
    odottaessa) ja JuoksuOpetus antaa seinällä ensin oikean pyyhkäisyn (muuten vasen).
  - Avauksen BottiAskel vain QA:ssa (`botti 1`). Tasolla 1 avaus kokonaan maailman radalla (MaailmaPaino 1, kehys = kujan suunta).
  - Testit 797/797, unity-tarkistus 0. Ammattimittaus tasolla 1 sallii 3 suunnanvaihtoa (kolmas = pyydetty kierto taakse).
  - **HUOMIO KK:lle (kerro todistuksen yhteydessä)**: koska opetus on oikealle, kamera on jo valmiiksi keisarin eteläpuolella ja
    "kierto" on pieni (oven puolelta ~20° takaisin kujan suuntaan); oikea vie pohjoiseen p-kujaportille, poispäin maalista
    (aukio 03 etelässä), T-risteyksen opetus jää silloin väliin. Vaihto vasempaan = SeinaKaanto −1, MUTTA silloin kameran
    pitää kiertää keisarin pohjoispuolelle (sukellus tulee etelästä): LuoSeinaAvaimet tarvitsee kaaren, ei tehty.

## Jono (KK:n järjestys)
1. **Tallenne taso 1:n alusta** (avaus → lähtö → 60 s juoksua, ohjaamaton + ohjattu) KK:lle ja PT:lle ENNEN junaa; KK tarkistaa
   omistajan sanoja vasten. Tarvitsee JU:n käännös-/esikatseluvuoron rungosta kapea-reitti-218 (f4a9b1802). Samassa ajossa
   **pari 218q vs uusi (104–105,5 s)** lahipuut-v15:stä PT:lle (bugi 2).
2. **Latauskuva**: Codexin 3:4-kuva ei vielä postilaatikossa (tarkista origin/claude/postilaatikko).
3. **Salitallenne** 储秀宫, 翊坤宫, 永寿宫 (+ 体和殿, 太极殿) → PT, JU:n esikatseluvuorolla: pohja proto-3d/_tyo/pelikoodari/sali-218/
   (ks. edellinen luovutus kohta 4; runko nyt kapea-reitti-218 f4a9b1802 + pelikoodari/piirtajat-218 → sali-218b).
4. Eunukkikorjaus, eunukkimäärät (12.13), Taso1ReittiPortiltaAukiolle03-siivous (työkalu käyttää yhä bottia alkuun ja vanhaa
   juurta – ohittuu), kameratallenne (kamera-218/SEIS) JU:n vuorolla.
