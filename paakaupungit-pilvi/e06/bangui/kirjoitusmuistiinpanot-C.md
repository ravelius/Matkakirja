# Bangui — C-kirjoitus, pysyvä sessio 30

Tallennettu 2026-10-12T10:09:29+03:00. Tila: C-tekstiluonnos, osittainen kaupunkipaketti. A-lähdekooste ja tallennetut alkuperäislähteet käytetty; ei uusia verkkohakuja. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia tai pelikytkentää.

## Tuotos

- sisalto.json SHA-256: `ce6a95860c8fb62e17c174743d849333ba06c5bdbb6a2e26ce9500cc6c73d437`
- Artikkeli: intro 843 merkkiä; jatko 823 merkkiä.
- Nostot 8; opasjaksojen paikat 5, tekstiä 5; kysymykset 5; tiedot 3.
- Karttapisteet ja kohdejutut 0. Mukana vain A:ssa paikkansa ja kelpoisuutensa vahvistaneet kohteet.
- Kuvat 0: kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä. B-kuvavalintaa ei ollut, kuvaputki avoin.
- saatiedot:null. Alkuperäisen saa.json:n olemassaolo ei yksin riitä 48/48 primäärivarmennukseksi; tässä ei uutta sääauditointia. Ei lämpö-/sademäärälukuja pelaajateksteissä.

## Lähdejälki ja rajaukset

Väitekohtaiset A-tunnukset ja osiot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-bangui/lahdesidokset.json`. Mitat ja lähtötiedostojen SHA-todisteet samassa väliaineistossa. Tarkat yksilähteiset vuodet/luvut yleistetty tai poistettu. 1873 on pelin vertailuvuosi, ei keksitty matkakertomus. Konteksti luettu ennen kirjoittamista.

- 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa. Vuosi 1889 tuettu riippumattomilla B1 ja valtion UNESCO-kuvauksella B6; tarkka ristiriitainen päivä pois.
- Kartta partial 0: paikallinen Ubangi-rannan WP/WD-piste puuttuu; Pendèrè-Senguèn piste vain UNESCO ja tyyppi avoin; Boali kaukana. Suojattuja kirkkoja tai museorakennusta ei lisätty.
- Parasta-lista tyhjä: A ei tue viittä toteutettavaa käyntisuositusta nykyisissä lähde-/turvallisuusrajoissa. Käyntioppaan hyväksyntä avoin.
- Kuvaputki avoin; kaikki kuvakentät tyhjiä. Saatiedot null, 48/48 primäärivarmennus puuttuu.
- Matkustusrajoitus ja museon sulkutila tallennetuista 11.10.2026 lähteistä, riippumattoman D:n nykytilatarkistus avoin.

## Alkuperäinen koneajo

Komento: `node paakaupungit-pilvi/tyokalu.mjs tarkista e06 bangui --lyhyt`

Poistumiskoodi 1. Lyhyt loki: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-bangui/tarkistus-lyhyt.txt`; varoitukset sisältävä alkuperäinen ajo: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-bangui/tarkistus-koko.txt`.

```text
VIRHE bangui: valokuva: tiedosto puuttuu
VIRHE bangui: kansikuva 1: tiedosto puuttuu
VIRHE bangui: kansikuva 2: tiedosto puuttuu
VIRHE bangui: kansikuva 3: tiedosto puuttuu
VIRHE bangui: kansi nosto 1: tiedosto puuttuu
VIRHE bangui: kansi nosto 2: tiedosto puuttuu
VIRHE bangui: kansi nosto 3: tiedosto puuttuu
VIRHE bangui: kansi nosto 4: tiedosto puuttuu
VIRHE bangui: matkailijalle.kuva: tiedosto puuttuu
VIRHE bangui: opas jakso 1: tiedosto puuttuu
VIRHE bangui: opas jakso 2: tiedosto puuttuu
VIRHE bangui: opas jakso 3: tiedosto puuttuu
VIRHE bangui: opas jakso 4: tiedosto puuttuu
VIRHE bangui: opas jakso 5: tiedosto puuttuu
VIRHE bangui: teemasivu ruoka nosto 1: tiedosto puuttuu
VIRHE bangui: teemasivu ruoka nosto 2: tiedosto puuttuu
VIRHE bangui: teemasivu ruoka nosto 3: tiedosto puuttuu
VIRHE bangui: teemasivu ruoka nosto 4: tiedosto puuttuu
VIRHE bangui: kohdekartta.esittely puuttuu
VIRHE bangui: kohdekartta.rajat { pohjoinen > etela, ita > lansi }
VIRHE bangui: kohteita 0 (1–15)
== bangui: 21 virhettä, 2 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 21 virhettä, 2 varoitusta
```

Varoitukset:

```text
VAROITUS bangui: oppaasta puuttuu matkailu { parasta, hyvaTietaa }
VAROITUS bangui: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Avoimet jatkoportit: kuvaputki/B, lähde-/karttapuutteet yllä, riippumaton D, tarvittava E, pääsession F ja mahdollinen hyväksyntä, pelikytkentä sekä julkaisu. Tiedoston tallennus ei ole mikään näistä.
