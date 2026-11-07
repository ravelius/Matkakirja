# Natiivisepän luovutus 7.11.2026 klo 20.36

 KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364.
Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Etäyhteyteen ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, V = P/valmis-jalki2, H = P/selvitys-origo-hinta, L = /Users/Shared/Claude/proto-3d/lokit, A = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/aloitus-tyhjat, T = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/lontoo-kamera. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä.
Viestit: mcp__ccd_session_mgmt__send_message session-id:llä. Vahdit: find, ei zsh-globia (ei osumaa kaataa vahdin). Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto; työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, etä natiivi-backup.

## TYÖ NYT 1: PARIISIN MUISTI, ETUSIJA (omistaja 19.43, 19.45, 19.51; PT; ei junaan; EI UUSIA MUISTITÖITÄ ennen KK:n kortteja, PT 20.2x)
LUE _tyo/natiiviseppa/pariisi-muisti/tulos.md KOKONAAN, erityisesti "PT 19.5x", "PT 20.2x" ja "20.3x". Toista syvyyttä ei kevennetä (PT): syvyysvahti-kohta pois tuloksesta; kevennyksestä jää napakalotit -106 Mt.
Ajo 1 valmis (f1c6111a8): lokit/natiiviseppa-pariisi-muisti-1, 8 kuvaa, OK huippu 4037. KUVAT KATSOMATTA. Ajo 0 ei kelvannut (kytkin latasi kalotit: 4313, PT tietää). Uusinta JU:lla vyö-sarjan jälkeen: a04bdb753 (haara natiiviseppa/pariisi-muisti, natiivi-backup, kytkin napat-pois.txt), ajopyynto-ipad-0b.md, ajo.zsh, vahti pois vain siinä; vanha loki -0-vahti. Älä tilaa uudelleen. JU kuittaa NS:lle; viritä find-vahti pm-0-paluu.png:lle.
LISÄEHDOT tulos.md lopussa "PT 20.3x", LUE: ajon 1 kuvat täysikoossa ennen tulosta (voi tehdä heti), todiste ei "Pariisi, kuvat pois" ajossa 0, yli 4080 kirjataan tulokseksi, kuvien kokojakauma ja kermahunnun osuus profiilikuvasta, latausrajat 40/64 vs käännöksen 20/20 (katso arvo ja lähde, ei korjausta).
KUN VALMIS, PT:lle 3 riviä, tiedot tulos.md:hen, VAIN MITATUT LUVUT: a) 0 vs 1 vaiheittain samasta vaiheesta muisti-tarkka.logista (fp, gfx, huippu), ei muistivahti-tulosta; ajon 0 huippu sisältää profiilikuvat; kerro että vahti oli pois ja ajo 1 on eri binääri (ero vain kytkin); b) parit pm-0-* | pm-1-* täysikoossa, sama paikka; pohjoinen ja etela = kalotit palasivat, paluu = pois; tarkista pm-0-pallo.png: kuva 1 oikeasti pallolta; lokista "kevennys pois käynnistyksestä" ja ettei "Pariisi, kuvat pois" -riviä ole; c) profiilikuvat T7 muistikuva/pura.zsh, vaihda U b8:aan, muisti-kuva-1.snap (pallo) ja -2.snap (Pariisi): Mt: pelkkä Pariisi | muu maailma | nimet | moottori, kullekin karsittavissa tai pakattavissa, lataako Unity turhaa; näkyykö PALAN KUVA KAHDESTI ja mallien PAKKAAMATTOMAT kuvat (PT 20.2x). Kokonaissuunnitelman tekee KK. MuistiKuva ja kytkimet eivät mene junaan.
## TYÖ NYT 2: KATOT koe10 (omistaja 18.59 "Jatketaan näillä viidellä talotyylillä", PT; 1 km², koe, ei junaan; parit PT:lle, Mac-ajot JU:lla)
LUE _tyo/natiiviseppa/talotyylit/tulos.md LOPPU (koe8, koe9). Syy mitattu: V-ura + tumma porras. koe8: naapuri sijainnista (sijaintinaapurit, tee-palat.py, vain tyylin talot, vain ds:ään), koe9: sulun normaali ylös: tummat viivat suurimmaksi osaksi poissa pelikuvassa (kuvat/koe9/r85-kolmikko.png, r45-pari.png), kaukaa 45° dL -1,16 L-hajonta 7,0/6,7. REGRESSIO koe9:ssä: kaarevan korttelin (r45-pari vasen alakulma) kadun puoleiset mansardit pois, reuna hampaita. Koe10 (naapuri vain, jos 1,5 m reunan ulkopuolella toinen talo; sijaintinaapuri 8288 -> 7452 reunaa, pieni muutos, voi olla ettei riitä): palat-v21-koe10-katot, ajopyynto-mac-10.md, sk-mac-10.txt, loki natiiviseppa-katot-koe10, kuvat t10-uusi-*: AJETTU, JU kuittasi 20.29 (rc 0, 3/3, palat 42 ja 56, 343 m ja 1679 m, 0 virhettä), KUVAT KATSOMATTA. KATSO: tee parit10.py (malli parit9.py, sed koe9->koe10, t9->t10), vasen alakulma täysikoossa v20 | koe10, viivat, Lab. Jos mansardit palasivat ja viivat pysyvät poissa: parit ja rivi PT:lle: kelpaako KK:lle. Jos eivät: katso talot lokista/reunoista (rakot8-kohta.py pikseli -> talot) ennen seuraavaa koetta. Ei vielä kerrottu PT:lle kuin yleisesti. Jäljellä muutama ohut naarmu: sama luokka kuin v20, ei verrattu kohta kohdalta. Mittarit: rakot8.py (korkeuskartta oikeista paloista), rakot8-jaljella.py, rakot8-portaat.py; npz-tiedostot scratchpadissa eivät säily, aja uudelleen. Vanhat tee-palat-koe{7,8,9}.py. Jatko (koko Pariisi, Lontoo, piiput) vasta PT:n sanalla. Lontoo on saman moottorin kopio: periaate 8, ei tehty.
Cron "4 9 * * *" luotava uudelleen. Lukulista 7.47: lue silti.

