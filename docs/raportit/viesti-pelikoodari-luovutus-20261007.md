# Pelikoodarin tila 8.10.2026 (lue ensin; alla 7.10. luovutus)

## 8.10. aamupäivä (uusi tili, omistaja opettaa: kysymykset vain Päätoimittajalle)
- KUSTANNUSSUUNNITELMA valmis ja Päätoimittajan kuittaama: #4182 (docs/raportit/kustannussuunnitelma-20261008.md
  + tools/kulut/hae-kulut.mjs + Actions "Hae kulut", workflow_dispatch). Omistajalle kaksi päätöstä (Päätoimittaja vie):
  ElevenLabs Pro → Creator, oma API-avain työkaluille.
- TOTEUTUS: #4185 K1+K3 (testiliikenne Haikulle + kululoki `kulu: <reitti> <testi|peli> <malli> in cw cr out`; Pulun kehys
  välimuistirajan jälkeen), #4186 K2 (oppaan aineisto välimuistiin, −49 %), #4187 K4 (valmiin kysymyksen vastaus kerran per
  paikka). Kaikissa TF 163 -todennus (scratchpad tfvert/aja.mjs: samat TF-pyynnöt main vs haara). Julkaisijan junassa.
  SEURAAVAKSI: kun #4185 on julki, tarkista kululokirivit Cloudflaren observabilitystä (telemetry/query, CLOUDFLARE_API_TOKEN
  `source ~/.zshrc`) ja raportoi Päätoimittajalle viikon jako. K1b (valmisvastaus savukkeille ilman mallia) ei vielä tehty.
- OLAVINLINNAN FP-ÄÄNET julki: seikkailu/olavinlinna/aanet-fp-v1 (askel-olki/-sora/-vesi/-porras-1, loyto-kantele; CC0,
  rakennus _tyo/olavinlinna-fp-aanet/rakenna.py). Siirtoseppä kuitannut junaan 164. Olavinlinnan ElevenLabs-äänet (≤ 10 000
  krediittiä) yhä odottamassa tarkistettuja tekstejä.
- YKSITYISKOHDAT: #4183 mergetty (Rooma v5, Lontoo v2, Kööpenhamina v3). Sisältökirjuri tekee 31 äänettömän kaupungin
  luettelot järjestyksessä venetsia, barcelona, amsterdam, … (tekstit opas/esittely-aaneton-v1); kytke kuten #4183.
- Worktree wt/pelikoodari-esittely POISTETTU (levy); haara origin/pelikoodari-esittely 90067f28 (työkalut tools/opas/).
  Käytössä wt/pelikoodari-yoportti (haara pelikoodari-kulu-k4).
- PALLOSANASTO (omistaja 08.3x, Päätoimittaja kuitannut): docs #4191 (fysiikkasäännöt: noste lämpötilaerosta, poltin vain
  nostaa, vaakaliike tuulesta), kertojan PALLO-osio #4189 (d4165bd15), 31 avausta opas/esittely-aaneton-v3 + #4190 (921a9693b),
  siltalauseet-v3 (16 ääntä, 74 krediittiä) ja v3b ilman pallo-lasku-04:ää ämpärissä; natiivin ryhmävalinta Linssisepälle
  junaan 165 (osoite siltalauseet-v3b). Työkalut _tyo/siltalauseet-v3/ ja _tyo/esittely-aaneton-v2/lisaa-pallo.mjs.
  ODOTTAA: Linssisepän uudet kierrosjärjestykset → tarkista "Kierros alkaa …" -virkkeet ja äänitetyt tekstit; ääni → krediitit
  Päätoimittajalle ennen tekoa. Worktree wt/pelikoodari-pallosanasto poistetaan #4191:n mergen jälkeen.
- SÄÄ: #4194 GET /opas/saa (MET Norway, CC BY 4.0, 15 min välimuisti, tila selkea|pilvinen|sade|sumu|lumi|ukkonen); Natiivi-UI nappi
  + Lähteet-rivi, Linssiseppä tehosteet, junaan 166. #4195 Haiku 5.5 -testimallin ajattelu pois (katto kului ajatteluun).
