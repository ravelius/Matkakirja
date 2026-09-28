# Pulun äänitehosteet ElevenLabs v4:llä — koe (Pelikoodari 28.9.2026)

Omistaja 19.1x: *"Pulu oikeastaan elää kaikesta ekspressiivisyydestä, niin sitä voisi kokeilla nyt alkuun jopa niin paljon kuin mahdollista."*
KOE, ei peliin. Pulun Flicker-ääni `piI8Kku0DcvcL6TTSeQt`, vakaus 0,5. 6 kutsua (3a:n ensimmäinen yritys sai 429:n ruuhkasta ja uusittiin kerran).
Tasoitettu pelin Pulu-repliikkien tasolle (−18,3 dB); raaka `*-raaka.mp3` ja tagiteksti `.txt` ovat vieressä.
Kansio: `/Users/Shared/Claude/proto-3d/lokit/pulu-efektit-koe/`.

**Miten toimivuus arvioitiin (kuuntelematta):** OpenAI whisper -tunnistus (luettiinko tagi ääneen sanoina) ja sanojen aikaleimat
(puheettomat jaksot). Puheettomien jaksojen taso mitattiin (onko siinä ääntä vai hiljaisuutta), ja ISS-näytteestä etsittiin
2 525 Hz:n Quindar-sävy kapealla kaistalla.

| Näyte | Malli | Tagit | Tulos |
|---|---|---|---|
| `1a-chat-pois-turbo` | v4 Turbo | [startled] [excited] [whoosh] [wings flapping rapidly] [fading away] | Tagit eivät kuulu sanoina. Puhe loppuu 2,4 s:ssa, ja sen jälkeen tulee 2,7 s tehostetta (−27 dB, painottuu korkeisiin, suhahdusmainen). |
| `1b-chat-takaisin-turbo` | v4 Turbo | [wings flapping] [whoosh] [lands with a thump] [coos] [panting] [cheerfully] | 2,5 s tehostetta ennen puhetta (−22 dB) ja 2,2 s:n väli repliikkien välissä: siivet, laskeutuminen ja kujerrus todennäköisesti. |
| `2-avaus-kiiruhtaa-v4` | v4 | [distant] [hurried wings flapping] [panting] [whoosh] [gliding] [lands with a soft thump] [breathless] [amused] | 1,3 s alussa ("kaukaa", −29 dB) ja 3,0 s:n väli "Odota, odota!" -huudon jälkeen: liuku ja laskeutuminen. |
| `3a-vastaus-eiffel-turbo` | v4 Turbo | [gasps] [surprised coo] [laughs] [excited] [sighs] [giggles] | Whisper kirjasi alkuun "Oh!" eli henkäys tai kujerrus kuuluu. Puheen välissä on 0,7 s:n taukoja (nauru ja huokaus). |
| `3b-vastaus-tuileries-turbo` | v4 Turbo | [sighs] [softly] [whispers] [chuckles] [mischievously] | Kaikki puhetta, tagit sävyinä, ei sanoina. Raaka hiljaisempi (−25 dB), kuiskaus laskee tasoa. |
| `4-iss-radio-v4` | v4 | [radio static] [quindar beep] [breathing inside a helmet] [radio crackle] [muffled] [excited] | 3,0 s radioääntä ja hengitystä ennen puhetta (−23 dB) ja 1,4 s lopussa. **Quindar-piippausta (2 525 Hz) ei synny.** Kapean kaistan osuus on sama kuin puheessa, eli malli tekee kohinaa, ei sävyä. |

**Johtopäätös:** tehostetagit toimivat, eikä yksikään kuulunut sanana: siivet, suhahdus, laskeutuminen, hengästys ja radiokohina
syntyvät puheen ympärille. **Quindar-piippaukset tehdään pelissä**: 2 525 Hz:n siniääni, 250 ms, alkuun ja loppuun, helppo ja täsmällinen.
Kuuntelupäätös laadusta on omistajan.
