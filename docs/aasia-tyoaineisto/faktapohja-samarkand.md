# Samarkand — faktakoostaja, uusi kaupunkilehti

Lauta-id `samarkand`, en-Wikipedia "Samarkand". Kaikki tiedot haettu
en-Wikipediasta 20.8.2026, ellei toisin mainita (ks. osio 7). Malli ja
mitat luettu tiedostosta `docs/moduulit/kaupunkilehti.md` (osiot
"Rakenne" ja "Mitat, jotka pitävät") sekä esimerkkinä
`docs/arkisto/faktapohja-medina.md`. Nykyinen visa `js/packs/
asia-questions.js` (avain `samarkand`) ja saapumiskortti
`js/packs/asia-saapumiset.js` on luettu etukäteen, jotta uudet nostot
eivät toista niiden faktoja (Registan, Timur, Ulugbekin observatorio
ovat jo visassa — nostoissa on siksi haettu SYVEMPÄÄ yksityiskohtaa
kuin visan yleistasoinen kysymys).

Sisältölinjaus huomioitu koko ajan: ei nykysotaa, ei nykypolitiikkaa,
uskonto käsitelty historiallis-kulttuurisena ilmiönä (esim.
Bukhari-hadithkokoelma, sufilinjat) — nykyisiä etnisyys-/kieli-
kiistoja (tadžikki- vs. uzbekkienemmistö Samarkandissa, ks. osio 7
kohta 8) EI ole käytetty nostoissa, koska aihe on herkkä eikä
1873-hengen kannalta oleellinen. Venäjän valloitus 1868 on käsitelty
NEUTRAALINA historiallisena tosiasiana, samaan tapaan kuin
Medina-faktapohjassa ja kaupunkilehti.md:n luvussa "Venäjän kaupungit
ja Kabul" — piiritys on tavallista sotahistoriaa, ei nykyaiheita.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Samarkand"

**Johdanto (228 merkkiä):**

> Silkkitien kuuluisin kaupunki ja Timurin valtakunnan pääkaupunki,
> jonka Registanin aukiota reunustavat kolme siniturkoosia
> koulurakennusta. Kaupunki liitettiin Venäjään 1868, ja sen
> muistomerkit rappeutuivat vielä vuosikymmeniä.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Samarkandin vahvin ja turvallisin aineisto
on nimenomaan pitkä historiallinen kaari — Aleksanteri Suuri,
mongolien tuho, Timurin uudelleenrakennus, Venäjän valloitus. Harkitsin
myös `tiede`-teemasivua (Ulugbekin observatorio on poikkeuksellisen
vahva yksittäinen aihe: maailman suurin tähtitieteen mittalaite
1420-luvulla), mutta päädyin `historia`-aiheeseen, koska se KANTAA
myös observatorion (yksi nosto, H-sarjassa ei mutta K-sarjassa K4) ja
antaa laajemman kaaren. Kuvataide/kirjallisuus/musiikki eivät nouse
lähteistä yhtä vahvoina (persialainen runousperinne mainitaan, mutta
ohut aihe omaksi sivuksi), ruoka ei riitä omaksi sivuksi (paperi ja
basaari nousevat pikemminkin jaksoina, ks. osio 3).

**Johdanto (221 merkkiä):**

> Historia kaartuu Aleksanteri Suuresta mongolien tuhoon ja Timurin
> uudelleenrakennukseen. Venäjän valloitus 1868 päätti vuosisatoja
> kestäneen turkkilaisvallan, ja rapistuneet muistomerkit alkoivat
> elpyä vasta 1900-luvulla.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Kolme koulua vastapäätä toisiaan" (443 merkkiä)**

> Registanin aukiolla kolme koulurakennusta — Ulugbekin, Sherdorin ja
> Tillakarin medresee — kaartuvat toisiaan kohti siniturkoosin
> kaakelin peittäminä. Aukio oli Timurin valtakunnan sydän: sinne
> koottiin väki kuulemaan hallitsijan julistuksia valtavien
> kupariputkien törähdyksin, ja siellä myös teloitettiin. Sherdorin
> julkisivun tiikerit auringonnousuineen ovat harvinaisia, sillä
> islamilainen taide vältti yleensä elävien olentojen kuvaamista.

Faktat ja lähteet:
- Kolme medreseetä: Ulugbekin (1417–1420), Sherdorin (1619–1636) ja
  Tillakarin (1646–1660). — en-Wikipedia "Registan"
- Aukiolla kuulutettiin hallitsijan julistuksia "dzharchi"-nimisillä
  suurilla kupariputkilla, ja siellä myös teloitettiin. — en-Wikipedia
  "Registan"
- Sherdorin julkisivun tiikerikuviot auringonnousuineen ovat
  poikkeuksellisia elävien olentojen kuvauksena islamilaisessa
  arkkitehtuurissa. — en-Wikipedia "Registan"
- (Huom: visa `asia-questions.js` kysyy jo Registanista yleisellä
  tasolla "mikä aukio on tunnetuin nähtävyys" — tämä nosto menee
  syvemmälle kolmeen rakennukseen ja niiden käyttöön, ei toista
  visan tasoa.)

**Nosto K2 — "Timurin hauta" (459 merkkiä)**

