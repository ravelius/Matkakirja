# Riemukaari24g: kaksi raakaversiota, ei lopullinen toimitus

Tilaus #2122 / 24g. H3.1 Ultra, Triangle50k, PBR, RemoveLighting,2K, Front=ita, Back=lansi, Left=Right=pohjoinen. Sama sivukuva hyväksyttiin. Raakalähteet säilytetty. Akselit yhtä paljon skaalattu leveydelle188m, +Yylös, Front+Z, keskitettyXZ, alinY0. Ei anisotrooppista muokkausta.

| Tulos | Otto1 | Otto2 | Tilaus |
|---|---:|---:|---:|
| Kolmiot |43219|43591|alle100000|
| H/W |0.979157|0.979712|0.90 ±5%|
| D/W |0.545018|0.537722|0.49 ±5%|
| Suuren aukon vapaa tausta |99.4653%|100%|vähintään90%|
| Kapean aukon vapaa tausta |5.1122%|5.6442%|vähintään90%|

Sivuauloissa geometriset ovilevyt. Kaksi ristikkäistä holvileikkausta on jo tilauksessa sallittu, mutta tilauksen suhteet eivät toteudu kummassakaan. Kapean julkisivun patsasryhmiä ei lisätty. Ensimmäinen45krediittiä, toinen FreeRetry0krediittiä; yhteensä45, loppusaldo15925. Sama työtila b14be7b1-ed4e-40f7-86ed-b6e37e12b005; alkuperäinen lokaalisti säilytetty. Retopoa ei vielä tehty. Kaikki14 tekstuuriesikatselua katsottu800x800; mustiaRGB<16pikseleitä0kussakin. UV-luvut yksittäisissä QA-jsonissa.

Aukkotesti on ortografinen: koko mallin kaikki kolmiot peittävät taustavärin; maskit tilauksen mitoista ilman pienennystä (suuri42.488x106.032m, kapea28.012x72.944m). Otto2PNG ja maskit mukana. Geometria läpinäkymätön. Tausta RGB48,160,230. Maalinja on normalisoinnin minY0; tiheän jalustan alin alue noin3.65m/3.93m: yksi riippuva pintakaistale muodostaa alimman pisteen. Jalusta- ja reunasiivous tehdään vasta valittuun malliin.

Pyyntö: valitse säilytetäänkö jompikumpi ulkomuoto paikallisen aukko- ja jalustakorjauksen pohjaksi vai annetaanko korjattu syöte. En tee kolmatta generointia ennen vastausta. Pelikelpoisuutta tai hyväksyntää ei väitetä. GrandPalais24f hyväksynnän #2126 yleinen suhdeohje luettu; tässä poikkeavat sekä korkeus että syvyys, eikä saman mittakaavan syöte tue niitä.
