# Uusi-Seelanti-maalehti (ISO-3: NZL) — sisältösuunnitelma ja faktapohja

*Koonnut Sonnet-faktapohja-agentti 22.–23.8.2026. Kaikki en-Wikipedia-faktat
haettu näinä päivinä raakatekstihaulla
(`https://en.wikipedia.org/w/index.php?title=X&action=raw`, curl toimi
suoraan ilman `NODE_USE_ENV_PROXY=1`:ää). Malli luettu tiedostosta
`docs/mantereet-tyoaineisto/faktapohja-usa.md` (rakenne ja mitoitus) sekä
`docs/mantereet-tyoaineisto/spec-mantereet.md` (Oseania-osio, SITOVA) ja
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (yleiskuri). Ei lopullisia
lehtitekstejä, ei ladattuja kuvia, ei kosketusta js/packs-tiedostoihin —
tämä on vain suunnitelma seuraavaa kirjoittajaa varten (Opus, putken
seuraava vaihe on riippumaton tarkistus toisella Sonnet-agentilla ennen
kirjoitusta).*

Uusi-Seelanti kuuluu Oseanian pilottierään Sydneyn, Aucklandin ja Australian
kanssa. Peliin kirjatut NZL-kaupungit (`js/packs/oceania.js`, `CITY_COUNTRY`):
**auckland** (todennäköinen lehtikaupunki — maan suurin kaupunki, laudan
NZL-kohteista ainoa jolla on `airport: true`, ja Sydney-lentoreitin pääte;
KORJAUS 23.8.2026 tarkistuksen jälkeen: aiempi "ainoa start-painoarvo"
-peruste oli väärä, `la: 'start'` on nimilapun sijoitteluohje ja se on
neljällä NZL-kaupungilla viidestä), **wellington**,
**christchurch**, **dunedin**, **milfordsound**. Maa-aiheet palvelevat
kaikkia viittä.

Sisältölinjaus tarkistettu spec-mantereet.md:stä: maorikulttuuri ja
Waitangin sopimus (1840) ovat perushistoriaa, te reo -nimet (Aotearoa) saa
mainita, alkuperäiskansa asukkaidensa silmin ja elävänä — EI museokehystä.
Uuden-Seelannin sodat (1845–1872) kerrotaan tapahtumina neutraalisti, ilman
sankarikehystä kummallekaan suunnalle ja ilman väkivallan yksityiskohtien
korostusta. Ei nykypolitiikkaa.

---

## 1. Sisältösuunnitelma: miksi juuri nämä viisi aihetta

Ehdotetut aiheet (5 × 4 nostoa = 20 nostoa, kunkin aiheen omalla
minitehtävällä):

1. **Historia** — Uuden-Seelannin sodat (1845–1872) päättyivät VUOTTA
   ENNEN isoisän matkaa; Waitangin sopimus (1840) on koko maan
   perustuskertomus. Poikkeuksellisen vahva 1873-kulma: rauha on juuri
   solmittu, arvet tuoreet.
2. **Maorikulttuuri** — eläväksi näytetty alkuperäiskulttuuri spec-
   mantereet.md:n vaatimuksen mukaisesti: waka (kanootit), tā moko
   (kasvotatuointi), marae (kokoontumispaikka), haka. Ei kadonneen
   kansan romantiikkaa — kulttuuri jatkuu asukkaidensa arjessa 1873.
3. **Luonto** — maailman ainutlaatuisin lintukunta (ei maanisäkkäitä
   paitsi lepakot), Rotoruan geotermiset kentät, ja erityisesti Pink and
   White Terraces — maailman kahdeksas ihme, joka on VIELÄ PYSTYSSÄ
   1873 mutta tuhoutuu Tarawera-vuoren purkauksessa 13 vuotta myöhemmin
   (1886) — sallittu kerrottavaksi Raamatun linjan mukaan.
4. **Kulta ja talous** — Otagon kultaryntäys (1861) muutti koko
   eteläsaaren yhdessä vuodessa; ja erityisen vahva 1873-kulma
   TULEVAISUUTEEN päin: ensimmäinen jäähdytetyn lihan laivalasti
   Englantiin lähtee vasta 1882 — isoisän matkasta yhdeksän vuotta
   eteenpäin, mullistaa koko maan talouden.
5. **Merenkulku ja löytöretket** — polynesialaisten wakojen purjehdus
   Aotearoaan satoja vuosia ennen eurooppalaisia; Abel Tasmanin
   verinen ensikohtaaminen 1642; Jamesin Cookin purjehdus maan ympäri
   1769–70. Sopii erityisen hyvin isoisän oman pitkän merimatkan
   rinnalle (myös purjelaivan kestoaika Lontoo–NZ n. 98–100
   vuorokautta, sama luokka kuin isoisän omalla reitillä).

**Pois jätetyt vaihtoehdot ja miksi:** Ruoka olisi ollut mahdollinen
(esim. lampaanliha, māorien hāngī-maauuni), mutta sen 1873-aineisto jää
ohuemmaksi kuin Kulta ja talous -aiheen, joka jo kattaa lampaan
vientitalouden kautta talouspuolen. Musiikki (waiata, Māori-laulu)
olisi myös mahdollinen, mutta Maorikulttuuri-aihe kattaa jo esittävät
taiteet (haka) — kahden erillisen aiheen väliin olisi tullut
päällekkäisyyttä. Katso avoin kysymys C.

### 1b. Mallikatsaus

`docs/mantereet-tyoaineisto/faktapohja-usa.md`: 5 aihetta × 4 nostoa,
kunkin aiheen omalla `tehtava`-minitehtävällä. Nostojen kenttärakenne:
`otsikko`, (valinnainen `aika`), `tiedosto`, `teksti` (440–660 mrk),
`selite` (yksi virke), `lahde` ('Tekijä, Wikimedia Commons (LISENSSI)'),
`wiki` (fi-Wikipedia-hakusana). Samaa rakennetta noudatetaan alla.

---

## 2. FAKTAPOHJA: Historia

**Johdanto-ehdotus (n. 220–260 mrk):**

> Vuonna 1873 ase on vasta äsken vaiennut. Vuosikymmeniä kestäneet
> Uuden-Seelannin sodat päättyivät edellisenä vuonna, ja koko maan
> suhde kantaa yhä Waitangin sopimuksen kolmekymmentä vuotta
> vanhoja lupauksia — ja niiden rikkomista.

### H1 — "Yksi kansa" (Waitangin sopimus, 6.2.1840)

> 6. helmikuuta 1840 kapteeni William Hobson istui Busbyn talon
> nurmikolla Waitangissa aamutakki päällään — hän ei ollut odottanut
> päiväys aikaistuvan — kun yli neljäkymmentä pohjoisen heimopäällikköä
> saapui allekirjoittamaan sopimuksen, jonka hän ja hänen sihteerinsä
> olivat kirjoittaneet ilman lakimiestä yhdessä yössä. Jokaisen
> allekirjoittajan jälkeen Hobson sanoi: "He iwi tahi tātou" — "olemme
> nyt yksi kansa". Yli 600 päällikköä allekirjoitti lopulta ympäri
> maata, mutta vain 12 kirjoitti nimensä latinalaisin kirjaimin — moni
> merkitsi asiakirjan omalla tā moko -tatuointikuviollaan. Englannin- ja
> māorinkielinen versio erosivat sanamuodoissaan, ja tämä ero on
> kiistelty aihe vielä 1873.

Faktat ja lähteet:
- Hobson ja hänen sihteerinsä James Freeman (avustajanaan brittiresidentti
  James Busby) kirjoittivat sopimuksen ilman lakimiestä; se käännettiin
  yön yli 4.–5.2.1840. — en-Wikipedia "Treaty of Waitangi"
