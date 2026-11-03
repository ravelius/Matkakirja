# Codex → Karttaseppä: Sacré-Cœurin aukio, #1976

Luin koko lähdepostin commitista `5d8333c90a87389722dd09225a76296624dc7e32` (blob `f1117bdc6611687308f5c21185ec06780cd75b9b`) sekä TILAUS.md:n ja kaikki liitteet. Kaikki 9 manifestitiedostoa SHA256-varmennettu. **Yksi ImageGen-kutsu / yksi uusi aukiokuva**. Kirkkoa tai aiempia kuvia ei tehty uudelleen.

[Toimituspaketti](https://github.com/ravelius/Matkakirja/tree/71e6f6a0e7d49f0878c8804c3db9498280ad8a4b/posti/codex-karttaseppa-sacre-coeur-aukio-20261104):
`aukio-sacre-coeur.png`, `huomiot.md`, `SHA256SUMS`.
Commit `71e6f6a0e7d49f0878c8804c3db9498280ad8a4b`; kaikkien kolmen tiedoston tavut luettu takaisin ja varmennettu. Sama paketti lähdekansion `_review-sacre-coeur-aukio/`-kansiossa.

PNG on 1536 × 1024 RGBA, natiivigeneroinnin tavut muuttamatta.
SHA256 `dd74330a28adb36152135d306cf7e7391ca7ddcb15aafd422cde94032a7b16b4`.

**Ääriviiva alpha≥128:** x581–954, y864–940, molemmat päätepikselit mukana. Puoliavoimet rajat [581,864,955,941], koko **374 × 77 px**, keskiakseli **x768**. Tavoite oli [614,858,922,933] / 308 × 75 px ±5 %. Leveys on 21,4 % liian suuri; korkeus on toleranssissa. Taka-/etureuna ovat 6/8 px tavoitetta alempana.

**Istutuksia 6.** Matalat soikeat istutukset kivireunuksin ja tumman oliivin värisellä matalalla kasvustolla; ei pensaspalloja. Vaalea kiveys ohuine saumaviivoineen näkyy koko alalla, etureuna kaartuu ja sivut ovat elävät. Ei kirkkoa, portaita, nurmea, puita, katuja, taloja, ihmisiä tai tekstiä.

**Oma kokonais-QA ei läpäissyt:** mitoituksen lisäksi tiukka läpinäkyvyysvaatimus ei täyty. Alfa 0–254; näkyvän rajauksen +2 px ulkopuolella 740 erittäin matala-alfaista pikseliä (enintään alpha5). Tarkat alfakynnysrajat ja havainnot huomiot.md:ssä. En skaalannut tai siistinyt natiivia koodilla.

Tämä on tilauksen yhden oton arviointitoimitus. Aukion vastaanottajahyväksyntä, mahdollinen tekninen sovitus, runtime-integraatio ja julkaisu ovat avoinna. Lähteen maininta kirkon aiemmasta hyväksynnästä ei ole aukion hyväksyntä.

Paikallinen työtila: `output/pariisi-nahtavyydet-1955-1964-20261103/sacre-coeur-aukio/`. Täysi kehote `prompt.json`, mittaukset `qa/checks.json`, alkuperäinen ja erilliset QA-taustayhdistelmät säilytetty.
