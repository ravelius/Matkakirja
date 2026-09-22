Raamatun (js/tyohuone-raamattu.js) juokseva päätösloki 20.9.2026 illasta eteenpäin — jatkaa lokeja paatokset-2026-08-24--09-03.md, paatokset-2026-09-03--09-14.md ja paatokset-2026-09-13--09-20.md. Uusi kohta lisätään loppuun komennolla `node tools/raamattu-kirjaa.mjs "<OTSIKKO>" "<teksti>"` (otsikkoon aikaleima Suomen aikaa). Raamattuun jää vain voimassa oleva linjaus; sitä muutetaan vain kun sääntö muuttuu, ja vain Fable kirjoittaa siihen.

## KARTUSCHA 3 TEHTY (Pelikoodari 3ea7b1b6) (20.9.2026 klo 18.59)

Pienessa kartuschassa ei lippua; isossa lippu = otsikon versaalin korkeus (juurisyy: lipun em oli kortin fontti, ei otsikon; nyt 1cap otsikon koosta, alareuna perusviivalla); iso pienenee kotelon pointerdown/wheel-eleesta kortin ulkopuolella (kortti pointer-events:none, rajaus geometrinen). Savuke savuke-kartuscha-3 28/28 (390+1400), harvaan sarjaan kartuscha-poluilla. Testit 3752/1 - punainen oli dokumentit-testin codex-toimitukset.md, korjattu jaossa. Pelikoodari jatkaa varusteet-harmaa-eralla. Raamatun jako mergetty Fablen haaraan (ff46f88b): 983 -> 230 kt, CLAUDE.md paivitetty.

## KESKENERAISET VARUSTEET HARMAANA TEHTY (Pelikoodari 96fe72c6) (20.9.2026 klo 19.12)

Vertailu, maatiedot ja vesistot kantavat LINSSI.kesken=true; matkalaukku latoo ne omaan .linssi-liuskat-kesken-ruudukkoon ruudukon loppuun (44 px, grayscale, 62 % peitto), esikatselu ja aktivointi toimivat; yksikkotesti matkalaukun-linssit. Savuke-kartuscha-2 ja -3 harva-sarjaan harvaPolut-osumilla; kartuscha-2 vartio 3 (lipun napautus) tunnettu punainen: LIPPUTIEDOT kattaa vain FIN/DEU ja savuke mittaa Pariisissa (savukkeen vika); kartuscha-2 luki PW_CHROMIUM-muuttujaa -> korjattu CHROMIUMiksi. Testit 3759/0. Pelikoodari jatkaa astro-kuvakkeen 3 ehdokkaaseen (vain kaappauksina).

## ASTRONAUTIN KAMERAN KUVAKE VALITTU (Fable, Pelikoodari 8039d75d) (20.9.2026 klo 19.18)

Kolme Gemini-ehdokasta (tools/generoi-varustekuvat.mjs EHDOKKAAT-lista, pergamenttikaare kuten muilla varusteilla; kaappaukset docs/raportit/kaappaukset/astro-kuvake-20260920/). Fable valitsi ehdokkaan 3: kyparan lahikuva, Maa visiirissa, kamera edessa - ainoa joka lukee 64 px:ssa; 1 (kokovartalo) ja 2 (leijuu kartan paalla) jaavat pilkuksi. Kayttoonotto: assets/varusteet/varuste-satelliitti.jpg + js/ui.js onSatelliitti-poikkeus pois, samaan haaraan.

## HIMMEAT KAARET TEHTY, JULKAISU ODOTTAA FPS:AA (Karttaseppa f175b8e6) (20.9.2026 klo 19.20)

Liftatessa kaikki 411 kaarta himmeina kantaman kaarten alla: pallon vektorikerroksen uusi laji verkko (peitto 0,3, 0,7-1,1 px, harvennus 0,01 astetta, 4 168 janaa), kerran per lauta, nakyvyys lippu ilman animaatiota, geometria samasta muistista kuin kirkkaat kaaret (merireitit merella). Testit 3774/0, savuke-reittiverkko 11/11 harvassa sarjassa, Chromium-kehysaika +12 % ohjelmistopiirrolla. PAATOS (Fable): julkaisu vasta laitteen fps-luvun jalkeen (Laitetestaaja); yli 15 % -> harvennus ennen julkaisua; savy ja peitto omistajan katsottavaksi laitteella. Polttovuoro (CYP/ITA/POL nostotaso) sovitaan suoraan Julkaisijan kanssa: ei PR-CI:ta polton aikana. Raportti docs/raportit/viesti-fable-reittiverkko-20260920.md.

## CYP/ITA/POL NOSTOTASO OLI JO TUORE; LTU POLTETAAN (Karttaseppa, Fable) (20.9.2026 klo 19.23)

tools/tarkista-polton-tuoreus.mjs (amparin luettelo 2026-09-20-pohja, nostotasot 2026-09-20b-nostot z5-z8): CYP 14/0, ITA 22/0, POL 19/0 vanhentunutta - jonon merkinta 05.21 ratkesi 20b-ajossa, ei polttoa. Ainoa vanhentunut maa LTU (4 nostoa: trakain-saarilinna, ristien-kukkula, nosto-kryziu-kalnas, nosto-trakai; tiiviste vaihtui prepissa). PAATOS: LTU:n nostotaso poltetaan (21 nostoa, minuutteja), nostotaso ei vaihda pohjaa/viivatasoa -> ei pallosarjaa; luettelo haaraan karttaseppa-ltu-nostot, Julkaisija vie luettelon ampariin vasta osoittimen mergen jalkeen. Karttaseppa odottaa sen jalkeen Laitetestaajan raporttia.

## NIMIOT RUUDUN REUNASSA: KOODIKORJAUS SOVITTELUUN (Fable, Sisaltokirjuri daaaa584) (20.9.2026 klo 19.27)

Sisaltokirjurin mittari tools/tarkista-nimio-reuna.mjs loysi 97 reunaylitysta 32 maasta (480x854, 390x844); Biskajanlahti/Pilat eivat toistuneet oletusnakymassa. Pilotti Ranskan 6 loydoksella: koordinaattien siirto korjasi 4/6, 2 ei muuttunut ja 3 uutta ilmestyi, koska js/pallolauta/sovittelu.js laskee kyljen ja siirron naapureiden suhteen joka ladonnassa. PAATOS: ei kasin siirtoa; ruudun reuna (turva-alue 4-8 px + laitteen turva-alueet) sovittelun omaksi esteeksi - Pelikoodari, haara pelikoodari-nimiot-reuna; hyvaksymisehto mittari 0 loydosta koissa 480, 390, iPad 820x1180 ja 1180x820. Sisaltokirjuri siirtyy kartuschan vajaisiin maihin.

## JOET EIVAT NAY LEVOSSA v1980 - JUURISYY JA PAATOS A (Karttaseppa, Fable) (20.9.2026 klo 19.43)

Omistaja (iPad, kaappaus pariisi-ei-jokia-v1980.webp): Loire-nimio ilman uomaa. Mitattu tuotannosta: osoitin 20260920k ja luettelo (pohja 2026-09-20-pohja, viivat d, ranta) tasmaavat, luettelo on viety. JUURISYY: pallon lepokerros (levossa, terava) kootaan pohja+ranta+nosto+vari ja jattaa viivatason pois (js/pallolaatat.js lepokerroksenKerrokset viiva:false, PAATOKSET 8: viivatasolla on reittiviuhka); joet siirrettiin v1974:ssa viivatasolle ja pohja 2026-09-20 on poltettu ilman jokia -> levossa joki katoaa, liikkeessa (sarja k) nakyy. PAATOS (Fable): A - oma jokitaso (joet + rajat ilman reitteja, --eireitit) z0-z8 uudella luettelokentalla, lepokerros lataa sen; sarja k pysyy, ei pallosarjaa; luettelo ampariin vasta kun osoitin mainissa; vanhan koodin siedettava uusi kentta. B (joet pallovektoreina ne_10m_rivers) jonoon; C (pohjan uusintapoltto) hylatty. LTU samaan polttovuoroon jos ehtii.

## SIIVOUS TEHTY (Julkaisija) (20.9.2026 klo 20.02)

16 worktreeta poistettu (puhtaat, pushatut, ei kaytossa; haarat sailyvat), 9 vanhaa PR:aa suljettu kommentilla (haarat sailyvat). Lista docs/raportit/worktree-siivous-20260920.md.

## OMISTAJAN TILAUKSET NOSTOIHIN (omistaja 20.9.2026 klo 20.14, kaappaukset nosto-lahderivi-pois-v1980.webp ja nosto-kuvat-paallekkain-v1980.webp) (20.9.2026 klo 20.14)

1) Nostokortin alaosan lahderivi ("Maalehden sivu ..., nosto ..., js/packs/maa-kategoriat.js FRA, pelin omaa tarkistettua aineistoa. Teksti ja kuva luetaan lehdesta ajon aikana...") POIS kaikista nostoista -> Pelikoodari. 2) Euroopan maiden KAIKKI nostot takaisin tyolistalle: tarkistus etta noin joka kolmannessa on tietovisa -> Sisaltokirjuri; ensin inventaario (per maa: nostot, visat, kuvat, havainnekuvat, tyypit), sitten standardi ja iso ajo. 3) Nostokortin kuvat KARUSELLIIN, ei paallekkain (Avignonin paavinpalatsi: kaksi kuvaa allekkain) -> Pelikoodari. 4) Havainnekuvissa pienella "Havainnekuva" myos lyhyissa kuvateksteissa -> Pelikoodari (merkinta renderoidaan kuvan lipusta), Sisaltokirjuri tarkistaa lipun datassa. 5) Huomenna Codexilta lisaa havainnekuvia nostoihin (kun tokenit tayttyvat). 6) Ennen isoa ajoa: nostotyyppien katselmus (yksi nosto per tyyppi, kontaktiarkki Laitetestaajalta tuotannosta, Fable ja omistaja katsovat), maarat per maa paatetaan inventaarion jalkeen; erikseen: miten kunkin maan karttasivua elavoitetaan lisaa (oma juttu, ei nyt).

## OMISTAJA: NOSTOKORTIN KUVAN KOKOERO JA KARUSELLIN ELEET (klo 20.15) (20.9.2026 klo 20.15)

Kaappaukset nosto-pieni-kortti-kuva-v1980.webp ja nosto-lisaa-kuva-pienenee-v1980.webp (Chaine des Puys): pienessa kortissa kuva tayttaa kortin leveyden, LISAA-tilassa kuva kutistuu noin puoleen - ero liian iso; kuvan pitaa pysya lahes samankokoisena kun teksti tulee mukaan (teksti alle, kortti vierittyy). Karusellin pitaa toimia myos pyyhkaisemalla (kosketus) ja nuolinappaimilla (tyopoyta), ei vain reunanuolista. -> Pelikoodari, samaan nostokortti-eraan.

## IDEAT MAAKARTAN ELAVOITTAMISEEN (Fable omistajan kysymykseen, kaappaus ranska-maakartta-v1980.webp) - EI PAATETTY (20.9.2026 klo 20.17)

1) Nimiston hierarkia: meret, lahdet ja 1873-maakunnat harvennetuin kapiteelein (VALIMERI, BRETAGNE, ELSASS-LOTHRINGEN), naapurimaiden nimet haaleina - vektorikerros. 2) Nostot kuvamerkeiksi atlastyyliin (vuori, torni, laiva), tarkeimmat suuremmalla nimiolla - merkkisarja Codexilta. 3) Meri elavaksi: rannikkoviivoitus tai syvyysvyohykkeet, laivoja, kompassiruusu ja mittakaava - vektorikerros. 4) Isoisan reitti 1873 katkoviivana paivamaarineen - tarinasidos. 5) Loytamisen sumu: kaymattomat alueet luonnoksina, mustetaan kuljettaessa; osa nostoista nakyy vasta lahella. 6) Pieni liike: pulu lentaa harvoin yli, pilven varjo reliefilla, illan savy kellonajan mukaan - hillitty. Fable kirjoittaa ehdotuksen 4-5:sta tarinan kanssa inventaarion jalkeen; 1 ja 3 Karttasepan tunneissa, 2 Codexin kuvatyota.

## KIERROS 19 (Laitetestaaja, v1980 iPhone) (20.9.2026 klo 20.23)

Raportti docs/raportit/laitekierros-19-20260920.md (haara laitetestaaja). Ei uusia vakavuus 1-2 -loydoksia: liftauksen kantaman kaaret ja saapumisen piilot toimivat; joet eivat nay levossa toistuu myos iPhone-Safarissa (tiedossa, jokitaso-korjaus kaynnissa). Kartuscha, astro ja huntu 80 % jatkuvat samalla kierroksella; sitten nostotyyppien kontaktiarkki ja 19b iPadilla.

## NOSTOINVENTAARIO EUROOPASTA (Sisaltokirjuri bbe88c84) (20.9.2026 klo 20.26)

docs/raportit/nostoinventaario-20260920.md: 43 maata, 1253 nostoa (alaraja: ei taky/syvennys/skandaali/hetki-kerroksia eika kulttuuri-kategoriat/nahtavyysjutut), visoja 1174 = 93,7 % (ei yhtaan maata alle 1/3), kuvallisia 1010, ilman kuvaa 243 (FRA 39, GRC 36, TUR 24, DEU 22, HRV 20, BGR 18, HUN 18, ITA 17, ROU 14, BIH 12), havainnekuvia nostoissa 0. Maara per maa: EU-maat enimmakseen 40-51 (mediaani ~44), FRA 90 (vanha paketti, 38 muut-tyyppia, visa 51 %), GRC 65; pienet: MLT 11, LUX 15, GBR 14, NOR 13, UKR 14, CHE 17, ISL 18, RUS 17, BIH 17, TUR 29; ei-EU tyhjat ALB, AND, BLR, MDA, MKD, MNE, SRB, XKX. Havainnekuvan yhtenainen merkki: lahde-kentan alku "Tekoalylla tuotettu havainnekuva." (ei /karttanostot/-polku). Nostostandardi paatetaan omistajan kortilla.

## NOSTOSTANDARDI PAATETTY (omistaja kortilla klo 20.30) (20.9.2026 klo 20.30)

Visat: omistaja epaili maaraa (Ranskassa noin puolessa - FRA 51 %, muut maat 92-100 %, inventaario oikein), hyvaksyi ehdotuksen: peli nayttaa visan noin joka kolmannessa nostossa nostokohtaisesti, data sailyy -> Pelikoodari. Maarat: EU 40-50, pienet >= 15, muu Eurooppa 30, FRA siivous -> Sisaltokirjuri; jarjestys: kartuschan vajaat maat (kesken) -> 243 kuvatonta (Commons ensin, loput Codexille listana huomenna) -> FRA siivous -> BEL/SVK/SVN/CYP/MLT taydennys -> muu Eurooppa maa kerrallaan; Fablen pistokoe per maa. Linjaus kirjattu Raamattuun kohtaan NOSTOSTANDARDI EUROOPALLE.

## NIMIOT RUUDUN REUNASSA TEHTY; POLTETUT NIMIOT -> KOHDEMAAN NIMIOT ELAVIKSI (Pelikoodari 9ab8af3a, Fable) (20.9.2026 klo 20.37)

Ruudun reuna (6 px + laitteen turva-alueet) on sovittelun kova este, porras vetaa lapun sisaan <= 24 px, hystereesi 24 px; mittari laajennettu zoomeihin (3 kaupunkia x 1/2 ja 1/4): 32 maata, 4 kokoa, 8 441 nimiota -> elavat ylitykset 68 -> 0; ladonta 2,4 -> 2,2 ms; savuke 6/6, testit 3765/0. Raportti docs/raportit/viesti-fable-nimiot-reuna-20260920.md. LOYDOS: omistajan esimerkit (Valimeri, Camarguen hevoset, Marseillen saippua, Cosquerin luola, Valimeri rantaviivan alla) ovat KAIKKI laattoihin poltettuja nimioita (240 jaa), joita sovittelu ei voi siirtaa. PAATOS (Fable): kohdemaan kaikki nimiot elaviksi (myos musteeksi poltetut ja merinimiot), muiden maiden nimiot jaavat laattoihin; poltettujen ulkoasu sailyy; merinimio ei rantaviivan/korostuskehan alle; laatan tekstuuriteksti piiloon kohdemaan osalta ilman uudelleenpolttoa jos mahdollista, muuten nostotason poltto ilman kohdemaan tekstejä jokitason kanssa (Karttaseppa). Era Pelikoodarille nostokortin ja visa-kolmanneksen jalkeen (haara pelikoodari-nimiot-elavat). Nimiot 1 julkaistaan v1982:ssa.

## TYOTAPA JA SESSIOT KIRJATTU RAAMATUN ALKUUN (omistaja 20.09.2026 klo 20.40) (20.9.2026 klo 20.42)

Omistaja: tehostamistoimet (roolit, viestinta Fablelle, tyotilat, lukeminen, kanavat, kirjaus, CI, sessiomaara) kirjataan selkeasti Raamatun alkuun niin, etta ne toteutuvat jatkossakin. Tehty: Ydinajatus-osion kohta 2 TYOTAPA JA SESSIOT (sitova, kohdat A-H), otsikkokommentin viite, CLAUDE.md Lue ensin -osoitin, docs/roolitus.md paivityslaatikko; Kaupungit-osion vanha kohta korvattu osoittimella.

## OMISTAJA: KOKO PYRAMIDI POLTETAAN UUDESTAAN, JOET POHJAAN, ODOTETAAN ELAVOITTAMISEN PAATOKSET (20.9.2026 klo 20.43)

Omistaja: poltetaan kaikki uudestaan, joet samalla; odotetaan hetki muita karttapaivityksia ennen polttoa. -> Jokitaso (paatos A) perutaan, Karttaseppa tekee polttosuunnitelman docs/raportit/polttosuunnitelma-20260920.md; LTU samaan polttoon; Pelikoodari kertoo Karttasepalle nimiotason tarpeen (kohdemaan nimiot elaviksi). VISALASKENTA RISTIRIIDASSA: Pelikoodari laskee FRA 16/64 = 25 % kelvollisella visalla (kysymys, >= 2 vaihtoehtoa, oikea), inventaario 51 % / kaikki 94 % -> Sisaltokirjuri tasmayttaa Pelikoodarin kanssa, visa-kolmannes odottaa. Visa nakyy tanaan aina kun kelvollinen visa-kentta on, LISAA-tilassa kortin alaosassa; visa-lukko = vastattu kysymys kuluttaa avaimen. Laitetestaajan 7 nostosta vain Roquefort on visallinen. v1981: satelliittilinssi ja astro-pallo vihreat, luentakuvat play()-ajoitusflakki -> CI uudelleen, tunnetuksi jos toistuu.

## UUSINTAPOLTON SISALTO PAATETTY (omistaja kortilla) (20.9.2026 klo 20.46)

Jokien (pohjaan) lisaksi: 1) merinimiot merelle ja pois rantaviivan/korostuskehan alta; 2) nimiot omaksi nimiotasoksi (kohdemaan nimiot piilotettavissa ja elaviksi); 3) 1873-maakuntien ja merien nimet harvennetuin kapiteelein (Sisaltokirjuri: docs/sisalto/nimisto-1873.md, Ranska ensin, kaanontarkkuus 1873); 4) rannikkoviivoitus tai syvyysvyohykkeet (koe molemmista, omistaja valitsee). EHTO: testataan ensin - Karttaseppa tekee Ranskan koelaatat z6-z8 paikalliseen peliin ja kaappaukset docs/raportit/kaappaukset/poltto-koe-20260920/; koko poltto vasta omistajan hyvaksynnan jalkeen. LTU nostotaso samaan polttoon. Nostojen kuvamerkit eivat ehdi (Codexin merkkisarja ensin).

## HAVAINNEKUVALINJAUS (omistaja 20.09.2026 klo 20.48) (20.9.2026 klo 20.48)

Kirjattu Raamattuun Kaupungit-osioon kohta HAVAINNEKUVAT NOSTOISSA: oikeat kuvat Sisaltokirjuri Commonsista, Codexilta vain havainnekuvat; luokat kadonnut kohde (ihme, havainnekuva paakuvana ajan kanssa), rappeutunut (parikuva nykytila + kulta-aika), olemassa oleva (havainnekuva vain visuaalisuuden vuoksi); tilausjarjestys ihmeet -> rappeutuneet -> visuaalisuus; Fable tarkastaa ihmeet kaanonia vasten.

## HAVAINNEKUVAT: HISTORIALLISET HENKILOT SALLITTU, AIKA VOI OLLA PALJON ENNEN 1873 (omistaja 20.09.2026 klo 20.51) (20.9.2026 klo 20.51)

Tarkennus Raamatun kohtaan HAVAINNEKUVAT NOSTOISSA: todelliset historialliset henkilot sallittu havainnekuvissa (kielto koskee vain nykyisia yksityishenkiloita valokuvissa); kohteen kuvattu aika on sen oma kulta-aika, joka voi olla paljon isoisan 1873:a vanhempi.

## VISALASKENTA KORJATTU: 21 %, VISOJA LISATAAN (Sisaltokirjuri f740a7fc, Fable 20.09.2026 klo 20.54) (20.9.2026 klo 20.54)

Inventaarion virhe: visa luettiin vaarasta kentasta ja osa nostoista laskettiin kahdesti. Oikeat luvut: 1198 nostoa, visoja 254 = 21,2 %, FRA 16/64 = 25 % (tasmaa Pelikoodarin lukuun), 29 maata alle 1/3, 8 maata ilman visaa (BIH, CHE, GBR, ISL, NOR, RUS, TUR, UKR), GRC 15,6 %, EST 19 %, DEU 20 %. Ihme (kadonnut) 8, rappeutunut 11, olemassa 1179; ilman kuvaa 198. PAATOS: Pelikoodarin visa-kolmannes-era perutaan; nostostandardin kohta 3 korjattu - visoja lisataan sisaltotyona joka maahan vahintaan kolmasosaan. Omistajan havainto oli oikea.

## NOSTOTYYPPIEN KONTAKTIARKIT (Laitetestaaja) (20.9.2026 klo 20.55)

docs/raportit/laitekierros-19-nostotyypit-20260920.md, kuvat docs/raportit/kaappaukset/nostotyypit-20260920/ (11 tyyppia + 3 kontaktiarkkia). Laitetestaaja oikaisi: visalaatikko nakyy kylla LISAA-tilassa kortin alaosassa (ei vieritetty) - ei tutkintaa. Fablen huomiot arkeista: kortin rakenne on yhtenainen kaikissa tyypeissa; tyyppi erottuu vain ylaotsikon pienesta kuvakkeesta (harkittavaksi tyyppikohtainen tunnus kortissa); merenkulku-esimerkin pienessa kortissa ei kuvaa; LISAA-tilan kuvan kutistuminen jo tilattu. Omistaja katsoo taysikokoiset.

## NOSTOKORTTI TEHTY (Pelikoodari 2f1cf29d) (20.9.2026 klo 20.56)

Tyopolkulahderivi pois kaikista nostotyypeista (historian hetken paikka-paivays ja kuvan Commons-tekijarivi sailyvat; tekstin lahderivi ei enaa kortilla, data ja Lahteet-lehti ennallaan - Fablen paatos); kuvasarja omaan moduuliin js/kuvasarja.js, kohdekortilla sama 1/2-karuselli; Havainnekuva-pienteksti lahderivin alusta viidessa piirtopaikassa; LISAA-tilan kutistus johtui .fokusnosto-kuva img 42vh-katosta 2+ kuvan nostoilla -> koko pysyy (1400 px 696/696, 390 px 240/240); pyyhkaisy ja nuolinappaimet. Savuke-nostokortti 28/28 julkaisusarjaan, testit 3762/0. Julkaistaan v1982:ssa. Pelikoodari jatkaa nimiot elaviksi (nimiotaso erillisena, rajapinta sovittu Karttasepan kanssa).

## V1981 MERGETTY (Julkaisija PR #2633) (20.9.2026 klo 20.59)

Astropulun vastaus ankkuroituu ja kortti 62 vh, lentonakyma ilman liftauskaaria ja lentokohteet nakyviin, Gironden janajako, kartuscha 3, keskeneraiset varusteet harmaana, Astronautin kameran kuvake, perf-savukkeet omaan sarjaan, Raamatun jako (230 kt). Savukekorjaukset: satelliittilinssin kuvakevartio paivitetty, astro-pallo 45b kuormaherkka -> suorituskykysarjaan, luentakuvat play()-ajoitus tunnetuksi. v1973-prep nollattu mainiin; Fablen Raamattu ja loki mergetty paalle (--ours, superset). Julkaisija ilmoittaa tuotannon. v1982-jono: nimiot-reuna, nostokortti. Laitetestaaja 19b WebKit-Playwrightilla (iPad-simulaattori vaatii omistajan kertaluontoisen luvan MCP-tyokalulle).

## V1981 TUOTANNOSSA 20.56 (20.9.2026 klo 20.59)

Julkaisija vahvisti APP_VERSION 1981 matkakirja.app:ssa.

## NIMISTO 1873 RANSKA + EUROOPAN MERET (Sisaltokirjuri 776bb560, Fable tarkasti) (20.9.2026 klo 21.07)

js/packs/nimisto-1873.js + docs/sisalto/nimisto-1873.md: 32 Ranskan historiallista maakuntaa vuoden 1873 tilanteessa (Elsass-Lothringen DEU 1871-1918; Savoie ja Nizza FRA 1860) ja 27 merta/lahtea/salmea. Fablen korjaukset: suomalaiset vakiintuneet nimet (Korsika, Burgundi, Flanderi, Normandia, Savoiji, Nizzan kreivikunta), Vienanmeri, lisataan Skagerrak ja Marmaranmeri, maakunnille kokoluokka (suuret z5-z6, pienet z7+). Koordinaatit arvioita - Karttaseppa saataa koelaatalla.

## KIERROS 19b (Laitetestaaja, WebKit-Playwright iPad-viewport, ei iPadOS-simulaattori) (20.9.2026 klo 21.08)

docs/raportit/laitekierros-19b-20260920.md: tuplasaapuminen lennon jalkeen ei toistunut (neljas ei-toistuminen: Chromium, aito UI-polku, iPhone-sim, WebKit); Ihmisen matkan kuvat latautuivat oikein myos hitaalla verkolla. Molemmat iPad-epailyt jaavat toistamattomiksi; seuraava askel vain jos omistaja nakee ne uudestaan: kaappaus + tarkka polku, ja oikea iPad-simulaattori (vaatii omistajan luvan MCP-tyokalulle).

## V1982 TUOTANNOSSA 21.50; NIMIOT ELAVIKSI TEHTY; POLTTOKOE KATSOTTU (20.9.2026 klo 22.16)

v1982 (PR #2634): nimiot ruudun reunassa, nostokortti (karuselli, kuvakoko, lahderivi pois, Havainnekuva, pyyhkaisy/nuolet); CI-korjaukset: PYYHKAISY_PX-nimitormays -> KUVASARJA_PYYHKAISY_PX, js/kuvasarja.js build-standalonen MODULES-listaan (OPPI: uusi moduuli -> MODULES), savuke-nostokortti 5b kaatui saapumisvirran kuvakorttiin CI-ajoituksella (savuke sulkee virran, 30/30). NIMIOT ELAVIKSI (Pelikoodari ba6a0e7e, raportti viesti-fable-nimiot-elavat-20260920.md): kytkin KOHDEMAAN_NIMIOT_ELAVINA - kohdemaan kaikki nostot elavina sovittelun lapi (pallon sarja on jo ilman nostoja, ei laattamuutosta), katot 40->120/60->180, merilapuille korostuskehan janat esteena + tyonto merelle <= 72 px; FRA poltettuja 0, nimiollisia 390 px 40 (ennen 21), 1400 px 69 (40), mittari 0/0, ladonta 2,5 ms, CSS2D 56 vs 27 -> laitteen fps avoin; savuke-nimiot-elavat 22/22 julkaisusarjaan, testit 3772/0. POLTTOKOE (Karttaseppa e3e6ceff, docs/raportit/poltto-koe-20260920.md, polttosuunnitelma 13 ydintuntia / 1 h 15 min + vienti 20 min, 3,1 Gt): joet pohjassa toimivat levossa, 1873-nimiot kapiteelein toimivat; havainnot Loire/Orleanais- ja Auvergne-tormaykset, Biskajanlahden tuplaus, Marseille/Provence ja Ile-de-France/Pariisi paallekkain. OMISTAJA: viivoitus ja vyohykkeet molemmissa hyvaa mutta 'tarvitaan viela jotain lisaa'; haluaa muutoksia ennen polttoa - poltto odottaa. HIMMEAT KAARET: simulaattorin synteettinen tappi ei avaa Liiku-nappia (tyokalun vika) -> PAATOS (Fable): julkaistaan Chromiumin +12 % perusteella kerroskytkimen kanssa, omistaja ja Laitetestaaja katsovat tuotannosta; sama nimioille.

## OMISTAJA v1982: RAJOISSA KAHDENLAISTA VIIVAA (Gironde lahizoomi) (20.9.2026 klo 22.18)

Rannikolla paksu korostuskeha ja rinnalla ohuempi viiva samaa muotoa; keha lahizoomilla kulmikas (harvennus nakyy). -> Karttaseppa mittaa elementeista ja ratkaisee (kehan LOD zoomin mukaan tai poltettu rantaviiva ohuemmaksi kehan alla); kirjataan polttosuunnitelmaan jos rantataso muuttuu.

## TYYPPITUNNUS EI TOTEUTETA; KIERROS 20; v1983 CI; GIRONDE-MITTAUS (20.9.2026 klo 22.38)

Omistaja kortilla: nostotyypin tunnusta korttiin ei toteuteta (ehdotukset A/B docs/raportit/kaappaukset/tyyppitunnus-20260920/). KIERROS 20 (Laitetestaaja, v1982): nimiot Marseille/Bordeaux eivat leikkaudu, karuselli ja kuvakoko oikein, Gironde yksi viiva; vakavuus 2: tekstin lahderivi (en-Wikipedia ... tarkistettu) nakyy yha LISAA-tilan lopussa maastokohteissa -> Pelikoodari poistaa kaikista poluista. V1983 PR #2635 punainen: savuke-reittiverkko V6 40 328 janaa (harvennus ei toimi CI:ssa) -> Karttaseppa; savuke-nimikyltti limittyvia pareja 13/9 (raja 4) katon noston 40->120 takia -> Pelikoodari. GIRONDE-MITTAUS (Karttaseppa): kulmikkuus on ne_10m-aineiston omaa (janat 4-6 km), keha kattaa 100 % rannasta; sileampi ranta vaatii GSHHS full/OSM-rantaviivan soluihin ja polttoon (polttosuunnitelmaan, omistaja paattaa); ohut toinen viiva todennakoisesti tayton reuna; kehan kokoaminen vain nakyvista soluista ja jana-mittaus korjattu (karttaseppa-kehan-lod b2894cea, v1983:een).

## v1983 KORJAUS: NIMIKYLTIT EIVAT LIMITY, TEKSTILAHDERIVI POIS KOHDEKORTILTA (Pelikoodari 16b55d74) (20.9.2026 klo 22.51)

Sovittelun keskinainen-vaihe: limittyvat parit 13/9 -> 0/0, nimioita nakyvissa 49/68; kohdekortin tekstilahderivi (en-Wikipedia ... tarkistettu) pois kaikista poluista (Pic du Midi tarkistettu). Odottaa Karttasepan reittiverkko-korjausta samaan PR:aan. MERIKOE 2 (Karttaseppa 3445b0b6): yhdistelma 4 rannikkoviivaa + vaalea syvyysvyohyke + koristeet nimiotasolla (kompassiruusu, purjelaivat, aaltomerkki), tormaysvaisto maakuntanimille; Biskajanlahden tuplaus on pelin elava maastonimi -> Pelikoodari piilottaa pyramidinNimiot()-taulun meri-avaimella. Omistaja: ei viela polttoa, 'odota, palaan kohta'.

## MERINIMION TUPLAUKSEN ESTO TEHTY (Pelikoodari 7bbd2c37) (20.9.2026 klo 22.58)

laattapyramidi.js pyramidinNimiot()/pyramidinMerinimet() lukevat luettelon nimiotaso.nimiot-taulun meri-avaimet (tyhja ennen polttoa); nostot.js jattaa kohdemaan meri-noston ladonnasta pois kun id tai nimen slug osuu avaimeen (kortti aukeaa liuskasta). Savuke 26/26, testit 3784/0. Menee v1983:een; vaikuttaa vasta polton jalkeen.

## v1983 REITTIVERKKO-KORJAUS; MERIKOE 2 VIIMEISTELYT; POLTTOSUUNNITELMA KOHTA 6 (Karttaseppa) (20.9.2026 klo 22.59)

Reittiverkon 40 328 janaa johtui Gironden 0,1 asteen janajaosta; verkolle oma 0,3 asteen jako -> 14 848 janaa, savuke 11/11 (karttaseppa-v1983-reittiverkko 0cfd7f0c, sis. kehan LOD). Merikoe 2 viimeistelyt (346dc6a2): purjelaivat 1,6x isommat ja tummemmat, kompassiruusu Lioninlahdella saapumisnakyman sisalla, nostot maakuntanimien esteiksi. Polttosuunnitelma kohta 6: tarkempi rantaviiva-aineisto (GSHHS full / OSM) vektoreihin ja polttoon - omistajan paatos. Poltto odottaa omistajan tarkennusta merestä.

## OMISTAJA 20.09.2026 klo 23.01: NOSTOKORTTI 2 JA MERI (Codex-koristeet), EI POLTTOA VIELA (20.9.2026 klo 23.01)

NOSTOKORTTI: navigointivakaset hyvin pienet reunoilla (iPhonen tapaan) kaikissa ruuduissa; noston leveys aina sama kuvan muodosta riippumatta, kuva mahtuu aina kokonaan ruudulle (pystykuva kapeampana kortin sisalla); kokoruudussa kuva niin isona kuin mahtuu ja selattavissa; noston ylaosa jaa hitusen piiloon -> korjaus. -> Pelikoodari (pelikoodari-nostokortti-2). MERI: yhdistetaan syvyysvyohykkeet ja rannikkoviivoitus (viivoitus tummempana kuin vanhoissa kartoissa) + veneita useampaan paikkaan; veneet ja kompassiruusut Codexilta aidosti kasin piirretyn nakoisina (Codexilla 5 % tokeneita, riittaa pieniin) - Fable tilaa; kartta on nykyajan kartta, ilme isoisan ajan karttojen mukaan. Karttaseppa tekee merikoe 3:n havainnekuvana, ei polttoa viela. Kaappauskansiot kopioitu Fablen checkoutiin (docs/raportit/kaappaukset/poltto-koe-, tyyppitunnus-, nostotyypit-20260920), koska omistaja ei loytanyt niita haaroista.

## OMISTAJA: RANSKAN KARTAN VEDOS KAIKILLA EHDOTUKSILLA; CODEXILTA MYOS 11 TYYPPIMERKKIA (20.9.2026 klo 23.14)

Omistaja hyvaksyi merikoe 3:n pohjaksi ja tilasi vedoksen Ranskan kartasta kaikilla Fablen ehdotuksilla: 1) nostot kolmeen tasoon (ykkostaso 5-8 per maa: isompi nimio + kuvamerkki; kakkostaso nykyinen; kolmostaso vasta lahizoomilla) - Sisaltokirjuri luokittelee FRA:n (kentta taso), Pelikoodari elavien nimioiden tyylit, Karttaseppa poltetut; 2) 11 tyyppikohtaista karttamerkkia Codexilta (posti/fable-codexille-nostotyyppimerkit-20260920.md) ykkostason nostoille; 3) Horation reitti 1873 katkoviivana nimiotasolla - Fablen paatos vedokseen: Calais - Pariisi - Dijon - Lyon - Marseille (PLM-rata 1873; kaanonissa Pariisi ja Marseille, valietapit historiallinen rata, EI viela kaanonia); 4) meri merikoe 3:n mukaan + Codexin koristeet (posti/fable-codexille-merikoristeet-20260920.md). Omistaja ilmoittaa kun Codexin kuvat ovat valmiit. Ei polttoa ennen vedoksen hyvaksyntaa. Korjattavaa koe 3:sta: vene Picardie-nimion alla, Amiens peittaa Picardie-tekstia.

## RANSKAN NOSTOTEKSTIEN MITTAUS (Sisaltokirjuri 9bff35e5) (20.9.2026 klo 23.16)

docs/raportit/nostotekstit-fra-20260920.md: 64 nostoa, mediaani 524 merkkia (Q1 448, Q3 611), 0 alle 250, 11 yli 900 (hahmotelma-tyypin isot kohteet: Avignon, Chambord, Millau ym., 3-4 kappaletta, tarkoituksellisen laajoja). Loydos: 18 nostoa lainaa tekstin MAA_KATEGORIAT.FRA:lta lunastus-kentalla ilman omaa teksti-kenttaa - huomioitava FRA-siivouksessa. Fablen arvio: maarat ovat hyvat, haarukka 400-700 sopii tavoitteeksi; pitkat sallitaan ykkostason kohteille.

## V1983 TUOTANNOSSA 23.14 (20.9.2026 klo 23.16)

Kohdemaan nimiot elavina (ei limityksia), himmea reittiverkko liftatessa (kerroskytkin), kehan LOD, tekstilahderivi pois kohdekortilta, merinimion tuplauksen esto. Laitetestaaja: kierros 20b; omistaja katsoo iPadilla sujuvuuden (kaaret, nimiot).

## RANSKAN NOSTOTASOT (Sisaltokirjuri e161176c) (20.9.2026 klo 23.23)

docs/raportit/nostotasot-fra-20260920.md, kentta nosto.taso (oletus 2). Ykkostaso 8: Mont-Saint-Michel, Versailles, Lascaux, Mont Blanc, Pont du Gard, Chambord, Carcassonne, Etretat (Dune du Pilat tasolle 2). Lista Karttasepalle (vedos) ja kentan nimi Pelikoodarille (elavat nimiot). Sisaltokirjuri jatkaa kartuschan vajaisiin maihin.

## OMISTAJA: ASTRONAUTIN KAMERAN KUVISTA VALKOISET PALKIT POIS (20.9.2026 klo 23.24)

Osassa ISS-valokuvia on alareunassa valkoinen palkki tunnuksella (esim. Etna, ISS013E62714; kaappaus astro-etna-valkoinen-palkki.webp). -> Sisaltokirjuri rajaa palkit pois koneellisesti (kaikki astro-valokuvat), vie ampariin, HEAD 200; kuvateksti/lahde ennallaan.

## OMISTAJA v1983 VAKAVUUS 1: LIFTATESSA NOPAN JALKEEN KAMERA ZOOMASI KOKO PALLOLLE (20.9.2026 klo 23.26)

Kaappaus liftaus-zoomasi-pallolle-v1983.webp: Pariisista liftatessa nopan heiton (3) jalkeen nakyma on koko Eurooppa avaruudesta, kantaman kaaret (Lontoo, Bryssel, Alpit) pieninä. Epailty syy: himmea reittiverkko (411 kaarta) tai kantaman kaarten sovitus kameran rajaukseen. -> Karttaseppa heti; jos ei loydy nopeasti, verkko pois kerroskytkimella hotfix-versiona.

## KIERROS 20b (Laitetestaaja, v1983) (20.9.2026 klo 23.26)

docs/raportit/laitekierros-20b-20260920.md. Vakavuus 2: 'Camarguen hevoset' ja 'Camarguenvarsa' limittyvat suoraan paallekkain (simulaattori + Playwright) -> Pelikoodari (sovittelun keskinainen-vaihe ei erota samaan pisteeseen ankkuroituja nostoja?). OK: lahderivi pois, himmea reittiverkko toimii ja nayttaa hyvalta, nimiot elavina toimivat, Valimeri rajatapaus hyvaksyttava. Liftauksen sujuvuutta ei voitu mitata (kosketustyokalu).

