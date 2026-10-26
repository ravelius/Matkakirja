# Koe: Gemini 3.8 Flash TTS Pulun ääneksi

Tehty 2026-09-29. Omistajan tilaus: "Tee Testi ja anna hinnat." Isoisän
(kertojan) ääntä ei generoitu — vain Pulun repliikkejä ja yksi irrallinen
numerotestilause.

## 1. Malli

Rajapinnasta (`GET /v1beta/models`, `x-goog-api-key`) löytyi tarkalleen
omistajan mainitsema malli:

```
name: models/gemini-3.8-flash-tts
displayName: Gemini 3.8 Flash TTS
version: 3.8-flash-tts
supportedGenerationMethods: generateContent, countTokens, batchGenerateContent
```

Rinnalla listalla oli myös `gemini-3.8-flash-lite-tts`, `gemini-3.1-flash-tts-preview`,
`gemini-2.5-flash-preview-tts` ja `gemini-2.5-pro-preview-tts` — näitä ei testattu,
koska omistaja pyysi nimenomaan 3.8 Flash TTS:ää.

### Rajapinnan muoto (vahvistettu OIKEILLA KUTSUILLA, ei vain dokumentaatiosta)

- Endpoint: `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent`
- `generationConfig.responseModalities: ["AUDIO"]` — pakollinen.
- Ääni: `generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName`.
  Vahvistettu oikeaksi rakenteeksi antamalla virheellinen äänennimi — API vastasi
  `400 "No matching speaker voice found for name: EiOleAani and language: "`, eli
  palvelin todella lukee juuri tämän polun.
- Tyyliohje: `contents[].parts[].speechMetadata.style` (esim. `"iloinen ja lämmin"`).
  Kenttä on olemassa (API validoi tuntemattomat kentät tiukasti 400-virheellä, ja
  `speechMetadata` läpäisi validoinnin) — **MUTTA se vaatii nimetyn äänen**: kutsu
  ilman `voiceConfig`-kenttää (oletusääni) + `speechMetadata.style` palautti
  `400 "Request contains an invalid argument."`. Oletusäänellä ei siis tässä
  kokeessa voinut antaa tyyliohjetta.
- Vastaus ilman striimausta: `candidates[0].content.parts[0].inlineData` =
  `{ mimeType: "audio/wav", data: <base64> }` — täysi WAV-tiedosto (PCM16,
  24 kHz, mono), ei pelkkä raaka PCM. `usageMetadata` sisältää
  `promptTokenCount` (teksti), `candidatesTokenCount` (audio) ja `totalTokenCount`.
- Striimaus: `POST .../streamGenerateContent?alt=sse`. **HUOM tekninen sudenkuoppa**:
  tapahtumien erotin on `\r\n\r\n`, EI `\n\n` — tavallinen SSE-jäsennin (joka etsii
  `\n\n`) ei löydä yhtään palaa. Korjauksen jälkeen striimaus toimi ja palautti
  audiota 75–91 palana per vastaus, kunkin `inlineData.mimeType` on
  `"audio/l16; rate=24000; channels=1"` (raaka headeriton PCM16, kuten
  dokumentaatio lupaa).
- Suomi: dokumentaatio (ai.google.dev) ei nimeä suomea eksplisiittisesti
  tuettujen kielten listalla, vaikka malli väittää tukevansa 130+ kieltä
  automaattisella kielentunnistuksella. **Kokeen omat mittaukset (alla) osoittavat
  kuitenkin, että suomi toimii käytännössä hyvin** (whisper-WER 0,00–0,077 kaikilla
  otoilla).
- 30 valmista ääntä: Zephyr, Puck, Charon, Kore, Fenrir, Leda, Orus, Aoede,
  Callirrhoe, Autonoe, Enceladus, Iapetus, Umbriel, Algieba, Despina, Erinome,
  Algenib, Rasalgethi, Laomedeia, Achernar, Alnilam, Schedar, Gacrux, Pulcherrima,
  Achird, Zubenelgenubi, Vindemiatrix, Sadachbia, Sadaltager, Sulafat.