- KIERROSJÄRJESTYS: #4196 pieninKiertoReitti (Linssisepän malli, 37/37 sama; Giza 363° → 189°). Tekstit eivät viittaa
  järjestykseen (221 osumaa, historialliset), ei uusia ääniä. Odottaa Päätoimittajan kuittausta → Julkaisija.
- YKSITYISKOHTAKUVAT KAIKKI 37 ESITTELYKAUPUNKIA tuotannossa (#4200–#4205; 31 äänetöntä Sisältökirjurilta, v2/v3:t
  oikeustarkistuksista: berliini, helsinki, tampere, vilna, firenze v2, sisilia v3). Tarkistin: _tyo/yksityiskohdat-31/valmiit.txt +
  scratchpad ankkurit-v3.mjs (ankkurit v3-teksteistä + media_url 200). Codex-havainnekuvien v2-luettelot tulevat kaupunki kerrallaan.
- 8.10. ilta: SILTALAUSEET-v4 ämpärissä (alkukatko korjattu, puhe ≥ 120 ms, ei generointia; _tyo/siltalauseet-esivara/);
  LS1 vaihtaa OpasSovitin.SiltalauseetOsoite → v4 junaan 167. Ämpärin mp3:illa immutable-välimuisti → ÄLÄ ylikirjoita, aina uusi polku.
  KYSY-VIKA (TF 166): worker ok (curl-toisto scratchpad toista-kysy.mjs), natiivi ei lähetä kysymyksiä kierroksella → LS1.
  M-OSAN REPLIIKIT: valmis ajo proto-3d/tyokalut/pelikoodari-ajot/olavinlinna-m-repliikit.py (kuiva ok, ~48 krediittiä), --aja vasta
  omistajan luvalla Päätoimittajan kautta.
- OLAVINLINNA aanet-fp-v2 (M-osa, huoneet 6–10): 18 CC0/PD-tehostetta, paketti _valmiit/olavinlinna-fp-aanet-v2-vienti-20261008
  (Julkaisija vie), rakennus _tyo/olavinlinna-fp-aanet-v2/rakenna.py (vaiheet perus/lisat/freesound), agentin EHDOKKAAT.md raaka/-kansiossa.
  Freesound: secret FREESOUND_API, haku haarassa pelikoodari-freesound-haku (push-työnkulku, ei mergetä). Natiivikytkijä Päätoimittajalta.
  Työjonot: /Users/Shared/Claude/Matkakirja-fable/scratchpad/tyojonot.md (Päätoimittaja 8.10. SITOVA; valmis → rivi PT:lle → seuraava).
