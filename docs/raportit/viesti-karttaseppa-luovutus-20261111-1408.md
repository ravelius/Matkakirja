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

## LISÄYS 15 (19.08, uusi sessio 18.3x): PdJ suljettu, KJ47 katsottu, KJ47b JU:lla, NOLLAUS (konteksti 25 %)
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
- KJ47b JU:lla (pyydetty 19.0x, kopio PT): K/sk-mac-puut-kj47b.txt, 28 kuvaa → lokit/ks-kj47b-puut-{ennen-b19f3b2ee,jalkeen-ce7a3849c}.
  KUN TULEE: parit pari.py:llä (K/pari.py a b ulos 2000) kansioon K/parit-kj47b/; Champ-de-Mars (ym47b-40) orton rinnalle (K/ymparistot-kj47b/orto/orto-eiffel.jpg);
  sävy: aja savy.py-tapaan 3D vs maalattu (ym47b-41/42), valitse 42/43/44:stä lähin maalattuun ja kerro arvot; varjoraja 30–35 (lähin m lokista, ei poksahdusta);
  kolmiot: NÄKYVÄT ennen → jälkeen yleisnäkymissä, raja ~+10 %. Luvut + parit KK:lle (kopio PT). Junaan VAIN KK:n sanalla.
- SEURAAJAN JONO: 1) KJ47b → KK. 2) Montmartre KJ43 maaston 01.00-viennin jälkeen (JU:n aamun rivi). 3) Seine ja sillat -katsaus (LISÄYS 10 kohta 3, + Conciergerie).

## LISÄYS 16 (20.3x): KJ47b katsottu → KK, KJ47c JU:lla
- KJ47b: raportti docs/raportit/karttaseppa-kj47b-puut-20261111.md, parit K/parit-kj47b/. Muisti +1,5 %, varjoraja ok, piirtokutsut +16–19 %.
  Mittarivika: NÄKYVÄT kolmiot 0 (isVisible epätosi) → näkökartiotesti 872ad9249 / ennen a6927dd47. Champ-de-Mars katkesi puolivälissä → tee-puut-v3.py
  (Eiffel 466, yht. 1033), sävy 1.45 1.4 1.25 → 5f44f5325 (karttaseppa/ymparistot, 758/758, unity 0).
- KJ47c pyydetty JU:lta 20.3x (kopio PT, KK:lle tiedoksi): K/sk-mac-puut-kj47c.txt → lokit/ks-kj47c-puut-{ennen-a6927dd47,jalkeen-5f44f5325}.
  KUN TULEE: NÄKYVÄT kolmiot ennen → jälkeen yleisnäkymissä (raja ~+10 %), Champ-de-Mars 40 orton (orto/merkit-v3-eiffel.jpg) rinnalle, sävy 42/43
  (savy-kj47b.py-tapaan, nyt maalattu katupuusto kuvassa) → KK (kopio PT). Junaan VAIN KK:n sanalla.
- JONO: 1) KJ47c → KK. 2) Montmartre KJ43 (01.00 jälkeen). 3) Seine ja sillat -katsaus (+ Conciergerie).
- KK 20.06: piirtokutsut HYVÄKSYTTY, sävy 130 131 78 lähtökohdaksi. KJ47c:stä KK:lle: NÄKYVÄT kolmiot ennen|jälkeen, Champ-de-Mars peli|orto, viistoparit Eiffel (ym47c-01-eiffel-b)
  ja Invalidit (ym47c-07-invalidit-b; lisätty skriptiin 20.1x, 9 kuvaa, JU:lle kerrottu), 3D|maalattu läheltä (42/43). Kunnossa → erä 90b66a261 + puut junaan YHTENÄ (lukitun loppulistan kohta 1).
- JU 20.1x: KJ47c Mac-jonossa NS palkki-2, NUI yksi-etaisyys-1, NS katko-3, pala3-luettelo ja pala3-koekamera jälkeen; JU ilmoittaa KS + PT.
- PT 20.5x (KK, omistaja 19.16 "Työkalut ensin"): KS:lle työkalu 1 (yhteinen tee-palat + `uusi-kaupunki`) ja työkalu 2 (tyypitys; ENSIN luonnoskuvat KK:lle).
  Tehtävänanto /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kolme-tyokalua-tehtavananto.md. Pariisin loppulista EDELLÄ.
- KS 20.40 → KK + PT: "mahdoton/kalliimpi" lähetetty (ei mahdotonta). Ehdotukset: (1) Pariisin vanhat maskit jäävät syötteeksi ja näyttö (b) on tavulleen sama;
  (2) Euroopan rakennusote kerran planeetasta (T7 /Volumes/T7 4TB/Matkakirja-karttaseppa/valitaso-osm/planet.osm.pbf 95,6 Gt; ei siirtoa ennen otetta);
  (3) Wien: Overture tuskin auttaa (Pariisi 98,7 % OSM; duckdb-venv _tyo/karttaseppa/overture/venv) → "korkeusaineisto heikko"; (4) tyyppitalo ≤ ~1 500 kolmiota,
  ikonien verkot tavulleen samat; (5) luonnokset: osakirjasto Unityn dotnet+Roslyn (Kartta-testit/kaanna.sh) → OBJ → Blender 5.2.
  Skriptit: Pariisi _tyo/natiiviseppa/pariisi-talot/tee-palat.py (554 r.), Lontoo _tyo/pelikoodari/lontoo/a/tee-palat-lontoo.py (471 r.), planeettalukija hae-planeetasta.mjs.
  ODOTTAA KK:n vastausta ennen aloitusta.

## LISÄYS 17 (20.42): NOLLAUS. Loppulista JU:lla, työkalut 1–2 (+ vakiokuvat) seuraajalle
- KK:n päätökset työkaluihin: tehtävänanto (polku LISÄYS 16) kohdat "TARKENNUKSET 21.1x" ja "21.2x", LUE NE ENSIN. Lyhyesti: yhteinen tee-palat,
  jossa Pariisin maskit, korvaus- ja siisti-tiedostot ovat Pariisin rivin vanha syöte (yleinen syöte, ei "jos pariisi" -haaraa). NÄYTTÖ: Pariisin ja Lontoon paketti
  tavulleen sama kuin nykyinen, erot lueteltuna. OSM: YKSI planeetan läpikäynti → ote jokaisesta Euroopan pelikaupungista (16 × 16 km; talot, puut, uskonnolliset,
  asemat, palatsit, vesi; kaupunkilista pelin luettelosta), otteet sisäiselle levylle, koko arvioidaan ensin kolmesta kaupungista; planeetta pysyy T7:llä.
  Wien kuiva-ajo ilman maan omaa aineistoa + selvitys EUBUCCOn (tms.) kattavuudesta ja lisenssistä (muu kuin CC0/CC BY/PD → KK). Tyyppitalot ≤ 400/900/1 500
  kolmiota. Luonnokset: kirjasto komentorivillä → OBJ → Blender, tasavärit, neutraali valo, 45° + edestä, tavallinen talo mittakaavaksi.
- UUSI (PT 21.1x): `vakiokuvat-<kaupunki>.json` työkalun 1 yhteydessä: 3 tavallista katua nyt, 6 tyypitettyä merkkirakennusta työkalun 2 jälkeen;
  paikka, suunta ja etäisyys; kiinteä siemen kaupungin tunnisteesta. NUI tekee komennon "vakiokuva <i>".
- LOPPULISTA (edellä): KJ47c JU:n jonossa (LISÄYS 16). KJ48 Seine-katsaus pyydetty JU:lta 20.41: K/sk-mac-seine-kj48.txt (tee-seine-kj48.py, 23 kuvaa)
  → lokit/ks-kj48-seine-<sha>. KUN TULEE: arkki (ymparistot-kj47b/arkki.py), puutelista: vesi, rannat, sillat, Iénan ja Austerlitzin tila, Conciergerie joelta
  → KK (kopio PT). Montmartre KJ43 maaston 01.00-viennin jälkeen (JU:n aamurivi).
- SEURAAJAN JONO: 1) KJ47c → KK (näkyvät kolmiot ennen|jälkeen, Champ-de-Mars peli|orto (rinnakkain.py + orto/merkit-v3-eiffel.jpg), viistoparit Eiffel + Invalidit,
  3D|maalattu läheltä; kunnossa → KK: erä 90b66a261 + puut junaan yhtenä). 2) KJ48 → KK. 3) Montmartre KJ43. 4) Väleissä työkalu 1: yhteinen tee-palat
  (ensin diff Pariisi ↔ Lontoo-skripti, tavulleen sama -testi molempien nykyisillä syötteillä) + planeettaote (hae-planeetasta.mjs pohjaksi) + vakiokuvat-json;
  työkalu 2: luonnoskuvat KK:lle ensin.
- JU 20.4x: KJ48 jonossa KJ47c:n perään, sha 53171fed0 (juna 224.82) → lokit/ks-kj48-seine-53171fed0; JU ilmoittaa KS + PT.

## LISÄYS 18 (21.0x): työkalu 1 osat 1–3 tehty, NOLLAUS (konteksti 25 %)
- Raportti docs/raportit/karttaseppa-tyokalu1-tila-20261111.md (LUE ENSIN). Haara natiivi-backup karttaseppa/tyokalu-1 (f32f976a6, 203231d1c; worktree
  /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna on NYT tässä haarassa, ymparistot-haara pushattu ennallaan). Työkansio /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tyokalu-1.
- tee_palat.py (yhteinen) tavulleen sama: Lontoo 242/242, Pariisin v41-ketju 219/219; pelin palat-v41-pp:stä eroaa vain 15_16594_11273 (vanha ulos-in2-kopio paketissa).
- planeettaote.mjs: 3 kaupunkia 242 s, 163–271 Mt/kaupunki JSONina; 181 kaupunkia ~15–20 Gt (gzip ~3 Gt), sisäisellä 39 Gt vapaana → KK:lle: gzip + kaupunkilista.
- vakiokuvat.py + vakiokuvat-{pariisi,lontoo}.json (3 katua, merkit tyhjä) → NUI:n "vakiokuva <i>".
- NS 21.3x: PiirtoTilasto yhteiseksi (NS 67860bf8a, natiiviseppa/tyokalu3-rivit; c1841699a NakyvatKolmiot public). KUN ymparistot-haara viedään junaan: ota c1841699a mukaan.
- SEURAAJAN JONO: 1) KJ47c → KK (LISÄYS 17), 2) KJ48 → KK, 3) Montmartre KJ43 (01.00 jälkeen), 4) väleissä työkalu 1: korkeuden varatiet (lähde osm) tee_palat.py:hyn,
  Wienin kuiva-ajo T/otteet-3/wien:llä, EUBUCCO-selvitys, uusi-kaupunki-ketju; työkalu 2: luonnoskuvat KK:lle ensin.
- KK 21.05 PÄÄTÖS (vastaus otteisiin, PT kopiona): 1) otteet gzipattuina (osm, muut, puut, pisteet .json.gz); ote.json pakkaamatta; ketjun työkalut (tee_palat.py,
  vakiokuvat.py, uusi-kaupunki) lukevat .json.gz:n suoraan, ei purkua levylle. 2) KAUPUNKILISTA = pelin oma kaupunkiluettelo, Euroopan saapumispaikat (61, jotka peli laskee
  etsittäviksi; mm. Granada, Sevilla, Luxemburg, Košice, Valletta, Dubrovnik, Rovaniemi, Tromssa), EI Suurkaupungit.json. Etsi luettelo pelikoodista (saapumispaikat / etsittävät).
  3) Aluerivit (Alpit, Sisilia, Kreeta, Islanti…) samalla säännöllä 16 × 16 km pelin pisteen ympäriltä; tyhjät hoitaa uusi-kaupunki-komennon pysäyttävä tarkistus.
  4) Lisäkaupunki myöhemmin = uusi läpikäynti, ei varastoa. Planeetta pysyy T7:llä toistaiseksi. KUN OTTEET TEHTY: YKSI RIVI KK:lle (koko + kaupunkimäärä).
  → SEURAAJAN JONON KOHTA 4 ALKAA TÄSTÄ: gzip-kirjoitus planeettaote.mjs:ään (zlib, puskuroitu), .gz-luku tee_palat.py:hyn ja vakiokuvat.py:hyn, ajo 61 kaupungille.