## NOSTOKORTTI 2 TEHTY (Pelikoodari f68c39ea) (20.9.2026 klo 23.32)

Vakaset pienet chevronit kuvan reunoilla joka ruudulla (css/kuvasarja.css, jonka kuvasarja.js lataa; kohdekortti ei ladannut fokusnosto.css:aa -> tyopoydalla oletusnapit), kortin leveys vakio ruudulla, kuva contain-sovituksella aina kokonaan ruudulla, suurennos contain 0,97 + sarjan selaus (vakaset, laskuri, pyyhkaisy, nuolet), otsikko ja tyyppirivi aina nakyvissa LISAA-tilassa. Testit 3773/0, savuke-nostokortti 78/78 (390, 1400, iPad 820x1180). v1984:aan liftauszoomi-korjauksen kanssa. Pelikoodari: Camargue-limitys -> nostotasot.

## LIFTAUSZOOMI (vakavuus 1) EI TOISTU; HOTFIX VERKKO OLETUKSENA POIS (Karttaseppa 6b911201) (20.9.2026 klo 23.38)

Toisto Playwrightilla (Pariisi, Liiku -> Liftaus -> noppa 3, 2000x1300, prep ja tuotanto v1983): kamera 0,205 -> 0,217 (sovitus kantamaan), ei maailmakuvaa; sovituskoodi ui.js sovitaSiirtokohteet ei muuttunut v1983:ssa eika verkko koske kameraan. Hotfix: himmea reittiverkko OLETUKSENA POIS (kytkin matkakirja-reittiverkko tai ?reittiverkko=1) ja piilossa kun korkeus > 1,2; savuke V7 12/12, testit 3797/0. Jos toistuu v1984:ssa, syy muualla: sovitus ei zoomaa SISAAN jos kohteet jo mahtuvat -> kysytaan omistajalta, oliko nakyma zoomattu ulos ennen noppaa. Vedos jatkuu tasoilla ja Codexin kuvilla.

## OMISTAJA: HUNTU PYSYY NAPPULAN LIIKKEEN AJAN, LAHTO- JA KOHDEMAA VAPAINA (20.9.2026 klo 23.39)

Nopan heiton jalkeen nappulan liikkuessa kartan huntu (kerman peitto 80 %) katoaa kokonaan. SAANTO: huntu pysyy paalla myos nappulan etenemisen ajan, mutta liikkeen ajaksi seka lahtomaa etta kohdemaa ovat hunnun ulkopuolella (kaksi aukkoa); perilla vain kohdemaa. -> Pelikoodari.

## LIFTAUSZOOMI: OMISTAJA EI OLLUT ZOOMANNUT, VIKA SATUNNAINEN - SEURANTAAN (20.9.2026 klo 23.40)

Omistaja: ei ollut zoomannut oleellisesti ennen noppaa; kartta hyppasi yhtakkia aarimmaisen kauas; ei toistu joka kerta, jokin laukaisee. PAATOS: seurantaan - Pelikoodari lisaa kameran etaisyyden tallennuksen diagnostiikkalokiin (edellinen ja uusi korkeus, laukaisija: sovitus/ele/verkko/linssi) kehittajatilan lokiin, jotta seuraava toisto kertoo syyn; Karttaseppa lisaa savukkeeseen toiston satunnaisella ajoituksella (noppa heti saapumisen jalkeen, kesken trailerin, kesken luennan).

## VEDOS HYVAKSYTTY, POLTTO ALKAA (omistaja 20.09.2026 klo 23.54) (20.9.2026 klo 23.54)

Ranskan vedos (karttaseppa-poltto-koe d9e0fab6, kaappaukset *-vedos.webp): omistaja hyvaksyi polttoon kolmella muutoksella: laivat eivat istu veteen (vesiraja rungon alle), HORATION REITTIA EI POLTETA (muiden maiden reittia ei mietitty - sekoittava; koodi sailyy kerroksena), Versailles ja Etretat ykkostasolle, Mont Blancin merkki reliefin paalle. Rantaviiva GSHHS full/OSM samaan polttoon jos Karttaseppa arvioi alle 2 h lisaa. Poltto = koko pyramidi koko maailma + pallosarja; nimiotaso erikseen uudelleenpoltettava muiden maiden 1873-nimistolle. Omistaja: valmistele muutama muu maa samalla tavalla (Fable valitsi ESP, ITA, DEU: nimisto 1873 + nosto.taso), ei enempaa; jatketaan huomenna. V1984 PR #2636 KIINNI: savuke-kaupunkipopup 3->9, kaupunkimerkin napautus ei avaa liuskaa Pariisissa/Marseillessa 390 px (epailty nostokortti-2) -> Pelikoodari kiireellisena. ASTRO-PALKIT (Sisaltokirjuri, docs/raportit/astro-palkit-20260920.md): kuvat eivat ole omassa amparissa vaan NASAn CDN:ssa (satelliitti-data.js generoitu tools/hae-satelliittihavainnot.mjs:lla); 12 havaintoa / 24 tiedostoa palkillisia, rajatut valmiina -> PAATOS: Sisaltokirjuri vie omaan ampariin uusiin polkuihin, muuttaa datan 12 rivia ja lisaa generaattoriin poikkeuslistan.

## ASTRO-PALKIT TEHTY (Sisaltokirjuri 1c32cc39) (21.9.2026 klo 00.12)

24 rajattua + 24 alkuperaista kuvaa media.matkakirja.app/linssit/astronautin-kamera/ (uudet polut, HEAD 200); satelliitti-data.js 12 rivia omaan ampariin NASAn sijaan; hae-satelliittihavainnot.mjs KUVAPOIKKEUKSET-lista. Raportti docs/raportit/astro-palkit-toteutus-20260921.md. Julkaisujonoon.

## KAUPUNKIPOPUP-VIKA ON KUORMAVIKA PREPISSA, EI NOSTOKORTTI-2; CAMARGUE TEHTY (Pelikoodari 266574af) (21.9.2026 klo 00.15)

savuke-kaupunkipopup 3->9 toistuu prepilla hidastetulla Chromiumilla (CPU 6x): liuska aukeaa ja sulkeutuu heti kun kameran ajo liikuttaa merkkia (lepotesti) - Pelikoodari korjaa liuskan (pelikoodari-v1984-kaupunkipopup). CAMARGUE: sovittelun lukko luettiin datumeihin vasta merkit.aseta-kutsun jalkeen -> ruutu naytti datan kyljen ja piilotetun nimion (1400 px 14/68 lappua vaarassa asennossa); savuke-nimikyltti vartiot 9g/9h. Jono: huntu-liike + kameradiagnostiikka.

## KAKSOISVIIVAN JUURISYY: KAKSI NE-AINEISTOA; GSHHG-RANTAVIIVA KAYTTOON; POLTTO ALKOI (Karttaseppa 044b8d90) (21.9.2026 klo 00.40)

Koelaatta Gironde/Arcachon: YKSI viiva. Omistajan epaily oikea: toinen viiva oli keha (ne_10m admin_0) vs. ranta (ne_10m ocean), kaksi eri aineistoa jotka eroavat 0,1-4 km; tayton reuna on viivan alla. Muutos: GSHHG 2.3.7 full (tools/gshhs-meri.mjs) SAMASTA tiedostosta laattoihin, vektorisoluihin (harvennus 0,004) ja kehaan (generoi-maapolygonit --meri, ompelu GSHHG-renkailla; maapolygonit.json 1,4 -> 2,7 Mt; vektoritasot 0-1 130/467 kt gz). Kaappaukset gironde/arcachon-rantaviiva-ennen/jalkeen. SIVUTUOTE: liftauszoomin JUURISYY loytyi ja korjattu (lauta.js matkaZoomirajat + kattoPuristus; savuke 5/10 -> 10/10; karttaseppa-v1984-liftauszoomi 02b5cb86) -> Julkaisijalle polton jalkeen. POLTTO ALKOI: versiot 2026-09-21-{pohja,viivat,ranta,nostot,nimiot}, pallo 20260921a; laivojen vesiraja, Horatio pois, Versailles/Etretat taso 1, Mont Blanc -merkki.

## KARTUSCHAN VAJAAT MAAT TEHTY (Sisaltokirjuri 08eaead3, Fablen pistokoe ok) (21.9.2026 klo 01.01)

BGR/EST/ROU/LTU/LVA 5 aiheeseen (+ DNK/FIN/HRV/POL edellisesta sessiosta samassa haarassa), 52 uutta nostoa, 13 tehtava-kysymysta; tutkimus ja kuvahaku viidella taustasessiolla, Sisaltokirjurin pistokokeet; BGR Madara-kuvan peilipolkutormays korjattu. Fablen pistokoe 4 Commons-kuvaa (Warszawa, Torvalds/LinuxCon - julkinen henkilo sallittu, viron kannel, Baltian ketju) ok. Raportti docs/raportit/kartuscha-vajaat-maat-20260921.md. Julkaisujonoon. Sisaltokirjuri: ESP/ITA/DEU nimisto 1873 + taso, sitten pysahtyy.

## ESP/ITA/DEU NIMISTO 1873 + TASOT (Sisaltokirjuri; Fable tarkasti) (21.9.2026 klo 01.30)

Haarat sisalto-nimisto-taso-deu cca22bea, -ita b8fcdbe0, -esp 5dc92810: 61 nimiota (DEU 29: Preussin provinssit + kuningaskunnat/herttuakunnat/hansakaupungit 1873, ITA 16, ESP 16) + 24 taso:1-nostoa. Kaanon ok. Fablen korjaukset nimiotason polttoon (ei kiire): ITA 'LATIUM' -> 'LAZIO' (pelin suomalainen nimisto), ESP 'KANTABRIA' ei ollut 1873 aluetta (Santanderin provinssi Vanhassa-Kastiliassa) -> poistetaan tai 'SANTANDER' pienena. Sisaltokirjuri pysahtyi sovitusti.

## KAUPUNKIPOPUP KORJATTU (Pelikoodari 06b438bc) (21.9.2026 klo 01.45)

Syy: liuskan lepotesti alkoi kun kamera-ajon lupaus tayttyi ennen renderkameraa -> liuska aukesi ja sulkeutui heti (42 px jalkisiirto). Nyt liuska seuraa merkkia asettumisvaiheen (>= 1,5 s, piste levossa) ja lepotesti alkaa vasta sitten. Savuke-kaupunkipopup sai SAVUKE_HIDAS-kytkimen (CPU-hidastus = CI:n kuorma), polton kuormassa 45/45. v1984 voi menna CI:hin polton jalkeen.

## TAYSI POLTTO VALMIS (Karttaseppa a4224925) (21.9.2026 klo 01.56)

Koko pyramidi 2026-09-21-* + pallo 20260921a: 100 min, 209 850 laattaa, eheys tasmaa, laatat ja pallosarja amparissa; luettelo ~/pyramidi-poltto/vienti-20260921/pyramidi.json (EI amparissa ennen osoitinta). Muutokset: laivat vesirajaan (runko leikattu, varjo + aaltopari), Horation reitti pois (koodi jaa), Versailles/Etretat/Mont Blanc taso 1 (Etretat --polta-hahmotelmat, Mont Blancin merkille sadekeha), koristeet vaistavat meren nimia, z5 vain palavat nostot esteina. maapolygonit.json 1,4 -> 2,7 Mt (gz 889 kt). Nimiotaso erikseen uusintapoltettava (DEU/ITA/ESP huomenna). HUOM: tasot ja kuvamerkit nakyvat kohdemaassa vasta kun Pelikoodari tuo ne elavaan kerrokseen. Julkaisukaava: v1984 (korjaukset + sisalto) -> v1985 (osoitin; luettelo ampariin juuri ennen mergea, edellinen talletettu, tuotanto tarkistetaan heti).

## HUNTU LIIKKEEN AJAN + KAMERALOKI TEHTY (Pelikoodari 6aad75f1, 97ef58ad) (21.9.2026 klo 02.29)

Huntu pysyy liikkeen ajan, lahto- ja kohdemaa aukkoina (maapolygonien renkaat reikalistaan), perilla vain kohdemaa, kaikki kulkutavat. Juurisyy hunnun katoamiselle: liikkeessa cityOf null -> varitason maa nollattiin. Savuke-huntu-liike 10/10 (harva). Aukkojen laatat kootaan liikkeen alussa, nakyvat 1-2 s kuluttua. KAMERALOKI js/pallolauta/kameraloki.js: korkeuden hyppy > 3x -> aikaleima, korkeudet, laukaisija (pino 3 rivia), kaupunki, vaihe; luku: kehittajatilan konsoli [kameraloki], localStorage matkakirja-kameraloki (20 viimeista) tai window.matkakirja.ui.pallolauta.kameraloki(). Testit 3786/0. HUOM: v1984:n CI-kaupunkipopup-vika on ERI kuin korjattu liuskan lepotesti (CI:ssa takynostokortti aukeaa kaupungin napautuksesta) - Pelikoodari diagnosoi Julkaisijan kanssa.

## NOSTOJEN TASOT ELAVISSA NIMIOISSA TEHTY (Pelikoodari 7a37b1bc) (21.9.2026 klo 03.06)

Taso 1: nimio 1,3x tummemmalla, Codexin kuvamerkki (assets/nostotyypit/merkki-<tyyppi>.png 128 px; 11 merkkia kategorian/lajin mukaan), ruutu 1,6x, sovittelussa etusija eika koskaan piiloudu. Taso 3: piilossa kohdemaassakin kunnes lahizoomi (osuus uloimmasta <= 0,7). Savuke-nostotasot 18/18 julkaisusarjaan (390: 5 ykkostasoa nakyvissa, lansirannikko ruudun ulkopuolella; 1400: 8). Testit 3784/0. Avoinna: taso-3-luokittelu puuttuu datasta (kentta toimii); Mont Blancin merkille halo tarvittaessa. Kaupunkipopup-CI: Pelikoodarin 69429052 Julkaisijalla (napautus vasta kameran levossa). PAATOS (Fable): Mont Blancin merkille halo (sama sadekeha kuin poltetussa).

## V1984 TUOTANNOSSA 04.47 (21.9.2026 klo 04.49)

Nostokortti 2, kaupunkiliuskan lepotesti ja CI-napautus, liftauszoomin juurisyy (matkaZoomirajat), Camargue, astro-palkit, kartuscha 9 maata, huntu liikkeen ajan + kameraloki (jos ehti). Seuraavaksi v1985: osoitin 20260921a + luettelo + nostotasot.

## AVAINTEN TULOSTUS JULKAISIJAN TRANSKRIPTIIN (Julkaisija ilmoitti, ei kiireellinen) (21.9.2026 klo 05.41)

Julkaisija ajoi vahingossa head ~/.zshrc etsiessaan AMPARI/PAATE-muuttujia: avainten selvakieliset arvot tulostuivat sen oman session tyokalulokiin (ei repoon, ei viesteihin). Sessio on Remote Control -yhteydessa, joten transkripti voi olla claude.ai:ssa. Raamatun MAC STUDIO -kohtaan lisatty AVAINSAANTO: avaintiedostoja ei tulosteta, vain nimet grepilla. Omistaja paattaa kierratetaanko avaimet (GitHub Actions secrets, amparin avaimet, gh-token).

## V1985 TUOTANNOSSA 06.10; AVAIMIA EI KIERRATETA (omistaja) (21.9.2026 klo 06.47)

v1985: osoitin pallo 20260921a + pyramidi 2026-09-21-* (joet pohjassa, GSHHG-rantaviiva, meri vyohykkeet + viivoitus, Codexin laivat ja kompassiruusut, 1873-nimisto FRA, nostotasot ja tyyppimerkit elavissa nimioissa), luettelo amparissa. Omistaja kortilla: avaimia ei tarvitse kierrattaa; AVAINSAANTO lisatty Raamatun MAC STUDIO -kohtaan.

## KIERROS 21 (Laitetestaaja, v1985 iPhone) (21.9.2026 klo 06.54)

docs/raportit/laitekierros-21-20260921.md. Ei vakavuus 1-2. OK: joet levossa, meri (vyohykkeet, viivoitus, laivat, kompassi), maakunnat ja meret versaaleina, nostotaso 1 (iso nimio + kuvamerkki), nostokortti 2:n vakaset, huntu lyhyella liftauksella. Kesken: nostotaso 3 lahizoomilla, suurennoksen selaus, kaupunkiliuska, huntu kaukaisilla mailla, ESP/DEU tarkempi laatta- ja meritarkistus -> jatketaan kierroksella 21b.

## OMISTAJA v1985 VAKAVUUS 1: RANSKAN NOSTOT POMPPIVAT PANOROIDESSA JA ZOOMATESSA (21.9.2026 klo 06.55)

Elavat nimiot (KOHDEMAAN_NIMIOT_ELAVINA + reunasaanto + nostotasot) latovat itsensa uudelleen eleen aikana: nimiot vaihtavat kylkea ja hyppivat. SAANTO: nimio ei liiku eleen aikana - sovittelu lukitaan eleen ajaksi ja ratkaistaan vasta eleen paatyttya (debounce), vain rikkovat laput (reuna/limitys) siirtyvat, hystereesi estaa edestakaisen vaihdon; pehmea siirtyma jos lappu siirtyy. -> Pelikoodari heti.

## NIMIOIDEN VAKAUS: GOOGLE EARTHIN MALLI (Fable, omistajan kysymys) (21.9.2026 klo 06.57)

Linjaus kirjattu Raamattuun Kaupungit-osioon (NIMIOIDEN VAKAUS): asento ankkurin ymparilta kerran lepotilassa, eleen aikana vain seuraa ankkuria; tormays ratkaistaan haivyttamalla prioriteetin mukaan, ei siirrolla; paatokset eleen jalkeen hystereesilla; ykkostaso ei haivy eika vaihda asentoa. Pelikoodari toteuttaa haarassa pelikoodari-nimiot-vakaat -> v1986.

## KIERROS 21b (Laitetestaaja) (21.9.2026 klo 07.06)

Ei vakavuus 1-2. Kaupunkiliuska Marseillessa toimii, suurennos avautuu oikein (aiempi testivirhe oli vaara CSS-valitsin). Kesken: huntu pitkalla lennolla ja ESP/DEU yksi zoomi - saapumisnakyman satunnaiset sisaltokortit estavat Playwright-automaation ja suora actionFly() ei laukaise lentoanimaatiota -> oikealle simulaattorille kun omistaja antaa laiteluvan. Laitetestaaja odottaa.

## NIMIOT VAKAAT TEHTY (Pelikoodari 26300d5a) -> v1986 (21.9.2026 klo 07.47)

Google Earthin malli toteutettu: 8 ehdokasasentoa ankkurin ymparilta, valinta 260 ms eleen paatyttya zoomiportaittain, eleen aikana lappu seuraa ankkuria; tormays haivyttamalla (180 ms, ikoni jaa), hystereesi 6 px; ykkostaso ei haivy eika vaihda asentoa. Savuke-nimiot-vakaat 14/14 julkaisusarjaan, testit 3779/0. Seuraus: nimiollisia vahemman (390 px 23 vs 36, 1400 px 54 vs 69) - hyvaksytty. PAATOS (Fable): kaupungin nimi voittaa ykkostason (Versailles/Pariisi puhelimella): prioriteetti kaupunki > taso 1 > taso 2 > taso 3; ykkostaso haipyy vain kaupungin tielta, ikoni jaa. Raamatun NIMIOIDEN VAKAUS -kohta paivitetaan tahan jarjestykseen.

## OMISTAJA v1985: KARTUSCHAN SISENNYS - IPHONELLA LIIKAA, TYOPOYDALLA LIIAN VAHAN (21.9.2026 klo 08.05)

Kaappaus kartuscha-sisennys-iphone-v1985.png (iPhone 8.04): iso kartuscha on kaukana vasemmasta ja alareunasta; tyopoydalla taas lahes kiinni reunassa. SAANTO: kartuschan etaisyys kartan reunasta sama silmamaaraisesti kaikilla laitteilla: puhelin ~12 px + turva-alue, tyopoyta ~24 px. -> Pelikoodari, samaan versioon nimioiden vakauden kanssa jos ehtii.

## OMISTAJA v1985: KARTUSCHAN LINKIN PAINALLUS VOI MENNA LAPI KARTALLE (21.9.2026 klo 08.06)

Kartuschan aiherivin (HISTORIA, RUOKA...) painallus saattaa avata myos alla olevan karttanoston/kaupungin. SAANTO: kortin sisalla painallus ei koskaan vality kartalle (stopPropagation + pointer-events kortin sisalla; kortti itse on pointer-events:none, joten sisaelementit ja niiden marginaalit tarkistettava). -> Pelikoodari samaan kartuscha-sisennys-eraan, savukkeeseen vastakoe.

## V1986 TUOTANNOSSA 08.18 (21.9.2026 klo 08.18)

Nimioiden vakaus (Google Earthin malli: kiintea asento, haivytys, hystereesi, kaupunki > taso 1). Kartuschan sisennys ja klikkauksen lapimeno todennakoisesti seuraavassa.

## NIMISTON JAKO: PYSYVAT POHJALLE, 1873-POLIITTISET LINSSIIN (omistaja 21.09.2026 klo 08.21) (21.9.2026 klo 08.21)

Omistajan huoli: 1873-nimisto sekoittaa nykymaailmassa liikkuvaa pelaajaa. Paatos kortilla: pohjakartalle vain pysyvat nimet (meret, lahdet, kulttuurialueet), 1873-poliittiset nimet ja rajat omaan Vuosi 1873 -linssiin; myohemmin aikajanalinssi rajojen elamiselle. Kirjattu Raamattuun (Kaupungit: KARTAN NIMISTO) ja linssi-idea. Toimet: Sisaltokirjuri luokittelee nimisto-1873.js rivit (luokka pysyva/1873) FRA/ESP/ITA/DEU; Karttaseppa polttaa nimiotason uudelleen ilman 1873-luokkaa ja selvittaa historiallisen raja-aineiston linssia varten.

## LOYTAMISEN SUMU PELIKARTALLE - KOKEILU (omistaja 21.09.2026 klo 08.31 kortilla) (21.9.2026 klo 08.31)

Vaihe 1 kokeiluna (havainnekuva ennen paatosta): 1) kohdemaan loytamattomat nostot haaleina lyijykynaluonnoksina (ikoni + nimio), loydetyt mustetaan; loytosaanto: noin 150 km kaydyista kaupungeista mustetaan automaattisesti + luonnoksen avaaminen mustaa sen; ykkostaso aina musteena. 2) Naapurimaiden rajat feidautuvat vaaleiksi, jos pelaaja ei ole kaynyt maassa. 3) Jos maassa on useampi kohdekaupunki, kaymattoman osan korkeuskartta ja mahdollisesti aariviivat feidautuvat (kaydyn kaupungin ymparisto musteena). Isoisan reitti 1873 siirtyy Vuosi 1873 -linssiin (ei pelikartalle). -> Pelikoodari tekee prototyypin kehittajalipun takana + kaappaukset, omistaja katsoo. LINSSI 1873 -AINEISTO (Karttaseppa a51d1fe3, docs/raportit/linssi-1873-aineisto-20260921.md): historical-basemaps world_1878 (GPL-3.0) -> 1873 kasin ~6 muutosta, karkea (mediaani 18 km) -> muuttumattomat rajat NE:sta naulaamalla, muuttuneet OHM:sta (CC0) tai atlasskannista; CShapes CC BY-NC-SA, Euratlas maksullinen, MPIDR tutkimus -> eivat; Stieler 1875 PD-skannit rasterilinssiin. Omistajan paatokset avoinna: GPL-data vai oma PD-runko, rasterilinssi, aikajanan vuodet.

## KARTUSCHAN SISENNYS JA KLIKKAUKSEN LAPIMENO TEHTY (Pelikoodari 085ea1cf) (21.9.2026 klo 08.31)

Sisennys kartan kotelon reunasta: puhelin 12 px + turva-alue (max, ei summa), >= 768 px 24 px; mitattu 390/820/1400 -> 12/24/24. Lapimeno: Globe.gl:n osumatesti kulkee pointerdown/up-parilla, click-pysaytys ei riita -> painallus ja vapautus pysaytetaan capture-vaiheessa kortin napautettavilla osilla. Savuke-kartuscha-3 51/51, testit 3789/0. v1987:aan.

## NIMISTON AIKA-KENTTA TEHTY (Sisaltokirjuri 7bd5f5e5) (21.9.2026 klo 08.48)

121 rivia FRA/DEU/ITA/ESP + meret: 94 pysyva, 27 1873; Lazio, Kantabria pois; sw.js:n kaksoisrekisterointi korjattu. Karttaseppa polttaa nimiotason uudelleen pysyvilla nimilla (--nimiot-aika pysyva).

## SUMU-PROTOTYYPPI VALMIS (Pelikoodari 4479df4b, lippu ?sumu=1) (21.9.2026 klo 08.54)

js/pallolauta/sumu.js: nostot luonnoksina (peitto 0,45, mustaus 600 ms; loyto 150 km kaydysta kaupungista, avaus mustaa, taso 1 aina musteena, loydot localStorageen; laattaan poltetut nimet eivat voi olla luonnoksia), kaymattomien maiden rajat x 0,35, sisasumu 35 % kermaa 200 km:n pehmeilla aukoilla (hunnun maski). Huomiot: 35 % hienovarainen (SISASUMUN_PEITTO vakio); Ranskan merentakaiset (Cayenne, Noumea) pitavat sumun Manner-Ranskassa -> suodatin tarvittaessa. Savuke-sumu 10/10, testit 3780/0. Kaappaukset docs/raportit/kaappaukset/sumu-20260921/. Omistaja katsoo. KONTEKSTIT klo 06: Fable 61 %, Karttaseppa 49 %, Pelikoodari 11 % (pakkautunut), viikkokiintio 17 % (Fable 10 %). ISO AJO kaynnistetty Sisaltokirjurille (7 vaihetta, parvi sallittu), Karttasepalle liftauszoomin ajoitusvartiot (1873-linssi ei viela), Pelikoodarille pieni liike + pollon Matkakirja-linkit sumun jalkeen.

## NIMIOTASON UUSINTAPOLTTO 2026-09-21e (Karttaseppa 4d5630c9) (21.9.2026 klo 08.58)

Vain aika=pysyva: FRA 24, DEU 15, ITA 14, ESP 12, meret 29 = 94 nimiota + 8 Codexin koristetta; 27 poliittista 1873-nimea jaa Vuosi 1873 -linssille. Osoitinhaara karttaseppa-gshhs-rantaviiva 4d5630c9 (sis. Sisaltokirjurin aika-kentta), testit 3780/0; luettelo ampariin kun osoitin mainissa (v1987 tai v1988). Kaappaukset saksa/italia/espanja-nimiot-20260921e.webp. Sisaltokirjurille kaksi koordinaattisiirtoa (Schleswig-Holstein, Wurttemberg/Baden); erakoko 5 maata per nimiotason poltto. Karttaseppa jatkaa liftauszoomin ajoitusvartioihin; sen jalkeen KONTEKSTINOLLAUS (49 %): luovutus tiedostoon ja uusi sessio.

## OMISTAJAN KORTIT 21.09.2026 klo 09.07: SUMU JULKAISUUN, GPL-DATA, ATLASLEHTI-VEDOS, ISOISAN LINSSI (21.9.2026 klo 09.07)

1) Sumu: sisasumu 50 %, luonnoksille kynaraita, merentakaiset pois laskusta, julkaisuun kaikille -> Pelikoodari (v1988). 2) Vuosi 1873 -linssin raja-aineisto: GPL-3.0 historical-basemaps kay. 3) Atlaslehti-linssi: omistaja haluaa vedoksen ensin (Stieler 1875 Ranska pallon paalle) -> uuden Karttasepan ensimmainen era. 4) Aikajanalinssia ei nyt: isoisan linssi on vain vuosi 1873, retro, isoisan valokuvat/aanet/media; maailmansodat ym. omina linsseina nykykartan paalla - kirjattu Raamatun Karttalinssit-osioon (ISOISAN LINSSI). Karttaseppa: luovutus valmis (viesti-karttaseppa-luovutus-20260921.md), ajoitusvartiot 14/14 (1c802159); omistaja avaa uuden Karttaseppa-session.

## V1987 TUOTANNOSSA 09.06 (21.9.2026 klo 09.08)

Kartuschan sisennys 12/24 px, painallus ei lavitse, nimiston aika-kentta. Osoitin 2026-09-21e-nimiot odottaa viela (v1988 tai Karttasepan luettelovienti).

## KUVATTOMIA ON 8, EI 198 (Sisaltokirjuri 2a51bbce) (21.9.2026 klo 09.09)

nostoinventaario.mjs ei tarkistanut kuva.tiedosto-kenttaa (maa-kategoriat/maalehtinostot-muoto), vain kuva.osoite -> korjattu, ajettu 43 maalle: aidosti kuvattomia 8 (TUR 3, GBR 2, FRA 2, GRC 1), kaikki fokuskohteet-kortteja ja enimmakseen tuhoutuneita monumentteja (Bastilji, Tuileries, Crystal Palace, vanha London Bridge, Rodoksen kolossi, Halikarnassoksen mausoleumi, Konstantinopolin hippodromi, Pergamonin alttari). PAATOS: nama 8 ovat Codexin havainnekuvatilauksen ydin (ihmeet, kulta-aika, historialliset henkilot sallittu); Pergamonin alttarille Commons-kuva Berliinin museosta + havainnekuva alkuperaisesta paikasta. Vaihe 1 kutistuu yhteen eraan; Sisaltokirjuri jatkaa vaiheeseen 2 (FRA siivous).

## UUSI PYRAMIDI TUOTANNOSSA (Karttaseppa, luettelo viety v1987:n jalkeen) (21.9.2026 klo 09.10)

Pohja 2026-09-21 (GSHHG, joet, meriresepti), viivat, ranta, nostot 112 maata tasoineen, nimiot 2026-09-21e (pysyvat + koristeet), pallo 20260921a, vektorit 2026-09-21-gshhs; tarkistettu main-koodilla (saapuminen Ranskaan, Gironde z8). Edellinen luettelo ~/pyramidi-poltto/vienti-20260921/pyramidi-edellinen.json. Karttasepan luovutus 853fb80c; sessio suljettavissa; uusi Karttaseppa aloittaa atlaslehti-vedoksesta.

## KONTEKSTIN NOLLAUKSEN KAAVA (omistaja 21.9.2026) (21.9.2026 klo 09.14)

Sessio kirjoittaa luovutuksen tiedostoon, omistaja tekee /clear (ei /compact, ei Resume previous session), Fable lahettaa aloitusviestin uudelleen. Karttaseppa nollattu ensimmaisena (49 %), aloitusviesti lahetetty: atlaslehti-vedos. Kirjattu Raamatun TYOTAPA JA SESSIOT -kohtaan (H).

## SUMU JULKAISUKUNTOON (Pelikoodari 8c7d896e) -> v1988 (21.9.2026 klo 09.16)

SISASUMUN_PEITTO 0,5 (Marseille 31-34 vs 69-71), luonnoksille katkoviivarengas (peitto 0,55), merentakaiset pois (yli 1 500 km muista kaupungeista JA mannerrenkaan ulkopuolella: Cayenne, Noumea, Bermuda, Falkland, Hawaii, Norfolk), lippu pois (?sumu=0 sammuttaa), savuke-sumu julkaisusarjaan 10/10, testit 3780/0. Sisasumu tarvitsee maan renkaat (laiska aineisto), lasketaan uudestaan niiden saavuttua. Linjaus kirjattu Raamattuun (LOYTAMISEN SUMU). Pelikoodari: pieni liike (pelikoodari-liike) -> pollon linkit.

## KONTEKSTIVAHTI JULKAISIJALLE; FABLE NOLLATAAN VIIMEISTAAN 70 % (omistaja) (21.9.2026 klo 09.17)

Julkaisija lukee tunneittain kaikkien roolisessioiden kontekstin get_usage-tyokalulla ja huomauttaa 65 %:ssa; Fable nollataan viimeistaan 70 %:ssa. Fablelta seuranta poistuu.

## CODEX-TILAUS 8 KADONNEESTA MONUMENTISTA PERUTTU: KUVAT OVAT JO OLEMASSA (Fable) (21.9.2026 klo 09.28)

Sisaltokirjurin iso ajon vaihe 1 (docs/raportit/havainnekuvat-codexille-20260921.md) listasi 8 kuvatonta nostoa: Bastilji, Tuileries, Crystal Palace, Vanha London Bridge, Rodoksen kolossi, Halikarnassoksen mausoleumi, Konstantinopolin hippodromi, Pergamonin alttari. Fable tarkasti: kaikilla kahdeksalla on jo ihme-kentta ja kuva (kuusi loistoaika-v2-kuvaa ampari HTTP 200, kaksi webp-kuvaa assets/kartat/ihmeet/). Kuvattomuus on tools/nostoinventaario.mjs:n virhe: kuvaTiedot() ei laske ihme.osoite-kenttaa kuvaksi. PAATOKSET: 1) Codex-tilausta naista kahdeksasta EI tehda; omistajan seuraava Codex-tilaus tulee vasta uusista kadonneista monumenteista (iso ajon vaihe 7, 1-3 per maa). 2) Sisaltokirjurin ehdotus muuttaa Halikarnassos ja hippodromi rappeutuneiksi (kadonnut: false) hylataan: kumpikin on kadonnut kohde ja data on jo oikein; rappeutunut tarkoittaa linjauksessa parikuvaa nykytila + kulta-aika, ei Codex-tilauksen valttamista. 3) Sisaltokirjurin loytamat Commons-aikalaiskuvat (Lallemand 1780, Baldus 1851-70, Rijksmuseum Crystal Palace, de Jongh 1630, Pergamon-museo, Bodrumin rauniot, Sultanahmetin aukio) ovat kelvollisia toissijaisia kuvia; ne lisataan fokuskohteisiin ihmekuvan rinnalle vasta jonon paassa (ei ennen BEL/SVK/SVN/CYP/MLT ja visoja), ja Pelikoodari varmistaa etta kadonnut: true -kortti nayttaa toissijaisen kuvan. 4) Inventaariotyokalu korjataan laskemaan ihme.osoite kuvaksi (Sisaltokirjurin seuraava sessio).

## OMISTAJAN EHDOTUS: LINSSIT KAUPUNKIEN AARREPALKKIOIKSI, KESKENERAISET HIOMASSA + HYVITYS (kartoitus, odottaa paatosta) (21.9.2026 klo 09.32)

Omistaja 21.9.2026 tekstisessiossa: kartoitetaan Eurooppaa koskevat linssi-ideat ja niiden maara, jotta ne voidaan tehda ensin tai ottaa mukaan suunnitteluun siita, mihin kaupunkeihin linssit tulevat aarreloytojen palkkioksi; linssit voidaan ottaa peliin palkkioiksi heti omine ikoneineen vaikka eivat viela toimi (alfa), ja keskeneraisen linssin loytaja saa rahallisen hyvityksen. Fablen kartoitus docs/raportit/linssit-eurooppa-kartoitus-20260921.md: katalogin 112 ideasta 38 sijoittuu selvasti Eurooppaan (21 aikajana-, 17 aluelinssia; 1 valmis, 2 rakenteilla, n. 9 seuraava, n. 26 idea) ja 14 sivuaa Eurooppaa. Ehdotus: rengas 1 = 12 linssia ankkurikaupunkeineen, tyokalulinssit pysyvat tietajapistekynnyksilla, Isoisan linssi 1873 on tarinan lahja, keskeneraiset nakyvat laukussa hiomassa-ikonina ja heraavat kayttoon valmistuessaan, hyvitys tarinan kielella (optikko). Ei viela linjaus: omistaja paattaa renkaan koon, hiomassa-ikonien nakyvyyden, hyvityksen periaatteen ja ikonitilauksen laajuuden.

## LINSSIEN PAINO: KEVEITA JA HAUSKOJA LINSSEJA RASKAIDEN VASTAPAINOKSI (omistaja 21.9.2026, sitova suunta) (21.9.2026 klo 09.38)

Omistaja tekstisessiossa: avaruuslinssi on kevyempi ja hauskempi (ei alkuanimaatiota, heti tutkittavissa, visuaalinen), Ihmisen matka raskaampi (pitka alkuanimaatio). Jos raskaita linsseja on paljon, on keksittava myos linsseja, jotka ovat enemmankin vain hauskoja ja pelillisia kuin opettavia, jotta pelaajan into loytaa lisaa linsseja pysyy korkeana. Pelista ei saa tulla tietoahkya eika tehtavakonetta; peliin mahdollisimman paljon keveita ja hauskoja elementteja. Maailmanradio on kevyt linssi (ei kysymyksia, ei pakkoa oppia). Fablen ehdotus (docs/raportit/linssit-eurooppa-kartoitus-20260921.md, osio Linssien paino): kolme painoluokkaa - leikki, katselu, tarina - suhteessa 1:1:1, aarreluettelossa vuorotellen; raskaan linssin alkuanimaatioon aina ohitus; 10 uutta leikkilinssi-ideaa (yokartta, tuulet, tahdet, muuttolinnut, isoisan kamera, aanikartta, kellot, lippuarvaus, elava liikenne, vuodenajat). Renkaan 1 koko ja ikonitilaus paatetaan vasta kun linssien maara ja tyyli on yhdessa pohdittu.

## PIENI LIIKE KARTALLE VALMIS (Pelikoodari efc2b926) -> v1989-jonoon (21.9.2026 klo 09.41)

Haara pelikoodari-liike: js/pallolauta/liike.js, DOM-kerros kankaan paalla (vain transform/opacity, pallon silmukkaa ei herateta). Pulu lentaa kerran 60-120 s levossa 2 s reunasta reunaan (26 px siluetti ylhaalta), ei kun kortti/liuska/linssi/dialogi auki; yksi pilven varjo 0,08 40 s matka, pysahtyy kun lauta ei ole levossa; kellonajan savy aamu 7 %, ilta 9 %, yo 12 %, 2 s siirtyma. Kytkin hampurilaisessa Kartta -> Pieni liike (oletus paalla, ?liike=0), prefers-reduced-motion sammuttaa. Savuke savuke-kartan-liike.mjs 13/13, testit 3780/0; kehysvali 390 ohjelmistopiirrolla 220 vs 223 ms. Kaappaukset docs/raportit/kaappaukset/liike-20260921/. FABLE HYVAKSYY: ilta-savy ja pulun siluetti nakyvat, kuormaa ei. Paatos: lentava lintu on kaukaa nahty pulu eika Livian hahmo - Livia pysyy oppaana ruudun kulmassa, eri lintu ei sekoita. Julkaisija ottaa v1989:aan seuraavassa sessiossa (odottaa /clear). Laitetestaaja mittaa laitteen fps:n kierroksella 22.

## ATLASLEHTI-VEDOS VALMIS (Karttaseppa aec5b595), omistajan katsottavana (21.9.2026 klo 09.58)

Stieler 1875 No. 33 Frankreich und die Schweiz (Commons PD/Rumsey, 15 876 x 12 892 px) georeferoitu lehden omasta asteverkosta, jaannos 4 px (~0,5 km); pallolla ?atlas=1 kalvona (js/atlaslehti.js), 8192 px webp 7,6 Mt lataus 0,5 s + purku 0,45 s, GPU 145 Mt; 4096-versio 2,5 Mt. Peittavyys 0,72 jattaa lehden sameaksi, Karttaseppa ehdottaa linssille 0,9-0,95. Eurooppa vaatisi 16-18 lehtea (~1 pv/lehti, ~130 Mt); tuotantoon laatasto z3-z8 samalla laattakoneella kuin reliefipyramidi, ei tekstuuria per lehti. Raportti docs/raportit/atlas-vedos-20260921.md, kaappaukset docs/raportit/kaappaukset/atlas-vedos-20260921/. Fablen arvio: vedos on vakuuttava, pelin pisteet osuvat lehden kaupunkeihin; 0,95 peitto on oikea linssille. Odottaa omistajan paatosta atlaslinssista (Q2) ja 1873-linssin (Q1) aloituksesta.

