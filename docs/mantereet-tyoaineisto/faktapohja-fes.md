# Fès — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `fes`, maa MAR, en-Wikipedia "Fez,
Morocco". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`, `docs/tyolista-opukselle.md`
(paketti O9, ETUSIVUKUVAN KAAVA) ja `tools/parvi/kaupunkilehti-ohje.md`.

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Fez, Morocco"**,
**"Fes el Bali"**, **"Fes Jdid"**, **"Bou Inania Madrasa"**,
**"Al-Attarine Madrasa"**, **"Saffarin Madrasa"**,
**"Funduq al-Najjarin"**, **"Zawiya of Moulay Idris II"**,
**"Marinid Tombs"**, **"Bab Bou Jeloud"**, **"Dar Batha"**,
**"Mellah of Fez"**, **"Fez (hat)"**, **"Royal Palace of Fez"**,
**"Hassan I of Morocco"**, **"Idris II of Morocco"**,
**"Fez Festival of World Sacred Music"**,
**"Mosque of the Andalusians"**.

## 0. Rajaus: mitä TÄHÄN lehteen EI kirjoiteta

Marokon maalehti (`js/packs/maa-kategoriat.js`, avain `MAR`) on jo
tehty, ja se on luettu kokonaan. Maalehti on ottanut neljä Fèsin
parasta aihetta, eikä yhtäkään niistä saa toistaa:

| Maalehden nosto | Aihe, joka on siis varattu |
| --- | --- |
| "Yliopisto, jonka perusti kauppiaan tytär" | al-Qarawiyyin ja Fatima al-Fihri, 857–859 |
| "Altaat, joissa väri on kasvia" | Chouaran nahkurialtaat, liotus ja värjäys |
| "Kello, jota kukaan ei enää osaa korjata" | Dar al-Maganan vesikello 1357 |
| "Palapeli, joka ladotaan nurin päin" | zellij-mosaiikin teko |
| "Prinssi, joka pakeni ja perusti valtion" | Idris I:n pako ja idrisidien synty |
| "Sarja jokaiselle vuorokauden tunnille" | al-Ala / nuba |
| "Runoutta, jota lauloivat käsityöläiset" | malhun |
| "Piiras, joka on sekä suolainen että makea" | pastilla |
| "Mauste, jossa on kaksikymmentäseitsemän ainesta" | ras el hanout |
| "Keitto, joka katkaisee paaston" | harira |

Karttanostot (`js/packs/maastokohteet-mar.js`) on luettu: Toubkal,
Atlantti, Drâa, Volubilis, Aït Benhaddou, Essaouira, Chefchaouen,
Hassan-torni, Erg Chebbi, El Jadida, Lixus. Yksikään ei ole Fèsissä,
joten ne eivät rajoita. `js/packs/skandaalit.js` `MAR`: Agadirin
tykkivene 1911 ja "Sata kolmekymmentä kilometriä ilman vesipistettä"
— kumpikaan ei ole tämän kaupungin aihe.

Toinen agentti tekee samaan aikaan Tangerin ja Marrakechin lehdet.
Niihin ei kosketa, eikä niiden aiheita (Tangerin kansainvälinen
vyöhyke, Marrakechin El Badi, Jemaa el-Fnaa, Koutoubia) käsitellä.

**Tälle lehdelle jää siis:** kahden kaupungin synty ja yhdistäminen,
Hassan I:n käytävä 1873, autoton medina ja vesijärjestelmä, fetsihattu,
kirjapaino ja kirjallinen kaupunki, sekä kohdekartan kahdeksan
rakennusta.

## 1. Perusluvut ja sijainti

Lähde: **"Fez, Morocco"**, johdanto, Geography › Location, Demographics.

- Fès on kaupunki Pohjois-Marokon sisämaassa ja **Fès-Meknèsin
  hallintoalueen pääkaupunki**.
- Väkiluku **1 256 172** vuoden 2024 väestönlaskennassa (luku
  sisältää sekä Fèsin kunnan että Méchouar Fès Jdidin kunnan).
  Ulkomaalaisia asukkaita 3 832.
- Sijaitsee **Atlasvuorten luoteispuolella**, kukkuloiden ympäröimänä.
  Vanhakaupunki on **Fèsjoen (Oued Fes)** varrella; joki virtaa
  lännestä itään ja laskee koilliseen suurempaan **Sebou-jokeen**.
- Uusi kaupunki on tasangolla **Saïsin lakeuden** reunalla. Lentoasema
  **Fès-Saïs** on noin 15 km Fes el-Balista etelään.
- Kolme osaa: **Fes el-Bali** (vanhin), **Fes Jdid** (1276) ja
  ranskalaisajan **Ville Nouvelle**.
- Ranskalaisajan jälkeen: 1971–2000 väkiluku noin kolminkertaistui
  325 000 → 940 000, jolloin kaupungista tuli Marokon toiseksi suurin.

### Ilmasto (rivin omat luvut, "Fez, Morocco" › Climate)

Sääriviä (`js/packs/saatiedot.js`) EI tehdä tässä erässä — sen tekee
erillinen agentti. Oppaan sääjakso kirjoitetaan siis en-Wikipedian
Climate-osion varaan ja se **sanotaan tekstissä ääneen**
(Samarkand-malli v965).

- Kuumakesäinen välimerenilmasto (Köppen **Csa**) vahvalla
  mannerilmaston vaikutuksella.
- Talven ylin tyypillisesti noin **15 °C**, alin noin **4,5 °C**
  joulu–tammikuussa. **Halla ei ole harvinaista.**
- Kesän ylin heinä–elokuussa noin **34,5 °C**, alin noin **18 °C**.
- Sadetta hyvinä vuosina jopa **800 mm**.
- Mitatut ääriarvot **46,7 °C** ja **−8,2 °C**.
- Lunta keskimäärin kerran 3–5 vuodessa; lumi satoi kolmena vuonna
  peräkkäin 2005, 2006 ja 2007.
- Sääasema on Fès–Saïsin lentoasemalla, korkeus **579 m**, jakso
  1991–2020 (sääruudun otsikko).

## 2. Nimi ja kaksi kaupunkia (lehden nosto K1)

Lähde: **"Fez, Morocco"** › Etymology, History › Foundation and the
Idrisids; **"Fes el Bali"** › History; **"Zawiya of Moulay Idris II"**
› Background.

