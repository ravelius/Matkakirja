# Viesti Fablelle: Livian nauru ja kuiskaus peliin 14.9.2026

Opus-työagentti. Haara `claude/bold-ride-vow4ki-nauru`, pohja `origin/main`
(31f1524f, v1881). Toimeksianto: valvo omistajan käynnistämä Codexin
ilmaisukokeen ajo, integroi tulokset peliin, mittaa savukkeella.
**Ei uusia ElevenLabs-kutsuja, ei workflow-ajoja, ei uusintaa.**

## Tilanne yhdellä rivillä

Ajo meni läpi. Sofia ja Venetsia soivat pelissä nyt Codexin tagimuutoksella
generoidusta erästä: **raaka- ja final-tiedoston sha256 on sama molemmilla**,
192 kbps, ei uudelleenkoodausta. Kuuntelulinkit ovat postilaatikossa, ja
naurun luontevuuden arvioi omistaja korvalla — tämä mittaus todistaa vain,
että tiedosto on täsmälleen mallin tuottama ja että peli osoittaa siihen.

## 1. Ajo

| kenttä | arvo |
|---|---|
| run | [34886941449](https://github.com/ravelius/Matkakirja/actions/runs/34886941449), run_number 44 |
| conclusion | **success** (19:26:55 → 19:28:13 UTC) |
| lähde-SHA | `de77a4cf678b900d188e265baf408435156bc371` (haara `codex/livia-nauru-kuiskaus-20260914`) |
| syötteet | repliikit `sofia-3,venetsia-3`, toiminto generoi, **pakota ei**, ääni `piI8Kku0DcvcL6TTSeQt` (Flicker), malli `eleven_v3`, vakaus natural |
| erätunnus | `pulu-bab26ef72403343445ed` |
| kuitti | `https://media.matkakirja.app/aanet/pulu/kuitit/pulu-bab26ef72403343445ed.completed.json` (HTTP 200) |

Lokista luetut vahvistukset:

- `ulostulomuoto: mp3_44100_192` — **192 kbps**, kuitissa `outputFormat: "mp3_44100_192"`
- `jälkikäsittely: EI MITÄÄN — mallin mp3 sellaisenaan, sama sha256 raaka- ja final-avaimessa`
- `raakavienti on pakollinen: --ei-vientia kaataa maksullisen ajon`
- `raaka talteen: …/aanet/pulu/raaka/pulu-bab26ef72403343445ed/raaka-livia-{sofia,venetsia}-3.mp3`
- `ei käsittelyä (omistaja 14.9.2026): mallin mp3 sellaisenaan` kummallekin
- kuivan ajon "mallille"-rivit näyttävät täsmälleen kokeen tagit; molemmista `tiiviste … — AJAN TASALLA`
- staging- ja versionoidut avaimet HTTP 200, `Työhakemisto on siisti.` (repoon ei jäänyt mediaa)

## 2. Kuitti ja sha256-vertailu

Kuitti: 2 repliikkiä, molemmilla `generationStatus: generated`,
`postprocess: { kind: "none" }`, `settings` = `{ stability: 0.5,
similarityBoost: null, style: null, useSpeakerBoost: null, speed: null }`,
`promotionStatus: pending-code-deploy`.

| | sofia-3 | venetsia-3 |
|---|---|---|
| raaka-avain | `aanet/pulu/raaka/pulu-bab26ef72403343445ed/raaka-livia-sofia-3.mp3` | `…/raaka-livia-venetsia-3.mp3` |
| final-avain | `aanet/pulu/versiot/de77a4cf678b/pulu-bab26ef72403343445ed/livia-sofia-3.mp3` | `…/livia-venetsia-3.mp3` |
| kuitin raaka sha256 | `c2b80ab7…9df64920` | `1c881b5b…463fce0c` |
| kuitin final sha256 | `c2b80ab7…9df64920` | `1c881b5b…463fce0c` |
| **ladatun raakatiedoston sha256** | `c2b80ab7…9df64920` | `1c881b5b…463fce0c` |
| **ladatun final-tiedoston sha256** | `c2b80ab7…9df64920` | `1c881b5b…463fce0c` |
| tavut | 329 813 | 468 367 |
| kesto | 13,714 s (ennen 12,356) | 19,487 s (ennen 19,043) |
| HEAD raaka / final | 200 / 200 | 200 / 200 |

**Neljä summaa neljästä täsmää kaupunkia kohden.** Raaka ja final ovat sama
tavujono, ja se on se tavujono, jonka peli hakee.

### Koodaussukupolvi: mitattu tiedostojen tunnisteista

Molempien uuden tiedoston ID3-/Xing-otsakkeessa on vain `Lavf60.16.101`
(ElevenLabsin oma mux). **`Lavc`-tunnistetta ei ole** — ei siis omaa
libmp3lame-uudelleenkoodausta, sama tulos kuin v1881:n Ateena/Sofia-erässä.

## 3. Muutetut kentät (pelin data)

| tiedosto | kenttä | sofia-3 | venetsia-3 |
|---|---|---|---|
| `js/liviapuhe.js` `LIVIAN_VERSIOIDUT_AANET` | versionoitu polku | `…/fd6db48feef7/pulu-c4a91d1229f96eaac265/…` → `…/de77a4cf678b/pulu-bab26ef72403343445ed/…` | `…/439bf050af65/pulu-85a34cad2355457c7e9b/…` → sama uusi erä |
| `js/liviapuhe.js` `LIVIAN_KESTOT` | kuitin kesto | 12,356 → **13,714** | 19,043 → **19,487** |
| `js/liviapuhe.js` `LIVIAN_AANITETYT` | näkyvän tekstin tiiviste | `83dd2f15` **ennallaan** | `eb6f4836` **ennallaan** |
| `js/livia-pilotti-cuet.js` | `tekstiSha256` (näkyvä teksti) | **ennallaan**, täsmää kuittiin | **ennallaan**, täsmää kuittiin |
| luentamanifesti r2 | `ttsText` ja `ttsTextSha256` | `[softly]` → `[laughs]` | `[warmly]` → `[whispers]`, `[mischievously]` → `[laughs]` |

Näkyvä teksti ei muuttunut, ja se on **tarkistettu kuittia vasten**, ei
oletettu: kuitin `visibleTextSha256` on sofialla `a2d6d6ff…1f067f14` ja
venetsialla `2cbd024d…10cf0601`, ja täsmälleen nämä lukevat
`js/livia-pilotti-cuet.js`:n cue-sopimuksissa. Siksi LIVIAN_AANITETYT- ja
cue-tiivisteet pysyvät — vain TTS-tekstin SHA muuttui, ja sen omistaa
manifesti.

Manifestimuutos on otettu Codexin haarasta ja **verrattu koneellisesti**:
oman haarani manifestidiff on rivi riviltä identtinen
`git diff 78555d0b origin/codex/livia-nauru-kuiskaus-20260914` -diffin kanssa —
tasan ne neljä kenttää, ei muuta.

**Muut 43 kaupunkia ovat koskemattomia** — uusi testi tarkistaa tämän
koneellisesti (uuteen erään saa osoittaa tasan kaksi avainta).

### Kohdistus (eleet): sama fallback kuin v1881:ssä

Kohdistusta ei ole ajettu, ja ajolupa kieltää vanhan cue-datan käytön uuden
mp3:n kanssa. `.eleet.json` **puuttuu uuden avaimen vierestä — mitattu
ämpäristä: HTTP 404 molemmille**, joten lataaja ei saa mitään hylättävääkään
ja eleet jäävät nulliksi. Vanha kohdistus asuu vanhan avaimen vieressä, johon
data ei enää osoita. Savukkeessa mitattu: `soitaLivianKaupunkiAani` palauttaa
soittimen uudesta avaimesta eikä mikään kaadu (0 JS-poikkeusta).

### Testimuutos (portti lisätty, ei poistettu)

`tests/livia-aani.test.mjs`:

- vanha portti "ateena-3 ja sofia-3 osoittavat uuden putken erään" kaventui
  Ateenaan (sofia-3 siirtyi eteenpäin), ja sen "tasan nämä avaimet" -vartio
  on tallella.
- uusi portti **"sofia-3 ja venetsia-3 osoittavat nauru/kuiskaus-erään"**
  lukitsee molempien final-avaimen, kuitin kestot (13,714 / 19,487),
  tekstitiivisteet (`83dd2f15` / `eb6f4836`) ja vaatii, että uuteen erään
  osoittaa **tasan nämä kaksi avainta**.

## 4. Savuke (Playwright, Chromium) — VIHREÄ, vastakoe PUNAINEN

Peli ajettiin oikeassa selaimessa; ämpäripyynnöt tarjoiltiin ämpäristä
ladatuista oikeista tavuista, eli mitattiin aitoa mp3:a.

| vartio | sofia | venetsia |
|---|---|---|
| `livianAaniOsoite` = uusi versionoitu avain | OK | OK |
| HTTP 200, tavut ja sha256 = kuitti | OK (329 813 / `c2b80ab7…`) | OK (468 367 / `1c881b5b…`) |
| `Audio.duration` ±0,1 s kuitista | **13,680 s** (ero 0,034 s) | **19,440 s** (ero 0,047 s) |
| soi oikeasti (`currentTime` > 0 play():n jälkeen) | OK | OK |
| pelin oma kutsupolku `soitaLivianKaupunkiAani` antaa soittimen uudesta avaimesta | OK | OK |
| `.eleet.json` uuden vieressä | HTTP 404 → eleet null | HTTP 404 → eleet null |
| JS-poikkeukset | 0 | 0 |

**Vastakoe:** vanhat avaimet takaisin dataan → savuke **PUNAINEN**, kuten
pitääkin. Sofia: 198 156 tavua (≠ 329 813), sha `c6d42162…` (≠ kuitti), kesto
12,320 s. Venetsia: 305 154 tavua, `e98e2dee…`, 18,998 s. Vanha ja uusi ovat
siis todistettavasti eri äänite.

Savuke on kertaluontoinen mittaus eikä repossa (ei uutta savukerekisterin
riviä), kuten v1881:n integraatiossakin.

## 5. Portit

```
npm test                                → # pass 3351  # fail 2  (# skipped 13)
node tools/tarkista-kaksoisavaimet.mjs  → ei kaksoisavaimia
node tools/tarkista-niputus.mjs         → 387 moduulia, 4221 julistusta, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       → 1651 ui-viittausta, 405 metodia, 534 kenttää
```

**Kuormavartiot kirjattu:** kaksi kaatunutta testiä ovat `tests/pollo.test.mjs`:n
ajoitusmittoja ("indeksi rakentuu ja on kokoluokaltaan järkevä", "haku on nopea
myös koko aineistolla"). Kone ajoi samaan aikaan muiden sessioiden töitä,
kuormakeskiarvo **40,7**. Mitattu eikä oletettu: sama `tests/pollo.test.mjs`
kaatuu myös **puhtaassa mainissa ilman minun muutostani** (1/2 samalla hetkellä,
2/2 hetkeä aiemmin) — eli kyse on koneen kuormasta, ei tästä muutoksesta.
`tests/livia-aani.test.mjs` on 33/33 vihreä, eikä muutos koske pollon koodia.

## 6. Mitä EI tehty

Ei ElevenLabs-kutsuja, ei workflow-ajoja, ei uusintaa, ei muutoksia
`tools/generoi-*`- tai työnkulkutiedostoihin, ei muiden repliikkien
muutoksia, ei Raamattuun, ei versionostoa eikä muutoslokiriviä, ei mediaa
repoon, ei avaimia lokiin. Vanhat äänet jäivät ämpäriin koskematta.

## 7. Omistajalle

Kuuntelulinkit ovat postilaatikossa (`posti/fable-vanha.md`, 14.9. klo 19:29
UTC). Sofian viimeinen lause on nyt naurahdus ja Venetsian "Yhden tutun
takia" kuiskaus; sanat ovat samat kuin ruudulla. **Kuuntelu on omistajan
tehtävä** — tämä mittaus sulkee pois vain teknisen vian.
