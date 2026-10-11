# e05 — A-vaiheen tilanne

Alkuaika: 11.10.2026 noin 20.00 Europe/Helsinki. Päivitetty: 2026-10-11T20:29:53+03:00

Oma klooni: NAS sessio-72-20261011/e05. Haara: paakaupungit-e05-codex. Pohja: e4f2845b3a82874550481fda26528df065820232.

Vaihe 0: kontekstit ja saa-syote.json tuotettu alkuperäisellä konteksti-työkalulla kaikille 10 kaupungille. Säärivit tuottaa pääsessio alkuperäisellä saa-työkalulla ja lähdesivusovituksella.

| kaupunki | A | B | C | D | E | F | huomio |
|---|---|---|---|---|---|---|---|
| bamako | ESTE: karttakohteiden määrä ja lähdekoordinaatit | pääsessio | pääsessio | pääsessio | pääsessio | pääsessio | A-valmis ei ole toimitusvalmis |
| ouagadougou | ESTE: kartan kohdemäärä ja väestöalueen täsmennys | pääsessio | pääsessio | pääsessio | pääsessio | pääsessio | A-valmis ei ole toimitusvalmis |
| niamey | ESTE: kartan kohdemäärä ja väestöennusteen alkuperäinen vahvistus | pääsessio | pääsessio | pääsessio | pääsessio | pääsessio | A-valmis ei ole toimitusvalmis |
| yamoussoukro | ESTE: paikallinen 1873-varmistus ja hyväksyttävä kartta | pääsessio | pääsessio | pääsessio | pääsessio | pääsessio | A-valmis ei ole toimitusvalmis |
| accra | kesken | pääsessio | pääsessio | pääsessio | pääsessio | pääsessio | A-valmis ei ole toimitusvalmis |
| lome | jonossa | pääsessio | pääsessio | pääsessio | pääsessio | pääsessio | A-valmis ei ole toimitusvalmis |
| portonovo | jonossa | pääsessio | pääsessio | pääsessio | pääsessio | pääsessio | A-valmis ei ole toimitusvalmis |
| abuja | jonossa | pääsessio | pääsessio | pääsessio | pääsessio | pääsessio | A-valmis ei ole toimitusvalmis |
| ndjamena | jonossa | pääsessio | pääsessio | pääsessio | pääsessio | pääsessio | A-valmis ei ole toimitusvalmis |
| yaounde | jonossa | pääsessio | pääsessio | pääsessio | pääsessio | pääsessio | A-valmis ei ole toimitusvalmis |

## Lähde- ja eräpoikkeukset

- Omistajan 11.10.2026 poikkeus: robots-sallitut tavalliset /wiki/-lähdesivut hyväksytty estettyjen /w/- ja /api/-polkujen sijaan. Kaikki lähdehaut yhteisellä valiaikainen/sallittu_haku.py-apurilla: Claude-User ja Matkakirja, redirectien tarkistus, lähdevarasto ja globaali enintään 1 pyyntö/s. Commons Special:Search ei käytössä. A-vaiheessa ei Commons-kuvahakuja.
- Kuva- ja lisenssipoikkeus ei vapauta oikeustarkistuksesta. Suojatut nykyteokset ja epävarmat rakennukset jätetään kohteista pois; vanha rakennusvuosi yksin ei todista tekijänoikeuden päättymistä. Kaupallisen pelin FOP täytyy tarvittaessa kattaa teostyyppi ja kaupallinen käyttö.
- Kaikki omat kirjoitukset, lähteet, lokit ja TMPDIR/pycache vain tämän NAS-tehtäväjuuren e05-kloonissa tai valiaikainen/e05-alueella. Yhteiseen checkoutiin ei koskettu.
- Tyhjän kloonin tiedostojen tuonti keskeytettiin ja jatkettiin sparse-tuontina. Pohjan ulkopuolisia muutoksia ei toimiteta.
- Ei apuagentteja, PR:ää, mergeä, pelikytkentää, julkaisua tai postilaatikkoviestejä.

### Bamako A 11.10.2026

Osioiden 0–9 lähdekooste toimitettu. Kartalle vain kaksi luonnonpaikkaa, niiden pisteet vain Wikivoyagessa; neljä rakennusehdokasta pois oikeus-/koordinaattiepävarmuuden vuoksi. A ei täytä täyden kartan porttia. Turvallisuuslähteenä FCDO, koska UM:n haetut polut eivät palauttaneet maakohtaista tiedotetta. Haetut lähteet ja hylkäykset koosteessa.

### ouagadougou A-vaiheen lähdekooste 11.10.2026 20.20

Osioiden 0–9 kooste kirjoitettu, kaksi hyväksyttävää karttapaikkaa lähdekoordinaatteineen. Muut neljä ehdokasta hylätty oikeus- tai lähdepuutteiden vuoksi. FESPACOn perustamisvuosi 1969 vahvistettu Wikipediasta ja järjestäjän sivulta. Ei B–F-töitä.

### niamey A-vaiheen lähdekooste 11.10.2026 20.25

Osioiden 0–9 kooste ja kolme paikallista luonnonkohdetta varmistettu Wiki-koordinaateista. Rakennusehdokkaat ja kauemmat saaret pois oikeus- tai rajausepävarmuuden vuoksi. Väestöennusteen kontekstin lähdehuomio säilytetty; lukua ei käsitelty uutena laskentatuloksena.

### yamoussoukro A-vaiheen lähdekooste 11.10.2026 20.29

Osioiden 0–9 lähdekooste kirjoitettu. Kuusi tutkittua maamerkkiehdokasta eivät läpäisseet vapaan kohteen ja lähdekoordinaattien porttia; modernit tunnetut rakennukset hylätty. Nimetyltä kylältä puuttuu vuoden 1873 vahvistus. Kaupungin ja autonomisen piirin väestöt erotettu. Attiékén vuoden 2024 UNESCO-merkintä varmistettu riippumattomasta UNESCO-lähteestä ja Wikipediasta.
