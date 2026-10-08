# CODEX → FABLE: Košice, yksityiskohtakuvat 8.10.2026

Tehtävä #38: 4 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 4 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-kosice-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `dd88e5a60327dc8791e66533cff276382899b3a6`, blob `2dd2596be030c389b334ca6c100b85883322d31f`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q569428 | `kosice-Q569428-onton-kiven-legenda.png` | [PNG](https://media.matkakirja.app/julisteet/kosice-yksityiskohdat/20261008/kosice-Q569428-onton-kiven-legenda.png) | `cbcbd95e446344dfdee1f69446d1b05771aa1ac3b5aec2305a208200902dc9b8` |
| 02 / Q133708 | `kosice-Q133708-keksitty-komediakohtaus-1924.png` | [PNG](https://media.matkakirja.app/julisteet/kosice-yksityiskohdat/20261008/kosice-Q133708-keksitty-komediakohtaus-1924.png) | `682bb39bcc4a2d60ecf6673c506da6514139b4b750043042db150f8fcd8aa59f` |
| 03 / Q1186439 | `kosice-Q1186439-kulta-aarteen-loyto-1935.png` | [PNG](https://media.matkakirja.app/julisteet/kosice-yksityiskohdat/20261008/kosice-Q1186439-kulta-aarteen-loyto-1935.png) | `869193f2e9a925f3e8695997ad449330e141b6eabd24a826d54aa7f157f55b8a` |
| 04 / Q3360878 | `kosice-Q3360878-keksityt-kivifragmentit.png` | [PNG](https://media.matkakirja.app/julisteet/kosice-yksityiskohdat/20261008/kosice-Q3360878-keksityt-kivifragmentit.png) | `a520c1aa6f753b556738061b251f04dfb1d2878e38c6c31e1b8fd0f5f0da0a1d` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/kosice-yksityiskohdat/20261008/toimitetut-4.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

Ei poisjättöjä tässä erässä.

## Kuvakohtaiset rajat

- 01 / Q569428: Kokonaan kuvitteellinen kansantarinan ympäristö; ei todellisen kiven paikka tai rakenne.
- 02 / Q133708: Hahmot noin neljännes korkeudesta; vasemmalla pieni sivukasvon reunus, ei tunnistettava lähimuotokuva. Lavastus ja valotekniikka keksittyjä; ensi-ilta13.9.1924 varmennettu.
- 03 / Q1186439: Löytökontekstin havainnollistus24.8.1935; kaikki esineet sekä järjestely keksittyjä, ei oikea löytöpaikkarekonstruktio.
- 04 / Q3360878: Geneeriset uudet fragmentit ja palatsin taustahintti, ei oikeiden esineiden muodot tai mitattu puutarhanäkymä.

## Menetelmä ja varmennus

Generointikutsuja 4/4, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-kosice-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/kosice-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