- Arabiaksi **Fās**. Erään perimätiedon mukaan nimi tulee sanasta
  *faʾs*, **kuokka**: yhden tarinan mukaan rakennuspaikalta löytyi
  kultainen kuokka, toisen mukaan Idris I kaivoi työmiestensä rinnalla
  hopeisella ja kultaisella kuokalla. Ibn Abi Zar kertoo kolmannen
  selityksen: paikalla oli ollut kaupunki nimeltä **"Sef"**, ja Idris I
  käänsi kirjaimet toisin päin. Neljäs ehdotus: zenata-muoto *afas*,
  "rauniot".
- **789**: Idris I perustaa Madinat Fasin Jawhar-joen (nyk. Fèsjoki)
  rannalle.
- **809**: hänen poikansa Idris II perustaa vastarannalle asutuksen
  **al-ʿĀliyá** ja siirtää pääkaupunkinsa sinne Walīlīstä
  (Volubiliksesta).
- Ensimmäinen väestö oli pääosin berberejä ja **satoja arabisotilaita
  Kairouanista**, jotka kuuluivat Idris II:n saattueeseen.
- **817–818**: Córdobasta al-Hakam I:tä vastaan nousseen kapinan
  jälkeen karkotetut andalusialaisperheet muuttavat kaupunkiin ja
  asettuvat pääosin **Madinat Fasiin**.
- Kairouanilaiset ja andalusialaiset antoivat nimensä kaupunginosille:
  **ʿAdwat al-Qarawiyyin** ja **ʿAdwat al-Andalusiyyin**.
- Idrisidien aikana (788–974) rahoissa esiintyy vain nimi *al-ʿĀliyá*
  ja *al-ʿĀliyá Madinat Idris* — nimeä *Fās* ei niissä ole.
- **1059–1061**: kaupunkeja hallitsivat kaksi riitelevää
  zenata-emiiriveljestä, **Al-Gisa** (al-ʿĀliyá) ja **Al-Fetouh**
  (Madinat Fas). Kumpikin linnoitti oman rantansa, ja **heidän
  nimensä elävät yhä kahdessa kaupunginportissa: Bab Guissa
  pohjoisessa ja Bab Ftouh etelässä.**
- Sitä ennen **Dunas ibn Hamama** (hallitsi 1037–1049) rakensi suuren
  osan kaupungin **vesijärjestelmästä, joka on pääosin säilynyt
  nykypäivään**, sekä hammameja, moskeijoita ja ensimmäiset sillat
  Oued Bou Khrarebin yli.
- **1069–1070**: almoravidien Yusuf ibn Tashfin valloittaa kaupungin
  ja **yhdistää Madinat Fasin ja al-ʿĀliyán yhdeksi kaupungiksi**:
  välimuurit puretaan, sillat rakennetaan tai kunnostetaan ja
  molempien ympärille tehdään uusi muurikehä. Yusuf ibn Tashfinia
  pidetään siksi joskus **Fèsin toisena perustajana**.
- Kaupunkien väli täyttyi taloilla ja **jopa kuusi siltaa** yhdisti
  rannat.

**RISTIRIITA (kirjattava auki tai kierrettävä).** Lähteet nimeävät
rannat eri tavoin: "Fez, Morocco" sanoo Idris I:n kaupungin olleen
**kaakkoisrannalla**, "Fes el Bali" sanoo **oikealla rannalla** ja
"Zawiya of Moulay Idris II" sanoo, että Idris II perusti omansa
**länsirannalle** isänsä **itärannan** kaupunkia vastapäätä.
**Ratkaisu:** lehti ei nimeä ilmansuuntia lainkaan, vaan puhuu
"toisesta rannasta". Sama artikkeli mainitsee myös, että keskiaikaiset
arabilähteet pitävät **Idris II:ta molempien perustajana** vuoden
välein — sekin jätetään pois, koska se ei mahdu nostoon.

**RISTIRIITA 2.** "Fes el Bali" sanoo, että monet Idris I:n vuoden
**789** kaupungin ensimmäisistä asukkaista olivat Córdoban kapinaa
paenneita, kun taas "Fez, Morocco" ajoittaa Córdoban karkotuksen
vuosiin **817–818**, eli 28 vuotta myöhemmäksi. **Ratkaisu:** käytetään
päälähteen päivättyä versiota (817–818) ja jätetään "ensimmäiset
asukkaat" -väite pois.

## 3. Marinidit, Fes Jdid ja Mellah

Lähde: **"Fez, Morocco"** › History; **"Fes Jdid"**; **"Mellah of
Fez"**; **"Marinid Tombs"**.

- **1145**: almohadit valloittavat kaupungin ja purkavat linnoitukset
  ankaran vastarinnan takia; myöhemmin ne rakennetaan uudestaan, ja
  muurit valmistuvat **1204** Muhammad al-Nasirin aikana antaen Fes
  el-Balille sen nykyisen kehän.
- 1100-luvulla kaupunki oli maailman suurimpia, arviolta **200 000
  asukasta**; vuoteen 1200 mennessä Fès ja Kairo olivat luultavasti
  suurimmat muslimikaupungit.
- **1250**: marinidit tekevät Fèsistä jälleen pääkaupungin. Kaupungin
  kulta-aika. **1271–1357 rakennettiin seitsemän medresaa.**
- **1276**: sulttaani Abu Yusuf Yaqub perustaa **Fes Jdidin** uudeksi
  hallinto- ja sotilaskeskukseksi. Ensin sen nimi oli *Madinat
  al-Bayda*, "valkoinen kaupunki".
- **Mellah** eli juutalaiskortteli syntyi Fes Jdidiin marinidien
  aikana; useimmat tutkijat ajoittavat väestönsiirron **1400-luvulle**.
  Juutalaisten lähteiden mukaan syy oli **Idris II:n ruumiin
  löytyminen 1437** kaupungin sydämestä, mikä teki alueesta pyhän
  (*haram*) ja edellytti ei-muslimien siirtämistä pois.
- Yhteisö koostui ensin paikallisista juutalaisista (**Toshavim**), ja
  myöhemmin siihen liittyi Iberian niemimaalta paenneita
  (**Megorashim**), erityisesti Espanjan 1492 ja Portugalin 1496
  karkotusten jälkeen.
- Ennen Mellahia juutalaisten kortteli oli Fes el-Balissa
  **Funduq el-Yihoudi** Bab Guissan lähellä; sinne oli keskittynyt
  yhteisö jo Idris II:n ajoista.
- Mellahissa on **Ibn Danan -synagoga** (arvioitu 1600-luvun lopulta)
  ja **Slat al-Fassiyin**, jota pidetään Mellahin vanhimpana ja
  mahdollisesti marinidiajalta (1200–1400-luvut). Kumpikaan ei ole
  nykyään käytössä.
