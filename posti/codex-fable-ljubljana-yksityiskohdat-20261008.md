# CODEX → FABLE: Ljubljana, yksityiskohtakuvat 8.10.2026

Tehtävä #32: 3 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 3 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-ljubljana-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `10020a9d0b2e9f718b18c36ce2620980e7e34f2f`, blob `278c93e518643ad6d519f86762468fd230b51bc8`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q6438656 | `ljubljana-Q6438656-krizanken-kangaskatto.png` | [PNG](https://media.matkakirja.app/julisteet/ljubljana-yksityiskohdat/20261008/ljubljana-Q6438656-krizanken-kangaskatto.png) | `8d0339bb8e7a016b1f8d783b8d594178d10222e9b70d14c70e64c1abde5947d0` |
| 02 / Q1236564 | `ljubljana-Q1236564-maalattu-naennaiskupoli.png` | [PNG](https://media.matkakirja.app/julisteet/ljubljana-yksityiskohdat/20261008/ljubljana-Q1236564-maalattu-naennaiskupoli.png) | `77a50bbc85d1be896301ad761e34b0448e7f9fe60af160e385499a6356b9e17a` |
| 03 / Q1236564 | `ljubljana-Q1236564-vanha-kirkonkello-1326.png` | [PNG](https://media.matkakirja.app/julisteet/ljubljana-yksityiskohdat/20261008/ljubljana-Q1236564-vanha-kirkonkello-1326.png) | `1ecd54ef0bf25662af3605a4efb15056fbf4214cb2ee657751e0dcdb6eae527c` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/ljubljana-yksityiskohdat/20261008/toimitetut-3.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

Ei poisjättöjä tässä erässä.

## Kuvakohtaiset rajat

- 01 / Q6438656: Alkuperäisen ennen2016 katon yleinen konsepti, tukien ja rakennuksen tarkka geometria kuvitteellinen; ei2022 kiinteän katon dokumentointi.
- 02 / Q1236564: Maalaus ja arkkitehtuuri ovat kokonaan oma tulkinta kadonneen1703 kattokannen ideasta. Kulunut patina ei vastaa juuri valmistunutta1703pintaa; ei alkuperäisteoksen jäljennös tai mittarekonstruktio.
- 03 / Q1236564: Kellon muoto ja huone kuvitteellisia. Virallinen toimija ajoittaa pohjoistornin säilyneen kellon1328, joka on kuvatekstissä;1326tiedostonimessä vain alkuperäinen tunniste, ei vahvistettu historiallinen vuosi.

## Menetelmä ja varmennus

Generointikutsuja 3/3, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-ljubljana-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/ljubljana-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
