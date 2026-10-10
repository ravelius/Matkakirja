# Linnanrakentajan luovutus 10.10.2026 iltapäivä (14.1x–15.3x, nollaus 51 %)

Edellinen: `viesti-linnanrakentaja-luovutus-20261010-paiva.md` (loppuosiot "TAUON JÄLKEEN" ja "SEURAAVAKSI"). Haara `linnanrakentaja-tyo-20260929`.
Ei worktreetä auki (v45f poistettu, haara originissa).

## Valmiit tällä jaksolla

- **Palatsi-viipale** viety ja kytketty: PALA 1499 cf16ad94ef3c76bc, NYKY bccf694794d5f5f6 (Siirtoseppä 99b9fead3, testit läpi).
- **ND v4c** (LS2 kuvasi v6k11: edestä hyvä) → **ND v4d** LS2:lla: `_valmiit/notre-dame-v1/tekoaly-v4d/` (kalibrointi_v4d.json, aja_tekseli_v4d.zsh,
  LAHTEET "v4d"): lyijy 158/163/168, ylöspäin-pinnat 204/208/210, ao_ylos 0,1. LS2 ehdotti lyijy ×0,82 (pelissä v4c +19 %), mutta se hylkäsi portin
  (katot −18 %) → ×0,9 välimuoto, portti LÄPI (katot −13 %, ulokkeet −14 %). **ODOTTAA: LS2:n v4d-pelimittaus** (mittaa-parvis e7 klo 13).
  Jos lyijy pelissä yhä > +10 %: kalibroi vertailuportin kattojen valo LS2:n pelimittaukseen (portti on katoissa ~20 %-yks. peliä tummempi).
- **Peking v3** LS2:lla (`_tyo/linnanrakentaja/peking/glb/`, LAHTEET "v3", arkki 58580b1ac); LS2 paketoi, kuvaus jonossa. ODOTTAA paria.
- **Vertailuportti** (`kaupunkipinnat-v1/lahde/vertaa_orto.py` + `vertailuportti.zsh <kohde> <glb|'glob'> <ulos> [--rajat json]`): taivas auto,
  laatat (enu_siirto_m), sävy maahan suhteutettuna, savy_maa + rajat-json (_peruste), --maan-korkeus. Peking: `peking/vertailu/rajat-peking.json`.