- UKKONEN: aanet/tehosteet/ukkonen/ukkonen-01…04.mp3 (Commons PD, _tyo/ukkonen/tee.sh), Linssiseppä kuittasi (juna 166).
- Tuotannossa 8.10.: K1–K4 (#4185–#4187), pallo #4189–#4191; kululoki näkyy (kulu: … testi claude-haiku-5-5).
- TURBO MAKSAA ~0,066 krediittiä/merkki (historia 8.10.), 31 kaupungin erä ≈ 23 000. Creator-vaihto: 30 äänipaikkaa (tilillä
  261) ja ei pcm_44100 API:lla → ei heti; omistajan päätös (Päätoimittaja vie).
- Simulaattorit 8.10. alkaen T7-sarjassa: `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh || exit 2`; nohup/xargs/timeout/env-ajoissa `xcrun simctl --set "$MK_SIMSET" …` ja UDID `mk_kaanna <UDID>`.

# Pelikoodarin luovutus 7.10.2026 (päivitetty klo 23.4x, VAIHTO NYT)

Uusi Pelikoodari: lue tämä, sitten docs/raportit/viesti-pelikoodari-aloitus.md. Edellinen: viesti-pelikoodari-luovutus-20261006.md.

## KESKEN JA SEURAAVAKSI (päivitetty 19.1x; tilinvaihto ~24)
0. OMISTAJAN LINJAUKSET 7.10.: KAIKKI ÄÄNET eleven_v4_turbo. TESTAUS KEVYESTI (ei stillejä/savuja kuittaukseen). EI OMIA
   iOS/iPad/Mac-KÄÄNNÖKSIÄ. ÄÄNIÄ EI GENEROIDA ennen omistajan pelitestiä (31 kaupunkia).
1. ESITTELY 37/37 TUOTANNOSSA: 6 äänellä (Pariisi, Praha, Wien, Rooma, Lontoo, Kööpenhamina) + 31 ÄÄNETTÖNÄ
   (opas/esittely-aaneton-v1/<id>.json, esittely_polut, aaneton: true → worker ei generoi, äänikentät pois; #4156,
   Reykjavík-alias #4157). TF 160/161 -jäsennin tarkistettu C#-ajurilla (scratchpad opas-cs, aja.sh): äänetön tekstinä.
2. KUN OMISTAJA ANTAA ÄÄNILUVAN: 31 kaupunkia, 661 ottoa, 346 469 mrk ≈ 173 000 krediittiä turbolla. Lähde
   _valmiit/opas-esittely-aaneton-vienti-20261007 (sama sisältö kuin pelikoodari-esittely 55c2af69). Aja
   tee-esittelyaanet.mjs (with-timestamps) + avaukset tee-aanet-kohdistuksella.mjs --r2 → tee-aaniajat.mjs --r2 →
   lopulliset JSONit polkuun opas/esittely-v1/<id>.json (aaneton pois, avaus.aani) → aineistot.js: poista esittely_polut-
   rivit näille. Ääni soi jo ennen JSON-vaihtoa, koska worker hakee R2:sta (aaneton-polku).
3. SANA-AJAT: kaikki 6 äänellistä kaupunkia R2:ssa (GET /opas/aani/<sha>.ajat.json, aani_ajat-kenttä #4152); Pariisi,
   Praha ja Wien paikallisella kohdistuksella (venv _tyo/venv-kohdistus, stable-ts small; skripti
   _tyo/kohdistus-pariisi/kohdista.py + lista2.mjs). Avausten ajat ämpärissä (opas-aaniajat-vienti-20261007).
4. YKSITYISKOHTAKUVAT kaikille 6 äänelliselle: Pariisi v2, Praha v1, Wien v1, Rooma v4, Lontoo v1, Kööpenhamina v1 (#4152,
   #4158, #4162, #4164); havainnekuva-rivit (havainnekuva: true) natiivi merkitsee junasta 163 (LS1). Uusi luettelo:
   tarkista ankkurit tuotannon tekstistä → aineistot.js yksityiskohdat_polut + tests/opas-esittely.test.mjs.
4b. PIDOSSA: #4168 oppaan turvakerrokset alaikäisille (alaikäistarkistus #4161 kohdat 1, 2, 3, 9; Julkaisija mergeää
   TF 162:n jälkeen). R2-sääntö opas-teksti-48h on jo voimassa. Kohdat 4–8 omistajalle.
4d. KUSTANNUSSUUNNITELMA 8.10. (Päätoimittaja 23.0x, omistaja: "kustannus todella korkea kun muita pelaajia ei ole"):
   (1) erottele testi/simu vs omistajan peli, (2) testi- ja kehitysliikenne EI Sonnetille (testiotsake → valmisvastaus
   tai Haiku 5.5), (3) Kysyn valmiit kysymykset: vastaus kerran per kaupunki + kehoteversio, välimuistista kaikille,
   (4) Pulun ~15 000 tokenin kehote: miksi joka kutsulla ~1 500 tokenin välimuistikirjoitus. Raportti: kk-kulu
   jaoteltuna, arvio korjausten jälkeen, kustannus per pelikerta (1 000 pelaajaa × 10/kk). Toteutus junaan kohta kerrallaan.
   LÖYDÖKSET 7.10. 23.1x: oppaan ei-testiliikenne 6.–7.10. tuli KOKONAAN Mac Studion verkosta (KV opas:p3:<pvm>:abc78e7d
   = 182 ja 193; abc78e7d = tämän koneen julkisen IP:n tiiviste, rajat.js tiiviste; omistajan laitteet kotiverkossa
   samalla IP:llä). Testiotsakkeelliset kutsut (testitunnus/kehittäjä) EIVÄT näy laskurissa mutta kutsuvat Sonnetia.
   Pulu: KV pollo:k 279 (syyskuu), 52 (lokakuu). Worker-lokit (observability) sisältävät pyyntöjen otsakenimet
   (requestHeaderNames: x-matkakirja-testi/-testitunnus) ja verkon (asOrganization) → luokittelu niistä; API
   accounts/<id>/workers/observability/telemetry/query (view events/calculations). Pulun välimuisti: ainoa breakpoint
   worker.js ~1861 system-lohkossa; cache_read 13 403 + cache_write 1 489 per kutsu → system-tekstin loppu (~1,5 k)
   vaihtelee kutsuittain → siirrä vaihteleva osa breakpointin jälkeen (lisaohje/käyttäjäviesti).
4c. OLAVINLINNAN ÄÄNET 8.10.: omistajan lupa enintään 10 000 krediittiä (turbo, yksi otto): ~30 huudahdusta (pelattavuusmalli
   3.6), kappelin 2 voudin repliikkiä ja CC0:sta puuttuvat tehosteet. Generoi VASTA kun tekstit valmiit ja Sisältökirjuri
   tarkistanut; kirjaa käyttö. Freesound-ehdokkaat: _tyo/freesound-olavinlinna/ehdokkaat.md (97 CC0).
5. Olavinlinna: repliikit-v1 ja tietokerros-v1 ämpärissä (Siirtoseppä).
6. Apurahakortti v7 + valmiitLinssit julki (#4146, #4147).
6b. Taustaajoja ei ole käynnissä (Pelikoodari). Työkansiot: _tyo/haiku-vertailu, _tyo/freesound-olavinlinna, _tyo/kohdistus-pariisi (venv _tyo/venv-kohdistus).
7. Worktreet: wt/pelikoodari-esittely (tekstit + työkalut), wt/pelikoodari-yoportti (erä-worktree). ÄLÄ KÄYTÄ Agent isolation remote.
   SendMessage-raja täynnä → varakanava mcp__ccd_session_mgmt__send_message (session_id).

## TÄNÄÄN JULKI (tärkeimmät)
#4082 pidempi kerronta, #4089 vuosiluvut, #4086 lyhin reitti, #4084/#4090/#4102 äänikartat (Pariisi, Venetsia, Kööpenhamina)
+ silmukat + tuuli/sade, #4092/#4098/#4109 sallitut (37; esto päällä #4108, OPAS_SALLITUT_ESTO=1), #4103 kuvat-v4, #4105 tiet
38 kaupunkiin, #4107 Kysy toisen kaupungin kohteeseen (kohde_nimi/_id/_lat/_lon), #4116 Giza kokeilukohteena
(x-matkakirja-kokeilu: giza) + valmiin esittelyn tarjoaminen, #4122 web: "Oppiminen on hauskaa" pois.
Siltalauseet v2 (ei-sallittu, 292 krediittiä), pilotin äänet 71 kpl + avaus/opastus/Notre-Dame (682 krediittiä).

## Työkalut (haara pelikoodari-esittely, ei PR:ää; worker-osat menivät #4116/#4126:lla)
tools/opas/: tee-esittelypohja, tarkista-esittely, koosta-esittely, tee-esittelyaanet (kohdistus), tee-aanet-kohdistuksella,
koosta-kuuntelu, tee-siltalauseet-v2. tools/kartta/tee-tiet.mjs välimuistiavain korjattu (keskipiste mukana).
Paikallinen opas-aineisto: node tools/pollo/tee-opas-aineisto.mjs ja palauta tynkä git checkoutilla ennen committia.
