# Natiivisepän luovutus 6.11.2026 klo 19.26, päivitetty 22.24 (kohta 10 tehty, meren ruudukko PT:n sanalla)

## Tila 22.24, KORVAA ALLA OLEVAT TILAT JA SEURAAVAT TYÖT
- PT 21.4x, Pariisi valmis -listan kohta 10: kaksi työlistan riviä. Vain Mac, lyhyet ajot, kokeena, ei junaan, ei iPad-ajoja. Aloituslento on NUI:lla, älä koske.
- LIIKU TOIMII MACILLA: natiiviseppa/liiku-lento a68c82983 (natiivi-backup) = NUI:n natiivi-ui/aloituslento-kuvat-219 356eb0101 + Liiku. Kuvat /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-liiku-lento-a68c82983 (l0-l5): loitonnus Ranskan tasolle, peruminen takaisin 6,0 km:iin, renkaat eivät PARIISI-nimen päällä. Kerrottu PT:lle ja KK:lle 22.2x, työlista päivitetty. KK:n arvio auki.
- MEREN RUUDUKKO näkyy yhä täysikoossa (l2-ranska, Kanaali ja Keltienmeri). Ei korjattu. VS:n 5b9eb8cb4 ("meri yhdeksi väriksi") ei ole tässä haarassa; ei tiedetä, poistaako se ruudukon. iPad katsomatta. PT:lle esitetty: viedäänkö VS:lle? SANA AUKI; ÄLÄ KORJAA ITSE ILMAN SANAA.
- INTRO TARKISTETTU, EI KOODIMUUTOSTA: NUI:n ajo /Users/Shared/Claude/proto-3d/lokit/nui-aloituslento-kuvat-356eb0101: kallistus 60° koko lennon, PARIISI ilman tummennusta. Kerrottu. NUI:lle kerrottu ajon viat: alussa pohjakartta tyhjä noin 8 s, Eiffelin ja Riemukaaren kuvat eivät näy; syy auki, NUI arvioi.
- Pohja: Liiku poimiutuu ilman ristiriitoja myös yhteiselle (natiiviseppa/liiku-yhteinen 43a2fa300 pohjalla 092fee5bb), mutta siellä peli vie kameran itse Ranskaan ("saapuminen: FRA") ennen Liikua, koska lento puuttuu. Sen kaksi ajoa (lokit natiiviseppa-liiku-yhteinen-*) EIVÄT ole tulos. Vanha 99748962f on haarassa liiku-loitonnus-219. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto-koe on haarassa liiku-lento.
- Skenaario P2 = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/liiku/sk-liiku-lento.txt. Lokin teksti on nyt "zoomaus pariisi alkaa", ei "zoomaus alkaa pariisi". unity-tarkistus sh:lla 0 virhettä.
- SEURAAVA TYÖ: odota PT:n sanaa merestä ja KK:n arviota. Muuten rivi PT:lle "JONO TYHJÄ: Natiiviseppä".
- Cron luodaan uudelleen ("4 9 * * *").

## Tila 21.31, KORVAA KAIKKI ALLA OLEVAT RAKENNUSTÄRINÄN TILAT JA SEURAAVAT TYÖT
- OMISTAJAN PÄÄTÖS 21.30 (KK): tärinäajo "Perutaan (Suositus)". Korvaa 20.58:n "Yksi uusi ajo" ja KK:n 21.08:n sanan. Omistajan sanat: "Siihen ei kannata liikaa käyttää aikaa koska en usko että se näkyy jos kartta on korkeammalla." Lisäksi 21.2x: "Tärinä ei voi liittyä muistiin tai suoritus kykyyn. Se on joku muu syy."
- Mac-16 ja iPad-ajo peruttu, JU:lle kerrottu (KK). Mac-16 ei ehtinyt alkaa (lokikansiota ei ole 21.30). Ehtoja EI lukita, ajoja EI tilata, isoa origokorjausta EI tehdä.
- Talteen jäävät: haara natiiviseppa/origo-koe d907286cb (peili natiivi-backup) ja raportit P:ssä ja H:ssa. H/ajopyynto-mac-16.md merkitty perutuksi.
- Tärinästä ei tulosta: ajo 1 EI TULOSTA, tärinä rakennusten kohdalla todentamatta. Syy auki; muistia tai suorituskykyä ei kirjata syyksi.
- Alla olevat C1 ja D2 pysyvät odottamassa omistajan 17.05:n mukaisesti. Ei kysytä uudelleen.
- SEURAAVA TYÖ: PT:ltä. Jono tyhjä, PT:lle kerrottu 21.3x.
- Cron luotu tässä sessiossa ("4 9 * * *"); uusi sessio luo sen uudelleen.