- Allekirjoitus alkoi 6.2.1840; noin 45 päällikköä oli valmiina aamulla,
  vaikka Hobson oli suunnitellut tilaisuuden 7.2.:lle. Hobson oli
  puettuna aamutakkiin, ei virkapukuun. — en-Wikipedia "Treaty of
  Waitangi"
- Hobson sanoi jokaiselle allekirjoittajalle "He iwi tahi tātou". Yli
  600 päällikköä allekirjoitti kaikkiaan, joista vain 12 latinalaisin
  kirjaimin — moni merkitsi asiakirjan tā moko -kuviollaan tai
  rastilla. — en-Wikipedia "Treaty of Waitangi"

### H2 — "Sotaa ilman voittajaa" (Uuden-Seelannin sodat, 1845–1872)

> Uuden-Seelannin sodat kestivät lähes kolmekymmentä vuotta, 1845:stä
> 1872:een — päättyen VUOTTA ENNEN isoisän matkaa. Huippuvuosina 1860-
> luvulla 18 000 brittisotilasta taisteli noin 4 000:tta māori-soturia
> vastaan, mutta ylivoima ei taannut voittoa: māorit puolustautuivat pā-
> linnoituksissaan taidokkaasti, väistivät ja iskivät takaisin. Sodat
> eivät olleet yhtenäinen sota vaan sarja erillisiä konflikteja eri
> puolilla Pohjoissaarta — maanomistus ja Waitangin sopimuksen tulkinta
> niiden ytimessä. Sotien jälkiseurauksena satoja tuhansia hehtaareja
> māori-maata takavarikoitiin rangaistukseksi.

Faktat ja lähteet:
- Uuden-Seelannin sodat kestivät 1845–1872 hallituksen ja sille
  liittoutuneiden māorien sekä toisten māori-heimojen ja siirtolaisten
  välillä. — en-Wikipedia "New Zealand Wars"
- 1860-luvun huipulla 18 000 brittisotilasta (tykistön ja ratsuväen
  tukemana) taisteli noin 4 000:tta māori-soturia vastaan; māorit
  käyttivät pā-linnoituksia ja sissisodankäyntiä. — en-Wikipedia
  "New Zealand Wars"
- New Zealand Settlements Act 1863 johti n. 16 000 neliökilometrin
  māori-maan takavarikointiin. — en-Wikipedia "New Zealand Wars"

### H3 — "Linnoitus jota ei voitettu" (Gate Pān taistelu, 29.4.1864)

> 29. huhtikuuta 1864 kenraali Cameron lähetti 300 miestä rynnäkköön
> Pukehinahinan pā-linnoitukseen Taurangan lähellä — pettävän hiljaisena
> näyttäytyneeseen kohteeseen, jota puolusti alle 250 māori-soturia
> Rāwiri Puhiraken johdolla. Ensimmäiset minuutit näyttivät
> voitolta, mutta linnoituksen takaosan murruttua tilanne kääntyi:
> paniikki levisi brittiriveihin, ja 31 sotilasta kuoli, 80 haavoittui —
> yli kolmasosa hyökkääjistä. Historioitsija James Cowan kirjoitti
> jälkikäteen rynnäkön jättäneen "kymmeniä ryömimässä kuolevina tai
> kuolleina". Tappio oli brittien tuhoisin koko sotien aikana ja
> uutisoitiin kotimaassa häpeällisenä.

Faktat ja lähteet:
- Cameron määräsi 300 miehen rynnäkön (Naval Brigade + 43. rykmentti)
  29.4.1864 klo 16 aikoihin; alle 250 māoria puolusti linnoitusta
  Rāwiri Puhiraken johdolla. — en-Wikipedia "Tauranga campaign"
- Britit menettivät 31 kuollutta (10 upseeria) ja 80 haavoittunutta —
  yli kolmasosa rynnäkköjoukosta; māori-tappiot arviolta 25–30. Historian
  James Cowanin mukaan "yli sata rynnäkköjoukosta oli kaatunut tai
  haavoittunut". — en-Wikipedia "Tauranga campaign"
- Aikalaislehdistö kutsui tappiota häpeälliseksi: "urhoollinen" joukko
  oli "tallattu tomuun... puolialastomien, puoliasestettujen villien"
  toimesta (aikalaislainaus, ei kirjoittajan omaa sanavalintaa — käytä
  vain kontekstissa selittäen ajan asennetta, ei omana äänenä). —
  en-Wikipedia "Tauranga campaign"

### H4 — "Sota vaikenee" (Te Kooti ja sotien loppu, 1872)

> Sotien viimeinen jakso päättyi elokuun 1872 ympärillä, kun rangatira
> Te Kooti Arikirangi Te Turuki — jota britit olivat jahdanneet
> itärannikolla vuodesta 1868 — sai lopulta turvapaikan māori-kuninkaalta
> ja siirtyi King Countryyn. Siellä hän jatkoi rauhassa oman Ringatū-
> uskontonsa kehittämistä, riittejä ja rukouksia, kunnes hallitus
> armahti hänet muodollisesti helmikuussa 1883. Samaan aikaan lännempänä
> soturi Tītokowaru oli jo vuosia aiemmin (1868–69) hylännyt vahvan
> asemansa Taranakissa ja hajottanut armeijansa yllättäen keskellä
> voittokulkua. Vuoteen 1873 mennessä ase oli vaiennut koko maassa —
> mutta rauha oli hauras, ja maakysymys eli yhä.

Faktat ja lähteet:
- Sotien viimeiset vaiheet olivat Tītokowarun sota Taranakissa
  (1868–1869) ja Te Kootin jahtaaminen itärannikolla (1868–1872).
  — en-Wikipedia "New Zealand Wars"
- Te Kooti sai turvapaikan māori-kuninkaalta 1872 ja siirtyi King
  Countryyn kehittämään Ringatū-uskoaan; armahdettiin helmikuussa 1883,
  kuoli 1893. — en-Wikipedia "New Zealand Wars"
- Tītokowarun joukot eivät hävinneet yhtään taistelua kampanjansa
  aikana, mutta hylkäsivät yllättäen vahvan Tauranga-ika Pā -asemansa,
  minkä jälkeen armeija hajosi nopeasti (1869). — en-Wikipedia
  "New Zealand Wars"

**Minitehtäväehdokas (Historia):**
> Minä vuonna Uuden-Seelannin sodat päättyivät — vuosi ennen isoisän
> matkaa?
> Vaihtoehdot: 1860 / 1868 / **1872** / 1880
> Fakta: viimeinen vaihe (Te Kootin turvapaikka) päättyi vuonna 1872.

*Vastaus löytyy nostosta H4/H2. Ei osu oceania-questions.js:n aiempiin
kysymyksiin (tarkistettava kirjoitusvaiheessa, ks. osio 8).*

---

## 3. FAKTAPOHJA: Maorikulttuuri

**Johdanto-ehdotus:**

> Māorikulttuuri ei ole 1873 mikään muisto — se elää joka päivä:
> merenkulkijoiden jälkeläiset kokoontuvat yhä esi-isiensä nimeämillä
> marae-alueilla, kasvot kantavat sukua kertovia tatuointeja, ja
> taidokkaasti veistetyt kanootit lepäävät rannoilla valmiina.

### K1 — "Kanootti joka kantoi kansan" (waka)

