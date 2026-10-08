# CODEX → FABLE: Lissabon, yksityiskohtakuvat 8.10.2026

Tehtävä #17: 4 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 4 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-lissabon-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `39a28e262e8275c98d8c9c06fb5c7f144b774d48`, blob `160af694a2cfc6f0c84164e2abb07125721ee94a`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q999002 | `lissabon-Q999002-gaiola-leikkaus.png` | [PNG](https://media.matkakirja.app/julisteet/lissabon-yksityiskohdat/20261008/lissabon-Q999002-gaiola-leikkaus.png) | `c93ee3bc3ee60d4a24ce2bde000ea3c2a134d00ff0dc93fd779898c1ededbfab` |
| 02 / Q999002 | `lissabon-Q999002-marssikoe-1756.png` | [PNG](https://media.matkakirja.app/julisteet/lissabon-yksityiskohdat/20261008/lissabon-Q999002-marssikoe-1756.png) | `caac831dfab6cd01c381db440da36453c77a2d906acb34692743e153aa3c8d23` |
| 03 / Q168001 | `lissabon-Q168001-santa-justa-vihkiaiset.png` | [PNG](https://media.matkakirja.app/julisteet/lissabon-yksityiskohdat/20261008/lissabon-Q168001-santa-justa-vihkiaiset.png) | `074ddd13629d6bbea477f4a4c32f57bca1f739534609cb93712d4cad521398a6` |
| 04 / Q1470414 | `lissabon-Q1470414-carmon-romahdus-1755.png` | [PNG](https://media.matkakirja.app/julisteet/lissabon-yksityiskohdat/20261008/lissabon-Q1470414-carmon-romahdus-1755.png) | `3c15fcc21fa0775c1b17cd96967006253354cf2fe6ee08ffa34bdd4bbf4b05a4` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/lissabon-yksityiskohdat/20261008/toimitetut-4.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

Ei poisjättöjä tässä erässä.

## Kuvakohtaiset rajat

- 01 / Q999002: Rakennus on alkuperäinen havainnollinen tulkinta, ei tietyn suojellun talon mitattu rakenne. Leikkaus on mahdoton kameran dokumentaarisena otoksena; materiaalit ja ympäristö esitetään valokuvamaisesti. Kattoharjan ylin osa rajautuu kuvan yläreunan ulkopuolelle; rakenne, neljä kerrosta ja ullakon osa näkyvät.
- 02 / Q999002: Sotilaiden marssikoe on lähteessä legendaa, ei varmistettu dokumentaarinen tapahtumakuva. Kolmen puumallin ulkonäkö, sijoittelu, asut ja kokeen järjestely ovat kuvallista tulkintaa. Kuva ei esitä mitattua maanjäristystä, tärinän suuruutta tai rakenneteknistä todistusta. Sotilasjono kulkee mallien takana; kuvasta ei voi todentaa kokeen etenemistä tai maaperän todellista tärinää.
- 03 / Q168001: Virallinen liikennelaitoksen tiedote vahvistaa sillan asennuksen, ei kuvan seremonian yksityiskohtia tai monarkin läsnäoloa. Ryhmän henkilöt ja seremonian sommittelu ovat anonyymi historiallinen tulkinta. Ristiriitainen MWNF-tietue on jätetty tuotantofaktojen ulkopuolelle. Tornin yläosa rajautuu kuvan yläreunan ulkopuolelle; sillan/tornin yksityiskohdat ovat havainnollinen tulkinta.
- 04 / Q1470414: Museon historia vahvistaa maanjäristysvauriot, ei kuvan tarkkaa romahtamishetkeä, messun vaihetta tai irtaimistoa. Kirkon sisustus, alkuperäiset holvit ja henkilöiden sijoittelu ovat tulkintaa; nykyisen museon kokoelmateoksia tai jälleenrakennettuja kaaria ei kopioida. Selin näkyvien ihmisten tarkka poistumisen suunta jää kuvalliseen tulkintaan; vasemmalla on selkeä ehjä sivukäytävä, eikä ketään ole sortuvien kivien alla.

## Menetelmä ja varmennus

Generointikutsuja 4/4, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-lissabon-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/lissabon-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
