# Meridiaaniportti 06 — mittahuomiot ja lukutapa

30.10.2026. Tilaukset #1299–1300. Toimitus sisältää kaksi SVG-vektoriviivapiirrosta ja niiden PNG-viennit. Värit ja koristeviivat ovat kaaviomaisia; ne eivät ole uusia mittalähteitä.

## Sitova kehys

| Piirros | Kuvakoko | Mittakaava | Vasen / ylämarginaali | Koordinaattialue |
|---|---|---|---|---|
| Pohja | 1830 × 1570 px | 8 px/m | 70 / 120 px | x −105…105, z −492…−352 m |
| Eteläjulkisivu | 2680 × 960 px | 12 px/m | 80 / 120 px | x −105…105, y −3…42 m |

Pohjan muunnos on `u = 910 + 8x`, `v = −2696 − 8z`; julkisivun `u = 1340 + 12x`, `v = 624 − 12y`. Kehys on jo kierretty lähteessä 2,03° palatsin akselille: uutta kiertoa ei tehdä. Origo on Taihedianin keskellä ja y = 0 aukion tasolla. Ruudukko on 1 m / 10 m. Mittakaavajanan 20 m vastaa pohjassa 160 pikseliä ja julkisivussa 240 pikseliä.

JSON:n mittoja ei ole korjattu. Julkisivun mitattua ulkosiluettia ja kerrosten maalattuja ääriviivoja seurataan PK:n PNG:stä niiltä osin, joilta JSON ei anna muotopisteitä tai sen nimellismitta poikkeaa PNG:stä. Rasterista luettu raja sisältää pikselipyöristyksen ja viivan paksuuden: siitä johdettu leveys ei ole uusi rakennuksen mittalähde. Jäljitystiedot ovat QA-aineistossa.

Oikean kulmapaviljongin alakaton kolme rasteririviä jää lähdekuvassa mittatekstin peittoon. Näissä kohdissa käytetään lähdekuvan vasemman vastineen tarkistettua 1236 pikselin siirtoa. Tämä rajattu täydennys on erotettu suoraan luetuista ääriviivoista QA:ssa.

## Lähteen sisäiset erot — ei muutettu

1. **Päälinnan räystäät.** JSON ilmoittaa räystäsalaksi 65,4 × 30,3 m [A]. Julkisivun PNG:ssä alakaton ääriviiva ulottuu noin u = 929…1750 ja yläkaton u = 953…1726 pikseliin, eli niiden näkyvät leveydet ovat noin 68,4 ja 64,4 m. Piirroksen siluetti seuraa PNG:tä; nimellinen 65,4 m säilyy erillisenä lähdearvona. Tämä ero pitää ratkaista PK:n mittapohjassa ennen 3D-mitoituksen hyväksyntää.
2. **Kulmapaviljongin katto ja sen takainen räystäs.** JSON:n nimellinen paviljonkikoko on 13,8 m [A]. Julkisivun PNG:n samalla korkeudella näkyvä ulkoneva räystäsviiva kattaa noin 16 m, joka vastaa myös siipigallerian nimellisleveyttä. Kolmiomainen katto-osa ja erillinen näkyvä räystäsviiva säilyvät lähteen mukaisina; niitä ei yhdistetä uudeksi paviljongin mittalähteeksi. Pohja-PNG:n selite kutsuu 13,8 m neliötä seinälinjaksi, JSON katon kooksi; tulkintaa ei korjata omin päin.
3. **Eteläpaviljonkien ulottuma.** Keskipiste z = −466,9 ja puolikas 13,8 / 2 johtavat eteläreunaan z = −473,8 m. Jalustan eteläraja on z = −473,2 m. Lähteen 0,6 m ylitys säilyy.
4. **Pylväiden leveys.** Päälinnan nimellinen 60,05 m [1] ja yhdeksän jännettä säilyvät. Reunimmaisten pylväiden paksuus ja palkkivöiden ääriviivat ovat PNG:ssä nimellisten mittaviivojen ulkopuolella. Koristeet rajataan vastaavien lähteen muotojen sisään; 60,05 m ei muutu uudeksi räystäs- tai ulkopintamitaksi.
5. **Ulkosivumuurin korkeus.** PNG:n yläreuna on y = 10 m. JSON antaa sivumuurin x/z-alueen mutta ei korkeutta. Julkisivun 10 m on siksi PNG:stä luettu esitystieto, ei uusi lähteellä varmistettu mitta. Sivumuurit eivät ole varsinaisen portin 126,9 m leveyttä.
6. **Jalustan lähde-erot.** Lähdeluettelo mainitsee korkeudet 12,00 m [1] ja 12,9 m [3]. Käytössä säilyy tilauksen 12,00 m. Leveydeksi säilyy 126,9 m [3], vaikka OSM-ääriviiva on noin 125,6 m. Pituudeksi säilyy koordinaateista 107,2 m; [3]:n 114,9 m ja mahdollinen luiskien vaikutus jäävät lähteen avoimeksi huomioksi.

