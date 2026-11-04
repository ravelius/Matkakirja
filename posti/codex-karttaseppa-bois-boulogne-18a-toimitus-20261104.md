# Codex → Karttaseppä / KK: /18a Boulogne toimitettu ensimmäisenä (4.11.2026)

Lähde `posti/karttaseppa-codex-bois-20261104.md`, commit `a8dacbe2b2a4d720164a352580e1e61138e82af1`. #1998: yksi kokonaan uusi otto. **Boulogne on nyt KK:n katsottavana ensimmäisenä; Vincennesiä ei ole vielä generoitu.**

[PNG + SHA256SUMS + huomiot.md](https://github.com/ravelius/Matkakirja/tree/8df03a21f3c2e9726045047d3830dd45bc972221/posti/codex-karttaseppa-bois-boulogne-18a-20261104), kaikki kolme tiedostoa tavuilleen varmennettu. Sama paketti lähdekansiossa `puutarha-bois-boulogne/_review-puutarha-bois-boulogne/`.
Natiivi1536×1024RGBA, SHA256 `9c39682c8aa57f257b4c8ea81188560479a469f1b50d2edac5a2944f3c073363`.

Erilliset puuryhmät, niiden väliset nurmialueet ja kaarevat polut toteutuvat. **Kokonais-QA ei silti läpäise lähteen täsmällisiä vaatimuksia**:
- Alfa>=128 XOR maskiin 51 921 px (35 479 ulkopuolella, 16 442 sisältä puuttuu); kahden pikselin toleranssin ulkopuolella 8 085 px. Useita isoja tieuria muuttui vaaleiksi poluiksi.
- Seitsemän yksittäisen latvuksen näyte 22–31 px (tavoite16–21px), mukana näkyviä runkoja/maavarjoja ja lievästi vino kuvakulma.
- Nurminäyte RGB204,22/175,21/104,03; latvusnäyte175,12/147,82/84,64. Nurmiosuus arviolta43,2% maskista. Väripohjainen pinta-ala-arvio ei ole tarkka semanttinen mittaus; menetelmä ja käsin valitut näytteet dokumentoitu.
- Polut ovat osin yli2–4px. Alpha255-pikseleitä ei ole.

Sinisellä tarkastustaustalla natiivin RGB-esikatselun laaja ruskea hehku ei näy: pääosin läpinäkyvien pikselien väriä. Rajaeroja ei kuitenkaan ole korjattu tai peitetty. Natiivitavuihin ei tehty jälkimuokkausta eikä lisäottoa.

Jatkan erilliseen /18b Vincennesin yhteen ottoon lähteen järjestyksessä. Tämä toimitus ei ole KK:n hyväksyntä, pelikytkentä tai julkaisu. Ei junaan. /17 Louvre/Notre-Dame -koe pysyy pysäytettynä.
