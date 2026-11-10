# Natiivisepän luovutus 10.11.2026 klo 14.35

Edellinen: -1405 (2636d7b2f, sis. -1342): käsitelty alla. Syy: kontekstivahti 27 % (7.37). Kansio Matkakirja-3d-selvittaja. Älä poista mitään.
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/, lokit /Users/Shared/Claude/proto-3d/lokit/. Repo proto-3d/Matkakirja-proto, remote natiivi-backup.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (ohje -1250: /opt/homebrew/bin/python3.14 …/natiiviseppa-skriptit/unity-julkaisut.py ILMAN -I:tä;
UUSI-rivit → PT "UNITY UUSI: …"). Vahti: Monitor `_tyo/natiiviseppa/ajovahti/vahti.sh` (britannia-ipad-*, tahdistus-1b*, kehys-pe-*, yksi-tarkkuus-a2*:
ALKOI/VALMIS/HILJAA >60 s/KAYNNISTYSVIKA) → LISÄÄ kuvioihin natiiviseppa-kertoja-esilataus-ipad-* ja tahdistus-1c, jos ajetaan.
Iso iPad toimii taas (JU 14.2x). JU:n jono (PT): KS I3 → PE ×4 → NUI → PK ×2 → britannia-2-kylma → kertoja-esilataus.
Asemataulu jäädytetty: hookin "päivitä junat.json" ohitetaan.

## 1. BRITANNIAN MAAKARTTA (-1405 kohta 0) – britannia-1 LUETTU: EI TOISTUNUT; KYLMÄ UUSINTA JONOSSA
- lokit/natiiviseppa-britannia-ipad-1-a2e334b2e: VARTIJA "saapuminen GBR valmis 7978 ms, aste 100 %"; matkalla karkeat ≤ 4 (omistajalla 4–10, ~30 > 10 s);
  B4 (3 s) ja B7 (55 s) täysikoon rajauksissa maa terävä, ei saumoja (JU sama B5:stä). Syy-ehdokas: laitteen laattavälimuisti lämmin (GBR levyllä).
- Ero omistajaan myös: iPad vaaka ja kauempaa; omistaja pysty (1668×2420) lähempää.
- AJO britannia-2-kylma: _tyo/natiiviseppa/britannia-saumat/ajopyynto-2.md + laheta-kylma/laatat-kylma.txt (Laattapalvelin.KylmaValimuisti: tyhjä
  välimuisti 1 istunto) → lokit/natiiviseppa-britannia-ipad-2-kylma. LUE: konsolissa "KYLMÄ välimuisti tälle istunnolle", VARTIJA GBR aste/aika,
  "matkaseuranta lontoo" karkeat/puuttuu, B4/B5/B7 täysikoossa. Toistuu → hypoteesi (a) kiire-jono / (b) z9 (-1405); korjaushaara
  /Users/Shared/Claude/wt/proto-selvittaja-britannia (natiiviseppa/britannia-saumat, ei committeja). Ei toistu → PT:lle "ei toistu kylmänäkään".
- PT tietää (14.3x).

## 2. TAHDISTUS-1b LUETTU; LISÄKORJAUS abf0d5328 (natiiviseppa/lento-tahdistus, wt proto-selvittaja-lentotahdistus)
- Kirjaus _tyo/natiiviseppa/lento-tahdistus/tulos-1b.md. A raketti: vuorottelu 16,7/25/33 ms (p50 22–25, p95 27–32). B pallo: 40 → 30 fps,
  33,2–33,5 ms, myöhässä 0. Lämpö Kuuma (30 fps:n katto) sotki B-raketin ja A-pallon.
- abf0d5328: pysähdyksen (> 3 × tavoite) jälkeen 15 ruutua ei lasketa (veden 5,3 s pysähdys laski pallon 30 → 24 loppulennoksi). 739/739, unity 0.
- AVOIN: uusinta tahdistus-1c abf0d5328:lla VIILEÄLLÄ iPadilla (puhdas A/B) → pari/luvut PT:lle; syy + versio KK:lle PT:n kautta. Ei junaan ilman paria.
- LÖYDÖS PT:lle annettu: "kaupunki: vesi: varadatan pilarireiät täytetty (… 5007 ms)" (6406b2f9d, junassa) = 5,3 s kuvan pysähdys pallokierroksessa.
  PT päättää tekijän; jos NS:lle: siirrä täyttö taustasäikeeseen / ruuduille.

## 3. KERTOJAN ESILATAUS – KOODATTU cbaaf1d34 (natiiviseppa/kertoja-esilataus, wt /Users/Shared/Claude/wt/proto-selvittaja-kertoja-esilataus, juna-224 dd21d2eee:n päällä)
- UI/KertojanEsilataus.cs (uusi) + UiNakymat (JoutilasKaupungissa) + Puhe.EsilataaValmis: joutilaana kaupungissa kohdekartan nähtävyysjuttujen
  (Nahtavyysarkki.JutunLuettavat) ja kadonneiden ihmeiden (Nostokortti.LuennanTekstit) 1. ja 2. palan VALMIIT mp3:t levylle, Taso.TamaKaupunki
  (väistää laattakiirettä). Ei palavirtaa. Loki "MATKAKIRJA kertojan esilataus: <kaupunki> jutut N, kadonneet M: esiladataan, levyllä, ei valmista".
  Yhteyden lämmitystä EI tehty (manifesti haetaan jo käynnistyksessä samalta palvelimelta) – lisää, jos mittaus näyttää kylmän ensihaun.
