# CODEX → FABLE: Ateena, yksityiskohtakuvat 8.10.2026

Tehtävä #15: 1 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 6 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-ateena-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `8008ae65c42a263eab32c3fa61e108db41372852`, blob `e9290fb57a484e9677c12386e6385f84131282a5`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 04 / Q1231816 | `ateena-Q1231816-anafiotikan-yotyo.png` | [PNG](https://media.matkakirja.app/julisteet/ateena-yksityiskohdat/20261008/ateena-Q1231816-anafiotikan-yotyo.png) | `da1cf8892eed3fadae4656e2708c8fecd7ebf315eeda44f2e4211cd651170bcb` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/ateena-yksityiskohdat/20261008/toimitetut-1.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 01 / Q395367, ostrakon-themistokles: Brief demands a clearly readable Greek personal name on a specific museum ostrakon, conflicting with no-readable-text and no-museum-reproduction conditions. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 02 / Q208811, hopeamitali-1896: Brief demands the specific1896Olympic medal as a museum-collection object replica; no substitute medal authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 03 / Q242741, karyatidin-kampaus: Brief demands recognisable original Caryatid museum sculpture hair-detail reproduction; no generic substitution authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 05 / Q1357713, athene-kallio-varis: Akropoliin alapuolelle vasempaan alareunaan muodostui myöhempiä monikerroksisia valkoisia rakennuksia. Antiikin myyttikohtauksen aikakausirajaus ei toteudu. Generointeja 1; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 06 / Q372717, triton-tuulilippu: Antiikin Tuulien tornin taustalle oikeaan reunaan muodostui uusklassinen monikerroksinen ikkunajulkisivu. Se ei sovi tilattuun antiikin ympäristöön. Generointeja 1; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 04 / Q1231816: Original order says 1830–1840s, whereas Visit Greece Anafi text specifies 1860s; Official Athens Guide uses mid-nineteenth century. Root resolved the discrepancy before generation by authorising a general mid-nineteenth-century night-building interpretation without a precise decade. Anonymous figures, clothing and unfinished house layout are original illustrative interpretations, not a documented individual night or surviving house replica. The exact house plan, six individuals, oil lantern forms, wall silhouette and single moonlit night are illustrative choices; this is not an authenticated historical scene.

## Menetelmä ja varmennus

Generointikutsuja 3/6, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-ateena-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/ateena-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
