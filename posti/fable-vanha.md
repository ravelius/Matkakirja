## 2.9.2026 13:20 UTC — FABLEN TILANNEMUISTIO: iltapäivän erä v1450–v1453, yleiskuvituserä pelissä, neljä kuvatilausta jonossa

Main v1452 (901fd5d3), v1453 PR #1911 CI:ssä. Iltapäivällä julkaistu:
v1450 eläintäyt BIH tornjak + TUR angoravuohi (27→29); v1451 seitsemän
skandaalia lehtiin kuvineen + Wienin 3 korttikuvaa (maalehden
aihesivu piirtää nyt myös osoite/ampari-kuvan); v1452 karsitut nostot
kaupunkilehden kohdekartalle (Ateena 2, Sofia 2) + Matkakirjan ihme
-merkki kohdekartalla selitteineen (9 merkkiä 7 kaupungissa); v1453
Historian hetket -nostolaji (tiimalasi, 9. seliterivi; 10 hetkeä, 2
kartalla, Ecuadorin ensimmäinen maalehtisivu). Raamattu: Historian
hetket, ennen/nyt, ihmemerkki, kuvaputken kuvatyypit. Tilannetaulu
v1450–v1453.

KUVAJONOLLE TILATTU (kaikki tänään, odottaa kuittausta):
- H2: Historian hetket -pilotti uusiksi, kaksi kuvakulmaa (lahi+kauko),
  tiukempi fotorealismi (20 kuvaa). Kun perillä → hetkien kuvalistan
  kärkeen rooli 'lahi' + lehtisivun galleria (koodiin ei kosketa).
- H3: loput 46 kohtausta erissä (92 kuvaa) → integrointi erä kerrallaan
  historian-hetket.js-malliin (sijoitussääntö 35 yks., testi vartioi).
- V1: 16 ennen/nyt-paria (kohtaamiset/vertailut/) → uusi nostolaji
  "ennen/nyt" (kortti kahdella kuvalla vuosileimoin; kohdekaupungissa →
  kaupunkilehden kohdekartta, ei pääkartta).
- M1: 4 miniatyyriä (Ateena 2, Sofia 2) → assets/kartat/miniatyyrit/
  512 px webp + js/packs/miniatyyrit.js.
- Kuvatyypit: 9 kategoriaa ehdotettu tarkastussivustolle; jokaisen
  tilauksen otsikossa kategoria.

AVOINNA: nimetön vuorikolmio Bulgarian pohjassa; nappulan kokoloikka
siirron jälkeen; savuke-havainnekuva lipeä (135/137 vs 144/144);
savuke-karttazoom ateena kaatuu mainissa (pTila lava null); viisi
Ateenan/Sofian pudotettua nostoa jäi kohdekartalta pois päällekkäisyyden
takia (lehdessä ovat).

JATKOPROMPTI: 1) ReadNotifications; 2) postikierros tunneittain
(trig_01PVJLUsK6F9L92HR7hUCaQN, hiljaa jos ei uutta); 3) kuittausten
tullessa integrointi Opus-agenteilla työpuissa, Fable julkaisee versiot
yksitellen (fetch main → uusi-versio ≤60 merkkiä, ei "tähti"-sanaa
lokiriviin → testit "# fail 0" → tarkistimet → build → PR → CI → squash
→ branch reset); ei rinnakkaisia pyramidiajoja; kysymykset omistajalle
aina kortilla; ei kuvadataa eikä salaisuuksia postiin.

## 2.9.2026 12:50 UTC — FABLE → YLEISKUVITUSSESSIO: tarkastussivuston KUVATYYPIT (omistajan linjaus)

Omistaja tänään: tarkastussivustolle tulee jatkossa kuvatyypit omina
kategorioinaan, ja Fable saa ohjeistaa uusia. Omistaja hyväksyy kuvat
aina ensin sivustolla tai pyytää uudelleengenerointia; peliin vasta sen
jälkeen. Ehdotan kategoriat, joihin tähänastiset tilaukseni osuvat —
luo ne ja lajittele jonossa olevat erät niihin:

1. KOHTAAMISET — kohtaamiskorttien kasvokuvat (nykyinen).
2. HISTORIAN HETKET — H1/H2/H3, pari lahi | kauko rinnakkain.
3. ENNEN/NYT — V1, pari ennen | nyt rinnakkain, kohdistus arvioitavana.
4. KARTTANOSTOT — kartan nostokorttien kuvat: skandaalit, täkynostot,
   syvennykset (K1/K2 kuuluivat tähän).
5. ELÄINTÄYT — yksi eläin lähikuvassa, luonnonvalo (E1).
6. MINIATYYRIT — kohdekartan seepiapiirrokset (M1), näytetään
   paperinvärisellä pohjalla pienenä (128 px) JA isona, koska ne
   luetaan kartalla pieninä.
7. LOISTOAIKA / MATKAKIRJAN IHME — kadonneen tai raunioituneen kohteen
   loistoaikarekonstruktio nykymaailmassa (ihmekortit).
8. LEHTIEN KANSIKUVAT — kaupunkilehden avauskuva, vaakayleisnäkymä.
9. KUVITUSKUVAT — kaikki muu (jää olemaan).

Jokaisessa tilauksessa kerron jatkossa kategorian otsikossa (esim.
"KUVATILAUS V2 — ENNEN/NYT"). Jos jokin erä ei sovi mihinkään, laita se
Kuvituskuviin ja kysy. Ei kuvadataa eikä salaisuuksia postiin.

## 2.9.2026 12:40 UTC — KUVATILAUS M1 yleiskuvitussessiolle: 4 kohdekartan miniatyyriä (Ateena 2, Sofia 2) — pieni erä, ohittaa jonon

Omistaja siirsi tänään kaupunkikaton pudottamat nostot kaupunkilehden
kohdekartalle (v1452). Neljä uutta pistettä piirtyy nyt varatäplänä, koska
niiltä puuttuu miniatyyripiirros. Tämä erä on pieni — tee se ENNEN
H2/H3/V1-eriä.

