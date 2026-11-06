# Natiivisepän luovutus 6.11.2026 klo 23.06

KORVAA KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Etäyhteyteen ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, V = P/valmis-jalki2, H = P/selvitys-origo-hinta, L = /Users/Shared/Claude/proto-3d/lokit. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka, haara natiiviseppa/origo-koe d907286cb, peili natiivi-backup. P:n skriptit ja tulokset ovat haaran ulkopuolella.
Viestiraja: SendMessage on tässä sessiossa pysähtynyt ("Paused"); varakanava mcp__ccd_session_mgmt__send_message (CLAUDE.md).

## ENSIMMÄINEN TYÖ: aloituslennon beiget suorakaiteet (PT ennen Liikua; syy ja kuva PT:lle, korjaus kokeena vasta sen jälkeen)
PT:n pyyntö: mitkä palat ovat tyhjiä ja miksi (lataus kesken, väärä pohja vai nimikerroksen tai pallokerroksen tila), kauanko ne näkyvät, onko sama kuin NUI:n tyhjä pohja ja vino reuna. Pohja NUI:n 1224de027. Älä oleta samaa syytä ennen mittausta.
Haara natiiviseppa/aloitus-tyhjat ccb2dbc2f (natiivi-backup), työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto. Mittari: `pallo laatat tila|vahti` (PallonLaattaMittari.cs), ei muuta piirtoa. Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/aloitus-tyhjat/.
Kuva viasta: lokit/nui-aloitus-kk/k01-lento-alku.png (beige 215,195,157, 13,8 % ruudusta). Kuva t01: lokit/natiiviseppa-aloitus-tyhjat-ccb2dbc2f/t01.png.
MITATTU ajossa natiiviseppa-aloitus-tyhjat-ccb2dbc2f:
- Kuvassa t01 valkoinen alue = laatta 1/1/1 ilman rasteria (paikka 0 "ei", perusväri 1,1,1; ruutupaikka täsmää).
- Muualla t01:ssä laattoja ei ole: näkyviä 3, etupuolella 1. Laatat 1/2/1 ja muut puuttuvat, joten alla näkyy muuta.
- Tila kesti t 11,89-16,09, kunnes 8 z1-laattaa rastereineen. Kuvanotto pidentää aikaa. Aloitusverho lähti katossaan pallon asteella 2,2 % (kk-ajossa 4,1 %), eli verho ei peitä tätä. Lento alkoi noin 11 s käynnistyksestä, koska skenaario painaa heti sisällön jälkeen.
EI VIELÄ TODISTETTU:
- Beige = Pohjapallo (#e5d0a7): väri ja koodi sopivat, mutta ajo b (`pallo pohja pois`) EI RATKAISE: siinä z1-rasterit olivat valmiina jo t 11,77, joten t01 on puhdas eikä aukkoa tullut. Lataus vaihteli 0,5 s ja 4,3 s välillä; syyksi epäilen välimuistia, ei mitattu. Testi vaatii aukon kuvaan, esim. tyhjän laattavälimuistin.
- Mustat kaaret ja venyneet raidat: hypoteesi, pallon takapuolen laatat näkyvät pohjapallon sisällä (Pohjapallo piirtää takapinnan, Cull Front). Ei mitattu. Kaaret ovat samassa ruudun kohdassa k01:ssä ja t01:ssä.
- Ajo c (30 s odotus ennen lentoa) JU:lla, sk-aloitus-tyhjat-c.txt, kansio natiiviseppa-aloitus-tyhjat-c-ccb2dbc2f. Kertoo, koskeeko vika vain heti lähtevää pelaajaa. EI VIELÄ KATSOTTU. Oikean pelaajan reitti ja iPad testaamatta.
NUI:n lento-1 (lokit/nui-aloituslento-kuvat-356eb0101/lento-1-eiffel.png): matalalla Pariisissa karkea rasteri, ei koko pallon aukkoja. Kuvan perusteella ei sama tila; syytä ei ole mitattu tässä.
SEURAAVAKSI: katso c, tee toistettava aukko, kerro syy ja kuva PT:lle varmuustasot mainiten. Korjausehdotus vasta sitten.

## Valmiit, odottavat muita
- OLEELLISET NIMET: 0c544d4ef haarassa natiiviseppa/oleelliset-nimet (98180b82d:n päällä). KK:n päätös omistajan valtuutuksella 23.00: oletuksena pois kadut, kaupunginosat ja pienet vedet; kylät ja hamletit jäävät. Avaimet matkakirja-kerros-kadut ja matkakirja-kerros-pikkunimet. Kokeena, ei junaan. KS poimi: Y 1282a6327 seuraavaan ajoon. KS:n ajossa 35 on vielä vain 98180b82d. 0c544d4ef:ää EI ole ajettu; katso ensimmäisen ajon kuvat. Vertailukuvat 12 kpl lokit/natiiviseppa-oleelliset-nimet-98180b82d. Kartta-välilehden rivi vasta omistajan päätöksellä. KS lähettää ajon 35 lokikansion.
- LIIKUN PALUU: a7c4d3cf3 haarassa natiiviseppa/liiku-lento, koe, ei junaan. Nimitaso mitattu: ennen 15 → 7 → 14, korjaus 15 → 7 → 15. Pari lokit/natiiviseppa-liiku-nimitaso-a7c4d3cf3/pari-l0-l4.jpg, kerrottu PT:lle. EI IDENTTINEN: nimiä 6 s paluun jälkeen 117, ennen Liikua 232 (kadut 88 ja 183), syy mittaamatta. Vain Mac. Skenaario _tyo/natiiviseppa/liiku/sk-liiku-nimitaso.txt.
- PIDÄ natiiviseppa/liiku-lento AJAN TASALLA natiivi-ui/aloituslento-kuvat-219:n kanssa: kun NUI:n kärki muuttuu, poimi Liiku ja korjaus uudelle kärjelle, unity-tarkistus sh:lla, peiliin. Kärki oli 22.28 356eb0101; NUI:lla myös aloituslento-mittaus-219 1224de027 ja kk-2 51f9fad72. PT 22.2x: Liikun ajo jää odottamaan NUI:n lentoa.
- MERI: älä korjaa, menee VS:lle PT:n kautta. iPad-ajoa ei tilata ilman KK:n sanaa. C1 ja D2 odottavat omistajaa, älä kysy uudelleen. Tärinä: ei tulosta, omistaja perui 21.30.
- Havainto, ei vielä kerrottu: k02-kuvassa (nui-aloitus-kk) koneen alla tumma neliö merellä. Syy tuntematon.
- Työpuita wt/-kansiossa yli rajan: kerro PT:lle ennen poistoja. proto-natiiviseppa-kierto = aloitus-tyhjat, -kierto-koe = liiku-lento.
- Jonon jälkeen: "JONO TYHJÄ: Natiiviseppä" PT:lle.

## Mitattu, pysyvä
- Tärinä: iPad 4 A0, 0 palaa, thermal 0: GPU 13 → 29 ms noin 3 min:n kohdalla, huippu 37, 10 min:n tauon jälkeen 11,6; kolmiot ennallaan; seisova kamera kuvaero 0,000. Syy auki. Muistipiikki t 20 s: 3660 (0 palaa) | 4039 (3b); iPad 3b VIKA 4106 ≥ 4080, huippu 4220. Skriptit P/selvitys-muisti-3b/.
- r3-rata oli viallinen (zoomirajan nosto, 4,15 m/ms): r4 = 60 m/s, pelaajaa ei koske. Pelaajan veto 156–209 m/s lähimmällä zoomilla. Silmä 56 m kartan yllä, alle ND:n tornien.
- Iso iPad on Forward+ (Ultra_Renderer mode 2), muut Forward. iPad 1 r3: B2−A0 +8,34 ms, kolmiot 1,06 → 2,03 milj.
- Näkyvä vesi: Z14 + ND:n pohjakuva; maski P/selvitys-tolpat/nakyva-vesi-alueet-2m.png, poisto poista-vedesta.py. Jos KS muuttaa kanavaa tai ND:n pohjaa: nakyva-vesi.py, alue-vesi.py ja poisto uudelleen. tee-palikat.zsh:n jälkeen poista-omat-sillat.py.

## Kerrottu, ei NS:n työtä
- LÖYDÖS (PT 19.2x: kirjataan, ei selvitystä nyt): jos pelaaja on kääntänyt karttaa, veto kortin sulkeutuessa voi kääntää kartan pohjoiseen vedon aikana (elävän saapumisen PalautaPohjoinen jatkuu, vaikka veto katkaisee ajon). iPad 5 sivu-a; pelaajan kulkuna koestamatta.
- Pont Neufin vaalea raita KS:n jonoon (KK). Richard-Lenoirin vesi KK:n sanaa odottamassa (P/selvitys-mac10/rajaus-a-arsenal.png). Canopéen välke liikkeessä katsomatta. Kehysaikapiikit auki erikseen.
- NS:n työpuita wt/-kansiossa yli rajan (8/3): kerro PT:lle ennen poistoja.

## Opit
- PIENENNÖS HARHAUTTAA: JU, PT ja koko kuvan katselu näkivät värieron, jota täysikokoisissa rajauksissa ja pikselierossa ei ole. Mittaa erokuvalla ja rajaa ennen selityksiä.
- LUE KONSOLI AJAN YMPÄRILTÄ ENNEN KUIN NIMEÄT KOKEEN ESTEEN: pohjoiskäännös näytti origon viaksi, mutta sama rivi kertoi saapumisesta. Verrokki toisesta ajosta ratkaisi sen ilman uutta ajoa.
- Projisointi toimii ilman ajoa: palikkajalki-*.csv:n m00-m23 on worldToCamera; H/projisoi-kallistus.py. Kuvan rata-aika 2 s jäljen alusta (jakso 20 s), kalibroi ensin A-kuvalla.
- KATSO B-KUVA TÄYSIKOOSSA ENNEN LUPAA: Mac-12:n luvut läpäisivät kaiken. Origon siirto ajon aikana kallistaa nähtävyydet ja sillat ja vie puut; palautus korjaa, syy selvittämättä.
- LUPA VOI VANHETA: omistajan päätös tuli tunnin sisällä luvasta. Peru heti, kerro PT:lle. Korjaa ajopyynnön otsikko samalla: JU luki vanhentuneen "vain NS:n luvalla" -rivin.
- Mittari: ruutujen sisällön ero on samaa luokkaa kuin odotettu lasku (vasen sarake 0,18–0,21 px muita suurempi); ruuduittain ensin. Kartan mittaus y 384–752, y 300–450:ssa kylttejä. Eräajo ohittaa kuvasarjat, Macilla ei kuvajäännöstä; automaattista piirtoa ei ole, joten piirtoon sidottu mittari koestetaan laitteella.
- Unity (x, y, z) = ECEF (X, Z, Y) TrueOriginissa; origolla Pariisissa (itä, ylös, pohjoinen). Tarkista float-tarkka-ero ≤ puoliaskel. Sarjan kuvat laitteelta ylösalaisin; Mac --ei-kaanto. veto 0.1 0 = länteen, veto 0 0.1 = etelään; vedon alussa kääntyminen 1,5 s.
- Tyyppitarkistus: O/tyyppitarkistus-tyopuu.zsh, S omaan scratchpadiin; V/tyyppitarkistus.zsh kääntää vanhan kopion.
- Älä usko komentojen laskuja tai katkeamissyytä ilman konsolia: grep "muistivahti: VIKA" ensin. Muisti vain samasta vaiheesta muistivahti.log:sta. palikkakoe.jsonl kertyy: viimeiset rivit. "Heti perään" -komennot vaativat kuittauksen; keskeytysehdossa täsmärivi. Talot latautuvat aloituksessa 6 km:stä: puhdas muisti vaatii tyhjän indeksin, talot 0 ei riitä.
- Mittarissa suurinP95Ero ei yksin riitä: kerro myös ruudun P95 ja kuvamäärä. Lue RP-asset ennen lupausta. Mittaa kaikki veden lähteet ennen syyn nimeämistä. Älä lupaa kärkeä, jos korjaus on tulossa.
- OpenFreeMapin robots.txt = 403: ei hakuja. Robots aina ensin omassa komennossaan. Luovutus voittaa Postivahdin aloitusviestin.
- LAITTEEN KANSIOT EIVÄT TYHJENE: palikat sarja kirjoittaa kehysnumeronimillä samaan kansioon, joten uusinta samalla nimellä sekoittaa vanhat kuvat (47-67 kuvaa). Rajaa ero-CSV:n kehysnumeroilla (f0-1...f1) ja tarkista listauksen ajat: O/analysoi-ipad5.py. hae_sarjan "n/n" ei paljasta tätä. palikkakoe.jsonl kertyy myös: rajaa aika.
- Laite kirjoittaa desimaalit pilkulla, Mac pisteellä. Skriptin odotusrivissä vain tunnus, ei lukuja; tarkista muut samanlaiset odotukset ennen laiteajoa.
- ODOTUS VOI OLLA VÄÄRIN: lukittu 9-13 % perustui vain kameran paikkaan; mitattu noin 80 %. Tarkista ruuduittain ennen kuin uskot isoa lukua (O/hyppy2-ruuduittain.py), ja katso reitit jäljestä: suuntima ja lat/lon paljastivat, etteivät vedot olleet sama reitti.
