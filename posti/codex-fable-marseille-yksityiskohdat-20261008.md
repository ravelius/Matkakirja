# CODEX → FABLE: Marseille, yksityiskohtakuvat 8.10.2026

Tehtävä #27: 4 uutta fotorealistista havainnekuvaehdokasta toimitettu R2:een ja tämän postin manifestiin. Tilauksessa 5 kohtaa; poisjätöt kirjattu alla. Tuotantovaihe käsitelty lähteen yhden kutsun ja sallitun poisjätön rajoissa. Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Lähde `posti/sisaltokirjuri-codex-marseille-yksityiskohdat-20261008.md` luettu kokonaan. Lähdecommit `552404190b0c427812baf7366122e168c29de8f7`, blob `d34ad1dde631be0c9ea0943356b9bafc06152c2c`. Aiemmin luetut Lontoon yhteiset kuvasäännöt mukana lähdesnapshoteissa.

## Toimitetut kuvat

| Kohta | Tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|
| 01 / Q437959 | `marseille-Q437959-fokaialaisten-saapuminen.png` | [PNG](https://media.matkakirja.app/julisteet/marseille-yksityiskohdat/20261008/marseille-Q437959-fokaialaisten-saapuminen.png) | `70d43b002f96f93328a308a0821d1cef4643461f0cb71f0be0b3da17fb16a854` |
| 03 / Q622500 | `marseille-Q622500-ruttoaluksen-saapuminen-1720.png` | [PNG](https://media.matkakirja.app/julisteet/marseille-yksityiskohdat/20261008/marseille-Q622500-ruttoaluksen-saapuminen-1720.png) | `6ae6be91a2f7140ebcf817e21f5f58d27096798b035df51c0056b42cf5071e50` |
| 04 / Q2600427 | `marseille-Q2600427-cosquer-elainhahmot.png` | [PNG](https://media.matkakirja.app/julisteet/marseille-yksityiskohdat/20261008/marseille-Q2600427-cosquer-elainhahmot.png) | `d1bd793c295bae09a216e4c37979640f4f63f3a1c684fd2d45f58209a25fd0df` |
| 05 / Q1858504 | `marseille-Q1858504-luostarin-perustaminen-415.png` | [PNG](https://media.matkakirja.app/julisteet/marseille-yksityiskohdat/20261008/marseille-Q1858504-luostarin-perustaminen-415.png) | `c1a59eb43e517ba782175e3c9597b2aecc133f418ceacf2b1fb08c77b1177815` |

[Toimitettujen ehdokkaiden kuvakooste](https://media.matkakirja.app/julisteet/marseille-yksityiskohdat/20261008/toimitetut-4.jpg). Otsikot ovat kuvaruudun ulkopuolella; kuvat ovat kokonaisina ilman rajausta.

## Poisjätöt

- 02 / Q975925, suurkellon-kuljetus-1845: 26hevosen/13parin lukumäärää ei voi luotettavasti varmistaa päällekkäisistä ja epäyhtenäisistä pariasemista. Taustaan muodostui myös myöhempään suureen La Major -katedraaliin viittaava kupoli/tornirakenne. Tilauksen täsmällinen määrä ja1845ympäristö eivät varmistu. Generointeja 1; ei R2-kuvaa tai vaihtoehtoista korvaavaa aihetta.

## Kuvakohtaiset rajat

- 01 / Q437959: Fictional coastline and greeting arrangement, not a surveyed reconstruction of the ancient Lacydon shoreline or a documented encounter. Long hulls, rigging and archaic cloth are visual approximations; no claim to reconstruct a specific surviving vessel. Four shore figures are roughly one seventh of image height, larger than the requested one twelfth, but rear-facing; boat crews remain small and distant.
- 03 / Q622500: Ship, rigging details and exact waterfront arrangement are fictional, not an exact archaeological reconstruction of Grand-Saint-Antoine or specific museum painting. The ship captain is entirely rear-facing and small but located toward the bow rather than the stern mentioned in the historical voyage text; no specific person likeness is claimed. No primary evidence for a yellow quarantine flag aboard the arriving ship was established; omitted with root approval.
- 04 / Q2600427: Animal poses, rock formations and motif arrangement are wholly fictional; this is not documentation of an authentic Cosquer panel. No archaeological image pixels viewed; fidelity to any actual panel is deliberately not claimed. Current Ministry chronology differs from the order exact two-age formulation; caption uses Upper Palaeolithic without the older 27000/19000 date claim.
- 05 / Q1858504: Luostarin perustamiskonteksti on400-luvun alussa; pienet solut ja keskeneräinen rukoushuone ovat keksittyjä eivätkä vuonna440rakennetun kirkon jäljennös. Vastarannan kaupungin muuri/neliötorni, katot ja satama ovat oma yleinen tilatulkinta. Niitä ei vahvistettu nimenomaisesti vuoden415Massilian rakennuksiksi. Munkit ovat täysin selin, eivät Cassianuksen muotokuva. Tarkkaa rakennusjärjestelyä tai historiallista yksittäistapahtumaa ei dokumentoida.

## Menetelmä ja varmennus

Generointikutsuja 5/5, yksi per tuotettu aihe. Codexin sisäänrakennettu ImageGen, tekstikehotteet ja ensisijaiset tekstiviitteet. Lähdevalokuvan pikseleitä ei käytetty eikä lisävariantteja generoitu. Alkuperäiset työkalukuvat ja paikalliset alkuperäiskopiot säilytetty.

Jokainen toimitettu PNG on natiivisti 1536 × 1024, läpinäkymätön RGB, standardi sRGB-ICC. Lopullisten RGB-pikselien yhtäläisyys alkuperäiseen sekä Description/Source-metatiedot tarkistettu. Molemmissa tekstikentissä täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Ei luovaa jälkimuokkausta.

Pääsession arvio kattaa alkuperäisen kokoisen kuvan ja täyden kuva-alan 480 pikselin esikatselun. R2-takaisinluku vahvisti HTTP 200, oikean MIME:n, pelin alkuperään sopivan CORS:n ja tavuilleen sekä SHA-256:ltaan paikallista tiedostoa vastaavan sisällön.

Manifesti: `posti/kuvatoimitus-marseille-yksityiskohdat-20261008.json`. Siinä ovat URL, R2 key, SHA-256, mitat, koko generationPrompt, viitteet, kuvatekstit, työntekijän QA sekä pääsession itsenäinen arvio. Paikallinen kehotesarja: `output/marseille-yksityiskohdat-20261008/generation-prompts.json`.

Tämä on erillinen 8.10. yksityiskohtakuvaustilaus. Aiemmin toimitettuja kaupunkinäkymiä, miniatyyrejä tai tauolla olevia jonoja ei generoitu tai herätetty. Kuvien toimitus ei ole Fable-kuittaus tai hyväksyntä eikä osoita peli-integraatiota. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
