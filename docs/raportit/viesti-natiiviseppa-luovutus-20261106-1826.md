# Natiivisepän luovutus 6.11.2026 klo 18.26 (tilinvaihto, PT 18.2x; omistaja 18.23)

KORVAA KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Tilin vaihduttua ensin docs/tilinvaihto.md; session id osoitekirjasta.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Etäyhteyteen ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, V = P/valmis-jalki2, L = /Users/Shared/Claude/proto-3d/lokit. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka, haara natiiviseppa/origo-koe d907286cb, peili natiivi-backup. P:n skriptit ovat haaran ulkopuolella.

## Tila 18.25
- Ei omia ajoja käynnissä. EI UUSIA AJOJA tilinvaihdon aikana (PT).
- IPAD 5 d907286cb EI OLE ALKANUT: L/natiiviseppa-origo-ipad5-d907286cb puuttuu. Ajopyyntö O/ajopyynto-ipad-5.md. JU kysyi multa lupaa ja ilmoitti, ettei aja ilman sitä. En antanut, koska lupa on PT:n; pyysin PT:tä kuittaamaan JU:lle. PT:n kuittausta en ole nähnyt. Jos ajo jää jumiin, rivi PT:lle, ei lupaa omin päin. Tuloksen osoite on tämän roolin id osoitekirjassa.
- Mac-13 d907286cb kelpaa: O/mac13-tulos.md. Ei esineitä missään jaksossa, kartta ehjä. Nappulan piilotusta ei voinut todentaa Macilla. Koekomento palikat esineet 0|1 piilottaa nähtävyysalueet puineen, ohjelmakohteet (sillat mukana) ja nappulan.
- Mac-12 0f152ced2: origo toimi, mutta B:ssä nähtävyydet ja sillat kallistuivat ja puut puuttuivat mittaruuduissa: O/mac12-tulos.md, O/4b-ruudut.png, O/hyppy2-ruudut.py.
- iPad 3c keskeytyi VIKAan radan alussa ilman korvausta, hintaa ei mitattu: P/selvitys-3c/tulos.md, PT:llä. Ei toimia.
- iPad 4b: float-kameran hyppy on kuvassa, selittää 14–24 %: D/tulos.md, PT:llä ja KK:lla. Laitteella v9-talopalat (351 Mt), 16 palan indeksi (iPad 5 palauttaa tyhjän), palikkasarja-kansiot; JU ei poista kansioita.

## Linjaukset
- OMISTAJA 17.05 (KK): palikoiden iPad-mittaus odottaa, kunnes Pariisi on valmis ja muistia on kevennetty. Ei uusia palikka-ajoja iPadilla eikä kevennystä nyt. Talot ja vahti pysyvät, Macin kuvat jatkuvat. KK 17.08: tämä koskee vain korvauksen mittausta.
- ORIGOKOE (PT 16.5x, KK 17.08): viimeinen kierros. iPad 5 KERRAN LAV:n leivonnan jälkeen, 0 palaa, vahti päällä. Vahdin keskeytys = EI TULOSTA, ei uusintaa. Koe suljetaan tähän ajoon. Ei uutta koekomentoa eikä junaan tai oletukseksi. Tulos KK:lle suoraan ja rivi PT:lle, myös jos "ei tulosta" (omistajalle luvattu). Kyltit-rivi ei muutu; kyltit NUI:lle vain jos tulos sitä muuttaa. KK on jo kertonut 4b:n omistajalle, älä toista.
- Muistivahti pysyy päällä. VIKA on tulos: rivi PT:lle, ei uutta rajausta eikä ajoa ilman vahtia (KK 15.3x). Hinta koskee vain 16 palaa, ei koko Pariisia. "Ei mahdu" ei ole todistettu. Noin 185 Mt selittämättä, EI kirjata taloihin. Laiterajoitusta EI kirjata syyksi ilman todistetta; tärinä auki kameran jälkeen asti. Ei korjauksia koehaaraan ilman sanaa (PT).
- KK 12.42: katot EI NYT. Puiden väri ja suhde kelpaavat (omistaja 14.28). 43 palikkasiltaa jää. v6 ee847e1a0e1788df kokeena, ei junaan.

## SEURAAVA TYÖ, järjestyksessä
1. Odota iPad 5:n tulosta JU:lta. Tarkista "talot: 0 palaa kansiossa", "palikat: esineet pois, kerrokset ok", ja konsolista, että origo-rivi on ennen jälki-riviä. VIKA = EI TULOSTA.
2. Aja V/jalki2.py kaikille 7 jäljelle ja D/hyppy2.py <kansio> r4-a1 r4-a1-t; r4-b r4-b-t --origo 48.8585 2.3586 0; r4-a2 r4-a2-t; eteen-a/eteen-a-t; eteen-b/eteen-b-t --origo …; sivu-*: lisää --alku 20. Kuvat käännetään D/kaanna.py:llä. Katso, onko nappula poissa.
3. Sulje D/origokoe-ehdot.md:n lisäyksen mukaan yhteen: ORIGO AUTTAA, ORIGO EI AUTA, MITTARI EI EROTA KOHINASTA, EI TULOSTA. Älä muuta ehtoja. Mukaan: kallistuvat nähtävyydet ovat toteutuksen este, riski veden ruutujen heikko kuvio. Pätkät A/B V/sarja.py:llä KK:lle, EI omistajalle.
4. Toteutusehdotus vain PT:n pyynnöstä; sano, että jäännöksestä suurin osa jää selittämättä.
5. Kun koe on suljettu, kysy PT:ltä C1 ja D2; ne tarvitsevat iPad-mittauksia, joten omistajan 17.05 pysäyttänee ne. C1: GameObject + LOD Group (ei koodattu) + DOTS-tuki varjostimeen + Keep All + static batching pois + peittokarsinta pois; Forward-kopio pois listalta, RD vaatii Forward+:n. D2: B2 + forceMeshLod vs erilliset verkot. Tutkimus 20261106-rakennuspalikat-tutkimus.md, osa E. Sitten tyhjänä "JONO TYHJÄ: Natiiviseppä" PT:lle.

