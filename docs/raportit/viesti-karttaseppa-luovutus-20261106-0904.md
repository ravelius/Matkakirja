# Karttaseppä: luovutus 6.11.2026 klo 09.04 (KS)
Syy: konteksti 26 %, luonteva tauko: ajo 5 odottaa JU:ta. **Voittaa aiemmat ristiriidassa; -0829:stä pätevät enää kohdan 1 Notre-Dame-koe ja viat sekä kohta 3; -0804:stä VIESTIRAJA ja AUKI; -0841:stä LOPPUTESTIT (alla).** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki 1303df5fc). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus, kärki b160104b7, kääntämättä). Id:t: -0841:n otsikossa ja osoitekirjassa. KK:lle SendMessage nimellä "KESKUSTELUKANAVA (Opus, max) [db5b38]" tai id:llä local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Katso, onko `lokit/karttaseppa-yhteinen-5-b160104b7` valmis; JU:n viesti on voinut tulla ennen nollausta. **Älä yhdistä Y:hen ajon aikana.**

## AJO JU:LLA (pyydetty 09.02)
Y b160104b7, skenaario `_tyo/karttaseppa/sk-pariisi-yhteinen-5.txt`, 9 kuvaa, ESIKATSELU_PISTEKERROIN=0.465, talot `palat-v5-nd-ranta`. NS:lle kerrottu kansio; NS ei ole vielä kuitannut. JU on kuvamäärästä sanonut: kerro, mitkä voi jättää pois (PT); 30 kuvaa oli yli omistajan linjan.

**Katso kuvat täysikoossa tai rajauksina, sitten jaa:**
| Kuvat | Kysymys | Kenelle |
|---|---|---|
| `grep "karttatasa tila" unity.log` (kaksi riviä) | Tasaus ilman komentoa: ND 1.00, Montmartre 0.00, keski ei nolla. Ensimmäinen rivi on heti alusta | oma |
| nd-raja, keski-ylhaalta, etela, po-la | Rantapohja ja v5 oletuksena; ND:n ympärillä ei laikkua (ajo 4:n nyt-kuvassa oli); talot rantaan | KK, NS |
| ts-talot, hdv-talot | Kohteet talojen päällä ilman ND-maskin litteää aluetta. TS nyt pohjoisesta, ajossa 4 se jäi ND:n taakse | NS |
| sc-45, sc-80 | Mäki säilyy, v5:n seinät, läikkä (x 1485–1685, y 1840–1955) | KK, NS |
| tasa-reuna | Tasauksen ulkoreuna 12 km itään: ei pystysaumaa eikä porrasta. Reunaa ei ole katsottu oletuksena | oma, KK jos vikaa |

**Riski, jota vain tämä ajo näyttää:** globaalit kirjoitetaan nyt `KorkeusKerroin.Aseta`ssa KarttaKerrokset.Awakessa. KarttaKerrokset.cs:n kommentti epäilee, onko georeferenssi alustettu Awakessa. Jos ensimmäisen tila-rivin keski on väärä tai kuvissa tasaus puuttuu, tasaus pitää kirjoittaa uudelleen myöhemmin (Start tai ensimmäinen kartan kehys), ei palata komentoon.

## TEHTY TÄSSÄ SESSIOSSA
- **KK 08.59 (omistajan kortti 06.58 "Tasoitetaan"):** tasainen kartta oletukseksi samassa ajossa rantapohjan ja palat-v5:n kanssa. W 1303df5fc: oletusarvot `KorkeusKerroin`ssa (paino 1), `Aseta` päivittää tasauksen globaalit origon vaihtuessa, uusi komento `karttatasa tila`, `karttatasa 0|1` toimii edelleen. Rantapohja oli jo W 5f461c7f5:ssä; molemmat nyt Y:ssä.
- **Tasaus koskee vain pallon karttaa:** MatkakirjaTileset-varjostinta; CesiumKaupunki käyttää omia materiaaleja (KaupunkiIlmakeha), joten kaupunkinäkymä ei litisty. Tämän päättelin koodista, en ajosta.
- **Ajo 4 (0b4d74011) katsottu ja jaettu:** KK:lle Montparnasse (vasen nurkka tumma, keskikiilto yhä kullanvärinen, kattoreunassa pientä aaltoilua; KK:n vastaus näistä puuttuu) ja mäki; NS:lle talot; NUI:lle kyltit (kunnossa) ja nimet; VS:lle 14 kuvaa ja mittari. PT: puut kunnossa.
- **Nimet:** syy on `Nimikerros.Karsi`, ei järjestys eikä koepohja. Elävien määrä putosi 3200 → täsmälleen 3000 (4000 × 3/4), ja rivin poistaa vain RemoveRange:1851. Noin 22 000 riviä vaihtui noin 2 minuutissa (arvio). Syy kierrolle (palat.Clear 30 s:n välein, ElavaNimet.cs:436) on todistamatta. Korjaus on NUI:lla, KK hyväksyi; KS ei koske.
- **NS:n katokset:** palateon läpäisee 149 katosta ja 82 kioskia, koska mukana vain wayt ≥ 8 m². Lukujani 261 ja 172 ei löytynyt luovutuksista. Palat-v5 on NS:n.

## AUKI
- Taivaalla kova vaakaraja (po-la, ts-talot; y noin 105 2000 px:n leveydessä), sama kokeessa ja nykyisessä. En tiedä, onko tunnettu; kerrottu PT:lle.
- Litteä alue Louvren ja Châtelet'n välissä po-la-kuvissa myös v4-nd-rannalla: ei ND-maskia, viety NS:lle.
- etela-koe | etela-nyt: ND:n katto oliivi kokeessa, kirkkaampi vihreä nykyisessä samalta kameralta; syy tutkimatta, ei kerrottu kenellekään.

## Oppi
Laskurin arvo (3000) todisti koodista tehdyn epäilyn ilman uutta ajoa: katso `nimet laske`-rivi loppuun asti, ennen kuin pyydät mittaria. Tarkista oma tilamuistio ennen toisen kirjoittamaa pyyntöä: W:n kärki oli jo edellä luovutuksen SHA:ta.

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
