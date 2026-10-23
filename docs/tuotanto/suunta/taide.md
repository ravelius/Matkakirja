# A Suunta: taide

*(Valoseppä 23.10.2026, studiojako Raamattu 4.21. Tämä sivu kertoo, miltä pelin pitää näyttää ja miltä hyvä ja huono
näyttävät. Tekotapa on B:ssä (`docs/tuotanto/tekotavat/`: 3D ja kuvat Lavastaja, kamera ja video Linssiseppä ja Valoseppä),
luvat ja vaiheet D:ssä (`docs/tuotanto/tuotannonohjaus.md`). Esimerkkikuvat kokoaa Projektiseppä; ensimmäisenä ne näkee
omistaja. Säännöt: Raamattu 1.10, 2.93, 2.102, 2.133, 3.12, 4.21, 4.34, 4.40, 4.41, 4.46, 6.15, 7.20.)*

## Näkymä yhdellä lauseella

Kartta on vanhan atlaksen akvarelli, ja sen sisältä aukeaa todentuntuinen nykymaailma: vähän asioita kerrallaan, pehmeä
valo, hillityt värit ja elävä, rauhallinen liike. Katsoja muistaa paikan, ei tehostetta.

## Omistajan päätökset

- **21.10.2026 klo 18.12 (A suunnan ytimet, 4.21):** kartta 1873-atlaksen akvarellina, maailma nykyaikaa; havainnekuvat ja
  3D-maailmat todentuntuisia, ei piirrosmaisia; pienoismallit akvarellia karttapaletilla; johtoajatus niukkuus ja pehmeä
  elävä liike.
- **Esikuvat (sama päätös):** Assassin's Creed Discovery Tour, Microsoft Flight Simulator, Monument Valley ja Applen
  sovellukset. Periaatteessa hyväksytyt; tarkistetaan myöhemmin uudelleen, joten ne ovat suunnan viitteitä, eivät mittatikku.
- **26.9.2026 (AIKA, 1.10):** maailma on nykyaika; vain ulkoasu on vanhaa. Nykyajan kohdetta (maailmanpyörä, Korintin kanava)
  ei hylätä siksi, ettei sitä ollut 1873.

## Kolme kuvakieltä

| Kerros | Miltä näyttää | Ei näin | Sääntö |
|---|---|---|---|
| **Kartta** | 1873-atlaksen akvarelli: tummanruskeat viivat, kerma valkoisen sijaan, lumppupaperin syy, reunakertymä, hento patina | puhdas vektorikartta, kirkkaat UI-värit, naapurimaiden tummennus | 4.34 |
| **Kartan esineet ja pienoismallit** | aito 3D, joka reagoi katselukulmaan ja seisoo maassa; akvarellisävyt karttapaletista (kerma, murrettu tiili, okra, haalistunut messinki, seepia); pieniä valoja | pop-up-kuva, leijuva malli, kirkas punainen tai kulta, koristeiden paljous | 4.40, 4.41, tyylikirja `karttapaletti` |
| **Maailma (linssit, museot, pelit, kohtaukset) ja havainnekuvat** | todentuntuinen: valokuvapohjaiset pinnat, oikean maailman sävy ja kirkkaus, elokuvamainen valo | piirrosmainen, sarjakuvamainen tai muovinen; toistuvat tekstuurit; pienoismallivaikutelma | 2.93, 2.102 |

Kaksi poikkeusta: isoisän piirrokset ovat nopeita mustavalkoisia kynäluonnoksia vanhalla paperilla (3.12: 1873 = piirros,
nykyhetki = valokuva), ja pelaajan omat esineet (nappula, kuumailmapallot) pitävät tunnistevärinsä kartan yhtenäisessä sarjassa.

## Periaatteet