> Waka tarkoittaa yksinkertaisesti kanoottia, mutta sana kantaa paljon
> enemmän: se on myös nimitys heimolle, joka polveutuu samasta
> muinaisesta purjehduskanootista. Suurimmat sotakanootit, waka taua,
> ovat jopa 40 metriä pitkiä, veistetty yhdestä tukevasta tōtara-
> puurungosta ja koristeltu jyrkillä pää- ja peräkuvioilla. Ne olivat
> niin pyhiä (tapu), ettei kanoottiin saanut viedä keitettyä ruokaa, ja
> siihen astuttiin vain laidan yli, ei keulasta tai perästä. Rauhan
> aikana kanootit kuljettivat ihmisiä ja tavaraa; sodan aikana jopa 80
> soutajaa mahtui yhteen alukseen.

Faktat ja lähteet:
- Waka taua (sotakanootit) ovat jopa 40 metriä pitkiä, veistetty
  yhdestä runkopuusta tōtarasta, koristeltuina päällä ja perällä; jopa
  80 soutajaa. — en-Wikipedia "Waka (canoe)"
- Waka oli tapu (pyhä): kanoottiin ei saanut tuoda keitettyä ruokaa, ja
  siihen noustiin laidan yli, ei keulasta/perästä. — en-Wikipedia
  "Waka (canoe)"
- Sana "waka" viittaa myös samasta muinaisesta kanootista polveutuvaan
  heimoryhmittymään — löyhä liitto eikä tiukka liittovaltio.
  — en-Wikipedia "Waka (canoe)"

### K2 — "Kasvot jotka kertovat suvun" (tā moko)

> Tā moko, māorien perinteinen kasvotatuointi, ei ollut koristelua vaan
> arvon ja suvun merkki. Se kaiverrettiin ihoon uhi-taltoilla —
> albatrossin luusta valmistetuilla veistintyökaluilla — mikä jätti
> ihoon uurteita eikä sileää pintaa niin kuin neulatatuointi. Miehet
> saivat moko-kuvion yleensä kasvoihin ja reisiin, naiset huuliin ja
> leukaan. Tatuoinnin saaminen oli tärkeä siirtymäriitti lapsuudesta
> aikuisuuteen, ja korkea-arvoisimmatkin päälliköt saattoivat joskus
> olla liian pyhiä (tapu) saadakseen sen. Vuoteen 1873 mennessä
> menetelmä oli jo muuttumassa neulojen myötä.

Faktat ja lähteet:
- Tā moko kaiverrettiin perinteisesti uhi-taltoilla (usein albatrossin
  luusta), jotka jättivät ihoon uurteita — toisin kuin myöhempi
  neulatatuointi. — en-Wikipedia "Tā moko"
- Miehet saivat moko-kuvion tyypillisesti kasvoihin, pakaroihin ja
  reisiin; naiset huuliin ja leukaan. Tatuoinnin saaminen oli
  siirtymäriitti lapsuudesta aikuisuuteen ja liitettiin manaan
  (arvovaltaan). — en-Wikipedia "Tā moko"
- Neulamenetelmä alkoi korvata uhi-taltat 1800-luvun loppupuolella;
  miesten kasvotatuointi väheni muotivirtausten myötä 1860-luvulta
  alkaen. — en-Wikipedia "Tā moko"

### K3 — "Paikka missä esi-isät puhuvat" (marae)

> Marae on avoin alue wharenui-kokoustalon edessä — tai laajemmin koko
> tämä alue rakennuksineen. Kokoustalo edustaa rauhan jumalaa Rongoa,
> avoin nurmialue vastapuolen jumalaa Tūmatauengaa. Marae toimii
> pōwhirin, virallisen tervetuliaisseremonian, näyttämönä, jossa
> puheenpito noudattaa tarkkoja perinteitä — joissakin heimoissa naiset
> eivät perinteisesti puhu marae-alueella, vaikka he esittävät kutsuvan
> karanga-huudon. Käytännössä lähes jokaisella heimolla ja hapū-
> alaheimolla on oma marae, joka on asukkailleen yhtä tärkeä kuin oma
> koti.

Faktat ja lähteet:
- Marae ātea on avoin alue wharenuin (kokoustalon) edessä; sana
  "marae" viittaa yleensä koko kompleksiin. Kokoustalo edustaa
  rauhan jumalaa Rongoa, avoin alue Tūmatauengaa. — en-Wikipedia
  "Marae"
- Marae-aluetta käytetään pōwhiri-tervetuliaisseremonioihin, joissa
  on puhetaitoa (whaikōrero); joissakin iwi/hapū-ryhmissä naiset eivät
  perinteisesti puhu marae-alueella, mutta esittävät karanga-kutsun.
  — en-Wikipedia "Marae"
- Lähes jokaisella iwillä (heimolla), hapūlla (alaheimolla) ja monilla
  pienillä yhteisöillä on oma marae; se on monelle māorille yhtä
  tärkeä kuin oma koti. — en-Wikipedia "Marae"

### K4 — "Tanssi joka ei ole sotatanssi" (haka)

> Haka on rytmikäs, huudettu ja laulettu tanssimuoto, jossa koko keho —
> kädet, jalat, kasvot, ulos työnnetty kieli — korostaa sanoja. Haka-
> lajeja on monia eri tarkoituksiin: juhliin, hautajaisiin, vieraiden
> vastaanottoon, ei vain sotaan — vaikka länsimaissa haka tunnetaan
> lähinnä taistelutanssina, tutkijat pitävät tätä yksinkertaistuksena.
> Yksi tunnetuimmista, "Ka Mate", on ngāti toa -heimon sotapäällikkö
> Te Rauparahan 1820-luvulla sepittämä juhlahaka, joka kuvaa ovelaa
> tapaa, jolla hän vältti vihollistaan — "elämän voitto kuolemasta".

Faktat ja lähteet:
- Haka on posture dance eli asentotanssi, jossa lauletaan tai huudetaan
  ja koko vartalo osallistuu ilmaisuun; haka-tyyppejä on useita eri
  tilaisuuksiin, ei vain sotaan — tutkijoiden mukaan pelkkä
  sotatanssikehys on virheellinen. — en-Wikipedia "Haka"
- "Ka Mate" -haka on Ngāti Toa -heimon sotapäällikkö Te Rauparahan
  (1760-luku–1849) sepittämä juhlahaka (haka taparahi, esitetään ilman
  aseita); kertoo hänen oveluudestaan vihollisiaan vastaan, tulkittu
  "elämän voitoksi kuolemasta". — en-Wikipedia "Haka"
- Haka nähdään näytöksissä kuvitettuna jo 1845 (maalaus). Nykyinen
  urheilujoukkueiden haka-perinne alkoi vasta 1888–89 — 15 vuotta
  isoisän matkan jälkeen, joten EI kuulu tähän 1873-tekstiin.
  — en-Wikipedia "Haka" (huom kirjoittajalle, osio 8)

**Minitehtäväehdokas (Maorikulttuuri):**
> Mihin puuhun māorien suuret sotakanootit (waka taua) perinteisesti
> veistettiin?
> Vaihtoehdot: mänty / **tōtara** / tammi / bambu
> Fakta: waka taua veistettiin yhdestä tōtara-runkopuusta.

*Vastaus löytyy nostosta K1.*

---

## 4. FAKTAPOHJA: Luonto

**Johdanto-ehdotus:**

> Uusi-Seelanti erosi mantereesta niin kauan sitten, että maahan ei
> kehittynyt yhtäkään maalla elävää nisäkästä lepakoita lukuun
> ottamatta — linnut täyttivät roolit, jotka muualla kuuluvat
> nisäkkäille. Ja maan alla, Rotoruan seudulla, itse maankuori kiehuu.

### L1 — "Maa ilman nisäkkäitä" (linnusto)

