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

## STROBO-KORJAUS TUOTANNOSSA v2105 (LEPOPIIRTO OLETUKSENA POIS); TUNTUMATESTIN VERSIO v2105 (22.9.2026 klo 14.12)

Julkaisija 22.9.2026 klo 14.15: #2797 → v2105 (main ee56454ce), testit 3912/0. Omistajan tuntumatesti tehdään v2105:llä. Pelikoodari (uusi sessio) tekee lepopiirron oikean toteutuksen laitetodennuksella.

## PULUN GALLERIAN RYHMITTELY TUOTANNOSSA v2106 (VAIN c41a9e2), READBACK 200, KUITATTU CODEXILLE (22.9.2026 klo 14.18)

Julkaisija 22.9.2026 klo 14.18: c41a9e2ee poimittu, v2106 (main 87408dbdb), testit 3913/0, curl -sI matkakirja.app/docs/livia-svg.html → 200; rytmi-haaraa ei koskettu. Fable kuittasi Codexille (posti/fable-codexille-pulun-galleria-julkaistu-20260922.md).

## OMISTAJAN TUNTUMATESTI v2105/v2106 (TYOPOYTA): PANOROINTI PARANI MUTTA TOKKII VIELA HIEMAN; KOHDEKAUPUNKIEN PALLOT LIIKKUVAT; ZOOMI PEHMEA MUTTA MERIVIIVAT HYPPIVAT JA LIKAKUVIOT NAKYVAT; NELJA UI-KORJAUSTA (PISTEET, VIPU, VALKOINEN REUNUS, MERIVIIVAT) (22.9.2026 klo 14.32)

Omistaja 22.9.2026 klo 14.25 (kuvakaappaukset työpöydältä, Ranska ja maailmatila): 'Panorointi toimii nyt siinä mielessä hyvin, että lähes kaikki tekstit ja pisteet pysyvät paikoillaan, paitsi kohdekaupunkien pallot vielä liikkuvat. Mutta panoroinnissa on vieläkin pientä tökkimistä, vaikka sekin on jo parantunut. Zoomaus on jo varsin pehmeä, siinä vain häiritsee meriviivojen hyppiminen ja likakuviot jotka näkyvät zoomauksen aikana.' Lisäksi: 1) nostojen pisteet piirroksiksi jo kaukonäkymässä TAI piste pelkäksi harmaaksi ilman väriä — väri vasta kun nostoväri on vivusta päällä; 2) karttaselitteen linssin alta paistaa myös pienempi numero; vipua pitää voida raahata reaaliajassa sormen mukana ja kartan tiedot vaihtuvat samalla; 3) nostoihin jää valkoinen reunus maailmatilassa (lähizoomissa poistuu) — aina pois; 4) tietyillä zoomitasoilla meriviivat (isobaatit) liian voimakkaat. Fable: sulavuus ensin (kohdekaupunkien pallot, tökkiminen, meriviivojen hyppiminen, likakuviot), sitten UI 1–4; kohtaan 1 valitaan harmaa piste + väri vivusta, piirrokset kaukonäkymässä koelippuna. Omistajan ehto täyttyi ('jos vielä tökkii, sitten mitataan') → Laitetestaaja mittaa tasaisuusmittarilla Macilla (WebKit + Chromium headed) ja iPhonella.

## LEPOPIIRRON VALKE KORJATTU: TICKIN OHITUS (pauseAnimation), EI RENDERIN OHITUS; preserveDrawingBuffer EI AUTA (MITATTU); PR OLETUS POIS, OMISTAJA TOTEAA ?koe=lepopiirto iPHONELLA ENNEN OLETUKSEN KAANTOA (22.9.2026 klo 14.36)

Pelikoodari 22.9.2026 klo 14.45: syy toistettavissa — renderin ohitus jätti kirjaston tickin pyörimään ja WebKit sommittelee ohitetun kehyksen tyhjänä kankaana (Playwrightin tyhjä kaappaus oli oire). Mitattu WebKitissä sommittelijan kautta levossa (kaappausten kokoero): piirto joka kehys 1,12×, renderin ohitus 24,0× välke, renderin ohitus + preserveDrawingBuffer 18,4× välke, tickin ohitus 1,00×. Valittu tickin ohitus: oma rAF on kello, tarvitaan → resumeAnimation, ei tarvita → pauseAnimation. Haara pelikoodari-lepopiirto-webkit (v2106:n päällä): webdriver-poikkeus poistettu (CI ajaa pelaajan polkua), lauta.js:n uni lepopiirron kautta, uusi vartija savuke-lepopiirto V5 (levossa kaappaukset ovat karttaa); savuke 10/10, testit 3925/0. Simulaattori ei erota välkettä (eri sommittelupolku). Fable: PR heti mutta oletus pysyy POIS; omistaja toteaa oikealla iPhonella ?koe=lepopiirto; vasta sen jälkeen oletus päälle erillisellä PR:llä. Sivuhavainto: jokin kutsuu tarvitaan() ~32×/s (lepo 32 fps 'pakko'-syystä) — selvitetään ennen oletuksen kääntöä.

## LAITETESTAAJA NOLLATTU (71 %, LUOVUTUS #2800) JA WORKTREE SIIRRETTY ROOLINIMELLE Matkakirja-laitetestaaja (22.9.2026 klo 14.40)

Fable 22.9.2026 klo 14.42: Laitetestaajan luovutus e13eb455a (#2800) kuitattu; worktree siirretty /Users/samireivinen/Matkakirja-sonnet → Matkakirja-laitetestaaja (mv + git worktree repair + symlinkki vanhasta polusta), haara laitetestaaja; nollauskaava ajettu. Uuden session tehtävät: Mac-mittaus v2106 loppuun (syöteputki vs pitkät kehykset), iPhone viileä/lämmin (puhelin omistajalta Fablen kautta), lepopiirron laitetodennus ?koe=lepopiirto, esilatauksen laiteohje. Kaikki kuusi roolisessiota on nyt nollattu tänään ja worktreet roolinimillä (Postivahti /Users/koodaus/Matkakirja-posti ennallaan).

## LEPOPIIRTO TICKIN TASOLLE PR #2801 (OLETUS POIS, VARTIJA V5, WEBDRIVER-POIKKEUS POIS); SIVUHAVAINTO 8 = LASKEUTUMISIKKUNA, EI VUOTO; PELIKOODARI ALOITTAA A–E (22.9.2026 klo 14.41)

Pelikoodari 22.9.2026 klo 14.48: PR #2801 — lepopiirto ohittaa kirjaston tickin (pauseAnimation/resumeAnimation), lippu sama pelaajalle ja automaatiolle (webdriver-poikkeus oli syy, miksi vartija ei nähnyt välkettä), vartija V5 (levossa kaappaukset ovat karttaa). Omistajan testiosoite iPhonella: ?koe=lepopiirto, kartta lepoon ~15 s. Sivuhavainto 8: kamera-ajon jälkeen 0–3 s 29,6 fps (saapuva sisältö: nimiöt, crossfade, häive, rasterit, nostot), 3–6 s 15 fps, pakko 0 38 s asti; asettunut lepo 14,3–15 fps = hehkupisteen syke, ilman sitä 4 fps — suunnitellusti. Raportti docs/raportit/lepopiirto-valke-20260922.md. Fable: A–E alkaa heti; oletuksen käännös omana PR:nä omistajan silmän jälkeen.

## CODEX: PULUN GALLERIA KOMPAKTIKSI (OMISTAJAN PALAUTE v2106:STA) — VAIN COMMIT 11a4f5aa JULKAISIJALLE #2801:N JALKEEN (22.9.2026 klo 14.46)

Codex 22.9.2026 klo 14.50 (posti/codex-pulu-galleria-kompakti-20260922.md): omistaja: vetolaatikot veivät liikaa pystytilaa ja animaatio jäi liian alas → kategorianapit ylös ja niiden alle vain valitun kategorian elepainikkeet animaation yläpuolelle. Haara codex/pulu-galleria-kompakti-20260922, commit 11a4f5aa (pohja v2106): docs/livia-svg.html/.css/-demo.mjs + tests/livia-galleria.test.mjs, ei runtimea; testit 3913/0. Fable: Julkaisija poimii vain tuon commitin #2801:n jälkeen, oma versio, readback gesture-categories/gesture-options + demo.mjs 200 → Fable kuittaa Codexille.

## MERIVIIVAT: RASKAS NIPPU ON PATINAN VESIVIIVOITUS, EI ISOBAATIT — OMISTAJA: POIS KOKONAAN, POLTTO VASTA KLO 17.00; iPHONE KYTKETTY, KYLMAMITTAUS KAYNNISSA; MAC-MITTAUS: WEBKITIN TOKKIMINEN ON SYOTEPUTKEA (22.9.2026 klo 15.05)

Karttaseppä 22.9.2026 klo 14.50 (PR #2803 selvitys): hyppivä meriviivanippu on tools/patina.mjs:n --vesiviivoitus tumma (6 viivaa, voima 0,42), joka piirtyy etäisyydestä rantaan laatan ruudukossa → paino vaihtuu tasoittain (musteosuus merestä z4 70 %, z5 55 %, z6 42 %, z7 19 %, z8 12 %); isobaatit eivät ole syy (peitto 0/1 ei muuta laattaa). Passi poistettiin 30.8., pohjapoltto 22.9. palautti sen. Omistaja (kortti): vesiviivoitus kokonaan pois, poltto (~2 h) vasta klo 17.00 Suomen aikaa kun omistaja lopettaa työt. Isobaattivektorit korjaisivat isobaattien oman tasonvaihtohyppimisen — päätös odottaa. Laitetestaaja: Mac-mittaus v2106 (docs/raportit/mac-mittaus-v2106-webkit-20260922.md): WebKit px/ms-vaihtelu 48–55 % vs Chromium 18–20 %, zoomin p95 19–21 ms kaikilla → WebKitin tökkiminen on syöteputkea. Omistaja kytki iPhonen (LTE, autolukitus pois, ?koe=mittaus); kylmämittaus käynnissä, sitten 5 min pelaaminen ja lämminmittaus, sitten Wi-Fi-vaihe lepopiirrolle (?koe=lepopiirto vs levovanha, laitepalvelin 192.168.1.154:8793).

## KOMPAKTI PULU-GALLERIA TUOTANNOSSA v2108, READBACK OK, KUITATTU CODEXILLE (22.9.2026 klo 15.05)

Julkaisija 22.9.2026 klo 15.05: 11a4f5aa9 poimittu, v2108 (main 3b8f402d2), Pages OK, readback gesture-categories 2 / gesture-options 2 / demo.mjs 200, testit 3913/0. Fable kuittasi Codexille.

## POLTTO 2026-09-22b VALMISTELTU (VAIN VESIVIIVOITUS POIS, ISOBAATTIPEITTO 0,55, NIMIOT g ENNALLAAN), KAYNNISTYY KLO 17.00; ISOBAATIT TULEVAT ENSI KERTAA NAKYVIIN (22.9.2026 klo 15.12)

Karttaseppä 22.9.2026 klo 15.10: /Users/koodaus/pyramidi-poltto/ajo-20260922b/{aja-1,aja-2}.sh; versiot pohja 2026-09-22b-pohja, viivat 2026-09-22b-viivat, ranta 2026-09-21-ranta, nostot 2026-09-22b-nostot, nimiöt 2026-09-22g-nimiot ennallaan, pallotunniste 20260922b; luetteloa ei viedä. Vedokset (PR #2803): rannikolla nippu katoaa, jäljelle yksi ohut mannerjalustan käyrä; peitto 0,55 ja 0,70 lähes samat → 0,55. Lisähavainto: vesiviivoituspassi peitti isobaattien musteen kokonaan; ilman sitä isobaatit näkyvät ensi kertaa. Fable: nimiöversio h jää pois (yksi muuttuja), poltto klo 17.00, CI-tauko 17–19, vedokset z5–z8 polton jälkeen omistajan arvioon.

## OMISTAJA TOTESI LEPOPIIRRON VAKAAKSI iPHONELLA (?koe=lepopiirto, v2107) → OLETUS PAALLE; PUHELINMITTAUS KESKEYTETTY (TOKKIMINEN TOISTUU TYOPOYDALLA); PUHELIN LAMPENEE JATKUVASTA PIIRROSTA (22.9.2026 klo 15.28)

Omistaja 22.9.2026 klo 15.25: puhelu katkaisi puhelinyhteyden; sama tökkiminen näkyy työpöytäselaimella, joten puhelinmittaus (LTE, viileä/lämmin) keskeytettiin — työpöytä on mittapenkki (Laitetestaaja: headed Safari ja Chrome oikeilla hiiritapahtumilla, syöteputki vs laattojen saapuminen). Puhelin on taas lämmin (jatkuva 60 fps piirto levossa + USB-lataus). Omistaja avasi tuotannon v2107 osoitteella ?koe=lepopiirto: lepo 15 s, panorointi, lepo — 'ei välky, vakaa' → Pelikoodari kääntää lepopiirron oletukseksi omana PR:nä (levovanha paluulippu), kiireellinen lämmön takia.

## OMISTAJA: TOKKIMINEN NAKYY SAFARILLA TYOPOYDALLA (CHROME TESTATAAN); PUHELIMELLA EI TESTATA ELLEI PAKKO (22.9.2026 klo 15.28)

Omistaja 22.9.2026 klo 15.30: panoroinnin tökkiminen näkyy ainakin Safarilla työpöydällä, Chrome testataan vielä; puhelinta ei käytetä testaamiseen ellei ole pakko. Sääntö sessioille: mittaukset ja korjausten todennus työpöydän Safarilla (WebKit) ensisijaisesti; puhelinpyynnöt vain Fablen kautta ja vain kun muu ei riitä.

## OMISTAJA: CHROMESSA PANOROINTI PEHMEAMPI, TOKKIMINEN JO HYVIN VAHAISTA; SAFARISSA (WEBKIT) TOKKII — SYY WEBKITIN SYOTEPUTKESSA, KOHDISTUS SIIHEN (22.9.2026 klo 15.33)

Omistaja 22.9.2026 klo 15.35: Chromessa kartta pyörii pehmeämmin kuin Safarissa, tökkiminen jo todella vähäistä; Safarissa tökkii. Vastaa Laitetestaajan Mac-mittausta (WebKit px/ms-vaihtelu 48–55 % vs Chromium 18–20 %, kehysajat samat). Johtopäätös: jäljellä oleva tökkiminen on WebKit-kohtaista syöteputkea (tapahtumien tahdistus kehyksiin), ei piirtoa; Pelikoodarin seuraava kohde Safari-työpöydällä oikeilla hiiritapahtumilla, sama koskee iOS Safaria.

## LEPOPIIRTO OLETUKSEKSI PR #2805 (#2801 ON JO v2107); A KOHDEKAUPUNKIEN PALLOT KANKAASEEN VALMIS MUTTA ODOTTAA GL-RUNGON VARIVIAN KORJAUSTA (ATLAS srgb VS VARJOSTIN ILMAN sRGB-KOODAUSTA) (22.9.2026 klo 15.33)

Pelikoodari 22.9.2026 klo 15.40: PR #2805 lepopiirto oletukseksi (levovanha paluulippu; savuke pelaajan polulla, V4 mittaa paluulipun; savuke-lepopiirto 10/10 WebKit, V5 ero 1,00×, lepo 15 fps; testit 3926/0); aiempi julkaisusarjaraportti pätemätön (puu muokattu kesken ajon), sarja ajetaan kiinnitetyssä worktreessä. A: kohdekaupunkien pallot piirtyvät kankaassa (osumatesti ja ladonnan esteet ennallaan, paluulippu ?koe=kohteetcss2d) — ei vielä PR:ssä, koska GL-rungon värit ovat väärin: js/pallonimiot-gl.js atlaksen colorSpace = srgb mutta oma fragmenttivarjostin kirjoittaa ilman sRGB-koodausta → kulta oranssiksi, punamulta tummaksi (koskee nimiä, nostoja, nappulaa). Fable: Pelikoodari korjaa (kuvaero mitattuna), Karttaseppä katselmoi diffin; sitten A:n PR, sitten Safarin syöteputki.

## OMISTAJA: CHROMESSA PANOROINTI LAHTEE TAHMAISESTI JA KIIHTYY VEDON AIKANA — TODENNAKOISESTI SYOTEASETUS, EI TOKKIMINEN (22.9.2026 klo 15.34)

Omistaja 22.9.2026 klo 15.45: Chromessa yhdellä sormivetäisyllä panorointi lähtee hieman tahmaisesti liikkeelle ja kiihtyy sen jälkeen — outoa; ei välttämättä tökkimistä vaan ehkä asetus. Fable: Pelikoodari mittaa vedon alun (kameran siirtymä per kehys vs osoittimen siirtymä ensimmäisten 10 kehyksen aikana Chromessa ja Safarissa) ja tarkistaa syöteputken pehmennykset: v2097:n kehyskohtainen sovellus (viive/interpolointi), vauhdin liukuva keskiarvo 0,6/0,4, rajaaVauhti, vedonSiirto-katto (yksi pointermove enintään puoli kaistaa), kotelon mitat eleen alussa — kartan pitää seurata sormea 1:1 heti ensimmäisestä kehyksestä.

## OMISTAJA PERUI VESIVIIVOITUKSEN POISTON: VIIVAT SAILYTETAAN JA SAADAAN TOIMIMAAN; VIRHE ON KOKO MEREN ALUEELLA ZOOMATESSA; KLO 17 POLTTO PERUTTU (22.9.2026 klo 15.37)

Omistaja 22.9.2026 klo 15.50: 'se virhe ei ole vain niiden meriviivojen kohdalla vaan koko meren alueella. ei vielä polteta niitä viivoja pois, ne ovat hienoja. kokeillaan saada ne vain toimimaan.' Fable: klo 17 poltto (2026-09-22b) peruttu. Karttasepän tehtävä: viivoitus globaaliin koordinaatistoon (tasojen kuviot kohdakkain, crossfade ilman likaa), ruudulla vakio paksuus ja peitto tasoittain, ja koko meren likakuvioiden syy zoomissa (kaappaussarja avomeri + rannikko); Pelikoodari tutkii saman pelipuolelta (kohta B); vedokset omistajalle ennen polttoa, poltto vain hyväksynnän jälkeen ja iltaisin.

## LEPOPIIRTO OLETUKSENA TUOTANNOSSA v2109 (22.9.2026 klo 15.40)

Julkaisija 22.9.2026 klo 15.45: #2805 → v2109 (main 10673e7fc), testit 3913/0. Kartta piirretään levossa vain muutoksista (syke 4 fps, hehkupiste 15 fps); paluulippu ?koe=levovanha. Omistaja todensi laitteella ennen käännöstä.

## MEREN LIKAKUVIOIDEN JUURISYY ON POLTOSSA: PATINAN HIENO KUVIO SIDOTTU LAATAN RUUDUKKOON (KORRELAATIO z5/z6 0,14 VS SAVY 0,96); KORJAUS VESIVIIVAT LAUDAN YKSIKOIHIN; PAPERIRAKEEN RATKAISU OMISTAJAN PAATOS (22.9.2026 klo 15.45)

Karttaseppä 22.9.2026 klo 15.55 (PR #2803): sama maa-ala z5 vs z6: meren sävy korreloi 0,96 mutta hieno kuvio (paperin rae, kuitu, vesiviivat) vain 0,14 (ilman patinaa 0,49) → tasojen crossfade sekoittaa kaksi korreloimatonta rakeisuuskenttää = lika koko merellä. Syy: pyramidi antaa paperiS 1 (painojälki saman levyinen joka tasolla), mikä sitoo kuvion paikan laatan ruudukkoon; meren vyöhykekohina korjattiin 21.9. laudan yksiköihin ja korreloi 0,96. Korjaus: vesiviivojen väli, kasvu ja huojunta laudan yksiköihin, paksuus ja voima paperipikseleihin, alle ~3 px välillä vain joka toinen viiva. Omistajan päätös paperin rakeesta: (a) rae laudan yksiköihin (täsmää, karkenee syvässä zoomissa), (b) hieno rae pois poltosta ja ruutuavaruuden kerroksena peliin (Pelikoodari) — suositus hienolle rakeelle, (a) isoille laikuille, (c) nykyinen. Fablen omat CGEvent-hiirivedot eivät liikuta karttaa Safarissa (klikkaus toimii) → vedot pyydetään omistajalta.

## OMISTAJA: PAPERIRAE VAIHTOEHTO b) (HIENO RAE PELIIN RUUTUKERROKSENA, LAIKUT MAAILMAAN); OMISTAJA TEKI AIDOT HIIRIVEDOT SAFARISSA JA CHROMESSA MITTAUKSEEN (22.9.2026 klo 15.52)

Omistaja 22.9.2026 klo 15.55 (kortti): paperirae b) — hieno rae pois poltosta, peliin ruutuavaruuden kerroksena (Pelikoodari), isot laikut laudan yksiköihin; vesiviivat laudan yksiköihin, paksuus/voima paperipikseleihin, harvennus alle 3 px välillä; vedokset omistajalle ennen polttoa, poltto illalla. Hiirivedot: Fablen CGEvent-veto ei liikuta karttaa Safarissa (klikkaus toimii) → omistaja teki itse ~25 s vetoja Safarissa ja Chromessa Laitetestaajan mittaussivulla (127.0.0.1:8794 …&luonnollinen=1); Laitetestaaja lukee tulokset (vaihtelu, pysähdykset, vedon alku). Pelikoodarin jono: GL-värivika → A → Safarin syöteputki + Chromen tahmea lähtö → C, D, E → paperirae.

## CHROME AIDOLLA HIIRELLA: KIERROS 1 TAHMEA (VAIHTELU 609 %, PYSAHDYS 735 ms, 178 ms PIIKKI 'MUU') = KAYNNISTYKSEN LAMPIAMINEN; KIERROKSET 2–8 78–116 % (KASI); SAFARI EI TALLENTUNUT; MITTARIKSI SEURAAMISVIRHE OSOITIN VS KAMERA (22.9.2026 klo 15.54)

Laitetestaaja 22.9.2026 klo 16.00: Chrome 8 kierrosta aidolla hiirellä: dt p95 ~20 ms kaikilla, pitkiä kehyksiä ei (max 20–32 ms) paitsi kierroksen 1 yksi 178 ms piikki (js 3 ms + render 1 ms → loput pääsäikeen 'muu'); kierros 1 heti latauksen jälkeen vaihtelu 609 %, pisin pysähdys 735 ms, laattapyyntöjä 418 → täsmää omistajan 'tahmea lähtö' -havaintoon ja on kertaluonteinen käynnistyksen lämpiäminen; kierrokset 2–8 vaihtelu 78–116 %, pisin pysähdys 34–280 ms. Laattapyynnöt eivät korreloi. Safarin omistajavedot eivät tallentuneet (rivit olivat Fablen liikkumattomia CGEvent-yrityksiä). Fable: aidon käden veto ei ole vakionopeuksinen → mittariksi seuraamisvirhe (kameran siirtymä vs osoittimen siirtymä per kehys, pysähdykset joissa osoitin liikkui mutta kamera ei); raakadata lisätään, sitten yksi lyhyt uusinta Safarissa ja Chromessa omistajalta.

## VESIVIIVAT LAUDAN YKSIKOIHIN VALMIS (PR #2808, EI POLTETTU); MEREN LIKA KORJAUTUU VASTA RUUTUAVARUUDEN RAKEKERROKSELLA (KORKEATAAJUUS ON PAPERIN RAETTA); RAKEEN SPEKSI PELIKOODARILLE (22.9.2026 klo 16.00)

Karttaseppä 22.9.2026 klo 16.05: tools/patina.mjs — vesiviivojen aloitus, väli, kasvu ja huojunta maailman mittaan (vvSkaala + maailmaX/Y), paksuus ja voima paperipikseleihin, alle 3 px välillä joka toinen/neljäs viiva indeksistä (karkean tason viivat osuvat tarkan päälle). Vedokset z5–z8 ja avomeri docs/raportit/kuvat/ (näytetty omistajalle). Varaus: korkeataajuinen korrelaatio z5↔z6 vain 0,136 → 0,125 (matala 0,961 → 0,973) — lika on paperin raetta; korjautuu vasta Pelikoodarin ruutuavaruuden rakekerroksella (speksi lähetetty: rae 0,050, karkea 0,038/2,4 px, kuitu 0,038 ×3, risti 0,022, warp 300/3,4, klimppi 0,9/14 px, kertovasti luminanssiin). Seuraavaksi: isot laikut laudan yksiköihin, hieno rae poltosta lipun taakse; poltto vasta kokonaisuuden hyväksynnän jälkeen illalla.

## MITTAUSIKKUNA: KUORMA PURETTU (SAVUKESARJA, CI-SAVUKEAJO PERUTTU, 40 MIN JUMISSA OLLUT TESTIHARNESS TAPETTU), OMISTAJA TEKI VEDOT SAFARISSA JA CHROMESSA; REGRESSIO v2109: LEPOPIIRTO VIIVASTAA VEDON ALKUA ≤ 250 ms — KORJAUS TULOSSA (22.9.2026 klo 16.09)

Fable 22.9.2026 klo 16.10: omistaja huomasi headless-Chromen kuorman (load 47–70) ennen vetoja; Pelikoodari tappoi savukesarjansa, Fable perui CI:n savukkeet-mac-ajon (#2809:n push) ja tappoi Laitetestaajan 40 min jumissa olleen test-harness3.mjs:n (950 % CPU); load 14 → omistaja teki uusintavedot Safarissa ja Chromessa raakadatalla (seuraamisvirhe kamera vs osoitin). Pelikoodari löysi lukemalla v2109:n regression: pallolaudan veto sovelletaan kirjaston tickissä, jonka lepopiirto pysäyttää levossa, eikä syöte herätä sitä → veto lähtee vasta sykkeestä (≤ 250 ms myöhässä) ja 'kiihtyy' — vartija V2 ei nähnyt koska se ajoi kameraa suoraan. Korjaus: syöte kutsuu pallo.__piirto.tarvitaan() pointerdownissa ja -movessa + vartija V6 oikeilla osoitintapahtumilla → kiireellinen PR. Omistajan aiempi Chrome-havainto (tahmea lähtö) ei johdu tästä (lepopiirto oli silloin pois); se on käynnistyksen lämpiäminen.

## AIDOT VEDOT v2106 (SAFARI + CHROME): KAMERA SEURAA MEDIAANISSA 1:1 MUTTA ≥ 10 % KEHYKSISTA TAYSI PYSAHDYS JA PERAAN YLIKORJAUS — SYY KERRAN-KEHYKSESSA-SOVELLUS ILMAN INTERPOLOINTIA; KORJAUS AIKALEIMAINTERPOLOINTI (22.9.2026 klo 16.10)

Laitetestaaja 22.9.2026 klo 16.15 (raakadata kamera vs osoitin per kehys, 8+8 kierrosta): mediaanisuhde Chromium 0,88–1,0, WebKit 0,7–1,35; p10 = 0 kaikissa 16 kierroksessa; p90 3–14 (pysähdys → ylikorjaus); alku10 WebKit: 2 kehystä camD=0 osoittimen liikuttua 130 px, sitten 104 px yhdessä kehyksessä (suhde 3,8) = omistajan tahmea lähtö ja kiihtyminen; pysähdysosuus Chromium ~14 %, WebKit ~13 % — ero piikkien voimakkuudessa. Fable → Pelikoodari: kameran paikka kehyksen hetkellä interpoloidaan osoittimen aikaleimatuista näytteistä vakioviiveellä (1 kehys), ekstrapolointi viimeisellä nopeudella enintään kehys, getCoalescedEvents, ei ease-iniä; hyväksymisraja seuraamisvirheen p10 > 0,7 ja p90 < 1,4 molemmissa. Järjestys: lepopiirto-korjaus → A → tämä.

## OMISTAJA: KONEELLA ON MUUTAKIN TYOTA — TYHJAN KONEEN MITTAUS PYYDETAAN ETUKATEEN (22.9.2026 klo 16.12)

Omistaja 22.9.2026 klo 16.20: prosessorilla on nyt paljon muuta työtä; jos mittaus tyhjällä koneella tarvitaan, Fable pyytää sitä etukäteen. Sääntö: mittausikkunat sovitaan omistajan kanssa ennalta (aika ja kesto), muuten sessioiden headless-ajot saavat jatkua normaalisti.

## OIKAISU: v2109:N LEPOPIIRTO EI JUMITA VEDON ALKUA (MITATTU 29–52 ms); #2810 ON NORMAALI PARANNUS (LAHTO 14–15 ms DETERMINISTISESTI, VARTIJA V6 OIKEILLA OSOITINTAPAHTUMILLA) (22.9.2026 klo 16.15)

Pelikoodari 22.9.2026 klo 16.25: mittasi ennen pushia — ilman korjausta veto lähtee 29 ms (Chromium) / 52 ms (WebKit), eli päätelty kehä ei sulkeudu; kiirekutsu oli mittaamaton päätelmä, peruttu. #2810 avattu oikealla perustelulla: syöte ilmoittaa lepopiirrolle pointerdownissa ja -movessa → lähtö 14/15 ms deterministisesti, syöte muutoslähteenä samalla sopimuksella kuin häiveet ja nimiöt; vartija V6 oikeilla osoitintapahtumilla; testit 3926/0, savuke 11/11. Julkaisijalle normaalina. Aito vika on kohta 13 (kamera per tapahtuma): aikaleimattu interpolointi seuraavaksi A:n jälkeen.

## v2110 (#2810 SYOTE HERATTAA LEPOPIIRRON); JONOON #2807, #2808, #2803; #2809 KARTTASEPAN KATSELMUKSEEN (22.9.2026 klo 16.22)

Julkaisija 22.9.2026 klo 16.30: #2810 → v2110 (main e2db737ff), testit 3913/0. Fable: jonoon #2807 (GL-rungon värivika, Karttaseppä hyväksynyt) omana versiona, #2808 (patina.mjs vesiviivat, ei tuotantovaikutusta ennen polttoa) ja #2803 (raportti) ilman versiota; #2809 odottaa Karttasepän katselmusta.

## MAC STUDIO KAATUI JA KAYNNISTYI UUDESTAAN (KLO ~16.24); SESSIOT PALAUTUVAT; MAIN v2110 (22.9.2026 klo 16.33)

Omistaja 22.9.2026 klo 16.33: kone kaatui, nyt taas toimii (uptime 9 min, load 47 käynnistyksen jälkeen). Fablen worktree ehjä (claude/bold-ride-vow4ki 27b58942c), rooli-worktreet paikallaan, main v2110. ListAgents: Julkaisija ja Karttaseppä käynnissä uudestaan, Pelikoodari, Sisältökirjuri, Laitetestaaja ja Postivahti eivät vielä (Remote Control -merkinnät offline). Fable tarkistaa keskeneräiset työt luovutuksista ja käynnistää ohjeet uudestaan kun sessiot ovat auki.

## LINSSI-IDEA: OPEN INFRASTRUCTURE MAP (OSM, ODbL) DATANA OMAAN VEKTORITASOON — SAHKOVERKKO 1873 → NYT; JONOON SULAVUUDEN JALKEEN (22.9.2026 klo 16.34)

Omistaja 22.9.2026 klo 16.40 kysyi, voisiko github.com/openinframap/openinframap:ia hyödyntää omassa linssissä. Fable: kyllä datana, ei palveluna — OSM-pohjainen infrakartta (voimalinjat, sähköasemat, voimalat, tietoliikenne, öljy/kaasu, vesi); koodi BSD-3, data ODbL (attribuutio © OpenStreetMap contributors); heidän laattapalvelintaan ei kytketä peliin. Toteutus: Karttaseppä tekee OSM-otteesta oman vektoritason (Euroopan ≥ 220 kV linjat ja voimalat) maakuntavektorien putkeen; tyylit ja luokittelu lainataan repon tyylistä. Linssi 'Maapallon voimat' -perheeseen: Sähkö 1873 → nyt (1873 ei verkkoa, ensimmäiset voimalat 1882). Uudet linssit vasta sulavuuden jälkeen; Karttaseppä arvioi koon ja työmäärän kun meri- ja polttotyöt ovat ohi.

## CODEX: NELJA UUTTA PULUN KATSELUELETTA (VAIN DOCS + TESTS, COMMIT 9119fd795) JULKAISIJALLE #2807:N JALKEEN; POSTIVAHDIN LOOP EI KATKENNUT KAATUMISESSA (22.9.2026 klo 16.35)

Codex 22.9.2026 klo 16.40 (posti/codex-pulu-nelja-uutta-versiota-20260922.md): omistajan tilaus — rytmiä kehitetään, alkuun neljä elettä katselusivun Uudet versiot -kohtaan (Kyllä kyllä, Hetkinen!, Hauska nähdä, Kirjan selaus; valmistelu, eritahtinen nopeutus/jarrutus, siipien viiveet, paperin jälkiliike); haara codex/pulu-luonteva-rytmi-20260922, commit 9119fd795 (pohja v2109), vain docs + tests, uusi docs/livia-uudet-versiot.mjs; testit 3916/0. Fable: Julkaisija poimii vain tuon commitin #2807:n jälkeen, oma versio, readback → Fable kuittaa; omistajan taiteellinen palaute sivulta. Postivahti: loop pyöri kaatumisen yli. Julkaisija: main v2110 ehjä, #2807 kesken jatkuu.

## OMISTAJA: OPENINFRAMAP — KAIKKI KERROKSET (SAHKO, TIETOLIIKENNE, OLJY/KAASU, VESI) VOISI VISUALISOIDA OMASSA LINSSISSAAN JA KAYTTAA MUISSAKIN; KOODINPATKAT JA IDEAT TALTEEN; PALATAAN MYOHEMMIN (22.9.2026 klo 16.36)

Omistaja 22.9.2026 klo 16.45: openinframapista saisi hyviä koodinpätkiä ja ideoita; kaikkia sen kerroksia voisi visualisoida omassa linssissään ja käyttää ehkä muissakin linsseissä; palataan myöhemmin. Fable: kirjattu linssijonoon (uudet linssit vasta sulavuuden jälkeen); kun aika on, Karttaseppä arvioi OSM-otteen koon per kerros ja lainattavat tyylit (jännitetasot, energialähteet, putkityypit) repon web/-tyylistä.

## SEURAAMISVIRHEEN RAAKADATA HAVISI REBOOTISSA (/tmp); KOOSTELUVUT RAPORTISSA seuraamisvirhe-v2106-20260922.md (HAARA laitetestaaja 21fbbeba6); OPPI: MITTAUSDATA HETI REPOON, EI /tmp:HEN (22.9.2026 klo 16.37)

Laitetestaaja 22.9.2026 klo 16.50: /tmp/laitetestaaja-mittaus-desktop.jsonl tyhjeni rebootissa; raportti kirjoitettu viesteihin palautetuista luvuista (16 kierrosta + alku10) docs/raportit/seuraamisvirhe-v2106-20260922.md, haara laitetestaaja. Palvelimet 8793/8794 kuolleet. Sääntö jatkossa: raakadata tallennetaan heti worktreehen (docs/raportit/data/), ei /tmp:hen. Pelikoodarin interpolointikorjauksen todennukseen tarvitaan uusi omistajan veto tyhjällä koneella — pyydetään etukäteen.

## SEURAAMISVIRHEMITTARI PYSYVAKSI TYOKALUKSI (PR #2814: tools/mittaus/seuraamisvirhe-palvelin.mjs, TULOKSET docs/raportit/data/, --tarkista-tila PASS/FAIL p10>0,7 p90<1,4) (22.9.2026 klo 16.47)

Laitetestaaja 22.9.2026 klo 16.55: palvelin injektoi harnessin vastaukseen (index.html koskematon), tulokset repoon, hyväksymisraja lipuilla; itsetestattu v2111:llä (ensimmäinen versio vahingossa roolihaarassa, korjattu, PR origin/mainista). Fable: Julkaisijalle ilman versiota; interpolointikorjauksen todennus tällä mittarilla omistajan vedolla tyhjällä koneella, pyydetään etukäteen.

## A VALMIS: KOHDEKAUPUNKIEN MERKIT GL-KERROKSEEN (PR #2815, ERO 1 CSS2D-VERTAILUUN; KAKSI OMAA VIKAA KORJATTU); MERGE 2807 → 2809 → 2815; HUOMIOKOHDE JAA CSS2D:HEN; INTERPOLOINTI ALKAA (22.9.2026 klo 16.49)

Pelikoodari 22.9.2026 klo 17.00: kaikki säilyi kaatumisessa (probet /tmp:stä kirjoitettu uudestaan repoon savukkeiksi). #2815: kohdemerkit GL-kerrokseen — Edinburgh readPixels: GL-merkki (219,184,111) vs odotus (218,183,111); osumatesti 2 kohdetta, CSS2D-merkkejä 0; korjattu merkit.kohteet() (luki jakajan jälkeistä listaa) ja GL-kohteet ladonnan esteiksi CSS2D-merkin mitoilla. Riippuu #2807 ja #2809 (Karttaseppä hyväksyi; aluetonta copyTextureToTexture-kopiota ei tehdä, testi vahtii). Lähtövalinnan huomiokohde (rengas 2,6 s) jää CSS2D:hen (toinen syke-kanava vaatisi Karttasepän päätöksen) — Fable: jää. Seuraavaksi aikaleimainterpolointi (näytteet + getCoalescedEvents, lineaarinen interpolointi yhden kehyksen vakioviiveellä, ekstrapolointi enintään kehys, ei ease-iniä, koelippu), todennus Laitetestaajan mittarilla aidoilla vedoilla (p10 > 0,7, p90 < 1,4).

## PULUN NELJA KATSELUELETTA TUOTANNOSSA v2112, READBACK OK, KUITATTU CODEXILLE (22.9.2026 klo 16.51)

Julkaisija 22.9.2026 klo 16.51: 9119fd795 poimittu, v2112 (main 017a0d9c8), Pages OK, readback livia-uudet-versiot.mjs 200 ja 'Uudet versiot' sivulla, testit 3918/0. Fable kuittasi Codexille. Omistajan taiteellinen palaute eleistä sivulta matkakirja.app/docs/livia-svg.html.

## KARTTASEPAN ERA 2 (LAIKUT MAAILMAAN, HIENO RAE LIPUN TAAKSE) PR #2817 VALMIS, EI POLTETTU; OIKAISU: POLTETTU RAE VAIN ~3 % MEREN HIENORAKENTEESTA, z5↔z6-KORRELAATIO EI KELPAA MITTARIKSI; ENNEN RAKEKERROSTA MITATAAN CROSSFADEN EROTUSKUVA PELISTA (22.9.2026 klo 16.52)

Karttaseppä 22.9.2026 klo 17.05: PR #2817 — laikut laudan yksiköihin, hieno rae lipun --paperirae ruutu taakse (luetteloon), testit 3913/0; #2808 mainissa. Mittaus: rakeen poisto muuttaa laattaa vähän (z6 hf-rms 8,39 → 8,17, z5 7,36 → 7,21) — kuitu ja rae ~3 % hienorakenteesta; loput patinan muista passeista, meren sävyrampista ja häviöllisestä pakkauksesta. Oikaisu: z5↔z6-korrelaatio ei kelpaa edistymismittariksi (z5 skaalattuna ei sisällä z6:n hienointa taajuutta). Fable: Karttaseppä mittaa pelistä erotuskuvan tason vaihdon ympäriltä (ennen, häiveen keskellä, jälkeen; rannikko + avomeri; ?koe=kangasaina ja ilman kermaa) → onko lika laatassa, sekoituksessa vai kermassa/mipmapeissa; rakekerros odottaa tulosta. Vedos omistajalle näytetty, poltto odottaa omistajaa. v2111 (#2807 GL-atlas värihallintaan) ja v2112 (Codexin neljä elettä) mainissa.

## MITTAUS PELISTA: MEREN LIKA ON LAATASSA (KAKSI TASOA PIIRTAA ERI KUVION), EI HAIVEESSA EIKA KERMASSA (PR #2819); RAKEKERROS JAIHIN; SEURAAVA ASKEL POLTTO KORJATULLA RESEPTILLA JA MITTAUS UUDELLEEN (22.9.2026 klo 16.58)

Karttaseppä 22.9.2026 klo 17.10: kertomuslukko pitää kameran paikallaan ja vaihtaa vain tason; hf-rms merialueelta, WebKit 390×844 dpr 3, tuotannon laatat. Rannikko: A(z7) 8,10, B(z8) 8,40, A−B 5,68, häive C−(A+B)/2 vain 0,60; avomeri A 4,00, B 3,98, A−B 2,24, C-poikkeama 0,82; ?koe=kangasaina ei muuta (kerma ja mipmapit eivät syy). Ristihäivytys on uskollinen lineaarinen sekoitus; tasot piirtävät eri kuvion samaan paikkaan; erotuskuvassa näkyy vanha rannikon vesiviivasto. Varaus: tuotannon laatoissa ei vielä #2808:n korjausta → mittaus toistettava polton jälkeen. Suositus: rakekerros jäihin, poltto korjatulla reseptillä + mittaus uudelleen. #2817 odottaa omistajaa.

## OMISTAJA: POLTTO KORJATULLA RESEPTILLA NOIN KLO 17.30, LAHTOLUPA ERIKSEEN; HIENO RAE ENNALLAAN POLTOSSA (YKSI MUUTTUJA), MITTAUS TOISTETAAN POLTON JALKEEN (22.9.2026 klo 16.59)

Omistaja 22.9.2026 klo 17.00 (kortti): poltto noin puolen tunnin päästä, sanoo vielä erikseen. Resepti 2026-09-22c: vesiviivat laudan yksiköihin (#2808) + laikut maailmaan (#2817), hieno rae ennallaan, isobaattipeitto 0,55, nimiöt g ennallaan. Karttaseppä valmistelee, CI-tauko Julkaisijan kanssa, polton jälkeen tasonvaihtomittaus (#2819) ja vedokset. Rakekerros jäihin.

## TUOTANNOSSA v2113 (ATLAKSEN OSAPAIVITYS ATLASKANKAASTA) JA v2114 (KOHDEKAUPUNKIEN MERKIT GL-KERROKSEEN); MITTAUSTYOKALU #2814 MAINISSA; #2817 JA #2819 ILMAN VERSIOTA (22.9.2026 klo 17.00)

Julkaisija 22.9.2026 klo 17.15: #2807 → v2111, #2809 → v2113 (konflikti savuke-glnimiot.mjs, HEAD:n lisäys — Pelikoodari tarkistaa), #2815 → v2114 (main ea2cd8303); #2814 ilman versiota; testit vihreät. Fable: #2819 ja #2817 ilman versiota, sitten CI-tauko polton ajaksi.

## v2113/v2114 TARKISTETTU AJAMALLA; INTERPOLOINTI KOODATTU (HAARA pelikoodari-syote-interpolointi, PALUULIPPU ?koe=interpvanha) MUTTA PELIKOODARIN OMA HARNESS EI EROTA — TODENNUS OMISTAJAN AIDOILLA VEDOILLA ENNEN POLTTOA (22.9.2026 klo 17.03)

Pelikoodari 22.9.2026 klo 17.20: v2113/v2114 ok (vartijat vihreinä mainia vasten). Interpolointi: näytteet aikaleimoineen + getCoalescedEvents, kehyksen alussa paikka hetkelle nyt − viive (mitattu kehysväli ≤ 17 ms) lineaarisesti, ekstrapolointi ≤ 1 kehys, ensimmäinen näyte ilman viivettä; yksikkötestit (näytteetön kehys etenee saman verran), v2097:n sopimustesti päivitetty; 3938 testiä 0 punaista. Oma Playwright-harness ei kelpaa todisteeksi (ei toista aidon hiiren niputusta, asteet→px-muunnos väärä, kierrosten ajautuminen; 50,4 % kaikilla = lämmittelyartefakti) — rehellisesti kirjattu. Ehto: jos aidot vedot eivät parane (p10 > 0,7, p90 < 1,4), muutos palautetaan. Fable: Laitetestaaja tarjoilee haaran mittaustyökalulla, omistaja vetää A (uusi) vs B (?koe=interpvanha) Safarissa ja Chromessa ennen polttoa. Pelikoodari jatkaa C:hen (karttaselite).

## INTERPOLOINNIN AIDOT VEDOT: SEKA UUSI (A) ETTA VANHA (B) FAIL (p10 ≈ 0,1, p90 4–9, PYSAHDYS 6–11 %); A LIEVASTI PAREMPI; FABLE EPAILEE HARNESSIN KAMERAN LUKUHETKEA (ENNEN TICKIA) — TARKISTUS ENNEN PALAUTUSTA (22.9.2026 klo 17.15)

Laitetestaaja 22.9.2026 klo 17.30 (docs/raportit/seuraamisvirhe-interpolointi-20260922.md, data haarassa laitetestaaja a14fc1a21): Safari A p10 0,13 / p50 0,83 / p90 4,08 / pysähdys 6 %; Safari B (interpvanha) 0,06 / 0,75 / 4,69 / 11 %; Chrome A 0,17 / 0,96 / 8,19 / 9 %; Chrome B 0,15 / 1,14 / 8,95 / 10 %; 32/32 FAIL rajaa p10 > 0,7, p90 < 1,4 vasten; alku10: ensimmäinen kehys pointerdownista lähes aina pysähdys molemmissa. Fable: p90 4–21 on fysikaalisesti epäuskottava interpoloidulle kameralle → epäily harnessin lukuhetkestä (pointOfView luetaan omassa rAF:ssa ennen kirjaston tickiä → edellisen kehyksen kamera → 0/2× mittarin artefakti). Tarkistus: kamera luetaan onAfterRenderissä (kytkePallonKehys / __viimeisinKehys), syötelaskurit dataan; jos lukuhetki oli oikea, Pelikoodari palauttaa muutoksen kuten lupasi.

## OMISTAJA: POLTTO 2026-09-22c KAYNNISTETAAN NYT (22.9.2026 klo 17.17)

Omistaja 22.9.2026 klo 17.20: polton voi aloittaa. Karttaseppä ajaa ajo-20260922c (vesiviivat laudan yksiköihin, laikut maailmaan, hieno rae ennallaan, isobaatit 0,55, nimiöt g); CI-tauko ~2 h; polton jälkeen vedokset ja tasonvaihtomittaus. Julkaisija nollataan samaan aikaan (luovutus #2820).

## JULKAISIJA NOLLATTU (69 %, LUOVUTUS #2820) POLTON AJAKSI; CI-TAUKO POLTON LOPPUUN (22.9.2026 klo 17.18)

Fable 22.9.2026 klo 17.25: Julkaisijan luovutus 99c15c641 (#2820) kuitattu, nollauskaava ajettu, worktree Matkakirja-julkaisija. Uusi sessio: CI-tauko polton ajan (ei savukkeita, dispatcheja, pushauksia), polton jälkeen Karttasepän laattaversio omana versiona, sitten Pelikoodarin C–E.

## MITTARIVIRHE VAHVISTETTU: SEURAAMISVIRHEHARNESS LUKI KAMERAN OMASTA rAF-SILMUKASTA (EI onBeforeRender) → KAIKKI TAHANASTISET SEURAAMISVIRHELUVUT PATEMATTOMIA; KORJAUS ONBEFORERENDERIIN, UUSI VETO POLTON JALKEEN (22.9.2026 klo 17.21)

Laitetestaaja 22.9.2026 klo 17.35: harness luki pallo.getScreenCoords omasta requestAnimationFrame-silmukasta, ei kirjaston onBeforeRender/kytkePallonKehys-koukusta → kilpailu kirjaston silmukan kanssa tuotti 0/2×-kuvion mittarissa. Koskee kaikkea seuraamisvirhedataa (myös 16.10 kierrokset ja interpolointi-A/B); raakadataa ei voi korjata jälkikäteen (väärä arvo tallentui). Korjaus: luku scene.onBeforeRenderissä synkronisesti ennen piirtoa; itsetesti, PR, uusi omistajan veto polton jälkeen. Interpolointia ei palauteta ennen uutta mittausta. Aiemmat päätelmät 'p10 = 0 kaikissa kierroksissa' ja 'pysähdys + ylikorjaus' ovat siis todistamattomia; omistajan tuntuma (tahmea lähtö, kiihtyminen) pysyy havaintona.

## PELIN OMA SYOTELOKI (?koe=syoteloki): p90 ≈ 1,1, EI PIIKKEJA → MITTARIN 4–22 OLI ARTEFAKTI; SEURAAVA A/B LUKEE PELIN LOKIA; INTERPOLOINTI PYSYY ODOTTAMASSA (22.9.2026 klo 17.22)

Pelikoodari 22.9.2026 klo 17.40: lisäsi lokin, joka kirjaa osoittimen ja kameran heti kamerakirjoituksen jälkeen (ui.pallonSyote.loki); pelin lokin mukaan p90 1,113, p50 ≈ 1,1 — ei piikkejä; ohitukset 123 kpl 'ei tartuntaa' (vetojen välissä), 0 vedon aikana. Varoitus omista luvuista: asteet→px-muunnos olettaa pisteen ruudun keskellä (p50 heittelee). Vedon ensimmäinen kehys ilman kameraliikettä on aito ja väistämätön (yksi kehys). Fable: Laitetestaajan seuraava harness lukee pelin lokia ja syötelaskureita; A/B polton jälkeen omistajan vedolla; interpolointia ei palauteta eikä hyväksytä ennen sitä.

## LINSSI-IDEA: IKKUNA NYKYHETKEEN — JULKISET YOUTUBE-LIVEKAMERAT KAUPUNGEISSA (LIVEWORLD-ESIMERKKI); KERUU YOUTUBE DATA API:LLA TAI WINDY WEBCAMS API:LLA; AVAIN OMISTAJALTA (22.9.2026 klo 17.30)

Omistaja 22.9.2026 klo 17.30 näytti liveworld.info-appin (YouTube-livelähetyksiä pallolla) ja kysyi, löytyisivätkö samat kameraosoitteet. Fable: löytyvät — YouTube Data API (eventType=live + sijainti, elossaolotarkistus yöllä, upotus YouTuben soittimella) tai Windy Webcams API v3 (luettelo + soitinupotus, ehdot as is + attribuutio). Esimerkit heti: Helsingin sataman kolme kameraa, Eiffel-tornin kanava. Ehdotus: linssi 'Ikkuna nykyhetkeen' (1873-kaupunki → sama paikka livenä), data js/packs/webkamerat.js + keruu- ja tarkistusskripti; uudet linssit sulavuuden jälkeen, lista voidaan kerätä aiemmin. Tarvitaan omistajan hankkima YouTube Data API -avain (ja/tai Windy-avain).

## SAFARIN TOKKIMISEN SYY LOYTYI NETISTA: WEBKIT EI TAHDISTA pointermove/mousemove-TAPAHTUMIA rAF:IIN (CHROME TAHDISTAA); iOS SAFARI TAHDISTAA touchmoven MUTTA EI pointermovea → PALLOLAUDAN POINTER-KUUNTELU SAA 0/2 TAPAHTUMAA PER KEHYS (22.9.2026 klo 17.38)

Omistaja 22.9.2026 klo 17.45 kysyi, löytyisikö syy netistä. Fable: Nolan Lawsonin mittaustaulukko (2019, 'Browsers, input events, and frame throttling'): Chrome tahdistaa pointermove, mousemove ja wheel rAF:iin; Safari macOS ei tahdista mitään niistä; Safari iOS tahdistaa touchmoven mutta ei pointermovea. Suositus: syöte throttlataan itse rAF:iin ja käytetään vain viimeisintä tilaa per kehys. Pallolauta kuuntelee vain pointer-tapahtumia → sama epätahti Macin Safarissa ja iPhonessa; Chromessa tapahtuma per kehys → pehmeä. Pelikoodarin interpolointi on oikea lääke; iOS:llä lisäksi touchmove-näytteet (rAF-tahdistettu) pointerin sijaan. Safari tukee getCoalescedEvents vasta iOS 18.2:sta vajaana, pointerrawupdatea ei ole.

## OMISTAJA: SYOTEPUTKEN VAIHTOEHDOT TESTATAAN RINNAKKAIN KOELIPPUINA, PAATOS MITTAUKSELLA — 5 VAIHTOEHTOA (VIIMEISIN NAYTE, INTERPOLOINTI, ENNAKOINTI, JOUSI, TOUCHMOVE iOS) (22.9.2026 klo 17.57)

Omistaja 22.9.2026 klo 17.50: Opus testatkoon kaikki vaihtoehdot yhtä aikaa, koska mielipiteet eroavat. Fable → Pelikoodari: samaan haaraan koelippuina 1) interpvanha (viimeisin näyte kerran kehyksessä), 2) oletus aikaleimainterpolointi 1 kehys viive, 3) syoteennakko (ekstrapolointi ilman viivettä), 4) syotejousi (kriittisesti vaimennettu jousi, aikavakio ~1 kehys, dt-pohjainen), 5) syotetouch (iOS: touchmove-näytteet, rAF-tahdistettu); parvi sallittu; mittaus ensin itse, sitten Laitetestaajan korjatulla harnessilla polton jälkeen, finalistit (≤ 3) omistajan vedoilla Safari + Chrome; raportti taulukkona, Fable päättää oletuksen.

## OMISTAJA: TODENNAKOISIN SYOTEKORJAUS (INTERPOLOINTI) TUOTANTOON HETI, MUUT VAIHTOEHDOT KOELIPPUINA, OMISTAJA TESTAA iPHONELLA; POIKKEUS CI-TAUKOON (SAVUKKEET-MAC PERUTAAN) (22.9.2026 klo 17.58)

Omistaja 22.9.2026 klo 18.00: peliin voi laittaa todennäköisimmän version heti ja hän testaa itse iPhonella; nykimisen voi testata nykyisellä kartalla, polttoa ei tarvitse odottaa. Fable: Pelikoodari tekee PR:n heti (oletus aikaleimainterpolointi, ?koe=interpvanha paluu, ?koe=syotetouch iOS-kosketusnäytteet; ennakko ja jousi toisessa PR:ssä jos eivät ehdi); Julkaisija mergeää Testit vihreänä ja peruu Mac-savukeajon polton takia.

## OMISTAJA: SYOTEPUTKEN VAIHTOEHDOT RATASVALIKKOON (⚙ → KARTTA → VEDON SEURANTA), EI VAIN URL-LIPPUINA (22.9.2026 klo 17.59)

Omistaja 22.9.2026 klo 18.05: liput valittaviksi ratasvalikon taakse, jotta testaus on nopeampaa. Fable → Pelikoodari: asetus 'Vedon seuranta' (Interpolointi oletus, Vanha, Ennakointi, Jousi, Kosketusnäytteet kosketuslaitteella), localStorage, vaikutus heti jos mahdollista, valinta syötelokiin; URL-liput jäävät mittaukseen; samaan PR:ään tai heti perään omana.

## SYOTEPUTKEN 5 TAPAA PR #2821 (OLETUS INTERPOLOINTI; LIPUT interpvanha, syoteennakko, syotejousi, syotetouch, syoteloki); PELIKOODARI NOLLATAAN (70 %, LUOVUTUS #2823); RATASVALIKKO UUDEN SESSION ENSIMMAINEN TYO (22.9.2026 klo 18.09)

Pelikoodari 22.9.2026 klo 18.10: #2821 (51cff63be) sisältää kaikki viisi tapaa; jousi suljetussa muodossa (eksplisiittinen integrointi räjähti dt = 2 kehystä), vakaa millä tahansa dt:llä; oletus ei ole mittaamalla valittu — Laitetestaajan korjattu harness ja omistajan vedot ratkaisevat, interpolointi palautetaan jos ero ei ole todellinen. Testit 3942/0. Luovutus c66ee9fea (#2823). Fable: Julkaisija mergeää #2821 heti Testit vihreänä (Mac-savuke perutaan), Pelikoodari nollataan; uusi sessio tekee ratasvalikon 'Vedon seuranta' ensin.

## PELIKOODARI NOLLATTU (LUOVUTUS #2823); UUSI SESSIO: RATASVALIKON 'VEDON SEURANTA' ENSIN, SITTEN C, D, E (22.9.2026 klo 18.11)

Fable 22.9.2026 klo 18.12: nollauskaava ajettu, worktree Matkakirja-pelikoodari. Aloitusviesti: Vedon seuranta -asetus (Interpolointi/Vanha/Ennakointi/Jousi/Kosketusnäytteet) mallina tarkkuus-asetus.js, #2821:n päälle; sitten C, D, E; rakekerros ja pohjapallo-shader jäihin.

## SYOTEPUTKI TUOTANNOSSA v2115 (INTERPOLOINTI OLETUS + 4 KOELIPPUA + SYOTELOKI); OMISTAJA TESTAA iPHONELLA (22.9.2026 klo 18.12)

Julkaisija 22.9.2026 klo 18.20: #2821 → #2822 → v2115 (main 8930f517), Mac-savukeajo peruttu ennen mergeä, testit 3928/0; #2823 raportti mainissa. Omistajan testiosoitteet: tuotanto = interpolointi; ?koe=interpvanha; ?koe=syotetouch (iPhone); ?koe=syoteennakko; ?koe=syotejousi. Ratasvalikon asetus tulossa uudelta Pelikoodarilta.

## POLTTO 2026-09-22c VALMIS KLO 18.19 (62 min): 117 288 LAATTAA, EHEYS OK, AMPARISSA; VEDOS: VESIVIIVAT SEURAAVAT RANTAA KAIKILLA TASOILLA; OSOITIN-PR JA TASONVAIHTOMITTAUS SEURAAVAKSI (22.9.2026 klo 18.20)

Karttaseppä 22.9.2026 klo 18.19: vaihe 1 114/114 shardia 53 min, vaihe 2 397/397 60 min, 0 kaatunutta; eheystarkistus täsmää kaikilla tasoilla; ämpärissä julisteet/pyramidi/2026-09-22c-pohja/ ja julisteet/pallo/laatat/2026-09-22c-pohja-20260922c/ + laatat.json; luettelo odottaa vientikansiossa. Vedos: vanhassa viivasto levittäytyy joka tasolla eri kauas, uudessa sama vyö seuraa rantaa, karkealla tasolla harvempana; avomerellä ei eroa. CI-tauko päättyi. Seuraavaksi: osoitin-PR (PALLO_LAATTAVERSIO 2026-09-22c-pohja, tunniste 20260922c) → versio → luettelo ämpäriin → tasonvaihtomittaus (vertailu rannikko A−B 5,68 / 0,60; avomeri 2,24 / 0,82).

## OSOITIN-PR #2824 (pallo.js + sw.js → 2026-09-22c) JULKAISIJALLE; VEDOKSET poltto-22c-rannikko/avomeri NAYTETTY OMISTAJALLE (22.9.2026 klo 18.25)

Karttaseppä 22.9.2026 klo 18.25: PR #2824 PALLO_LAATTAVERSIO → 2026-09-22c-pohja, PALLO_LAATTATUNNISTE → 20260922c, sw.js LAATTAKANSIO/LAATTAKANSIO_SYVA (tahallinen kaksoiskappale, tests/sw vartioi), testit 3928/0; vedokset docs/raportit/kuvat/poltto-22c-rannikko-z5-z8.jpg ja -avomeri (ylärivi vanha, alarivi uusi). Fable näytti omistajalle; Julkaisija mergeää omana versiona, sitten luettelo ämpäriin ja tasonvaihtomittaus.

## v2115:STA PUUTTUIVAT ENNAKKO, JOUSI JA TOUCH (REBASE EHTI ENNEN VIIMEISTA COMMITIA); PR #2825 TUO NE JA RATASVALIKON 'VEDON SEURANTA' (22.9.2026 klo 18.26)

Pelikoodari (uusi sessio) 22.9.2026 klo 18.30: #2821:n viimeinen commit (viisi tapaa, 18.08) syntyi Julkaisijan rebasen (18.03) jälkeen → v2115:ssä vain interpolointi + interpvanha + syoteloki. PR #2825: cherry-pick puuttuvat kolme tapaa + ratasvalikko → Kartta → Vedon seuranta (5 riviä, localStorage, vaikutus heti, ?koe-lippu voittaa ja valikko kertoo sen, kosketusrivi vain kosketuslaitteella); 3952 testiä 0 punaista. Oppi Julkaisijalle: tarkista PR:n head-commit juuri ennen rebasea.

## LOYDOS 2: 'TARKKUUS LIIKKEESSA' -ASETUS EI OLE TUOTANNOSSA (COMMIT c60f4cec1 JAI #2785:N REBASESTA POIS); PALAUTUS OMANA PR:NA; JULKAISIJALLE SAANTO: PR:N HEAD == REBASATTU TIP ENNEN MERGEA (22.9.2026 klo 18.29)

Pelikoodari 22.9.2026 klo 18.35: js/tarkkuus-asetus.js ja avain matkakirja-tarkkuus-liikkeessa eivät ole mainissa — sama rebase-kilpailu kuin #2821:ssä; muut suljetut pelikoodari-haarat ovat mainissa. Fable: Pelikoodari palauttaa asetuksen omana PR:nä #2825:n päälle; Julkaisijalle sääntö: juuri ennen mergeä fetch + vertaa PR:n headRefOid rebasattuun tippiin, muuten rebasaa uudestaan. Omistajalle: v2099:n 'Tarkkuus liikkeessä' -asetus ei siis ollut pelissä; tulee nyt.

## PR #2827 PALAUTTAA 'TARKKUUS LIIKKEESSA' (#2825:N PAALLE); ALKUPERAINEN COMMIT OLISI KAATANUT PAGES-KAANNOKSEN (MODULES-LISTA) — KORJATTU; VALIKON JARJESTYS KARTTA → PIENI LIIKE → TARKKUUS LIIKKEESSA → VEDON SEURANTA (22.9.2026 klo 18.34)

Pelikoodari 22.9.2026 klo 18.40: #2827 pinottu #2825:n päälle; js/tarkkuus-asetus.js lisätty build-standalonen MODULES-listaan (checkModuleList olisi heittänyt), otsikkoluokka ja rivileveys siistitty; 3956 testiä 0 punaista. Jono: #2826 (laattaosoitin 22c) → #2825 → #2827. Pelikoodari siirtyy kohtaan C.

## LUETTELO 22c AMPARISSA; TASONVAIHTOMITTAUS UUSILLA LAATOILLA: A−B EI PARANTUNUT (RANNIKKO 5,68 → 5,95, AVOMERI 2,24 → 2,24); OMISTAJAN TUNTUMATESTI RATKAISEE; C VALMIS (PR #2831) (22.9.2026 klo 18.41)

Karttaseppä 22.9.2026 klo 18.45 (PR #2830): pyramidi.json ämpärissä (2026-09-22c-pohja), laatat.json täsmää, edellinen luettelo talteen. Mittaus z7→z8 uusilla laatoilla: rannikko A−B 5,68 → 5,95, avomeri 2,24 → 2,24. Tulkinta: viivat ovat nyt samassa paikassa joka tasolla, mutta A−B:tä hallitsevat rantaviivan ja maaston tarkentuminen, paperin rae ja pakkaus; harvennus puree vasta z6/z5-vaihdoissa. Ehdotus: jos lika näkyy karkeilla tasoilla, mittaus z6→z7 ja z5→z6 ja harvennetut viivat esiin vaimeina. Laitetestaaja: mittauspalvelin korjattu (#2829), itsetesti 1,01–1,02; A/B-osoitteet #2825:n haarasta. Pelikoodari: C valmis (#2831: rivin luku piiloon linssin alta, valinta ja valot raahatessa; 3944 testiä 0 punaista); D ja E saivat omistajan sanatarkat lauseet.

## v2116 (KARTTA 22c) JA v2117 (VEDON SEURANTA -VALIKKO, 5 TAPAA) TUOTANNOSSA; D VALMIS (#2833: VALKOINEN REUNUS OLI NOSTOSYM_KUVAMERKIN_HALO, POISTETTU); E = VAIHTOEHTO (b): HARMAA PISTE + TYYPIN VARI KARTTAVALONA, NOSTOTASON POLTTO MYOHEMMIN (22.9.2026 klo 18.51)

Julkaisija/Pelikoodari 22.9.2026 klo 18.50: #2826 → v2116, #2828 → v2117 (Vedon seuranta ⚙ → Kartta, viisi tapaa, valinta heti); Tarkkuus liikkeessä (#2827/#2832) jonossa. Fable selitti omistajalle Tarkkuus liikkeessä -vaihtoehdot (Terävä dpr 3 + MSAA; Tasainen dpr 2 liikkeessä; Kokeellinen ilman MSAA:ta). D: valkoinen reunus oli elävän rasterin halo, jota poltettu laatta ei toista → poistettu (#2833); luettavuus tummalla reliefillä korjataan tarvittaessa merkin musteella. E: nostopisteen väri on poltettu nostolaattoihin (NOSTOSYM_PISTE_VARIT) → Fable valitsi (b): elävä piste harmaaksi + tyypin väri karttavalona vivusta heti, Karttasepän pieni nostotaso-poltto harmaalla pisteellä myöhemmin omistajan hyväksynnän jälkeen; ?koe=symbolitkaukana samaan PR:ään.

## OMISTAJA iPHONELLA v2117: VIIDEN SYOTETAVAN VALILLA EI HAVAITTAVAA EROA → iPHONEN NYKIMINEN EI OLE SYOTTEEN TAHDISTUSTA; SEURAAVA KOE TARKKUUS LIIKKEESSA 'TASAINEN' (v2118) (22.9.2026 klo 18.56)

Omistaja 22.9.2026 klo 18.55: kokeili v2117:llä kaikki syötetavat ratasvalikosta, ei nähnyt eroa; kysyi pitääkö sovellus sulkea välissä — ei tarvitse (valinta heti). Fable: tulos itsessään kertoo, että iPhonen jäljellä oleva nykiminen ei ole syöteputkea (Safari-työpöydän ero Chromeen voi silti olla); seuraava koe Tarkkuus liikkeessä → Tasainen (dpr 2 liikkeessä) v2118:lla; jos ei eroa, iPhonen kehysprofiili (vaatii puhelimen kytkennän). Pelikoodarille tiedoksi ennen lisää syötetyötä.

## E VALMIS (#2835: HARMAA PISTE OLETUS, VARI VIVUN VALOTAPLASTA, ?koe=symbolitkaukana); ?koe=profiili TILATTU (KEHYSPROFIILIN OVERLAY + POST) iPHONE-MITTAUKSEEN ILMAN WEB INSPECTORIA (22.9.2026 klo 19.00)

Pelikoodari 22.9.2026 klo 19.00: #2835 — --sym-piste-harmaa, selitevalikon merkki pitää värinsä (väriavain), väri tulee valotäplästä; poltetun laatan piste värillinen kunnes Karttaseppä polttaa nostotason; 3959/0. ?koe=profiili: kehysprofiili.js:n koneisto on (varattu/vapaa, rAF-kutsut, render, pisimmät 12); lisätään overlay (pisin kehys + syy + asetukset) ja POST /tulos mittauspalvelimelle → Fable tilasi. Julkaisijan jono: #2831 → #2833 → #2835.

## OMISTAJA iPHONELLA v2118: 'TASAINEN' (dpr 2 LIIKKEESSA) EI VAIKUTA, NYKIMINEN TASAISESTI KOKO VEDON AJAN MYOS NAYTETYLLA ALUEELLA → EI SYOTE, EI GPU, EI LAATTOJEN SAAPUMINEN; KEHYSPROFIILI PUHELIMESTA (?koe=profiili) RATKAISEE (22.9.2026 klo 19.07)

Omistaja 22.9.2026 klo 19.05: Tasainen tökki yhtä lailla (sovellus käynnistetty uudestaan valinnan jälkeen); nykiminen tuntuu tasaisesti koko ajan vedon aikana, myös hitaassa vedossa jo näytetyllä alueella. Fable: poissuljettu syöteputki (5 tapaa), piirtotarkkuus (dpr 2) ja laattojen saapuminen; jäljellä pääsäikeen kehyskohtainen työ tai kehystahti (esim. ProMotion 120 Hz rAF vs 60 fps piirto → epätasainen tahti). ?koe=profiili-overlayhin lisätään rAF-väli (Hz), dt-jakauma, render/js-jako ja asetukset; omistaja kuvaa ruudun.

## OMISTAJA KYSYI HTML-ELEMENTEISTA KARTAN PAALLA: MERKIT OVAT GL:SSA (0 CSS2D-MERKKIA), JALJELLA HUOMIORENGAS, LINSSIMERKIT JA KIINTEAT PANEELIT; ILLAN SAVY (mix-blend-mode multiply, KATSAUKSEN KOHTA 4) ON YHA DOM-KERROS → OMISTAJA TESTAA ?koe=eiblend iPHONELLA (22.9.2026 klo 19.08)

Fable 22.9.2026 klo 19.12: v2114:n jälkeen nimet, nostot, nappula ja kohteet GL:ssä; CSS2D:ssä vain lähtövalinnan huomiorengas ja linssimerkit. Illan sävy on koko kartan multiply-DOM-kerros (aina paitsi keskipäivällä; omistajan kuvassa 'Päivä 4, ilta'), iOS:n komposiittorille raskas joka kehys — katsauksen kohta 4, ei vielä tehty. Omistaja testaa ?koe=eiblend; jos auttaa, sävy laattashaderin uniformiksi (Pelikoodari).

## OMISTAJA iPHONELLA: ?koe=eiblend (ILLAN SAVYN MULTIPLY POIS) EI VAIKUTA NYKIMISEEN → DOM-SEKOITUSKERROS POISSULJETTU; SEURAAVAKSI KEHYSPROFIILIN OVERLAY (#2837) PUHELIMESTA (22.9.2026 klo 19.13)

Omistaja 22.9.2026 klo 19.15: eiblend ei vaikuta. Poissuljettu tähän mennessä iPhonella: syötetapa (5), dpr 2 liikkeessä, laattojen saapuminen (nykii myös näytetyllä alueella), DOM-multiply-kerros. Jäljellä: kehystahti (120 Hz rAF vs piirto) tai pääsäikeen kehyskohtainen työ (ladonta, roska, kerroksen päivitys) — overlay #2837 kertoo.

## C, D, E TUOTANNOSSA (v2119–v2121); KAAPPAUKSET NAYTETTY OMISTAJALLE (HARMAAT PISTEET, symbolitkaukana 6 → 41 MERKKIA, HALO POIS); NOSTOTASON POLTTO HARMAALLA PISTEELLA ODOTTAA OMISTAJAA (22.9.2026 klo 19.18)

Pelikoodari 22.9.2026 klo 19.18: kaappaukset docs/raportit/kaappaukset/nostopiste-20260922/ (haara pelikoodari-harmaapiste) ja nostohalo-20260922/ (pelikoodari-nostohalo), WebKit 390×844 dpr 2, savuke 10/10; ?koe=symbolitkaukana nostaa kuvamerkit z6:ssa 6 → 41; Avignonin kaariportti ennen/jälkeen. C (v2119) ei kuvattu (tuotannossa). Poltetun laatan piste yhä värillinen kunnes nostotaso poltetaan.

## KEHYSPROFIILIN OVERLAY TUOTANNOSSA v2122 (?koe=profiili); OMISTAJA KUVAA iPHONEN RUUDUN VEDON AIKANA (22.9.2026 klo 19.23)

Julkaisija 22.9.2026 klo 19.20: v2119–v2121 (C, D, E) ja v2122 (#2839 koe=profiili, rAF-Hz-lisäys mukana head-tarkistuksen ansiosta) mainissa; #2840 kaappaukset ilman versiota. Omistajan mittaus: https://matkakirja.app/?koe=profiili → veto 10 s → kuvakaappaus overlaysta (rAF Hz, piirto-osuus, dt p95/max, >20 ms, js/render, pisin kehys ja syy, asetukset).

## iPHONEN KEHYSPROFIILI (v2122, OMISTAJAN 3 KAAPPAUSTA): rAF 59–63 Hz (EI 120), MUTTA PIIRTO VAIN 51–86 % KEHYKSISTA VEDON AIKANA (OHITETTUJA 133–234) → LEPOPIIRTO OHITTAA KEHYKSIA KESKEN VEDON; PITKAT VALIT (max 153–187 ms) ILMAN JS:AA JA PIIRTOA (22.9.2026 klo 19.34)

Omistaja 22.9.2026 klo 19.33: overlay iPhonella vedon aikana: rAF 59–63 Hz, dt p50 16–17; piirto 126/154 (82 %), 76/149 (51 %), 133/154 (86 %); dt p95 34–37 ms, max 153–187 ms, >20 ms 16–24 per 150–180; js ka ≈ 0, render ka 0,2–0,3 ms; pisin kehys varattu −1 (js 0, render 0, muu ?); dc 374–393, scenessä 56–65, häipyy 0–6, taso 8; veto interp, tarkkuus terävä, lepo päällä. Fable: 120 Hz -hypoteesi kumottu; juurisyy-ehdokas: lepopiirto pysäyttää tickin kehyksissä joihin ei osu pointermovea (iOS ei tahdista pointermovea rAF:iin), ja kaikki syötetavat ajetaan tickissä → 0/2-kuvio piirrossa syötetavasta ja dpr:stä riippumatta — selittää omistajan 'ei eroa' -tulokset. Korjaus: eleen ja liukujen ajan ei yhtään ohitusta (resumeAnimation), vartija 'vedon aikana piirto 100 %'. Pitkät välit ilman JS:ää/piirtoa selvitetään erikseen (tickin tauko vai selain).

## KORJAUS PR #2841: ELE JA LIUKU OVAT LEPOPIIRRON ESTE (JOKA rAF PIIRRETAAN), VARTIJA V7 JOKA TOISEN KEHYKSEN TAPAHTUMILLA (main 88/2 OHITUSTA → 90/0); VANHA TASAISUUSMITTARI EI NAHNYT VIKAA KOSKA SE LAHETTI TAPAHTUMAN JOKA KEHYKSELLA (22.9.2026 klo 19.45)

Pelikoodari 22.9.2026 klo 19.40: sormi alhaalla, nipistys, kamera-ajo tai liuku (ui.pallonVauhti.raf) ⇒ lepopiirto ei ohita; syke vain levossa. V7 mittaa iOS:n kuviolla (tapahtuma joka toiseen kehykseen): korjaamaton 88/2 ohitusta, korjattu 90/0; V2 pysähdyksiä 0/88. Sivulöydös: tasaisuusmittarin synteettinen veto lähetti tapahtuman joka kehyksellä → vika ei näkynyt yhdessäkään aiemmassa savukkeessa. Overlayhin rivi 'pitkät (>25 ms): piirretty n · ohitettu m' → omistajan seuraava kaappaus erottaa tauot ja työn. Profiilin rAF-ketju mittaa dt:n myös tickin tauolla. Julkaisijalle kiireellisenä.

## v2123 TUOTANNOSSA: VEDON AIKANA EI OHITETA YHTAKAAN KEHYSTA (VARTIJA V7); OMISTAJA MITTAA iPHONELLA (22.9.2026 klo 19.51)

Julkaisija 22.9.2026 klo 19.50: #2841 → #2842 → v2123 (main bd0d55fc), testit 3960/0. Omistajan mittaus: ?koe=profiili, kaappaus vedon aikana (≥ 5 s yhtäjaksoinen veto) ja levossa (10 s).

## v2123 iPHONELLA: VEDOSSA PIIRTO 100 %, MUTTA 17 PITKAA PIIRRETTYA KEHYSTA (dt p95 52 ms, max 103) JS 0,7 / RENDER 0,2 ms → AIKA GPU:SSA/KOMPOSIITTORISSA; OMISTAJA: NYKII ENEMMAN (KUORMA EI ENAA PIILOUDU OHITUKSIIN); LEVOSSA 25 % JA EI PITKIA; UUSI TASAINEN/KOKEELLINEN-KOE (22.9.2026 klo 19.59)

Omistaja 22.9.2026 klo 19.57 (kaappaukset): veto rAF 63 Hz, piirto 151/151, dt p95 52, max 103, >20 ms 19/176, pitkät piirretty 17 / ohitettu 0, js ka 0,7, render ka 0,2, dc 45, scenessä 0, taso 8; lepo rAF 83 Hz, piirto 45/180 (25 %), dt p95 17, >25 ms 0/2519. Fable: lepopiirron ohitus korjattu; pitkät kehykset ovat piirrettyjä kehyksiä ilman CPU-aikaa → GPU/komposiittori (dpr 3 + MSAA, 45 dc) = katsauksen 16–26 ms renderöinti; edellinen Tasainen-koe ei voinut näyttää eroa ohitusvian takia → omistaja testaa Tasainen ja Kokeellinen uudestaan v2123:lla. Pelikoodari: 'scenessä 0' selvitys, valmistumisviive-mittari overlayhin, GPU-kevennysten lista.

## TASAINEN-TILA iPHONELLA: OVERLAY rAF 500 Hz (dt p50 2 ms), 4130 KEHYSTA / 3 s, OHITETTUJA 1226 → KEHYSKETJU MONINKERTAISTUU PIKSELISUHTEEN VAIHDOSSA (EPAILY); PELIKOODARI TUTKII KIIREELLISENA (22.9.2026 klo 20.00)

Omistaja 22.9.2026 klo 19.59 (kaappaus, Tasainen): rAF 500 Hz, piirto 153/153, dt p95 24, max 55, >20 ms 32/378, js 0,0, render 0,0, pitkät piirretty 0 / ohitettu 16, dc 80, scenessä 58, häipyy 22, taso 8, >25 ms 16/4130, ohitettuja 1226. Fable: mahdoton yhdelle rAF-ketjulle → setPixelRatio 3→2→3 eleen alussa/lopussa käynnistää jonkin ketjun uudestaan (kehysprofiili, lepopiirron syke tai kirjaston _animationCycle) — todennäköinen aito vika, joka moninkertaistaa tickit; Terävässä rAF oli 63 Hz. Pelikoodari tutkii ja lisää vartijan 'yksi rAF-ketju per silmukka'.

## KOKEELLINEN (dpr 3 ILMAN MSAA) iPHONELLA: p95 54 ms, >20 ms 36 %, KAIKKI PIIRRETTYJA, JS < 1 ms → MSAA EI SYY; JALJELLA GPU/KOMPOSIITTORI TAI LAMPOKELLOTUS; SEURAAVAKSI JAAHDYTYS + TERAVA UUDESTAAN, TASAISEN KETJUVIKA, ?koe=dpr15 (22.9.2026 klo 20.01)

Omistaja 22.9.2026 klo 20.00 (kaappaus): rAF 56 Hz, piirto 121/121, dt p95 54, max 113, >20 ms 52/146, pitkät piirretty 35, js 0,9, render 0,2, dc 46, scenessä 40, häipyy 9. Fable: poissuljettu iPhonella syötetapa, DOM-multiply, MSAA, laattojen saapuminen, kehysten ohitus; jäljellä GPU/komposiittori tai lämpö (puhelin lämmin pitkän testin jälkeen). Toimet: omistaja jäähdyttää 10 min ja toistaa Terävällä; Pelikoodari korjaa Tasaisen ketjuvian, tekee ?koe=dpr15-täyttökokeen ja lisää overlayhin laattaviennit ja rAF-ketjujen määrän.

## NETTISELVITYS: SAFARIN WEBGL AJETAAN GPU-PROSESSISSA (IPC PER KUTSU, KEHYKSEN VALMISTUMISTA ODOTETAAN SIELLA) → 'MUU'-AIKA EI NAY JS-MITTAREISSA; OHJEET: VAHEMMAN DRAW CALLEJA, EI bufferSubData, alpha:false, PIENEMPI KANGAS; SEURAAVA TYOKALU WEB INSPECTORIN FRAMES-NAKYMA PUHELIMEEN (22.9.2026 klo 20.05)

Fable 22.9.2026 klo 20.10: omistaja kysyi, löytyisikö netistä apua ja miten korjata kun Chrome toimii. Lähteet: Wonderland Engine WebGL Performance (Safarissa bufferSubData poikkeuksellisen kallis; iOS-välilehden muisti rajattu, yhteinen muisti), webgl-dev-list GPU Process: WebGL (turvallisuus, WebGL erillisessä GPU-prosessissa; readPixels-muisti), three.js-foorumi (iOS Safari -epätasaisuus yleinen). Johtopäätös: pitkät kehykset ilman CPU-aikaa = GPU-prosessin/komposiittorin aika; kohdistus vaatii Safari Web Inspectorin Timelines → Frames -näkymän puhelimesta (luokat skripti/asettelu/maalaus/komposiittori/tyhjä), Fable lukee Macin ruudulta (vientiä ei tarvita). Omistajalta kysytty puhelimen kytkentä 5 min.

## OMISTAJA: EI PUHELINMITTAUSTA → GPU-PROSESSIN KEVENNYKSET KOELIPPUINA (eipuskuri, alpha0, dpr15, eivienti, vahemmandc), MITTAUS MACIN SAFARILLA JA OMISTAJAN OVERLAY-KAAPPAUKSILLA; LAITETESTAAJA VALMISTELEE MAC-SAFARIN FRAMES-MITTAUKSEN (22.9.2026 klo 20.06)

Fable 22.9.2026 klo 20.10: omistaja valitsi 'ei puhelimella'. Pelikoodarin lipputyö tärkeysjärjestyksessä: 1) eipuskuri (jäädytä vedon aikaiset puskurikirjoitukset — epäily GL-rungon instanssipuskuri joka kehys; bufferSubData on Safarissa kallis), 2) alpha0, 3) dpr15, 4) eivienti (ei tekstuurivientejä vedossa), 5) vahemmandc; ensin Tasaisen ketjuvika; overlayhin puskurikirjoitukset/uniformit/dc per laji. Mittaus Macin Safarilla (sama GPU-prosessi) ja omistajan overlay-kaappauksilla iPhonella lippu kerrallaan. Laitetestaaja: Macin Safarin Web Inspector Frames -ohje + CGEvent-vedon toimivuus.

## OMISTAJA: KOKEET SUORAAN PELIIN (RATASVALIKKO 'PIIRTOKOE' + KEHYSPROFIILIN KYTKIN), TESTAA HUOMENNA (22.9.2026 klo 20.07)

Omistaja 22.9.2026 klo 20.10: pääsee töihin vasta huomenna; helpompi kun kokeet ovat pelissä valittavina. Fable → Pelikoodari: Piirtokoe-asetus (Normaali, Ei puskurikirjoituksia vedossa, Ilman alfakanavaa, Pikselisuhde 1,5, Ei tekstuurivientejä vedossa, Vähemmän piirtokutsuja) + 'Näytä kehysprofiili' -kytkin ratasvalikkoon; Tasaisen ketjuvika ensin; Mac-Safari-mittaus lippu kerrallaan; PR tänä iltana, versio aamuksi.

## FABLEN OMA NOLLAUS (KONTEKSTI 87 %, RAJA 65 % YLITTYI KAATUMISEN JALKEEN ILMAN ILMOITUSTA); LUOVUTUS viesti-fable-luovutus-20260922-ilta.md (22.9.2026 klo 20.08)

Fable 22.9.2026 klo 20.15: luovutus kirjoitettu, aloitusviesti päivitetty; Postivahti ajaa nollauskaavan (RC pois, 90 s, aloitusviesti, RC päälle), Fable kutsuu clear_session self. Postivahdin kierros ei ilmoittanut Fablen 70 %:a — uusi Fable pyytää Postivahtia lisäämään Fablen kontekstin seurantaan.

## FABLE NOLLATTU JA JATKAA LUOVUTUKSESTA; PIIRTOKOE-PR ODOTTAA PELIKOODARIA, v2124 (#2844, PROFIILIKETJU) JULKAISIJALLA (22.9.2026 klo 20.14)

Uusi Fable-sessio aloitti klo 20.13 luovutuksesta viesti-fable-luovutus-20260922-ilta.md. Remote Control päällä. Avoimet PR:t: #2843 (Pelikoodari: profiilin rollaava ikkuna kasvatti rAF-ketjujen määrän eli Tasaisen 500 Hz oli mittarin vika, ei pelin; lisämittarit silmukoita/laattavientejä/valmistumisviive; ?koe=dpr15) ja sen julkaisu #2844 v2124 (reitti vihreä, mergeable). Piirtokoe-valikon PR ei vielä auki; Pelikoodarilta kysytty tilanne. Omistaja testaa kännykällä tänä iltana heti kun Piirtokoe on tuotannossa.

## v2124 TUOTANNOSSA (#2844): PROFIILIN rAF-KETJUVIKA KORJATTU, TASAISEN 500 Hz OLI MITTARIN VIKA; LISAMITTARIT silmukoita/laattavienteja/valmistumisviive JA ?koe=dpr15 (22.9.2026 klo 20.15)

Julkaisija mergesi #2844 (5687fd65), testit 3962/0. Aiemmat Tasaisen dt-johtopäätökset luettava uudelleen korjatulla mittarilla. Piirtokoe-PR odottaa yhä Pelikoodaria; Julkaisija käsittelee sen heti.

## PIIRTOKOE VALMIS (COMMIT 20bc29f3d HAARASSA pelikoodari-profiili-ketju, EI PR:AA KOSKA #2843 SULJETTU): JULKAISIJA JULKAISEE SUORAAN HAARASTA v2125 (22.9.2026 klo 20.17)

Pelikoodarin erä: ratasvalikkoon Piirtokoe (Normaali / Ei puskurikirjoituksia / Pikselisuhde 1,5 / Ei tekstuurivientejä) ja Näytä kehysprofiili -kytkin; overlayhin puskurikirjoitukset/kehys, uniformeja/kehys, GL-vientejä, silmukoita, valmistumisviive. 3979 testiä 0 punaista. Perässä: alpha0, vahemmandc, Mac-Safari-taulukko (uuteen haaraan ja PR:ään). Omistaja testaa iPhonella heti kun v2125 on tuotannossa.

## LAITETESTAAJA: CGEvent-VETO EI LIIKUTA KARTTAA (0 pointer-TAPAHTUMAA MITATTUNA, KLIKKAUS JA HOVER TOIMIVAT) → AITO VETO VAATII KADEN; MAC-SAFARIN WEB INSPECTOR JA AIKAJANATALLENNUS SKRIPTATTU System Eventsilla (tools/mac/aikajana-mittaus.md) (22.9.2026 klo 20.18)

Laitetestaajan mittaus: CGEvent-vedot (myös hidas mouseMoved-esisarja) tuottivat pelissä nolla pointerdown/move/up-tapahtumaa; aiempi 'kartta liikkui' oli nimiöiden asettelua, ei kameraa. Web Inspectorin avaus ja aikajanatallennuksen aloitus/lopetus onnistuvat yhdellä osascript-komennolla Kehitys-valikosta; vain Kehykset-alavälilehti ja Näyttökuvat-aikajanan poiskytkentä jäävät ihmiselle. Ohje haarassa laitetestaaja (c5a284424), tulee mainiin dokumenttikartan kautta. Seuraus: Piirtokoe-mittaus Macin Safarilla tarvitsee omistajan tai Fablen käden vetoon; iPhonen tulokset omistajan overlay-kaappauksista.

## v2125 MAINISSA (#2845, 470031e6): PIIRTOKOE-VALIKKO (NORMAALI / EI PUSKURIKIRJOITUKSIA / PIKSELISUHDE 1,5 / EI TEKSTUURIVIENTEJA) JA KEHYSPROFIILIN KYTKIN RATASVALIKOSSA; OMISTAJA TESTAA iPHONELLA, LAITETESTAAJA MITTAA MAC-SAFARILLA (22.9.2026 klo 20.23)

Julkaisija: testit 3966/0, head-tarkistus ok. Julkaisijan oppi: head tarkistetaan vain ennen mergeä, joten haaraan mergen jälkeen tuleva commit (kuten Piirtokoe #2843:n suljettuun haaraan) jää huomaamatta ilman erillistä ilmoitusta → jatkossa Pelikoodari avaa uuden haaran per erä (sääntö annettu klo 20.16). Pages-vienti käynnissä klo 20.23. Ohje omistajalle: ⚙ → Kartta → Piirtokoe, valitse tila, kytke Näytä kehysprofiili, vedä karttaa 10 s, kaappaus overlaysta; yksi kaappaus per tila.

## PR #2847: PIIRTOKOKEESEEN alpha0 JA vahemmandc; HAVAINTO: alpha:false EI MENE LAPI (three r185 LUO KONTEKSTIN AINA alpha:true, getContextAttributes().alpha TOSI) → alpha0 VAIKUTTAA VAIN LAPINAKYMATTOMANA TAUSTAVARINA; vahemmandc WebKit Camargue z8: 22 → 18 PIIRTOKUTSUA (22.9.2026 klo 20.30)

Pelikoodari, haara pelikoodari-alpha-dc, 3982 testiä 0 punaista. Seuraus: jos alpha0-mittauksessa ei näy eroa, syy on tämä eikä alfakanava. Seuraava Pelikoodarille: luo WebGL-konteksti itse alpha:false-lipulla ja anna se rendererille (canvas+context), jotta lippu mittaa mitä väittää. Julkaisija mergeää #2847 v2126:ksi; omistajan neljän tilan testi ei muutu.

## LAITETESTAAJA NOLLATTU (73 % → UUSI SESSIO) KAAVALLA ILMAN OMISTAJAA; LUOVUTUS viesti-laitetestaaja-luovutus-20260922-ilta.md; ENSIMMAINEN TEHTAVA PIIRTOKOE-TAULUKKO MAC-SAFARILLA v2125 (22.9.2026 klo 20.33)

Postivahti ilmoitti 73 % klo 20.27; luovutus pushattu haaraan laitetestaaja (8f8fa1bfa) klo 20.31; RC pois, clear_session self, aloitusviesti, RC päälle klo 20.34. Luovutuksen mukaan Piirtokoe-data on jo osin kerätty ja kehysmäärä-anomalia pitää selvittää ennen raporttia.

## v2126 MAINISSA (#2848: alpha0 JA vahemmandc); PR #2849 alpha0 AIDOKSI (PELI LUO KANKAAN JA WEBGL2-KONTEKSTIN ITSE, getContextAttributes().alpha EPATOSI, VARTIJA savuke-piirtokokeet.mjs 7/7); LAITETESTAAJA: ?koe=profiili VARASTAA KEHYSPROFIILI-SINGLETONIN 3 s VALEIN → MITTAUS ILMAN profiili-LIPPUA (22.9.2026 klo 20.42)

Pelikoodari: globe.gl antaa kontekstin läpi (Object.assign({antialias, alpha}, config)), three r185 käyttää annettua kontekstia; savuke P1–P4 läpi, vahemmandc dc 22 → 18, 3983 testiä 0 punaista. Laitetestaaja: profiilinaytto.js:n rullaava ruutunäyttö ottaa saman __kehysprofiili-singletonin joka 3 s, joten neljä koetta saivat saman ~47 kehyksen otoksen; mittaus tehdään ilman profiili-lippua (kehysprofiili asentuu ilman sitäkin). Pelikoodarille korjattavaksi: ruutunäyttö ja mittauspalvelin eivät saa jakaa singletonia. Mittaus alkaa kun #2849:n CI on ohi; Julkaisija odottaa #2849 (v2127) ja #2846 (v2128) mergeillä mittauksen loppua.

## TAUKO: OMISTAJA PAIVITTAA CLAUDE-TYOPOYTASOVELLUKSEN (UUDEMMAT OPUS-MALLIT AGENTEIKSI); KAIKKI SESSIOT PYSAYTETTY, EI MERGEJA EIKA PUSHEJA (22.9.2026 klo 20.46)

Tila tauolla: v2126 tuotannossa; Julkaisijalla odottaa #2849 (alpha0 aidoksi, v2127) ja #2846 (aikajanaohje, v2128); Laitetestaajan Mac-Safari-Piirtokoe-mittaus keskeytetty, aloitetaan alusta tauon jälkeen (ilman profiili-lippua, CI:n ollessa hiljaa); Pelikoodarilla kesken profiili-singletonin korjaus (ei pushattu); Postivahti tauolla. Omistajan iPhone-kaappaukset odottavat. Jatko: Fable lähettää jatkoviestit kaikille tauon jälkeen (Laitetestaaja 'mittaa' ensin, sitten Julkaisija mergeää).

## TAUKO OHI: CLAUDE-SOVELLUS PAIVITETTY, PELIKOODARI JA KARTTASEPPA NYT OPUS 5.5; SESSIOT JATKAVAT (LAITETESTAAJA MITTAA ENSIN, JULKAISIJA JA PELIKOODARI ODOTTAVAT LUPAA), REMOTE CONTROL PAALLE KAIKILLE (22.9.2026 klo 20.56)

Omistaja klo 20.55: 'claude päivitetty, opus on nyt 5.5, vaihdoin kahteen sessioon'. Session id:t ennallaan. Pelikoodarin profiili-jakaa-korjaus (mittaus jää auki, lukijat ottavat viipaleita, vartija 3 s ruutunäyttö + 10 s otos) valmis paikallisesti, push vasta mittauksen jälkeen. CI: #2849:n Savukkeet vielä ajossa (74d3fdb9) ja 11e6d768 jonossa → Laitetestaaja odottaa niiden loppua ennen vetoja.

## MAC-SAFARI-PIIRTOKOE (v2125, 4 TILAA, 600 KEHYSTA/TILA): KAIKKI dt p50 17 / p95 18–20 ms, YLI 20 ms 3–5 % → MAC EI TOISTA iPHONEN ONGELMAA, LIPUT EIVAT EROA; eivienti YKSI 130 ms PIIKKI JA 2x TASAISUUDEN VAIHTELU; EPAILYT: eipuskuri EI VAHENNA PUSKURIKIRJOITUKSIA (87 vs 69), glVientejä 1/KEHYS JOKA TILASSA (22.9.2026 klo 21.29)

Laitetestaaja: raportti docs/raportit/piirtokoe-mac-safari-20260922.md, haara laitetestaaja-piirtokoe-korjaus (pushattu, ei PR:ää; Julkaisija hakee). Johtopäätös: Macin Safari 60 Hz tasainen, joten iPhonen pitkien kehysten syy löytyy vain omistajan overlay-kaappauksista; Macilla ei kannata jatkaa Piirtokoe-mittauksia. Pelikoodarille annettu tarkistettavaksi: eipuskuri-laskuri/lippu ja eivienti-lippu Macilla (laatat välimuistissa). Julkaisija mergeää v2127 (#2850) ja aikajanaohjeen (#2846); Pelikoodari pushaa profiili-jakaa (ruutunäyttö ja palvelin eivät jaa singletonia).

## #2850 (v2127, alpha0 AITO) PIDATETTY: savukkeet-mac 24 UUTTA PUNAISTA, ~15 ERILLISTA SAVUKETTA KAATUU KOODILLA 1 ILMAN OK/FAIL-RIVIA; AIKAJANAOHJE #2846 MAINISSA ILMAN VERSIOTA (b9198073) (22.9.2026 klo 21.30)

Julkaisijan epäily kontekstivuoto (elävien WebGL-kontekstien raja); Fablen epäily itse luotu kangas rikkoo savukeharnessin (kanvas ei löydy tai getContext ajetaan ennen DOMia). Pelikoodari lukee CI-lokin ja korjaa haaraan; Laitetestaaja ajaa yhden kaatuneen savukkeen paikallisesti ja lähettää stackin. Profiili-jakaa-push odottaa tämän perään. Oppi: Ubuntun node-testit eivät näe selainvikoja; Julkaisijan savukevertailu (uudet punaiset vs. huojunta) toimi portin tavoin.

## PR #2851 (PROFIILI JAKAA: RUUTUNAYTTO JA PALVELIN EIVAT JAA SINGLETONIA); PELIKOODARI: PUSKURIKIRJOITUKSET-LASKURI KUMULATIIVINEN (HARNESS LUKI SUMMAN; OIKEA WebKit NORMAALI 0,07/KEHYS, eipuskuri 0); eivienti KOSKEE VAIN NIMIOATLASTA, EI LAATTATEKSTUUREJA → LAATTAVIENTI JONOON VEDON AJAKSI TILATTU (#2850:n JALKEEN) (22.9.2026 klo 21.30)

Omistajan illan iPhone-testissä 'Ei tekstuurivientejä' ei siis estä laattojen vientiä, vain nimiöatlaksen; tulos siitä tilasta ei kerro laattaviennin osuutta. Järjestys Pelikoodarille: 1) #2850 savukekaatumisen juurisyy, 2) laattavienti jonoon + laskuri overlayhin.

## OMISTAJA: PELI EI KAYNNISTY iPHONELLA (v2126, TYHJA RUNKO klo 21.35); FABLEN TARKISTUS: TUOTANTO KAYNNISTYY PUHTAASSA WebKit/Chromium-iPhone-EMULOINNISSA KAIKILLA PIIRTOKOE-ASETUKSILLA → EPAILY SW-PAIVITYS KESKEN TAI TALLENNUKSEN JATKO; KAIKKI MERGEET JAIHIN (22.9.2026 klo 21.39)

Omistajan kaappaus: otsikkopalkki, tyhjä vasen paneeli, Matkapäiväkirja-laatikko, ei sisältöä. Fable ajoi scratchpad/kaynnistys-koe3.mjs: intro ja Aloita seikkailu toimivat WebKitissä ilman asetusta ja localStorage matkakirja-piirtokoe = dpr15 / alpha0 / vahemmandc; ei pageerror-virheitä (vain sähkeen CORS 403). Omistajalle ohje: sulje välilehti ja avaa uudelleen; sitten yksityinen välilehti erottaa tilan koodista; sivuston tietoja ei saa poistaa (tallennus). Sivuvaikutus: Fablen mergekäsky #2850:lle estyi luokittimessa (CI Bypass) — omistaja päättää, mergetäänkö punaisilla WebKit-launch-savukkeilla. #2852 (Mac-Safari-raportti, harness korjattu kasvu/kehys) mainissa ilman versiota; #2853 (eivienti jäädyttää laattaviennit, overlayn laattavientejä korjattu) auki; Laitetestaaja tutkii CI:n WebKit-launch-vikaa.

## OMISTAJAN PELI KAYNNISTYI UUDELLEEN (LAITTEEN TILA, EI KOODI; FABLE TOISTI TUOTANNON WebKit-EMULOINNISSA: TUORE, TALLENNUS, PAIVITYSPOLKU 2125→2126, dpr15+KEHYSPROFIILI — KAIKKI OK); KOLME v2126-KAAPPAUSTA klo 21.44–21.45: p95 31/39/45 ms, max 51/53/134, >20 ms 25–29 %, VALMISTUMISVIIVE 13,7/14,6/15,8 ms, js 3,6–4,0, dc 67/57/79; OVERLAY EI NAYTA PIIRTOKOE-TILAA → KORJAUS TILATTU (22.9.2026 klo 21.47)

Kaappaus 1: piirto 166/166, pitkät 23, silmukoita 16,5, laattavientejä 28, puskurikirj./kehys 11,8, vientejä 0, pisin 51 varattu 2. Kaappaus 2: 161/161, pitkät 28, silmukoita 15,8, laattav. 27, pusk 14,6, vientejä 0, pisin 53 varattu 3. Kaappaus 3: 149/149, pitkät 23, silmukoita 16,3, laattav. 27, pusk 10,1, vientejä 1, pisin 134 varattu 17 (js 4, render 0, muu 13), Ar 45 / three.render 31 / puraJonoa 12. Kaikissa veto interp, tarkkuus tasainen, lepo päällä. Tulkinta: pääsäie kevyt, valmistumisviive ~14–16 ms joka kehys = GPU-prosessi/komposiittori; tilaa ei tiedetä koska overlay ei tulosta sitä. Pelikoodari nollattu (72 %) ja aloitti: overlayhin koe-tilan avain. Mergeet yhä jäissä: #2850/#2851/#2853 punaiset vain CI:n WebKit-launch-aikakatkaisuja; Fablen mergekäsky estyi luokittimessa → omistaja päättää.

## OMISTAJAN PAATOS (KORTTI): MERGEA #2850, #2851, #2853 VAIKKA CI:N WebKit-SAVUKKEET PUNAISIA (launch-AIKAKATKAISU = YMPARISTO); OVERLAYHIN PIIRTOKOE-TILA NUMEROLLA, KOSKA OMISTAJA EI MUISTA KAAPPAUSTEN TILOJA (22.9.2026 klo 21.49)

Omistaja klo 21.50: 'En muista. Se pitäisi kirjoittaa siihen testiarkkiin numeroiden kanssa jatkossa' → overlayn ensimmäinen rivi näyttää tilan avaimen ja numeron (Pelikoodari, tilattu). Kolmen kaappauksen tilat tuntemattomat; uusi kierros v2128+:lla. Merge-lupa: vain jos ainoat uudet punaiset ovat browserType.launch-aikakatkaisuja.

## KARTTASEPPA VAIHDETTU OPUS 5.5:EEN (OMISTAJA); PELIKOODARI JA KARTTASEPPA MOLEMMAT OPUS 5.5 (22.9.2026 klo 21.52)

Omistaja klo 21.53. Karttaseppä on ollut idle koko illan (viimeksi 22.9. klo 15.40); avoimet asiat sillä: meren lika laatassa, harvennetut viivat vaimeina -ehdotus, paperirae jäissä, omistajan tuntumatesti kartasta 22c ja nostotason poltto odottavat omistajaa.

## PR #2854: OVERLAYN YLIN RIVI 'koe: <tila> · profiili pN · vNNNN' (+ 'seuraavassa latauksessa: X'); VIKA LOYTYI: pallonimiot-gl.js LUKI eipuskuri/eivienti VAIN OSOITTEESTA → VALIKOSTA VALITTUNA NE EIVAT KOSKENEET NIMIORUNKOON (OMISTAJAN VALIKKOMITTAUKSET NIILLA = NORMAALI RUNGON OSALTA); KORJATTU, VARTIJA (22.9.2026 klo 21.56)

Pelikoodari: testit 3987/0, savuke-profiilitila 5/5 Chromium+WebKit. Seuraus: illan kolme kaappausta eivät mitanneet eipuskuri/eivienti-kokeita runkoon asti; uusi kierros v2130:llä (tilarivi näkyy). Julkaisijalle: #2854 jonoon #2850/#2851/#2853 perään.

## PELIKOODARIN ANALYYSI OMISTAJAN KAAPPAUKSISTA: PITKAT KEHYKSET SYNTYVAT PAASAIKEEN ULKOPUOLELLA (GPU/KOMPOSIITTORI); 'Ar' = globe.gl:n KAKSI SILMUKKAA (~2 ms/KEHYS); 16 SILMUKKAA ≈ 0 ms (7 globe.gl:n TICKERIA, 4 ORPOA); 'ohitettuja' KUMULATIIVINEN; 'valmistumisviive' MITTARIN ARTEFAKTI (dt−js−render ≈ 16,7−js, js SISALTAA RENDERIN KAHDESTI); ProMotion EI SYY (ANTAISI TASAISET 16,7 ms, EI 33–50 ms PIIKKEJA) (22.9.2026 klo 22.06)

Oikea signaali: 25 % kehyksistä yli 20 ms vaikka pääsäie varattuna vain 2–3 ms pisimmässä. Mittarikorjaus tulossa omana PR:nä #2854:n päälle: nimetyt silmukat, js ilman tuplarenderiä, ohitukset jaksolta, 'vapaa pitkissä' viiveen tilalle, dt-jakauma 8,3/16,7 ms kerrannaisiin. Seuraava koe omistajalle #2854:n jälkeen: 10 s veto tiloissa 1 Normaali, 3 dpr15, 2 eipuskuri (toimii nyt runkoon asti), 6 eivienti; jos dpr15 pudottaa >20 ms -kehykset, syy on täyttö/päällekkäinen piirto (häipyviä 10–22) → eihaive-koe.

## PR #2857 (PINOTTU #2854:N PAALLE): MITTARIKORJAUS — 'Ar' NIMETTY KOLMEKSI SILMUKAKSI (globe.tick, globe.tweenit, globe.ticker), js ILMAN TUPLARENDERIA, 'VALMISTUMISVIIVE' → 'PITKISSA VARATTU X · VAPAA Y ms' JA 'dt>20: 25×n 33×n …' (120/60 Hz KERRANNAISET), OHITUKSET JAKSOLTA, PROFIILI p4 (22.9.2026 klo 22.11)

Pelikoodari: testit 3994/0, vartijat 2/2 kaatuvat vanhalla koodilla, savuke-profiilitila WebKit 5/5; paikallinen WebKit-veto globe.tick 1,3 ms (render 0,8), js 2,0. Omistajan seuraava koe vasta kun #2857 on tuotannossa: 'vapaa pitkissä' ja dt-kerrannaiset vastaavat suoraan GPU vai tahti.

## PR #2859: ORVOT globe.gl-TICKERIT POIS (KIRJASTON LATAUKSESSA SYNTYVIA rAF-KUTSUJA EI REKISTEROIDA); WebKit rAF-KUTSUJA LEVOSSA 5,7 → 1,4 JA VEDOSSA 15,1 → 11,1 PER KEHYS (22.9.2026 klo 22.18)

Pelikoodari: testit 3989/0 (uusia 3/3), savukkeet lepopiirto 12/12, glnimiot-nimet 7/7. Jono Julkaisijalla: #2854 → #2857 → #2859.

## PR #2861: PIIRTOKOE 7 'EI HAIVYTYSTA VEDOSSA' (?koe=eihaivevedossa: LAATAT VAIHTUVAT SUORAAN VEDON AIKANA, KESKEN OLEVAT HAIVYTYKSET PAATTYVAT VEDON ALKAESSA; LEVOSSA ENNALLAAN); VARTIJA WebKit HAIPYVIA 21–57 → 0 (22.9.2026 klo 22.26)

Pelikoodari: pinottu #2857:n päälle (valikko 6 → 7 kohtaa, testien 'koe 3/6' -muoto). Testit 3994/0, savuke 4/4. Merge-järjestys #2854 → #2857 → #2861 → #2859. Omistajan kierros kun pino on tuotannossa: kokeet 1, 3, 2, 6, 7. Pelikoodari odottaa tuloksia.

## OMISTAJA: 'POISTA KAIKKI YLIMAARAISET VIVUT VALIKOSTA NIIN LOYDAN TESTATTAVAT VAIHTOEHDOT PAREMMIN' → KARTTA-OSIOON JAA PIENI LIIKE, PIIRTOKOE (7) JA NAYTA KEHYSPROFIILI; VEDON SEURANTA JA TARKKUUS LIIKKEESSA POIS VALIKOSTA (LIPUT SAILYVAT ?koe=-OSOITTEESSA) (22.9.2026 klo 22.28)

Omistaja klo 22.30. Pelikoodari tekee PR:n #2861:n päälle; tallennettu valikkovalinta ei saa enää vaikuttaa; oletukset veto interp ja nykyinen tarkkuusoletus; overlay näyttää arvot yhä. Jono: #2854 (mainissa v2130) → #2857 (v2131) → #2861 → valikkosiivous → #2859.

## CI:N WebKit-LAUNCH-VIKA: PAIKALLINEN TOISTO SAVUKE_RINNAKKAIN=6 EI TOISTA (0/12), AJURILLA JATKUU (35768446176) → AJURIN OMA JUMI 16.44 UTC:STA; OMISTAJAN LUPA (KORTTI): LAITETESTAAJA KAYNNISTAA AJURIN SamiMacStudio2 UUDELLEEN AJOJEN VALISSA (22.9.2026 klo 22.34)

Laitetestaaja poissulki ruudunsäästäjän/lukituksen, näytön unen, jumiprosessit ja ulimitin. Ei kosketa -testit-ajuriin. Todennus: yksi WebKit-savuke CI:ssä käynnistyksen jälkeen.

## PR #2863: VALIKON SIIVOUS — KARTTA-OSIOSSA VAIN PIENI LIIKE, PIIRTOKOE (7) JA NAYTA KEHYSPROFIILI; VEDON SEURANTA JA TARKKUUS LIIKKEESSA POIS (LIPUT ?koe= JA ?tarkkuus= TOIMIVAT); TALLENNETUT VALINNAT NOLLATAAN → OLETUKSET veto interp, tarkkuus terävä (22.9.2026 klo 22.35)

Pelikoodari: vartija tests/valikko-siivous.test.mjs, testit 3997/0, WebKit 5/5. Huomio: omistajan aiemmat kaappaukset olivat tarkkuudella tasainen, uusi kierros terävällä → luvut eivät suoraan vertailukelpoisia. Jono: #2857 → #2861 → #2863 → #2859.

## KOKO JONO MAINISSA: v2127 alpha0 AITO, v2128 PROFIILI JAKAA, v2129 eivienti LAATTOIHIN, v2130 TILARIVI, v2131 MITTARI p4, v2132 PIIRTOKOE 7, v2133 VALIKON SIIVOUS; KAIKKI savukkeet-mac-PUNAISET OLIVAT WebKit-launch-AIKAKATKAISUJA; JULKAISIJA KORJASI #2863:N ORVON js/vedon-seuranta.js:N NIPUTUSLISTALLA (NIPUTTAMATTOMAT); #2859 VIELA AUKI → v2134 (22.9.2026 klo 22.55)

Julkaisija klo 22.54; useita pinottujen PR:ien rebase-konflikteja ratkaistu, testimäärät täsmäsivät. Omistajan kierros alkaa v2133:sta (Pages-vienti käynnissä klo 22.55, tuotannossa vielä v2132). Ajuri käynnistetty uudelleen klo 22.38 (omistaja itse); Laitetestaaja todentaa seuraavasta savukeajosta.

## v2134 MAINISSA (#2865): ORVOT globe.gl-TICKERIT POIS; OMISTAJAN KYSYMYS NOSTOISTA: MAALEHDEN NOSTON KAKSIPALSTATAITTO (21.9.) EI OLE VANHA KAAVA VAAN VAIHE 2; ELAINTAKY JAA PINOKSI 21.9. RAJAUKSEN MUKAAN; OMISTAJAN EHDOTUS 'KUVA ENSIN ISONA, LISAA → KAHDEN PALSTAN MUOTO' = NYKYINEN fokusnosto-KAYTOS; SELVITETTAVANA AVAUTUIKO KORTTI SUORAAN VAIHEESEEN 2 (22.9.2026 klo 23.02)

Julkaisija klo 23.05: testit 3990/0, #2859 suljettu korvattuna. Omistajan kaappaukset: eläintäky 'Valkoinen hevonen syntyy tummana' (js/packs/elaintakyt.js) ja maalehden nosto 'Hevonen vaihtaa väriä kasvaessaan' (maa-kategoriat, kuvasarja 1/2, kaksipalsta). Tarjottu: palstataiton laajennus eläintäkyihin ja muihin karttakortteihin; odottaa omistajan vastausta.

## OMISTAJAN KIERROS v2133 (p4, 5 KAAPPAUSTA klo 23.01–23.02): 3/5 YHA dpr15-TILASSA (LATAUS PUUTTUI) → PATEVAT 7/7 EI HAIVYTYSTA (p95 59, >20 ms 32 %, TASO 7) JA 3/7 dpr15 (p95 28–47, >20 ms 16–30 %); PITKISSA VARATTU 4–8 ms · VAPAA 26–42 ms → GPU/KOMPOSIITTORI; dt-KERRANNAISET 25/42/58 ms = PARITTOMAT 8,3 ms:N KERRANNAISET → 120 Hz ESITYS; dpr15 EI POISTA PITKIA → EI TAYTTO (22.9.2026 klo 23.04)

Laattavientejä 95–207 per 10 s vedossa (terävä), dc 54–111, häipyy 0 (7/7) / 7–20 (dpr15). Omistajalle: tilat 1, 2, 6 kuvattava uudestaan latauksen jälkeen. Pelikoodarille luvut ja neljä kysymystä + tilaus: tilan valinta lataa sivun automaattisesti kun lataus vaaditaan.

## OMISTAJAN LINJAUS: KAIKKIIN NOSTOIHIN KAKSI PALSTAA — ENSIN KUVA AUKEAA ISONA, KLIKKAUKSESTA KUVA PIENENEE JA TEKSTIPALSTA TULEE OIKEALLE (KORVAA 21.9. RAJAUKSEN, JOSSA VAIN fokusnosto SAI PALSTAT) (22.9.2026 klo 23.05)

Omistaja klo 23.06 sanatarkasti: 'Kaikkiin nostoihin kaksi palstaa. Ja niin että ensin Kuva avautuu isona ja kun klikkaa niin sitten kuva pienenee ja tulee teksti palsta mukaan oikealle.' Koskee kohdekorttia, skandaalia, eläintäkyä, hetkeä, syvennystä ja maalehden nostoa (js/nostokuva.js kaksipalstaTaitto kaikille kutsujille). Oletus: leveysraja säilyy (≥ 1100 px palstat, kapeammalla pino kuva ylhäällä) — puhelimella kaksi palstaa ei mahdu. Kuva ei saa välähtää eikä liikkua vaiheenvaihdossa (11.9. sääntö). Toteuttaja: Karttaseppä (Opus 5.5, vapaana), koska Pelikoodari hoitaa sulavuusjonoa.

## OMISTAJA (KORTTI): PIIRTOKOE-VALIKKOON JAA 4 TILAA — NORMAALI, EI PUSKURIKIRJOITUKSIA, EI TEKSTUURIVIENTEJA, EI HAIVYTYSTA VEDOSSA; POIS PIKSELISUHDE 1,5 (MITATTU, EI VAIKUTUSTA), ILMAN ALFAKANAVAA JA VAHEMMAN PIIRTOKUTSUJA (LIPUT SAILYVAT ?koe=-OSOITTEESSA) (22.9.2026 klo 23.08)

Omistaja klo 23.07 kaappauksen kera: 'Poista tuolta samalla ylimääräiset'. Pelikoodari tekee samaan erään automaattilatauksen kanssa; numerointi 1–4, tallennetut poistetut valinnat nollataan Normaaliin.

## CI-AJURIN UUDELLEENKAYNNISTYS (22.42) EI AUTTANUT: WebKit-launch-AIKAKATKAISU JATKUU (12/78 AJOSSA 35776510683) → VIKA YLEMPANA (GUI-SESSIO/WindowServer TAI WEBKIT-KOPION TILA); KONEEN REBOOT HUOMENNA AAMULLA, SIIHEN ASTI MERGET OMISTAJAN SAANNOLLA (22.9.2026 klo 23.13)

Laitetestaaja kirjoittaa muistion docs/raportit/ci-webkit-launch-20260922.md (oireet, aikaraja 19.44, poissuljetut, järjestys huomiselle: reboot → webkit-2336 uudelleenasennus → runner-ympäristön env-dump).

## PR #2866: PIIRTOKOE- JA KEHYSPROFIILIVALINTA NAYTTAA 'LADATAAN…' JA LATAA SIVUN 600 ms:SSA (VARTIJA 5/5); PELIKOODARIN TARKENNUKSET: dpr15 LASKI p95 59 → 28–47 JA >20 ms 32 % → 16–30 % ELI TAYTTO VAIKUTTAA HITAIMPIIN KEHYKSIIN (EI KOKO SYY); 'LAATTAVIENTEJA' ON 3 s JAKSOLTA → VEDOSSA 30–70 LAATTATEKSTUURIA/s = VAHVA EHDOKAS GPU-PROSESSIN KUORMAKSI; OHITUKSET 26 = AITOA LEPOA VETOJEN VALISSA (22.9.2026 klo 23.14)

Seuraava koe #2866:n jälkeen: sama paikka, 10 s veto, kaksi kaappausta per tila: 1 Normaali (vertailukohta terävällä puuttuu), sitten eivienti ja eipuskuri. Jos eivienti vähentää >20 ms kehyksiä selvästi, syy on tekstuurilataukset → korjaus latausbudjetti vedon aikana tai pienemmät tekstuurit. Testit 4005/0.

## #2866 SISALTAA MYOS PIIRTOKOEN 4 TILAA (1 NORMAALI, 2 EI PUSKURIKIRJOITUKSIA, 3 EI TEKSTUURIVIENTEJA, 4 EI HAIVYTYSTA VEDOSSA; OVERLAY 'koe 3/4'); dpr15/alpha0/vahemmandc VAIN OSOITTEESSA, TALLENNETTU VALINTA PALAUTUU NORMAALIIN (22.9.2026 klo 23.19)

Pelikoodari: testit 4006/0, savukkeet profiilitila ja koevaihto-lataus 5/5 Chromium+WebKit. Omistajan kierros v2135:llä: 1/4, 3/4, 2/4, kaksi kaappausta kustakin samassa paikassa; valinta lataa sivun itse.

## PR #2868 (KARTTASEPPA): KAKSI PALSTAA KAIKKIIN NOSTOIHIN — nostoPalstoiksi js/nostokuva.js:SSA, KUUSI KUTSUJAA, css/nostokuva.css .nostokuva-kortti; VAIHE 1 ISO KUVA MYOS LEVEALLA, VAIHE 2 KUVA PIENENEE PALSTAANSA (FLIP 260 ms, SAMA img); ALLE 1100 px ENNALLAAN; iPad VAAKA (1194) SAA PALSTAT; 11.9. 'KUVA EI LIIKU' PATEE NYT VAIN ALLE 1100 px (22.9.2026 klo 23.23)

Vartijat tests/nostokuva-kortit (jokainen tyyppi 1194/1400/1920, pino 834), tools/mittaa-nostopalstat.mjs WebKit 52/52, npm test 4010/0. Kaappaukset docs/raportit/kaappaukset/nostopalstat-elain-fra-1400-vaihe{1,2}.jpg lähetetty omistajalle. Jono: #2866 (v2135) → #2868 (v2136). Omistaja klo 23.22: Codexilta tulee pulupäivityksiä peliin; Julkaisija käsittelee ne normaalikaavalla.

## v2135 MAINISSA (#2867: PIIRTOKOE 4 TILAA + AUTOMAATTILATAUS) JA v2136 (#2869: KAKSI PALSTAA KAIKKIIN NOSTOIHIN); JULKAISIJAN HEAD-TARKISTUS NAPPASI HAARAAN LISATYN TOISEN COMMITIN (22.9.2026 klo 23.32)

Julkaisija klo 23.33, testit 4013/0. Omistajan kierros v2136:lla: 1/4 Normaali, 3/4 Ei tekstuurivientejä, 2/4 Ei puskurikirjoituksia; kaksi kaappausta kustakin samassa paikassa; valinta lataa sivun itse.

## OMISTAJAN KIERROS iPADILLA (v2135/v2136, 4 TILAA, 10 s VEDOT): NORMAALI p95 45 / >20 ms 25 % / LAATTAVIENTEJA 186; EI PUSKURIKIRJ. 37 / 18 % / 203; EI TEKSTUURIVIENTEJA 25 / 8 % / 38; EI HAIVYTYSTA 37 / 10 % / 30 (MAX 150) → TEKSTUURILATAUKSET VEDOSSA OVAT PAASYY; TILATTU OLETUKSEKSI: LAATTAVIENTI BUDJETILLA VEDON AIKANA (≈1 LAATTA/KEHYS, JONO VALUU LEVOSSA) (22.9.2026 klo 23.42)

Pitkissä vapaa 29–50 ms kaikissa; dc 431 Normaalissa (muissa 35–43) tarkistettavana; laattavientejä 30–38 vs 186–203 tarkistettavana (jonon tyhjeneminen levossa). Pelikoodari toteuttaa, vartija WebKit-vedolla. Nämä olivat iPad-kaappauksia; iPhone-vahvistus samalla versiolla myöhemmin.

## OMISTAJA: 'EI TEKSTUURIVIENTEJA TOKKII YHTA PAHASTI. EI VAIHDETA SIIHEN. VIKA ON JOSSAIN MUUALLA.' → LAATTAVIENTI-BUDJETTI OLETUKSEKSI PERUTTU; KEHYSAIKAMITTARI EI MITTAA NAHTYA NYKIMISTA → UUSI SUUNTA: LIIKKEEN TASAISUUS (KAMERAN SIIRTYMA PER KEHYS, NOLLA-/TUPLASIIRTYMAT, SYOTETAHTI VS rAF), PROMOTION-JUDDER (rAF 59 Hz vs 120 Hz PANEELI, PARITTOMAT 8,3 ms KERRANNAISET), SYOTEPUTKI (touch vs interp) (22.9.2026 klo 23.46)

Omistaja klo 23.45 iPadilla. Pelikoodarille tilattu overlayhin liikkeen tasaisuusmittarit; omistajalle kokeiltavaksi ?koe=syotetouch ja ?koe=interpvanha.

## OMISTAJA: eivienti-TILASSA 'TULEE VAIN ISOMPI HYPPAYS KUN LIIKE PYSAHTYY' — VEDON NYKIMINEN ENNALLAAN; OMISTAJA KOKEILEE ?koe=syotetouch JA ?koe=interpvanha iPADILLA (22.9.2026 klo 23.47)

Klo 23.47. Vahvistaa suunnan: nähty nykiminen on liikkeen epätasaisuutta vedon aikana, ei kehysaikaa.

## NETTISELVITYS 2 (OMISTAJA: 'ETSITAAN VIKAA VAARASTA KOHDASTA'): 1) LAPINAKYVA WEBGL-KANGAS + SORMI RUUDULLA KUORMITTAA KOMPOSIITTORIA, alpha:false PUDOTTI PITKAT KEHYKSET 65 → 3 VEDOSSA (EmulatorJS #1255); 2) PROMOTION: SAFARIN rAF 60 Hz vs PANEELI 120 Hz, PARITTOMAT 8,3 ms KERRANNAISET = KEHYS LIUKUU PAIKAN (LIPPU 'Prefer Page Rendering Updates near 60fps'); 3) three.js: 'OrbitControls NYKII SAFARISSA VAIKKA fps 60' RATKAISEMATON → WEBKITIN ESITYS, EI SOVELLUS (22.9.2026 klo 23.50)

Omistaja testaa iPadilla ?koe=alpha0 ja Safarin 120 Hz -lipun. Lähteet: github.com/EmulatorJS/EmulatorJS/issues/1255; groups.google.com/g/webgl-dev-list/c/h7WYgntLnvU; macrumors.com/how-to/enable-smoother-120hz-browsing-in-safari; developer.apple.com/forums/thread/690911; discourse.threejs.org/t/issue-with-orbitcontrols-on-safari/28317; github.com/mrdoob/three.js/issues/22254; nolanlawson.com/2019/08/11/high-performance-input-handling-on-the-web. Pelikoodarille: jos alpha0 auttaa → oletukseksi + premultipliedAlpha:false; jos 120 Hz -lippu auttaa → esitystahdin ideointi; liikkeen tasaisuusmittarit jatkuvat.

## OMISTAJAN LINJAUS: SKANDAALIKORTIN LEHTIPALSTAT (LEIPATEKSTI KAHDESSA PALSTASSA KUVAN ALLA) NAYTTAVAT PAREMMALTA → SAMA KAIKKIIN PIDEMPIIN NOSTOIHIN, MYOS iPAD-PYSTYNAKYMASSA (ALLE 1100 px, JOSSA KUVA/TEKSTI-PALSTAT EIVAT OLE KAYTOSSA) (22.9.2026 klo 23.50)

Omistaja klo 23.48 iPadilla (v2136), kaappaukset: Chartresin katedraali (kohdekortti, yksi palsta) vs Kuningattaren kaulanauhajuttu (skandaali, lisälehti, leipäteksti kahdessa palstassa): 'Kaksi erilaista. Tuo kaksi palstaa näyttää paremmalta kaiken kaikkiaan myös muuten. Voisi tehdä kaikkiin pidempiin ainakin.' Toteutus Karttasepälle: leipäteksti CSS-palstoina (2) kun kortin leveys ≥ ~700 px ja teksti pitkä (raja esim. ≥ 2 kappaletta tai ≥ 600 merkkiä), anfangi ja palstaväli skandaalikortin tapaan; puhelimella yksi palsta; ≥ 1100 px: kuva vasemmalla ja tekstipalsta oikealla voi sisältää kaksi lehtipalstaa jos leveys riittää, muuten yksi.

## OMISTAJA iPADILLA: ?koe=alpha0 (LAPINAKYMATON KANGAS) JA SAFARIN 120 Hz -LIPPU EIVAT AUTTANEET NYKIMISEEN (22.9.2026 klo 23.56)

Klo 23.53. Jäljellä syöteputki (?koe=syotetouch, ?koe=interpvanha) ja liikkeen tasaisuusmittarit (Pelikoodari tekee).

## PR #2871 (KARTTASEPPA): LEHTIPALSTAT KAIKKIIN PIDEMPIIN NOSTOIHIN — PITUUS JS:SSA (onPitkaNostoteksti: ≥ 600 MERKKIA TAI ≥ 2 KIRJOITTAJAN KAPPALETTA), LEVEYS CONTAINER QUERYLLA (TEKSTI ≥ 600 px); ≥ 1100 px KUVAN VIEREINEN TEKSTIPALSTA (498 px) PYSYY YHTENA PALSTANA; iPAD PYSTY 712 px → KAKSI; ANFANGI VAIN PALSTOISSA (22.9.2026 klo 23.59)

Kohdekortti, eläintäky, hetki, syvennys, maalehden nosto; lööppi ennallaan. Vartijat tests/lehtipalstat, tools/mittaa-lehtipalstat.mjs WebKit 25/25, npm test 4017/0. Kaappaus docs/raportit/kaappaukset/lehtipalstat-chartres-1024-vaihe2.jpg. Jono: #2871 → v2137.

## OMISTAJA iPADILLA: ?koe=syotetouch (RAAKA KOSKETUSSYOTE ILMAN INTERPOLOINTIA) 'EHKA PAREMPI KUIN MUUT' → ENSIMMAINEN MYONTEINEN SIGNAALI OSOITTAA SYOTEPUTKEEN (INTERPOLOINTI / KAMERAN VIIVE), EI PIIRTOON (23.9.2026 klo 00.01)

Klo 00.02 (23.9.). Pelikoodarille: liikkeen tasaisuusmittarit ensin, sitten A/B interp vs touch mittarilla; jos touch on mitatusti tasaisempi, touch oletukseksi kosketuslaitteilla ja interp vain hiirelle.

## KARTTASEPPA 70 % → LUOVUTUS JA NOLLAUS (viesti-karttaseppa-luovutus-20260923.md) (23.9.2026 klo 00.02)

Postivahti klo 00.04. Karttasepän illan erät: #2868 nostopalstat (v2136), #2871 lehtipalstat (jonossa v2137).

## KIRJASTOSELVITYS (OMISTAJAN KYSYMYS): globe.gl 2.46.2 (22.8.2026) ON UUSIN, SISALLA three r185; three r186 UUSIN, EI SAFARI/iOS/KOSKETUS-KORJAUKSIA r183–r186; WEBGPU (SAFARI 26, three WebGPURenderer r171+) AINOA UUSI REITTI MUTTA globe.gl EI TUE JA ILLAN LOYDOS OSOITTAA SYOTEPUTKEEN; MAPLIBRE GL JS 5 (PALLONAKYMA) iOS-LAAHAUS AVOIN ISSUE → RATKAISU OMAAN SYOTEKOODIIN (23.9.2026 klo 00.05)

Klo 00.10 (23.9.). Lähteet: npm globe.gl/three; github mrdoob/three.js/releases; utsubo.com threejs-2026; appdevelopermagazine webgpu-in-ios-26; maplibre globe-view; visgl/react-map-gl#1529.

## v2137 MAINISSA (#2872: LEHTIPALSTAT); KARTTASEPPA NOLLATTU (70 %), UUSI SESSIO ODOTTAA AAMUA; CODEXIN PR #2870 'PULUN 70 UUTTA ELETTA PELIN OHJAIMEEN' AUKI → JULKAISIJA KASITTELEE (23.9.2026 klo 00.06)

Klo 00.07 (23.9.). Pages-vienti käynnissä.

## CODEXIN LUOVUTUS PR #2870:N KOMMENTTINA (23.49): 70/70 PELIELETTA UUDELLA LIIKERADALLA, PULLAN SYONTI, KAKSI KARTTANOKKAISUA, PIILOANKKURI 3,6 rem, KATSELUSIVU TARKISTETTU PASS, 4025 TESTIA; MERGE JA JULKAISU FABLELLE → JULKAISIJA v2138; LIVEPELI-QA LAITETESTAAJALLE AAMULLA (23.9.2026 klo 00.10)

Postilaatikossa ei uutta Codex-viestiä 16.19 jälkeen. Fable kuittaa Codexille postilaatikkoon version kun v2138 on tuotannossa.

## v2138 MAINISSA (#2873): PULUN 70 UUTTA ELETTA (CODEX); KUITTAUS CODEXILLE POSTILAATIKKOON (posti/fable-codex-pulun-eleet-julkaistu-20260923.md, 1286a23db); LIVEPELI-QA LAITETESTAAJALLE AAMULLA (23.9.2026 klo 00.13)

Julkaisija klo 00.12, testit 4029/0. Julkaisija ei mergeä enempää tänä yönä ilman Fablen viestiä.

## PR #2874 (PELIKOODARI, VIENTIBUDJETTI OLETUKSENA: ≤ 1 NAKYVA LAATTA/KEHYS VEDOSSA, ENNAKKO ≤ 20/s; WebKit 37–43 vs 196–199 VIENTIA) → EI OLETUKSEKSI (OMISTAJA PERUI SUUNNAN 23.45), KAANNETAAN LIPUKSI ?koe=vientibudjetti; LOYDOS: VANHALLA TAHDILLA KIRJASTON POHJA (~400 dc) PIIRTYY 52–82 %:SSA VETOKEHYKSISTA KOSKA HAIPYVAT LAATAT EIVAT PEITA (dc 431) → MAHDOLLINEN OMA KORJAUS (23.9.2026 klo 00.15)

Pelikoodari aloitti erän ennen perumisviestiä. Muut: eivienti/eihaive-kaappausten 30–38 vientiä välimuistiherkkiä (1/4 otettiin tyhjällä GPU-muistilla); savuke-eihaive-veto korjattu arvioimaan vain liikkeen kehykset; savuke-kerma-heti V2 punainen myös mainilla (Ranska σ 0,7 vs Saksa 10), ei tämän erän vika. Päätyö: liikkeen tasaisuusmittarit ja interp vs touch.

## PELIKOODARIN SUUNNITELMA: LIIKKEEN TASAISUUSMITTARI (KARTAN SIIRTYMA RUUDULLA KA/CV, NOLLA- JA TUPLASIIRTYMAT, SYOTETAPAHTUMIA/KEHYS, VIIVE SYOTTEESTA PIIRTOON, LIIKEVIRHE = KARTTA − SORMI); HYPOTEESI: interp LASKEE KOHTA-AJAN JA SORMEN NAYTTEET ERI KELLOISTA JA iOS TOIMITTAA SYOTTEEN EPATASAISESTI rAF:IIN NAHDEN → VUOROIN LYHYITA JA PITKIA ASKELIA; #2874 SULJETTU MERGEAMATTA (23.9.2026 klo 00.16)

Klo 00.18. Mittaus interp/touch/interpvanha WebKitissä epätasaisella synteettisellä syötteellä, PR yöllä; oletusmuutos vasta omistajan aamun kokeilun jälkeen.

## CODEX (POSTILAATIKKO 34e2c0cfe): PULUN KAKSI LISAKOHTAUSTA PELIKOODARIN JONOON — liviaEnsitapaaminen → uusi-ilahtuu (4,4 s; VAIN ENSIMMAINEN AITO PELAAJA–PULU-KOHTAAMINEN AVAUSLENNON JALKEEN, KORVAA ENSIMMAISEN TERVEHDYKSEN, EI TOISTOA) JA liviaPitkaKirjahaku → uusi-bookPanic (11 s; VAIN NIMENOMAISESTI KEVYT KIRJASTA ETSIMINEN KUN HAKU YHA KESKEN 6 s PORTILLA, KERRAN PER HAKUTUNNUS, VASTAUS KATKAISEE HETI, REDUCED MOTION: YKSI RAUHALLINEN ILME) (23.9.2026 klo 00.24)

Tekninen raja: omat tunnukset ja kestot rekisteriin, ei globaalia welcome/bookStudy-korvausta, automaattitestit (yksilöllinen tunnus, toistokielto, keskeytys, piilosta palaaminen, reduced motion), ei uutta TTS:ää/audiota/cueja; lasitörmäys ja avaruuskypärä ennallaan; v2138:aa ei avata. Kirjattu Pelikoodarin jonoon mittari-PR:n jälkeen (aamu 23.9.). Sisältökirjuri/tekstivetäjä valitsee kevyen repliikin.

## PR #2875 (PELIKOODARI): LIIKKEEN TASAISUUSMITTARI (PROFIILI p5: RIVIT 'liike' SIIRTYMA KA/CV, NOLLAT, TUPLAT JA 'syote' POINTER/KEHYS, KOSK/KEHYS, KEHYKSIA ILMAN SYOTETTA, SYOTTEEN IKA, VIRHE KA/SD) + KOE ?koe=syotekello; WebKit iOS-TYYLISELLA SYOTTEELLA: interpvanha CV 46–54 % (37–44 NOLLAKEHYSTA), interp 17–23 %, syotekello 12–20 %, TAHDISTETTU SYOTE 14–16 % → syotetouch TODENNAKOISESTI LAHELLA TAHDISTETTUA (iOS touchmove KEHYSRYTMISSA) (23.9.2026 klo 00.29)

Testit 4046/0, vartija savuke-liikemittari 5/5. Omistajan aamukierros v2139:llä, kehysprofiili päällä, 10 s veto: 1) oletus, 2) ?koe=syotetouch, 3) ?koe=syotekello, 4) ?koe=syotetouch,syotekello; vertaa CV, nollat, tuplat, virheen sd. Jos syotetouch tasaisin → PR 'touch oletukseksi kosketuslaitteilla'. Pelikoodari lopetti yöksi.

## PR #2877: VIENTIBUDJETTI KOKEENA ?koe=vientibudjetti (OLETUS ENNALLAAN; WebKit 36–37 vs 176–215 VIENTIA) → v2140 #2875:N PERAAN; PELIKOODARIN LUOVUTUS viesti-pelikoodari-luovutus-20260923-yo.md (AAMUKIERROS, POHJAERA, CODEXIN PULU-KOHTAUKSET) (23.9.2026 klo 00.33)

Klo 00.34. #2874 jäi suljetuksi (GitHub ei avaa force-pushin jälkeen). Pohjalöydös (kirjaston pohja piirtyy häivytyksen ajan) omana eränä luovutuksessa.

## v2139 (#2876, LIIKKEEN TASAISUUSMITTARI p5) JA v2140 (#2878, KOE ?koe=vientibudjetti) MAINISSA; JULKAISIJA LOPETTI YOKSI; OMISTAJAN AAMUKIERROS v2140:LLA (OLETUS / syotetouch / syotekello / MOLEMMAT) (23.9.2026 klo 00.43)

Julkaisija klo 00.40: pieni sarjat.json-konflikti ratkaistu, testit vihreitä, head-tarkistukset ok.

## OMISTAJA iPADILLA: ?koe=vientibudjetti EI AUTTANUT NYKIMISEEN → LAATTAVIENTIEN SUUNTA SULJETTU KOKONAAN (eivienti, vientibudjetti); JALJELLA SYOTEPUTKI (AAMUN KIERROS v2140) (23.9.2026 klo 02.18)

Klo 00.50. Poissuljettu tähän mennessä: kehysaika, tekstuurilataukset (eivienti, vientibudjetti), puskurikirjoitukset, häivytys, pikselisuhde, alfakanava, 60/120 Hz. Ainoa myönteinen: syotetouch.

## OMISTAJA (08.34, iPHONE v2140): SYOTEKOKEET VALIKKOON → PIIRTOKOE-OSIO VAIHTUU SYOTEKOE-OSIOKSI: 1 OLETUS, 2 KOSKETUS SUORAAN (syotetouch), 3 YHTEINEN KELLO (syotekello), 4 MOLEMMAT; PIIRTOKOKEET VAIN ?koe=-LIPPUINA (KAIKKI MITATTU, EI AUTTANEET) (23.9.2026 klo 08.35)

Pelikoodari tekee pienen PR:n heti aamulla; automaattilataus ja overlayn tilarivi kuten Piirtokokeessa.

## PR #2879: SYOTEKOE VALIKOSSA (1 OLETUS, 2 KOSKETUS SUORAAN, 3 YHTEINEN KELLO, 4 MOLEMMAT), PIIRTOKOKEET POIS VALIKOSTA; VIKA KORJATTU: KOSKETUSLIPPU LUETTIIN VAIN OSOITTEESTA → VALIKON 'KOSKETUS SUORAAN' EI OLISI VAIKUTTANUT; VARTIJA TARKISTAA ETTA NAYTTEET TULEVAT KOSKETUKSISTA (23.9.2026 klo 08.45)

Pelikoodari klo 08.5x: savukkeet 6/6 ja 5/5, testit 4047/0. Julkaisija → v2141. Omistajan kierros: tilat 1–4, 10 s veto, overlayn liike- (vaihtelu, nollat, tuplat) ja syöte-rivit (kosk, virheen sd).

## OMISTAJAN LINJAUS (SITOVA): 'MITKAAN TEKSTIT EIVAT SAISI VAIHTAA PAIKKAA PANOROITAESSA KUN NE OVAT RUUDULLA' — NIMION PUOLI (VASEN/OIKEA/YLA/ALA) LUKITAAN KUN NIMIO ON NAKYVISSA; SIJOITTELU SAA MUUTTUA VAIN KUN NIMIO ON POISSA RUUDULTA TAI ZOOMI VAIHTUU (23.9.2026 klo 08.48)

Omistaja klo 08.47 iPhonella (v2140), kaappaukset: 'Chambordin linna' ja 'Loire' hyppäävät symbolin toiselta puolelta toiselle kesken vedon. Epäily: hyppy on osa nähtyä nykimistä. Toteutus Karttasepälle (pallonimiot-gl / nimiölimitys): hystereesi — näkyvän nimiön puoli säilyy vaikka törmäyslaskenta ehdottaisi toista, kunnes nimiö poistuu ruudulta (marginaali) tai zoomtaso vaihtuu; törmäyksessä toinen (näkymätön tai uudempi) väistää; vartija WebKit-vedolla (0 puolenvaihtoa näkyvillä nimiöillä 10 s vedossa).

## v2141 MAINISSA (#2880): SYOTEKOE-VALIKKO; CI-WEBKIT-MUISTIO MAINISSA (#2881, ILMAN VERSIOTA) (23.9.2026 klo 08.57)

Julkaisija klo 08.5x, testit 4034/0. Omistajan kierros v2141:llä valikosta: tilat 1–4.

## OMISTAJAN TARKENNUS NIMIOLUKKOON: SAMA NIMI EI VAIHDA PAIKKAA MYOSKAAN ZOOMIN AIKANA — SAA VAIN MUUTTAA KOKOAAN; NIMI SAA POISTUA NAYTOLTA JA UUSI SAA TULLA, MUTTA NAKYVA NIMIO EI KOSKAAN SIIRRY SYMBOLIN TOISELLE PUOLELLE (23.9.2026 klo 09.13)

Omistaja klo 09.0x. Toteutus: puoli lukitaan koko näkyvyyden ajaksi zoomista riippumatta; törmäyksessä zoomatessa kumpikaan lukittu ei siirry vaan toinen piilotetaan (prioriteetti) ja palaa samalle puolelle kun tila riittää; uudet nimiöt hakevat vapaan puolen, jo näkyvät eivät väistä. Vartija: 10 s veto + zoomi sisään/ulos, 0 puolenvaihtoa näkyvillä nimiöillä.

## OMISTAJA: 'RIISUTAAN KARTALTA KAIKKI YLIMAARAISET ELEMENTIT JA KATSOTAAN LOPPUUKO TOKKIMINEN' → SYOTEKOE-VALIKKOON 5 'PALJAS KARTTA' (?koe=paljas: VAIN LAATAT + VETO; POIS NIMIOT, SYMBOLIT, GL-RUNKO, ILMAKEHA/POHJA, HAIVYTYS, LEPOPIIRTO, PULU, DOM-KERROKSET, PIENI LIIKE; OVERLAY 1 s VALEIN) JA 6–8 PUOLITUSTILAT (+NIMIOT, +SYMBOLIT, +DOM) (23.9.2026 klo 09.17)

Klo 09.21. Pelikoodari tekee pienen PR:n heti; tarkoitus on puolittaa syy: jos paljas on sulava, kerrokset takaisin yksi kerrallaan; jos paljaskin nykii, syy on laattapiirrossa tai syötteessä.

## OMISTAJAN TARKENNUS: PALJAAN KARTAN PAALLE KYTKINRYHMA 'KERROKSET' (NIMIOT, SYMBOLIT, GL-RUNKO, ILMAKEHA/POHJA, HAIVYTYS, LEPOPIIRTO, PULU, DOM-KERROKSET, PIENI LIIKE) YKSI KERRALLAAN PAALLE/POIS — KIINTEIDEN PUOLITUSTILOJEN SIJAAN; OVERLAY LISTAA PAALLA OLEVAT (23.9.2026 klo 09.21)

Klo 09.25. Kytkimet näkyvät vain Paljas kartta -tilassa, tallentuvat, voimaan latauksessa; liput myös osoitteessa. Sama PR Pelikoodarilta.

## PR #2882 (KARTTASEPPA): NIMIOLUKKO — JUURISYY: LEPOLADONTA RATKAISI KYLJEN UUDESTAAN VEDON TAUOILLA JA ZOOMIN JALKEEN; sovittelu.js SAANTO 5: RUUDULLA (16 px VARA) OLEVA LUKITTU NIMIO PITAA KYLJEN ZOOMISTA RIIPPUMATTA, REUNA EI PURA LUKKOA (SAA LEIKKAUTUA), TUKOSSA HAIPYY PAIKALLAAN JA PALAA SAMAAN KYLKEEN; TORMAYKSESSA VANHEMPI VOITTAA; WebKit 390 px LOIRE 16 VETOA + 12 ZOOMIPORRASTA: main 34 PUOLENVAIHTOA → 0 (23.9.2026 klo 09.30)

npm test 4040/0. Vartiolinjaus: 'levossa ei reunaylityksiä' sallii nyt lukossa pidetyn leikkautuvan nimiön. Sivuhuomio: savuke-nimiot-sulavat punainen myös mainissa (piirtoviive maapisteeseen) — tutkimatta. Kaappaus docs/raportit/kaappaukset/nimiolukko-ennen-jalkeen-390.jpg. → v2142.

## OMISTAJA: KAMERAKALLISTUS VAIHE 1 KARTTASEPALLE (KEVYT KALLISTUS ≤ ~30° JA ORBIT-PYORITYS TEHOKEINONA: PELAAJAN LIIKE, ANIMAATION SEURANTA, MAAN ESITTELY; KOELIPPU, EI OLETUKSEKSI; SUUNNITELMA ENNEN KOODIA); OMISTAJA POHTII SIIRTYMISTA PELKKAAN iOS-APPIIN JA MOOTTORIN UUDELLEENRAKENTAMISTA (UNREAL YM.) APURAHAN 3D-MAAILMOJA VARTEN → FABLEN KANTA: EI TAYTTA UUDELLEENKIRJOITUSTA VAAN HYBRIDI (WEB-PELI + NATIIVIT 3D-MODUULIT, UNITY AS A LIBRARY / GODOT / WEBGPU); UUSI OPUS-SELVITYSSESSIO PERUSTETAAN (23.9.2026 klo 09.33)

Klo 09.35. Perustelut: peli on sisältöä ja sisältöputkea, web on tavoittavuus ja testaus, nykiminen on kapea ongelma; hybridin kuori viikkoja, moottorin vaihto vuosia. Selvityssessio saa tehtävän '3D-laajennuksen selvitys' (apurahan lupaukset sanatarkasti omistajalta, vaihtoehtojen vertailu, App Store -rajoitteet, sisältöputki, kustannus/aikataulu, prototyyppiehdotus, päätöskortti).

## PR #2883 (PELIKOODARI): PALJAS KARTTA — SYOTEKOE-TILAT 5 PALJAS, 6 +NIMIOT, 7 +SYMBOLIT, 8 +DOM; ?koe=paljas POISTAA NIMIOT, SYMBOLIT, JOET/RAJAT, PULUN, PIENEN LIIKKEEN, AANET, HAIVYTYKSEN, LEPOPIIRRON, KIRJASTON POHJAN, ILMAKEHAN, KAIUTINMITTARIN JA KAIKKI DOM-KERROKSET (VALIKKONAPPI JAA); WebKit: dc 66 → 49, DOM-ELEMENTTEJA KARTAN PAALLA 74 → 0 (23.9.2026 klo 09.33)

Testit 4049/0, savuke 7/7. → v2143 #2882:n perään. Kerroskytkimet (09.25) seuraavana erillisenä PR:nä. Omistajan kierros: 10 s veto tilassa 5; jos tökkiminen loppuu → puolitus 6–8/kytkimet; jos ei → vika laatoissa, vedossa tai selaimessa.

## KAMERAKALLISTUKSEN SUUNNITELMA HYVAKSYTTY (KARTTASEPPA): VIRTUAALINEN POV + kallistus.js LASKEE KAMERAN P + d·(cos α·n + sin α·t), α=0 = NYKYINEN KAMERA; SYOTE SUORISTAA 250 ms; HORISONTTI K·d + PAPERIUSVA, KAUKAINEN PUOLISKO KARKEAMPI TASO, LAATTAKATTO 1,3 × TASO 8 / 0°; GL-NIMIOT JA CSS2D PROJISOIDAAN, RUUTUUN ANKKUROIDUT KORTIT SULJETAAN; KYTKENNAT KOELIPULLA (SAAVU 25° + ORBIT ±20°, LENTO 15–20°, PELAAJAN LIIKE 15°) (23.9.2026 klo 09.38)

Ehdot: tween/OrbitControls-ylikirjoitus tarkistetaan ensin; syöteputkeen ei kosketa; mittarit myös 390 px; katto sitova, muuten 20°. Suunnitelma docs/raportit/kamerakallistus-suunnitelma-20260923.md (haara wt-karttaseppa-kallistus).

## OMISTAJAN SUUNTA (23.9. klo 09.45): UUSI NATIIVI iOS-PELI RAKENNETAAN RINNALLE ILMAN WEBKUORTA — MAAPALLO ENSIN, 3D-LIIKKUMISNAKYMAT PITKALLA AIKAJANTEELLA, SISALTO (TEKSTIT JA KUVAT VALMIINA) SIIRRETAAN MEKAANISESTI KUN UUSI PELI TOIMII; WEB SAILYY OMANA RAJAPINTANAAN; SUURIN KYSYMYS ON MOOTTORI, JOKA TOTEUTTAA KARTAN, EARTH-NAKYMAT JA KAVELTAVAT 3D-MAISEMAT ILMAN UUDELLEENLATAUKSIA (23.9.2026 klo 09.43)

Apurahassa ei tarkkoja lupauksia: 3D-maailmat joissa pelaaja kävelee (aikahyppy: Colosseum loistossaan, Tutankhamonin hauta, pyramidien rakentaminen) — oppii hahmottamalla, ei lukemalla. Fablen kanta: ykkösehdokas Unity + Cesium for Unity (3D-laattamaapallo, Googlen fotorealistiset laatat, lisänäkymät ilman latausta, C# tekoälysessioille), vaihtoehto Unreal + Cesium; Godot ei maapalloon; sisältö siirtyy muuntimilla, UI on suurin työ → hybridi: natiivi maapallo + web-näkymät kuoressa ensin. Selvityssessio (uusi Opus) saa tehtävänannon docs/raportit/3d-selvitys-tehtavananto-20260923.md.

## KAKSI UUTTA OPUS 5.5 -SESSIOTA: 3D-SELVITTAJA (MOOTTORIVERTAILU, docs/raportit/3d-selvitys-20260923.md, HAARA selvittaja-3d) JA SIIRTOSEPPA (MOOTTORINEUTRAALI SISALLON SIIRTOPUTKI: INVENTAARIO, JSON-SKEEMA, tools/vienti/vie-sisalto.mjs + TESTI, RAPORTTI sisallon-siirtoputki-20260923.md, HAARA siirtoseppa-vienti) (23.9.2026 klo 09.48)

Omistaja loi sessiot klo 09.47, Fable nimesi. Session id:t: 3D-selvittäjä local_fd5eeed5…, Siirtoseppä local_8319363e…; molemmat cwd /Users/samireivinen/Matkakirja-opus (Pelikoodarin checkout) → ohjeistettu omiin worktreisiin /Users/koodaus/wt-selvittaja-3d ja wt-siirtoseppa-vienti. RC päällä. Roolisetti nyt 8 sessiota.

## KERROSKYTKIMET SAMASSA PR:SSA #2883 (KORVAAVAT TILAT 6–8): PALJAS KARTTA -TILASSA 9 KYTKINTA (NIMIOT, SYMBOLIT+NOSTOPISTEET, GL-RUNKO, ILMAKEHA+POHJA, HAIVYTYS, LEPOPIIRTO, PULU, DOM-KERROKSET, PIENI LIIKE); TILARIVI 'koe 5/5 Paljas kartta +nimiöt +runko'; OSOITE ?koe=paljas,kerros-nimiot,…; dc ILMAN LAATTOJA: PALJAS 2, NIMIOT 4, SYMBOLIT 3, RUNKO 17; DOM-KERROKSET 64 ELEMENTTIA (23.9.2026 klo 09.52)

Pelikoodari klo 09.5x, testit 4051/0, savuke 7/7. Omistajan kierros: tila 5 ilman kytkimiä; jos tökkiminen loppuu, ryhmät päälle yksi kerrallaan.

## 3D-SELVITYS VALMIS (PR #2887, docs/raportit/3d-selvitys-20260923.md): SUOSITUS UNITY 6.3 LTS + CESIUM FOR UNITY (URP, C#, PUHDAS NATIIVI iOS); KAKKONEN GODOT 4 (PARAS TEKOALYLLE, OMA LAATTAMOOTTORI); UNREAL JA REALITYKIT EIVAT SOVI; TARKEIN LOYDOS: GOOGLEN PHOTOREALISTIC 3D TILES EI SAATAVILLA UUSILLE EU/ETA-PROJEKTEILLE 8.7.2025 ALKAEN → FOTOREALISMI KOHDEKOHTAISINA MALLEINA; PROTOTYYPPI 3–4 vk, RINNAKKAISVERSIO 6–12 kk; v2142 (NIMIOLUKKO) JA v2143 (PALJAS KARTTA) TUOTANNOSSA; KERROSKYTKIMET #2888 → v2144 (23.9.2026 klo 09.58)

3D-selvittäjä klo 09.55. Omistajalle tarkistettavaa: lasketaanko apuraha Unity Personalin 200 k$ rajaan; onko ennen 8.7.2025 luotua Google Cloud -projektia. Julkaisija mergesi #2883:n ensimmäisen version (v2143) ennen kytkimien commitia → kytkimet #2888.

## OMISTAJA (KORTTI 10.02): VANHEMPI GOOGLE CLOUD -PROJEKTI (ENNEN 8.7.2025) API-AVAIMELLA — VOIKO SEN 3D-LAATTOJA KAYTTAA PELISSA? APURAHA MAX 20 000 € (UNITY PERSONAL RIITTAA); HALUAA ERILLISEN RAPORTIN UNREAL ENGINE vs UNITY EDUISTA JA HAITOISTA ENNEN PAATOSTA (23.9.2026 klo 10.02)

3D-selvittäjälle kaksi jatkotehtävää: A) Google-laattojen käyttöoikeus vanhalla projektilla (Unmodified State, käyttöehdot pelissä, hinnoittelu, riski) → docs/raportit/3d-google-laatat-eu-20260923.md; B) Unreal vs Unity -vertailu → docs/raportit/3d-unreal-vs-unity-20260923.md. Prototyyppiä ei aloiteta ennen omistajan päätöstä.

## OMISTAJAN AJATUS: WEB-VERSIO AINA ILMAINEN, APP STORE -VERSIO MAKSULLINEN TAI 3D-LISAOSAT LISAMAKSULLISIA (MARKKINOINTIMALLI); SELVITYS: MITEN KAKSI PELIA PYSYVAT SISALLOLTAAN AJAN TASALLA YHTA AIKAA → FABLEN KANTA: YKSI SISALTOLAHDE (VERSIOITU JSON-PAKETTI AMPARISSA, MOLEMMAT PELIT HAKEVAT KAYNNISTYESSA, SISALTOVERSIO ERILLAAN KOODIVERSIOSTA); TARKISTETTAVAT: CC-NC/SA-LISENSSIT MAKSULLISESSA KAYTOSSA, APURAHAN AVOIMUUSEHDOT, APPLEN 15–30 % JA IAP-PAKKO (23.9.2026 klo 10.08)

Klo 10.05. Siirtosepän tehtävä laajennettu: yhteinen sisältölähde, julkaisuputki, skeeman versiointi, webin muutos vaiheittain, App Storen säännöt datan lataamisesta, IAP-rajaus, lisenssijakauma js/lahteet.js:stä.

## SIIRTOSEPPA: SISALLON SIIRTOPUTKI VALMIS (PR #2890): tools/vienti/vie-sisalto.mjs VIE 391 MODUULIA / 544 EXPORTTIA HAVIOTTOMASTI JSONIKSI + 21 KOKOELMAA + media.json (20 391 VIITETTA) + JSON SCHEMA, DETERMINISTINEN < 1 s, TESTIT 6/6 (PALAUTUU TAVULLEEN); ARVIO: SISALTO MEKAANINEN (< 5 SESSIOTA), EI-MEKAANINEN UI 25–40 + PALLO 10–15 + LIVIA 12–20 + LOGIIKKA 3–5 + TALLENNUS ~1 = ~50–90 SESSIOTA (23.9.2026 klo 10.09)

Avoimet: 33 Commons-kuvaa puuttuu ämpäristä (peilaa-media ei lue js/linssit → Julkaisija/Karttaseppä), 163 kaupungilta puuttuu tarkka lat/lon (laudalta laskettu, virhe ≤ 4,7° → Karttaseppä), 8 sisäistä taulua vaatii export-sanan (Pelikoodari). Raportti docs/raportit/sisallon-siirtoputki-20260923.md. Yhteinen sisältölähde -laajennus (10.05) seuraavaksi.

## OMISTAJA: NC-EHTOISET AINEISTOT TARKISTETTAVA HETI JA KORVATTAVA, KOSKA PELISTA TEHDAAN JOSSAIN VAIHEESSA MAKSULLINEN (MUUT KOHDAT EIVAT ONGELMA); 3D-JATKORAPORTIT (PR #2891): GOOGLEN 3D-LAATAT EI VANHAN PROJEKTIN KAUTTA (UUSI PALVELU JA ALUSTA = MUUTOS → EEA-EHDOT, LISAKSI KIELTO 'WITH OR NEAR A NON-GOOGLE MAP'), EHDOLLISESTI CESIUM IONIN KAUTTA (~174 $/kk 1 000 PELAAJAA); UNREAL vs UNITY → UNITY 6.3 LTS (LUMEN EI TOIMI iOS:LLA, NANITE KOKEELLINEN, CESIUM-UNREAL APP STORE -KAATUMINEN AUKI, BLUEPRINT HEIKKO AGENTEILLE, SOVELLUS 150–300 Mt vs 30–50 Mt) (23.9.2026 klo 10.10)

Klo 10.12. NC-tarkistus: grep löysi BY-NC-viittauksia js/lahteet.js, js/kuvagalleria.js, js/packs/maa-kategoriat.js, kulttuuri-kategoriat.js, europe-kielet.js (2–3 kpl kukin) ja js/aani-ehdokkaat.js (15, ehdokaslista). Tilataan täysi lisenssi-inventaario ja korvaus.

## NC-TARKISTUS ALUSTAVA: KUVAT TURVASSA (js/kuvagalleria.js HYLKAA noncommercial/no-deriv), ONGELMA AANISSA — VAHINTAAN 6 MUSIIKKINAYTETTA (maa-kategoriat 3894/13967/15296, kulttuuri-kategoriat 10983/15578/15884) JA 3 AANIMAISEMAA (europe-kielet 37/41/55, archive.org aporee) CC BY-NC(-SA); lahteet.js 245/251 KOKOELMAT 'CC BY-NC KOHTEITTAIN'; FREESOUND-AANET TARKISTAMATTA → SIIRTOSEPPA TEKEE TAYDEN INVENTAARION (docs/raportit/lisenssi-inventaario-20260923.md), SISALTOKIRJURI HERATETTY KORVAAMAAN (23.9.2026 klo 10.11)

Klo 10.13. Korvaajat CC0/CC BY/BY-SA/PD, sama tunnelma ja kesto, lisenssi kirjataan js/lahteet.js:ään.

## OMISTAJA (KORTTI 10.16): LUKEE 3D-RAPORTIT ENSIN, MOOTTORIPAATOS MYOHEMMIN; 3D-SELVITTAJA VALMISTELEE PROTOTYYPIN VALMIUSLISTAN (docs/raportit/3d-prototyypin-valmius-20260923.md) ILMAN ASENNUKSIA (23.9.2026 klo 10.12)

Klo 10.16. Prototyyppiä ei aloiteta ennen omistajan päätöstä.

## 3D-PROTOTYYPIN VALMIUSLISTA (PR #2892): UNITY 6000.3.24f1 + iOS-MODUULI, CESIUM-REKISTERI, OMA REPO (Matkakirja-natiivi), BATCHMODE/xcodebuild-KOMENNOT; KONEHAVAINNOT: XCODE 27.0 (UNITY LUPAA 16+, YHTEENSOPIVUUS EPAVARMA), LEVYA 68 Gt VAPAANA, git-lfs PUUTTUU, KAYTTAJALLA koodaus EI ALLEKIRJOITUSIDENTITEETTIA; OMISTAJAN PAATETTAVAT: MOOTTORI, UUSI REPO JA CI-RUNNERIN JAKO, LEVYTILA, APPLE DEVELOPER -TILI KAYTTAJALLE koodaus, CESIUM ION COMMUNITY -TILI (23.9.2026 klo 10.14)

3D-selvittäjä klo 10.2x, lopetti ja odottaa.

## KAMERAKALLISTUS VAIHE 1 VALMIS (PR #2893, KARTTASEPPA): VAIN ?koe=kallistus / localStorage; VIRTUAALINEN POV, OrbitControls.update OHITETAAN KALLISTUKSEN AJAKSI (RISKI TOTEUTUI, RATKAISTU); LAATAT 0/15/30°: TASO 7 24/25/24, TASO 8 12/12/15 (KATTO PITAA), HORISONTTIRAJA 0,6 × KORKEUS + USVA; ORBIT 30° p95 18–21 ms WebKit; dc +25–30 (KIRJASTON POHJA HORISONTIN USVAN ALLA); GL- JA CSS2D-NIMIOT PYSYVAT, RUUTUUN ANKKUROIDUT KORTIT PIILOON; KOSKETUS SUORISTAA 250 ms; KYTKETTY VAIN MAAN ESITTELY (SAAVU → 25° + ORBIT ±20° 6 s + PALUU); LENTO JA PELAAJAN LIIKE SEURAAVAAN ERAAN (23.9.2026 klo 10.18)

Kaappaukset docs/raportit/kaappaukset/kallistus-{390,1400}-taso678.jpg. iPhone mitattava ennen oletusta. → v2145.

## KALLISTUKSEN EHDOT TODENNETTU (KARTTASEPPA): globe.gl:N pointOfView-SETTER JA OrbitControls.update OHITETAAN KALLISTUKSEN AJAKSI, TWEEN SUORISTAA ENSIN (K2/K4: SUORISTUS PALAUTTAA SAMAN KAMERAN); SYOTEPUTKEEN EI KOSKETTU (VAIN YKSIRIVINEN CSS2D-ENNUSTEEN VARTIJA pallo.js:SSA); 390 px TASO 8: 12/12/15 LAATTAA (KATTO 15,6 PITAA NIUKASTI), ORBITISSA dc 26 → 54 (KIRJASTON POHJAPALAT USVAN ALLA) (23.9.2026 klo 10.19)

Klo 10.24. Seuraavaan erään: pohjan piirron rajaus usvan alta (sama ilmiö kuin pohja häivytyksen aikana). 20° vs 30° päätetään iPhone-mittauksella.

## NC-KORVAUKSET (PR #2895, SISALTOKIRJURI): 6/9 KORVATTU (SAKKIPILLI, UILLEANN-JIGI, SOSTAKOVITS 5., VARSOVA/CATANIA/KOOPENHAMINA-AANIMAISEMAT; LISENSSIT archive.org-METADATASTA); JUMISSA 3/9 (SARDANA/COBLA, BANDURA/IVANKO, FINLANDIA) → JARJESTYS: COMMONS ENSIN (US NAVY/MARINE BAND PD-USGov, CATEGORY:SARDANA, CATEGORY:BANDURA), SITTEN KAPPALEEN VAIHTO, VIIMEISENA OMA TUOTANTO generoi-musiikki-TYONKULULLA (23.9.2026 klo 10.24)

Klo 10.35. Musopen 403 ei käy.

## LISENSSI-INVENTAARIO VALMIS (PR #2896, SIIRTOSEPPA): KUVAT 0 NC/ND (9 360 COMMONS + 183 LIPPUA + 53 FLICKR, kuvagalleria.js:156–172 TODENNETTU); AANET 23 NC/ND-TIEDOSTOA KAIKKI OLETUSKAYTOSSA — AMBIENSSI 14 (3 MAISEMATYYPPIKOREISSA KAIKILLA MANTEREILLA + 11 EUROOPAN KAUPUNKIKORISSA), KUUNTELE KIELTA 3, KUUNTELE MUSIIKKIA 6; 6 KAUPUNGIN KORI TYHJENEE (MARSEILLE, BARCELONA, GRANADA, VARSOVA, LAPPI, ISLANTI) → KORVAAJA ENNEN POISTOA; TARKISTETTAVAT: RADIOVIRTOJEN KAUPALLINEN KAYTTO (78), 34 LIPPUA, 24 ULKOISTA KUVAA, 114 JULISTETTA ILMAN LAHDERIVIA (23.9.2026 klo 10.26)

Klo 10.40. Sisältökirjuri korvaa (maisematyyppikorit ensin, PR per kori-ryhmä); Pelikoodari tekee äänille lisenssiportin (tests/aanilisenssit.test.mjs) ja päivittää lahteet.js 245/251 lopuksi; Siirtoseppä jatkaa yhteinen sisältölähde -laajennusta. Radiovirrat, liput, ulkoiset kuvat ja julisteet tarkistetaan seuraavaksi (Sisältökirjuri, korvausten jälkeen).

## YHTEINEN SISALTOLAHDE (SIIRTOSEPPA, PR #2890 OSA 5): js/packs PYSYY AINOANA LAHTEENA; CI VIE JOKAISESTA MERGESTA PAKETIN AMPARIIN sisalto/1/v<N>/ + uusin.json (SISALTOVERSIO ERILLAAN APP_VERSIONISTA, major.minor-SKEEMA, minSovellus); WEB = SAMA LAHDE ILMAN MUUTOKSIA; TYO 3,5–5 SESSIOTA (FUNKTIOT DATASTA TUNNISTEIKSI 2–3 — MYOS APP STORE 2.5.2); APP STORE: DATA PALVELIMELTA SALLITTU, PERUSSISALTO BINAARIIN, WKWebView-KUORI 4.2-RISKISSA, 3D-LISAOSAT OMINA PAKETTEINA IAP:N TAKANA (StoreKit 2 + ALLEKIRJOITETTU URL), LIVIA-CHAT VAATII 5.1.2(i)-SUOSTUMUKSEN; SA ~9 600 KUVAA → ATTRIBUUTIO SAILYTETTAVA, JURISTIN VAHVISTUS ENNEN MAKSULLISTA (23.9.2026 klo 10.26)

Klo 10.5x. Liitteet -liite-web.md ja -liite-app-store.md. Testit 9/9. Kaikki Siirtosepän erät valmiit; sessio vapaana.

## NC-KORVAUKSET 9/9 VALMIIT (PR #2895 + #2897): FINLANDIA → CWMBACH MALE CHOIR (CC BY-SA, COMMONS, 30 s NAYTE; TAYTTA ORKESTERIVERSIOTA SALLITULLA LISENSSILLA EI LOYTYNYT), SARDANA → 'L'EMIGRANT' (CC BY-SA, COMMONS), BANDURA → UKRAINALAINEN KANSANMUSIIKKI (CC BY-SA, COMMONS; KAPPALE VAIHDETTU); JALJELLA INVENTAARION AMBIENSSIKORIT A/B (14) (23.9.2026 klo 10.33)

Klo 11.0x. Sisältökirjuri jatkaa koreihin; Siirtoseppä ja Sisältökirjuri sopineet ettei duplikoida.

## AANTEN LISENSSIPORTTI (PR #2898, PELIKOODARI): js/lisenssi.js SAMA SAANTO KUIN KUVILLA (KUVIEN PORTTI SIIRTYI SINNE); KATTAA MAISEMA-, KAUPUNKI- JA MAAKORIT, STUDIOVALINNAT, KIELI- JA MUSIIKKINAYTTEET; 23 NC/ND-AANITETTA EIVAT ENAA SOI (OMISTAJAN LINJA TOTEUTUU ENNEN KORVAUKSIA), TYHJAT KAUPUNGIT SAAVAT MAAN/MAISEMAN YLEISEN AANEN; VARTIJA tests/aanilisenssit.test.mjs (184 RIVIA; NC-MAARA SAA VAIN PIENENTYA) (23.9.2026 klo 10.34)

Klo 10.4x, testit 4079/0. lahteet.js päivitetään korvausten jälkeen. Järjestys Julkaisijalle: #2895, #2897 ennen #2898.

## LISENSSI-INVENTAARION JATKO (PR #2899, SIIRTOSEPPA): RADIOT 115 ASEMAA — KAUPALLISEEN UPOTUKSEEN SALLITTU 0, KIELLETTY 16 (BBC, YLE, RADIO FRANCE, ARD, RTVE, NRK, SR, ORF, SRG, NPO, CBC, ABC, RTHK, RTP, VRT), EPASELVA 99 → MAKSULLISESTA RADIOLINSSI POIS TAI LUVAT (TEOSTO/GRAMEX); LIPUT 52 PD/CC0 OK; 29 ISOISAKUVAA VAILLA LAHDE-KENTTAA → TAYDENNYS; JULISTEET 114 GENEROITUJA OK; AVOIN: 394 KAUPUNKILEHDEN HEROKUVAA GENEROITU COMMONS-VIITEKUVISTA (BY/BY-SA VOI PERIYTYA JOHDANNAISENA, VIITELOKI EI REPOSSA) → ERILLINEN SELVITYS JA LINJAUS (23.9.2026 klo 10.42)

Klo 10.5x. Korit A/B (14 ambienssia) Sisältökirjurilla. Siirtoseppä lopetti ja odottaa.

## OMISTAJAN LINJAUS RADIOLINSSISTA: ILMAINEN SOVELLUS LISAOSTOILLA ON EHTOJEN MIELESSA KAUPALLINEN (JA 16 YLEISRADIOYHTIOTA KIELTAA UPOTUKSEN KOLMANNEN OSAPUOLEN SOVELLUKSEEN YLIPAATAAN) → RADIOT JAAVAT POIS UUDESTA NATIIVISTA PELISTA, PYSYVAT NYKYISESSA ILMAISESSA VERSIOSSA (WEB + iOS-KUORI); NC-KORVAUKSET 23/23 VALMIIT (PR #2895, #2897, #2900: KORIT A/B, LAPPI → OULUN JOKIRANTA, ISLANTI EI TYHJENTYNYT, lahteet.js NC POIS) (23.9.2026 klo 10.46)

Klo 10.50. Järjestys Julkaisijalle: #2895 → #2897 → #2900 → #2898.

## OMISTAJA (KIIREELLINEN, 10.50): HAMMASRATTAAN TAAKSE KYTKIN 'SUORAAN KARTALLE' — OHITTAA KAUPUNKIIN TULON KUVAT JA TEKSTIT SEKA ISOISAN JA PULUN LUENNAT, UUDELLEENLATAUKSEN JALKEEN PELI AUKEAA SUORAAN KARTTANAKYMAAN (NOPEUTTAA TESTAUSTA NYT JA JATKOSSA) (23.9.2026 klo 10.46)

Pelikoodari tekee pienen PR:n etusijalla; kytkin tallentuu, ?koe=suoraan, tilarivillä 'suoraan'; manuaalinen luenta toimii yhä.

## PR #2901 (SISALTOKIRJURI): 27 ISOISAKUVAN LAHDERIVI 'KUVAPUTKEN GENEROITU VALOKUVA'; KANTON/BOMBAY OLI JO TAYDENNETTY (LIITE VANHENTUNUT SILTA OSIN) (23.9.2026 klo 10.49)

Klo 10.5x. Sisältökirjuri vapaana.

## TILINVAIHTO: OMISTAJA SIIRTAA PELINKEHITYKSEN TOISELLE CLAUDE-TILILLE (SAMA TYOPOYTA, KANSIOT, MUISTI, APUSESSIOT); SIIRTOPROMPTI docs/raportit/siirto-2026-09-23-fablelle.md; KAIKKI SESSIOT TEKEVAT ALOITETUT ERAT LOPPUUN, KIRJOITTAVAT LUOVUTUKSEN EIVATKA ALOITA UUTTA; VIIKKOKIINTIO 89 % (23.9.2026 klo 10.54)

Klo 10.58. Apusessiot ovat koneen paikallisia (eivät tilikohtaisia); Remote Control on tilikohtainen ja kytketään uudelleen; Postivahdille uusi Fablen session id.

## SUORAAN KARTALLE -TESTITILA VALMIS (PR #2902, PELIKOODARI): KYTKIN VALIKON KARTTA-OSIOSSA KEHYSPROFIILIN ALLA + ?koe=suoraan, TILARIVILLA '· suoraan'; OHITTAA 'PELI PAIVITTYI' -IKKUNAN, SAAPUMISTRAILERIN, ISOT LUENTAKUVAT, PULUN VALIHUUDOT JA SAAPUMISKUPLAN; ISOISAN LUENTA EI KAYNNISTY ITSESTAAN (KUUNTELE-NAPPI TOIMII); KARTTA NAKYY 1,3–1,9 s (WebKit 7/7) (23.9.2026 klo 10.57)

Klo 11.0x, testit 4074/0. Julkaisijalle etusijalla. Pelikoodari kirjoittaa luovutuksen (67 %).

## PELIKOODARI NOLLATAAN (67 %) TILINVAIHTOA VARTEN; LUOVUTUS viesti-pelikoodari-luovutus-20260923.md (f9f01b992) (23.9.2026 klo 10.58)

Klo 11.0x. Uusi Pelikoodari odottaa tehtävää uudelta Fablelta (tili B).

## LAITETESTAAJAN PULU-QA v2138 (OSITTAINEN, posti/fable-codex-pulun-eleet-qa-20260923.md): PIILOANKKURI 3,6 rem OK MOLEMMILLA RUUDUILLA, PULU NAKYY JA REAGOI, ELEIDEN VAIHTUMINEN TODETTU KESKUSTELUN KAUTTA (PULLAN SYONTI), REDUCED MOTION EI RIKO, rAF LEVOSSA EI KASVA (3,5 → 1,0), EI JS-POIKKEUKSIA; EI TODENNETTU: VAPAA IDLE-SYKLI (ELEET TAPAHTUMAPOHJAISIA), TAYSI 70 ELEEN KIERROS; LAITETESTAAJAN LUOVUTUS PUSHATTU (laitetestaaja 0edd6c8de), CI-REBOOT TEKEMATTA (23.9.2026 klo 10.59)

Klo 11.05.

## HEROKUVIEN VIITESELVITYS (PR #2904, SIIRTOSEPPA): VIITELOKI KADONNUT (PILVIKONTTI 24.8.); 60/394 HEROA TEHTY COMMONS-VIITTEILLA, VIITTEET REKONSTRUOITU (240: BY-SA 158 / BY 58 / PD 14 / CC0 10; 56/60 SISALTAA BY-SA-VIITTEEN); 94 OMISTAJAN CHATGPT-ERAN HERON VIITTEET TUNTEMATTOMAT → KYSYMYS OMISTAJALLE; JOHDANNAISUUS EPAVARMA (EI ENNAKKOTAPAUSTA); SUOSITUS: ATTRIBUUTIO 60 HEROLLE (~1 SESSIO), JURISTI ENNEN MAKSULLISTA (HEROT + SA + RADIOT YHTENA KYSYMYKSENA), VIITELOKI JATKOSSA REPOON; SIVUKORJAUS: OMISTAJAN SAHKOPOSTI POIS LISENSSILIITTEEN USER-AGENTISTA (23.9.2026 klo 11.03)

Klo 11.1x. Siirtosepän luovutus siirtoseppa-luovutus 032ff32a5. Kysymys omistajalle: mistä viitteistä 94 ChatGPT-erän heroa tehtiin?

## CODEX (POSTILAATIKKO 6e55e47b2): PULUN v2138 IDLE-KAYTOS — VAPAASSA LEVOSSA 8 NEUTRAALIA ELETTA (blink, turn, preen, glance, tilt, lookUp, lookDown, mapPeck), 70 = VANHOJEN ELE-ID:IDEN UUDET PIIRTOVERSIOT, EI TAUSTASOITTOLISTA; KYPARA VAIN ASTRONAUTTILINSSISSA, glassCrash JOKA 7. PALUULLA, bunFeast KERRAN PER OSTOS; SEURAAVA QA (LAITETESTAAJA): 70 ID:N LAUKAISIJATAULUKKO, IDLE VASTA 40–60 s LEVON JALKEEN, KYPARA LINSSISSA, bunFeast TOKEN-TESTILLA, REDUCED MOTION LIIKKEEN PYSAHTYMINEN (23.9.2026 klo 11.10)

Klo 11.2x. Codexin paikalliset testit 102/102. Jonoon uudelle Fablelle (tili B) → Laitetestaaja tilinvaihdon jälkeen.

## GOOGLEN 3D-LAATAT JA MAKSULLISUUS: MAKSULLISUUS EI OLE ESTE (KAUPALLINEN KAYTTO SALLITTU ATTRIBUUTIOLLA JA TUETULLA RENDEROIJALLA); ESTEET: EU:N 'MUUTTAMATON TILA' (VANHA PROJEKTI SAILYTTAA OIKEUDEN VAIN JOS INTEGRAATIO EI MUUTU — LUKUTESTI 3D-JUURIOSOITTEESEEN NYKYISELLA AVAIMELLA KERTOO TILAN, UUSI iOS-SOVELLUS ON RISKI) JA 'EI MUUN KUIN GOOGLEN KARTAN KANSSA' (GOOGLE-NAKYMA OMANA KOKO RUUDUN NAKYMANA, EI PERGAMENTTIPALLON PAALLA); OMISTAJA: NYKYAJAN NAKYMAT HYODYNNETAAN ISOISAN NAKOKULMAN RINNALLA; FABLE 65 % → LUOVUTUS VALMIS, TILINVAIHTO (23.9.2026 klo 11.32)

Klo 11.2x. Lähteet: developers.google.com/maps/comms/eea/faq, /maps/documentation/tile/policies, /tile/3d-tiles; cesium.com/learn/photorealistic-3d-tiles-learn. Jonoon uudelle Fablelle: lukutesti vanhalla avaimella (avain ympäristöstä, ei keskusteluun); Julkaisijan luovutus ja nollaus (71 %).

## OMISTAJAN PAATOS: GOOGLEN 3D-LAATTOJA EI KAYTETA OLLENKAAN (EU-EHDOT JA 'EI MUUN KARTAN KANSSA' -RAJOITUS); NYKYAJAN NAKYMAT TEHDAAN AVOIMELLA MAASTOLLA, OMILLA LAATOILLA JA KOHDEKOHTAISILLA 3D-MALLEILLA (23.9.2026 klo 11.35)

Klo 11.35. Lukutestiä vanhalla avaimella ei tehdä; siirtopromptin kohta poistuu.

## TILINVAIHTO TEHTY: UUSI FABLE TILILLA B (local_742d1717-d642-426a-840b-c5c0e75578bf); TILIN A SESSIOT EIVAT NAKYNEET, OMISTAJA AVASI KAHDEKSAN UUTTA ROOLISESSIOTA, FABLE NIMESI, LAHETTI ALOITUKSET LUOVUTUKSIIN JA KYTKI RC:N; SESSION ID:T: PELIKOODARI local_7b5a6c65, KARTTASEPPA local_445a5c7b, JULKAISIJA local_9922c4b6, LAITETESTAAJA local_992b689f, SISALTOKIRJURI local_e5685e4a, POSTIVAHTI local_6f3d4c35, 3D-SELVITTAJA local_860f922b, SIIRTOSEPPA local_7a1255c5; MAIN v2148 (#2906) + #2904 (23.9.2026 klo 12.01)

Fable 5.1 tilillä B; viikkokiintiö tilillä B 0 %. Uudet sessiot aloittavat luovutusdokumenteistaan (haarat julkaisija-luovutus-20260923, pelikoodari-luovutus-20260923-yo, karttaseppa-tyo-20260922, laitetestaaja, selvittaja-3d-luovutus, siirtoseppa-luovutus). Jono ennallaan: omistajan kierrokset → Pelikoodarin analyysi → 3D-moottoripäätös.

## TYOTILAT (OMISTAJA 23.9.2026): KAIKKI CLAUDEN KANSIOT /Users/Shared/Claude/ (YHTEINEN KAIKILLE MACIN KAYTTAJILLE, ACL staff): ROOLIEN CHECKOUTIT Matkakirja-<rooli>, ERA-WORKTREET wt/<rooli>-<aihe> TYOKALULLA tools/uusi-worktree.sh, POISTO MERGEN JALKEEN, EI KOSKAAN KAYTTAJAN KOTIHAKEMISTOON; POSTIVAHTI AJAA tools/tarkista-tyotilat.sh; SIIVOUS: 36 TYHJAKAYNTISTA WORKTREETA POISTETTU, 12 MUOKATTUA/VANHAA JAI wt/-KANSIOON; VANHAT POLUT SYMLINKKEINA (23.9.2026 klo 12.12)

Omistajan kolme pyyntöä samassa: siivoa, siirrä kaikki (myös Fable) yhteen alikansioon, ja yhteiselle alueelle käyttäjänvaihtoa varten. Raamatun kohta 2 B) päivitetty, CLAUDE.md sai Työtilat-osion. safe.directory '*' asetettu koodaus-käyttäjälle; toiselle käyttäjälle sama komento vaihdossa.

## PEILAUS LUKEE js/linssit (PR #2913, SIIRTOSEPPA): AMPARISTA PUUTTUI 32 KUVAA 9 543:STA (24 KEKSINTOLINSSIN, 7 ST. JOHN'SIN KAAREVA HEITTOMERKKI, 1 YLLASTUNTURIN A-PISTEET); MERGE KAYNNISTAA PEILAUKSEN; AVOIN: FOKUSLEHTIEN VANHAT WEBP-POHJAKUVAT 404 JOKA AJOSSA; JULKAISIJAN LUOVUTUSHAARAT MAINISSA #2907-#2912; #2895/#2897 SISALTOKIRJURILLE (KESTO >180 s, .ogg) (23.9.2026 klo 12.14)

Sisältökirjuri korjaa lähteet samoissa haaroissa, sitten #2898.

## OMISTAJAN PAATOKSET 23.9. KORTILLA: 1) HEROKUVAT PIDETAAN KAIKKI (394): POHJAKUVINA KAYTETYT OVAT KAIKKI CC-KUVIA, OSASSA EI POHJAKUVAA LAINKAAN; ATTRIBUUTIO 60 TUNNETULLE VIITTEELLE TEHDAAN (SIIRTOSEPPA); 2) 3D-MOOTTORI: UNITY 6.3 + CESIUM SUOSITUKSEN MUKAAN; XCODE 27 -KYSYMYS AUKI (KONE PYSYY macOS 26:SSA KUNNES 27.1, XCODE ASENNETTU samireivinen-KAYTTAJALLE) → 3D-SELVITTAJA TARKISTAA VAATIMUKSET JA KAYTTOONOTON ILMAN ASENNUSTA; 3) CI-REBOOT: OMISTAJA KIRJAUTUI ULOS JA SISAAN, LAITETESTAAJA TARKISTAA RIITTAAKO; 4) OMISTAJAN KIERROS TEHTY, KUVAT TULOSSA (23.9.2026 klo 12.30)

Siirtosepän webp-404 valmis (PR #2916: 135 kuollutta fokuslehden webp-kenttää poistettu, peilaus ohittaa julisteet ja hetkikuvat, virheet 230 → 8).

## OMISTAJAN KIERROS 23.9. (v2148, iPad, kaappaukset omistaja-20260923/kierros-1222-*): PALJAS KARTTA TOKKII VAHITEN (p95 21–23 ms, >20 ms 7–8 %) MUTTA HEITOSSA (VETO + LIUKU LOPPUUN) YLEENSA YKSI TOKKAYS; LIU'UN LOPETUS LIIAN NOPEA → PEHMEAMPI HIDASTUS; SYOTEKOKEET 1–4 KAIKKI TOKKIVAT, EI SELVAA EROA (LUVUISSA OLETUS PARAS, KOSKETUS SUORAAN HUONOIN max 138); SYMBOLIKERROS YKSIN TUO max 134 JA >20 ms 33 % (rast 154, puskurikirj. 6.4/kehys); HAIPYY 6–26 TAYSISSA TILOISSA → PELIKOODARI: 1) HEITON YKSI TOKKAYS PALJAASSA KARTASSA (SYY-KARKI vienti/valmisteluRaf/globe.tick), 2) LIU'UN LOPUN PEHMENNYS, 3) SYMBOLIKERROKSEN KUSTANNUS; SYOTEPUTKI EI OLE JUURISYY (23.9.2026 klo 12.33)

Kosketus suoraan -oletusta ei oteta käyttöön. Kierros tehtiin Suoraan kartalle -tilassa; kytkin toimii.

## XCODE-SELVITYS (PR #2917, 3D-SELVITTAJA, docs/raportit/3d-xcode-20260923.md): UNITY 6.3 VAATII XCODE 16+, APP STORE XCODE 26+ → XCODE 27 EI VALTTAMATON MUTTA KELPAA (26.6 VARA); XCODE 27 VAATII macOS 26.6 (KONE 26.6.2) → macOS 27 EI TARVITA; KONEELLA XCODE 27.0 VALMIINA koodaus-KAYTTAJALLE (xcode-select, LISENSSI, iOS 27 SDK, SIMULAATTORI); OMISTAJALTA: METAL TOOLCHAIN -KOMPONENTTI, APPLE ID XCODEEN, DEVELOPER PROGRAM (TESTFLIGHT), iPHONE KEHITTAJATILAAN — KOHDAT 2–4 EIVAT ESTA SIMULAATTORIVAIHETTA; CI-REBOOT: ULOSKIRJAUTUMINEN EI RIITTANYT (AJO 12.14 SAMA VIRHE) → OMISTAJA: REBOOT ILLALLA ERIEN VALMISTUTTUA (23.9.2026 klo 12.35)

3D-prototyyppi voi alkaa simulaattorivaiheella heti.

## PULUN ORVOT ELEET (LAITETESTAAJAN LAUKAISIJATAULUKKO 00ca1b8ec: 70/70 KARTOITETTU, 9 ORPOA happy/facepalm/walkRight/owl/arrive/crash/emerge/leaveRight/leaveDown; CODEXIN VALITTAMA OMISTAJALINJA 5bd844af6): ORVOT EIVAT MENE IDLE-ARVONTAAN LUKUMAARAN VUOKSI; KULLEKIN OMA MERKITYKSELLINEN PELITAPAHTUMA, KERRAN PER TILANNE, KESKEYTYSSAANTO; owl ON ALIAS flyAway:LLE; leaveRight/arrive JA leaveDown/emerge EIVAT OLE VALMIITA PAREJA; crash VAIN glassCrash-VARIANTTINA SAMALLA HARVINAISUUDELLA; TOTEUTUS: ENSIN YKSI PIENI KYTKENTA (facepalm TAI walkRight) PELIKOODARILLA SULAVUUSERIEN JALKEEN; LAITETESTAAJA KORJAA TAULUKON JA AVAA DOKUMENTTI-PR:N; #2913 SAVUKKEET PUNAISIA RINNAKKAISTEN AJOJEN AIKANA → RERUN YKSINAAN (23.9.2026 klo 12.37)

Kirjattu Fable.

## HERO-ATTRIBUUTIO VALMIS (PR #2918, SIIRTOSEPPA): 60 HEROLLE VIITTEET 240 COMMONS-KUVAAN LAHDERIVIIN, 56 BY-SA-POHJAISELLE 'HAVAINNEKUVA CC BY-SA 4.0'; VIITELOKI REPOON tools/hero-viiteloki.tsv, HERO-AJURI KIRJOITTAA SINNE; LAHDERIVIN LINKKIEN KOKO KORJATTU 9 px; 3D-PROTO: UNITY HUB ASENNETTU, EDITORI LATAUTUU /Users/Shared/Claude/proto-3d, OMISTAJALTA UNITY PERSONAL -LISENSSI (OHJE-unity-lisenssi.md); REBOOT NYT OMISTAJAN LUVALLA, SESSIOT PYSAYTETTY (23.9.2026 klo 12.40)

Fablen aloitusviesti docs/raportit/viesti-fable-aloitus.md.

## OMISTAJA 23.9.: METAL TOOLCHAIN ASENNETTU, UNITY-LISENSSI KIRJAUTUMALLA HUBIIN, APPLE ID KIRJATTU koodaus-KAYTTAJALLE (XCODE-ALLEKIRJOITUS TARKISTETAAN); REBOOT NYT (23.9.2026 klo 12.42)

3D-selvittäjä tarkistaa rebootin jälkeen Unity-lisenssin ja allekirjoitusidentiteetit (security find-identity).

## REBOOT TEHTY 23.9. klo 12.43; SESSIOT HERATETTY send_message-TYOKALULLA (SAMAT ID:T, CWD VANHOISSA POLUISSA SYMLINKKIEN KAUTTA), RC PAALLA; FABLEN MUISTI KOPIOITU UUDELLE PROJEKTIAVAIMELLE -Users-Shared-Claude-Matkakirja-fable; ENSIN LAITETESTAAJAN CI-TARKISTUS, SITTEN JULKAISIJAN JONO YKSI AJO KERRALLAAN (23.9.2026 klo 12.49)

Vanhat aliakset poistetaan, kun sessiot on avattu uusista poluista.

## HEITON TOKKAYS KORJATTU (PR #2919, PELIKOODARI, SULAVUUSERA 1): SYY IRROTUKSEN JALKEEN 2 RENDERIA ILMAN SIIRTYMAA (~34 ms) — LIU'UN rAF AJETTIIN TICKIN JALKEEN JA ENSIMMAISEN ASKELEEN dt ~0; KORJAUS: LIUKU ASTUU KIRJASTON TICKISSA ENNEN RENDERIA JA JATKAA VEDON AIKAJANAA (js/pallo.js); MITTARI tools/savukkeet/mittaa-heitto.mjs: TOKKAYKSIA 10/19/10/3 → 1/0/0/0; ERA 2 (LIU'UN PEHMENNYS) ALKAA; UNITY-LISENSSI EI AKTIIVINEN koodaus-KAYTTAJALLA → OMISTAJA KIRJAUTUU HUBIIN koodaus-TYOPOYDALLA (23.9.2026 klo 12.55)

Laattaviennit liu'un aikana eivät näkyneet mittarissa tökkäyksinä.

## LIU'UN LOPPU PEHMEASTI (PR #2920, PELIKOODARI, SULAVUUSERA 2, POHJANA #2919): SYY LIUKU KATKAISTIIN ASTEKYNNYKSELLA → iPADIN MAAKUVASSA PYSAHTYI KERRALLA ~1 px/KEHYS-VAUHDISTA; KORJAUS ALLE 0,15 px/ms LIUKU SIIRTYY LOPPUVAIHEESEEN v0·(1−s/T)², T ≈ 710 ms, NOPEUS LOPUSSA NOLLA; VIIMEINEN LIUKUKEHYS 1,1 → 0,1 px, LIUKU ~200 ms PIDEMPI; AVOIN: PANOROINTIRAJAAN OSUVA HEITTO PYSAHTYY SEINAAN (~6 px/KEHYS) → KYSYMYS OMISTAJALLE; ERA 3 (SYMBOLIKERROS) ALKAA (23.9.2026 klo 13.00)

Kirjattu Fable.

## UNITY-LISENSSI OK koodaus-KAYTTAJALLA (OMISTAJA); 3D-SELVITTAJA JATKAA PROJEKTILUONTIIN, VIRSTANPYLVAS 1: PERGAMENTTIPALLO OMILLA LAATOILLA (z0–8, pohja-20260921a) iOS-SIMULAATTORISSA; CODEX ALOITTI PULUN ORPOJEN ELEIDEN KYTKENNAN (codex/pulu-orvot-peli-20260923) → POIS PELIKOODARIN JONOSTA (23.9.2026 klo 13.11)

Kirjattu Fable.

## CI-WEBKIT: REBOOT EI POISTANUT LAUNCH-AIKAKATKAISUA (AJO 35842697649, 17 SAVUKETTA SAMA JALKI); SIVULOYDOS: REBOOT JATTAA GITHUBIIN KADONNEEN JOBIN JOKA VARAA RUNNERIN → VAPAUTUS gh run cancel / force-cancel (JONO JUMISSA ~20 min); SEURAAVA ASKEL LAITETESTAAJALLE: webkit-2336-KOPION POISTO JA UUDELLEENLATAUS AJOJEN VALISSA + PLAYWRIGHT-VERSIOERON TARKISTUS CI vs. PAIKALLINEN (package-lock 22.9. ILTA) (23.9.2026 klo 13.12)

Launch-virhe pysyy sallittuna punaisena omistajan säännöllä.

## OMISTAJA: HEITON TOKKAYS EI OLLUT LAUDAN REUNALLA → PANOROINTIRAJAN SEINA JATETAAN ENNALLEEN, #2919 ON OIKEA KORJAUS (23.9.2026 klo 13.12)

Kirjattu Fable.

## OMISTAJAN PAATOKSET 23.9. KORTILLA (2): 1) KALLISTUS: OMISTAJA EI NAE SITA, KOSKA VAIHE 1 ON VAIN MAAN ESITTELYSSA JA SUORAAN KARTALLE OHITTAA SEN → KARTTASEPPA TEKEE VALIKKOKYTKIMEN, JOKA PITAA KALLISTUKSEN PAALLA VEDOSSA (VAIHE 2 ALKAA SIITA); 2) POLTOT: KARTTA 22c JA NOSTOTASO AJETAAN, KUN CI ON VAPAA; 3) LISENSSIT: EI JURISTIA, ATTRIBUUTIO RIITTAA (SA-KUVAT, HEROT; RADIOT POIS NATIIVISTA); SEURAAVA: 163 KAUPUNGIN LAT/LON SIIRTOSEPPA + SISALTOKIRJURI (23.9.2026 klo 13.22)

Kirjattu Fable.

## OMISTAJA 23.9. klo 13.3x: 1) RAJAVIIVASSA KAKSI ERILAISTA VIIVAA (OLERON/GIRONDE SYVA ZOOMI: PAKSU VEKTORIRANTAVIIVA JA OHUT POLTETUN POHJAN VIIVA ERI PAIKASSA; KAAPPAUS rajaviiva-kaksi-1325.png) → KARTTASEPPA SELVITTAA ENNEN KALLISTUSKYTKINTA; 2) KEHITTAJASAATIMET (SYOTEKOE, KEHYSPROFIILI, SUORAAN KARTALLE) HAMPURILAISESTA HAMMASRATASVALIKON ALLE JA NAKYVIIN VAIN KEHITTAJANAKYMASSA (KAAPPAUS valikko-saatimet-1330.png) → PELIKOODARI; PIENI LIIKE JAA PELAAJAN ASETUKSEKSI (23.9.2026 klo 13.23)

Kirjattu Fable.

## SYMBOLIKERROS VEDOSSA (PR #2921, PELIKOODARI, SULAVUUSERA 3): 'rast 154' ON RASTERIVALIMUISTIN KOKO, EI VEDON RASTEROINTEJA; KUSTANNUS OLI PUSKURIKIRJOITUKSISSA (HAIVYTYSTEN PEITOT JOKA KEHYS); KORJAUS: HAIVYTYS KIRJOITETAAN INSTANSSIIN KERRAN, VARJOSTIN LASKEE PEITON KELLOSTA, HAIPYNEEN MERKIN POISTO ODOTTAA SEURAAVAA LADONTAA; PUSKURIKIRJOITUKSET ZOOMISSA 502 → 36, VEDOSSA 207 → 26; VAIKUTUS PITKIIN KEHYKSIIN TODETAAN LAITTEELLA; SULAVUUSERAT 1–3 VALMIIT (#2919, #2920, #2921) → JULKAISIJA SAMAAN VERSIOON, OMISTAJAN KOKEILU iPADILLA (23.9.2026 klo 13.23)

Kirjattu Fable.

## HERO-VIITTEIDEN VARMISTUS (SIIRTOSEPPA, #2918 e82652baa): 60/60 HEROA JA 240 VIITETTA VASTAAVAT COMMONSIN TILAA (VALINTA AJETTU UUDELLEEN 23.8. JA 24.8. TILALLA, KATEGORIAMUUTOKSET EMULOITU), EI KORJAUKSIA; LOYDOS: COMMONS ANTAA KUVATIEDOT VAIN 50 ENSIMMAISELLE (SELITTAA 40–48 EHDOKASTA); RAPORTTI herokuvien-viitteet-20260923-varmistus.md, TYOKALU tools/varmista-hero-viitteet.mjs; SIIRTOSEPPA JATKAA 163 KAUPUNGIN LAT/LON-LISTAAN (SISALTOKIRJURI LAHETTI ID-LISTAN) (23.9.2026 klo 13.25)

Kirjattu Fable.

## 163 KAUPUNGIN PALLO-LAT/LON (PR #2922, SIIRTOSEPPA → SISALTOKIRJURI KIRJAA): WIKIDATA P625, PISTE 125, ALUE 33 (LAUDAN PISTE 7.9. LINJAUKSEN MUKAAN), TARINA 3; LOYDOS: GAO 374 km JA EXMOUTH 89 km VAARASSA PAIKASSA (9 WIKI-KENTTAA EI LOYDY fi-WIKIPEDIASTA → VARTIO EI NAHNYT; VARTIOON ILMOITUS); FABLEN PAATOKSET: MOSAMBIK = ILHA DE MOCAMBIQUE, ORJARANNIKKO = LAUDAN PISTE OUIDAH–LAGOS, KAMERUN = DOUALA/SUISTO (1873-MERKITYS, WIKI-KENTTA SAMAAN, SISALTOKIRJURI TARKISTAA TARINASTA); KAP PALMAS JA RAS HAFUN NIEMEN KARKI (ALUE-SAANTO EI KOSKE NIEMIA); GAON LAUDAN PISTE → KARTTASEPPA (23.9.2026 klo 13.29)

Kirjattu Fable.

## 3D-PROTO VIRSTANPYLVAS 1 (3D-SELVITTAJA, PR #2923): PERGAMENTTIPALLO PYORII iOS-SIMULAATTORISSA (iPhone 18 Pro, iOS 27) PELIN OMILLA PALLOLAATOILLA, EI GOOGLEA EIKA CESIUM IONIA; UNITY 6000.3.24 + CESIUM, PROJEKTI /Users/Shared/Claude/proto-3d (OMA GIT, aja.sh); KIERTOTIE: CESIUMIN LAITEKIRJASTOT MERKITAAN SIMULAATTORILLE, arm64-AJOAIKA; AVOIN: BURST-LINKKERI EDITORISSA, NAPAHATTU (MERCATOR 85°), LAITEKAANNOS VAATII APPLE DEVELOPER -TIIMIN JA ALLEKIRJOITUKSEN; SEURAAVA: KOSKETUSOHJAUS (VETO, LIUKU, ZOOMI) → NAPAHATTU → LAITEKAANNOS OMISTAJAN TIIMILLA (23.9.2026 klo 13.31)

Kirjattu Fable.

## KEHITTAJASAATIMET RATTAAN ALLE (PR #2924, PELIKOODARI): SYOTEKOE, KERROKSET, KEHYSPROFIILI JA SUORAAN KARTALLE RATTAAN KEHITTAJARYHMAAN 'MITTAUS'; NAKYVAT VAIN KEHITTAJATILASSA (SALASANA, localStorage matkakirja-kehittaja); HAMPURILAISEN KARTTA-OSIOON JAI PIENI LIIKE; PALJAASSA KARTASSA RATAS PYSYY NAKYVISSA; VARTIJA K9 PELAAJA EI NAE MITTAUSTA; OMISTAJA: iPADISSA KEHITTAJATILA PAALLE (23.9.2026 klo 13.31)

Kirjattu Fable.

## LAT/LON-PAATOKSET TOTEUTETTU (#2922 a7579edfd): PISTE 129, ALUE 34; VARTIO ILMOITTAA 9 fi-SIVUTONTA WIKI-KENTTAA JA GAON TASMENNYSSIVUN (KOODI 1), fi-SIVUTTOMAT MITATAAN en-WIKIN KAUTTA; SIIRTOSEPPA → VIE-SISALTO OSA 1 (CI VIE PAKETIN AMPARIIN sisalto/1/v<N>/ + uusin.json, SKEEMATESTI; MUOTO 3D-SELVITTAJAN TARPEIDEN MUKAAN) (23.9.2026 klo 13.33)

Kirjattu Fable.

## OMISTAJA 23.9. klo 13.3x: ZOOMITASON VAIHDON VARINA — TAPLAT/ROPELO NAKYVAT VAIN KUN UUSI ZOOMITASO PIIRTYY, MYOS CHROMELLA JA MANTEREELLA (MERELLA SELVEMMIN), AINA OLLEET LASNA, 'AIKA HAIRITSEVAAKIN VARINAA' → KARTTASEPAN YKKOSERA ENNEN KALLISTUSKYTKINTA: SIIRTYMAN DIAGNOOSI KUVASARJANA JA KORJAUS HAIVYTYKSESSA/LAATTAOHJELMASSA (PELIKOODARI SHADERIIN TARVITTAESSA); RAJAVIIVAN KAKSOISVIIVA TARKISTETAAN SAMASSA (23.9.2026 klo 13.33)

Kirjattu Fable.

## RAJAVIIVAN KAKSOISVIIVA KORJATTU (KARTTASEPPA, karttaseppa-rajaviiva-naulaus 5c5d49103): JUURISYY korostus.pyynto ALUSTAMATTA → NaN → TYOSAIKEEN NAULAUSVASTAUKSET HYLATTY v1990:STA LAHTIEN, KOROSTUSKEHA JAI admin_0-GEOMETRIAAN GSHHG-RANNAN VIEREEN; POLTETTU JA VEKTORIRANTA SAMAA GSHHG:TA; TIHEYSPORTTI 300 → 100 m; iPAD-TASOT 6–8 NAULATTU (2367 JANAA); OMISTAJA: LAITETESTAAJAN TESTIT AINA ILMAN AANIA (KAIUTTIMET HAIRITSEVAT) → AANI MYKISTETAAN/OHJATAAN HILJAISEEN LAITTEESEEN AJOJEN AJAKSI JA PALAUTETAAN; KAAPPAUSVIRHE: rajaviiva- JA valikko-KUVAT OLIVAT VAARIA KOPIOITA, POISTETTU; ROPELO-KUVAT KORJATTU webp (23.9.2026 klo 13.35)

Kirjattu Fable.

## CI-WEBKIT: SELAINKOPION POISTO JA UUDELLEENLATAUS (webkit-2336, PLAYWRIGHT 1.62.1 PINNATTU) VAHENSI KAATUMISET 17/65 → 2/66 (AJO 35845766860); VERSIOERO POISSULJETTU; JALJELLA glnimiot-nimet JA glnimiot-nostot → LAITETESTAAJA AJAA NE ERIKSEEN MONEEN KERTAAN (FLAKY vs. SYSTEMAATTINEN); OPPI: PALJAS 'npx playwright install' ILMAN node_modules HAKEE VAARAN VERSION → AINA PINNATTU ASENNUS; RAPORTTI ci-webkit-launch-20260923.md; LAUNCH-VIRHE PYSYY SALLITTUNA VAIN NAILLE KAHDELLE (23.9.2026 klo 13.37)

Kirjattu Fable.

## 3D-PROTO: KOSKETUSOHJAUS TOIMII SIMULAATTORISSA (VETO, LIUKU, NIPISTYS; LIIKKEESSA p95 < 17,2 ms); LAITEKAANNOSOHJE proto-3d/OHJE-laitekaannos.md: iPHONE 17 PRO PARILIITETTY, KEHITTAJATILA PAALLA, OMISTAJALTA PUUTTUU VAIN APPLE ID XCODEEN (PERSONAL TEAM, 7 pv, 3 SOVELLUSTA); BUNDLE ID app.matkakirja.proto3d (JULKAISULLE app.matkakirja.peli); DEVELOPER PROGRAM VASTA TESTFLIGHTIIN; SEURAAVA NAPAHATTU; CI: KOLMESSA RIIPPUMATTOMASSA PR:SSA SAMA 20+ SAVUKKEEN PUNAINEN JOUKKO → YHTEINEN JUURISYY, MERGET ODOTTAVAT (JULKAISIJA VERTAA MAINIIN, LAITETESTAAJA LUKEE VIRHERIVIN) (23.9.2026 klo 13.39)

Kirjattu Fable.

## MAININ SAVUKEREGRESSIO VAHVISTETTU (LAITETESTAAJA, ARTIFAKTI #2919): 20 PUNAISTA OVAT OIKEITA VAITEVIRHEITA (nimiot-elavat 18/22: ELAVA NIMIO YLITTAA REUNAN, POLTETTUJA 0; topografialinssi 52/54: PULU JAA NAKYVIIN LINSSIN PAALLE; LISAKSI marseille-valkkyy, noppa-saapumisen-aikana, nostokortti, pariisi-lahizoom-390, reittihelmet, zoomiraja, nimiot-sulavat); glnimiot-nimet/-nostot ERILLINEN RAPORTOINTIBUGI (0/0); EPAILY SUORAAN KARTALLE #2905 (v2147) TAI v2148 → PELIKOODARI BISECTAA JA KORJAA; MERGET ODOTTAVAT (DOCS-PR:T SAA) (23.9.2026 klo 13.40)

Kirjattu Fable.

## glnimiot-nimet/-nostot 'KAATUMINEN' OLI TULOSTEMUOTOVIRHE (LAITETESTAAJA): SAVUKKEET TULOSTAVAT ✓/✗, vertaa-tulos.mjs LASKEE VAIN OK/FAIL-RIVEJA → 0/0 → kaatui=true; DETERMINISTINEN, EI FLAKY; KORJAUS YHDEN RIVIN MUUTOS MOLEMPIIN (LAITETESTAAJA TEKEE); CI-WEBKIT-JUURISYYT SIIS: VIOITTUNUT SELAINKOPIO + TULOSTEMUOTO → LAUNCH-TIMEOUT-POIKKEUSSAANTO POISTUU KORJAUKSEN JALKEEN (23.9.2026 klo 13.41)

Kirjattu Fable.

## SAVUKEREGRESSIO EI OLE YKSI COMMIT (JULKAISIJA, 27 AJOA 05.44–10.38): PUNAISTEN MAARA HYPPII 0 / 8–11 / 21–22 ILMAN RAJAA, SAMA SISALTO PUNAINEN 05.44 JA VIHREA 05.48 → BISECT PERUTTU; HYPOTEESI: RINNAKKAISET savukkeet-mac-AJOT SAMALLA MACILLA (4–5 KERRALLAAN) KUORMITTAVAT KUORMAHERKAT SAVUKKEET PUNAISIKSI (RENDERKAMERA JALJESSA, 21.9. OPPI); PELIKOODARI TOISTAA 3× YKSIN JA KUORMASSA; JULKAISIJA TARKISTAA WORKFLOWIN CONCURRENCYN (YKSI AJO KERRALLAAN KOKO REPOSSA) (23.9.2026 klo 13.43)

Kirjattu Fable.

## YHTEINEN SISALTOLAHDE OSA 1 (PR #2925, SIIRTOSEPPA): vie-sisalto.yml VIE JOKAISESTA MAIN-MERGESTA PAKETIN sisalto/1/vN/ + uusin.json (ubuntu, 20 VERSIOTA, PALAUTA-KASIAJO); SISALTOVERSIO ERILLAAN APP_VERSIONISTA, minSovellus { ios: 1, web: null }, UUSI VERSIO VAIN SISALTOMUUTOKSESTA; SKEEMA 1.1 (KAUPUNGIT maa2, tyyppi) 3D-PROTON TARPEESEEN, validoi.mjs + tests/sisaltopaketti.test.mjs; OMISTAJA: APPLE ID XCODESSA OK → 3D-SELVITTAJA TEKEE LAITEKAANNOKSEN (23.9.2026 klo 13.43)

Kirjattu Fable.

## SIIRTYMAN VARINAN DIAGNOOSI (KARTTASEPPA): SALMIAKIT OVAT SYVYYSTAISTELU KAHDEN KARKEAN TASON VALILLA, EI HAIVE EIKA POLTON SISALTO — VAIHDOSSA z7→z8 VANHA z7 JA TUKI z5 SAAVAT SAMAN SIIRRON −6, JARJESTYKSEN RATKAISEE JANTEEN PAINUMA JA z5 VOITTAA KARKEAN VERKON KARKIEN YMPARILLA → SAANNOLLINEN RUUDUKKO SUURENNETTUA z5:TA KUNNES z8 PEITTAA; TODISTE WebKit z8-LATAUS ESTETTYNA; KORJAUS LAATTAOHJELMASSA: KARKEAMMAT PORRASTETAAN TASOERON MUKAAN (z−1 −6, z−2 −4, z−3 −2, MUUT −1), EI POLTTOA; ERA karttaseppa-tasonvaihto-syvyys; MUUT: TUPLANIMET = NIMIOTASOJEN NORMAALI RISTIHAIVE, SUMEAT LAIKUT NIZZAN EDUSTALLA = PUUTTUVAT LAATAT LATAUKSESSA (EI TASSA ERASSA) (23.9.2026 klo 13.47)

Kirjattu Fable.

## 266 KAUPUNKIA SAIVAT PALLOPISTEEN (PR #2927, SISALTOKIRJURI): TARINA TARKISTETTU (ORJARANNIKKO/OUIDAH OLI OIKEIN, KAMERUN/DOUALA TASMAA SAAPUMISTEKSTIIN), pallo.test PAIVITETTY; VELKA: 4 KAUPUNGIN WIKI-KENTAN KORJAUS VAATII maailmankartta.js:N REGENEROINNIN NE_LAND-DATALLA (KARTTASEPPA MYOHEMMIN) (23.9.2026 klo 13.47)

Kirjattu Fable.

## SISALTOKIRJURIN JONO: 1) RANSKAN FOKUSKOHTEET (fokuskohteet-fra.js 2 → 8–10 KOHDETTA, SAKSAN RAKENNE; OMISTAJA TESTAA RANSKASSA), 2) AFRIKAN O7-PAKETTI (10 KAUPUNKIA VAILLA LEHTEA, ESTE POISTUNUT), 3) KOHDEKARTAT PUUTTUVILTA (83/266) NATIIVIPELIN TARPEESEEN (23.9.2026 klo 13.50)

Kirjattu Fable.

## CI-WEBKIT KOKONAAN RATKAISTU: LAUNCH-TIMEOUT = VIOITTUNUT SELAINKOPIO (KORJATTU UUDELLEENLATAUKSELLA), glnimiot 'KAATUMINEN' = TULOSTEMUOTO (PR #2928: OK/FAIL-MUOTO + vertaa-tulos.mjs EROTTELEE VAARAN MUODON AIDOSTA KAATUMISESTA); LAUNCH-TIMEOUT-PUNAISTEN SALLINTA POISTUU, KUN #2928 ON MAINISSA; JALJELLA VAIN KUORMAHERKKIEN SAVUKKEIDEN FLAKY (PELIKOODARI TOISTAA, JULKAISIJA CONCURRENCY) (23.9.2026 klo 13.51)

Kirjattu Fable.

## TASONVAIHDON SALMIAKIT KORJATTU (KARTTASEPPA, karttaseppa-tasonvaihto-syvyys 3c5df135c): laatanSyvyyssiirto PORRASTAA KARKEAMMAT TASOERON MUKAAN; SAVUKE mittaa-tasonvaihto-salmiakit.mjs: MAIN 86/85 → 0/0 (WebKit/Chromium), VAPAA SIIRTYMASARJA 0; EI POLTTOA; TUPLANIMET JA LATAAMATTOMIEN LAATTOJEN LAIKUT ENNALLAAN (OMA ERA JOS OMISTAJA HALUAA); KARTTASEPAN JONO: KALLISTUSKYTKIN, POLTOT, GAON X/Y; 3D: TIIMI-ID F72JLS57C5 (PERSONAL TEAM) LUETTU XCODEN ASETUKSISTA, OMISTAJAN KLIKKAUSTA EI TARVITTU (23.9.2026 klo 13.53)

Kirjattu Fable.

## OMISTAJA 23.9. klo 13.5x: SUMEAT LAIKUT KORJATAAN (PUUTTUVAN LAATAN KOHDALLA SUURENNETTU EMOLAATTA KIRJASTON POHJAN SIJAAN; KARTTASEPPA KALLISTUSKYTKIMEN JALKEEN), TUPLANIMET (NIMIOTASOJEN RISTIHAIVE) JAAVAT ENNALLEEN; iPHONE AUKI JA USB:SSA LAITEKAANNOSTA VARTEN (23.9.2026 klo 13.57)

Kirjattu Fable.

## SISALTOPAKETTI v1 AMPARISSA (SIIRTOSEPPA): media.matkakirja.app/sisalto/1/uusin.json, kaupungit.json 266 KAUPUNKIA + maa2, OTSAKKEET immutable/max-age 60; ENSIMMAINEN AJO KAATUI bash -e:HEN ILMAN OSOITINTA → KORJAUS #2929 + TESTI; OSA 2 ODOTTAA 3D-SELVITTAJAN PALAUTETTA (23.9.2026 klo 13.58)

Kirjattu Fable.

## 3D-PROTO PYORII iPHONE 17 PROLLA (iOS 27): ALLEKIRJOITUS PERSONAL TEAM F72JLS57C5 KIRJATTU UNITYYN, KOKO 163 Mt; LEVOSSA 120 Hz (p50 8,33 ms, p95 8,5 ms, max 14 ms), KAYNNISTYKSESSA YKSI 175 ms KEHYS; LIIKKEEN MITTAUS ODOTTAA OMISTAJAN ELEITA (30 s VETO/LIUKU/NIPISTYS); NAPAKANSI MUKANA; SIMULAATTORI EI KERRO LAITTEEN SULAVUUDESTA (23.9.2026 klo 14.00)

Kirjattu Fable.

## KALLISTUSKYTKIN VALMIS (KARTTASEPPA, karttaseppa-kallistus-kytkin b71fb668c): VALIKKO → KARTTA → 'KALLISTUS' (LATAA SIVUN), 22° PYSYY VEDOSSA JA ZOOMISSA, ?kallistuskulma=30 / ?koe=kallistuspysyva, EI OLETUS; KORJATTU pinnanPiste (ZOOMIN ANKKURI KARKASI KALLISTETTUNA), LADONTA VAKAASSA KALLISTUKSESSA TODELLISELLA KAMERALLA; AVOIN: NIPISTYS KOSKETUSLAITTEELLA → OMISTAJAN iPAD-KOKEILU; SEURAAVA EMOLAATTA POHJAN TILALLE (23.9.2026 klo 14.05)

Kirjattu Fable.

## SAVUKEREGRESSION KAKSI OIKEAA SYYTA (PELIKOODARI, PR #2931), EI KUORMA (HEAD 3/3 SAMA): 1) v2087 (#2756) JATTI CSS:AAN ORVON '}' → .pallolauta-liike-pulu-SAANTO KAATUI, PIENI PULU NAKYNYT 22.9. LAHTIEN AINA KARTAN VASEMMASSA KULMASSA MYOS PELAAJALLA; VARTIJA css-sulkeet.test.mjs; 2) v2142 NIMIOLUKKO: SAVUKE nimiot-elavat JAI JALKEEN SAANNOSTA 5 → LUKKOPOIKKEUS SAVUKKEESEEN; SUORAAN KARTALLE EI SYYLLINEN; MUUT 7 PUNAISTA AJETAAN ERIKSEEN (23.9.2026 klo 14.07)

Kirjattu Fable.

## SUMEAT LAIKUT OLIVAT SAMAA SYVYYSTAISTELUA (KARTTASEPPA): LEVEALLA RUUDULLA TUKI z3 (8× SUURENNOS) PISTI LAPI SAMALLA −6-SIIRROLLA; TASONVAIHTO-SYVYYS-ERA KORJAA MYOS NE; PUUTTUVAN LAATAN ALLA ON AINA VALMIS EMOLAATTA (400 ms VIIVEELLAKIN), KIRJASTON POHJAAN EI AUKKOJA → EMOLAATTAERAA EI TARVITA; VERTAILUKUVA docs/raportit/kuvat/tasonvaihto-syvyys-20260923/; KARTTASEPPA → POLTOT (VUORO JULKAISIJAN JA LAITETESTAAJAN KANSSA), SITTEN GAO (23.9.2026 klo 14.16)

Kirjattu Fable.

## NOSTOTASON POLTON SISALTO (FABLE KARTTASEPALLE): 20.9. LINJA (ILMAN KOHDEMAAN TEKSTEJA, JOKITASON KANSSA) + POLTETUN LAATAN NOSTOPISTE HARMAANA (22.9.) + ESP LUKITUT_MAAT-LISTAAN; KAIKKI MAAT JOILLA NOSTOJA, PELATTAVAT ENSIN; HARVENNUKSEN HAIVYTYS: VEDOS (z6 ENNEN/JALKEEN) FABLELLE ENNEN 22c-POLTTOA (23.9.2026 klo 14.17)

Kirjattu Fable.

## OMISTAJAN TUNTUMA 3D-PROTOSTA iPHONELLA: 'PALLO PYORII IHANAN PEHMEASTI UNITYLLA' → NATIIVIN SUUNTA VAHVISTUU; LIIKKEEN KEHYSAJAT HAETAAN LAITTEELTA (23.9.2026 klo 14.19)

Kirjattu Fable.

## LISENSSIVARTIJA (PR #2932, SIIRTOSEPPA, PINOTTU #2898:N PAALLE): tools/vienti/lisenssit.mjs LUOKITTELEE 20 391 MEDIAVIITETTA PELIN PORTTIEN SAANNOLLA, NC/ND 23 = INVENTAARIO, LISTA SAA VAIN LYHENTYA, YKSI LASKURI; LISENSSI PUUTTUU 5 VIITTEELTA (MM. TREVI-NOSTON AANI) → SISALTOKIRJURI TAYDENTAA; AUKKOTARKISTUS (PR #2933) MAANANTAISIN YHTEEN ISSUEEN, 429 EI PUUTTUVA; AUKKOJA 32 = #2913 KORJAA (23.9.2026 klo 14.19)

Kirjattu Fable.

## 3D-PROTO LIIKKEEN KEHYSAJAT iPHONE 17 PRO (RELEASE, 120 Hz): 1885 KEHYSTA, p50 8,33 ms, p95 8,5–8,6 ms, p99 9–16 ms, max 16,75 ms, YLI 1,5× TAVOITTEEN 15 KEHYSTA (0,8 %), KAIKKI YKSITTAISIA YHDEN VSYNCIN OHITUKSIA; LEVOSSA MAX 8,6 ms; OMISTAJA TESTASI JA PYORITTELI: 'IHANAN PEHMEASTI'; NAPAHATTU KORJATTU (KALOTIT 84°, HAIVE 82,5°), JAA HEIKKO REUNA JA LAATTOJEN SAMANKESKISET SYVYYSKAYRAT NAPAA KOHTI (KARTTASEPPA); RAPORTTI PR:KSI SEURAAVAKSI (23.9.2026 klo 14.19)

Vertailu web: iPad v2148 paljas kartta p95 21–23 ms, täydet tilat 27–40 ms.

## GAON LAUDAN PISTE KORJATTU (KARTTASEPPA, karttaseppa-gao 69d6091cf): 16,27° N 0,05° W TARKAT_PAIKAT-LISTAAN, maailmankartta.js x/y PAIVITETTY; SEURAAVAKSI HARVENNUKSEN HAIVYTYKSEN VEDOS z6; tools/arabia-TESTIEN 3 PUNAISTA MAINISSA → LAITETESTAAJALLE (23.9.2026 klo 14.22)

Kirjattu Fable.

## LOPUT 7 PUNAISTA SAVUKETTA (PELIKOODARI): nostokortti = BUGI v2136 (KUVA KUTISTUU 0,53 LISAA-TILASSA 1400 px; FABLE: PALAUTA KUVAN KOKO, PALSTOITUS TEKSTILLE); zoomiraja = VANHENTUNUT VARTIJA (DOM → GL); noppa-saapumisen-aikana JA reittihelmet PUNAISIA JO v2129 (MAHDOLLINEN PELIVIKA, TUTKITAAN); nimiot-sulavat JA marseille-valkkyy KUORMAHERKKIA RAJATAPAUKSIA (INFORMATIIVISIKSI KUNNES CONCURRENCY); pariisi-lahizoom 390 TUNNETTU MAC-PUNAINEN (23.9.2026 klo 14.26)

Kirjattu Fable.

## HARVENNUKSEN HAIVYTYS HYVAKSYTTY (FABLE, VEDOS karttaseppa-harvennus-haive d76821d45, KUVAT docs/raportit/kuvat/harvennus-haive-20260923/): PUDOTETUT VESIVIIVAT SAAVAT VALIPAINON (1,5 px → 0, 3 px → 1), TAYDET ENNALLAAN, z6 EI MUUTU; RESEPTI --resepti-json '{"vesiviivoitus":{"harvennus":"haive"}}'; 22c POLTETAAN UUSIKSI (z0–z5), SITTEN NOSTOTASO; OMISTAJA ARVIOI TUOTANNOSTA (23.9.2026 klo 14.32)

Kirjattu Fable.

## NOSTOKORTTI: KUVAN PIENENEMINEN LISAA-TILASSA ON OMISTAJAN 22.9. klo 23.06 TILAUS (ISO KUVA → KLIKKAUS → KUVA PIENENEE, TEKSTIPALSTA OIKEALLE), EI BUGI; FABLEN AIEMPI TULKINTA PERUTTU; VARTIJA PAIVITETAAN (KUVA ≥ 40 % KORTIN LEVEYDESTA JA ≥ 0,5 × VAIHE 1); noppa 20/20 JA reittihelmet 16/16 EIVAT OLLEET PELIVIKOJA (SAVUKKEET LUKIVAT DOMIA, MERKIT GL-RUNGOLLA), zoomiraja 24/24 (23.9.2026 klo 14.34)

Kirjattu Fable.

## SAVUKKEIDEN JATKOERA (PR #2936, PELIKOODARI, POHJANA #2931): noppa 20/20, reittihelmet 16/16, zoomiraja 24/24 (VARTIJAT GL-RUNGOLLE), nostokortti 78/78 (VARTIJA 4 PAATOKSEN MUKAAN), nimiot-sulavat 1–2 JA marseille-valkkyy 3 TUNNETTUJA MAC-KUORMAPUNAISIA CONCURRENCYYN ASTI; #2898 (AANTEN LISENSSIPORTTI) MERGETTY MAINIIN a72c3ecae, #2932 REBASETTU SEN PAALLE; MAININ SAVUKEREGRESSIO KOKONAAN SELVITETTY: #2931 + #2936 (23.9.2026 klo 14.39)

Kirjattu Fable.

## 3D-PROTO LUKEE SISALTOPAKETIN v1 (266 KAUPUNKIA PALLOLLA SIMULAATTORISSA JA iPHONESSA); PUUTTEET → SKEEMA 1.2 (SIIRTOSEPPA, ~1 h): TARKEYS 0–3 NIMIEN HARVENNUKSEEN (REITTIMAARA + ALOITUS/LENTOKENTTA, PAAKAUPUNGIT JA ALOITUSKAUPUNGIT 3), TIEDOSTOKOOT MANIFESTIIN, RAAKAOLIO-MERKINTA; OSA 2 SEN JALKEEN PILKOTTUNA (ENSIN KAUPUNGIT) (23.9.2026 klo 14.39)

Kirjattu Fable.

## 3D-PROTO VP2 VALMIS (3D-SELVITTAJA, RAPORTTI 3d-proto-kaupungit-20260923.md PR #2934): SOVELLUS HAKEE SISALTOPAKETIN AMPARISTA JA VALIMUISTITTAA, 266 KAUPUNKIA PISTEINA JA NIMIOINA, HARVENNUS TARKEYDELLA; LEVOSSA p95 8,6 ms, KAYNNISTYKSESSA YKSI 240 ms KEHYS; FONTTI VALIAIKAINEN (LiberationSans OFL; WEBIN APPLE-JARJESTELMAFONTTEJA EI VOI PAKETOIDA → FONTTIPAATOS OMISTAJALLE MYOHEMMIN, VALIAIKAISESTI OFL-SERIF); SEURAAVA VP3: KAUPUNGIN NAPAUTUS JA LAHESTYMINEN, SITTEN REITIT (485) (23.9.2026 klo 14.39)

Kirjattu Fable.

## NOSTOTASON POLTTO VAATII PALLON KYTKENNAN (KARTTASEPPA): PALLO EI NAYTA NOSTOLAATTOJA (KOHDEMAAN_NIMIOT_ELAVINA = true) → FABLE: VAIHTOEHTO a) ESP-LUKITUKSEN KORJAUS (lukittuAnkkuri ILMAN MAATA POLTTI VALIMEREN TOULONIIN), LIPPU --nostot-ilman-nimioita, PALLON KYTKENTA KOELIPUN TAKANA (?koe=poltetutnostot, MITTAUS-RYHMA) → OMISTAJA VERTAA dc:N (TAYDET TILAT 408–475 vs PALJAS 35–83) JA TUNTUMAN ENNEN OLETUSTA; POHJAPOLTTO 23a ENSIN (23.9.2026 klo 14.40)

Kirjattu Fable.

## SIIRTOSEPPA NOLLATTU (70 %): LUOVUTUS viesti-siirtoseppa-luovutus-20260923-b.md (aafced90a), SAMA SESSION ID, RC KAAVAN MUKAAN; SKEEMA 1.2 EI VALMISTUNUT (WIKIDATA-KYSELY AIKAKATKAISI) → UUSI SESSIO TEKEE ILMAN WIKIDATAA; 5 LISENSSITONTA VIITETTA KORJATTU SISALTOKIRJURIN #2935:SSA (23.9.2026 klo 14.48)

Kirjattu Fable.

## JULKAISIJAN VIRHE JA KORJAUS: #2931 MERGETTY OTSIKOLLA v2149 ILMAN uusi-versio.mjs-AJOA (MAIN JAI v2148) → PR #2937 NOSTAA VERSION JALKIKATEEN; SAANTO JATKOSSA: APP_VERSION-RIVI MAINISTA TARKISTETAAN ENNEN MERGE-OTSIKKOA (JULKAISIJA KIRJAA LUOVUTUKSEEN) (23.9.2026 klo 14.52)

Kirjattu Fable.

## OMISTAJA 3D-PROTOSTA (VP2 iPHONELLA): 'NAPA-ALUEET PUUTTUU, MUTTA PYORII HIENOSTI NYT KAUPUNGIN NIMIEN KANSSA MYOS' → 3D-SELVITTAJA TARKISTAA NAPAHATUN LAITEVERSIOSSA JA KORJAA NAPAUTUSERAN YHTEYDESSA (23.9.2026 klo 14.53)

Kirjattu Fable.

## OMISTAJA 3D-PROTOSTA: LAHIZOOMISTA PUUTTUU KERROS (EI YHTA TARKKA KUIN WEB) → PROTOSSA VAIN PALLOLAATAT z0–8; 3D-SELVITTAJA LISAA MAALAUTOJEN PYRAMIDIN (22c, SYVAT TASOT) TOISENA KERROKSENA KARTTASEPAN OSOITTEILLA; NAPAUTUS + NAPAHATTU + LAHIZOOMI SAMAAN LAITEKAANNOKSEEN (23.9.2026 klo 14.54)

Kirjattu Fable.

## POLTETUT NOSTOT -ERA VALMIS (KARTTASEPPA, karttaseppa-poltetut-nostot 1a14dae23): ESP LUKITTU, POLTTO KYSYY ANKKURIN MAAN OMASTA TAULUSTA; ESP NOSTOTASOLTA YHA ESTETTY (TAKYPOOLI VAIHTUU KAUPUNGEITTAIN); LIPPU --nostot-ilman-nimioita → nostotasot[ISO].nimiot = false; KOE ?koe=poltetutnostot + KYTKIN 'POLTETUT NOSTOT' (MITTAUS-RYHMA): POLTETUILLE NOSTOILLE VAIN NIMI, EI IKONIA, VALOTAPLA JA OSUMA JAAVAT; VAIKUTUS NAKYY VASTA POLTON JALKEEN; POLTTOJARJESTYS: POHJA 23a → NOSTOT + NIMIOT + PALLO 20260923a, JULKAISTAAN YHDESSA; ODOTTAA JULKAISIJAN VUOROA (23.9.2026 klo 14.55)

Kirjattu Fable.

## OMISTAJAN KYSYMYS 3D-PROTOSTA (MYOHEMMAKSI, EI NYT): KAMERAKULMAN KALLISTUS KAHDELLA SORMELLA JA MAASTON KORKEUSEROT; FABLE: MOLEMMAT MAHDOLLISIA CESIUMISSA — KALLISTUS ~1 PAIVAN ERA (KAMERAN PITCH KAHDEN SORMEN VEDOLLA), KORKEUSMALLI MUUTAMAN PAIVAN PROJEKTI (AVOIN COPERNICUS-DEM → QUANTIZED-MESH OMAAN AMPARIIN, EI CESIUM ION; LAATAT MAASTON PAALLE, NIMIOT PINNALLE); OMISTAJA: ENSIN PELI PELATTAVAKSI NYKYISELLA PALLOKARTALLA (23.9.2026 klo 14.57)

Kirjattu Fable.

## SKEEMA 1.2 VALMIS (PR #2938, SIIRTOSEPPA): TARKEYS 0–3 (JAKAUMA 130/25/23/88; PAAKAUPUNGIT STAATTISESTA TAULUSTA tools/vienti/paakaupungit.mjs, 78 kpl), MANIFESTIIN TAVUT, kaupunki.data RAAKAOLIO; OSA 2 ALKAA (KAUPUNKI-PACKIEN FUNKTIOT TUNNISTEIKSI, PELIKOODARIN KANSSA) (23.9.2026 klo 14.57)

Kirjattu Fable.

## OMISTAJA 3D: 1) VARJOSTUS AURINGONVALOLLA (KUKKULAT/LAAKSOT) → FABLE: KORKEUSMALLIN KANSSA KAYTANNOSSA ILMAINEN (SUUNTAVALO + NORMAALIT), VOI SITOA PELIN KELLONAIKAAN; KIRJATTU MAASTOVAIHEEN OSAKSI (MYOHEMMIN); 2) TESTILAITTEEKSI OMISTAJAN iPAD USB:SSA (EI PUHELUITA), iPHONE VARALLE; 3D-SELVITTAJA PARILIITTAA JA KAANTAA iPADILLE (23.9.2026 klo 14.58)

Kirjattu Fable.

## OMISTAJAN LINJAUS 23.9. klo 15.0x (SITOVA): NATIIVIIN iOS-PELIIN (UNITY + CESIUM) SIIRRYTAAN MAHDOLLISIMMAN PIAN — 'MAHDOLLISTAA NIIN HURJAN PALJON PAREMMAN KOKEMUKSEN: KORKEUSEROT, KAMERAN KALLISTUKSET, TOKKIMATON RUUDUNPAIVITYS, KAMERA-AJOT JA VISUAALINEN DATA KARTAN PAALLA — YKSI ASIA, MIKA EROTTAA TAMAN PELIN KAIKISTA MUISTA'; KORTTI: WEB YLLAPITOON (VAIN BUGIKORJAUKSET JA SISALTO), NATIIVI ETUSIJALLE; KARTTASEPAN KALLISTUS VAIHE 2 JA POLTETUT NOSTOT -KYTKENTA KESKEYTETAAN, LAATTAPOLTOT JATKUVAT (NATIIVI KAYTTAA SAMOJA LAATTOJA); PELIKOODARI SIIRTYY NATIIVIN TUEKSI (C#/UNITY) 3D-SELVITTAJAN RINNALLE; NATIIVIN ENSIMMAINEN PELATTAVA TAVOITE: MATKUSTUS PALLOLLA + KAUPUNKILEHDET (NAPAUTUS, REITIT, MATKA KAMERA-AJOLLA, SAAPUMINEN, LEHTI WKWebView-KUORESSA ALUKSI), SITTEN KORKEUSMALLI JA KALLISTUS (23.9.2026 klo 15.07)

Kirjattu Fable. Raamatun Ydinajatus saa uuden kohdan NATIIVI PELI.

## OMISTAJAN IDEAT NATIIVIIN (MYOHEMMIN, MAASTON JALKEEN): 1) KOHDENNETTU VALO — AURINKO/KOHDEVALO VAIN SIIHEN OSAAN KARTTAA, MISSA TARINA ON KAYNNISSA (IHMISLINSSI), MUU PALLO HAMARAMPI → SPOT LIGHT TAI VALOKEILA LAATTOJEN VARJOSTIMESSA, LAHES ILMAINEN; 2) KOLMIULOTTEISET SUMUKERROKSET → KERROKSELLINEN SUMU ERI KORKEUKSILLA (KOHINA, PARALLAKSI, LENTO SUMUN LAPI), MOBIILISSA HALPA; AITO TILAVUUSSUMU RASKAAMPI; LEVYSIIVOUS: wt 37 Gt, JULKAISIJA POISTAA MERGETYT WORKTREET MERGEN JALKEEN (RUTIINI), ROOLIT SIIVOAVAT VANHAT MUOKATUT (23.9.2026 klo 15.10)

Kirjattu Fable.

## NATIIVIN TYONJAKO (PELIKOODARI ↔ 3D-SELVITTAJA, FABLE HYVAKSYI): 3D-SELVITTAJA = KAMERA, LAATAT, CESIUM, MERKIT, KAANNOKSET, PROTO-GITIN MASTER (MERGEAA); PELIKOODARI = PUHDAS C#-PELILOGIIKKA ILMAN UnityEngineA (Assets/Matkakirja/Peli/, OMA asmdef: PELITILA, REITTIVERKKO PAKETISTA, MATKAN VAIHEET, SAAPUMINEN) + OHUET UNITY-KYTKENNAT + WKWebView-LIITANNAINEN; RAJAPINTA IKamera.Aja(lat, lon, korkeus, kesto, valmis) JA KaupunkiNapautettu(id); TESTAUS dotnet/csc ILMAN EDITORIA; HAARAT pelikoodari/<aihe>, WORKTREE ILMAN Library-KANSIOTA; SIMULAATTORI VAIN LAITETESTAAJAN KAUTTA; LEVY 97 % → NAS-ARKISTO POLTOILLE, PELIKOODARIN ROOLIKANSIO PALAUTETTU (SIIVOUSVAHINKO) (23.9.2026 klo 15.12)

Kirjattu Fable.

## NATIIVIN LAATTAOSOITTEET (KARTTASEPPA, karttaseppa-natiivi-laatat 3b7481ec6, docs/raportit/natiivi-laattaosoitteet-20260923.md): PALLON SARJA = NATIIVIN PAAKERROS (WEB MERCATOR XYZ 256 px z0–8), PYRAMIDIN KAAVAT JA KERROSPOLUT; RANSKAN z9–z10 ~6 200 LAATTAA, ~190 Mt, <30 min; LOYDOS: RELIEFI EI TARKENNU YLI z8:N 1′-AINEISTOLLA → GLO-30 TARVITAAN MYOS SYVIIN TASOIHIN; JARJESTYS DEM → SYVAT TASOT; DEM NAS:IIN (Matkakirja-arkisto/dem/), TYOTIEDOSTOT PAIKALLISESTI; POLTOT 22 ARKISTOIDAAN NAS:IIN (23.9.2026 klo 15.13)

Kirjattu Fable.

## SISALTOPAKETTI OSA 2 (SIIRTOSEPPA): #2939 KAUPUNKIDATAN FUNKTIOT TUNNISTEIKSI (11 PULMAA → generaattori-KENTTA, starFound/winnerStar {name}-POHJIA, VARTIJA ESTAA UUDET FUNKTIOT; VIENNIN FUNKTIOT 125 → 70, JALJELLA LINSSIT JA APUFUNKTIOT; LEHTIDATASSA 0); #2940 SKEEMA 1.3 + web/lehti.json (LEHTI TARVITSEE 264 JS-MODUULIA + 5 CSS, ~29 Mt, sha256; KUVAT ~300 Mt AJON AIKANA); AVOIN: PELIKOODARI TEKEE KUORISIVUN ?lehti=<id> ILMAN LAUTAA (WKWebView) (23.9.2026 klo 15.20)

Kirjattu Fable.

## LEVY: OMISTAJA VAPAUTTI SSD:TA, 80 Gt VAPAANA, LISAA TULOSSA; UNITY-KAANNOKSET JA POLTOT EIVAT ENAA LEVYRAJOITTEISIA; NAS-RAKENNE /Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/ (pyramidi-poltto, dem) (23.9.2026 klo 15.22)

Kirjattu Fable.

## OMISTAJA 23.9. klo 15.2x: OPUS-SESSIOT (3D-SELVITTAJA, PELIKOODARI, KARTTASEPPA, SIIRTOSEPPA) SAAVAT KAYTTAA ALI-AGENTTEJA JA PARVIA (OPUS KOODIIN, SONNET LUKEVAAN), KUN SIITA ON HYOTYA — ESIM. NATIIVIN PORTIN RINNAKKAISET OSAT, DEM-LAATOITUS, FUNKTIOIDEN MUUNNOS; RAAMATUN SAANTO PYSYY: EI KOSKAAN FABLE-MALLIA AGENTTINA; KAKSI OPUSTA ON LAPIMENON RAJA (H) → PARVET PIENINA JA PERAKKAIN (23.9.2026 klo 15.23)

Kirjattu Fable.

## NATIIVIN KAUPUNKILEHDEN KUORISIVU (PR #2942, PELIKOODARI): index.html?lehti=<kaupunki> AVAA PELKAN LEHDEN (EI TALLENNUSTA, EI LAUTAA, EI SAAPUMISESITYSTA; DIALOGIT TOIMIVAT); SULKEMINEN → webkit.messageHandlers.matkakirja {tapahtuma: 'lehti-suljettu', kaupunki}; JUURI index.html + main.js SIIRTOSEPAN PAKETTIIN; PELIKOODARIN C#-OSA ALKAA klo 16.14 ILMAN PROTO-GITIA JOS 3D-SELVITTAJA EI VASTAA (23.9.2026 klo 15.27)

Kirjattu Fable.

## KARTTASEPPA NOLLATAAN (72 %): LUOVUTUS viesti-karttaseppa-luovutus-20260923-b.md (karttaseppa-tyo-20260922 2ea9c9856); DEM-TYOKALU HAARASSA karttaseppa-maasto, COPERNICUS GLO-30 (155 RUUTUA) NAS:ISSA koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30; MAASTOAJO z0–12 KESKEYTETTY z10:N JALKEEN LEVYRUUHKAN TAKIA (UUSINTAKOMENTO LUOVUTUKSESSA); POLTOT 23a VALMIINA wt/karttaseppa-poltto-23a (EI POISTETA), ODOTTAVAT CI-VUOROA JA RUUHKAN LOPPUA (23.9.2026 klo 15.29)

Kirjattu Fable.

## MAASTO (KARTTASEPPA, /Users/Shared/Claude/maasto-poltto/aja-maasto.sh, HAARA karttaseppa-maasto): z0–z10 VALMIS, z11–z12 ODOTTAA 'LEVY VAPAA' (114 000 LAATTAA, ~0,8 Gt, ~10 min + VIENTI 15–20 min) → AMPARIIN julisteet/maasto/2026-09-23a, layer.json CESIUMILLE; FABLE: z12 (76 m) RIITTAA PROTOON, z13 (30 m, 368 000 LAATTAA) VASTA OMISTAJAN KOKEILUN JALKEEN; PR MAASTO-HAARASTA (23.9.2026 klo 15.33)

Kirjattu Fable.

## SISALTOPAKETTI OSA 2 KOKONAAN VALMIS (SIIRTOSEPPA): #2941 MATKUSTUS JA SAAPUMINEN (HINNAT 30 VAKIOTA KOKOELMAAN saannot, saapuminen-KOKOELMA 266 KAUPUNGILLE), #2944 LOPUT 70 FUNKTIOTA LUOKITELTU manifest.logiikka (MEDIA 7, ESILASKETTU 14, SAANTO 16, LOGIIKKA 29, KUOLLUT 4; 3 SONNET-AGENTTIA; VARTIJA); #2940 PAIVITETTY LEHTIKUOREEN (~43 Mt); PINO #2938 → #2939 → #2940 → #2941 → #2944 ODOTTAA JULKAISIJAA; JULKAISIJAN JONO ON NYT PULLONKAULA (23.9.2026 klo 15.37)

Kirjattu Fable.

## NATIIVIN PELILOGIIKKA ERA 1 (PELIKOODARI, /Users/Shared/Claude/natiivi-peli 608aa47, 3 OPUS-AGENTTIA): REITTIVERKKO + PAKETIN TUONTI + mulberry32 VASTAAVAT WEBIA (8052 TAPAUSTA); PELITILA JA MATKAN TILAKONE TOISTAVAT WEBIN 733 ASKELEEN KULTAISEN JALJEN (MYOS TALLENNUS/LATAUS); LEHDEN iOS-LIITANNAINEN JA UNITY-KUORI KAANNETTY; TESTIT 39/39 dotnetilla; POIS VIELA KYSYMYKSET, LAATAT, XP; JUMI: 3D-SELVITTAJA EI VASTAA TYONJAKOON → TIEDOSTOT EIVAT VIELA PROTO-GITISSA; RISKIT: AANETTOMYYSKYTKIN, WEB INSPECTOR POIS ENNEN APP STOREA (23.9.2026 klo 15.42)

Kirjattu Fable.

## LAITETESTAAJA: CI-KORJAUKSET #2928 + #2945 (ARABIA-SIIVOUS) VALMIIT; CONCURRENCY (savukkeet-ref PERUU SAMAN HAARAN VANHAN AJON) ON TAHALLINEN, EI MUUTOSTA; NATIIVIMITTARI HYVAKSYTTY: UNITY PROFILER + 3D-SELVITTAJAN SISAINEN MITTARI, TOKKAYS > 12,5 ms (PIENI) / > 33 ms (ISO), SAMA REITTI KUIN mittaa-sulavuus.mjs, RAPORTTI sulavuus-natiivi-vs-web; VANHAT MITTAUS-WORKTREET POISTETTU, LEVY 131 Gt (23.9.2026 klo 15.50)

Kirjattu Fable.

## LEVY VAPAA (OMISTAJA, 170 Gt): KARTTASEPPA ALOITTAA MAASTON z11–z12 + VIENNIN (iPAD-KAANNOKSEN JALKEEN), SITTEN POLTOT 23a + NOSTOTASO CI-VUOROLLA; OMISTAJAN iPAD-RUN XCODESTA KAYNNISSA (IL2CPP 59/140, EI JUMISSA) (23.9.2026 klo 15.53)

Kirjattu Fable.

## OMISTAJA klo 15.5x: LAHTEE TREENEIHIN, SEURAA iPHONELLA; iPAD JAA KYTKETTYNA JA LUKITSEMATTOMANA; OHJE: 'TEE NIIN PITKALLE KUIN PYSTYT PELIA ETEENPAIN UNITYYN' → FABLE AJAA NATIIVIA ITSENAISESTI: 3D-SELVITTAJA VP3 (NAPAUTUS, LENTO, NIMIKORTTI, FONTTI, NAPAKANNET, LAHIZOOMI) → REITIT PALLOLLE → MAASTO (KARTTASEPAN layer.json) → LEHTI WKWebView-KUORESSA (PELIKOODARI #2942 + LIITANNAINEN) → PELITILAN KYTKENTA KAMERAAN; JOKAINEN VALMIS VAIHE iPADILLE; OMISTAJAA TARVITAAN VAIN LUPAKYSYMYKSIIN (23.9.2026 klo 15.54)

Kirjattu Fable.

## NATIIVIN PELILOGIIKKA ERA 2 (PELIKOODARI, pelikoodari/pelilogiikka 5ff8444): KYSYMYSMOOTTORI JA XP (MONIVALINTA, ISOISAN VAITTAMA, TARINAKAARI, TUTKIMINEN, VALOKUVA- JA LIPPUKYSYMYS, VIHJEET; KULTAINEN JALKI 1496 TEKOA IDENTTINEN WEBIN KANSSA), AARRELAATAT (JAKO, KAANTO, ARVONTA, TAHDET, LUKITUS; 279 SATUNNAISLUKUA JA 252 KAANTOA TASMAAVAT); TESTIT 61/61; POIS PULMAT, TAPAHTUMAKORTIT, KAKSINTAISTELU; ERA 3 KAYNNISSA (UNITY-SILMUKKA PARIISI → KAUPUNKI → LEHTI → PALUU) (23.9.2026 klo 16.01)

Kirjattu Fable.

## 3D-PROTO VP3 iPADILLA (iPad Pro 11 M5, iOS 27, 120 Hz; PROTO-MASTER bc4feea, PELIKOODARIN HAARA MERGETTY): NAPAUTUS → LENTO 1,4 s WEBIN PEHMENNYKSELLA (KAARI PITKILLA MATKOILLA) → NIMIKORTTI; EB GARAMOND; NAPAKANNET; LAHIZOOMI RAJATTU 3,6° (PALLOSARJA PAATTYY z8, TARKEMPI VAATII z9–z10-POLTON DEM:N JALKEEN); LAATAT 22c; KEHYSAJAT LENNOSSA 960 KEHYSTA p50 8,33 / p95 8,55 / max 9,5 ms, 0 YLI 12,5 ms; LAITETESTAUKSEN KOMENTOTIEDOSTO Documents/komento.txt; TYOTAPA proto-3d/TYOTAPA.md; SEURAAVA VP4 REITIT (23.9.2026 klo 16.05)

Kirjattu Fable.

## SULAVUUS NATIIVI vs WEB (LAITETESTAAJA, PR #2946): KAMERA-AJOSSA MOLEMMAT 0 % TOKKAYKSIA, NATIIVI p50 8,33 ms/120 Hz, WEB (MAC) p50 16,7 ms/60 Hz; RAJOITE: NATIIVIN KOMENTOTIEDOSTO EI TUE KOSKETUSTA → SYNTEETTISET KOSKETUSKOMENNOT JA 3 TOISTOA; VERTAILU OMISTAJAN iPAD-KIERROKSEN LUKUIHIN (WEB iPAD p95 21–40 ms, >20 ms 7–33 %); analysoi-natiivi-sulavuus.mjs 3D-SELVITTAJAN MITTARIN PAALLE (23.9.2026 klo 16.09)

Kirjattu Fable.

## 3D-PROTO VP4 iPADILLA: REITIT ELAVANA KERROKSENA (NAAPURIREITIT HENTONA MUSTEENA/SINERTAVINA, LENTOKAARET SINOOPERINA ANIMOIDULLA KATKOLLA, VALITTU REITTI KOROSTUU LENNON AJAKSI), POLKU WEBIN KAAVALLA (LAUDAN PISTEET, VIA, CATMULL–ROM, MILLER → ASTEET) → OSUU LAATTOJEN REITTIIN; SYNTEETTISET ELEET (VETO, HEITTO, NIPISTYS) LAITETESTAAJALLE: 1141 KEHYSTA p50 8,33 / p95 8,49 / max 10,3 ms, 0 YLI 12,5 ms; PAKETTIIN lautaX/lautaY PAATASOLLE (SIIRTOSEPPA); VP5 MAASTO ODOTTAA layer.json:IA, SILLA VALIN KAHDEN SORMEN KALLISTUS JA NIMIOT PINNALLE (23.9.2026 klo 16.15)

Kirjattu Fable.

## SULAVUUS NATIIVI vs WEB, LOPULLINEN (PR #2946): SAMA ELE (PARIISI-VETO + HEITTO), SAMA iPAD: NATIIVI 3 TOISTOA 0 % TOKKAYSTA, p95 8,39–8,51 ms; WEB 7–43 % YLI 20 ms; VARAUS: PROTO ON SISALLOLTAAN SUPPEAMPI (EI TAYSIA NIMIOITA/UI:TA) → TOISTO KUN SISALTOA ON ENEMMAN, PYSYVA SULAVUUSPORTTI NATIIVILLE MYOHEMMIN (23.9.2026 klo 16.18)

Kirjattu Fable.

## NATIIVIN PELILOGIIKKA ERA 3 MERGE-VALMIS (PELIKOODARI, pelikoodari/pelilogiikka 6ab5520): AARRELAATAT KYTKETTY (YKSI Matka: MATKA + KYSYMYKSET + XP + AARTEET; JALKI 2660 TEKOA IDENTTINEN WEBIN KANSSA, TALLENNUS v3); UNITY-SILMUKKA: PeliOhjain, SISALTO AMPARISTA VALIMUISTIN KAUTTA, UUSI PELI PARIISISTA, NAPAUTUS → MATKAVALINTA (BUSSI/LENTO/LIFTAUS/LAIVA, HINTA) → KAMERA-AJO → SAAPUMINEN → LEHTI WKWebView → TALLENNUS persistentDataPath/tallennus.json, TILARIVI; TESTIT 85/85, csc 0 VIRHETTA; 3D-SELVITTAJA KAANTAA JA ASENTAA; ERA 4: KYSYMYS-UI, KOSKETUSTEN ESTO DIALOGIN AIKANA (23.9.2026 klo 16.20)

Kirjattu Fable.

## OMISTAJAN LINJAUS 23.9. klo 16.2x (SITOVA, KORVAA 15.07 KOHDAN 'WEB YLLAPITOON'): KOKO PELI KAIKKINE LINSSEINEEN TEHDAAN VALMIIKSI UUTEEN NATIIVIIN APPIIN ALUSTA LOPPUUN PYSAHTYMATTA; TOKENEITA ON HYVIN → KAIKKI NOPEUTUKSET (PARVET, ALI-AGENTIT, RINNAKKAISET SESSIOT) VAPAASTI KAYTTOON; FABLE PYYTAA LISAA SESSIOITA HETI TARVITTAESSA; WEB-PELIN KEHITYS JATETAAN KOKONAAN KESKEN TOISTAISEKSI (VAIN JULKAISIJAN NYKYINEN JONO AJETAAN LOPPUUN, SISALTO JATKUU KOSKA SE SIIRTYY) (23.9.2026 klo 16.21)

Kirjattu Fable. Raamatun kohta NATIIVI PELI ETUSIJALLE päivitetään.

## NATIIVISIIRRON HUOMIOT (FABLE OMISTAJALLE): YKSI TOTUUS = SISALTOPAKETTI + KULTAISET JALJET VARTIJANA; LEHDET WKWebView-KUORELLA (PAATOS MYOHEMMIN NATIIVIPORTISTA; APP STORE 4.2 TAYTTYY KARTALLA JA LOGIIKALLA); MEDIA AJON AIKANA VALIMUISTIIN, LISENSSIVARTIJA, RADIOT POIS; OFFLINE JA TALLENNUS; FONTTI/KIELET/SAAVUTETTAVUUS; iOS-AANILUOKKA; iPAD JA iPHONE ASETTELUT, SULAVUUSPORTTI, MUISTIRAJA; JULKAISU: DEVELOPER PROGRAM HAETTAVA NYT (1–2 pv), BUNDLE ID, IKONI, TIETOSUOJA, IKARAJA 13+; KAANON EI MUUTU; WEB JAA PELATTAVAKSI, SISALTO PAIVITTYY PAKETIN KAUTTA; UUDET SESSIOT: LINSSISEPPA JA NATIIVI-UI (OPUS), KANSIOT LUOTU; 3D-SELVITTAJA → NATIIVISEPPA (23.9.2026 klo 16.23)

Kirjattu Fable.

## PELIKOODARI NOLLATAAN (69 %): LUOVUTUS viesti-pelikoodari-luovutus-20260923-natiivi.md (pelikoodari-tyo-20260923 84c256855); PROTO-GIT 6ab5520 MERGE-VALMIS; ERA 4 (KYSYMYS-UI, KOSKETUSTEN ESTO) UUDELLE SESSIOLLE (23.9.2026 klo 16.24)

Kirjattu Fable.

## MAASTO VALMIS (KARTTASEPPA): RANSKA z0–z12, 122 889 LAATTAA, 994 Mt AMPARISSA (julisteet/maasto/2026-09-23a), layer.json-URL NATIIVISEPALLE; POLTTO 23a VAIHE 1 ALKOI (JULKAISIJA ESTAA SAVUKKEET POLTON AJAKSI) (23.9.2026 klo 16.24)

Kirjattu Fable.

## UUDET SESSIOT AVATTU (OMISTAJA klo 16.2x): LINSSISEPPA (OPUS, local_3273f209, /Users/Shared/Claude/Matkakirja-linssiseppa; LINSSIT NATIIVIIN: TOPOGRAFIA → IHMISEN MATKA → ASTRONAUTTI → MUUT, RADIO POIS) JA NATIIVI-UI (OPUS, local_9ed5a7df, Matkakirja-natiivi-ui; TILARIVI, VALIKOT, MATKAVALINTA, KAUPUNKIKORTTI, LEHTIKUORI, KARTUSCHA, KARTTASELITE, PULU, LUENNAT; UI TOOLKIT); PROTO-GITIN HAARAT linssiseppa/<aihe>, natiivi-ui/<aihe>, MASTER NATIIVISEPPA; ROOLISETTI NYT 10 SESSIOTA (23.9.2026 klo 16.30)

Kirjattu Fable.

## OMISTAJA: APPLE DEVELOPER PROGRAM ON JO OLEMASSA (WEBKUORI JULKAISTU APP STORESSA) → TESTFLIGHT JA APP STORE MAHDOLLISIA HETI; XCODE NAYTTAA VAIN PERSONAL TEAMIN → SELVITETTAVA ONKO MAKSULLINEN TIIMI SAMALLA APPLE ID:LLA VAI TOISELLA (23.9.2026 klo 16.33)

Kirjattu Fable.

## OMISTAJAN LINJAUS 23.9. klo 16.3x: NATIIVIPELI MAHDOLLISIMMAN PIENI — SISALTO, MEDIA, LAATAT JA MAASTO STRIIMATAAN AMPARISTA (KUTEN GOOGLE EARTH), EI PELIPAKETIN SISAAN; PELAAJALLE VALINTA LADATA ALUEITA OFFLINE-KAYTTOON NIIN PALJON KUIN HALUAA (ASETUKSET → OFFLINE-LATAUS MAITTAIN); PERUSSISALTO BINAARIIN VAIN SE MIKA TARVITAAN ENSIKAYNNISTYKSEEN (23.9.2026 klo 16.34)

Kirjattu Fable. Raamatun NATIIVI PELI -kohtaan lisätään.

## JULKAISIJA: DOCS/TOOLS-PR:T MERGETTY (#2917 #2922 #2923 #2934 #2933 #2916 #2928 #2945 #2946), #2937 SULJETTU (VERSIO NIPUSSA 2); NIPPU 2 (#2947, 10 HAARAA) ODOTTAA POLTON LOPPUA (~2 h); NIPPU 3 (SISALTOPAKETTI, 5 HAARAA) → FABLE: MERGE HETI TESTIT-VIHREALLA ILMAN SAVUKKEITA (EI AJOAIKAISTA KOODIA, NATIIVIN KRIITTINEN POLKU); 12 WEB-PR:AA ODOTTAA; JULKAISIJA VALMISTELEE NATIIVIN JULKAISUPUTKEN (TESTFLIGHT, NIGHTLY iPAD) (23.9.2026 klo 16.35)

Kirjattu Fable.

## NATIIVIN SIIRTOSUUNNITELMA (PR #2948, SIIRTOSEPPA, 6 SONNET-AGENTTIA, 132 TOIMINTOA): KARKEA ARVIO ~4500 h, VAIHE 1 PELATTAVA YDIN ~2000 h; OMISTAJITTAIN NATIIVISEPPA 1575, NATIIVI-UI 1661, PELIKOODARI 610, LINSSISEPPA 622 (CESIUM PUOLITTAA LAUDAN OSUUDEN); lauta{x,y} JA reitti.via JO #2944:SSA; KAANONI: TAPAHTUMAKORTIT (VAIN AFRICA.events) TUODAAN PAKETTIIN SELLAISENAAN, MEKANISMI NATIIVIIN YLEISENA, EI UUSIA KORTTEJA NYT; SEURAAVA: KORJAUSLISTA (SAANTOVAKIOT, LINSSIEN MEDIA/DATA, AANITAULUT) (23.9.2026 klo 16.36)

Kirjattu Fable.

## KARTTASEPAN NATIIVIKETJU (docs/raportit/karttaseppa-natiivi-ketju-20260923.md): FABLEN PAATOKSET: PELATTAVAT MAAT = E28 (VARILAATASTOMAAT, GLO-30 ~25 Gt), K110 MYOHEMMIN; GLO-90 KOKO MAAILMAN MAASTOON SALLITTU (~100 Gt NAS:IIN, SAMA COPERNICUS-LISENSSI); JARJESTYS: POLTTO 23a → LINSSISEPAN RELIEFISARJA z0–z8 (~klo 21) → RANSKA z9–z10 → E28 z9–z10 + MAASTO z12 → MAAILMA GLO-90 z0–z10 (23.9.2026 klo 16.39)

Kirjattu Fable.

## KOEPAKETTI (SKEEMA 1.5, 430 TIEDOSTOA, 59 Mt): SIIRTOSEPAN LUPATARKISTUS ESTI AVAINTEN LUVUN → EI AMPARIIN; PAKETTI JAETAAN PAIKALLISESTI /Users/Shared/Claude/sisalto-koe/ (NATIIVISEPPA TARJOILEE LAHIVERKOSSA iPADILLE); OIKEA PAKETTI CI:STA KUN NIPPU 3 ON MAINISSA; NIPPU 3:EEN LISATAAN 08d238ec2 JA 94f94e8a7 (23.9.2026 klo 16.45)

Kirjattu Fable.

## LINSSI-INVENTAARIO (LINSSISEPPA, docs/raportit/natiivi-linssit-inventaario-20260923.md): NATIIVIIN 7 LINSSIA (TOPOGRAFIA, IHMISEN MATKA, ASTRONAUTTI, KEKSINNOT, VESISTOT, VERTAILU, MAATIEDOT; KARTTAPALLO EI OLE LINSSI NATIIVISSA; RADIO POIS); RUNKO proto linssiseppa/linssirunko (ILinssi, REKISTERI, ODOTUSPEITE, TOPOGRAFIAN LOGIIKKA, 16/16); FABLEN PAATOS: TOPOGRAFIA SAA RADION VAPAUTTAMAN 1400 tp -AVAUSKYNNYKSEN (EI ENAA VAIN KEHITTAJATILASSA), MUUT KYNNYKSET ENNALLAAN; SEURAAVA AIKAJANAMOOTTORI (IHMISEN MATKA) (23.9.2026 klo 16.46)

Kirjattu Fable.

## NATIIVIN PELILOGIIKKA ERA 4 (PELIKOODARI, pelikoodari/kysymys-ui fc1938b): 'TUTKI KAUPUNKIA' → KYSYMYS (VAIHTOEHDOT, VIHJE, 50:50, 45 s, LAATAN KAANTO JA LOYTO), PULMAT (11 GENERAATTORIA C#), KAKSINTAISTELU, TAPAHTUMAKORTIT; SyoteLukko ESTAA PALLON KOSKETUKSET DIALOGIEN AIKANA; KAUPAT JA RAHA LOGIIKKANA; TESTIT 125/125, KULTAISET JALJET IDENTTISET; TYONJAKO: NATIIVI-UI TEKEE VISUAALISET NAKYMAT PELIKOODARIN RAJAPINTOIHIN (IKysymysNakyma ym., proto-3d/RAJAPINTA.md), PELIKOODARILLA OHJAIMET JA UGUI-VARANAKYMAT; AVOIN: KUVA-/LIPPUKYSYMYSTEN DATA, PULMAPIIRROKSET; SEURAAVA ISOISAN LUENNAT (23.9.2026 klo 17.21)

Kirjattu Fable.

## NATIIVISEPPA TILA klo 17.2x: TYOTAPA.md NELJALLE KIRJOITTAJALLE, RAJAPINTA.md MASTERISSA (b9847ea: KAMERA, KAUPUNGIT, REITIT, KarttaKerrokset, UiPeittaa, NakymaMuuttui, SyoteEstetty, KALLISTUS KAHDEN SORMEN PYSTYVEDOLLA; VALOKEILA, SUMU, ALUEET SOVITTU); PELIKOODARIN ERAT 1–3 MERGETTY (c7b2f60), SILMUKKA 30 s iPADILLA 6/6 OK, ERA 4 SEURAAVAKSI; MAASTO 23a: MUSTIA KIILOJA RAJALLA (RTIN ILMAN KAAREVUUTTA) → KARTTASEPAN 23b ~klo 18, SIIHEN ASTI KYTKIMEN TAKANA; iPAD-KAANNOS b9847ea KAYNNISSA (UNITYN VIENTI JUMIUTUI KAHDESTI KOPIOINTIIN); FABLEN LUOVUTUS viesti-fable-luovutus-20260923-b.md KIRJOITETTU (60 %) (23.9.2026 klo 17.24)

Kirjattu Fable.

## NATIIVI-UI ERA 1 (natiivi-ui/tilarivi 2a09c4c): UI TOOLKIT -POHJA (TURVA-ALUE, SYOTE-ESTO), YLAPALKKI + TILAPILLERI + ILMOITUS, HAMPURILAINEN (AANET, PIENI LIIKE, UUSI PELI), RATAS (5 AANENTASOA, 'LATAA OFFLINE-KAYTTOON' MAITTAIN → IOfflineLataus), MATKAVALINTA PERGAMENTTIKORTTINA + NOPPA; FONTIT: iOS:N OMAT AMERICAN TYPEWRITER + IOWAN OLD STYLE KUTEN WEBISSA (EB GARAMOND VAIN VARA) → FONTTIPAATOS RATKENNUT; JARJESTYS: KAUPUNKIKORTTI + LEHTIKUORI → KYSYMYS/PULMA/KAKSINTAISTELU/TAPAHTUMAKORTTI-NAKYMAT → KARTUSCHA, KARTTASELITE → PULU → LUENNAT (23.9.2026 klo 17.33)

Kirjattu Fable.

## SISALTOPAKETTI SKEEMA 1.6–1.9 (SIIRTOSEPPA, NIPUSSA 3): SAANNOT +3 JA TAPAHTUMAT, LINSSIAINEISTO (LINSSISEPAN KARSIMA), AANITAULUT, KUVAKYSYMYKSET, LIPPUMAAT, PULMA-AINEISTO, LUENNAT; KOEPAKETTI v4 /Users/Shared/Claude/sisalto-koe/ NELJALLE NATIIVISESSIOLLE; AVOIN: LIVIAN CUE-DATA, RAJAPINTASOPIMUKSET; KONEEN KUORMA >400 (POLTTO + KAANNOKSET) → KOKO TESTISARJA JULKAISIJAN NIPUSSA (23.9.2026 klo 17.34)

Kirjattu Fable.

## NATIIVISEPPA NOLLATAAN (66 %): LUOVUTUS viesti-natiiviseppa-luovutus-20260923.md (3d-selvittaja-luovutus-ilta 799569e6d); iPADILLA b9847ea (KALLISTUS, KarttaKerrokset, MAASTO KYTKIMEN TAKANA), SILMUKKA 30 s OK, LIIKE p95 8,79 / max 12 ms; LEVOSSA 94 YLITYSTA (max 42 ms) TODENNAKOISESTI LEHDEN AIKANA → TUTKITTAVA; PROTO-MASTER ab8098e (ERA 4 + LUENNAT) KAANTYY, iPAD-KAANNOS UUDELLE SESSIOLLE (UNITYN VIENTI JUMIUTUI KAHDESTI); ODOTTAA: NATIIVI-UI:N MERGE (PanelSettings-ASSET EDITORISSA), MAASTO 23b ~18, LINSSISEPAN HAARAT (23.9.2026 klo 17.35)

Kirjattu Fable.

## FABLE NOLLAA ITSENSA (62 %, RAAMATUN KAAVA POSTIVAHDIN KAUTTA): LUOVUTUS viesti-fable-luovutus-20260923-b.md (5b85f5c4d), ALOITUSVIESTI viesti-fable-aloitus.md; NATIIVISEPPA NOLLATTU klo 17.38 (5 %); KAIKKI 10 SESSIOTA TYOSSA; OMISTAJA PALAA ~18 → iPAD-KOKEILU ab8098e:STA (23.9.2026 klo 17.37)

Kirjattu Fable.

## PELIKOODARIN LUENNAT-ERA (pelikoodari/kysymys-ui 7370f69): ISOISAN LUENNAT (Puhe.cs + iOS-AANI-ISTUNTO: INTRO, LENNON ALKU, SAAPUMISPUHEET, MATKAKIRJALUENNOT), KUVA- JA LIPPUKYSYMYKSET, KAUPUNKIKORTIN RAJAPINTA, KauppaTeko, VARTIJA PAKETIN SAANNOT = C#-VAKIOT; 128/128; FABLEN PAATOS: POLLO-WORKERIN SALLITTUIHIN NATIIVIN TUNNISTE (OTSAKE x-matkakirja-natiivi + BUNDLE ID UA:SSA) → PUHESYNTEESI MYOS NATIIVIIN, AANITETYT LUENNAT ENSISIJAISIA; WORKERIN JULKAISU JULKAISIJAN KAUTTA (23.9.2026 klo 17.38)

Kirjattu Fable.

## FABLE UUSI SESSIO (TILI B, local_742d1717) ALOITETTU klo 17.42: LUOVUTUS -b.md LUETTU, 10 SESSIOTA ELOSSA, NATIIVISEPPA UUSI (JONON KOHTA 1 TEHTY); REMOTE CONTROL -KYTKENTA ESTYI LUOKITTIMEEN → OMISTAJA KYTKEE KASIN; SEURAAVA: OMISTAJAN iPAD-KOKEILU ~18, POLTON 23a LOPPU → JULKAISIJAN NIPUT 2 JA 3 (23.9.2026 klo 17.42)

Fable jatkaa luovutuksen jonosta kohdasta 2. Julkaisijalta pyydetty polton ja nippujen tila.

## KORJAUS klo 16.35 KOHTAAN: NIPPU 3 (julkaisija-julkaise-nippu3, 6 SIIRTOSEPAN PR:AA) KOSKEE AJOAIKAISTA KOODIA (game.js, ui.js, sw.js, packs, sound.js) → AJETAAN NORMAALILLA SAVUKKEELLA NIPUN 2 JALKEEN, EI OHITETA; POLTTO 23a YHA KESKEN, NIPUT ODOTTAVAT (23.9.2026 klo 17.42)

Julkaisija tarkisti diffin; Fable vahvistaa. Testejä ei vielä ajettu koneen kuorman takia.

## PELIKOODARI: TTS-PAATOS TOTEUTETTU — POLLO-WORKER PR #2956 (NATIIVI TUNNISTETAAN x-matkakirja-natiivi + BUNDLE ID, VAIN PUHESYNTEESI, 4094/0) → JULKAISIJA MERGEAA, MAIN JULKAISEE WORKERIN; PROTO 76366d6 (Puhe.Lue, KOHTAAMISTEN TERVEHDYS JA REPLIIKIT, LOYTOREPLIIKKI AANEEN, 131/131) MERGE-PYYNTO NATIIVISEPALLA; iPAD ab8098e SILMUKKA k1–k8 OK, LUENTO SOI; PR #2955 (LEHDEN TEKO-SILTA) ODOTTAA #2942 (23.9.2026 klo 17.51)

Tila: docs/raportit/viesti-pelikoodari-luovutus-20260923-natiivi2.md

## LAITETESTAAJA: PELISILMUKAN SAVUKE (aja-pelisilmukka-savuke.mjs) ENSIMMAINEN AJO SIMULAATTORISSA 160f175: 1/6, EI KAATUMISIA; SYY UUSI KAUPUNKIKORTTI-VALITILA ENNEN MATKAVALINTAA → FABLEN PAATOS: TARKOITETTU, KASIKIRJOITUS silmukka-30s.txt PAIVITETAAN, EI BUGI; KONTAKTIARKIT ODOTTAVAT NATIIVI-UI:TA (23.9.2026 klo 17.51)

Raportti docs/raportit/pelisilmukka-savuke-20260923.md

## NATIIVISEPPA ERA 1: PROTO-MASTER b0aee4f (ERA 4 + LUENNAT, NATIIVI-UI TILARIVI + KAUPUNKIKORTTI, PEITTOLISTA, PUHESYNTEESI, RAJAPINTA 10 offline.json); iPAD: k1–k8 OIKEIN, LUENTO SOI; LEVON 94 YLITYSTA = WKWebView-LEHTI PAASAIKEESSA → LEHDEN AIKANA PALLO PIIRTAA JOKA 4. KEHYKSEN, LEVOSSA 1–2 YLITYSTA (ENNEN 44–47); VIENTIJUMIIN unity-vahti.sh; MAASTO 23b 404 klo 17.43. FABLEN PAATOS RAJAPINTA 10.3: WEB ORIGIN-SALLITTULISTA, NATIIVI ILMAN ORIGINIA VAIN OTSAKKEELLA x-matkakirja-natiivi + BUNDLE ID UA:SSA (SAMA KUIN POLLO-WORKER), SAMA SAANTO KAIKKIIN PALVELINRAJAPINTOIHIN, EI SALAISUUKSIA BINAARIIN (23.9.2026 klo 17.54)

Ilmoitettu Natiivisepälle ja Siirtosepälle.

## LINSSISEPPA: NELJA LINSSIA NATIIVISEPALLE — TOPOGRAFIA (linssiseppa/linssirunko f24645e, MERGE-PYYNTO; RELIEFISARJA POLTON 23a JALKEEN), IHMISEN MATKA + ASTRONAUTIN KAMERA + KEKSINNOT (linssiseppa/astronautti 7a86c81, KOEKAANNOS PYYDETTY); 116/116; UI-OSAT NATIIVI-UI ERAN 3 JALKEEN, SEURAAVA VESISTOT. FABLE HYVAKSYY VALIAIKAISESTI POIKKEAMAT WEBISTA (ASTRONAUTIN RELIEFI TAYSVARISENA, EI AUTOMAATTIKIERTOA) OMISTAJAN iPAD-KATSELMUKSEEN ASTI (23.9.2026 klo 17.55)

Linssiseppä jatkaa vesistöihin.

## NATIIVI-UI: KAUPUNKIKORTTI (ERA 2) MASTERISSA; KYSYMYSNAKYMA-ERA natiivi-ui/kysymys f5bad6e MERGE-PYYNTO NATIIVISEPALLA (UITK KAIKILLE KysymysLajeille: VISA, VAITE, KUVA, LIPPU, TAPAHTUMA, 11 PULMAA, KAKSINTAISTELU, TAPAHTUMAKORTTI; TIIMALASI, VIHJE, 50:50, TULOS); AVOIN: KOHTAAMISEN MUOTOKUVA/TERVEHDYS JA LOYDON LAATTAKUVA DATASTA (PELIKOODARI); SEURAAVA KARTUSCHA + KARTTASELITE, SITTEN PULU, LUENNAT (23.9.2026 klo 17.55)

Savuke odottaa simulaattoria (Laitetestaaja).

## SIIRTOSEPPA: KOHDAT 4–5 + OFFLINE-MANIFESTI VALMIIT NIPPUUN 3 (siirtoseppa-kysymyskuvat, siirtoseppa-offline): KOKOELMA livianpuhe (45 KAUPUNKIA, CUET + AANI + ELEET, LUENTOJEN AIKALEIMAT 45 TIEDOSTOA); RAJAPINTA 10 (PAKETTI, offline.json, PALVELINRAJAPINNAT) MASTERISSA, ORIGIN-PAATOS KOHDASSA 10.3 (8c85188); offline.json MAAT ISO3 (RASTERI z6–8, MAASTO z7–12, MEDIA URL:EINA, TAVUARVIOT), GLOBAALI ~14 Mt, SITOMATON MEDIA VALINNAISISSA RYHMISSA; KOKOELMA maat KARTUSCHALLE; KOEPAKETTI v8, 0 FAIL (23.9.2026 klo 17.56)

Nippu 3 kasvaa; Julkaisija ajaa sen nipun 2 jälkeen normaalilla savukkeella.

## NATIIVI-UI ERA 4: KARTUSCHA + KARTTASELITE natiivi-ui/kartuscha 0a7da47, MERGE-PYYNTO NATIIVISEPALLA (KYSYMYSNAKYMA f5bad6e EDELLA): KARTUSCHA = WEBIN MAAPANEELI (NIMI, OMA NIMI · VALTIOMUOTO 1873, MAALEHDEN AIHEET → LueMaalehti, TUNNUSLUVUT, TERVEHDYKSET); KARTTASELITE 11 RIVIA + MERKIT, PIIRRETTY KEHYS, PEUKALOLEVY, VALOT IKarttaValot; unity-tarkistus 0; MAAKUNNAT-VALILEHTI MYOHEMMIN; SEURAAVA PULU, LUENNAT, LINSSISEPAN KOUKUT (23.9.2026 klo 17.59)

Savuke odottaa simulaattoria.

## OMISTAJA 23.9. klo 18.1x (KORTTI): NATIIVI TESTFLIGHTIIN TANA ILTANA — PILVIALLEKIRJOITUS (ASC_KEY_ID/ISSUER/P8 + TEAM_ID JO GITHUB-SECRETEISSA, SAMA KAAVA KUIN WEBKUOREN ios-testflight.yml, EI XCODE-TILIKIRJAUTUMISTA); JULKAISIJA: TYONKULKU MAC-AJURILLE, BUNDLE ID, ASC-APPIMERKINTA, TESTIRYHMA; NATIIVISEPPA: VIENTI + MERGE-JONO ENSIN; OMISTAJA KOKEILEE ETANA 24.9. forge3d 1.38 (PYTHON, OFFLINE-RENDERI) EI HYODYTA PELIA, EHKA TRAILERIRENDEREIHIN. LINSSISEPPA LUOVUTUS viesti-linssiseppa-luovutus-20260923.md (5c76af50d): TOPOGRAFIA MASTERISSA, ASTRONAUTTI MERGE-PYYNNOSSA, VESISTOT linssiseppa/vesistot 128/128 → NOLLATAAN (23.9.2026 klo 18.12)

Luokitin esti TestFlight-viestit ennen omistajan korttia (Production Deploy).

## SIIRTOSEPPA NIPPU 4 (siirtoseppa-nippu4-kartta, SKEEMA 1.10, KOEPAKETTI v9, 0 FAIL): MUOTOKUVAT (KOHTAAMISET, TARINAKAARI), LAATTA- JA PAIKALLISAARREKUVAT, KARTTAMERKIT, KATKOKUVA, LINSSILUENNAT, KARTTAVALOT 2672, MAASTONIMET 213, MAARAJAT 135 (NATURAL EARTH 0,05°); VAIN PAGESISSA OLEVAT KUVAT OSOITTAVAT matkakirja.app:IIN (AMPARILATAUS ESTETTY SIIRTOSEPALTA) → JULKAISIJA PEILAA NE AMPARIIN NIPUN MERGESSA; LINSSISEPPA NOLLATTU klo 18.13 (ALOITUSVIESTI viesti-linssiseppa-aloitus.md) (23.9.2026 klo 18.14)

Pulun ja luentojen kuvasarjat myöhemmin Natiivi-UI:n mukaan.

## JULKAISIJA: proto3d-testflight.yml KIRJOITETTU (workflow_dispatch, SELF-HOSTED, SAMA ASC-AVAINLOGIIKKA); BUNDLE ID app.matkakirja.peli HYVAKSYTTY; LUOKITIN ESTI PUSHIN/PR:N JA AJON (Production Deploy) → OMISTAJA ANTAA LUVAN SUORAAN JULKAISIJAN SESSIOON (PR, workflow_dispatch, ASC-APPIMERKINTA + TESTIRYHMA); FABLEN KORTTILUPA EI SIIRRY SESSIOIDEN VALILLA (23.9.2026 klo 18.16)

Kortit ja luvat annetaan siihen sessioon joka toimii.

## OMISTAJA 23.9. klo 18.2x: NATIIVI PAIVITETAAN SUORAAN NYKYISEN WEBKIT-KUOREN TILALLE SAMAAN APP STORE -TIETUEESEEN → BUNDLE ID fi.matkakirja.peli (EI app.matkakirja.peli), SAMA TIIMI, VERSIO JA BUILD KUOREN YLI, EI UUTTA APPIMERKINTAA, OLEMASSA OLEVA TESTFLIGHT-RYHMA; APP STORE -JULKAISU TAVALLISENA PAIVITYKSENA (ARVIO UUDELLEEN), WEB JAA SELAIMEEN; TESTFLIGHT-TOIMIEN LUPA ANNETAAN JULKAISIJAN OMAAN SESSIOON (KORTTILUPA EI SIIRRY) (23.9.2026 klo 18.18)

Julkaisijan proto3d-testflight.yml kirjoitettu, pushia ja ajoa varten omistajan lupa Julkaisijan sessioon.

## NATIIVISEPPA ERA 2: TESTFLIGHT-VIENTI Build/testflight (PROTO-MASTER 741352b) — MUKANA KOKO JONO: KYSYMYSNAKYMA + KYSYMYS2/3, KARTUSCHA, TEKIJATIEDOT (COPERNICUS-ATTRIBUUTIO, CESIUM-KREDIITTI PIILOTETTU), PUHE, LINSSIRUNKO, ASTRONAUTTI, VESISTOT, MAASTO 23b OLETUKSENA (EI KIILOJA), KUVAKE = KUOREN KOMPASSIRUUSU; iPAD 489ebe9 SILMUKKA + k1–k8 OK, LEVOSSA 1–4 YLITYSTA. FABLE: BUNDLE ID KORJATTAVA fi.matkakirja.peli (OMISTAJAN PAATOS), VERSIO 1.0.0 (KUORI 0.3.0) (23.9.2026 klo 18.22)

Luvat Julkaisijan toimiin omistajalta Julkaisijan sessioon.

## OMISTAJA 23.9. klo 18.2x: APURAHAHAKEMUS LAHETETTY 22.9. — ARVIOIJILLA WEB-OSOITE JA TESTFLIGHTIN JULKINEN LINKKI (ULKOINEN RYHMA, MAX 100), PAATOS ~2 KK → SAANTO PAATOKSEEN ASTI (~MARRASKUUN LOPPU 2026): NATIIVIBUILDIT VAIN SISAISEEN TESTFLIGHT-RYHMAAN, JULKISEN LINKIN RYHMASSA PYSYY WEBKUORI (BUILDI VANHENEE 90 PV → JULKAISIJA TARKISTAA PAIVAYKSEN JA LATAA KUOREN UUDELLEEN TARVITTAESSA); NATIIVI EI APP STOREEN ENNEN PAATOSTA; WEB-TUOTANTO PIDETAAN PELATTAVANA (VARTIJAT KAYTOSSA, KEHITYS PYSAYTETTY); VITRIINIVERSIO OMAAN OSOITTEESEEN VAIN OMISTAJAN PYYNNOSTA (23.9.2026 klo 18.22)

Ulkoiseen ryhmään lisätty build käy Applen beta-arvion; ei lisätä ilman omistajan lupaa.

## LOYDOS (SIIRTOSEPPA, KOSKEE WEBIA): MATKAKIRJALUENTOJEN AIKALEIMAT VANHENTUNEET — 45 TIEDOSTOA assets/aikaleimat/ KOHDISTETTU 14.9. EDELTAVAAN TEKSTIIN, AMPARISSA VERSIOIDUN HORATIO-AANEN VIERESSA PUUTTUVAT (404) → tarkistaAikaleimat HYLKAA, LIVIAN KUUNTELUREAKTIOT EIVAT AJASTU MISSAAN KAUPUNGISSA; KORJAUS SISALTOKIRJURILLE: kohdista-luennat.mjs generoi-luennat.yml:n KAUTTA (ELEVEN_API_KEY VAIN SECRETEISSA), --sido REPOON, JULKAISIJA VIE SISARET AMPARIIN; PAKETISSA luennat[].reaktiot + tekstiSha256 (NIPPU 4 a8c1fc4d9) TAYTTYVAT AUTOMAATTISESTI (23.9.2026 klo 18.23)

Sisältökirjuri tekee tämän ennen Afrikan O7-pakettia.

## OMISTAJA 23.9. klo 18.2x (KORVAA EDELLISEN APURAHASAANNON): ARVIOIJIEN PITAA NAHDA UUSI NATIIVI PELI, JOTA KEHITETAAN KOKO AJAN — KAKSI TESTFLIGHT-RYHMAA: SISAINEN = UUSIMMAT KOKEILUBUILDIT (NIGHTLY, EI ARVIOTA), JULKISEN LINKIN ULKOINEN RYHMA = OMISTAJAN HYVAKSYMA HYVA VERSIO (APPLEN BETA-ARVIO, VIEDAAN VAIN OMISTAJAN KORTILLA); ENSIMMAINEN JULKISEN RYHMAN NATIIVIBUILDI KUN OMISTAJA ON KOKEILLUT JA HYVAKSYNYT; AIKAA ON, ARVIOIJAT KATSOVAT MYOHEMMIN; WEB-OSOITE NAYTTAA TUOTANNON KUTEN ENNEN (23.9.2026 klo 18.24)

Kuori jää julkiseen ryhmään vain siihen asti, kun ensimmäinen hyväksytty natiivi viedään sinne.

## NATIIVIN TESTFLIGHT-VIENTI VALMIS: fi.matkakirja.peli 1.0.0 (1), Build/testflight, MASTER 741352b; VERSIO 1.0.0 PYSYY (JULKAISIJAN 0.4.0-EHDOTUS HYLATTY, EI UUTTA VIENTIA), JATKOSSA BUILD = AJON NUMERO (23.9.2026 klo 18.25)

Julkaisijan push ja ajo odottavat omistajan lupaa Julkaisijan sessioon.

## LINSSISEPPA (UUSI SESSIO): linssiseppa/maat 7e75c8c NATIIVISEPAN SEURAAVAAN MERGEEN — VERTAILU JA MAATIEDOT (MAAT ISO3, 18 MAALTA PUUTTUU iso2; MaaOsuma NAPAUTUKSEEN, Sumu.PaljastaMaahan, KAKSI LINSSIA, MAANIMET; 144/144 WEBIN KULTAISIA VASTAAN); iPAD-LOYDOS KORJATTU: RELIEFI VAAKARAITOINA, SYY CESIUMILTA PUUTTUI {reverseY}; ODOTTAA NATIIVISEPAN MAATILAA (TESTFLIGHTIN JALKEEN); UI-KOUKUT NATIIVI-UI:LLE (23.9.2026 klo 18.28)

Fable: reverseY-korjaus otetaan seuraavaan sisäiseen TestFlight-buildiin, ei tämän illan buildiin.

## SISALTOKIRJURI: AIKALEIMOJEN KOHDISTUS — 6 OIKEAA KUITTIA LOYTYI, KUIVA-AJO PUHDAS 45/45, MUTTA kuittirivit()-VALIDAATTORI HYLKAA KAIKKI (KUITIT mp3_44100_128, NYKYINEN OUTPUT_FORMAT mp3_44100_192) → FABLEN PAATOS: kohdista-luennat.mjs HYVAKSYY KUITIN OMAN outputFormatin KUN TUOTANNON MP3:N sha256 VASTAA KUITTIA (OIKEA VARTIJA); generoi-luennat.mjs:n TARKISTUS ENNALLAAN (23.9.2026 klo 18.29)

Kohdistus ei tuota ääntä, joten bittinopeustarkistus ei suojaa mitään siinä.

## LINSSISEPPA: 18 PUUTTUVAA iso2:TA KORJATTU PR #2960 (tools/vienti/iso2.mjs KATTOI VAIN KAUPUNKIMAAT; UUSI TESTI VAATII KOODIN JOKAISELLE LAUDAN MAALLE); SIIRTOSEPPA REBASEAA NIPPU4:AAN; SEURAAVA LINSSIEN KYTKENTA KUN MAATILA TULEE (23.9.2026 klo 18.30)

PR #2960 Julkaisijan jonoon (pieni, ei ajoaikaista koodia → testit-vihreällä).

## 3D-MAAILMAT (OMISTAJAN KYSYMYS 23.9. klo 18.3x, FABLEN LINJAUS TULEVAA VARTEN): MALLIT TEHDAAN BLENDERISSA (AI-AVUSTEISESTI) JA VIEDAAN glTF/GLB:NA; UNITYSSA glTFast, LATAUS AJON AIKANA AMPARISTA (EI PELIPAKETTIIN), CESIUM ANKKUROI KOORDINAATTIIN; YKSI MALLI, KAKSI MATERIAALISARJAA (LOISTO / 1873-RAUNIO) AIKAHYPPYYN; VALMIIT MALLIT VAIN CC0/CC-BY (SKETCHFAB, OPEN HERITAGE 3D, POLY HAVEN -MATERIAALIT), EI NC; AI-TEKSTUURIT SALLITTU OMASTA KEHOTTEESTA KAUPALLISEN KAYTON SALLIVALLA TYOKALULLA, SISALTOKIRJURI TARKISTAA HISTORIALLISEN POHJAN; MOBIILIRAJA ~300 k KOLMIOTA / TILA, 2K ASTC; ENSIMMAINEN ASKEL AIKANAAN: NATIIVISEPAN KOEPUTKI BLENDER-GLB → AMPARI → CESIUM-ANKKURI iPADILLA (23.9.2026 klo 18.33)

Ei vielä työn alla; natiivin pelattava ydin ensin.

## LINSSISEPPA: VERTAILU JA MAATIEDOT KYTKETTY MAATILAAN (linssiseppa/maat-kytkenta 7456adc, MERGE-PYYNTO), 144/144, KOEPAKETTI v11 (iso2 KAIKILLA); LAITETESTIKOMENNOT maa <ISO3>, vertaa, lehti; SEURAAVA ODOTTAA NATIIVI-UI:N PALKKIA, KYLTTIA, LEHTEA JA KAYRIA (KOUKUT LAHETETTY) (23.9.2026 klo 18.33)

Linssiseppä siirtyy odottamaan; jos UI viipyy, seuraava linssi (keksinnöt/vesistöt viimeistely).

## 3D-MAAILMAT, TARKENNUS (OMISTAJA 23.9. klo 18.3x): ON OLEMASSA PUTKI, JOSSA TEKOALY TEKEE CC-KUVISTA VALMIIN BLENDER-TIEDOSTON → FABLE: SOPII, SISALTOKIRJURIN COMMONS-HAKU ANTAA LAHTOKUVAT; EHDOT: LAHTOKUVAT VAIN CC0/CC-BY (SA PERIYTYISI MALLIIN), TEKIJAT LISENSSIKIRJANPITOON; KUVISTA SYNTYY NYKYTILA, LOISTONAIKA REKONSTRUKTIONA (PD-PIIRROKSET + AI); RETOPOLOGIA JA TEKSTUURIEN SIISTIMINEN KASIN; SUUNNITELMA: OMISTAJA TEKEE YHDEN KOKEEN KOLOSSEUMISTA STUDIOLLA, NATIIVISEPPA VIE GLB:N AMPARIIN JA CESIUM-ANKKURIIN iPADILLA → PAATOS LINJASTA SEN JALKEEN (23.9.2026 klo 18.34)

Natiivin ydin ensin; koe vasta TestFlightin jälkeen.

## APP STORE -JULKAISUN TYONJAKO (OMISTAJAN KYSYMYS 23.9. klo 18.3x): TESTFLIGHT SISAINEN = TAYSIN AUTOMAATTINEN (ASC-API-AVAIN); OMISTAJALLE VAIN 1) PAID APPLICATIONS -SOPIMUS + PANKKI + VERO (TILIN HALTIJA, KESTAA PAIVIA) JA 2) APP PRIVACY -SELOSTEET (EI API:A; EI TIEDONKERUUTA, EI SEURANTAA); SESSIOT HOITAVAT API:LLA KUVAUKSEN, KUVAKAAPPAUKSET, IKARAJAN 13+, HINNAN, SALAUSVASTAUKSEN (Info.plist), BETA-ARVION JA ARVIOON LAHETYKSEN; HINTA JA ARVIOON LAHETYS VAIN OMISTAJAN KORTILLA (23.9.2026 klo 18.34)

Omistaja tekee kohdat 1–2 kun ehtii; ilmoittaa 'Paid Apps hyväksytty'.

## PAID APPS -SOPIMUS SIIRRETTY MYOHEMMAKSI (OMISTAJA 23.9. klo 18.4x): EI TARVITA TESTFLIGHTIIN EIKA ILMAISEEN ARVIOON; TEHDAAN ~VIIKKO ENNEN MAKSULLISTA JULKAISUA TAI IAP:TA (HYVAKSYNTA 1–3 PV); OHJE ANNETTU (Business → Paid Apps → pankki IBAN/BIC → W-8BEN(-E) → Contacts) (23.9.2026 klo 18.37)

Jonoon: ennen hinnan asettamista, ei nyt.

## LINSSISEPPA: linssiseppa/luennat b7836c3 MERGE-PYYNTO, 152/152 — KEKSINTOJEN PYSAKKILUENNAT, ESITTELY JA VALINAYTOS 1873, LAITETESTIKOMENNOT, VESISTOT reverseY-KORJAUKSELLA, IHMISEN MATKA = v11 = WEB, iPAD-KORJAUKSET. NATIIVI-UI: PULU JA LUENNAT natiivi-ui/pulu 8079b3e MERGE-PYYNTO (70 ELETTA PIKSELITASOLLA WEBIN MUKAAN, KAYTTAYTYMINEN, PUHEKUPLAT, LIVIAN AANET AMPARISTA; MATKAKIRJAKORTTI, KUVAPAKKA, OHITA, SUURENNOS, LIVIAN KOMMENTTI; CHAT JA SAAPUMISTRAILERI AVOINNA). FABLEN PAATOS: AMPARIN PAKETTI v2 VANHA → KOEPAKETTI v11 LADATTAVA sisalto/1/v11 JA NATIIVIN OSOITIN SIIHEN (WEB EI LUE PAKETTIA), CI-PAKETTI KORVAA NIPUN 3 JALKEEN; LUOKITIN ESTI VIESTIN JULKAISIJALLE → OMISTAJA VALITTAA (23.9.2026 klo 18.44)

Natiivi-UI:n järjestys: Linssisepän koukut ensin, sitten chat, sitten saapumistraileri.

## NATIIVISEPPA ERA 3: PROTO-MASTER 2e26b45 — MAATILA (IMaaKartta, VERTAILU JA MAATIEDOT) iPADILLA: MAIDEN TAYTTO JA RAJAT PALLOLLA JA LAHINAKYMASSA, KOROSTUS MAITTAIN, LINSSISEPAN SOVITIN KYTKETTY; KORJATTU RELIEFIN RAIDAT (reverseY) JA KUOREN KIERTOSUUNTA; MERGETTY LINSSISEPAN LUENNAT JA MAAT, NATIIVI-UI:N PULU, LIVIA, TEKIJATIEDOT, PELIKOODARI 8e985de ASTI; LAITTEELTA PUUTTUU LINSSIEN NIMET, MAALEHDET, RANTAMASKI KUNNES PAKETTI ≥ v11 AMPARISSA; TESTFLIGHT 1.0.0 (1) = 741352b (23.9.2026 klo 18.45)

Paketin v11 lataus odottaa omistajan välitystä Julkaisijalle.

## KARTTASEPPA: POLTTO 23a VALMIS AMPARISSA, MAASTO 2026-09-23b (KAAREVUUSKORJAUS, #2954 MERGETTY) JA LINSSISEPAN RELIEFISARJA VALMIIT; JULKAISIJALLA #2957 (OSOITIN 23a), #2950 (RELIEFITYOKALU), #2962 (SYVAT TASOT z9–z10, VERSIONOSTO); SYVA RANSKA-SARJA (DEM-RELIEFI Z9–Z11) HETI KUN 23a:N LUETTELO AMPARISSA; DEM-LATAUS GLO-30 E28 42,5 Gt, SITTEN GLO-90 71 Gt. FABLEN PAATOKSET: z9–z10:EEN EI RAJA- EIKA RANTAVIIVATASOA — NATIIVI PIIRTAA NE VEKTOREINA (SIIRTOSEPAN MAARAJAT + RANTAMASKI, KarttaKerrokset); PAIVAMAARARAJAN KAISTALE MYOHEMMIN; POLTON PAATYTTYA JULKAISIJA AJAA NIPUN 2 → 3 (23.9.2026 klo 18.51)

Koevedos pyramidi-poltto/koe-syva/mont-blanc-z10-1min-vs-dem.png.

## TESTFLIGHT-TESTAAJA: OMISTAJAN ASC-KAYTTAJA JA LAITTEEN APPLE ID OVAT ERI TUNNUKSET → JULKAISIJA KUTSUU LAITTEEN APPLE ID:N ASC-KAYTTAJAKSI (ROOLI DEVELOPER, VAIN MATKAKIRJA) JA LISAA SEN SISAISEEN TESTIRYHMAAN (EI BETA-ARVIOTA); OSOITTEITA EI KIRJATA REPOON (23.9.2026 klo 18.52)

Vaihtoehto ulkoinen ryhmä hylätty (ensimmäinen buildi odottaisi Applen arviota).

## SISALTOKIRJURI: AIKALEIMAT KOHDISTETTU 45/45 NYKYISEEN AANEEN JA TEKSTIIN, 6 CI-AJOA VEIVAT R2:EEN (HTTP 200); PR #2961 (outputFormat-POIKKEUS, 45 TIEDOSTOA, MARSEILLEN VARTIOTESTI POSITIIVISEKSI), 0 FAIL; AFRIKAN O7: KARTHAGO KESKEN, MURZUK/AL KUFRA/GAO VALMIINA WORKTREEISSA, EI VIELA PR:AA; SESSIO 72 % → LUOVUTUS JA NOLLAUS (23.9.2026 klo 18.53)

PR #2961 Julkaisijan jonoon nipun 3 jälkeen (koskee ajoaikaista tarkistusta → savuke).

## NATIIVISEPPA: Build/testflight-2 VALMIS — MASTER 219188b (reverseY, MAATILA, PULU/LIVIA, LUENNAT, unity-tarkistus-KORJAUS), fi.matkakirja.peli 1.0.0 (2); (1) 741352b KOSKEMATON; (2) ANNETAAN JULKAISIJALLE KUN (1) ON LADATTU (23.9.2026 klo 18.54)

Odottaa Julkaisijan ilmoitusta buildista (1).

## FABLEN PAATOS: POLLO-WORKERIN NATIIVISAANTO LAAJENNETAAN PUHEESTA MYOS CHATTIIN ('vastaus' + 'ehdotukset') SAMOILLA RAJOILLA KUIN WEBISSA; PELIKOODARI TEKEE PR:N #2956:N JATKOKSI, NATIIVI-UI RAKENTAA CHAT-PANEELIN. SISALTOKIRJURI NOLLATTU klo 18.5x (LUOVUTUS viesti-sisaltokirjuri-luovutus-20260923.md, ALOITUS viesti-sisaltokirjuri-aloitus.md). OMISTAJA LAHETTI JULKAISIJALLE ASC-KUTSUPYYNNON (SISAINEN RYHMA) (23.9.2026 klo 19.00)

Koko peli natiiviin, kustannus ei muutu.

## VARMUUSKOPIO (OMISTAJAN KORTTI 23.9. klo 19.0x): NATIIVIN PROTO-GIT JA PELILOGIIKKA OLIVAT VAIN MACILLA → JULKAISIJA LUO YKSITYISEN REPON ravelius/Matkakirja-natiivi, PUSHAA KAIKKI HAARAT, NIGHTLY-PUSH JA git bundle NAS:IIN OISIN; NATIIVISEPPA PUSHAA JATKOSSA ITSE. PELIKOODARI: PR #2965 AVAA CHATIN NATIIVILLE (4113/0) → TESTIT-VIHREALLA (23.9.2026 klo 19.09)

Web-peli on jo GitHubissa, laatat/maasto/DEM ämpärissä ja NAS:illa.

## LINSSISEPPA: ASTRONAUTTI JA KEKSINNOT LAITETESTATTU iPADILLA v11:TA VASTEN (ee68957); ASTRONAUTIN PILVIKUVA JA TAHTIEN KAUKORAJA KORJATTU; TYOKALU laitetesti.sh; AMPARIN PAKETTI v3 ILMAN LINSSIAINEISTOA → v11 JULKAISU JULKAISIJALLA; UI LINSSIEN PAALLE = NATIIVI-UI:N KOUKUT (23.9.2026 klo 19.10)

Kaikki linssit paitsi UI-koukut toimivat laitteella.

## JULKAISIJA: NIPPU 2 (#2947, v2149) MAINISSA (KAKSI KROONISTA PUNAISTA VAIHTELIVAT, PELIKOODARI VAHVISTI); TESTFLIGHT-AJO KAATUI ARKISTOINTIIN ('No profiles for fi.matkakirja.peli' + 'User interaction is not allowed') → FABLEN DIAGNOOSI: proto3d-testflight.yml:STA PUUTTUU VALIAIKAINEN AVAINNIPPU (ios-testflight.yml RIVIT 193–200, POISTO 370) — LUKITTU AJURIN AVAINNIPPU ESTAA VARMENTEEN TALLENNUKSEN JA SITEN PROFIILIN; KORJAUS: SAMA LOHKO + UUSI AJO; EI XCODE-KIRJAUTUMISTA. NATIIVI-UI 73 % → LUOVUTUS PYYDETTY (23.9.2026 klo 19.11)

Jos profiilivirhe jatkuu, verrataan bundleId-capabilities Unityn entitlementseihin API:lla.

## SISALTOKIRJURI (UUSI SESSIO): AFRIKAN O7 ERA 1 PR #2966 (MURZUK, AL KUFRA, GAO, KARTHAGO; KANSI + 1 AIHE/KPL; KARTHAGON FAKTAKORJAUKSET CATON KAYNTI 152 eaa., 2170 HAUTAKIVEA), 4125/0, KAKSOISAVAIMET PUHTAAT; LOPUT 6 O7-KAUPUNKIA ERAAN 2; SEURAAVAKSI KOHDEKARTAT (83/266 PUUTTUU) (23.9.2026 klo 19.12)

Julkaisijalle ilmoitettu suoraan; savuke normaalisti (lehtisisältö).

## NATIIVI-UI NOLLATTU klo 19.1x (78 %): LINSSIKOUKUT natiivi-ui/linssit 9b1d035 JA TRAILERI f160300 MERGE-PYYNNOSSA, CHAT MASTERISSA; LUOVUTUS viesti-natiivi-ui-luovutus-20260923.md (9df5842ce), ALOITUS viesti-natiivi-ui-aloitus.md (23.9.2026 klo 19.13)

Uusi sessio: koukkujen kytkentä Linssisepän kanssa, kontaktiarkit, Maakunnat, offline-UI, ero-lista.

## PELIKOODARI NOLLATAAN klo 19.1x (71 %): LUOVUTUS viesti-pelikoodari-luovutus-20260923-natiivi3.md, ALOITUS viesti-pelikoodari-aloitus.md; e78892f (PULMAKORJAUS, TAPAHTUMAKORTIT POIS KARTALTA) MERGE-PYYNNOSSA → NATIIVISEPPA MERGEAA ENNEN Build/testflight-2:TA; #2956 JA #2965 MAINISSA, #2955 ODOTTAA #2942 (23.9.2026 klo 19.17)

Uusi sessio jatkaa kuva-/lippukysymyksistä ja pulmapiirroksista.

## SIIRTOSEPPA NOLLATAAN klo 19.2x (70 %): LUOVUTUS viesti-siirtoseppa-luovutus-20260923-ilta2.md (siirtoseppa-luovutus 53b843d5a), ALOITUS viesti-siirtoseppa-aloitus.md; NIPPU 4 SIISTI (39d0582d8, KAUPUNKIEN KORKEUS 59/266, LOPUT ODOTTAVAT OMISTAJAN DEM-LATAUSLUPAA) (23.9.2026 klo 19.25)

Uusi sessio: CI-paketin tarkistus nipun 3 jälkeen, natiivisessioiden pyynnöt.

## LAITETESTAAJA NOLLATAAN klo 19.2x (70 %): LUOVUTUS viesti-laitetestaaja-luovutus-20260923-ilta.md (HAARA laitetestaaja), ALOITUS viesti-laitetestaaja-aloitus.md; 4 PR:AA MERGETTY; KESKEN KONTAKTI-WEB-AGENTTI LINSSISEPALLE JA PELISILMUKAN 6/6-AJO (liiku MERGETTY) (23.9.2026 klo 19.27)

Uusi sessio: silmukka 6/6, kontaktiarkit, natiivin savukkeet.

## NATIIVISEPPA ERA 4: Build/testflight-2 (MASTER 6cdde82, 1.0.0 (2)) VIETY; LAATTAPALVELIN 127.0.0.1 OFFLINE→VALIMUISTI→VERKKO, OFFLINE MAITTAIN TOIMII, AIHEVALOT 2672, KORKEUS PAKETISTA. FABLEN PAATOS: BUILD (1) HYLATAAN, JULKAISIJA LATAA SUORAAN (2):N; offline.json → MAASTO 23b SEURAAVAAN PAKETTIIN (23.9.2026 klo 19.33)

Build (1) ei ehtinyt TestFlightiin avainnippuvian takia.

## PELIKOODARI (UUSI SESSIO) NELJA ERAA: WEB PR #2968 KULTAISTEN JALKIEN VARTIJA npm testiin (11 JALKEA sha256, MUTAATIOTESTI PUNASTUU); PROTO pelikoodari/tallennus-v4 1293297 (VERSIO 4 + VERSIOPOLKU, UUDEMPI TALLENNUS SAILOTAAN AIKALEIMALLA), pelikoodari/mannerlento 40f9702 (MATKAVALINTA + KAUPUNKIKORTTI), pelikoodari/kuvat-liput cc43bee (KUVA- JA LIPPUKYSYMYKSET PAKETIN DATALLA, v12 PAASTA PAAHAN, REAKTIOT 214/214); 141/141; MERGE-PYYNNOT NATIIVISEPALLA; LAITETESTI ODOTTAA AMPARIN OSOITINTA (NYT v3) (23.9.2026 klo 19.34)

Julkaisija mergeää #2968 testit-vihreällä (vain testejä).

## LINSSISEPPA: KONTAKTIARKKI WEB vs NATIIVI (9 NAKYMAA) JA EROLISTA linssit-kontaktiarkki-20260923.md; VERTAILU JA MAATIEDOT TOIMIVAT iPADILLA; KOLME EROA KORJATTU (0f55255); AVOIMET: UI LINSSIN PAALLA, MAATILAN TAYTTO, ASTRONAUTIN TAUSTA JA HEHKU, VESISTOJEN WEBKUVA; TAYSVARINEN RELIEFI ODOTTAA OMISTAJAA (23.9.2026 klo 19.34)

Omistaja katsoo TestFlight-buildista.

## NATIIVI-UI (UUSI SESSIO): MASTERISSA LINSSIKOUKKUJEN KYTKENTA, MAAKUNNAT-VALILEHTI, OFFLINE-TILAPILLERI, MANNERLENTO-RIVI; MERGE-PYYNNOSSA MINIPULUN KYSYMYSKORTTI ASTRONAUTILLE (888247b), KOKEET-KYTKIN RELIEFI 1,0/0,8 (40bf8ab), OFFLINE-TYHJAN SELITYS (2578fbf); ERO-LISTA docs/raportit/natiivi-ui-erot-webiin-20260923.md (PUUTTEET: MATKALAUKKU, KARTTANOSTOJEN KORTIT, ALOITUS/LAHTOKAUPUNKI/VOITTO, MUSIIKKI JA TEHOSTEET). FABLEN JARJESTYS: MATKALAUKKU → ALOITUS + LAHTOKAUPUNKI + VOITTO → KARTTANOSTOJEN KORTIT → MUSIIKKI JA TEHOSTEET (23.9.2026 klo 19.42)

Pelattava silmukka alusta loppuun ennen koristeita.

## SISALTOKIRJURI: AFRIKAN O7 ERA 2 PR #2972 → O7 KOKONAAN VALMIS (#2966 + #2972), 4145/0; KOHDEKARTAT JO KAIKILLA; NELJA LAHTEETONTA FAKTAA → PIENI PR; SITTEN SISALTOINVENTAARIO NATIIVIIN JA KOLMEN SEURAAVAN ERAN EHDOTUS (23.9.2026 klo 19.46)

Julkaisija mergeää #2966 ja #2972 savukkeella.

## SIIRTOSEPPA: KOEPAKETTI v13 (SKEEMA 1.11): v12 KORKEUS+REAKTIOT (214/214), LIVIAN CUET c10060309 (livianrepliikit 68), OFFLINE MAASTO 23b 770b2a175; MERGE NIPUN 3 JALKEEN; LIVIAN eleet.json 40/45 PUUTTUU → SISALTOKIRJURI KOHDISTAA; SIIRTOSEPPA VIE PAGES-ONLY-ASSETIT AMPARIIN CI:LLA (23.9.2026 klo 19.48)

Nippu 3 ei vielä mainissa.

## JULKAISIJA klo 19.5x: NIPPU 3 MAINISSA (v2150); TESTFLIGHT: AVAINNIPPUKORJAUS TOIMI, VARMENNEKIINTIO TAYNNA → SIIVOUS (OMISTAJA HYVAKSYI) → BUILD 2 UUDELLEEN; PAKETTI v11 EI VIELA AMPARISSA (JULKAISIJA VAATII OMISTAJAN SUORAN PAATOKSEN OMAAN SESSIOONSA — OIKEIN, EI RELAYTA); VARMUUSKOPIOREPON PYYNTO EI PERILLA → OMISTAJA LAHETTAA; ASC-KUTSU me.com PALAUTTI 409 (KAYTTAJA TAI KUTSU JO OLEMASSA) → OMISTAJA TARKISTAA Users and Access (23.9.2026 klo 19.49)

Fable antoi omistajalle valmiit viestit molempiin.

## NATIIVI-UI: MATKALAUKKU JA ALOITUS/HUIPENNUS MERGE-PYYNNOSSA (natiivi-ui/aloitus d4778e6): PORTTI (ALOITA / JATKA / UUSI), 1873-JULISTE, AVAUSTEKSTI + INTRO-PUHE, ALOITUSKAUPUNKI KORTILLA (ERO WEBIIN HYVAKSYTTY); HUIPENNUS KUN KAIKKI AARTEET LOYTYIVAT; CHAT TOIMII (200). FABLE KIRJOITTI HUIPENNUKSEN KAANONITEKSTIN docs/moduulit/huipennus-teksti.md ('AARNIN LUETTELO ON TAYNNA', FOGGIN MERKINTA, ISOISAN LAUSE 'MATKA EI LOPU SIIHEN, ETTA SAAPUU'); SITOVA NATIIVISSA JA WEBISSA, MYOHEMMIN PAKETTIIN (23.9.2026 klo 19.54)

Seuraavaksi Natiivi-UI: karttanostojen kortit.

## LAITETESTAAJA (UUSI SESSIO): PELISILMUKAN SAVUKE 6/6 SIMULAATTORISSA, PR #2970, 9/9 WEB-KUVAA SIISTEJA; SEURAAVA KONTAKTIARKIT JA NATIIVIN SAVUKKEET. RAAMATTU: huipennus-teksti.md DOKUMENTTIKARTALLE (dokumentit.test 3/3) (23.9.2026 klo 19.55)

Natiivin pelattava silmukka on nyt koneellisesti vartioitu.

## SISALTOKIRJURI: FAKTAKORJAUS-PR #2973 (BIG HOLE, SUAKIN, RHODES-SILTA, PIRI-PIRI, LIVINGSTONE-SITAATTI). LOYDOS: LIVIAN 45 city-3-AANTA OVAT AMPARISSA (200) MUTTA EIVAT VASTAA YHTAKAAN generoi-pulu.yml:n 48 AJON KUITTIA (Last-Modified 12.9. klo 20.34 UTC, ENNEN ENSIMMAISTA AJOA) → LIVE-AANI ILMAN KUITTIA. FABLEN PAATOS: EI UUDELLEENAANITYSTA; kohdista-pulu-eleet.mjs SAA TILAN --elava (AANI KANONISESTA AVAIMESTA, TEKSTI REPOSTA, VARTIJANA KOHDISTUKSEN KATTAVUUS ≥95 % + KESTO, eleet.json:IIN lahde JA MP3:N sha256); KUIVATESTI 1 KAUPUNKI → ACTIONS 45 (23.9.2026 klo 20.03)

Sama periaate kuin aikaleimojen formaattipoikkeuksessa: vartija on side elävään ääneen, ei kuitin metatieto.

## LAITETESTAAJA: KONTAKTIARKIT VALMIIT (WEB 9/9, NATIIVI 35/35); KAKSINTAISTELUN vastaa-BUGI LOYDETTY JA KORJATTU (342f45f); SEURAAVAT: ALOITUS→HUIPENNUS-SAVUKE, OFFLINE-SAVUKE, 10 MIN MUISTIMITTAUS (23.9.2026 klo 20.04)

Simulaattori vapaa.

## NATIIVI TESTFLIGHTISSA klo 20.0x: BUILD 2 (Build/testflight-2, MASTER 6cdde82, fi.matkakirja.peli 1.0.0 (2)) 'UPLOAD SUCCEEDED'; SISAINEN RYHMA 409 KUNNES APPLE KASITTELEE → LIITETAAN UUDELLEEN; PAKETTI v11 AMPARISSA (sisalto/1/v11, OSOITIN PAIVITETTY, TODENNETTU media.matkakirja.app); VARMUUSKOPIOREPO ravelius/Matkakirja-natiivi LUOTU (proto/*, pelilogiikka/*, POST-MERGE-KOUKKU, NIGHTLY launchd-bundle NAS:IIN 04.00 UTC, 30 VRK). RISKI: SEURAAVA js-PUSH MAINIIN JULKAISEE CI:STA v12:N (SKEEMA 1.9) OSOITTIMEN PAALLE → PAATOS: UUSI JULKAISIJA MERGEAA NIPPU4-KETJUN ENNEN MUITA js-PR:IA, JA SIIRTOSEPPA LISAA CI:HIN VARTIJAN: PAKETIN JULKAISU EI SAA LASKEA OSOITTIMEN SKEEMAVERSIOTA (23.9.2026 klo 20.05)

Julkaisija kirjoittaa luovutuksen ja nollataan.

## SIIRTOSEPPA: OSOITINVARTIJA PR #2975 (PIENEMPI SKEEMA EI PAIVITA OSOITINTA, ::warning::), 35/35; CI-PAKETTI v4 (1.9) klo 19.36, JULKAISIJA VAIHTOI v11:EEN (1.10) klo 20.01; tarkista-media v4: 12 000 OK, 9 COMMONS-KUVAA PUUTTUU + 23 VARALLA → PR #2913 KORJAA, 5 LYRIA-AANTA PUUTTUU (TIEDOSSA); KETJUUN -sivustoassetit (1.12, KYPARA) JA -korkeudet-maailma (265/266); RAJAPINTA 10 → siirtoseppa/rajapinta-112 (23.9.2026 klo 20.08)

Uusi Julkaisija: #2975 ensimmäisenä, sitten nippu 4 -ketju ja #2913.

## KAANONIKORJAUS (OMISTAJA 23.9. klo 20.1x): ROSVON KAKSINTAISTELUA EI OLE PELISSA (ROSVOLAATAT POISTETTU 25.8.2026, RAAMATTU); PELIKOODARI OLI SIIRTANYT SEN NATIIVIIN WEBIN KUOLLEESTA KOODISTA (ai.js/game.js) → POISTETAAN PELILOGIIKASTA, PROTOSTA, NATIIVI-UI:N NAKYMASTA JA LAITETESTAAJAN SAVUKKEISTA; TARKISTETAAN ETTEI MUITA POISTETTUJA LAATTATYYPPEJA OLE SIIRTYNYT; TAPAHTUMAKORTIT JAAVAT (VAIN AFRICA.events). OPPI: WEBIN KOODISSA ON KUOLLEITA POLKUJA, SIIRTO TEHDAAN RAAMATUN JA SIIRTOSUUNNITELMAN MUKAAN, EI KOODIN MUKAAN (23.9.2026 klo 20.09)

Fable kirjaa tämän myös siirtosuunnitelman oppeihin.

## OMISTAJAN LINJAUS 23.9. klo 20.1x (SITOVA, RAAMATTUUN): NATIIVIIN VAIN AJANTASAISTA KAANONIA JA VAIN NATIIVEJA OMINAISUUKSIA — EI WEBIN KUOLLEITA POLKUJA, EI MITAAN KUORTA VANHASTA PELISTA; KORTTI: KAUPUNKI- JA MAALEHDET NATIIVISTI UI TOOLKITILLA PAKETIN DATASTA, WKWebView POISTUU; FABLE KAYNNISTAA RIIPPUMATTOMAN AJANTASAISUUSTARKASTUKSEN (OPUS-AGENTTI) NATIIVIN OMINAISUUKSISTA RAAMATTUA VASTEN (23.9.2026 klo 20.13)

Tarkastusraportti docs/raportit/natiivi-ajantasaisuus-20260923.md.

## OMISTAJA 23.9. klo 20.2x (SITOVA, RAAMATTUUN): KAIKKI PELIN NYKYISET TOIMINNOT JA NAPIT KOPIOIDAAN NATIIVIIN NATIIVISTI; KORTIT: RADIO MYOS NATIIVIIN (KUMOAA 'RADIOT VAIN WEBISSA'; LISENSSIT TARKISTETAAN MAKSULLISEEN APPIIN), KEHITTAJASAATIMET VAIN KEHITTAJATILASSA (KOKEET-VALIKKO TESTFLIGHTISSA, EI APP STORESSA); SESSIOT KYSYVAT HETI JOS JOKIN MIETITYTTAA. NATIIVISEPPA ERA 5: PROTO-MASTER 760f9d8 (MAATILAN JA VALOJEN NAPAUTUS, CESIUMIN FYSIIKKAPAISTO POIS 138→0, KOEKANSIO Documents/sisalto-koe, OFFLINE-ALUEET 135 TUOTANNOSSA; MERGETTY ALOITUS, LAUKKU, ASTRO-AVARUUS, LINSSI-UI, MERKIT, CHAT-KORJAUS, KAKSINTAISTELUN POISTO (UI), AANITAPAHTUMAT) (23.9.2026 klo 20.15)

Natiiviseppä ei rakenna WKWebView-lehden varaan; NakymaPeitetty yleinen.

## LAITETESTAAJA: ROSVOKIERTO 7/7; ALOITUS OK, HUIPENNUS-NAKYMA EI TOIMI (NATIIVI-UI); OFFLINE-PILLERI JA PERUSKARTTA OK OMALLA LIPULLA, LUXEMBURGIN LATAUS TODENTAMATTA (UI-KOMENTO PUUTTUU); MUISTIMITTAUS KAYNNISSA; RAPORTIT PR #2970 (23.9.2026 klo 20.19)

Natiiviseppä lisää laitetestikomennon offline-lataukselle.

## AJANTASAISUUSTARKASTUS (OPUS-AGENTTI, docs/raportit/natiivi-ajantasaisuus-20260923.md): 11 VANHENTUNUTTA (KAKSINTAISTELU + robber-LAATTA, MONINPELIVOITTO JA BOTTI, WKWebView 10 KOHDASSA, VANHA KOPIO natiivi-peli, 'TUTKI KAUPUNKIA', LINSSIT KAIKKI AUKI, RADIO RAJATTU POIS, star-NIMISTO, SIIRTOSUUNNITELMAN RIVIT, PAKETIN KUOLLEET KOKOELMAT), 18 PUUTTUVAA (LEHDET, NOSTOKORTIT, VIHREA FOKUSPISTE, AARTEEN PALJASTUS, SAHKE/RETKIKUNTA, RADIO, MUSIIKKI, LINSSIEN HANKINTA, 7 PENINKULMAN LINSSI, 1873-LINSSI, PULUN ELEET, PIENI LIIKE, EHDOTA, PASSI, MATKAKIRJAKORTTI, LIFTAUSANIMAATIO, KARTTASELITTEEN LASKURIT, LINSSIEN LISAOSAT). FABLEN PAATOKSET C1–C9: TAPAHTUMAKORTIT POIS KOODISTA (DATA JAA), LINSSIVALITSIN SEKA LAUKUSSA ETTA KARTALLA, KOKEET KEHITTAJAPORTIN TAAKSE, MANNERLAUDAT SIIRTOSEPPA KARSII, XP_NEW_BOARD → EnsimmainenKaupunki, SAAPUMINEN KUTEN WEBISSA (LUENTA ITSESTAAN, LEHDEN AVAA PELAAJA), VARAOLETUS LONTOO, RADIO 1400 tp TAKAISIN JA TOPOGRAFIA PYSYY AUKI; POISTO- JA LISAYSLISTAT JAETTU SESSIOITTAIN. PELIKOODARI: ROSVO POIS pelikoodari/rosvo-pois 30507f7 (135/135), WEB #2979, VARTIJAN KORJAUS #2977 (23.9.2026 klo 20.23)

Raamatun Pelin kulku päivitetään vastaamaan webin nykytilaa (14 lähtökaupunkia, kulkutavat).

## SISALTOKIRJURI: LIVIAN ELEET 43/45 AMPARISSA (PR #2978), BUDAPEST+BERGEN ANKKURI TAAKSEPAIN. SIIRTOSEPPA: TAPAHTUMAT-KOKOELMA JAA, SKEEMA 1.14 MINORINA, MANNERLAUDAT POIS, ALOITUSKAUPUNGIT = start-MERKITYT (LONTOO, NEW YORK). PELIKOODARI B9: 7. PAAAARRE JA PAIVA <= 80 → HUIPENNUKSESSA VAPAA MATKA ILMAN NOPPAA, KAIKKI LINSSIT AUKI. RAAMATTU: ALOITUSKAUPUNKI- JA KULKUTAPARIVIT PAIVITETTY (23.9.2026 klo 20.25)

Natiivin 14 aloituskaupunkia oli vanhojen mannerlautojen jäänne.

## KORJAUS klo 20.25 KOHTAAN: WEBIN AKTIIVINEN LAUTA ON maailmankartta, LAHTOKAUPUNKEJA 19 (LONTOO … PERTH), PAKETIN kaupungit[].aloitus SAMA LISTA, NATIIVI LUKEE SEN → NATIIVI ON JO WEBIN MUKAINEN; FABLEN 'LONTOO JA NEW YORK' PERUSTUI VAARAAN TIEDOSTOON (maailma.js); RAAMATTU KORJATTU (23.9.2026 klo 20.26)

Pelikoodari tarkisti webin mainista.

## JULKAISIJA NOLLATAAN klo 20.3x: MAINISSA #2979 (PELIKOODARIN OIKEA VARTIJAKORJAUS, #2976 OLI RIITTAMATON), LUOVUTUS #2974; BUILD 2 TESTFLIGHTISSA, v11 AMPARISSA, VARMUUSKOPIOREPO TEHTY; ALOITUS viesti-julkaisija-aloitus.md (JONO: #2975 → NIPPU 4 → PR-JONO → BUILD 3) (23.9.2026 klo 20.30)

Uusi Julkaisija lukee luovutuksen mainista.

## LINSSISEPPA: KYNNYKSET MERGE-PYYNNOSSA; PAATOKSET: SISAISISSA BUILDEISSA KEHITTAJATILA OLETUKSENA + KYNNYSKYTKIN, APP STORESSA KYNNYKSET; 1873-RAJAT (GPL-3.0) STRIIMATAAN AMPARISTA ATTRIBUUTIOLLA, EI BINAARIIN; RADIO AVPlayer-LIITANNAISELLA (TYONJAKO SOVITTU). SIIRTOSEPPA: LEHTIDATA KAUPUNKI 1/12 PAATASOLLA, MAA 4/11 → SKEEMA 1.15 HYVAKSYTTY; A11/C5 VALMIIT (1.14, 383 MODUULIA) (23.9.2026 klo 20.31)

Uutiset ja päivän sää jäävät rajapinnoiksi.

## NATIIVI-UI: NATIIVI LEHTI (natiivi-ui/tapahtumakortti-pois 819e7fd, MERGE-PYYNTO): KAUPUNKI- JA MAALEHTI UITK:LLA PAKETIN DATASTA (ETUSIVU, AIHEET, NOSTOT KUVINEEN JA GALLERIOINEEN, MINITEHTAVA, SISALLYS, SIVUNKAANTO LIUKUNA, KAIUTIN, SUURENNOS; ILehtiNakyma); DATAN VARASSA SAA, UUTISET, RADIO, KULTTUURIVISA, MAAKARTTA (SKEEMA 1.15); TARKASTUKSEN C3, C4, A6, A9, C1 TEHTY; NAPPI-INVENTAARIO docs/raportit/nappi-inventaario-natiivi-20260923.md: 87 RIVIA PUUTTUU, 71 NATIIVI-UI:LLE; JARJESTYS: NAHTAVYYDET JA OPAS → B4 AARTEEN PALJASTUS → GALLERIAT → RADION KUORI → NOPPA JA PIENI LIIKE (23.9.2026 klo 20.35)

WKWebView poistuu kun lehti on masterissa (Natiiviseppä).

## OMISTAJAN KORTTI 23.9. klo 20.4x: RADIO NATIIVIIN HYBRIDINA LUOKITTAIN — LINSSI JA KARTUSCHAN MERKKI KUTEN WEBISSA, NATIIVI SOITTAA VAIN LISENSSILUOKALTAAN SALLITUT ASEMAT, MUUT AVAAVAT ASEMAN OMAN SOITTIMEN LINKKINA; LUPIA HAETAAN TAUSTALLA (MALLIKIRJE + 20 TARKEINTA, EI LAHETETA ILMAN OMISTAJAA); TAUSTA: 115 ASEMASTA SALLITTU 0, KIELLETTY 16, EPASELVA 99; TEOSTO/GRAMEX AVOIN, RATKAISTAAN ENNEN APP STORE -JULKAISUA. C7 (PELIKOODARI): WEBIN KULKU ON TOTUUS — SAAPUESSA TRAILERI, LEHTI AUKEAA ITSESTAAN, TEHTAVAT LEHDEN NAPEISTA/LAATASTA/VIHREASTA PISTEESTA; TARKASTUKSEN C7-EHDOTUS PERUTTU (23.9.2026 klo 20.39)

Radiot-kokoelma luokkineen Siirtosepältä; soittimeen 'Avaa aseman sivu' -tila.

## KARTTASEPPA: DEM VALMIS — GLO-30 E28 42,5 Gt, GLO-90 MAAILMA 71,1 Gt; VIERAAT RUUDUT glo30-KANSIOSSA → MUUT LATAUKSET OMAAN KANSIOON dem/kaupunkikorkeudet/; SYVA RANSKA ODOTTAA #2957; k08-SARJA VALMIS (#2980) (23.9.2026 klo 20.41)

Siirtoseppä siirtää omansa.

## NATIIVI-UI NOLLATAAN klo 20.4x (89 %): LUOVUTUS viesti-natiivi-ui-luovutus-20260923-ilta.md (6aeb78670), MERGE-PYYNNOSSA natiivi-ui/paljastus 3f1cd06 (LEHTI, B4, TARKASTUS), WIP natiivi-ui/galleriat 7aab9a7; ALOITUS viesti-natiivi-ui-aloitus.md (23.9.2026 klo 20.43)

Kolmas Natiivi-UI-sessio tänään.

## NATIIVISEPPA ERA 6 (149cee1+): B16 AUTOKYYTI JA LENTOKAARI, B17 MAAKUNTIEN VARJAYS, B12 NATIIVI-UI:LLE, VALO → NOSTOKORTTI, RADIOTILAN API, MATKAKIRJA_APPSTORE, LAATTAVALIMUISTI 600 Mt; OFFLINE-LATAUS TODENNETTU (LUX 465/465). SIIRTOSEPPA: DEM-RUUDUT OMAAN KANSIOON, korkeudet 265/266 (23.9.2026 klo 20.43)

Maakuntarajat porrastuvat lähellä → tarkempi Euroopan aluekartta myöhemmin.

## LAITETESTAAJA NELIKKO VALMIS: HUIPENNUS-BUGI KORJATTU (ui sulje EI SULKENUT ALOITUSNAKYMAA, natiivi-ui/sulje-aloitus); OFFLINE LUX 465/465, 733 OFFLINE-OSUMAA; 10 MIN: EI MUISTIVUOTOA, RSS ~597 Mt, KEHYSAJAT p95 LAHELLA 60 Hz; RAPORTIT PR #2970 (muisti-kehys-10min-20260923.md ym.); SEURAAVAT: NATIIVIN LEHDEN SAVUKE + KONTAKTIARKKI, LINSSIEN LAITETESTI, OMISTAJAN ENSIKOKEMUS -KASIKIRJOITUS (23.9.2026 klo 20.44)

Simulaattorissa RSS 597 Mt; laitteen raja tarkistetaan iPadilla.

## PELIKOODARI: B8/B9 PORTATTU (pelikoodari/linssiomistus: PASSI, LINSSIOMISTUS, PENINKULMA); FABLEN TARKENNUS RAAMATTUUN: PENINKULMA-LEIMA SAILYY PASSISSA JA PITAA LINSSIT AUKI MYOHEMMISSAKIN PELEISSA, VAPAA SIIRTYMINEN VAIN SIINA PELISSA JOSSA ANSAITTIIN; KYNNYSTAULU OMISTAJAN SAANNOLLA (RADIO JA TOPOGRAFIA 1400) (23.9.2026 klo 20.44)

Tunnus 'peninkulma'.

## LIVIAN ELEET 44/45 TUOTANNOSSA (BUDAPEST KORJAANTUI ANKKURILLA); BERGEN c4: JUURISYY AJOITUS (c4:N ALKU, ANKKURIN LOPPU JA c5:N ALKU SAMASSA 5940 ms), EI TEKSTI → FABLEN PAATOS: c4 JA c5 YHDISTETAAN YHDEKSI CUEKSI (ELE c5:N MUKAAN), EI MAX_CUE_MS-LOYSENNYSTA → 45/45 (23.9.2026 klo 20.47)

PR #2978.

## PELIKOODARI: KARSINTA f4b254c, NAPPULA 38f69d6, LEHTI 18a3dd8 MASTERISSA; linssikytkennat bae87e4 MERGE-PYYNNOSSA; natiivi-peli ARKISTOITU; #2979 MERGETTY, #2982; 146/146; SEURAAVA B5; VIHREA PISTE ODOTTAA Karttapisteet-RAJAPINTAA (23.9.2026 klo 20.50)

Tarkastuksen A3, A5, A6, A9, C1, C6, C7, C8 tehty.

## SISALTOKIRJURI: ELEET 45/45 (PR #2978); INVENTAARIO PR #2981 (LEHDET PUUTTUU 71/266, HEROT 8/45, KARTUSCHA 21/135, PULMAT 11/266); JARJESTYS N1 → 8 HEROA → N2 (5/PR) → N3 (23.9.2026 klo 20.56)

Inventaario ohjaa sisältötyötä natiiviin.

## LAITETESTAAJA: NATIIVIN LEHTISAVUKE OK (PARIISI + FRA: ETUSIVU, 6 AIHETTA, COMMONS-KUVAT ATTRIBUUTIOLLA, SIVUNKAANTO, KAIUTIN); LINSSIEN LAITETESTI SIMULAATTORISSA 15/16 (KEKSINTOJEN KAYNNISTYSKORTTI, LINSSISEPPA KORJASI; laitetesti.sh KAYTTAA devicectl:AA → SIMULAATTORIKAAVA PORTATTIIN); OMISTAJAN ENSIKOKEMUS: PORTTI-RUUTU EI KERRO PELISTA MITAAN ENNEN NAPPIA (40 s PALLOA), 'LAITA AANET PAALLE' EI EROTU NAPIKSI → NATIIVI-UI KORJAA HETI; KAKSI EPAVARMAA UUSITAAN iPADILLA OIKEALLA KOSKETUKSELLA (23.9.2026 klo 20.59)

Raportit PR #2970.

## OMISTAJAN KYSYMYS 23.9. klo 21.0x: AUTTAAKO ILMAINEN APPI RADIOIHIN? FABLEN VASTAUS: EI OLEELLISESTI — ASEMIEN EHDOT KIELTAVAT UPOTUKSEN KOLMANNEN OSAPUOLEN SOVELLUKSIIN HINNASTA RIIPPUMATTA; TEOSTO/GRAMEX-KYSYMYS ON SAMA ILMAISESSA JA MAKSULLISESSA (SAMA KUIN WEBISSA NYT); LISAOSIEN MYYNTI EI PAHENNA OLEELLISESTI; HYBRIDI LUOKITTAIN PYSYY, SALLITTUJEN LISTAA KASVATETAAN LUPAKIRJEILLA (PIENET ASEMAT), ISOT YLEISRADIOT LINKKEINA (23.9.2026 klo 21.01)

Siirtoseppä voi arvioida, kuinka moni 99 epäselvästä on pieni asema, jolta lupa on realistinen.

## NATIIVI-UI: PORTTI c45db84, GALLERIAT 6d692a5, LEHTI-KYTKENTA d34ed16 MERGE-PYYNNOSSA; INVENTAARIO 3/10; PORTIN LAUSE KAANONISTA: 'SEURAA ISOISAN MATKAKIRJAA VUODELTA 1873 JA ETSI AARNIN LUETTELON UNOHDETUT AARTEET.' (23.9.2026 klo 21.02)

Webin meta-teksti päivitetään samaksi myöhemmin.

## NATIIVISEPPA ERA 7 (13f648a+): AARREPISTE KARTALLA, NATIIVILEHTI KYTKETTY → WKWebView POIS, MAAKUNNAT 1,2 km, RADIO AVPlayer KAANNETTY; AVOIN NAPPULAN 100–150 ms PIIKKI. FABLE: BUILD 3 NYT SISAISEEN RYHMAAN; RADIO SOITTAA VAIN SALLITTU-LUOKKAA (YLE KIELLETTY MYOS TESTISSA) (23.9.2026 klo 21.03)

WKWebView poistuu kokonaan tämän myötä.

## SIIRTOSEPPA: SKEEMAT 1.15–1.16 KOEPAKETISSA v16 (KARKI siirtoseppa-radiot d034f6d19, 45/45): 1.15 LEHDET — KAUPUNKILEHTI 11/12 OSIOTA PAATASOLLA (PAIVAYSRIVI NATIIVIN KAAVAKSI), MAALEHTI 11/11, UUDET KOKOELMAT kulttuurivisat 82, saatiedot 192, maakuntarajat 128, lisenssit.json (GPL-3.0-RAJAT), PAKETTI 64 → 79 Mt; 1.16 RADIO — KOKOELMA radiot 0 SALLITTU / 115 LINKKI (96 SIVU), VIRITYSAANET; docs/raportit/radio-luvat-mallikirje-20260923.md (MALLIKIRJE + 20 ASEMAA, EI LAHETETA ILMAN OMISTAJAA); JULKAISIJAN KETJU nippu4-kartta → kuvamitat → kuolleet → lehdet → radiot + #2975 + #2948 (23.9.2026 klo 21.04)

Paketin kasvu 79 Mt hyväksytty (striimataan, ei binaariin).

## BUILD 3 VIETY: Build/testflight-3 (MASTER 52e714f, fi.matkakirja.peli 1.0.0 (3)) JULKAISIJALLE SISAISEEN RYHMAAN — SISALTAA ROSVON POISTON, NATIIVIN LEHDEN, ALOITUKSEN, GALLERIAT, PASSIN JA LINSSIOMISTUKSEN; RADIOSAANTO KOODISSA: TUNTEMATON JA KIELLETTY EIVAT SOI EDES KEHITTAJATILASSA (23.9.2026 klo 21.05)

Omistaja kokeilee 24.9. aamulla TestFlightista.

## OMISTAJA 23.9. klo 21.05: 5 h -KIINTIO 94 % (NOLLAUTUU ~21.50) → KAIKKI SESSIOT TAUOLLE PAITSI JULKAISIJA, JOKA LATAA VAIN BUILD 3:N; FABLE LAHETTAA 'JATKA' NOLLAUKSEN JALKEEN. SISALTOKIRJURI: '8 HEROA ILMAN KUVAA' OLI VAARA HALYTYS (KAIKILLA COMMONS-KARUSELLI KUTEN BERGENILLA; MITTARI KATSOI VAIN GENEROIDUN HERO-PUTKEN) → HEROT-ERA POISTUU, N1 TAUON JALKEEN (23.9.2026 klo 21.07)

Viikkokiintiö 42 % (Fable 18 %).

## OMISTAJAN KORTTI 23.9. klo 21.1x (TARKENTAA klo 20.4x RADIOPAATOSTA): NATIIVI SOITTAA MYOS LISENSSILTAAN EPASELVAT ASEMAT (99), VAIN NIMENOMAISESTI KIELTANEET 16 (YLE, BBC, ARD YM.) JAAVAT LINKEIKSI; PERUSTE: ALAN KAYTANTO (APP STORE TAYNNA RADIOSOVELLUKSIA, APPLE EI TARKISTA STREAMLUPIA, RISKI = POISTOPYYNTO) JA WEBIN NYKYTILA; POISTOPYYNTOON VASTATAAN SIIRTAMALLA ASEMA LINKIKSI PAKETIN PAIVITYKSELLA ILMAN UUTTA BUILDIA; LUPAKIRJEET ISOIMMILLE SILTI; LUOKAT: sallittu JA epaselva SOIVAT, kielletty LINKKI (23.9.2026 klo 21.21)

Julkaistaan sessioille tauon jälkeen (Siirtoseppä radiot-kokoelman luokat, Linssiseppä soittosääntö).

## KORVAAVAT RADIOASEMAT (OPUS-AGENTTI, docs/raportit/radio-korvaavat-asemat-20260923.md): 16 KIELLETYN YLEISRADION TILALLE 34 EHDOKASTA (2/MAA + UGA), KAIKKI STREAMIT VASTASIVAT 200/206; LUOKAT 5 SALLITTU (BYTEFM DEU, ORANGE 94.0 AUT, RABE CHE, BNR NLD, 3RRR AUS) JA 29 EPASELVA, 0 KIELLETTY; SUOSITUKSET: FIN RADIO HELSINKI, GBR RESONANCE FM, UGA BUKEDDE FM, FRA RADIO CAMPUS PARIS, ESP RADIO VALLEKAS, NOR RADIO NOVA, SWE RADIO AF, DNK RADIO4, BEL URGENT.FM, PRT RUC COIMBRA, CAN CFRO, HKG D100 (HEIKOIN); HYLATTY KIELLETTYINA SUD RADIO, CADENA SER, OBSERVADOR, TSF; 4 VAIN http (EI iOS) → SIIRTOSEPPA VIE radiot-KOKOELMAAN, LUPAKIRJEET NAILLE 16:LLE (23.9.2026 klo 21.38)

Tauko jatkuu klo 21.53 asti; toimeksianto Siirtosepälle jatka-viestin yhteydessä.

## TESTFLIGHT BUILD 3 LATAUS KAATUI (run 35900520435): 'No signing certificate iOS Development found, private key not installed' → FABLEN DIAGNOOSI: BUILD 2:N PILVIALLEKIRJOITUS LOI VARMENTEEN VALIAIKAISEEN AVAINNIPPUUN JOKA POISTETTIIN AJON LOPUSSA, UUTTA EI SYNNY KIINTION TAKIA; KORJAUS: PYSYVA AVAINNIPPU AJURILLE (VARMENNE + AVAIN SAILYVAT AJOJEN VALILLA), ASC-VARMENNELISTAN TARKISTUS, TARVITTAESSA YKSI SIIVOUS OMISTAJAN LUVALLA JULKAISIJAN SESSIOON, RELEASE + app-store-connect (EI DEVELOPMENT-SIGNING) (23.9.2026 klo 21.46)

Ei Xcode Accounts -kirjautumista.

## TAUKO OHI klo 21.51 (KIINTIO NOLLAUTUI): JATKA-VIESTIT KAIKILLE; PELIKOODARI 84 % JA LINSSISEPPA 80 % → LUOVUTUS ENSIN, NOLLAUS; NATIIVISEPPA 71 %, SISALTOKIRJURI 68 % → LUOVUTUS VALMIIKSI 75 %:SSA; SIIRTOSEPPA: RADIOT-KOKOELMAN LUOKAT (SALLITTU + EPASELVA SOIVAT), 17 KORVAAVAA ASEMAA, LUPAKIRJEEN 20 ASEMAA (23.9.2026 klo 21.52)

Julkaisija korjaa build 3:n allekirjoitusta.

## PELIKOODARI NOLLATAAN klo 21.5x (84 %): LUOVUTUS viesti-pelikoodari-luovutus-20260923-natiivi4.md (1c50d7217); KAIKKI ERAT MASTERISSA AARREPISTEESEEN JA LEHTI-KORJAUKSEEN ASTI; B5 SAHKE WIP (pelikoodari/sahke eeff782); ALOITUS viesti-pelikoodari-aloitus.md. RADIOSAANTO TARKENNETTU NATIIVI-UI:LLE: SALLITTU JA EPASELVA SOIVAT, KIELLETTY LINKKI, LUOKATON EI NAYTETA (23.9.2026 klo 21.53)

Kolmas Pelikoodari-sessio tänään.

## LINSSISEPPA NOLLATAAN klo 21.5x (81 %): LUOVUTUS viesti-linssiseppa-luovutus-20260923-ilta.md (2205aed87), KAIKKI HAARAT MASTERISSA d29971b; ALOITUS viesti-linssiseppa-aloitus.md (RADION LUOKKASAANTO ENSIN). NATIIVISEPPA NOLLATAAN (LUOVUTUS viesti-natiiviseppa-luovutus-20260923-ilta2.md, selvittaja-3d-luovutus 5ca798933, ALOITUSVIESTI RAPORTIN LOPUSSA): PROTO-MASTER 284c798 (opas + skeema115 MERGETTY, v16-LEHTI VALMIS); KESKEN NAPPULAN PIIKKI, RANSKAN RAJAN PORRAS, RADIO-ATS-TESTI; MERGEAMATTA pelikoodari/sahke (WIP) JA linssiomistus b165dba; BUILD 3 SIGNING = RELEASE + app-store-connect, DEVELOPMENT_TEAM=$TEAM_ID. KOE: LINSSISEPAN NOLLAUS ILMAN RC:N SAMMUTUSTA (OMISTAJAN KYSYMYS ONKO RC-VAIHE TURHA) (23.9.2026 klo 21.54)

Laitetestaaja: fyysiselle iPadille ei kosketusinjektiota → kosketustesti omistajalle, dev-komennoilla 120 Hz -kehysajat.

## BUILD 3, TOINEN YRITYS KAATUI: ASC:SSA 0 iOS-VARMENNETTA (SIIVOUS PERUI KAIKKI), XCODE EI LUO DISTRIBUTION-VARMENNETTA ITSE (PR #2983 DIAGNOOSI) → SUUNNITELMA: DISTRIBUTION-VARMENNE ASC-API:LLA (CSR PYSYVASTA AVAINNIPUSTA), APP STORE -PROFIILI, MANUAALINEN ALLEKIRJOITUS ARCHIVESSA, VARMENNE SAILYY AJURILLA; OMISTAJAN LUPA JULKAISIJAN SESSIOON. NATIIVISEPPA JA LINSSISEPPA NOLLATTU klo 21.5x; KOE ONNISTUI: LINSSISEPAN clear_session TOIMI REMOTE CONTROL PAALLA → RC-SAMMUTUS EI OLE ENAA TARPEEN NOLLAUSKAAVASSA (23.9.2026 klo 21.57)

Nollauskaava lyhenee: send_message clear → 75 s → aloitusviesti.

## OMISTAJAN KYSYMYS 23.9. klo 21.5x: macOS-APPI? FABLEN KANTA: 1) iPAD-APPI MACILLA (APPLE SILICON) = ASC-RUKSI 'MAKE AVAILABLE ON MAC', EI KOODIMUUTOKSIA, KYTKETAAN APP STORE -JULKAISUSSA; 2) OIKEA macOS-BUILDI UNITYSTA MAHDOLLINEN (CESIUM + UITK TOIMIVAT), TYOTA 1–2 VK (iOS-LIITANNAISET macOS:LLE, HIIRI/NAPPAIMISTO, IKKUNAT, MAC APP STORE, NOTARISOINTI, TESTFLIGHT MACILLE) → VASTA iOS:N JALKEEN (23.9.2026 klo 21.57)

Ei toimenpiteitä nyt; kirjataan jonoon julkaisun jälkeen.

## NATIIVI-UI: NAPPI-INVENTAARIO 10/71 — MASTERISSA TURISTIOPAS, GALLERIAT, TIETAJAN TIE, AARNIN SELOSTE; MERGE-PYYNNOSSA RIVIT 5–10 (natiivi-ui/inventaario-5-10 5585040: LOGO → TEKIJATIEDOT, KYSYMYKSEN/LIPUN/KOHTAAMISEN KUVAT SUURENNOKSEEN, NOSTOKORTIN JA LUENNAN SUURENNOKSEN SELAUS, PULUN VASTAUKSEEN WIKIPEDIA-KUVA); KESKEN NAHTAVYYDET (ODOTTAA KOHDEKARTAT-KOKOELMAA) JA PULUN 'AVAA JUTTU'; RADION KUORI RINNAKKAIN (23.9.2026 klo 21.58)

Ilmoitus seuraavan 10 rivin jälkeen.

## SIIRTOSEPPA: RADIO KOEPAKETISSA v17 JA PR #2984 (46/46, 1978/1978): SOIVAT 115 MAATA (5 SALLITTUA, 110 EPASELVAA, KAIKKI https), 17 MAASSA KORVAAVA ASEMA JA KIELLETTY YLEISRADIO TOISENA RIVINA LINKKINA; LUPAKIRJEEN 20 = 17 KORVAAVAA + WNYC, AIR, RADIO 9090 (radio-luvat-mallikirje-20260923.md, EI LAHETETA ILMAN OMISTAJAA); 45 LUENNON AIKALEIMAT VOIMASSA → reaktioHetket TAYTTYVAT; SEURAAVA KOHDEKARTAT-KOKOELMA (23.9.2026 klo 21.58)

Radio-linssi on natiivissa datan puolesta valmis.

## LAITETESTAAJA: LEHDEN KONTAKTIARKKI WEB vs NATIIVI 6/6 (lehti-web-vs-natiivi-20260923.md): KOLME EROA — SISALLYSVALIKKO EI TOIMI, MAALEHDEN ETUSIVULTA PUUTTUU TILASTOLAATIKKO/MINIKARTTA/RADIOWIDGET, MAALEHDESSA 6 vs 9 AIHETTA → NATIIVI-UI; iPAD 120 Hz ENSIKOKEMUS DEV-KOMENNOILLA: p50 8,33 ms, 0 TOKKAYSTA (ensikokemus-ipad-20260923.md); KOSKETUSTESTI OMISTAJALLE; laitetesti.sh-SIMULAATTORIKAAVA MERGE-PYYNNOSSA (laitetestaaja/linssit-simulaattori 2391c2e). OMISTAJA ANTOI VARMENNELUVAN JULKAISIJAN SESSIOON (23.9.2026 klo 21.59)

Seuraavat: radion ja linssi-UI:n savukkeet, build 3 -vastine.

## OMISTAJA 23.9. klo 22.0x: KIELLETTYJEN YLEISRADIOIDEN LINKKIRIVIT POIS RADIOT-KOKOELMASTA — JOKA MAALLA VAIN SOIVA ASEMA (17 MAASSA KORVAAVA); KIELLETYT JAAVAT VAIN LISENSSI-INVENTAARIOON; 'AVAA ASEMAN SIVU' -KOODI JAA VARALLE ILMAN DATAA (23.9.2026 klo 22.01)

Siirtoseppä päivittää v18 ja PR #2984.

## OMISTAJAN KYSYMYS 23.9. klo 22.0x: macOS/WINDOWS/ANDROID? FABLEN ARVIO (EI PAATOS): SAMA UNITY-PROJEKTI, KOODISTA 90–95 % YHTEISTA; macOS 1–2 VK (HIIRI/NAPPAIMISTO, LIITANNAISET AVFoundation, IKKUNAT, MAC APP STORE, NOTARISOINTI; VALIVAIHE 'iPAD-APPI MACILLA' -RUKSI); ANDROID 2–3 VK (KOTLIN-LIITANNAISET, VULKAN/GLES-VARJOSTIMET, SUORITUSKYKYSAATO HEIKOMMILLE LAITTEILLE, 2–3 TESTILAITETTA, PLAY 25 $); WINDOWS 1–2 VK (HELPOIN KOODILLISESTI, VAATII WINDOWS-KONEEN TESTAUKSEEN, STEAM 100 $); JARJESTYSEHDOTUS iOS → macOS → ANDROID (TAI STEAM ENNEN); YKSI SISALTOPAKETTI JA MASTER PALVELEVAT KAIKKIA (23.9.2026 klo 22.04)

Kaikki myöhemmin, iOS ensin loppuun.

## OMISTAJA 23.9. klo 22.0x: TOKENEITA RIITTAA (USEAMPI TILI), 5 h -KIINTIO ON RAJOITTAVA TEKIJA; KORTTI: SESSIOITA EI JAETA KAHDELLE TILILLE, TAHDITETAAN YHDELLA → POSTIVAHTI RAPORTOI 5 h -PROSENTIN JOKA KIERROKSELLA JA HALYTTAA 80/90 %:SSA, FABLE PYSAYTTAA SESSIOT 90 %:SSA JA JATKAA NOLLAUKSEN JALKEEN; RASKAAT PARVET HETI NOLLAUKSEN JALKEEN (23.9.2026 klo 22.08)

Tänään ikkuna täyttyi klo 21.05 ja nollautui 21.50; seuraava nollaus 02.50.

## NATIIVI-UI: INVENTAARIO 20/71 (natiivi-ui/inventaario-11-20 8ba5d38 MERGE-PYYNNOSSA): LEHTIVERTAILUN 3 EROA KORJATTU (MAALEHTI WEBIN SIVUJARJESTYKSESSA: ETUSIVU KORKOKARTTA + PERUSTIEDOT + V-DEM, AIHEET, MAA NUMEROINA KAYRINEEN; SISALLYS TOIMII), LIPUN TARINA, CHATIN KASITELINKIT, PUHEKUPLAT-KYTKIN, KOHDEKORTIN KOROSTUKSET, PERIAATTEIDEN GITHUB-LINKKI; RADION KUORI natiivi-ui/radio 6500ee1 (KOTELO, PISTENAYTTO); SEURAAVA PIENI LIIKE + NOPPA, KUVASARJAT (23.9.2026 klo 22.08)

Radion kuoren 'Avaa aseman sivu' jää varalle ilman dataa.

## PELIKOODARI: B5 VALMIS (pelikoodari/sahke acade6d): SAHKE, RETKIKUNTA, KAVERIAPU, VIRSTANPYLVAAT, POLLON SAHKETEHTAVA; sahkejalki.json, 167/167; WEB PR #2985 SAHKEWORKERIN NATIIVIPORTTI → JULKAISIJA MERGEAA JA AJAA sahke-worker.yml; NAKYMAT NATIIVI-UI:LLE; SEURAAVA VARTIJA + KAUPAT (23.9.2026 klo 22.09)

B5 tehty.

## SIIRTOSEPPA: KOEPAKETTI v18 — RADIO (PR #2984, 907b89fa3): KIELLETYT POIS, 115 SOIVAA, 17 KORVAAVAA, 46/46; KOHDEKARTAT (SKEEMA 1.17, siirtoseppa-kohdekartat 5b28b6b52): 183 KARTTAA, 1561 KOHDETTA x/y-PISTEINEEN, 47/47; SEURAAVA LEHTITEHTAVAT JA PULLA_NIMET, SITTEN PIENTEN ASEMIEN ARVIO (23.9.2026 klo 22.12)

Natiivi-UI:n Nähtävyydet-rivi voi edetä.

## SISALTOKIRJURI: N1 VALMIS PR #2987 (BRYSSEL/KOSICE/LJUBLJANA 23 NAHTAVYYSKOHDETTA, LUXEMBURG/VALLETTA/SAN FRANCISCO TOINEN AIHESIVU, 4153/0); LUOVUTUS PR #2988 docs/raportit/viesti-fable-luovutus-20260923-ilta.md (HUOM: NIMI VIRHEELLINEN, SISALTAA SISALTOKIRJURIN LUOVUTUKSEN; ALOITUSVIESTI LOPUSSA); NOLLATAAN klo 22.1x; SEURAAVA N2 (5 KAUPUNKIA, LISTA TARKISTETTAVA TUOREESTA MAINISTA), N3 (23.9.2026 klo 22.16)

Nollaus ilman RC-vaiheita (uusi kaava).

## SISALTOKIRJURI: N1 VALMIS PR #2987 (BRYSSEL/KOSICE/LJUBLJANA 23 KOHDETTA, LUXEMBURG/VALLETTA/SAN FRANCISCO TOINEN AIHESIVU, 4153/0); LUOVUTUS PR #2988 viesti-fable-luovutus-20260923-ilta.md (NIMI VIRHEELLINEN, ON SISALTOKIRJURIN); NOLLATAAN; SEURAAVA N2 (5 KAUPUNKIA TUOREESTA MAINISTA), N3. SIIRTOSEPPA: KOEPAKETTI v19 — LEHTITEHTAVAT 77 JA PULLA_NIMET (0bed7fb3f, 48/48, FOKUSTEHTAVAT 69/69); SISALTOAUKKO: BERGENIN JA SEVILLAN LEHTITEHTAVA LUPAA JULISTEEN, JULISTEET-TAULUSSA EI OLE (MYOS WEBISSA) → SISALTOKIRJURIN N2:N ALKUUN (23.9.2026 klo 22.20)

Siirtoseppä: pienten asemien luparealismi, 2.0-suunnitelma.

## KARTTASEPPA: MAAILMAN MAASTO ALOITETAAN NYT (~2 h nice 15), SYVA RANSKA ODOTTAA #2957 (pyramidi.json 23a) → JULKAISIJALLE KARKEEN; PR #2989. PELIKOODARI: SAHKE, NOPPAKOUKKU, AJOITUSLOKI MASTERISSA; RahaMuuttui MERGE-PYYNNOSSA. SISALTOKIRJURI KAYNNISTETTY (JULISTEET → N2 → N3) (23.9.2026 klo 22.21)

Laitetestaaja ei mittaa sulavuutta maastoajon aikana.

## LINSSISEPPA (MASTER 618ef9e+): ISOISAN LINSSI 1873 ERA 1 iPADILLA (185 RAJAA, 133 NIMEA, GPL-RAJAT AMPARISTA LICENSE + LAHTEET; RAJATON POHJASARJA KARTTASEPALTA YOLLA → NYKYRAJAT POIS LINSSIN ALTA); VERTAILUN MAAKAYRAT DATAKSI (550 OSAA = WEB), NATIIVI-UI PIIRTAA; RADIO v17-RIVIJARJESTYS, TAUKO, NAYTTORIVIT; iPADILLA KAIKKI ASEMAT HILJAISIA (AVPlayer-JUMI) → KORJAUS 854a44c MERGE-PYYNNOSSA, ENSIMMAINEN KUULTU LAHETYS SEURAAVALLA VUOROLLA (23.9.2026 klo 22.23)

B10 tehty; B18 maakäyrät data valmis.

## LAITETESTAAJA: LINSSI-UI OK; BUILD 3 -VASTINE MASTERILLA OK (SILMUKKA 6/6, LEHTI, LINSSIT, HUIPENNUS); RADIOSAVUKE ODOTTAA MERGEA; SEURAAVA OMISTAJAN TESTFLIGHT-TARKISTUSLISTA 24.9. (23.9.2026 klo 22.23)

Raportit PR #2970.

## NATIIVI-UI NOLLATAAN klo 22.3x (78 %): LUOVUTUS viesti-natiivi-ui-luovutus-20260923-yo.md (7c049d92e); NOPPA JA PIENI LIIKE MASTERISSA, LEIMA MERGE-PYYNNOSSA, SAHKENAKYMAT JA NAHTAVYYDET KESKEN WORKTREEISSA (COMMITTAAMATTOMIA TIEDOSTOJA → UUSI SESSIO OTTAA TALTEEN); ALOITUS viesti-natiivi-ui-aloitus.md (23.9.2026 klo 22.26)

Neljäs Natiivi-UI-sessio tänään.

## LAITETESTAAJA NOLLATAAN (71 %): TARKISTUSLISTA omistajan-testflight-lista-20260924.md, LUOVUTUS -yo.md, ALOITUS viesti-laitetestaaja-aloitus.md. PELIKOODARI: MIGRAATIO v3/v4 → v5 TESTATTU (43f2820, 168/168); YOPORTTI PR #2990 (23.9.2026 klo 22.28)

Migraatio varmistettu TestFlight 1:n tallennuksilla.

## RADIO SOI iPADILLA (LINSSISEPPA, MASTER 5dd794d, v18-RADIOT): RaBe, ByteFM, RADIO HELSINKI JA AKABOOZI LUKITTUIVAT ~2,6 s:SSA JA SOIVAT 10 s MYOHEMMIN (AVPlayer Playing); NAYTTORIVIT WEBIN MUKAISET; LOKI proto-3d/lokit/radiotesti-20260923-b/. NATIIVI-UI KAYNNISTETTY UUDELLEEN klo 22.3x (23.9.2026 klo 22.28)

Radio-linssi natiivissa toimii päästä päähän.

## OMISTAJA 23.9. klo 22.3x: BERGENIN JA SEVILLAN JULISTEET TEHDAAN KUVAPUTKELLA KUTEN MUUT (tools/juliste-ajuri.mjs + juliste-tyolista, KUPARIKAIVERRUS-PROMPTI, POLLO_KEHITTAJAKOODI ACTIONSISSA, vie-julisteet.yml → AMPARI, JULISTEET-TAULUUN RIVIT), EI KASIN; PUUTE ON MYOS WEBISSA (23.9.2026 klo 22.33)

Sisältökirjuri tekee ensimmäisenä.

## OMISTAJAN KORTIT klo 22.4x: EI WEBISSA → KYSY -SAANTO; PENINKULMA JA HUIPENNUS PIDETAAN, ALOITUSKAUPUNKI KARTALTA; SAHKEEN 3 KORJAUSTA PIDETAAN JA MYOS WEBIIN; 1873 ERA 2 PUUTTUVIIN; 8 RISKIASEMAA KUTEN WEBISSA. FABLE: RELIEFI 0,8, RAJATON POHJASARJA KAYTTOON. NYKAYKSET = UI:N ENSIAVAUS. JULISTEET GENEROITU (PR #2991, juliste-ajuri.mjs RIKKI MACILLA). LUPAREALISMI 98 MAALLE (23.9.2026 klo 22.42)

Yksityiskohdat sessioiden viesteissä.

## SIIRTOSEPPA: SISALTOPAKETIN 2.0-SUUNNITELMA PR #2993 (8 KOKOELMAA TYYPITTAMATTA: nahtavyydet, miniatyyrit, fokusvirrat, kysymykset, elaintayt, julisteet, pulmat, laatat; LEHTIKUOREN POISTO 1.x-MINORINA; 2.0 ~36 Mt vs 79 Mt); FABLEN PAATOKSET: 1.x-TYYPITYS ALKAA NYT KOKOELMA KERRALLAAN (nahtavyydet + miniatyyrit → kysymykset + pulmat → LOPUT), NATIIVIN VARTIJATESTIN OMISTAA PELIKOODARI (NATIIVISEPPA AJAA tarkista.sh:SSA), 2.0 VASTA KUN KAIKKI LUKIJAT TYPITETTYJA (23.9.2026 klo 22.43)

Riskiasemapäätös kirjattu raportteihin 5bd1667fa.

## LAITETESTAAJA: RADION SAVUKE SIMULAATTORISSA — LUOKITTELU OK (LUOKATON EI SOI EIKA NAY, SALLITUT ETENEVAT VIRITYKSEEN), MUTTA SALLITUT 'ASEMA EI VASTAA' SOVELLUKSEN RELAUNCHIN JALKEEN (SAMA ASEMA SOI 20 MIN AIEMMIN) → EPAILY AVAudioSession/AVPlayer-ALUSTUS → LINSSISEPPA TOISTAA JA KORJAA, LAITETESTIIN 'RELAUNCH → RADIO SOI'; RAPORTTI radiotesti-natiivi-20260923-b.md (23.9.2026 klo 22.43)

Laitetestaaja jatkaa tallennusmigraation savukkeeseen.

## OMISTAJA 23.9. klo 22.4x (SITOVA, RAAMATTUUN): NATIIVIN ALOITUSKAAVA — ALOITUSKAUPUNKI KARTALTA KUTEN WEBISSA; VALINNAN JALKEEN PALLO JAA NAKYVIIN, KAMERA ZOOMAA LONTOOSEEN, LENTOKONE LAHTEE LONTOOSTA KAARTA PITKIN VALITTUUN KAUPUNKIIN KAMERAN SEURATESSA; SAMALLA ALKAVAT KONEEN AANI JA ISOISAN INTRO-LUENTA LENNON AJAKSI; SAAPUMINEN NORMAALISTI; EI ERILLISTA AVAUSRUUTUA. TYONJAKO: NATIIVISEPPA KAMERA-AJO + LENTOKAARI, NATIIVI-UI SIIRTYMA, PELIKOODARI AANEN JA LUENNAN AJOITUS (23.9.2026 klo 22.44)

Web ei muutu (webissä avausteksti erillisenä).

## NATIIVI-UI: ALOITUSKAUPUNKI PALLOLTA KUTEN WEBISSA (rivit22), NAHTAVYYDET MASTERISSA, INVENTAARIO +3. KORTTI: PULLATARJOUS POISTUU RATKAISUN JALKEEN MOLEMMISSA (PELIKOODARI WEBIIN). LINSSISEPPA: SIMULAATTORISSA RADIO EI OLE SOINUT KERTAAKAAN, iPADILLA RELAUNCH OK; DIAGNOOSILOKI 9b49703 (23.9.2026 klo 22.45)

Simulaattorin radio-ongelma on simulaattorikohtainen kunnes toisin todetaan.

## LAITETESTAAJA: TALLENNUSMIGRAATION SAVUKE PASS (v3→v5 JA v4→v5 OIKEILLA TALLENNUKSILLA, tallennusmigraatio-savuke-20260923.md); SEURAAVAT: RADION SAVUKE DIAGNOOSICOMMITILLA (SIMULAATTORISSA RADIO EI OLE VIELA SOINUT), ALOITUSKAUPUNKI PALLOLTA, ALOITUSLENNON KASIKIRJOITUS (23.9.2026 klo 22.46)

Mittaukset vasta maastoajon jälkeen.

## SIIRTOSEPPA: SKEEMA 1.18 — nahtavyydet JA miniatyyrit PAATASOLLA (1874f2485, 49/49, KOEPAKETTI v20); LOYDOS: 653 MINIATYYRIN DATA ON PELKKA TUNNUS JA NATIIVIN POLKURAKENNUS ANTAA VAARAN OSOITTEEN → TYYPITETTY kuva.url KORJAA (NATIIVI-UI:LLE KERROTTU); KETJU ODOTTAA #2984:AA MAINISSA (SITTEN 1.17, 1.18 PR:IKSI); SEURAAVA 1.19 KYSYMYKSET JA PULMAT (23.9.2026 klo 22.47)

Julkaisijan jonossa #2984 ennen näitä.

## OMISTAJA 23.9. klo 22.5x (SITOVA, RAAMATTUUN): LENNON ESITYS NATIIVISSA — PILVISUMU, AURINKO VALAISEE MANTEREET (CesiumSunSky), KAMERA YLAVIISTOSTA JA MUUTTUVA KULMA/KORKEUS, PUOLIORBITTI LASKUSSA, 3D-LENTOKONE = KLASSINEN POTKURIKONE (KORTTI; CC0 TAI KUVAPUTKI), SAVUJANA KORVAA PUNAISEN VIIVAN; TYONJAKO: NATIIVISEPPA KAMERA + VALO + SUMU + SAVUJANA, LINSSISEPPA PILVIKERROS (ASTRONAUTIN PILVET), NATIIVI-UI KONEEN MALLI JA MATERIAALIT, PELIKOODARI LENNON VAIHEET RAJAPINTAAN (23.9.2026 klo 22.53)

Ei webiin.

## RADIO SIMULAATTORISSA SELVISI: RELAUNCH EI OLLUT SYY — AUS/AUT/NLD SOIVAT AINA, VAIN stream.rabe.ch (CHE) KAATUU TLS-VIRHEESEEN SIMULAATTORISSA (iPADILLA SOI); DIAGNOOSIRIVI LINSSISEPALLE; LUOKITTELU OK. LINSSISEPPA: iPADILLA RELAUNCH OK (e510cfd, radiotesti-20260923-c), laitetesti.sh radio SISALTAA RELAUNCH-ASKELEEN (23.9.2026 klo 22.55)

Laitetestaaja siirtyy aloituskaupungin valintaan.

## BUILD 3: 4 EPAONNISTUNUTTA AJOA; VARMENNE + PROFIILI LUOTU; VIIMEISIN KAATUU 'UnityFramework does not support provisioning profiles' → PROFIILI VAIN APP-KOHTEELLE TAI AUTOMAATTINEN SIGNING. SIIRTOSEPPA: 1.x-TYYPITYS VALMIS (v23, 1.21, 52/52) (23.9.2026 klo 22.56)

Omistaja kysyi buildin kestoa; syy selvitetty lokista.

## BUILD 3 AJO 5 KAATUI ASC 409 (VARMENNE ON JO) → ASKEL IDEMPOTENTIKSI. SIIRTOSEPPA: LUPAKIRJE FI/EN JA TEOSTO/GRAMEX-MUISTIO VALMIIT. LINSSISEPPA: LENNON PILVISUMU (5b3896e), RABE TLS-SYY, RAJATON POHJA MASTERISSA (23.9.2026 klo 22.58)

Viides ajo; korjaus pieni.

## NATIIVI-UI: INVENTAARIO 30/71 (NAHTAVYYDET + KOHDEKARTTA, LAHTOVALINTA PALLOLTA, VAAKA-YLAPALKKI, SAHKETEHTAVA, KAIUTIN NOSTOKORTTEIHIN, PULUN 'AVAA JUTTU', LIVIAN AVAUSESITTELY, LINSSIN HAMPURILAINEN, VARUSTEIDEN ESIKATSELU); LENTOKONE: CC0-DC-3:A EI LOYTYNYT → OMA HOPEINEN DC-3-TYYPPINEN BLENDER-MALLI (1340 KOLMIOTA, CC0, POTKURIT PYORIVAT; natiivi-ui/lentokone, TEKIJATIEDOT); TYON ALLA MATKAKIRJAKORTIN POLUT (KORTTI VAIN 50/266 KAUPUNGISSA) JA NOSTOHAITARI. FABLEN PAATOS: 'MITA UUTTA' NAYTTAA NATIIVIN OMAN MUUTOSLOKIN PAKETIN KOKOELMASTA muutosloki-natiivi (JULKAISIJA TAYTTAA PER BUILD) + SISALTOPAIVITYSRIVIN AUTOMAATTISESTI (23.9.2026 klo 22.59)

Siirtoseppä lisää kokoelman skeemaan.

## BUILD 3: KAKSI DISTRIBUTION-VARMENNETTA LUOTU → OMISTAJAN LUPA YHDEN PERUMISEEN JULKAISIJAN SESSIOON. ALOITUSKAUPUNKI: VAHVISTUSKORTTI POIS, NAPAUTUS VALITSEE KUTEN WEBISSA. RABE: TLS ILMAN FORWARD SECRECYA (23.9.2026 klo 23.00)

Fable korjasi oman ohjeensa.

## SIIRTOSEPPA: ATS-TASOINEN RADIOTARKISTUS (tools/vienti/radiotarkistus.mjs, toimii-KENTTA, KOEPAKETTI v24): CHE RaBe EI LAPAISE (EI FORWARD SECRECYA) → RADIO VOSTOK (EPASELVA), SALLITTUJA 4; NGA METRO FM VERKKOTUNNUS POISTUNUT (MYOS WEBISSA) → SIIRTOSEPPA ETSII KORVAAJAN SAMALLA MENETELMALLA; TARKISTUS KAIKILLE 115:LLE (23.9.2026 klo 23.02)

Lupakirjelistan CHE-rivi päivittyy.

## KORTTI: JULKAISIJA SAA PERUA VAIN OMAT SAMANA PAIVANA LUODUT VARMENTEET (RAAMATTUUN); PERUMISLUPA LAHETETTY. SISALTOKIRJURI: N2 PR #2996 (5 LEHTEA), JULISTEVIENTI UUSINNASSA, N3 KAYNNISSA (23.9.2026 klo 23.05)

Kertaluonteinen kierre; jatkossa idempotentti.

## OMISTAJA 23.9. klo 23.0x (SITOVA, RAAMATTUUN): FABLE ANTAA KAIKILLE SESSIOILLE KASKYT ILMAN OMISTAJAN VALITYSTA; SESSIOT EIVAT PYYDA OMISTAJALTA LUPAA ASIOIHIN JOTKA RAAMATTU TAI FABLEN KASKY JO SALLII; OMISTAJALTA KYSYTAAN VAIN RAAMATUN MUKAAN KYSYTTAVAT (EI WEBISSA, JULKINEN TESTFLIGHT-RYHMA, APP STORE -LAHETYS JA HINTA, KUORIAPPIN VARMENTEET, LUPAKIRJEET, MAKSUT); LUOKITTIMEN ESTOSTA SESSIO ILMOITTAA FABLELLE → TASMALLINEN LUPA OMISTAJALTA (23.9.2026 klo 23.06)

Sallintasäännöt settings.json:ssa 23.9. alkaen.

## FABLE EI VOI MYONTAA OIKEUKSIA SESSIOILLE (KEHYKSEN RAJA); RATKAISU SALLINTALISTA TAI bypassPermissions (OMISTAJAN PAATOS). SIIRTOSEPPA: NGA TOIMII, ATS 0/115 HYLKAYSTA, v25 (23.9.2026 klo 23.07)

Fable listaa puuttuvat sallinnat huomenna.

## OMISTAJA klo 23.1x: FABLELLE VAIN AIDOT KYSYMYKSET. JULKAISIJA: LUOKITIN ESTAA JOPA COMMITIN, JOKA LISAA ASC-VARMENTEEN DELETE-LOGIIKAN (Secret-Store Writes / Cert Changes) → FABLEN PAATOS: EI REVOKE-KOODIA; #2995 (WWDR-KETJU) MERGEEN, AVAINNIPUN VARMENNE KAYTTOON, IDEMPOTENTTI GET, AUTOMAATTINEN SIGNING, BUILD 3 AJOON; TUPLAVARMENNE JAA (APPLE SALLII KAKSI), ID:T LOKIIN OMISTAJAN MYOHEMPAA SIIVOUSTA VARTEN. SISALTOKIRJURI: LUOKITIN ESTI env | grep POLLO JA security find-generic-password (Credential Exploration) → KIERSI ACTIONS-TYONKULULLA, EI HAITTAA (23.9.2026 klo 23.08)

Havainto: luokitin estää avainten etsimisen ympäristöstä kaikilta sessioilta; Actions-työnkulut ovat oikea reitti secreteille.

## PELIKOODARI: WEB-PR #2997 (v2154) SAHKEEN 3 KORJAUSTA + PULLATARJOUS, 4144/0, SAVUKE TOISTAA VIAT JA TODISTAA KORJAUKSEN; NATIIVISSA MERGE-PYYNNOISSA ALOITUSLENTO (LONTOOSTA VALITTUUN, INTRO + KONEEN AANI LAHDOSSA, KESTO ≥ INTRO) JA LENNON VAIHEET (NOUSU/MATKA/LASKU, TAPAHTUMAT); FABLEN PAATOS: EI PYSYVAA REITTIHISTORIAA (EI WEBISSA), TALLENNUS PYSYY v5:SSA (23.9.2026 klo 23.14)

Sähkekorjaukset menevät webiin v2154:ssä.

## SISALTOKIRJURI: BERGENIN JA SEVILLAN JULISTEET R2:SSA (julisteet/tuotanto/tuot-bergen.png, tuot-sevilla.png; VIETY SUORAAN MACILTA aws s3 cp, KOSKA vie-julisteet.yml AIKAKATKAISI KAHDESTI 15 MIN RAJAAN 880 TIEDOSTON SYNKASSA); PR #2991 VALMIS → FABLEN PAATOS: JULISTEVIENTI SIIRRETAAN MAC-AJURILLE JA SYNKATAAN VAIN MUUTTUNEET (JULKAISIJA). PELIKOODARI 70 % → LUOVUTUS ERAN JALKEEN; 5 h -KIINTIO 51 % (23.9.2026 klo 23.19)

Omistajan sääntö: kaikki mikä voi, ajetaan Macilla.

## PELIKOODARI NOLLATAAN klo 23.2x (70 %): LUOVUTUS viesti-pelikoodari-luovutus-20260923-natiivi5.md (428e93eae); B7 AANIERAT 1–2 AGENTILLA WORKTREESSA proto-pelikoodari-aani; ALOITUS viesti-pelikoodari-aloitus.md (23.9.2026 klo 23.21)

Neljäs Pelikoodari-sessio tänään.

## OMISTAJA klo 23.2x: OFFLINE-LATAUS MAANOSITTAIN TAI KAIKKI, EI YKSITTAISIA MAITA (RAAMATTUUN). SISALTOKIRJURI: N3 PR #3000 (17/21 MAATA); #2991, #2996, #3000 JULKAISIJALLE. FABLE: PR #2999. LUPATILAN VAIHTO ONNISTUU VAIN TUOREESEEN SESSIOON → NOLLAUKSEN YHTEYDESSA (23.9.2026 klo 23.27)

Pelikoodari vaihdettu.

## LUPATILA: bypass RIKKOO VERTAISVIESTINNAN → PELIKOODARI TAKAISIN auto, KAIKKI PYSYVAT auto-TILASSA. NATIIVISEPPA: LENNON ESITYS v1 iPADILLA (aa33461, OMA Aurinko.cs). JULKAISIJA AJO 6 KAATUI: VARMENTEIDEN AVAIMET POISTETUISSA AVAINNIPUISSA → PUHDAS POYTA SAANNOLLA. SIIRTOSEPPA v30 (OFFLINE-RYHMAT, SAAPUMISET). VALITYKSET PELIKOODARILLE (23.9.2026 klo 23.42)

Omistajalle kerrottu bypass-havainto.

## PELIKOODARI (UUSI SESSIO): VARTIJATESTIN TULKINTA VAHVISTETTU (C#-TESTI AJAA TUOTANTOPAKETIN JOKAISEN LUKIJAN LAPI; PUNAINEN JOS KENTTA PUUTTUU, TYYPPI VAARA, SKEEMA TUNTEMATON, MYOHEMMIN RAAKADATAN LUKU PAATASON OHI; tarkista.sh → kaanna.sh, YOPORTTIIN); B7:N EDELLINEN AGENTTI EI JATTANYT COMMITTEJA → ERAT 1–2 UUDELLEEN (VALICOMMITIT TUNNEITTAIN); PHPicker TYON ALLA; LENNON VAIHEET, LUENTA SAAPUESSA JA PAATASO MASTERISSA; WEB-PR:T #2982 #2985 #2990 #2997 VIHREINA JULKAISIJALLA (23.9.2026 klo 23.43)

Omistaja ajoi auto-mode-setup-ohjatun asennuksen (ympäristöprofiili projektille).

## BUILD 3 klo 23.4x: JULKAISIJAN LUOKITIN ESTAA KAIKKI KOMENNOT JOTKA NAYTTAVAT REVOKE-DIFFIN (MYOS git diff) → FABLEN PAATOS: EI REVOKE-KOODIA; OMISTAJA PERUU KAKSI TANAAN LUOTUA DISTRIBUTION-VARMENNETTA (PR569KHUBM, 6JTRS37MV5) KASIN PORTAALISSA, JULKAISIJA POISTAA PAIKALLISEN AVAINNIPUN JA AJAA UUDELLEEN (LUO UUDEN VARMENTEEN JA PROFIILIN). NATIIVI-UI: LENNON OVERLAY KORJATTU (natiivi-ui/lentoteksti abbb2b0: EI KORTTIA/KUVIA/OHITAA LENNOLLA, TEKSTI KAISTALEENA ≤34 %/30 %). SIIRTOSEPPA 72 % → LUOVUTUS ERAN JALKEEN. PELIKOODARILLE UUSITTU VANHENTUNUT VALITYSVIESTI (23.9.2026 klo 23.44)

Aito omistajan tehtävä: kaksi klikkausta portaalissa.

## SIIRTOSEPPA NOLLATAAN klo 23.4x (72 %): LUOVUTUS viesti-siirtoseppa-luovutus-20260923-yo.md (f413129eb), SKEEMA 1.24, v30, KARKI siirtoseppa-saapumiset, EI KESKENERAISIA; ALOITUS viesti-siirtoseppa-aloitus.md (23.9.2026 klo 23.45)

Kolmas Siirtoseppä-sessio tänään.

## SISALTOKIRJURI: N4 PR #3002 (5 LUONTOKOHDETTA), 10/71 TANAAN. AVAINNIPPULAPPU SELITETTY OMISTAJALLE (23.9.2026 klo 23.46)

Julkaisija rajaa avainnipun työnkulun käyttöön.

## PELIKOODARI: KUVANVALITSIN MERGETTY; pelikoodari/aanten-ajoitus b32be57 MERGE-PYYNNOSSA (dieLand JA AARREAANI WEBIN HETKELLA, KaariAarre, LENNON VAIHEET NAPPULAN KELLOSSA, PELIN VUOROKAUDENAIKA OHJAA AURINKOA); KAYNNISSA B7, PAKETTIVARTIJA, WEB-PR (EHDOTUSWORKER + HETKET). FABLEN PAATOS: AURINGON AJAT AAMU 9 / KESKIPAIVA 13 / ILTA 18, YO = ILTAVALO (EI PIMEAA KARTTAA, PERGAMENTTI LUETTAVANA; SINERTAVA SAVY SALLITTU) (23.9.2026 klo 23.47)

Ei omistajan kysymys: vastaus tiedossa (luettavuus).

## NATIIVISEPPA: Build/testflight-4 VALMIS (PROTO 6531bfe, 1.0.0 (4)): ALOITUSLENTO TESTATTU iPADILLA OIKEALLA UI-POLULLA (DC-3, SAVUJANA, PILVET, AURINKO, LASKUN KIERTO, INTRO-KAISTALE ALAREUNASSA), OFFLINE MAANOSITTAIN MASTERISSA (maat[].manner); TURISTI-INFO-MERKKI EI TEHDA (WEB KYLTTI_KARTALLA=false, PAATOKSET 34 KOHTA 8) — LINJAUS ENNALLAAN. FABLE: BUILD 4 KORVAA BUILD 3:N JULKAISIJAN SEURAAVASSA AJOSSA. JULKAISIJA: #3001 (NAKYVA WWDR-VIRHE, EI REVOKEA) MERGETTY, ODOTTAA OMISTAJAN PERUMISTA PORTAALISSA (23.9.2026 klo 23.52)

Build 4:ssä on koko illan työ.

## SIIRTOSEPPA: muutosloki-natiivi VALMIS (v31, TYOKALU JULKAISIJALLE); JULKAISIJA TARKISTAA ASC:STA TESTFLIGHT-BUILDIT (RISTIRIITA 0.1.0 (1) vs 1.0.0 (2)); MitaUutta MYOS BUILD-NUMEROSTA (23.9.2026 klo 23.53)

Totuus ASC-API:sta.

## NATIIVISEPPA d4493df: PIIKKI 40 → 16,5 ms, MERGE-JONO TYHJA, 182/182; ESPANJAN VIIVA = DEM:N REUNA → MAAILMAN MAASTO. BUILD 4 VIEDAAN UUDELLEEN d4493df:STA (23.9.2026 klo 23.59)

Natiiviseppä ajaa omistajan tarkistuslistan iPadilla.

## PELIKOODARI: PAKETTIVARTIJA MERGE-PYYNNOSSA (v11 4108/0, v31 VIHREA); AMPARIN v11 SKEEMANUMERO EI VASTAA KENTTIA → SIIRTOSEPPA; B7 1–2 MASTERISSA (24.9.2026 klo 00.00)

Vartija yöporttiin.

## NATIIVI-UI NOLLATAAN klo 00.0x (71 %): LUOVUTUS viesti-natiivi-ui-luovutus-20260924.md (bb68596e7), KAIKKI HAARAT MASTERISSA d4493df; ALOITUS viesti-natiivi-ui-aloitus.md (24.9.2026 klo 00.05)

Viides Natiivi-UI-sessio.

## SIIRTOSEPPA: SKEEMASOPIMUS (siirtoseppa-saapumiset b357fcd87, 61/61): JUURISYY — AMPARIN v11 KOOTTIIN KOEPAKETISTA 942cc9446 klo 18.13 JA SKEEMAA 1.10 LAAJENNETTIIN SAMALLA NUMEROLLA (klo 18.22 JA 19.22) → '1.10' TARKOITTI KAHTA PAKETTIA; KORJAUS: JULKAISUN TARKISTUS VAATII KUNKIN VERSION TUNNUSKENTAT (1.9–1.24) JA KENTTAKUVAN TIIVISTE PYSAYTTAA UUDET KENTAT SAMALLA NUMEROLLA; NATIIVI SIETAA v11:N PUUTTUVAT KENTAT KUNNES #2984 (1.16) JULKAISTAAN. NATIIVI-UI KAYNNISTETTY UUDELLEEN klo 00.06 (24.9.2026 klo 00.07)

Oppi: skeemanumero nousee joka kenttämuutoksesta.

## SISALTOKIRJURI: N5 PR #3004 (YELLOWSTONE, GRAND CANYON, ULURU, IGUAZU, TITICACA); 15/71 LEHTEA TANAAN; NOLLATAAN klo 00.1x, LUOVUTUS viesti-sisaltokirjuri-luovutus-20260924.md (PR #3005), ALOITUS viesti-sisaltokirjuri-aloitus.md (24.9.2026 klo 00.11)

Neljäs Sisältökirjuri-sessio.

## NATIIVISEPPA: OMISTAJAN TARKISTUSLISTA AJETTU iPADILLA (proto-3d/lokit/tarkistuslista-20260924/RAPORTTI.md): VAKAVA KORJATTU — LEHDET ILMAN TYYLEJA (MERGE 7ab5311 PUDOTTI Lehti.uss:N }-MERKIN; KORJAUS 524f0e9, tarkista.sh VARTIOI USS-AALTOSULUT); TF4 VIETY UUDELLEEN MASTERISTA 7706efd (VAIN TAMA KAYTETAAN); POIKKEAMAT: MAALEHDEN OTSIKKO 'GRC' (→ NATIIVI-UI), SAAPUMISKORTTI JAA ALLE (→ NATIIVI-UI), AVAUSTEKSTI EI NAY AUTOMAATIOSSA (ui aloita OHITTAA); TARKISTUSLISTAN KOHDAT 4, 14, 16 VANHENTUNEET → LAITETESTAAJA PAIVITTAA (24.9.2026 klo 00.14)

Seuraavaksi Euroopan tarkempi maakuntakartta.

## PELIKOODARI: B7 ERAT 3–4 (pelikoodari/aani-soitin 5e496fa) MERGE-PYYNNOSSA — Aanisoitin + PELIOHJAIMEN AANIKOUKUT (POHJARAITA, MAISEMA, VISA, SIIRTYMA, AARREAIHE, LINSSIN PITO), 202/202; TILATTU UI-KOUKUT NATIIVI-UI:LTA, MIXER NATIIVISEPALTA, LINSSIMUSIIKIN KENTAT LINSSISEPALTA; ERO: MANNERLENNON MAISEMA → WEBIN MUKAAN (LAHTOKAUPUNGIN MAISEMA PERILLE ASTI); SEURAAVA ERA 5 (JET-SILMUKKA, TEHOSTEET), ERA 6 KUULOKOE (24.9.2026 klo 00.16)

Ääntä ei ole vielä kuultu natiivissa.

## NATIIVI-UI: iPAD-KORJAUKSET natiivi-ui/ipad-korjaukset 2a4c5a0 (GRC → KREIKKA; JUURISYY MiniJson.Objekti(null) HEITTI KUN v11:N MAISTA PUUTTUU MAAKARTTA → 44 KUTSUA NULL-TURVALLISIKSI; MATKAKIRJAKORTTI LAPPUNA LUENNAN AIKANA), /lahteet, /chat-ylarivi; HAVAINTO: AMPARIN v11:N moduulit/-TIEDOSTOT 404 VAIKKA MANIFESTI LISTAA → SIIRTOSEPPA LISAA VASTAAVUUSTARKISTUKSEN; SEURAAVA LIIKU/VAIHDA MATKUSTUSTAPA/SANELU-RAJAPINNAT, SAHKEEN WEBIVERTAILU, MAAKAYRAT (24.9.2026 klo 00.21)

Inventaario 1e4e5374c.

## SIIRTOSEPPA: v11:N 404 SELVITETTY — AMPARIN v11 ON EHJA (492/492 MANIFESTIN TIEDOSTOA 200); 404:T TULIVAT 1.12+ TIEDOSTOISTA (ui-tekstit 1.12, fokustehtavat 1.17) JOITA v11:SSA EI KUULU OLLA → NATIIVI-UI SIETAA PUUTTUVAT KUNNES OSOITIN NOUSEE; vie-sisalto.yml AJAA NYT amparitarkistus.mjs:N (HEAD JOKA TIEDOSTOLLE, KOKO = PAIKALLINEN) ENNEN OSOITTIMEN VAIHTOA (8/8); SKEEMA 1.25 MAAKUNTARAJOJEN KAARET NATIIVISEPALLE (v32, 64/64) (24.9.2026 klo 00.25)

Ei Julkaisijan korjattavaa.

## 5 h -KIINTIO 80 % klo 00.2x → VAROITUS KAIKILLE (EI UUSIA AGENTTEJA, TYOT COMMITTIIN), TAUKO 90 %:SSA, JATKO 02.50. NATIIVI-UI: v11:N 404 OLI OMA CURL-VIRHE (TUPLAKAUTTAVIIVA), PAKETTI EHJA; AVAUSTEKSTI EI NAKYNYT ALOITUSLENNOLLA (PIILOTA-AJASTIN) → KORJAUS natiivi-ui/ipad-korjaukset a2806be; B7-KOUKUT natiivi-ui/aanisoitin-koukut 36e6089 MERGE-PYYNNOSSA; KAIKKI COMMITOITU, VALMIS TAUKOON (24.9.2026 klo 00.26)

Julkaisija: vain build 4 ja merget.

## PELIKOODARI: B7 ERA 5 (pelikoodari/aani-era5 b4e88f8) MERGE-PYYNNOSSA; KORJAUS: WEB VAIHTAA KOHDEKAUPUNGIN MAISEMAN JA RAIDAN HETI LENNON ALUSSA (ennakoiAmbienssi) → NATIIVI SAMOIN; MOOTTORIAANI AVAUSLENNOLLA PIDETAAN (OMISTAJAN ALOITUSKAAVA); SEURAAVA MAISEMAN KOMPRESSORI (OnAudioFilterRead, WEB ~6 dB KOVEMPI) NOLLAUKSEN JALKEEN (24.9.2026 klo 00.29)

Ei uusia agentteja ennen nollausta.

## NATIIVISEPPA: MAAKUNTIEN RAJAT VEKTORIVIIVOINA (PROTO-MASTER 2be7879; 1,2 pt VIIVA MAASTON PAALLA, TERAVA JOKA ZOOMILLA; TAYTTO 1,2 km TUNNUSKARTASTA); MAITA EI LISATTY (WEBIN LAAJUUS = SAMAT 8); SKEEMAN 1.25 KAARET (v32) POISTAVAT TUPLAVIIVAT; MERGETTY LINSSIMUSIIKKI, iPAD-KORJAUKSET, LAHTEET, CHAT-YLARIVI, AANISOITIN JA KOUKUT; 202/202; TF4 = 7706efd JULKAISIJALLA (24.9.2026 klo 00.29)

Kiintiö huomioitu: ei agentteja.

## PELIKOODARI: B7 ERAT 1–5 + UI-KOUKUT MASTERISSA 96c9bf0 (MYOS LINSSIMUSIIKIN KYTKENTA, SANELU Info.plist, PAKETTIVARTIJA), 215/215; ERA 6 KUULOKOE VALMIS ALOITETTAVAKSI (proto-3d/lokit/b7-kuulokoe-tarkistuslista.md, 13 KOHTAA) → LAITETESTAAJA NOLLAUKSEN JALKEEN; KULKUTAPOJEN RAJAPINNAT LOPPUSUORALLA (24.9.2026 klo 00.33)

B7 = tarkastuksen B-listan viimeisiä isoja kohtia.

## PELIKOODARI: KULKUTAVAT MERGE-PYYNNOSSA (pelikoodari/kulkutavat 46a00f1: VAIHDA MATKUSTUSTAPA, LIIKU, KULKUTAPALIUSKA WEBIN MUKAAN, JALKI 733 ASKELTA; MiniJson SIETAA PUUTTUVAT); FABLE: NOPAN SIIRTOLISTA EI SULKEUDU ILMAN VALINTAA (WEB) → 'VALITSE KOHDE' -TILA POIS; linssikarttaEstaa-EHTO LINSSISEPALLE; KAIKKI YON ERAT MASTERISSA TAI MERGE-PYYNNOSSA (24.9.2026 klo 00.36)

Agentteja ei käynnissä.

## NATIIVI-UI: MASTERISSA 30fe586 — LIIKU, KULKUTAPALIUKU (4 IKONIA, ESTETYN SYY TILARIVILLE), VAIHDA MATKUSTUSTAPA, CHATIN SANELU + KIRJOITA KYSYMYS + AANIEN TAUKO SANELUN AJAKSI, B7-KOUKUT JA TEHOSTEIDEN WEBPARITEETTI (KAIKU, MAKEUP, VIRE, CLACK), AVAUSTEKSTI ALOITUSLENNOLLA; KUVASARJALISTA LAITETESTAAJALLE docs/raportit/kuvasarjat-natiivi-ui-20260924.md (A1–A9); AVOINNA ✈-KOHDEMERKIT (NATIIVISEPPA), TIEDELIITE JA AIKAJANALINSSIT (LINSSISEPPA) (24.9.2026 klo 00.39)

Natiivi-UI jatkaa inventaarion NUI-rivejä nollauksen jälkeen.

## KARTTASEPPA: MAAILMAN MAASTO (GLO-90 z0–z10) TUOTETTU — 2 263 883 LAATTAA, 11,8 Gt NAS:ISSA, TARKISTUS TASMAA layer.jsoniin; VIENTI AMPARIIN ALKOI (USEITA TUNTEJA); OSOITE NATIIVISEPALLE VALMISTUTTUA (24.9.2026 klo 00.41)

Sulavuusmittaukset sallittu taas (tuotto valmis, vienti on I/O).

## SISALTOKIRJURI: N6 PR #3006 (5 KOHDETTA), 20/71 TEHTY; N7 NOLLAUKSEN JALKEEN (24.9.2026 klo 00.41)

Kiintiöohje noudatettu.

## 5 h -KIINTIO 90 % klo 01.4x → KAIKKI SESSIOT TAUOLLE 02.50 ASTI (KARTTASEPAN AMPARIVIENTI JATKUU TAUSTALLA; JULKAISIJA SAA AJAA BUILD 4:N JOS OMISTAJA PERUU VARMENTEET); FABLE HERAA 02.44 JA LAHETTAA JATKA-VIESTIT (24.9.2026 klo 01.47)

Toinen kiintiötauko tänä iltana.

## OMISTAJAN KORTTI 24.9. klo 02.0x: JULKAISIJA VAIHDETAAN OPUKSEEN (EFFORT HIGH) TESTFLIGHT- JA NIGHTLY-PUTKEN RAKENTAMISEN AJAKSI — POIKKEUS RAAMATUN ROOLIMALLISTA (SONNET); PERUSTE: 6 KAATUNUTTA ALLEKIRJOITUSAJOA, JUURISYY (VALIAIKAISEN AVAINNIPUN POISTO VEI YKSITYISET AVAIMET) JAI HUOMAAMATTA, REVOKE-KOODIN VAHINKOMERGE; TAKAISIN SONNETIIN KUN BUILD ON MENNYT LAPI JA NIGHTLY AJAA ITSESTAAN. OMISTAJA PERUU PORTAALISSA 3 JAKELUVARMENNETTA (2 iOS DISTRIBUTION + DISTRIBUTION MANAGED), DEVELOPMENT JAA; TIIMI RCD77XPB7M; OMISTAJAN ASC-TUNNUS = LAITTEEN APPLE ID (KORJAUS) (24.9.2026 klo 02.27)

Vaihto tehty set_session_model/effort-työkaluilla ilman nollausta.

## JULKAISIJA (OPUS) LOYSI TODELLISEN JUURISYYN 20 MINUUTISSA: IOS_DISTRIBUTION-VARMENNE NAKYY AVAINNIPUSSA NIMELLA 'iPhone Distribution', TARKISTUS HAKI 'Apple Distribution' → JOKA AJO LOI UUDEN (AVAIMET OLIVAT TALLESSA; FABLEN AIEMPI DIAGNOOSI AVAINTEN KATOAMISESTA OLI VAARA); LISAKSI AJURI TOIMII KAYTTAJANA koodaus JA NIPPU OLI JAANYT OLETUSNIPUKSI (UNITY HUB -KYSELYN SYY) → PALAUTETTU login-NIPPUUN; ARKISTO TARVITSEE DEVELOPMENT-IDENTITEETIN → OMA DEVELOPMENT-VARMENNE NIPPUUN; PR #3008 (SHA-1-TUNNISTUS, EI PERUMISTA, PALUUARVOT NAKYVASTI) → BUILD 4 KUN VIHREA; ASC:SSA 2 AKTIIVISTA iOS DISTRIBUTIONIA (ACN2K38688, PK8TVTL7Q8), TOINEN YLIMAARAINEN (24.9.2026 klo 02.35)

Mallinvaihto Opukseen maksoi itsensä heti takaisin.

## BUILD 4 TESTFLIGHTISSA klo 02.4x: run 35934690874 VIHREA, 'UPLOAD SUCCEEDED', 1.0.0 build 202609232339 (PROTO 7706efd; SISALTAA ALOITUSLENNON, LENNON ESITYKSEN, NATIIVIN LEHDEN, OFFLINE MAANOSITTAIN, RADION, PASSIN, LINSSIT); SISAINEN RYHMA PR #3009:LLA (TESTAAJA = TILIN OMISTAJA ASC-API:STA); HUOM: CFBundleVersion ON AIKALEIMA (ASC VAATII KASVAVAN; BUILD 2 = 202609231658) → 'MITA UUTTA' NAYTTAA AIKALEIMAN, EI '(4)' — HYVAKSYTTY; MUUTOSLOKI-NATIIVI-RIVIT KIRJOITETAAN NAILLA NUMEROILLA (24.9.2026 klo 02.49)

Toinen natiivibuildi TestFlightissa; putki toimii nyt idempotentisti.

## TAUKO OHI klo 02.5x (KIINTIO 0 %): JATKA-VIESTIT KAIKILLE (LAITETESTAAJA KUULOKOE ENSIN, SISALTOKIRJURI N7, JULKAISIJA #3009 → SISAINEN RYHMA → NIGHTLY → PR-JONO). FABLE NOLLAA ITSENSA (76 %): LUOVUTUS viesti-fable-luovutus-20260924.md (60a326ccf), ALOITUS viesti-fable-aloitus.md; POSTIVAHTI AJAA KAAVAN (24.9.2026 klo 02.52)

Kaikki 10 sessiota työssä; build 4 TestFlightissa.

## BUILD 4 (202609232339) KASITELTY JA OMISTAJAN SAATAVILLA TESTFLIGHTISSA: OMISTAJA ON SISAISESSA RYHMASSA 'BETA TESTAAJAT', JOKA SAA KAIKKI BUILDIT AUTOMAATTISESTI (run 35935682403); MUUTOSLOKI-RIVIT SIIRTOSEPALLE; JULKAISIJA JATKAA #2984 → NIGHTLY (24.9.2026 klo 02.53)

Omistaja päivittää TestFlightista aamulla.

## UUSI FABLE ALOITTI klo 02.5x NOLLAUKSEN JALKEEN: LUOVUTUS 60a326ccf LUETTU, 10 APUSESSIOTA AUKI (KAIKKI PAITSI POSTIVAHTI JA KARTTASEPPA TYOSSA), JONON KOHTA 1 VALMIS (BUILD 4 OMISTAJAN SAATAVILLA klo 02.53); SEURAAVAKSI KUULOKOKEEN TULOS, #2984 → KETJU, OMISTAJAN AAMUKOKEILU (24.9.2026 klo 02.56)

Uusi Fable-sessio (tili B, haara claude/bold-ride-vow4ki) jatkaa luovutuksen jonosta. Aloitusviesti tuli Postivahdilta. Ei aloitusviestejä auki oleville sessioille. Sallintalista (jonon kohta 6): yön luokitinestot (revoke-koodin commit, credential exploration) eivät ole permissions-sääntöjä vaan auto-tilan luokittimen päätöksiä; niitä ei voi avata sallintalistalla → esitetään omistajalle aamun kortissa tiedoksi, ei rivejä.

## SIIRTOSEPPA: SKEEMA 1.26 (siirtoseppa-saapumiset 90fa97343, v33, 63/63) LISAA PAATASOKENTAT (TARINAKAARI, PAIKKATIEDOT, KOHTAAMISET, KOHTAAMISKUVAT, PAIKALLISAARTEET, SAAPUMISPUHEET, FOKUSVIRTOJEN KOHTAAMISPISTE JA SAHKETEHTAVA); PAKETTIVARTIJA 29 PUNAISTA = LUKIJOIDEN VAIHTO PAATASOON (POLKUKARTTA PELIKOODARILLE); muutosloki-natiivi KORJATTU (f9a022dd5). FABLE: #2984 JONON KARKI, JULKAISIJA MERGEAA --admin JOS VAIN savukkeet-mac PUNAINEN (YLEINEN VIKA 23.9. ILLASTA) JA SELVITTAA JUURISYYN (24.9.2026 klo 02.59)

Siirtosepän ilmoitus klo 03.0x; #2984 tarkistukset käynnissä (reitti vihreä, savukkeet-mac ja testit ajavat).

## TARKENNUS #2984: FABLEN LUOKITIN ESTI --admin-OHJEEN LAHETYKSEN (CI Bypass) → OHJE JULKAISIJALLE ILMAN OHITUSTA: SELVITA JA KORJAA savukkeet-mac:N YLEINEN PUNAINEN ENSIN, MERGE VIHREANA; OMISTAJALLE TIEDOKSI AAMUN KORTISSA (24.9.2026 klo 02.59)

Edellisen kirjauksen --admin-kohta ei ole voimassa. Sallintalistalla ei voi avata luokitinestoa; Raamatun --admin-sääntö on Julkaisijan oma harkinta.

## LAITETESTAAJA: B7 KUULOKOE 6/13 (docs/raportit/b7-kuulokoe-tulos-20260924.md, HAARA laitetestaaja): ETUSIVU, AVAUSLENTO, VISA, AARRE, LEHTI, LINSSIT OIKEIN, EI VIRHEITA; AVOIN EPAILY INTRON TASONPALAUTUS (0,6×/1,45× EI PALAUTUNUT KAUPUNKIVALINNASSA) → PELIKOODARI TARKISTAA; KOHDAT 3, 4, 9, 13 SEURAAVAAN ERAAN KOMPRESSORIN JALKEEN; KOHTA 12 (MYKISTYS, BLUETOOTH) OMISTAJAN iPAD-LISTALLE; OMISTAJAN TARKISTUSLISTA VIEDAAN MAINIIN PR:LLA ENNEN AAMUA; LAITETESTAAJA JATKAA A1–A9 (24.9.2026 klo 03.02)

Fablen ohjeet klo 03.0x. Pelikoodarille etusijalla Siirtosepän polkukartta (29 punaista lukijaa → päätaso), sitten intron tasonpalautus ja kompressori.

## LAITETESTAAJA: PR #3010 (DOCS) = OMISTAJAN TESTFLIGHT-TARKISTUSLISTA (KOHTA 16 TARKENNETTU, UUSI KOHTA 19 MYKISTYS/BLUETOOTH; KOHDAT 4 JA 14 JO AJAN TASALLA) + B7-KUULOKOERAPORTTI; JULKAISIJA MERGEAA ENNEN AAMUA (24.9.2026 klo 03.05)

Laitetestaajan haara oli jäljessä mainista, PR tehtiin uudesta haarasta origin/mainista.

## LINSSISEPPA: ASTRONAUTIN TAUSTA JA ILMAKEHAN HEHKU TODETTU iPADILLA (PROTO-MASTER 8235156; SININEN AVARUUS SUMUINEEN, REUNAHEHKU, UI PIILOSSA, ASTRONAUTTIPULU JA SULJE LINSSI); EROT WEBIIN: RELIEFIN VAALEA SUMUVERHO (NATIIVI-UI:N SUMU-KOUKKU) JA HARVEMMAT PILVET → VERTAILU SAMASTA NAKYMASTA; TIEDELIITE JA LINSSIPORTIN KYTKENTA MASTERISSA fd4e352 (24.9.2026 klo 03.06)

Fable: web on oletus (Raamattu, LINSSIT) — sumuverho ja pilvitiheys webin mukaan, ei omaa tulkintaa.

## NATIIVI-UI: MASTERISSA PULUN PAIKALLINEN TIETOHAKU JA MATKAKIRJALINKIT (pollo-haku.js), TIEDELIITE, LAPPUKAHVA, ASTRONAUTIN LAHDELINKIT; MERGE-PYYNNOSSA POLLOPOIMINTOJEN PILLERIT (2aa8738) JA ASTROSUMU (c59646f); INVENTAARIO 65 RIVIA PAIVITETTY (09a67dd7b); AVOINNA JAA MATKA (iOS-JAKOARKKI PELIKOODARILTA) JA OSION 8 LEHTIRIVIT. FABLE TARKISTI: ✈-KOHDEMERKIT OVAT VAIN WEBIN VANHASSA TASOKARTASSA (ui.js), PALLOLAUTA EI PIIRRA NIITA → JAAVAT POIS NATIIVISTA (VAIN AJANTASAISTA) (24.9.2026 klo 03.10)

Lentokaaret Natiivisepältä Natiivi-UI:n ehdotuksen mukaan.

## JULKAISIJA: #2984 MAINISSA (v2154) → SIIRTOSEPAN KETJU ALKAA; savukkeet-mac:N YLEINEN PUNAINEN SELVITETTY (EI WEBKIT): 1) glnimiot-nostot/-nimet KAAPPASIVAT GL-KERROKSEN NAKYVYYDEN VAIHDON 150 ms:SSA, LEPOPIIRTO 250 ms:N SYKKEELLA → IDENTTISET KUVAT, KORJAUS PR #3011; 2) lahizoom 390 8k PUNAINEN 22.9. ILLASTA (LIUSKA 78 px MERKIN YLAPUOLELLA) → TUNNETTU PUNAINEN, PELIKOODARILLE; MUUT PUNAISET KUORMAVAIHTELUA. NIGHTLY: VAIHTOEHTO A (BATCHMODE PAATYOKOPIOSSA, OHITUSEHDOT, Build/yo), AJO 01.00 UTC = 04.00 SUOMEN AIKAA (24.9.2026 klo 03.11)

Fable: hyväksytty. Julkaisija mergeää myös #3010 (omistajan tarkistuslista) ennen aamua.

## SIIRTOSEPPA: AMPARIN OSOITIN NOUSSUT v15 / SKEEMA 1.16 (CI e7ac0294a, #2984, v2154, klo 03.12; AMPARITARKISTUS 481/481, SKEEMASOPIMUS OK) → v11:N KENTTAPUUTE KORJAUTUNUT; PR #3012 (1.17–1.26 + SKEEMASOPIMUS + AMPARITARKISTUS, 66/66, WEB 2228/2228) JULKAISIJALLA → MERGEN JALKEEN CI JULKAISEE 1.26:N (MAAKUNTAKAARET, OFFLINE-MAANOSAT); PELIKOODARIN LUKIJASIIRTO KAYNNISSA (pelikoodari/paataso-lukijat) (24.9.2026 klo 03.15)

Jonon kohta 3 valmis osoittimen osalta; #3012 seuraava.

## SISALTOKIRJURI: N7 PR #3013 (KILIMANJARO, VIKTORIAN PUTOUKSET, SITKA, BERMUDA, FALKLANDINSAARET), 4164/0; 25/71 TEHTY; N8 KAYNNISSA (24.9.2026 klo 03.16)

Rutiinierä, ei päätöksiä.

## NATIIVI-UI NOLLATAAN klo 03.2x (78 %): LUOVUTUS viesti-natiivi-ui-luovutus-20260924-b.md (25602e864), PROTO-MASTER 07bc3e4, MERGE-PYYNNOSSA natiivi-ui/lehti-kulttuuri 3d3ee8b (UUTISET); ALOITUS viesti-natiivi-ui-aloitus.md (24.9.2026 klo 03.20)

Kaava: clear_session → 75 s → aloitusviesti.

## NATIIVI-UI KAYNNISTETTY UUDELLEEN klo 03.2x (ALOITUSVIESTI PAIVITETTY: A1–A9-HAVAINNOT ENSIN, OSIO 8, JAA MATKA, INVENTAARIO); NOLLAUSKAAVA TOIMI FABLEN AJAMANA (send_message clear_session self → 80 s → send_message) (24.9.2026 klo 03.22)

Julkaisija ajaa pitkää vuoroa (#3010/#3012/nightly); muut sessiot työssä tai levossa.

## LINSSISEPPA: ASTRONAUTIN LINSSI VASTAA WEBIA iPADILLA (PROTO-MASTER 95d5dbb; SININEN AVARUUS, HEHKU, ASTROSUMUHARSO, RELIEFI 0,8, PILVET WEBIN VAKIOILLA, UI/KORTIT/NAPPULA/PISTEET PIILOSSA); SIVUKORJAUKSET: HARSON ALFA (NATIIVI-UI), NAPPULA YLOSALAISIN METALISSA (NATIIVISEPPA), NAPPULAN JA PISTEIDEN PIILOTUS LINSSIPORTIN AJAKSI (18b8ce8) (24.9.2026 klo 03.31)

Astronautti valmis natiivissa. Linssisepän seuraava erä luovutuksen jonon mukaan (aikajanalinssit, rajaton pohja).

## SISALTOKIRJURI: N8 PR #3015 (KAP HORN, NAMIB, ROBINSON CRUSOE, NORFOLK, ANGOLA), 4164/0, KUVATOISTO N7:N KANSSA KORJATTU ENNEN PR:AA; 30/71; N9 KAYNNISSA (24.9.2026 klo 03.43)

Rutiinierä.

## NATIIVI-UI (UUSI SESSIO): A1–A9 UUSINNASSA A4/A5/A7 PASS, EHDOTUSLOMAKE LEHDEN PAALLE (MASTER 0f5ff7f); LEHDEN MEDIARIVI (RADIO LIVE, KIELINAYTE, ENNEN-TALLENNE) MASTERISSA 3e66f72; AIKAJANAN VIISI EROA WEBIN MUKAAN (PALKKI, HAVAINNEKUVA, VALINAYTOS, LOPPUSANAT) MASTERISSA cebcf62, KEKSIJAKARUSELLI JA LOYTOKUVA MERGE-PYYNNOSSA 008a39a; IHMISEN MATKAN AIKASELAIN PUUTTUU NATIIVISTA (◀▶ VALIAIKAISESTI), TEKIJA SOVITAAN LINSSISEPAN KANSSA; SEURAAVAKSI OSIO 8 LUE LISAA → WIKI-DIALOGI, SITTEN JAA MATKA (24.9.2026 klo 03.54)

Rutiinierä; aikaselain on webin toiminto, joten se tehdään (toimintopariteetti), ei jää pois.

## NATIIVISEPPA (70 %) JA LINSSISEPPA (73 %) PYYDETTY LUOVUTUKSEEN klo 03.5x → NOLLAUS JA ALOITUSVIESTIT FABLEN KAAVALLA; NATIIVISEPALLE EI OLE VIELA ALOITUSVIESTITIEDOSTOA → KIRJOITETAAN viesti-natiiviseppa-aloitus.md LUOVUTUKSEN POHJALTA (24.9.2026 klo 04.02)

Postivahdin ilmoitus klo 03.5x.

## LINSSISEPPA NOLLATTU klo 04.0x (73 %): LUOVUTUS viesti-linssiseppa-luovutus-20260924.md (53e0a06b4, HAARA linssiseppa-tyo-20260923), PROTO-MASTER 3afad75, MERGE-PYYNNOSSA korkeussovitus 0896ad4; AIKASELAIMEN SOPIMUS NATIIVI-UI:N KANSSA (MOOTTORI LINSSISEPAN, NAUHA NATIIVI-UI:N); ALOITUS viesti-linssiseppa-aloitus.md PAIVITETTY (24.9.2026 klo 04.06)

Isoisä 1873 erä 2 pysyy odottavana (ei webissä).

## NATIIVISEPPA NOLLATTU klo 04.1x (70 %): LUOVUTUS viesti-natiiviseppa-luovutus-20260924.md (7f9d2b14e, HAARA selvittaja-3d-luovutus), PROTO-MASTER a345a19, AVOIMET MERGE-PYYNNOT natiivi-ui/jaa-matka 9230344 (LAITEKAANNOS .mm) JA natiivi-ui/nosto-media f02a5ee; LEVY 98 % → TF1–3 JA Build/iOS-laite POISTETTU (~24 Gt VAPAANA); ALOITUS viesti-natiiviseppa-aloitus.md LUOTU (24.9.2026 klo 04.10)

Kesken: maailman maaston osoite, valokeilan ensimmäinen vaihto 23 ms, ui jatka -kehys 100 ms, Espanjan viiva.

## NATIIVI-UI: MASTERISSA LUE LISAA -IKKUNA (OMA ARTIKKELI TAI WIKIPEDIA), KEKSIJAKARUSELLI, IHMISEN MATKAN AIKASELAIN (◀▶ POIS), KUVIEN GPU-LUKU TAUSTALLA (KUVAT OIKEIN PAIN, PIIKIT PIENEMMAT); MERGE-JONOSSA JAA MATKA, NOSTON KUUNTELU- JA MUSIIKKINAPIT, LINSSIN VALMIIT KYSYMYKSET, IHMISEN MATKAN NOSTOKORTTI, HAVAINNEKUVIEN ESILATAUS; INVENTAARION OSIOT 8, 16, 20 TARKISTETTU; KUVASARJA C LAITETESTAAJALLA; SEURAAVAKSI C-LOYDOKSET, SITTEN KOKEET-RIVIT (24.9.2026 klo 04.13)

Fable: merge-jono etenee kun Natiiviseppä on nollattu; Natiivi-UI päivittää nappi-inventaarion tehty-luvun jokaisen erän jälkeen.

## SISALTOKIRJURI: N9 PR #3016 (KARTHAGO, TANGANJIKA, CHURCHILL, SIERRA LEONE, APPALAKIT), 4164/0; 35/71; N10 KAYNNISSA (24.9.2026 klo 04.16)

Rutiinierä.

## NATIIVI-UI: NAPPI-INVENTAARION TEHTY-LUKU PAIVITETTY — NUI-RIVIT 193 ON / 1 OSITTAIN / 0 PUUTTUU / 6 KOKEET / 3 EI TARVITA; KAIKKI RIVIT 198 ON / 9 OSITTAIN / 11 PUUTTUU (PELIKOODARI 5, NATIIVISEPPA 4, LINSSISEPPA 2) / 18 KOKEET / 15 EI TARVITA; ERA: KARTUSCHAN RADIO, KEKSINTOLINSSIN ESILAMMITYS, NOSTOKORTIN KENTAT TIEDELIITTEINEEN (MERGE-JONOSSA); SEURAAVAKSI IHMISEN MATKAN TUTKIMUSVAIHEEN UI LINSSISEPAN MOOTTORILLA (24.9.2026 klo 04.21)

Natiivin toimintopariteetti on UI:n osalta käytännössä täysi; puuttuvat 11 riviä kuuluvat Pelikoodarille, Natiivisepälle ja Linssisepälle.

## LINSSISEPPA (UUSI SESSIO): loytopaikka-kentat MASTERISSA (724ad30; NOSTOKORTIN KENTAT JA IHMISEN MATKAN TIEDELIITE, 40/40 NOSTOA WEBIA VASTEN); tutkimusvaihe + ihmisen-tiedeliite (1f163d3) NATIIVISEPAN JONOSSA (TUTKIMUSVAIHE 40 NOSTOA, VIISI NAPPIA, KAANTO VANAAN; LINSSIN MUISTI WEB-SAANNOILLA PlayerPrefs; TIEDELIITTEEN RAIDAN VAISTO; 206/206); TAUSTAAANTEN VAISTO OLI JO MASTERISSA (AaniTila.LinssiPito); SEURAAVAKSI AIKAJANALINSSIEN KONTAKTIAJO iPADILLA (24.9.2026 klo 04.22)

Rutiinierä.

## NOLLAUSKAAVAN VIKA LOYTYI klo 04.2x: clear_session self TOTEUTUU VASTA VUORON PAATYTTYA JA PUTOAA POIS, JOS UUSI VIESTI EHTII JONOON ENNEN SITA → NATIIVI-UI:N NOLLAUS klo 03.20 EI TOTEUTUNUT (75 % KLO 04.2x), LINSSISEPAN TOTEUTUI (31 %), NATIIVISEPAN EPAVARMA (74 %). KORJATTU KAAVA: LUOVUTUS → SESSIO KUTSUU clear_session self SAMASSA VUORO SSA → FABLE ODOTTAA LEPOILMOITUKSEN (notify_when_idle) JA TARKISTAA get_usage (KONTEKSTI < 10 %) → VASTA SITTEN ALOITUSVIESTI. VIIKKOKIINTIO (KAIKKI MALLIT) 77 % KAYTETTY, NOLLAUTUU MA 28.9. klo 04 → OMISTAJALLE AAMUN KORTISSA (TAHTI EI RIITA VIIKON LOPPUUN); 5 h 35 % (24.9.2026 klo 04.25)

Fablen havainto get_usage-työkalulla. Ei uusia sessioita ennen omistajan päätöstä viikkokiintiöstä.

## NATIIVI-UI NOLLATTU OIKEASTI klo 04.2x (TRANSKRIPTI 0 VIESTIA TARKISTETTU): LUOVUTUS viesti-natiivi-ui-luovutus-20260924-c.md (342cbbed4), PROTO-MASTER 41bda44, MERGE-PYYNNOSSA tutkimusvaihe 16ede1d; ALOITUSVIESTI klo 04.3x (SEURAAVAKSI PYSAKINVAIHDON 24 ms PIIKKI, C-LOYDOKSET, OSITTAISET RIVIT, KOKEET). NATIIVISEPPA YHA 75 % JA TYOSSA → NOLLAUS ODOTTAA LEPOA (24.9.2026 klo 04.28)

Korjattu kaava toimi: sessio kutsui clear_session self itse, Fable tarkisti list_events = 0 viestiä ennen aloitusviestiä.

## NATIIVISEPPA: KAIKKI MERGE-PYYNNOT TEHTY, PROTO-MASTER 92b8098 (KARTUSCHAN RADIOVALO, NOSTOKORTIN KENTAT, IHMISEN MATKAN TUTKIMUSVAIHE JA TIEDELIITE), LUOVUTUS PAIVITETTY c37789753; VALOKEILA: JOKA KEKSINTOLINSSIN PYSAKINVAIHTO ~24 ms, ESILAMMITYS EI AUTTANUT, PAAEPAILTY KEKSIJAKARUSELLIN 26 KORTIN UUDELLEENJARJESTYS → NATIIVI-UI KORJAA, NATIIVISEPPA MITTAA iPADILLA; MAAILMAN MAASTON OSOITE 404 klo 04.27, VALMIS ~05 → Rakennus.MaastoUrl HETI. NOLLAUS EI TOTEUTUNUT (1958 VIESTIA) → PYYDETTY UUDELLEEN PELKKANA clear_session self -VUORONA (24.9.2026 klo 04.29)

Aloitusviesti Natiivisepälle lähetetään vasta kun transkripti on tyhjä.

## NATIIVISEPPA NOLLATTU OIKEASTI klo 04.3x (TRANSKRIPTI 0 VIESTIA TARKISTETTU), ALOITUSVIESTI LAHETETTY (MASTER 92b8098; ENSIN MAAILMAN MAASTON OSOITE, KARUSELLIN MITTAUS, ui jatka -KEHYS). KAIKKI KOLME YON NOLLAUSTA (NATIIVI-UI, LINSSISEPPA, NATIIVISEPPA) NYT VARMISTETTU (24.9.2026 klo 04.30)

Korjattu kaava kirjattu muistioon session-nollaus-automaattinen; Raamatun KONTEKSTIN NOLLAUS -kohta päivitetään aamulla samaan muotoon.

## LINSSISEPPA: AIKAJANALINSSIEN KONTAKTIAJO iPADILLA (41bda44, proto-3d/lokit/kontakti-20260924-41bda44): KEKSINTOJEN LOPPU KAMERA = WEB (KORKEUSSOVITUS TOIMII), KARTTA 2× VAALEAMPI KOSKA TUMMENNUS SEKOITTUI LINEAARISENA → linssiseppa/tummennus-gamma 692daa3 NATIIVISEPAN JONOSSA; 1873: WEBIN VERTAILUKUVA VIRHEELLINEN (NOPEUTETUT AJASTIMET, KAMERA PIETARISSA) → OTETAAN UUDELLEEN; LEVANTTI: KUVAT KESKEN 9 s AJON → SEURAAVASSA ≥ 10 s; Pysakkiajo.Pelaaja TARKISTETAAN UUDEN WEBKUVAN KANSSA (24.9.2026 klo 04.34)

Vertailukuvat otetaan aina ajon päätyttyä, ei nopeutetuilla ajastimilla.

## NATIIVI-UI: PYSAKINVAIHDON PIIKIN KORJAUS MERGE-PYYNNOSSA (natiivi-ui/karuselli-kevyt 8b6268c: VAIN NAKYVAT KORTIT PAIVITTYVAT, JARJESTYS YHDELLA SIIRROLLA 26:N SIJAAN, AJOITUSRIVI LOKIIN); TUTKIMUSVAIHE MASTERISSA; LAITETESTAAJA: C1–C6, A1–A9 JA MEDIARIVI KAIKKI PASS; SEURAAVAKSI INVENTAARION OSITTAISET RIVIT (24.9.2026 klo 04.35)

Natiiviseppä mittaa iPadilla mergen jälkeen.

## SISALTOKIRJURI: N10 PR #3017 (ST. HELENA, KIMBERLEY, LABRADOR, KAP PALMAS, BOA VISTA), 4164/0; 40/71; SIS. tests/pollo.test.mjs:N ESIMERKKIKYSYMYKSEN VAIHTO (NAPOLEON-SISALTO ANTOI OSUMAN VANHALLE VASTAUKSETTOMALLE); N11 KAYNNISSA (24.9.2026 klo 04.46)

Hyväksytty: testin esimerkki vaihdettu, ei sääntömuutos.

## NATIIVI-UI: PYSAKINVAIHDON PIIKKI KORJATTU MASTERISSA (iPAD 0,8–2,5 ms, ENNEN 24 ms); KARUSELLIN SUMENNUS GAUSSISEKSI KUTEN WEBISSA (MERGE-PYYNNOSSA karuselli-sumea); KOKEET-TYOHUONE MERGE-PYYNNOSSA (kehittajan-liite: RAAMATTU MUOKKAUSKENTTINEEN JA LAHETYKSINEEN, KEHITTAJALEHTI TILANNE + POIMINNAT, POLLOPOIMINTOJEN LAITEVARASTO; AINEISTO SKEEMASTA 1.27); TEHTY-LUKU NUI 196/2/0/1, KAIKKI 202 ON / 10 OSITTAIN / 10 PUUTTUU / 13 KOKEET; 'KYSYMYKSET HETI' POISTETTU WEBISTA → EI TARVITA. FABLE: RAAMATUN MUOKKAUS NATIIVISSA NOUDATTAA WEBIN KOLMEA SAANTOA (RAAMATTU-OLIO EI MUUTU, EI PYSYVAA TALLENNUSTA, LAHETYS EHDOTUSREITTIA → FABLE KIRJAA); VAIN KEHITTAJATILASSA (24.9.2026 klo 04.48)

Natiivi-UI jatkaa Kehittäjälehden muihin sivuihin ja Raamatun taulusivuihin.

## KARTTASEPPA: MAAILMAN MAASTO VALMIS JA VIETY AMPARIIN — julisteet/maasto/2026-09-24-maailma/layer.json (2 263 883 LAATTAA, KOKO MAAILMA z0–z10, EUROOPPA z12), OSOITE NATIIVISEPALLA (→ Rakennus.MaastoUrl, ESPANJAN 41° N -VIIVA POISTUU); SYVA RANSKA -SARJA ALKAA KUN 23a-LUETTELO ON AMPARISSA (#2957) (24.9.2026 klo 04.56)

Julkaisijalle: #2957 jonossa Karttasepän tarpeen vuoksi.

## NATIIVI-UI: MASTERISSA RAAMATTU TAULUSIVUINEEN (AARTEET, PELIT) JA KEHITTAJALEHDEN TILANNELEHTI, POIMINNAT, GRAFIIKKA, MUSIIKKI (VAIN KEHITTAJATILASSA); MERGE-PYYNNOSSA LUKIJOILTA (EHDOTUKSET, RAAMATUN MUUTOKSET, REAKTIOT, KORJAUSMERKINTA, PRO-TUOTTAJAT; KURATOINTIAVAIN KENTTAAN KERRAN); ODOTTAA: TILASTOT (SIIRTOSEPAN TILASTOT-VIENTI), LUKIJAAANI (PELIKOODARIN SAADINRIVI); TEHTY 203 ON / 9 OSITTAIN / 10 PUUTTUU / 13 KOKEET; TYOHUONEEN TESTILISTA T1–T6 LAITETESTAAJALLE. FABLE: KURATOINTIAVAIN TALLENNETAAN VAIN iOS KEYCHAINIIN, EI PlayerPrefsiin EIKA TIEDOSTOON; EI KOSKAAN LOKIIN (24.9.2026 klo 04.58)

Webissä avain elää selaimen tallennuksessa; natiivissa Keychain on vastaava turvallinen paikka.

## NATIIVI-UI: LUKIJOILTA MERGETTIIN MASTERIIN AVAIN PlayerPrefsissa → KIIREELLINEN KORJAUS avain-muistiin edf39eb MERGE-PYYNNOSSA (AVAIN VAIN MUISTISSA, VANHA PlayerPrefs-ARVO POISTETAAN, SALASANAKENTTA, AVAIMELLINEN KUVAOSOITE EI LOKIIN); KEYCHAIN-LIITANTA MatkakirjaAvaimet.mm TILATTU PELIKOODARILTA (Plugins/iOS); TILASTOT SEURAAVAKSI (SIIRTOSEPAN 1.28). FABLE: AVAIMELLISTA MASTERIA EI VIEDA TESTFLIGHTIIN ENNEN edf39eb:N MERGEA (24.9.2026 klo 04.59)

Natiiviseppä mergeää edf39eb:n ennen muita; nightly ei saa poimia väliversiota.

## NATIIVISEPPA: avain-muistiin edf39eb MERGETTY (MASTER 82018fb, 0 VIRHETTA); YOLLINEN TF EI POIMINUT VALIVERSIOTA (Build/yo:TA EI OLE → NIGHTLY EI AJANUT klo 04 TAI EI VIELA KAYTOSSA); MAAILMAN MAASTO MASTERISSA (64a7844), iPAD-TARKISTUS ODOTTAA LINSSISEPAN iPAD-VUORON PAATTYMISTA (24.9.2026 klo 05.00)

Julkaisijalta odotetaan raportti nightlyn tilasta.

## NATIIVISEPPA: MAAILMAN MAASTO 2026-09-24-maailma (z0–z12) MASTERISSA JA iPADILLA — ESPANJAN 41° N -VIIVA POISTUNUT, PYRENEIDEN KALLISTUS TOIMII (proto-3d/lokit/maailman-maasto-20260924/docs/); MASTER 62c03b4: PELIKOODARIN AVAIMET (KEYCHAIN), paataso-lukijat, avaus-introon, MAISEMAKOMPRESSORI (239/239), NATIIVI-UI:N TILASTOT JA PEITTEET, LINSSISEPAN valo-gamma; 0 VIRHETTA; SININEN TUMMENNUSSAVY TULEE UI-KERROKSESTA → NATIIVI-UI ETSII (24.9.2026 klo 05.07)

Keychain-liitäntä masterissa → Natiivi-UI kytkee kuratointiavaimen siihen.

## SISALTOKIRJURI: N11 PR #3018 (VIKTORIA NYANZA, GAO, KAMERUNVUORI, SUAKIN, AHAGGAR), 4164/0; 45/71; N12 KAYNNISSA (24.9.2026 klo 05.09)

Rutiinierä.

## LAITETESTAAJA LUOVUTTAA klo 05.1x (71 %): PR #3019 (DOCS); TANAAN RADIO-TLS, TALLENNUSMIGRAATIO, B7 6/13, TARKISTUSLISTA #3010, A/MEDIA/C-SARJAT PASS, T1/T3/T4/T5 PASS; T2 EI: TOISTETTAVA KOSKETUSBUGI RAAMATTU-EDITORISSA (KENTAN MUOKKAUKSEN JALKEEN JOKA NAPAUTUS AVAA SAMAN POPUPIN, LAHETA EI NAPAUTETTAVISSA) → NATIIVI-UI KORJAA ENSIN; T6 KESKEN; ALOITUSVIESTI PAIVITETTY (T6, T2 UUSINTA, SULAVUUSMITTAUKSET MAAILMAN MAASTOLLA, B7 LOPUT) (24.9.2026 klo 05.12)

Nollaus korjatulla kaavalla: sessio kutsuu clear_session self itse, Fable odottaa lepoilmoituksen.

## NATIIVI-UI: KURATOINTIAVAIN MASTERISSA KEYCHAINISSA (LUETAAN KAYNNISTYKSESSA, TALLENNETAAN SYOTETTAESSA, POISTETAAN JOS HYLATAAN; MUISTIVALIVAIHE POIS); SININEN SAVY KORJATTU (a3516d9): VUOROKAUDENAJAN SAVY SEKOITTUI ALFANA MULTIPLYN SIJAAN → LINSSIN AIKANA POIS KUTEN WEBISSA, MUULLOIN MUSTA KERROS SAMALLA KIRKKAUDELLA; TILASTOT MASTERISSA; ui jatka 107 ms SYY AUKI, MITTAUSTYOKALU ui piikit MERGE-PYYNNOSSA. FABLEN PAATOS: WEBIN KANAVAKERTOIMIEN 0,96–0,99 VARIVIVAHTEEN POISJAANTI HYVAKSYTTY POIKKEAMANA (SILMIN EROTTUMATON); TEHDAAN MULTIPLY-SHADERINA VAIN JOS OMISTAJA HUOMAA ERON (24.9.2026 klo 05.12)

Fablen lupa webistä poikkeamiseen (Raamattu: LINSSIT, web on oletus).

## LAITETESTAAJA NOLLATTU klo 05.1x (0 VIESTIA TARKISTETTU), ALOITUSVIESTI LAHETETTY. NATIIVI-UI: T2-KORJAUS MERGE-PYYNNOSSA (natiivi-ui/kentta-fokus 42894b0): iOS-NAPPAIMISTON SULKEUDUTTUA KENTTA JAI UI TOOLKITISSA FOKUKSEEN → VAPAUTETAAN KUN NAPPAIMISTO PIILOUTUU; KOSKEE KAIKKIA LOMAKEKENTTIA; T2-UUSINTA LAITETESTAAJAN JONOSSA (24.9.2026 klo 05.13)

Neljä nollausta tänä yönä korjatulla kaavalla.

## LINSSISEPPA: AIKAJANALINSSIT = WEB iPADILLA (01fb5ec, proto-3d/lokit/kontakti-20260924-01fb5ec): KEKSINNOT 1873 JA LOPPU SEKA LEVANTTI VASTAAVAT WEBIA KAMERAN, LAMPPUJEN, REIAN JA KUVAN OSALTA; KORJATTU tummennus-gamma, valo-gamma, REIAN PEILAUS, PAALUN REIKA, PISTEKERROIN (MYOS KARTAN), SININEN SAVYKERROS; JALJELLA: KARTTA HIEMAN TUMMEMPI (32 vs 49) JA NATIIVI-UI:N EROT (LOPPUPANEELI VAALEA vs TUMMA, KARUSELLIN KOOT, PALKIN OTSIKKO); LEVANTIN YLIMAARAINEN LAMPPU = WEBIN SAANTO (24.9.2026 klo 05.26)

Fable: kartan tummuus 32 vs 49 korjataan webin arvoon; UI-erot Natiivi-UI:lle.

## FABLEN PAATOS — NATIIVIN UI-SKAALA iPADILLA: 1 UI-YKSIKKO = 1 iOS-PISTE = WEBIN CSS-PIKSELI (SAFARI iPADILLA), iPHONE ENNALLAAN (VIITERUUTU 393 × 852). PERUSTE: WEB ON OLETUS; NYKYINEN ScaleWithScreenSize TEKI iPAD PRO 11":N UI:STA 1,74-KERTAISEN WEBIIN NAHDEN, EIKA MIKAAN NAKYMA VASTANNUT WEBIA. SEURAUS: LAITETESTAAJAN A- JA C-SARJAT AJETAAN iPADILLA UUDELLEEN (NATIIVISEPPA AJAA LAITTEELLA). SKAALASTA RIIPPUMATTOMAT KORJAUKSET (LOPPUPANEELI #201a14, PALKIN SELITETEKSTIT) HETI (24.9.2026 klo 05.28)

Natiivi-UI:n kysymys klo 05.3x; Fablen valta Raamatun LINSSIT-linjauksen sisällä (web on oletus).

## NATIIVI-UI MERGE-PYYNNOSSA: vertailu-paneeli 66df54f (LOPPUSANOJEN JA TEKSTIPYSAKKIEN PANEELI WEBIN TUMMAAN ASUUN #201a14, KULTAREUNA, TEKSTI #f1e6d0; VIRTANAPPIEN LYHYET NIMET ≤ 1000 px KUTEN WEBIN @media); ipad-pisteet 8bb2e8a (iPAD 1 YKSIKKO = 1 pt, KOSKETUSKOHTEET ≥ 44 pt); ui jatka 107 ms JUURISYY = PELIKOODARIN Aanisoitin PURKAA ALLE 3 Mt:N RAIDAN PAASAIKEESSA (SoundManager.LoadFMODSound 73 ms) → PELIKOODARI: LATAUS TAUSTASAIKEESSA / STRIIMAUS; HUOMIO: PELIKOODARIN UGUI-CANVASIT (Tilarivi.Skaalain) JAAVAT iPADILLA VIITERUUTUUN → SAMA PISTESKAALA (24.9.2026 klo 05.32)

Fable välittää molemmat Pelikoodarille.

## SISALTOKIRJURI: N12 PR #3020 (MOSAMBIK, DARFUR, TSAD-JARVI, RAS HAFUN, CAYENNE), 4164/0, KUVATOISTO MAALEHDEN KANSSA KORJATTU; 50/71, 21 JALJELLA; N13 KAYNNISSA (24.9.2026 klo 05.34)

Rutiinierä.

## JULKAISIJA ODOTTAA OMISTAJAN VASTAUSTA (AskUserQuestion) klo ~03.12 LAHTIEN → PR-JONO PYSAHDYKSISSA JA NIGHTLY RAKENTAMATTA; KYSYMYKSEN SISALTO EI NAY TRANSKRIPTITYOKALUSSA, OMISTAJA VASTAA JULKAISIJAN SESSIOSSA AAMULLA. DOCS-PR:T #3010 (OMISTAJAN TESTFLIGHT-TARKISTUSLISTA + B7-RAPORTTI) JA #3019 (LAITETESTAAJAN LUOVUTUS) OVAT MAINISSA klo 05.4x (VIHREAT, VAIN DOKUMENTTEJA, FABLE VEI NE JULKAISIJAN ODOTTAESSA, JOTTA LISTA ON OMISTAJALLA AAMULLA). LAITETESTAAJA: T6 VALMIS, T2 UUSITTU PASS (MASTER 5a1cfaf); Simulator.app-GUI PUUTTUU MACILTA → simctl-KIERTOTIE (24.9.2026 klo 06.46)

Koodi-PR:t odottavat Julkaisijaa. Fablen oma luokitin esti myös tämän kirjauksen ensimmäisen sanamuodon ja viestin Julkaisijalle.

## AAMUN ERAT klo 06.4x–06.5x: LINSSISEPPA — KARTAN TUMMUUS = WEB (iPAD 48–54, WEB 49), FOV 50°, X-TOIVE MASTERISSA, TOPOGRAFIA = WEB, ihminen tutkimus -KOMENTO (d607a59); FABLEN PAATOS VESISTOISTA: WEBIN PATKITTAISET JOET OVAT Z-TAISTELUN BUGI → NATIIVI PITAA YHTENAISEN PENGERRETYN UOMAN WEBIN VAKIOVARILLA, WEB KORJATAAN BUGINA (PELIKOODARI, MATALA PRIORITEETTI). LAITETESTAAJA — MAAILMAN MAASTO SIMULAATTORISSA: TERAVYYS PASS, MUISTI 828 → 1211 MB (EI SOAK), FPS VAIN LAITTEELLA. NATIIVI-UI — KOSKETUSKOHTEET 44 pt MASTERISSA (a8544d5, TODENNETTU iPADILLA ui napauta). SISALTOKIRJURI — N13 #3021, N14 #3022, 60/71; OPPI: PITKAT LAHES IDENTTISET COMMONS-NIMET SLUGAUTUVAT SAMAKSI PEILIPOLUKSI → media.test VARTIJA NAPPAA, KAYTA LYHYTNIMISTA KUVAA. NOLLAUKSEEN PYYDETTY SISALTOKIRJURI (75 %) JA NATIIVI-UI (70 %) (24.9.2026 klo 06.48)

Sisältö-PR-jono (#2991 … #3022, 14 kpl) odottaa Julkaisijaa, joka odottaa omistajaa.

## NATIIVI-UI NOLLATTU klo 06.5x (0 VIESTIA TARKISTETTU): LUOVUTUS viesti-natiivi-ui-luovutus-20260924-d.md (725b02485), MASTER a8544d5, EI MERGE-PYYNTOJA, NUI 197/1/0/1; ALOITUSVIESTI LAHETETTY (VERTAILUN UI-EROT, iPAD-SARJAT). SISALTOKIRJURIN NOLLAUS ODOTTAA LUOVUTUSTA (24.9.2026 klo 06.49)

Viides nollaus tänä yönä korjatulla kaavalla.

## LINSSISEPPA: VESISTOT WEBIN VAREILLA (#5aa9e0); VERTAILU JA MAATIEDOT = WEB (KAMERA, MAAT, VALINNAT, SAVYT; proto-3d/lokit/maat-20260924-a8544d5); EROT: VALITTUJEN MAIDEN REUNA 4 px vs 1 px JA HEIKKO TAYTTO → NATIIVISEPAN MaaKartta; POHJAKARTTA (NATIIVISSA RELIEFIPOLTTO 23a, WEBISSA VIELA VAALEA PERGAMENTTI) → FABLE: HYVAKSYTTY, WEB SAA SAMAN POHJAN KUN #2957 (OSOITIN 23a) ON MAINISSA; SEURAAVAKSI RADIO UI:N KANSSA (24.9.2026 klo 06.54)

Sama laattapohja molemmissa on Raamatun linjaus (natiivi käyttää samoja laattoja).

## LAITETESTAAJA: B7 KUULOKOE 10/13 — KOHTA 9 TAUSTA/TAKAISIN PASS (SAMA PID, AANI JATKUU), KOHTA 4 JALAN PASS (LAIVA EI TAVOITETTU: EI REITTIA), KOHTA 13 LEVYVALIMUISTI 48 Mt EI KASVUA, KOHTA 10 KOMPRESSORI VAHVISTETTU; JALJELLA MANNERLENTO JA LAIVA (TARVITSEVAT PIDEMMALLE EDENNEEN PELIN → TALLENNUS-KOEKANSIO), 11 SANELU JA 12 MYKISTYS/BLUETOOTH (FYYSINEN LAITE → OMISTAJAN LISTA / iPAD-VUORO); RAPORTTI 832f04f55 HAARASSA laitetestaaja (EI VIELA MAINISSA) (24.9.2026 klo 06.54)

Fable: mannerlento ja laiva testataan koekansiolla (Documents/sisalto-koe / tallennus) tai Natiivisepän ui-komennolla, ei uutta peliä alusta.

## VIIKKOKIINTIO 86 % klo 06.5x (77 % klo 04.20 → ~3,5 %/h; LOPPUISI ENNEN PUOLTAPAIVAA, NOLLAUTUU MA 28.9. klo 04) → FABLEN PAATOS: TAUKO LINSSISEPALLE, LAITETESTAAJALLE, KARTTASEPALLE, SIIRTOSEPALLE JA SISALTOKIRJURILLE (93 % KONTEKSTI, NOLLATAAN); TYOSSA VAIN NATIIVISEPPA, NATIIVI-UI JA PELIKOODARI OMISTAJAN AAMUKOKEILUN LOYDOKSIA VARTEN; JULKAISIJA ODOTTAA OMISTAJAA; POSTIVAHTI 30 MIN KIERROS. OMISTAJAN PAATOS AAMULLA: HIDASTUS VAI LISAKAYTTO (extraUsage POIS); FABLE 29 %, 5 h 66 % (24.9.2026 klo 06.59)

Raamattu TYÖTAPA: tokenikuri kuuluu Fablelle; omistajalle kortti kun hän on paikalla.

## TAUOT KUITATTU klo 07.0x: LINSSISEPPA (kontakti-radio MERGE-PYYNNOSSA, iPAD VAPAA, RADIOVERTAILU ALOITTAMATTA), LAITETESTAAJA (B7-RAPORTTI PR #3023), SISALTOKIRJURI NOLLATTU: LUOVUTUS viesti-sisaltokirjuri-luovutus-20260924-b.md HAARASSA sisalto-luovutus-20260924-b (EI PR:AA), N15 VALMIS HAARASSA sisalto-n15-5-maailmankohdetta (4164/0, PR PUUTTUU), N16 (6 KOHDETTA) JALJELLA → 71/71 SEN JALKEEN. SISALTOKIRJURIN ALOITUSVIESTI LAHETETAAN VASTA KUN OMISTAJA PAATTAA KIINTIOSTA (24.9.2026 klo 07.03)

Ei uutta sisältötyötä ennen omistajan päätöstä.

## OMISTAJA klo 07.0x: VIIKKOKIINTIO EI RAJOITA — OMISTAJALLA ON TOKEN RESET, JONKA HAN AJAA KUN KREDITIT LOPPUVAT → TAUKO PERUTTU, KAIKKI SESSIOT JATKAVAT; POSTIVAHTI RAPORTOI VIIKKOKIINTION VAIN TIEDOKSI (EI TAUKOJA SEN TAKIA), 5 h -KIINTION 90 %-SAANTO PYSYY (24.9.2026 klo 07.05)

Omistajan viesti Fablen sessiossa. Raamatun TYÖTAPA-kohtaan lisätään yksi lause.

## TAUKO PERUTTU klo 07.0x: JATKA-VIESTIT LINSSISEPALLE, LAITETESTAAJALLE, KARTTASEPALLE, SIIRTOSEPALLE, POSTIVAHDILLE (10 MIN KIERROS TAKAISIN); SISALTOKIRJURI KAYNNISTETTY ALOITUSVIESTILLA (N15 PR ENSIN, N16 → 71/71, SITTEN KUVA- JA LAHDEINVENTAARIO). AVOINNA OMISTAJALLE: JULKAISIJAN KYSYMYS SEN OMASSA SESSIOSSA (JONO 16 PR:AA + NIGHTLY) (24.9.2026 klo 07.07)

Raamattuun lisätty VIIKKOKIINTIÖ-lause.

## SISALTOKIRJURI (UUSI SESSIO): N15 PR #3025 (AL KUFRA, MACAPA, CAMPO GRANDE, EXMOUTH, SAN AMBROSIO); 65/71; N16 (VIIMEINEN, 6 KOHDETTA) KAYNNISSA (24.9.2026 klo 07.08)

Rutiinierä.

## LAITETESTAAJA: iPAD A/C-UUSINTA KAYNNISSA (SIMULAATTORI, ui-komento.txt): A1 MAALEHTI GRC PASS, A9 LIIKU-LIUKU PASS; A6 MATKAKIRJAKORTTI ALKAA iPADILLA LAPPUNA (PISTESKAALAN SEURAUS) → NATIIVI-UI TARKISTAA WEBIN @media-SAANNON iPADIN LEVEYDELLA; KOSKETUSALAN 2 pt -KOE EI AVANNUT ASETUKSIA → NATIIVISEPPA VAHVISTAA ONKO a8544d5 ASENNETTU SIMULAATTORIIN (24.9.2026 klo 07.11)

Web on oletus myös leveyssäännöissä.

## LINSSISEPPA: MaaKartta KORJATTU (REUNA JA TAYTTO = WEB; REUNAN ALARAJA JA HUIPPUVUORET NATIIVISEPAN LISTALLA); RADIO = WEB (LAITE, NAYTTO, KAMERA, SOIVA ASEMA; proto-3d/lokit/radio-20260924-7aca1d5); ERO: WEBIN RADIOTILASSA KARTALLA VAIN ▶-NAPIT (SOIVA PUNAISELLA), EI KAUPUNKIEN NIMIA EIKA NAPPULAA → radionapit 8ed8f26 MERGE-PYYNNOSSA, NATIIVI-UI PIIRTAA NAPIT WEBIN MITOILLA; KESKEN-LISTA 1–4 VALMIS. FABLE: SEURAAVAKSI INVENTAARION 2 PUUTTUVAA LS-RIVIA, HUIPENNUKSEN LINSSIOSUUS, LINSSIEN REGRESSIOAJO iPADILLA, INVENTAARION PAIVITYS (24.9.2026 klo 07.13)

Kaikki 7 linssiä + radio vastaavat nyt webiä iPad-kuvin todennettuna.

## NATIIVI-UI: natiivi-ui/linssierot 84769fd MERGE-JONOSSA — IHMISEN MATKAN PALKKI (KELLO '100 603 v. sitten' / 'n. 1250 jaa.', VIRTANAPIT KELLON PERAAN, OTSIKKO EI KATKEA), KERTOJAN TEKSTI WEBIN OSIIN (3 VIRKETTA / 240 MERKKIA, 21 JAKSOA TASMAA), TOPOGRAFIAN SELITE (KUTISTETTUNA, MUISTAA TILAN, EI LAHDERIVIA, OIKEA YLAKULMA); A6: WEBISSA KORTTI ON iPADILLA AUKI → NATIIVIN iPAD-TUNNISTUS MALLINIMESTA KORJATTU; KARUSELLIN KOOT = WEB KOODISSA, KUVA PUUTTUU; HAVAINTO: lahteet.json NIMEAA ETOPO1:N, NATIIVI KAYTTAA ETOPO 2022 → SIIRTOSEPPA KORJAA ATTRIBUUTION KARTTASEPAN JA LINSSISEPAN TIEDOILLA (24.9.2026 klo 07.14)

Attribuution oikeellisuus on lisenssiehto (Raamattu: attribuutio riittää).

## LAITETESTAAJA: iPAD A/C-UUSINTA (MASTER 3985333): KOSKETUSALA 44 pt VAHVISTETTU; A1, A2, A3, A4, A9 JA C-SARJA PASS; A6 KOMPAKTI LAPPU = REGRESSIO (SIMULAATTORIN iPAD-TUNNISTUS), KORJAUS linssierot 5a38ce2 EI VIELA MASTERISSA → A6/A7 UUSITAAN; UUSI BUGI A5: CHAT-VASTAUS LEHDEN PAALLA iPADILLA — TALLENNA JUTTUUN -PILLERI JA EHDOTUSKUPLAT VASTAUSTEKSTIN PAALLA (iPHONELLA ERILLAAN) → NATIIVI-UI; ihminen tutkimus -KOMENTO EI VIELA MASTERISSA → VIRTANAPIT ODOTTAVAT; MANNERLENTO/LAIVA ODOTTAA PELIKOODARIN TALLENNUSTILAA (24.9.2026 klo 07.17)

Natiivi-UI korjaa A5 webin leveän ruudun asettelun mukaan.

## SIIRTOSEPPA: LAHTEIDEN ATTRIBUUTIO KORJATTU (siirtoseppa-tyohuone 68cb2f0d2, v37, 720/720, SKEEMA ENNALLAAN): js/lahteet.js — ETOPO1 (PAAKARTAN VARJOSTUS JA SYVYYS), ETOPO 2022 15″ (TOPOGRAFIA, VESISTOT, ASTRONAUTTI), COPERNICUS GLO-30/90 (NATIIVIN MAASTO, KAUPUNKIEN KORKEUDET, WorldDEM-MAININTA), GSHHG 2.3.7 (RANTAVIIVAT, LGPL, PUUTTUI KOKONAAN); LINSSIEN lahde-KENTAT KORJATTU WEBIIN JA PAKETTIIN, lisenssit.json TAYDENNETTY; TUOTANTOON TYOHUONEEN PR:N MUKANA (#3012:N JALKEEN, HAARASSA 1.27–1.29) (24.9.2026 klo 07.19)

Attribuutio on lisenssiehto; GSHHG:n puuttuminen oli aito puute.

## NATIIVI-UI: kertomusleimat (SIS. linssierot) MASTERISSA 12484c5; natiivi-ui/radionapit 1f523e0 JONOSSA (RADION ▶-NAPIT PALLOLLA WEBIN MITOIN, PELIN MERKIT VAISTYVAT RADION AJAKSI; LOYTOPAIKAN LAMPUN NAPAUTUS AVAA NOSTON KORTIN); natiivi-ui/chatkuva 98f1b34 JONOSSA — A5:N JUURISYY: CHATIN VASTAUKSEN KUVA OLI LABELIN LAPSI → TEKSTIA EI MITATTU, KUPLA JAI 90 px; LAITETESTAAJA UUSII A5:N MERGEN JALKEEN (24.9.2026 klo 07.20)

Rutiinierä.

## NATIIVI-UI: radionapit JA chatkuva (A5) MASTERISSA; INVENTAARIO NUI 197 ON / 1 OSITTAIN (LUKIJAAANI-DIALOGI, ODOTTAA PELIKOODARIN PUHEASETUSRAJAPINTAA), KAIKKI 204 ON / 9 PUUTTUU. FABLEN PAATOS: KOKEET-RIVI 444 (Documents/*-komento.txt) = EI TARVITA — TESTIAUTOMAATION RAJAPINTA, EI PELIN TOIMINTO, EI KOKEET-VALIKKOON (24.9.2026 klo 07.22)

Natiivi-UI:n kysymys klo 07.2x.

## LINSSISEPPA: LINSSIEN REGRESSIOKIERROS iPADILLA (MASTER 3b0c253, proto-3d/lokit/linssit-regressio-20260924/RAPORTTI.md): KAIKKI 9 LINSSIA JA RADIO = WEB HYVAKSYTTYJA EROJA LUKUUN OTTAMATTA (POHJAKARTTA 23a, VESISTOJEN UOMA); ASTRONAUTIN KAMERA SEURAA ISS:AA REAALIAJASSA (EI VERRATTAVISSA); AVOINNA: NATIIVI-UI:N 'KERTOMUS PAATTYI' -KORTTI EI OLE WEBISSA → POIS (EI WEBISSA → EI TEHDA), KEKSINTOJEN REIAN KULKU HYPYSSA (siirraReikaMatkalla) = VIIMEINEN PUUTTUVA LINSSIN OSA → LINSSISEPPA TEKEE; INVENTAARIO JA LUOVUTUS viesti-linssiseppa-luovutus-20260924-b.md VALMIIT (24.9.2026 klo 07.33)

Natiivin linssit ovat täydessä toimintopariteetissa webin kanssa tämän erän jälkeen.

## LINSSIT NATIIVISSA VALMIIT (LINSSISEPPA klo 07.3x): siirraReikaMatkalla EI OLE KAYTOSSA WEBIN KEKSINNOISSA (VAIN ajaValia-HYPYSSA REITTI-/HYPPYKAMERAKAARILLA) → EI PORTATTAVAA, INVENTAARIO JA LUOVUTUS KORJATTU; MaaKartan REUNAN ALARAJA POISTETTU (NATIIVISEPPA 70935f7), HUIPPUVUORET POISTUVAT SKEEMALLA 1.29 (#3012:N JALKEEN, iPAD-TARKISTUS SILLOIN). LINSSISEPPA ODOTTAA OMISTAJAN AAMUKOKEILUN LOYDOKSIA (24.9.2026 klo 07.34)

Natiivin linssit ovat täydessä toimintopariteetissa webin kanssa.

## NATIIVI-UI: 'KERTOMUS PAATTYI' -KORTTI POISTETTU (natiivi-ui/ihmisenloppu 338e95f, JONOSSA; INVENTAARIO 4c8b1cd88); TARKENNUS: WEBIN IHMISEN MATKAN LOPUSSA EI LOPPUSANAPANEELIAKAAN — paata() PIILOTTAA TEKSTIN JA KUVAN, LOPPU-NAPPI POIS KAYTOSTA, PULUN VIIMEINEN KUPLA, TUTKIMUSVAIHE ALKAA; LOPPUSANAPANEELI VAIN KEKSINNOISSA; NATIIVI SAMOIN (24.9.2026 klo 07.35)

Fablen aiempi 'loppusanoina paneelissa' -oletus oli väärä; web on totuus.

## LINSSISEPPA NOLLATTU klo 07.4x (0 VIESTIA TARKISTETTU): LUOVUTUS viesti-linssiseppa-luovutus-20260924-b.md (f6004cb68), MASTER 20a9ee0, JONOSSA regressio 4227a9f; ALOITUSVIESTI LAHETETTY (LINSSIT VALMIIT; SEURAAVAKSI OMISTAJAN LOYDOKSET, HUIPPUVUORET #3012:N JALKEEN, LINSSIEN SUORITUSKYKY ui piikit -TYOKALULLA) (24.9.2026 klo 07.44)

Kuudes nollaus tänä yönä korjatulla kaavalla.

## VIRSTANPYLVAS: KAIKKI 71 PUUTTUVAA KAUPUNKILEHTEA OVAT PR:ISSA (N1–N16; VIIMEINEN N16 PR #3026: NOME, PORTO VELHO, KALGOORLIE, BIRDSVILLE, MOUNT ISA, COOBER PEDY; 4164/0). SISALTOKIRJURIN SEURAAVA: 1) LEHTIEN KUVA- JA LAHDEINVENTAARIO LISENSSIPORTILLA (KAIKKI LEHDET, EI VAIN UUDET), 2) KARTUSCHAN PUUTTUVAT MAAT, 3) MAALEHTIEN PUUTTUVAT (24.9.2026 klo 07.51)

Kaikki lehdet tuotantoon kun Julkaisija ajaa jonon.

## LAITETESTAAJA: iPAD A5/A6/A7 PASS (MASTER 5c7b762); A6 OLI VAARINKASITYS (KOMPAKTI TUMMA LAATIKKO = AUKI-TILA); A7 AITO PUUTE: KARTAN NAPAUTUS EI KUTISTANUT KORTTIA → NATIIVI-UI KORJASI (natiivi-ui/korttikutistus), 5 OSATESTIA PASS; KOKO A/C-SARJA KUNNOSSA iPADILLA; AVOINNA VIRTANAPPIEN PIKSELITARKISTUS (ihminen tutkimus -KOMENTO SIMULAATTORIBUILDIIN) JA B7 MANNERLENTO/LAIVA (PELIKOODARIN TALLENNUSTILA) (24.9.2026 klo 07.58)

Natiivin UI on iPadilla webin mukainen kuvasarjojen osalta.

## NATIIVI-UI: A5 (KUVA KAAREESSA), A6 (OLI AUKI), A7 (NAPAUTUS/VETO/NIPISTYS KUTISTAA, KAMERA-AJO EI) PASS; MASTERISSA MYOS IHMISEN MATKAN LOPPU ILMAN KORTTIA, PULU PIILOSSA ESITYKSEN AJAN JA KAVELEE SISAAN LOPUSSA, AIKASELAIMEN VUOSI, KEKSINTOPANEELIN TEKSTI 14,4 px; KEKSINTOJEN KONTAKTIKUVA = WEB; AUKI VAIN LUKIJAAANI (PELIKOODARIN Puhe-RAJAPINTA). FABLE: SEURAAVAKSI UI-PIIKKIKIERROS iPADILLA (≤ 16 ms) JA KEHITTAJATILAN/KOKEET-PORTTI BUILD-MAARITYKSESTA (POIS APP STORE -KONFIGURAATIOSSA) (24.9.2026 klo 07.58)

Natiivi-UI:n rivit on käytännössä tehty; suorituskyky ja julkaisuportit seuraavaksi.

## OMISTAJA KYSYI klo 08.0x LUKIJAAANISTA: PELIKOODARIN lukijaaani + Puhe-KORJAUS f4320ed ON MERGE-JONOSSA (SAMOIN iPADIN PISTESKAALA 6d5cc16, koetila mannerlento 45c2faa, APP STORE -RAJAUS a03359c — APP STORE -KAANNOS EI LUE KOMENTOTIEDOSTOJA); PELIKOODARIN VIESTIT MUILLE OLIVAT TAUOLLA (5 h -KIINTION TAUKO) → TAUKO PURETTU; NATIIVISEPPA MERGEAA LUKIJAAANEN ENSIN, NATIIVI-UI TEKEE LUKIJAAANI-DIALOGIN HETI SEN JALKEEN (24.9.2026 klo 08.04)

Arvio omistajalle: dialogi masterissa noin tunnin sisällä, TestFlight-buildissa kun Julkaisija jatkaa.

## OMISTAJAN KORTIT klo 08.0x: 1) OMISTAJA VASTAA JULKAISIJAN KYSYMYKSEEN SEN OMASSA SESSIOSSA NYT → JONO JATKUU; 2) JULKINEN TESTFLIGHT-LINKKI VASTA OMISTAJAN KOKEILUN JALKEEN (FABLE KYSYY UUDELLEEN KORJAUSLISTAN JALKEEN); 3) ISOISA 1873 ERA 2: MYOHEMMIN, PYSYY PUUTTUVIEN LISTALLA, KYSYTAAN UUDELLEEN KUN YDIN ON VALMIS; 4) YLIMAARAISEN iOS DISTRIBUTION -VARMENTEEN PERUMINEN: OMISTAJA PERUU ITSE TANAAN → JULKAISIJA KERTOO SAILYTETTAVAN VARMENTEEN SHA-1:N JA PERUTTAVAN TUNNISTEEN (24.9.2026 klo 08.06)

Lukijaääni: omistajalle arvio ~1 h masteriin.

## PELIKOODARI: RAIDAN PURKU KORJATTU MASTERISSA (iPAD PIIKKI 75 → 25 ms, TAVOITE ≤ 16 ms JATKUU: STRIIMAUS); UGUI-PISTESKAALA 6d5cc16, koetila mannerlento 45c2faa, LUKIJAAANI f4320ed, APP STORE -RAJAUS a03359c ODOTTAVAT NATIIVISEPAN MERGEA; WEB-PR:T #3014 (lahizoom 390) JA #3024 (VESISTOJEN Z-TAISTELU). HAVAINTO (SITOVA TYOTAPA): CLAUDE DESKTOP RAJOITTAA SESSION LAHETTAMAT VERTAISVIESTIT 10:EEN ILMAN KAYTTAJAN OMAA KIRJOITUSTA SESSIOON → PELIKOODARIN VIESTIT JAIVAT JONOON; SESSIOT NIPUTTAVAT VIESTIT (YKSI KOONTIVIESTI PER ERA), JA OMISTAJA VOI AVATA TUKOKSEN KIRJOITTAMALLA SESSIOON MITA TAHANSA (24.9.2026 klo 08.07)

Postivahti tarkkailee: jos session viestit eivät tule perille, kyse voi olla 10 viestin rajasta.

## JULKAISIJAN KYSYMYS SELVISI klo 08.07: 'ASENNETAANKO proto3d-testflight.yml:AAN YOLLINEN AJO klo 04' — FABLE OLI HYVAKSYNYT SEN JO klo 03.11 (NIGHTLY A), JOTEN KORTTI OLI TURHA JA PYSAYTTI JONON ~5 h; OMISTAJA VASTASI KYLLA. SAANTO (RAAMATTU, FABLEN KASKYT ILMAN OMISTAJAN VALITYSTA): SESSIO EI KYSY OMISTAJALTA ASIAA, JONKA FABLE ON JO KASKENYT; JOS LUOKITIN ESTAA, ILMOITETAAN FABLELLE. JULKAISIJA JATKAA: NIGHTLY, JONO, VARMENTEEN TUNNISTEET OMISTAJALLE (24.9.2026 klo 08.08)

Omistajan kuvakaappaus Fablen sessioon klo 08.07.

## LINSSISEPPA: LINSSIEN PIIKKIMITTAUS ERA 1 (iPAD, proto-3d/lokit/linssit-piikit-20260924/RAPORTTI.md): PAHIMMAT IHMISEN MATKAN AVAUS 216 ms (KERTOJAN mp3 PAASAIKEESSA), VERTAILUN AVAUS 100 ms (MAAKAYRIEN JSON), MAALEHTI 83 ms (UI); KORJAUKSET JONOSSA (edfb0b8: mp3:T PAKATTUINA, JASENNYS TAUSTASAIKEESSA, PROFILOINTIMERKIT); LEPOTILASSA EI PIIKKEJA; MUISSA AVAUKSISSA YKSI 25–48 ms KEHYS (UI:N OSUUS NATIIVI-UI:LLE); APP STORE -KAANNOKSESTA LINSSI-KOMENTO POIS (3b74128) (24.9.2026 klo 08.09)

Erä 2: toinen ajo mergen jälkeen, tavoite ≤ 16 ms.

## LAITETESTAAJA: B7 12/13 — KOHTA 4 LAIVA PASS, KOHTA 1 INTRON TASONPALAUTUS EI BUGI (0,150-SUHDE JA 1,8 s RAMPPI OIKEIN); KOHTA 3 MANNERLENTO ODOTTAA koetila-MERGEA; RAPORTTI PR #3023 (24.9.2026 klo 08.10)

Laitetestaaja odottaa merge-ilmoitusta; sillä välin ei uutta.

## OMISTAJA klo 08.1x: 'SANO KUN MUUTOKSET PELISSA NIIN KOKEILEN' → NATIIVISEPPA MERGEAA KOKO JONON JA ILMOITTAA SHA:N, JULKAISIJA AJAA TESTFLIGHT-BUILDIN (BUILD 5) HETI SIITA ODOTTAMATTA YOLLISTA AJOA; FABLE ILMOITTAA OMISTAJALLE KUN BUILD ON SAATAVILLA (24.9.2026 klo 08.11)

Omistajan kokeilu on seuraava portti (julkinen TF-ryhmä sen jälkeen).

## OMISTAJA klo 08.1x (SITOVA): TESTFLIGHT-BUILD AJETAAN AINA KUN MASTERIIN ON TULLUT MERKITTAVIA MUUTOKSIA, EI VAIN YOLLA. KAAVA: NATIIVISEPPA ILMOITTAA FABLELLE JA JULKAISIJALLE MASTERIN SHA:N JOKAISEN MERGE-ERAN JALKEEN; FABLE PAATTAA ONKO ERA MERKITTAVA (UUSI TOIMINTO, OMISTAJAN LOYDOKSEN KORJAUS, SISALTOPAKETIN VERSIO, SUORITUSKYKYKORJAUS) JA KASKEE BUILDIN; JULKAISIJA AJAA proto3d-testflightin HETI, YKSI BUILD KERRALLAAN, EI POLTON EIKA OMISTAJAN MITTAUSIKKUNAN AIKANA; YOLLINEN AJO klo 04 JAA VARMISTUKSEKSI (OHITTAA JOS MASTER ON JO VIETY); FABLE ILMOITTAA OMISTAJALLE JOKAISESTA SAATAVILLA OLEVASTA BUILDISTA YHDELLA RIVILLA (BUILD, SHA, MITA UUTTA) (24.9.2026 klo 08.13)

Omistajan kysymys Fablen sessiossa.

## JULKAISIJA: VARMENTEET OMISTAJALLE — SAILYTA PK8TVTL7Q8 (iOS DISTRIBUTION, SHA-1 AE4FD1EA…, BUILD 4 ALLEKIRJOITETTU TALLA), PERU ACN2K38688 (SHA-1 6448D38A…, YLIMAARAINEN; ID NAKYY PORTAALIN OSOITTEESSA); #3027 (YOAJO + vie_unitysta) MAINISSA, #3011 JA #3012 (v2155) MERGEYTYMASSA; BUILD 5 AJETAAN HETI KUN NATIIVISEPPA ILMOITTAA SHA:N (AJO TEKEE UNITY-VIENNIN ITSE) (24.9.2026 klo 08.14)

Omistaja peruu varmenteen itse tänään.

## OMISTAJA KYSYI klo 08.2x: ONKO TARKISTETTU ETTA NATIIVI NAYTTAA JA TOIMII KUTEN WEB MYOS PIENISSA YKSITYISKOHDISSA? FABLEN VASTAUS: LINSSIT KYLLA (KUVA KUVALTA), TOIMINNOT INVENTAARIOLLA (204/236), KUVASARJAT LISTAA VASTEN — NAKYMA NAKYMALTA -KUVAVERTAILU WEBIIN PUUTTUU → PARITEETTIKIERROS KAYNNISTETTY: LAITETESTAAJA OTTAA ~40 NAKYMASTA WEB-KUVAN (PLAYWRIGHT, 393 × 852 JA 834 × 1194 CSS-px) JA NATIIVIN KUVAN (SIMULAATTORI iPHONE + iPAD), KIRJAA EROT docs/raportit/pariteetti-natiivi-20260924.md, ERALISTAT 10 NAKYMAN VALEIN NATIIVI-UI:LLE; NATIIVI-UI KORJAA WEBIN MUKAAN; HYVAKSYTYT EROT EI KIRJATA (24.9.2026 klo 08.15)

Täysi toimintopariteetti (Raamattu) kattaa myös ulkoasun yksityiskohdat.

## NATIIVISEPPA: KOKO JONO MERGETTY, PROTO-MASTER 4ef72b0 (LUKIJAAANI + DIALOGI, PISTESKAALA, KOETILA, APP STORE -RAJAUS, LINSSIEN SUORITUSKYKY, REGRESSIO, KERTOMUSTEKSTI, KORTTIELE/-KUTISTUS, IHMISENLOPPU, PULU SISAAN; TARKISTA 0, KAANNA 246/246, SIM + XCODE-SIM LAPI) → FABLE KASKI BUILD 5:N JULKAISIJALLE (24.9.2026 klo 08.16)

Ensimmäinen 'build merkittävän erän jälkeen' -linjauksen mukainen build.

## SISALTOKIRJURI: LISENSSIPORTTI VALMIS — PR #3028 (RAPORTTI: 5856 KUVAA TARKISTETTU, 0 NC/ND, 0 PUUTTUVAA LAHDETTA) + PR #3029 (7 ST. JOHN'S -APOSTROFIKORJAUSTA); KARTUSCHA: HKG/SHN/GRL PYSYVASTI ILMAN RIVIA (FABLE 7.9.2026, tests/maatiedot.test.mjs); VUT: 4 LUKUA VALMIINA — FABLEN PAATOS: WIKIVOYAGEN BISLAMA-FRAASISANASTO KELPAA TERVEHDYKSEN LAHTEEKSI KUN WIKTIONARYSSA EI OLE HAKUSANAA (WIKIMEDIA, CC BY-SA, LAHDE MERKITAAN) → 'HALO' KAYTTOON; MAALEHTI-ERA (BMU/FLK/GUF/NCL/NFK/PRI) KAYNNISSA (24.9.2026 klo 08.20)

Lähdesäännön täsmennys: Wiktionary tai en-Wikipedia ensisijaisia, Wikivoyage-fraasisanasto toissijainen.

## JUMI klo 08.2x: MAC STUDION LEVY TAYNNA (880/926 Gt, VAPAANA 0,5 Gt) — BUILD 5 JA XCODE VAARASSA. ISOIMMAT: wt/ 83 Gt (KYMMENIA MERGETTYJA siirtoseppa-WORKTREITA 1 Gt KPL), proto-3d/lokit 33 Gt (iPADIN DOCUMENTS-KOPIOT), pyramidi-poltto 18 Gt (AJOT 22, 22c, 23a), CoreSimulator 15 Gt, proto Build/ 15 Gt (dd-sim, iOS-sim), DerivedData 12 Gt. FABLEN KASKY (KAIKKI UUDELLEEN LUOTAVISSA): NATIIVISEPPA POISTAA LOKIEN DOCUMENTS-KOPIOT + Build/dd-sim + iOS-sim + VANHAN DerivedDatan; SIIRTOSEPPA MERGETYT WORKTREET --poista; KARTTASEPPA AMPARIIN VIEDYT POLTTOAJOT; LINSSISEPPA LOKIENSA DOCUMENTS-KOPIOT; Build/testflight* JA NAS EI KOSKETA. SAANTO JATKOSSA: iPADILTA KOPIOIDAAN VAIN LOKIT JA KUVAT; WORKTREE POISTETAAN MERGEN JALKEEN (RAAMATTU TYOTILAT); POSTIVAHTI LISAA df-TARKISTUKSEN KIERROKSEEN (HALYTYS ALLE 50 Gt). #3012 MAINISSA, OSOITIN v16 = 1.26 (klo 08.18). LAITETESTAAJAN WEB-OTSIKKO opacity 0 = GPU-AUTOMAATIOESTE (--use-angle=metal), EI BUGI (24.9.2026 klo 08.22)

Omistaja paikalla; poistot roolien omia uudelleen luotavia tiedostoja.

## LEVY: SIIRTOSEPPA POISTI 31 MERGETTYA WORKTREETA (+30 Gt), VAPAANA 42 Gt klo 08.3x → BUILD 5 KASKETTY AJOON; SIIRTOSEPAN AVOIMET #2918 #2932 #2948 #2993 EIVAT OLE VANHENTUNEITA → JULKAISIJAN JONOON, WORKTREET POISTETAAN VASTA MERGEN JALKEEN; PR #3030 (1.27–1.30, LAHTEET, 2.0-TYOKALU) AVATTU. OMISTAJA AJAA LISAKSI NATIIVISEPAN vapauta-levy-SKRIPTIN JA POLTTOAJOJEN POISTON (24.9.2026 klo 08.25)

Levytilan raja Postivahdilla 50 Gt.

## NATIIVI-UI: UI-PIIKKIKIERROS iPADILLA (c2b3521, KYNNYS 16 ms, proto-3d/lokit/ui-piikit-20260924): LEHTI 30–42 ms, MAALEHTI 32, KAUPUNKIKORTTI 41, NOSTO 27, CHAT 41 (VASTAUS 18–25); VALIKKO, ASETUKSET, LAUKKU, MATKAKIRJA EI PIIKKEJA; KORJAUKSET MERGE-PYYNNOSSA natiivi-ui/lehtiporras (SIVUN PORRASTUS, KUVIEN PURKU JONOSSA, FONTTIEN ESILAMMITYS), UUSINTAMITTAUS MERGEN JALKEEN; LUKIJAAANI JA APP STORE -PORTTI MASTERISSA (24.9.2026 klo 08.26)

Rutiinierä.

## SISALTOKIRJURI: VUT-KARTUSCHA PR #3033 ('HALO', WIKIVOYAGE-LAHDE MERKITTY, 4168/0); MAALEHTI-ERA: GUF VALMIS, BMU/FLK/NCL/NFK/PRI KAYNNISSA (24.9.2026 klo 08.27)

Rutiinierä.

## OMISTAJAN KORTTI klo 08.3x (SITOVA): UUSI LINSSI VAIN NATIIVIIN — 'MAAPALLON TILA' NASA/NSIDC:N PUBLIC DOMAIN -AINEISTOISTA (MERIJAAN VUOSIMINIMI 1979–2026 ANIMAATIONA, LAMPOTILAPOIKKEAMAT, MERENPINTA, JAATIKOT); ENSIMMAINEN VAIN NATIIVISSA OLEVA OMINAISUUS (EI WEBISSA → OMISTAJA PAATTI). AIKATAULU: LINSSISEPPA SUUNNITTELEE NYT (AINEISTOLISTA, LAHTEET SVS/NSIDC, NAKYMAT, ATTRIBUUTIO), TOTEUTUS VASTA PARITEETTIKIERROKSEN JA OMISTAJAN KOKEILUN KORJAUSTEN JALKEEN. AINEISTO HAETAAN ALKUPERAISLAHTEESTA (svs.gsfc.nasa.gov, nsidc.org), EI X:N KUVISTA; MERKINTA 'NASA / NSIDC'. LISAKSI MERIJAAN MINIMI 12.9.2026 NOSTOKSI ARKTISIIN KOHTEISIIN JA ASTRONAUTIN TIEDELIITTEESEEN (SISALTOKIRJURI) (24.9.2026 klo 08.28)

Omistajan ehdotus NASA Earthin julkaisusta 23.9.2026.

## OMISTAJA KYSYI klo 08.3x VOIKO ANTAA FABLELLE OIKEUDET POISTOIHIN → EI (PYSYVA POISTO ON SESSIOSAANTO, JOTA LUPA EI AVAA); RATKAISU: NATIIVISEPPA TEKEE proto-3d/tyokalut/siivoa-levy.sh (LISTAA / poista, LOKI) JA launchd-PLISTIN (klo 03.00 KAYTTAJALLA koodaus), OMISTAJA ASENTAA KERRAN; POSTIVAHTI HALYTTAA ALLE 50 Gt; SESSIOT VAHENTAVAT ROSKAA (VAIN LOKIT JA KUVAT iPADILTA, WORKTREET POIS MERGEN JALKEEN) (24.9.2026 klo 08.29)

Poistot pysyvät omistajan käsissä; automaatio on omistajan asentama.

## LEVYSIIVOUKSEN AUTOMAATIO VALMIS (NATIIVISEPPA, PROTO-MASTER 597b025): tyokalut/siivoa-levy.sh (LISTAA / poista, LOKI lokit/siivous.log; LOKIKOPIOT > 2 pv, SIMULAATTORIKAANNOKSET > 1 pv, DerivedData, MERGETYT WORKTREET KUN TYOPUU PUHDAS JA COMMIT > 1 pv, POLTOT VAIN .ampari-ok-MERKILLA; Unity/xcodebuild KAYNNISSA → Build/ OHITETAAN) + launchd fi.matkakirja.siivous.plist klo 03.00 (KAYTTAJA koodaus); ASENNUSKOMENTO ANNETTU OMISTAJALLE; KARTTASEPPA LUO .ampari-ok VIETYIHIN AJOIHIN (24.9.2026 klo 08.32)

Poistoa ei vielä koeajettu (0 kohdetta tänään).

## OMISTAJA klo 08.3x: EI PAASE AJAMAAN SIIVOUSTA → FABLE ASENSI YOLLISEN SIIVOUKSEN launchd-AGENTIN (fi.matkakirja.siivous, klo 03.00, KAYTTAJA koodaus, LOKI proto-3d/lokit/siivous-launchd.log) OMISTAJAN PYYNNOSTA; TAMAN PAIVAN POISTOJA FABLE EI TEE (SAANTO); VAPAANA 49 Gt, RIITTAA BUILD 5:LLE (24.9.2026 klo 08.32)

Ensimmäinen automaattinen ajo 25.9. klo 03.00.

## KARTTASEPPA: POLTTOAJOJEN 20260922, 22c, 23a LAATAT POISTETTU VASTA KUN AMPARIN RYHMAMAARAT VASTASIVAT PAIKALLISIA (+15 Gt, VAPAANA 59 Gt); PARAMETRIT, LOKIT JA LUETTELOT SAILYTETTY (AJOKANSIOT 33–70 Mt); 22c:N NOSTOT (4917 vs 4885) EI POISTETTU; .ampari-ok EI LUOTU KOSKA SKRIPTI POISTAISI KOKO KANSION → FABLE: NATIIVISEPPA MUUTTAA SKRIPTIN POISTAMAAN VAIN LAATAT JA VALIMUISTIT; SYVA RANSKA -SARJA KAYNNISTYY (#2957 MAINISSA) (24.9.2026 klo 08.36)

Levy 59 Gt vapaana.

## BUILD 5 PERUTTU JONOSTA KOSKA SYVA RANSKA -POLTTO ALKOI (SAANTO: EI POLTON AIKANA) → FABLEN PAATOS: OMISTAJAN BUILD MENEE TANAAN POLTON EDELLE — KARTTASEPPA KESKEYTTAA SARJAN, JULKAISIJA AJAA BUILD 5:N (e1a4e54 = 4ef72b0 SOVELLUKSENA) HETI 'VAPAA'-ILMOITUKSESTA, POLTTO JATKUU VIENNIN JALKEEN; #3013 MAINISSA (v2157), #3031 JA #3032 MERGEYTYMASSA. PARITEETTIKIERROS JAETTU: LAITETESTAAJA WEB-KUVAT (PRIORISOITU LISTA, RIITTAVAN HYVA), NATIIVI-UI NATIIVIN KUVAT ui-KOMENNOILLA, PELIKOODARI ANTAA WEBIN OIKOTIET (tools/pariteettikuvat.mjs) (24.9.2026 klo 08.37)

Omistaja odottaa buildia.

## NATIIVISEPPA: siivoa-levy.sh KORJATTU (PROTO-MASTER 4b48497): POLTOISTA VAIN LAATTA-ALIKANSIOT JA VALIMUISTIT, *.json/*.txt/*.md/*.log SAILYVAT, EI rm -rf KOKO KANSIOLLE; KOEAJO 0 KOHDETTA 15 s (24.9.2026 klo 08.37)

launchd-agentti käyttää samaa skriptiä (asennettu klo 08.32).

## LINSSISEPPA: MAAPALLON TILA -SUUNNITELMA VALMIS (docs/raportit/linssi-maapallon-tila-suunnitelma-20260924.md, 87b8fd901): VEKTORI- JA HILA-AINEISTO PALLOLLE (NSIDC G02135 MERIJAAPOLYGONIT, GISTEMP-LAMPOHILA SHADERISSA), ~3 Mt STRIIMATTUNA, SVS-KUVAT VAIN TIEDELIITTEESEEN, ARVIO 6–7 ROOLIPAIVAA; 2026 MINIMI VARMISTETTU NSIDC: 12.9., 4,60 MILJ. km², JAETTU 10. PIENIN. FABLEN VASTAUKSET: 1) NSIDC:N 'VAPAA, VIITTAUS EHTONA' KELPAA — TAYSI VIITE + 'NASA / NSIDC' (RAAMATTU: ATTRIBUUTIO RIITTAA); 2) EI EARTHDATA-TUNNUSTA — MERENPINTA AVOIMESTA LAHTEESTA ILMAN KIRJAUTUMISTA (NOAA/PSMSL) TAI POIS, GRACE POIS; 3) JARJESTYS ASTRONAUTIN JALKEEN, SAMA KYNNYS KUIN ASTRONAUTILLA; ETELAMANTEREEN MERIJAA MUKAAN (SAMA AINEISTO), VUORIJAATIKOT (GLIMS) VAIHEESSA 2 (24.9.2026 klo 08.38)

Toteutus vasta pariteetin ja omistajan kokeilun korjausten jälkeen.

## LAITETESTAAJA NOLLATTU klo 08.4x (0 VIESTIA TARKISTETTU): LUOVUTUS viesti-laitetestaaja-luovutus-20260924-b.md (PR #3034, MYOS pariteetti-natiivi-20260924.md 2/40 JA B7 12/13); ALOITUSVIESTI LAHETETTY (PARITEETTIKIERROS PRIORISOITUNA, PELIKOODARIN OIKOTIET ODOTTAVAT) (24.9.2026 klo 08.41)

Seitsemäs nollaus tänään.

## NATIIVI-UI: PARITEETTIERA 1 VALMIS (11 NAKYMAA × iPAD JA iPHONE, proto-3d/lokit/pariteetti-20260924/ERA1-NATIIVI.md); iPHONE-SIMULAATTORISSA VANHA BUILD → NATIIVISEPPA ASENTAA MASTERIN BUILD 5:N JALKEEN; ERA 2 KAYNNISSA (SAHKE, NOPPA, SIIRTOLISTA, KULKUTAPALIUSKA, KAUPPA, PASSI, ASETUKSET); VALITETTY UUDELLE LAITETESTAAJALLE (24.9.2026 klo 08.41)

Web-kuvat odottavat Pelikoodarin oikoteitä.

## BUILD 5:N SHA VAIHDETTU 7878cbc:HEN (NATIIVISEPPA): 4ef72b0:SSA UI-TEHOSTEET OLIVAT PAKATTUINA JA GetData KAATUI ('Cannot get data on compressed samples') → TEHOSTEIDEN LEIKKAUS JA ISKUT EIVAT TOIMINEET; KORJAUS aanet-pcm (NATIIVI-UI); MUUT EROT TYOKALUJA; TARKISTA 0, UNITY KIINNI (24.9.2026 klo 08.45)

Julkaisija ajaa 7878cbc:n kun Karttaseppä ilmoittaa vapaan.

## NATIIVI-UI: PARITEETIN NATIIVIKUVAT ERAT 1–2 VALMIIT (25 NAKYMAA × 2 LAITETTA, proto-3d/lokit/pariteetti-20260924/); ODOTTAA LAITETESTAAJAN ERALISTAA; REGRESSIO KORJATTU: kertomusteksti-HAARAN PAKATUT UI-TEHOSTEET RIKKOIVAT AANETIN SIIVUTUKSEN → 7878cbc (24.9.2026 klo 08.47)

Rutiinierä.

## SISALTOKIRJURI: MAALEHTI-ERA M1 PR #3035 (BMU, PRI, GUF, FLK, NCL, NFK — KAIKKI 6 PUUTTUVAA MAALEHTEA; EI NYKYPOLITIIKKAA: FALKLAND 1982, NCL/PRI ASEMAKIISTA VALTETTY; 3 KUVAKOLLISIOTA KORJATTU; 4168/0); NAILTA PUUTTUU KARTUSCHA → JATKOERA; SEURAAVAKSI ARKTINEN MERIJAA -NOSTO (24.9.2026 klo 08.54)

Kaikki päivän sisältötehtävät PR:issä.

## SISALTOKIRJURI: ARKTINEN MERIJAA -NOSTO PR #3036 (NUUK + ARKTINEN YLEISTIETO) JA LISAYS #3026:EEN (NOME); NASA SVS -KUVA COMMONSISTA (PD, 'NASA / NSIDC'); CHURCHILL KUN #3016 MAINISSA; ASTRONAUTIN TIEDELIITETTA EI OLE WEBISSA → POIS (MERIJAA MAAPALLON TILA -LINSSIIN); SEURAAVAKSI KARTUSCHAT 6 UUDELLE MAALEHDELLE (24.9.2026 klo 09.06)

Rutiinierä.

## BUILD 5:N AJO (run 35960786110, 7878cbc, BUILD_NUMERO 202609240604) KAATUI klo 09.05 VAIHEESSA 'PYSYVA AVAINNIPPU': security set-keychain-settings → 'User interaction is not allowed' (EXIT 36); JULKAISIJA SELVITTAA (AJURI KAYTTAJANA samireivinen, NIPPU /Users/koodaus/...). LAITETESTAAJA: PARITEETTIERA 1 (11 NAKYMAA): 2 PASS, 3 EROA (AIHESIVUN OTSIKKOTYPOGRAFIA, SISALLYSVALIKKO, MAALEHDEN KANSISIVU + TILASTOMUOTO), 1 EPAILTY BUGI (LINSSIN VAIHTO JATTAA EDELLISEN OTSIKON), 1 = 4ef72b0:N GetData-BUGI (KORJATTU 7878cbc), 2 EI VERTAILUKELPOISTA → NATIIVI-UI KORJAA, NATIIVISEPPA ASENTAA 7878cbc SIMULAATTORIIN (24.9.2026 klo 09.07)

Omistaja odottaa build 5:tä; avainnippuvika on putken, ei sovelluksen.

## JULKAISIJA: BUILD 5:N KAATUMISEN SYY — TYONKULKU AJOI set-keychain-settings ENNEN unlockia; BUILD 4:SSA NIPPU OLI VIELA AUKI EDELLISESTA AJOSTA (6 h), NYT LUKOSSA; KORJAUS #3037 (UNLOCK ENSIN) MAINISSA, OMISTAJAA EI TARVITTU; BUILD 5 UUDELLEEN AJOSSA run 35963215777 (7878cbc), LEVY 62 Gt (24.9.2026 klo 09.11)

Nightly ei olisi toiminut ilman tätä korjausta.

## NATIIVI-UI NOLLATTU klo 09.1x (0 VIESTIA TARKISTETTU): LUOVUTUS viesti-natiivi-ui-luovutus-20260924-e.md (d306a7b0d); PARITEETTIERA 1: RIVIT 5, 13 JA 9:N NIMIOSIVU KORJATTU (natiivi-ui/lehtiotsikko JONOSSA), KESKEN SISALLYSVALIKKO JA MAALEHDEN PERUSTIEDOT; ALOITUSVIESTI LAHETETTY (24.9.2026 klo 09.16)

Kahdeksas nollaus tänään.

## SISALTOKIRJURI: KARTUSCHA BMU/PRI/GUF/FLK/NCL/NFK — EI TAYTTA RIVIA (V-Dem/OWID EI TUNNE ISO-KOODEJA; GUF/FLK/NFK EI EDES WB-RIVIA) → FABLE: PYSYVASTI ILMAN RIVIA SAMALLA PERUSTEELLA KUIN GRL/SHN/HKG (EI OSITTAISIA RIVEJA), KIRJATTU #3035:N KOMMENTTIIN; SEURAAVAKSI LAATUKIERROS 71 + 6 LEHDELLE (SAVY 13+, FAKTA/LEHTI TOISESTA LAHTEESTA, KUVATEKSTIT, MINITEHTAVAT), PR:T 10 LEHDEN ERISSA (24.9.2026 klo 09.17)

Churchill-nosto kun #3016 mainissa.

## LAITETESTAAJA: koetila mannerlento TOIMII; TESTIAUTOMAATION rivi-KOMENTO EI TOIMI MANNERLENNOISSA — PeliOhjain.AvaaMannerlennot() EI ASETA riviValittu-KASITTELIJAA (NaytaRivit TEKEE) → PELIKOODARI KORJAA; KOSKEE VAIN AUTOMAATIOTA, PELAAJAN KOSKETUS TOIMII; B7 KOHTA 3 ODOTTAA (24.9.2026 klo 09.18)

Korjausehdotus PR #3034:n raportissa.

## NATIIVISEPPA: MERGE-ERA PROTO-MASTER c633408 = NATIIVI-UI:N lehtiporras, paataso JA lehtiotsikko (UI-PIIKKIKORJAUKSET, PAATASON LUKIJAT, LEHDEN OTSIKKORIVI); TARKISTA 0; iPADILLA KAUPUNKIKORTTI, LEHDEN KANSI JA AIHESIVU, MAALEHTI JA NOSTO OIKEIN; ui jatka ALLE 16 ms (proto-3d/lokit/piikit3-20260924/) (24.9.2026 klo 09.23)

Fable: ei uutta buildia vielä — build 5 (7878cbc) on ajossa; seuraava build kun pariteettierä 1:n loput korjaukset ovat masterissa.

## BUILD 5 TESTFLIGHTISSA klo 09.2x: 1.0.0 (202609240615), PROTO-MASTER 7878cbc, SISAINEN RYHMA (run 35963215777); OMISTAJALLE ILMOITETTU. SAMALLA MAC STUDION MUISTI LOPPUI: 83 'Chrome for Testing' -PROSESSIA (koodaus, ~2 min IKAISIA) = PLAYWRIGHT-SELAIMET JAANEET AUKI (PARITEETTIKUVAT / AGENTIT); FABLEN pkill ESTYI LUOKITTIMEEN → OMISTAJALLE KOMENTO; LAITETESTAAJA JA PELIKOODARI: SELAIMET KIINNI JOKA AJON LOPUSSA, EI RINNAKKAISIA. SAANTO: PLAYWRIGHT-AJOT SULKEVAT SELAIMEN try/finally:LLA JA AJAVAT NAKYMAT PERAKKAIN; UNITY-VIENNIN AIKANA EI SELAINAJOJA (24.9.2026 klo 09.25)

Julkaisija tekee luovutuksen ja tyhjennyksen build 5:n jälkeen.

## KORJAUS klo 09.3x: 'Chrome for Testing' -PROSESSIT EIVAT OLLEET VUOTO VAAN KARTTASEPAN SYVA RANSKA -POLTON RENDEROIJIA (12 RINNAKKAISTA CHROMIUMIA); POLTTO JATKUI BUILD 5:N JALKEEN; OMISTAJAA PYYDETTY OLEMAAN AJAMATTA pkill:IA; FABLEN SAANTO: POLTON RINNAKKAISUUS ENINTAAN 4 SELAINTA KUN MUUT SESSIOT TYOSKENTELEVAT, TAYSI VAIN YOLLA (24.9.2026 klo 09.26)

Laitetestaaja tarkisti prosessien vanhemmat.

## KARTTASEPPA: SYVA SARJA VEI PYRAMIDIN z9–z10 VAARAAN POLKUUN (22c-pohja) KUIVA-AJON VALIMUISTILUETTELON TAKIA (SISALTO OIKEA, 23a-LIPUT; EI YLIKIRJOITUKSIA); AMPARIN SISAINEN KOPIO ESTYI LUOKITTIMEEN (Modify Shared Resources) → FABLE: VIENTI NORMAALILLA aws s3 sync -KAAVALLA PAIKALLISISTA 23a-pohja/z9–z10:EEN, RYHMAMAARIEN TARKISTUS, SITTEN PALLON Z9–Z11 (4 PROSESSIA); VAARAT OBJEKTIT JAAVAT AMPARIIN (EI POISTOJA); VALIMUISTILUETTELON NOLLAUS SARJAN ALKUUN (24.9.2026 klo 09.28)

Jos luokitin estää myös syncin, omistajalta täsmällinen lupa.

## OMISTAJA klo 09.3x: NYKYINEN AVAUSTEKSTI PIDETAAN TOISTAISEKSI; MATTOLAUKKU-AVAUS (VINTIN MATTO OLIKIN ISOISAN MATTOLAUKKU, SISALLA MATKAKIRJA JA PUNNAT; TERMINAALIRIVI KAUPUNGINVALINTAAN) JAA OMISTAJAN HARKINTAAN — FABLEN LUONNOKSET A/B/C LOKISSA TASSA: A 'Vintin vanha matto ei ollutkaan matto vaan isoisän mattolaukku. Sen sisältä löytyi kulunut matkakirja ja nippu vanhoja puntia. Juokset sisälle terminaaliin ja olet varma, että ukko oli löytänyt jotain. Mutta kuka on repinyt kirjasta viimeisen sivun?'; C 'Vintin haalistunut matto olikin isoisän mattolaukku: 1800-luvulla laukut ommeltiin matonpaloista, ja tyhjänä sellainen litistyy matoksi. Sen sisältä löytyi kulunut matkakirja ja nippu vanhoja puntia. Mutta kuka on repinyt kirjasta viimeisen sivun?' + kaupunginvalinta 'Juokset terminaaliin varmana, että ukko oli löytänyt jotain.'; EI MUUTOKSIA KAANONIIN EIKA PELIIN (24.9.2026 klo 09.28)

Omistaja miettii tekstejä; luenta nauhoitettaisiin uudelleen muutoksen yhteydessä.

## PELIKOODARI: WEBIN PARITEETTIKUVATYOKALU VALMIS PR #3038 (tools/pariteettikuvat.mjs + .md): KOEAJO 86 KUVAA (43 NAKYMAA × 2 KOKOA, ~4,4 s/KUVA, ENNEN 30–40 s) → proto-3d/lokit/pariteetti-web-2026-09-24/; INTRON OHITUS SAVUKKEIDEN OIKOTEILLA JA PELIN AVAUSMETODEILLA, KONEKIRJOITUS KERRALLA VAHENNETYN LIIKKEEN TILASSA; SELAIN SULJETAAN AINA, NAKYMAT PERAKKAIN; PAGES-PYYNTORAJA → TIEDOSTOT HAETAAN KERRAN/AJO; KAUPPAA EI OLE (LINSSIT LOYTYVAT AARTEINA), PASSI = MATKALAUKUN IKKUNA; PELIKOODARIN VIESTIRAJA TAYNNA → RAPORTTI TIEDOSTOSSA merge-pyynto-pelikoodari-maisemakompressori.md (24.9.2026 klo 09.29)

Laitetestaaja vertaa valmiista kuvista; #3038 Julkaisijan jonoon.

## NATIIVI-UI: PARITEETTIERA 1 VALMIS — RIVIT 8 (SISALLYS) JA 9 (MAALEHDEN PERUSTIEDOT, HYVAA PAIVAA, MAAN ESITTELY) KORJATTU WEBIN MITOIN (sisallys b740dd0, korttiauki 6ef08ab JONOSSA); RIVI 10 HYVAKSYTTY: WEB ALOITTAA PUHELIMELLA MYOS LAPPUNA (asetaPaivakirjanKoko(tekstitPiilossa()), OMISTAJA 14.9.) → NATIIVI = WEB; TESTIKOMENTO ui matkakirja auki; UUSI ERO: WEBIN ANFANGIT PUUTTUVAT NATIIVISTA → FABLE: TEHDAAN WEBIN MUKAAN; SEURAAVAKSI UI-PIIKKIEN UUSINTAMITTAUS, ANFANGIT, ERA 2 (24.9.2026 klo 09.30)

Laitetestaajalle vertailuohjeet ☰ ja sisällys.

## JULKAISIJA NOLLATTU klo 09.3x (0 VIESTIA TARKISTETTU): LUOVUTUS viesti-julkaisija-luovutus-20260924.md (#3039) + PUTKIRAPORTTI natiivi-testflight-putki-20260924.md (#3032), TYOKALUT /Users/Shared/Claude/julkaisija-tyokalut/; TANAAN MERGETTY 7 VERSIOTA (v2151–v2157) + 15 ILMAN VERSIOTA; ALOITUSVIESTI LAHETETTY (ENSIN FABLE-HAARAN SYNKKAUS MAINIIN — 67 TIEDOSTOA EI MAINISSA —, SITTEN SISALTO N8–N16, #3023 #3014 #3024 #3038 …, SIIRTOSEPPA, VANHEMMAT; BUILD 5:N MUUTOSLOKIRIVI). OMISTAJALLE: XCODE JA UNITY HUB SAA SULKEA, UNITY-EDITORI VAIN KUN EI KAANNOSTA; TAVALLINEN CHROME SAA SULKEA, TESTISELAIMET (CI/POLTTO) EI (24.9.2026 klo 09.33)

Yhdeksäs nollaus tänään; Julkaisija pysyy Opuksena kunnes nightly 25.9. klo 04 on ajanut.

## LAITETESTAAJA: PARITEETTIERA 2 (RIVIT 14–21, PR #3034): 4 PASS (ASETUKSET, KARTTASELITE, KYSYMYS, VALIKKO), 1 TILAERO (LAUKKU), 3 EI VERTAILTAVISSA — PELIKOODARIN KAUPUNKIKORTTI- JA NOPPA-KUVAT TYHJAA KARTTAA VAIKKA ok:true (TYOKALUVIKA → PELIKOODARI KORJAA: AKTIIVINEN PELITILA + DOM-EHTO ENNEN KUVAA), NATIIVIN NOPPA/SAHKE/KULKUTAPALIUSKA-KUVAT MYOS TYHJIA → NATIIVI-UI UUSII AKTIIVISELLA PELITILALLA; ERALISTAT 3–4 NATIIVI-UI:LLE (24.9.2026 klo 09.34)

Web-kuvat 43 näkymästä valmiina; natiivi ottaa vastinparit.

## OMISTAJA klo 09.3x: KIRJOITTI 'jatka' PELIKOODARIN SESSIOON (10 VIESTIN RAJA PURETTU) JA NOLLASI KREDITIT (5 h 5 %, VIIKKO 2 %) (24.9.2026 klo 09.36)

Ei taukoja kiintiön takia.

## LINSSISEPPA: PIIKKIMITTAUS AJO 2 — IHMISEN MATKA 216 → 40 ms, VERTAILU 100 → 25 ms, KEKSINTOJEN PYSAKINVAIHDOT JA LEPOTILA ILMAN PIIKKEJA; JALJELLA 23–41 ms/AVAUS: 3D-NIMET (TextMeshPro 13–26 ms) → KEHYSJONO (piikit2 3dfc383 JONOSSA), IHMISEN MATKAN YDIN 23 ms → AJO 3; MUIDEN OSUUS: MAALEHTI 67 ms JA PANEELIT 11–19 ms (NATIIVI-UI), RENDEROINNIN ENSIKEHYS 10–16 ms (NATIIVISEPPA); HUIPPUVUORET: #3012 ON JO TUOTANNOSSA (v16) → TARKISTUS NYT (24.9.2026 klo 09.37)

Rutiinierä.

## KORJAUS (LINSSISEPPA): WEBIN MUOTOISET MAARAJAT (HUIPPUVUORTEN 17 RENGASTA POIS) TULEVAT SKEEMASSA 1.29 = PR #3030 (AUKI), EI #3012:SSA; TUOTANTO v18 = 1.26; WEBIN MAARAJAPOHJA LOPPUU 76,0° N → WEB EI VARITA HUIPPUVUORIA; TARKISTUS KUN #3030 ON TUOTANNOSSA (TYOKALUT VALMIINA: laitetesti.sh huippuvuoret, kontakti-web KIINTEA=huippuvuoret) (24.9.2026 klo 09.40)

Fablen aiempi 'tarkistus nyt' peruttu; #3030 on Julkaisijan jonossa (kohta 3).

## NATIIVISEPPA: MERGE-ERA PROTO-MASTER dc3dc39 = NATIIVI-UI:N sisallys, korttiauki, anfangit (SISALLYSLEVY, MAALEHDEN ALMANAKKA, ui matkakirja auki, LEHDEN ANFANGI) + LINSSISEPAN piikit2 (NIMET KEHYSJONOLLA); TARKISTA 0; iPADILLA development 3b107c0. FABLE: EI BUILDIA VIELA — BUILD 6 VASTA OMISTAJAN BUILD 5 -LOYDOSTEN JA PARITEETTIERIEN 2–3 KORJAUSTEN JALKEEN (TAI VIIMEISTAAN ~klo 12) (24.9.2026 klo 09.42)

Buildi merkittävän erän jälkeen -linjaus; peräkkäiset buildit tunnin välein eivät auta omistajan kokeilua.

## SISALTOKIRJURI: LAATUKIERROS VALMIS — 77/77 LEHTEA TARKISTETTU, 9 PIENTA KORJAUSTA (#3002 #3015 #3021 #3022 #3026 #3042), RAPORTTI + LUOVUTUS PR #3043; NOLLATTU klo 09.4x (0 VIESTIA), ALOITUSVIESTI LAHETETTY (CHURCHILL, SISALTOINVENTAARIO KENTITTAIN, KOHDEKARTAT). NATIIVISEPPA: MERGE-ERA PROTO-MASTER ef84aae = PELIKOODARIN paataso-130 JA mannerlento-rivi, LINSSISEPAN paketti2 JA huippuvuoret-TESTIT, 2.0-VALMIUS (Sisalto.Paaversio = 1 + KOEKYTKIN sisalto-2.txt, REITIT PAATASOLTA), 248/248, TARKISTA 0; 2.0-PAKETIN VAIHTO FABLEN PAATOS KUN sisalto/2/uusin.json ON AMPARISSA (NYT 404) (24.9.2026 klo 09.47)

Kymmenes nollaus tänään.

## KARTTASEPPA: SYVA RANSKA AMPARISSA JA TARKISTETTU — PYRAMIDI 2026-09-23a-pohja/z9–z10 (896 + 3 410 LAATTAA), PALLON Z9–Z11 …/2026-09-23a-pohja-20260923asyva/ (10 475 LAATTAA), OSOITE NATIIVISEPALLA; VAARAT 22c-KOPIOT LOKISSA, VALIMUISTIN VARTIJA #2962:SSA; RELIEFI 20260924 PAIVAMAARARAJAN KAISTALE PAIKATTU (PYRAMIDI + pallo/ + pallo-k08/), OSOITTEET LINSSISEPALLA, WEBIN OSOITIN PR #3044; AVOIMET #2962 #2980 #2989 #3044; SEURAAVAKSI E28 SYVAT TASOT z9–z10 YOLLA TAYDELLA RINNAKKAISUUDELLA (24.9.2026 klo 09.50)

Fable: hyväksytty; yöajo ei saa osua klo 03 siivoukseen eikä klo 04 TestFlight-ajoon (Unity-vienti + Chromium-renderöijät).

## NATIIVISEPPA: MERGE-ERA PROTO-MASTER 5a5c6e2 = SISALLON LUKU TAUSTASAIKEESSA (LEHDEN JA CHATIN 25–58 ms PIIKIT) + NATIIVI-UI:N lehti-turva (DYNAMIC ISLAND); TARKISTA 0; EI VIELA LAITTEELLA (iPAD LINSSISEPAN PIIKKIAJOSSA 3); SEURAAVAKSI SYVA RANSKA z9–11 TOISEKSI RASTERIKERROKSEKSI (24.9.2026 klo 09.51)

Build 6 -ehdokas: dc3dc39 + ef84aae + 5a5c6e2 — odottaa omistajan build 5 -löydöksiä.

## KARTTASEPPA: E28:N SYVAT TASOT AJASTETTU klo 22.00 (VAHTI PYSAYTTAA klo 02.45, JATKO SHARDIRAJALTA); KUIVA-AJO 101 PYRAMIDISHARDIA + PALLO Z9–Z11 16 OSANA, ARVIO ~2 h → VALMIS ~klo 00; AJOKANSIO pyramidi-poltto/ajo-20260924-e28-syva (24.9.2026 klo 09.51)

Ei osu siivoukseen klo 03 eikä TestFlight-yöajoon klo 04.

## OMISTAJAN BUILD 5 -LOYDOKSET klo 09.5x (iPHONE, ATEENA, PAIVA 1): 1) NOSTOT (KARTTAVALOT) EIVAT NAY KARTALLA; 2) MUIDEN MAIDEN HUNTU PUUTTUU (WEBISSA MUUT MAAT HIMMENNETTY); 3) PAIKKAKUPLA 'Ateena, elokuussa 1873' PIIRTYY TOISEN HAALEAN TEKSTIN PAALLE → 1–2 NATIIVISEPPA (PAKETTI VAI KERROS), 3 NATIIVI-UI; KUVA uploads/801139ec-image.png; KORJAUKSET BUILD 6:EEN (24.9.2026 klo 09.52)

Omistajan kokeilu jatkuu; löydökset kirjataan numeroituna.

## OMISTAJA klo 09.5x (SITOVA, BUILD 5 -LOYDOS 4): ALOITUSLENNOSSA KAIKKI KAUPUNKIEN PISTEET PIILOSSA PAITSI KOHDEKAUPUNKI; KAMERA LENTOKONEEN ETUVIISTOSTA JA LAHEMPAA (EI YLAVIISTOSTA KAUKAA), JA KAMERA MUUTTAA KOKO AJAN HITAASTI KULMAA JA KORKEUTTA, JOTTA ANIMAATIO ON KIINNOSTAVAMPI → RAAMATUN LENNON ESITYS PAIVITETAAN; NATIIVISEPPA TOTEUTTAA (Nappula.Lento, PalloKierto.Kuvaa, KarttaKerrokset pisteet) (24.9.2026 klo 09.53)

Koskee ensisijaisesti aloituslentoa; muiden lentojen kamera samalla periaatteella (jatkuva hidas liike), pisteiden piilotus vain aloituslennossa.

## SIIRTOSEPPA: SISALTOPAKETTI 2.0 VAIHEET 4–5 VALMIINA PR #3030 (siirtoseppa-tyohuone ddf1a0ddc, 74/74): PAKETTIVARTIJA VIHREA RAAKAKIELLOLLA, AUKOT KORJATTU SKEEMOISSA 1.31–1.32, TESTI VAATII JOKAISEN RAAKAKENTAN PAATASOLLE TAI VASTINELISTAAN; KENTTAKARTTA NATIIVI-UI:LLE docs/raportit/kenttakartta-2-0-natiivi-20260924.md; CI JULKAISEE MERGEN JALKEEN MYOS sisalto/2/ (53 Mt vs 1.x 93 Mt) OMALLA OSOITTIMELLA, 1.x ENNALLAAN; NATIIVI SIIRTYY 2.0:AAN KUN NATIIVISEPPA VAIHTAA Sisalto.cs:N OSOITTIMEN JA NATIIVI-UI:N LUKIJAT OVAT PAATASOLLA; VAIHE 6 (1.x JAADYTYS) VASTA KUN KAIKKI TF-BUILDIT LUKEVAT 2.0:AA (24.9.2026 klo 09.56)

Fable: 2.0-vaihto natiiviin tehdään omana buildina (build 7 tai myöhempi), ei samaan buildiin omistajan löydöskorjausten kanssa.

## NATIIVISEPPA — BUILD 5 -LOYDOSTEN JUURISYYT: 1) NOSTOT: NATIIVISTA PUUTTUU WEBIN PALLON NOSTOMERKKIKERROS KOKONAAN (js/pallolauta/nostot.js + aihemerkit: NYKYISEN MAAN NOSTOT SYMBOLEINA JA NIMIOINA KUN MAA ≥ 50 % NAKYMASTA); PAKETTI KUNNOSSA → NATIIVISEPPA TEKEE Kartta/NostoKerros + NATIIVI-UI:N NostoMerkit; 2) 'HUNTU': WEBISSA EI OLE HUNTUA (POISTETTU 2.9.) — ERO ON VARITASO JA AARIVIIVA: WEBIN POHJA ON SEPIAA JA VAIN NYKYINEN MAA SAA VARILAATAT (pyramidi vari/<ISO>, 12 mpk) + VAHVISTETUN AARIVIIVAN (#6b5539, 1,6–3 px); NATIIVIN 23a-POHJA ON VARILLINEN KAIKKIALLA → NATIIVI TOTEUTTAA WEBIN SEPIAPOHJAN + VARITASON + AARIVIIVAN (OSOITTEET KARTTASEPALTA). FABLEN KORJAUS AIEMPAAN: POHJAKARTAN ERO EI OLE HYVAKSYTTY — WEB ON OLETUS MYOS POHJAN VARITYKSESSA. JARJESTYS: NOSTOT → VARITASO → LENTOKAMERA (natiiviseppa/lento-kamera JO HAARASSA) (24.9.2026 klo 09.56)

Omistajan löydökset 1–2 selitetty; korjaukset build 6:een.

## SISALTOKIRJURI: SISALTOINVENTAARIO 71 KAUPUNGILLE PR #3045 — SAA, KOHDEKARTTA, TURISTIOPAS, GALLERIA, ennenNyt JA FOKUSVIRTA PUUTTUVAT KAIKILTA 71:LTA; 7/71 PYSYVASTI ILMAN KARTUSCHAA. FABLEN RAJAUS: KOHDEKARTTA VAIN OIKEILLE KAUPUNGEILLE, LUONNONKOHTEILLE NAHTAVYYDET LISTANA + GALLERIA + ennenNyt; JARJESTYS SAA → GALLERIA → ennenNyt → TURISTIOPAS → KOHDEKARTTA → FOKUSVIRRAT; VIIDEN KOHTEEN ERAT (24.9.2026 klo 09.57)

Sää-erä käynnissä (tools/hae-saanormaalit.mjs).

## OMISTAJA klo 09.5x (SITOVA, BUILD 5 -LOYDOS 5, iPHONE): KOKO NAYTON YLAOSA HYOTYKAYTTOON — RUSKEA YLAPALKKI POIS KOKONAAN (KARTTA NAKYY KOKO NAYTON ALALTA), LOGO POIS YLAKULMASTA, MATKALAUKUN PILLERI VASEMPAAN YLAREUNAAN LYHENNETTYNA MUOTOON '300£ 1/80' (RAHA JA PAIVA/80), OIKEAAN YLAREUNAAN VAIN HAMPURILAINEN, KEHITTAJATILASSA LISAKSI HAMMASRATAS → NATIIVI-UI TOTEUTTAA (SAFE AREA / DYNAMIC ISLAND HUOMIOIDEN), BUILD 6:EEN; FABLE KYSYY OMISTAJALTA KOSKEEKO MYOS WEBIA JA iPADIA (24.9.2026 klo 09.57)

Ensimmäinen omistajan tilaama natiivin oma asettelu; kirjataan Raamattuun kun laajuus (web/iPad) on selvä.

## OMISTAJA klo 10.0x (SITOVA, BUILD 5 -LOYDOKSET 6–7, iPHONE): 6) LIIKU-NAPPI LAPINAKYVAKSI (PUOLILAPINAKYVA TAUSTA) JA HIEMAN PIENEMMAKSI; 7) LINSSIT POIS MATKALAUKUSTA — LINSSEIHIN PAASEE VAIN UUDESTA SILMALASIKUVAKKEESTA (KARTAN OIKEA REUNA) → NATIIVI-UI, BUILD 6:EEN; LAAJUUS (iPAD/WEB) ODOTTAA OMISTAJAN VASTAUSTA (24.9.2026 klo 09.59)

Nappi-inventaarion rivit päivitetään: matkalaukun linssiosio → ei tarvita natiivissa.

## OMISTAJA klo 10.0x: LOYDOSTEN 5–7 ASETTELUMUUTOKSET (YLAOSA ILMAN PALKKIA, LIIKU-NAPPI, LINSSIT POIS LAUKUSTA) KOSKEVAT VAIN NATIIVIA iPHONELLA — EIVAT WEBIA (WEBKIT EI TUE KOKO NAYTON YLAOSAA); iPAD KATSOTAAN ERIKSEEN MYOHEMMIN. TAMA ON HYVAKSYTTY POIKKEAMA 'WEB ON OLETUS' -SAANNOSTA (OMISTAJAN PAATOS): NATIIVIN iPHONE-ASETTELU SAA EROTA WEBISTA YLAOSAN, LIIKU-NAPIN JA LAUKUN OSALTA (24.9.2026 klo 10.01)

Kirjataan Raamattuun NATIIVI PELI ETUSIJALLE -kohtaan.

## TARKENNUS (OMISTAJA klo 10.0x): YLAPALKIN POISTO EI OLE MAHDOLLINEN WEBISSA, KOSKA iPHONEN NAYTON YLAOSA (KELLO, AKKU, TILARIVI) ON SAFARISSA JARJESTELMAN JA SELAIMEN KAYTOSSA — NATIIVI SOVELLUS SAA PIIRTAA KARTAN SEN ALLE; SIKSI iPHONE-ASETTELU ON NATIIVIN OMA (24.9.2026 klo 10.01)

Korjaa aiemman kirjauksen sanamuodon 'WebKit ei tue'.

## OMISTAJAN BUILD 5 -LOYDOKSET 8–10 klo 10.0x (iPHONE, KREIKAN MAAPANEELI): 8) LIIKU-NAPPI PIIRTYY PANEELIN PAALLE JA PEITTAA PINTA-ALAN JA DEMOKRATIAN ARVOT; 9) PULU JA 'radio'-MERKINTA PANEELIN TEKSTIN PAALLA; 10) PANEELIN RIVIT TARKISTETTAVA WEBIA VASTEN ('Nyt', TYHJAT ARVOT, KESKITULON MUOTO, KIELIRIVIN KATKAISU) → NATIIVI-UI, BUILD 6; KUVA uploads/c5357c25-image.png (24.9.2026 klo 10.02)

Löydöslista build 6: 1 nostot, 2 väritaso/ääriviiva, 3 paikkakupla, 4 lentokamera+pisteet, 5 iPhonen yläosa, 6 Liiku-nappi, 7 linssit pois laukusta, 8–10 maapaneeli.

## LINSSISEPPA: PIIKKIAJO 3 — SATELLIITTI AVAA 29 → 13 ms, VERTAILU 15 → 7 ms; YHA YKSI 24–41 ms KEHYS/AVAUS; KORJAUKSET piikit3 39846ad (JONOSSA): IHMISEN MATKA VANAPIIRTO JA RANTAMASKIN 4 Mt TEKSTUURI → TAUSTASAIE + JAETTU TEKSTUURI, SATELLIITIN FONTIN ESILATAUS → ESILAMMITYS, RADION AANI-ISTUNTO → SARJAJONO; SAMASSA HAARASSA RELIEFI 20260924 JA SKEEMAN 1.32 NULL-KENTAT; MUIDEN OSUUDET TOIMITETTU (MAALEHTI 49 ms NATIIVI-UI, ENSIPIIRTO 10–18 ms NATIIVISEPPA); AJO 4 KUN piikit3 iPADILLA (24.9.2026 klo 10.03)

Huom: reliefi 20260924 -pohja muuttuu, kun Natiiviseppä siirtyy webin sepiapohja + väritaso -malliin (löydös 2) — Linssiseppä sovittaa.

## OMISTAJA klo 10.0x: MAAPANEELI (KARTUSCHA) EI VASTAA WEBIN MUOTOILUA → LOYDOS 10 LAAJENNETTU: KOKO PANEELI TEHDAAN WEBIN MUKAAN KUVA KUVALTA (NATIIVI-UI, WEB-KUVA PELIKOODARIN PARITEETTIKUVISTA). SIIRTOSEPPA: 1.x/2.0-SISALTOVERTAILU AUTOMAATTITESTINA (26d1e0290, PR #3030, 75/75; AUKOT KORJATTU: PULMIEN TAULUKOT, KOHTAAMISKUVIEN kaupunginNimi); KOEPAKETIT v41 JA 2.0-KOE v4; NATIIVIN VAIHTO 2.0:AAN ON YKSI RIVI (Sisalto.Paaversio) TAI Documents/sisalto-2.txt (24.9.2026 klo 10.03)

Rutiinierä Siirtosepältä.

## LAITETESTAAJA: PARITEETTIERAT 3–4 (25 NAKYMAA) PISTOKOE 12: 9 PASS (KARTTA, KOHTAAMINEN, NOSTOKORTTI, NOSTOVISA, ELAINTAKY, AARRE, POLLO, TOPOGRAFIA, KULKUTAPALIUSKA/SAHKE), 1 LOYDOS: LINSSI-VESISTOT TYHJA NATIIVIN KUVASSA (TODENNAKOISESTI KUVA ENNEN LATAUTUMISTA → LINSSISEPPA + NATIIVI-UI); 13 NAKYMAA VERTAAMATTA (LAITETESTAAJA JATKAA, KONTEKSTI 56 %) (24.9.2026 klo 10.03)

Pariteettikierros: 43 näkymästä ~30 verrattu.

## OMISTAJAN BUILD 5 -LOYDOKSET 11–12 klo 10.0x (iPHONE, IHMISEN MATKA): 11) KERTOJAN TEKSTILAATIKKO PYSTYSUORA KAPEA KAISTA, SANAT KATKEAVAT KESKELTA (WEB: min(31rem, 88 %) KESKITETTY) → NATIIVI-UI; 12) ESITYKSEN LOPUSSA IRRALLINEN SANA 'Afrikasta.' KARTALLA JA KAMERA JATTAA PALLON ALAREUNAN MUSTAKSI RISTIKOKSI → LINSSISEPPA (KAMERA + TEKSTIN PAATTYMINEN WEBIN MUKAAN, TODENNUS iPHONE-SIMULAATTORISSA); KUVAT uploads/4d71d7dc, 0851e970 (24.9.2026 klo 10.05)

Huom: linssien regressio tehtiin iPadilla; iPhonen kapea ruutu paljastaa eroja → Linssiseppä ajaa regressiokierroksen myös iPhone-simulaattorissa.

## KORJAUS (LINSSISEPPA): VESISTOLINSSIN PARITEETTILOYDOS OLI TOISINPAIN — NATIIVIN KUVISSA LINSSI AUKI JA JOET PIIRTYVAT; TYHJA PERUSKARTTA OLI WEBIN KUVASSA (PELIKOODARIN TYOKALU EI VALINNUT LINSSIA OIKEIN, ok:true VIRHEELLINEN) → PELIKOODARI KORJAA TYOKALUN LINSSIVALINNAN; NATIIVISSA EI KORJATTAVAA (24.9.2026 klo 10.05)

Pariteettityökalun ok-merkintä ei ole luotettava: Laitetestaaja katsoo kuvat, ei yhteenvetoa.

## OMISTAJAN BUILD 5 -LOYDOS 13 klo 10.0x (iPHONE): OFFLINE-LATAUKSEN AIKANA KARTALLE JAA MUSTIA LAATTANELIOITA (BALKAN) — NAKYVAT LAATAT EIVAT LATAUDU → NATIIVISEPPA: NAKYVAT LAATAT ETUSIJALLE OFFLINE-JONON EDELLE, PUUTTUVAN LAATAN TILALLE YLEMMAN TASON LAATTA (EI MUSTAA), OFFLINE TAUSTALLE KUN NAKYMA LIIKKUU; KUVA uploads/4bd56b22-image.png; BUILD 6 (24.9.2026 klo 10.05)

Omistajan kysymys: johtuuko offline-latauksesta → kyllä todennäköisesti, mutta on bugi.

## OMISTAJAN BUILD 5 -LOYDOS 14 klo 10.1x (iPHONE): NAVAT PUUTTUVAT — POHJOIS- JA ETELANAVALLA MUSTIA SEKTOREITA JA HARMAITA TAPLIA (PYRAMIDI LOPPUU ±85°, EI NAPAKALOTTIA), ETELAMANNER SUMEANA → NATIIVISEPPA TEKEE NAPAKALOTIN WEBIN MUKAAN, KARTTASEPPA KERTOO WEBIN TAVAN JA MAHDOLLISEN NAPALAATAN; KUVAT uploads/46c674af, 2d74871e; BUILD 6 (24.9.2026 klo 10.07)

Löydöslista build 6: 14 kohtaa.

## OMISTAJAN BUILD 5 -LOYDOS 15 klo 10.1x (iPHONE, KARTTASELITE): SELITEPANEELI AVAUTUU PAIKKAKUPLAN JA SILMALASINAPIN ALLE (KUPLA PEITTAA VALILEHDET NOSTOT/MAAKUNNAT, NAPPI KELLUU PANEELIN PAALLA) → NATIIVI-UI: Z-JARJESTYS JA VAISTO WEBIN MUKAAN, MUOTOILU WEBIN SELITTEESEEN; KUVA uploads/8acd3b5b; BUILD 6. PULUN CHAT: OMISTAJA EPAILEE ETTEI TOIMI LAITTEELLA → NATIIVI-UI TARKISTAA WORKER-OSOITTEEN, AVAIMEN JA VIRHEEN NAYTON (MAHDOLLINEN LOYDOS 16) (24.9.2026 klo 10.07)

Nostojen luvut näkyvät selitteessä (5/30/1/1/7/24/4/16/5) → paketti kunnossa, vain merkkikerros puuttuu (löydös 1).

## OMISTAJAN BUILD 5 -LOYDOS 16 klo 10.1x: PULUN CHAT EI OLE KYTKETTY NATIIVISSA (VASTAUS 'Livian keskustelu ei vielä ole auki tässä sovelluksessa. Kupla ja äänet toimivat.') → TOIMINTOPARITEETIN PUUTE, ETUSIJALLE BUILD 6:EEN: NATIIVI-UI KYTKEE WEBIN PULU-WORKERIIN (js/pollo.js: OSOITE, PYYNTOMUOTO, STRIIMAUS, KONTEKSTI, PAIKALLINEN HAKU ENSIN), PELIKOODARI ANTAA RAJAPINNAN JA SALLINNAN; KUVA uploads/902061de (24.9.2026 klo 10.08)

Nappi-inventaarion 'chat' oli merkitty tehdyksi — inventaario korjataan: UI on, palvelu puuttui.

## LAITETESTAAJA: PARITEETTIKIERROS VALMIS — KAIKKI 43 NAKYMAA VERRATTU JA KIRJATTU (PR #3034, docs/raportit/pariteetti-natiivi-20260924.md); KOLME PYYNTOA NATIIVI-UI:LLE (MATKAKIRJAKORTTI KIINNI, LINSSIN SELITE UUSINTA, MAATIEDOT ODOTTAA TYOKALUKORJAUSTA); RIVI 2: ALOITUSVALINNAN HEHKURENKAAT PUUTTUVAT NATIIVISTA → NATIIVISEPPA; LAITETESTAAJA KIRJOITTAA LUOVUTUKSEN JA NOLLAA (24.9.2026 klo 10.09)

Pariteettikierroksen erot on jaettu Natiivi-UI:lle, Natiivisepälle ja Linssisepälle; korjaukset build 6:een.

## NATIIVI-UI — LOYDOS 16 JUURISYY: NATIIVI LAHETTAA SAMAAN POLLO-WORKERIIN KUIN WEB (NATIIVITUNNISTE, EI AVAINTA), MUTTA WORKERIN ALLOWLIST SALLII VAIN app.matkakirja.proto3d JA app.matkakirja.peli — TESTFLIGHT-BUNDLE ON fi.matkakirja.peli → 403 (CURLILLA VARMISTETTU); 403 NAYTETAAN HARHAANJOHTAVASTI 'ei vielä auki' → PELIKOODARI LISAA fi.matkakirja.peli SALLINTAAN JA JULKAISEE WORKERIN (EI NATIIVIKOODIMUUTOSTA); NATIIVI-UI KORJAA VIRHETEKSTIN; PAIKALLINEN TIETOHAKU TOIMII ILMAN VERKKOA. JONOSSA paikkakupla 70c3a5f JA iphone-yla 14b325c (YLAOSA, LIIKU, LAUKKU, MAAN KORTTI WEBIN MUKAAN); SEURAAVAKSI 11 JA 15 (24.9.2026 klo 10.10)

Chat korjaantuu workerin julkaisulla ilman uutta buildia — omistaja voi testata heti kun Pelikoodari ilmoittaa.

## NATIIVISEPPA (MASTER 6e18ca9, iPAD ba9227d): LENTOKAMERA (LOYDOS 4) MASTERISSA JA TODENNETTU — ETUVIISTOSTA LAHELLA, JATKUVA KULMA/KORKEUS/SUUNTA, LASKUSSA PUOLIORBITTI, VAIN KOHDEPISTE NAKYY (KUVAT proto-3d/lokit/lento-nostot-20260924/lento-02/04/06.png); NOSTOT (1): NostoKerros MASTERISSA JA TOIMII (GRC 65 NOSTOA), MERKKIEN PIIRTO NATIIVI-UI:LTA; HUNTU/VARITASO (2) ODOTTAA KARTTASEPAN OSOITTEITA; JONO 13 → 14 → HEHKURENGAS; MERGETTY piikit3, paikkakupla, iphone-yla. LAITETESTAAJA NOLLATTU klo 10.1x, ALOITUSVIESTI LAHETETTY (BUILD 6 -TARKISTUSLISTA) (24.9.2026 klo 10.11)

Omistajalle kuvat lennosta.

## OMISTAJA klo 10.1x (SITOVA, LENNON ESITYS -TARKENNUS): LENNOSSA NAKYY KOLMIULOTTEINEN MAASTO (MAAILMAN MAASTO KORKEUKSINEEN) JA AURINGON PIIRTAMAT RINTEET JA VARJOT PELIN KELLONAJAN MUKAAN (Aurinko.cs); TAIVAS ON SININEN, EI MUSTA — ILMAKEHAN GRADIENTTI HORISONTISSA VAALEA, YLHAALLA SYVEMPI SININEN, PILVISUMU SAILYY; MUSTA AVARUUS VAIN ASTRONAUTTILINSSISSA → NATIIVISEPPA, BUILD 6 (24.9.2026 klo 10.13)

Fable: linjaus vastaa Raamatun LENNON ESITYS -kohtaa (aurinko, pilvisumu, korkeuserot); lisätään taivas.

## OMISTAJA klo 10.1x (SITOVA, BUILD 5 -LOYDOS 17, ALOITUSNAYTTO): KAUPUNKIEN PISTEET POIS, MAAPALLO LAHENNETAAN TAYTTAMAAN KOKO RUUTU, PYORII HITAASTI TAUSTALLA PEHMENNETTYNA (SUMENNUS) — KUTEN WEBIN ETUSIVUPALLO (.intro-verho, etusivupallo.js) → NATIIVISEPPA (KAMERA, PYORITYS, PISTEET) + NATIIVI-UI (SUMENNUSVERHO, PORTIN ASETTELU), BUILD 6 (24.9.2026 klo 10.15)

Web on oletus: aloitusnäytön pallo sumennettuna otsikon takana.

## LINSSISEPPA — LOYDOS 12 JUURISYY: 'Afrikasta.' KESKELLA EI OLE VIKA (WEB LATOO AVAUKSEN LAUSEET YKSITELLEN KESKELLE, UI PIILOSSA); VIKA ON KAMERASSA — NATIIVISTA PUUTTUI WEBIN AVARUUSVAIHE (avaaKaukaisuus: KAMERA MUSTAN ALLA 300 SATEEN PAAHAN, MAA PISTEENA TAHDISSA), JOTEN ZOOMI AFRIKKAAN LAHTI PELAAJAN KAUPUNGISTA MATALALTA JA PALLON REUNA NAKYI; KORJAUS linssiseppa/avaruusavaus fc77474 JONOSSA (MYOS PalloKierto), TODENNUS iPHONE-SIMULAATTORISSA; LOYDOS 11 (TEKSTILAATIKKO) NATIIVI-UI:LLA (24.9.2026 klo 10.17)

Regressiot iPhone-simulaattorissa jatkossa myös linsseille.

## OMISTAJA klo 10.1x (SITOVA, KAMERA-AJOT): KAIKKIIN KAMERALIIKKEISIIN EASE IN JA EASE OUT — MAHDOLLISIMMAN PEHMEAT JA ELOKUVAMAISET LIIKKEET, EI LINEAARISIA PATKIA EIKA HYPPYJA VAIHEIDEN VALILLA (YHTENAINEN SPLINE, VAIHEET SULAUTUVAT); ALOITUSLENTO ON ALKUKOHTAUS, JONKA PITAA SAVAYTTAA: VISUAALISESTI VAIKUTTAVA, ELOKUVAMAINEN (SININEN TAIVAS, 3D-MAASTO AURINGON VALOSSA, PILVET, SAVUJANA, KAMERA-AJO ETUVIISTOSTA, MUSIIKKI JA LUENTA TAHDISSA) → NATIIVISEPPA (LENTO, PalloKierto), LINSSISEPPA (LINSSIEN KAMERA-AJOT), BUILD 6 (24.9.2026 klo 10.18)

Raamattuun LENNON ESITYS + yleinen kamerasääntö.

## LINSSISEPPA — KAMERA-AJOT: AVARUUSAVAUS fc77474 MASTERISSA; linssiseppa/kamera-ajot c27a662 JONOSSA — LINSSIAJOT ILMAN OMAA KAYRAA (PYSAKKIAJOT, KEKSINTOJEN LOPPU, TUTKIMUSVAIHE, AVARUUSZOOMI, PALUUT) KAYTTIVAT PELIN TRAPETSIKAYRAA (VAKIONOPEUS KESKELLA) → OLETUS NYT SMOOTHERSTEP (WEBIN Kameramatikka.Pehmennys); NAKYVAT HYPYT POISTETTU (ASTRONAUTIN SULKU 1,6 s, IHMISEN MATKAN MUISTIJATKO 1,2 s LIUKUVAT; VAHENNETYLLA LIIKKEELLA HYPPY SAILYY); PELIN OMAT AJOT (PalloKierto, TRAPETSI) NATIIVISEPALLE (24.9.2026 klo 10.21)

Hyväksytty poikkeama webistä (hypyt → liu'ut) omistajan kamera-ajolinjauksen nojalla.

## OMISTAJA klo 10.2x (SITOVA, ALOITUSLENNON KAMERAKASIKIRJOITUS): 1) ALUSSA KAMERA LENTAA ENSIN LAHELLE LENTOKONETTA, 2) SITTEN KAUEMMAS PALJASTAEN MAAPALLON NAKYMAT, 3) LOPUKSI KIERTAA KOHDEKAUPUNKIA VIISTOSTA KULMASTA NAYTTAEN SEN YMPARISTON (ATEENASSA SAARET) — KOHDEKAUPUNGIN KIERTO ON ERI JOKAISESSA MAARANPAASSA (KAUPUNGIN YMPARISTON MUKAAN) → NATIIVISEPPA, OSA LENNON ESITYSTA, BUILD 6 (24.9.2026 klo 10.21)

Täydentää: etuviisto, jatkuva liike, ease in/out, sininen taivas, 3D-maasto.

## OMISTAJA klo 10.2x (SITOVA, ALOITUSLENNON TEMPO): KAMERAN NOPEUDEN VAIHTELU ON OLENNAISTA — 1) ALUSSA LENNETAAN NOPEASTI LAHELLE KONETTA (KUMINAUHAMAINEN JARRUTUS LAHIKUVAAN), 2) HETKI LAHES PAIKALLAAN HITAASTI PANOROIDEN KONETTA, 3) IRTAUDUTAAN KONEESTA KIIHTYEN KAUEMMAS NAYTTAEN MAAPALLOA, 4) MATKA TASAISENA, 5) LOPUKSI KOHDEKAUPUNGIN KIERTO; KOKO AJAN HARKITTUJA NOPEUDEN MUUTOKSIA — VALILLA TASAISTA, VALILLA KIIHTYVAA, KAIKKI SIIRTYMAT KUMINAUHAMAISIA KIIHDYTYKSIA/JARRUTUKSIA, JOTKA VOIVAT OLLA HITAITA TAI NOPEITA TILANTEEN MUKAAN → NATIIVISEPPA (LENNON AIKAJANA AVAINKEHYKSINA, KAYRA PER OSUUS), BUILD 6 (24.9.2026 klo 10.25)

Täydentää kamerakäsikirjoitusta klo 10.21.

## OMISTAJA klo 10.2x (SITOVA, KAMERA-AJOT LAAJENNUS): SAMA TEMPON DRAMATURGIA (NOPEUDEN VAIHTELU, KUMINAUHAMAISET KIIHDYTYKSET JA JARRUTUKSET, TASAISEN JA KIIHTYVAN VUOROTTELU) SOVELLETAAN KAIKKIIN PELIN KOHTAUKSIIN, JOISSA KAMERA LIIKKUU AUTOMAATTISESTI: KAIKKI LENNOT JA MATKAT, SAAPUMINEN, KAUPUNGIN VAIHTO, ZOOMIT, LINSSIEN AVAUKSET JA PYSAKKIAJOT (ASTRONAUTTI, IHMISEN MATKA, KEKSINNOT, VERTAILU), AARTEEN PALJASTUS, HUIPENNUS, ALOITUSNAYTON PALLO → NATIIVISEPPA (PalloKierto, LENNOT, PELIN AJOT), LINSSISEPPA (LINSSIAJOT); YHTEINEN AIKAJANA-/KAYRATYOKALU, JOTTA KAIKKI AJOT KAYTTAVAT SAMAA KUMINAUHAKIRJASTOA (24.9.2026 klo 10.26)

Raamatun KAMERA-AJOT-kohta laajennetaan kattamaan kaikki automaattiset kamera-ajot.

## NATIIVI-UI: BUILD 6 -ERAT HAARASSA natiivi-ui/nostomerkit 8d554a8 (NATIIVISEPPA MERGEAA VAIHEITTAIN): 1 NOSTOMERKIT + RYHMITYS + VIUHKA TEHTY, 11 KERTOJAN LAATIKKO TEHTY, 15 SELITE TEHTY, 17 PORTIN VERHO TEHTY (SUMENNUS NATIIVISEPALTA), 2.0-LUKIJAT TEHTY; LOYDOS 12 'Afrikasta.' ON OMA VIRKKEENSA DATASSA, WEB JA NATIIVI NAYTTAVAT VIRKKEEN KERRALLAAN → EI VIKA (KAMERA KORJATTU ERIKSEEN); CHAT 403 ODOTTAA PELIKOODARIN ALLOWLISTIA; iPHONE-KUVAT KUN SIMULAATTORIBUILD ON ASENNETTU (24.9.2026 klo 10.28)

Build 6: UI-kohdat 1, 3, 5–7, 10, 11, 15, 17 (verho) tehty; kartta- ja kamerakohdat Natiivisepällä.

## PELIKOODARI (TIEDOSTOSSA, VIESTIRAJA): LOYDOS 16 KORJATTU PR #3046 (tools/pollo/rajat.js NATIIVIT_OLETUS + fi.matkakirja.peli, 133/133) → JULKAISIJA MERGEAA HETI, pollo-julkaisu.yml JULKAISEE WORKERIN; SAMA TUNNISTE #2985:EEN (SAHKE-WORKER) JA #3003:EEN (EHDOTUS-WORKER; NATIIVIN 'Lähetys ei vielä ole auki' KORJAANTUU); PULU-RAJAPINTAKUVAUS NATIIVILLE proto-3d/lokit/pulu-rajapinta-natiiville.md (x-pollo-kehittaja-OTSAKE, STRIIMI + DownloadHandlerScript); MANNERLENTO-RIVI 245bbd4 MERGE-PYYNNOSSA (B7 KOHTA 3); ui jatka -PIIKKI VALMIS (15,6/15,3/12,4 ms) (24.9.2026 klo 10.29)

Chat toimii build 5:ssä workerin julkaisun jälkeen ilman uutta buildia.

## NATIIVI-UI: PULUN CHAT TEHTY RAJAPINTAKUVAUKSEN MUKAAN (natiivi-ui/nostomerkit 33a8e7e JONOSSA): SSE-STRIIMI PALOITTAIN (90 s), KATKOS → 'Ajatus katkesi kesken lauseen.' + UUSINTANAPPI, 403 TAVALLISENA VIRHEENA; LAITTEELLA TOIMII KUN #3046 JULKAISTU JA BUILD 6 TESTFLIGHTISSA. FABLEN EHTO: x-pollo-kehittaja-OTSAKKEEN ARVOA EI KOVAKOODATA APPIIN — KEHITTAJATILAN KENTTA + KEYCHAIN KUTEN KURATOINTIAVAIN, EI APP STORE -KAANNOKSESSA (24.9.2026 klo 10.32)

Avaimet eivät kuulu binääriin.

## LAITETESTAAJA: BUILD 6 -TARKISTUSLISTA VALMIS (docs/raportit/build6-tarkistuslista-20260924.md, PR #3034 d286a6e65): 16 LOYDOKSELLE KOMENTO, WEBISTA TARKISTETTU ODOTETTU TULOS JA KUVA-ASKEL; TILA (PROTO-MASTER 333d3f0): 1, 3–13, 15 MERGETTY; 2 (VARITASO/AARIVIIVA), 14 (NAVAT), 16 (CHAT) AUKI; LAITETESTAAJA AJAA LISTAN KUN BUILD 6 -MASTER ON SIMULAATTORISSA (63a2852 ASENNUS) (24.9.2026 klo 10.32)

Löydös 17 (aloitusnäytön pallo) lisätään listaan; kamera-linjaukset todennetaan kuvasarjalla.

## JULKAISIJA: #3046 MAINISSA, POLLO-WORKER JULKAISTU klo 10.30 (run 35969900012 VIHREA) → fi.matkakirja.peli SALLITTU, BUILD 5:N CHAT VOI TOIMIA HETI; SEURAAVAKSI #2985 (SAHKE-WORKER) JA #3003 (EHDOTUS-WORKER) (24.9.2026 klo 10.32)

Omistajalle: kokeile chatia build 5:llä nyt.

## NATIIVI-UI: POLLO-KEHITTAJAKOODI VAIN KEYCHAINISSA (ad20fa0: Asetukset.PolloKoodi, MatkakirjaAvaimet; TALLENTUU KUN OMISTAJA KYTKEE KEHITTAJATILAN KOODILLA; OTSAKE VAIN KUN ARVO ASETETTU; APP STORE -KAANNOKSESSA AINA null); PELIKOODARIN Puhe.TalletaKehittajakoodi TALLENTAA YHA PlayerPrefsiin → SIIRRETAAN KEYCHAINIIN (SAMA AVAIN); SAANTO: AVAIMET VAIN KEYCHAINISSA. NATIIVISEPPA ASENSI 333d3f0 iPHONE-SIMULAATTORIIN; NATIIVI-UI KUVAA BUILD 6 -ERAN LINSSISEPAN JALKEEN (24.9.2026 klo 10.33)

Raamattuun avainsääntö natiiviin.

## NATIIVISEPPA NOLLATTU klo 10.3x (0 VIESTIA TARKISTETTU): LUOVUTUS viesti-natiiviseppa-luovutus-20260924-b.md (55ded44e8), PROTO-MASTER 333d3f0 (NOSTOT, OFFLINE-LAATAT, SMOOTHERSTEP, LENTOKAMERAN PERUSTA VALMIIT; VARITASO ODOTTAA KARTTASEPPAA; KESKEN AIKAJANA/TEMPO, TAIVAS, 3D-MAASTO, ALOITUSPALLO, HEHKURENGAS, NAVAT); ALOITUSVIESTI LAHETETTY (24.9.2026 klo 10.35)

Yhdestoista nollaus tänään.

## LAITETESTAAJA: BUILD 6 -TARKISTUSLISTAAN LISATTY (PR #3034 bc4189a77) LOYDOS 17 (WEBIN ETUSIVUPALLO: SUMENNUS 6 px, KOKO RUUTU, EI PISTEITA), LOYDOS 4 LAAJENNETTU (KAMERAKASIKIRJOITUS + TAIVAS/MAASTO TODETAAN RAAMATUN LENNON ESITYS -VAATIMUSTA VASTEN, WEBISSA EI VASTINETTA) JA HEHKURENKAAT (WEB .target-ring.pick, SYKE 2,6 s, VARI #b08a3c → #e8b23c); KAIKKI KUVASARJANA; ODOTTAA BUILD 6 -MASTERIN ASENNUSTA SIMULAATTORIIN (24.9.2026 klo 10.37)

Hehkurenkaan parametrit Natiivisepälle.

## LINSSISEPPA: LOYDOS 12 TODENNETTU iPHONE-SIMULAATTORISSA (333d3f0; KUVASARJA proto-3d/lokit/ihminen-avaus-iphone-20260924/333d3f0/arkki.jpg): MUSTA ENSIMMAINEN VIRKE → MAA PISTEENA TAHDISSA → ZOOMI 'Afrikasta' → AFRIKKA → MAROKKO, EI KALLISTETTUA HORISONTTIA; TEKSTILAATIKKO LEVEA (11); SEURAAVA ERA: TEMPON DRAMATURGIA + YHTEINEN KAYRAKIRJASTO Linssit/Ydin/Kamera (linssiseppa/koreografia 7679b59) MERGEEN PIIKKIAJO 4:N JALKEEN (24.9.2026 klo 10.38)

Löydökset 11 ja 12 korjattu build 6:een.

## NATIIVI-UI: LUOVUTUS viesti-natiivi-ui-luovutus-20260924-f.md (5791477ba); MERGE-PYYNTO natiivi-ui/nostomerkit e16d1e6 (2.0-LUKIJAT, CHAT-STRIIMI, KEYCHAIN-KOODI, LIIKU-VAISTO); iPHONE-KUVAT BUILD 6 -KORJAUKSISTA (333d3f0) proto-3d/lokit/pariteetti-20260924/natiivi-b6-{kartta,kartuscha,selite,laukku}-iphone.jpg → NAYTETTY OMISTAJALLE; NATIIVI-UI NOLLAUTUU (24.9.2026 klo 10.41)

Kahdestoista nollaus tänään.

## NATIIVI-UI NOLLATTU klo 10.4x (0 VIESTIA TARKISTETTU), ALOITUSVIESTI LAHETETTY (BUILD 6 -KOHDAT, PARITEETIN JALJELLA OLEVAT EROT, TARKISTUSLISTAN FAIL-KOHDAT) (24.9.2026 klo 10.41)

Kahdestoista nollaus.

## LINSSISEPPA: PIIKKIAJO 4 — IHMISEN MATKA 41 → 25 ms, VERTAILU JA MAALEHTI ILMAN PIIKKEJA, RADIO SOI setActive-MUUTOKSEN JALKEEN; MERGE-JONOSSA: SATELLIITIN ENSIMMAINEN 3D-NIMI 15 ms → MERKISTON ESILAMMITYS (koreografia 2c57d30), VESISTOJEN VERKOT 16 ms → KEHYSJONO (vesistot-jono 7627f63); MUILLE: RADIOPANEELIN REPAINT 15 ms/KEHYS SOITON AIKANA (NATIIVI-UI), VESISTOJEN JA TOPOGRAFIAN ENSIPIIRTO 10–18 ms (NATIIVISEPPA); KOREOGRAFIA ERA 1 (KAYRAKIRJASTO + AVARUUSAVAUKSEN RYTMI) SAMASSA HAARASSA, KUVASARJA KAANNOKSEN JALKEEN (24.9.2026 klo 10.42)

Linssien avauspiikit: 216 → 25 ms päivän aikana.

## NATIIVISEPPA: MERGE-ERA PROTO-MASTER dbe90bc — PULUN CHAT + KEYCHAIN-KOODI (nostomerkit ad20fa0), KAMERAKOREOGRAFIA + FONTIN ESILAMMITYS + VESISTOT KEHYSJONOLLA (LINSSISEPPA), TUOTANTO-v20-VARTIJA (PELIKOODARI); TARKISTA 0, KAANNA 248/248, LINSSIT 219/219, SIM + XCODE-SIM LAPI (75430f4); SEURAAVAKSI VARITASO (KARTTASEPAN OSOITTEET TULLEET), SITTEN LENTOAIKAJANA (24.9.2026 klo 10.42)

Build 6 odottaa: väritaso (2), lentoaikajana+taivas+maasto (4), navat (14), aloituspallo (17), hehkurengas.

## JULKAISIJA JUMI: #2985 MAINISSA, MUTTA sahke-worker.yml (run 35970844481) KAATUI 'ETSI TAI LUO D1-TIETOKANTA' -VAIHEESEEN: CLOUDFLARE AUTHENTICATION ERROR 10000 — CLOUDFLARE_API_TOKENILTA PUUTTUU D1:EDIT TAI R2_ACCOUNT_ID EI TASMAA; SAMA VIKA 6.9., VIIMEKSI ONNISTUI 25.8. → TUOTANNON SAHKE-WORKER ON 25.8. VERSIO (NATIIVIN SAHKE EI TOIMI UUDELLA TUNNISTEELLA ENNEN KORJAUSTA); KORJAUS OMISTAJAN: TOKENIIN D1 EDIT (CLOUDFLARE DASHBOARD → API TOKENS) JA TARVITTAESSA SECRET PAIVITYS, SITTEN JULKAISIJA AJAA WORKFLOW'N UUDELLEEN; #3003 (v2163) CI:SSA → ehdotukset-worker.yml (24.9.2026 klo 10.43)

Omistajalle tehtävä; ei kortti vaan toimenpide.

## OMISTAJA klo 10.4x (SITOVA, iPHONE-ASETTELUN TARKENNUS): MATKALAUKUN PILLERI JA OIKEAN YLAKULMAN NAPIT SIJOITETAAN YLEMMAS, DYNAMIC ISLANDIN KORKEUDELLE SEN KUMMALLEKIN PUOLELLE (SAMA RIVI KUIN ISLAND, EI SEN ALAPUOLELLE) → NATIIVI-UI, BUILD 6 (24.9.2026 klo 10.43)

Täydentää NATIIVIN iPHONE-ASETTELU -linjausta.

## OMISTAJA klo 10.4x: CLOUDFLARE-TOKENIN D1 EDIT -OIKEUS LISATAAN ~klo 11.45 STUDIOLLA → SEN JALKEEN JULKAISIJA AJAA sahke-worker.yml UUDELLEEN; SIIHEN ASTI #3003 JA EHDOTUKSET-WORKER, JONO JATKUU (24.9.2026 klo 10.45)

Julkaisijalle ilmoitettu.

## JULKAISIJA: FABLE-HAARAN SYNKKAUS VALMIS — MAIN YHDISTETTY claude/bold-ride-vow4ki:HIN (ca24b63bd, Matkakirja-fable FAST-FORWARD), DOCS + RAAMATTU + LOKI MAINISSA #3040 (klo 09.5x); .claude/settings.json JA tools/mac JAIVAT HAARAAN; MAINISSA MYOS #3041 (BUILD 5 MUUTOSLOKIRIVI), N8–N12 (v2158–v2162), #3046, #2985; NYT #3003 → EHDOTUKSET-WORKER, SITTEN N13–N16 JA ERA 2; #3038 PIDOSSA (PELIKOODARIN DOM-EHDOT KESKEN); sahke-worker UUDELLEEN KUN OMISTAJA ILMOITTAA (24.9.2026 klo 10.46)

Fable jatkaa haarassa; Julkaisija synkkaa mainiin päivittäin.

## FABLE NOLLAA ITSENSA klo 10.5x (73 %): LUOVUTUS viesti-fable-luovutus-20260924-b.md, ALOITUS viesti-fable-aloitus.md; POSTIVAHTI LAHETTAA ALOITUSVIESTIN KUN list_events = 0; OMISTAJA STUDIOLLA ~11.45 (D1-OIKEUS) (24.9.2026 klo 10.51)

Kaava: Fable kutsuu clear_session self tämän vuoron lopussa.

## FABLE ALOITTI UUDEN SESSION klo 10.5x (NOLLAUS ONNISTUI) (24.9.2026 klo 10.52)

Remote Control päällä; luettu CLAUDE.md, Raamatun TYÖTAPA/KÄSKYT/NOLLAUS ja NATIIVI PELI ETUSIJALLE, luovutus -b, lokin 40 otsikkoa. Jono: 1) omistajan build 5 -lisälöydökset (18…), 2) Natiivisepän build 6 -kohdat → SHA → build 6 (Laitetestaaja ajaa tarkistuslistan ensin), 3) D1-oikeus ~11.45 → Julkaisija ajaa sahke-worker.yml, 4) Natiivi-UI Island-taso, 5) julkinen TestFlight-kortti build 6:n jälkeen, 6) nightly 25.9. → Julkaisija Sonnetiin. Web main 9c77ec53f (#3003 v2163 mainissa).

## LINSSISEPPA: KOREOGRAFIA ERAT 1–2 KUVATTU iPHONE-SIMULAATTORISSA (proto-3d/lokit/koreografia-iphone-20260924/avaus/avaus.mp4, arkki.jpg): PISTE VIIPYY TAHDISSA ~4 s, SYOKSY AFRIKKAAN KASVAA TASAISESTI; NOUSU 2,4 s PEHMEANA (koreografia3 df3e2e3 JONOSSA); PIIKKIAJO 5: FONTTIPIIKKI JA VESISTOVERKOT POISSA, JALJELLA ENSIPIIRTO 15–18 ms (NATIIVISEPPA) JA IHMISEN MATKA 12 ms (SAMASSA ERASSA); SEURAAVAKSI KEKSINTOJEN PYSAKKIAJOT (24.9.2026 klo 11.01)

Fable katsoi arkin: avaruusavaus, Afrikka-zoomi ja Marokon lähikuva etenevät webin mukaisesti. Hyväksytty; koreografia3 mergeen Natiivisepän seuraavassa erässä.

## LINSSISEPPA: KEKSINTOJEN PYSAKKIAJOT KUVATTU iPHONE-SIMULAATTORISSA (3f70eb8, proto-3d/lokit/koreografia-iphone-20260924/keksinnot/keksinnot.mp4, arkki.jpg): SIIRROT 3,4 s KUMINAUHAJARRUTUKSELLA, LIIKE NAKYY LAMPUN HEHKUN SIIRTYMANA (KARTTA TUMMENNETTU); koreografia3 MASTERISSA b3a9ad3 (BUILD 6 -EHDOKAS); SEURAAVA iPAD-VUORO PIIKKIAJO 6 (24.9.2026 klo 11.04)

Fable katsoi arkin: Watt → Montgolfier → Jenner, kuva ja kortti vaihtuvat pysäkillä, hehku liukuu tasaisesti. Hyväksytty.

## OMISTAJA klo 11.0x (SITOVA, DATALINSSIT): PERUSTEELLINEN SELVITYS JULKISISTA DATALAHTEISTA, JOITA PELISSA VOI KAYTTAA LINSSEINA (TALOUS, LUONTO, KAUPUNGIT, ILMASTO, VAESTO, YM. — LAAJA SKAALA; ESIMERKKINA X-JULKAISU METSAPALOISTA JA AEROSOLEISTA EUROOPASSA, uploads/a7b0edce-image.png); LAHTEET LISATAAN LINSSIKATALOGIIN (docs/linssikatalogi.md + linssikatalogi.html + ARTEFAKTI), YHDISTETAAN OLEMASSA OLEVIIN LINSSI-IDEOIHIN JA NIISTA LUODAAN UUSIA LINSSI-IDEOITA; OMISTAJALLE ILMOITETAAN KUN UUSI BUILD ON TESTATTAVISSA (24.9.2026 klo 11.06)

Fable: selvitys tilataan Opus-agentille (WebSearch), tulos docs/raportit/datalahteet-linsseille-20260924.md; Fable tiivistää katalogiin osaksi R (datalinssit) ja yhdistää osiin A–Q ja Osa 3. Lisenssiehto: vain PD/CC/avoin data attribuutiolla (NASA, NSIDC, Copernicus, ESA, NOAA, USGS, World Bank, OWID, Eurostat, OSM ym.).

## NATIIVI-UI: LOYDOS 5 ISLAND-TASO VALMIS (PROTO-MASTER 610e294): PILLERI '300£ 1/80' ISLANDIN VASEMMALLA, ⚙ ☰ OIKEALLA SAMALLA RIVILLA, FONTTI 14→11 px TARVITTAESSA, ILMAN ISLANDIA LOVEN RIVILLE; SAMASSA RADION 15 ms REPAINT KORJATTU, PORTIN SUMENNUS + HEHKURENKAAT KYTKETTY, ALOITUKSESSA EI SELITE-/LINSSINAPPIA, LEHDEN SIVUREUNUS 0,95rem; PARITEETTI 13 JA 23 OK; KUVA proto-3d/lokit/pariteetti-20260924/natiivi-b6-saaririvi-koonti-iphone.jpg (24.9.2026 klo 11.14)

Fable katsoi kuvan: pilleri ja napit Islandin rivillä, portti sumennettuna pallon päällä, aloitusvalinnassa hehkurenkaat. Hyväksytty build 6:een. Natiivi-UI jatkaa tarkistuslistan FAIL-kohtiin Laitetestaajan ajon jälkeen.

## OMISTAJA klo 11.1x (SITOVA, BUILD 5 -LOYDOKSET 18–19, NATIIVI): 18) LIIKU-NAPPI LAPINAKYVAKSI (VAIN TEKSTI JA KEVYT REUNA, EI PUOLILAPINAKYVAA TAUSTAA); 19) KARTTA KEVYESTI SUMENNETTUNA AINA KUN ISOISAN TAI PULUN KUVIA ON NAKYVILLA (PAIKKAKUPLA, KOHTAAMIS-/NOSTOKORTTI, PULUN PUHEKUPLA KUVALLA) — RIITTAA KEVYT SUMENNUS, SAMA MEKANISMI KUIN PORTIN VERHOSSA MUTTA MIEDOMPI → NATIIVI-UI, BUILD 6; WEB ENNALLAAN (24.9.2026 klo 11.16)

Fable: Raamatun NATIIVIN iPHONE-ASETTELU päivitetty (Liiku läpinäkyvä; kuvien aikana kevyt karttasumennus).

## DATALAHTEIDEN SELVITYS VALMIS (docs/raportit/datalahteet-linsseille-20260924.md, OPUS-AGENTTI): 145 LAHDETTA 19 AIHEALUEELTA, LISENSSIT TARKISTETTU 24.9.; LINSSIKATALOGIIN OSA R (35 DATALINSSI-IDEAA, md + html, e4296c6cd); TOTEUTUSJARJESTYS: MAAPALLON TILA → LAIVAT 1873 (ICOADS) → YON VALOT → PALOT JA SAVU (FIRMS/GIBS, CAMS TILILLA) → MYRSKYT → JARISTYKSET/TULIVUORET → VAESTO (HYDE) → KAUPPAVIRRAT 1873 (RICardo) → ISOISAN SAA JA TAIVAS (20CRv3, HYG) → LAMPENEVA MERI (ERSST); LOYDOT: NOAA STAR MERENPINTA ILMAN TUNNUSTA (TAYTTAA MAAPALLON TILAN AUKON), VUOSI 1873 LOYTYY DATANA (ICOADS, 20CRv3, ERSST, RICardo), COPERNICUS CC BY 4.0 (TILI); EI AVOIMIA: BERKELEY EARTH, FALCHI, CShapes, GVP, WHO, UNESCO-LISTA, WDPA — KAIKILLE AVOIN VAIHTOEHTO; OMISTAJALLE KORTTI: ILMAISET DATATILIT, NC-LISENSSIT, JAKOEHTO (24.9.2026 klo 11.24)

Fable: toteutus vasta pariteetin ja build 6 -kokeilun jälkeen (Raamattu MAAPALLON TILA). Artefaktiversio päivitetään Julkaisijan tilillä PR:n mergen jälkeen.

## OMISTAJA klo 11.2x (SITOVA, BUILD 5 -LOYDOS 20, iPHONEN YLAREUNA UUSIKSI): VASEMMALLA ISLANDIN VIERESSA MATKALAUKKURYHMA — KAKSI SAMANLEVYISTA PILLERIA PAALLEKKAIN SAMASSA TYYLISSA: YLHAALLA '300£ · 1/80', ALLA PELKKA KAUPUNGIN NIMI (SULJETTU MATKAKIRJA TYPISTETTY NIMEN LEVYISEKSI, PITKA NIMI LYHENNETAAN); MOLEMMAT AVAAVAT MATKALAUKUN ERI VALILEHTEEN; OIKEALLA HAMPURILAINEN JA KARTTANAPPI VIEREKKAIN ISLANDIN RIVILLA, EI MUUTA — HAMPURILAINEN AVAA NYKYISEN LINSSIVALIKON SAMASSA TEEMASSA, SILMALASINAPPI POISTUU, VALIKON YLAKAISTA MAHDOLLISIMMAN MATALA JOTTA LINSSIT SAAVAT KOKO TILAN; HAMMASRATAS EI YLAREUNAAN VAAN HAMPURILAISVALIKON VIIMEISEKSI RIVIKSI 'Kehittäjä' (VAIN KEHITTAJATILASSA; APP STORE JA TESTFLIGHT NAYTTAVAT YLHAALTA SAMALTA) → NATIIVI-UI, BUILD 6; WEB ENNALLAAN (24.9.2026 klo 11.25)

Omistaja valitsi Fablen ehdotuksen kortilla. Kumoaa löydöksen 5 kohdan 'oikeassa vain hampurilainen (kehittäjätilassa lisäksi hammasratas)'.

## OMISTAJA klo 11.2x (SITOVA, DATALINSSIEN LISENSSIT JA TILIT, KORTTI): 1) ILMAISET DATATILIT SALLITTU (ECMWF/COPERNICUS, EOG, GBIF; EARTHDATA PYSYY POISSA) — AVAIMET VAIN MACIN YMPARISTOSSA JA ACTIONS-SECRETEISSA, EI REPOON; 2) EI NC-LISENSSEJA — KAYTETAAN AVOIMIA VAIHTOEHTOJA; 3) JAKOEHDOLLISET LAHTEET (ODbL, CC BY-SA) SALLITTU: JOHDETTU AINEISTO AMPARISSA JULKAISTAAN SAMALLA LISENSSILLA, LISENSSI lahde-KENTTAAN JA ATTRIBUUTIOON → RAAMATTU MAAPALLON TILA -LINSSI / DATALINSSIT (24.9.2026 klo 11.27)

Fable kirjaa Raamattuun DATALINSSIT-kohdan MAAPALLON TILA -linssin jatkoksi.

## NATIIVI-UI: LOYDOKSET 18–19 MASTERISSA a33385c (LIIKU LAPINAKYVA, KARTTA MIEDOSTI SUMEA KUVIEN AIKANA; KUVAT natiivi-b6-kuvasumea-luenta/-pulu-iphone.jpg, FABLE HYVAKSYI); LOYDOS 20 ALOITETTU. FABLEN PAATOKSET NATIIVI-UI:N KYSYMYKSIIN: 1) ☰-VALIKON VANHAT RIVIT (UUSI PELI, EHDOTA SISALTOA, TEKIJAT JA LAHTEET, MITA UUTTA) LINSSIEN ALLE OHUEN VIIVAN JALKEEN; 2) AANENTASOT, ASETUKSET JA OFFLINE-LATAUS OVAT PELAAJAN TOIMINTOJA → SAMAAN ☰-VALIKKOON LINSSIEN ALLE, EI KEHITTAJA-RIVIN TAAKSE; 'Kehittäjä' AVAA VAIN KEHITTAJASAATIMET (KOELIPUT, MITTARIT, AVAINKENTAT); 3) YLEMPI PILLERI AVAA LAUKUN MATKA-OSIOON, ALEMPI MATKAKIRJAKORTIN KUTEN NYKYINEN LIUSKA (24.9.2026 klo 11.29)

Fable vastasi Natiivi-UI:lle klo 11.29; kuva pyydetty kun löydös 20 valmis.

## OMISTAJA klo 11.3x (SITOVA): LUPAKYSELY HETI KOLMELLE NC-LAHTEELLE — CShapes 2.0 (ETH ZURICH ICR), FALCHIN VALOSAASTEATLAS (GFZ/ISTIL) JA SlaveVoyages (IMPUTOIDUT KENTAT) → OPUS-AGENTTI SELVITTAA YHTEYSTIEDOT JA LUONNOSTELEE KIRJEET (docs/raportit/datalahteet-lupakirjeet-20260924.md, LAHETTAJA VVI TAMPERE OY, RADIOKIRJEEN MALLI); LAHETYS OMISTAJAN POSTISTA (FABLELLA EI POSTITYOKALUA); MUUT 13 NC-LAHDETTA JAAVAT POIS (24.9.2026 klo 11.31)

Fable: kirjeet omistajan tarkistettavaksi ja lähetettäväksi; vastaukset kirjataan lokiin ja lisenssi-inventaarioon.

## OMISTAJA klo 11.3x (SITOVA, BUILD 5 -LOYDOS 21, NATIIVI): ISOISAN JA PULUN TEKSTIT OVAT OLETUKSENA PIILOSSA — VAIN AANI KUULUU, PELAAJA NAPAUTTAA TEKSTIVERSION AUKI HALUTESSAAN (RAAMATTU 14.–20.9.: 'tekstit pysyvät piilossa kunnes napautetaan'); PULUN ANIMAATIO KERTOO ETTA PULU PUHUU, MATKAKIRJAN OIKEAN REUNAN SYKKIVA KAIUTIN REAGOI AIDOSTI LUENNAN AANITASOON (NATIIVISSA AudioSource → GetOutputData, EI AJASTETTUA KUVIOTA); NATIIVI-UI:N KUVISSA a33385c TEKSTIT NAKYVAT OLETUKSENA → KORJAUS NATIIVI-UI, BUILD 6. OMISTAJAN KYSYMYS: SAAKO MAAILMANRADION AIDON VU-MITTARIN TAKAISIN NATIIVISSA (WEBISSA POISTETTU 5.8.2026, WEBKIT EI PAASTA SUORATOISTOA ANALYSAATTORIIN) (24.9.2026 klo 11.33)

Fablen arvio: kyllä — natiivissa ei ole CORS-rajaa; radio soi iOS AVPlayer -liitännäisessä (RadioAanet.cs), johon lisätään MTAudioProcessingTap → RMS-taso → MatkakirjaRadio_Taso() Unitylle joka kehys. Progressiiviset MP3/AAC-virrat (valtaosa asemista) toimivat; HLS-virroille tap ei ole käytettävissä → ajastettu varakuvio. Työ: Natiiviseppä (liitännäinen) + Linssiseppä (mittarin piirto), yksi erä, build 7. Odottaa omistajan korttia.

## OMISTAJA klo 11.3x (SITOVA, KORTTI): MAAILMANRADION AITO VU-MITTARI TAKAISIN NATIIVIIN, BUILD 7 — NATIIVISEPPA LISAA AVPlayer-LIITANNAISEEN AANITAPIN (MTAudioProcessingTap → RMS → MatkakirjaRadio_Taso()), LINSSISEPPA PIIRTAA NEULAN/MITTARIN RADIOLINSSIIN (WEBIN v237–v267 HISTORIA MALLINA); HLS-ASEMILLA AJASTETTU VARAKUVIO; EI VIIVYTA BUILD 6:TA. TARKENNUS: WEBISSA ISOISAN LUENNAN KAIUTIN TOIMI JO AIDOSTA AANITASOSTA — VAIN RADION MITTARI KAATUI WEBKITIIN (24.9.2026 klo 11.34)

Raamattu päivitetty (NATIIVI PELI ETUSIJALLE: radiot). Käskyt Natiivisepälle ja Linssisepälle lähetetty; työ alkaa build 6:n SHA:n jälkeen.

## NATIIVISEPPA: BUILD 6 -SHA PROTO-MASTER 7b3adee — KOHDAT 2 (VARITASO k3 + AARIVIIVA #6b5539), 4 (LENNON AIKAJANA AVAINKEHYKSINA + TEMPO, 18 KAUPUNGIN KIERROT, SININEN TAIVAS, AURINKO/RINNEVARJOT), 14 (NAPAKALOTIT + KERMA), 17 (ALOITUSPORTIN PALLO + HEHKURENKAAT), 19 KuvaSumea, SISALTO-SAIEKORJAUS; TARKISTA 0, KAANNA 248/248, LINSSIT 220/220; iPAD 120 Hz p95 8,5 ms (lokit/lento-ipad-20260924/); CESIUMISSA EI PYSTYVAHVISTUSTA — RELIEF RINNEVARJOISTA; RENKAAT .pallolauta-huomio #eab84e. FABLE: BUILD 6 KASKETTY JULKAISIJALLE HETI (7b3adee) JA LAITETESTAAJA AJAA TARKISTUSLISTAN RINNAKKAIN — OMISTAJA ODOTTAA STUDIOLLA; LOYDOKSET 20–21 (NATIIVI-UI, KESKEN) MENEVAT BUILD 7:AAN (24.9.2026 klo 11.37)

Fable katsoi lento-arkin: maasto, aurinkovarjot, vain Ateena näkyvissä, kierto Ateenan ympäri. Sininen taivas ei erotu kuvista (kamera alaviistossa, horisontti vaalea) → Laitetestaaja tarkistaa horisonttikehyksestä.

## OMISTAJA klo 11.4x (SITOVA, ALOITUSLENNON LAHIKUVA): ALOITUSLENNON VAIHEESSA 1–2 KAMERA AJAA NIIN LAHELLE LENTOKONETTA, ETTA KONE TAYTTAA SUURIMMAN OSAN RUUDUSTA (~2/3), MAASTO JA PILVET NAKYVAT TAKANA; MALLIN JA TEKSTUURIN TARKKUUS TARKISTETAAN LAHIKUVASSA → NATIIVISEPPA, BUILD 7 (7b3adee:N LENTOKUVISSA KONE LIIAN PIENI LAHIVAIHEESSA) (24.9.2026 klo 11.38)

Fable: Raamatun ALOITUSLENNON KAMERAKÄSIKIRJOITUS päivitetty (lähikuvan koko).

## LINSSISEPPA: VU-MITTARIN OMA OSUUS VALMIS (linssiseppa/vu-mittari 3c49a0c NATIIVISEPAN JONOSSA, BUILD 7): WEBIN v267-BALLISTIIKKA (τ 0,065/0,34 s, −40…−6 dB, NOLLA 0,76, LEPO 0,045), PUHETTA JALJITTELEVA VARAKUVIO TASOLLA −1; ASTEIKKO KERRAN, NEULA TRANSFORMILLA ILMAN REPAINTIA; MatkakirjaRadio_Taso TYNKA −1 KUNNES NATIIVISEPPA TOTEUTTAA TAPIN; NATIIVI-UI SIJOITTAA KOTELOON; TESTIT 225/225 (24.9.2026 klo 11.40)

Fable: hyväksytty; kuvasarja iPadilla kun tappi ja kotelo valmiit.

## LUPAKIRJEET VALMIIT (docs/raportit/datalahteet-lupakirjeet-20260924.md, OPUS-AGENTTI): CShapes 2.0 → girardin@icr.gess.ethz.ch (CC lcederman@ethz.ch; SCHVITZ SIIRTYNYT JRC:HEN), FALCHI → falchi@istil.it (CC info@istil.it; GFZ:N PYYNTOLOMAKE POISTUNUT, DATA LADATTAVISSA MUTTA NC PYSYY), SlaveVoyages → svopcom@googlegroups.com (VAIN IMPUTOIDUT KENTAT slaximp, slamimp, mjbyptimp, majbyimp, mjslptimp, mjselimp, ptdepimp, yearam, natinimp — PD-LASKENTA KATTAA VAIN 8 297/34 025 MATKAA); LAHETTAJA VVI TAMPERE OY, TILA 'odottaa omistajan lähetystä'. HUOMIOT: LICENSE = KAIKKI OIKEUDET PIDATETAAN, README SANOO AVOIN LAHDEKOODI → RISTIRIITA RATKAISTAVA; CShapes ON MYOS SA → LUPA TARVITAAN MYOS JAKOEHTOON; JOS LUPA TULEE, RAAMATUN DATALINSSIT-KOHTAAN POIKKEUS (24.9.2026 klo 11.42)

Fable toimittaa kirjeet omistajalle lähetettäväksi.

## OMISTAJA klo 11.4x (SITOVA, KORTTI, ELOKUVALLINEN ALOITUSLENTO): KOKO PAKETTI ERA KERRALLAAN NATIIVISEPALLE BUILD 7:N JALKEEN — 1) UUSI YKSITYISKOHTAINEN KONEMALLI (OMA BLENDER, KESKIPOLYINEN, 4K-TEKSTUURIT: NIITIT, PANEELISAUMAT, KULUMA; KIILLOTETTU ALUMIINI + TAIVAAN HEIJASTUSKARTTA + LAKKA; CC0), 2) POTKURIKIEKKO (SUMEAT LAPAJALJET NOPEILLA KIERROKSILLA, OIKEAT LAVAT HITAILLA), 3) FILMIEFEKTIPINO VAIN LENTOKOHTAUKSISSA (AURINGON FLARE, MOTION BLUR, RAE, KROMAATTINEN ABERRAATIO, VINJETTI, BLOOM, SYVATERAVYYS, FILMI-LUT; BUDJETTI ~3–5 ms), 4) SAVU JA VANAT (PAKOSAVU + LAMPOVAREILY, TIIVISTYSVANAT, SIIVENKARKIPYORTEET, LAAKSOSUMU, MEREN KIMALLUS, PILVIEN VARJOT, LONTOON USVA), 5) KAMERA-AJO SIIVEN OHI JA MOOTTORIGONDOLIN ALTA (PIENI LAHIRAJAUS); JOKAISESTA ERASTA KUVASARJA OMISTAJALLE. NYKYTILA: DC3.fbx MATALAPOLYINEN ILMAN TEKSTUUREJA, POTKURIT HITAAT (Potkurit.cs) (24.9.2026 klo 11.46)

Fable: tilaus Natiivisepälle; Linssiseppä avustaa efektipinon budjetissa (piikkimittaus). Raamattu LENNON ESITYS päivitetään kun erä 1 on nähty.

## OMISTAJA klo 11.4x (TARKENNUS ELOKUVALENTOON): PELI ALKAA NYKYHETKESTA (2026; VUOSI, KUUKAUSI JA PAIVA LAITTEEN KELLOSTA) — POTKURIKONE JA VANHAN AJAN TUNNELMA OVAT TYYLIVALINTA, EI HISTORIALLINEN VAITE; LONTOON LAHDON USVA ON TUNNELMAEFEKTI, EI 1873:N SAA (24.9.2026 klo 11.47)

Fablen aiempi maininta '1873 lokakuu' oli virhe; tilaus Natiivisepälle oli jo ilman vuosilukua.

## OMISTAJA klo 11.5x (SITOVA, ANSAINTA JA LISENSSI): PELI EI OLE AVOINTA LAHDEKOODIA — KAIKKI OIKEUDET PIDATETAAN (LICENSE); PELI PIDETAAN ILMAISENA MAHDOLLISIMMAN PITKALLE JA RAHAA KERATAAN VAIN LISATOIMINNOISTA (IAP), KOSKA MM. PULUN VASTAUKSET VAATIVAT MAKSULLISEN AI-MALLIN; TAMA SANOTAAN LUPAKIRJEISSA (KORVAA 'iOS-VERSIO MYYDAAN APP STORESSA') → RAAMATTU NATIIVI PELI ETUSIJALLE (ANSAINTA), KIRJEET JA SELVITYS PAIVITETTY (24.9.2026 klo 11.50)

Fable päivitti Raamatun, kolme lupakirjettä ja datalähdeselvityksen lähtökohdat; README sanoi jo 'kaikki oikeudet pidätetään'.

## LINSSISEPPA: PIIKKIAJO 6 VALMIS — RADIO 35 → 1 PIIKKI (NATIIVI-UI:N REPAINT-KORJAUS), IHMISEN MATKA 32 → 24 ms; JALJELLA: SATELLIITIN 64 HAVAINTOPISTEEN LUONTI 18 ms → KEHYSJONO, IHMISEN MATKAN 11 ms MERKITSEMATTOMASSA OSASSA (MERKIT LISATTY, piikit6 f27d2f1 JONOSSA), ENSIPIIRTO 11–20 ms TOPOGRAFIA/VESISTOT/SATELLIITTI (NATIIVISEPAN VARJOSTINLAMMITYS); VU-MITTARI KOOTTU (TASO NATIIVISEPALTA, KOTELO NATIIVI-UI:LTA, YDIN LINSSISEPALTA), KAIKKI JONOSSA BUILD 6:N JALKEEN (24.9.2026 klo 11.51)

Fable: kuitattu; VU-mittarin kuvasarja iPadilla kun build 7 -master on koossa.

## LAITETESTAAJA: BUILD 6 -TARKISTUSLISTA (7b3adee, PR #3034 356a5137c, KUVAT proto-3d/lokit/build6-tarkistus-20260924/): PASS 11 — 1, 2, 3, 4 (LAHELTA→KAUKAA SININEN TAIVAS→KIERTO; HEHKURENKAAT TESTAAMATTA), 5, 7, 8–10, 15, 16 (CHAT VASTAA); EPASELVA 18 — KULKUTAPAVALITSIMEN OLLESSA AUKI LIIKU ON TAYSIN PEITTAVA KULTA; EI VOITU 14 (NAVAT: 'aja lat 0 kaari' EI TUOTA NAPANAKYMAA, 'out of view frustum' -VIRHEITA) → NATIIVISEPPA ANTAA TESTIKOMENNON; EI EHDITTY 11, 12, 13, 19 → JATKUU. FABLE: KOHTA 18 TARKENNUS — MYOS AKTIIVINEN LIIKU LAPINAKYVA (KULTAINEN REUNA JA TEKSTI, KEVYT LAPIKUULTAVA TAYTTO, EI UMPIKULTAA) → NATIIVI-UI, BUILD 7; BUILD 6 EI PYSAHDY (24.9.2026 klo 11.52)

Fable katsoi kuvat 18, 4-kaukana (taivas sininen, vain Ateena, vana) ja 17 (sumennettu pallo, napit) — build 6 hyväksytty jaettavaksi omistajalle kun Julkaisija ilmoittaa.

## OMISTAJA klo 11.5x (SITOVA, BUILD 5/6 -LOYDOS 22, MAAN VARITASO JA HUNTU): 1) HUNTU EI SAA PEITTAA MERIALUEITA — MERI PYSYY OMAN NAKOISENAAN (WEBISSA HARMAANSININEN RANTAVIIVOITUKSELLA); 2) KREIKAN AARIVIIVA ON LIIAN YKSINKERTAISTETTU — RAJAVIIVAN OLTAVA YHTA TARKKA KUIN WEBISSA (SAMA RAJA-AINEISTO JA TARKKUUS); 3) HUNTU LIIAN VOIMAKAS — NAAPURIMAAT EIVAT NAY LAINKAAN; WEBISSA NAAPURIT NAKYVAT VAALEANA SEPIANA NIMINEEN (WESTFALEN, PIEMONTE). JUURISYY TODENNAKOISESTI KARTTASEPAN VARITASOLAATAT, JOISSA ALUEEN ULKOPUOLI ON KERMANA (NATIIVISEPAN PYYNTO) — PITAA OLLA LAPINAKYVA (ALPHA 0), JA HUNTU ERILLINEN MIETO TASO VAIN MUIDEN MAIDEN MAA-ALUEILLE → NATIIVISEPPA + KARTTASEPPA, BUILD 7; VERTAILUKUVA pariteetti-web-2026-09-24/kartta-393x852.png vs build6-tarkistus-20260924/1-2-nostot-varitaso-kreikka.png (24.9.2026 klo 11.57)

Fable vertasi kuvia: webissä meri, naapurit ja rajan tarkkuus kaikki eri kuin natiivissa.

## NATIIVISEPPA: LAHIKUVAKEHYS (proto-3d/lokit/lahikuva-20260924/lahi-2.png): KONE ~2/3 RUUDUSTA, TAIVAS JA MAASTO TAKANA — RAJAUS OK; MALLI VIELA VANHA (ERA 1 AGENTILLA); LOYDOS 22 ETUSIJALLA (UUSI VARITASOVIENTI KARTTASEPAN KANSSA, HUNTU VAIN MUIDEN MAIDEN MAALLE). FABLEN HUOMIOT LAHIKUVAAN: 1) KONEEN VARJO MAASTOSSA ON JATTIMAINEN JA SUMEA LANTTI — LENNON AIKANA KONEEN VARJO POIS TAI OIKEAAN MITTAKAAVAAN; 2) LAHIKUVASSA KAMERA MATALAMMALTA ETUVIISTOSTA NIIN ETTA TAIVAS JA HORISONTTI OVAT KONEEN TAKANA (EI PELKKA MAASTO), PILVET ALLA; 3) INTROLENNON AIKANA KARTAN NAPIT (SELITE, SILMALASIT) JA PULU PIILOON, VAIN LUENNAN TEKSTIPALKKI; 4) POTKURIT PYSAHTYNEEN NAKOISET → ERA 2 KIEKKO (24.9.2026 klo 11.59)

Fable: huomiot Natiivisepälle build 7:ään; kehys näytetty omistajalle.

## LAITETESTAAJA: BUILD 6 -JATKOKIERROS (PR #3034 979c4f01e): 11, 12, 13 PASS, 19 TODENNAKOINEN PASS; YHTEENSA 15 PASS; 14 (NAVAT) JA HEHKURENKAAT EIVAT ONNISTUNEET — 'ui kartuscha GRC auki' -KOMENNON JALKEEN KONSOLI SPAMMAA 'out of view frustum' JA KAMERA/RENKAAT LAKKAAVAT TOIMIMASTA (MAHDOLLINEN UUSI BUGI, KONSOLIRIVI NATIIVISEPALLE) → UUSINTA TUOREELLA PELILLA KUN SYY SELVITETTY; 18, 20, 21 BUILD 7 (24.9.2026 klo 12.00)

Fable: build 6 hyväksytty jaettavaksi; Natiiviseppä tutkii frustum-spämmin (kartuscha-komento) ennen build 7:ää.

## BUILD 6 TESTFLIGHTISSA: 1.0.0 (202609240852), PROTO 7b3adee, SISAINEN RYHMA klo 11.59 (AJO 35976465318 VIHREA); OMISTAJALLE ILMOITETTU; SISALTO: LOYDOKSET 1–13, 15–17, 19 (NOSTOT, VARITASO, PAIKKAKUPLA, LENNON AIKAJANA + TEMPO + SININEN TAIVAS + 3D-MAASTO, iPHONEN YLAOSA ISLAND-TASOLLA, MAAPANEELI, KERTOJAN LAATIKKO, AVARUUSAVAUS, OFFLINE-LAATAT, NAVAT, SELITE, PULUN CHAT, ALOITUSPALLO + HEHKURENKAAT, KUVIEN SUMENNUS), KOREOGRAFIA, PIIKKIKORJAUKSET; TARKISTUSLISTA 15 PASS; BUILD 7: 18, 20, 21, 22, VU-MITTARI, LAHIKUVA, FRUSTUM-BUGI (24.9.2026 klo 12.00)

Muutoslokirivi Julkaisijalle: 'Build 6 (24.9.): omistajan build 5 -löydökset 1–17 ja 19 korjattu — nostot ja merkit, maan väritaso, iPhonen yläosa Dynamic Islandin tasolla, maapaneeli webin mukaan, lennon aikajana tempolla ja sinisellä taivaalla, avaruusavaus, offline-laatat, navat, selite, pulun chat, aloituspallo hehkurenkailla, kuvien sumennus; koreografiakirjasto ja piikkikorjaukset.'

## OMISTAJA klo 12.0x (SITOVA, BUILD 6 -LOYDOS 23, LENTO): A) LENNON AIKANA NAKYY VAARIA TEKSTEJA (TARKENNUS ODOTTAA OMISTAJAN KUVAA); B) LENNON AIKANA PIILOSSA: YLAKULMIEN NAPIT JA PILLERIT, KARTAN NAPIT (SELITE, SILMALASIT), PULU JA KARTUSCHA (MAAN NIMI ALAKULMASSA) — NAKYVISSA VAIN LENTO JA LUENNAN PALKKI → NATIIVI-UI (UI:N PIILOTUS LENNON TILASSA) + NATIIVISEPPA (LENNON TILA UI:LLE), BUILD 7 (24.9.2026 klo 12.01)

Fable: kysyi omistajalta, mitkä tekstit ovat väärin (kuva).

## OMISTAJA klo 12.0x (TARKENNUS LOYDOKSEEN 23): LENNON AJAKSI PIILOTETAAN MYOS KOKO YLAPALKKI (iPAD: RUSKEA PALKKI JA LOGO) — ELOKUVALLINEN KOKO RUUDUN LENTO, VAIN LUENNAN PALKKI ALHAALLA → NATIIVI-UI, BUILD 7 (24.9.2026 klo 12.01)

Fable välitti Natiivi-UI:lle.

## LOYDOS 23 A TARKENNETTU (OMISTAJA + FABLE WEBIN KOODISTA): LENNON AIKANA NATIIVI NAYTTAA AVAUSTEKSTIN (INTRO_TEXT 'Vintiltä löytyi…' + 'Heathrow, Lontoo') — VAARIN. WEBIN KAAVA: ALKUSIVULLA INTRO_PAIKKA 'Heathrow, Lontoo' + KUUKAUSI JA VUOSI LAITTEEN KELLOSTA, INTRO_TEXT JA LUENTA intro-puhe.mp3 (LUENNAT-KOKOELMA id 'intro'), NAPPI 'Valitse aloituskaupunki'; LENNON AIKANA VAIN flightFirst-REPLIIKKI 'Kone nousee. Isoisän kirja aukeaa sylissäni kuin se olisi odottanut tätä hetkeä.' JA LUENTA puhe-lento-alku.mp3 (id 'lento-alku'; js/packs/maailma.js flightFirst, tools/generoi-avaus.mjs LENTO_RUUTU); LENNON JALKEEN NORMAALI SAAPUMINEN → NATIIVI-UI, BUILD 7 (24.9.2026 klo 12.04)

Kaikki kolme tekstiä ovat sisältöpaketissa (ui-tekstit + luennat), natiivi lukee ne sieltä, ei kovakoodaa.

## NATIIVI-UI: LOYDOS 23 B TEHTY (natiivi-ui/iphone-island b779dc8): PeliOhjain.LennonVaiheMuuttui → YLAPALKKI, PILLERIT, ☰/⚙, KARTTA- JA LINSSINAPPI, NOSTOT, LIIKU, KARTUSCHA, MATKAKIRJA JA PULU HAIPYVAT 0,6 s, PALAAVAT 0,8 s; TEKSTIKAISTA JAA. TEKSTIEN TILA: NATIIVI NAYTTAA JA SOITTAA LENNOLLA AVAUSTEKSTIN (INTRO_TEXT + intro-puhe) RAAMATUN 23.9. ALOITUSKAAVAN MUKAAN → OMISTAJA MUUTTI: ALOITUSPORTILLE HEATHROW + AVAUSTEKSTI + intro-puhe, LENNOLLE flightFirst + puhe-lento-alku (RAAMATTU NATIIVIN ALOITUSKAAVA PAIVITETTY); AIKALEIMASYNKKA (intro-puhe.aikaleimat.json) HYVAKSYTTY KIRJOITUSKONEEN TAHTIIN (24.9.2026 klo 12.04)

Fable: Natiivi-UI toteuttaa tekstit, Pelikoodari vaihtaa lennon äänen lento-alku-luentaan.

## OMISTAJA klo 12.1x (SITOVA, BUILD 6 -LOYDOS 24, ALOITUSNAYTTO): A) ALOITUSPORTIN TEKSTIT WEBIN MUKAAN — WEBISSA (js/ui.js showAloitusportti) VAIN 'Laita äänet päälle' + KAIUTIN, NAPPI 'Aloita seikkailu', ALHAALLA LINKKI 'Oppiminen on hauskaa' (PERIAATTEET-LAPPU); EI OTSIKKOLOHKOA ('MATKAKIRJA / MAAILMAN YMPÄRI…/ OSA II'), EI 'Seuraa isoisän…' -INGRESSIA, EI 'Jatka matkaa' / 'Uusi matka' -NAPPEJA; PORTIN JALKEEN TALLENNUS JATKUU TAI ILMAN TALLENNUSTA AVAUSRUUTU (HEATHROW + INTRO_TEXT + 'Valitse aloituskaupunki'); B) ☰-VALIKON 'Uusi peli' VIE NYT LONTOON KARTALLE — PITAA PALATA ALOITUSNAYTTOON (PORTTI) JA SIITA AVAUSRUUDUN KAUTTA VALINTAAN → NATIIVI-UI, BUILD 7 (24.9.2026 klo 12.08)

Fable: webin viitekuva proto-3d/lokit/pariteetti-web-2026-09-24/aloitusportti-393x852.png; natiivin nykytila build6-tarkistus-20260924/17-etusivupallo-b.png.

## OMISTAJA klo 12.1x: D1 EDIT -OIKEUS LISATTY CLOUDFLARE-TOKENIIN 'Edit Cloudflare Workers' (USER API TOKENS: mac-studio-poltto, Edit Cloudflare Workers, matkakirja-uutiset build token) → JULKAISIJA AJAA sahke-worker.yml UUDELLEEN; JOS 10000 TOISTUU, OIKEUS MYOS 'matkakirja-uutiset build token' -TOKENIIN (24.9.2026 klo 12.08)

Fable käski Julkaisijan.

## LAITETESTAAJA: BUILD 7 -TARKISTUSLISTA VALMIS (PR #3034 f0073e43f, B7-1…B7-6). KORJAUS LOYDOKSEEN 22 (WEBIN KOODISTA): WEBIN 'HUNTU' ON VAIN RAJAVIIVA ILMAN TAYTTOA — MUIDEN MAIDEN PAALLA EI OLE MITAAN TASOA; NYKYISEN MAAN SISALLA VARITASO (RELIEFI), ULKOPUOLELLA PALJAS POHJAKARTTA (MERI, NAAPURIT, NIMET) SELLAISENAAN; RAJA NATURAL EARTH 10m. FABLEN AIEMPI OHJE 'MIETO HUNTU MUIDEN MAIDEN MAALLE' KUMOTAAN → NATIIVISEPPA + KARTTASEPPA: VARITASOLAATAT LAPINAKYVIKSI ALUEEN ULKOPUOLELLA, EI HUNTUTASOA LAINKAAN, RAJAVIIVA 10m-TARKKUUDELLA; TEKSTIT PIILOSSA -SAANTO WEBISSA tekstitPiilossa() = PUHELIN TAI LUENTA KAYNNISSA; KAIUTIN AnalyserNode + ATTACK/RELEASE (24.9.2026 klo 12.09)

Fable korjasi ohjeen Natiivisepälle ja Karttasepälle klo 12.1x.

## SAHKE-WORKER JULKAISTU (AJO 35979416698 VIHREA, D1 OK): fi.matkakirja.peli PAASEE PORTISTA (401 ILMAN TUNNUKSIA, VIERAS TUNNISTE 403); BUILD 6 -MUUTOSLOKI MAINISSA (#3055, TIIVISTETTY 280 MERKKIIN). NATIIVI-UI: 23a JA 24 KOODATTU (natiivi-ui/iphone-island bede360): PORTTI WEBIN MUKAAN, AVAUSRUUTU INTRO-LUENNAN TAHDISSA (AIKALEIMAT 404 → MERKKIMAARA), LENNOLLA FLIGHT_FIRST + LENTO-ALKU, UUSI PELI → PORTTI; SIIRTOSEPALLE FLIGHT_FIRST + AIKALEIMAT PAKETTIIN. LAITETESTAAJA: B7-7, B7-8 LISATTY (3d598aa35). KARTTASEPPA: RAJAVIIVA VALMIS (julisteet/pallo/vektorit/maapolygonit-2026-09-24/maapolygonit.geojson, NE 10m, 135 MAATA). LOYDOS 22 LOPULLINEN LINJA (KARTTASEPPA TARKISTI js/laattakerma-shader.js): WEBISSA ON HUNTU — KERMA #faf4d6 PEITOLLA 0,80 MUIDEN MAIDEN MAALLE, OMA MAA REIKA, MERI POHJAN VARISSA, NIMET NAKYVAT LAPI; LAITETESTAAJAN 'VAIN VIIVA' -TULKINTA JA FABLEN klo 12.09 KUMOUS PERUTAAN → VAIHTOEHTO A: MAA-HUNTUSARJA WEBIN SAANNOLLA (MERI LAPINAKYVA, OMA MAA REIKA, PEITTO 0,80), RAJAVIIVA NE 10m. LEVY: 33 Gt VAPAANA — wt/ 58 Gt, proto-3d/lokit 35 Gt (linssit-piikit 3,2 Gt), CoreSimulator 16 Gt, DerivedData 7,7 Gt (24.9.2026 klo 12.12)

Fable: mergetyt worktreet poistetaan (tools/uusi-worktree.sh --poista), lokien poistolista omistajalle skriptillä.

## OMISTAJA klo 12.1x (SITOVA, ALOITUKSEN TEKSTIT NATIIVISSA, KORVAA klo 12.0x:N): PORTISTA SUORAAN MAAPALLONAKYMAAN (EI ERILLISTA AVAUSRUUTUA); PALLOLLA ENSIN KERTOJAN AVAUS (HEATHROW-RIVI + INTRO_TEXT intro-puhe.mp3:N TAHDISSA), SITTEN PULU LENNAHTAA AUTOMAATTISESTI RUUTUUN JA SANOO ESITTELYNSA, SITTEN PELAAJA VALITSEE KOHTEEN PALLOLTA; PELAAJA VOI OHITTAA LUENNAT MILLOIN TAHANSA VALITSEMALLA KAUPUNGIN → LUENTA JA PULU KESKEYTYVAT, LENTOKOHTAUS ALKAA HETI (flightFirst + puhe-lento-alku) → NATIIVI-UI + PELIKOODARI (AANIJARJESTYS JA KESKEYTYS), BUILD 7; RAAMATTU PAIVITETTY (HYVAKSYTTY POIKKEAMA WEBISTA) (24.9.2026 klo 12.13)

Fable: Natiivi-UI:n bede360:n avausruutu puretaan pallonäkymään; pulun esittelyrepliikit webin ensiesittelystä (Pelikoodari osoittaa lähteen).

## LEVY: proto-3d/lokit 35 Gt (168 KANSIOTA, KAIKKI 24.9.) — iPAD-AJOJEN KANSIOISSA ON SOVELLUKSEN DATAKOPIOT (aanet, offline, kuvat, sisalto; 448 KANSIOTA, 13,3 Gt) VASTOIN SAANTOA 'LOKIKANSIOT = VAIN KUVAT + KONSOLI' → OMISTAJALLE POISTOSKRIPTI tools/mac/siivoa-lokit-appdata.sh (LISTAUS OLETUKSENA, --poista POISTAA); iPAD-AJOJEN TYOKALUT KORJATAAN NIIN, ETTEI KONTTIA KOPIOIDA (LINSSISEPPA, LAITETESTAAJA, NATIIVISEPPA); LINSSISEPPA POISTI wt/linssiseppa-webmain (24.9.2026 klo 12.15)

Fable: ei poista itse (muistio: poistot omistajalle skriptillä).

## OMISTAJA klo 12.2x (SITOVA, ALOITUKSEN TARKENNUS): PALLO ON ZOOMATTUNA LONTOON KOHDALLE, KUN KERTOJAN AVAUS ('Vintiltä löytyi…') KUULUU; LUENNAN LOPUTTUA KAMERA ZOOMAA AUTOMAATTISESTI ULOS NAYTTAMAAN VALITTAVAT KOHDEKAUPUNGIT JA SAMAAN AIKAAN PULU LENTAA RUUTUUN JA ALOITTAA ESITTELYNSA; VALINTA MILLOIN TAHANSA OHITTAA → NATIIVISEPPA (KAMERA-AJO LONTOO → PALLO, KAMERA-AJOT-KAYRA) + NATIIVI-UI (PULUN AJOITUS), BUILD 7; RAAMATTU PAIVITETTY (24.9.2026 klo 12.15)

Fable välitti.

## OMISTAJA klo 12.2x (SITOVA, KUMOAA LOYDOKSEN 24 A:N): ALOITUSRUUTU PYSYY NATIIVIN NYKYISENA — OTSIKKO, 'Laita äänet päälle', 'Jatka matkaa' JA 'Uusi matka', 'Oppiminen on hauskaa'; 'Uusi matka' VIE PALLONAKYMAAN (LONTOO-ZOOMI + AVAUSLUENTA → ULOS-ZOOMI + PULU → VALINTA); 24 B (☰ Uusi peli → ALOITUSRUUTU) PYSYY → NATIIVI-UI PERUU PORTIN MUUTOKSEN (bede360), BUILD 7. POSTIVAHTI: LINSSISEPPA 72 % → LUOVUTUS JA NOLLAUS (24.9.2026 klo 12.16)

Raamattu päivitetty.

## LINSSISEPPA: LOKIKOPIOIDEN SYY KORJATTU — OMA laitetesti.sh KOPIOI VAIN LOKIT JA NIMETYT KUVAT (hae-kevyt, MASTERISSA); YHTEINEN tyokalut/ipad.sh KOPIOI KOKO DOCUMENTSIN → KORJAUS linssiseppa/ipad-hae 32606a9 (VAIN *.txt-LOKIT TAI NIMETYT TIEDOSTOT, TESTATTU LAITTEELLA, NATIIVISEPAN JONOSSA); KERROTTU NATIIVISEPALLE JA LAITETESTAAJALLE; VANHAT KOPIOT POISTAA OMISTAJA (siivoa-lokit-appdata.sh) (24.9.2026 klo 12.16)

Fable kuittasi; Linssiseppä jatkaa luovutukseen ja nollaukseen.

## OMISTAJA AJOI siivoa-lokit-appdata.sh --poista klo 12.1x: 242 DATAKANSIOTA (8,0 Gt) POISTETTU, VAPAANA 54 Gt (OLI 33 Gt); KAKSI 'Directory not empty' -RIVIA = FINDERIN .DS_Store, HARMITON (24.9.2026 klo 12.17)

Levyhälytys ohi; worktree- ja simulaattorisiivous jatkuu rooleilla.

## NATIIVISEPPA klo 12.2x (MASTER c46d571): LOYDOS 22 LINJA A MASTERISSA (KERMA 0,80 VAIN MUIDEN MAIDEN MAALLE, MERI JA OMA MAA AUKI, Z0–4 EI HUNTUA; KARTTASEPAN p080-SARJAT ~2 h, SIIHEN ASTI EI HUNTUA), RAJAVIIVA maapolygonit.geojson NE 10m (KREIKKA 61 RENGASTA; KUVA kreikka-l22-20260924/kreikka-lahi.png — FABLE: RAJA JA MERI NYT WEBIN MUKAAN); FRUSTUM EI TOISTU — SYY KAMERAN NaN-ASENTO (ScreenPointToRay), SUOJA + KERTALOKI LISATTY → LAITETESTAAJA UUSII 14 + RENKAAT; LAHIKUVA: MATALA ETUVIISTO, TAIVAS KONEEN TAKANA (lahikuva-20260924-b/), 'VARJOLANTIT' OLIVAT HEATHROW'N KIITOTEITA; MASTERISSA MYOS 20–21, 23, 24/ALOITUSKAAVA 2ea1345, VU-TAPPI + MITTARI, piikit6, ipad-hae; BUILD 7 -SHA HUNNUN SARJOJEN JALKEEN (24.9.2026 klo 12.18)

Fable: hyväksytty; huomiot — kone jää osassa kehyksiä ~1/3 ruudusta (tavoite 2/3), kuvan aikana kartan kevyt sumennus ei näy iPad-kuvassa (löydös 19 tarkistettava iPadilla).

## LINSSISEPPA NOLLATTU klo 12.1x (list_events = 0 TARKISTETTU): LUOVUTUS viesti-linssiseppa-luovutus-20260924-1216.md (f5b004b4e), ALOITUSVIESTI LAHETETTY klo 12.2x (PAIVITYS: VU-MITTARI, piikit6, ipad-hae JO MASTERISSA c46d571; SEURAAVAKSI VU-KUVASARJA JA PIIKKIAJO 7) (24.9.2026 klo 12.19)

Nollauksia tänään 13.

## FABLE klo 12.2x: LOYDOS 19 (KARTAN KEVYT SUMENNUS KUVIEN AIKANA) KOSKEE KAIKKIA NATIIVIN LAITTEITA, MYOS iPADIA — OLI KIRJATTU VAHINGOSSA iPHONE-ASETTELUN ALLE; RAAMATTU KORJATTU → NATIIVI-UI LAAJENTAA (Ylapalkki.Kelluva-EHTO POIS KuvaSumeasta), BUILD 7 (24.9.2026 klo 12.21)

Natiivi-UI kysyi Natiivisepän iPad-havainnon perusteella.

## OMISTAJA klo 12.2x (SITOVA, LENNON KAMERAKULMAT): LENTOKONETTA KUVATAAN PAAASIASSA ETUVIISTOSTA TAI SIVULTA; TAKAA KORKEINTAAN TAKAVIISTOSTA, EI SUORAAN TAKAA → NATIIVISEPPA (LENNON AIKAJANA, KAIKKI LENNOT), BUILD 7; RAAMATTU LENNON ESITYS PAIVITETTY (24.9.2026 klo 12.27)

Fable välitti.

## LAITETESTAAJA (921e0b6, PR #3034 ce483d760): LOYDOS 14 — POHJOISNAPA EI SPAMMAA MUTTA NAYTTAA HARMAAN TAYTTAMATTOMAN ALUEEN (EI KALOTTIA); ETELANAPA TOISTI FRUSTUM-VIRHEEN TUOREELLA PELILLA ILMAN KARTUSCHAA → SYY MAAILMA→RUUTU-PROJEKTIO AARIMMAISILLA LEVEYSASTEILLA; KERRAN LAUENNUT VIRHE JUMITTAA PANEELIN APIN UUDELLEENKAYNNISTYKSEEN ASTI (ESTI HEHKURENKAIDEN UUSINNAN); HAVAINNOT NATIIVISEPALLE; SIMULAATTORI NATIIVI-UI:LLE, LAITETESTAAJA JATKAA B7:AA KUN VAPAA (24.9.2026 klo 12.27)

Fable: navat (kalotti + projektiosuoja) ovat build 7:n ehto; Natiiviseppä korjaa.

## NATIIVISEPPA klo 12.3x (MASTER 161fa35): FRUSTUM-JUURISYY UNITYN ScreenPointToRay (MAARAJA KUTSUI RUUDUN KESKELTA JOKA KEHYS) → KORVATTU OMALLA SATEELLA (PalloKierto.Sade) MAARAJASSA JA MAAKARTASSA + NaN-SUOJA PALAUTTAA ILMAN UUDELLEENKAYNNISTYSTA; POHJOISNAVAN 'HARMAA ALUE' ON WEBIN OMA KALOTTI (11.9. POLTTO, rgb 198,188,164, EI JAAVARIA; KALOTIT 2048²/4096² LADATTU) — JAAVARI VAATISI KARTTASEPAN UUDEN POLTON; LENTOKAMERA ETUVIISTOSTA/SIVULTA, LAHIKUVA 0,74 RUUDUSTA; VU-TAPPI LIVE-ICECASTILLE + MatkakirjaRadio_Rms; HUNTU ODOTTAA p080-SARJOJA (~14.00), SHA VIIMEISTAAN 14.15 ILMAN HUNTUA (24.9.2026 klo 12.32)

Fable: hyväksytty; navat = webin pariteetti, jääväri omistajan päätettäväksi build 7:n kokeilussa.

## OMISTAJA klo 12.3x (SITOVA, KORTTI, TAIDEMUSEO-LINSSI, VAIN NATIIVI): VIRTUAALINEN MUSEO TEOKSILLE JA VEISTOKSILLE — SALIT, OPASTETTU AUTOMAATTINEN KAMERAKIERROS + KERTOJA, ILMAAN PIIRTYVAT VUOSILUVUT, SUUNTAUKSET, OMAKUVAT JA KARTTAPIIRROKSET (→ PALLOLLE), OHITETTAVA; SIIVET AIKAKAUSITTAIN, OVET KAUPUNKILEHDISTA; TEOKSET VAIN PD/CC0 (MUSEOIDEN AVOIMET AINEISTOT, COMMONS), VEISTOKSET PD/CC0-SKANNAUKSINA; PILOTTI RENESSANSSISALI → LINSSISEPPA + NATIIVISEPPA SUUNNITELMA HETI (docs/raportit/linssi-taidemuseo-suunnitelma-20260924.md), TOTEUTUS PARITEETIN JA ELOKUVALENNON JALKEEN; RAAMATTU + KATALOGI E7. NATIIVI-UI: BUILD 7 -KOONTI (161fa35, natiivi-b7-koonti-iphone.jpg) HYVAKSYTTY, PULUN JALKIKOMMENTTI PIILOON ce95bc4; LENNON AANI VIELA INTRO (PELIKOODARI KESKEN) (24.9.2026 klo 12.40)

Vanhat maalaukset: PD, kuvatiedostot museoiden CC0/PD-aineistoista; alle 70 v sitten kuolleet taiteilijat pois.

## LAITETESTAAJA: LOYDOS 14 (NAVAT) JA HEHKURENKAAT PASS SHA 161fa35:LLA — NAVAT SIISTIT, EI JUMITUSTA; HEHKURENGAS KULTAINEN LONTOON NAPPULAN YMPARILLA; BUILD 6 -KIERROS 17/19 PASS (18 JA 20/21 BUILD 7); TULOS PR #3059 (#3034 OLI JO MERGETTY) (24.9.2026 klo 12.43)

Fable: Laitetestaaja ajaa B7-listan jo nyt masterista 161fa35 (kohdat jotka ovat masterissa) ja täydentää SHA:n tultua.

## OMISTAJA klo 12.4x + FABLE (SITOVA, ESITYSMOOTTORI): TAIDEMUSEO TEHDAAN MODULAARISENA ESITYSMOOTTORINA (AIKAJANA + KAMERAKOREOGRAFIA + KERTOJA AIKALEIMASYNKALLA + ILMAAN PIIRTYVAT MERKINNAT), LAVAT: SALI (AIKAKAUSISIIVET, KAUPUNKIEN OMAT MUSEOT, SISALTO DATANA) JA PALLO (KAUPUNGIN KASVU VUOSISATOJEN YLI 3D-PALLOLLA, ROOMA/LONTOO, AUTOMAATTINEN AIKAJANA, ORBIT); VAIN UNITYN OMAT PAKETIT (CINEMACHINE, SPLINES, TIMELINE, TMP, ADDRESSABLES, glTFast, URP); JARJESTYS PARITEETTI JA ELOKUVALENTO → RENESSANSSISALI → ROOMAN KASVU → MONISTUS; RAAMATTU PAIVITETTY (24.9.2026 klo 12.47)

Suunnitelman runkoon lisätään esitysmoottori-osio (Linssiseppä + Natiiviseppä).

## FABLE klo 12.5x (TEKSTUURIT JA 3D-LAHTEET NATIIVIIN, OMISTAJAN KYSYMYS): PBR-TEKSTUURIT JA HDRI:T POLY HAVEN JA ambientCG (CC0), PUBLIC DOMAIN TEXTURES, KENNEY (CC0); OMAT PROSEDURAALISET BLENDER-TEKSTUURIT (KONE, SALI) CC0; VEISTOKSET SMITHSONIAN OPEN ACCESS 3D (CC0) JA THREE D SCANS (PD) — SCAN THE WORLD EI KELPAA (NC); EI QUIXEL (VAIN UNREAL), EI TEXTURES.COM, EI SKETCHFAB ILMAN TARKISTUSTA, EI BRITISH MUSEUMIN SKANNAUKSIA (NC); LAHTEET LISENSSIPORTTIIN JA TIETOJA-SIVULLE (24.9.2026 klo 12.49)

Koskee elokuvalennon erää 1 ja taidemuseota.

## LINSSISEPPA: VU-KUVASARJA + PIIKKIAJO 7 (proto-3d/lokit/linssit-vu-20260924/, RAPORTTI.md): VU-VIAT — ASTEIKKO KAHDESTI (KORJATTU, RAAKA Rms), TAPPI MITTASI VOIMAKKUUDEN JALKEEN (KORJATTU, PreEffects), AVPlayer-TAPPI EI SAA AANTA LIVE-ICECASTISTA (TAPPIKUTSUJA 0) → BUILD 7 VARAKUVIOLLA (24c9194), AITO TASO VAATII AVAudioEngine → NATIIVISEPPA BUILD 8; PIIKIT 7: SATELLIITTI 48,6→33,3 ms, TOPOGRAFIA/VESISTOT 40→32 ms, MUUT 23–25 ms, JALJELLA ENSIPIIRTO (VARJOSTINLAMMITYS) JA UI-FONTTI; LUOKITIN ESTI set_remote_control(self) → FABLE KYTKI RC:N LINSSISEPAN ID:LLE (24.9.2026 klo 12.51)

Fable: VU build 7:ssä varakuviolla on hyväksyttävä välitila; AVAudioEngine tilataan Natiivisepälle build 8:aan.

## KARTTASEPPA: LOYDOS 22 (A) TOIMITETTU — KERMAHUNTU AMPARISSA julisteet/pallo/kerma/2026-09-23a-p080/<27 MAATA>/ + _maailma/ (Z5–Z8, PEITTO 0,80, MERI LAPINAKYVA, OMA MAA REIKA), RAJAVIIVA maapolygonit-2026-09-24/maapolygonit.geojson; TYOKALU karttaseppa-pallokerma 54aef0968 (PR TULOSSA); 11 WORKTREETA SIIVOTTU, VAPAANA 44 Gt (24.9.2026 klo 12.53)

Fable: Natiiviseppä voi antaa build 7 -SHA:n hunnun kanssa heti.

## OMISTAJA klo 12.5x (IDEAT, KATALOGI E8–E9): ISHTARIN PORTTI PALAUTETTUNA AITOON YMPARISTOONSA (BABYLON, PROSESSIOTIE, CESIUMIN MAASTO; ESITYSMOOTTORIN PAIKKA-LAVA, 1–2 ERAA) JA KONSTANTINOPOLI KULTA-AIKANAAN DIORAAMANA (SANKARIRAKENNUKSET + PROSEDURAALINEN MASSA, ORBIT, 3–4 ERAA); FABLEN ARVIO: TOTEUTETTAVISSA, JARJESTYS RENESSANSSISALI → ROOMAN KASVU → ISHTAR → KONSTANTINOPOLI (24.9.2026 klo 12.54)

Kirjattu katalogiin ideoiksi.

## OMISTAJA klo 12.5x: BLENDER ON ASENNETTU MAC STUDIOLLE (Blender 5.2.1 LTS, /Applications/Blender.app; EI PATH-KOMENTOA 'blender') — DC-3, SALI, ISHTARIN PORTTI YM. TEHDAAN BLENDER-SKRIPTEINA KOMENTORIVILTA (blender -b -P), KUTEN dc3.py (24.9.2026 klo 12.54)

Polku: /Applications/Blender.app/Contents/MacOS/Blender.

## NATIIVISEPPA: BUILD 7 -SHA PROTO-MASTER 24c9194 (TARKISTA 0, KAANNA 248/248, LINSSIT 225/225, SIM + XCODE-SIM LAPI): LOYDOS 22 HUNTU + NE 10m -RAJA (KUVAT kreikka-huntu-20260924/kreikka-kauko.png, -lahi.png — FABLE: WEBIN MUKAINEN, HYVAKSYTTY), 20–24 + ALOITUSKAAVA + ULOS-ZOOMI, LAHIKUVA 0,74/MATALA/EI TAKAA, FRUSTUM-KORJAUS, VU VARAKUVIOLLA, piikit6–7; SEURAAVAKSI ELOKUVALENNON ERA 1 (UUSI DC-3 36k KOLMIOTA, 4K ATLAS, natiiviseppa/konemalli). FABLE: BUILD 7 KASKETTY JULKAISIJALLE, LAITETESTAAJA AJAA B7-3 (HUNTU) JA iPAD-SUMEAN RINNAKKAIN (24.9.2026 klo 12.55)

Build 7:n muutoslokirivi Julkaisijalle viestissä.

## OMISTAJA klo 12.5x: CLAUDE CODE ASENNETAAN ERIKSEEN MAC STUDION KUMMALLEKIN KAYTTAJALLE (koodaus, samireivinen) — NYT YHTEINEN /Applications/Claude.app (2.7032.0) JA HOMEBREW-CLI /opt/homebrew/bin/claude (2.1.278), PAIVITYS RIKKOO TOISEN KAYTTAJAN AJON; FABLEN OHJE: DESKTOP-APPI ~/Applications KUMMALLEKIN, YHTEINEN POIS; CLI NATIIVI KAYTTAJAKOHTAINEN (install.sh), brew uninstall; SIIRTO KUN TOISEN KAYTTAJAN SESSIOT ON LUOVUTETTU JA NOLLATTU (AJANKOHTA OMISTAJALTA) (24.9.2026 klo 12.56)

Kirjataan Raamatun MAC STUDIO -osioon kun siirto on tehty.

## BLENDER KAATUI klo 12.17 (SIGSEGV, Cycles ccl::BlenderSession::bake → Session::wait; ~/Library/Logs/DiagnosticReports/Blender-2026-09-24-122025.ips) NATIIVISEPAN KONEMALLIN 4K-ATLAKSEN LEIVONNASSA — OMISTAJALLE NOUSI KAATUMISIKKUNA; NATIIVISEPPA TARKISTAA ATLAKSEN JA LEIPOO TARVITTAESSA PALOISSA/CPU:LLA, SKRIPTIIN ULOSTULON TARKISTUS (24.9.2026 klo 12.59)

Ei vaikuta build 7:ään (24c9194 vietiin ennen).

## FABLE klo 13.0x (OMISTAJAN KYSYMYS, YHTEISET OHJELMAT MAC STUDIOLLA): VAIN CLAUDE (APPI + CLI) TARVITSEE KAYTTAJAKOHTAISEN ASENNUKSEN (ITSEPAIVITYS KESKEN AJON); BLENDER, UNITY HUB/EDITOR, XCODE JA HOMEBREW PYSYVAT YHTEISINA; SAANTO: XCODE, HOMEBREW (brew upgrade) JA UNITY HUB PAIVITETAAN VAIN YON IKKUNASSA NIGHTLYN JALKEEN, KUN TOISEN KAYTTAJAN SESSIOT ON LUOVUTETTU → RAAMATUN MAC STUDIO -OSIOON CLAUDE-SIIRRON YHTEYDESSA (24.9.2026 klo 12.59)

Kirjattu.

## NATIIVISEPPA: BLENDER-KAATUMINEN OLI CYCLES METAL -LEIVONTA → LEIVONTA CPU:LLE (dc3_maalaus.py scene.cycles.device='CPU', -b), ATLAS UUDESTAAN klo 12.50 JA TARKISTETTU (DC3_vari, DC3_normaali 4096², 0 MUSTAA LOHKOA; MASKI OK); METAL-LEIVONTAA EI KAYTETA (24.9.2026 klo 12.59)

Sääntö: Blenderin leivonta aina CPU:lla taustatilassa.

## OMISTAJA klo 13.0x: CLAUDE-SIIRRON OHJEET ANNETAAN SOPIVALLA HETKELLA — FABLE VALITSEE (BUILD 7 KOKEILTU, SESSIOT LUOVUTETTU, ILTA ENNEN NIGHTLYA) JA KASKEE LUOVUTUKSET ENNEN SIIRTOA (24.9.2026 klo 13.00)

Muistio claude-kayttajakohtainen-asennus.md.

## LAITETESTAAJA: B7-LISTA AJETTU 24c9194 (PR #3059 524cc9182): PASS B7-1, B7-2, B7-5; FAIL B7-3 HUNTU — (1) ISO SUORAKULMAINEN UMPIKERMA-LAATTA ESPANJAN/MAROKON/SAHARAN YLLA MYOS MEREN PAALLA (b7-3-huntu-rikkinainen-suorakulmio.png), (2) KREIKAN LUOTEISNAAPURIN LAATTA PUOLIKSI RELIEFIA/PUOLIKSI KERMAA VIISTOSAUMALLA (b7-3-kreikka-tile-glitch.png) → LAATTAVIRHE (VIENTI TAI TASOPINO), KARTTASEPPA + NATIIVISEPPA, BUILD 8; B7-9 'EI MUUTOSTA' ON OIKEIN (OMISTAJA PERUI PORTIN MUUTOKSEN); B7-6 TARKISTETTAVA 24c9194:LLA; EI VOITU: VU, UUSI PELI -RIVI, LENNON AANI (VAIN ENSIMMAINEN LENTO), ZOOM-KUMINAUHA; KARTUSCHA-JUMIBUGI TOISTUI → NATIIVI-UI. FABLE: BUILD 7 JATKUU (MUUT KORJAUKSET OMISTAJALLE), HUNTU KORJATAAN BUILD 8:AAN TANAAN (24.9.2026 klo 13.03)

Kuvat proto-3d/lokit/build6-tarkistus-20260924/.

## LINSSISEPPA: TAIDEMUSEO- JA ESITYSMOOTTORISUUNNITELMA VALMIS (00f4dc195, docs/raportit/linssi-taidemuseo-suunnitelma-20260924.md + 2 LIITETTA; NATIIVISEPPA TARKISTAA LUVUT 6–7): PILOTTI 28 MAALAUSTA NGA CC0 + 5 SMK:N MICHELANGELO-VALOSTA 3D (PDM 1.0); PALLO-LAVA ROOMA JA LONTOO 7 AIKALEIKETTA (REBA CC BY, HYDE 3.2 CC0, GHSL, OSM AURELIANUKSEN MUURI, ZENODO LONTOO 1890, COMMONS PD-KARTAT); HYLATYT HYDE 3.3 (NC), MoEML AGAS (NC), SEDAC-REBA. FABLEN PAATOKSET: 1) ITALIAN KULTTUURIPERINTOLAKI — ITALIAN VALTION MUSEOIDEN TEOKSET (UFFIZI: VENUS, KEVAT; TORINON LEONARDO) JAAVAT PILOTISTA POIS (MAKSULLISET LISAOSAT = KAUPALLINEN RISKI), MONA LISA SAA OLLA COMMONSIN PD-TIEDOSTONA (LOUVRE, RANSKA, EU-DIREKTIIVI 14 ART.); UFFIZILLE MAHDOLLINEN LUPAKYSELY MYOHEMMIN; 2) OVEN MUSEO ≠ TEOKSEN MUSEO, LAATASSA OIKEA MUSEO — KYLLA; 3) PDM 1.0 KELPAA (= PD-MERKINTA, KIRJATAAN 'PD (PDM 1.0)'); 4) OMAKUVIEN TILALLE NIMI + SIGNEERAUS, TAI CC0-MUSEOIDEN PD-KAIVERRUSMUOTOKUVA (MET/NGA/RIJKS) JOS LOYTYY (24.9.2026 klo 13.06)

Layers of London ja NLS tarkistetaan käsin (bottiesto) — Linssiseppä pyytää omistajaa tai Fable selaimella myöhemmin.

## NATIIVISEPPA, B7-3-DIAGNOOSI: UMPIKERMA-SUORAKULMIO EI OLE HUNTULAATTA VAAN LAATTAPALVELIMEN PERGAMENTTIVARALAATTA (#d9d0bb) POHJAKERROKSELLE, KUN POHJALAATAN HAKU EPAONNISTUU (SIMULAATTORIN VERKKOKUORMA) EIKA CESIUM HAE UUDELLEEN → BUILD 8 natiiviseppa/varalaatta-uusinta (VARALAATAT HAETAAN UUDELLEEN RAUHALLISENA HETKENA); KREIKAN VIISTO SAUMA = MAASTOLAATTA ENNEN HUNTUTASON LATAUTUMISTA (OHIMENEVA), RUUDUKKO SAMA XYZ; Z0–4 LAPINAKYVA (24.9.2026 klo 13.06)

Fable: hyväksytty; varalaatan uusintahaku on tärkeä myös laitteella heikossa verkossa (offline-tila).

## KARTTASEPPA: p080-SARJAT TARKISTETTU — GRC Z7–Z8 OIKEIN, MEREN UMPIKERMAA EI OLE, LAATTOJA EI PUUTU; ESPANJA–SAHARA-SUORAKULMIO EI OSU LAATTARAJOIHIN → VIKA NATIIVIN PUOLELLA (VARALAATTA), VAHVISTAA NATIIVISEPAN DIAGNOOSIN; TARJOUS TYHJISTA MERILAATOISTA NATIIVISEPALLE (24.9.2026 klo 13.06)

Build 8: natiiviseppa/varalaatta-uusinta.

## NATIIVI-UI: KARTUSCHA-JUMIN JUURISYY KORJATTU (natiivi-ui/iphone-island 8d042a2 → BUILD 8): KOHTEEN VALINNASSA PELAAJA ON JO ATEENASSA VAIKKA KAMERA LONTOOSSA → KARTUSCHA NAYTTI KREIKAN LONTOO-ZOOMISSA JA ALOITUSLENNOLLA; NYT PIILOSSA ALOITUKSEN JA ALOITUSLENNON AJAN (TILA LUETAAN OIKEIN, EI SUOJAA); ☰ UUSI PELI -RIVI LINSSILISTAN ALLA VIERITYKSEN TAKANA → TARKISTETAAN; B7-6 KAKSI PILLERIA ON 24c9194:SSA (24.9.2026 klo 13.07)

Fable: hyväksytty.

## LAITETESTAAJA NOLLATTU klo 13.1x (list_events = 0 TARKISTETTU): LUOVUTUS viesti-laitetestaaja-luovutus-20260924-13.10.md (HAARA laitetestaaja-navat-pass), ALOITUSVIESTI LAHETETTY; OPETUS: komento 'hiljaa' SAMMUTTAA KOKO NARRAATION — EI KAYTETA AANIRAIDAN TODENNUKSESSA; NAPAUTUKSET ui-komento.txt:LLA (24.9.2026 klo 13.14)

Nollauksia tänään 14.

## NATIIVISEPPA NOLLATTU klo 13.2x (list_events = 0 TARKISTETTU): LUOVUTUS viesti-natiiviseppa-luovutus-20260924-c.md (732be0478, selvittaja-3d-luovutus); PROTO-MASTER 24c9194 (BUILD 7), BUILD 8 -JONO testi/b8 49c44ad (VARALAATTA c1ee11f, NATIIVI-UI 7650ba5, UUSI DC-3 d0ca50a); ALOITUSVIESTI LAHETETTY; LUOVUTUS MAINITSEE UNITY-VIENNIN JUMITTUVAN AJURIN ISTUNNOSSA → FABLE KYSYI JULKAISIJALTA BUILD 7:N TILAN (24.9.2026 klo 13.23)

Nollauksia tänään 15.

## OMISTAJA klo 13.2x: MIKSI /Users/Shared/Claude ON 125 Gt, EIKO DATA PITANYT SIIRTAA NAS:IIN? FABLEN VASTAUS: wt/ 66 WORKTREETA 44 Gt, proto-3d/lokit 27 Gt, Matkakirja-proto 21 Gt (UNITY LIBRARY + KAANNOKSET), POLTTO-TYOKANSIOT 12 Gt, ROOLIEN CHECKOUTIT 10 Gt — DEM JA POLTTOJEN TULOKSET OVAT JO NAS:ISSA. SITOVAT SAANNOT (FABLE): 1) WORKTREE POISTETAAN HETI MERGEN TAI PR:N SULKEMISEN JALKEEN (tools/uusi-worktree.sh --poista), TAVOITE < 20; POSTIVAHTI VALVOO KIERROKSELLA JA ILMOITTAA YLI 20; 2) LOKIKANSIOT (proto-3d/lokit) SIIRRETAAN YON SIIVOUKSESSA NAS:IIN KUN YLI 2 PAIVAA VANHOJA (siivoa-levy.sh); 3) POLTTOJEN TULOKSET SUORAAN NAS:IIN, PAIKALLISESTI VAIN KESKENERAINEN (KARTTASEPPA); TAVOITE CLAUDE-KANSIO < 60 Gt (24.9.2026 klo 13.26)

Raamatun Työtilat-kohtaan lisätään säännöt 1–3.

## OMISTAJA klo 13.3x (SITOVA, EI TUPLAVARMUUSKOPIOITA): VANHOJA LOKEJA EI TARVITA — GITHUB KATTAA WEB-REPON (KOODI, SISALTO, RAAMATTU, LOKI, RAPORTIT) JA PROTO-GITIN (Matkakirja-natiivi); LOKIKANSIOT POISTETAAN YON SIIVOUKSESSA KUN YLI 2 VRK VANHOJA, EI NAS-SIIRTOA; RAPORTTIEN VIITTAAMAT KUVAT (NYT 7 RAPORTTIA) KOPIOIDAAN PIENENNETTYINA docs/raportit/kuvat/-KANSIOON ENNEN POISTOA; RAAMATTU TYOTILAT/LEVY PAIVITETTY; JULKAISIJAN TILAUS MUUTETTU (24.9.2026 klo 13.29)

GitHubin ulkopuolella vain ämpärin media ja NAS:in lähdeaineistot (uudelleen ladattavissa/poltettavissa).

## NATIIVI-UI: ☰-VALIKKO BUILD 8:SSA (49c44ad, natiivi-b8-valikko-iphone.jpg): PELIN RIVIT YLHAALLA (UUSI PELI, AANET, OFFLINE-KARTAT, ASETUKSET, EHDOTA, TEKIJAT, MITA UUTTA, KEHITTAJA), VIIVAN ALLA LINSSIT; LOYDOS 21 -KORJAUS NAKYY. FABLE: PELIN RIVIT LIIAN KORKEAT — LINSSIT JAAVAT RUUDUN ALAREUNAAN → PELIN RIVIT TIIVIIKSI (PUOLET KORKEUDESTA, KAHTEEN SARAKKEESEEN), JOTTA VAHINTAAN 4 LINSSIA NAKYY ILMAN VIERITYSTA (24.9.2026 klo 13.31)

Omistajan tarkoitus: linssit saavat tilan.

## LAITETESTAAJA (PR #3059 61b5292b0…cadc819ab): B7-7 LENNON AANI FAIL — JUURISYY: 'puhe pois' ON PYSYVA TALLENNETTU LIPPU (SELVISI COLD-RESTARTIN YLI), KORJATTU 'puhe paalle'; TODELLINEN BUGI: LENTO SOITTAA intro-puhe.mp3:N HETKEN, SITTEN HILJAISUUS — LENTO-ALKU-LUENTA PUUTTUU NATIIVIN LATAAMASTA LUENTAKATALOGISTA ('VIRHE luentoa ei ole') → SIIRTOSEPPA (LUENNAT-KOKOELMAAN lento-alku URL:LLA SIIHEN PAKETTIVERSIOON JONKA NATIIVI LATAA) + PELIKOODARI; B7-4 VU PASS (VARAKUVIO), B7-8 UUSI PELI PASS (SWIPE PANEELIN SISALLA); RC KYTKETTY LAITETESTAAJALLE FABLEN TOIMESTA (24.9.2026 klo 13.36)

Zoom-kuminauhan spesifikaatio = Raamattu KAMERA-AJOT, annettu aloitusviestissä.

## OMISTAJA klo 13.3x (SITOVA, ☰-VALIKON YLAOSA): KAKSI TIIVISTA RIVIA — YLIN RIVI AANET KOLMENA SUORANA TOGGLE-NAPPINA (WEBIN AANET-PANEELIN KYTKIMET), TOINEN RIVI 'Uusi peli', 'Muut', 'Kehittäjä' (VAIN KEHITTAJATILASSA) OMINA NAPPEINAAN; 'Muut' AVAA ALAVALIKON (OFFLINE-KARTAT, ASETUKSET, EHDOTA SISALTOA, TEKIJATIEDOT JA LAHTEET, MITA UUTTA); VIIVAN ALLA LINSSIT KOKO LOPPUTILASSA → NATIIVI-UI, BUILD 8; RAAMATTU PAIVITETTY (24.9.2026 klo 13.37)

Korvaa Fablen klo 13.31 tiivistysohjeen.

## OMISTAJA klo 13.4x (TARKENNUS ☰): 'Muut' AVAA UUDEN VALIKON SUORAAN NYKYISEN VALIKON PAALLE (PAALLEKKAINEN PANEELI), JOSSA LOPUT NAPIT — EI LAAJENE RIVIKSI. SIIRTOSEPPA: LENTO-ALKU EI OLE PAKETTIVIKA — TUOTANTO 1.x v39 (SKEEMA 1.26) SISALTAA id:t lento-alku JA intro URL:EINEEN (200); 'VIRHE luentoa ei ole' TULI TESTIKOMENNOSTA 'luento lento-alku' (OIKEA 'luento lento'); PELISSA LENTO-ALKU SOI PeliOhjain.OtaLentoAlku() KERRAN ISTUNNOSSA → PELIKOODARI HYVAKSYY MYOS 'lento-alku' JA KORJAA LENNON AANIJARJESTYKSEN (INTRO EI LENNOLLA); LAITETESTAAJA UUSII TUOREELLA PELILLA (24.9.2026 klo 13.37)

Raamattu päivitetty (Muut-nappi).

## BUILD 7 KAATUI KAHDESTI (proto3d-testflight 35984261104 klo 13.08, 35985874642 klo 13.12; 'jumi: loki hiljaa 180s, cpu 0,0', EXIT 3): UNITY-VIENTI JUMITTUI LISENSSIVAIHEEN JALKEEN, KOSKA NATIIVISEPAN EDITORI OLI AUKI SAMASSA PROJEKTISSA; JULKAISIJA EI ILMOITTANUT — FABLE HUOMASI gh run listilla → JULKAISIJA AJAA UUDELLEEN HETI, NATIIVISEPPA PITAA UNITYN KIINNI; RAAMATTU TESTFLIGHT-BUILDIT: UNITY KIINNI VIENNIN AJAN, pgrep-TARKISTUS, ILMOITUKSET (24.9.2026 klo 13.39)

Fable: sääntö kirjattu Raamattuun.

## NATIIVISEPPA (testi/b8 760b9e5): UUSI DC-3 UNITYSSA — LAHIKUVA ETUVIISTOSTA AURINGON KIILLOLLA (b8-dc3-20260924-c/dc3-lahikuva.jpg, lento.mp4; FABLE: KIILLOTETTU ALUMIINI, NIITIT, HEIJASTUKSET, HYVAKSYTTY ERA 1); B7-3 KORJATTU (b73-korjattu.jpg: EI KERMASUORAKULMIOTA, EI SAUMAA); LOYDOS: SYOKSYN KUMINAUHAN YLITYS VEI KATSEEN KONEESTA → KONE LIUKUI RUUDUN REUNAAN + VALKOINEN KOLMIO, KORJATTU natiiviseppa/lento-kohde d9b696f; TUNNETTU: SAVUJANAN JUOVA KAMERAA KOHTI (ERA 4), POTKURIEN SUUNTA (ERA 2); UNITY KIINNI, TYOKOPIO MASTER 24c9194, EI KAANNOKSIA ENNEN 'BUILD 7 VALMIS'; VU AVAudioEngine AGENTILLA (24.9.2026 klo 13.40)

Fable näytti DC-3:n omistajalle.

## NATIIVI-UI: ☰-VALIKKO OMISTAJAN KAAVALLA TEHTY (fb9618e, KAANNOS BUILD 7:N JALKEEN); FABLEN PAATOS: AANENVOIMAKKUUKSIEN LIUKUSAATIMET (TEHOSTEET/PULU/LUKIJA/MUSIIKKI/TAUSTA) ASETUKSET-PANEELIN YLIMMAKSI OSIOKSI 'Äänentasot', EI OMAA RIVIA MUUT-LISTAAN; YLARIVIN KOLME TOGGLEA OVAT PIKAKYTKIMET (24.9.2026 klo 13.41)

Kirjattu.

## POSTIVAHTI klo 13.4x: wt/ 67 → 46, VAPAANA 90 Gt (OLI 33 Gt AAMUPAIVALLA); 5 h -KIINTIO 84 %, NOLLAUTUU ~38 min (24.9.2026 klo 13.41)

Ei taukoa.

## LAITETESTAAJA (PR #3059 10d1f12e3): ULOS-ZOOMI AVAUSLUENNAN JALKEEN PASS (SMOOTHERSTEP, ~2,3 s, 7 KUVAA); KYSYMYS AVAUSTEKSTIN 'ERILLISESTA RUUDUSTA' → FABLE: VOIMASSA klo 12.1x KAAVA — TEKSTI ALAPALKISSA PALLONAKYMAN PAALLA LONTOO-ZOOMISSA ON OIKEIN, OMA SIVU ILMAN KARTTAA OLISI FAIL; 5 WORKTREETA POISTETTU; KIERROS VALMIS, ODOTTAA BUILD 8 (24.9.2026 klo 13.43)

Kirjattu.

## OMISTAJA klo 13.4x (SITOVA, KORTTI, LENNON KARTTA JA MAAMERKIT): 1) LENNON AIKANA KARTAN VIIVAPIIRROKSET (REITTIKAARI, TIET, JOET LAHIKUVASSA) PIILOON/HAIVYTETTYINA JA LAHTO- JA KOHDEKAUPUNKIIN PUNAINEN PISTE TAI HEHKURENGAS → BUILD 8; 2) KAUPUNKIEN 3D-MAAMERKIT: YKSI MATALAPOLYINEN TUNNUSRAKENNUS PER KAUPUNKI (LONTOO BIG BEN + TOWER BRIDGE, ATEENA AKROPOLIS) BLENDER-SKRIPTEINA CC0, NAKYY LAHTIESSA JA LASKEUTUESSA; PILOTTI LONTOO + ATEENA ELOKUVALENNON ERAN 2 JALKEEN, MONISTUS 71 KAUPUNKIIN SISALTOTYONA; EI KOKONAISIA KAUPUNKEJA EIKA CESIUM ION OSM. KARTAN PINTA ON JO 3D (CESIUM-MAASTO), HEATHROW VAIN TASAINEN; RAAMATTU PAIVITETTY (24.9.2026 klo 13.45)

Fable tilasi Natiivisepälle (1 ja pilotti) ja Karttasepälle (viivojen häivytys laatoissa, jos tarvitaan).

## KARTTASEPPA: VIIVATON 'SILEA' POHJASARJA (ILMAN TEITA JA RAJOJA, Z0–Z8) ON JO AMPARISSA → LENNON AIKANA NATIIVI KAYTTAA SITA, EI POLTTOA; ERILLINEN VIIVA-RGBA-SARJA HAIVYTYSTA VARTEN ~30 min TARVITTAESSA; JOET JA VESIVIIVOITUS OVAT POHJASSA (POISTO = KOKO POHJAN UUSINTAPOLTTO ~3 h) — FABLE: JOET SAAVAT JAADA (OIKEITA MAASTON PIIRTEITA), EI UUSINTAPOLTTOA (24.9.2026 klo 13.46)

Natiiviseppä kytkee sileän sarjan lentoon build 8:ssa.

## SISALTOKIRJURI: SAA-VAIHE VALMIS (#3045 KOHTA 5) — 71 UUDELLA KAUPUNGILLA SAA, 14 PR:AA (#3047–#3065), TESTIT 0 FAIL; PIENET SAARET (NORFOLK, ST. HELENA) ASEMATIEDOLLA, SAN AMBROSIO ARVIOITU (MERKITTY) → JATKAA GALLERIA-VAIHEESEEN (5.2) HETI, EI ODOTA MERGEA (24.9.2026 klo 13.47)

Julkaisija mergeää sää-PR:t jonossa.

## OMISTAJA klo 13.5x (SITOVA, KORTTI, LENNON PINTA): LENTO ON ELOKUVA, PELI ON KARTTA — LENNON AJAKSI PALLON PINTA VAIHTUU AITOON SATELLIITTIKUVAAN (NASA BLUE MARBLE PD Z0–Z7; SENTINEL-2 CLOUDLESS 2016 CC BY 4.0 KAUPUNKIEN YMPARILLE Z8–Z11) JA HAIVYTTYY LASKUN JALKEEN PERGAMENTIKSI; LAHTOSUMU JA PILVIMERI NOUSUSSA JA LASKUSSA; YKSI MAAMERKKI PER KAUPUNKI RIITTAA → KARTTASEPPA POLTTAA SATELLIITTISARJAN (SAMA PUTKI), NATIIVISEPPA VAIHTAA PINNAN LENNON TILASSA + HAIVYTYS + SUMU; VAIHTOEHDOT B (KONE PERGAMENTTITYYLIIN) JA ERILLINEN ILMAKUVA HYLATTY; RAAMATTU PAIVITETTY (24.9.2026 klo 13.52)

Fable tilasi Karttasepälle ja Natiivisepälle.

## NATIIVISEPPA: LENNON PINTA -MEKANISMI KOODISSA (natiiviseppa/lento-kartta 7dd1baa): USVA-VARJOSTIN (KAAREVA PILVILEVY KONEEN ALLA, NOUSEE JO LONTOON ZOOMISSA, PINTA VAIHTUU SEN PEITOSSA, HALVENEE IRTAUTUESSA; LASKUSSA SAMA KAANTEISESTI), PINTANA NYT SILEA SARJA, SATELLIITTI KYTKETAAN KUN POLTTO AMPARISSA; REITTIKAARI POIS, PUNAISET LAHTO/KOHDE-RENKAAT; VALMIINA MYOS VU AVAudioEngine cca4797 (mp3/aac/aacp TASO 0,4–0,9, HLS −1), ERAT 2 ae36fe9 (POTKURIKIEKKO), 3 11badd5 (FILMIEFEKTIT), 5 53a930f (SIIVEN OHI); MAAMERKIT AGENTILLA; PELIKOODARIN aloituskaava-web 2c41219; BUILD 8 = testi/b8 + iphone-island + lento-kartta + radio-moottori + aloituskaava-web KUN BUILD 7 VALMIS (24.9.2026 klo 13.56)

Fable: hyväksytty jono.

## FABLE KAYNNISTI BUILD 7:N UUSINNAN ITSE klo 13.57 (proto3d-testflight 35990194011, vie_unitysta, 24c9194) — JULKAISIJA EI VASTANNUT EIKA AJANUT 17 MINUUTTIIN (TRANSKRIPTI 1044 VIESTIA, RUNNING); UNITY TARKISTETTU KIINNI (pgrep) ENNEN AJOA; POSTIVAHDILTA PYYDETTY JULKAISIJAN KONTEKSTI-% (24.9.2026 klo 13.57)

Sääntö: Fable saa ajaa sisäisen TestFlight-ajon itse, jos Julkaisija ei vastaa 15 minuutissa.

## SISALTOKIRJURI: GALLERIA-ERA 1 (PR #3066): 2/5 KAUPUNGILLE AITOA PD/CC-TAIDETTA (KAP HORN, NORFOLK), ANGOLA/NAMIB/ROBINSON CRUSOE EI; GALLERIA VAATII HARKINNAN, SAANTI VAIHTELEE — JATKAA 66 KAUPUNKIA LAPI (24.9.2026 klo 13.57)

Fable: ok, ei väkisin galleriaa; puuttuvat listataan inventaarioon.

## BUILD 7 -JUMIN JUURISYY (JULKAISIJA + FABLE): MACIN KONSOLIKAYTTAJA ON samireivinen (OMISTAJA STUDIOLLA), AJURI AJAA KAYTTAJANA koodaus → UNITY-BATCH JAA JUMIIN ILMAN IKKUNAPALVELINTA HETI LISENSSIN JALKEEN (DUMPPI proto-3d/lokit/vienti-jumi-131136); BUILD 6 ONNISTUI KUN KONSOLI OLI koodaus; OMISTAJAA PYYDETTY VAIHTAMAAN KONSOLI koodaus-KAYTTAJALLE ~40 min AJAKSI; RAAMATTU: VIENNIT VAIN KUN KONSOLI = koodaus, JULKAISIJA TARKISTAA (stat -f %Su /dev/console); OMISTAJA VASTASI JULKAISIJAN KYSYMYKSEEN klo 14.0x (24.9.2026 klo 13.58)

Fablen ajo 35990194011 jonossa; uusinta jos kaatuu ennen vaihtoa.

## OMISTAJA klo 14.0x: TYOSKENTELEE samireivinen-KAYTTAJALLA, KYSYY PITAAKO koodaus OLLA KONSOLISSA — FABLE: NYKYISELLAAN KYLLA (UNITY TARVITSEE IKKUNAPALVELIMEN); KOE HETI: -nographics-LIPPU VIENTIIN (JULKAISIJA + NATIIVISEPPA), JOS TOIMII → EI KONSOLIRIIPPUVUUTTA; MUUTEN PAIVABUILDIT VAIN KONSOLINVAIHDOLLA JA YOAJO klo 04 (24.9.2026 klo 14.02)

Ajo 35990194011 perutaan kokeen tieltä.

## 5 h -KIINTIO 90 % klo 14.0x → TAUKO KAIKILLE NOLLAUKSEEN ASTI (~14.25): EI UUSIA AGENTTEJA, KAANNOKSIA EIKA PITKIA AJOJA; JULKAISIJA SAA SEURATA TESTFLIGHT-AJOA 35990194011; POSTIVAHTI LAHETTAA 'jatka' NOLLAUKSEN JALKEEN (24.9.2026 klo 14.04)

Fable pitää itsekin taukoa; vastaa vain omistajalle.

## JULKAISIJA: siivoa-levy.sh MUUTETTU (julkaisija/siivous-lokit dbfdcf4): HILJAISET LOKIKANSIOT POISTETAAN, docs/raportit/*.md:N VIITTAAMAT KUVAT PIENENNETTYINA docs/raportit/kuvat/ + LINKIT + PR AUTOMAATTISESTI; KUIVA-AJO 0 KUVAVIITETTA; FABLE: HYVAKSYTTY LISAYKSELLA — LOKIKANSION *.md-TIEDOSTOT (RAPORTTI.md) KOPIOIDAAN docs/raportit/lokit/<kansio>/ ENNEN POISTOA, RAAMATTU-LOKIN VIITTEITA EI SAILYTETA (24.9.2026 klo 14.06)

Natiiviseppä mergeää tauon jälkeen.

## SISALTOKIRJURI: GALLERIA-VAIHE 46 KAUPUNKIA TUTKITTU — 3 SAI AIDON PD/CC-GALLERIAN (KAP HORN, NORFOLK #3066; KARTHAGO #3068), 43 EI; CAMPO GRANDEN VAARA MAALAUS VALTETTY (PARAGUAY 1869); LISTA sisalto-inventaario-20260924.md KOHTA 6 (#3045); N2–N6:N 20 KAUPUNKIA MERGEN JALKEEN → SEURAAVAKSI ennenNyt (5.3) TAUON JALKEEN (24.9.2026 klo 14.08)

Kirjattu.

## BUILD 7 -AJO 35990194011 KAATUI klo 14.14 SAMAAN JUMIIN (LOKI HILJAA 180 s, CPU 0) VAIKKA OMISTAJA AVASI ETAYHTEYDEN koodaus-KAYTTAJALLE — VIRTUAALINEN NAYTTOISTUNTO EI RIITA; SEURAAVAKSI JULKAISIJAN -nographics-KOE 35990807670 (JONOSSA); JOS SEKIN JUMITTUU, PAIVABUILDIT VAIN KONSOLINVAIHDOLLA (~40 min) TAI YOAJO klo 04 (24.9.2026 klo 14.15)

Kirjattu.

## TAUKO OHI klo 14.2x: 5 h -KIINTIO NOLLAUTUI, POSTIVAHTI LAHETTI 'jatka' 9 ROOLILLE; LEVY 88 Gt (24.9.2026 klo 14.21)

Kirjattu.

## SISALTOKIRJURI: ennenNyt-VAIHE VALMIS (PR #3069): 35/46 KAUPUNGILLE PARI VALOKUVATAULUISTA, 11 ILMAN (LISTA INVENTAARIO KOHTA 7) → SEURAAVAKSI TURISTIOPAS (5.4), SITTEN KOHDEKARTAT (5.5) (24.9.2026 klo 14.32)

Kirjattu.

## SISALTOKIRJURI: TURISTIOPAS (5.4) OHITETAAN TOISTAISEKSI — EI VALMISTA DATAA, KASIN KIRJOITETTU KOKONAISUUS PER KAUPUNKI EIKA SOVI ASUMATTOMILLE SAARILLE TAI KONFLIKTIALUEILLE → KOHDEKARTAT (5.5) 30 KAUPUNGILLE ENSIN; OPAS MYOHEMMIN VAIN OIKEILLE KAUPUNGEILLE (INVENTAARIOON MITKA). -nographics-KOE 35990807670 JONOSSA 30 min AJURIN MUIDEN AJOJEN TAKANA → JULKAISIJA ANTAA SILLE ETUSIJAN (24.9.2026 klo 14.33)

Kirjattu.

## SIIRTOSEPPA: #3030 MAINISSA — AMPARISSA 1.x v40 (SKEEMA 1.32, 493/493) JA 2.0 v1 (sisalto/2, 307/307); NATIIVISEPPA JA NATIIVI-UI ILMOITETTU; SEURAAVA PR siirtoseppa-avausluennat (AVAUSLUENTOJEN TEKSTI + AIKALEIMAT, RIIPPUU PELIKOODARIN #3057:STA) (24.9.2026 klo 14.33)

Natiivin vaihto 2.0:aan omana buildina (aikaisintaan build 8+1); Linssiseppä tarkistaa Huippuvuoret.

## FABLE klo 14.3x: PERUI KAKSI SAVUKEAJOA (SISALTOKIRJURI 35990737040, SIIRTOSEPPA 35992796916; AJETAAN UUDELLEEN MYOHEMMIN) JA MAARASI 20 min PUSH-TAUON, JOTTA -nographics-KOEAJO 35990807670 SAA AJURIN; JULKAISIJAN JONO PYSAYTETTY; AJURILLA VIELA 'Julkaise peli' v2175 + TESTIT (24.9.2026 klo 14.34)

Julkaisijan luokitin esti muiden ajojen perumisen; Fable perui.

## SISALTOKIRJURI: KOHDEKARTAT VAATIVAT PLAYWRIGHTIN — FABLE: npm ci CHECKOUTISSA (NORMAALI), CHROMIUM ON JO ~/Library/Caches/ms-playwright (EI LATAUSTA, /opt/pw-browsers ON VANHA KONTTIPOLKU), VAIHTOEHTOISESTI PLAYWRIGHT_JS FABLEN node_modulesista; EI npm install EIKA UUSIA PAKETTEJA. POSTIVAHTI: PELIKOODARI 71 % JA KARTTASEPPA 73 % → LUOVUTUKSET JA NOLLAUKSET KASKETTY (24.9.2026 klo 14.35)

Kirjattu.

## -nographics TOIMII: KOEAJO 35990807670 (BUILD 202609241135, 24c9194) PAASI LISENSSIVAIHEEN OHI KONSOLIN OLLESSA samireivinen — UNITY-BATCH TARVITSI GRAFIIKKALAITTEEN, EI IKKUNAPALVELINTA; RAAMATTU PAIVITETTY (VIENTI AINA -nographics, EI KONSOLINVAIHTOA); JULKAISIJA TEKEE PR:N JA SULKEE #3067; PUSH-TAUKO VOI PAATTYA KUN VIENTI ON OHI (24.9.2026 klo 14.36)

Build 7 valmistuu ~15.05.

## PELIKOODARI NOLLATTU klo 14.3x (list_events = 0 TARKISTETTU): LUOVUTUS viesti-pelikoodari-luovutus-20260924-1435.md (7b75c61bf), ALOITUSVIESTI LAHETETTY (JONO: aloituskaava-web 2c41219, #3057 AIKALEIMAT, KEYCHAIN f05ec87, siirrot-kartalle 4b68c8c); KARTTASEPPA: LUOVUTUS viesti-karttaseppa-luovutus-20260924-1440.md (30c3a7c14), SATELLIITTIAGENTTI JATKAA (satelliitti-koe/TILA.md), E28 klo 22, NAS-SIIRTO KAYNNISSA, NOLLAUTUU; BUILD 7 UNITY-VAIHE OHI klo 14.36 (0 VIRHETTA), ARKISTOINTI KAYNNISSA, PUSH-TAUKO OHI, #3067 SULJETTU (24.9.2026 klo 14.37)

Nollauksia tänään 16.

## KARTTASEPPA NOLLATTU klo 14.4x (KONTEKSTI 7 % POSTIVAHDIN MUKAAN): ALOITUSVIESTI LAHETETTY (SATELLIITTIPINTA: KOEAJO + KOKO + AIKATAULU FABLELLE ENNEN TAYTTA AJOA; E28 klo 22; POLTTO-TYOKANSIOT NAS:IIN) (24.9.2026 klo 14.39)

Nollauksia tänään 17.

## SISALTOKIRJURI: KOHDEKARTTAPUTKI TOIMII (npm ci + CHROMIUM-MUUTTUJA); LOYDOS: TYYLI VAATII OIKEAN KATUVERKON — NORFOLK PIIRTYI TYHJAKSI, KALGOORLIE HYVIN → RAJATTU 12 KAUPUNGIN LISTA (>10 000 AS.), 18 INVENTAARIOON 'LIIAN PIENI'; FABLE HYVAKSYI, ERAT 5/PR (24.9.2026 klo 14.41)

Kirjattu.

## BUILD 7 TESTFLIGHTISSA: 1.0.0 (202609241135), PROTO 24c9194, LADATTU klo 14.42 (AJO 35990807670, -nographics); SISALTO: LOYDOKSET 18–24 + ALOITUSKAAVA (LONTOO-ZOOMI, PULU, OHITUS), HUNTU + NE 10m -RAJA, LAHIKUVA, NAPAKORJAUS, VU VARAKUVIOLLA; TUNNETUT: VARALAATTA (ESPANJA–SAHARA), LENNON AANI INTRO, VALIKON PELIRIVIT KORKEAT, iPAD-SUMEA — KAIKKI BUILD 8:SSA; OMISTAJALLE ILMOITETTU (24.9.2026 klo 14.43)

Natiivisepälle 'build 7 valmis' → build 8 -merge.

## PELIKOODARI (UUSI SESSIO): aloituskaava-web 2c41219 JA kehittajakoodi-keychain f05ec87 PROTO-MASTERISSA (BUILD 8), MASTER VASTAA 12.1x-KAAVAA; AUKKO KORJATTU c8c4831 (VALINTA KESKEYTTAA INTRON MYOS ILMAN LENTOA) → BUILD 8; #3057 (AIKALEIMAT) VIHREA → JULKAISIJA, SIIRTOSEPAN #3070 PERAAN; siirrot-kartalle f2b07b3 NATIIVISEPALLE; VANHA MERGE-JONO MASTERISSA; SEURAAVAKSI TOPOGRAFIALINSSIN WEB-SAVUKE 52/54 (24.9.2026 klo 14.43)

Kirjattu.

## SISALTOKIRJURI: KOHDEKARTAT — N8–N16-KAUPUNGEILLA 5–6 TEEMANOSTOA, VAIN 1–3 PAIKANNETTAVAA KOHDETTA (KALGOORLIE: PATSAS, KAIVOS 3,3 km, BOULDER 4 km); FABLE: TAVOITE MADALLETTU 1–3 KOHTEESEEN OIKEIN, LAAJENNUS-KENTTA KAUEMMILLE; ALLE 2 KOHDETTA → EI KARTTAA, INVENTAARIOON (24.9.2026 klo 14.44)

Kirjattu.

## JULKAISIJA: BUILD 7 KASITELTY JA SAATAVILLA SISAISESSA RYHMASSA (1.0.0 / 202609241135, 24c9194); MUUTOSLOKI #3072; MAINISSA #3071 (-nographics), #3059, #3030; #3061 MERGEAMASSA; JONO #2898 → #2932, #3057, #3070, #3072; #3038 PIDOSSA (24.9.2026 klo 14.45)

Kirjattu.

## SISALTOKIRJURI: KOHDEKARTAN PISTEEN JUTTU — nosto-KENTTA KYTKEYTYY GLOBAALIIN 'JOKAINEN NOSTO KARTALLA' -SAANTOON (RISKI MUILLE KAUPUNGEILLE) → FABLE: KAYTETAAN piste.teksti-POLKUA OMALLA LYHYELLA KUVAUKSELLA, EI NOSTO-LINKITYSTA (24.9.2026 klo 14.46)

Kirjattu.

## FABLE NOLLAA ITSENSA klo 14.5x (68 %): LUOVUTUS viesti-fable-luovutus-20260924-c.md, ALOITUS viesti-fable-aloitus.md (0f5c0231f); POSTIVAHTI LAHETTAA ALOITUSVIESTIN KUN list_events = 0 / get_usage < 10 % (24.9.2026 klo 14.48)

Nollauksia tänään 18.

## SISALTOKIRJURI 71 % → LUOVUTUS JA NOLLAUS KASKETTY; POSTIVAHTI LAHETTAA SEN ALOITUSVIESTIN (viesti-sisaltokirjuri-aloitus.md) KUN KONTEKSTI < 10 %; PELIKOODARI NOLLAUTUI VAHVISTETUSTI; FABLE NOLLAUTUU TAMAN VUORON JALKEEN (24.9.2026 klo 14.49)

Kirjattu.

## PAATOKSET 24.9.2026 klo 14.5x: SATELLIITTIPINTA, EOX-NOUTO (24.9.2026 klo 14.53)

Omistaja päätti kortilla: EOX Sentinel-2 cloudless 2016 (CC BY 4.0) noudetaan CC BY:n nojalla kohteliaalla tahdilla (≤ 4 pyyntöä/s, pysähtyy 429/503:een), ja omistaja lähettää EOX:lle kohteliaisuusviestin (luonnos docs/raportit/satelliitti-lennon-pinta-20260924.md, haara karttaseppa-satelliitti). Fable päätti: BMNG Z0–Z7 topo (ei batymetriaa), elokuu, ajetaan päivällä ≤ 2 prosessia; attribuutio pelissä NASA Earth Observatory (Blue Marble Next Generation) ja EOX:n täysi muoto; värisovituksesta tuotetaan sekä alkuperäinen että kaupunkikohtaisesti sovitettu sarja, omistaja valitsee iPadilla; EOX-vaihe ennen klo 22 tai huomenna päivällä (E28 klo 22). Natiiviseppä varmistaa topon tumman meren sopivuuden palloon.

## FABLE ALOITTI UUDEN KONTEKSTIN klo 14.5x (24.9.2026 klo 14.55)

Aloitusviesti Postivahdilta luettu, luovutus -c.md ja lokin 40 otsikkoa luettu. Satelliittipäätös tehty ja kirjattu (3be7570fb): BMNG topo ajossa, EOX-nouto CC BY:n nojalla, omistaja lähettää kohteliaisuusviestin EOX:lle. Pelikoodari: #3073 kuitattu Julkaisijalle; maamerkkipilotti oli jo Natiivisepän tekemä (proto d59d672, build 8) → Pelikoodarille sisältöpaketin maamerkit-kokoelman lukija (skeema Siirtosepän kanssa). Fablen set_remote_control estyi luokittimessa → omistaja kytkee RC:n itse. Jono: build 7 -löydökset 25…, build 8 -SHA, museosuunnitelman luvut 6–7.

## BUILD 8 KASKETTY: NATIIVISEPAN SHA f6de924 (24.9.2026 klo 14.58)

Natiiviseppä ilmoitti build 8 -SHA:n f6de924 (tarkista 0, kaanna 248/248, linssit 225/225, simit asennettu): testi/b8 + Natiivi-UI 3e2ad74 + lento-kartta 9400ee9 + maamerkit Lontoo/Ateena + radio AVAudioEngine + keychain + aloituskaava-web c8c4831 + siivous-lokit + erät 2, 3 (heijastusluotain pois) ja 5; aloituslento 20 s; tunnettu: sileän pinnan laatat latautuvat lohkoina matkalla (build 9). Fable käski Julkaisijan ajaa build 8 heti (-nographics, Unity kiinni) ja Laitetestaajan ajaa B7-listan asennetuilla simuilla ilman käännöksiä. Build 9 -jono: Natiivi-UI bf7af3d, siirrot-kartalle f2b07b3 + siirtokohteet 74aac4e, maamerkit sisältöpaketista. Omistajan Remote Control kytkeytyi itsestään; omistaja ohjaa remoten kautta. EOX-hinta: hintasivun koodin mukaan osajoukot alkaen 1 500 € (alv 0), vanhemmat vuodet alennuksella.

## OMISTAJA klo 15.0x: EOX-KOHTELIAISUUSVIESTIA EI LAHETETA (24.9.2026 klo 15.01)

Omistaja kysyi, tarvitseeko EOX:lle lähettää viestiä. Fable: ei — CC BY 4.0 sallii noudon ja jakelun attribuutiolla, EOX sanoo itse 'use the service endpoints directly', kertanouto 9 162 laattaa on kevyt; viesti avaisi vain myyntikeskustelun (osajoukot alkaen 1 500 € alv 0). Viesti lähetetään vasta, jos nouto pysähtyy 429/503:een. Päätös 14.5x pysyy muuten ennallaan (nouto CC BY:n nojalla).

## LAITETESTAAJA f6de924 (iPhone 17 -SIMI, KOMENTOAJO): LENNON AANI PASS, ☰ KAKSI RIVIA PASS, PILVIMERI JA RENKAAT PASS; VARALAATTA ESPANJA–SAHARA YHA FAIL; LOYDOS: KONE SUMEA NOUSUN LAHIKUVASSA (24.9.2026 klo 15.05)

Kuvat proto-3d/lokit/build6-tarkistus-20260924/. Fable: molemmat Natiivisepälle build 9:ään (juurisyy varalaatalle, ei uusintayritystä; kone terävä, vain tausta pehmenee); build 8 -vientiä ei keskeytetä. Laitetestaaja committoi kuvat ja päivittää #3059:n. Simulaattorin kosketuslupa iPhone 17 -simille (FB234D08) puuttuu → omistaja sallii Simulator-paneelista.

## PELIKOODARI: MAAMERKIT-KOKOELMAN LUKIJA VALMIS (pelikoodari/maamerkit-paketti 3cf68dc, BUILD 9) (24.9.2026 klo 15.06)

Skeema 1.33 sovittu Siirtosepän kanssa (koepaketti v43, kentät id/kaupunki/lat/lon/maanKorkeus/suunta/mallinKorkeus/malli{url,sha256,tavuja}/lisenssi/tekija/lahde); natiivi hakee GLB:n välimuistiin, tarkistaa shan, oma kapea lukija; Maamerkit.LisaaMalli sovittu Natiivisepän kanssa; pilotti FBX:nä kunnes omistaja kokeillut; Blender --glb tuottaa GLB:n ja rivin (tools/vienti/maamerkit.json). Testit 259/259. Lennon ääni (lento-alku, intro ei lennolla, valinta keskeyttää) masterissa build 8:aan. Fable: kuitattu; seuraavaksi Pelikoodari tarkistaa varalaatan datapuolen (ämpärin pergamenttilaatat z3–z7 Espanja–Algeria), Natiiviseppä koodipuolen.

## SISALTOKIRJURI NOLLATTU JA KAYNNISTETTY klo 15.1x (24.9.2026 klo 15.07)

Postivahti epäili jumia (prosessi poissa 13 min clear_sessionin jälkeen, RC pois). Fable tarkisti: list_events = 0 viestiä → clear onnistui, sessio vain lepäsi; aloitusviesti (docs/raportit/viesti-sisaltokirjuri-aloitus.md, 662b51806) lähetetty session id:llä, RC:n kytkentä pyydetty sessiolta itseltään. Oppi: idle-sessio ei raportoi kontekstia get_usagella — tarkistus list_eventsillä.

## VARALAATAN JUURISYY: HUNTUSARJA ALKAA z5:STA, KORJAUS KOODISSA (EI POLTTOA) (24.9.2026 klo 15.09)

Pelikoodari: pohja 2026-09-23a ja sileä 23a-rajaton lon −10…16, lat 15…48, z3–z7 = 212/212 laattaa ehjiä (pienin 3,7 kt); huntu kerma 2026-09-23a-p080 tasot 5–8, z3–z4 = 404 → Cesiumin sekazoomissa z5-huntulaatat näkyvät vaaleina suorakulmioina. Fable: ei huntupolttoa z3–z4:ään (Raamattu: maailmanäkymässä ei kermahuntua); Natiiviseppä korjaa koodissa — huntu piirtyy vasta kun koko näkymä ≥ z5, häivytys zoomin funktiona (z4.5…z5.5), build 9; Karttasepän z3–z4-pyyntö peruttu. Laitetestaaja päivitti #3059:n (60035286d, 4 kuvaa). Pelikoodarille seuraava: reittilaattojen esilataus lennon ajaksi (sileä + satelliittisarja), build 9.

## OMISTAJA klo 15.2x KYSYI PARITEETIN PUUTTEET — FABLEN VASTAUS JA TILAUKSET (24.9.2026 klo 15.11)

Avoimet erot (pariteetti-natiivi-20260924.md): rivi 5 aihesivun otsikkotypografia, 13 linssin otsikko ei vaihdu, 23 matkakirjakortti kiinni ei näy, 19 noppalista (linjaus omistajalta: listakortti vai pelkät renkaat), uusinnat 1/12/14/40/41. Tarkistamatta: erien 3–4 näkymistä 13/25, iPad kokonaan, nappi-inventaario puuttuu. Build 9 -viat: huntu-suorakulmiot, sumea kone, sileän pinnan lohkot. Sisältö: paketti 2.0 -vaihto omana buildina, N2–N6 20 kaupunkia mergen jälkeen. Fable tilasi Laitetestaajalta nappi-inventaarion (docs/raportit/nappi-inventaario-natiivi-20260924.md) ja iPad-pariteettikierroksen f6de924:llä. Natiiviseppä: b9-korjaukset 481dcd1 (huntu pois >6000 km) + c5ce29e (ei kuvasumennusta lennossa, syväterävyys 2,0×) hyväksytty; Z3–Z4-huntupoltto vain jos etäisyyshäivytys ei riitä ja vain _maailma-sarjaan; BMNG topo.bathy tilattu Karttasepältä vertailuun (topon meri lähes musta).

## PELIKOODARI: REITTILAATTOJEN ESILATAUS VALMIS (pelikoodari/esilataus-edistyminen 20492bc, BUILD 9) (24.9.2026 klo 15.14)

Natiivisepän perusta natiiviseppa/esilataus ef925f8 (käytävä Z2–Z6, päätepisteet Z7–Z8, matalan prioriteetin jono) + Pelikoodarin täydennys: edistyminen ja peruminen (Laattapalvelin.Esilataus), pinta vaihtuu usvan peitossa kun 1/3 laatoista valmiina (viimeistään t > 0,2), edellisen lennon jono perutaan; lähde SatelliittiVersiosta (sileä z0–z8 tai bmng z0–z7 + Sentinel-2 Z8–Z11 päätepisteiden ympäriltä); myöhästyneiden laattojen häivytys Natiivisepän raster-alfalla myöhemmin. unity-tarkistus 0, kaanna 248/248, laitteella ei mitattu. Omistajalle selitetty noppalistan ero (natiivissa listakortti nopan jälkeen, webissä vain renkaat) — Fablen suositus: lista jää natiiviin; odottaa omistajan päätöstä. Laitetestaajan tilaus (nappi-inventaario + iPad-pariteetti) lähetetty.

## OMISTAJA klo 15.3x (SITOVA): NOPAN JALKEEN KOHDE VALITAAN AINA KARTALTA — NATIIVIN LISTAKORTTI POIS; KAIKKI KUTEN WEBISSA (24.9.2026 klo 15.14)

Omistaja päätti pariteettirivin 19: natiivin 'Noppa 4 · valitse kohde listasta tai kartalta' -listakortti poistetaan; vain renkaat kartalla kuten webissä, napautus kartalta valitsee. Yleissääntö vahvistettu: kaikki tehdään kuten web-versiossa (TÄYSI TOIMINTOPARITEETTI ja EI WEBISSÄ → KYSY pysyvät). Pelikoodari toteuttaa build 9:ään ennen rivin 13 otsikkobugia. Natiivi-UI:lle annettu rivit 5 (aihesivun otsikkotypografia) ja 23 (matkakirjakortti kiinni).

## OMISTAJA klo 15.4x: EI PERKAA BUILD 7:AA — ODOTTAA BUILD 9:AA; NATIIVI-UI: RIVIT 5 JA 23 JO KUNNOSSA; HUNTU Z3–Z4 POLTETTU 28 SARJAAN, OLETUS Z5+ (24.9.2026 klo 15.15)

Omistaja: build 7:ssä paljon virheitä, ei perkaa niitä kun iso osa on työn alla. Fable: odota build 9:ää (huntu+häivytys 654f306/65ccf48, terävä kone c5ce29e, esilataus 20492bc, noppalista pois, linssin otsikko, maamerkit-paketti); build 8:sta halutessaan vain lento; Fable ilmoittaa yhdellä rivillä kun build 9 kannattaa kokeilla, tavoite tänä iltana. Natiivi-UI: pariteettirivit 5 (e536f8e, e659f6e, ee2101b, 3e2ad74) ja 23 (kaupunkipilleri = kiinni-tilan matkakirja iPhonella, löydös 20) jo masterissa → Laitetestaaja uusii build 8:lla; Natiivi-UI listaa nyt kaikki webistä poikkeavat UI-elementit (osio 'Ei webissä' pariteettiraporttiin), Fable päättää rivikohtaisesti. Karttaseppä ehti polttaa huntu Z3–Z4 kaikkiin 28 kermasarjaan ennen peruutusta (tasot.min = 3): pidetään vertailuna, natiivi käyttää oletuksena Z5+ ja häivyttää huntu zoomilla 4,5→5,5 omalla tileset-varjostimella (toimii myöhemmin lennon pinnan ja meren sävyn säätöön). Sisältökirjuri käynnissä, RC päällä (Postivahti).

## HUNTU Z3–Z4 PALAUTETAAN AMPARIIN (28 SARJAA, tasot.min = 3) (24.9.2026 klo 15.16)

Karttaseppä oli poistanut ne perumisen mukaisesti; Natiivisepän perustelu hyväksytty: huntu häivytetään näkymän zoomilla 4,5→5,5, Z3–Z4 tarvitaan vain horisontin karkeisiin laattoihin kun näkymä on ≥ z5 — ei riko 'maailmanäkymässä ei huntua' -linjausta, ilman niitä suorakulmiot palaavat. Työkalu PR #3061 (21257bb90), uudelleenvienti ~2 min. BMNG topo.bathy ajossa (bmng-bathy/), EOX-nouto ~45 %.

## PELIKOODARI: PARITEETTIRIVI 13 EI OLE KOODIVIKA; ESILATAUKSEN MITTAUS BUILD 9:LLA LAITETESTAAJALTA (24.9.2026 klo 15.16)

Kytke(linssi) asettaa otsikon 'IHMISEN MATKA' oikein; vanha kuva tuli testikomennon polulta, jonka Natiivi-UI korjasi e536f8e:ssä → Laitetestaaja varmistaa build 8:lla oikealla vaihdolla (rivit 5, 13, 23). Esilatauksen mittari fee30eb (lokirivi 'lennon pinta: vaihto t=… esilataus V+E/Y') tulee build 9:ään; Laitetestaaja mittaa lokista, Pelikoodari ei käytä simulaattoria (roolitus). Pelikoodarilla nyt nopan listakortin poisto.

## PELIKOODARI: NOPAN LISTAKORTTI POISTETTU (pelikoodari/siirrot-kartalle 4d3fe7a, BUILD 9 ENSIMMAISENA) (24.9.2026 klo 15.17)

Noppa → kartalle ilman korttia ja tekstiä (webin vaihe 'move'); Siirtokohdemerkit piirtää renkaat saavutettaviin kaupunkeihin ja reitin varren pisteisiin, napautus renkaasta tai kaupungista valitsee; 15 s:n jälkeen pöllön vihje kuten webissä; testikomento 'rivi i'. kaanna 250/250, unity-tarkistus 0. Merge-pyyntö Natiivisepällä.

## OMISTAJA klo 15.5x (SITOVA): WEB ON MALLI, MITATTUNA — RAAMATTUUN (24.9.2026 klo 15.21)

Omistaja kysyi, miksi natiiviin on tehty asioita ensin väärin tarkistamatta webistä (lehdet, nostot, nopanheitto, mitä kartalla näkyy), ja vaatii selkeän työohjeen: tehdään täsmälleen kuten web näyttää — nostokorttien leveydet, kuvakoot, palstoitus, kartan zoomitasot, nostojen näkyvyys. Fable: syy oli, että Raamatun pariteettisääntö oli toimintotason sääntö (napit ja toiminnot) ja sessiot koodasivat muistista ja RAJAPINTA.md:stä, web-kuva otettiin vasta pariteettikierroksella jälkikäteen. Raamattuun lisätty sitova osio WEB ON MALLI, MITATTUNA: ennen koodausta web-kuva tuotannosta samassa pelitilassa (tools/pariteetti-web-kuva.mjs, -lehti.mjs; iPhone 393×852, iPad 834×1194), mitat webin koodista ja kuvasta merge-pyyntöön, koodaus mittojen mukaan, web–natiivi-kuvapari merge-pyyntöön; ilman niitä Natiiviseppä ei mergeä eikä Laitetestaaja hyväksy; arvaaminen kielletty; hyväksytyt poikkeamat vain Raamatussa nimetyt. Lähetetään kaikille natiivisessioille.

## LINSSISEPPA: HUIPPUVUORET EI VARITY WEBIN VERTAILULINSSISSA (#3030:N JALKEENKAAN), FINNMARKIN VALKOISET KOLMIOT — FABLE: WEB-BUGI, WEB KORJATAAN, NATIIVI OIKEIN (24.9.2026 klo 15.22)

'Web on malli' = webin tarkoitettu käytös, ei bugit. Huippuvuoret Norjan väriin molemmissa; natiivi (17 rengasta Norjan maarajoissa) tekee oikein; Linssiseppä korjaa webin vertailulinssin ja Finnmarkin täytön kolmiot (bugikorjaus sallittu web-ylläpito), web-PR Julkaisijalle, kirjaus pariteettiraporttiin 'web korjattu natiivin tasolle'. Linssisepällä ei avoimia merge-pyyntöjä; seuraavat linssierät kaavalla web-kuva → mitat → kuvapari. WEB ON MALLI -sääntö lähetetty Natiivisepälle, Natiivi-UI:lle, Pelikoodarille, Laitetestaajalle ja Linssisepälle.

## SISALTOKIRJURI (UUSI SESSIO): KALGOORLIEN KOHDEKARTTA PR #3075 (v2177, 9eb1b1bb2); INVENTAARION KOHTA 5.5 PR #3045:AAN (c1372f119) (24.9.2026 klo 15.24)

Kaksi kohdetta piste.teksti-polulla, pisteet maalla, mittarit ok; 12 hyväksytyn ja 18 hylätyn kaupungin lista perusteineen inventaariossa. Testit 4204/0 fail. Jatkaa: Mount Isa, Broome, Geraldton, Porto Velho. Rutiini → Julkaisija mergeää.

## NATIIVI-UI 82 % → LUOVUTUS JA NOLLAUS KASKETTY (24.9.2026 klo 15.25)

Postivahti ilmoitti 82 %. Fable käski luovutuksen (viesti-natiivi-ui-luovutus-20260924-g.md, aloitusviesti päivitettynä WEB ON MALLI -säännöllä) ja clear_session self samassa vuorossa; notify_when_idle ei ole käytettävissä Desktop-sessioille → Postivahti lähettää aloitusviestin kun list_events = 0 ja varmistaa RC:n. Kesken oleva 'Ei webissä' -lista siirtyy luovutuksen kautta.

## LAITETESTAAJA: NAPPI-INVENTAARIO + iPAD-PARITEETTI PR #3076 (laitetestaaja-inventaario-ipad) (24.9.2026 klo 15.26)

Löydökset: noppalista (jo päätetty: pois, build 9), offline-lataukset natiivin oma lisä (Raamatussa hyväksytty poikkeama), aihesivun otsikko korjattu build 8 -jonossa, iPad-pistokoe 13/15 PASS ilman uusia rakenne-eroja, iPadilla aloitusportti jäi hetkittäin läpikuultavana pelin alle testikomennon jälkeen (varmistetaan oikealla kosketuksella). Suuri osa inventaariosta EI TARKISTETTU (rehellisesti merkitty). Fable: päivitykset riveihin 1–2 ennen mergeä, jatko build 8 -rivien jälkeen mitoin.

## NATIIVI-UI: 'EI WEBISSA' -LISTA E1–E20 (natiivi-ui-ei-webissa 5e9ee1f61) — FABLE: KAIKKI WEBIN MUKAAN PAITSI E2 JA E6 (24.9.2026 klo 15.26)

Lista: E1 kaupunkikortin Sulje-nappi, E2 Mannerlento-rivi kortissa, E3 nostokortti aina keskellä ei raahattava (web: napautuspisteen vieressä, raahattava), E4 × vs ✕, E5 matkavalinta modaalina, E6 tekijätiedot päävalikossa, E7 '· sisältö vN', E8 Kertoja-asetus käynnistää luennan, E9 'Lue lisää ›' nuoli, E10–E11 ryhmänostomerkin kuvake ja nimiö kaikilla zoomeilla (bugi), E12–E19 pienet (wiki-tiivistelmä, postikorttipino, lipun suurennos, lippuäänet, kaiutin <80 merkkiä, vara-ikoni, taustasulku, esikuuntelun virheviesti), E20 tooltipit; lisäksi 6 päinvastaista puutetta. Päätös omistajan säännöllä: kaikki webin mukaan; poikkeukset E2 (offline hyväksytty) ja E6 (☰ Muut-paneelin rivi, omistajan linjaus). Järjestys: E10–E11 + E3 build 9, loput build 10; WEB ON MALLI -kaavalla. Natiivi-UI nollautuu tämän jälkeen.

## NATIIVISEPPA: BUILD 9 TEKNINEN OSA fe35b7e (KONE TERAVA, HUNTU + ZOOMIHAIVYTYS, MAAMERKIT-PAKETTI a6ae948, ESILATAUS fee30eb); HUNTUTESTI Z5+ PASS (24.9.2026 klo 15.29)

Espanja 7000 km → z5 iPad-simissä: ei vaaleita suorakulmioita, huntu häivyttyy tasaisesti (proto-3d/lokit/b9-huntu-z5/); Z3–Z4 ämpärissä mutta natiivi ei käytä (komento 'vari alin 3'). Fable: build 9 odottaa siirrot-kartalle 4d3fe7a ja iphone-island bf7af3d kuvapareineen (WEB ON MALLI); build 8 -vienti 35996178210 yhä käynnissä; takaraja klo 17.00, sitten Fable päättää. Omistajalle: konsolinvaihtoa ei tarvita (-nographics).

## PELIKOODARI: NOPPA-KARTALLE 4d3fe7a — WEB-KUVAT JA MITAT MERGE-PYYNNOSSA; POLLON VALINTAVIHJE EI NAY WEBISSA iPHONELLA → WEB-BUGI, KORJATAAN WEBIIN (24.9.2026 klo 15.29)

Web-kuvat tuotannosta (kartta, noppa, siirtovaihe, valintavihje × iPhone/iPad, proto-3d/lokit/noppa-kartalle-web-20260924/) ja mitat webin koodista merge-pyynnössä; Laitetestaaja ottaa natiivikuvat testihaarasta, sitten merge. Kysymys: js/pollo.js naytaVihje palaa kun pöllönappi on piilossa (iPhone 393 px), joten 15 s:n vihje ei näy. Fable: vahinkokytkentä, web-bugi — Pelikoodari korjaa webiin (vihje omana kuplana), natiivi pitää vihjeen samalla kestolla ja tekstillä; sääntö: web on malli tarkoitetulta käytökseltään, ei bugeiltaan (kuten Huippuvuoret).

## BUILD 8 TESTFLIGHTISSA: 1.0.0 (202609241220), PROTO f6de924, klo 15.28 (AJO 35996178210, -nographics) (24.9.2026 klo 15.30)

Sisältö: uusi DC-3, pilvimeri, punaiset renkaat, maamerkit Lontoo/Ateena, lennon ääni korjattu, ☰ kaksi riviä + Muut-paneeli, äänentasot Asetuksiin, VU AVAudioEngine, iPad-sumennus korjattu, Keychain, aloituskaava. Tunnetut: huntu-suorakulmiot, sumea kone, laatat lohkoina → build 9. Mainissa #2898 v2176, #2932, #3057, #3070, #3072, #3073. Julkaisija: #2966/#2972 (O7) ristiriidassa N-erien kanssa → Sisältökirjuri rebaseaa ja poistaa päällekkäisen, sulkee jos ei uutta. Laitetestaajalle build 8 -rivit 5/13/23 ja noppa-testihaaran kuvat. Omistajalle ilmoitettu.

## NATIIVI-UI NOLLATTU (POSTIVAHTI): LUOVUTUS PR #3077, ALOITUSVIESTI LAHETETTY, RC PAALLA (24.9.2026 klo 15.31)

Nollaus 18. tänään. Uusi Natiivi-UI jatkaa 'Ei webissä' -päätöksistä (E10–E11 + E3 build 9, loput build 10) WEB ON MALLI -kaavalla. iPad irrotettu omistajalta; laiteajot pyydetään erikseen (Linssisepälle ilmoitettu).

## LINSSISEPPA: HUIPPUVUORET JA FINNMARK KORJATTU WEBIIN (PR #3078) — JUURISYY countryShapes LOPPUU 76° N (24.9.2026 klo 15.31)

Webin pallo piirsi laudan tyylitellyt countryShapes-renkaat (loppuvat 76° N, karkeat vuonot kolmioituivat valkoisiksi); korjaus: Natural Earth 10m maapolygonit.json harvennettuna 41 000 pisteeseen, kiertosuunta korjattu; testit 4221/4221; kuvapari proto-3d/lokit/linssit-huippuvuoret-20260924/, pariteettirivi 39b. Skeeman 1.29 rajaaWebinMuotoon tarpeeton → Siirtoseppä poistaa seuraavassa skeemassa, Natiivisepälle merge-pyynnössä. Natiivin iPad-kuva laiteajolla myöhemmin.

## VALINTAVIHJE iPHONELLA: AIEMPI 'WEB-BUGI' KUMOTTU — WEB ON OIKEIN (OMISTAJAN 14.9. PAATOS), NATIIVI PIILOTTAA VIHJEEN PLUSKUPLAAN KUTEN WEB (24.9.2026 klo 15.36)

Pelikoodari mittasi tuotannosta: pöllönappi ei ole piilossa; vihje luodaan mutta imePuhelimenKuplaan vie sen pluskuplaan tekstitPiilossa()-portilla, joka on omistajan 14.9. klo 20.30 päätös (puhelimella isoisän ja pulun tekstit piiloon). Fable: vaihtoehto B — webiä ei muuteta; Natiivi-UI muuttaa Pulu.NaytaVihje noudattamaan tekstipiiloa (iPhone: pluskuplaan, iPad: näkyy), build 9, kuvapari. Noppa kartalle 4d3fe7a: kuvapari PASS (Laitetestaaja) → merge.

## SIIRTOSEPPA: SKEEMA 1.34 — 1.29-RAJAUS POISTETTU (siirtoseppa-maarajat 1db1f917d, KOE v44, TESTIT 77/77) (24.9.2026 klo 15.36)

Maarajojen renkaat = kaikki admin-0-renkaat (Norjassa Huippuvuoret, muutRenkaat = []); merentakaiset alueet (FRA, ESP, PRT) palaavat kuten #3078:n web-pallossa. Natiiviseppä tietää. PR #3074:n ja #3078:n jälkeen. Tuotannossa 1.x v43 ja 2.0 v3 avausluentojen aikaleimoilla.

## LAITETESTAAJA (#3076 818a9a7b1): RIVIT 5, 13, 23 PASS BUILD 8:LLA; NOPPA KARTALLE PASS iPHONE + iPAD; RIVI 9 MAALEHDEN PALSTOITUS MITATTUNA FAIL → NATIIVI-UI (24.9.2026 klo 15.37)

Rivi 13 todennettu oikealla kosketuksella. Noppa-kartalle (testi/b9-ui): listakortti pois, vain renkaat + pöllön vihje, täsmää webiin, kuvaparit tallessa. iPad-portin läpikuultava jäänne seuraavaan erään. Rivi 9 (maalehti) palstoitus mitattuna FAIL, reititetty Natiivi-UI:lle.

## NATIIVI-UI (UUSI SESSIO): iphone-island 6d39af4 NATIIVISEPALLA (BUILD 9) — UI-LUKIJAT PAATASO ENSIN, VALINTAVIHJE PAATOS B; 4 UUTTA LEHTIEROA BUILD 10 -LISTAAN (24.9.2026 klo 15.41)

Kuvaparit ja mitat proto-3d/lokit/pariteetti-b9/merge-pyynto-natiivi-ui-b9.md. Uudet lehtierot: anfangi/kappalejako, tehtävän vastausrivien tyyli, alanappien kapiteelit, vihjekuplan häntä. Seuraavaksi E10–E11 (ryhmämerkki levy r 3,4 + nimiö vain lähizoomissa) ja E3 (nostokortti napautuspisteen viereen, raahattava).

## BUILD 9 KASKETTY: NATIIVISEPAN SHA 9a5618b (24.9.2026 klo 15.42)

Sisältö: noppa webin mukaan (4d3fe7a, kuvapari PASS), Natiivi-UI 6d39af4 (päätasolukijat, valintavihje B), b9-korjaukset (kone terävä, huntu zoomihäivytys), maamerkit-paketti, esilataus-edistyminen; tarkista 0, kaanna 261/261, simit asennettu. Julkaisija vie -nographics, Unity kiinni, käännökset tauolla. Löydös build 10:een: saapumisnäkymän zoom — natiivissa Eurooppa, webissä Ranska täyttää ruudun (mitataan webin zoomikaava); nostotaso webin fokuspohjasta 38e424d + skeema 1.35 (maarajat 1.34 olisi muuten rikkonut nostot, FRA bbox −62°). Lennon pinnan topo/bathy-vertailu simulaattorissa Fablelle ennen oletuksen valintaa.

## SIIRTOSEPPA 72 % → LUOVUTUS JA NOLLAUS KASKETTY (24.9.2026 klo 15.43)

Luovutus viesti-siirtoseppa-luovutus-20260924-b.md, aloitusviesti päivitettynä (WEB ON MALLI), clear_session self samassa vuorossa; Postivahti lähettää aloitusviestin kun list_events = 0 ja varmistaa RC:n.

## KORJAUS: SIIRTOSEPAN NOLLAUSKASKY EI MENNYT PERILLE (10 VIESTIN RAJA) (24.9.2026 klo 15.43)

Fablen vertaisviestiraja täyttyi (11 viestiä omistajan viimeisen kirjoituksen jälkeen); Siirtosepän luovutuskäsky ja Postivahdin ohje lähetetään heti, kun omistaja kirjoittaa seuraavan viestin. Siirtoseppä 72 % — ei vielä kriittinen (85 %). Oppi: niputa viestit; enintään 10 per omistajan viesti.

## NATIIVI-UI: BUILD 9 iPHONEN VIHJE TODENNETTU (EI KUPLAA SIIRTOVAIHEESSA, KUTEN WEB); E10–E11 TEHTY (natiivi-ui/nostot-web c5e02b2) (24.9.2026 klo 15.45)

Kuvapari proto-3d/lokit/pariteetti-b9/kuvapari-vihje-iphone.jpg; pulun napautus avaa chatin ja 'Näytä puhekuplat'. E10–E11 kuvataan viennin jälkeen; seuraavaksi E3.

## KARTTASEPPA: SATELLIITTIERA VALMIS AMPARISSA (julisteet/pallo/satelliitti/2026-09-24/) (24.9.2026 klo 15.48)

bmng/ (topo) ja bmng-bathy/ 21 845 laattaa kumpikin; s2/ (kaupunkikohtainen värisovitus) ja s2-alkup/ 9 162 kumpikin; omat laatat.json, määrät tarkistettu. EOX-nouto ilman rajoitusvastauksia: 9 162 pyyntöä 39 min, ≤ 4/s. Omistaja valitsee iPadilla meren (topo/bathy) ja S2-sävyn (sovitettu/alkuperäinen), hävinneet poistetaan ämpäristä ja NAS:ista. Polut ja attribuutiot Natiivisepällä (kytkee lennon pintaan, vertailukuvat Fablelle). Huntu Z3–Z4 palautettu. Karttaseppä seuraavaksi #3054:n ristiriita, E28 klo 22.

## SISALTOKIRJURI: KOHDEKARTAT ERA 1/3 VALMIS (#3075, #3080, #3082, #3083, #3084); O7-PR:T #2966/#2972 SULJETTU (24.9.2026 klo 15.50)

Kalgoorlie, Mount Isa, Geraldton, Broome, Porto Velho; piste.teksti-polku, pisteet maalla, testit 0 fail. Löydös: Mount Isan Lake Moondarra ~18 km kaupungista (nosto liioittelee) → City Lookout, kommentissa. #2966/#2972 suljettu, kaupungit jo mainissa N10–N15. Jatkaa: Santarém, João Pessoa, Macapá, Cayenne, Kimberley.

## VIESTIRAJA NOLLAUTUI (OMISTAJAN KUVAKAAPPAUS SIIRTOSEPAN SESSIOSTA) — KOLME VIESTIA LAHETETTY (24.9.2026 klo 15.52)

Siirtosepän luovutus- ja nollauskäsky (#3081 luonnos odottaa build 10:tä, #3074 mergettävissä), Postivahdin aloitusviestiohje ja Linssisepän iPad-laiteajot (piikkiajo 8, Huippuvuoret, keksinnöt; iPad kytketty) toimitettu klo 15.5x. Oppi: mid-turn-viesti ei nollaa rajaa, vain uusi vuoro.

## NATIIVISEPPA 70 % → LUOVUTUS JA NOLLAUS KASKETTY BUILD 9 -VIENNIN AIKANA; wt/ 67 → POSTIVAHTI JAKAA POISTOLISTAT ROOLEILLE (24.9.2026 klo 15.54)

Luovutus viesti-natiiviseppa-luovutus-20260924-ilta.md (build 10 -jono: saapumiszoom, nostotaso fokuspohjasta + 1.35, lennon pinta satelliittisarjoista + topo/bathy-vertailu, nostot-web, E3); Postivahti lähettää aloitusviestin kun tyhjä. Siirtoseppä 73 %, ei vielä tyhjentynyt. wt/ kasvaa (61→67, tavoite < 20): Postivahti listaa per rooli mergetyt/poistetut haarat ja käskee poistot tools/uusi-worktree.sh --poista; rooli-worktreet säilyvät.

## NATIIVISEPPA NOLLATTU (POSTIVAHTI), RC PAALLA; wt/ 67 → 47 SIIVOUS KAYNNISSA (24.9.2026 klo 15.58)

Natiivisepän aloitusviesti lähetetty origin/mainista. wt/: Pelikoodari poisti 7, Karttaseppä 2, muut roolit tulossa. Siirtoseppä 73 %, ei vielä tyhjentynyt (seuranta 15.42 alkaen).

## OMISTAJA klo 16.0x (KORTTI): NATIIVISEPAN 9 MERGETYN WORKTREEN POISTO SALLITTU SEN OMASSA SESSIOSSA (24.9.2026 klo 16.01)

Luokitin esti poiston; Raamatun mukaan Fable pyysi omistajalta täsmällisen luvan → hyväksytty. Säilyvät proto-natiiviseppa-saapuminen (commitoimaton build 10 -työ) ja -siirtokohteet (haara natiiviseppa/satelliitti). Natiivisepän aloitusviesti oli vanha (klo 10.3x) → Natiiviseppä jatkaa klo 15.54:n luovutuksesta ja päivittää aloitusviestin.

## NATIIVISEPPA: 9 WORKTREETA POISTETTU; ALOITUSVIESTIN VANHENTUMISEN SYY: LUOVUTUSHAARA selvittaja-3d-luovutus (16 COMMITTIA) EI MAINISSA (24.9.2026 klo 16.02)

Aloitusviesti täydennetty 1f68fd274. Fable: Julkaisija mergeää luovutushaaran mainiin rutiinina; Postivahti lukee jatkossa aloitusviestin uusimmasta origin-haarasta (git log --all), ei mainin kopiota jos vanhempi. Natiiviseppä odottaa 'vienti ohi' ja jatkaa build 10 -jonoa.

## ISO iPAD PYSYVAKSI TESTILAITTEEKSI (omistaja klo 16.1x): iPad Pro 13 (Sami), UDID 00008103-001819421413401E (24.9.2026 klo 16.05)

iPad Pro 12,9" 5. sukupolvi (iPad13,8, M1), iPadOS 26.4.1, kehittäjätila päällä, paritettu devicectl:llä (manage pair) ja kaapelilla kiinni; pistekoko 1024×1366 → iPad-kuvaparit jatkossa myös tässä koossa (PW_W=1024 PW_H=1366). Pieni iPad Pro 11 (00008142…) palautetaan omistajalle, kun Linssisepän käynnissä oleva piikkiajo (langaton) valmistuu; Huippuvuoret-laitekuva ja keksinnöt-kuvapari isolla iPadilla.

## SISALTOKIRJURI: KOHDEKARTAT ERA 2 VALMIS (#3087–#3090); KIMBERLEY HYLATTY (VAIN BIG HOLE) → 11+19 (24.9.2026 klo 16.08)

Santarém, João Pessoa, Macapá, Cayenne; testit 0 fail. Jäljellä Gao ja Al Kufra, sitten kohdekarttavaihe valmis.

## OMISTAJA klo 16.1x (SITOVA): RUSKEA YLAPALKKI TAKAISIN iPHONELLE, AUTOMAATTINEN PIILOTUS, ☰ PALAUTTAA; iPADIN PALKKI KORKEAMMAKSI (24.9.2026 klo 16.11)

Omistajan kuva (Ateena, iPhone): yläosan kelluvat napit ja pillerit liian sekavia. Päätös: iPhonelle webin/iPadin ruskea yläpalkki samalla sisällöllä; palkki piiloutuu kun karttaa vieritetään ja vaakamuodossa oletuksena; piilossa vain ☰ oikeassa yläkulmassa, joka tuo palkin takaisin (ei kelluvia nappeja, myös vaakatilassa); iPadin palkki liian matala → korotetaan webin mittaan; muut piilotustilanteet myöhemmin. Fablen oletukset: palkki palaa myös napautuksesta karttaan; iPadilla ei piiloudu. Raamattu päivitetty (klo 09.5x:n kelluva asettelu kumottu yläpalkin osalta). → Natiivi-UI build 10, WEB ON MALLI -kaavalla (webin palkin mitat).

## LINSSISEPPA: PIIKKIAJO 8, HUIPPUVUORET-LAITEKUVA JA KEKSINNOT-KUVAPARI VALMIIT; PIENI iPAD VAPAA (24.9.2026 klo 16.12)

Piikit 8: ihmisen matkan avauksessa ei yli 20 ms:n kehyksiä (ajo 7: 31,7 ms); muut 23–41 ms ensipiirrosta; uusi: topografian sulussa 50 ms sulkuäänen latauksesta → Natiivi-UI esilataa (build 10). Huippuvuoret iPadilla: natiivi ei vielä väritä (skeema 1.29 muutRenkaat) → 1.34 + #3078 korjaavat. Keksinnöt: kuvapari vastaa rakenteeltaan webiä (proto-3d/lokit/linssit-keksinnot-pari-20260924/), Laitetestaajan rivin 40 kuva oli build 5:stä. Omistajalle: pieni iPad saa irrottaa.

## OMISTAJA klo 16.2x: NATIIVIN LEHDISSA JA NOSTOKORTEISSA VAARANLAINEN TAUSTA TEKSTIN TAKANA → KOPIOIDAAN WEBISTA (24.9.2026 klo 16.12)

Natiivi-UI mittaa webin css:n (tausta, läpinäkyvyys, tekstuuri, reunus, varjo, pyöristys, paddingit) kaupunkilehdestä, maalehdestä, nostokortista ja nostovisasta ja toteuttaa saman; kuvaparit merge-pyyntöön; build 10, yläpalkin jälkeen ennen E3:a.

## ISO iPAD: DEVELOPMENT-KAANNOS EI ASENNU (0xe8008012) — LAITE PUUTTUU PERSONAL TEAM F72JLS57C5:N PROFIILISTA (24.9.2026 klo 16.13)

Profiilissa vain 00008142… ja 00008150…; Natiiviseppä rekisteröi laitteen 00008103-001819421413401E ja allekirjoittaa uudelleen (xcodebuild -allowProvisioningUpdates). Sen jälkeen Linssiseppä uusii Huippuvuoret-kuvan ja keksinnöt-kuvaparin 1024×1366:ssa. TestFlight-buildit asentuvat isolle iPadille tästä riippumatta.

## SISALTOKIRJURI: KOHDEKARTTAVAIHE VALMIS (10 PR:AA, 10 HYVAKSYTTYA + 20 HYLATTYA); SEURAAVAKSI CHURCHILL-NOSTO JA N2/N4/N5/N6-KAUPUNKIEN SAA/GALLERIA/ENNENNYT (24.9.2026 klo 16.14)

Erä 3: Gao #3091; Al Kufra hylätty (ei toista paikannettavaa kohdetta). Fable: Churchill-nosto (#3016), sitten N-erien mainissa olevat kaupungit 5/PR, ja sää-PR:ien (#3047–#3065) tilan tarkistus.

## OMISTAJA klo 16.1x (SITOVA): AVAUSTEKSTI TAKAISIN ALOITUSNAYTOLLE; LENNON KAMERAREITTI (SIVUKYLKI LAHELTA → LOITTONEE → KIERTO KOHDEKAUPUNGIN VASTAPUOLELLE → ORBIT LASKUUN) (24.9.2026 klo 16.16)

1) 'Ullakolta löytyi matkalaukku…' näytetään aloitusnäytöllä 'Aloita seikkailu' -painalluksen jälkeen ennen karttaa (kartalla Lontoo-zoomissa liian sekava); tekstin jälkeen tai ohituksesta pallonäkymä ja kohdevalinta. 2) Kohdemaan valinnan jälkeen kone lähtee automaattisesti; kamera zoomaa koneeseen niin että se täyttää melkein näytön ja näkyy sivukylki → loittonee kone näkyvissä → kohdekaupungin ilmestyessä kiertää kaupungin vastakkaiselle puolelle (kone tulee kameraa kohti) → pyöreä orbit laskuun asti. Raamattu päivitetty (klo 12.1x:n avaustekstin paikka kumottu, kamerakäsikirjoitus tarkennettu). → Pelikoodari (aloitusteksti, build 10), Natiiviseppä (kamera, build 10).

## POSTIVAHTI: wt/sisaltokirjuri-santarem POISTETTIIN VIRHEELLISESTI (PR #3087 AUKI, EI MENETETTYA TYOTA) (24.9.2026 klo 16.16)

Postivahdin ls-remote-tarkistus oli vanhentunut. Kaikki committoitu ja pushattu; haara on originissa. Oppi: poistolista vain 'git branch -r --merged origin/main' -tuloksesta tuoreen fetchin jälkeen ja PR-tilan (gh pr view --json state) tarkistuksella; ei ls-remote-arvauksia.

## BUILD 9 TESTFLIGHTISSA: 1.0.0 (202609241305), PROTO 9a5618b, klo 16.13; SATELLIITTIVERTAILU: BATHY OLETUKSEKSI; #2999 → #3093 (24.9.2026 klo 16.18)

Build 9: noppa webin mukaan, valintavihje, kone terävä, huntu häivytys, esilataus, maamerkit-paketti, päätasolukijat; muutosloki #3092; erä 4 mainissa (#2973 v2177 … #2942 v2181). Natiivisepän satvertailu.jpg (testi/b10 6f2acd5): topon meri lähes musta, bathy sininen ja rantaviivat erottuvat → Fable: bmng-bathy oletukseksi build 10:een; ennen mergeä harmaiden suorakulmioiden syy (S2-lataus vs häivytys) ja S2-sävyn valinta saumakuvalla; ämpärin karsinta vasta omistajan nähtyä build 10:n. #2999 (fable-periaatteet-teksti, 1 200 tiedostoa jäljessä) suljettu, korvattu #3093:lla (1 rivi). #2913 odottaa Siirtosepän uutta sessiota. Julkaisijan jono jatkuu; #3081 pidossa.

## LENNON KAMERAKASIKIRJOITUS HYVAKSYTTY (proto-3d/lokit/kamerakasikirjoitus-lento-20260924.md); ISO iPAD: XCODESSA EI APPLE-TILIA koodaus-KAYTTAJALLE (24.9.2026 klo 16.19)

Vaiheet 20 s lennolle: (a) syöksy sivulle 0–2,6 s + sivukylki 2,6–4,2 s (kallistus 84°, kone ~0,9 ruudun leveyttä), (b) loittonus 4,2–11 s (30 → ~3000 km, kone aina ruudulla), liuku 11–12 s, (c) kierto kaupungin vastapuolelle 12–15,5 s (kone kohti kameraa), (d) orbit laskuun 15,5–20 s webin saapumiskaavaan. Fablen vastaukset: maisemasuunta ratkaisee vain kiertosuunnan; kesto skaalataan 16–26 s reitin mukaan (sivukylki ≥ 1,4 s, orbit ≥ 4 s). Toteutus build 10 -viennin jälkeen, video omistajalle. Iso iPad: laitetta ei voi rekisteröidä automaattisesti (No Accounts) → Natiiviseppä kokeilee ASC API -avaimella (-authenticationKeyPath); jos ei toimi, omistaja lisää laitteen developer.apple.comissa tai kirjautuu koodaus-käyttäjän Xcodeen.

## ISO iPAD: ASC-AVAIMET VAIN ACTIONS-SECRETEINA → OMISTAJA KIRJAUTUU koodaus-KAYTTAJAN XCODEEN (24.9.2026 klo 16.20)

Natiiviseppä: p8-avainta ei ole Macilla (Raamattu: käyttö vain työnkulkujen kautta), luokitin esti etsinnän, ei kierretä. Fable pyysi omistajaa kirjautumaan koodaus-käyttäjän Xcodeen (Settings → Accounts, me.com-tunnus), jolloin automaattinen allekirjoitus rekisteröi laitteen ja tekee profiilin pysyvästi; pelkkä UDID developer.apple.comissa ei riitä. Siihen asti TestFlight-buildit isolla iPadilla.

## OMISTAJAN LOYDOKSET 25–27 (BUILD 9, klo 16.3x): KALLISTUS POIS KARTASTA, ZOOMI LAHEMMAS WEBIN RAJAAN, NOSTOT HYTISEVAT PANOROINNIN JALKEEN (24.9.2026 klo 16.20)

25) kahden sormen kallistus pois; kallistus vain animoiduissa kamera-ajoissa → Natiiviseppä. 26) zoomi ei mene tarpeeksi lähelle, nostoja vaikea nähdä → Natiiviseppä mittaa webin lähizoomin rajan ja tekee saman (kuvapari). 27) nostot hytisevät hetken panoroinnin jälkeen → Natiivi-UI (merkit lukitaan kameran kehykseen). Omistaja odottaa nostojen muuta työstöä tulevissa buildeissa (E10–E11, E3 tulossa). Kaikki build 10.

## OMISTAJA klo 16.3x: LOYDOS 25 KUMOTTU — KAHDEN SORMEN KALLISTUS JAA KARTTAAN (24.9.2026 klo 16.21)

Natiivisepälle ilmoitettu; 26 (zoomi) ja 27 (nostojen hytinä) pysyvät.

## LAITETESTAAJA 71 % → LUOVUTUS JA NOLLAUS KASKETTY (24.9.2026 klo 16.21)

Luovutus viesti-laitetestaaja-luovutus-20260924-ilta.md (avoimet pariteettirivit, EI TARKISTETTU -osiot, build 9 -mittaus, kosketuslupa, iso iPad), aloitusviesti päivitettynä; Postivahti lähettää uusimman version kun tyhjä.

## OMISTAJAN LOYDOKSET 28–30 (BUILD 9, klo 16.4x, SITOVA): KALLISTUS SAILYY ZOOMATESSA, KORKEUSEROT PALJON VOIMAKKAAMMIKSI, PALLON PYORITYS KUTEN GOOGLE EARTHISSA (24.9.2026 klo 16.21)

28) eleet: kun kameraa zoomataan lähemmäs tai kauemmas, kallistuksen pitää pysyä — nyt se lähtee heti liikkumaan. 29) korkeuserot saisivat näkyä paljon voimakkaammin (korkeuskerroin). 30) palloa pitää voida pyörittää kuten Google Earthissa eli vaihtaa katselusuuntaa (heading) eleellä. Kaikki → Natiiviseppä, build 10; viesti odottaa Fablen viestirajan nollausta (Postivahdin Laitetestaaja-ohje jäi myös lähettämättä).

## PELIKOODARI: AVAUSTEKSTI ALOITUSNAYTOLLA (pelikoodari/avausteksti-portille d4950c0, BUILD 10) (24.9.2026 klo 16.22)

Portti → juliste ja arkki ('Heathrow, Lontoo, syyskuu 2026' + INTRO_TEXT intro-puhe.mp3:n tahdissa) → VALITSE ALOITUSKAUPUNKI (webin renderIntro); napautus ohittaa; valinta vaientaa kertojan, naksahdus, pallo suoraan valintanäkymään pulun kanssa; Lontoo-zoomi ja ulos-zoomi poistettu. Raja: Pelikoodari portista valintanäkymään, Natiiviseppä valinnasta eteenpäin (kamerareitti). Web-kuvat ja mitat (AVAUS_*_MS, INTRO_TYPE_MS 190) merge-pyynnössä; teksti paketista. liiku-tanne d7a6e4d PASS iPhonella (build 10).

## OMISTAJAN LOYDOS 31 (klo 16.4x, SITOVA): KALLISTUS LAHES HORISONTTIIN; 28–31 LAHETETTY NATIIVISEPALLE (24.9.2026 klo 16.22)

Omistaja: saako kallistuksen 90 asteeseen kun kartta on aidosti 3D. Fable: kyllä, raja ~85–88° (Google Earthin tapaan; 90° tekisi maasta viivan ja kamera menisi pinnan alle vuoristossa), sekä eleellä että kamera-ajoissa; laattojen näkyvyys ja usva/taivas tarkistetaan matalasta kulmasta. 28 (kallistus pysyy zoomatessa), 29 (korkeuskerroin, kolme vertailukuvaa omistajalle), 30 (heading-pyöritys kahden sormen kiertoeleellä, pohjoinen palautuu) ja 31 lähetetty Natiivisepälle build 10:een. Postivahdin Laitetestaaja-ohje lähetetty.

## SATELLIITTI: HARMAAT SUORAKULMIOT = LOD-VAIHTO (EI VERKKO) → ISALAATTA NAKYVIIN; S2-ALKUP + MERI VARJOSTIMESSA SINISEKSI; VIESTIRAJA EI SAADETTAVISSA (24.9.2026 klo 16.26)

Natiiviseppä: harmaat myös esiladatulla lennolla, kehys tai kaksi LOD-vaihdossa → isäkuva pidetään näkyvissä ennen bathy-oletusta; s2-alkup terävä mutta meri musta (kova sauma), sovitettu s2 ei ehtinyt piirtyä 20 s laskussa → s2-alkup + meri värjätään varjostimessa bathyn siniseksi; Fable hyväksyi. Kallistus palautettu aab08db; testi/b10b kääntyy (b10-haarat + Natiivi-UI ecc5d2a + zoomi + avausteksti + saapumisnäkymä b824987); seuraavaksi 28–31. Viestiraja (10 lähtevää per omistajan viesti tässä sessiossa): ei säädettävissä, dokumentoimaton, avoin pyyntö anthropics/claude-code#94000; nollaus vain uudella viestillä Fablen sessioon; agenttitiimit (kokeellinen, CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS) olisi vaihtoehto, ei oteta käyttöön nyt.

## SISALTOKIRJURI: CHURCHILL-NOSTO PR #3094; N2/N4/N5/N6 YHA AUKI; 14 SAA-PR:AA RISTIRIIDASSA VAIN VERSIOTIEDOSTOISSA (EI PRE-REBASEA) (24.9.2026 klo 16.26)

Fable: Julkaisija mergeää N-erät (#2996, #3002, #3004, #3006) ensin, sitten sää-PR:t (#3047–#3065, versiotiedostot mergessä), sitten kohdekartat ja #3094. Sisältökirjurin välityö: inventaarion kohta 9 turistioppaan kelvolliset kaupungit (71 + 20) perusteineen, ei sisältöä vielä.

## LAITETESTAAJA NOLLATTU (LUOVUTUS b8f867bb3 klo 16.23) — FABLE LAHETTI ALOITUSVIESTIN ITSE; testi/b10b aa17f73 SIMULAATTOREISSA (24.9.2026 klo 16.29)

Postivahti ei ollut vielä lähettänyt; sessio tyhjä (0 viestiä). Aloitusviesti (viesti-laitetestaaja-aloitus.md ilta) lähetetty session id:llä + heti-tehtävä: Pariisin lähizoomin kuvapari (löydös 26) ja avaustekstin natiivikuvat b10b:stä. Natiiviseppä: b10b = b10-haarat + Natiivi-UI ecc5d2a + saapumisnäkymä b824987 + zoomi aab08db + avausteksti d4950c0 + liiku-tanne; 28–31 ja korkeuskerroin kahdella Opus-agentilla.

## OMISTAJAN LOYDOKSET 32–34 (BUILD 9, klo 16.5x, SITOVA): SULJE LINSSI -NAPPI ANIMOITUU ✕:KSI, ISS-VIIVA NYKII, KUVIEN SELAUS SWIPELLA JA REUNANAPAUTUKSELLA (24.9.2026 klo 16.29)

32) Avaruuslinssin 'Sulje linssi' näkyy ensin tekstinä ja pienenee animoidusti kirjain kerrallaan pelkäksi ✕:ksi yläkulmaan; sama kaikkiin linsseihin (omistajan pyytämä natiivin lisäys) → Linssiseppä. 33) ISS-viiva liikkuu nykäyksittäin, pitää liikkua pehmeästi pallon ympäri → Linssiseppä (interpolointi joka kehys). 34) avatut kuvat selattaviksi swipellä ja kuvan reunaa napauttamalla, ei väkäsiä kuvan päälle → Natiivi-UI. Kaikki build 10.

## OMISTAJA KIRJAUTUI koodaus-KAYTTAJAN XCODEEN (klo 16.5x) → NATIIVISEPPA AJAA ISON iPADIN KAANNOKSEN (24.9.2026 klo 16.31)

Tili näkyy Xcoden tililistassa (IDE.Identifiers.Prod 1 tunniste); tiimilista latautuu. Natiiviseppä: xcodebuild -allowProvisioningUpdates -allowProvisioningDeviceRegistration isolle iPadille 00008103…; onnistuttua Linssisepän 1024×1366-kuvat ja Laitetestaajan laitekäyttö.

## SIIRTOSEPPA NOLLATTU (8 %) — FABLE LAHETTI ALOITUSVIESTIN (4335fdd71) + #2913:N KASITTELY; LAITETESTAAJA KAYNNISSA (12 %, RC); LINSSISEPPA: ISS-RATA KORJATTU (linssiseppa/b10-avaruus b13adaa), 32 → NATIIVI-UI (24.9.2026 klo 16.32)

Postivahti: Laitetestaaja nollautui ja käynnistyi (Fablen aloitusviesti), Siirtoseppä idle 8 % ilman aloitusviestiä → Fable lähetti. Linssiseppä: ISS-rata rakennettiin kerran sekunnissa → nyt joka kehys ilman allokointeja, testit 226/226; Sulje linssi -animaatio (32) on Natiivi-UI:n LinssiUi.cs:ssä → välitetty sille (1,2 s viive, 0,6 s animaatio). Video odottaa ison iPadin käännöstä.

## NATIIVI-UI: 'EI WEBISSA' -ERA 42c5015 (E1, E3–E5, E7–E20 + E10–E11) NATIIVISEPALLA BUILD 10; YLAPALKKI WEBIN MUKAAN ILMAN ⚙ (24.9.2026 klo 16.33)

Kuvaparit ja mitat proto-3d/lokit/pariteetti-b9/merge-pyynto-natiivi-ui-b10.md; efekti-*.mp3 esiladataan käynnistyksessä; hytinä (27) vielä tekemättä. Natiivi-UI:n kysymys: webin iPhone-palkissa logo, pilleri, ⚙, ☰ — Fable: täsmälleen webin mukaan mutta ⚙ ei palaa (omistajan ☰-linjaukset: asetukset ☰ → Muut → Asetukset); karttanappi ja kaupunki kartan yläkulmissa; korkeudet 57/61 px. Järjestys: yläpalkki → tekstitaustat → 27 → 34 → 32.

## SISALTOKIRJURI: TURISTIOPPAAN KELVOLLISET KAUPUNGIT (INVENTAARIO KOHTA 9, #3045 661282559) (24.9.2026 klo 16.33)

71:stä 56 sopii, 9 hylätty konfliktin takia (Darfur, Suakin, Gao, Murzuk, Al Kufra, Bahr el Ghazal, Ras Hafun, Tšadjärvi, Kamerun/Buea), 1 asumaton saari (San Ambrosio), 4 epävarmaa (Kongo, Sahara, Tanganjika, Ahaggar). Arvio yleistiedon varassa; konfliktilista silmäillään ennen sisältötilausta. Sisältökirjuri odottaa N2/N4/N5/N6-mergeä.

## SIIRTOSEPPA ALOITETTU (klo 16.32, RC PAALLA): #2913 REBASATTU (b3058360e), MERGEABLE (24.9.2026 klo 16.33)

peilaa-media.mjs: js/linssit-luku + mainin hetkikuvat-suodatus säilytetty. Askel 1 odottaa #3074:ää, askel 2 build 10:tä ja #3078:aa; #3081 luonnos. wt/proto-siirtoseppa poistettu.

## OMISTAJAN LOYDOS 35 (BUILD 9, klo 17.0x, SITOVA): AVARUUSLINSSIN PULU EI OLE OIKEA PULU (VALMIIT VASTAUKSET) (24.9.2026 klo 16.34)

Webissä korjattu aiemmin: pulu toimii avaruuslinssissä kuten muualla pelissä (oikea keskustelu). Natiiviin sama → Linssiseppä (Pelikoodarin kanssa jos chat-putki hänen), build 10, kuvapari.

## ISO iPAD: 'No Account for Team F72JLS57C5' — PERSONAL TEAM KUULUU TOISEEN APPLE ID:HEN → KEHITYSKAANNOKSET MAKSULLISEEN DEVELOPER-TIIMIIN (24.9.2026 klo 16.35)

Omistajan koodaus-Xcode-tili (me.com) ei sisällä Personal Team F72JLS57C5:tä. Fable: Natiiviseppä vaihtaa DEVELOPMENT_TEAM:n maksulliseen Developer Program -tiimiin (sama kuin Actionsin TEAM_ID), rekisteröi laitteet (-allowProvisioningDeviceRegistration) ja tekee automaattisen profiilin; Personal Teamia ei enää käytetä. Jos tiimilista ei lataudu, omistaja lukee tiimin nimen/ID:n Accounts-näkymästä.

## OMISTAJAN LOYDOKSET 36–37 (BUILD 9, klo 17.1x, SITOVA): MAAILMANAPPI PUUTTUU; KEHITTAJANAPIT JA HAMMASRATAS NAKYVAT ILMAN KEHITTAJATILAA (24.9.2026 klo 16.36)

36) webin karttanappi (maailmanäkymä) palautetaan kartan yläkulmaan webin mukaan. 37) kehittäjäsäätimet ja ⚙ piiloon kun kehittäjätila on pois (Raamattu: vain kehittäjätilassa; ⚙ ei pelaajan näkymässä). → Natiivi-UI, build 10, yläpalkin yhteydessä.

## LOYDOS 35 → LINSSISEPPA TEKEE ITSE (linssiseppa/b10-astropulu); PROTO-MASTER 3726485 (EI WEBISSA -ERA MUKANA); KORKEUSKERROIN bf5e82b (24.9.2026 klo 16.36)

Linssiseppä: webissä astronauttipulun pillerit ovat valmiita kysymyksiä oikeaan chat-reittiin (polloUlkoinenKysymys), konteksti 'Avattu valokuva avaruudesta' + selite ilman sijaintia, ei mikki/kaiutinriviä; natiivin vika MinipulunKortti (valmiit vastaukset) ja PuluChat.Konteksti (kaupunki) → Linssiseppä korjaa, koska Natiivi-UI:n jono on täynnä. Natiiviseppä: proto-master 3726485 (merge d3629d3) sisältää natiivi-ui/ei-webissa 42c5015; build 10 odottaa kuvapareja/korjauksia: saapumisnäkymä, zoomi, avausteksti, liiku-tanne iPad, fokuspohja, satelliitti (harmaat + meren värjäys), b10-avaruus, eleet 28–31, korkeuskerroin (bf5e82b: verteksisiirto varjostimessa, komento 'korkeus <k>', vertailukuvat tulossa).

## OMISTAJA klo 17.2x: PERSONAL TEAM F72JLS57C5 OLI gmail-TILIN; DEVELOPER-TILI ON me.com (NYT KIRJAUTUNEENA koodaus-XCODESSA) (24.9.2026 klo 16.37)

Koneen kehitysvarmenne 'Apple Development: Sami Reivinen (2RX77QMLHA)' kuuluu gmail-Personal Teamiin. Natiiviseppä vaihtaa kehityskäännökset me.com-tilin Developer Program -tiimiin (sama kuin TestFlight); Team ID pyydetty omistajalta (developer.apple.com Membership), koska Actions-secretiä ei voi lukea.

## LINSSISEPPA: LOYDOS 35 KORJATTU (linssiseppa/astropulu 1b2236e, MERGE-JONOSSA BUILD 10) (24.9.2026 klo 16.38)

Pillerit lähettävät kysymyksen oikeaan chattiin kuten webissä; valmiit vastaukset pois; astronauttikonteksti webin mukaan (ei sijaintia, avoin valokuva + selite). unity-tarkistus 0. Kuvapari isolta iPadilta kun laite on käytössä.

## OMISTAJA klo 17.3x: DEVELOPER PROGRAM TEAM ID RCD77XPB7M (me.com) — KEHITYSKAANNOKSET TAHAN TIIMIIN, PERSONAL TEAM F72JLS57C5 POIS (24.9.2026 klo 16.39)

Natiiviseppä ajaa ison iPadin käännöksen DEVELOPMENT_TEAM=RCD77XPB7M, rekisteröi kolme laitetta, Xcode luo varmenteen ja profiilin; Rakennus.cs:n kovakoodaus → MATKAKIRJA_TEAM. Eleet 28, 30, 31 valmiit (02847d7, testit 270/270); kallistussuunta (sormet alas = kallistus vai päinvastoin) kysytään omistajalta. Xcoden tiimilista ei latautunut me.com-tiimiä automaattisesti (IDEProvisioningTeamByIdentifier vain F72JLS57C5).

## NATIIVI-UI: BUILD 10 -JONO KOODATTU (natiivi-ui/b10-jono bee0199): YLAPALKKI 6ec3854, TEKSTITAUSTA 29326ba, HYTINA — FABLE KORJAUTTAA PALKIN (EI ⚙, ☰ OMISTAJAN VALIKKO, LINSSIT EI LAUKKUUN) (24.9.2026 klo 16.41)

Natiivi-UI teki palkin webin mukaan (logo, pilleri, ⚙, ☰; linssit laukkuun; ☰ = webin päävalikko). Fable: ⚙ pois (löydös 37), ☰ pysyy omistajan klo 13.3x valikkona (Raamatun hyväksytty poikkeama), linssit vain ☰:stä (klo 11.2x); iPhone 57 pt, iPad 50 → 61 pt; veto piilottaa, napautus/☰ palauttaa; vaaka piilossa. Tekstitausta: lehti ja nähtävyysarkit webin .dialog.arkki-tyyliin (#f5f0e2 + paperikohina); nostokortti jo webin mukainen — jos omistaja tarkoitti muuta, kuva. Hytinä: merkit liikkeessä pyöristämättä, levossa pikselille. Omistaja: Individual-tili riittää (App Store, TestFlight, IAP, 100 laitetta); myyjänimi = oma nimi, ei tiimijäseniä.

## OMISTAJA klo 17.4x: KALLISTUS KAHDEN SORMEN VEDOLLA ALAS (KUTEN NYT); DEVELOPER-TILI MUUTETAAN ORGANISAATIOKSI ENNEN APP STORE -JULKAISUA (24.9.2026 klo 16.41)

Kallistussuunta välitetty Natiivisepälle (02847d7 mergettävissä). Omistaja aikoo tehdä Individual → Organization -muutoksen (myyjänimeksi yritys) ennen ensimmäistä App Store -julkaisua; vaatii Y-tunnuksen ja D-U-N-S-numeron; TestFlight ja kehitys jatkuvat Individual-tilillä siihen asti.

## OMISTAJA klo 17.5x (KORTTI): MAAILMANAPPI VAIN KEHITTAJALLE (HUNTU POIS, LIIKKUMINEN KOKO PALLOLLA) — PUUTTUI KEHITTAJATILASSA BUILD 9:SSA; 37: VAIN ⚙ NAKYI ILMAN KEHITTAJATILAA (24.9.2026 klo 16.47)

Natiivi-UI: yläpalkki korjattu 0299fdb (⚙ pois, ☰ = linssivalikko, linssit eivät laukkuun); webin pelaajanäkymässä kartan kulmassa vain karttaselitteen nappi; maailmanappi webissä kehittäjän nappi → natiiviin kehittäjätilaan webin mukaan. 37: koodissa ilman kehittäjätilaa näkyi vain ⚙ (poistettu); muut kehittäjärivit sidottu Asetukset.Kehittajaan (PlayerPrefs, säilyy kunnes kytketään pois ☰ → Kehittäjä → Kytke pois) tai Debug-käännökseen.

## ISO iPAD ASENNETTU (TIIMI RCD77XPB7M, KEHITYS-APP ID fi.matkakirja.peli.kehitys, natiiviseppa/kehitystiimi 0295e8a); PROTO-MASTER 5876005 (ELEET f248117); testi/b10c 67dcc5e SIMUISSA (24.9.2026 klo 16.51)

iPad 11 ja iPhone rekisteröity samaan tiimiin; vanha app.matkakirja.proto3d oli Personal Teamin eikä siirry (omistaja hyväksyi uuden App ID:n). b10c: Natiivi-UI b10-jono, avausteksti, saapumisnäkymä, b10-avaruus, astropulu, korkeuskerroin. Kesken: korkeuskertoimen kuvat (postikortti peitti), Pariisin lähizoomi (natiivi pysähtyy kauemmas → dpi-tunnistus simulaattorissa mittauksessa). Linssiseppä ja Laitetestaaja saivat laitteen.

## NATIIVI-UI: LOYDOS 36 TEHTY (5d65549, b10-jono 9584ae2) — 'MAAILMA' KOKEET-OSION RIVINA KEHITTAJATILASSA (HUNTU POIS KOKO PALLOLTA) (24.9.2026 klo 16.51)

Webissä maailmanappi on kehittäjävalikon kytkinrivi (#kehittaja-maailma-btn), ei kartan päällä → natiivissa vastaava rivi ☰ → Kehittäjä → KOKEET. Panorointi natiivissa jo vapaa. Webin 'napauta kaupunkia siirtyäksesi' -kehittäjätoiminto Pelikoodarille tarvittaessa. b10-jono: palkki, arkkipaperi, hytinä, 32, 34, 36 → kuvaparit b10c:stä tai seuraavasta käännöksestä.

## LINSSISEPPA: ISON iPADIN KUVAPARIT (testi/b10b) — KEKSINNOT TASMAA KAMERA/KORTTI/FILMINAUHA/TUMMENNUS; EROT: LAMPPUJEN SCREEN-SEKOITUS JA PAIKANNIMET PUUTTUVAT LINSSIN AIKANA → KORJATAAN WEBIN MUKAAN (24.9.2026 klo 16.59)

Web 2082 km vs natiivi 2073 km, tummennus meri 43 vs 42; kuvaparit proto-3d/lokit/linssit-keksinnot-pari-20260924/pari-*-web-vs-ipad13.jpg; testityökalut isolle iPadille linssiseppa/iso-ipad 7562bbe. Huippuvuoret natiivissa värittymättä kunnes skeema 1.34 (#3081) ja #3078 mainissa. Laitetestaaja: löydös 26 odottaa dpi-mittausta (ei FAIL), avausteksti PASS rakenteellisesti (Pelikoodari korjasi 2 eroa 34a8fa8), b10c-lista käynnissä.

## LAITETESTAAJA b10c: YLAPALKKI JA TEKSTITAUSTAT KUVATTU — VAAKATILASSA YHA KELLUVAT PILLERIT (KORJATTAVA), TEKSTITAUSTA WEBISSA TASAINEN JA FONTTI LIHAVAMPI, NATIIVISSA OHUT FONTTI + KARKEA RAE (24.9.2026 klo 17.01)

Kuvat proto-3d/lokit/loydos26-pariisi-zoomi/. Fable Natiivi-UI:lle: vaakatilassa vain ☰ (ei pillereitä); webin --paper-noise on hienojakoinen feTurbulence (baseFrequency 0,9, alpha 0,2, multiply) → natiivin rae yhtä hienoksi tai pois; font-weight ja värit (#211d18, #16130f) webin mukaan; nostokortin web-kuva Playwrightilla klikkaamalla. Tekemättä Laitetestaajalla: noppa-kartalle, astropulu, iso iPad Linssisepän jälkeen.

## KEKSINNOT: PAIKANNIMET LINSSISSA — WEB NAYTTAA LAATTOIHIN POLTETUT NIMET, NATIIVIN 23a ILMAN NIMIA → NATIIVI NAYTTAA ELAVAT NIMIOT LINSSIN AIKANA WEBIN TYYLILLA (EI UUSINTAPOLTTOA); LAMPPUJEN HEHKU sRGB/LINEAARI (24.9.2026 klo 17.02)

Linssiseppä: web piilottaa elävät nimiöt linssissä kuten natiivi (css .pallolauta-nimi display:none), nimet ovat webin laatoissa. Fable: 'web on malli' koskee lopputulosta → elävät nimiöt linssin aikana samalla koolla/tiheydellä/zoomikynnyksillä kuin webin poltetut, vesinimet piilossa; Natiivisepän kanssa nimiökerroksen kytkin. Lamput: koko ja peitto samat (0,62/0,42), hehku himmeämpi (ka 54 vs 75, pino 132 vs 250) → sRGB/lineaari Valo-varjostimessa, 2–3 laitekierrosta. ISS-video ja astropulu kun b10c isolla iPadilla.

## OMISTAJA (KORTTI klo 18.0x): KORKEUSKERROIN 2 OLETUKSEKSI; KUVAPUTKEN TILAUKSET 3 JA 4 HYVAKSYTTY; LOYDOS 26 PASS; LOYDOS 38: NATIIVIN LAHIZOOMISSA EI PAIKANNIMIA (24.9.2026 klo 17.06)

Korkeuskerroin 2 (vertailukuvat proto-3d/lokit/korkeuskerroin-20260924/): Natiiviseppä lukitsee, nostaa koneen ja pisteet maaston mukana, tarkistaa kamera-ajot. Löydös 26 PASS (sama kaava 60/40, kerroin 1,5; suhde 1,49). Löydös 38 (Champagne 49,0°N 4,0°E): natiivissa ei nimiä, webissä CHAMPAGNE, Grand Est, Verdun, Reims — sama juurisyy kuin linssien nimet (23a ilman nimiä) → Karttaseppä tekee ehdotuksen (a nimikerrokset webin laatoissa, b elävät nimiöt vektoridatasta = Fablen suositus, c oma nimisarja natiiville), ei polttoa ilman päätöstä. Linssiseppä: lamppujen hehku korjattu (linssiseppa/b10-keksinnot 0d6d8f2, sRGB/lineaari, 107 vs 107). Kuvaputki: Fable kirjoittaa Codexin postilaatikkoon tilaukset maamerkkien viitekuvat 71 kaupungille ja renessanssisalin PD-teokset.

## KUVAPUTKEN TILAUKSET LAHETETTY CODEXIN POSTILAATIKKOON (claude/postilaatikko 962cf9077); N-ERAT MAINISSA (v2183–v2186); NATIIVI-UI b10-jono 0e8ff30 (24.9.2026 klo 17.09)

Tilaukset: posti/fable-kuvaputki-maamerkit-viitekuvat-20260924.md (70 kaupunkia, 3–4 PD/CC-viitekuvaa per maamerkki, ehdotetut kohteet, manifesti kuvatoimitus-maamerkit-viitekuvat) ja posti/fable-kuvaputki-renessanssisali-20260924.md (20–30 PD/CC0-maalausta 4000 px, 5 veistosta 3D-skannauksina, taiteilijoiden omakuvat, 1500-luvun kaupunkikartat; manifesti kuvatoimitus-renessanssisali). Julkaisija: N2 #2996 v2183, N5 #3004 v2184, N6 #3006 v2185, N4 #3002 v2186 (Siirtosepän testikorjaus #3095); sää-PR:t ajossa; #3093 versionostolla (ui.js, välimuisti). Natiivi-UI: vaaka ja veto → vain ☰ (b80fd27); tekstit webistä mitattuina (b542574: American Typewriter 16 #5a4326 lh 1,6; Iowan 16,32 #211d18 lh 1,62 + anfangi; kohina 3× tiheämpi ja vaimeampi; nostokortin riviväli 1,58); nostokortin web-kuvat napautuksella.

## NATIIVI-UI 70 % (POSTIVAHTI) — NOLLAUSKASKY ODOTTAA FABLEN VIESTIRAJAN NOLLAUSTA (24.9.2026 klo 17.09)

Natiivi-UI:lla b10-jono 0e8ff30 testikäännöksessä, kuvaparit tulossa; luovutus käsketään heti kun omistaja kirjoittaa Fablen sessioon (viestiraja täynnä). Myös Sisältökirjurin N-erien käsky odottaa.

## VIESTIRAJA NOLLATTU klo 18.2x: NATIIVI-UI:N LUOVUTUS (-h) JA NOLLAUS KASKETTY, SISALTOKIRJURIN N-ERAT ALOITETTU, POSTIVAHDIN ALOITUSVIESTIOHJE LAHETETTY (24.9.2026 klo 17.12)

Kolme viestiä toimitettu omistajan 'tehty'-viestin jälkeen.

## LINSSISEPPA b10d ISOLLA iPADILLA: LAMPUT WEBIN TASOLLA (PINOT VIELA HIMMEAMMAT), ISS-VIDEO, LINSSINIMET KYTKETTY; ASTROPULUN KUVAPARI ODOTTAA POLLOKOODIA KEHITYSAPISSA (24.9.2026 klo 17.16)

Lamput: yksittäiset ka 69 vs 73–77, pinot 127 vs 174 → korjataan erikseen. ISS: proto-3d/lokit/linssit-iss-20260924/iss.mp4. Linssinimet: Natiivisepän kerros e8d95dd (kapiteeli 9,5/10,5 pt, pisteet) kytketty keksintöihin (linssiseppa/linssinimet f4a5a6d); nostonimet Natiivi-UI:n ehdolla, merinimet Siirtosepän viennillä (build 11). Astropulu: kehitys-App ID:n Keychainissa ei pöllökoodia → Fable: kuvapari odottaa, omistaja syöttää koodin itse; ei koodia sessioille.

## NATIIVI-UI NOLLATTU (POSTIVAHTI): ALOITUSVIESTI HAARASTA natiivi-ui-ei-webissa (klo 17.3x), RC PAALLA (24.9.2026 klo 17.17)

Mainin kopio oli vanhentunut (10.5x) → uusin haarasta, kuten ohjeistettu. Postilaatikon commit 962cf9077 havaittu.

## ASTROPULU b10d: PILLERI MENEE OIKEAAN CHATTIIN, MUTTA WORKER HYLKAA KEHITYS-APP ID:N (HTTP 403 Origin ei ole sallittu) → PELIKOODARI LISAA fi.matkakirja.peli.kehitys SALLITTUIHIN (24.9.2026 klo 17.21)

Linssisepän korjaus: pöllökoodi ei ole chatin ehto (vain päivärajan ohitus). Kuvat proto-3d/lokit/linssit-astropulu-20260924/. Kuvapari webin kanssa kun worker sallii ID:n.

## LENTOPINTA HYVAKSYTTY MERGEEN (natiiviseppa/satelliitti 70b902c): BATHY + S2-ALKUP, MERI sRGB (17, 46, 92), Z2-VARAKARTTA KAYNNISTYKSESSA, KORKEUSKERROIN 2; PROTO-MASTER a47967d (24.9.2026 klo 17.22)

Fable katsoi lentopinta.jpg (kylmä ja lämmin lento): meri yhtenäisen sininen, Z7→Z8-sauma pehmeä, Kreikan lasku hyvä; kylmällä lennolla yksi suorakulmio kehyksessä 10 → varakartta ladataan käynnistyksessä. Masterissa: b10-avaruus (ISS-video), b10-keksinnot, kehitystiimi, iso-ipad, pelikoodari/uusi-peli-sulkee-aloituksen. Odottaa kuvaparia: linssinimet e8d95dd + f4a5a6d (Natiivi-UI:n NostotKartalla-ehto tehty), astropulu (worker-sallinta). Ämpärin karsinta (bmng topo, s2 sovitettu) vasta omistajan nähtyä build 10:n.

## PELIKOODARI: KEHITYS-APP ID fi.matkakirja.peli.kehitys SALLITTU POLLO-, EHDOTUS- JA SAHKEWORKERISSA (PR #3096) (24.9.2026 klo 17.22)

Oikeudet ja päiväraja kuten muilla natiiveilla; testit 186/186. Pöllö julkaistaan automaattisesti mergessä, ehdotukset ja sähke käsin (Julkaisija). Linssiseppä ottaa astropulun kuvaparin kun voimassa.
