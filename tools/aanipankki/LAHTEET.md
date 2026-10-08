# Matkakirjan äänipankki v1 (Pelikoodari 5.10.2026)

Omistajan päätös 5.10.2026 klo 13.1x (Päätoimittaja): kaikki pelin henkilöäänet yhdestä pankista, ElevenLabs Voice Design v3
(eleven_ttv_v3) yhteisellä pohjalla "Studio quality, perfect audio quality, close-mic, dry, no reverb, no background noise.",
ei kieli- tai aksenttimerkintää. Äänet on tallennettu tilin ääniksi nimellä "Matkakirja <tunnus>".

**Lisenssi:** CC0 (oma tuotanto, ElevenLabs maksullinen tili, kaupallinen käyttö sallittu).

- `rekisteri.json`: tunnus → voice_id, design-prompt (kuvaus), selkokielinen kuvaus, sukupuoli, ikä, käyttöpaikat, näyte.
- `kartta-olavinlinna.json`: Olavinlinnan henkilö → pankin tunnus (ehdotus; omistaja valitsee).
- (ei repossa) `naytteet/<tunnus>.mp3`: näyte eleven_v4:llä (linnan henkilöt omalla ensimmäisellä kuunnelmarivillään, muut neutraalilla
  lauseella), keskitaso −17,2 dB + limitteri 0,97; `-RAAKA.mp3` sellaisenaan. `esikatselut/`: Voice Designin englanninkielinen esikatselu.
- `pyynnot/`: design-, luonti- ja näytepyynnöt vastauksineen (ilman ääntä). `kooste.mp4|mp3` + `KOOSTE.md`, `whisper.txt`.
- Lapsiäänet (poika 13, tyttö 10) ElevenLabs estää turvasäännöillään (403 blocked_generation): tilalla 18-vuotiaat nuorekkaat äänet.
- Generointi: proto-3d/tyokalut/pelikoodari-ajot/aanipankki.py, kooste aanipankki-kooste.py.

**VERSIO 1 LUKITTU 5.10.2026 klo 14.1x** (omistaja hyväksyi kaikki 20; #13–15 suunniteltu uudelleen v2:na PCM:llä, siemen +500):
`rekisteri.json` (versio 1, tila lukittu, kirjoitussuojattu) on äänipankin lähde. Muutokset vain uutena versiona. Hylätyt v1-äänet
(#13–15) ovat rekisterin hylatyt-osiossa ja yhä ElevenLabs-tilillä (ei poistoja). Kooste: `kooste.mp4` / `kooste.wav` (KOOSTE.md).

**Repossa (5.10.2026, Päätoimittaja):** `tools/aanipankki/rekisteri.json` (versio 1, lukittu) ja `kartta-olavinlinna.json` ovat äänipankin
lähde versionhallinnassa. Äänitiedostot (näytteet, koosteet) eivät ole repossa (omistaja 11.9.2026: ei äänitiedostoja repoon); ne ovat
Macilla kansiossa proto-3d/_valmiit/aanipankki-v1/. Generointi: proto-3d/tyokalut/pelikoodari-ajot/aanipankki.py.