> Kun ensimmäiset ihmiset saapuivat Uuteen-Seelantiin, he löysivät
> saaret, joilla ei elänyt yhtäkään maalla elävää nisäkästä — vain
> kolme lepakkolajia. 80 miljoonaa vuotta kestänyt eristyneisyys antoi
> linnuille tilaisuuden täyttää nisäkkäiden paikat: kiivi haistaa
> saaliinsa maasta kuin kettu, ja kākāpō — maailman ainoa lentokyvytön,
> yöaktiivinen papukaija — pesii maassa vailla pelkoa maapetoja.
> Eurooppalaisten tuomat rotat, kissat ja kärpät romahduttivat tämän
> herkän tasapainon nopeasti, ja lähes puolet alkuperäisistä
> lintulajeista on sittemmin kuollut sukupuuttoon.

Faktat ja lähteet:
- Kolme lepakkolajia (yksi sittemmin sukupuuttoon kuollut) olivat ainoa
  merkki alkuperäisistä maanisäkkäistä Uudessa-Seelannissa ennen 2006
  löydettyä 16 miljoonaa vuotta vanhaa hiirenkokoisen nisäkkään
  fossiilia. — en-Wikipedia "New Zealand"
- Kākāpō on maailman ainoa lentokyvytön, yöaktiivinen papukaija, ja se
  käyttää lek-esittelyparitusta. — en-Wikipedia "Birds of New Zealand"
- Nearly puolet Uuden-Seelannin alkuperäisistä lintulajeista kuoli
  sukupuuttoon ihmisen saapumisen jälkeen — yksi historian suurimmista
  sukupuuttoaalloista. — en-Wikipedia "Birds of New Zealand"

### L2 — "Lintu jota kotka jahtasi" (moa ja Haastin kotka)

> Ennen ihmisten saapumista Uuden-Seelannin metsien valtiaita olivat
> yhdeksän moa-lajia — täysin siivettömiä, kookkaita kasvinsyöjälintuja
> joilla ei ollut edes surkastuneita siipiä, kuten muilla sukulaisillaan
> on. Niiden ainoa saalistaja oli valtava Haastin kotka. Kun polynesialaiset
> saapuivat 1300-luvun tienoilla, moa-kannat romahtivat metsästyksen
> vuoksi alle sadassa vuodessa — vuoteen 1445 mennessä kaikki lajit
> olivat kuolleet sukupuuttoon, ja pian niiden mukana myös Haastin
> kotka, joka menetti ravintonsa.

Faktat ja lähteet:
- Moa-lajeja oli yhdeksän; ne olivat ainoat täysin siivettömät linnut,
  ilman vestigiaalisia siipiäkään toisin kuin muut sileälastaiset
  linnut; niiden ainoa saalistaja oli Haastin kotka. — en-Wikipedia
  "Moa"
- Polynesialaiset saapuivat ennen vuotta 1300; kaikki moa-lajit olivat
  sukupuuttoon vuoteen 1445 mennessä, pääasiassa liikametsästyksen
  takia — tapahtui alle sadassa vuodessa asutuksesta. — en-Wikipedia
  "Moa"
- Haastin kotka kuoli sukupuuttoon moan mukana, koska menetti
  pääasiallisen ravintolähteensä. — en-Wikipedia "Moa"

### L3 — "Kaupunki joka haisee rikiltä" (Rotoruan geotermia)

> Rotorua sai lempinimensä "Sulphur City" rikkivedyn hajusta, joka
> leijuu kaupungin yllä — paikalliset kutsuvat sitä myös "Rotten-
> ruaksi". Te Arawa -heimon perimätiedon mukaan kaupungin kuumat lähteet
> syntyivät, kun muinainen tohunga (papittaja) Ngātoro-i-rangi rukoili
> jumalia lähettämään tulihenkiä kaukaisesta Hawaikista. Kaupunki on
> rakentunut 240 000 vuotta sitten syntyneen tulivuorikalderan päälle,
> ja sen geysirit ja mutakylvyt houkuttelivat sekä māoreja että
> eurooppalaisia jo 1800-luvulla — kylpyläkaupungiksi kehittämisestä
> sovittiin 99 vuoden maanvuokrasopimuksella Ngāti Whakauen kanssa.

Faktat ja lähteet:
- Rotorua tunnetaan lempinimillä "Sulphur City" (rikkivety haisee
  "mädälle munalle") ja "Roto-Vegas". — en-Wikipedia "Rotorua"
- Te Arawa -perimätiedon mukaan kuumat lähteet syntyivät tohunga
  Ngātoro-i-rangin rukoiltua jumalia lähettämään tulihenkiä
  Hawaikista. — en-Wikipedia "Rotorua"
- Rotoruan kaupunki sijaitsee n. 240 000 vuotta sitten syntyneessä
  Rotorua-kalderassa; 1800-luvun eurooppalaiset kiinnostuivat alueen
  kehittämisestä kylpyläkaupungiksi 99 vuoden maanvuokrasopimuksella
  Ngāti Whakaueltä. — en-Wikipedia "Rotorua"

### L4 — "Maailman kahdeksas ihme" (Pink and White Terraces)

> Vuonna 1873 Vaaleanpunaiset ja Valkoiset Terassit — Te Otukapuarangi
> ja Te Tarata māoriksi — ovat Uuden-Seelannin kuuluisin nähtävyys,
> maailman suurimmat piidioksiditerassit ja usein "maailman kahdeksanneksi
> ihmeeksi" kutsuttu kohde. Matka sinne kesti useita päiviä höyrylaivalla,
> kanootilla ja jalan, mutta palkinto oli sen arvoinen: valkoiset,
> lähes 8 hehtaarin terassiportaat ja vaaleanpunaiset kylpyaltaat, joissa
> jopa herttua Alfred kylpi 1869. Guide Sophia Hinerangi johdatti
> vierailijoita paikalle koko 1880-luvun alun — kunnes hän 13 vuotta
> isoisän matkan jälkeen, kesäkuussa 1886, näki ensimmäisenä Tarawera-
> vuoren purkauksen enteet ja terassit hautautuivat pysyvästi tuhkaan.

Faktat ja lähteet:
- Pink and White Terraces olivat ilmeisesti maailman suurimmat
  piidioksidi (silika) -sinteriesiintymät; kutsuttiin usein "maailman
  kahdeksanneksi ihmeeksi". — en-Wikipedia "Pink and White Terraces"
- White Terraces kattoivat n. 8 hehtaaria, laskeutuivat n. 50 tasanteen
  yli ja n. 25 metrin korkeuseron matkalla. — en-Wikipedia "Pink and
  White Terraces"
- Vierailijoita: Sir George Grey 1849, herttua Alfred (Edinburghin
  herttua) 1869, kirjailija Anthony Trollope 1874. Sophia Hinerangi
  toimi pääoppaana 1880-luvun alusta. — en-Wikipedia "Pink and White
  Terraces"
- Mount Tarawera purkautui 10.6.1886; terassit hautautuivat ja
  tuhoutuivat (myöhempi tutkimus kiistelee, säilyikö osa maan alla —
  valtaosa tutkimuksesta 2016 ja 2018 päätyi: "suurin osa tuhoutui").
  — en-Wikipedia "Pink and White Terraces", "1886 eruption of Mount
  Tarawera"

**Minitehtäväehdokas (Luonto):**
> Kuinka moni Uuden-Seelannin alkuperäisistä maanisäkkäistä oli
> lepakoita — ainoat maalla elävät nisäkkäät saarilla?
> Vaihtoehdot: 0 / **kaikki (3 lajia)** / puolet / neljäsosa
> Fakta: kolme lepakkolajia olivat ainoa merkki alkuperäisistä
> maanisäkkäistä.

*Vastaus löytyy nostosta L1.*

---

## 5. FAKTAPOHJA: Kulta ja talous

