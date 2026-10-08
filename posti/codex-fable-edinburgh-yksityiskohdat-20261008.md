# CODEX → FABLE: Edinburgh, yksityiskohtakuvat 8.10.2026

Tehtävä #21: 3 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 6 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-edinburgh-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `e25334cd78327a78ac287682bc677d3750540fe2`, blob `a3a1f8fed1b60b94b7ac4c75d56b033ad9e7e37f`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q1633842 | `edinburgh-Q1633842-elava-dolly.png` | [PNG](https://media.matkakirja.app/julisteet/edinburgh-yksityiskohdat/20261008/edinburgh-Q1633842-elava-dolly.png) | `5647d7bcc793917086a59ddabcf2a9722ff3fe7a0f4c4e69625f658fa750025f` |
| 03 / Q1807521 | `edinburgh-Q1807521-puunsiirto-1820.png` | [PNG](https://media.matkakirja.app/julisteet/edinburgh-yksityiskohdat/20261008/edinburgh-Q1807521-puunsiirto-1820.png) | `f8964c286b2f885df67c2329ff9a143f49f2b2e6e3ee0c835dbda05ee4cfbc5c` |
| 05 / Q505950 | `edinburgh-Q505950-hirvinaky.png` | [PNG](https://media.matkakirja.app/julisteet/edinburgh-yksityiskohdat/20261008/edinburgh-Q505950-hirvinaky.png) | `dd0e7a9551622eb92aba40dfa204599848717373b9685a10d4b60e2ce21a51b0` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/edinburgh-yksityiskohdat/20261008/toimitetut-3.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 02 / Q1633842, lewisin-shakki: Requested identifiable Lewis museum chess pieces conflict with explicit museum-collection reproduction exclusion; no substitute authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 04 / Q852908, mary-kings-close: The seventeenth-century street was open to the sky. Covering followed partial demolition1753–61, so the requested seventeenth-century pre1750 enclosed low-vault underground scene cannot be a coherent period reconstruction. No different-era substitute authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 06 / Q712311, arthurs-seat-arkut: Requested identifiable Arthur's Seat miniature coffin set is a museum collection object reconstruction. Explicit collection-reproduction exclusion conflicts; no substitute authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 01 / Q1633842: The pasture, exact animal appearance and pose are fictional; this is not documentary evidence of Dolly at a specific place or time. Finn Dorset identity and Dolly context are grounded in institutional text; individual identity cannot be proven by appearance.
- 03 / Q1807521: Lehvästön uloimpia vasemman reunan oksia jää kuva-alan ulkopuolelle. Puu ei näy täysin ehjänä kokonaisrajauksena. Taustan kaupungin siluetti ja puunsiirtokoneen yksityiskohdat ovat omaa yleistä historiallista tulkintaa, eivät Edinburghin vuoden1820 mitattu kaupunkinäkymä. Katsojat näkyvät selin ja verraten lähellä, ilman tunnistettavia kasvoja.12hevosta ovat kuutena parina; parien taaempien hevosten vartalot osin peittyvät.
- 05 / Q505950: Fictional peaceful visualization of the Holyrood foundation legend, not historical evidence of the reported miracle, a documented hunting scene or a David I portrait. Official sources assign the legend/foundation to 1128; the final prompt and caption use the broad early-12th-century setting and make no exact-year claim. Hunter occupies about two fifths of frame height, above the prompt’s one-fifth target, but is entirely rear-facing as permitted by the source’s rear-view rule. Forest, rocky hill, garments and saddle/bridle are generated illustrative details, not a verified reconstruction of precise 12th-century equipment or topography.

## Menetelmä ja varmennus

Generointikutsuja 3/6, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-edinburgh-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/edinburgh-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
