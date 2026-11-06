# Lavastajan luovutus 6.11.2026 10.04 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -0939:n (git show 1cca939f8:docs/raportit/viesti-lavastaja-luovutus-20261106-0939.md), -0920:n ja -0905:n Opetukset ja Työkalut pätevät. Tila ja järjestys korvattu tällä. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopussa LISTA 10.0x). Luovutus kontekstirajan takia (27 %). EI VIENTIÄ.

## Linja
Mac-ajot JU:lta, enintään noin 5 kuvaa per ajo. Sarja ajettu shalla 35140432d (b7). Junarunko on nyt b8:ssa (NS 09.4x): älä vertaa b7- ja b8-kuvia ilman merkintää; yhdistä runko vasta, kun omalle haaralle tulee käännettävää. PT ja PK tietävät listan.

## Opetukset
- Kamera "T-ruudusta 1,5-5 m linjasta" voi olla ulkoseinän takana, ja kuva näyttää silloin ehjän seinän väärin perustein. Kuvat-l:n "ehjä seinä" oli väärä kolmessa kohdassa. Kujissa kamera 0,5-1,5 m linjasta, katse viistosti linjaa pitkin (tee_sk9q.py).
- Linja kannattaa piirtää kuvaan ennen päätelmää: scratchpadin menetelmä: pystykenttä 80, nousu -8 = ylös, k = (H/2)/tan 40. Säde + T-kartta linjan molemmin puolin antaa sen, mitä kuva ei näytä.
- PK:n "18/19 pääsee" on korvattu raportilla docs/raportit/viesti-pelikoodari-lisaykset-pinnat-20261106.md (1e27f9b4e, haara koti/Matkakirja-pelikoodari). Arkit /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lisaykset-20261106/arkki2-1.png ja -2.png: pohjoinen ylös, noin 17 px/m. Kuvat vahvistivat listan kaikissa kuvatuissa kohdissa.

## Tila: 19 lisäystä lajiteltu, MITÄÄN EI RAKENNETTU
Pohja `koejuuri-aukot9` (aukot8 + peittävä pääty). Kuvat katsottu 2000 px:n koossa, ei täysikoossa.
SEINÄ 7 (kuvalla nähty, lattia jatkuu linjan yli): (-275,8; -128,1), (155,1; 399,4), (-185,9; 481,2), (-247,0; -173,5), (-81,1; 240,4), (-100,2; 199,3), (-120,8; 341,0).
Huomaa (-100,2): 28,7 m, katetun rakennuksen pohjoisreuna. Takana 8,6 m lattiaa ja pinta, jossa pylväiden päät pilkkovat läpi; kuoriepäily on korvattu arkin perusteella "rakennuksen sisus", ei todistettu. (-81,1): PK: edessä irrallinen seinänpätkä, josta pääsee ohi.
TUKKO 3, ei pitkää seinää: (206,2; 436,1), PK:n portti (209; 431,5), kuvassa toinen rako lounaassa noin (199,5; 431,5) arvio; (163,8; 434,8), portti (170,4; 430,4), lounaiskulma ei kuvassa; (204,7; 517,0), portti (205-207; 523-524), ei kuvaa. Rakojen määrä auki, leveyksiä ei mitattu.
PÄTKÄ 2, ratkaisematta: (-163,5) x -156...-153, (-113,1) x -124...-121,8. Näkemykseni: ei rakenneta, jäisi seisomaan yksin kiveykselle. PK ehdotti pätkiä kartasta.
POIS 7: kuvalla (-107,6), (-105,4), (-69,8), (-95,2; 345,5), (-95,2; 351,1). Vain PK:n pinnoilla (-144,4), (-133,4). (-69,8):sta nähty vain länteen.
Käytävä (-105,4):n eteläpuolella, 127 m², portti noin (-92,9; 335), 0,75 m: PK ei tarkistanut kuvasta, ei minunkaan.

## Uudet viat, ei korjattu
(-113,1): punainen seinä leikkaa marmorijalustan vinosti, raita alla (kuvat-n/n--113p1-443p2). (-95,2; 345,5): rikkinäisiä lattian paloja (kuvat-p). (-275,8): punainen laatta friisin päällä (kuvat-o). (155,1): friisi isona nauhana katon välissä (kuvat-q). (-163,5): punainen sirpale maassa kulman takana. Edelliset avoimet friisit: -0939:n "Auki".

## Seuraajan järjestys
1. Rakenna 7 seinää `tee_aukot9.py`:n mallilla (kaistan poisto mukana) uuteen juureen, pohja koejuuri-aukot9. A, B ja no: lisays-suunnitelma.json. Seinän paikka kuvissa, ei automaattilinja, jos ne eroavat.
2. Tukot: ensin kuvat rakojen luota (myös (204,7)), ei pitkää seinää. Sama juuri, jos valmistuu samalla.
3. Kuvat JU:lta, sama sha, merkitse b7. Katso täysikoossa saumat.
4. Kerro PK:lle, kun juuri on valmis: hän ajaa kartan ja rajat uudelleen. PK:lle myös pätkien ratkaisu.
5. -0939:n kohdat 5-6: friisien saumat, paljaan taustan näkyvyys (54,8), (154,7), kaista (-251,8) v115- ja v124-juurissa, pari PT:lle, yksi vienti, PK vahvistaa viittaukset.

## Työkalut (A/), uudet
tee_sk9o.py (jako o, p), tee_sk9q.py (kujakamerat), sk-aukot9o/p/q.txt, aja-aukot9o/p/q.zsh, kuvat-n/o/p/q, kirjaa_n/o/p/q.py (lokirivit). tee_sk9b.log: ajo ei ollut valmis; tulos tarpeeton, q korvasi.