Lähteet: [speech-generation](https://ai.google.dev/gemini-api/docs/speech-generation),
[generate-content/speech-generation (legacy)](https://ai.google.dev/gemini-api/docs/generate-content/speech-generation),
[gemini-3.8-flash-tts](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts),
[pricing](https://ai.google.dev/gemini-api/docs/pricing).

## 2. Äänivalinta

Kolme nuoreen/iloiseen hahmoon sopivaa ehdokasta (Puck "Upbeat", Leda
"Youthful", Zephyr "Bright") generoitiin lyhyimmällä tuotantorepliikillä
(paljastus-1) tyyliohjeella "Nuori, iloinen ja lämmin kertoja, puhuu luontevaa
suomea." ja litteroitiin whisper-1:llä (language=fi):

| Ääni | Whisper-litterointi | Sanavirheitä / sanoja | WER |
|---|---|---|---|
| Puck | "Kääk! Apua! Pöllö on matkoilla, mut ei hätää, tuuraan häntä sen aikaa." | 1/12 ("mut" puhekielinen lyhenne) | 0,083 |
| **Leda** | "Kääk, apua! Pöllö on matkoilla. Mutta ei hätää, tuuraan häntä sen aikaa." | 0/12 | **0,000** |
| Zephyr | "Kääk, apua! Pöllö on matkoilla. Mutta ei hätää, tuodaan häntä sen aikaa." | 1/12 ("tuodaan" ≠ "tuuraan", todennäköinen ääntämisvirhe) | 0,083 |

**Valittu paras ääni: Leda** ("Youthful"/nuorekas kuvauksen mukaan — sopii
Pulun persoonaan). Puck ja Zephyr eivät ole huonoja, mutta Ledan litterointi
osui täsmälleen tekstiin.

## 3. Mittaukset

### Striimaako?

**Kyllä.** `streamGenerateContent` palauttaa audiota paloina (SSE, ks. yllä
tekninen huomio `\r\n\r\n`-erottimesta) ennen kuin koko vastaus on valmis —
mitattu 75–91 palaa per vastaus lyhyellä repliikillä.

### Ensimmäisen äänen viive (5 ajoa, paljastus-1 "Kääk, apua! …", oletusääni, ei tyyliohjetta)

| | min | mediaani | max |
|---|---|---|---|
| Ei-striimaava (koko vastaus valmis) | 2746 ms | 3486 ms | 4293 ms |
| Striimaava — ensimmäinen audiopala | **1030 ms** | **1120 ms** | 1284 ms |
| Striimaava — koko vastaus valmis | 3006 ms | 3121 ms | 3599 ms |

Striimaus tuo ensimmäisen kuultavan äänipalan noin **3× nopeammin** kuin
koko vastauksen odottaminen (mediaani 1120 ms vs. 3486 ms), koko vastauksen
kokonaisaika on suunnilleen sama kummallakin tavalla.

### Suomen ääntäminen (whisper-1, language=fi, verbose_json, sanakohtaiset ajat)

Jokainen lopullinen ääninäyte (oletus + Leda, 5 repliikkiä = 10 näytettä)
litteroitiin ja verrattiin sana sanalta referenssitekstiin:

| Repliikki | Ääni | Whisper-teksti | Virheet | WER |
|---|---|---|---|---|
| paljastus-1 | oletus | "Kääk! Apua! Pöllö on matkoilla, mutta ei hätää, tuuraan häntä sen aikaa." | 0 | 0,000 |
| paljastus-1 | Leda | "Kääk, apua! Pöllö on matkoilla. Mutta ei hätää, tuuraan häntä sen aikaa." | 0 | 0,000 |
| avaus-4 | oletus | "Ai niin, ja anteeksi valikoima, pöllö on tarkistanut vasta yhden reitin. Ateenasta se alkaa." | 0 | 0,000 |
| avaus-4 | Leda | "Ai niin, ja anteeksi valikoima, Pöllö on tarkistanut vasta yhden reitin. Ateenasta se alkaa!" | 0 | 0,000 |
| ateena-3 | oletus | "**Sliimannin** talo on nyt rahamuseo. … **Siirsi** jalkaa ihan vähän. …" | 2/26 | 0,077 |
| ateena-3 | Leda | "**Schliemannin** talo on nyt rahamuseo. … **Siirsi** jalkaa ihan vähän. …" | 2/26 | 0,077 |
| iss-a-2 | oletus | "Ja kaikki tämä noin **400** kilometrin korkeudelta. …" | 1/21 | 0,048 |
| iss-a-2 | Leda | "Ja kaikki tämä noin **400** kilometrin korkeudelta. …" | 1/21 | 0,048 |
| testilause | oletus | "Tornin korkeus on 432 metriä ja se valmistui vuonna 1889." | 0 | 0,000 |
| testilause | Leda | "Tornin korkeus on 432 metriä ja se valmistui vuonna 1889." | 0 | 0,000 |

**Numerotarkistus:**
- **432 / 1889** (testilause, kirjoitettu numeroin lähteessä): whisper kirjoitti
  molemmat luvut täsmälleen samoin numeroin molemmilla äänillä → ei virhettä.
- **"neljänsadan"** (iss-a-2, kirjoitettu sanana lähteessä, koska Pulun kaanonissa
  ei ollut yhtään numeroin kirjoitettua tuotantorepliikkiä — siksi tehtävän
  fallback-testilause otettiin erikseen käyttöön): whisper normalisoi puhutun
  luvun muotoon "400" molemmilla äänillä. **Tätä ei voi tulkita suoraan
  ääntämisvirheeksi** — whisper-1:n tunnettu käytös on kirjoittaa puhutut luvut
  numeroin riippumatta sijamuodosta, joten "400" voi vastata joko oikein
  lausuttua "neljänsadan" tai virheellisesti lausuttua "neljäsataa" (nominatiivi).
  Tekstivertailu ei erota näitä; varma vastaus vaatisi ihmiskuuntelun.
- Muut virheet: **"Sliimannin" vs. "Schliemannin"** (vain oletusäänellä) —
  todennäköinen ääntämisvirhe vieraassa konsonanttiyhdistelmässä "Schl-",
  Leda ääntää nimen oikein. **"Siirsi" vs. "Siirsin"** — sama poikkeama
  molemmilla äänillä, todennäköisemmin whisper-artefakti (loppu-n hukkuu
  lyhyessä sanassa) kuin systemaattinen Gemini-virhe, koska se toistuu
  identtisenä kahdella eri äänimallilla.

## 4. Hinnat

### Gemini 3.8 Flash TTS

Lähde: [ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing)
(luettu 2026-09-29).

| | Input (teksti) | Output (audio) |
|---|---|---|
| Voimassa 31.12.2026 asti | $0.50 / 1M tokenia | $9.00 / 1M tokenia (≈ $0.00225 / 10 s ääntä) |
| Voimassa 1.1.2027 alkaen | $1.00 / 1M tokenia | $18.00 / 1M tokenia (≈ $0.0045 / 10 s ääntä) |

Mitattu tokeni/merkki- ja tokeni/sekuntisuhde tämän kokeen OIKEISTA
`usageMetadata`-vastauksista: n. 2,3–3,4 merkkiä/tekstitokeni (vaihtelee
tekstin mukaan) ja hyvin tasainen **32,1 audiotokenia/sekunti** kaikilla
viidellä repliikillä (esim. paljastus-1: 208 audiotokenia / 6,48 s = 32,1).

Kustannus repliikkiä kohti (oikeista kutsuista, USD, 2026-hinnoittelu):

| Repliikki | Merkkejä | Oletusääni | Leda (paras) |
|---|---|---|---|
| paljastus-1 | 72 | $0.001888 (32+208 tok) | $0.001762 (32+194 tok) |
| avaus-4 | 92 | $0.002293 (31+253 tok) | $0.001942 (31+214 tok) |
| ateena-3 | 185 | $0.004407 (65+486 tok) | $0.004371 (65+482 tok) |
| iss-a-2 | 155 | $0.003146 (45+347 tok) | $0.003173 (45+350 tok) |
| testilause | 58 | $0.002371 (25+262 tok) | $0.002055 (25+227 tok) |

Normalisoitu per 1000 merkkiä ja per ~300 merkkiä (Pulun tyypillinen
vastauspituus), viiden repliikin keskiarvo, 2026-hinnoittelu:

| | per 1000 merkkiä | per 300 merkkiä |
|---|---|---|
| Oletusääni | **$0.0272** | **$0.0082** |
| Leda (paras ääni) | **$0.0250** | **$0.0075** |

(1.1.2027 alkaen suunnilleen kaksinkertainen: n. $0.050–0.054 / 1000 merkkiä,
$0.015–0.016 / 300 merkkiä.)

### ElevenLabs (vertailuksi) — HUOM: LÄHTEET RISTIRIIDASSA

Virallinen hinnastosivu ([elevenlabs.io/pricing/api](https://elevenlabs.io/pricing/api),
luettu 2026-09-29) antoi:

| Malli | Normaalihinta / 1000 merkkiä | Alennushinta / 1000 merkkiä (määräaikainen, voimassa 12.10. asti) |
|---|---|---|
| eleven_v4 | $0.08 | $0.022 |
| Flash/Turbo (eleven_flash_v2_5 -sukuinen) | $0.04 | — |

Muut lähteet (blogikoosteet, ei ensikäden virallista dataa — HappyRobot,
Flexprice, Cekura) antoivat selvästi korkeampia lukuja: n. **$0.10/1000
merkkiä** multilingual/v4-tason malleille ja **$0.05/1000 merkkiä**
flash/turbo-malleille, tai tilauspohjaisesti laskettuna (esim. Creator-taso
$22 / 121 000 credittiä, 1 credit/merkki v4-tyyppisille malleille, 0,5
credit/merkki flash-malleille) n. **$0.18/1000 merkkiä** (v4) ja **$0.09/1000
merkkiä** (flash). **Näitä lukuja ei ole sovitettu yhteen** — ero voi
selittyä sillä, että virallisen sivun $0.022 on selvästi merkitty
määräaikaiseksi kampanjahinnaksi eikä sen voimassaolovuosi käynyt sivulta
yksiselitteisesti ilmi, ja credit-pohjainen efektiivinen hinta riippuu
valitusta tilaustasosta. **En arvaa kumpi on oikea — omistajan kannattaa
tarkistaa elevenlabs.io/pricing juuri ennen päätöstä.**

Per 300 merkkiä (300/1000 × yllä):

| Malli | Virallinen normaali | Virallinen promo | Blogit/credit-arviot |
|---|---|---|---|
| eleven_v4 | $0.024 | $0.0066 | $0.030–0.055 |
| eleven_flash_v2_5 | $0.012 | — | $0.015–0.027 |

Lisähuomio kielistä (elevenlabs.io/docs/models): Eleven v4 tukee 90+ kieltä
ja suomi (fin) on nimetty mukana; Flash v2.5 tukee 32 kieltä eikä suomea ole
erikseen mainittu siinä listassa.

## 5. Toimitetut tiedostot

`/Users/Shared/Claude/proto-3d/lokit/pulu-gemini-koe/`:
- `<repliikki>-gemini-oletus.mp3`, `<repliikki>-gemini-leda.mp3`,
  `<repliikki>-v4.mp3` — paljastus-1, avaus-4, ateena-3, iss-a-2
  (kaikki tasoitettu −17,2 LUFS, 192 kbps, mono, 44,1 kHz, sama menetelmä
  kuin `tools/tasoita-pulu.mjs`; v4-tiedostot ladattiin tuotannosta
  sellaisenaan, koska ne olivat jo `tasoitettu/`-avaimissa − mitattu
  jälkikäteen −17,2…−17,4 LUFS, eli tavoitteessa).
- `testilause-gemini-oletus.mp3`, `testilause-gemini-leda.mp3` (ei
  v4-vastinetta, koska testilause ei ole tuotantorepliikki).
- `kooste-v4-vs-gemini.mp3` — järjestys: (v4 | 1 s hiljaisuus | Gemini-Leda
  | 1 s hiljaisuus) × {paljastus-1, avaus-4, ateena-3, iss-a-2}, lopuksi
  testilauseen kaksi Gemini-versiota (oletus | 1 s | Leda).
- `tulokset.md` (tämä tiedosto), `tulokset.json` (raakamittaukset:
  mallitiedot, äänivalinnan whisper-data, kaikkien generointikutsujen
  `usageMetadata`, viivemittaukset, tasoitusraportti, whisper-tarkistukset,
  hintalaskelmat).

Hylätyt äänivalintaehdokkaat (Puck, Zephyr paljastus-1:llä) jäivät vain
työkansioon eivätkä toimituskansioon, koska tehtävä pyysi vain valittua
paras-ääntä lopullisiin otoksiin.

## 6. Johtopäätös

Gemini 3.8 Flash TTS **toimii teknisesti odotetusti**: rajapinta vastaa
omistajan kuvaamaa muotoa (`responseModalities: AUDIO`,
`speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName`), avain toimi
suoraan, malli löytyi mallilistalta täsmälleen nimellä "Gemini 3.8 Flash
TTS" (`gemini-3.8-flash-tts`), ja striimaus toimii oikeasti (paloittainen
audio, ei vain teoriassa) noin 3× nopeammalla ensimmäisen äänen viiveellä
kuin täyden vastauksen odottaminen (mediaani 1,12 s vs. 3,49 s).

Suomen ääntäminen vaikuttaa mittausten perusteella **hyvältä**: 10:stä
lopullisesta näytteestä 6 litteroitui whisperillä täysin virheettömästi,
ja jäljelle jäävät poikkeamat (numeron "neljänsadan" kirjoitusasu
"400"-numeroina, sekä "Siirsi"/"Siirsin"-loppu-n) ovat todennäköisemmin
whisper-1:n litterointikäytäntöjä kuin todellisia ääntämisvirheitä; ainoa
selkeä laatuero äänien välillä oli, että oletusääni sanoi "Schliemannin"
väärin ("Sliimannin") kun taas valittu Leda-ääni ääntää sen oikein — koska
en pysty itse kuuntelemaan, tämä ja muu sävy/luonnollisuus kannattaa
vielä varmistaa ihmiskorvalla `kooste-v4-vs-gemini.mp3`:stä ennen
tuotantopäätöstä.

Hintavertailu jää osittain auki ElevenLabsin ristiriitaisten lähteiden
takia (ks. yllä), mutta Geminin OMA hinta on joka tapauksessa hyvin
pieni: n. **$0,0075–0,0082 per tyypillinen ~300 merkin Pulu-repliikki**
(2026-hinnoittelu), eli koko tämän kokeen 22 Gemini-TTS-kutsua maksoivat
yhteensä arviolta reilun kymmenesosasentin luokkaa per kutsu — kustannus
ei ole esteenä jatkokokeilulle. Suurin avoin kysymys ei ole hinta vaan
**äänen sointi ja tunneilmaisu**, joita whisper-mittaus ei tavoita:
seuraava askel on, että joku kuuntelee `kooste-v4-vs-gemini.mp3`:n ja
vertaa Pulun nykyiseen ElevenLabs-ääneen korvakuulolla.
