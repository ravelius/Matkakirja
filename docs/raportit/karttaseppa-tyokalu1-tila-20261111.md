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

## LISÄYS 21.3x (KK 21.05:n päätöksen toteutus)
Haara natiivi-backup `karttaseppa/tyokalu-1`: 196db31d4 (gzip + pelikaupungit.py), 960d485f0 (korkeuden varatie osm).
- OTTEET: 63 pelikaupunkia, 402 s, gzipattuina 891 Mt (raakana 4,2 Gt) → /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tyokalu-1/otteet-63/<id>/
  {osm,muut,puut,pisteet}.json.gz + ote.json (tavut, tavut_raaka). Tarkistus: kaikki 252 tiedostoa jäsentyvät, määrät = ote.json.
  Kirjoitus: peräkkäiset gzip-jäsenet puskureittain (gunzip, Python gzip ja zlib lukevat yhtenä tiedostona).
- KAUPUNKILISTA (pelikaupungit.py): pelin saapumispaikat = eurooppa.json 60 riviä + kokeilu.json 3 (Ateena, Pariisi, Tukholma) = 63.
  (eurooppa.json:n huomio-tekstissä "61 kaupunkia", mutta luettelossa on 60 riviä; Pariisi, Ateena ja Tukholma ovat kokeilu.json:ssa.)
  Keskipiste = saapumispiste, 16 × 16 km; aluerivit (alpit, lappi, sisilia, kreeta, islanti) samalla säännöllä.
  Pienimmät: Alpit 1 463 taloa, Andorra la Vella 6 537, Dubrovnik 7 543. Suurimmat: Pariisi 367 767, Lontoo 335 778, Dublin 317 182.
- LUKU: tee_palat.py ja vakiokuvat.py lukevat .json.gz:n suoraan (pakkaamaton ensin). Wienin vakiokuvat .gz-otteesta: Schneiderhangasse, Kiesewettergasse, Balderichgasse.
- KORKEUDEN VARATIE `korkeus.lahde = "osm"`: height → building:levels (·3,2 + 1, + 2,5 · roof:levels) → oletus 15 m (oletus_m); maa pelin maastosta z12 (maasto.py kuten Lontoo).
  Mittari korkeus_heikko_osuus (talot ilman height/levels); > 0,4 → tuloste "KORKEUSAINEISTO HEIKKO" (uusi-kaupunki pysähtyy).
- WIENIN KUIVA-AJO (otteet-3/wien, korkeus osm): 166 369 taloa, 424 palaa, 340 Mt, maa 156–488 m; korkeus: height 2 564, levels 49 504, oletus 114 196
  → heikko 0,687 → KORKEUSAINEISTO HEIKKO (odotetusti). Palat T/wien-palat (ei peliin).
- LONTOO uudelleen muutosten jälkeen: 242/242 palaa + indeksi tavulleen samat.
- EUBUCCO-SELVITYS: v0.2, 30 maata (EU-27 + UK, NO, CH), ~200 milj. rakennusta; korkeus kaikille, mutta 43 % mitattua, 57 % koneoppimisarviota.
  LISENSSI ODbL 1.0 (sama kuin OSM), poikkeukset Praha CC BY-SA 2.0 ja Abruzzo CC BY-NC 2.0 (suodatettavissa geometry_source-sarakkeella).
  → ODbL ei ole CC0/CC BY/PD → KK:n päätös. Ei kata: Balkanin EU:n ulkopuoliset maat, Ukraina, Turkki, Venäjä, Valko-Venäjä, Moldova, Islanti.
  Itävallan korkeuden lähdettä (mitattu vai arvio) ei selvinnyt dokumentaatiosta; tarkistettavissa lataamalla Wienin NUTS-alue (Parquet).
  Lähteet: https://docs.eubucco.com/latest/license/ , https://eubucco.com , https://docs.eubucco.com/latest/
- JÄLJELLÄ: uusi-kaupunki-ketju (ote → korkeudet → tee_palat → paketti → puut → mittarit + pysäyttävät tarkistukset); kaupunkitaulun (NS, kaupungit.json) luku, kun NS:n SHA tulee.
