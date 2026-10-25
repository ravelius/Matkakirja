# Havainne 810 kohdittain: 01–07 vs. editoripari (Lavastaja 25.10.2026)

PT:n tehtävä 25.10. yöllä (Raamattu 7.20, tekotapa B kohta 11). Vertailun kohteena on ulkoasu: materiaalit, katot, värit, ovet ja
koristeet. Mitat ja paikat ovat todelliset (omistajan päätös 20.10. klo 07.30), eikä niitä sovitettu havainteeseen.

Editoripari: `tools/havainne-kamera.py` (kamera 810), mallit tausta-v46, rakennukset-v35, avoimet-v34/v35, muurikate-v14 ja
ulkorengas-v1. Editorissa ei ole leivottua valoa eikä pelin varjostimia, joten valo ja lattian kuvio näkyvät vain pelistä
otetussa parissa. Kuvaparit: `proto-3d/_tyo/linnanrakentaja/identtisyys-erot/b11-20261025/0N-pari.png`.

| Kohta | Paikka (pohja x, z, suunta) | Havainne | v46/v35 (editori) | Ero | Kenelle | Tila |
|---|---|---|---|---|---|---|
| 01 lähtökuja | −135,6, 350, −1,9° | kourutiililappeet ja pyöreät päätylaatat, sinivihreä palkkivyö, puu-/punaovet messinkirenkain, harmaat kiviaskelmat, harmaa kivijalka | tiilikuva ja päätylaatat (avoimet-v34), palkkivyö, ovet, kiviaskelmat V4_sokkeli | ei mallieroa | – | kunnossa |
| 01 | | kirkas kivilaattalattia, lämmin valo | lattia tasaväri (editori) | lattian laattakuvio ja valo | VS (laatta e7c4747c6), PK pelipari | VS |
| 02 punamuurikuja | −246,4, 318, −2,03° | punainen sileä muuri, keltainen tiilikate ja sinivihreä friisi, korkea harmaa tiilisokkeli, kaksi katollista porttia peräkkäin | muurit 4,0 m + harja, muurikate-v14 (friisi 0,45 m), sokkeli 1,2 m, kujaportit 2 ja 1 peräkkäin | muurikate jää kuvan yläreunan yli (todellinen 4,5 m muuri, kamera 3,8 m) | PK (kameran 810 rajaus) | PK |
| 02 | | lämpimät varjot | leivottu neutraalilla taivaalla (v46) | täytön viritys | VS | VS |
| 03 aukio | Taihemenin pohjoissuu 6,43, −190,73 | Taihedian ja sivuhallit pieninä kuvan yläosassa, valkoinen marmoriterassi kaiteineen | todellinen Taihedian (harja 35 m) ja kolmikerroksinen terassi: halli ja harja yläreunan yli, terassi valkoinen kaiteineen (V4_marmori 0,88) | sommitelma eroaa mittojen vuoksi | omistaja (aamun kysymys PT:n kautta) | omistaja |
| 03 | | terassi kirkkaan valkoinen | pelissä marmori laji 16 -kuvalla | terassin sävy pelissä | VS | VS |
| 04 sali (katto avattu) | juhlasali, keskikäytävä −147,6, 420,5, −2,06° | tasaisen viileän harmaa kivilattia, punaiset pylväät kivijalustoilla, maalatut palkit, tummat penkit ja kaapit, ristikko-ovi päädyssä | lattia kirjava beige–harmaa (k8/v11-paletti), punaiset pylväät, ristikkoikkunat, sermit, matot, lyhdyt | lattian sävy | Lavastaja | **korjattu avoimet-v35** (Floor tile 0–9 harmaaksi 0,61–0,72) |
| 04 | | ei mattoja, penkit ja kaapit seinien vierellä, paksut punaiset pylväät kivijalustoilla, punainen seinä, maalattu palkisto | v35–v42: matot, sermit, maljakot, lyhdyt, kasvit, arkut ja kääröt pois; Codexin kaapit #955 ja penkit #959; pylväät ø 0,6 m räystääseen 2,9 m levenevillä jalustoilla; ristikon tausta punainen; ohut maalattu kehä | – | Lavastaja | **korjattu avoimet-v36…v42** (julki v42 03.53) |
| 04 | | pitkä sali, kaksi pylväsriviä | avoin huone 15 × 18 m | mitta | – | ei muuteta (mitat) |
| 05 kujaportti | −249,4, 382, −2,03° | punaiset nastaovet auki katsojaa kohti, keltainen tiilikate ja friisi muurin päällä | ovet katsojaa kohti, nastatekstuuri (rakennukset-v35), muurikate-v14 | muurikate yläreunan yli kuten 02 | PK (kameran rajaus) | PK |
| 05 | | | PK:n pelikuva oli Meridiaaniportin tunnelista (13,2, −385) | väärä kuvauspaikka | PK (PT kertoi) | PK |

