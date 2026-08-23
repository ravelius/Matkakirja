# Quito — faktakoostaja, uusi kaupunkilehti

Lauta-id `southamerica`, kaupunki-id `quito`, en-Wikipedia "Quito". Kaikki
tiedot haettu en-Wikipediasta 23.8.2026 (action=raw ja
`action=query&prop=coordinates`, NODE_USE_ENV_PROXY=1; muutama kutsu
vastasi 429/404:llä, uusinta 1,5–2 s kasvavalla viiveellä korjasi kaikki
paitsi hakusanan "Historic Centre of Quito", joka ei ole oma
en-Wikipedia-artikkeli — aihe on katettu "Quito"-artikkelin omissa
osioissa "Points of interest § Historic center" ja "History"). Redirect
seurattu: "French Geodesic Mission" → "French Geodesic Mission to the
Equator". Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md`, `docs/moduulit/
kaupunkilehti.md` ja `docs/mantereet-tyoaineisto/spec-mantereet.md`,
esimerkkinä `docs/mantereet-tyoaineisto/faktapohja-vancouver.md`.
Kaupungin visa on tarkistettu tiedostosta
`js/packs/southamerica-questions.js` (kohta `quito`, viisi kysymystä:
Ecuadorin pääkaupunki, päiväntasaajan tasapituiset päivät, 2 850 metrin
korkeus, Unescon ensimmäisiä maailmanperintökohteita 1978, Cotopaxi
tulivuori) — nämä aiheet (korkeus, päiväntasaaja, Unesco, Cotopaxi)
esiintyvät myös tässä faktapohjassa oleellisina osina kaupungin
tarinaa, mutta jokaisessa kohdassa on käytetty tarkempia lukuja tai eri
näkökulmaa kuin visan lyhyt vastaus (ks. osio 7, kohta 1).

Toimeksiannon painotus (1873 ja nykyaika, vanhankaupungin
rakennushistoria, ranskalainen astemittausretkikunta) on kannellut
poikkeuksellisen hyvin: Quiton oma tähtitieteellinen observatorio
avattiin **täsmälleen vuonna 1873**, ja Cotopaxin toinen onnistunut
huipentuma tapahtui **täsmälleen samana vuonna** — molemmat ovat oma
teemasivunsa nostoina (osio 2, sivu `tiede`). Sisältölinjaus (toimek-
sianto): kichwat ja muut alkuperäiskansat esiintyvät nykyisinä kansoina
(El Ejido -puiston otavaleño-käsityöläismarkkinat, osio 3, jakso 3;
Commons-kategoriavinkit, osio 6), siirtomaa-aika kerrotaan neutraalina
historiana, ei köyhyyden estetisointia eikä nykypolitiikkaa.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Quito"

**Johdanto (251 merkkiä):**

> Andien rinteillä päiväntasaajan tuntumassa kohoaa maailman ylin
> pääkaupunki: Quito on lähes 2 850 metrissä Pichincha-tulivuoren
> kupeessa. Espanjalaiset perustivat sen 1534, ja vanhakaupunki oli
> 1978 yksi Unescon ensimmäisistä maailmanperintökohteista.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Vakioaihe (`AIHE_IKONIT`-listalla on valmis
historia-aihe, ei siis vaadi omaa ikonia). Quiton aineisto kantaa hyvin
oman sivunsa: inkavalloituksesta espanjalaisten kirkonrakennusbuumin
kautta itsenäisyyteen ja tasavallan ensimmäisiin instituutioihin —
neljä nostoa riittävät vain pintaraapaisuun, joten `historia`-sivu
jatkaa kaupunkisivun tarinaa syvemmälle.

**Johdanto (224 merkkiä):**

> Espanjalaiset rakensivat inkojen valtaaman kaupungin päälle uuden
> Quiton, jonka kirkot nousivat vuosisadan aikana toisensa perään.
> Itsenäisyys ratkesi 1822 Pichinchan rinteillä, ja tasavalta toi pian
> myös oman observatorion.

### Sivu C — teemasivu, ehdotettu id `tiede`, nimi "Tiede"

**Perustelu valinnalle:** Vakioaihe (`AIHE_IKONIT`-listalla on valmis
tiede-aihe). Tämä on toimeksiannon "ranskalainen astemittausretkikunta"
-painotuksen luonteva koti: 1700-luvun retkikunta, sen peruja oleva
metrijärjestelmä, Cotopaxin kiipeilyhistoria ja vuoden 1873 observatorio
liittyvät kaikki samaan tiedeperinteeseen eivätkä istu `historia`-
sivulle ilman että se paisuisi liikaa.

**Johdanto (216 merkkiä):**

> Quito tunnetaan korkeutensa lisäksi tieteestä: 1700-luvun
> ranskalais-espanjalainen retkikunta mittasi täältä maapallon muodon,
> ja sen perintö näkyy yhä kaupungin observatoriossa ja naapurivuorten
> kiipeilyhistoriassa.

---

## 2. Kaksitoista nostoehdotusta (4 + 4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto QC1 — "Kaupunki jonka inkat valtasivat ja espanjalaiset perustivat uudelleen" (521 merkkiä)**

> Alkuperäinen Quitu-kansa asutti seutua vuosisatoja, kunnes
> inkakeisari Huayna Capac valloitti sen 1400-luvun lopulla ja teki
> siitä valtakuntansa pohjoisen alueen pääkaupungin. Espanjalainen
> Sebastián de Benalcázar perusti nykyisen kaupungin uudelleen 6.
> joulukuuta 1534 kaksisadanneljän siirtolaisen kanssa ja vangitsi
> inkasotapäällikkö Rumiñahuin, joka teloitettiin tammikuussa 1535.
> Koska espanjalaisten valloitus lasketaan kaupungin viralliseksi
> perustamiseksi, Quito tunnetaan Etelä-Amerikan vanhimpana
> pääkaupunkina.

Faktat ja lähteet:
- Quitu-kansa alueen alkuperäisasukkaina; inkakeisari Huayna Capac
  valloitti heidät 1400-luvun lopulla ja teki Quitosta valtakuntansa
  pohjoisen alueen pääkaupungin. — en-Wikipedia "Quito" (lede)
- Kaupunki perustettiin uudelleen nykyiselle paikalleen 6.12.1534:
  204 siirtolaista Sebastián de Benalcázarin johdolla vangitsi
  inkasotapäällikkö Rumiñahuin, joka lopetti järjestäytyneen
  vastarinnan; Rumiñahui teloitettiin 10.1.1535. — en-Wikipedia
  "Quito" (Colonial period)
- Espanjan valloitus 1534 lasketaan yleisimmin kaupungin viralliseksi
  perustamispäiväksi, mikä tekee Quitosta Etelä-Amerikan vanhimman
  pääkaupungin. — en-Wikipedia "Quito" (lede)
- **HUOM (Wikipedian sisäinen ristiriita, kirjoitusasu):** artikkelin
  infolaatikko kirjoittaa perustajan nimen "Sebastián de Belalcázar",
  leipäteksti "Sebastián de Benalcázar" — käytetty leipätekstin
  muotoa, koska se toistuu useammin ja on myös henkilön oman
  Wikipedia-artikkelin otsikkomuoto. — en-Wikipedia "Quito" (infobox
  vs. Colonial period)

**Nosto QC2 — "Maailman ylin pääkaupunki päiväntasaajan kainalossa" (490 merkkiä)**

> Quito nousee Andien itärinteille 2 850 metrin korkeuteen, mikä tekee
> siitä joko maailman ylimmän tai toiseksi ylimmän valtion
> pääkaupungin – järjestys riippuu siitä, lasketaanko Bolivian
> pääkaupungiksi hallinnollinen La Paz vai perustuslaillinen Sucre.
> Korkeus ja sijainti lähes tarkalleen päiväntasaajalla pitävät ilman
> tasaisen viileänä ympäri vuoden, mutta altistavat kaupungin myös
> maailman voimakkaimmalle auringon UV-säteilylle: kirkkaana päivänä
> UV-indeksi voi nousta jopa lukuun 24.

Faktat ja lähteet:
- Quiton korkeus 2 850 m tekee siitä joko maailman ylimmän tai
  toiseksi ylimmän valtion pääkaupungin; ero riippuu siitä, lasketaanko
  Bolivian pääkaupungiksi hallinnollinen La Paz (korkeampi kuin Quito)
  vai perustuslaillinen Sucre (matalampi). — en-Wikipedia "Quito"
  (lede)
- Korkeuden ja päiväntasaajasijainnin vuoksi Quiton ilmasto on
  poikkeuksellisen tasainen ja viileä. — en-Wikipedia "Quito"
  (Climate)
- Korkeuden vuoksi Quito saa yhden maailman voimakkaimmista
  auringonsäteilyannoksista; UV-indeksi voi kirkkaalla säällä nousta
  jopa lukuun 24 auringon ollessa korkeimmillaan. — en-Wikipedia
  "Quito" (Climate)

**Nosto QC3 — "Vanhakaupunki joka pääsi listalle ensimmäisenä" (444 merkkiä)**

> Quiton vanhakaupunki on Amerikan mantereen laajin ja parhaiten
> säilynyt historiallinen keskusta: 320 hehtaarin alueella on noin 130
> monumentaalirakennusta ja yli 5 000 kaupungin omaan
> suojeluluetteloon merkittyä kiinteistöä. Syyskuun 18. päivänä 1978
> se julistettiin Unescon maailmanperintökohteeksi yhdessä Puolan
> Krakovan kanssa – ensimmäisten joukossa koko listalla. Kaupunki on
> uudistanut vanhaakaupunkia aktiivisesti vuodesta 2002 lähtien.

Faktat ja lähteet:
- Quitolla on Amerikan mantereen laajin, vähiten muuttunut ja parhaiten
  säilynyt historiallinen keskusta: 320 hehtaaria, noin 130
  monumentaalirakennusta ja 5 000 kaupungin omaan
  suojelurekisteriin merkittyä kiinteistöä. — en-Wikipedia "Quito"
  (Points of interest: Historic center)
- Quiton vanhakaupunki julistettiin Unescon maailmanperintökohteeksi
  18.9.1978 yhdessä Krakovan historiallisen keskustan kanssa —
  ensimmäisten joukossa koko maailmanperintölistalla (2. istunto).
  — en-Wikipedia "Quito" (Points of interest: Historic center; infobox)
- Kaupunki on uudistanut vanhaakaupunkia aktiivisesti vuodesta 2002.
  — en-Wikipedia "Quito" (21st century)

**Nosto QC4 — "Ainoa pääkaupunki näin lähellä toimivaa tulivuorta" (525 merkkiä)**

> Quito on ainoa pääkaupunki, joka on rakennettu näin lähelle
> aktiivista tulivuorta: kaupungin länsilaidalla kohoaa Pichincha,
> jonka kaksi huippua Ruku Pichincha ja Guagua Pichincha kurottavat
> lähes 4 700 ja 4 800 metriin. Vuoren suurin tunnettu purkaus vuonna
> 1660 peitti kaupungin yli 25 senttimetrin tuhkakerroksella. Idässä
> laakson toisella puolella kohoavat lumihuippuiset Cotopaxi, Antisana
> ja Cayambe, lännessä Illiniza ja Pululahuan kalderatulivuori – Quito
> on rakennettu tulivuorten ympäröimään laaksoon joka suuntaan.

Faktat ja lähteet:
- Quito on ainoa pääkaupunki, joka on kehittynyt näin lähelle
  aktiivista tulivuorta (Pichincha); vuoren huiput Ruku Pichincha
  (4 700 m) ja Guagua Pichincha (4 794 m). — en-Wikipedia "Quito"
  (Geography: Nearby volcanoes)
- Pichinchan suurin tunnettu purkaus tapahtui 1660, jolloin yli 25 cm
  tuhkaa peitti kaupungin. — en-Wikipedia "Quito" (Geography: Nearby
  volcanoes)
- Quiton itäpuolen (Cordillera Real) tulivuoriin kuuluvat Cotopaxi,
  Sincholagua, Antisana ja Cayambe; länsipuolen (Cordillera
  Occidental) tulivuoriin Illiniza, Atacazo ja Pululahua. —
  en-Wikipedia "Quito" (Geography: Nearby volcanoes)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Kaksikymmentä kirkkoa yhden vuosisadan aikana" (541 merkkiä)**

> Espanjalaiset toivat katolisen kirkon Quitoon heti alusta:
> ensimmäinen kirkko, El Belén, valmistui jo ennen kaupungin virallista
> perustamista, ja tammikuussa 1535 nousi San Franciscon luostari,
> ensimmäinen noin kahdestakymmenestä siirtomaa-ajalla rakennetusta
> kirkosta ja luostarista. Espanjalaiset käänsivät alkuperäisväestön
> kristinuskoon ja käyttivät sitä rakennustyön voimana – juuri tämä työ
> loi vanhankaupungin tiheän kirkkojen ja luostarien verkoston, joka
> teki Quitosta myöhemmin poikkeuksellisen yhtenäisen historiallisen
> keskustan.

Faktat ja lähteet:
- Ensimmäinen kirkko (El Belén) valmistui ennen kaupungin virallista
  perustamista; tammikuussa 1535 nousi San Franciscon luostari,
  ensimmäinen noin kahdestakymmenestä siirtomaa-ajalla rakennetusta
  kirkosta ja luostarista. — en-Wikipedia "Quito" (Colonial period)
- Espanjalaiset käänsivät alkuperäisväestön kristinuskoon ja
  käyttivät sitä rakennustyön voimana. — en-Wikipedia "Quito"
  (Colonial period)

**Nosto H2 — "Satakuusikymmentä vuotta yhden julkisivun rakentamiseen" (492 merkkiä)**

> Jeesuksen seuran kirkon La Compañían rakentaminen alkoi 1605, ja työ
> kesti 160 vuotta: julkisivu valmistui vasta 1765. Sen tekivät
> alkuperäiskansojen kivenveistäjät, jotka muotoilivat kivet huolella
> koristeelliseen espanjalaisbarokkiin – lopputulos on yksi
> hienoimmista barokkijulkisivuista koko Amerikan mantereella. Kirkko
> on yksi kymmenistä Quiton vanhankaupungin uskonnollisista
> rakennuksista, jotka yhdessä muodostavat mantereen laajimman ja
> parhaiten säilyneen historiallisen keskustan.

Faktat ja lähteet:
- La Compañían kirkon rakentaminen alkoi 1605 ja kesti 160 vuotta;
  julkisivu valmistui 1765, ja sen tekivät alkuperäiskansojen
  kivenveistäjät koristeelliseen espanjalaisbarokkiin — yksi
  hienoimmista esimerkeistä tästä tyylistä Amerikan mantereella. —
  en-Wikipedia "Quito" (Points of interest: Historic center)
- Quitolla on Amerikan mantereen laajin, vähiten muuttunut ja
  parhaiten säilynyt historiallinen keskusta. — en-Wikipedia "Quito"
  (Points of interest: Historic center)

**Nosto H3 — "Taistelu joka päätti siirtomaa-ajan" (466 merkkiä)**

> Quito yritti itsenäistyä jo 1809, mutta liike kukistettiin seuraavana
> vuonna, kun siirtomaajoukot saapuivat Limasta ja surmasivat kapinan
> johtajia. Lopullinen ratkaisu tuli 24. toukokuuta 1822, kun Antonio
> José de Sucre johti Simón Bolívarin joukkoja Pichinchan tulivuoren
> rinteillä käytyyn taisteluun. Voitto päätti Espanjan vallan
> Quitossa ja sen lähialueilla ja avasi tien tasavallan rakentamiselle
> – samalle tulivuorelle, joka yhä kohoaa kaupungin länsilaidalla.

Faktat ja lähteet:
- 10.8.1809 Quitossa käynnistyi itsenäisyysliike; se kukistettiin
  2.8.1810, kun siirtomaajoukot saapuivat Limasta ja surmasivat
  kapinan johtajia ja noin 200 muuta asukasta. — en-Wikipedia "Quito"
  (Colonial period)
- 24.5.1822 Antonio José de Sucre johti Simón Bolívarin joukkoja
  Pichinchan taisteluun tulivuoren rinteillä; voitto vahvisti Quiton ja
  sen lähialueiden itsenäisyyden. — en-Wikipedia "Quito" (Colonial
  period)

**Nosto H4 — "Presidentti joka avasi tähtitieteen ikkunan" (502 merkkiä)**

> Presidentti Gabriel García Moreno avasi Quiton observatorion 1873 La
> Alameda-puistoon, keskelle vanhaakaupunkia – yksi Etelä-Amerikan
> vanhimmista tähtitieteellisistä laitoksista syntyi saksalaisen Bonnin
> observatorion mallin mukaan. Ensimmäiseksi johtajaksi tuli Juan
> Bautista Menten, ja rakennus valmistui kokonaan 1878. Kaksi vuotta
> perustamisen jälkeen, 1875, García Moreno itse murhattiin Quitossa –
> mutta observatorio jäi pystyyn ja jatkoi samaa tehtävää,
> meteorologian ja tähtitieteen tutkimusta.

Faktat ja lähteet:
- Quiton observatorio perustettiin 1873, presidentti Gabriel García
  Morenon avaamana; se on yksi Etelä-Amerikan vanhimmista
  observatorioista. — en-Wikipedia "Quito Astronomical Observatory"
  (lede, History); "Quito" (Points of interest: La Alameda)
- Ensimmäinen johtaja oli Juan Bautista Menten, joka suunnitteli
  observatorion Bonnin (Saksa) observatorion mallin mukaan; rakennus
  valmistui kokonaan 1878. — en-Wikipedia "Quito Astronomical
  Observatory" (History)
- Gabriel García Moreno, Ecuadorin presidentti (1861–65 ja 1869–75),
  murhattiin Quitossa 6.8.1875. — en-Wikipedia "Gabriel García Moreno"
  (lede). Tapahtuman yksityiskohtia (asetta, tekijää) ei ole toistettu
  tässä faktapohjassa faktakurin väkivaltalinjauksen mukaisesti.

### Teemasivu `tiede` — 4 nostoa

**Nosto T1 — "Retkikunta joka tuli mittaamaan maapallon muotoa" (546 merkkiä)**

> Kysymys siitä, oliko Maa litistynyt navoilta vai päiväntasaajalta,
> jakoi 1700-luvun tiedeyhteisön kahtia. Ranskan kuningas Ludvig XV ja
> tiedeakatemia ratkaisivat kiistan lähettämällä kaksi retkikuntaa:
> toisen Lapin Tornionlaaksoon, toisen silloiseen Quiton alueeseen.
> Etelän retkikunta lähti Ranskasta toukokuussa 1735 – mukana
> tähtitieteilijät Charles Marie de La Condamine, Pierre Bouguer ja
> Louis Godin sekä espanjalaiset geografit Jorge Juan ja Antonio de
> Ulloa – ja saapui Quitoon kesäkuussa 1736 kuljettuaan Panaman kautta
> sademetsien läpi.

Faktat ja lähteet:
- 1700-luvulla käytiin tiedekiista siitä, oliko Maan ympärysmitta
  suurempi päiväntasaajalla vai navoilla; Ludvig XV ja Ranskan
  tiedeakatemia lähettivät kaksi retkikuntaa, pohjoisen Lapin
  Tornionlaaksoon ja toisen silloiseen Quiton alueeseen. —
  en-Wikipedia "French Geodesic Mission to the Equator" (Background)
- Päiväntasaajan retkikuntaa johtivat ranskalaiset tähtitieteilijät
  La Condamine, Bouguer ja Godin sekä espanjalaiset geografit Jorge
  Juan ja Antonio de Ulloa; retkikunta lähti Ranskasta toukokuussa
  1735 ja saapui Quitoon kesäkuussa 1736 matkattuaan Panaman kautta ja
  sademetsien läpi. — en-Wikipedia "French Geodesic Mission to the
  Equator" (Expedition)

**Nosto T2 — "Heiluri joka muutti maailman mittajärjestelmää" (547 merkkiä)**

> Pierre Bouguer mittasi päiväntasaajalla, Pichinchan huipulla ja
> merenpinnan tasolla sekuntiheilurin pituuden selvittääkseen
> painovoiman vaihtelun. La Condamine teetti mittatuloksesta
> marmorilaatan pronssisine heilurimallineen ja luovutti sen 1742
> Quiton jesuiittakollegiolle – laatta on nykyään esillä observatorion
> museossa La Alameda-puistossa. Retkikunnan meridiaanikaarimittaukset
> yhdistettiin myöhemmin Ranskan omiin mittauksiin, ja niiden pohjalta
> metrijärjestelmän metri vahvistettiin 1799 – päiväntasaajan retki on
> siis yksi metrin isistä.

Faktat ja lähteet:
- Bouguer mittasi sekuntiheilurin pituuden päiväntasaajalla, Quitossa,
  Pichinchan huipulla ja merenpinnan tasolla määrittääkseen
  painovoiman. — en-Wikipedia "French Geodesic Mission to the
  Equator" (Expedition)
- La Condamine teetti marmorilaatan pronssisine heilurimallineen ja
  luovutti sen Quiton San Franciscon jesuiittakollegiolle 1742; laatta
  on nykyään Observatorio Astronómicossa La Alameda-puistossa. —
  en-Wikipedia "French Geodesic Mission to the Equator" (Expedition)
- Päiväntasaajan meridiaanikaarimittaukset yhdistettiin Delambren ja
  Méchainin Dunkerque–Barcelona-mittauksiin (1792–1799), ja niiden
  pohjalta metri vahvistettiin virallisesti 22.6.1799. — en-Wikipedia
  "French Geodesic Mission to the Equator" (Expedition)

**Nosto T3 — "Tulivuori joka näytti itsensä tiedemiehille ja kiipeilijöille" (645 merkkiä)**

> Cotopaxi, Quitosta noin 50 kilometriä etelään kohoava 5 897 metrin
> tulivuori, on purkautunut 87 kertaa. Retkikunnan tiedemiehet
> todistivat sen purkauksia 1740-luvulla laskeutuessaan naapurilta
> Pichinchalta. Huipulle päästiin vasta pitkän yrittämisen jälkeen:
> Humboldt yritti 1802, pääsi vain 4 500 metriin, ja ensimmäinen
> onnistunut nousu tehtiin 28.11.1872, kun saksalainen geologi Wilhelm
> Reiss ja kolumbialainen Ángel Escobar saavuttivat huipun. Jo
> seuraavana vuonna, 1873, huipulle nousi toinen retkikunta: geologi
> Moritz Alphons Stübel neljän ecuadorilaisen – Rafael Jantuin, Melchor
> Páezin, Vicente Ramónin ja Eusebio Rodriguezin – kanssa.

Faktat ja lähteet:
- Cotopaxi kohoaa noin 50 km Quitosta etelään, 5 897 m korkeuteen, ja
  on purkautunut tunnetusti 87 kertaa. — en-Wikipedia "Cotopaxi"
  (infobox, lede)
- Alexander von Humboldt yritti kiivetä Cotopaxille 1802, mutta pääsi
  vain noin 4 500 metriin. — en-Wikipedia "Cotopaxi" (Climbing)
- Ensimmäinen onnistunut huipulle nousu tehtiin 28.11.1872: saksalainen
  geologi Wilhelm Reiss ja kolumbialainen Ángel Escobar. — en-Wikipedia
  "Cotopaxi" (infobox; Climbing)
- Vuonna 1873 Cotopaxin huipulle nousi geologi Moritz Alphons Stübel
  yhdessä neljän ecuadorilaisen — Rafael Jantui, Melchor Páez, Vicente
  Ramón ja Eusebio Rodriguez — kanssa. — en-Wikipedia "Cotopaxi"
  (Climbing)
- **RISTIRIITA (vuosiluku, kirjoitettu auki):** "French Geodesic
  Mission to the Equator" -artikkeli sanoo retkikunnan todistaneen
  kaksi Cotopaxin purkausta "1743 ja 1744"; "Cotopaxi"-artikkeli
  sanoo Bouguerin ja La Condaminen todistaneen yhden purkauksen
  täsmälleen 19.6.1742 laskeutuessaan Guagua Pichinchalta. Nostossa
  käytetty yleistä ilmaisua "1740-luvulla" väärän vuosiluvun
  valitsemisen sijaan (sama periaate kuin Vancouver-ennakkotapauksessa
  ja resepin ohjeessa koordinaattien/vuosilukujen ristiriidoista). —
  en-Wikipedia "French Geodesic Mission to the Equator" (Observations
  during the mission); "Cotopaxi" (Historic eruptions)

**Nosto T4 — "Observatorio joka kantoi retkikunnan perintöä eteenpäin" (549 merkkiä)**

> Quiton observatorio, joka avattiin La Alameda-puistoon 1873, ei
> syntynyt tyhjästä: se jatkoi tiedeperinnettä, jonka
> ranskalais-espanjalainen retkikunta oli aloittanut 130 vuotta
> aiemmin. Observatorion kokoelmissa on 1800-luvun tieteellisiä
> mittalaitteita, muun muassa saksalaisen Repsoldin meridiaanipiiri ja
> 1875 Münchenissä valmistettu 24-senttinen Merzin kaukoputki.
> 1900-luvun alussa toinen ranskalainen tutkimusretkikunta työskenteli
> samoissa tiloissa vahvistaakseen 1700-luvun mittaustulokset ja
> juhliakseen kahden tasavallan tiedeyhteistyötä.

Faktat ja lähteet:
- Quiton observatorio, perustettu 1873, on yksi Etelä-Amerikan
  vanhimmista, ja sijaitsee vanhankaupungin La Alameda-puistossa. —
  en-Wikipedia "Quito Astronomical Observatory" (lede)
- Observatorion kokoelmissa on merkittäviä 1800-luvun tieteellisiä
  mittalaitteita, muun muassa Repsoldin meridiaanipiiri ja 1875
  Münchenissä valmistettu 24 cm:n Merzin ekvatoriaalikaukoputki. —
  en-Wikipedia "Quito Astronomical Observatory" (History)
- **EPÄVARMA/RISTIRIITA (vuosiluvut):** 1900-luvun alussa toinen
  ranskalainen retkikunta ("French Geodesic Mission II") vahvisti
  ensimmäisen retkikunnan tuloksia ja työskenteli osin observatorion
  tiloissa. "French Geodesic Mission to the Equator" -artikkeli
  ajoittaa tämän retkikunnan Ecuadorissa toimimisen vuosiin 1901–1906
  (johtajana kapteeni E. Maurain), kun taas "Quito Astronomical
  Observatory" -artikkeli sanoo sen työkalujen olleen käytössä
  observatoriolla "vuosina 1902–1914" — kaksi artikkelia eivät
  täsmää tarkkaan vuosilukuun, joten nostossa käytetty yleistä
  ilmaisua "1900-luvun alussa". — en-Wikipedia "French Geodesic
  Mission to the Equator" (Subsequent mission); "Quito Astronomical
  Observatory" (Astronomical Museum)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja.

**Jakso 1 — "Perille ja korkeuteen tottuminen"**

Nykyään Quitoon saavutaan Mariscal Sucren kansainvälisen lentokentän
kautta, joka avattiin nykyiselle paikalleen helmikuussa 2013 noin 45
minuutin ajomatkan päähän keskustasta. Moni vierailija väsyy
ensimmäisinä päivinä korkean ilmanalan vuoksi, ja jyrkkä köysirata
TelefériQo vie halukkaat vielä 1 250 metriä korkeammalle, Pichinchan
rinteelle Cruz Loman näköalapaikalle.

Faktat ja lähteet:
- Uusi Mariscal Sucre International Airport avattiin liikenteelle
  20.2.2013, noin 45 minuutin ajomatkan päässä keskustasta; vanha
  kenttä suljettiin 19.2.2013. — en-Wikipedia "Quito" (21st century)
- TelefériQo-köysirata on ollut käytössä heinäkuusta 2005; se vie
  matkustajat Cruz Loman asemalle noin 4 100 metrin korkeuteen
  Pichinchan itärinteellä. — en-Wikipedia "Quito" (Points of
  interest: TeleferiQo)

**Jakso 2 — Alueen rakenne**

Quito on rakennettu kapealle, noin 40 kilometriä pitkälle ja vain 5
kilometriä leveälle tasangolle Guayllabamba-joen laaksossa, Pichinchan
itärinteillä. Muoto näkyy katukartassa: suurimmat pääväylät kulkevat
pohjois-eteläsuunnassa koko kaupungin läpi, kun taas itä-länsisuunnassa
matkaa rajoittavat vuoret molemmin puolin.

Faktat ja lähteet:
- Quito on rakennettu pitkälle tasangolle Pichinchan itärinteillä,
  Guayllabamba-joen laaksossa; kaupunki on noin 40 km pitkä ja vain
  noin 5 km leveä. — en-Wikipedia "Quito" (Geography; Transport:
  Roads)
- Kaupungin tärkeimmät pääväylät kulkevat pohjois-eteläsuunnassa;
  10 de Agosto -katu halkoo kaupungin keskeltä samaan suuntaan. —
  en-Wikipedia "Quito" (Transport: Roads, avenues and streets)

**Jakso 3 — Arjen ilmiö: El Ejidon viikonloppumarkkinat**

El Ejido -puisto erottaa vanhankaupungin uudemmasta keskustasta, ja
joka lauantai ja sunnuntai sen laidalla avautuu käsityömarkkina, jossa
hinnoista tingitään. Paikalliset maalarit myyvät kopioita Ecuadorin
tunnetuimpien taiteilijoiden, Oswaldo Guayasamínin ja Eduardo Kingmanin,
teoksista, ja Otavalon seudulta saapuneet otavaleñot myyvät perinteisiä
villapaitoja, ponchoja ja koruja — sama kichwaa puhuva kansa, joka on
tunnettu käsityöstään jo vuosisatoja ja pitää perinnettä elävänä
edelleen tänään.

Faktat ja lähteet:
- El Ejido on Quiton neljänneksi suurin puisto ja erottaa vanhan
  kaupunginosan uudemmasta; sen laidalla on joka lauantai ja sunnuntai
  käsityömarkkina, jossa hinnoista tingitään. — en-Wikipedia "Quito"
  (Points of interest: Parks – El Ejido)
- Paikalliset maalarit myyvät kopioita Oswaldo Guayasamínin, Eduardo
  Kingmanin ja Gonzalo Endara Crow'n teoksista; otavaleñot myyvät
  perinteisiä villapaitoja, ponchoja, mattoja ja koruja. —
  en-Wikipedia "Quito" (Points of interest: Parks – El Ejido)

**Jakso 4 — Historian käännekohta: Mitad del Mundo -monumentti**

Noin 35 kilometriä Quitosta pohjoiseen kohoaa kymmenmetrinen
Mitad del Mundo -monumentti, joka pystytettiin 1936 juhlistamaan
ranskalais-espanjalaisen retkikunnan saapumisen 200-vuotispäivää.
Ironista kyllä: GPS-mittaukset ovat myöhemmin osoittaneet, että
todellinen päiväntasaaja kulkee noin 240 metriä pystytetyn
monumentin pohjoispuolella — tarkin mittaus vaati siis samaa
teknologiaa, jota 1700-luvun tiedemiehillä ei vielä ollut.

Faktat ja lähteet:
- Ciudad Mitad del Mundo on noin 35 km Quitosta pohjoiseen; sen
  10-metrinen monumentti pystytettiin 1936 juhlistamaan
  ensimmäisen geodeettisen retkikunnan saapumisen 200-vuotispäivää,
  Ecuadorin maantieteilijä Luis Tufiñon aloitteesta. — en-Wikipedia
  "Quito" (Points of interest: Outside the city); "French Geodesic
  Mission to the Equator" (Monument)
- GPS-mittaukset ovat osoittaneet todellisen päiväntasaajan kulkevan
  noin 240 metriä monumenttialueen pohjoispuolella. — en-Wikipedia
  "Quito" (Points of interest: Outside the city)

**Jakso 5 — Milloin kannattaa tulla**

Quiton ilmasto on luokiteltu subtrooppiseksi ylänköilmastoksi (Köppen:
Cfb), ja vuodessa on käytännössä vain kaksi vuodenaikaa: kuiva
"kesä" kesä-elokuussa ja sateinen "talvi" syyskuusta toukokuuhun.
Lämpötila pysyy tasaisena ympäri vuoden korkeuden ansiosta — suurempi
vaihtelu tapahtuu vuorokauden, ei vuodenajan, sisällä.

Faktat ja lähteet: ks. osio 5 (Säätiedot) — samat luvut, samat
lähteet.

---

## 4. Yhdeksän kohdekartan kohdetta

Koordinaatit haettu en-Wikipedian MediaWiki-rajapinnasta
(`action=query&prop=coordinates`, redirects=1) 23.8.2026 (rajapinta
vastasi väliin 429:llä/404:llä, uusintayritys 1,5–2 s viiveellä
korjasi kaikki). Keskipisteeksi on valittu historiallinen ydin — Plaza
Grande / katedraali — ei "Quito"-artikkelin oma, laajempaa
kaupunkialuetta kuvaava koordinaattipiste (0,22°S 78,5125°W), spec-
mantereet.md:n ohjeen mukaisesti (kohta 4: "kohdekartan keskusta
valitaan historiallisen ytimen mukaan"). Etäisyydet ovat OMIA
LASKELMIANI koordinaattieroista (asteet × 111,32 km; päiväntasaajalla
leveys- ja pituusasteen kerroin on lähes sama, toisin kuin
Vancouver-ennakkotapauksessa), tarkistettu Node-skriptillä.

| # | Nimi suomeksi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta keskustasta (oma laskelma) |
|---|---|---|---|---|
| 1 | Quito, keskipiste (Plaza Grande / katedraali) | 0,2203°S 78,5142°W | "Quito Metropolitan Cathedral" | (keskipiste) |
| 2 | Basilica San Francisco (Plaza de San Francisco) | 0,2203°S 78,5156°W | "Basilica and Convent of San Francisco, Quito" | ~0,15 km länteen |
| 3 | Church of La Compañía | 0,2208°S 78,5139°W | "Church of La Compañía, Quito" | ~0,07 km kaakkoon |
| 4 | El Panecillo (Neitsyt Marian patsas) | 0,2286°S 78,5186°W | "El Panecillo" | ~1,05 km lounaaseen |
| 5 | Basílica del Voto Nacional | 0,2150°S 78,5074°W | "Basílica del Voto Nacional" | ~0,96 km koilliseen |
| 6 | Quiton observatorio (La Alameda -puisto) | 0,2149°S 78,5026°W | "Quito Astronomical Observatory" | ~1,42 km koilliseen |
| 7 | TelefériQo (Cruz Loma -köysirata) | 0,1919°S 78,5189°W | "TelefériQo" | ~3,20 km pohjoiseen |
| 8 | Mitad del Mundo -monumentti | 0,0022°S 78,4558°W | "Ciudad Mitad del Mundo" | ~25,1 km pohjoiseen |
| 9 | Cotopaxi (huippu) | 0,6806°S 78,4378°W | "Cotopaxi" | ~51,9 km etelään |

**Rajausehdotus:** Kuusi ensimmäistä kohdetta (1–6) mahtuvat alle 2 km ×
2 km alueeseen vanhankaupungin sisällä. TelefériQo (7) on vielä
kohtuullisen lähellä (~3,2 km). Mitad del Mundo (8, ~25 km) ja Cotopaxi
(9, ~52 km) ovat selvästi kauempana kuin Vancouverin tai muiden
kaupunkilehtien kohdekartat yleensä ulottuvat — kumpikin on kuitenkin
niin keskeinen osa kaupungin tarinaa (päiväntasaajan monumentti,
retkikunnan ja isoisän-ajan kiipeilyhistorian tulivuori), ettei niitä
kannata jättää kartalta pois vain etäisyyden vuoksi. Sama ratkaisu kuin
Vancouver-ennakkotapauksessa (Musqueamin varaus 2): näytä joko omalla
zoomaustasollaan tai hyväksy väljempi rajaus.

---

## 5. Säätiedot

- **Keskustan koordinaatit:** 0,2201°S, 78,5125°W (Wikipedian oma
  "Quito"-koordinaatti; ks. osio 4 kohdekartan keskipisteen erosta). —
  en-Wikipedia "Quito" (infobox)
- **Köppen-luokka:** Cfb, subtrooppinen ylänköilmasto tasaisella
  sademäärällä. — en-Wikipedia "Quito" (Climate)
- **Sää (Mariscal Sucre -lentokenttä, 1991–2020-normaalit, ennätykset
  1891–nyt):** vuotuinen keskilämpötila 14,1 °C, iltapäivän
  keskikorkein 20,7 °C, yön keskimatalin 8,5 °C; sademäärä 1 099,9
  mm/vuosi, 164,8 sadepäivää; ennätyskorkein 30,2 °C (elokuu),
  ennätysmatalin −0,5 °C (heinäkuu). — en-Wikipedia "Quito" (Climate,
  Weather box)
- **HUOM (kaksi eri lukusarjaa samassa artikkelissa):** artikkelin
  leipäteksti antaa erilaiset luvut kuin lentokentän säätaulukko —
  "iltapäivän keskikorkein 21,4 °C, yön keskimatalin 9,8 °C, vuotuinen
  keskiarvo 15,6 °C" — todennäköisesti koska leipäteksti kuvaa
  kaupungin keskustaa (2 850 m) ja säätaulukko lentokenttää (Tababela,
  matalampi ja hieman lämpimämpi). Molemmat ovat samasta artikkelista;
  kirjoittajan kannattaa valita jompikumpi selkeästi ja mainita kumpaa
  käyttää. — en-Wikipedia "Quito" (Climate, leipäteksti vs. Weather
  box)
- **UV-säteily:** UV-indeksi voi kirkkaana päivänä nousta jopa lukuun
  24 auringon ollessa korkeimmillaan. — en-Wikipedia "Quito" (Climate)
- **Kaksi vuodenaikaa:** kuiva kausi kesäkuusta elokuuhun (3 kk,
  kutsutaan "kesäksi"), sateinen kausi syyskuusta toukokuuhun (9 kk,
  kutsutaan "talveksi"); sademäärä vaihtelee sijainnista riippuen yli
  1 000 mm. — en-Wikipedia "Quito" (Climate)
- **HUOM:** samoin kuin muissa kaupunkilehdissä, yllä olevat luvut
  ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin pelin
  `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali. Tarkat
  kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

