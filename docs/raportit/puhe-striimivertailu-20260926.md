# Striimaavan puheäänen vertailu suomeksi (Pelikoodari 26.9.2026)

Fablen tilaus omistajalle: parempi striimaava ääni Livialle ja kertojalle (nyt `gpt-4o-mini-tts` striimissä,
`eleven_v3` esigeneroituna). Samat kolme repliikkiä jokaisella moottorilla, ajettu Mac Studiolta peräkkäin
(ei rinnakkain) kahdesti; taulukossa toisen ajon luvut (ensimmäinen ajo oli kylmä, luvut samaa luokkaa).

**Luontevuutta en voi kuulla** — se on omistajan korvan asia (linkit alla). Mittasin sen sijaan
sanatarkkuuden: jokainen näyte litteroitiin takaisin (`gpt-4o-transcribe`, fi) ja verrattiin syötteeseen.

## Repliikit

| Tunnus | Teksti | Ääni |
|---|---|---|
| livia | Hei, kato! Tuolla se on — Akropolis! Mä en ois ikinä uskonu, et me päästään tänne asti. | Livia |
| kertoja | Parthenonin temppeli rakennettiin vuosina 447–432 ennen ajanlaskun alkua jumalatar Athenen kunniaksi, ja sen marmori louhittiin Pentelikonvuorelta. | kertoja |
| vastaus | Hyvä kysymys! Pylväät näyttävät suorilta, mutta ne kallistuvat hieman sisäänpäin — rakentajat korjasivat näin silmän harhaa. | vastaaja |

Äänet: ElevenLabs Livia = *Flicker* (piI8Kku0DcvcL6TTSeQt), kertoja ja vastaus = *Viisas Kertoja*
(Sz0tRTEpybtDJ9ru2kgD); OpenAI `sage`/`onyx` pelin persoonaohjeilla (tools/pollo/worker.js), Realtime
`marin`/`cedar`; Gemini `Leda`/`Charon`.

## Tulokset

Ensimmäinen tavu = pyynnön lähdöstä ensimmäiseen äänitavuun (ms), livia / kertoja / vastaus.

| Moottori | Ensimmäinen tavu (ms) | Sanatarkkuus | Striimi | Hinta / 1 000 merkkiä* | Välimuisti / offline |
|---|---|---|---|---|---|
| **ElevenLabs Flash v2.5** | 256 / 185 / 188 | täsmälleen | HTTP-chunk + WebSocket | ~0,05 $ (tai ½ krediittiä/merkki) | mp3 talteen omaan ämpäriin kuten nyt |
| ElevenLabs Turbo v2.5 | 228 / 331 / 285 | täsmälleen | sama | sama | sama — **poistumassa**, Flash korvaa |
| **ElevenLabs v3 (striimi)** | 711 / 602 / 530 | täsmälleen, tagit toimivat | HTTP-chunk (WebSocket vain Dialogue-rajapinnassa) | ~0,10–0,30 $ (1 krediitti/merkki, tilauksesta riippuen) | sama; **sama malli ja ääni kuin nykyiset esigeneroidut** |
| OpenAI gpt-4o-mini-tts (nykyinen) | 1 248 / 1 295 / 500 | **yksi virhe:** "447–438" | HTTP-chunk | ~0,015 $/min ääntä ≈ 0,017 $ | sama |
| OpenAI Realtime (gpt-realtime) | 1 136 / 2 301 / 932 | **ei lue sanatarkasti** — keksii omat repliikit (livia 18 s, vastaus 30 s) | WebSocket | ~0,05 $/min | ei sovellu lukijaksi |
| Gemini 2.5 Flash TTS | 5 455 / 9 382 / 7 135 | täsmälleen | SSE, mutta **ääni tulee yhtenä palana lopussa** — ei aitoa striimiä | tokenihinta (ei suoraan merkkeinä) | sama |
| Gemini 2.5 Pro TTS | 7 958 / 16 305 / 8 507 | täsmälleen | sama | sama | sama |
| Google Chirp 3 HD (fi-FI) | — | — | gRPC StreamingSynthesize | ~0,03 $ | **ei ajettu:** Gemini-avain on estetty Cloud TTS -rajapinnalta (403); vaatii Cloud-projektin palvelutilin |
| Azure Neural fi-FI (Selma, Noora, Harri) | — | — | WebSocket (Speech SDK) | ~0,016 $ (HD ei suomeksi) | **ei avainta** |
| Cartesia Sonic 3 | — | — | WebSocket | ~0,03 $ (arvio tilauksesta) | **ei avainta**; suomi (fi) on rajapinnan kielilistassa |
| xAI Grok TTS | — | — | WebSocket | 0,015 $ | **ei avainta**; suomen tukea ei vahvistettu dokumentaatiosta ("20+ kieltä", ei listaa) |

