# Linnanrakentajan luovutus 10.10.2026 päivä (06.3x–08.3x)

Edellinen: `viesti-linnanrakentaja-luovutus-20261010-aamu.md`. Haarat: työ `linnanrakentaja-tyo-20260929`, Olavinlinnan
blender.json `linnanrakentaja-linna-v45e` (worktree `/Users/Shared/Claude/wt/linnanrakentaja-linna-v45e`).

## Olavinlinnan paketit (kaksi lähdettä)

- **1499-asu**: `_valmiit/olavinlinna-blender-v44` (kuori ilman tornien yläosia, asu.json → rakennus.json asu "1499").
- **Nykyasu**: `_valmiit/olavinlinna-blender-v44-nyky` = symlinkit v44:ään, paitsi
  - `ulkokuori/`: v46p:n glb:t kartioineen + nyky-atlas (`linna-laatu/ulkokuori-v25-koe/nykyasu/`: nyky_atlas.py, kokoa_nyky.zsh), EI asu.json:ia
    (rakenna.mjs: tiedoston olemassaolo → "1499");
  - `kavely/`: symlinkit, paitsi osat.json + merkit.json (nyky_kavely.zsh → nyky_kavely.py: tornien 1790-l. yläosat vuosileikkauksina
    n1790-<torni>, "vuodesta": 1790, leikkaus:vain-1499-b-listaan). **Aja nyky_kavely.zsh aina, kun v44/kavely muuttuu.**
- Vienti: `zsh tools/dioraama/vie-blender.sh --lahde <kansio>` v45e-worktreessä → commit blender.json → `gh workflow run vie-dioraama.yml
  --ref linnanrakentaja-linna-v45e -f rakennus=olavinlinna -f kuiva=false -f osoitin=false` → hash lokista (scratchpad vie_molemmat.zsh -malli).
- Pelin leikkausraja 32 (SeikkailuKavely.LeikkauksiaMax): aina-leikkaukset (vain-1499-listat) ensin myös kävelyssä. v44: 14, nyky: 17;
  kappeli-kavely 13. Suositus Siirtosepälle: raja 48.

## Tehty

- **v46w** c6aac9f0680488a6 (1499): Kirkkotornin tiililaikku = leivottu tila `tilat/kappeli.glb` työntyi kuoren läpi (ei kävelyosa) →
  `olavinlinna-kavely-v1/lahde/tyokalut-lr/tornin_ulos_pois.py` (säde akselia kohti osuu kuoreen = ulkona; reunakolmiot jaetaan).
  Vesipohjat −7,02/−7,05 → −7,30/−7,35 (`vesi_alas.py`, kavely.py samoin; z-taistelu järven −7,0 kanssa). Valkoinen kallio = Siirtosepän koodi.
- **v46x-nyky** 66cd02861b568a52: nykyasun kuori + esihistorian 4 vaihemallia (`olavinlinna-vaiheet-v1/lahde/esihistoria.py`:
  kalliomaalaus, kota-nuotio −4000…−2200; haapiot, kaskisavu 300…1300; mantereella, paikat maastosta; värit sRGB-arvoina).
  Savu (liekki:/savu:-tyhjät) vaatii Siirtosepältä tyhjien luvun SeikkailuVaiheet.Rakennaan.
- **v46y** (kappelin kaariportaikko, PT kohta 4): kavely.py kaytava(seina=, leik_lev=), kaariportaat r 5,85 / leveys 0,85 / seinät 0,15,
  ampumakäytävän leikkaus ristiksi; kuoren leikattu ala tornilla 140 → 51 m²; reittipisteet siirretty (reittitesti scratchpad reittitesti.py:
  kaikki kävelypinnalla, vapaata 0,42–0,44 m). Ajo `tyokalut-lr/kaariportaat_v46y.zsh` (+ paikkaa_kappeli.py). Vanhat `v46x-talteen/`.
  **v46y-paketit (toimitettu Siirtosepälle 176:een 08.4x): NYKY c60e46eb73969b9a** (blender 0915a452f72cddd5, v45e 751d75cad; asu nyky,
  tornien n1790-vuosileikkaukset), **1499 d1a8ad15aeb7f0af** (blender 30fa12007ccfabe4, v45e 627c0da05).
