# Natiivisepän luovutus 7.11.2026 klo 10.0x

KORVAA KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364.
Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Etäyhteyteen ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, V = P/valmis-jalki2, H = P/selvitys-origo-hinta, L = /Users/Shared/Claude/proto-3d/lokit, A = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/aloitus-tyhjat, T = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/lontoo-kamera. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä.
Viestit: mcp__ccd_session_mgmt__send_message session-id:llä. Vahdit: find, ei zsh-globia (ei osumaa kaataa vahdin). Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto; työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, etä natiivi-backup.

## TYÖ NYT (OMISTAJA 09.49, TF 219, PT): "Lontoo zoomautuu ulos koko kartalle esittelyn jälkeen vaikka ei pitäisi. Iphonella ainakin pitäisi saada zoomata paljon lähemmäs". Koe, ei junaan, ajot JU:n vuorolla. Kaikki T/tulos.md.

### 1. Lontoon kamera
Syy: ElavaKartta.Saavu → maan saapumiskohtaus → Odota kutsuu AjaSaapumisnakymaan, kun kartta on hiljaa. Pariisi suljettu pois omistajan 5.11. 14.29 linjauksella. Koe 8d8842ce6 (natiiviseppa/lontoo-kamera-jaa, pohja TF 219:n Lontoo e48424a75) sulkee Lontoon. Muiden kaupunkien kamera ei muutu ilman omistajan sanaa (PT).
Ajo 1 (L/natiiviseppa-lontoo-jaa-8d8842ce6): rivi "elävä: lontoo: ei maan saapumiskohtausta", kuvat kaupungissa, MUTTA kortti oli auki koko ajan ja kuvat tavulleen samat, joten se ei koestanut kortin jälkeistä hetkeä. PT:lle oikaistu.
Kaksi ajoa vielä:
a) Mac, tilattu JU:lta: T/sk-lontoo-jaa-2.txt, loki L/natiiviseppa-lontoo-jaa2-8d8842ce6 (ui matkakirja pieni, kuvat lk-*). Verrokki pelikoodari-lontoo-d7: "hiljaa 78.0 s:n jälkeen: soi".
b) ISO IPAD, EI VIELÄ TILATTU, TEE TÄMÄ ENSIN (PT): omistajan vika tuli TF:ssä "esittelyn jälkeen", joten Lontoon esittely alusta loppuun ja sen jälkeen 180 s, kerran. Komennot SELVITTÄMÄTTÄ: mallina _tyo/natiivi-ui/sk-aloitus-jumi-vertailu.txt (oleta 40 peli: sisältö; ui aloita pariisi lento; oleta 240 zoomaus alkaa ...; traileririvit), Lontoossa aloituskoodi on PeliKomennot.cs:326 "aloita" ja PeliOhjain.Aloitusintro.cs; varmista kohdeparametri ja esittelyn loppurivi ennen tilausta. Työkalu /Users/Shared/Claude/julkaisija-tyokalut/ipad-skenaario.zsh, launch vain lukolla. Sen jälkeen rivi KK:lle ja PT:lle. Junaa ei vielä.

### 2. iPhonen lähizoomi
Koe dd3a2e10f (natiiviseppa/iphone-lahizoomi, 8d8842ce6:n päällä): PalloKierto.LahizoomiKoe 3, puhelin tunnistetaan myös vaakatasossa, komento lahizoomi k. Lähin leveys noin 0,7 km (ennen 2,09 km vaaka, 1,39 km pysty). Laskettu lähin korkeus: iPhone vaaka noin 345 m, pysty noin 1620 m, iPad lahizoomi 3 noin 560 m (nyt noin 1680 m). Ei ole vielä käännetty; tyyppitarkistuksen 3 CS0234-virhettä PalloKierto.cs:n riveillä 15-17 (vanhat kirjastot, kirjastosyy päätelty).
JU:lla jonossa T/ajopyynto-lahizoomi.md: 4 Mac-ajoa (L/natiiviseppa-lahizoomi-mac-*) ja 2 iPad-ajoa (L/natiiviseppa-lahizoomi-ipad/lz1, lz3), iPad-ajot KS:n talot-säteen jälkeen. Vahti ei siirry: viritä uudelleen (find).
Kun valmis: vertaa lz1/lz3 täysikoossa (sumeneeko kartta z17:n jälkeen, tyhjä), muisti muistivahti.log:sta, merkintä "iPad, ei iPhone"; iPhonen muistia ei väitetä. Tulos PT:lle. Kuvat KS:lle, korkeus ja kallistus kuvan mukaan, erityisesti matala kallistettu.
iPhone on "unavailable"; kytkentä PT:n ja KK:n kautta vasta kokeen jälkeen, ei omistajalta suoraan.
KS: rajat sovittu: NS PalloKierto, KS talojen säde (karttaseppa/talot-sade 3a6402848, komento talot sade min max). NS ei koske TaloAlueeseen eikä TaloKerrokseen.

