# Äänittäjän luovutus 18.10.2026 klo ~00.40 (PT: ei uusia töitä)

Lue ensin: viesti-aanittaja-luovutus-20261017-3.md (+ -2, -20261017.md, -20261016.md: säännöt, työkalut). Osoitteet: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044, SS local_86d0c984-aeeb-430d-bc85-3112f27b9437, LS local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4. Viestit PT:lle ≤ 3 riviä. Haara aanittaja-tyo-20261011 (checkout Matkakirja-aanittaja).

## TEHTY 17.10. 11.15–18.10. 00.40 (kaikki ämpärissä, raportit docs/raportit/aanittaja-*.md)
- **Kiina Williamin 5 min v2** (19 pysäkkiä, 4 007 mrk): `aanet/kiina-william-v2/` (p-e221…p-1912.mp3 + ajat/ valo-ajoilla + manifest.json). Korvaa kiina-kertoja-v1. Työ `_tyo/kiina-william-20261017/tee.py`.
- **Louvren Nike + Milon Venus** (1 159 mrk): `aanet/taidemuseo-kertoja-v2/ranska/louvre-ma-2369|399.mp3` (LS kytkenyt manifest-200:aan). "-andros" → "andros".
- **Rodin-puhe + Orsay uusi otto** (667 mrk): `ranska-rodin-puhe.mp3`, `ranska-orsay-puhe-2.mp3` ("sen holvien alla"). Whisper-tarkistus: venv-aaniluokitin + HF whisper-small (openai-whisper medium -venviä ei ole).
- **Pallokierrosten äänimaisemat Lontoo/Praha/Ateena**: Freesound CC0, 6 silmukkaa `aanet/kaupunkimaisema-v3/<kaupunki>/<kerros>.mp3` + manifest (tasot SS:n kytkennässä 18b3accd3/57d01c52b: 0,45, kaskaat 0,30; katu/vanhakaupunki EI korvaa liikenne_hiljainen koska äänikarttoja ei ole). Raportti pallokierros-aanimaisemat-lahteet-20261017.md.
- **Suomi pakotettu (omistajan havainto 22.54, päätökset 23.03 ja 23.04)**: `ranska-louvre-puhe-2` (360 mrk), `ranska-sali1-avaus-2` + `ranska-sali2-avaus-2` (619 mrk, fi pakotettu) ämpärissä; LS vaihtaa viittaukset junaan 201. Muita 47 riskiottoa EI uusita (omistaja 23.03). Tuotantopohja #4828 ja kielipakko-PR #4830 (tools/elevenlabs-kieli.mjs kieliFi, skannaava testi, linssiluentojen aikaleimat v4_turbo+fi) MERGETTY.

## KESKEN
- Ei käynnissä olevia ajoja eikä keskeneräisiä generointeja; kaikki työ pushattu haaraan. Louvre-puheiden otot valmiit.
- Odottaa muiden kytkentää: kiina-william-v2 (SK/KS/PK), Rodin/Orsay-2/Louvre-2/salit-2 (LS, juna 201), kaupunkimaisema-v3 (SS jo kytkenyt; äänikartat Lontoo/Praha/Ateena puuttuvat → Pelikoodari).
- Vanhat avoimet: Tivoli-kytkentä (LR/PK, nimeämiset data/aanilahteet.json), i-kortin faktat 134 kpl (ehdolliset Natiivi-UI:lle), Kipin v2 ym. äänisivun valinnat, Soundly-lataus GUI:lla, Pulu-kutsut PT:n käskystä, äänipohjan tasot, Ranskan 51 kertomuksen nimien ääntämys (kuuntelematta). Oikeita ottoja ei kuunneltu.

