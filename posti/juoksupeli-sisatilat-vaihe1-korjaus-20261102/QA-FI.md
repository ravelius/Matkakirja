# Yangxindianin korjaus #1721 – tekijän tarkistus

Tila: paikallinen 7 tiedoston korjauspaketti, tekninen ja visuaalinen tekijäntarkistus tehty. Riippumaton lopputarkastus ja Lavastajan kuittaus ovat seuraavat vaiheet. Ei 3D:tä, peli-integraatiota, postilähetystä tai julkaisua.

## Tilaus ja rajaus

Korjaustilaus `posti/lavastaja-codex-sisatilat-vaihe1-korjaus-20261102.md`, commit `9fc5e0026a01c8646b4a80885d4da73bd76578b1`, blob `8c127ceffc9f1be3329eda54480b2c3f009f58da`, luettu kokonaan. Lähtötoimitus: #1718–1719 / commit `6c01ceea3`.

Paketti sisältää ainoastaan Yangxindianin pohjan ja eteläseinän SVG+PNG, päivitetyn `mitat.json`-tiedoston, tämän QA:n sekä `SHA256SUMS`-manifestin. Chuxiugong hyväksyttiin korjaustilauksessa sellaisenaan. Sen piirroksiin tai aineistoon ei ole tehty muutoksia. Muita Yangxindianin seinäkuvia ei tuotettu uudelleen.

## Toteutettu geometria

- Pääsali säilyy 36 × 12 m: x=0..36, y=3,6..15,6. Ulkomittojen vertailukehys on 36 × 15,6 m; se on rakennuksen rajalaatikko, ei täysi suorakulmainen sisälattia.
- Suljettu 卷棚抱厦-kuisti on vain länsi- ja keskijänteen edessä: x=0..24,2, y=0..3,6. Kuistin lattia z=0,00 m on samassa tasossa kuin salin lattia. Jänteen raja x=24,2 perustuu aiempaan hyväksyttyyn [A]-jänneverkkoon. Rakennuksen porrasraja kulkee (0,0) → (24,2,0) → (24,2,3,6) → (36,3,6) → (36,15,6) → (0,15,6).
- Itäedusta x=24,2..36, y=0..3,6 on pihakivetystä ja ulkotilaa. Siellä salin etuseinä on y=3,60 m. Pihakivetyksen korkeus on havainnollistava [A], ei uusi mitattu porrastus lattian korkeudessa.
- Kuistin etuseinään lisättiin ikkunaristikot. Länsi- ja keskikuistin rajalle x=11,6 lisättiin puusermi. Sen tarkka sijoitus, korkeus 3,3 m, paksuus 0,16 m ja kulkuaukko y=1,0..2,4 ovat [A]-sovitus; D1 vahvistaa sermityypin ja erottavan tehtävän, ei näitä metrikoordinaatteja. Kuistin uudet seinäpaksuudet ja ikkunoiden paikat/koot ovat [A].
- Pääoven keskipiste x=18, leveys 2,4 m ja olemassa olevat kulkuaukot y=0 sekä y=3,6 säilyvät. Kulku kulkee pihalta kuistin kautta saliin. Uutta ovea ei lisätty. Pihan eteläportin 养心门 kujaliitos kuuluu PK:n reittidataan.
- Kuusi lisäneliöpilaria N1–N6: kaksi per jänne. Poikkileikkaus 0,40 × 0,40 m on [A]. Niiden määrä ja neliöpilarityyppi ovat D1:stä ja korjaustilauksesta. Keskukset ovat aiemman pääsalin eturäystään pylväslinjassa y=3,85 m [A], x-akselivälien kolmannespisteissä [A]. Pylväitä ei siirretty kuistin ulkoseinään.
- Eteläkuva on ortografinen syvyyskooste. Vasen=itä. Kuistin ikkunaseinän taso y=0,00 m ja itäjänteen saliseinän taso y=3,60 m on merkitty erikseen. Pieni pohjakatkelma näyttää syvyyseron. N1–N4 ovat kuistin takana ja näkyvät katkoviivaprofiileina; N5–N6 ovat itäjänteen etulinjalla. Kaikkien lisäpilarien x/y ovat samat pohjassa ja koosteessa. Lattiatasoa ei porrastettu.

| Pilari | Jänne | x / m | y / m | poikkileikkaus / m [A] |
|---|---|---|---|---|
| N1 | west | 4.200000 | 3.85 | 0,40 × 0,40 |
| N2 | west | 7.900000 | 3.85 | 0,40 × 0,40 |
| N3 | central | 15.800000 | 3.85 | 0,40 × 0,40 |
| N4 | central | 20.000000 | 3.85 | 0,40 × 0,40 |
| N5 | east | 27.966667 | 3.85 | 0,40 × 0,40 |
| N6 | east | 31.733333 | 3.85 | 0,40 × 0,40 |

## Mittalähteet ja hyväksyttyjen arvioiden säilyminen

Korjaustilaus soveltaa D1:n tekstikohtia `明间、西次间接卷棚抱厦。` (kuisti vain keski- ja länsijänteessä), `窗外抱厦内围有木屏，与明间相隔` (puusermi) ja `前檐檐柱位，每间各加方柱两根，外观似9间` (kaksi lisäneliöpilaria per jänne). 3,6 m = OSM-kehyksen 15,6 m − DPM-salin 12 m; tarkka x-rajauksen ja seinä-/pylväsakselien suhde jää [A]-tulkinnaksi.

