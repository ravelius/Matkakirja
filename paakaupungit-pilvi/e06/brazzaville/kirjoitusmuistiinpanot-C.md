# Brazzaville — C-kirjoitus, pysyvä sessio 30

Tallennettu 2026-10-12T10:30:47+03:00. Tila: C-tekstiluonnos, osittainen kaupunkipaketti. A-lähdekooste ja tallennetut alkuperäislähteet käytetty; ei uusia verkkohakuja. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia tai pelikytkentää.

## Tuotos

- sisalto.json SHA-256: `6718e06a2b7a4034c315617a6cbe6ab039dfd293ad6c138dfddf7e65302776ce`
- Artikkeli: intro 833 merkkiä; jatko 861 merkkiä.
- Nostot 8; opasjaksojen paikat 5, tekstiä 5; kysymykset 5; tiedot 3.
- Karttapisteet ja kohdejutut 2. Mukana vain A:ssa paikkansa ja kelpoisuutensa vahvistaneet kohteet.
- Kuvat 0: kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä. B-kuvavalintaa ei ollut, kuvaputki avoin.
- saatiedot:null. Alkuperäisen saa.json:n olemassaolo ei yksin riitä 48/48 primäärivarmennukseksi; tässä ei uutta sääauditointia. Ei lämpö-/sademäärälukuja pelaajateksteissä.

## Lähdejälki ja rajaukset

Väitekohtaiset A-tunnukset ja osiot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-brazzaville/lahdesidokset.json`. Mitat ja lähtötiedostojen SHA-todisteet samassa väliaineistossa. Tarkat yksilähteiset vuodet/luvut yleistetty tai poistettu. 1873 on pelin vertailuvuosi, ei keksitty matkakertomus. Konteksti luettu ennen kirjoittamista.

- 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa. Rumba kuuluu tälle kaupungille; Kinshasan maalehden aiheita ei kopioitu.
- Kartta partial 2: Djouén suu ja Livingstonen koskien alku. Pool Malebon ja Mbamun laajat pisteet eivät ole keskustaa; Ramsar-piste vain R9, joten ei WP/WD-vaatimuksen ohitusta. Katedraalin suojattuja myöhempiä rakennusosia ei lisätty.
- Kuvaputki avoin, kaikki kuvakentät tyhjiä. Ei nykyisiä rumbatallenteita, suojattuja sanoituksia tai nykyteoksia.
- Saatiedot null: 48/48 primäärivarmennus puuttuu. Perustamisvuosien ristiriita yleistetty 1880-luvuksi, väestöluku jätetty pois.

## Alkuperäinen koneajo

Komento: `node paakaupungit-pilvi/tyokalu.mjs tarkista e06 brazzaville --lyhyt`

Poistumiskoodi 1. Lyhyt loki: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-brazzaville/tarkistus-lyhyt.txt`; varoitukset sisältävä alkuperäinen ajo: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-brazzaville/tarkistus-koko.txt`.

```text
VIRHE brazzaville: valokuva: tiedosto puuttuu
VIRHE brazzaville: kansikuva 1: tiedosto puuttuu
VIRHE brazzaville: kansikuva 2: tiedosto puuttuu
VIRHE brazzaville: kansikuva 3: tiedosto puuttuu
VIRHE brazzaville: kansi nosto 1: tiedosto puuttuu
VIRHE brazzaville: kansi nosto 2: tiedosto puuttuu
VIRHE brazzaville: kansi nosto 3: tiedosto puuttuu
VIRHE brazzaville: kansi nosto 4: tiedosto puuttuu
VIRHE brazzaville: matkailijalle.kuva: tiedosto puuttuu
VIRHE brazzaville: opas jakso 1: tiedosto puuttuu
VIRHE brazzaville: opas jakso 2: tiedosto puuttuu
VIRHE brazzaville: opas jakso 3: tiedosto puuttuu
VIRHE brazzaville: opas jakso 4: tiedosto puuttuu
VIRHE brazzaville: opas jakso 5: tiedosto puuttuu
VIRHE brazzaville: teemasivu musiikki nosto 1: tiedosto puuttuu
VIRHE brazzaville: teemasivu musiikki nosto 2: tiedosto puuttuu
VIRHE brazzaville: teemasivu musiikki nosto 3: tiedosto puuttuu
VIRHE brazzaville: teemasivu musiikki nosto 4: tiedosto puuttuu
VIRHE brazzaville: juttu Djoué-joen suu kuva 1: tiedosto puuttuu
VIRHE brazzaville: juttu Livingstonen koskijakson alku kuva 1: tiedosto puuttuu
== brazzaville: 20 virhettä, 2 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 20 virhettä, 2 varoitusta
```

Varoitukset:

```text
VAROITUS brazzaville: kohteita 2 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS brazzaville: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Avoimet jatkoportit: kuvaputki/B, lähde-/karttapuutteet yllä, riippumaton D, tarvittava E, pääsession F ja mahdollinen hyväksyntä, pelikytkentä sekä julkaisu. Tiedoston tallennus ei ole mikään näistä.
