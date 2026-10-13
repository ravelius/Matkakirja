# C — Malé 12.10.2026

Tila: kirjoitettu tekstiluonnos; ei täysi valmis kaupunki/erä, hyväksyntä, pelikytkentä tai julkaisu. Alkuperäinen paikallinen tarkistin on ajettu muuttamatta työkalua: `node paakaupungit-pilvi/tyokalu.mjs tarkista e10 male --lyhyt`.

Kirjoitettu: intro 862 mrk, artikkelin lisäteksti 820 mrk / 3 kappaletta; kansi + ruoka-teemasivu, 8 nostoa (499, 514, 542, 507, 516, 507, 526, 528 mrk); 5 opasjaksoa; 5 kysymystä (tasot 1/2/3); 3 tietoa; yksi varmennettu karttakohde ja 904 mrk / 3 kappaleen nähtävyysjuttu.

Todellinen lyhyen tarkistuksen tulos: 19 virhettä, 2 varoitusta, 0 kuvaa; exit 1. Kaikki 19 virhettä ovat `tiedosto puuttuu` seuraavissa rooleissa: valokuva, 3 kansikuvaa, 4 kansinostoa, matkailijalle-kuva, 5 opasjakson kuvaa, 4 ruokanostoa ja moskeijan juttukuva. Neljä kuvakenttää jätetty tyhjäksi nimenomaisen uuden ohjeen mukaan. Teksti-/rakennemittavirheitä ei havaittu. Koko paikallisajon kaksi varoitusta ovat karttakohteita 1 (pohjataso 6) ja saatiedot puuttuu. Työkalun numeerinen hyväksyntäportti ei mene läpi.

Avoimet: kartta partial 1/6–8 (muiden paikkojen omat pisteet, suojaraja ja faktat); B-kuvat/katselu; sääauditoinnin 48/48 primäärivarmennus; käytännön matkailutiedon ajantasaisuusauditointi; riippumattomat D/E/F. Säädata null, saa.json ei muokattu. Ei ennen–nyt-paria eikä uusia avauskuvia.

Poikkeamat: WP:n väestö/pinta-alalaajuus ristiriitainen; luvut pois. Rakennus- ja muut tarkat vuosiluvut yleistetty vuosisadaksi; lähteiden keskinäinen riippuvuus (WP → UNESCO) tunnistettu. 1873-väite kertoo vain jo olemassa olleesta moskeijasta, ei isoisän tekemisistä tai rakennuksen tarkasta silloisesta ulkoasusta. Ei git-operaatioita, pelimuutoksia, kuvahakuja, generointia tai uusia agentteja/sessioita.

Todisteet/SHA: `valiaikainen/nopea-e10-male/tarkistus-lyhyt.txt`, `tarkistus-kaikki.txt`, `mitat.json`, `sha256.json`, `lahdehaku-omat.jsonl`; lähde-HTML/tekstipoiminnat samassa kansiossa.


## Task118 korjaus 13.10.2026
Korjauslistan tekstilöydökset käsitelty lähdepohjan ja tallennettujen sivujen avulla. Pjongjang: Mugil cephalus on virallisessa EU-komission suomenkielisessä kalanimistössä juovakeltti, ei korjauslistan ehdottama harmaakefaali: https://fish-commercial-names.ec.europa.eu/fish-names/species/mugil-cephalus_fi . Malé: UNESCO5812 vahvistaa tongue/groove/pins; selkeä termi pontti-uraliitos, https://whc.unesco.org/en/tentativelists/5812/ . Pjongjangin talvinuudelifakta oli jo maalehdessä ja korvattiin juhla-/pitkän elämän perinteen käsittelyllä. Poliittisesti herkän kaupungin rajaukset säilytetty. ISS066-E-7985 paikkaristiriita jää mediaomistajan NASA-auditointiin; teksti ei nimeä jokea. Kuva-, kartta- ja sääportit erillisiä.
```text
VIRHE male: kansi nosto 1: tiedosto puuttuu
VIRHE male: kansi nosto 2: tiedosto puuttuu
VIRHE male: kansi nosto 3: tiedosto puuttuu
VIRHE male: kansi nosto 4: tiedosto puuttuu
VIRHE male: matkailijalle.kuva: tiedosto puuttuu
VIRHE male: opas jakso 1: tiedosto puuttuu
VIRHE male: opas jakso 2: tiedosto puuttuu
VIRHE male: opas jakso 3: tiedosto puuttuu
VIRHE male: opas jakso 4: tiedosto puuttuu
VIRHE male: opas jakso 5: tiedosto puuttuu
VIRHE male: teemasivu ruoka nosto 2: tiedosto puuttuu
VIRHE male: teemasivu ruoka nosto 4: tiedosto puuttuu
VIRHE male: juttu Hukuru Miskiy, vanha perjantaimoskeija kuva 1: tiedosto puuttuu
== male: 13 virhettä, 3 varoitusta, 6 kuvaa
YHTEENSÄ 1 kaupunkia: 13 virhettä, 3 varoitusta
```
SHA256 c1cab296c5b75bba3cbdeffa5f8dce7cb2c93531fd65a6e1470120ff60afff45

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash ad17b5b3c6f84db5640ba55b35fb7a13889fd9f62b388d52ae19b29e4f8fb712. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS male: kysymys 5: source ei ole Wikipedia-artikkeli
VAROITUS male: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS male: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash ad17b5b3c6f84db5640ba55b35fb7a13889fd9f62b388d52ae19b29e4f8fb712. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS male: kysymys 5: source ei ole Wikipedia-artikkeli
VAROITUS male: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS male: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