## AUKI, ODOTTAA MUITA (ei toisteta, ei tehdä ilman sanaa)
- Yksi taso: koe jää haaraan, 80°:n kevennys auki. Julkisivu: PT/KK:n sana, ei junaan. Palikkakirjasto: odottaa omistajan korttia (Pariisi valmis + muisti). Kameraeste ea5823b4f: ei junaan. Sumea alue: aamun kysymys KK:lla, ei yrityksiä. Meri: VS:lle PT:n kautta.
- Muisti: PT 17.1x: ei A/B-ajoa, yhteisajo mittaa junan. Tulos _tyo/natiiviseppa/muisti-7-b8/tulos.md.
- iPhone-katto 901e4004b junassa 220; JU katsoo hypyn iPhonella; jos näkyy, korjaus NS:lle.
- Työpuita wt/-kansiossa yli rajan: kerro PT:lle ennen poistoja.

- Tärinä: iPad 4 A0, 0 palaa, thermal 0: GPU 13 → 29 ms noin 3 min:n kohdalla, huippu 37, 10 min:n tauon jälkeen 11,6; kolmiot ennallaan; seisova kamera kuvaero 0,000. Syy auki. Muistipiikki t 20 s: 3660 (0 palaa) | 4039 (3b); iPad 3b VIKA 4106 ≥ 4080, huippu 4220. Skriptit P/selvitys-muisti-3b/.
- r3-rata oli viallinen (zoomirajan nosto, 4,15 m/ms): r4 = 60 m/s, pelaajaa ei koske. Pelaajan veto 156–209 m/s lähimmällä zoomilla. Silmä 56 m kartan yllä, alle ND:n tornien.
- Iso iPad on Forward+ (Ultra_Renderer mode 2), muut Forward. iPad 1 r3: B2−A0 +8,34 ms, kolmiot 1,06 → 2,03 milj.
- Näkyvä vesi: Z14 + ND:n pohjakuva; maski P/selvitys-tolpat/nakyva-vesi-alueet-2m.png, poisto poista-vedesta.py. Jos KS muuttaa kanavaa tai ND:n pohjaa: nakyva-vesi.py, alue-vesi.py ja poisto uudelleen. tee-palikat.zsh:n jälkeen poista-omat-sillat.py.

