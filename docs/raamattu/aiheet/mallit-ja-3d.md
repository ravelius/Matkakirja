# mallit-ja-3d · vastuu LAV · tarkistettu 12.11.2026

TAVOITE: Pelin 3D-mallit näyttävät esikuviltaan ja kestävät katseen siltä etäisyydeltä, jolta pelaaja ne näkee. Ne seisovat maassa, liikkuvat elävästi eivätkä raskauta laitetta.

SÄÄNNÖT:
1. Mallin esikuva on oikea kohde: muoto, osat ja mitat verrataan vapaisiin lähteisiin ennen työtä. Havainnekuvasta otetaan ulkoasu (materiaalit, värit, valo, kamera), ei paikkoja eikä mittoja. [R-7.20] [P-261020-1]
2. Pelattava 3D-kohtaus tehdään tavoitekuvan näköiseksi. Tekijä sovittaa työn siihen omissa työkaluissaan pelin kameralla ja mittakaavahahmolla ja mittaa eron ennen tarkistusta. [R-7.20]
3. Tripo-mallin hyväksyntä, hylkäys ja uusi otto päätetään KK:ssa ennen Tripolle kirjoittamista. [P-261105-3]
4. Hyväksytyt mallikuvat ja niiden tekotyökalu kopioidaan samassa vuorossa pysyvään talteen, ja polku kirjataan. [R-9.9]
5. 3D-kohde on aito kappale: se näyttää ylhäältä katon ja kallistaessa sivun, seisoo maan pinnalla ilman leijuntaa ja kasvaa ja pienenee kartan mukana kuin oikea esine. [R-4.41]
6. Lipputanko näkyy ruudun keskellä ylhäältä lähes näkymättömänä ja reunoja kohti yhä enemmän sivulta, aina radiaalisesti poispäin keskipisteestä, myös striimikartalla. [R-4.42] [R-2.216]
7. Animoidulla mallilla on vaihtelua: perusliike, harvinainen tapahtuma ja reaktio pelaajaan, ei tasaista toistoa. [R-4.17] [R-4.44]
8. Kohdemaan merellä on koristeita (laivoja, valas, lokkeja) 1–2 lajia meren mukaan, enintään kaksi näkyvissä. [R-4.45]
9. Tarkin tarkkuustaso näytetään vain lähellä; kauempana malli on kevyempi. [R-2.196]
10. Toistuvat osat (puut, rekvisiitta) viedään yhtenä meshinä tyyppiä kohden jaetulla materiaalilla, ja vienti tarkistetaan automaattisesti. Muistiongelma mitataan laitteella ennen korjausta. [R-6.16]
11. Kuumailmapallokartan oma rakennus verrataan ennen luovutusta oikeaan maailmaan (kirkkaus, sävy, ulokkeet ortokuvaa vasten). Tavoite on oikea maailma, ei Googlen sävy. [R-2.94]

EI VIKA:
- Pallokartalla ei ole 3D-nostoja eikä erikoismalleja; kartan merkit ovat 2D.
- Lippu ei seiso pystyssä ruudun keskellä.
- Havainnekuvan sommitelma ei siirrä eikä skaalaa rakennuksia.

TEKOTAPA:
- Tavoiteluuppi ja havainnemittari: docs/tuotanto/tekotavat/3d-ja-kuvat.md kohta 11.
- Talteen: proto-3d/_valmiit/hyvaksytyt-mallit/ (LAHTEET.md mukaan). Vertailuportti: _valmiit/kaupunkipinnat-v1/lahde/vertailuportti.zsh.
- Tilaukset, Codex ja Tripo: grafiikan-tuotanto. Nähtävyydet ja kaupungit: niiden kortit. Kuka hyväksyy: valmiin-maaritelma.
