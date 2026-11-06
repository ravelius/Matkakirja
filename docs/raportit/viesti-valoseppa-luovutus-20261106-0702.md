# Valosepän luovutus 6.11.2026 klo 07.02

## LISÄYS 07.1x: TÄMÄ KUMOAA ALEMMAN, MISSÄ NE EROAVAT
KK:n ja PT:n viestit tulivat luovutuksen jälkeen. Järjestys: 1) palautus (TEHTY) 2) sillat 3) Saint-Eustache ja Saint-Sulpice 4) Pompidou; ohessa nimien tiedot NUI:lle. Seuraavaa ei tarvitse kysyä. Kaikki seuraavaan yhteiseen ajoon JU:lla, EI omaa ajoa.
TEHTY: kuusi siltaa takaisin 5d9a966c1 (natiivi-backup, testit 16/16; 18 siltaa). OMISTAJAN PÄÄTÖS 06.58 "Palautetaan", 11.8:n poikkeuksia, App Store -listalla. Ajamatta. Niiden pilarit ja kaaret ovat vanhoja arvioita; Pont des Arts ja Senghor ovat kevyen liikenteen siltoja.
ÄLÄ aja `maa/pinta.py kirjoita`: se lisää kentät toiseen kertaan, ja Sullyn pohjoisvarren MaaB meni 31,1:stä 39,0:aan (palautin 31,1; kumpi on oikein, ei selvitetty). Uusien siltojen arvot ovat nyt tiedostossa.
TASAINEN KARTTA: omistaja hyväksyi 06.58, EI vielä oletus. Vastuu KS, koe `karttaseppa/ajo-tasainen-talot` (0f138c5de); oletukseksi vasta, kun talot, nimet ja merkit ovat samassa maassa ja Sacré-Cœur on tarkistettu. KK: katso sillat ja kohteet tasaisella kartalla, älä hio kallistusta. PT: KYSY MAAN ARVOT KS:LTÄ ennen kuin lukitset siltojen tai Pompidoun korkeuksia. Käyttöönoton tila PT:ltä.
SILLAT (KK, kp-con ja kp-roy): kivisilta. Suora, leveä pilari nousee vedestä ilman rakoa, kaari alkaa pilarin yläosasta, seinä on yhtä pintaa kannen reunaan asti, ei nauhaa piikkien päällä. Pää jatkuu kadusta ilman sivukiilaa. Viirujen ja pisteiden syy selväksi. Tuo pari oikea silta | peli (Pont Royal, Concorde), mittana oikeat pilarit ja kaaret. Koodi OhjelmaKohdeSillat.cs (KiviKaari), SiltaTumma; `git grep` omalla rivillä viirujen syylle.
SAINT-EUSTACHE: kartan ruskea kuvio ei saa näkyä mallin alta; kerro KK:lle, mitä se on. SAINT-SULPICE: katon sininen lähemmäs tummaa liusketta ja portaiden rakeet pois, jos pieni. Hyväksyntä on omistajan; yövaltuus päättyi 06.43.
AJOON UUDELLEEN ILMAN HELMAA (KK): pb-etu, pb-piha, Madeleine, Pont Neuf, Tour Saint-Jacques, Hôtel de Ville. Kokoa uusi lista `D/sk-maa5.txt`: vanhat kulmat listoista sk-palais, sk-madeleine, sk-maa ja sk-maa4; älä muuta listaa ajon aikana. Lisää Pompidou, jos se ehtii.
UUSI TYÖ NUI + VS (PT): nimet kulkevat ohjelmakohteiden yli (Saint-Sulpice, Saint-Eustache, Madeleine, Palais Bourbon; lähtökohta 1af8879d6). Tavoite: nimi kokonaan tai ei ollenkaan, ei rakennuksen yli, sama väistö kuin malleilla. NUI vetää väistön, VS antaa kohteiden tiedot ja jalanjäljet (Lat, Lon, Akseli ja verkon rajat kohteittain; Natiivi-UI:n id osoitekirjasta). KK vie nimet PT:lle, älä ratkaise niitä yksin.

