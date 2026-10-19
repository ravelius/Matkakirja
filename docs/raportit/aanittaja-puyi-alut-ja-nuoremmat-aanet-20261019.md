# Puyi: huudon alut (5 ottoa tehty) + ehdokkaat 7–9-vuotiaalle äänelle (Äänittäjä 19.10.2026 klo 11.1x)

## 1. Huudon alkukokeilu (omistajan päätös 10.58, KK: TASAN 5 ottoa ≤ 350 mrk) — TEHTY
Horatius 23 (`qXpMhyvQqiRxWQs4qSSB`), `[shouting] [panicked]`, speed 1,2 natiivisti, `language_code: fi`, ei jälkikäsittelyä, yksi otto per rivi. **282 mrk.** Ääniportti 0 hylättyä, 0 varoitusta. Kansio `/Users/Shared/Claude/proto-3d/_tyo/puyi-koeaanet-20261019/ulos-alut/`:
| tiedosto | teksti | kesto |
|---|---|---|
| 01-ei.mp3 | Ei! Pikkumies kirjoitti kiinaa! | 3,0 s |
| 02-voi-ei.mp3 | Voi ei! Sain tämän syntymäpäivänäni! | 3,6 s |
| 03-oho.mp3 | Oho! Keisarin lasipaja teki tämän! | 3,4 s |
| 04-eika.mp3 | Eikä! Tämä tuli laivalla Englannista! | 3,4 s |
| 05-auts.mp3 | Auts! Me ruokimme näitä joka aamu! | 3,4 s |
Hyväksytyt (KK): `ulos-era1/` 01–10 (Aa!) ja 21–26; 11–20 (Eei!!) pois; ei vielä ämpäriin.

## 2. Nuorempi ääni (7–9 v, ennen äänenmurrosta) — EHDOKKAAT, EI GENEROINTIA
Omistajan 11.02: "nykyinen on hyvä, mutta saisi kuulostaa vielä nuoremmalle lapselle". Ei sävelkorkeus- eikä tempojälkisäätöä. Kirjaston äänet haettu kuvauksista (ei jo kuunneltuja 01–30), kuuntelematta; metadatan sukupuoli on usein "female" vaikka hahmo on poika (Piku "his").

### A. ElevenLabsin äänikirjasto (8)
| # | nimi | voice_id | kieli | kuvaus → miksi nuorempi |
|---|---|---|---|---|
| 1 | Quang Anh – Bright, Brilliant | `atemG3csutMIyK7AbS5c` | en (non-native), mies, ammattitaso | "A young non-native boy telling some of his stories": aito poika; aksentti voi värittää suomea |
| 2 | Donnel – "Kuya Totoy" | `FSuckdZNjSzYsEkK5aKN` | filipino, mies | "The Voice of Children… your classmate… talkative, curious": lasten ohjelmien ääni, vilkas ja kepposellinen (Puyin leikkisyys) |
| 3 | Piku – Expressive Kid Character | `EeQEodFZVtBkjtgK3HBc` | en (intialainen), "his" | "reacting with genuine surprise, excitement, or worry… sounds like an actual kid, never an adult performing one": juuri säikähdys/huuto |
| 4 | Munni – Animated Kid Character | `VOGEEZj2Kly5dP9LrQy8` | hindi, naisen esittämä | "real stumbles and run-on excitement of an actual kid talking": aito lapsi, hengästynyt puheenpurkaus |
| 5 | Gudiya – Innocent Kid Narrator | `e3FEEanj39p8QCSMe8iV` | en (intialainen), nainen | "discovering it rather than performing it": viaton ja uteliaan ihmetteleväinen |
| 6 | Mithi – Moral Kids Stories | `MIl0Flub6Sc9KSkX2A42` | hindi, nainen | "unmistakably childlike… an actual young girl": vakava, järkevä lapsi (hovin kuri) |
| 7 | Kavya – Expressive Kid Narrator | `uyv82ARGSiPieXDxTMOc` | hindi, nainen | "innocent, bubbly… clear pacing for the youngest": selkeä artikulaatio, nuorin sointi |
| 8 | Kavya – Cute & Engaging Character | `bA58y3FqVI6b6gTNh0oT` | hindi, mies | "wide-eyed… genuine childlike wonder, not an adult performing innocence" |

