# Gitega — C-kirjoitus, pysyvä sessio 30

Tallennettu 2026-10-12T10:30:50+03:00. Tila: C-tekstiluonnos, osittainen kaupunkipaketti. A-lähdekooste ja tallennetut alkuperäislähteet käytetty; ei uusia verkkohakuja. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia tai pelikytkentää.

## Tuotos

- sisalto.json SHA-256: `28e4b2576af2048a97c0f43f1f7863361a7060218b7aa5f44c9e69dbffc0e340`
- Artikkeli: intro 859 merkkiä; jatko 824 merkkiä.
- Nostot 8; opasjaksojen paikat 5, tekstiä 5; kysymykset 5; tiedot 3.
- Karttapisteet ja kohdejutut 0. Mukana vain A:ssa paikkansa ja kelpoisuutensa vahvistaneet kohteet.
- Kuvat 0: kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä. B-kuvavalintaa ei ollut, kuvaputki avoin.
- saatiedot:null. Alkuperäisen saa.json:n olemassaolo ei yksin riitä 48/48 primäärivarmennukseksi; tässä ei uutta sääauditointia. Ei lämpö-/sademäärälukuja pelaajateksteissä.

## Lähdejälki ja rajaukset

Väitekohtaiset A-tunnukset ja osiot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-gitega/lahdesidokset.json`. Mitat ja lähtötiedostojen SHA-todisteet samassa väliaineistossa. Tarkat yksilähteiset vuodet/luvut yleistetty tai poistettu. 1873 on pelin vertailuvuosi, ei keksitty matkakertomus. Konteksti luettu ennen kirjoittamista.

- 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa. Ruokajakso nimetty Burundin yleiskeittiöksi, ei Gitegan erikoisuudeksi.
- Kartta partial 0: Gishoran aukio-/paikkatyypin ratkaisu avoin, Ruvyironzan yhtymä keskustan ulkopuolella, torin oma WP/WD-piste puuttuu. Suojattuja museo- ja katedraalirakennuksia ei käytetty täytteenä.
- Parasta-lista tyhjä: A:n viisi sisältöaihetta eivät ole viisi vahvistettua nykyistä käyntisuositusta. Oppaan täysi käyntiportti avoin.
- Gishoran perustamisajasta ja perustajasta ristiriita H3/H4: ei varmaa 1873-tilaa, perustajaa tai täsmävuotta.
- Kuvaputki avoin, kaikki kuvakentät tyhjiä. Sää null, 48/48 primäärivarmennus puuttuu. Nykyohje perustuu 11.10.2026 luettuun H18:aan.

## Alkuperäinen koneajo

Komento: `node paakaupungit-pilvi/tyokalu.mjs tarkista e06 gitega --lyhyt`

Poistumiskoodi 1. Lyhyt loki: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-gitega/tarkistus-lyhyt.txt`; varoitukset sisältävä alkuperäinen ajo: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-gitega/tarkistus-koko.txt`.

```text
VIRHE gitega: valokuva: tiedosto puuttuu
VIRHE gitega: kansikuva 1: tiedosto puuttuu
VIRHE gitega: kansikuva 2: tiedosto puuttuu
VIRHE gitega: kansikuva 3: tiedosto puuttuu
VIRHE gitega: kansi nosto 1: tiedosto puuttuu
VIRHE gitega: kansi nosto 2: tiedosto puuttuu
VIRHE gitega: kansi nosto 3: tiedosto puuttuu
VIRHE gitega: kansi nosto 4: tiedosto puuttuu
VIRHE gitega: matkailijalle.kuva: tiedosto puuttuu
VIRHE gitega: opas jakso 1: tiedosto puuttuu
VIRHE gitega: opas jakso 2: tiedosto puuttuu
VIRHE gitega: opas jakso 3: tiedosto puuttuu
VIRHE gitega: opas jakso 4: tiedosto puuttuu
VIRHE gitega: opas jakso 5: tiedosto puuttuu
VIRHE gitega: teemasivu musiikki nosto 1: tiedosto puuttuu
VIRHE gitega: teemasivu musiikki nosto 2: tiedosto puuttuu
VIRHE gitega: teemasivu musiikki nosto 3: tiedosto puuttuu
VIRHE gitega: teemasivu musiikki nosto 4: tiedosto puuttuu
VIRHE gitega: kohdekartta.esittely puuttuu
VIRHE gitega: kohdekartta.rajat { pohjoinen > etela, ita > lansi }
VIRHE gitega: kohteita 0 (1–15)
== gitega: 21 virhettä, 2 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 21 virhettä, 2 varoitusta
```

Varoitukset:

```text
VAROITUS gitega: oppaasta puuttuu matkailu { parasta, hyvaTietaa }
VAROITUS gitega: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Avoimet jatkoportit: kuvaputki/B, lähde-/karttapuutteet yllä, riippumaton D, tarvittava E, pääsession F ja mahdollinen hyväksyntä, pelikytkentä sekä julkaisu. Tiedoston tallennus ei ole mikään näistä.
