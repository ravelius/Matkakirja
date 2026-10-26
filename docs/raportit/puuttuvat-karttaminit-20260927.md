# 23 puuttunutta Euroopan karttaminia: R2-toimitus

Fablen tilaus: `posti/sisaltokirjuri-kuvaputki-23-puuttuvaa-karttanostoa-20260927.md`. Kaikki 23 kuvaa generoitiin yksittäin, tarkastettiin vaalealla pelikarttapaperilla ja toimitettiin uusina R2-objekteina. Kuvien aiheet ja siluetit on verrattu nostoteksteihin ja hyväksyttyihin Ateenan isometrisiin muste-vesivärireferensseihin. Alkuperäiset raakakuvat ja hylätyt versiot sekä toteutuneet promptit ovat paikallisessa tuotantotyötilassa.

Tekninen tarkistus jokaiselle kuvalle: 512 × 512 PNG, RGBA, sRGB-profiili, aito alfa, ei magentaa näkyvissä pikseleissä, julkinen HTTP 200 / `image/png` / CORS ja tavulleen sama SHA-256 takaisinluettaessa. Tämä PR sisältää tarkistusarkit ja toimitusmanifestin; varsinaiset kuvat ovat R2:ssa. Se ei yksin todista asennetun pelin näkyvyyttä.

Kontaktisivut: [Sofia](kuvat/puuttuvat-karttaminit-20260927/sofia.jpg), [Lontoo](kuvat/puuttuvat-karttaminit-20260927/lontoo.jpg), [pohjoinen](kuvat/puuttuvat-karttaminit-20260927/pohjoinen.jpg), [keskinen](kuvat/puuttuvat-karttaminit-20260927/keskinen.jpg), [eteläinen](kuvat/puuttuvat-karttaminit-20260927/etelainen.jpg).

| Kaupunki / tunnus | SHA-256 | R2 |
|---|---|---|
| `berliini-lehman-hinnalla` | `8c7fe2354a982bb48ba2667a9f65fbb5d3a2e95b4affc06d9b84398c26f0cb27` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/berliini-lehman-hinnalla.png) |
| `berliini-berliinin-karhu` | `9d0adf883c187359d16271760deebf5f8f944f3db43f2d320d3657e8e308256f` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/berliini-berliinin-karhu.png) |
| `bukarest-szathmarin-studio` | `3b1bbdde06f5035a599dd463c3ed59853efc858722dea0e3ed059497df65d6fd` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/bukarest-szathmarin-studio.png) |
| `dublin-st-james-s-gate` | `6fd09c3d5832215846efc2e317a46692b3ae5f3e8fc781f4fb8e665d04bf5086` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/dublin-st-james-s-gate.png) |
| `edinburgh-scott-monumentti` | `549f5a16bc1bb1a9f7489952d774b7cfc438a72ec516331c3be97fc0bcea2820` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/edinburgh-scott-monumentti.png) |
| `granada-leijonain-piha` | `7924bf7c664c03c2e53b604834521dd78ddd3ab892208ed494186b9b9be75dc5` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/granada-leijonain-piha.png) |
| `kobenhavn-tivolin-portti` | `2cd87124a70be300df8d2afd1367a092e0fab917e968c21a481ff302a7906d46` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/kobenhavn-tivolin-portti.png) |
| `krakova-wawel` | `09fbe0bc7314042e42822ad3db1f1f433172163cb9976139877291f51febbc1a` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/krakova-wawel.png) |
| `lissabon-calcada` | `c048cd9be6d7cec88d15ec8a773ca442aa64cb920636ee4d289060f34077ca44` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/lissabon-calcada.png) |
| `lissabon-largo-da-severa` | `79d9628931fb3018f03ebefde3880b55a3185813abc65cc76b8a1af42391887e` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/lissabon-largo-da-severa.png) |
| `lontoo-cheapsiden-katko` | `e023aa50d47d7474728e7a7a4a83dcd4c3e5a98bb96d06af17e69b83d9766df8` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/lontoo-cheapsiden-katko.png) |
| `lontoo-etelameren-kupla` | `513667158b7284e93f416e3d06a21e2500e85a4c5864ea24072e03421d065e9d` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/lontoo-etelameren-kupla.png) |
| `lontoo-thamesin-vuorovesi` | `cfa702b8a6cf86538dbab22f1842a4fffa1e5cda6ebfcf6f1f75bfc1ca8d42ab` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/lontoo-thamesin-vuorovesi.png) |
| `madrid-tasavallan-vuosi` | `96d9accbfcdcc4d631fa9f1b5ef54a7a8ae070d04305d6a43fddd47368ae997d` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/madrid-tasavallan-vuosi.png) |
| `oslo-akershus` | `8f07974a3823969cd5b298e0938a005923813c6c527095f0ca861632a2963ee5` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/oslo-akershus.png) |
| `praha-klementinum` | `a0c873f2097d7df73ccd9ef13eff072dd9136bd09abd5e20d59883c53c698f9e` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/praha-klementinum.png) |
| `rooma-torre-argentina` | `2b6509ce21dbdb7e03b1b5fca352e16e4aaf16ea52d8ea355242f5c5b45101d8` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/rooma-torre-argentina.png) |
| `rooma-vatikaanin-palatsi` | `6c24776c09f97d6116700d017474eb97225615aa03d071b2f3cce34ae20f3925` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/rooma-vatikaanin-palatsi.png) |
| `sofia-banja-bashin-moskeija` | `a9c487dd2afdb23434e8c728ed9dbb458f8022c3b724152d2b42f0348b018631` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/sofia-banja-bashin-moskeija.png) |
| `sofia-serdican-areena` | `9230808749f7a6aa069daaf75ebd8b992ab8f6d17fb159b809622d59d6c193d1` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/sofia-serdican-areena.png) |
| `sofia-sofia-patsas` | `3b0b2480960b28845eaccdcfdd826c5c3f8c0c701ef0f1579f5847879aaf66e5` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/sofia-sofia-patsas.png) |
| `tukholma-norrstrom` | `15e4947756dc51863a37b95f17624c02a6bfe9ac3d6f0d7aad7af4a5c6ab2c9f` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/tukholma-norrstrom.png) |
| `tukholma-vadersolstavlan` | `a66968cea8ad135ee41f92e5bdb6f6ea0a26abdf5ebf39a9918c4207ade5b206` | [PNG](https://media.matkakirja.app/kohtaamiset/miniatyyrit/tukholma-vadersolstavlan.png) |

Koodi käyttää jo näitä tunnuksia `js/packs/miniatyyrit.js`:ssä, myös 27.9.2026 julkaistussa JS-tiedostossa. Pelin kuvaelementin näkyvyys on tarkistettava erikseen Fablella. Kuvan lähderivi on `Matkakirjan havainnekuva`; pelin nykyinen `NAHTAVYYSJUTUT.lahde` koskee usein itse tekstin lähdettä, eikä sitä tule korvata kuvatekstillä. Kuvatiedon lähdekentän kytkentä vaatii Fablelta määritellyn paikan tai erillisen pelimuutoksen.
