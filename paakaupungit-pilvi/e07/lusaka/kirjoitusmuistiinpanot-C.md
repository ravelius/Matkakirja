# Lusaka — C-kirjoitus, pysyvä sessio 30

Tallennettu 2026-10-12T10:30:56+03:00. Tila: C-tekstiluonnos, osittainen kaupunkipaketti. A-lähdekooste ja tallennetut alkuperäislähteet käytetty; ei uusia verkkohakuja. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia tai pelikytkentää.

## Tuotos

- sisalto.json SHA-256: `21f4eb010c31afc76b8f137e649fce7dbcd77707d3a0418635f0cfd81ae84257`
- Artikkeli: intro 902 merkkiä; jatko 869 merkkiä.
- Nostot 8; opasjaksojen paikat 5, tekstiä 5; kysymykset 5; tiedot 3.
- Karttapisteet ja kohdejutut 0. Mukana vain A:ssa paikkansa ja kelpoisuutensa vahvistaneet kohteet.
- Kuvat 0: kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä. B-kuvavalintaa ei ollut, kuvaputki avoin.
- Säärivi kopioitu alkuperäisestä saa.json:sta ilman tausta-kenttää. A:n 48/48-primäärivarmennus ja SHA vastaavat nykyistä tiedostoa. City Airport 67666, 1991–2020; ei Kenneth Kaundan 67665-asema. Ei käsin muutettuja numeroita eikä vuosisummaa pelaajatekstissä.

## Lähdejälki ja rajaukset

Väitekohtaiset A-tunnukset ja osiot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e07-lusaka/lahdesidokset.json`. Mitat ja lähtötiedostojen SHA-todisteet samassa väliaineistossa. Tarkat yksilähteiset vuodet/luvut yleistetty tai poistettu. 1873 on pelin vertailuvuosi, ei keksitty matkakertomus. Konteksti luettu ennen kirjoittamista.

- 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa. Bandan hattutemppujen luvut kahdesta riippumattomasta P3/P4-lähteestä, ei kohuja tai nykyurheiluennusteita.
- Kartta partial 0: N1–N3 rakennusten tekijä-/muutosketjut avoimia; N4–N7 omat pisteet tai historiapohja puuttuvat. Cairo Road ei ole aukio, kaukaiset luontokohteet vain oppaassa.
- Sää poikkeaa yhdeksästä muusta: valmis A-auditointi 48/48 NOAA/WMO City Airport 67666, 1991–2020. saa.json SHA vastaa auditointia. Kopio ilman tausta-kenttää, ei käsin numeroita, ei vuosisummaa 759. Laadullinen kuvaus vain tämän sarjan järjestyksestä.
- Njanji-korien yksityiskohta S6:sta, P5 vain abstrakti taustaan. Ei visaan ilman toista korikalustolähdettä; D:n faktaportti avoin.
- Kuvaputki avoin, kaikki kuvakentät tyhjiä. Nimettyjen rakennusten tai museon nykytaiteen kaupallista kuvalupaa ei oletettu.

## Alkuperäinen koneajo

Komento: `node paakaupungit-pilvi/tyokalu.mjs tarkista e07 lusaka --lyhyt`

Poistumiskoodi 1. Lyhyt loki: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e07-lusaka/tarkistus-lyhyt.txt`; varoitukset sisältävä alkuperäinen ajo: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e07-lusaka/tarkistus-koko.txt`.

```text
VIRHE lusaka: valokuva: tiedosto puuttuu
VIRHE lusaka: kansikuva 1: tiedosto puuttuu
VIRHE lusaka: kansikuva 2: tiedosto puuttuu
VIRHE lusaka: kansikuva 3: tiedosto puuttuu
VIRHE lusaka: kansi nosto 1: tiedosto puuttuu
VIRHE lusaka: kansi nosto 2: tiedosto puuttuu
VIRHE lusaka: kansi nosto 3: tiedosto puuttuu
VIRHE lusaka: kansi nosto 4: tiedosto puuttuu
VIRHE lusaka: matkailijalle.kuva: tiedosto puuttuu
VIRHE lusaka: opas jakso 1: tiedosto puuttuu
VIRHE lusaka: opas jakso 2: tiedosto puuttuu
VIRHE lusaka: opas jakso 3: tiedosto puuttuu
VIRHE lusaka: opas jakso 4: tiedosto puuttuu
VIRHE lusaka: opas jakso 5: tiedosto puuttuu
VIRHE lusaka: teemasivu tiede nosto 1: tiedosto puuttuu
VIRHE lusaka: teemasivu tiede nosto 2: tiedosto puuttuu
VIRHE lusaka: teemasivu tiede nosto 3: tiedosto puuttuu
VIRHE lusaka: teemasivu tiede nosto 4: tiedosto puuttuu
VIRHE lusaka: kohdekartta.esittely puuttuu
VIRHE lusaka: kohdekartta.rajat { pohjoinen > etela, ita > lansi }
VIRHE lusaka: kohteita 0 (1–15)
== lusaka: 21 virhettä, 0 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 21 virhettä, 0 varoitusta
```

Varoitukset:

```text

```

Avoimet jatkoportit: kuvaputki/B, lähde-/karttapuutteet yllä, riippumaton D, tarvittava E, pääsession F ja mahdollinen hyväksyntä, pelikytkentä sekä julkaisu. Tiedoston tallennus ei ole mikään näistä.