Commons-kategoriat tarkistettu olemassa oleviksi
(`action=query&list=search&srnamespace=14`) 23.8.2026 — sisältö pitää
silti aina tarkistaa silmin lisenssisääntöjen mukaisesti. Erityis-
huomio: Plaza Granden ja El Ejidon katukuvat ovat usein täynnä ihmisiä
— valitse kuvakulma joka näyttää arkkitehtuurin tai käsityön, ei
yksilöityjä kasvoja. Otavalo- ja kichwa-aiheisissa kuvissa vältä
pelkkiä studiopotretteja tai seremoniaklišeitä (toimeksiannon linjaus:
alkuperäiskansat nykyisinä kansoina) — tasapainota nykyisillä
käsityö- ja torikuvilla, esim. `Category:Otavalo Artisan Market`.

**Avauskuvat (3), ehdotus:**
1. Plaza Grande / Plaza de la Independencia: katedraali ja Palacio de
   Carondelet samassa kuvassa.
2. Colonial-ajan kirkon julkisivu läheltä (San Francisco tai La
   Compañía) — kivenveistoa, ei koko rakennusta kaukaa.
3. Quiton observatorion rakennus La Alameda-puistossa.

**Kansikuvat (3), ehdotus:**
1. Vanhankaupungin kattonäkymä El Panecillolta, tulivuoret
   taustalla.
