# e05 — A-vaiheen tilanne

Alkuaika: 11.10.2026 noin 20.00 Europe/Helsinki. Päivitetty: 2026-10-11T21:39:29.562673+00:00

Oma klooni: NAS sessio-72-20261011/e05. Haara: paakaupungit-e05-codex. Pohja: e4f2845b3a82874550481fda26528df065820232.

Vaihe 0: kontekstit ja saa-syote.json tuotettu alkuperäisellä konteksti-työkalulla kaikille 10 kaupungille. Säärivit tuottaa pääsessio alkuperäisellä saa-työkalulla ja lähdesivusovituksella.

| kaupunki | A | B | C | D | E | F | huomio |
|---|---|---|---|---|---|---|---|
| bamako | ESTE: karttakohteiden määrä ja lähdekoordinaatit | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | A-valmis ei ole toimitusvalmis |
| ouagadougou | ESTE: kartan kohdemäärä ja väestöalueen täsmennys | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | A-valmis ei ole toimitusvalmis |
| niamey | ESTE: kartan kohdemäärä ja väestöennusteen alkuperäinen vahvistus | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | A-valmis ei ole toimitusvalmis |
| yamoussoukro | ESTE: paikallinen 1873-varmistus ja hyväksyttävä kartta | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | A-valmis ei ole toimitusvalmis |
| accra | valmis: A, 6 kohde-ehdotusta | osittain: 12/24 kuvaa | jonossa | — | — | — | Rakennusten erillinen PD-maksu-/oikeusketju ja vähintään10 pakollista kuvaa avoinna |
| lome | ESTE: kartan kohdemäärä ja rakennusten oikeusketjut | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | A-valmis ei ole toimitusvalmis |
| portonovo | ESTE: kartan kohdemäärä ja rakennusten oikeusketjut | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | A-valmis ei ole toimitusvalmis |
| abuja | ESTE: kartan kohdemäärä ja osa nykytilalähteistä | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | A-valmis ei ole toimitusvalmis |
| ndjamena | ESTE: kartan kohdemäärä ja museo-/opaslisälähteet | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | A-valmis ei ole toimitusvalmis |
| yaounde | ESTE: kartan kohdemäärä ja väestöalueen täsmennys | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | tekemättä (pääsessio) | A-valmis ei ole toimitusvalmis |

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

### accra A-vaiheen lähdekooste 11.10.2026 20.36

Kaikki 0–9 osiot, neljä kansi- ja teema-aihetta, opas ja kuusi karttakohdetta faktajoukkoineen. Lähteisiin sisältyvät UNESCO ja lentoaseman pitäjä. Labadin ristiriitainen Wikipedia-koordinaatti ratkaistu Wikidata P625:llä. Modernit suojatut teokset ja maalehden toistot rajattu pois. B–F ja kuvalisenssit avoinna.

### lome A-vaiheen lähdekooste 11.10.2026 20.43

Osioiden 0–9 lähdekooste ja yksi merirannan luontopiste. Vanhat palatsi, kirkko ja wharf lähteistetty, mutta suunnittelijoiden oikeusketjuihin jää puutteita. Moderni kauppahalli hylätty. Bè-kaupunginosan pistettä ei siirretty metsän tai laguunin pisteeksi.

### portonovo A-vaiheen lähdekooste 11.10.2026 20.52

Osioiden 0–9 lähdekooste ja yksi varmistettu puutarhan luontopiste. UNESCO-tila erotettu aielistaksi, ei maailmanperintöhyväksynnäksi. Viiden rakennus-/aukiovaihtoehdon avoimet lähde- ja oikeusketjut kirjattu. Lagosin paluumuuttajien kaupunkirakentamistarinan toisto rajattu pois.

### abuja A-vaiheen lähdekooste 11.10.2026 20.59

Osioiden 0–9 kooste, Aso ja Jabi lähdekoordinaatteineen. Uusi pääkaupunki erotettu alueen aiemmista yhteisöistä ja AMAC-ennuste koko FCT:stä. Suojatut nykyiset rakennukset/puistoteos hylätty. Zuma Rockin valmis fokusnosto ei toistu. Gooya-laakson Yobe-sijainti tunnistettu, ei väärää Abuja-kohdetta.

### ndjamena A-vaiheen lähdekooste 11.10.2026 21.07

Osioiden 0–9 kooste ja Logonen suu Charissa varmistettu Wiki-koordinaatista. Kaupunkilähteiden ristiriitaiset perustamis-/nimeämisvuodet pehmennetty. Museon valokset erotettu alkuperäisistä fossiileista, Toumaïn varma esi-isä-superlatiivi hylätty. Charin maalehti/fokusnostotoistot rajattu pois. Viisi muuta karttaehdokasta eivät läpäisseet oikeus-/lähdeporttia.