KORVAA KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. Session id osoitekirjasta; PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Etäyhteyteen ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, V = P/valmis-jalki2, H = P/selvitys-origo-hinta, L = /Users/Shared/Claude/proto-3d/lokit. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka, haara natiiviseppa/origo-koe d907286cb, peili natiivi-backup. P:n skriptit ja tulokset ovat haaran ulkopuolella.

## Tila 21.10, korvaa alla olevan "KK:n sana auki"
- KK 21.08 KYLLÄ: A1, B ja A2 kukin omassa käynnistyksessään, vahti päällä, ei koodimuutosta. VIKA, varoitus, kaatuminen tai muu keskeytys = EI TULOSTA, ei uusintaa. Samat kolme ikkunaa ja tulossääntö. Mac pienimmällä kuvalistalla (omistaja 17.57). Lukitse ennen iPadia. Jos Mac ei näytä järjestyksen toimivan: rivi PT:lle ja KK:lle, ei iPad-ajoa. KK kertoo tavan muutoksen omistajalle.
- MAC-16 TILATTU JU:LTA 21.09: H/ajopyynto-mac-16.md, H/sk-mac-16.txt, lokit L/natiiviseppa-rakennustarina-mac16-d907286cb, 1 kuva t16-b-0175. EI vielä tulosta.
- KUN MAC-16 PALAA, kelpaa jos: 1) "palikat: esineet pois" ennen uusi-peliä ja 0 riviä "koe luotu" tai "ohjelmakohteet: luotu" ennen "palikat: esineet näkyvissä"; 2) "origo CartographicOrigin" näiden välissä; 3) sen jälkeen "koe luotu" 10 alueelle ja "ohjelmakohteet: luotu"; 4) kuva täysikoossa: rakennukset pystyssä samoilla paikoilla kuin t15-b-0175, ei sinistä pohjapalloa eikä reikiä, nappula poissa.
- SITTEN LUKITSE H/rakennustarina-ehdot.md:hen ja tilaa iPad JU:n jonon loppuun, kukin käynnistys: komento.txt "palikat esineet 0" laitteelle ennen käynnistystä (Komennot ei poista vanhaa tiedostoa, lukee ensimmäisessä Updatessa; iPadilla ei koestettu), käynnistys, noin 100 s, talot 0, tarkistus ettei luontia ole tullut, origo vain B:ssä + 5 s, nappula pois, nappula tila, esineet 1, odota luonti enintään 120 s, rata r4, 40 s, rata r4, 22 s, jälki + sarja heti. Nimet t6-a1, t6-b, t6-a2, uusi lokikansio. Lokit noudetaan joka käynnistyksen jälkeen. Varoitus: "applicationDidReceiveMemoryWarning" tai muistivahti.log "iOS:n muistivaroitus" = EI TULOSTA missä kohdassa tahansa.