2. Basílica del Voto Nacional kohoamassa vanhankaupungin kattojen
   ylle.
3. Cotopaxi laajana maisemakuvana kaukaa — lumihuippu ja ympäröivä
   ylänkö, ei lähikuva.

**Commons-kategoriat kuvahakuun (kategorioiden olemassaolo
tarkistettu, sisältö tarkistetaan silmin lisenssisääntöjen mukaisesti):**
- `Category:Quito` — yleinen laaja yläkategoria
- `Category:Quito in the 1870s` — juuri isoisän matka-ajan
  historiallinen kuvasto (tarkista sisältö erikseen, kategoria on
  suppea)
- `Category:Centro Histórico, Quito` — vanhankaupungin yleiskuvasto
- `Category:Plaza de la Independencia (Quito)` — Plaza Grande,
  katedraali, Palacio de Carondelet
- `Category:Catedral Metropolitana (Quito)` — katedraali
- `Category:Iglesia de la Compañía (Quito)` ja alakategoriat
  `Category:Exterior (Iglesia de La Compañía, Quito)` — La Compañían
  julkisivu ja sisätila
- `Category:Church of Saint Francis, Quito` — San Franciscon basilika
- `Category:Basílica del Voto Nacional` ja alakategoriat (esim.
  `Category:Basílica del Voto Nacional, Quito (exterior)`) — neogoottinen
  basilika
