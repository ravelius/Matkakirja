# Pelikoodarin luovutus 19.10.2026 klo 09.25 (Postivahdin KOVA RAJA)

Edellinen: viesti-pelikoodari-luovutus-20261018-0952.md (LISÄYKSET 19.10. sen lopussa). Rooli: Pelikoodari (Opus, high), id osoitekirjassa.
Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*).

## ENSIN (järjestys)
1. **Rata v4 UI-mittarit** (PT 09.2x, omistaja): Ylapalkin ELÄMÄPALKKI-pohja (UI/Ylapalkki.cs, ElamaLohkoja 8 / ElamaPunaisia 3; Raamattu
   luku 4: hyväksytty pohja käy vastaaviin) KAHTENA RIVINÄ juoksupelin HUDiin: elinvoima ja viitta-energia; viitan VARANTO-osuus (VarantoE 20)
   erottuvana lohkona. RIMPUILU (omistaja 09.08, korvaa aiemman): kiinni jäädessä RIMPUILE-NAPPI (Ohjausnappi-pohja, kuten Spurtti) + palkki
   samasta elämäpalkkipohjasta, etenee 1/10 per napautus (RimpuiluTarve = 10, tehty 8a7d84932), elinvoima kuluu näkyvästi koko kiinnioloajan,
   PIENI VÄRÄHDYS per napautus (Handheld.Vibrate tai olemassa oleva haptiikka, grep "Vibrate|Haptiikka"). Ei uutta pohjaa; puuttuva → PT.
   Nyt mittarit ovat tekstilohkoina (V4Kierros.HudLukema, Palkki()).
2. **Paperilohikäärmeet kahtena lajina** (omistaja 09.13): yleinen = +1/3 viitta-energiaa (EnergiaMax/3), harvinainen = energia aina täyteen.
   Värit datasta vaihdettaviksi (KK:n ehdotus punainen yleinen, keisarillinen keltainen harvinainen; omistajan vahvistus odottaa). Nyt
   V4Lohikaarme {S, Kaytetty}, +35 kaikille (JuoksuV4.cs Lohikaarmepaikat 4 kpl) → lisää Laji + väri (esim. JuoksuV4Reitti-taulukko tai json).
