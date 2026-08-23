# Argentiinan maalehti (ISO-3: ARG) — sisältösuunnitelma ja faktapohja

*Koonnut Sonnet-faktapohja-agentti 23.8.2026. Kaikki en-Wikipedia-faktat
haettu tänä päivänä raakatekstihaulla
(`https://en.wikipedia.org/w/index.php?title=X&action=raw`,
`NODE_USE_ENV_PROXY=1`; suora haku palautti aluksi 429 "Too many
requests" — uusintayritys kasvavalla viiveellä toimi). Malli luettu
tiedostosta `docs/mantereet-tyoaineisto/faktapohja-usa.md` (rakenne ja
ulkoasu) sekä `js/packs/maa-kategoriat.js` (ITA/IND-lohkot). Rakenteen ja
mittojen SITOVA lähde on `docs/moduulit/maalehti.md` ja
`docs/aasia-tyoaineisto/lehtityo-resepti.md`; sisältölinjausten SITOVA
lähde on `docs/mantereet-tyoaineisto/spec-mantereet.md` (E-Amerikka-osio)
ja `js/tyohuone-raamattu.js`. Ei lopullisia lehtitekstejä, ei ladattuja
kuvia, ei kosketusta js/packs-tiedostoihin — tämä on vain suunnitelma
seuraavaa kirjoittajaa (riippumaton tarkistus, sitten Opus) varten.*

Sisältölinjaus tarkistettu spec-mantereet.md:stä: Falkland-suvereniteetti-
kiista (ei koske tätä lehteä suoraan, ARG-kaupungeista mikään ei ole
Falkland) korkeintaan yhdellä neutraalilla virkkeellä jos aihe joskus
sivuaa sitä; alkuperäiskansat asukkaidensa silmin, oma nimi ennen
siirtomaanimeä; ns. Aavikon valloitus (1878-) kerrotaan tapahtumana
neutraalisti ja hienotunteisesti, ilman yksityiskohtien korostusta ja
ilman kummankaan puolen sankarikehystä — se on 1873:n jälkeinen
TULEVAISUUDEN tapahtuma isoisän matkan hetkellä, ei vielä käynnissä.
Ei nykypolitiikkaa eikä nykyrikollisuutta.

---

## 1. Sisältösuunnitelma: miksi juuri nämä viisi aihetta

Argentiina on E-Amerikan pilottierän toinen maa (Buenos Aires + ARG,
rinnalla Rio + BRA). Pelin ARG-kaupungit ovat Buenos Aires (`start: true`,
pelin aloituspaikka!), Iguazú (putoukset) ja Salta (luoteinen Andien
kaupunki) — `js/packs/southamerica.js`. Näiden kolmen kaupungin kirjo
(pääkaupunki, sademetsäputous, Andien reunan siirtomaakaupunki) tukee
maalehti.md:n täyttä mittaa: **5 aihetta × 4 nostoa = 20 nostoa**.

Ehdotetut aiheet ja miksi juuri ne:

1. **Historia** — Sarmiento on Argentiinan presidentti TÄSMÄLLEEN
   isoisän matkan aikana (1868–1874); hänen koulu-uudistuksensa,
   väestönlaskentansa (1869) ja "sivistys vastaan barbaria" -ajattelunsa
   ovat poikkeuksellisen tarkka 1873-ankkuri, samalla tavalla kuin
   Yellowstone oli USA:lle.
2. **Gaucho ja pampa** — juuri vuonna 1872 ilmestyi *Martín Fierro*,
   kansalliseepos gauchosta; Sarmiento itse kirjoitti tuolloin, että
   "gauchon aikakausi on päättynyt" — pampan elämäntapa on isoisän
   matkan hetkellä juuri murroksessa. Aihe kantaa myös alkuperäiskansat
   (mapuche) kunnioittavasti, ennen heidän kotiseutunsa pampaa ja
   Patagoniaa käsittelevän Luonto-aiheen kanssa.
3. **Musiikki ja tanssi** — tango ei ole VIELÄ syntynyt 1873:na (se
   muotoutuu 1880-luvulla), mutta sen ainekset — candombe, payada,
   milonga — ovat jo olemassa Buenos Airesin kaduilla ja pampan
   leirinuotioilla. "Vasta syntymässä" -kulma on juuri tehtävänannon
   mukainen.
4. **Luonto** — Iguazún putoukset (löydetty eurooppalaisille 1541,
   mutta suojelu vasta 1900-luvulla — isoisän aikana koskematon
   erämaa), pampan ja Patagonian eläimistö, Aconcagua (mantereen
   korkein huippu, VIELÄ kiipeämätön 1873:na — ensinousu vasta 1897).
5. **Ruoka** — asado, mate ja empanada kantavat Argentiinan
   ruokakulttuurin risteytymää (alkuperäiskansat, Espanja, Länsi-Afrikka,
   myöhemmin Italia); mukana myös Sarmiento itse tilasi 1868 Ranskasta
   viiniköynnöksiä, joista syntyi Mendozan malbec — suora side
   Historia-aiheeseen.

**Pois jätetyt/vaihtoehtoiset aiheet ja miksi:** "Kuvataide" ja
"Rakennukset" olisivat mahdollisia (ITA/IND-malli), mutta niiden
1873-aineisto jäi tässä koosteessa ohuemmaksi kuin ylläolevien viiden —
Buenos Airesin arkkitehtuuri (esim. Teatro Colón, Casa Rosada) sopii
paremmin tulevaan Buenos Aires -kaupunkilehteen, ei maalehteen (samalla
logiikalla kuin maalehti.md:n periaate "maa kantaa aiheet, kaupunki
kantaa kannen"). "Alkuperäiskansat" harkittiin omaksi aiheekseen, mutta
päädyin hajauttamaan sen kahteen luontevaan kotiin (mapuche Gaucho-
aiheessa, koska pampa on heidän kotiseutunsa; ks. osio 11 avoin kysymys).

### 1b. Mallikatsaus

Rakenne, kenttänimet (`otsikko`, valinnainen `aika`, `tiedosto`, `teksti`
440–660 mrk, `selite` yksi virke, `lahde` 'Tekijä, Wikimedia Commons
(LISENSSI)', `wiki` fi-Wikipedia-hakusana) ja mitoitus noudattavat
tarkalleen `docs/mantereet-tyoaineisto/faktapohja-usa.md`:n mallia, joka
puolestaan noudattaa ITA/IND-lohkoja `js/packs/maa-kategoriat.js`:ssä.

---

## 2. FAKTAPOHJA: Historia

**Johdanto-ehdotus (n. 220–260 mrk):**

> Vuonna 1873 nuori tasavalta elää presidentti Domingo Faustino
> Sarmienton kautta: mies, joka on kiertänyt maailmaa etsimässä parasta
> koulujärjestelmää ja tuo nyt luokkahuoneen jokaiseen kylään. Verinen
> sisällissota Paraguayta vastaan on juuri päättynyt, ja miljoonat
> eurooppalaiset ovat vasta tulossa.

### H1 — "Presidentti, joka rakensi 800 koulua" (Sarmiento, 1868–1874)

> Domingo Faustino Sarmiento nousi Argentiinan presidentiksi lokakuussa
> 1868 — mies, joka oli aloittanut opettajana isänsä köyhässä kylässä ja
> matkustanut sittemmin Eurooppaan ja Yhdysvaltoihin tutkimaan
> koulujärjestelmiä. Presidenttinä hän teki koulutuksesta hallituksensa
> tärkeimmän asian: kuuden vuoden aikana valtio perusti noin 800 uutta
> alakoulua, ja koululaisten määrä kolminkertaistui 30 000:sta yli
> 100 000:een. Hän toi Yhdysvalloista yli 60 naisopettajaa kouluttamaan
> uusia opettajia maan omiin opettajaseminaareihin — ratkaisu, joka oli
> tuolloin ainutlaatuinen Etelä-Amerikassa. Sarmiento ei ollut suosittu
> presidentti: Paraguayn sota söi rahaa, ja pääkaupungin ja maakuntien
> välinen kilpailu jatkui koko hänen kautensa ajan. Silti hänen
> koulu-uudistuksensa teki argentiinalaisista pian yhden maanosan
> luetuimmista kansoista.

Faktat ja lähteet:
- Sarmiento oli Argentiinan presidentti 12.10.1868–11.10.1874.
  — en-Wikipedia "Domingo Faustino Sarmiento"
- Vuosina 1868–1874 provinsseille maksetut koulutustuet
  nelinkertaistuivat; presidenttikaudella perustettiin n. 800 uutta
  koulua (yhteensä 1 816, joista 27 % yksityisiä) ja koululaisten määrä
  nousi 30 000:sta 110 000:een. — en-Wikipedia "Domingo Faustino
  Sarmiento"
- Sarmiento toi Yhdysvalloista yli 75 opettajaa (71 naista, 4 miestä)
  kouluttamaan opettajia Argentiinan uusiin opettajaseminaareihin
  ("escuelas normales"), Paranán opettajaseminaarin (perustettu 1870)
  mallin mukaan. — en-Wikipedia "Domingo Faustino Sarmiento"
- Historioitsija David Rockin mukaan Sarmienton hallituskausi oli
  suosionsa puolesta pettymys: Paraguayn sota ja pääkaupungin ja
  maakuntien kilpailu varjostivat kautta. — en-Wikipedia "Domingo
  Faustino Sarmiento"

### H2 — "Ensimmäinen kansanlaskenta" (1869)

> Yhtenä ensimmäisistä toimistaan presidenttinä Sarmiento määräsi
> Argentiinan ensimmäisen kansallisen väestönlaskennan vuonna 1869.
> Tulos oli 1 836 490 asukasta — pieni luku valtavalle maalle. Vain 8 %
> heistä oli eurooppalaisia maahanmuuttajia, mutta 1870-luvulla
> aaltoliike vasta kiihtyi: samana vuonna 11 % koko maan väestöstä ja
> peräti puolet Buenos Airesin asukkaista oli äskettäin saapuneita
> siirtolaisia. Laskenta paljasti myös karun arjen: 70 % asukkaista
> asui maaseudulla ja 71 % ei osannut lukea — juuri se todellisuus,
> jota Sarmienton koulu-uudistus lähti korjaamaan.

Faktat ja lähteet:
- Vuoden 1869 kansanlaskenta: 1 836 490 asukasta, 8 % eurooppalaisia
  maahanmuuttajia, 70 % maaseudulla, 71 % lukutaidottomia. Luku sisälsi
  6 276 sotilasta Paraguayn alueella; ei sisältänyt valtion hallinnan
  ulkopuolella olevaa alkuperäisväestöä. — en-Wikipedia "Domingo
  Faustino Sarmiento"
- Vuoteen 1869 mennessä 11 % Argentiinan väestöstä ja 50 % Buenos
  Airesin väestöstä oli äskettäin saapuneita maahanmuuttajia.
  — en-Wikipedia "Immigration to Argentina"
- Perustuslaki vuodelta 1852 kielsi rajoitukset maahan tuleville
  ulkomaalaisille, jotka tulivat "työskentelemään maata, kehittämään
  teollisuutta sekä tuomaan ja opettamaan tieteitä ja taiteita", ja
  valtio kannusti nimenomaan "eurooppalaista" maahanmuuttoa.
  — en-Wikipedia "Immigration to Argentina"

### H3 — "Sota, joka vei pojan" (Paraguayn sota, 1864–1870)

> Kolme vuotta ennen isoisän matkaa päättyi Etelä-Amerikan verisin sota:
> Kolmoisliiton sota Paraguayta vastaan, jossa Argentiina, Brasilia ja
> Uruguay taistelivat presidentti Francisco Solano Lópezin Paraguayta
> vastaan. Sota oli alkanut jo edellisen presidentin Mitren aikana, ja
> Sarmiento peri sen tuskin astuttuaan virkaan — liittoutuneiden joukot
> valtasivat Paraguayn pääkaupungin Asunciónin juuri kun hän aloitti.
> Sota kosketti myös Sarmientoa henkilökohtaisesti: hänen adoptoitu
> poikansa kaatui rintamalla, ja presidentti suri tapahtumaa loppuiäkseen.
> Argentiinan armeija oli sodan aikana perustanut myös ensimmäisen
> sotilasakatemiansa, Colegio Militar de la Nación -korkeakoulun.

Faktat ja lähteet:
- Paraguayn sota (Kolmoisliiton sota) oli syttynyt Mitren
  presidenttikaudella; Brasilian joukot valtasivat Asunciónin pian sen
  jälkeen kun Sarmiento astui virkaan lokakuussa 1868.
  — en-Wikipedia "Domingo Faustino Sarmiento"
- Sarmienton adoptiopoika kuoli Paraguayn sodassa; Sarmiento koki tästä
  syvää surua. — en-Wikipedia "Domingo Faustino Sarmiento"
- Sodan viimeisenä vuotena perustettiin Colegio Militar de la Nación
  -sotilasakatemia, jonka ensimmäinen johtaja oli unkarilainen Juan F.
  Czetz. — en-Wikipedia "Domingo Faustino Sarmiento"

### H4 — "Kansa, joka tuli laivoilla" (eurooppalainen siirtolaisuus)

> 1870-luvulla Argentiina oli vasta muutaman vuoden sisään käynnistänyt
> historiansa suurimman muutoksen: miljoonat eurooppalaiset — ennen
> kaikkea italialaiset ja espanjalaiset — alkoivat saapua laivoilla
> Buenos Airesiin täyttämään harvaan asuttua maata. Vuosien 1861 ja 1920
> välillä maahan muutti 1,5 miljoonaa espanjalaista ja 3,8 miljoonaa
> italialaista. Ensimmäinen varsinainen maahanmuuttolaki säädettiin
> vasta 1876, mutta liike oli täydessä vauhdissa jo isoisän matkan
> aikaan: perustuslaki oli avannut ovet, ja hallitus perusti maaseudulle
> maatalousosuuskuntia uusille tulokkaille. Muutos näkyi kadulla ennen
> kuin se näkyi tilastoissa: Buenos Airesin väestöstä joka toinen oli
> jo vuonna 1869 äskettäin saapunut siirtolainen.

Faktat ja lähteet:
- Vuosina 1861–1920 Argentiinaan muutti 1,5 miljoonaa espanjalaista ja
  3,8 miljoonaa italialaista; väestö nousi 4 miljoonasta (1895) 7,9
  miljoonaan (1914). — en-Wikipedia "Immigration to Argentina"
- Ensimmäinen maahanmuutto- ja siirtolaisuuslaki (laki 817) säädettiin
  1876; yleinen maahanmuuttovirasto ja Hotel de Inmigrantes perustettiin
  vasta 1898. — en-Wikipedia "Immigration to Argentina"
- Urquizan hallituksen aikana (perustuslain säätämisen jälkeen 1853)
  kannustettiin maatalousosuuskuntien (agricultural colonies)
  perustamista Littoral-alueelle uusille siirtolaisille.
  — en-Wikipedia "Immigration to Argentina"

**Minitehtäväehdokas (Historia):**
> Kuka oli Argentiinan presidentti isoisän matkan aikaan 1873?
> Vaihtoehdot: Bartolomé Mitre / **Domingo Faustino Sarmiento** /
> Julio Argentino Roca / Nicolás Avellaneda
> Fakta: Sarmiento oli presidentti 1868–1874.

*Vastaus löytyy nostosta H1. Ei osu buenosaires/iguazu/salta-kysymyksiin
(kaupunkikohtaisia kysymyksiä ei vielä ole tehty ARG:lle).*

---

## 3. FAKTAPOHJA: Gaucho ja pampa

**Johdanto-ehdotus:**

> Loputon pampa on gauchon maailma — mies hevosen selässä, poncho
> hartioilla ja veitsi vyöllä, joka elää karjasta ja taivasalla. Mutta
> vuonna 1873 tämä maailma on jo hiipumassa: aidat, rautatiet ja
> uudisasukkaat kesyttävät tasankoa nopeammin kuin gaucho ehtii totutella.

### G1 — "Mies joka ei tarvinnut kattoa" (gaucho, elämäntapa)

> Pampan valtava luonnonrikkaus — villejä karjalaumoja, hevosia ja
> sulkasäkin täydeltä nandu-strutseja — teki mahdolliseksi elää ilman
> kiinteää työtä tai kotia: taitava ratsastaja ja metsästäjä pärjäsi
> myymällä nahkoja ja höyheniä ja syömällä ilmaista naudanlihaa. Tämä
> pampan anteliaisuus muovasi gauchon riippumattoman, vaeltavan
> elämäntavan. Luonnontutkija Charles Darwin, joka vietti kuusi
> kuukautta pampalla 1833, kuvasi gauchoa "vaatimattomaksi, rohkeaksi ja
> vieraanvaraiseksi" mutta huomautti, että jatkuva veitsen kantaminen
> johti usein verisiin riitoihin. Sana "gaucho" oli alun perin espanjan
> siirtomaahallinnon halveksuva nimitys karjavarkaille ja salakuljettajille
> — mutta itsenäisyyssodan sankari kenraali Güemes otti sen ylpeydellä
> käyttöön omista sissijoukoistaan.

Faktat ja lähteet:
- Pampan luonnonrikkaus (karja, hevoset, nandut ja muu riista) mahdollisti
  taitavalle ratsastajalle elannon ilman kiinteää työtä; tämä muovasi
  gauchon riippumattoman, vaeltavan elämäntavan (historioitsija Richard
  W. Slatta). — en-Wikipedia "Gaucho"
- Charles Darwin kuvasi pampan gauchoja päiväkirjassaan 1833
  "vaatimattomiksi, rohkeiksi ja vieraanvaraisiksi", mutta totesi
  veitsen jatkuvan kantamisen aiheuttavan riitoja ja verenvuodatusta.
  — en-Wikipedia "Gaucho"
- "Gaucho" oli alun perin siirtomaahallinnon halveksuva nimitys;
  itsenäisyyssodan kenraali Martín Miguel de Güemes otti sanan
  kunniamerkiksi omille joukoilleen ("minun gauchoni"). — en-Wikipedia
  "Gaucho"

### G2 — "Runo, joka puolusti häviäjää" (Martín Fierro, 1872)

> Vuonna 1872 — vuosi ennen isoisän matkaa — José Hernández julkaisi
> 2 316-säkeisen runoelman *Martín Fierro*, josta tuli Argentiinan
> kansalliseepos ja gauchesque-runouden huippu. Runon sankari on
> köyhä gaucho, joka pakkokutsutaan puolustamaan rajalinnoitusta
> alkuperäiskansoja vastaan; hän karkaa palvelusta, menettää kotinsa ja
> perheensä ja ajautuu lopulta lainsuojattomaksi. Hernández kirjoitti
> puolustuspuheenvuoron unohdetulle luokalle juuri sinä hetkenä, kun
> Sarmiento ja hänen seuraajansa muuttivat Argentiinaa kaupunkien ja
> teollisuuden maaksi: kuten Sarmienton oma elämäkerturi kirjoitti,
> "gauchon aikakausi oli päättynyt, kauppiaan ja karjanomistajan
> aikakausi alkanut". Runo on sittemmin käännetty yli 70 kielelle.

Faktat ja lähteet:
- José Hernández julkaisi *El Gaucho Martín Fierro* -runoelman 1872
  (jatko-osa *La Vuelta de Martín Fierro* 1879); 2 316-säkeinen eepos,
  käännetty yli 70 kielelle. — en-Wikipedia "Martín Fierro"
- Runon päähenkilö on köyhä gaucho, joka on pakkokutsuttu rajalinnoitukseen
  puolustamaan aluetta alkuperäiskansoja vastaan; karkaa, menettää
  kotinsa ja perheensä ja ajautuu lainsuojattomaksi. — en-Wikipedia
  "Martín Fierro"
- Sarmienton elämäkerturi Allison Bunkleyn mukaan Sarmienton presidenttikausi
  "merkitsee keski- eli maanomistajaluokan nousua kansakunnan
  vaa'ankieleksi: gauchon aikakausi oli päättynyt, kauppiaan ja
  karjanomistajan aikakausi alkanut". — en-Wikipedia "Domingo Faustino
  Sarmiento"

### G3 — "Kupillinen joka kiertää piirissä" (mate)

> Pampalla ja koko Río de la Platan alueella juoma ei ole kahvi vaan
> mate: kalebassista juotu, hopeisella pillillä (bombilla) siemailtu
> yerba mate -tee, jonka guaraní-intiaanit ottivat käyttöön kauan ennen
> espanjalaisia. Juominen on yhteisöllinen rituaali — sama kalebassi ja
> sama pilli kiertävät ryhmässä kädestä käteen, jokainen ottaa yhden
> siemauksen ja antaa astian eteenpäin. Jesuiitat onnistuivat 1600-luvun
> puolivälissä ensimmäisinä viljelemään yerba matea Misionesin
> maakunnassa perustamillaan intiaanilähetysasemilla — plantaasit
> rappeutuivat, kun jesuiitat karkotettiin 1770-luvulla, mutta juomasta
> oli jo tullut koko Río de la Platan arkea, aina gauchoista
> presidentteihin asti.

Faktat ja lähteet:
- Matea joivat alun perin guaraní- ja tupí-kansat nykyisen Paraguayn,
  Koillis-Argentiinan ja Etelä-Brasilian alueella; espanjalaissiirtolaiset
  omaksuivat juoman 1500-luvun lopulla, ja se levisi Río de la Platalle
  1600-luvulla. — en-Wikipedia "Mate (drink)"
- Jesuiitat onnistuivat 1600-luvun puolivälissä ensimmäisinä
  kesyttämään yerba mate -kasvin viljelyyn Misionesin maakunnan
  intiaanilähetysasemilla (reductions); jesuiittojen karkotuksen
  jälkeen 1770-luvulla plantaasit rappeutuivat. — en-Wikipedia "Mate
  (drink)"
- Juoma nautitaan kalebassista (mate) metallisella pillillä (bombilla),
  perinteisesti hopeaa; astia ja pilli kiertävät ryhmässä juojalta
  toiselle. — en-Wikipedia "Mate (drink)"

### G4 — "Maan kansa" (mapuche, pampan ja Patagonian alkuperäiskansa)

> Kauan ennen gauchoa pampa ja sen eteläpuolinen Patagonia olivat
> mapuchejen, tehuelchejen ja muiden kansojen kotiseutua. Mapuche
> tarkoittaa omalla kielellään "maan kansaa" (mapu, maa + che, kansa),
> ja heidän käsityöläisensä olivat 1800-luvulla kuuluisia hopeasepistään
> ja kudonnaisistaan — jokaisella merkittävällä päälliköllä oli oma
> hopeaseppänsä. Espanjan siirtomaahallinto ei koskaan onnistunut
> alistamaan pampan ja Patagonian alkuperäiskansoja täysin, ja monet
> gauchot itse polveutuivat sekaliitoista alkuperäisväestön kanssa.
> Vuonna 1872 päällikkö Calfucurán 6 000 soturin joukko ratsasti yhä
> vapaana pampan halki ja iski useisiin siirtokuntiin — merkki siitä,
> että raja Argentiinan valtion ja alkuperäiskansojen mailla oli
> isoisän matkan aikaan vielä auki. Vasta 1878 alkava, myöhemmin
> "Aavikon valloitukseksi" kutsuttu sotaretki työnsi rajan lopullisesti
> etelään — mutta se on isoisän matkan hetkellä vielä tulevaisuutta.

Faktat ja lähteet:
- Mapuche-nimen juuri on mapu ("maa") + che ("kansa"); mapuchet asuivat
  perinteisesti Keski-Etelä-Chilessä ja Lounais-Argentiinassa,
  Patagonia mukaan lukien. — en-Wikipedia "Mapuche"
- Mapuchejen aineellinen kulttuuri tunnetaan erityisesti tekstiileistä
  ja hopeasepäntyöstä; 1700–1800-luvuilla lähes jokaisella merkittävällä
  päälliköllä oli oma hopeaseppänsä, ja ala saavutti huippunsa 1700-luvun
  lopulla ja 1800-luvun alussa. — en-Wikipedia "Mapuche"
- Vuonna 1872 päällikkö Calfucurá johti 6 000 soturin joukon hyökkäyksiin
  useisiin siirtokuntiin (mm. General Alvear, Veinticinco de Mayo,
  Nueve de Julio); tämä oli yksi tapahtuma, joka johti myöhemmin
  "Aavikon valloitukseksi" kutsuttuun sotaretkeen vuodesta 1878 alkaen.
  — en-Wikipedia "Conquest of the Desert"
- Monet gauchot polveutuivat espanjalaisten miesten ja alkuperäiskansojen
  naisten liitoista. — en-Wikipedia "Gaucho"

**Minitehtäväehdokas (Gaucho ja pampa):**
> Minä vuonna José Hernández julkaisi kansalliseepos *Martín Fierron*?
> Vaihtoehdot: 1852 / **1872** / 1880 / 1895
> Fakta: eepos ilmestyi vuotta ennen isoisän matkaa, 1872.

*Vastaus löytyy nostosta G2.*

---

## 4. FAKTAPOHJA: Musiikki ja tanssi

**Johdanto-ehdotus:**

> Tangoa ei ole vielä olemassa vuonna 1873 — se syntyy vasta parikymmentä
> vuotta myöhemmin Buenos Airesin satamakortteleissa. Mutta sen
> rakennusaineet soivat jo: afrikkalaisperäiset rummut, gauchojen
> laulukilvat ja uusi pampan tanssimusiikki kaikuvat kaupungin kaduilla
> ja leirinuotioilla.

### M1 — "Sana joka merkitsi orjan tanssia" (candombe, tangon eräs juuri)

> Buenos Airesin kaupunginvaltuusto yritti jo vuonna 1789 kieltää
> tapaamiset, joissa orjuutetut afrikkalaiset kokoontuivat tanssimaan —
> asiakirjoissa näitä kutsuttiin nimellä "tango" tai "tambo". Sana
> viittasi tuolloin paikkaan ja tilaisuuteen, ei vielä tanssiin, jonka
> maailma tuntee nykyään. Candombe-rummutus ja -tanssi, joita
> länsiafrikkalaisten orjien jälkeläiset ylläpitivät Buenos Airesissa ja
> Montevideossa, ovat yksi kolmesta juuresta — kuubalais-espanjalaisen
> habaneran ja pampan milongan rinnalla — joista tulevaisuuden tango
> vielä syntyy. Vuonna 1873 nämä perinteet elävät rinnakkain kaupungin
> köyhissä korttelissa, mutta kukaan ei vielä kutsu niiden yhdistelmää
> tangoksi.

Faktat ja lähteet:
- Buenos Airesin cabildon virkamies Manuel Warnes valitti 1789
  kokoontumisista, joita kutsuttiin "tangoiksi" ja joissa orjuutetut
  tanssivat; siirtomaaviranomaiset yrittivät kieltää ne kirjallisin
  asiakirjoin jo tuolloin. — en-Wikipedia "Tango"
- Tango syntyi 1880-luvulla Río de la Platan köyhissä satama-alueissa
  kolmen aineksen yhdistelmänä: argentiinalainen milonga, espanjalais-
  kuubalainen habanera ja uruguaylainen candombe. — en-Wikipedia "Tango"
- Candombe periytyy Kongon ja Guinean-lahden alueen orjuutettujen
  ihmisten musiikkiperinteestä Buenos Airesissa ja Montevideossa
  1700–1800-luvuilla. — en-Wikipedia "Tango"

### M2 — "Kaksintaistelu kitaralla" (payada, gauchorunous)

> Ennen kuin kukaan kirjoitti gauchosta runoja, gauchot kirjoittivat
> itse — ääneen, hetkessä. Payada on improvisoidun laulun kaksintaistelu:
> kaksi laulajaa (payadorit) vastaavat toisilleen kitaran säestyksellä
> vuorosäkein, usein filosofisista tai kilpailullisista aiheista,
> pampan leirinuotioiden ja maalaiskapakoiden ääressä. Perinne on
> gauchesque-kirjallisuuden — myös *Martín Fierron* — suora esikuva:
> Hernández kirjoitti eepoksensa juuri payada-runomitalla, jotta se
> kuulostaisi siltä kuin gaucho itse sen lausuisi. 1873:na payada elää
> yhä suullisena perinteenä, ei vielä painettuna kirjallisuutena
> useimmille kuulijoilleen.

Faktat ja lähteet:
- *Martín Fierro* on kirjoitettu maaseudun Argentiinaa kuvastavalla
  espanjalla ja on gauchesque-runouden ("payada"-tyylin) huippukohta.
  — en-Wikipedia "Martín Fierro"
- Gauchesque-kirjallisuus ammentaa suoraan payada-perinteestä, jossa
  kaksi laulajaa vastaa toisilleen improvisoiden kitaran säestyksellä.
  — en-Wikipedia "Martín Fierro"

### M3 — "Tanssi joka syntyi ennen tangoa" (milonga)

> Milonga on pampan maalaislaulun ja -tanssin muoto, joka syntyi ennen
> tangoa ja josta tango myöhemmin ammentaa sekä nimensä yhden teorian
> mukaan että osan rytmiikastaan. Alun perin milonga oli gauchojen
> kaupunkiin tuoma, kitaralla säestetty laulumuoto; myöhemmin siitä tuli
> myös oma tanssinsa, joka elää edelleen erillisenä tangon rinnalla.
> Tutkijoiden mukaan juuri tällaiset maaseudun ja kaupungin äänet —
> milonga, payada, candombe — kohtasivat toisensa Buenos Airesin
> satamakortteleissa 1880-luvulla ja synnyttivät tangon.

Faktat ja lähteet:
- Tango syntyi 1880-luvulla Río de la Platan köyhissä työläiskortteleissa
  argentiinalaisen milongan, espanjalais-kuubalaisen habaneran ja
  uruguaylaisen candomben yhdistelmänä. — en-Wikipedia "Tango"
- Tangon sanan ja tanssin alkuperästä kiistellään tutkijoiden kesken;
  keskustelu koskee sitä, missä määrin alkuperäis-, latinalaisamerikkalais-,
  afrikkalais- ja eurooppalaiskulttuurit muovasivat ilmaisua.
  — en-Wikipedia "Tango"

### M4 — "Vielä ei ole tangoa" (mitä puuttuu vuonna 1873)

> Kun isoisä kirjoittaa päiväkirjaansa 1873, tangoa ei siis vielä ole —
> ei sanaa, ei tanssia, ei musiikkia siinä muodossa kuin maailma sen
> myöhemmin oppii tuntemaan. Sana tarkoittaa yhä vain afrikkalaisperäistä
> tanssitilaisuutta, ja varsinainen tango-tanssi muotoutuu vasta
> 1880-luvulla Buenos Airesin satamien baareissa ja bordelleissa, joissa
> omistajat palkkasivat yhtyeitä viihdyttämään asiakkaitaan. Tangon
> maailmanmaine on vielä kauempana: se leviää Pariisiin vasta 1900-luvun
> alussa ja New Yorkiin ja Suomeen vuonna 1913. Isoisän Argentiina soi
> siis toisenlaista musiikkia — juuri niitä aineksia, joista tulevat
> polvet rakentavat tangon.

Faktat ja lähteet:
- Tango syntyi 1880-luvulla; sitä esitettiin usein satamien baareissa
  ja bordelleissa, joissa omistajat palkkasivat yhtyeitä viihdyttämään
  asiakkaita. — en-Wikipedia "Tango"
- Tanssijat ja orkesterit veivät tangon Eurooppaan 1900-luvun alussa,
  ensin Pariisiin; vuoden 1913 lopulla tango saapui myös New Yorkiin ja
  Suomeen. — en-Wikipedia "Tango"

**Minitehtäväehdokas (Musiikki ja tanssi):**
> Millä vuosikymmenellä tango varsinaisesti syntyi Buenos Airesissa?
> Vaihtoehdot: 1850-luvulla / 1873 / **1880-luvulla** / 1930-luvulla
> Fakta: tango muotoutui vasta 1880-luvulla, kymmenen vuotta isoisän
> matkan jälkeen.

*Vastaus löytyy nostosta M4.*

---

## 5. FAKTAPOHJA: Luonto

**Johdanto-ehdotus:**

> Argentiina venyy pohjois-etelä-suunnassa lähes 3 700 kilometriä —
> subtrooppisesta sademetsästä jäätiköihin. Vuonna 1873 osa tästä
> luonnosta on eurooppalaisille vielä lähes tuntematonta: Iguazún
> putoukset ovat suojelematon erämaa, ja mantereen korkein huippu
> odottaa yhä ensinousijaansa.

### L1 — "Köyhä Niagara" (Iguazún putoukset)

> Espanjalainen valloittaja Álvar Núñez Cabeza de Vaca oli ensimmäinen
> eurooppalainen, joka kirjasi muistiin Iguazún putoukset — vuonna 1541.
> Guaraní-kielinen nimi tarkoittaa yksinkertaisesti "iso vesi". Putoukset
> eivät ole yksi vaan noin 150–300 erillistä putousta lähes kolmen
> kilometrin matkalla, korkeimmillaan 82 metriä — ja kun Yhdysvaltain
> ensimmäinen ladyMary Eleanor Roosevelt näki ne vuosikymmeniä
> myöhemmin, hänen kerrotaan huudahtaneen: "Köyhä Niagara!" (Niagara on
> vain kolmasosan matalampi). Puolet joen virtaamasta syöksyy yhteen
> ainoaan kapeaan kurkkuun, jota kutsutaan "Paholaisen kurkuksi". Vuonna
> 1873 putoukset ovat kuitenkin yhä täysin suojelematon sademetsä —
> ensimmäinen ehdotus kansallispuistosta tehdään vasta 1876, ja
> Argentiinan oma Iguazún kansallispuisto perustetaan vasta 1934.

Faktat ja lähteet:
- Ensimmäinen eurooppalainen, joka kirjasi putoukset muistiin, oli
  espanjalainen valloittaja Álvar Núñez Cabeza de Vaca vuonna 1541.
  Nimi Iguazú tulee guaraní/tupí-sanoista "vesi" ja "iso". — en-Wikipedia
  "Iguazu Falls"
- Putoukset koostuvat 150–300 erillisestä putouksesta lähes 2,7 km:n
  matkalla, korkeimmillaan 82 m; puolet virtaamasta putoaa "Paholaisen
  kurkkuun" (Garganta del Diablo). — en-Wikipedia "Iguazu Falls"
- Eleanor Roosevelt lausui nähdessään putoukset kertoman mukaan "Poor
  Niagara!" — Niagara on noin kolmasosan matalampi (50 m). — en-Wikipedia
  "Iguazu Falls"
- Ensimmäinen ehdotus kansallispuiston perustamisesta alueelle tehtiin
  1876 (insinööri André Rebouças), samana vuonna kun maailman
  ensimmäinen kansallispuisto Yellowstone Yhdysvalloissa oli neljä
  vuotta vanha; varsinaiset Iguazú- ja Iguaçu-kansallispuistot
  perustettiin vasta 1934 (Argentiina) ja Brasiliassa myöhemmin.
  — en-Wikipedia "Iguazu Falls"

### L2 — "Pampa, jolla ei ole loppua" (pampan ekosysteemi)

> Pampa on yli 1,2 miljoonan neliökilometrin laajuinen, lähes tasainen
> ruohoaromaisto, joka kattaa suuren osan Buenos Airesin, La Pampan,
> Santa Fen, Entre Ríosin ja Córdoban maakunnista — alueen, joka on
> suurempi kuin Ranska ja Espanja yhteensä. Maasto on niin tasainen,
> että sen ainoat "vuoret" ovat Ventana- ja Tandil-kukkulat, korkeimmillaan
> vain 1 239 metriä. Ennen karjankasvatusta pampalla laidunsi villejä
> nandu-strutseja, joita alkuperäiskansat ja myöhemmin gauchot
> metsästivät heittämällä jalkojen ympärille kietoutuvia
> boleadora-heittopainoja. Vilja- ja karjatalous muuttivat maiseman
> 1800-luvulla peruuttamattomasti — pampasta tuli maailman yksi
> tuottavimmista maatalousalueista juuri sinä vuosikymmenenä, jolloin
> isoisä matkustaa siellä.

Faktat ja lähteet:
- Pampa kattaa yli 1 200 000 km², Buenos Airesin, La Pampan, Santa Fen,
  Entre Ríosin ja Córdoban maakunnat Argentiinassa sekä Uruguayn ja
  Etelä-Brasilian; maaston ainoat kohoumat ovat Ventana- ja
  Tandil-kukkulat (korkeimmillaan Cerro Tres Picos, 1 239 m).
  — en-Wikipedia "Pampas"
- Alue on muuttunut voimakkaasti ihmisen toiminnasta, erityisesti
  karjan, sikojen ja lampaiden tuonnista laidunmaille. — en-Wikipedia
  "Pampas"
- Gauchot metsästivät nandu-strutseja perinteisesti hevosen selästä
  heittämällä boleadora-painoja niiden jalkojen ympärille.
  — en-Wikipedia "Rhea (bird)"

### L3 — "Jättiläisten maa" (Patagonia)

> Kun Ferdinand Magellan purjehti Etelä-Amerikan kärkeä kohti vuonna
> 1520, hänen miehistönsä kohtasi alueen alkuperäiskansan, jonka he
> nimesivät "patagoneiksi" — kansaksi, jonka he uskoivat olevan
> jättiläisiä. Todennäköisesti kyse oli tehuelcheistä, jotka olivat
> tosiaan tuon ajan eurooppalaisia keskimäärin pidempiä. Nimi jäi koko
> valtavalle, tuulen pieksemälle alueelle: kivikkoisia tasankoja, jotka
> nousevat terassimaisesti sisämaahan päin, ja joilla laiduntavat
> guanakot — laaman villit sukulaiset, joiden villaa alkuperäiskansat
> käyttivät vaatteisiin. Alkuperäiskansat elivät perinteisesti
> metsästäjä-keräilijöinä jalan, kunnes hevonen — espanjalaisten tuoma —
> muutti heidän elämäntapansa 1600–1700-luvuilla ratsastavaksi.
> Vuonna 1873 Patagonia on yhä lähes kokonaan alkuperäiskansojen
> hallussa; Argentiinan valtio ulottaa rajansa sinne vasta 1880-luvulla.

Faktat ja lähteet:
- Magellan nimesi alueen kansat "patagoneiksi" vuonna 1520;
  todennäköisesti kyse oli tehuelcheistä, jotka olivat keskimäärin
  pidempiä kuin ajan eurooppalaiset. — en-Wikipedia "Patagonia"
- Alkuperäiskansat elivät Patagoniassa perinteisesti metsästäjä-
  keräilijöinä jalan; hevosen uudelleentuonnin myötä koillis-Patagonian
  kansat omaksuivat ratsastavan, nomadisen elämäntavan
  siirtomaa-aikana. — en-Wikipedia "Patagonia"
- Patagonian aromaisto nousee terassimaisesti n. 100 metrin askelin
  sisämaahan päin; guanako on Patagonian aron tunnusomaisin nisäkäs.
  — en-Wikipedia "Patagonia"

### L4 — "Huippu jota ei ole vielä valloitettu" (Aconcagua)

> Andien Aconcagua on Amerikan mantereiden korkein huippu, 6 961 metriä
> — korkeampi kuin mikään vuori Aasian ulkopuolella. Vuonna 1873 sen
> huippu on kuitenkin yhä koskematon: ensimmäinen todistettu nousu
> tehdään vasta 24 vuotta myöhemmin, tammikuussa 1897, kun sveitsiläinen
> opas Matthias Zurbriggen saavuttaa huipun osana brittiläistä
> retkikuntaa. Nimen alkuperä on kiistanalainen — yksi selitys juontaa
> mapudungun-kielestä ja tarkoittaa "toiselta puolelta tulevaa", toinen
> ketšuan kielestä ja tarkoittaa "kivistä vartijaa". Vuori sijaitsee
> Mendozan maakunnassa — samalla alueella, jonne Sarmiento juuri tuolloin
> tilasi ranskalaisia viiniköynnöksiä (ks. Ruoka-aihe).

Faktat ja lähteet:
- Aconcagua on Amerikan mantereiden ja koko läntisen ja eteläisen
  pallonpuoliskon korkein vuori, 6 967,15 m (Amerikan ulkopuolella
  vain Aasian vuoret ovat korkeampia). — en-Wikipedia "Aconcagua"
- Ensimmäinen todistettu huipulle nousu tehtiin 14.1.1897, sveitsiläisen
  oppaan Matthias Zurbriggenin toimesta osana brittiläisen Edward
  FitzGeraldin johtamaa retkikuntaa. — en-Wikipedia "Aconcagua"
- Nimen alkuperästä on useita kilpailevia selityksiä: mapudungun-kielen
  "Aconca-Hue" ("toiselta puolelta tuleva") tai ketšuan "Anco Cahuac"
  ("valkoinen vartija"). — en-Wikipedia "Aconcagua"
- Vuori sijaitsee Mendozan maakunnassa, Andien pääharjanteella.
  — en-Wikipedia "Aconcagua"

**Minitehtäväehdokas (Luonto):**
> Minä vuonna Aconcagua, Amerikan korkein huippu, kiivettiin ensi
> kertaa todistetusti?
> Vaihtoehdot: 1873 / 1880 / **1897** / 1920
> Fakta: Matthias Zurbriggen saavutti huipun 14.1.1897.

*Vastaus löytyy nostosta L4.*

---

## 6. FAKTAPOHJA: Ruoka

**Johdanto-ehdotus:**

> Argentiinan ruokapöytä syntyy risteyksessä: alkuperäiskansojen mate ja
> nandu, espanjalaisten tuoma karja ja vehnä, gauchon avotulella
> paistama liha. Vuonna 1873 tästä pöydästä puuttuu vielä yksi asia,
> josta Argentiina myöhemmin tulee kuuluisaksi — mutta juuri silloin
> se ensimmäistä kertaa istutetaan maahan.

### R1 — "Kokonainen eläin tulen äärellä" (asado)

> Asado ei ole vain ruokalaji vaan koko sosiaalinen tapahtuma: naudan-,
> sian- tai kananlihaa paistetaan avotulella tai hiilloksella parrilla-
> ritilällä tuntikausia, usein kokonaisen eläimen ristikossa avotulen
> äärellä. Perinteisesti liha ei marinoidu — ainoa mauste on suola — ja
> hiilinä käytetään kotoperäisiä puulajeja kuten quebrachoa, joiden
> pihka ei tuo makuun sivumakuja. Ruoka syntyy pampan karjatalouden
> ytimessä: gauchon leirinuotio, jossa koko eläin paahtuu tikun nokassa
> tunteja, on asado al palo — vieläkin elävä Patagonian perinne. Asadon
> ympärillä on aina yhteisö: gauchot jakoivat lihan porukassa jo kauan
> ennen kuin siitä tuli koko kansan juhla-ateria.

Faktat ja lähteet:
- Asado on grillaustekniikka ja sosiaalinen tapahtuma erityisesti
  Argentiinassa ja Uruguayssa; liha (nauta, sika, kana, makkarat)
  kypsennetään avotulella tai grillillä (parrilla), kokki on "asador".
  — en-Wikipedia "Asado"
- Lihaa ei marinoida — ainoa maustaminen on suola ennen tai kypsennyksen
  aikana; hiilet tehdään usein kotoperäisistä puista (quebracho,
  algarrobo), koska havupuiden pihka toisi sivumakuja. — en-Wikipedia
  "Asado"
- Patagonian perinteinen tapa on "asado al palo": koko eläin (erityisesti
  lammas tai sika) puuseipäällä avotulen ääressä. — en-Wikipedia "Asado"

### R2 — "Kupillinen kiertää" (mate, ruokakulttuurin osana)

> Mate on kansallisjuoma paitsi Argentiinassa myös Paraguayssa ja
> Uruguayssa — ja Argentiina on 2010-luvulla noussut maailman suurimmaksi
> tuottajaksi, yli puolet koko maailman sadosta. Juoma ei ole kahvia
> eikä teetä, vaan oma kasvinsa, yerba mate, jota alun perin viljelivät
> vain guaranít. Se on niin syvällä kansallisessa identiteetissä, että
> Argentiina julisti sille oman kansallispäivänsä (30. marraskuuta) —
> päivän, joka on nimetty 1800-luvun kaudillon Andresito Guacurarín
> mukaan. Vuonna 1873 mate on jo läpikotaisin osa jokapäiväistä elämää
> pampalta presidentinlinnaan asti.

Faktat ja lähteet:
- Mate on Argentiinan, Paraguayn ja Uruguayn kansallisjuoma; Argentiina
  oli 2018 maailman suurin tuottaja (56–62 % tuotannosta). — en-Wikipedia
  "Mate (drink)"
- Kasvi (Ilex paraguariensis) ja sen juominen periytyvät guaraní- ja
  tupí-kansoilta. — en-Wikipedia "Mate (drink)"
- Argentiina on juhlinut kansallista matepäivää 30. marraskuuta vuodesta
  2015, nimetty 1800-luvun kaudillo Andrés Guacurarí y Artigasin
  ("Andresito") mukaan. — en-Wikipedia "Mate (drink)"

*(HUOM kirjoittajalle: G3-nosto käsittelee samaa aihetta gaucho-
näkökulmasta — jos molemmat aiheet valitaan lopulliseen lehteen, R2 pitää
joko kirjoittaa selvästi eri painotuksella (kansallisjuoma / tuotanto)
tai jättää pois toistoa vastaan, ks. osio 11.)*

### R3 — "Jokainen maakunta väittää omaa versiotaan aidoimmaksi" (empanada, erityisesti Salta)

> Empanada — täytetty, suljettu taikinatasku — tuli Espanjasta
> siirtomaa-ajalla, mutta jokainen Argentiinan maakunta on tehnyt siitä
> omansa. Saltan empanadat, saltasit, ovat pieniä, mehukkaita ja
> tulisia: täytteenä perunaa, paprikaa ja jauhettua chiliä — juuri se
> versio, joka on suosittu myös naapurimaassa Boliviassa. Vieressä
> Jujuyn versio lisää herneitä ja valkosipulia; Tucumánissa järjestetään
> jo tuolloin vuosittainen kansallinen empanada-festivaali. Buenos
> Airesissa criollo-empanada on niin tärkeä osa kaupungin identiteettiä,
> että se on myöhemmin nimetty viralliseksi ruoka- ja gastronomiaperinnöksi.
> Alkuperä juontuu 700-luvun Galiciaan asti, mutta matka Espanjasta
> Andien juurelle teki siitä täysin oman, paikallisen ruoan.

Faktat ja lähteet:
- Empanadan alkuperä on tuntematon, mutta arvellaan juontuvan 700-luvun
  Galiciasta, luoteis-Espanjasta. — en-Wikipedia "Empanada"
- Saltan empanadat (saltas) ovat pieniä, mehukkaita ja tulisia, sisältävät
  perunaa, paprikaa ja jauhettua chiliä; suosittuja myös naapurimaassa
  Boliviassa. Jujuyn versio lisää herneitä ja valkosipulia. Tucumánin
  Famaillássa järjestetään vuosittainen kansallinen empanada-festivaali.
  — en-Wikipedia "Empanada"
- Buenos Airesin criollo-empanada on julistettu Argentiinan kulttuuri-
  ministeriön toimesta osaksi ruoka- ja gastronomiaperintöä.
  — en-Wikipedia "Empanada"

### R4 — "Presidentti tilasi köynnöksiä Ranskasta" (malbec-viini, 1868)

> Vuonna 1868 — samana vuonna kun hänestä tuli presidentti — Domingo
> Faustino Sarmiento oli jo aiemmin Mendozan maakuntahallitusmiehenä
> antanut ranskalaiselle agronomille Michel Pouget'lle tehtävän tuoda
> viiniköynnöksiä Ranskasta Argentiinaan. Mukana oli rypälelajike
> nimeltä malbec — Ranskassa vaatimaton, halloille altis rypäle, joka
> Mendozan korkealla, kuivalla ja aurinkoisella maaperällä alkoi
> tuottaa jotain aivan erilaista: tummaa, pehmeätanniinista viiniä,
> josta tulee vuosikymmenien päästä koko maan tunnusmerkki. Vuonna
> 1873 istutukset ovat vielä nuoria taimia — kukaan ei vielä tiedä, että
> Ranskan oma malbec-kanta tuhoutuu pian phylloxera-tuholaiseen ja että
> juuri nämä Mendozan versiot pelastavat lajikkeen maailmalle.

Faktat ja lähteet:
- Malbec tuotiin Argentiinaan 1868, kun ranskalainen agronomi Michel
  Pouget toi viiniköynnöksiä Ranskasta; Pouget'n toimeksiantaja oli
  tuolloin Mendozan maakuntahallitusmies Domingo Faustino Sarmiento.
  — en-Wikipedia "Malbec"
- Argentiinalaisen malbecin rypäleterttu eroaa ranskalaisesta (pienemmät
  marjat, tiiviimmät terttu) — viittaa siihen, että Pouget'n tuoma kanta
  saattoi kadota myöhemmin Ranskassa halla- ja phylloxera-tuhojen myötä.
  — en-Wikipedia "Malbec"
- Mendoza on Argentiinan johtava malbec-alue; lajikkeesta on tullut
  Argentiinan viinin tunnusmerkki. — en-Wikipedia "Malbec"

**Minitehtäväehdokas (Ruoka):**
> Kuka tilasi 1868 ranskalaisia viiniköynnöksiä Mendozaan — köynnöksiä,
> joista syntyi Argentiinan tunnetuin viinilajike malbec?
> Vaihtoehdot: Julio Argentino Roca / **Domingo Faustino Sarmiento** /
> José Hernández / Bartolomé Mitre
> Fakta: Sarmiento toimeksiantajana, Michel Pouget toteuttajana.

*Vastaus löytyy nostosta R4, ja kytkeytyy suoraan Historia-aiheen H1:een.*

---

## 7. Maan intro (~6 virkettä, `wiki`-avain "Argentiina")

Ei olemassaolevaa `southamerica-artikkelit.js`-tiedostoa vielä (ks. osio
11, avoin kysymys A) — teksti alla on ainesehdotus sille kohtaan, kun
tiedosto perustetaan `africa-artikkelit.js`/`europe-artikkelit.js`-mallin
mukaan.

> Vuonna 1873 Argentiina on nuori tasavalta täydessä murroksessa: presidentti
> Domingo Faustino Sarmiento rakentaa satoja kouluja samalla kun
> loputon pampa muuttuu villistä gauchojen maasta karjatilojen ja
> uudisasukkaiden Argentiinaksi. Verinen sota Paraguayta vastaan on juuri
> päättynyt, ja laivalastillinen toisensa jälkeen tuo Italiasta ja
> Espanjasta uusia asukkaita maahan, joka on vielä lähes tyhjä. Kaukana
> etelässä leviää Patagonian tuulinen aromaisto, jonka jättiläisiksi
> luultu alkuperäiskansa antoi koko alueelle nimensä, ja pohjoisessa
> viidakko kätkee Iguazún putouksia, joita tuskin kukaan eurooppalainen
> on vielä nähnyt. Buenos Airesin kaduilla soi jo afrikkalaisperäinen
> candombe ja pampan milonga — ainekset, joista syntyy parikymmentä
> vuotta myöhemmin maailmankuulu tango. Isoisän matkapäiväkirja
> saapuu Argentiinaan juuri hetkellä, jolloin gauchon aikakausi on
> päättymässä ja uusi, eurooppalaisten muovaama kansakunta on vasta
> syntymässä.

(n. 950 merkkiä — pituusluokka vastaa USA-faktapohjan intro-ehdotusta.)

---

## 8. Kuvaehdokkaiden kategorialistaus (Commonsista, kuva+aihe aina Argentiinasta)

Kategoriat TARKISTAMATTA Commonsin API:sta tässä koosteessa — Commonsin
hakurajapinta palautti toistuvasti 429 "too many requests" tätä koostetta
tehdessä (yritetty useita kertoja kasvavalla viiveellä, ei ehditty
loppuun). Seuraava kirjoittaja tarkistaa kategoriat itse lehtityövaiheessa
`lehtityo-resepti.md`:n mukaisesti — hakusanaehdotukset alla ovat
hakuapuna, EI valmiiksi vahvistettuja.

- H1–H2 Sarmiento / väestönlaskenta → hae "Domingo Faustino Sarmiento",
  "Sarmiento 1873" (muotokuva olemassa: "Sarmiento (1873).jpg" mainittu
  en-Wikipedia-artikkelissa, kuvateksti "wearing the presidential sash
  in 1873" — TÄSMÄLLEEN oikea vuosi, tarkista Commonsista)
- H3 Paraguayn sota → hae "Paraguayan War" / "War of the Triple Alliance"
- H4 Siirtolaisuus → hae "Immigration to Argentina", "Hotel de Inmigrantes"
  (huom: Hotel de Inmigrantes perustettiin vasta 1898, joten kuva
  edustaisi myöhempää aikaa — tarkista ajallinen osuvuus)
- G1 Gaucho → hae "Gaucho" (todennäköisesti laaja kategoria, mm. Vidalin
  ja Rugendasin 1800-luvun maalauksia mainittu artikkelissa)
- G2 Martín Fierro → hae "Martín Fierro", "José Hernández" (ensipainoksen
  kansikuva "El gaucho martinfierro 1872.jpg" mainittu artikkelissa)
- G3/R2 Mate → hae "Mate (beverage)", "Yerba mate" — artikkelissa mainittu
  mm. litografia "Tertulia & Mate Party" (1821, John Carter Brown Library)
- G4 Mapuche → hae "Mapuche textiles", "Mapuche silverwork" — SITÄ ENNEN
  lue lehtityo-resepti.md:n kuvasäännöt tarkkaan (ei kurjuuskuvastoa, ei
  pelkkiä seremoniaklišeitä; elävä nykykulttuuri suositeltavaa jos löytyy)
- M1 Candombe → hae "Candombe"
- M3 Milonga → hae "Milonga (music)" tms. — voi olla ohut kategoria
- L1 Iguazú → hae "Iguazu Falls" (todennäköisesti laaja ja hyvälaatuinen
  kategoria, kuten muissa E-Amerikan sademetsäkohteissa)
- L2 Pampa → hae "Pampas", "Rhea americana"
- L3 Patagonia → hae "Patagonia", "Guanaco"
- L4 Aconcagua → hae "Aconcagua", "Matthias Zurbriggen"
- R1 Asado → hae "Asado", "Parrilla"
- R3 Empanada → hae "Empanada", "Salteñas" — huom Salta-kaupunki on
  pelissä, joten Salta-erityinen kuva olisi erityisen osuva
- R4 Malbec → hae "Malbec", "Mendoza vineyards", "Michel Pouget" (voi
  olla ohut/olematon henkilökuva — varakeinona Mendozan viinitarha-
  maisemakuva)

**MAAKARTAT-nosto (relief-karttaan liitettävä yksittäiskuva, ks. osio 9):**
ehdotan Iguazún putouksia tai pampan avaraa maisemaa — molemmat
kategoriat jo yllä.

Yleishuomio: kaikki ehdotetut hakusanat ovat aihepiiriltään kiistattomasti
Argentiinasta (ei naapurimaalta lainattua) — poikkeuksena huomioitava,
että Mapuche-, Patagonia- ja guanako-kategoriat ovat usein YHTEISIÄ
Chilen kanssa Commonsissa: kuvavalinnassa on varmistettava, että valittu
yksittäiskuva näyttää nimenomaan Argentiinan puolen (esim. Chubut,
Neuquén, Santa Cruz -maakunnat) eikä Chileä.

---

## 9. MAAKARTAT-rivin tarve — TEKNINEN KYSYMYS RATKESI HELPOMMIN KUIN USA:LLA

Argentiinalla EI ole vielä riviä `js/packs/maakartat.js`:n `MAAKARTAT`-
taulussa (tarkistettu `grep`illä 23.8.2026) — rivi tarvitaan maalehden
aloitussivulle.

**Hyvä uutinen (toisin kuin USA/RUS):** Wikipedian omasta
`Module:Location map/data/Argentina`-sivusta (haettu 23.8.2026) käy ilmi,
että Argentiinan sijaintikarttaperhe käyttää TAVALLISTA tasavälistä
(equirectangular) rajausta — EI erikoisprojektiota kuten Venäjän `laea`
tai USA:n avoin conic-kysymys:

```
top = -21.0   (pohjoisraja, leveysaste)
bottom = -56.5 (etelaraja)
left = -76.5   (lansiraja, pituusaste)
right = -52.5  (itaraja)
image = 'Argentina location map.svg'
image1 = 'Relief Map of Argentina.jpg'
defaultscale = 0.59
```

Tämä tarkoittaa, että Argentiinan MAAKARTAT-rivi voidaan todennäköisesti
kirjoittaa Egyptin/Italian mallin (`rajat: { pohjoinen, etela, lansi,
ita }`, `suoraPiste`-funktio) mukaisesti, EI RUS:n `laea`-erikoishaaralla
eikä USA:n kaltaisella avoimella conic-kysymyksellä. Kandidaattitiedosto
on `Relief Map of Argentina.jpg` (Wikimedia Commons) — **EI VARMISTETTU**
tässä koosteessa: Commonsin kuvatietorajapinta palautti toistuvasti 429
eikä ehditty tarkistaa tiedoston leveyttä, lisenssiä eikä tekijää
(seuraava kirjoittaja tarkistaa nämä ennen käyttöä, samoin että kuva on
todella tasavälinen projektio eikä esim. Robinson tai muu — Module-sivun
puuttuva `projection`-kenttä VIITTAA tasaväliseen, mutta ei takaa sitä).

**Ehdotetut 5 kaupunkia** (jos/kun rivi tehdään), näyttämään maan
äärimmäisen pohjois-etelä-ulottuvuuden — Argentiina on lähes 3 700 km
pitkä:

| Nimi | Lat | Lon | Huom |
|---|---|---|---|
| Buenos Aires | -34,6037 | -58,3816 | `paa: true` — pääkaupunki, pelin ARG-aloituspaikka |
| Salta | -24,7859 | -65,4117 | Luoteinen Andien reuna, pelikaupunki |
| Puerto Iguazú | -25,5952 | -54,5734 | Koillinen sademetsäkulma, pelikaupunki (Iguazú) |
| Ushuaia | -54,8019 | -68,3030 | Maailman eteläisin kaupunki, Patagonian ja Tulimaan kärki |
| Mendoza | -32,8895 | -68,8458 | Andien juurella, Aconcagua ja malbec-alue (R4/L4-nostojen koti) |

(Koordinaatit omia hakuja, EI erikseen Wikipedia-viitattu — tarkista
ennen käyttöä samalla tavalla kuin aiemmissa koosteissa suositeltiin.)

---

## 10. 1873-kulma koottuna

Argentiinan faktapohja osuu poikkeuksellisen usein juuri vuoteen 1873
tai sen välittömään läheisyyteen:

- **Täsmälleen 1873:** Sarmiento on presidentti koko vuoden (H1); häntä
  kuvaava valokuva "Sarmiento (1873)" on olemassa Commonsissa (ks. osio 8).
- **Yksi vuosi ennen (1872):** *Martín Fierro* julkaistaan (G2); päällikkö
  Calfucurán 6 000 soturia hyökkäävät siirtokuntiin (G4).
- **Neljä-viisi vuotta ennen (1868–1869):** Sarmiento astuu virkaan ja
  tilaa malbec-köynnökset (H1, R4); ensimmäinen kansanlaskenta (H2);
  11 % maan väestöstä on tuoreita siirtolaisia (H2/H4).
- **Kolme vuotta ennen (1870):** Paraguayn sota päättyy (H3).
- **Kolme vuotta jälkeen (1876):** ensimmäinen maahanmuuttolaki
  säädetään (H4); ensimmäinen kansallispuistoehdotus Iguazúlle (L1).
- **Viisi vuotta jälkeen (1878):** "Aavikon valloitus" alkaa — mainittu
  vain tulevaisuuden tapahtumana, ei kuvattuna (G4).
- **7-10 vuotta jälkeen (1880-luku):** Tango syntyy vasta nyt — koko
  Musiikki-aihe rakentuu tämän "ei vielä" -jännitteen varaan (M1-M4).
- **24 vuotta jälkeen (1897):** Aconcagua kiivetään ensi kertaa (L4).

Argentiinan 1873-kulma on siis USA:n tapaan poikkeuksellisen vahva,
mutta erilaisella painotuksella: siinä missä USA:n faktapohja osui
usein täsmälleen vuoteen, Argentiinan vahvin ase on nimenomaan
**"ei vielä" -jännite** — tango, Aavikon valloitus ja Aconcaguan
ensinousu ovat kaikki juuri tulevaisuudessa isoisän matkan hetkellä,
mikä sopii hyvin pelin "matkapäiväkirja kirjoitetaan juuri nyt"
-kehykseen.

---

## 11. Avoimet kysymykset

**A. `southamerica-artikkelit.js` puuttuu kokonaan.** Maan intro (osio 7)
tarvitsee kotipaikan — joko uusi tiedosto perustetaan Opuksen toimesta,
tai intro sijoitetaan johonkin olemassaolevaan tiedostoon. Koska ARG on
E-Amerikan PILOTTIMAA, tämä tiedosto luotaneen joka tapauksessa nyt —
BRA (Rio) tarvitsee saman kodin, joten kannattaa koordinoida Rio-
faktapohjan kirjoittajan kanssa (jos eri agentti) samasta tiedostosta.

**B. MAAKARTAT-rivi vaikuttaa YKSINKERTAISELTA (ei RUS/USA-tyyppistä
projektio-ongelmaa) mutta EI OLE VARMISTETTU** (osio 9): Commonsin
kuvarajapinta ei vastannut tätä koostetta tehdessä. Seuraavan kirjoittajan
pitää tarkistaa `Relief Map of Argentina.jpg`:n leveys, lisenssi ja
tekijä sekä varmistaa, ettei kuva ole jokin erikoisprojektio ennen
`rajat`-laatikon käyttöä.

**C. Aihevalinta (5/5) on ehdotus, ei lukittu.** Kuvataide ja
Rakennukset (Teatro Colón, Casa Rosada — molemmat mainittu skratsdatan
`.wiki`-tiedostoina hakuhistoriassa, joten joku on ehkä jo tutkinut
näitä Buenos Aires -kaupunkilehteä varten) jäivät pois, koska niiden
1873-kulma on tässä koosteessa tutkimatta ja koska ne sopivat
luontevammin tulevaan Buenos Aires -kaupunkilehteen maalehti.md:n
periaatteen mukaisesti ("maa kantaa aiheet, kaupunki kantaa kannen").

**D. Kaksi nostoa käsittelevät matea (G3 gaucho-näkökulmasta, R2
ruoka/kansallisjuoma-näkökulmasta).** Tämä on tarkoituksellinen
kaksoiskäsittely eri kulmista USA-faktapohjan tapaan (ks. USA:n
"pois jätetyt aiheet" -logiikka), mutta `tools/tarkista-aihetoisto.mjs`
kannattaa ajaa lopullisen lehden valmistuttua — jos molemmat
aihe-ehdotukset (Gaucho ja Ruoka) päätyvät lehteen, kirjoittajan on
joko erotettava painotus selvästi (elämäntapa vs. tuotanto/identiteetti)
tai valittava vain toinen mate-nosto.

**E. Mapuche/alkuperäiskansat-käsittely (G4).** Noudatin spec-mantereet.md:n
linjaa: kansa asukkaidensa silmin ensin (nimen merkitys, hopeataide,
tekstiilit, elämäntapa), sitten neutraali toteamus "Aavikon valloituksesta"
TULEVAISUUDEN tapahtumana ilman yksityiskohtia tai kummankaan puolen
sankarikehystä. Suosittelen Fablen tarkistavan sävyn erityisesti tässä
nostossa ennen lopullista kirjoitusta — aihe on herkkä, ja "isoisän
matkan hetkellä raja on vielä auki" -kehys on tietoinen valinta, joka
välttää sekä sotaretken kuvailun että sen unohtamisen kokonaan.

**F. "Aavikon valloitus" -maininta kaipaa Fablen hyväksynnän tarkkaan
sanamuotoon.** Kirjoitin G4:ään vain yhden lauseen asiasta ("Vasta 1878
alkava, myöhemmin 'Aavikon valloitukseksi' kutsuttu sotaretki työnsi
rajan lopullisesti etelään — mutta se on isoisän matkan hetkellä vielä
tulevaisuutta") ilman uhrilukuja tai yksityiskohtia. Tämä noudattaa
spec-mantereet.md:n linjaa kirjaimellisesti, mutta koska aihe on
poliittisesti herkkä Argentiinassa vielä nykyäänkin (en-Wikipedia
mainitsee sen olevan kiistanalainen: puolustajat kutsuvat "sivistys-
hankkeeksi", revisionistit "kansanmurhaksi"), Fablen kannattaa lukea
tämä yksi virke erityisen tarkkaan.

**G. Kuvahaku jäi kokonaan tekemättä (osio 8).** Commonsin API vastasi
429:llä toistuvasti koko koosteen ajan (myös en-Wikipedian raakateksti-
haku sai yhden 429:n alussa, mutta toipui). Seuraava kirjoittaja
tarvitsee TÄYSIN VAPAAN kuvahaun jokaiselle 20 nostolle — mikään
kategoria ei ole tässä koosteessa vahvistettu, vain hakusanaehdotettu.

**H. Salta-kaupungin oma näkökulma.** Koska pelissä on jo kaupunki
`salta`, R3 (empanada) nostettiin tarkoituksella juuri Saltan
empanadojen kautta — jos/kun Salta saa oman kaupunkilehtensä, tämä
maalehden nosto ja Saltan kansi kannattaa tarkistaa päällekkäisyyden
varalta (sama periaate kuin USA:n Yellowstone/Grand Canyon -huomio).
