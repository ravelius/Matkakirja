# Karttaseppä: luovutus 6.11.2026 klo 09.21 (KS)
Syy: konteksti 25 %, luonteva tauko: molemmat ajot katsottu ja jaettu. **Voittaa aiemmat ristiriidassa; -0904:stä pätevät enää W, Y:n polku ja id:t; -0829:stä kohdan 1 Notre-Dame-koe ja viat sekä kohta 3; -0804:stä VIESTIRAJA ja AUKI.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki 1303df5fc). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus, kärki c0bfef077). KK:lle SendMessage id:llä local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. ListAgents ei listaa KK:ta, mutta id toimii.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen). Kumpikaan ajo ei ole käynnissä.

## ENSIMMÄINEN TYÖ: LOUVREN TALOMASKI (OMISTAJA 09.20, voittaa alla olevan kohdan "Louvre-maski odottaa")
Omistajan kortti: "Louvren ympärillä on litteä alue, koska hyväksymällesi alueelle ei ole vielä maalausta. Kokeillaanko sen tilalle kortteleita ja taloja, kuten Notre-Damella?" = "Kokeillaan (Suositus)". KK:n tavoite: Louvren itä- ja pohjoispuolella ei ole litteää aluetta, vaan korttelit ja talot tulevat Louvren viereen kuten Notre-Damen rannoilla. Louvren malli, Tuileries ja Seine pysyvät, eikä mikään talo lävistä mallia.
- **Tee:** uusi Louvren talomaski (nyt kohteet-pariisi.json, varatut, louvre = iso alue v2, itäraja lon 2,3471), anna se NS:lle kuten `_tyo/natiiviseppa/pariisi-talot/selvitys-yhteinen/nd-ranta/korvaus.json` (työkalu samassa kansiossa `nd-ranta-maski.py`; NS:n `tee-palat.py` lukee kohteet-pariisi:n). Kerro samalla NS:lle ja KK:lle, muuttuuko Louvren pohjakuva. Rajan valinta on sinun.
- **Huomaa:** malli on oikeaa isompi ja on aiemmin peittänyt Rue de Rivolin. Vanha reunus (maski21, punainen raja kuvassa ehdotus-v2.jpg) on KK:n mukaan valmis lähtökohta, jos se sopii nykyiseen malliin. Polkuja maski21 ja ehdotus-v2 en löytänyt `_tyo`:sta 6 tason haulla; ne voivat olla Louvren Codex-kansiossa (tilamuistiossa A/louvre-pohja ja A/louvre-21c-v1). Etsi ne ensin.
- **Ajo (PT 09.2x):** yhteinen ajo vasta, kun maski ja NS:n uusi kansio ovat valmiit; seuraaja (sinä) pyytää sen JU:lta. Ei omaa ajoa, ei junaan, ei iPadia. Sisältö: Concorde 3203aa555 (sk-concorde-2), NUI 8c3f3931f (sisältää 1ec00e883:n), Louvren korttelikoe, ja alla olevat kuvarivit.
- **Kuviin enintään 3 lisää (KK):** Les Halles matalalta (po-la käy), Palais-Royal ja Rue de Rivoli Louvren pohjoissivulta, Louvren itäpää. Katso myös, katoaako itäpään haalea reuna. Kuvat KK:lle katsottuina. Porrasreunaiset korttelit ratkeavat tässä, jos talot peittävät ne; tarkista.

## TULOS: AJO 5, Y c0bfef077 (katsottu, jaettu KK:lle, NS:lle, NUI:lle, PT:lle)
`lokit/karttaseppa-yhteinen-5-c0bfef077`, palat-v6-nd-ranta, 14 kuvaa.
- Tasainen kartta ja rantapohja toimivat oletuksena ilman komentoa. `karttatasa tila`: ND 1.00, Montmartre 0.00, keski ei nolla. Ensimmäinen tila-rivi on 60 s:n odotuksen jälkeen, joten se ei todista arvoa heti Awaken jälkeen, mutta kuvissa ei näy tasauksen puuttumista.
- nd-raja, keski-ylhaalta, etela: ei laikkua, talot rantaan. sc-45, sc-80: mäki säilyy. sc-80:n läikän kohdalla tasainen katto, ei läikkää. tasa-reuna: ei pystysaumaa eikä porrasta.
- Opéran haalea laatta poissa (co-45 verrattu 0b4d74011:een), NUI vahvisti.
- ts-talot kelpaa NS:lle; hdv-talot on sama kamera kuin ajossa 4, joten uusi kuva on seuraavassa ajossa.

