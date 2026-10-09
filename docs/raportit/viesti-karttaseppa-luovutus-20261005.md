# TILANNE 9.10. klo 04.2x

- **Kuninkaanlinna (LR, PT:n erä):** _tyo/karttaseppa/kuninkaanlinna/ (LUEMINUT.md).
  - OSM 300 m: 135 building:part-osaa korkeuksineen.
  - Jalanjälki relation/34394.
  - GLO-rengas sivuittain ja 2 m:n korkeusruutu: `vesimaski/kohde-korkeus.mjs <jalanjalki.geojson> <etuliite> <sivu> <nimi>` (yleistetty riddarholmen-korkeus.mjs:stä).
  - Ortokuvaa ei ole (Lantmäteriet vaatii Geotorget-tunnuksen).
- Talvi3-loput käynnissä.

---

# TILANNE 9.10. klo 04.0x

- **LS1:n lisäpyyntö (juna 171):** Tukholman 8 esittely-v3-kohdetta → jalanjaljet-20261009/jalanjaljet-tukholma-lisa.json (kaikki Wikidatalla). Lähde-json scratchpadissa, koordinaatit 3:lle Wikidatasta. LS1 paketoi nyt vain Tukholman ja Pariisin (muut odottavat omistajaa).
- **Riddarholmen (LS2):** maan ellipsoidikorkeus riddarholmen/riddarholmen-maankorkeus.json: GLO p10 31,45 (yläraja), todennäköisin noin 29 ± 2.
- Talvi3-loput käynnissä (aja-talvi3-loput.sh), seuranta taustalla.

---

# TILANNE 9.10. klo 03.5x