1. **Niukkuus.** Ruudulla on vähän asioita kerrallaan, ja jokaisella on syy. Jos kohde tunnistetaan yhdestä tunnusmerkistä,
   tehdään se yksi hyvin (kartan kohteet: omistaja 21.10. 09.38 "yksi tunnusmerkki per kohde"). Koristeet ja täyte pois ennen kuin
   lisätään uutta.
2. **Pehmeä elävä liike.** Maailma ei ole jähmeä: liput, vesi, pilvet, ihmiset ja valo liikkuvat hitaasti ja pehmeästi. Mikään
   ei välky, värise eikä pompi; värinä on virhe, ei tunnelma (ks. huonot esimerkit).
3. **Valo kertoo vuorokaudenajan ja tunnelman.** Yksi selvä päävalo (aurinko tai kuu), lämmin valo ja viileät varjot,
   tummat mutta ei mustat varjot, hento ilmaperspektiivi kaukana. Taivas, valo ja varjot ovat samaa hetkeä.
4. **Hillityt värit.** Maltillinen kylläisyys; kirkkain väri on varattu sille, mitä pelaaja katsoo. Kartalla ja sen esineissä
   vain karttapaletti; maailmassa oikean paikan omat värit (marmori on marmoria, tiili tiiltä), ei sävytettyä yhtenäisväriä.
5. **Oikea maailma on mittatikku.** Pelikuvaa verrataan oikeaan valokuvaan samasta kulmasta ennen omistajaa (2.93). Sävy,
   kirkkaus, mittasuhteet ja materiaali tarkistetaan vertailusta, ei muistista.
6. **Ei pienoismallivaikutelmaa maailmassa.** Syväterävyys pehmentää vain kaukaista; mittakaava näkyy ihmisistä, ovista ja
   ikkunoista. Pienoismalliksi tehdään vain kartan esineet.
7. **Tarkka siellä, minne katsotaan.** Katsottava kohde on ladattu, terävä ja hyvin valaistu ennen kuin kamera pysähtyy
   (vrt. kamera.md periaate 5); tausta saa olla pehmeämpi ja harvempi.
8. **Laite kantaa parhaan.** Natiivissa käytetään kaikki grafiikan parannukset, jotka laite kantaa (6.15); laatua ei lasketa
   varmuuden vuoksi, vaan kevennetään vasta mitatusta syystä (lämpö, muisti, ruutuaika).
9. **Havainnekuva on havainnekuva.** Tekoälyllä tehty kuva on aina "havainnekuva" (4.46), ja se on todentuntuinen, ei
   piirrosmainen. Havainnekuva on myös työn tavoite: jokainen uusi näkymä alkaa tavoitekuvasta (4.21, 7.20).

## Valon ja ilman suunta tilanteittain

*(LUONNOS: rivit ovat Valosepän suositus. Ne odottavat omistajan vastausta yksi kysymys kerrallaan KK:n kortilla; hyväksytty
rivi merkitään päivämäärällä.)*

| Tilanne | Tavoiteltu tunnelma | Valo | Erityistä |
|---|---|---|---|
| Kartta | vanha atlas pöydällä | tasainen paperin valo; varjostus vain maaston muodosta | yö ja revontulet vain tehosteina, eivät kartan perusvaloa |
| Kartan esineet | pöydällä seisova pienoismalli | yhteinen pehmeä valo ja maavarjo kaikille | sama valo ja varjon suunta kaikissa esineissä |
| Linssit ja pallokierrokset | todellinen paikka hyvänä päivänä | aurinko 30–50°, sininen taivas, kevyt usva | yönäkymissä oikeat kaupungin valot, ei sinistä yöfiltteriä |
| Museot | kävijän silmin, päivänvalossa | kattoikkunoiden ja ikkunoiden päivänvalo + kohdevalot teoksiin | kävijät ja teokset yhtä hyvin valaistuja; teos ei häikäise |
| Juoksupeli ja muut pelit | aurinkoinen iltapäivä, selvä luettavuus | aurinko noin 45°, tummat varjot | pelaaja erottuu taustasta aina; varjot eivät värise |
| Avaruus ja korkeat lennot | todellinen avaruus | yksi aurinko, musta taivas, ilmakehän ohut sininen reuna | ei tähtiä päivän puolella kirkkaan maan vieressä |
| Esirenderöity video | sama kuin peli, sulavampi ja tarkempi | pelin oma valo täydellä laadulla | ei eri tyyliä kuin pelissä (4.21) |

