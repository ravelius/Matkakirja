# Košicen miniatyyrien tyyliaudit 27.9.2026

Kaupungissa on kahdeksan paikallista WebP-miniatyyriä eikä nykyisiä R2-viitteitä. Vertailukohtana ovat hyväksytyt Ateenan viistot, hillityt muste-vesiväripienoismallit. Koko kaupungin ennen/jälkeen-kontaktiarkki: [Košicen kahdeksan kohdetta](kuvat/kosice-miniatyyrit-ennen-jalkeen-20260927.jpg).

| Kohde | Päätös | 512×512 / alfa | Täyttö | Reuna | SHA-256 alku |
| --- | --- | --- | ---: | ---: | --- |
| `kosice-hlavn-katu` | uusittu | RGBA, 0–255 | 0.298 | 0.000 | `1dcdf150e95aa356` |
| `kosice-immaculata` | säilytetty | RGBA, 0–255 | 0.203 | 0.000 | `f9107fdc915ff987` |
| `kosice-jakabin-palatsi` | säilytetty | RGBA, 0–255 | 0.392 | 0.000 | `fcc2ce6f7a9c5528` |
| `kosice-miklu-in-vankila` | säilytetty | RGBA, 0–255 | 0.531 | 0.000 | `9ae4621485ff8577` |
| `kosice-pyhan-elisabetin-tuomiokirkko` | säilytetty | RGBA, 0–255 | 0.513 | 0.000 | `0c95a852004175c9` |
| `kosice-pyovelin-bastioni` | säilytetty | RGBA, 0–255 | 0.389 | 0.006 | `9333766544c66b0d` |
| `kosice-urbanin-torni` | säilytetty | RGBA, 0–255 | 0.240 | 0.000 | `0ac59e98a9658c76` |
| `kosice-valtionteatteri` | säilytetty | RGBA, 0–255 | 0.548 | 0.000 | `5d93edbfe5088941` |

## Korjattu poikkeus

`kosice-hlavn-katu.webp` oli pitkä katunäkymä perspektiivin katoamispisteeseen. Pelin nostoteksti kuvaa keskiaikaisesta torista syntynyttä Hlavná-katua keskeltä leveänä ja päistä kapenevana. Uusi kuva esittää lyhyen eristetyn kävelykadun pienoismallin viistosta ylhäältä. Se jättää erillisinä karttapaikkoina merkityt tuomiokirkon ja teatterin pois. Seitsemän muuta kuvaa olivat jo eristettyjä fyysisiä paikkoja samalla hillityllä piirrosilmeellä, joten niitä ei muutettu.

ImageGen tuotti kaksi alusta asti uutta ehdokasta. Ensimmäinen oli liian terävä ja värikylläinen suhteessa kaupungin muuhun sarjaan; se säilyy hylättynä. Toinen hyväksyttiin kaupungin koko sarjan kontaktivertailussa. Vanha kuva, molemmat raaka-PNG:t ja hylätty WebP ovat `output/style-audit-europe-20260927/kosice/`-kansiossa.

## QA ja rajat

Uusi kuva on 512×512 lossless WebP, RGBA, upotettu sRGB-profiili, alfa 0–255 ja kaikki neljä kulmaa läpinäkyviä. Leikkausmitta täyttö 0,298 ja reuna 0,000; rajauspoikkeuksia ei havaittu. Muutos koskee vain yhtä kuvaa ja sitä vastaavaa `tools/miniatyyri-mitat.json`-riviä. Kuvassa ei ole taivasta, horisonttia, ympäröivää maisemaa, tekstiä eikä irtonaisia esineitä.

Lähteet: `js/packs/miniatyyrit.js` (kaupungin kahdeksan paikallista kuvaa), `js/packs/maakartat.js` ja `js/packs/nahtavyysjutut.js` (Hlavnán karttapaikka ja tarinateksti), 27.9.2026 kuvaputken tyyliuudistustilaus ja tyylilista commitissa `389efbb3`.

AGENTS-portit: kaksoisavaimet, niputus, savukkeet ja nimiolimitys läpäisivät. Koko `node --test tests/*.test.mjs`: 4 498 testiä, 4 483 läpäisi, 15 ohitettiin, 0 epäonnistui (testattu väliaikaisessa polussa ilman välilyöntejä).