### B. ElevenLabsin omat työkalut (2)
| # | työkalu | miten | riski |
|---|---|---|---|
| 9 | **Voice Remix** (`POST /v1/text-to-voice/{voice_id}/remix`) Horatiukselle | `voice_description`: "much younger, 8-year-old boy, light, bright, before voice change, fast and breathless"; palauttaa 3 esikuuntelua (teksti 100–1000 mrk, voidaan käyttää koelauseemme ~102 mrk); parhaan voi tallentaa (`/v1/text-to-voice`) ja ajaa lauseella. API on olemassa (tarkistettu openapi.json:sta) | Aiemmin ElevenLabs esti lapsiäänet turvasäännöillään (Voice Design: poika 13 ja tyttö 10 → 403 blocked_generation, äänipankki-v1); remix voi tuottaa saman eston. Jos estää, tilalle ei jää mitään → raportoidaan, ei kierretä |
| 10 | **Voice Design** (`/v1/text-to-voice/design`, eleven_ttv_v3) | kuvaus "very young boy, light bright clear voice…" | sama esto todennäköinen; 18-vuotiaan kuvaus (jo käytössä äänipankissa) ei ole 7–9 v |

### C. Merkkiarvio ja ajo
- Kirjaston 8 ääntä × koelause (`[shouting] [panicked] ` + valittu lause ≈ 129 mrk) = **~1 030 mrk**, 8 ottoa. Jos omistaja haluaa kokeilla muulla kuin 102 mrk -lauseella: arvio 8 × (23 + lauseen pituus).
- Remix (9) + Design (10): esikuuntelu 3 kpl kutsua kohti, teksti ≥ 100 mrk → ~300 + ~300 mrk (laskutus tarkentuu ensimmäisessä kutsussa; ElevenLabs ei ilmoita ennen); jos jompikumpi tuottaa kelvollisen, tallennus + koe (129 mrk) + mahdollinen lisäsuoritus.
- **Pyydettävä lupa: enintään 2 000 mrk, TASAN 10 ehdokasta** (8 kirjaston ääntä × 1 otto + remix 1 kutsu + design 1 kutsu, jälkimmäiset kaksi vain jos eivät kaadu turvaestoon; ylijäämä jää käyttämättä). Ei jälkisäätöä.

### Näytelinkit (ElevenLabsin julkiset esikuuntelut, ei generointia)
| # | nimi | esikuuntelu |
|---|---|---|
| 1 | Quang Anh - Bright, Brilliant | https://storage.googleapis.com/eleven-public-prod/database/workspace/19a6194baba6471cac0389856da8679e/voices/atemG3csutMIyK7AbS5c/le6ChpnpE9yFAeerzFYl.mp3 |
| 2 | Donnel - Inviting, Witty, and Friendly | https://storage.googleapis.com/eleven-public-prod/database/workspace/00d3e426a4ec48cda2413d7038347603/voices/FSuckdZNjSzYsEkK5aKN/BLJNBSsZVOOUgXgSxlbu.mp3 |
| 3 | Piku - Expressive Kid Character | https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/EeQEodFZVtBkjtgK3HBc/hMAP6LoA4398mWo70lu0.mp3 |
| 4 | Munni - Animated Kid Character | https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/VOGEEZj2Kly5dP9LrQy8/ZpEWx63YWxhcmNpYOe4t.mp3 |
| 5 | Gudiya - Innocent Kid Narrator | https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/e3FEEanj39p8QCSMe8iV/va8c2AlxrEdmpXVs0gq0.mp3 |
| 6 | Mithi - Moral Kids Stories Character | https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/MIl0Flub6Sc9KSkX2A42/lVgyczia8hhSTuOf4Gh6.mp3 |
| 7 | Kavya - Expressive Kid Narrator | https://storage.googleapis.com/eleven-public-prod/database/workspace/ed9b05e6324c457685490352e9a1ec90/voices/uyv82ARGSiPieXDxTMOc/NjKuGiXix5B4d2Hdb374.mp3 |
| 8 | Kavya - Cute & Engaging Character | https://api.us.elevenlabs.io/v1/voices/bA58y3FqVI6b6gTNh0oT/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJlZDliMDVlNjMyNGM0NTc2ODU0OTAzNTJlOWExZWM5MCIsImZpbGVuYW1lIjoiTnhoSXlDVll4VktMdDFXeE81T0kubXAzIiwidGltZXN0YW1wIjoxNzkyMzg5NjAwMDAwMDAwfQ%3D%3D |
