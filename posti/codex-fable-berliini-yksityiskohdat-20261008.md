# CODEX → FABLE: Berliini, yksityiskohtakuvat 8.10.2026

Tehtävä #12: 2 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 3 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-berliini-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `f585d5d84fd066ae41cd3d99d882585492dcdf61`, blob `c98340c3adcf5ad5a8a71eb4e859eef945ebfb9e`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 02 / Q154563 | `berliini-Q154563-hautaholvi.png` | [PNG](https://media.matkakirja.app/julisteet/berliini-yksityiskohdat/20261008/berliini-Q154563-hautaholvi.png) | `1707124384914be6612632a7b964fec717f710fc0491cef44900bed73a78ad60` |
| 03 / Q154563 | `berliini-Q154563-sauer-urut.png` | [PNG](https://media.matkakirja.app/julisteet/berliini-yksityiskohdat/20261008/berliini-Q154563-sauer-urut.png) | `04fce01059125e81794898d3b2a74496d24ba7c40db65e736c09f7f474f42dfc` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/berliini-yksityiskohdat/20261008/toimitetut-2.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 01 / Q151963, amarnan-loyto-1912: Explicit museum-collection-reproduction exclusion conflicts with requested identifiable Nefertiti bust. No substitute authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 02 / Q154563: Holvitila, arkkumäärä ja esineiden koristeet ovat omia yleisiä tulkintoja; kuva ei dokumentoi todellisen kryptan pohjapiirrosta tai yksittäisiä kokoelma-arkkuja.
- 03 / Q154563: Fasadin tarkat mitat, pilli- ja koristeasettelu ovat havainnollistavia; kuva ei ole todellisen urun mitattu jäljennös. Lehterin reunoilla näkyy kaksi pientä tummaa laitetta; historiallinen tulkinta ei dokumentoi laitteiden alkuperää tai koko urun mittoja.

## Menetelmä ja varmennus

Generointikutsuja 2/3, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-berliini-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/berliini-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
