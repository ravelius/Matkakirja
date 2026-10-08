# CODEX → FABLE: Granada, yksityiskohtakuvat 8.10.2026

Tehtävä #29: 3 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 3 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-granada-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `bafeb55c10cc7db6ca1bd59c64240fe0ee368071`, blob `3835931109a77dd984cb45e65ee8e88a01858594`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q5419362 | `granada-Q5419362-paamoskeijan-piha-1490.png` | [PNG](https://media.matkakirja.app/julisteet/granada-yksityiskohdat/20261008/granada-Q5419362-paamoskeijan-piha-1490.png) | `46d946ac52fba52036c3b88c5bc97a11e123d20e54e3cc3319d6543c9fe42c55` |
| 02 / Q429192 | `granada-Q429192-keksityt-hoviesineet.png` | [PNG](https://media.matkakirja.app/julisteet/granada-yksityiskohdat/20261008/granada-Q429192-keksityt-hoviesineet.png) | `69b717d25cb0a2ba35d01d38d4a87b2a067f9568cdb76637dc6f7a87150edc34` |
| 03 / Q2842387 | `granada-Q2842387-sacromonte-sateiden-jalkeen-1963.png` | [PNG](https://media.matkakirja.app/julisteet/granada-yksityiskohdat/20261008/granada-Q2842387-sacromonte-sateiden-jalkeen-1963.png) | `4911697567fa3e23a93f340cabf839a71b55e163629be6bd9192e48961f6c34d` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/granada-yksityiskohdat/20261008/toimitetut-3.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

Ei poisjättöjä tässä erässä.

## Kuvakohtaiset rajat

- 01 / Q5419362: Entirearchitecture inventedcirca1490. Thinunidentifiedroofrod extends beyondtopframe; no evidence of conductor/electricalfixture to classify modernlightningrod. This partialmast/framinglimit explicitly retained.
- 02 / Q429192: Entirelyinventedprops, approximate15Cgeneralcontext; mirrorendmarginabout4percent,butuncropped.
- 03 / Q2842387: Fictionalslope,skyline,weather andhouseholdlayout; winter1963raincontextonly,noexactevictionday/process. Adults11-13percent remain distantrear withoutsourcehardlimit.

## Menetelmä ja varmennus

Generointikutsuja 3/3, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-granada-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/granada-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
