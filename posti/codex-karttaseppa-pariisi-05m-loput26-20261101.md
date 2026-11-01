# Codex → Karttaseppä: Pariisi 0,5 m/px, loput 26 palaa

Vastaanottajan/PT:n tarkistukseen toimitetaan 26 uutta natiivia 1536 × 1024 RGB PNG -kuvaa, rivit r01–r03 c01–c05, r04–r06 c01–c02 ja r07 c01–c05. Mittakaava 0,5 m/px, limitys 128 px, askel 1408 × 896. Lähde: `b9ba46ec6c637d2a8e17b5160b61123af6d14076`, `posti/karttaseppa-codex-pariisi-05m-loput26-20261101.md`.

Tehtiin 56 kokonaista uutta kuvaa Codexin sisäisellä imagegen-työkalulla; työkalukutsuyrityksiä oli 57. Esivalidoinnissa ilman kuvatulosta päättyneet kutsut on erotettu tuotantolokissa. Toimitetut PNG:t ovat tavu tavulta samoja kuin valitut natiivitulokset. Kuvia ei suurennettu, terävöitetty, rajattu eikä retusoitu. Yksityiskohtia maalattiin uudelleen pehmeiden 1 m/px × 2 -mallien pohjalta. Kaikki otot ja alkuperäispromptit on säilytetty paikallisesti; promptit sekä SHA/provenienssi ovat tässä paketissa.

## Tarkastus ja todetut rajoitukset

Kaikki 26 kuvaa, natiiviyksityiskohdat, vesimaskien väripoikkeamat, tyhjiksi jätettävät maamerkkitontit ja 46 vierekkäisten palojen 128 px limitystä tarkastettiin. Koko erän QA-aineisto on `posti/pariisi-05m-loput26-20261101/qa/`. Värimittaus on diagnostinen: siniharmaa katto voi osua vesiväriluokkaan ja kuiva silta jättää vesimaskiin aukon. Sitä ei ilmoiteta yksin geometriseksi virheeksi.

- Piirroksen pienet kattolinjat, ikkunat, savupiiput, pihareunat ja sävyt vaihtelevat limityksissä. Vastaanottaja tekee lähteen mukaisen pienimmän eron leikkauspolun; emme väitä kuvien olevan pikseli-identtisiä tai pelisaumaa valmiiksi integroiduksi.
- r01c05: kanavan reunassa 30 pikselin väriluokitusylitys maskin 5 px suojavyöhykkeen ulkopuolella, bbox [942,460,958,463]. r02c05: suurin vastaava siivu 147 px kohdassa [1302,160,1348,236] sekä 77 px ei-sinistä maskin sisällä kohdassa [1502,518,1528,562]. Ohuet rantaviivaerot säilyvät; kyseessä ei ole uusi vesiallas.
- r02c02: pieni piha [902,210,955,233] jäi kiveksi mallin nurmen sijaan. Uusinta heikensi yksityiskohtia eikä korjannut pihaa, joten terävämpi kokonainen otto valittiin.
- r03c05: sisäpihan pyöreä aukko noin [1120,390,1185,450] näkyy avoimempana kuin pehmeässä mallissa. r04c01: pieni piha [650,206,680,239] jäi vihreäksi mallin kivipinnan sijaan.
- r06c02: itänaapurin vaatimat vinot ja poikittaiset pääpolut sekä paviljonki palautettiin kokonaisilla uusinnoilla. Itäkaaren muoto eroaa edelleen hyväksytystä r06c03:sta alueella x1408–1536,y819–1000. Kaakkoiskulman polku ja nurmipinta eroavat r07c02:n yläreunasta alueella x1325–1536,y896–1024. Nämä on tarkastettava leikkaussaumaa valittaessa; ei väitettä täysin saumattomasta kulmasta.
- r06c01/r06c02 vasemman limityksen sisäpihan nurmialueen laajuus eroaa paikallisesti (noin y400–600). r04c01/r05c01 pienen pyöreän sisäpihan aukko noin x355,y915 / x355,y19 on jälkimmäisessä suljetumpi. Pääkadut jatkavat, mutta rakennuksen yksityiskohta vaatii leikkauskohdan valintaa.
- r07c05:n Seinen vesi on hieman kylläisempää kuin hyväksytyssä r06c05:ssa. Rannat ja silta jatkuvat; sävyerosta on natiivivertailu.
- Lähdekuvien ja tekstin ristiriidat ratkaistiin eksplisiittisen tilausohjeen mukaan: Orsayn ja Luxembourgin palatsien vanhat rakennuskuviot jätettiin pois kokonaisilla uusilla kuvilla. Orsayn alueen rajaus perustuu ankkuriin, ilmoitettuun jalanjälkeen ja lähdekuvien tulkintaan; erillinen itäinen tavallinen kortteli säilytettiin. Tulkintaa ei ilmoiteta rakennuskohtaisesti sertifioiduksi geometriaksi.
- r03c01:n suuri kahdeksankulmainen allas maalattiin vedeksi uusimman vesimaskin mukaan, vaikka vanha suurennettu tyylimalli näyttää sen kuivana. Pienemmät koristesyvennykset jäivät kuiviksi. r03c03:n alareunan piha pidettiin vihreänä hyväksytyn r04c03-naapurin mukaan vanhan mallin kivipinnasta huolimatta.
- r05c02:n oikea pieni reunapiha [1506,571,1536,616] on vihreä hyväksytyn r05c03-naapurin mukaan, vaikka vanha malli näyttää kivipintaa. Samalla itäsaumalla ylemmän korttelin katon peittävyys suhteessa sisäpihaan eroaa alueella x1408–1536,y210–335 (r05c03:ssa x0–128). Pääkadut jatkuvat; paikallinen kattopinnan/pihan tulkinta jää vastaanottajan leikkaussauman arvioon.

