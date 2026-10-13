# Moroni – kirjoitusmuistiinpanot C

12.10.2026. Omistus vain e08/moroni. Rajattu lähdekooste ja C-tekstiluonnos tallennettu oikeaan NAS-klooniin. Ei Git-operaatioita, uusia agentteja, kuvahakuja, generointia, pelin muutoksia tai julkaisua.

Kirjoitettu: intro ja kolmikappaleinen artikkeli; kansi ja luonto-teemasivu, 4 + 4 nostoa; matkailijalle-kappale, viisiosainen opas, 5 parasta / 4 hyvä tietää; minitehtävä, viisi lähteistettyä kysymystä (tasot 1–3), kolme tietoa; yksi varmennettuun luonnonpaikan pisteeseen sidottu Karthalan kohdejuttu.

Mitat: intro 846, artikkeli 921 merkkiä; nostot 492 / 492 / 507 / 491 / 495 / 521 / 496 / 505. Kaikki nostot tavoitealueella 440–660.

Alkuperäinen `node paakaupungit-pilvi/tyokalu.mjs tarkista e08 moroni --lyhyt` ajettu (exit 1). Todellinen tulos 19 virhettä, 3 varoitusta, 0 kuvaa. Kaikki 19 virhettä ovat `tiedosto puuttuu`: valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5, Karthalan juttu 1. Täysitulosteen kolme varoitusta: `kohteita 1 (pohjataso 6)`, `kohde Karthala: 13 km kaupunkipisteestä`, `saatiedot puuttuu`. Ei tekstin mitta-, kappale-, skeema-, nosto-, opas-, kysymys-, minitehtävä- tai koordinaattirakenteen virheitä. Kone ei varmista faktoja.

Avoimet portit: kuvat 19 rooliin, historiallisen keskustan omat karttapisteet ja oikeusketjut (nykyinen kartta partial 1), Karthalan karttalaajuus/13 km poikkeama, Karthalan oma 1873-aikajana, sääauditointi ja D/E/F. Moskeijaa ei valittu kohteeksi: eri lähteiden ajoitus ristiriitainen ja tekijä tuntematon. Sen kontekstin tarkka 1427 on pääsession tarkistusasia. Museolle, torille ja medinalle ei lainattu kaupungin tai Wikivoyagen koordinaatteja.

Kaikissa 19 kuvaoliossa `tiedosto`, `lyhyt`, `selite`, `lahde` tyhjiä. Ei keksittyjä tiedostonimiä, kreditejä tai kuvatekstejä. Kuvaputki tarkistaa rakennus- ja ovikuvien tekijäketjun ja kaikki kuvissa mahdollisesti näkyvät uudet teokset.

Tarkat rakennus-/perustamis-/purkaus-/siirtovuodet, etäisyydet, väestö- ja ilmastoluvut jätettiin pelaajatekstistä pois. Smithsonianin lisälähde palautti 403; sitä ei käytetty eikä PDF-kiertoa tehty. Vuoden 1873 kehys koskee artikkelissa vain Moronin pitkää kauppahistoriaa, ei isoisän tapahtumia.

Todisteet: `valiaikainen/nopea-e08-moroni/lahde-manifesti.json`, `lisalahde-manifesti.json`, `tarkistus-lyhyt.txt`, `tarkistus-taysi.txt`, `tuotanto-sha256.json`. C-luonnos ei tarkoita hyväksyntää, täyttä A:ta, pelikytkentää tai julkaisua.


## Task118 korjaus 13.10.2026
Kaikki pelaajatekstikentät luettu ja sovellettu otoksen yleissäännöt. Lähdepohja, C-muistio sekä nykyiset Commons-lähdetiedot tarkistettu. Meta- ja täytelauseita korvattu kaupungin omilla faktoilla; vihjeet ja houkuttimet täsmennetty. Nykyiset kuvat, pisteet ja sää säilytetty; niiden puutteet ovat erillisiä portteja. Tuore mainin js/data-haku tehty ennen kirjoittamista. Ei Git, kuvia, pelikytkentää tai julkaisua.


```text
VIRHE moroni: kansikuva 2: tiedosto puuttuu
VIRHE moroni: kansikuva 3: tiedosto puuttuu
VIRHE moroni: kansi nosto 1: tiedosto puuttuu
VIRHE moroni: kansi nosto 2: tiedosto puuttuu
VIRHE moroni: kansi nosto 3: tiedosto puuttuu
VIRHE moroni: kansi nosto 4: tiedosto puuttuu
VIRHE moroni: matkailijalle.kuva: tiedosto puuttuu
VIRHE moroni: opas jakso 1: tiedosto puuttuu
VIRHE moroni: opas jakso 2: tiedosto puuttuu
VIRHE moroni: opas jakso 3: tiedosto puuttuu
VIRHE moroni: opas jakso 4: tiedosto puuttuu
VIRHE moroni: opas jakso 5: tiedosto puuttuu
VIRHE moroni: teemasivu luonto nosto 3: tiedosto puuttuu
VIRHE moroni: teemasivu luonto nosto 4: tiedosto puuttuu
== moroni: 14 virhettä, 3 varoitusta, 5 kuvaa
YHTEENSÄ 1 kaupunkia: 14 virhettä, 3 varoitusta
```
SHA256 88dfa62c5c3b5ab86517081153a2967d6acc723197f0e0562ca1ba54ac1f8941

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 5cce35c38c44314b88f936253db554f7af63f9e7097a473938da27bdfd26f192. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS moroni: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS moroni: kohde Karthala: 13 km kaupunkipisteestä
VAROITUS moroni: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 5cce35c38c44314b88f936253db554f7af63f9e7097a473938da27bdfd26f192. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS moroni: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS moroni: kohde Karthala: 13 km kaupunkipisteestä
VAROITUS moroni: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
