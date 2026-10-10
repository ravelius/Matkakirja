# Pelikoodarin luovutus 10.10.2026 klo 18.4x

Edellinen: viesti-pelikoodari-luovutus-20261010-iltapaiva.md (yksityiskohdat: -paiva.md). PT:n id nyt
local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, Julkaisija local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, N-UI
local_e9fdc695-8421-4c14-a187-8881e73c835a (SendMessage nimellä tai ccd send_message idllä).

## Tehty tänään iltapäivällä (kaikki mainissa tai junassa)
- Web: pääkaupunkipisteet pallolle #4347 (pk:-etuliite, pienin tärkeys, kaupungittoman maan pääkaupunki aina näkyvissä,
  napautus → maakortti maapaneeli.naytaMaa = natiivin Kartuscha.NaytaMaa), erä 2 -testi #4353, maakortin pääkaupunkirivi
  #4357 ("Pääkaupunki" / "Hallinnon paikka", taulu js/packs/laudan-paakaupungit.js, vienti viittaa siihen), nimen liuku #4360
  (pallon nimi on lähimpänä omaa pistettään, muuten piilossa; N-UI porttaa PT:n luvalla).
- Natiivin kultaiset: pääkaupungit 6e152384d (juna 178); Pulu NOR/SVK/SVN f31979deb (179), BEL/ISL 8fca1d3d4 ja
  BIH/LUX/MLT e2b97a8a4 (180; e2b97a8a4 sisältää 8fca1d3d4:n). Testi kulkee nyt myös toisen tason linkit (Kerro lisää →
  Kerro lisää samassa kohdassa); aidot jäänteet PurettujenJaanteet-listalla perusteluineen.
- Levy: 18 vanhaa _tyo-kansiota T7:lle symlinkein (10,4 Gi), venv-aaniluokitin jäi.
- IP-suola (#4335) oli jo tuotannossa (POLLO_IP_SUOLA, workerin julkaisu 09.12) — ei työtä.

## Kaupunkikappaleet (omistaja 17.5x: erä 1 "liian samanoloisia ja tylsiä"; uusi pohja PT:ltä)
Kansio /Users/Shared/Claude/proto-3d/_tyo/kaupunkikappaleet-20261010/:
- pilotti.mjs (PT:n uusi pohja sanatarkasti): Budapest, Tukholma, Madrid, Helsinki, Moskova, Peking → raaka/*-lyria-t2.mp3,
  peli/*-lyria-v3.mp3 (−11,9 LUFS), kuuntelu/*-lyria-v3.mp3 (−16,4 LUFS 112k). kehotteet-t2.json.
- pilotti-v4.mjs (omistaja 18.1x pienet kokoonpanot + modernit introt Pariisin "nyt 2" -mallilla): moskova/peking v4 ja
  musa-kaupunki-{moskova,peking}-nopea-lyria.mp3 (90 s, ei looppia). kehotteet-v4.json. Moskovan intron sanat estyivät
  Googlen suodattimessa kahdesti ("Today's Moscow … punchy … glass towers"); läpi meni "Modern Moscow at street level".
- kasittele.py: TYYLI=t2|t4|nopea (RAJA=0.78 introille true peakin takia). Ääniportti + --puhe kaikille: 0 hylättyä.
  AST-tarkistus: scratchpad-skripti luokittele.py (MIT/ast), ei repossa.
- Erä 2 (46 kaupunkia): era2-kehotteet.json + generoi.mjs --era2 [--kuiva] VANHALLA muotilla → vaihdettava uuteen pohjaan,
  kun omistaja on arvioinut pilotin. Generointi vain omistajan luvalla ja määrällä.
- Peliin vienti vasta omistajan valinnan jälkeen (ämpäriin Julkaisijan kautta, SHA256SUMS, kytkentä web + natiivi).

## KESKEN / jonossa
1. **Taidemuseon Soundly-haku museo1** vasta PT:n rivistä "NÄYTTÖ VAPAA" (klo 20 jälkeen). _tyo/soundly-erat/aja.zsh korjattu:
   myöhästyneet saapuvat → T7 soundly-myohastyneet/, nimi ilman hakusanaa → eramuseo1/_vaara-osumat. Ennen ajoa
   screencapture-tarkistus Soundlyn asettelusta (edellinen ajo: "ei tiedostoa 90 s:ssa" → koordinaatit epäilyttävät).
   Aja: AIKARAJA=99999 perl setsid … aja.zsh (vain museo1-rivit jäljellä tehty.txt:n mukaan).
2. Pulu SRB/BLR/TUR kultaiset SK:n hyväksynnän ja Julkaisijan viennin jälkeen: proto-worktree wt/proto-pelikoodari-pulu,
   uusi haara e2b97a8a4:n päälle, `python3 -I pulu-kultaiset.py --kirjoita --haarat --testaa`.
3. Freesound-lataaja pid 8898/8908 odottaa yhä ~/.freesound-tokenia (omistajan OAuth), aikakatkaisu ~21.4x.

## Worktreet
wt/proto-pelikoodari-paakaupungit (juna 178, poista junan jälkeen), wt/proto-pelikoodari-pulu (180). Webissä ei avoimia.
