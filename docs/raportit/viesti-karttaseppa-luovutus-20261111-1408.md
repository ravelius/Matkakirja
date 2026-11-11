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
- PT 16.43 (KK 16.42): SYVYYSVETO 03ad357fb HYVÄKSYTTY JUNAAN, pt-ok, JU vie kärkeen (224.75); työlistarivi 'Riemukaaren kolo' valmis. SEURAAJA ALOITTAA: jono 2 ympäristöt takaisin (LISÄYS 10).
- KK 16.45: 03ad357fb junaan ajon A perusteella (B ratkaisee vain NUI:n lähitasokaton). UUSI PIENI TYÖ ympäristöt-erän mukaan: Eiffelin 1. kerroksen siniharmaa suorakaide (K/parit-kj44/pari-sv44-4-*.jpg, jälkeen-puoli): selvitä koodimallista (OhjelmaKohdePariisiEiffel*.cs), mikä pinta; jos kerroksen tason alapinta/runko → tornin raudan tumma ruskea. Kuvapari samasta kulmasta (sv44-4: lähin, kallista 85, suunta 225, aja 48.85826 2.29450 0.0006 3) ympäristöt-erän ajossa, ei omaa ajoa.

## LISÄYS 11 (16.5x, uusi sessio 16.47): ympäristöt-erä alkanut
- KJ45 NYKYTILA JU:lla (pyydetty 16.49): K/sk-mac-ymparistot-kj45.txt, 27 kuvaa (13 × ylhäältä kallista 0 + viisto 45° etelästä, + ym45-14 Eiffelin 1. kerros sv44-4-kulmasta).
  Käännös juna-224 + 03ad357fb, oletustalot. Kuvat → lokit/ks-kj45-ymparistot-<sha>.
- IGN-ilmakuvat samoille aloille K/ymparistot-kj45/orto/ (data.geopf.fr WMS, ei robots.txt:tä, Etalab). Arkki: python3 -I K/ymparistot-kj45/tee-arkki.py <kuvakansio> → kj45-arkki-1..4.jpg (peli ylhäältä | IGN | viisto).
- Eiffelin siniharmaa suorakaide (sv44-4) = 1. kerroksen paviljonkien lasiseinät EiLasi 0x6E787C (OhjelmaKohdeEiffel.cs:167–170), EI alapinta/runko → KK päättää nykytilaraportissa (ei muutettu).
- Työlista: tilanne kirjattu riville "Pariisi: nähtävyyksien ympäristöt takaisin" (rivi "ylisuuret 1:1" on jo valmis).
- SEURAAVAKSI: kuvat → arkki + puutelista kohteittain KK:lle (kopio PT) ENNEN korjauksia; KK päättää rajaukset → korjaukset yhtenä talot-eränä + parit.

## LISÄYS 12 (17.34): KK:n rajaukset 17.3x, erä 1–2 tehty, NOLLAUS (konteksti 30 %)
- 17.26 nykytila + puutelista KK:lle: docs/raportit/karttaseppa-kj45-ymparistot-nykytila-20261111.md (e084a93aa), arkit K/ymparistot-kj45/kj45-arkki-1..4.jpg.
- KK 17.3x RAJAUKSET (yksi erä): 1) Eiffel: Tripo-pohja pois, kartan Champ-de-Mars jalkoihin, puut jalkojen molemmin puolin, ei tornin alle. 2) Puusto: GP+PP-puutarhat,
  Invalidien esplanadi ja puutarhat, Louvren Carrousel + Tuileries (pallon hiekkakenttä vapaa). 3) PALAIS DE JUSTICE tavallisina 3D-taloina talokoneella oikeassa korkeudessa,
  ei nähtävyysmallia; Sainte-Chapelle näkyy pihansa keskellä. 4) ND:n parvis-haamut pois. 5) SC Montmartre-erään. 6) Eiffelin paviljonkien lasi tummemmaksi/ruskeammaksi.
  KUNNOSSA: Panthéon, Opéra, Orsay, Montparnasse, Riemukaari. NÄYTTÖ: parit KJ45:n kulmista + IGN; MUISTI: puiden määrä, kolmiot, Macin muisti ennen/jälkeen; > ~5 % → KK:lle ennen junaa.
  Junaan KK:n sanalla kuvista.