## LISÄYS 19 (21.4x): otteet 63, osm/GHSL-korkeus, KJ47c → KK, NOLLAUS (konteksti 25 %)
- TYÖKALU 1 (natiivi-backup karttaseppa/tyokalu-1, 196db31d4 → 960d485f0 → 09693116f; työpuu /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna):
  otteet gzipattuina 63 pelikaupungille (pelikaupungit.py: eurooppa.json 60 + kokeilu.json Ateena/Pariisi/Tukholma), 891 Mt.
  HUOM: T = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tyokalu-1 on LINKKI T7:lle; sisäinen kopio /Users/Shared/Claude/proto-3d/_tyo/karttaseppa-otteet/otteet-63
  (KK:lle korjattu). uusi_kaupunki.py:n GHSL_TIILET ja ajot osoittavat vielä T:hen → vaihda sisäiseen, kun ketju vakiintuu (GHSL-tiilet 1,2 Gt T/ghsl/lataus).
  Raportti docs/raportit/karttaseppa-tyokalu1-tila-20261111.md (LISÄYS 21.3x). Lontoo yhä 242/242 tavulleen sama (960d485f0:n jälkeen; 09693116f:n jälkeen aja T/aja-lontoo-2.zsh uudelleen ennen kuin väität samaksi).
- KK 21.28 KORKEUSPÄÄTÖS: EUBUCCO EI (ODbL + kattavuus). GHSL GHS-BUILT-H ANBH (CC BY 4.0, lähteen copyright.txt tarkistettu), varatie OSM height → levels → GHSL-ruutu (± 15 % hajonta osm-tunnuksen tiivisteestä) → oletus.
  MITTAUS (T/mittaus, viite-* = IGN/lidar, koe-* = otteet-63 ilman omaa aineistoa, mittaa_korkeudet.py, keskusta < 3 km):
  kerroin 1,0: Lontoo kaikki mediaani 2,44 / p90 7,3 (GHSL-talot 3,3, harha +2,1); Pariisi 3,5 / 11,4 (keskusta 3,0, reuna 3,8; GHSL-talot 5,8, harha +4,6 ≈ vakio 15 m).
  Ilman GHSL:ää (oletus 15 m): Lontoo 4,08, Pariisi 3,6. Kerroin 0,8 (räystäs vs keskikorkeus) jälkilaskettuna: Lontoo 2,1 / 6,5, Pariisi 3,3 / 9,9 → oletukseksi ghsl_kerroin 0,8 (09693116f).
  KÄYNNISSÄ 21.4x: T/aja-ghsl-2.zsh (koe kertoimella 0,8 → T/mittaus/tulos-{pariisi,lontoo}.json + Wien uusi_kaupunki.py:llä → T/uudet/wien/yhteenveto.json).
  SEURAAVAKSI: luvut (kaikki/keskusta/reuna, mediaani + p90) + Wienin heikko-osuus KK:lle; Wienin VAKIOKUVA-ARKKI KK:lle: Blender 5.2
  `/Applications/Blender.app/Contents/MacOS/Blender --background --python tyokalut/kaupunki/vakiokuva_render.py -- T/uudet/wien/palat T/uudet/wien/vakiokuvat-wien.json T/uudet/wien/kuvat`
  (EI VIELÄ AJETTU: tarkista akselit ensimmäisestä kuvasta: pala x itä, y ylös, z pohjoinen → Blender (x, z, y)); arkki 3 kuvaa + nimet → KK (kertoen: luonnosrenderöinti paloista, ei pelikuva).
  Jos Pariisin mediaani jää selvästi > 3 m → KK:lle luvut + yksi vertailukuva (KK 21.28 kohta 5).
- uusi_kaupunki.py-koe: Alpit pysähtyi (tyhjä 1 463 < 2 000), Dubrovnik 99 % ja Luxemburg 92 % heikko (ennen GHSL:ää) → aja uudelleen GHSL:n kanssa.
- KJ47c KATSOTTU → KK 21.4x (kopio PT): parit _tyo/karttaseppa/koodijuna/parit-kj47c/; näkyvät kolmiot yleis +7,3–7,9 %, keski +11,8 %, Champ +13–17 %; sävy 3D ~130 131 79.
  ODOTTAA KK:n sanaa → erä 90b66a261 + puut (karttaseppa/ymparistot 5f44f5325 + NS c1841699a) junaan yhtenä (JU, PT:n pt-ok).
- NS 21.2x: kaupunkitaulu Assets/Matkakirja/Kartta/Resources/kaupungit.json (natiiviseppa/kaupunkitaulu), rivin "generaattori" = kaupungit-talot.json-rivi, "talot" = raja;
  NS kertoo SHA:n → lisää tee_palat.py:hyn luku (KAUPUNKITAULU=tämä, kaupungit[id].generaattori). Määrittely _tyo/natiiviseppa/tyokalut/t1-kaupunkitaulu-maarittely.md.
- JU 21.34: KJ48 Seine alkaa KJ47c:n jälkeen → lokit/ks-kj48-seine-53171fed0 → arkki + puutelista KK:lle (LISÄYS 17).
- SEURAAJAN JONO: 1) KJ48 kun tulee. 2) GHSL-luvut + Wienin vakiokuva-arkki KK:lle. 3) KK:n sana KJ47c:stä → junaehdokas. 4) Montmartre KJ43 maaston 01.00-viennin jälkeen.
  5) työkalu 1: kaupunkitaulun luku (NS:n SHA), otepolut sisäiseen; työkalu 2 luonnokset KK:lle.

## LISÄYS 20 (21.5x): KJ47c junaehdokas, GHSL-luvut + Wien KK:lle, NOLLAUS
- KK 21.38 HYVÄKSYI KJ47c:n junaan yhtenä eränä. JUNAEHDOKAS 707331562 (natiivi-backup karttaseppa/ymparistot-juna = juna-224 a63615592 + 5f44f5325 + NS c1841699a;
  PiirtoTilasto-ristiriita = vain `public`, NS:n versio). 766/766, unity 0. PT:ltä pyydetty pt-ok, JU:lle ilmoitettu. ODOTA LINKKI-riviä; lukitun loppulistan kohta 1 valmis, kun linkissä.
  KK toiselle kierrokselle (ei tähän erään): 3D-puun valoisa puoli vaaleampi/keltaisempi kuin maalattu puusto → valon ja varjon eroa pienemmäksi, ei keskisävyä.
- Työpuu /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna on NYT haarassa karttaseppa/ymparistot-juna (puhdas). Työkalu 1 jatkuu haarasta karttaseppa/tyokalu-1 (09693116f).
- GHSL-mittaus kertoimella 0,8 VAHVISTETTU ajolla (T/mittaus/tulos-*.json): Lontoo 2,1 / p90 6,5 (keskusta 2,7 / 9,3, reuna 2,0 / 5,7); Pariisi 3,3 / 9,9 (keskusta 3,1 / 8,7, reuna 3,4 / 10,2).
  Wien uusi_kaupunki.py:llä VALMIS (T/uudet/wien/yhteenveto.json, heikko 0,15, 428 palaa). Vakiokuva-arkki T/uudet/wien/kuvat/wien-vakiokuva-arkki.jpg (vakiokuva_render.py toimii;
  kuvassa 0 Schneiderhangassen toinen puoli tyhjä → TARKISTA otteesta/ortosta, onko aukea vai puuttuvia taloja). Luvut + arkki lähetetty KK:lle 21.4x; ODOTTAA KK:n vastausta (KK 21.28 kohta 5).
- NS 21.4x: kaupunkitaulu cfe3324a3 (natiivi-backup natiiviseppa/kaupunkitaulu), Assets/Matkakirja/Kartta/Resources/kaupungit.json { "kaupungit": [ {id, talot (= raja), generaattori (= kaupungit-talot.json-rivi), …} ] },
  37 kaupunkia. TEHTÄVÄ: tee_palat.py + uusi_kaupunki.py lukemaan tätä (rivi id:llä, generaattori + talot); osm/GHSL-korkeuslähde generaattori-kenttään omassa haarassa.
- SEURAAJAN JONO: 1) LINKKI-rivi 707331562:lle (JU) → kohta 1 valmis. 2) KJ48 Seine (JU ajaa KJ47c:n jälkeen) → arkki + puutelista KK:lle. 3) KK:n vastaus GHSL:stä/Wienistä.
  4) Kaupunkitaulun luku (NS cfe3324a3), otepolut sisäiseen (_tyo/karttaseppa-otteet), Lontoon tavulleen-sama-tarkistus 09693116f:n jälkeen (T/aja-lontoo-2.zsh). 5) Montmartre KJ43 maaston 01.00-viennin jälkeen.
  6) Työkalu 2: luonnoskuvat KK:lle ensin.

## LISÄYS 21 (21.4x): KK 21.39 GHSL HYVÄKSYTTY (ehdot seuraajalle)
- GHSL-ketju = työkalun 1 yleinen korkeuden varatie; EUBUCCO ei tarvita. EHDOT ennen kuin yksikään GHSL-pala menee peliin:
  1) LAHTEET.md: GHSL GHS-BUILT-H R2023A ANBH, Euroopan komissio JRC (Pesaresi & Politis 2023, doi:10.2905/85005901-3A49-48DD-9D19-6261354F56FE), CC BY 4.0, linkki
     https://human-settlement.emergency.copernicus.eu/ (tarkista LAHTEET.md:n sijainti ja muoto ennen lisäystä).
  2) ghsl_kerroin 0,8 ja ghsl_hajonta 0,15 YHDESSÄ PAIKASSA oletuksina (nyt tee_palat.py:n osm-haarassa KL.get-oletuksina → siirrä nimetyiksi vakioiksi yhteen kohtaan); poikkeus vain kaupunkitaulun generaattori-kentän kautta.
  3) uusi_kaupunki.py tulostaa korkeuden lähdejakauman (height / kerrokset / GHSL / oletus, pieni-* omana tai yhdistettynä selkeästi) ja pysähtyy, jos OLETUS > 40 % (nyt heikko-osuus laskee kaiken ilman tietoa → tarkista, että ehto = oletus-osuus).
  4) Pariisi ja Lontoo pysyvät omalla mitatulla aineistollaan (ign / ea-lidar); lukittuihin taloihin ei kosketa.
- ENSIN (KK): Wienin vakiokuva 0 (Schneiderhangasse 48.167581 16.323504, suunta vakiokuvat-wien.json) tyhjä kadunpuoli → varmista ortokuvasta tai otteen rajasta:
  aukea / otteen raja / puuttuvat talot → YKSI RIVI KK:lle ennen kuin ketjua käytetään edelleen.
- JU 21.4x: puistopuut KJ47c (5f44f5325 sis. 90b66a261 + dedc50853) junassa 224.85 (MR80, PT pt-ok), 224.84:n (NS työkalu 3) jälkeen; PiirtoTilasto NS:n versio. Odota LINKKI 224.85.
- JU 21.4x: KK vahvisti 21.40 → MR80 = 224.85 = 707331562 (erä 1/2 dedc50853 mukana, se on esi-isä) jonossa MR79:n perään. Odota LINKKI 224.85.

## LISÄYS 22 (22.0x, uusi sessio 21.43): Wien vk0, KJ48 suljettu, GHSL-ehdot 1–4, kaupunkitaulun luku
- WIEN VAKIOKUVA 0: aukea (jalkapallokenttä + radan leikkaus; IGN-tyyppinen ortho Wienin basemap mapsneu.wien.gv.at, ei robots.txt:tä) → KK:lle rivi 21.4x.
  Vika oli luonnospiirrossa: palan y on korkeuskoodi, talot leijuivat. Korjaus 6928b5969 (vakiokuva_render.py: kärki y − normaalin w = talo omalla pohjallaan).
  Uudet kuvat + ortho T/uudet/wien/kuvat-2/; ortho-skripti T/orto-wien.py.
- KJ48 SEINE: raportti docs/raportit/karttaseppa-kj48-seine-20261111.md (efabd62ad), arkit _tyo/karttaseppa/koodijuna/parit-kj48/. KK 21.54: LOPPULISTAN KOHTA 3 SULJETTU
  (parvis-haamut tarkistetaan 224.85:n kuvista). TOISELLE KIERROKSELLE: (1) ulkosillat = TYÖKALUN 1 ASKEL: silta OSM:n bridge-viivasta veden yli yksinkertaisena
  kaarisilta-koodimallina (kansi + kaaret + pilarit, leveys ja jänneväli aineistosta), sama sääntö kaikille kaupungeille; käsin tehdyt (KaupunkiSilta-taulu) voittavat;
  näyttö Pariisin ulkosillat + Lontoo samalla ajolla, raja Alma ↔ Alexandre III vierekkäin. (2) Bir-Hakeim + Conciergerien tornit → työkalun 2 osakirjasto.
