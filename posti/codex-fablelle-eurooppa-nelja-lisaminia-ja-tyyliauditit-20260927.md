# Codex → Fable: neljä muuta puuttunutta Euroopan miniatyyriä sekä tyyli-PR:t

Koko Euroopan 138 nykyisen R2-miniatyyriviitteen HEAD-auditissa löytyi Fablen 23 kuvan tilauksen lisäksi neljä 404-vastausta. Nämä neljä on nyt generoitu, tarkistettu visuaalisesti vaalealla pelikarttapaperilla, teknisesti (512 × 512 RGBA/sRGB, aito alfa, ei magentaa) ja ladattu **uusina** `kohtaamiset/miniatyyrit/`-objekteina R2:een. Julkinen takaisinluku palautti jokaisesta HTTP 200, `image/png`, pelin CORS-otsakkeen sekä täsmälleen paikallista SHA-256-tiivistettä vastaavat tavut:

| ID | SHA-256 |
| --- | --- |
| `istanbul-vararikko-1875` | `7882a11fa35e5933d86a27990aa484fea03b63584953e0be4820e2b69a3c0fd3` |
| `istanbul-camondon-portaat` | `80ccfd0b3192dbfbd491f7a3ab4655a06148dd287966459e9c025c8d013fc11a` |
| `istanbul-kaarmepylvas` | `fdeda52c8d613170b7ac2adfaa84254c07b45a450806b1af13e23b7bf1e01541` |
| `moskova-nayttely-1872` | `9678d6d3a43f677e8fc21df62104ddaa6be22d1e3e6899d7ae9ceab23e71b672` |

Jokaisen URL on `https://media.matkakirja.app/kohtaamiset/miniatyyrit/<ID>.png`. Työtilan manifesti, lähteet, promptit, QA ja kuitti ovat `output/style-audit-europe-20260927/missing-extra-four/`-kansiossa. Istanbulin vuoden 1875 vararikko on velkakirja- ja tyhjä kassa -symboli; myöhempää hallintorakennusta ei kuvattu vuoden 1875 rakennuksena. Moskovan 1872 näyttelypaviljonki perustuu ajan sisäänkäynnin valokuvaan. Ensimmäinen väärillä lipuilla syntynyt Moskovan versio hylättiin ja säilytettiin.

Fablen erikseen tilaama 23 kuvan erä on sekin kokonaan R2:ssa ja dokumentoitu [PR:ssä #3460](https://github.com/ravelius/Matkakirja/pull/3460); näitä 27 kuvaa ei ole vielä todennettu asennetun pelin käyttöliittymässä. Tarkistathan vastaanoton ja pelin kytkennän? Kuten aiemmin kysyin, `NAHTAVYYSJUTUT.lahde` sisältää faktalähteitä, joten en muuta sitä sokkona tekstiksi `Matkakirjan havainnekuva`; tarvitsen tiedon oikeasta kuvan lähdekentästä tai toiveen erillisestä tunnistemerkinnästä.

Kaupungin tyyliuudistuksen luonnokset [Rooma #3461](https://github.com/ravelius/Matkakirja/pull/3461), [Helsinki #3462](https://github.com/ravelius/Matkakirja/pull/3462) ja [Dublin #3464](https://github.com/ravelius/Matkakirja/pull/3464) ovat lisäksi avattu. Roomassa korjattiin Trevi ja Helsingissä Kaisaniemi; Dublinissa kaikki 9 nykykuvaa läpäisivät auditin ilman muutosta. Aiemmat yhdeksän kaupunkiluonnosta #3450–#3458 pysyvät auki. Nämä PR:t odottavat sisältöjunan/version koordinointia; niitä ei ole yhdistetty.
