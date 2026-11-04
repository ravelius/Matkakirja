# Pelikoodari: luovutus 4.11.2026 klo 13.20 – kartta ja ovikoe valmiit, seuraavaksi oven sääntö ja osa C

Korvaa -1230:n. Syy: konteksti 32 % (7.37). Polut kansiossa /Users/Shared/Claude/proto-3d/, lokit `lokit/`. **Merkitse jokaiseen tulokseen runko.**
Lue ennen C:tä: `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-juoksupeli-vapaa-maailma.md`.

## Linjaukset tästä vuorosta
- **Omistaja 13.00:** suljetut pihat jäävät tasolla 1 kiinni, tason 1 maailma loppuu ulkomuuriin (keisari pysähtyy siihen kuten muihin seiniin). Ei väliaikaisia reittejä; portit avataan myöhemmin yhdellä säännöllä.
- **Omistaja 12.48 (PT, ei junaan):** ovi jokaisen rakennuksen etusivulle yhdellä säännöllä, kynnykset koneelta, takana hämärä pinta, ei läpinäkymää eikä lattian reikiä. Keisari pysähtyy kynnykselle, lyhyt viesti, että sisälle pääsee seuraavalla tasolla. Väliaikainen laatikko, kunnes LAV:n tilaama malli tulee (Codex → KK → Tripo; lehti erillisenä). Taso 2 ja yhden oven kamerakoe eivät kuulu tähän. Koe ensin yhdellä alueella, muisti mitataan, kuva KK:lle.
- **KK (omistaja 12.39):** vanhan pelin ajot seis; uusia iPad-ajoja vanhalla pelillä vain PT:n tai KK:n sanalla. ☰-koe ja reittiajo poistettu.
- **PT:** viivat jäävät avoimiksi. Tarkista vapaan maailman kuvista; jos näkyvät, rivi PT:lle. Ei näkynyt ovi- ja laattakuvissa (12 kuvaa, ei kattava). Tausta: `_tyo/pelikoodari/musta-lento/viivat-c4a5bfafb/mika.txt`, kuva `lokit/esikatselu-20261104-125930/av/k-000488.jpg`; mika ei löytänyt omaa kolmiota.
- KK: kartta on hyvä ja jää käyttöön. LAV:n jono seis; laattojen korjaaja KK:n päätöksellä, ei korjauksia nyt.