## OPITUT (uusia)
- **language_code 'fi' JOKAISESSA ElevenLabs-rungossa** (William, isoisä, Pulu); `tools/elevenlabs-kieli.mjs` + testi vartioi. Whisper-kielitunnistus EI erota aksenttia (vanha aksentillinen Louvre fi 0,99) → tarkistus rungosta, ei äänestä.
- Whisper-tarkistus: `HF_HUB_OFFLINE=1 /Users/Shared/Claude/proto-3d/_tyo/venv-aaniluokitin/bin/python` + transformers `pipeline("automatic-speech-recognition", model="openai/whisper-small")`; whisper-kirjastoa (import whisper) ei ole missään.
- Kertoja-ajon pohja: `_tyo/ranska-lahestyminen-20261017/tee.py` (k.json: {"veistokset":{id:{nimi_fi,kertojan_teksti,puhuttu}}}, fi pakotettu, tempo 1,10, ajat/ranska/, manifest-rivit); `ranska-salit-fi-20261017` ja `ranska-louvre-fi-20261017` sen kopioita. Ämpäri ei ylikirjoita → uusi otto = uusi id (-2).
- Freesound-ehdokashaku: `_valmiit/pallokierros-aanimaisemat-v1/haku/hae.zsh` (Actions 326102787, 1–2 sanan haut), `parse.py` (lokista ehdokkaat), `lataa.zsh` (esikuuntelut, 20 s väli), `haku/luokita.py` (AST + kielitunnistus). Silmukat: `_tyo/pallokierros-aanimaisemat-20261017/tee.py` (tasaisin jakso, 3 s ristihäivytys, −23 LUFS).
- Tili: ElevenLabs character_count päivittyy viiveellä (279 673 ennen ja jälkeen kiina-william-v2:n).

## PÄIVITYS 18.10.2026 klo ~09.3x (ISS fi, Kaanaan häät, Pulun museoäänet)
- **ISS-kertojan 31 repliikkiä fi pakotettuna** (KK:n OMISTAJAN PÄÄTÖS 01.13): ämpärissä `<id>-2`, manifestit iss-kupoli-v3 / iss-loppu-v2 / iss-kamera-v2, `raketti-lahtolaskenta-v3.mp3`. Raportti `aanittaja-iss-kertoja-fi-20261018.md`, lista `…-lista-20261018.md`. Whisperin mukaan heikompia kuin vanhat: `v1-auringonnousut-2`, `iss-loppu-vastaus-ohjaus-a-2` (kuuntelematta; uusinta vaatii luvan). Viittausten vaihto: PT/LS (juna 202).
- **"Kanaan häät" → "Kaanaan häät"** (PT): uusittu `ranska-louvre-puhe-3` ja `ranska-sali1-avaus-3` (aanet/taidemuseo-kertoja-v2/ranska/, manifest-rivit-kaanaan.json). Käsikirjoitus + työkansiot korjattu; repon docs ja Linssiseppä teosluettelo-v1.json ("Kanaan häiden") muiden.
- **Pulun museoäänet + tuolin narahdukset** (PT, Louvren pilotti): `aanet/pulu-museo-v1/` (siipi-lento 1–4, laskeutuminen-penkki, kujerrus-lepo 1–3, museo-tuoli-narahdus 1–4; Soundly, ei generointia). Valoseppä kytkee kun Pulun kuvapari hyväksytty; kävijät/vartija odottavat Tripo-malleja (askeleet jo ämpärissä v2/v2b/v3). Työ `_tyo/pulu-museo-aanet-20261018/` (tee.py, lib.py, skannaa.py).
- Ei kuuluu minulle: Lontoo/Praha/Ateena aanikartta-v1 (Pelikoodari). Ranskan 47 riskiottoa EI uusita (omistaja 23.03).
- Opit: oma tiedosto nimeltä `ast.py` rikkoo transformersin (varjostaa stdlibin) → käytä muuta nimeä. AST-ikkunaskannaus (`skannaa.py`) valitsee äänitiedostosta oikeat kohdat (Creak/Squeak/Bird+Pigeon). numpy-skriptit `python3` ilman `-I` (venv-aaniluokitin/bin/python Whisperille ja ASTille, `HF_HUB_OFFLINE=1`).
