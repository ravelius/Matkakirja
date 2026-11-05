# Codex → Karttaseppä: Panthéon #2096, yhden kierroksen diagnostinen toimitus (5.11.2026)

**8/8 kutsua tehty, QA FAIL.** Toimitus on omistajan ja Karttasepän arvioitavaksi, ei hyväksytty Tripo-syöte. Yhtäkään näkymää ei uusittu. Kaikki kahdeksan PNG:tä ovat natiivisti 1536 × 1024 RGB; tuotantopikseleitä ei jälkikäsitelty.

[Arviointiarkki](https://github.com/ravelius/Matkakirja/blob/eee35c88f4f501149265796d84684de914825ce4/posti/codex-karttaseppa-sarja24-pantheon-20261105/arkki.jpg) · [mitatut huomiot](https://github.com/ravelius/Matkakirja/blob/eee35c88f4f501149265796d84684de914825ce4/posti/codex-karttaseppa-sarja24-pantheon-20261105/huomiot.md) · [QA.json](https://github.com/ravelius/Matkakirja/blob/eee35c88f4f501149265796d84684de914825ce4/posti/codex-karttaseppa-sarja24-pantheon-20261105/QA.json) · [SHA256SUMS](https://github.com/ravelius/Matkakirja/blob/eee35c88f4f501149265796d84684de914825ce4/posti/codex-karttaseppa-sarja24-pantheon-20261105/SHA256SUMS) · [lähteet](https://github.com/ravelius/Matkakirja/blob/eee35c88f4f501149265796d84684de914825ce4/posti/codex-karttaseppa-sarja24-pantheon-20261105/LAHTEET.md)

Paikallinen arviointikansio: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/pantheon/`.

## Mitatut poikkeamat

- Viistojen korkeuskulma noin **37,98° / 37,69°**, tavoite 65°. Suorakulmaisten päälistareunojen kulmakertoimista saatu sin-arvio 0,615 / 0,611, tavoite 0,906; epävarmuus noin ±3°. [Mittauspisteet](https://github.com/ravelius/Matkakirja/blob/eee35c88f4f501149265796d84684de914825ce4/posti/codex-karttaseppa-sarja24-pantheon-20261105/Viistomittaukset.png).
- Koillinen näyttää vastakkaisen puolen, mutta täsmällistä 180° kamerakulmaa ja yhtäläistä mittakaavaa ei voida varmentaa.
- Etelä/pohjoinen leveydet 1246 / 1249 px, ero 0,24 %. Itä/länsi 982 / 1142 px, ero **15,07 %**.
- Leveys/kokonaiskorkeuspoikkeamat oikeisiin 112/83- ja 85/83-suhteisiin: etelä +3,98 %, pohjoinen +4,12 %, itä **+7,50 %**, länsi **+14,73 %**.
- Maaviiva etelä/pohjoinen/itä y=944, länsi y=996: **52 px ero**. Päälistan korkeus maasta 296 / 296 / 296 / 348 px: vaihtelu **16,83 %**. Yhteisen px/m-skaalan vaihtelu 9,23 %.
- Yläkuva on pystysuora ja portiikki lännessä, mutta rekisteröinti epäonnistui: rakennuksen bbox [366,228,1099,780], annetun jalanjäljen bbox [624,387,912,637].
- Viistojen pyöristetty itäpää ja katon pienet nupit/laatikot eivät säily yhtenäisinä sivukuvissa; rakennuksen muotoa ei hyväksytä oikeaksi kokonaisuutena.

## Maapohja ja lähteet

Jalanjäljen kaikki 44 274 pikseliä näyttävät kiveykseltä; väriehtoon osuvia nurmipikseleitä 0. Kolme polkunäytettä noin 5,99 / 5,99 / 9,98 mallimetriä, epävarmuus noin ±2 m: kaksi näytettä ovat 6 m alarajalla, eikä tämä yksin todista kaikkien polkujen kelpoisuutta. Ei pystykohteita tai vanhoja rakennushaamuja korjausalueella. Ulkopuolen pikselit muuttuivat, joten vastaanottaja koostaa **vain annetun maskin sisäosan**.

Ennen tuotantoa tarkastettiin CC BY-SA -ilmakuva ja koko rakennuksen CC BY-SA -valokuva, lisäksi IGN:n Licence Ouverte -ortokuva. Korkeus 83 m tarkistettiin SNCF Transilieniltä ja BPI:ltä. Länsiportiikin suunta varmennettiin #2116:n jälkeen Rue Soufflot/Luxembourg- ja Bibliothèque Sainte-Geneviève/Rue d’Ulm -ankkureista. Ensimmäisen promptin väärä ortokuvan portiikkiselite säilyy historiassa; kuvaa ei uusittu. Lähteet, lisenssit ja muodon poikkeamat on kirjattu pakettiin.

## Toimituskuitti

- Artefakticommit: `eee35c88f4f501149265796d84684de914825ce4`, haara `claude/postilaatikko`.
- 19 tiedostoa, 21 984 474 tavua. Jokainen toimitettu blob luettiin takaisin ja SHA256 varmennettiin.
- SHA256SUMS-tiedoston SHA256: `02790bb55bb0fc93efe34324a78c65a6e0f03c1d139942b27fd7e1fd33c365d1`.
- Ei omistajan tai vastaanottajan hyväksyntää, Tripo-toimitusta, R2-siirtoa, peli-integraatiota eikä julkaisua.
- Yhden kierroksen tuotanto ja diagnostinen toimitus on käsitelty loppuun. Mahdollisesta uudesta otosta päättää Karttaseppä; sitä ei aloitettu.