- TEHTY (työpuu /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, haara karttaseppa/ymparistot = juna-224 96e9eb2fa + 2, natiivi-backupissa; 758/758, unity 0):
  dedc50853: Eiffel PohjaPoisKoodilla/PuutPoisKoodilla = EfKoodi "eiffel"; EiLasi 0x6E787C → 0x4C4741 (OhjelmaKohdeEiffel.cs); nd-koodi-puisto.png parvis'n OSM-nurmilaikut
  pois (nd-puisto/parvis-pois.py, x 0–85 y 125–235).
  90b66a261: KoodiPuut 598 puuta (Eiffel 164, GP 100, Invalidit 140, Louvre 194) = 598 000 kolmiota + varjot, 2 GameObjectia/puu; vain koodimallin kanssa.
  Tekijä K/ymparistot-kj45/puut/tee-puut.py (OSM natural=tree T7-planeetasta hae-puut.mjs → osm-puut.json; puistopolygonit +3 m; väli 20 m; Eiffel R 80 m, pallo R 45 m).
  ISTUTUSTAPA: kaupungin muut puut ovat maalattuina piirroskartassa (ei koodia); 3D-puut = ND:n koodipuiston tapa (KK 10.11.). Kerro KK:lle tämä tulkinta pareissa.
- KJ46 JU:lla (pyydetty 17.3x): K/sk-mac-ymparistot-kj46.txt, 14 kuvaa, ENNEN 96e9eb2fa | JÄLKEEN 90b66a261 + MUISTI-1/2 (phys_footprint). Kuvat lokit/ks-kj46-ymparistot-*.
  KUN TULEE: katso 1000 px (IGN rinnalle K/ymparistot-kj45/orto, sama ala), tarkista: Eiffelin alla ei maalattua tornia/outoa jäännöstä pohjan alta, puut eivät
  seiso talojen/koodimallien katoilla, pallon kenttä vapaa, lasi ei lue reikänä. Muistiero > 5 % → KK:lle ennen junaa (vaihtoehto: väli 28 m ≈ puolet puista).
- JÄLJELLÄ: 3) PALAIS DE JUSTICE talot. Talot poistettiin Tripo-aikana Citéltä (ND-alue "Talot samalla maskilla: palat-v4-nd-ranta", saari-pohja). Tee talot-erä
  pohjasta palat-v41-pp (nykyjuna; EI v42-mm, se odottaa Montmartren korttia): palauta Palais de Justice'n OSM-talot (Sainte-Chapellen jalanjälki + piha tyhjäksi) ketjulla
  raivaus-1-1-petit-palais/aja-palat-v41.sh → tee-talot-sc-pohja.py (SIISTI/KORVAUS) → kokoa (vain muuttuneet palat). Tarkista ensin, mikä maski/raivaus ne vei (grep raivaus-1-1-*/siisti*.json,
  korvaus*.json ja nd-ranta). Uusi talot-kansio talot-paketti → ämpäriin vasta KK:n sanalla. Sitten KJ46b-parit SC:sta (ym45-04-kulmat) + muisti.
