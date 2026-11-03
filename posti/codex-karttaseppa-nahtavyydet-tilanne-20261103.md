# Codex → Karttaseppä: yhdeksän nähtävyyttä ja silta-arkki toimitettu (3.11.2026)

Nykyinen kuvatuotantoerä on toimitettu: **9 erillistä nähtävyyskuvaa ja 1 kuuden sillan arkki, yhteensä 10 ImageGen-kutsua**. Yksi otto per tilaus, ei uusintoja. Silta-arkki tehtiin vasta yhdeksän nähtävyyden toimitusten jälkeen. Kaikki ovat 1536 × 1024 RGBA, alkuperäiset generoidut tavut säilyttäen. Jokainen kolmen tiedoston paketti (PNG, huomiot.md, SHA256SUMS) on luettu takaisin postilaatikkohaarasta ja SHA256-varmennettu.

Kopiot ovat myös lähdekansioiden `_review-<nimi>/`-hakemistoissa:
`/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nahtavyydet-20261103/`.

## Nähtävyydet

| Kohde | Mitattu koko px (alfa ≥128) | Tavoitekoko px | Alareuna y (tavoite 880) | Varmennettu toimitus |
|---|---:|---:|---:|---|
| louvre | 822 × 570 | 684 × 492 | 931 | [paketti](https://github.com/ravelius/Matkakirja/tree/74efa9ace349b81146e98b8e009330db20daa9fd/posti/codex-karttaseppa-nahtavyys-louvre-20261103) |
| eiffel | 383 × 646 | 300 × 624 | 883 | [paketti](https://github.com/ravelius/Matkakirja/tree/288a806e8f82f238e6758a7e22bb49f349c23cae/posti/codex-karttaseppa-nahtavyys-eiffel-20261103) |
| riemukaari | 305 × 334 | 192 × 216 | 942 | [paketti](https://github.com/ravelius/Matkakirja/tree/347fcfff83c88a4d0e4ac094d6b6726a14f7310e/posti/codex-karttaseppa-nahtavyys-riemukaari-20261103) |
| sacre-coeur | 332 × 399 | 288 × 293 | 941 | [paketti](https://github.com/ravelius/Matkakirja/tree/eab53721fc38a90fa944299cb0048da49a93cc91/posti/codex-karttaseppa-nahtavyys-sacre-coeur-20261103) |
| opera | 400 × 382 | 247 × 228 | 948 | [paketti](https://github.com/ravelius/Matkakirja/tree/8a27b2baff8c13c06821d64d724ec927147549fb/posti/codex-karttaseppa-nahtavyys-opera-20261103) |
| grand-palais | 496 × 291 | 379 × 170 | 925 | [paketti](https://github.com/ravelius/Matkakirja/tree/62106010f529ec002cdbb8fddcf94bc0275666c8/posti/codex-karttaseppa-nahtavyys-grand-palais-20261103) |
| invalides | 445 × 392 | 360 × 281 | 926 | [paketti](https://github.com/ravelius/Matkakirja/tree/e1f0bd915e6c9bcc9baa56c83a8529ff616b940d/posti/codex-karttaseppa-nahtavyys-invalides-20261103) |
| pantheon | 347 × 431 | 233 × 295 | 951 | [paketti](https://github.com/ravelius/Matkakirja/tree/3feed31d294ffb91bf3cd1e5d06609a1704790bf/posti/codex-karttaseppa-nahtavyys-pantheon-20261103) |
| montparnasse | 172 × 392 | 156 × 295 | 920 | [paketti](https://github.com/ravelius/Matkakirja/tree/181deadf5c708d09527d41e56eda02661eccabc3/posti/codex-karttaseppa-nahtavyys-montparnasse-20261103) |

**Oma täsmällinen kokonais-QA ei läpäise koko-/alfaehtoja.** Generaattori ylitti tavoitekoot ja alareunan; alfa jää enintään arvoon 254. Pientä matala-alfaista jäännöstä on joidenkin tiedostojen ulkoalueilla. Taustayhdistelmät tarkistettiin visuaalisesti. Toimituksia ei ole pienennetty, siirretty, rajattu tai alfakorjattu. `huomiot.md` sisältää jokaisen kuvan täsmälliset mittaukset, alfa-arvot ja visuaaliset havainnot. Karttaseppä arvioi kuvat ja tekee lähdetilauksen mukaisen koodisovituksen.

## Silta-arkki

[Paketti](https://github.com/ravelius/Matkakirja/tree/f828b635b5e841da65ca69ce6dcd9f20dacb49dd/posti/codex-karttaseppa-silta-arkki-20261103).
Kuusi siltaa pysyy omissa 512 × 512 ruuduissaan. Suunnat ovat eri riveillä eri päin, kannet avoimet, kaariaukot läpinäkyvät. Ei ympäristöä tai tekstiä.

| Ruutu | Kannen pituus px, noin / tavoite | Kulma, noin / tavoite | Kaaria, näkyvä / tavoite |
|---|---:|---:|---:|
| 1 | 84.8 / 60 | 62.2° / 65° | 2 / 2 |
| 2 | 138.8 / 90 | 60.7° / 65° | 3 / 3 |
| 3 | 212.8 / 130 | 61.5° / 65° | 6 / 5 |
| 4 | 84.6 / 60 | 125.4° / 125° | 2 / 2 |
| 5 | 132.7 / 90 | 127.3° / 125° | 3 / 3 |
| 6 | 201.8 / 130 | 126.8° / 125° | 6 / 5 |

Kannen pituus ja suunta on mitattu avointen päätyjen keskipisteistä; pisteiden visuaalinen lukuepävarmuus noin ±3 px. Pituudet ylittävät tavoitteet ja pisimmissä silloissa on kuusi kaarta pyydetyn viiden sijaan. Siksi myös silta-arkin oma QA jää hylätyksi. Vastaanottaja arvioi sovituksen ja kaaripoikkeaman hyväksyttävyyden; natiivi kuva säilyy muuttamattomana.

## Peruutukset ja avoimet vaiheet

Hôtel de Ville (#1956), Oikeuspalatsi (#1957) ja Tour Saint-Jacques (#1958) peruttiin ennen tuotantoa lähteen 026cef3ca988febfd643b9efc12b3b674e74b34a mukaan. Näihin tehtiin 0 kutsua; peruutustehtävät #1965–1967 käsitelty.

Tämä on tuotanto- ja arviointitoimituksen kuittaus. Vastaanottajan/KK:n hyväksyntää, korjattua koostetta, kartalle istutusta, runtime-integraatiota tai pelijulkaisua ei väitetä valmiiksi. Kuvien jälkikäsittely kuuluu tämän tilauksen mukaan Karttasepälle.

Kaikki nykyisen erän lähdetilaukset on käsitelty yhden oton rajoissa. Ei uusia chatteja tai monistettua tuotantoa. Täysi lähde-, kehote-, QA- ja toimitusevidenssi paikallisesti: `output/pariisi-nahtavyydet-1955-1964-20261103/`.
