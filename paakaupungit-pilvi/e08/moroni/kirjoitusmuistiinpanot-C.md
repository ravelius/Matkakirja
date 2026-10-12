# Moroni – kirjoitusmuistiinpanot C

12.10.2026. Omistus vain e08/moroni. Rajattu lähdekooste ja C-tekstiluonnos tallennettu oikeaan NAS-klooniin. Ei Git-operaatioita, uusia agentteja, kuvahakuja, generointia, pelin muutoksia tai julkaisua.

Kirjoitettu: intro ja kolmikappaleinen artikkeli; kansi ja luonto-teemasivu, 4 + 4 nostoa; matkailijalle-kappale, viisiosainen opas, 5 parasta / 4 hyvä tietää; minitehtävä, viisi lähteistettyä kysymystä (tasot 1–3), kolme tietoa; yksi varmennettuun luonnonpaikan pisteeseen sidottu Karthalan kohdejuttu.

Mitat: intro 846, artikkeli 921 merkkiä; nostot 492 / 492 / 507 / 491 / 495 / 521 / 496 / 505. Kaikki nostot tavoitealueella 440–660.

Alkuperäinen `node paakaupungit-pilvi/tyokalu.mjs tarkista e08 moroni --lyhyt` ajettu (exit 1). Todellinen tulos 19 virhettä, 3 varoitusta, 0 kuvaa. Kaikki 19 virhettä ovat `tiedosto puuttuu`: valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5, Karthalan juttu 1. Täysitulosteen kolme varoitusta: `kohteita 1 (pohjataso 6)`, `kohde Karthala: 13 km kaupunkipisteestä`, `saatiedot puuttuu`. Ei tekstin mitta-, kappale-, skeema-, nosto-, opas-, kysymys-, minitehtävä- tai koordinaattirakenteen virheitä. Kone ei varmista faktoja.

Avoimet portit: kuvat 19 rooliin, historiallisen keskustan omat karttapisteet ja oikeusketjut (nykyinen kartta partial 1), Karthalan karttalaajuus/13 km poikkeama, Karthalan oma 1873-aikajana, sääauditointi ja D/E/F. Moskeijaa ei valittu kohteeksi: eri lähteiden ajoitus ristiriitainen ja tekijä tuntematon. Sen kontekstin tarkka 1427 on pääsession tarkistusasia. Museolle, torille ja medinalle ei lainattu kaupungin tai Wikivoyagen koordinaatteja.

Kaikissa 19 kuvaoliossa `tiedosto`, `lyhyt`, `selite`, `lahde` tyhjiä. Ei keksittyjä tiedostonimiä, kreditejä tai kuvatekstejä. Kuvaputki tarkistaa rakennus- ja ovikuvien tekijäketjun ja kaikki kuvissa mahdollisesti näkyvät uudet teokset.

Tarkat rakennus-/perustamis-/purkaus-/siirtovuodet, etäisyydet, väestö- ja ilmastoluvut jätettiin pelaajatekstistä pois. Smithsonianin lisälähde palautti 403; sitä ei käytetty eikä PDF-kiertoa tehty. Vuoden 1873 kehys koskee artikkelissa vain Moronin pitkää kauppahistoriaa, ei isoisän tapahtumia.

Todisteet: `valiaikainen/nopea-e08-moroni/lahde-manifesti.json`, `lisalahde-manifesti.json`, `tarkistus-lyhyt.txt`, `tarkistus-taysi.txt`, `tuotanto-sha256.json`. C-luonnos ei tarkoita hyväksyntää, täyttä A:ta, pelikytkentää tai julkaisua.