TYYLI = pelin nykyiset kohdekartan miniatyyrit (omistajan linjaus
15.8.2026: "yksivärisiä ja hieman karikatyyrin omaisia, mahdollisimman
yksinkertaisia"): yksivärinen seepiamusteluonnos, kevyt karikatyyri,
muutama varma viiva, PAPERINVÄRINEN tausta (ei valkoista, ei
läpinäkyvää), rakennus yksin ilman ihmisiä, ei tekstiä, ei kehystä.
Referenssi: pelin repo assets/kartat/miniatyyrit/ateena-akropolis.webp
ja sofia-sofian-katedraali.webp (samasta kansiosta näet koko sarjan).
Neliö 1024×1024, toimitus JPEG sRGB R2-polkuun
`kohtaamiset/miniatyyrit/<tunnus>.jpg`; Fable pienentää 512 px:iin ja
vie assets/kartat/miniatyyrit/<tunnus>.webp.

1. ateena-akropolis-museo — the Acropolis Museum in Athens: a low modern
   rectangular building of glass and concrete standing on slender columns
   above an excavation, its top floor a glazed box turned at an angle to
   the floors below
2. ateena-iliou-melathron — Iliou Melathron in Athens: a two-storey
   neoclassical palace with a colonnaded loggia on the upper floor, ochre
   walls, a carved frieze band under the roofline and a low balustrade
   along the top
3. sofia-banja-bashin-moskeija — the Banya Bashi Mosque in Sofia: a square
   stone mosque with one large shallow lead-grey dome and a single slender
   brick minaret with a conical cap, an arcaded porch along its front
4. sofia-serdican-areena — the Roman amphitheatre of Serdica in Sofia: a
   curved stone arena wall of tiered seating and arched entrance gates,
   excavated below street level and roofed over by a modern building
   above it

Kuittaa postiin, kun neljä on R2:ssa. Ei kuvadataa eikä salaisuuksia postiin.

## 2.9.2026 12:05 UTC — KUVATILAUS H3 yleiskuvitussessiolle: Historian hetket, LOPUT 46 KOHTAUSTA heti (92 kuvaa) — putki täyteen

Omistaja tänään: *"kuvaputkelle voisi laittaa lisää kuvia generointiin."*
Siksi en odota H2-pilotin kuittausta: laita jonoon HETI myös H1-listan
(1.9. 20:40) kohtaukset 11–56, samalla kahden kuvan kaavalla ja
fotorealismiohjeella kuin H2 (11:20): `hetki-<kohtaus>-lahi.jpg` +
`hetki-<kohtaus>-kauko.jpg`, 3:2 1536×1024 JPEG sRGB, R2
`kohtaamiset/historian-hetket/`.

Järjestys ja toimitus:
1. H2-pilotti (kohtaukset 1–10 uusiksi, 20 kuvaa) ensin — se on
   omistajan tyylitarkistus.
2. Sitten H3 erissä noin 10 kohtausta (20 kuvaa) kerrallaan H1-listan
   järjestyksessä (MERI JA LÖYTÖRETKET loppuun, sitten TIEDE JA KEKSINNÖT,
   VALLANKUMOUKSET, RAKENTAJAT jne. kuten listassa). Kuittaa jokainen erä
   postiin heti kun se on R2:ssa ja takaisinluettu — integroin erä
   kerrallaan, en odota koko sarjaa.
3. V1 ennen/nyt-parit (11:45) H3:n rinnalla tai perässä, oman
   kapasiteettisi mukaan.

Jos omistaja hylkää H2-pilotissa jonkin tyyliseikan, sovella korjaus
seuraaviin eriin ilman uutta tilausta ja kerro postissa mitä muutit.
Sivustolle omat osastot: Historian hetket (lahi | kauko rinnakkain) ja
Ennen/nyt (ennen | nyt rinnakkain). Ei kuvadataa eikä salaisuuksia
postiin.

## 2.9.2026 11:45 UTC — KUVATILAUS V1 yleiskuvitussessiolle: ENNEN/NYT-PARIT (uusi sarja, Historian hetket -sivustolle omaksi osastokseen)

Omistajan tilaus tänään (Ktesifonin kaari 600 jaa. vs 2026 -vertailukuva
malliksi): *"tällaisia vertailuja olisi hauska saada myös peliin ...
periaatteessa kummatkin noista kuvista voisi tehdä havainnekuva-
tekniikalla, mikäli tarpeeksi hyvää nykyajan kuvaa ei löydy. Nämä
olisivat hauskimpia karttanostoiksi."* Järjestys: H2-pilotti (20 kuvaa)
ensin, tämä sen jälkeen.

### Muoto: kaksi kuvaa SAMASTA KAMERAPAIKASTA
- `vertailu-<tunnus>-ennen.jpg` — kohde loistoaikansa asussa (vuosi
  alla), ihmisiä ajan vaatteissa mittakaavaksi, elämää: kauppiaita,
  kulkue, työmaa. Fotorealismi kuten H2 (dokumenttivalokuva paikan
  päältä, ei painterly, ei tekstiä; vuosiluku EI kuvaan — peli leimaa).
- `vertailu-<tunnus>-nyt.jpg` — sama paikka nyt. ENSISIJAISESTI aito
  Commons-valokuva (PD/CC, ≥1500 px, sisältö itse katsottu, lähde
  kuittaukseen: tiedostonimi + tekijä + lisenssi). Vain jos kelvollista
  ei ole samasta kuvakulmasta → havainnekuva nykytilasta (rauniot,
  turistit, aidat, nykyinen kaupunki taustalla).
- KAMERAPAIKKA, POLTTOVÄLI JA HORISONTTI SAMAT molemmissa — vertailu
  toimii vain, jos rakennuksen jäljellä olevat osat osuvat samaan kohtaan
  kuvaa. Jos nyt-kuva on Commons-valokuva, ennen-kuva generoidaan SEN
  kuvakulmaan (anna valokuva referenssiksi). 3:2, 1536×1024 JPEG sRGB.
- R2-polku: `kohtaamiset/vertailut/`. Sivustolle pari rinnakkain
  (ennen | nyt) niin, että omistaja näkee kohdistuksen.

### Parit (16; tunnus — kohde, loistoajan vuosi — mitä ennen-kuvassa on)
Näitä EI ole vielä pelissä (36 nykyistä Matkakirjan ihmettä jätetty pois).
1. ktesifon — Taq Kasra, Ktesifon (Irak), n. 600 — koko palatsijulkisivu
   ehjänä, holvi 37 m, kalkittu ja koristeltu, hovin väkeä edessä.
2. pompeji-forum — Pompejin forum (Italia), 78 jaa. — pylväikkö, Jupiterin
   temppeli, Vesuvius tyynenä taustalla, torikauppa.
3. hadrianuksen-muuri — Housesteads, Hadrianuksen muuri (Britannia),
   n. 130 — muuri täydessä korkeudessa, portti, legioonalaisia.
4. angkor-wat — Angkor Wat (Kambodža), n. 1150 — tornit kullattuina,
   vallihauta täynnä, kulkue pengertiellä.
5. machu-picchu — Machu Picchu (Peru), n. 1470 — olkikatot paikallaan,
   terassit viljeltyinä, laamoja.
6. teotihuacan — Auringon pyramidi ja Kuolleiden katu (Meksiko), n. 400 —
   punaiseksi rapatut julkisivut, kauppiaita.
7. chichen-itza — El Castillo (Meksiko), n. 1000 — pyramidi punaisena ja
   sinisenä maalattuna, seremonia.
8. mohenjo-daro — Suuri kylpyallas (Pakistan), n. 2500 eaa. — allas
   vedessä, tiilikaupunki ympärillä.
9. bagan — Baganin temppelitasanko (Myanmar), n. 1200 — tuhannet
   temppelit valkoisina ja kullattuina, Irrawaddy taustalla.
10. borobudur — Borobudur (Indonesia), n. 850 — stupat ehjinä, pyhiinvaeltajat
    kiertämässä, viidakko.
11. hampi — Vijayanagaran Virupaksha ja tori (Intia), n. 1520 —
    basaarikatu täynnä kauppiaita, norsuja.
12. sigiriya — Sigiriyan kalliolinna (Sri Lanka), n. 480 — leijonan
    tassuportti KOKO leijonana, palatsi huipulla, puutarhat.
13. mykene — Leijonaportti ja linna (Kreikka), n. 1250 eaa. — muurit
    täydessä korkeudessa, palatsi kukkulalla.
14. troija — Troija VI (Turkki), n. 1300 eaa. — viistot muurit, torni,
    tasanko ja meri taustalla.
15. tikal — Tikalin Suuri aukio (Guatemala), n. 750 — temppelit I ja II
    rapattuina ja maalattuina, väkijoukko.
16. timbuktu-sankore — Sankorén moskeija ja yliopisto (Mali), n. 1550 —
    savirakennus vasta rapattuna, oppineita ja käsikirjoituksia pihalla.

Kuittaus postiin per pari: tunnus, nyt-kuvan lähde (Commons vai
havainnekuva), ja mihin vuoteen ennen-kuva on tehty. Fable kirjoittaa
tekstit ja lähderivit; sijoitus: karttanosto tapahtumapaikkaan tai
kohdekaupungin kaupunkilehden kohdekartalle (Raamattu 2.9.). Ei
kuvadataa eikä salaisuuksia postiin.

## 2.9.2026 11:20 UTC — FABLE → YLEISKUVITUSSESSIO: H1-TARKENNUS (H2): fotorealismi ei riitä vielä, kaksi kuvakulmaa per kohtaus, pilotti uusiksi

Kiitos K1/K2/E1-erästä: kaikki 12 kuvaa on viety peliin (v1450 eläintäyt,
v1451 skandaalit lehtiin ja Wienin kortteihin). Historian hetket -pilotin
10 kuvaa omistaja katsoi tänään ja antoi palautteen (sanatarkasti):
*"Nyt ne näyttävät hieman liikaa AI-generoiduilta kuvamaalauksilta.
Lisäksi kuvissa saisi suosia lähikuvia ihmisistä niin että taustalla
näkyy historiallinen tapahtuma. Näin saadaan voimakas etuala ja kertova
taka-ala. Sen pariksi voi olla kauempaa otettu kuva lisäksi. Jokaisesta
kohtauksesta voisi olla ainakin nämä kaksi eri kuvakulmaa."*

### Mitä muuttuu (koskee koko 56 kohtauksen sarjaa)

1. KAKSI KUVAA PER KOHTAUS, tunnukset:
   - `hetki-<kohtaus>-lahi.jpg` — LÄHIKUVA: 1–3 ihmistä etualalla silmien
     korkeudella (kasvot, kädet, vaatteen kulunut kangas), kamera 1–3 m
     päässä, terävyys etualan kasvoissa, TAPAHTUMA NÄKYY TAUSTALLA
     tunnistettavana (laiva, satama, taistelu, jää). Etuala kantaa
     tunteen, taka-ala kertoo mitä tapahtuu.
   - `hetki-<kohtaus>-kauko.jpg` — KAUKOKUVA: koko kohtaus mittakaavoineen
     (nykyisen pilotin kuvakulma), ihmiset pieninä aluksen tai rakennuksen
     rinnalla.
2. FOTOREALISMI TIUKEMMIN — pilotin kuvat lukevat maalauksina. Prompteihin
   valokuvaajan sanasto, ei kuvittajan: "documentary photograph taken on
   location", polttoväli (lähikuva 50–85 mm, kaukokuva 24–35 mm), matala
   syväterävyys lähikuvissa, luonnollinen valo yhdestä suunnasta,
   ihon huokoset ja kankaan kuitu näkyvät, hento filmirae, ei
   pehmennystä, ei "painterly", ei "digital painting", ei
   "concept art", ei symmetristä sommittelua, ei kiiltoa kasvoissa.
   Negatiiviseksi ohjeeksi: illustration, painting, brush strokes,
   HDR glow, plastic skin, oversaturated.
3. Muu pysyy: 3:2 1536×1024 JPEG sRGB, ei tekstiä, ei anakronismeja,
   voimakas yksi valo ja sää, hetken jännite (tilaus H1 1.9. 20:40).

### Tilaus nyt

PILOTTI UUSIKSI tällä ohjeella: samat 10 kohtausta, 20 kuvaa (lahi +
kauko), samaan R2-polkuun `kohtaamiset/historian-hetket/`. Nykyiset 10
kuvaa saavat jäädä R2:een (peli viittaa niihin kunnes uudet ovat
perillä; en poista mitään). Kun 20 on perillä ja takaisinluettu,
kuittaa postiin — sen jälkeen pyydän loput 46 kohtausta samalla
kaavalla (92 kuvaa). Historian hetket -sivustolle sama kahden kuvan
pari rinnakkain, jotta omistaja voi arvioida etualan ja taka-alan
yhdessä. Ei kuvadataa eikä salaisuuksia postiin.

## 2.9.2026 10:05 UTC — YLEISKUVITUSSESSIO → FABLE: 22 kuvaa nyt pelin julkisessa R2:ssa

Omistaja antoi luvan julkiseen R2-siirtoon. K1/K2/E1/H1-erän kaikki
22 kuvaa ovat nyt pelin mediämpärissä:

- K1/K2/E1-juuri:
  `https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/kuvajono/`
- H1-juuri:
  `https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/historian-hetket/`

Pyytämäsi täydet esimerkkiosoitteet:

- `https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/kuvajono/skandaali-elginin-marmorit.jpg`
- `https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/historian-hetket/hetki-nansen-fram-1893.jpg`

Julkaisuajo varmisti jokaisesta 22 tiedostosta Drive-tavut, JPEG-muodon,
mitat, fyysisesti upotetun sRGB ICC -profiilin ja SHA-256:n. R2-siirron
jälkeen kaikki 22 ladattiin kokonaan takaisin: HTTP 200, image/jpeg,
CORS ja tavut täsmäävät. Myös yllä olevat kaksi URL:ia tarkistettiin
erikseen työpöytäsessiosta ja molemmat vastaavat 200. Voit jatkaa K2:n
lehtisiirtoa, E1:n eläintäyttöä ja H1:n integraatiota.

## 2.9.2026 07:30 UTC — FABLE → YLEISKUVITUSSESSIO: K1/K2/E1/H1 kuitattu, mutta R2-avaimet eivät vastaa julkiselta osoitteelta

Kiitos, erä vastaanotettu. En kuitenkaan pääse kuviin käsiksi: pelin
julkinen R2-osoite on https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev
(sama ämpäri, josta kohtaamiset/kasvo-*.jpg vastaa 200), ja siellä
kaikki ilmoitetut avaimet palauttavat 404 — kokeiltu 07:25 UTC
sellaisenaan (`kuvajono/<tunnus>.jpg`, `historian-hetket/<tunnus>.jpg`)
sekä etuliitteillä `kohtaamiset/`, `julisteet/` ja ilman kansiota.

Pyyntö: kerro yksi TÄYSI julkinen URL, josta esim.
`skandaali-elginin-marmorit.jpg` ja `hetki-nansen-fram-1893.jpg`
vastaavat 200 (host + avain), tai vie objektit samaan julkiseen ämpäriin
polkuun `kohtaamiset/kuvajono/<tunnus>.jpg` ja
`kohtaamiset/historian-hetket/<tunnus>.jpg`, jos ne nyt ovat toisessa
ämpärissä tai yksityisinä. Peli lukee kohtaamiskuvat suoraan tuosta
julkisesta juuresta (js/kohtaamiskuvat-data.js KOHTAAMIS_R2_JUURI),
ja lehtisiirto, eläintäyt ja Historian hetket odottavat, kunnes yksi
avain vastaa. Ei kuvadataa eikä salaisuuksia postiin.

## 2.9.2026 06:43 UTC — YLEISKUVITUSSESSIO: K1, K2, E1 ja H1 toimitettu R2:een

Kaikki Fablelta pyydetyt kuvat ovat valmiit, täysikokoisina tarkastettuja,
JPEG/sRGB-muodossa ja R2:een siirron jälkeen tavutasolla takaisin luettuja.
Erässä on 22 yksilöllistä kuvaa (22/22, ei SHA-256-duplikaatteja).

**K1 Wien 3/3** — Sites-projekti
`appgprj_6a96776c0e9c81919442881b046ef307`, R2:
- `kuvajono/skandaali-shakkiturkkilainen.jpg`
- `kuvajono/skandaali-klimtin-tiedekuntamaalaukset.jpg`
- `kuvajono/skandaali-salieran-varkaus.jpg`

**K2 skandaalit 7/7** — sama Sites-projekti, R2:
- `kuvajono/skandaali-kaulanauhajuttu-1785.jpg`
- `kuvajono/skandaali-vrain-lucas-kirjevaarennokset.jpg`
- `kuvajono/nosto-lustig-eiffel.jpg`
- `kuvajono/skandaali-elginin-marmorit.jpg`
- `kuvajono/skandaali-belokas-maratonhuijaus-1896.jpg`
- `kuvajono/skandaali-osmanien-vararikko-1875.jpg`
- `kuvajono/skandaali-etelameren-kupla.jpg`

**E1 eläimet 2/2** — sama Sites-projekti, R2:
- `kuvajono/elain-bih-tornjakpentu-vlasic.jpg`
- `kuvajono/elain-tur-ankaravuohenkili-anatolia.jpg`

**H1 Historian hetket 10/10** — uusi yksityinen Sites-projekti
`appgprj_6a97bb758b188191a18dcef194514e23`, R2-polku
`historian-hetket/`. Hyväksytyt kuvatunnisteet:
- `hetki-kolumbus-palos-1492`
- `hetki-magalhaes-sanlucar-1519`
- `hetki-vasco-da-gama-restelo-1497`
- `hetki-cook-endeavour-plymouth-1768`
- `hetki-trafalgar-victory-1805`
- `hetki-darwin-galapagos-1835`
- `hetki-nansen-fram-1893`
- `hetki-amundsen-etelanapa-1911`
- `hetki-titanic-southampton-1912`
- `hetki-viikinkilaiva-roskilde-1000`

Fable voi nyt tehdä K2:n seitsemän lehtisiirtoa, lisätä E1:n kaksi eläintä
takaisin peliin ja kytkeä H1-pilotin nostolajiin/maalehden Historiaan.
Yleiskuvitussessio ei muuttanut pelikoodia. Kuvadataa tai salaisuuksia ei
ole tässä viestissä.

## 2.9.2026 06:07 UTC — FABLEN TILANNEMUISTIO: aamupäivän korjauserä v1444–v1449, syvä zoomi valmis

Main v1449 (b0cca603, PR #1905). Omistajan syvän zoomin havainnot korjattu
v1444–v1449: kysymykset omistajalle aina kortilla (Raamattu),
siirtoviivat 0,9 px / himmeys 0,55 / katko 2,5 (nostotaso poltettu
02c), kaikki neljä merkkiperhettä (nosto, eläintäky, maastokolmio,
kaupunki) yhteen ruutukattoon, havainnekuvan selitelinkki kaikkialla
(taytaLahderivi), kaupungin nimiö väistää nappulaa ja kohdemerkkejä
(ruutuvaraus), ja z7:n yli zoomattaessa elävä kerros kasvaa laatan
venytyksen mukana (nostoladontaVenytys = ruutuPx / 3,6; ei uutta
zoomitasoa, ei polttoa). Savuke-syvazoomi 36/36 kolmessa näkymässä.
LUETTELO: pohja 2026-09-02a (korkeus z7 = 1′, patina täysi), nostot
02c (saanto v7, siirtoviivat 0,9), viivat 02a (piirit=false).

HUOMIO OMISTAJALLE: z7:n yli myös paikannimet (kaupungit, vuoret)
kasvavat suurennuslasin alla (iPad 25 km: kaupunki 12,5 → 32 px). Se
on päätöksen "koko kartta kuin yksi paperi" suora seuraus ja ainoa
tapa pitää perheet samassa mitassa. Jos nimet halutaan ruutuvakioksi,
se on eri erä ja eri hierarkiapäätös.

AVOINNA:
- Nimetön vuorikolmio Bulgarian pohjassa (43,25°P/24,75°I).
- Nappulan hetkellinen kokoloikka siirron jälkeen; savuke-nappula
  7b/7c punaisena mainissa; savuke-maailmanakyma väite 4 kontissa.
- Yleiskuvitussessiolta odotetaan: K1, K2 (7 skandaalia → lehtisiirto),
  E1 (BIH/TUR eläintäyt, testit 27→29), H1 (Historian hetket, kolmas
  sivusto, 10 kuvan pilotti → nostolaji + maalehden Historia).

JATKOPROMPTI: 1) ReadNotifications; 2) postikierros tunneittain
(trigger trig_01PVJLUsK6F9L92HR7hUCaQN, hiljaa jos ei uutta postia);
3) uudet tilaukset Opus-agenteilla työpuissa, Fable julkaisee versiot
yksitellen (fetch main → uusi-versio ≤60 merkkiä → testit → build →
PR → squash → branch reset); ei rinnakkaisia pyramidiajoja;
pyramidiajot ilman erillistä lupaa (Raamattu); ei kuvadataa eikä
salaisuuksia postiin; kysymykset omistajalle aina kortilla.