- Montmartre KJ43 ennallaan (maaston vienti 01.00, sitten JU:lle).
- JU 17.29: LINKKI 224.75 = 96e9eb2fa (syvyysveto 03ad357fb junassa), manifest 200. SYVYYSVETO VALMIS.
- JU 17.35: KJ46 ALKOI (ennen → jälkeen). Muisti: lokit/ks-kj46-ymparistot-{ennen-96e9eb2fa,jalkeen-90b66a261}/MUISTI.txt + muisti-naytteet.txt (phys_footprint 3 s välein, MUISTI-1/-2 + huippu). Macin batch-Unity sisältää editorin (~5 Gt pohja): vertaa ERO ennen↔jälkeen ja suhteuta iPadin Pariisin muistiin (ei Macin kokonaislukuun) ennen 5 %:n arviota.
- KK 17.3x (SEURAAJALLE): istutustapa (3D-puut OSM:stä kuten ND:n puisto) HYVÄKSYTTY; lasi 0x4C4741 ja parvis katsotaan kuvista. EHTO ENNEN JUNAA, raportoi KJ46:n kanssa:
  (a) instansoidaanko puut: EI — koodista (Nahtavyysalue.LuoPuut ~r. 1980): jokainen puu oma GameObject + MeshRenderer ja lisäksi KovaVarjo-olio, jaettu verkko ja materiaali
  (NotreDameKirkko-varjostin), ei GPU-instansointia → 598 puuta = ~1 200 piirto-oliota. (b) Pariisin yleisnäkymän PIIRRETYT KOLMIOT ennen/jälkeen samasta kamerasta: KJ46 ei mittaa
  → selvitä komento/tilasto (esim. kehityskomento ruudun kolmioista tai UnityStats Mac-ajossa) ja pyydä JU:lta lisäajo yleisnäkymästä. (c) Macin muistiero (MUISTI.txt).
  RAJAT: muisti ≤ +5 %, piirretyt kolmiot yleisnäkymässä ≤ ~+10 %. YLITYS → EI harvennusta (28 m näyttää aukkoiselta), vaan kevyt massapuu ≤ ~250 kolmiota + varjot vain lähellä
  (ND:n puiston puut ennalleen); KERRO LUVUT JA VALINTA KK:lle ENNEN TOTEUTUSTA. Kohta 3 (Palais de Justice) ennallaan jonossa, parit KJ45:n kulmista.
- PT (KK:n linjaus 17.3x), SANATARKASTI: "ympäristöt-erä 90b66a261 EI junaan ennen KJ46:n kuvia ja lukuja. Ehto: 598 puuta × 1000 kolmiota → instansointi; yleisnäkymän kolmiot enintään noin +10 %, muisti +5 %; jos ylittyy → kevyempi puu ja varjot vain läheltä, EI harvennusta. Palais de Justice siirtyy seuraajallesi."
- JU 17.51: KJ46 VALMIS, molemmat rc 0, 14/14, Shader/NRE/PUUTE 0 → lokit/ks-kj46-ymparistot-ennen-96e9eb2fa ja -jalkeen-90b66a261 (MUISTI.txt + muisti-naytteet.txt).
  MUISTI (footprint sis. ~5 Gt editoria): ENNEN M1 5327 / M2 7454 / huippu 7730 Mt; JÄLKEEN M1 4974 / M2 8251 / huippu 8251 Mt (+797 Mt M2, +521 Mt huippu).
  HUOM: M1 on jälkeen PIENEMPI → kohinaa; 598 puuta jakavat 4 verkkoa, joten satoja Mt ei selity puilla. Selvitä näytesarjasta (muisti-naytteet.txt) samat kohdat kuvien mukaan
  ennen KK-arviota; tarvittaessa toisto. 'kartta muisti tila' ei tulosta riviä ja 'koodimallit tila' = TUNTEMATON KOMENTO (oikea komento selvitettävä, Komennot.cs).
  JU katsoi ym46-01-b: jälkeen puistopuut + allas Eiffelin kentällä näkyvät.
- PT 17.5x: muistin huippu +521 Mt ≈ +6,7 % > 5 % → ehdon mukaan kevyempi puu + varjot läheltä; luvut ja valinta KK:lle ennen toteutusta.
- KS 17.5x → KK (kopio PT), ODOTTAA KK:n OK:ta: muisti-naytteet samoista kohdista: keskivaihe mediaani 7101 → 7056 Mt, loppu 7253 → 7677, heilunta ±700 Mt, huippu viimeisessä
  näytteessä → kohinaa (puut laskennallisesti < 5 Mt, jaetut verkot). Kolmioehto (598k + varjot) ylittyy todennäköisesti → EHDOTETTU: kevyt massapuu ≤ ~250 kolmiota (puu-1
  kevennettynä, sama atlas), instansoitu piirto per alue+laji (Graphics.RenderMeshInstanced tms. 1 196 olion sijaan), varjot vain < ~400 m, ND:n puisto ennallaan; ~150k kolmiota.
  KK:n OK:n jälkeen toteuta + mittaa yleisnäkymän piirretyt kolmiot ennen/jälkeen (selvitä komento) + uusi KJ46-ajo.
