# Karttaseppä: luovutus 11.11.2026 klo 14.08 (Raamattu 7.37)

Edellinen: viesti-karttaseppa-luovutus-20261111-1358.md (+ LISÄYS 14.0x). Tämä korvaa sen jonon; muut tiedot (PP, pallo, hylätyt paketit) ennallaan.
Natiivityöpuu /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, haara karttaseppa/montmartre (10356557a), puhdas, pushattu natiivi-backupiin.
HUOM: ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`. Testit: `sh Kartta-testit/kaanna.sh`, `sh Peli-testit/unity-tarkistus.sh`.
M = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/montmartre-maasto, K = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna.

## TEHTY TÄSSÄ SESSIOSSA
1. parentUrl TARKISTETTU: Cesium for Unity 1.26 (cesium-native LayerJsonTerrainLoader) lukee parentUrl:n, MUTTA (vuoristopilotti 12.10.,
   Laattapalvelin.cs:268) hakee lapsen polusta myös laatat, joita lapsessa ei ole → 404 → litteä; korjattu vain kehityskomennolla `maasto url`
   (MaastoLapsi/MaastoVanhempi). Lisäksi LaattapakettiRakennus lukee z0–5:n saatavuuden Rakennus.MaastoUrl:n layer.jsonista.
   → VALITTU TAPA A (kuten 214): täysi kansio 2026-11-11-montmartre = z0–12 maailman kopio + RGE ALTI z13–15, yksi layer.json ilman parentUrl:ia.
   M/tyokalu/yhdista-layer.py teki M/kerros/2026-11-11-montmartre/layer.json (maxzoom 15, maailman 0–12 + kerros 13–15; emot tarkistettu).
   parentUrl-versio talteen nimellä layer-koe.json (paikallinen pari `maasto url`, EI vientiin).
2. 863814508: Rakennus.MaastoUrl + Pallo.unity (maastoLayer, _url) → julisteet/maasto/2026-11-11-montmartre/layer.json;
   MaastoOhjaus.Kansiot = {2026-10-29-maailma, 2026-11-11-montmartre} (Lontoon kumpu toimii kummastakin) + testi. 759/759, unity 0.
3. JU:lle 14.0x vientipyyntö: ämpärissä kopio 2026-10-29-maailma/{0..12} → 2026-11-11-montmartre/, levyltä 13–15 + layer.json (ei layer-koe.json).
   ODOTTAA JU:n kuittausta. Haara ei toimi Macilla ennen vientiä (maasto 404).
4. 10356557a: Nahtavyysalue ScKoodi: Tripo-mäki (lahi-r8/sacre-coeur-maki) KoodiAvain, Tripo-pohja r8b PohjaPoisKoodilla (portaat jo ennestään). 759/759, unity 0.

## JONO (järjestyksessä)
1. MONTMARTRE jatkuu (EI JUNAAN ennen omistajan korttia kuvaparista):
   a) TALOT v17 (pariisi.json-versio; palat-vNN = paikallinen ajonumero, viimeisin palat-v41-pp = v16): vain Montmartren palat.
      Ketju: K/raivaus-1-1-petit-palais/aja-palat-v41.sh → K/raivaus-1-1-sc/tee-talot-sc-pohja.py (SC_DZ -16.5, SIISTI, KORVAUS, KAIKKI) →
      K/../koodimallit/tee-talot-nd.py → talokone /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/tee-palat.py
      (pohja :315 `T['pohja'] = (maa − palamaa)·KERROIN − 1,1·clamp(maa − 90, 0, 20)`, maa = IGN altitude_minimale_sol).
      Uusi pohja reiän r ≤ 1400 m paloille: 90 + (maa_RGE − 48,6) − PalaH, maa_RGE talon kohdalta (MontmartreKorkeus-taulukko / M/raaka);
      tarkista ensin TaloKerros.shader / TaloKerros.cs:432 (palaH = Sovita(maa + MaaLisays)), miten pohja ja palaH yhdistyvät, ja että tasaus a·b
      antaa saman 90 + (1 − b)(h − reunaH) kuin maa. Kokoa kuten kokoa-v41-pp.py (vain muuttuneet palat). Paketti K/talot-paketti-pariisi-v17
      vasta KK:n ja omistajan kortin jälkeen ämpäriin.
   b) Sacré-Cœurin koodimalli: MaaH / lattia / terassi / portaat RGE ALTI:sta (portaat ja maa ≤ 1 m koko matkalla).
   c) Mac-parit JU:lla (nykyinen 224.x | uusi, VASTA kun JU on vienyt maastokansion): esityskamera 4 suuntaa (rakennus ≥ 1/3), Place Saint-Pierren
      tasolta ylös, 5 km yleis, lähin (ei särmiä rinteessä, ei porrasta/rakoa mäkialueen reunalla). Mitat: talon pohja ≤ 2 m, portaat ≤ 1 m,
      nousu 0,9–1,2 × kirkko. Parit suoraan KK:lle (kopio PT).
2. PALLO: NUI:n varjokorjaus 81ac33721 → KJ JU:lla; katso kuvat, parit KK:lle (kopio PT).
3. PP: MR67 b8d7c913e → 224.73 PT:n pt-ok:lla; odota LINKKI-riviä.
4. GRAND PALAIS (KK 13.44: Montmartren jälkeen).

## LISÄYS 14.1x
- JU: vienti tapa a PT:n päätöksellä yöllä 01.00 (z0–12 kopio → 13–15 levyltä → layer.json viimeisenä). Rivi KS:lle aamulla; Mac-parit vasta sen jälkeen.
- JU ehdotti z0–12-uudelleenohjausta vanhaan kansioon (vain 53 laattaa vientiin): EI tehty, koska LaattapakettiRakennus (avaimet, sarjan etuliite, layer.json) on sidottu MaastoUrl:n kansioon. Kansio M/kerros/2026-11-11-montmartre lopullinen, älä muuta ennen 01.xx.
- PALLO KJ37b (81ac33721) VALMIS 14.12: rc 0, 16/16, kansio /Users/Shared/Claude/proto-3d/lokit/karttaseppa-pallo-kj37b-81ac33721 (rajaukset/). Esityskuvat liian kaukaa (aja 0.0012 ilman lahizoomia ≈ 800 m) → JU:lle 14.2x uusinta: lahizoomi 8, kallista 35, aja 48.8646 2.3268 0.0005 2, 4 suuntaa (ehto pallo ≥ 1/3 leveydestä, muuten 0.0003). Kun tulee: katso 1000 px kopioina, parit KK:lle (kopio PT).
- PALLO 14.4x: esityskuvat KJ37c–f (kallista 75, kohdepiste 93 m pallon takana katsesuunnassa, arc 0.0017) → koko pallo näkyy, ~1/4 korkeudesta; 1/3-leveysehto ei täyty 17 m:n pallolla (lähempää kamera kuoren sisällä). Parit KK:lle (kopio PT) K/parit-kj37/ (rajaukset + 4 suunnan arkki). ODOTTAA KK:n vastausta: hyväksyntä → junaehdokas (81ac33721).

## LISÄYS 4 (14.5x) — KORVAA JONON JÄRJESTYKSEN
- KK 14.46: PALLO HYVÄKSYTTY. Korjaus köydet tasavalolla 6c5b0f78d (Rakentaja.NormaaliYlos). Junaehdokas a0384240a (natiivi-backup karttaseppa/pallo-juna-pp) = PP b8d7c913e + pallo + Koodimallit.Oletus += "kuumailmapallo"; 759/759, unity 0. JU:lle pyydetty MR67:n jälkeen PT:n pt-ok:lla; KK katsoo köydet junan kuvista (ei uutta kierrosta). Odota LINKKI-riviä.
- KK 14.46 MITTA: korkeille ja kapeille kohteille esityskameran mitta on korkeus (~1/4 kuvasta + lähirajaus); muille 1/3 leveydestä ennallaan.
- JONO NYT: 1) GRAND PALAIS (KK 14.46 "seuraavaksi"; tarkista KK:n/PT:n aiemmat GP-linjat ja K/kj32-35-kansiot ennen työtä). 2) Montmartre talot v17 ja kirkko (ks. yllä 1a–b); Mac-parit vasta JU:n aamun rivin jälkeen (maasto vienti 01.00).
- JU 14.5x: MR70 a0384240a → 224.76 MR69:n jälkeen PT:n pt-ok:lla; linkin jälkeen JU ottaa pallon lähirajauksen + pelikameran lähimmän junan käännöksellä → katso ja välitä KK:lle (köydet).
- JU 15.53: LINKKI 224.73 = df0f36c4b (Petit Palais koodina + talot v16), testit läpi, manifest 200. PP VALMIS.
- PT 16.1x: pallo a0384240a pt-ok → 224.77 (ei 224.76). Appi kaatui ~16.08; KS nollaa itsensä tästä luovutuksesta. Seuraaja: Grand Palais (KK 14.46), sitten Montmartre talot v17.

## LISÄYS 8 (16.2x, uusi sessio 16.13)
- GRAND PALAIS: jo valmis (koodimalli 1:1 linkissä 224.63, 77e2a7d72, KK OK 09.2x); kaikilla Pariisin Tripo-alueilla on koodimalli. PT:lle kerrottu, kysytty, tarkoittiko KK uutta GP-korjausta. Jonossa nyt Montmartre.
- 1a TALOT v17-EHDOKAS koottu: K/raivaus-1-1-montmartre/palat-v42-mm (= palat-v41-pp + 18 Montmartren palaa 16595–16599 × 11267–11270).
  Ketju: aja-palat-v42.sh → tee-talot-mm.py (kääre tee-talot-sc-pohja.py:n päälle; korvaa tee-palat.py:n pohjarivin) → kokoa-v42-mm.py.
  Reiän taloille (keskipiste ≤ 1450 m pisteestä 48.8867 2.3431; 10 908 taloa) pohja = 90 + (h − 48,6) − 2·(palamaa + 15), h = RGE ALTI -maan minimi
  kehän kärjistä + keskipisteestä (bilineaarinen z14). Varjostin y = P + a·b·(90 − P) → keskellä 90 + (h − 48,6), reunalla 90 + (1 − b)(h − 48,6) = kartta.
  Mitat (mitat-v42.json): RGE − IGN altitude_minimale_sol mediaani 0,01 m (p5 −4,1, p95 4,4); kvantisointi ≤ 0,5 m; ei leikkauksia ±127.
  Ämpäripaketti K/talot-paketti-pariisi-v17 VASTA KK:n ja omistajan kortin jälkeen.
- 1b SACRÉ-CŒUR 4115be46b (natiivi-backup karttaseppa/montmartre): MaaH 130,5 → 123,9 (RGE-maan ylin terassin alalla), sokkeli 6 m,
  portaat RGE-profiilista 2,5 m välein (askelma päättyy maan laskettua 0,4 m tai 1,25 m:n jälkeen; kansi ≤ 0,7 m maan yläpuolella; z −63…−65,5 7 m:n tukimuuri jyrkkänä osuutena).
  Testi: kansi ≤ 1 m maasta 0,5 m välein. 759/759, unity 0. Mittaus K/raivaus-1-1-montmartre/sc-taulu.py (+ sc-taulu.json).
- 1c MAC-PARIT valmiina JU:lle: K/sk-mac-montmartre-kj43-ennen.txt (nykyinen juna, talot palat-v41-pp) | K/sk-mac-montmartre-kj43-jalkeen.txt
  (käännös 4115be46b, talot palat-v42-mm). Pyydä JU:lta VASTA aamun rivin jälkeen (maasto 2026-11-11-montmartre ämpärissä).
  Katso: esityskamera 4 suuntaa (kirkko ~1/4 korkeudesta), Saint-Pierre ylös, 5 km, lähin portaat + länsirinne. Mitat raporttiin, parit KK:lle (kopio PT).
- Avoimet: nimet ja merkit (MontmartreKorkeus RGE:stä bdccb177e) tarkistetaan pareista; jos rinteessä särmiä tai reunalla porras → raportti KK:lle, ei paikata mallilla.
- JONO: 1) odota JU:n aamun rivi → KJ43 JU:lle. 2) Sillä välin: PT:n/KK:n vastaus GP:stä. Jos ei muuta, rivi PT:lle "JONO TYHJÄ (odottaa maaston vientiä)".

## LISÄYS 9 (16.27): rivi suljettu, SYVYYSVETO (KK 16.26), NOLLAUS
- PT/KK 16.19: GP ei uutta korjausta. Rivi "Pariisin loput ylisuuret 1:1" VALMIS (tyolista.py valmis); KK:lle lista: 13 nähtävyyttä koodina, nolla Tripoa, kaikki 224.73:ssa.
- SYVYYSVETO 03ad357fb (natiivi-backup karttaseppa/syvyysveto-2 = juna-224 kärki 2882f055a + 1 commit): KK:n kaava SyvyysVeto = v · min(1, 0,8 · raja / 60)
  kolmeen varjostimeen (NotreDameKirkkoYhteinen.hlsl, OhjelmaKohde.shader, TaloKerros.shader). 758/758, unity 0. Tarkistettu: kaikki vedot ≤ 63 m → kerroin ≤ 1,
  ääriviiva (60 − taakse) skaalautuu samalla kertoimella → pysyy pinnan takana; ei lähitason eteen.
- AJO A JU:lla (pyydetty 16.3x, kopio PT): K/sk-mac-syvyysveto-kj44-a.txt, 8 kuvaa (Eiffelin juuri sisältä ja vierestä, Riemukaari 90 m ja 130 m, lähin kamera, kallistus 85), ENNEN 2882f055a | JÄLKEEN 03ad357fb.
  NUI yhdistää 03ad357fb:n haaraansa natiivi-ui/napautus-224 ajoa B varten (lähitasokatto pois/päällä) ja liittää skriptinsä samaan JU-ajoon.
  KUN KUVAT TULEVAT: katso 1000 px:n kopioina ja täysikokoisina rajauksina (litistys/leikkautuminen) ja lähetä parit ennen | jälkeen KK:lle (kopio PT). KK:n OK → junaehdokas
  (cherry-pick 03ad357fb juna-224:n kärkeen) JU:lle PT:n pt-ok:lla.
- Työpuu /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna on nyt haarassa karttaseppa/syvyysveto-2 (puhdas). Montmartre jatkuu haarasta karttaseppa/montmartre (4115be46b).
- JONO: 1) syvyysvedon kuvat (A + B) → KK. 2) Montmartre KJ43 JU:lle maaston 01.00-viennin jälkeen (ks. LISÄYS 8).
- NUI 16.28: 03ad357fb yhdistetty, B-ehdokas 2f4c0a80f (natiivi-ui/napautus-224); ajo B (sk-napautus-224-2-b.txt) JU:lla samaan Mac-ajoon A:n kanssa.
- JU 16.28: KJ44 A jonossa Macilla → /Users/Shared/Claude/proto-3d/lokit/ks-kj44-a-ennen-2882f055a ja ks-kj44-a-jalkeen-03ad357fb (kansiot KS + KK + PT valmistuttua); B NUI:n sha:lla (2f4c0a80f).

## LISÄYS 10: KK 16.30 JONO (korvaa aiemman järjestyksen)
KK merkitsi valmiiksi: loput ylisuuret 1:1, loput koodimalleiksi, oikea mittasuhde, Sainte-Chapelle.
1) SYVYYSVETO: tehty 03ad357fb, sha NUI:lle ja PT:lle lähetetty; näyttö ajoissa A (JU, lokit/ks-kj44-a-*) ja B (NUI 2f4c0a80f) → parit KK:lle.
2) PARIISI: NÄHTÄVYYKSIEN YMPÄRISTÖT TAKAISIN, katselmus kaikista 13 kohteesta (omistaja 10.11. 21.56 kysyi raivatusta tilasta).
   TAVOITE: kartta jatkuu katkeamatta kohteen seiniin; oikeat naapurit (talot, nimetyt rakennukset, puisto, puut) paikallaan; vanhan Tripo-pohjan kohdalla
   ei litteää vaaleaa kaistaa eikä tyhjää suorakaidetta; striimikartan talo ei työnny mallin läpi.
   NÄYTTÖ: jokaisesta kohteesta 2 kuvaa samalla rajauksella: suoraan ylhäältä ~400 m leveä + viisto 45° etelästä. ENSIN NYKYTILA yhtenä arkkina + puutelista
   kohteittain KK:lle ENNEN korjauksia (KK päättää rajaukset); sitten korjaukset YHTENÄ talot-eränä + parit. Vertaa oikeaan paikkaan (ilmakuva/kartta).
   (Pohjat: Nahtavyysalue.cs Pohja/PohjaPoisKoodilla/PuutPoisKoodilla, talot palat-v42-mm / v41-pp, raivaus-1-1-*-kansiot.)
3) PARIISI VALMIS: SEINE JA SILLAT -katsaus: koko Seine kuvina kaupungin läpi (vesi, rannat, sillat), Austerlitzin ja Iénan korjausten tila, puutelista.
4) OVERTURE-MITTAUS Lontoosta (rivi olemassa; Pariisin mittaus 621b77e8d mallina), pohjaksi Lontoon aloitukselle.
Montmartren KJ43: KK katsoo yöviennin jälkeen; ei junaan ennen omistajan korttia.
- 16.42 AJO A KATSOTTU, parit KK:lle (kopio PT): K/parit-kj44/ (pari-sv44-1…8, arkki-kj44-a.jpg). Eiffelin 1. kerroksen alapinnan sirpaleet (taivaslaikut, irtopalkki) poissa jälkeen-kuvissa; Riemukaari 90/130 m ennallaan ehjä. Odottaa: NUI:n B + KK:n päätös → junaehdokas 03ad357fb.