## Hyvä ja huono (laatutaso)

| | Esimerkki | Miksi |
|---|---|---|
| HYVÄ | Juoksupeli, tavoiteluuppi kierros 2 "aurinkoinen päivä" (PT hyväksyi lukitusehdoksi 21.10. 18.17: `proto-3d/_tyo/linssiseppa2/kierros2/k2d-pari-a.jpg`, `k2d-pari-b.jpg`) | Proseduraalinen sininen taivas, aurinko 45°, tummat varjot, pienet terävät pilvet: tavoitekuvan hetki |
| HUONO | Sama, kierros 1 (`…/kierros2/k2-pari-pt.jpg`) | Kermanvärinen tasaväripinta puolessa ylänäkymästä, isot pehmeät pilvet, laimeat varjot; kivetys liian valkoinen |
| HUONO | Juoksupelin vihreät palkit värisivät (omistaja 21.10. 14.23 ja 16.03) | Varjon itsevarjoraidat ja syvyyskilpailu: elävä liike ei saa olla värinää |
| HYVÄ | Rijksmuseumin kävijät päivänvalossa, v2 (PT hyväksyi 21.10. 19.37) | Kävijät saavat saman päivänvalon kuin sali; ihmiset näyttävät kuuluvan tilaan |
| HUONO | Sama, ennen korjausta | Kävijät tummina siluetteina valoisassa salissa: valo ei ollut samaa hetkeä |
| SUUNTA | Kartan kohteiden yhtenäinen sarja, arkki 10e (21.10.: `proto-3d/_tyo/linssiseppa2/kartta-arkki/arkki-10e-galleria-nyt-yhtenainen.png`; omistaja 14.13: "näissä vielä ongelmia", ei vielä hyväksytty) | Oikea suunta: karttapaletti, yksi tunnusmerkki per kohde, Louvren lasi seepiana |
| HUONO | Arkki 9 ennen yksinkertaistusta (omistaja 21.10. 09.38) | Liikaa yksityiskohtia ja kirkkaita poikkeavia värejä kartan esineissä |
| HUONO | Tulivuorten kansi liian valkoinen (21.10.) | Kirkkain kohta väärässä paikassa; oikean maailman sävy puuttui |

Kuvat ovat levyllä (proto-3d/_tyo), eivät repossa. Uusi hyväksytty tai hylätty esimerkki lisätään tähän taulukkoon
polkuineen ja päivämäärineen; Projektiseppä kokoaa niistä esimerkkiarkin.

## Mittarit, joilla näköisyys tarkistetaan

Näköisyyttä ei arvioida yksin silmämääräisesti:

- **Kuvapari tavoitekuvaa vasten** samasta kulmasta (tavoiteluuppi 7.20): pelikuva rinnakkain havainnekuvan tai oikean
  valokuvan kanssa; tuore arvioija ennen valmista.
- **Värinämittari** (jäädytetty ruutu, katse 0,03°): värisevien pikselien osuus; vihreä palkki tai seinä ei saa väristä.
- **Sävy ja kirkkaus** oikeaan valokuvaan verrattuna (2.93); kartan esineissä vain karttapaletin värit (tyylikirja).
- **Laitteella**, ei pelkästä kuvasta (4.41): näköisyys hyväksytään isolta iPadilta, ja GPU-aika pysyy budjetissa (B).

Tekniset raja-arvot ja työkalut ovat B:ssä; tämä sivu kertoo, mihin niillä pyritään.