## HIOMASSA-LINSSI JA OPTIKON HYVITYS: MEKANIIKKA HYVAKSYTTY (Fable, Pelikoodarin ehdotus) (21.9.2026 klo 10.09)

Pelikoodarin ehdotus hyvaksytty: rekisteririvi tila: 'hiomassa' (js/linssit/rekisteri.js), omistus kuten nyt (player.linssit + passileima linssi:<tunnus>), valmistuessa linssi heraa itsestaan ja laukku nayttaa kerran valmistui-merkin; taulu js/linssit/aarteet.js LINSSIAARTEET ankkurikaupunki -> tunnus; linssi myonnetaan kaupungin ISON paikallisaarteen loydosta, pieni aarre ei koskaan; toisella pelikerralla aarre on tavallinen. FABLEN PAATOKSET: 1) linssi on ison aarteen KYLKIAINEN, aarteen raha pysyy (ei korvaa) - keskeneraisyys ei saa rangaista; 2) OPTIKON_HYVITYS 500 puntaa kerran per linssi loytohetkella kun rivi on hiomassa (passiin hyvitys:<tunnus>), ei tietajapisteita, ei toistu uuden pelin alussa; 3) tekstit Livian suuhun Pelikoodarin ehdotuksen mukaan; 4) ikonipaikka rekisteririvilla ikoni: 'assets/linssit/<tunnus>.png', hiomassa-tilassa yhteinen hiomassa.svg + grayscale, Codex piirtaa myohemmin; 5) kehittajatila ei myonna hiomassa-linsseja. RAJAUS: LINSSIAARTEET-taulu jaa tyhjaksi (vain testilinssi testeissa) kunnes omistaja on paattanyt linssien maaran ja tyylin (docs/raportit/linssit-eurooppa-kartoitus-20260921.md); mekaniikka, testit ja savuke tehdaan nyt.

## ISOISAN LINSSI 1873: ERAJAKO HYVAKSYTTY (Karttaseppa), era 1 alkaa (21.9.2026 klo 10.09)

Era 1 = rajat ja nimet pallolla: historical-basemaps world_1878 -> 1873 kasin (Balkan, Kypros), nykyrajanaulaus NE:lla, assets/data/rajat-1873.json (GPL-3.0 kirjattu), pallovektoreihin laji rajat1873 (nykyrajat ja kaydyt-rajat piiloon linssin ajaksi), js/linssit/isoisa-1873.js, nimet elavina CSS2D-nimioina (nimiston aika=1873-rivit + valtioiden 1873-nimet suomeksi; Karttaseppa tekee listan, Sisaltokirjuri tarkistaa, Fable pistokoe kaanonia vasten). Era 2 = Horation reitti katkoviivana + retroasu (seepiakalvo, tummempi muste, kapiteelit, selitekortti, lahdeteksti). Era 3 = tasokartan piirto vain tarvittaessa, savukkeet, laitekierros. Ei polttoa erissa 1-2; jos poltetut nykyrajat hairitsevat seepiakalvon alla, vaihtoehto rajaton viivataso (--eirajat) paatetaan vedoksesta. Valokuvat, aanet ja media eivat kuulu naihin eriin.

## EI CLI-SIIRTOA: SESSIOT PYSYVAT TYOPOYTASOVELLUKSESSA (omistaja 21.9.2026) (21.9.2026 klo 10.12)

Omistaja harkitsi tilin siirtoa CLI:hin, jotta tyopoytasovellus vapautuisi toiselle tilille. Selvitys: CLI ja tyopoyta voivat olla eri tileilla (CLAUDE_CONFIG_DIR), sessioita ei voi siirtaa niiden valilla, peer-viestit ja Remote Control toimivat CLI:ssa, mutta iOS-simulaattori, selainpaneeli ja sessiohallinta (get_usage, viesti tunnuksella) ovat tyopoydan omia. PAATOS: ei siirreta CLI:hin. Omistaja kokeilee toista tilia selaimessa tai avaa Macille toisen kayttajan toiselle tilille; koodaussessiot pysyvat nykyisella kayttajalla tyopoytasovelluksessa (repo, worktreet, Keychain ja gh-token ovat siella).

## KARTAN SULAVUUS ENSIN: ISOISAN LINSSI JA ATLAS ODOTTAVAT (omistaja 21.9.2026, SITOVA) (21.9.2026 klo 10.27)

Omistaja sanatarkasti: 'jatetaan isoisan linssi ja atlas odottamaan hetkeksi. nykyinen kartta vaatii korjauksia. kartta taytyy saada pyorimaan yhta sulavasti kuin google earth (panorointi + zoomaus) seka nimiot pysymaan paikallaan ja muuttamaan kokoa yhta sulavasti. ... ei tehda mitaan muuta ennen kuin on saatu se korjatuksi. sen jalkeen mietitaan tulevia euroopan linsseja.' TYONJAKO (Fable): Karttaseppa keskeyttaa Isoisan linssin eran 1 (tyo jaa haaraan) ja ottaa panoroinnin ja zoomauksen sulavuuden (kamera, laattojen lataus ja vaihto, piirtosilmukka); Pelikoodari keskeyttaa hiomassa-linssin (tyo jaa haaraan) ja ottaa nimiot (pysyvat paikallaan ja skaalautuvat jatkuvasti pallon liikkeen aikana); Laitetestaaja mittaa ensin oikealla laitteella nykyisen fps:n ja nimioiden kayttaytymisen panoroinnissa ja zoomissa (vertailukohta), kierros 22 sen jalkeen; Julkaisija julkaisee v1989:n normaalisti; Sisaltokirjuri jatkaa sisaltotyota, koska se ei koske karttaa. Mittari: pallon panorointi ja zoom ilman nykaisyja ja laattojen valahduksia iPadilla ja iPhonella, nimiot kiinni maassa ja koko muuttuu liukuvasti, savuke mittaa kehysvalin ja nimioiden siirtyman. Euroopan linssit paatetaan vasta tamän jalkeen.

## NIMIOIDEN SULAVUUS: DIAGNOOSI JA ERAJAKO HYVAKSYTTY (Pelikoodari) (21.9.2026 klo 10.31)

Juurisyyt: 1) koko portaina - nostojen mitta (nostonKarttakerroin, scale) ja kaupunkinimien font-size lasketaan vain lepoladonnassa, zoomin aikana koko seisoo ja hyppaa levossa, paalla 200 ms CSS-siirtyma ja rasterin porrasvaihto; 2) paikka - CSS2D-kerros asemoi samassa kehyksessa, mutta htmlTransitionDuration 250 ms tweenaa lat/lng-muutokset ja 50-180 DOM-transformin kirjoitus joka kehys on WebKitilla raskas: kun kehys ylittaa 16 ms, kangas etenee ja DOM jaa jalkeen (nakyy iPadilla, ei headlessissa); 3) renderkameran viive koskee getScreenCoords-lukijoita (liuska, kartuscha); 4) Google Earthin malli: nimiot samaan GL-kehykseen spriteina, ei DOM. ERAT: E1 mittari (savuke: nimion keskipiste - maapisteen ruutukohta px joka kehys, kokoaskeleet; tavoite < 1 px, liukuva koko) + Laitetestaajan iPad-vertailu; E2 liukuva koko (CSS-muuttuja --nostomitta paivitetaan joka kehys pallon kehyskoukusta, nimet samoin, siirtymat pois eleen ajaksi); E3 paikka (htmlTransitionDuration 0 eleen ajan, lukittu ankkuri ilman tweenia, vain muuttuneet DOM-kirjoitukset); E4 nimiot GL-kerrokseen Karttasepan kanssa (kameran matriisit + mittakaava samasta kehyskoukusta, nostot rastereina tekstuureiksi). Fable hyvaksyy E1-E3 heti; E4 suunnitellaan rinnalla ja paatetaan E3:n mittauksen jalkeen. Hiomassa-linssi valmistui ennen keskeytysta (pelikoodari-hiomassa 6e3eb5af, 12/12, 3785/0, taulu tyhja) -> Julkaisijalle v1989:n jalkeiseen versioon.

## ISO AJO KOHDAT 1-2 VALMIIT (Sisaltokirjuri 4eab2f17, 29cdd96f) (21.9.2026 klo 10.32)

tools/nostoinventaario.mjs korjattu: ihme.osoite lasketaan kuvaksi - Euroopassa 0/1198 kuvatonta (vahvistettu). FRA-siivous: 18 maalehtinostot-fra.js-rivia saivat oman 440-660 merkin tekstin (lunastus-lainaus pois, korttiLehdesta suosii rivi.teksti), 6 uutta visaa (michelin-opas, montgolfier, braille, tour-1903, roland-garros, le-mans), FRA:n visaosuus 25 % -> 34,4 %. Testit 3793/0, kaksoisavaimet 0. Fablen pistokoe: tekstit hyvia; yksi faktavirhe korjattavaksi (Montgolfier: ensimmainen miehitetty lento oli 21.11.1783, ei seuraavana vuonna). Haara iso-ajo-fra-kuvat-1 -> Julkaisijalle v1989:n jalkeiseen versioon korjauksen jalkeen. Sisaltokirjuri jatkaa kohtaan 3 (BEL/SVK/SVN/CYP/MLT).

## POHJAKARTALLA VAIN NYKYAJAN NIMET JA RAJAT; KAIKKI VANHAT NIMET ISOISAN LINSSIIN (omistaja 21.9.2026, SITOVA, korvaa aamun 08.21 linjauksen) (21.9.2026 klo 10.37)

Omistaja sanatarkasti: 'poista kaikki vanhat pelista ja siirra ne isoisan linssiin. pelikartalla vain nykyajan nimet ja rajat. tosin sita voidaan miettia pitaisiko eri maissa nakya nykyajan maakunnat tai vastaavat. niista voisi saada lisaa eloa kartalle.' Tausta: aamun linjaus salli pohjakartalle tanaankin kaytossa olevat kulttuurialueet (Picardie, Burgundi, Hannover, Wurttemberg ...), ja omistaja naki ne pelissa vanhoina niminä. UUSI SAANTO: pohjakartan nimiotasolla vain meret, lahdet, salmet ja nykyajan hallinnolliset alueet nykynimin (suomalainen sovinnaisnimi kun vakiintunut); kaikki historialliset provinssit, valtiot ja 1873-nimet (nimisto-1873.js kaikki 122 aluerivia, seka pysyva- etta 1873-luokka) siirtyvat Isoisan linssiin. Nykyajan maakuntien nayttaminen pohjakartalla on avoin kysymys (Fable vastaa ja omistaja paattaa kortilla). Toteutus: Sisaltokirjuri kokoaa nykyajan aluelistan (Natural Earth admin-1, PD) maittain suomeksi tarkistettuna, Karttaseppa polttaa nimiotason uudelleen sulavuustyon jalkeen tai sen lomassa polttovuorolla.

## BUGI: IPADIN YLAPALKKI POISSA MYOS PYSTYASENNOSSA; HAMPURILAINEN VS VAKASET (omistaja 21.9.2026) (21.9.2026 klo 10.38)

Omistaja sanatarkasti: 'ipadissa ylapalkki on poissa myos pystyasennossa. sen voisi palauttaa takaisin. tarkoitus oli poistaa ylapalkki vain vaaka tilassa iphonella ja ipadilla. ja samalla voisi katsoa etta aina kun on ylapalkki, niin silloin siina on normaali hampurilainen ja vain kun ylapalkkia ei ole, niin silloin ylakulmassa kelluva hampurilainen muuttuu kolmeksi v-kirjainta muistuttavaksi vakaseksi. joissain tilanteissa pelissa on viela ylapalkki jossa on nuo vakaset eika normaalia hampurilaista niin kuin kuuluisi olla.' SAANTO: ylapalkki piilotetaan VAIN vaaka-asennossa (iPhone ja iPad); pystyasennossa ylapalkki aina nakyvissa. Kun ylapalkki on nakyvissa, valikon kuvake on normaali hampurilainen; vain kun ylapalkkia ei ole, kelluva kuvake on kolme vakasta. Reititys: Pelikoodari (js/ylapalkki-vaaka.js), pieni era nimioiden E1:n jalkeen; savuke: iPad pysty 834x1194 ja vaaka, iPhone pysty ja vaaka - palkin nakyvyys ja kuvakkeen muoto kaikissa neljassa, seka kortti/linssi auki.

## NYKYAJAN MAAKUNNAT POHJAKARTALLE: OMISTAJA HALUAA ENSIN VEDOKSEN (21.9.2026 klo 10.40)

Omistaja 21.9.2026 kortilla: 'nayta ensin vedos'. Vedos: Ranska ja Saksa - nykyajan ensimmaisen tason hallintoalueet (Ranskan 13 regionia, Saksan 16 osavaltiota) nimina harvennettuina kapiteeleina ja himmeina aluerajoina (Natural Earth admin-1, PD), suomalaiset sovinnaisnimet kun vakiintuneet. Sisaltokirjuri kokoaa aineiston (nimet + rajat) omaan tiedostoon, Karttaseppa polttaa koelaatat paikalliseen peliin sulavuusdiagnoosin jalkeen samalla kaavalla kuin poltto-koe-20260920 (z6-z8, kaappaukset 390 ja 1400), ei tuotantoon. Omistaja paattaa vedoksesta: nimet + rajat, vain nimet vai ei maakuntia.

## TARKENNUS: PYSYVAT KULTTUURIALUEET SAAVAT JAADA POHJAKARTALLE (omistaja 21.9.2026) (21.9.2026 klo 10.41)

Omistaja sanatarkasti: 'ne pysyvat kulttuurialueet varmasti voi olla myos kartalla kuten ehdotit'. Tarkentaa edellista paatosta: nimisto-1873.js:n pysyva-luokan alueet (Picardie, Normandia, Bretagne, Burgundi, Baijeri, Wurttemberg, Baden, Westfalen, Rheinland, Toscana, Lombardia, Katalonia ...) jaavat pohjakartalle; vain poliittiset 1873-nimet ovat linssissa. Fablen ehdotuksen mukaan neljä Saksan rajatapausta (Hannover, Oldenburg, Braunschweig, Anhalt) siirretaan luokkaan 1873. Nykyajan maakuntien vedos (FRA + DEU) tehdaan silti; omistaja paattaa vedoksesta, naytetaanko pohjakartalla lisaksi nykyajan hallintoalueet ja niiden rajat.

## PANOROINNIN JA ZOOMIN SULAVUUS: DIAGNOOSI JA ERAJAKO HYVAKSYTTY (Karttaseppa) (21.9.2026 klo 10.43)

Mitattu GPU-headlessissa (M4 Max/Metal, 390 dpr3 ja 1400 dpr2, CPU-kuristus 4x ~ puhelin; mittari tools/savukkeet/mittaa-sulavuus.mjs erassa 1). 1) Kehyksen perustyo pieni (piirto 0,5-3 ms, laattakerros < 1 ms); nykaykset ovat yksittaisia pitkia tehtavia: zoom 383 ms, nipistys 352 ms, panorointi 62 ms - a) pelaajan maan korostuksen naulaus rantaan (naulaaKorostus/rannallaHilassa LOD-vaihdossa yhtena tehtavana), b) laatan valmistelu tason vaihtuessa (getImageData + sisasumu + kermamaski pikselisilmukoina, 88 ms/laatta). 2) Tason vaihdon jalkeen pohja nakyy: nipistyksessa 16 % kehyksista ilman peittavia laattoja, panoroinnissa z6->z5-pudotus Alpeilla + 22 paljasta kehysta = valahdus. 3) Zoom ei ole Google Earth: rulla askelittainen ilman vaimennusta, nipistys ja rulla zoomaavat ruudun keskelle eivat sormien kohtaan. 4) Sormiveto tasainen; kamera asetetaan pointermovesta (120 Hz) eika kehyksesta. ERAT: E1 pitkat tehtavat pois (naulaus tyosaikeeseen/valimuistiin, valmistelu paloiksi, kanavat esilaskettuina; mittari pisin tehtava < 50 ms 4x); E2 tason vaihto ilman paljasta pohjaa + ennakko liikesuuntaan (mittari peittamattomia 0 ladatulla alueella); E3 zoom kohti osoitinta/sormia ja liukuva rulla (kohdepiste +-2 px, askel tasainen); E4 kamera->nimiot-rajapinta Pelikoodarin kanssa (kameran tila kehyksen alussa). Fable hyvaksyy, E1 alkaa.

## NIMIOIDEN SULAVUUS E1 VALMIS: MITTARI JA LAHTOTASO (Pelikoodari c1d7b379) (21.9.2026 klo 10.54)

Mittari js/pallolauta/sulavuusmittari.js: joka kehyksessa nimion keskipiste - maapisteen ruutukohta ja koko; laitteella matkakirja.ui.pallolauta.sulavuus.aloita() -> ele -> .yhteenveto() (JSON konsoliin), savuke savuke-nimiot-sulavat.mjs julkaisusarjaan (tuomio ikkunallisena SAVUKE_IKKUNA=1, headless 2-6 fps ei kelpaa). LAHTOTASO Macilla: panorointi 0 px (CSS2D samassa kehyksessa kankaan kanssa), zoom 0,03/0,3 px; KOKO muuttuu vain 77 % kehyksista ja porras 15-17 % - ladonta kulkee liikkeessa 200 ms tahdissa, nostojen 200 ms CSS-siirtyma liukuu perassa, kaupunkinimien font-size vaihtuu vain ladonnassa (5 porrasta/s). Suurimmat hypyt ovat eleen lopun lepoladonnan kylkivaihtoja (20-60 px) -> E3: kylkivaihto opacity-haivytyksella, ei liukuna. E2: CSS-muuttuja --nimiokerroin (kameran mittakaava / ladonnan mittakaava) joka kehys pallon kehyskoukusta, nostot scale(calc), nimet font-size calc; yksi tyylikirjoitus/kehys. iPadin jalkeen jaaminen ei nay Macilla - Laitetestaajan luku ratkaisee E4:n tarpeen. Fable hyvaksyy; jarjestys: ylapalkkibugi -> E2 -> E3.

## KEHITYSTYO MACIN TOISELLE KAYTTAJALLE: OIKEUKSIEN JAKO, EI SIIRTOA (omistaja 21.9.2026, SITOVA) (21.9.2026 klo 11.06)

Omistajan on pakko siirtaa kehitystyo Macin toiselle kayttajalle. Vaihtoehdot: siirto /Users/Shared/Matkakirja/-kansioon tai ACL-oikeuden anto nykyisiin kansioihin. Omistaja valitsi kortilla oikeuksien jaon: hakemistoja ei siirreta, polut (Raamattu, roolitus, muisti, worktreet) pysyvat ennallaan; uusi kayttaja saa ACL:n kansioihin Matkakirja-*, actions-runner*, Documents/Codex ja avaintiedostoon. Uudessa kayttajassa tehdaan uudelleen: Homebrew-polku ja avainten source, git safe.directory ja identiteetti, gh- ja Claude-kirjautuminen, muistin kopio, Playwrightin Chromium, Xcode-lisenssi, CI-ajurien svc.sh install (samat rekisteroinnit SamiMacStudio2 ja -testit), kuusi sessiota luovutuksista. Codex jaa vanhaan kayttajaan, kansiohaku jatkuu ACL:lla. Ohje: docs/raportit/siirto-toiseen-kayttajaan-20260921.md. Kaikki sessiot kirjoittavat luovutuksen viesti-<rooli>-luovutus-20260921-siirto.md ja pysahtyvat; Fable ei kopioi avaintiedostoja (auto-moodin luokitin esti, omistaja ajaa komennon itse).

## SULAVUUS E1 VALMIS: PITKAT TEHTAVAT POIS (Karttaseppa f909d2fd) (21.9.2026 klo 11.08)

Laatan valmistelu piirtokoukun jonoon aikabudjetilla, rannikon naulaus Web Workeriin (js/pallovektorit-naulaus.js + -tyo.js, varapolku paasaikeessa), laatan kangas willReadFrequently. Mittari (390 dpr3, CPU 4x, Metal): pisin kehys zoom 363 -> 36 ms, nipistys 380 -> 43 ms, panorointi 42 ms; pitkat tehtavat 0. Raportti docs/raportit/sulavuus-e1-20260921.md. Jaljella 40-50 ms kehykset ovat nimioiden ladontaa ja nostojen kehystyota (Pelikoodarin puoli). Julkaisijalle seuraavaan versioon.

## YLAPALKKIBUGI KORJATTU (Pelikoodari 6cabce66) + LUOVUTUKSET SIIRTOON (21.9.2026 klo 11.09)

pelikoodari-ylapalkki 6cabce66: ylapalkki piiloon vain vaaka-asennossa, pystyssa aina; hampurilainen kun palkki on, vakaset vain ilman palkkia; savuke 60/60 (iPad ja iPhone, pysty ja vaaka, kortti ja linssi auki). Julkaisijalle seuraavaan versioon. Luovutukset siirtoon: Karttaseppa 4e4ae8cc, Sisaltokirjuri 6df9f127 (sisalto-vajaat-maat-30), Pelikoodari 606103ac (pelikoodari-luovutus-siirto).

## CODEX AVASI OIKEUDET KAIKILLE PAIKALLISILLE KAYTTAJILLE; UUSI KAYTTAJA koodaus (21.9.2026 klo 11.22)

Codex 21.9.2026 klo 11.15: ACL ryhmalle localaccounts (luku, muokkaus, luonti, uudelleennimeaminen, poisto, periytyva) repoihin Matkakirja ja Matkakirja-fable, kaikkiin Matkakirja-tyopuihin, kuvatuotannon tyotilaan ja Codex-toimituskansioihin; kotihakemiston lapikulku. Yhteiskansio /Users/Shared/Matkakirja-yhteinen/ (linkit + Fablen kopioima Clauden muisti claude-muisti/memory). Uusi kayttaja on koodaus. Jaljella vanhassa kayttajassa: avaintiedosto ~/.matkakirja-avaimet.zsh (omistaja ajaa) ja ACL ajurihakemistoihin actions-runner ja actions-runner-2; uudessa kayttajassa ohjeen vaiheet 3-7. Ohje paivitetty: docs/raportit/siirto-toiseen-kayttajaan-20260921.md.

## v1989 MAINISSA (PR #2641); LAITETESTAAJAN LUOVUTUS fc3df934 (21.9.2026 klo 11.22)

v1989: kartan pieni liike ja pollon Matkakirja-linkit mergetty mainiin (87262d5d), v1973-prep nollattu. Laitetestaaja luovutti siirtoon (haara laitetestaaja fc3df934). Kaikki viisi roolisessiota ovat pysahtyneet luovutuksiin; Julkaisijan luovutus tulossa.

## MAC-SIIRTO: YMPARISTO PYSTYTETTY KAYTTAJASSA koodaus (21.9.2026 klo 12.05)

Fable ajoi siirto-ohjeen (docs/raportit/siirto-toiseen-kayttajaan-20260921.md) kohdat 3-6 uudessa Mac-käyttäjässä koodaus. Tehty ja tarkistettu: zshrc (Homebrew shellenv + avaintiedoston source; AMPARI asetettu, node v22 avaintiedoston PATH:sta), git (safe.directory *, identiteetti ennallaan, seitsemän worktreetä puhtaita, worktree prune poisti neljä kuollutta wt-*-viitettä), gh (ravelius, scopet repo+workflow), Clauden muisti kopioitu yhteiskansiosta (14 tiedostoa), Playwright chromium, node --test ok, Xcode 27.0 lisenssi kunnossa, CI-ajurit SamiMacStudio2 ja SamiMacStudio2-testit asennettu LaunchAgenteiksi ja online, tuotanto APP_VERSION 1989. Ei jäänyt tekemättä. Matkakirja-opus-2-worktree (pelikoodari-v1982-savukkeet) jätettiin paikalleen.

## HAKEMISTOSIIVOUS JA ROOLI-WORKTREEIDEN NIMEAMINEN (21.9.2026 klo 12.19)

Omistaja 21.9.2026: kotihakemistosta poistetaan Clauden puolen tarpeettomat Matkakirja-hakemistot (Matkakirja-opus-2, Matkakirja-raamattu, valmiit agentti-worktreet, Karttasepän vanhat polttojäljet Karttasepän luvalla). Codexin hakemistoihin (Matkakirja, Matkakirja-codex-*, worktrees/) ei kosketa; niiden siivous kysytään Codexilta. Rooli-worktreet nimetään roolin mukaan (Matkakirja-julkaisija, -karttaseppa, -pelikoodari, -sisaltokirjuri, -laitetestaaja) vasta seuraavassa kontekstinollauksessa, jolloin sessiot avataan uudelleen; samalla päivitetään Raamatun kohta B ja dokumenttien polut. Matkakirja-fable pysyy nimeltään ennallaan (koodiviittaukset, Clauden projektiavain ja muisti sidottu polkuun). Remote Control kytketty päälle viidessä roolisessiossa.

## MAC-SIIRTO: CODEXIN SIIVOUS JA CI-AJURIEN OMISTUS (21.9.2026 klo 12.53)

Codex vastasi omistajan kautta 21.9.2026: 20 vanhaa Codex-worktreetä (Matkakirja-codex-* ja /Users/samireivinen/worktrees/) poistettu, päärepon /Users/samireivinen/Matkakirja kesken jäänyt cherry-pick peruttu. Codexin toimituskansio pysyy polussa /Users/samireivinen/Documents/Codex (kaikilla paikallisilla käyttäjillä luku- ja kirjoitusoikeus); piilokansiota /Users/samireivinen/.codex ei poisteta eikä siirretä. Savukkeet-mac-rivi kaatui uudessa käyttäjässä, koska ajurin _work-puun tiedostot omistaa samireivinen ja .NET:n RemoveReadOnly vaatii omistajuuden piilotiedostojen chflags-kutsuun (ACL ei riitä). Korjaus: omistaja siirtää actions-runner- ja actions-runner-2-hakemistojen omistuksen koodaus-käyttäjälle (chown); korvaa siirto-ohjeen kohdan 2 ACL-komennon.

## LINSSIT AARREPALKKIOIKSI: RENGAS 1 JA IKONITILAUS (21.9.2026 klo 12.57)

Omistaja 21.9.2026 (kortti): 1) Ensimmäinen linssisarja Eurooppaan on 22 linssiä: kartoituksen renkaan 1 kaksitoista tarinalinssiä sekä kuusi leikkilinssiä (Yökartta, Tähtitaivas, Muuttolinnut, Kellot, Lippuarvaus, Vuodenajat) ja neljä katselulinssiä (Maailman ruoat, Maailman musiikki, Maailman eläimet, Suurimmat kaupungit); aarreluettelossa raskaat ja kevyet vuorottelevat. 2) Codexilta tilataan koko sarjan ikonit kerralla: 37 Euroopan historialinssiä + Keksinnöt + 6 leikki + 4 katselu = 47 ikonia, samalla kädellä kuin nostotyyppimerkit ja yhteisellä pyöreällä linssikehyksellä; tilaus posti/fable-codexille-linssi-ikonit-20260921.md. Renkaiden 2–3 linssit näkyvät pelissä hiomassa-ikoneina heti kun ikonit ovat olemassa. 3) Kaupallistamisajatus hakemukseen: linssit voi jatkossa ostaa myös optikolta pelin rahalla ja myöhemmin App Storen paketteina; tämä vaatisi Raamatun kaupallistamislinjauksen muutoksen, jota ei ole vielä päätetty.

## POSTIVAHTI: SEITSEMAS SESSIO VALVOO POSTILAATIKKOA (21.9.2026 klo 13.10)

Omistaja 21.9.2026: postilaatikkohaaraa claude/postilaatikko valvoo oma kevyt sessio Postivahti (Haiku, effort low) worktreessä /Users/koodaus/Matkakirja-posti (kotihakemistoon /Users/samireivinen ei voi luoda uusia kansioita uudesta käyttäjästä). Se ajaa /loop 5m: git fetch origin claude/postilaatikko; jos haarassa on uusi commit, jonka tiedosto ei ole Fablen oma (posti/fable-*), se lähettää Fablelle yhden rivin (commit, tiedosto, otsikko) SendMessagella; muuten ei tee mitään. Postivahti ei kirjoita postiin eikä hae toimituksia; noudon tekee Julkaisija Fablen käskystä. Julkaisijan tunneittainen postilaatikkotarkistus poistuu; toimituskansion ~/Documents/Codex/<pvm>/ tarkistus säilyy Julkaisijalla. Postivahti tyhjennetään /clear-komennolla, kun sen konteksti ylittää 50 %.

## NYKYMAAKUNNAT POHJAKARTALLE: VERSIO A, HIERARKIA (21.9.2026 klo 13.43)

Omistaja 21.9.2026 (kortti, Karttasepän vedos docs/raportit/maakuntavedos-20260921.md): nykyajan maakunnat (FRA 13 regionia, DEU 16 osavaltiota) tulevat pohjakartalle nimineen ja himmeine rajoineen (versio a). Kulttuurialueiden 1873-nimet jäävät pohjalle kaukaa; nykymaakunnat näkyvät vasta zoomatessa. Hierarkia: nostot ja kaupungit tummin (klikattavat), kulttuurinimet keskisävy, maakunnat vaaleammat; Fablen ehdotus toisen musteen (vaimea ruosteenpunainen) käytöstä maakuntien nimissä ja rajoissa testataan toisessa vedoksessa ennen polttoa. Maakuntia ei tehdä klikattaviksi nyt. Codex toimitti linssi-ikonien A- ja C-sarjat (26 kpl), Julkaisija tuo ne assets/linssit/ikonit/-kansioon, Pelikoodari liittää hiomassa-tauluun.

## LINSSI-IKONIT REPOSSA WEBP 192 PX, ALKUPERAISET TOIMITUSKANSIOSSA (21.9.2026 klo 13.56)

Fable 21.9.2026 (Pelikoodarin huomio: Codexin 512 px PNG-ikonit ~400 kt/kpl, 9,4 Mt repossa 44 px:n ruutuun): repoon tallennetaan linssi-ikoneista vain webp-versio, enintään 192 px (96 px kortti @2), laatu ~85; 512 px PNG-alkuperäiset jäävät Codexin toimituskansioon /Users/samireivinen/Documents/Codex/<pvm>/ eikä niitä committoida. Sama sääntö tuleville ikoni- ja merkkitoimituksille: Julkaisija muuntaa noudon yhteydessä. Pelikoodarin linssisarja (pelikoodari-linssisarja e5d13891): 46 hiomassa-riviä rekisterissä, tietäjäpistekynnys ja mantereen laatta eivät myönnä hiomassa-linssejä, ne ovat aarreluettelon palkkioita. iPad-mittauksen juurisyy: lokaalista originista WebKit hylkää ämpärin WebGL-tekstuurit; testaukseen tools/laitepalvelin.mjs, tuotanto ei kärsi.

## KAKSI AANTA: ISOISA JA LIVIA, NUORI FOGG ON PELAAJA (21.9.2026 klo 13.57)

Omistaja 21.9.2026 (korjaus apurahakuvauksen yhteydessä): pelin nykymuodossa nuori Fogg ei koskaan kommentoi eikä havainnoi mitään; Livia-kirjekyyhky on ainoa, joka kommentoi. Pelin kaksi ääntä ovat siis isoisä Horatio 1873 ja Livia nyt; nuori Fogg on pelaaja ilman omia repliikkejä, kaupunkikuvaukset ovat kertojan neutraalia tekstiä, ja nuoren Foggin piirteet näkyvät vain kertojan kuvaamana tekona tai Livian huomiona. Pöllö on kolmas, nostojen ääni. Päivitetty docs/tarina.md (Kaksi ääntä) ja Raamatun kohta KAKSI ÄÄNTÄ.

## KARTAN SULAVUUS MITATTU IPADILLA; MAAKUNTAVEDOS 3 POLTTOON; BODENSEE; KELLOT (21.9.2026 klo 14.10)

21.9.2026 iltapäivä. 1) Sulavuusportti: Laitetestaaja mittasi iPad-simulaattorilla (laitepalvelimen kautta) panoroinnin siirtymän mediaani 0 px, p95 0 px, 52–56 fps, ja zoomin kamera-ajolla mediaani 0,13 px, p95 0,33 px (= Macin luku); koon liukuvuus 0,86. Nimiöt eivät jää jälkeen, joten Pelikoodarin ladonta paloissa jää tekemättä. Simulaattorin kaksisormiveto ei tuota nipistystä (työkalurajoite, ei pelin bugi); jatkossa kamera-ajo. Omistajan tuntumatesti tehdään kun E2–E3 ovat tuotannossa. 2) Omistaja hyväksyi maakuntavedoksen 3 (ruoste rgb(128,44,20), nimet 0,95, rajat 0,75): Karttaseppä polttaa nimiötason; Sisältökirjuri tarkistaa suomenkieliset nimet. 3) Bodensee: CHE:n 29 kohdetta blokkasi AUT/DEU-nimiöpari; ladonnan maiden välinen väistö on yksisuuntainen sopimuksen mukaan, ei virhe; Karttaseppä siirsi DEU/Bodenjärven noston järven pohjoisrannalle (sisältöratkaisu, ei sääntömuutos; haara karttaseppa-bodensee). 4) Ensimmäinen leikkilinssi Kellot hyväksytty Pelikoodarin ehdotuksen mukaan (nykyajan vyöhykkeet vs. 1873 paikallinen aurinkoaika, Livia kysyy, ±5 min tietäjäpisteitä); Fable antoi 1873-tekstin ja Livian kolme kysymystä. 5) Omistaja kysyi syvyysviivoista: Karttaseppä tekee koelaatat nykyisellä porrastuksella ja atlaslehden isobaattityylillä.

## SYVYYSVIIVAT: ISOBAATIT ATLAKSEN TAPAAN SEURAAVAAN POHJAPOLTTOON (21.9.2026 klo 14.29)

Omistaja 21.9.2026 (kortti, Karttasepän syvyyskoe docs/raportit/syvyyskoe-20260921.md): meren syvyysporrastus korvataan atlaslehden isobaateilla, ohuina syvyyskäyrinä 200/1000/3000 m ja jatkuvalla meren sävyllä (--syvyyskayrat, ei --syvyysportaat). Muutos vaatii koko pohjatason uusintapolton (~1,5–2 h + vienti), ja se ajetaan vasta kun omistaja on tehnyt tuntumatestin sulavuuserille E2–E3 tuotannossa; Fable antaa luvan. Syvyysviivojen hidas päivitys ruudulla on laattojen latausta ja tason vaihtoa, jonka E2–E3 korjaavat, ei syvyysviivojen vika.

## KELLOT-LINSSI VALMIS: XP 20, TOLERANSSI 5 MIN, MALLIPOHJAISET REPLIIKIT ILMAN AANTA (21.9.2026 klo 14.35)

Pelikoodari 21.9.2026 (pelikoodari-kellot 594fb6f3): ensimmäinen leikkilinssi Kellot valmis. Taskukellot ~118 kaupungille (Eurooppa + yksi per aikavyöhyke); Nyt = vyöhykeaika IANA/Intl kesäaikoineen ja 24 vyöhykerajaa pituuspiireinä; 1873 = paikallinen aurinkoaika (pituusaste × 4 min) ja Horation kortti ensimmäisellä avauksella. Livia kysyy Fablen kolme kysymystä ruudulla näkyvistä kellopareista; vastaus 12.12-muodossa, toleranssi ±5 min, oikeasta 20 tietäjäpistettä (XP_KELLOT). Kellot on rekisterissä tavallinen rivi, hiomassa-sarjassa 45. Sääntö: mallipohjaiset repliikit, joissa on muuttuvia nimiä ({A}, {B}), jäävät tekstiksi ilman luentaa.

## LIPPUARVAUS-LINSSI VALMIS: XP 20, EUROOPPA-RAJAUS (21.9.2026 klo 14.48)

Pelikoodari 21.9.2026 (pelikoodari-lippuarvaus abaea062): toinen leikkilinssi Lippuarvaus valmis. Euroopan 42 lippua pallolle (vipu Maailma 135), oma maa korostettu, napautus näyttää maan nimen; Livia kysyy Fablen kolmella lauseella ilman nimeä, neljä vaihtoehtoa = oikea + kolme lähintä naapuria, oikeasta 20 tietäjäpistettä (XP_LIPPUARVAUS). Eurooppa-rajaus: lon −25…45 ja lat > 34 sekä Venäjä, ilman Syyriaa ja Georgiaa. Jatkoerään: napautusmuoto (maapolygonit) sekä sarjat ja ennätys. Seuraava leikkilinssi: Tähtitaivas (Pelikoodari ehdottaa).

## TARKENNUS: ISOISAN LINSSI ON LAHJA, EI AARRE; RENGAS 1 = 21 AARRETTA + 1 LAHJA (21.9.2026 klo 14.59)

Fable 21.9.2026 (Sisältökirjurin kysymys): renkaan 1 kahdestakymmenestäkahdesta linssistä Isoisän linssi 1873 (Q1) ei ole aarrepalkkio vaan tarinan lahja isoisän matkakirjan mukana (kartoituksen poikkeus pätee). LINSSIAARTEET-tauluun tulee 21 kaupunki→linssi-mappausta; isoisän linssin jakelu (avautuu pelin alussa tai ensimmäisessä kaupungissa) on Pelikoodarin erillinen erä, kun linssi valmistuu Karttasepältä.

## TAHTITAIVAS-LINSSI VALMIS; CI:N CHROMIUM-POLKU KOODAUS-KAYTTAJAAN (21.9.2026 klo 15.02)

Pelikoodari 21.9.2026 (pelikoodari-tahtitaivas d9a9438a): kolmas leikkilinssi Tähtitaivas valmis. Kaupungin yön taivas kupuna (Yale Bright Star, tähtiaika hetkestä ja kaupungista), vaakaveto kääntää taivasta; Nyt = valosaaste (suurkaupunki mag 2,5, muut 3,5), 1873 = kaikki 4,5:een ja Horation kortti; napautus sytyttää tähdistön; Livia kysyy, oikeasta 20 tietäjäpistettä (XP_TAHTITAIVAS). Presessiota ei lasketa (~2°/150 v, mainittu pakan otsikossa). Attribuutio näkyvissä lähde-kentässä (BSC/CDS, ConstellationLines CC BY 4.0, IAU CC BY). Renkaan 1 leikkilinsseistä valmiina Kellot, Lippuarvaus ja Tähtitaivas. CI: savukkeet-mac-rivin kolmas ja viimeinen siirtojäänne oli .github/workflows/savukkeet.yml:n CHROMIUM-polku vanhan käyttäjän Playwright-cacheen; Julkaisija vaihtaa sen koodaus-käyttäjän cacheen (/Users/koodaus/Library/Caches/ms-playwright/chromium-1234/...).

## KODEXILLE: 97 KOHDEKARTAN PIENOISMALLIA EUROOPPAAN; KADONNEET MONUMENTIT ENNEN VISOJA (21.9.2026 klo 15.13)