**Johdanto-ehdotus:**

> Vuonna 1861 mies löysi kimaltavaa hiekkaa purosta, ja Otago muuttui
> yhdessä vuodessa. Vuonna 1873 kultaryntäys on jo laantumassa, mutta
> yhdeksän vuoden päässä odottaa vielä suurempi mullistus: keksintö,
> joka tekee lampaasta koko maan elinkeinon.

### T1 — "Kulta kuin tähdet Orionissa" (Gabrielin kuru, 20.5.1861)

> 20. toukokuuta 1861 australialainen etsijä Gabriel Read löysi kultaa
> Tuapeka-joen rannalta lähellä nykyistä Lawrencea. "Lapioin pois noin
> 75 senttiä soraa, kunnes tulin kauniiseen pehmeään liuskeeseen ja
> näin kullan kimaltavan kuin tähdet Orionissa pakkasyönä", hän kirjoitti
> kymmenpäiväisestä etsintäretkestään. Uutinen levisi hitaasti kesäkuun
> alussa, mutta kun maakuntaneuvoston jäsen vahvisti löydön laajuuden,
> ryntäys alkoi: jouluun mennessä 14 000 etsijää työskenteli Tuapekan
> ja Waiporin kultakentillä, ja Otagon väkiluku nelinkertaistui kolmessa
> vuodessa.

Faktat ja lähteet:
- Gabriel Read löysi kultaa Gabrielin kurussa Tuapeka-joen varrella
  20.5.1861; kuvasi löytöä lauseella "gold shining like the stars in
  Orion on a dark frosty night". — en-Wikipedia "Otago Gold Rush"
- Uutinen julkaistiin Otago Witness -lehdessä 8.6.1861; laajempi
  ryntäys käynnistyi vasta kun John Hardy vahvisti löydön laajuuden.
  — en-Wikipedia "Otago Gold Rush"
- Joulukuuhun 1861 mennessä 14 000 etsijää oli Tuapekan ja Waiporin
  kentillä; alueen väestö kasvoi 400 % vuosina 1861–1864. —
  en-Wikipedia "Otago Gold Rush"

### T2 — "Kultakenttien naiset" (Otagon kultaryntäyksen arki)

> Kultakentät olivat enimmäkseen miesten maailmaa, mutta naisilla oli
> alusta asti oma roolinsa: Janet Robertson piti pientä mökkiä
> Tuapekassa ja juuri hänen kotonaan Gabriel Read kirjoitti kuuluisan
> löytökirjeensä maakuntaneuvostolle. Kirjailija Susan Nugent-Wood
> muutti perheineen Otagoon 1861 ja työskenteli useissa virallisissa
> tehtävissä kultakentillä, kirjoittaen tarinoita, jotka kuvasivat
> naisten arkea kaivosyhteisöissä. Leskeksi jääneet naiset saattoivat
> periä miehensä anniskeluluvan — Elizabeth Potts sai Victoria-hotellin
> luvan Lawrencessa 1869.

Faktat ja lähteet:
- Naiset toimivat kultakentillä vaimoina, äiteinä, yrittäjinä ja
  palveluntarjoajina ("colonial helpmeets"); Janet Robertsonin
  mökissä Tuapekassa Gabriel Read kirjoitti löytökirjeensä. —
  en-Wikipedia "Otago Gold Rush"
- Susan Nugent-Wood muutti perheineen Otagoon 1861, työskenteli useissa
  virallisissa tehtävissä kultakentillä ja kirjoitti tarinoita alueen
  elämästä. — en-Wikipedia "Otago Gold Rush"
- Elizabeth Potts sai Victoria-hotellin anniskeluluvan Lawrencessa 1869
  jäätyään leskeksi — esimerkki naisista, jotka perivät liiketoiminnan
  miehensä kuoltua. — en-Wikipedia "Otago Gold Rush"

### T3 — "Lampaat jotka kasvattivat maan" (villatalous ennen 1873)

> Ennen kultaa Uuden-Seelannin talous nojasi jo lampaisiin: 1840-luvulta
> lähtien laajat lammastilat veivät villaa Englannin tehtaisiin, ja
> uudisasukkaat vuokrasivat maata hallitukselta viiden punnan
> vuosivuokralla lisättynä punnalla jokaista tuhatta lammasta kohti yli
> ensimmäisen 5 000:n. Vuosina 1856–1876 myytiin 8,1 miljoonaa eekkeriä
> maata 7,6 miljoonalla punnalla, ja 2,2 miljoonaa eekkeriä annettiin
> ilmaiseksi sotilaille ja siirtolaisille. Metsä muuttui laitumeksi
> koko maan mittakaavassa — talous joka odotti vielä suurempaa
> mullistusta.

Faktat ja lähteet:
- 1840-luvulta alkaen laajat lammastilat veivät villaa Englannin
  tehtaisiin; paimentolaiset vuokrasivat maata hallitukselta 5 punnan
  vuosivuokralla + 1 punta jokaista 1 000 lammasta kohti yli
  ensimmäisen 5 000:n. — en-Wikipedia "History of New Zealand"
- Vuosina 1856–1876 myytiin 8,1 miljoonaa eekkeriä maata 7,6 miljoonalla
  punnalla; 2,2 miljoonaa eekkeriä annettiin ilmaiseksi sotilaille,
  merimiehille ja siirtolaisille. — en-Wikipedia "History of New
  Zealand"
- Talous perustui maatalouteen, ja maisema muuttui metsästä
  maatalousmaaksi. — en-Wikipedia "History of New Zealand"

### T4 — "Yhdeksän vuoden päässä oleva vallankumous" (jäähdytetty liha, 1882)

> Vuonna 1873 kukaan Uudessa-Seelannissa ei vielä tiedä, että
> yhdeksän vuoden päästä laiva nimeltä Dunedin muuttaa koko maan
> talouden suunnan. 15. helmikuuta 1882 tuo laiva purjehtii Port
> Chalmersista Lontooseen lastinaan yli 4 300 lampaan ja 22 sian
> ruhoa — ensimmäinen onnistunut jäähdytetyn lihan täysi laivalasti
> Uudesta-Seelannista. Matkalla kapteeni Whitson ryömi itse jäähdytetyn
> ruuman sisään sahaamaan ylimääräisiä ilma-aukkoja pelastaakseen
> lastin ja melkein paleltui kuoliaaksi. Lontoossa liha myytiin
> Smithfieldin torilla, ja The Times ylisti sitä "voitoksi fyysisistä
> vaikeuksista, jota olisi pidetty uskomattomana vielä muutama päivä
> sitten". Villan rinnalle syntyi uusi vientituote — pakastettu liha —
> joka kantoi Uuden-Seelannin taloutta seuraavat sata vuotta.

Faktat ja lähteet:
- Laiva Dunedin (rakennettu 1874) purjehti 15.2.1882 Port Chalmersista
  Lontooseen lastinaan 4 331 lampaan, 598 karitsan ja 22 sian ruhoa —
  ensimmäinen onnistunut täysi jäähdytetyn lihan laivalasti Uudesta-
  Seelannista. — en-Wikipedia "Dunedin (1874 ship)"
- Matkalla kapteeni John Whitson ryömi jäähdytettyyn ruumaan sahatakseen
  ylimääräisiä ilma-aukkoja, kun kylmä ilma ei kierrä kunnolla —
  miehistö veti hänet ulos köydellä ja elvytti. — en-Wikipedia
  "Dunedin (1874 ship)"
- Liha myytiin Smithfieldin torilla Lontoossa; The Times kommentoi
  saavutusta "voitoksi fyysisistä vaikeuksista". Laiva saapui Lontooseen
  98 päivässä. — en-Wikipedia "Dunedin (1874 ship)"
