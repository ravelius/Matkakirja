# Lehdet 7.9.2026 ilta — Fable-sessio 2:n raportti päätoimittajalle

*Haara `claude/lehdet-2026-09-07-ilta` origin/mainin v1671 (8334298) päältä.
EI julkaisuja: ei PR:ää, ei versionostoa, ei muutokset.js:ää, ei dist/-committeja.
Päätoimittaja poimii haaran ja julkaisee. Agentit: Opus (toteutus), Sonnet
(tarkistukset); enintään 8 rinnakkain, worktreet haaran HEADin päällä.*

Lähtötila (tarkistettu koneellisesti 7.9. illalla): kaikki 28 tehtävälistan
kaupunkia ovat vailla kaupunkilehteä (kulttuuri-kategoriat.js, nahtavyysjutut.js,
KAUPUNKIKARTAT, faktapohjat); maalehdistä puuttuu vain MOZ (Mosambik);
pienten maiden karttanostovaje laske-karttanostot.mjs:n mukaan: QAT −3 +
eläintäky, KWT −3, CYP −1, HKG −4/maasto −1/eläintäky, SGP −3/maasto −2/
eläintäky, SHN −5/maasto −1/eläintäky, FJI −3, SLB −2, VUT eläintäky.

Aalto 1 (käynnistetty): kaupunkiparit monterrey+merida, winnipeg+stjohns,
nuuk+anchorage, salta+antofagasta, puntaarenas+santacruz, kumasi+kano;
karttanostot 9 pienelle maalle; maalehti MOZ.
Aalto 2 (jonossa): timbuktu+lalibela, dili+alicesprings, townsville+iquitos,
whitehorse+yellowknife, iqaluit+santafe, puertomontt+joaopessoa,
saoluis+ouropreto, kimberley+managua; viimeisenä säärivit (Open-Meteo).

## Valmistuneet yksiköt

### Karttanostot 9 pienelle maalle — 10ba854 (tekstit), 66f42a5 (VUT kuva)
Tiedostot: js/packs/maastokohteet-{cyp,fji,hkg,kwt,qat,sgp,shn,slb}.js,
js/packs/elaintakyt.js, tests/elaintakyt.test.mjs, docs/moduulit/karttanostot-kattavuus.md.
Uudet: QAT Fuwayrit, Al-Shahaniya, Mesaieed; KWT Warbah, Qaruh, Wadi al-Batin;
CYP Apostolos Andreas; FJI Yasawa, Vatulele, Vilavilairevo; SLB Santa Isabel,
Makira; SGP Sungei Buloh; VUT eläintäky kookoskrapu (Birgus latro), kuva
Commons "Birgus latro 197146121.jpg", Dominik Maximilián Ramík, CC BY 4.0,
otettu Vanuatussa. Laskuri 103 → 108 maata tavoitteessa, vajaita 4.
Jäävä vaje: QAT eläintäky (mahdoton, 32,3 < 35), SGP kohteita −2/maasto −2/
eläintäky (19,8 < 35), HKG kohteita −4/maasto −1/eläintäky (22,2 < 35, nimiöt
täynnä), SHN kohteita −5/maasto −1/eläintäky (etäisyys täyttyy, nimiöt täynnä).
Pistokokeet: (1) Warbah — Irak tarjoutui 1951 hyväksymään rajasopimuksen ehdolla,
että Warbah luovutetaan; Kuwait kieltäytyi, tarjous vedettiin pois 1953
(en-Wikipedia "Warbah Island", History). (2) Santa Isabel — Mendaña maihin
7.2.1568, kartalle "Santa Isabel de la Estrella" ("Santa Isabel (island)",
History). (3) Fuwayrit — Brucks kirjasi kylän nimellä Affeeraat, n. 150 miestä
Abookaran ja Uttoobeen heimoista Bahrainin alaisuudessa ("Fuwayrit", First
British survey). Portit: fail 0, nimiölimitys 0, nostopaikat ok;
savuke-maastokohteet on ohituksessa (vanha-kartta-ohitus.mjs) — agentti ajoi
vartion 7a erikseen: 0 kohdetta lehden ikkunan ulkopuolella.