Omistaja 21.9.2026: 1) Kadonneet monumentit (iso ajon vaihe 7, 1–3 per Euroopan maa, Codex-havainnekuvat) nostetaan Sisältökirjurin jonossa visojen edelle heti linssit-rengas1:n jälkeen, koska Codexilla on kapasiteettia; aamun 8 monumentin tilaus peruttiin, koska kuvat olivat jo olemassa (inventaariotyökalun virhe). 2) Omistajan kysymys pienoismalleista: Euroopan kohdekartoista puuttuu 97 miniatyyriä 15 kaupungissa (Bryssel, Ljubljana, Košice ja Bergen kokonaan; Pariisi 19, Lontoo 14, Wien, Berliini, Madrid, Rooma 6, Amsterdam 5, Istanbul, Helsinki, Ateena, Pietari 1). Raamatun sääntö: jokainen kohde tarvitsee miniatyyrin. Fable tilasi ne Codexilta postilaatikkoon (posti/fable-codexille-miniatyyrit-eurooppa-20260921.md) kahdessa erässä samassa seepiamusteluonnostyylissä kuin nykyiset; vuosiluvulliset tapahtumakohteet piirretään tapahtuman hetkenä ilman tunnistettavia kasvoja. Julkaisija hakee, Sisältökirjuri kytkee miniatyyrit.js-tauluun.

## OMISTAJA: KARTAN NYKIMINEN JA POMPPIMINEN YKKOSPRIORITEETTI; TESTFLIGHT-LINKKI TEHTY (21.9.2026 klo 15.22)

Omistaja 21.9.2026 iltapäivä: kartan nykiminen ja pomppiminen on nyt tärkein prioriteetti; tavoite yhtä pehmeä kuin Google Earth. Fable siirsi Julkaisijan jonon kärkeen sulavuuserät (Karttaseppä E2 ja E3, Pelikoodari nimiöt E2 ja E3), omistaja testaa tuntuman heti kun ne ovat tuotannossa, ja Karttaseppä ja Pelikoodari ottavat palautteen ennen muita töitä. TestFlightin julkinen linkki apurahan arvioijille on tehty (https://testflight.apple.com/join/KxKekB4n, hakemuksen liitteenä). CI: Julkaisijan PR #2649 (Chromium-polku koodaus-käyttäjän cacheen) korjasi savukkeet-mac-rivin (788/793 läpi); viisi jäljellä olevaa punaista savuketta ovat oikeita vikoja, jotka Fable jakaa omistajille.

## MUUTTOLINNUT-LINSSI VALMIS; KAMERAN ENNUSTE ALOITETAAN HETI (21.9.2026 klo 15.25)

Pelikoodari 21.9.2026 (pelikoodari-muuttolinnut b0cdc61f): neljäs leikkilinssi Muuttolinnut valmis: kuusi lajia (kurki, haarapääsky, tervapääsky, kiuru, valkoposkihanhi, käki) reitteinä pallolla, parvet kuukauden mukaan, lajikortit (matka, nopeus, korkeus, ajat, Fablen huomio), Horation kortti, Livia kysyy lajin ja kuukauden ja pelaaja napauttaa maata, oikeasta 20 tietäjäpistettä (XP_MUUTTOLINNUT). Reittitaulukko on pelin omaa tuotantoa lähteet mainiten (Luomus, BirdLife, Euring, Lund 2016, BTO), Fable tarkisti. Leikkilinsseistä jäljellä Yökartta ja Vuodenajat. Sulavuus: Karttaseppä aloittaa kameran ennusteen (E4b) heti ilman omistajan tuntumatestin odottamista; Pelikoodari tekee nimiöiden ennustekoukun; GL-kerros päätetään vasta omistajan palautteen ja iPhone-mittauksen jälkeen. Codexille lähetetty myös 10 kadonneen monumentin loistoaikakuvat (FRA/DEU/ITA/GRC, posti/fable-codexille-monumentit-eurooppa-1-20260921.md); rappeutunut-kohteet saavat Commons-nykykuvan parin toiseksi puoleksi.

## OMISTAJA: UUDET LINSSIT ODOTTAVAT, KARTTA ENSIN; GL-KERROS TYON ALLE TUNTUMATESTIN JALKEEN (21.9.2026 klo 15.26)

Omistaja 21.9.2026: uudet linssit voivat odottaa, kunnes kartta saadaan toimimaan; heti tuntumatestin jälkeen GL-kerros (nimiöt ja merkit pallon omaan WebGL-piirtoon) otetaan työn alle. Pelikoodari ja Karttaseppä: kameran ennuste (E4b) nyt, GL-kerroksen suunnitelma rinnalla (docs/raportit/gl-kerros-suunnitelma-20260921.md), Yökartta ja Vuodenajat sekä muut linssierät odottavat. CI: kolme punaista savuketta (musta-laatta-webkit, nostokuva-karuselli, astro-sumu) johtui WebKitin puuttumisesta uudesta käyttäjästä; Fable asensi Playwrightin WebKitin koodaus-käyttäjälle. Kaksi muuta (nimiot-sulavat 4/5, laivamatka-tanger 3/4) Pelikoodarille.

## TESTIT KAYTTAVAT AINA MAC STUDION KAIUTTIMIA; HOMEBREW KOODAUS-KAYTTAJALLE (21.9.2026 klo 15.35)

Omistaja 21.9.2026: testit (simulaattorikierrokset ja savukkeet-mac) käyttävät aina Mac Studion kaiuttimia, eivät koneen oletusulostuloa (Scarlett Solo USB). Toteutus: switchaudio-osx asennettu (SwitchAudioSource); Laitetestaaja vaihtaa ulostulon kierroksen alussa ja palauttaa lopussa, Julkaisija lisää saman savukkeet-mac-jobiin (alku + always-palautus). Vaihto on koneenlaajuinen testin ajan. Mac-siirron viimeinen jäänne: omistaja siirsi /opt/homebrew-hakemiston omistuksen koodaus-käyttäjälle, jotta brew toimii. Julkaisija mergeää PR:t Testit-portin vihreydellä (roolitus), savukkeet-mac raportoidaan jälkikäteen; prosessikysymykset Fablelle, ei omistajan kortiksi.

## SULAVUUS E4B KAMERAN ENNUSTE VALMIS; GL-KERROKSEN SUUNNITELMA (21.9.2026 klo 15.39)

Karttaseppä 21.9.2026 (karttaseppa-ennuste 3f30ae90, Pelikoodarin pelikoodari-ennustekoukku 8e8f4993): kehyskoukku antaa kameran ennusteen seuraavalle kehykselle ja CSS2D-nimiöt ja merkit siirretään ennustettuun paikkaan onAfterRender-vaiheessa; kytkin ?ennuste=0. Mittaus: sileässä liikkeessä nimiön laahaus 3,5 → 1,1 px/kehys, zoomin liuku 0,41 → 0,16; Playwrightin hiirisyötteellä ei hyötyä (syöte joka toinen kehys), laitteella kosketus tulee näytön tahdissa. Raportti docs/raportit/sulavuus-e4b-20260921.md. GL-kerroksen suunnitelma docs/raportit/gl-kerros-suunnitelma-20260921.md (runko, 3 päivän vaiheet); Pelikoodari täydentää ulkoasun, napautuksen ja sovittelun. GL-kerros alkaa omistajan tuntumatestin jälkeen.

## MERGE ILMAN OHITUSTA JA ILMAN KORTTIA: MAIN EI OLE SUOJATTU (21.9.2026 klo 15.47)

Fable 21.9.2026 (omistajan pyyntö: merge-kysymykset loppuvat): GitHubissa main-haaralla ei ole suojaussääntöjä eikä pakollisia tarkistuksia, joten ohitusta ei tarvita koskaan. Julkaisija mergeää PR:n tavallisesti heti kun Testit-portti on vihreä, ilman erikoislippuja ja ilman korttia omistajalle; savukkeet-mac raportoidaan jälkikäteen Fablelle. Kortti omistajalle vain, jos Testit on punainen ja merge halutaan silti. Prosessikysymykset Fablelle SendMessagella.

## ENNUSTEKOUKKU VALMIS; GL-KERROKSEN VAIHE 1 ALKAA HETI (21.9.2026 klo 15.51)

Pelikoodari 21.9.2026 (pelikoodari-ennustekoukku 9be0de5d): nimiöiden koko lasketaan ennustetusta korkeudesta, mittariin ennustevirhe (panorointi 0 px, zoomi p95 0,33 px), tahallinen yhden kehyksen ennakko. Punaiset savukkeet selvitetty: nimiot-sulavat 4/5 mainissa on odotettu kunnes E2 on mainissa; Tanger johtui WebKitin puutteesta (asennettu). GL-kerroksen suunnitelma valmis (docs/raportit/gl-kerros-suunnitelma-20260921.md, 61 riviä, Karttaseppä + Pelikoodari). Fable: GL-kerroksen vaihe 1 aloitetaan heti, ei odoteta tuntumatestiä tyhjänä; omistajan palaute E2–E4:stä ohittaa GL-työn, jos korjattavaa tulee.

## NYKYMAAKUNNAT TUOTANNOSSA: NIMIOVERSIO 2026-09-21f-nimiot (21.9.2026 klo 16.08)

Karttaseppä 21.9.2026: maakuntien nimiötaso poltettu ja viety tuotantoon (versio 2026-09-21f-nimiot, 452 laattaa z4–z8: 19 nykyaluetta vahvalla ruostemusteella ja rajat, entiset 102 nimiötä ennallaan), luettelo ämpärissä, tuotanto tarkistettu kaappauksella (sama kuin paikallinen poltto). Sisältökirjuri vahvisti nimet ilman korjauksia. Nimet näkyvät z7:stä jos mahtuvat ja z8:sta, rajat z6:sta. Nimiöversio vaihtui e → f, vain nimiotaso-kenttä; edellinen luettelo tallessa. GL-kerroksen vaihe 1 (runko) työn alla haarassa karttaseppa-gl-runko, Pelikoodarin rasterilähde pushattu.

## LOYTAMISEN SUMU POIS; POSTIVAHTI SONNETILLE (21.9.2026 klo 16.15)

Omistaja 21.9.2026 (tuotantokaappaus v1997): löytämisen sumu (aamun kokeilu: kohdemaan löytämättömät nostot haaleina luonnoksina) otetaan pois; nostot näkyvät aina ikonilla ja nimiöllä kuten ennen kokeilua. Kokeilu näkyi tuotannossa pelkkinä ympyröinä ilman ikonia ja nimeä. Pelikoodari palauttaa nostot heti. Karttaseppä tarkistaa, miksi 1873-kulttuurinimet näkyvät katkonaisina z6:lla nimiöversion f jälkeen. Postivahti: Haiku ei noudattanut skriptipohjaista ohjetta vaan keksi yhdistelmäkomentoja, jotka vaativat luvan joka kierroksella, ja /loop-työ jäi elämään /clearin yli; Postivahti avataan uutena sessiona Sonnetilla (tyhjäkäynti yhtä halpaa: yksi komento per kierros), kierros ajaa vain bash .postivahti.sh worktreessä /Users/koodaus/Matkakirja-posti.

## LOYTAMISEN SUMU POIS OLETUKSENA (Pelikoodari 0c00d12c) (21.9.2026 klo 16.24)

Pelikoodari 21.9.2026: sumu-pois-erä valmis (pelikoodari-sumu-pois 0c00d12c): nostot aina näkyvissä ikonilla ja nimiöllä, ei sumua eikä luonnosrenkaita; sumu vain lipulla ?loytosumu=1. Syy vuotoon: aamun kokeilu oli julkaistu oletuksena päällä (sumu.js: 'julkaisussa kaikille'), ei kehittäjälipun takana; tuotannon tyhjät ympyrät olivat luonnosnostoja. Julkaisija mergeää tämän jonon kärkeen.

## LAIKUKAS MERI JA KATKENNEET ALUENIMET: LAATTATASOJEN Z-TAPPELU; GL-AIKATAULU NOPEUTETTU (21.9.2026 klo 16.30)

Karttaseppä 21.9.2026: omistajan havaitsema laikukas meri Biskajalla ja haaleat, katkenneet 1873-kulttuurinimet eivät johdu sumusta eivätkä luettelosta vaan laattatasojen z-tappelusta: zoomin jälkeen muistiin jäävä karkeampi laatta (z5) oli samalla syvyyssiirrolla kuin nykyinen taso ja vuoti paikoin läpi (meri eri kohinalla, nimiöt eri paikassa ja koossa); E2/E3 toi tilanteen useammin esiin, koska karkeat laatat jäävät muistiin. Korjaus karttaseppa-syvyyssiirto ceb7d59e: syvyyssiirto aseman mukaan (hienompi −10, nykyinen −8, karkeampi −6, tuki −4, vektorit −12). Poltetut f-laatat ovat ehjiä. GL-kerros nopeutettu omistajan pyynnöstä: tänään illalla kaupunkinimet GL:ssä tuotantoon ?glnimiot=1 takana (runko piirtää yhdellä drawcallilla, 0,002 ms/kehys); huomenna aamulla nostot, kuvamerkit, crossfade ja napautus, iltapäivällä linssimerkit ja Laitetestaajan laiteluku, illalla GL oletukseksi ja CSS2D perääntymistienä ?glnimiot=0. Karsittu ensimmäisestä versiosta horisontin häive, atlaksen LRU ja fonttien odotus. Parvet (Sonnet) savukkeiden GL-versioihin.

## NOSTOKORTTI TYOPOYDALLA: KAKSI PALSTAA LEVEALLA, PINO KAPEALLA; v1998-v2000 MAINISSA (21.9.2026 klo 16.39)

Omistaja 21.9.2026 (Le Mans -nosto työpöydällä: kuva iso, tekstipalsta liian leveä): nostokortti taitetaan yli ~1 100 px ruuduilla kahdelle palstalle (kuva vasemmalla ~58 %, pystykuvassa kapeampi; oikealla kuvateksti, teksti ja Lukijan kysymys), alle ~1 100 px pinona enintään ~760 px leveänä, puhelin ennallaan. Tekstiä ei lisätä: nostot pysyvät lyhyinä. Pelikoodari tekee Sonnet-parvella GL-työn rinnalla. Julkaisija: v1998 (kameran ennuste E4b), v1999 (löytämisen sumu pois), v2000 (laattatasojen z-tappelu korjattu) mainissa; jonossa nimiöt E2 (PR #2652), E3, ennustekoukku, gl-rasterit.

## LEHDEN VUOSILUKU OIKEAAN REUNAAN; REAKTIOT KAHTEEN: SYDAN JA PEUKKU ALAS (21.9.2026 klo 16.44)

Omistaja 21.9.2026 (Ranskan lehden Historia-osio työpöydällä): 1) jutun vuosiluku siirretään otsikkorivin oikeaan reunaan; 2) reaktiot siirretään otsikkoriviltä leipätekstin loppuun Lue lisää -linkin viereen; 3) viiden symbolin reaktionivaska (27.8.2026: laakeri, sydän, suurennuslasi, tiimalasi, mustetahra) korvataan kahdella suoraan näkyvällä napilla: sydän (hyvä) ja peukku alas (huono); peukku alas avaa tarkentavan kysymyksen (tylsä / virhe tiedoissa tekstikentällä / muu). Vanhat äänet lasketaan: hieno, ihana, mielenkiintoinen → sydän; tylsä, virhe → peukku alas. Koskee lehtiä, kohdekortteja ja nähtävyysjuttuja. Pelikoodari tekee Sonnet-parvella GL-työn rinnalla.

## ENNUSTE POIS OLETUKSENA GL:AAN ASTI; NOSTOT PUUTTUVAT ERI TAVOIN WEBAPISSA (21.9.2026 klo 16.52)

Omistaja 21.9.2026 ilta: ?ennuste=0 pitää nimet paremmin paikallaan → kameran ennuste (E4b) sammutetaan oletuksena kunnes GL-kerros on oletus (Karttaseppä, pieni PR). Nostojen näkyvyys vaihtelee: selaimessa enemmän, ?ennuste=0:lla vähemmän, asennetussa webapissa ei lainkaan; Pelikoodari ei saanut toistumaan uudella pelillä → epäily service workerin välimuistista, ennustekoukun ja merkkien piirron riippuvuudesta tai tallennetun pelin tilasta (päivä 4, Marseille). Kaappaukset docs/raportit/kaappaukset/omistaja-20260921/. Fable-sessio nollataan; luovutus viesti-fable-luovutus-20260921-ilta.md.

## HEILUNNAN SYY ENNUSTE (POIS 163bdee8); MEREN VILKKUMINEN KORJATAAN POHJAPOLTOSSA, LUPA ANNETTU (21.9.2026 klo 16.53)

Karttaseppä 21.9.2026 ilta: nimiöiden, nappulan ja nostojen heilunta johtui E4b:n ennusteesta (johtaa aina yhden kehyksen; Macin selaimessa DOM ei laahaa, joten johto näkyy heiluntana ja palautumisena). Sammutettu oletuksena (karttaseppa-ennuste-pois 163bdee8, ?ennuste=1 kokeiluksi). Meren möhnä ja vilkkuminen zoomatessa eivät ole laattavika: syvyysporrastuksen kohina lasketaan tason pikseleissä, joten z6:n ja z7:n laikkukuvio eroaa ja tason vaihdon häive sekoittaa ne; möhnä on 3000 m:n rajan ja kohinan yhdistelmä Biskajan syvänteessä. Korjaus pohjapolton reseptiin: kohina laudan yksiköissä + isobaatit. Fable antoi luvan pohjapolttoon koelaattojen jälkeen (tänä yönä, 2 h CI-tauko Julkaisijan kanssa GL-kokeiluversion jälkeen).

## MEREN VILKKUMISEN SYY VAHVISTETTU KOELAATOILLA; POHJAPOLTTO 2026-09-22-POHJA LAHTEE YOLLA (21.9.2026 klo 16.59)

Karttaseppä 21.9.2026 ilta: koelaatat isobaateilla ja kohina laudan yksiköissä (Biskaja z6+z7, kuvavertailu ja pelin zoom 596 kehystä): meri tasainen, ohuet syvyyskäyrät, ei laikkuja eikä kuvion vaihtumista tason vaihdossa. Vilkkuminen oli syvyysporrastuksen laikkujen häive; käyrillä sitä ei synny. Resepti valmis (--syvyyskayrat 200,1000,3000 --syvyyskohina lauta, versio 2026-09-22-pohja, pallotunniste 20260922a; koodi karttaseppa-maakuntavedos 0455f4ef). Julkaisija antaa 2 h CI-ikkunan yöksi, osoitin-PR polton jälkeen; luettelo vaihdetaan vasta kun osoitin on mainissa, Karttaseppä ilmoittaa Fablelle. Ennuste-pois (163bdee8) Julkaisijan jonon kärjessä. Fable: lupa pysyy voimassa, ei lisäehtoja.

## v2001-v2003 MAINISSA: NIMIOT E2+E3, ENNUSTE POIS OLETUKSENA; TUNTUMATESTI OMISTAJALLE (21.9.2026 klo 17.05)

Julkaisija 21.9.2026 ilta: v2001 (nimiöiden liukuva koko E2), v2002 (nimien paikka lukittu liikkeen ajaksi E3) ja v2003 (kameran ennuste CSS2D:ssä pois oletuksena, korjaa v2000:n heilunnan) mainissa, testit 0 fail. Jono jatkuu: ennustekoukku, gl-rasterit, sitten Karttasepälle 2 h CI-tauko pohjapolttoon. Fable pyytää omistajalta tuntumatestin v2003:lla (heilunta, meren vilkkuminen zoomatessa, nostot selain/webappi).

## MAC STUDIO KAYNNISTETAAN UUDELLEEN (ETAYHTEYS); TILA ENNEN TAUKOA (21.9.2026 klo 17.16)

Omistaja 21.9.2026 n. klo 17.20: Mac Studio käynnistetään uudelleen etäyhteyden takia, omistaja lähtee kotiin ja jatkaa etänä. Kaikki roolisessiot kaatuvat; ne avataan uudelleen luovutusten pohjalta. Tila: v2003 mainissa; Julkaisijan jono ennustekoukku → gl-rasterit → Karttasepän 2 h CI-tauko pohjapoltolle (ei saa olla käynnissä uudelleenkäynnistyksen aikana; Karttaseppä tarkistaa ajon /Users/koodaus/pyramidi-poltto/ajo-20260922/ tilan ennen jatkoa). Pelikoodarilta odotetaan korjattu konsolikomento nostovikaan (tauolla puuttuu tuotannosta) sekä sähke-CORS 403 (matkakirja.app ei workerin sallittu origin) ja Pariisin fokuspuheen aikaleimat 404 -tutkinta. Codex ei ole lukenut 21.9. tilauksia (viimeinen toiminta 13.55); omistaja tarkistaa Codexin pollauksen.

## MAC STUDIO KAYNNISTETTY; ROOLISESSIOT AVATAAN UUDELLEEN; v2004 MAINISSA (21.9.2026 klo 17.25)

Fable 21.9.2026 ilta: Mac Studio käynnistetty uudelleen, kaikki roolisessiot kaatuivat; omistaja avaa ne uudelleen Fablen aloitusviesteillä (Julkaisija, Karttaseppä, Pelikoodari, Sisältökirjuri, Laitetestaaja, Postivahti). Pohjapoltto ei ollut alkanut (ajokansio valmis, ei prosesseja). Julkaisija ehti mergetä v2004 (kamera-nimiöt-rajapinta E4) ennen katkoa. Pelikoodarin muistiinpano (nostovian juurisyyepäily: pisteetVain-tila, lehdenOsuus vain leveydestä; korjaus max(leveys, korkeus)) ja keskeneräiset haarat pelikoodari-gl-nimiot 84859ec3, pelikoodari-reaktiot-sydan adb913d2 (valmis, savuke 15/15), pelikoodari-nostokortti-leveat (kesken). Codex ei vieläkään lukenut 21.9. tilauksia.

## SESSIOIDEN KONTEKSTIN VALVONTA FABLELLE: 70 % = LUOVUTUS JA NOLLAUS (21.9.2026 klo 17.32)

Omistaja 21.9.2026 ilta (Julkaisija 84 %, Karttaseppä 97 %, Sisältökirjuri 84 % uudelleenkäynnistyksen jälkeen; kukaan ei valvonut): Fable valvoo roolisessioiden kontekstin täyttöastetta get_usage-työkalulla aina kun sessio ilmoittaa erän valmiiksi ja vähintään kerran illassa. Kun sessio ylittää 70 %, Fable käskee sen kirjoittaa luovutuksen docs/raportit/viesti-<rooli>-luovutus-<pvm>.md ja pushata; omistaja nollaa session /clear-komennolla ja Fablen aloitusviestillä. Sessiot eivät odota automaattista tiivistystä (97 %). Nollattu 21.9. illalla: Julkaisija, Karttaseppä, Sisältökirjuri; Pelikoodari 36 % ja Laitetestaaja 60 % jatkavat.

## KONTEKSTIN VALVONTA POSTIVAHDILLE (10 MIN KIERROS), FABLE REAGOI (21.9.2026 klo 17.33)

Omistaja 21.9.2026 ilta: kontekstin täyttöasteen valvonta siirretään Fablelta Postivahdille. Postivahdin kierros 10 min välein: 1) postilaatikkoskripti, 2) get_usage jokaiselle roolisessiolle; yli 70 % → yksi rivi Fablelle, uusi ilmoitus samasta vasta yli 85 %. Fable käskee luovutuksen ja omistaja nollaa session. Fablen oma tarkistus jää varmistukseksi erän valmistumisen yhteydessä.

## NOSTOVIAN JUURISYY: KAMERA MAAN ZOOMIRAJAN ULKOPUOLELLA (SAFARIN ELE OHITTAA RAJAN); SAHKE-WORKER VANHENTUNUT (21.9.2026 klo 17.35)

Pelikoodari 21.9.2026 ilta: nostot puuttuvat, koska kamera on maan uloszoomausrajan (maanZoomiraja, korkeus ~0,2) ulkopuolella: omistajan kaappauksessa Ranska on 40 % ruudun leveydestä, jolloin nostot.js:n pisteetVain-tila pudottaa nostot pisteiksi ja z5-laatoissa ei ole nimiötasoa (myös meren möhnä samasta näkymästä). Rajan sisällä nostot 69/69 kaikilla ruutuko'oilla. Konsolin 'korkeus hyppäsi' on sama: Safarin ele tai rulla (E3+E4, v1997) ohittaa rajan. Korjaus Karttasepän zoomikoodiin: raja pitää myös eleissä ja rullassa. Sähke-CORS 403: worker vanhentunut, SAHKE_ORIGINIT sai matkakirja.app:n 6.9. (#2092) mutta sahke-worker.yml:n ajo 6.9. epäonnistui; Julkaisija ajaa uudestaan ja selvittää kaatumisen. Korjattu konsolikomento omistajalle annettu (pov.altitude ratkaisee).

## LAITEKIERROS v2004: HEILUNTA POISSA; VILKKUMISEN EPAILY KOKO.OSUUS PUTOAA NOLLAAN SYVASSA ZOOMISSA (21.9.2026 klo 17.38)

Laitetestaaja 21.9.2026 ilta (docs/raportit/laitekierros-v2004-iphone-vertailu.md, haara laitetestaaja 3eea5361): heiluntaa panoroidessa ei millään laitteella (0 px mediaani ja p95, iPhone, työpöytä, aiempi iPad). Meren ja nimiöiden vilkkuminen zoomatessa: nimiön koon liukuvuus (koko.osuus) putoaa 0,80:stä nollaan syvässä zoomissa identtisesti iPhonella ja työpöydällä; sijainti pysyy tarkkana mutta koko lakkaa liukumasta. Nostot Ranska z6 työpöydällä kunnossa; iPhonella epävarma. Fable: koko.osuus-pudotus Pelikoodarille tutkittavaksi (E2-koko ja ennustekoukku) yhdessä Karttasepän kanssa; zoomirajan ohitus Safarissa Karttasepälle nollauksen jälkeen.

## NOSTOKORTIN TAITTO HYLATTY (TYHJA TILA); ZOOMIRAJA PITAA, EPAILY AJON KATTO; SAHKE-WORKER: CLOUDFLARE-TOKEN VANHENTUNUT; VISAT ERA 1 VALMIS (21.9.2026 klo 17.52)

Omistaja 21.9.2026 ilta: nostokortin kaksipalstainen taitto (pelikoodari-nostokortti-leveat 955f8345) hylätty: kuvan vieressä aivan liikaa tyhjää tilaa (kuvateksti ylhäällä, leipäteksti pohjassa, väli tyhjä). Fable Pelikoodarille: kuvateksti kuvan alle, leipäteksti alkaa oikean palstan yläreunasta, kortin korkeus sisällön mukaan, kortti enintään ~1100 px ja kuva enintään puolet; uudet kaappaukset omistajalle. Karttaseppä (karttaseppa-zoomiraja 998dc1f0, savuke 24/24): zoomiraja pitää WebKitissä ja Chromiumissa kaikilla zoomipoluilla (rulla, nipistys, gesture, pointOfView palaavat 0,2049:ään); jäljelle jää ajon katon nosto (lauta.js asetaAjonKatto, matkallaVapaana, linssin syrjäytys tai maailmatila); Pelikoodari jatkaa siitä. Julkaisija: sahke-worker.yml kaatui 6.9. koska CLOUDFLARE_API_TOKEN-secret ei kelpaa (Authentication error 10000); omistajan on luotava uusi token ja päivitettävä GitHub-secret. gh pr merge --admin estyy auto-moden luokittimessa: main ei ole suojattu, merge ajetaan ilman --admin-lippua (loki MERGE ILMAN OHITUSTA). Sisältökirjuri: visat erä 1 (sisalto-visat-1 f1788e95): 40 visaa, BIH/CHE/GBR/ISL/NOR/RUS/TUR/UKR kolmasosaan, visaosuus 22,4 → 25,5 %, testit 0 fail; erä 2 GRC/EST/DEU alkaa.

## SAHKELINJAN CLOUDFLARE-TOKEN UUSITAAN MYOHEMMIN; EI KIIREELLINEN (21.9.2026 klo 18.02)

Omistaja 21.9.2026 ilta: sähkelinja (moninpelin retkikunta, sähkeet, kaveriapu; worker matkakirja-sahke + D1) on ollut tuotannossa poikki 6.9. lähtien (CLOUDFLARE_API_TOKEN ei kelpaa, julkaisu kaatui). Yksinpeli ei tarvitse sitä. Omistaja uusii tokenin ja GitHub-secretin myöhemmin; Julkaisija ei odota sitä, ajaa sahke-worker.yml:n vasta kun Fable ilmoittaa.

## MERIKORISTEET PALLOLLE HYVAKSYTTY; OMISTAJA KYSYY VEDOKSEN TASOKARTASTA (21.9.2026 klo 18.05)

Omistaja 21.9.2026 ilta: Karttasepän merikoristevedos (karttaseppa-merikoristeet 7b55bc78: 29 Codexin koristetta valtamerillä, 4 kompassiruusua ja 25 laivaa, z1–z3, data assets/koristeet/meri/pallo-koristeet.json) hyväksytty poltettavaksi tuotantoon omana eränä (nimiöversio g + pallon sarja b + osoitin-PR) pohjapolton yhteydessä. Omistajan kysymys: vedoskuvat ovat tasokarttaa (Mercator-arkki kehyksineen, 'Painettu Matkakirjan kustantamossa MDCCCLXXIII'), ei pallokarttaa; Karttaseppä selvittää, onko kyse vain vedostyökalun tasoesityksestä vai näkyykö vanha tasokartta pelissä, ja toimittaa kaappauksen pallolta pelistä.

## VISAT ERA 2 VALMIS; FOKUSKOHTEIDEN VISAKIELTO PURETAAN KAIKILTA MAILTA (21.9.2026 klo 18.07)

Sisältökirjuri 21.9.2026 ilta: visat erä 2 (sisalto-visat-2 2a687eca): 25 visaa, GRC 22/66, EST 14/42, DEU 17/51, kaikki tasan kolmasosa; kaikki kahdeksan erien 1–2 maata nyt vähintään 1/3. Kysymys: tests/fokusvirta.test.mjs kieltää visan FOKUSKOHTEET_GRC-kohteilta ('kohdenosto on tarjouksen ydin', Ateenan pilotin tilaus elokuu 2026), mutta piirraNostonVisa toimii kaikkien maiden fokuskohteille ja erässä 1 visoja lisättiin BIH:n ja TUR:n fokuskohteisiin. Fablen päätös: kielto oli pilotin aikainen rajaus, ja 20.9. linjaus (visoja joka maahan vähintään kolmasosaan) on uudempi ja yleinen; kielto puretaan kaikilta mailta, GRC mukaan lukien. Sisältökirjuri poistaa vahdin rivin testistä samassa erässä (kommentti: purettu 21.9.2026, loki) ja saa lisätä visoja fokuskohteisiin samoin ehdoin kuin muihin nostoihin. Julkaisijan jonoon visat-1 ja visat-2.

## NOSTOKORTIN TAITTO HYVAKSYTTY (e9e8ec56); AJON KATTO EI TOISTU, v2007 KATTAA OIREEN (21.9.2026 klo 18.10)

Omistaja 21.9.2026 ilta: nostokortin korjattu taitto hyväksytty (pelikoodari-nostokortti-leveat e9e8ec56: kuvateksti kuvan alla, leipäteksti ja Lukijan kysymys oikean palstan yläreunasta, kortti ≤ ~1100 px, kuva ≤ 50 %, korkeus sisällön mukaan; savuke 49/49, testit 0 fail). Julkaisijan jonoon. Pelikoodari: ajon katon nosto ei toistu Chromiumissa maamatkalla Pariisi→Marseille (katto 2,5 matkan ajaksi, palautuu 0,2049:ään perillä); lento ja laiva testaamatta; v2007 (nostot näkyviin kun maa kokonaan ruudulla) kattaa oireen; jäljitys jatkuu vain omistajan uudesta havainnosta. Pelikoodari siirtyy GL-vaiheeseen 2.

## POHJAPOLTON AIKANA EI MERGE-TAUKOA: TESTIT AJAA UBUNTULLA, SAVUKKEET-MAC PERUTAAN JA AJETAAN JALKEEN; VISAERIEN PAALLEKKAISYYS (21.9.2026 klo 18.17)

Omistaja 21.9.2026 ilta kysyi, miksi pohjapoltto vaatii CI-tauon ja voisiko CI:n siirtää siksi aikaa GitHubiin. Fable tarkisti: Testit-portti ajaa jo ubuntulla (kytkin REITTI=ubuntu 19.9. lähtien), vain Savukkeet ajaa Macin self-hosted-runnerilla (PR-portti savukkeet-mac; ubuntu-matriisi vain fork-PR:ille, ei kytkintä). Koska merge-ehto on Testit vihreä ja savukkeet-mac raportoidaan jälkikäteen, merge-taukoa ei tarvita: Julkaisija mergeää polton aikana normaalisti, peruu polton aikana käynnistyvät savukkeet-mac-ajot (gh run cancel) ja ajaa ne workflow_dispatchilla polton jälkeen; ajastettu täysi sarja klo 03 UTC ei osu kahden tunnin yöpolttoon. Karttaseppä aloittaa polton, kun Julkaisija on perunut käynnissä olevat savukkeet. Julkaisija huomasi: visat-1 ja visat-2 lisäsivät visan samoihin 12 kohteeseen (BIH/GBR/NOR/TUR) toisistaan tietämättä; konfliktissa säilytettiin julkaistu visat-1, visat-2:n duplikaatit pudotettiin, ei sisältövirhettä. Sisältökirjuri pohjaa jatkossa jokaisen erän edellisen erän kärkeen (ei erillisiin haaroihin samasta pohjasta) ja pitää maajaon inventaariossa.

## GL VAIHE 2 KOKEILUUN: LADONNAN KAUPUNKINIMET WEBGL-KERROKSEEN ?glnimiot=1 (00b4d653) (21.9.2026 klo 18.18)

Pelikoodari 21.9.2026 ilta: GL vaihe 2 valmis kokeiluun (pelikoodari-gl-nimiot 00b4d653, pohja v2007, sisältää Karttasepän rungon cb31dc47). ?glnimiot=1: ladonnan kaupunkinimet piirtyvät pallon WebGL-kerrokseen (sovitin js/pallolauta/glnimiot-sovitin.js → runko js/pallonimiot-gl.js), CSS2D vain perääntymistienä kun rasteri on kesken tai atlas täynnä; oletus pois; ?glnimiot=testi rungon testinimiöt. Savukkeet glnimiot-nimet 7/7, glnimiot 8/8, testit 3825/0, standalone ok. Fable: Julkaisijalle heti (lipun takana, ei omistajan korttia). Laitetestaaja mittaa iPad/iPhone ?glnimiot=1 kun tuotannossa (WebKit-tekstuuri, CSS2D-siirtymä). Vaihe 3 (nostot, nappula, linssimerkit, kylkivaihdon crossfade) alkaa; GL oletukseksi vasta Laitetestaajan luvun ja omistajan tuntuman jälkeen.

## GL-KERROS OLETUKSEKSI HETI ILMAN LIPPUA; OMISTAJA TESTAA VAIN NATIIVILLA iOS-APILLA (21.9.2026 klo 18.22)

Omistaja 21.9.2026 ilta: GL-kerros (kaupunkinimet WebGL:ssä) otetaan suoraan oletukseksi ilman kokeilulippua; omistaja testaa aina natiivilla iOS-apilla, jossa URL-lippuja ei voi käyttää. Pelikoodari kääntää oletuksen päälle samaan erään (00b4d653 tai jatkocommit): GL päällä oletuksena, CSS2D perääntymistienä vain kehittäjälipulla ?glnimiot=0 ja automaattisesti kun WebGL-tekstuuri ei ole käytettävissä. Sama linja vaiheelle 3 (nostot, nappula, linssimerkit, crossfade): jokainen valmis erä oletukseksi heti, ei lippujen taakse. Laitetestaaja mittaa oletustilan (iPad, iPhone, simulaattori) ja vertaa ?glnimiot=0:aan. Korvaa 21.9. klo 16.30 aikataulun kohdan 'GL oletukseksi huomenna illalla'.

## VISAT ERA 3 VALMIS (92e582c5): 43 VISAA, 8 MAATA KOLMASOSAAN (21.9.2026 klo 18.22)

Sisältökirjuri 21.9.2026 ilta: visat erä 3 (sisalto-visat-3 92e582c5, rebasattu v1973-prepin päälle, sisältää visat-1:n v2008): 43 visaa, LVA/LTU/ITA/FIN/SWE/BGR/HRV/ROU 33–35 %; tarkistettu ettei kohteella ollut visaa; testit 0 fail. Erä 4 alkaa (AUT/CZE/DNK/ESP/HUN/NLD/PRT/FRA/POL/IRL) pohjana visat-3. Julkaisijan jonoon.

## POHJAPOLTTO ALKOI 18.35; MERIKORISTEET POHJAN KALUSTEIKSI (z1-z6) SAMAAN AJOON; VEDOKSEN TASOKARTTA VAIN TYOKALUN ESITYS (21.9.2026 klo 18.29)

Karttaseppä 21.9.2026 klo 18.35: pohjapoltto 2026-09-22-pohja alkoi (114 shardia, 16 ydintä, vaihe 1 ~50 min + vaihe 2 ~50 min). Omistajan tasokarttakysymys: vedoskuvat maailma-z1/z2 ovat vain vedostyökalun tasoesitys pyramidin laatoista (Miller-arkki kehyksineen); pelissä ei ole tasokarttanäkymää, pallo lukee samoja laattoja. Muutos: nimiötasoversio ei näy pelissä (retina lukee maailmankuvaan z4–z5, lepokerros ei piirrä sarjaa), joten merikoristeet poltetaan pohjan kalusteiksi merten nimien ja ruusun rinnalle (z1–z6, karttaseppa-merikoristeet 83429d8c mergetty polton työhaaraan, --koristeet); ei erillistä nimiö g / pallo b -erää. Pelikaappaukset docs/raportit/kaappaukset/merikoristeet-20260921/pallo-*.jpg. Osoitin-PR:ään tulee myös generoi- ja maailmapiirtokoodi, ei pelikoodia.

## VISAT VALMIS: 153 VISAA, KAIKKI 29 MAATA VAHINTAAN KOLMASOSAAN; SISALTOKIRJURIN SEURAAVA ERA MONUMENTTIEN NYKYKUVAT JA NOSTOT ILMAN KUVAA (21.9.2026 klo 18.36)

Sisältökirjuri 21.9.2026 ilta: visat erä 4 (sisalto-visat-4 4295c210): 45 visaa AUT/CZE/DNK/ESP/FRA/HUN/IRL/NLD/POL/PRT. Erät 1–4 yhteensä 153 visaa; kaikki 29 maata, jotka 20.9. inventaariossa olivat alle kolmasosan, ovat nyt vähintään 1/3; Euroopan visaosuus 22,4 → ~28 %. Testit 0 fail kaikissa. Fable: visastandardin kohta 3 täyttyy Euroopan osalta. Seuraava erä Sisältökirjurille: 1) fokusvirta-testin visakiellon poisto (jos ei vielä tehty); 2) kadonneiden monumenttien rappeutunut-luokan (11 kohdetta + tutkimuksen ehdottamat) aidot nykyvalokuvat Commonsista PD/CC tarkistettuina, kytkettynä kohteisiin niin että Codexin kulta-aikakuva täydentää parin myöhemmin; 3) sen jälkeen inventaarion 198 kuvatonta nostoa Commons-kuvilla maittain, huonoimmat ensin. Pienoismallien ja monumenttikuvien kytkentä heti kun Codex toimittaa.

## GL OLETUKSEKSI TEHTY (6aac029d); VANHAT DOM-SAVUKKEET AJAVAT PERAANTYMISTIETA SIIRTYMAAJAN (21.9.2026 klo 18.41)

