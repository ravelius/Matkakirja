# Yamoussoukro — C-kirjoitus 12.10.2026

Tekstiluonnos tallennettu; ei D/E/F-hyväksyntää, pelikytkentää tai julkaisua. A-faktapohja ja olemassa oleva konteksti luettu. Uusia verkkohakuja, kuva- tai sääauditointeja ei tehty.

## Väitteiden lähdekartta

Artikkeli/kansi K1: Y/F historia, Toponymie; K2: Y Since independence, F Urbanisme; K3: I Schools/Founding, F Enseignement supérieur; K4: F Commerce, V Eat. Ruoka L1: A Preparation, U Description; L2: F Agriculture, B johdanto; L3: F Agriculture, J johdanto; L4: K Uses, F Pêche. Opas: E/V, F Urbanisme/Culture/Commerce, I, A/U; aluevaraus T. Kysymykset Y/F/A/I/K; tiedot F/F/U. Lähdeavainten URL:t ja tallenteet A:n osiossa 0.

## Ratkaisut ja avoimet portit

- Kartta ja kohdejutut partial: A:ssa ei ole hyväksyttyä paikallista pistettä; 0 kohdetta, ei keksittyjä pisteitä.
- Nimetyn N’Gokron kylän tarkka 1873-tilanne on A:ssa vahvistamatta; sitä ei väitetä pelaajalle.
- Basilika, palatsit ja kampusrakennukset jätetty suojattuina modernina teoksina kartasta ja kuvatilauksista.
- Säätaustan nimetyt Source 1/Source 2 -lähteet puuttuvat; numeroita ei käytetty.
- Turvallisuus- ja vierailutietojen ajantasaisuus avoin D/F:ssä; koko maan vaarallisuutta ei yleistetty.
- Kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä: B-valintaa ei ole. Kuvaputki täydentää ja kuvat tarkistetaan erikseen.
- saatiedot:null: 48/48 primäärivarmennusta ei ole; saa.json ei muutu eikä pelaajatekstissä ole ilmastolukuja.
- Väestölukuja, yksilähteisiä tarkkoja vuosia tai keksittyä 1873-tarinaa ei lisätty.
- Karttarajat johdettu vain mukaan otetuista A-koordinaateista noin 300 m marginaalilla. Tyhjän kartan rajaus on tekninen luonnos.

## Mitat ja alkuperäinen tarkistin

```json
{
  "intro": 815,
  "teksti": 805,
  "nostot": [
    511,
    519,
    515,
    500,
    534,
    507,
    512,
    498
  ],
  "jaksot": 5,
  "kysymykset": 5,
  "tiedot": 3,
  "kohteet": 0,
  "jutut": [],
  "exit": 1
}
```

```text
VIRHE yamoussoukro: valokuva: tiedosto puuttuu
VIRHE yamoussoukro: kansikuva 1: tiedosto puuttuu
VIRHE yamoussoukro: kansikuva 2: tiedosto puuttuu
VIRHE yamoussoukro: kansikuva 3: tiedosto puuttuu
VIRHE yamoussoukro: kansi nosto 1: tiedosto puuttuu
VIRHE yamoussoukro: kansi nosto 2: tiedosto puuttuu
VIRHE yamoussoukro: kansi nosto 3: tiedosto puuttuu
VIRHE yamoussoukro: kansi nosto 4: tiedosto puuttuu
VIRHE yamoussoukro: matkailijalle.kuva: tiedosto puuttuu
VIRHE yamoussoukro: opas jakso 1: tiedosto puuttuu
VIRHE yamoussoukro: opas jakso 2: tiedosto puuttuu
VIRHE yamoussoukro: opas jakso 3: tiedosto puuttuu
VIRHE yamoussoukro: opas jakso 4: tiedosto puuttuu
VIRHE yamoussoukro: opas jakso 5: tiedosto puuttuu
VIRHE yamoussoukro: teemasivu ruoka nosto 1: tiedosto puuttuu
VIRHE yamoussoukro: teemasivu ruoka nosto 2: tiedosto puuttuu
VIRHE yamoussoukro: teemasivu ruoka nosto 3: tiedosto puuttuu
VIRHE yamoussoukro: teemasivu ruoka nosto 4: tiedosto puuttuu
VIRHE yamoussoukro: kohteita 0 (1–15)
VAROITUS yamoussoukro: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
== yamoussoukro: 19 virhettä, 1 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 19 virhettä, 1 varoitusta

```

Todisteet: /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e05-yamoussoukro; lähde- ja tuotostiedostojen SHA-256 erillisissä manifestissa.

## C:n viimeistely

Pelaajatekstin tekniset tarkistusselostukset poistettu kohdejutuista. A:n 1873-rajoja noudatetaan ilman rakennusten ulkoasun tai jokiuoman rekonstruktiota. Konevaroitusten täydet rivit tallennettu paikalliseen tarkistuslokiin.