Aiemmat hyväksytyt kalusteet, huoneet, sisäväliseinät, pääpylväsverkko, seinäpaksuudet ja korkeudet on säilytetty arvoiltaan muuttumattomina. D2/D3:n länsikamarin, käytävän ja Sanxitangin lähdelukuarvot säilyvät. Niiden soveltaminen vapaisiin huonekehyksiin on edelleen [A], koska alkuperäinen sisäpinta-/akseliviite ei ole varmennettu. Puyi–Wanrong-kauden tarkan kalustuksen vastaavuus jää avoimeksi.

Yangxindianin `bodySouth_m` korvattiin rakenteilla `frontHall`, `porch`, `outdoorAreas`, `footprint`, `additionalSquareColumns` ja `southComposite`. Chuxiugongin tietue on vertailtu identtiseksi alkuperäiseen; sen vanhaa rakennetta ei muutettu.

## Tekniset ja visuaaliset tarkistukset

- Molemmat PNG:t ovat häviöttömiä RGB-kuvia: pohja 5000 × 3000 px, eteläkooste 5000 × 2300 px, 254 ppi.
- SVG:n fyysinen koko on 500 × 300 mm / 500 × 230 mm. Mittakaava on 1:100, 100 px/metri; metriruudukko ja mittakaavajana näkyvät. Tulosta 100 %, ei sovitusta paperille.
- SVG:t ovat omaa vektorigrafiikkaa, eivät sisällä rasteritutkimuskuvia. Ei Imagegen-käyttöä.
- XML:stä tarkistettu 6 pilarin 0,40 m leveys ja yhteiset x/y-koordinaatit kummassakin piirroksessa, porrastettu ulkoraja, itäulkotila, kaksi vanhaa pääoviaukkoa, alkuperäiset mitatut huonekehykset sekä sivun sisään mahtuvat suorakulmiot.
- Lopulliset rasterit katsottu noin 2400 px tarkistuskuvina. Kuistin sulkeutuminen, itäpihan erotus, kuusi tunnistettua lisäpilaria, puusermi, ikkunat, syvyysavain ja tekstien luettavuus tarkistettu. Sermitekstin sijoitus korjattiin tarkistuskierroksella.
- Alkuperäisen tuotantokansion generaattorin ja toimitustiedostojen 24 SHA-256-tiivistettä verrattiin lähtötilaan: kaikki muuttumattomia. Lähtötiivisteet ovat myös `mitat.json`-tiedoston `originalFileSHA256`-kohdassa ja työjuuren `sources/original-SHA256.json`-tiedostossa.
- Tarkastusnäytöt työjuuressa: `qa/final-review-yangxindian-pohja.png`, `qa/final-review-yangxindian-seina-e.png`, `qa/correction-comparison.png`; tekninen tulos `qa/technical-verification.json`.

## Lähteet ja lisenssit

- **OSM-Y**: . https://api.openstreetmap.org/api/0.6/way/40606461/full.json
- **OSM-C**: . https://api.openstreetmap.org/api/0.6/way/40631826/full.json
- **D1**: Palatsimuseo: Yangxindian. https://www.dpm.org.cn/explore/building/236442.html
- **D2**: Palatsimuseo: lansikamari, 2023, painetut sivut 123–124. https://img.dpm.org.cn/Uploads/File/2023/07/19/u64b75fda11a18.pdf
- **D3**: Palatsimuseon luento 4.8.2022. https://www.dpm.org.cn/classify_detail/257945.html
- **D4**: Palatsimuseon tutkimus 2022, painetut sivut 91–92. https://www.dpm.org.cn/Uploads/File/2022/01/14/u61e0e8410e833.pdf
- **D5**: Palatsimuseo: Chuxiugong. https://www.dpm.org.cn/explore/building/236486.html
- **P1**: 养心殿东暖阁.JPG. https://commons.wikimedia.org/wiki/File:养心殿东暖阁.JPG
- **P2**: Cité interdite les chambres de la suite impériale (2).JPG. https://commons.wikimedia.org/wiki/File:Cité_interdite_les_chambres_de_la_suite_impériale_(2).JPG
- **P3**: Cité interdite les chambres de la suite impériale (3).JPG. https://commons.wikimedia.org/wiki/File:Cité_interdite_les_chambres_de_la_suite_impériale_(3).JPG

OSM © OpenStreetMap contributors, ODbL 1.0; käytetty vain mittalähteenä. Palatsimuseon tekstejä ja pohjia käytettiin tutkimusviitteinä. Commons P1: Gisling, CC BY-SA 3.0; P2–P3: Pierre André Leclercq, CC BY-SA 4.0. Kuvia ei upotettu, kopioitu tai jäljennetty toimituspiirroksiin; ne olivat aiemman hyväksytyn tyypittelyn ja materiaalien vertailuaineistoa. Piirrokset ovat omaa vektorituotantoa.

## Riippumaton lopputarkastus 2.11.2026

Pääagentti tarkisti molemmat lopulliset rasterit, mitat.jsonin hyväksyntärajat, 7 tiedoston manifestin sekä kaikki 24 alkuperäistiedoston SHA256-tiivistettä. Suljettu länsi-/keskikuisti, porrastettu itäulkotila, 2,4 m pääkulku, puusermi, kuusi lisäpilaria ja eteläkoosteen y=0 / y=3,6 syvyysmerkinnät näkyvät ja ovat keskenään johdonmukaiset. Teknisesti valmis Lavastajan katselmukseen; [A]-sijoitusten lähdevarmuutta tai vastaanottajan hyväksyntää ei väitetä.
