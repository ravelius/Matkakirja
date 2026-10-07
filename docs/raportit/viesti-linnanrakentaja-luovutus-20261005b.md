# Linnanrakentajan luovutus 5.10.2026 klo 12.2x (Opus high)

## ALOITUSVIESTI (tilinvaihto 6.10. klo 23.4x)
Olet Linnanrakentaja (Opus, high), checkout /Users/Shared/Claude/Matkakirja-linnanrakentaja, haara linnanrakentaja-tyo-20260929.
Lue tämä tiedosto alusta TILA LOPUSSA -osioon, sitten viimeiset Päivitys-osiot. Viestit: SendMessage nimellä; jos raja täyttyy,
mcp__ccd_session_mgmt__send_message session id:llä (Päätoimittaja local_8d8ebf72-…, Siirtoseppä local_6cef0cb2-…,
Julkaisija local_24e63224-…, Natiivi-UI local_c6d63773-…). Simut vain Julkaisijan SIMULAATTORI NYT -kuittauksella.

## TILA LOPUSSA (6.10. klo 23.4x)
- **LINNA (etusija)**, kaikki odottavat Siirtosepän simuvuoroa (simut olivat tauolla levyn takia, Julkaisija 18.51):
  - Esittely PR #4051 (data) + siirtoseppa/linna-149: Siirtoseppä ajaa ennen (BUILD 150 ea457278) / jälkeen (peili feea163c), äänellinen.
  - Esineet PR #4052 (v38, peili bba43057) + natiivi a57c8450: Siirtoseppä ajaa MINUN skriptini
    proto-3d/tyokalut/linnanrakentaja-ajot/ajo-esineet.sh D5900D45:llä. Tarkista videot ruuduittain → Päätoimittajalle.
  - Faceit (haara linnanrakentaja-faceit = #4052 + pää/ilmeet v39, peili 94a0df22) + siirtoseppa/faceit 55ad6594:
    Siirtoseppä ajaa kappelin äänellisenä. PR vasta #4052:n mergen jälkeen. Muiden äänten kohdistukset:
    _valmiit/linna-kohtaukset-v3/raaka/*-vastaus.json (aanet.js kohdistus, kuten kappeli-keskustelu).
  - Akustiikka #3979 (peili 2147deef): Siirtoseppä leipoo kaiun ja tekee ennen/jälkeen-videon.
  - blender.json: #3979, #4052 ja Faceit koskevat samaa tiedostoa → jälkimmäiset viedään uudelleen mergen jälkeen.
- **ISS-OHJAAMON JALKA v3e** (_valmiit/iss-ohjaamo-v3e/, jämäkkä pylväs 75 pt, omistajan 3. kierros): Natiivi-UI sijoittaa ja ottaa
  pelistä stillit iPhone + iPad Päätoimittajalle. Jos omistaja hyväksyy → kopio _valmiit/hyvaksytyt-mallit/.
- **GIZAN PILOTTI** (Päätoimittaja 23.5x, omistaja hyväksyi; linssi, Eurooppa-rajaus ei koske): 3 pyramidia + Sfinksi Blenderissä
  avoimen datan päälle, LOD + GLB → LS1 sijoittaa Cesium-palloon. Arvio ~2 työpäivää. Rajaus: kuningatarten pyramidit, mastabat ja
  temppelit vasta kuvaparin jälkeen. Tekstuuri Poly Haven (CC0). Sfinksin skannaus vain CC0/CC BY/CC BY-SA (ei NC/ND).
  - Tehty: GLO-30 N29 E031 → _lahteet/giza/ (45 Mt), rajattu Gizaan _valmiit/giza-v1/lahde/glo30-giza.npy + .json
    (108 × 126, 1″; purku ilman imagecodecsia: deflate + float-prediktori numpylla, venv-rembg). DSM sisältää pyramidien kohoumat
    (Kheops 89 m, tasanko ~60 m) → alustat tasoitetaan.
  - Datahaku VALMIS: _valmiit/giza-v1/lahde/giza-data.md (mitat, koordinaatit, kerrokset, verhous, lähteet V/A). Tärkeimmät:
    CC0-mallia ei ole, joten Sfinksi mallinnetaan itse (CC BY -mallit vain muotoreferenssiksi). Mykerinoksen lohkeaman mitat
    Commons-kuvista. Wikidatan korkeuksia ei käytetä. Tekstuurit Poly Haven white_sandstone_blocks_02 / large_sandstone_blocks_01 /
    sandy_gravel_02 (CC0). Tarkista kriittiset luvut alkuperäislähteestä. Blender-tiedostoja ei vielä ole; aloita _valmiit/giza-v1/lahde/.
- **Faceit-lisäosa** asennettu Blenderiin (bl_ext.user_default.faceit); ajot ilman --factory-startup (faceit_paa.py, faceit_leivo.py).
- Lokit, joissa käynnissä ei ole mitään: ei Blender-ajoja eikä simuja.

## Mixamo (hahmot)
- Työkalu `tools/dioraama/blender/hahmo_mixamo.py` on haarassa `linnanrakentaja-mixamo` (worktree /Users/Shared/Claude/wt/linnanrakentaja-mixamo,
  pohjana latvus-haara). Commitit: 3a973f65e työkalu, 49fbfd872 KOE blender.json (1f203575 = v32), 6f6777927 silmukka ja --korvaa.
  Käyttö: `Blender -b -P hahmo_mixamo.py -- <hahmo.glb> <ulos.glb> "<fbx>=<nimi>[:<s>]" ... --korvaa idle=a,puhe=b,tyo=c`.
  Lähdehahmot: `_valmiit/olavinlinna-blender-v26/hahmot/*.glb`. Natiivi soittaa nimiä idle, kavely, puhe ja tyo (kanto = kavely).
  Kävely pysyy UAL:n leikkeenä (natiivin askelpituus mitattu siitä).
- Koe hyväksytty (Päätoimittaja, Siirtosepän pelivideo linna-mixamo-kappeli-aanella.mp4). Paketti v32 = v31 + `_valmiit/linna-hahmot/mixamo-koe/`
  (kappalainen, muut symlinkkejä v26:een). Peili 321b971721f2ef7c.
- Laajennuksen kulku: uusi kansio `_valmiit/linna-hahmot/mixamo-v1/` (11 glb:tä) → v33 (cp -cR v31, hahmot-symlinkki) → vie-blender.sh
  `--lahde …-v33` (source ~/.zshrc) → KOE-commit haaraan linnanrakentaja-mixamo → `gh workflow run vie-dioraama.yml --ref
  linnanrakentaja-mixamo -f rakennus=olavinlinna -f kuiva=false -f osoitin=false` → peilihash lokista → Siirtosepältä pelikuvat →
  Päätoimittajalle → PR (työkalu + blender.json) junaan 144, kun #3987 on mainissa.
- Esikatselu: scratchpadin esikatselu.py (EEVEE, --still, --penkki, --ruudut) ei ole repossa, joten kirjoita uusi tarvittaessa.

## Muut tämän päivän tulokset
- Osoitin 27022c94 (v30) on tuotannossa (#3984 mergetty, Julkaisija vaihtoi 08.21).
- Tavli: laudat v2 (kafeneio, bysantti, ottomaani) `_valmiit/tavli-laudat/v2/`, skripti PR #3976 (a8dd1f455), natiivikytkentä Siirtosepällä.
- Suositus: hahmopakettia ei osteta, Gaiaa ei tarvita (docs/raportit/suositus-hahmot-gaia-20261005.md). Omistaja hyväksyi.

## Odottavat (ennallaan)
Brotli (haara linnanrakentaja-zstd, worktree olemassa), akustiikka #3979 (Steam Audio -lupa), JPEG-poisto, kevennys A/C Siirtosepällä.

## Päivitys 5.10. klo 13.3x
- KEHITYSTAHTI (omistaja 12.30, Raamattu kohta 2, #3992): VIE-ikkunat klo 12 ja 20 (vain valmis ja kuitattu). iPad-mittaus ei ole
  VIE-ehto. Toiminnallinen rutiinierä kuitataan ENSIN Laitetestaajalla, ja Päätoimittajalle menee vain maku ja sisältö. Todisteet
  todistusajolla (proto tyokalut/todistusajo/), TODISTUS.md:n polku merge-pyyntöön, mutta vasta kun Pelikoodari ilmoittaa testimykistyksen valmiiksi.
- Avoimet PR:t: #3991 Mixamo 11 hahmoa (blender v34 6fff9f65, peili c97dd7e5; kirjuri pitää UAL-työleikkeen), #3993 kohteiden sijoitus.
  Osoitin vaihdetaan vasta Päätoimittajan kuvaparikuittauksen jälkeen. Siirtosepältä odotetaan kirjurin ja soutajan uusia kuvia.
- Kohtaukset v2: kohteet `_valmiit/linna-kohtaukset-v2/kohteet.json` (Siirtoseppä hyväksyi). v2-rivejä EI viedä ennen
  Pelikoodarin uutta äänipankkia ja omistajan valintaa. Kaiku Steam Audiosta (#3979, Siirtosepän koe).
- Mixamo-lataukset tehdään sisäisellä selaimella omistajan kirjautumisella (omistaja antoi luvan chatissa). Viimeiset lataukset
  jäävät piilotiedostoiksi ~/Downloads/.Q6L2SF6YDW.com.anthropic.claudefordesktop.*, joten tunnista ne aikaleimasta ja lantion korkeudesta.

## Päivitys 5.10. klo 14.5x
- #3991 (Mixamo v34) on MERGETTY mainiin klo 13.24, mutta osoitinta ei ole vaihdettu. Liikevaihtelu: haara linnanrakentaja-liikevaihtelu
  (blender 89ca548e = v35, peili 97c8b702; hahmoittain eri idle ja puhe, linna-hahmot/mixamo-v2). PR avataan vasta Päätoimittajan
  äänellisen ennen/jälkeen-videon jälkeen (Siirtoseppä kuvaa, natiivikorjaukset ovat linna-143:ssa: katse, siirtymät, eleet, askel × skaala).
- #4001 (kohtaukset v3 + ilme, peili fd01cc97) PIDOSSA, kunnes TF 143 -luku on todistettu tai juna 144 on testaajilla.
- Codex-referenssit: _valmiit/linna-hahmot/codex-referenssit/ (pelikulma kappelista + edestä + 3/4). Päätoimittaja tilaa Codexilta
  ensin 4 kasvokuvaa (kappalainen neutraali/vakava, vouti neutraali/huolestunut). Paikkamerkit kaikille 11: …/rintakuvat-paikkamerkki/.
- SEURAAVA (omistaja 14.5x): Tripo-koe VOUDILLA, kun Codexin kasvokuvat ovat tulleet. studio.tripo3d.ai sisäisellä selaimella,
  ja omistaja kirjautuu itse (pyydä chatissa). Ilmaisversio, Mixamo-luuranko, iPad-rajaus. Tuotos: vertailuvideo kappelista (nykyinen
  vs. Tripo, lähellä ja kaukana, puhe-ele) + mitat. Maksullisesta tilauksesta päättää omistaja.
- Työkalut scratchpadissa (ei repossa): mix/rintakuva.py (--kulma --tasainen), mix/pelikulma.py (--atlas valot/<tila>-hamara.jpg),
  mix/saumat.py, mix/lantio.py, gen_v3.py. Kopioi tarvittaessa repoon.

## Päivitys 5.10. klo 16.4x
- #4001 (kohtaukset v3 + ilme) MERGETTY (8db7844a). Ele-kenttä tuli myöhemmin, ja se on #4004:ssä.
- #4003 junaan 144: v35, hahmoittain idle ja puhe (blender 89ca548e). Osoitin vaihdetaan TF 144:n jälkeen MAININ push-hashiin
  (ei koepeiliin 56e98a88). Mixamo-FBX:t ovat 30 fps, joten v35 ei ole hidastunut (mitattu).
- #4004 junaan 145 (huomenna klo 12) yhdessä Siirtosepän linna-144 6f7ac8f5:n kanssa: eleet (Human Basic Motions, blender d1865adb v36)
  + ele-kenttä. Merge #4003:n jälkeen. Osoitin vasta Siirtosepän äänellisen videon jälkeen (koepeili 1f75d8ed).
- hahmo_mixamo.py tukee nyt Kevin Iglesiasin rigiä: B-*-kartta, asennon kohdistus, B-root-lepo, kuvanopeuden uudelleennäytteistys
  (FBX-tuoja vaihtaa scene-fps:n). Human Basic Motions -FBX:t: _lahteet/kevin-iglesias-hbm/fbx (409 kpl, ei repossa).
- Levy: siirretty T7:lle 6,62 Gt (/Volumes/T7 4TB/Matkakirja-arkisto/linnanrakentaja/_valmiit/). Paketit v30–v36 ehjiä.
- Odottaa: Tripo-koe VOUDILLA Codexin kasvokuvien jälkeen (omistaja kirjautuu sisäiseen selaimeen). Codex-tilaus Päätoimittajalla (4 kuvaa).

## Päivitys 5.10. klo 23.1x
- TYÖTAPA (Päätoimittaja 23.1x): VIKA TOISTETAAN ENNEN KORJAUSTA. Näytä todistusajolla tai testillä vika oikealla polulla ja
  oikeilla napautuksilla, sitten sama ajo korjattuna. Ilman toistoa ei korjausta eikä SHA:ta.
- Kappelikorjaus (kappalainen polvituolin päältä lattialle, alttarivalo y 10,9 → 12,1) on #4004:ssä (linnanrakentaja-eleet 802bb9299),
  peili db8630b07d17411d. Toisto ja korjaus: Siirtosepän A/B-video (56e98a88 vika vs. db8630b0) Päätoimittajalle. Juna 145.
- #4006 (Final IK -data) pidossa #4004:n jälkeen. Varakanava: mcp__ccd_session_mgmt__send_message session id:llä heti, kun SendMessage
  epäonnistuu (ENOENT tai raja).
- OMISTAJA 23.0x (Raamattu #4030): SIMULAATTORI VAIN TARVITTAESSA. Käyttö vain (1) omistajalle näkyvään tai kuuluvaan muutokseen, yksi
  yhteinen äänellinen video per juna, (2) vian toistoon, jos testi ei riitä, ja (3) junan lopulliseen savutestiin (Laitetestaaja ~10 min).
  Datan ja pienten korjausten muutoksiin automaattiset testit. Ei välikokeita, pienet virheet seuraavaan junaan. Koko pelissä:
  nimikyltit näkyvät saavuttaessa ~3 s, ja infokortit ja nimilaput tulevat vain napautuksesta.
- OMISTAJA 23.1x "ota kaikki käyttöön heti" (#4030): (1) osoitinvaihdot ajaa Julkaisija Päätoimittajan kuittauksen jälkeen, kun kukaan ei
  aja sisältöä simulla tai iPadilla, eikä omistajan Run-riviä enää tarvita. (2) Muutosloki kulkee junan mukana (Natiiviseppä kirjoittaa,
  Päätoimittaja tarkistaa, Julkaisija vie). (3) NATIIVI ON MALLI: ei web-kuvia, -mittoja eikä -kuvapareja, web on jäädytetty vikakorjauksiin.
  (4) Päätoimittaja tarkistaa vain omistajalle uudet asiat. Pienet korjaukset menevät roolin oman tarkistuksen ja savutestin varassa.

## Päivitys 6.10. klo 09.0x
- ISS-ohjaamo v3 HYVÄKSYTTY junaan 147 (Päätoimittaja): _valmiit/iss-ohjaamo-v3/ (rumpu pois; vasemmalta kaasu ja asteikko, LCD isompi,
  kamera, joystick oikealla; välit 28–30 px @3x mitattuna uloimmista osista; uudet ankkurit sauvaKeski ja objektiivi). Kuvat ja json
  ovat Natiivi-UI:lla. Lähde: lahde/tekstuurit.py → tuotanto.py → jalki.py (raaka/ poistettu; aja uudelleen tarvittaessa).
- 6.10. klo 11.3x: ohjaamo v3b HYVÄKSYTTY junaan 147 (_valmiit/iss-ohjaamo-v3b/; numerot pois, asteikko vivun juureen, LCD 1,16 × 0,58,
  ruuvit 0,10 reunasta, kuvaan marginaali → koko 374 × 129,33 pt, kaasu.ura portaattomalle kahvalle). Korvaa v3:n Natiivi-UI:lla.

## Päivitys 6.10. klo 13.5x
- LINNAN ESITTELY (omistaja 13.1x, juna 149): PR #4051 (saapuminen.loppu 'kertoja', tornit kohtisuoraan az 157, nimet 3 s).
  Natiivi Siirtosepällä (siirtoseppa/linna-149): tauko, kaari kertojan kameraan, nimet, kuva, pan-suunta, iPadin vaakalukko,
  Codex-kasvot pois. KESKEN: toistovideo nykyisestä hypystä (simuvuoro Julkaisijalta) → sama ajo korjattuna → video Päätoimittajalle.
  Perustajan kuva (jakso.kuva 1,6 s, ~5 s) kytketään, kun Codex toimittaa (haara codex-perustaja-tott).
- STEAM AUDIO 4.8.1: _lahteet/steam-audio/4.8.1/ + LAHTEET.md. Siirtoseppä toi sen protoon (siirtoseppa/steam-audio 65527de0,
  kappelin kaiku cdfe7acd). Akustiikkapeili: v37 = v36 + akustiikka/ → blender 382614adc2385881, peili 2147deefd414e4b6
  (haara linnanrakentaja-akustiikka-koe = main + #3979). Siirtoseppä leipoo keittiön ja pihan ja tekee ääni-videon.
- ESINEET (omistaja: ei MC Village Lifea): PR #4052, tools/dioraama/blender/hahmo_esineet.py. Kokin kauha ja hämmennys, apulaisen
  vati (kanto*) ja luuta (tyo, tyo_puhe; keittiössä paikka [11.7, 0, 7.5] suunta 215), rengin säkki (kanto*). v38 = v37 +
  linna-hahmot/mixamo-v4 → blender e4c6abb04c926293, peili bba43057b5a83bfe. Natiivi a57c8450 (kanto_idle/kanto_puhe).
  HUOM: _valmiit/olavinlinna-blender-vNN/hahmot on symlinkki linna-hahmot/mixamo-vN:ään. Uudet glb:t aina uuteen mixamo-kansioon.
- TRIPO-koe voudilla: odottaa omistajan kirjautumista (Päätoimittaja klikkaa). Tiedostot tulevat _lahteet/tripo/vouti/ → retarget,
  kappelivertailu (lähi/kauko, puhe-ele) ja mitat.
- FACEIT: omistaja todennäköisesti ostaa → 15 ARKit-muotoa kahteen pohjapäähän + visemiraidat datasta (ElevenLabs/Rhubarb).
- ACTORCORE: lista Päätoimittajalle. EULA kieltää jakelun kolmansille, joten julkinen ämpäri vaatii Reallusionin kuittauksen.
  Suositus: ei tilausta nyt.

## Päivitys 6.10. klo 15.0x
- FACEIT (omistaja osti 2.3:n, Päätoimittaja hyväksyi vouti-kokeen): kaikki 11 hahmoa linna-hahmot/faceit-v1 (= mixamo-v4 + pää + ilmeet).
  Skriptit tools/dioraama/blender/{hahmo_paa,faceit_paa,faceit_leivo}.py + hahmot_faceit.sh (haara linnanrakentaja-faceit,
  esineiden #4052 päällä; PR vasta #4052:n mergen jälkeen, ei pinottuja). Faceit asennettu Blenderiin (bl_ext.user_default.faceit),
  lisäosa _lahteet/faceit (ei repoon). Leivonnassa modifier_action FACEIT (REMOVE poisti vartalon skinnauksen!).
  v39 blender 0265cd493b0728f4, peili 94a0df22044155fa. Kappelin keskustelun kohdistus aanet.js:ssä, rakenna.mjs välittää sen.
  Muiden äänten kohdistukset: _valmiit/linna-kohtaukset-v3/raaka/*-vastaus.json. Natiivin morph-tuki Siirtosepällä (siirtoseppa/faceit 55ad6594), juna 151 (16.2x: entinen "150" = 151, BUILD 150 = muistioikeuden pikkujuna).
- Esittelyvideot (148b ja linna-149 + peili feea163c): Siirtoseppä ajaa ~15.50, minä tarkistan ruuduittain → Päätoimittaja.

## Päivitys 6.10. klo 19.0x
- OHJAAMO v3c (omistaja 18.4x "ohjainvivusto kelluu"): teleskooppijalka _valmiit/iss-ohjaamo-v3c/ (jalka-yla 53,33 × 319,67 pt,
  jalka-ala 51 × 48,33 pt, ohjaamo.json jalka; lahde/tuotanto.py osat jalka:yla|ala). Natiivi-UI sijoitti: natiivi-ui/opas-152
  db05decf. Stillit pelistä tulevat Natiivi-UI:lta Päätoimittajalle. Hyväksynnän jälkeen kopio _valmiit/hyvaksytyt-mallit/.
- SIMUT TAUOLLA (Julkaisija 18.51): levyä 19 Gi, ei uusia simuja. Esineajo (#4052) tehdään Siirtosepän D5900D45:llä hänen
  linnavuorossaan: proto-3d/tyokalut/linnanrakentaja-ajot/ajo-esineet.sh (app-183866ed, peili bba43057, mykkä).
  Siirtoseppä ajaa esittelyn (ennen BUILD 150 ea457278 / jälkeen linna-149 + feea163c) ja Faceit-kappelin (94a0df22) äänellisinä.

## Päivitys 7.10. klo 00.5x (tilinvaihdon jälkeen)
- GIZA (kaikki proto-3d/_valmiit/giza-v1/, ei repossa): pyramidit v1 VALMIIT → LS1 (3D Tiles, Cesium, leikkaus + maapohja).
  lahde/: atlas.py (kerrosatlakset, venv) → koot.py (r2048…r256) → pyramidit.py (Blender: kerrokset, segmentit, viistot
  askelmat, verhous/graniitti, lohkeama, maapohja, LOD0/1/2, Draco) → glb/ + sijainnit.json (lat/lon, EGM-korkeus, leikkauskulmat).
  esikatselu.py (+ maasto_laske.py venvissä) → esikatselu/arkki-v1.jpg. LAHTEET.md giza-v1:ssä; pintakuviot _lahteet/polyhaven-giza.
- SFINKSI v0 (karkea) LS1:llä: sfinksi_sdf.py (venv, SDF → marching cubes, 0,10 m) → sfinksi_glb.py (Blender: desimointi
  90k/14k/2,5k, smart UV, Cycles-leivonta väri+AO+normaali, maapohja). Pikakatselu sfinksi_esik.py. Referenssikuvat
  scratchpadissa (Commons: Profile Sphinx, Sphinx of Giza 9059). SEURAAVA: v1 = kasvot (nyt "apina"), rungon pyöreys
  (nyt sohvamainen laatikko), liepeet. Pohjan korkeus 20 m = A.
- Olavinlinnan yhdistetty peili a0e537492bff2189 (#4051 + #4052, haara linnanrakentaja-peili156, worktree wt/…-peili156)
  junaan 156: Siirtoseppä todentaa, Julkaisija vaihtaa osoittimen kuittausten jälkeen. Worktree poistetaan, kun PR:t on mergetty.
- Esineajo (Siirtoseppä D5900D45): luuta ja säkki OK, kokin kauha ei näy (kokki selin).

## Päivitys 7.10. klo 01.0x
- GIZA TAUOLLA (Päätoimittaja): odotetaan LS1:n simukuvia ja omistajan palautetta. Viimeiset: Kheopsin tasanne + Gillin masto
  (giza-data.md), Sfinksi v2b (lapa, vyötärö, takareisi, häntä, selän notko, pää 1,15×; aitaus aitaus.py, yksi materiaali
  väreillä). Kuvat esikatselu/arkki-v2.jpg (pyramidit), arkki-v4-sfinksi.jpg. LS1 lähettää kulmakorkeuserot → korjaa DEM-arvoilla.
- LINNA ETUSIJALLA: peili a0e53749 Siirtosepän todennuksessa (TF 154 -app) ennen osoitinvaihtoa.

## Päivitys 7.10. klo 01.2x
- KAUPUNKISELVITYS (Päätoimittaja, omistajan linjaus 00.4x) VALMIS: docs/raportit/selvitys-kaupungit-blender-20261007.md
  (+ liitteet viro/ruotsi, kuva kuvat/tallinna-koe-raekoja-20261007.jpg). Suositus Tallinna ensin (Maa-amet LoD2 + 10 cm orto,
  ≈ CC BY 4.0, ei kirjautumista, 4–6 pv); Visby vaatii omistajan Geotorget-tilin (8–12 pv). Odottaa omistajan päätöstä.
  Koetyökalut proto-3d/_valmiit/tallinna-koe/lahde/ (kortteli.py = OSM-katot, lod2_rajaa.py + kortteli_lod2.py = LoD2 + orto,
  fasadi.py, esik.py); data proto-3d/_lahteet/maaamet-tallinna/ ja polyhaven-kaupunki/.
- GIZA: LS1:n kulmamittaus Sfinksi NE +6,9 m (malli Googlea korkeampi), SE −1,8, SW +1,7, NW +3,6; Mykerinos ±1,4.
  Korjaus jatkokierroksella avoimilla korkeuksilla (ei Googlen arvoilla). LS1:n leikkausvika (piilotti koko tilesetin) korjautuu
  heidän seuraavassa käännöksessään → pelikuvat sen jälkeen.

## Päivitys 7.10. klo 02.0x
- OMISTAJA 01.3x: Euroopan kartan parannukset SEIS (Tallinna/Visby tallessa _valmiit/tallinna-koe/, LUEMINUT.md). Linna loppuun
  (eleet yms., Siirtoseppä vetää: Matkakirja-siirtoseppa docs/raportit/siirtoseppa-linna-valmiiksi-20261007.md) + KIELLETTY KAUPUNKI.
- LINNA: PR #4093 (Faceit v39 + kohdistukset.json 18 puheelle + eleet: puhe1-3, nyokkays, kallistus, kuuntelu kaikille 11) =
  blender v40 44261260a941b61b (_valmiit/olavinlinna-blender-v40, hahmot → linna-hahmot/faceit-v2 ← mixamo-v5), peili
  dfab929f0f6d3576. Odottaa Siirtosepän todennusta (natiivin morph-tuki + eleajoitus) → juna → osoitin. Worktreet poistettu.
- KIELLETTY KAUPUNKI (omistajan poikkeus, oma dioraama ilman Cesiumia, Qing 1873): pilotti _valmiit/kielletty-kaupunki-v1/
  (LAHTEET.md alusta asti). lahde/: kk_geom.py (katot rengastasoina juzhe + 起翘, 歇山, sumeru-jalustat, portaat), kk_osat.py
  (instanssit), kk_halli.py, kokoa.py (Blender → pilotti/kielletty.blend, --glb EXT_mesh_gpu_instancing), mitat.py (V/A
  datasta kielletty-kaupunki-data.md + OSM osm_alue.py → kk-alue.json), kk_tekstuurit.py (venv), esik.py. Taihedian 35,05 m ja
  Taihemen 23,72 m täsmäävät lähteisiin. SEURAAVA: esikatselu Päätoimittajalle (pilotti/arkki.jpg), sitten aukion galleriat.
- 7.10. 02.2x: KIELLETTY KAUPUNKI v2 Päätoimittajalla (esikatselu/arkki-pilotti-v2.jpg): portaat + 垂带 + kaiverrettu 御路
  (kk_tekstuurit yulu_*), pronssit (kk_osat: ding, kurki, kilpikonna, aurinkokello, jyvamitta, leijona; mitat.PRONSSIT),
  Jinshui-joki + 5 siltaa (kk_joki.py, kk-joki.json), katon kultainen sävy, pohjoissivun galleriat/portit ja kulmatornit.
  257 k staattista kolmiota + 6 100 instanssia, GLB 6,9 Mt. SEURAAVA kuittauksen jälkeen: natiivi-dioraamaan vienti
  (kysy Siirtosepältä: EXT_mesh_gpu_instancing natiivissa? rakennus-id, ulkokuori-LOD:t), sisätilat vasta tarinan kuittauksella.
- 7.10. 02.36: KIELLETTY KAUPUNKI NATIIVIIN (Päätoimittaja kuittasi v2): lahde/kuori_leivo.py (kaikki yhdeksi meshiksi,
  smart_project reunus 0, Cycles COMBINED float-kuvaan + savyta() valotus 0,5 / valkopiste 2,0 / sRGB, 8k päivä + hämärä,
  LOD 892k/400k/150k) → _valmiit/kielletty-kaupunki-blender-v1 (+ tilat/aukio.glb paikkamerkki, LUEMINUT, LAHTEET, MUUTOKSET).
  vie-blender.sh → blender 3d0c7bae5ca33373; worktree wt/linnanrakentaja-kielletty, haara linnanrakentaja-kielletty 857a1a116
  (js/dioraama/rakennukset/kielletty-kaupunki.js + /blender.json; rakenna.mjs ulkokuoriVesi, oletus −7, Kielletty −3).
  vie-dioraama osoitin=false → peili 89707f601722ed7a: `poikki peili https://media.matkakirja.app/dioraama/kielletty-kaupunki/89707f601722ed7a/`.
  SEURAAVA: Siirtoseppä todentaa → ilmoita Julkaisijalle (kuvavuoro ~25 min jonossa, ~04.00) → kuvat (ilma, aukio, portaat;
  iPhone + iPad) Päätoimittajalle → PR vasta kuvien jälkeen. Tiedossa: aukion tiilet sumeat maan tasolta (yksi 8k-atlas).
- 7.10. 03.2x: LINNA v41 (#4093, e8e7b3520): v40:n morph-glb:t rikkoivat TF 154:n → _valmiit/olavinlinna-blender-v41: hahmot/<id>.glb
  = mixamo-v5 (ei morpheja), <id>-faceit.glb = faceit-v2; rakenna.mjs malli3d.skin.faceit. blender abcdfb635107f271, peili
  1a1857e06ec1386f; Siirtoseppä todensi TF 154:llä (10/10 hahmoa). Osoitin Julkaisijalle junan d5959026-todennuksen jälkeen.
  KIELLETTY: maareunus (kuori_leivo.py maareunus(), 4 km aukion UV-pisteellä, z −0,25) koska natiivin vesitaso näkyi järvenä;
  8k-leivonta pid 8143 SIGSTOPissa TF 155:n Unity-viennin ajan (Julkaisija ilmoittaa → kill -CONT 8143). Omat simut
  D760E909 (iPhone 17 Pro) + D9AC9B91 (iPad 13 M5), kuvaus proto-3d/tyokalut/linnanrakentaja-ajot/kielletty-kuvat.sh,
  appi lokit/siirtoseppa-eleet-app (d1b6cde4); erase vuoron jälkeen.
- 7.10. 03.35: KIELLETTY pelikuvat Päätoimittajalle: blender ab3f31e0cca9b289 (maareunus), peili e6c51afe099c29de, haara
  linnanrakentaja-kielletty (ei PR:ää vielä). Kuvat lokit/linnanrakentaja-kielletty-0324/omistajalle/ (10 png), ajo
  tyokalut/linnanrakentaja-ajot/kielletty-kuvat.sh (poikki tunnelma paiva + poikki kamera; jalustan mitat skriptissä). Simut erasettu.
  SEURAAVAT PARANNUKSET (palautteen mukaan): atlaksen tyhjien tekselien täyttö (push-pull) mustia pilkkuja vastaan, aukion/
  marmorin tarkkuustekstuuri, ympäröivät pihat maareunuksen tilalle; natiivin alarivi "Savonlinna · 1475" Siirtosepälle.
- 7.10. 04.3x: KIELLETTY v3 (Päätoimittajan lista 03.4x, takaraja 07.30): mitat.py REUNAT v3 (OSM, osm_rakennukset.py →
  kk-rakennukset.json) + MUURIT; kk_kaukaiset.py (320 rakennusta + 三台-jatke; < 170 m leivotaan, muut kuori_leivo kauko_kuvaa
  näytepisteisiin); kuori_leivo: taytto() push-pull, maski_leivo() hybridi/kuori-materiaali-2k.png + kanavat.txt; kokoa:
  katto_diff_v3 × (0,75 0,62 0,60), kiveys_v3 harmaa. vie-blender/rakenna: detaljikanavat rakennuskohtaisesti; kirjasto
  175ec1b8683452d6 (lasitettu-tiilikatto urilla, harmaa-tiilikiveys, kalkkirappaus). Peili 938313041859d831 (blender
  a630203a6809461e), haara linnanrakentaja-kielletty. Siirtoseppä todensi 64a89525: detalji OK, katon rivit eivät erottuneet → korjattu.
  KUVAT: Julkaisijan vuoro ~05.15 (kielletty-kuvat.sh + kielletty-merkitse.py) → Päätoimittajalle ennen 07.30.
- 7.10. 05.5x: KIELLETTY v3c KUVAT PÄÄTOIMITTAJALLA (14 kpl, lokit/linnanrakentaja-kielletty-v3c-0546/omistajalle/). Peili
  0ddc7c7c75aac0af (blender 5ca4c4b500142453); v3b seinät tasaiseksi (seina_v3.jpg), v3c maskin R nollattu (kalkkirappauksen
  tahrat läikkinä) ja kuori_leivo LUOKKA ilman seinää. Simut erasettu. Odottaa Päätoimittajan/omistajan palautetta; PR kun hyväksytty.
- 7.10. 06.1x: KIELLETTY v4 (Päätoimittaja 06.0x: ilmakuvat 1, 2, 6; muut v3c-kuvat omistajalle sellaisinaan): kk_kaukaiset._halli
  (aumakatto/harjakatto, ~80 kolmiota), kuori_leivo haivytys() + maareunuksen ulkorenkaat liukuväriin, näytepisteet ≥ 6 tekseliä;
  js valaistus.sumu {0.9, 3.2} (Siirtoseppä eleet-2, junan 156 jälkeen). Peili 2851289d904b2320 (blender 2a01feacece9cb55).
  Siirtoseppä ottaa ilmakuvat eleet-2-käännöksellä kielletty-kuvat.sh:lla → merkitse kielletty-merkitse.py → Päätoimittajalle (~klo 10).
- 7.10. 06.2x: KIELLETTY v4 -kuvat Päätoimittajalla (lokit/linnanrakentaja-kielletty-v4/omistajalle/, Siirtosepän eleet-2 ed5a5e89). Utu 0,9/3,2 melko vahva → kevennys vain js-arvo + CI, jos Päätoimittaja pyytää.
- 7.10. 07.06: KIELLETTY v4b Päätoimittajalle: sumu {2.4, 10} (js), peili 14aa3229553a885e, iPad-kuvat lokit/linnanrakentaja-kielletty-v4b/omistajalle/ (Siirtoseppä ed5a5e89). Seuraava: PR haarasta linnanrakentaja-kielletty, kun Päätoimittaja hyväksyy; worktree poistetaan mergen jälkeen.
- 7.10. 07.1x: KIELLETTY v4b KUITATTU (Päätoimittaja): 4 kuvaa omistajan aamuyhteenvetoon. PR linnanrakentaja-kielletty vasta omistajan kuitattua hetken (1873) ja suunnan; osoitin/pelaajajakelu omistajan päätöksellä. Linna ensin.
- 7.10. 08.4x: ILMAPALLO (kaupunkiopas karttaelementiksi, omistajan päätös 08.3x): _valmiit/ilmapallo-v1 (lahde/ilmapallo.py, glb/ilmapallo_{lahi,keski,kauko}.glb 7618/2842/772 kolmiota, paletti Tyylikirja, LAHTEET.md). LS2:lla sijoitettavana; muutospyynnöt (pivot koriin, ilman köyttä, mittakaava) LS2:lta.
- 7.10. 09.xx: OMISTAJAN LINJA (08.5x): Olavinlinna silmänkorkeudelta pilotti → Giza oppaaseen → Kielletty kevyemmin. Venesaapuminen
  Siirtosepän (reitti x −340 z 130 → laituri; P1 120 m, P2 40 m, P3 8 m; silmä y −5,8). Minun: (a) vene (Opus-agentti,
  _valmiit/olavinlinna-vene-v1: keula +Z, airo_v/airo_o, peramela, kamera_pera, istuin_soutaja), (b) rantakivet VALMIS
  _valmiit/olavinlinna-rantakivet-v1 (lahde/rantakivet.py: kalliojalusta peittää kuoren vesirajan sirpalevyön + 270 lohkaretta,
  Poly Haven rock_surface CC0), odottaa Siirtosepän kenttänimeä → v42 (vie-blender + rakenna ymparisto.rantakivet), (c) soutu-leike
  soutaja-1500 (Sitting Idle + IK airoihin) + veneen 'soutu' 2,0 s, (d) vesiportin/muurin juuren tarkkuus P2–P3 Siirtosepän kuvista.
  GIZA: LS1 vie giza-v1:n 3D Tilesiksi; Kheops LOD0 "valkoinen" → testiversiot (ilman Dracoa / COLOR_0 leivottuna) pyynnöstä;
  giza-v2 (Sfinksin NE-nurkka DEM:llä) myöhemmin. ILMAPALLO valmis LS2:lla (keski käytössä).
- 7.10. 09.3x: VAPAA KÄVELY (omistaja 08.4x) + KEITTIÖ ETELÄSIIPEEN G 102 (Päätoimittaja 09.3x). Tutkimus _lahteet/olavinlinna-pohjat/
  REITTI-LAHTEET.md (Aalto-arkisto PD 1904/1910, opas 1923), piirros kohdistettu kuoreen (scratchpad pohja-muunnos.json; tornit).
  _valmiit/olavinlinna-kavely-v1: lahde/reitti.json (V/L/A), kavely.py (vesiportti 2-osainen ovelta (−56, z 15,1), T 102, keittiö
  G 102, Kirkkotornin portaat + kierre), kuori_kavely.py (ulkoalue törmäys/kävely kuoresta + laituri.glb), v1/ (glb:t, osat.json
  leikkauksineen, merkit.json, esineet). olavinlinna-blender-v42 (symlinkit v41:een + ymparisto/mallit + kavely/) → blender
  53619da2, peili 51836d92, haara linnanrakentaja-linna-v42 a38bf55ca (rakenna: ymparisto.mallit[], kavely{osat,merkit}).
  Siirtoseppä tekee lukijan. AVOIN: laiturin musta rako P3 (kysytty syy), vene-agentti → v43, soutu-leike, keittiön sisältö uuteen
  huoneeseen (vanha pysyy kunnes uusi todennettu), kappelin sulkeminen, valonäytteet. Korinäkymä LS1:lle valmis (ilmapallo-v1/kori).
- 7.10. 10.0x: LINNA v43 peilissä 3ddc05cc (blender 2e154072, haara linnanrakentaja-linna-v42 + laituri.js-otsalaudat): vene
  ymparisto.mallit (olavinlinna-vene-v1), laituri leivottu uudelleen (kirkkaus sovitettu v19:n atlakseen kertoimella ~0,77).
  AGENTIT KÄYNNISSÄ: keittio-g102 (worktree linna-v42: uusi keittio-g102.js + olavinlinna.js-rekisteröinti, tuotokset
  _valmiit/olavinlinna-keittio-g102-v1, stillit Päätoimittajalle ennen vaihtoa), soutu (_valmiit/olavinlinna-soutu-v1: veneen
  'soutu' + soutaja ele_soutu mixamo/faceit), seikkailun lähdetarkistus (_lahteet/olavinlinna-pohjat/SEIKKAILU-TARKISTUS.md:
  Kellotornin kerrokset, komero/pakohyppy, palatsi, kappeli). JONOSSA: kappeli lähteiden mukaiseksi (7,8 m, ristiholvi,
  ikkunaton, ampumakäytävä); Giza-v2 Sfinksi (odottaa LS1:n Google-korkeuksia), helmat pyramideille VALMIS (_valmiit/giza-v2/glb).
- 7.10. 10.2x: SEIKKAILU-TARKISTUS.md valmis (Päätoimittajalle raportoitu). KORKEUSMUUNNOS (A, 3 tapaa): malli = abs − 83,0 m.
  → KAPPELIN LATTIA mallissa ~9,6 (nyt tila 6,4: 3,2 m liian alhaalla), Kirkkotornin alin kerros (Tott-kammio +86,4) = 3,4.
  Lähteiden reitti torniin: pikkupiha → itäsiipi (E 102 / portaat) → Linnantupa (+86,4) → Kirkkotornin pohjakerros (ovi) →
  porras kappeliin (+92,6). TODO kappelikorjaus: kappeli.js sijoitus y +3,2, Ø 7,8 m, ristiholvi ~11,8 m alimmasta, ikkunaton,
  ampumakäytävä +96,5 (malli 13,5); kavely reitti.json kirkkotorni_alin 3,4 ja kappeli 9,6, portaat itäsiiven kautta (A).
- 7.10. 10.4x: KAPPELI KORJATTU (haara linnanrakentaja-linna-v42 880b73923): kappeli.js sijoitus y +0,2 (lattia 9,6), sisäsäde 3,9
  (torni paksuus 2,7), ristiholvi = kupoli + `ristiholvi: {kulma 5, nousu 0,55, reuna 0,25}` (uusi ristiRuudukko reseptit-linna.mjs),
  lähtö 12,3 / laki 15,0 (+0,2), ikkunaton (ikkunarako + keila pois), kalusteet sisäsäteelle. leivo_tila.py: alaspäin osoittavat
  pinnat poistetaan VAIN < 2,2 m tilan rajojen alareunasta (holvin laki ja keittiön katto katosivat atlaksesta).
  KEITTIO-G102 valmis (agentti, _valmiit/olavinlinna-keittio-g102-v1, esinetarkistus: nauris, talikynttilä, rautapadat; esine-nauris.glb
  esineet-v1:ssä). Stillit Päätoimittajalle 10.4x. SOUTU valmis (_valmiit/olavinlinna-soutu-v1, hahmo istuin_soutaja-lapseksi, skaala 0,9753).
  KÄVELY v2 (lahde/kavely.py kirkkotorni() uusiksi, reitti.json tasot 3,4/9,6): kierreporras Ø 3 (−20,7, −4,3) −2,74 → 1,2, suora
  varsi 11 askelmaa → Tott-kammio 3,4 (r 4,15), muuriporras kahtena suorana vartena r 5,65 (325→275 → 6,5, 265→215 → 9,6),
  kappeliin leikkaussektorin puolelta; esine:omena → esine:nauris. Tuotos scratchpad kavely-v2 → kopioi _valmiit/olavinlinna-kavely-v1/v2/
  + kuori_kavely.py ulkoalue + esineet. MUISTIRAJA (Päätoimittaja 10.4x): paistot yksi kerrallaan, PhysMem unused > 20 Gt;
  scratchpad paistot.sh leipoo kappelin ja keittiön uudelleen (4k) muistin salliessa → v44 (soutu, keittio-g102, kappeli, kävely v2).
