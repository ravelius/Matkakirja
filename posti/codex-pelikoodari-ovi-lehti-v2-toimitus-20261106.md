# Pelikoodarille ja KK:lle — ovilehtien musta täyte korjattu (#2163)

Koko paketti on kokeiltavissa polussa /Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ovi-20261104/mallit-v2/. Kansio osoittaa T7:llä olevaan uuteen toimitukseen. Kolme GLB:tä ja kaikki SHA256SUMS-rivit luettiin takaisin tästä jaetusta polusta. Tekninen tuontitarkistus läpäisty.

Korjasin molempien lehtien yhteisen 1024²-väritekstuurin. Täytteen tunnistus perustuu UV-peittoon ja yhteyteen tyhjään atlasalueeseen. Erittäin kapeiden UV-kolmioiden (mm. #418) paikkaväri haettiin saman kolmion terveistä värinäytteistä. Häviöttömässä PNG:ssä molempien lehtien väritiedosto on tavulleen sama. V1:n normaali- ja metalli/karheuskuvat, geometria, UV:t, indeksit, solmujen muunnokset ja saranaorigot tarkistettiin tavutasolla. Karmi täsmää v1:een koko tiedostolta. Uusia Tripo-töitä 0, krediittejä 0.

Koko värikartan täysin musta osuus 13,6057 % → 0 %. Alle 16/255 kaikilla kolmella kanavalla 36,5408 % → 0 %. UV-peiton sisällä täysin mustia 0 → 0, alle 16:n 12/247322 → 0. Muut 247310 maalattua pintapikseliä säilyivät samoina. Vanhaa noin 96 cm² arviota vastaava otos 6 kolmiota / 96,45 cm² → 0. GLB:n kiertävää osoitusta ja laajempaa täytemaskia käyttävä koe 11 kolmiota / 119,43 cm² → 0. Nämä ovat osumakolmioiden kokonaisaloja. Täydet kulma- ja keskipistelistat aloineen molemmille lehdille ovat qa/triangle-probes.json:ssa ja taulukko tiedostossa LUE-ENSIN.md.

Kolmion 418 musta kiila poistui mallin samalla kameralla tehdyssä takaviistovertailussa. Syvyystarkistus vahvisti kolmion näkyvyyden. Ristikon ja renkaan kontrollirajaukset täsmäävät pikselilleen. Katkoviivan poistumista pelissä tai pelimerkin ja kolmion 418 tarkkaa vastaavuutta ei ole vielä todennettu. Kansio esikatselu/ sisältää 8× kuvaparit ristikon reunasaumasta ja lehtien keskisaumasta, merkin ennen/jälkeen-kuvat, kontrollirajaukset sekä alkuperäisen pelikuvan 1:1-rajauksen.

Avaa ensin esikatselu/ovi-ennen-ja-jalkeen.png ja esikatselu/ristikon-sauma-8x-pari.png. Pyydän Pelikoodaria toistamaan t1-ulos-pysahdys-tilanteen tällä paketilla ja näyttämään KK:lle saman pelirajauksen. Mediavientiä ja junaa edeltää tuo arvio.

SHA-256

- ovi-karmi.glb 69608b8b152af7e2b6fdcf17712becdffbb683b0a7d291811ead89df328eda65
- ovi-lehti-oikea.glb f0280bab0773b536c01b78de648baef3281523b4d7e277104f560d0e2cee7e5d
- ovi-lehti-vasen.glb dc12c022fec327e935c6dc35bcf5b04024ece983b61cb6a58cf9f6fe52a3bac5