> Timur ehti rakennuttaa itselleen pienemmän haudan Shahrisabziin,
> mutta kun hän kuoli 1405 sotaretkellä Kiinaan, vuoristosolat olivat
> lumen peitossa — ja hänet haudattiin Samarkandiin pojanpoikansa
> Muhammad Sultanin muistoksi aloitettuun Gur-e-Amiriin. Haudalla
> lepää tummanvihreä jadelohkare. Persialainen Nadir-shahi yritti 1740
> viedä Timurin sarkofagin saaliikseen, mutta kivi halkesi kahtia
> matkalla — pahaenteinen merkki, joka sai hänet palauttamaan sen.

Faktat ja lähteet:
- Timur kuoli helmikuussa 1405 Otrarissa sotaretkellä Kiinaan; halusi
  tulla haudatuksi Shahrisabziin, mutta lumisten solien vuoksi hänet
  haudattiin Samarkandiin Gur-e-Amiriin. — en-Wikipedia "Gur-e-Amir"
- Gur-e-Amirin rakennutti alun perin Muhammad Sultan, Timurin
  kruununperijä, joka kuoli 1403; Timur itse on haudattu tummanvihreän
  jadelohkareen alle. — en-Wikipedia "Gur-e-Amir"
- Persian hallitsija Nadir-shahi yritti 1740 viedä Timurin sarkofagin;
  kivi halkesi kuljetuksessa kahtia, mikä tulkittiin pahaksi enteeksi
  ja sai hänet palauttamaan sen. — en-Wikipedia "Gur-e-Amir"

**Nosto K3 — "Mesketti joka ei koskaan valmistunut" (476 merkkiä)**

> Timur rakennutti Bibi-Khanymin moskeijan Intian-sotaretkeltä 1399
> palattuaan, ja 95 norsua raahasi paikalle lähes 450 marmoripylvästä.
> Rakennus oli aikansa kunnianhimoisin: kupoli kohosi 40 metriin.
> Kunnianhimo kuitenkin ylitti rakennustaidon — tiiliä alkoi pudota
> kupolista jo muutaman vuoden kuluttua, ja moskeija rapistui
> vuosisatojen mittaan raunioksi. Vuoden 1897 maanjäristys romahdutti
> portaalin sisäkaaren lopullisesti; jälleenrakennus alkoi vasta
> neuvostoaikana 1974.

Faktat ja lähteet:
- Timur käynnisti Bibi-Khanymin moskeijan rakennuttamisen
  Intian-sotaretken (1398–1399) jälkeen; noin 450 marmoripylvästä
  tuotiin paikalle 95 norsun avulla. — en-Wikipedia "Bibi-Khanym
  Mosque"
- Päädyn ulkokupoli n. 40 m korkea; rakennustekniikka ylitti aikansa
  osaamisen rajat, ja tiiliä alkoi pudota kupolista jo muutaman
  vuoden kuluttua valmistumisesta. — en-Wikipedia "Bibi-Khanym Mosque"
- Moskeija rapistui vuosisatojen mittaan raunioiksi; portaalin
  sisäkaari romahti lopullisesti maanjäristyksessä 1897.
  — en-Wikipedia "Bibi-Khanym Mosque"
- Neuvostohallinto aloitti moskeijan kokonaisvaltaisen
  jälleenrakennuksen 1974. — en-Wikipedia "Bibi-Khanym Mosque"

**Nosto K4 — "Ruhtinas joka mittasi taivaan" (496 merkkiä)**

> Timurin pojanpoika Ulugbek rakennutti 1420-luvulla observatorion,
> jonka jättimäinen Fakhri-sekstantti oli säteeltään 40 metriä —
> aikansa suurin tähtitieteen mittalaite. Sillä hän mittasi vuoden
> pituuden vain 25 sekunnin tarkkuudella, tarkemmin kuin Kopernikus
> sata vuotta myöhemmin. Oma poika salamurhasi Ulugbekin 1449, ja
> observatorio hylättiin ja tuhoutui. Rauniot löysi maan alta
> venäläinen arkeologi Vasili Vjatkin vasta 1908 — isoisän aikaan
> paikalla ei siis näkynyt kuin nummimainen kumpu.

Faktat ja lähteet:
- Observatorio rakennettiin 1420-luvulla, valmistui n. 1428; Fakhri-
  sekstantin säde oli 40,04 m, aikansa suurin tähtitieteellinen
  mittalaite. — en-Wikipedia "Ulugh Beg Observatory"
- Ulugbek mittasi trooppisen vuoden pituudeksi 365 vrk 5 h 49 min 15 s
  (virhe +25 s) — tarkemmin kuin Kopernikuksen myöhempi arvio
  (virhe +30 s). — en-Wikipedia "Ulugh Beg Observatory"
- Ulugbek salamurhattiin oman poikansa Abd al-Latifin toimesta n. 1449;
  observatorio hylättiin ja tuhoutui pian tämän jälkeen.
  — en-Wikipedia "Ulugh Beg Observatory"
- Venäläinen arkeologi Vasili Vjatkin löysi observatorion rauniot
  (mm. maan alle jääneen sekstantin osan) vuonna 1908. — en-Wikipedia
  "Ulugh Beg Observatory"
- **Oma päättely, EI suoraa Wikipedia-lausetta:** koska rauniot
  löydettiin vasta 1908, isoisän 1873-matkalla paikalla ei olisi ollut
  nähtävissä kuin maakumpu — ks. osio 7 kohta 3.

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Marakanda, Aleksanterin kaupunki" (456 merkkiä)**