## TÄNÄÄN VALMIS, EI TOISTETA
- Ajo 43 toisena silmänä ja syyselvitys: _tyo/natiiviseppa/ajo43/tulos.md. Kamera ja horisontti kunnossa. Talojen raja = UlkoSade-ympyrä katsepisteen ympärillä. usva-85:n viivat ei selvinnyt. Meri aamun koonnissa, ei NS:n työ.
- Unity-julkaisut 7.11. 09.34: ei uutta.

## SUMEA ALUE PARIISIN EDESSÄ: KAKSI YRITYSTÄ TÄYNNÄ, EI RATKENNUT, AAMUN KYSYMYS KK:LLA
Tulos A/z10-tulos.md, kuva L/natiiviseppa-z10-ipad2/kolmikko.png (pois, Z10, latausrajat; kello 08.27, 08.26, 08.26). Z10 b00d2a1f5 ei junaan: sama suorakaide, laattoja 251 → 406. Latausrajat (maasto lataus 200 40 40): huonompi, ei teitä; komento rakentaa pallon uudelleen, joten syy ei erotu. Päätelmä, ei mitattu: Cesium ei vaihda tasoa ajoissa, sillä sumea tulee myös lähes valmiista välimuistista (nelio-2). Kestoa pelaajalle ei ole mitattu; suositus KK:lle: se ensin. Ei yrityksiä ilman uutta sanaa. Neliö iPadilla ei mitattu; meri seis yöllä.
Lontoo d8-sp (PT): Z10 ei kata, ajo on Mac-esikatselu ilman aloituslentoa; kerrottu, ei omaa työtä.

## KAMERAESTE (PT 02.2x, KK 02.20): EI KUITATTU, JÄÄ OMALLE HAARALLEEN, AAMUN KYSYMYS
KK:N PÄÄTÖS OMISTAJAN VALTUUTUKSELLA 03.13: ea5823b4f ei yhteiseen kokeeseen eikä junaan. KK katsoi kuusi ruutua muut85:stä (3,6–6,8 s): läpimeno on poissa, mutta noussut näkymä näyttää huonommalta kuin läpimeno: hyppy 147 → 966 m, korkealta isoja beigejä aukkoja ja raidallisia reunoja, iPadilla katsomatta. Välkettä ei selvitetä yöllä. PT oikaisi 03.2x:n kuittauksensa: koetta ei ole kuitattu.
Tulos _tyo/natiiviseppa/liiku/kameraeste-tulos.md. Haara natiiviseppa/kamera-este ea5823b4f (natiivi-backup, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto-koe, pohja natiivi-ui/kyltit-liike 29bea235c). Kartta/Kameraesteet.cs + PalloKierto.LaskeAsento: silmä nousee mallin yli, katsepiste pysyy; komento kameraeste 0|1; loki "kameraeste: nousu". Testit sh Kartta-testit/kaanna.sh Kameraesteet 10/10.
Mitattu Macilla: ajo ja veto matalin 965 m rajan sisällä (ennen 180 m); kierto ja zoomi ajossa 84d1b67da 966 m, rungolla ea5823b4f ei todennettu. Seisova 85° tornin juureen ei muutu. Sk _tyo/natiiviseppa/liiku/sk-kameraeste-85.txt. Mittaus: kamera.txt:n sarakkeet ruutu, aika, X, Z, Y (ECEF), Eiffelin keskus 48.858258, 2.294467, raja 292 m.
AUKI: taivas välkkyy noston aikana vedossa (muut85 ruudut 222-261, kirkkaus 217 ↔ 189 ilman korkeuden muutosta). Syy auki; hypoteesi: Aurinko.cs:n sumu lukee kierto.korkeus-arvoa. Ei jatketa ilman sanaa (30 min täynnä). Koskee vain Nähtävyysalueen malleja. iPadilla ei ajettu.