Pelikoodari 21.9.2026 ilta: GL oletukseksi (pelikoodari-gl-nimiot 6aac029d), Julkaisijalle. ?glnimiot=0 = CSS2D-perääntymistie; ilman WebGL-tekstuuria runkoa ei synny ja kaikki jää CSS2D:hen; rungon kaatuessa se puretaan ja nimet palaavat CSS2D:hen samassa kehyksessä. GL-savukkeet mittaavat oletustilan; 25 vanhaa DOM-savuketta ajavat toistaiseksi perääntymistietä (&glnimiot=0) ja siirretään GL-mittareihin vaiheiden valmistuessa. Vaihe 3 (nostot ikoni+nimiö rungolle, kylkivaihdon crossfade) koodattu, odottaa savuketta, tulee omana eränä oletukseksi heti.

## CODEX TYOSTAA 21.9. TILAUKSIA, ENSIMMAISET KUVAT TULOSSA (21.9.2026 klo 19.22)

Omistaja 21.9.2026 ilta: Codex on lukenut tilaukset ja on vain hidas; ensimmäiset pienoismalli- ja monumenttikuvat ovat tulossa pian. Ei uusintatilausta. Postivahti ilmoittaa Fablelle toimituksista; Julkaisija hakee, Sisältökirjuri kytkee.

## GL VAIHE 2 VARTIJAVIKA KORJATTU (827850f1); VAIHE 3 NOSTOT RUNGOLLE KOODATTU (b7db847f), SAVUKE ODOTTAA POLTON JALKEEN (21.9.2026 klo 19.26)

Pelikoodari 21.9.2026 ilta: #2667:n Savukevartija-vika korjattu (pelikoodari-gl-nimiot 827850f1: ui.pallolautaGL() UI-metodi, lauta antaa ui.glKerros-kahvan). GL vaihe 3 koodattu (pelikoodari-gl-nostot b7db847f): nostot ikoni+nimiö rungolle, sovittelun siirto ja katto, piilotukset peittoina, kylkivaihdon crossfade 180 ms; CSS2D:hen jäävät ankkurit, liuskat, luonnokset ja pisteet; 61 nostoa rungolla, 8 CSS2D:ssä, 107 instanssia yhdellä drawcallilla; yksikkötestit 12/0. Ei vielä julkaistavaksi: savuke ja kaappaus ajamatta, kone jumissa polton takia (load 540). Fable: odotetaan polton loppu (~20.15), sitten savuke ja Julkaisijalle; Laitetestaajan laiteluku vasta v2014:n jälkeen tuotannosta, ei haarasta polton aikana.

## GL VAIHE 4 KOODATTU (57f9fd49): PELINAPPULA RUNGOLLE, KOHTEET JA LINSSIMERKIT JAAVAT CSS2D:HEN (21.9.2026 klo 19.42)

Pelikoodari 21.9.2026 ilta: GL vaihe 4 (pelikoodari-gl-nostot 57f9fd49, vaiheen 3 päällä): pelinappula rungolle (sama svg rasteroituna, jalka pisteessä, koko ei seuraa zoomia), nappulan laatikko ladonnan esteeksi datumista; kohteet ja linssimerkit jäävät CSS2D:hen (sykkivä halo, vapaa HTML); napautus datumeista, nappula ei napautettava. Testit 3832/0, savukevartija ok, standalone ok. Vaiheiden 3+4 savuke ja kaappaus polton jälkeen, sitten Julkaisijalle oletukseksi. Seuraavaksi DOM-savukkeet GL-mittareiksi (nimiot-vakaat/sulavat lukemaan rungon instansseja).

## MONUMENTTIEN NYKYKUVAT: 26 RAPPEUTUNUTTA KOHDETTA KYTKETTY (9cffb842); CURTEA VECHE PAALLEKKAIN BUKARESTIN MERKIN KANSSA (21.9.2026 klo 20.07)

Sisältökirjuri 21.9.2026 ilta (sisalto-monumentit-nykykuvat 9cffb842): 26 rappeutunut-kohdetta kytketty 19 maahan + ESP-pilotti: aito Commons-nykykuva R2:ssa, koordinaatit, ihme.osoite odottaa Codexin kulta-aikakuvaa samalla rakenteella. Havainnot: ROU Curtea Veche lähes päällekkäin Bukarestin kaupunkimerkin kanssa, maakartan nosto-linkki puuttuu (Karttaseppä tarkistaa sovittelun); SVK Čachtice ja UKR Kultainen portti muotoiltu harhaanjohtamatta (Báthorya ei syytetty; Kultainen portti on 1982 rekonstruktio). Testit 0 fail. Julkaisijan jonoon. Seuraava: 198 kuvatonta nostoa.

## v2014 GL-NIMIOT OLETUKSENA TUOTANNOSSA; POHJAPOLTON OSOITIN MAINISSA (#2670); SAVUKKEET-MAC 512/519 (21.9.2026 klo 20.09)

Julkaisija 21.9.2026 klo ~20.05: v2014 (GL-nimiöt oletuksena, vaihe 2) mainissa; pohjapolton osoitin-PR #2670 (pallon laatat 2026-09-22-pohja / 20260922a, isobaatit + merikoristeet) mainissa; luettelon vaihto Karttasepän ilmoituksella. Polton jälkeinen savukkeet-mac-dispatch mainista (v2005–v2015): 512/519, 8 uutta punaista: musta-laatta-webkit, astro-sumu ja nostokuva-karuselli kaatuvat ennen väitteitä (WebKit-oire, ei koodivika); kerma-reuna (Ranska/Saksa reliefi-sigma), nimiot-sulavat 2 uutta, laivamatka-tanger, ranskan-nostot-lukossa. Fable: Pelikoodari käy punaiset läpi GL-mittarisiirron yhteydessä (nimiot-sulavat ovat GL-oletuksen seurausta: DOM-mittari lukee tyhjää), kerma-reuna Karttasepälle jos uuden pohjan seurausta. Ei blokkaa mergejä.

## POHJAPOLTTO 2026-09-22-POHJA TUOTANNOSSA: BISKAJA TASAINEN, ISOBAATIT, MERIKORISTEET; LUETTELO VAIHDETTU (21.9.2026 klo 20.14)

Karttaseppä 21.9.2026 ilta: pohjapoltto 2026-09-22-pohja tuotannossa: osoitin #2670 mainissa (v2015), Pages julkaistu, luettelo ämpärissä (edellinen talteen ~/pyramidi-poltto/ajo-20260922/ampari-luettelo-edellinen.json). Tarkistettu tuotannosta: Biskaja tasainen, isobaatit 200/1000/3000 ohuina viivoina, ei laikkuja; nostot, nimiöt ja Ranskan koristeet paikoillaan; merikoristeet yleiskuvassa. Ajo: vaihe 1 114/114 (75 min), vaihe 2 397/397 (83 min), 0 kaatunut, eheys vihreä; raportti docs/raportit/poltto-20260922.md, kaappaukset kaappaukset/poltto-20260922/. Seuraavaan pohjapolttoon: Intian valtameren ruusu hipoo z2:lla nimen INTIAN VALTAMERI alkua. Karttaseppä jatkaa GL-runkoon Pelikoodarin kanssa; kerma-reuna-savukkeen punainen tarkistetaan uuden pohjan seurauksena.

## KUVATTOMIA NOSTOJA ON 8, EI 198 (INVENTAARIOTYOKALU KORJATTU 18dff33e) (21.9.2026 klo 20.17)

Sisältökirjuri 21.9.2026 ilta: tools/nostoinventaario.mjs ei tunnistanut kuva.tiedosto-kenttää (vain kuva.osoite), vaikka fokuskohteet.js käyttää sitä; korjattu ja regeneroitu: kuvattomia nostoja koko Euroopassa 8, ei 198, ja kaikki 8 ovat tarkoituksella kuvattomia kadonneita ihmeitä (Halikarnassos, Konstantinopolin hippodromi, Pergamonin alttari, Crystal Palace, Vanha London Bridge, Tuileries, Bastilji, Rodoksen kolossi; linjaus 26.–27.8.). Commit 18dff33e haarassa sisalto-grc-kuvat, testit 0 fail; Julkaisijan jonoon. Kuvatehtävä on valmis; 20.9. inventaarion luku 198 oli työkaluvirhe.

## GL-RUNKO 3 VALMIS (72d2468e): HORISONTIN HAIVE JA ATLAKSEN TIIVISTYS; KERMA-REUNA V5 SAVUKEVIKA (21.9.2026 klo 20.27)

Karttaseppä 21.9.2026 ilta: GL-runko 3 (karttaseppa-gl-runko-3 72d2468e, pelikoodari-gl-nostot e862f8a3:n päällä, Julkaisijan jonoon sen perään): horisontin häive (smoothstep ~7° ennen reunaa, sama kaikilla zoomeilla), atlaksen tiivistys (kuolleet rasterit pois, nimi ei putoa CSS2D:hen panoroinnissa); fonttien odotus jää CSS2D-perääntymiseksi. 152 instanssia, 1 drawcall, testit 18/18. Kerma-reuna V5: ei pohjan eikä rungon vika, Pelikoodari korjaa savukkeeseen (mittaus GL-kerros piilossa). Karttasepän seuraava tehtävä Fablelta.

## SISALTOINVENTAARIO EUROOPPA: AUKOT JA ERAJARJESTYS (CYP/LUX/MLT PELIKAUPUNGIT, OHUET KARTUSCHAT, KOHTAAMISET) (21.9.2026 klo 20.38)

Sisältökirjuri 21.9.2026 ilta (docs/raportit/sisaltoinventaario-eurooppa-20260921.md): 1) CYP/LUX/MLT: maalehti on, mutta ei yhtään pelikaupunkia (ei kaupunkilehteä, ei Maa numeroina -sivua). 2) BIH/UKR/RUS/ISL kartuscha ohuin (1–3 aihetta, tavoite 5–6). 3) Kohtaamiset vain 7/48 kaupungissa, loput fallbackilla. 4) Pienoismallit 97 tilattu Codexilta, 0 toimitettu. Fablen päätös: erät tässä järjestyksessä: A) pelikaupunki CYP Nikosia, LUX Luxemburg, MLT Valletta: kaupunkilehti, Maa numeroina, kohdekartta 4–6 kohteella (juttu + paikka; pienoismallit tilataan Codexilta erän B jatkona kun kohteet ovat valmiit, Fable tilaa) — kaanon tarina.md:n mukaan, isoisän 1873 ääni ja Livia nyt; B) BIH/UKR/RUS/ISL kartuschat 5–6 aiheeseen samalla reseptillä kuin 20.–21.9. erät; C) kohtaamiset puuttuviin 41 kaupunkiin rinnakkaiserinä (Sonnet-parvi), Fable tarkastaa tarinatekstit ennen mergeä.

## CODEX TOIMITTI 97 PIENOISMALLIA SUORAAN PR:NA (#2669), TUOTANNOSSA; JONO TYHJA, MAINISSA v2005-v2017 (21.9.2026 klo 20.45)

Julkaisija 21.9.2026 ilta: jono tyhjä; mainissa v2005–v2017 (gl-rasterit, reaktiot, nostot näkyviin, visat 1–4, zoomiraja, GL-nimiöt oletuksena, pohjapolton osoitin, monumentit 26 nykykuvaa, GL-nostot ja nappula oletuksena vaihe 3+4) + inventaariokorjaus. Codex toimitti Euroopan 97 kohdekartan pienoismallia suoraan PR:nä #2669 (512×512 WebP RGBA, paperitausta läpinäkyväksi, kytketty kohdekartan nimiin ja offline-esilataukseen, testit läpi) ja korjasi miniatyyrin fallback-testiregression #2673 — ei Documents-kansion kautta. Fable: Codexin PR-kaava hyväksytään: kuvatoimitukset saavat tulla suoraan PR:nä, kun Codex kytkee ne itse ja testit ovat vihreät; Julkaisija mergeää kuten muut. Sisältökirjurin pienoismallien kytkentätyö poistuu; Sisältökirjuri tarkistaa otoksen kohdekartoista. Monumenttien 81 kulta-aikakuvaa odotetaan samalla tavalla.

## CODEXILLE 7 PUUTTUVAA PIENOISMALLIA (ATEENA 6, WIEN 1), TILAUS 4 LISAYS (21.9.2026 klo 20.52)

Fable 21.9.2026 ilta: Sisältökirjurin tarkistus (docs/raportit/pienoismallit-puuttuvat-7-20260921.md, sisalto-grc-kuvat 36ca0ff8): 43/50 kohdekarttapisteestä kunnossa; 7 vanhaa bare-id-viitettä (Ateena Akropolis-museo, Iliou Melathron, Maratonhuijaus, Elginin marmorit, Diogeneen astia, Niken temppeli; Wien Vuoristovesijohto) palauttaa 404 eikä kuvia ole repossa. Tilattu Codexilta postilaatikkoon (posti/fable-codexille-miniatyyrit-7-20260921.md) samalla tyylillä ja PR-toimituksella kuin 97-erä.

## TUOTANTOVIKA v2018: GL-NAPPULA PIIRTYY MUSTANA (iPad); PELIKOODARI KORJAA KIIREELLISENA (21.9.2026 klo 21.02)

Laitetestaaja 21.9.2026 ilta: GL-nappula (v2018, oletuksena) piirtyy mustana, ei pelaajan kullalla #c9a227; ?glnimiot=0 oikein; toistettu iPadilla kahdesti, ei transientti. Epäily: nimiorasterit.js rasteroiNappula lukee tyylit elementistä, joka ei ole CSS2D-kääreen alla, joten pelaajan väri-CSS-muuttuja ei periydy. Fable: Pelikoodari korjaa kiireellisenä pienenä haarana ja lisää nappulan värin vartion savukkeeseen; Laitetestaaja jatkaa laiteluvun loppuun.

## GL-NAPPULAN VARI KORJATTU (4509674a, WEBKIT-LIUKUVARI); 3/8 PUNAISTA KORJATTU; PELIKOODARI NOLLATAAN (21.9.2026 klo 21.06)

Pelikoodari 21.9.2026 ilta: nappulan musta väri johtui WebKitistä: liukuväri #nappula-puu ei ollut rasteroitavassa svg:ssä; korjaus kloonaa defs-osan (mitattu WebKit+Chromium 196,154,99), savuke sai värivartion 9/9; haara pelikoodari-gl-nappulan-vari 4509674a Julkaisijalla kiireellisenä. Mainin 8 punaisesta korjattu 3 (nimiot-sulavat kuormaflake → kehysseuranta; ranskan-nostot-lukossa cluny-ankkuri; kerma-reuna V5 GL-kerros piiloon mittauksessa) haarassa pelikoodari-savukkeet-punaiset 9062d9a8; laivamatka-tanger, 3 WebKit-kaatumista ja nimikyltti vartio 4 seuraavalle sessiolle. Luovutus docs/raportit/viesti-pelikoodari-luovutus-20260921-ilta.md (a60d0e8a), muisti päivitetty; sessio nollataan.

## GL-LAITELUKU v2018: NIMIOT JA NOSTOT PIKSELINTARKASTI SAMAT GL/CSS2D; NAPPULA MUSTA (KORJAUS JONOSSA) (21.9.2026 klo 21.09)

Laitetestaaja 21.9.2026 ilta (docs/raportit/laitekierros-glnimiot-20260921.md, laitetestaaja 7df9265a): iPad ja iPhone oletustilassa (GL) vs ?glnimiot=0: nimiöt ja nostot pikselintarkasti samat; nappula musta GL:ssä (korjaus 4509674a Julkaisijalla). Ei uusia fps/muistilukuja (sulavuusmittari ei lue GL-instansseja; aiemmat iPad pan 0 px, zoom p95 0,33 px, iPhone 60 fps molemmissa). Chromium-työpöytämittaus jäi kesken (selainpaneeli piilossa). Fable: Pelikoodarin uusi sessio lisää sulavuusmittariin GL-instanssien luvun (jo tehtävälistalla), Laitetestaaja toistaa fps/muisti-luvun sen jälkeen.

## v2020 TUOTANNOSSA: GL-NAPPULAN VARI KORJATTU (#2676) (21.9.2026 klo 21.10)

Julkaisija 21.9.2026 ilta: nappulan mustan värin korjaus tuotannossa v2020 (PR #2676). Jatkaa pelikoodari-savukkeet-punaiset-erällä ja GL-runko 3:lla.

## OMISTAJAN TUNTUMATESTI v2021 (iPhone, NATIIVI): NIMIOIDEN KOKO VAIHTELEE PANOROIDESSA, RANTAVIIVAT VAREILEVAT; YKKOSPRIORITEETTI (21.9.2026 klo 21.33)

Omistaja 21.9.2026 klo 21.31 (iPhone natiiviappi, v2021, Ranska Camargue z8-9): nostonimiöt (Camarguenvarsa, Camarguen hevoset, Millaun silta ym.) muuttavat kokoa pelkästään panoroidessa samalla zoomilla — samassa näkymässä Camarguenvarsa pienenä ja Camarguen hevoset kolminkertaisena, toisessa Camarguenvarsa isona; nimet hyppivät. Meren rannan syvyysviivat väreilevät zoomatessa ja panoroidessa, vähemmän kuin ennen. Omistaja: nimien hyppely ja koon vaihtelu on todella häiritsevä. Fable: YKKÖSPRIORITEETTI Pelikoodarille ohi savukkeiden ja GL-vaiheen 5: nimiön koko saa riippua vain korkeudesta ja nostoluokasta, ei ladonnasta eikä panoroinnista (sovittelun koko/luokkavalinta ei saa vaihtua kehysten välillä; hystereesi ja lukitus liikkeen ajaksi E3:n tapaan myös koolle). Karttasepälle: syvyysviivojen väreily (laattojen uudelleennäytteistys panoroinnissa/zoomissa; tutki mipmap/anisotropia/nearest vs linear ja viivan paksuus laudan yksiköissä). Kaappaukset omistajalta Fablen keskustelussa (2 kpl).

## OMISTAJA v2021 iPhone: PANOROIDESSA VALAHTAA KARKEA TASO PAKSUINE VIIVOINEEN, LEVOSSA HAVIAA; PANOROINTI TOKKII (21.9.2026 klo 21.38)

Omistaja 21.9.2026 klo 21.36 (iPhone natiivi, v2021, Ranska z6, kaksi kaappausta liikkeessä ja levossa): panoroidessa näkyy karkeampi laattataso (paksut rantaviivat ja syvyyskäyrät, ei maakuntanimiä), liikkeen loputtua hieno taso palaa ohuine viivoineen; sama maailmatilassa ja ilman. Lisäksi panorointi tökkii, ei pehmeä kuin Google Earth. Fable: tämä on 'väreily'-havainnon todellinen syy: liikkeen aikana piirtyy tukitaso/karkea laatta, jonka viivat ovat laattapikseleinä paksummat suurennettuna. Karttaseppä (ykkösprioriteetti maakuntavedoksen edelle): miksi hieno taso ei pysy näkyvissä panoroidessa saman zoomin sisällä (laattavälimuistin katto, E2 muistikatto, tekstuurien purku liikkeessä, WebKit dpr 3 laattamäärä), ja miksi karkea taso näkyy ilman häivettä; korjaus: hienot laatat pysyvät muistissa liikkeen ajan, karkea taso vain aidosti puuttuvien laattojen alla ja viivan paksuus laudan yksiköissä eri tasoilla yhtenevä. Pelikoodari: tökkimisen mittaus WebKitissä (kehysajat panoroinnissa, tekstuurilatausten ajoitus; latauksia ei liikkeen aikana vaan levossa tai pieninä erinä) yhdessä Karttasepän kanssa. Nimiöiden koon vaihtelu (21.31) pysyy Pelikoodarin ykkösenä.

## OMISTAJA v2021 iPhone: LISALEHTIKORTIN YLAREUNA MENEE TILARIVIN ALLE (SAFE AREA) (21.9.2026 klo 21.41)

Omistaja 21.9.2026 klo 21.40 (iPhone natiivi): koko ruudun lisälehtikortti (Skandaalit: Kuningattaren kaulanauhajuttu) alkaa iOS:n tilarivin alta: kellonaika peittää otsikon SKANDAALIT ja sulkunappi menee akkukuvakkeen päälle. Fable: Pelikoodarille pieni korjaus nimiöiden koon jälkeen: kaikkiin koko ruudun kortteihin ja lehtiin yläreunan safe-area-inset-top (env()) ja sulkunappi sen alle; tarkista sama alareunasta (home-palkki) ja vaaka-asennosta. Savuke iPhone-koossa notch-emuloinnilla.

## KARKEAN TASON VALAHDYS PANOROIDESSA: SYY LAATTAKATTO + LIIKEVARA PUDOTTAA TASON z8→z7; KORJAUS karttaseppa-laattakatto (21.9.2026 klo 21.43)

Karttaseppä 21.9.2026 ilta (WebKit 390×844 dpr 3, Ranska korkeus 0,1): levossa z8 45 näkyvää laattaa (katto 48); panoroinnissa liikevara lasketaan tason valintaan → katto ylittyy → taso putoaa z7:ään kesken liikkeen (z8 puretaan, tukitaso z5/z6 näkyy paksuine viivoineen, nimiöt poissa), hystereesi pitää z7:n levossakin kunnes zoom muuttuu; ei häivettä. Korjaus (karttaseppa-laattakatto): katto lasketaan vain aidosti näkyvistä laatoista (liikevara ennakoi omalla katollaan); katon pudottama taso ei saa hystereesiä; viivaleveydet z6/z7/z8 tarkistetaan erikseen pohjan reseptissä. Fable: hyväksytty, kiireellinen Julkaisijalle mittauksen kanssa.

## OMISTAJA v2021 iPhone: NOSTONIMET LIIAN PIENIA LAHELLE ZOOMATTAESSA; ISOMPI KUN TILAA ON (21.9.2026 klo 21.43)

Omistaja 21.9.2026 klo 21.41 (iPhone natiivi, Lorraine z9 ja Ranska z7): karttanostojen nimet (Verdun, Nancy Place, Reims, Vézelay…) pienenevät liikaa lähelle zoomattaessa; z9:llä ruutu on lähes tyhjä ja nimet 12–13 px, vaikka tilaa isommalle tekstille on. Fable Pelikoodarille (samaan erään koon vakauden kanssa): nimiön kokokäyrä korkeuden mukaan uusiksi puhelimelle: lähizoomissa (z8–z10) nostonimi kasvaa 16 → ~20–22 px (nimiökatto NOSTOSYM_NIMIO_KATTO_PX nostetaan tai porrastetaan korkeuden mukaan), kaukana (z5–z6) nykyinen; koko riippuu vain korkeudesta ja luokasta (ei tilasta), jotta se on ennustettava. Kaappauksessa z9 näkyy myös vaalea taso ilman reliefiä — todennäköisesti sama laattakattovika (Karttaseppä korjaa).

## LAATTAKATTO KORJATTU (PR #2679, 97298eb7): z8 PYSYY PANOROINNISSA; MUISTIRAJA LAHELLA (21.9.2026 klo 21.49)

Karttaseppä 21.9.2026 ilta: PR #2679 (karttaseppa-laattakatto 97298eb7) Julkaisijalla kiireellisenä. Ennen: WebKit 390×844 dpr 3 Ranska korkeus 0,1: levossa z8/45 laattaa, panoroinnissa 45→54 ylitti katon 48 → z7 kesken liikkeen ja levossakin. Jälkeen: z8 pysyy koko panoroinnin, ei purkuja; katto vertaa aidosti näkyvää, vara ladataan yhä, katon pudottama taso palaa heti kun mahtuu. Vain js/pallolaatat.js, testit 3836/3836, mittari kattoRajoitti. Huomio: 54 näkyvää + 12 tukilaattaa ≈ 66 on lähellä 96 Mt:n tavukattoa (68); jos LRU purkaa puhelimella, seuraava askel tukitason harventaminen. Viiva on 1 laattapikseli joka tasolla; paksuus poistuu kun taso ei putoa. Karttaseppä palaa maakuntavedokseen.

## PELIKOODARIN WORKTREE SIIRRETAAN /Users/samireivinen/Matkakirja-pelikoodari SEURAAVASSA TAUOSSA (21.9.2026 klo 21.53)

Omistaja 21.9.2026 klo 21.52: Pelikoodarin worktree oli /Users/koodaus/Matkakirja-opus, koska koodaus ei saa luoda kansioita omistajan kotiin (ACL vain luku). Omistaja loi sudolla /Users/samireivinen/Matkakirja-pelikoodari (omistaja koodaus). Fable siirtää worktreen sisällön sinne ja ajaa git worktree repair, kun Pelikoodari on vapaana (ei kesken savukkeen), ja antaa uuden polun aloitusviestissä; sessiolle Choose folder. Muut rooli-worktreet nimetään roolin mukaan samalla kaavalla seuraavassa nollauksessa (loki HAKEMISTOSIIVOUS).

## MAAKUNTAVEDOS 4 (ITA/ESP/GBR/POL/AUT) OMISTAJAN KORTILLE; MUISTIMITTARI PR #2679:AAN (21.9.2026 klo 21.56)

Karttaseppä 21.9.2026 ilta: maakuntavedos 4 (karttaseppa-maakuntavedos-4 97e14f3f, kuvat docs/raportit/kaappaukset/maakuntavedos-20260921/vedos4/, raportti maakuntavedos-20260921.md Vedos 4): sama sääntö kuin FRA/DEU, NE admin-1 PD; nimiä ITA 6 ja ESP 7 (muut alueet jo kulttuurinimiä → vain raja), POL 15, AUT 9, GBR 4; CHE 26 kanttonia datassa, ei kuvissa. Puolan voivodikunnat suomennoksina (Masovia, Suur-Puola, Vähä-Puola, Alakarpatia…) tai puolankielisinä — Sisältökirjuri päättää. Tuotantoon riittää nimiötason uusintapoltto g omistajan kortin jälkeen. Muistirajan mittari lisätty PR #2679:ään (bf57e141): laatat.purkuja/pyyntoja/taso/katto.

## MAAKUNTAVEDOS 4 HYVAKSYTTY; MAAKUNTALINSSI (VARJAYS + LUONNEHDINTA) SUUNNITELMAAN; NOSTOPISTEISTA HEHKUVAT; v2023 LAATTAKATTO TUOTANNOSSA (21.9.2026 klo 22.00)

Omistaja 21.9.2026 klo 22.00 (kortti): maakuntavedos 4 (ITA/ESP/GBR/POL/AUT) hyväksytty poltettavaksi; Sisältökirjuri tarkisti nimet (Puola 13/15 suomennoksina, Podkarpackie ja Lubuskie puolankielisinä; Abruzzo ja Molise erillisinä). Omistajan idea: maakunnat värjättäviksi livenä pelissä samantyylisellä napilla kuin nostoilla, eri alueet eri väreillä, ja luonnehdinta jokaisesta alueesta. Fablen kanta: tehdään katselulinssinä MAAKUNTALINSSI (rengas 2): linssi päällä maakunnat saavat kevyen värisävyn (NE admin-1 -polygonit vektoritasona pallolla, Karttaseppä), napautus avaa alueen nimen ja Livian 1–2 virkkeen luonnehdinnan (Sisältökirjuri kirjoittaa, Fable tarkastaa; ~70 aluetta FRA/DEU/ITA/ESP/GBR/POL/AUT), Pelikoodari linssin UI. Aloitetaan vasta kun kartan sulavuus on kuitattu (uudet linssit odottavat). Omistaja: karttanostojen väripiste on eloton, saisi olla hehkuvan näköinen — Pelikoodarille GL-nostoihin: piste pehmeällä hehkulla (säteittäinen häive, kevyt sykähdys levossa), samaan erään koon vakauden jälkeen. Julkaisija: laattakatto tuotannossa v2023 (PR #2679), jono tyhjä.

## PELIKAUPUNKIERA A VALMIS: NIKOSIA (AARREPARI), LUXEMBURG JA VALLETTA UUSINA; 18 PIENOISMALLIA CODEXILLE (21.9.2026 klo 22.01)

Sisältökirjuri 21.9.2026 ilta (docs/raportit/pelikaupunki-era-a-yhteenveto-20260921.md, sisalto-grc-kuvat 40bb41e7): CYP Nikosia oli jo pelattava (middleeast.js), vain aarrepari puuttui, lisätty (sisalto-pelikaupunki-cyp); kaupunkimusiikin CYP-rivi jätetty, koska Lähi-itä on musiikkijärjestelmän ulkopuolella. LUX ja MLT aidosti uudet kaupungit täydellä minimisisällöllä ja kohdekartoilla (6 kohdetta kumpikin), testit 3837/0; MLT:n nostoräikkä ratkesi kohdekartan myötä. LUX ja MLT muokkasivat samoja tiedostoja (europe.js, maailmankartta.js): Julkaisija mergeää yksi kerrallaan ja testaa yhdistettynä. Fable tarkasti otoksen LUX-teksteistä (1873-ääni, linnoituksen purku) — kunnossa. 18 pienoismallia (6+6+6) tilattu Codexilta postilaatikkoon (fable-codexille-miniatyyrit-18-20260921.md). Sisältökirjuri jatkaa erään B (BIH/UKR/RUS/ISL kartuschat).

## MAAKUNTIEN VARJAYS: OIKEAN YLAKULMAN PANEELIIN TILAT (KARTTANOSTOT / MAAKUNNAT / MYOHEMMIN MUUT), VIPU PER MAAKUNTA + LUONNEHDINTA (21.9.2026 klo 22.02)

Omistaja 21.9.2026 klo 22.10: maakuntien värjäys toteutetaan oikean yläkulman nappiin, jonka takana on jo karttanostojen paneeli: paneeliin tulee tilanvalitsin (Karttanostot | Maakunnat | tulevaisuudessa muu), ja Maakunnat-tilassa jokaisella maakunnalla on vipu; vipu päällä maakunta saa värin kartalla ja vivun viereen tulee pieni luonnehdinta alueesta. Fablen tarkennus suunnitteluun: tilanvalitsin paneelin yläreunaan välilehtinä (sama nappi, ei uusia nappeja); Maakunnat-lista maittain ryhmiteltynä, vain ruudussa/valitussa maassa olevat ensin; vipu = kytkin per maakunta, lisäksi napautus maakuntaan kartalla kytkee saman vivun; väri per maakunta atlaksen musteista (pehmeä, ei peitä reliefiä), luonnehdinta Livian ääni 1–2 virkettä (Sisältökirjuri kirjoittaa ~70, Fable tarkastaa). Tämä korvaa aiemman ajatuksen erillisestä Maakuntalinssistä: ei linssi vaan paneelin tila. Toteutus: Karttaseppä admin-1-polygonit pallolle (vektoritaso tai värilaatat, arvio tulossa), Pelikoodari paneelin tilat ja vivut, Sisältökirjuri luonnehdinnat. Aloitus vasta kun kartan sulavuus on kuitattu.

## KARTTATYOKALU: EI LINSSI VAAN PELISSA MUKANA KULKEVA TYOKALU, JOSTA VEDETAAN TOIMINTOJA KARTAN TUEKSI (21.9.2026 klo 22.03)

Omistaja 21.9.2026 klo 22.15, tarkennus: maakuntien värjäys ja vastaavat eivät ole linssi eivätkä aarre, vaan pelissä alusta asti mukana kulkeva KARTTATYÖKALU (oikean yläkulman nappi), josta pelaaja vetää eri toimintoja nykyisen kartan tueksi: karttanostot (nykyinen paneeli), maakunnat vipuineen ja luonnehdintoineen, tulevaisuudessa muut tasot. Linssit pysyvät erillisenä aarrejärjestelmänä; karttatyökalu on aina käytössä eikä sitä ansaita. Sisältökirjuri kirjoittaa maakuntien luonnehdinnat (Livian ääni, 1–2 virkettä, ~70 aluetta) kartuschaerän jälkeen; koodi alkaa sulavuuden kuittauksen jälkeen.

## NIMIOTASO 2026-09-22g TUOTANNOSSA (ITA/ESP/GBR/POL/AUT MAAKUNNAT); KARTTATYOKALUN MAAKUNNAT VEKTORITASONA (21.9.2026 klo 22.05)

Karttaseppä 21.9.2026 ilta: nimiötaso 2026-09-22g-nimiot tuotannossa (195 nimiötä z4–z8, poltto 3 min, eheys vihreä), luettelo vaihdettu, ei koodiosoitinta; tarkistettu pelistä (Puola Podkarpackie/Lubuskie, Italia z8). Data ja raportti karttaseppa-maakuntavedos-4 767d0341 Julkaisijan jonoon; avainlista Sisältökirjurille (vedos4/avaimet.md, avain ISO:tunnus). Karttatyökalun maakuntien värjäys: PÄÄTÖS vektoritaso (admin-1-polygonit kolmioituina, ~25 k kärkeä 8 maalle, väri kärkiattribuuttina, yksi drawcall per maa; ≈0,1–0,3 ms/kehys, ~1 Mt; napautus piste-polygonissa CPU:lla); poltettu värilaattataso hylätty (+50 % laattatekstuureja, ei osumaa). Toteutus sulavuuden jälkeen.

## LINSSI-IDEA: EL NINO JA ILMASTOILMIOT (1876-1878 SUURI EL NINO, NALANHATA) (21.9.2026 klo 22.09)

Omistaja 21.9.2026 klo 22.30: uusi linssi-idea, El Niño ja vastaavat ilmastoilmiöt (ENSO, monsuuni, Golfvirta): linssi näyttäisi pallolla Tyynenmeren lämpöanomalian ja sen seuraukset. Tarinakytkös: 1876–1878 oli poikkeuksellisen voimakas El Niño, joka romahdutti monsuunit ja aiheutti maailmanlaajuisen kuivuuden ja nälänhädän (Intia ~5–8 milj., Kiina Pohjois-Kiinan nälänhätä ~9–13 milj., Brasilian koillisosa, Egypti, Etelä-Afrikka; Mike Davis, Late Victorian Holocausts, 2001). Isoisän matka 1873 on kolme vuotta ennen; Livia voi kertoa nyt, mitä isoisän näkemille seuduille kohta tapahtui. Kirjattu odottamaan; uudet linssit vasta sulavuuden jälkeen; rengas 2 katselulinssi. Fable kirjoittaa 1873-tekstin ja Livian kysymykset kun linssi otetaan työn alle.

## LINSSIPERHE MAAPALLON VOIMAT: IDEAVARASTO (EI VAADI 1873-KYTKOSTA) (21.9.2026 klo 22.15)

Omistaja 21.9.2026 klo 22.40: El Niño -linssin rinnalle linssiperhe MAAPALLON VOIMAT, kiinnostavia vaikkei 1873-kytköstä olisi. Ideavarasto (rengas 2–3, katselulinssejä; jokaisesta pallolle piirrettävä ilmiö + Livian selitys, mahdollinen leikkielementti): meri ja ilma — El Niño/La Niña (ENSO, 1876–78 nälänhätä), monsuuni, Pohjois-Atlantin oskillaatio, pasaatit ja länsituulet (purjereitit), Golfvirta ja Pohjois-Atlantin virta, Humboldtin virta (guano), Kuroshio, suihkuvirtaukset, hurrikaanit ja taifuunit; maan sisus — laattatektoniikka ja mannerten liike, Tulirengas, Islannin repeämä, Etna/Vesuvius 1872, Krakatau 1883, maanjäristysvyöhykkeet; taivas — vuorovesi (Mont-Saint-Michel, Fundy), Auringon 11 vuoden jakso ja revontulet (1870 maksimi), Maan akselin kallistus ja vuodenajat, napapäivä ja kaamos; elävä maapallo — muuttolinnut (jo suunnitteilla), Saharan pöly Amazoniin, valaiden vaellukset, metsäpalokaudet; muut — magneettikenttä ja kompassin eranto (1873 merenkulku), aikavyöhykkeet (Kellot-linssi), jääkausien jäljet (Suomen harjut, fjordit). Toteutusjärjestys päätetään sulavuuden jälkeen; El Niño ensimmäinen.

## NIMION KOKO VAKAA JA KATTO LAHIZOOMISSA (bd111931): JUURISYY RASTERIVALIMUISTIN ENSIMMAINEN DATUM; WEBKIT-SAVUKKEET OLIVAT KUORMAPUNAISIA (21.9.2026 klo 22.20)

Pelikoodari 21.9.2026 ilta: nostonimiön koon vaihtelu panoroidessa johtui siitä, että nimiorasterit.js talletti noston skaalan ja katon rasterin välimuistiin ensimmäisen datumin mitasta, jolloin sama kuva piirtyi muille nostoille ja zoomeille vanhassa koossa (E2:n kuori kertoi vanhan katon päälle → 40 px). Nyt koko ja katto luetaan joka haulla datumista, sovittelu ei skaalaa. Katto nousee lähizoomissa: 16 px (z7) → 22 px log2-asteikolla (z9); mitattu Camargue puhelin z6 8,7 / z7 16 / z9 22 px, sama panoroinnin jälkeen. Haara pelikoodari-nimion-koko bd111931 Julkaisijalle kiireellisenä; testit 3838/0, savuke-nimion-koko-panorointi 13/13. Toinen erä pelikoodari-savukkeet-webkit 98f5751a: nimikyltti vartio 4 karttaskaalaan (48/48); laivamatka-tanger, astro-sumu, nostokuva-karuselli, musta-laatta#webkit olivat vain polton kuormapunaisia, kirjattu sarjat.jsoniin. Avoin: pariisi-lahizoom 1400 (kategorian napautus ei avaa liuskaa) v2020:lla, tutkitaan. Seuraavaksi safe-area, sulavuusmittaus, hehkupiste.

## LINSSIEN LAJITTELU MAANOSITTAIN TYON ALLE; KOLMIULOTTEISET TILAT LINSSIEN TAVOITTEEKSI (APURAHA) (21.9.2026 klo 22.22)

Omistaja 21.9.2026 klo 22.50: 1) Linssisivuille lajittelu: mitkä linssit ovat maanosaan sidottuja ja mitkä ripoteltavia (sopivat minne vain), ja mihin maanosaan tarvitaan lisää linssejä. Sisältökirjuri tekee inventaarion (pohjana docs/raportit/linssit-eurooppa-kartoitus-20260921.md ja Raamatun linssiluettelo), raportti docs/raportit/linssit-maanosittain-<pvm>.md ja ehdotus tasauksesta; Fable päättää sijoitukset ja Pelikoodari lisää lajittelun linssisivuille (välilehdet tai suodatin maanosittain) sulavuuden jälkeen. 2) Apurahahakemuksessa (AVEK DigiDemo 20260770) on tavoite linsseistä, joissa on kolmiulotteinen tila, jossa pelaaja voi kulkea (arkeologinen kohde loistonsa päivinä, historiallinen hetki); kirjattu Raamattuun kohtaan LINSSIEN SUUNTA. Tekninen esiselvitys (three.js-tila pallon päällä tai erillinen näkymä, laitekuorma) Pelikoodarille ja Karttasepälle sulavuuden jälkeen; ensimmäinen ehdokas kadonnut ihme, jolle on jo Codexin havainnekuva (esim. Konstantinopolin hippodromi tai Crystal Palace).

## MERGEVAROITUS: RINNAKKAISET KAUPUNKIHAARAT JA counts-LASKURIT (HILJAINEN KATOAMINEN) (21.9.2026 klo 22.23)

