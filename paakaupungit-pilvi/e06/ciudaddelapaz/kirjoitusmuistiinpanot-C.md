# Ciudad de la Paz — C-kirjoitus, pysyvä sessio 30

Tallennettu 2026-10-12T10:33:11+03:00. Tila: C-tekstiluonnos, osittainen kaupunkipaketti. A-lähdekooste ja tallennetut alkuperäislähteet käytetty; ei uusia verkkohakuja. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia tai pelikytkentää.

## Tuotos

- sisalto.json SHA-256: `aeba6c488c750f694be5ebc00c638f0d01706214b2d1207ede2fb972097ad2e9`
- Artikkeli: intro 758 merkkiä; jatko 811 merkkiä.
- Nostot 6; opasjaksojen paikat 5, tekstiä 3; kysymykset 5; tiedot 3.
- Karttapisteet ja kohdejutut 0. Mukana vain A:ssa paikkansa ja kelpoisuutensa vahvistaneet kohteet.
- Kuvat 0: kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä. B-kuvavalintaa ei ollut, kuvaputki avoin.
- saatiedot:null. Alkuperäisen saa.json:n olemassaolo ei yksin riitä 48/48 primäärivarmennukseksi; tässä ei uutta sääauditointia. Ei lämpö-/sademäärälukuja pelaajateksteissä.

## Lähdejälki ja rajaukset

Väitekohtaiset A-tunnukset ja osiot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-ciudaddelapaz/lahdesidokset.json`. Mitat ja lähtötiedostojen SHA-todisteet samassa väliaineistossa. Tarkat yksilähteiset vuodet/luvut yleistetty tai poistettu. 1873 on pelin vertailuvuosi, ei keksitty matkakertomus. Konteksti luettu ennen kirjoittamista.

- C partial: 6/8 erillistä nostoa; A-aineisto ei mahdollista neljää erillistä teemanostoa ilman toistoa. Ei täytetty puutetta yleisohjeilla.
- Oppaassa 3/5 lähteistettyä lyhyttä jaksoa; ruoka- ja ajankohtajakso tyhjiä. Parasta-lista puuttuu: lähteet eivät tue viittä käyntisuositusta.
- Kartta 0 ja kohdejutut 0: A ei vahvista paikkoja; rajat null, ei keksittyjä pisteitä tai suojattuja uusia rakennuksia.
- Kaikki kuvat odottavat erillistä kuvaputkea; kuvaroolien neljä kenttää tyhjiä.
- Saatiedot null: 48/48 primäärivarmennus puuttuu, ei käsin lukuja tai sääsuosituksia.
- Kontekstin Malabo-superlatiivi on ristiriidassa Bata-lähteen kanssa; sitä ei toistettu. Pääsession korjaushavainto, kontekstia ei muutettu.

## Alkuperäinen koneajo

Komento: `node paakaupungit-pilvi/tyokalu.mjs tarkista e06 ciudaddelapaz --lyhyt`

Poistumiskoodi 1. Lyhyt loki: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-ciudaddelapaz/tarkistus-lyhyt.txt`; varoitukset sisältävä alkuperäinen ajo: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-ciudaddelapaz/tarkistus-koko.txt`.

```text
VIRHE ciudaddelapaz: valokuva: tiedosto puuttuu
VIRHE ciudaddelapaz: kansikuva 1: tiedosto puuttuu
VIRHE ciudaddelapaz: kansikuva 2: tiedosto puuttuu
VIRHE ciudaddelapaz: kansikuva 3: tiedosto puuttuu
VIRHE ciudaddelapaz: kansi nosto 1: tiedosto puuttuu
VIRHE ciudaddelapaz: kansi nosto 2: tiedosto puuttuu
VIRHE ciudaddelapaz: kansi nosto 3: tiedosto puuttuu
VIRHE ciudaddelapaz: kansi nosto 4: tiedosto puuttuu
VIRHE ciudaddelapaz: matkailijalle.kuva: tiedosto puuttuu
VIRHE ciudaddelapaz: opas jakso 1: tiedosto puuttuu
VIRHE ciudaddelapaz: opas jakso 2: tiedosto puuttuu
VIRHE ciudaddelapaz: opas jakso 3: tiedosto puuttuu
VIRHE ciudaddelapaz: opas jakso 4: otsikko ja teksti
VIRHE ciudaddelapaz: opas jakso 4: tiedosto puuttuu
VIRHE ciudaddelapaz: opas jakso 5: otsikko ja teksti
VIRHE ciudaddelapaz: opas jakso 5: tiedosto puuttuu
VIRHE ciudaddelapaz: teemasivu historia: nostoja 2 (4)
VIRHE ciudaddelapaz: teemasivu historia nosto 1: tiedosto puuttuu
VIRHE ciudaddelapaz: teemasivu historia nosto 2: tiedosto puuttuu
VIRHE ciudaddelapaz: kohdekartta.esittely puuttuu
VIRHE ciudaddelapaz: kohdekartta.rajat { pohjoinen > etela, ita > lansi }
VIRHE ciudaddelapaz: kohteita 0 (1–15)
== ciudaddelapaz: 22 virhettä, 2 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 22 virhettä, 2 varoitusta
```

Varoitukset:

```text
VAROITUS ciudaddelapaz: oppaasta puuttuu matkailu { parasta, hyvaTietaa }
VAROITUS ciudaddelapaz: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Avoimet jatkoportit: kuvaputki/B, lähde-/karttapuutteet yllä, riippumaton D, tarvittava E, pääsession F ja mahdollinen hyväksyntä, pelikytkentä sekä julkaisu. Tiedoston tallennus ei ole mikään näistä.
