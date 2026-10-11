# Päätoimittajan luovutus 11.10.2026 klo 18.5x (konteksti 63 %; omistaja HEREILLÄ ja aktiivinen)

Session local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. Edellinen: viesti-fable-luovutus-20261011-ilta.md. Muisti: fable-tila-20261011-ilta2.
Työjonot: scratchpad/tyojonot.md (lisäys: python3 scratchpad/tyojonot-lisaa.py "Päivitetty …"). Kirjattavat: scratchpad/kirjattavat-20261006.md
rivit 1245 → (15.4x–18.4x) → apuagentin docs-PR (haara fable-loki-20261011-ilta2, Opus-apuagentti käynnissä 18.4x; tarkista PR ja anna Julkaisijalle merge-lupa).

## 0. OMISTAJAN LINJAT TÄNÄÄN (lisäksi edellisten luovutusten kohta 0)
- JUNA 182 LÄHTEE NYT ILMAN OLAVINLINNAA (omistaja 18.4x): kaikki Olavinlinnan työ (jumit, laituri/keittiö v47v, uudet hahmot, totuuskorjaukset, keittiögrafiikka) → 183.
- CLAUDE KÄYNNISTETÄÄN UUDELLEEN JUNAN JÄLKEEN (omistaja 18.4x): kun TF 182 on Applella → uudelleenkäynnistysviesti rooleille (viesti-fable-luovutus-20261011-iltapaiva.md kohta 4) → kun kaikki VALMIS → omistajalle yksi rivi "voit käynnistää".
- Lautapeleihin ei värikorostusta (17.1x); Olavinlinnan esittelyn loppuun kysymys £25 (17.3x, NUI cea99d656 + #4419 → 183).
- Musiikit: kaikki 43 uutta hyväksytty peliin (18.4x; Moskovan uusi korvaa vanhan) → Äänittäjä vie, Pelikoodari kytkee 183.
- Codex: pääkaupungit e04–e14 (93 kaupunkia) tilattu; PEKING Codexille pääkaupunkien jälkeen (KS:n paketti valmis NAS karttaseppa/peking-codex-20261011/, TILAUS-LUONNOS.md PT:n viimeisteltäväksi). Pyörimislinssi tauolla.
- Uusi rooli ÄÄNITTÄJÄ (Sonnet 5.5, high) local_0275bc7a-a851-4f44-91d7-718735f6525b, checkout Matkakirja-aanittaja, ohitustila omistajan luvalla.
- Panoraamavapaus: kaupallinen peli → ei-kaupallinen FoP = ei FoP (PT 18.2x); eiKuvaa-kohteet pois oppaasta, ei Codex-havainnekuvia suojatuista.

## 1. JUNA 182 (Natiiviseppä, LUKITSE lähetetty 18.4x)
Runko 549bb6a89 = 93ad2fdeb (⊃ NUI kooste 81d463634, LS1 0d83ffedb + e4050506a) + Siirtosepän f2bae0ac6 yksin (LinssiOhjain.cs; Olavinlinnan Pelaa £20 avaa 181:n linnapaketin).
NS: testit + käännös → simuajo (Pelaa aukeaa, ei palautusta) → iPad-muistiajo (museo lisää muistia, ~25 min, PT päätti ajaa) → BUILD 182 → TF iOS + Mac → rivi PT:lle →
PT: omistajalle yksi rivi (mitä uutta, muutosloki-tyyli TF 181:n tapaan) → Asemataulun junat (Juna 182 → TF 182) → uudelleenkäynnistysviesti.

## 2. AVOIMET OMISTAJAN SUUNTAAN
- GOOGLEN 3D-LAATAT 429 (NS 18.4x): peli hakee Googlen laatat Cesium ionin jaetun Google-projektin kautta → jaettu nopeusraja ylittyy → pelaajat (myös TF) näkevät
  kaupungeissa valkoisia massoja ajoittain. Korjaus: oma Google Cloud -projekti + Map Tiles API -avain (bundle-rajattu), avain workeriin, natiivi lataa suoraan (ion varana);
  OMISTAJAN TOIMI: Google Cloud -tili + laskutus + API päälle (~10 min, NS antaa askeleet); koodi 183:een (~½ pv). EI VIELÄ KERROTTU OMISTAJALLE → kerro yhdellä kappaleella
  ja kysy lupa (hinta: Google laskuttaa 3D-juurilatauksista; tarkista virallinen hinnasto ennen lukua).
- Apple Maps (vastattu 18.3x): MapKit-näkymä mahdollinen, ei omaan 3D:hen; pilotti myöhemmin.

## 3. JUNA 183 (työn alla)
- Olavinlinna: Siirtoseppä botti 12/17 (jumit 16, 19, 61, 64, 75 → LR), LR v47v (laituri kevyempi muuri, keittiö, 91/92) b7c611b01, kadet-oikealle 16e2f0f82 linnahaarassa;
  LR: jumikorjaukset → MetaHuman-pilotti soutajalla (Unreal kiinni ennen ti 13.10. aamua) → grafiikka (keittiön kalkkiseinät + yöleivonta LS2:n V2:n kanssa; SK:n totuuskorjaukset;
  Branlyn materiaalit; Kielletyn kaupungin leikkaus). LT 8. kierros 183:ssa.
- LS2: grafiikan pystyleike V2 (222a376a0) → kalkkiseinät, yöleivonta, esineiden valo, fps + muisti ennen omistajan kuvaparia; raketti; Madrid Sol 589aecae0 (odottaa Googlen
  rajaa); Pariisi v6k19 KUITATTU (vienti + osoitin).
- NUI: olavinlinna-visa cea99d656 (odottaa sisältöpakettia 82cf19da7) + museolinssin kuva 3555b637d → kuvat samassa simuajossa → PT kuittaa.
- Pelikoodari: musiikki-arvonta a5995394f KUITATTU 183; 43 kappaleen kytkentä Äänittäjän listasta; Pariisin aukiot #4428 (LS1 kamerat); Stortorget #4416 mainissa.
- LS1: Pariisin aukiot e5ce4097d → kamerat simulla, kun worker julkaistu.
- KS: Euroopan kartan tarkistus #4429 (Tukholman Saltsjö + Strömmen maana = VAKAVA → korjaus-PR + kuvapari); Codexin e04–e14 laudan tiedot #4423.
- SK: 6 suoja-data-PR:ää #4421–#4427 (Julkaisija); Pariisin aukioiden tekstit; laajempi pakkatarkastus.
- Äänittäjä: vienti 43 → Pelikoodari; Euroopan ääni-inventaario → omistajalle (ei generointia ilman lupaa).

## 4. MUUT
- Levy 97 Gi (siivoukset 18.2x). 5 h -kiintiö 28 % (nollautuu 22.30), viikko 31 %.
- Session id:t: PT local_cf5b4eca, Postivahti local_63227b57, Julkaisija local_1325b8e8, Natiiviseppä local_04e2850b, NUI local_e9fdc695, LS1 local_4b4b976c,
  LS2 local_ee961a2d, LR local_2cf16574, Siirtoseppä local_c264506b, Karttaseppä local_4bd7c316, Pelikoodari local_242febe9, SK local_0c172ea0, Laitetestaaja local_3509b4ba,
  ÄÄNITTÄJÄ local_0275bc7a.
- SendMessage-raja 10 omistajan viestiä kohden → varakanava mcp__ccd_session_mgmt__send_message session id:llä.

## 5. VIIMEISIMMÄT (18.5x)
- OMISTAJALLE KYSYTTY (odottaa vastausta): 1) tehdäänkö oma Google-avain (429-korjaus, NS:n askeleet); 2) saako tehdä 5 puuttuvaa nopeaa introa (Bryssel, Košice, Ljubljana, Luxemburg, Valletta).
- Äänittäjä: 36 nopeaa viety, Moskova -lyria-v3 (ei ylikirjoitusta), inventaario 88cfa5df7 (docs-PR Julkaisijalle): luennat + kaaret puuttuvat 9 kaupungilta (Bryssel, Košice, Ljubljana, Luxemburg, Valletta, Bergen, Firenze, Sevilla, Tampere) → tekstit ensin (PT/tarinakaari), sitten äänitys omistajan luvalla; 15 pääkaupunkipistettä + Vatikaani ilman ääniä (kevyet pisteet, ei nyt); 3D-äänet vain Pariisi/Tukholma (kuten suunniteltu).
- KS #4429: Tukholman Saltsjö + Strömmen piirtyvät maaksi kohdekartassa → korjaus-PR + kuvapari (PT hyväksyi erän).
- Pelikoodari: Pariisin aukiot #4428 (vienti ennen mergeä), visa sisältöpaketissa 82cf19da7 → NUI kuvaa.
- 18.5x OMISTAJA: kyllä Äänittäjälle (5 nopeaa introa, lupa annettu Äänittäjälle); Google-avaimesta epävarma → LS2 mittaa 429-katkon keston 2 h (yhteenveto ~21) → kerro omistajalle tulos ja suositus (usein → oma avain; harvoin → odotetaan).
- 18.5x OMISTAJA PÄÄTTI: pysytään Cesium ionissa, EI omaa Google-avainta (EU-ehdot) → Raamattuun; LS2: 429-uusintayritys + pehmeämpi vara junaan 183; mittaus tiedoksi omistajalle ~21.
- 18.5x OMISTAJA kysyi Pariisin ja Tukholman Google-datan lataamista omaan ämpäriin → EI (ehdot); vaihtoehto oma 3D avoimesta datasta (IGN / Lantmäteriet + Geotorget-tunnus) – päätös Pekingin Codex-kokeen ja 429-mittauksen jälkeen.
- 18.5x OMISTAJA: 5 uutta nopeaa (Bryssel, Košice, Ljubljana, Luxemburg, Valletta) hyväksytty peliin → Äänittäjä vie, Pelikoodari kytkee 183. Siirtoseppä 18.54: botti 11/17 v47v:llä (keittiöön musta ruutu 12, 91/92 ennallaan → LR), NavMesh-korjaus ec31ca56e odottaa vahtia (183).
- 19.1x Raamattu + loki -PR #4431 (apuagentti; kirjattavat rivit 1245–1269 lokissa) → Julkaisijalle merge-lupa; Codexille FoP-lisäsääntö postiin c046a5646. Kirjattavat rivit 1270 → eivät vielä lokissa. Pelikoodari a3ab09f73 (47 nopeaa + Moskova-2 kytketty) → kuittaa simulokista. Juna 182 klo 19.08: iPad-käännös valmis, muistiajo kesken (Pariisi 1 läpi), simukäännös + Pelaa-todiste.
- 19.2x KUITATTU 183: Pelikoodari a3ab09f73 (korvaa a5995394f; 50 kaupungin nopeat introt + arvonta). Julkaisija: #4431 MERGED b47023b50, mainissa myös #4421–#4430; Pariisi v6k19 viety, osoitin uusin-4 vaihdetaan junan muistiajon jälkeen.
- 19.3x OMISTAJA: "työlista, laitteet ja roolit voisi tehdä pienennettäviksi myös asemataulussa" → julkaistu v53 (otsikkonapit, kiinni-tila localStoragessa); työkopio scratchpad/talon-tila.html → kopio tools/asemataulu/asemataulu.html:ään docs-PR:llä (myös laitteet.py).
- 20.04 TF 182 iOS + Mac Applella (Julkaisija); Asemataulu: TF 182 -rivi, Juna 183 kertyy, eteneminen tyhjennetty
- 20.1x Raamattu #4440 (Asemataulun kirjoittajat: Postivahti mittarit/roolit/laitteet, PT junat/tyolista/tehtavat/viestit/huom, NS + Julkaisija talo/eteneminen; agentti kirjasi vaiheet 1–4 NS:lle – TARKENNA: vaihe 4 kirjoittaa lataaja (iOS Julkaisija, Mac NS)) → Julkaisijalle merge-lupa. UUDELLEENKÄYNNISTYKSEN JÄLKEEN: Postivahti luo kierros-cronin uudelleen #4440:n kohdan 4 tekstillä (ei junan edistystä).
- 20.10 omistajalle lupa käynnistää Claude uudelleen; #4440 merge Julkaisijalle uudelleenkäynnistyksen jälkeen; JATKA-viestit kaikille 14 roolille (aloitusviestin kohta 3).
- 20.1x LS2 KUITTAUSPYYNTÖ 183 (36f80e3d7, kuva docs/raportit/kaappaukset/linssiseppa2-madrid-429-20261011/madrid-sol-ja-429-vara.jpg – katso itse): Madrid Sol 589aecae0, raketti a861c67c9, 429-vara d56415983 (NS katselmoi). 429-mittaus 18.51–20.07: 8/16 = 429, yhtäjaksoisesti 18.51–19.31, 19.36→ kaikki 200; loppuyhteenveto ~21 → omistajalle tiedoksi.
- 20.2x UUDELLEENKÄYNNISTYS TEHTY (omistaja "käynnistetty"); JATKA-viestit 13 roolille lähetetty; PT:n oma nollaus (konteksti 77 %) Postivahdin kautta.
- 20.2x LR MetaHuman-soutaja valmis (_valmiit/linna-hahmot/metahuman-soutaja-v1/) – PT katsoi: selvästi parempi (huomio hiusrajan saumaviiva); EI omistajalle Unreal-renderinä (Raamattu: vain pelistä) → NS kytkee testihaaraan + ilmeohjaus + iPad-muistiarvio + pelitallenne veneestä → PT → omistaja; LR jatkaa v47z, muut hahmot vasta hyväksynnän jälkeen. Siirtoseppä: botti 7/17 NavMesh r0,3 peruttu → 11/17-tila; LR v47z kaistat ≥ 0,9 m.
- 20.3x KUITATTU 183: Pelikoodari aarrelaskuri-50-183 b15558f5f (0/50, Istanbul syy). NUI: laskuri peittää Lontoon houkuttimen → korjaus olemassa olevilla pohjilla, kuva visa/museokuva-ajossa.
- 20.3x OMISTAJA: kohdekaupungit vain Euroopasta (TF 182:ssa Tanger, Kairo, Dubai) → Pelikoodari KIIRE 183; kysyi näkyykö 182 beta-testaajille → Julkaisija vastaa (ulkoinen ketju) → kerro omistajalle.
- 20.3x OMISTAJA: "sano heti kun 182 on beta testaajilla" → TF 182 beta-arviossa 20.26 (Julkaisija seuraa 15 min välein) → kerro omistajalle heti kun hyväksytty.
- 20.4x KUITATTU #4441 (KS karttakorjaukset; Tukholman kuvapari OK) → Julkaisija; KS seuraava: meriHaku kaikkiin Euroopan rannikkokaupunkeihin. Pelikoodari: vain-eurooppa-kohteet-183 vahvistettu (pelialue = Euroopan 50, myös mannerlennot), omistajan kuva kaappaukset/omistaja-20261011/9-kohteet-lontoosta.png.
- 20.4x KUITATTU 183: NUI cea99d656 (Olavinlinnan loppukysymys, £400 → £425) + 3555b637d (museolinssin kuva), arkki todistus-olavisa-iphone-20261011-2034; laskuri 909d0397a odottaa Euroopan näkymän kuvaa.
- 20.4x Pelikoodari: Euroopan ulkopuoliset kohteet = ALOITUSVALINTA vanhalla välimuistipaketilla (lahtokohde-kenttä lisätty 12.37 #4380; vara otti laudan maailman aloituskaupungit) → korjaus fb73adc9c (183; vara aina Ateena/Pariisi/Tukholma + pelialue Euroopan 50, mannerlennot pois), testit 515/515, kuva tulossa → kuittaa kuvasta. Kerrottu omistajalle.
