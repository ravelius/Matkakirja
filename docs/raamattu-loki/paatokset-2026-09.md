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