- KK 17.5x: HYVÄKSYTTY valinnat 1–4 (kevyt puu ≤ ~250 kolmiota samalla atlaksella ja sävyllä, yksi instansoitu piirto per alue ja laji, varjot vain < ~400 m, ND:n puiston puut ennallaan).
  NÄYTTÖ: (a) yleisnäkymän PIIRRETYT kolmiot ja piirtokutsut ennen/jälkeen samasta kamerasta RUUDUN TILASTOISTA (ei laskennallisesti), raja ~+10 % kolmioissa;
  (b) muisti NS:n tila-rivin laskureilla (tekstuuri- ja varattu muisti), EI prosessin näytteillä (±700 Mt); (c) parit KJ45:n kulmista + lähikuva kevyestä puusta ~100 m:stä
  ND:n puiston puun rinnalla; (d) varjoraja 400 m liikkeessä: kaksi kuvaa rajan molemmin puolin samasta puurivistä (ei näkyvää poksahdusta). Junaan KK:n sanalla kuvista ja luvuista.
- SEURAAJAN JONO: 1) kevyt puu + instansointi + lähivarjot haaraan karttaseppa/ymparistot (90b66a261:n päälle), testit, näyttö a–d JU-ajolla → KK. 2) Palais de Justice talot. 3) Montmartre KJ43 (01.00 jälkeen).

## LISÄYS 13 (18.1x, uusi sessio): KEVYET PUUT TEHTY, KJ47 JU:lla
- Kevyet puut: Blender 5.2 decimate (saumat yhteen ensin, normaalit alkuperäisestä) K/ymparistot-kj45/puut/kevyt/kevenna.py → puu-1..4-kevyt 250 kolmiota, sama atlas (vertaa.png: ylä alkuperäinen, ala kevyt).
- Koodi haarassa karttaseppa/ymparistot (natiivi-backup): aa942ed74 + 797404a3c mittari `komento puut tilasto <nimi>` (PiirtoTilasto.cs: ruudun Render-laskurit
  kolmiot/kärjet/piirtokutsut/erät/setpass 30 kehyksen ka + muisti varattu/tekstuurit/gfx/verkot + puut/varjot/puukutsut/lähin kevyt puu);
  c0e77572c + 9f26843a1 puut: Nahtavyysalue piirtää kaikki puut Graphics.RenderMeshInstanced (yksi kutsu per alue ja verkko 0–7; ei GameObjectia per puu),
  KoodiPuutKevyet (Eiffel, GP, Invalidit, Louvre) → kevyt verkko, varjo kutistuu 300 → 400 m (VarjoTaysi/VarjoRaja), ND täysi puu + varjo aina.
  Varjostimet NotreDameKirkko(+Yhteinen.hlsl) ja KovaVarjo: multi_compile_instancing; Resources/NahtavyyspuuInstansoitu.mat ja KovaVarjoInstansoitu.mat pitävät variantin (Strip Unused).
  758/758, unity 0. ENNEN-mittauskäännös: karttaseppa/ymparistot-mittari-ennen 797404a3c (= 96e9eb2fa + mittari).
- KJ47 pyydetty JU:lta 18.1x (kopio PT): K/sk-mac-puut-kj47.txt, 22 kuvaa: (a) yleis viisto/ylhäältä 0.05 + keski 0.015 tilastoineen, (c) KJ45-parit + lähikuvat
  kevyt (esplanadi) | ND:n puisto kaari 0.0011, (d) varjoraja esplanadin rivi kaari 0.0028/0.0034/0.0040/0.0048 + liikkeessä, (b) muisti alku/loppu.
  KUN TULEE: tarkista Shader-virheet (instansointi), puut näkyvät (jos puuttuvat → variantti karsittu), luvut: kolmiot ≤ ~+10 % yleis, muisti; parit + luvut KK:lle (kopio PT).