- GHSL-EHDOT (KK 21.39) haarassa karttaseppa/tyokalu-1 (työpuu): 1) tyokalut/kaupunki/LAHTEET.md (GHSL R2023A ANBH E2018, 3″, CC BY 4.0, doi; huom: pelin opas-luettelossa
  ui.opas.lahde.* ei GHSL-riviä → lisättävä ennen ensimmäistä GHSL-kaupunkia pelissä). 2) GHSL_KERROIN/GHSL_HAJONTA/OLETUS_KORKEUS_M/OLETUS_OSUUS_MAX tee_palat.py:n alussa.
  3) lähdejakauma "KORKEUDEN LÄHTEET" (perus = ennen pienen talon sääntöä) + korkeus_oletus_osuus; uusi_kaupunki pysähtyy oletus-osuudella > 0,4 (ei enää heikko-osuudella,
  jossa pieni-oletus oli mukana). Wien: height 1,5 %, kerrokset 29,7 %, GHSL 68,7 %, oletus 0,05 %; palat 428/428 samat. 4) Lontoo 242/242 ja Pariisi 32/32 tavulleen samat (aja-sama-3.zsh).
- KAUPUNKITAULU: tyokalut/kaupunki/kaupunkitaulu.py lukee pelin taulun (Resources/kaupungit.json: generaattori + talot → raja) tai vanhan muodon; oletus pelin taulu,
  jos olemassa, muuten kaupungit-talot.json. NS cfe3324a3:n generaattori-kentät = kaupungit-talot.json (Pariisi, Lontoo) täsmälleen. Tarkistus T/aja-taulu-4.zsh.
- JONO (KK 21.54): 1) GHSL-ehdot valmiiksi + KK:lle rivi. 2) uusi-kaupunki-ketju valmiiksi (otepolut sisäiseen; GHSL-tiilet T7:llä, sisäisellä levyllä vain 17 Gt vapaana).
  3) silta-askel (työkalu 1). 4) Lontoo mittauksena. Montmartren parit, kun yövienti tehty (JU:n aamurivi). LINKKI 224.85 odottaa yhä.

## LISÄYS 23 (21.59): ketju kaikille käynnissä, silta-askel luonnos, NOLLAUS (konteksti 27 %)
- KK:lle 21.5x lähetetty: GHSL-ehdot 1–4 tehty (1794edafd). ODOTTAA: KK:n kuittaus; GHSL-rivi pelin opas-luetteloon (ui.opas.lahde.*) KK:n tekstillä ennen ensimmäistä GHSL-kaupunkia.
- UUSI-KAUPUNKI-KETJU (e3ebd2804, karttaseppa/tyokalu-1): aja_kaikki.py (kaikki otekansion kaupungit → <ulos>/kaikki.json + kaikki.md), uusi_kaupunki.py --kuvat
  (Blender-luonnokset <ulos>/<id>/kuvat), GHSL_TIILET/BLENDER ympäristöstä, vakiokuvat.py: väli puolittuu 1000 → 500 → 250 m, jos 3 katua ei löydy (Dubrovnik; Pariisi/Lontoo/Wien ennallaan).
  KÄYNNISSÄ 21.56 (taustalla, voi katketa nollauksessa): T/uudet-kaikki (T = _tyo/karttaseppa/tyokalu-1, T7), loki T/uudet-kaikki.log. JATKA SAMALLA KOMENNOLLA (valmiit ohitetaan):
  cd työpuu/tyokalut/kaupunki; nice -n 15 /opt/homebrew/opt/python@3.14/bin/python3 aja_kaikki.py --otteet /Users/Shared/Claude/proto-3d/_tyo/karttaseppa-otteet/otteet-63 --ulos T/uudet-kaikki --kuvat
  (~80–100 s/kaupunki). KUN VALMIS: T/uudet-kaikki/kaikki.md → KK yksi rivi (valmiit/pysähtyneet + syyt) + muutaman kaupungin vakiokuva-arkki (luonnos, ei pelikuva).
  Odotettu: alpit pysähtyy (tyhjä ote, sääntö), Dubrovnik nyt GHSL 98 % → läpi.
- SILTA-ASKEL (KK 21.54) LUONNOS 48031fe9e: tyokalut/kaupunki/sillat.py <id> <ote> <ulos.json> --unity-juuri <työpuu>: man_made=bridge-ääriviivat, jotka leikkaavat waterway river|canal,
  → KaupunkiSilta-kentät JSONina (profiili sillat-data.py:n tavalla, maa pinta.py:n tavalla, oletukset kansi 9/7,5 m, pilari 4/2,5, aukko 30 m → kaaria 1–7, lasku 3 × kansi; laji: rautatie Metalli,
  vain kevyt Jalka, muuten Kivi). Käsin tehdyt ohi sijainnista (OhjelmaKohdeSillat.cs KaupunkiSilta-rivit + TaloAlue.cs TeeSillat: Pont Neuf, Alexandre III). Pariisi: T/sillat/sillat-pariisi.json
  65 siltaa (Kivi 36, Metalli 14, Jalka 15), 20 käsin ohi, 8 relaatiota ei tueta.
  SEURAAVAKSI: (1) rajaa kaupungin talot-alueeseen (kaupunkitaulu.rivi(id)['raja']; nyt mukana Ivry/Charenton/Saint-Ouen); (2) järkevyysrajat → ohita + listaa (pituus > ~350 m, |MaaA − MaaB| > ~10 m:
  way/440498228/-232/-240/440552632 ovat 465–666 m:n ratasiltoja/viadukteja, Bir-Hakeim MaaB 47 → tarkista profiili ja Passyn rinne); (3) PELIN LATAAJA: Resources/sillat-<id>.json → KaupunkiSilta[]
  (C#: Matkakirja.Peli.MiniJson), lisää OhjelmaKohteet.cs:n KeskustanSillat-silmukan perään (Pariisi; Lontoo "lontoo"-listaan) ja TaloAlue.TeeSillat-listaan (maalatun sillan poisto palasta),
  käsin tehdyt voittavat myös C#:ssa (etäisyys). HUOM: NS:n T1 (natiiviseppa/kaupunkitaulu) muuttaa OhjelmaKohteet.cs:ää ja TaloAlue.cs:ää → kysy NS:ltä pohja ennen C#-muutosta.
  (4) testi Kartta-testeihin (generoidut sillat rakentuvat, ei NaN, kansi > pinta); (5) Lontoo samalla ajolla; NÄYTTÖ Mac-ajona: Pariisin ulkosillat + Lontoo, raja Alma ↔ Alexandre III vierekkäin → KK.
- JONO (KK 21.54): 1) ketju valmiiksi (yllä) → KK. 2) silta-askel (yllä). 3) Lontoo mittauksena. Montmartren parit, kun yövienti tehty (JU:n aamurivi). LINKKI 224.85 odottaa (parvis-haamut tarkistetaan sen kuvista).
- Levy: sisäinen 17 Gt vapaana (99 %) → isot ajot T7:lle (T on T7:llä).
- 22.0x: KK 21.59 HYVÄKSYI GHSL-oppaan rivin (teksti tyokalut/kaupunki/LAHTEET.md, ec8b02ba2) → ui.fi.json:iin "ui.opas.lahde.talokorkeus-ghsl" SAMASSA ERÄSSÄ kuin ensimmäinen GHSL-kaupunki.
  Lontoon EA-rivi puuttuu luettelosta: aineiston tiedot (LIDAR Composite 1 m DSM First Return + DTM 2022, OGL v3, "© Environment Agency copyright and/or database right 2022") lähetetty KK:lle → odota KK:n sanamuotoa.
  NS 22.0x vahvisti T1 = cfe3324a3; NS:lle kerrottu, että seuraaja kysyy pohjan ennen silta-lataajan C#-muutosta.
- NS 22.0x (SEURAAJALLE): silta-lataajan C#-POHJA = cfe3324a3 (natiivi-backup natiiviseppa/kaupunkitaulu), EI junan kärki. Se muuttaa OhjelmaKohteet.cs:ää (OmaKaupunki korvaa LontooKoe,
  Pariisin lista kameran alueelta) ja TaloAlue.cs:ää (rajat taulusta, SeuraaKameraa, PoistoTaulu nimiviitteellä). Ei vielä junassa (KK:n sana odottaa vakioajoa). Tee silta-haara sen päälle.

## LISÄYS 24 (22.14, uusi sessio 22.05): silta-askel pelissä, KJ49 JU:lla
- aja_kaikki oli pysähtynyt nollauksessa (6 valmiina) → jatkettu 22.06 samalla komennolla taustalla (loki T/uudet-kaikki.log). Pysähtyneet säännöllä: ateena ja barcelona "pala > 8,0 Mt" (8,3/8,2) → kerro KK:lle loppurivissä.
- SILTA-ASKEL kohdat 1–4 TEHTY: sillat.py (karttaseppa/tyokalu-1 af89b9741, f14499292, b0a113336): rajaus kaupunkitaulun talot-alueeseen, järkevyysrajat (pituus > 350 m, |MaaA − MaaB| > 10 m → ohi + lista),
  maanalaiset vedet (tunnel/covered) pois (Holborn Viaduct), Bir-Hakeim OSAKIRJASTO-listalla (työkalu 2), Lontoon koemallit (Tower Bridge, Westminster Bridge) käsin tehtyjen joukossa, --resurssi kirjoittaa pelin tiedoston.
  Pariisi 44 (Kivi 24, Metalli 8, Jalka 12; käsin ohi 20; Pont Rouelle 375 m ohi), Lontoo 88 (4 yli 350 m ohi). T/sillat/sillat-{pariisi,lontoo}.json (ohitetut listattuina).
- PELI: karttaseppa/sillat 08b8d3885 + 2eb8ff84a (natiivi-backup; työpuu /Users/Shared/Claude/wt/proto-karttaseppa-sillat), pohja NS cfe3324a3:
  Resources/sillat/<id>.json → GeneroidutSillat.cs (puhdas C#, MiniJson; käsin tehdyt voittavat: KeskustanSillat + OmatMallit + MuutMallit) + GeneroidutSillatLataus.cs (BeforeSceneLoad, pääsäie);
  OhjelmaKohteet.Lista(nimi, id) lisää kaupungin sillat (SiltaKohde), TaloAlue.SiltaPala/SiltaTiePois poistaa maalatun sillan myös niiden kohdalta (Pont Neufin/Alexandre III:n luvut nyt GeneroidutSillat.OmatMallit).
  Testi Kartta-testit/Testit/GeneroidutSillatTestit.cs (3 testiä). 774/774, unity 0.
- KJ49 pyydetty JU:lta 22.1x (kopio PT): _tyo/karttaseppa/koodijuna/sillat-kj49/sk-mac-sillat-kj49-{pariisi,lontoo}.txt (12 + 7 kuvaa, tee-sillat-kj49.py), ENNEN cfe3324a3 | JÄLKEEN 2eb8ff84a
  → lokit/ks-kj49-sillat-{pariisi,lontoo}-*. KUN TULEE: parit (K/pari.py) → KK (kopio PT): raja Alma ↔ Alexandre III (si49-01), Lontoo London Bridge ↔ Tower Bridge (si49-23); tarkista ettei maalattu silta näy kannen alta, kansi ei uppoa rinteeseen, kanavasillat järkevän kokoisia.
- JONO: 1) aja_kaikki valmis → KK yksi rivi (valmiit/pysähtyneet + syyt) + muutama vakiokuva-arkki. 2) KJ49 → KK. 3) Lontoo mittauksena. Montmartren parit yöviennin jälkeen. LINKKI 224.85 odottaa.

