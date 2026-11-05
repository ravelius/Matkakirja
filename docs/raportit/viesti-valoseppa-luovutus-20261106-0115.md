# Valosepän luovutus 6.11.2026 klo 01.15

Korvaa luovutuksen -0047. Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## TILA
Koodi 2e9394de8, haara `linssiseppa2/ohjelmakohteet`, natiivi-backupissa, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Geometriatestit 12/12. OhjelmaKohteet.cs tarkistettu tynkäluokkia vasten; Unityssä EI käännetty eikä ajettu, joten mikään alla oleva ei ole nähty kartalla.
Ei omaa ajoa (KK 01.02). Seuraavaan ajoon samat kaksi kuvakulmaa `pb-etu` ja `pb-piha` (`_tyo/linssiseppa2/ohjelmakohteet/sk-palais.txt`, 2 ensimmäistä kuvaa). Ajohaara tehdään silloin uudelleen: ohjelmakohteet + e726bba9f (`git merge-tree --write-tree`, `git commit-tree`, `git branch -f`), ei viedä. JU vaatii rivin "mitä tämä ratkaisee".

## KK 01.02: PÄÄTÖKSET
Nuolikorjaus, Madeleinen nimi ja Pont Neufin porras kelpaavat kokeena; Palais Bourbon kelpaa, kun varjo ja maa ovat kunnossa. Ei junaan. Pompidou seuraavaksi.
1. LÄHIKUVAA EI TARVITA, älä selvitä rajaa. `PalloKierto.MinKorkeus` on pelaajan oma lähin taso; täysikokoisen ruudun rajaus on lähin, minkä pelaaja näkee. Pieni koko on oikeiden mittojen seuraus.
2. Leijuminen: omistaja 21.28 "leijuminen ei kelpaa". Korjaus ei saa rikkoutua, jos kartta tasoitetaan (KS:n koe, 90 m, omistaja päättää aamulla). TEHTY.
3. Pylväikön katto harmaaksi kuten muut: viitekuvat -6 ja -0, vihreälle ei ollut lähdettä. TEHTY (Liuske).
4. Lippu kärjen taakse: TEHTY (x = kärki − 1,4 m).
Varjo muodon mukaan ja kärjen väri kadun mukaan: TEHTY. KK: jos vaativat enemmän kuin pienen muutoksen, älä hio vaan jatka Pompidouhun ja kerro.

## LEIJUMINEN: MITATTU, LEIJUI
Mittarit `_tyo/linssiseppa2/ohjelmakohteet/maa/` (`maasto.py` lukee pelin maastolaatat, ajo ilman -I-kieltoa samasta kansiosta). Malli oli vakiossa 90 m ilman kerrointa; kartan pinta on h × 2.
Pinta tasolla z12 mallin maatason kärkien alla, mediaani (min–max), m:
- Palais Bourbon 80,0 (65,6–83,4): leijui 10 m, portailla 22,6 m.
- Madeleine 88,6 (81,5–94,6): 1,4 m, kohta oli kohdallaan.
- Hôtel de Ville 89,1 (74,2–106,3): 0,9 m.
- Pont au Double 76,7 (68,9–81,6): 13,3 m. Muut sillat 16–30 m.
Kuva vahvistaa: pb-etun ruskea suorakaide on kartan oma jalanjälki, ja sen 70 px:n siirtymä (3× rajaus, 4,4 px/m, kallistus 45°) vastaa noin 22 m:ä.
Pont au Double, "kolmannes veden päällä": vesiosa on 38 m, koko pituus 94 m, päät 28 + 28 m maalla: 40 % jo mitoista. Leijuminen siirsi lisäksi kuvassa enintään 13 m. Ei vika, jollei omistaja halua lyhyempiä päitä.
LÖYDÖS KS:lle (ei minun): z≤10 ja z≥11 eroavat. Palais Bourbonilla z10 69,0, z11 38,6, z12 40,0 (× 2 = 60 m:n hyppy). z12 Seine 26,8 m on merenpintakorkeus: geoidi (noin 44 m) näyttää puuttuvan z11–12:sta. Tämä voi olla KS:n pystysauman syy; en todentanut. Jos maasto korjataan, kaikkiin MaaH-arvoihin lisätään sama ero.

## KORJAUS (2e9394de8)
- `Kohde.MaaH` ja `KaupunkiSilta.Maa`: h ennen kerrointa. Rakennus: mediaani. Silta: päiden keskiarvo. Palais Bourbon 37,5 (näkyvä 75, portaiden puolelle, koska maa laskee 18 m). Pont Neufin varret 36 ja Sullyn varret 38,4: kohtaavat saarella, oltava samalla tasolla.
- Tasainen kartta: `AsetaPaikka` lukee KS:n globaalit nimellä (`_maaTasaKeski`, `_maaTasaRajat`, `_maaTasaReika`) ja laskee saman kaavan kuin tileset-varjostin, joten ei riipu KS:n koodista; ilman koetta ne ovat nollia. Komennolla malli palaa 90 m:iin.
- Helma: maatason kärjet (y ≤ 0,01) 30 m alas (`HelmanKorkeus`, vain `TeeVerkko`). Seinä ja pilari jatkuvat maahan, syvyystesti piilottaa loput. Sillan kärki putoaa viimeisellä välillä, nuolikorjaus voi siksi näkyä toisin: katso `p-car`, jos se ajetaan.
- Varjo: `VarjonPeitto` ruudukko 3 m, täysi katon ja kannen alla, hiipuu 7 m; pihat auki.
- `KatuKartta` 0xD7C39C (kadut viidestä kuvasta noin 226,200,152; arvio lineaarisesta suhteesta yhdestä mittauksesta). Katu kartalla vaihtelee 216–232.
TUNNETUT JÄÄNNÖKSET, EI SAA PIILOTTAA: Palais Bourbonin takasiivet uppoavat enintään 8 m ja portaat jäävät 7,6 m pinnan yläpuolelle helman varaan. Pont Neufin oikean rannan pää uppoaa noin 32 m (z12 104: näyttää katoilta). Pont Royal, Louis-Philippe ja Pont au Change: pään ero 16–21 m, eli toinen pää 8–10 m ilmassa helman varassa ja toinen maassa. Jos näyttää huonolta, seuraava keino on kallistus sillan akselilla, ei uusi vakio.

## SEURAAVAKSI: POMPIDOU
Sitten Tour Saint-Jacques, Saint-Eustache, Saint-Sulpice. Ensin kuvat: `python3 -I a/hae-viite.py listaa <kohde>`, `hae <kohde> <i> ...`. Mitat: luovutus -2340, kohta AINEISTO OSALLE A. Testit ja kuva: `sh aja-geometria.sh`, `python3 esikatsele.py obj <tulos> <nimi> 45 300 1100` (ilman -I, numpy). Uudelle kohteelle MaaH: lisää `maa/kohteet.py`:n listaan, aja `aja-geometria.sh` ensin (OBJ:t).
Testit kokonaan: `dotnet rak/G.dll OhjelmaKohde` (aja-geometria.sh ajaa vain Mitat-testit).
Pb-apurit käyvät muillekin kuperista OSM-monikulmioista rakennetuille.

## AUKI AAMULLA (KK)
Kaide: KK kertoo pisteet vikana. 14 m:n seinät: KK kertoo. Notre-Damen pää näkyi vain pienenä.

## MUUTA
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin Pariisi-rivit eivät ole Valosepän.
