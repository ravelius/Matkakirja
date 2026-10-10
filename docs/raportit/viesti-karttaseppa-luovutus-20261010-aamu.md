# Karttasepän luovutus 10.10.2026 aamu (noin 08.45, PT:n nollausraja 50 %)

Edellinen luovutus on `viesti-karttaseppa-luovutus-20261009-ilta.md`, jonka osio 4 on yön lokina. Tässä tiedostossa on vain voimassa oleva tila.

## 1. Ajossa / odottaa

- **Ei GPU-ajoja käynnissä.** ComfyUI PID 12915 (127.0.0.1:8189, T7) on joutilaana ja /free tehty. Sammutus vaatii killin, joten se tehdään vain omistajan luvalla.
- **Kone vapaa ma 12.10. asti** (muisti `kone-vapaa-ma-12-10`): nice 15, paistot yksi kerrallaan, ennen ti 13.10. aamua GUI-ajot pois.
- **Odottaa omistajaa:** Geotorget-tunnus (`LM_GEOTORGET_USER/PASS` tiedostoon `~/.matkakirja-avaimet-koodaus.zsh`). Sen jälkeen Tukholman maanpinta Lantmäteriet Markhöjdmodellista (CC0) → `maa-tukholma-lahi.png` 4 m (LS1 haluaa, koska GLO:n kadut ovat heikkoja) sekä Ortofoto/Laserdata. KL:n materiaalikäsittely odottaa omistajan v6j-päätöstä: ÄLÄ aloita.

## 2. Tekoälypinnat (T7 `/Volumes/T7 4TB/Matkakirja-karttaseppa/tekoalypinnat/`)

- **Työkalut:** `aja-nakymat.py <malli> <näkymät> <tunniste>` (mallit notre-dame, kuninkaanlinna, riddarholmen, prefektuuri, concorde, stadshuset; kehotteet, kiellot ja tile tunnisteen mukaan), `palat.py` (LR:n tekoaly_palat + --tile-voima/--palakansio), `aja-olavinlinna.py <n,…> <tunniste>` (seinät 1–16, s6 = katot paloina), `pinta.py` (STOP_NYT = yhteistoiminnallinen pysäytys), `savy2.py` (kylläisyys + keskiarvo), `luokkasavy.py` (sävy luokittain luokat.png:llä), `rh-v3.py`. Tauko: `touch STOP` (mallien välissä) tai `touch STOP_NYT` (heti).
- **Ohjauskuvat omille malleille:** `proto-3d/_tyo/karttaseppa/ohje-riddarholmen/ortho_ohje.py` (LR:n kopio + mallit rh, pp, co, sh; `ortho_ohje.diff`), kansiot `codex-ohje{,-pp,-co,-sh}/`. Merkinnät ja syötteet LR:n työkaluilla muuttamattomina. Näkymän nimi spiira on pakollinen torneille, koska ortho_merkinnat tuntee sen. **Kaava:** diff ja polku LR:lle → LR:n OK-rivi → vasta sitten GPU.
- **Toimitettu LR:lle (projisoitu, ellei toisin mainita):** ND v3, KL v2, Riddarholmen v3, Préfecture v1, Concorden obeliski v2, Stadshuset v1s (+ **lansi v2s**, toimitettu 08.24, projisointi LR:llä), Olavinlinnan seinät 1–5, s5 v3b, s7–s10, s11 v2t, kallio s12/s14/s16 v1s ja katot s6 v4s.
- **Opit:** vaalea pohja + tile 0,3 vaalentaa tiiltä → tile 0,15. Tummat tai kirkkaat sävyt korjataan jälkikäteen luokkasävyllä LR:n tavoitearvoihin. img2img-uusinnat (denoise 0,5–0,7) tuottivat HDR-mäisen tuloksen, jolloin v1:n väri + uusinnan luminanssin ylipäästö (s5 v3b) toimi.

## 3. Data LS1:lle ja LS2:lle (kaikki `proto-3d/_tyo/karttaseppa/`)