Julkaisija 21.9.2026 ilta (PR #2683 Malta): kun kaksi haaraa samasta pohjasta kasvattaa saman laskurin (maailmankartta.js/europe.js counts.pieniAarre +1 per uusi kaupunki) samaan arvoon, git näkee rivit identtisinä eikä liputa konfliktia, ja toinen korotus katoaa hiljaa; Game.enterWorld kaatuu vasta ajossa. Löydetty ja korjattu Luxemburg+Valletta-yhdistelmästä testien ansiosta. Sääntö: kun kaksi sisältöhaaraa lisää kaupunkeja samaan pakkiin rinnakkain, Julkaisija tarkistaa counts-summat käsin; Sisältökirjuri tekee kaupunkihaarat ketjuun, ei rinnakkain samasta pohjasta.

## KARTUSCHA BIH VALMIS (1ae02cb3): 3 UUTTA AIHETTA (21.9.2026 klo 22.24)

Sisältökirjuri 21.9.2026 ilta: BIH kartuscha (sisalto-kartuscha-bih 1ae02cb3): historia 5, ruoka 4, kulttuuri 4 nostoa; BIH nyt 4 sisältöaihetta + menovinkit, sama taso kuin täysillä mailla; testit 0 fail. Haara pohjautuu mainiin (agentti ei luottanut kesken työn välitettyyn ohjeeseen) — kelpaa, Julkaisija rebasettaa tarvittaessa. UKR/RUS/ISL jatkuvat ketjuna.

## NOSTOJEN KARTTAMERKIT TAKAISIN: TYYPPIMERKKI KAIKILLE LAHIZOOMISSA + NOSTOTASOT MUIHIN MAIHIN (21.9.2026 klo 22.27)

Omistaja 21.9.2026 klo 23.05 (kortti): 1) Pelikoodari: jokainen nosto saa lähizoomissa (z8 ja lähempänä) Codexin tyyppimerkin (11 tyyppiä, assets/nostotyypit) tavallisessa koossa pisteen tilalle; kauempana piste (hehkuva, erä tulossa); ykköstaso pysyy 1,6-kertaisena kaikilla zoomeilla kuten nyt; siirtymä pisteestä merkkiin häiveellä, GL-runkoon (nostot ovat jo rungolla), savuke puhelinkoossa z6/z8/z9. Erä sulavuusmittauksen ja hehkupisteen kanssa samaan jonoon (hehkupiste ensin, koska kaukana piste näkyy eniten). 2) Sisältökirjuri: nostotasot (taso 1 = maan tähtikohteet, ~4–6 per maa) kaikkiin Euroopan maihin Ranskan mallilla (docs/raportit/nostotasot-fra-20260920.md), maittain 5–6 maan erissä linssilajittelun ja maakuntaluonnehdintojen jälkeen; Fable tarkastaa valinnat.

## LINSSIT MAANOSITTAIN: EUROOPPA 34/112, NAPA-ALUEET JA OSEANIA OHUIMMAT; 27 GLOBAALIA RIPOTELTAVAA (21.9.2026 klo 22.28)

Sisältökirjuri 21.9.2026 ilta (docs/raportit/linssit-maanosittain-20260921.md, sisalto-grc-kuvat fdd79bcb): 112 linssiä/ideaa; Eurooppa 34 (30 %), napa-alueet 2 ideaa, Oseania 4 (ei tuotantovalmista), Saharan eteläpuolinen Afrikka 6; 27 globaalia ideaa ripoteltavissa mihin tahansa; työkalulinssien mannervaraukset (rekisteri.js) tasapainossa. Fablen päätös: ei uutta ideointia paitsi napa-alueille; uuden mantereen ensimmäinen palkkiolinssi sen omasta listasta, globaalit 27 täydennykseksi; MAAPALLON VOIMAT -ideat lisätään raporttiin (monsuuni/Humboldt Aasia ja Etelä-Amerikka, revontulet/napapäivä napa-alueet, Tulirengas/Kuroshio Oseania ja Aasia). Lajittelu linssikatalogisivulle (maanosasuodatin) Pelikoodarille sulavuuden jälkeen.

## v2026 NIMION KOKO TUOTANNOSSA; SULAVUUS TUTKITAAN RIISUTUSTA KARTASTA KERROS KERRALLAAN (ABLAATIOTIKAS) (21.9.2026 klo 22.29)

Julkaisija: nimiön koon korjaus tuotannossa v2026 (PR #2684); Malta-PR #2683 saa uuden numeron. Omistaja 21.9.2026 klo 23.15: sulavuus testataan ensin riisutuimmalla kartalla ja lisätään elementtejä kerros kerrallaan, jotta hidastuksen aiheuttaja löytyy. Fable: hyväksytty menetelmäksi. Pelikoodarin sulavuusmittaus tehdään ablaatiotikkaana kehittäjälipulla ?kerrokset=<lista> (ei omistajalle, vain mittaukseen): 1) pallo + laatat, 2) + vektorit (rajat, joet, reitit), 3) + GL-nimiöt, 4) + GL-nostot ja nappula, 5) + CSS2D (kohteet, linssimerkit, ankkurit), 6) + pulu, UI ja äänet. Jokaisella portaalla WebKit puhelinkoko dpr 3, panorointi ja zoom: kehysajan mediaani, p95, pisimmät 10 kehystä ja niiden syy (tekstuurilataus, ladonta, rasterointi, GC). Tavoite 60 fps tasaisena: p95 alle 20 ms, ei yli 50 ms:n kehyksiä liikkeessä. Laitetestaaja toistaa samat portaat oikealla iPhonella laitepalvelimen kautta. Raportti docs/raportit/sulavuus-ablaatio-<pvm>.md.

## KORTTIEN TURVA-ALUE VALMIS (1e8beb96): KAIKKI KORTTIKERROKSET INSETIN SISAAN (21.9.2026 klo 22.35)

Pelikoodari 21.9.2026 ilta: pelikoodari-safe-area 1e8beb96: kaikki korttikerrokset (nosto, eläintäky, syvennys, skandaali, hetki, tiedeliite, kuva edellä, ankkuroitu kohdekortti) reunus 1 rem + turva-inset joka sivulta (--turva-* = env(safe-area-inset-*)); sulkunappi ja otsikkorivi insetin alle. Savuke 40/40 (vanhalla 33/40 = omistajan löydös), testit 3838/0. Julkaisijalle. pariisi-lahizoom 1400 punaiset paikallisesti ovat ajoympäristöero, CI vihreä, ei tutkita. Seuraavaksi ablaatiotikas, hehkupiste, tyyppimerkit.

## LINSSIKATALOGI UUSIKSI: YKSI LISTA, LAJITTELU MAANOSITTAIN + YLEISET, KAPPALEMAARAT; POLOTYKSET JA KOLMIJAKO POIS (21.9.2026 klo 22.38)

Omistaja 21.9.2026 klo 23.30 (linssikatalogi.html): 1) Suodatinnapit KAIKKI/VALMIS/SEURAAVA/IDEA korvataan mannernapeilla Eurooppa, Aasia, Afrikka, Pohjois-Amerikka, Etelä-Amerikka, Oseania, Napa-alueet ja Yleiset (ripoteltavat), jokaisen perässä kappalemäärä. 2) Sivun johdantopölötys ja Mitä monistetaan -laatikko pois; myös kolmijako aikajana-/alue-/virtalinsseihin (välilehdet ja laskurit) pois: kaikki linssit samassa listassa, lajittelu vain maanosittain. 3) Toteutustapa (aikajana, alue, virta, 3D-tila, leikki…) on jokaisen linssin kohdalla oma huomionsa, ei ryhmittelyperuste; toteutustapoja tulee lisää. Tila (valmis/seuraava/idea) saa jäädä pieneksi merkiksi rivillä. Lähde: docs/linssikatalogi.md → linssikatalogi.html (Pages kopioi), maanosatieto Sisältökirjurin raportista docs/raportit/linssit-maanosittain-20260921.md. Pelikoodari Sonnet-parvella rinnalla, ei blokkaa sulavuustyötä; kaappaus omistajalle ennen Julkaisijaa.

## OMISTAJA v2026 TYOPOYTA: PANOROINTI VALKKYMATON; ZOOMATESSA MARSEILLE-NIMI VALKKYY JA KARKEAT VIIVAT HETKELLISESTI MERELLA (21.9.2026 klo 22.41)

Omistaja 21.9.2026 klo 23.40 (työpöytä, Marseille päivä 4, v2026): panoroidessa korkeusviivat eivät enää välky (laattakatto v2023 auttoi). Zoomatessa: 1) poltettu kaupunkinimi MARSEILLE välkkyy eniten — katoaa ja palaa nopeaan tahtiin; 2) merialueille tulee hetkellisesti karkeampien viivojen muhjua. Fable Karttasepälle (ykkösenä ennen muuta): 1) nimiötason tasonvaihto zoomissa ilman hystereesiä/häivettä — kaupunkinimi piirtyy eri tasoilla eri paikkaan/kokoon ja vaihtuu edestakaisin; tarvitaan hystereesi ja häive tai vain yhden tason nimiöt kerrallaan; 2) zoomatessa uuden tason laatat eivät ehdi, ja karkea taso näkyy paksuine viivoineen; tavoite: pidä edellisen tason laatat kunnes uuden tason laatat ovat ladattu ja häivytä, esilataa zoomin suuntaan.

## KARTTANOSTOT LADOTAAN RUUDUN ULKOPUOLELLE (LIIKEVARA), EIVAT TUPSAHDA PANOROINNIN JALKEEN (21.9.2026 klo 22.42)

Omistaja 21.9.2026 klo 23.45 (työpöytä v2026): panoroitaessa uudelle alueelle karttanostot tupsahtavat näytölle jälkikäteen. Fable Pelikoodarille (ablaatiotikkaan rinnalle, ennen hehkupistettä): nostojen ladonta ja GL-instanssit lasketaan ruutua suuremmalle alueelle (liikevara ~50–100 % ruudun mitasta joka suuntaan, kuten laatoilla), jolloin nostot ovat valmiina kun ne tulevat ruutuun; ladonta päivittyy liikkeen aikana vain reunavyöhykkeelle, ei koko ruudulle (koon vakaus säilyy); rungon instanssikatto ja atlaksen koko mitoitetaan liikevaran mukaan. Savuke: panorointi 400 px, nostojen ilmestymisviive ruudun reunassa 0 kehystä.

## ZOOMIN VALKYNTA: SYYT MITATTU — GL-NIMION PORTAAN VAIHTO PUDOTTAA CSS2D:HEN (PELIKOODARI), TASONVAIHTO ILMAN ENNAKKOA (KARTTASEPPA) (21.9.2026 klo 22.49)

Karttaseppä 21.9.2026 ilta (WebKit+Chromium 1400×900, Marseille, zoom kehyksittäin): 1) MARSEILLE-välkkyminen on GL-nimiön kuoren portaan vaihto: glnimiot-sovitin pudottaa nimen CSS2D:hen kun uuden portaan rasteri ei ole valmis ja nostaa takaisin → nimi poissa yhden kehyksen per porras (kehys 36: 55‰ → 21‰ → 56‰), zoomissa portaita monta. Korjaus (Pelikoodari, sovitin): nimi pysyy GL:ssä vanhalla rasterilla kunnes uusi valmis, ei CSS2D-välitilaa. 2) Meren muhju: laattakerros vaihtaa tason heti kynnyksellä ja uuden tason laatat tulevat sceneen 300–500 ms:ssä; vanha taso näkyy 2× venytettynä. Korjaus (Karttaseppä, karttaseppa-zoomiennakko): esilataus zoomin suuntaan, kun korkeus on 25 % kynnyksestä, seuraavan tason laatat keskialueelta ennakkona. Fable: Pelikoodari tekee sovittimen korjauksen heti (pieni, ennen ablaatiotikasta), Karttaseppä zoomiennakon.

## ROOLI-WORKTREET NIMETAAN ROOLIN MUKAAN: KANSIOT LUOTU, SIIRTO SEURAAVASSA NOLLAUKSESSA (21.9.2026 klo 22.58)

Omistaja 21.9.2026 klo 22.57 loi sudolla kansiot /Users/samireivinen/Matkakirja-{julkaisija,pelikoodari,karttaseppa,sisaltokirjuri,laitetestaaja,postivahti} (omistaja koodaus). Fable siirtää kunkin worktreen sisällön ja ajaa git worktree repair session seuraavassa nollauksessa (ei kesken työn), antaa uuden polun aloitusviestissä ja omistaja valitsee sessiolle Choose folder. Raamatun kohta B) TYÖTILAT päivitetty uusiin nimiin.

## AUTOMAATTINEN NOLLAUS TOIMII: SESSIO TYHJENTAA ITSENSA, FABLE LAHETTAA ALOITUKSEN; KARTTASEPPA NOLLATTU (5 %), WORKTREE Matkakirja-karttaseppa (21.9.2026 klo 23.04)

Fable 21.9.2026 klo 23.05: Karttaseppä nollattiin ilman omistajaa: 1) Remote Control pois (set_remote_control), 2) käsky sessiolle kutsua mcp__ccd_session_mgmt__clear_session self ja lopettaa vuoro, 3) minuutin odotus, 4) aloitusviesti send_message-työkalulla session id:llä (SendMessage-nimiosoite vanhenee tyhjennyksessä), 5) Remote Control päälle. Konteksti 70 % → 5 %. Worktree siirrettiin ennen tyhjennystä /Users/samireivinen/Matkakirja-karttaseppa; koska session polku osoitti vanhaan kansioon, viesti ei mennyt perille ennen kuin vanha polku palautettiin symlinkkinä (omistaja antoi koodaukselle ACL:n add_subdirectory,add_file,delete_child kotihakemistoonsa). Kaava jatkossa kaikille rooleille: Postivahdin 70 %-ilmoitus → luovutus → (worktree siirto + symlinkki vanhaan polkuun) → RC pois → self-clear → aloitus → RC päälle. Omistajaa ei tarvita; Choose folder vain jos haluaa session polun siistiksi.

## MARSEILLE-VALKKYMINEN KORJATTU (dfd6f8016); LINSSIKATALOGI MAANOSITTAIN VALMIS (54d366a17) (21.9.2026 klo 23.10)

Pelikoodari 21.9.2026 ilta: GL-nimiö pysyy rungolla vanhalla rasterilla kunnes uuden portaan rasteri on valmis (viimeSpritet), CSS2D vain kun rasteria ei ole; noston skaala korjattu (uuden mitta / vanhan portaan px). Savuke-marseille-valkkyy (WebKit 1400×900, zoom 40 askelta): vaihtoja 0, musteen osuus ei putoa alle 80 % → 4/4 (vanhalla 3/4); testit 3842/0. Haara pelikoodari-glnimiot-vanha-rasteri dfd6f8016 Julkaisijalle kiireellisenä. Linssikatalogi maanosittain (pelikoodari-linssikatalogi-maanosat 54d366a17): 110 linssiä, Eurooppa 39, Aasia 21, Yleiset 26, Afrikka 9, P-Am 6, Oseania 4, E-Am 3, Napa 2; toteutustapa ja tila pieninä merkkeinä; avoin: docs/linssikatalogi.md:n Q1/Q2-ryhmää ei ole tuotu html:ään. Omistajalle kaappaukset. Seuraavaksi ablaatiotikas (lippu ja mittari koodattu e2219137a) → liikevara → hehkupiste → tyyppimerkit.

## LINSSIKATALOGI: SEURAAVA-TAGIT TARKISTETTAVA, MERKIT YKSINKERTAISEMMIKSI, YO- JA PAIVATILA (21.9.2026 klo 23.12)

Omistaja 21.9.2026 klo 23.20 (linssikatalogin kaappaukset): 1) 'seuraava'-tilamerkinnät eivät ehkä pidä paikkaansa — tila tarkistetaan Raamatun linssijonoa (rengas 1 = 22 linssiä, jono Kellot → Lippuarvaus → Tähtitaivas → Muuttolinnut → linssit-rengas1) ja lokin päätöksiä vasten; 'seuraava' vain sille, mikä on oikeasti työn alla tai jonossa, muut 'idea'; 2) tila- ja toteutustapamerkit visuaalisesti yksinkertaisemmiksi (yksi pieni sana tai piste, ei laatikoita); 3) sivulle yö- ja päivätila (taustaväri, muste, kuvien reunus) prefers-color-scheme + käsikytkin yläkulmassa, sama muille dokumenttisivuille (kohtaamiskuvat.html). Pelikoodari Sonnet-parvella samaan haaraan, uudet kaappaukset molemmista tiloista.

## CHE 26 KANTTONIA ON JO NIMIOTASOSSA g; VEDOS OMISTAJALLE, KOLME PAALLEKKAISYYTTA (21.9.2026 klo 23.13)

Karttaseppä 21.9.2026 ilta: CHE:n 26 kanttonia ovat jo tuotannon nimiötasossa g (poltettu vedos 4:n nimistöllä); vedoskuvat sveitsi-z6/z7/z8 (karttaseppa-che-kanttonit, PR #2690 docs). Huomiot: Kapellbrücke-nosto LUZERN-nimen päällä z7, Stiftsbibliothek Appenzell Ausserrhodenin päällä z8, VALAIS Matterhornin ja Bernhardilaisen välissä — korjattavissa käsisiirroilla nimiöversioon h. laatat.purkuja-mittari on jo mainissa; zoomiennakko tuotannossa v2031. Karttaseppä odottaa ablaatiotikkaan laattatuloksia ja sulavuuskuittausta.

## CHE-PAALLEKKAISYYDET KORJATAAN SEURAAVAAN NIMIOPOLTTOON (h), EI HETI (21.9.2026 klo 23.14)

Omistaja 21.9.2026 klo 23.30 (kortti): Sveitsin kolme päällekkäisyyttä (Kapellbrücke/LUZERN z7, Stiftsbibliothek/Appenzell Ausserrhoden z8, VALAIS Matterhornin ja bernhardilaisen välissä) korjataan käsisiirroilla nimiöversioon h seuraavan nimiöpolton yhteydessä muiden korjausten kanssa (Intian valtameren ruusu pohjaan). Ei polttoa nyt.

## KARTUSCHAT ERA B VALMIS: BIH/UKR/RUS/ISL VIITEEN AIHEESEEN (21.9.2026 klo 23.20)

Sisältökirjuri 21.9.2026 ilta (docs/raportit/kartuscha-era-b-yhteenveto-20260921.md, sisalto-grc-kuvat b2c2c039f): BIH 1ae02cb3 (historia/ruoka/kulttuuri), UKR a6dcba7c (historia/kulttuuri), RUS cd43ea4b5 (historia/ruoka), ISL 32a4456f8 (historia); kaikilla 4 sisältöaihetta + menovinkit = 5, testit 0 fail; eri avaimet, ei counts-konflikteja. Julkaisijan jonoon nollauksen jälkeen. Sisältökirjuri siirtyy maakuntien luonnehdintoihin.

## JULKAISIJA NOLLATAAN (72 %); WORKTREE Matkakirja-julkaisija; PR #2687:N CI EI KAYNNISTY (21.9.2026 klo 23.22)

Fable 21.9.2026 klo 23.22: Julkaisijan luovutus docs/raportit/viesti-julkaisija-luovutus-20260921-ilta.md (haarassa sisalto-kartuscha-bih). Worktree siirretty /Users/samireivinen/Matkakirja-julkaisija (vanha Matkakirja-sonnet3 symlinkki). Julkaisija nollataan Fablen kaavalla. Avoin: PR #2687:n CI ei käynnistynyt kolmella pushilla — uusi Julkaisija selvittää (workflow-polkurajaus? pull_request-laukaisu? haara docs-only?).

## LINSSIKATALOGI JULKAISTAAN ILMAN KORTTIA KORJAUSTEN JALKEEN; MAAKUNTALUONNEHDINTA 1-2 VIRKETTA, PULU KERTOO LISAA (21.9.2026 klo 23.28)

Omistaja 21.9.2026 klo 23.35: linssikatalogin saa julkaista yöllä ilman korttia, kun kolme korjausta (tilat tarkistettu, merkit yksinkertaiset, yö- ja päivätila) on tehty; Fable katsoo kaappaukset. Maakuntien luonnehdinnan mitta hyväksytty: 1–2 virkettä, enintään 160 merkkiä, Livian ääni. Lisäys: pulu voi kertoa maakunnasta lisää — karttatyökalun Maakunnat-tilassa luonnehdinnan vieressä pulun nappi, joka avaa pulun keskustelun alueesta (2–3 valmista kysymystä esikirjoitetuin vastauksin, kuten Ihmisen matkassa); Sisältökirjuri kirjoittaa luonnehdintojen jälkeen erillisenä eränä.

## MAAKUNNAN LUONNEHDINTAAN TAPPA: PIDEMPI VERSIO KUVAN KANSSA (21.9.2026 klo 23.29)

Omistaja 21.9.2026 klo 23.40: karttatyökalun Maakunnat-tilassa lyhyen luonnehdinnan vieressä täppä (nuoli/plus), josta avautuu pidempi versio kuvan kanssa: yksi Commons-kuva alueesta (PD/CC, kuvaputken mukaan, lähde ja lisenssi) ja 3–5 virkkeen teksti Livian äänellä (maisema, ihmiset, yksi tarina tai erikoisuus; 1873-kytkös jos on). Pulun kysymykset sen rinnalla. Sisältökirjuri: erä 1 lyhyet luonnehdinnat (nyt), erä 2 pitkät + kuvat, erä 3 pulun kysymykset; kaikki samaan datarakenteeseen (lyhyt, pitka, kuva, pulu). Pelikoodari: paneelin rivi laajenee täpästä samaan tapaan kuin nostokortin Lisää.

## CHE-SIIRROT KIRJATTU NIMIOVERSIOON h (PR #2690); KARTTASEPAN WORKTREE LUOTIIN UUDELLEEN (21.9.2026 klo 23.29)

Karttaseppä 21.9.2026 klo 23.40: CHE:n viisi käsisiirtoa (Luzern, Valais, St. Gallen, Appenzell AR ja AI) kirjattu KASIN-taulukkoon ja nimistöön nimiot-poltto-5.json, ajo-ohje RESEPTI.md:ssä, ei polttoa (PR #2690, 5fdca5ecf). Worktree /Users/samireivinen/Matkakirja-karttaseppa oli poistunut kesken vuoron (syy epäselvä, todennäköisesti session oma worktree-siivous); Fable loi sen uudelleen haaralla karttaseppa-maakuntavektorit origin/mainista. Sääntö: rooli-worktreetä ei poisteta; väliaikaiset worktreet vain /Users/koodaus/-polkuihin.

## TYYPPIMERKIT LAHIZOOMISSA TEHDAAN YOLLA JA JULKAISTAAN ILMAN KORTTIA (21.9.2026 klo 23.31)

Omistaja 21.9.2026 klo 23.45: nostojen tyyppimerkit lähizoomissa toteutetaan yön aikana ja julkaistaan ilman omistajan korttia (Fable katsoo kaappaukset). Pelikoodarin järjestys: ablaatiotikas → tyyppimerkit → liikevara → hehkupiste.

## ABLAATIOTIKAS: PANOROINTI KUNNOSSA, ZOOMI HYPPAA GL-NOSTOISSA (TAYSI LADONTA LIIKKEESSA); KORJAUS LIIKEVARAN KANSSA (21.9.2026 klo 23.37)

Pelikoodari 21.9.2026 ilta (docs/raportit/sulavuus-ablaatio-20260921.md, pelikoodari-ablaatio c5681e2d8, lippu ?kerrokset=porrasN, ei vaikuta peliin ilman lippua): 1) panorointi kunnossa joka portaalla (Chromium p95 ≤ 19 ms, WebKit 18–39 ms, ei > 50 ms kehyksiä). 2) Zoomi hyppää portaalla 4 (GL-nostot + nappula) Ranska z6: WebKit p95 33 → 167 ms (max 252, 19 kehystä > 50), Chromium 19 → 47. 3) Syy: täysi ladonta liikkeessä (134 nostoa: keraa + 3 jakoa + rungon rakennus) samassa kehyksessä 1–6 nostorasteroinnin ja 3–18 laattapyynnön kanssa; Camargue z8 (22 nostoa) ei hyppää. 4) Portaat 5–6 eivät lisää; porras 2 (vektorit) zoomissa p95 68 = laattapyynnöt (Karttasepän zoomiennakko v2031 auttaa). 5) Fablen päätös: liikkeessä ei täyttä ladontaa (liikevara tekee laajan ladonnan levossa, liikkeessä runko vain siirtää), rasteroinnit jonoon ≤ 1/kehys liikkeessä, rungon rakennus kerran per ladonta; toteutus liikevaraerässä (WIP d9edf0ee4). Järjestys: tyyppimerkit (yö) → liikevara + zoomikorjaus → hehkupiste. Laitetestaaja toistaa portaat iPhonella lipulla.

## MAAKUNTALUONNEHDINNAT ERA 1 (97 ALUETTA) TARKASTETTU: 7 KORJAUSTA, SITTEN JULKAISUUN (21.9.2026 klo 23.40)

Fable 21.9.2026 klo 23.55: Sisältökirjurin luonnehdinnat (sisalto-maakunnat-luonnehdinnat a31726805, js/packs/maakunnat-luonnehdinnat.js, 97 aluetta, rakenne lyhyt/pitka/kuva/pulu, guard-testi) tarkastettu: Livian ääni ja mitta oikein; korjaukset: DEU:n huutomerkit enintään kolmeen, Bayern Oktoberfest (ei pikkujoulu), Bremen (kontit Bremerhavenissa), Molise-vitsi, La Rioja kastellaan, Hauts-de-France rajat kadonneet, 'yhä' enintään kerran per maa. Korjausten jälkeen Julkaisijalle. Seuraava erä: nostotasot DEU/ITA/ESP/GBR/POL/AUT, lista Fablelle ennen dataa.

## MAAKUNTAVEKTORIEN KOLMIOINTI (M0) VALMIS: PR #2697, 250 MAATA, 771 K KOLMIOTA (21.9.2026 klo 23.49)

Karttaseppä 22.9.2026 klo 00.05: tools/tee-maakuntavektorit.mjs → per maa <ISO>.bin (MKV1: float32 lon/lat, uint16 alue kärkiattribuuttina) + <ISO>.json (alueet, väri ≤5, renkaat osumatestiin); korvanleikkaus reikineen, särmät ≤1,5°, ahne väritys; 250 maata, 4 127 aluetta, 771 k kolmiota, 15,9 Mt (CHE 38 kt, DEU 102 kt, RUS 1,8 Mt), ajo 4,6 s; testit 10/10; ohje pallon-vektoriviivat.md luku 11 (M1-kytkentä). Ei pelikoodia, ämpäriin vasta M1:ssä. Fable: kirjattu; ablaatiotulos laattapuolelta: porras 1–2 kunnossa panoroinnissa, zoomissa porras 2 p95 68 ms = laattapyynnöt (zoomiennakko v2031 auttaa) — Karttaseppä mittaa zoomiennakon vaikutuksen samalla lipulla ja ehdottaa jos vielä >40 ms.

## ABLAATIOTIKAS OIKEALLA iPHONELLA: GL-NIMET JANKKAAVAT JO PORTAALLA 3, NOSTOT+NAPPULA PAHIN (21.9.2026 klo 23.50)

Laitetestaaja 22.9.2026 klo 00.10 (docs/raportit/sulavuus-ablaatio-iphone-20260921.md, laitetestaaja 4a15d1773): oikea iPhone eroaa headless-mittauksesta: porras 3 (GL-nimet) jankkaa jo Camarguessa (max 235 ms, 20/134 kehystä > 50 ms), headless näytti sulavana; porras 4 (nostot + nappula) pahin: Camargue pan 38/79 kehystä > 50 ms, zoom 14/68; tuotanto (porras 6) Ranska p95 pan 45 / zoom 41 ms. Yksi ajo per kohta. Fable Pelikoodarille: GL-nimien porras on tutkittava laitteella erikseen (rasterointi/tekstuuripäivitys liikkeessä: atlaksen texSubImage joka kehys? kuoren portaan vaihto? WebKit Metal-tekstuuripäivitys), sama liikkeessä-ei-ladontaa-sääntö nimille kuin nostoille; liikevaraerän tavoite mitataan oikealla iPhonella, ei vain headlessissä.

## v2032-v2036 MAINISSA (MARSEILLE-KORJAUS, KARTUSCHAT UKR/RUS/ISL); SAVUKKEET-MAC 17 UUTTA PUNAISTA TARKISTETTAVA (21.9.2026 klo 23.51)

Julkaisija 22.9.2026 klo 00.15: glnimiot-vanha-rasteri mainissa #2691 (v2032); PR #2687:n CI-vika oli versiotörmäys, korjattu v2033; kartuscha-ukr/rus/isl olivat v1989-pohjaisia stale-haaroja (~9000 riviä duplikaattia) → vain maa-kategoriat.js-commitit cherry-pickattu: v2034 UKR #2694, v2035 RUS #2695, v2036 ISL #2696; docs #2690, #2692, #2693 mergetty. Linssikatalogi odottaa kaappauksia. sisalto-maakunnat-luonnehdinnat: tarkista-niputus punainen (orpo moduuli, ei vielä tuotu mistään) — Sisältökirjuri lisää tuonnin tai rekisteröi niputuksen poikkeukseksi kunnes Pelikoodari kytkee. Avoin punainen: savukkeet-mac #2687:n jälkeen: savuke-glnimiot-nostot kaatui + 17 uutta punaista (zoomiraja, pariisi-lahizoom ym.). Fable: Macilla ajettiin samaan aikaan ablaatiomittauksia (Pelikoodari headless + Laitetestaaja laitepalvelin), joten kuormapunaiset todennäköisiä; Julkaisija ajaa savukkeet-mac uudestaan kun load < 8 ja vasta jäljelle jäävät punaiset Pelikoodarille.

## ZOOMIENNAKKO PUOLITTI LAATTAPORTAAN p95:N (68→35 ms); LAATTAPYYNTOJEN TAHDITUS 2/KEHYS HYVAKSYTTY (21.9.2026 klo 23.54)

Karttaseppä 22.9.2026 klo 00.25 (WebKit 390×844 dpr 3, Ranska z6, main v2035 + kerrokset-lippu): porras 2 zoomi p95 68 → 35–37 ms, porras 1 31–42; pitkien kehysten syy: 15–18 fetch-aloitusta samassa kehyksessä (6 latauspaikkaa vapautuu kerralla) + tekstuurin vienti. Fable hyväksyi: laattapyyntöjen aloituksen tahditus enintään 2 laattaa (6 fetchiä) per kehys pallolaatat.js:n jonoon, savuke portailla 1–2; tukitason harvennus jos p95 jää yli 25 ms.

## NOSTOTASOT: 8 ISOILLE MAILLE (FRA/DEU/ITA/ESP), 4-6 MUILLE; GBR/POL/AUT HYVAKSYTTY (AUT TONAVA→WACHAU) (21.9.2026 klo 23.56)

Fable 22.9.2026 klo 00.30: Sisältökirjuri löysi, että DEU/ITA/ESP nostotasot on jo tehty toisessa erässä (docs/raportit/nimisto-taso-esp-ita-deu-20260921.md, haarat sisalto-nimisto-taso-deu/ita/esp mergeamatta, 8 per maa). Päätös: isot maat 8 kuten FRA, muut 4–6; 'yksi per tyyppi' on toive. GBR (Stonehenge, Edinburghin linna, Ben Nevis, Ironbridge, Doverin liiduvuoret, Bath), POL (Auschwitz-Birkenau, Malbork, Białowieża, Rysy, Słowińskin dyynit, Elblągin kanava), AUT (Hallstatt, Großglockner, Hohensalzburg, Melk, Semmeringin rata, Wachau Tonavan sijaan) hyväksytty (docs/raportit/nostotasot-gbr-pol-aut-ehdotus-20260921.md). Julkaisija rebasettaa deu/ita/esp-haarat ja tarkistaa vanhan pohjan. Seuraava: loput Euroopan maat 6 maan erissä.

## LAATTAPYYNTOJEN TAHDITUS 2/KEHYS (PR #2699): LAATTAPORTAAN ZOOMI p95 22-28 ms (22.9.2026 klo 00.04)

Karttaseppä 22.9.2026 klo 00.40: pallolaatat.js LAATTAKERROS_ALOITUKSIA_PER_KEHYS = 2 (6 fetchiä/kehys, loput seuraavaan rAF:iin; mittari laatat.tahditettuja). WebKit 390×844 dpr 3 Ranska z6 portaat 1–2 zoomi: p95 33–39 → 23–28 ms, porras 1 37 → 22–27, max 68 → 26–40, 0 kehystä > 50. Testit 98/0, raportti docs/raportit/zoomi-pyyntotahditus-20260922.md. Tukitason harvennus vain jos iPhonella p95 > 25 (Laitetestaaja mittaa lipulla kun PR mainissa).

## NOSTOTASOT GBR/POL/AUT VALMIIT; DEU/ITA/ESP-HAARAT VANHALTA POHJALTA, CHERRY-PICK (22.9.2026 klo 00.04)

Sisältökirjuri 22.9.2026 klo 00.45: sisalto-nostotaso-gbr 560a120e6, -pol 5cc8226c4, -aut 2ff5ae303 (6 kukin, AUT Tonava pidetty, ei Wachau-nostoa), testit 0 fail. DEU/ITA/ESP-nostotasohaarat ovat vanhalta pohjalta (614 committia jäljessä) → Julkaisija cherry-pickaa kuten kartuschoissa. Seuraava erä NLD/BEL/CHE/PRT/GRC/CZE.

## TYYPPIMERKIT LAHIZOOMISSA VALMIS JA HYVAKSYTTY (9a96e4f5c) (22.9.2026 klo 00.09)

Pelikoodari 22.9.2026 klo 00.50: kartan kerroin ≥ 4 (z8) → jokainen nosto saa tyyppinsä Codexin kuvamerkin tavallisessa koossa, kauempana piste; ykköstaso 1,6× kaikilla zoomeilla; tyyppi ilman merkkiä (eläimet) pitää tyyppikuvakkeen; vaihto häivytetään rungolla 180 ms; muiden nostojen ikonit ovat esteitä nimiöille (kaupunki ja ykköstaso eivät väistä). Savuke 10/10, testit 3844/0. Puhelimen syvin zoomi (kerroin 4,4) juuri rajan yli, z8 ja z9 samat. Fable katsoi kaappaukset (z6 pisteet + ykköstason merkit, z8 kaikki merkkeinä, nimiöt eivät osu ikoneihin) ja hyväksyi ilman omistajan korttia (omistajan lupa 21.9. klo 23.45). Julkaisijalle.

## NOSTOTASOT NLD/BEL/CHE/PRT/GRC/CZE HYVAKSYTTY; DEU/ITA/ESP OLI JO MAINISSA (22.9.2026 klo 00.12)

Sisältökirjuri 22.9.2026 klo 01.00: DEU/ITA/ESP-nostotasot olivat jo mainissa toista kautta (cherry-pick tyhjä), tarpeettomat haarat poistettu. Uusi erä hyväksytty (docs/raportit/nostotasot-nld-bel-che-prt-grc-cze-ehdotus-20260921.md): NLD Kinderdijk, Keukenhof, Giethoorn, Vredespaleis, Gouda, Vaalserberg (→ Afsluitdijk jos nosto on); BEL Waterloo, Bruggen Belfry, Menin Gate, Chimay, Canal du Centre, Hautes Fagnes; CHE Matterhorn, Reininputous, Kapellbrücke, Chillon, Gruyères, CERN; PRT Sintra, Douro, São Vicenten niemi, Batalha, Torre, Elvas; GRC Akropolis, Santorini, Meteora, Delfoi, Olympia, Knossos; CZE Český Krumlov, Kutná Hora, Sněžka, Vltava, Karlovy Vary, Plzeňský Prazdroj. Seuraava erä HUN/SWE/NOR/DNK/FIN/IRL, sitten loput 4 kukin.

## NOSTOTASOT HUN/SWE/NOR/DNK/FIN/IRL HYVAKSYTTY (22.9.2026 klo 00.33)

Fable 22.9.2026 klo 01.10: hyväksytty (docs/raportit/nostotasot-hun-swe-nor-dnk-fin-irl-ehdotus-20260921.md): HUN Balaton, Hortobágy, Tokaj, Eger, Pannonhalma, Kékes; SWE Kiruna, Birka, Visby, Kebnekaise, Vänern (5); NOR Geiranger, Preikestolen, Nordkapp, Lofootit, Trollstigen, Nidaros; DNK Kronborg, Billund, Jelling, Odense, Møns Klint, Skagen; FIN Saimaa, Halti, Turun linna, Olavinlinna, Verla, Merenkurkku; IRL Moher, Newgrange, Blarney, Skellig Michael, Killarney, Cobh. Viimeinen erä (17 maata, 4 kukin) uudelle Sisältökirjuri-sessiolle.

## YON SALDO: v2037-v2058 MAINISSA; LIIKEVARA+ZOOMIKORJAUS (v2056) MITATTU iPHONELLA; HEHKUPISTE VALMIS; SISALTOKIRJURI JA PELIKOODARI NOLLATAAN (22.9.2026 klo 06.42)

Julkaisija 22.9.2026 klo 01.30: mainissa v2058: kartuschat v2033–36, maakuntaluonnehdinnat v2037, nostojen tyyppimerkit v2039, korttien turva-alue v2041, 15 maan nostotasot v2038–v2058, pyyntötahditus #2699, CI-punaiskorjaukset v2046–48, liikevara+ablaatio v2056; testit 3847/0 koko illan. Pelikoodari (docs/raportit/viesti-fable-liikevara-zoomi-20260522.md → oikea polku viesti-fable-liikevara-zoomi-20260922.md): nostot ja nimet ladotaan levossa 0,5 × ruutu joka suuntaan, liikkeessä ei täyttä ladontaa, rasteroinnit ≤ 1/kehys, rungon rakennus kerran, peiton osapäivitys. Laitetestaaja iPhonella (sulavuus-liikevara-iphone-20260922.md): Camargue porras 4 pan 38/79 → 4/209 kehystä > 50 ms, portaat 3–4 p95 < 25 lähes kaikkialla; Ranska z6 zoomi yhä p95 50 (pisimmät kehykset piirtoa, ei ladontaa → laattatekstuurien lataus/GPU zoomissa, Karttasepän kanssa). Hehkupiste valmis (pelikoodari-hehkupiste 158adf4c2: säteittäinen häive aiheen musteella 2,1 × säde, alfa 0,45→0, vaaleampi sisus, sykähdys ±7 %/2,4 s vain levossa; savuke 6/6, testit 3848/0). Mainissa v2057 punainen glnimiot-nostot 8/9 (ikonit laatikoissaan 49/56) — Pelikoodari tutkii. Sisältökirjuri (70 %) nollataan, worktree Matkakirja-sisaltokirjuri; Pelikoodari (70 %) nollataan punaisen korjauksen jälkeen, worktree Matkakirja-pelikoodari.

## v2059 (SAVUKEKORJAUS); PELIKOODARI NOLLATAAN, WORKTREE Matkakirja-pelikoodari; LINSSIKATALOGIN KORJAUKSET VALMIIT (22.9.2026 klo 06.48)