## Tila 21.02, korvaa kaikki alemmat tila- ja seuraava työ -kohdat rakennustärinästä
- AJO 1 (20.23-20.25): EI TULOSTA, H/rakennustarina-tulos.md, KK:lle ja PT:lle kerrottu. Muistivahti VIKA 4082 Mt B:n esineet 1:n jälkeen. A1:tä ei analysoitu eikä sitä pidä tulkita. Nappula pysyi piilossa kuten pitikin.
- OMISTAJA 20.58 (PT:n kautta): YKSI uusi ajo. Omistajan ehdot: piikki saa tulla vain uudelleenluonnissa; muisti alle 4080 Mt ennen sarjan alkua; VIKA tai varoitus sarjan aikana, kaatuminen tai muu keskeytys = EI TULOSTA, ei enää uusintaa. Samat kolme ikkunaa ja tulossääntö. Jos ei onnistu ilman koodimuutosta tai on este: rivi KK:lle ENNEN ajoa. Tulos KK:lle ja PT:lle. Tavoite: tiedämme, tärisevätkö rakennukset vähemmän, ennen isoa korjausta.
- ESTE, KERROTTU KK:LLE JA PT:LLE 21.01, KK:N SANA AUKI. EI TILAUSTA JU:LLE ENNEN SANAA. Samassa käynnistyksessä piikkiä ei voi sallia: VIKA pysäyttää komennot käynnistyksen loppuun (MuistiVahti.cs), ja iOS-varoitus asettaa LiikeLaatat.SiirtymaMuistiJarru käynnistyksen loppuun, joten B ja A2 eivät olisi vertailukelpoisia A1:een. Vahdin saa pois tiedostolla muistivahti.txt, mutta KK:n linja on "ei ajoa ilman vahtia".
- SUOSITUS KK:LLE: A1, B ja A2 kukin omassa käynnistyksessään, vahti päällä. Alussa "palikat esineet 0" ennen kuin kamera tuo rakennukset (ensimmäinen luonti tuli konsolissa ennen ensimmäistä komentoa, rivit 404-761, joten komento on saatava perille ennen sitä, esim. komento.txt laitteelle ennen käynnistystä; TARKISTA), sitten origo (vain B), esineet 1, odota luonti, rata r4, 22 s, jälki + sarja. Arvio luontihuippu noin 3840 Mt, radalla noin 3990 Mt, ei mitattu. Muistivahti.log ja konsoli on noudettava joka käynnistyksen jälkeen, koska loki alkaa alusta. Ehdot: VIKA, varoitus tai kaatuminen missä kohdassa tahansa = EI TULOSTA. Heikkous: |A1-A2| sisältää käynnistysten eron.
- KK:N KYLLÄN JÄLKEEN: 1) yksi Mac-ajo JU:lta (järjestys toimii, rakennukset pystyssä origolla, komento perillä ennen luontia), 2) lukitse ehdot H/rakennustarina-ehdot.md:hen (lisää, älä poista) ennen iPadia, 3) uusi lokikansio ja nimet (t6-*), koska laitteen kansiot eivät tyhjene ja vanhan kansion vaiheet.txt estää ajon, 4) tilaus JU:n jonon loppuun. JU:n vanha skripti: /Users/Shared/Claude/julkaisija-tyokalut/ns-tarina5-ajo.zsh.
- ANALYYSI LUKITTU 20.08 (KK 20.01): H/rakennustarina-ehdot.md loppu, H/hyppy3-rakennukset.py. Ikkunat silta (704,384), Hôtel de Ville (832,192; 1300 m), Louvre (0,96; 255 m). Tulossääntö erikseen kullekin, "TÄRINÄ PIENENEE" vain jos kaikki kolme. Oma lisäys: alle 80 % kelvollisia näytteitä = ikkunasta ei tulosta. Pätkät koko 1024×768-rajauksesta. Kuvat katsotaan ennen lukuja. Kuvat H/mac15-kuvat/ikkunat-kk2001, kolmiointi H/kolmioi-louvre.py.
- Cron luotu tässä sessiossa ("4 9 * * *"); uusi sessio luo sen uudelleen.
- Opit: toinen luonti samassa käynnistyksessä on nopeampi ja ylittää ensimmäisen huipun (syy auki, ei todista "ei mahdu"). Lue vahdin ja varoituksen pysyvät sivuvaikutukset ennen kuin sallit piikin. Kiinteä maailman piste ei kelpaa Louvren syvyyteen, koska julkisivu on lähes radan suuntainen ja piste valuu ruudusta.

## Tila 19.55, korvaa alla olevat Mac-15- ja iPad-kohdat
- MAC-15 VALMIS JA KELPAA. iPad-AJO TILATTU JU:n jonon loppuun 19.54: H/ajopyynto-ipad-rakennustarina.md, lokit L/natiiviseppa-rakennustarina-ipad-d907286cb, jäljet t5-a1, t5-b, t5-a2. Ajoa ei ole vielä ajettu. Seuraava työ on kohta 1 d, kun JU palauttaa.
- ESINERUUDUT lukittu H/rakennustarina-ehdot.md:hen: vain (704,384), siinä Pont Neuf, EI rakennusta. Lisäluvut (128,384) Louvre ja (416,384), eivät ratkaise. Rajatut kuvat H/mac15-kuvat/k-*.png.
- Nappula oli (704,384):ssä vain A:ssa, joten tilauksessa on "nappula pois" A1:ssä. Ei ajettu: katso iPadin kuvista ensin. Nappula tai kyltti ruudussa vain yhdessä jaksossa = EI TULOSTA.
- KORJATTU VIRHE: mittaruudut ovat KESKIRAJAUS täydellä tarkkuudella, eivät pienennös. Alla oleva "kerroin 2,6875" ja Sainte-Chapellen kyltti ruudun lähellä olivat väärin. Mac-kuvassa x_mac = 1376 + (x-512)*2752/2732, y_mac = 1032 + (y-384)*2752/2732.
- KORJATTU VIRHE: hyppy2-skriptien f lasketaan rajatun kuvan korkeudesta (823 px), oikea 2196 px. Uusi analyysi: f = (2048/2)/tan(fov/2), kokeiltu kopio scratchpadissa katoaa, tee rivin 90 muutos uudelleen. Jäännös tarkka ei juuri muutu (iPad 5 r4-a1 1,152 -> 1,163, r4-b 0,240 -> 0,239); iPad 5:n float-tarkka ja kerroin eivät päde. Kerrottu PT:lle.
- Mac-15: B on pysäytetyissä kuvissa siistimpi kuin A (A:ssa Pont Neufin lyhdyt ja kaide repaleisia, täpliä Louvren ikkunoiden ympärillä). Syy auki, vain Mac, ei tulos.
- Cron luotu tässä sessiossa ("4 9 * * *"); uusi sessio luo sen uudelleen.