- AJO JU:n jonon lopussa: _tyo/natiiviseppa/kertoja-viive/ajopyynto-2.md + sk-kertoja-esilataus-ipad.txt (90 s lepo, Riemukaari, Invalidit, Notre-Dame)
  → lokit/natiiviseppa-kertoja-esilataus-ipad-1. LUE: esilatausrivi + "puhe: alkoi X ms (välimuisti)" (vertailu kertoja-viive-1 Louvre 5263 ms verkko).
  Hyvä → PT:lle sha junaan.

## 4. MUUT
- iss-ipad-1 (941dd597f): signal 15 klo 14.18.13 ulkoinen (ei poikkeusta/muistivaroitusta), JU:lle kuitattu: ei uusintaa (tahdistus korvaa).
- PdG ennen/jälkeen -ajot katkesivat JU:n käynnistystestiin; JU ajaa uudelleen (OC2). -1342 kohdat 2 (panorointi PE, JU:n jonossa), 5 (yksi tarkkuus a2) ennallaan.
- NN-sarja (muistikatto pariisi ×3 + lontoo ×3, f08387e78) yhä lukematta; tarkista PT:ltä, kenen tehtävä (ei -1342:ssa).

## VIESTIT TÄLLÄ VUOROLLA
PT: aloitus+esilataus (14.21), britannia-1 (14.3x), tahdistus-1b + vesilöydös (14.35). JU: ajopyynnöt kertoja-esilataus, britannia-2-kylma (kuitattu), iss-ipad-1 vastaus.

## LISÄYS 14.4x (PT 14.3x)
- Tahdistus KUITATTU: MR JU:lle natiiviseppa/lento-tahdistus abf0d5328 → juna-224 (puhdas; tuo myös 50bab43fc, af969f31a, 941dd597f – PT:lle kerrottu,
  voi estää 941dd597f:n). Uutta: "Raketin ja kuumailmapallon lento etenee tasaisesti ilman edestakaista zoomausta." Syy + versio PT:lle KK:ta varten. Kohdan 2 1c-uusinta ei enää ehto.
- Veden pilarireikien täyttö → Valoseppä (PT). Panorointi (PE ×4, -1342 kohta 2) seuraajalle: lue PE-ajot kun JU ajaa (vahdin kuvio kehys-pe-*).
- 14.5x PT: "junaan vain tahdistus" → PUHDAS HAARA natiiviseppa/lento-tahdistus-puhdas d834e0623 (wt /Users/Shared/Claude/wt/proto-selvittaja-tahdistus-puhdas;
  juna-224 6087868bf + af969f31a-kello (välttämätön: RakettiLaukaisu.Kello) + 06ac958d1 + abf0d5328; 739/739, unity 0). Pois 50bab43fc, 941dd597f.
  MR19 korvaus JU:lle ja PT:lle lähetetty (jonossa). Odottaa PT:n pt-okia; tarkista JU:lta, että MR19 = d834e0623.
- 15.06 JU: PE 4444e211a ja 0421af91a kaatuivat 5/5 käynnistystä error 22 (0 kuvaa; myös 13.18/13.20), muut käännökset käynnistyvät → epäily PE-appit
  (allekirjoitus/._-tiedostot): NS ehdotti codesign --verify ja uudelleenkäännöstä. Uusinnat peruttu; seuraaja: varmista JU:lta PE:n uusi käännös + ajo.
  Ajovahti pysäytetty (toisti HILJAA-rivejä): käynnistä uudelleen seuraajana.
- 15.10 JU: 0421af91a allekirjoitus rikki (153 ._-tiedostoa) → dot_clean, --strict ok; 4444e211a allekirjoitus kunnossa, error 22 syy auki.
  PK7:n jälkeen JU ajaa 0421 + 4444 + (NS:n pyyntö, PT 15.0x) sama PE-skenaario nykyisellä juna-224-käännöksellä → lokit/natiiviseppa-kehys-pe-juna224-1
  (korvaa 4444:n, jos se kaatuu). SEURAAJA LUKEE: lue.py/ikkunat.py _tyo/natiiviseppa/vieritys-pe/ (ohje -1250 LISÄYS kohta 2; -1342 kohta 2).
- 16.3x PT: SAMA VIKA EPÄILTY MARSEILLESSA (NUI lokit/nui-kaupunkinimi-zoomaus-2-ipad-fb16ab5de-u): pallo 57,9 % 20 s, elävä kartta 0 → ota
  britannia-2-kylma-analyysiin; syy KK:lle samassa viestissä Britannian kanssa (PT:n kautta).
  NS:n ensikatsaus (VARTIJA-rivit): "katto 20007 ms, aste 57,9 %, palvelin käynnissä 27 (kohde 0, kiire 9, tausta 0, saapuminen 0) jono 26 … nälkä163b 35"
  ja aiemmin "käynnissä 16 (kohde 0, kiire 0, tausta 0, saapuminen 0) … nälkä163b 30". Käynnissä-luku ≫ luokkien summa = VUOTAVAT PAIKAT? (paikat varattuina
  ilman luokkaa → jono 26 odottaa). Britannia-1 (onnistui): käynnissä 13 (kiire 9), nälkä 4. Tarkista Laattapalvelin: käynnissä-laskurin vapautus
  (keskeytys/aikaraja/peruminen) ja nälkä163b-merkitys; vertaa omistajan 9d5be8823-lokin "palvelin käynnissä 20 (kiire 20)".
