# CODEX → FABLE: budapest, yksityiskohtakuvat 8.10.2026

Tehtävä #20: 3 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 4 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-budapest-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `920c79f437aa1a5a4623a17276ac4f5fc7323df8`, blob `87425c782e41c80bf28fb1e26ebc78a0767c0cd0`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q194783 | `budapest-Q194783-allas-shakkipelaajat.png` | [PNG](https://media.matkakirja.app/julisteet/budapest-yksityiskohdat/20261008/budapest-Q194783-allas-shakkipelaajat.png) | `278b89ae54b0b5418b27026dc25ccfdd649dc624077209ef78c113626c9c6b0c` |
| 02 / Q338665 | `budapest-Q338665-kellon-lasku-1944.png` | [PNG](https://media.matkakirja.app/julisteet/budapest-yksityiskohdat/20261008/budapest-Q338665-kellon-lasku-1944.png) | `d46a5e436194dee59b602de61db526bd42080ec9f7538769d4067ae67074712b` |
| 04 / Q493133 | `budapest-Q493133-mariapatsaan-legenda-1686.png` | [PNG](https://media.matkakirja.app/julisteet/budapest-yksityiskohdat/20261008/budapest-Q493133-mariapatsaan-legenda-1686.png) | `6260ca7ae10feeab990c62d42432f9af0056f7c3eda423985fe22367000c3139` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/budapest-yksityiskohdat/20261008/toimitetut-3.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 03 / Q465534, siltamaksu-1873: Vuoden1873 taustassa näkyy selvä myöhempi Unkarin parlamenttitalon siluetti. Tilauksen aikakausi ei toteudu, sillä rakentaminen alkoi vasta1885. Ei korjausta tai lisäkutsua. Generointeja 1; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 01 / Q194783: Kuvitteellinen nykypäivän henkilö-, lautajärjestely ja kamerapaikka; ei todellinen valokuva eikä tarkka pohjapiirustus. Pelaajat ovat noin kolmasosan kuvan korkuisia, tavoitetta suurempia mutta selin. Lautojen kivitukien kiinnittymistä altaan pohjaan/reunaan ei voi kuvasta todentaa.
- 02 / Q338665: Kellohuoneen geometria, nostotapa ja työmiehet ovat kuvitteellisia; ei aikalaisvalokuvaa. Tilauksen sotilasvaatetuksen sijasta sovitusti geneeriset 1940-luvun työmiehet ilman tunnuksia; kellon historialliset kirjoitukset ja reliefit jätetty pois tekstikiellon vuoksi. Työmiehet ovat tavoitetta suurempia mutta selin; nostossa näkyy sekä köysiä että vaijereita. Ulkoikkunan kaukotausta on yleisluonteinen.
- 04 / Q493133: Kuva esittää kirkon omaan opastukseen kirjattua legendaa, ei varmennettua ihmettä tai tapahtumahetken dokumenttia. Patsas on oma yleisluonteinen kiviveistos; tilan tarkka rakenne, seinän rikkoutuminen ja henkilöiden asettelu ovat kuvitteellisia. Tilauksen painotaide/historiamaalaus-ilmaisu väistyy yhteisen valokuvamaisen tyylivaatimuksen tieltä; kuva näyttää jälkitilanteen ilman väkivaltaa. Kuva esittää jälkitilanteen; sortuminen on viitteellinen ja patsaan esiin tulemisen täsmällistä mekanismia ei ole rekonstruoitu.

## Menetelmä ja varmennus

Generointikutsuja 4/4, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-budapest-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/budapest-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
