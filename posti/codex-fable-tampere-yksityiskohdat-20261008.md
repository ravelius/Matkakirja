# CODEX → FABLE: Tampere, yksityiskohtakuvat 8.10.2026

Tehtävä #30: 5 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 5 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-tampere-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `4906827b88c9be430a474698af12d798de766434`, blob `974a263261be956b54ee87d0d19eacfe644247cb`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q15846380 | `tampere-Q15846380-langan-solmun-sitominen-1873.png` | [PNG](https://media.matkakirja.app/julisteet/tampere-yksityiskohdat/20261008/tampere-Q15846380-langan-solmun-sitominen-1873.png) | `81ee891d625c590d1120eaedf166f6ebcdc20d1ac5f49f30aff6ccb31f0b7a64` |
| 02 / Q18346706 | `tampere-Q18346706-keksitty-pelinayttely.png` | [PNG](https://media.matkakirja.app/julisteet/tampere-yksityiskohdat/20261008/tampere-Q18346706-keksitty-pelinayttely.png) | `5e637efd603e59587fb3ca0197c32a2454de5caeb2133fdcf4e4fd2efc9d9b29` |
| 03 / Q222028 | `tampere-Q222028-muinainen-nasijarvi.png` | [PNG](https://media.matkakirja.app/julisteet/tampere-yksityiskohdat/20261008/tampere-Q222028-muinainen-nasijarvi.png) | `49b1f80c5b58a5f43fa3e2cd2b95ffbbe21e983fb5a81bb2ffb2e858bdcfcfa5` |
| 04 / Q222028 | `tampere-Q222028-nuori-puro-hiekassa.png` | [PNG](https://media.matkakirja.app/julisteet/tampere-yksityiskohdat/20261008/tampere-Q222028-nuori-puro-hiekassa.png) | `9c76ddb645a4a39afe5abf0c00440acdd565eecb84b655db903cd1e3fb487d63` |
| 05 / Q1190334 | `tampere-Q1190334-nasinneula-liukuvalu-1970.png` | [PNG](https://media.matkakirja.app/julisteet/tampere-yksityiskohdat/20261008/tampere-Q1190334-nasinneula-liukuvalu-1970.png) | `88ada51ebb4100c1b13fdc2c7988217e69906d4002157f642f7f8d7fc233de17` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/tampere-yksityiskohdat/20261008/toimitetut-5.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

Ei poisjättöjä tässä erässä.

## Kuvakohtaiset rajat

- 01 / Q15846380: Fictionalworkshop/person/machine; knotnearlycompleted. Rearbody is large due requestedhandsdetail, permittedrear-facingalternative.
- 02 / Q18346706: Koko näyttelytila ja laitteet ovat kuvitteellisia; ei Vapriikin dokumentointi.
- 03 / Q222028: Rannat, mittasuhteet ja kasvillisuus ovat likimääräisiä. Noin5500eaa ajoitus perustuu erikoistutkimuksen kalibroituun7500calBP ajoitukseen; yleislähteiden eri ajoitus kirjattu.
- 04 / Q222028: Alkuvaiheen uoma on kuvitteellinen geologinen havainnollistus, ei tarkka muinaisuoman kartta; sama tutkimusajoituksen rajoitus kuin03.
- 05 / Q1190334: Työmaan sommittelu, nosturimalli ja taustan siluetti ovat havainnollistavia, eivät varmennettu tietyn päivän näkymä.

## Menetelmä ja varmennus

Generointikutsuja 5/5, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-tampere-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/tampere-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