Korvaa luovutuksen -0300 kohdat AJO ja SEURAAVAKSI. Muut pätevät: -0300 TEHTY: SAINT-SULPICE; -0235 KK 02.5x, SYY JA KORJAUS; -0221 SAINT-EUSTACHE; -0157 Pont Neuf ja AUKI AAMULLA; -0135 SUOJATARKISTUS; -0115 maa ja mittarit (paitsi helma). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## TILA
Koodi edelleen 0ac043480, haara `linssiseppa2/ohjelmakohteet`, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30, puhdas. Ei junaan. Pompidoulle ei ole vielä riviäkään koodia.
D = /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet.

## AJO f48f56b0e (sk-maa4) KATSOTTU
Kuvat proto-3d/lokit/valoseppa-maa4-f48f56b0e, kopio keskustelukanava/kuvat/valoseppa-maa4-f48f56b0e (rajaukset/ suurennokset). JU: käännös puhdas. Lokin POIKKEUS on Unityn oma haku (SearchDatabase), ei peli. Viat lähetetty KK:lle 06.5x (viesti oli jonossa, KK ei ollut vielä vastannut), rivi PT:lle.
- Saint-Sulpice: seisoo maassa, tunnistettava; nimet mallin yli, sininen katto hallitsee, portaat rakeiset, valkoisia pisteitä katon reunassa, yläkerran kaaret tummat. Ei hyväksyntää.
- Saint-Eustache: ovet maassa, ei tyhjää laattaa; ruskea ala mallin alla näyttää kartan kuviolta, ei varmistettu.
- Sillat: sahalaitaseinät poissa. Yhä viat: pilarit piikkeinä eikä paksuina ja matalina, kolmion muotoinen kivikiila päissä maan päällä, lyhyitä tummia viiruja kaiteilla ja tummia pisteitä Pont Neufin reunoissa (syy katsomatta).
SILLOISTA KK:N SANA ERIKSEEN (PT 06.55): älä korjaa ennen sitä. Kuusi poistettua siltaa: KK kysyy omistajalta, EI palautusta ennen vastausta.

## SEURAAVAKSI: POMPIDOU (PT 06.55, omistajan kortti)
"Pompidou-keskus tehdään poikkeuksena", voi joutua pois ennen App Storea, tarkistuslistalla (11.8). Tarkistettu KK:n keskustelusta: "Montparnasse ja Pompidou tehdään". Montparnasse ei ole määrätty Valosepälle. Ei taideteoksia (ei Stravinsky-suihkulähdettä, ei La foule illuminée). Oikeat mitat, ei suurenneta. Oma ajo vain PT:n tai KK:n pyynnöstä: uusi kohde JU:lle yhteiseen Pariisin ajoon.

KOHDE: way/55503397. Lat 48.8605387, Lon 2.3524118, Akseli +69.93 (`python3 -I D/a/po-osm.py`). Sillä +x = pohjoiseen (NNE), +z = länteen eli Piazzalle, −z = itään eli Rue du Renardille. Kaava kuten kohteet.py: E = x cos a − z sin a, N = x sin a + z cos a.
MITATTU OSM:stä: x −84,2…+84,2; länsireuna z +28 (x 56–68 ulkonema z 33,5: arvatenkin liukuportaan alkupää); itäreuna z −33; pohjoisreunassa loven takia z 17,9–26,9 viisto. Korkeus OSM 42.
LÄHDE fr.wp: kerrosväli 7 m, Forum 10 m; tämä antaisi 45 m, OSM 42 m. Ehdotus: runko 42 m, Forum 10 + 5 × 6,4: oma tulkinta, kerro KK:lle.
MUISTISTA, EI VARMISTETTU: 13 jänneväliä à 12,8 m (= 166,4 m, täsmää OSM:ään), pilaririvi noin 48 m välein, gerberette-ulokkeet noin 6 m rungon ulkopuolelle, pilari Ø 0,85.
KUVAT `D/a/viite/`: pompidou-0 (CC0, Montparnassesta, länsisivu ja katto), pompidou-pano (BY-SA 3.0, idästä; putket), pompidou-mini (BY-SA 2.0, Mini-Europen pienoismalli, ei oikea rakennus; koko länsisivu), pompidou-2 (BY 2.0, Piazzan valkoiset ilmanottoputket). Commonsissa on vähän kuvia, koska Ranskassa ei ole panoraamavapautta; `a/pomp-lahteet.json`. pompidou-1 ja -5 ovat hutia.

