# Valosepän luovutus 5.11.2026 klo 14.25

Syy: konteksti 25 %, pehmeä raja (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261105-1158.md (syy ja tiedostojako, -1059 lisäys 2). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

Linja voimassa: 2.209 (ei iPad-ajoja eikä mittauksia) ja PT:n välittämä omistajan 13.24: näkyvä Pariisin askel valmis → Macin kuva (polku + yksi rivi) suoraan KK:lle local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, kopio PT:lle. Mac-ajot JU:n vuorolla.

## Tila
Saumat lähes poissa kokeessa, ei lukittu. Oletuspiirto on yhä ennallaan. Haara linssiseppa2/pariisi-tasot caa2c0918 (natiivi-backup), pohja julkaisija/pariisi-219 99035b765 + pallo pyynnot, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30 (k30), 608/608.

Koe: ElavaTyyli.Portaat, 11 lukua, komento `elavakartta portaat ennen | <11 lukua>`, omaan välimuistikansioonsa. Järjestys: massa z11, z12, z13; katot z13, z14; tiekerroin z11, z12, z13; z12:n tertiary heikkona viivana (leveys, alfa 40); maanpeite ja maankäyttö z11:lle (0/1); rinnevarjon kerroin z14+.

## Ajot (kaikki katsottu, Mac, tasot z12=0,52 z13=0,26 z14=0,13 z15=0,068 z16=0,034, ei iPadia)
- lokit/julkaisija-pariisi-portaat-7068e23a4: e = ennen, a, b. Pohjakuvat vertailuun: e-z12, e-z13, e-z14.
- lokit/julkaisija-pariisi-portaat2-8f46b4e74: c, d. d (rinnevarjo 0,4) ei muuttanut läiskiä.
- lokit/julkaisija-pariisi-portaat3-caa2c0918: f = 0.18 0.20 0.10 0.55 0.72 0.72 0.8 0.9 0.5 1 1; v = f + `valo pois`.

## Todettu
- f: raja lähes poissa z12:ssa ja z14:ssä (täysikoon rajaus z14:stä katsottu vain c:ltä, f:ltä pienennetty kuva). z16 puhdas pienennettynä. z13:ssa keskialue erottuu yhä, koska z12:lla ei ole rakennuksia. Katot z13 0,45 (c) näytti z13-kuvassa pehmeämmältä kuin 0,55 (f); z14-kuvassa 0,55 parempi.
- z11|z12:n suorakulmion pääsyy: maanpeite ja maankäyttö alkoivat z12:lta. z11:lle viety (ohut z10|z11-raja tarkistamatta).
- Läiskät: maaston rinnevalo (Aurinko/Karttavalo, tileset-varjostin). v-z15: poissa kokonaan. Ei palan rinnevarjo. Miksi maastossa on kaupungin päällä tällaisia kuoppia, ei selvitetty.
- Ilman valoa v-z13:n keskialue näkyy selvemmin, koska valo myös peitti sitä.

## Odottaa
KK:lta vastaus (lähetetty 14.2x): suositus, että rinnevalo häipyy kameran laskeutuessa kaupungin ylle. Sana koskee koko karttaa. Koodia ei ole tehty.

## SEURAAVAKSI
1. KK:n sanalla rinnevalon häivytys korkeuden mukaan: Aurinko.cs ja Karttavalo.Osuus, komento valo. Korkeudet katsotaan kuvista: läiskät näkyvät z13:sta alas; vuoret eivät saa kadota kaukokuvasta. Aurinko.cs ei ole KS:n listalla.
2. z13:n keskialue: kokeile katot z13 0,5 ja massa z13 0,12. Jos ei riitä, z12:lle rakennuskuvio z13:n datasta (neljä palaa per pala, ei tehty; kysy PT:ltä kulusta).
3. Lukitus: arvot oletukseksi, PortaatEnnen pois tai vain komentoon, ElavaTyyliVersio e31, SHA:t KS:lle ENNEN (elävän kartan väri saaren ympärillä muuttuu). KS tietää kokeesta. Ennen lukitusta ennen/jälkeen-pari KK:lle ja PT:lle on lähetetty, mutta lukitussana puuttuu.
4. Tummat maastokuopat ja z16-z17 täysikoossa katsomatta. "Haamut 0,13:lla" ja nimet: ei arvioitu.

## Skriptit
pariisi-tyyli/striimi/pariisi-viat/: sk-portaat.txt, sk-portaat2.txt, sk-portaat3.txt (malli seuraavaan). Pohjatiedot: TULOS-tikkaat-a5323cf4e.md. POIKKEUS ArgumentOutOfRangeException ajon alussa on tuttu, ei vaikuta kuviin.
