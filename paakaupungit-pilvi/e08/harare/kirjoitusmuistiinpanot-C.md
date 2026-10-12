# Harare — C-kirjoitus 12.10.2026

Tekstiluonnos tallennettu; ei D/E/F-hyväksyntää, pelikytkentää tai julkaisua. A-faktapohja ja olemassa oleva konteksti luettu. Uusia verkkohakuja, kuva- tai sääauditointeja ei tehty.

## Väitteiden lähdekartta

Artikkeli S1/S3/S4/S5/S6/S8/S9; K1 S3/S4; K2 S5; K3 S6 ja P4 nykytoiminta; K4 S7. Luonto H1 S1/S9; H2 S1/S8; H3 S1/S10; H4 S11/P1. Opas P2/S18/O2, S1/S7/S13/S15/O1/S17, S11/P1/S12/P3, O1/O2. Kysymykset S1/S4/S11/S8/S5; tiedot S5/S4/P1. URL:t ja revisiot A:n osiossa 0; alkuperäiset tallenteet valiaikainen/harare-A/lahteet.json.

## Ratkaisut ja avoimet portit

- Kohdekartta partial: 0 hyväksyttyä ydinkohdetta. Africa Unity Squaren, Harare Gardensin ja Kopjen omat pisteet puuttuvat.
- Museon, katedraalin ja gallerian nykyisten rakennusosien tekijä-/teosketjut avoinna; ei kohteita.
- Botanicin ja Mukuvisin omat luontopisteet eivät korvaa historiallisen keskustan aukio-/puistopisteitä; käsitelty vain oppaassa.
- WMO-sääauditointi 36/48, NOAA-keskilämpö/asema 12 arvolle avoin; saatiedot:null, ei numeromuotoisia ilmastoväitteitä.
- Maalehden veistäjä-, musiikki-, ruoka-, urheilu-, Nehanda- ja Rudd-tarinoita ei toistettu.
- Nykyopas perustuu A:n 12.10.2026 luettuihin lähteisiin, UM-tiedote 18.9.2026; palvelut ja vierailut tarkistettava D/F:ssä.
- Kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä: B-valintaa ei ole. Kuvaputki täydentää ja kuvat tarkistetaan erikseen.
- saatiedot:null: 48/48 primäärivarmennusta ei ole; saa.json ei muutu eikä pelaajatekstissä ole ilmastolukuja.
- Väestölukuja, yksilähteisiä tarkkoja vuosia tai keksittyä 1873-tarinaa ei lisätty.
- Karttarajat johdettu vain mukaan otetuista A-koordinaateista noin 300 m marginaalilla. Tyhjän kartan rajaus on tekninen luonnos.

## Mitat ja alkuperäinen tarkistin

```json
{
  "intro": 849,
  "teksti": 850,
  "nostot": [
    495,
    505,
    504,
    516,
    481,
    484,
    517,
    494
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
VIRHE harare: valokuva: tiedosto puuttuu
VIRHE harare: kansikuva 1: tiedosto puuttuu
VIRHE harare: kansikuva 2: tiedosto puuttuu
VIRHE harare: kansikuva 3: tiedosto puuttuu
VIRHE harare: kansi nosto 1: tiedosto puuttuu
VIRHE harare: kansi nosto 2: tiedosto puuttuu
VIRHE harare: kansi nosto 3: tiedosto puuttuu
VIRHE harare: kansi nosto 4: tiedosto puuttuu
VIRHE harare: matkailijalle.kuva: tiedosto puuttuu
VIRHE harare: opas jakso 1: tiedosto puuttuu
VIRHE harare: opas jakso 2: tiedosto puuttuu
VIRHE harare: opas jakso 3: tiedosto puuttuu
VIRHE harare: opas jakso 4: tiedosto puuttuu
VIRHE harare: opas jakso 5: tiedosto puuttuu
VIRHE harare: teemasivu luonto nosto 1: tiedosto puuttuu
VIRHE harare: teemasivu luonto nosto 2: tiedosto puuttuu
VIRHE harare: teemasivu luonto nosto 3: tiedosto puuttuu
VIRHE harare: teemasivu luonto nosto 4: tiedosto puuttuu
VIRHE harare: kohteita 0 (1–15)
VAROITUS harare: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
== harare: 19 virhettä, 1 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 19 virhettä, 1 varoitusta

```

Todisteet: /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e08-harare; lähde- ja tuotostiedostojen SHA-256 erillisissä manifestissa.

## C:n viimeistely

Pelaajatekstin tekniset tarkistusselostukset poistettu kohdejutuista. A:n 1873-rajoja noudatetaan ilman rakennusten ulkoasun tai jokiuoman rekonstruktiota. Konevaroitusten täydet rivit tallennettu paikalliseen tarkistuslokiin.