## KARSI VALMIS KOKEENA (PT kuittasi raportin perusteella, kuvat katsomatta PT:ltä; seuraava PT voi katsoa)
a739dc0a1 mitattu 7fd402eee:llä, Mac. _tyo/natiiviseppa/liiku/karsi-tulos.md, kuvat L/natiiviseppa-karsi-7fd402eee/pari-l0-l6.jpg ja pari-k0-k1.jpg. Oletus: 2 karsintaa / 150 s (ennen 70), ehdokkaat 108/108/108, kuvaero 0,11 %. Kadut päällä 1672/1672, 72 vaihtui, kuvaero 2,7 %, ei aukkoa kuvassa. Raportissa PT:lle lukee "vaihtui reunalla": se on liian varma, vaihtuneissa on myös katuja ja kaupunginosia keskemmältä; korjaa, jos asia nousee.
Liiku-nappi: PT: ei korjausta, napautus sormella laitekierroksella. Tulkinta testikomennon jäljeksi (Pick-välimuisti, muistista, tarkistamatta).

## VALMIS TÄNÄ YÖNÄ (ei toisteta)
- ALOITUKSEN BEIGE: KK:N PÄÄTÖS OMISTAJAN VALTUUTUKSELLA 23.50: EI KORJAUSTA PELIIN, VERHO-EHDOTUS POIS. Syy mitattu: Macin esikatselusta puuttuu laattapaketti; 7b6caba3a (haara natiiviseppa/aloitus-paketti, vain koe) beige 13,4 % → 0,1 %. iPad kylmä: verho 3,7 s, pallo 100 %, lennolla ei aukkoja lokissa (ei kuvaa pallosta). Kaikki A/tulos.md, KK ja PT tietävät. Peiton notkahdus Macilla ei näy beigenä; meren suorareunaiset sävypalat (ajot i, j; k02) ovat erillinen asia, VS PT:n kautta.
- KYLTIT: PT kuittasi parista (cdcd533ab, L/natiiviseppa-liiku-ehdokkaat-cdcd533ab/pari-l0-l6.jpg). Yksi ajo. Tiedot _tyo/natiiviseppa/liiku/ehdokkaat-tulos.md. cdcd533ab on koe, ei valmis.
- KS 36 (217a40fb6, 0c544d4ef): Opéra, Eiffel, Montparnasse katsottu oletuksella, kaupunginosia ja pieniä vesiä ei näy; KK tietää. Kartta-välilehden rivi vasta omistajan päätöksellä.
- Nappi palasi kerronnan jälkeen ajossa 89d0b58ca. Ajon cdcd533ab piilossa pysyminen: komento `ui liiku` ohitti näkyvyyden.
- PIDÄ liiku-lento AJAN TASALLA natiivi-ui/aloituslento-kuvat-219:n kanssa.

## Valmiit, odottavat muita
- OSM-skriptit (PT): marais/ ja pariisi-talot/hae-osm.mjs sekä palikkakoe/hae-palikat.mjs lukevat T7:n planeettaa; PT:lle kerrottu, ei sha:ta, ei ajettu.
- MERI: älä korjaa, menee VS:lle PT:n kautta. C1 ja D2 odottavat omistajaa, älä kysy uudelleen. Tärinä: omistaja perui 21.30.
- Työpuita wt/-kansiossa yli rajan: kerro PT:lle ennen poistoja. proto-natiiviseppa-kierto = aloitus-tyhjat, -kierto-koe = liiku.
- Jonon jälkeen: "JONO TYHJÄ: Natiiviseppä" PT:lle.