3. **SK:n tekstit kytkentään**: main 7c6d3dfa8 (#4909) docs/raportit/juoksupeli-tekstit-fi-20261019.json (37 avainta, litteä) → kopioi proto
   Assets/Matkakirja/Scripts/Juoksupeli/Resources/JuoksuV4/tekstit.fi.json (+ .meta TextScriptImporter). Avainmuoto VAHVISTETTU sellaisenaan:
   juoksupeli.viitta.1–3 (esittelyn rivit, ≤ 60), juoksupeli.aarre.<id>.nimi/.teksti (10 KERÄTTÄVÄÄ tason 2 aarretta huoneissa),
   juoksupeli.rikkoutuva.<id>.nimi/.teksti (5 kulttuuriaarretta = väistettävät esteet, rikkoutuvat törmätessä), juoksupeli.lohikaarme.nimi/.teksti,
   juoksupeli.omena.herkku/.mata.teksti. Kerro SK:lle "avaimet vahvistettu" (en ehtinyt). Kerättävien aarteiden paikat tasolla 2 = alas huoneisiin
   (odottaa Codexin yläreittiä).
4. **Simuvuoro ~10.15** (JU:n jono LS → LAVASTAJA → VS → NUI → PK): JU kääntää 84357cae9:n L2:lla kansioon proto-3d/_tyo/julkaisija/juoksupeli-202-app.
   VASTAA JU:lle: lopullinen sha (uusin juoksupeli-202 = 8a7d84932, rimpuilu 10; jos ehdit mittarit ennen vuoroa, uusi sha) ja ajatko videot itse.
   Skenaario: ☰ › Pelit › Keskeneräiset › "Juoksupeli: Rata v4" ja "Juoksupeli: Rata 1"; QA `ui juoksupeli botti 1`, `ui juoksupeli v4`,
   `ui juoksupeli rata1`; video ~40 s kummastakin → PT:lle (KK). Todennäköiset hiottavat: kamera seinien läpi, materiaalien sävyt, vartijat.

## SITOVAT LINJAUKSET (omistaja 19.10. 09.10 vahvisti KK:n juoksupeliehdotukset; PT 09.1x)
Spurttiviitta tason 1 lopussa; tason 2 reitit (maa ja katot) kohtaavat porteilla/pihoilla, kattoreitti nopeampi mutta riskialttiimpi; viitta-energiaa
myös huoneista; ovi maahan joka huoneesta (ei umpikujia); katot piilotetaan pelissä (huoneet näkyvät ylhäältä, ei muutosta Codexin malleihin);
yläreitti seinien harjoja ja tukipalkkeja pitkin, hypyt talolta toiselle ja alas huoneisiin aarteille; viitta-energiassa aina varanto yhteen
alashyppyyn; paperilohikäärmeet keinuvat narussa tavallista hyppyä korkeammalla; ELINVOIMA alusta, kuluu hitaasti, nopeammin kiinni ollessa
ja kulttuuriaarteen rikkoutuessa, loppuu → alusta (tason 2 saavuttanut tasolta 2); HERKKUOMENA (punainen kiiltävä) elinvoimaa heti, MÄTÄ
OMENA (ruskea, kärpäsparvi) heittoon, osuma horjauttaa vartijan; lajit erottuvat yhdellä silmäyksellä; värähdys per rimpuilunapautus.
Grafiikka ja mallit VAIN Codexilta (PT tilaa); sillä välin harmaat paikkamerkit.

## TILA (kaikki tarkista.sh 0)
- **Juna 204** proto pelikoodari/iss-c2-204 (wt/proto-pelikoodari-iss-nopeus-204), NS:lle uusin **71d9f6c43**: B6/B7 testit 58cabb404, C2 8cdc917af,
  B2 Peruuta 9a8e797ec, C4 d2c30b96e, iPad-vipu 7d74a47a5 + SEIS-merkki a9513c71d, Mazatlán e1c172d79, Natal b467d2f6d, erillinen kuvauskamera
  ef189ffba (IssKameraKuva.NayttoElaa; NUI tekee 3 rivin muutoksen NS:n yhdistämisen jälkeen), paikat.json/keskustat.json 71d9f6c43 (runko 204
  oli punainen: SkanneriKattavuusTestit). HUOM: NE:ssä Natal ja Mazatlán nyt kahdesti lähekkäin (oikea rivi + korjattu virherivi) → jos kupolissa
  tuplanimi, poista virherivit paikat.json:sta. Peruuta-koukku d1fcf02d6 HYLÄTTY (NUI bcd63d8e9 käytössä).
- **Juoksupeli** proto pelikoodari/juoksupeli-202 (wt/proto-pelikoodari-juoksupeli-202), uusin **8a7d84932**: hahmot dd7009250 (ämpärissä
  juoksupeli/hahmot-v1), rata 1 57f0f0afe + pidennys e04149615 (jää sellaisenaan), Rata v4 572d4eb97 (maailma ämpärissä juoksupeli/maailma-v4),
  tasot 5316efacc, elinvoima/omenat/energia/lohikäärmeet 84357cae9, rimpuilu 10 8a7d84932. Peli-testit 624/624 (JuoksuV4Testit 7/7).
- Mazatlán/Natal-työkalut: scratchpad korkeus.py / viivat.py (menetelmä kommentissa e1c172d79); docs main #4902, #4903 mergetty.

## AVOIN / ODOTTAA
- Codex: kattoreitti tilattu (f1d6365fc: harjat/palkit, 2–3 nousu-/paluukohtaa, liidon laskeutumiset, paperilohikäärmeet) → tason 2 rinnakkaisreitti
  maa vs. katot (JuoksuV4Reitti: nyt yksi reitti; tarvitaan valintasolmut). Esteiden mallit + Puyin tarttumisliike odottavat KK:n linjaa.
- Codexin este-yhteenveto ei saapunut; esteet (hyppy, liuku, väistö = rikkoutuva kulttuuriaarre, yläpuomi + allas) on koodattu.
- Worktreet: ei poistettavaa ennen junan 204 mergeä (Postivahdille kerrottu).

## LISÄYS 09.3x (PT, omistaja 09.14/09.19; sitovat)
- Lohikäärmevärit VAHVISTETTU: punainen yleinen = +1/3 viitta-energiaa, keisarillisen keltainen harvinainen = energia täyteen (kohta 2 yllä).
- HERKKUOMENA = +1/10 elinvoimaa (nyt HerkkuLisa 25 → ElinvoimaMax/10). Uusi harvinainen JADE-esine (ehdotus jadeinen pitkäikäisyyden persikka,
  omistajan vahvistus tulossa) = täysi elinvoima.
- RIKKOUTUVAT ESINEET paljon (1. erä 40): rikkominen vie elinvoimaa ja Puyi HUUDAHTAA esineestä; useita repliikkejä per esine, sama repliikki
  ei toistu peräkkäin samasta esineestä. Tee DATAPOHJAINEN esineluettelo (json: id, nimi, repliikit[], elinvoimahinta) + REPLIIKKIVALITSIN
  (puhdas, testattava: ei samaa kahdesti peräkkäin per esine). Nyt rikkoutuvat = Väistö-esteet (V4EsteLaji.Vaisto, AarreRikko 15);
  SK:n juoksupeli.rikkoutuva.<id>.* (5 kpl) pohjaksi.

## LISÄYS: KAMERAJOHTAJA (LS 19.10., PT: vasta Rata v4:n JÄLKEEN, ei nyt)
- Proto linssiseppa/kamerajohtaja-204 **8d7e1feab** (junassa 204). Rajapinta Ydin/Kamera/Kamerajohtaja.cs: Kamerajohtaja(KameraAsento) +
  Lisaa(Kisko | Orbit | Kaanto | Zoom | Paikallaan), joka ruutu Paivita(dt); esilataus Valmistele/Valmis.
- Kameraan VAIN KameraKirjoittaja.Aseta(camera, a, muunnos, liikkuu, "juoksupeli") (+ ruutuaikavahti > 20 ms).
- Pelaajan perässä -kamera → pyydä LS:ltä jousiseuranta (Liikepohja.Jousi) johtajaan.
- Vahti tyokalut/kameravahti.py (tarkista.sh): Juoksupelin suorat camera.transform-kirjoitukset (1 tiedosto lähtötasossa) vain vähenevät;
  siirron jälkeen --kirjaa. CI: liikkeet KameraliikeTestit.cs:ään (Kameratarkastus → Oleta.Tosi(r.Ok)).
- Malli: MuseoKierros.Ovensuu.cs (35067491f). Kysymykset LS:lle.

## LISÄYS: MUISTOKUPLA (PT, omistaja 09.2x; sitova, Rata v4)
- Esineen rikkoutuessa ruudun yläkulmaan 2–3 s muistokupla: esine EHJÄNÄ riemastuneen opettajan/hovin ihmisen kädessä + Puyin huudahdus
  samaan aikaan (repliikkivalitsimesta); juoksu EI pysähdy. Kuvat Codexilta 1 per esine (esineluettelon json: kenttä kuva), sillä välin
  harmaa paikkamerkki.
- UI-POHJA LÖYTYY (ei omistajan kysymystä): KUVANOSTO, OpasKuvanosto.cs (UI/Linssit): mk-nosto mk-nosto--kuvanosto + kuvakehys
  mk-nosto__kuvakehys--nyky + mk-nosto__kuvateksti (huudahdus), siirtymät Tyylikirja.Kesto.Avaus, pieni kuva reunaan ylänappien alle
  (KuvanostoAsettelu.Pieni). Juoksupelissä ilman napautusta (ei suurennusta), ajastin 2,5 s; uusi rikkoutuminen vaihtaa kuvan.

## TILA 09.3x (uudelleenaloitus Postivahdin viestistä; ENSIN-kohdat 1–3 TEHTY)
- juoksupeli-202 uusin **da1f9bd84**: mittarit + rimpuilunappi + värähdys d587d34b3 (JuoksuMittarit, MatkakirjaHaptiikka_Napautus),
  lohikäärmelajit (LohikaarmeLaji.Vari) + herkku 1/10 + jade (osa 35), SK:n tekstit 8c3932562 (tekstit.fi.json; SK:lle kuitattu),
  esineet.json + RepliikkiValitsin + muistokupla da1f9bd84 (QA `ui juoksupeli kupla [n]`). tarkista.sh 0, Peli-testit 626/626.
- PT:n tarkennus: kuplan ALLA oma raita dynastia + vuosi → mk-nosto__lahde-rivi (JuoksuEsine.Alarivi).
- SK: esineluettelon muoto lähetetty, odottaa 40 esinettä + huudahdukset (nyt 5 paikkamerkein) → kopioi protoon.
- JU: simuvuoro ~10.15 sha da1f9bd84, PK ajaa videot itse (skenaario kohdassa 4) → PT (KK).
- Jäljellä: kerättävien aarteiden paikat tasolla 2 (odottaa Codexin yläreittiä), Kamerajohtaja Rata v4:n jälkeen.

## TILA 09.37 (korvaa edellisen sha:n)
- juoksupeli-202 uusin **d752eda14**: SK:n 40 rikkoutuvaa + jadepersikka (main 4c52f68d9 + 956001ae2) yhdistetty tekstit.fi.json:iin
  (353 avainta); JuoksuEsineet.Lue lukee luettelon suoraan avaimista (esineet.json poistettu). Kuplan KUVATEKSTI = .ajoitus (omistaja 09.2x,
  PT 09.3x); huudahdus = ÄÄNI (ei tekstinä; äänet odottavat omistajan lupaa, nyt RikkoRepliikki vain lokiin). Kuvat Codexilta polkuun
  Resources/JuoksuV4/esineet/<id> (.kupla = kuvaus Codexille). Jadepersikan poiminta.1–2 (Puyin repliikit) samoin ääntä odottamassa.
- Simuvuoro siirtyi ~10.40 (JU), käännös d752eda14; PK ajaa videot → PT.
- 09.38: juoksupeli-202 uusin **d09b61e98** (SK:n päivitetyt avaimet f1c54a8d2: huudot ≤ 39, .dynastia/.vuosi; kuvateksti "dynastia · vuosi").
  JU:lle lähetetty simuvuoroon ~10.40 (d752eda14 kelpaa, jos uusi ei ehdi).
- 09.44: **dfae35317** muistokupla = Codexin valokuva + YHTEINEN soikea häivytys (MuistokuplaSoikio.shader, Blit → RT 512; omistaja 09.37, PT 09.4x),
  pystysoikio 0,42 × 0,5, Sisa 0,7; kuvat Resources/JuoksuV4/esineet/<id>.png (alfa 255; tuonnissa maxTextureSize 512); dynastia · vuosi paperiraidalla.
  Esikatselu proto-3d/_tyo/pelikoodari/muistokupla/soikio-luonnokset.png (+ maski-esikatselu.py). JU:lle viimeinen vaihto simuvuoroon ~10.40.
- 09.47: **6bc0bc555** esineen 1. rikkominen juoksussa = oma huuto + kupla, toisto = yleishuuto (juoksupeli.yleishuuto.<n>, SK tekee ~30) ilman kuplaa;
  kuvateksti nimi · dynastia · vuosi; SK:n korjaukset 5e4364738 (huuto_aani.N = ääniversio, käyttöön kun äänet sallitaan). Simuvideot dfae35317:sta (JU kääntää).
- 09.5x: **6bf405002** kameravahti (juna 204 -runko 1e77ee4cc, NS): JuoksuV4Maailma.cs:n 2 kameran kirjoitusta // kamerapoikkeus (Kamerajohtajaan Rata v4:n jälkeen).
  NS:n juna 204 sisältää juoksupelin; uusi sha PT:lle ja NS:lle. Simuvuoro ~11.05 (JU), app 897ae0f69 = dfae35317.
- TYÖLISTA (PT 09.5x): HETI Rata v4:n jälkeen JuoksuV4Maailma.cs:n 2 kameran kirjoitusta Kamerajohtajaan (jousiseuranta LS:ltä) → kamerapoikkeukset pois;
  vaatii juoksupeli-202:een Kamerajohtajan (runko 4dfcadcc0 / LS 8d7e1feab, base 2ba609861).

## TILA 10.05 (PT:n odotuserä tehty)
- UUSI HAARA pelikoodari/juoksupeli-kamera-204 (wt/proto-pelikoodari-juoksupeli-kamera-204) = runko 4dfcadcc0 + juoksupeli 6bf405002, uusin **3da1369de**:
  5a86ac666 kamera KameraKirjoittaja.Aseta (kamerapoikkeukset pois, kameravahti ok); 3da1369de esteet ankkuri + paikkamalli (EsteMallit, Codexin glb
  vaihtuu itsestään), Puyin hang_grab/hang_loop, yleishuuto.1–30 tyhjinä. tarkista.sh rc 0, 629/629. JUNAAN VASTA SIMUN JÄLKEEN (PT → NS).
- Codexin mallisopimus: proto-3d/_tyo/pelikoodari/juoksupeli/ESTEMALLIT-CODEXILLE.md (PT välittää).
- Jatkotyö tähän haaraan (juoksupeli-202 = videohaara, app 897ae0f69 = dfae35317). Simu ~11.05 → videot PT:lle.
- 10.10: juoksupeli-kamera-204 uusin **26a6cff3e**: f03ffa397 unenomainen muistokupla (aalto 0,4 s tulo/lähtö, tyyni 2,1 s, leveä häivytys, musta 0,06,
  rae 0,045; MuistokuplaAjoitus) – ODOTTAA PT/KK:n hyväksyntää (esikatselu _tyo/pelikoodari/muistokupla/kupla-unenomainen.mp4 + -arkki.png);
  bd71ba510 SK:n 51 esinettä + 30 yleishuutoa (26d55c8a5). tarkista.sh rc 0, 630/630. Huutoraja testissä ≤ 60 (ääni); SK:lle 40 merkin huuto.
- 10.14: **b1587311e** tason 2 aarteet (10 harmaata, Aarrepaikat osat 26–37, SK:n nimet JuoksuEsineet.Aarteet); 72c2805e1 SK 31e967343.
  ODOTTAA: KK/omistaja yhteisestä Tekstitys-asetuksesta (ehdotus: MuseoSovitin.TekstitysPaalla rattaaseen, huuto sen kaistaleelle) – ei toteuteta ennen vastausta.
- 10.29: **0956ff99f** laineilu 0,7 s (omistaja 10.2x) – ODOTTAA hyväksyntää (esikatselu muistokupla/kupla-laineilu-07.mp4); versiot (kupla, huuto):
  .versio.<n>.kupla/.huuto, kuva esineet/<id>-<n>; JuoksuVersio, RepliikkiValitsin.ValitseVersio, RikkoVersio → kupla.Nayta(e, versio).
- 10.43: **ef127330a** kääretaulu (V4EsteLaji.Kaaretaulu, osa 15, repeää aina, liuskat heiluvat; Codex: kaaretaulu/-revitty/-liuska.glb, sopimus ESTEMALLIT-CODEXILLE.md).
- TULEVA (omistaja 10.38): kun juoksupeli valmistuu Codexin grafiikalla → SIMUN KUVAKAAPPAUS (grafiikka, mittasuhteet, näkyvä alue) PT → KK → omistaja; ei videota.
- Odottaa yhä: uniefekti 0,7 s hyväksyntä, tekstityskysymys (KK).