> Aleksanteri Suuri valtasi kaupungin 329 eaa., ja kreikkalaiset
> kutsuivat sitä Marakandaksi. Kaupunki vaurioitui pahoin
> valloituksessa, mutta toipui nopeasti ja kukoisti hellenistisen
> vaikutuksen alla — rakentajat siirtyivät suorakulmaisista tiilistä
> neliönmuotoisiin ja oppivat parempia muuraus- ja rappaustapoja.
> Kaupunki oli asutettu jo noin 700-luvulla eaa., ja se on yksi
> Keski-Aasian vanhimmista yhtäjaksoisesti asutuista kaupungeista
> tänäkin päivänä.

Faktat ja lähteet:
- Aleksanteri Suuri valtasi kaupungin 329 eaa.; kreikkalainen nimi
  Marakanda (Μαράκανδα). — en-Wikipedia "Samarkand"
- Kaupunki vaurioitui pahoin valloituksessa mutta toipui nopeasti ja
  kukoisti hellenistisen vaikutuksen alla; rakennustekniikka parani
  (suorakulmaisista tiilistä neliömäisiin, parempi muuraus ja
  rappaus). — en-Wikipedia "Samarkand"
- Samarkandin arkeologian instituutin tutkijat ajoittavat kaupungin
  perustamisen n. 700 eaa.; kaupunki on yksi Keski-Aasian
  vanhimmista yhtäjaksoisesti asutuista kaupungeista. — en-Wikipedia
  "Samarkand"

**Nosto H2 — "Tšingis-kaanin tuho" (440 merkkiä)**

> Mongolit valtasivat Samarkandin 1220. Tšingis-kaani tappoi
> linnoitukseen ja moskeijaan paenneet, ryösti kaupungin täysin ja
> pakko-otti 30 000 nuorta miestä ja 30 000 käsityöläistä
> palvelukseensa — kaupunki ei koskaan täysin toipunut tästä iskusta.
> Se pysyi mongolien Tšagatai-kaanikunnan osana 150 vuotta, kunnes
> Timur teki siitä 1370 oman valtakuntansa pääkaupungin ja kutsui
> parhaat käsityöläiset joka kolkasta rakentamaan sitä uudelleen.

Faktat ja lähteet:
- Mongolit valtasivat Samarkandin 1220; Tšingis-kaani tappoi
  linnoitukseen ja moskeijaan paenneet, ryösti kaupungin täysin ja
  pakko-otti 30 000 nuorta miestä sekä 30 000 käsityöläistä.
  — en-Wikipedia "Samarkand" (Ata-Malik Juvaynin kuvaukseen viitaten)
- Kaupunki pysyi osana Tšagatai-kaanikuntaa vuoteen 1370 asti.
  — en-Wikipedia "Samarkand"
- Timur teki Samarkandista pääkaupunkinsa 1370 ja kutsui parhaat
  käsityöläiset ja rakentajat valtakuntansa joka kolkasta. —
  en-Wikipedia "Samarkand"

**Nosto H3 — "Kaupunki jota rakennettiin uudestaan ja uudestaan" (460 merkkiä)**

> Timur ei tyytynyt keskinkertaiseen: hän saattoi käskeä saman
> rakennuksen purettavaksi ja tehtäväksi uudelleen, jos lopputulos ei
> miellyttänyt. 35 vuoden aikana kaupunki sai 8 kilometrin muurit ja
> kasvoi noin 150 000 asukkaan kaupungiksi. Espanjalainen lähettiläs
> Ruy González de Clavijo vieraili 1404 ja kutsui Timurin moskeijaa
> jaloimmaksi näkemäkseen Samarkandissa; arabimatkaaja Ibn Battuta oli
> jo 1333 kehunut kaupunkia yhdeksi suurimmista ja kauneimmista.

Faktat ja lähteet:
- Timur oli suoraan mukana rakennushankkeissa ja käski usein purkaa ja
  tehdä rakennuksia uudelleen, jos lopputulos ei miellyttänyt. —
  en-Wikipedia "Samarkand"
- Kaupungin ympärille kaivettiin ojat ja rakennettiin n. 8 km (5
  mailia) pitkät muurit; väkiluku oli tuolloin n. 150 000.
  — en-Wikipedia "Samarkand"
- Kastilian Henrik III:n lähettiläs Ruy González de Clavijo vieraili
  8.9.–20.11.1404 ja kutsui Timurin moskeijaa jaloimmaksi
  näkemäkseen Samarkandissa. — en-Wikipedia "Samarkand"
- Ibn Battuta vieraili 1333 ja kutsui Samarkandia yhdeksi suurimmista
  ja kauneimmista kaupungeista, "täydellisimmäksi kauneudessaan". —
  en-Wikipedia "Samarkand"

**Nosto H4 — "Kun Venäjän lippu nousi linnoituksen ylle" (465 merkkiä)**

> Kenraali Kaufmannin joukot valtasivat Samarkandin linnoituksen
> toukokuussa 1868 ilman taistelua — kaupunki antautui. Kaufmannin
> lähdettyä jatkamaan sotaretkeä pieni, noin 650 miehen varuskunta jäi
> vartioimaan kaupunkia. Kesäkuussa 55 000–65 000 hengen liittouma
> bukharalaisia, kokandilaisia ja heimosotureita piiritti linnoitusta
> useita päiviä, kunnes Kaufmannin pääjoukko palasi murtamaan
> piirityksen. Bukharan emiraatista tuli Venäjän suojeluksessa oleva
> alusmaa.

