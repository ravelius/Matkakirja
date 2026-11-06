# Valosepän luovutus 6.11.2026 klo 07.02

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