## Arviot ja avoimet kohdat

**[A] tarkoittaa edelleen arviota ilman mittalähdettä.** Näitä ovat harmaan sokkelin 0–3 m korkeus, päälinnan kerrosrajat ja räystäsala, kaide 12–13 m, etelän aukkojen koot ja paikat, siipigallerioiden koko/paikka/harjakorkeus sekä kulmapaviljonkien koko/paikka/huippu. Myös päälinnan keskipiste z = −379,5 on lähteen huomautuksessa arvio. Piirrokset eivät nosta niitä varmennetuiksi mitoiksi.

Etelässä esitetään kolme suorakulmaista aukkoa. Pohjoisen sivuaukkojen paikka ja koko puuttuvat, eikä niille muodosteta uusia tarkkoja mittoja. Siipigallerioiden 13 jännettä [1] säilyvät.

Kello- ja rumpupaviljongit esitetään katkoviivaisina **paikka avoin** -selitteinä mittakehyksen ulkopuolella. Niiden koko ja koordinaatit ovat tuntemattomat; selite ei ole uusi sijoitus tai mitoitus.

Kattotiilirivit, harjakoristeiden viivat, palkkivöiden kuviot, kaidejako ja ovikehykset ovat havainnekuvan mukaisia kaaviomaisia koristeita, rajattuina lähteen ääriviivoihin. Niiden pienosia ei tule lukea erillisiksi todellisiksi mitoiksi. Pohjassa oleva katkoviivainen OSM-vertailuääriviiva on erotettu varsinaisesta symmetrisestä mittapohjasta.

## Lähteet ja oikeudet

Toimeksianto: `posti/pelikoodari-codex-mittapiirrokset-portti06-20261030.md`, commit `77f0c59566fe9f13d357d8e90604a763a8ff906b`, blob `06c5772ce4ef61911210a1437d5a8972144822ae`. Pääohje, kolme kehys-JSONia ja koko mittaluettelo on luettu. Lähteen yhdeksän SHA256SUMS-liitettä on tavutarkistettu.

Lähdenumerointi säilyttää PK:n mittaluettelon viittaukset; tämä toimitus ei väitä tehneensä uutta rakennusmittausta tai verkkolähteiden riippumatonta faktantarkistusta:

- [1] Palace Museum: https://www.dpm.org.cn/explore/building/236454.html
- [2] Zhihu: https://zhuanlan.zhihu.com/p/572685765
- [3] Chongqing Science & Technology News, 9.6.2020: https://epaper.cqrb.cn/kjb/2020-06/09/13/content_262592.htm
- [4] OpenStreetMap way/638156366, © OpenStreetMap contributors, ODbL 1.0; PK:n akselikehykseen muunnettu pohja. https://www.openstreetmap.org/way/638156366
- [5] Wikipedia zh, 午門 (北京), PK:n taustaviite: https://zh.wikipedia.org/wiki/午門_(北京)
- [A] Lavastajan rakennukset-v83:sta arvioidut mitat, kuten PK:n lähde kertoo.

Piirrokset ovat deterministisesti tuotettuja vektoreita; rasterivalokuvia ei ole upotettu SVG:ihin. PNG:t on rasteroitu SVG:istä. Alkuperäiset mittapohjat ja aiemmat 215-kuvat/mallit säilyvät muuttumattomina.

## Vastaanotto

Oma tarkistus ei korvaa PK:n päällekkäisvertailua mittapohjaan ja peliin. PK vie piirrokset PT:lle; omistaja hyväksyy julkisivun KK-kortilla ennen 3D-työtä. Tämän erän toimitus, vastaanotto, omistajahyväksyntä, pelikytkentä ja julkaisu ovat erilliset tilat.