\* Hinnat julkisista hinnastoista ja välittäjäsivuilta 26.9.2026; osa virallisista hintasivuista ei auennut
(OpenAI 403, Azure paikkamerkit), joten ne ovat suuntaa-antavia. Oletus ~900 merkkiä/min suomen puhetta.

## Johtopäätös (Pelikoodarin suositus, omistaja päättää korvalla)

1. **ElevenLabs Flash v2.5** on selvästi nopein (~0,2 s ensimmäiseen tavuun) ja sanatarkka. Jos omistaja
   pitää sen suomea riittävänä, se on striimin paras ehdokas.
2. **ElevenLabs v3 striimattuna** (~0,5–0,7 s) on sama malli ja ääni kuin pelin esigeneroidut luennat ja
   Livian repliikit, joten striimattu ja esigeneroitu puhe kuulostaisivat samalta. Hitaampi, mutta nykyistä
   `gpt-4o-mini-tts`:ää (~0,5–1,3 s) nopeampi.
3. `gpt-4o-mini-tts` luki vuosiluvun väärin yhdessä näytteessä; Realtime ja Gemini eivät sovi (keksii /
   ei striimaa).
4. Chirp 3 HD, Azure ja Cartesia vaativat uuden avaimen. Jos niitä halutaan kuulla, avaimet Macin
   ~/.zshrc:hen (GOOGLE-palvelutili, AZURE_SPEECH_KEY + alue, CARTESIA_API_KEY), ja ajo on minuutin työ
   samalla skriptillä.

## Näytteet (ämpäri)

`https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/<moottori>-<repliikki>.mp3`, esim.

- ElevenLabs Flash v2.5: [livia](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/eleven-flash_v2_5-livia.mp3) · [kertoja](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/eleven-flash_v2_5-kertoja.mp3) · [vastaus](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/eleven-flash_v2_5-vastaus.mp3)
- ElevenLabs v3: [livia](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/eleven-v3-livia.mp3) · [kertoja](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/eleven-v3-kertoja.mp3) · [vastaus](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/eleven-v3-vastaus.mp3)
- ElevenLabs Turbo v2.5: [livia](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/eleven-turbo_v2_5-livia.mp3) · [kertoja](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/eleven-turbo_v2_5-kertoja.mp3) · [vastaus](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/eleven-turbo_v2_5-vastaus.mp3)
- OpenAI gpt-4o-mini-tts (nykyinen): [livia](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/openai-4o-mini-tts-livia.mp3) · [kertoja](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/openai-4o-mini-tts-kertoja.mp3) · [vastaus](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/openai-4o-mini-tts-vastaus.mp3)
- OpenAI Realtime: [livia](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/openai-realtime-livia.mp3) · [kertoja](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/openai-realtime-kertoja.mp3) · [vastaus](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/openai-realtime-vastaus.mp3)
- Gemini 2.5 Flash TTS: [livia](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/gemini-2.5-flash-tts-livia.mp3) · [kertoja](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/gemini-2.5-flash-tts-kertoja.mp3) · [vastaus](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/gemini-2.5-flash-tts-vastaus.mp3)
- Gemini 2.5 Pro TTS: [livia](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/gemini-2.5-pro-tts-livia.mp3) · [kertoja](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/gemini-2.5-pro-tts-kertoja.mp3) · [vastaus](https://media.matkakirja.app/audio/vertailu/puhe-striimi-20260926/gemini-2.5-pro-tts-vastaus.mp3)

Lähteet (hinnat ja tuki): elevenlabs.io/docs/models, docs.x.ai/developers/pricing,
x.ai/news/grok-stt-and-tts-apis, learn.microsoft.com (Speech language support),
docs.cloud.google.com/text-to-speech/docs/chirp3-hd, docs.cartesia.ai/api-reference/tts/tts.
