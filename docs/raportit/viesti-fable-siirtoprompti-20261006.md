# Siirtoprompti tilinvaihtoa varten (PÄÄTOIMITTAJA 6.10.2026 klo 23.4x, viikkokiintiö ~93 %, omistajan päätös "voidaan tehdä nyt vaihto")

Vanhan tilin roolit pushasivat luovutuksen ja aloitusviestin (kärjet kohdan 3 taulukossa). Claude-appi siirrettiin samalla
/Applications → /Users/koodaus/Applications (omistajan päätös 6.10. 11.2x / 22.2x; loki ~/Library/Logs/claude-appin-siirto-20261006.log).
Tarkempi tila: docs/raportit/viesti-fable-luovutus-20261004.md alku "TILANNE 6.10.2026 KLO 23.4x" (sama haara).
Päätökset: docs/raamattu-loki/paatokset-2026-09.md (grep "6.10.2026"); loki-PR #4072 (fable-loki-20261006c) odottaa Julkaisijan mergeä.

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

Omistaja avaa (tai käyttää tilin olemassa olevaa) session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, max) ja liittää:

> Olet PÄÄTOIMITTAJA (ent. Fable), Matkakirjan päätoimittaja. Nimeä session nimeksi ISOILLA "PÄÄTOIMITTAJA (Opus, max)".
> Checkout /Users/Shared/Claude/Matkakirja-fable, haara claude/bold-ride-vow4ki: aja `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull`.
> Lue CLAUDE.md, Raamatun Ydinajatus kohta 2, docs/raportit/viesti-fable-siirtoprompti-20261006.md KOKONAAN ja
> docs/raportit/viesti-fable-luovutus-20261004.md alku "TILANNE 6.10.2026 KLO 23.4x". Muisti MEMORY.md (erityisesti fable-tila-20261006,
> sessionimet-malli-effort, viikkoraja-97-siirtoprompti, sessioiden-luonti-appia-ohjaamalla, laitetestaaja-tulokset-list-events,
> talon-tila-lisaosa-pysyva, omistajalle-vain-suomeksi). Ota roolisessiot käyttöön kohdan 3 taulukon mukaan (tilin vanhat sessiot
> tyhjennetään clear_sessionilla tai luodaan uudet), aseta mallit ja nimet, lähetä aloitusviestit, kytke Remote Control kaikille ja itsellesi,
> ja jatka kohdan 2 jonosta. Kysy omistajalta tämän tilin viikkoraja (95, 97 vai 99 %) ja kerro se Postivahdille.

## 2. Tila ja jono (6.10. klo 23.4x)

1. **TF 152, 153 ja 154 testaajilla** (154 = master 8878ab70, 22.31). Mac v1 (f5d0e029) odottaa yhä Julkaisijan vuoroa (Natiiviseppä 23.4x); aja yksin, rinnalla enintään yksi mykkä simu.
2. **JUNA 155 (Natiiviseppä):** runko eb951c97 = BUILD 154 + LS2 gibs-pehmea 640eb7b4 (merisumu ja valotuksen olkapää, kuitattu).
   PAKOLLINEN ja omistajan päätöksellä ("Pidä nämä kaikki 155 junassa") Natiivi-UI:n noston/pinnatun tilan erä (nyt natiivi-ui/ylarivi-155 f1f455e7) (toistettu vika:
   pinnatun noston jatkopala korvasi pinnauksen → luenta alkoi alusta; ylärivi ilman kategoriaa + kategoriarivi otsikon yläpuolella;
   kolmen oikean kuvakkeen linjaus; pinnattu palkki hakunapin vasemmalle, aina vaalea, otsikko aina kokonaan; etenemispalkki koko nostolle;
   pinnattu tila pysyy kartan valinnassa ja AUTOssa + ensimmäinen kuva 3 s). Kuittaa NUI:n stilleistä (kaikki leveydet) → savu → VIE.
3. **JUNA 156:** NUI tapit sisemmäs/ylemmäs iPadilla, Seuraava-nappi + play/pause oikean tapin alle, oikean yläkulman napin osuma;
   LS1 esilataus-156 fb677d83 (esilataus kerronnan aikana, latauskuva 80 % kunnes laatat ≥ 90 % / 8 s, Seuraava-logiikka), pehmeät lennot
   (omistaja: pehmeys ennen kestoa, ei syöksyä), yövalot v5 (iPad-mittaus kun omistaja kytkee iPadin Wi-Fin 7.10.).
4. **WORKER (ei TF:ää, Pelikoodari):** kierros lyhimmäksi reitiksi, kerronta ~40 % pidemmäksi (vertailu Päätoimittajalle ensin), kuvalistan
   seuraavat erät (kuvat-v2 julki: Eurooppa 51 kaupunkia), #4081 yövalojen tiet, äänimaiseman äänikartta.
5. **KUVAURAKKA:** Sisältökirjurin Sonnet-parvi jatkaa vaihe 1:n 215 paikkaa (jatkokohta Sisältökirjurin luovutuksessa), sitten vaihe 2 (162).
   Codex tekee posti/fable-codex-oppaan-kuvat-linssivalikko-20261006.md (ERÄ 2 linssikuvat ensin, ERÄ 1 149 paikkaa × 1, 1B, 3).
