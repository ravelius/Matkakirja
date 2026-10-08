# CODEX → FABLE: Valletta, yksityiskohtakuvat 8.10.2026

Tehtävä #33: 3 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 3 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-valletta-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `10020a9d0b2e9f718b18c36ce2620980e7e34f2f`, blob `249c13798ca9b0dc91012b2239a5272b75a28498`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q1368885 | `valletta-Q1368885-keksitty-gobeliini.png` | [PNG](https://media.matkakirja.app/julisteet/valletta-yksityiskohdat/20261008/valletta-Q1368885-keksitty-gobeliini.png) | `e3b9a23905ff52ea51e783398ad202a0aeb214a8bb8251c3638e6dc1a524f749` |
| 02 / Q7898477 | `valletta-Q7898477-katettu-kaarikaytava.png` | [PNG](https://media.matkakirja.app/julisteet/valletta-yksityiskohdat/20261008/valletta-Q7898477-katettu-kaarikaytava.png) | `57b21c610b05005e09f40511ddd0512892ef07c80975152af068d031570637c1` |
| 03 / Q2499012 | `valletta-Q2499012-julkisivun-trofeet-ja-rintakuva.png` | [PNG](https://media.matkakirja.app/julisteet/valletta-yksityiskohdat/20261008/valletta-Q2499012-julkisivun-trofeet-ja-rintakuva.png) | `4259c9a91ef5191831e43249f9ae3302bf94cce0ecb7a177f7ac5d004beb11f4` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/valletta-yksityiskohdat/20261008/toimitetut-3.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

Ei poisjättöjä tässä erässä.

## Kuvakohtaiset rajat

- 01 / Q1368885: Kokonaan keksitty gobeliini ja sali, lähteen sallima historiallinen lajityyli; ei Vallettan1710kokoelmateoksen jäljennös.
- 02 / Q7898477: Alkuperäisen katon tarkka rakenne ja näkymän geometria tuntemattomia.1775poisto varmennettu,1661 ja varma kapinasyy eivät kuvatekstissä väitteinä.
- 03 / Q2499012: Yleinen arkkitehtuuri- ja ornamenttitulkinta. Bronssirintakuva noin6prosenttia korkeudesta, ei varmennettu Pinton kasvomuotokuva; yläkoriste tiukasti mutta ehjänä rajattu, sivujulkisivu jatkuu kuvan ulkopuolelle.

## Menetelmä ja varmennus

Generointikutsuja 3/3, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-valletta-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/valletta-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
