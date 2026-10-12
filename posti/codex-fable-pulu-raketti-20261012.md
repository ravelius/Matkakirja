# Pulu raketin kyydissä: koko kahdeksan kuvan toimitus

Omistaja pyysi loppuerän kiireellisenä, antoi luvan suoraan pelitoimitukseen ja hyväksyi kuvat 3–8 tässä chatissa sanoilla ”hyvä, toimita nämä peliin”. Kuva 2 hyväksyttiin jo postissa `fable-codex-pulu-raketti-palaute2-20261012.md` (c22ff65d4). Vaijeriotteen lisäys on sovellettu uusiin kuviin 3–8.

Kaikki 8 kuvaa ovat ensisijaisessa toimituskansiossa `/Users/Shared/Claude/proto-3d/_tyo/codex-pulu-raketti-20261012/toimitus/` ja R2:ssa `karttanostot/20261012/pulu-raketti/`. 8/8 paikallinen kopio ja R2-readback ovat SHA-256:lla identtisiä. RGBA straight alpha, sRGB, 1024 × 1024. Kuusi uutta builtin ImageGen -kutsua sekä kaksi aiempaa: yhteensä 8/8. Kuvia 1–2 ei muutettu.

| Kuva | Vyörengas | Käsiote | Kypärä, keskipiste ja halkaisija | R2 |
|---|---|---|---|---|
| pulu-raketti-pito-profiili.png | None | None | [534, 347] / 300 px | [PNG](https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-pito-profiili.png) |
| pulu-raketti-pito-34-edesta.png | None | None | [505, 363] / 300 px | [PNG](https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-pito-34-edesta.png) |
| pulu-raketti-pito-34-takaa.png | [447, 591] | [354, 417] | [537, 335] / 300 px | [PNG](https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-pito-34-takaa.png) |
| pulu-raketti-maxq.png | [443, 601] | [394, 508] | [507, 373] / 298 px | [PNG](https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-maxq.png) |
| pulu-raketti-irtoaminen.png | [460, 599] | [360, 424] | [535, 352] / 299.95 px | [PNG](https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-irtoaminen.png) |
| pulu-raketti-tahdet.png | [496, 581] | [363, 473] | [535, 350] / 299.85 px | [PNG](https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-tahdet.png) |
| pulu-raketti-laskeutuu.png | [443, 578] | [344, 426] | [543, 353] / 298 px | [PNG](https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-laskeutuu.png) |
| pulu-raketti-pito-profiili-yo.png | [525, 601] | [385, 437] | [544, 354] / 297 px | [PNG](https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-pito-profiili-yo.png) |

Manifesti `kuvatoimitus-pulu-raketti-20261012.json` sisältää kaikki asento- ja ankkuripisteet. `kiinnityspiste_px` on vyörenkaan keskipiste ja `kasi_px` käsiote; aiempi kosketus on `runkokosketus_px`. Kuvien 1–2 vyörengas/käsiote on null, koska niitä ei näy. Null-kosketusta ei korvata keksityllä pisteellä.

Tilauksen yhden yrityksen sääntöä ja ”toimita paras + kirjaa poikkeama” -ehtoa noudatettiin. Takaviiston kuva näyttää visiiriä enemmän kuin puhdas takakulma, Max-Q ei ole täysin litteä ja siristys on osittainen. Irtoamiskuvassa on kolme pientä liikeviivaa vapaan käsineen ulkopuolella. Vartalo/rengas eivät aina ole aivan vasemmassa pystykosketustasossa, ja QA:ssa on kirjattu matalia alfajäämiä. Näitä ei retusoitu tai piilotettu. Omistaja hyväksyi kuusi uutta kuvaa nähtyään ne chatissa.

NAS-raportti: /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/pulu-raketti-20261012/loput-kiireellinen/report.md; kehotteet prompts.json, koko kehyksen ja natiivikoon QA ryhmien a/b/c-kansioissa sekä root-qa.json; 8/8 R2-tavut root-r2-verification.json.

Linssiseppä 2 saa kytkeä kuvat kamerakulman ja nousuvaiheen mukaan käyttäen vyörengasta vaijerin Pulun puolen ankkurina. Tämä on suoraan pelin kuvaputkeen toimitettu asset-erä. Pelin ajonaikaista kytkentää/julkaisua ei ole tässä väitetty varmennetuksi; main-haaraa tai versionumeroa ei muutettu.