- `Category:El Panecillo, Quito` — näköalakukkula, Neitsyt Marian
  patsas, kaupungin kattonäkymät
- `Category:Quito Astronomical Observatory` — observatorio ja sen
  1800-luvun mittalaitteet
- `Category:Parque La Alameda` — puisto observatorion ympärillä
- `Category:Mitad del Mundo` / `Category:Monumento a la Mitad del
  Mundo` — päiväntasaajan monumentti
- `Category:Cotopaxi` ja `Category:Views of Cotopaxi` — tulivuori;
  huomaa myös historiallinen maalauskategoria `Category:Cotopaxi
  (1862) by Frederic Edwin Church (Detroit Institute of Arts)`
  isoisän-ajan taidetta etsivälle
- `Category:Pichincha Volcano` — kaupungin oma tulivuori
- `Category:Kichwa Otavalo` ja `Category:Otavalo Artisan Market` —
  otavaleñojen nykyinen käsityö- ja torikulttuuri (ks. jakso 3)

**Nosto-/jaksokuvat, aihe-ehdotuksia (ei tiedostonimiä):**
1. 1870-luvun tai muu 1800-luvun valokuva/piirros vanhastakaupungista
   (`Category:Quito in the 1870s` tai laajempi `Category:Quito in the
   19th century`).
