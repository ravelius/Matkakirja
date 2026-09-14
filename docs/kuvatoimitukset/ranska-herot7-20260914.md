# Ranskan seitsemän kaupunkikortin historialliset kuvat

Fablen 14.9.2026 klo 19.13 UTC tilaamat kuvat on toimitettu versionoituihin R2-osoitteisiin. Manifesti sisältää kaupungit, lähteet, tekijä- ja julkaisijatiedot, ajoitukset, käyttöoikeusperusteet, kuvatekstit sekä tiedostojen tarkisteet. Fable liittää nämä erikseen valmistelemiinsa kaupunkikortteihin.

## Tarkistus

Root tarkasti kaikki seitsemän alkuperäiskuvaa visuaalisesti. JPEG-dekoodaus ja Commonsin SHA-1-vertailu läpäistiin. Julkaistuista tiedostoista tarkistettiin HEAD 200 sekä GET-vastauksen SHA-256, tavumäärä, MIME ja pelin originin CORS. Mediatiedostot ovat muuttamattomia Commons-alkuperäisiä.

## Käyttö

Kuvat ovat noin vuosilta 1890–1905; Lille on ennen ensimmäistä maailmansotaa julkaistu postikorttikuva. Näitä ei nimetä vuoden 1873 kuviksi tai isoisän ottamiksi. Kuusi kuvaa on historiallisia värillisiä photochrom-vedoksia, Lille mustavalkoinen. Alkuperäiset reunat ja kuvasuhteet säilyvät (noin 1,34–1,56:1): käytä tarvittaessa contain-sovitusta. Bordeaux’n lähde on 1024 × 758 px. Säilytä manifestin lähdekrediitti, erityisesti Lillen tekijä-/julkaisijamaininta ja Nantesin restaurointikrediitti.

| Kaupunki | Aihe | Lähde |
|---|---|---|
| Lyon | Place des Terreaux, Lyons, France | [Commons](https://commons.wikimedia.org/wiki/File:Lyon_placeterreaux_congres.jpg) |
| Bordeaux | Bordeaux. Place Pey-Berland et Cathedrale | [Commons](https://commons.wikimedia.org/wiki/File:Bordeaux._Place_Pey_-_Berland_et_Cath%C3%A9drale_LCCN2017659772.jpg) |
| Lille | Lille La Grande Place LL postcard | [Commons](https://commons.wikimedia.org/wiki/File:Lille_La_Grande_Place_LL_postcard.jpg) |
| Strasbourg | File:Straßburg (1890-1900).jpg | [Commons](https://commons.wikimedia.org/wiki/File:Stra%C3%9Fburg_(1890-1900).jpg) |
| Nizza | File:Cours Saleya - Nice.jpg | [Commons](https://commons.wikimedia.org/wiki/File:Cours_Saleya_-_Nice.jpg) |
| Toulouse | File:Capitol Place, Toulouse, France, ca. 1895.jpg | [Commons](https://commons.wikimedia.org/wiki/File:Capitol_Place,_Toulouse,_France,_ca._1895.jpg) |
| Nantes | La greve, Nantes, France, ca. 1897 | [Commons](https://commons.wikimedia.org/wiki/File:La_gr%C3%A8ve,_Nantes,_France,_ca._1897.jpg) |

Tämä PR toimittaa lähde- ja mediamanifestin. Pelin kaupunkikorttien kytkentä, pelijulkaisu ja tarkistussivun julkaisu ovat erillisiä työvaiheita.
