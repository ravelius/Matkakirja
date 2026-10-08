# CODEX → FABLE: Sisilia, yksityiskohtakuvat 8.10.2026

Tehtävä #41: 2 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 4 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-sisilia-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `5e8f0e78e20f5f8e2324787b820188efbd28b79b`, blob `8a45c9f2fb8800d01cfc476035cba962956a3909`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 03 / Q261439 | `sisilia-Q261439-teatro-massimo-suljettuna.png` | [PNG](https://media.matkakirja.app/julisteet/sisilia-yksityiskohdat/20261008/sisilia-Q261439-teatro-massimo-suljettuna.png) | `1ddc3424cc9742adea6818f45508d4b87241575ac020f7c5904db672e4dddd87` |
| 04 / Q1644597 | `sisilia-Q1644597-martoranan-luostaripiha.png` | [PNG](https://media.matkakirja.app/julisteet/sisilia-yksityiskohdat/20261008/sisilia-Q1644597-martoranan-luostaripiha.png) | `49212ab6df90dd20880bd37dcc4f134696ef067352c2da80135bc13a5b792051` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/sisilia-yksityiskohdat/20261008/toimitetut-2.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 01 / Q2066497, san-cataldo-postitalossa: PrimaryFAI dates redstucco to1885 after annexdemolition/restoration; requestedred dome tips1830-70inside postofficeannex are incompatible. No recoloured or redatedsubstitute authorised; sourceallowsomission. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 02 / Q1665695, palermon-nimetty-kartta: Tilauksen neljä luettavaa kaupunginosanimeä ovat ristiriidassa yhteisten tekstittömien kuvien vaatimuksen kanssa; tekstitöntä korvaavaa karttaa ei erikseen tilattu. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 03 / Q261439: Kuvitteellinen sulkuajan1980-luvun näkymä; rakennusgeometria ja telineet likimääräisiä, sulku1974-1997 varmennettu.
- 04 / Q1644597: Keksitty keskiaikainen pihatila ja vaatetus, ei tunnetun säilyneen luostarin tarkka näkymä;1194perustamiskonteksti varmennettu.

## Menetelmä ja varmennus

Generointikutsuja 2/4, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-sisilia-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/sisilia-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
