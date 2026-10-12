# Kingstown — C-kirjoitusmuistiinpanot, 12.10.2026

Tila: kokonainen C-tekstiluonnos, rajattu A, B tekemättä, kartta partial ja riippumaton D/E/F avoin. Ei hyväksyntää, pelikytkentää tai julkaisua. Omistus tehtävä 19, NAS-klooni e12.

Kirjoitettu: artikkelin intro ja kolmiosainen lisäteksti, kansi + luonto-teemasivu (4+4 nostoa), matkailijalle-kappale, opas 5 jaksoa, parasta 5 / hyvä tietää 3, minitehtävä, kysymykset 5 (tasot 1/2/3), tiedot 3, kohdejutut 2.

Mitat: intro 849 merkkiä, lisäteksti 814, nostot 480–532, kohdejutut 787/762. Lopulliset mitat ja kolmen tuotantotiedoston SHA-256: valiaikainen/nopea-e12-kingstown/todisteet.json.

Alkuperäinen tarkistin `node paakaupungit-pilvi/tyokalu.mjs tarkista e12 kingstown --lyhyt`: exit 1, 20 virhettä, 2 varoitusta. Jokainen virhe on `tiedosto puuttuu`: valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5 ja kohdekuvat 2. Varoitukset ovat kohteita 2 (pohjataso 6) ja saatiedot puuttuu. Teksti-/mitta-/visa-/rakennevirheitä ei tuloksessa. Täysi paikallinen tuloste tallennettu; verkkokuvakierrosta ei ajettu, koska kuvia ei ole valittu.

Avoimet portit:

- Kartta 2/6–8. Puutarhan ja Fort Charlotten omat WP-koordinaatit varmennettu; puuttuville kohteille ei lainata kaupungin pistettä. Puutarhan luontokohde ei sisällä modernia temppeliä, taideteoksia tai monumentteja. Linnakkeen modernit maalaukset pois kuvista.
- 20 kuvaroolin tiedosto/lyhyt/selite/lahde tyhjiä. Kuvaputken valinnat ja katselu sekä lopulliset kuvatekstit jäljellä. Ei Commons-hakuja, tiedostonimien arvausta tai generointia.
- `saatiedot:null`: 48/48 primääriauditointi ja sääaseman hyväksyntä avoin. saa.json koskematon. Ei sääarvoja tai kuukausikohtaista ilmastosuositusta teksteissä.
- Puutarhan rapautuminen 1800-luvulla kirjattu; ei oletusta 1873 kukoistavasta puutarhasta. Tarkat kasvimäärät, rakennusvuodet, etäisyydet, hinta-/aika- ja väestöluvut pois C:stä.
- Primäärilähteeksi saatiin NPA:n oma puutarhasivu ja suppea SVG Airports -kenttäluettelo (Argyle/SVD). Vanha matkailuviranomaisen kaupunkilinkki ohjasi etusivulle, joten sen kaupunkitekstiä ei käytetä. Väärä puutarhan WP-otsikko ja vanha government-osoite 404; erillinen botanicalgardens.gov.vc ei löytynyt DNS:stä. Ei sisältöä epäonnistuneista hauista.
- Opaslähde mainitsee nykyisen Argylen. Puheenvuorossa esitetty alustava väite vanhasta kentästä korjattiin heti eikä päätynyt tiedostoihin. Entinen E. T. Joshua ei ole saapumisohje. Ravintolan aikaisempi pie-and-peas-ruoka poistettiin nykyohjeesta.
- Riippumaton D-tarkistus ja E/F jäljellä: tarkat lähdeväitteet, opastiedon ajantasaisuus, linnakkeen tämänhetkinen käyntimahdollisuus ja kuvien suojattujen teosten rajaus varmistettava siellä. Ei väitettä hyväksytystä täydestä kaupungista.

Kaikki väliaineisto ja tuotanto NASilla. Vain kaksi omistettua kaupunkia; ei Git-, peli- tai julkaisumuutoksia. SHA tarkoittaa tiedostojen SHA-256-tiivistettä, ei commitia.
