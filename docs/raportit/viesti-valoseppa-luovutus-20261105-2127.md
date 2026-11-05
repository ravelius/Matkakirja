# Valosepän luovutus 5.11.2026 klo 21.27

Korvaa luovutuksen -2057 SUUNNITELMA-kohdat 1–5 (tehty). Mitat ja lähteet -2057:ssä pätevät. Muu -1934:ssä yhä voimassa, Pariisin valokokeet seis.

## TILA
Ohjelmakohteet (2.213): koodi valmis, haara `linssiseppa2/ohjelmakohteet`, sha cffdccab9, natiivi-backup, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Kartta-testit 618/618 ajettu ennen viimeistä committia (41cfbb636); cffdccab9:lle ajettu ohjelmakohteiden 3 testiä ja unity-tarkistus, 0 virhettä. Ei junaan, ei vientiä. Kuvia EI ole vielä lähetetty KK:lle.

Ensimmäinen Mac-ajo 41cfbb636 (linja 1, JU:n vuoro, 389 s, 11 kuvaa): /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261105-211720. LUKKO VAPAA ilmoitettu JU:lle. Sen kuvat ovat vanhentuneet, koska välkyntä korjattiin sen jälkeen. Älä lähetä niitä.

## SEURAAVAKSI
1. Pyydä JU:lta uusi vuoro: cffdccab9, sama skripti /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/sk-ohjelmakohteet.txt, ESIKATSELU_PISTEKERROIN=0.465, noin 7 min, 11 kuvaa. JU antoi viimeksi linjan 1 (linjalla 2 oli LAV). Ajo tiedostosta: `PROTO_LINJA=<JU:n linja> ESIKATSELU_PISTEKERROIN=0.465 zsh tyokalut/esikatselu.sh cffdccab9 <sk>` worktreesta, taustalla. Tarvitsee `zsh`-sanan, koska skriptillä ei ole suoritusoikeutta. "pistekerroin 0.47 (esikatselu 0.465)" lokissa on oikein.
2. Katso täysikoossa ja rajauksina. Rajaustyökalu: edellisen session scratchpadissa rajaa.py; tee uusi: rajaus 500×170 px (l-hdv keskipiste noin 1355,930; l-pn 1460,935; l-pa3 1370,942 kuvassa 2752×2064), suurennos ×3 NEAREST. Tarkista erityisesti: välkkyikö julkisivu ja sillan kansi edelleen, näkyykö yksityiskohta väärin toisen läpi (syvyyslisäys 0–2,5 m).
3. Kuvat KK:lle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe, VS:n valokoonnit-poikkeus), rivi PT:lle: mitä, sha, kuvien polku. KK vie omistajalle kortin Lontoosta, en minä.

## MITÄ AJO 41cfbb636 NÄYTTI (kerro KK:lle tuoreen ajon havainnot näiden pohjalta)
- Kaikki neljä mallia asettuvat kartalle oikein: Pont Neufin varret saaren ja rantojen väliin, Pont Alexandre III kadun linjaan Seinen yli, HdV aukion viereen. Neljä suuntaa toimivat; `suunta 110` katsoo HdV:n pääjulkisivua.
- OLENNAINEN ERO: oikeissa mitoissa ohjelmamallit ovat Tripoihin verrattuna hyvin pieniä. Notre-Damen tornit (liioiteltu tilauksesta) ovat moninkertaiset HdV:n vieressä, ja Grand Palais on selvästi suurempi kuin Pont Alexandre III. Älä korjaa skaalalla; tämä kerrotaan KK:lle omistajan päätettäväksi (kortti Lontoosta on KK:n).
- Lähin zoom: `aja … 0.003` ei tullut 0,012:ta paljon lähemmäs, koska kameralla on alaraja (PalloKierto.MinKorkeus). HdV on lähikuvassa noin 200 px leveä 2752 px:n kuvassa eli noin 1 m/px, ja ikkunat ovat 1–2 px. Yksityiskohta jää siis osin näkemättä tällä zoomilla; syy on mittakaava, ei malli. Esikatselun rajaukset näyttävät mallin muodon, pelikuvat todellisen koon. Kerro tämä KK:lle: yksityiskohtia ei tarvita näin paljon nykyisellä zoomilla, tai lähizoom tarvitsisi tarkistuksen.
- Vika, johon cffdccab9 on korjaus: julkisivu rakeili ja sillan kansissa oli vaihtuvia monikulmioita, koska 2–14 cm:n erot pinnoissa ja päällekkäiset kansitasot välkkyivät syvyyspuskurissa noin 1,5 km:stä. Korjaus: P3.B → kärkivärin alfa → varjostimen syvyyslisäys 0–3 m (paikka ei muutu), kannet jaettu ilman päällekkäisyyttä (Rakentaja.Leikkaa, Paakansi), pehmeämpi lasi ja kartan katuihin sopiva vaaleampi kansi. EI vielä nähty ajossa.
- Lokin ArgumentOutOfRangeException 21:17:44 tulee ennen ohjelmakohteita ("uusi-peli 5 pariisi" -vaiheesta), ja sama on LAV:n ajossa esikatselu-20261105-211417. Ei minun koodistani; en selvittänyt syytä.
- Sillat: Pont Neufin päiden muoto on OSM:stä, seinä y = 0:sta asti, joten rannan kiilat peittävät päätykaaria hieman. Kaikki kolme kohdetta 53 956 kolmiota yhteensä (HdV 28 224, sillat 8 824 + 5 826 + 11 212).

## TYÖKALUT
/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/: aja-geometria.sh (pikakäännös + OBJ:t obj/), esikatsele.py (`python3 esikatsele.py obj kuvat hdv 45 0,90,180,270 900`, ilman -I, koska numpy on käyttäjän kansiossa; maalarin sijaan syvyyspuskuri), kuvat/. Esikatselu EI näytä syvyysvälkyntää eikä zoomin rakeilua: arvio vasta Mac-kuvista.

## MUUTA
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