## LISÄYS 25 (22.2x): NOLLAUS (konteksti 25 %), työkalu 2 seuraavaksi
- aja_kaikki KÄYNNISSÄ taustalla (aloitettu 22.06; jatka katkettua samalla komennolla, LISÄYS 23). KJ49 JU:lla (LISÄYS 24). LINKKI 224.85 odottaa.
- "Lontoo mittauksena" (tehtävänanto kohta C) alkaa vasta, kun kolme työkalua toimivat → ei vielä.
- SEURAAJA: TYÖKALU 2 ENSIMMÄINEN ASKEL = luonnoskuvat KK:lle ENNEN generaattorikoodia (tehtävänanto suunnitelmat/20261111-kolme-tyokalua-tehtavananto.md r. 39–66 + TARKENNUKSET 21.2x;
  tyyliohje suunnitelmat/20261110-pariisin-nahtavyydet-tyyliohje.md: vaalea lämmin kivi, siniharmaat katot, yksi korostus, ikkunarytmi syvennyksinä).
  Arkki: kirkko 3 kokoluokassa (kappeli ≤ 400, kirkko ≤ 900, katedraali ≤ 1 500 kolmiota), asema, palatsi + tavallinen talo mittakaavaksi; tasavärit, neutraali valo, 45° + edestä.
  SELVITETTY TAPA: uusi tiedosto Kartta/OhjelmaKohdeTyyppitalot.cs (partial OhjelmaKohdeGeometria, puhdas C#) Rakentajan primitiiveillä paikallisessa kehyksessä (x = pitkä akseli,
  länsi = −x, y ylös): Laatikko/Seinat(q)/Kansi; Katto(x0,x1,z0,z1, renkaat (dx, dz, y)) = sisennetyt suorakaiderenkaat (harjakatto: [(0,0,H),(0,W/2,H+h)]; mansardi: välirengas;
  kaari: useita renkaita cos-profiililla); Pyora(cx,cz,(r,y)[],sivuja) apsis/kupoli; Piikki = huippu; Seina r.S(x0,z0,x1,z1).Rivi(u0,u1,n,y,w,h,Aukko.Kaari,kehys) ikkunat;
  KaariTayte = kello/ruusuikkuna. Värit OhjelmaKohdeGeometria.cs r. 117 (Kivi, KiviVaalea, Liuske, Sinkki, Lasi, Valkoinen). HUOM: Katto lisää Liuskerivit → laske kolmiot.
  Osat (NdTorni r.180, NdFleche r.246, NdLentotuki r.124, NdLansiJulkisivu r.201 OhjelmaKohdePariisiNotreDame.cs; SpTorni OhjelmaKohdeLontoo.cs r.355) ovat ND-koordinaateissa:
  irrotus yhteisiksi osiksi on vaihe 4, luonnokseen yksinkertaiset muodot riittävät (kerro KK:lle).
  OBJ: Kartta-testeihin testi, joka kutsuu Tarkista(v, nimi) → Vie() kirjoittaa OBJ:n (kärkiväri v-rivillä), ajo OHJELMAKOHTEET_VIENTI=<kansio> sh Kartta-testit/kaanna.sh <testin nimi>.
  Blender: tee render-skripti vakiokuva_render.py:n mallilla (EEVEE, aurinko 50°/35°, taivas, väri kärkiattribuutista; OBJ-tuonti bpy.ops.wm.obj_import, Unity (x,y,z) → Blender (x, z, y)).
  Pohjaksi haara karttaseppa/sillat (työpuu /Users/Shared/Claude/wt/proto-karttaseppa-sillat) tai uusi haara juna-224:n kärjestä; ei koske ikonien verkkoihin.

## LISÄYS 26 (22.2x): 224.85 linkissä, parvis-haamut → KK:n linja
- JU: 224.85 = 4df73d409 (puistopuut KJ47c 707331562 + erä 1/2) linkissä, testit läpi → lukitun loppulistan kohta 1 VALMIS. Työlistan ympäristöt-rivi: tilanne päivitetty (auki parvis + SC).
- PARVIS: KJ46 ym46-03-a ennen|jälkeen (dedc50853 mukana) → iso vihreä laikku poistui, pystypalkki ja kaksi π-muotoa jäivät haaleina (K/parit-kj47c/parvis-ennen-jalkeen-dedc50853.jpg).
  KK 22.24 LINJA (ympäristöerän 2/2 osaksi): SELVITÄ LÄHDE ENSIN. Jos pieniä istutus-/pensasaitamonikulmioita → YLEINEN SÄÄNTÖ työkaluun 1 (kivetyllä aukiolla alle sovitun
  pinta-alan kasvillisuuslaikkuja ei piirretä; raja luvuista, kaikille kaupungeille), EI käsipoistoa. Jos lähde on piirroskartan valmis kuva → lähde + vaihtoehdot KK:lle ennen korjausta.
  NÄYTTÖ: sama pari samasta kulmasta (KJ46 ym46-03-a) + yksi kuva pelin kamerasta Notre-Damen esittelyn lopusta. KK:lle ei vastausta tähän linjaan.

## LISÄYS 27 (22.4x): KJ49 katsottu → KK, NOLLAUS (konteksti 30 %)
- KJ49 raportti docs/raportit/karttaseppa-kj49-sillat-20261111.md (59005b60e), arkit _tyo/karttaseppa/koodijuna/parit-kj49/. KK:lle + PT 22.4x: sillat toimivat (Mirabeau läheltä hyvä),
  VIKA Pont de l'Alma läheltä (massiivinen laatta, tummat vyöt kannessa), raja-kuva Alma ↔ Alexandre III ja Lontoon lähikuvat epäonnistuivat → KJ49b. EI junaan ennen KK:n sanaa.
- KK 22.05: Lontoon EA-opasrivi hyväksytty, kirjattu LAHTEET.md:hen 0722db542 (karttaseppa/tyokalu-1); PT lisää peliin.
- aja_kaikki: lokissa 50 kaupunkia käsitelty klo 22.4x; taustaprosessi voi katketa nollauksessa → JATKA SAMALLA KOMENNOLLA (LISÄYS 23), valmiit ohitetaan.
- SEURAAJAN JONO: 1) aja_kaikki loppuun → KK yksi rivi (valmiit/pysähtyneet + syyt; ateena, barcelona pala > 8 Mt) + muutama vakiokuva-arkki. 2) Alman kansivika (raportin kohta 1)
  + KJ49b (kohta 2) → KK. 3) Parvis-haamut KK:n linjalla (LISÄYS 26). 4) Työkalu 2 luonnokset (LISÄYS 25). Montmartren parit yöviennin jälkeen (JU:n aamurivi).

## LISÄYS 28 (22.59, uusi sessio 22.48): Alman kansivika korjattu, KJ49b JU:lla
- aja_kaikki oli pysähtynyt (sevilla viimeisenä) → jatkettu 22.5x samalla komennolla taustalla (loki T/uudet-kaikki.log). Kun valmis: T/uudet-kaikki/kaikki.md → KK yksi rivi + muutama vakiokuva-arkki.
- ALMA: syy = OhjelmaKohde.shader SyvyysVeto on lähellä kameraa epälineaarinen ja lasketaan vain kärjissä; 109 m:n kansi yhtenä nelikulmiona interpoloitui ~15 m liian kauas,
  2 m:n paloista tehdyt holvien laet voittivat lakien kohdalla (= tummat vyöt). KORJAUS 4d18cf390 (karttaseppa/sillat, natiivi-backup; työpuu /Users/Shared/Claude/wt/proto-karttaseppa-sillat):
  Rakentaja.Pilkko (oletus 0) → Silta() pilkkoo yli 8 m:n nelikulmiot x-suunnassa (SiltaPilkko 8). Koskee myös käsin tehtyjä keskustan siltoja (vain tessellointi).
  Sillat 150 kpl (Pariisi+Lontoo+keskusta): 120 916 → 160 206 kolmiota (+32 %; 4 m:n ruudukolla olisi 355k). Testi PitkatPinnatPaloiksi; 775/775, unity 0.
- KJ49b pyydetty JU:lta 22.5x (kopio PT): _tyo/karttaseppa/koodijuna/sillat-kj49b/sk-mac-sillat-kj49b-{pariisi,lontoo}.txt (7 + 5), ENNEN 2eb8ff84a | JÄLKEEN 4d18cf390
  → lokit/ks-kj49b-sillat-*. KUN TULEE: parit (K/pari.py) → KK (kopio PT): Alma 31/33 vyöt poissa?, Concorde 34 ennallaan, raja 01b–01d, Lontoo 35–37 lähikuvat; kerro kolmioluku KK:lle.
- SEURAAJAN JONO: 1) aja_kaikki → KK. 2) KJ49b → KK. 3) Parvis-haamut KK:n linjalla (LISÄYS 26). 4) Työkalu 2 luonnokset (LISÄYS 25). Montmartren parit yöviennin jälkeen.

## LISÄYS 29 (23.0x): PARVIS-HAAMUJEN LÄHDE selvitetty (KK 22.24 -linja)
- nd-koodi-puisto.png on 224.85:ssä puhdas (dedc50853 poisti blobin, palkin ja π:t, ero x 3–83 y 135–229). Jäljelle jääneet haaleat muodot piirtää ELÄVÄ KARTTA
  (Assets/Matkakirja/Kartta/ElavaTyyli.cs r. ~457–477: landcover class grass, subclass garden → Puisto() → alfa 245) OSM:n pienistä alueista:
  π-muodot = leisure=garden way/30836227 ja way/30836228 (107 ja 106 m², 20 × 16 m), pystypalkki = leisure=garden way/135617970 (82 m², 14 × 25 m). Ei valmis kuva → KK:n linjan YLEINEN SÄÄNTÖ.
- LUVUT (Pariisin ote, suljetut monikulmiot): leisure=garden n 3338, mediaani 163 m², < 100 m²: 1331, < 150: 1598, < 200: 1840; landuse=grass n 11102, < 100: 4106, < 150: 5244;
  natural=scrub n 2649, < 100: 1467. → Pelkkä alaraja veisi ~40 % puutarhoista (sisäpihat, katuistutukset) → sääntöön ehto "kivetyllä aukiolla"
  (keskipiste OMT:n transportation-tason pedestrian-alueen / OSM highway=pedestrian area=yes / place=square sisällä) + alaraja ~150 m². Seuraavaksi: laske montako < 150 m²
  -laikkua osuu pedestrian-alueille Pariisissa ja Lontoossa, ehdota KK:lle raja + paikka (sääntö ElavaTyyli.cs:n landcover-silmukkaan kaikille kaupungeille; "työkalu 1" = tämä yleinen sääntö), sitten toteutus + pari KJ46 ym46-03-a + ND-esittelyn lopun kuva.
- AUKIOEHTO MITATTU (skripti /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/parvis-saanto/aukiot.py, sama ote): OSM-aukioalueita (highway=pedestrian area=yes / place=square / area:highway)
  Pariisi 2777, Lontoo 1475; niiden sisällä < 150 m² garden/grass/scrub-laikkuja Pariisi 195 (mm. Promenade Plantée), Lontoo 60. MUTTA parvis (Place Jean-Paul II) on OSM:ssä vain
  viivoina (highway=pedestrian ilman area=yes, way/20444384, 592230707, 627267006–8), joten aukioehto EI osu parvis'n π:hin. → KK:lle vaihtoehdot ennen toteutusta:
  (a) alaraja ~120 m² vain leisure=garden-laikuille, jotka eivät ole suuremman puiston/nurmen sisällä eivätkä sisäpihalla (talon ympäröimä) — mittaa ensin määrä;
  (b) aukioehto + lähin pedestrian-viiva ≤ ~15 m; (c) aukioehto + parvis'lle nimetty poikkeus (KK kielsi käsipoiston → ei suositella). Suositus (a) tai (b) luvuilla.
- SEURAAJAN JONO (23.0x): 1) aja_kaikki (jos katkesi: sama komento, LISÄYS 23) → T/uudet-kaikki/kaikki.md → KK yksi rivi (valmiit/pysähtyneet + syyt; pysähtyneitä mm. alpit tyhjä ote,
  ateena/barcelona pala > 8 Mt, sanmarino/venetsia/dubrovnik vakiokuvat < 3 katua) + muutama vakiokuva-arkki. 2) KJ49b → KK (LISÄYS 28). 3) Parvis: vaihtoehdot (a)/(b) luvuilla KK:lle (yllä).
  4) Työkalu 2 luonnokset (LISÄYS 25). Montmartren parit yöviennin jälkeen (JU:n aamurivi).

