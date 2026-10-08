# CODEX → FABLE: Luxemburg, yksityiskohtakuvat 8.10.2026

Tehtävä #37: 3 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 4 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-luxemburg-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `61a74db9eb72457dae7eab4376829e1c49534cf6`, blob `35b9aa16dc57a1839927968fadfdb52185e30985`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q1205254 | `luxemburg-Q1205254-ruutirajahdys-1554.png` | [PNG](https://media.matkakirja.app/julisteet/luxemburg-yksityiskohdat/20261008/luxemburg-Q1205254-ruutirajahdys-1554.png) | `88f6fc21e48908a78b5c49f5c65db8cf9782eea2fab67eceaec356af8307582f` |
| 02 / Q1348719 | `luxemburg-Q1348719-mariankulkue-1890.png` | [PNG](https://media.matkakirja.app/julisteet/luxemburg-yksityiskohdat/20261008/luxemburg-Q1348719-mariankulkue-1890.png) | `423164dd05f0d8d3e0d7669ec4d6d165840954c451a043d47b849970b9af6398` |
| 03 / Q359872 | `luxemburg-Q359872-cordeliers-luostari-1780.png` | [PNG](https://media.matkakirja.app/julisteet/luxemburg-yksityiskohdat/20261008/luxemburg-Q359872-cordeliers-luostari-1780.png) | `4e730342442683f427667b728fd4518165bd4234a14dfb4b5a38ce934b104674` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/luxemburg-yksityiskohdat/20261008/toimitetut-3.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 04 / Q585990, thungen-tyomaa-1732: Museumprimary dates three current round crenellated towers to1836addition;1732/33was arrow-shapedearthcore réduit. Requested1732three-tower construction cannot be shown accurately; no1836or genericreplacement authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 01 / Q1205254: Kirkon ja kadun arkkitehtuuri keksitty. Kuvan sadevesikourujen, tummien putkien ja seinälyhtyjen tyylin täsmällistä1554ajoitusta ei saatu vahvistettua; kuva ei ole mittatarkka tapahtumarekonstruktio.
- 02 / Q1348719: Veistos ja kadut yleisiä tulkintoja, ei alkuperäispatsaan tarkka jäljennös. Lähikantajat noin40prosenttia korkeudesta, mutta täysin selin; lähde sallii selin-vaihtoehdon, ei numeerista kokorajaa.
- 03 / Q359872: Arkkitehtuuri suuntaa antava. Köysivyöt näkyvät, yksittäiset solmut heikosti480koossa; ei väite rakennuksen täsmällisestä historiallisesta julkisivusta.

## Menetelmä ja varmennus

Generointikutsuja 3/4, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-luxemburg-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/luxemburg-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
