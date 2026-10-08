# CODEX → FABLE: Vilna, yksityiskohtakuvat 8.10.2026

Tehtävä #31: 4 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 5 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-vilna-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `4906827b88c9be430a474698af12d798de766434`, blob `7667d11b3d4168d70410d6b9f893d179aecdf04b`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 02 / Q1284847 | `vilna-Q1284847-palatsin-rauniokellari.png` | [PNG](https://media.matkakirja.app/julisteet/vilna-yksityiskohdat/20261008/vilna-Q1284847-palatsin-rauniokellari.png) | `55dc787bd11be6e146c3fccaf14b7dfa0a8dcfd570ccde7452ebb5d6deaab7a1` |
| 03 / Q937290 | `vilna-Q937290-kirkon-varasto-1812.png` | [PNG](https://media.matkakirja.app/julisteet/vilna-yksityiskohdat/20261008/vilna-Q937290-kirkon-varasto-1812.png) | `a26c7fa287cbba63435666f2e20d3c8b90a6642ae0db83197c62696d3528da59` |
| 04 / Q1497616 | `vilna-Q1497616-rautaisen-suden-legenda.png` | [PNG](https://media.matkakirja.app/julisteet/vilna-yksityiskohdat/20261008/vilna-Q1497616-rautaisen-suden-legenda.png) | `88f81fbff91aba52a25684de8566e044f9f57be448490abf43f1299a3cb32d6f` |
| 05 / Q445649 | `vilna-Q445649-synagogan-kaivauslattia.png` | [PNG](https://media.matkakirja.app/julisteet/vilna-yksityiskohdat/20261008/vilna-Q445649-synagogan-kaivauslattia.png) | `c1d9fccf0eff109410eb505badb042f313c07364b2d56a67c7857d5d395da37c` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/vilna-yksityiskohdat/20261008/toimitetut-4.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 01 / Q1283798, piilossa-rauniokirkossa-1662: Hylätty: virallinen lähde kertoo puukirkosta, mutta tuotos on tiiliraunio. Materiaali sekä numeerinen hahmokokoraja eivät vastaa hyväksyttyä ohjetta. Yksi kutsu käytetty; ei uusintaa. Generointeja 1; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 02 / Q1284847: Kuvitteellinen museotila ja rekvisiitta; ei todellisen kellarin pohjapiirros tai nimetty kokoelmaesine.
- 03 / Q937290: Talven1812 käyttöä havainnollistava kuvitteellinen järjestely; ei Pyhän Annan kirkon mitattu sisätila tai tarkka tapahtumavalokuva.
- 04 / Q1497616: Legendan unimaailma: susi ja kuu suurennettuja, maisema sekä hahmot keksittyjä; ei väite kukkulan historiallisesta asumattomuudesta tai todellisesta kuuasteikosta.
- 05 / Q445649: Likimääräinen alkuperäinen kaivausjärjestely vuoden2018bima-paljastuksen yhteydessä; ei tarkka kaivauskartta. Lapion varsi päättyy kuvanreunaan.

## Menetelmä ja varmennus

Generointikutsuja 5/5, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-vilna-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/vilna-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
