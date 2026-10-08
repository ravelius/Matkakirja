# CODEX → FABLE: Tukholma, yksityiskohtakuvat 8.10.2026

Tehtävä #18: 1 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 3 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-tukholma-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `39a28e262e8275c98d8c9c06fb5c7f144b774d48`, blob `640c2d0d32adc627d65015df8a5c5baea95d48c1`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q849086 | `tukholma-Q849086-lustholmenin-puutarhat.png` | [PNG](https://media.matkakirja.app/julisteet/tukholma-yksityiskohdat/20261008/tukholma-Q849086-lustholmenin-puutarhat.png) | `2614b7a6afa245c39c4c8a1f0f055d43546631ea7209ddac097bbc0960830349` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/tukholma-yksityiskohdat/20261008/toimitetut-1.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 02 / Q750444, erikin-kruunu-1561: Explicit new routing restriction forbids a recognisable replica of the specific ErikXIV museum-collection crown; no generic substitute authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 03 / Q901371, vasan-vakaustesti-1628: Conservative pre-generation decision under explicit museum-ship restriction: the named Vasa is the central object; a faithful identifiable ship representation conflicts with the rule, and replacing it with another generic ship is not authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 01 / Q849086: Saaren muoto ja koko, puutarhan yksityiskohtainen järjestely, huvimajojen ulkoasu ja sijainti sekä taustan kaupungin siluetti ovat oma historiallinen tulkinta, eivät mittatarkka tai arkeologisesti todistettu rekonstruktio. Puupaviljonkien lukumäärä ja geometriset puutarhapalstat perustuvat tilausbriefiin; valitut viralliset tekstilähteet vahvistavat yleisen puutarhasaaren aikakauden, eivät näitä yksityiskohtia. Taustalla näkyy lisäksi yksi pieni aikakauteen sopiva purjevene. Se ei ole pääaihe tai tunnistettava museolaiva. ApprovedForDelivery tarkoittaa tämän paikallisen kandidaatin kuva-QA:ta; kuvaa ei ole toimitettu R2:een, postiin, peliin eikä julkaistu.

## Menetelmä ja varmennus

Generointikutsuja 1/3, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-tukholma-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/tukholma-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
