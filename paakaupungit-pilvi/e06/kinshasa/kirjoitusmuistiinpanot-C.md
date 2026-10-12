# Kinshasa — C-kirjoitus, pysyvä sessio 30

Tallennettu 2026-10-12T10:12:05+03:00. Tila: C-tekstiluonnos, osittainen kaupunkipaketti. A-lähdekooste ja tallennetut alkuperäislähteet käytetty; ei uusia verkkohakuja. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia tai pelikytkentää.

## Tuotos

- sisalto.json SHA-256: `e88d5eedad9cce664e6a7a0e0d0a0e0ec12c7c44741f0a8f27022a3801070ef9`
- Artikkeli: intro 834 merkkiä; jatko 820 merkkiä.
- Nostot 8; opasjaksojen paikat 5, tekstiä 5; kysymykset 5; tiedot 3.
- Karttapisteet ja kohdejutut 2. Mukana vain A:ssa paikkansa ja kelpoisuutensa vahvistaneet kohteet.
- Kuvat 0: kaikkien kuvaroolien tiedosto, lyhyt, selite ja lahde tyhjiä. B-kuvavalintaa ei ollut, kuvaputki avoin.
- saatiedot:null. Alkuperäisen saa.json:n olemassaolo ei yksin riitä 48/48 primäärivarmennukseksi; tässä ei uutta sääauditointia. Ei lämpö-/sademäärälukuja pelaajateksteissä.

## Lähdejälki ja rajaukset

Väitekohtaiset A-tunnukset ja osiot: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-kinshasa/lahdesidokset.json`. Mitat ja lähtötiedostojen SHA-todisteet samassa väliaineistossa. Tarkat yksilähteiset vuodet/luvut yleistetty tai poistettu. 1873 on pelin vertailuvuosi, ei keksitty matkakertomus. Konteksti luettu ennen kirjoittamista.

- 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa. Maalehden ruoka-, rumba-, lingala-, lukasa- ja muut nimetyt aiheet vältetty.
- Kartta partial 2: Ngalieman lahti ja kasvitieteellinen kasvikokoelma. Eteläiset retkipaikat oppaassa, ei keskustakartan venytystä. Zoo jätetty pois nykytilan/paikkaroolin avoimuuden vuoksi.
- Kaikki kuvat odottavat kuvaputkea. Kasvipuutarhan suojatut rakenteet eivät ole kasvikokoelman kuvan pääaiheita; Lola ya Bonobon kaupallinen kuvankäyttö/paikkalupa avoin.
- Sää null: lähdepaketti hylkäsi sadesarjan kausivarmennuksen. Ei käsin lukuja eikä vuodenaikasuositusta.
- Matkustuskäytännöt perustuvat 11.10.2026 luettuun K13:een; D:n nykytilan tarkistus on erillinen portti.

## Alkuperäinen koneajo

Komento: `node paakaupungit-pilvi/tyokalu.mjs tarkista e06 kinshasa --lyhyt`

Poistumiskoodi 1. Lyhyt loki: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-kinshasa/tarkistus-lyhyt.txt`; varoitukset sisältävä alkuperäinen ajo: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e06-kinshasa/tarkistus-koko.txt`.

```text
VIRHE kinshasa: valokuva: tiedosto puuttuu
VIRHE kinshasa: kansikuva 1: tiedosto puuttuu
VIRHE kinshasa: kansikuva 2: tiedosto puuttuu
VIRHE kinshasa: kansikuva 3: tiedosto puuttuu
VIRHE kinshasa: kansi nosto 1: tiedosto puuttuu
VIRHE kinshasa: kansi nosto 2: tiedosto puuttuu
VIRHE kinshasa: kansi nosto 3: tiedosto puuttuu
VIRHE kinshasa: kansi nosto 4: tiedosto puuttuu
VIRHE kinshasa: matkailijalle.kuva: tiedosto puuttuu
VIRHE kinshasa: opas jakso 1: tiedosto puuttuu
VIRHE kinshasa: opas jakso 2: tiedosto puuttuu
VIRHE kinshasa: opas jakso 3: tiedosto puuttuu
VIRHE kinshasa: opas jakso 4: tiedosto puuttuu
VIRHE kinshasa: opas jakso 5: tiedosto puuttuu
VIRHE kinshasa: teemasivu luonto nosto 1: tiedosto puuttuu
VIRHE kinshasa: teemasivu luonto nosto 2: tiedosto puuttuu
VIRHE kinshasa: teemasivu luonto nosto 3: tiedosto puuttuu
VIRHE kinshasa: teemasivu luonto nosto 4: tiedosto puuttuu
VIRHE kinshasa: juttu Ngalieman lahti kuva 1: tiedosto puuttuu
VIRHE kinshasa: juttu Kinshasan kasvitieteellinen puutarha kuva 1: tiedosto puuttuu
== kinshasa: 20 virhettä, 2 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 20 virhettä, 2 varoitusta
```

Varoitukset:

```text
VAROITUS kinshasa: kohteita 2 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS kinshasa: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Avoimet jatkoportit: kuvaputki/B, lähde-/karttapuutteet yllä, riippumaton D, tarvittava E, pääsession F ja mahdollinen hyväksyntä, pelikytkentä sekä julkaisu. Tiedoston tallennus ei ole mikään näistä.