## LISÄYS 30 (23.0x): KK 22.51 SILTALINJA (KJ49b → KJ49c), JU ajaa KJ49b
- JU: KJ49b jonossa (pid 87003), 4 ajoa → lokit/ks-kj49b-sillat-{pariisi,lontoo}-<sha>; valmisrivi KS + PT. Skriptiä EI muutettu ajon jälkeen.
- KK 22.51 (kirjoitettu ennen korjausta): 1) Alman syy verkosta → VASTATTU KK:lle 23.0x (kannen kärjet samassa tasossa, syy syvyysveto kärjissä, korjaus 4d18cf390 yleiseen rakentajaan).
  2) SILLAN TYYPPI TODELLISUUDESTA: tarkista lähteestä (Structurae/Wikipedia) KK:n muistitieto: Mirabeau = 3 kaaren terässilta 1896, Alma = 1 välituen teräspalkkisilta 1974.
     Nyt tyyppi ja kaaret tulevat sillat.py:stä (laji: rautatie → Metalli, vain kevyt → Jalka, muuten Kivi; kaaret = pituus / aukko 30 m, 1–7). TAVOITE: tyyppi (kivikaari / metallikaari / PALKKI = uusi laji
     rakentajaan) ja aukkojen määrä ensin OSM-tageista (bridge:structure, material, tuet = man_made=bridge-alueen sisäiset pier-/tuki-kohteet), sitten kaupungin pieni korjaustaulu
     (nimi → tyyppi, aukot, lähde rivillä; Pariisin generoidut Seinen sillat taulu TÄYTEEN nyt), viimeisenä oletus pituudesta. Uusi kaupunki toimii ilman taulua. Kerro KK:lle, mistä tyyppi nyt tulee.
  3) SÄVY: generoitu silta = katu veden yli → kansi kartan kadun sävyyn (KatuKartta-tyyppisesti, sama kuin korvattu tie), kyljet + kaide astetta tummemmat kivi-/metallisävyllä,
     kaarien alus tumma kuten nyt. Mirabeaun oikean pään vaalea kiilaläikkä pois (pää liittyy rantakatuun samassa tasossa ja sävyssä; katso SillanLasku/LaskuB). Käsin tehdyt ennallaan.
  4) KUVAT (KJ49c kohtien 2–3 jälkeen): raja Alma ↔ Alexandre III yhdessä kuvassa; Lontoo Blackfriars + London Bridge läheltä; kummastakin kaupungista 45° yleis ennen|jälkeen samalla rajauksella;
     levein ja pisin silta läheltä: Pariisi way/996671272 (48.900292 2.381194, 47 m) ja Pont Aval (48.834892 2.264338, 333 m); Lontoo Grosvenor (51.484499 −0.147352, 51 m) ja
     way/837943387 (51.514593 0.004808, 349 m). Arkit 1000 px + täysikokoiset parit. KK katsoo → junasana. Pohja: tee-sillat-kj49b.py (sillat-kj49b/).
- SEURAAJAN JONO: 1) aja_kaikki → KK rivi. 2) KJ49b kuvat → KK (vyöt poissa?). 3) Siltalinja 2–3 + KJ49c. 4) Parvis (a)/(b) → KK. 5) Työkalu 2 luonnokset. Montmartre yöviennin jälkeen.

## LISÄYS 31 (23.0x): aja_kaikki VALMIS → KK, NOLLAUS
- T/uudet-kaikki/kaikki.md: 52/63 valmis (10 Gt T7:llä). Pysähtyneet: alpit (tyhjä ote), ateena 8,3 / barcelona 8,2 Mt > 8 Mt, vakiokuvat < 3 katua: dubrovnik, helsinki,
  moskova (0/3 → tarkista miksi), pietari, sanmarino, venetsia; pariisi = tee_palat.py FileNotFoundError /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219/…/NotreDameKoe/pohja.png
  (vanha Pariisin syöte osoittaa poistettuun työpuuhun → polku nykyiseen työpuuhun/gitistä), lontoo = korkeus_oletus_osuus-mittari puuttuu (oma ea-lidar-aineisto). Rivi KK:lle lähetetty 23.0x.
- SEURAAJAN JONO: 1) muutama vakiokuva-arkki KK:lle (valmiista, esim. wien/rooma/praha; luonnos, ei pelikuva) + pysäytysten korjausehdotus (pala-raja, vakiokuvien kadunhaku, Pariisin polku).
  2) KJ49b kuvat (JU) → KK. 3) Siltalinja KK 22.51 kohdat 2–3 + KJ49c (LISÄYS 30). 4) Parvis (a)/(b) → KK (LISÄYS 29). 5) Työkalu 2 luonnokset. Montmartre yöviennin jälkeen.

## LISÄYS 32 (23.07, uusi sessio): KK 23.06 Alman syy vahvistettu + kaksi lisäystä
- KK laski vetokaavasta (SyvyysVeto, lähitaso 50 m): 109 m:n monikulmio 55–90 m:n päässä 18–25 m liian kauas; 4d18cf390 HYVÄKSYTTY korjauspaikaksi, junasana vasta KJ49b/c:n kuvista.
- (1) 8 m:n paloillakin virhe enimmillään ~1,2 m, kun pala on ~110–130 m:n päässä (vetokaavan taite, raja 75 m); holvin laki vain 1,7 m kannen alla
  → KJ49c:hen YKSI MATALA KUVA Alman kannesta ~120 m:n päästä (pahin kohta). Jos tumma juova näkyy: kansi ja holvin laki SAMAAN PALAJAKOON (samat asemat x-suunnassa),
  jolloin virhe on molemmissa sama. (Huom: Rakentaja.Pilkko jakaa nyt kunkin nelikulmion omaan ceil(pit/8)-jakoonsa → asemat eivät osu kohdakkain kannen ja lakien välillä.)
- (2) KOHTIEN 2–3 (sillan tyyppi, kannen sävy) JÄLKEEN: SAMA VIKA MUISSA RAKENTAJISSA. Listaa talokoneen ja koodinähtävyyksien pisimmät monikulmiot
  (virhe pahimmillaan 109 m → 25 m, 50 m → 9 m, 30 m → 3,4 m, 16 m → 2,9 m). Jos yli 50 m:n monikulmioita (siivet, hallien katot, laiturit): pilkonta YHTEISEEN apufunktioon,
  jota sillat, kohteet ja talot kutsuvat; muille kuin silloille raja 30 m. Kerro KK:lle kolmiomäärän muutos.
- KJ49b: JU:n jono-ks-kj49b.zsh (pid 87003) käynnissä 23.07.
- SEURAAJAN JONO: 1) vakiokuva-arkit + pysäytysten korjausehdotus → KK (LISÄYS 31). 2) KJ49b → KK. 3) Siltalinja 2–3 + KJ49c (+ Alma 120 m matala). 4) Pitkät monikulmiot muissa
  rakentajissa (yllä 2). 5) Parvis (a)/(b) → KK. 6) Työkalu 2 luonnokset. Montmartre yöviennin jälkeen.
- 23.09 JONO 1 TEHTY: arkki tyokalu-1/vakiokuvat-arkki-wien-rooma-praha.jpg + pysäytysten korjausehdotus KK:lle (odottaa sanaa): 1) vakiokuvat: highway=pedestrian
  TAVALLINEN-joukkoon + TALOJA portaittain 12→8→6 (mitattu: venetsia 97, helsinki 10, sanmarino 6 jo 12:lla; moskova 39 kuudella; koe scratch katukoe.py). 2) ateena/barcelona: raja 8 Mt pysyy,
  yli rajan pala jaetaan 4:ään (ei rajan nostoa). 3) Pariisin syötepolku nykyiseen työpuuhun. 4) Lontoo: oletus-osuus lasketaan myös EA-lähteelle. 5) alpit = maisema, ohitetaan.
  SEURAAVA: KJ49b (JU pid 87003) → KK.
- 23.09 SILTALINJA 2 (tyyppi) ALOITETTU, mittaus: OSM:n man_made=bridge-alueilla bridge:structure kattaa lähes kaiken (Pariisi 356/390: beam 245, arch 78, humpback 14,
  truss 12, suspension 4, cable-stayed 3; Lontoo 525/805 vastaavasti). Alma way/183589443 = beam, Mirabeau way/184264542 = arch, Alexandre III way/183620685 = arch,
  Blackfriars way/123464163 = arch. material harvoin (Pariisi 6) → kivi/metalli taulusta tai oletuksena. Tukia: Pariisi 245 / Lontoo 444 pier-/tuki-wayta (man_made=pier tai bridge:support).
  Koe: scratch siltatagit.py (ajetaan otteet-63:sta). SEURAAVAKSI: sillat.py lukee alueen bridge:structure → laji (arch→kaari, beam→PALKKI uusi laji rakentajaan, truss→metalli),
  aukot tukien määrästä alueen sisällä, sitten Pariisin Seinen siltojen korjaustaulu (nimi → tyyppi, materiaali, aukot, lähde), viimeisenä pituusoletus.

## LISÄYS 33 (23.10): KK 23.08 JÄRJESTYS (KK:n päätös) + ketjusta KK haluaa nähdä — KORVAA aiemmat jonot
- JÄRJESTYS: 1) KJ49b-kuvat → KK. 2) Pariisin lukittu lista: Montmartren parit KJ43 HETI 01.00:n maastoviennin jälkeen (nykyinen kumpu | kartan oma mäki; KK ratkaisee itse,
  ei korttia) + Notre-Damen aukion haamut (ympäristöerä 2/2; LISÄYS 29 (a)/(b)). 3) Ketjun pysähdykset ja näyte (alla). 4) Sillan tyyppi + kannen sävy (KJ49c; LISÄYS 30/32).
  5) Pitkät monikulmiot (LISÄYS 32), 3D-puun sävy.
- KETJU (ei 52 arkkia): a) KORKEUDET: 70–97 % GHSL:stä → sovittu virheen mittaus Pariisia ja Lontoota vasten (KK 11.11. 21.2x) ENSIN: yksi luku (mediaanivirhe kerroksina
  + pahin kymmenys). Ilman sitä yksikään GHSL-kaupunki ei mene peliin. b) NÄYTE 6 kaupungista: Amsterdam, Praha, Lissabon, Tukholma, Luxemburg, Barcelona (korjauksen jälkeen):
  3 vakiokuvaa + 1 × 45° yleis yhdellä 1000 px arkilla per kaupunki + viereen oikea ilma-/katukuva samasta paikasta (lähde riville). c) PYSÄHDYKSET yleisellä säännöllä, ei
  kaupunkipoikkeuksia: 8 Mt pysyy → pala jaetaan (Ateena, Barcelona). Vakiokuvat: Helsingin 1/3 ei voi olla oikein → syy ensin datasta (valintasääntö), sitten varasääntö
  (Venetsia, Dubrovnik, San Marino: aukiot tai ranta). Moskova ja Pietari viimeisinä. Pariisi/Lontoo (tee_palat) = oma aineisto, korjaa maskipolku.
  d) MITÄÄN ketjun tuloksista ei peliin eikä jakeluun ennen KK:n sanaa.
- Huom: KK:n 23.08 kirjoitettu ennen KS:n 23.09 ehdotusta; Helsingin syy jo mitattu (vain 1 residential-katu ≥ 12 taloa/40 m, pedestrian 9) → valintasääntö ei osu
  Helsingin isoihin kortteleihin; tarkennus KK:n linjalla vaiheessa 3.
- PARVIS MITATTU → KK (suositus a, odottaa sanaa): skripti parvis-saanto/vaihtoehdot.py <ote>. (a) leisure=garden < 120 m², ei ≥ 1000 m²:n puiston/nurmen sisällä, ei sisäpiha
  (≥ 6/8 sädettä osuu taloon ≤ 40 m): parvis 3/3, Pariisi 680/1453, Lontoo 1708/8520 poistuu. (b) aukio tai pedestrian ≤ 15 m: parvis 0/3 (lähin pedestrian 15–38 m; footway 3–10 m)
  → ei. Toteutus sanalla ElavaTyyli.cs:n landcover-silmukkaan (OMT: garden-alueen ala + building-taso sisäpihatestiin), näyttö KJ46 ym46-03-a + ND-esittelyn loppu.

## LISÄYS 34 (23.17): KK 23.09 päätökset ketjuun → toteutettu 1, 3, 4, 5; kohta 2 takaisin KK:lle
- KK 23.09: 1) hyväksytty muutoksin: pedestrian + living_street, portaat 12→8→6 kirjataan tauluun, KADUT KESKUSTASTA (pelipiste, 1,5 km, eri suunnista, säde portaittain;
  tiheys ehto, ei valintaperuste). 2) 8 Mt pysyy, pala jaetaan. 3) Pariisin polku. 4) oletus-osuus omallekin aineistolle. 5) Alpit maisemaksi.
  Havainto työkalun 2 kattotyyppilistaan: Rooma 1:n katot taittuvat oudosti epäsäännöllisillä pohjilla. Näyte 6 kaupungista PELIN PIIRROLLA Macilla, jos ketjun tulos
  latautuu kehittäjän juuresta; luonnospiirto vain jos ei, ja silloin vesi mukaan → kerro KK:lle kumpi.