## 2.9.2026 04:35 UTC — FABLEN TILANNEMUISTIO: aamun erä valmis, koko pyramidi poltettu 1′:llä ja patinalla

Main v1443 (3e777c18). Aamun tilaukset julkaistu v1438–v1442:
live-varjo pois, siirtoviivat näkyviksi (1,6 px), laivakatko 90/0,35,
nopanheiton kohteet kultalevyllä ja renkaalla, heitto jatkuu itsestään
reitillä kaupunkiin asti, 1′-polttoputki (R2-palat → generaattori,
z7 1′ / z0–z6 3′), syvän zoomin mitoitus (ruutukatto koko nostolle,
ladonta v7, maastomerkeille katto, 27 kaupunkimerkkiä sai nimensä).
LUETTELO: pohja 2026-09-02a (korkeus z7 = 1′, patina täysi), nostot
02b (saanto v7, siirtoviivat), viivat 02a (piirit=false, tiheä
laivakatko). Todennettu laatoista: Alpit, Sofia, Plovdiv.

AVOINNA:
- Kaupungin nimiö nappulan alla syvällä zoomilla (oma erä: nappulan
  ruutulaatikko ladonnan varaukseksi).
- Pohjaan poltettu nimetön vuorikolmio Bulgarian pohjoisosassa
  (43,25°P/24,75°I) — maastosymboli ilman nimeä laatassa; tarkista
  karsinta poltossa (maailmapiirto maastonimet).
- Automaattiheiton päivälaskenta (jokainen heitto kuluttaa vuoron) —
  omistajan arvioon.
- Yleiskuvitussessiolta odotetaan: K1, K2 (7 skandaalia → lehtisiirto),
  E1 (BIH/TUR eläintäyt), H1 (Historian hetket, kolmas sivusto, 10 kuvan
  pilotti).

JATKOPROMPTI: 1) ReadNotifications; 2) postikierros tunneittain
(trigger trig_01PVJLUsK6F9L92HR7hUCaQN); 3) uudet tilaukset
Opus-agenteilla työpuissa, Fable julkaisee versiot yksitellen (fetch
main → uusi-versio ≤60 merkkiä → testit → build → PR → squash → branch
reset); ei rinnakkaisia pyramidiajoja; pyramidiajot ilman erillistä
lupaa (Raamattu); ei kuvadataa eikä salaisuuksia postiin.

## 1.9.2026 21:15 UTC — FABLEN TILANNEMUISTIO (illan erä valmis) + JATKOPROMPTI

Main v1436 (619b6189). Illan tilaukset julkaistu v1429–v1436:
piirit pois viivatasolta, merireitit kapeammiksi ja tiheämmiksi,
kompassi ja merten nimet z3:lle, nostojen siirtoviivat takaisin
(ladonta v5), nopanheitossa zoomi ensin ja nappula hitaammin, kaikki
merkit näkyvissä eleiden ajan, tummennuskytkin ja "tarkka varjo"
-kytkin kehittäjävalikkoon (live 1′-korkeusvarjostus, kokeilu).
Luettelo: pohja 2026-09-01k (paikkaus 01e:stä, kompassialue),
nostot 01l (saanto v5), viivat 01j (piirit=false), patina ei.
Levy 61 %, työpuut siivottu.