Faktat ja lähteet:
- Kenraali Konstantin von Kaufmannin joukot valtasivat Samarkandin
  2.5.1868 ilman taistelua (kaupunki antautui). — en-Wikipedia
  "Siege of Samarkand (1868)" / "Samarkand"
- Kaufmann jätti n. 650–660 miehen varuskunnan (osin haavoittuneita
  ja ei-taistelukykyisiä) linnoitukseen komentaja Stempelin alaisuuteen
  ja lähti 30.5.1868 jatkamaan sotaretkeä emiiriä vastaan.
  — en-Wikipedia "Siege of Samarkand (1868)"
- Kesäkuussa 1868 (2.–8.6. juliaanista/gregoriaanista laskutapaa
  riippuen) 55 000–65 000 hengen liittouma bukharalaisia,
  kokandilaisia ja heimosotureita piiritti linnoitusta useita
  vuorokausia; myös osa kaupunkilaisista nousi kapinaan.
  — en-Wikipedia "Siege of Samarkand (1868)"
- Venäläisten tappiot olivat 49 kaatunutta ja 172 haavoittunutta;
  piirittäjien tappiot olivat "raskaat". Kaufmannin pääjoukko palasi
  ja mursi piirityksen. — en-Wikipedia "Siege of Samarkand (1868)"
- Vuoden 1868 sotaretken seurauksena Bukharan emiraatista tuli
  Venäjän suojeluksessa oleva alusmaa (protektoraatti). — en-Wikipedia
  "Siege of Samarkand (1868)"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Rakenne noudattaa Kairon `matkailijalle.artikkeli.jaksot`-mallia.
Faktat on valittu niin, etteivät ne toista osion 2 nostoja.

**Jakso 1 — "Perille ja liikkeelle"**

Ennen 1950-lukua Samarkandissa liikuttiin vaunuilla ja hevos- tai
aasivetoisilla "araba"-kärryillä. Venäjän valtaus 1868 ei tuonut
rautatietä heti: Kaspianmereltä alkanut Transkaspian rata ulottui
Samarkandiin vasta toukokuussa 1888 — kaksikymmentä vuotta
valloituksen jälkeen — ja kaupunki oli tuolloin hetken radan
päätepiste, ennen kuin linja jatkettiin itään Taškentiin ja
Andižaniin. Nykyään kaupungissa on oma kansainvälinen lentokenttä
(avattu 1930-luvulla) ja nopea Taškent–Samarkand-Buhara-junayhteys.

Faktat ja lähteet:
- Ennen 1950-lukua pääasiallinen liikkumismuoto olivat vaunut ja
  "araba"-kärryt hevosin tai aasein. — en-Wikipedia "Samarkand"
- Transkaspian rautatie rakennettiin 1879–1891; Samarkandin asema
  avattiin toukokuussa 1888, ja rata oli tuolloin linjan päätepiste
  ennen jatkoa Taškentiin/Andižaniin (nimi vaihtui Keski-Aasian
  radaksi). — en-Wikipedia "Samarkand"
- Samarkand International Airport avattiin 1930-luvulla Neuvostoaikaan.
  — en-Wikipedia "Samarkand"
- Nopea Taškent–Samarkand-junayhteys (Afrasiyob/Talgo 250) jatkuu
  myös Buharaan. — en-Wikipedia "Samarkand"
- **Oma päättely, EI suoraa Wikipedia-lausetta:** koska rautatie
  ulottui kaupunkiin vasta 1888, isoisän 1873-matkalla Samarkandiin
  olisi jouduttu saapumaan maanteitse/karavaanein, viisi vuotta
  Venäjän valtauksen jälkeen — ks. osio 7 kohta 3.

**Jakso 2 — Alueen rakenne**

Samarkand sijaitsee Zeravšan-joen laaksossa 705 metrin korkeudessa,
Uzbekistanin kaakkoisosassa. Buharaan on 240 km, Taškentiin 270 km, ja
Tadžikistanin raja kulkee vain noin 35 km:n päässä — pääkaupunki
Dušanbeehen on 210 km. Kaupunki jakautuu kahtia: vanha kaupunki
muistomerkkeineen ja kapeine kujineen, sekä Venäjän vallan aikana
länteen rakennettu uusi kaupunki leveine katuineen ja
hallintorakennuksineen.

Faktat ja lähteet:
- Sijainti Zeravšan-joen laaksossa, korkeus 705 m. — en-Wikipedia
  "Samarkand"
- Etäisyydet: Buhara 240 km (tie M37), Taškent 270 km (tie M39),
  Tadžikistanin raja n. 35 km, Dušanbe 210 km, Mazar-i-Sharif
  (Afganistan) 340 km. — en-Wikipedia "Samarkand"
- Kaupunki jakautuu vanhaan kaupunkiin (muistomerkit, kaupat, vanhat
  yksityistalot) ja Venäjän/Neuvostoliiton aikana kehittyneeseen
  uuteen kaupunkiin (hallintorakennukset, kulttuurikeskukset,
  oppilaitokset). — en-Wikipedia "Samarkand"
