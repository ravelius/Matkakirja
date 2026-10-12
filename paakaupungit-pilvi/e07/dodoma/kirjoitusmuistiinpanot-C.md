# Dodoma — C-kirjoitus, pysyvä sessio 30

Tallennettu 2026-10-12T10:30:53+03:00. Tila: C-tekstiluonnos, osittainen kaupunkipaketti. A-lähdekooste ja tallennetut alkuperäislähteet käytetty; ei uusia verkkohakuja. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia tai pelikytkentää.

## Tuotos

- sisalto.json SHA-256: `7be5b0b461ee1f1ea88fd0ac8243a48d5b45015684a52e9c963f5f84debfdc82`
- Artikkeli: intro 854 merkkiä; jatko 891 merkkiä.
- Nostot 8; opasjaksojen paikat 5, tekstiä 5; kysymykset 5; tiedot 3.
- Karttapisteet ja kohdejutut 0. Mukana vain A:ssa paikkansa ja kelpoisuutensa vahvistaneet kohteet.
- Kuvat 0: kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä. B-kuvavalintaa ei ollut, kuvaputki avoin.
- saatiedot:null. Alkuperäisen saa.json:n olemassaolo ei yksin riitä 48/48 primäärivarmennukseksi; tässä ei uutta sääauditointia. Ei lämpö-/sademäärälukuja pelaajateksteissä.

## Lähdejälki ja rajaukset

Väitekohtaiset A-tunnukset ja osiot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e07-dodoma/lahdesidokset.json`. Mitat ja lähtötiedostojen SHA-todisteet samassa väliaineistossa. Tarkat yksilähteiset vuodet/luvut yleistetty tai poistettu. 1873 on pelin vertailuvuosi, ei keksitty matkakertomus. Konteksti luettu ennen kirjoittamista.

- 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa; Tansanian maalehden TAZARA-, ruoka- ja musiikkiaiheet vältetty.
- Kartta partial 0: Lion Rock, asema, aukio ja museo eivät saa omaa sallittua pistettä; stadion-/yliopisto-/moskeijakohteiden paikkafakta- ja tekijäportit auki. Ei ward- tai instituutiopisteitä kohteiksi.
- Parasta-lista tyhjä: lähdepaketin viisi aihetta eivät ole viisi vahvistettua käyntikohdetta. Paikallinen ruokalähde puuttuu; viidessä opasjaksossa tutkimus, viljely ja käytännöt ilman yleistä ruokatoistoa.
- Sää null: A:n 48/48 on varmennettu, mutta NOAA/JMA-asemaotsikon sijaintiristiriita ja pääsession ratkaisu avoinna. Ei saa.json-muutoksia tai ilmastolukuja.
- Kaikki kuvakentät tyhjiä, kuvaputki avoin. Nykykäytäntöjen D-tarkistus erillinen.

## Alkuperäinen koneajo

Komento: `node paakaupungit-pilvi/tyokalu.mjs tarkista e07 dodoma --lyhyt`

Poistumiskoodi 1. Lyhyt loki: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e07-dodoma/tarkistus-lyhyt.txt`; varoitukset sisältävä alkuperäinen ajo: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e07-dodoma/tarkistus-koko.txt`.

```text
VIRHE dodoma: valokuva: tiedosto puuttuu
VIRHE dodoma: kansikuva 1: tiedosto puuttuu
VIRHE dodoma: kansikuva 2: tiedosto puuttuu
VIRHE dodoma: kansikuva 3: tiedosto puuttuu
VIRHE dodoma: kansi nosto 1: tiedosto puuttuu
VIRHE dodoma: kansi nosto 2: tiedosto puuttuu
VIRHE dodoma: kansi nosto 3: tiedosto puuttuu
VIRHE dodoma: kansi nosto 4: tiedosto puuttuu
VIRHE dodoma: matkailijalle.kuva: tiedosto puuttuu
VIRHE dodoma: opas jakso 1: tiedosto puuttuu
VIRHE dodoma: opas jakso 2: tiedosto puuttuu
VIRHE dodoma: opas jakso 3: tiedosto puuttuu
VIRHE dodoma: opas jakso 4: tiedosto puuttuu
VIRHE dodoma: opas jakso 5: tiedosto puuttuu
VIRHE dodoma: teemasivu tiede nosto 1: tiedosto puuttuu
VIRHE dodoma: teemasivu tiede nosto 2: tiedosto puuttuu
VIRHE dodoma: teemasivu tiede nosto 3: tiedosto puuttuu
VIRHE dodoma: teemasivu tiede nosto 4: tiedosto puuttuu
VIRHE dodoma: kohdekartta.esittely puuttuu
VIRHE dodoma: kohdekartta.rajat { pohjoinen > etela, ita > lansi }
VIRHE dodoma: kohteita 0 (1–15)
== dodoma: 21 virhettä, 2 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 21 virhettä, 2 varoitusta
```

Varoitukset:

```text
VAROITUS dodoma: oppaasta puuttuu matkailu { parasta, hyvaTietaa }
VAROITUS dodoma: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Avoimet jatkoportit: kuvaputki/B, lähde-/karttapuutteet yllä, riippumaton D, tarvittava E, pääsession F ja mahdollinen hyväksyntä, pelikytkentä sekä julkaisu. Tiedoston tallennus ei ole mikään näistä.
