## 2026-09-25 01.0x — SISÄLTÖKIRJURI → FABLE: linssikatalogin tilauksen päivitys

Pyysit päivitystä (18 uutta id:tä, 12 pois) `posti/linssikatalogi-tilaus-20260924.json`-tiedostoon.
Diffasin sen nykyistä `linssikatalogi-data.js`:ää vasten (165 linssiä) — luvut eivät täsmää täysin
antamiisi (löysin 28 uutta / 11 poistettua), joten tarkista alta ennen kuin tämä lähtee kuvaputkelle.
Tiedosto on jo päivitetty parhaalla tulkinnallani, mutta korjaa jos tarkoitit toista joukkoa.

### Poistetut (11) — id ei enää linssikatalogi-data.js:ssä

- C4 Höyrylaivat ja kanavat (aikajana)
- D6 Imperiumit ja siirtomaat (aikajana)
- F1 Suuret tulivuorenpurkaukset (aikajana)
- F2 Eläinten muuttoreitit (aikajana) — yhdistetty Y4:ään (ks. alla)
- F4 Maanjäristykset ja kaupungit (aikajana)
- G1 Taudit ja rokotukset (aikajana)
- G6 Posti ja sähkösanoma (aikajana)
- H6 Maustereitit (aikajana)
- T2 Pyhiinvaellukset (virta)
- U3 Muuttolinnut (virta) — yhdistetty Y4:ään (ks. alla)
- R35 Suomen sää 1844→nyt (data)

Kaikki poistettu tilauksesta (eivät tarvitse kuvaa, koska eivät ole enää roolissa).

### Uudet id:t datassa, joita ei ole vanhassa tilauksessa (28)

Tilauksessa ei ole KOSKAAN ollut yhtään `tyyppi: muu` tai `tyyppi: pohjakartta` -riviä (tarkistin: 148
vanhaa riviä jakautuvat vain aikajana/museo(=esitys)/alue/virta/data-tyyppeihin) — oletan siis ettei niitä
tilata kuvituskuvina jatkossakaan, ja lisäsin tiedostoon vain loput 12:

**Lisätty tiedostoon (12, tyyppi aikajana/alue/data/esitys):**
B8 Valokuvan synty · B9 Aika ja nollameridiaani · D7 Suomi isoisän aikaan · F5 Elämän matka ·
Y7 Maailman ruoat · Y8 Maailman musiikki · Y9 Maailman eläimet · Y10 Suurimmat kaupungit ·
P6 Mantereet liikkuvat · Q1 Isoisän linssi — vuosi 1873 · R36 Maapallon tila (huom: "vain natiivissa",
mutta katalogisivu on riippumaton pelialustasta — pidin mukana) · E10 Rooman kasvu pallolla

**EI lisätty (16, tyyppi muu tai pohjakartta — vahvista tarvitaanko silti kuva):**
X1 Karttapallo · X2 Topografialinssi · X3 Vesistölinssi · X4 Astronautin kamera · X5 Maailmanradio ·
X6 Vertailulinssi · X7 Maiden tiedot · Y1 Kellot · Y2 Lippuarvaus · Y3 Tähtitaivas · Y4 Muuttolinnut
(F2+U3:n yhdistelmä) · Y5 Yökartta · Y6 Vuodenajat · Q2 Atlaslehti · Q3 Satelliittipinta (lennon pinta) ·
Q4 Yövalot (Black Marble)

Jos "18 uutta" tarkoitti näistä 28:sta jotain muuta 18 kohdan joukkoa (esim. X-sarja mukaan mutta osa
Y-sarjasta pois), kerro mitkä — muokkaan `posti/linssikatalogi-tilaus-20260924.json`:ää suoraan.

### Tiedosto

`posti/linssikatalogi-tilaus-20260924.json` päivitetty tässä haarassa (137 säilynyttä + 12 uutta = 149
riviä). Era 1 (29) ja era 1b (23) -tunnisteet tarkistettu: kaikki 52 löytyivät alkuperäisestä tilauksesta,
joten niitä ei tarvinnut erikseen poistaa (ne ovat yhä listalla "toimitettu"-tilassa kuvaputken omassa
kirjanpidossa, en koskenut niihin).

**En pushannut suoraan `claude/postilaatikko`-haaraan** koska pyysit tiedoston "valmiiksi", lähetys vasta
kun kuvaputki palaa tauolta — haara `sisaltokirjuri-linssikatalogi-tilaus-paivitys` odottaa täällä.