- Nykyinen kaupunkialue n. 120 km², väkiluku 882 000 (2026) —
  NYKYTIETO, ei käytetty 1873-kontekstissa (ks. osio 7 kohta 7,
  Nikosia-ennakkotapaus). — en-Wikipedia "Samarkand"

**Jakso 3 — Arjen ilmiö: paperi joka muutti maailmaa**

Perinteen mukaan islamilaisen maailman ensimmäinen paperitehdas
syntyi juuri Samarkandiin 700-luvulla, kun Talasjoen taistelussa 751
vangituilta kiinalaisilta sotilailta saatiin paperinvalmistuksen
salaisuus. Keksintö levisi Samarkandista koko islamilaiseen maailmaan
ja sieltä edelleen Eurooppaan — kaupunki oli siis paitsi tavaroiden
myös tekniikan solmukohta Silkkitiellä.

Faktat ja lähteet:
- Wikipedia esittää tämän nimenomaan LEGENDANA ("legend has it"): Abbasidien
  aikana kahdelta Talasjoen taistelussa (751) vangitulta kiinalaiselta
  saatiin paperinvalmistuksen salaisuus, mikä johti islamilaisen
  maailman ensimmäisen paperitehtaan perustamiseen Samarkandiin. —
  en-Wikipedia "Samarkand"
- Keksintö levisi sieltä muualle islamilaiseen maailmaan ja edelleen
  Eurooppaan. — en-Wikipedia "Samarkand"
- **Huom kirjoittajalle:** koska Wikipedia itse merkitsee tämän
  legendaksi eikä varmennetuksi tosiasiaksi, teksti kannattaa
  muotoilla selvästi perinnetietona ("kerrotaan, että...") eikä
  todistettuna historiana.

**Jakso 4 — Historian käännekohta: piiritys 1868**

Kun Kaufmannin pääjoukko lähti kesäkuussa 1868 jatkamaan sotaretkeä
Buharan emiiriä vastaan, Samarkandiin jäi vain noin 650–660 miehen
varuskunta linnoitukseen. Lähialueiden joukot — bukharalaisia,
kokandilaisia ja liittoutuneita heimoja, yhteensä 55 000–65 000 miestä
— piirittivät linnoitusta useita päiviä, ja myös kaupungin asukkaat
nousivat kapinaan. Varuskunta piti puolensa raskain tappioin, kunnes
Kaufmann palasi murtamaan piirityksen.

Faktat ja lähteet:
(Sama tapahtuma kuin nosto H4, mutta jakso keskittyy TAPAHTUMAN
KULKUUN, nosto H4 SEURAUKSIIN — päällekkäisyys on tarkoituksellista
kahden eri näkökulman vuoksi; kirjoittajan kannattaa harkita, tarvitaanko
molempia vai vain toista.)
- Ks. nosto H4:n lähdeluettelo, kaikki en-Wikipedia "Siege of
  Samarkand (1868)".

**Jakso 5 — Milloin kannattaa tulla**

Samarkandissa on kylmä, puolikuiva aroilmasto (Köppen BSk): kesät ovat
kuumia ja kuivia, talvet viileitä ja vaihtelevia. Heinäkuun
keskiylin on noin 34,5 °C ja ennätys 42,4 °C; tammikuun keskiylin on
vain 7,3 °C, ja pakkasennätys on −25,4 °C. Sadetta tulee eniten
helmi–huhtikuussa, kun taas kesä–syyskuu on lähes sateeton. Kevät
(maalis–huhtikuu, vihreä mutta vielä viileä) ja syksy
(syys–lokakuu, kuiva ja aurinkoinen) vaikuttavat tämän aineiston
perusteella miellyttävimmiltä matkustusajoilta.

Faktat ja lähteet: ks. osio 5 (Säätiedot) — kaikki luvut samasta
en-Wikipedia "Samarkand" -artikkelin sääruudusta (Weather box),
lähteinä artikkelissa Pogoda.ru.net (1991–2020, ääriarvot 1891–) ja
NOAA:n 1991–2020-normaalit.

---

## 4. Yhdeksän kohdekartan kohdetta

Kaikki koordinaatit en-Wikipedian infoboksista/coord-malleista, haettu
20.8.2026. Etäisyydet keskustasta ovat OMIA LASKELMIANI
koordinaattieroista (pallogeometria yksinkertaistettuna, pituusasteet
kerrottu cos(39,65°)≈0,7707), eivät Wikipedian tekstiä — ks. osio 7
kohta 1.

| # | Nimi suomeksi | Koordinaatit | Lähdeartikkeli | Etäisyys keskustasta (oma laskelma) |
|---|---|---|---|---|
| 1 | Samarkand, kaupungin keskipiste | 39°39′02″N 66°57′55″E | "Samarkand" (infobox) | (keskipiste) |
| 2 | Gur-e-Amir (Timurin mausoleumi) | 39°38′54″N 66°58′08″E | "Gur-e-Amir" | ~0,4 km KAAKKO |
| 3 | Registanin aukio | 39°39′17″N 66°58′32″E | "Registan" | ~1,0 km KOILLINEN |
| 4 | Chorsu-kauppakupoli (1785) | 39°39′20″N 66°58′36″E | "Chorsu (Samarkand)" | ~1,1 km KOILLINEN |
| 5 | Bibi-Khanymin moskeija | 39°39′38″N 66°58′45″E | "Bibi-Khanym Mosque" | ~1,6 km KOILLINEN |
| 6 | Siyob-basaari | 39°39′43″N 66°58′48″E (39,662°N 66,980°E) | "Siyob Bazaar" | ~1,8 km KOILLINEN |
| 7 | Shah-i-Zindan hautakuja | 39°39′47″N 66°59′16″E | "Shah-i-Zinda" | ~2,4 km KOILLINEN |
| 8 | Afrasiyab (antiikin Samarkandin rauniokumpu) | 39°40′17″N 66°59′16″E | "Afrasiyab (Samarkand)" | ~3,0 km POHJ.-KOILLINEN |
| 9 | Ulugbekin observatorio | 39°40′30″N 67°00′18″E | "Ulugh Beg Observatory" | ~4,3 km KOILLINEN |