- **Sana *mellah*** liitetään suolavarastoon (lähdeteksti:
  "salt warehouse").
- Nykyään Fèsissä on **alle 200 juutalaista** (2001) — Maailman
  juutalaiskongressin mukaan **150**. (Kaksi lukua samassa
  artikkelissa, ks. tarkistus.)

## 4. 1873 — isoisän matkavuosi (lehden nosto K2)

Lähde: **"Fez, Morocco"** › Saadis and 'Alawis (viimeinen kappale);
**"Fes el Bali"** › History; **"Dar Batha"**; **"Royal Palace of
Fez"**; **"Hassan I of Morocco"**.

Tämä on lehden 1873-kehys, ja se on poikkeuksellisen tarkka:

- **Moulay Hassan I hallitsi 1873–1894.** Hän teki **viimeisen suuren
  muutoksen Fèsin kaupunkikuvaan ennen 1900-lukua**: hän vihdoin
  yhdisti Fes Jdidin ja Fes el-Balin rakentamalla **muurikäytävän**
  niiden väliin.
- Käytävän sisään rakennettiin **uusia puutarhoja ja kesäpalatseja**
  kuninkaallisten ja pääkaupungin seurapiirien käyttöön, muun muassa
  **Jnan Sbilin puutarha** ja **Dar Bathan palatsi**.
- Hassan I laajensi myös **kuninkaanpalatsia** itseään: sisäänkäynti
  ulotettiin nykyisen **Vanhan Mechouarin** kohdalle, ja pohjoiseen
  lisättiin **Uusi Mechouar** ja **Dar al-Makina**. Laajennus erotti
  **Moulay Abdallahin kaupunginosan** muusta Fes Jdidista.
- Ennen Hassan I:n hallituskautta Dar Bathan tontilla oli vain pieniä
  yksittäisiä rakennuksia Fes el-Balin ja Fes Jdidin välissä; maa
  ostettiin Fèsin varakkaalta **Ben Jelloun -suvulta**.
- Samalla vuosisadalla kaupungissa oli jo **arabialainen kirjapaino**
  (ks. osio 6) — se toimi Fèsissä vuodesta **1865**.
- Fès oli **'alawi-kauden pääkaupunki vuoteen 1912**; asema oli
  osittain jaettu Marrakechin kanssa.
- **Tijani-sufilaisveljeskunnalla** on ollut hengellinen keskuksensa
  Fèsissä siitä asti, kun **Ahmad al-Tijani** (k. 1815) muutti tänne
  Algeriasta **1789**. Veljeskunta levisi Luoteis-Afrikan sivistyneistön
  keskuudessa, ja sen zawiya vetää yhä pyhiinvaeltajia erityisesti
  **Länsi-Afrikasta**.

## 5. Autoton medina ja Unesco (lehden nosto K3)

Lähde: **"Fez, Morocco"** › johdanto, Landmarks › Medina of Fez;
**"Fes el Bali"** › johdanto; **"Bab Bou Jeloud"** › Description.

- Fèsin medina on Unescon maailmanperintökohde ja **yksi maailman
  suurimmista ja vanhimmista kaupunkien kävelyalueista (autottomista
  alueista)**.
- **Fes el-Bali on arabimaailman vanhin yhtäjaksoisesti asuttu
  muurikaupunki.**
- **1981**: vanhakaupunki (Fes el-Bali ja Fes Jdid) merkittiin
  maailmanperintöluetteloon nimellä **Medina of Fez**. Se oli
  **Marokon ensimmäinen** kohde luettelossa. Unesco kuvaa sitä
  "yhdeksi arabimuslimimaailman laajimmista ja parhaiten
  säilyneistä historiallisista kaupungeista".
- Maailmanperintöalueeseen kuuluu myös **muurien ulkopuolinen
  suojavyöhyke**, jonka tarkoitus on säilyttää paikan visuaalinen
  eheys.
- **Bab Bou Jeloud** on yhä medinan pääportti lännessä ja **raja,
  jonka yli autoliikenne ei yleensä pääse** vanhaankaupunkiin.
- Vesi: **Fèsjoki saa alkunsa etelästä ja lännestä ja jakautuu
  useisiin pieniin kanaviin, jotka tuovat veden vanhaankaupunkiin.**
  Kanavat laskevat **Oued Bou Khrarebiin**, siihen joen osaan, joka
  kulkee Fes el-Balin keskeltä ja erottaa Qarawiyyin-korttelin
  Andalusian-korttelista.
- Joen kunnostus on nykyään yksi medinan elvytyshankkeista.
- Rakennuskanta: **yli sata funduqia** (osio 7), lukuisia hammameja,
  medresoja, moskeijoita ja *dar*- ja *riad*-taloja.
- Muurit: vanhimmat osat Fes el-Balin pohjoissivulla ovat
  **almohadikaudelta**. Portteja vartioivat sotilasosastot ja ne
  **suljettiin yöksi**. Vanhimmat ja historiallisesti tärkeimmät ovat
  **Bab Mahrouk** (länsi), **Bab Guissa** (koillinen) ja **Bab Ftouh**
  (kaakko). Kaupungin historian aikana rakennettiin **13 kasbahia**.
- Vihreää kaupungissa on vähän: **2 m² asukasta kohti** (2022), kun
  kansainvälinen suositus on vähintään 10 m².

## 6. Kirjapaino ja kirjallinen kaupunki (teemasivun nostot)

Lähde: **"Fez, Morocco"** › Culture › Literature, Arts, Education,
Economy.

### 6.1 Afrikan ensimmäinen painettu kirja (T1)

- **Ensimmäinen Afrikan mantereella painettu kirja painettiin
  Fèsissä.** Kappale teoksesta **Sefer Abudarham** painettiin hepreaksi
  **1516**; painajat olivat **Samuel ben Isaac Nedivot ja hänen
  poikansa**, Lissabonista paenneita juutalaisia.
- **Paino oli lyhytikäinen ja painoi 15 kappaletta**, joista yksi on
  nykyään **Library of Congressin** kokoelmassa.
- Fès oli Córdoban ohella yksi **900- ja 1000-luvun juutalaisen
  sivistyksen keskuksista** Marokossa ja al-Andalusissa.

### 6.2 Arabialainen kirjapaino 1865 (T2)

- Arabiankielinen kirjapaino tuli Marokkoon **1864–65** miehen
  nimeltä **ar-Rudani** aloitteesta; hän oli Sousin alueelta kotoisin
  ollut oppinut ja tuomari.
