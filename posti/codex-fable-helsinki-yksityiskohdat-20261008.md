# CODEX → FABLE: helsinki, yksityiskohtakuvat 8.10.2026

Tehtävä #19: 3 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 6 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-helsinki-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `920c79f437aa1a5a4623a17276ac4f5fc7323df8`, blob `8a8bd9208bd8419af1485da17fc56f3506510a5e`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q1044613 | `helsinki-Q1044613-asemaehdotus-1904.png` | [PNG](https://media.matkakirja.app/julisteet/helsinki-yksityiskohdat/20261008/helsinki-Q1044613-asemaehdotus-1904.png) | `8cb0d6dbe40594a084fb24c7ca6a962133074ae3ede6da2ad37832101d8c4e4a` |
| 02 / Q1635596 | `helsinki-Q1635596-vuoristoradan-jarrumestari.png` | [PNG](https://media.matkakirja.app/julisteet/helsinki-yksityiskohdat/20261008/helsinki-Q1635596-vuoristoradan-jarrumestari.png) | `8086d3cc01299d75ab3336e70ad319015556640b0dcccd7a0d7f7ad9cce593f0` |
| 05 / Q1355001 | `helsinki-Q1355001-jumalanaiti-ikoni.png` | [PNG](https://media.matkakirja.app/julisteet/helsinki-yksityiskohdat/20261008/helsinki-Q1355001-jumalanaiti-ikoni.png) | `d1f61f315b5722be1364469395f973ddd5320ae6c9ae5d79809724b9d26f229e` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/helsinki-yksityiskohdat/20261008/toimitetut-3.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 03 / Q1418136, kalevala-freskot-1928: Identifiable National Museum Gallen-Kallela fresco reproduction conflicts with explicit museum-collection-reproduction exclusion; no substitute authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 04 / Q738015, apostolit-merelta-1873: Official1852 conservation record and parish text document ochre walls and cobalt-blue star-painted domes at least into1860s; repaint date relative to1873 not verified. Requested present white/green color scheme cannot be placed in1873 reliably. No current-view substitute authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 06 / Q541933, havis-amanda-lakki: Built-in generation failed automatic output moderation (sexual category) while depicting the requested public bronze statue. One permitted call consumed; no image, original path or hash returned, no retry. Generointeja 1; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 01 / Q1044613: This is an imagined camera view of an unbuilt proposal, not an actual1904 building or archival photograph. Exact National Romantic facade, tower placement and eight-bear arrangement are interpreted from the authorised brief and historical text, not a measured reproduction of the competition drawing. Dominant tower has only narrow clearance at top of frame; entire finial remains visible in native and480px views.
- 02 / Q1635596: Train exterior, brake linkage, timber layout and anonymous clothing are an illustrative reconstruction, not a measured historical engineering diagram. Brakeman occupies a substantial part of the frame but is fully rear-facing with no recognizable face; rear-facing alternatives are explicitly authorised.
- 05 / Q1355001: The icon, ornament and cathedral surroundings are invented, not a verified reconstruction of the Uspenski interior or its specific stolen icon. A small heavily blurred secondary religious icon silhouette appears at the left edge of the church background; no identifiable human visitor or readable facial features. Upper silver object edge is close to the top image margin, though retained in frame.

## Menetelmä ja varmennus

Generointikutsuja 4/6, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-helsinki-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/helsinki-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
