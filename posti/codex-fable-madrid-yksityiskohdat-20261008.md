# CODEX → FABLE: Madrid, yksityiskohtakuvat 8.10.2026

Tehtävä #14: 4 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 4 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-madrid-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `78ff7bc5540e8f740208ccf0246dfaaaa824e08a`, blob `7ddf32653b1254c60ff5e86dadbad84210d84073`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q171517 | `madrid-Q171517-alcazar-palo-1734.png` | [PNG](https://media.matkakirja.app/julisteet/madrid-yksityiskohdat/20261008/madrid-Q171517-alcazar-palo-1734.png) | `12399c3ad0f0dd442ff434fd079578ae2dcbc98f38b38bf45a784a743133437c` |
| 02 / Q1324163 | `madrid-Q1324163-telefonican-vauriot-1936.png` | [PNG](https://media.matkakirja.app/julisteet/madrid-yksityiskohdat/20261008/madrid-Q1324163-telefonican-vauriot-1936.png) | `d507ba6b97b642ec829959f1fd5c47dd04fcf67573b297d2d806283d61f3bd3c` |
| 03 / Q1537446 | `madrid-Q1537446-cibeles-kaulaliinajuhla.png` | [PNG](https://media.matkakirja.app/julisteet/madrid-yksityiskohdat/20261008/madrid-Q1537446-cibeles-kaulaliinajuhla.png) | `275d77b939553b6201de6f1ac0dde226b5e8d882eb89ede2d461e0f8ea7f6f8b` |
| 04 / Q1537446 | `madrid-Q1537446-kultaholvin-leikkaus.png` | [PNG](https://media.matkakirja.app/julisteet/madrid-yksityiskohdat/20261008/madrid-Q1537446-kultaholvin-leikkaus.png) | `3fdfd548090416a568afe73995414036826a7380260bce79384debe234ce3a65` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/madrid-yksityiskohdat/20261008/toimitetut-4.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

Ei poisjättöjä tässä erässä.

## Kuvakohtaiset rajat

- 01 / Q171517: Tilauksen maurilaistyylisiä muureja koskeva ilmaisu tarkennettu päätekijän päätöksellä 2026-10-08 virallisen tekstilähteen perusteella Habsburg-kauden vuoden 1734 vanhaksi Alcázariksi. Fictional courtyard/window/canvas rescue arrangement, not a verified reconstruction of a specific artwork rescue or exact architecture. Receiving figures appear about one quarter of frame height, larger than the prompt target, but entirely rear-facing; upper-window silhouette is small and shadowed.
- 02 / Q1324163: Fictional reconstruction of exterior damage; exact impact locations and surrounding facade condition are illustrative. Approximate historic architecture inferred from official text; no source-photo pixels or documentary photograph composition used.
- 03 / Q1537446: Fictional celebration and approximate architecture; no specific real championship event or player is claimed. Tiny letter-like decorative marks appear on background palace frieze; no readable word or number was discerned during native-detail inspection, and none is legible at 480px. Crowd includes small distant heads/faces without identifiable detail; not every crowd member is rear-facing.
- 04 / Q1537446: Fictional NON-OPERATIONAL cutaway, approximate materials and neutral facade; not a depiction of any actual bank vault or floor plan. Public 35 metre depth is research context only; image is not to scale and contains no measurement marks.

## Menetelmä ja varmennus

Generointikutsuja 4/4, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-madrid-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/madrid-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
