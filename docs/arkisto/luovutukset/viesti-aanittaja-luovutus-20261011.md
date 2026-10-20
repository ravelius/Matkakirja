# Äänittäjän luovutus 11.10.2026 klo ~19.2x (uudelleenkäynnistys)

## Tehty
- Lyria-nopeat: kaikki 42 nopeaa (37 + Bryssel, Košice, Ljubljana, Luxemburg, Valletta) generoitu, käsitelty, ääniportti + häiriötarkistus 0 hylättyä, äänisivulla (julkaistu 18.5x).
- Viety ämpäriin vie-paketti.sh:lla: 36 nopeaa (musa-nopeat-37-vienti-20261011), Moskovan uusi nimellä musa-kaupunki-moskova-nopea-2-lyria-v2 (musa-moskova-nopea-2-vienti-20261011), 5 nopeaa (musa-nopeat-5-vienti-20261011). Pelikoodari kytkee junaan 183.
- Euroopan ääni-inventaario: docs/raportit/aanet-eurooppa-inventaario-20261011.md (merged #4430).
- Työkansio proto-3d/_tyo/musiikit-5plus5-20261011 (generoi.mjs, nopeat-taulu.mjs 42 kaupunkia, kasittele.zsh, aanisivulle2.py, kehotteet.json).

## Keskeneräinen: ISS-RAKETIN ÄÄNET (Pelikoodari/PT, Linssiseppä 2 kytkee)
Tarvitaan viisi ääntä, tunnukset sytytys, maxq, irtoaminen, toinen-vaihe, hiljaisuus. Ei aloitettu (ei latauksia).
- Sonniss GDC -kasassa ei oikeita rakettilaukaisuja (vain sci-fi Blast Off, RC-jet Viggen ignition, höyrypurkaukset). Soundlyn paikallinen kirjasto tyhjä (GUI-lataus vaatii vapaan näytön, PT).
- PARAS LÄHDE: NASA KSC:n laukaisuäänitteet Wikimedia Commonsissa (Public domain, API-haku tehty, metatiedot nasa-ehdokkaat.json scratchpadissa): SpaceX CLPS IM-2 Pad Mic 1/2 (WAV 75 MB), IM-2 Beach/Causeway (37 MB), Crew-10 Beach/Causeway (35 MB), Artemis II Pad Camera Site 4 (6 MB). Latausluvan pyysin käyttäjältä, EI saatu vielä.
- Jatko: lupa → lataus proto-3d/_tyo/iss-raketti-aanet-20261011 → leikkaus/kerrostus (silmukka ~20 s sytytys+nousu) → ääniportti + musiikkiharia → vientipaketti + LAHTEET.md (PD, NASA) + manifesti → polut LS2:lle (local_ee961a2d).

## Muut avoimet
- Moskovan nimikiista: PT pyysi -lyria-v3, vein jo -nopea-2-lyria-v2 (Pelikoodarin pyynnöstä); ei v3:a ellei PT käske.
- Äänisivun julkaisu: aanisivu-julkaise.zsh kopioituna scratchpadiin; aja sieltä (ei _valmiit-kansiosta).
- Lyria: avain ~/.zshrc (ei ~/.matkakirja-avaimet-koodaus.zsh, antoi API_KEY_INVALID); virhemerkinnät kehotteet.json:ssa poistettava ennen uusintaa.
- Pelikoodarin istunto pidätti aiempia viestejä (lupatila), SendMessage toimii nyt.

## Päivitys 12.10.2026 klo ~10.4x
- Valmiit ja viedyt erät 12.10.: kaari 184 (18 luentaa, v2-nimet, -14,6 LUFS), taidehallin äänimaisema + lähestyminen ulkoa, ISS-raketti v1–v7 (alusta mukana), keittiö yö v1/v1b/v2/v2b ja päivä v1/v1b (Suomen linnut, Yle-lokit CC BY), fokus-luennat + aikaleimat (5 kaupunkia), nopeat 36+5, Moskova -nopea-2.
- Pysyvät luvat: omistaja 12.10.: saa ladata vapaasti lisensoituja (CC0, CC BY, PD) aineistoja; Freesoundin avain vain Actionsissa (aanihaku.yml, tila ehdokkaat, haku, lahteet=freesound), Commons /w/api.php kuvaavalla UA:lla.
- Viestiraja: SendMessage pysähtyy ~10 viestiin; PT on pyytänyt tulokset vuoron loppuun (ei varakanavaa), kunnes käyttäjä kirjoittaa.
- UUSI SITOVA SÄÄNTÖ (omistaja 12.10. klo 10.3x, PT): kun on omistajalle kysymys/pyyntö joka vaatii HÄNEN toimiaan (lupaikkuna, vastaus, kirjautuminen, ostos, päätös), nosta se heti Asemataululle: ArtifactData set, url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix, kokoelma "talo", doc_id "toimi-aanittaja", data {rooli:"Äänittäjä", kysymys:"<yksi rivi>", ts:<ms>}; epäonnistuessa "VAATII TOIMIA: …" vuoron loppuun. Hoidettuna poista dokumentti (get → delete if_version).
- Kuuntelematta (kaikki erät): äänet on tarkistettu vain mittareilla (ääniportti, häiriötarkistus, STT raketti v6); aitoutta ei ole kuunneltu.

## Päivitys 12.10.2026 klo ~15 (tekstiosasto)
- ÄÄNISIVU: ylimpänä osasto "Tekstit odottavat hyväksyntääsi" (data-osio tekstit-odottavat-20261012; julkaistu 2211105f). Rivit li.raita[data-src="tekstit/<tunnus>.txt"] ilman ▶; valinnat.js hyväksyy rivin data-src:n (varmuuskopiot index.html.ennen-tekstit-20261012, valinnat.js.ennen-tekstit-20261012); rivit tekee proto-3d/_tyo/aanisivu-tekstit-lisaa.py (lukee SK:n JSONit scratchpadista).
- SÄÄNTÖ (PT/omistaja 12.10.): uusi kirjoitettu teksti menee ENSIN tähän osastoon; generoin vasta kun omistaja on rastinut Hyväksi ja PT antaa luvan (poikkeus: pysyvä lupa kippien kertojan ääniin hyväksytyistä käsikirjoituksista). Generoitu siirtyy osastosta normaaliin osioon.
- Nyt osastossa 15: shakin opastus (8, William, SK #4504) + taidehallin näyttelyvalikon selitykset (7, SK). Taidehallin Kunniagalleria/Yövartio-salin kerrontatekstejä ei löytynyt repoista/haaroista (kysymättä, viestiraja) → tarkista SK/LS1/LS2.

## Päivitys 12.10.2026 klo ~16 (Tekstit-ylävalikko)
- ÄÄNISIVU: ylävalikossa 3. kohta "Tekstit" (#tekstit, data-n tekstit) + oma näkymä: "Odottaa hyväksyntääsi" (vain tekstit, joista pelissä EI ole mitään versiota; nyt shakin 8) ja "Arkistoidut" (tekstit, joista on versio pelissä; nyt taidehallin 7 näyttelyselitystä). SÄÄNTÖ (omistaja 12.10. 14.5x): uusi teksti ensin Odottaa-listaan; kun pelissä on versio (ääni tai näyttöteksti) → Arkistoidut. Varmuuskopio index.html.ennen-tekstit-valikko-20261012. Rivit tekee proto-3d/_tyo/aanisivu-tekstit-lisaa.py (osio vanha; nyt rakenne käsin index.html:ssä).
- ISS-raketin v2-äänet (jyrinä + särötönt vaihtoehdot) äänisivulla Odottaa valintaasi -kokoelmassa; lähteet proto-3d/_tyo/iss-raketti-v2-20261012/LAHTEET.md.
