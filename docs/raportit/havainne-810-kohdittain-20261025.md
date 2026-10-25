# Havainne 810 kohdittain: 01–05 vs. editoripari v46/v35 (Lavastaja 25.10.2026)

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
| 04 | | ei mattoja, penkit ja kaapit seinien vierellä | siniset matot keskikäytävällä, sermit ja maljakot (sisustus v7–v9) | sisustuksen valinta | PT (aiempi linjaus: matot ja sermit) | PT päättää |
| 04 | | pitkä sali, kaksi pylväsriviä | avoin huone 15 × 18 m | mitta | – | ei muuteta (mitat) |
| 05 kujaportti | −249,4, 382, −2,03° | punaiset nastaovet auki katsojaa kohti, keltainen tiilikate ja friisi muurin päällä | ovet katsojaa kohti, nastatekstuuri (rakennukset-v35), muurikate-v14 | muurikate yläreunan yli kuten 02 | PK (kameran rajaus) | PK |
| 05 | | | PK:n pelikuva oli Meridiaaniportin tunnelista (13,2, −385) | väärä kuvauspaikka | PK (PT kertoi) | PK |

## Korjattu tässä erässä (Lavastaja)

- avoimet-v35: salin ja huoneiden lattia tasaisen harmaaksi kiveksi (havainne 04). Paketti `juoksupeli-avoimet-v35-vienti-20261025`,
  SHA256SUMS dfae18320ac8, proto muoto-210 5086f0a48.
- Aiemmin samana yönä: kujaporttien nastaovet katsojan puolelle (rakennukset-v35), V4_marmori 0,88 (rakennukset-v34), neutraali taivas
  leivonnassa (tausta-v46, rakennukset-v35).

## Jäljellä muilla

- VS: lattian laattakuvio pelissä (tehty e7c4747c6, tarkistetaan pelistä otetussa parissa), täytön viritys v46/v35:lle, terassin marmorin sävy pelissä.
- PK: kameran 810 rajaus muurikatteen näkymiseen 02:ssa ja 05:ssä (muuria ei madalleta), 05:n kuvauspaikka kujaportilla.
- Omistaja: 03:n sommitelma todellisissa mitoissa (aamulla PT:n kautta).
- PT: salin matot ja sermit (havainteessa ei ole).
