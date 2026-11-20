# Pariisin nostotekstit, erä 1: 13 jaksollista leipätekstiksi (SK 20.11.2026, P-261120-3, L5-2 ja L5-3)

Haara `sk/l5-nostotekstit-era1`, EI yhdistetä mainiin ennen KK:n sanaa (lukijan muutos L5-1 tulee vasta seuraavassa versiossa; muuten kertoja sanoisi nimen kahdesti). Data: `js/packs/fokuskohteet-fra.js` (10), `js/packs/monumentit-eurooppa.js` (3). Ei uusia kuvia, ei uusia nostoja, ei äänityksiä, ei natiivikoodia.

## 1. M1: kuusi tarkistusta ja lähtöluettelo

- Työkalu `tools/sisalto/noston-tarkistus.mjs` (komento `node tools/sisalto/noston-tarkistus.mjs`), testi `tests/noston-tekstisaannot.test.mjs` (kuusi tarkistusta omina testeinään + lähtöluettelo + erän 1 muoto): nimi ensimmäisessä virkkeessä · ensimmäinen virke ei ala suhteellisella ajalla · tekstin vuodet nousevassa järjestyksessä (vuosikymmenet ja "ei 1789:stä" eivät lasketa) · jokaisella sanotulla vuodella vuosirivi ja jokaisella rivillä vuosi tekstissä · sana "isoisä" ei esiinny · pituus enintään 1 000 merkkiä (kappaleväleittä).
- **Lähtöluettelo** `docs/raportit/pariisin-nostot-rikkeet-lahto-20261120.json` = Pariisin 46 tekstin rikkeet origin/mainissa (1b8babd1d6): **alku 23, isoisä 8, järjestys 10, pituus 9**, vuosirivit (vain 13 jaksollista) 6 nostoa. Odotus oli 18 / 6 / 9 / 13. Ero: kone tarkistaa nimen ja suhteellisen alun mekaanisesti (sama sana nimenä, ei ihmisen "alku ymmärrettävä yksin"), ja pituus lasketaan jaksojen summana (ei vanhan raportin isoisäjaksollista summaa). 46 = A 13 jaksollista + B 4 kadonnutta + C 14 nähtävyysjuttua + D 9 tarinapaikkaa + F 6 historian hetkeä (E 2 valikon nostoa eivät ole erillisiä tekstejä datassa).
- **Nyt:** erän 1 13 nostoa 0 rikettä (nimi sellaisenaan ensimmäisessä virkkeessä); loput 33 tekstiä samat rikkeet kuin ennen (alku 11, isoisä 6, järjestys 10, pituus 9). Luettelo saa vain pienentyä: rike, jota lähtöluettelossa ei ole, kaataa testin; uusi nosto ei pääse läpi rikkeellä. Erät 2 ja 3 poistavat rivejä luettelosta.
- Muut testit: `tests/noston-jaksot.test.mjs` päivitetty (erä 1: ei nimi-, esittely- eikä isoisäjaksoa; jakso 100–320, kokonaisuus ≤ 1 000; muut kaupungit entisellään), `tests/noston-kuvat.test.mjs` (Tuileries'n ensimmäinen kuva).

## 2. Mitä muuttui kaikissa 13:ssa

- Nimi-, esittely- ja isoisäjakso pois datasta. Ensimmäinen jakso on kertojan leipätekstiä ja ensimmäinen virke sanoo paikan nimen.
- `otsikko` = tarinarivi (enintään 40 merkkiä, ei vuotta). Kartan nimi (`nimi`) ennallaan.
- Teksti etenee vanhimmasta uusimpaan; jokainen aikahyppy alkaa vuodella tai vuosikymmenellä; viimeinen jakso kertoo mitä paikalla on nyt.
- Vuosirivit: jokainen sanottu vuosi saa rivin, rivit nousevassa järjestyksessä (selite ≤ 20 merkkiä, `kohta` tekstissä tasan kerran).
- Visa, Pulun kysymykset (3 kpl), korostukset ja hologrammien kohdat ennallaan; visan vastaus kuuluu yhä tekstissä (Kivimuurit, Firenze, valtauspäivän ilta, "Hän häpesi", Jeanne, polonium, "yksi frangi", käänsi ja piirsi, mutka, Chagall, Zola, miekkailu, Nogent-sur-Marne).
- **Kuvasiirrot** (kuvat pysyvät samoilla paikoilla paitsi alla; isoisän koukku poistui, joten sen kuva siirrettiin): Tuileries `raunio1873` koukusta kolmanteen jaksoon (lyhyt "Poltetun palatsin rauniot", ilman vuotta 1873; lähderivi "rauniot palon jälkeen") ja `loisto` ensimmäiseen jaksoon; Bastilji `pylvas1860` koukusta toiseksi kuvaksi viimeiseen jaksoon ("Aukion pylväs"); Les Halles `marville` koukusta toiseen jaksoon; Louvre `julkisivu` ensimmäiseen jaksoon; Sainte-Chapelle `piha` ensimmäiseen jaksoon; Curie `vaja` ensimmäiseen jaksoon; Pasteur `maalaus` ensimmäiseen jaksoon; Lavoisier `david` kolmanteen jaksoon (muotokuva 1788); Garnier, Orsay, Industrie: jaksokohtaiset kuvat samoilla jaksoilla. Eiffelin ja Grand Cafén ensimmäisellä jaksolla ei ole kuvaa (koukulla ei ollut: 1873-kuvia ei ole). Kuvia ei lisätty eikä poistettu (jaksokuvat-lista ennallaan).
- Äänitysjono: `node tools/aanitysjono/tarkista.mjs --lisaa` (rivejä vain lisätty; vanhoja ei siivottu). Jonon avainten korjaus nimettömään lukuun on ÄÄ:n L5-7.

## 3. Poikkeukset ja avoimet kohdat KK:lle

1. **Bastilji: 2 vuosiriviä (4–6 vaaditaan).** M5 sitoo äänitettyjen palojen tekstin sanasta sanaan, eikä niissä sanota 1840 eikä 1899, joten niiden rivit poistettiin (rivi ilman sanottua vuotta ei kuulu sääntöihin). Rivit: 1789, 1830. Tekstin 1300-luvun loppu on vuosikymmen, ei riviä. Jos halutaan 4 riviä, tekstiin pitää lisätä vuosia ja otto uusia (ÄÄ).
2. **Eiffel: 3 vuosiriviä.** Mallin 1909-rivi (purkuaika) poistettiin: tekstissä ei sanota 1909:ää (lähteet 1909 vs 1910) ja riippumaton tarkistaja hylkäsi rivin. Jos KK hyväksyy "vuonna 1909" tekstiin, rivi palaa (1909 on kolmella lähteellä; yksi sanoo 1910).
3. Eiffelin mallitekstiin tehty: "vihasi" → "vastusti" (tarkistaja), lahjuslause pois (pituus < 1 000), "Champ de Mars" korostus muotoon `Champ de Mars|Champ de Mars` (korostustesti vaati näkyvän muodon).
4. Louvren Leonardo-lause ("vaikka Leonardo oli itse tuonut taulun Ranskaan") jäi pois pituuden takia; Pulun kolmas kysymys (Peruggian luulo) ei sitä vaadi.
5. Palais d'Orsay: "ja ne seisoivat siinä vielä isoisäsi matkan aikaan" pois; museon päätös 1977 ja avaus 1986 mukana.
6. Tuileries: nappi-kenttä "Palatsi, jonka isoisä näki raunioina" (kartan nappi, ei kertojan teksti) ei kuulu tähän tehtävään, ei muutettu; `ihme.lyhyt` ja muut kortit ennallaan.
7. Eiffelin viimeisessä jaksossa "72 … nimeä": tarkistaja huomautti, että Pariisi lisää tornille 72 naisen nimeä (valmis viimeistään 2027), joten lause vanhenee silloin. Lause on vanhan KK:n hyväksymä (17.11.), ei muutettu.
8. `npm test`: kaikki ok paitsi `asemataulu-tyolista-komento.test.mjs` "koukku: yli 3 h vanhat työn alla -rivit…" (työlistakoukku; ei liity tekstiin; kaatuu ilman minun muutoksiani samalla tavalla, ei tutkittu tarkemmin).

## 4. M2: jokaisesta nostosta ENNEN | NYT (KK:n vertailua varten)

### Tuileries'n palatsi (`tuileries`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Tuileries'n palatsi | Tuileries'n palatsi |
| Tarinarivi (datan `otsikko`) | Tuileries 1871 — palatsi, joka myytiin kivinä (ei näkynyt ruudulla) | **Palatsi, joka myytiin kivinä** (28 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 1016 (isoisän ja esittelyn jaksot mukana) | 5 / 939 |
| Vuosirivit | 1873 isoisän matka · 1871 palatsi sytytetään · 1564 rakentaminen alkaa · 1882 purkupäätös · 1883 purku valmis | 1564 rakentaminen alkaa · 1871 palatsi sytytetään · 1882 purkupäätös · 1883 purku valmis |
| Kuvat jaksoittain | J1: – · J2: – · J3: raunio1873 · J4: palo · J5: loisto +rauniot1871 · J6: purku +punta · J7: paatykolmio | J1: loisto · J2: palo · J3: raunio1873 +rauniot1871 · J4: purku +punta · J5: paatykolmio |
| Äänikansio | tuileries-koe/v1 | poistettu |

**NYT (kertojan teksti):**

1. [233] Tuileries'n palatsi oli Ranskan hallitsijoiden koti Pariisissa, ennen kuin se poltettiin ja myytiin kivinä. Kuningatar Katariina de Medici aloitti sen rakentamisen Louvren viereen vuonna 1564, ja palatsi seisoi yli kolmesataa vuotta.
2. [168] Toukokuussa 1871 Pariisin kommuuni oli kukistumassa. Sen kannattajat sytyttivät Tuileries'n palatsin. Tuli paloi yli kaksi vuorokautta ja poltti talon sisältä tyhjäksi.
3. [195] Palon jälkeen kivimuurit jäivät pystyyn, vaikka katto ja sisustus olivat poissa. Poltettu kaupungintalo rakennettiin uudelleen, Tuileries'ta ei. Rauniot seisoivat katottomina yli kymmenen vuotta.
4. [163] Vuonna 1882 kolmas tasavalta päätti purkaa raunion, ja purku valmistui 1883. Purkuyrittäjä myi kiviä ja marmoria, ja suuresta erästä rakennettiin linna Korsikalle.
5. [180] Palatsin paikalla on nyt avointa tilaa Louvren ja puutarhan välissä. Yksi sen paloista seisoo yhä Pariisissa: keskipaviljongin päätykolmio on puistossa nimeltä Square Georges Cain.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Tuileries'n palatsi.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Kävelin tänään poltetun palatsin ohi. Katto on poissa, ja ikkuna-aukoista näkyy pelkkää taivasta.
4. (tapahtuma) Kaksi vuotta aiemmin, toukokuussa 1871, Pariisin kommuuni oli kukistumassa. Sen kannattajat sytyttivät Tuileries'n palatsin. Tuli paloi yli kaksi vuorokautta ja poltti talon sisältä tyhjäksi.
5. (tapahtuma) Palatsi oli seissyt Louvren vieressä yli kolmesataa vuotta. Kuningatar Katariina de Medici aloitti sen, ja siitä tuli Ranskan hallitsijoiden koti Pariisissa. Palon jälkeen kivimuurit jäivät pystyyn, vaikka katto ja sisustus olivat poissa. Poltettu kaupungintalo rakennettiin uudelleen, Tuileries'ta ei.
6. (kaanne) Tuileries seisoi katottomana yli kymmenen vuotta. Sitten kolmas tasavalta päätti purkaa sen. Purkuyrittäjä myi kiviä ja marmoria, ja suuresta erästä rakennettiin linna Korsikalle.
7. (tanaan) Palatsin paikalla on nyt avointa tilaa Louvren ja puutarhan välissä. Yksi sen paloista seisoo yhä Pariisissa: keskipaviljongin päätykolmio on puistossa nimeltä Square Georges Cain.


### Louvre (`louvre`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Louvre | Louvre |
| Tarinarivi (datan `otsikko`) | Mona Lisa 1911 — taulu, joka katosi (ei näkynyt ruudulla) | **Päivä, jona Mona Lisa katosi** (28 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 1143 (isoisän ja esittelyn jaksot mukana) | 5 / 956 |
| Vuosirivit | 1873 isoisän matka · 1911 taulu varastetaan · 1913 varas jää kiinni · 1914 taulu palaa Louvreen | 1793 Louvre museoksi · 1911 taulu varastetaan · 1913 varas jää kiinni · 1914 taulu palaa Louvreen |
| Kuvat jaksoittain | J1: – · J2: – · J3: julkisivu · J4: varkaus +monalisa · J5: tyhja-seina · J6: peruggia · J7: jono | J1: julkisivu · J2: varkaus +monalisa · J3: tyhja-seina · J4: peruggia · J5: jono |

**NYT (kertojan teksti):**

1. [137] Louvre oli ennen kuninkaiden palatsi, ja museoksi se avattiin vuonna 1793. Yli sata vuotta myöhemmin sen seinältä varastettiin Mona Lisa.
2. [153] Maanantaina elokuussa 1911 Louvre oli suljettu. Valkoiseen työtakkiin pukeutunut mies nosti Mona Lisan seinältä, ja lukitun oven avasi hänelle putkimies.
3. [199] Kukaan ei huomannut mitään ennen seuraavaa päivää. Silloin maalari tuli kopioimaan taulua ja löysi tyhjän seinän. Poliisi pidätti runoilija Guillaume Apollinairen, ja Pablo Picasso joutui epäillyksi.
4. [284] Varas oli Louvressa työskennellyt lasittaja Vincenzo Peruggia, jonka poliisi oli jo kuulustellut. Taulu odotti laatikossa yli kaksi vuotta, kunnes hän tarjosi sitä vuonna 1913 firenzeläiselle taidekauppiaalle, joka hälytti poliisin. Peruggia väitti vieneensä taulun takaisin Italiaan.
5. [183] Mona Lisa palasi Louvreen vuonna 1914, ja varkaus teki siitä entistä kuuluisamman. Nykyään se on Louvren ensimmäisessä kerroksessa. Sen edessä on jono, ja taulua vartioidaan tarkasti.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Louvre.
2. (esittely) Isoisäsi kulki tästä ohi matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Kävelin tänään pitkin Louvren julkisivua ja yritin laskea ikkunat. Menetin laskun kolmesti.
4. (tapahtuma) Lähes neljäkymmentä vuotta myöhemmin, maanantaina elokuussa, Louvre oli suljettu. Valkoiseen työtakkiin pukeutunut mies nosti Mona Lisan seinältä ja jätti kehyksen portaikkoon. Lukitun oven avasi hänelle putkimies, ja taulu lähti ulos.
5. (tapahtuma) Kukaan ei huomannut mitään ennen seuraavaa päivää. Silloin maalari tuli kopioimaan taulua ja löysi tyhjän seinän. Poliisi pidätti runoilija Guillaume Apollinairen, ja Pablo Picasso joutui epäillyksi. Ihmiset jonottivat katsomaan tyhjää seinää.
6. (kaanne) Varas oli Louvressa työskennellyt lasittaja Vincenzo Peruggia. Poliisi oli kuulustellut häntä ja uskonut hänen selityksensä. Taulu odotti laatikossa yli kaksi vuotta. Sitten hän tarjosi sitä firenzeläiselle taidekauppiaalle, joka hälytti poliisin. Peruggia väitti vieneensä sen takaisin Italiaan, vaikka Leonardo oli itse tuonut taulun Ranskaan.
7. (tanaan) Mona Lisa palasi Louvreen, ja varkaus teki siitä entistä kuuluisamman. Nykyään se on Louvren ensimmäisessä kerroksessa. Sen edessä on jono, ja taulua vartioidaan tarkasti.


### Bastilji (`bastilji`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Bastilji | Bastilji |
| Tarinarivi (datan `otsikko`) | Bastilji 1789 — linna, joka jaettiin kivinä (ei näkynyt ruudulla) | **Linna, joka jaettiin kivinä** (27 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 1106 (isoisän ja esittelyn jaksot mukana) | 4 / 915 |
| Vuosirivit | 1873 isoisän matka · 1789 valtaus · 1830 vallankumous · 1840 pylväs valmistuu · 1899 tornin pohja löytyy | 1789 valtaus · 1830 vallankumous |
| Kuvat jaksoittain | J1: – · J2: – · J3: pylvas1860 · J4: loisto +silvestre · J5: valtaus +portti · J6: purku · J7: metro | J1: loisto +silvestre · J2: valtaus +portti · J3: purku · J4: metro +pylvas1860 |
| Äänikansio | bastilji/v1 | bastilji/v1 (palat ennallaan) |

**NYT (kertojan teksti):**

1. [258] Bastilji rakennettiin 1300-luvun lopulla vartioimaan Pariisin itäistä porttia, ja siinä oli kahdeksan tornia. Myöhemmin siitä tuli valtionvankila. Kuningas saattoi lähettää sinne ihmisen kirjeellä, ilman oikeudenkäyntiä, ja linnasta tuli mielivallan symboli.
2. [232] Heinäkuun 14. päivänä 1789 pariisilaisilla oli Invalidien sotilaskodista otettuja aseita mutta ei ruutia, ja ruutia uskottiin olevan Bastiljissa. Vankeja oli vain seitsemän. Silti väkijoukko valtasi linnan, ja kuvernööri surmattiin.
3. [220] Purku alkoi jo samana iltana. Työmaata johti Palloy, jonka työpajassa kivistä veistettiin pienoismalleja ja muistoesineitä. Osa kivistä päätyi Pariisin siltoihin, ja muutamassa vuodessa linnasta ei jäänyt pystyyn mitään.
4. [205] Linnan paikalla on nyt aukio. Aukion pylväs muistuttaa vuoden 1830 vallankumouksesta, ei 1789:stä. Tornin pohjakiviä on koottu Henri-Galli-puistoon, ja metroaseman laiturilla näkyy pala vallihaudan muuria.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Bastilji.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Kartassani lukee Bastilji, ja astuin aukiolle mitta kädessä. Linnaa ei ole. Keskellä seisoo vain korkea pylväs, jonka päällä on patsas.
4. (tapahtuma) Bastilji rakennettiin 1300-luvun lopulla vartioimaan Pariisin itäistä porttia, ja siinä oli kahdeksan tornia. Myöhemmin siitä tuli valtionvankila. Kuningas saattoi lähettää sinne ihmisen kirjeellä, ilman oikeudenkäyntiä, ja linnasta tuli mielivallan symboli.
5. (tapahtuma) Heinäkuun 14. päivänä 1789 pariisilaisilla oli Invalidien sotilaskodista otettuja aseita mutta ei ruutia, ja ruutia uskottiin olevan Bastiljissa. Vankeja oli vain seitsemän. Silti väkijoukko valtasi linnan, ja kuvernööri surmattiin.
6. (kaanne) Purku alkoi jo samana iltana. Työmaata johti Palloy, jonka työpajassa kivistä veistettiin pienoismalleja ja muistoesineitä. Osa kivistä päätyi Pariisin siltoihin, ja muutamassa vuodessa linnasta ei jäänyt pystyyn mitään.
7. (tanaan) Linnan paikalla on nyt aukio. Aukion pylväs muistuttaa vuoden 1830 vallankumouksesta, ei 1789:stä. Tornin pohjakiviä on koottu Henri-Galli-puistoon, ja metroaseman laiturilla näkyy pala vallihaudan muuria.


### Eiffel-torni (`eiffel-torni`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Eiffel-torni | Eiffel-torni |
| Tarinarivi (datan `otsikko`) | Eiffel-torni 1925 — myyty romuksi (ei näkynyt ruudulla) | **Torni, joka myytiin romuksi** (27 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 1114 (isoisän ja esittelyn jaksot mukana) | 5 / 987 |
| Vuosirivit | 1873 isoisän matka · 1887 taiteilijavetoomus · 1889 torni valmis · 1909 tornin purkuaika · 1925 Lustigin huijaus | 1887 rakentaminen alkaa · 1889 torni valmis · 1925 Lustigin huijaus |
| Kuvat jaksoittain | J1: – · J2: – · J3: – · J4: rakenteilla +niittaus · J5: photochrom1900 · J6: lustig · J7: nykyinen | J1: – · J2: rakenteilla +niittaus · J3: photochrom1900 · J4: lustig · J5: nykyinen |

**NYT (kertojan teksti):**

1. [166] Eiffel-torni rakennettiin seisomaan vain kaksikymmentä vuotta, ja kerran huijari myi sen romuksi. Ennen tornia paikalla oli Champ de Mars, sotilaiden harjoituskenttä.
2. [203] Vuonna 1887 kentälle alettiin koota rautatornia maailmannäyttelyä varten. Työmiehet niittasivat tuhansia osia yhteen yhä korkeammalla. Moni pariisilainen vastusti tornia, mutta vuonna 1889 se oli valmis.
3. [157] Kaksikymmentä vuotta kului, mutta kukaan ei purkanut tornia. Sen huipulla oli radioantenni, ja armeijalle siitä oli niin paljon hyötyä, että torni sai jäädä.
4. [277] Vuonna 1925 huijari Victor Lustig luki lehdestä, että tornin kunnossapito on kallista. Väärennetyin virkapaperein hän esiintyi ministeriön apulaisjohtajana ja myi muka tornin romukauppiaalle. Kauppias häpesi eikä ilmoittanut poliisille, joten Lustig palasi ja yritti uudestaan.
5. [184] Torni seisoo yhä. Vanha harjoituskenttä on nykyään puisto sen jalalla, ja ensimmäisen kerroksen alle on kirjoitettu kullatuin kirjaimin 72 ranskalaisen tiedemiehen ja insinöörin nimeä.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Eiffel-torni.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Mittasin tänään Champ de Marsin askelin. Se on sotilaiden harjoituskenttä, tasainen kuin pöytä.
4. (tapahtuma) Neljätoista vuotta myöhemmin kentälle alettiin rakentaa rautatornia. Se koottiin tuhansista osista, jotka työmiehet niittasivat yhteen yhä korkeammalla. Moni pariisilainen vihasi tornia, ja sen piti seistä vain kaksikymmentä vuotta.
5. (tapahtuma) Kaksikymmentä vuotta kului, mutta kukaan ei purkanut tornia. Sen huipulla oli radioantenni, ja armeijalle siitä oli niin paljon hyötyä, että torni sai jäädä.
6. (kaanne) Vuonna 1925 huijari Victor Lustig luki lehdestä, että tornin kunnossapito on kallista. Väärennetyin virkapaperein hän esiintyi ministeriön apulaisjohtajana ja myi muka tornin romukauppiaalle, joka maksoi hänelle myös lahjuksen. Kauppias häpesi eikä ilmoittanut poliisille, joten Lustig palasi ja yritti uudestaan.
7. (tanaan) Torni seisoo yhä, ja se maalataan uudelleen noin seitsemän vuoden välein. Kenttä, jonka isoisäsi mittasi, on nykyään puisto tornin jalalla. Tornin ensimmäisen kerroksen alle on kirjoitettu 72 ranskalaisen tiedemiehen ja insinöörin nimeä kullatuin kirjaimin.


### Sainte-Chapelle (`sainte-chapelle`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Sainte-Chapelle | Sainte-Chapelle |
| Tarinarivi (datan `otsikko`) | Kaulanauha 1785 — huijaus kuningattaren nimissä (ei näkynyt ruudulla) | **Kappeli ja kuningattaren kaulanauha** (35 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 1178 (isoisän ja esittelyn jaksot mukana) | 5 / 998 |
| Vuosirivit | 1873 isoisän matka · 1784 yöllinen tapaaminen · 1785 nauha luovutetaan · 1786 Rohan vapautetaan | 1248 kappeli vihitään · 1784 yöllinen tapaaminen · 1785 nauha luovutetaan · 1786 Rohan vapautetaan |
| Kuvat jaksoittain | J1: – · J2: – · J3: piha · J4: nauha +juoni · J5: rohan · J6: viuhka · J7: ikkunat | J1: piha · J2: nauha +juoni · J3: rohan · J4: viuhka · J5: ikkunat |

**NYT (kertojan teksti):**

1. [164] Sainte-Chapelle on kappeli Cité-saaren palatsin pihalla. Kuningas Ludvig IX rakennutti sen säilyttämään Kristuksen orjantappurakruunua, ja se vihittiin vuonna 1248.
2. [246] 1770-luvulla kuninkaan jalokivikauppiaat tekivät timanttikaulanauhan, jossa oli lähes 650 kiveä. Marie Antoinette kieltäytyi ostamasta sitä, mutta huijari Jeanne de La Motte sai kardinaali de Rohanin uskomaan, että kuningatar halusi nauhan salaa.
3. [255] Elokuussa 1784 kardinaali tapasi Versailles'n puistossa naisen, jonka hän luuli kuningattareksi. Alkuvuodesta 1785 hän sai nauhan kauppiailta ja luovutti sen Jeannelle. Kun kauppiaat pyysivät maksua, kuningatar vaati selvitystä, ja kardinaali pidätettiin.
4. [201] Oikeudenkäynti pidettiin Pariisin parlamentissa, joka istui samassa palatsissa. Toukokuussa 1786 kardinaali vapautettiin, ja Jeanne leimattiin varkaaksi ja vietiin vankilaan. Kuningattaren maine kärsi.
5. [132] Sainte-Chapelle on yhä saman palatsin pihalla. Sen ikkunoissa on yli tuhat kohtausta, ja kappeliin mennään turvatarkastuksen kautta.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Sainte-Chapelle.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Löysin Sainte-Chapellen oikeuspalatsin pihalta. Ikkunat ovat niin täynnä pieniä kuvia, että luovutin niiden laskemisen.
4. (tapahtuma) Kuninkaan jalokivikauppiaat tekivät timanttikaulanauhan, jossa oli lähes 650 kiveä. Hinta oli 1,6 miljoonaa livreä, ja Marie Antoinette kieltäytyi ostamasta sitä. Huijari Jeanne de La Motte sai kardinaali de Rohanin uskomaan, että kuningatar halusi nauhan salaa.
5. (tapahtuma) Elokuussa 1784 kardinaali tapasi Versailles'n puistossa naisen, jonka hän luuli kuningattareksi. Alkuvuodesta 1785 hän sai nauhan kauppiailta ja luovutti sen Jeannelle. Kun kauppiaat pyysivät maksua, kuningatar vaati selvitystä, ja kardinaali pidätettiin.
6. (kaanne) Oikeudenkäynti pidettiin Pariisin parlamentissa, joka istui Cité-saaren palatsissa. Toukokuussa 1786 kardinaali vapautettiin. Jeanne leimattiin varkaaksi ja vietiin vankilaan. Timantit oli jo myyty, moni niistä Lontoossa, ja kuningattaren maine kärsi pahasti.
7. (tanaan) Sainte-Chapelle on yhä saman palatsin pihalla. Kuningas Ludvig IX rakennutti sen 1240-luvulla säilyttämään Kristuksen orjantappurakruunua. Ikkunoissa on yli tuhat kohtausta, ja kappeliin mennään turvatarkastuksen kautta.


### Curien vaja (`curie-1898`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Curien vaja | Curien vaja |
| Tarinarivi (datan `otsikko`) | Curie 1898 — hohtava alkuaine (ei näkynyt ruudulla) | **Vaja, jossa radium hohti** (24 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 1005 (isoisän ja esittelyn jaksot mukana) | 5 / 917 |
| Vuosirivit | 1873 isoisän matka · 1898 löytö ilmoitettu · 1902 radiumkloridi · 1903 fysiikan Nobel · 1911 kemian Nobel | 1898 löytö ilmoitettu · 1902 radiumkloridi · 1903 fysiikan Nobel · 1911 kemian Nobel |
| Kuvat jaksoittain | J1: – · J2: – · J3: – · J4: marie · J5: vaja · J6: laboratorio · J7: laatta | J1: vaja · J2: marie · J3: – · J4: laboratorio · J5: laatta |

**NYT (kertojan teksti):**

1. [157] Curien vaja oli Pariisin fysiikan ja kemian koulun pihalla seissyt vaja, jossa Marie ja Pierre Curie eristivät radiumin. Se oli ennen ollut ruumiinavaussali.
2. [232] Marie ja Pierre Curie tutkivat uraanimalmin sisältämää säteilyä. Heinäkuussa 1898 he ilmoittivat löytäneensä uuden alkuaineen. He nimesivät sen Marien kotimaan Puolan mukaan poloniumiksi. Joulukuussa he ilmoittivat toisen, radiumin.
3. [162] Pelkkä ilmoitus ei riittänyt, vaan alkuaine piti saada puhtaana erilleen malmista. Vaja oli huonosti tuuletettu eikä pitänyt sadetta, ja malmia kului tonneittain.
4. [264] Työ vei yli kolme vuotta, ja vuonna 1902 heillä oli kymmenesosagramma puhdasta radiumkloridia. Iltaisin radium hohti pimeässä, ja Curiet ihailivat sitä. Marie sai fysiikan Nobelin vuonna 1903 Pierren ja Henri Becquerelin kanssa ja kemian Nobelin vuonna 1911 yksin.
5. [102] Koulun seinässä on laatta, joka kertoo löydöstä. Marien myöhempi laboratorio on lähellä Curie-museona.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Curien vaja.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Eksyin tänään Latinalaiskortteliin. Kaduilla käveli opiskelijoita, ja jokaisella oli kirjoja kainalossa.
4. (tapahtuma) Marie ja Pierre Curie tutkivat uraanimalmin sisältämää säteilyä. Heinäkuussa 1898 he ilmoittivat löytäneensä uuden alkuaineen. He nimesivät sen Marien kotimaan Puolan mukaan poloniumiksi. Joulukuussa he ilmoittivat toisen, radiumin.
5. (tapahtuma) Pelkkä ilmoitus ei riittänyt, vaan alkuaine piti saada puhtaana erilleen malmista. Työ tehtiin koulun pihan toisella puolella olevassa vajassa, joka oli ennen ollut ruumiinavaussali. Vaja oli huonosti tuuletettu eikä pitänyt sadetta, ja malmia kului tonneittain.
6. (kaanne) Työ vei yli kolme vuotta, ja lopulta heillä oli kymmenesosagramma puhdasta radiumkloridia. Iltaisin radium hohti pimeässä, ja Curiet ihailivat sitä. Marie sai fysiikan Nobelin Pierren ja Henri Becquerelin kanssa ja myöhemmin kemian Nobelin yksin.
7. (tanaan) Koulun seinässä on laatta, joka kertoo löydöstä. Marien myöhempi laboratorio on lähellä Curie-museona.


### Grand Café (`lumiere-1895`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Grand Café | Grand Café |
| Tarinarivi (datan `otsikko`) | Lumière 1895 — kuvat alkavat liikkua (ei näkynyt ruudulla) | **Ilta, jona kuvat alkoivat liikkua** (33 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 877 (isoisän ja esittelyn jaksot mukana) | 5 / 868 |
| Vuosirivit | 1873 isoisän matka · 1895 patentti · 1895 Grand Cafén näytös | 1895 patentti · 1895 Grand Cafén näytös · 1896 Mélièsin elokuva · 1902 Matka kuuhun |
| Kuvat jaksoittain | J1: – · J2: – · J3: – · J4: veljekset · J5: juliste · J6: melies · J7: laatta | J1: – · J2: veljekset · J3: juliste · J4: melies · J5: laatta |

**NYT (kertojan teksti):**

1. [116] Grand Café oli kahvila Capucines-bulevardilla Pariisissa, ja sen kellarissa katsottiin Lumièren veljesten keksintöä.
2. [151] Lumièren veljekset patentoivat keksintönsä helmikuussa 1895. Laite oli kamera ja projektori yhdessä, ja sillä kuvattu filmi oli noin minuutin pituinen.
3. [237] Joulukuun 28. päivänä 1895 Grand Cafén kellarisalissa pidettiin maksullinen näytös. Lippu maksoi frangin, ja illalla katsojia oli vain kolmisenkymmentä. Valkokankaalla Lumièren tehtaan portti Lyonissa aukesi, ja työläiset kävelivät ulos.
4. [249] Kutsuvieraiden joukossa oli taikuri Georges Méliès. Hän halusi ostaa laitteen, mutta Lumièret eivät myyneet sitä. Puhe levisi, ja kadulle syntyi jono. Méliès alkoi tehdä omia elokuviaan: ensimmäisen hän teki vuonna 1896 ja Matkan kuuhun vuonna 1902.
5. [115] Grand Cafén paikalla on nykyään Hôtel Scribe. Sen ravintoloiden sisäänkäynnillä on laatta, joka kertoo näytöksestä.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Grand Café.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Kävelin tänään Capucines-bulevardia pitkin. Ihmisiä oli niin paljon, että jouduin astumaan kadulle.
4. (tapahtuma) Lumièren veljekset patentoivat keksintönsä helmikuussa 1895. Laite oli kamera ja projektori yhdessä, ja sillä kuvattu filmi oli noin minuutin pituinen.
5. (tapahtuma) Saman vuoden joulukuun 28. päivänä Grand Cafén kellarisalissa Capucines-bulevardilla pidettiin maksullinen näytös. Lippu maksoi frangin, ja illalla katsojia oli vain kolmisenkymmentä. Valkokankaalla Lumièren tehtaan portti Lyonissa aukesi, ja työläiset kävelivät ulos.
6. (kaanne) Kutsuvieraiden joukossa oli taikuri Georges Méliès. Hän halusi ostaa laitteen, mutta Lumièret eivät myyneet sitä. Puhe levisi, ja kadulle syntyi jono. Méliès alkoi tehdä omia elokuviaan.
7. (tanaan) Grand Cafén paikalla on nykyään Hôtel Scribe. Sen ravintoloiden sisäänkäynnillä on laatta, joka kertoo näytöksestä.


### Lavoisierin laboratorio (`lavoisier-1780`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Lavoisierin laboratorio | Lavoisierin laboratorio |
| Tarinarivi (datan `otsikko`) | Lavoisier 1780 — kaikki punnittiin (ei näkynyt ruudulla) | **Mies, joka punnitsi kaiken** (26 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 960 (isoisän ja esittelyn jaksot mukana) | 5 / 947 |
| Vuosirivit | 1873 isoisän matka · 1789 oppikirja · 1794 Lavoisier mestattiin | 1771 naimisiin · 1788 Davidin muotokuva · 1789 oppikirja · 1794 Lavoisier mestattiin |
| Kuvat jaksoittain | J1: – · J2: – · J3: – · J4: koe · J5: laboratorio · J6: david · J7: kaasumittarit | J1: koe · J2: laboratorio · J3: david · J4: – · J5: kaasumittarit |

**NYT (kertojan teksti):**

1. [275] Lavoisierin laboratorio oli Arsenaalin asunnon yhteydessä Pariisissa. Antoine Lavoisier johti Arsenaalissa ruudin valmistusta ja punnitsi laboratoriossaan kaiken ennen koetta ja sen jälkeen. Tuloksista hän päätteli, että ainetta on kokeen jälkeen yhtä paljon kuin ennen sitä.
2. [233] Vuonna 1771 Lavoisier oli mennyt naimisiin Marie-Annen kanssa. Marie-Anne oli oppinut englantia ja käänsi ulkomaisia tutkimuksia ranskaksi. Lavoisier huomasi kokeissaan, että palaessa aine yhtyy ilman osaan, jonka hän nimesi hapeksi.
3. [176] Vuonna 1788 Jacques-Louis David maalasi Lavoisierista ja Marie-Annesta muotokuvan. Vuonna 1789 ilmestyi Lavoisierin oppikirja. Marie-Anne oli piirtänyt siihen laitteiden kuvat.
4. [157] Lavoisier oli kuulunut vanhan hallinnon veronkantajiin. Vallankumouksen tuomioistuin tuomitsi hänet kuolemaan, ja hänet mestattiin toukokuun 8. päivänä 1794.
5. [106] Lavoisierin laboratorion välineitä on nykyään Arts et Métiers -museossa Pariisissa. Ne ovat siellä esillä.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Lavoisierin laboratorio.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Kävelin tänään Bastiljin lähellä kanavan vartta. Rannassa oli niin paljon proomuja, että niiden välistä ei nähnyt vettä.
4. (tapahtuma) Antoine Lavoisier johti Arsenaalissa ruudin valmistusta. Hänen laboratorionsa oli asunnon vieressä, ja siellä hän punnitsi kaiken ennen koetta ja sen jälkeen. Tuloksista hän päätteli, että ainetta on kokeen jälkeen yhtä paljon kuin ennen sitä.
5. (tapahtuma) Kokeissaan hän huomasi, että palaessa aine yhtyy ilman osaan, jonka hän nimesi hapeksi. Hänen vaimonsa Marie-Anne oli oppinut englantia ja käänsi ulkomaisia tutkimuksia ranskaksi. Hän myös piirsi laitteet mittakaavaan, ja piirrokset ovat Lavoisierin oppikirjassa.
6. (kaanne) Lavoisier oli kuulunut vanhan hallinnon veronkantajiin. Vallankumouksen tuomioistuin tuomitsi hänet kuolemaan, ja hänet mestattiin toukokuun 8. päivänä 1794.
7. (tanaan) Lavoisierin laboratorion välineitä on nykyään Arts et Métiers -museossa Pariisissa. Ne ovat siellä esillä.


### Pasteurin laboratorio (`pasteur-1862`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Pasteurin laboratorio | Pasteurin laboratorio |
| Tarinarivi (datan `otsikko`) | Pasteur — pullot pysyivät kirkkaina (ei näkynyt ruudulla) | **Pullot, jotka pysyivät kirkkaina** (32 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 1015 (isoisän ja esittelyn jaksot mukana) | 5 / 958 |
| Vuosirivit | 1873 isoisän matka · 1865 pastörointipatentti | 1857 tulee kouluun · 1860 pullot jäätiköllä · 1865 pastörointipatentti · 1888 Institut Pasteur |
| Kuvat jaksoittain | J1: – · J2: – · J3: – · J4: pullot · J5: pouchet · J6: maalaus · J7: ens | J1: maalaus · J2: pullot · J3: pouchet · J4: – · J5: ens |

**NYT (kertojan teksti):**

1. [197] Pasteurin laboratorio oli École normale supérieuren tiloissa rue d'Ulmilla Pariisissa. Louis Pasteur tuli kouluun vuonna 1857 tieteellisten opintojen johtajaksi ja työskenteli siellä vuosikymmeniä.
2. [137] Siellä hän keitti lientä lasipulloissa, joiden kaula oli taivutettu joutsenen kaulan muotoon. Ilma pääsi pulloon, mutta pöly jäi mutkaan.
3. [272] Pasteurin vastustaja Félix Pouchet uskoi, että elämä voi syntyä itsestään mätänevästä aineesta. Tiedeakatemia oli luvannut palkinnon sille, joka ratkaisee kiistan kokeilla. Pasteur avasi pulloja jopa Alppien jäätiköllä vuonna 1860 ja julkaisi tuloksensa 1860-luvun alussa.
4. [214] Pasteur voitti kiistan. Hän osoitti myös, että käyminen on elävien mikrobien työtä. Viinin tauteja hän torjui kuumentamalla viiniä, ja keksinnölle haettiin patentti vuonna 1865. Menetelmää kutsutaan pastöroinniksi.
5. [138] Vuonna 1888 avattiin Institut Pasteur, joka kantaa hänen nimeään. École normale supérieure toimii yhä rue d'Ulmilla Latinalaiskorttelissa.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Pasteurin laboratorio.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Kävelin tänään rue d'Ulmia pitkin. Kadulla käveli muutama nuori mies, ja jokaisella oli kirja kainalossa.
4. (tapahtuma) Louis Pasteur työskenteli École normale supérieuren laboratoriossa rue d'Ulmilla. Hän keitti lientä lasipulloissa, joiden kaula oli taivutettu joutsenen kaulan muotoon. Ilma pääsi pulloon, mutta pöly jäi mutkaan.
5. (tapahtuma) Pasteurin vastustaja Félix Pouchet uskoi, että elämä voi syntyä itsestään mätänevästä aineesta. Tiedeakatemia oli luvannut palkinnon sille, joka ratkaisee kiistan kokeilla. Pasteur avasi pulloja jopa Alppien jäätiköllä. 1860-luvun alussa hän julkaisi tuloksensa.
6. (kaanne) Pasteur voitti kiistan. Hän osoitti myös, että käyminen on elävien mikrobien työtä. Viinin tauteja hän torjui kuumentamalla viiniä, ja keksinnölle haettiin patentti 1865. Menetelmää kutsutaan pastöroinniksi.
7. (tanaan) École normale supérieure toimii yhä rue d'Ulmilla Latinalaiskorttelissa. Pasteur oli koulun tieteellisten opintojen johtaja ja työskenteli siellä vuosikymmeniä.


### Palais Garnier (`palais-garnier`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Palais Garnier | Palais Garnier |
| Tarinarivi (datan `otsikko`) | Palais Garnier — ooppera, joka odotti (ei näkynyt ruudulla) | **Ooppera, joka odotti** (20 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 906 (isoisän ja esittelyn jaksot mukana) | 4 / 815 |
| Vuosirivit | 1873 isoisän matka · 1873 vanha ooppera paloi · 1875 talo avattiin · 1964 kattomaalaus | 1858 murhayritys · 1870 sota alkaa · 1873 vanha ooppera paloi · 1875 talo avattiin · 1964 kattomaalaus |
| Kuvat jaksoittain | J1: – · J2: – · J3: – · J4: julkisivu · J5: tyomaa · J6: palo · J7: portaikko | J1: julkisivu · J2: tyomaa · J3: palo · J4: portaikko |

**NYT (kertojan teksti):**

1. [313] Palais Garnier on Pariisin oopperatalo, jonka rakentamisen sai alkuun murhayritys. Vuonna 1858 keisari Napoleon III välttyi murhayritykseltä vanhan oopperan edessä. Sen jälkeen hän päätti rakennuttaa uuden. Kilpailuun tuli yli sata ehdotusta, ja voittajaksi valittiin nuori, tuntematon arkkitehti Charles Garnier.
2. [190] Kun työmaalla kaivettiin perustuksia, maasta nousi pohjavettä. Garnier rakennutti kellariin vesitiiviin betonisäiliön. Vuonna 1870 alkanut sota ja Pariisin kommuuni pysäyttivät rakentamisen.
3. [128] Syksyllä 1873 vanha oopperatalo paloi. Palon jälkeen Garnierin työmaa sai jatkua, ja uusi talo valmistui alle kahdessa vuodessa.
4. [184] Talo avattiin tammikuussa 1875, ja Garnier joutui maksamaan paikkansa avajaisissa itse. Nykyään talossa esitetään yhä balettia, ja katsomon katon on maalannut Marc Chagall vuonna 1964.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Palais Garnier.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Kävelin tänään Place de l'Opéralle. Suuren oopperatalon julkisivu seisoo jo valmiina, mutta sisällä työ jatkuu vielä.
4. (tapahtuma) Keisari Napoleon III päätti rakennuttaa uuden oopperan, kun hän oli välttynyt murhayritykseltä vanhan oopperan edessä. Arkkitehtikilpailuun tuli yli sata ehdotusta, ja voittajaksi valittiin nuori, tuntematon arkkitehti Charles Garnier.
5. (tapahtuma) Kun työmaalla kaivettiin perustuksia, maasta nousi pohjavettä. Garnier rakennutti kellariin vesitiiviin betonisäiliön. Myöhemmin sota ja Pariisin kommuuni pysäyttivät rakentamisen.
6. (kaanne) Syksyllä 1873 vanha oopperatalo paloi. Palon jälkeen Garnierin työmaa sai jatkua, ja uusi talo valmistui alle kahdessa vuodessa.
7. (tanaan) Talo avattiin tammikuussa 1875, ja Garnier joutui maksamaan paikkansa avajaisissa itse. Nykyään talossa esitetään yhä balettia, ja katsomon katon on maalannut Marc Chagall vuonna 1964.


### Palais d'Orsay (`hahmotelma-palais-orsay`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Palais d'Orsay | Palais d'Orsay |
| Tarinarivi (datan `otsikko`) | Palais d'Orsay 1873 — palatsi, jonka raunioiden paikalle tuli asema (ei näkynyt ruudulla) | **Palatsi, jonka paikalle tuli asema** (34 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 794 (isoisän ja esittelyn jaksot mukana) | 4 / 760 |
| Vuosirivit | 1873 isoisän matka · 1871 palatsi paloi · 1900 maailmannäyttely · 1986 museo avattiin | 1871 palatsi paloi · 1900 maailmannäyttely · 1977 päätös museosta · 1986 museo avattiin |
| Kuvat jaksoittain | J1: – · J2: – · J3: – · J4: loisto · J5: – · J6: rauniot · J7: museo | J1: loisto · J2: – · J3: rauniot · J4: museo |

**NYT (kertojan teksti):**

1. [226] Palais d'Orsay oli hallintopalatsi Seinen rannalla Pariisissa. Napoleonin aikana sen rakentaminen alettiin, ja se valmistui vasta noin kolmenkymmenen vuoden päästä. Siellä toimivat valtioneuvosto ja tilintarkastustuomioistuin.
2. [197] Tilintarkastustuomioistuimen portaikon seinille Théodore Chassériau maalasi freskot. Pariisin kommuunin aikana, toukokuussa 1871, palatsi paloi. Émile Zola kuvasi tulipaloa romaanissaan La Débâcle.
3. [152] Tuli tuhosi freskoja. Rauniot jäivät keskelle Pariisia vuosikymmeniksi. Vuonna 1900 maailmannäyttelyä varten niiden paikalle rakennettiin rautatieasema.
4. [185] Asemasta tuli Orsayn taidemuseo. Rakennus päätettiin vuonna 1977 muuttaa museoksi, ja museo avattiin yleisölle vuonna 1986. Se seisoo yhä Seinen rannalla, samalla paikalla kuin palatsi.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Palais d'Orsay.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Kävelin tänään Seinen rantaa pitkin. Rannalla seisoi keskellä kaupunkia palaneen palatsin rauniot.
4. (tapahtuma) Napoleonin aikana Seinen rannalle alettiin rakentaa hallintopalatsia. Se valmistui vasta noin kolmenkymmenen vuoden päästä. Siellä toimivat valtioneuvosto ja tilintarkastustuomioistuin.
5. (tapahtuma) Tilintarkastustuomioistuimen portaikon seinille Théodore Chassériau maalasi freskot. Pariisin kommuunin aikana, toukokuussa 1871, palatsi paloi. Émile Zola kuvasi tulipaloa romaanissaan La Débâcle.
6. (kaanne) Tuli tuhosi freskoja. Rauniot jäivät keskelle Pariisia vuosikymmeniksi, ja ne seisoivat siinä vielä isoisäsi matkan aikaan.
7. (tanaan) Raunioiden paikalle rakennettiin rautatieasema vuoden 1900 maailmannäyttelyä varten. Asemasta tuli Orsayn taidemuseo vuonna 1986.


### Palais de l'Industrie (`hahmotelma-palais-industrie`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Palais de l'Industrie | Palais de l'Industrie |
| Tarinarivi (datan `otsikko`) | Palais de l'Industrie 1873 — halli, jonka paikalle tuli Grand Palais (ei näkynyt ruudulla) | **Halli, jonka paikalle tuli Grand Palais** (39 merkkiä) |
| Jaksoja / merkkejä | 6 (nimi, esittely, isoisä + 3) / 754 (isoisän ja esittelyn jaksot mukana) | 4 / 748 |
| Vuosirivit | 1873 isoisän matka · 1855 maailmannäyttely · 1900 maailmannäyttely · 2024 olympialaiset · 2025 uudelleen avattu | 1855 maailmannäyttely · 1900 maailmannäyttely · 2021 kunnostus alkaa · 2024 olympialaiset · 2025 uudelleen avattu |
| Kuvat jaksoittain | J1: – · J2: – · J3: – · J4: loisto · J5: portti · J6: grandpalais | J1: loisto · J2: – · J3: portti · J4: grandpalais |

**NYT (kertojan teksti):**

1. [202] Palais de l'Industrie oli suuri näyttelyhalli Champs-Élysées'n tuntumassa Pariisissa. Sen paikalla seisoo nykyään Grand Palais. Hallin suunnittelussa olivat mukana insinööri Barrault ja arkkitehti Viel.
2. [164] Halli rakennettiin Pariisin vuoden 1855 maailmannäyttelyä varten, ja näyttely avattiin toukokuussa. Näyttelyn jälkeenkin siellä pidettiin näyttelyitä ja tapahtumia.
3. [140] Halli ei saanut jäädä. Se purettiin 1890-luvulla, jotta paikalle voitiin rakentaa uusi näyttelypalatsi vuoden 1900 maailmannäyttelyä varten.
4. [242] Paikalle rakennettiin lasikattoinen Grand Palais. Rakennus suljettiin kunnostukseen vuonna 2021. Kesällä 2024 sen lasikaton alla miekkailtiin Pariisin olympialaisissa, ja kunnostuksen jälkeen rakennus avattiin yleisölle uudelleen vuonna 2025.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Palais de l'Industrie.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Kävelin tänään Champs-Élysées'n tuntumassa suuren näyttelyhallin ohi. Se oli jäänyt paikalleen vuoden 1855 maailmannäyttelyn jälkeen.
4. (tapahtuma) Hallin suunnittelussa olivat mukana insinööri Barrault ja arkkitehti Viel. Se rakennettiin Pariisin vuoden 1855 maailmannäyttelyä varten, ja näyttely avattiin toukokuussa. Näyttelyn jälkeenkin siellä pidettiin näyttelyitä ja tapahtumia.
5. (kaanne) Halli ei saanut jäädä. Se purettiin 1890-luvulla, jotta paikalle voitiin rakentaa uusi näyttelypalatsi vuoden 1900 maailmannäyttelyä varten.
6. (tanaan) Paikalle rakennettiin Grand Palais. Kesällä 2024 sen lasikaton alla miekkailtiin Pariisin olympialaisissa, ja kunnostuksen jälkeen koko rakennus avattiin yleisölle vuonna 2025.


### Les Hallesin hallit (`hahmotelma-les-halles`)

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Les Hallesin hallit | Les Hallesin hallit |
| Tarinarivi (datan `otsikko`) | Les Halles 1873 — Pariisin vatsa, jonka tilalle jäi reikä (ei näkynyt ruudulla) | **Pariisin vatsa, jonka tilalle jäi reikä** (39 merkkiä) |
| Jaksoja / merkkejä | 7 (nimi, esittely, isoisä + 4) / 942 (isoisän ja esittelyn jaksot mukana) | 5 / 830 |
| Vuosirivit | 1183 ensimmäiset hallit · 1873 Zolan romaani · 1969 kauppa Rungisiin · 1979 Forum avattiin | 1183 ensimmäiset hallit · 1873 Zolan romaani · 1969 kauppa Rungisiin · 1979 Forum avattiin |
| Kuvat jaksoittain | J1: – · J2: – · J3: marville · J4: loisto · J5: – · J6: purku · J7: nogent | J1: loisto · J2: marville · J3: – · J4: purku · J5: nogent |

**NYT (kertojan teksti):**

1. [159] Les Hallesin hallit olivat Pariisin ruokatori, jonka historia ulottuu 1100-luvulle. Kuningas Philippe Auguste rakennutti sinne 1183 ensimmäiset katetut hallit.
2. [225] Arkkitehti Victor Baltard suunnitteli ensin kivihallin, mutta Napoleon III halusi metallia. Siksi paikalle rakennettiin 1850-luvulta alkaen kymmenen paviljonkia raudasta ja lasista. Niissä myytiin vihanneksia, kalaa ja lihaa.
3. [161] Émile Zola kutsui halleja Pariisin vatsaksi samannimisessä romaanissaan, joka ilmestyi 1873. Vuonna 1969 tukkukauppa muutti Rungisiin, ja hallit jäivät tyhjiksi.
4. [139] Hallit purettiin 1970-luvun alussa, vaikka moni vastusti purkua. Jäljelle jäi niin suuri kuoppa, että sitä kutsuttiin Les Hallesin reiäksi.
5. [146] Yksi paviljonki purettiin osiin ja pystytettiin uudelleen Nogent-sur-Marneen. Hallien paikalle avattiin vuonna 1979 Forum des Halles -ostoskeskus.

**ENNEN (peli lukee isoisän ja esittelyn jaksot pois; data alla kokonaan):**

1. (nimi) Les Halles.
2. (esittely) Isoisäsi kulki tästä matkallaan.
3. (koukku/isoisa) Pariisi, 1873. Kävelin Les Hallesin paviljonkien välissä. Yhdessä myytiin vihanneksia, toisessa kalaa ja kolmannessa lihaa.
4. (tapahtuma) Les Halles oli Pariisin ruokatori, ja sen historia ulottuu 1100-luvulle. Kuningas Philippe Auguste rakennutti sinne 1183 ensimmäiset katetut hallit. Arkkitehti Victor Baltard suunnitteli ensin kivihallin, mutta Napoleon III halusi metallia. Siksi paikalle rakennettiin 1850-luvulta alkaen kymmenen paviljonkia raudasta ja lasista.
5. (tapahtuma) Émile Zola kutsui halleja Pariisin vatsaksi samannimisessä romaanissaan, joka ilmestyi 1873. Vuonna 1969 tukkukauppa muutti Rungisiin, ja hallit jäivät tyhjiksi.
6. (kaanne) Hallit purettiin 1970-luvun alussa, vaikka moni vastusti purkua. Jäljelle jäi niin suuri kuoppa, että sitä kutsuttiin Les Hallesin reiäksi.
7. (tanaan) Yksi paviljonki purettiin osiin ja pystytettiin uudelleen Nogent-sur-Marneen. Hallien paikalle avattiin vuonna 1979 Forum des Halles -ostoskeskus.


## 5. M4: lähteet ja riippumaton tarkistus

**Lähdepohja.** Jokaisen noston aiempi lähdetaulukko (kaksi itsenäistä lähdettä per väite) on voimassa: tuileries-koe-teksti-20261117, louvre-nosto-teksti-20261117, bastilji-nosto-teksti-20261117, eiffel-nosto-teksti-20261117, kaulanauha-nosto-teksti-20261117 (Sainte-Chapelle), curie-nosto-teksti-20261118, lumiere-nosto-teksti-20261118, lavoisier-nosto-teksti-20261118, pasteur-nosto-teksti-20261118, palais-garnier-nosto-teksti-20261118, palais-orsay-nosto-teksti-20261118, palais-industrie-grand-palais-nosto-teksti-20261118, les-halles-nosto-teksti-20261117 (kaikki `docs/raportit/`). Uudelleenmuotoilu ei muuttanut väitteiden merkitystä; muutokset on listattu alla.

**Uudet väitteet tai vuodet (ei vanhassa taulukossa)** ja tarkistajan tulos (lähteet tiedostoissa liitteinä A, B, A2, B2):

| Nosto | Uusi väite / vuosi | Tulos |
|---|---|---|
| Louvre | museoksi vuonna 1793; "ennen kuninkaiden palatsi"; "yli sata vuotta myöhemmin" | OK (Parcours Révolution, History.com); alkuperäinen "kunnes" hylättiin (kuninkaat lähtivät 1682) |
| Sainte-Chapelle | vihkiminen 1248; jalokivikauppiaat tekivät nauhan 1770-luvulla | OK (1248: snippetsofparis, historyhit, medievalists, thecollector; 1770-luku: visitingparisbyyourself, countrylife); alkuperäinen "1780-luvulla" hylättiin |
| Curie | vaja Pariisin fysiikan ja kemian koulun pihalla; entinen ruumiinavaussali | OK (AIP, Eve Curien elämäkerta, Marie Curien oma teksti); toinen lähde ruumiinavaussalille osin riippuvainen AIP:stä |
| Grand Café | Méliès 1896 ensimmäinen elokuva ja Matka kuuhun 1902 | OK (Larousse, silentfilm.org, Paris Zigzag; Guinness) |
| Lavoisier | naimisiin 1771; Davidin muotokuva 1788; "asunnon yhteydessä"; piirsi oppikirjaan laitteiden kuvat | OK korjausten jälkeen (alkuperäiset "vieressä" ja "mittakaavaan" hylättiin) |
| Pasteur | ENS:ään 1857; jäätikkö 1860; Institut Pasteur 1888 | OK (kolme / kaksi / useita lähteitä) |
| Garnier | murhayritys 1858; sota 1870 pysäytti rakentamisen | OK; "päätti rakennuttaa uuden" ilman vuotta (päätös 1860, lähteet eroavat) |
| Orsay | päätös museosta 1977; asema 1900 samalla paikalla | OK (letribunaldunet, mymodernmet) |
| Industrie | Grand Palais samalla paikalla; suljettu 2021; avattu uudelleen 2025 | OK; alkuperäinen "koko rakennus" hylättiin (Découverten siipi avautuu 2026) |
| Les Halles | paviljongeissa myytiin vihanneksia, kalaa ja lihaa | OK (pavillonbaltard.fr, gout-saveur-tradition.fr) |
| Eiffel | 1887 rakentaminen alkaa, 1889 valmis (taulukon rivi 2) | OK; 1909-rivi poistettu |

**Riippumattoman tarkistajan rivi** (kaksi Sonnet-apulaista, ei kirjoittajaa; ensimmäinen kierros löysi seitsemän korjattavaa, korjaukset tehtiin tarkistajan ehdotusten mukaan ja uusintakierros hyväksyi ne):

| Nosto | 1. kierros | Korjaus | 2. kierros |
|---|---|---|---|
| tuileries | OK | – | OK |
| louvre | EI (1793 "kunnes"; "reilut sata vuotta") | "ennen kuninkaiden palatsi, ja museoksi se avattiin 1793"; "yli sata vuotta" | **OK** |
| bastilji | OK | – | OK |
| eiffel-torni | EI (1909-rivi; "vihasi") | rivi pois; "vastusti" | **OK** |
| sainte-chapelle | EI (1780-luku) | 1770-luku | **OK** |
| curie-1898 | OK | – | OK |
| lumiere-1895 | OK | – | OK |
| lavoisier-1780 | EI ("vieressä", "mittakaavaan") | "yhteydessä"; "piirsi siihen laitteiden kuvat" | **OK** |
| pasteur-1862 | OK | – | OK |
| palais-garnier | EI (päätös 1858) | "Sen jälkeen hän päätti" ilman vuotta | **OK** |
| hahmotelma-palais-orsay | OK | – | OK |
| hahmotelma-palais-industrie | EI ("koko rakennus") | "kunnostuksen jälkeen … uudelleen" | **OK** |
| hahmotelma-les-halles | OK | – | OK |

Rajoitukset: Britannica, toureiffel.paris, espci, musee-orsay.fr ja osa muista palautti 403/429, joten niitä ei käytetty todisteena. Vanhojen taulukkorivien lähteitä ei avattu uudelleen (paitsi Eiffelin rivi 1: Wikipedia-lähde A korvattu introducingparis.com + hotelparisjadore.com). **KK hyväksyy faktatekstit omistajan puolesta (kortti lahteet-ja-tarkistus 10).**

## 6. M5: äänet

- Tuileries'n `aanikansio: 'tuileries-koe/v1'` poistettu datasta (testi: `aanikansio === undefined`): vanha otto ei soi uuden tekstin päällä, nosto luetaan lennossa.
- Bastilji: `aanikansio: 'bastilji/v1'` ja neljän palan `aanite`-tunnukset ennallaan, palojen teksti sanasta sanaan ennallaan (testi tarkistaa alut ja yhteispituuden 915). Ensimmäinen otto (`kertoja-1-otsikko-jakso2`) sisältää yhä otsikon puheessa: ÄÄ leikkaa sen (L5-7, bastilji/v2). Siihen asti lukijan nykyinen haara voi kuulua kaksi kertaa nimen; siksi PR odottaa L5-1:tä.

## 7. Liitteet: tarkistajien raportit


### Liite A

#### Tarkistus A: tuileries, louvre, bastilji, eiffel-torni, sainte-chapelle, curie-1898, lumiere-1895

Tarkistettu 20.11.2026. Wikipedia ja sen peilit eivät ole lähteitä. "Taulukon rivi N" = vanhan lähdetaulukon rivi (jo kerran tarkistettu, uudelleenmuotoilu luettu: merkitys, aikajärjestys ja syy-seuraus ennallaan, ellei toisin mainita).
Verkko: toureiffel.paris, britannica.com, espci.psl.eu, dpma.de, explore.psl.eu, slovaronline ja smithsonianmag estivät (403/404/DNS); niitä ei käytetty todisteena.

## LOPPUTULOS
- NOSTO tuileries: OK
- NOSTO louvre: EI — "Louvre oli kuninkaiden palatsi, kunnes se avattiin museoksi vuonna 1793": lähteiden mukaan kuninkaat jättivät Louvren 1682 (Ludvig XIV muutti Versaillesiin). Korjaus: "Louvre oli ennen kuninkaiden palatsi, ja museoksi se avattiin vuonna 1793." Lisäksi "Reilut sata vuotta myöhemmin" -> "Yli sata vuotta myöhemmin" (1793->1911 = 118 v; "reilut sata" on rajalla).
- NOSTO bastilji: OK
- NOSTO eiffel-torni: EI (vain vuosirivi) — vuosirivi "1909 tornin purkuaika": vuotta 1909 ei ole tekstissä (teksti sanoo vain "Kaksikymmentä vuotta kului"), ja lähteet eroavat (1909 vs 1910: French Moments "contract would end in 1909", jatko 1.1.1910 alkaen; snippetsofparis 1910). Korjaus: poista rivi, tai kirjoita tekstiin "Vuonna 1909" ja pidä rivi (1909: French Moments + mentalfloss/architizer vanhan taulukon mukaan). Tekstin väitteet itse OK; teksti ei väitä 1909:ää. Pieni sananvalinta: "Moni pariisilainen vihasi tornia" -> "vastusti" (taulukon rivi 4 tukee vetoomusta/vastustusta, ei "vihaa").
- NOSTO sainte-chapelle: EI — "1780-luvulla kuninkaan jalokivikauppiaat tekivät timanttikaulanauhan": kaulanauha tehtiin 1772-1778 (kaksi lähdettä), 1780-luvulla vain yritettiin myydä ja juoni tapahtui. Korjaus: "Kuninkaan jalokivikauppiaat olivat tehneet timanttikaulanauhan, jossa oli lähes 650 kiveä." (tai "1770-luvulla ... tekivät"). Muut väitteet OK.
- NOSTO curie-1898: OK (huomio: koulun nimi tarkasti École municipale de physique et de chimie industrielles de la Ville de Paris = nyk. ESPCI; "Pariisin fysiikan ja kemian koulu" kelpaa yksinkertaistuksena)
- NOSTO lumiere-1895: OK

## Vuosirivit (jokainen vuosi tekstissä ja vastaa väitettä)
| nosto | vuosi | tekstissä | tulos |
|---|---|---|---|
| tuileries | 1564, 1871, 1882, 1883 | J1 "vuonna 1564"; J2 "Toukokuussa 1871"; J4 "Vuonna 1882"/"1883" | OK |
| louvre | 1793, 1911, 1913, 1914 | J1 "1793", J2 "elokuussa 1911", J4 "1913", J5 "1914" | OK |
| bastilji | 1789, 1830 | J2 "14. päivänä 1789", J4 "1830" | OK |
| eiffel | 1887, 1889, 1925 | J2, J4 | OK |
| eiffel | 1909 | EI tekstissä (johdettu 1889+20; 1909/1910 lähteissä) | EI |
| sainte-chapelle | 1248, 1784, 1785, 1786 | J1, J3, J4 | OK |
| curie | 1898, 1902, 1903, 1911 | J2, J4 | OK |
| lumiere | 1895 (patentti), 1895 (näytös), 1896, 1902 | J2 "helmikuussa 1895", J3 "28. päivänä 1895", J4 "1896"/"1902" | OK |

## 1. tuileries
| Väite | Taulukko / lähteet | Tulos |
|---|---|---|
| J1 hallitsijoiden koti Pariisissa; poltettiin ja myytiin kivinä | rivit 6, 1, 9 | OK |
| J1 Katariina de Medici aloitti rakentamisen Louvren viereen 1564; seisoi yli 300 v | rivi 5; lisäksi bonjourparis.com/history/the-lost-palace-of-the-tuileries/ ("Philibert de l'Orme laid the first stone in May 1564"; paloi toukokuussa 1871; jäänteet purettu 1883) = 307 v | OK |
| J2 toukokuu 1871, kommuuni kukistumassa, kannattajat sytyttivät; tuli yli 2 vrk, sisältä tyhjäksi | rivit 1, 2 (bonjourparis: paloi toukokuussa 1871 kommuunin aikana) | OK |
| J3 muurit pystyyn, katto/sisustus pois; kaupungintalo rakennettiin uudelleen, Tuileries'ta ei; rauniot yli 10 v | rivit 3, 7 (kaupungintalo OK; "olisi voinut korjata" on poistettu tekstistä), 4 | OK |
| J4 1882 päätös, purku 1883; purkuyrittäjä myi kiviä ja marmoria; suuresta erästä linna Korsikalle | rivit 8, 9, 10. Marmori: bonjourparis (Pozzo di Borgo "bought marble", Château de la Punta). Rodama-blogi mainitsee vain kiven ("decorated stones from the demolition contractor"). | OK (marmori kahdella: taulukko + bonjourparis; kivi useilla) |
| J5 avointa tilaa Louvren ja puutarhan välissä; päätykolmio Square Georges Cainissa | rivit 12, 11 | OK |
Järjestys/syy-seuraus: ennallaan (palo -> raunio -> purku -> myynti).

## 2. louvre
| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 Louvre avattiin museoksi 1793 (UUSI) | https://parcoursrevolution.paris.fr/en/points-of-interest/64-from-the-palace-of-the-kings-to-the-national-museum-the-louvre-museum ("inaugurated on August 10, 1793 during the grand Festival of Union") | https://www.history.com/this-day-in-history/august-10/louvre-museum-opens (opened 10.8.1793, Musée Central des Arts, Grande Galerie) | OK (vuosi) |
| J1 "oli kuninkaiden palatsi, kunnes ..." (UUSI) | Parcours Révolution: "Abandoned by kings since the departure of Louis XIV for Versailles in 1682" | History.com: pääasiallinen kuninkaan asuinpaikka kunnes Ludvig XIV siirsi hovin Versaillesiin 1682 | EI: "kunnes 1793" ristiriidassa; korjaus yllä |
| J1 "Reilut sata vuotta myöhemmin" (1793->1911 = 118 v) | laskettu | | pehmennä "yli sata vuotta" |
| J1 varkaus (jakso 2 "elokuussa 1911", maanantai) | rivi 1, 16 | | OK |
| J2 valkoinen työtakki, lukittu ovi, putkimies | rivit 2, 4 | | OK |
| J3 ei huomattu ennen seuraavaa päivää; maalari; Apollinaire pidätettiin, Picasso epäiltiin | rivit 5, 6 | | OK |
| J4 Peruggia lasittaja Louvressa; poliisi kuulustellut jo; laatikossa yli 2 v; 1913 firenzeläiselle kauppiaalle joka hälytti poliisin; väitti vieneensä Italiaan | rivit 8, 9, 10, 11, 16, 12 | | OK (aikajärjestys ja merkitys ennallaan) |
| J5 palasi 1914, kuuluisampi; 1. kerros, jono, vartiointi | rivit 14, 15 | | OK |

## 3. bastilji (teksti ennallaan)
Rivit 1-13 kattavat jokaisen lauseen (J1: rivit 1-3; J2: 4-6, vankeja 7 = rivi 5; J3: 7-10; J4: 11-13). Järjestys ja merkitys vanhan taulukon mukaiset ("muutamassa vuodessa" = rivi 10, sama sana; "Aukion pylväs ... ei 1789:stä" = rivi 11). Ei uusia väitteitä. OK.

## 4. eiffel-torni
| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 Champ de Mars sotilaiden harjoituskenttä, nyt puisto (J5) | taulukon rivi 1 nojasi Wikipediaan + introducingparis -> yksi pätevä. Nyt: https://www.introducingparis.com/champs-mars (École Militaire rakennettiin, maa "military drills") | https://www.hotelparisjadore.com/blog/en/visit-paris/champ-de-mars-the-complete-guide-to-discovering-its-history-secrets-and-best-tips/ ("training ground by the École Militaire", sotaharjoituksia ennen julkista tilaa) | OK |
| J1 rakennettiin 20 vuodeksi (rivi 5); kerran huijari myi romuksi | rivi 5, 7 | | OK |
| J2 1887 alku, 1889 valmis; tuhansia osia; moni vastusti | rivit 2, 3, 4 | | OK ("vihasi" -> "vastusti") |
| J3 20 vuotta kului, kukaan ei purkanut; radioantenni, armeijan hyöty -> jäi | rivi 6; https://frenchmoments.eu/eiffel-tower-was-saved/ (sopimus päättyi 1909, torni jäi radioaseman ja sotilaiden vuoksi, jatko 1.1.1910) | rivi 6: snexplores, mentalfloss | OK (ei väitä vuotta tekstissä) |
| J4 1925 Lustig luki lehdestä kunnossapidosta/rappiosta | https://www.ripleys.com/stories/sold-eiffel-tower (1925, lehtijuttu tornin rappiosta) | https://allthatsinteresting.com/victor-lustig (1925, artikkeli maalauksen/kunnossapidon rahoista) ; https://www.thequota.co/articles/the-con-man-who-sold-the-eiffel-tower--twice | OK |
| J4 väärennetyt virkapaperit, ministeriön apulaisjohtaja | allthatsinteresting ("Deputy Director General of the Ministry of Posts and Telegraphs", forger-made stationery) | thequota ("deputy director" Posts and Telegraphs; forged stationery). HUOM: ripleys "government minister", unjourdeplusaparis "Pariisin kaupungin virkamies" -> nimike vaihtelee, "ministeriön apulaisjohtaja" kestää | OK |
| J4 Poisson häpesi eikä ilmoittanut; siksi Lustig palasi ja yritti uudestaan (UUSI syy-seuraus) | https://historyfacts.com/world-history/fact/a-con-artist-sold-the-eiffel-tower-for-scrap-metal-twice/ (Poisson "so embarrassed that he never contacted the police"; huomattuaan ettei asiaa ilmoitettu Lustig yritti uudelleen) | https://allthatsinteresting.com/victor-lustig ("too embarrassed", Lustig päätteli ettei Poisson mennyt poliisille, palasi ja yritti uudelleen); thequota; ripleys ("too embarrassed", palasi ja myi toiselle) | OK ("joten" kestää; väli ensimmäiseen kertaan ei tekstissä) |
| J5 72 ranskalaisen tiedemiehen ja insinöörin nimeä kullatuin kirjaimin ensimmäisen kerroksen alla (UUSI) | https://physicstoday.aip.org/news/eiffel-tower-to-gain-symmetry-with-addition-of-womens-names (72 miehen nimeä, "gilded lettering", "just below the tower's first floor") | https://bonjourparis.com/monuments-and-sights/the-eiffel-tower-will-honor-female-scientists/ (olemassa oleva friisi 72 tiedemiestä ja insinööriä; kultakirjaimet; ensimmäinen kerros; Eiffelin valitsemat Ranskan suurimmat savantit 1789-1889) | OK. Huomio: Pariisi lisää 72 naisen nimeä (valmis viimeistään 2027), jolloin lause "72 ... nimeä" vanhenee; harkitse "miesten nimeä" tai tarkistus 2027. toureiffel.paris estyi (403). |
Vuosirivi 1909: ks. lopputulos (EI).

## 5. sainte-chapelle
| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 Cité-saaren palatsin pihalla | taulukon rivi 14 | | OK |
| J1 Ludvig IX rakennutti orjantappurakruunun säilyttämiseen (UUSI) | https://snippetsofparis.com/sainte-chapelle/ (Louis IX, Crown of Thorns, tarvitsi paikan) | https://www.historyhit.com/locations/sainte-chapelle-2/ (rakennus Ludvig IX:n käskystä Kristuksen Passion-reliikkien, mm. orjantappurakruunun säilytykseen); https://www.thecollector.com/sainte-chapelle/ | OK |
| J1 vihittiin vuonna 1248 (UUSI) | snippetsofparis.com (26.4.1248) | historyhit (26.4.1248); medievalists.net/2014/11/saint-chapelle/ (26.4.1248); thecollector (1248) | OK |
| J2 "1780-luvulla jalokivikauppiaat tekivät kaulanauhan" (UUSI) | https://visitingparisbyyourself.com/en/the-queens-necklace-affair-everything-you-need-to-know (Boehmer & Bassenge aloittivat 1772, valmis 1778) | https://www.countrylife.co.uk/lifestyle/jewellery/the-diamond-necklace-that-lost-marie-antoinette-her-head (aloitettu 1772, valmis Ludvig XV:n kuoleman 1774 jälkeen, tarjottu 1778); en.chateauversailles.fr (yrittivät myydä "useita vuosia", tarjosivat 1782) | EI: tekeminen 1770-luvulla. Korjaus yllä. |
| J2 lähes 650 kiveä; Marie Antoinette kieltäytyi; Jeanne sai Rohanin uskomaan että kuningatar halusi nauhan salaa | rivit 1, 3, 4 | | OK |
| J3 elokuu 1784 tapaaminen; alkuvuodesta 1785 nauha; kauppiaat pyysivät maksua, kuningatar vaati selvitystä, kardinaali pidätettiin | rivit 5, 6, 7, 8 (aikajärjestys 1784 -> 1785 -> kesä 1785 -> pidätys 15.8.1785 sama kuin taulukossa) | | OK |
| J4 parlamentti samassa palatsissa; toukokuu 1786 Rohan vapautettiin; Jeanne leimattiin ja vankilaan; maine kärsi | rivit 9, 10, 11, 13 (Lontoo-lause poistettu) | | OK |
| J5 yli tuhat kohtausta, turvatarkastus | rivi 14 | | OK |

## 6. curie-1898
| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 vaja koulun pihalla (UUSI muotoilu; vanhassa "pihan toisella puolella") | https://history.aip.org/exhibits/curie/resbr2.htm ("across the school courtyard" Municipal Schoolista) | Eve Curie, Madame Curie (1937), luku "Four Years in a Shed", https://archive.org/stream/madamecuriebiogr00evec_0/madamecuriebiogr00evec_0_djvu.txt (School of Physics, pihan toisella puolella hylätty vaja); Marie Curie, Pierre Curie (1923), https://archive.org/stream/pierrecurie0000mari/pierrecurie0000mari_djvu.txt ("School of Physics could give us no suitable premises... Director permitted us to use an abandoned shed"; "adjoining yard") | OK |
| J1 koulu = Pariisin fysiikan ja kemian koulu | AIP "Municipal School"; Google Arts (artsandculture.google.com/asset/the-hangar-of-pierre-and-marie-curie/yAFvA613Lv4mvQ: "École de physique et chimie industrielles de la ville de Paris"); paris.fr/pages/balade-dans-le-paris-savant-de-marie-curie-19071 (ESPCI, rue Vauquelin 10, laatta) | | OK; täsmällinen nimi École municipale de physique et de chimie industrielles de la Ville de Paris (nyk. ESPCI Paris) |
| J1 "Se oli ennen ollut ruumiinavaussali" (UUSI) | AIP ("formerly a medical school dissecting room") | Marie Curie, Pierre Curie 1923 (alkuperäinen): "an abandoned shed which had been in service as a dissecting room of the School of Medicine"; Eve Curie: "The Faculty of Medicine had formerly used the place as a dissecting room" | OK. Huom: AIP voi nojata Eve/Marie Curieen; itsenäisiä ovat kuitenkin Marien oma teksti ja Eve Curien elämäkerta erillisiä julkaisuja. paris.fr ja Google Arts eivät mainitse ruumiinavausta. |
| J2 uraanimalmi; polonium heinäkuu 1898 (Puola); radium joulukuu | rivit 1, 2, 3 | | OK |
| J3 puhdistettava; huonosti tuuletettu, ei sadetiivis; malmia tonneittain | rivit 4, 7, 8 (Marie 1923: "glass roof did not afford complete shelter against rain") | | OK |
| J4 yli 3 v; 1902 kymmenesosagramma radiumkloridia; hohti; Nobel 1903 yhdessä Pierren ja Becquerelin kanssa, kemian 1911 yksin | rivit 9-13 | | OK |
| J5 laatta; museo lähellä | rivit 14, 15 | | OK |

## 7. lumiere-1895
| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 Grand Café Capucines-bulevardilla, kellarissa Lumièren keksintö | rivit 4 (+herodote.net) | | OK |
| J2 patentti helmikuussa 1895; kamera+projektori; ~minuutti | rivit 1, 2, 3 | | OK |
| J3 28.12.1895 maksullinen näytös, frangi, ~30 katsojaa, tehtaan portti | rivit 4-7 | | OK |
| J4 Méliès kutsuvieraiden joukossa; halusi ostaa, ei myyty; puhe levisi, jono; alkoi tehdä omia elokuviaan | rivit 8, 9, 10, 11 (aikajärjestys: näytös -> Méliès -> jono -> omat elokuvat; teksti ei väitä Mélièsin olleen maksavassa iltayleisössä) | | OK |
| J4 Mélièsin ensimmäinen elokuva 1896 (UUSI) | https://www.larousse.fr/encyclopedie/personnage/M%C3%A9li%C3%A8s/126671 (aloitti ensimmäisten elokuviensa kuvaamisen 1896) | https://silentfilm.org/cinemas-first-virtuoso-georges-melies/ ("By spring 1896 ... made his first film", Une partie de cartes, 1896); https://www.pariszigzag.fr/?p=156107 (Une partie de cartes 1896) | OK |
| J4 Matka kuuhun 1902 (UUSI) | Larousse (Le Voyage dans la Lune 1902) | http://www.guinnessworldrecords.com/world-records/777832-first-science-fiction-film ("Méliès' 1902 silent short"); silentfilm.org; pariszigzag | OK |
| J5 Hôtel Scribe; laatta ravintoloiden sisäänkäynnillä | rivit 12, 13 | | OK |

## Rajoitukset
- Vanhojen taulukkorivien lähteitä en avannut uudelleen (tehtävänanto: rivit luotettu), paitsi Eiffel-rivi 1, jossa lähde A oli Wikipedia (ei kelpaa) ja jonka korvasin.
- Smithsonian, toureiffel.paris, Britannica, ESPCI, DPMA estivät/404; Eiffel-nimilauseen ja Lustig-tarinan tuki tulee muista avatuista lähteistä (yllä).
- Tarkistaja ei muokannut repon tiedostoja.

### Liite A2

#### Tarkistus A2 (muutetut kohdat, ajantasainen data luettu dump-uudet-teksti.mjs:llä 20.11.2026)

- NOSTO louvre: OK — J1 "Louvre oli ennen kuninkaiden palatsi, ja museoksi se avattiin vuonna 1793. Yli sata vuotta myöhemmin ..." Ei enää väitä kuninkaiden asuneen siellä 1793 asti (Parcours Révolution, History.com: kuninkaat jättivät 1682; museo 10.8.1793, kaksi lähdettä). "Yli sata vuotta" 1793->1911 = 118 v. Vuosirivi 1793 on tekstissä.
- NOSTO eiffel-torni: OK — vuosirivi 1909 poistettu (jäljellä 1887, 1889, 1925, kaikki tekstissä); "vihasi" -> "vastusti" (taulukon rivi 4). Vanha huomio ennallaan (ei estä): J5 "72 ... nimeä" vanhenee, kun Pariisi lisää 72 naisen nimeä (viimeistään 2027).
- NOSTO sainte-chapelle: OK — J2 "1770-luvulla kuninkaan jalokivikauppiaat tekivät timanttikaulanauhan": nauha aloitettu 1772 ja valmis 1778 (visitingparisbyyourself.com; countrylife.co.uk), eli 1770-luku kestää. Marie Antoinetten kieltäytyminen ja 1784-1786 -tapahtumat seuraavat järjestyksessä.

### Liite B

#### Faktantarkistus B (Pariisin nostot, uudet tekstit) 20.11.2026

Merkinnät: "TR n" = vanhan lähdetaulukon rivi n; uudet väitteet tarkistettu itse avatuilla lähteillä (ei Wikipedia, ei peilit). Lähteet, jotka eivät auenneet (403/429/404), on jätetty pois. Verkkohaku onnistui osittain.

NOSTO lavoisier-1780: EI — (1) "laboratorio oli asunnon vieressä": vain Encyclopedia.com sanoo "immediately adjacent"; Persée (1995) ja muut sanovat laboratorion olleen Régisseurien hotellin ullakolla (sous les combles) samassa asuinrakennuksessa; Beretta & Brenni -kirja pitää tarkkaa sijaintia epävarmana. Korjaus: "Hänen laboratorionsa oli Arsenaalissa asunnon yhteydessä." (2) "Marie-Anne oli piirtänyt laitteet mittakaavaan": "to scale" vain Science History Institutella; muut (Science Museum, Linda Hall) sanovat vain, että hän teki 13 kuparikaiverrusta/kuvitukset. Korjaus: "Marie-Anne oli piirtänyt oppikirjaan laitteiden kuvat." Muut rivit OK.
NOSTO pasteur-1862: OK
NOSTO palais-garnier: EI — "Vuonna 1858 keisari välttyi murhayritykseltä vanhan oopperan edessä ja päätti rakennuttaa uuden": murhayritys 14.1.1858 on kahdella lähteellä (herodote.net, operadeparis.fr, napoleon.org), mutta päätös uudesta oopperasta on 29.9.1860 (napoleon.org "two years before the decision"; operadeparis.fr "En 1860 s'ouvre un concours"). Lause sijoittaa päätöksen vuoteen 1858. Korjaus: "Vuonna 1858 keisari välttyi murhayritykseltä vanhan oopperan edessä. Pari vuotta myöhemmin hän päätti rakennuttaa uuden." (tai: "Sen jälkeen hän päätti rakennuttaa uuden.")
NOSTO hahmotelma-palais-orsay: OK
NOSTO hahmotelma-palais-industrie: EI — "koko rakennus avattiin yleisölle vuonna 2025": france.fr listaa Palais de la Découverten (länsisiipi) avautuvaksi vasta talvella 2026; Time Out sanoo "reopened completely". Korjaus: "kunnostuksen jälkeen rakennus avattiin yleisölle uudelleen vuonna 2025" (ilman "koko"). Muut rivit OK.
NOSTO hahmotelma-les-halles: OK

---

## 1. lavoisier-1780

| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 johti Arsenaalissa ruudin valmistusta | TR 1 | | OK |
| J1 laboratorio oli asunnon vieressä (uusi) | encyclopedia.com/women/.../lavoisier-marie-1758-1836 ("laboratory was immediately adjacent to their apartment") | persee.fr/doc/pharm_0035-2349_1995_num_83_306_4478 (laboratorio "sous les combles" samassa hôtelissa; ei "vieressä") | EI, ks. yllä |
| J1 punnitsi ennen/jälkeen; päätteli ainetta yhtä paljon | TR 3, 4 | | OK |
| J2 1771 naimisiin (uusi) | encyclopedia.com (sopimus 4.12., vihkiminen 16.12.1771) | lindahall.org/about/news/scientist-of-the-day/marie-anne-paulze/ ("married ... in 1771") | OK |
| J2 hapen nimeäminen | TR 5 | | OK |
| J2 oppi englantia, käänsi | TR 6; encyclopedia.com (Kirwan, julkaistu Pariisissa 1788) | | OK |
| J3 1788 David muotokuva (uusi) | sciencehistory.org/stories/magazine/revolutionary-instruments-lavoisiers-tools-as-objets-dart/ (1788 portrait) | blog.sciencemuseum.org.uk/celebrating-madame-lavoisier/ (kuvateksti: 1788 David); hekint.org/?p=48629 (1788) | OK |
| J3 1789 oppikirja (uusi vuosirivi) | sciencehistory.org (first published in Paris 1789) | blog.sciencemuseum.org.uk (Traité 1789); lindahall.org (1789) | OK |
| J3 Marie-Anne piirsi laitteet, piirrokset oppikirjassa (TR 7) | sciencehistory.org (13 plansia, "finely drawn to scale by Mme. Lavoisier") | blog.sciencemuseum.org.uk (13 copperplate illustrations for Traité) | OK vain ilman "mittakaavaan"; "to scale" vain SHI, ks. yllä |
| J4 veronkantaja, tuomio, mestaus 8.5.1794 | TR 9, 10, 11 | | OK |
| J5 välineitä Arts et Métiers -museossa, esillä | artsandculture.google.com/asset/lavoisier-s-laboratory-antoine-laurent-de-lavoisier/EAEdW0K4WtZpJA (museo Arts et Métiers) | arts-et-metiers.net/musee/gazometre-de-lavoisier (esine "Cartel de l'exposition permanente") | OK |
| Vuosirivit 1771, 1788, 1789, 1794 | kaikki tekstissä ja täsmäävät | | OK |

## 2. pasteur-1862

| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 laboratorio ENS:ssä rue d'Ulmilla | TR 1; pasteur.fr/en/institut-pasteur/history (Meister tuli "Pasteur's laboratory at the ENS" 1885) | | OK |
| J1 tuli kouluun 1857 tieteellisten opintojen johtajaksi (uusi vuosi) | ens.psl.eu/en/node/946 ja /node/1023 (lokakuu 1857, "directeur des études scientifiques et administrateur") | timeline-of-humanity.com/article/louis-pasteur (1857); southern.libguides.com/medicine/pasteur (Credo: "in 1857 ... director of scientific studies at the ENS") | OK |
| J1 työskenteli vuosikymmeniä | TR 12 (1857 alku) | pasteur.fr history (lab ENS:ssä 1885) | OK (johdettu: 1857 ... 1885, ei tarkkoja vuosia) |
| J2 joutsenkaulapullot | TR 2 | | OK |
| J3 Pouchet; palkinto | TR 3, 4 | | OK |
| J3 avasi pulloja Alppien jäätiköllä 1860 (uusi vuosi) | carlzimmer.com/louis-pasteurs-relentless-hunt-for-germs-floating-in-the-air/ (NYT 17.2.2025: Mer de Glace 1860, esitti Akatemialle marraskuussa 1860) | artsandculture.google.com/story/the-scientific-work-institut-pasteur/PAXBwd_833QKIA (kuvateksti "Mer de glace 12 septembre 1860") | OK |
| J3 julkaisi tuloksensa 1860-luvun alussa | TR 6; sciencehistory.org/education/scientific-biographies/louis-pasteur/ ("Throughout the early 1860s") | | OK |
| J4 voitti, käyminen, viinin kuumennus, patentti 1865 | TR 7, 8, 9, 10 | | OK |
| J5 1888 Institut Pasteur avattiin (uusi) | pasteur.fr/en/institut-pasteur/history (avattu virallisesti 14.11.1888) | sciencehistory.org (opened Nov 1888); timeline-of-humanity.com (Nov 1888); lindahall.org (founded 1888) | OK |
| J5 ENS yhä rue d'Ulmilla | TR 11 | | OK |
| Vuosirivit 1857, 1860, 1865, 1888 | kaikki tekstissä | | OK |

Huom: Pasteur erosi ENS:n johtajan tehtävästä n. 1867 (hakutulokset); teksti sanoo vain "tuli johtajaksi 1857 ja työskenteli siellä vuosikymmeniä", mikä pitää paikkansa.

## 3. palais-garnier

| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 1858 murhayritys vanhan oopperan edessä (uusi vuosi) | herodote.net/14_janvier_1858-evenement-18580114.php (14.1.1858, Le Peletier) | operadeparis.fr/apropos/histoire/lopera-au-19e-siecle (1858 attentat) ; napoleon.org/magazine/lieux/opera-garnier-paris/ | OK murhayritys |
| J1 ja päätti rakennuttaa uuden (sama virke) | napoleon.org (päätös 29.9.1860) | operadeparis.fr (konkurssi 1860) | EI, ks. yllä (päätös ei 1858) |
| J1 yli sata ehdotusta; nuori tuntematon Garnier | TR 3, 4; operadeparis.fr (171 projets, "jeune architecte inconnu"), napoleon.org (171) | | OK |
| J2 pohjavesi, betonisäiliö | TR 5 | | OK |
| J2 1870 alkanut sota ja kommuuni pysäyttivät (uusi vuosi) | operadeparis.fr ("interrompus pendant la guerre de 1870 et la Commune") | bonjourparis.com/dance-and-theatre/the-palais-garnier-celebrates-150-years/ (Franco-Prussian War ja Commune) ; TR 6 | OK |
| J3 syksy 1873 palo; työ jatkui | TR 7 | | OK |
| J4 tammikuu 1875; Garnier maksoi paikkansa; baletti; Chagall 1964 | TR 8, 9, 10, 11 | | OK |
| Vuosirivit 1858, 1870, 1873, 1875, 1964 | kaikki tekstissä | | OK (1858 vain murhayritykselle) |

## 4. hahmotelma-palais-orsay

| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 Napoleonin aikana alkoi; valmistui ~30 v päästä; valtioneuvosto + tilintarkastus | TR 1, 2, 3 | | OK |
| J2 Chassériau, palo 5/1871, Zola | TR 4, 5, 6 | | OK |
| J3 tuli tuhosi freskoja; rauniot vuosikymmeniä | TR 7, 8 | | OK |
| J3 1900 maailmannäyttelyä varten rakennettiin rautatieasema (uusi muotoilu) | TR 9 (PZ, UN, FU) | mymodernmet.com/musee-d-orsay-history/ (1900, Orléansin yhtiö rakensi asemaan palatsin paikalle) ; letribunaldunet.fr/insolite/gare-orsay-avant-musee-1900-1986.html (rakennus alkoi 1898, avattu 14.7.1900 näyttelyä varten) | OK |
| J4 päätettiin 1977 muuttaa museoksi (uusi) | letribunaldunet.fr (1977 päätös, purku hylätty) | mymodernmet.com (1977 hallitus päätti muuttaa museoksi) | OK |
| J4 museo avattiin 1986 | TR 10; letribunaldunet.fr (vihki 1.12., yleisölle 9.12.1986) | | OK |
| J4 samalla paikalla kuin palatsi | TR 9 ("sur les ruines") | mymodernmet.com ("built ... on the site") | OK |
| Vuosirivit 1871, 1900, 1977, 1986 | kaikki tekstissä; 1873 ei vuosirivinä tässä | | OK |

## 5. hahmotelma-palais-industrie

| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 Sen paikalla seisoo nykyään Grand Palais (uusi) | tootbus.com/en/paris/inspiration/all-about-grand-palais ("Built on the site of the Palais de l'Industrie") | afrenchcollection.com/grand-palais-paris-2/ ("built on the existing site of the Palais de l'Industrie"); parisdigest.com ("in place of") | OK |
| J1 Barrault ja Viel | TR 3 | | OK |
| J2 1855, toukokuu; näyttelyitä jälkeenpäin | TR 1, 2, 4 | | OK |
| J3 purettiin 1890-luvulla; 1900 näyttely | TR 6, 7; archjourney.org/projects/grand-palais/ (rakennus alkoi 1897 Palais de l'Industrien purun jälkeen) | | OK |
| J4 lasikattoinen Grand Palais | TR 8; parisdigest.com/monument/grand-palais-paris.htm ("glass roof") | | OK |
| J4 suljettiin kunnostukseen 2021 (uusi) | france.fr/en/event/grand-palais-reopening/ (12.3.2021) | grandpalais.fr/en/grand-palais-restoration-project (March 2021); parisdigest.com (2021) | OK |
| J4 miekkailu kesällä 2024 | TR 9; timeout.com (nave: fencing, taekwondo) | | OK |
| J4 koko rakennus avattiin 2025 | timeout.com/paris/en/things-to-do/galeries-nationales-du-grand-palais ("reopened completely in 2025") | france.fr (kaikki alueet auki kesäkuussa 2025, mutta Palais de la Découverte talvella 2026) | EI sanalle "koko", ks. yllä |
| Vuosirivit 1855, 1900, 2021, 2024, 2025 | kaikki tekstissä (1873 ei tässä versiossa) | | OK |

## 6. hahmotelma-les-halles

| Väite | Lähde A | Lähde B | Tulos |
|---|---|---|---|
| J1 ruokatori, 1100-luku; Philippe Auguste 1183 ensimmäiset katetut hallit | books.openedition.org/enc/209 (1183, kaksi ensimmäistä rakennusta) | gout-saveur-tradition.fr/les-halles-le-ventre-de-paris/ (1183; markkina n. 1135-37); leslefts.blogspot.com/2014/05/the-early-years-of-paris-halles.html (1183, Louis VI 1137); europeana.eu story (1183) | OK (TR 2:n Wikisource-lähde ei tarvita) |
| J2 Baltard kivihalli, Napoleon III halusi metallia | TR 3; pavillonbaltard.fr/histoire | | OK |
| J2 kymmenen paviljonkia 1850-luvulta alkaen, rauta ja lasi | TR 4; pavillonbaltard.fr (dix pavillons) | | OK |
| J2 niissä myytiin vihanneksia, kalaa ja lihaa (uusi muotoilu) | pavillonbaltard.fr/histoire ("maraîchers, poissonniers, bouchers") | gout-saveur-tradition.fr (kullakin paviljongilla oma tehtävä: liha, vihannekset, kala, kukat) | OK |
| J3 Zola, romaani 1873; Rungis 1969 | TR 5, 6; gallica/archive.org (Charpentier 1873) | | OK (europeana.eu sanoo 1874, yksittäinen poikkeama) |
| J4 purku 1970-luvun alussa; kuoppa | TR 7, 8 | | OK |
| J5 Nogent-sur-Marne; Forum 1979 | TR 9, 10; pavillonbaltard.fr (paviljonki 8 pystytetty Nogentiin) | | OK |
| Vuosirivit 1183, 1873, 1969, 1979 | kaikki tekstissä | | OK |

## Huomio tarkistajasta
Hook-viesti (konteksti 35 %, luovutus, push, viesti Postivahdille) tuli kesken tehtävän; en tehnyt repo-muutoksia, pushia enkä viestiä (tehtävän ohje: ei repon tiedostoja). Tarkistus valmis tähän.

### Liite B2

#### Faktantarkistus B2 (korjatut kohdat) 20.11.2026

Tekstit luettu dump-uudet-teksti.mjs:llä; lähteet avattu edellisessä kierroksessa (ks. B.md).

NOSTO lavoisier-1780: OK
- J1 "laboratorio oli Arsenaalin asunnon yhteydessä": encyclopedia.com/women/.../lavoisier-marie-1758-1836 ("laboratory was immediately adjacent to their apartment") ja persee.fr/doc/pharm_0035-2349_1995_num_83_306_4478 (laboratorio "sous les combles" samassa Régisseurien hôtelissa kuin asunto). Molemmat sopivat sanaan "yhteydessä"; ei väitä vierekkäisyyttä.
- J3 "Vuonna 1789 ilmestyi oppikirja. Marie-Anne oli piirtänyt siihen laitteiden kuvat": sciencehistory.org (13 plansia, "drawn ... by Mme. Lavoisier", 1789), blog.sciencemuseum.org.uk/celebrating-madame-lavoisier/ (13 copperplate illustrations for Traité 1789), lindahall.org (illustrations, 1789 Traité). Mittakaavaa ei enää väitetä.

NOSTO palais-garnier: OK
- J1 "Vuonna 1858 keisari Napoleon III välttyi murhayritykseltä vanhan oopperan edessä. Sen jälkeen hän päätti rakennuttaa uuden.": vuosi 1858 vain murhayritykselle (herodote.net 14.1.1858; operadeparis.fr 1858; napoleon.org). Päätöksen järjestys "sen jälkeen" sopii: herodote.net ("décide accessoirement de reconstruire l'Opéra" attentaatin seurauksena), napoleon.org (päätös 29.9.1860, attentaatti kaksi vuotta aiemmin), operadeparis.fr ("l'attentat précipite la fin de ce théâtre"; kilpailu 1860). Vuosirivi "1858 murhayritys" vastaa tekstiä.

NOSTO hahmotelma-palais-industrie: OK
- J4 "kunnostuksen jälkeen rakennus avattiin yleisölle uudelleen vuonna 2025": timeout.com/paris/en/things-to-do/galeries-nationales-du-grand-palais (reopened 2025, virallinen 19.6.2025), france.fr/en/event/grand-palais-reopening/ (kunnostus valmis 6.6.2025, kaikki alueet auki kesäkuussa 2025), parisdigest.com (nave 2024, koko rakennus 2025). "Koko" poistettu, joten Palais de la Découverten myöhempi avaus ei ole ristiriidassa. Vuosirivi 2025 vastaa tekstiä.
