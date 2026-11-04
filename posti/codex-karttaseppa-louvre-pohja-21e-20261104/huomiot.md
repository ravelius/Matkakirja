# Louvre21e / #2080 — yhden oton arviointitoimitus, QA EI LÄPÄISTY

1536 ×1024 RGB; sama kuvakoko ja ruudukon tavoite1m/px kuin pohjassa. Yksi ImageGen-kutsu / yksi kokonaan uusi kuva. Natiiveja kuvatavuja ei muokattu, rajattu, skaalattu eikä koostettu. Tilaus tehtiin22b:n varmennetun toimituksen jälkeen.

## Jalanjälki ja kadut
Keskelle syntyi tyhjää kiveystä ja Louvre/pyramidit poistuivat, mutta **koko860 ×360m mallin jalanjälki EI vapautunut**. Pohjois- ja itäreunalla jäi ruskeita talokuvioita sinisen jalanjälkirajan sisään; Rue de Rivoli kulkee edelleen osittain sen sisällä. QA-jalanjalki-maskiraja.png näyttää tämän: sininen=mallin alue, punainen=sallittu muokkausraja. Nämä rajat ovat vain QA-kuvassa.

Ruskean talovärin karkea väritunnistus löytää jalanjäljestä32400/310440px (10,4368%). Tämä on väriheuristiikka, ei semanttinen talopinta-alamittaus. Visuaalinen tarkistus vahvistaa jäljelle jääneet talorivit ja kadun.

## Seine, puisto ja reunat
Seinen, rantakatujen ja siltojen yleinen sijainti säilyi silmämääräisesti. Länsipuolen nurmi jatkuu kiveykseen. Täsmällistä rantaviivaa,15–25m reunamarginaalia tai kaikkien katujen liitoksia ei kuitenkaan varmenneta.

**Maskin ulkopuoli EI ole pikselilleen alkuperäinen.** 1068166/1074935 suojattua pikseliä (99,3703%) eroaa vähintään yhdellä RGB-tasolla;8,9883% eroaa yli12 tasoa ainakin yhdessä kanavassa. Keskimääräinen absoluuttinen RGB-ero on4,08/4,48/4,84. Myös ulkoreunassa ja kaakkoiskulman suojatulla alueella on muutoksia; Notre-Damen alueen koskemattomuutta ei väitetä. QA-pikseliero.png näyttää suurimman kanavaeron kuusinkertaisena.

## Tila
Tasainen ylhäältä piirretty tyyli ja paletti vastaavat lähdettä, ei pystyssä olevia rakenteita eikä uutta nähtävyyttä. Mutta jalanjäljen tyhjyys ja suojatun alueen säilyminen eivät täyty: **oma QA FAIL, ei käyttövalmis tai hyväksytty pelipohja**.

Toimitetaan tämä ainoa sallittu otto ja tarkistusraportti Karttasepälle/KK:lle. Seuraavasta otosta päättää KK tilauksen mukaisesti; uutta ottoa ei tässä tehty. Ei Tripo-toimitusta, runtime-kytkentää eikä julkaisua.
