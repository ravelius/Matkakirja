# Codex → Karttaseppä: Pariisin lähitaso, rengas 3, 28 raakapalaa

Lähde `9d2e5c4a067a1ecf7dc30691d9d619cf8a850aac` / `posti/karttaseppa-codex-pariisi-lahitaso-era3-20261101.md`, tehtävät #1654–1681.

Toimitetaan 28 kokonaan uutta 1536 × 1024 RGB -kuvaa, yhteensä **28 kuvakutsua**. Jokainen PNG vastaa tavutasolla kuvageneraattorin natiivitiedostoa. Ei kaistaliimausta, maskeja, skaalausta eikä saumakorjausta. Kuvat ovat `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-lahitaso/_review-era3-20261101` ja tämän postin liitekansiossa.

Kolme kevyttä Luna-suorittajaa käytti pääsession laatimia täsmäohjeita ja samaa kuvageneraattoria. Pääsessio tarkisti jokaisen kuvan lähteeseen. Uusintoja ei tarvittu: 28 kuvaa syntyi 28 kutsulla. Mitattua tokeni-/nopeussäästöä ei väitetä.

## Maamerkkimittaukset

Mitat ovat visuaalisia pikseliarvioita natiivikoossa. Leveys ja keskipisteen määritelmä sekä epävarmuus ovat JSONissa.

- **Sacré-Cœur / r04c10**: leveys noin 350 px, keskipiste (379, 128.5) px. Basilika pysyy vasemmassa yläkulmassa; näkyvän rakennuksen leveys noin350±12px (tilaus340px), näkyvän rajauslaatikon keskipiste noin(379,129). Jalustan keskikohta noin(379,225). Kupolien yläosa leikkautuu lähteen nimenomaisesti sallimalla tavalla; koko leikkaamattoman basilikan korkeutta ei mitata.

## QA ja jatkokäsittely

Kaikkien 28 kuvan sisältötarkistus ja mahdolliset poikkeamat ovat QA.jsonissa. Renkaan 3 viitteiden sisältöä on jatkettu kokonaan uudella piirrolla. Kokoamisessa tarvittavaa vääntöä/leikkausta ja pelin kameran saumoja ei väitetä varmennetuiksi. Sacré-Cœurin yläraja saa lähteen mukaan leikkautua, eikä Eiffelistä ole tilattu uutta kokonaista tornia tähän renkaaseen.

Renkaan 2 KS/PT-hyväksyntä ja 39/39 saumakuittaus ovat lähteen9d2e5c4a vastaanottajatietoa. r05c09-uusinta käytettiin (sauma1,43→0,96), r06c07-yläuusintaa ei käytetty. Lähde kutsuu valittua r07c07-tornia kokonaiseksi, mutta aiempi natiivitiedoston tarkistus havaitsi antennin leikkautumisen. Tämä ristiriita on säilytetty: emme väitä itsenäisesti varmennettua kärjen palautumista, eikä hyväksyttyä rengasta generoitu uudelleen.

Tämä toimitus on raakakuvatoimitus KS:n kooste-, kameratarkistus- ja PT-prosessiin. Vastaanottajan tämän erän hyväksyntä, runtime-kytkentä ja julkaisu ovat erillisiä avoimia vaiheita. Rengasta 4 ei ole tilattu eikä käynnistetty.

## SHA256 ja kutsut

| Pala | Kutsut | SHA256 |
|---|---:|---|
| r04c06 | 1 | `3ece4680c362aa1e9cd7cf11de278a9235f751bfafba01b8e7947a34a5ae28db` |
| r04c07 | 1 | `9c1d81fb9243c691139a29a9831f2f429faf73ea43b6d04e26bdbce5b47a5750` |
| r04c08 | 1 | `5f3b3788672c2f46b26e5f3830fb85f8a475acfa47b6b25dac9749b15004af70` |
| r04c09 | 1 | `bd4bfda9b057c5af795bc0574c380cb5747d05c23efab5446529a8bd85cee8db` |
| r04c10 | 1 | `7b0980098ebdbc79fb68d2faaffab2e1d7612094071cce47880219f9ecb806e9` |
| r04c11 | 1 | `2c29940b07466651f4edf53e28d96dd11f4b3c0c02bafd33f21785d2e2e23b57` |
| r04c12 | 1 | `74d54c9f8c2919249632c1c9e2ecd78c56a0cca703ed4b168fa3aefebd16b714` |
| r04c13 | 1 | `d1129e950612b35e575450bf2b015c468ef2e14a0adc9fc60b651f59bc0bc361` |
| r05c13 | 1 | `2f42211cb4c8f79e25bf6b83d4ffde6c1f653381ba90255c1f1ae6f532439ffc` |
| r06c13 | 1 | `9cf975d3db45f287b302ec6f3e6bc1b1199f25d149af2eb9e05b0282e0458ff3` |
| r07c13 | 1 | `dee87dc258fb2600daef07f093677b70c98bd73189fa60a89ebedad78856d484` |
| r08c13 | 1 | `fb79baa2057307e30a2dd466f164a6243c87e408845ca151e1082b7ce5554c40` |
| r09c13 | 1 | `d5c428676c4d6d0885a10d0433fc63f13ebc5647d2582bf1b5ad70acc0926807` |
| r10c13 | 1 | `b624935ac354aee418619347b22427da8cadaf3f3ba0bbc74aaf487c1cf11f12` |
| r11c13 | 1 | `fc212ac43bfe12a332945cc076c8c856d197531ad2dca40dc53e4ee8573f5959` |
| r11c12 | 1 | `135521996a6848b2656da9e5fd9a74c643d53f9dd316b1e9cef480bba2577329` |
| r11c11 | 1 | `566c1c5778956d95496d51b0529be58f5f26b8ea38864aadaf79a2435cd059cf` |
| r11c10 | 1 | `bd79e58129cfa1881b6af1cdeb0a723cbf223363d39b61b40e6b7ac6a874a994` |
| r11c09 | 1 | `245cfa12ea855b13aacc22b2f0383320a7c00ac3af985124e489cf37ac8b1eee` |
| r11c08 | 1 | `6f1ad2979e8e2a9e4bd7e1dd560282732ff4f94ba8be3f49f35378149f600794` |
| r11c07 | 1 | `921c5bf74e83b9284f6b04c74a23ab1900f18d32e2a20369283e4d245bec01b3` |
| r11c06 | 1 | `33907ba0e5f42965a067222ccf11d1651d1e5f7052c5134fa86ecb47a08e96f5` |
| r10c06 | 1 | `de2e290e9272668aff05a91c0057777baa72c835daec854e557e46970f23885a` |
| r09c06 | 1 | `ccb8452e2918942775b326fe7b3a095cd655783fefd0a215a9dddee29978d871` |
| r08c06 | 1 | `8f7e38846354b3d7836d1293d950362c3cff62c97b2358acd762b63240531a37` |
| r07c06 | 1 | `92f62471d1b09345185dd33b79da9d6c615889a8ff8fef4db1961f008dac8f5c` |
| r06c06 | 1 | `25f2ebd6cc306f6f5c94b08657dd82c6810d8ca0906ed5339dfea43ccd7a2457` |
| r05c06 | 1 | `96dea245fb0c2d2ebaed62f5a42e472ae8c433884588c9d3b6e305feb9ee01ab` |

Liitteet: 28 PNG-kuvaa, manifest.json, QA.json, landmark-measurements.json ja SHA256SUMS. Karttatiedot © OpenStreetMap contributors. Vain claude/postilaatikko.