- **1864**: ar-Rudani osti pyhiinvaellusmatkaltaan palatessaan
  **Kairosta arabialaisen kirjapainon** ja palkkasi egyptiläisen
  koneenkäyttäjän, ja toi molemmat mukanaan Marokkoon.
- Viranomaiset **takavarikoivat painon satamassa** ja lähettivät sen
  **Meknèsiin**, jossa sulttaani **Muhammad IV** tuolloin oleskeli.
  **Ensimmäinen arabiankielinen kirja painettiin siis Meknèsissä
  kesäkuussa 1865** — ja paino siirrettiin **samana vuonna Fèsiin**,
  jossa se toimi **1940-luvulle asti**.
- Paino sijoitettiin Fes el-Balin keskeiseen kortteliin, ja sitä
  hoiti hallitus, joka painoi perinteisiä oppikirjoja ja antoi osan
  tuotannosta **ilmaiseksi Qarawiyyinin yliopistolle**.
- **1871** jälkeen hallinto siirtyi yksityisille ja painamisen
  käyttöalue laajeni; **1897** jälkeen siitä tuli säännelty
  elinkeino, jota Fèsin virkamiehet valvoivat. **Vuoteen 1908
  mennessä Fèsissä oli vähintään neljä kirjapainoa**, ja kaksi muuta
  marokkolaista painajaa oli Tangerissa.
- Heprealaiset painot palasivat Marokkoon **1890-luvulla** Tangerissa
  ja vakiintuivat maahan **1920-luvulla**.

**Tämä on lehden 1873-kytkös teemasivulla:** isoisän matkavuonna
kirjapaino oli ollut Fèsissä kahdeksan vuotta ja se oli yhä
hallituksen hallussa (yksityistäminen alkoi 1871).

### 6.3 Juutalainen oppineisuus ja Maimonides (T3)

- Fèsiin liittyviä juutalaisia oppineita: runoilija **Dunash Ben
  Labrat**, kielioppineen **Judah ben David Hayyuj**, talmudisti
  **Isaac al-Fasi** (k. 1103) ja oppinut **Joseph ben Judah ibn
  Aknin** — kaikki syntyivät Fèsissä tai viettivät siellä aikaa.
- **Maimonides** (k. 1204) asui Fèsissä **1159–1165** paettuaan
  al-Andalusista.
- "Mellah of Fez" lisää: Maimonideksen asuinpaikaksi on väitetty
  taloa, josta myöhemmin tuli **Dar al-Magana** (kaupungin
  länsiosassa).

### 6.4 Kalligrafia ja Fèsin oma käsiala (T4)

- **Maghrebilainen arabialainen kirjoitus** on olennainen osa Fèsin
  kuvataiteen historiaa. Osa säännöistä on kodifioitu, mutta uudistuksia
  on tehty — kuten **1800-luvun kalligrafi Muhammad al-Qandusin**
  (kuoli 1861) tekemät.
- Al-Qandusi oli sufimestari, joka **kehitti Fèsissä oman ainutlaatuisen
  käsialansa**; hän jäljensi sillä muun muassa **Dala'il al-Khayrat**
  -rukouskirjaa.
- **Dala'il al-Khayrat** on al-Jazulin sufilainen rukouskirja, joka
  **kirjoitettiin ensimmäisen kerran Fèsissä 1400-luvulla**.
- Fès on yhä **Marokon tärkein zellij-mosaiikkityön tuotantokeskus**,
  ja muiden kaupunkien (Meknès, Salé, Marrakech) verstaat yleensä
  seuraavat tai jäljittelevät Fèsin käsityötapaa. *(Zellijin TEKEMINEN
  on maalehden aihe — tähän lehteen otetaan vain lause siitä, että
  Fès on tyylin lähtöpiste, ja sekin vain kohdekartan jutussa.)*
- 1800-luvulle asti **al-Qarawiyyin hallitsi kaupungin ja koko maan
  henkistä elämää**; kirjallisuus keskittyi uskonnolliseen
  oppineisuuteen, filosofiaan ja runouteen. Kaupungin suurin
  kirjasto oli Qarawiyyinin moskeijassa. Sulttaani Abd al-Rahmanin
  aikana kuninkaanpalatsiin perustettiin uusi kirjasto, ja
  **1800-luvun loppupuolella kaupungin varakkaat alkoivat perustaa
  omia yksityiskirjastojaan**.
- Fèsiä kutsutaan **"lännen Mekaksi"** ja **"Afrikan Ateenaksi"**; se
  on Marokon henkinen ja kulttuurinen sydän.

## 7. Fetsihattu (lehden nosto K4)

Lähde: **"Fez, Morocco"** › History (Saadis and 'Alawis, viimeinen
kappale) ja Economy; **"Fez (hat)"** › johdanto, Etymology, History.

- **"Fez, Morocco"** sanoo kaksi kertaa, että kaupunki oli **ainoa
  fetsien lähde**:
  - History: *"Until the 19th century the city was the only source of
    fezzes (also known as the tarboosh)."*
  - Economy: *"Up until the late 19th century, the city was the only
    place in the world which fabricated the fez hat."*
- **"Fez (hat)"** kertoo toisin: *"The original centre of production
  appears to have been in Tunis."* Kysynnän kasvaessa taitavia
  fetsintekijöitä houkuteltiin **Tunisiasta Konstantinopoliin**, jossa
  tehtaita perustettiin **Eyüpin** kaupunginosaan.
- Sama artikkeli sanoo hatun **alkuperän olevan kiistanalainen** ja
  että nimi *saattaa* viitata Fèsin kaupunkiin, **koska väri saatiin
  siellä karmiininpunaisista marjoista**.
- Hattu on huopainen, matala, lieritön ja lieriömäinen, yleensä
  punainen ja yleensä musta tupsu päällä. Toinen nimi on **tarboosh**.
- **1827**: osmanisulttaani **Mahmud II** määräsi fetsin uuden
  armeijansa päähineeksi; **1829** hän ulotti määräyksen kaikkiin
  siviili- ja uskonnollisiin virkamiehiin. Tarkoitus oli korvata
  turbaani, joka toimi identiteetin merkkinä ja siksi **jakoi
  väestöä sen sijaan että olisi yhdistänyt sen**.
- Alkuperäinen tulipunainen väri saatiin **kanukan** (cornel)
  uutteesta; halpojen **synteettisten värien** keksiminen siirsi
  tuotannon pian **Strakonicen tehtaisiin** Böömiin (silloin
  Itävallan keisarikuntaa).
