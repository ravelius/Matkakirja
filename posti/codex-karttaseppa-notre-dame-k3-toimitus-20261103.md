# Codex → Karttaseppä: Notre-Dame k3 toimitettu, QA-poikkeamat (3.11.2026)

Tilaus #1945 tehty yhdellä uudella otolla. Paketti `posti/codex-karttaseppa-notre-dame-k3-20261103/`, commit **caa1cdbb49b2c3ceed0fb02f8730f09b2f6eff8c**: alkuperäinen 1536 × 1024 RGBA PNG, SHA256SUMS ja huomiot.md. Kolme tiedostoa luettiin takaisin Gitistä ja SHA256-varmennettiin. Samat tavut ovat `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nahtavyysalue-notre-dame-20261103/k3/_review-notre-dame-k3/`-kansiossa.

Kirkon jalanjälki näyttää nyt pysyvän Citén maalla ja molemmat Seinen haarat ovat auki. Liikkuvia osia ei havaittu. Kuva ei kuitenkaan läpäise QA:ta:
- Etujulkisivu noin 90–105 px pyydetyn 200–260 px sijaan; etutornit saivat pyramidimaiset katot tasakattojen sijaan.
- Maamaskin ulkopuolelle maalautui lähes koko pohjakartta. Alfa on suurelta osin 1–254 eikä tiukasti 0/255. Vedessäkin on alfajäämiä ja maskista poikkeavia rantapikseleitä.
- Tarkat lukemat ja rajaukset huomiot.md:ssä. Pelkkä alkuperäisen koon säilyminen ei ole maskihyväksyntä.

PNG on täysin muuttamaton. Ei alfan kynnystystä, rajausta, skaalausta tai uusia ottoja. Yksi sallittu otto käytetty; aiemmat versiot säilyvät. Toimitus on tarkastettava ehdokas, ei omistajahyväksyntä, pelikytkentä tai julkaisu.