- Uudistus perustui Bell-Coleman-jäähdytyskoneeseen, jolla laiva
  varusteltiin 1881; Uusi-Seelanti nojasi jäähdytettyyn vientiin aina
  1970-luvulle asti. — en-Wikipedia "History of New Zealand",
  "Dunedin (1874 ship)"

**Minitehtäväehdokas (Kulta ja talous):**
> Missä Gabriel Read löysi kultaa toukokuussa 1861, käynnistäen Otagon
> kultaryntäyksen?
> Vaihtoehdot: **Gabrielin kuru, Tuapeka-joki** / Waikato-joki /
> Milford Sound / Auckland
> Fakta: löytö tehtiin Tuapeka-joen varrella 20.5.1861.

*Vastaus löytyy nostosta T1.*

---

## 6. FAKTAPOHJA: Merenkulku ja löytöretket

**Johdanto-ehdotus:**

> Uusi-Seelanti on maailman viimeisiä suuria maita, jonka ihmisjalka
> koski vasta muutama sata vuotta sitten — ja vielä isoisän aikana sen
> saavuttaminen vaatii yhtä pitkän ja vaarallisen merimatkan kuin
> ensimmäisiltä löytöretkeilijöiltä.

### P1 — "Purjehdus tuntemattomaan" (polynesialaiset waka-purjehtijat)

> Kauan ennen eurooppalaisia polynesialaiset purjehtijat löysivät
> Aotearoan avomeren yli — luultavasti suurilla kaksirunkoisilla waka
> hourua -kanooteilla, navigoiden tähtien, aaltojen ja lintujen
> mukaan ilman kompassia. Perimätieto nimeää useita kanootteja, joilla
> uskotaan saavutun maahan, ja niiden nimet elävät yhä heimojen
> identiteetissä. Vanhin löydetty kanoottijäänne, Anaweka-waka
> Etelä-saaren rannikolta, on radiohiiliajoitettu noin vuoteen 1400 —
> se osoittaa, että Aotearoaan saapuneet purjehtijat rakensivat jo
> täällä kehittyneitä, muun Polynesian tyylin mukaisia aluksia.

Faktat ja lähteet:
- Polynesian settlers migrated to New Zealand suurilla waka-kanooteilla;
  perimätiedon mukaan osa oli waka hourua eli kaksirunkoisia aluksia.
  — en-Wikipedia "Waka (canoe)"
- Vanhin löydetty kanoottijäänne, Anaweka-waka Tasman-piirikunnasta,
  radiohiiliajoitettu noin vuoteen 1400; rakennettu Uudessa-Seelannissa,
  tyyliltään muiden polynesialaisten purjehduskanoottien kaltainen.
  — en-Wikipedia "Waka (canoe)"
- HUOM kirjoittajalle: "Great Fleet" -teoria (7 kanoottia saapui yhtä
  aikaa 1350) on 1900-luvun alun tutkijan S. Percy Smithin
  kyseenalaiseksi osoitettu rekonstruktio, ei historiallinen tosiasia —
  vältä esittämästä sitä totena, käytä yleisempää "perimätiedon mukaan"
  -muotoilua. — en-Wikipedia "Māori migration canoes"

### P2 — "Murhaajien lahti" (Abel Tasman, joulukuu 1642)

> Hollantilainen Abel Tasman oli ensimmäinen eurooppalainen, joka näki
> Uuden-Seelannin — 13. joulukuuta 1642 hän tähysti Etelä-saaren
> lounaisrannikkoa purjehtien Itä-Intian kauppakomppanian palveluksessa.
> Kohtaaminen kääntyi nopeasti väkivaltaiseksi: kun māorien waka
> lähestyi Tasmanin aluksia Golden Bayssa, neljä hollantilaista
> merimiestä kuoli patu-aseiden iskuista veneiden välillä soutaessaan.
> Tasman nimesi paikan "Murhaajien lahdeksi" ja purjehti pois
> koskaan astumatta maihin. Hän uskoi löytäneensä osan kuvitellusta
> eteläisestä jättimantereesta — käsitys, jonka vasta James Cook
> kumosi 127 vuotta myöhemmin.

Faktat ja lähteet:
- Abel Tasman näki ensimmäisenä eurooppalaisena Uuden-Seelannin
  länsirannikon 13.12.1642 ja nimesi maan "Staten Landt" (myöhemmin
  "Nieuw Zeeland"). — en-Wikipedia "Abel Tasman"
- Golden Bayssa māorien waka hyökkäsi soutuveneiden väliin liikkuvien
  merimiesten kimppuun; neljä hollantilaista kuoli patu-lyönteihin.
  Tasman nimesi paikan Murderers' Bayksi eikä koskaan astunut maihin.
  — en-Wikipedia "Abel Tasman"
- Tasman uskoi löytäneensä osan kuvitellusta Terra Australiksesta;
  teoria kumottiin lopullisesti vasta kun James Cook purjehti Uuden-
  Seelannin ympäri 1769. — en-Wikipedia "Abel Tasman"

### P3 — "Kartta joka piirtyi kokonaan" (James Cook, 1769–1770)

> Lokakuussa 1769 James Cook laski ankkurin Poverty Baylle Endeavour-
> aluksellaan — ensimmäinen eurooppalainen, joka astui Uuden-Seelannin
> maaperälle ja kommunikoi māorien kanssa, tahitilaisen pappi Tupaian
> avustuksella tulkkina. Ensikohtaamiset kääntyivät valitettavasti
> väkivaltaisiksi, mutta Cook jatkoi matkaa pohjoiseen ja tammikuussa
> 1770 saapui Queen Charlotte Soundiin, josta tuli hänen tukikohtansa.
> Siellä hän vahvisti salmen erottavan Pohjois- ja Etelä-saaren
> toisistaan. Lopulta Cook purjehti koko Uuden-Seelannin ympäri ja
> kartoitti lähes koko rantaviivan — saavutus, joka teki hänen
> kartoistaan käyttökelpoisia vielä isoisän matkan aikaan sata vuotta
> myöhemmin.

Faktat ja lähteet:
- Cook ankkuroitui Poverty Baylle lokakuussa 1769; Tahitilaisen papin
  Tupaian avulla hän oli ensimmäinen eurooppalainen joka kommunikoi
  māorien kanssa. Ensikohtaamiset kääntyivät väkivaltaisiksi. —
  en-Wikipedia "James Cook"
- Tammikuussa 1770 Cook saapui Queen Charlotte Soundiin, väitti alueen
  Britannialle ja vahvisti salmen (Cookinsalmi) erottavan Pohjois- ja
  Etelä-saaren. — en-Wikipedia "James Cook"
- Cook täydensi Uuden-Seelannin pääsaarten ensimmäisen tunnetun
  ympäripurjehduksen ja kartoitti lähes koko rantaviivan. —
  en-Wikipedia "James Cook"

### P4 — "Sata vuorokautta merellä" (purjehdusaika Lontoo–Uusi-Seelanti)

> Isoisän aikaan matka Englannista Uuteen-Seelantiin kesti purjelaivalla
> tyypillisesti reilun kolme kuukautta — laiva Dunedin teki
> ensimmäisen matkansa Lontoosta Lytteltoniin 98 vuorokaudessa vuonna
> 1874, ja seuraavana vuonna Aucklandiin 94 vuorokaudessa. Kaikki
> hänen seitsemän matkaansa ennen jäähdytyskonversiota kestivät alle
> sata päivää — nopea aika sille etäisyydelle, mutta silti kolmasosa
> vuodesta merellä, ilman pysähdyksiä matkan varrella. Vasta höyrylaivat
> ja Suezin kanava (avattu 1869) alkoivat 1870-luvulla lyhentää tätä
> etäisyyttä hitaasti — mutta Uusi-Seelanti pysyi silti maailman
> kaukaisimpia matkakohteita.

