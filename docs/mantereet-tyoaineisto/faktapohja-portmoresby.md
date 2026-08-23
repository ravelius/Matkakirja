# Port Moresby — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `portmoresby`, maa PNG (Papua-Uusi-Guinea),
en-Wikipedia "Port Moresby" (ellei toisin mainita). Kaikki tiedot haettu
en-Wikipediasta **23.8.2026** (`action=raw`, `NODE_USE_ENV_PROXY=1`;
#REDIRECT tarkistettu jokaiselle haetulle otsikolle — "Koitabu people"
palautti 404:n, oikea artikkeli on "Koita language"; "Jacksons
International Airport" ohjautuu artikkeliin "Port Moresby International
Airport"). Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA), `docs/moduulit/
kaupunkilehti.md` sekä esimerkkinä `docs/mantereet-tyoaineisto/
faktapohja-melbourne.md` (rakenne ja tarkkuustaso). Lisäksi luin
`docs/mantereet-tyoaineisto/spec-mantereet.md` — se on SITOVA koko
Oseanian laudalle ja mainitsee Port Moresbyn nimeltä ("Papua-Niugini
(portmoresby, sepik): elävä kulttuuri, ei 'kivikautinen'-kehystä
koskaan"). Kulttuurivisa tarkistettu tiedostosta
`js/packs/oceania-questions.js` (kohta `portmoresby`, viisi kysymystä:
maa, kielten määrä n. 800, saari, syy kielten runsauteen — vuoristo ja
laaksot, Tok Pisin kauppakielenä) — ks. osio 8, huomio 3, miten näiden
vastauksia on vältetty. Tarkistin myös `js/packs/oceania-saapumiset.js`
ja `js/packs/oceania-valokuvat.js` kohdan `portmoresby` — niissä on jo
valmiiksi tarkistettu vanha valokuva (John William Lindt, lakatoin
lastausta 1885) ja kolme nykykuvaa isoisän päiväkirjakortteja varten;
nämä ovat ERI datapaketti kuin kaupunkilehden `kulttuuri-kategoriat.js`,
mutta samojen tiedostojen käyttöä lehdessä kannattaa harkita tarkkaan
(ks. osio 5 ja osio 8, huomio 5).

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Vahvin 1873-osuma (tehtävänannon korostus):** Kapteeni John Moresby
löysi ja nimesi sataman HELMIKUUSSA 1873 HMS Basiliskilla tehdyn
kartoitusmatkan aikana — tämä on koko lehden ankkuri, ja se on nostettu
etusivun ensimmäiseksi nostoksi (K1). Motu- ja koitabu-kylien
hiri-kauppapurjehdukset lakatoi-aluksilla olivat toiminnassa jo tuolloin
ja jatkuivat muuttumattomina 1950-luvun lopulle asti — niille on oma
teemasivunsa (osio 2, sivu `hiri`).

**Sisältölinjaus (spec-mantereet.md, Oseania + Raamattu pilari 3):**
motut ja koitabut kuvataan nykyisinä kansoina, jotka edustavat itseään
Motu Koita Assemblyn kautta — ei menneisyyden kuriositeettina eikä
"kivikautisena" kulttuurina. Papua-Uuden-Guinean kielellinen
moninaisuus (yli 800 kieltä) on elävä nykytodellisuus, ei pelkkä
uteliaisuus. Siirtomaahistoria (Britannian suojelualue 1884, Australian
hallinto 1906–1975) kerrotaan tapahtumina neutraalisti. Ei nykysotaa,
ei nykypolitiikkaa, ei nykyrikollisuutta — PAITSI matkaoppaan lyhyt,
asiallinen varovaisuushuomautus, jonka Raamatun linjaus 20.8.2026
nimenomaan sallii ja jota tehtävänanto pyysi (ks. osio 7, huomio 6).

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Port Moresby"

**Johdanto (n. 240 merkkiä):**

> Kalastuskylien rinnalle nousi satama, jonka brittiupseeri löysi ja
> nimesi vuonna 1873 — isoisän matkan vuonna. Motu- ja koitabu-kansat
> asuivat rannalla jo silloin, ja heidän jälkeläisensä asuvat siellä
> yhä samoissa kylissä.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Satama sai nimensä ja ensimmäisen eurooppalaisen
kartoituksensa TÄSMÄLLEEN isoisän matkan vuonna, ja kaupungin koko
myöhempi kaari (siirtomaa → itsenäinen pääkaupunki) on tiiviisti
lähteistetty juuri tästä lähtöpisteestä käsin.

**Johdanto (n. 220 merkkiä):**

> Kapteeni John Moresby purjehti tänne vuonna 1873 ja nimesi sataman
> isänsä mukaan. Kalastuskylästä kasvoi siirtomaan hallintopaikka,
> sitten sotilastukikohta ja lopulta itsenäisen Papua-Uuden-Guinean
> pääkaupunki.

### Sivu C — teemasivu, ehdotettu id `hiri`, nimi "Hiri"

**Perustelu valinnalle:** Tehtävänanto pyysi nimenomaisesti nostamaan
esiin motu- ja koitabu-kylien hiri-kauppaveneet (lakatoi), jotka olivat
toiminnassa isoisän aikaan ja pysyivät muuttumattomina lähes
sataan vuoteen. Aihe ei ole vakioaihelistalla (historia, kuvataide,
kirjallisuus, musiikki, ruoka, luonto, tiede, nykytaide, huumori), mutta
kaupunkilehti.md sallii oman ikonin — ehdotan tälle yksinkertaista
purjeveneen ääriviivaa. Aihe kytkeytyy suoraan olemassa olevaan,
tarkistettuun valokuvaan (ks. osio 8, huomio 5).

**Johdanto (n. 210 merkkiä):**

> Kerran vuodessa motu-kansan miehet purjehtivat länteen viemään
> savipatoja ja toivat takaisin saagoa. Purjehdus kesti kuukausia ja
> oli hengenvaarallinen — ja se jatkui muuttumattomana isoisän ajasta
> 1950-luvun loppuun asti.

### Sivu D — teemasivu, ehdotettu id `kuvataide`, nimi "Kuvataide"

**Perustelu valinnalle:** Vakioaihe `kuvataide` sopii kansallismuseoon
(Haus Tumbuna, "esi-isien talo"), jonka kokoelma ja sen palautushistoria
(siirtomaa-ajan keräilystä 2020-luvun repatriaatioon) kertovat samalla
kunnioittavasti nykyisestä, elävästä kulttuurista — juuri sitä
spec-mantereet.md vaatii.

**Johdanto (n. 215 merkkiä):**

> Siirtomaa-ajan virkamiehet veivät maan esineitä Australian museoihin
> jo 1889. Sata vuotta myöhemmin kokoelmat alkoivat palata takaisin —
> ja Port Moresbyn oma museo kantaa nimeä "esi-isien talo".

**HUOM sivumäärästä:** tehtävänanto salli 1–3 teemasivua; käytin kaikki
kolme, koska aineisto kantoi kolme selvästi erillistä, päällekkäisyydetöntä
teemaa (historia, hiri-kauppa, kuvataide/museo) — ks. myös osio 8,
huomio 1.

---

## 2. Kuusitoista nostoehdotusta (4 × 4 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Satama joka sai nimensä vuonna 1873" (n. 560 merkkiä)**

> Helmikuussa 1873 kapteeni John Moresby purjehti höyrylaiva HMS
> Basiliskilla Uuden-Guinean eteläistä rannikkoa kartoittaen ja löysi
> lahden, jota paikalliset motu- ja koitabu-kansat olivat asuttaneet jo
> vuosisatojen ajan – suurin kylistä, Hanuabada, oli tuolloin arviolta
> kahdentuhannen asukkaan koti. Moresby nimesi lahden Fairfaxiksi isänsä
> mukaan ja merkitsi kartoihinsa Paga-kukkulan edustan ankkuripaikan
> nimellä "Port Moresby". Sama vuosi, jona isoisä matkusti maailmalla,
> on siis myös se vuosi, jona tämä satama sai eurooppalaisen nimensä.

Faktat ja lähteet:
- Helmikuussa 1873 HMS Basiliskin miehistö, kapteenina John Moresby,
  kartoitti Uuden-Guinean eteläistä rannikkoa ja löysi alueen; Moresby
  nimesi lahden Fairfaxiksi isänsä (Fairfax Moresby) mukaan ja merkitsi
  Paga-kukkulan edustan ankkuripaikan kartoissaan "Port Moresbyksi". —
  en-Wikipedia "Port Moresby" (Discovery by Europeans -osio)
- Eurooppalaiset arvioivat paikallisväestön määräksi noin 2000 henkeä;
  suurin asutus, Hanuabada, koostui viidestä kylästä, joissa asui motuja
  ja koitabuja. — en-Wikipedia "Port Moresby"
- Ensimmäinen briitti, joka näki paikan, oli laivaston kapteeni John
  Moresby vuonna 1873. — en-Wikipedia "Port Moresby" (johdanto)

**Nosto K2 — "Kaksi kansaa jotka olivat täällä ennen satamaa" (n. 590 merkkiä)**

> Rannikon motut ja sisämaan koitabut asuivat samalla kannaksella jo
> ennen eurooppalaisia, ja vaikka kansat puhuvat aivan eri kieliperheiden
> kieliä – motu kuuluu Tyynenmeren saarille levinneeseen austronesialaiseen
> perheeseen, koitabu sen sijaan Uuden-Guinean omaan Trans–Uusi-Guinea
> -perheeseen – niiden välillä on ollut runsaasti avioliittoja
> vuosisatojen ajan. Nykyisin kansojen perinteisiä maita ja niiden
> kymmentä tunnustettua kylää hallinnoi yhdessä Motu Koita Assembly,
> parlamentin lailla perustettu itsehallintoelin, jonka puheenjohtaja
> toimii samalla pääkaupunkialueen varakuvernöörinä.

Faktat ja lähteet:
- Motut olivat alun perin rannikon asukkaita, koitabut tulivat
  sisämaan kukkuloilta; kansojen välillä oli merkittävää avioliittojen
  solmimista, ja ne jakautuivat "iduhu"-nimisiin sukuihin/klaaneihin. —
  en-Wikipedia "Port Moresby"
- Motu on austronesialainen kieli; koitabu (koita) kuuluu
  Trans-Uusi-Guinea-kieliperheeseen (Koiarian-alahaara). — en-Wikipedia
  "Motu people", "Koita language"
- Motu Koita Assembly on parlamentin säädöksellä perustettu elin, joka
  edustaa Port Moresbyn alkuperäisiä maanomistajia, motuja ja
  koitabuja, ja hallinnoi kymmentä tunnustettua kylää; sen
  puheenjohtaja on samalla pääkaupunkialueen (National Capital
  District) varakuvernööri. — en-Wikipedia "Port Moresby"

**Nosto K3 — "Kylä joka on isompi kuin luulisi" (n. 520 merkkiä)**

> Hanuabada, "iso kylä" motun kielellä, on yhä suurin motu-kylistä ja
> koti yli 15 000 ihmiselle – enemmän kuin monessa Papua-Uuden-Guinean
> maakuntakaupungissa. Osa taloista seisoo yhä paaluilla veden päällä,
> kuten ne ovat seisoneet vuosisatoja. Juuri Hanuabadan rannalla luettiin
> vuonna 1884 julistus, jolla Britannia otti alueen suojelualuekseen –
> ja sama kylä on tuottanut kahdeksan Papua-Uuden-Guinean yhdeksästä
> kansainyhteisön kisojen mitalista.

Faktat ja lähteet:
- Hanuabada tarkoittaa "isoa kylää" (hanua "kylä" + bada "iso"); se on
  suurin motu-kylä, väkiluku yli 15 000, sijaitsee kaupungin
  keskustasta luoteeseen. — en-Wikipedia "Hanuabada"
- Britannian suojelualueen julistus New Guinea Protectorate luettiin
  Hanuabadassa vuonna 1884. — en-Wikipedia "Hanuabada"
- Kahdeksan Papua-Uuden-Guinean yhdeksästä kansainyhteisön kisojen
  mitalista on peräisin Hanuabadasta; kylä on tunnettu myös
  kriketinpelaajistaan. — en-Wikipedia "Hanuabada"
- **HUOM:** Hanuabadan artikkeli mainitsee kylän myös PNG:n
  ainoana tunnettuna HLBTI-turvapaikkana — jätin tämän pois nostosta,
  koska se ei liity 1873-teemaan eikä ole tarpeen kaupungin
  esittelyssä; ks. osio 8, huomio 4.

**Nosto K4 — "Kalastuskylästä pääkaupungiksi" (n. 600 merkkiä)**

> Vuoteen 1885 mennessä brittiläinen erikoiskomissaari valitsi
> ankkuripaikan siirtomaan hallintopaikaksi, ja 1906 alueesta tuli
> virallisesti Australian hallinnoima Papuan territorio. Toisen
> maailmansodan aikana kaupunki oli liittoutuneiden tärkein tukikohta
> Tyynenmerellä ennen Australiaa. Itsenäisyys tuli syyskuussa 1975, ja
> prinssi Charles edusti kuningatarta juhlissa. Vuoden 2024 väestönlaskennassa
> kaupungissa asui jo 756 754 ihmistä – yli kaksinkertaisesti enemmän
> kuin vuoden 2011 laskennassa – ja siitä on tullut lounais-Tyynenmeren
> suurimpia kaupunkeja Australian ja Uuden-Seelannin ulkopuolella.

Faktat ja lähteet:
- Erikoiskomissaari Peter Scratchley saapui 1885 ja valitsi paikan
  siirtomaan pääkaupungiksi; Papua Act 1905 siirsi alueen viralliseen
  Australian hallintoon 1906. — en-Wikipedia "Port Moresby"
- Toisen maailmansodan aikana kaupunki oli syyskuusta 1942 tärkeä
  liittoutuneiden tukikohtien keskittymä ja viimeinen liittoutuneiden
  tukikohta saarella. — en-Wikipedia "Port Moresby"
- Itsenäisyys 16.9.1975; prinssi Charles edusti kuningatarta
  juhlallisuuksissa. — en-Wikipedia "Port Moresby"
- Väkiluku 364 145 (2011 laskenta) → 756 754 (2024 laskenta). —
  en-Wikipedia "Port Moresby" (infobox)
- Port Moresby on yksi lounais-Tyynenmeren suurimmista kaupungeista
  Jayapuran ohella, Australian ja Uuden-Seelannin ulkopuolella. —
  en-Wikipedia "Port Moresby" (johdanto)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Laiva jonka nimi jäi kartalle" (n. 540 merkkiä)**

> HMS Basilisk oli vuonna 1848 rakennettu siipiratashöyrylaiva, joka oli
> palvellut jo Krimin sodassa ennen kuin se komennettiin Australian
> asemalle 1871. Kapteeni John Moresbyn johdolla laiva kartoitti Uuden-Guinean
> etelärannikkoa vuosina 1873–1874, ja samalla matkalla Moresby löysi
> myös nykyisen China Straitin – lyhyemmän reitin Australian ja Kiinan
> välillä. Basilisk purettiin lopulta romuksi Chathamissa vuonna 1882,
> mutta sen kartoittama satama kantaa yhä sen kapteenin nimeä.

Faktat ja lähteet:
- HMS Basilisk, 1848 rakennettu siipiratassluuppi, palveli Krimin
  sodassa 1854–55 ja komennettiin Australian asemalle maaliskuussa
  1871 kapteeni John Moresbyn alaisuuteen; teki hydrografisia
  kartoituksia Uudella-Guinealla. — en-Wikipedia "HMS Basilisk (1848)"
- Moresby etsi myös lyhyempää reittiä Australian ja Kiinan välille ja
  löysi saaren itäkärjessä China Straitin. — en-Wikipedia "John
  Moresby"
- Basilisk purettiin romuksi Chathamissa 1882. — en-Wikipedia "HMS
  Basilisk (1848)"

**Nosto H2 — "Neljä opettajaa ja lähetystalo joka rakennettiin heti" (n. 500 merkkiä)**

> Marraskuussa 1873, vain yhdeksän kuukautta Moresbyn käynnin jälkeen,
> Lontoon lähetysseura lähetti Port Moresbyyn neljä polynesialaista
> opettajaa. Vuotta myöhemmin heidän seurakseen saapui pastori William
> Lawes, joka rakensi heti lähetystalon Metoreiaan, Elevala-saaren
> vastarannalle. Satama oli jo tuolloin tärkeä kauppapaikka, jota
> kaukaisemmatkin Uuden-Guinean heimot vierailivat – juuri tämä toi
> lähetystyöhön toivoa tavoittaa laajempi väestö.

Faktat ja lähteet:
- Marraskuussa 1873 pastori Samuel Macfarlanen lähettämät neljä
  polynesialaista opettajaa saapuivat Port Moresbyyn Lontoon
  lähetysseuran (London Missionary Society) toimesta. — en-Wikipedia
  "Port Moresby"
- Marraskuussa 1874 pastori William George Lawes liittyi heihin ja
  rakensi heti lähetystalon Metoreiaan, Elevala-saaren vastarannalle;
  satama oli tärkeä kauppakeskus, jota kaukaisemmatkin heimot
  vierailivat. — en-Wikipedia "Port Moresby"

**Nosto H3 — "Lippu joka nostettiin kahdesti" (n. 560 merkkiä)**

> Huhtikuussa 1883 Queenslandin siirtomaa julisti omavaltaisesti koko
> Uuden-Guinean brittiläiseksi alueeksi – Union Jack nostettiin Port
> Moresbyssä kolmentoista eurooppalaisen ja parinsadan papualaisen
> läsnä ollessa. Lontoo hylkäsi tempun. Vasta lokakuussa 1884 alue
> julistettiin virallisesti brittiläiseksi suojelualueeksi, ja
> sattumalta kaksi eri virkamiestä julistivat sen kumpikin omilla
> seremonioillaan kolmen viikon välein tietämättä toisistaan – ensin
> Hugh Romilly 23. lokakuuta, sitten komodori James Erskine 6.
> marraskuuta.

Faktat ja lähteet:
- Maaliskuussa 1883 Queenslandin pääministeri McIlwraith määräsi Henry
  Chesterin ottamaan koko Uusi-Guinean haltuun Britannian nimissä;
  4.4.1883 Union Jack nostettiin Port Moresbyssa 13 eurooppalaisen ja
  n. 200 papualaisen läsnä ollessa. — en-Wikipedia "Port Moresby"
- Annektointi hylättiin; toukokuussa 1884 iso-britannian hallitus
  pyysi Australian siirtomailta rahoitusta, ja 10.10.1884 komodori
  James Erskine sai käskyn julistaa suojelualueen. Hugh Romilly
  julisti sen ensin lyhyellä lausunnolla 23.10.1884 tietämättä
  Erskinen olevan matkalla; Erskine piti oman suuremman seremoniansa
  6.11.1884. — en-Wikipedia "Port Moresby"

**Nosto H4 — "Kaupunki joka avautui maailmalle uudelleen 2018" (n. 470 merkkiä)**

> Marraskuussa 2018 Port Moresby isännöi APEC-huippukokousta, joka toi
> kaupunkiin kymmeniä valtionpäämiehiä ympäri Tyyntämerta ja Aasiaa –
> ensimmäistä kertaa historiassa yhtä suurta maailmanpoliittista
> tapahtumaa niin lähellä sitä pientä satamaa, jonka John Moresby löysi
> 145 vuotta aiemmin. Kaupunki oli myös isännöinyt vuoden 2015 Tyynenmeren
> kisoja, joita varten rakennettiin suuri osa nykyisistä
> urheilulaitoksista.

Faktat ja lähteet:
- Port Moresby isännöi APEC-huippukokousta marraskuussa 2018. —
  en-Wikipedia "Port Moresby"
- Vuoden 2015 Tyynenmeren kisat (Pacific Games) järjestettiin Port
  Moresbyssa 4.–18.7.2015; urheilulaitoksia päivitettiin merkittävästi
  niitä varten. — en-Wikipedia "Port Moresby"
- **HUOM:** en käyttänyt APEC-nostossa Wikipedian samassa kappaleessa
  mainittua turvallisuushuolta (ks. osio 7, huomio 6) — se on rajattu
  vain matkaoppaan varovaisuushuomautukseen.

### Teemasivu `hiri` — 4 nostoa

**Nosto Hi1 — "Ankeri joka lähetti miehen merelle" (n. 560 merkkiä)**

> Tarinan mukaan kalastaja Edai Siabo vedettiin veden alle suuren ankeriaan
> toimesta – ankerias oli todellisuudessa meren henki. Henki käski Edaita
> rakentamaan suuren monirunkoisen purjeveneen, täyttämään sen
> savipadoilla ja purjehtimaan länteen kaakkoistuulen mukana. Edai totteli,
> rakensi ensimmäisen hiri-lakatoin nimeltä Bogebada ("merikotka") ja
> purjehti ystäviensä kanssa Papuanlahden vesille. Kuukausien kuluttua
> Bogebada palasi, ja Edain vaimo tanssi ilosta rannalla – siitä syntyi
> perinne, joka jatkui sukupolvesta toiseen aina 1950-luvun loppuun asti.

Faktat ja lähteet:
- Legendan mukaan Boeran kylän Edai Siabo joutui suuren ankeriaan
  (meren hengen) vetämäksi veden alle; henki käski hänen rakentaa
  lagatoin, täyttää sen savipadoilla ja purjehtia länteen laurabada-tuulen
  mukana. — en-Wikipedia "Hiri trade cycle"
- Edai rakensi ensimmäisen hiri-lagatoin nimeltä Bogebada
  ("merikotka") vaimonsa tekemillä padoilla lastattuna ja purjehti
  ystäviensä kanssa Papuanlahdelle. — en-Wikipedia "Hiri trade cycle"
- Kuukausien poissaolon jälkeen Bogebada palasi, ja Edain vaimo
  tanssi riemusta rannalla huudahtaen "Hedihoroha Bogebada!" —
  en-Wikipedia "Hiri trade cycle"

**Nosto Hi2 — "Savi joka matkasi saagoksi" (n. 540 merkkiä)**

> Motu-kansan asuinseutu jää sadevarjoon, eikä siellä kasva tarpeeksi
> saagopalmua ruokkimaan kylää – mutta motunaiset olivat, toisin kuin
> useimmat Uuden-Guinean kansat, taitavia savipatojen tekijöitä. Joka
> vuosi syys-lokakuun vaihteessa miehet lastasivat lakatoinsa täyteen
> patoja ja purjehtivat kaakkoistuulen mukana länteen Papuanlahden
> kyliin, joissa savipadot vaihdettiin saagoon. Meno kesti viikon,
> mutta paluuseen piti odottaa sään kääntymistä – ja lastin kasvaessa
> paluumatka oli aina vaarallisempi kuin menomatka.

Faktat ja lähteet:
- Motujen asuinalue on suhteellisen sadevarjossa, eikä siellä ole
  tarpeeksi sopivia alueita saagon (rabia) viljelyyn; motut olivat
  kuitenkin taitavia savipatojen (uro) tekijöitä, toisin kuin useimmat
  muut Uuden-Guinean kansat. — en-Wikipedia "Hiri trade cycle"
- Hiri-purjehdukset veivät arvostetut savipadat Papuanlahden kansoille
  ja toivat takaisin runsaasti saagoa. — en-Wikipedia "Hiri trade
  cycle"
- Menomatka kesti tyypillisesti vain viikon, mutta kotimatka oli
  paljon vaarallisempi lahara-monsuunin ja raskaamman saagolastin
  vuoksi; matkalaisten piti odottaa tuulen kääntymistä kuukausia. —
  en-Wikipedia "Hiri trade cycle"

**Nosto Hi3 — "Vaimon vartio kotirannalla" (n. 480 merkkiä)**

> Edain vaimolle annettiin tarkat ohjeet ennen miehensä lähtöä: pysyä
> tietyssä talon kolkassa, olla uimatta meressä, pitää päiväkirjaa
> Bogebadan poissaolopäivistä, pitää tuli palamassa ja antaa tatuoida
> ihonsa. Uskomuksen mukaan näiden sääntöjen rikkominen olisi vaarantanut
> koko retkikunnan hengen. Jokainen hiri-lähdön jälkeen jäänyt vaimo
> jatkoi samaa perinnettä sukupolvesta toiseen – purjehtijoiden turvallisuus
> uskottiin riippuvan yhtä paljon rannalla odottavista kuin merellä
> olevista.

Faktat ja lähteet:
- Edai käski vaimoaan pysymään talon tietyssä nurkassa, olemaan
  uimatta meressä, pitämään lukua Bogebadan poissaolopäivistä, pitämään
  tulen palamassa ja antamaan vanhan naisen tatuoida ihonsa; näiden
  ohjeiden rikkominen olisi vaarantanut retkikunnan. — en-Wikipedia
  "Hiri trade cycle"
- Lagatoi-miehistöjen vaimot noudattivat uskollisesti samaa
  Edain vaimon aloittamaa riittiä varmistaakseen turvallisen paluun. —
  en-Wikipedia "Hiri trade cycle"

**Nosto Hi4 — "Perinne joka päättyi myrskyyn ja syntyi uudelleen juhlana" (n. 520 merkkiä)**

> Hiri-purjehdukset jatkuivat lähes muuttumattomina toisen maailmansodan
> yli aina 1950-luvun loppuun, kunnes raskaasti lastattu, myrskyn
> vaurioittama lagatoi upposi Boeran kylän edustalla ja monta miestä
> menehtyi. Siirtomaahallinto kielsi sen jälkeen uudet purjehdukset.
> Itsenäistymisen myötä perinne haluttiin kuitenkin pelastaa: Hiri
> Moale -juhla perustettiin osuvasti samaan aikaan itsenäisyyspäivän
> kanssa, ja siihen kuuluvat yhä lagatoin saapumisen näytelmä,
> kanoottikilpailut ja Hiri-kuningattaren valinta.

Faktat ja lähteet:
- Hiri-purjehdukset jatkuivat keskeytyksettä (paitsi toisen
  maailmansodan ajan) 1950-luvun loppuun, kunnes raskaasti lastattu,
  myrskyn vaurioittama lagatoi upposi Boeran kylän edustalla suurin
  henkilötappioin paluumatkalla; siirtomaaviranomaiset kielsivät
  sen jälkeen jatkopurjehdukset. — en-Wikipedia "Hiri trade cycle"
- Itsenäistymisen jälkeen perustettiin Hiri Moale -juhla, joka osuu
  yhteen kansallisen itsenäisyyspäivän kanssa ja sisältää perinnetanssit,
  Hiri-kuningatar-kilpailun, lagatoin saapumisen, kanoottikilpailut,
  musiikkiesitykset ja käsityönäyttelyn. — en-Wikipedia "Hiri trade
  cycle"

### Teemasivu `kuvataide` — 4 nostoa

**Nosto T1 — "Talo esi-isille" (n. 500 merkkiä)**

> Papua-Uuden-Guinean kansallismuseo avattiin yleisölle kesäkuussa 1977,
> ja se kutsuu itseään nimellä Haus Tumbuna – esi-isien talo. Kokoelmassa
> on yli 50 000 etnografista esinettä: kundu- ja garamut-rumpuja,
> koristeltu Milne Bayn ulkopuolinen kanootti, naamioita ja
> totemipaaluja eri puolilta maata, jossa asuu satoja eri kansoja.
> Museo tekee myös tutkimusta yhdessä Smithsonian-instituutin kanssa
> laulu- ja luontotietoperinteiden tallentamiseksi.

Faktat ja lähteet:
- Museo avattiin yleisölle 27.6.1977 ja tunnetaan nimellä "Haus
  Tumbuna" – esi-isien talo. — en-Wikipedia "Papua New Guinea National
  Museum and Art Gallery"
- Kokoelmassa on yli 50 000 etnografista esinettä, mukaan lukien
  kundu- ja garamut-rumpuja, koristeltu Milne Bayn ulkopuolinen
  kanootti, naamioita ja totemipaaluja. — en-Wikipedia "Papua New
  Guinea National Museum and Art Gallery"
- Museo on tehnyt yhteistyötä Smithsonian-instituutin kanssa laulu-
  ja ekologisen tiedon perinteiden tallentamiseksi. — en-Wikipedia
  "Papua New Guinea National Museum and Art Gallery"

**Nosto T2 — "Esineet jotka lähtivät ja palasivat" (n. 590 merkkiä)**

> Siirtomaahallinnon kuvernööri William MacGregor aloitti jo 1889
> keräilyohjelman, jonka tarkoitus oli perustaa maahan oma museo –
> mutta kokoelma hajaantui lopulta useisiin Australian museoihin.
> Vasta pääministeri Michael Somare kirjoitti 1974: "pidämme naamioitamme
> ja taidettamme elävinä henkinä, joilla on kiinteä koti. Ei ole oikein,
> että niitä säilytetään New Yorkissa, Pariisissa, Bonnissa tai
> muualla." Museon avajaisissa 1977 palautettiin ensimmäiset 17
> MacGregorin kokoelman esinettä, ja vuonna 2020 Australian
> kansallisgalleria palautti vielä 225 esinettä lisää.

Faktat ja lähteet:
- Siirtomaan kuvernööri William MacGregor aloitti 1889
  keräilyohjelman, jonka tavoitteena oli museo, mutta kokoelma
  hajaantui useisiin Australian museoihin siihen asti kunnes maa saisi
  oman museonsa. — en-Wikipedia "Papua New Guinea National Museum and
  Art Gallery"
- Pääministeri Michael Somare kirjoitti 1974: naamiot ja taide ovat
  "eläviä henkiä, joilla on kiinteä koti" eikä niitä pidä säilyttää
  New Yorkissa, Pariisissa tai Bonnissa. — en-Wikipedia "Papua New
  Guinea National Museum and Art Gallery" (suora lainaus, suomennettu
  faktakoostajan toimesta — kirjoittaja voi hioa sanamuotoa)
- Museon avajaisissa 1977 palautettiin 17 esinettä MacGregorin
  kokoelmasta; 2020 Australian kansallisgalleria (National Gallery of
  Australia) palautti 225 esinettä osana sovittua palautusohjelmaa. —
  en-Wikipedia "Papua New Guinea National Museum and Art Gallery"

**Nosto T3 — "Merkki joka kertoi iästä" (n. 460 merkkiä, EPÄVARMA-huomio)**

> Motu- ja koitabu-tyttöjen tatuointi alkoi perinteisesti jo
> viisivuotiaana ja sitä täydennettiin vuosi vuodelta – rinnan
> V-muotoinen kuvio kertoi, että tyttö oli saavuttanut avioliittoiän.
> Perinne on dokumentoitu 1900-luvun alun tutkimusmatkailijoiden
> kuvissa ja on osa samaa esinekulttuuria, jota kansallismuseo tänään
> vaalii ja tutkii.

Faktat ja lähteet:
- 1912-päivätyn valokuvatekstin mukaan koitabu-naisten tatuointi
  alkoi perinteisesti viisivuotiaana ja sitä lisättiin vuosittain;
  rinnan V-muotoinen tatuointi osoitti avioliittoiän saavuttamisen. —
  en-Wikipedia "Motu people" (kuvateksti)
- Saksalainen etnografi Friedrich Ratzel raportoi 1896 motu-kansan
  tatuointitavoista teoksessaan "The History of Mankind". —
  en-Wikipedia "Motu people"
- **EPÄVARMA:** lähde on yli sata vuotta vanha kuvateksti/tutkimus,
  ei nykyaikainen kulttuuriselitys — kirjoittajan kannattaa harkita,
  onko aihe sopiva ilman lisätarkistusta esim. PNG:n kansallismuseon
  omista nykylähteistä, ja käsitellä sitä historiallisena käytäntönä
  eikä oletuksena nykyisestä. Ks. myös osio 7, huomio 4 (kuvavalinta).

**Nosto T4 — "Museo joka nimesi salinsa uudelleen" (n. 500 merkkiä)**

> Museon 40-vuotisjuhlavuonna 2017 näyttelytilat kunnostettiin ja
> nimettiin uudelleen papualaisilla nimillä vanhojen sijaan – uudet
> nimet olivat Tumbuna, Susan Karike, Bernard Narokobi, Ian Saem Majnep
> ja Be Jijimo. Vuonna 2025 avattiin uusi ilmailuperintökeskus, jonne
> palautettiin Australiasta toisen maailmansodan aikainen Douglas
> A-20 Havoc -pommikone – osa samaa tarinaa, jossa kaupungin historia
> kulkee satamasta sotatoimien kautta nykypäivän museoon.

Faktat ja lähteet:
- Museon 40-vuotisjuhlavuoden 2017 kunnostuksessa näyttelytilat
  nimettiin uudelleen: Tumbuna, Susan Karike, Bernard Narokobi, Ian
  Saem Majnep ja Be Jijimo; kunnostuksen suunnitteli australialainen
  arkkitehtitoimisto Architectus. — en-Wikipedia "Papua New Guinea
  National Museum and Art Gallery"
- Vuonna 2025 Australiasta palautettiin Douglas A-20 Havoc
  ilmailuperintökeskuksen valmistuttua. — en-Wikipedia "Papua New
  Guinea National Museum and Art Gallery"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia.

**Jakso 1 — "Perille ja liikkeelle"**

Port Moresbyyn ei pääse maanteitse muualta Papua-Uudesta-Guineasta —
kansallinen tieverkko ei ole yhtenäinen, ja esimerkiksi Laen ja Madangin
kaltaisiin kaupunkeihin lennetään. Jacksons-kansainvälinen lentokenttä
on maan suurin ja Papua-Uuden-Guinean puolustusvoimien ilmavoimien
tukikohta.

Faktat ja lähteet:
- Kansallinen moottoritieverkko ei ole täysin yhtenäinen, joten moniin
  sisämaan kaupunkeihin (esim. Lae, Madang) ei pääse suoraan maanteitse
  Port Moresbysta, vaan niihin lennetään. — en-Wikipedia "Port
  Moresby"
- Jacksons-kansainvälinen lentokenttä (virallisesti Port Moresby
  International Airport) on maan suurin kansainvälinen lentokenttä ja
  Papua-Uuden-Guinean puolustusvoimien ilmavoimasiiven tukikohta. —
  en-Wikipedia "Port Moresby"

**Jakso 2 — Alueen rakenne**

Kaupunki jakautuu vanhaan satamakeskustaan Paga- ja Touaguba-kukkuloiden
välisellä kannaksella (siellä missä Moresby ankkuroitui) ja uudempaan
Waiganin hallintoalueeseen, jonne rakennettiin itsenäistymisen jälkeen
parlamenttitalo ja kansallismuseo. Niiden välissä on entinen
kaupallinen keskus Boroko, joka oli vielä 1900-luvun jälkipuoliskolla
täynnä liikkeitä mutta on sittemmin hiljentynyt.

Faktat ja lähteet:
- Vanha kaupunkikeskusta ("Town") sijaitsee Paga- ja Touaguba-kukkuloiden
  välisellä kannaksella lähellä alkuperäistä ankkuripaikkaa; Waigani
  rakennettiin itsenäistymisen (1975) jälkeen uudeksi hallinto- ja
  kulttuurikeskukseksi (parlamentti, kansallismuseo, kansalliskirjasto).
  — en-Wikipedia "Port Moresby"
- Boroko oli aiemmin merkittävä kaupallinen keskus, mutta liiketoiminta
  on siirtynyt muualle ja monet entiset liiketilat ovat tyhjillään. —
  en-Wikipedia "Boroko"

**Jakso 3 — Arjen ilmiö: Koki-tori ja tuore kala**

Koki on Port Moresbyn suosituin tuoretori, jonne saapuu kalaa ja
vihanneksia joka aamu. Kalastus on nykyisin, aivan kuten motu-kansan
hiri-perinteessä ennen, keskeinen osa arkea: suuri osa myytävästä
kalasta pyydetään kaupungin omalta riutalta ja lahdelta ja myydään
samana päivänä.

Faktat ja lähteet:
- Koki tunnetaan suositusta tuoretuoteorista Port Moresbyssa. —
  en-Wikipedia "Port Moresby" (Suburbs-osio)
- **HUOM:** kalatorifakta ("kalat tulevat kaupungin omalta riutalta ja
  lahdelta, myydään samana päivänä") on jo tarkistettu ja käytössä
  `js/packs/oceania-valokuvat.js`:n portmoresby-korteissa (Taro Taylor
  -kuva Port Moresby Fish Marketista) — kirjoittajan kannattaa
  tarkistaa, ettei sama fakta toistu identtisenä sekä lehdessä että
  päiväkirjakortissa; muotoile tarvittaessa eri kulmasta.

**Jakso 4 — Historian käännekohta: sadan vuoden vieras kohtaus toistuu**

Vuonna 2018 Port Moresby isännöi APEC-huippukokouksen, joka toi
kaupunkiin maailmanjohtajia Aasian ja Tyynenmeren alueelta. Se oli
symbolinen käänne: sama satama, jonka ensimmäinen eurooppalainen vieras
näki 1873, oli 145 vuotta myöhemmin maailmanpolitiikan näyttämö.

Faktat ja lähteet:
- APEC-huippukokous järjestettiin Port Moresbyssa marraskuussa 2018. —
  en-Wikipedia "Port Moresby"
(Sama fakta kuin H4 — ehdotan, että kirjoittaja käyttää jaksossa 4
TOISEN kulman, esim. korostaen matkailijalle näkyviä konkreettisia
jälkiä (uudet hotellit, tiet) sen sijaan että toistaa H4:n saman
tapahtuman kokonaan; tai vaihtaa jakson aiheeksi 2015 Tyynenmeren
kisat, jotka mainitaan vain ohimennen K4:ssä.)

**Jakso 5 — Milloin kannattaa tulla, ja mitä ottaa huomioon**

Port Moresbyn ilmasto on trooppinen savanni-ilmasto (Köppen: Aw),
melko tasainen ympäri vuoden. Sadekausi kestää joulukuusta toukokuuhun,
kuivakausi loppuvuoden – ja kaupunki on itse asiassa koko Uuden-Guinean
kuivin paikka. Matkaoppaan kannattaa myös SUORAAN mutta asiallisesti
mainita, että liikkuminen jalan kaupungilla ei ole suositeltavaa ja
että moni majoitus järjestää oman kuljetuksen — ei pelotellen, vaan
samalla tavalla käytännöllisesti kuin muuallakin turvallisuusohjeet
annetaan.

Faktat ja lähteet:
- Trooppinen savanni-ilmasto (Köppen: Aw); keskimääräinen vuosisade
  898,8 mm, mikä tekee Port Moresbystä koko Uuden-Guinean kuivimman
  paikan. — en-Wikipedia "Port Moresby" (Climate-osio)
- Sadekausi joulukuusta toukokuuhun, kuivakausi loppuvuoden
  kaakkoispasaatituulten vuoksi. — en-Wikipedia "Port Moresby"
  (Climate-osio)
- Päivälämpötilat 28–32 °C, yölämpötilat pysyvät melko tasaisesti
  n. 23 °C:ssa ympäri vuoden. — en-Wikipedia "Port Moresby"
  (Climate-osio)
- **Varovaisuushuomautus (ks. osio 7, huomio 6):** en-Wikipedian oma
  Crime-osio kuvailee kaupunkia yhdeksi maailman haastavimmista
  turvallisuuden suhteen ja toteaa, ettei jalan liikkumista suositella;
  YK:n Global Compact Cities -ohjelma on arvioinut kaupungin
  turvallisuustilanteen "kriittiseksi". — en-Wikipedia "Port Moresby"
  (Crime-osio)
- **HUOM:** samoin kuin muissa erän kaupungeissa, yllä olevat luvut
  ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin pelin
  `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali. Tarkat
  kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 4. Kahdeksan kohdekartan kohdetta

Koordinaatit poimittu en-Wikipedian raakatekstin `{{Coord|...}}`-
malliparametreista jokaisesta käytetystä artikkelista. Etäisyydet ja
suunnat OMIA LASKELMIANI koordinaattieroista (asteet × 111 km,
pituusasteille kerrottu cos(9,479°) ≈ 0,9863), tarkistettu
Node-skriptillä — sama menetelmä kuin faktapohja-melbourne.md:ssä.

**Vertailupiste on en-Wikipedian oma Port Moresby -kaupunkipiste**
(9°28'44"S 147°08'58"E), JOKA OSUU TÄSSÄ TAPAUKSESSA JO historialliseen
ytimeen (spec-mantereet.md sääntö 4: kartan keskusta valitaan
historiallisen ytimen mukaan, ei hallinnollisen pisteen mukaan) —
piste sijaitsee Paga- ja Touaguba-kukkuloiden välisellä kannaksella,
juuri siinä vanhassa "Town"-keskustassa, johon siirtomaahallinto
rakensi ensimmäiset rakennuksensa 1880-luvulla ja jonka naapurissa
Konedobun kaupunginosa (rajanaapureina Ela Beach ja Fairfax Harbour)
sijaitsee tänäkin päivänä. Tämä poikkeaa Melbournen ja Sydneyn
ennakkotapauksista, joissa Wikipedian hallinnollinen piste piti erikseen
korjata — täällä sitä EI tarvinnut korjata, koska Port Moresbyllä ei
ole omaa erillistä "perustamispaikka"-artikkelia (kylä oli olemassa jo
ennen eurooppalaisia, ei perustamishetkeä) ja koska kaupungin hallinto
ei ole siirtynyt yhtä kauas keskustasta kuin Melbournessa/Sydneyssä —
Waigani, uusi hallintoalue, ON sen sijaan selvästi kauempana (7+ km),
ja se näkyy taulukossa omana ryhmänään.

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta vertailupisteestä |
|---|---|---|---|---|
| 1 | Port Moresby (vanha "Town"-keskusta, vertailupiste) | 9,4789°S 147,1494°I | "Port Moresby" | (vertailupiste) |
| 2 | Konedobu (siirtomaahallinnon vanha ydin, Fairfax Harbourin ja Touaguba-kukkulan välissä) | 9,4697°S 147,1597°I | "Konedobu" | ~1,52 km koilliseen |
| 3 | Hanuabada (suurin motu-koitabu-kylä, 1884 lipunnosto) | 9,45°S 147,1333°I | "Hanuabada" | ~3,66 km luoteeseen |
| 4 | Vabukori (motu-koitabu-rantakylä) | 9,5014°S 147,1867°I | "Vabukori" | ~4,78 km kaakkoon |
| 5 | Tatana-saari (WWII-tiepenger, laivastotukikohdan naapuri) | 9,4375°S 147,125°I | "Tatana Island" | ~5,32 km luoteeseen |
| 6 | Boroko (entinen kaupallinen keskus) | 9,4694°S 147,1997°I | "Boroko" | ~5,60 km itään |
| 7 | Kansallinen parlamenttitalo, Waigani (avattu 1984) | 9,4281°S 147,1917°I | "National Parliament House, Port Moresby" | ~7,29 km koilliseen |
| 8 | Kansallismuseo ja -galleria "Haus Tumbuna", Waigani (1977) | 9,4256°S 147,1901°I | "Papua New Guinea National Museum and Art Gallery" | ~7,40 km koilliseen |
| 9 | Jacksons-kansainvälinen lentokenttä | 9,4433°S 147,22°I | "Port Moresby International Airport" | ~8,67 km koilliseen |

**Rajausehdotus:** yhdeksän kohdetta jakautuu kahteen selvään ryppääseen
— vanha satamakeskusta parin kilometrin säteellä (kohteet 1–2, ja
Hanuabada/Vabukori/Tatana n. 4–5 km:n päässä rannikkoa seuraten) sekä
Waiganin hallintoalue n. 7–9 km koilliseen. Tämä on selvästi väljempi
kuin Melbournen 2,4 km:n tai Sydneyn 1,4 km:n ryppäät, koska Port
Moresby levittäytyi 1900-luvulla huomattavasti hajanaisemmin kukkuloiden
ja lahtien väliin — kirjoittaja voi harkita, kannattaako Waiganin
kohteet (7–9) korvata jollain lähempänä keskustaa olevalla kohteella,
jos kartan mittakaava vaatii tiiviimpää ryppäätä; vaihtoehtoina Ela
Beach (kaupungin pääranta, ei koordinaattia raakatekstissä — pitäisi
hakea erikseen) tai Koki-tori (ei koordinaattia raakatekstissä).

**Ela Beachilla ja Koki-torilla EI ollut `{{Coord}}`-mallinetta
artikkelien raakatekstissä** (Ela Beach -artikkeli on lyhyt eikä sisällä
infobox-koordinaattia lainkaan; Koki-torilla ei ole omaa artikkelia) —
niiden koordinaatit pitää hakea erikseen (esim. OpenStreetMap tai
MediaWiki-API), en arvannut lukuja.

---

## 5. Kuva-aiheet (Commons-kategoriat ja -tiedostot)

Kategoriat tarkistettu OLEMASSA OLEVIKSI Commonsin
`action=query&titles=Category:...`-kutsulla 23.8.2026 (pelkkä
olemassaolotarkistus — SISÄLTÖÄ EI ole silmäilty, se on kirjoittajan
työ kuvasääntöjen mukaisesti). Osa loogisilta nimiltä vaikuttavista
kategorioista EI ole olemassa Commonsissa (esim. "Hanuabada",
"Motu people", "Hiri", "Boroko", "Vabukori", "National Parliament
House, Port Moresby" eivät ole omia kategorioita) — näille annan
tarkistetun vaihtoehtoisen kategorian tai konkreettisen tiedostonimen,
joka löytyi suoraan Wikipedia-artikkelin raakatekstistä.

**Varmistetut olemassa olevat kategoriat:**
- `Category:Port Moresby` (yleinen)
- `Category:Ela Beach`
- `Category:Lakatoi`
- `Category:Jacksons International Airport`
- `Category:National Parliament of Papua New Guinea` (HUOM: EI
  "National Parliament House, Port Moresby" — tarkka nimi napattu
  suoraan Parliament-artikkelin `{{commonscat}}`-mallineesta)
- `Category:Waigani`
- `Category:Buildings in Port Moresby`
- `Category:Museums in Papua New Guinea` (yleisempi, koska museon oma
  kategoria puuttuu)
- `Category:Port Moresby (Bomana) War Cemetery` (mikäli T4:n
  WWII-kytköstä halutaan kuvittaa)
- `Category:Garamut`

**Avauskuvat (3):**
1. `Category:Port Moresby` — laaja satamanäkymä tai vanhan "Town"-alueen
   siluetti.
2. `Category:Lakatoi` — lakatoi purjeissa (huomaa: gallerian tiedostot
   ovat pääosin vanhaa PD-aineistoa, hyvä 1873-hengen kuvitukseen).
3. `Category:Waigani` — parlamenttitalo tai museorakennus laajana
   yleiskuvana.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Port Moresby` — satamanäkymä Paga-kukkulalta tai vastaava
   laaja kaupunkisiluetti.
2. `Category:Ela Beach` — rantanäkymä.
3. `Category:Lakatoi` tai `Category:Museums in Papua New Guinea` (jos
   museorakennuksesta löytyy laaja ulkokuva).

**Nosto-/jaksokuvat, sivuittain:**

*Kaupunki:*
- K1 (1873): `Category:Lakatoi` tai suoraan tiedosto "Picturesque New
  Guinea Plate VII (a) - Lakatoi, Near Elevala Island.jpg" (PD,
  ennen 1885) — HUOM: SISARTIEDOSTO "...Plate V (a) - Loading Lakatoi,
  Port Moresby.jpg" on JO KÄYTÖSSÄ `oceania-valokuvat.js`:n
  päiväkirjakortissa; käytä K1:ssä ERI tiedostoa (esim. Plate VII) tai
  varmista Fablelta, saako sama tiedosto esiintyä sekä
  päiväkirjakortissa että lehdessä (ks. osio 8, huomio 5).
- K2/K3 (motu, koitabu, Hanuabada): ei omaa Commons-kategoriaa —
  hae suoraan hakusanalla "Hanuabada" Commonsin tiedostohausta;
  Wikipedia-artikkelissa käytetty tiedosto "Poor coastal housing at
  Hanuabada in Port Moresby1.jpg" EI sovi sellaisenaan (nimi ja
  todennäköinen kehystys kurjuuskuvastoksi, spec-mantereet.md kieltää
  tämän) — kirjoittajan pitää etsiä arvokkaampi vaihtoehto (esim.
  paalutalot laajana, arkinen kylänäkymä ilman "poor"-kehystystä).
- K4 (kasvu/APEC): `Category:Buildings in Port Moresby` tai
  `Category:Port Moresby`.

*Historia:*
- H1 (Basilisk): tiedosto "HMS Basilisk (1848).jpg" tai "HMS
  'Basilisk', anchored in Threshold Bay, New Guinea, 28 May 1874 RMG
  PW8115.jpg" (molemmat PD, National Maritime Museum -kokoelma
  todennäköisesti; tarkista lisenssi ennen käyttöä).
- H2 (lähetystyö): ei suoraa kategoriaa löytynyt — hae "London
  Missionary Society New Guinea" tai vastaava.
- H3 (lipunnosto 1884): tiedosto "Reading the proclamation of
  annexation, Mr Lawe's house, Port Moresby, New Guinea, November
  1884 - photographer John Paine or Augustine E. Dyer (5708761723).jpg"
  (mainittu Papua New Guinea -artikkelissa, PD-aikakauden kuva —
  tarkista lisenssi Commonsista).
- H4 (APEC 2018): `Category:Port Moresby` — hae nykyaikaista
  kaupunkikuvaa, EI turvallisuusaiheisia kuvia.

*Hiri:*
- Hi1–Hi4: `Category:Lakatoi` on paras yksittäinen kategoria; myös
  tiedosto "Hiri Moale Festival.jpg" (Steve Jurvetson/CC BY 2.0
  -tyyppinen, tarkista) sopii Hi4:ään — HUOM tämäkin tiedosto on
  MAHDOLLISESTI jo käytössä `oceania-valokuvat.js`:ssä samannimisenä
  tanssijakuvana (Hirimoale2.jpg on eri tiedosto, mutta tarkista
  ettei "Hiri Moale Festival.jpg" itse ole jo käytössä).

*Kuvataide:*
- T1/T2/T4 (museo): `Category:Museums in Papua New Guinea`; tiedosto
  "Papua New Guinea National Museum May 2015.jpg" (mainittu artikkelin
  raakatekstissä, tarkista lisenssi) sopii ulkokuvaksi.
- T3 (tatuointi, EPÄVARMA): tiedosto "A marriageable girl.jpg"
  (1912, Motu_people-artikkelin infobox-kuva) — KATSO ENSIN SILMIN
  ennen käyttöä: 1900-luvun alun etnografisissa tatuointikuvissa on
  usein paljasta ihoa, ja kunnioitus-pilari sekä ikäsopivuusvaatimus
  edellyttävät erityistä harkintaa. Jos kuva ei sovi, T3-nosto voi
  toimia myös ilman kuvaa tai kirjoittaja voi etsiä korvaavan,
  nykyaikaisemman kuvan PNG:n käsityöperinteestä.

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:Ela Beach`
- `Category:Waigani`

---

## 6. Säätiedot

Ks. osio 3, Jakso 5 — samat luvut, sama lähde (en-Wikipedian
Climate-osio, EI ERA5).

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Kolme teemasivua käytettiin, koska aineisto kantoi selvästi kolme
   erillistä teemaa** (historia, hiri-kauppa, kuvataide/museo) ilman
   päällekkäisyyttä. Jos kirjoittaja haluaa tehdä vain kaksi, suosittelen
   säilyttämään `hiri`-sivun sellaisenaan — se on tehtävänannon
   erikseen pyytämä sisältö ja tukeutuu jo tarkistettuun kuvaan
   (Lindt 1885) — ja harkitsemaan `kuvataide`-sivun yhdistämistä
   `historia`-sivuun, jos tila on tiukka (T1/T2 sopivat sisällöllisesti
   myös historia-teemaan).
2. **"Koitabu people" ei ole oma Wikipedia-artikkeli.** Oikea otsikko
   kielelle/kansalle on "Koita language" (jonka infobox kutsuu kansaa
   ja kieltä nimellä "Koitabu, tai Koita"). "Koita" yksinään on
   kreikkalainen kylä (disambiguaatiosivu) — tästä syntyi yksi
   turha hakukierros, kirjaan sen tähän jotta seuraava agentti
   välttää sen.
3. **Kulttuurivisan (`oceania-questions.js`, kohta `portmoresby`)
   vastauksia on vältetty tietoisesti:** en tehnyt yhtään nostoa, jonka
   pääväite olisi "yli 800 kieltä" (kysymykset 1–2), "vuoristo selittää
   kielten määrän" (kysymys 4) tai Tok Pisinin synty kauppatilanteista
   (kysymys 5) — nämä ovat visan omia vastauksia. K2-nostossa käytetään
   kieliä ERI kulmasta (motu vs. koitabu, kaksi eri kieliperhettä
   samalla kannaksella) ja Hi2/Hi3-nostoissa hiri-kauppa käsitellään
   ilman kielikysymystä lainkaan. **HUOM kuitenkin:** Hi2-nosto (motu-
   kansan sadevarjo-syy savipatojen tekoon) ja PNG-artikkelin
   kielimonimuotoisuus-selitys eivät ole sama väite, mutta kirjoittajan
   kannattaa silti lukea visa uudelleen ennen julkaisua — sama
   varotoimi kuin Melbournen faktapohjassa.
4. **Hanuabada-artikkelin HLBTI-turvapaikkamaininta ja Koki-torin
   betelpähkinä-takavarikointiuutinen on TIETOISESTI jätetty pois**
   kaikista nostoista — kumpikaan ei liity 1873-teemaan, ja
   jälkimmäinen sivuaa rikollisuutta (Raamatun "ei rikollisuutta"
   -linjaus), joten se ei sovi mihinkään muuhun kuin mahdollisesti
   hyvin neutraaliin arkifaktaan (betelpähkinän pureskelu on
   laajalti tavallinen tapa PNG:ssä — tämä yleisfakta on turvallinen,
   mutta poliisin takavarikointi-uutinen ei ole).
5. **Sama Commons-tiedosto saattaa olla käytössä sekä
   `oceania-valokuvat.js`:n päiväkirjakortissa että ehdotettuna
   lehtikuvana** (Lindt 1885 -lakatoikuva ja Hiri Moale -festivaalikuva).
   `kaupunkilehti.md`:n "yksi kuva esiintyy kaupungissa vain kerran"
   -sääntö koskee sanamuodoltaan `kulttuuri-kategoriat.js`-pakettia,
   mutta suosittelen silti käyttämään lehdessä ERI tiedostoa samasta
   aiheesta (esim. Plate VII lakatoikuva Plate V:n sijaan) selkeyden
   vuoksi — kumpikin sisarkuva on olemassa ja PD, joten valinnanvaraa
   on.
6. **Matkaoppaan varovaisuushuomautus (tehtävänannon erikseen
   pyytämä, Raamatun linjaus 20.8.2026):** en-Wikipedian Port
   Moresby -artikkelin oma Crime-osio kuvailee kaupunkia (siteeraten
   Al Jazeeraa ja ABC:tä) yhdeksi maailman turvattomimmista, toteaa
   ettei jalankulkua suositella, ja YK:n Global Compact Cities
   -ohjelma on arvioinut turvallisuustilanteen "kriittiseksi". Tämä
   EI ole ulkoministeriön virallinen matkustusvaroitus (resepti
   mainitsee ulkoministeriön tason esimerkkinä Jemen/Syyria-tapauksissa),
   vaan Wikipedian oma kuvaus — siksi merkitsen sen EPÄVARMAKSI
   virallisen lähteen puuttuessa, mutta koska Wikipedia-artikkeli itse
   nostaa asian esiin omana osionaan, pidän sitä riittävän vahvana
   perusteena LYHYELLE ja asialliselle mainita: "liikkuminen jalan
   ei ole suositeltavaa, moni majoitus järjestää kuljetuksen" -tyyppiselle
   virkkeelle jakso 5:ssä. En käyttänyt mitään yksityiskohtia varsinaisesta
   rikollisuudesta (jengit, väkivalta) — vain yleisen varovaisuuskehotuksen.
   Kansallisen Papua-Uusi-Guinea-artikkelin paljon raskaampaa
   Crime and human rights -osiota (naisiin kohdistuva väkivalta,
   noituussyytökset, heimoväkivalta) EN käyttänyt lainkaan — se ei
   sovi Raamatun "ei rikollisuutta" -pilariin eikä ole kaupunkitason
   eikä matkailijan turvallisuuteen liittyvä fakta.
7. **"Established 1885" infobox-tieto ei ole ristiriidassa 1873-ankkurin
   kanssa, mutta voi hämmentää lukijaa jos molemmat mainitaan
   selittämättä:** 1873 on eurooppalaisen LÖYTÄMISEN ja NIMEÄMISEN
   vuosi (Moresby), 1885 on erikoiskomissaari Scratchleyn PÄÄTÖS
   sijoittaa siirtomaan hallintopaikka juuri tänne, ja 1886 on
   kaupungin varsinainen ruutukaavan mittaus (Cuthbertson). Näistä
   kolmesta ainoastaan 1873 osuu isoisän matkan vuoteen, ja se
   kannattaa nostaa selvästi esiin — mutta jos teksti mainitsee myös
   1885/1886, syy-seuraussuhde kannattaa kirjoittaa auki (samaan
   tapaan kuin Melbournen McArthur-galleria-huomio).
8. **Vain en-Wikipediaa ja sen raakatekstiä (action=raw) käytetty
   kaikkiin faktoihin**, paitsi Commons-kategorioiden
   olemassaolotarkistukseen (osio 5), joka käytti Commonsin
   `action=query`-rajapintaa vain kategorianimien vahvistamiseen — EI
   kuvasisällön tarkistamiseen. Ei ulkopuolisia hakuja tämän
   faktapohjan sisältöön.
9. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
   tekstiksi** merkkimäärävaatimusten mukaan (johdannot 210–240 mrk,
   nostot 460–600 mrk) ja tarkistettu silmämääräisesti; kirjoittajan
   kannattaa silti mitata koneellisesti ennen käyttöä, kuten resepti
   vaatii.
10. **`docs/mantereet-tyoaineisto/spec-mantereet.md` luettiin
    tehtävänannon mukaisesti** ja sen Oseania-osion Papua-Niugini-kohta
    ("elävä kulttuuri, ei 'kivikautinen'-kehystä koskaan") on ohjannut
    erityisesti K2-, K3- ja Hi-sivujen sävyä: motut ja koitabut
    esitetään toimijoina ja nykyisinä instituutioina (Motu Koita
    Assembly), ei etnografisina kohteina.
