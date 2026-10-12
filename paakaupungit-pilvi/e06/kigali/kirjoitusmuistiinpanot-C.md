# Kigali — C-kirjoitus, pysyvä sessio 30

Tallennettu 2026-10-12T10:30:48+03:00. Tila: C-tekstiluonnos, osittainen kaupunkipaketti. A-lähdekooste ja tallennetut alkuperäislähteet käytetty; ei uusia verkkohakuja. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia tai pelikytkentää.

## Tuotos

- sisalto.json SHA-256: `43dee916a07cd182e6bef00caae0e1c53f3ac54797198ccc934ef6c4c992a84c`
- Artikkeli: intro 894 merkkiä; jatko 845 merkkiä.
- Nostot 8; opasjaksojen paikat 5, tekstiä 5; kysymykset 5; tiedot 3.
- Karttapisteet ja kohdejutut 4. Mukana vain A:ssa paikkansa ja kelpoisuutensa vahvistaneet kohteet.
- Kuvat 0: kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä. B-kuvavalintaa ei ollut, kuvaputki avoin.
- saatiedot:null. Alkuperäisen saa.json:n olemassaolo ei yksin riitä 48/48 primäärivarmennukseksi; tässä ei uutta sääauditointia. Ei lämpö-/sademäärälukuja pelaajateksteissä.

## Lähdejälki ja rajaukset

Väitekohtaiset A-tunnukset ja osiot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-kigali/lahdesidokset.json`. Mitat ja lähtötiedostojen SHA-todisteet samassa väliaineistossa. Tarkat yksilähteiset vuodet/luvut yleistetty tai poistettu. 1873 on pelin vertailuvuosi, ei keksitty matkakertomus. Konteksti luettu ennen kirjoittamista.

- 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa. Sääjakson sijalla lähteistetty Nyamirambon yhteisötoiminta.
- Kartta partial 4 luonnonpaikkaa kaupungin ympäristössä, ei valmis historiallinen kävelykartta. Pääsession rajauspäätös avoin. Umusambi ulompi retkikohde oppaassa; Kandt-talo pois kartasta alkuperäisen rakennuksen oikeusnäytön avoimuuden vuoksi.
- Kaikki kuvakentät tyhjiä. Luontopaikkaa ei käytetä nykyisen puistoarkkitehtuurin, voimalan tai suojatun rakennuksen kuvan kiertotienä.
- Sää null: 48/48 primäärivarmennus puuttuu. Korkeus-, lajimäärä-, pinta-ala- ja väestötarkkuudet jätetty pois.
- Luontojuttujen karttapiste-/tarkistusmetateksti poistettu pelaajatekstistä; osa jutuista on alle 700 merkin tavoitteen, mutta yli alkuperäisen tarkistimen 400 merkin rajan. Ei uutta lähteetöntä täytettä.

## Alkuperäinen koneajo

Komento: `node paakaupungit-pilvi/tyokalu.mjs tarkista e06 kigali --lyhyt`

Poistumiskoodi 1. Lyhyt loki: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-kigali/tarkistus-lyhyt.txt`; varoitukset sisältävä alkuperäinen ajo: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-kigali/tarkistus-koko.txt`.

```text
VIRHE kigali: valokuva: tiedosto puuttuu
VIRHE kigali: kansikuva 1: tiedosto puuttuu
VIRHE kigali: kansikuva 2: tiedosto puuttuu
VIRHE kigali: kansikuva 3: tiedosto puuttuu
VIRHE kigali: kansi nosto 1: tiedosto puuttuu
VIRHE kigali: kansi nosto 2: tiedosto puuttuu
VIRHE kigali: kansi nosto 3: tiedosto puuttuu
VIRHE kigali: kansi nosto 4: tiedosto puuttuu
VIRHE kigali: matkailijalle.kuva: tiedosto puuttuu
VIRHE kigali: opas jakso 1: tiedosto puuttuu
VIRHE kigali: opas jakso 2: tiedosto puuttuu
VIRHE kigali: opas jakso 3: tiedosto puuttuu
VIRHE kigali: opas jakso 4: tiedosto puuttuu
VIRHE kigali: opas jakso 5: tiedosto puuttuu
VIRHE kigali: teemasivu luonto nosto 1: tiedosto puuttuu
VIRHE kigali: teemasivu luonto nosto 2: tiedosto puuttuu
VIRHE kigali: teemasivu luonto nosto 3: tiedosto puuttuu
VIRHE kigali: teemasivu luonto nosto 4: tiedosto puuttuu
VIRHE kigali: juttu Kigali-kukkula kuva 1: tiedosto puuttuu
VIRHE kigali: juttu Jali-kukkula kuva 1: tiedosto puuttuu
VIRHE kigali: juttu Nyabugogon jokisuu kuva 1: tiedosto puuttuu
VIRHE kigali: juttu Nyandungun kosteikko kuva 1: tiedosto puuttuu
== kigali: 22 virhettä, 2 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 22 virhettä, 2 varoitusta
```

Varoitukset:

```text
VAROITUS kigali: kohteita 4 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS kigali: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Avoimet jatkoportit: kuvaputki/B, lähde-/karttapuutteet yllä, riippumaton D, tarvittava E, pääsession F ja mahdollinen hyväksyntä, pelikytkentä sekä julkaisu. Tiedoston tallennus ei ole mikään näistä.