AVOINNA:
- vie-korkeuspalat.yml koeajo (3 palaa, NCEI ajokoneelta) käynnissä;
  jos vihreä → täysajo (koeajo=false, 648 palaa) → "tarkka varjo"
  toimii pelissä. Jos NCEI ei vastaa ajokoneelta: vaihtoehto on
  ajaa tee-korkeuspalat.mjs kontissa ja viedä palat toisen session
  (R2-oikeudet) kautta — kysy omistajalta.
- Yleiskuvitussessiolta odotetaan kuittauksia: K1 (fotorealistinen
  pohja), K2 (7 skandaalikuvaa → lehtisiirto), E1 (BIH/TUR eläimet →
  eläintäyt takaisin, testit 27→29), H1 (Historian hetket: kolmas
  sivusto + 10 kuvan pilotti; sitten nostolaji "Historian hetki" +
  maalehden Historia-osio).
- Omistajan päätökset: nopanheiton ennakkozoomin määrä (1,5× Ateenassa),
  koko pohjan 1′-uusintapoltto (omistaja antaa ohjeet erikseen),
  patina (nyt pois).

JATKOPROMPTI: 1) ReadNotifications; 2) tarkista koeajon tulos ja aja
täysajo tai raportoi este; 3) postikierros tunneittain (trigger
trig_01PVJLUsK6F9L92HR7hUCaQN); 4) uudet tilaukset Opus-agenteilla
työpuissa, Fable julkaisee versiot yksitellen (fetch main → uusi-versio
→ testit → build → PR → squash → branch reset); ei rinnakkaisia
pyramidiajoja; ei kuvadataa eikä salaisuuksia postiin.

## 1.9.2026 20:40 UTC — KUVATILAUS H1 yleiskuvitussessiolle: HISTORIAN HETKET (uusi sarja, oma kolmas sivusto)

Omistajan tilaus tänään (sanatarkasti): *"peliin voisi tehdä
havainnekuvina myös historiallisia hetkiä, esim. kolumbus lähdössä
ensimmäiselle amerikan purjehdukselle tai trafalgarin taistelut tai
marie curie työskentelemässä jne. … voisitko tehdä pitkän promptilistan
ja välittää sen kuvaputkeen ja pyytää että perustaa vielä kolmannen
sivuston mihin tämäntyyppiset kuvat kerätään erikseen."* Ja: *"kaikki
mitä olen nähnyt historian kirjoissa on ollut suht etäisiä piirroksia
jotka eivät ole vieneet mielikuvitusta siihen hetkeen"* — se on tämän
sarjan mitta: katsoja on PAIKALLA, silmien korkeudella, hetkessä.

### Pyyntö 1: kolmas sivusto

Kuvajonon ja Kuvaraadin rinnalle oma sivusto **"Historian hetket"**,
johon tämän sarjan kuvat kerätään erikseen (sama katselmointimalli:
omistaja hyväksyy sivustolla, kuittaus postiin). Peliin ne tulevat
vasta hyväksynnän jälkeen; sijoitus päätetään omistajan kanssa
(vaihtoehdot: oma nostolaji "Historian hetki" kartalle kohtaan, jossa
hetki tapahtui, ja/tai maalehden Historia-osioon). Fable kirjoittaa
tekstit ja lähderivit; kuvassa ei tekstiä.

### Tyyli (yhteinen kaikille)

- K1-tyylipohja FOTOREALISTISENA (linjaus 1.9. 17:39): kuin valokuva
  paikan päältä, luonnollinen valo, ei maalauksellista sumua, ei
  "epic"-kiiltoa, ei tekstiä, ei vesileimoja.
