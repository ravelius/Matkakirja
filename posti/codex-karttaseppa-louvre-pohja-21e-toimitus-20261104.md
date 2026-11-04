# Codex / KUVAT → Karttaseppä ja KK: Louvre21e, yksi otto toimitettu — QA FAIL

Tilaus #2080, lähdecommit `48ba13460934958586cf7f9f12f7050dfc4ba1fc`, blob `fe88ff91d66d5b63f1b8a5ffc0a7bd8c63bd8cc3`. Tehty Sainte-Chapelle22b:n varmennetun toimituksen jälkeen.

Yksi sallittu ImageGen-kutsu, yksi kokonaan uusi `alue-louvre.png`, 1536 × 1024 RGB. Natiivikuvaa ei jälkimuokattu, skaalattu tai koostettu. Kaikki seitsemän lähdetiedostoa tarkistettu SHA256:lla ennen ja jälkeen; työohje, alue.json ja kaikki viisi kuvaliitettä luettu/katsottu.

**Kuva EI ole käyttövalmis.** Louvre ja pyramidit poistuivat ja keskelle syntyi kiveystä, mutta:
1. Mallin koko860 ×360m jalanjälki ei tyhjentynyt. Pohjois- ja itäreunaan jäi talokuvioita, ja Rue de Rivoli on osin jalanjäljen sisällä. `QA-jalanjalki-maskiraja.png` näyttää sinisen jalanjäljen ja punaisen muokkausrajan. Karkea taloväriheuristiikka:10,4368% jalanjäljestä; visuaalinen havainto vahvistaa talot ja kadun.
2. Maskin ulkopuoli ei pysynyt pikselilleen samana:99,3703% suojatuista pikseleistä muuttui vähintään1RGB-tason,8,9883% yli12tasoa ainakin yhdessä kanavassa. Myös ulkoreunat ja suojattu kaakkoisalue muuttuivat. Keskimääräinen absoluuttinen RGB-ero4,08/4,48/4,84.
3. Seinen ja siltojen yleinen sijainti säilyi silmämääräisesti, mutta tarkkaa rantaviivaa, katujen saumattomuutta tai15–25m reunamarginaalia ei ole hyväksytty.

Ylhäältä piirretty tasainen tyyli/paletti säilyi. **Oma QA FAIL** jalanjäljen ja pikselitarkan säilymisen osalta. Toimitus on epäonnistuneen yhden oton arviointipaketti, ei hyväksytty pelipohja. **Seuraavasta otosta päättää KK tilauksen mukaisesti; uusintaa ei tehty.**

- Paikallinen paketti: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-louvre-20261104/_review-pohja-21e/`
- [Postilaatikkopaketti](https://github.com/ravelius/Matkakirja/tree/00cc9e00b229563816f45d78d240ed6af5c38d10/posti/codex-karttaseppa-louvre-pohja-21e-20261104), commit `00cc9e00b229563816f45d78d240ed6af5c38d10`.
- Kuvan SHA256 `538f0de707bf8a6d72023c25c07fe1000d1c0c3f4f09eccb93efd8da9c504901`.
- 8 tiedostoa, 4480459 tavua; kaikki gitistä takaisin luetut tavut varmennettu SHA256:lla. Mukana SHA256SUMS, QA, huomiot ja täysi prompti.

Ei Tripo-toimitusta, runtime-kytkentää eikä julkaisua.22b-korjaus ja sen erillinen10–20px ristikorkeuden poikkeama on edellisessä toimituspostissa.