### Maalehti Mosambik (MOZ) — 84d48c0 (tekstit), a2b653a (kuvat)
Tiedostot: docs/mantereet-tyoaineisto/faktapohja-moz.md, js/packs/maa-kategoriat.js,
js/packs/africa-artikkelit.js (maaintro), js/packs/uutislahteet.js,
tools/uutisproxy/worker.js, tools/uutisproxy/OHJE.md. Aiheet: historia
(prazot, Baruen kruunajaiset, Mosambikin yhtiö, Niassan yhtiön postimerkit),
luonto (Mabu, Lico, Namuli, Niassajärvi), ruoka (matapa, xima, curry, cashew +
minitehtävä), musiikki (timbila, mgodo/mzeno, Fany Pfumo, Havannan
mozambique-rytmi), kuvataide (makonde, Malangatana, Reinata Sadimba, Trono de
Armas). Kuvia 12/20, kaikki Commons PD/CC, ≥ 1200 px, katsottu. Uutislähde
Jornal Notícias (pt, jornalnoticias.co.mz/feed/, ilman www:tä).
Pistokokeet: (1) Teten maakunnassa 1800-luvulla 32 tilanherraa hallitsi 57
prazoa (en-Wikipedia "Prazo", History). (2) mbilassa jopa 19 kieltä, joista 8
voi soida yhtä aikaa ("Xylophone", Mbila). (3) Niassan yhtiö laski liikkeelle
141 postimerkkiä, 158 miljoonan reisin edestä ("Postage stamps and postal
history of the Niassa Company"). Portit: fail 0, kaikki tarkistukset vihreät.

### Kaupunkilehdet Salta + Antofagasta — fb2b3ef (tekstit), f7761f6 (kuvat)
Tiedostot: faktapohja-/tarkistus-salta.md ja -antofagasta.md, kulttuuri-kategoriat.js,
maakartat.js, nahtavyysjutut.js, southamerica-artikkelit.js, piirra-kaupunkikartta.mjs,
assets/kartat/salta-keskusta.png, antofagasta-keskusta.png. Salta: kansi
(perustaminen 1582, Milagro, 1873, La Linda, Cerro San Bernardo), teemasivu
musiikki "Peña ja pohjoisen laulu". Antofagasta: kansi (kaupunki ilman
perustamiskirjaa, nimen selitykset, 1873, maanvaihto 1879–1904, Huanchaca),
teemasivu luonto "Sumu ja aavikko". 37 kuvaa Commonsista, ennen–nyt-parit
molemmille. Pistokokeet: (1) zamba syntyi Saltan maakunnassa 1824 perulaisesta
zamacuecasta (en-Wikipedia "Zamba (artform)", Name and origin); (2) Antofagasta
saa alle 0,1 mm sadetta vuodessa ("Antofagasta", Geography → Climate); (3)
Saltan katedraalin työt käynnistettiin uudelleen 1873 (es-Wikipedia "Catedral de
Salta", Historia). Portit: fail 0, karttapisteet ok. tarkista-tekijat: 0 poikkeamaa
uusissa kuvissa.

### Kaupunkilehdet Nuuk + Anchorage — 0c9b58f (tekstit), d1ada18 (kuvat)
Tiedostot: faktapohja-/tarkistus-nuuk.md ja -anchorage.md, kulttuuri-kategoriat.js,
maakartat.js, nahtavyysjutut.js, northamerica-artikkelit.js, piirra-kaupunkikartta.mjs,
assets/kartat/nuuk-keskusta.png, anchorage-keskusta.png. Nuuk: kansi (niemen
neljä asuttajaa, siirto Kangeqista, 1873 kaksi lähetysasemaa, 80 km katua ilman
tietä ulos), teemasivu tiede (jääkairaukset, Isua, Ameralik, Ilisimatusarfik).
Anchorage: kansi (dena'inat, Cook 1778, 1873 = 2 senttiä eekkeriltä, 1964),
teemasivu luonto "Eläimet kaupungissa". 43 kuvaa Commonsista, 5 hylätty
(kasvot, logo, pikselit). Pistokokeet: (1) Kalaaliaraq-tori n. 150 m katedraalista
kaakkoon ("Kalaaliaraq Market", johdanto; haversini 148 m); (2) 1964 järistyksessä
kuoli 139, 15 tärinässä ja 124 tsunameissa ("1964 Alaska earthquake", Death toll);
(3) Ameralikin jänneväli 5 376 m ("Ameralik Span"). Portit: fail 0, karttapisteet
ok (Nuukin viisi väliä 98–172 m, tiivis rajaus kuten Fesissä; ympyrät eivät
mene päällekkäin). Poiminnassa lisäyskonfliktit 4 tiedostossa liitetty
liita-lisays.py:llä.

### Kaupunkilehdet Punta Arenas + Santa Cruz — 517605e (tekstit), 64e0bcc (kuvat)
Tiedostot: faktapohja-/tarkistus-puntaarenas.md ja -santacruz.md, kulttuuri-kategoriat.js,
maakartat.js, nahtavyysjutut.js, southamerica-artikkelit.js, piirra-kaupunkikartta.mjs,
assets/kartat/puntaarenas-keskusta.png, santacruz-keskusta.png. Punta Arenas: kansi
(Sandy Point, Ancud ja Fuerte Bulnes 1843, 1873 rangaistussiirtola ja salmen
puolueettomuus, lammastalous ja selkʼnamit), teemasivu luonto "Salmi ja
Etelämanner" (Yelcho, Pardo). Santa Cruz: kansi (chanét ja Grigotá, kolme muuttoa,
1810/Warnes, 1873 Andrés Ibáñez), teemasivu musiikki "Karnevaali ja camban
tanssit". 31 kuvaa Commonsista; Santa Cruzilla ei ennen–nyt-paria. Pistokokeet:
(1) Chile lähetti 1873 merenkulkumaille kirjeen salmen vapaudesta ja
puolueettomuudesta (en-Wikipedia "Strait of Magellan", Legal status); (2) Andrés
Ibáñez kansanedustaja 1872–1874 (es-Wikipedia "Andrés Ibáñez (político)",
Incursión en Política); (3) Chile tunnusti selkʼnamit 5.9.2023 ("Selkʼnam people",
Recognition). Portit: fail 0, karttapisteet ok. Poiminnassa lisäyskonfliktit
5 tiedostossa liitetty liita-lisays.py:llä.

### Checkpointit (poimittu haaraan; loppuraportit ja kuvat täydennetään, jos agentit ehtivät)
- Iqaluit + Santa Fe: wip Iqaluitin tekstit ec5ce08 (Santa Fe ja kuvat kesken)
Kaikki kolme poimittu haaraan lisäyskonfliktit liittäen; portit fail 0,
karttapisteet ok kaikille kuudelle kaupungille. Näiden lehdet ovat siis
pelissä TEKSTEINÄ ja kohdekarttoina; kuvat, kuvalähteet ja
pistokoeväitteet täydennetään agenttien loppuraporteista, jos ne ehtivät
(muuten päätoimittaja teettää kuvahaun erikseen: kansikuvat 3, avauskuvat 3,
ennen–nyt-pari, nostojen kuvat, nähtävyysjuttujen kuvat).

### Kaupunkilehdet Dili + Alice Springs — f6cd382 (tekstit), e3ac996 (kuvatilaus) — KUVATON
Tiedostot: faktapohja-/tarkistus-dili.md ja -alicesprings.md, kulttuuri-kategoriat.js,
maakartat.js, nahtavyysjutut.js, oceania-artikkelit.js, piirra-kaupunkikartta.mjs,
assets/kartat/dili-keskusta.png, alicesprings-keskusta.png. Dili: kansi (1769,
1873 jälleenrakennus ruutukaavaan, toinen maailmansota, Tetun Prasa), teemasivu
luonto "Vuorten ja meren välissä". Alice Springs: kansi (Mparntwe, 1873
lennätinasema ja nimenvaihto 1933, kameliajajat, Flynn), teemasivu kuvataide
"Aavikon maalarit". YHTÄÄN KUVAA EI HAETTU: Commons vastasi koko ajan 429
(8 agenttia samasta osoitteesta) — täsmällinen kuvatilaus on commitin e3ac996
lohkokommenteissa (kansikuvat, avauskuvat, ennen–nyt, matkailijalle.kuva,
nostokuvat, 16 miniatyyriä). Namatjiran ja Papunya Tulan teoksista ei kuvia
(tekijänoikeus). Pistokokeet: (1) Casa Europan rakentaminen alkoi 1871, viisi
vuotta tulipalon jälkeen (en-Wikipedia "Casa Europa", History); (2) Stuart Town
Gaol valmistui 1907 ("Stuart Town Gaol", johdanto; "Alice Springs" sanoo 1909);
(3) Tetun Prasa ← praça, ~50 000 äidinkielistä 2004 ("Tetun language",
Names/History). Portit: fail 0, karttapisteet ok. Dilin kartta harva (Overpass
177 elementtiä) — tiheämpi versio vaatisi palvelutiet+jalkakaydat-liput uudelleen.

### Kaupunkilehdet Kumasi + Kano — e9c9d3a (tekstit), 885e098 + 7780dd1 (kuvat)
Tiedostot: faktapohja-/tarkistus-kumasi.md ja -kano.md, kulttuuri-kategoriat.js,
maakartat.js, nahtavyysjutut.js, africa-artikkelit.js, piirra-kaupunkikartta.mjs,
assets/kartat/kumasi-keskusta.png, kano-keskusta.png. Kumasi: kansi (kum-puu,
kultajakkara, Anokye 1695/Feyiase 1701, 1873 Wolseley ja 237 siltaa, Kumawood),
teemasivu luonto "Metsä ja järvi" (Bosumtwe). Kano: kansi (Kanon kronikka, Ali
Yaji, Rumfa, 1873 Sokoton emiirikunta ja Barth 1851, durbar), teemasivu kauppa
"Kauppa ja käsityö". Kuvia Commonsista 9 (Kumasi) + 13 (Kano), ennen–nyt vain
Kanolle. Pistokokeet: (1) Wolseley nimitettiin 13.8.1873, retkikunta rakensi 237
siltaa ("Anglo-Ashanti wars", Third war); (2) Barth 1851: n. 10 mailin muuri,
30 000 asukasta ("Kano (city)", Kano under the Sokoto Caliphate); (3) Bosumtwe
pyhä, kalastus vain puulankuilta ("Lake Bosumtwi", johdanto). Portit: fail 0.

### Kaupunkilehdet Winnipeg + St. John's — 49eb6ad (tekstit), 16da31c + 2beca05 (kuvat)
Tiedostot: faktapohja-/tarkistus-winnipeg.md ja -stjohns.md, kulttuuri-kategoriat.js,
maakartat.js, nahtavyysjutut.js, northamerica-artikkelit.js, piirra-kaupunkikartta.mjs,
assets/kartat/winnipeg-keskusta.png, stjohns-keskusta.png. Winnipeg: kansi (The
Forks, Seitsemän tammen taistelu 1816, marraskuu 1873 ja James McKay, Winnie-
karhu), teemasivu luonto "Talvi, tulva ja preeria". St. John's: kansi (nimi
1519, kapea portti, turska ja öljy, viisi paloa), teemasivu tiede "Viesti
valtameren yli" (kaapeli 1866, Marconi 1901, Alcock ja Brown). 48 kuvaa
Commonsista. 2beca05 sisältää myös Valparaíso-asennusvirheen korjauksen (agentin
kuvatyössä syntynyt, korjattu samassa). Pistokokeet: (1) Winnipeg kaupungiksi
8.11.1873, nimen antoi James McKay ("Winnipeg", Early history); (2) basilika
valmistuessaan 9.9.1855 Pohjois-Amerikan suurin kirkko ("Basilica of St. John
the Baptist"); (3) Newfoundlandin aikavyöhyke Amerikoiden ainoa puolen tunnin
poikkeama ("Newfoundland Time Zone"). Portit: fail 0, karttapisteet ok.

### Kaupunkilehdet Monterrey + Mérida — c8fe151 (tekstit), ad3f78e (kuvat) — VALMIS
Tiedostot: faktapohja-/tarkistus-monterrey.md ja -merida.md, kulttuuri-kategoriat.js,
maakartat.js, nahtavyysjutut.js, northamerica-artikkelit.js, northamerica-saapumiset.js,
piirra-kaupunkikartta.mjs, assets/kartat/monterrey-keskusta.png, merida-keskusta.png.
Monterrey: kansi (kolme perustamisyritystä 1596, nimi, Cerro de la Silla, Fundidora),
teemasivu luonto "Vuoret, luolat ja kuiva joki". Mérida: kansi (Tʼhó, Valkoinen
kaupunki, kastisota, heneken), teemasivu ruoka "Jukatanin oma keittiö". 48 kuvaa
Commonsista, tekijät tarkistettu extmetadataa vasten (47/48 täsmää, 1 vain
"(PD)"-muoto). Monterreylla ei ennen–nyt-paria (ei ≥ 1200 px vanhaa kuvaa).
Pistokokeet: (1) Cerro de la Sillan köysirata avattiin ja suljettiin 2.6.1961,
5 kuoli (en-Wikipedia "Cerro de la Silla", johdanto); (2) niemimaan ensimmäinen
rautatiekisko La Mejoradaan 1.4.1870 (es-Wikipedia "Parque de La Mejorada");
(3) Méridan katedraali valmistui 1598, Amerikan toinen ("Cathedral of Mérida,
Yucatán", History). Portit: fail 0, karttapisteet ok. HUOM: agentti muutti myös
northamerica-saapumiset.js:ää (saapumisteksti) — päätoimittaja tarkistaa, että
muutos on 1873-kehyksen mukainen eikä matkakirjatekstiä.

### Kaupunkilehdet Townsville + Iquitos — a9d62d0 + 9bd523e (tekstit), 511ffa9 (kuvat) — OSITTAIN KUVITETTU
Tiedostot: faktapohja-/tarkistus-townsville.md ja -iquitos.md, kulttuuri-kategoriat.js,
maakartat.js, nahtavyysjutut.js, oceania-artikkelit.js, southamerica-artikkelit.js,
piirra-kaupunkikartta.mjs, assets/kartat/townsville-keskusta.png, iquitos-keskusta.png.
Townsville: kansi (Burdekinin tulva 1864, James Morrill, 1873 viiden kultakentän
satama ilman rautatietä, Japanin konsulaatti 1896, Eddie Mabo), teemasivu luonto
"Kuiva tropiikki". Iquitos: kansi (kaupunki ilman tietä, jesuiitat ja nimi, 1873
laivastosatama, rautatalo, kumi), teemasivu luonto "Joki, joka nousee ja laskee".
Kuvia 17 (kansi-, avaus- ja ennen–nyt-kuvat; Iquitosin avauskaruselli 2 kuvaa);
kaikki 18 nostoa ja 16 nähtävyysjuttua kuvattomia (Commons 429). Pistokokeet:
(1) Townsvillen rata Charters Towersiin valmistui 12/1882 (en-Wikipedia
"Townsville", Transport; "Charters Towers", History); (2) Cook nimesi Magnetical
Islandin 1770 kompassihäiriön takia ("Magnetic Island", History); (3) Amazon
Iquitosissa korkeimmillaan toukokuussa, alimmillaan lokakuussa, 9–12 m
("Iquitos", Climate). Portit: fail 0, karttapisteet ok.

### Kaupunkilehdet Timbuktu + Lalibela — 97c8052 (tekstit), 1ace32e (kuvat) — OSITTAIN KUVITETTU
Tiedostot: faktapohja-/tarkistus-timbuktu.md ja -lalibela.md, kulttuuri-kategoriat.js,
maakartat.js, nahtavyysjutut.js, africa-artikkelit.js, piirra-kaupunkikartta.mjs,
assets/kartat/timbuktu-keskusta.png, lalibela-keskusta.png. Timbuktu: kansi
(synty ja nimi, azalai, 1873 ilman yhtä hallitsijaa, 15 km joesta), teemasivu
kirjallisuus "Kirjat ja oppineet". Lalibela: kansi (Roha ja mehiläiset,
artesinen vesi, 1873 Tekle Giyorgis II, tukul-talot), teemasivu kuvataide "Kivi
ja kuva". Kuvia 11 (Commonsin aineisto niukka: Timbuktun tuoreet kuvat
päiväysleimaisia; 12 hylätty). Lalibelan SAAPUMISTEKSTIÄ ei kirjoitettu:
lalibela on tests/vanha-maailma.test.mjs:n KAARETTOMAT-listalla — omistajan
linjaus. Pistokokeet: (1) Sankoré rakennettiin uudelleen Kaaban mitoilla
1578–1582 (en-Wikipedia "Sankoré Madrasah", History); (2) Laing Timbuktuun
18.8.1826, 38 päivää; laatta 1903 ("Alexander Gordon Laing", Trip to
Timbuktu); (3) Lalibelan risti n. 60 cm / 7 kg, varastettiin 1997, Belgiaan
1999, palautettiin 2001 ("Lalibela Cross"). Portit: fail 0, karttapisteet ok.

### Kaupunkilehdet Whitehorse + Yellowknife — 7c31c9f + 8ac5ecc (tekstit), c35b4f4 (kuvat) — OSITTAIN KUVITETTU
Tiedostot: faktapohja-/tarkistus-whitehorse.md ja -yellowknife.md, kulttuuri-kategoriat.js,
maakartat.js, nahtavyysjutut.js, piirra-kaupunkikartta.mjs, assets/kartat/whitehorse-
keskusta.png, yellowknife-keskusta.png. Whitehorse: kansi (Kwanlin Dün, 1873 ja
kulta, Miles Canyon, White Pass -rata, Robert Service), teemasivu "Laakso, sää ja
tie". Yellowknife: kansi (Sǫǫ̀mbak'è, 1873 Old Fort Providence, kaksi kansaa,
Con Mine, timantit ja Giant Minen arseeni), teemasivu "Järvi, jää ja kesäyö".
Kuvia 14 (kansi/avaus/nostoja; Commons 429). Whitehorse ilman ennen–nyt-paria.
Pistokokeet: (1) Whitehorse on Kanadan kuivin kaupunki (en-Wikipedia
"Whitehorse", Climate); (2) Yukonin kuninkuuslohella pisin makean veden
vaellus, yli 3 000 km ("Chinook salmon", Range); (3) valtikassa mursunnorsunluuta
ja Franklinin retkikunnan alusten puuta ("Northwest Territories Legislative
Building", Chamber). Portit: fail 0, karttapisteet ok.

## Kuvaputken tilaukset (kuvattomat nostot ja miniatyyrit)

**MOZ, kuvattomat nostot (8):**
- historia "Vesi, joka sitoo" — Baruen seutu: Ruenyan laakso tai Nyangan ylätasangon reuna Mosambikin puolella
- historia "Yhtiö, jolla oli oma pankki ja oma raha" — Beira 1900-luvun alussa tai Banco da Beiran seteli
- historia "Postimerkit, joita ei ollut tarkoitettu kirjeisiin" — Nyassan 1901 kirahvimerkki suurena
- musiikki "Sävellys, jossa pilkataan naapuria" — timbilaorkesteri soitossa, ei tunnistettavia kasvoja
- musiikki "Kitara peltipurkista" — peltipurkkikitara tai 1950-luvun HMV-savikiekko
- musiikki "Rytmi, joka ei ole Mosambikista" — kuubalainen comparsa-soittimisto (congat, bombo, lehmänkello, pasuuna)
- kuvataide "Tennisklubin pallopoika" — Malangatanan maalaus (tekijänoikeus, ei Commonsista)
- kuvataide "Savi, joka on vihreää grafiitista" — Reinata Sadimban keramiikkaa (sama varaus)

**Salta, kuvattomat nostot:** K1 perustaminen — Lerman ruudukko 1582 mitattuna;
K2 Milagro — kaksi laatikkoa Tyynellämerellä; K3 vuosi 1873 — muulikaravaani
tienvarsikaupungissa; K4 La Linda — siirtomaakadun julkisivurivi; K5 vuori —
trilobiitti kivessä; T1 peña — kitara ja pöydät peñassa; T2 zamba — pari
valkoisin nenäliinoin; T3 bombo legüero — puurunkoinen rumpu nuijineen; T4
runoilijat — nuottivihko ja kitara; T5 chacarera — bombo ja viulu.
**Salta, miniatyyrit (8):** Saltan kuvataidemuseo — ranskalaistyylinen kartano,
mansardikatto; La Merced -kirkko — kaksi tummaa tornihuippua; Korkean vuoriston
arkeologian museo — uusgoottilainen suippokaarijulkisivu; Saltan katedraali —
kaksi kellotornia, vaaleanpunainen barokkijulkisivu; Saltan cabildo — kaksi
kerrosta holvikaaria, kellotorni; San Franciscon basilika — punakeltainen
julkisivu, 54 m kellotorni; San Bernardon luostari — valkoinen muuri, veistetty
algarrobo-ovi; Güemesin muistomerkki — ratsastajapatsas kivikasan päällä.
**Antofagasta, kuvattomat nostot:** A1 — Juan López La Chimban rannalla; A2 nimi —
suolatasanko ja kuparimalmi; A3 1873 — allekirjoitettava sopimus; A4 — vuoden
1904 rajakartta; B1 kuivuus — sadeasteikko ilman sadetta; B4 — perunsuula ja
inkatiira kalliolla; kohdekartan Gibbsin talo — eklektinen 1915 talo Plaza del
Salitren laidalla; kaupunginteatteri — betonijulkisivu ja 1 200 m² muraali.
**Antofagasta, miniatyyrit (8):** Salpietarilaituri — kulunut puukansi, ruostuneet
nosturit; Antofagastan museo — valkoinen puinen tullitalo ulkoportaikkoineen;
Bolivian kauppapankin talo — viktoriaaninen erkkeri, kaksi kulmakupolia; Colónin
aukio — kellotorni ja katedraali palmujen takana; Gibbsin talo — ks. yllä;
Kaupunginteatteri — ks. yllä; Antofagastan katedraali — valkoinen
uusgoottilainen julkisivu; Giménezin talo — uusmauriainen kulmatalo
sevillalaisin laatoin.
**Nuuk, kuvattomat nostot:** Niemi, jolla on ollut neljä asukasta — Qoornoqin tai
Kangeqin rantatörmä turvemajan pohjineen; Kolme liikennevaloa eikä yhtään
tietä ulos — Nuukin katu liikennevaloineen, taustalla kallio ja meri; Kivi,
jossa saattaa olla vanhin elämä — Isuan raidallinen viherkivipaljastuma;
Sähkölinja, joka hyppää vuonon yli — Ameralikin vuono ja yksi johdin ilman
pylväitä; etusivukuva (PYSTY 0,60–0,85) — punainen katedraali tyhjää taivasta
vasten; opasjakso Torilla ja hallissa — Kalaaliaraq-tori ilman kasvoja.
**Nuuk, miniatyyrit (8):** Grönlannin kansallismuseo — punainen
siirtomaasataman varastorakennus vuonon rannalla; Hans Egeden talo — keltainen
puutalo vihrein listoin; Nuukin katedraali — punainen puukirkko
kellotorneineen; Kalaaliaraq-tori — torikatos, pöydillä tuoretta kalaa;
Inatsisartut — matala parlamenttitalo luodolla; Katuaq — aaltoileva
kullanvärinen puujulkisivu; Grönlannin kansalliskirjasto — vihreä julkisivu
nimikilvellä; Nuukin taidemuseo — vihreä puutalo pikkutornilla.
**Anchorage, kuvattomat nostot:** Kymmenen päivää väärässä vuonossa — Cook
Inletin suu ja Knik Arm ylhäältä; 1873: kaksi senttiä eekkeriltä — 1860-luvun
Alaskan kartta; Karhuja, joita ei osata laskea — mustakarhu pihatiellä; Puro,
jossa nousee kuningaslohi — Ship Creek tornien alla; etusivukuva (PYSTY) —
hirvi kaupungin kadulla; opasjakso Perille ja liikkeelle — Ted Stevensin
rahtiterminaali; opasjakso Talven suurin juhla — Fur Rondyn lumiveistos.
**Anchorage, miniatyyrit (8):** Anchoragen rautatieasema — valkoinen
Moderne-asema raiteiden vieressä; A.E.C.:n mökki 23 — 1910-luvun
rautatiemökki kuistilla (Commonsin kuva esittää mökkiä 25); Wendlerin talo —
valkoinen kulmatalo punaisine tornikattoineen; Alaska Center for the
Performing Arts — lasipäätyinen teatteritalo; Anchorage Museum — peilaava
lasijulkisivu; Anchoragen vanha hautausmaa — hautakiviä lehtipuiden alla;
Oscar Andersonin talo — pieni keltainen puutalo; Delaney Park Strip — leveä
nurmikaistale tornien edessä.

**Punta Arenas, kuvattomat nostot:** Sandy Point — punaiseksi maalatut peltikatot
lähempää; Vuosi 1873 — 1800-luvun siirtola salmen rannalla; Miljoona hehtaaria
lampaita — keritsemäsuoja tai lammaslauma Tulimaan arolla; 38 päivää salmessa —
salmen kapeikko ylhäältä; Beaglen jäljillä — 1800-luvun merikartta salmesta;
Hinaaja, joka haki 22 miestä — höyryhinaaja Yelcho jäissä; kohdekartan
Merisotamuseo — laivastokokoelman talo Pedro Montt -kadulla.
**Punta Arenas, miniatyyrit (8):** Lampuripatsas — pronssinen lampuri hevosineen
ja lammaslauma; Sara Braunin hautausmaa — leikatut sypressikäytävät ja
sukukappelit; Salesiaanien museo — museosali, kattoon ripustettu kanootti; Cerro
de la Cruz — mukulakivinen näköalatasanne, alla ruutukaava; Sagrado Corazónin
katedraali — tiilikirkko kellotorneineen; Braun-Menéndezin palatsi —
liuskekivikattoinen kulmatorni takorauta-aidan takana; Merisotamuseo — ks.
yllä; Salmen rantabulevardi — rantakatu, aallonmurtajaksi upotetun purjelaivan
mastot.
**Santa Cruz, kuvattomat nostot:** Chanét ja Grigotá — chané-keramiikkaa; Kolme
muuttoa — Santa Cruz la Viejan rauniot; Warnes, Florida ja seitsemän vuotta —
Warnesin muotokuva; Taquirari — taquiraritanssi ilman tunnistettavia kasvoja;
Chovena — chovena-jonot hattuineen; Yksitoista päivää — cruceño-karnevaalin
comparsa; ennen–nyt-parin vanha puoli — valokuva kaupungista ennen 1960;
kuvattomat kohdekartan jutut: Avión Pirata, El Arenalin puisto, Plaza 24 de
Septiembre, Noel Kempff Mercadon museo, Tahuichi Aguileran stadion.
**Santa Cruz, miniatyyrit (8):** Avión Pirata — puistoon jäänyt nelimoottorinen
Lockheed Constellation; Gabriel René Moreno -yliopisto — kampusrakennus Avenida
Buschin varrella; El Arenalin puisto — laguuni ja saari keskellä kaupunkia;
Yleinen hautausmaa — valkoiset kolumbaariokadut ja mausoleumit; Plaza 24 de
Septiembre — palmuaukio ja Warnesin patsas; San Lorenzon katedraali —
tiilinen kaksitorninen katedraali ylhäältä; Noel Kempff Mercadon museo —
luonnonhistoriallinen näyttelysali; Tahuichi Aguileran stadion —
jalkapallostadion kehäkatujen välissä.

**Dili ja Alice Springs:** KOKO kuvitus tilaamatta/hakematta — lista commitin
e3ac996 lohkokommenteissa (kulttuuri-kategoriat.js avaimet dili, alicesprings;
nahtavyysjutut.js). Miniatyyrit Dili (8): Motaelin kirkko — valkoinen kirkko
kellotorneineen ja pylväskuisteineen; Dilin satama — laituri riuttojen
reunustamassa lahdessa; Hallituspalatsi — kolme kaksikerroksista siipeä ja
pylväskäytävä meren puolelta; BNU-pankkitalo — modernistinen betoniritiläjulkisivu
pilarien päällä; Kansallisstadion — kaksi katsomoa ja nurmivallit;
Tuomiokirkko — 1980-luvun katedraali julkisivun puolelta; Kansallisarkisto —
arkiston rakennus kadulta; Kaupungin torihalli — puoliympyräportaali "Mercado
Municipal de Dili". Alice Springs (8): ANZAC Hill — laen muistomerkki ja näkymä
kaupunkiin; Totem-teatteri — matala peltinen Sidney Williams -halli;
Rautatieasema — 1980-luvun asemarakennus laitureineen; Stuart Town Gaol — matala
kivinen vankila peltikattoineen; Pioneer-teatteri — katottoman elokuvateatterin
julkisivu; Kaupunginkirjasto — rakennus ja ulkoseinän muraali; Australian
naisten museo — entisen vankilan portti ja muuri; Olive Pinkin puutarha — kuivan
alueen kasveja, taustalla MacDonnell-vuoret.
**Kumasi, kuvattomat nostot:** kaikki kansinostot (kum-puu, kultajakkara, liitto
1701, 1873 Wolseley, kaksi kuvausta, Kumawood) ja teemasivun puutarhakaupunki,
Owabi, metsätalous; matkaoppaan pystykuva — kente-kutoja kapean kangaspuun
ääressä; ennen–nyt-pari; kohdekartan jutut Prempeh II:n museo, eläintarha
(lepakot puissa), Kejetian tori, Ramseyerin kirkko, Rattrayn puisto.
**Kumasi, miniatyyrit (8):** Prempeh II:n museo — kulttuurikeskuksen matala
rakennusryhmä pihoineen; Kumasin eläintarha — puissa lepäävä lepakkoparvi;
Kejetian tori — peltikattojen meri ylhäältä; Komfo Anokyen sairaala — maahan
lyöty miekka kivijalustallaan; Kumasin linnake — punainen linnakerakennus
torneineen; Ramseyerin muistokirkko — kivikirkko tornikellotapuleineen; Baba
Yaran stadion — soikea stadion keltaisine katsomoineen; Rattrayn puisto —
tekojärvi ja tanssiva suihkulähde.
**Kano, kuvattomat nostot:** kronikka, Ali Yaji, Rumfa, 1873, marokkonahka,
maapähkinäpyramidit, hausa kauppakielenä; kohdekartan jutut Sabon Garin tori,
Kofar Matan indigokuopat (ilman ihmisiä), suurmoskeija (juttukuva), Gidan
Makaman museo.
**Kano, miniatyyrit (8):** Sabon Garin tori — muurien ulkopuolinen
kauppakortteli; Dala-kukkula — kallio kaupungin yllä ja porrastie; Kofar Matan
värjäämöt — pyöreitä indigokuoppia maassa; Sani Abachan stadion — stadionin
kaari ja hiekkakenttä; Kanon suurmoskeija — vihreä kupoli ja kaksi minareettia;
Gidan Rumfa — Kofar Kudun portti palatsimuurissa; Kofar Nassarawan portti —
savimuurin portti tien yli; Gidan Makaman museo — hausalaispihatalo
sisäpihoineen.
**Winnipeg, kuvattomat nostot:** "Winterpeg ja sen aurinko" — kaupunkikuva
pakkaspäivänä; "Kesä, joka tulee kerralla" — preerian ukkospilvi kaupungin yllä.
**Winnipeg, miniatyyrit (8):** Manitoban museo — Nonsuchin jäljennös
museosalissa; Pörssikortteli — tiilivarastoja ja terrakottajulkisivuja
talvikadulla; Burton Cummings -teatteri — julkisivu ja pystykyltti; Manitoba
Hydro Place — lasitorni ja ilmanvaihtopiippu; Kanadan ihmisoikeusmuseo —
lasipilvi ja Tower of Hope illalla; Saint-Bonifacen katedraali — tyhjä
ruusuikkuna palaneessa julkisivussa; Union Station — beaux-arts-asema
kupoleineen; Manitoban parlamenttitalo — kupoli ja Kultapoika.
**St. John's, kuvattomat nostot:** Fort William — muistolaatta tukimuurissa
Cavendish Squaren kulmassa (myös miniatyyri).
**St. John's, miniatyyrit (8):** Colonial Building — kuusi joonialaista
pylvästä ja vaakunapääty; Fort William — laatta tukimuurissa; Cabot Tower —
torni paljaalla kukkulalla, tie kiemurtelee ylös; The Battery — värilliset
talot kalliossa veden rajassa; Kansallinen sotamuistomerkki — viisi
pronssihahmoa ja seppeleet; Pyhän Johannes Kastajan basilika — harmaa
kivijulkisivu ja kaksi tornia; Anglikaaninen katedraali — uusgoottilainen
kirkko ilman torninhuippua; Water Street — matalat perintörakennukset rinteessä.

**Monterrey, kuvattomat nostot:** "Kuningasvuori, joka onkin kreivi" —
kalliopiirros Nuevo Leónin paimentolaisryhmiltä; ennen–nyt-pari (vanha puoli:
Obispadon kukkula 1904 tai vuoden 1791 kartta — päätös); kohdekartan Colegio
Civil — 1700-luvun lopun uusklassinen oppilaitos ja aukio; Meksikon historian
museo — valkoinen moderni museo kanavan varrella.
**Monterrey, miniatyyrit (8):** Museo del Obispado — kukkulan kellertävä
siirtomaatalo, kahdeksankulmainen kupoli; La Purísiman kirkko — betonikuoret
kaartuvat katoksi, kivinen kellotorni; Colegio Civil — uusklassinen
kaksikerroksinen oppilaitos ja aukio; Nuevo Leónin hallintopalatsi —
vaaleanpunainen cantera-julkisivu, Voiton patsas; Meksikon historian museo —
valkoinen kulmikas museo ja suihkulähdealtaat; Dulces Nombresin kappeli — pieni
kermanvalkoinen kappeli, kaksi kellokaarta; Monterreyn katedraali —
barokkijulkisivu ja yksi kellotorni; Barrio Antiguo — mukulakivikatu ja
värilliset siirtomaatalot.
**Mérida, kuvattomat nostot:** "Miksi kaupunkia sanotaan valkoiseksi" — kalkittu
matala katunäkymä; "Sota, joka kesti isoisän koko elämän" — mayakylä tai Puhuvan
ristin kappeli, ei taistelukuvaa; "Keitto, jonka nimi valehtelee" — sopa de lima.
**Mérida, miniatyyrit (8):** Santa Anan kirkko — keltainen kirkko kahden
valkoisen tornihuipun välissä; Peón Contrerasin teatteri — keltainen eklektinen
oopperatalo; La Mejoradan puisto — kivikirkko ja fransiskaaniluostarin muuri;
Casa de los Montejo — plateresco-portaali ja parvekkeen kivihahmot; Méridan
kaupunginmuseo — vanha postipalatsi, puna-valkoinen vinoruutufriisi; San Juanin
puisto ja kaari — valkoinen kaari kadun yli; San Cristóbalin kirkko —
kivijulkisivu, simpukankuoren muotoinen kaari; Santa Isabelin ermita — matala
keltainen kappeli, edessä puisto.

**Townsville ja Iquitos:** kaikki 18 nostoa ja 16 juttua kuvattomia. Tärkeimmät:
Iquitosin kolmas avauskuva — laaja yleiskuva keskustasta ilman kasvoja; Belén —
paalutaloja ja asuinlauttoja korkean veden aikaan; Castle Hill — vaaleanpunainen
graniittilaki ja Pyhimys-tikku-ukko kalliopinnalla.
**Townsville, miniatyyrit (8):** Queens Gardens — trooppinen puutarha, hoop-mäntyjä
ja mangopuita; Tobruk Memorial Baths — 50 m ulkoallas rannan vieressä; Vanha
tullitalo — kolonnadillinen romaaninen kaksikerroksinen talo; St James
-katedraali — punatiilinen katedraali kukkulalla, matala keskitorni; Tropiikin
museo — matala moderni museo, edessä hylkyankkuri; Vanha postitalo —
sementtirapattu renessanssitalo, kulmassa hoikka kellotorni; School of Arts —
1890-luvun kuisti- ja teatterirakennus; Great Northern Hotel — kaksikerroksinen
tiili- ja puuhotelli, isot parvekkeet.
**Iquitos, miniatyyrit (8):** Casa Morey — kumiparonin talo, takorautaristikot;
Kuvataidekoulu — matala koulu, amazonialainen muraali; Mercado Central —
esivalmisteinen rautahalli, myyntipöytärivit; Iquitosin katedraali —
uusgoottilainen kirkko ja 20 m kellotorni; Hotel Palace — art nouveau
-kulmatorni, kaakeloitu julkisivu; Malecón Tarapacá — betonoitu rantakatu
balustradeineen; Casa Strassberger — osittain raunioitunut kumikauden talo;
Plaza 28 de Julio — väljä aukio, obeliski.

**Timbuktu, kuvattomat:** kansikuvat 3 ja avauskuvat 3 — savikaupunki dyynien
keskellä; nimi — hiekkakumpujen leiripaikka ja kameleja; suolakaravaani —
kamelijono suolalaattoineen; joki — Kabaran kanava tulvan aikaan; Sankorén
opetus — oppilaita moskeijan pihalla; Ahmad Baba — 1500-luvun oppinut kirjojensa
ääressä; Leo Africanus — renessanssiajan kirja Afrikasta; jutut Laingin,
Cailliéen ja Barthin talot, al-Wangarin kirjasto, Sankorén moskeija, Ahmed Baba
-instituutti.
**Timbuktu, miniatyyrit (8):** Djinguereberin moskeija — savimoskeija,
pyramidiminareetista puupalkkeja; Gordon Laingin talo — matala savitalo,
muistolaatta oven yllä; René Cailliéen talo — savitalo hiekkakujalla; Sidi
Yahyan moskeija — koristeellinen puuovi, yksi minareetti; al-Wangarin kirjasto —
savitalo, hyllyllinen käsikirjoituksia; Heinrich Barthin talo — kaksikerroksinen
savitalo, muistolaatta; Sankorén moskeija — pyramidiminareetti hiekka-aukion
takana; Ahmed Baba -instituutti — matala moderni kivitalo kaariaukkoineen.
**Lalibela, kuvattomat:** kolmas kansikuva ja avauskuvat 3; mehiläiset
vastasyntyneen ympärillä; artesinen kaivo kirkon vieressä; Tekle Giyorgis II
Lastassa 1868; Lalibelan risti käsissä; kirkkojen ajoituskiista; jutut Biete
Giyorgis, Golgotha Mikael, Gabriel-Rufael, Lehem, Abba Libanos.
**Lalibela, miniatyyrit (8):** Biete Giyorgis — ristinmuotoinen monoliitti
kuilussaan ylhäältä; Biete Golgotha Mikael — sisäseinä ihmishahmoreliefeineen;
Biete Maryam — punakallioinen monoliitti ristinmuotoisine ikkunoineen; Biete
Medhane Alem — suuri monoliitti pilarikäytävineen; Biete Gabriel-Rufael —
kaarikäytävä kaivannon reunalla; Biete Lehem — pieni kallioon hakattu kammio;
Biete Abba Libanos — vuoreen kiinni jäänyt julkisivu portaineen; Biete Amanuel —
vapaasti seisova monoliitti, vaakapalkkikerrokset.

**Whitehorse, kuvattomat:** ennen–nyt-pari — vanha vedos 1898–1910 rannasta ilman
kehystä ja studioleimaa; avauskuvat 2 — yleiskuva keskustasta joen yli, laakso
vuorineen; etusivukuva (pysty) — SS Klondike tai Miles Canyon; nostot 1873
(kausileiri joen varrella), kosket (Miles Canyonin basalttikanjoni), rautatie
(kapearaiteinen juna), Robert Service (1900-luvun alun pankkikonttori),
kalaporras, ilmasto, Yukon Quest (valjakon lähtö), kolme vuorta; 7 juttua
(kaikki paitsi SS Klondike).
**Whitehorse, miniatyyrit (8):** MacBride-museo — hirsikattoinen museo
rantatörmällä; Kristuksen katedraali — pieni valkoinen anglikaaninen kirkko
tornineen; Yukonin parlamenttitalo — matala valkoinen teräsverhoiltu
virastotalo; SS Klondike — valkoinen siipiratasalus kuivalla maalla; Yukonin
liikennemuseo — tolpan päässä pyörivä hopeinen DC-3; Whitehorsen lentoasema —
pieni pohjoinen terminaali; Beringia-keskus — mammutti lumisessa
jääkausimaisemassa; Riverdale — matalia taloja joen itärannalla vuoren juurella.
**Yellowknife, kuvattomat:** etusivukuva (pysty) — revontulikuva ilman
vesileimaa; avauskuva 3 — kesäinen yleiskuva Frame Laken tai Old Townin yli;
kaikki 10 nostoa paitsi asuntolaivat; kaikki 8 juttua.
**Yellowknife, miniatyyrit (8):** Bank of Toronton hirsimökki — pieni hirsitalo,
jossa toimi pankki; Back Bayn hautausmaa — vanhoja puuristejä kallioisella
rannalla; Wildcat Cafe — hirsinen kahvilamökki; Weaver & Devoren kauppa —
vanha hirsinen sekatavarakauppa; Ragged Ass Road — päällystämätön katu ja
käsintehty kyltti; Luoteisterritorioiden parlamenttitalo — pyöreä sali
kattoikkunoineen; Prince of Walesin pohjoinen perintökeskus — museo järven
rannalla; Hirsikoulu — pieni yhden huoneen hirsikoulu.

## Päätöstä vaativat asiat

- **MAATESTIN_POIKKEUS laajeni VUT:iin** (tests/elaintakyt.test.mjs; sama kuin
  FJI/SLB M19:ssä: piste on maan monikulmion sisällä, laudan tyylitelty
  rantaviiva ei osu). Vahvista tai peru.
- **SHN:n eläintäky (tikkuri)** mahtuisi, jos yksi saaren 7 merkistä
  pudotetaan — sisältöpäätös.
- HKG:n (4 Victoria-sataman aihetta + Lei Cheng Uk), CYP:n (Tamassos, osuu
  Nikosian kohdekartan alueelle) ja FJI:n (Lau-saaret) loput vajeet vaativat
  kohdekarttatyötä tai lehden rajauksen levennystä, eivät pääkarttaa.
- VUT:n kookoskrapu on eläintäkytaulun ensimmäinen Commons-kuva (muut ovat
  omistajan generoituja havainnekuvia) — perustelu tietueen vieressä.

- MOZ: Malangatanan ja Reinata Sadimban kuvat vain tekijänoikeuden alaisina
  — omistaja päättää, hankitaanko muualta. Matapa-kuva kännykkätasoa (ainoa
  Commonsissa). Niassan luonnonpuisto jätettiin pois Myanmar-linjalla
  (käynnissä oleva selkkaus); uutissyötteessä näkyy ajoittain Cabo Delgadon
  otsikoita. Marrabenta on jo africa-kulttuuri.js:n nostona; maalehdessä vain
  maininta Fany Pfumon nostossa.

- Salta/Antofagasta: salpietarilaiturin piste siirretty es-Wikipedian
  koordinaatista (100 % vettä) laiturin alkupäähän rannalle; Antofagastan
  ennen–nyt-pari on sama kaupunki, ei sama katu (vanhassa kirjapainon
  kehysviiva) — voi jättää pois Lagosin tapaan; es-Wikipedia lähteenä 14/16
  nähtävyysjutussa; Llullaillacon lasten sävy (tarkistus-salta.md kohta G)
  vahvistettavaksi. Viereinen havainto: southamerica-artikkelit.js:n
  Bolivia-merkintä kertoo saman kymmenen sentin veron.
- Nuuk/Anchorage: molempien oppaiden etusivukuva puuttuu (Commonsissa ei
  ≥ 1200 px pystykuvaa) → kuvaputki. Viereinen havainto: tools/tarkista-tekijat.mjs
  ei odota 429:ää parvikuormassa.
- Punta Arenas/Santa Cruz: Punta Arenasin SAAPUMISTEKSTI (matkakirjateksti,
  ei tämän erän) väittää keskustan katujen köysistä tuulen takia — en-Wikipedia
  merkitsi väitteen lähteettömäksi 2015; Fable päättää muutoksesta. Santa
  Cruzin kuusi kohdetta vain es-Wikipediassa (Guatemalan lähderivi). Cerro de la
  Cruzilla ei omaa artikkelia (faktat "Punta Arenas"-artikkelista). Aukio ja
  katedraali 114 m päässä toisistaan (Fesin ennakkotapaus).
- Kumasi/Kano: Kanon Gidan Rumfan ja suurmoskeijan artikkelikoordinaatit
  identtiset → Wikidatan arvot; Kurmin tori pudotettu kartalta (tarkistus-kano.md
  F). Kumasin linnake kantaa GHA-skandaalin karttanoston (pakko, testi).
  Nykykonfliktit jätetty pois Kanosta. Viereinen: africa-valokuvat.js kano
  vanha puoli vain 760 px.
- Winnipeg/St. John's: Saint-Bonifacen julkisivu sekä avauskarusellissa että
  kohdekartan jutussa (tietoinen); St. John'sin teemasivu tiede eikä sää
  (Halifaxilla jo sumu); Beothuk-kansan häviäminen jätetty pois — ehdotus
  maalehden/karttanoston aiheeksi.
- Dili/Alice Springs: kuvitus kokonaan tekemättä (Commons 429) — joko
  kuvaputki tai uusi Commons-haku rauhallisempana hetkenä.
- Monterrey/Mérida: Monterreyn ennen–nyt (1791 kartta vai ei paria); Méridan
  San Juanin kaari sivuaa kansinostoa 2 (eri näkökulma); Macroplazan sijaluku
  ja kastisodan uhriluku kirjoitettu auki ristiriitoineen.
- Townsville/Iquitos: nostojen ja juttujen kuvitus (34 kohdetta) kokonaan
  tekemättä — uusi Commons-haku rauhallisena hetkenä tai kuvaputki. Viereinen:
  Oseanian ja Etelä-Amerikan introt eivät ole intron mittatestin piirissä.
- Timbuktu/Lalibela: Lalibelan saapumisteksti puuttuu (KAARETTOMAT-lista) —
  omistajan linjaus; Ali Farka Touré on MLI-maalehden aihe, ei siirretty;
  africa-valokuvat.js:n timbuktu-pari ei täytä nykyisiä kuvasääntöjä (403 px /
  päiväysleima).
- Whitehorse/Yellowknife: Whitehorse ilman ennen–nyt-paria (hyväksy tai tilaa
  vanha vedos); Radium Kingin lähderivi valokuvataulun muodossa (Commons:
  "Unknown author"). Viereinen: piirra-kaupunkikartta.mjs jättää ison svg:n
  assets/kartat/-kansioon (gitignoressa).

## Keskeneräiset

(täydennetään session päättyessä)