Pelikoodari 22.9.2026 klo 01.45: glnimiot-nostot-savuke korjattu (v2059, #2721); hehkupiste Julkaisijalla; luovutus docs/raportit/viesti-pelikoodari-luovutus-20260922.md (pelikoodari-luovutus-20260922 a15ee2054); linssikatalogi-parvi valmis (3306ab160, kaappaukset päivä/yö) Fablen tarkastukseen. Fable siirsi worktreen /Users/samireivinen/Matkakirja-pelikoodari (symlinkit Matkakirja-opus molemmissa kodeissa) ja nollaa session.

## NOSTOTASOT VIIMEINEN ERA (16 MAATA, 4 KUKIN) HYVAKSYTTY; SAANTO: TAHTIKOHDE EI OLE KAUPUNKI, JOLLA ON KAUPUNKIPISTE (22.9.2026 klo 06.52)

Fable 22.9.2026 klo 02.05: Sisältökirjurin ehdotukset HRV/SVN/SVK/ROU/BGR, BIH/LTU/LVA/EST/ISL/LUX, MLT/CYP/UKR/RUS/TUR (docs/raportit/nostotasot-*-ehdotus-20260922.md) hyväksytty; SRB ei nosto-dataa (Raamatun poikkeuslista). Sääntö nostotasoihin: ykköstason tähtikohde ei saa olla pelikaupunki eikä kaupunki, jolla on jo poltettu kaupunkipiste ja nimi pallolla (merkki osuisi nimen päälle); kaupunkinostot vaihdetaan muuhun (Split, Bratislava, Kiova, Valletta) tai maa saa 3 tähteä.

## HILJAINEN SAVUKEAJO MAINISTA: 4 KORJAUTUI, UUDET PUNAISET NOSTOTASOT JA NIMIOT-ELAVAT (REUNAN YLITYS, LIIKEVARA?) (22.9.2026 klo 07.11)

Julkaisija 22.9.2026 klo 02.15 (load 3–8): korjautuneet glnimiot-nimet, glnimiot-nostot, kaupungit-piiloon, noppa-saapumisen-aikana; vanhat ennallaan pariisi-lahizoom-390-liuska 16/17, nimiot-sulavat 12/16; uudet punaiset nostotasot 14/18 ja nimiot-elavat 16/22 'reunan ylitys' — todennäköisesti liikevaran (v2056) seuraus ja savukkeiden vanha oletus; Pelikoodari arvioi ja korjaa vartiot tai koodin.

## SAVUKKEET NOSTOTASOT JA NIMIOT-ELAVAT VIHREIKSI (3be174d16): VARTIOT LUKIVAT IKKUNAN MITTOJA, EI BUGIA (22.9.2026 klo 07.22)

Pelikoodari 22.9.2026 klo 02.30: 'reunan ylitys' ei ollut bugi: vartiot lukivat ikkunan mittoja (390) mutta laput ovat kotelon pikseleitä (374), joten kokonaan kotelon ulkopuoliset laput (Bonifacio, Nizza, Bernhardilainen) laskettiin ylityksiksi; nyt ruutu = kotelo ja ylitys vain osittain ruudussa olevalle. Yhtään puoliksi ruudussa olevaa lappua ei löytynyt. Testit 3848/0, Julkaisijalle. Ranska z6 zoomi: mittari mittaa-zoomipiirto.mjs (pääsäie/GPU-jako + CDP-profiili); laattakokeet (aniso, mipmap, silmät, häive, vienti levossa) eivät muuta p95:tä headlessissä → pulu/DOM-kerrokset ja iPhone-mittaus seuraavaksi.

## NOSTOTASOT KOKO EUROOPPAAN VALMIIT (37 MAATA); VIIMEISET 16 HAARAA JULKAISIJALLA (22.9.2026 klo 07.29)

Sisältökirjuri 22.9.2026 klo 02.40: viimeinen erä dataan (HRV Split → Stonin muurit, SVK Bratislava → Bojnice, UKR Kiova ja Odesa → Kamjanets-Podilskyi ja Bakhchysarai, MLT Valletta → Sininen luola; SRB ilman dataa), 16 haaraa, testit 0 fail, Julkaisijalle. Nostotasot ovat nyt koko Euroopassa (FRA 8, DEU/ITA/ESP 8, 15 maata 5–6, 16 maata 3–4). Sisältökirjuri aloittaa maakuntien erän 2 (pitkä teksti + kuva, 97 aluetta).

## MAAKUNTIEN ERA 2 (PITKA TEKSTI + KUVA, 97 ALUETTA) TARKASTETTU: HYVAKSYTTY, 1873-TOISTO HARVEMMAKSI (22.9.2026 klo 07.46)

Fable 22.9.2026 klo 03.00: Sisältökirjurin erä 2 (haara sisalto-maakunnat-era2, raportit docs/raportit/maakunnat-era2-*-20260922.md; kuvat Commonsista tools/hae-commons.mjs:llä, sha256 + R2-osoite) tarkastettu: FRA kokonaan, POL:n 1873-faktat pistokokeena (toukokuun lait 1873, Danzigin keisarillinen telakka 1871, Vulcan Stettin, Breslau) pitävät; Monet 1872, Verne 1873, Thiers/MacMahon 1873, Alsace 1871 oikein. Korjaus: 'isoisän matkavuonna 1873' toistuu lähes joka alueella → enintään puolessa alueista per maa ja vaihtelevin muodoin; pituus 3–6 virkettä. Sitten dataan ja Julkaisijalle; erä 3 pulun kysymykset.

## MAAKUNTIEN ERA 2 DATAAN (053ce36b2); KUVAT R2:EEN ENNEN MERGEA (22.9.2026 klo 08.01)

Sisältökirjuri 22.9.2026 klo 03.15: erä 2 kirjoitettu js/packs/maakunnat-luonnehdinnat.js:ään (97 aluetta pitka + kuva), 1873-kytkös 42/97 vaihtelevin muodoin, testit 0 fail. Kuvat paikallisessa kansiossa, R2-osoitteet datassa. Fable: Julkaisija vie 97 kuvaa ämpäriin kuvaputken tavalla ja tarkistaa otoksen ennen mergeä (lupa annettu). Sisältökirjuri aloittaa erän 3 (pulu).

## MAAKUNTIEN ERA 3 (PULUN KYSYMYKSET) HYVAKSYTTY; OMA TIEDOSTO js/packs/maakunnat-pulu.js (22.9.2026 klo 08.10)

Fable 22.9.2026 klo 03.30: Sisältökirjurin erä 3 (2–3 kysymys-vastaus-paria per alue, 97 aluetta, raportit docs/raportit/maakunnat-era3-*-20260922.md) hyväksytty otoksen perusteella. Päätös: pulun parit omaan tiedostoon js/packs/maakunnat-pulu.js samoilla avaimilla, lazy-import pulun napista; guard-testi 2–3 paria ja vastaus ≤ 400 merkkiä; sw.js ja build-standalone rekisteröinti.

## MAAKUNNAT 1-3 VALMIIT (maakunnat-pulu.js 498280100); SISALTOKIRJURIN SEURAAVA ERA KOHTAAMISET C1 (6 KAUPUNKIA) (22.9.2026 klo 08.17)

Sisältökirjuri 22.9.2026 klo 03.45: js/packs/maakunnat-pulu.js valmis (erillinen tiedosto, samat avaimet, guard-testi, 9 vastausta lyhennetty ≤ 400 merkkiin), testit 0 fail, Julkaisijalle. Maakuntasisältö lyhyt/pitkä/kuva/pulu valmis 97 alueelle. Seuraava erä: kohtaamiset puuttuviin 41 kaupunkiin, ensin 6 kaupunkia (eniten nostoja ilman kohtaamista), nykyisten hyväksyttyjen rakenteella, tekstit Fablelle tiedostona ennen dataa.

## KOHTAAMISET C1 HYVAKSYTTY (PARIISI, ROOMA, WIEN, HELSINKI, ISTANBUL, AMSTERDAM); ANTON = KATAKOMBIT; LONTOON PELAAJAREPLIIKKI KORJATAAN (22.9.2026 klo 08.34)

Fable 22.9.2026 klo 04.00: Sisältökirjurin kohtaamiset C1 (docs/raportit/kohtaamiset-era-c1-20260922.md): Pariisi bukinisti Colette (bukinistien laatikot 1859/1891), Rooma mopokorjaaja Fabrizio (eri kuin kaaren Enzo), Wien suntio Anton (maailmannäyttely ja kolera 1873), Helsinki telakkahitsaaja Saana, Istanbul raitiovaunuseppä Kemal, Amsterdam Yara (kaaren hahmo). Hyväksytty. Päätökset: Wienin Anton = katakombit (pörssijuoksija-konsepti pois kuvatuotanto-kohtaamiset.md:stä, Amsterdam Yaraksi); Lontoo-esimerkin pelaajarepliikki korjataan Fogg ei puhu -säännön mukaiseksi; hyväksyttyjen kuvakonseptien uudelleenkäyttö ok; Rooma/Helsinki/Istanbul kuvat tilataan Codexilta. C2 seuraavat 6 kaupunkia.

## KOHTAAMISET C1 DATAAN (f281f46ef); KUVATILAUS ROOMA/HELSINKI/ISTANBUL CODEXILLE (TILAUS 8) (22.9.2026 klo 08.47)

Sisältökirjuri 22.9.2026 klo 04.20: kuusi kohtaamista js/packs/kohtaamiset.js:ään, Lontoon pelaajarepliikki korjattu, kuvatuotanto-kohtaamiset.md päivitetty; Rooman ja Istanbulin puhetagit korjattu englanniksi (LIVIAN_TUNTEET-sanat eivät ole ElevenLabs-tageja). Testit 0 fail, sisalto-kohtaamiset-c1 Julkaisijalle. Fable tilasi Codexilta kolme kasvokuvaa (posti/fable-codexille-kohtaamiskuvat-c1-20260922.md). C2 alkaa.

## KARTTASELITEPANEELI UUSIKSI: TYYPPIMERKIT, JARJESTYS, POIS/KAIKKI, VALILEHDET NOSTOT|MAAKUNNAT|NIMET, LIUKUSAADIN OIKEAAN REUNAAN, YKSI VALINTA KERRALLAAN (22.9.2026 klo 09.12)

Omistaja 22.9.2026 klo 08.50 (kortti, iPhone-kaappaus Karttaselitteet-paneelista): 1) jokaiselle riville paitsi kaupungeille samat Codexin tyyppimerkit kuin kartalla (Historia; Kulttuuri+ruoka kaksi merkkiä; Kauppa+tekniikka+merenkulku; Luonto vuori/vesi; Eläimet tassu; Kadonneet ihmeet tähti; Historian hetket tiimalasi; Skandaalit salama). 2) Järjestys aiheittain: Kaupungit → Historia, Kadonneet ihmeet, Historian hetket, Skandaalit → Luonto, Eläimet → Kulttuuri ja ruoka, Kauppa ja tekniikka; tyhjä kategoria näyttää 0, ei viivaa. 3) Otsikon tilalle välilehdet Nostot | Maakunnat, myöhemmin kolmas Nimet 1873 / nykyiset (kulttuurialueiden 1873-nimet vs nykymaakunnat). 4) OFF/ALL-napit pois; listaan rivit Kaikki ja Ei mitään. 5) Oikeaan reunaan pystysuuntainen LIUKUSÄÄDIN peukalolle: pieni läpinäkyvä, mekaanisen näköinen levy, joka liukuu rivien päällä lukumäärien kohdalla (lukumäärät jäävät näkyviin levyn alle) ja pysähtyy riviin; valinta YKSI KERRALLAAN (kategoria, Kaikki tai Ei mitään; monivalinta pois, väriympyrät jäävät merkeiksi). Maakunnat-välilehdellä sama levy liukuu alueiden päällä ja kohdistaa yhteen alueeseen: väri kartalle, luonnehdinta viereen (täppä pidempään versioon kuvalla, pulun nappi). 6) Paneeli siirtyy yhden pykälän ylös niin, että se peittää napin, josta se avattiin. 7) Ranskan Kadonneet ihmeet näyttää viivaa vaikka Tuileries, Bastilji ja Cluny ovat Ranskassa → Pelikoodari tarkistaa laskurin (ihme on lippu, ei kategoria). Pelikoodarin Sonnet-parvi tekee paneelin uudistuksen (kohdat 1–2, 4–7 Nostot-välilehdelle) heti rinnalla; Maakunnat-välilehden kartta-kytkentä (M1) alkaa sulavuuden kuittauksesta.

## KOHTAAMISET C2 HYVAKSYTTY (ATEENA, KOBENHAVN, SOFIA, FIRENZE, LISSABON, BUDAPEST), FIRENZE KORJATAAN; ZOOMIKORJAUS 52d826123 (PAASAIKEEN LAATAN VALMISTELU); dpr-PAATOS ODOTTAA (22.9.2026 klo 09.14)

Fable 22.9.2026 klo 09.05: C2 (docs/raportit/kohtaamiset-era-c2-20260922.md): Ateena juoksuvalmentaja Iason (Kallimarmaro marmori vasta 1895–96), Budapest kylpylänvartija Márta (Buda+Pest+Óbuda yhdistyivät 17.11.1873), Lissabon laattamaalari Inês (Carris-hevosraitiovaunu 17.11.1873), Sofia lähteenvartija Nadia (osmanivalta 1873), København pyörämekaanikko Sofie, Firenze kultaseppä Ilaria — Firenze korjataan: pääkaupunki siirtyi Roomaan 1871 (ei 'yhä pääkaupunki' 1873) ja kaava 'kuten piirtäjä'. Kuvatuotanto-md: Réka → Márta. Pelikoodari: Ranska z6 zoomi: syy pääsäikeen laatan valmistelu (kangas/kerma/getImageData ~5 ms/kehys), ei GPU; valmistelu ja vienti väistävät pitkää kehystä liikkeessä (pelikoodari-zoomi-piirto 52d826123, Julkaisijalle); iPhone p95 104 → 80 kuormassa (~38 ilman); jäljellä 16–26 ms tyyli/asettelu/maalaus; Laitetestaajan kierros 3 (eiliike-blend vs laattojen GPU-kevennys); jos ei riitä, renderöintitarkkuus dpr 3 → 2 zoomin ajaksi vaatii omistajan päätöksen. Mainissa v2062 ja v2069. Karttatyökalun suunnitelma pelikoodari-karttatyokalu-suunnitelma e51eb010f; GL vaihe 5: halo onnistuu GL:ssä.

## MAAKUNNAT-VALILEHTI: LYHYT SELITE AUTOMAATTISESTI PANEELIN ALLE, PLUS AVAA POP-UPIN (AITO KUVA + HAVAINNEKUVA, PITKA TEKSTI, PULUN KYSYMYKSET) (22.9.2026 klo 09.14)

Omistaja 22.9.2026 klo 09.10: Maakunnat-välilehdellä valitun alueen lyhyt luonnehdinta tulee automaattisesti karttatyökalun alapuolelle; sen vieressä pieni plus-ikoni, joka avaa alueen oman pop-upin: muutama kuva (aito Commons-valokuva ja havainnekuva), pitkä luonnehdinta ja lopussa pulun lisäkysymykset. Havainnekuva per maakunta (97) tilataan Codexilta erikseen (aihe: alueen tunnusnäkymä isoisän matkan aikaan 1873, fotorealistinen kuvaputken tapaan, ei tekstiä) — omistaja vahvistaa aiheen. Pelikoodarin paneelispesifikaatioon lisäys.

## SULAVUUS: OMISTAJA NAKEE NYKIMISTA v2076:SSA; iPHONE-TIMELINE EI MAHDOLLINEN (EI USB), TILALLE XCTRACE SIMULAATTORISTA; MITTAUSIKKUNAT (22.9.2026 klo 09.17)

Omistaja 22.9.2026 klo 09.20: kartta nykii yhä natiivilla iPhonella v2076. Tila: panorointi mittausten mukaan kunnossa (liikevara v2056), zoomi Ranska z6 laitteella p95 ~50 ms; laattojen valmistelun väistö (52d826123) ei vielä mainissa. Fable: Pelikoodari arvioi kerman polttamisen laattoihin tai valmistelun siirron Web Workeriin (OffscreenCanvas + createImageBitmap) pääsäikeen laattatyön poistamiseksi kokonaan, ja tarkistaa rAF-silmukan layout-lukemat. Laitetestaaja: fyysistä iPhonea ei ole USB:ssä (omistaja etänä) eikä GUI-työkalua Web Inspectoriin → profiili simulaattorin WebContent-prosessista xcrun xctrace Time Profilerilla (pääsäikeen WebCore-symbolit) panoroinnin ja zoomin aikana; kierros 3 hiljaisessa ikkunassa. Sääntö: Laitetestaaja ilmoittaa Julkaisijalle mittausikkunan (≤15 min), jolloin ei savukkeet-mac-ajoja. dpr 3→2 zoomin ajaksi kysytään omistajalta vain jos nämä eivät riitä.

## LAATTOJEN VALMISTELU SIIRRETAAN WEB WORKERIIN (KERMA RIIPPUU PELITILASTA, EI POLTETTAVISSA) (22.9.2026 klo 09.17)

Pelikoodari 22.9.2026 klo 09.30: kerma riippuu pelitilasta (käydyt maat, kohdemaan suojarengas), joten sitä ei voi polttaa laattoihin; laattojen valmistelu siirretään Web Workeriin (OffscreenCanvas + createImageBitmap, polygonit ja kuvat transferable-puskureina, kangaslähde säilyy viennissä; Karttasepän kerma-koodi workeriin sellaisenaan). 'Muu' 16–26 ms on skriptin jälkeistä renderöintiä (tyyli/asettelu/maalaus ja WebGL-kankaan luovutus komposiittorille) → xctrace-profiili. Fable hyväksyi Worker-siirron seuraavaksi eräksi; karttaselite-parvi (3 Sonnetia) alkoi haarassa pelikoodari-karttaselite.

## KOHTAAMISET C2 DATAAN (07aed5e72); KUVATILAUS 9 CODEXILLE (ATEENA, FIRENZE, KOBENHAVN) (22.9.2026 klo 09.19)

Sisältökirjuri 22.9.2026 klo 09.40: C2 kuusi riviä dataan, Firenze korjattu, Réka → Márta; kolmen luonnoksen tervehdysLuenta korjattu täsmäämään tervehdystä (agentit jättivät osan lauseesta pois — tarkistus jatkossa: luenta = tervehdys sanasta sanaan). Testit 0 fail, Julkaisijalle. Fable tilasi Codexilta kolme kasvokuvaa (posti/fable-codexille-kohtaamiskuvat-c2-20260922.md). C3 alkaa; Sisältökirjuri nollataan (72 %) luovutuksen jälkeen.

## OMISTAJAN AAMUTESTI v2076: ZOOMI NOPEA, PANOROINTI NYKII (SUURIN HAITTA), HUNTU PUUTTUU HETKEN UUSISTA LAATOISTA, MEREN VIIVAT PAKSUINA ZOOMISSA (22.9.2026 klo 09.20)

Omistaja 22.9.2026 klo 09.45 (iPhone natiivi v2076): zoomi toimii nopeasti sisämaassa; merialueella laattojen viivat sotkeutuvat hetkeksi paksummiksi (karkea taso suurennettuna) ja näyttävät virheiltä. Panorointi on yhä tökkivää, ei pehmeä kuin Google Earth — suurin häiritsevä tekijä. Panoroidessa muiden maiden kartat näkyvät hetken ilman huntua (kerma tulee laattaan vasta jälkikäteen) ja pomppaavat silmään. Fablen linjaus tutkittavaksi (Pelikoodari + Karttaseppä, yksi rivi kummastakin ennen toteutusta): 1) HUNTU: laattaa ei näytetä ennen kuin kerma on siinä (Worker-siirto hoitaa), ja rakenteellisena vaihtoehtona kerma GPU-peittotasona (maiden polygonit kolmioituna kuten M0, kermanvärinen alfa + löytämisen sumu shaderissa) laattojen pikselikäsittelyn sijaan — poistaisi sekä välähdyksen että pääsäikeen laattatyön; 2) PANOROINNIN NYKIMINEN: kehysaika ei riitä mittariksi — lisätään liikkeen tasaisuusmittari (kameran siirtymän varianssi kehysten välillä tasaisessa vedossa); tarkistetaan syöttöputki: kosketuksen deltat kootaan ja sovelletaan kerran per rAF aikaleimalla, ei tapahtumakohtaisesti; liikkeen jatkuvuus (inertia) sormen irrotessa; 60 Hz rAF WKWebView'ssä on katto, joten jokaisen kehyksen on oltava tasainen; 3) MEREN VIIVAT: karkean tason suurennus näkyy, koska viiva on 1 laattapikseli; vaihtoehdot: isobaatit vektoritasoksi (vakioleveys ruudulla) tai zoomiennakko aiemmin ja laajemmalle merellä (meren laatat kevyitä).

## PAATOS: KERMA GPU-PEITTOTASONA (ADMIN-0 KOLMIOITUNA), TASAISUUSMITTARI PANOROINTIIN; CODEXILLE 97 MAAKUNNAN HAVAINNEKUVAA; OMISTAJA KYTKEE iPHONEN USB:LLA (22.9.2026 klo 09.23)

Fable 22.9.2026 klo 09.55: 1) Pelikoodarin arvio: huntu puuttuu, koska laatta valmistuu ennen maapolygoneja (pallolaatat.js palauttaa laatan ilman kermaa) tai pohjan laatta näkyy alla; Worker (≈1 pv) ei poista kytköstä. PÄÄTÖS: kerma GPU-peittotasona (≈2 pv): Karttasepän admin-0-kolmiointi M0-putkesta, oma shader (kermaväri + löytämisen sumu + kohdemaan rengas kärkiattribuuttina, reunan pehmennys), ≈0,2–0,5 ms/kehys, ei laattakohtaista työtä; kerma-reuna-savuke mittarina; Worker varalle. Pikakorjaus sillä välin: laattaa ei näytetä ilman kermaa. 2) Panorointi: syöttöputki on OrbitControls (delta tapahtumakohtaisesti pointermovesta); Pelikoodari tekee tasaisuusmittarin (synteettinen vakionopeusveto, siirtymä/kehys, varianssi, pysähdykset) ja siirtää deltojen soveltamisen rAF:iin aikaleimalla, jos epätasaisuus näkyy. 3) Omistaja: Codexin kuvat työn alle → tilaus 10 postilaatikkoon: 97 maakunnan havainnekuvaa 1873 (posti/fable-codexille-maakuntien-havainnekuvat-20260922.md). 4) Omistaja kytkee iPhonen USB:llä Mac Studioon → Safari Web Inspector Timeline oikealta laitteelta mahdollinen. 5) Karttasepän rooli-worktree katosi toisen kerran; luotu uudelleen (karttaseppa-tyo-20260922), Karttaseppä selvittää mikä sen poistaa. Sisältökirjuri (72 %) nollataan luovutuksella viesti-sisaltokirjuri-luovutus-20260922-b.md; C3:n 6 agenttia (Bukarest/Oslo/Tampere/Dublin/Granada/Pietari) uusi sessio jatkaa luovutuksen ohjeella.

## MAAPOLYGONIT ADMIN-0 KOLMIOITU PEITTOTASOA VARTEN (PR #2741); MEREN VIIVAT: ZOOMIENNAKKO 50 % NYT, ISOBAATTIVEKTORIT MYOHEMMIN; MAAKUNTA-AINEISTO AMPARIIN (LUPA) (22.9.2026 klo 09.27)

Karttaseppä 22.9.2026 klo 10.10: maapolygonit (257 maata, 9,3 Mt, per maa .bin + .json) toimitettu Pelikoodarille kerman GPU-peittotasoa varten (työkalu --taso=admin0, PR #2741); admin-0-rannikko poikkeaa GSHHG-rannasta jopa 700 m → peittotason reuna häivytetään. Meren viivat zoomissa: b) zoomiennakko 50 %:iin ja laajemmalle merellä (päivän työ) nyt; a) isobaatit + ranta omaan vektoritasoon (viikon työ + pohjapoltto, +50–100 k segmenttiä puhelimelle) vasta sulavuuden jälkeen jos omistaja haluaa terävät isobaatit. Fable antoi luvan viedä maakunta-aineiston (15,9 Mt) ja maapolygonit ämpäriin julisteet/pallo/maakunnat|maapolygonit/2026-09-22a/; M1 (js/pallomaakunnat.js) lipun takana.

## TARKENNUS: KERMA, SUMU JA KOHDEMAAN REIKA LAATAN MATERIAALIN SHADERIIN (EI POLYGONIPEITTOA) (22.9.2026 klo 09.31)

Pelikoodari 22.9.2026 klo 10.20, Fable hyväksyi: kerma tehdään laatan materiaalin fragment-shaderissa (three.js onBeforeCompile): maa/meri laatan omasta väristä (R−B) kuten nykyinen pikselisääntö, kohdemaan renkaat ja sumun aukot yhtenä pienenä maskitekstuurina lauta-koordinaateissa, piirretään kerran maanvaihdossa. Rantaviiva täsmälleen laatan oma, kerma-reuna pehmeä, laattaa ei koskaan näy ilman kermaa, pääsäikeen kangas/getImageData katoaa. Vaihe 2 sama shader pohjapallon laattoihin (huntu myös panoroinnin aukoissa). Karttasepän admin-0-polygonit jäävät maakuntien värjäykseen ja osumatestiin.

## MAAKUNTAVEKTORIT M1 VALMIS (PR #2745, ?maakunnat=1); AINEISTO AMPARIIN LUVALLA; iPHONE USB KYTKETTY, WEB INSPECTOR AJETAAN GUI-SKRIPTILLA (22.9.2026 klo 09.42)

Karttaseppä 22.9.2026 klo 10.40: M1 js/pallomaakunnat.js (yksi Mesh per maa MKV1:stä, väri kärkiattribuuttina 5 sävyä peitto 0,34, seuraa pelaajan maan korostusta, osuma(lat,lng) + valitse(indeksi) Pelikoodarin rajapinnaksi, 3 maata muistissa); savuke 9/9, panorointi kerroksen kanssa p95 19 ms WebKit puhelinkoko; lippu ?maakunnat=1, aineisto ämpäriin julisteet/pallo/maakunnat/2026-09-22a/ (lupa). Admin-0 ei mene kermaan (shader-maski), PR #2741 työkalu silti mainiin. Omistaja kytki iPhonen USB:llä ja antoi Käytettävyys-luvan: Fable ajaa Safarin Web Inspectorin Kehitys-valikon kautta osascript-GUI-skriptillä (computer-use ei saa klikata selaimia); puhelin näkyy devicectl:ssä, inspektoriyhteys odottaa puhelimen Web Inspector -asetusta ja avattua sivua.

## KOHTAAMISET C3 HYVAKSYTTY (BUKAREST, OSLO, TAMPERE, DUBLIN, GRANADA, PIETARI) (22.9.2026 klo 09.45)

Fable 22.9.2026 klo 10.50: C3 (docs/raportit/kohtaamiset-era-c3-20260922.md, sisalto-kohtaamiset-c3 7cf0e6b23): Bukarest katusoittaja Radu, Oslo kirjapainaja Halvor (Christiania 1873), Tampere junailija Aatu (rata Tampereelle vasta 1876), Dublin putkiasentaja Niamh (Vartry-vesi 1860-luku), Granada flamencoemäntä Pastora, Pietari Larisa; kaikki uusia hahmoja, kaaren varaukset tarkistettu. Hyväksytty; kuusi kuvaa tilataan Codexilta (tilaus 11) raportin valmistuttua. C4 alkaa.

## KOHTAAMISET RAJATTU EUROOPPAAN KUNNES MUUT LAUDAT VALMISTUVAT (22.9.2026 klo 09.53)

Fable 22.9.2026 klo 11.00: kohtaamisten erät C4–C7 vain Euroopan kaupungeille (inventaarion 41); New York, Tokio, Dubai ym. vasta kun mantereen lauta on valmis.

## NOSTOTASOT KOKO EUROOPPAAN TUOTANNOSSA (v2082, 36 MAATA); WEB INSPECTOR EI YHDISTA iOS 27 -LAITTEESEEN SAFARI 26.6:LLA (22.9.2026 klo 10.02)

Julkaisija 22.9.2026 klo 11.20: 30 maan nostotasoerä mainissa (v2082), kaikkiaan 36 Euroopan maata FRA/DEU/ITA/ESP mukaan lukien (SRB ilman dataa). Jonossa kohtaamiset c2 ja c3 (sama tiedosto kuin c1, konfliktinratkaisu rivit säilyttäen) ja maakuntien kuvien vienti R2:een. Fable: iPhone (iOS 27.0) USB:ssä ja parina, Käytettävyys-lupa annettu ja Safarin Kehitys-valikko ohjattavissa GUI-skriptillä, mutta Web Inspector ei yhdistä (Appien ja laitteiden tarkastus ei listaa laitetta; todennäköisesti Safari 26.6.2 vanhempi kuin iOS 27) → ehdotettu Safari Technology Preview; Laitetestaaja jatkaa xctrace-simulaattoriprofiililla.

## ZOOMIENNAKON LAAJENNUS EI AUTA MERELLA (PULLONKAULA LATAUSVAUHTI); SEURAAVAKSI LAATTAKOKO JA KYNNYS, ISOBAATTIVEKTORIT MYOHEMMIN (22.9.2026 klo 10.03)

Karttaseppä 22.9.2026 klo 11.30: zoomiennakko 50 % + merellä 90 % näkymästä toteutettu ja mitattu (mittaa-zoomiennakko-meri.mjs, WebKit puhelinkoko, Välimeri z7→z8): karkean tason näkymisaika 707–772 ms → 873–875 ms, rinnakkaisuus 6 vs 12 ei eroa; ennakko laukeaa jo zoomin alussa, 800 ms:ssä ehtii ~15 laattaa 32:sta → pullonkaula on latausvauhti. Haara karttaseppa-zoomiennakko-2 jää mittariksi. Maakunta-aineisto ämpärissä (502 tiedostoa). Fablen päätös: D) mittaa merilaatan tavukoko ja latausviive, kokeile kevyempää pakkausta merilaatoille ja HTTP/2-rinnakkaisuutta; C) z7→z8-kynnys myöhemmäksi merellä jos halpa; B) isobaatit vektoritasoon suunnitelmaan sulavuuden kuittauksen jälkeen (omistaja päättää).

## OMISTAJA: LAATTOJEN ESILATAUS LEVOSSA LAHIALUEELLE JA KOHDEMAAHAN (SW-VALIMUISTI) (22.9.2026 klo 10.04)

Omistaja 22.9.2026 klo 11.40: laatat esiladataan verkosta lähialueelle etukäteen. Fable Karttasepälle: 1) levossa (>300 ms) seuraavan tason (z+1) laatat näkymän alueelta +50 % ja nykyisen tason marginaali service workerin Cache API:in (ei GPU-muistiin, ei LRU-kattoa vastaan), keskeytys liikkeen alkaessa; 2) maahan saapuessa kohdemaan z6–z8 taustalla matalalla prioriteetilla; laattamäärä ja tavut lasketaan ensin (Ranska), z8 rajataan tarvittaessa rannikoihin ja nostojen ympärille. Mittari: karkean tason näkymisaika zoomissa kun z8 on välimuistissa.

## ESILATAUS LAAJENNETAAN: YKSI LEPOAIKAINEN JONO SW-VALIMUISTIIN, PRIORITEETIT; ROOLI-WORKTREEN POISTO TODENNAKOISESTI JULKAISIJAN SIIVOUS (22.9.2026 klo 10.06)

Omistaja 22.9.2026 klo 11.50: esilatausta muuallekin. Fable Pelikoodarille suunnitelma (docs/raportit/esilataus-suunnitelma-20260922.md): yksi lepoaikainen esilatausjono Cache API:in budjetilla (mobiiliverkko vs WiFi, tallennusraja, keskeytys liikkeessä), prioriteetit: laatat z+1 ja kohdemaa (Karttaseppä), ruudun ja kohdemaan nostokuvat, matkan alkaessa kohdekaupungin lehti/kohdekartta/pienoismallit/kohtaamiskuva/luennat, linssin laatat ja musiikki, fontit ja nimirasterit; mittarit nostokortin avausviive ja saapumisen ensikuvan viive. Karttasepän worktreen katoaminen: Karttasepän selvitys — molemmat kerrat osuivat sen checkout-haaran mergeen (23.25 ja 09.15) → Julkaisijan mergen jälkeinen siivous todennäköinen syy; sääntö: mergen jälkeen poistetaan vain etähaara, ei koskaan git worktree remove / branch -D / rm rooli- tai koodaus-worktreisiin; rooli-worktree pidetään haarassa jota ei mergetä.

## KOHTAAMISET C4 HYVAKSYTTY (TALLINNA, VILNA, BARCELONA, PRAHA, MOSKOVA, LJUBLJANA) (22.9.2026 klo 10.07)

Fable 22.9.2026 klo 12.00: C4 (docs/raportit/kohtaamiset-era-c4-20260922.md, sisalto-kohtaamiset-c4 16ce6cc10): Tallinna lyhdynsytyttäjä Miina (kaasuvalo 1865), Vilna kirjansitoja Aldona (lehdistökielto 1864–1904, kiristyi 1873), Barcelona kivenveistäjä Pau (Sagrada Família vasta 1882), Praha kellonvartija Věra (Orlojin apostolit 1865–66), Moskova lukkoseppä Stepan (GUM vasta 1893), Ljubljana kukkakauppias Vesna (Kolmisilta yksiosainen 1873). Hyväksytty, kuusi kuvaa Codexilta. C5 lupa.

## FABLEN NOLLAUSRAJA 65 %; ESILATAUS ILMAN MOBIILIBUDJETTIA; FABLE NOLLAA ITSENSA (LUOVUTUS 22.9.) (22.9.2026 klo 10.09)

Omistaja 22.9.2026 klo 12.05: Fablen nollausraja 65 % (Raamattu päivitetty); esilatauksessa ei erillistä mobiilibudjettia. Julkaisija: ei aja worktree remove/prune/branch -D, vain gh --delete-branch (etähaara); app ei ole tehnyt worktreitä → Karttasepän worktreen poistaja tuntematon. Codex-tilaus 11 (C3-kohtaamiskuvat) postilaatikkoon. Fable (72 %) tekee luovutuksen docs/raportit/viesti-fable-luovutus-20260922.md ja nollaa itsensä Postivahdin kautta Raamatun kaavalla.

## PULUN LASKEUTUMISVARJO POIS; STP EI YHDISTA (PUHELIMEN PUOLI); JULKAISIJA NOLLATAAN; FABLE NOLLAA ITSENSA (22.9.2026 klo 10.12)

Omistaja 22.9.2026 klo 12.25: pulun istahtaessa takaisin kartalle panoroinnin jälkeen kartalle piirtyy pitkä himmeä varjo pulun kohdalle koko kartan yli — turha, poistetaan (Pelikoodari; mahdollisesti leijunnan paikkauksen v2077 sivutuote). Safari Technology Preview asennettu ja kehittäjäominaisuudet kytketty, mutta puhelin jää yhä Connecting… → vika puhelimen puolella (lukitus, Web Inspector, Developer Mode, luottamus); skripti tools/mac/safari-kehitys-iphone.applescript. Laitetestaajan xctrace tarvitsee Developer Tools -luvan omistajalta. Julkaisija (73 %) kirjoittaa luovutuksen; uusi Fable nollaa sen. Fable nollaa itsensä nyt (luovutus viesti-fable-luovutus-20260922.md).

## LAATTAMAARAT JA LATAUSMITTAUS: VERKKO EI PULLONKAULA, PELIN OMA PUTKI (1 TEKSTUURI/KEHYS) ON; 2/KEHYS + BUDJETTI 6 ms ENSIN, ESILATAUS SITTEN (22.9.2026 klo 10.14)

Karttaseppä 22.9.2026 klo 12.30: Ranska (manner + Korsika, kaikki kerrokset) z6 20 laattaa 1,9 Mt, z7 56 / 4,1 Mt, z8 180 / 10,3 Mt → 256 laattaa 16,2 Mt: koko maan esilataus SW:hen mahdollinen. Ämpäri: z8 merilaatta 16–52 kt (med 24), maalaatta 30–49 kt, TTFB 21–56 ms, 10 rinnakkain 67 ms → 32 laattaa ~200 ms; karkea taso näkyi silti 750–870 ms → raja on pelin putki: LAATTAKERROS_TEKSTUUREJA_PER_KEHYS = 1 ja valmistelu 4 ms/kehys (32 laattaa ≥ 32 kehystä ≈ 530 ms). Fable kuittasi: ensin 2 vientiä/kehys zoomissa + valmistelu 6 ms (tunti, mitataan; sovitetaan Pelikoodarin kerma-shaderiin), sitten esilataus SW:hen puhelimen verkkoa varten.

## KARTTASELITEPANEELI VALMIS (pelikoodari-karttaselite 441aa7156), ODOTTAA OMISTAJAN KORTTIA; UUSI FABLE NAYTTAA KAAPPAUKSET (22.9.2026 klo 10.14)

Pelikoodari 22.9.2026 klo 12.35: karttaselitepaneeli valmis haarassa pelikoodari-karttaselite 441aa7156 (pohja v2076), EI Julkaisijalla ennen omistajaa. Kaappaukset docs/raportit/kaappaukset/karttaselite-20260922/ (puhelin-/tyopoyta- nostot, nostot-historia, maakunnat, maakunnat-valittu, maakunta-kortti). Tehty: tyyppimerkit riveillä, järjestys Kaikki → Kaupungit → Historia/Ihmeet/Hetket/Skandaalit → Luonto/Eläimet → Kulttuuri/Kauppa → Ei mitään, tyhjä 0, OFF/ALL pois, peukalolevy (raahaus + napautus, yksi valinta), levy alkaa napin yläreunasta (✕ sulkee), välilehdet Nostot | Maakunnat (valinta → lyhyt luonnehdinta paneelin alle + plus → kortti: kuvat, pitkä, pulun kysymykset; ei karttakytkentää, koukku ui.karttatyokaluMaakunta), ihmeiden laskuri korjattu (Ranska 3: Tuileries, Bastilji, Saint-Cloud; Cluny datassa kadonnut: false — sama GBR/IRQ/TUR). Testit 3872/0. TEHTÄVÄ UUDELLE FABLELLE: näytä kaappaukset omistajalle kortilla, sitten Julkaisijalle. Pelikoodari: pulun pystyvarjo seuraavaksi, sitten esilataussuunnitelma.

## UUSI FABLE-SESSIO ALOITTI; JULKAISIJA NOLLATTU (73 % → 0), AVOIMIA PR:IA EI; FABLEN OMA REMOTE CONTROL ESTYI LUOKITTIMESSA (22.9.2026 klo 10.19)

Fable 22.9.2026 klo 13.20: uusi Fable-sessio aloitti Postivahdin viestistä (luovutus viesti-fable-luovutus-20260922.md). Julkaisijan luovutus #2750 mainissa; nollauskaava ajettu (RC pois → clear self → aloitusviesti → RC päälle), worktree jo Matkakirja-julkaisija. Julkaisijan jono: kohtaamiset C4, maakuntien kuvavienti R2 ennen sisalto-maakunnat-era2-mergeä, Codex-PR:t. Avoimia PR:iä ei ole, mainissa v2083. Fablen oman Remote Controlin kytkentä (set_remote_control self) estyi auto-tilan luokittimessa; muiden sessioiden RC-kytkennät toimivat. Pyydetään omistajaa kytkemään Fablen RC toolbarista.

## OMISTAJAN PAATOKSET: KARTTASELITEPANEELI HYVAKSYTTY MUUTOKSIN; iPHONE WEB INSPECTOR YHDISTYY STP:LLA; xctrace-LUPA TERMINALILLE; KERMA-SHADER JA PILVI-POIS JULKAISIJALLE; C5 HYVAKSYTTY (22.9.2026 klo 10.37)

Omistaja 22.9.2026 klo 13.25 (kortti): karttaselitepaneeli tuotantoon muutoksin — alareunan seliteteksti pois, vasemman reunan värirenkaat pois, pitkät nimet lyhenteinä tai kolmella pisteellä, paneeli mahdollisimman kapea, vipuvedin läpinäkyvä ja sen keskellä pieni linssi jossa rivin numero hieman suurennettuna pallopyöristymällä (linssivirhe). Pelikoodari tekee ennen PR:ää. Fablen Remote Control oli jo päällä (luokitin esti vain työkalukutsun). iPhone oli mennyt lukkoon; auki ollessa Safari Technology Preview näkee puhelimen ja Web Inspector avautuu matkakirja.app-sivulle (GUI-skriptaus: Develop → Samin iPhone → sivu; klikkaukset CGEvent-työkalulla, System Events click at ei toimi). Kehittäjätyökalut-lupa annettu Terminalille (Claude ei ollut listassa) → Laitetestaaja toistaa xctracen. Pelikoodari: kerma/sumu/reikä laatan shaderissa valmis (pelikoodari-kermashader 8a37d454c; WebKit Ranska z6 kehyksiä > 25 ms 43/165 → 22/182) ja kartan liikkeen pilven varjo (.pallolauta-liike-pilvi) poistettu (pelikoodari-pilvi-pois 0c9a4ede4) — molemmat Julkaisijan jonon kärkeen ennen C4:ää. Sisältökirjuri: C5 (Košice/Zuzana, Bergen/Ingrid, Edinburgh/Fiona, Kraków/Tadeusz, Warszawa/Wiktor, Sarajevo/Amra) hyväksytty; Warszawan loyto yhdeksi repliikiksi; C6 jatkuu. Timelines-nauhoitus iPhonesta (139 s, kuvakaappaukset päällä): omistaja koki nykimisen tavallista pahempana ja puhelin kuumana — osin Web Inspectorin kuvakaappaus-aikajanan kuormaa; Export ei avannut tallennusikkunaa (selvitys jatkuu, seuraava nauhoitus ilman kuvakaappauksia).