- **1925**: fetsi kiellettiin Turkissa Atatürkin uudistusten
  yhteydessä.
- Fetsiä käytetään yhä osissa Etelä- ja Kaakkois-Aasiaa, Lähi-itää ja
  Pohjois-Afrikkaa sekä **Kapkaupungissa**.

**RATKAISU LEHTEEN:** ristiriita kirjoitetaan auki lukijalle.
Nosto kertoo, että kaupungin oma artikkeli pitää Fèsiä ainoana
valmistuspaikkana 1800-luvun loppuun asti, kun taas hatun oma
artikkeli sanoo alkuperän olevan kiistanalainen ja nimeää Tunisin
alkuperäiseksi tuotantokeskukseksi. Tämä on lehden tyyliin sopiva
ja se on Raamatun linjaus (ristiriita kirjoitetaan auki).

## 8. Kohdekartan kahdeksan kohdetta

Kohteet on valittu niin, **etteivät ne toista lehden juttuja**
(New Yorkin sääntö). Koordinaatit haettu en-Wikipedian
`prop=coordinates`-rajapinnasta 7.9.2026.

| # | Kohde | lat | lon | Lähdeartikkeli |
| --- | --- | --- | --- | --- |
| 1 | Bab Bou Jeloud | 34.06167 | −4.98389 | "Bab Bou Jeloud" |
| 2 | Dar Batha | 34.06050 | −4.98280 | "Dar Batha" |
| 3 | Bou Inanian medresa | 34.06194 | −4.98278 | "Bou Inania Madrasa" |
| 4 | Nejjarinen funduq | 34.06476 | −4.97595 | "Funduq al-Najjarin" |
| 5 | Moulay Idris II:n zawiya | 34.06485 | −4.97472 | "Zawiya of Moulay Idris II" |
| 6 | Al-Attarinen medresa | 34.06508 | −4.97369 | "Al-Attarine Madrasa" |
| 7 | Saffarinin medresa | 34.06415 | −4.97257 | "Saffarin Madrasa" |
| 8 | Marinidien haudat | 34.06977 | −4.97924 | "Marinid Tombs" |

Rajausehdotus (kaikki kahdeksan mahtuvat väljästi):
`{ pohjoinen: 34.0745, etela: 34.0525, lansi: -4.9975, ita: -4.9635 }`
≈ 2,4 km × 3,1 km. Medina on tiheä, joten laajempi rajaus muuttuisi
katupuuroksi.

### 8.1 Bab Bou Jeloud ("Bab Bou Jeloud")

- Nykyinen koristeellinen portti on **ranskalaishallinnon rakentama
  1913**; se tehtiin vanhankaupungin juhlalliseksi pääsisäänkäynniksi.
- Nimi on paljon vanhempi. Erään selityksen mukaan se on kansanomainen
  väännös ilmauksesta **Abu al-Junud, "sotilaiden isä"**, ja viittaa
  portin länsipuoliseen paraatikenttään (Place Bou Jeloud, nykyään myös
  Place el-Baghdadi).
- **Vanha Bab Bou Jeloud** oli vaatimaton portti, joka saattoi olla
  peräisin **1100-luvulta**. Sen käytävä oli **kohtisuorassa Tala'a
  Kebiraan nähden ja muurin suuntainen**, joten kaupunkiin tultiin
  sivuttain — tavallinen ratkaisu vanhoissa marokkolaisissa porteissa,
  koska sitä oli helpompi puolustaa ja valvoa. Vanha portti näkyy yhä
  uuden vasemmalla puolella (ulkoa katsottuna), mutta se on suljettu.
- Ruudin ja raskaan tykistön jälkeen vanhojen kaupunkien muurit eivät
  enää olleet vakavia sotilaallisia esteitä, ja portit muuttuivat
  **pääosin koristeellisiksi**.
- Portin rakentamista varten kaupunki **osti ja purki tallin ja kolme
  puotia**; kauppa vaati huolellisia neuvotteluja, koska puotien tuotot
  oli sidottu hyväntekeväisyysrahastoon (**waqf**). Suunnitelman laati
  kunnallispalvelujen päällikkö **kapteeni Mellier joulukuussa 1912**,
  ja rakentaminen tehtiin **1913**.

### 8.2 Dar Batha ("Dar Batha")

- Entinen kuninkaanpalatsi ja nykyinen museo. **Moulay Hassan I tilasi
  sen 1800-luvun lopulla**, ja sen viimeisteli hänen seuraajansa
  **Abdelaziz**. Erään lähteen mukaan rakentaminen tapahtui
  **1886–1907**.
- Rakennettiin **kesäpalatsiksi ja arvovieraiden asunnoksi**. Viereisen
  **Dar el-Beidan** viimeisteli sulttaani **Abdelhafid**, Marokon
  viimeinen itsenäinen sulttaani.
- **1912**: molemmat palatsit otettiin uuden Ranskan protektoraatin
  kenraaliresidentin palvelujen käyttöön.
- **1915**: Dar Bathasta tehtiin paikallisen taiteen museo (kokoelma
  oli aiemmin Dar Adiyelissa), sitten kansallinen kansatieteellinen
  museo ja kulttuurikeskus. **1924** luokiteltiin kansallismonumentiksi.
- Kokoelmassa on nykyään **yli 6 500 esinettä**. Kunnostustyöt alkoivat
  **huhtikuussa 2019** (arvioitu kustannus 15,6 miljoonaa dirhamia), ja
  museo avattiin uudelleen **26. helmikuuta 2025** nimellä **Al Batha
  Museum of Islamic Arts**.
- Marinidien hautojen luota 1900-luvulla löydetyt **kaksi
  hautakiveä** ovat nykyään Dar Bathan museossa: toinen kuului nuorelle
  prinsessalle **Zinebille**, joka kuoli 1335, toinen korkealle
  virkamiehelle **Abu Ali al-Nasirille**.

**RISTIRIITA.** "Fez, Morocco" sanoo kokoelman kooksi **noin 6 000**
esinettä, "Dar Batha" sanoo **yli 6 500**. **Ratkaisu:** käytetään
kohteen oman artikkelin lukua (6 500), kuten aiemmissa erissä
(v925/v932-ennakkotapaus: tarkempi lähde voittaa).

### 8.3 Bou Inanian medresa ("Bou Inania Madrasa")

- Rakennettu **1350–55**, rakennuttaja marinidisulttaani **Abu Inan
  Faris**.
- **Marokon ainoa medresa, joka toimi myös perjantaimoskeijana** — ja
  siksi yksi harvoista marokkolaisista medresoista, jolla on
  **näkyvä minareetti**.
