# CODEX → FABLE: Sofia, yksityiskohtakuvat 8.10.2026

Tehtävä #35: 2 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 3 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-sofia-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `61a74db9eb72457dae7eab4376829e1c49534cf6`, blob `b167f5d05132295f2e978f0e6d6c86f52d091e86`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q190435 | `sofia-Q190435-lammin-lahde-1873.png` | [PNG](https://media.matkakirja.app/julisteet/sofia-yksityiskohdat/20261008/sofia-Q190435-lammin-lahde-1873.png) | `1f18ab3245dc2f0df008b2b2485eec21dc3124d1b879ee9db3824b0158dc9322` |
| 03 / Q790052 | `sofia-Q790052-moskeijan-lahdehoyry.png` | [PNG](https://media.matkakirja.app/julisteet/sofia-yksityiskohdat/20261008/sofia-Q790052-moskeijan-lahdehoyry.png) | `292dfc540b6ab3984a1a0b03d20b2e463634843ac768af819de39cf738aa3fa1` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/sofia-yksityiskohdat/20261008/toimitetut-2.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 02 / Q276553, ehtoollisfresko-1259: Tilattu tunnistettavan Bojanan museokirkon nimetty vuoden1259ehtoollisfreskon jäljennös on ristiriidassa kokoelmateosten jäljennösten kiellon kanssa; ei valtuutusta korvaavaan uuteen teokseen. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 01 / Q190435: Allas, vaatetus ja ympäristö ovat kuvitteellisia. Lähikuva selkäpuolelta on tilauksen selin-vaihtoehdon mukainen, ei henkilön muotokuva.
- 03 / Q790052: Rakennusgeometria ja höyryraon paikka likimääräisiä. Minareetin koristekärki osittain ylärajalla; höyry on pääaihe eikä koko rakennusmittaus.

## Menetelmä ja varmennus

Generointikutsuja 2/3, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-sofia-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/sofia-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
