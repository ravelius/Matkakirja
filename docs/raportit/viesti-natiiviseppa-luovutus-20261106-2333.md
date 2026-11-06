# Natiivisepän luovutus 6.11.2026 klo 23.33

KORVAA KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Etäyhteyteen ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, V = P/valmis-jalki2, H = P/selvitys-origo-hinta, L = /Users/Shared/Claude/proto-3d/lokit, A = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/aloitus-tyhjat. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä.
Viestit: mcp__ccd_session_mgmt__send_message session-id:llä.

## YÖN SÄÄNNÖT (OMISTAJA)
- 23.07: kun vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa: kokeen osa pois tai edellinen toimiva tilalle. Sitten rivi KK:lle (vika, mitä kokeiltu, suositus) ja seuraavaan työhön.
- 23.22: yöllä vain Pariisi, Lontoo ja juoksupeli; tukityö vain, kun se palvelee niitä. Muu seis, ei uutta. Jos muuta on auki, rivi PT:lle. PT: Liiku kuuluu Pariisiin.

## ODOTTAA JU:TA, ÄLÄ TILAA UUDELLEEN (kaikki tilattu 23.3x asti)
1. Aloitus-tyhjät g ja h (7d0e0e5a1): L/natiiviseppa-aloitus-tyhjat-g-7d0e0e5a1 ja -h-. Ainoa kaappaus lennon +2 s ja +5 s. Katso: onko tyhjää? Tulos PT:lle.
2. iPad, iso, kylmä välimuisti, 2 ajoa (7d0e0e5a1): pyyntö A/ajopyynto-ipad-kylma.md, JU:lla. KK:N SANA 23.29 omistajan valtuutuksella. Kansiot L/natiiviseppa-aloitus-ipad-kylma-7d0e0e5a1/ajo1, ajo2. Yksi kysymys: NÄKYYKÖ TYHJÄ PALLO VERHON LÄHDÖN JÄLKEEN JA KAUANKO. Lokista "laattapalvelin: KYLMÄ välimuisti" (ilman sitä ajo ei kelpaa), "aloitusverho: pois", laattamittari-rivit, katso kuvat ja tallenne. TULOS KK:LLE KOONTIIN päätöstä varten, tiivis rivi PT:lle. Rajaus kerrotaan: Cesiumin omaa pyyntövälimuistia lippu ei tyhjennä (portti vaihtelee, joten ei luultavasti osu; mittaamatta).
3. Liiku cdcd533ab: skenaario _tyo/natiiviseppa/liiku/sk-liiku-ehdokkaat.txt, kansio L/natiiviseppa-liiku-ehdokkaat-cdcd533ab. PT:n yksi mittaus: miksi ehdokkaat 89 → 81 ja miksi kyltit vaihtavat paikkaa. Katso lokista "mallikyltti: ... sivu a → b" ja vertaa "nimet ehdokkaat" ja "nimet hylatyt" rivit ennen ja jälkeen (diff; syy hylättyjen riviltä). Tee pari l0 | l6 kuten pari-l0-l6.jpg, kyltit täysikoossa; pari PT:lle. Ei ratkea yön säännön rajassa (noin 00.00): rivi KK:lle pari mukana ja seuraavaan. Tyyppitarkistus kattoi vain Kartta-kansion; JU ilmoittaa käännösvirheen.
4. KS:n ajo 36 (0c544d4ef, oleelliset nimet): KS lähettää kansion; KATSO ENSIMMÄISEN AJON KUVAT oletusnäkymästä. Ajon 35 kn-opera-45-kadut.png on otettu kytkimellä nimirajaus 0, joten se ei kerro oletuksesta. Vertailu 12 kpl L/natiiviseppa-oleelliset-nimet-98180b82d. Kartta-välilehden rivi vasta omistajan päätöksellä.