Faktat ja lähteet:
- Dunedinin ensimmäinen matka Lontoosta Lytteltoniin kesti 98
  vuorokautta (1874); vuonna 1875 Lontoosta Aucklandiin 94
  vuorokautta. Kaikki seitsemän matkaa ennen jäähdytyskonversiota
  kestivät alle 100 vuorokautta. — en-Wikipedia "Dunedin (1874 ship)"
- Sama laiva purjehti myöhemmin 98 vuorokaudessa Port Chalmersista
  Lontooseen jäähdytetyn lihan lastin kanssa 1882. — en-Wikipedia
  "Dunedin (1874 ship)"

**Minitehtäväehdokas (Merenkulku):**
> Kuka eurooppalainen tähysti Uuden-Seelannin ensimmäisenä, joulukuussa
> 1642?
> Vaihtoehdot: James Cook / **Abel Tasman** / Francis Drake /
> Ferdinand Magellan
> Fakta: Tasman näki maan 13.12.1642, mutta ei koskaan astunut maihin.

*Vastaus löytyy nostosta P2.*

---

## 7. Maan intro (~6 virkettä)

Kotipaikka: `js/packs/oceania-artikkelit.js` (tai vastaava tiedosto,
ks. avoin kysymys A) avaimella maan wiki-nimi "Uusi-Seelanti".

> Uusi-Seelanti on kaksi pitkää, vuoristoista saarta maailman
> eteläisimmillä leveysasteilla — yksi viimeisistä suurista maista,
> jonne ihmisjalka on koskettanut. Polynesialaiset purjehtijat
> löysivät nämä saaret satoja vuosia ennen eurooppalaisia ja antoivat
> niille nimen Aotearoa, "pitkän valkoisen pilven maa". Vuonna 1873
> ase on vasta vaiennut: vuosikymmeniä kestäneet Uuden-Seelannin sodat
> päättyivät edellisenä vuonna, ja koko maan suhde kantaa Waitangin
> sopimuksen kolmekymmentä vuotta vanhoja, riidanalaisia lupauksia.
> **Māorikulttuuri elää vahvana** — kaiverretut kanootit, kasvo-
> tatuoinnit ja heimojen kokoontumispaikat ovat osa arkea, ei museota.
> Etelässä kultaryntäys muutti Otagon yhdessä vuodessa villiksi
> etsijöiden kaupungiksi, ja pohjoisessa Rotoruan geysirit ja
> maailmankuulut Vaaleanpunaiset ja Valkoiset Terassit vetävät
> matkailijoita — vaikka kukaan ei vielä tiedä, että tulivuori vie ne
> mukanaan 13 vuoden päästä. **Isoisän matkapäiväkirja** kulkee tähän
> nuoreen, ristiriitaiseen ja upean luonnon maahan juuri sillä
> hetkellä, kun rauha on hauras ja suurin taloudellinen mullistus —
> jäähdytetty liha Englantiin — on vielä yhdeksän vuoden päässä.

(n. 950 merkkiä — pituusluokka vastaa USA:n `intro`-kenttää.)

---

## 8. Kuvaehdokkaiden kategorialistaus (Commonsista)

Kategoriat tarkistettu Commonsin API:sta (`prop=categoryinfo`) 23.8.2026
— API-rajapinta antoi useita "too many requests" (429) -vastauksia
tätä koostetta tehtäessä (Commonsin rajapinta oli poikkeuksellisen
herkkä juuri nyt), joten alla oleva lista on OSITTAINEN. Loput on
tarkistettava lehtityövaiheessa `lehtityo-resepti.md`:n mukaisesti.

**Varmistettu olemassaolevaksi:**
- H1 Waitangin sopimus → `Category:Treaty of Waitangi` (44 tiedostoa)
- H3 Gate Pā → `Category:Battle of Gate Pā` (6 tiedostoa — ohut, hae
  myös laajemmalta "Tauranga campaign" tai "New Zealand Wars"
  -kategoriasta)
- K2 Tā moko → `Category:Tā moko` (175 tiedostoa)
- K3 Marae → `Category:Marae` (11 tiedostoa — ohut, hae myös
  yksittäisten tunnettujen marae-kohteiden kategorioista, esim.
  Waitangi Treaty Grounds)

**Ei ehditty tarkistaa (429-rajoitus katkaisi haun) — hakusanaehdotus
lehtityövaiheeseen:**
- H2/H4 Uuden-Seelannin sodat yleiskuvitus → hae
  `Category:New Zealand Wars`
- K1 Waka → hae `Category:Waka (canoes)` tai `Category:Māori canoes`
- K4 Haka → hae `Category:Haka` (HUOM: valitse 1800-luvun tai
  yleiskuvaava kuva, ei nykyisiä rugby-ottelukuvia — 1873-lehteen ei
  sovi All Blacks -konteksti, joka alkoi vasta 1888)
- L1/L2 Linnusto ja moa → hae `Category:Kiwi (bird)`,
  `Category:Moa`, `Category:Kākāpō` — moan luukuvat ja 1800-luvun
  kuvitukset (Haastin kotka -maalaus mainittu artikkelissa) ovat hyviä
  vaihtoehtoja valokuvien puutteessa
- L3 Rotorua → hae `Category:Pōhutu Geyser`, `Category:Whakarewarewa`
- L4 Pink and White Terraces → hae `Category:Pink and White Terraces`
  — 1800-luvun maalauksia (Charles Blomfield maalasi terasseja useaan
  otteeseen ennen 1886) ja valokuvia pitäisi löytyä, koska kohde on
  tuhoutunut eikä nykykuvia ole
- T1/T2 Otagon kultaryntäys → hae `Category:Otago Gold Rush`,
  `Category:Gabriel Read`
- T4 Dunedin-laiva → hae `Category:Dunedin (ship, 1874)` tai
  "SS Dunedin 1882"
- P1 Waka-purjehdus/Anaweka → hae `Category:Anaweka waka` tai
  yleisemmin polynesialainen navigointi -aiheisista kuvista
- P2 Tasman → hae `Category:Abel Tasman`
- P3 Cook Uudessa-Seelannissa → hae `Category:James Cook in New
  Zealand` tai yleinen `Category:James Cook`

**MAAKARTAT-nosto:** ei tarkistettu tässä koosteessa (ks. osio 9).

Yleishuomio: kaikki tähän mennessä löydetyt kategoriat ovat
aihepiiriltään kiistattomasti Uudesta-Seelannista.

---

## 9. MAAKARTAT-rivin tarve — TEKNINEN AVOIN KYSYMYS

NZL:n `MAAKARTAT`-rivin olemassaoloa ei tarkistettu tässä koosteessa
(grep jäi tekemättä ajanpuutteen vuoksi) — seuraavan kirjoittajan
pitää tarkistaa `js/packs/maakartat.js`:stä ennen kirjoitustyötä,
samalla logiikalla kuin USA-koosteen osiossa 9: onko NZL:llä jo rivi,
ja jos on, minkä projektion se käyttää (tasavälinen vai erikois-
haara). Uusi-Seelanti koostuu kahdesta pitkänomaisesta saaresta —
tasavälinen kartta lienee suoraviivaisempi kuin USA:n Alaska/Havaiji-
ongelma, mutta tarkistus on silti tehtävä ennen lukkoon lyömistä.

**Ehdotetut 5 kaupunkia** (jos/kun rivi tehdään tai tarkistetaan) —
samat kuin pelin NZL-kaupungit (`oceania.js`, `CITY_COUNTRY`):