- TEHTY (karttaseppa/tyokalu-1, natiivi-backup): b70b07ec0 vakiokuvat keskustasta (8 kaupunkia 3/3; dubrovnik vain varasäännöllä 6 km ilman suuntia) + porras-sarake
  kaikki.md:hen; 2e30f1907 tee_palat oletus-osuus kaikille lähteille (tavut ennallaan), maisemat.json (alpit). Pariisin syöte: _tyo/.../nahtavyyssarja/kohteet-pariisi.json
  ND-polku → nahtavyyssarja/alueet/notre-dame-pohja-219e7e2ef.png (git-blob 392da4c8; vanha talteen .ennen-polkukorjausta-20261111).
- KOHTA 2 KK:LLE 23.17: jako ei onnistu työkalussa (TaloKerros.PalaZ 15 kiinteä, Koodimallit + ämpäriluettelo samalla avaimella; muistia ei säästy).
  (a) lataaja tukee jaettua palaa, (b) yleinen kevennys yli 8 Mt palaan (puut / pienimmät katot yksinkertaisemmiksi). Suositus (b). ODOTTAA.
- UUSINTA-AJO käynnissä 23.16 (aja_kaikki ilman --vain, valmiit ohitetaan): loki T/uudet-kaikki-2.log. Valmiiden vakiokuvat yhä vanhalla säännöllä → näytteen 6 kaupunkia
  ajetaan vakiokuvat.py uudelleen. Näytteen piirtotapa: tarkista latautuuko ketjun tulos pelissä kehittäjän juuresta (TaloKerros.LueKansio / kehittäjän kansio) → KK:lle kumpi.
- JONO: 1) KJ49b → KK. 2) Montmartre KJ43 01.00:n jälkeen + parvis (odottaa sanaa a). 3) ketju: GHSL-virhemittaus Pariisi/Lontoo (a), näyte 6 kaupunkia (b), pala (odottaa).
  4) Siltatyyppi + kannen sävy + KJ49c (Alma 120 m). 5) Pitkät monikulmiot, 3D-puun sävy.
- 23.17 KK:lle (ketju a + näytteen piirto): GHSL-talot kerroksina (3,2 m): mediaani Lontoo 0,8 / Pariisi 1,5 kerrosta, pahin kymmenys > 2,4 / 3,4; keskusta harha −2,2 / −2,6 m
  (T/mittaus/tulos-*.json, kerroin 0,8). Pelikelpoisuus = KK:n päätös, ODOTTAA. Näyte: pelin piirto `talot kansio <abs polku palat>` (MT02 sijaintiriippumaton) — ehdotettu
  JU:lle ensin YKSI koekuva Amsterdamista (tarkista, ettei kaupungin oma rakennuskerros peitä); jos ei toimi → luonnos + vesi. Ei vielä pyydetty JU:lta (odottaa KK:n vastausta).

## LISÄYS 35 (23.18): KK:n päätökset 23.12 / 23.16 / 23.17, NOLLAUS (Postivahti)
- PARVIS (KK 23.12): sääntö (a) HYVÄKSYTTY + LISÄYS: 120 m²:n raja toisiinsa koskevien viheralueiden (garden, grass, park; väli ≤ ~3 m) YHDISTEESTÄ. (b) ei.
  MITATTU (parvis-saanto/yhdiste.py <ote> [esim.json]): Pariisi poistuu 476 (yksittäin 680), Lontoo 357 (yksittäin 1708), parvis 3/3 → KK:lle 23.18.
  Poistuvat listattu: parvis-saanto/poistuvat-{pariisi,lontoo}.json (osm, ala, lat, lon). TOTEUTA KJ49b:n JÄLKEEN: ElavaTyyli.cs landcover-silmukka (OMT: garden-alueen ala,
  yhdiste koskevista viheralueista ≤ 3 m, ≥ 1000 m² puiston sisällä ei, sisäpihatesti building-tasosta).
  NÄYTTÖ: ND-aukio KJ46 ym46-03-a -kulmasta + ND-esittelyn lopun kuva + Lontoon rivitaloalue ennen|jälkeen + yksi Pariisin katu, josta laikkuja poistuu (täysikokoinen rajaus).
- PALA (KK 23.16): PÄÄTÖS (b) kevennys, ei jakoa. 1) Järjestys: pienimpien talojen katot tasakatoiksi pienimmästä pohjasta ylöspäin, kunnes pala ≤ 8 Mt. PUIHIN EI KOSKETA.
  2) Katto: jos pala ei mahdu, vaikka kärjistä olisi lähtenyt 15 %, ketju pysähtyy ja raportoi (ei hiljaista riisumista). 3) kaikki.md-sarakkeet: kevennettyjä paloja,
  suurin kevennys %. 4) NÄYTTÖ: Ateenan raskain pala (15_18539_12638, 8,65 Mt, 284k kärkeä) ennen|jälkeen 45° kaupunkinäkymä + yksi lähempää täysikokoisena; samaan näytteeseen.
  Yleinen sääntö tee_palat.py:hyn (katon muoto: katto-funktio ~r. 407–420 'tasa'; kevennys palan kirjoitussilmukassa r. ~645: jos len(data) > 8 MiB → uusinta tasakatoin).
- GHSL (KK 23.17): KELPAA tavallisille taloille, lopullinen sana näytekuvista. 1) Lähdejärjestys pysyy; listaa näytekaupungeista isot pohjat ilman OSM-korkeutta (tornit).
  2) Järjestelmällinen virhe pois: kerroin kaupunkikohtaisesti kaupungin omia OSM height/levels -taloja vasten (≥ 500 pelipisteen 3 km:n säteellä), muuten yleinen 0,8;
  kerroin + jäännösvirhe tauluun — NÄYTTEEN JÄLKEEN. 3) GHSL:n lähderivi pelin oppaaseen ensimmäisen GHSL-kaupungin mukana.
- NÄYTE (KK 23.17): pelin piirto hyväksytty → ENSIN yksi Amsterdamin koekuva JU:lle KJ49b:n jälkeen (`talot kansio <T/uudet-kaikki/amsterdam/palat>`, kamera Amsterdamiin);
  jos omat rakennukset peittyvät tai päällekkäin → KK:lle ennen luonnoskuvia. Näytekaupunkien vakiokuvat ajettava uudella vakiokuvat.py:llä (b70b07ec0) ennen kuvia.
- TAUSTA: uusinta-ajo (aja_kaikki, valmiit ohitetaan) käynnistetty 23.16, loki T/uudet-kaikki-2.log; jos katkesi nollauksessa → sama komento (LISÄYS 23, ilman --vain).
  Ateena/Barcelona pysähtyvät yhä 8 Mt:iin, kunnes kevennys tehty. KJ49b: JU pid 87003 (jono-ks-kj49b.zsh) käynnissä 23.18.
- SEURAAJAN JONO: 1) KJ49b → KK (parit K/pari.py; Alma 31/33, Concorde 34, raja 01b–01d, Lontoo 35–37; kolmioluku). 2) Amsterdamin koekuva JU:lle. 3) Parvis-toteutus + näyttö.
  4) Palan kevennys tee_palat.py + taulu + Ateena-näyttö. 5) Näyte 6 kaupunkia (Amsterdam, Praha, Lissabon, Tukholma, Luxemburg, Barcelona) + oikea ilma-/katukuva (lähde riville).
  6) Montmartre KJ43 01.00-viennin jälkeen (JU:n rivi). 7) Siltatyyppi + kannen sävy + KJ49c (Alma 120 m). 8) GHSL-kalibrointi, pitkät monikulmiot, 3D-puun sävy.

## LISÄYS 36 (23.4x, uusi sessio 23.20): KJ49b Pariisi → KK, parvis tehty, Pariisin syöte korjattu, kevennys kesken
- aja_kaikki katkesi nollauksessa (helsinki 23.19) → jatkettu samalla komennolla, VALMIS 23.27: 59/62 (ateena/barcelona 8 Mt, pariisi oletus 47 %).
- PARIISIN 47 % = KETJUN SYÖTEVIRHE: uusi_kaupunki antoi tee_palat.py:lle otekansion, vaikka taulurivillä on oma `aineisto` (IGN) → "ign 0". KORJATTU
  (rivin aineisto voittaa; työpuu proto-karttaseppa-koodijuna, EI VIELÄ COMMITOITU kevennyksen kanssa) → uusinta 23.41: pariisi valmis (IGN 107k, oletus 2,1 %), lontoo valmis (osm-d6).
- KJ49b PARIISI katsottu → KK + PT 23.3x: arkki K/parit-kj49b/arkki-kj49b-pariisi.jpg. Alman vyöt poissa, 1 kapea juova kannen lähireunassa (KJ49c: yhteinen palajako),
  Concorden iso musta aukko myös korjautui. LONTOO (2 ajoa) jäi JU:n levytauon taakse 23.26 (sisäinen levy 8 Gi) → JU ajaa myöhemmin; parit K/pari.py kuten Pariisi.
- PARVIS TEHTY 06742c72a + 29f1c9bd9 (natiivi-backup karttaseppa/parvis, työpuu /Users/Shared/Claude/wt/proto-karttaseppa-parvis, juna-224 72dcd6811:n päällä):
  ElavaViherPois.cs (garden < 120 m² yhdisteestä ≤ 3 m, sisäpiha 6/8 sädettä ≤ 40 m, z ≥ 13), ElavaTyyli landcover-silmukka, välimuistiavain -vp1. 772/772, unity 0.
  OIKEA ND-PALA 14/8298/5636: poistuu täsmälleen parvis'n 3 laikkua, 7 ms. KJ50-skripti parvis-saanto/sk-mac-parvis-kj50.txt + Amsterdamin koekuva
  tyokalu-1/amsterdam-koe/sk-mac-amsterdam-koe.txt PYYDETTY JU:LTA 23.40 (KJ49b Lontoon jälkeen). Tulokset → KK (kopio PT).
- KEVENNYS (KK 23.16 b): tee_palat.py rakenna() + uudelleenpiirto TASAKSI-joukolla (pienimmät pohjat ensin, 5 %:n erät, raja 15 % kärjistä, muuten kevennys_ei_riita
  → pysähdys); mittarit kevennetyt/kevennetyt_paloja/kevennys_suurin_pct/suurin_pala_tavut. uusi_kaupunki/aja_kaikki-muutokset valmiina scratch-skriptinä
  (kevennys2.py: pysähdys + tarkka tavuraja + kaikki.md-sarakkeet) — aja ja commitoi, kun ateena/barcelona-ajo valmis. Ateena-näyttö (ennen|jälkeen) vielä tekemättä.

## LISÄYS 37 (23.5x): kevennys + Pariisin syöte commitoitu, KK:n 23.4x sana, NOLLAUS (konteksti 26 %)
- c3f0a05b6 (natiivi-backup karttaseppa/tyokalu-1): kevennys (Ateena 15_18539_12638 8,25→7,95 Mt, 510 tasakattoa, 3,7 %; Barcelona 15_16585_12231 8,21→7,97, 396, 3,1 %),
  rivin aineisto voittaa otteen (Pariisi IGN 208k, oletus 2,1 %), tarkka tavuraja, kaikki.md-sarakkeet. aja_kaikki 62/62 valmis 23.55. → KK:lle 23.5x.
  Ateenan ENNEN-palat (ilman kevennystä): T/uudet-kaikki/ateena/palat-ennen-kevennys (PALA_MAX_MT=99) → Ateena-näyttö pelin piirrolla `talot kansio` ennen|jälkeen,
  45° kaupunkinäkymä palan 15_18539_12638 kohdalta + yksi lähempää täysikokoisena (KK 23.16 k. 4), samaan näytteeseen.
- NÄYTTEEN VAKIOKUVAT ajettu uudella vakiokuvat.py:llä (amsterdam, praha, lissabon, tukholma, luxemburg; vanhat *.vanha-saanto.json); barcelona ajettiin kokonaan uudelleen.
- KK 23.4x KJ49b PARIISI KELPAA (+39k kolmiota ok). JUNASANA vasta LONTOON kahdesta lähikuvasta → LÄHETÄ LONTOON ARKKI KK:LLE HETI, kun JU:n ajot tulevat
  (lokit/ks-kj49b-sillat-lontoo-{2eb8ff84a,4d18cf390}; parit K/pari.py → K/parit-kj49b/, arkki 1000 px kuten Pariisi).
  KJ49c:hen (KK): Alman etureunassa KAKSI juovaa: ylempi = kannen lähireuna (palajako), ALEMPI = sillan pään ja rantamuurin välissä (oli jo ENNEN) → selvitä syy
  geometriasta (GeneroidutSillat + OhjelmaKohdeGeometria.Lasku r. 211–270: LaskuA/LaskuB 27,0, MaaA 29,6, seinä y 0 → ya), korjaa samassa, näyttöpari samasta kamerasta (si49-31).