MALLIN SUUNNITELMA (ei koodattu): funktio `OhjelmaKohdeGeometria.Pompidou()` tiedoston OhjelmaKohdeRakennukset.cs loppuun, Kohde-rivi OhjelmaKohteet.cs:ään, testi `PompidounMitat` (malli `SaintSulpicenMitat`). Akseli-rivi ja OBJ myös `D/maa/kohteet.py`:n listaan, MaaH sieltä (mediaani jalanjäljeltä; tarkista, jääkö Piazzan reuna ilmaan). Pelin kohteessa julkisivu on noin 225 px, joten luettavuus ratkaisee: tumma lasilaatikko, valkoinen ristikko, punahopeinen siksak, sininen katto.
- Runko: tumma lasi (noin 0x2A3036) x ±83,2, z noin −24…+24, y 0–42; kerrosvälipohjat vaaleina nauhoina.
- Valkoinen ristikko (noin 0xE8E4DA): 14 pilariviivaa kahdessa rivissä z ±24, uloimmat vetotangot z noin ±30, gerberette-palkit joka kerroksessa, pitkittäispalkit ulkoreunassa. Alle 0,5 m:n osat katoavat kuvassa kohinaksi: leveys vähintään 0,6 m, kerro KK:lle. X-jäykisteitä ei tehdä.
- Päädyt: kerroksittain 2,8 m korkea ristikkonauha yli leveyden (kuvassa -mini selvä).
- LÄNSI, liukuportaat (`pompidou-mini`, `pompidou-0`): nousee POHJOISESTA ETELÄÄN, viisi vinoa ja niiden väliset vaakaosat, z noin 31–34. Ehdotus: vino 12,8 m ja vaaka 12,8 m, alkaa noin x +70, ylin vaakaosa jatkuu lähelle etelä­päätyä; hopeaputki (0xBFC8CC), vinon alla punainen teräs (0xC8342B). Lisäksi ylin kulkukäytävä vaakaputkena lähes koko pituudelta ja toinen keskikerroksessa (vain pienoismallista).
- ITÄ, putket (`pompidou-pano`, perspektiiviä ei korjattu, etelä vasemmalla): vallitsevasti siniset pystyputket (0x2F7FC4); vihreät (0x3F9A58) x −63…−58; punaiset hissilohkot x −58…−41 ja x 23…42; keltaisia (0xE0B52E) ei erotu kuvasta, sijainti arvio.
- KATTO näkyy eniten, kamera on korkealla: vaalea pinta, siniset kanavat lähes koko pituudelta, valkoiset kuvut ja putkipäät noin 8 kpl (korkeus arvio, y noin 48), punaiset laatikot noin x +65, −2, −65 (kuvasta -0, arvio).
- Ei mallissa: Piazzan ilmanottoputket (paikka tuntematta), paloportaat päädyissä.
Tanko XY-tasossa: uusi apuri vinoille osille (kuusikulmio, normaalit kuten Pyora). Testit ja esikatselu kuten -0115: `sh D/aja-geometria.sh`, `<dotnet> rak/G.dll OhjelmaKohde`, `python3 D/esikatsele.py obj <tulos> pompidou 45 300 1100`. Vertaa esikatselua kuviin -0 ja -pano ennen committia. Commit omana, ei junaan.
Kun malli on valmis, kerro KK:lle: mitä on mitattu, mitä arvioitu; kuvat vain ajosta.

## MUUTA
Apurit `D/a/po-osm.py`. Lähteiden haku oli scratchpadissa, tulos `D/a/pomp-lahteet.json`. Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
