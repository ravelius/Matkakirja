# Linnanrakentajan luovutus 5.10.2026 klo 12.2x (Opus high)

## TILA LOPUSSA
- **Mixamo-laajennus 11 hahmolle** on käynnissä. Omistajan linja 12.30: iPad-mittaus ei estä. Aloita heti, kun omistajan leikkeet 4–14
  (docs/raportit/mixamo-leikelista-20261005.md) ovat kansiossa `/Users/Shared/Claude/proto-3d/_lahteet/mixamo/` (nyt vain Praying,
  Sitting Idle ja Sitting Talking). Lyhennä pitkät leikkeet silmukoiksi. Lopuksi kuvapari ja video pelistä Päätoimittajalle ennen junaa 144.
- **Rantametsä PR #3987** (blender v31 cb0cd92d, peili 22968114) on junaan 144 Julkaisijalla. **Osoitinta EI vaihdeta** ennen
  Päätoimittajan omistajakorttia.
- Viestit nimellä: "Päätoimittaja (Opus, max)", "Siirtoseppä (Opus, high)", "Julkaisija (Opus, high)" (ListAgents). Socketit vaihtuvat.

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
