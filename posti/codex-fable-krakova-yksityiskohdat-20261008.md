# CODEX → FABLE: Krakova, yksityiskohtakuvat 8.10.2026

Tehtävä #23: 2 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 5 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-krakova-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `2b92a87a4de9d3f1b588fb4f63e6d4ad461cb47b`, blob `7f5e3b486805fc9d7e9181df05b573a005782202`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 02 / Q1143171 | `krakova-Q1143171-alttarin-osat-kellarissa.png` | [PNG](https://media.matkakirja.app/julisteet/krakova-yksityiskohdat/20261008/krakova-Q1143171-alttarin-osat-kellarissa.png) | `746d1598224b3cb1ae33127ab6fd6a24adbfd79f297823a7afd7793c529c2113` |
| 05 / Q641398 | `krakova-Q641398-multauurnat-kumpuun.png` | [PNG](https://media.matkakirja.app/julisteet/krakova-yksityiskohdat/20261008/krakova-Q641398-multauurnat-kumpuun.png) | `29041c7b8f68e6793a0cf3b1d772625999357141e80bf0b7271a02b28074f7fb` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/krakova-yksityiskohdat/20261008/toimitetut-2.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 01 / Q18820, wawelin-kasettipaat: Requested recognizable Wawel museum coffer-head collection replicas conflict with explicit museum-collection exclusion. No alternative authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 03 / Q638519, kaksitoista-kellonsoittajaa: Kuvassa vain10soittajaa eli5molemmin puolin, ei vaadittua12/6+6. Köydet näyttävät liittyvän kiinteisiin tukipalkkeihin eivätkä selvästi liikkuvaan kellon ikeeseen; liikkeen välitys on epäselvä. Generointeja 1; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 04 / Q919596, jagellonien-maapallo: Identifiable Globus Jagellonicus museum artefact reproduction and explicitly readableAMERICA inscription conflict with common museum-reproduction and no-text rules; no substitute authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 02 / Q1143171: Fictional storage chamber and packing arrangement; not a verified exact room or documented crate placement. Source location clarified with root approval to art bunker under castle hill 1940–1945, rather than a claim about the imperial castle own cellar. Generated fragments are original generic substitutes, not the actual Veit Stoss altar components; attribution to a specific identifiable sculpture is intentionally absent.
- 05 / Q641398: Two rear-facing men in the middle foreground occupy roughly 40 percent of image height, exceeding the prompt small-figure target of one fifth. Anonymous back views satisfy the no-recognizable-faces rule; parent QA must assess scale. Specific urn shapes, size, volunteer poses, mound construction stage and distant skyline are illustrative and not verified reconstructions of a documented moment. Official monument committee text confirms construction 1820–1823, soil from battlefields, volunteers and wheelbarrows. It does not establish the exact urn form or this deposition arrangement.

## Menetelmä ja varmennus

Generointikutsuja 3/5, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-krakova-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/krakova-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
