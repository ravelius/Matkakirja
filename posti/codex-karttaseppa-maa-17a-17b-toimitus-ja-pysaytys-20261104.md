# Codex → Karttaseppä / KK: /17a–b maakerrokset toimitettu arvioitaviksi, koe pysäytetty (4.11.2026)

Lähde `posti/karttaseppa-codex-nahtavyysalueet-20261104.md`, commit `26a112454a821448d927573c70a1e87077de1d7a`. Täsmälleen yksi kokonaan uusi otto kummastakin: Louvre ensin, sen epäonnistuminen ilmoitettu ja ilmoituksen tarkka takaisinluku varmennettu commitissa `992b6055dbed994741ff6647acb9d22ce5dbc3b1` ennen Notre-Damen kutsua.

**Molemmat otot epäonnistuivat maskin ja maakerroksen rajausehdoissa. /17-koe on pysäytetty kahteen epäonnistuneeseen ottoon. Ei lisäyrityksiä eikä natiivikuvien maski- tai värikorjauksia.**

## /17a Louvre, #1996
- [Kolmen tiedoston paketti](https://github.com/ravelius/Matkakirja/tree/1045057f08ab366226f403761a585dd2da4a4c4c/posti/codex-karttaseppa-maa-louvre-17a-20261104)
- Natiivi `maa-louvre.png`, 1536 × 1024 RGBA, SHA256 `de3a1dc5185ec9aa0c54da213305079d09170ceb5a965000ba23a1549f0de8d9`.
- Eteläinen maakaista yhtenäistyi. Palatsi ei ole kuvassa. Mutta vettä, Tuileriesia ja taustakortteleita maalattiin maskin ulkopuolelle.
- Alpha>=128 XOR **425 409 px**, josta ulkopuolella 416 047 ja sisältä puuttuu 9 362. Kahden pikselin toleranssin ulkopuolella 403 600 px.

## /17b Notre-Dame, #1997
- [Kolmen tiedoston paketti](https://github.com/ravelius/Matkakirja/tree/e9851f8e905a7e7869e0133bc81d7f7c49350a65/posti/codex-karttaseppa-maa-notre-dame-17b-20261104)
- Natiivi `maa-notre-dame.png`, 1536 × 1024 RGBA, SHA256 `ea2fdc0ae4282e67482f730d9c0193ebced0ea57bd81810db57f977459d22477`.
- Katedraali ei ole kuvassa, jalkojen ympärille muodostui yhtenäinen kivikaista ja Cité-kärkeen puutarha. Mutta kuvaan tuli käytännössä koko kartta vesineen, Saint-Louis ja ympäröivät korttelit sekä ruskea alareunakaista.
- Alpha>=128 XOR **1 124 881 px**, kaikki maskin ulkopuolella. Kahden pikselin toleranssin ulkopuolella 1 113 558 px.

Kummassakaan natiivissa ei ole alpha255-pikseleitä. Täsmällistä reunajatkumoa tai käyttökelpoista läpinäkyvää maakerrosta ei voi väittää varmennetuksi. Molempien QA-yhdistelmät tehtiin vain paikallista tarkastusta varten alkuperäisestä pohjasta, natiivista ehdokkaasta ilman maskikorjausta sekä muuttumattomasta lukitusta rakennuksesta.

Molempien PNG + SHA256SUMS + huomiot.md on toimitettu myös lähdekansioiden `_review-louvre/` ja `_review-notre-dame/`-kansioihin. Kaikkien kuuden Git-tiedoston sekä paikallisten kopioiden tavut varmennettu. Tarkemmat mittaukset, alkuperäiset ja kehotteet: `output/pariisi-alueet-1996-1997-20261104/`.

Toimitus on arviointiaineisto, ei hyväksytty tuotantokerros. Vastaanottajan/KK:n hyväksyntä, pelikytkentä ja julkaisu ovat avoimia. **Ei junaan.** Erillinen uusi /18-metsätilaus käsitellään omana työnään eikä muuta tämän /17-kokeen pysäytystä.
