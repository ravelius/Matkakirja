# Päätoimittajan luovutus 15.10.2026 klo 00.48 (oma nollaus 38 %, raja 30–40 %)

PT (Opus, medium) local_74630a27-8c1b-4ac3-9143-538efab8cbcd; KK local_593b89a1-2514-4d74-b956-2a73db862382. Osoitteet /Users/Shared/Claude/osoitekirja.md. Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-14-klo-2302-0048.md.

## 0. Heti aluksi
1. set_remote_control self true. 2. Ei jonokierros-cronia (Postivahti herättää). 3. Monitor `python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py` 30 min, uudelleen joka vanhenemisella (ODOTTAA → ArtifactData set talo/toimi-<rooli>-odottaa {rooli, kysymys, ts}; JATKUU → delete). 4. Asemataulu EekZDPMuAcsjT3awvn4jPb, collection "talo" (EI "data/talo"); omat tiedostot scratchpad/asemataulu/data/talo/*.json, lue live ensin (get out_dir) ja pinnaa if_version.
5. LOKIA HAETAAN `node tools/loki-hae.mjs <sana>` (mainissa 5dcb876da), ei grepillä. Ennen kuin jatkat luovutuksesta tulevaa työtä: hae lokista, onko se lopetettu (Eiffel-oppi 23.59, muisti perutut-tyot-lokista-ja-junakortti).

## 1. JUNAT
- TF 191: sisäinen 22.55, ulkoinen 15.10. 00.18. Kortti yhdellä Uutta-listalla (myös TF 190).
- JUNA 192 runko NS 0f4ec6def (+ LS1 3811f47f5, lippu 3c23eb73c). KUITATTU, NS:lle vietävä: NUI teline b0094af60, yläreuna a1333cc3c, build-numero 222fea1d7 (NUI vie NS:lle). LUKITUS: kun NUI:n testi-192f (ISS 5–7 e39809f76: vrk/kausi päivittyy, nappien fontti, latausruutu vain sijainti) on kuitattu arkista → ilmoita NS:lle lukitus; siihen mennessä kuitatut ISS 00.34 -korjaukset mukaan, loput 193:een (NS tietää).
- ISS 00.34 työn alla: Valoseppä raketin lähestyminen ilman hyppyä + laukaisun S-käyrä (linssiseppa2/iss-lahestyminen-192, video + kamera-askelmittaus); PK kertojan lauseiden alun katkeaminen (RMS-todistus) + kertojan "Napauta ohjauspaneelin näyttöä…" (ohje-ohjauspaneeli.mp3 OMISTAJAN HYVÄKSYMÄ) kytkentä; Äänittäjä Pulun "Max Livia" uusi otto (omistaja kuuntelee KK:n kautta ennen vientiä) + "permanentti lähtee" pidempi loppu (vain jos parempi).
- ODOTTAA OMISTAJAA (KK:lla kortti 00.4x): lasipohja (lasi2-192-ipad.png) ja iPadin yläreunan kaupunkirivi (ylareuna-192-ipad-kolme.png; NUI: "ui ylapalkki paikka 1", oletus pois). Kyllä → NUI vie NS:lle.
- Ulkoisen viive korjattu junasta 192: #4602 mergetty, muutosloki kirjoitetaan ja mergetään lukituksessa (NS:llä ohje) → ulkoinen ≈ sisäinen. Todenna 192:lla.
- Laitekierros 192: NS mittaa trailerin fps (tavoite 60, simussa 48) ja logon alareunan (Clamp) iPadilla → TULOS-rivi.
- Roiske v8d (pisarat) vahdissa, Valoseppä tekee ISS:n ensin; v8b junassa.

## 2. JUNA 193 kertyy
- 8 pääkaupunkia pysäkeiksi (Minsk, Chișinău, Belgrad, Vaduz, Monaco, Skopje, Tirana, Zagreb): KS karttaseppa-paakaupungit-pysakeiksi-193 (6ffd7c44a + cfb95e0b8), SK sisaltokirjuri-pysakit-193 (1e22648ce; Livian kuplat > 125 merkkiä lyhennettävä), PK pelikoodari-pysakit-193 d98299df0 → PK tekee yhteisen PR:n. Reykjavík = Islanti. Bern/Bratislava/Podgorica/San Marino/Andorra jäävät kevyiksi (uusi sisäänkäynti vaatisi omistajan UI-päätöksen; ei kysytty).
- PK: aloituslennon kamera 92783317f (päätös 23.54) + Kreeta – iPad-kuva-arkki tulossa → kuittaa.
- LS1: museon reunavara 7db2fd1cf; maalausten valotusmittaus (ΔE/kirkkaus lähdekuvaan) käynnissä; Lontoon laatat todettu teräviksi (työlista valmis).
- Codex: Petřín K2 hyväksytty → K3; Pulun pään leikkautuminen kääk-hetkessä (posti b3c461647). Tarkista posti/ codex-fable-*.

## 3. RAAMATTU
- Mergetty: #4603 (PR 0 rivitys), #4604 (PR 1 osio 0.11 + illan päätökset: nollausrajat, säästöt, lasipohja, Boost, aloituslennon kamera, Eiffel-lopetus, junakortti, KK-päätökset), #4605 lokihaku.
- KK:n CLAUDE.md-PR #4606 (lokihaun rivi): EN mergennyt (CLAUDE.md vain omistajan viestillä / KK tekee). Ei sinun.
- Seuraavaan Raamattu-PR:ään: lokin 00.07-opin "grep" → "loki-hae.mjs"; vanhan paatokset-2026-09.md:n jako kuukausiin (vasta 192:n lukituksen jälkeen, merge jonottaa sisältöviennin ~40 min). Lista kartoituksen lopussa docs/raportit/raamattu-lapikaynti-kartoitus-20261014.md (paikallinen). Läpikäynnin PR:t 2–8 kartoituksen järjestyksessä.

## 4. MUUT
- Asemataulu-sessio: Boost-nappi (talo/boost) + viikkolaatta "nollautuu ti klo 2.00" + tahtiarvio – odota kuittausta. Postivahdille Boost-herätys KIERROS.md:hen pyydetty.
- Eiffel LOPETETTU (Google jää); tyojonot.md:n rivit merkitty; muutokset vain haarassa linssiseppa2/leikkaus-ala-191.
- Viikkokiintiö 82 % (nollaus ti 20.10. 02.00).

## 5. LEVY (00.5x)
- Vapaana ~34 Gt (TF-käännös vaatii > 30 Gt); NUI:n L1-käännös kaatui 00.47. PT poisti omat 3 mergettyä worktreetä. Julkaisija ehdottaa siivouspyyntöä rooleille ennen junan 192 lukitusta: kukin poistaa omat mergetyt wt/-worktreet (tools/uusi-worktree.sh --poista) ja vanhat .app-kopiot proto-3d/lokit/:sta (ei proto-natiiviseppa-tyokalut). TEE ENSIMMÄISENÄ.