## TULOS: KATTOPARI (KK:lla, suositus v6)
`lokit/karttaseppa-katot-c0bfef077` (Y c0bfef077, v4 ja v6 samalta kameralta). Parit: `_tyo/karttaseppa/parit-katot-c0bfef077/` (marais-koko, marais-rajaus, severin-koko, severin-rajaus; tee-parit.py). KK tekee kortin omistajalle. Saint-Séverin on usvassa keskellä kuvaa, joten sen pari todistaa vähän; KK:lle kerrottu. **Jos KK haluaa Saint-Séverinin lähempää, se on uusi kuva, ei tähän ajoon.**

## ODOTTAA KK:LTA (ei tehtävää ennen sanaa)
1. Kattokortti omistajalle (v4 vai v6).
2. Laivat ruskeina litteinä muotoina Seinellä, poistetaanko (kuva NS:n `selvitys-yhteinen/ajo-c0bfef077/gare-joki.png`, jota en ole itse katsonut).
**Porrasreunaiset korttelit** (Fontaine des Innocents, po-la x 1200–1500, y 1300–1600) ovat KS:n, karttatason asia, mutta älä korjaa ennen uuden maskin kuvia: talot todennäköisesti peittävät ne (NS). Sama muoto näkyy jo ajossa 4.

## SEURAAVA YHTEINEN AJO (yhdistä Y:hen; kääntämättä)
- **NUI 8c3f3931f** (natiivi-backup peili/proto/natiivi-ui/alapiste-219; PT kuittasi; sisältää 1ec00e883:n, f473d4d86:n ja 106521496:n; muutos PalloKierto.cs). Koskee nimiä koko maailmassa, joten muut kaupungit vahvistettava ennen junaa (PT). Hypoteesi nimikadon syystä, kunnes loki osoittaa.
- **VS 3203aa555** (natiivi-backup linssiseppa2/ohjelmakohteet-nimet, korvaa 080a6b3e6:n; yksi rivi NostotKartalla.cs:ään, varjostin palautettu e46ad3592:n versioon). Jos ei käänny, virhe VS:lle.
- **Skenaarion kuvat:** `_tyo/linssiseppa2/ohjelmakohteet/sk-concorde-2.txt` (4 kuvaa, VS); `_tyo/karttaseppa/sk-seuraavaan-ajoon-hdv-etelaan.txt` (hdv etelään ja Octroi, NS); co-45, co-ob, ss-talot, nd-raja, p-con, p-con-2 (NUI; kamerat sk-pariisi-yhteinen-4:stä ja -5:stä). **Rivi `komento concordemaa` pois: komento on poistettu.** Pidä kuvamäärä pienenä (omistajan 17.51 linja).
- **Lokista:** `grep "MATKAKIRJA karsinta"` (ero km noin 0, karsituista usvan edessä, seurattujen paluuviive, nimet takaisin; Lado 8–13 ms ennen; Lähelta-palat) + `nimet etsi` samoilta kameroilta, vertailu 0b4d74011:een; tulos NUI:lle. `grep "MATKAKIRJA ohjelmakohteet:"`, kansio VS:lle.
- Kuvavertailu ei yksin todista "nimet takaisin": nimet vaihtuvat jo ilman Nimikerroksen muutosta (NUI).

## AUKI
- **KS:n oma:** co-45:ssä (2583, 733) uusi yksinäinen pyöreä kuva, ei ajossa 0b4d74011. Kohde tuntematon, koodidiffi ei koske nostoja; tasainen kartta tai eri lataushetki todistamatta. Katso seuraavasta ajosta samalta kameralta, tulos NUI:lle.
- Taivaalla kova vaakaraja (po-la, ts-talot, co-45), sama ajossa 4; syy tutkimatta, PT ja KK tietävät.
- etela-koe | etela-nyt: ND:n katto oliivi kokeessa, kirkkaampi vihreä nykyisessä samalta kameralta (ajo 4); syy tutkimatta, ei kerrottu kenellekään.
- KK:lta puuttuu vastaus Montparnassesta (vasen nurkka, keskikiilto, kattoreunan aaltoilu; -0904).
- Octroin korjaus (v6) näkemättä.

## Oppi
Vertaa koko kuvaa, ennen kuin kirjoitat "muu sama": katsoin co-45:stä vain Opéran kohdan, ja NUI löysi kaksi eroa. Kattokuvassa kohde jää usvaan keskelle kuvaa, joten tarkista kameran etäisyys kohteesta ennen paikan nimeämistä.

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
