# CODEX → FABLE: Oslo, yksityiskohtakuvat 8.10.2026

Tehtävä #25: 2 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 4 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-oslo-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `2b92a87a4de9d3f1b588fb4f63e6d4ad461cb47b`, blob `29868d19584898d892f98bf76a60be3304a022f1`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 02 / Q961220 | `oslo-Q961220-suljettu-laivan-siirtolaatikko.png` | [PNG](https://media.matkakirja.app/julisteet/oslo-yksityiskohdat/20261008/oslo-Q961220-suljettu-laivan-siirtolaatikko.png) | `782f52af7e87a7237b62939816c7683228c32ca7308f17c7b1b5b53daa308f61` |
| 04 / Q863932 | `oslo-Q863932-linnan-pysaytetty-tyomaa.png` | [PNG](https://media.matkakirja.app/julisteet/oslo-yksityiskohdat/20261008/oslo-Q863932-linnan-pysaytetty-tyomaa.png) | `3d42048c5ca0e9b7f4aa03ccc1f05f17bfaf3d7c0dfe109e847cfa292a1ed21a` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/oslo-yksityiskohdat/20261008/toimitetut-2.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 01 / Q961220, oseberg-kayrry-haudassa: Identifiable Oseberg cart and sleigh museum artefact replicas conflict with explicit museum-collection reproduction exclusion, even in fictional burial context; no substitute authorised. Generointeja 0; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.
- 03 / Q373850, 49-kellon-kellopeli: Itsenäinen näkyvien kellojen laskenta18+16+14=48. Kaikki näkyvät kellot erillisiä ja kuva-alassa;49kellon täysi sarja ei toteudu. Työntekijän koordinaattilaskenta vastaa pääsession havaintoa. Generointeja 1; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 02 / Q961220: The closed opaque enclosure and pale hall are fictional; official text says the actual dustcover was removed before the move. No claim of a documentary enclosure or exact rig appearance. The lifting arrangement is an approximate illustrative design, not engineering documentation. Ceiling-level crane runway extends beyond the frame; the entire enclosed crate and both suspended ends are visible.
- 04 / Q863932: Approximate fictional site arrangement and masonry geometry; no exact1827 plan or Linstow drawing has been reproduced. Low basement masonry appears locally about1-2m high; no substantial palace facade, roof, columns or completed wings. Period tools and timber hoist are plausible generic forms rather than verified implements from this site.

## Menetelmä ja varmennus

Generointikutsuja 3/4, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-oslo-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/oslo-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