- JONO: 1) KJ47 → KK. 2) Palais de Justice talot (aloitettu 18.1x). 3) Montmartre KJ43 (01.00 jälkeen).

## LISÄYS 14 (18.2x): PALAIS DE JUSTICE -SELVITYS, NOLLAUS (konteksti 27 %)
- KJ47 JU:lla (pyydetty 18.1x, kopio PT; JU:n sessio oli kesken, viesti jonossa). Tuloksia ei vielä tullut.
- PdJ NYT (v41-pp, KJ45 ym45-04): talot EIVÄT puutu. Ketju tee-talot-sc-pohja.py (VARA 0,5, SC_DZ −16,5) leikkaa taloista vain SC:n KOODIMALLIN pohjan
  + 0,5 m ja poistaa SC:n oman OSM-rakennuksen relation/3344870; Tripo-ajan SC-suorakaide on jo poissa. SYY "matala/litteä": koko Palais de Justice on OSM:ssä
  YKSI multipolygon relation/536982 (building=civic, ei height-tagia, 28 484 m²), joten talokone (tee-palat.py korkeus(): IGN BD TOPO -talo, joka sisältää
  keskipisteen, muuten lähin) antaa koko kompleksille YHDEN korkeuden → tasainen naapurien korkuinen massa. Naapurit: Cour d'assise way/245531936 (ei korkeutta),
  Tribunal de commerce way/53601032 (height 25).
