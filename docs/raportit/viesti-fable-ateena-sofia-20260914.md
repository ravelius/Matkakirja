# Viesti Fablelle: Ateena ja Sofia uudella putkella 14.9.2026

Opus-työagentti. Haara `claude/bold-ride-vow4ki-ateena-sofia`, pohja `origin/main`
(e344d5e7). Toimeksianto: valvo omistajan käynnistämä uusinta-ajo, integroi
tulokset peliin, mittaa savukkeella. **Ei uusia ElevenLabs-kutsuja, ei
workflow-ajoja.**

## Tilanne yhdellä rivillä

Ajo meni läpi. **Raaka- ja final-tiedoston sha256 on sama molemmilla
repliikeillä** — mallin mp3 päätyi ämpäriin koskemattomana. Mitattu tiedostoista:
uusissa on vain ElevenLabsin `Lavf`-tunniste, vanhoissa oli lisäksi oma
`Lavc60.31` — eli **ylimääräinen koodaussukupolvi on nyt poissa**. Peli osoittaa
uusiin avaimiin, savuke vihreä vastakokeineen, kaikki neljä porttia vihreää.

## 1. Ajo

| kenttä | arvo |
|---|---|
| run | [34882620263](https://github.com/ravelius/Matkakirja/actions/runs/34882620263), run_number 43 |
| conclusion | **success** (18:44:15 → 18:45:34 UTC) |
| lähde-SHA | `fd6db48feef7fb21bf2abf76cdcc90ba62767a6c` (haara `claude/bold-ride-vow4ki-aaniputki`) |
| syötteet | repliikit `ateena-3,sofia-3`, toiminto generoi, pakota kyllä, ääni `piI8Kku0DcvcL6TTSeQt` (Flicker), malli `eleven_v3` |
| erätunnus | `pulu-c4a91d1229f96eaac265` |
| kuitti | `https://media.matkakirja.app/aanet/pulu/kuitit/pulu-c4a91d1229f96eaac265.completed.json` (HTTP 200) |

Lokista luetut vahvistukset:

- `voice_settings: stability 0.5 — similarity_boost, style ja use_speaker_boost jätetään pois`
- `jälkikäsittely: EI MITÄÄN — mallin mp3 sellaisenaan, sama sha256 raaka- ja final-avaimessa`
- `raaka talteen: …/aanet/pulu/raaka/pulu-c4a91d1229f96eaac265/raaka-livia-{ateena,sofia}-3.mp3`
- `ei käsittelyä (omistaja 14.9.2026): mallin mp3 sellaisenaan` kummallekin
- staging- ja versionoidut avaimet HTTP 200, työhakemisto siisti (repoon ei jäänyt mediaa)

## 2. Kuitti ja sha256-vertailu

Kuitti: 2 repliikkiä, molemmilla `generationStatus: generated`,
`postprocess: { kind: "none" }`, `settings` = `{ stability: 0.5, similarityBoost:
null, style: null, useSpeakerBoost: null, speed: null }`,
`promotionStatus: pending-code-deploy`.

| | ateena-3 | sofia-3 |
|---|---|---|
| raaka-avain | `aanet/pulu/raaka/pulu-c4a91d1229f96eaac265/raaka-livia-ateena-3.mp3` | `…/raaka-livia-sofia-3.mp3` |
| final-avain | `aanet/pulu/versiot/fd6db48feef7/pulu-c4a91d1229f96eaac265/livia-ateena-3.mp3` | `…/livia-sofia-3.mp3` |
| kuitin raaka sha256 | `fde8500a…eae2cc89` | `c6d42162…dfb2b190` |
| kuitin final sha256 | `fde8500a…eae2cc89` | `c6d42162…dfb2b190` |
| **ladatun raakatiedoston sha256** | `fde8500a…eae2cc89` | `c6d42162…dfb2b190` |
| **ladatun final-tiedoston sha256** | `fde8500a…eae2cc89` | `c6d42162…dfb2b190` |
| tavut | 286 346 | 198 156 |
| kesto | 17,868 s | 12,356 s |
| HEAD raaka / final | 200 / 200 | 200 / 200 |

**Neljä summaa neljästä täsmää kaupunkia kohden.** Raaka ja final ovat sama
tavujono, ja se on se tavujono, jonka peli hakee.

### Koodaussukupolvi: mitattu tiedostojen tunnisteista

Verrattiin uutta ja vanhaa Ateena-tiedostoa tavutasolla (ensimmäiset 4 kt,
ID3-/Xing-otsake):

| | tunnisteet | tulkinta |
|---|---|---|
| vanha `…/6e3a07e879bb/pulu-b3a8d61baa0c4dd24123/livia-ateena-3.mp3` | `Lavf60.16.100` **ja `Lavc60.31`** | ElevenLabsin mux + **oma libmp3lame-uudelleenkoodaus** |
| uusi `…/fd6db48feef7/pulu-c4a91d1229f96eaac265/livia-ateena-3.mp3` | `Lavf60.16.101` (ei Lavc) | **yksi koodaussukupolvi** |

Sofia sama: uudessa vain `Lavf60.16.101`. Juuri tämä oli se mitattu syy, jonka
omistaja kuuli "pienenä digitaalisena häiriönä" — se on nyt pois.

## 3. Muutetut kentät (pelin data)

| tiedosto | kenttä | ateena-3 | sofia-3 |
|---|---|---|---|
| `js/liviapuhe.js` `LIVIAN_VERSIOIDUT_AANET` | versionoitu polku | `…/6e3a07e879bb/pulu-b3a8d61baa0c4dd24123/…` → `…/fd6db48feef7/pulu-c4a91d1229f96eaac265/…` | sama |
| `js/liviapuhe.js` `LIVIAN_KESTOT` | kuitin kesto | 18,416 → **17,868** | 12,016 → **12,356** |
| `js/liviapuhe.js` `LIVIAN_AANITETYT` | näkyvän tekstin tiiviste | `572e0e85` **ennallaan** | `83dd2f15` **ennallaan** |
| `js/livia-pilotti-cuet.js` | `tekstiSha256` | **ennallaan**, täsmää kuittiin | **ennallaan**, täsmää kuittiin |

Teksti ei muuttunut, ja se on **tarkistettu kuittia vasten**, ei oletettu:
kuitin `visibleTextSha256` on ateenalla `c33e5126…c791a566` ja sofialla
`a2d6d6ff…1f067f14`, ja täsmälleen nämä lukevat `js/livia-pilotti-cuet.js`:n
cue-sopimuksissa. Ajon kuiva vaihe sanoi molemmista `tiiviste … — AJAN TASALLA`.

**Muut 38 kaupunkia ovat koskemattomia** — savuke tarkistaa tämän koneellisesti
(ks. testi alla: uuteen erään saa osoittaa tasan kaksi avainta).

### Kohdistus (eleet): sama fallback kuin v1879:ssä

Kohdistusta ei ole ajettu näillekään. `.eleet.json` **puuttuu uuden avaimen
vierestä — mitattu selaimesta: HTTP 404 molemmille**, joten lataaja ei saa mitään
hylättävääkään ja eleet jäävät nulliksi. Vanha kohdistus asuu vanhan avaimen
vieressä, johon data ei enää osoita. Mitattu savukkeessa: `soitaLivianKaupunkiAani`
palauttaa soittimen eikä mikään kaadu (0 JS-poikkeusta). Sama linjaus kuin
14.9. integraatiossa: hiljaiset eleet ovat parempi kuin väärään sanaan osuvat.

### Testimuutos (portti lisätty, ei poistettu)

`tests/livia-aani.test.mjs`: uusi testi *"ateena-3 ja sofia-3 osoittavat uuden
putken erään (ei uudelleenkoodausta)"*. Se lukitsee molempien final-avaimen,
kuitin kestot (17,868 / 12,356), tekstitiivisteet (`572e0e85` / `83dd2f15`) ja
vaatii, että uuteen erään osoittaa **tasan nämä kaksi avainta**. Portti kaatuu,
jos data putoaa takaisin vanhaan erään tai jos muu kaupunki liukuu mukaan.
Vanhat 45 avaimen vartiot (muoto, osoite, tiiviste, kesto) ovat ennallaan.

## 4. Savuke (Playwright, Chromium) — VIHREÄ, vastakoe PUNAINEN

Peli ajettiin oikeassa selaimessa; ämpäripyynnöt välitettiin Nodesta oikeina
tavuina, eli mitattiin aitoa mp3:a.

| vartio | ateena | sofia |
|---|---|---|
| `livianAaniOsoite` = uusi versionoitu avain | OK | OK |
| HTTP 200, tavut ja sha256 = kuitti | OK (286 346 / `fde8500a…`) | OK (198 156 / `c6d42162…`) |
| `Audio.duration` > 0 ja ±0,1 s kuitista | **17,84 s** (ero 0,028 s) | **12,32 s** (ero 0,036 s) |
| soi oikeasti (`currentTime` > 0 play():n jälkeen) | OK | OK |
| pelin oma kutsupolku `soitaLivianKaupunkiAani` antaa soittimen uudesta avaimesta | OK | OK |
| `.eleet.json` uuden vieressä | HTTP 404 → eleet null | HTTP 404 → eleet null |
| JS-poikkeukset | 0 | 0 |

Konsolin ainoat virheet ovat tahalliset: sähke-workeriin menevä pyyntö katkaistaan
savukkeessa, ja loput ovat savukkeen omat `.eleet.json`-luotaukset (404, odotettu).
Yhtään äänen latausvirhettä ei tullut.

**Vastakoe:** vanha avain `…/6e3a07e879bb/pulu-b3a8d61baa0c4dd24123/…` takaisin →
savuke **PUNAINEN**, kuten pitääkin: tavut 295 123 (≠ 286 346), sha `4cab3eed…`
(≠ kuitti), kesto 18,389 s (≠ 17,868 s). Sofialla sama: 192 723 tavua,
`d25f76ee…`, 11,973 s. Vanha ja uusi ovat siis todistettavasti eri äänite.

Savuke on kertaluontoinen mittaus eikä repossa (ei uutta savukerekisterin riviä),
kuten 14.9. integraatiossakin.

## 5. Portit

```
npm test                                → # pass 3350  # fail 0  (# skipped 13)
node tools/tarkista-kaksoisavaimet.mjs  → ei kaksoisavaimia
node tools/tarkista-niputus.mjs         → 387 moduulia, 4221 julistusta, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       → 1651 ui-viittausta, 405 metodia, 534 kenttää
```

Huomio kuormasta: koneella ajoi samaan aikaan kaksi muuta täyttä testiajoa
(toisten sessioiden), ja ensimmäisessä ajossa yksi ajoitusherkkä testi kaatui.
Rauhoittuneella koneella ajettu uusinta on **3350 pass / 0 fail**, eikä yksikään
kaatunut testi liittynyt tähän muutokseen.

## 6. Mitä EI tehty

Ei ElevenLabs-kutsuja, ei workflow-ajoja, ei muutoksia `tools/generoi-*`- tai
työnkulkutiedostoihin (ne ovat toisen agentin haaralla), ei Raamattuun, ei
versionostoa eikä muutoslokiriviä, ei mediaa repoon, ei avaimia lokiin.

## 7. Omistajalle

Ateena ja Sofia soivat nyt pelissä mallin omana mp3:na, ilman yhtäkään
uudelleenkoodausta ja ElevenLabsin omilla oletusasetuksilla stabilityä lukuun
ottamatta. **Kuuntelu on yhä omistajan tehtävä** — tämä mittaus sulkee pois vain
teknisen vian ja todistaa, että tiedosto on täsmälleen se, jonka malli tuotti.
Alkuperäiset raakatiedostot ovat pysyvästi tallessa erän raaka-avaimessa.
