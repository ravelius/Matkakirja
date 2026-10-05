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