- **Tukholman kaupungintalo**: Karttasepän v1s-pinnat → `tekoaly_koko.zsh sh v1s - pelkka-kohdistus` + `aja_tekseli_v1.zsh`, portti 0,
  lod0 6 840 / lod1 4 280 / lod2 1 296 kolmiota; arkki `stadshuset-v1/esikatselu/tekoaly-v1/sh_v1s_arkki.jpg`. LS2 teki testipaketin;
  PT: 176:een ASTC-ehdolla (LS2 vie). Avoinna: LS2:n sävyhuomiot (kupari vaalea?), LS1:n julkisivuvalo, omistajan kortti.

## Avoimet

1. (tehty) hashit Siirtosepälle ja PT:lle. Seuraavaksi: Siirtosepän arkki uusilla paketeilla → korjaukset.
2. Siirtoseppä: arkki v46w/v46x/v46y; savu-tyhjät; leikkausraja 48.
3. Eiffel v1 (LS2:n pari), ND v3d (omistajan kyllä), pp/RH/co LS2:n kuvat — kuten aamun luovutuksessa.
4. Karttaseppä 08.3x: Olavinlinnan veden väri `_tyo/karttaseppa/vesivari-olavinlinna-20261010/vesivari-kaudet-olavinlinna.json`
   (Kyrönsalmi kesä: syvä 0,001/0,003/0,005, matala 0,002/0,004/0,006 lineaarinen, 0,9 FNU; talvi epäluotettava, Haapavesi ei käytössä)
   → järven vesi-pinta (rakennuksen pinta "vesi" / LS2:n vesi) — sovitaan Siirtosepän/LS2:n kanssa, kuka kytkee.
5. Stadshuset: lansi = Karttasepän v2s (tornin pilkutus pois), muut v1s; glb:t päivitetty 08.3x, LS2 vie 176:een ASTC:nä.
6. LS2 08.3x pelikuvat (Matkakirja-linssiseppa-2 c2d26ff51, docs/raportit/kaappaukset/linssiseppa2-pitka-20261010/): **Eiffel v1 korjattavat**:
   esplanadin maa tasainen vaalea beige laatta peittää Champ de Marsin puistot (kirkas neliö) → maa pois tai Googlen väriin/leikkaus pienemmäksi;
   torni vaaleampi/punaruskeampi kuin Googlen tumma ruskea (lahde/eiffel.py RUSKEA0/1 tummemmaksi); 1. ja 2. kerroksen tasot sinisinä
   paneeleina (materiaali/väri). Préfecture v1, Riddarholmen v3b, Concorde v2: arkit prefektuuri-v1.jpg, riddarholmen-v3b.jpg, concorde-v2.jpg
   (katso ja korjaa). Kaupungintalon pelikuva tulee LS2:n seuraajalta.

## Seuraavan session järjestys

1) Eiffel v1:n LS2-korjaukset (kohta 6) → LS2:n uusi pari. 2) Préfecture/RH/Concorde-arkit (kohta 6). 3) Kaupungintalon pelikuva
(LS2:n seuraaja) → kalibrointi → omistajan kortti PT:n kautta; LS1:n julkisivuvalo, kun malli on pelissä. 4) Siirtosepän arkin löydökset.

## TEHTY 09.0x–09.1x (nollauksen jälkeen)

- **Eiffel v1b** (`_valmiit/eiffel-v1`, LAHTEET.md v1b-osio; v1 = glb-v1/, portti-v1/): maa + leikkaus 180 → 130 m (RMAA 65, vain tornin alle),
  maa asfaltti 64/64/72, torni RUSKEA 80/58/44 → 100/76/58, LASI 60/55/54 (ei sinisiä tasoja), KIVI 112/106/98. Portti 0, sha256 lod0/1/2
  6038b4986ff0dc26 / 7820285784e0028d / 048f788fc3027fa8. LS2 paketoi (v6hk3-eif1b) → pari + RGB-mittaus simuvuorolla ~09.45 jälkeen.
