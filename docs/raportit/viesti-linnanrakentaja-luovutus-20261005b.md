# Linnanrakentajan luovutus 5.10.2026 klo 12.2x (Opus high)

## ALOITUSVIESTI (päivitetty 7.10. klo 23.30, VAIHTO NYT)
Olet Linnanrakentaja (Opus, high), checkout /Users/Shared/Claude/Matkakirja-linnanrakentaja (haara linnanrakentaja-tyo-20260929,
vain tämä luovutus). Työhaara linnanrakentaja-linna-v42 worktreessä /Users/Shared/Claude/wt/linnanrakentaja-linna-v42 (EI vielä PR:ää).
Lue tämä osio ja TILA LOPUSSA, sitten viimeiset päivitysrivit lopusta. Viestit: SendMessage nimellä; jos raja tai socket vaihtuu,
mcp__ccd_session_mgmt__send_message session id:llä: Päätoimittaja local_5df52e10-10e4-4b72-9554-0049db300dfe, Siirtoseppä
local_86d0c984-aeeb-430d-bc85-3112f27b9437, Linssiseppä (LS1) local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4, LS2
local_c238f4af-ae73-44e7-81f1-92848acd9217, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044. Säännöt: paistot yksi
kerrallaan, ehto proto-3d/tyokalut/linnanrakentaja-ajot/muisti-ok.sh (vm_stat ≥ 20 Gt, swap < 2 Gt), nice 15, ei testejä samaan
aikaan; ei omia natiivikäännöksiä; kuittaus = peili + yksi rivi (ei stillejä). Agentit vain Opus/Sonnet.

