# Codex → LAV / KK / PT: ERÄ 2A, ensimmäiset kolme mallikuvaa

Kolme uutta kokonaista mallikuvaa on lähdevertailussa. Sol/medium teki lähde- ja kuvatyön; eri Sol/high tarkisti kuvat. Root luki lähdeauditit ja vertailuarkit. Ei Tripo-ottoja tai KK-hyväksyntää tässä toimituksessa. Lähdetilaus f04fa3d85faa2522dec0f244d69338da58c98256 (tiedostoblob 1ef5c8ef09dddcd8192a64169228de7ac179309e).

Jokaisen hakemiston review-sheet.png näyttää mallikuvan ja oikeat lähteet; original.png on mahdollinen Tripo-syöte. source-audit.json sisältää tekijät, oikeudet, lähdelinkit ja suunnan riippumattomat perustelut. INDEPENDENT-QA-first3.json sisältää erillisen tarkastuksen. Tiedostot T7:llä, Shared-polut osoittavat byte-varmennettuihin toimituskopioihin.

## Greenwich Palace: joenpuoleinen Tudor-siipi

Avain: london-greenwich-palace-historic
Kansio: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/london-greenwich-palace-historic`
Kuva SHA256: `889fb8bf353c6c3da34cdb9a81e581182c3cdd0793dd1ecd0c0c3a627efc7b2f`
Arkki SHA256: `ba3c750c50644b6d8fe2d763b12f67203483d36b717056f4e4618d0f56a831e7`
Tarkastus: WARN

- Kuva seuraa G3:n selkeälinjaista retrospektiivistä julkisivua selvemmin kuin G1:n maalauksen yksityiskohtia; tarkan alku-1600-luvun vaiheen pienet erottelut eivät varmistu.
- Kappelin suippokaaret, pienet crenelloinnit ja oikean tornin kulmatornien muodot ovat korostuneet/tulkittuja; lähteistä ei todisteta täsmällistä korkeussuhdetta.
- Matala lähes frontaalinen kamera näyttää lähinnä katon ja pienen oikean päädyn. Takasulun syvyys jää todistamatta, mutta rajaus on dokumentoitu jokisiipi eikä koko palatsi.

## Whitehall: St James Parkin puoleinen historiallinen ryhmä

Avain: london-whitehall-historic
Kansio: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/london-whitehall-historic`
Kuva SHA256: `5112136fbdf41bbe1c785e53b4e7c8d2a6632367f51813ebc71806653f2d393a`
Arkki SHA256: `753d69c0356086ed84a022c4e25289819d4342467d743e8b67f7acb86cf64dc7`
Tarkastus: WARN

- Useita maalauskuvan limittäisiä/erillisiä osia on painettu kiinni toisiinsa yhdeksi eturyhmäksi. Fisherin W2-pohjan tarkkoja aukkoja, välitiloja ja yhteyksiä ei voi sovittaa loppuun matalasta rasterinäkymästä.
- Banqueting Housen ja keskimmäisten takatornien suhteet ovat tunnistettavat mutta rakennusten täsmällinen syvyys ja korkeus jäävät tulkinnaksi.
- Takajulkisivu ja rakennusryhmän koko pohjamuoto jäävät piiloon. Tämä on rajattu puistofrontti, joten koko palatsin pihojen puuttuminen ei ole hylkäysperuste.

## Beurs van de Keyser: myöhäisen vaiheen pörssi

Avain: amsterdam-beurs-van-de-keyser-historic
Kansio: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/amsterdam-beurs-van-de-keyser-historic`
Kuva SHA256: `ea2c1b856a6d653dd49d0c0dd660afdf244b1b2f7961cfa5e720d9fd47ce9723`
Arkki SHA256: `de185bb7e46753a07a1ee2ac3e2f90f115ca1da9235e571f6df47a9c009e0700`
Tarkastus: WARN_MAJOR_FRONT_UNRESOLVED

- Uuden kuvan eteläinen ulkoseinä on kokonaan monikaarinen avoin arkadijulkisivu. K3 todistaa sisäpihan arkadit, mutta K4:n kaukainen frontti ei riitä vahvistamaan saman arkadijonon jatkumista juuri ulos Rokinille. Tämä vaikuttaa koko etufrontin massan luonteeseen, ei vain ornamenttiin.
- Kellotorni on uudessa kuvassa etummaisen lyhyen siiven keskellä ja sopii yleiseen eteläpäätyajatukseen. K3:n sisäpihatornin ja K4:n pienen ulkopuolisen tornin täsmällinen yhdistäminen tähän kohtaan sekä tornin korkeus/muoto eivät kuitenkaan varmistu aineistosta. En väitä sen osoitetusti olevan väärässä päässä.
- K2:ssa on epäsäännöllisyyttä ja porrastuksia, jotka uusi malli regularisoi täysin suorakulmaiseksi. Pitkä päämassa ja suuri keskiaukko säilyvät; tarkat ulottumat ja runkopaksuudet eivät varmistu.
- Koillis-/lounais-sivun epäsymmetriset ankkurit puuttuvat yksinkertaistetusta ulkokuoresta. Siksi etelä/Rokin-kamerasuunnan täsmällistä peilaamattomuutta ei voida todistaa, vaikka selkeää peilausvirhettä ei näy.

Suunnat: Greenwich pohjoinen/Thames (National Trustin maalaus + Historic Englandin riippumaton kaivaustieto). Whitehall länsi/St James Park (Danckertsin maalaus + Fisherin pohjatutkimus). De Keyser etelä/Rokin (Spilman/De Beijer + aikaisemman Visscherin painokuvan Rokin-merkintä vain suunnan tunnistamiseen, ei myöhäisten detaljien malliksi).

Pyydän KK:lta kohdekohtaisen kuvasanan. Greenwich ja Whitehall ovat rajattuja dokumentoituja rakennusryhmiä, eivät koko palatsialueen mittatarkkoja rekonstruktioita. De Keyserin ulkoarkadit ja kellotornin sovitus ovat merkittävä avoin varaus; sitä ei päästetä automaattisesti Tripoon tämän arkin perusteella. Jos vaihe/rajaus ei kelpaa, jätetään kohde odottamaan ja jatketaan dokumentoidumpiin.

Seuraavana valmistelussa Ringtheater (historiallinen julkisivu + uusi PD-pohja/leikkaukset), ERÄ 2B:n seuraavat lähteet sekä ERÄ 2D:n ensimmäisten linnojen lähteet. Ei uusintaottoja ilman yksilöityä kuvalupaa.
