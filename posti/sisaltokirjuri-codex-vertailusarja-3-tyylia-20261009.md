## 2026-10-09 — SISÄLTÖKIRJURI → CODEX: VERTAILUSARJA (ETUSIJALLA): 4 kohdetta × 3 tyyliä × 2 muotoa

Omistaja (10.1x): "sekä lisäksi käsinpiirretyt versiot joissa on hyvin rajattu väripaletti. voisi tehdä muutamasta linssistä ja pelistä kaikki kolme vertailuun ensin. eli minikuva listaan sekä se kuva joka aukeaa vähän isommaksi ennen aktivointia." **Tämä sarja on etusijalla** aiemman 10 fotorealistisen varustekuvan tilauksen (`posti/sisaltokirjuri-codex-varustekuvat-foto-vertailu-20261009.md`) edellä; se saa jatkua sen jälkeen. Generointilupa: **12 kuvaa** (alla), muut ruudukon 12 paikkaa täytetään jo toimitetuista kuvista (ei generointia).

### Kohteet (2 peliä + 2 linssiä) ja tyylit
| id | laji | aihe |
|---|---|---|
| `olavinlinna` | peli | Olavinlinna 1499 saarilinnana järvellä: päälinna kolmella tornilla ja matala esilinna (muoto kuten `julisteet/olavinlinna-latauskuva/20261008/ipad-landscape-background.png` ja `posti/liitteet/olavinlinna-latauskuva-v44z-a/b.jpg`; ei nykylinnaa, ei bastioneja) |
| `mylly` | peli | myllylauta ja nappulat (vaaleat ja tummat), puinen lauta |
| `tahtitaivas` | linssi | yötaivas ja tähdistöt (tunnistettavia tähtikuvioita ilman viivoja/nimiä), horisontti |
| `ihmisen-matka` | linssi | maapallo ja ihmisen matka Afrikasta Euraasiaan (himmeä valopolku/katkoviivareitti, valokeila) |

Tyylit: **A = akvarelli** (nykyinen varustesarja: pehmeä akvarelli pergamentilla, hento muste, isometrinen pienoismaailma; viitteet `posti/liitteet/varuste-opas.jpg`, `varuste-ajattelijat.jpg`, `varuste-radio.jpg`); **F = fotorealistinen havainnekuva**; **K = KÄSIN PIIRRETTY, HYVIN RAJATTU VÄRIPALETTI**: musteviivapiirros/linoleikkaus-henkinen käsinpiirretty kuva, **vain 4 väriä, YHTEINEN KAIKILLE KUVILLE: pergamenttikerma `#efe3c8` (tausta), tumma seepiamuste `#3b2a1f` (viivat/varjot), haalea merensininen `#4a7a86`, lämmin okra `#c58b2a`** (ei muita värejä, ei sävyliukuja jotka luovat uusia värejä; sävyt vain viivoituksella/ristiviivoituksella ja pisteillä; paperinrakenne sallittu), ei tekstiä.

Muodot: **mini 512 × 512 JPG** (listan kuvake; pääaihe keskellä, pyöreä rajaus keskeltä toimii) ja **iso 1600 × 900 JPG** (kuva, joka aukeaa ennen aktivointia; pääaihe keskellä). Kaikissa: ei tekstiä/numeroita/logoja/vesileimaa, ei tunnistettavia ihmisiä/kasvoja, sama sommittelu mini ja iso (iso on mini laajennettuna leveämmäksi). Merkintä tyylille A ja F: metatietoihin ja kuvatekstiin "Havainnekuva." (A: "Kuvitus."), K: "Kuvitus. Tekoälyllä tuotettu."

### Ruudukko: mitä generoidaan ja mitä käytetään valmiina
| kohde | A mini | A iso | F mini | F iso | K mini | K iso |
|---|---|---|---|---|---|---|
| olavinlinna | valmis (`julisteet/varustekuvat/20261008/varuste-poikkileikkaus.jpg`) | **GENEROI** | tulossa varustekuva-foto-tilauksesta (`poikkileikkaus`-foto) | valmis (`julisteet/olavinlinna-kortti/20261008/peli-yo.jpg`) | **GENEROI** | **GENEROI** |
| mylly | valmis (`…/varuste-mylly.jpg`) | **GENEROI** | tulossa (foto-tilaus) | valmis (`linssikatalogi/mylly-havainne.jpg`) | **GENEROI** | **GENEROI** |
| tahtitaivas | valmis (`…/varuste-tahdet.jpg`) | **GENEROI** | tulossa (foto-tilaus) | valmis (`linssikatalogi/tahtitaivas-havainne.jpg`) | **GENEROI** | **GENEROI** |
| ihmisen-matka | valmis (`…/varuste-ihmisen-matka-2.jpg`) | **GENEROI** | tulossa (foto-tilaus) | valmis (`linssikatalogi/ihmisen-matka-2-havainne.jpg`) | **GENEROI** | **GENEROI** |

Generoitavat: A iso ×4, K mini ×4, K iso ×4 = **12**. (Valmiit kuvat Sisältökirjuri liittää koosteeseen.)

### Toimitus
R2 `julisteet/vertailusarja/20261009/<kohde>-<A|K>-<mini|iso>.jpg`, manifesti `posti/kuvatoimitus-vertailusarja-20261009.json` (url, sha256, mitat, generationPrompt, paletti), kuvakooste, kuittaus `posti/codex-fable-vertailusarja-20261009.md`. Jos paletin rajoitus ei toteudu (muita värejä), toimita silti ja kirjaa. Ei main-mergeä, versionnostoa eikä julkaisua Codexilta. Päätoimittaja on antanut generointiluvan (omistajan pyyntö).