| Aineisto | Kansio | Tila |
|---|---|---|
| Yövalot (katuvalot, valaistut tiet ja kohteet, rantavalot) | `yovalot-20261010/` | LS1 |
| Ikkunavalot 1536², 8 m (R = osuus, G = K) | `yovalot-20261010/yovalot-ikkunat-<id>.png` | LS1 kytki (ikkunavalot-175) |
| Maanpinta 4 m (Pariisi IGN MNT, Tukholma GLO ilman rakennuksia) | `maa-20261010/` | **ämpärissä** kartta/korkeus/v1 (vain Pariisi) |
| Kadut ajosuuntineen | `kadut-20261010/` | LS1 (seuraaja kytkee) |
| Utu (aerosoli) 8 settiä | `ilmakeha-aerosoli-20261009/` | **ämpärissä** ilmakeha/aerosoli-v1 |
| Pilvet (METAR, pohja, peitto, matala, paksuusarvio) | `pilvet-kaudet-20261010/` | **ämpärissä** ilmakeha/pilvet-v1 |
| Veden väri ja sameus (S2, SWIR-korjattu) | `vesivari-20261010/` | **ämpärissä** vesi/vari-v1 |
| Strömmen–Norrström-aluenosto (index-v6, tukholma5) | `vesi-aluenosto-20261010/` | LS2:n haara vesi-v6-174. Vienti LS2:n kuvaparin jälkeen (paketti tehdään silloin, LAHTEET pohjana v5) |
| Olavinlinnan veden väri | `vesivari-olavinlinna-20261010/` | LR:lle ja LS2:lle 08.4x, ei ämpärissä (vienti LS2:n pyynnöstä) |

- **Työkalut** (T7 `vesimaski/`): `yovalot.mjs`, `yovalot-rikasta.py`, `rakennusvalot.mjs`/`.py`, `kadut.mjs`, `korkeus-maa.mjs`, `aluenosto.py`, `vesivari.mjs` (+ argumentti `olavinlinna`), `vesivari-kaudet.py`. T7 `pilvet-metar/pilvet-kaudet.py`.
- **Toiveet seuraaviin:** LS2 haluaa vesiverkon seuraavaan versioon palaan vesi-tunnisteen (Seine/Mälaren/Saltsjön, raja Slussenissa). Kaukomaata (S2 v1p/yo-v1p) ei kytketä (PT B), ja tiedostot jäivät ämpäriin.

## 4. Viimeinen erä

