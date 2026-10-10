# Linssiseppä 2 – luovutus 10.10.2026 iltapäivä (päivitetty 17.0x)

Rooli, työkalut ja simu kuten edellisessä luovutuksessa (viesti-linssiseppa2-luovutus-20261010-paiva.md, alkuosa). PT = PÄÄTOIMITTAJA (Opus, max).
Skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/`, arkit `docs/raportit/kaappaukset/linssiseppa2-177-20261010/`.

## TILA 16.1x
- **ISS-KUPOLA** (haara `linssiseppa2/cupola3d-koe`, wt/proto-linssiseppa2-muisti): b04026ad3 float-korjaus (huone + overlay origossa,
  kierto peruskamerasta), 7520ccbaf klassinen näkymä (silmä 1,45 m, KenttaSivuikkunoilla), 503682973 hyttivalo 0,9 / 4 m. unity 0, L 1307/1307.
  Appi `lokit/linssiseppa2-app-cupola-5036829`, ajo vuoro-cupola5.sh. Arkki iss-kupola-klassinen.jpg. PT 16.1x: NYKYINEN KUVA JÄÄ (puitteet peittävät Maan, oliivinharmaa sisätila vaatimattomampi);
  ei iPad-mittausta eikä omistajalle; haara talteen.
- **PEKING v3** (LR) paketti `_tyo/linssiseppa2/peking3/ktx` (portti 0) = peking-maa.py (oma maa + VESIKAIVANTO: maa vesimaskin kohdalla
  vesitaso − 1 m) + omat_mallit_tileset + ktx2 + **peking_helma** (peking-helma.py + peking-helma-tileset.py, peking1h/): Googlen leikkausaukko
  ulottuu N/E-reunoilla 0,0006° lähellä ja > 250 m kaukaa → helma vain N/E, 400 m, −0,3 → −4 m (15 m) → −10 m (400 m), rakennuspohjat
  kaupunkimaan värillä. Arkit peking-v3-vs-google, peking-sauma-helma, peking-v3-vesi-helma400. VEDEN VÄRI (PT 16.1x: tee): Pekingillä ei vari-v1-
  merkintää → oletussävy (vallihauta 6/16/25 vs oikea 54/80/68). Koodi haaralla linssiseppa2/peking-vesivari efc88563c (masterin 3d0c8c4a7
  päällä, L 1307/1307, unity 0): Vedet peking = vallihauta, Beihai; Tunniste x < −480 m → järvet. Karttaseppä vie vedet.peking vari-v1:een
  (pyydetty 16.2x). Sitten käännös (pyydetty Julkaisijalta) + vuoro-peking3c.sh-malli → pari PT:lle → SHA Natiivisepälle junaan.
- **ND**: v4d hylätty (omistaja), v5 (v6k13) liian kirkas → **v5b paketti nd3/v6k14** (= v6k9 + v5b, portti 0; mallit.jsonin ND-tekijään lisätty
  "länsijulkisivun valokuva The wub 2025 (CC BY-SA 4.0)" — muista jokaiseen uuteen ND-pakettiin, nd3k-paketti.py ei lisää sitä). Arkki
  nd-v5b-edesta-ylha.jpg (4dc824ab5): julkisivu L 152–153 (oikea 147/158; mittaa-julkisivu.py), lyijy +6 % (mittaa-parvis.py). ODOTTAA
  omistajan päätöstä viennistä. Portaalit: kamera-vapaa 35 m ei toimi (kääntyy) → rajaus f40:stä (arkit-nd5b.py #PORTAALIT).
  Huom: opas kamera -komennon katseKorkeus on ellipsoidikorkeus (Pariisin maa ≈ 79 m).
- **JUNAAN 179 (PT kuittasi, SHA:t Natiivisepälle 17.0x)**: linssiseppa2/ilmakeha-kaikkialla d3885f6d1 (omistaja 16.4x: ilmakehä kaikissa
  kaupungeissa; arkki ilmakeha-kaupungit.jpg; PT:n huomio: Prahan etuala viilenee → säädä vain lähietäisyyttä, horisontti ennallaan) ja
  linssiseppa2/peking-vesivari efc88563c (kerroin 1; arkki peking-vesivari.jpg; vallihauta 14/35/33 vs orto 54/80/68).
- SEURAAVA: kun juna 179 käännetty (Natiiviseppä ilmoittaa), Peking-pari ilmakehä päällä (peking3/ktx + vesi, vuoro-peking3v.sh-malli,
  appi = junan 179 .app) vs Google-kaupunki (peking1-pariisi-kuvat) → PT arvioi, tarvitaanko Pekingille oma vesivärikerroin.
- Ateena ratkaistu ilmakehällä (omistaja 16.4x); oma vesi ei tarpeen.
