# Karttaseppä: luovutus 6.11.2026 klo 08.41 (KS)
Syy: konteksti 26 %, luonteva tauko: ajo odottaa JU:ta. **Voittaa aiemmat ristiriidassa; -0829:stä pätevät enää kohdan 1 Notre-Dame-koe ja viat sekä kohta 3; -0804:stä LOPPUTESTIT, VIESTIRAJA ja AUKI.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki 02203b0b6). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus, kärki 0b4d74011, kääntämättä). KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. PT = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. JU = local_b4a7e82a-2522-437f-84ff-813401120931. NS = local_c7344e20-fba8-433d-ba8e-184a325037ef. NUI = local_a3754ed8-f155-43b5-9095-b51e9e29ff53. VS = local_3b36fe96-0199-4b17-9eb4-46a882ce7399.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. **En käynnistänyt sitä tässä sessiossa, joten posti on katsomatta.** Katso, onko `lokit/karttaseppa-yhteinen-4-0b4d74011` jo valmis; JU:n viesti on voinut tulla ennen nollausta.

## AJO JU:LLA (pyydetty 08.40, ei vielä alkanut, kun tämä kirjoitettiin)
Y 0b4d74011 = 382618036 + W 02203b0b6 + VS 080a6b3e6 (sisältää c562b4e29:n) + NUI cff6a5ab3. Skenaario `_tyo/karttaseppa/sk-pariisi-yhteinen-4.txt`, 30 kuvaa, talot NS `palat-v4` ja `palat-v4-nd-ranta`. Tulos `lokit/karttaseppa-yhteinen-4-0b4d74011`. **Älä yhdistä Y:hen ajon aikana.**
Jos Unity ei käänny tai varjostin kaatuu: VS:n OhjelmaKohteet.cs ja varjostin ovat kääntämättä. Tee varahaara, jossa VS on c562b4e29, pyydä ajo uudelleen ja vie virhe VS:lle.

**Katso kuvat täysikoossa tai rajauksina, sitten jaa:**
| Kuvat | Kysymys | Kenelle |
|---|---|---|
| nd-raja-koe, nd-raja-nyt, keski-ylhaalta-koe, keski-ylhaalta-nyt + `grep "nimet etsi\|nimet laske"` unity.log | Koe on nyt ENSIN. Jos nimet puuttuvat nyt nyt-kuvista, syy on järjestys | PT, KK |
| sc-45, sc-80 (läikkä täysikoossa x 1485–1685, y 1840–1955) | v4:n seinät, läikkä umpeutunut? | NS, KK |
| etela-koe, etela-nyt, po-la-koe, po-la, ts-talot, hdv-talot | Talot rantaan, kohteet talot päällä; etelä-kameran suunta on oma arvio | NS |
| ss-la, ss-talot | Notre-Damen kyltti häipyy, Sainte-Chapellen pysyy | NUI |
| mp-oikea-kulma, mp-lahi | Vasen nurkka tumma? Kattoreuna sileä, näyttääkö tasainen reunus tyhjältä? | KK |
| puut-ylhaalta | Puu varjon päällä | PT |
| p-*, se-et, po-la, co-*, keski-ylhaalta-hdv-2 + mittari `grep "MATKAKIRJA ohjelmakohteet: luotu\|MATKAKIRJA concorde"` | VS katsoo itse: kansio VS:lle | VS |

KK:n sana odottaa näitä: **tasainen oletukseksi** vasta, kun merkit mäellä (katsottu, kunnossa) ja v4:n seinät on nähty. Älä kytke sitä ilman sanaa.

## TULOKSET TÄSTÄ SESSIOSTA
- **ND vs Sainte-Chapelle (PT, KK):** usvan kynnys, ei vika. Malli häipyy, kun peitto on 0,6–0,9 (`Horisonttiusva.cs:86`), tällä kameralla syvyydellä 2259–2358 m. SC 2182 m, ND 2418 m, ero 236 m; täsmää myös koordinaateista. Malli ei ole haamu vaan kokonaan poissa (usva 1,00 leikkaa kaiken, `NotreDameKirkko.shader:74`), molemmissa ajoissa. Haaleat hahmot ovat alueen puita. Suositus: ei muutosta. Selvittämättä: pieni violetti hahmo SC:n yläpuolella.
- **Puuttuvat nimet (PT):** ei koepohja (vain tekstuuri, `Nahtavyysalue.cs:622`), talokerros ei koske nimiin. Epäily, todistamatta: `Nimikerros.Karsi` (`Nimikerros.cs:1819`, raja 4000 riviä) poistaa kaukaiset elävät nimet, muttei merkittäviä eikä suurkaupunkeja. Jos todistuu, se on myös pelaajan vika (nimet katoavat lähelle ja takaisin zoomatessa): kerro NUI:lle.
- **Montparnasse (KK):** koillispääty tummaksi, `mp-torni.py` `varjopuoli` sivulle "oik". Vaalea nurkka oli keskikiilto: pelissä 202,179,131, valokuvassa 69,89,95. Atlas katsottu, pelissä näkemättä. Lounaispääty ennallaan. Kuittia Codexille tai Tripolle ei anneta.
- **NS:** laivat (Pont Neuf ja Pont des Arts) ovat aitoja ja v4:ssä; NS vie KK:lle, KS ei tee mitään.

## Oppi
Katso kuva täysikoossa, ennen kuin toistat toisen sanan: kirjoitin "haamu = usva", vaikka mallia ei näkynyt lainkaan. Kun malli näkyy kahdessa ajossa samalla kameralla, kuva samalta kameralta myöhemmin paljastaa järjestysvian ilman uutta ajoa. `nimet etsi <nimi>` kertoo syyn, miksi nimi ei näy.

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