- JU 23.4x: KJ50 parvis + Amsterdamin koekuva jonossa (pid 80431) KK:n 23.26 järjestyksellä: kj49b Lontoo → PEK kuvajono → PEK kamera → KJ50 → Amsterdam. Valmisrivi KS + PT.
- PT 23.4x pyysi pysäyttämään ajot levyn takia (1,5 Gi); vastattu: pid 36037 ei ollut minun, aja_kaikki kirjoittaa T7:lle, levyllä oli jo 43 Gi.
- SEURAAJAN JONO: 1) KJ49b Lontoo → KK heti kun tulee. 2) KJ50 + Amsterdam JU:lta → KK (kopio PT). 3) Näyte 6 kaupunkia pelin piirrolla (Amsterdamin koekuvan jälkeen)
  + Ateena ennen|jälkeen + oikea ilma-/katukuva (lähde riville). 4) Montmartre KJ43 01.00-viennin jälkeen (JU:n rivi). 5) Siltatyyppi + kannen sävy + KJ49c (Alma 120 m + alempi juova).
  6) GHSL-kalibrointi, pitkät monikulmiot, 3D-puun sävy. Työpuut: tyokalu-1 = /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, parvis = wt/proto-karttaseppa-parvis, sillat = wt/proto-karttaseppa-sillat.

## LISÄYS 38 (12.11. 00.1x, uusi sessio 23.57): SILTALINJA 2–3 + KJ49c-koodi tehty, KJ49c JU:lla, NOLLAUS (konteksti 26 %)
- KJ49b LONTOO, KJ50 ja Amsterdam yhä JU:n jonossa 00.08 (pid 45691 taitto-juna-1b:n takana; pid 80431 PEK kameran jälkeen). Lokit ruutukansioineen voivat olla T7:llä (JU LEVY 23.4x).
- SILLAT 300c6b99d (natiivi-backup karttaseppa/sillat, työpuu /Users/Shared/Claude/wt/proto-karttaseppa-sillat; 778/778, unity 0):
  SiltaLaji.Palkki (PalkkiAukko, PalkkiKorkeus 2,2, tuet = umpiseinät, ei SillanPilarit), KaupunkiSilta.Generoitu → kansi/laskut KatuKartta (KannenKatu/Jalka/Lankku),
  Rakentaja.Pilkko leikkaa 8 m:n x-ruudukolla (yhteinen palajako), päätyseinä vesirajalla p[paras].x / p[paras+1].x (Alman alempi juova: tukiosan kotelo oli avoin),
  GeneroidutSillat lukee valinnaisen Aukot-taulukon. Testit PalkkiJaAukotRakentuvat, GeneroidunKansiKadunSavyssa, YhteinenPalajako. Kolmiot 160 206 → 137 788.
- TYÖKALU 1 e7129fb55 (karttaseppa/tyokalu-1): sillat.py tyyppi taulu → OSM bridge:structure/material + tuet → oletus; tyyppi_lahde rivillä; sillat-korjaus/pariisi.json 19 siltaa
  (fr/en.wp; puuttuu Issy, Morland, Nelson-Mandela). Ajo: sillat.py <id> otteet-63/<id> _tyo/karttaseppa/tyokalu-1/sillat/sillat-<id>-tyyppi.json --unity-juuri <sillat-työpuu> --resurssi <…>/Resources/sillat/<id>.json.
- KJ49c pyydetty JU:lta 00.08: _tyo/karttaseppa/koodijuna/sillat-kj49c/sk-mac-sillat-kj49c-{pariisi,lontoo}.txt (9 + 5, tee-sillat-kj49c.py), ENNEN 4d18cf390 | JÄLKEEN 300c6b99d
  → lokit/ks-kj49c-sillat-*. KUN TULEE: parit K/pari.py → K/parit-kj49c/, arkki 1000 px → KK (kopio PT): Alma kaksi juovaa poissa (si49c-31, -38), palkki + 1 pilari (33),
  Mirabeau 3 teräskaarta + ei kiilaa (32), Iéna 5 kivikaarta (39), kansi kartan kadun sävyssä yleiskuvissa, levein/pisin. KK:lle lähetetty 00.1x tulos + mistä tyyppi tulee.
- SEURAAJAN JONO: 1) KJ49b Lontoo → KK heti (junasana). 2) KJ50 + Amsterdam → KK. 3) KJ49c → KK. 4) Näyte 6 kaupunkia + Ateena ennen|jälkeen (LISÄYS 37 k. 3).
  5) Montmartre KJ43 01.00-viennin jälkeen (JU:n rivi). 6) Pitkät monikulmiot muissa rakentajissa (LISÄYS 32 (2): pilkonta yhteiseen apufunktioon; Rakentaja.Pilkko on nyt ruudukko), GHSL-kalibrointi, 3D-puun sävy.

## LISÄYS 39 (00.1x): KK 00.06 PETIT PALAIS -VIKA (JONO MUUTTUU) + levysiirto
- KK 00.06: julkaistussa 224.89:ssä Petit Palais'n esittelyn lähikuvassa lasikaton vaaleansininen, vihreäraitainen kaista näkyy pääjulkisivun SEINÄN LÄPI ikkunakaarien
  yläosan kohdalla koko siiven pituudelta ja pistää ulos vasemman pyöreän tornin vierestä. Kuva /Users/Shared/Claude/proto-3d/lokit/nui-petit-palais-juna-1-8459237ec/14-petit-palais-6-lahin.png,
  rajaus ffmpeg crop=iw*0.36:ih*0.22:iw*0.26:ih*0.50. SELVITÄ GEOMETRIASTA: pitkän monikulmion syvyysveto (LISÄYS 32 (2); OhjelmaKohde.shader SyvyysVeto lasketaan kärjissä,
  Rakentaja.Pilkko ruudukko 300c6b99d vain silloilla) vai mallin oma pinta seinän edessä (OhjelmaKohdePariisiPetitPalais*.cs: lasikatto vs julkisivun syvyys). Korjaa.
  NÄYTTÖPARI samasta kamerasta KK:lle; ei junaan ennen KK:n sanaa. JÄRJESTYS: HETI KJ49c:n jälkeen, ennen kuuden kaupungin näytettä.
- SEURAAJAN JONO (korvaa LISÄYS 38:n): 1) KJ49b Lontoo → KK heti. 2) KJ50 + Amsterdam → KK. 3) KJ49c → KK. 4) PETIT PALAIS (yllä). 5) Näyte 6 kaupunkia + Ateena.
  6) Montmartre KJ43 01.00-viennin jälkeen. 7) Pitkät monikulmiot, GHSL-kalibrointi, 3D-puun sävy.
- LEVY (PT 00.1x, omistaja 23.34): _tyo/karttaseppa-kohokartta-raaka 37 Gi → /Volumes/T7 4TB/koodaus/karttaseppa/karttaseppa-kohokartta-raaka + symlinkki vanhaan polkuun,
  ajo scratchpad siirra-koho.zsh (rsync + cmp, lähde pois vasta samana). Jos symlinkkiä ei ole: siirto kesken/katkesi → tarkista, aja uudelleen (rsync jatkaa). Rivi PT:lle valmiina.
  Työpuut koodijuna/parvis/sillat EIVÄT valmiita (PT:lle kerrottu), ei poistettu.

## LISÄYS 40 (12.11. 00.2x, uusi sessio 00.13): KJ49b Lontoo → KK, Petit Palais korjattu, KJ51 JU:lla, levysiirto uudelleen
- KJ49b LONTOO → KK 00.2x: arkki K/parit-kj49b/arkki-kj49b-lontoo.jpg + pari-lontoo-*.jpg + rajaus-lontoo-35-blackfriars-kylki.jpg. Blackfriarsin ratasillan tumma juova poissa,
  muut ennallaan; Lontoon ohjelmakohteet 166 787 → 191 583 kolmiota (+14,9 %). ODOTTAA KK:n junasanaa 4d18cf390:lle.
- PETIT PALAIS (KK 00.06): syy = mallin oma pinta, EI syvyysveto. PpPiha: gallerioiden lasikatto (14 m) ulottui PpUlko-rajaan (−66, 17,5)…(−45, −45), joka oli 1–1,5 m
  sivusiipien ulkoseinän ja rotundien ulkopuolella → lasi näkyi seinästä kaarien yllä ja tornin vierestä. KORJAUS e5282c741 (natiivi-backup karttaseppa/petit-palais-lasi,
  = 8459237ec (224.89) + 1; työpuu /Users/Shared/Claude/wt/proto-karttaseppa-pp-lasi): PpUlko (−52,5, 17,5), (44,5, 17,5), (23,5, −38), (−31, −38) siipien sisällä.
  Testi: säde alas 0,8 m ulkoseinän ulkopuolelta ei osu (kaatuu vanhalla); rotundatesti kupolista (vanha nojasi rotundan alle ulottuneeseen lasiin). 766/766, unity 0.
- KJ51 pyydetty JU:lta 00.2x: _tyo/karttaseppa/koodijuna/petit-palais-kj51/sk-mac-petit-palais-kj51.txt (NUI:n pelaajan polku + 5 kiinteää lähikuvaa), ENNEN 8459237ec | JÄLKEEN e5282c741
  → lokit/ks-kj51-pp-lasi-<sha>. KUN TULEE: parit K/pari.py → K/parit-kj51/ (pp51-6-lahin = KK:n kuva, rajaus crop iw*0.36:ih*0.22:iw*0.26:ih*0.50 täysikokoisena) → KK. Ei junaan ennen KK:n sanaa.
- LEVY: edellinen siirra-koho katkesi alussa (kohde 0 B, ei rsynciä) → käynnistetty uudelleen 00.14 (scratchpad 5e2c9543…/siirra-koho.zsh, loki siirra-koho.log). Jos symlinkkiä ei ole, aja uudelleen.
- SEURAAJAN JONO: 1) KJ50 + Amsterdam (JU) → KK. 2) KJ49c (JU) → KK. 3) KJ51 Petit Palais → KK. 4) Näyte 6 kaupunkia + Ateena (LISÄYS 37 k. 3). 5) Montmartre KJ43 01.00-viennin jälkeen.
  6) Pitkät monikulmiot, GHSL-kalibrointi, 3D-puun sävy.