## Tila 19.45
- MAC-15 PYYDETTY JU:LTA 19.41 (H/ajopyynto-mac-15.md, H/sk-mac-15.txt, lokit L/natiiviseppa-rakennustarina-mac15-d907286cb, 8 kuvaa t15-*). Kuvia ei vielä tullut. iPad-ajoa EI ole tilattu. Työpuuhun ei tehty muutoksia.
- Mac-14 valmis, tulos H/mac14-tulos.md, kuvat H/mac14-kuvat.
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
1. RAKENNUSTÄRINÄKOE, KK 19.37 KYLLÄ (PT:n kautta): yksi iPad-ajo JU:n jonon lopussa. Yksi kysymys: pieneneekö tärinä, kun rakennukset ja sillat ovat kuvassa? Ehdot lukittu: H/rakennustarina-ehdot.md, lue ensin. Järjestys esineet 0, origo, esineet 1; muistivahti, 0 palaa; keskeytys mistä tahansa syystä = EI TULOSTA, ei uusintaa. 17.05 pysyy: ei C1:tä, D2:ta eikä toteutusta. Float-pyöristyshypoteesia EI jatketa.
   a) Kun JU palauttaa Mac-15:n: katso 8 kuvaa täysikoossa ja piirrä 9 mittaruutua (hyppy2.py RUUDUT, 1024x768-kuvassa; Macilla kerroin 2,6875). Ehto: rakennus ja silta ruudussa kaikissa vaiheissa ja vähintään yhdessä mittaruudussa koko ikkunan ajan. Lukitse ESINERUUDUT ehtoihin (myös kyltti tai merkki vain A:ssa tai B:ssä = ruutu pois). Mac-14:ssä b:stä katosi katukylttejä ja tuli 3 merkkiä lisää; m-a1:ssä Sainte-Chapellen kyltti osuu lähelle ruutua (704,384).
   b) Rata ei kelpaa: iPad-ajoa EI ajeta, rivi PT:lle.
   c) Rata kelpaa: kirjoita H/ajopyynto-ipad-rakennustarina.md iPad 5:n pyynnön mallilla (P/valmis-origo/ajopyynto-ipad-5.md), tilaus JU:n jonon loppuun. Tyhjä indeksi, talot 0, uudet nimet t5-a1, t5-b, t5-a2. Vain r4, ei vetoja. A1: rata r4, odota 40 s, rata r4 uudelleen, odota 22 s, jalki + sarja 3 s heti. B: esineet 0, odota 5, origo, odota 5, esineet 1, odota rivit "koe luotu" 10 alueelle ja "ohjelmakohteet: luotu", rata r4 uudelleen, odota 22 s, jalki + sarja. A2 sama, origo pois. Sama 22 s kaikissa, jotta pituusasteet osuvat päällekkäin. Odotusriveissä vain tunnus, ei lukuja (desimaalipilkku keskeytti iPad 5:n ajon 1).
   d) Analyysi P/valmis-origo/analysoi-ipad5.py, hyppy2-ruuduittain.py ja patkat-ipad5.py mallilla. Tulos pätkineen KK:lle, rivi PT:lle, myös "ei tulosta". Ei omistajalle ilman KK:n arviota.
2. C1 ja D2 ODOTTAVAT (PT 19.1x): ne vaativat palikka-ajoja iPadilla, ja mittaus uusitaan, kun Pariisi on valmis ja muistia on kevennetty (omistaja 17.05). Älä kysy niitä uudelleen. C1: GameObject + LOD Group (ei koodattu) + DOTS-tuki varjostimeen + Keep All + static batching pois + peittokarsinta pois; Forward-kopio pois listalta, RD vaatii Forward+:n. D2: B2 + forceMeshLod vs erilliset verkot. Tutkimus 20261106-rakennuspalikat-tutkimus.md, osa E.
3. Origokoe pysyy suljettuna: ei uusia origo-ajoja iPadilla muuta kuin kohdan 1 yksi ajo.
4. Kohdan 1 jälkeen "JONO TYHJÄ: Natiiviseppä" PT:lle.

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