**Rajaus:** Kaikki kohteet mahtuvat suunnilleen neliöön leveys
66°57′55″E – 67°00′18″E (n. 3,4 km) ja korkeus 39°38′54″N –
39°40′30″N (n. 3,0 km) — pysyy hyvin kaupunkilehti.md:n
2–4 km -ohjeistuksen sisällä ilman Medinan tyyppisiä
kompromissivaihtoehtoja. Ulugbekin observatorio (kohde 9) on
kauimpana keskustasta, mutta yhä rajauksen sisällä.

**Huom Siyob-basaarista (kohde 6):** artikkelin coord-malli antaa
koordinaatit VAIN kahden desimaalin tarkkuudella (39,662°N, 66,980°E)
DMS-muodon sijaan — muunsin ne asteminuutteihin taulukkoa varten,
mutta tarkkuus on karkeampi kuin muilla kohteilla, jotka tulevat
suoraan astesekunti-koordinaateista. Artikkeli itse kuvailee basaarin
sijaintia myös suhteessa muihin kohteisiin: "kilometri Registanista
etelään", "Bibi-Khanymin vieressä", "500 m Shah-i-Zindasta" — nämä
tekstiväitteet TUKEVAT laskettuja etäisyyksiä mutta eivät ole
identtisiä niiden kanssa.

---

## 5. Säätiedot

- **Keskustan koordinaatit:** 39,6506°N, 66,9653°E (39°39′02″N
  66°57′55″E). — en-Wikipedia "Samarkand"
- **Korkeus merenpinnasta:** 705 m. — en-Wikipedia "Samarkand"
- **Köppen-luokitus:** BSk, kylmä puolikuiva aroilmasto. —
  en-Wikipedia "Samarkand"
- **Kuukausiluvut ON saatavilla Wikipedian sääruudusta** (harvinaista —
  Medina-faktapohjassa vastaavaa ei ollut). Alla kuukausittainen
  keskiylin/keskialin/sademäärä; TÄYDET luvut (myös ennätykset,
  kosteus, aurinkotunnit, kastepisteet) ovat raakatiedostossa
  `wiki-Samarkand.txt` riveillä 293–476.

| Kk | Keskiylin °C | Keskialin °C | Sade mm |
|---|---|---|---|
| Tammi | 7,3 | −1,3 | 41,1 |
| Helmi | 9,5 | −0,2 | 52,2 |
| Maalis | 15,2 | 4,6 | 73,2 |
| Huhti | 21,4 | 9,7 | 62,9 |
| Touko | 27,0 | 14,1 | 40,0 |
| Kesä | 32,4 | 18,0 | 6,8 |
| Heinä | 34,5 | 19,5 | 1,6 |
| Elo | 33,3 | 17,9 | 1,6 |
| Syys | 28,6 | 13,5 | 2,7 |
| Loka | 22,0 | 7,8 | 16,0 |
| Marras | 14,4 | 3,2 | 40,3 |
| Joulu | 9,1 | −0,2 | 39,2 |
| Vuosi | — | — | 377,6 |

Lähde: en-Wikipedia "Samarkand", sääruutu (Weather box), pohjadata
Pogoda.ru.net (kausinormaalit 1991–2020, ääriarvot 1891–), UV-indeksi
Weather Atlas, kastepisteet Time and Date (1985–2015), tarkistettu
myös NOAA:n 1991–2020-normaaleihin.

**TÄRKEÄ PROSESSIHUOMIO kirjoittajalle:** vaikka nämä luvut OVAT
oikeita Wikipedia-lukuja (ei keksittyjä), kaupunkilehti.md:n
vakiokäytäntö on hakea `js/packs/saatiedot.js`-tiedoston normaalit
`tools/hae-saanormaalit.mjs`-työkalulla (Open-Meteo/ERA5,
1991–2020) — SAMASTA lähteestä kuin muillakin lehtikaupungeilla,
jotta vaihteluvyöhyke (ylin/alin) laskee yhdenmukaisesti pelin
kaikkien kaupunkien kesken. Tämän osion Wikipedia-luvut kelpaavat
sanallisen luonnehdinnan pohjaksi (jakso 5) ja ristiintarkistukseksi,
mutta EIVÄT korvaa ajoa `hae-saanormaalit.mjs`:llä ennen julkaisua.

---

## 6. Kuva-aiheet (sanoin, ei tiedostonimiä)