- Pidetään laajalti marinidiarkkitehtuurin ja koko marokkolaisen
  historiallisen arkkitehtuurin huippuna.
- Päärakennus on **Tala'a Kebira -kadun eteläpuolella**: sisäpiha
  pylväskäytävineen, opiskelijoiden huoneet toisessa kerroksessa,
  kaksi luokkahuonetta pihan laidoilla ja leveä rukoushuone.
  Koristelu on veistettyä stukkoa, zellijiä ja veistettyä puuta.
- Alkuperäinen nimi oli **Madrasa al-Muttawakkiliya**; nimi Bou Inania
  tulee perustajasta.
- Abu Inan **kapinoi isäänsä vastaan ja julistautui sulttaaniksi
  1348**; hänen visiirinsä **murhasi hänet 10. tammikuuta 1358**
  31-vuotiaana. Kuolema aloitti dynastian lopullisen taantuman.
- **HUOM. RAJAUS:** kadun vastapäisellä puolella on **Dar al-Magana**,
  jonka julkisivussa on vesikello. Se on **Marokon maalehden aihe**
  ("Kello, jota kukaan ei enää osaa korjata"), eikä sitä käsitellä
  tässä jutussa lainkaan.

### 8.4 Nejjarinen funduq ("Funduq al-Najjarin")

- Historiallinen **funduq** (karavaaniseraji, matkustajakoti)
  Fes el-Balin sydämessä **al-Najjarinin aukiolla**, jonka laidalla on
  myös **Nejjarinen suihkulähde** (*saqayya*).
- Nimi tarkoittaa **"puusepät"** ja viittaa aukion ympärillä olleeseen
  puuseppien suukiin, jonka uskotaan olleen olemassa **marinidiajalta
  (1244–1465)** asti.
- Rakennuttaja oli **amin (esimies, tuomari) 'Adiyil vuonna 1711**
  sulttaani **Ismail Ibn Sharifin** aikana. Samana vuonna perustettu
  **Funduq Sagha** pohjoisessa Fes el-Balissa on hyvin samanlainen.
- **Suihkulähteen** tilasi 1800-luvulla sulttaani **Abd al-Rahman**
  (hallitsi 1822–1859).
- Rakennus toimi kauppapaikkana, majatalona ja kauppiaiden varastona,
  läheisessä yhteydessä **Makhzeniin** eli hallitusvaltaan,
  todennäköisesti **1900-luvun alkuun asti**. Ennen siirtomaa-aikaa
  osan huoneista omistivat kaupungin **juutalaiset kauppiaat**.
- **1800-luvulla** funduqin ja suihkulähteen välissä toimi pienessä
  puodissa **Fèsin postikonttori**.
- **1916** luokiteltiin kansallismonumentiksi; **1940-luvulla**
  ranskalaishallinto käytti sitä poliisiasemana. Kunnostettu
  **1990–1996** ja avattu **23. toukokuuta 1998** yksityisenä
  **puutaiteen ja -käsityön museona** (Musée Nejjarine des Arts et
  Métiers du Bois).
- Fèsin vanhassakaupungissa on **yli sata funduqia**. Muita tärkeitä
  ovat **Funduq Shamma'in**, **Funduq Staouniyyin** (tetouanilaisten
  funduq) ja **Funduq Sagha**.

### 8.5 Moulay Idris II:n zawiya ("Zawiya of Moulay Idris II")

- **Yksi Marokon pyhimmistä pyhäköistä.** Sisältää **Idris II:n
  haudan**; Idris II hallitsi nykyisen Marokon aluetta **807–828** ja
  häntä pidetään perinteisesti **Fèsin perustajana ja
  suojeluspyhimyksenä**.
- Paikalla oli alun perin **900-luvun Shurafa-moskeija**, joka
  rappeutui myöhempinä vuosisatoina.
- **1300–1400-luvuilla** pyhäkön merkitys elpyi, kun *sharifien*
  uskonnollinen asema kasvoi — ja kun perinteisten kertomusten mukaan
  **Idris II:n ruumis löydettiin 1437**: rakennusta oltiin
  kunnostamassa, kun paikalta löytyi haudattu ruumis, jonka ajan
  lakioppineet tunnistivat Idris II:ksi.
- Suuren jälleenrakennuksen kustansi sulttaani **Moulay Ismail**
  1700-luvun alussa, ja se antoi pyhäkölle nykyisen perusmuotonsa,
  myös **minareetin ja pyramidikattoisen mausoleumisalin**.
- Zawiyaa ympäröi **horm**, suojattu ja pyhitetty alue, johon kuuluu
  useita muitakin rakennuksia; ne kuuluivat yleensä zawiyan
  **habous**-lahjoitukseen.
- Idris II syntyi **791**, otti vallan virallisesti **803** ja kuoli
  **828**. Hänen isänsä Idris I pakeni abbasidien alueelta **Fakhin
  taistelun** jälkeen ja loi liiton paikallisten berberien kanssa
  **789**; hän kuoli **791** juuri ennen poikansa syntymää.
- Kaupungin tärkein **moussem** eli sufilainen juhla on **Moulay
  Idris II:n moussem**, yksi Marokon tärkeimmistä. Sitä on vietetty
  satoja vuosia, ja sen kustantavat **kaupungin kaikki killat**, jotka
  kulkevat yhdessä kulkueessa mausoleumille. Jokainen kilta lahjoittaa
  zawiyalle lahjoja, joista yksi on **keswa**, Koraanin jakeilla
  koristeltu suuri kangas, joka levitetään Idris II:n katafalkin
  päälle. ("Fez, Morocco" › Festivals.)

### 8.6 Al-Attarinen medresa ("Al-Attarine Madrasa")

- Rakennuttaja marinidisulttaani **Uthman II Abu Said**, vuodet
  **1323–1325**.
- Nimi tulee viereisestä **Souk al-Attarinesta**, mauste- ja
  hajuvesitorista.
- Pidetään yhtenä marinidiarkkitehtuurin korkeimmista saavutuksista
  **runsaan ja sopusointuisen koristelunsa** ja **rajallisen tilan
  tehokkaan käytön** takia.
- Koristeellisen sisäpihan ympärillä on pieni rukoushuone,
  peseytymistila ja makuuhuoneet.
