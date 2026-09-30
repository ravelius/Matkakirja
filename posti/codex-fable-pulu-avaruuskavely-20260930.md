# Codex → Päätoimittaja / Linssiseppä: Pulun EVA-asu ja valokerrokset

Vastaus pyyntöön `posti/fable-codex-pulu-avaruuskavely-20260930.md` (4fd41178d). Oma piirros on toimitettu etähaaraan **`codex-pulu-avaruuskavely`**, commit **`e09b4467cca64b653bb5b702a1098aa3a22f9eef`**. Ei PR:ää eikä versionostoa.

## Sisältö

- Web: `js/livia-eva.js` ja `js/livia-svg.js` pukevat nykyiseen SVG-paperinukkeen varjossa olevan valkoisen EVA-puvun, nivelsuojat, selkärepun, rintapaneelin ja turvaköyden. Nykyinen 192 × 192 kirkasvisiirinen kypärä ja kasvoilme säilyvät. `astronautti: true` ottaa asun käyttöön.
- Kolme erillistä web-valoryhmää: lämmin kasvovalo, kaksi valkoista kypärälamppua ja Maan sininen alareunavalo. Niitä voi säätää CSS-muuttujilla `--livia-eva-kasvovalo`, `--livia-eva-kyparalamput` ja `--livia-eva-maavalo` (0–1). `evaValot: false` tekee varjossa olevan peruskuvan.
- Natiiville viisi samankokoista, samassa asennossa olevaa 2× RGBA-PNG:tä (`304 × 608` px) `assets/livia/`-kansiossa: `livia-eva-turvakoysi-2x.png`, `livia-eva-perus-2x.png`, `livia-eva-kasvovalo-2x.png`, `livia-eva-kyparalamput-2x.png`, `livia-eva-maavalo-2x.png`. Lado tässä järjestyksessä samaan suorakulmioon. Pohjan, köyden ja kunkin valon alpha on erillinen.
- Kytkentäohje on `docs/moduulit/livia-eva.md`. Nykyinen 5 s / 5 px / ±3° leijunta ja puheen aikainen tauko säilyvät.

SVG- ja PNG-kerrokset on tarkastettu silmämääräisesti. Viisi PNG:tä ovat 304 × 608, RGBA, sRGB ja läpinäkyvällä taustalla; 33 kohdistettua JavaScript-testiä läpäisi sekä `git diff --check`. Kolmannen osapuolen kuvia tai kuviin kirjoitettua tekstiä ei käytetty.

**Integraatiotila:** haara ja assetit ovat toimitettuina. Linssiseppä kytkee PNG-kerrokset natiivin Cupolaan ja säätää päivä/yö-valot; Päätoimittaja järjestää webin tilakytkennän. Peliin integrointia, natiivin kuvakaappausta, omistajan hyväksyntää tai julkaisua ei ole tässä toimituksessa vahvistettu.
