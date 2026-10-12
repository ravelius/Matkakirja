# São Tomé — C-kirjoitus, pysyvä sessio 30

Tallennettu 2026-10-12T10:04:45+03:00. Tila: C-tekstiluonnos, osittainen kaupunkipaketti. A-lähdekooste ja tallennetut alkuperäislähteet käytetty; ei uusia verkkohakuja. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia tai pelikytkentää.

## Tuotos

- sisalto.json SHA-256: `fcf6c23fa1c4f54f46f63351e7cb459f3c218615171ff9f1e9514565c06f832f`
- Artikkeli: intro 817 merkkiä; jatko 811 merkkiä.
- Nostot 8; opasjaksojen paikat 5, tekstiä 5; kysymykset 5; tiedot 3.
- Karttapisteet ja kohdejutut 3. Mukana vain A:ssa paikkansa ja kelpoisuutensa vahvistaneet kohteet.
- Kuvat 0: kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä. B-kuvavalintaa ei ollut, kuvaputki avoin.
- saatiedot:null. Alkuperäisen saa.json:n olemassaolo ei yksin riitä 48/48 primäärivarmennukseksi; tässä ei uutta sääauditointia. Ei lämpö-/sademäärälukuja pelaajateksteissä.

## Lähdejälki ja rajaukset

Väitekohtaiset A-tunnukset ja osiot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-saotome/lahdesidokset.json`. Mitat ja lähtötiedostojen SHA-todisteet samassa väliaineistossa. Tarkat yksilähteiset vuodet/luvut yleistetty tai poistettu. 1873 on pelin vertailuvuosi, ei keksitty matkakertomus. Konteksti luettu ennen kirjoittamista.

- 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa kirjoitettu A:n pohjalta. Sääjakson sijalla lähteistetty metsäretken suunnittelu, ei sääväitteitä.
- Kartta partial 3: linnake, Ana Chavesin lahti ja Ilhéu das Cabras. Obôn kaukainen aluepiste jätetty oppaaseen; kirkot pois oikeus-/historiallisuusportin takia. Ei kuuden kohteen täytekarttaa.
- Kuvaputki/B avoin: kaikki neljä kuvakenttää tyhjiä. Linnakkeen myöhempi majakka ja patsaat eivät ole vapaan alkuperäisrakennuksen kuva-aiheita ilman erillistä hyväksyntää.
- Sää null, 48/48 primäärivarmennus avoin; tarkkoja perustamis- ja rakennusvuosia ei käytetty. Tarkka väestöluku jätetty pois.

## Alkuperäinen koneajo

Komento: `node paakaupungit-pilvi/tyokalu.mjs tarkista e06 saotome --lyhyt`

Poistumiskoodi 1. Lyhyt loki: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-saotome/tarkistus-lyhyt.txt`; varoitukset sisältävä alkuperäinen ajo: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-saotome/tarkistus-koko.txt`.

```text
VIRHE saotome: valokuva: tiedosto puuttuu
VIRHE saotome: kansikuva 1: tiedosto puuttuu
VIRHE saotome: kansikuva 2: tiedosto puuttuu
VIRHE saotome: kansikuva 3: tiedosto puuttuu
VIRHE saotome: kansi nosto 1: tiedosto puuttuu
VIRHE saotome: kansi nosto 2: tiedosto puuttuu
VIRHE saotome: kansi nosto 3: tiedosto puuttuu
VIRHE saotome: kansi nosto 4: tiedosto puuttuu
VIRHE saotome: matkailijalle.kuva: tiedosto puuttuu
VIRHE saotome: opas jakso 1: tiedosto puuttuu
VIRHE saotome: opas jakso 2: tiedosto puuttuu
VIRHE saotome: opas jakso 3: tiedosto puuttuu
VIRHE saotome: opas jakso 4: tiedosto puuttuu
VIRHE saotome: opas jakso 5: tiedosto puuttuu
VIRHE saotome: teemasivu luonto nosto 1: tiedosto puuttuu
VIRHE saotome: teemasivu luonto nosto 2: tiedosto puuttuu
VIRHE saotome: teemasivu luonto nosto 3: tiedosto puuttuu
VIRHE saotome: teemasivu luonto nosto 4: tiedosto puuttuu
VIRHE saotome: juttu São Sebastiãon linnake kuva 1: tiedosto puuttuu
VIRHE saotome: juttu Ana Chavesin lahti kuva 1: tiedosto puuttuu
VIRHE saotome: juttu Ilhéu das Cabras kuva 1: tiedosto puuttuu
== saotome: 21 virhettä, 2 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 21 virhettä, 2 varoitusta
```

Varoitukset:

```text
VAROITUS saotome: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS saotome: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Avoimet jatkoportit: kuvaputki/B, lähde-/karttapuutteet yllä, riippumaton D, tarvittava E, pääsession F ja mahdollinen hyväksyntä, pelikytkentä sekä julkaisu. Tiedoston tallennus ei ole mikään näistä.
