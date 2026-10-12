# Niamey — C-kirjoitus 12.10.2026

Tekstiluonnos tallennettu; ei D/E/F-hyväksyntää, pelikytkentää tai julkaisua. A-faktapohja ja olemassa oleva konteksti luettu. Uusia verkkohakuja, kuva- tai sääauditointeja ei tehty.

## Väitteiden lähdekartta

Artikkeli ja kansi K1: N/H historia ja maantiede. K2: Q Location/Infrastructure/Importance. K3: N Water. K4: N Arts and architecture, B johdanto. Luonto L1: G Verlauf/Charakteristik; L2: S Geographie/Fauna; L3: N Geography; L4: I Geographie/Geschichte. Kohdejutut ja koordinaatit: G/I/S A:n osio 5. Opas: V Get in/By taxi/See/Buy/Eat, D, M, T; ruoka myös N Economy. Kysymykset: N/N/N/M/S; tiedot N Social activities, N Geography, B. Lähdeavaimet ja tallennuspolku A-faktapohjan osiossa 0.

## Ratkaisut ja avoimet portit

- Kohdejutut jäävät osin 700 merkin tavoitteen alle; lähteiden tukemia kuvauksia ei jatkettu täytetekstillä.

- Kohdekartta partial: kolme A:ssa varmennettua luontopistettä; 6–8 kohteen määräportti avoin.
- Grand Marchén, museon ja modernien rakennusten teosoikeuksia ei oleteta; ne eivät ole karttakohteita.
- Väestöennusteen alkuperäislähde jää A:n mukaan vahvistamatta.
- Turvallisuusvirke perustuu A:n 11.10.2026 tallennettuun FCDO-lähteeseen; ajantasaisuus tarkistettava myöhemmässä D/F:ssä.
- Kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä: B-valintaa ei ole. Kuvaputki täydentää ja kuvat tarkistetaan erikseen.
- saatiedot:null: 48/48 primäärivarmennusta ei ole; saa.json ei muutu eikä pelaajatekstissä ole ilmastolukuja.
- Väestölukuja, yksilähteisiä tarkkoja vuosia tai keksittyä 1873-tarinaa ei lisätty.
- Karttarajat johdettu vain mukaan otetuista A-koordinaateista noin 300 m marginaalilla. Tyhjän kartan rajaus on tekninen luonnos.

## Mitat ja alkuperäinen tarkistin

```json
{
  "intro": 783,
  "teksti": 807,
  "nostot": [
    513,
    493,
    472,
    503,
    485,
    492,
    496,
    496
  ],
  "jaksot": 5,
  "kysymykset": 5,
  "tiedot": 3,
  "kohteet": 3,
  "jutut": [
    663,
    650,
    671
  ],
  "exit": 1
}
```

```text
VIRHE niamey: valokuva: tiedosto puuttuu
VIRHE niamey: kansikuva 1: tiedosto puuttuu
VIRHE niamey: kansikuva 2: tiedosto puuttuu
VIRHE niamey: kansikuva 3: tiedosto puuttuu
VIRHE niamey: kansi nosto 1: tiedosto puuttuu
VIRHE niamey: kansi nosto 2: tiedosto puuttuu
VIRHE niamey: kansi nosto 3: tiedosto puuttuu
VIRHE niamey: kansi nosto 4: tiedosto puuttuu
VIRHE niamey: matkailijalle.kuva: tiedosto puuttuu
VIRHE niamey: opas jakso 1: tiedosto puuttuu
VIRHE niamey: opas jakso 2: tiedosto puuttuu
VIRHE niamey: opas jakso 3: tiedosto puuttuu
VIRHE niamey: opas jakso 4: tiedosto puuttuu
VIRHE niamey: opas jakso 5: tiedosto puuttuu
VIRHE niamey: teemasivu luonto nosto 1: tiedosto puuttuu
VIRHE niamey: teemasivu luonto nosto 2: tiedosto puuttuu
VIRHE niamey: teemasivu luonto nosto 3: tiedosto puuttuu
VIRHE niamey: teemasivu luonto nosto 4: tiedosto puuttuu
VIRHE niamey: juttu Gounti Yénan suu kuva 1: tiedosto puuttuu
VIRHE niamey: juttu Néini Goungoun saari kuva 1: tiedosto puuttuu
VIRHE niamey: juttu Trois Sœursin kukkulat kuva 1: tiedosto puuttuu
VAROITUS niamey: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS niamey: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
== niamey: 21 virhettä, 2 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 21 virhettä, 2 varoitusta

```

Todisteet: /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e05-niamey; lähde- ja tuotostiedostojen SHA-256 erillisissä manifestissa.

## C:n viimeistely

Pelaajatekstin tekniset tarkistusselostukset poistettu kohdejutuista. A:n 1873-rajoja noudatetaan ilman rakennusten ulkoasun tai jokiuoman rekonstruktiota. Konevaroitusten täydet rivit tallennettu paikalliseen tarkistuslokiin.

700 merkin kohdejuttutavoitteen alittavat lähderajatut kuvaukset: Gounti Yénan suu: 663 mrk; Néini Goungoun saari: 650 mrk; Trois Sœursin kukkulat: 671 mrk. Ei jatkettu pituuden vuoksi yleisohjeilla tai keksityillä yksityiskohdilla.