- Olavinlinnan veden väri: `vesivari.mjs … olavinlinna` (Kyrönsalmi 2 kohtaa, Haapavesi, Pihlajavesi; talven jää suodatetaan sinisen < 0,002 perusteella) → `vesivari-kaudet.py` → `_tyo/karttaseppa/vesivari-olavinlinna-20261010/`. **VALMIS 08.41:** suositus Kyrönsalmi kesä (syvä 0,001/0,003/0,005, 0,9 FNU). Talvi on jäätä, ja Haapavesi osui maalle (1 kuva), joten sitä ei käytetä. Toimitettu LR:lle ja LS2:lle.
- **ALUENOSTON LAAJENNUS (09.0x, LS2 c2d26ff51: Strömmen–Skeppsholmen 420 m musta Blasieholmen/Nybroviken):** `_tyo/karttaseppa/vesi-aluenosto-20261010b/` vertailupari `index-v7a.json` (tukholma6a, uudet alueet yhteensä 2,0 m) ja `index-v7b.json` (tukholma6b, 3,0 m). Uudet alueet Blasieholmen–Skeppsholmsbron ja Nybroviken–Skeppsholmen–Djurgården, Norrström/Strömmen ennallaan (päällekkäin suurempi). Työkalu T7 `vesimaski/aluenosto2.py` purkaa syötteen vanhan aluenoston ennen uutta (Δ 0 → v6 bitilleen). Googlen laattoja ei mitattu (PT:n linjaus), tasot LS2:n 0,4/1,5/3 m -parin mukaan. Odottaa LS2:n kuvaparia → valittu versio vientiin.
- **VESISTÖTUNNISTE (09.4x, LS2:n toive):** `_tyo/karttaseppa/vesi-vesistot-20261010/` (LUEMINUT.md, koe-tukholma-6/16/48m, koe-pariisi-6/16m, tarkistuskuvat). `pala.vesi` Mälaren/Saltsjön/muu tai Seine/muu, sekapalat jaettu (sama karjet, oma indeksit), kärjet ennallaan ja yhteensopiva vanhan lukijan kanssa. Rajat: Riksbron, Slussen, Hammarby sluss, Södertälje. Työkalu T7 `vesimaski/vesistot.py` (rasteritäyttö, lisäsiemenet, `--viite` 48m). Vientivaiheessa ajetaan LS2:n valitseman v7a/v7b:n päälle (+ pariisi5 = pariisi4 + tunniste). HUOM: Homebrew-python3:sta puuttuu numpy, joten aja `_tyo/venv-kohdistus/bin/python` + `PYTHONPATH=/opt/homebrew/lib/python3.14/site-packages` (PIL).
- **VESI v7 VALMIINA (09.5x):** LS2 kuittasi yhteisviennin (valittu v7 + vesistötunniste + pariisi5). Molemmat vaihtoehdot ovat tunnisteineen valmiina ja eheystarkistettuina kansiossa `_tyo/karttaseppa/vesi-v7-valmis-20261010/`. Kun LS2 on valinnut, aja `"/Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski/paketoi-vesi-v7.sh" a|b` → `_valmiit/vesi-v7-vienti-20261010/` (tukholma6, pariisi5, index-v7.json, LAHTEET.md, SHA256SUMS; koeajettu). Nimet ovat vapaina ämpärissä (404 klo 09.5x). Vienti Julkaisijalle (vie-paketti.sh), muutosloki junan mukana.
- **PEKING (09.3x–09.5x, PT: omistajan päätös koekaupungista):** LR:n paketti `_tyo/karttaseppa/peking-20261010/lr/` (LUEMINUT.md). Mukana Kielletyn kaupungin 405 nimettyä rakennusta + 1 086 osaa (korkeudet, räystäät, kattomuodot, värit) ENU:ssa (origo Taihedian OSM:stä 39.915896/116.390814), kaikki rakennukset 15 503 (OSM 5 188 + 3D-GloBFP-täydennys 10 315), muurit, OSM-ote ja maasto 5 m (GLO-30 → maa, kuopat ja rakennusjäänteet korjattu, mäet suojattu). Korkeuslähde 3D-GloBFP (CC BY 4.0) säännöllä: ≥ 28 m raakana, pohja < 1 000 m² → 4,5 m, muuten 0,8 ×; Kielletyssä kaupungissa raakana. Sijainti tarkistettu Sentinel-2:ta vasten (2 m). ANSA: muistista otettu 116,397 E on GCJ-02; oikea WGS84 on 116,3908 (korjattu ennen toimitusta). Työkalut T7 `peking/` + oma Python-ympäristö T7 `venv-kartta` (numpy, Pillow, pyshp, shapely, scipy, pyproj).
- **SEURAAVA ERÄ (10.10. 10.0x, PT:n pyyntö: kehityskaupunkien suurin näkyvä vaikutus):** Suositus PT:lle: Tukholman maanpinta 1 m Lantmäterietin avoimesta STAC-katalogista `https://api.lantmateriet.se/stac-hojd/v1` (kokoelma `dtm-cog` Markhöjdmodell, CC BY 4.0, EPSG:5845 = SWEREF99 TM + RH2000, 10 × 10 km COG-ruudut, esim. 658_67 ja 657_67 keskustassa; haku POST /search bbox). Metatiedot (info.json) ovat avoimia, mutta datatiedostot (dl1.lantmateriet.se/hojd/data/…) palauttavat 401 → vaatii Geotorget-tunnuksen (omistaja). Tunnuksen jälkeen: lataus → RH2000 → ellipsoidi (SWEN17) → `maa-tukholma-lahi.png` 4 m samaan muotoon kuin Pariisi (kartta/korkeus/v1) → LS1. Odottaessa ei omaa erää. Muut kehityskaupunkilistan kohdat ovat LS1:llä tai LS2:lla tai valmiita (yövalot vaihe 2 ja Pariisin kanavakorjaus tehty, työjonon merkinnät vanhoja). Tähtitaivasta ei ole natiivissa, mutta katse ei nouse horisontin yläpuolelle, joten vaikutus pieni.
- **PEKING LS2 (10.10. 10.1x–11.0x, PT:n jono 1):** `_tyo/karttaseppa/peking-20261010/ls2/` (LUEMINUT.md) LR:n rajaukseen x −1100…+1100, y −1750…+1250 (+50 m; PT 10.2x). Sisältö:
  - pohjakuva 1 m (OSM-luokat + S2-värit, luokat, latvus, vesimaski)
  - vesiverkko (vesipinta.mjs: `--meri` tyhjällä shp:llä, koska ilman merta taso 0 vei ensimmäisen järven korkeudelle 0; `--lisa` OSM-polygonit)
  - vesialueet ja vesiväri (Zhongnanhain arvot myös vallihautaan)
  - kadut ja yövalot (OSM 118 + oletusvalot, maamerkit; Kielletty kaupunki ja Zhongnanhai pimeinä)
  - ikkunavalot ja maa 4 m

  OSM on Geofabrikin beijing-PBF:stä (Overpassin robots.txt kieltää /api/). Laaja 3 km -versio on kansiossa `ls2-ennen-rajaus/`. Työkalut T7 `peking/ls2/` (venv-kartta + osmium).