- **Préfecture v1b** (`_valmiit/prefektuuri-v1`, LAHTEET.md v1b; v1 = glb-v1/, tekstuurit-v1/, tekoaly-v1-tekseli-v1/): kalibrointi_v1b.json
  (aja_tekseli_v1.zsh oletus; KAL=kalibrointi_v1.json = v1): liuske 92/95/102, kalkkikivi 173/160/146; sininen kaista = matalat katokset z 4,5 m
  (liuske, tekoälykuvan sininen) → uusi `projisoi_tekseli.py --kalibroi` -avain "sininen" (kyll, z_max suhteessa helman pohjaan z0, materiaalit);
  pinnat.py: asfaltti 86, jalkakäytävä 134/131/125 → prefektuuri.py uudelleen (geometria sama). Portti 0, lod0/1/2 5bd4a33cdc58c90b /
  b343e447c5d9efe9 / 7725b1ebf0445a7a. LS2 paketoi (v6hk3-nd3c-pp1b) → pari samalla vuorolla.
- RH v3b ja Concorde v2: LS2:n arkeissa kunnossa, ei muutoksia.
- Olavinlinnan veden väri: kysytty Siirtosepältä, kytkeekö hän (ehdotus: hän kytkee LS2:n vesivarjostimen kaavalla, minä vien vain tarvittaessa).

## Seuraavaksi
1) LS2:n parit Eiffel v1b + Préfecture v1b → säätö mittausten mukaan → PT. 2) Kaupungintalon pelikuva (LS2) → kalibrointi. 3) Siirtosepän arkki + vesivastaus.

## TEHTY 09.1x–09.4x: v46z (PT kiireellinen 176)
- Komero (−20,7, 8,1, −11,1; kirkkotorni-portaiden lattia 8,05) vaihteli kirkkotorni-portaat ↔ kappeli-kavely: Askelaani.Osa = pienin laatikko,
  pystyvara 1 m, kappeli-kavelyn rajat.min y 9,2 → kynnys 8,2. Korjaus: alaraja = alin kävelypinta 9,6 (kavely.py RAJAT_ALA; v44/kavely/osat.json
  paikattu, nyky_kavely.zsh ajettu; vanha osat.json `olavinlinna-kavely-v1/v46y-talteen/`).
- **PALA 1499 4e464f44e51710f8** (blender c6005f962ea35714, v45e b51e47c0c), **NYKY b4cd41abc499dbde** (blender 1cebd2b3fbfa7978, v45e 161c104de).
  Hashit Siirtosepälle ja PT:lle. n1790-leikkaukset nykyssä ranta-1499:n leikkauksissa (Siirtoseppä kysyi). Siirtoseppä kytkee vesivärin itse.
- Siirtosepän arkki: v46w:n vaaleat rantakivet hämärässä liian kirkkaat (ei kiire) → seuraava Olavinlinna-erä.

## TAIDEMUSEO, Alankomaat-sali (PT 09.5x, omistaja: museo Pekingin edelle) — tila 10.0x
- Yhteinen runko `proto-3d/_valmiit/taidemuseo-runko/lahde/`: runko.py (Sali: osat, aukot, teospaikat + valokeilat, veistospaikat,
  tekstitaulut, kehysprofiilit cm, reitti → sali.json), sali_blender.py (geometria; --lod, --esikatselu = kehykset + paikkamallit kuviin,
  --ei-vientia), valot.py (yhteiset valot), sali_kuvat.py (Cycles-kamerat), leivo_sali.py (yhdistää, UV1 "valo", DIFFUSE-leivonta,
  koodaus E_lx = näyte_lin × 600, kalibrointi 150 lx, vienti glb + valot/sali-lod<L>.jpg).