2. Observatorion 1800-luvun mittalaite läheltä (esim. Merzin
   kaukoputki tai Repsoldin meridiaanipiiri) — löytyy
   `Category:Quito Astronomical Observatory` -kategoriasta.
3. La Compañían tai San Franciscon julkisivun kivenveistoa läheltä.
4. Cotopaxi lumihuippuisena, laajana maisemakuvana — mielellään
   sivusta niin, että mittakaava (vuoren korkeus ympäristöön nähden)
   näkyy.
5. Mitad del Mundo -monumentti tai lähellä sijaitseva Intiñan-museon
   päiväntasaajaviiva.
6. Otavaleño-käsityöläinen tai -tori nykyaikana (esim.
   `Category:Otavalo Artisan Market`) — nykyisyys, ei pelkkä
   historiallinen kuriositeetti.
7. El Panecillon Neitsyt Marian patsas ja sen alta avautuva
   kaupunkinäkymä.
8. TelefériQo-köysirata tai näkymä Cruz Lomalta kaupungin ylle.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Neljä visan aihetta esiintyy nostoissa, mutta ei anna vastausta
   suoraan.** Visa kysyy (a) Ecuadorin pääkaupungista, (b)
   päiväntasaajan yhtä pitkistä päivistä, (c) 2 850 metrin
   korkeudesta, (d) Unescon 1978-listauksesta, (e) Cotopaxista.
   QC1/QC2 kertovat kaupungin perustamisesta ja korkeudesta eri
   näkökulmasta kuin visan ympäripyöreä sanamuoto (esim. tarkka
   vertailu La Pazin/Sucren kanssa, ei pelkkä "2 850 metriä");
   QC3 käyttää tarkkoja lukuja (320 ha, 130 rakennusta, 18.9.1978,
   Krakova) visan lyhyen "ensimmäisiä maailmanperintökohteita"
   -sanamuodon sijaan; T3 käsittelee Cotopaxia kiipeilyhistorian
   kautta, ei visan tulivuori-tunnistuksen kautta. Päivän ja yön
   yhtä pitkä kesto (visan toinen kysymys) EI ole käytetty
   yhdessäkään nostossa tai jaksossa — jos kirjoittaja haluaa
   käsitellä sitä, se on tarkistamatta tässä faktapohjassa.
