# Grand Châtelet #2253: riippumaton visuaalinen QA

Tarkastettu `source-correction-2253.md` sekä `qa/01-north.png`, `04-west.png`, `05-upper-gray.png`, `06-upper-oblique-full.png` ja vastaava `06-upper-oblique-full-guide.png`. Lisäksi luettu rajatusti `transformation-report.json` ja olemassa oleva `qa/opening-rays.json`. Ei uutta renderiä, generointia, mallimuokkausta tai lähettämistä. Sädetarkistusta ei ajettu tässä uudelleen.

**Johtopäätös: PARTIAL / rakenne ei läpäise kokonaisuutena.** Osina teko säilytti näkyvän avoimen pihan ja erilliset rakennusmassat paremmin kuin #2250:n kokonaisotto. Läpiportti kuitenkin epäonnistui ja A:n suuret kattomuodot poikkeavat lähteestä. Kokoonpanoa tai historiallista rakennetta ei ole hyväksytty tämän QA:n perusteella.

| Tarkistus | Tulos | Havainto ja rajaus |
|---|---|---|
| 1. SW-paviljonki, kulmikas runko ja telttakatto | **PARTIAL** | 04/06 näyttävät suorasivuisen paviljongin ja tasopinnoista koostuvan telttakaton. Se ei ole muuttunut selvästi pyöreäksi torniksi. Paviljonki erottuu pitkien siipien yhteydessä, mutta täsmäpohjaa, korkeutta ja liitosten paikkaa ei näistä kuvista vahvisteta. |
| 2. Länsipiha avoin | **PASS näkyvyyden osalta / PARTIAL kokonaismitoissa** | 05/06:ssa siipien väli jää selvästi avoimeksi; aukko näkyy myös tekstuurittomassa 05:ssä. Kirjatussa sädeotoksessa neljä pihan pisteen pystysädettä on esteetöntä, samoin lähteessä. Tämä tukee avoimuutta, ei todista alkuperäistä 167 m² pinta-alaa, kaikkia pihan rajoja tai liitoksia. |
| 3. E–W-harjat ja kattomassojen erottelu | **FAIL A:ssa; PARTIAL sarjassa** | B:n kaksi pitkää kattoa ja länsipäädyt erottuvat 04/06:ssa. A:n itäosan pääkatto sen sijaan on muuttunut laajaksi auma-/hippikatoksi: 05/06 näyttävät päätyihin laskevat kolmiolappeet ja keskeltä haarautuvat kattosaumat lähteen kahden E–W-harjan ja päätyrytmin sijaan. Tämä on oikea geometriamuutos, sillä sama näkyy tekstuurittomassa 05:ssä. Pohjoisesta näkyy lisäksi lähteestä poikkeava korkea kattomassa ja pieni etupäätymäinen muoto portin oikealla; lähteen pohjoislape ei säily tarkasti. |
| 4. Portti auki läpi | **FAIL** | 01:ssä kaarisyvennyksen takana on kivinen sulkupinta ja pieni aukko/ikkuna, ei avoin katukäytävä. Olemassa oleva sädeloki tukee havaintoa: kaikki kuusi portin koesädettä osuvat kootussa mallissa A:n pintaan, mutta lähteessä samat kuusi kulkevat vapaasti. Ei pelkkä tumma valaistus tai tekstuuriepäselvyys. |
| 5. NE-torni suurin ja korkein pyöreä torni | **PARTIAL** | 01/06:ssa paksuin pyöreä torni on pohjoiskuvan vasemmalla ja muiden pyöreiden torneja hallitsevampi. Kartiokatto säilyy. Lähteen 17/25 m mittoja ei voi vahvistaa, ja A:n muuttunut korkea kattomassa nousee siluetissa tornin yläpuolelle. NE ei ole koko rakennuksen korkeimman kohdan vaatimus: lähteen SW-paviljonki on 26 m. |
| 6. Porttitornien ulokekonsolit | **PARTIAL** | 01:ssä kaksi hoikkaa porttitornia päättyy selviin kapeneviin kannakkeisiin portin sivuilla; ne eivät jatku maahan. Vastaava muoto näkyy 05:ssä. Alkuperäistä 5,5–7,5 m konsolialuetta, ulokkeen kokoa tai tarkkaa sijaintia ei PNG:istä mitata. |

## Kokoonpanon rajat

`transformation-report.json` määrittelee sijoittelun vain vertailuasetteluksi: positiivinen tasaskaala, yaw ja siirto, ei peilausta tai muodon korjausta. C:n `yawAmbiguousWithin2Percent=true`. C:n suunnan ja saumaliitosten pitää siksi pysyä epävarmoina; tyydyttävältä näyttävä kokonaiskuva ei ole todiste oikeasta sijoittelusta. Raportin lähimpien pintojen yksisuuntainen etäisyysmitta ei myöskään varmista puuttuvien lähdepintojen peittoa.

Pintojen kivi, liuske ja julkisivuluonne säilyvät tunnistettavina. Ne eivät korjaa portin sulkeutumista tai pääkattojen muutosta. Piha on tämän yrityksen selvä onnistuminen, mutta **samaa lähderakennetta ei saa merkitä automaattisesti hyväksytyksi**. KK päättää jatkosta erikseen; tämä raportti ei myönnä uutta ottoa, kokoonpanon hyväksyntää tai pelikelpoisuutta.
