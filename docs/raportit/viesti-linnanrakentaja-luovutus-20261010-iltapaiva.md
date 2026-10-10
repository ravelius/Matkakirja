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
- **ND v5b** (PT 17.2x, kivi −10 %): `tekoaly-v5b/`, kiviportti --L-max 1,00 LÄPI (ennuste peli L 153, b/r 0,884), ortoportti LÄPI → LS2:lle
  pelikuvapariin (oikea | v5 | v5b) → PT → omistaja. LS2:n v5-mittaus 181/174/159 osui kiviportin ennusteeseen (180/173/159).
- **TULOSSA (PT 17.2x, omistaja): taidemuseon varjot ja lattiaheijastus**, LS1 ottaa yhteyttä Pariisin KIIREEN jälkeen. Esiselvitys:
  `taidemuseo-runko/lahde/leivo_sali.py` leipoo nyt vain salin geometrian valon (ei kehyksiä eikä patsaita varjostajina). Tarvitaan:
  kehykset (sali_blender.py --esikatselu -geometria) ja patsaat (patsaat/*.glb + patsaat-pakattu.json, veistospaikat sali.json:sta)
  leivontaan varjostajiksi (näkymättömät kameralle, holdout/ei omaa UV1:tä), nurkka-AO valoatlakseen.
- **ND v5b pelissä** (LS2 4dc824ab5): L 152–153, b/r 0,88 → PT:llä omistajan päätökseen; v47b kytketty (Siirtoseppä c3091ed82), wt v45g poistettu.
- **NL-sali v2e VALMIS (varjot)**: `_valmiit/taidemuseo-alankomaat-v2e`, ennen/jälkeen e023031a2. leivo_sali.py: --teokset (kehykset pelin
  ripustuksella, LS1 teokset.json natiivi 691969c66 → lahde/teokset-ls1-691969c66.json) --patsaat (34) --ao 0.6 --ao-voima 0.5; varmuuskopio
  leivo_sali_ennen_varjot.py; tarkistuskuva taidemuseo-runko/lahde/atlas_kuva.py (ATLAS_LX=900). LS1 kytkee; LS1:n veistokset.json (6) ja
  m2-v1/v2 ripustus eroavat v2e:n sali.json:sta (kerrottu). Lattiaheijastus = LS1:n ajonaikainen osa.

## SEURAAVA TEHTÄVÄ: ND v5c (PT 17.5x; omistaja 17.4x v5b: "paljon parempi, mutta tekstuurit menevät väärin, holvikaari leviää pystylinjojen päälle")
v6k14 (v5b) menee junaan. v5c:n viat (PT, LS2-arkki 4dc824ab5): 1) portaalien maalatut kaarirenkaat eivät osu mallin kaaripaloihin → kaksi kaarta,
ja maalattu kaari jatkuu pilastereille/tukipilareille; 2) ruusuikkunatason ikkunoiden maalatut kaaret ja ristikot valuvat aukkojen ohi;
3) portaaleissa ja tympanoneissa pikselimäisiä laikkuja (lähde venytetty yli 2×).
Suunnitelma (LR 17.5x):
- Mallin reunakartta länsinäkymästä: codex-ohje/lansi/nd_lansi_syvyys.png + _normaali.png (syvyys-/normaalireunat) + luokat.png → elementit
  (portaalit 3, sivuikkunat 4 + ruusu, tukipilarit/pilasterit, tornien lanseetit, galleriat) omina maskeinaan (yhtenäiset syvyystasot).
- Kuvan rekisteröinti ELEMENTTI KERRALLAAN: kuva_lansi_kohdista.py:n paloittain affiininen kartta alkuarvauksena → kullekin elementille oma
  affiini/homografia, joka sovittaa kuvan reunat (Canny/gradientti) mallin reunoihin (chamfer-etäisyys, ECC reunakuvilla) elementin maskissa.
- Rajaus: kuvan yksityiskohta vain elementin omalle pinnalle (maskin sisään, ei geometrian reunan yli); elementtien väliin tasainen pohja.
- Portaaleille tarkempi lähde: Sisältökirjurin vertailu/nd arkissa lähikuvat (arkki-nd-2025: 1, 4, 8, 11, 21, 46, 47; CC BY-SA / tarkista kuvat.json
  /kandidaatit.json) ladataan täysikokoisina (KYSY lupa latauksiin omistajalta/PT:ltä, jos sääntö vaatii) → oma rekisteröinti portaalin maskiin.
- Uusi portti (kaupunkipinnat-v1/lahde/): tekstuurin reunat vs mallin reunat ortossa ≤ 2 px (chamfer-mediaani/p90), venytys ≤ 2×
  (paikallinen jakobiaani kuvasta ohjekehykseen; kuva_lansi_kohdista.py:n karttasta).
- Sitten LODIT 0 1 2 (aja_tekseli_v5b.zsh → v5c, sama kalibrointi_v5b.json), kiviportti --L-max 1,00, ortoportti → LS2 pari
  (sama arkki + portaalien lähikuva) → PT → omistaja.
