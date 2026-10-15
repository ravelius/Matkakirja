# Natiivi-UI: luovutus 15.10.2026 klo 21.01 (Postivahti: kova raja 37 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261015-ilta5.md (proto-worktreet, asettelutestin
käyttö, opit). Viestit send_messagella id:llä (/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Remote natiivi-backup.
Proto-worktreet: /Users/Shared/Claude/wt/proto-natiivi-ui-aloitus-195 (natiivi-ui/aloitus-195) ja /Users/Shared/Claude/wt/proto-natiivi-ui-nimet-196
(natiivi-ui/nimet-196). Ennen käännöspyyntöä: tyokalut/tarkista.sh (0 virhettä).

## KESKEN (1. tehtävä): isoisän uni -video äänineen (PT 20.5x → PT → omistajalle kytkimen avaamisesta)
- Julkaisija antoi KÄÄNNÖS NYT (L2, natiivi-ui/aloitus-195 2cd6b6428). Käännös jonossa taustalla (L2-ruuhka, arvio alkaa ~21.45):
  tulos /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/isoisan-uni-196-app/kaannos.out (viimeinen rivi KÄÄNNETTY <SHA> … tai VIKA).
  Jos rivi puuttuu eikä proto-kaanna.sh ole käynnissä (pgrep -fl proto-kaanna), aja uudelleen:
  `PROTO_LINJA=2 PROTO_APP_KOPIO=<kansio> nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh 2cd6b6428 > <kansio>/kaannos.out`
- Kun KÄÄNNETTY: Julkaisijalle (local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914) "käännös valmis" → odota SIMULAATTORI NYT F7513985
  (natiivi-ui-iPad11) → `zsh /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ajo-isoisan-uni-196.zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/isoisan-uni-196-app`
  (skenaario sk-isoisan-uni-196.txt samassa kansiossa: `ui uni 1` → tap Aloita seikkailu → uni → avausteksti → `ui aloita pariisi lento` →
  Pulun 6 saapumisriviä; video + kaappaus isoisan-uni.wav). Tulos proto-3d/lokit/todistus-isoisan-uni-196-<aika>/.
- Yhdistä video ja WAV ffmpegillä (`-fflags +igndts`; ei tahdistusmerkkiä → alku voi heittää < 0,5 s, kerro PT:lle), tarkista ffprobe audio +
  kuuntele kohdat: alkusoitto, sähke, aloitus-ohje. Sitten simu alas (vain oma UDID), "SIMU VAPAA" Julkaisijalle, polku PT:lle.
- Tarkista ensin, että uni ylipäätään lähtee portin Aloita seikkailu -napista (Aloitusnakyma.PortistaKartalle) ja `ui uni` kirjaa "uni: päällä".

## TEHTY (pushattu, kaikki kytkinten takana)
natiivi-ui/aloitus-195:
- 572050cf6 ✕ kulmanappien alle (PT kuittasi kuvat). a64541901 → 2bdb7780c → f17359572 → 82a86debe aloitusvihjeen pienoismalli + vihjerivi
  mahtuvat iPhone vaakana (VihjeKatto: kerroksen vapaa korkeus − yläpuoli − alla oleva rivi, vähintään 56 pt); 8b262aa2c (viewport-pohjainen)
  kumottu, koska avausvaiheen matala alue lukitsi pystyssä pienen kuvan. PT sai kuvat 20261015-204137.
- 47fc24e2f KS:n vihjedata v2 (omistajan 20.24 rivit) mergetty.
- 856930465 + b3d59087c Isoisän uni: IsoisanUni.Puhe = aanet/isoisan-uni-v1/isoisan-uni-alkusoitto.mp3, Livian aloitus-ohje =
  aanet/pulu/isoisan-uni-v1/pulu-saapuminen-aloitus-ohje.mp3 (soi myös ilman unta: sama rivi). Tekstit = 20.24 hyväksytyt sanatarkasti.
  PT kuittasi junaan 196. 2cd6b6428 testikomento `ui uni 1|0`.
natiivi-ui/nimet-196 (kärki eb99e3497):
- a7bc1c407 NIMET-kuva (PT kuittasi). cf02fd8b9 vajaan ruuturivin täytteet ruudun luokilla (leveysvika).
- Mergetty: Valoseppä 477c2c8e4 + 6f7bf7cb1 (tulivuoret, Ehto, Raikoke/Hunga Tonga -kuvat; Reykjanes pois), Siirtoseppä 40c91b82a,
  578f99511 (kohokohdat), 1567458e0 (`ui linssi kohdevalikko paras <avain>`), e68ee684f (paras hetki oletus päällä 20.42 → LIVE piiloon).
- KOHOKOHDAT (omistaja 20.27): f0ec5acf2 → 4c6536c5f Siirtosepän rajapinnalla (Matkakirja.Linssit.Iss.IssKohokohdat: Kaytossa, Nakyvat,
  LennaParhaaseen(k.Hetki…), Valitse(k); Pulun kysymykset PK Valittu-tapahtumasta). Isot kuvaruudut 2/rivi (KohokohtaKuvaKorkeus 104),
  alla ISS nyt | Oma sijainti | Kaikki paikat › (kaikki-tila, ‹ Kohokohdat takaisin; avaus aina kohokohtiin). Kuva: k.Kuva tiedosto/osoite
  (pääte → Kuvat.Hae, bd2285c04) tai astronauttikuvan tunnus; tyhjä → ilmiöpaikan kuva samalla hetkellä (IlmioPaikka). Napautus lähettää
  ilmiöpaikasta myös IlmioValittu (tulivuoren efekti). Asettelunäkymä "iss kohdevalikko kohokohdat" (LataaKohokohdat, NIMET + paras hetki;
  eb99e3497 purku palauttaa paras hetki -kytkimen). PT sai kuvan 20261015-203753 (revontulet, tulivuori, Kiinan muuri ilman kuvaa).
- 04c95bd2c KESÄYÖN OPETUS (IssKohdevalikko.KesayoPulu false): kesä + yö + paikka Suomen yllä (lat 59,5–70,5, lon 19–32) → Pulu kerran
  opetuslause + kuittauksen jälkeen maapallo-lause (aanet/pulu/isoisan-uni-v1/pulu-kesayo-*.mp3). PT kuittasi.

## AVOIMET (järjestyksessä)
1. Isoisän uni -video (yllä).
2. Kohokohtien korttikuvat: Linssisepän seuraaja (revontulet, kiinan-muuri) ja Siirtoseppä (auringonnousu) tekevät pelinäkymästä
   JPG 3:2 960×640, ämpäriin kuvat/iss/kohokohta-<tunnus>.jpg, kohokohdat.json "kuva" = https://media.matkakirja.app/kuvat/iss/kohokohta-<tunnus>.jpg.
   Kun tulevat: merge SS:n datahaara nimet-196:een → asettelukuva "iss kohdevalikko kohokohdat" (iphone-pysty, ipad-vaaka) → PT (yksi
   yhdistetty kuva + LS1:n ikkunapari nimet päällä/pois omistajalle). iPhonella alarivin tekstit rivittyvät kahdelle riville (hyväksytty sellaisenaan).
3. Aloitusvihjeet: 4–5 Codex-kuvaa vielä tulossa (KS) → 2:1-kankaalle (LAHDE.txt) + .meta; kytkin vihjeet.json kaytossa false.
4. Tyylikirjan synkka webin PR #4639 mergen jälkeen (`node tools/tyylikirja.mjs --natiivi <proto-worktree>`).
5. Edellisten luovutusten avoimet ennallaan (intro-pehmennys laitteella, lasipohjan riskit, levyn app-kopiot).

## Opit
- unity-tarkistus.sh EI käännä Assets/Matkakirja/Editor/-koodia (AsetteluTesti.cs): editorivirhe näkyy vasta asettelutestin VIKA-rivinä.
  Käytä Editor-koodissa täysiä nimiavaruuksia (Matkakirja.Linssit.Iss.IssParasHetki).
- Ennen omaa rajapintaa: kysy datan omistajalta (Siirtoseppä teki rinnakkain IssKohokohdat-luokan; oma poistettiin 4c6536c5f).
- Kuvakehyksen korkeutta ei saa laskea vierityksen näkyvästä alueesta (riippuu sisällöstä → lukittuu pieneksi); käytä kerroksen kokoa.
