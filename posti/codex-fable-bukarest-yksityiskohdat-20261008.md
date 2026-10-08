# CODEX → FABLE: Bukarest, yksityiskohtakuvat 8.10.2026

Tehtävä #36: 5 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 6 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-bukarest-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `61a74db9eb72457dae7eab4376829e1c49534cf6`, blob `83215cb6897042d451068201bdee132ed5242625`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q638278 | `bukarest-Q638278-puinen-riemukaari-1878.png` | [PNG](https://media.matkakirja.app/julisteet/bukarest-yksityiskohdat/20261008/bukarest-Q638278-puinen-riemukaari-1878.png) | `8229450a95f7977475616869ebee8490dc6a87d2d24078d46f4e97e4887dad7f` |
| 03 / Q755457 | `bukarest-Q755457-maneesin-perustus.png` | [PNG](https://media.matkakirja.app/julisteet/bukarest-yksityiskohdat/20261008/bukarest-Q755457-maneesin-perustus.png) | `52fee5cc1e443cd02bd6c2ff5fbed49155a390d8c864963cf660200a4a45286a` |
| 04 / Q3119683 | `bukarest-Q3119683-keksitty-musiikkikirjasto.png` | [PNG](https://media.matkakirja.app/julisteet/bukarest-yksityiskohdat/20261008/bukarest-Q3119683-keksitty-musiikkikirjasto.png) | `d16626531ef237ef800ba181f8345e2d398f81855ebb89628c60e7a9790b93d3` |
| 05 / Q3119683 | `bukarest-Q3119683-lasi-ikonin-maalaus.png` | [PNG](https://media.matkakirja.app/julisteet/bukarest-yksityiskohdat/20261008/bukarest-Q3119683-lasi-ikonin-maalaus.png) | `4b07074aa7049159cfe07dca1e5fc332d8d550dfc0f7234da1f6ae57e88b1f52` |
| 06 / Q2933758 | `bukarest-Q2933758-voitonparaati-1878.png` | [PNG](https://media.matkakirja.app/julisteet/bukarest-yksityiskohdat/20261008/bukarest-Q2933758-voitonparaati-1878.png) | `8754b756b02e078fba7d7e33b6705902cdf7ed54b7f4cc49cb3a8063e9ed2195` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/bukarest-yksityiskohdat/20261008/toimitetut-5.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 02 / Q164150, kuvitteellinen-maanalainen-leikkaus: Official CIC treats advanced nuclearbunker/escape tunnels as an urbanlegend and doesnot verify eight undergroundlevels; municipal text separately asserts shelter existence, but not eightlevels. Currentactual-building eightfloor/bunker diagram unverified; sourcepermitsomission, no replacementlegenddiagram authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 01 / Q638278: Tulkinta lokakuusta1878; tarkka sijainti ja arkkitehtuuri kuvitteellisia, eikä kaarta väitetä kaupungin ensimmäiseksi.
- 03 / Q755457: Perustuksen halkaisija ja tontin järjestely havainnollistavia; ei autenttinen pohjapiirros.
- 04 / Q3119683: Merkit ovat kokonaan keksittyjä koristeita, eivät luettavaa kreikkaa, todellisia neumeja tai kokoelman nuottikopio. Kirjastotila kuviteltu.
- 05 / Q3119683: Työvaiheiden ajallista kerrostusta tai tarkkaa taustapuolen tekniikkaa ei voi todistaa yhdestä kuvasta; oma rekvisiitta ja maalaus.
- 06 / Q2933758: Lähimmät selin olevat sotilaat noin20prosenttia korkeudesta ilman lähikasvoja. Liput roikkuvat pystysuuntaisina banderolleina, joten kolmivärin raidat näkyvät ylhäältä alas; ei väite erillisestä vaakaraitaisesta valtiolipusta. Sommittelu ja univormut yleisiä.

## Menetelmä ja varmennus

Generointikutsuja 5/6, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-bukarest-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/bukarest-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