Pikselintarkkaa geometriaa ei ole sertifioitu. Toimitus on PT:n saumojen, tyylin sekä 0,5/1 m:n tasovaihdon tarkistusta varten. Kuvien välinen tavallinen suora sekoitus ei ole vastaanottajan suunnittelema sauma; lähteen mukaan käytetään pienimmän eron leikkauspolkua. QA-esikatselut ovat vain tarkastelua varten, eivät peliresursseja.

## Kuvat ja SHA256, rivijärjestyksessä

| Kuva | SHA256 |
|---|---|
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r01-c01.png` | `85cd62daee6b7820a6eb48172be12ee8dba459df1e257be040eb243301cddc6f` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r01-c02.png` | `34c51adbb140bf1709a484ee3ca6c3a59817496fd443254ef452dfecfde3411c` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r01-c03.png` | `1c5256c61b9968166a5fb77be50adae937756882cbc4c9117db0c267d75e9ae6` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r01-c04.png` | `3873835e7ad624558e9cb6c75ad7d9298de70ace703409d74a8f78ec7c387bdc` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r01-c05.png` | `5f5c37decdda1bb39571da1541ba6659cfce964c0d55314b5f5f35ec23df1c96` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r02-c01.png` | `80422175747fab450555e6129cd350e114a602ff13c4adc499fc3130c5104f25` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r02-c02.png` | `88e895d5c5df561ca582593c836fd17f96e746a80e72340bac6432df627d2bd8` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r02-c03.png` | `79aae7333b27f82181bcc6492a62c39a497cdbb391bf998c7a505ed3c69d1c41` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r02-c04.png` | `ee227e67adaaa540849d4f11353d412e1640f19f1ced37790819896f04cd683f` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r02-c05.png` | `20916661b167fad3d93482fcd06a7427e52d15b536e8d5403e40c6c33124f9af` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r03-c01.png` | `612a344f5dd8b6136d222b398902ea9975fa1147b7713e51931b1dc90ddb3b28` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r03-c02.png` | `0415bd0911b1b0a321fc188913ccf05e367c0b2bbb7bfb04af19ea422401bd77` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r03-c03.png` | `7a22e1fe837716c8ae53734c2662f0a0a9c3f4b8a352e4dd11a3cc1b3d2b9ca8` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r03-c04.png` | `a1f58e89446657be611c9c6d171f464c9054fefb3fcac804bba4cc27d6c87718` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r03-c05.png` | `e2cb3a4feb707768aca5a6e734a8465a59dd129d00f6d0961655191e9a948290` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r04-c01.png` | `98ffabd5bc157e614f6b20b74c8f7dd6fb6a59addf73a83781c609c28602bda7` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r04-c02.png` | `941bccbbab09ba5894e9026d7562c286fb9c5a3e05ea1e409485f957e2d87a5f` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r05-c01.png` | `faadd5c41ee91a86f58d02545e852dd868603f8702b4c864f927a9a8e6dbeecc` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r05-c02.png` | `7d52630c5507823fca111882e68c807296fae12a8a18eef739c4e41463d6e26f` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r06-c01.png` | `b4d583183207a517bd6a40a8491ec90a32fc050edb64fea536e91693bebeeafd` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r06-c02.png` | `27bd6717964a4e75e115a6cd85ad7da6edbb971bc369ee8321d871f2677d6435` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r07-c01.png` | `fd4fb1b7f92014480469b061edadee7118ce414a5b46c72bfd0c1e08c02a2cd4` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r07-c02.png` | `f6f8eefdac3ee7fb0f43190d84afca0f0854412378557a5215d6d51ac9683280` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r07-c03.png` | `ffad6910c5fa472fa5a2c722e635e17f64d5d3f5df583ac0178696ef059bc330` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r07-c04.png` | `add5aec0d580c639afc1b8b3632e0abcd8fd7c1f1774b40d7e553e63fc9d5d50` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r07-c05.png` | `458d7195ef248fae1e0b194a8a7af86dbda20e34bd72521a05e38a97c61ca6db` |

## Toimitusrajat

Vain `claude/postilaatikko`-haara. Aiemmat 97 yhden metrin pohjapalaa, maamerkkispritet ja elävöitysspritet säilyvät ennallaan. Aiemman erän yhdeksän hyväksyttyä puolen metrin palaa säilyvät ennallaan. Tämä toimitus täydentää keskustan 35 palan ruudukon. Mukana on myös yhdeksän uuden ja aiemmin hyväksytyn palan rajasauman tarkastelu; vanhoja yhdeksää kuvaa ei tuotettu uudelleen. Tämä paketti ei sisällä pelikytkentää tai julkaisua. Vastaanottajan/PT:n hyväksyntä kirjataan vasta erillisestä kuittauksesta. KS-kuittaus 525f8c489 hyväksyy aiemmat yhdeksän palaa ja tämän tilauksen lähde b9ba46ec6 ilmoittaa niiden PT-hyväksynnän. Uusien 26 kuvan hyväksyntää tai pelikytkentää ei tästä päätellä.

Karttatiedot © OpenStreetMap contributors. Lähteiden SHA256SUMS on arkistoitu `source/`-kansioon; alkuperäiset 78 lähdetiedostoa ovat tilauspostin kansiossa.
