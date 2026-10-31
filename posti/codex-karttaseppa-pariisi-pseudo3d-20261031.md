# Codex → Karttaseppä ja PT: Pariisin pseudo-3D-koe, kaksi palasta (31.10.2026)

Toteutin tilauksen `35a40dedfbe304820fa84f42667e20705808a924` uusimmasta tekstistä ja tavuntarkistetuista v6-ohjekuvista. Molemmat pyydetyt koepalat on tehty. Tämä on **kokeen tulostoimitus, ei geometrian tai tuotantokäytön hyväksyntä**.

Kuvat ovat `proto-3d/_tyo/codex/pariisi-pseudo3d/pariisi-pseudo3d-r3-c4.png` ja `pariisi-pseudo3d-r3-c5.png`. Molemmat ovat RGB PNG, 3072 × 2048 px. Sisäinen ImageGen palautti 1536 × 1024 px originaalit; toimituskoko on mekaaninen 2× Lanczos-suurennos, ei alkuperäinen 3072 px generointi. Originaalit säilyvät liitekansion `native/`-hakemistossa. Kaksi kokonaista uutta generointia, yksi kummallekin palalle, v6-geometria ensimmäisenä ja G vain käsialan/värien referenssinä. Ei osapaikkauksia, geometriawarpauksia tai sauman peittämistä.

## Tulos ja rajat

Tavallisten talojen lämpimät julkisivut erottuvat paremmin, mansardikatot ovat siniharmaat. Maamerkkejä, puita, ihmisiä tai liikennettä ei lisätty. Pääreitit ja Seinen saarimuodot ovat pääosin tunnistettavia; maanpinnan kaikkien viivojen paikallaan pysymistä en vahvista. Yksittäiset talo-/korttelireunat ja katujen leveydet muuttuvat.

**Sauma ei läpäise vaatimusta.** Verrattaessa r3-c4:n oikeaa ja r3-c5:n vasenta 128 px kaistaa täsmälleen samojen pikselien osuus on 0,1354 %, ja RGB-kanavien keskimääräinen itseisarvoero on 23,9725/255. Sama mittaus lähdeohjekuville: 99,9508 % ja 0,0308/255. Myöskään lähtöohjeiden kaista ei siis ole aivan tavuntarkasti identtinen, mutta generoinnin ero on selvästi suurempi. En ole kopioinut kaistaa kuvasta toiseen peittääkseni tätä.

**En vahvista enintään 3 px geometriapoikkeamaa.** Raportin vesivärimaskin reunamittaus on vain värikynnyksiin perustuva diagnostiikka; se luokittelee myös joitakin sinisiä kattoja vedeksi, etenkin r3-c5:ssä, eikä ole semanttinen rantaviiva- tai katukeskilinja-auditointi. Sen prosentteja ei tule tulkita tarkaksi rantaviivan virheeksi. Sauman hylkäys on suora pikselivertailu.

Toimitetun osuudet.py:n luokittelukaavoilla koko r3-c4:n seinäosuus kasvoi 17,726 → 26,238 % ja katto-osuus muuttui 14,532 → 10,763 %. r3-c5:ssä seinäosuus kasvoi 14,272 → 18,889 % ja katto-osuus muuttui 11,756 → 9,856 %. Oikean palan laaja paperialue ja puisto pienentävät koko kuvan rakennusosuuksia, joten nämä eivät ole vain tavallisen kaupungin rajauksen mittareita. Mittarin puu-luokka tarkoittaa tässä vihreitä pikseleitä/puistoja, ei lisättyjä puita. Tarkat mediaanivärit ovat JSON-raportissa.

## Handoff

Pyydän Karttaseppää arvioimaan nämä G:n rinnalla ja tekemään oman geometria-/saumavertailunsa. Nykyinen koe ei anna perustetta aloittaa 35 palan kokonaistuotantoa tällä menetelmällä. Lähteen varasuunnitelma, jossa tavalliset talot maalataan erillisinä ja sijoitetaan koodilla, säilyttää karttaverkon hallinnan; jo hyväksytyt 9 maamerkkiä ja 44 muuta yksityiskohtaa pysyvät käytettävissä eikä niitä tehty uudestaan.

Liitteet `posti/codex-pariisi-pseudo3d-koe-20261031/`: manifesti, SHA256SUMS, originaalit, promptit, lähdetarkistus, generointiprovenienssi ja QA-mittarit. Kokeen toimitus ei ole PT:n tai omistajan hyväksyntä, runtime-kytkentä eikä pelijulkaisu.

SHA256:
- `pariisi-pseudo3d-r3-c4.png`: `5ba0944118966448cf99f8a6eca8a73a7426c28621a0e689febf622a95dae9ac`
- `pariisi-pseudo3d-r3-c5.png`: `394f4fb826a6101bbc2afb57f6b49966db173b9a3622e6b9682b925cdc05c01f`

Karttatiedot © OpenStreetMap contributors.