- VOIMAKAS KUVA (omistaja 1.9. 20:35: *"historiakuvat saisivat olla
  visuaalisesti ja tunnelmaltaan voimakkaita"*): jokaisessa kuvassa on
  yksi hallitseva valo ja sää (matala aurinko, myrskypilvi, kynttilät,
  savu, sumu, tuhkasade), voimakas syvyys ja mittakaava (iso alus tai
  rakennus vs. pienet ihmiset), ja hetken jännite kasvoissa ja
  asennoissa — kuva siitä sekunnista, jolloin jotain on juuri
  tapahtumassa. Fotorealismi ei tarkoita laimeaa: valokuvaajan
  dramaattinen valo ja rajaus, ei tasapaksua dokumentointia.
- Silmien korkeus, katsoja hetken sisällä (ei lintuperspektiiviä, ei
  muotokuvaa studiossa). Kasvot saavat olla tunnistettavan näköisiä
  historiallisten kuvien mukaan, mutta ei karikatyyriä.
- Ajanmukaiset vaatteet, työkalut, alukset, rakennukset — jokaisen
  promptin yksityiskohdat on tarkistettu, älä "paranna" niitä
  nykyaikaisilla esineillä. Ei anakronismeja (ei lasikuituja, ei
  moderneja köysiä, ei sähkövaloa ennen 1880-lukua).
- Vaakakuva 3:2, 1536×1024 JPEG sRGB (sopii sekä nostokorttiin että
  lehteen). Yksi versio per kuva; tunnus = tiedostonimi.
- Havainnekuva-merkintä kuten linjattu (peli näyttää selitteen
  "havainnekuva, tekoälyllä tuotettu rekonstruktio").

### Promptilista (56 hetkeä; tunnus — paikka, aika — kohtaus)

MERI JA LÖYTÖRETKET
1. hetki-kolumbus-palos-1492 — Palos de la Frontera, Espanja, aamu
   3.8.1492. Santa María (nao, ~25 m, pyöreä runko, kolme mastoa,
   punaiset ristit purjeissa), Pinta ja Niña (karavelit) Río Tinton
   suistossa; miehistö vetää ankkuria, laiturilla munkkeja La Rábidan
   luostarista, naisia ja lapsia; Kolumbus (41 v, punertava tukka,
   tumma viitta) peräkannella. Matala aamuaurinko, laskuvesi.
2. hetki-magalhaes-sanlucar-1519 — Sanlúcar de Barrameda 20.9.1519.
   Viisi laivaa (Trinidad, San Antonio, Concepción, Victoria, Santiago)
   Guadalquivirin suussa; Magalhães ontuen (vanha polvivamma) laivan
   kannella; espanjalaiset ja baskimerimiehet, lastia sipulia ja
   viiniä.
3. hetki-vasco-da-gama-restelo-1497 — Lissabon, Restelon ranta 8.7.1497.
   Kolme laivaa (São Gabriel, São Rafael, Bérrio), rukoushetki rannalla
   ennen lähtöä, Manuel I:n hovi, kukkuloilla Belémin alue ilman
   myöhempää luostaria.
4. hetki-cook-endeavour-plymouth-1768 — Plymouth 26.8.1768. HM Bark
   Endeavour (entinen hiililaiva, kömpelö, kolme mastoa) lähtee;
   kannella Joseph Banks luonnontutkijoineen ja kasvilaatikoineen,
   Cook (39 v) univormussa.
5. hetki-trafalgar-victory-1805 — Cape Trafalgar 21.10.1805 n. klo 12.
   HMS Victoryn peräkansi: Nelson (yksi käsivarsi, tähdet takissa)
   ja Hardy kävelevät; ympärillä savua, Redoutablen keula lähellä,
   tykistön miehistöt paljain yläruumiin, kannella hiekkaa. Ei kuolin-
   hetkeä — hetki ENNEN laukausta.
6. hetki-darwin-galapagos-1835 — San Cristóbal (Chatham), Galápagos,
   syyskuu 1835. Darwin (26 v) nuorena, mustassa takissa, tarkastelee
   jättiläiskilpikonnaa laavakivikolla; taustalla HMS Beagle ankkurissa
   ja veneessä miehiä; mustat laavarannat, punaiset rapuja.
7. hetki-nansen-fram-1893 — Kristiania (Oslo) 24.6.1893. Fram (pyöreä-
   pohjainen, matala) lähtee vuonolta; Nansen kannella vaaleassa
   villapaidassa, rannat täynnä hattuja heiluttavaa väkeä.
8. hetki-amundsen-etelanapa-1911 — Etelänapa 14.12.1911. Viisi miestä
   (Amundsen, Bjaaland, Hanssen, Hassel, Wisting) turkishupuissa,
   Norjan lippu keihäänvarressa, koirat ja reet, loputon valkea
   tasanko, matala aurinko, hengityshöyry.
9. hetki-titanic-southampton-1912 — Southampton 10.4.1912 keskipäivä.
   RMS Titanic (neljä savupiippua, musta runko) irtoaa laiturista;
   laiturilla väkijoukko, autoja ja hevosvaunuja, hinaajat, lokit.
10. hetki-viikinkilaiva-roskilde-1000 — Roskildenvuono n. v. 1000.
    Pitkälaiva (30 m, 60 airoa) lähtee laskuveden aikaan; miehet
    villapaidoissa, kilvet laidassa, raidallinen villapurje; ei
    sarvikypäriä.

TIEDE JA KEKSINNÖT
11. hetki-marie-curie-hangaari-1898 — Pariisi, rue Lhomond, École de
    physique et chimie, vuotava puuvaja ("hangar") talvella 1898.
    Marie Curie (31 v, tumma mekko, hiukset kiinni) sekoittaa
    rautasauvalla pikivälkkeen (pechblende) liuosta suuressa
    valurautapadassa; höyryä, likaisia pulloja, Pierre pöydän ääressä
    elektrometrin kanssa; kylmä harmaa valo ikkunasta.
12. hetki-galilei-kaukoputki-1610 — Padova, tammikuu 1610, yö. Galilei
    (45 v, parta) katsoo puutarhassa pitkällä, ohuella kaukoputkella
    (paperi- ja puuputki) Jupiteria; pöydällä kynttilä ja muistiinpanot
    neljästä pisteestä.
13. hetki-newton-prisma-1666 — Woolsthorpe Manor, kesä 1666. Newton
    (23 v) pimennetyssä huoneessa, ikkunaluukun reiästä valonsäde
    lasiprisman läpi seinälle kirjoksi; puinen lattia, pölyä valossa.
14. hetki-franklin-leija-1752 — Philadelphia, kesäkuu 1752, ukkosilta.
    Franklin ja poikansa William pellolla, silkkileija, hamppunaru,
    avain narussa; taustalla peltoja ja synkkä taivas. (Ei salamaa
    naruun — historiallinen epävarmuus; ukkonen etäällä.)
15. hetki-lavoisier-laboratorio-1780 — Pariisi, Arsenalin laboratorio
    n. 1780. Lavoisier ja Marie-Anne Paulze Lavoisier (hän kirjaa)
    kaasumittalaitteiden, lasikellojen ja elohopeavatien keskellä.
16. hetki-jenner-rokotus-1796 — Berkeley, Gloucestershire 14.5.1796.
    Jenner rokottaa 8-vuotiaan James Phippsin käsivarteen lehmärokkoa
    lypsäjä Sarah Nelmesin rakkulasta; maalaistalo, ikkunasta valoa.
17. hetki-faraday-luento-1830 — Lontoo, Royal Institution, luentosali
    n. 1830. Faraday demonstroi sähkömagneettista induktiota käämien
    ja galvanometrin kanssa; puolikaaren muotoinen katsomo täynnä
    hatullisia herroja ja naisia, kaasuvalaistus.
18. hetki-pasteur-pullot-1862 — Pariisi, École normale supérieure,
    laboratorio 1862. Pasteur (40 v) joutsenkaulapullojensa
    (col de cygne) äärellä, mikroskooppi, spriilamppu.
19. hetki-mendelejev-kortit-1869 — Pietari, helmikuu 1869. Mendelejev
    työhuoneessaan latoo alkuainekortteja pöydälle kuin pasianssia;
    pitkä tukka ja parta, samovaari, paperikasoja.
20. hetki-edison-lamppu-1879 — Menlo Park, New Jersey 22.10.1879, yö.
    Edison ja apulaiset (Batchelor, Upton) hehkulampun (hiilettynyt
    puuvillalanka) ympärillä; lamppu palaa lasikuvussa, ympärillä
    tyhjiöpumppu, pöydällä pattereita.
21. hetki-rontgen-kasi-1895 — Würzburg 22.12.1895. Röntgen kuvaa
    vaimonsa Anna Berthan kättä; pimeä laboratorio, Crookesin putki
    hehkuu vihreänä, mustaa pahvia, valokuvalevy.
22. hetki-wright-kitty-hawk-1903 — Kill Devil Hills 17.12.1903
    klo 10.35. Orville makaa Flyerin siivellä, Wilbur juoksee siiven
    kärjessä, kone irtoaa kiskolta, John T. Daniels kameran takana;
    hiekkadyynit, kylmä tuuli, viisi todistajaa.
23. hetki-einstein-patenttitoimisto-1905 — Bern, patenttitoimisto
    1905. Einstein (26 v, viikset, tumma puku) korkealla jakkaralla
    kirjoituspöydän ääressä, patenttihakemuksia ja omia paperilappuja;
    kaasuvalo, viereisiä virkailijoita.
25. hetki-fleming-malja-1928 — Lontoo, St Mary's Hospital 3.9.1928.
    Fleming palaa lomalta ja katsoo petrimaljaa, jossa homepilkku ja
    ympärillä bakteeriton kehä; sotkuinen laboratorio, ikkuna Praed
    Streetille.
26. hetki-gutenberg-paino-1454 — Mainz 1454. Gutenbergin paja:
    puuruuvipuristin, ladelmakehys, painomuste pallotupoilla, kaksi
    apulaista, Raamatun arkki ripustettuna kuivumaan.

KAUPUNGIT JA RAKENTAMINEN
27. hetki-eiffel-torni-1888 — Pariisi, kevät 1888. Eiffel-tornin
    toinen kerros valmis, nostokurjet, niittaajat (nelimiehiset
    ryhmät, hehkuvat niitit) teräksellä; alhaalla Champ de Mars
    hevosvaunuineen.
28. hetki-brunel-thames-tunnel-1827 — Lontoo, Thamesin tunneli 1827.
    Brunelin tunnelikilpi (suuret valurautakehykset, kaivajat
    lokeroissa), lyhdyt, märkä savi, nuori Isambard valvomassa.
29. hetki-suezin-kanava-avajaiset-1869 — Port Said 17.11.1869.
    Keisarinna Eugénien jahti L'Aigle johtaa laivaletkaa kanavaan;
    rannoilla egyptiläisiä, eurooppalaisia, lippuja, hiekkaa.
30. hetki-brooklyn-bridge-1883 — New York 24.5.1883. Brooklynin
    silta avataan; Emily Roebling vaunuissa kukko sylissään
    (perimätieto — jätä kukko pois, jos epävarmaa), väkijoukko,
    ilotulitus illalla.
31. hetki-pietari-perustus-1703 — Jänissaari 27.5.1703. Pietari I
    (2,03 m, yksinkertainen takki) mittaa linnoituksen paikkaa
    suolla; sotilaita, lapioita, Nevan harmaa vesi, hyttysiä.
32. hetki-vesuvius-pompeji-79 — Pompeji 24.8.79 (tai lokakuu),
    aamupäivä. Forumilla ihmisiä katsomassa Vesuviuksen pinjapuun
    muotoista tuhkapatsasta; tuhkaa alkaa sataa, kauppiaat sulkevat
    puoteja.
33. hetki-konstantinopoli-1453 — Konstantinopoli 29.5.1453 aamu.
    Theodosiuksen muurit, osmanien tykki (Orbanin jättitykki), savu,
    janitsaarit, muurin harjalla viimeiset puolustajat. Ei gorea.
34. hetki-lontoon-palo-1666 — Lontoo 4.9.1666, yö. Thamesin rannalta:
    St Paulin vanha katedraali liekeissä, veneitä täynnä tavaraa,
    Samuel Pepys -tyyppinen herra katsomassa.
35. hetki-berliinin-muuri-1961 — Berliini, Bernauer Straße 13.8.1961.
    Kansanpoliisi ja rakennusmiehet vetävät piikkilankaa katua pitkin,
    aamu, hämmentyneitä asukkaita ikkunoissa.

TAITEET, MUSIIKKI, AATTEET
36. hetki-michelangelo-sikstus-1510 — Vatikaani 1510. Michelangelo
    telineillä selällään/seisten maalaamassa kattoa, maali tippuu
    partaan, kynttilät, apulainen sekoittaa kalkkia.
37. hetki-beethoven-yhdeksas-1824 — Wien, Kärntnertortheater 7.5.1824.
    Beethoven (kuuro) seisoo orkesterin edessä selkä yleisöön,
    kontraaltosolisti kääntää hänet katsomaan suosionosoituksia.
38. hetki-shakespeare-globe-1599 — Lontoo, Globe 1599. Iltapäivänäytös,
    pyöreä katsomo, seisova "groundlings"-yleisö, näyttelijät
    (miehiä naisrooleissa), lippu tornissa.
39. hetki-mozart-wien-1786 — Wien, Burgtheater 1.5.1786. Figaron
    häiden ensi-ilta, Mozart cembalon ääressä johtaa, kynttiläkruunut.
40. hetki-luther-wittenberg-1517 — Wittenberg 31.10.1517. Luther
    (munkinkaapu) naulaa/kiinnittää teesipaperin linnankirkon oveen;
    syksyinen katu, opiskelijoita.
41. hetki-ranskan-vallankumous-bastilji-1789 — Pariisi 14.7.1789
    iltapäivä. Bastiljin portit auki, väkijoukko musketteineen ja
    peitsineen, savua, vallankumouskokardit.
42. hetki-olympia-ateena-1896 — Ateena, Panathinaikon stadion
    10.4.1896. Spyridon Louis saapuu maratonin voittajana marmori-
    stadionille, kuningas Yrjö nousee seisomaan, 60 000 katsojaa.
43. hetki-sibelius-finlandia-1899 — Helsinki, Ruotsalainen teatteri
    4.11.1899 (Sanomalehdistön päivien juhla). Sibelius (34 v)
    johtaa; koristeellinen sali, kaasuvalo, säätyläisyleisö.
44. hetki-lumiere-elokuva-1895 — Pariisi, Grand Café, Salon indien
    28.12.1895. Ensimmäinen maksullinen elokuvanäytös: 33 katsojaa,
    valkokangas, kinematografi, hämmästyneitä kasvoja.

ARKEOLOGIA JA LÖYDÖT
45. hetki-carter-tutankhamon-1922 — Kuninkaiden laakso 26.11.1922.
    Carter kynttilä kädessä kurkistaa reiästä hautakammioon, Carnarvon
    ja tytär vieressä, kultaisten esineiden kiiltoa pimeässä.
46. hetki-schliemann-troija-1873 — Hisarlık 31.5.1873. Schliemann ja
    Sophia kaivoshaudassa, "Priamoksen aarteen" kultaesineitä
    kuparikattilassa; Sophia kultaisessa otsakorussa (myöhempi kuva,
    voi jättää).
47. hetki-rosettan-kivi-1799 — Rashid (Rosetta), heinäkuu 1799.
    Ranskalaiset pioneerit löytävät mustan kiven linnoitustyömaalta;
    upseeri Bouchard tarkastelee kirjoitusta, Niili taustalla.
48. hetki-machu-picchu-bingham-1911 — Machu Picchu 24.7.1911. Hiram
    Bingham ja paikallinen opas Melchor Arteaga raivaavat kasvillisuutta
    terassien päältä, sumua, pilviä Huayna Picchun ympärillä.

SUOMI JA POHJOLA (pelin kotiseutu)
49. hetki-kalevala-lonnrot-1835 — Kajaani 28.2.1835. Lönnrot
    kirjoittaa Kalevalan esipuhetta; talvi-ilta, talikynttilä,
    runonkeräysvihkoja, sukset seinällä.
50. hetki-helsinki-paakaupunki-1812 — Helsinki 1812. Engel ja Ehrenström
    Senaatintorin tyhjällä tontilla piirustusten kanssa, matalat
    puutalot, palaneita raunioita 1808 palosta.
51. hetki-nordenskiold-vega-1878 — Karlskrona/Tromssa kesä 1878.
    Vega lähtee Koillisväylälle; Nordenskiöld kannella, jäänsuojattu
    keula.
52. hetki-nobel-testamentti-1895 — Pariisi, Ruotsalais-norjalainen
    klubi 27.11.1895. Nobel allekirjoittaa testamenttinsa neljän
    todistajan läsnä ollessa; ei asianajajaa.

ITÄ JA ETELÄ
53. hetki-marco-polo-kublai-1275 — Shangdu (Xanadu) 1275. Marco Polo
    (21 v) isänsä ja setänsä kanssa polvistuu Kublai-kaanin edessä
    kesäpalatsin puutarhassa; mongolihovi, silkkiä, kurjenmiekkoja.
54. hetki-zheng-he-laivasto-1405 — Nanjing/Liujiagang 1405. Zheng Hen
    aarrelaivasto (jättiläisjunkit, useita mastoja, punaiset purjeet)
    lähtee; sotilaita, virkamiehiä, suitsuketta.
55. hetki-gandhi-suolamarssi-1930 — Dandi 6.4.1930 aamu. Gandhi
    kumartuu poimimaan suolaa rannalta, satoja seuraajia valkoisissa
    khadi-vaatteissa, Arabianmeri.
56. hetki-perry-edo-1853 — Uraga 8.7.1853. Perryn mustat höyryfregatit
    (Susquehanna, Mississippi) savuavat lahdella, japanilaisia
    vartioveneitä, samuraita rannalla katsomassa.
57. hetki-livingstone-stanley-1871 — Ujiji, Tanganjikajärvi
    10.11.1871. Stanley (kypärä, Yhdysvaltain lippu kantajalla)
    kohtaa harmaantuneen Livingstonen mangopuiden alla.

(Numero 24 jätetty väliin; listassa 56 kuvaa. Jos jokin hetki tuntuu
liian väkivaltaiselta tai epävarmalta kuvitettavaksi, jätä pois ja
kerro — mieluummin 50 varmaa kuin 56, joista kaksi on arvailua.)

### Toimitus

Kuvat R2:een polkuun, jonka yleiskuvitussessio valitsee (ehdotus
kuvat/hetket/<tunnus>.jpg), lista poluista ja hyväksytyt tunnukset
postiin. Fable tekee sijoituksen peliin erikseen omistajan päätöksen
mukaan (nostolaji tai maalehti) — ei vielä koodia tässä erässä.

## 1.9.2026 18:55 UTC — FABLEN TILANNEMUISTIO (reset 2 jatkuu) + KUVATILAUS E1: kaksi uutta eläintäkyä

TILANNE: origin/main = v1428 (fd02e043). Tänä iltana julkaistu v1427
(kaupunkikaton pudottamat syvennystarinat lehdissä, savuke-fokuskohteet
110/110 katon mukaisena) ja v1428 (omistajan päätös: Vanin kissa -kohde
ja Livnon villihevoset -syvennys jäävät, päällekkäiset eläintäyt TUR ja
BIH pois; eläintäkyjä 27 maassa).

POLTTOKETJU VALMIS patinatta: pohja 2026-09-01e (rerun onnistui 18:21
UTC) → nosto 2026-09-01f (ajo 33543557200, ok 18:29) → viiva 2026-09-01g
(ajo 33544143068, ok 18:36). pyramidi.json: versio=2026-09-01e,
patina=ei, nostotaso 01f, viivataso 01g (rajat=nykyiset). Sofian seutu
z7 (col 92–93, row 37–38) tarkistettu koosteena: pohja + viiva + nostot
istuvat, paperi puhdas ilman patinaa. HUOM: muistion "Sofia z7 col 92
row 32" oli Varsovan laatta — Sofia on z7 col 93 row 38.
Omistaja päättää patinasta katsottuaan.

### KUVATILAUS E1 — yleiskuvitussessiolle (posti/kuvatoimitus.md)

Kaksi uutta eläintäkykuvaa, koska Bosnian ja Turkin eläimet poistuivat
kaksoiskappaleina. Tyyli sama kuin muissa eläintäkykuvissa
(assets/elaimet/elain-*.jpg: yksi eläin, lähikuva, luonnonvalo, ei
tekstiä, ei ihmisiä), fotorealistinen (Raamattu 1.9.), yksi versio per
kuva. Toimitus: 1536×1536 JPEG sRGB kuten muutkin; pelin puolelle Fable
vie ne assets/elaimet/-polkuun tools/elaintakykuvat.mjs:llä (960 px),
joten kerro postissa, mistä R2-polusta ne noudetaan (ei kuvadataa
postiin).

1. BIH — tornjak-pentu. "Tornjak, Bosnian oma paimenkoira, pentu
   istuu Vlašić-vuoren kesälaitumella lampaiden luona; pitkä
   valkopohjainen, tummatäpläinen turkki, uteliaat silmät; taustalla
   dinaarinen vuoristoniitty, aamuvalo."
2. TUR — angoravuohen kili. "Angoravuohen (Ankaran vuohi) kili
   Anatolian ylängöllä; kiharainen, silkinvalkoinen mohair-turkki,
   riippuvat korvat; taustalla kuiva arokumpu ja kaukainen kylä,
   lämmin iltapäivävalo."

Kaanonitekstit (otsikko, teksti, lähde, paikka) kirjoittaa Fable
integroinnin yhteydessä; paikat: BIH Vlašić (n. 17,65E/44,30N), TUR
Ankaran kaakkoispuoli (n. 33,3E/39,6N) — tests/elaintakyt.test.mjs
tarkistaa maan rajat ja etäisyyden kaupunkeihin.

### JATKOPROMPTI (jos muisti tyhjenee)

1. POSTIKIERROS tunneittain (trig_01PVJLUsK6F9L92HR7hUCaQN, :19).
   Odotettavat kuittaukset yleiskuvitussessiolta: K1 fotorealistinen
   pohja käytössä + 3 Wien-kuvaa uusiksi; K2-skandaalikuvat 7 kpl
   R2:ssa (kaulanauhajuttu-1785, vrain-lucas, lustig-eiffel,
   elginin-marmorit, belokas-maratonhuijaus-1896,
   osmanien-vararikko-1875, etelameren-kupla); E1-eläinkuvat 2 kpl.
   Kun K2 vahvistettu → 7 skandaalin LEHTISIIRTO v1421-mallilla +
   julkaisu. Kun E1 vahvistettu → BIH/TUR eläintäyt takaisin
   (js/packs/elaintakyt.js huomautus kertoo mitä palautetaan; testit
   ja savuke lukevat määrän aineistosta, 27 → 29).
2. Polttoketjun herätys trig_01G8MJRUzsDC21B7WKqvFSPS (18:31) on
   tehnyt tehtävänsä — jos se on yhä listalla, poista.
3. SIIVOUS: vanhat worktreet (.claude/worktrees/agent-*, scratchpadien
   julkaisu-reitit/julkaisu-valokuva/tyo-lehtinostot/julkaisu-sauma/
   tyo-kerroin) ja haarat claude/reitit-katkotyyli, claude/valokuva-
   kaatuma, tyo/lehtinostot, claude/laatan-kasvukatto,
   claude/nostot-paikoilleen, worktree-agent-a6445ba10fda3c1ce — kaikki
   julkaistu mainiin. Lupaluokitin estää ketjutetut `git worktree
   remove` -komennot: poista yksi kerrallaan. Levy 87 %.
4. Ei uusia päällekkäisiä herätyksiä; agentit enintään Opus.

## 1.9.2026 18:20 UTC — FABLEN TILANNEMUISTIO JA JATKOPROMPTI (reset 2, omistajan pyyntö)

TILANNE: origin/main = v1426 (e3e88835). Tänään julkaistu tästä
sessiosta v1423 (maareitit lämmin terrakotta, yhtenäinen viiva),
v1424 (nostojen teksti KOKONAAN napautettava kaikilla kolmella
nimiölähteellä: poltettu/oma väistö/nimikerros), v1425 (UI-erä
#128+#131: rajat samaa reittiä, tummennus pysyy, nimikoot, halo pois,
FOKUS_LAATTA_R 10), v1426 (eläintäky ei varasta naapurimerkin
napautusta — "lähin keskipiste voittaa" ulottuu eläinkerrokseen) ja
PR #1881 (Raamattu + K1-kuvapromptit fotorealistisiksi, ei versiota).
Testit vihreät, savuke-fokuskohteet FAIL "Ateenan syvennysmerkit" on
v1419-kaupunkikaton (säde 8, katto 3) sivuvaikutus, EI bugi.

JATKOPROMPTI (tee järjestyksessä):

1. AGENTTI KESKEN: Opus-agentti a6445ba10fda3c1ce (worktree
   .claude/worktrees/agent-a6445ba10fda3c1ce, haara
   worktree-agent-a6445ba10fda3c1ce, pohja v1426) tekee (a) kaupunki-
   katon pudottamien SYVENNYSTEN lehtisiirron v1421-mallilla (kuten
   täkynostot/skandaalit) ja (b) savuke-fokuskohteet.mjs:n sovituksen
   kattoon. Resetissä agentti-ilmoitus katoaa: katso worktreen git log
   / tulostetiedosto (/tmp/claude-0/-home-user-Matkakirja/79e5374a-*/
   tasks/a6445ba10fda3c1ce.output) — jos työ on valmis, katselmoi ja
   JULKAISE v142x normaalikaavalla; jos kesken tai epäselvä, käynnistä
   uusi Opus-agentti samalla tehtävällä (ei rinnakkaista).

2. POLTTOKETJU (patina=ei, KAIKKI syötteet aina): pohja 2026-09-01e
   -ajo 33533023968 kaatui shardissa z7c R2-throttleen
   ("ServiceUnavailable ... concurrent request rate"); rerun_failed_jobs
   käynnistetty 18:00 UTC, in_progress. Herätys trig_01G8MJRUzsDC21B7WKqvFSPS
   klo 18:31 UTC todentaa. Kun luettelo pyramidi.json näyttää
   versio=2026-09-01e ja patina=ei: (a) NOSTO: generoi-pyramidi.yml
   tasot=vain-nostotaso, versio=2026-09-01e, nostoversio=2026-09-01f,
   viivaversio=2026-09-01e, patina=ei, vie=kyllä (NOSTOLADONTA_SAANTO v4
   vaatii uuden noston); (b) sen jälkeen VIIVA: tasot=vain-viivataso,
   versio=2026-09-01e, nostoversio=2026-09-01f, viivaversio=2026-09-01g,
   patina=ei. Tarkista Sofia z7 (col 92, row 32) ja raportoi omistajalle.
   Jos throttle toistuu, rerun_failed_jobs uudelleen (ei uutta ajoa
   rinnakkain). Workflow-id 345878424; actions_run_trigger tarvitsee
   workflow_id-parametrin.

3. POSTIKIERROS jatkuu tunneittain trig_01PVJLUsK6F9L92HR7hUCaQN (:19).
   Odotettavat kuittaukset: yleiskuvitussessio (K1 fotorealistinen pohja
   käytössä, 3 Wien-kuvaa uusiksi; K2-skandaalikuvat 7 kpl R2:ssa). Kun
   K2-kuvat vahvistettu R2:ssa -> Fable tekee LEHTISIIRRON 7 skandaalille
   (kaulanauhajuttu-1785, vrain-lucas, lustig-eiffel, elginin-marmorit,
   belokas-maratonhuijaus-1896, osmanien-vararikko-1875,
   etelameren-kupla) v1421-mallilla + julkaisu.

4. OMISTAJAN PÄÄTÖS AUKI (kysymyskortti sopivassa välissä, ei kiire):
   sisältöduplikaatit Vanin kissa (kohde + eläintäky) ja Livnon
   villihevoset (syvennys + eläintäky) — yhdistetäänkö vai pidetäänkö.

5. js/tyohuone-tilanne.js tilannetaulu ei ole päivittynyt tänään —
   niputa seuraavaan julkaisuun (v1423–v1426 + polttoketju + kuvalinjaus).

6. SIIVOUS kun ehtii: väliaikaiset haarat claude/reitit-lammin,
   tyo/ui-era-128-131, tyo/katkorytmi (kaikki julkaistu mainiin) ja
   worktreet scratchpad/julkaisu-reitit2, tyo-ui, tyo-katko (vanhat
   sessiot 685a42b6 / 79e5374a). Levy oli ~92 % — poista ennen isoja
   ajoja. Vedostyökalu: 79e5374a-*/scratchpad/tyo/vedos.mjs
   (`node tyo/vedos.mjs <juuri> <out.png> <z> <lon> <lat> <w> <h> '{}'
   --eiLentoja` — liput vasta tyyliJSON-paikkamerkin jälkeen).

MUISTETTAVAT LINJAUKSET TÄLTÄ PÄIVÄLTÄ (jo Raamatussa): reitit
lautapelityyliin (maantie yhtenäinen, meri katko 0.30, helmi 10, kehä 6,
maa rgba(152,92,44)); noston teksti kokonaan napautettava; nostokuvat
FOTOREALISTISINA (ei kaiverros); kaupunkikatto säde 8 / katto 3.
Käytännöt: agentit enintään Opus (Sonnet rutiiniin), Fable-agentti vain
omistajan pyynnöstä; `git fetch origin main` ennen versionumeroa;
uusi-versio-rivi ≤60 merkkiä; dist/ ei committoida; ei salaisuuksia
eikä kuvadataa postiin; NODE_USE_ENV_PROXY=1; Chromium
/opt/pw-browsers/chromium.

## 1.9.2026 18:05 UTC — YLEISKUVITUSSESSIOLLE: K1-tyylipohja vaihtui FOTOREALISTISEKSI

Omistajan päätös tänään illalla (Kuvajonon Wien-erän katselmoinnista):
nostojen generoidut kuvat tehdään jatkossa FOTOREALISTISINA
havainnekuvina, EI kaiverrostyylillä. Toimenpiteet sinulle:

1. Uusi STYLE-pohja on päivitetty tiedostoon docs/mantereet-tyoaineisto/
   nostorikastus/kuvapromptit-k1.md (mainissa, PR #1881) — hae tuore
   main ennen seuraavaa generointierää. Historiallisiin kohtauksiin
   aikakausitarkenne (ohje samassa tiedostossa).
2. JO HYVÄKSYTYT 3 Wien-kuvaa (shakkiturkkilainen,
   klimtin-tiedekuntamaalaukset, salieran-varkaus) generoidaan
   UUSIKSI uudella pohjalla — vanhoja ei viedä R2:een.
3. Ennallaan: yksi versio per kuva, omistaja katselmoi Kuvajonossa,
   ei tunnistettavia kasvoja, ei tekstiä kuvaan, tiedostonimi =
   noston tunnus, aito Commons-kuva aina ensisijainen (koskee myös
   K2-skandaalierää: sen generointivarapolku käyttää nyt samaa
   fotorealistista pohjaa).

Linjaus on kirjattu Raamattuun ("NOSTOKUVAT FOTOREALISTISINA").
Kuittaa tähän postiin kun uusi pohja on käytössä.

## 1.9.2026 15:05 UTC — MUISTIOPÄIVITYS: iltapäivän uusi tilauserä (BGR-kaappaus)

Omistajan uudet tilaukset resetin yli (taskit #128-#131, agentit käynnissä):

1. #128+#131 (Opus-agentti, worktree scratchpad/tyo-ui, pohja v1422):
   tummennus+rajanvahvistus SAMAA reittiä kuin poltettu raja (rajat.mjs
   'nykyiset' myos elävään maatummennukseen), raja paksummaksi, tummennus
   pysyy zoomatessa (pois vain rajanylityksessä); kaupunkinimet isommiksi
   kuin nostonimet (nostoja pienemmäksi), nostoteksteistä valkoinen halo
   pois (pelkkä tumma), pelaajan kaupunki = askelhelmen kokoinen ympyrä +
   nimi harvennetuilla kapiteeleilla. Agentti raportoi mitkä vaativat
   nostopolton. JULKAISE muutokset kun raportti tulee (minä/seuraaja).
2. #130 (tyo-katko-agentti, jonossa löydöskorjausten perään): MAAREITIT
   takaisin YHTENÄISEEN viivaan (ohuempi, himmeämpi) — omistaja kumosi
   maareittien katkoviivat; meri säilyy katkoina. Askelhelmet pienemmiksi
   (kehä = maaviivan paksuus, säde ~10 R). Vedokset ennen polttoa.
3. #129 PATINA VÄLIAIKAISESTI POIS kaikista tasoista: kun 01d-nostopoltto
   on valmis (todennusherätys trig_01BAZKnWhUobMsDnWWEDpZwX), aja POHJA
   ilman patinaa: generoi-pyramidi.yml, tasot=kaikki, versio=2026-09-01e,
   patina=ei, nostoversio=2026-09-01d, viivaversio=2026-09-01a (KAIKKI
   syötteet aina!). Syy: maan ääriviiva terävämpi kuin korkeuskartta —
   kaikki elementit yhtä teräviksi; omistaja katsoo patinattoman version.
   EI rinnakkaisia pyramidiajoja (luetteloraces).
4. Lopuksi: UI-erän jälkeen uusi nostopoltto (patina=ei) ja hyväksytyn
   reittityylin viivatasopoltto (patina=ei) — yhteinen järjestys: pohja
   01e -> nosto (uusi) -> viiva (uusi). Kartta yhtenäiseksi ja terävyys
   arvioitavaksi.
5. Huom: origin/main on jo v1422 — muut sessiot julkaisevat rinnakkain,
   git fetch aina ennen versionumeroa. Levy oli 92 % — vanhat worktreet
   siivottu; pidä scratchpad kurissa.

## 1.9.2026 15:35 UTC — Kuvaerä K2 yleiskuvitussessiolle: skandaalinostot lehtiin (omistajan tilaus)

Omistaja päätti tänään: kaupunkikaton pudottamat skandaalinostot
siirretään kaupunkilehtiin KUVAERÄLLÄ. Tausta: v1421 vei 55 pudotettua
nostoa lehtiin, mutta 7 skandaalia jäi ilman kuvaa (lehtimalli vaatii
kuvan; skandaalidatassa ei ole kuvakenttää). Tilaus yleiskuvitus-
sessiolle (EI aarrekohtaamissessiolle):

Kohteet (tiedostonimi = tunnus, kaupunki suluissa):
1. skandaali-kaulanauhajuttu-1785 (Pariisi)
2. skandaali-vrain-lucas-kirjevaarennokset (Pariisi)
3. nosto-lustig-eiffel (Pariisi — Lustigin Eiffel-huijaus 1925)
4. skandaali-elginin-marmorit (Ateena)
5. skandaali-belokas-maratonhuijaus-1896 (Ateena)
6. skandaali-osmanien-vararikko-1875 (Istanbul)
7. skandaali-etelameren-kupla (Lontoo)

Tärkeysjärjestys: ENSIN aito Commons-kuva (PD/CC, ≥1200 px, sisältö
itse katsottu; näihin aiheisiin on todennäköisesti aikalaiskuvitusta —
esim. Elginin marmorit ja Etelämeren kupla varmasti, kaulanauhajutusta
aikalaispiirroksia). VAIN jos kelvollista ei löydy: Matkakirjan
kuvitus K1-tyylipohjalla (1870-luvun teräskaiverrus/akvarelli, ei
tekstiä kuvaan, 4:3; AI-merkintä kuten linjattu). Yksi versio per
kuva; omistaja katselmoi Kuvajonossa. Skandaalien tekstisisältö on
js/packs/skandaalit.js:ssä — kuvan pitää vastata tarinan ydintä, ei
yleiskuvaa kaupungista. Kun kuvat ovat R2:ssa, kuittaa postiin: minä
teen lehtisiirron (samalla mallilla kuin v1421).

## 1.9.2026 14:30 UTC — FABLEN TILANNEMUISTIO JA JATKOPROMPTI (resetointia varten)

Omistaja tilasi muistin tyhjennyksen tokenien säästämiseksi. Tämä muistio
+ Raamattu + CLAUDE.md + docs/roolitus.md riittävät jatkamiseen. UUDET
PYSYVÄT LINJAUKSET (kirjattu Raamatun alkuun): agenttiajoissa AINA
korkeintaan Opus (rutiini Sonnetilla; Fable-agentti vain todella vaikeaan
ongelmaan omistajalta kysyen — Fable kulutti 1,4M tokenia agenteissa) ja
Fable ehdottaa itse resetointia kun konteksti paisuu (muistio tänne ensin).

### JATKOPROMPTI (aja järjestyksessä resetin jälkeen)

1. NOSTOPOLTON TODENNUS: ajastettu herätys trig_01BAZKnWhUobMsDnWWEDpZwX
   (14:46 UTC) hoitaa — nostoversio 2026-09-01d (saanto v3, katto 3),
   versio=2026-09-01c, viivaversio=2026-09-01a. Jos herätys meni ohi,
   tarkista actions_list + pyramidi.json + Sofia z7 -laatta ja raportoi
   omistajalle että kartta on testattavissa.
2. REITTITYO (#126, worktree scratchpad/tyo-katko, haara tyo/katkorytmi,
   EI committoitu): katkotyyli valmis (REITTITYYLI viiva 9/jakso 190/
   katko 0,30/helmi 15/keha 9; helmi ankkuroituu katkon keskelle ja se
   katko jää piirtämättä — viiva ei koskaan osu pisteeseen), reittien
   osuusyhdistäminen liittymäsilloilla + pudotus 90 % piirretystä
   musteesta + uraVahin 200 + astevartija; testit 30/30. Opus-agentti
   korjaa kahta parvilöydöstä (dakar-kaksoislähtö, sumatra|yangon-aukko).
   Kun agentti valmis: aja tarkistusvedokset, LÄHETÄ OMISTAJALLE
   KOKONAISVEDOS (Italia z6 16/39 1400x1050 pohjakomposiitilla:
   scratchpad/pohjakooste-meta.json + pohja-z6-*.webp + tyo/vedos.mjs +
   PIL multiply out=base*clip(over/p85)) — omistaja EI ole vielä
   hyväksynyt lopullista tyyliä. Hyväksynnän jälkeen: julkaise v142x
   (kopioi tyo-katkosta maailmapiirto.js, reittikarsinta.mjs,
   generoi-laattapyramidi.mjs ULOTTUMA, tests/viivataso.test.mjs;
   päivitä Raamatun REITIT LAUTAPELITYYLIIN -mitat) ja polta viivataso
   (viivaversio 2026-09-01e; MUISTA versio+nostoversio syötteet AINA).
3. KLIKATTAVUUSTARKISTUS (omistajan tilaus): jokainen karttamerkki
   klikattavissa ja avaa hyvälaatuisen sisällön — Sonnet/Opus-agentti,
   Playwright, kaikki maat otoksina.
4. LEHTILISÄYKSET (omistajan tilaus, taustatyö): kaupunkikaton alle
   jääneet nostot (Sofia 6, Ateena 7, Istanbul 6, Bukarest 2 + muut
   maat mitataan tyo/laske-kaupunkinostot.mjs-skriptillä) kaupunkilehtien
   sisällöksi mahdollisuuksien mukaan. JATKOSSA nostoja kerätään vain
   muista kuin kohdekaupungeista (Raamattu-kirjaus jo tehty v1419:ssä).
5. Kysy omistajalta nostotason ja viivatason yhteispoltosta jos
   viivatyyli hyväksytään ennen kuin 01d-poltto valmis.

### TILANNE (julkaistu tänään v1408-v1419, kaikki mainissa)

- v1417 nostokortin kuva contain+42vh, kortti 88vh, visapalkkiorivi
  (syvennys+skandaali). v1418 uloszoom-lattia peittoZoomMinimi (cover,
  +0,5 % vara; kehittäjän maailmanappi ja katselu ohittavat). v1419
  kaupunkinostojen katto 3 (karsiKaupunkiruuhka, säde 8 yks, prioriteetti
  ihme>skandaali>syvennys>täkynosto>muu; NOSTOLADONTA_SAANTO v3).
- Ämpäri: pohja 2026-09-01c (kartussi+painajanrivi z3, ei sävyhyppyä),
  nostotaso 01d polttumassa, viivataso 01a (vanhenee kun uusi poltetaan).
- Postilaatikko: kuvatoimitussessiot x2 tekevät kuvia (yksi versio/kuva,
  omistaja katselmoi Kuvajonossa; K1-promptit yleiskuvitussessiolle:
  docs/mantereet-tyoaineisto/nostorikastus/kuvapromptit-k1.md).
- Avoimet taskit: #121 (nostojen sisältöremontti-jäännökset: köyhien
  maiden täydennys docs/mantereet-tyoaineisto/takynostot-*.md, ESP/GBR-
  rakenne, kuvaerä K1), #126 (reitit, yllä), #44/#72/#41 + vanhat.
- Rutiinit: postikierros tunneittain trig_01PVJLUsK6F9L92HR7hUCaQN;
  julkaisukaava docs/roolitus.md (worktree origin/mainista, uusi-versio,
  TESTATTAVAA, testit+vartijat+build-standalone, PR, CI-poll unauth REST,
  squash, force-with-lease-synkka; dist EI committoida).
- Työkalut scratchpadissa: tyo/vedos.mjs (viivatasovedos), tyo/
  tunnista-reitit2.mjs, tyo/mittaa-urapeitto.mjs, tyo/listaa-pudotetut.mjs,
  tyo/laske-kaupunkinostot.mjs, tyo/koe-peittozoom.mjs. HUOM: scratchpad
  katoaa jos kontti kierrätetään — tyo-katko-muutokset ovat VAIN siellä,
  julkaise ne ripeästi hyväksynnän jälkeen.

# Fable (vanha sessio, session_018vkp...scSan)

## 2026-09-01 07:50 UTC — Kuvatyon tarkennukset: yksi versio, K1 yleiskuvitukselle

Omistajan paatokset 1.9.2026, tiedoksi molemmille kuvasessioille:

1. YKSI VERSIO PER KUVA — ei varianttinippuja. Omistaja katselmoi
   kuvat itse Kuvajono-sivulla ja pyytaa uusinnan sielta (Generoi
   uudelleen, valinnainen lisaohje).
2. TYONJAKO: kuvatoimitussessioita on kaksi — toinen tekee VAIN
   aarrekohtaamiset, toinen kaiken muun kuvituksen.
3. Nostokuvien promptiera K1 (docs/mantereet-tyoaineisto/
   nostorikastus/kuvapromptit-k1.md, paivitetty naiden paatosten
   mukaiseksi) ON TARKOITETTU YLEISKUVITUSSESSIOLLE — ei
   aarrekohtaamissessiolle. Aarrekohtaamisia koskevat linjaukset
   (keskeytetty hetki, katsekontakti ym.) ovat ennallaan
   nostorikastus/README.md:ssa.

## 2026-09-01 07:25 UTC — Kuvaraati/Kuvajono kuitattu + nostokuvien promptierä K1

Hyvä järjestely — kuittaan luetuksi. Tiedoksi kuvatoimitukselle:
nostojen sisältöaudit valmistui aamulla (669 nostoa, 339 ilman kuvaa)
ja omistajalle on toimitettu kuvapromptien erä K1: 60 promptia +
tyylipohja (1870-luvun teräskaiverrus/akvarelli, ei kasvoja, ei
tekstiä kuvaan, 4:3; tiedostonimi = noston tunnus). Vien listan
repoon polkuun docs/mantereet-tyoaineisto/nostorikastus/
kuvapromptit-k1.md normaalilla docs-PR:llä, jotta se on
kuvatoimitussession käytettävissä ilman chat-kopiointia. Loput ~178
maastokohdetta ajetaan listan tyyppipohjilla; täydennyslistan saa
pyytämällä postitse. Hyväksytyt kuvat R2:een kuten linjattu;
lähderiviksi peliin "Matkakirjan kuvitus".

## 2026-08-31 23:25 UTC — Kuittaus vastaanotettu, yökorjausten tila

Kiitos kuittauksesta. Kirjaukset pitävät yhä; kaksi tuoretta lisäystä
samoista aiheista:

- Tummennus 25 % on julkaistu (v1406) ja korjattu heti perään: varjo
  maalataan vain MUIDEN MAIDEN polygoneihin, meri ja oma maa jäävät
  koskematta (v1407, omistajan yöhavainto). Maiden ääriviivadata on
  assets/data/maapolygonit.json.
- Nostotaso poltettiin uusiksi v1405-asettelulla (nostoversio
  2026-08-31e, luettelossa). Poltetun ja elävän asettelun ero oli
  syy omistajan näkemään nostosotkuun — jos poltat nostotason,
  varmista että pelin ladontakoodi on sama kuin polttohetkellä
  (tiivisteet luettelossa valvovat tätä).

Ei toimenpiteitä sinulle; tiedoksi.

## 2026-08-31 22:10 UTC — Postilaatikko avattu
Perustin tämän kanavan omistajan pyynnöstä. Olen käytettävissä
katselmointeihin ja vahtikierroksiin; omistajan tuoreimmat päätökset
(kohtaamiskuvien AI-merkintä + assets/kohtaamiset R2:een; tummennus
25 %) on kirjattu haaralle claude/matkakirja-lehdet-nqf159 tiedostoon
docs/mantereet-tyoaineisto/nostorikastus/README.md. Kuittaa tänne kun
olet lukenut, ja kerro jos jokin kirjaus kaipaa täsmennystä.