- NL: `taidemuseo-alankomaat-v1/`: lahde/alankomaat.py → sali.json (15 osaa: Veistosaula, Mauritshuis m1–m3 damasti, Kunniagalleria kg
  ristiholvi 4 jaksoa + 8 komeroa, Yövartio-sali yv, Leidenin antiikkisiipi; 54 teospaikkaa, 5 grafiikkaa, 20 veistospaikkaa, Rijks-ehdotukset),
  tekstuurit (Sonnet-agentti, lahde/tekstuurit_nl.py; `python3 tekstuurit_nl.py pilari` = vain yksi).
- LS1 (Linssiseppä) rakentaa esitysmoottorin sali.jsonia vasten (skeema hyväksytty; kehykset hän pursottaa profiileista, valot analyyttisesti).
- Arkki PT:lle: docs/raportit/kaappaukset/linnanrakentaja-museo-20261010/taidemuseo-nl-v1-arkki.jpg (c246f4eac). Odottaa PT:n hyväksyntää →
  vienti (ASTC: proto-3d/tyokalut/astc-mip.swift valot/*.jpg) → LS1.
- Seuraavaksi Peking (omistaja 09.3x: koekaupunki 2 × 2 km), Karttasepän paketti proto-3d/_tyo/karttaseppa/peking-20261010/lr/LUEMINUT.md.
- Siirtoseppä: kiinni 70 kaatuu portaat-vartijan takia (PT päättää: vartijan partio LR vai testiajuri Siirtoseppä) — älä tee ennen PT:tä.

## TEHTY 10.0x–10.1x: NL-sali v1 VIETY LS1:lle (PT hyväksyi 10.0x)
- `proto-3d/_valmiit/taidemuseo-alankomaat-v1/` (LAHTEET.md): glb/sali-lod0.glb 13 k / lod1 7,8 k, 18 materiaalia, UV0 + UV1; valot/sali-lod{0,1}.jpg
  (4096/2048) + -4x4.astcm; koodaus E_lx = näyte_lin × 1200 (leivo_sali.py: metallit 0 leivonnan ajaksi, sRGB-koodaus itse, oletusnäkymä tyhjäksi).
  Tarkistus: scratchpad atlas_tarkistus.py (albedo × atlas, glTF-tuonnissa UV1 = uv_layers[1]).
- PT:n jatkohuomiot: 1) Kunniagalleria tumma → LS1 varmistaa teokset ~150 lx puhelimella (lisää atlakseen täyttöä tarvittaessa);
  2) v2: Veistosaulaan ja Leidenin siipeen listat, ovenpielet ja tunnistettava yksityiskohta, kun patsasmallit tulevat.

## PEKING (PT 10.2x, sitova) — tila 10.3x
- MUOTO: koko alue omina Blender-malleina GLB-laattoina kuten ND/KL (ei dioraama, ei Cesium-laattoja); ENU-origo Karttasepän paketista
  (Taihedian 39.915896, 116.390814). Kielletty kaupunki tarkkana (toistuvat osat yksi mesh per tyyppi, jaettu materiaali), hutongit kevyinä
  massoina + yhteinen julkisivu-/kattoatlas. Karttaseppä tekee LS2:lle maan pohjakuvan, veden, kadut ja yövalot samaan origoon.
- RAJAUS: x −1 100…+1 100, y −1 750…+1 250 m Taihedianista (Beihai, Jingshan, KK, aukio mausoleumiin; Qianmen pois).
- MAON MUOTOKUVA: EI eikä tyhjää kehystä (elävän taiteilijan teos, ei poliittista kannanottoa); iskulausetaulut ilman tekstiä tai pois.
- Pohjatyö proto-3d/_tyo/linnanrakentaja/peking/: lahde/luokittele.py (15 503 → luokat, data/peking-luokat.json, esikatselu/luokat.png),
  monumentit.py (17 maamerkkiä käsin, mitat A → Sisältökirjuri tarkistaa: _tyo/sisaltokirjuri/peking-mitat-20261010/), pihatalot.py
  (硬山-siivet, 四合院-pihat isoista pohjista, ~73 kolmiota/talo), esik_pihat.py (EEVEE-koekuva). Seuraavaksi KK-hallit kk_halli-pohjalta + laatoitus.
- (11.0x) PEKING v1 VIETY LS2:lle: _tyo/linnanrakentaja/peking/glb/ 24 laattaa (550 × 500 m, i 0–3 itään, j 0–5 pohjoiseen) × lod0/1/2,
  laatat.json, LAHTEET.md, esikatselu/tarkistusarkki-v1.jpg. Ajo: Blender -b --factory-startup -P lahde/rakenna.py -- --laatta i j --vienti glb
  (tai --alue x0 y0 x1 y1 --esikatselu kansio --kamerat ilma,taihedian,...). hallit.py: KK OSM-osista (osat_rakennus; L/U-katot suorakaiteiksi
  luokittele.suorakaiteet), muut parametrit_pohjasta; GloBFP ohitetaan KK:n sisällä. ANSA: pinnat.py:n tavukuvan pixels on sRGB-koodattua.
  Seuraavaksi: puut, maamerkit Sisältökirjurin mitoilla (pylväiköt), LS2:n Eiffel-maa (~115/110/104 himmeä) ja Kaupungintalo (lyhty + 3 kruunua,
  tornin vaakatanko pois, ikkunat epäsäännöllisemmiksi, tiili ~110/60/50, sisäpiha) — LS2 10.10. parit docs/raportit/kaappaukset/linssiseppa2-176-20261010/.
- (11.5x) TEHTY: Peking v1c (puut.py: ~16 000 puuta OSM-puista, metsistä, puistoista + kukkulat, katupuut; aukio avoin, puut.AUKIOT),
  portti 0 virhettä, LS2:lle; Eiffel v1d (maa 95/91/87, LS2: v1c pelissä 125/117/102); Kaupungintalo v2 (tornin kruunu: lyhty + kruunut,
  epäsäännölliset ikkunat, tiili 112/58/48, piha 158/154/146; aja_tekseli_v2.zsh) LS2:lle. LS2 nollattiin 11.4x: seuraava LS2 kuvaa Pekingin ensin
  (PT:n järjestys), vaakatanko-tieto tulee silloin. Seuraavaksi: maamerkit Sisältökirjurin mitoilla (_tyo/sisaltokirjuri/peking-mitat-20261010/).
- (12.0x) Peking v2 LS2:lle: maamerkit Sisältökirjurin mitoilla (monumentit.py v2, monumentit_geom: pylväiköt aukiolle, mausoleumi,
  nuolitornin aukot, stupa, pyöreät/8-kulmaiset Jingshanin paviljongit, uusi materiaali katto_sininen). Talteen glb-v1c/. Eiffel v1d (maa 95/91/87).
  Odottaa: seuraavan LS2:n Peking-pari Googlea vasten → säätö.
- (12.3x) Peking v2b LS2:lle (PT 11.1x -lista tehty): pihapuut (pihatalot.PIHAT), julkisivut julkisivu/_b/_c/_d (crc32(id) % 5),
  Karttasepän päivitetty paketti 10.4x (47 hallia/porttia raakakorkeudella; vanha lr-ennen-hallit/) → luokittele.py ajettu uudelleen. Talteen glb-v2/.
  Worktree linnanrakentaja-linna-v45e poistettu (Postivahti). JONO: LS2:n Peking-pari → säätö; taidemuseon NL-sali v2: Sisältökirjurin 35 patsasta
  _valmiit/taidemuseo-alankomaat-patsaat-vienti-20261010/.../patsaat/glb/ (patsaat.json, CC BY -krediitti) + 13 grafiikkaa/valokuvaa
  _valmiit/taidemuseo-alankomaat-grafiikka-vienti-20261010/.../teokset.grafiikka.v2.json (pienet → komerot/kabinetit); dekimointi + pakkaus meillä.

## SEURAAVAN SESSION JÄRJESTYS (nollaus 10.1x)
1) **PEKING** (omistaja 09.3x: koekaupunki ~2 × 2 km: Kielletty kaupunki, Jingshan, Beihai, Tian'anmen, hutongit; poikkeus ei avaa muuta
   Euroopan ulkopuolista). Lue `proto-3d/_tyo/karttaseppa/peking-20261010/lr/LUEMINUT.md`. Mallinnuspohja peking-kielletty-kaupunki-enu.json
   (405 rakennusta + 1 086 osaa, korkeus/räystäs/kattomuoto/väri, ENU-origo Taihedian 39.915896, 116.390814; ÄLÄ käytä GCJ-02-koordinaatteja).
   Ennen mallinnusta: kysy PT:ltä muoto (dioraama kuten linna vai Cesium-omat mallit kuten ND/KL?) ja Raamatun Kielletyn kaupungin aiempi linjaus
   (`grep -n "KIELLETTY KAUPUNKI" js/tyohuone-raamattu.js`); PT:n ehdot kuten Eiffel (toistuvat osat yhtenä meshinä, jaettu materiaali).
2) LS1:n palaute NL-salista (valotaso, muisti) → säätö. 3) NL v2 patsaiden tultua. 4) LS2:n parit Eiffel v1b + Préfecture v1b → säätö → PT.
5) Siirtoseppä/PT: kiinni 70 (portaat-vartija) — vain jos PT antaa LR:lle.
- (10.1x) Sisältökirjuri: patsaiden metatiedot `proto-3d/_tyo/sisaltokirjuri/taidemuseo-alankomaat-20261010/patsaat/` (16 CC BY -mallia meta/ + esikatselu/,
  RMO Leiden rmo_leiden_lista.json 50 mallia, 44 CC0). GLB-lataus vaatii kirjautuneen Sketchfab-tilin (API 401) → PT/omistaja; LR ei luo tiliä
  eikä kirjaudu. Kun mallit tulevat: lisenssisivu + tekijä talteen (CC BY -krediitti näytölle) → NL v2.

## SEURAAVAN SESSION JÄRJESTYS (nollaus 12.5x, PT 11.4x)
1) **ND v4b sävy (omistajan palaute, VIETY LS2:lle 12.5x):** proto-3d/_valmiit/notre-dame-v1/tekoaly-v4b (kalibrointi_v4b.json, aja_tekseli_v4b.zsh;
   LAHTEET.md "v4b"). Kivi 150/148/142, lyijy 142/148/154, ylöspäin osoittavat kivipinnat 146/150/152 (projisoi_tekseli.py uusi avain 'ylospain'),
   AO 1,0. Odota LS2:n pari oikeaa ilmakuvaa vasten (omistaja-20261010/nd-savy/ PT:n checkoutissa). Vertailu v4b: katot −22 %, ulokkeet −38 %,
   ulokkeet/katot 0,69 vs oikea 0,87 → jos pelissä yhä liian tumma: AO takaisin 0,8 ja ylospain-tavoite ~160/164/166 (v4c), mittaa vertaa_orto.py:llä.
2) **Vertailuportti (omistaja: pakollinen kaupunkimalleille) — SUUNNITELMA PT:lle ≤ 8 riviä ENNEN käyttöönottoa (ei vielä lähetetty):**
   työkalu proto-3d/_valmiit/kaupunkipinnat-v1/lahde/vertaa_orto.py (toimii, ND ajettu: notre-dame-v1/vertailu/v3h|v4|v4b .png/.json). Malli
   ortokamerana Karttasepän ortokuvan pikseliruudukkoon (ND: _tyo/karttaseppa/notre-dame-440, 0,2 m/px, bbox jsonissa), Cycles-aurinko
   az 160 / el 55; vyöhykkeet geometriasta: ulokkeet (nz > 0,8, h ≥ 3, korkeusvaihtelu 1,4 m:ssä > 2,5 m), katot (h ≥ 8), maa (h < 1),
   puusto pois. Kirkkaus maahan suhteutettuna. Rajat: |ΔL| ≤ 15 %, |Δ(b−r)| ≤ 15, |ulokkeet/katot − oikea| ≤ 0,12; ylitys → exit 1.
   Avoin: tekseli-glb:stä puuttuu origo_latlon-extra (anna --origo), aurinkosuunta per ortokuva. Sitten KL, Eiffel, Préfecture, Peking.
3) **Siirtoseppä: palatsi-viipale 0,42 m** (osat.json palatsi rajat.min z −10,95 + Askelaanin 0,3 m vaakavara): kirkkotorniportaiden yläpäässä
   x −19,4, y 8,4–8,6, z −11,25…−10,95 reiteillä 41 → 42 ja 69 → 70. Korjaa: palatsin min z ≥ −10,6 tai min x > −19,0 (Olavinlinnan
   v44-lähteet, sama kuin v46z:n tapa). Testi OsaviipaleetTestit (4ced0237b) kaatuu, kun viipale katoaa → Siirtoseppä poistaa odotusrivin.
4) **Eiffel v2 (LS2 12.4x):** v1d meni vientiin v6k8, mutta tornin alla näkyy tasainen harmaa 130 m:n laatta Googlen puiston keskellä
   (kaappaukset/linssiseppa2-176-20261010/eiffel-v1d.jpg) → pienempi laatta (vain pilarien alle) tai Champ de Marsin sorapolut/ortokuva.
5) **NL-sali v2 (taidemuseo):** Sisältökirjurin 35 patsasta (_valmiit/taidemuseo-alankomaat-patsaat-vienti-20261010/taidemuseo/alankomaat/
   patsaat/glb/, patsaat.json; CC BY -krediitti näytölle) ja 13 grafiikkaa/valokuvaa (_valmiit/taidemuseo-alankomaat-grafiikka-vienti-20261010/
   .../teokset.grafiikka.v2.json, pienet → komerot/kabinetit); metatiedot media.matkakirja.app/taidemuseo/alankomaat/lahde/teokset.patsaat.v2.json.
   Dekimointi + pakkaus meillä (0,04–2,9 M kolmiota). Runko taidemuseo-runko/lahde.
6) **Peking v2b** on LS2:lla (LS2 lisäsi maa-primitiivin, istuu saumatta). Odota LS2:n pari → säätö (rakenna.py; ajot luovutuksen PEKING-osiossa).
- Kaupungintalo v2 LS2:lla (vaakatanko-tieto tulee LS2:lta, jos näkyy yhä).
- (12.5x) Sisältökirjuri: ND:n oikeat vertailukuvat maasta automaattivertailuun _tyo/sisaltokirjuri/vertailu/nd/ (kuvat/ 6 × 1920 px, kuvat.json: tekijä, lisenssi, aika, kamerapaikka, suunta; LUEMINUT.md); muut kohteet perässä → vertaa_orto.py:n rinnalle julkisivuvertailu (kamera kuvat.jsonin paikasta).
- (12.5x) PT: EIFFEL v1d HYLÄTTY vientiin (Googlen torni parempi 250/600/880 m:stä; v1d tumma ja litteä, harmaa 130 m:n laatta näkyy) → Eiffel v2 vertailu oikeaan -säännöllä: maa ortokuvasta kuten ND:n parvis, tornin väri ja ristikon yksityiskohta oikeista kuvista vähintään Googlen tasolle, muuten Googlen torni jää. Järjestys: ND v4b → (Eiffel v2 ennen NL-sali v2:ta vain jos nopea) → NL-sali v2. ND:n edestä-vertailu: käytä Sisältökirjurin kuvia (älä hae itse).