| 06 Meridiaaniportti | U-pihan eteläpää 16,4, −474, −2,03° | U-piha, kolme suoraa aukkoa, kaksikerroksiset paviljongit siivillä, valkoiset kaiteet siipien päällä, harmaa kivisokkeli | portin seinä ja kolme aukkoa, aukoissa ovilehdet 60° aukon edessä; siivet ja paviljongit kuvan ulkopuolella (todellinen U-piha 190 m leveä) | ovilehdet aukkojen edessä | Lavastaja | **korjattu rakennukset-v36** (lehdet tunnelin seinien suuntaisesti 88°) |
| 06 | | siivet ja paviljongit kuvassa | todellisessa leveydessä kuvan ulkopuolella | mitta | – | ei muuteta (mitat) |
| 07 yleiskuva | kamera 25, −820, 380 m, alas 27°, kenttä 45° | vallihauta, punainen ulkomuuri ja kulmatornit, kultakatot, paljon puita pihoilla, Jingshanin kukkula takana, sillat ja vesi edessä | vallihauta, ulkomuuri, kulmatornit ja kattojen määrä vastaavat; pihat paljaan harmaat; Jingshan tasainen viheralue | puut pihoilla (pelissä puut.json-instanssit vain lähellä) | PK/VS (puiden instanssit kauas) | PK/VS |
| 07 | | Jingshan noin 45 m korkea kukkula paviljonkeineen | ulkorenkaassa tasainen maa | todellinen maasto puuttui | Lavastaja | **korjattu rakennukset-v37 (u-jingshan) + ulkorengas-v3**: kukkula 45,7 m, viisi huippua ja paviljonkia, puustoiset rinteet. Mitat ovat kirjallisuuden likiarvoja (ei korkeusmallia; ETOPO1 1′ liian karkea), Wanchun-paviljongin paikka OSM:stä |
| 07 | | kirkas vesi ja vihreät rannat | vesi ja maa tasavärejä (editori) | materiaali ja valo | VS | VS |
## Korjattu tässä erässä (Lavastaja)

- rakennukset-v37 + ulkorengas-v3 (07): Jingshanin kukkula todellisessa koossa; mitat kirjallisuuden likiarvoja. Paketit aa5ec43267f3 ja 3da49cdb4260, proto 0b465e7c5.
- rakennukset-v36 (06): Meridiaaniportin tunnelien ovilehdet seinien suuntaisiksi; paketti `juoksupeli-kielletty-rakennukset-v36-vienti-20261025`, SHA256SUMS 0136afce1d9c, proto 67b6f879e.
- avoimet-v36…v42 (04): salin sisustus, pylväät, seinät ja kalusteet havainteen mukaan (v42 julki).

- avoimet-v35: salin ja huoneiden lattia tasaisen harmaaksi kiveksi (havainne 04). Paketti `juoksupeli-avoimet-v35-vienti-20261025`,
  SHA256SUMS dfae18320ac8, proto muoto-210 5086f0a48.
- Aiemmin samana yönä: kujaporttien nastaovet katsojan puolelle (rakennukset-v35), V4_marmori 0,88 (rakennukset-v34), neutraali taivas
  leivonnassa (tausta-v46, rakennukset-v35).

## Jäljellä muilla

- VS: lattian laattakuvio pelissä (tehty e7c4747c6, tarkistetaan pelistä otetussa parissa), täytön viritys v46/v35:lle, terassin marmorin sävy pelissä.
- PK: kameran 810 rajaus muurikatteen näkymiseen 02:ssa ja 05:ssä (muuria ei madalleta), 05:n kuvauspaikka kujaportilla.
- Omistaja: 03:n sommitelma todellisissa mitoissa (aamulla PT:n kautta).
- PK/VS: 07:n puut pihoilla kauas (puut.json-instanssit), vesi ja maa.