Erityishuomio: **ei tunnistettavia ihmisiä missään kuvassa.** Tämä
korostuu erityisesti Siyob-basaarilla ja Registanin aukiolla, jotka
ovat suosittuja turistikohteita ja täynnä väkeä — nämä on rajattava
pois tai valittava kuvakulma, jossa ihmisiä ei erotu yksilöinä.

**Avauskuvat (3):**
1. Registanin kolme medreseetä auringonlaskussa tai valaistuna yöllä,
   siniset kupolit siluetteina — ei ihmisiä lähikuvassa.
2. Gur-e-Amirin uritettu sininen kupoli lähikuvassa arkkitehtuurin
   yksityiskohtia korostaen.
3. Ulugbekin observatorion sekstantin kaari-uoma maan alla —
   arkeologinen kohde, ei ihmisiä.

**Kansikuvat (3):**
1. Registanin aukio laajana yleiskuvana, kaikki kolme
   koulurakennusta näkyvissä.
2. Bibi-Khanymin moskeijan portaali ja kupoli — voi olla joko
   nykyinen entisöity näkymä TAI historiallinen kuva raunioista
   (esim. Prokudin-Gorskin 1905–1915 valokuva, jos Commonsista löytyy
   PD-versio) — kumpikin kertoo eri puolen tarinasta.
3. Shah-i-Zindan hautakujan sinikaakeloitu käytävä, useita
   mausoleumeja perspektiivissä.

**Nosto-/jaksokuvat (8):**
1. Sherdorin medresen julkisivun tiikerikuvio lähikuvana (harvinainen
   elävän olennon kuva islamilaisessa arkkitehtuurissa — nosto K1).
2. Timurin haudan jadelohkare sisätiloissa (nosto K2).
3. Bibi-Khanymin moskeijan rauniovaiheen historiallinen valokuva,
   esim. Prokudin-Gorskin tai muun 1890–1915-ajan kuva ennen
   neuvostoaikaista entisöintiä (nosto K3) — TÄRKEÄ, koska tämä
   näyttää rakennuksen sellaisena kuin se olisi näyttänyt 1873.
4. Ulugbekin observatorion sekstantin kaaren jäljellä oleva osa tai
   museon pienoismalli (nosto K4).
