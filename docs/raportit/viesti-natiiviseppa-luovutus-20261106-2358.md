# Natiivisepän luovutus 6.11.2026 klo 23.58

KORVAA KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Etäyhteyteen ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, V = P/valmis-jalki2, H = P/selvitys-origo-hinta, L = /Users/Shared/Claude/proto-3d/lokit, A = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/aloitus-tyhjat. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä.
Viestit: mcp__ccd_session_mgmt__send_message session-id:llä.

## YÖN SÄÄNNÖT (OMISTAJA)
- 23.07: kun vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa: kokeen osa pois tai edellinen toimiva tilalle. Sitten rivi KK:lle (vika, mitä kokeiltu, suositus) ja seuraavaan työhön.
- 23.22: yöllä vain Pariisi, Lontoo ja juoksupeli; tukityö vain, kun se palvelee niitä. Muu seis, ei uutta. Jos muuta on auki, rivi PT:lle. PT: Liiku kuuluu Pariisiin.

## TYÖ NYT: KARSI (PT 23.58, SANA: KORJAA, KOKEENA, EI JUNAAN). Yön raja: kaksi yritystä tai noin 30 min (alkoi 23.58), sitten rivi PT:lle (vika, kokeiltu, suositus).
Tavoite: seisovalla kameralla ei karsita kierroksittain, ja Liikun paluun jälkeen samat nimet ovat näkyvissä. Mittari: karsintoja 150 s:ssa ("nimet: karsittu"), nimet ennen ja jälkeen Liikun, kuva samasta kohdasta. SELVITÄ ENSIN, MIKSI RAJA TÄYTTYY ILMAN LIIKUA. Älä osu NUI:n nimiriviin c8a71c1cd (natiivi-ui/kartta-nimirivi: Sisaltokerrokset.cs, SisaltokerroksetSilta.cs, Linssivalitsin.Kartta.cs, UiKomennot, UiPalvelut) etkä nimioletukseen 0c544d4ef.
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto-koe, haara natiiviseppa/liiku-nimet-koe, kärki 89d0b58ca (lokirivi Karsissa), peili natiivi-backup. Tyyppitarkistus: kopioi O/tyyppitarkistus-tyopuu.zsh omaan scratchpadiin, korvaa rivit W= ja S=. Ajot JU:lta. Skenaario-pohja _tyo/natiiviseppa/liiku/sk-liiku-nappi2.txt tai sk-liiku-ehdokkaat.txt.
MITATTU ajossa L/natiiviseppa-liiku-nappi-89d0b58ca: 70 karsintaa 150 s:ssa, joka kerta noin 1000-1200 riviä, eläviä 3000 / raja 4000 (ElavaEnintaan), alkaa ennen ensimmäistä kerrontaa, ei vaadi Liikua; kaupungissa rajakulma 0,0-0,1° alapisteestä, Liikun aikana 1,5-5,7°. Kartta/Nimikerros.cs: Karsi ja LisaaElavat; ElavaNimet.Unohda.
HYPOTEESI, MITTAAMATTA: elävät kadut täyttävät rajan (Elavia laskee vain LisaaElavat-rivit, merkittävät eivät; kadut ovat rivejä, vaikka kerros on pois: syy "kerros"). Karsi poistaa kaukaisimmat luokasta riippumatta, myös näkyvät; Unohda vapauttaa niiden nimet ja palat; ElavaNimetLahelta (z Ensimmainen-DataMax, säde 2) hakee ne heti uudelleen = kierre. Ajon ehdokkaat-cdcd533ab kadonneet nimet (Bastille, Le Kremlin-Bicêtre, Rotonde de la Villette ym.) ovat yli 5 km alapisteestä, mikä sopii tähän.
ENSIN: lisää Karsi-riville poistetut ja jäljellä olevat luokittain (kadut / muut), tai laske koodista ja lokista ilman ajoa, ja vahvista kumpi täyttää rajan.
SUUNTA, JOS VAHVISTUU: (1) kerroksella piilossa olevat karsitaan ensin; (2) piilossa olevien karsinta ei vapauta nimiä eikä paloja, joten ne eivät tule takaisin; kun kerros kytketään päälle (c8a71c1cd:n rivi), ne on saatava takaisin: lue rajapinta, älä muuta NUI:n tiedostoja; (3) ikkunan sisällä olevia paloja ei vapauteta. Varo: jos kadut ovat päällä ja ikkuna ylittyy, ikkunaan jääneet nimet eivät saa kadota pysyvästi panoroitaessa; koeta kytkimellä nimirajaus 0.

## ODOTTAA JU:TA, ÄLÄ TILAA UUDELLEEN
Liiku-nappi2 89d0b58ca: L/natiiviseppa-liiku-nappi2-89d0b58ca, 2 kuvaa, JU kuittaa. Katso "napauta (690, 980)" -rivit ja "ui puu mk-liiku". Ajossa nappi napautus 3 sai 7 s perumisen jälkeen "ei osumaa UI:ssa → pallolle", vaikka Liiku näkyy kuvassa n3 (napautukset 1 ja 2 osuivat). PT: jos napautus ei oikeasti osu näkyvään nappiin, se on oma vikansa ja menee samaan raporttiin Karsin kanssa. Syy auki (koodista: Pick palaa null; VaistaLiiku on ainoa pickingMode-muutos Matkavalinnassa, Kartuscha.AukiMuuttui ajaa sen; tarkistamatta). Napautusta ennen kerrontaa ei saatu testattua: kerronta alkoi kortin alla ennen ui sulje -komentoa.

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
- Pont Neufin vaalea raita KS:n jonoon (KK). Richard-Lenoirin vesi KK:n sanaa odottamassa (P/selvitys-mac10/rajaus-a-arsenal.png). Canopéen välke liikkeessä katsomatta. Kehysaikapiikit auki erikseen.
- NS:n työpuita wt/-kansiossa yli rajan (8/3): kerro PT:lle ennen poistoja.

## Opit
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