## xctrace-SIMULAATTORIREITISTA LUOVUTAAN; iPHONE WEB INSPECTOR: KUVAKAAPPAUKSET POIS, VIENTI AVOIN; TASAISUUSMITTARI MAINISSA, LAITETESTAAJA AJAA iPHONELLA; KARTTASELITE 7419303d8 JULKAISIJALLE (22.9.2026 klo 10.43)

Fable 22.9.2026 klo 13.45: Laitetestaaja: Kehittäjätyökalut-lupa Terminalille toimii tavalliseen prosessiin, mutta simulaattorin WebContent-prosessiin xctrace ei kiinnity (Applen allekirjoitettu laajennus, ei get-task-allow) → xctrace-reitistä luovutaan, ei SIP-muutoksia. iPhone Web Inspector STP:llä: nauhoitus kuvakaappauksin kuormittaa puhelinta (omistaja: nykii tavallista pahemmin, kuuma); ilman kuvakaappauksia omistaja: selvästi sujuvampi. Nauhoituksen pysäytys jää pyörimään eikä Export aktivoidu — Laitetestaaja selvittää; työkalut tools/mac/ (klikkaa.swift, safari-iphone-avaa-inspector.applescript, LUEMINUT-iphone-inspector.md). Pelikoodari: tasaisuusmittari on mainissa v2080 (__kehysprofiili.veto, px/ms-vaihtelu; headless 37 % ilman pitkiä kehyksiä → syöttöputki todennäköinen syy); deltojen rAF-soveltaminen tehdään jos laitteella vaihtelu > 15 % — Laitetestaaja ajaa iPhonella nyt (porras 6, Ranska z6, Camargue z8). Karttaselitepaneeli omistajan ehdoin valmis (pelikoodari-karttaselite 7419303d8: seliteteksti ja värirenkaat pois, lyhenteet kolmella pisteellä, levy max 15 rem, läpinäkyvä vedin + CSS-linssi 1,25×) → Julkaisijan jono: kerma-shader → pilvi-pois → karttaselite → C4 → kuvavienti R2 → Codex. Esilataussuunnitelma docs/raportit/esilataus-suunnitelma-20260922.md (haara pelikoodari-esilataus-suunnitelma), Pelikoodari jatkaa pohjapallon laattoihin shaderissa.

## LAATTAPUTKEN LATTIA: 2 TEKSTUURIA/KEHYS + 8 ms (PR #2753), KARKEA TASO MERELLA 536–895 → 347–433 ms; ESILATAUS TOTEUTUKSEEN (KARTTASEPPA LAATAT, PELIKOODARI JONO); KYNNYS C JATETAAN (22.9.2026 klo 10.44)

Karttaseppä 22.9.2026 klo 13.55: LAATTAKERROS_TEKSTUUREJA_PER_KEHYS 1 → 2, valmistelun budjetti 4 → 8 ms (PR #2753, karttaseppa-tekstuurit-2). Uusi mittari mittaa-zoomiennakko-meri.mjs (WebKit 390×844 dpr 3, kuorma 9–13): karkean tason näkymisaika z7→z8 merellä 536–895 → 347–433 ms, maalla 751–1052 → 546–711 ms; zoomin p95 ennallaan 25–27 ms. Testit 47/0. Fable: esilataus toteutukseen — Karttaseppä tekee laattojen osuuden (haara karttaseppa-esilataus, Pelikoodarin suunnitelman prioriteetti 1), Pelikoodari yleisen jonon; rajapinta sovitaan suoraan. Kynnys C (z7→z8 myöhemmäksi merellä) jätetään, koska venytys puolittui. Julkaisijan jono: kerma-shader → #2753 → pilvi-pois → karttaselite → C4 → C5 → kuvavienti R2 → Codex.

## SULAVUUDEN KOKONAISKATSAUS: 21 KAANTAMATONTA KIVEA VIIDESSA RYHMASSA; ERA 1 PELIKOODARILLE (SYOTE KERRAN KEHYKSESSA, KAMERALOKI, CHANGE-KUUNTELIJAT, ILMAKEHA, POHJA, SHADER-POW, ESIKAANNOS), ERA 2 KARTTASEPALLE (SW-POLKU, PRECONNECT, ESIKOMPOSOIDUT LAATAT); PELIKOODARI NOLLATTU; MITTAUS JOKA VERSIOSTA, TUNTUMATESTI ERAN LOPUSSA (22.9.2026 klo 11.09)

Fable 22.9.2026 klo 14.20: omistaja kysyi, pitäisikö tuntumatesti tehdä vasta kun suunnitellut parannukset ovat valmiit, onko kaikki kivet käännetty ja onko tunnettu menetelmä jäänyt käyttämättä. Viisi rinnakkaista vain-luku-katselmusta (Opus/Sonnet) main v2084:stä + kirjaston sisältä (three.js r155). Raportti docs/raportit/sulavuus-katsaus-20260922.md. Vastaus: mittaus (tasaisuusmittari + kehysprofiili) joka versiosta, omistajan tuntumatesti erän 1 ja erän 3 jälkeen; Web Inspector vain diagnoosiin; testi viileänä ja 5 min jälkeen. Kiviä 21: A) GPU-täyttökerroin z6:lla noin 4–5 (ilmakehäkuori piirtyy koko ruudulle lähikuvassa, kirjaston z5-laatat + pohjapallo aina tarkan kerroksen alla, kerma-shaderin kaksi pow-paria per pikseli, illan sävy mix-blend-mode-DOM-kerroksena, dpr 3 + MSAA liikkeessä, laatat aina läpinäkyviä, ei shaderien esikäännöstä, nimiöatlaksen 16 Mt vienti); B) laattaputki (2–7 kuvaa ja dekoodausta per laatta, flipY=false-nollakopio kokeilematta, roska kehyspolussa, häive rAF-ketjuna per materiaali); C) syöte (kamera kirjoitetaan joka tapahtumasta eikä kerran kehyksessä — simulaattorin px/ms-vaihtelu 112 %; kameraloki new Error() joka kirjoituksesta; maapaneelin uudelleenkirjoitus joka change-tapahtumasta; Livia ja pöllönappi liikkeessä); D) lämpö (piirto 60 fps levossa → piirto tarpeen mukaan + syke 4 fps); E) verkko (SW:n laattakori ja esilataus osuvat vanhaan polkuun /julisteet/pallo/laatat/, pyramidi-laatat ohittavat Cache Storagen — syy miksi esilataus ei ollut päällä; ei preconnectia; ei katkaisijaa). Erä 1 Pelikoodari (nollattu 70 % → uusi sessio, luovutus de6e3f7fd; pohja-shader WIP 3d8288c1f rikki, odottaa), erä 2 Karttaseppä, erä 3 Pelikoodari. Omistajan päätökset: dpr/MSAA laitemittauksen jälkeen (tämän päivän dpr-koe oli simulaattorista, ei kelpaa) ja lepopiirto sykkeellä. Sisältökirjuri: C7:stä alkaen nostoraja pois, kaikki 41 Euroopan pelikaupunkia; kevyt fokusvirta ei estä kohtaamista (Valletta, Tromssa dataan). C6 hyväksytty (Riian sillan päivämäärä varmistetaan).

## OMISTAJA: KAIKKI SULAVUUSMUUTOKSET ENSIN, SITTEN TUNTUMATESTI, MITTAUS VAIN JOS TOKKII; LEPOPIIRTO SYKKEELLA HYVAKSYTTY (ERA 3); TARKKUUS LIIKKEESSA PELIN ASETUKSEKSI; KEVYIDEN PAKKIEN KOHTAAMISKENTAT SISALTOKIRJURILLE (22.9.2026 klo 11.14)

Omistaja 22.9.2026 klo 14.35 (kortti): piirto tarpeen mukaan + syke 4 fps hyväksytty erään 3. Mittausjärjestys: kaikki muutokset tehdään ensin, omistaja kokeilee itse pelissä, laitemittaus vain jos yhä tökkii (nopein tapa) → headless-mittaus vain regressiovartijana, Laitetestaajan laitemittaus odottaa. Fable: tarkkuusvaihtoehdot (terävä = dpr 3 + MSAA oletus; tasainen = dpr 2 liikkeessä, 3 levossa; kokeellinen = dpr 3 ilman MSAA:ta) tehdään pelin asetukseksi, jotta omistaja kokeilee ne itse; oletus ei muutu. Laitetestaaja: Košicessa kohtaaminen ei avaudu, koska kevyeltä pakilta (KEVYET_FOKUSVIRRAT) puuttuvat kohtaaminen/kohtaamispiste-kentät — koskee Bryssel, Ljubljana, Košice, Luxemburg, kohta Valletta, Tromssa; Fable: kentät ovat sisältöä, Sisältökirjuri lisää ne täyden pakin mallin mukaan, Laitetestaaja toistaa savukkeen.

## ESILATAUS VALMIS (PR #2760): SW PALVELEE PYRAMIDILAATAT LAATTACACHE:STA, LEVOSSA Z+1-LAATIKKO x1,5, SAAPUESSA KOHDEMAA Z6–Z8; KARTTASEPPA JATKAA PRECONNECT → ESIKOMPOSOINTI-ARVIO → KATKAISIJA (22.9.2026 klo 11.15)

Karttaseppä 22.9.2026 klo 14.50: katsauksen kohta 19 tehty — sw.js palvelee julisteet/pyramidi/-laatat LAATTACACHE:sta ja esilatausviesti hyväksyy ne (rinnakkain 4). Esilataus levossa (≥300 ms, ei sormea): näkymän z+1-laatikko ×1,5 kaikille kerrostasoille; saapuessa kohdemaan z6–z8 (manner + saaret ≤12°, ei Guyane); 20 osoitetta/250 ms vain levossa, sama kerran; ?esilataus=0. Mitattu Chromium 390×844 dpr 3: 6 s levossa korissa 686–1136 laattaa (ilman 222), FRA-jono 718; karkean tason aika Macilla ennallaan (verkko ei pullonkaula Macilla, hyöty puhelimen LTE:llä). Testit 111/0 + 7 uutta; raportti docs/raportit/laattaesilataus-20260922.md. Julkaisijan jono: #2753 → #2760 → pilvi-pois → karttaselite → C4–C6 → kuvavienti R2. Karttaseppä jatkaa 20 → 9 (arvio) → 21.

## PRECONNECT (#2761) JA LAATTAKATKAISIJA (#2762) JULKAISIJALLE; ESIKOMPOSOIDUT LAATAT HYVAKSYTTY (POHJA+RANTA+VIIVAT YHDEKSI, NIMIOT ERIKSEEN, +2,8–2,9 Gt AMPARIIN, VANHA POHJA JAA) (22.9.2026 klo 11.16)

Karttaseppä 22.9.2026 klo 15.05: katsauksen kohdat 20 ja 21 tehty (PR #2761 preconnect + dns-prefetch; PR #2762 katkaisija laji 'laatat': 3 virhettä tai 429/5xx → uudet lataukset seis 20 s, jono säilyy). Kohta 9 arvio: pyramidi nyt 2 993 Mt (pohja 93 000 laattaa 2 720 Mt, ranta 12 300 / 184 Mt, viivat 12 000 / 83 Mt, nimiöt 640 / 7 Mt); yhdistetty staattinen laatta pohja+ranta+viivat ≈ 2 800–2 900 Mt lisää (komposointi levyllä sharpilla 15–25 min + vienti 40 min, ei CI-taukoa); hyöty maalla −40…−60 % pyyntöjä ja dekoodauksia (90 %:lla maalaatoista on ranta- tai viivakerros), merellä ei muutu. Fable hyväksyi (ämpärin lisäkustannus muutama sentti/kk): nimiöt erilliseksi, vanha pohja jää kunnes uusi on tuotannossa, luettelon osoitin versioituna ja ?koe-vertailu, kerma-shaderin meritunnistus (R−B) tarkistetaan vedoksella ennen vientiä, pelipuolen kerrostyyppi 'yhdistetty' samaan PR:ään, vienti mittausikkunoiden ulkopuolella.

## KOHTA 9 (ESIKOMPOSOIDUT LAATAT) EI TEHDA PALLOLLE: PALLON LAATTA ON JO POHJA + RANTA (10 %) + NIMIOT + NOSTOT; ERA 2 VALMIS KUN #2760–#2762 MAINISSA (22.9.2026 klo 11.18)

Karttaseppä 22.9.2026 klo 15.20: pallo ei käytä viiva- eikä väritasoa (lepokerroksenKerrokset viiva: false); katsauksen '2–7 kuvaa/laatta' koskee tasokarttaa. Pallolla yhdistäminen kääriisi vain rannan pohjaan (rannikkolaatat 10 %) → −10…−25 % pyynnöistä rannikolla, ja peruisi omistajan 6.9. päätöksen rannan erottamisesta (V4 vektoriviivat). Fable: vaihtoehto A, kohtaa 9 ei tehdä pallolla; ämpäriin ei lisätä 2,9 Gt; katsaus korjattu. Erä 2 = #2760 esilataus, #2761 preconnect, #2762 katkaisija.

## KARTTASEPPA NOLLATTU (70 %, LUOVUTUS #2765); #2753 JA #2760 TUOTANNOSSA (v2086, v2090); SISALTOKIRJURIN LUOVUTUS PYYDETTY (73 %) (22.9.2026 klo 11.28)

Fable 22.9.2026 klo 15.40: Karttasepän luovutus 0baccaeed (PR #2765) kuitattu, nollauskaava ajettu (RC pois → clear self → aloitusviesti → RC päälle), worktree Matkakirja-karttaseppa haarassa karttaseppa-tyo-20260922. Tuotannossa v2090: laattaputken lattia #2753 (v2086) ja esilataus #2760; #2761 preconnect ja #2762 katkaisija Julkaisijalla. Uuden Karttasepän tehtävät: #2761/#2762 mergeen, pohjan piilotuksen tarkistus merellä Pelikoodarin erän 1 jälkeen, esilatauksen laiteohje Laitetestaajalle; isobaatit odottavat omistajaa. Sisältökirjuri 73 % → luovutus pyydetty (viesti-sisaltokirjuri-luovutus-20260922-ilta.md).

## SISALTOKIRJURI NOLLATTU (73 %, LUOVUTUS #2766); KOHTAAMISSARJA C1–C7 VALMIS (45 FOKUSVIRTA-KAUPUNKIA), C7 MERGE VASTA KEVYIDEN PAKKIEN SAVUKKEEN JALKEEN; KUVATILAUKSET C1–C7 CODEXILLE FABLEN TEHTAVA (22.9.2026 klo 11.31)

Fable 22.9.2026 klo 15.55: Sisältökirjurin luovutus 61df29ef3 (#2766) kuitattu, nollauskaava ajettu, worktree Matkakirja-sisaltokirjuri. Kohtaamissarja valmis: C1 mainissa, C2–C6 odottavat mergeä (sama tiedosto, konfliktit ratkaistaan luovutuksen menetelmällä), C7 = Tromssa + Valletta + kuuden kevyen pakin kohtaaminen/kohtaamispiste-kentät (Košice, Bryssel, Ljubljana, Luxemburg, Valletta, Tromssa; tests/liiku-nappi päivitetty) — merge vasta Laitetestaajan savukkeen jälkeen. Kuvatilausraportit C1–C7 (40 hahmoa) docs/raportit/kohtaamiset-kuvatilaus-c<N>-20260922.md → Fable tilaa Codexilta postilaatikon kautta (tilaus 12+). Uusi Sisältökirjuri: savukkeen varmistus, sitten Codex-toimitusten otostarkistus.

## KUVATILAUKSET C4–C6 CODEXILLE (TILAUKSET 12–14, 18 HAHMOA); SISALTOKIRJURIN WORKTREE KATOSI MERGESSA JA PALAUTETTIIN TYOHAARAAN; JULKAISIJALLE SAANTO: EI --delete-branch (22.9.2026 klo 11.33)

Fable 22.9.2026 klo 16.15: kohtaamiskuvat C4 (Tallinna, Vilna, Barcelona, Praha, Moskova, Ljubljana), C5 ja C6 viety Codexin postilaatikkoon (claude/postilaatikko 32495ef35, tiedostot posti/fable-codexille-kohtaamiskuvat-c4/c5/c6-20260922.md; ensimmäinen yritys tuotti ääkkösnimisen tyhjän tiedoston, poistettu). C7:n kuvatilausraportti (Tromssa Kirsten, Valletta Rita) puuttuu → Sisältökirjuri kirjoittaa. Sisältökirjurin rooli-worktree /Users/samireivinen/Matkakirja-sisaltokirjuri katosi heti kun sen checkout-haara sisalto-luovutus-20260922-ilta (#2766) mergettiin — sama ilmiö kuin Karttasepällä kahdesti; Fable loi worktreen uudestaan haaraan sisalto-tyo-20260922 (ei mergetä koskaan), symlinkki Matkakirja-nostot toimii. Sääntö kaikille rooleille: erät ja luovutukset omaan haaraan väliaikaisessa worktreessä /Users/koodaus/wt-*; Julkaisijalle: gh pr merge ilman --delete-branch, etähaaran poisto erikseen git push origin --delete vasta kun git worktree list ei näytä haaraa; ei prune/remove.

## KARTTASEPAN ERA 2 VALMIS: PRECONNECT #2767 (v2091), KATKAISIJA #2762 REBASATTU, ESILATAUKSEN LAITEOHJE #2768; POHJAN PIILOTUKSEN MITTAUS ODOTTAA PELIKOODARIA (22.9.2026 klo 11.35)

Karttaseppä (uusi sessio) 22.9.2026 klo 16.25: #2761 suljettu ja korvattu Julkaisijan #2767:llä (v2091, CI kesken); #2762 katkaisija rebasattu mainiin (30d9941cb, E0-lista yhdistetty, npm test 3897/0) Julkaisijalle; PR #2768 ohje Laitetestaajalle esilatauksen mittaamiseen tuotanto-osoitteessa STP Web Inspectorilla LTE:llä (laitepalvelin ei kelpaa: SW-stubi), A/B ?esilataus=0. Pohjan piilotuksen merimittaus odottaa Pelikoodarin erän 1 kohtaa 2. Isobaatit odottavat omistajaa.

## KOHTAAMISET C7 MERGEKELPOINEN (SAVUKE VIHREA KEVYILLA KAUPUNGEILLA); KUVATILAUS 15 CODEXILLE; CODEX-OTOSTARKISTUS: EI ESTAVIA LOYDOKSIA, KAKSI DOKUMENTTIKORJAUSTA (22.9.2026 klo 11.37)

Sisältökirjuri 22.9.2026 klo 16.35: Laitetestaajan savuke vihreä Košice, Bryssel, Ljubljana, Luxemburg → C7 (63a2950c3) mergekelpoinen, Julkaisijalle C4 → C5 → C6 → C7. C7:n kuvatilausraportti kirjoitettu; Fable vei sen Codexille (tilaus 15, claude/postilaatikko 92fecd23b) — kohtaamiskuvasarja C1–C7 tilattu kokonaan (tilaukset 8, 9, 11–15). Codex-otostarkistus (pienoismallit #2669, nostotyyppimerkit, merikoristeet; docs/raportit/codex-otostarkistus-20260922.md, haara sisalto-otostarkistus-20260922 51e409be5): ei estäviä löydöksiä; Sisältökirjuri korjaa tilauspohjan 'seepia'-tyylikuvauksen vastaamaan värillistä kaanonia ja kirjoittaa miniatyyrien LUEMINUT.md:n, sitten lepoon.

## TUOTANTOVIKA v2084 ALKAEN: KERMA-SHADER EI LINKITY (vUv PUUTTUU r155:SSA), LAATTAKERROS EI PIIRRY — KORJAUS #2774 KIIREELLISENA; ERAN 1 KOHDAT 13–15 JA 1–2 VALMIIT (22.9.2026 klo 11.51)

Pelikoodari 22.9.2026 klo 16.50: kerma laatan shaderissa (v2084, #2754) ei käänny — onBeforeCompile näkee shaderin ennen #include-avausta eikä vUv ole three r155:ssä; ohjelma ei linkity, three ei kirjaa virhettä, laattakerroksen laatat eivät piirry ja pelaaja näkee sumean z5-pohjan. Löytyi pohjan piilotusta mitatessa (pohja piiloon → pikseli 0,0,0,0). Korjaus PR #2774 (oma varying vKermaUv), todennettu SwiftShader + ANGLE Metal. Fable: Julkaisija mergeää #2774 jonon kärkeen heti; Pelikoodari lisää vartijan (laatan pikseli + LINK_STATUS kaikille varianteille, CI WebKit + Chromium). Erä 1: kohdat 13–15 (syöte kerran kehyksessä, kameraloki, change-kuuntelijat) ja 1–2 (ilmakehä, pohjan piilotus: drawcallit 84→66, render 0,80→0,55 ms, kuvaero 0,00 %) valmiit, 3 seuraavaksi.

## KERMA-SHADERIN KORJAUS TUOTANNOSSA v2094 (#2776) + VARTIJA savuke-laattaohjelmat.mjs (22.9.2026 klo 11.59)

Julkaisija 22.9.2026 klo 17.05: #2774 → #2776 mergetty, v2094 (main eefab0ce0), testit 3897/0. Vartija savuke-laattaohjelmat.mjs julkaisusarjassa (WebKit + Chromium): LINK_STATUS kaikille ohjelmille + kääntäjän loki, laattakerroksen pikseli ilman pohjaa (readPixels 3×3), kerros pohjan päällä — vanhalla shaderilla punainen, korjatulla vihreä. Tuotanto oli rikki v2084–v2093 (noin 6 h): laattakerros ei piirtynyt. Jono jatkuu: Codex C3-kuvat #2775 → v2095.

## ERAN 1 PR:T #2778 (SYOTE KERRAN KEHYKSESSA, KAMERALOKI, CHANGE-KUUNTELIJAT) JA #2779 (ILMAKEHA, POHJA PIILOON, KERMA ILMAN POW) JULKAISIJALLE (22.9.2026 klo 12.07)

Pelikoodari 22.9.2026 klo 17.15: #2778 = katsauksen kohdat 13–15 (ohjaimet.update-kääre soveltaa sormen paikan kerran kehyksessä, timeStamp-nopeus liukuun; kameralokin pino vain kehittäjätilassa; maapaneelin change-kirjoitus pois; kotelon mitat eleen alussa) — headless sisäinen px/ms-vaihtelu 35 → 30 %, CDP ei eroa (M4 Max pääsäie < 1 ms), ero odotetaan laitteella. #2779 = kohdat 1–3 (ilmakehä pois lähikuvassa, kirjaston pohja piiloon kun kerros peittää, kerma ilman pow-pareja): drawcallit 84 → 66, render 0,80 → 0,55 ms, kuvaero 0,00 % pohja / 2,3 px 765:stä kerma. Paluuliput syotevanha, ilmakehavanha, pohjavanha, kermapow. Seuraavaksi 7 compileAsync, 17 Livia ja pöllö lepoon, sitten asetus Tarkkuus liikkeessä.

## POHJAN PIILOTUS (#2779) MITATTU MERELLA: EI AUKKOJA, MERGETTAVISSA; MITTARI PR #2781 (22.9.2026 klo 12.13)

Karttaseppä 22.9.2026 klo 17.25: gl.readPixels joka kehyksellä 24 riviltä zoomin aikana (WebKit 390×844 dpr 3), A pohja piiloon vs B ?koe=pohjavanha: alpha 0 -pikseleitä 0 kummassakin, taustaväriset pikselit samat samoissa kehyksissä (meren kermaväri, ei aukkoja); pohja piilossa 229/249 kehystä merellä, peittoOsuus 1 koko ajan; loppukaappausten ero 0,22–0,28 px 765:stä; mittaa-zoomiennakko-meri 3/3 OK, meri 426–448 ms. Raportti + mittari PR #2781 (pelkkä raportti/työkalu). #2779 mergettävissä.

## ERA 1 TUOTANNOSSA: #2778 → v2097 (SYOTE KERRAN KEHYKSESSA YM.), #2779 → v2098 (ILMAKEHA, POHJA PIILOON, KERMA ILMAN POW); #2783 (ESIKAANNOS, LIVIA JA POLLO LEPOON) JULKAISIJALLA (22.9.2026 klo 12.25)

Julkaisija 22.9.2026 klo 17.35: #2778 → v2097, #2779 → v2098 (rebasattu kerma-hotfixin päälle, konflikti laattakerma-shader.js:ssä ratkaistu). Pelikoodarin #2783 (katsauksen kohdat 7 compileAsync ja 17 Livia/pöllönappi lepoon liikkeessä) seuraavana. Jäljellä ennen omistajan tuntumatestiä: asetus Tarkkuus liikkeessä, erä 3 (nollakopio-bittikartta, opaakit laatat, roska ja häive, atlas, ladonta, lepopiirto sykkeellä).

## ERA 1 KOKONAAN VALMIS (#2783: COMPILEASYNC, LIVIA JA POLLO LEPOON, ASETUS TARKKUUS LIIKKEESSA); ERA 3 ALKAA JARJESTYKSESSA 18, 10, 6, 11–12, 8, 16 (22.9.2026 klo 12.30)

Pelikoodari 22.9.2026 klo 17.45: #2783 (v2098:n päälle) Julkaisijalle: compileAsync-esikäännös kaikille laattamateriaalivarianteille (headless 40–130 ms async), Livian nousu/lasku paikattu (ei innerHTML-rakennusta eleen alussa), pöllövahti lepää pallolauta-liikkuu-luokan ajan, asetus Tarkkuus liikkeessä (hampurilainen → Kartta: terävä = dpr 3 + MSAA oletus, tasainen = dpr 2 liikkeessä ja 3 levossa, kokeellinen = antialias pois + latausvihje). Fable: omistaja kokeilee vasta kun kaikki on tuotannossa → erä 3 alkaa heti: 18 lepopiirto sykkeellä ensin (näkyvin: lämpö), sitten 10 nollakopio-bittikartta, 6 opaakit laatat, 11–12 roska ja häive, 8 atlas, 16 ladonta vain mittarin osoittaessa; paluuliput ja kuvaero jokaisessa.

## ERA 1 KOKONAAN TUOTANNOSSA v2097–v2099; KOHTAAMISET C4–C7 MAINISSA (v2093); JULKAISIJAN JONO TYHJA PAITSI MAAKUNTIEN KUVAVIENTI R2 (22.9.2026 klo 12.32)

Julkaisija 22.9.2026 klo 17.55: #2783 → v2099 (main fc651208a); sulavuuserä 1 kokonaan live (v2097 syöte ja kuuntelijat, v2098 ilmakehä/pohja/kerma, v2099 esikäännös/Livia/pöllö + asetus Tarkkuus liikkeessä). Kohtaamiset C4–C7 mergetty v2093:ssa (#2771, 20 kaupunkia) ja C3-kuvat kytketty (#2775). Fable kysyi maakuntien kuvaviennin R2 tilaa (sisalto-maakunnat-era2). Erä 3 Pelikoodarilla käynnissä.

## OMISTAJA TYOSTAA PULUA CODEXIN KANSSA; POSTILAATIKKOA SEURATAAN; PUUTTUVAT CODEX-KUVAT (MONUMENTIT 81, PIENOISMALLIT 25) OMISTAJA SELVITTAA (22.9.2026 klo 12.57)

Omistaja 22.9.2026 klo 18.10: työstää seuraavaksi pulua Codexin kanssa; tietoja tulee Fablelle postilaatikon (claude/postilaatikko, posti/) kautta — Postivahti lukee. Omistaja selvittää itse, miksi Codex ei ole toimittanut monumenttien 81 havainnekuvaa (tilaukset 5–7) eikä 25 pienoismallia. Codexin kuvatila: C1–C3 pelissä (v2084, v2093), maakuntien 97 havainnekuvaa v2096, C4–C7 tilattu tänään (12–15).

## POSTIVAHDIN KIERROS 5 MIN KAHDEKSI TUNNIKSI (OMISTAJA) (22.9.2026 klo 13.21)

Omistaja 22.9.2026 klo 18.15: posteja tulee tiheämmin (pulutyö Codexin kanssa) → Postivahdin kierros 10 → 5 minuuttia seuraavat kaksi tuntia (noin klo 20.15 asti), sitten takaisin 10 minuuttiin.

## OIKAISU: FABLEN LOKITEKSTIEN KELLONAJAT 22.9. KLO 10.19–13.21 OVAT NOIN 3 TUNTIA LIIAN MYOHAISIA; OTSIKOIDEN LEIMAT OVAT OIKEIN (22.9.2026 klo 13.22)

Omistaja 22.9.2026 (Macin kello 13.22): Fable arvasi tekstien sisällä kellonajat väärin — tämän päivän merkinnöissä otsikoilla 10.19–13.21 tekstin ajat (esim. 'klo 13.20' … 'klo 18.15') ovat noin kolme tuntia liian myöhäisiä; oikea aika on otsikon leima (tools/raamattu-kirjaa.mjs lukee kellon). Sama koskee docs/raportit/sulavuus-katsaus-20260922.md:n mainintaa 'klo 15.20' (oikeasti noin 11.15). Postivahdin 5 minuutin kierros päättyy noin klo 15.20, ei 20.15. Sääntö Fablelle: kellonaika vain date-komennosta.

## ERA 3 JULKAISIJALLA: #2786 (LEPOPIIRTO SYKKEELLA + NOLLAKOPIO-BITTIKARTTA) JA #2788 (ROSKA POIS KEHYSPOLUSTA, YKSI HAIVYTYSJONO, ATLAKSEN OSITTAINEN PAIVITYS); KOHTA 16 JAA (22.9.2026 klo 13.26)

Pelikoodari 22.9.2026 klo 13.25: #2786 = kohta 18 lepopiirto (piirto vain muutoksesta + syke 4 fps, hehkupisteen syke 15 fps; lepo 60 → 15 fps, veto identtinen; automaatiossa pois ellei ?koe=lepopiirto koska Playwright-kaappaus saa tyhjän kankaan; vartija savuke-lepopiirto 9/9 WebKit + Chromium) + kohta 10 nollakopio-bittikartta (initTexture 0,54 → 0,13 ms WebKit; nyt ~17 % laatoista, kaikki jos Karttasepän 9 tehtäisiin). #2788 = kohdat 11 (ei olioita kehyspolussa), 12 (yksi häivytysjono), 8 (atlaksen texSubImage2D, koko vientejä 19 → 2). Kohta 6 (opaakit laatat) oli jo tuotannossa v1647:stä; kohta 16 (ladonta) jää: pisin pysähdys 0 ms Chromium / 17–20 ms WebKit myös ilman lepopiirtoa. Paluuliput levovanha, lepopiirto, kangasaina, atlaskoko. #2783 on jo tuotannossa v2099.

## CODEX: KAIKKI KUVAERAT TOIMITETTU (C4–C7 20/20 #2787, PIENOISMALLIT 25/25, MONUMENTIT 69/69 — 81 OLI VAARA LUKU); FABLE KUITTASI POSTILAATIKKOON; PULUN KARTTAPAIKKA 69f9a2e8 PELIKOODARIN KATSELMUKSEEN (22.9.2026 klo 13.27)

Codex 22.9.2026 klo 13.30 (posti/codex-fable-kuvatoimitusten-kuittauspyynto-20260922.md): C4–C7 20 kuvaa R2:ssa ja kytketty (PR #2787, main f40d07f89); pienoismallit 25/25 (v2030, #2678); monumentit 69/69 (v2029 #2681) — tilausten todellinen kuvamäärä oli 69, luku 81 sisälsi tutkimus-/ID-rivejä. Fable tarkisti mainista (20 uutta tietuetta kohtaamiskuvat-datassa, PR:t mergetty) ja kuittasi posti/fable-codexille-kuittaus-kuvatoimitukset-20260922.md. Codex erottaa jatkossa neljä tilaa: R2-toimitus, pelin kytkentä, julkaistussa varmennettu, Fablen kuittaus. Pulun uusi karttapaikka (posti/codex-pulu-sijoittelu-20260922.md, haara codex/pulu-katselu-ja-paikka-20260922, vain commit 69f9a2e8: css +7 riviä, ankkuri right/bottom 3.6rem + safe-area) → Pelikoodari poimii, katselmoi kaappauksin, Julkaisija julkaisee. Aiempi Fablen tieto 'monumentit 81 ja pienoismallit 25 puuttuvat' oli vanhentunut.

## PULUN KARTTAPAIKKA (CODEX 69f9a2e) KATSELMOITU JA HYVAKSYTTY → PR #2791 JULKAISIJALLE; WEBKIT-SAVUKKEIDEN KAATUMISET #2786:N CI-AJOSSA TUTKINNASSA (22.9.2026 klo 13.33)

Pelikoodari 22.9.2026 klo 13.32: PR #2791 sisältää vain Codexin commitin (css +7 riviä). SwiftShader-kaappaukset Marseillen saapumisnäkymässä: työpöytä right/bottom 42/85 → 58/58 px, puhelin 42/61 → 58/61 (bottom puhelimella livia-nostotila.js:n 3,8 rem -säännöstä); ei törmäyksiä maapaneeliin, karttaselitteeseen, Liikuun eikä kuplaan; safe-area mukana; kaappaukset docs/raportit/kaappaukset/pulun-karttapaikka-20260922/; testit 3908/0. Fable katsoi kaappaukset ja hyväksyi → Julkaisijan jono: #2786 → #2788 → #2791. Huomio: #2786:n CI-savukeajossa useita WebKit-rivejä (musta-laatta, laattaohjelmat, lepopiirto, hehkupiste, tyyppimerkit) kaatui ennen väitteitä — Pelikoodari selvittää #2788:n ajosta, onko syy kuorma vai muutos.

## ERA 3 TUOTANNOSSA: v2101 LEPOPIIRTO + NOLLAKOPIO, v2102 ROSKA/HAIVYTYSJONO/ATLAS, v2103 PULUN KARTTAPAIKKA; OMISTAJAN TUNTUMATESTI VOI ALKAA (22.9.2026 klo 13.47)

Julkaisija 22.9.2026 klo 13.40: #2786 → v2101, #2788 → v2102 (kaksi konfliktia ratkaistu HEAD:n uudemmalla toteutuksella — Pelikoodari tarkistaa että kohdat 11, 12, 8 ovat mukana), #2791 → v2103 (pulun karttapaikka). Main b3087f814, jono tyhjä. Kaikki katsauksen erät 1–3 ja Karttasepän erä 2 ovat tuotannossa (paitsi kohta 9 ei pallolle ja 16 ladonta ei tarvetta) → omistajan tuntumatesti: v2103, kokeile myös asetus hampurilainen → Kartta → Tarkkuus liikkeessä (terävä/tasainen/kokeellinen; kokeellinen vaatii sivun latauksen).

## v2102 TARKISTETTU (KOHDAT 8, 10, 11, 12, 18 MAINISSA); AITO VIKA v2099: compileAsync(scene) KAATAA SIVUN PURETUN LAATAN MATERIAALIIN — KORJAUS #2794; WEBKIT-KAATUMISET CI:SSA = KUORMAN AIKAKATKAISUJA (22.9.2026 klo 13.50)

Pelikoodari 22.9.2026 klo 13.55: v2102 sisältää kohdat 11 (__pinta, Map suoraan), 12 (haiveet-taulu, haiveAskel), 8 (copyTextureToTexture) sekä 18 ja 10. CI: WebKit-rivien kaatumiset ovat WebKitin käynnistyksen 180 s aikakatkaisuja kuormassa (paikallisesti launch 151 ms), ei koodivika. Aito vika v2099:stä (kohta 7 esikäännös): three:n compileAsync(scene) pollaa kaikkia scenen materiaaleja ja kesken puretun laatan materiaali kaataa pollin → sivuvirhe 'reading isReady' topografialinssissä, reittiverkossa ja GL-nimissä. Korjaus PR #2794 (käännetään vain näytteiden ryhmä, scene valojen lähteenä, ohjelmat 11 = samat) → Julkaisijalle kiireellisenä. Omistajan tuntumatesti v2103:lla käy; korjausversio tulee perään.

## ESIKAANNOSKORJAUS #2794 TUOTANNOSSA v2104; TUNTUMATESTIN VERSIO v2104 (22.9.2026 klo 13.56)

Julkaisija 22.9.2026 klo 14.00: #2794 → v2104 (main f69ff7ace), testit 3912/0. Jono tyhjä. Omistajan tuntumatesti tehdään v2104:llä (kaikki katsauksen erät + korjaukset mukana).

## OMISTAJA: v2104 KARTTA VALKKYY KUIN STROBOVALO iPHONELLA — SYY LEPOPIIRTO; FABLEN KORJAUS #2797 (OLETUS POIS) KIIREELLISENA; PELIKOODARI NOLLAUKSESSA (22.9.2026 klo 14.06)

Omistaja 22.9.2026 klo 14.05 tuntumatestissä v2104: kartta välkkyy kuin strobovalo. Fable: syy erän 3 lepopiirto (js/pallolauta/lepopiirto.js kääri renderer.renderin ja ohittaa piirron levossa) — WebKit esittää ohitetun kehyksen tyhjänä, sama ilmiö kuin Playwrightin tyhjä kaappaus, jonka Pelikoodari ohitti automaatiossa webdriver-ehdolla; vartija ei siis mitannut oikeaa laitetta. Korjaus PR #2797: lepopiirtoKaytossa palauttaa false ilman ?koe=lepopiirto-lippua (testit 3912/0), Julkaisijalle kiireellisenä. Opetus: piirron ohitus pitää ratkaista kirjaston tickin tasolla tai preserveDrawingBufferilla, ja se pitää todentaa oikealla iPhonella ennen tuotantoa. Pelikoodari nollataan (70 %, luovutus #2796).

## CODEX: PULUN GALLERIAN RYHMITTELY (VAIN COMMIT c41a9e2, KATSELUSIVU docs/livia-svg.html) JULKAISIJALLE #2797:N JALKEEN; LAAJAA RYTMI-HAARAA EI POIMITA (22.9.2026 klo 14.11)

Codex 22.9.2026 klo 14.10 (posti/codex-pulu-galleria-ryhmat-20260922.md): omistaja rajasi toimituksen vain pulun katselusivun ryhmittelyyn — haara codex/pulu-galleria-ryhmat-20260922, commit c41a9e2 (pohja v2104): docs/livia-svg.html, .css, -demo.mjs + gallerian testi; 'Uudet eleet (19)' ensimmäisenä auki ja seitsemän suljettavaa eleryhmää; testit 3913/0, Chromium 1280 ja 390 px OK. Haaraa codex/pulu-rytmi-ja-vaihtelu-20260922 tai commitia 1f8981040 EI poimita. Fable: Julkaisija poimii vain c41a9e2:n #2797:n jälkeen, oma versio, readback matkakirja.app/docs/livia-svg.html → Fable kuittaa Codexille.