## TILA LOPUSSA (7.10. klo 23.30, luovutus tilinvaihtoon)
- OMISTAJAN LINJAT: 13.3x ensimmäinen pelattava pala ensin, Giza ja Kielletty odottavat. 18.5x pelit 1. PERSOONASSA (Fogg ei näy;
  asu v2 kauko-/takakuviin; kädet kadet-v1). PELATTAVUUSMALLI mainissa: docs/raportit/pelattavuusmalli-olavinlinna.md (#4163).
- LINNA v44s PEILISSÄ 9a89ce964b61e629 (fa389afd5; MUUTOKSET.md v44…v44s, _valmiit/olavinlinna-blender-v44). Huoneet 1–10 kävelymallissa.
  Siirtoseppä kytkee jokaisen viennin historia-fp:hen. Huoneet 1–8 käveltävinä: laituri, keittiö, Kirkkotorni, kappeli E3,
  tyrmä E 101 (osa tyrma-E101), huone 6 palatsi (Linnantupa + voudin sali leivottu, palatsi.js), huone 7 muurikäytävä, huone 8
  muurinharja + Kellotornin otteet (osa muurikaytava). Reitti kappelista: kaari-ovi → kaariportaat (RP 6,3) → ampumakäytävä
  (rengas r 4,85, 13,4) → 165° porras pääoven ulkotasanteelle → muuriportaat → Tott-kammio → 187,5° Linnantupa; 275° → muurikäytävä.
  Törmäystesti: proto-3d/tyokalut/linnanrakentaja-ajot/scratch-20261007/reittitesti.py (Blender -b -P … -- <kavely-v1/v2>): 0 estettä.
- ESINEET VALMIIT v44s: avainnippu, avainrengas, esiliina, myssy, keittokulho, arkku-komero (esineet-v1) merkeissä. Puuttuu vain
  esine:koysikieppi-glb. Ei käynnissä olevia agentteja eikä taustaajoja.
- HUONEET 9–10 VIETY v44r: komero (280°, tiilet, arkku + kilvet merkkeinä) ja pako (PT 21.0x vaihtoehto A: köysilasku 295°, rinne 300°,
  Kellobastioni pois vain 1499-näkymästä leikkauksilla pako-kellobastioni-1..3 + kallio; kirjattu _lahteet/olavinlinna-pohjat/
  SEIKKAILU-TARKISTUS.md loppuun). kuori_kavely.py: PAKO-alue rajaukseen ja kävelyyn (≤ 60°).
- AJOTAPA: muutos → leivonta (scratch paistot.sh / leivo_tila.py 2k) → kopioi v44:ään → ASTC (swift proto-3d/tyokalut/astc-mip.swift
  X.jpg X-4x4.astcm 4) → worktreessä `source ~/.zshrc; zsh tools/dioraama/vie-blender.sh --lahde <v44>` → commit blender.json + push →
  `gh workflow run vie-dioraama.yml --ref linnanrakentaja-linna-v42 -f rakennus=olavinlinna -f kuiva=false -f osoitin=false` → hash:
  `gh run view <id> --log | grep -oE "olavinlinna\*\* → \`dioraama/olavinlinna/[0-9a-f]{16}"` → Siirtosepälle `poikki peili
  https://media.matkakirja.app/dioraama/olavinlinna/<hash>/`. Kävely: Blender -b -P lahde/kavely.py -- v2, sitten lahde/kuori_kavely.py --
  _valmiit/olavinlinna-blender-v41/ulkokuori/ulkokuori_huippu.glb <v44>/tilat/laituri.glb $PWD/v2; rsync v2/ → v44/kavely/.
  Kappelin leivontapaketti: node scratch/rakenna_kappeli.mjs <paketti>. maalaukset.py ajetaan venv-rembg/bin/python:lla.
- JONO-HISTORIA (Päätoimittaja 7.10. 19.4x, PELATTAVUUSMALLI mainissa #4163: docs/raportit/pelattavuusmalli-olavinlinna.md, järjestys
  kohdan 12 sarakkeesta): (1)+(2) PINNAT JA MERKIT TEHTY v44m (eb8b9c55f5c22795, kavely.py PINTA + PELI + REITTI, kaytava(komero=));
  (3) TYRMÄ TEHTY v44n (190df07ec22e8616, kavely.py tyrma(): osa tyrma-E101 siiven pohjoisosassa, paikka A koska eteläosassa vanha
  keittiö-dioraama; merkit istuu:pelaaja-tyrma, ilmarako:tyrma, esine:avainnippu-tyrma, ovi:tyrma(-ulos/-ryomi), ontto:tyrma,
  esine:irtokivi-tyrma, istuu:tyrma-vartija, pinta:olki-1, valo:tyrma-rako; ovi:tyrma kierto_y lisätty lähteeseen, EI vielä viety).
  TEHTY v44p (a727471eac2cc946, 1d894529f): esine-tarjotin/patapino/hiilipannu (esineet-v1) merkkeihin; vartija-istuu-v1 (torkku, syo,
  nousu_istumasta; v44/hahmot/vartija-1500(-faceit).glb symlinkit sinne). Puuttuu: mallit avainnippu, esiliina, myssy, keittokulho,
  avainrengas; (4) HUONE 6 KÄVELY TEHTY lähteessä (VIETY v44o 9256c9c5be8870c3 / v44p): Päätoimittajan reitti 20.3x (TULKINTA):
  kaari-ovi → kaariportaat ylös → ampumakäytävä (30° suu avattu, raja poistettu) → 165° muurinsisäinen porras alas pääoven
  ulkotasanteelle 215° → muuriportaat alas Tott-kammioon → eteläovi 187,5° → käytävä → Linnantupa (osa palatsi) → länsiseinän
  porras → voudin sali. Tott-kammioon naulakko (esine:esiliina, esine:myssy) ja takka (valo:tott-takka). kaytava(avoin=, avoin_k=)
  avaa liitosten sisäseinät (törmäystesti scratch reittitesti.py: molemmat reitit 0 vikaa). Palatsin tilat leivotaan
  (scratch rakenna_palatsi.mjs → palatsi-paketti → leivo_tila 2k paiva+hamara) → v44 tilat/valot + ASTC → v44o; palatsi.js
  kohdistettava false; (5) huoneet 7–8 TEHTY v44q (kavely.py kirkkotorni() lohko (f)); SEURAAVAKSI huoneet 9–10 (komero: tiilet,
  arkku kilpineen; pako: köysilasku kalliolle, rinne, vene) ja Päätoimittajan uudet linjaukset; tyrmä E 101 karkeana; (4) huone 6:
  naulakko (esiliina + myssy) Tott-kammion puolelle Linnantuvan oven viereen + takan hiillos Tott-kammioon; (5) huoneet 7–8
  (huone 7 = muurikäytävä, EI kierreporrasta; pako = köysilasku kalliolle). Huone 6:n REITTI (Päätoimittaja): kappelin kaari-ovesta
  SAMOJA muuriportaita alas Tott-kammioon ja sen ovesta Linnantupaan (L2, L15); EI uutta käytävää.
- HUONE 6 ALOITETTU 578f94a91: js/dioraama/rakennukset/olavinlinna/palatsi.js (TILA_LINNANTUPA + TILA_VOUDIN_SALI, kohdistettava
  false, sijoitus suunta 333, paikallinen origo siiven keskilinja (−10,56; 5,38), sisämitat 7 × 17, tupa 3,4 / palkisto 7,0 / sali
  7,5 / holvi 10,1→12,6), tools/dioraama/reseptit-linna.mjs tynnyriholvi. EI vielä leivottu eikä kävelymallia (kavely.py palatsi():
  Tott-kammion ovi kompassi ≈ 186° → käytävä → Linnantuvan pohjoisovi x 0; muurinsisäinen porras länsiseinässä z −10,8 → −5,1).
  PR linnanrakentaja-linna-v42 → main kun Päätoimittaja pyytää.
- GIZA (odottaa): Sfinksin LOD1/2 väritekstuuri ~70 % mustaa (LS1:n mittari proto-3d/tyokalut/linssiseppa-ajot/glb-musta-uv.py),
  helmat liian vaaleat; _valmiit/giza-v2. KIELLETTY (odottaa): haara linnanrakentaja-kielletty.

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
- 7.10. 10.5x: UUDELLEENKÄYNNISTYS ~11.05 (Postivahti). paistot.sh pysäytetty ennen yhtään paistoa; ei ajoja käynnissä. Scratchpadin
  tarpeelliset tiedostot talteen proto-3d/tyokalut/linnanrakentaja-ajot/scratch-20261007/ (paistot.sh: aseta SCR; rakenna_kappeli.mjs ja
  rakenna_g102.mjs rakentavat leivontapaketit worktreestä; leivottu_esik.py / atlas_esik.py = leivotun glb:n esikatselu; pohja-muunnos.json
  + korkeus.npy = piirroksen kohdistus kuoreen). KÄYNNISTYKSEN JÄLKEEN: (1) muisti → paistot.sh (kappeli + keittio-g102, päivä + hämärä)
  → tarkista leivottu_esik.py:llä, että holvin laki ja keittiön katto näkyvät; (2) kuori_kavely.py v2:lle (ulkoalue); (3) v44 =
  _valmiit/olavinlinna-blender-v44 (v43 + soutu tehty) + tilat/valot kappeli ja keittio-g102 + ASTC + kavely v2 → vie-blender →
  vie-dioraama osoitin=false → peili Siirtosepälle. Päätoimittajalta odotetaan kuittausta 2k-leivontaan (fseventsd 15 Gt).
- 7.10. 10.5x: GIZA: LS1:n Google-korkeudet → _valmiit/giza-v2/lahde/google-korkeudet-ls1-20261007.md (Sfinksin kaukalo ~34,3–34,8, mallissa 35,6; itäkulmat liian korkealla). Tee käynnistyksen jälkeen.
- 7.10. 11.0x: PÄÄTOIMITTAJA KUITTASI keittio-g102 ja kappelin; leivonta 2k (paistot.sh: RESO 2048, RAJA_GT 10, /usr/bin/time -l mittaa huipun), yksi kerrallaan, ei testejä samaan aikaan, VASTA HERÄTYSVIESTIN JÄLKEEN. Uudet stillit (katto + holvin laki) Päätoimittajalle → v44 → peili Siirtosepälle.
- 7.10. 12.3x: LINNA v44 PEILISSÄ 5795bcd4039bf161 (blender c57db7df35c39a39, haara linnanrakentaja-linna-v42 c4be712f9) →
  Siirtoseppä. Leivonnat 2k (huiput 8,7–13,1 Gt). Kävely v2 korjattu Siirtosepän v43-huomioista (kavely.py: E 102 -käytävä
  pikkupihalta kierreportaalle, UV:t laatikkoprojektiona, pinnat rappaus/kivilattia, kappelin lattia+seinä törmäykseen;
  kuori_kavely.py: toistuva DECIMATE + pienimmät saarekkeet pois → 9 708). Stillit proto-3d/lokit/linnanrakentaja-v44/.
  GIZA: helmat sävytetty (helma.py TAVOITE 205,190,160), aitaus.py POHJA 19,0 + itäpää −2,8 (LS1:n Google-korkeudet),
  sfinksi_sdf → giza-v2/lahde/sfinksi-verkko.npz, sfinksi_glb → giza-v2/sfinksi-uusi (korvaa glb/sfinksi-* -symlinkit) +
  sijainnit.json korkeus_egm2008 19,0 / ellipsoidi 34,6.
- 7.10. 12.5x: v44b PEILISSÄ eb413b52d375da8d (blender fec1729f, haara linnanrakentaja-linna-v42) → Siirtoseppä: venereitti
  kavely/merkit.json (vene:alku/muuri/portti/laituri + nousu:laituri, osa ulkoalue; kiinnitys laiturin ulkopäässä NW-puolella
  s 12,5 o −3,2, kierto_y 2,1272) ja veneen istuin_matkustaja (0; 0,13; −1,8) _valmiit/olavinlinna-soutu-v1/glb/vene_*.glb
  (JSON-chunk-muokkaus, animaatio säilyi). Kappelin koillisikkuna + rautaluukku (Aspelin 1875, #4129) kappeli.js:ssä, EI vielä
  leivottu (Päätoimittaja: seuraavan leivonnan mukana). GIZA v2: helmat 150 m (helma.py --sijainnit giza-v2/glb/sijainnit.json,
  ulko-osa 8 m, Sfinksille helma, SISA 4 m), Sfinksi korkeus 19,0 EGM; Sfinksin väri liian tumma → sfinksi_glb.py normalisoi
  värin sRGB 195,170,128:aan → leivonta giza-v2/sfinksi-uusi (kun valmis: korvaa glb/sfinksi-lod*.glb + sfinksi-tekstuurit,
  tarkista mediaani ~195,170,128, ilmoita LS1:lle, joka ottaa Gizan pelikuvat Päätoimittajalle).
- 7.10. 13.0x: GIZA v2b VALMIS ja LS1:llä (Sfinksin väri + aitauksen hiekka, helmat 150 m + sfinksi-helma). Odottaa LS1:n pelikuvia Päätoimittajalle. Ei käynnissä olevia ajoja.
- 7.10. 13.0x: JONOSSA (Siirtoseppä, ennen v45): portinvartija-1500 henkilöihin = vartija-1500:n varianssi (eri päähine/väri, samat leikkeet idle/kavely/puhe + ele_*), mixamo-v5 + faceit-v2 -ketjulla; paikka/partio vasta kun docs/raportit/olavinlinna-pystyleike-repliikit.md:n kohtaus lukittu. Lisäksi v45:een kappelin koillisikkunan leivonta.
- 7.10. 13.3x: OMISTAJAN PÄÄTÖS: Olavinlinnan PELIOSA (pystyleike laituri → keittiö → kappeli) ensin; vanhaan esittelyyn vain virhekorjaukset. Prioriteetit: käveltävät tilat + törmäykset, vene/laituri, keittiön ja kappelin esineet, kappelin luukku (kiinni). GIZA ja KIELLETTY ODOTTAVAT. Järjestys sovitaan Siirtosepän kanssa klo 15 jälkeen (kysytty).
- 7.10. 13.3x: JÄRJESTYS (Siirtoseppä kuittasi) klo 15 jälkeen: (0) FOGG-1873 PELAAJAKSI (E1 laituri → keittiö, tavoite ~20.00):
  skin-glb + leikkeet idle, kavely (~1,4 m/s), juoksu (~3,2 m/s), hiipiminen (~0,9 m/s kyykyssä), kyykky_idle (+ nousu veneestä jos
  ehtii); 1,75 m, juuri jalkojen välissä, kasvot +Z; Mixamo/UAL (hahmo_mixamo.py-ketju, linna-hahmot/mixamo-v5 pohjana). Tarkista
  onko Fogg-hahmoa jo (hahmot/ tai linna-hahmot/), muuten UBC-pohjasta 1873-asuun. (1) v45: kappelin koillisikkuna leivottuna,
  portinvartija-1500, keittiön esine:savipurkki/kauha/nauris/lautanen → rakennus.json esineet{} glb:t (esineet-v1) + heitettava: true.
  (2) törmäys/kamera-korjaukset ja (3) vene v2 Siirtosepän ajojen jälkeen.
- 7.10. 14.3x: v44c PEILISSÄ c8a45400570196fe (blender 16e04782): FOGG pelaajaksi (_valmiit/linna-hahmot/pelaaja-v1: pelaaja_skin.py,
  fogg.glb/json, LAHTEET; rakenna.mjs `pelaaja` ← js/dioraama/pelaaja.json) + laiturin kansi kavely.py:n laituri_kansi(). Venemerkit
  nyt kavely.py:ssä (VENE). TYÖN ALLA v44d: kavely.py pikkupiha() (kiveys) + käytävien kivikatto (V1-stilli 5), keittio-g102.js
  seinät taka: 'kivi' (V1-stillit 3–4), kappelin ikkuna → paistot.sh (2k, muisti > 10 Gt) → v44: tilat/valot kappeli + keittio-g102
  + ASTC + kavely v2 → vie-blender → dispatch → Siirtosepälle. GIZA JONOSSA (odottaa omistajaa): LS1 mittasi LOD1/2 väritekstuurin
  67–70 % mustaa (leivonta aukkoinen: cage/ray + täyttö), helmat liian vaaleat/keltaiset (harmaammaksi + reunahäivytys).
  (LS1: mittaus proto-3d/tyokalut/linssiseppa-ajot/glb-musta-uv.py; kaukoreiät LS1 korjasi itse, helmoja ei kasvateta.)
- 7.10. 14.4x: v44d PEILISSÄ 13cdef0883fdabf6 (blender f975e0ce, haara linnanrakentaja-linna-v42) → Siirtoseppä + Päätoimittaja: pikkupiha-kiveys, käytävien kivikatot, keittiön kiviseinät (leivottu), kappelin ikkuna + tumma luukku (kengat-pinta; rauta leipoutuu ruosteeksi), Fogg, laiturin kansi. Seuraava: Siirtosepän E1-löydökset; v45: portinvartija (henkilöpankissa jo, malli mixamo-v5 + faceit-v2 olemassa), keittiön esineet heitettava: true.
- 7.10. 15.0x: v44e PEILISSÄ c8e860098d01431c (blender 73e9856f, f8e772ad0): laiturin kansi OIKEALLA akselilla (sijoitus.mjs 41°, pinta −5,9; aiempi 16° vinossa), venemerkit itäkylkeen, nousu s 10,2, piilo 0,9 m irti seinästä, heitettävät esineet + kavely.esineet, portinvartija lisaHenkilot. JONOSSA: keittio-g102:n uudelleenleivonta tynnyrien uusilla paikoilla (muisti), kun muistia > 10 Gt.
- 7.10. 16.1x: v44f 77bebc5e (keittiö tynnyreineen) ja v44g PEILISSÄ fd7d3e32c86ed7fb (blender 737600b4): laiturin luiska koko kannen levyinen + näkymättömät reunaseinät (Siirtoseppä: putoaminen kynnyksellä). E1 toimii (vene, soutaja, Fogg, piilo, vartijan partio).
- 7.10. 17.xx: E3 v44h PEILISSÄ 87e023c69817a28d (blender f3b2a045): kappelin kätkö sivualttarin (38°) syvennyksessä + kilpilaatat (kappeli.js SYV, torni 4 osassa), esineet kivi-1..3/kalkki/pateeni/liuskekivi (agentti, esineet-v1/lahde/esineet.py), merkit kavely.py kirkkotorni() E3-lohko; leivo_tila alapintaraja 1,2 m.
- 7.10. 18.xx: E3b–d TYÖN ALLA: kappeli.js seinaAukoin() (SEINAN_AUKOT: kaari-ovi 300° 1,05 × 2,4, kätkö 0,5 × 0,4 × 0,4, ikkuna todellinen aukko; ristit [236…87]); kavely.py kappeli-kavely-osa (seinä + holvi 95…230, pääovi 215, kaariportaat r 5,75 → ampumakäytävä r 4,85 y 13,4, 8 aukkoa, reitti:vouti-*, portaikko:ylapaa); merkit E3 (luukku:koillinen, valo:ikuinen, esine:kirja, piilo:alttarin-varjo, ovi:paaovi, reitti:kappalainen-paluu/luukku). Agentti tekee mallit (kivi-1..4, liinanyytti, ikuinen-valo, sammutin, sarvilyhty, kirja, luukku; kalkki/pateeni hopeaksi).
- 7.10. 18.4x: v44i PEILISSÄ d73c80b2905f1ed2 (blender 1aadaf1b) → Siirtoseppä (E3b–d valmis). LS2:lle Kellotornin komeron koordinaatit (nakyma:kellotorni-kaari lisätty kavely.py:n VENE-listaan, mukaan seuraavaan vientiin). Paistojen muistiehto nyt proto-3d/tyokalut/linnanrakentaja-ajot/muisti-ok.sh (vm_stat free+inactive+speculative ≥ 20 Gt, swap < 2 Gt). Agentti tekee Foggin nousu_laiturille-leikkeen (pelaaja-v1).
- 7.10. 19.2x: v44j PEILISSÄ 42d49bd4b2a86677 (blender 59d592f4): Foggin nousu_laiturille (agentti, pelaaja-v1/lahde/aja_nousu.sh; vanha fogg-v1.glb), nakyma:kellotorni-kaari. Päätoimittajan illan jono (1) kynnys (2) kappeli E3 (3) kiipeily = VALMIS. GitHub 500 klo 18.15: push + dispatch uudelleenyrityssilmukalla.
- 7.10. 18.5x: OMISTAJAN PÄÄTÖS: pelit 1. PERSOONASSA → Foggin malli/leikkeet eivät näy; ei lisätyötä, ei poistoa. Painopiste: tilat silmänkorkeudelta ja läheltä (pinnat, mittasuhteet, valot). Huone 6 pohjatyö: _lahteet/olavinlinna-pohjat/HUONE6-PALATSI.md. Holvimaalaukset + maalattu kilpi (leivo_tila maalaukset-projektorit, _valmiit/olavinlinna-maalaukset-v1) leivottu; kilpilaatat agentilla.
- 7.10. 18.5x: v44k TYÖN ALLA: kilpilaatat (agentti, esineet-v1: tumma liuske kuten käsikirjoitus kohta 3, Tott nelijaettu, Sture 3 sjöblad) kavely/esine-kilpilaatta-*.glb + merkit esine:kilpilaatta-* (kiintea, kavely.py SA ∓ 0,21 m, y yk + 2,0); maalattu kilpi-tott.png nelijaetuksi (maalaukset.py, aja venv-rembg/bin/python); kappeli leivotaan uudelleen (scratchpad v44-kappeli-paiva/-hamara) → v44 tilat/valot + ASTC; v44/kavely = kavely-v1/v2 (85 merkkiä), hahmot/fogg.glb = asu v2 (huppu, hanskat). Käsimalli-agentti (kadet-v1) käynnissä → v44/hahmot/kadet.glb + js/dioraama/pelaaja-kadet.json.
- 7.10. 18.52: v44k PEILISSÄ a51f1b699c598cc0 (blender a2fb2ddf, 4d59826d7) → Siirtoseppä + Päätoimittaja: kilpilaatat (liuske, Tott nelijaettu), kappeli maalauksin, Fogg asu v2. tools/dioraama/rakenna.mjs:ssä COMMITOIMATON pelaaja.kadet-lohko (odottaa käsimallia). Seuraava: käsimalli → v44l; huone 6 karkea tila.
- 7.10. 21.5x: OMISTAJA: ei paistoja/polttoja junakäännöksen aikana (/tmp/matkakirja-kaannospalvelu.lukko) → muisti-ok.sh odottaa lukon vapautumista.
- 7.10. 23.30: VAIHTO NYT. Ei käynnissä olevia taustaajoja, agentteja eikä paistoja. Viimeisin vienti v44s 9a89ce964b61e629 (fa389afd5), Siirtoseppä kytkenyt. Seuraavaksi: köysikiepin glb (esineet-v1) ja Päätoimittajan uudet linjaukset; PR linnanrakentaja-linna-v42 → main vasta pyynnöstä. Paistoehto muisti-ok.sh odottaa myös käännöslukon.
- 8.10. 07.5x (uusi tili): v44t PEILISSÄ 9553a74d99301474 (blender 00abfb462): kavely/esine-koysikieppi.glb (esineet-v1 rakenna_koysikieppi, apu-UV koysi poistetaan ennen vientiä; tee() poistaa muut kuin UVMap) + kavely.py merkin glb. Siirtoseppä 8.10.: Foggille ote_idle/ote_siirto/ote_lipsahdus/koysilasku/uinti (UAL Swim)/ryominta → Opus-agentti (pelaaja-v1/lahde/aja_ote.sh), sitten fogg.glb v44u:hun. PT:lle kysytty vesiportin bastioni (A TULKINTA L1 s. 99 / B leikkaukset + etuvarustus), oletus A klo 12. Huom: swap 8,7 Gt → muisti-ok.sh ei päästä läpi; pieni esineleivonta ajettu ilman sitä (lukko tarkistettu).
- 8.10. 07.4x: PT: bastioni A nyt (TULKINTA L1 s. 99 kirjattu SEIKKAILU-TARKISTUS.md), B JONOSSA junan 164 jälkeen M-vaiheen kanssa (bastioni pois 1499-näkymästä kuten Kellobastioni, matala 16 × 10 m etuvarustus, portti T 102:n eteen; reitti + merkit samaan erään Siirtosepän kanssa). T7-simusarja: omiin ajoskripteihin (linnanrakentaja-ajot/*.sh) lisätty source simusarja.sh; MCP-simutyökalu näkee vain vanhan sarjan.
- 8.10. 08.28: v44u PEILISSÄ 46995cfcaac323a9 (fogg.glb + ote_idle/ote_siirto/ote_lipsahdus/koysilasku/ryominta/uinti/uinti_idle; pelaaja-v1/lahde/aja_ote.sh — aja_nousu.sh:n jälkeen AINA aja_ote.sh). v44v PEILISSÄ 89d543aec304761b (8d21dc3fb): reitti:pelaaja-21…94 huoneet 6–10 (laskin proto-3d/tyokalut/linnanrakentaja-ajot/reitti_m.py, testi scratchpad reittitesti_m = reittitesti.py + reitti:pelaaja ≥ 21, kiipeilyvälit ohitettu). OMISTAJA 08.4x: peli historiallisesti oikeaan 1499-linnaan (08.1x nykyasu kumottu): Kellobastionin rajaus pysyy; SEIKKAILU-TARKISTUS.md:ssä lista myöhemmin rakennetuista osista (historia-animaation pohja). JONO: B (vesiportin bastioni pois 1499-näkymästä, 16 × 10 m etuvarustus, portti T 102:n eteen) junan 164 jälkeen; Siirtosepän sidotut nimet pidetään (vene:*, nousu:laituri, osat vesiportti/ulkoalue/porttikaytava-T102, partio:portinvartija-N, partio:renki-N, piilo:laituri-*, reitti:pelaaja-1…8, tila laituri), koordinaattilista Siirtosepälle ENNEN vientiä.
- 8.10. 09.08: v44w f8aa682f9a13434a (huone 7 piilot + kivi-heitto; LS2: ovelta tikkaille 0 kiinni). v44x d1695f964cff22aa (4ebfd3494) = B: ranta1499.py/.json + osa ranta-1499 + etuvarustus ja silta (B-ETUVARUSTUS.md); Siirtosepälle 'junaan vasta junan 164 jälkeen'. v44y TEKEILLÄ: harjan vartija ja talonpoika 5 m liitoksesta itään (LS2/Siirtoseppä vaihtoehto b), vienti odottaa käännöslukkoa. HUOM kavely.py: PELI-listan piilot laituri-* haetaan nimellä (indeksit siirtyivät).
- 8.10. 09.34: v44y 94c9400a6cfa00e7 (harja: vartija + talonpoika 5 m liitoksesta). v44z 92f6029878e2011b (286879aea): huone 2 silta laiturin itäkyljestä s 4,5 portinvartijan selän taakse (LS2: B jäi pisteeseen 3/20), ranta-1499 leikkauksia 9. Siirtoseppä: kuorileikkauksia max 32, valinta vain-1499* → oma osa → naapurit → etäisyys (49 ok). Odottaa LS2:n simulaatiota v44z:lla.
- 8.10. 17.03: Sisältökirjurille latauskuvan vertailukuvat proto-3d/lokit/linnanrakentaja-v44/olavinlinna-latauskuva-v44z-{a,b}.png (skripti scratchpad latauskuva.py: kuori + vain-1499-leikkaukset + ranta + etuvarustus, Cycles 64, qwantani_dusk; a 215° 180 m, b 228° 105 m). PT: SEURAAVA ERÄ M-osa (huoneet 6–10) junaan 167 Siirtosepän vedolla; arvio 3–4 h viimeistelyä (palatsin kalusteet ovat jo palatsi.js:ssä: pitkä pöytä, noppapöytä, takat, voudin pöytä + kynttilät + kirja + vati). Akustiikka #3979 ja Tavli #3976 jäävät tämän jälkeen. Odottaa Siirtosepän työnjakoa ja LS2:n v44z-simulaatiota.
- 8.10. 17.18: Siirtoseppä M-osa (juna 167): nimet ennallaan (25 merkkiä tarkistettu). v45a 6a4e9cadc388f51a (781586aad): esine-tiili-komero + esine-koysi-vene (esineet.py koysi_putki-refaktori, koysikieppi ennallaan). Kilvet jo solmuina arkussa. Seuraavaksi LS2:n löydökset M-osasta.
- 8.10. 17.49: PT työjonot (/Users/Shared/Claude/Matkakirja-fable/scratchpad/tyojonot.md, SITOVA): valmis erä → 1 rivi PT:lle ja heti seuraava; [LUPA]/[PT] ohi; tyhjä → 'JONO TYHJÄ: Linnanrakentaja'. Kohta 1 VALMIS: PR #3979 akustiikka + M-osa (worktree wt/linnanrakentaja-akustiikka, 04c50b5dd; akustiikka.py --tilat/--kavely/--ei-pihaa; tuotos olavinlinna-akustiikka-v1 + v44/akustiikka). Kohta 2 VALMIS: PR #3976 Tavli (worktree wt/linnanrakentaja-tavli, 2e8f558ca, main yhdistetty). npm test 5403/5403 molemmissa. JONO TYHJÄ ilmoitettu; NYT-kohta (M-osa) odottaa LS2:n löydöksiä v45a:lla.
- 8.10. 17.59: JUNA 167: PR #4213 (linnanrakentaja-linna-v42 → main, 6dc592553, npm test 5406) PT kuittasi. OSOITINTA uusin.json EI vaihdeta (TF 164–166/ulkoiset 165 lukevat); vie-dioraama push-ajo ei vaihda osoitinta (vain käsiajo osoitin=true) → Julkaisijalle kerrottu, PR-kuvaus korjattu. Juna 167 lukee v45a:n PelattavaPalaHashin kautta. Uusi erä junaan 168: Tavlin 3D-laudat natiiviin; kysytty PT:ltä A/B/C (laudat jo natiivissa 2D-kerroksina + 3D-noppa, proto master bdd0e8c5f; suositus C = lauta+nappulat glb:nä samalla RT-kameralla kuin nopat). Natiivirepo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (remote natiivi-backup), UI/Pelit/TavliNakyma.cs + TavliNopat.cs.
- 8.10. 18.00: PT valitsi Tavlista A (tarkistus): kaikki 3 lautaa × 4 kerrosta + .meta, tavli-mitat.json ja noppa-glb.bytes natiivissa OK. Ehdotus C kirjattu docs/raportit/ehdotus-tavli-3d-lauta-20261008.md (omistajalle myöhemmin). JONO TYHJÄ lähetetty; LS2:n M-osan löydökset v45a:lla ensisijaisia.
- 8.10. 18.16: SUORITUSKYKYAUDITOINTI (PT, juna 168): v45b PEILISSÄ 2adaa1e6c374bb36 (haara linnanrakentaja-linna-v45b 73890ba31, pohjana linna-v42 koska #4213 junassa 167 → ei pushia sinne). Esineet RGBA32 87,9 → 61,9 Mt, Fogg 16 → 4 Mt, kilpilaatat 12k → 6k. Raportti docs/raportit/olavinlinna-suorituskyky-v45b-20261008.md (myös v45b-haarassa). Ehdotukset Siirtosepälle: esineet ASTC, jako per glb, huonekohtainen lataus. PR v45b → main vasta #4213:n mergen jälkeen.
- 8.10. 19.09: v45c 84c975aba9876a55 (esineiden .astcm 34 kpl, 21,3 Mt), v45d e557f4a4dc62944c (kohtaukset v4: vuorot, avainsanat, aanet v2/v3 vie-aanet.sh:lla; Siirtoseppä kiinnitti palaan historia-m ced86f187), v45e 8d2da9625b106111 (veneen vesimaski, soutu-v1/lahde/vesimaski.py), v45f 77acdd6cb36380ee (märkyys osat/pinta-merkit, vene:alku −93,05/64,32). Kaikki haarassa linnanrakentaja-linna-v45b (PR mainiin vasta, kun PT pyytää). Moonwalk: Siirtoseppä korjasi jo junassa 167. Hahmopluginit PT:lle: Final IK ei pelissä (siirtoseppa/final-ik, #4006 OPEN), HBM vain Blender-putkessa. Grounder-tiedot Siirtosepälle (luut, mitat, maakerros DioraamaNayttamo.Kerros, esineiden colliderit pois).
- 8.10. 19.33: v45g 209d15bb019e4137 (#4006 yhdistetty v45b-haaraan: hoitajan kadet), v45h a1be7ea5f4f54b57 (ranta-1499 törmäys + kävely < 40°, partio:ranta-1 kalliolle, NAAPURIT). Siirtoseppä: Grounderille riittävät kävelyn törmäys-glb:t (IkKerros 30). Juna 167 pysyy v45b:ssä; junaan 168 v45h. #4006 jää auki (sisältyy v45b-haaraan; sulje kun v45b-PR mergetään).
- 8.10. 19.45: v45i fd269407ada4dea1 (eb71decd3): ulkoalue-tormays ilman harvennusta (101 k, LS2 varpaat kivissä; mittari scratchpad tormays_ero.py: törmäys > 1 cm näkyvän alla 27,9 % → 0,2 %; portaat ja ranta 0). LS2: porrasreuna 8,5 cm vanha, Siirtosepän Best-laatu 2,6 cm. Muistiarvio v45i (raportti v45b-haarassa 6839bc43c): M-iPad täysi ≈ +62 Mt (raja +60), kevennetyt ≈ +50, ilman ASTC-lukijaa ≈ +103. JONO TYHJÄ lähetetty. Junaan 168 uusin v45i.
- 8.10. 19.55: THIEF-VERTAILU (omistaja 19.4x): docs/raportit/grafiikka-thief-vertailu-20261008.md (ceb21928b). Ero: ei normaali- eikä karheuskarttoja, seinät 117–156 px/m, kuori 43 px/m, kävelyosat ilman valoatlasta. Ehdotukset: #1 toistuvat CC0-detaljimateriaalit (+11 Mt, vaatii Siirtosepän varjostinerän), #2 kävelyosien leivonta (+9 Mt), #3 kuoren lähidetalji (+5 Mt); osto vain valinnainen modulaarinen sarja. Yhteenveto PT:lle lähetetty; odottaa PT:n päätöstä #1–#3:sta.
- 8.10. 20.4x: #2 KÄVELYOSIEN VALOATLAKSET (PT 20.0x): v45j a2aa0d96879ecca5 (f3e927333): 8 osaa, pelkkä valo 1024² (valo × 0,5 sRGB), osat.json osa.valoatlas, vie-blender.sh kavely/valot; työkalut kavely-v1/lahde/leivo_kavely.py (nurin olevat esinelaatikot käännetään leivonnan ajaksi, naapuritilat pois varjostajista, kuori leikattu kohdeosan rajoilla), merkitse_valoatlas.py, tarkista_kavely.py. Siirtoseppä: grafiikka-169 686cea711 tila valo. v45k 2686c37fe hahmojen ASTC 6×6 (120 kuvaa 16,9 Mt; glb_kuvat_astc6.py), peiliajo 37817771307. Seuraavaksi #1 kivi-detalji (rakennus.json detaljit pintanimen mukaan, Siirtosepän kuittaama), sitten kuumailmapallon kupu Linssisepälle (~23).
- 8.10. 21.5x: v45l 09c782fadd922e86 (valoatlaspolut blender/kavely/valot, detaljit.json osoitin rakenna.mjs), v45m f731b7d438e57a17 (detaljit kivi/rappaus/puu/lankku + aliakset kivilattia/kallio/leikkaus/kuori; _valmiit/olavinlinna-detaljit-v1/lahde/detalji.py), v45n ca94057a6b155179 (ranta-1499 valoatlas; kaikki 9 näkyvää osaa). Siirtoseppä: grafiikka-169 2dffd9983 (v45l), detaljilukija 307b0ae9c. Muistiarvio M-iPad täysi ≈ +39 Mt ennen huonekohtaista latausta. Kuumailmapallon kupu Linssisepälle: _valmiit/ilmapallo-v1/kupu (lahde/kupu.py, 16 472 kolmiota, ASTC-versiot). glb_kuvat_astc6.py: datakartat lineaarisina. Odottaa: LS2-löydökset, junan 169 kuvaparit (Siirtoseppä), kerroinpyynnöt.
- 8.10. 22.4x: OMISTAJA 19.5x (muistiraja pois, kaikki parannukset, 4 tasoa): v45o 85dfe875bb235d64 (e9d6aa48f): 8k-atlakset kappeli/keittio-g102/linnantupa/voudin-sali (leivo_tila --iso 8192: väri 8k × valo 2k, 46 s/variantti; asennus scratchpad iso/asenna_iso.sh), esineiden normaalit (esineet-v1/lahde/normaalit.py --glb v44/kavely). Selvitykset: hahmot (CC/MetaHuman/Tripo), MetaHuman-voutikoe, asut, Codex-pinnat, ostot (maksulliset lisenssit vaativat ei-poimittavan jakelun → CC0 nyt). Rekvisiitta #5: _valmiit/olavinlinna-rekvisiitta-v1 (28 Poly Haven CC0 -mallia, lahde/rekvisiitta.py; merkki rekvisiitta:<tunnus> Siirtosepän kuittaama), sijoittelu seuraavaksi → v45p.
- 8.10. 23.1x: v45p 27c1262c20dfd693 (fe8e8de0b): rekvisiitta 48 merkkiä / 22 Poly Haven CC0 -mallia (keittiö, Linnantupa, voudin sali, tyrmä; pikkupiha pois; barrel_03 nykyaikainen → pois), _valmiit/olavinlinna-rekvisiitta-v1 (rekvisiitta.py, sijoittele.py, silmasta.py, ylhaalta.py, LAHTEET.md), kavely.py liittää sijoittelu.json:n. Seuraavaksi: 8k laituri (kirkkaus ×0,77 v19:ään!) ja vanhat tilat, sitten #4 geometria resepteihin.
- 9.10. 00.1x: v45q 45ab2d2f8fd132d1 (esine-glb:t ilman normaali-PNG:tä), v45r 1fb40fb0eefb6f36 (rekvisiitta ≥ 0,3 m esineistä, 46 merkkiä), v45s ebf1c3555cca094e (bf6b1df07): 8k kaikille 10 tilalle (scratchpad iso/vanhat_iso.sh: kirkkaus sovitettu vanhaan; asenna_iso.sh korvaa v41-linkit mv:llä, v41 koskematon) + detaljien korkeuskartat (parallaksi Ultra, Siirtoseppä juna 169). Seuraavaksi mallinnetut yksityiskohdat resepteihin ja kuvaparit junasta 169.
- 9.10. 01.0x: v45t a451fb0969fce642 (e831ce4a2): hahmojen PBR-välivaihe #7 (_valmiit/linna-hahmot/pbr-v1/lahde/hahmo_pbr.py: uusi UV asulle, 2k kangas CC0 + normaali, normaalikorjaus B<0,55; rakenne glb_rakenne.py ennallaan; v44 hahmot korvattu os.replace, lähteet koskemattomia). v45u 9f54d23bd (olki riet_01, rauta rusty_metal_02, alias metalli) peiliajossa 37850900359. Kompassi Linssisepälle: _valmiit/ilmapallo-v1/kompassi (2 092 kolmiota). MetaHuman-koe: projekti proto-3d/_tyo/metahuman-koe; odottaa omistajan Core Data -asennusta ja Epic-kirjautumista editorissa (skripti vaihe1_vouti.py, enum JOINTS_AND_BLEND_SHAPES).
- 9.10. 01.4x: v45v 0b3bc7df34670313 (7ef04b6f2): kappelin kivikehykset (resepti kivikehys reseptit-linna.mjs + testit, kappeli.js KEHYKSET, REIAT-kynnykset aukon sisään), kappeli 8k uudelleen. OPPI: lukon tarkistus 'ls lukko 2>/dev/null' tulosti hakemiston sisällön (kuka, pid) eli lukko OLI varattu → aina 'while [ -e lukko ]; do sleep 20; done'. Concorde-lähdepaketti Karttasepältä (proto-3d/_tyo/karttaseppa/concorde/), odottaa PT:n järjestystä.
- 9.10. 02.5x: v45w 8928700fe9c99485 (99d1675f9: kivikehykset keittiö G102 + Linnantupa + voudin sali, 8k uudelleen; kamera:K3), v45x 6ae3c7f5544feab3 (e34149404): kellotornin otteet 10 → 24 (Siirtoseppä #4245; ~0,7 m väli, reitti 17,3 m, kaari +0,9 m, puuskat 7/14/20; kavely.py + merkit.json v44/v2/v3 scratchpad otteet24.py). CONCORDE v2 _valmiit/concorde-v2 (lahde/maa_tekstuuri.py OSM-maa ilman autoja/varjoja + sävyvaihtelu, aukio.json = OSM place=square leikkaus, leikkaus_latlon.json; obeliski 10,5 + 19,26 + 3,6 m, suihkulähteet ⌀ 16,5 / 9 m, vahtikopit 8,8 m, kaiteet 1,1 m, rostraalit 18 OSM-valaisinta < 20 m suihkulähteistä = OLETUS); LS2 testaa file://, EI ämpäriin ennen PT:tä. PYSTYHELMAT (LS2, juna 170 DEM-ehto): Concorden maan reunaan 4 m, Gizan helmat v3 (giza-v1/lahde/helma.py HELMA 4: pystyreuna + ulkolevy DEM − 4) → giza-v2/glb. Seuraavaksi #4 keittiö + Linnantupa (mallinnetut yksityiskohdat resepteihin).
- 9.10. aamuyö: KAUPUNKIMALLIT (PT-järjestys): RIDDARHOLMEN v1 HYVÄKSYTTY (_valmiit/riddarholmen-v1, lahde/riddarholmen.py: OSM-osat + valurautaspiira pitsinä erillisenä solmuna "spiira") → LS2:n putkeen. NOTRE-DAME v1 (_valmiit/notre-dame-v1, lahde/notre_dame.py: 83 OSM-osaa, ruusut, tukikaaret, spiira-solmu 96 m, 16 patsasta; puhdas 2024+ asu). CONCORDE v2.1 (lahde/laajenna.py: leikkaus +15 m reunus, 151 pistettä; lahde/maa_tekstuuri.py: retusoitu IGN-orto 2021, v2:n proseduraalinen maa_tekstuuri_v2.py). PINNAT CC0-skannauksista (_valmiit/kaupunkipinnat-v1, Poly Haven + ambientCG, _lahteet/polyhaven-kaupunki ja ambientcg-kaupunki). Kaikki LS2:lle file://-testiin, EI ämpäriin ennen PT:tä. Seuraavaksi: Olavinlinnan #4, Siirtosepän lakaisu:apulainen-merkki, vuosi-extrat (vuodesta/vuoteen, Sisältökirjurin #4249) junaan 171–172.
- 9.10. 03.5x: #4 KOODI v45b-haarassa 021cb4b5b (resepti sokkelikivet + kynnykset, kehykset.js sokkeliSeinasta, Linnantuvan palkkien kivikonsolit; testit 344/344) + 3f8be7718 (vie-blender.sh: vaiheet/*.glb + blender.json "vaiheet"). DATA (ei vielä viety): lakaisu:apulainen-tupa (Siirtoseppä kytki 90a93e5ad), kellotornin ote 12 = lepo, 9–10 ja 15–17 kapea (PT), vuodet 12 leikkaukseen osat.json + kavely.py VUODET (Siirtosepän kuittaama muoto). VAIHEMALLIT _valmiit/olavinlinna-vaiheet-v1/lahde: tyhja_saari.py, puuvarustus.py, palon_jaljet.py (ajamatta). TAUSTA-AJO scratchpad iso/yo_ajo.sh (odottaa lukon + muistin ≥ 20 Gt, sitten paistot_sokkeli.sh + vaiheet) → sitten kopioi vaihe-glb:t v44/vaiheet/ + vaiheet.json ja vie v45y. Concorden obeliski: tasainen graniitti + hieroglyfit normaalikarttaan (concorde.py, ajamatta). UE-editori (MetaHuman) auki, 0,3 Gt.
- 9.10. 04.2x: v45y VIETY 731d4ca7142127b8 (blender 732115e38deae77f, 91db6fac4): #4 sokkelikivet/kynnykset/konsolit, vaihemallit (blender.json "vaiheet": tyhja-saari –1475, puuvarustus 1475–77, palon-jaljet 1868–72 + 11 kattoleikkausta piilottaa:true; harva 796 m²:n rypäs ohitettu), vuodet 12 leikkaukseen, lakaisu, kiipeilyn lepo/kapeat. Siirtoseppä kytkee (juna 172). CONCORDE v2.2 (laajenna.py reunus 30 m, puistot/aidat eivät esteitä, 402 pistettä; maa: korvaussävy ≥ 0,98 × S30) LS2:n tilesetissä vienti7; LS2: Cesium earcut tukee koveria → teltat olivat reunuksen ulkopuolella. NOTRE-DAME v2 (lahde/alue.py + maa.py: oma maa 38 000 m² ortokuvasta 2018, 90 puuta, länsijulkisivu, räystäskaide; LOD0 104 k) LS2:lle. Pinnat: lyijy 150/155/160, kalkkikivi 212/203/184 (kaupunkipinnat.py). Jono: LS2:n pelikuvat, MetaHuman aamulla.
- 9.10. 04.5x: KUNINKAANLINNA v1 (PT:n erä) _valmiit/kuninkaanlinna-v1: lahde/alue.py (oma maa 50 000 m²), siivet.py (massat OSM:stä), maa.py (OSM + CC0, ei ortokuvaa: Geotorget-tunnus puuttuu), julkisivu_barokki.py (yleinen barokkijulkisivu: ikkunakehykset, frontonit, rustiikki, listat, attika + balustradi, kulmakivet; tasot 0/1), kuninkaanlinna.py (risaliitit, triumfikaari, sisäpihaan viettävä kuparikatto, varmrosa-rappaus). LOD0 119 k. Odottaa PT:n kuittausta → LS2. Kaupunkipinnat: rappaus_tukholma, hiekkakivi_tukholma, mukulakivi.
- 9.10. aamu: v45z a41ac10c88688301 (blender b51d67e98e7acc63, 760f4e98a): RESTAUROINTIVAIHE 1961–75 (_valmiit/olavinlinna-vaiheet-v1/lahde/restaurointi.py + telineet.py; 9 ryhmäsolmua omine vuosineen Museoviraston kuvista, Sisältökirjurin paketti _tyo/sisaltokirjuri/olavinlinna-restaurointi-1961-75/; pohjapiirros Kokko 2006 → kuori kahden tornin sovituksella; TULKINTA 4 ryhmässä). Siirtoseppä kytkee junaan 173. Kaupunkimallien maan normaalit korjattu (suuntaa_maa: Cesium karsii takapinnat; Concorde 205, ND 72, KL 42 kolmiota); ND kivi vaalea kerma + uudet latvuspuut (LOD0 67 k); KL rappaus vaaleampi varmrosa (v4:ään). Riddarholmen ja kuninkaanlinna ämpärissä (LS2). JONO TYHJÄ.
- 9.10. aamu: Olavinlinnan lahteet += Museovirasto (restaurointikuvat) ja MML (korkeusmalli), CC BY 4.0 → hash 35b6b52e5705792c (0d0ce1445, Siirtosepän pyyntö). VASA-MUSEON MASTOT v1 _valmiit/vasamuseet-v1 (lahde/vasa.py: 3 mastoa 52,5/47/39,4 m LS2:n paketista, jalat OSM-kattoosilla 22–24 m, kattoosat + leikkausunioni 19 pistettä; TULKINTA rivin paikka/suunta) LS2:lle. JONO TYHJÄ; aamulla MetaHuman omistajan kanssa.
- 9.10. 07.2x: LS2 170g -korjaukset. NOTRE-DAME v2.1: notre_dame.py uusi_bm()-tasot ox/oy/oz + ohjaa() (seinät ulos polygonin kiertosuunnasta, katot ja maa ylös, helma reunasta ulos; esine() kääntää: kivi 554, ikkunat 73), alue.py: eteläranta (alaranta 27,6–31,5 NGF, vain lähiranta) + Seinen vesi 30 m:n kaistalla ja 80 m:n säteellä nosturista (26, −78 OSM-kehys), vastaranta 3 m ja sillat 4 m pois, lahde/vesi.u8 täytetty vesimaski (proomut), maa.py vesi 46/54/72 + rantamuurit kalkkikiveksi, maa_z vesi NGF 27,25, jyrkät kohdat tiheämmin. LOD0 71,6 k. VASA: kattotasot sovitettu (KORVATUT, ≤ 0,8 m naapurin yli, lstsq), kaupunkipinnat pelti_tumma (Metal032 64/68/74), seinät 58/62/68; LAHTEET + krediitti ambientCG. LS2:lle ilmoitettu; kysytty COLOR_0-tuki Kuninkaanlinnan AO:ta varten ja ehdotettu ympäristövaloa (pohjoissivun ruskeus = varjopuoli). Seuraavaksi KUNINKAANLINNA (PT 3: yhtenäinen varmrosa + syvyys).
