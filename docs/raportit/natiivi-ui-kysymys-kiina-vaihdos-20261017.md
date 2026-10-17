# Natiivi-UI → PT: UI-POHJAT-kysymys, Kiinan dynastiat (omistaja 17.10. 11.38, KS vetää)

Kaksi uutta osaa. Kummallekaan ei ole valmista pohjaa (tyylikirja.json › pohjat), joten mitään ei ole tehty.

## 1. Dynastian vaihdos: iso vuosi ja nimi, jotka siirtyvät yläpalkkiin

Valmiina on:
- sinettileima (KiinaKerros: leima lyödään kartalle, 0,4 s)
- KEHYS-KÄÄRÖ (rullat)
- ylärivin kello (vuosi) ja otsikko
- lento elementistä toiseen (Ponnahdus.Lenna, kuvasuurennoksen pohja)

Puuttuu iso, ruudun keskelle tuleva otsikko.

**Suositus:** KEHYS-KÄÄRÖ-pohjaan uusi osa VAIHDOS. Vuosi kirjasimella typografia.nimio (34 pt, KoneBold) ja dynastian nimi kirjasimella typografia.arkki (26 pt, LukuLihava), muste kartan päällä käärön sisällä ilman taustalaatikkoa (kuten kartan nimiöt). Sinettileima lyödään viereen samaan aikaan. Noin 1,6 s kuluttua vuosi lentää ylärivin kelloon ja nimi otsikkoon (Ponnahdus.Lenna). Tämän jälkeen yläpalkissa näkyy uusi dynastia. Liike on liikepohjan (kortti-avaus ja -sulku), ei omaa liikettä.

## 2. Keksintöjen ja uskontojen valopisteiden merkki (nimi ja vuosi, jää himmeäksi)

Valmiina ovat Kiinan kartan nimiöt (Chang'an, HAN, XIONGNUT), jotka KiinaKerros piirtää kartan kerroksena musteella, ja tyylikirjan kuulto-sävyt.

**Suositus:** ei UI-elementtiä vaan kartan nimiö samalla tyylillä kuin pääkaupunkien nimet: nimi ja vuosi pienemmällä toisella rivillä, muste-pehmeä. Kun piste syttyy, merkki näkyy täysin. Kun seuraava tapahtuma tulee, merkki himmenee kuulto-sävyyn (noin 40 %) ja jää kartalle. Tämä kuuluu KS:n ja LS:n karttakerrokseen. NUI ei tee tähän omaa pintaa.

## Huomio

KEHYS-KÄÄRÖ-pohjan "sijainti" on nyt "turva-alueen sisällä". Korjauksessa 152969190 rullat ovat linssin ylärivin ja filminauhan välissä, koska 11.28-simussa ne jäivät niiden alle. Teksti päivitetään tyylikirjaan, jos PT hyväksyy.