## Mitattu, pysyvä
- Tärinä: iPad 4 A0, 0 palaa, thermal 0: GPU 13 → 29 ms noin 3 min:n kohdalla, huippu 37, 10 min:n tauon jälkeen 11,6; kolmiot ennallaan; seisova kamera kuvaero 0,000. Syy auki. Muistipiikki t 20 s: 3660 (0 palaa) | 4039 (3b); iPad 3b VIKA 4106 ≥ 4080, huippu 4220. Skriptit P/selvitys-muisti-3b/.
- r3-rata oli viallinen (zoomirajan nosto, 4,15 m/ms): r4 = 60 m/s, pelaajaa ei koske. Pelaajan veto 156–209 m/s lähimmällä zoomilla. Silmä 56 m kartan yllä, alle ND:n tornien.
- Iso iPad on Forward+ (Ultra_Renderer mode 2), muut Forward. iPad 1 r3: B2−A0 +8,34 ms, kolmiot 1,06 → 2,03 milj.
- Näkyvä vesi: Z14 + ND:n pohjakuva; maski P/selvitys-tolpat/nakyva-vesi-alueet-2m.png, poisto poista-vedesta.py. Jos KS muuttaa kanavaa tai ND:n pohjaa: nakyva-vesi.py, alue-vesi.py ja poisto uudelleen. tee-palikat.zsh:n jälkeen poista-omat-sillat.py.

## Kerrottu, ei NS:n työtä
- LÖYDÖS (PT 19.2x: kirjataan, ei selvitystä nyt): jos pelaaja on kääntänyt karttaa, veto kortin sulkeutuessa voi kääntää kartan pohjoiseen vedon aikana (elävän saapumisen PalautaPohjoinen jatkuu, vaikka veto katkaisee ajon). iPad 5 sivu-a; pelaajan kulkuna koestamatta.
- Pont Neufin vaalea raita KS:n jonoon (KK). Richard-Lenoirin vesi KK:n sanaa odottamassa (P/selvitys-mac10/rajaus-a-arsenal.png). Kehysaikapiikit auki erikseen.
- NS:n työpuita wt/-kansiossa yli rajan (8/3): kerro PT:lle ennen poistoja.

## Opit
- KIINTEÄ VIIVE RIVILTÄ, JONKA JÄLKEEN ODOTUS VAIHTELEE, SIIRTÄÄ KUVAN KOHTAA: Z10-pari tuli kohdista 08.26 ja 08.04. Laske viive riviltä "lento v3: odotus" ja tarkista kello kuvasta ennen vertailua.
- VERTAA VALMIIN VÄLIMUISTIN AJOA: nelio-2 oli 3420/171 välimuistista ja silti sumea; tämä olisi kertonut esilatauksen hyödyn ennen ajoa. Lue välimuisti/verkko-luku verrokista ensin.
- VIDEON SUURIN PYSTYASKEL JA TAIVAAN KIRKKAUS RUUDUITTAIN paljastavat hypyt ja välkkeen, joita harvat kuvat eivät näytä; mittaa ne ennen hyväksyntää.
- SAMA PISTE TESTINAPAUTUKSESSA: ui napauta samaan pisteeseen voi mennä ohi oikean sulkemisen jälkeen, vaikka toinen piste samalla hetkellä osuu. Vaihda piste ennen kuin nimeät pelin viaksi.
- PIILOSSA OLEVA VOI TÄYTTÄÄ RAJAN: tarkista rivien luokat ennen kuin korjaat karsinnan järjestystä.
- LOKIN ENSIMMÄINEN OTTEEN JÄRJESTYS: tarkista esikatselun lokista, tuliko napautus ennen vai jälkeen kerrontaa; oleta-ehto voi täyttyä heti, jos rivi on jo lokissa. oleta-uusi vain uusille.
- MAC-ESIKATSELUSTA PUUTTUU LAATTAPAKETTI: aloituslennon kuvat Macilla eivät kerro pelaajan näkymästä.
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
- LASKURI VOI OLLA SOKEA: "ilman rasteria 0" ei kerro, että laatat ovat olemassa. Valmis-väite vasta, kun kuva samalta hetkeltä on katsottu ilman aiempaa kaappausta.
- KUVAT TAVULLEEN SAMAT: tarkista, koestiko ajo tilannetta lainkaan (kortti auki esti kohtauksen vanhassakin koodissa). Ennen "toimii"-sanaa koesta sama tila kuin verrokissa.
- zsh-glob ilman osumaa kaataa vahdin heti: find.