- **Swap 15,4 Gt (03.48)** → vahdit pysäyttivät osa2:n (60/78) ja uusinnan (5/20). Muistia vievät myös muiden Blender ja simulaattorit.
- Vanhat vahdit lopetettiin hallitusti (osa2/ajo.log "OSA VALMIS (lopetettu hallitusti …)" ja uusinta/ajo.log "UUSINTA VALMIS (…)" ovat MERKKEJÄ, eivät oikeita valmistumisia).
- **AJOSSA:** `kaudet/aja-talvi3-loput.sh` (PID 53599): yksi prosessi, joka odottaa ennen jokaista lohkoa vapaa + inaktiivinen ≥ 16 Gt ja tyhjää junalukkoa.
  Lista `s2-eurooppa-talvi3-loput.txt`: osa2:n 18 → **s2-eurooppa-talvi3-osa2b/**, sitten uusinnan 15 → uusinta/. Pysäytys: `touch s2-eurooppa-talvi3-loput.STOP`. Loki: talvi3-vahti.log ("loput: …", "LOPUT VALMIS").
- **Kerrokset pakettiin:** uusinta → osa1 → osa2b → osa2. Arvio noin 33 × 13 min ≈ 7 h + odotukset → noin 11–12.

---

# TILANNE 9.10. klo 02.3x

- **Giza (LS2, juna 170: omien mallien korkeus omasta korkeusmallista):** _tyo/karttaseppa/giza-korkeudet-20261009.json (vesimaski/giza-korkeudet.mjs).
  - EGM2008 N = 15,35 m (arvio 15,6 → −0,25 m).
  - GLO-30-renkaat harhaisia; suositus: pidä nykyiset EGM-korkeudet ja vaihda vain N. FABDEM ei käy (CC BY-NC-SA).
- Talvi3: osa2 ja uusinta käynnissä, odotus taustalla (ilmoitus valmistumisesta, swap-STOPista tai virheestä).

---

# TILANNE 9.10. klo 02.0x

- **Notre-Dame ja Riddarholmen -lähdepaketit (LS2)**: _tyo/karttaseppa/{notre-dame,riddarholmen}/ (LUEMINUT.md).
  - Notre-Dame: orto 2018 (ennen paloa); LiDAR MNS työmaa-aikainen (nosturit), MNT ja RGE ALTI kelpaavat; leikkauspolygoni OSM.
  - Riddarholmen: leikkauspolygoni ja OSM. Lantmäteriet vaatii Geotorget-tunnuksen (OMISTAJAN toimi, PT:lle kerrottu).
  - concorde-ign.mjs on yleistetty (--nimi, --orto-kerros, --orto-vuosi).
- **Talvi3: osa1 VALMIS (91/91), osa2 53/78 (02.15).**
  **UUSINTA KÄYNNISSÄ** 02.16 vapautuneella paikalla: `kaudet/aja-talvi3-uusinta.sh` → `s2-eurooppa-talvi3-uusinta/` (20 lohkoa, lohkot.txt, pk2-koodi; junalukko ja STOP huomioidaan). Swap-vahti: `vahti-uusinta.sh` (> 14 Gt → STOP).
  Valmistuttua: `python3 kaudet/talvi3-ennen-jalkeen.py <_tyo/karttaseppa/talvi3-sauma-20261008>` (ennen/jälkeen-kuvat PT:lle), `suorat-reunat.py` kerroksilla uusinta, osa1 ja osa2, sitten `kokoa-kausi.py talvi v1 /Users/Shared/Claude/proto-3d/_valmiit/s2-eurooppa-talvi-vienti-<pvm> "<uusinta/laatat>:<osa1/laatat>:<osa2b/laatat>:<osa2/laatat>" "<kuvaus>"` + LAHTEET.md (pohjana kevät) ja Julkaisija.

---

# TILANNE 9.10. klo 01.4x

- **Pohjapiirrokset VALMIIT kaikille 37 kaupungille** (01.32): _tyo/karttaseppa/jalanjaljet-20261009/ (295 kohdetta; Wikidatalla 265). LS1:lle ilmoitettu.
  Korjaus: koko_m > 250 → ei lähintä rakennusta (Canal Grande, Užupis).
- **Concorden lähdepaketti VALMIS** (LS2 ja LR): _tyo/karttaseppa/concorde/ (LUEMINUT.md).
  - OSM 420 m (alue-osm.mjs)
  - IGN-ortokuva 2021 0,2 m/px (vuoden 2024 kuvassa olympiarakennelmat)
  - RGE ALTI 1 m ja LiDAR HD MNT/MNS 0,5 m (concorde-ign.mjs); RAF20 N = 43,799 m
- Talvi3 käynnissä.
- **Työkalut:** #4227 mergetty; jatko-PR https://github.com/ravelius/Matkakirja/pull/4242 (wt/karttaseppa-tyokalut2: jalanjaljet, alue-osm, concorde-ign). Worktreet vesipinta ja korkeusdata on poistettu. Auki: #4228 (wt/karttaseppa-ehdot-leikkaus).
- **Odottaa:** LS1 paketoi pohjapiirrokset; LR:n malli.

---

# TILANNE 9.10. klo 00.5x

- **Vesi index-v3 ÄMPÄRISSÄ 00.16** (todennettu): tukholma2 0,4, pariisi2 2,0.
- **POHJAPIIRROKSET (LS1/omistaja, juna 170):** `vesimaski/jalanjaljet.mjs <kaupunki-id> --pbf <alue.pbf>`. Lähde: opas-kierrokset-20261008.json (id = Wikidata, luokka); ID:t samat kuin pallo-37-listassa (tarkistettu).
  Tukholma ja Pariisi valmiit → _tyo/karttaseppa/jalanjaljet-20261009/. LS1:lle ilmoitettu.
  **Loput 35:** Geofabrik-lataus `lahteet/pbf/lataa.sh` (PID 24774, alueet.txt: kaupunki → alue, 30 aluetta, lataus.log). Sitten silmukka:
  `for k in $(awk '{print $1}' alueet.txt); do node jalanjaljet.mjs $k --pbf lahteet/pbf/<alue>-latest.osm.pbf --ulos jalanjaljet; done` → kopio jalanjaljet-20261009/ ja rivi LS1:lle.
- Talvi3 käynnissä (00.14 alkaen).

---

# TILANNE 9.10. klo 00.1x

- **Talvi3 jatkui käsin 00.14** (TF 167 ladattu 23.26, Laitetestaajan kaappaus valmis 00.13). Varmuusjatko ohitettiin pito-prosesseilla (perl sleep, päättyvät 00.16).
  Swap 9,7 Gt (vahti: > 14 Gt → STOP osaan 2).
- **Vesi index-v3 Julkaisijalle** (PT:n ennakkolupa): _valmiit/vesi-index-v3-vienti-20261009 (45 Mt): tukholma2 nosto 0,4, pariisi2 nosto 2,0 (LS2:n testi: 0,4 ja 1,2 jättivät Googlen soikioita). ÄMPÄRISSÄ 00.16 (todennettu 200: index-v3, tukholma2, pariisi2).
- Seuraavaksi: talvi3 valmiiksi (osa1 86/91, osa2 47/78 klo 22.30), uusinta 20 lohkoa pk2:lla, ennen/jälkeen-kuvat PT:lle, paketti.

---

# TILANNE 8.10. klo 23.1x

- **LS1:n löydös korjattu:** Pariisin kanavissa z 42–45 m (vesitason varapolku 0 m kapeille vesille).
  vesipinta.mjs: varapolku (kaikki ruudut, sitten naapuritaso) ja katetut vedet pois LiDARista (pinta > taso + 3 m), varmuuskopio `vesipinta-ennen-kanavakorjausta.mjs`.
  Uudet: _tyo/karttaseppa/vesi/pariisi2-6m/-16m ja tukholma2 (ajettu uudelleen samalla korjauksella); maskit päivitetty kaupunki-*-kansioihin.
- **index-v3-paketti** (tee-vesi-index-v3.sh) sisältää nyt tukholma2 + pariisi2 ja tiedosto-kentät. Kehitys-A/B: vesi-koe-a (vanhat), vesi-koe-b (tukholma2 + pariisi2). LS2 ottaa kuvaparit noin 00.15.
  **PT:n ennakkolupa:** kun kuvaparit ja Pariisin nostoarvo ovat kunnossa, `zsh tee-vesi-index-v3.sh <arvo>` → Julkaisija, rivi PT:lle.

---

# TILANNE 8.10. klo 22.5x

- **Junaan 168 (kevyet, PT 22.49):**
  1) Pariisin nosto: LS2:n koodi lukee index-v3 → v2 → index, ja nosto_m ohittaa jsonin. LS2 lähettää arvon noin 00.30.
     Sitten `zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tee-vesi-index-v3.sh <pariisin_nosto>` → _valmiit/vesi-index-v3-vienti-<pvm> (index-v3 + tukholma2). **PT:n ENNAKKOLUPA 22.5x:** kun LS2:n testiarvo ja kuvapari tukholma vs. tukholma2 ovat kunnossa, anna paketti suoraan Julkaisijalle ja lähetä rivi PT:lle.
  2) Tukholman tarkennus: tukholma2-6m/-16m (_tyo/karttaseppa/vesi/), vesipinta.mjs `--geoidi2 SWEN17 --meri-h 0.0 --nimitaso Mälaren=0.7`. Meri −0,19 m, Mälaren +0,52 m.
     index-v3: { id: tukholma, tiedosto: tukholma2 }. LS2:lta pyydetty "tiedosto"-kentän tuki ja kuvapari.
- Työkalu #4227 päivitetty (cae505d9f).

---

# TILANNE 8.10. klo 22.3x (2)

- **PT 22.3x: korjaus ennen pakettia, yksi paketti.**
  - pk2-suodatus (kaikki kuvat, SCL pikseleittäin) KOPIOITU kausimosaiikki.mjs:ään 22.31. Vanha versio: `kausimosaiikki-talvi3-pk1-20261008.mjs`.
  - pk1:llä tehdyt 133 lohkoa: `s2-eurooppa-talvi3-pk1-lohkot.json`. Loput tehdään pk2:lla.
- **Tarkistus:** `kaudet/suorat-reunat.py` (z8, suorien reunojen haku) → `talvi3-tarkistus/`, kuvat myös _tyo/karttaseppa/talvi3-sauma-20261008/.
  **UUSINTALISTA** `talvi3-tarkistus/uudelleenajo.json` (20 lohkoa): 33_17 33_18 34_17 34_18 34_19 35_17 35_18 35_19 36_18 36_19 37_18 37_19 34_20 35_20 36_20 37_20 36_21 37_21 38_21 39_22.
- **KUN TALVI3 VALMIS (pe):**
  1) Poista listan lohkot kunkin osan tila.json:n valmiit-listasta (tai tee uusi ULOS talvi3-uusinta), ja aja LOHKOT=lista kahdella prosessilla pk2-koodilla (noin 3 h).
  2) Kerrokset: uusinta → osa1 → osa2.
  3) Tarkista suorat-reunat.py:llä uudelleen.
  4) **PT 22.4x: ENNEN PAKETTIA yleiskuvat PT:lle: Etelä-Ruotsi, Pommeri ja Baltia ennen ja jälkeen.** Ennen-kuvat: talvi3-tarkistus/esim-*.jpg (osa1/osa2-kerroksista).
  5) Yksi paketti `kokoa-kausi.py talvi v1`, LAHTEET.md ja Julkaisija.
- **Vesi:** LS2 testaa Pariisin nostoa (0,4 / 0,8 / 1,2 m) noin 00.15, koska Seinessä näkyy Googlen vesisoikioita. Ratkaisu: vesi/index-v3.json, jossa kohdekohtainen nosto_m (bytes ennallaan, vienti PT:n luvalla). Tukholma 0,4 näytti hyvältä (PT hyväksyi kuvaparin, vesi päällä junassa 167).

---

# TILANNE 8.10. klo 22.3x

- **LS1:n korkeuslukija** käyttää korkeusdataamme, ja se on junassa 167 (25d32fd39). LS2:n vesi ei aktivoitunut rungossa C: try/catch-kuvapari noin 23.10, ja vesitason korjaus odottaa sitä.
- **Kaistasauma x = 34 mitattu:**
  - Alpit ja Saksa: ei näy.
  - Ruotsi: lievä tasosiirtymä (12,7 vs. sisäinen 9,8).
  - Lohkosaumat kaistojen sisällä: eivät näy.
  Kuvat: _tyo/karttaseppa/talvi3-sauma-20261008/.
- **LÖYDÖS:** Etelä-Ruotsin puolilumen utuverhossa on suorat reunat noin 15° E:ssä. Syy: TALVI_PKAIKKI-haun ruutukohtainen eo:cloud_cover < 80, joten naapuriruuduilla on eri kuvajoukot.
  Korjaus valmiina **kopiossa** `kaudet/kausimosaiikki-pk2.mjs` (ei pilvirajaa, limit 200). **ÄLÄ muokkaa kausimosaiikki.mjs:ää kesken talvi3-ajon**, koska v2-skripti lukee sen uudelleen joka lohkolle.
  PT:ltä kysytty: ajetaanko Etelä-Ruotsin noin 10 lohkoa uudelleen pk2:lla ennen pakettia vai viedäänkö paketti sellaisenaan.
- Taivas-LUT-työkalu on jo valmis (#4221). PT:lle kerrottu.
- Talvi3: osa1 86/91, osa2 47/78 (22.30). STOP klo 22.40 (ohjaus-talvi3-2240.sh), jatko TF 167:n jälkeen tai 00.00.

---

# TILANNE 8.10. klo 21.2x (PT:n tauko 21.25–22.10, 5 h -raja)

- **Juna 167 siirtyi** (omistaja 21.2x), TF noin 23.30–24.00.
  `kaudet/ohjaus-talvi3-2240.sh` (PID 86404) perii 21.45:n STOPin 21.46 (osat jatkavat tai käynnistyvät uudelleen v2-skriptillä) ja asettaa uuden STOPin 22.40.
  Syy: Laitetestaajan kaappaus 22.40–23.10 ja juna 167 noin 23.15.
  **Jatko käsin**, kun Julkaisija ilmoittaa TF 167:n ladatuksi: poista osa1/STOP ja osa2/STOP, sitten perl setsid aja-talvi3-osa-v2.sh. Varmuusjatko klo 00.00 (jatko-talvi3-varmuus.sh).
- Vesi on ämpärissä: Tukholma vesi/index.json, Pariisi vesi/index-v2.json (todennettu 200).
- Klo 22.10 jälkeen: tarkista talviajo ja vahtiloki. Jono: LS2:n kuvapari, LS1:n korkeuslukija. Uusia raskaita ajoja ei aloiteta ennen TF 167:ää.

---

# TILANNE 8.10. klo 21.0x

- **Kehityskaupungit TUKHOLMA ja PARIISI** (omistaja 20.4x) tehdään ensin mahdollisimman hyviksi. Muu Eurooppa odottaa omistajan päätöstä.
- **KORKEUSDATA (PT:n kärkityö):** Googlen SampleHeightMostDetailed on ehtojen vastaista, joten tilalle on tehty oma data. Raportti PR https://github.com/ravelius/Matkakirja/pull/4230.
  Kansio: _tyo/karttaseppa/korkeus-20261008/ (37 kaupunkia, LS1:n muoto, origo `pallo-37-kaupunkia.json`), LS1 vaihtaa lukijan junaan 169/170.
  - Pariisi: IGN LiDAR HD 2 m + 10 m
  - Tukholma: GLO + OSM-rakennukset 2 m. Lantmäteriet = omistajan Geotorget-tunnus.
  - Muut: GLO-30 30 m.
- **VESI (LS2:n nimet):** _tyo/karttaseppa/vesi/ (index.json, tukholma-6m/16m, pariisi-6m/16m). LS2 kytki veden (ilmakeha-170, oletus pois).
  Pariisi: Seine OSM-relaatioista (vesirelaatiot.mjs), liukuva jokitaso, taso LiDARista (p10 0,02 m).
- **KAUPUNKIAINEISTO:** _tyo/karttaseppa/kaupunki-{tukholma,pariisi}-20261008/ (reitit, kohteet, maski).
  Tukholma on ajettu uudelleen LS1:n origolla (59.3299, 18.07382).
- **Työkalut** T7 `vesimaski/`: vesipinta, vesirelaatiot, reitit, pbf-kohteet, rakennukset ja korkeus → PR #4227 (wt/karttaseppa-vesipinta, 596bcf91c; PT kuittasi).
- **Muut avoimet PR:t:** #4228 (ehtolisäys: leikkaus) ja #4230 (korkeusraportti). Mergen jälkeen worktreet pois (`uusi-worktree.sh --poista`).
- **VIENTI (PT:n lupa Julkaisijan kautta):** _valmiit/vesi-vienti-20261008 (vain Tukholma, vesi/index.json pysyvä) ÄMPÄRISSÄ 21.10 (todennettu 200).
  Pariisin paketti _valmiit/vesi-pariisi-vienti-20261008 (vesi/index-v2.json): PT:n LUPA 21.1x, ÄMPÄRISSÄ 21.11 (todennettu 200). Junassa 167 vesi on päällä vain Tukholmassa; LS2 vaihtaa index-v2:een ja Pariisin päälle seuraavaan junaan. LS2:lle kerrottu, että index-v2 luetaan ensin.
- **Odottaa:** LS2:n kuvapari (vesi), LS1:n lukijanvaihto, omistajan Lantmäteriet-tunnus.

---

# TILANNE 8.10. klo 20.4x

- **Elävä kaupunki (omistaja 20.4x, Linssiseppä tekee suunnitelman docs/raportit/pallo-elava-kaupunki-20261008.md):**
  - Osion C teksti on lähetetty Linssisepälle (OSM-aineisto, ODbL, ehdot C1–C4).
  - LS2:lle kanta, että oma materiaali Google-laatoille (ilmaperspektiivi, pilvien varjot) käy.
  - Ehtolisäys kohteen leikkauksesta: PR https://github.com/ravelius/Matkakirja/pull/4228 (wt/karttaseppa-ehdot-leikkaus).
- **Tukholman kaupunkiaineisto VALMIS** → /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kaupunki-tukholma-20261008/ (Linssisepälle ilmoitettu):
  - reitit-tukholma.json (reitit.mjs, shp)
  - kohteet-tukholma.json (pbf-kohteet.mjs: lautat 163, vesialueet 175, piiput, aukiot, suihkulähteet)
  - vesi-tukholma-maski.png (vesipinta.mjs --maski, 8 m)
  Työkalut ovat T7:llä `vesimaski/` ja PR:ssä #4227 (wt/karttaseppa-vesipinta, f2ed3b672). Ruotsin PBF ja shp-paketit ovat `lahteet/`-kansiossa.
- Odottaa: LS2:n kuvapari (vesi), PT:n säde-päätös Euroopan ajolle, Linssisepän toiveet muihin kaupunkeihin.

---

# TILANNE 8.10. klo 20.3x

- **OMISTAJA 20.2x: "B"** = oma vesipinta Googlen 3D-laattojen päälle. Rantaviivat OSM:stä, ESA WorldCover täydentää.
  Krediitti ☰ › Lähteet: "Vesi: © OpenStreetMap contributors (ODbL), ESA WorldCover 2021 (CC BY 4.0)".
- **Tukholman vesipinta VALMIS ja LS2:lla:** /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/vesi-tukholma-20261008/
  Versiot: 6 m suositus (1,04 M kolmiota, 25 Mt), 4 m ja 16 m LOD. Työkalu: T7 `vesimaski/vesipinta.mjs`, ajoaika noin 10 s / kaupunki.
  Lähteet T7:llä (`vesimaski/lahteet/`): OSM water-polygons (meri), Geofabrik Ruotsi (gis_osm_water_a), EGM2008 2,5′. GLO-30 NAS:lla.
  Overpass EI käy: robots.txt kieltää /api/:n. Muut maat haetaan Geofabrikin maakohtaisista shp-paketeista.
- **LS2 kuittasi muodon (20.4x)**: lähellä 6 m, yli 3 km 16 m:n LOD. LS2:n järjestys: Ydin-lukija ja testit → taivas ja ilmaperspektiivi → vesi Tukholmaan ja kuvapari PT:lle.
  Työkalu: PR https://github.com/ravelius/Matkakirja/pull/4227 (worktree wt/karttaseppa-vesipinta). PT:lle on viety mittakaava-arvio: 1 070 keskustaa, 15 km ≈ 30 Gt, ehdotus 10 km ≈ 14 Gt, lataus kohteeseen mentäessä. Odottaa kuvaparia ja PT:n päätöstä säteestä.
- **SEURAAVAKSI (vanha lista):**
  1) LS2:n kuittaus muodosta (tehty).
  2) PT:n kuvapari (LS2 ottaa pelistä).
  3) Työkalu repoon (tools/vesipinta/, PR).
  4) Euroopan kaupungit (keskustat.json, 15 km) ja ämpäri Julkaisijan kautta (LAHTEET.md: ODbL + CC BY).
  Vesitaso on painotettu alakanttiin (GLO-30:n 10 %:n persentiili sisäruuduista), koska liian korkea vesi peittäisi laiturit.

---

# TILANNE 8.10. klo 20.2x

- **Siivous:** wt/karttaseppa-pallo-unreal poistettu (1,3 Gt). PT:lle kerrottu, että talviajo kirjoittaa vain T7:lle.
- **Vesimaskin ehtoraportti VALMIS:** PR https://github.com/ravelius/Matkakirja/pull/4224 (worktree wt/karttaseppa-vesimaski-ehdot), docs/raportit/vesimaski-google-ehdot-20261008.md.
  Suositus B (oma vesimesh ESA/OSM-datasta). A vain kirjallisella vahvistuksella, C laaturiski. PT:lle viety, ja **omistaja päättää**. EI julkaisua ennen päätöstä.
  Jos B valitaan: vesimaski.mjs vektoroi saman ESA-aineiston meshiksi per kohde (sovi LS2:n kanssa muodosta, esim. glb tai GeoJSON paikallisessa ENU:ssa), ja siltojen kohdalle aukko OSM:stä.
- #4221 (ilmakehä) odottaa Julkaisijan mergeä, head 058aedd2d. Mergen jälkeen `uusi-worktree.sh --poista karttaseppa-ilmakeha`.

---

# TILANNE 8.10. klo 20.1x (2)

- **PT:n korjaukset tehty** (#4221 head 058aedd2d, Julkaisija mergeää):
  - taivas 96×64×96 UE SkyViewLut -mappauksella
  - ilmaperspektiivi 200 km, tiheä auringon suuntaan
  - pilvien toistonesto: kolmen mittakaavan yhdistelmä jsonissa
  Tiedostot päivitetty kansioon `_tyo/karttaseppa/ilmakeha-20261008/`, ja LS2:lle on kerrottu.
- **VESIMASKI:** LS2 valitsi rasteripeitteen (A).
  Koeaineisto: `/Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski/vesimaski.mjs` (ESA WorldCover 2021 luokka 80, z14 XYZ PNG, säde 15 km). Ajettu Tukholmalle (koe-tukholma/, 534 laattaa, 4,2 Mt, 15 s), ja LS2:lle on kerrottu.
  **ODOTTAA PT:n linjausta**: sopiiko oma vesimaski Googlen 3D-laattojen päälle Map Tiles -ehtoihin (kysytty 20.1x).
  Linjauksen jälkeen: työkalu repoon (tools/vesimaski/), Euroopan keskustat keskustat.json-tiedostosta 15 km säteellä, ämpäri Julkaisijan kautta (vie-paketti + LAHTEET.md, CC BY 4.0).

---

# TILANNE 8.10. klo 20.1x

- **PT 20.1x:** #4220 mergetty. Pallon maiseman työnjako:
  - Karttaseppä: vesimaski, pilviaineisto ja LUT-työkalu
  - LS2: varjostimet
  - Natiiviseppä: SSE ja välimuisti sekä STP/TAA
  - LS1: pallo
  Järjestys: ensin kohdat 1–3, sitten 4 ja 7, sitten 5, 6a ja 8. Altos vain PT:n kautta.
- **VALMIS: ilmakehä-LUTit ja pilvitiheys**, PR https://github.com/ravelius/Matkakirja/pull/4221 (haara karttaseppa-ilmakeha, worktree /Users/Shared/Claude/wt/karttaseppa-ilmakeha).
  Tiedostot: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/ilmakeha-20261008/. LS2:n rajapinta: Assets/Matkakirja/Linssit/Resources/Ilmakeha/*.bytes + .json, ja LS2 kopioi ne itse. LS2 ja PT on ilmoitettu.
- **SEURAAVAKSI: vesimaski (kohta 5).** Ehdotettu muoto: GeoJSON per kaupunkikohde (OSM-vesi + rantaviiva, paikallinen ENU). Sovi LS2:n kanssa ennen tekoa.
  Kohteet: kaupunkikierroksen ja oppaan kohteet (CesiumKaupunki).
- Talvi3 ajossa, tauko klo 21.45 (katso alempi osio).

---

# TILANNE 8.10. klo 20.0x

- **Pallo vs. Unreal 5 -raportti VALMIS:** PR https://github.com/ravelius/Matkakirja/pull/4220 (haara karttaseppa-pallo-unreal, worktree /Users/Shared/Claude/wt/karttaseppa-pallo-unreal), docs/raportit/pallo-unreal-vertailu-20261008.md. Pallon osio on Linssisepältä.
  PT:lle on lähetetty yhteenveto. Odottaa PT:n mergeä ja työnjakoa (ehdotus: Karttaseppä vesimaski, pilviaineisto ja LUT-työkalu). Mergen jälkeen `uusi-worktree.sh --poista karttaseppa-pallo-unreal`.
- Talvi3 ajossa. Tauko junan 167 ja Laitetestaajan kaappauksen ajaksi 21.45 alkaen, katso alempi osio 10.4x.

---

# TILANNE 8.10. klo 10.4x

- **Näyte 6 valmis 10.42** (kuva `kuvapari-talvip-nayte6-20261008.jpg`, näyte 4 | 6): reuna muuttui loivaksi siirtymäksi eikä uusia virheitä tullut. PT:n ehdon mukaan koko ajo on käynnistetty.
- **AJOSSA: TALVI3 KOKO AJO**, 10.44 alkaen, 2 prosessia irrotettuna:
  - osa 1: `aja-talvi3-osa.sh 1 27 33` (PGID 96963) → `s2-eurooppa-talvi3-osa1/`
  - osa 2: `aja-talvi3-osa.sh 2 34 39` (PGID 97016) → `s2-eurooppa-talvi3-osa2/`
  Liput: TALVI_PKAIKKI, TALVI_PS, TALVI_P6. Node ajetaan lohko kerrallaan. **Pysäytys ilman killiä:** `touch <osa>/STOP` (pysähtyy lohkon jälkeen). Ajo on jatkettava: sama komento uudelleen.
  Muistivahti `kaudet/vahti-talvi3.sh` (PGID 97234): jos swap > 14 Gt → STOP osaan 2. Loki `s2-eurooppa-talvi3-vahti.log`.
  **Vahti v2** `kaudet/vahti-talvi3-v2.sh` (PGID 98135, PT 10.4x): kun junakäännöksen lukko on päällä, se asettaa STOPin molempiin osiin (merkki STOP.lukko). Kun lukko vapautuu, se poistaa STOPin ja käynnistää osan uudelleen (`aja-talvi3-osa-v2.sh`, ohittaa valmiit lohkot).
  Juna 166 tulee 9.10. ajon aikana, joten tauko ja jatko hoituvat automaattisesti. Testattu 17.19–17.35 (lukko → STOP → JATKO, osat nyt v2-skriptillä PGID 68183 ja 68192). Vanha vahti on päättynyt. PT haluaa valmistumisesta ja kaistasaumasta yhden rivin.
  Arvio (17.13: osa1 24/91, osa2 25/78): valmis pe 9.10. noin klo 08–11. Työjono: /Users/Shared/Claude/Matkakirja-fable/scratchpad/tyojonot.md (Karttaseppä); erä valmis → 1 rivi PT:lle ja seuraava kohta heti, [PT]/[LUPA] ohitetaan.
  **Valmistuttua:** tarkista kaistasauma x = 34 (z6 lohkoraja 33|34), tee yleiskuva (neljännekset), lähetä yksi rivi PT:lle, sitten
  `kokoa-kausi.py talvi v1 <_valmiit/s2-eurooppa-talvi-vienti-<pvm>> "<osa1/laatat>:<osa2/laatat>" "<kuvaus>"`, LAHTEET.md (pohjana kevät) ja Julkaisija.
  **JUNA 167 (8.10. 22.00):** `kaudet/tauko-talvi3-2145.sh` (PID 75365) asettaa STOPin molempiin osiin klo 21.45, ilman STOP.lukkoa, joten vahti ei jatka.
  **PT 17.5x:** tauko jatkuu myös Laitetestaajan videokaappauksen yli (22.40–23.10). Jatko vasta, kun TF 167 on ladattu JA Laitetestaaja on ilmoittanut kaappauksen päättyneeksi.
  Varmuusjatko `kaudet/jatko-talvi3-varmuus.sh` (PID 96602): 9.10. klo 00.00 alkaen, kun junalukko on tyhjä. Arvio: valmis pe noin 10–12.
  **Jatko käsin vasta Julkaisijan TF 167 -ilmoituksen jälkeen (~22.30):** poista `osa1/STOP` ja `osa2/STOP`, sitten perl setsid `aja-talvi3-osa-v2.sh 1 27 33` ja `… 2 34 39`.
  Jos osa 2 pysähtyi STOPiin: poista STOP ja käynnistä uudelleen, kun muistia on (perl setsid).

---

# TILANNE 8.10. klo 10.0x

- **Näyte 5 valmis 10.04** (kuva `kuvapari-talvip-nayte5-20261008.jpg`, näyte 4 | 5): utu väheni, mutta 27,3° E:n pystyreuna jäi, joten koko ajoa EI käynnistetty.
  Reuna on vino kuten kuvauskaistan reuna, joten raja on ruudun sisällä. Ruutusovitus (TALVI_P5) ketjuuntui (a-rajat) eikä auta, joten se jätetään pois. PT:lle on raportoitu.
- **Näyte 6 valmiina:** `kaudet/aja-talvip-nayte6.sh` (TALVI_PS = jyrkempi S, TALVI_P6 = näkymäkohtainen sovitus lumettomilla pikseleillä). tila.json valmiina.
  Odottaa junakäännöksen lukkoa (juna/b13 10.04). Sitten ajo irrotettuna ja vertailu `"näyte 4" … "näyte 6"`.
  **Jos reuna katoaa eikä uusia virheitä tule → koko ajo** `aja-talvi3-osa.sh` (päivitetty näytteen 6 lipuille; tila.json kopioidaan nayte6:sta).
  Muistiehto ennen rinnakkaisajoa: PhysMem unused > 20 Gt (nyt noin 7,5 Gt → yksi tai kaksi prosessia).
- Koodikopiot: `-talvip4-`, `-talvip5-20261008.mjs`. Ankkurisääntö (vain kun oma ≥ 20000 px) koskee vain TALVI_P5:tä.

---

# TILANNE 8.10. klo 08.06

- **PT hyväksyi näytteen 4 linjan (08.0x) ja tilasi näytteen 5:** lumettoman värin sovitus naapuriruutuun (27° E:n pystyreuna) ja jyrkempi S-käyrä (puolivälin utu).
  **Jos pystyreuna katoaa eikä uusia virheitä tule, koko ajo käynnistetään ilman uutta kysymystä.** Ajetaan rinnakkain muistin sallimissa rajoissa: PhysMem unused > 20 Gt, nice 15, ei junakäännösten aikana.
  PT:lle lähetetään näytteen 5 kuvapari ja koko ajon arvioitu valmistumisaika.
- **Koodi valmis** (`TALVI_P5=1`, kopio ennen muutosta `-talvip4-20261008.mjs`):
  1. Ruudun lumeton väri sovitetaan jo kerättyyn lumettomaan väriin päällekkäisalueella (kvantiilit 20/80, a 0,85–1,18, |b| ≤ 0,03). Tulos tallennetaan `T.paljas`-kenttään; ruutu ilman päällekkäisyyttä on ankkuri.
  2. S-käyrä: smootherstep 0,40–0,60.
- **ODOTTAA TF 164:ää** (Julkaisija ilmoittaa). Sitten `kaudet/aja-talvip-nayte5.sh` irrotettuna (perl setsid), noin 40 min, ja vertailu:
  `python3 kaudet/vertaa-talvip.py kuvapari-talvip-nayte5-20261008.jpg "näyte 4" s2-eurooppa-talvip-nayte4 "näyte 5" s2-eurooppa-talvip-nayte5`.
- **Koko ajo:** `kaudet/aja-talvi3-osa.sh <osa> <x0> <x1>`, kaistat 1: 27–31, 2: 32–35, 3: 36–39 → `s2-eurooppa-talvi3-osaN/`. Ajo on jatkettava ja uusii 3 kertaa. Noin 54 lohkoa × 15 min ≈ 13–14 h.
  Valmistuttua: tarkista kaistarajojen saumat (x = 32 ja 36), koska `T.paljas` on prosessikohtainen. Paketti: `kokoa-kausi.py talvi v1 <p> "<osa1/laatat>:<osa2/laatat>:<osa3/laatat>"`, sitten LAHTEET.md ja Julkaisija.

---

# TILANNE 8.10. klo 08.0x

- **Näyte 4 VALMIS 08.03** (`s2-eurooppa-talvip-nayte4/`, kuva `kuvapari-talvip-nayte4-20261008.jpg`, näyte 3 | 4). TALVI_PKAIKKI=1: p 43–63 kuvasta per ruutu.
  Lumirajan suorakulmiot ovat suurimmaksi osaksi poissa. Jäljellä yksi suora pystyreuna lumettomalla alueella (n. 27° E, 51–52° N). Se on lumettoman värin ero, koska 12 värinäkymää ovat ruuduittain eri päiviltä. Puolivälin p näyttää paikoin utuiselta.
  PT:lle on raportoitu ja kysytty: näyte 5 (lumettoman värin sovitus naapuriin) vai koko ajo näytteen 4 linjalla (169 lohkoa, ~15 min/lohko, ~40 h yhdellä prosessilla).
  Julkaisijalle on ilmoitettu "valmis".
- **EI uusia ajoja ennen kuin Julkaisija ilmoittaa TF 164:n ladatuksi** (käännös 08.15–08.30).
- Vertailu: `python3 kaudet/vertaa-talvip.py <ulos.jpg> "<nimi A>" <kansio A> "<nimi B>" <kansio B>` (T7 iss-eurooppa-s2, z8-rajaus lohkoille 36_21, 37_21, 37_20).

---

# TILANNE 8.10. klo 07.2x

- **Näyte 3 valmis 07.23** (`s2-eurooppa-talvip-nayte3/`, kuva `kuvapari-talvip-nayte3-20261008.jpg`): suorakulmiot jäivät lähes ennalleen.
  Juurisyy: p lasketaan joka ruudulle eri päivistä (top-32 vähäpilvisintä), joten naapuriruutujen p hyppää. PT:lle on raportoitu.
- **AJOSSA: näyte 4** (`kaudet/aja-talvip-nayte4.sh`, PGID 41823, 07.25 alkaen, noin 45 min) → `s2-eurooppa-talvip-nayte4/`. Julkaisija antoi vuoron.
  Uusi lippu `TALVI_PKAIKKI=1`: p kaikista talvikuvista (pilvisyys < 80 %, ei top-N:ää), laskurit Uint16, SCL-luku 8 rinnakkain. Edellinen versio on tallessa (`-talvip3-20261008.mjs`).
  **Juna 164 käännös noin 08.15–08.30: EI uusia ajoja ennen kuin Julkaisija ilmoittaa TF 164:n ladatuksi.**
  Valmistuttua: kuvapari (näyte 3 | 4, `python3 kaudet/vertaa-talvip.py <ulos.jpg> "näyte 3" s2-eurooppa-talvip-nayte3 "näyte 4" s2-eurooppa-talvip-nayte4`), yksi rivi PT:lle ja "valmis" Julkaisijalle. Jos swap > 15 Gt, keskeytä.

---

# TILANNE 8.10. klo 07.1x (tilinvaihto)

- **Näyte 2 VALMIS 06.51** (`s2-eurooppa-talvip-nayte2/`, kuva `kuvapari-talvip-nayte2-20261008.jpg`): p SCL-kaistasta kaikista talvikuvista. PT hyväksyi linjan 06.xx.
  Muutama suorakulmio jäi. Syy: kun ruudun 12 näkymästä puuttui joko luminen tai lumeton näkymä, väri pakotettiin.
- **Korjaus tehty** `kausimosaiikki.mjs`:ään: puuttuva väri täydennetään ympäristöstä (normalisoitu sumennus r 40 × 2), ja sekoitus tehdään aina p:n mukaan.
  Testi (3 lohkoa: 36_21, 37_21, 37_20) oli ajossa tilinvaihdossa ilman setsidiä → todennäköisesti katkesi.
  **Aja uudelleen irrotettuna** (noin 40 min; tarkista lukko, ei junakäännöksen aikana):
  `TALVI2=1 TALVI_P=1 TALVI_ITA=1 KAUSI=talvi ULOS=<T7>/iss-eurooppa-s2/s2-eurooppa-talvip-nayte3 LOHKOT=36_21,37_21,37_20` (tila.json kopiona talvi2:sta, valmiit tyhjänä).
  Vertaa näyte 2:een (sama alue), lähetä yksi rivi PT:lle, ja koko ajo (169 lohkoa, noin 13 min/lohko → arvioi uudelleen, ehkä 20+ h; harkitse rinnakkaisuutta tai ovS-kerrointa) vasta kuittauksen jälkeen ja junien väliin.

---

# TILANNE 8.10. klo 05.4x

- **TALVI_P (lumitodennäköisyys) toteutettu** `kausimosaiikki.mjs`:ään lipun TALVI_P=1 taakse. Kopiot: `-talvip-20261008.mjs` (näyte 1) ja `-talvip2-20261008.mjs` (näyte 2).
  Näyte 1 (Puola–Ukraina–Karpaatit 3 × 3, x35–37 × rivit 20–22, 05.33): lumiraja on luonnollinen, mutta muutama ruudun muotoinen läikkä jää, koska p laskettiin 12 näkymästä.
  Kuva `kuvapari-talvip-nayte-20261008.jpg`, ja PT:lle on raportoitu.
- **AJOSSA: näyte 2** (`kaudet/aja-talvip-nayte2.sh`, PGID 92429, 05.34 alkaen, noin 1,5 h) → `s2-eurooppa-talvip-nayte2/`.
  p luetaan SCL-kaistasta kaikista talvikuvista (≤ 32 per ruutu), ja värit tulevat 12 näkymästä.
  Valmistuttua: kuvapari (talvi2e | näyte 1 | näyte 2) ja yksi rivi PT:lle.
  Koko ajo vasta PT:n kuittauksen jälkeen, junien väliin ja Natiivisepän kanssa sovittuna: `TALVI2=1 TALVI_P=1 TALVI_ITA=1 KAUSI=talvi ULOS=s2-eurooppa-talvi3`, kaikki 169 lohkoa, noin 10 h.
  Talvella ei rengasta. Paketti: `kokoa-kausi.py talvi v1 <p> "<talvi3/laatat>"`.

---

# TILANNE 8.10. klo 04.5x

**TALVI EI VIENTIIN (PT 04.4x).** Talvi2e (03.58) korjasi Itä-Euroopan ruutukuvion ja Mezeninlahden, mutta lumirajalla on MGRS-portaikko
(Tanska–Puola–Karpaatit), Mustanmeren pohjoispuolella lumi päättyy suoraan vaakaviivaan noin 46° N:ssä, ja Volgan suunnalla on ruskeita suorakulmioita.
Viemätön talvipaketti on poistettu. Kokeillut, toimimattomat korjaukset (ympäristöliput, oletuksena pois):
- `TALVI_JATKUVA=1`: lumipaino liukuman mukaan
- `TALVI_KAKSOIS=1`: 4 lumista + 4 paljasta näkymää

Molemmat jättävät ruuturajat.

## SEURAAVA TYÖ (PT): pikselikohtainen lumitodennäköisyyskooste

Tavoite: luonnollinen, epäsäännöllinen lumiraja ilman ruuturajoja.

1. **Kuvajoukko ruudulle:** kaikki talvien (2022–2025) näkymät, joissa pilviä < 50 %, enintään 16, ilman lumipainotusta. Sama säännöstö kaikkialla (ei lumiRaja- eikä TLUMI-sääntöä).
2. **Pikselikohtaiset arvot** kelpoista näkymistä:
   - `p` = lumisten (SCL 11) osuus
   - paljas väri = alempi mediaani lumettomista
   - luminen väri = mediaani lumisista
3. **Kertymä ruutujen yli:** p, paljas RGB ja luminen RGB kertyvät painotettuina samaan A-kertymään kuin nyt (uudet kanavat), joten päällekkäiset ruudut sulautuvat.
4. **Lohkon kokoamisessa:** p sumennetaan noin 3–5 km:n säteellä (normalisoitu laatikko × 3). Väri = mix(paljas, luminen, smoothstep(0,35; 0,65; p)). Jos toinen väri puuttuu, käytetään toista.
5. **Säilyvät:** järvijää (NE-järvet, nyt lumiT; vaihdetaan p:hen tai pidetään leveysasteena), Itämeren ja Vienanmeren merijää sekä reikätäyttö, vuonojen rantasääntö.

**Arvio:**
- Koodi ja testit noin 3–4 h: 3 testilohkoa rajalta (34_20, 36_21, 38_22) sekä pohjoinen (35_16) ja etelä (33_22).
- Koko talven uusinta 169 lohkoa 16 näkymällä noin 8–10 h. Muisti: keko 6 Gt, sisäistä levyä 36 Gi; yksi prosessi kerrallaan, ja levyvahti STOP alle 30 Gi:n.
- Ei junakäännöksen aikana: `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka`.

Koodi: `kaudet/kausimosaiikki.mjs`. Talvi2e:n versio on tallessa (`-talvi2e-20261008.mjs`). Nykyisessä tiedostossa on lisäksi TALVI_JATKUVA- ja TALVI_KAKSOIS-liput (pois päältä).
Talven tulokset T7:llä: s2-eurooppa-talvi2(e/d/c/b), yleiskuvat `yleiskuva-talvi2*-z6.jpg`.

- **Valmiit:** syksy v1 ja kevät v1 ovat ämpärissä (kevät junassa 164, LS2). Worldview on tuotannossa.

---

# TILANNE 8.10. klo 02.1x

- **AJOSSA: TALVI2E** (`kaudet/aja-talvi2e.sh`, PGID 23889, 02.09 alkaen, 28 lohkoa, arvio noin 04) → `s2-eurooppa-talvi2e/`. Koodi: `kausimosaiikki-talvi2e-20261008.mjs`.
  PT kuittasi 02.2x: A = mannerilmaston lumiraja (TALVI_ITA=1: 54° N ≤ 15° E → 48° N ≥ 30° E), jolla Itä-Euroopan ruutukuvio korjataan, sekä Mezeninlahden merijään rajaus 42° E:hen.
  Talvi2d valmis 02.04: Grönlanti kunnossa (`yleiskuva-talvi2d-z6.jpg`).
  **Lopulliset kerrokset: talvi2e → talvi2d → talvi2c → talvi2.** Valmistuttua:
  1) Yleiskuva (neljännekset, erityisesti 48–57° N Puola–Venäjä ja Mezeninlahti).
  2) Yksi rivi PT:lle.
  3) Talvipaketti kokoa-kausi.py:llä (kerrokset yllä), LAHTEET.md ja Julkaisija.
  Jos ajo venyy yli klo 08:n, ilmoita Natiivisepälle (junakäännös).
- Syksy v1 ja kevät v1 ovat ämpärissä. Worldview on tuotannossa.

---

# TILANNE 7.10. klo 23.4x (TILINVAIHTO, VAIHTO NYT)

- **AJOSSA: TALVI2D** (`kaudet/aja-talvi2d.sh`, PGID 68005, 23.22 alkaen, 80 lohkoa, klo 23.4x tilanne 1/80, valmis noin 02.30; tila `kaudet/aja-talvi2d.out`) → `s2-eurooppa-talvi2d/`. Koodi: `kausimosaiikki-talvi2d-20261007.mjs`.
  Talvi2c (23.15) on muuten kunnossa: porrasneliöt ovat poissa, Perämeren reiät täyttyneet, eikä pilviä näy (`yleiskuva-talvi2c-z6.jpg`).
  Vika oli Grönlannin itärannikolla: koko meri oli jäätä, ja reunat seurasivat suorakulmaisesti S2-kattavuutta. Syy: dRanta-katto 36, joten ehto `dRanta <= 90` oli aina tosi.
  Talvi2d pitää merijään (ja reikätäytön) vain alueella 9–45° E, 53–67° N (Itämeri ja Vienanmeri). x34–39 × rivit 16–19 pysyvät talvi2c:ssä (kokonaan alueen sisällä).
  **Lopulliset kerrokset: talvi2d → talvi2c → talvi2.** Valmistuttua:
  1) Yleiskuva (sama skripti kuin talvi2c:lle, kerrokset yllä): tarkista Grönlanti (27_13–15), Jan Mayen, Norjan vuonot, Turun saaristo ja Perämeri.
  2) Yksi rivi PT:lle.
  3) Kuittauksen jälkeen `kokoa-kausi.py talvi v1 <_valmiit/s2-eurooppa-talvi-vienti-<pvm>> "<talvi2d/laatat>:<talvi2c/laatat>:<talvi2/laatat>" "<kuvaus>"`, LAHTEET.md (pohjana kevät) ja Julkaisija.
- Syksy v1 ja kevät v1 ovat ämpärissä (LS2:lle ilmoitettu). Worldview on tuotannossa.
- Ennen uusia polttoja: `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka` (tyhjä = vapaa).

---

# TILANNE 7.10. klo 20.0x

- **AJOSSA: TALVI2C** (`kaudet/aja-talvi2c.sh`, PGID 50483, 19.09 alkaen, noin 4 h): rivit 13–20 → `s2-eurooppa-talvi2c/`. Koodi: `kausimosaiikki-talvi2c-20261007.mjs`.
  Talvi2b (18.57) HYLÄTTY: merijään laatikkosulkeminen teki porrasneliöitä ja levitti jäätä saaristoon. Talvi2c täyttää vain aidot reiät
  (komponentti ei koske reunaa ja on ≤ 20 000 px); reuna liukuu 8 px.
  Valmistuttua:
  1) Koko Euroopan yleiskuva kerroksista talvi2c → talvi2 (vertaa `yleiskuva-talvi2b-z6.jpg`): saumat, pilvet ja porrasneliöt (Turun saaristo, Vienanmeren itäranta 39_14–16).
  2) Yksi rivi PT:lle, kuittauksen jälkeen `kokoa-kausi.py talvi v1 <_valmiit/s2-eurooppa-talvi-vienti-<pvm>> "<talvi2c/laatat>:<talvi2/laatat>" "<kuvaus>"`, LAHTEET.md (pohjana kevät) ja Julkaisija.
- **KEVÄT v1 ÄMPÄRISSÄ** 20.02 (57 630 tarkistettu), ja LS2:lle on ilmoitettu. Syksy ja kevät ovat valmiit; jäljellä on talvi.
- Worldview on tuotannossa, ja syksy v1 on ämpärissä (LS2:lle ilmoitettu).
- **Omistaja 21.5x:** raskaat poltot eivät käynnisty junakäännöksen aikana. Ennen uutta polttoa tarkista `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka` (tyhjä = vapaa). Käynnissä olevaa ajoa ei keskeytetä.

---

# TILANNE 7.10. klo 16.2x

- **WORLDVIEW TUOTANNOSSA:** #4140 mergetty 15.41 (00d33d4f), viivataso-osoitin 2026-10-07-viivat, natiivin aineistot ämpärissä (LS2 95cf8eb97 → juna 161). #4145 (Kyproksen pohjoisosa, Sisältökirjuri) mergetään perään. Worktreet poistettu.
- **SYKSY v1 ÄMPÄRISSÄ** (57 630, 14.48), ja LS2:lle on ilmoitettu (natiivin kausivalinta).
- **KEVÄT KUITATTU 16.0x, VIENTI KÄYNNISSÄ** (Julkaisija 16.0x, 6 osaa): `_valmiit/s2-eurooppa-kevat-vienti-20261007` → `s2-eurooppa/kevat/v1/`.
  Kun Julkaisija ilmoittaa: `aws s3 ls … kevat/v1 --recursive | wc -l` = 57 630, sitten viesti LS2:lle.
- **Uusi linja (PT 16.0x):** kuittaus yhdellä rivillä ilman kuvaparia. Laadun yleiskuvat (saumat, pilvet) tehdään silti.
- **TILINVAIHTO illalla 22–24:** luovutus pushattuna viimeistään 21.30. VAIHTO NYT -viestiin luovutus 10 minuutissa ja kuittaus yhdellä rivillä.
- **TALVI2B** ajossa (PGID 43109), rivit 13–20. Valmistuttua: z5-yleiskuva (saumat + pilvilaikut) ja kuvapari PT:lle, sitten paketti `kokoa-kausi.py talvi v1 <p> "<talvi2b/laatat>:<talvi2/laatat>"`.
- Omistaja 15.5x: natiivin testaus kevyemmin (koskee junia), karttaseppää ei muuta.

---

# TILANNE 7.10. klo 14.5x

- **AJOSSA (irralliset):**
  1) `kaudet/aja-talvi2b.sh` (PGID 43109, 14.45 alkaen, noin 6 h): rivit 13–20 → `s2-eurooppa-talvi2b/`.
  2) `aja-kevat-pohjoinen2.sh` (PGID 4649, 13.46 alkaen): rivit 13–17 → `s2-eurooppa-kevat-pohjoinen2/` + `kausi-rengas/kevat-pohjoinen2`.
- **Talvi2b, PT 13.5x:** Perämeren jää säilyy, mutta reiät täytetään ja reuna liukuu MERI-väriin. Värmlandin tumma ruutu korjataan ottamalla pohjoisessa pikseliin kirkkain luminäkymä, tai kirkkain näkymä jos lumikuvaa ei ole.
  Koodi: `kausimosaiikki-talvi2b-20261007.mjs` (kopio; talvi2-versio on `-talvi2-20261007.mjs`).
  Valmistuttua: z5-yleiskuva koko Euroopasta (saumahaku) + kuvapari PT:lle (`kuvapari.py`, sarake: kerrokset talvi2b → talvi2), PT kuittaa → `kokoa-kausi.py talvi v1 <paketti> "<talvi2b/laatat>:<talvi2/laatat>"`.
- **Worldview:** natiivin aineistot ovat ämpärissä (korkeus 1 531/1 531, geojsonit 200, maakunnat 2026-10-07a). Natiiviseppä/LS2: 95cf8eb97 junaan 161.
  Raja-paketin webosa on vielä viennissä. PR #4140:n merge ja viivatason osoitinvaihto tulevat Julkaisijalta. --paivita-commit fab6701c0 on tehty.
- **CYP:** linja D tehty. PT:lle kerrottu, että C:n lisenssiä ei löytynyt.

---

# TILANNE 7.10. klo 14.xx

- **Worldview + CYP admin-1 VALMIIT, viennit Julkaisijalla.** PR #4140 (haara karttaseppa-raja-worldview, kärki ab0e9d136). Paketit:
  - `_valmiit/raja-worldview-vienti-20261007` (ajossa 13.03 alkaen, noin 2–3 h)
  - `natiivi-maarajat-vienti-20261007` (.geojson-MIME lisätty)
  - `maakunnat-cyp-vienti-20261007` (2026-10-07a: Pohjois-Kypros CYP:n alueeksi "Kyproksen pohjoisosa", linja D; vaihtoehto C:n lisenssiä ei löytynyt)
  **Kun Julkaisija ilmoittaa:**
  1) Tarkista ämpäri (taustavahdin neljä polkua) ja ilmoita LS2:lle (vakiot proto linssiseppa2/swe-rajat 95cf8eb97 junaan 161; jos LS2 on poissa, Natiivisepälle).
  2) Maakuntapaketin jälkeen `node tools/vienti/maakuntarajat.mjs --paivita` worktreessä ja commit #4140:ään.
  3) Viivatason osoitinvaihto (viivataso-2026-10-07.json) Julkaisijalla.
  Sisältökirjurille [de21d1] on pyydetty CYP "Kyproksen pohjoisosa" -luonnehdinta ja pulu omaan PR:äänsä.
- **Talvi2 VALMIS 13.46**, kuvapari PT:lle (`kuvapari-talvi2-20261007.jpg`). Odottaa PT:n kuittausta, jonka jälkeen talvipaketti: `kokoa-kausi.py talvi v1 <paketti> <talvi2/laatat> "<kuvaus>"` (talvella ei rengasta).
  Kysytty PT:ltä: pidetäänkö Perämeren jää vai palautetaanko avomeri MERI-väriin.
- **Kevät rivit 13–17** ajossa (alkoi 13.46, noin 2,5 h) → `s2-eurooppa-kevat-pohjoinen2` + `kausi-rengas/kevat-pohjoinen2`. Sitten kuvapari (sarake kevat2) ja kevätpaketti.

---

# TILANNE 7.10. klo 13.1x (TAUKO 13.45–15.00)

- **WORLDVIEW KUITATTU (PT 13.0x, koko _swe).** PR https://github.com/ravelius/Matkakirja/pull/4140 (haara karttaseppa-raja-worldview).
  Vientipyyntö Julkaisijalle 13.0x:
  1) `_valmiit/raja-worldview-vienti-20261007` (--kuiva ok).
  2) Tuotannon `julisteet/pyramidi/pyramidi.json`:n viivataso-kenttä = `pyramidi-poltto/worldview-2026-10-07/viivataso-2026-10-07.json`.
  3) `_valmiit/natiivi-maarajat-vienti-20261007` (.geojson-MIME puuttuu vie-paketti.sh:sta).
  4) PR #4140:n merge vientien jälkeen.
  LS2:lle lähetetty 13.0x vakiot junaan 161 (KorkeusVersio/WebVersio 2026-10-07-swe(-korkeus), Maaraja-polut 2026-10-07).
  Kun Julkaisija ilmoittaa viennin valmistuneen: viesti LS2:lle, että sarjat ovat ämpärissä.
- **SEURAAVA TYÖ (PT): admin-1 CYP.** Kyrenia omaksi alueekseen, pohjoiset osat Famagustan ja Nikosian alueisiin, Kyrenian sisältö Sisältökirjurille.
  MAR ja SOM myöhemmin (VAIN EUROOPPA). Tarkista lisäksi, että maahaku käyttää admin-0:aa (worldview) eikä maakuntadata ohita sitä.
  **PT 13.1x:** ensin C = Kyproksen avoin data (CC BY 4.0, piirikuntarajat). Jos sitä ei löydy, D = NE:n pohjoinen alue yhtenä CYP-alueena nimellä "Kyproksen pohjoisosa". A (ODbL) ja B (SALB) EIVÄT KÄY.
  LS2:n natiivivakiot ovat valmiina: proto linssiseppa2/swe-rajat 95cf8eb97. Kun sarjat ovat ämpärissä, viesti LS2:lle; jos LS2 on tauolla, SHA Natiivisepälle junaan 161.
  Tilanne 13.07: 2026-10-07-swe-korkeus on ämpärissä, swe ja geojsonit eivät vielä.
  **LÄHDEONGELMA (13.0x):** NE admin-1:ssä Pohjois-Kypros on yksi alue ilman piirikuntia. geoBoundaries gbOpen (OSM) on ODbL, gbAuthoritative on UN SALB.
  Ensin etsitään Kyproksen avoin data (CC BY 4.0, Department of Lands and Surveys); data.gov.cy:n CKAN-API ei vastannut.
  Lähteet: `tools/vienti/maakuntarajat.json.gz` (NE admin-1, CYP 5 aluetta), `tools/tee-maakuntavektorit.mjs`, `tools/krim-ukrainalle.mjs` (admin-1-malli: krimUkrainalleAdmin1).
- **Talvi2 VALMIS 13.46** (169/169, `s2-eurooppa-talvi2/`): seuraavaksi ennen–jälkeen-kuvapari PT:lle (`kaudet/kuvapari.py nyt,talvi,talvi2 …`, rivit tukholma, laatokka, alta, skane, skandi, alpit), ja tarkista Tukholman sauma, lumeton laikku ja Laatokan reuna. Kevät rivit 13–17 alkoi 13.46 (irralliset, jatkuvat tauon yli). **Syksyn vienti** Julkaisijalla (51 109 / 57 630 klo 13.0x).

---

# TILANNE 7.10. klo 13.0x

- **WORLDVIEW-KORJAUS (PT 7.10., korkea prioriteetti), odottaa PT:n kuittausta, EI VIETY.** Juurisyy: natiivin
  `Vektorikerros.KorkeusVersio` "2026-09-25-gshhs-korkeus" on tehty ennen 30.9. Krim-korjausta, joten Perekopin viiva oli mukana.
  Uusi lähde on NE `_swe` (`tools/worldview.mjs`). Haara `karttaseppa-raja-worldview` fe4112c9b (worktree /Users/Shared/Claude/wt/).
  Aineistot ovat kansiossa `pyramidi-poltto/worldview-2026-10-07/`:
  vektorit-2026-10-07-swe (web), vektorit-2026-10-07-swe-korkeus (natiivi), maapolygonit.geojson, maamaa.geojson,
  lavastus-viivat (2 181 deltalaattaa → julisteet/pyramidi/2026-10-07-viivat/viivat/) ja viivataso-2026-10-07.json
  (luettelon uusi viivataso-kenttä: delta-perus 2026-09-27-viivat, laatastoon +2 bittiä). Kuvat ja laattalista: MUUTOKSET.md.
  Viivataso poltettiin worktreellä /Users/Shared/Claude/wt/karttaseppa-viivat-20261007 (30.9. koodi 9ec231e0c + uusi rajaviivasto, `--eipiirit`).
  Kohinalaatat (piirron reunanpehmennys) jätettiin vanhoiksi: rajaa-delta.py.
  Avoin kysymys PT:lle: maakunnat (admin-1) CYP (Kyrenia) ja MAR (Länsi-Sahara). Kuittauksen jälkeen: paketit _valmiit-kansioon,
  .geojson-MIME Julkaisijalle, JS-PR (PALLOVEKTORIT_VERSIO, maapolygonit.json) ja natiivin vakiot LS2:lle.
- **Talvi2** 146/169 (13.0x), kevät rivit 13–17 perässä. **Syksyn vienti** ämpärissä 51 109 / 57 630 (Julkaisija jatkaa).

---

# TILANNE 7.10. klo 12.0x (uudelleenkäynnistyksen jälkeen)

- **AJOSSA:** `kaudet/aja-talvi2.sh` (PGID 4645) jatkoi 11.56 tilasta 120/169. `aja-kevat-pohjoinen2.sh` (PGID 4649) odottaa sen VALMIS-merkkiä.
  Varmuuskopio `s2-eurooppa-talvi2/tila.varmuus.json` minuutin välein.
- **Syksyn vienti KESKEN:** ämpärissä 50 505 / 57 630 (osat 2/6 ja 3/6 puuttuvat lokista). Julkaisijaa pyydetty 12.0x ajamaan vie-paketti uudelleen.
  Valmistuttua: tarkista määrä (`aws s3 ls … syksy/v1 --recursive | wc -l` = 57 630), sitten viesti LS2:lle (natiivin kausivalinta).

---

# TILANNE 7.10. klo 10.5x (Macin uudelleenkäynnistys noin 11.05)

- **Talvi2 keskeytyy uudelleenkäynnistyksessä tilassa 97/169** (`s2-eurooppa-talvi2/`). Jatkuu `tila.json`:sta. Varmuuskopio `tila.varmuus.json` minuutin välein:
  jos `tila.json` ei ole ehjä JSON, kopioi varmuus sen päälle. **Uudelleenkäynnistyksen jälkeen** (T7 kiinni, `ps`: ei omia ajoja) käynnistä molemmat perl setsid -kaavalla kansiossa `kaudet/`:
  `aja-talvi2.sh` (ehdot täyttyvät heti → jatkaa) ja `aja-kevat-pohjoinen2.sh` (odottaa talvi2:n VALMIS-merkkiä). Talvi2:ta on jäljellä noin 3–4 h.
- **Syksyn vienti** `s2-eurooppa/syksy/v1/` ajettiin Julkaisijan taustalla 04.0x alkaen. Varmista Julkaisijalta, että se valmistui (laatat.json 200), ja ilmoita sitten LS2:lle.
  LS2 hyväksyi polun `s2-eurooppa/<kausi>/v1` (kaudet syksy, talvi, kevat) ja tekee natiivin kausivalinnan.
- Talvi- ja kevätpaketit: `kaudet/kokoa-kausi.py talvi v1 …` ja `kevat v1 …` kuvaparien ja PT:n kuittauksen jälkeen.

---

# TILANNE 7.10. klo 04.1x

- **AJOSSA (irralliset, perl setsid):**
  1) `kaudet/aja-talvi2.sh` (PGID 75430) alkoi 04.03 → `s2-eurooppa-talvi2/` (169 lohkoa, ei rengasta), valmis noin klo 10 (`aja-talvi2.out`).
  2) `kaudet/aja-kevat-pohjoinen2.sh` (PGID 76237) odottaa talvi2:n VALMIS-merkkiä ja ajaa sitten kevään rivit 13–17 (JÄRVI) →
     `s2-eurooppa-kevat-pohjoinen2/` + `kausi-rengas/kevat-pohjoinen2/` (PT 7.10. 02.xx). Arvio noin 2,5 h.
- **Syksy A2 VALMIS 04.02** (`s2-eurooppa-syksy-A2/` + `kausi-rengas/syksy-A2/`), kuvapari `kuvapari-syksy-A2-20261007.jpg` lähetetty PT:lle.
  Järvet ovat kunnossa. Tilkkuja on vielä vähän (Pohjois-Lappi 67,5° N, Ruotsin keskiosa), ja Lokka on ruskea. Ehdotettu vientiä, tilkut seuraavalle kierrokselle.
- **SYKSYN VIENTIPAKETTI VALMIS (PT kuittasi vientiin 04.xx):** `proto-3d/_valmiit/s2-eurooppa-syksy-vienti-20261007`
  → `linssit/astronautin-kamera/s2-eurooppa/syksy/v1/` (sama jako kuin v2; 57 629 laattaa + laatat.json; --kuiva ok).
  Polku kysytty LS2:lta 04.4x. Kun LS2 kuittaa (tai PT hyväksyy), Julkaisija vie. Työkalu `kaudet/kokoa-kausi.py <kausi> v1 <paketti> <kerrokset> "<kuvaus>"`.
- **TALVI2-koodi (testattu 4 + 2 lohkolla):** lumi ensin (> 53° N) ja lumen mediaani leveysasteliukumalla 54→57° N.
  Isot järvet jäätyvät kokonaan NE-järvimaskilla (`ne_10m_lakes`; 0,9 × JAA + 0,1 × S2). Pienet järvet: tumma pikseli → JAA.
  Jäätyviin järviin ei sumeaa vesiväriä. Vuonoissa jää-sääntö ohitetaan S2-maalle 3 km:n päähän rannasta, ja talven rantasumennus on 0,2–1,2 km.
  Kuvat `kuvapari-talvi2-testi-20261007.jpg` ja `kuvapari-talvi2-jarvijaa-20261007.jpg`.
- **Valmistuttua:** kuvaparit ennen ja jälkeen PT:lle (`kaudet/kuvapari.py`; sarakkeet talvi, talvi2, kevat; kevät-pohjoinen2-sarake lisättävä).
  PT:n tarkistettavat talvi2:ssa: Tukholman z7-pystysauma, lumeton laikku vasemmassa alakulmassa ja Laatokan reuna. Jäännökset kirjataan seuraavaan kierrokseen, eivätkä ne estä vientiä.
- PT 7.10.: junakäännökset ajavat nice 0/10, eikä karttaajoja tarvitse enää pysäyttää käännösten ajaksi.
- Hylätyt kansiot (talvi 6.10., syksy-sovitus, syksy-sovitusA) poistetaan vain luvalla.

---

# TILANNE 6.10. klo 23.4x (TILINVAIHTO, omistaja)

Euroopan kaudet (kevät/syksy/talvi), PT:n kuvaparierä. **Mitään ei ole viety.** T7 = `/Volumes/T7 4TB/Matkakirja-karttaseppa`.

- **AJOSSA (irrallinen, perl setsid, PGID 6564):** `iss-eurooppa-s2/kaudet/aja-syksy-sovitusA.sh` → syksyn rivit 13–19 (91 lohkoa)
  kansioon `s2-eurooppa-syksy-sovitusA/`, sitten rengas → `iss-maailma-s2/kausi-rengas/syksy-sovitusA/`. Valmis noin klo 0.30.
  Tila: `kaudet/aja-syksy-sovitusA.out` (VALMIS/VIRHE). Uusintakierrokset sisältyvät skriptiin.
- **Seuraava askel:** kuvapari PT:lle samoilla riveillä kuin `iss-eurooppa-s2/kuvapari-kaudet-20261006-b.jpg`
  (Alpit z7, Skandinavia z6, Pohjois-Lappi z7 (23, 69,3), Lappi z8 (20, 68,5); nyt/kevät/syksy). Syksyn kerrokset:
  `kausi-rengas/syksy-sovitusA : s2-eurooppa-syksy-sovitusA/laatat : kausi-rengas/syksy : s2-eurooppa-syksy/laatat`.
  Kevään kerrokset: `kausi-rengas/kevat-pohjoinen : s2-eurooppa-kevat-pohjoinen/laatat : kausi-rengas/kevat : s2-eurooppa-kevat/laatat`.
  Kuvaparin teko-ohjelma löytyy transkriptista. Lyhyesti: z(L, zoom, lon, lat, nx, ny, T) liittää laatat ensimmäisestä kerroksesta, josta laatta löytyy.
  `kaudet/nak.py` piirtää alueen lon/lat-ruudukolla.
- **Tehty 6.10.:**
  - `kausimosaiikki.mjs`: POHJ-sääntö. Yli 65° N:n ruuduissa keväällä ja syksyllä haetaan vähälumiset näkymät myös kauden jatkeelta, ja lumi painaa kolminkertaisesti.
  - Kevät ja syksy, rivit 13–16 → `s2-eurooppa-<kausi>-pohjoinen` + `kausi-rengas/<kausi>-pohjoinen`. Kevään Lapin lumineliöt ja jäinen Torneträsk ovat poissa; PT hyväksyi kevään.
  - MAASOVITUS (`MAASOVITUS=1 RUUDUT=…`): A sovittaa ruudun näkymät ruudun mediaaniin (poistaa ratarajat). B on ruutujen välinen ketjusovitus.
    B ajelehti itään (Venäjä punaruskea, Laatokka purppura), joten se HYLÄTTIIN; ajetaan vain `SOVITUS_B=0`.
    Hylätyt kansiot `s2-eurooppa-syksy-sovitus/` ja `kausi-rengas/syksy-sovitus`; poistetaan vain luvalla.
  - Jälkikäteinen `kaudet/ruututasaus.mjs` (kerroin/affiini) HYLÄTTIIN: UTM-päällekkäisalueet katkaisevat ketjun, ja syntyi pystyraitoja.
- **Talvi:** uusinta valmis 6.10. klo 22.27 (169/169, `s2-eurooppa-talvi/`). Talvea ei ole vielä katsottu eikä kuvaparitettu.
- **Kanadan meri (korjaus5):** jäi viemättä (PT). LS2 sävyttää sovelluksessa BMNG:n meren S2:n MERI-väriin (haara linssiseppa2/s2-meri 0f6e4e89).
  Paketti on arkistoitu T7:lle `iss-maailma-s2/korjaus5-ei-viety-20261006/` (pois `_valmiit`-kansiosta).
- **Avoimet:** PT:n päätös syksyn kuvaparista, ja sitten omistajan päätös kausista. Kausien vienti on suunnittelematta (polut, LS2).

---

# TILANNE 6.10. klo 11.0x

- **VIETY 5.–6.10.:** S2-maailma v2 kaikki alueet + laatat.json (tropiikki 5.10. 18.04); v2-korjaus (rengas) 5.10. 19.04;
  s2-eurooppa/v2 (rengas) 5.10. 19.42; **s2-maailma/v2-korjaus2** 6.10. 11.01 (4 aluetta, 303 496 laattaa: WorldCover-tasaus,
  järvisääntö, rengas + PIKKU). S2-indeksi v2b, v2c, v2d, v2e (Meksikon suisto rata X).
- **Paikalliset:** v2-korjaus2b/ (viety sarja), v2t2/ (tasaus 2), v2-rengas3/; tasaus.mjs, tasaus-kentta.mjs, rengas.mjs.
  Vanha kesken jäänyt kansio v2-korjaus2/ jäi T7:lle, ja sen poisto odottaa lupaa (turvatarkistus esti rm:n).
- **Korjauskerrokset (6.10. 11.36, Julkaisija):** s2-maailma/v2-korjaus3/ (Eyre, 14) ja s2-eurooppa/v2-korjaus1/ (Madeira, 10).
  LS2:n natiivi lukee ketjun v2-korjaus3 → v2-korjaus2 → v2 ja Euroopan kerroksen (9479a9ee), joten pienet korjaukset menevät
  jatkossa uutena kerroksena (v2-korjaus4, v2-korjaus2 jne.) vie-paketti.sh:lla.
  Työkalut: paikka-otto.mjs (selkeät otot, pikselikohtainen valinta) ja PIL-viimeistely, koska jpeg-js tummentaa noin 1 DN per kierros.
- **6.10. 12.08 viety (Julkaisija):** s2-maailma/v2-korjaus4/ (Amazonin itäkaista + Sumbawa: sauma.mjs ja kaista.mjs, 161 laattaa) ja
  S2-indeksi v2f (11RQQ:n varakuvan savy). v2f:n osoitinvaihto (LS2) vasta junan 147 VIE:n jälkeen; v2-korjaus4 LS2:n ketjuun junassa 149.
- **Jäännökset (PT: ei uusia kierroksia):** Amazonin ja Sumbawan ohuet saumaviivat (mosaiikin reunajuova). S2-erät ovat suljettu.
- **Työkalut:** tasaus.mjs, tasaus-kentta.mjs, rengas.mjs, paikka-otto.mjs (selkeät otot), sauma.mjs (saumapehmennys),
  kaista.mjs (monikulmiotasaus) ja viimeistele-png.py (PIL-pakkaus ilman 1 DN:n vinoumaa, aina viimeinen vaihe).

---

# TILANNE 5.10. klo 06.5x (LOPULLINEN, tilinvaihto 99 %)

- **Tropiikki v2e:** osa-ajot PID 45738/45742/45745/45748, kukin noin 12/47 lohkoa (yhteensä 8 + 47 = 55/196). Noin 14 min per lohko per osa → valmis noin klo 15–16.
  Valmistuttua: tilat yhteen, tarkistus, kuvapari Karibia + Indonesia PT:lle, sitten `touch iss-maailma-s2/v2/tropiikki/tarkistettu.ok` → omistajan vienti (PID 4918) vie ja kirjoittaa laatat.json → ilmoita LS2:lle (polun vaihto luvallinen) ja rivi PT:lle.
- **Korjaussarja v2e:** P-Afrikka 10/10 ja Aasia 28/28 valmiit; Amerikka 48/68 (PID 34664).
- **S2-indeksi v2b (sävytasaus):** `aja-v2b.sh` PID 80467, tropiikki 1 600/1 802, sitten eurooppa → P-Afrikka → amerikka → aasia (valmis noin klo 8–9).
  Sitten `VERSIO=v2b python3 maailma-json.py`, kuvapari v2 vs. v2b (`tci-kooste.mjs` soveltaa savy-kenttää) PT:lle ja vienti vie-paketti.sh:lla polkuun `s2-indeksi/v2b/` (LAHTEET.md). LS2:n koodi on valmis, ja hän vaihtaa version kuittauksen jälkeen.
- **S2-indeksi v2c vaihe 1 (ehdokkaat):** `aja-v2c-ehdokkaat.sh` PID 25172, eurooppa 400/2 177, valmis noin klo 10–11. Vaihe 2 (naapurisovitus + avomeren himmein kohtaus) on kirjoittamatta, ks. alla.
- **Euroopan kausiketju:** syksy 48/169 (PID 13778), sitten talvi uudella koodilla.

---

# Karttasepän luovutus 5.10.2026 klo 06.0x (viikkoraja 97 %, tilinvaihto noin 07.15)

Ajot jatkuvat ilman sessiota. Ne on käynnistetty perl fork+setsid -kaavalla. Tarkista `ps` ennen uudelleenkäynnistystä, ja lopeta prosessi vain omalla PID:llä.
Vanhemmat vaiheet: `viesti-karttaseppa-luovutus-20261002.md` (päivitykset 2.–4.10.).

## VALMIIT JA VIEDYT (ei toimia)

- **Kuvauspaikat v1:** 25 paikkaa, `linssit/astronautin-kamera/kuvauspaikat/v1/`. LS2:n natiivi käyttää niitä.
- **S2-indeksi v1:** `s2-indeksi/v1/maailma.json` + 5 alueindeksiä.
- **S2-indeksi v2 (5.10. 06.3x):** `s2-indeksi/v2/`. Aukollisiin ruutuihin lisätty toisen radan kuva (rata luetaan tuotenimestä `_R###_`). Aukollisia ruutuja 3 269 → 1 215. LS2 vaihtaa `S2Maailma.Versio` → v2.
- **S2-maailma v2 (BOA-offset v2d + merijää v2c):** Amerikka, P-Afrikka ja Aasia+Australia viety polkuun `s2-maailma/v2/` omistajan skriptillä `pyramidi-poltto/vie-s2-maailma-v2.sh` (PID 4918). Skripti odottaa tropiikin tarkistusmerkkiä `iss-maailma-s2/v2/tropiikki/tarkistettu.ok` ja kirjoittaa sen jälkeen `laatat.json`:n.
  - Päätoimittaja hyväksyi lopputarkistuksen.
  - LS2 saa vaihtaa polun, kun tropiikki ja laatat.json ovat ämpärissä. Ilmoita silloin LS2:lle suoraan ja rivi Päätoimittajalle.
- **Eurooppa:** s2-eurooppa/v1 on ehjä (v2 = v1 pikseleittäin), ei uutta vientiä.

## KÄYNNISSÄ

- **Tropiikki v2e** (koko alue uudelleen, PT:n päätös): 4 osa-ajoa, PID:t 45738, 45742, 45745 ja 45748. Ne kirjoittavat kansioon `iss-maailma-s2/v2/tropiikki`.
  - Osat: `osa{0..3}.txt` ja tilat `tila-osa{0..3}.json` (env `TILATIEDOSTO`); 8 ensimmäistä lohkoa ovat `tila.json`:ssa.
  - Tilanne klo 06: noin 7–8/47 per osa; yksi lohko kestää noin 14 min, valmis noin klo 17–18.
  - Valmistuttua: tarkistus (`esik.py`-malli + z8-otokset Karibia ja Indonesia), kuvapari Karibia + Indonesia PT:lle, sitten `touch v2/tropiikki/tarkistettu.ok`, jolloin vienti jatkuu automaattisesti.
- **Korjaussarja v2e** (läikkäkorjaus jo viedyille alueille): `iss-maailma-s2/v2e/<alue>`, lohkolistat `koe-laikka/listat/<alue>-10.txt`.
  - P-Afrikka 10/10 valmis. Amerikka (PID 34664, 35/68) ja Aasia (PID 34672, 22/28) ajavat nice 19:llä.
  - Valmistuttua: kuvapari PT:lle, sitten `touch v2e/tarkistettu.ok` ja omistajan Run-rivi `pyramidi-poltto/vie-s2-maailma-v2-korjaus.sh`. Skripti vie polkuun `s2-maailma/v2-korjaus/` ja kirjoittaa `korjaus.json`:n (bittikartta, `v2e/korjaus-json.py`).
  - Run-rivi: `cd /Users/Shared/Claude/pyramidi-poltto && perl -e 'use POSIX "setsid"; exit if fork; setsid(); open STDIN,"</dev/null"; open STDOUT,">>","vie-s2-maailma-v2-korjaus.log"; open STDERR,">&STDOUT"; exec "zsh","vie-s2-maailma-v2-korjaus.sh"'`
- **S2-indeksi v2b** (täytekiilan sävytasaus, PT 5.10.): `iss-s2-indeksi/aja-v2b.sh` (PID 80467) → `savytasaus.mjs <alue>` → `iss-s2-indeksi/v2b/`.
  - Valmistuttua: `VERSIO=v2b python3 maailma-json.py`, kuvapari v2 vs. v2b (20MRB, 20MRC, 28SCA + yksi Euroopan ruutu) PT:lle.
  - `tci-kooste.mjs` pitää laajentaa soveltamaan `savy`-kenttää ennen kuvaparia.
  - **Odota LS2:n laitekuvia (20MRC ja Kanaria) ennen vientiä.**
- **S2-indeksi v2b LAAJENNETTU (PT 5.10. 06.2x, LS2:n laitekuvat `lokit/linssiseppa2-maailma-10c31692/kuvat`).** Ongelmat: 20MRC lievä pystysauma ja samea täyte, 28SCA suorat heijastussaumat avomerellä, Meksikon suisto 11SPR (2024-08-27) vs. 11SQR (2023-07-01) vaalea suorakulmio.
  **PT:n järjestys 06.3x:** v2b = vain sävytasaus (osa 1, valmis noin 08), sitten v2c = osat 2 ja 3 (uusi polku `s2-indeksi/v2c/`, naapurin sama datatake, pisteet enintään noin 25 % huonommat). Kuvapari kummastakin PT:lle ennen LS2:n juuren vaihtoa (11SPR/11SQR, 20MRC, 28SCA + yksi Eurooppa).
  Osat:
  1) **Sävytasaus** täytekuvalle (käynnissä, `savytasaus.mjs`, kenttä `valinta.savy`).
  2) **Naapuriruuduille sama ottopäivä tai rata:** ehdokaslistat haetaan uudelleen (`s2-indeksi-v2.mjs`:n `ruutu()`-ehdokkaat tallennettava välimuistiin), sitten naapurisovitus. Valinta 0 vaihdetaan naapurin kanssa samaan datatakeen (sama päivä + satelliitti, tai sama rata), jos pisteet ovat enintään noin 25 % huonommat. Arvio 3–4 h STAC-hakuja.
  3) **Avomeren ruuduille vähäheijasteinen kohtaus:** mittaa TCI-yleiskuvan vesipikselien kirkkaus (tai käytä aurinkogeometriaa `view:sun_elevation`/`view:sun_azimuth`) ja valitse himmein.
  **v2c vaihe 1 KÄYNNISSÄ (06.3x):** `iss-s2-indeksi/aja-v2c-ehdokkaat.sh` → `s2-indeksi-v2c.mjs` (tallentaa `ehdokkaat` 20 kpl/ruutu) → `v2c/valinnat3*.json`, valmis-merkki `ajo-v2c-ehdokkaat.valmis` (noin 3–4 h). Vaihe 2 (kirjoitettava): naapurisovitus ehdokkaista ja avomeren himmein kohtaus → `v2c/indeksi*.json` + `VERSIO=v2c python3 maailma-json.py`.
  Lopuksi kuvapari v2 vs. v2b PT:lle (20MRB, 20MRC, 28SCA, 11SPR/11SQR + yksi Euroopan ruutu), sitten vienti vie-paketti.sh:lla. LS2 vaihtaa version.
- **Euroopan kaudet:** `iss-eurooppa-s2/kaudet/ketju-kaudet.sh` (PID 52116); syksy käynnissä (PID 13778, 41/169), sen jälkeen talvi.
  - Kausiskriptiin lisätty 5.10.: merimaski, napasäännöt, v2e ja kevään lumenvälttely.
  - Kevät valmis (169/169) ja pohjoiskorjaus (65 lohkoa) tehty. Tarkistettu: lumineliöt ja merijää poissa. Avoin: yksi Onegan suunnan järvi punertava.
  - Syksy ajaa vanhalla koodilla, joten sen napalohkot tarkistetaan valmistumisen jälkeen.
  - Talven käyttöönotosta päättää omistaja kuvaparin perusteella.

## SKRIPTIT JA OPIT

- **BOA-offset (v2d):** Earth Searchin 04.00-näkymistä osa on +1000 DN, eikä lippu ole luotettava, joten offset mitataan näkymäkohtaisesti. Muistissa: `s2-earth-search-baseline-04-offset`. TCI:hin vika ei vaikuta.
- **maailmamosaiikki-v2e.mjs** = v2d + v2c (merijää) + v2e (alle 200 px:n saaret eivät ole rannikkoa). Lisätilat: `DIAG04`, `MGRSLISTA`, `PIKKUSAARET` ja env `TILATIEDOSTO`.
- **vie-paketti.sh** ei ylikirjoita mitään, joten jokainen päivitys menee uuteen polkuun tai tiedostoon.
- **Isot laattasarjat** viedään omistajan Run-skriptillä (aws s3 sync). vie-paketti on liian hidas 91 000 laatalle.
- **Heredocit,** jotka kirjoittavat JS-koodia: aina lainattu `<<'PY'` ja `node --check` heti muokkauksen jälkeen (muisti `heredoc-js-lainaus`).

## AVOIMET

- **Tropiikki v2e, tunnetut jäännökset (PT hyväksyi vientiin 5.10. 17.0x, ei korjata nyt):**
  - Amazonin itäosan vaalea ratakaista (z8, noin 58–57° W, 1–2° N): tasauksen viite ESA WorldCover 2021 on itse usvaisempi itään päin.
  - Sumbawan suora maasauma (z8).
  - Palataan, jos löytyy parempi viite (esim. tuoreempi pilvetön S2-vuosikomposiitti).
  - Menetelmä: `iss-maailma-s2/tasaus.mjs` (k7-asetukset: SIGMA_M 1500, ALA 0,6, YLA 1,6, USVA 1,6, SINI 99, varakorjaus) ja K-kenttä `tasaus-kentta.mjs` (σ 250 km).
    Lisäksi järvet MERI-väriin, `rengas.mjs` (KYNNYS 0, pilvet merellä vedeksi) ja aukkotäyttö kahdella näkymällä (`maailmamosaiikki-v2e.mjs`, POISSULJE-env).
  - Alkuperäiset laatat: `v2/tropiikki/laatat-v2e-alkuperainen`.
- **S2-indeksi v2c (17.48) ja v2d (17.58) viety** (Julkaisija). v2d = v2c + Colorado-suisto: 11SPR ja 11RPQ valinta 0 = S2B 2025-07-30.
  11SPR:n maalle jää radan reunan sauma (märkä muta vs. kuiva suola), eikä savy (v2e) auta. LS2 tarkistaa simukuvasta.
  Jos sauma näkyy: koko 11SPR:n ja 11SQR:n länsiosan kattavat datatakit, esim. S2A 2022-10-22, S2B 2025-11-30 ja S2A 2025-01-09 (11SPR nodata 0, 11SQR 55 %);
  sauma siirtyisi Gran Desierton dyyneille. Tarkista myös 11RPQ ja 11RQQ.
- **Rengaskorjaus viety (PT hyväksyi 18.2x; omistajan Run `pyramidi-poltto/vie-rengaskorjaus-20261005.sh`):** s2-maailma/v2-korjaus/ + korjaus.json
  (P-Afrikka, Amerikka, Aasia, myös v2e-läikkäkorjaus) ja s2-eurooppa/v2/ (Euroopan jako, 36 167 korjattua). LS2:lle Euroopan polku vasta viennin jälkeen.
  Varmuuskopiot: v2e/<alue>/laatat-ennen-rengas.
- **SEURAAVA ERÄ (PT 18.2x, ei pidätä vientiä):**
  1) Madeiran itäosan paksu pilvi saarella: etsi selkeä otto ja ruudun uusinta Euroopan mosaiikkiin.
  2) Lanzaroten pohjoispuolen pistejono ja kaksi täplää: pilvihaamujen jäänteet. Rengaskorjaukseen pienet "maa"-komponentit merimaskin sisällä vedeksi.

- Bahaman suurten matalikkojen turkoosi puuttuu. PT toivoo batymetriaan perustuvaa ratkaisua myöhemmin.
- Aluekohtainen tci_lut (aavikko) tehdään LS2:n esimerkkikuvien perusteella.
- Saaret-haara ja Euroopan pyramidi z11: ennallaan, ks. 2.10. luovutus.

## 9.10. 07.3x

- Vasa-museon lähdepaketti LR:lle: `_tyo/karttaseppa/vasamuseet/` (OSM 150 m, 20 building:partia, mastoja ei OSM:ssä, maa GLO-30 noin 2–3 m EGM).
- Työkalut-PR #4256 (kohde-korkeus, giza-korkeudet, concorde-ign, vesipinta --pienet-pois). Merge → poista wt/karttaseppa-tyokalut3.
- Vesi pariisi3 + tukholma3 (LS2: pienet erilliset altaat pois) valmiina `_tyo/karttaseppa/vesi/`; vienti index-v4:llä odottaa LS2:n vastausta (koodiin v4-haku). Ajot: scratchpad aja-vesi-v4.sh, T7 vesimaski/pariisi-v3, tukholma-v4.
- Talvi3-loput: 27/33 klo 07.35, valmis noin 08.45 → ennen/jälkeen-kuvat PT:lle → paketti.

## 9.10. 10.5x

- Talvi3 valmis: loput ja uusinta 33/33. Suorat rajat olivat MGRS-ruutujen reunoilla, eivät lohkoilla, joten lohkotasaus hylättiin ja poistettiin. MGRS-ruututasaus (kaudet/aja-talvi3-ruututasaus.sh → T7 kausi-tasaus-talvi3) puolitti saumaeron (1,13 → 0,59). PT kuittasi, Iberia ilman tasausta (kausi-tasaus-talvi3-ei-iberia, kovalinkit).
- Paketti `_valmiit/s2-eurooppa-talvi-vienti-20261009` (talvi/v1, 521 Mt) Julkaisijalla; uusin.json ei kesken linna- tai simuajojen.
- Vesi index-v4 (pariisi3, tukholma3) viety 07.40. Liput LS1:lle (`kaupunki-*/liput-*.json`). Geotorget-vaiheet PT:llä (omistaja luo tunnuksen; LM_GEOTORGET_USER/PASS avaintiedostoon).
- PR:t #3105 ja #3108 suljettu (vanhentuneet).

## 9.10. 17.xx

- Kaukomaa v1 (PT: pallokierros): T7 iss-kuvauspaikat/kaukomaa/{pariisi,tukholma} (KAUKOMAA=1 kuvauspaikat-v2.mjs → kaukomaa-vesi.py → kaukomaa-paketti.py), paketti `_valmiit/kaukomaa-vienti-20261009` Julkaisijalla; LS2 kytkee aluskerrokseen. Työkalut PR #4256 (tools/kaukomaa).
- LS1: kirkot, kahvilat, hallit kohteet-<id>.json:iin (pbf-kohteet.mjs, relaatiot mukana), juna 173.
- Talvi/v1 ämpärissä 13.45, LS2 kytki (juna 173).

## 9.10. 18.xx

- Ilmakehä: kaupunki- ja kausikohtaiset taulukot (AERONET, `_tyo/karttaseppa/ilmakeha-aerosoli-20261009/`) LS2:n A/B-jonossa (varjokoe → KL:n AO → utu-A/B). Vienti vasta LS2:n hyväksynnän jälkeen. Työkalu PR #4256 (tools/ilmakeha).
- Vesi 40 km (PT kuittaa suosituksen): koeverkot `_tyo/karttaseppa/vesi-40km-koe/`, ajot T7 vesimaski/aja-vesi-v5.sh (tukholma-v5, pariisi-v4). Odottaa LS2:n LOD-valintaa (kauko2 48 m vai 16 m) → index-v5 (6 m kopioidaan uudella nimellä, koska tiedosto-kenttä on yhteinen).
- Kaukomaa v1 vienti käynnissä (Julkaisija), ja LS2 sai kytkentätiedot.
