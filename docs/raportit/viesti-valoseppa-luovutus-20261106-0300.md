# Valosepän luovutus 6.11.2026 klo 03.00

Korvaa luovutuksen -0235 kohdat TILA, AJO ja SEURAAVAKSI. Muut pätevät: -0235 KK 02.5x, SYY JA KORJAUS, JÄÄNNÖKSET; -0221 SAINT-EUSTACHE; -0157 Pont Neuf ja AUKI AAMULLA; -0135 SUOJATARKISTUS; -0115 maa ja mittarit (paitsi helma). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## TILA
Koodi 0ac043480, haara `linssiseppa2/ohjelmakohteet`, natiivi-backupissa (ls-remote tarkistettu), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Testit 16/16 (`<dotnet> rak/G.dll OhjelmaKohde`). EI käännetty Unityssä eikä ajettu: 59ebb5d7d ja 0ac043480 ovat näkemättä pelissä. OhjelmaKohteet.cs ei kuulu testikäännökseen.
D = /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet.

## AJO: EI OMAA AJOA
Sha ja `D/sk-maa4.txt` (8 kuvaa: sk-maa3:n 6 + ss-la, ss-et) lähetetty JU:lle 02.5x yhteiseen Pariisin ajoon. Jos sk-maa3 on jo ajossa, Saint-Sulpice menee seuraavaan yhteiseen ajoon. JU:n vastausta ei ollut tätä kirjoitettaessa. Uusi oma pyyntö palautetaan, ellei PT tai KK sitä pyydä. Älä muuta listaa ajon aikana.
Kun JU ilmoittaa kansion: katso täysikoossa, viat nimettyinä KK:lle (`local_231e4bad`), rivi PT:lle. `suunta 80` ja `suunta 20` ovat Saint-Eustachen arvot: tarkista, että kuva näyttää sen, mitä nimi väittää. KK:lle ei ole vielä kerrottu Saint-Sulpicen valmistumisesta: kerro kuvien yhteydessä, älä hyväksyntänä.

## TEHTY: SAINT-SULPICE (way 16077204, akseli +7,3°, MaaH 49,0, 12 011 kolmiota)
Lähteet, Commons: Blondelin Architecture françoise -pohja, pitkittäisleikkaus, Grand Portail (Paris Musées, CC0) ja midi-portaali (PD); poikkileikkaus Lucas 1745 (CC0). `D/a/viite/Saint-Sulpice-plan, -plan2, -coupe-profil, -coupe-persp, -portail, -portail-blondel, -midi, -tornit`; -plan2, -portail-blondel ja -tornit haettu, ei katsottu. Valokuvat `saint-sulpice-1, 2, 3, 4, 6, 7` (CC BY-SA, CC BY) vain vertailuun.
MITATTU
- Pohja asettuu OSM:n päälle omalla palkillaan 33,17 px/m (10 toises 646,5 px, täysikokoinen rajaus); länsiosa, sivut ja poikkilaiva täsmäävät silmämääräisesti (`python3 -I D/a/ss-sovita.py 7.3 33.17 1991 2060 <kuva>`). Akseli z = +1,3 OSM:n keskipisteestä; Lat/Lon on jo akselilla.
- Kuoren kaari OSM:stä: keskipiste x 24,4, säde 24,2.
- Pitkittäisleikkauksen palkki on ristiriitainen: "12 toises" antaa kirkon pituudeksi 143 m, väliviivat 49 px/toise eli 25,1 px/m antavat 119,5 m (OSM 122). Käytin väliviivoja; holvi tulee näin 30,5 m, fr.wp 30. Tämä on oma tulkinta, koska palkin alkuosa ei ole väliviivojen mukainen.
- Portail: 51,8 px/m, leveys 55,2 m (OSM 55,9). Midi: leveys 40,7 m (OSM 38,9).
- Maa: pinta portaissa 97, julkisivussa 98, risteyksessä 104, kappelilla 101 (`D/maa/ss-vyot.py`). MaaH 49,0 = julkisivun keskikohta, EI mediaani (50,4): mediaanilla portaat jäisivät 3,9 m kartan yläpuolelle. Hinta: malli on risteyksen kohdalla noin 6 m pinnan alapuolella. Varjostin piirtää mallin kartan päälle, joten uppoamista ei pitäisi näkyä; päätelty, ei nähty. Tämä on poikkeus muiden kohteiden mediaanisäännöstä: kerro KK:lle.
LÄHDE, EI MITTAA: tornit 73 ja 68 m, holvi 30 m, leveys 57 m (fr.wp). Päätyä ei ole nykyisin (fr.wp).
PÄÄTELTY, EI MITATTU
- Tornien välikorkeudet kuvasta -6 lineaarisesti välillä 39–73 m, perspektiiviä ei korjattu; leveydet samasta kuvasta. Piirustusten tornit eivät ole nykyiset.
- Sivulaivan ja kappelien korkeudet poikkileikkauksesta, mittakaava kappelien leveydestä; leikkaus on perspektiivikuva. Lattia y = 2,8 piirustuksista (2,7 ja 3,4). Harjat: laiva 43,5, poikkilaiva 46,7; poikkilaivan katon muoto on arvio.
- Länsikulmien pyöreät porrastornit (paikka −13; ±17,5, huippu 34 m): näkyvät kuvassa -4 ja poikkileikkauksessa, paikka ja korkeus arvio. Itäpuolta ei mallinnettu.
- Pohjoinen poikkilaiva on etelän mallin kopio; Blondelin pohjoispiirustusta ei katsottu.
- De Waillyn syvennys x 52,7–58,3 vain OSM:stä, korkeus 16 m arvio; vuosi 1774 ja kohteen tunnistus fr.wp:n maininnasta ja OSM:n ja pohjan erosta. Neitsytkappelin kupoli ja pieni käytäväkupoli leikkauksesta (1700-luku), nykytilaa ei tarkistettu.
- Kirkon kivi ja katto samat värit kuin muilla; etelätornin raakakivet kaavamaiset.
EI MALLISSA: OSM:n kaakkoiskortteli (x 19–54, etelä), sakastien erilliset rakennusosat, läpi näkyvä taivas yläkerran kaarista (tummat kaaret; kuvissa -1, -4, -6 taivas näkyy), okulukset vain suorilla sivuilla, Neitsytkappelin kulmamassat (OSM z 8–10, malli 6,3), suihkulähde.
Suoja (11.8): 1646–1870 fr.wp:stä; Servandoni, Chalgrin, Oudot de Maclaurin, Oppenord: vuosien perusteella täynnä, kuolinvuosia ei haettu. Nykyteoksia ei mallinnettu.
Offline-kuvat `D/a/oma/ss/saint-sulpice-k45.png`, `-k6-90.png`, `-k12-135.png`, `-k12-270.png` (k45 ja k12-270 ennen tornin kattokorjausta). Katsottu; muistuttaa kuvia -2, -6. Ei hyväksyntä, päätös pelikuvista.

## SEURAAVAKSI
1. Kun JU ilmoittaa ajon kansion, kuvat ensin (AJO). Saint-Sulpicen viat nimettyinä KK:lle.
2. Seuraavaa rakennusta ei ole määrätty; KK:n sanaa ei kysytty. Odota, älä aloita omin päin.

## MUUTA
Uudet apurit `D/a/ss-piirrokset.py, ss-sovita.py, ss-rajaa.py`, `D/maa/ss-vyot.py`. ÄLÄ aja `a/tee-sillat-cs.py`:tä. Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
