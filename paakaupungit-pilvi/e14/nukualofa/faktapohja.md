# Nukuʻalofa — rajattu A-lähdekooste, 12.10.2026

Tila: rajattu A, C-tekstiluonnos. Tämä ei ole valmis A/B/D/E/F-kokonaisuus. Omistus e14/nukualofa, tehtävä 25. Kaikki väliaineisto NASilla kansiossa `valiaikainen/nopea-e14-nukualofa/`.

## 0. Lähteet ja todistusketju

Sivut luettu 12.10.2026 tavallisilta robots-sallituilta HTTPS-sivuilta yhteisellä `sallittu_haku.py`-apurilla. Apuri tarkistaa Claude-Userin ja Matkakirja-käyttäjäagentin sekä redirectin jokaisen kohdepolun; globaali lukko ja vähintään sekunnin väli. HTML ja luettavat TXT-poiminnat omassa väliaineistossa; tiedostojen URL/SHA manifestissa `lahteet.json`. API-, Commons-kuva- ja PDF-hakuja ei tehty.

- **L1** en-Wikipedia, [Nukuʻalofa](https://en.wikipedia.org/wiki/Nuku%CA%BBalofa), johdanto, History/18th century, Expansion and reorganisation/Kolomotuʻa/Kolofoʻou/Maʻufanga, Transport. Tallenne `nukualofa.html`.
- **L2** en-Wikivoyage, [Tonga](https://en.wikivoyage.org/wiki/Tonga), By plane, Get around, Eat, Respect/Social etiquette and breaches. Tallenne `tonga-wikivoyage.html`. Reittiaikataulut, hinnat, viisumit, sääluvut ja turvallisuusluokitukset eivät siirtyneet C:hen.
- **L3** Tonga Tourism, [Tongatapu](https://www.tongatourism.travel/our-islands/tongatapu), The Sacred South, Tongatapu Highlights, Explore Nukuʻalofa, Dining. Tallenne `tongatapu.html`.
- **L4** Tonga Tourism, [Authentic Handicrafts](https://www.tongatourism.travel/discover/people-and-culture/authentic-handicrafts), käsityötekniikat, Talamahu, Langafonua, Ancient Tonga/Fangaloto. Tallenne `handicrafts.html`.
- **L5** Tonga Tourism, [Food and Feasting](https://www.tongatourism.travel/discover/people-and-culture/food-and-feasting), johdanto, Specialties, Feasts. Tallenne `food.html`.
- **L6** en-Wikipedia, [Tapa cloth](https://en.wikipedia.org/wiki/Tapa_cloth), General, Fabrication/Tonga. Tallenne `tapa.html`.
- **L7** en-Wikipedia, [Taʻovala](https://en.wikipedia.org/wiki/Ta%CA%BBovala), johdanto, Usage, Materials. Tallenne `taovala.html`. Alkuperätarina sekä yleistävät väitteet kaikkien naisten taidoista jätetty pois.
- **L8** Museum of New Zealand Te Papa Tongarewa, [Ngatu, tapa](https://collections.tepapa.govt.nz/topic/1098), materiaalin valmistus, kupesi, lahjakierto. Tallenne `tepapa-ngatu.html`. Kulttuuriteksti ilmoittaa alkuperäiseksi julkaisuajakseen 2007; käytetään vain tekniikan ja lahjakäytön tietoja, ei tuolloin esitettyjä nykytilasuperlatiiveja.

Tonga Airports -etusivu antoi HTTP 500: ei käytetty todisteena. Tourism-etusivu tallennettu, mutta varsinaiset väitteet L3–L5:stä. Pangaimotu-sivu osoittautui täsmennyssivuksi: ei käytetty saaren omana koordinaattilähteenä.

## 1. Perustiedot ja laajuus

Nukuʻalofa on Tongan pääkaupunki Tongatapun pohjoisrannikolla (L1 johdanto, L3). Kaupunkipiste ja artikkeliavain otettu oman `konteksti.json`:n tiedoista: lat −21.1343, lon −175.2018, wiki Nukuʻalofa. Kaupunkipistettä ei lainata nähtävyydelle.

Väkiluku ja pinta-ala jätetty pois. Kontekstin 21 185 / 2021 tarkoittaa Kolofoʻoun, Maʻufangan ja Kolomotuʻan muodostamaa Tongatapun kaupunkiväestöä; lähdemerkintä sanoo luvun tulleen hakutuloskatkelmasta. L1:n infolaatikon eri luvuille ei ole tässä riippumatonta laajuusvarmennusta. Ero ei ratkea valitsemalla suurempaa lukua.

## 2. Historia ja vuoden 1873 kehys

L1 kuvaa 1700-luvun lahden kartoitusta sekä 1800-luvulla kasvavaa asutusta, kirkollista keskusta ja kuninkaan hallintoa. C kertoo vain näistä vuosisatatasolla. 1873 on Matkakirjan kaanonin matkavuosi, ei tässä uutena lähdefaktana esitetty tapahtumavuosi. Vuoden yksittäistä palatsin ulkoasua tai isoisän oleskelua, reittiä tai puhetta ei kuvata.

L1:n tarkat Cookin käynnin, perustuslain ja kaupungin uudelleenjärjestelyn vuodet eivät siirtyneet C:hen ilman kahta riippumatonta ajankohtalähdettä. Kaikkien mahdollisten karttakohteiden 1873-kuvaus on avoin.

## 3. Kansisivun ja artikkelin väitteet

- **Vanha ja uusi samassa kaupungissa:** Kolomotuʻa = vanha asutus; alkuperäinen linnoitusalue. Kolofoʻou = uusi asutus; palatsi ja hallinto. Maʻufanga aikaisempi kylä. L1 Expansion and reorganisation, kaikki kolme alaosiota. Ei keksittyjä syntyvuosia tai väestömääriä.
- **Satamaa vaihdetaan, meri pysyy:** Vuna Wharf entinen kansainvälinen laituri; suurempi laituri Maʻufangan suunnalla nimetty kuningatar Sāloten mukaan; kalastajien ja saartenvälisen liikenteen laituri. L1 Transport, L3 laivojen yhteys saariryhmiin. Laiturien historialliset vaihtuvuodet ja nykyvuorot pois.
- **Katu muistaa kadonneet kiskot:** kapearaiteinen rata laguunista laiturille antoi Railway Roadin nimen; ei nykyistä toimivaa rautatietä/raitiovaunuja; bussien lähtöpaikka Vuna Roadilla. L1 Transport. Ei radan pituutta, vuosia tai rakentajaa.
- **Lahti ennen yhtenäistä kirjoitusasua:** Cookin kartta esittää lahden, kertomus mainitsee Pangaimotun; eri kirjoittajien Noogollefa/Noukou-Alofa; tongan oikeinkirjoituksen myöhempi vakiintuminen. L1 History/18th century. Tarkat kirjoitusasuja koskevat vuodet pois; ei eurooppalaisen saapumista asutuksen alkuna.
- Artikkelin johdanto ja lisäteksti yhdistävät näitä faktoja sekä L3–L8:n markkina- ja käsityöfaktoja. Sunnuntain lepopäivä L2 Respect, kirkkojen laulaminen L3. Ei nykyistä katastrofi-/mellakkakertomusta eikä politiikkaa.

## 4. Teemasivu — Kuituja kaupungin arjessa

- **Puun kuoresta lahjaksi:** ngatu = koristeltu kuorikangas; paperimulperin sisäkuori, pehmennys/hakkaaminen/yhdistäminen; lahja häissä ja elämäntapahtumissa. L6 Fabrication/Tonga, L8. Kaupungin myyntipaikat L4.
- **Kaupungin katu kuorikankaassa:** palatsilta kuninkaalliselle hautausmaalle kulkevan tien aihe; kupesin kohomuodot, värin hankaaminen, käsin viimeistely. Tieaihe L6 Fabrication/Tonga; tekniikka L6 ja L8. Ei yksittäisen suojatun teoksen kuvaa tai jäljennöstä.
- **Matto kuuluu juhlapukuun:** vyötärömatto taʻovala, kafa-nauha, hää-/hautajaisversioiden ero, perintömatot, Sāloten määräys virkamiesten vaatetuksesta. L7 Usage. Ei määräyksen vuotta, materiaalimääriä tai kaikkia ihmisiä koskevaa vaatetusväitettä.
- **Jauhosäkille uusi tehtävä:** pandanus, hibiskuksen kuorikuitu ja vanhojen jauhosäkkien muovi; käsin kudotun hienon maton työmäärä. L7 Materials. Talamahu/Langafonua L4. Kysymys tekijälle on käytännön ehdotus, ei väite hänen työmenetelmästään.

Minitehtävä kysyy kupesi-työvälinettä ja vastaus löytyy teeman toisesta nostosta. Kaupunkivisa ei kysy kupesia.

## 5. Matkailuopas

1. Fuaʻamotu (TBU), Tongatapu, lentokenttäkuljetus; bussit/taksit ja reittien paikallinen selvittäminen. L1 Transport ja L2 By plane/Get around. Etäisyydet, vuorot, hinnat, lentoyhtiöt ja ajokorttilainsäädäntö pois.
2. Rantatie, palatsi, kaupunginosien nimet; Haʻamonga ʻa Maui ja Muʻa ovat saaren muita kohteita. L1, L3. Ei pääsylupa- tai aukiololupausta palatsiin.
3. Talamahu, Langafonua ja Ancient Tonga Fangalotossa, käsityötekniikoihin liittyvä toiminta. L4. Ei hintaa, kestoa tai avointa ajanvarauslupausta. Valokuvausluvan pyytäminen kirjoittajan käytännön ohje.
4. ʻOta ʻika = sitruunalla ja kookoskermalla marinoitu raaka kala; lu pulu = säilykelihaa/kookosmaitoa taronlehdissä; umu = maauuni; aterioihin liittyvä musiikki/tanssi. L5 ja L2 Eat, L3 Dining.
5. Sunnuntain palvelurajoitukset ja kirkollinen kulttuuri. L2 Respect ja L3. Ei säälukuja tai väitettyä parasta sääkuukautta; ennusteen ja veneen paluun tarkistaminen käytännön ohje.

## 6. Kartta ja kohdejutut — partial, avoin

C: `kohdekartta.kohteet:[]`, `rajat:{}`, `nahtavyydet:{}`. Tyhjä raja ei ole maantieteellinen arvaus. Mahdolliset myöhemmät selvitykset: Talamahu, Vuna Road/ranta, Pangaimotu (Tongatapu), vanha palatsi. Pangaimotu on myös Vavaʻun saaren nimi; täsmennyssivulta ei oteta koordinaatteja. Rakennusten tekijä-/70 vuotta -porttia ei kuitata nimen tai iän perusteella. 6–8 kohteen, omien WP/WD-pisteiden, 1873-taustan ja kohdejuttujen portti ei täyty.

## 7. Kysymykset ja tiedot

Viisi kysymystä: Tongatapu (L1), Kolomotuʻan merkitys (L1), ngatun materiaali (L6/L8), Queen Sālote Wharf (L1), Railway Road (L1). Tasot 1, 2, 1, 2, 3. Kolme tietoa: kaupunginosien nimet, Railway Road, ngatun tiekuvio. Kaikki edellä avatuissa lähdekohdissa. Ei isoisän ääntä.

## 8. Kuvat ja sää

B-valintaa ei ole. Kaikkien 18 kuvaroolin neljä kenttää `tiedosto`, `lyhyt`, `selite`, `lahde` ovat tyhjiä. Roolit: valokuva 1, kansi 3, nostot 8, oppaan etusivu 1, oppaan jaksot 5. Ei kuvahakuja, generointia, keksittyjä nimiä tai näkemättömän kuvan kuvatekstiä.

`saatiedot:null`. Paikallisen säärivin 48/48 primääriauditointi avoin. `saa.json`:ia ei muutettu, sen lukuja ei lainattu teksteihin. Oppaan viimeinen jakso kertoo viikon rytmistä ja tarkistettavista meriretkistä, ei varmennetuista sääkausista.

## 9. Avoimet asiat ja poisjätöt

Riippumaton D, korjaus E ja lopullinen F, täydellinen A, B-kuvat, kartta/kohdejutut, sääauditointi ja väestölukujen laajuus ovat avoinna. Teksti ei ole hyväksytty, integroitu eikä julkaistu. Ei Git-operaatioita tai pelitiedostomuutoksia. Tarkistus- ja SHA-todisteet omassa väliaineistossa ja C-muistiossa.