## Tila
Proton haara `pelikoodari/tarkastelu-219` = **e48e252a8**, worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`. Ei etärepoa (push ei onnistu), commitit paikallisessa gitissä. Rungon c4a5bfafb päällä.
- **Kartta:** `python3 tyokalut/kulkukartta.py <ulos> <osasarja.bin>`; tulos `_tyo/pelikoodari/kulkukartta/v1/`: kulkukartta.png, taso1.png, ovet-koealue.png, ovet.json, tulos.json, kartta-1m.npy (kerrokset kuljettava, vapaa korkeus × 10, seinäetäisyys × 10, lattiabitti), taso1-1m.npy, pinnat.npz (välimuisti, `--uudelleen` laskee alusta, noin 5 min). Osasarjan kolmiot `osasarja-v13.bin` (`Peli-testit/Testit/OsasarjaKolmiotVienti.cs`). Lataus LAV:n sadetesti.py:llä: koejuuri-ulkomuuri (tausta-v124, rakennukset-v122, osasarja-v13), **ei koerungon c4a versiot**. Mukana ei ole lähipuiden runkoja eikä c1-räystäitä. z < −500 ei ole maata.
- **Luvut:** kuljettava 569 000 m², taso 1 387 102 m², 1 m:n kartta 5,75 Mt raakana, 0,4 Mt pakattuna. Keisari 0,8 × 1,8 m, askel 0,5 m.
- **Taso 1:** ulkomuurin `sisareuna` miinus rakennukset (ei portit, nimi 门/墙 ei rakennus) miinus sisätila (katettu ala avattuna 2 m:n neliöllä, paitsi portit), täyttö lähdöstä. Taihemen on läpikuljettava, Meridiaaniportti jää ulos. Kapeita rakoja ei ole tarkistettu.
- **Ovet:** `JuoksuSokkeloMaailma.Ovet.cs`, `Resources/JuoksuOvet.json` (kopio ovet.json:sta, päivitä käsin), komento `ui juoksupeli ovikoe koe [x0 z0 x1 z1] | pois`. Vain komennolla, normaalipeli ei lataa. 227 ovea, 3 178 kolmiota, verkko 266 kt laskettuna (muistia ei mitattu laitteella). 197/227 kynnyksestä on tasolla 1. Ilman ovea 59 (55 ei kynnystä, 4 pieni), niistä 33 näkyy tasolta 1 (`tulos.json` ovet).
- **Kuvat:** `lokit/tarkastelukuvat-e48e252a8-131444/` ovet-arkki.png, laatat-arkki.png. Lähetetty KK:lle. `tyokalut/tarkastelu_kuvat.sh <sha> <lista> ["ovikoe koe"]`; lista esimerkki scratchpadista: `nimi x y z yaw pitch fov`.
- **Kierros:** kaksi ajoa `lokit/tarkastelu-f9c80ae5a-124421` (309) ja `-125935` (347) katkesivat ajovahtiin, **ei koko kierros, ei pahimmat-kuvia**. 309 yhteistä kuvaa toistuu: takapinta, väärin kierretyt ja tyhjä ero 0, väreily enintään 0,0003. Korjattu e48e252a8:ssa: `ESIKATSELU_HILJAA_S` (tarkastelu.sh 3600) ja yhteenveto OK vain, jos pahimmat.txt on syntynyt. Uusi mittari väärin kierretyt: keltainen, keskiarvo 3 %, suurin 70 %; **ei vielä katsottu, onko pelissä näkyvä vika**. Kamera rakennuksen sisällä antaa takapinnan 100 % (12 kuvaa yli 90 %), massatarkistus ei huomaa.

## Tekemättä, tässä järjestyksessä
1. **Oven sääntö paremmaksi** (viat kuvista): etusivun keskikohta ei ole oikea ovi; yongshou, chuxiu ja yikun saavat laatikon mallin oman aukon tai ovipaneelin viereen, ja jalustalla laatikko nousee maasta portaiden viereen. Säännöksi: jos etusivulla on aukko, ovipaneeli tai portaat, ovi sinne (LAV:n `_tyo/linnanrakentaja/muuri/sisatilat/ovet.json` antaa lehdet ja aukot omille malleille, taustan taloja siinä ei ole; arvio: etsi kartasta etusivun aukko ja portaat). 33 näkyvää ilman ovea: selvitä, onko syy seinä vai väärä etusivu. Koekuvan kamera 9 m osuu terassiin (qianqing, kunning): kameraksi kynnyksen edestä kartan avaraa.
2. **Kierroksen pisteet kulkukartasta** (taso1-1m.npy), ei vanhoista solmuista eikä rakennusten ympäriltä: poistaa kohinan. Sitten JU:lta vuoro, koko kierros kahdesti. Sitten todistukset 1 (vihreät boordit kärjessä), 2 (tunnettu puuttuva pinta), 3, 4 (normaalipelin muisti, ensilento JU:n vuorolla lukuihin ka 4000, huippu 4068, c4a5bfafb, raja 4080; ilman `palatsi kopiot 1`). iPad-lähtötilanne JU:n vuorolla; kuvan rivijärjestys tarkistettava ensimmäisestä iPad-kuvasta.
3. **Osa C** (vanha lipun takana): liike ja kamera tasolle 1 kartalta, pysähtyminen seinään, muuriin ja kynnykselle, lyhyt viesti (kielitiedostot). Kartta peliin on tiedosto ämpäriin: pyydä JU:lta vienti, `media-vienti-muuttaa-julkaistua`. Lataa tason 1 kartta c4a-versioiden mukaan tai vaihda kaikki yhdellä kertaa; kerro KK:lle versioero.
4. Testinäkymän rivi `juoksupeli-tarkastelu` (`tarkastelu odota`) ja kosketusohjaus eivät ole koskaan ajettu.
5. **unity-tarkistus ei huomannut päällekkäistä `case "ovet"` -virhettä (CS0152):** selvitä miksi; siihen asti käännösvirheet näkyvät vasta esikatselussa. Älä sano 0 virhettä todisteeksi.
6. Laatat: t-portti-m15 (−72, −10) y 2,5; vinot taustassa (80, −108), (110, −40). Kuvat KK:lla; ei korjauksia ennen KK:n päätöstä.

## Muistiinpanot
- Viestit: PT local_8d8ebf72, JU local_2a7d6c96, KK local_d5f31591, LAV local_f12c9179, Postivahti local_1f31f830, täydet id:t osoitekirjassa. Tulokset ja kuvien polut KK:lle.
- L2 vapautettu JU:lle 13.19. Esikatselu aina JU:n ESIKATSELU NYT -vuorolla.
- Numpy on kuoren python3:ssa, joten kulkukartta ajetaan ilman `-I`-lippua. zsh: `echo ==` ja `${(f)…}` kaatavat komentotarkistuksen.
- `git restore` Tyylikirja.uss, Tyylikirja.cs, tyylikirja.json, jos `tarkista.sh` on ajettu.
