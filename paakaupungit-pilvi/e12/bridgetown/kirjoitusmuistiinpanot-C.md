# Bridgetown — C-kirjoitusmuistio 12.10.2026

Tehtävä 20, vain e12/bridgetown. Oikea työjuuri: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/e12`.

Tallennettu sisalto.json, rajattu faktapohja.md ja tämä muistio. Tekstit: intro 945 mrk / 2 kappaletta, Lue lisää 906 mrk / 3 kappaletta; kannen 4 nostoa 511/501/530/517 mrk, teeman 4 nostoa 494/472/509/522 mrk. Matkailuopas 5 jaksoa, parasta 5, hyvä tietää 4; kysymyksiä 5, tietoja 3, minitehtävä 1; kohdejuttuja 2. Kaikki nostot tavoitevälissä 440–660. Kuvat neljällä tyhjällä kentällä, saatiedot null. Alkuperäisestä Dakar-mallista käytetty rakenne; mallin tekstejä tai kuvia ei kopioitu.

Paikallinen alkuperäinen komento `node paakaupungit-pilvi/tyokalu.mjs tarkista e12 bridgetown --lyhyt` ajettu ja luettu. Tulos **20 virhettä, 2 varoitusta, 0 kuvaa**, exit 1. Kaikkien 20 virheen todellinen tyyppi on **tiedosto puuttuu** kuvapaikoissa: valokuva 1, kansikuvat 3, kansinostot 4, matkailijalle 1, opasjaksot 5, teemanostot 4, kohdejutut 2. Ei jäljelle jääneitä tekstin, kysymysten, minitehtävän tai muun rakenteen konevirheitä.

Varoitukset tarkastettu erillisellä saman paikallisen tarkistimen ajolla ilman --lyhyt: **kohteita 2 (pohjataso 6)** ja **saatiedot puuttuu**. Tarkistinta ei muokattu, virheitä ei peitetty. Lokit ovat omassa NAS-väliaineistossa `valiaikainen/nopea-e12-bridgetown/tarkistus-lyhyt.txt` ja `tarkistus-kaikki.txt`. Luonnoksen kirjoitusskriptin ensimmäinen ajo epäonnistui syntaksivirheeseen ennen sisalto.jsonin syntymistä; virhe korjattiin, tiedosto kirjoitettiin ja alkuperäinen tarkistin ajettiin uudelleen. Ensimmäisen epäonnistuneen ajon puuttuva sisalto.json ei kuulu viimeisen ajon virheisiin.

## Avoimet portit

- A on rajattu, ei täyden A:n hyväksyntä. Kartta **partial 2/6–8**. Nidhe Israelin ja parlamenttirakennusten omat WP-pisteet käytössä. Garrisonin WP-piste ristiriidassa sivun sijaintikuvauksen kanssa; sitä ei lainattu. Nykyistä Chamberlain Bridgeä ei tehty karttakohteeksi: nykyisen teoksen tekijä-/suoja-auditointi puuttuu. Historiallisesta kääntösillasta on tekstinosto.
- B/kuvaputki: **20 kuvapaikkaa** avoinna. Ei kuvia haettu, generoitu, nimetty tai kreditoitu. Kuvaputken on erotettava vanha kääntösilta nykyisestä nostosillasta sekä vanhat rakennukset moderneista teoksista, muistokaaresta ja valaistuksesta.
- Sää: primäärivarmennus puuttuu, null; ei säähaun lisäkierrosta eikä saa.json-muutosta.
- Faktat: parlamentin vuoden 1873 rakennusvaihe tuettu B3+B8. Muita täsmävuosia/määriä ei tuotu lukijan tekstiin. Kontekstin väkiluku koskee seurakuntaa ja on jätetty pois. Parlamentin museon ajantasaista sisäänpääsyä ei luvata lähteiden eron vuoksi.
- Riippumattomat D/E/F sekä teos-/kuvaoikeudet, peliin kytkentä ja julkaisu tekemättä. Ei Git-operaatioita, yhteisiä eräraportteja tai pelimuutoksia.

Tiedostojen SHA-256 ja tekstimäärät tallennetaan omaan `toimitustodisteet.json`-tiedostoon lopullisten tiedostojen jälkeen. Tämä on **kirjoitettu ja paikallisesti tarkistettu C-tekstiluonnos**, ei valmis erä, hyväksyntä eikä julkaisu.
