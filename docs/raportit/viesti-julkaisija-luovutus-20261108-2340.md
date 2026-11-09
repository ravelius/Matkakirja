## LISÄYS 9.11. 21.5x (TUOREIN; korvaa 18.43:n ja 18.5x:t; konteksti 27 % → nollaus)
- JUNA 224 = b804a87d6 PUSHATTU (natiivi-backup julkaisija/juna-224, wt /Users/Shared/Claude/wt/julkaisija-juna-221): 72b4e4477 + PK Kensington 7cf4f1f10 + NUI-ketju 0e4db4471 (Kohdenostot.cs käsin: kaksi uutta metodia, molemmat; KS nimet-4 + NUI temple-tahti-3 39204416d:llä ✓ PT) + NS huippunimet 68ee7187e + PK drone-lahelle 7227a9788. Testit T/juna224-j-*: unity 0, 729, 2279, 889. JUNA AUKI: lukitus ja TF VAIN OMISTAJAN pyynnöstä (PT).
- ASENNUSLINKKI (https://samimacstudio2.tail9af251.ts.net/, jako-kansio /Users/Shared/Claude/proto-3d/jako, palvelin pid 87396 EI tapeta): nyt MK kehitys 7227a9788 (juna 224 + drone), KK:lle ilmoitettu 21.3x. Paketointi: T/jako-paketoi.zsh <sha> <otsikko> <selite> (laitekäännös ensin: LINJA=n ASENNA=0 zsh T/laite-iso.zsh <sha>); vanhat ipat → lokit/jako-vanhat (ei poistoa).
- KOKORIVI: T/kokorivi.zsh (laite-iso.zsh kirjaa joka käännöksestä T/kokorivit.txt). ENNEN 7227a9788: ladattava 834 | purettu 2024 | talot 662 | resources 998 | framework 249 Mt.
- PELIN KOKO OSA 1 (PT 21.3x, suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-pelin-koko.md; vetäjä JU): haara julkaisija/pelin-koko-1 (wt /Users/Shared/Claude/wt/julkaisija-pelin-koko, b804a87d6:n päällä) 3bb5b1bd7 = Rakennus.cs: 23 simulaattorin varamallia (C–G) Resourcesin ulkopuolelle laite-/TF-käännöksen ajaksi (SimulaattorinMallitSivuun). KOKEILEMATON.
  SEURAAVAT: (1) KS:n vahvistus listalle T/pelin-koko-osa1-poistolista.md (kysytty 21.4x, odottaa); (2) A/H/I/J git mv Resourcesin ulkopuolelle (ehdotus: Assets/Matkakirja/Kartta/NotreDameKoe-arkisto/ tai repo-juuren arkisto/, EI poistoa); (3) testit + laitekäännös (kokorivi) + Mac-ajo Pariisin nähtävyyksistä ennen|jälkeen PT:lle; (4) valmis-rivi KK + PT: ladattava, asennettu, päivityksen koko ennen/jälkeen. ÄLÄ koske Rakennus.cs:n talopalojen kopiointiin/.valmis-tarkistukseen (osa 2, KS+NS). Osa 2:n vienti ämpäriin myöhemmin JU:lle.
- KS 21.5x: (a) jakosivulle ODbL-rivi lisätty 21.5x (index.html, säilyy jako-paketoi.zsh:n sedeissä); (b) poistolistan vahvistus tulee KS:n seuraajalta; (c) talojen natiivihaara karttaseppa/talot-palvelimelle-ns e5f6fcf72 (NS 5a04c09f4 + KS) yhdistetään junaan vasta PT:n kuittauksella, TF-tarkistus PR ravelius/Matkakirja#6523 ensin.
- KOKEET RAPORTOITU (kaikki ajot valmiit): VS vuoret11/12/13, NS huippunimet-7, kattokuvio-1c/1d/2, talolataus-1; PK kaksi-tappia, drone-lahelle 3f58830ff/7227a9788. Jono tyhjä.


## LISÄYS 9.11. 18.43 (TUOREIN; korvaa 17.5x:n jonon; konteksti 26 % → nollaus)
- JUNA 224 = 4db6234e9 PUSHATTU (natiivi-backup julkaisija/juna-224, wt /Users/Shared/Claude/wt/julkaisija-juna-221, nyt haaralla juna-224):
  db1dbdc9f + PK Lontoo-Pulu v4 08f48ac73 (ae1e1b680) + PK nimiäänet eb4318b15 (a571d41d8; sis. bda9945bf + KS d5aea75b7→fd079ee0e;
  sijainnit.json 3-tie-yhdistys avaimittain, ristiriidat 0) + PK valmisluennat v9 f043860b7 (sis. 6cd7efcdc). Testit T/juna224-d-*: unity 0, 729, 2279, 889.
  EI vielä: KS 9be5c8e2e (PT: junaehto, ennen lukitusta; kuvat ok paitsi Forum = skenaario), NUI ketju 0e4db4471/75e5b3f22 (KK:n Kyllä),
  PK 6a27206b2 (esihaku; GI-ajo ajossa 18.39 → lokit/pk-luennat-v9-iphone-6a27206b2, odotus: ei "testi 204", "esiladattu 2ca816e7… ok", 4 × valmis kappale → PK + PT),
  PELITILA 774e61032 (haara julkaisija/pelitila-lisamuisti, a571d41d8:n päällä; laitekäännös rc 0, Info.plist GCSupportsGameMode + pelikategoria ✓) → PT:n kuittaus odottaa.
  b75419ad3 EI poimita (nipistyskoodi 755a52fab jo 224:ssä; b75 = vanha tähti merkin takana).
- LISÄMUISTI kehitysversioon: ESTE. Macin Xcodessa ei Apple-tiliä ("No Accounts"), ASC-API ei tunne INCREASED_MEMORY_LIMIT (409) → omistajan toimi (Xcode › Settings › Accounts, tiimi RCD77XPB7M) viety KK:lle PT:n kautta. Sen jälkeen: MATKAKIRJA_LISAMUISTI=1 laitekäännös (T/jono-gd.zsh mallina).
- TYÖKALU: mac-yleis.zsh lisää ennen 1. kuvaa "komento pallo kerros pakota taysi" (PT 17.58; ei jos sk:ssa oma pallo kerros; pois KERROS_OMA=1); vanha: mac-yleis.zsh.20261109-ennen-taysi.
- VIENTI: luennat-v9-vienti viety 18.25 (SHA256SUMS:sta LAHTEET.md-rivi pois, alkup. T/luennat-v9-SHA256SUMS.alkup).
- RAPORTOITU kaikki 17.5x–18.40 ajot (NUI tähti-2 75e5b3f22, KS temple-vaisto/mallinostot-7/nimet-3/lontoo 9be5c8e2e, PK GA/GE/GH/FZ, VS vuoret10, NS huippunimet-6).
- JONO: vain GI (pid 70153). Pieni iPad -nipistys odottaa omistajaa. Asennuspalvelin pid 87396.
- 18.5x LISÄ: JUNA 224 = f89d62d0e PUSHATTU (+ KS 9be5c8e2e d0e2239bf + pelitila 774e61032; PT kuittasi molemmat), testit T/juna224-e-*: unity 0, 729, 2279, 889.
  LUKITUS ODOTTAA: GJ (pid 83679) KS nimet-4 + lontoo-kensington 9be5c8e2e → lokit/ks-pariisi-nimet-4-9be5c8e2e, ks-lontoo-kensington-9be5c8e2e → KS + PT (nimet-4: 2 pistettä ND:n laatikon sisällä EIVÄT saa avata ND:tä).
  GI (pid 70153) PK 6a27206b2 → PK + PT; poiminta vasta PT:n kuittauksella.
- 18.5x LISÄ 2: JUNA 224 = 72b4e4477 PUSHATTU (+ PK 6a27206b2, PT kuittasi), testit T/juna224-f-*: unity 0, 729, 2279, 889. KS nimet-4 ✓ (PT) ja Kensington ✓ raportoitu → LUKITUSEHDOT TÄYNNÄ, odottaa PT:n lukituskäskyä. Jono tyhjä.
