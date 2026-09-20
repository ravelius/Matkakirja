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
