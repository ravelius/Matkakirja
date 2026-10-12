# Lilongwe — C-kirjoitus, pysyvä sessio 30

Tallennettu 2026-10-12T10:30:54+03:00. Tila: C-tekstiluonnos, osittainen kaupunkipaketti. A-lähdekooste ja tallennetut alkuperäislähteet käytetty; ei uusia verkkohakuja. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia tai pelikytkentää.

## Tuotos

- sisalto.json SHA-256: `03c2c151cbaa5b969cbdf368d2589fbc1fbc11c0bebc9dfd3825b2ddadc3a063`
- Artikkeli: intro 899 merkkiä; jatko 867 merkkiä.
- Nostot 8; opasjaksojen paikat 5, tekstiä 5; kysymykset 5; tiedot 3.
- Karttapisteet ja kohdejutut 1. Mukana vain A:ssa paikkansa ja kelpoisuutensa vahvistaneet kohteet.
- Kuvat 0: kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä. B-kuvavalintaa ei ollut, kuvaputki avoin.
- saatiedot:null. Alkuperäisen saa.json:n olemassaolo ei yksin riitä 48/48 primäärivarmennukseksi; tässä ei uutta sääauditointia. Ei lämpö-/sademäärälukuja pelaajateksteissä.

## Lähdejälki ja rajaukset

Väitekohtaiset A-tunnukset ja osiot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e07-lilongwe/lahdesidokset.json`. Mitat ja lähtötiedostojen SHA-todisteet samassa väliaineistossa. Tarkat yksilähteiset vuodet/luvut yleistetty tai poistettu. 1873 on pelin vertailuvuosi, ei keksitty matkakertomus. Konteksti luettu ennen kirjoittamista.

- 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa. Eläinsanctuaryn sulku nykyiseltä ylläpitäjältä, ei vanhaa eläintarhakierroslupausta.
- Kartta partial 1: A:ssa hyväksytty Wildlife Centren metsäalue. A:n täysi ydinkarttarajaus avoin; yhden kohteen laskennallinen rajat-laatikko vain tämän paikan ympärille, ei väite valmiista 6–8-kohteen kartasta.
- Civo, Maula, tori ja hallintorakennukset pois historian/tekijöiden/pisteiden aukkojen vuoksi; Lilongwe-joen kaukaista suupistettä ei käytetty.
- Kuvaputki avoin, kaikki kuvakentät tyhjiä. Nykyisiä eläinveistoksia tai latvuspolun suunnitteluteoksia ei ole hyväksytty luontokuviksi.
- Sää null: A:ssa 1991–2020-otsikon ja 1961–1990-sadetaustan ristiriita. Ei käsin lukuja tai sään luonnehdintaa.
- Kuntoutusalueen sulkukysymyksen source on nykyinen alkuperäinen ylläpitäjä P1; paikallinen tarkistin varoittaa Wikipedia-linkin puuttumisesta. WP S4 lisätaustana lahdesidoksissa; source-listan WP-osoite aiheutti alkuperäisessä tarkistimessa virheellisen metatekstilipun. Tarkistinta ei muutettu.

## Alkuperäinen koneajo

Komento: `node paakaupungit-pilvi/tyokalu.mjs tarkista e07 lilongwe --lyhyt`

Poistumiskoodi 1. Lyhyt loki: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e07-lilongwe/tarkistus-lyhyt.txt`; varoitukset sisältävä alkuperäinen ajo: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e07-lilongwe/tarkistus-koko.txt`.

```text
VIRHE lilongwe: valokuva: tiedosto puuttuu
VIRHE lilongwe: kansikuva 1: tiedosto puuttuu
VIRHE lilongwe: kansikuva 2: tiedosto puuttuu
VIRHE lilongwe: kansikuva 3: tiedosto puuttuu
VIRHE lilongwe: kansi nosto 1: tiedosto puuttuu
VIRHE lilongwe: kansi nosto 2: tiedosto puuttuu
VIRHE lilongwe: kansi nosto 3: tiedosto puuttuu
VIRHE lilongwe: kansi nosto 4: tiedosto puuttuu
VIRHE lilongwe: matkailijalle.kuva: tiedosto puuttuu
VIRHE lilongwe: opas jakso 1: tiedosto puuttuu
VIRHE lilongwe: opas jakso 2: tiedosto puuttuu
VIRHE lilongwe: opas jakso 3: tiedosto puuttuu
VIRHE lilongwe: opas jakso 4: tiedosto puuttuu
VIRHE lilongwe: opas jakso 5: tiedosto puuttuu
VIRHE lilongwe: teemasivu luonto nosto 1: tiedosto puuttuu
VIRHE lilongwe: teemasivu luonto nosto 2: tiedosto puuttuu
VIRHE lilongwe: teemasivu luonto nosto 3: tiedosto puuttuu
VIRHE lilongwe: teemasivu luonto nosto 4: tiedosto puuttuu
VIRHE lilongwe: juttu Lilongwe Wildlife Centren metsäalue kuva 1: tiedosto puuttuu
== lilongwe: 19 virhettä, 3 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 19 virhettä, 3 varoitusta
```

Varoitukset:

```text
VAROITUS lilongwe: kysymys 3: source ei ole Wikipedia-artikkeli
VAROITUS lilongwe: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS lilongwe: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Avoimet jatkoportit: kuvaputki/B, lähde-/karttapuutteet yllä, riippumaton D, tarvittava E, pääsession F ja mahdollinen hyväksyntä, pelikytkentä sekä julkaisu. Tiedoston tallennus ei ole mikään näistä.