6. **3D-KATTAVUUS (omistaja 23.5x: "noita 3d kohteita taitaa olla aika harvassa paikassa, lähinnä euroopassa?"):** LS1 kartoittaa oppaan 50 suosikkia ja pääkaupungit: Googlen tarkka fotogrammetria vs. karkea pinta (esim. kolmiotiheys/korkeusvaihtelu) → lista paikoista, joihin omat mallit (kuten Giza) tai latauskuva kannattaa kohdistaa.
7. **PILOTIT:** äänimaisema (Siirtoseppä mikseri, Pelikoodari kartta ja äänet), Giza (Linnanrakentaja mallit ~2 pv; LS1 Googlen ehdot clippingistä).
8. **OMISTAJALLA AUKI:** ISS-kameran rajausmerkit + julisteen ikkuna; iPadin Wi-Fi (7.10.); kuuntelusivun merkinnät.

## 3. Roolit (checkout /Users/Shared/Claude/…, haara, malli, kärki vaihdossa)

| Rooli | Checkout | Haara | Malli | Kärki |
|---|---|---|---|---|
| Postivahti | Matkakirja-posti | postivahti | Sonnet, medium | **65842a91e** |
| Julkaisija | Matkakirja-julkaisija | julkaisija-luovutus-20260928 | Opus, high | **7aefadb42** · ei ajoja, lukko vapaa, 0 simua; jono: juna 155, Mac v1 (odottaa KÄÄNNÖS NYT), LS1 koe-156, #4081 ja #4072 (testit pending) |
| Natiiviseppä | Matkakirja-3d-selvittaja | selvittaja-3d-luovutus | Opus, high | **b80645631** · juna 155 eb951c97 odottaa NUI 241fb080; Mac v1 f5d0e029 odottaa Julkaisijan vuoroa |
| Natiivi-UI | Matkakirja-natiivi-ui | natiivi-ui-luovutus-20261005 | Opus, high | **f74ecec19** · juna 155 proto natiivi-ui/ylarivi-155 f1f455e7 (luenta, taustatila, ylärivi, maakunta todennettu 2fadc15c:llä; pitkän otsikon korjaus odottaa käännöstä ja stillejä); 156 kirjattu, aloittamatta |
| Pelikoodari | Matkakirja-pelikoodari | pelikoodari-tyo-20260923 | Opus, high | **16b9c8f6** · kuvat-v2 julki; Pariisin äänikartta valmis (_valmiit/aanimaisema-vienti-20261006, 120 × 120, 278 kt; tarkistus, LAHTEET.md ja SHA256SUMS puuttuvat ennen vientiä); #4081 odottaa tiet-v2-vientiä (_valmiit/kartta-tiet-vienti-20261006b); #4082 pidempi kerronta luonnos (vertailu _tyo/aanimaisema-v1/kerronta: Eiffel 40 → 60, Kaarlensilta 42 → 61 sanaa → Päätoimittajan kuittaus); äänimaisema kesken; lyhin reitti aloittamatta |
| Linssiseppä | Matkakirja-linssiseppa | linssiseppa-tyo-20260923 | Opus, high | **9ed84e8b1** · proto esilataus-156 ab09a288 (esilataus, latauskuva, Seuraava, pehmeät lennot + mittari), koe-156 70f0bca62 (+ yövalot v5); mittaukset ja Gizan ehdot auki |
| Linssiseppä 2 | Matkakirja-linssiseppa-2 | linssiseppa2-tyo-20260928 | Opus, high | **efcda453b** |
| Linnanrakentaja | Matkakirja-linnanrakentaja | linnanrakentaja-tyo-20260929 | Opus, high | **63888b8b4** · Giza: maasto rajattu _valmiit/giza-v1/lahde/, datahaku kesken; linna odottaa Siirtosepän simuvuoroa |
| Siirtoseppä | Matkakirja-siirtoseppa | siirtoseppa-luovutus | Opus, high | **cde4d8164** · linna-149 183866ed + FACEIT 55ad6594 käännetty, todentamatta; äänimaisema c2f93576 odottaa Pelikoodarin karttaa; COZY e9729420 tuotu |
| Karttaseppä | Matkakirja-karttaseppa | karttaseppa-tyo-20260922 | Opus, high | **58c812ce2** · syksyajo A irrallisena 56/91, valmis ~0.40 (T7); talvi valmis 22.27; korjaus5 arkistoitu |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | sisalto-pelikatalogi-20260927 | Sonnet 5.5, high | **adc7baf34** (+ kuvatyö worktreessä wt/sisaltokirjuri-oppaan-kuvat, haara sisaltokirjuri-oppaan-kuvat, jatkokohta f0211575e 23.51: 155 kaupunkitiedostoa; tarkista, että se on pushattu) |
| Laitetestaaja | Matkakirja-laitetestaaja | laitetestaaja-savukierros-b13 | Sonnet 5.5, high | **397ea8e52** · TULOS 153 ja 154 OK, simut sammutettu (tulokset list_eventsillä, ei viestejä) |

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-<rooli>-aloitus.md
omasta haarastasi sekä sen osoittama luovutus, ja jatka. Päätoimittajan session nimi on PÄÄTOIMITTAJA (Opus, max)."
Sessioiden luonti: muisti sessioiden-luonti-appia-ohjaamalla (osascript; Trust = Tab + Return). Session nimiin malli ja effort.