2. **Wikipedian sisäinen kirjoitusasuero: Belalcázar vs. Benalcázar.**
   Ks. QC1:n HUOM-rivi. Käytetty leipätekstin muotoa "Benalcázar".
3. **Kaksi kirjattua vuosilukuristiriitaa Cotopaxin/observatorion
   ympärillä**, molemmat kirjoitettu auki nostojen T3 ja T4
   yhteydessä faktakurin periaatteen mukaisesti (Wikipedian sisäiset
   ristiriidat kirjoitetaan auki lukijalle tai valitaan tarkempi
   lähde perusteluineen).
4. **Mitad del Mundon etäisyys: 35 km (leipäteksti) vs. 25,1 km (oma
   koordinaattilaskelma historiallisesta ytimestä).** Ero selittyy
   todennäköisesti sillä, että Wikipedian leipäteksti mittaa
   etäisyyden jostain muusta, todennäköisesti laajemmasta
   Quito-pisteestä (esim. kaupungin hallinnollinen keskipiste tai
   pohjoisempi kaupunginosa) kuin tämän faktapohjan valitsema
   historiallinen ydin (Plaza Grande). Sama periaate kuin
   Vancouver-ennakkotapauksessa: koordinaatit ja oma laskelma voittavat
   leipätekstin pyöristetyn etäisyysarvion.
