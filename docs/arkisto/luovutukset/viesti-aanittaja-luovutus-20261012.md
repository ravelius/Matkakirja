# Äänittäjän luovutus 12.10.2026 klo ~19.4x (tilinvaihto)

Edellinen luovutus (lue myös): viesti-aanittaja-luovutus-20261011.md. Tämä korvaa sen avoimet kohdat.

## Mitä on tehty 12.10. (kaikki mitattu, KUUNTELEMATTA; äänisivulla https://matkakirja-aanet.pages.dev/)
- **Kipin pallopeli v2, 120 BPM** (omistajan tilaus 16.5x, PT): 6 Lyria-ottoa (A: vain basso+rummut+perkussio; B: + lyhyet torvi/fillit), funk/jazz/konemusiikki. Työkansio proto-3d/_tyo/kippi-v2-120bpm-20261012 (generoi.mjs, tempo.py, viimeistele.py, sauma.py, soitinanalyysi.py, sivulle.py, raportti.json, peli/*.mp3). Lyria ohitti 120 BPM:n kolmessa (funk A 125, jazz B 128, konemusiikki B 122) → venytetty 120:een (atempo, −4,0/−6,3/−1,7 %). Äänisivulla osio "Kipin pallopeli v2: 120 BPM (6 kokeilua)", vanhat 3 Arkistossa. EI viety ämpäriin; vienti vasta omistajan valinnan jälkeen. Uusi otto vaatii omistajan luvan.
- **Uusittavat (omistaja 16.57): pallokisan keräys 1–3 + nippu ja koko Olavinlinnan lyhtyhetki**, 2 vaihtoehtoa (A|B) uusista lähteistä. Työkansio proto-3d/_tyo/pallo-lyhty-v2-20261012 (tee.py, sivulle.py, LAHTEET.md, mp3/). Lyhdyn kaiku = oikea mitattu vaste (Aalto OK5, CC BY 4.0) konvoluutiolla; vasteet NAS aanet/lyhty-pallo-v2/ir. Hyräily vain ~3 s (owstu 727689, CC0): aiempi "hyräily" (tadiyan 693937) oli VIHELTÄMISTÄ. Äänisivulla osiot "Pallokisa v2" ja "Olavinlinnan lyhtyhetki v2"; vanhat hylätyt Arkistossa. EI viety; LAHTEET.md valmis, Aalto-tekijätieto lisättävä js/lahteet.js:ään vientiä seuraten.
- **Shakin äänet (Wien 1873, SK #4504, juna 185)**: nappulan siirto 4, lyönti 2, shakki-merkki, matti, shakkikellon napit 3 + tikitys, taskukellon tikitys (shakkikello on 1883, anakronismi), kahvilan humina (Wienin kahvila, CC0), kupit 3. Työkansio proto-3d/_tyo/shakki-wien-aanet-20261012 (tee.py, paketti.py). Vientipaketti proto-3d/_valmiit/shakki-wien-aanet-vienti-20261012 (kuiva-ajo OK, ei viety; shakkikello Yle Arkisto CC BY 4.0 → nimeäminen). Äänisivulla osio "Shakin äänet, Wien 1873".
- **Viety ämpäriin 12.10.**: raketti v3 sytytys 3 kirjastoääntä (aanet/iss-raketti-v3/, kirjasto 1 sytytys / 2 nousu / 3 Max-Q -ehdotus, CGEffex CC BY) sekä aiemmin pallokisa-v1 (kaasupullo, poltin x3, voitto, lähtömerkki, kilpailija), lyhty-v1, pallokierrokset, pallo-aanimaisema jne.
- **Tekstit-ylävalikko**: Odottaa nyt 0 (shakin 8 + Pulun kisaselostus generoitu, Pelikoodarin tuomat osiot "Shakki: Williamin puheet" ja "Pallokisa: Pulun selostus" Musiikki-välilehdellä); taidehallin 7 Arkistoidut.
- Kaari 184 -PR #4470 (generoi-kaari.mjs --kuiva-korjaus): mergattava vasta junan 183 jälkeen.

## Avoimet
- Odottavat omistajan valintaa (Hyvä-rastit sivulla): kipin v2 (6), pallokisa v2 (keräys/nippu), lyhtyhetki v2 (7×2), shakin äänet (17), raketti v3 -ehdotuksen sovitus (LS2). Vienti VASTA valinnan jälkeen: vie-paketti.sh (Raamatun pysyvä vientilupa), ääniportti ennen.
- Kipin v2: jos omistaja haluaa tarkan 120 BPM:n ilman venytystä → uusi otto vaatii hänen luvan (funk A, jazz B, konemusiikki B).
- Hyräily: jos omistaja haluaa pidemmän → ElevenLabs/uusi lähde luvalla.

## Tekniset muistiinpanot (opitut)
- Lyria-avain: `source ~/.zshrc` (GOOGLE_API_KEY); ~/.matkakirja-avaimet-koodaus.zsh EI sisällä sitä (API_KEY_INVALID). Virhemerkinnät kehotteet.json:sta pois ennen uusintaa (muuten "on jo").
- numpy-venv: proto-3d/_tyo/venv-aaniluokitin (ei scipy/librosa); h5py/SOFA: venv-ir. Älä nimeä omaa skriptiä ast.py (varjostaa moduulin).
- Äänisivun julkaisu: zsh $scratchpad/aanisivu-julkaise.zsh (kopioi scratchpadiin sessiosta; wrangler katkeilee → toista kunnes "julkaistu"). index.html-varmuuskopiot index.html.ennen-*.
- Freesound: vain Actions (aanihaku.yml, tila ehdokkaat, lahteet=freesound; $scratchpad/fs.sh), esikuuntelu-mp3 curlilla cdn.freesound.org (kuvaava UA). Zenodo: ÄLÄ käytä /api (robots kieltää); /records/<id>/files/... sallittu.
- Tempomittaus: tempo.py (vuo-autokorrelaatio, ±0,02 BPM). Whisper-sanaportti: soundly-erat/tupa-sanat.py; "JR東日本E233系電車" on tunnettu harhatunniste (ei sana). AST-luokittelu: luokittele_ast.py / ast_top.py (kansioissa).
- Viestiraja: SendMessage pysähtyy ~10 viestiin; tulokset vuoron loppuun.
- VAATII TOIMIA -sääntö (omistajan toimet) ja Tekstit-sääntö (uusi teksti ensin Odottaa-listaan): ks. edellinen luovutus.
