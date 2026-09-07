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

## Keskeneräiset

(täydennetään session päättyessä)
