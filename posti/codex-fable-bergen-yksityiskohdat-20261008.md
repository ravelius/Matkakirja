# CODEX → FABLE: Bergen, yksityiskohtakuvat 8.10.2026

Tehtävä #28: 5 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 6 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-bergen-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `bafeb55c10cc7db6ca1bd59c64240fe0ee368071`, blob `76f2c6f248c039ba6cbceb7df3b416603e670466`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q257558 | `bergen-Q257558-fantoft-palo-1992.png` | [PNG](https://media.matkakirja.app/julisteet/bergen-yksityiskohdat/20261008/bergen-Q257558-fantoft-palo-1992.png) | `6d9cfa6c5dec7b1a86c6876bd5af1c9fa390e743909e9881aefc77ea1b6d1a51` |
| 02 / Q1291307 | `bergen-Q1291307-keksityt-onnenkalut.png` | [PNG](https://media.matkakirja.app/julisteet/bergen-yksityiskohdat/20261008/bergen-Q1291307-keksityt-onnenkalut.png) | `a84913c9a1a5d37e6b52e40369cd7946191c5eb2d2b367b6462cc929d287f197` |
| 04 / Q1420616 | `bergen-Q1420616-floyen-talvivalot.png` | [PNG](https://media.matkakirja.app/julisteet/bergen-yksityiskohdat/20261008/bergen-Q1420616-floyen-talvivalot.png) | `5b4d2aff2d3dc3606926407018be17495ca91d2f1dcf01f6494e1e2ca172545f` |
| 05 / Q117767 | `bergen-Q117767-floibanen-pysahtynyt-1986.png` | [PNG](https://media.matkakirja.app/julisteet/bergen-yksityiskohdat/20261008/bergen-Q117767-floibanen-pysahtynyt-1986.png) | `939837c0b6057a0c4ad4d9f6ead9965669f62434cd1eda0847b268df6a073f89` |
| 06 / Q583428 | `bergen-Q583428-rosenkrantz-kolme-toimintoa.png` | [PNG](https://media.matkakirja.app/julisteet/bergen-yksityiskohdat/20261008/bergen-Q583428-rosenkrantz-kolme-toimintoa.png) | `e510e2bee16c59757ff06b7b49d3f783541ab41c72c95a348ba65820330bc13f` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/bergen-yksityiskohdat/20261008/toimitetut-5.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 03 / Q153430, riimupuikko: Explicitly sharp READABLE medieval runic writing conflicts with common no-text rule; museum excavated-runestick reproduction also conflicts with collection exclusion. No non-runic substitute authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 01 / Q257558: Fictional firephase,weather/viewpoint/architecture proportions, not event photograph.
- 02 / Q1291307: Not actual Grieg belongings or museum replicas; charm scale illustrative.
- 04 / Q1420616: Invented route/lighting/weather; completion of actual lightingproject unverified. Agent falsehold relates only to stricterprompt3percent target, not sourcehardlimit.
- 05 / Q117767: 1974-2002generation context; preciseincidentdate,cause,carbody,evacuationequipment andtopography unverified. No brokenwireclaim.
- 06 / Q583428: Originalconceptualsection withsixvisiblelevelbands; threefunctions required, actualsevenhistoricalplans not claimed. Not a measured architectural reconstruction.

## Menetelmä ja varmennus

Generointikutsuja 5/6, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-bergen-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/bergen-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
