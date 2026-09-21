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