- **NL-sali**: v2b HYVÄKSYTTY → LS1 (`_valmiit/taidemuseo-alankomaat-v2b`), **v2c** → LS1 (`…-v2c`, arkki 237c13af5: Veistosaulan 4 veistoksen kuja,
  Leidenin "möykyt" = esikatselukamera alttarin päällä, korjattu sali_kuvat.py:ssä).
  **v2d KESKEN**: Sisältökirjurin 11 täydennysmittaa (mitat-11-taydennys.json) päivitetty patsaat-taulu.json:iin (Sonnet-agentti; 10/11, leluhevonen
  arvio; Simpelveld pakattu 2,11 × 0,73 × 1,83 m mutta EI salissa), sali.json ajettu. Tuotanto `zsh lahde/aja_tuotanto.zsh` (esikatselu/v2d) oli
  käynnissä 15.30 (lod0 valmis) — jos `esikatselu/v2d_*.png` puuttuu, aja uudelleen (taustalla). Sitten: jäädytetty kopio
  `_valmiit/taidemuseo-alankomaat-v2d` (kuten v2c: sali.json, LAHTEET.md, glb/*.glb, valot/, tekstuurit/, patsaat/*.glb + patsaat-pakattu.json),
  arkki docs/raportit/kaappaukset/linnanrakentaja-museo-20261010/taidemuseo-nl-v2d-arkki.jpg, viesti LS1:lle + PT:lle (2 riviä).
  Varmuuskopiot: patsaat-taulu-v2c.json, sali-v2c.json, lahde/alankomaat-v2b.py.
- PT:n levytehtävä: proto-3d/_tyo/metahuman-koe → T7 + symlinkki (tehty).

## Olavinlinna-erä (KESKEN, ei vielä muutoksia tiedostoissa)

Siirtosepän arkki v46z-176-b (`proto-3d/lokit/todistus-vaiheet-v46z-176-b-20261010-1224/`):
1. **Rannan vaaleat kivet 1499**: ranta-1499:n kivet (kavely.py r. ~251, `osa.bm("kallio")`). Siirtoseppä: peli ottaa pinnan värin VAIN pinnat-pankista
   (`js/dioraama/pankit/pinnat.js`; kallio = '#8f8a7e', pinnat/kallio.jpg, kuvio kallio); glTF-väri ja COLOR_0 eivät käy; historiassa ranta-1499:n valo
   on tasainen 0,42. → Tee: kiville oma pinta **'rantakivi'** kavely.py:ssä (`osa.bm("rantakivi")`, PINNAT-taulu), ja pyydä Siirtoseppää lisäämään
   pinnat.js:ään `rantakivi: {vari: noin '#5e5a52', toisto_m 4, lahde 'pinnat/kallio.jpg', kuvio kallio}` (hän sanoi A toimii ilman koodimuutosta,
   kun pinta on pankissa / rakennus.jsonissa). Tuntematon pinta = 0,72/0,68/0,61 (vaaleampi!) → pinnan on oltava pankissa ennen vientiä.
2. **Ponttonipalat ennen 1975**: ponttonilaatikko `b1499-ponttonisilta` (ranta1499.py LEIKKAUKSET; kavely.py r. 172 historia_vuosi 1975).
   Varmistettu kuoresta (scratchpad-renderit): **puupaalu vedessä glTF x −73,5 / z −18** (y −7,6…−3,7) laatikon ulkopuolella → lisää
   `ax('b1499-paalu', -74.7, -72.3, -19.2, -16.8)` LEIKKAUKSET-listaan ja kavely.py:n metaan {'vuodesta': None, 'historia_vuosi': 1975}.
   Pienempiä: ohut tolppa vesiportin edessä (−58,4 / 15,2; tikkaat?), rantaliuskan sirpale (69 / 30). Siirtosepän v06:n "tummat suorakulmiot"
   ovat todennäköisesti ympäristön veneitä (`olavinlinna-blender-v44/ymparisto/mallit/vene.glb`, Siirtosepän ympäristö) ja v07:n laituri + vaja
   mantereella ympäristö-glb:tä → kerro Siirtosepälle, nämä eivät ole kuorta. Kaksi pientä tummaa palaa järvellä (v06 px 1235,785 / 1728,750):
   ei selvitetty (ehkä ympäristön viitat).
3. Ajo: ranta1499.py → kavely.py (v44/kavely) → `nyky_kavely.zsh` → vie molemmat (vie-blender.sh --lahde v44 / v44-nyky uudessa worktreessä
   `tools/uusi-worktree.sh linnanrakentaja linna-v45g`) → dispatch vie-dioraama.yml → PALA-hashit Siirtosepälle + PT:lle. Leikkausraja 32
   (v44 14, nyky 17 → +1).

## Seuraavan session järjestys

1) NL-sali v2d loppuun (tuotanto → kopio → LS1). 2) Olavinlinna-erä (kohdat 1–3 yllä; pinta 'rantakivi' sovitaan Siirtosepän kanssa ensin).
3) LS2:n ND v4d -mittaus ja Peking v3 -pari → säätö (ND: portin kattokalibrointi pelimittaukseen, jos tarpeen). 4) Siirtosepän uusi arkki.

## JATKO 15.3x–15.5x (nollauksen jälkeen)

- **NL-sali v2d VALMIS**: tausta-ajon kuvavaihe oli kuollut (2/4); leiden + kg_pitka ajettu uudelleen. `_valmiit/taidemuseo-alankomaat-v2d`
  (sama rakenne kuin v2c), arkki ecf2fcb38. LS1 + PT ilmoitettu.
- **ND v4d HYVÄKSYTTY LS2:lla** (lyijy +7 %, ei kalibrointia) → PT vie omistajalle. **Peking v3**: malli ok; tumma Jinshui = Karttasepän
  vesipinta (LS2 mittaa ja vie PT:lle/Karttasepälle), ei minun glb:ssä.
- **Olavinlinna v47** (Siirtosepän arkki v46z-176-b): `olavinlinna-kavely-v1/lahde/tyokalut-lr/rantakivi_paalu.py` paikkasi v44/kavelyn
  (ranta-1499.glb: 13 kiveä meshiksi `ranta-1499-rantakivi`, materiaali 'rantakivi', valoatlas säilyy; osat/merkit/ranta1499.json +
  'b1499-paalu' historia_vuosi 1975). Lähteet samoin (kavely.py PINNAT + osa.bm("rantakivi") + VUODET, ranta1499.py LEIKKAUKSET;
  varmuuskopiot *_ennen_rantakivi.py / *_ennen_paalu.*, v47-talteen/). materiaalit/detaljit.json: rantakivi = kallion kopio.
  **nyky_kavely.zsh oli kadonnut** → uusi `tyokalut-lr/nyky_kavely.py` (tuottaa tavu-identtisen tuloksen; aja aina kun v44/kavely muuttuu).
  Leikkauksia: v44 15 (oli 14), nyky 18.
- **Vienti**: worktree `/Users/Shared/Claude/wt/linnanrakentaja-linna-v45g` (pohja origin/main). Ämpärissä: 1499 **b29589432d525843**
  (blender.json committattu 83ffed64b, pushattu), NYKY **6b99bd219430fbad** (blender.json scratchpadissa → kopioi ajon jälkeen).
  ODOTTAA Siirtosepän PR #4351 (pinnat.js rantakivi + pinnat/rantakivi.jpg; Julkaisija ilmoittaa mergestä). Sitten: merge origin/main
  v45g:hen → push → `gh workflow run vie-dioraama.yml --ref linnanrakentaja-linna-v45g -f rakennus=olavinlinna -f kuiva=false -f osoitin=false`
  → PALA-hash lokista → nyky-blender.json commit → sama dispatch → molemmat hashit Siirtosepälle + PT:lle.
- Pienemmät (ei tässä erässä): ohut tolppa (−58,4 / 15,2), rantaliuskan sirpale (69 / 30), kaksi tummaa palaa järvellä.

## JATKO 15.5x–17.1x

- **Olavinlinna v47b VIETY** (Siirtoseppä hylkäsi main-pohjaisen v47:n: asu ja kappalaisen kädet puuttuivat) → haara
  `linnanrakentaja-linna-v45h` = v45f + #4351 (rantakivi) + lisaPinnat; v45f:n vie-blender.sh (786 tiedostoa).
  **PALA 1499 e7d9da6d44f147d1** (blender 6b9e612a73a5befe), **NYKY 4e1b2774ab27119a** (blender 6baa011bb9a6c367) → Siirtosepälle.
  Hylätyt: c7abe064, 02d3f613, 61e0938f. PR #4355 (rakenna.mjs lisaPinnat) MERGETTY mainiin b790d65e2. Worktree wt/linnanrakentaja-linna-v45g
  (haarassa v45h) auki kunnes Siirtoseppä kuittaa → poista `tools/uusi-worktree.sh --poista linnanrakentaja-linna-v45g`.
- **ND v5 (omistaja 15.5x: liian kirkas ja keltainen, pystynousut tyhjiä → yksityiskohdat tekstuureiksi)** → LS2:lle pelikuvapariin
  (oikea | v4d | v5): `_valmiit/notre-dame-v1/tekoaly-v5/`, arkki da726ecc5 (kaappaukset/linnanrakentaja-nd-20261010/). Länsijulkisivu oikeasta
  valokuvasta (`lahde/kuva_lansi_kohdista.py`, 82 ohjauspistettä, ylipäästö σ 1 m; CC BY-SA 4.0 The wub → Lähteisiin), kivi atlas
  152/148/139 (ennuste peli b/r 0,88). Uusi `kaupunkipinnat-v1/lahde/kivi_portti.py` (v4d hylkää, v5 läpi), ortoportti läpi.
  projisoi_tekseli.py: --nakymakuva, valoisuus_raja, ao_kuva (varmuuskopio projisoi_tekseli_ennen_nakymakuva.py). LAHTEET "v5".
  SEURAAVAKSI LS2:n parin mukaan: jos pystynousut lähikuvassa litteät → polygoneja LOD0:aan; etelä/pohjoinen yhä tekoälypintoja
  (samalla menetelmällä, jos vapaita suoria kuvia: Sisältökirjurin 04/05).
