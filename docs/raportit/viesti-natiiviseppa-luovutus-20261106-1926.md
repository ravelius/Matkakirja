# Natiivisepän luovutus 6.11.2026 klo 19.26, päivitetty 19.38 (Mac-14 valmis, lepo, odottaa KK:n sanaa)

KORVAA KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. Session id osoitekirjasta; PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Etäyhteyteen ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, V = P/valmis-jalki2, H = P/selvitys-origo-hinta, L = /Users/Shared/Claude/proto-3d/lokit. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka, haara natiiviseppa/origo-koe d907286cb, peili natiivi-backup. P:n skriptit ja tulokset ovat haaran ulkopuolella.

## Tila 19.38
- LEPO (PT 19.37). Mac-14 valmis, tulos H/mac14-tulos.md, kuvat H/mac14-kuvat. Ei ajoja käynnissä. Työpuuhun ei tehty muutoksia.
- Mac-14: esineet poistettuna ennen origon siirtoa ja luotuna sen jälkeen pystyssä ja paikoillaan (0 px, Pantheon 1 px). Vain seisova kamera, Mac. b:ssä kadunnimet katoavat ja 3 valokuvamerkkiä lisää, syy auki; kartan pohja sama (PT katsonut p-luxembourg.png:n), b:n kartta noin 0,4 px eri kohdassa. JU:n ja PT:n väri- ja tasohavainnot eivät toteutuneet täysikoossa. iPad 5 r4:n tulos pysyy.
- Korjattu raporttiin: Nimikerros ei ole varmasti kunnossa origolla (selvitys-tulos.md).
- MAC-SELVITYS VALMIS ILMAN AJOJA, kerrottu PT:lle ja KK:lle 19.25. Raportti H/selvitys-tulos.md, kuva H/m-b-ennuste-vanha-asento.png, työkalut H/projisoi-kallistus.py ja H/kartoita.py, kartoitus H/kartoitus.txt.
- Kallistus: OhjelmaKohteet saa paikan uudelleen (PaivitaMaa), asento jää vanhaksi (LuoSeuraava), 41,1° itään. Mitattu projisoimalla, silmämääräinen päällekkäisyys, ei pikselilukuja.
- Katoaminen: Nahtavyysalue (ankkuri, perus kerran LuoOsat) jää noin 6 400 km pois. Todisteet koodi ja kuvat, ei ajonaikaista lukemaa. Korjaus: Mac-12:ssa Louvre ja Notre-Dame puuttuvat, eivät kallistu.
- Pohjoiskäännös EI ole origo: veto → KartanLiike pienentää kortin → elävä "hiljaa ... soi" → saapuminen FRA → PalautaPohjoinen; veto katkaisee ajon, kääntö jatkuu. iPad 5 konsoli 1967-1990, Mac-12 unity.log 2947 ja 3043. Este poistui.
- Hinta: 317 kutsua, 88 tiedostoa, 12 kuuntelee changed. Ratkaisee, siirtyykö origo esineiden ollessa ladattuina. Siirtoikkunan kehys enintään 83 ms ja 51 ms iPadilla, yläraja. Järjestelmien luokittelu osin vain metodinimestä (M raportissa).
- Tärinä rakennusten kohdalla todentamatta. Ehdotus raportissa: esineet 0 → origo → esineet 1, koodimuutosta ei tarvita, ei kokeiltu. Ensin Mac 3 kuvaa, sitten iPad. iPadia EI ajeta ilman sanaa; Mac-tarkistuksen PT antoi (seuraava työ 1).

## Toteutuksen esteet, ei korjattu
- OhjelmaKohteet ja Nahtavyysalue sekä H/selvitys-tulos.md:n taulukon muut järjestelmät eivät seuraa origon siirtoa ajon aikana.
- Koekomento ei ole toteutus. Ei junaan eikä oletukseksi.

## Linjaukset
- OMISTAJA 17.05 (KK): palikoiden iPad-mittaus odottaa, kunnes Pariisi on valmis ja muistia on kevennetty. Ei uusia palikka-ajoja iPadilla eikä kevennystä nyt. Talot ja vahti pysyvät, Macin kuvat jatkuvat. KK 17.08: tämä koskee vain korvauksen mittausta.
- Muistivahti pysyy päällä. VIKA on tulos: rivi PT:lle, ei uutta rajausta eikä ajoa ilman vahtia (KK 15.3x). Hinta koskee vain 16 palaa, ei koko Pariisia. "Ei mahdu" ei ole todistettu. Noin 185 Mt selittämättä, EI kirjata taloihin. Laiterajoitusta EI kirjata syyksi ilman todistetta; tärinä auki kameran jälkeen asti. Ei korjauksia koehaaraan ilman sanaa (PT).
- Kyltit-rivi ei muutu; kyltit NUI:lle vain, jos tulos sitä muuttaa (ei ole muuttanut).
- KK 12.42: katot EI NYT. Puiden väri ja suhde kelpaavat (omistaja 14.28). 43 palikkasiltaa jää. v6 ee847e1a0e1788df kokeena, ei junaan.

## SEURAAVA TYÖ, järjestyksessä
1. ODOTA KK:N SANAA (PT 19.37): PT kysyi KK:lta yhtä iPad-ajoa rakennusten tärinästä. ÄLÄ PYYDÄ AJOA ennen sanaa. Ajoehdotus selvitys-tulos.md luku 4: esineet 0 → origo → esineet 1, r4 A1, B, A2, muistivahti päällä, 0 palaa. Float-pyöristyshypoteesia EI jatketa (PT 19.37).
2. C1 ja D2 ODOTTAVAT (PT 19.1x): ne vaativat palikka-ajoja iPadilla, ja mittaus uusitaan, kun Pariisi on valmis ja muistia on kevennetty (omistaja 17.05). Älä kysy niitä uudelleen. C1: GameObject + LOD Group (ei koodattu) + DOTS-tuki varjostimeen + Keep All + static batching pois + peittokarsinta pois; Forward-kopio pois listalta, RD vaatii Forward+:n. D2: B2 + forceMeshLod vs erilliset verkot. Tutkimus 20261106-rakennuspalikat-tutkimus.md, osa E.
3. Origokoe pysyy suljettuna: ei uusia origo-ajoja iPadilla ilman kohdan 1 sanaa.
4. "JONO TYHJÄ: Natiiviseppä" lähetetty PT:lle 19.33.

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