## Opit
- MALLIN LUKU EI RIITÄ EDES NAAPURIEN KANSSA: 1 156 -> 52 m ja silti viivat näkyivät: mittari ei nähnyt alle 1 m:n porrasta. Kerro PT:lle vasta pelikuvan jälkeen.
- KATSO MYÖS MITÄ EI PYYDETTY: koe9:n viivat paranivat, mutta kuvan kulmasta katosivat mansardit. Käy koko kuva läpi v20:tä vasten.
- NAAPURI ON REUNAN ULKOPUOLELLA: pelkkä etäisyys täyttyy myös päällekkäisestä talosta.
- KOKEEN KYTKIN KÄYNNISTYKSESTÄ: kytkentä kesken ajon voi itse aiheuttaa mitattavan piikin (kalotit: +556 Mt 0,5 s). Verrokin pitää olla sama tila alusta.
- YLHÄÄLTÄ-MITTARI EI OLE PELIKUVA: rako-ala 6983 -> 95 mutta raot jäivät, koska mittari katsoi taloa yksin. Kun luku paranee paljon, älä kerro syytä varmistuneeksi ennen pelikuvaa. Vertaa aina v20 | ed | uusi samasta rajauksesta.
- TYYPPITARKISTUS tyopuu.zsh:ssa on kovakoodattu W: tarkista polku; se antoi 0 virhettä väärästä työpuusta. Kartta-kokoonpano ei näe Linssit/Unityä.
- KEHITYSKÄÄNNÖS: --console antaa error 22; ipad-skenaario ei toimi, oma skripti lokista.
- T-RIVI TULEE VAIN NOUSUSSA JA MUISTIVAROITUKSESSA: RT:n ajoitus on väljä, ei johda hetkeä siitä.
- VÄRIPOIKKEAMAN SYY ON VARAVÄRISSÄ: katso ennen säätöä, tuleeko poikkeava väri mittauksesta vai varapolusta (lohenpunainen tuli tiilen varavärista, ei mittauksesta). Listaa ääripäät mitattuine arvoineen.
- PEITTOKYNNYS PIILOTTAA: "peitto >= 0,98" on ison talon 60 m² reikä; peitto_kuva 256 px ei näe kapeaa rakoa. Viipale avasi oikeat pihat, jotka olivat olleet piilossa.
- YKSI MUUTOS KERRALLAAN KUVAAN: koe5 sekoitti täyden peiton ja laajemman yläreunan; rypistyminen näkyi vasta kuvassa. Katso rajaus täysikoossa ennen seuraavaa koetta.
- PT:N MAININTA "SELVITYS" VOI OLLA JO TEHTY: PT:n luovutuksessa asia oli auki, vaikka tulos oli olemassa. Katso oma tulos.md ennen uutta työtä, lisää uusi aineisto kohdaksi ja kerro PT:lle.
- PALAT-LUKU KUVAN JÄLKEEN: palat 30 vs 42 johtui edellisestä vaiheesta, ei aineistosta: kolmas ajo ilman v20-vaihetta antoi 42. Tarkista kuvasta ennen hypoteesia.
- SÄÄDÖN KESKITYS: katso koko tyylit.jsonin mediaani (kirkkaus, R-B) kartan väriä vasten ennen värisäätöä: koe2:n kylmyys oli luettavissa datasta ilman ajoa.
- SKENAARION JÄRJESTYS: lahizoomi ENNEN ajaa. Komento muuttaa vain rajaa, ei siirrä kameraa. md5 tai ero 0 lähikuvan ja kaukokuvan välillä paljastaa tämän heti: tarkista se ennen hypoteesia. Vanha toimiva malli julkisivu/sk4-mac.txt.
- KATSO ENNEN AJOPYYNTÖÄ, ONKO PT VIELÄ KATSOMASSA: koe2-ajo piti pysäyttää aineiston vaihtuessa.
- zsh: $s:A on muuttujan muunnin, joten ${s}:polku aina (git show ${s}:Assets...). === rivin alussa kaataa komennon.
- LOKIN SANA EI OLE TODISTE PUUTTUMISESTA: "esitys"-rivien puuttuminen johtui siitä, ettei Lontoolla ole esitystä; lue KaupunkiIntro ennen rajausta. le-ajossa kertoja oli pois.
- KIINTEÄ ODOTUS ENNEN KAUPUNKIPALLOA: kaupunkipallot voivat puuttua vielä 60 s:ssa; tarkista "kaupunkipallot: 12 kaupunkia" ennen napautusta tai odota 100 s.
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
- Mittari: ruutujen sisällön ero on samaa luokkaa kuin odotettu lasku (vasen sarake 0,18–0,21 px muita suurempi); ruuduittain ensin. Kartan mittaus y 384–752, y 300–450:ssa kylttejä. Eräajo ohittaa kuvasarjat, Macilla ei kuvajäännöstä; automaatti
- Unity (x, y, z) = ECEF (X, Z, Y) TrueOriginissa; origolla Pariisissa (itä, ylös, pohjoinen). Tarkista float-tarkka-ero ≤ puoliaskel. Sarjan kuvat laitteelta ylösalaisin; Mac --ei-kaanto. veto 0.1 0 = länteen, veto 0 0.1 = etelään; vedon alussa kään
- Tyyppitarkistus: O/tyyppitarkistus-tyopuu.zsh, S omaan scratchpadiin; V/tyyppitarkistus.zsh kääntää vanhan kopion.
- Älä usko komentojen laskuja tai katkeamissyytä ilman konsolia: grep "muistivahti: VIKA" ensin. Muisti vain samasta vaiheesta muistivahti.log:sta. palikkakoe.jsonl kertyy: viimeiset rivit. "Heti perään" -komennot vaativat kuittauksen; keskeytysehdossa t�
- Mittarissa suurinP95Ero ei yksin riitä: kerro myös ruudun P95 ja kuvamäärä. Lue RP-asset ennen lupausta. Mittaa kaikki veden lähteet ennen syyn nimeämistä. Älä lupaa kärkeä, jos korjaus on tulossa.
- OpenFreeMapin robots.txt = 403: ei hakuja. Robots aina ensin omassa komennossaan. Luovutus voittaa Postivahdin aloitusviestin.
- LAITTEEN KANSIOT EIVÄT TYHJENE: palikat sarja kirjoittaa kehysnumeronimillä samaan kansioon, joten uusinta samalla nimellä sekoittaa vanhat kuvat (47-67 kuvaa). Rajaa ero-CSV:n kehysnumeroilla (f0-1...f1) ja tarkista listauksen ajat: O/analysoi-ipad5.py.