## A-vaiheen koontitila

10/10 kaupungille lähdekooste osioihin 0–9. A-portin täyttävä kaupunki 1/10: Accra. Muut 9 on merkitty esteellisiksi; niitä ei kuitata A-valmiiksi. B–F ovat tekemättä. Ei erätoimitusta, pelikytkentää tai julkaisua.

Kaupungit/maat ja osioiden 0–9 rakenne tarkistettu kaikista kymmenestä. Kontekstit ja saa-syote.json: 10 kaupunkia. Ei sisalto.json:ia tai kuvat.md:tä. npm test ja sisalto.json-tarkistin eivät kuulu tähän A-rajaukseen, eikä niitä ajettu. Rakennetarkistus ei ole riippumaton faktantarkistus.

Pääsession työpuuhun lisätyt saa.json-tiedostot: bamako, ouagadougou, niamey, yamoussoukro, accra, lome, abuja, ndjamena, yaounde. Niiden taustametadata kirjattu A-pohjiin; kuukausi-/vuosilukuja ei käsinkopioitu tai säätyökalua ajettu tässä sessiossa. Porto-Novon säärivi puuttuu. Yamoussoukron tausta.lahteet ei nimeä lähdeorganisaatioita: säätekstin lähdeportti avoin. Pääsession saa-syote.json-muutos ja saa.json-tiedostot jätetään pääsession Git-työksi.

Ei apuagentteja. Tarkkaa tämän session tokenkulutusta ei ole saatavilla työkaluraportista, eikä sitä arvioitu. Alkuaika noin 20.00 Europe/Helsinki 11.10.2026; viimeisin kellonaika päivitysrivillä.

## Pääsession Accra B -kierros

12/24 kuvaehdotusta katsottu ja tallennettu; yksikään tiedosto ei toistu. Yksi tuore matkailijapysty löytyi Labadin luonnonrannasta (2022, suhde 0,74980). Puuttuvat C1/C2/K1/L3/O1/O2/O5/N1/N2/N3/N4/N6; oppaassa vain kaksi kuvaa, joten sen vähintään kolmen kuvan portti ei täyty. B ei ole valmis. 64 rajattua ehdokasyritystä ja 54 henkilökohtaisesti katsottua esikatselua; lähde-/lisenssi- ja oikeusrajaukset kuvat.md:ssä sekä NAS-väliaineistossa accra-B/.

Korlen laguunin kolme eri tiedostoa ovat saman alueen eri kuvakulmia, eivät kolme eri nähtävyyttä. K2 Makolan myyntikotilot, K3 yleinen ghanalainen tro tro, K4 yleinen kirjoittava käsi; Aburi on eri paikkakunta ja opasretki, ei Accran keskusta. Rakennuskuvat jätetty ehdolle Ghanan lain §38(3):n mahdollisen PD-käytön maksuehdon vuoksi; lain §76:n sanamuotoa ei yksin esitetä maksuvapaaksi kaupalliseksi FOP:ksi. C voi kirjoittaa luonnoksen puutteet säilyttäen; ei erätoimitusta tai F-valmis-kuittausta.

## Omistajan uusi tekstityön nopeutus12.10.2026

Omistaja pyysi oleellista nopeutusta sekä enemmän sessioita/agentteja tavoitteenaan10x nopeus.30 pysyvää rinnakkaista sessiota luotu erillisille kaupunkijaoille. Kuvat pyydetty erillisestä Matkakirjan kuvat -putkesta, ensimmäinen Conakryn Camayennen kapokkipuut. Kirjoitetut tekstit eivät odota kuvia, puuttuvia karttapisteitä tai erillistä sääauditointia; puutteita ei arvata. Tekstiluonnoksen valmius ei ole sama kuin valmis-A–F, sisältöhyväksyntä, pelikytkentä tai julkaisu.

Välitallennus 2026-10-12T07:40:36.871526+00:00: tekstiluonnoksia 91/93 (97,8 %), osaluonnokset ja edelleen keskeneräiset kohdat omissa C-muistioissaan. Tässä erässä tallennetut ydinluonnokset: bamako, ouagadougou, niamey, yamoussoukro, accra, lome, portonovo, abuja, ndjamena, yaounde. Riippumattomat D-tarkistukset ja kuvien täydentäminen jatkossa. Tämä commit on tuotannon välitallennus, ei valmis-erätoimitus.
