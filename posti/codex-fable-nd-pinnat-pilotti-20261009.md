## Codex → Fable / LR: Notre-Damen pintapilotti #57 — kaksi näytettä, kohdistus ei läpäise rajaa

Tilaus ja kaikki 27 liitettä luettu/tarkistettu. Kaksi kokonaan uutta pintagenerointia, yksi per näkymä. Ensimmäiset kaksi työkalupyyntöä hylättiin ennen generointia liian monen viitepolun vuoksi; molemmat korjattiin 5 viitteeseen (puhdas ortokuva, rakennusmaski, aukkomaski ja kaksi materiaalikuvaa). Varsinaisia generointeja 2/2; ei lisävariantteja eikä uusia ND-näkymiä.

**Ei hyväksytty projektioon:** etelän IoU 0,92043 ja kattojen 0,92615 alittavat 0,97:n. Aukkojen automaattisen esitarkistuksen mediaanit noin 0,696 m ja 1,118 m ylittävät 0,15 m:n. Arvio ei korvaa LR:n kohdistusta, ja erityisesti katon ohuiden portaaliprojektioiden tunnistus on epävarma.

| Kuva | Mitat | PNG |
|---|---|---|
| nd_etela | 4088 × 2981 | [Kuva](https://media.matkakirja.app/julisteet/omat-mallit-pinnat/20261009/nd_etela_codex_v1.png?t=5d954fc145ad857f) |
| nd_katot | 4088 × 2557 | [Kuva](https://media.matkakirja.app/julisteet/omat-mallit-pinnat/20261009/nd_katot_codex_v1.png?t=0d8b7e05fb4943db) |

PNG RGBA/sRGB, todellinen alfa säilytetty. Natiivit: etelä 1469 × 1071, katot 1586 × 992; koko kehys suurennettu Lanczos-menetelmällä tilaajan täsmälliseen 4088 × 2981 / 4088 × 2557 kehykseen. Ei rajattu, kohdistusväännetty, maalattu tai pakotettu lähdemaskiin. Maski-IoU mittaa tuotettua alfaa, eikä hyväksyntärajaa ole saavutettu keinotekoisesti.

Description/Source-metatiedot ja saate: Havainnekuva. Tekoälyllä tuotettu, ei valokuva. Näkyvissä pikseleissä ei AI-merkintää. R2-esiluku ja HTTP 200/MIME/CORS/SHA-256/tavulleen paluuluku tehty ?t-parametrilla; olemassa olevia objekteja ei ylikirjoitettu.

Kuvakohtainen QA:

### nd_etela

- Siluetin IoU 0.92043 alittaa 0,97:n. Kehys on 4088 × 2981, mutta generoitu rakennus on hieman liian suuri/siirtynyt alkuperäiseen maskiin nähden.
- Aukkojen automaattisen esitarkistuksen mediaani 0.696 m (0.451 % kuvan leveydestä) ylittää 0,15 m:n. Tämä on tummien alueiden arvio; LR:n lopullinen geometrinen kohdistus on tekemättä.
- Läpinäkyvyyden reunassa on matalan alfan puna/keltahäivettä; täysin peittäviä kylläisiä reunapikseleitä 55. Valkoisella taustalla häive on heikko, mutta alphareunat on tarkistettava projektiossa.
- Valokuvamainen kermankeltainen kivi, hopeanharmaa lyijy ja vihertävä pronssi vastaavat materiaalibriefiä. Ei taivasta, eläviä ihmisiä, ajoneuvoja, telineitä, nostureita, puita, tekstiä, ruudukkoa tai ohjeen merkintöjä havaittu. Patsaat ovat malliin kuuluvia.
- 51 tekstuuripalaa tarkistettu; ei tavulleen toistuvia 96 px-paloja. Myöskään selvää suurten laikkujen kopiotoistoa ei havaittu. Tämä ei todista jokaisen yksityiskohdan ainutkertaisuutta.
- Työkalun natiivi [1469, 1071] suurennettu koko kehys säilyttäen minimikokoon. Ei maskipakotusta, geometriakorjausta, paikallista maalausta tai referenssivalokuvien liittämistä.
- Osa ikkunan kivikehyksistä/ikkunalaseista ja spiiran aukot poikkeavat ohjeesta. Keskigableen tuli pieni uusi tumma pystyrako; sen paikkaa ei ole aukkomaskissa. Ei varsinaista suurta ruusuikkunaa lisätty.

Eroavat aukot (esitarkistus; kaikki tarkat koordinaatit manifestissa):

- Aukko 1 @ [2153.0391341991344, 1105.3924675324674]: 0.683m, 0.443% kuvan leveydestä
- Aukko 2 @ [489.0075728890572, 1293.1987126088602]: 1.025m, 0.664% kuvan leveydestä
- Aukko 3 @ [617.0190079515335, 1293.1982960999621]: 0.987m, 0.640% kuvan leveydestä
- Aukko 4 @ [2199.1572413793106, 1122.6275862068965]: 0.595m, 0.386% kuvan leveydestä
- Aukko 5 @ [2106.0, 1406.5]: 0.663m, 0.430% kuvan leveydestä
- Aukko 6 @ [2158.0, 1406.5]: 0.249m, 0.162% kuvan leveydestä
- Aukko 7 @ [2209.0, 1406.5]: 0.373m, 0.242% kuvan leveydestä
- Aukko 8 @ [946.5398163052741, 2006.9639238708455]: 1.031m, 0.669% kuvan leveydestä
- Aukko 9 @ [1108.0162389174054, 2007.1845076994866]: 0.910m, 0.590% kuvan leveydestä
- Aukko 10 @ [1262.4926150350313, 2006.9564476424919]: 0.929m, 0.602% kuvan leveydestä
- Aukko 11 @ [1411.0086745639398, 2007.1329167055312]: 0.722m, 0.468% kuvan leveydestä
- Aukko 12 @ [1558.5398163052741, 2006.9639238708455]: 0.648m, 0.420% kuvan leveydestä
- Aukko 14 @ [1856.4926150350313, 2006.9564476424919]: 0.510m, 0.330% kuvan leveydestä
- Aukko 15 @ [2048.51545095221, 2060.2399089711344]: 0.570m, 0.370% kuvan leveydestä
- Aukko 16 @ [2176.4895833333335, 2060.188098659004]: 0.580m, 0.376% kuvan leveydestä
- Aukko 17 @ [2492.4407749889915, 1936.166006164685]: 0.655m, 0.425% kuvan leveydestä
- Aukko 18 @ [2647.491024682124, 1961.7718773373224]: 0.708m, 0.459% kuvan leveydestä
- Aukko 19 @ [2796.453296703297, 2007.0065365668813]: 0.810m, 0.525% kuvan leveydestä
- Aukko 20 @ [2941.460183694726, 2006.9639238708455]: 0.973m, 0.630% kuvan leveydestä
- Aukko 21 @ [3074.9837610825944, 2007.1845076994866]: 1.142m, 0.740% kuvan leveydestä
- Aukko 22 @ [3207.4515884305356, 2007.1003319108581]: 0.744m, 0.482% kuvan leveydestä
- Aukko 23 @ [2303.5, 2060.291397076444]: 0.589m, 0.382% kuvan leveydestä
- Aukko 24 @ [2492.0181391378574, 2046.913358941528]: 0.726m, 0.471% kuvan leveydestä
- Aukko 25 @ [2642.087155963303, 2074.3795871559632]: 0.515m, 0.334% kuvan leveydestä
- Aukko 26 @ [301.0, 2287.0]: 2.464m, 1.597% kuvan leveydestä

### nd_katot

- Siluetin IoU 0.92615 alittaa 0,97:n. Kehys on 4088 × 2557, mutta generoitu rakennus on hieman liian suuri/siirtynyt alkuperäiseen maskiin nähden.
- Aukkojen automaattisen esitarkistuksen mediaani 1.118 m (0.725 % kuvan leveydestä) ylittää 0,15 m:n. Tämä on tummien alueiden arvio; LR:n lopullinen geometrinen kohdistus on tekemättä.
- Läpinäkyvyyden reunassa on matalan alfan puna/keltahäivettä; täysin peittäviä kylläisiä reunapikseleitä 4. Valkoisella taustalla häive on heikko, mutta alphareunat on tarkistettava projektiossa.
- Valokuvamainen kermankeltainen kivi, hopeanharmaa lyijy ja vihertävä pronssi vastaavat materiaalibriefiä. Ei taivasta, eläviä ihmisiä, ajoneuvoja, telineitä, nostureita, puita, tekstiä, ruudukkoa tai ohjeen merkintöjä havaittu. Patsaat ovat malliin kuuluvia.
- 68 tekstuuripalaa tarkistettu; ei tavulleen toistuvia 96 px-paloja. Myöskään selvää suurten laikkujen kopiotoistoa ei havaittu. Tämä ei todista jokaisen yksityiskohdan ainutkertaisuutta.
- Työkalun natiivi [1586, 992] suurennettu koko kehys säilyttäen minimikokoon. Ei maskipakotusta, geometriakorjausta, paikallista maalausta tai referenssivalokuvien liittämistä.
- Suoraan ylhäältä ja ohjeen suunta säilyy pääpiirteissään; harjat ja alaoikean uloke tunnistettavia. Paneelien jako on valokuvamainen, mutta 0,5–0,6m levyväliä sekä kaikkia porrastettuja poikkisaumoja ei ole mitattu. Lappeiden liitoksissa on paikallista tummaa syvyysvarjostusta; auringon/ulkopuolisen ympäristön heittovarjoja ei havaittu.

Eroavat aukot (esitarkistus; kaikki tarkat koordinaatit manifestissa):

- Aukko 1 @ [289.0166270783848, 573.5605700712589]: 1.027m, 0.666% kuvan leveydestä
- Aukko 2 @ [299.8205128205128, 1295.2948717948718]: 1.209m, 0.784% kuvan leveydestä

### Materiaalireferenssien attribuutio

- [ref-etela-01.jpg](https://commons.wikimedia.org/wiki/File:Paris_Notre-Dame_cathedral_south_facade_20170527_(02).jpg), xiquinhosilva, [CC BY2.0](https://creativecommons.org/licenses/by/2.0/). Käyttö vain materiaalin/värin/kulumisen referenssinä; uusi AI-generointi, ei kuvan sommittelun tai pikselialueiden kopioliittämistä.
- [ref-katto-04.jpg](https://commons.wikimedia.org/wiki/File:Notre_Dame_(15051055268).jpg), Schezar, [CC BY2.0](https://creativecommons.org/licenses/by/2.0/). Käyttö vain materiaalin/värin/kulumisen referenssinä; uusi AI-generointi, ei kuvan sommittelun tai pikselialueiden kopioliittämistä.
- [ref-katto-02.jpg](https://commons.wikimedia.org/wiki/File:FW_Dach_Notre_Dame_de_Paris.jpg), Freedom Wizard, [CC BY3.0](https://creativecommons.org/licenses/by/3.0/). Käyttö vain materiaalin/värin/kulumisen referenssinä; uusi AI-generointi, ei kuvan sommittelun tai pikselialueiden kopioliittämistä.

Ohjekuvat ja maskit ovat LR:n omasta mallista. Googlen kuvia tai laattoja ei käytetty. Erillinen projektiodokumentti ja LAHTEET.md eivät löytyneet tarkistetusta main-versiosta tai paikallisista kohdepoluista; tilausviestin kaikki seitsemän sitovaa kohtaa ja tekijä-/lisenssitaulukko olivat saatavilla ja luettiin kokonaan.

Manifesti `posti/kuvatoimitus-nd-pinnat-pilotti-20261009.json` sisältää promptit, natiivikoot, SHA-256:t, käytetyt viitteet ja täydelliset mittaukset. Näytteet LR:n tarkistukseen; vastaanottokuittaus, sisältöhyväksyntä, LR:n projektion hyväksyntä, pelikytkentä ja julkaisu ovat avoimia. Ei main-mergeä, versionnostoa, pelikytkentää tai julkaisua. Pilotin kaksi varsinaista generointia on käytetty; uusia näkymiä tai uusia generointeja ei aloiteta ilman erillistä päätöstä.
