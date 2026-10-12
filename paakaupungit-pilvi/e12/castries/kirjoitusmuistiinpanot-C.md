# Castries — C-kirjoitusmuistiinpanot, 12.10.2026

Tila: kokonainen C-tekstiluonnos, rajattu A, B tekemättä, kartta partial, D/E/F avoin. Ei hyväksyntää, pelikytkentää tai julkaisua. NAS-klooni e12; omistus tehtävä 19.

Kirjoitettu: artikkelin intro ja 3-kappaleinen lisäteksti, kansi + historia-teemasivu (4+4 nostoa), matkailijalle-kappale, opas 5 jaksoa, parasta 5 / hyvä tietää 3, minitehtävä, kysymykset 5 (tasot 1/2/3), tiedot 3 ja kohdejutut 3.

Mitat: intro 911 merkkiä, lisäteksti 816, nostot noin 492–531, kohdejutut 739/712/742. Lopulliset koneelliset mitat ja SHA: valiaikainen/nopea-e12-castries/todisteet.json.

Alkuperäinen tarkistin `node paakaupungit-pilvi/tyokalu.mjs tarkista e12 castries --lyhyt`: exit 1, 21 virhettä ja 2 varoitusta. Kaikki virheet ovat todellista tyyppiä `tiedosto puuttuu`: valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5 ja kohdekuvat 3. Varoitukset: kohteita 3 (pohjataso 6) ja saatiedot puuttuu. Teksti-/mitta-/visa-/JSON-virheitä ei tarkistimen tuloksessa. Täysi paikallinen tuloste mukana; verkkokuvakierrosta ei ajettu, koska yhtään kuvaa ei ole valittu.

Avoimet portit:

- Kartta 3/6–8. Koordinaatit kolmelta kohteen omalta Wikipedia-sivulta; lisäkohteita ei täytetä kaupungin pisteellä. Morne Fortune on kukkula, ei muistomerkin tai modernin oppilaitosrakennuksen peitenimi.
- 21 kuvaroolin neljä kenttää tyhjiä. Kuvaputken valinnat, lisenssit/katselu ja lopulliset kuvatekstit puuttuvat. Ei vanhojen kuvien arvattuja tiedostonimiä, kuvahakua tai generointia.
- `saatiedot:null`. Sääaseman 48/48 primääriauditointi avoin; saa.json koskematon. Oppaassa ei ilmastolukuja eikä kuukausikohtaisia lupauksia.
- Tarkat rakentamis- ja palovuodet yleistäen vuosisadaksi. Castriesin nimenvaihdosvuoden sisäinen ristiriita 1756/1785 ja virheellinen laiturilause 1835/1642 pois C-tekstistä.
- Katedraalin sisämaalaukset, modernit muistomerkit ja hautamuistomerkit pois kohde-/kuvarajauksesta. Aukio, vanha torikokonaisuus ja maaston kukkula ovat mukana.
- Viranomaisen vanha kaupunkisivu ei läpäissyt robots-301-käsittelyä, SLASPA:n vanha airport/about-linkki 404, National Trust -linkki robots-301. Niiden sisältöä ei käytetä. Onnistuneet primäärilähteet ovat Nobel Foundationin molemmat elämäkerrat; lentoaseman käytännön tieto C1+C2.
- Riippumaton faktantarkistus D ja korjaus/erävastaavan tarkistus E/F jäljellä. Erityisesti torin nykytoiminta ja käytännön opastieto tarkistettava näissä; luetut Wiki-lähteet voivat olla ajallisesti vanhoja.

Kaikki tuotanto ja väliaineisto NASilla. Ei Git-operaatioita, muiden kaupunkien tiedostoja, peliä tai julkaisua. SHA tarkoittaa tiedostojen SHA-256-tiivisteitä, ei commitia.
