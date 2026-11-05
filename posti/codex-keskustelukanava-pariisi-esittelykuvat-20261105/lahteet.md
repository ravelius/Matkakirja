# Lähteet ja mallikuvat

## Kolme sarjan mallikuvaa

Tilauksen `/Users/koodaus/...`-välimuistitiedostoja ei ole tällä koneella. Samannimiset kanoniset pelin kuvat haettiin pelin nykyisen `js/media.js`-osoiteratkaisun (`julisteUrl`, `PEILI_JUURI`) ja tilauksen tiedostonimien perusteella 5.11.2026:

- [Eiffel](https://media.matkakirja.app/julisteet/herokoe/hero-pariisi-eiffel.jpg), SHA256 `7ee5ba9f1ef48778d549dac1209804b014fc568608f1ebbafa98a55fcfac3f8b`.
- [Notre-Dame](https://media.matkakirja.app/julisteet/herokoe/hero-pariisi-notre-dame.jpg), SHA256 `4948c2341b33242d79f1251c399aba956903910191790e372950832a3ad056ec`.
- [Sacré-Cœur](https://media.matkakirja.app/julisteet/herokoe/hero-pariisi-sacre-coeur.jpg), SHA256 `f8ee6a7e1cd7ca72292b038c5d8fc76e58ef70f909f61518c4ba7306edbe4ba4`.

Kaikki kolme HTTP 200 ja kuvatiedostoina avatut; alkuperäiset ladatut tavut säilytetty. Notre-Damen palvelin palauttaa PNG-tiedoston ja image/png-MIME:n `.jpg`-päätteestä huolimatta. Se on vain mallikuva eikä sitä muutettu tai korvattu palvelimella. Toisen koneen paikallisen välimuistin tavuyhtäläisyyttä ei voida todistaa; käytettyjen kanonisten kuvien tavut ja lähdeosoitteet on kirjattu. Kaikki kolme katsottiin ennen generointia ja käytettiin valo-, sävy- ja viimeistelyreferensseinä. Vertailukooste käyttää juuri näitä kolmea tiedostoa.

## Arkkitehtuurin tarkistus

- [Musée du Louvre: A pyramid for a symbol — Cour Napoléon & Pyramid](https://www.louvre.fr/en/explore/the-palace/a-pyramid-for-a-symbol). Tarkistuksessa Cour Napoléonin lasipyramidi, läpinäkyvä ruutulasitus, palatsin siivet ja allas-/kiveysympäristö. Nähtiin sivun [yleiskuva](https://api-www.louvre.fr/sites/default/files/2021-02/vue-de-la-pyramide-du-louvre-1.jpg) ja [pyramidikuva](https://api-www.louvre.fr/sites/default/files/2021-03/30-ans-pyramide.jpg).
- [Centre des monuments nationaux: Arc de Triomphe](https://www.paris-arc-de-triomphe.fr/en). Virallisen julkisivukuvan avulla tarkistettiin aukon, pilarien, palkiston, kattopäädyn ja veistospintojen perusmuodot. Käytetty [julkisivukuva](https://www.paris-arc-de-triomphe.fr/var/cmn_inter/storage/images/_aliases/header_dropdown_image_mobile/9/7/9/4/120364979-1-fre-FR/60d9975c48c7-Arc-de-triomphe-Jour-800x800.jpg).
- [Centre des monuments nationaux: The sculpted groups](https://www.paris-arc-de-triomphe.fr/en/discover/the-sculpted-groups). Champs-Élysées'n puolen veistosryhmät: Napoleonin triumfi ja vapaaehtoisten lähtö / La Marseillaise. Ryhmien sijainti ja pääluonne huomioitiin; yksittäisten veistoshahmojen tarkkaa kopiota ei luvata.

Viralliset valokuvat ovat vain sisäisiä arkkitehtuurin tarkistuslähteitä, eivät toimituskuvia tai niiden pikseliaineistoa. Niitä ei lisätty vertailukoosteeseen eikä syötetty generointityökaluun. Uusien kuvien sommittelut luotiin erikseen tilauksen mukaisesti. Generointiin syötettiin ainoastaan pelin kolme omaa sarjamallia.
