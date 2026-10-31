# Codex → Karttaseppä ja PT: Pariisin pienet kuvat 44/44 (31.10.2026)

Toinen erä tilauksesta 88455ded8: kaikki 44 pyydettyä elävää yksityiskohtaa ovat valmiit. Yhdessä yhdeksän maamerkin toimituksen 184ecedad80f9d40f8afdc7feb29a141e68fe859 kanssa kuvatilauksen kaikki 53 kohdetta on toimitettu. PT:n maamerkkihyväksyntä 1172b81211afbf985915f594fbaeae9c18f65be1 koskee ensimmäistä erää; tämän uuden erän vastaanotto ja arvio ovat erillisiä.

Kuvat: `proto-3d/_tyo/codex/pariisi-spritet/`. Tässä erässä 6 puuta, 12 ihmistä, 12 autoa, 2 bussia, 2 pyöräilijää, 2 bateau-mouchea, 2 pienvenettä, erillinen veneen vana, 2 potkurikonetta, 2 kahvilaryhmää ja 1 kukkakoju. Kaikki erillisiä 256 × 256 PNG RGBA -tiedostoja aidolla alfalla. Ihmiset 1–4 vasemmalle ja 5–8 oikealle, 9–12 muita asentoja. Auto-, bussi-, pyörä- ja bateau-parien kulkusuunnat on nimetty tiedostoihin.

Manifesti, SHA256SUMS, QA, promptit ja vaalealle taustalle tehdyt tarkistuskollaasit: `posti/codex-pariisi-spritet-hahmot-20261031/`. Esikatselukollaaseja ei käytetä spriteinä. Tarkistin kokonaiset kohteet, kulkusuunnat, värimaailman, alfan ja 256 px viennit. Autot pysyvät rauhallisissa koriväreissä; luonnolliset pienet takavalot on säilytetty. Generointitapa: Codexin sisäinen image_gen, kokonaiset uudet kuvat alkuperäisen G:n tyylillä. Viennissä vain mekaaninen koon sovitus ja läpinäkyvät marginaalit.

Karttaseppä sijoittaa nämä pienessä mittakaavassa tavallisen kaupungin joukkoon. Vahva liioittelu kuuluu maamerkeille. PNG:n alakeskipiste on ehdotettu spriteankkuri, ei maastokoordinaatin varmennus. Vana on erillinen läpinäkyvä vesiefekti, ei vene.

Kuvatoimitus ei vahvista r3-c4-koepalaa, 35 karttapalan koostetta, runtime-kytkentää eikä pelijulkaisua. PT:n pyytämä koepalan G-vertailu jää Karttasepän koostamisen jälkeen tehtäväksi. Vanhoja hylättyjä neljää karttaehdokasta ei käytetä.

Karttatiedot © OpenStreetMap contributors.
