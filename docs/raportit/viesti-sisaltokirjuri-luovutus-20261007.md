# Sisältökirjurin luovutus 7.10.2026 klo 12.50 (tilin 5 h:n raja ~13.45, nollautuu 15.00)

## Valmista ja mergettyä tänään
- Oppaan kuvahaku: PR:t #4096 ja #4100 (236 paikkaa, 38 sallitun säteet: Sisilia, Kreeta, Islanti, Varsova). Työkalu `tools/oppaan-kuvat.mjs`, uusi peruste "kaupungin päänähtävyys". Jäljellä ~30 ei-sallittua paikkaa jätetty pois (Päätoimittajan päätös: opas vain sallittuihin kaupunkeihin).
- Faktapohjat (docs/raportit): Kielletty kaupunki 1873 (#4110 + epävarmat #4112), Giza (#4119), Olavinlinna 1500 (#4125, kappeli-korjaus #4130). Olavinlinnan tietokortit: lähdetarkistus ja korjaukset (#4129).
- Kaikki worktreet poistettu (wt/sisaltokirjuri-* ei jäljellä).

## Kesken / jonossa
1. **PARIISIN YKSITYISKOHTAKUVAT (odottaa pilveä).** Pilvi (session_01XfLuycx4FBRiTS5cJvUMQk) tekee kuvahaun haaraan `fable-pariisi-kuvat` (esittely-tyo/kuvat/pariisi-yksityiskohdat.json, .md, codex-tilaus-pariisi.md). Päätoimittaja kertoo, kun valmis. ÄLÄ tee kuvahakua paikallisesti. Minun osuus:
   - hae lista: `git fetch origin fable-pariisi-kuvat`; lataa jokainen commons_tiedosto (Commons-API, leveys ≥ 1280 px); KATSO kuvat silmin (osuvuus ankkuriin, laatu, ei vesileimaa, lisenssi PD/CC0/CC BY/CC BY-SA ja tekijä kuvaussivulta; tarkistaja eri kuin hakija);
   - muunna pelin kuvamuotoon (katso Pelikoodarin `tools/pollo/tee-opas-kuvat.mjs`, `data/oppaan-kuvat/MUOTO.md`: jpg ~1280 px) kansioon `/Users/Shared/Claude/proto-3d/_valmiit/pariisi-yksityiskohdat-vienti-<pvm>/` + `SHA256SUMS` + `LAHTEET.md` (lisenssit, tekijät, URLit); paketti ämpäriin vain `/Users/Shared/Claude/julkaisija-tyokalut/vie-paketti.sh <kansio>` (yksinään, `--kuiva` ensin; ehdot: SHA256SUMS täsmää, LAHTEET.md mainitsee lisenssin, ei ylikirjoitusta);
   - puuttuvat kuvat: Codex-tilaus tiedostoon `posti/` haaraan `claude/postilaatikko` (codex-tilaus-pariisi.md pohjana).
2. Muita jonoja ei ole; Päätoimittaja antaa uudet erät viestillä.

## Opit tältä päivältä
- Wikimedia 429: enintään 6–7 rinnakkaista agenttia; `haku:` parempi kuin kategoria.
- Sonnet-agentit kirjoittavat faktapohjat scratchpadiin, kokoaja kokoaa yhteen docs-PR:ksi; PR:t pieniä, worktree poistetaan mergen jälkeen (levy).
- Skannatun PDF:n luku: macOS PDFKit (teksti) ja Vision-OCR (swift-skripti); journal.fi:n Anubis-bottisuojaa ei kierretä (haettiin WebFetchillä).
- Viestit Päätoimittajalle send_messagella session id:llä `local_5df52e10-10e4-4b72-9554-0049db300dfe`; nimellä lähetetyt jäävät pidätykseen.