- Medresat olivat **Qarawiyyinin tukilaitoksia**: toisin kuin moskeija,
  ne **majoittivat opiskelijoita**, erityisesti Fèsin ulkopuolelta
  tulleita. Moni oli köyhä ja haki koulutusta päästäkseen parempaan
  asemaan kotikaupungissaan; medresa antoi **majoituksen ja leivän**.
  Medresat olivat myös omia opetuslaitoksiaan ja pitivät omia
  kurssejaan.

### 8.7 Saffarinin medresa ("Saffarin Madrasa")

- Rakennettu **1271 (670 AH)**, rakennuttaja marinidisulttaani
  **Abu Ya'qub Yusuf**. **Marinidien ensimmäinen medresa** — ja siis
  ensimmäinen monista.
- Sijaitsee **Qarawiyyinin moskeijasta etelään** Saffarinin aukiolla
  (Place Seffarine), joka on nimetty aukiolla työskentelevien
  **kuparaseppien** (*saffarin*) mukaan.
- Medresa-laitos syntyi **Koillis-Iranissa 1000-luvun alkuun mennessä**
  ja levisi vähitellen länteen. Marokossa se juurtui vasta
  **marinidien** aikana, koska almohadien oppi oli sille vieras.
  Marinideille medresat olivat **poliittisen legitimiteetin väline**:
  niillä ostettiin Fèsin itsepäisen uskonnollisen eliitin uskollisuutta
  ja esitettiin dynastia sunnalaisen oikeaoppisuuden suojelijana.
  Ne myös kouluttivat valtion virkakoneiston.

### 8.8 Marinidien haudat ("Marinid Tombs")

- **Raunioituneet monumentaalihaudat kukkulalla Fes el-Balin
  pohjoispuolella.** Alun perin marinidien **kuninkaallinen
  hautausmaa**; nykyään suosittu **näköalapaikka** vanhankaupungin yli.
- Ajoitetaan **1300-luvulle**. Tiedot paikasta ovat niukat.
- Ennen Fes Jdidin perustamista marinidit rakensivat kukkulalle
  linnoitetun palatsin nimeltä **al-Qula** ("marinidien kukkula"),
  johon kuului myös moskeija ja hammam. Kronikoitsija **Leo Africanus**
  väitti palatsin olleen vaikuttava.
- Marinidit hautasivat hallitsijansa **1300-luvun puoliväliin asti
  Chellahiin** Rabatin laidalle. **Abu Inan** haudattiin kuitenkin
  kuoltuaan **1358** Fes Jdidin suurmoskeijaan, ja siitä eteenpäin
  hänen seuraajansa **Ibrahim ibn Alista** alkaen haudattiin tälle
  kukkulalle. Hautauksia tehtiin **1361–1398** ja vielä dynastian
  lopussa **1465**, kun **Abd al-Haqq II** haudattiin tänne.
- Näkyvissä on nykyään **kaksi korkeaa suorakaidepohjaista
  mausoleumia**, joissa on suuret hevosenkenkäkaariset sisäänkäynnit.
  **1800-luvun valokuvien mukaan** niitä peittivät aikoinaan
  **vihreillä tiilillä katetut puiset pyramidikatot**.
- Seinillä on jäljellä paloja **veistettyä stukkokoristelua ja
  arabiankielinen kirjoitus** — siinä kaikki, mitä aikoinaan
  runsaasta koristelusta on jäljellä. Leo Africanus mainitsi
  hautojen olleen raskaasti koristeltuja ja niissä olleen
  **ylellisiä värillisiä marmorisia hautakirjoituksia**.
- Paikan ympärillä oli luultavasti muuri, jolloin se oli **rawda**,
  aidattu hautapuutarha.
- Takana on pienempi **qubba** (kupolirakennus), jonka neljä seinää
  avautuvat hevosenkenkäkaarina. Sen **12-sivuinen kupoli** on kadonnut,
  mutta se on kuvattu Georges Marçais'n **1954** julkaisemassa
  tutkimuksessa.

## 9. Matkaoppaan aineisto ("Matkailijan Fès")

### Perille ja liikkeelle ("Fez, Morocco" › Transport)

- **Fès–Saïs** on alueen kansainvälinen lentoasema, noin **15 km**
  keskustasta etelään. **Uusi terminaali 2017** nosti kapasiteetin
  **2,5 miljoonaan matkustajaan vuodessa**.
- Rautatieasemaa hoitaa **ONCF**; se on lyhyen matkan päässä Ville
  Nouvellen keskustasta, ja radat vievät **itään Oujdaan** sekä
  **länteen Tangeriin ja Casablancaan**.
- Kaupunkien välinen linja-autoasema on **heti Bab Mahroukista
  pohjoiseen**, vanhan medinan laidalla; **CTM**:llä on oma
  terminaali Ville Nouvellessa Boulevard Mohammed V:n varrella.
- Yhteistaksit lähtevät useasta paikasta: **Bab Mahrouk** (länteen,
  Meknès ja Rabat), **Bab Ftouh** (itään, Sidi Harazem ja Taza) ja
  Ville Nouvelle (etelään, Sefrou).
- Kaupungissa on oma bussiverkko.

### Medinassa liikkuminen

- Bab Bou Jeloud on **raja, jonka yli autot eivät pääse**.
- **Tala'a Kebira** on medinan halki kulkeva pääsuukikatu, joka johtaa
  Qarawiyyinin moskeijalle ja yliopistolle kaupungin sydämeen.
- Kauppa keskittyi historiallisesti pääkatujen varsille ja keskustorin
  **Kissariat al-Kifahin** ympärille, josta muut suukit haarautuivat.
- Käsityöteollisuus jatkuu yhä ja keskittyy vanhaankaupunkiin, joskin
  se nojaa nykyään pitkälti matkailuun.

### Hammamit ("Fez, Morocco" › Hammams)

- Fès on säilyttänyt monta historiallista hammamia, joita paikalliset
  yhä käyttävät. Esimerkkejä **1300-luvulta**: **Hammam as-Saffarin**,
  **Hammam al-Mokhfiya**, **Hammam Ben Abbad**.
- Ne rakennettiin yleensä kaivon tai lähteen viereen, ja kaupungin
  **viettävä maasto** hoiti viemäröinnin.
- Pohjakaava periytyy **roomalaisesta kylpylästä**: pukuhuone,
  kylmä huone, lämmin huone ja kuuma huone.
- Ulkoa hammamin tunnistaa **kupoleista ja holveista** päähuoneiden
  yllä.

### Juhlat ("Fez, Morocco" › Festivals; "Fez Festival of World Sacred Music")

