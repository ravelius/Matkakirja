# CODEX → FABLE: Reykjavík, yksityiskohtakuvat 8.10.2026

Tehtävä #39: 5 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 5 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-islanti-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `dd88e5a60327dc8791e66533cff276382899b3a6`, blob `d4a229772c9fe187fb08de8c48b8ee191a197971`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q794242 | `islanti-Q794242-kaksi-pappia-landakotissa.png` | [PNG](https://media.matkakirja.app/julisteet/islanti-yksityiskohdat/20261008/islanti-Q794242-kaksi-pappia-landakotissa.png) | `a86b13bad36abc00b2bddbc719f2c46d47ef3e67aef53a88a687b7f26f244ce5` |
| 02 / Q1067075 | `islanti-Q1067075-hofdin-osat-1909.png` | [PNG](https://media.matkakirja.app/julisteet/islanti-yksityiskohdat/20261008/islanti-Q1067075-hofdin-osat-1909.png) | `1a3ef6ceb0ddc70ffcef6779e15424e3fc0d2ac98c769c707d77f57e4da0d77b` |
| 03 / Q945753 | `islanti-Q945753-tjorninin-lintuparvi.png` | [PNG](https://media.matkakirja.app/julisteet/islanti-yksityiskohdat/20261008/islanti-Q945753-tjorninin-lintuparvi.png) | `38ad8896f50cc40a399dbd6ba6c0a27b691c6f9f2f466f2cd0340ce6ce2499a9` |
| 04 / Q1367886 | `islanti-Q1367886-keksitty-jaaluola.png` | [PNG](https://media.matkakirja.app/julisteet/islanti-yksityiskohdat/20261008/islanti-Q1367886-keksitty-jaaluola.png) | `0faee8cb330a5c20751c433bb01a2c0b6b5ea4cf007792599d486cf7865b9b0d` |
| 05 / Q1783706 | `islanti-Q1783706-konserttitalon-varivalot.png` | [PNG](https://media.matkakirja.app/julisteet/islanti-yksityiskohdat/20261008/islanti-Q1783706-konserttitalon-varivalot.png) | `5786fd3d3790ff5f99c1f604c855adc51b1453f80a9b0c2420a570a1ea50ba03` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/islanti-yksityiskohdat/20261008/toimitetut-5.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

Ei poisjättöjä tässä erässä.

## Kuvakohtaiset rajat

- 01 / Q794242: Hahmot noin neljännes korkeudesta laajassa maisemassa. Keksitty1850-luvun lopun vierailu; ei tietyn todellisen henkilön saapumistapahtuma tai paikkatarkka kaupunkinäkymä.
- 02 / Q1067075: Geneerinen1909puulaituri ja rakennuspaikka; myöhemmin1913aloitettu valmis satamarakenne jätetty pois. Osanumeroita ei kuvassa tekstikiellon vuoksi.
- 03 / Q945753: Linnusto, murut ja rakennusten sommittelu havainnollistavia; ei todellinen tapahtumavalokuva.
- 04 / Q1367886: Kokonaan keksitty yleinen keinotekoinen jäätilanäyttely, ei todellisen Perlan-reitin tai luonnollisen jäätikön kuva.
- 05 / Q1783706: Rakennusgeometria ja suorakaide-/vinojen lasisolujen sommittelu yleisiä; ei tarkka Harpan suojatun julkisivutaiteen kopio.714valon määrä ei väite näkyvien valojen lukumäärästä.

## Menetelmä ja varmennus

Generointikutsuja 5/5, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-islanti-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/islanti-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
