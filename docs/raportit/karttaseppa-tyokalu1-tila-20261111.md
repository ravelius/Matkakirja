# Karttaseppä: työkalu 1, tila 11.11.2026 klo 21.01

Haara natiivi-backup `karttaseppa/tyokalu-1` (juna-224:n päällä), commitit f32f976a6 ja 203231d1c. Vain tiedostoja kansiossa `tyokalut/kaupunki/`, ei pelikoodia.
Työkansio /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tyokalu-1 (T).

## 1. Yhteinen talokone `tee_palat.py` + `kaupungit-talot.json`
- Pohjana Pariisin tee-palat.py (NS) ja Lontoon kopion lisäykset (EA LiDAR, maa pelin maastosta, puut palaan). Kaupunkikohtainen tieto tulee kaupungin riviltä
  (`KAUPUNKI=<id>`): raja, nähtävyysmaskit (Pariisin vanha syöte), ohjelmakohteet, korkeuslähde (ign / ea-lidar), puut, oletussyötteet. Koodissa ei ole "jos pariisi" -haaraa.
- NÄYTTÖ (b) tavulleen sama:
  - LONTOO: 242/242 palaa + indeksi.txt = palat-d7-kumpu-oikea (pelin Lontoo, lontoo.json "lahde"). Mittareissa ero vain uusi avain muoto_ennallaan.
  - PARIISI: v41-ketju (aja-palat-v41.sh: SC-pohja → ND-kääre → talokone) yhteisellä skriptillä: 219/219 palaa = ulos-v41 + ennallaan, loki sama.
    Pelin paketti palat-v41-pp: 218/219 sama. EROT LUETELTUNA: 1 pala, 15_16594_11273 (Invalidit): paketissa on Invalidien ajon ulos-in2 (v27) kopio,
    jota myöhemmät kokoamiset (vain muuttuneet palat) eivät vaihtaneet; koko kaupungin ajo antaa siitä uudemman version vanhalla ja uudella skriptillä samana.
    Eli ero ei tule skriptistä vaan siitä, että nykyinen paketti on koottu monesta ajosta.
- Kääreet (tee-talot-nd.py, tee-talot-sc-pohja.py, tee-talot-mm.py) toimivat yhteisen skriptin kanssa ennallaan (tekstikorvausten kohdat säilytetty); kokeessa
  polku vaihdettu kopioissa T/tee-talot-*-yhteinen.py (TEE_PALAT-ympäristömuuttuja).

## 2. Planeettaote `planeettaote.mjs`
- YKSI läpikäynti planeetasta (T7, 95,6 Gt) → kaupungeittain osm.json (talot, sama muoto kuin Pariisissa), muut.json (vesi, puistot, puurivit, kadut, uskonnolliset ja
  asemat ilman building-tagia), puut.json, pisteet.json (uskonnolliset, asemat, palatsit solmuina), ote.json (raja, määrät, tavut). 16 × 16 km keskustan ympäriltä.
- KOKO KOLMESTA KAUPUNGISTA (koeajo 242 s, 12 workeria, muisti 1,6 Gt): Lontoo 202 Mt (317 202 taloa), Pariisi 271 Mt (359 690), Wien 163 Mt (180 622).
  gzip pienentää noin 7× (Wienin osm.json 13,8 Mt). ARVIO kaikille 181 Suurkaupungit.json-kaupungille: noin 15–20 Gt JSONina, noin 3 Gt gzipattuna.
  Sisäisellä levyllä vapaata 39 Gt → EHDOTUS: otteet gzipattuina; kaupunkilista = Suurkaupungit.json (181) vai pienempi pelikaupunkien lista → KK päättää.
- Otteet: T/otteet-3/{lontoo,pariisi,wien}.

## 3. Vakiokuvat `vakiokuvat.py` → `vakiokuvat/vakiokuvat-{pariisi,lontoo}.json`
- 3 tavallista katua (residential/living_street/tertiary/unclassified, ≥ 80 m, ≥ 12 taloa 40 m:n säteellä, kaupungin sisempi 60 %, ≥ 1 km toisistaan), kamera kadun
  keskikohdassa kadun suuntaan, etäisyys 60 m. Siemen sha256(kaupungin id). "merkit" tyhjä, kunnes työkalu 2 tuottaa tyypitetyt.
- Pariisi: Rue de la Procession, Rue de Pommard, Rue Bouret. Lontoo: Alderney Street, Hicks Street, Lincoln Street. Wien (koe): Lindauergasse, Balderichgasse, Gaißmayrgasse.
- NUI:n komento "vakiokuva <i>" lukee nämä (kentät lat, lon, suunta_deg, etaisyys_m).

## Jäljellä työkalussa 1
- `uusi-kaupunki <id>` -komento ketjuksi (ote → korkeudet → tee_palat → talot_paketti → puut → mittariyhteenveto + pysäyttävät tarkistukset); Wienin kuiva-ajo
  (korkeuden varatiet: Wieniltä ei omaa aineistoa → OSM height / kerrokset / oletus, rivi "korkeusaineisto heikko" > 40 %), EUBUCCO-selvitys (kattavuus, lisenssi).
- tee_palat.py:hyn korkeuden varatiet yleisinä (nyt ign tai ea-lidar; muille kaupungeille lähde "osm" ja maa maastosta).
- Rivit siirretään NS:n kaupunkitauluun, kun se on olemassa.