5. **García Morenon murha mainittu vain ajankohtana (6.8.1875), ei
   yksityiskohtineen.** En-Wikipedian "Gabriel García Moreno"
   -artikkeli sisältää yksityiskohtaisen kuvauksen surmasta
   (asetta, tekijää, poliittista taustaa) — nämä on tietoisesti
   jätetty pois faktapohjasta faktakurin väkivaltalinjauksen
   mukaisesti ("väkivalta vain neutraalina historiana ilman
   yksityiskohtien korostusta"). Jos kirjoittaja tarvitsee
   lisäkontekstia, artikkeli on olemassa mutta ei ole tarkistettu
   tätä faktapohjaa varten yksityiskohtaisesti.
6. **"Historic Centre of Quito" ei ole oma en-Wikipedia-artikkeli**
   (palautti 404 action=raw-haussa 23.8.2026) — aihe on katettu
   "Quito"-artikkelin osioissa "History" ja "Points of interest §
   Historic center", joita on käytetty tässä faktapohjassa sen
   sijaan.
7. **Vain en-Wikipediaa ja sen MediaWiki-rajapintaa sekä Wikimedia
   Commonsin hakurajapintaa (kategorioiden olemassaolon tarkistukseen)
   on käytetty.** Ei ulkopuolisia hakuja tämän faktapohjan sisältöön.
8. **Ei nykysotaa eikä nykypolitiikkaa käsitelty.** García Morenon
   hallinnon pakkotyöjärjestelmä (trabajo subsidario) ja sen käyttö
   tiestön rakentamisessa on en-Wikipedian "Gabriel García Moreno"
   -artikkelissa laajasti käsitelty ja kriittisestikin arvioitu aihe
   — se on tietoisesti jätetty tämän faktapohjan ulkopuolelle, koska
   se ei liity suoraan valittuihin 12 nostoon eikä sovi kaupunkilehden
   mittaan; jos kirjoittaja haluaa käsitellä sitä, aihe vaatisi oman,
   huolella tasapainotetun käsittelynsä.
9. **Kichwat/alkuperäiskansat nykyisinä toimijoina.** Toimeksiannon
   linjaus on toteutettu ensisijaisesti jaksossa 3 (El Ejidon
   otavaleño-markkinat, nykytoimintaa) ja osion 6
   kuvahakuvinkeissä (`Category:Otavalo Artisan Market`). Quiton
   oma Wikipedia-aineisto ei tarjoa yhtä vahvaa nykypäivän
   itsehallinto-/maanpalautusnäkökulmaa kuin esimerkiksi Vancouverin
   First Nations -aineisto; jos kirjoittaja haluaa syventää tätä,
   kannattaa hakea erikseen esim. artikkeleista "Kichwa people" tai
   "Otavalo people" (ei tarkistettu tätä faktapohjaa varten).
10. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi** merkkimäärävaatimusten mukaan (johdannot 216–251,
    nostot 444–663) ja tarkistettu koneellisesti Node-skriptillä.