5. Vanha kartta tai piirros Samarkandista/Afrasiyabista 1800-luvulta,
   jos Commonsista löytyy (nosto H1/H2, "kaupunki joka tuhoutui ja
   nousi uudelleen" -teemaan).
6. Vasily Vereštšaginin maalaus tai luonnos Registanista/piirityksestä
   1868 — Vereštšagin oli itse piirityksessä mukana ja maalasi
   aiheesta (esim. "Triumph"-maalaus Sherdorin medresestä Registanilla,
   tai piirityksen aikainen luonnos "Main Street in Samarkand from
   the height of the citadel") — nosto H4/jakso 4. Tarkista Commonsin
   lisenssi ja kuvan sisältö tarkasti; maalaus on taidehistoriallinen
   tulkinta, ei valokuva, kuvatekstin pitää kertoa tämä.
7. Afrasiyabin rauniokummun yleisnäkymä (arkeologinen kaivauskohde,
   ei rakennuksia näkyvissä) — kohdekartan kohde 8, sopii "mongolien
   tuho" -teemaan (nosto H2).
8. Paperinvalmistuksen käsityötä esittävä kuva (nykyaikainen
   käsipaperiverstas Samarkandissa tai lähialueella, jos
   Commonsista/Flickristä löytyy vapaasti lisensoitu — jakso 3);
   VAROTOIMI: tekijän kasvot eivät saa erottua, kädet/työ etualalla
   kaupunkilehti.md:n ruokakuva-kriteerien hengessä.

---

## 7. Ristiriidat, epävarmuudet ja ei-Wikipedia-lähteet

1. **Kohdekartan etäisyydet (osio 4) ovat omia laskelmiani**
   koordinaattieroista (yksinkertaistettu pallogeometria: asteet ×
   111 km, pituusasteille kerrottu cos(39,65°)≈0,7707), en Wikipedian
   tekstiä. Ne kannattaa tarkistaa oikealla karttatyökalulla ennen
   rajauksen lyömistä lukkoon. Siyob-basaarin osalta (kohde 6)
   koordinaatti oli alun perin desimaalimuodossa kahden desimaalin
   tarkkuudella — muunsin sen astesekunteihin taulukon
   yhdenmukaisuuden vuoksi, mutta alkuperäinen tarkkuus on karkeampi
   kuin muilla kohteilla.

2. **Kaksi Wikipedia-hakua epäonnistui (404):** "Samarkand railway
   station" ja "Imam al-Bukhari Memorial Complex" eivät ole omia
   artikkeleita en-Wikipediassa (tai nimet ovat eri muodossa). Rautatie-
   asemasta kertovat faktat (jakso 1) tulevat siis pääartikkelista
   "Samarkand", ei erillisestä asema-artikkelista. Imam al-Bukharin
   muistokompleksi mainitaan pääartikkelin infoboksin kuvatekstissä,
   mutta koska sillä ei ole omaa vahvistettua koordinaattilähdettä
   eikä se sijaitse aivan kaupungin ydinalueella (Payariqin suunnalla),
   sitä EI ole otettu kohdekartan listalle (osio 4).

3. **Kaksi "oma päättely" -merkintää nostoissa (K4 ja jakso 1)** ovat
   MINUN johtopäätöksiäni Wikipedian päivämäärätiedoista (observatorion
   löytyminen 1908; rautatien saapuminen 1888), ei suoria
   Wikipedia-lauseita siitä, mitä isoisä olisi nähnyt 1873. Päättely on
   mielestäni suoraviivainen (jos jokin löydettiin/rakennettiin X:nä
   vuonna, sitä ei ollut näkyvissä ennen X:ää), mutta kirjoittajan
   kannattaa harkita, halutaanko tällaista tulkintaa tekstiin vai
   pelkkä raakafakta ilman 1873-vertailua.

4. **Karsin itse tehdyn virheen ennen tätä raporttia:** ensimmäinen
   luonnokseni nostosta H1 väitti Samarkandia "vanhemmaksi kuin
   Rooma" vertaamalla Samarkandin arvioitua perustamisvuotta (~700
   eaa.) Rooman perinteiseen perustamisvuoteen (753 eaa.) — vertailu
   olisi ollut VIRHEELLINEN, sillä 753 eaa. on itse asiassa AIEMPI
   kuin 700 eaa., joten Rooma olisi tällä laskutavalla vanhempi, ei
   nuorempi. Poistin vertailun kokonaan lopullisesta nostosta ja
   käytin vain suoraan Wikipedian omaa ilmausta ("yksi Keski-Aasian
   vanhimmista yhtäjaksoisesti asutuista kaupungeista"). Mainitsen
   tämän tässä, jotta kirjoittaja tietää, ettei vastaavaa
   Rooma-vertailua pidä lisätä myöhemmin ilman tarkistusta.

5. **"Registan"-artikkelin yksi lähde on merkitty Wikipedian omalla
   sisäisellä tunnisteella `{{AI-retrieved source|checked=no}}`** —
   tämä koskee virkettä "Renowned for its soaring iwans, turquoise
   domes, intricate mosaic tilework..." ja sen UNESCO Silk Roads
   -viitettä. Tunniste tarkoittaa, ettei kukaan Wikipedia-toimittaja
   ole vielä ihmisenä varmentanut tätä tiettyä viitettä. En ole
   käyttänyt tätä virkettä sellaisenaan nostoissa (K1 nojaa muihin,
   varmennettuihin kohtiin samasta artikkelista), mutta mainitsen
   tunnisteen varotoimena.

6. **Nykyisiä etnisyys-/kielikiistoja (tadžikki- vs.
   uzbekkiväestö Samarkandissa) EI ole käytetty missään nostossa tai
   jaksossa.** Aihe on laajasti käsitelty Wikipedia-artikkelissa
   (osio "People"/"Language"), mutta on poliittisesti herkkä nykyaihe
   eikä 1873-hengen kannalta oleellinen — sivuutettu tarkoituksella,
   samalla periaatteella kuin "ei nykypolitiikkaa"-linjaus muuallakin
   pelissä.

7. **Väestöluku 882 000 (2026) ja kaupunkialue 120 km² ovat
   NYKYTIETOA**, ei 1873-ajan lukuja — en löytänyt fetsaamistani
   lähteistä mitään vahvistettua väestölukua 1868–1873-ajalta.
   Käytin nykylukua vain taustatietona jaksossa 2, samalla
   "Antaa olla" -periaatteella kuin Nikosia-ennakkotapauksessa
   (kaupunkilehti.md), en 1873-kontekstissa.

8. **Jakso 4 ja nosto H4 käsittelevät SAMAA tapahtumaa (piiritys
   1868) eri näkökulmista** (kulku vs. seuraus) — tarkoituksellinen
   päällekkäisyys, koska aihe on niin vahva, mutta kaupunkilehti.md:n
   sääntö ("sama tarina ei saa toistua kahdessa aiheessa") tarkoittanee
   tässä ETTÄ VAIN TOINEN otetaan lopulliseen lehteen, ellei
   jakso ja nosto asu eri sivuilla (kaupunki vs. matkaoppaan artikkeli)
   riittävän erillään. Kirjoittajan päätettävä.

9. **Bibi-Khanymin moskeijan 1897 maanjäristys tapahtui ISOISÄN
   1873-matkan JÄLKEEN** — vuonna 1873 rakennus oli jo pahasti
   rapistunut ("slowly deteriorated... ruins gnawed at by wind,
   weather, and earthquakes") mutta portaalin sisäkaari oli vielä
   pystyssä. Tämä on hyvä yksityiskohta tarinankirjoittajalle: 1873
   näkymä olisi ollut raunioituva mutta ei vielä täysin romahtanut
   moskeija — ei nykyinen entisöity versio eikä täydellinen raunio.

10. **Kaikki nostot ja jaksot on kirjoitettu VALMIiksi suomenkieliseksi
    tekstiksi merkkimäärävaatimusten mukaan** (nostot 440–496,
    johdannot 221–228) ja tarkistettu ohjelmallisesti Node-skriptillä
    merkkimäärien osalta — tarkat luvut on merkitty jokaisen noston
    otsikkoon.

11. **Ei-Wikipedia-hakuja käytettiin vain artikkelinimien löytämiseen**
    (esim. Chorsu (Samarkand), Siyob Bazaar, Afrasiyab (Samarkand)),
    minkä jälkeen jokainen näistä haettiin ja luettiin suoraan
    en.wikipedia.orgista ennen kuin tietoa käytettiin raportissa.