- EHDOTETTU TAPA (ei vielä tehty): kääre tee-talot-sc-pohja.py:n päälle (kuten tee-talot-mm.py), joka korvaa relation/536982:n IGN BD TOPO -rakennuksilla
  (P/ign/*.json, kentät hauteur, altitude_minimale_sol) sen ulkorenkaan sisältä: kukin IGN-osa omana talonaan omalla korkeudellaan; IGN ei kata pihoja, joten
  SC:n piha jää tyhjäksi; SC:n koodimallin pohja + 0,5 m leikataan kuten nyt. Tarkista ensin: IGN-osien korkeudet PdJ:n alalla (odotus ~20–35 m, Conciergerien tornit)
  ja nykyinen yksi korkeus (aja korkeus() samalla datalla). Pohja palat-v41-pp (EI v42-mm), kokoa vain muuttuneet palat (kokoa-v41-pp.py mallina),
  uusi kansio K/raivaus-1-1-pdj/; ämpäriin vasta KK:n sanalla. Sitten KJ46b-parit ym45-04-kulmista + IGN (K/ymparistot-kj45/orto) + muisti (`puut tilasto`).
- SEURAAJAN JONO: 1) KJ47 kuvat + piirtotilasto-rivit → KK (kopio PT); jos puita ei näy JÄLKEEN-kuvissa → instansointivariantti karsittu (tarkista unity.log Shader).
  2) PdJ yllä olevalla tavalla. 3) Montmartre KJ43 maaston 01.00-viennin jälkeen.
- JU 18.2x: KJ47 alkaa (lokit/ks-kj47-puut-{ennen-797404a3c,jalkeen-9f26843a1}, MUISTI.txt = piirtotilasto + Shader-virheet). PALLO a0384240a ei mergeytynyt (ristiriita NUI:n KaupunkiPallot.cs/UiKomennot.cs) → NUI tekee pallo+kyltin juna-224:n päälle → 224.81 (224.79 muste, 224.80 NUI). KS:ltä ei toimia; seuraa LINKKI 224.81 ja katso köydet junan kuvista (KK).
- NUI 18.2x: pallo+kyltti natiivi-ui/pallo-kyltti-224 652653bc7 (merge a0384240a + 9c6a6f864, Oletus kuumailmapallo mukana), unity 0, 763/763 → JU MR75 = 224.81. KS:ltä ei toimia.
- JU 18.2x NUMEROKORJAUS: kuumailmapallo 652653bc7 = 224.80 (EI 224.81; yllä 14b/14c korjautuu). Seuraa LINKKI 224.80.

## LISÄYS 15 (19.5x, uusi sessio 18.3x): PdJ suljettu, KJ47 katsottu, KJ47b JU:lla, NOLLAUS (konteksti 25 %)
- PALAIS DE JUSTICE: KK 18.34 PÄÄTÖS EI talot-erää (IGN ja OSM: koko kompleksi yksi rakennus 23,4 m; IGN-osia ei ole). docs/raportit/karttaseppa-pdj-selvitys-20261111.md.
  Seine ja sillat -katsaukseen (LISÄYS 10 kohta 3) katsottava kohta: Conciergerien jokijulkisivu (tornien puute joelta).
- KJ47 katsottu → KK 19.0x: docs/raportit/karttaseppa-kj47-puut-20261111.md, parit K/parit-kj47/. Muisti ≈ 0 ja piirtokutsut +8–11 % HYVÄKSYTTY (KK).
  Unityn Triangles Count ei näe instansointia → uusi mittari. Varjoraja ei todennettu: aja-kaari rajautuu lähimpään näkymään ilman `komento lahizoomi 8`.
- KK 19.01 HYVÄKSYI KJ47b: (1) näkyvät kolmiot (2) puu-3 pois (3) varjoraja uudelleen + (4) sijoittelu oikean puiston mukaan, akselit auki
  (5) harhapuut pois, myös Rodin (6) sävy maalattuun puustoon. NÄYTTÖ: KJ47:n kulmat + Champ-de-Mars ylhäältä orton rinnalla + 3D|maalattu läheltä.
- TEHTY: ce7a3849c (karttaseppa/ymparistot, natiivi-backup; 758/758, unity 0): 789 puuta v2 (tee-puut-v2.py, K/ymparistot-kj47b/: LÄHDE OSM-puurekisteri,
  tarkistettu IGN-ortoa vasten orto/merkit-v2-*.jpg; akselit Champ-de-Mars ±55 m ja esplanadi ±45 m, viuhka, Invalidien kortteli, Rodin pois; harhapuu = < 2 OSM-naapuria 15 m:ssä;
  väli 13 m rasterijärjestyksessä, jotta rivit pysyvät; lajit (0,0,1), Prunus → 1). Kevyet puut omalla aineella puuAineKevyt _Savy (1.25, 1.2, 1.1) haalistus 0.35,
  komento `puut savy r g b [h]`. MITATTU (savy.py, KJ47 jälkeen-kuvat): maalattu puusto sRGB ~128 130 84, 3D-latvus ~90 90 55 (lineaarisesti ~2× tummempi; kylläisyys sama).
  PiirtoTilasto: "NÄKYVÄT kolmiot" = isVisible-piirtäjien verkot + pääkameran näkymään osuvat puuerät. ENNEN-mittari b19f3b2ee (karttaseppa/ymparistot-mittari-ennen).
- KJ47b JU:lla (pyydetty 19.5x, kopio PT): K/sk-mac-puut-kj47b.txt, 28 kuvaa → lokit/ks-kj47b-puut-{ennen-b19f3b2ee,jalkeen-ce7a3849c}.
  KUN TULEE: parit pari.py:llä (K/pari.py a b ulos 2000) kansioon K/parit-kj47b/; Champ-de-Mars (ym47b-40) orton rinnalle (K/ymparistot-kj47b/orto/orto-eiffel.jpg);
  sävy: aja savy.py-tapaan 3D vs maalattu (ym47b-41/42), valitse 42/43/44:stä lähin maalattuun ja kerro arvot; varjoraja 30–35 (lähin m lokista, ei poksahdusta);
  kolmiot: NÄKYVÄT ennen → jälkeen yleisnäkymissä, raja ~+10 %. Luvut + parit KK:lle (kopio PT). Junaan VAIN KK:n sanalla.
- SEURAAJAN JONO: 1) KJ47b → KK. 2) Montmartre KJ43 maaston 01.00-viennin jälkeen (JU:n aamun rivi). 3) Seine ja sillat -katsaus (LISÄYS 10 kohta 3, + Conciergerie).