## LISÄYS 41 (00.4x): PITKÄT MONIKULMIOT koodikohteissa tehty, KJ52 JU:lla, talot → KK:n päätös
- MITTAUS (K/pitkat-monikulmiot/: mittaa.py OBJ-viennistä, tulos-koodikohteet.txt): koodikohteissa 350 157 kolmiota, särmä > 30 m 11 900, > 50 m 4 542; pisimmät Louvre 256 m
  (piha/kiveys y 0,1), Tower Bridge 251, Grand Palais 235, Westminster 210, Montparnasse 205, Orsay 189, Pompidou 173 m. (Petit Palais'n vika EI tätä, ks. LISÄYS 40.)
- TEHTY ced23df14 (natiivi-backup karttaseppa/pitkat-monikulmiot = sillat 300c6b99d + 1; työpuu /Users/Shared/Claude/wt/proto-karttaseppa-pitkat): Rakentaja.Kolmio → Jaa:
  särmä > SarmaRaja (PitkaSarma 30 m) puolitetaan keskeltä vain oman pituutensa perusteella ((p+q)/2) → yhteinen särmä jakautuu naapureissa samoin, ei T-saumoja;
  AO-väri alkuperäisistä kärjistä interpoloiden (sävy sama). Koodikohteet 350 157 → 422 524 (+20,7 %, > 50 m 0; jäljelle 58 kpl ≤ 32,6 m concorde-esineissä, ne luetaan
  valmiista tiedostosta), sillat 137 788 → 146 338. Tarkista(): pisin särmä ≤ 30 m kaikille; Kolmioraja + Louvre 40 000 → 70 000 (Louvre 65 402). 778/778, unity 0.
  Raja 50 m:llä olisi +7,4 % (arvio.py).
- KJ52 pyydetty JU:lta 00.4x KJ51:n jälkeen: K/pitkat-monikulmiot/sk-mac-pitkat-kj52-{pariisi,lontoo}.txt (6 + 4), ENNEN 300c6b99d | JÄLKEEN ced23df14 → lokit/ks-kj52-pitkat-*.
  KUN TULEE: parit → K/parit-kj52/, kolmioluvut lokista (ohjelmakohteet: luotu) → KK yhdessä viestissä TALOJEN PÄÄTÖKSEN kanssa:
- TALOT (talot.py, Pariisi palat-v41-pp): 6 552 878 kolmiota, vaakasärmä > 30 m 230 234 (3,5 %), > 50 m 63 529, > 100 m 7 206, pisin 616 m; 30 m:n jako ≈ +4,9 % kolmioita
  (≈ +320k). Talot ovat Pythonin paketteja → jako = tee_palat.py:n sääntö + UUDET talopaketit kaikille (ämpäri, 8 Mt:n raja). Vaihtoehto: pelin lataaja jakaa ladattaessa (ei pakettimuutosta,
  latausaika). Suositus: tee_palat.py:hyn ja mukaan seuraavaan talopakettiin (Montmartre v17 odottaa jo korttia). KK PÄÄTTÄÄ.

## LISÄYS 42 (00.3x): NOLLAUS (konteksti 26 %)
- LEVY: siirra-koho.zsh käynnissä taustalla tämän session alla (00.14; kohteessa ~30/37 Gi 00.3x). Nollaus voi katkaista → tarkista: jos
  /Users/Shared/Claude/proto-3d/_tyo/karttaseppa-kohokartta-raaka ei ole symlinkki, aja uudelleen: zsh /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-karttaseppa/5e2c9543-dcb3-4f1a-be58-04725ba7f1e6/scratchpad/siirra-koho.zsh
  (rsync jatkaa, cmp ennen poistoa). Valmis → rivi PT:lle (ja vapautunut tila).
- JU:LLA (pyydetty, valmisrivi KS:lle): KJ50 parvis + Amsterdam, KJ49c, KJ51 Petit Palais, KJ52 pitkät monikulmiot. KK:lle lähetetty: KJ49b Lontoo + PP:n syy (00.2x).
- 3D-PUUN VALO (KK 21.38, jonon viimeinen): EI ALOITETTU. Selvitetty: kevyet puut = puuAineKevyt (NotreDameKirkko.shader, Nahtavyysalue.cs ~r. 1413/2438, komento `puut savy`).
  Ehdotus: uusi ominaisuus _ValoEro (oletus 1 = ennallaan) → nl = lerp(0.5, nl, _ValoEro) vain puuAineKevyt-aineelle + komento `puut valoero x`; karkea kuva KK:lle ENNEN junaa (Näkyvä työ).
- SEURAAJAN JONO: 1) KJ50 + Amsterdam → KK. 2) KJ49c → KK. 3) KJ51 Petit Palais → KK. 4) KJ52 + talojen päätös → KK (LISÄYS 41). 5) Näyte 6 kaupunkia + Ateena (LISÄYS 37 k. 3).
  6) Montmartre KJ43 01.00-viennin jälkeen (JU:n rivi). 7) GHSL-kalibrointi (näytteen jälkeen), 3D-puun valo.
  Työpuut: pp-lasi = /Users/Shared/Claude/wt/proto-karttaseppa-pp-lasi (karttaseppa/petit-palais-lasi), pitkät = wt/proto-karttaseppa-pitkat (karttaseppa/pitkat-monikulmiot); muut ennallaan (LISÄYS 37).

## LISÄYS 43 (00.3x): KK 00.15 JUNASANA KJ49b → junahaara ilman NS T1:tä
- KK 00.15: KJ49b (4d18cf390) JUNAAN. JU: 4d18cf390 toi NS T1:n (dd370eab6, cfe3324a3), jota ei hyväksytty → TEHTY 64004902b (natiivi-backup karttaseppa/sillat-juna,
  työpuu /Users/Shared/Claude/wt/proto-karttaseppa-sillat-juna) = 8459237ec + 08b8d3885/2eb8ff84a/4d18cf390 poimittuina; OhjelmaKohteet.cs vanhalla rakenteella (Lista("kaikki","pariisi") /
  Lista("lontoo","lontoo")), GeneroidutSillatLataus kiinteästi pariisi + lontoo. 770/770, unity 0. JU:lle sha, PT:ltä pt-ok pyydetty → MR85 = 224.90. ODOTA LINKKI 224.90.
- HUOM SEURAAJALLE: KJ49c (300c6b99d) ja pitkät (ced23df14) ovat T1-pohjalla → junaan vietäessä poimi ne karttaseppa/sillat-juna:n päälle (sama ratkaisu).
- KK:n Lontoon lista MYÖHEMMÄKSI (ei nyt, ei KJ49c:hen): London Bridgen eteläpää ison korttelin alla; Blackfriarsin rautatiesilta piirtyy ikkunallisena talona veden päällä.
- KK:n järjestys: KJ49c-kuvat → Petit Palais → kuuden kaupungin näyte (jono LISÄYS 42 pätee).

## LISÄYS 44 (12.11. 00.3x, uusi sessio 00.30): 3D-PUUN VALO koodattu, KJ53 JU:lla, levysiirto jatkuu
- LEVY: siirra-koho oli katkennut (T7:llä 23/37 Gi, ei symlinkkiä) → käynnistetty uudelleen 00.3x tämän session alla
  (scratchpad f9fad151-…/siirra-koho.zsh, loki siirra-koho.log). Jos symlinkkiä ei ole: aja sama skripti uudelleen (rsync jatkaa, cmp ennen poistoa). Valmis → rivi PT:lle.
- 3D-PUUN VALO (KK 21.38) 6bb57f388 (natiivi-backup karttaseppa/puuvalo = 224.89 8459237ec + 1; työpuu /Users/Shared/Claude/wt/proto-karttaseppa-puuvalo; 766/766, unity 0):
  NotreDameKirkko.shader _ValoEro/_ValoKeski: nl = lerp(keski, nl, ero), puolipallo kohti (maa+taivas)/2; vain puuAineKevyt (Nahtavyysalue.AsetaKevytValo),
  komento `puut valoero ero [keski]`; oletus 1 = ennallaan (arvo valitaan KJ53:sta, keski säädetään niin, että 3D-latvuksen keskisävy pysyy).
- KJ53 pyydetty JU:lta 00.3x KJ49c/KJ51/KJ52:n jälkeen: _tyo/karttaseppa/koodijuna/puuvalo-kj53/sk-mac-puuvalo-kj53.txt (12 kuvaa: 42/43 KJ47c-kulmat + 44 lähi × ero 1/0.7/0.5/0.35)
  → lokit/ks-kj53-puuvalo-6bb57f388. KUN TULEE: python3 -I …/puuvalo-kj53/mittaa-kj53.py (3D ka + lum p10/p50/p90 vs maalattu) → valitse ero, säädä keski ka:n mukaan,
  oletus koodiin, karkea kuva KK:lle (Näkyvä työ) ENNEN junaa.
- JONO ennallaan (LISÄYS 42): 1) KJ50 + Amsterdam 2) KJ49c 3) KJ51 4) KJ52 + talot → KK 5) näyte 6 kaupunkia + Ateena 6) Montmartre KJ43 01.00 jälkeen 7) GHSL, puun valo (KJ53).

## LISÄYS 45 (01.3x): KJ49b 224.90 tarkistettu, KJ50 junasana, Amsterdamin nimet, näyte KJ54 JU:lla
- LEVY VALMIS 00.50 (symlinkki, sisäisellä 172 Gi), PT:lle kerrottu.
- KJ49b 224.90 (dc1117faa; juna-haaran kärki 546552cf0) junakuvat = ehdokas (parit _tyo/karttaseppa/koodijuna/parit-kj49b-juna/) → KK.
- KJ50 + Amsterdam → KK 01.1x; KK 01.16 JUNASANA parvis → 1d2cdf71b (natiivi-backup karttaseppa/parvis-juna = 546552cf0 + 06742c72a/29f1c9bd9; 776/776, unity 0;
  työpuu wt/proto-karttaseppa-sillat-juna on nyt tässä haarassa). pt-ok pyydetty PT:ltä 01.2x → odota LINKKI.
- AMSTERDAMIN NIMET (PT/KK 01.16 uusi rivi): c7dfbc2fe (natiivi-backup karttaseppa/nimet = 546552cf0 + 1, työpuu wt/proto-karttaseppa-nimet; 771/771, unity 0):
  Merkittavat.json Q855003 → Pampus 52.36472 5.06889 (Wikidata Q924769); ElavaNimet.Sopimaton (seksi/eroot/eroti/porno/prostitu/bordel/strippa/striptea + "sex" sanan alussa)
  POI-nimiin kaikissa kaupungeissa. Otteissa (otteet-63) ei ole POI-pisteitä → muiden kaupunkien osumia ei voi listata ilman planeettahakua.
  KJ55 JU:lla (koodijuna/nimet-kj55/sk-mac-nimet-kj55.txt, ENNEN 546552cf0 | JÄLKEEN c7dfbc2fe) → parit + tulos KK:lle.
- KJ54 NÄYTE JU:lla (tyokalu-1/nayte-kj54/sk-mac-nayte-kj54.txt, 29 kuvaa, 224.90) → lokit/ks-kj54-nayte-dc1117faa. Vertailukuvat: Sonnet-agentti hakee
  tyokalu-1/nayte-kj54/oikeat/ (orto + Commons-katukuvat, lahteet.json). Arkki per kaupunki 1000 px: 3 vakiokuvaa + yleis + oikea kuva → KK.
- JU:n jono: KJ49c → KJ51 → KJ52 → KJ54 → KJ55 → KJ53. Montmartren maasto 01.00 epäonnistui, JU ajaa uudelleen (tulos erikseen) → sitten KJ43.
- Python: numpy/PIL vain käyttäjän site-packagesissa → aja ilman -I (scratchpadista).

## LISÄYS 46 (01.4x): KJ49c katsottu → KK (VIKA), parvis 224.92, vertailukuvat valmiit, NOLLAUS (konteksti 25 %)
- JU 01.36: PARVIS 1d2cdf71b LINKISSÄ 224.92 = 70f3a7aba. VALMIS.
- KJ49c → KK 01.4x: arkit _tyo/karttaseppa/koodijuna/parit-kj49c/arkki-kj49c-{pariisi-a,pariisi-b,yleis}.jpg (+ pari-si49c-*.jpg). Kunnossa: kansi kadun sävyssä,
  ylempi juova pois, Alma palkki + 1 pilari, Mirabeau 3 teräskaarta, Iéna 5 kaarta. VIKA: Alman palkin kylki (2,2 m, kameraan päin, si49c-31 ja -38) SYVÄN MUSTA
  leveä nauha. SEURAAJA: korjaa haarassa karttaseppa/sillat (työpuu wt/proto-karttaseppa-sillat, 300c6b99d): tarkista palkkirakentajan kyljen normaali/kiertosuunta
  ja AO-väri (GeneroidutSillat / KaupunkiSilta.Generoitu, SiltaLaji.Palkki, PalkkiKorkeus 2,2), testi kyljen normaalille; uusi pari si49c-31 + -38 (JU) → KK.
  Junaan vietäessä poimi 300c6b99d + korjaus (+ pitkät ced23df14, jos KK) 224.92:n (70f3a7aba) päälle ilman NS T1:tä (kuten sillat-juna/parvis-juna).
- VERTAILUKUVAT KJ54:lle valmiit: tyokalu-1/nayte-kj54/oikeat/ (orto-<id>-keskusta.jpg 6 kpl, katu-<id>-1..3.jpg 18 kpl, lahteet.json). Tukholman orto = Sentinel-2 10 m (pehmeä).
  Katukuvista lähikadulta: luxemburg-1/2/3, amsterdam-2, barcelona-2 → mainitse lähderivillä. Kansiossa 3 _orto_meta*.tmp.json (agentin välitiedostot, ei poistettu).
- Työlista: "3D-puun valoisan puolen sävy" tilanne päivitetty.
- SEURAAJAN JONO: 1) KJ49c-palkin musta kylki (yllä) 2) KJ51 Petit Palais → KK 3) KJ52 + talojen päätös → KK (LISÄYS 41) 4) KJ54 näyte → arkit (3 vakio + yleis + orto/katu) → KK
  5) KJ55 nimet → KK 6) Montmartre KJ43 kun JU:n maastovienti valmis 7) KJ53 puun valo (mittaa-kj53.py) 8) GHSL-kalibrointi näytteen jälkeen.