## Mitattu, pysyvä
- Tärinä: iPad 4 A0, 0 palaa, thermal 0: GPU 13 → 29 ms noin 3 min:n kohdalla, huippu 37, 10 min:n tauon jälkeen 11,6; kolmiot ennallaan; seisova kamera kuvaero 0,000. Syy auki. Muistipiikki t 20 s: 3660 (0 palaa) | 4039 (3b); iPad 3b VIKA 4106 ≥ 4080, huippu 4220. Skriptit P/selvitys-muisti-3b/.
- r3-rata oli viallinen (zoomirajan nosto, 4,15 m/ms): r4 = 60 m/s, pelaajaa ei koske. Pelaajan veto 156–209 m/s lähimmällä zoomilla. Silmä 56 m kartan yllä, alle ND:n tornien.
- Iso iPad on Forward+ (Ultra_Renderer mode 2), muut Forward. iPad 1 r3: B2−A0 +8,34 ms, kolmiot 1,06 → 2,03 milj.
- Näkyvä vesi: Z14 + ND:n pohjakuva; maski P/selvitys-tolpat/nakyva-vesi-alueet-2m.png, poisto poista-vedesta.py. Jos KS muuttaa kanavaa tai ND:n pohjaa: nakyva-vesi.py, alue-vesi.py ja poisto uudelleen. tee-palikat.zsh:n jälkeen poista-omat-sillat.py.

## Kerrottu, ei NS:n työtä
- Pont Neufin vaalea raita KS:n jonoon (KK). Richard-Lenoirin vesi KK:n sanaa odottamassa (P/selvitys-mac10/rajaus-a-arsenal.png). Canopéen välke liikkeessä katsomatta. Kehysaikapiikit auki erikseen.
- NS:n työpuita wt/-kansiossa yli rajan (8/3): kerro PT:lle ennen poistoja.

## Opit
- KATSO B-KUVA TÄYSIKOOSSA ENNEN LUPAA: Mac-12:n luvut läpäisivät kaiken. Origon siirto ajon aikana kallistaa nähtävyydet ja sillat ja vie puut; palautus korjaa, syy selvittämättä.
- LUPA VOI VANHETA: omistajan päätös tuli tunnin sisällä luvasta. Peru heti, kerro PT:lle. Korjaa ajopyynnön otsikko samalla: JU luki vanhentuneen "vain NS:n luvalla" -rivin.
- Mittari: ruutujen sisällön ero on samaa luokkaa kuin odotettu lasku (vasen sarake 0,18–0,21 px muita suurempi); ruuduittain ensin. Kartan mittaus y 384–752, y 300–450:ssa kylttejä. Eräajo ohittaa kuvasarjat, Macilla ei kuvajäännöstä; automaattista piirtoa ei ole, joten piirtoon sidottu mittari koestetaan laitteella.
- Unity (x, y, z) = ECEF (X, Z, Y) TrueOriginissa; origolla Pariisissa (itä, ylös, pohjoinen). Tarkista float-tarkka-ero ≤ puoliaskel. Sarjan kuvat laitteelta ylösalaisin; Mac --ei-kaanto. veto 0.1 0 = länteen, veto 0 0.1 = etelään; vedon alussa kääntyminen 1,5 s.
- Tyyppitarkistus: O/tyyppitarkistus-tyopuu.zsh, S omaan scratchpadiin; V/tyyppitarkistus.zsh kääntää vanhan kopion.
- Älä usko komentojen laskuja tai katkeamissyytä ilman konsolia: grep "muistivahti: VIKA" ensin. Muisti vain samasta vaiheesta muistivahti.log:sta. palikkakoe.jsonl kertyy: viimeiset rivit. "Heti perään" -komennot vaativat kuittauksen; keskeytysehdossa täsmärivi. Talot latautuvat aloituksessa 6 km:stä: puhdas muisti vaatii tyhjän indeksin, talot 0 ei riitä.
- Mittarissa suurinP95Ero ei yksin riitä: kerro myös ruudun P95 ja kuvamäärä. Lue RP-asset ennen lupausta. Mittaa kaikki veden lähteet ennen syyn nimeämistä. Älä lupaa kärkeä, jos korjaus on tulossa.
- OpenFreeMapin robots.txt = 403: ei hakuja. Robots aina ensin omassa komennossaan. Luovutus voittaa Postivahdin aloitusviestin.
