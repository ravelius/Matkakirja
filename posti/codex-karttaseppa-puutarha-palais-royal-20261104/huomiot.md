# Palais-Royal — tilaus #1983 / 15f

Lähdeposti `posti/karttaseppa-codex-puutarhat-def-20261104.md`, commit `2154d7454c9e3c4145b0b177bc0302ce967ab569`, blob `22913f390432fd9f77548549d1fb52ae9594b658`. TILAUS.md ja kaikki 10 manifestitiedostoa luettu/tarkastettu ja SHA256-varmennettu. **Yksi varsinainen ImageGen-kutsu, yksi uusi kuva. Ei 15a–c-kuvien uusintaa. Puut sisältyvät tähän tilaukseen.**

PNG **1536 × 1024 RGBA**. Generoidut tavut ja alfa säilytetty muuttamattomina. SHA256 `356c8433c07de94480461a62572675b5d0691426d8bbb4542828c324f4463ae5`. Maski SHA256 `76c29a43219c338ede7921bb86c17079196403dfb3d54d2dac2f5f8e3fa9108e`.

## Alfa

Näkyvän siluetin ero maskiin (alpha ≥ 128, XOR): **5413 px** = 4602 ulkopuolella + 811 puuttuu sisältä. IoU 0.976983.

Täsmälliset alfa-arvot eroavat 0/255-maskista 240975 pikselissä; tähän sisältyy myös sisustan alpha254 vs maskin255, ei pelkkä ääriviivavirhe. Alfa min/max [0, 254]. Kahden pikselin reunavyöhykkeen ulkopuolella 5807 pikseliä alfa>0, 2641 alfa≥16 ja 2095 alfa≥128. Kahdella pikselillä sisennetystä maskista puuttuu 3 pikseliä alfa128-kynnyksellä. **Täsmällinen maski/max2px/ei-haloa-ehto ei läpäise.**

## Mitat ja sävyt

Pitkittäisten pääkäytävien vaaleat sisukset 13,75 ja 12,75 px; poikkikäytävän sisus 5,25 px. Tummat reunat eivät sisälly; koko pääkäytävän tarkkaa 12–15 px rajaa ei vahvisteta. Menetelmä: kohtisuora profiili natiivikuvasta 0,25 px askelin, lähin pikseli, vaalea sisus R≥222/G≥190/B≥137/alfa≥128; epävarmuus noin ±2 px. Tämä ei ole reunamusteen sisältävä kokonaisleveys.

4 riviä × 23 latvusta = 92. Otannassa latvuksen leveys rivin poikkisuuntaan noin 34–42 px, tavoite 24–30 px. Laskenta tarkistettu 19 astetta käännetystä, vain QA-käyttöön tehdystä kuvasta; natiivikuvaa ei muutettu. qa/crowns-counted.jpg ja crown-count-locations.json säilyttävät jokaisen lasketun latvuksen paikan.

- center: vesialueen rajauksen keskipiste [758.0, 516.5], tavoite [761, 518], poikkeama [-3.0, -1.5] px; vesialueen rajaus [87, 86] px.

Altaiden mittaus käyttää käsin valitun alueen suurinta yhtenäistä harmaata vesialuetta ja sen rajauslaatikkoa; vaalea reunus ei sisälly vesimittoihin. Keskipisteet likimääräisiä, eivät pelin kytkentäkoordinaatteja.

**Näkyvän puuttoman nurmen otantakeski-RGB: 205.96 / 171.38 / 102.5.** Minimi 200 / 175 / 105; kaikki kolme kanavaa eivät yllä minimiin. Mittaus: 7 käsin valittua ja visuaalisesti tarkistettua 16×16 px nurmialuetta, alfa≥128 ja lähdemaskin sisällä, alkuperäiset RGB-arvot ilman taustayhdistelmää. Näytteet kattavat avoimia nurmikohtia, eivät kaikkia nurmipikseleitä. Ruutujen paikat ja yksittäiset keskiarvot QA-tiedostossa. Koko kuvan aiempaa väriluokittelua ei käytetä nurmituloksena, koska puut/vedet vääristävät sitä.

Neljä suoraa tiheää puuriviä, kaksi kummallakin pitkällä sivulla. Käsin laskettu 23 latvusta/rivi eli 92 latvusta. Keskiosa on avoin; yksi allas ja neljä poikkikäytävää. Ei palatsia, pylväikköjä, rakennuksia, ihmisiä tai tekstiä. Latvukset ovat leveyssuunnassa tavoitetta suurempia ja altaan vesialue on noin 87 × 86 px tavoitteen noin 70 px sijaan. Nurmen vihreä ja sininen kanava sekä alfaraja poikkeavat ohjeesta.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT.** Tämä on yhden sallitun oton arviointitoimitus poikkeamineen. Vastaanottajan arvio, mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä eikä niitä väitetä varmennetuiksi.

Natiivi, koko kehote, mittausruudut ja QA: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-palais-royal`. Työkalu: sisäänrakennettu image_gen.