## ALOITUS-TYHJÄT: TULOS (A/tulos.md; PT kuittasi syyn, EI "ei korjausta")
Haara natiiviseppa/aloitus-tyhjat 7d0e0e5a1, peili natiivi-backup, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto. Mittari `pallo laatat tila|vahti|piilota etu|taka|pois`.
- Beige = Pohjapallo (ajo e t01: kaikki laatat piilossa, 228,207,166). Kaaret ja raidat = takapuolen laatat (ajo d näkyvät, e eivät); että ne ovat helmoja, on päätelmä. Musta kiekko kuuluu Pohjapallon piirtoon, syy mittaamatta. Valkoinen = etulaatta ilman rasteria.
- Kesto ilman kaappausta (ajo f): verho lähti t 11,75, viimeksi ilman rasteria t 11,86, 10 etulaattaa t 12,28, 16 t 12,48; enintään noin 0,7 s verhon lähdöstä, häivytys 0,5 s. Lentoa painettiin t 11,41 verhon alla. Laskuri ei näe kokonaan puuttuvaa laattaa.
- k01a ja k01e: kaappaus pysäyttää pelin, laatat saavat kymmenesosan ruuduista.
- Auki: NUI:n ajojen sävy 215,195,157 (6 % tummempi), syy mittaamatta.
- PT 23.28: "0,7 s tyhjää on pelaajalle näkyvä". Skenaariomuutos vain testiin, ei saa peittää vikaa kuvilta. Korjausehdotus iPad-tuloksen jälkeen: verho odottaa katon jälkeen z1-rastereita, rajattuna. Päätös KK:lta.
- Laitelokit lämpimällä: verho lähti aina pallo 100 %. Vanhat *-kylma-* iPad-ajot eivät käyttäneet lippua.

## LIIKU: TILA
Haara natiiviseppa/liiku-nimet-koe cdcd533ab (a7c4d3cf3 + 98180b82d + 0c544d4ef poimittuina + kyltti), peili natiivi-backup, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto-koe. Koe voimassa, EI valmis (PT). Ajossa 33675ffe2 nimiä 28 ennen, 23 paluun jälkeen, ei tasoitu 60 s:ssa; puuttuu town 3 (Levallois-Perret), joki 1, nähtävyys 1. Pari L/natiiviseppa-liiku-nimitaso-pitka-33675ffe2/pari-l0-l6.jpg.
KYLTIN SYY KOODISTA (UI/MalliKyltit.cs): sivu on historiasta riippuva "edellinen sivu ensin"; Eiffel oikea → alla, Louvre alla → oikea. cdcd533ab muistaa sivut Liikun alussa ja tarjoaa niitä ensin paluun ajan. Mittaamatta, kunnes kohta 3 on katsottu.
PIDÄ liiku-lento AJAN TASALLA natiivi-ui/aloituslento-kuvat-219:n kanssa; kärki 23.1x 356eb0101.

## Valmiit, odottavat muita
- OSM-skriptit (PT): marais/ ja pariisi-talot/hae-osm.mjs sekä palikkakoe/hae-palikat.mjs lukevat T7:n planeettaa; PT:lle kerrottu, ei sha:ta, ei ajettu.
- MERI: älä korjaa, menee VS:lle PT:n kautta. C1 ja D2 odottavat omistajaa, älä kysy uudelleen. Tärinä: omistaja perui 21.30.
- Havainto, ei vielä kerrottu: k02-kuvassa (nui-aloitus-kk) koneen alla tumma neliö merellä. Syy tuntematon.
- Työpuita wt/-kansiossa yli rajan: kerro PT:lle ennen poistoja. proto-natiiviseppa-kierto = aloitus-tyhjat, -kierto-koe = liiku.
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
- KAAPPAUS VÄÄRISTÄÄ KESTON: joka kuva pysäyttää pelin 2-4 s. Kesto mitataan ajolla, jossa ei ole kuvia, ja kuva erikseen omana ensimmäisenä kaappauksenaan. Ruutunumero kamera-riveiltä paljastaa nälän.
- TESTIKOMENTO VOI PAINAA VERHON ALLA: `ui aloita` ohittaa aloitusnäkymän. Verho estää oikeat napautukset (koodista).
- VIRALLINEN VALMIS-ARVIO KUULUU VASTAANOTTAJALLE: PT ei hyväksynyt "ei korjausta" 0,7 s:lle. Kerro kesto ja kysy; älä esitä päätöstä tehtynä.
- Varmista aina, millä kytkimellä vertailukuva otettiin (nimirajaus), ennen kuin luet oletuksesta.