- **LR:N PEKING-PAKETIN KORJAUS:** matalasääntö oli painanut puistojen hallit 4,5 m:iin. Nyt 47 nimettyä hallia/porttia saa raa'an GloBFP-korkeuden, Valkoinen dagoba on 35,9 m ja katto dome (lr/LUEMINUT "Päivitys 10.4x"; vanha versio `lr-ennen-hallit/`).
- **VESI v7b ämpärissä** (Julkaisija 10.4x, 11 tiedostoa, 0 virhettä). Kytkentä ja muutosloki ovat LS2:n junassa.
- **ND 440 × 440 m** (LS2:n kiirepyyntö 10.5x): `_tyo/karttaseppa/notre-dame-440/`. Sisäosa on bitilleen sama kuin vanha. concorde-ign.mjs:n json-bugi korjattu (ortokerros oli kiinteästi 2021; ND:n kuva on 2018).
- **Odottaa:** Tukholman maanpinta 1 m, kun LM_GEOTORGET_USER/PASS ovat avaintiedostossa (ei vielä 11.0x).
- **VERTAILUORTOT (PT 11.4x, omistajan toive: automaattiset tarkistukset uusille 3D-malleille), valmis 12.3x:** `_tyo/karttaseppa/vertailu/<kohde>/` (orto.jpg mallin ENU-ruudussa + meta.json + varjot.jpg; LUEMINUT) kohteille notre-dame (IGN 2018), kuninkaanlinna (Copernicus VHR 2021: vain sisäiseen käyttöön), eiffel, prefektuuri (IGN 2021) ja peking (S2).
  - **Työkalu:** T7 `vertailu/vertailu.py --malli <id>`.
  - **Lähde sijainnin mukaan:** IGN/PDOK/PNOA/EEA/S2.
  - **Aurinko:** varjoista pintamallia vasten (IGN LiDAR MNS tai `--dsm-osm` PBF).
  - **ANSA:** EEA:n palvelimen 4326-projisointi siirsi kuvaa ~28 m, joten haku tehdään natiivissa 3035:ssä.
  - **LR:lle viesti varakanavalla** (SendMessage ei tavoittanut nimellä).