| Nimi | Huom |
|---|---|
| Auckland | suurin kaupunki, `airport: true`, Sydney-lentoreitin pääte |
| Wellington | pääkaupunki, Cookinsalmen rannalla |
| Christchurch | Etelä-saari, Canterbury |
| Dunedin | Etelä-saari, Otagon kultaryntäyksen ja jäähdytyslaivan
  kotisatama — HUOM: erittäin luonteva ankkuri T1/T2/T4-nostoille |
| Milford Sound | Etelä-saaren lounaisvuono, luonto |

(Koordinaatteja ei haettu erikseen tässä koosteessa — hae ja tarkista
ennen käyttöä.)

---

## 10. 1873-kulma koottuna

- **Yksi vuosi ennen (1872):** Uuden-Seelannin sodat päättyvät
  Te Kootin saadessa turvapaikan (H4); rauha on tuore ja hauras.
- **Kolmetoista vuotta ennen (1861):** Otagon kultaryntäys alkaa
  Gabriel Readin löydöstä (T1); Otago nelinkertaistuu kolmessa
  vuodessa.
- **Kolmekymmentä vuotta ennen (1840):** Waitangin sopimus
  allekirjoitetaan — sen tulkintaerot elävät yhä 1873 (H1).
- **Yhdeksän vuoden päässä TULEVAISUUDESSA (1882):** ensimmäinen
  jäähdytetyn lihan täysi laivalasti Englantiin, Dunedin-laivalla —
  mullistaa koko talouden (T4). Vahva "mitä isoisä ei vielä tiedä"
  -kulma.
- **Kolmentoista vuoden päässä TULEVAISUUDESSA (1886):** Pink and
  White Terraces tuhoutuvat Tarawera-vuoren purkauksessa — 1873
  matkustaja näkee ne vielä ehjinä (L4).
- **Reilut sata vuotta ennen (1769–70):** James Cook purjehtii koko
  maan ympäri ja kartoittaa sen — hänen karttansa ovat yhä
  käyttökelpoisia isoisän aikaan (P3).
- **Yli 230 vuotta ennen (1642):** Abel Tasman, ensimmäinen
  eurooppalainen näkijä, ei koskaan astu maihin (P2).

Erityisen vahva rakenteellinen piirre: Uuden-Seelannin faktapohja
osuu KAHTEEN suuntaan ajassa yhtä voimakkaasti — tuore menneisyys
(sodat juuri päättyneet, kultaryntäys jo tapahtunut) JA lähitulevaisuus
(jäähdytysliha 1882, Tarawera 1886), mikä antaa kirjoittajalle
harvinaisen mahdollisuuden rakentaa jännitettä "mitä isoisä ei vielä
tiedä" -kehyksellä sekä taakse- että eteenpäin.

---

## 11. Avoimet kysymykset

**A. `oceania-artikkelit.js` (tai vastaava ARTIKKELIT-paketti) ei ole
tarkistettu tässä koosteessa.** Maan intro (osio 7) tarvitsee
kotipaikan — tarkista ensin, onko tiedosto jo olemassa Oseania-pilotin
muun työn (Sydney/Auckland) myötä, ennen kuin päätät sijoituksesta.

**B. MAAKARTAT-rivin tila (osio 9) on tarkistamatta.** Ratkaistava
ennen kartan piirtämistä — todennäköisesti suoraviivaisempi tapaus
kuin USA/RUS, mutta vahvistus puuttuu.

**C. Aihevalinta (5/5) on ehdotus, ei lukittu.** Erityisesti Ruoka
(lampaan liha, hāngī-maauuni, aineeton kulttuuriperintö -tyyppinen
aihe) ja Musiikki (waiata-laulu) olisivat olleet mahdollisia
vaihtoehtoja Kulta ja talous- tai Maorikulttuuri-aiheelle. Valitsin
nykyiset viisi, koska ne antavat vahvimman 1873-kulman JA kattavat
spec-mantereet.md:n eksplisiittisesti vaatimat teemat (maorikulttuuri,
Waitangi, luonto ilman maanisäkkäitä, Pink and White Terraces,
kultaryntäys, jäähdytyslaivalasti) ilman päällekkäisyyttä. Fablen
päätettäväksi, ansaitseeko Ruoka tai Musiikki oman sivunsa myöhemmin
(esim. jos Wellington tai Christchurch saavat oman kaupunkilehden ja
tarvitsevat lisää maa-aiheita erottumaan Aucklandin kannesta).

**D. Kaupunkien maalehti-päällekkäisyys ei ole vielä ongelma**, koska
yhdelläkään pelin NZL-kaupungeista ei vielä ole omaa kaupunkilehteä
eikä `oceania-questions.js`:ssä (tarkistettava ennen kirjoitusta) ole
vielä NZL-spesifisiä kulttuurivisakysymyksiä, joiden kanssa tämän
faktapohjan minitehtävät voisivat törmätä. Kun Auckland saa oman
lehtensä, `tools/tarkista-aihetoisto.mjs` kannattaa ajaa heti.

**E. Sisältökuri: Uuden-Seelannin sodat ja Waitangi.** Näissä on
noudatettu spec-mantereet.md:n Oseania-linjausta: historia (myös
väkivaltainen) kerrotaan suoraan mutta ilman yksityiskohtien
korostusta, piikki kolonialismin ajan herroihin itseensä — ei
paikallisille eikä sotilaille kummallakaan puolella. Gate Pān
taistelun (H3) aikalaislainaus ("puolialastomia villejä") on
merkitty selvästi aikalaisääneksi, ei kirjoittajan omaksi — Fablen
kannattaa tarkistaa, ettei sitä käytetä ilman kontekstointia
lopullisessa tekstissä. Haka (K4) on tarkoituksella rajattu 1873-
kontekstiin ilman viittausta myöhempään rugby-perinteeseen (alkoi
1888), joka olisi ajallisesti väärässä paikassa maalehdessä.

**F. "Great Fleet" -myytti (P1) vaatii varovaisuutta kirjoitusvaiheessa.**
1900-luvun alun tutkija S. Percy Smith rakensi 1350-luvun "seitsemän
kanootin suurfleeti" -teorian, joka on sittemmin osoitettu suurelta
osin keksityksi ja jota opetettiin virheellisesti kouluissa
vuosikymmeniä. Nosto P1 välttää tämän tietoisesti ja käyttää yleisempää
"perimätiedon mukaan" -kehystä ilman täsmällisiä vuosilukuja tai
kanoottien nimien esittämistä historiallisena tosiasiana.

**G. Kuvahaku osittain kesken (osio 8).** Commonsin API-rajapinta
antoi toistuvia 429-vastauksia 23.8.2026 tätä koostetta tehtäessä.
Vain neljä kategoriaa (Waitangin sopimus, Gate Pā, Tā moko, Marae)
ehdittiin varmistaa — loput 16 nostoa tarvitsevat kategoriahaun
lehtityövaiheessa. Nukkuva 5–6 s haun välissä ei riittänyt tänään;
seuraava kirjoittaja voi tarvita pidempiä taukoja tai eri kellonajan.

**H. Milford Sound -kaupunki ei saanut omaa nostoa.** Se on
listattuna NZL:n kaupungeista (`CITY_COUNTRY`), mutta mikään tämän
koosteen 20 nostosta ei erityisesti liity vuonoihin/Fiordlandiin.
Luonto-aihe (osio 4) käsittelee lähinnä lintuja ja geotermiaa —
Fable voi harkita, tarvitaanko vielä yksi luontonosto vuonoista, jos
Milford Sound saa oman kaupunkilehden myöhemmin.