- **Maailman pyhän musiikin festivaali** alkoi **1994** ja esittelee
  uskonnollista musiikkia eri puolilta maailmaa. Se pidetään
  **touko–kesäkuussa**, ja konsertteja on eri puolilla kaupunkia,
  myös historiallisissa paikoissa kuten **Bab Makinassa** (Uusi
  Mechouar) Fes Jdidissa. Kesto on tavallisesti **10 päivää
  kesäkuun alussa**.
- Perustaja on **Faouzi Skali**, Fèsin hengen säätiön puheenjohtaja.
  Ajatus oli, että musiikki on yleiskieli.
- Festivaalilla ovat esiintyneet muun muassa **Patti Smith, Youssou
  N'Dour, Salif Keita, Ravi Shankar, Miriam Makeba, Björk, Joan Baez**
  ja **Masters of Persian Music**.
- Muut vuosittaiset festivaalit: **amazigh-kulttuurin festivaali**
  (alkoi 2005, heinäkuussa), **sufikulttuurin festivaali** ja
  **malhun-taiteen festivaali**.
- **Fez Running Festival** on järjestetty vuosittain **2022** alkaen;
  sen perusti fèsiläinen maratoonari **Abderrahime Bouramdane**.

### Sää matkailijalle

Ks. osio 1. Oppaan sääjaksossa sanotaan suoraan, että luvut ovat
en-Wikipedian **Fez, Morocco** -artikkelin Climate-osiosta ja että
lehdellä ei ole omaa vuosigraafia, koska säärivin tekee erillinen
agentti tässä erässä.

## 10. Kulttuurivisa ja minitehtävä

Kaupungin visa on `js/packs/africa-questions.js`, avain `fes`
(viisi kysymystä):

1. Minkä maan kaupunki Fès on? → Marokko
2. Mikä on Fès al Bali? → muurien ympäröimä vanhakaupunki
3. Millä vuosisadalla Fès perustettiin? → 800-luvulla
4. Minkä dynastian aikana Fès kukoisti maansa pääkaupunkina? → marinidit
5. Minkä päähineen nimi on peräisin Fèsin kaupungista? → fetsi

Kaikkien viiden aihe esiintyy tässä faktapohjassa, joten visan
opettavat nostot ovat lehdessä näkyvillä (osiot 2, 3, 5, 7).

**MINITEHTÄVÄ EI SAA KYSYÄ YHTÄÄN NÄISTÄ VIIDESTÄ.** Ehdotus
(teemasivulle, vastaus samalla sivulla, osio 6.2):

> Mihin kaupunkiin ar-Rudanin Kairosta ostama kirjapaino ensin
> vietiin? → Meknèsiin (viranomaiset takavarikoivat sen satamassa ja
> lähettivät sen sinne, missä sulttaani oleskeli; paino siirrettiin
> Fèsiin vasta samana vuonna 1865).

Vastaus löytyy nostosta T2 sanasta sanaan. Fakta ei ole
lähdevirkkeen sanatarkka kopio eikä siihen ole lisätty
syy-yhteyttä, jota lähde ei sano.

## 11. Mitä repossa on ennestään

- `js/packs/africa-valokuvat.js` (`fes`): **yksi kuva**, Chouaran
  nahkurialtaat (`Tanneries in Fes.jpg`, Tulit, CC BY-SA 4.0, 2017).
  **Ennen–nyt-paria EI ole** — se on haettava Commonsista erikseen.
- `js/packs/africa-kulttuuri.js`: **fes-lohkoa ei ole** eikä siis
  kulttuurivisaa (`kysymys`). Litteitä nostoja ei ole siirrettävänä.
- `js/packs/africa-artikkelit.js`: **Fès-merkintää ei ole.** Sekä
  `intro` (7–10 virkettä, ~700–1100 mrk) että kolmikappaleinen
  `artikkeli` on kirjoitettava.
- `js/packs/africa-saapumiset.js`: **fes-merkintää ei ole, EIKÄ
  SITÄ KIRJOITETA TÄSSÄ ERÄSSÄ.** Erän ohje listaa saapumistekstin
  työn laajuuteen, mutta sama ohje siteeraa omistajan päätöstä
  6.9.2026 sanatarkasti: *"maailman saa tehdä kaikin puolin loppuun
  paitsi matkakirjan tekstejä sekä aarrekaarta"* — ja lisää: "EI
  matkakirjatekstiä, EI kohtaamista, EI kysymyksiä".
  `africa-saapumiset.js`:n oma otsikkorivi on **"Matkakirjan
  saapumistekstit"**, ja merkinnässä on isoisän ääni, eli se on
  juuri sitä tarinakaarta, joka on tauolla. Lisäksi `fes` on
  `tests/vanha-maailma.test.mjs`:n **KAARETTOMAT-listalla**, jonka
  lohkokommentti nojaa samaan omistajan linjaukseen (Raamattu,
  Kaupunkilehdet, 17.8.2026 / v811) ja sanoo, että kaupunki
  poistetaan listalta vasta kun sen **kaari kirjoitetaan**.
  Saapumistekstin kirjoittaminen pakottaisi siis muuttamaan
  testivartijaa, joka on olemassa juuri tämän estämiseksi.
  **Omistajan linjaus voittaa erän ohjeen** (CLAUDE.md), joten
  saapumisteksti jätetään tekemättä ja asia raportoidaan Fablelle
  omistajan päätettäväksi. Dakarilla merkintä on jo olemassa
  entuudestaan eikä siihen kosketa.

  *(Teksti oli kirjoitettuna ja se peruttiin, kun testi paljasti
  KAARETTOMAT-listan ja sen perustelun. Luonnos: nuori Fogg eksyy
  medinassa kolmesti, ja isoisän lainaus kertoo kahdesta riitelevästä
  kaupungista, joiden veljesten nimet ovat yhä kahdessa portissa.
  Fable voi ottaa sen käyttöön, jos omistaja purkaa tauon.)*
- `js/packs/africa-questions.js`: `HUOMIOT.fes` on olemassa (neljä
  huomiota: perustaminen ja autottomuus, marinidit ja malikiittinen
  keskus, fetsin nimi, isoisän huomio aaseista ja kujien leveydestä).
  Näihin **ei kosketa**, mutta lehti ei saa olla ristiriidassa niiden
  kanssa. Ristiriitoja ei löytynyt.
- `js/packs/maakartat.js`: `KAUPUNKIKARTAT.fes` **puuttuu**.
- `js/packs/nahtavyysjutut.js`: `fes` **puuttuu**.
- `js/packs/saatiedot.js`: `fes` **puuttuu** — säärivin tekee eri
  agentti, tässä erässä ei kosketa.
