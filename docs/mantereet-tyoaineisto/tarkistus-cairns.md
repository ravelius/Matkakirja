# Cairns-faktapohjan tarkistus

Tarkistettu 6.9.2026 en-Wikipedian raakatekstistä (`action=raw`,
`NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla viiveellä 429-vastausten
varalta) seuraavista artikkeleista: **Cairns**, George Elphinstone
Dalrymple, Kuranda Scenic Railway, Great Barrier Reef, Daintree
Rainforest, Kuku Yalanji, Yidiny people, Coral bleaching, Green Island
(Queensland), Box jellyfish, Irukandji jellyfish sekä kohdekartan
kandidaattien omat artikkelit (Cairns Wharf Complex, Cairns Customs
House, Cairns Court House Complex, Cairns School of Arts, Cairns City
Council Chambers, Cairns War Memorial, Cairns Chinatown Building,
Barrier Reef Hotel, Cairns Masonic Temple, Cairns railway station, St
Monica's Cathedral). Koordinaatit haettiin `action=query&list=geosearch`-
ja `prop=coordinates`-rajapinnoista suoraan, ei faktapohjan taulukosta,
ja kohteiden väliset etäisyydet laskettiin uudelleen omalla
laskennalla.

**MENETELMÄPOIKKEAMA, JOKA ON SANOTTAVA ÄÄNEEN.** Työmalli
(docs/tyolista-opukselle.md, "Työmalli") vaatii, että tarkistaja on eri
agentti kuin kokoaja ja kirjoittaja. Tässä istunnossa ei ollut
käytettävissä Agent-työkalua aliagenttien käynnistämiseen (istunto on
itse aliagentti eikä voi delegoida edelleen), joten tarkistuksen teki
sama agentti kuin kirjoituksen — mutta faktat luettiin lähteistä ENNEN
kirjoittamista ja riippumatta faktapohjan omista sitaateista.
Riippumattomuus on siis menetelmällinen (lähde luettiin uudelleen), ei
organisatorinen. Fablen kannattaa tilata Sonnet-tarkistus jälkikäteen,
jos rooliero halutaan täyteen mittaansa.

**Yleisarvio: faktapohja on tarkka ja hyvin lähteistetty, mutta siinä
on kolme korjattavaa kohtaa** — yksi selvä asiavirhe (Daintreen ja
Amazonin ikäero), yksi ajoitusvirhe (Dalrymplen leiri "syyskuun
lopulla") ja yksi alustyypin käännösvirhe (kaljaasi vs. kutteri).
Lisäksi kolme lukua kannattaa muotoilla toisin, koska lähde sanoo ne
eri tavalla kuin faktapohja. Kaikki tarkistetut vuosiluvut (1770, 1872,
1873, 1876, 1886, 1891, 1936, 1981, 1984, 2003, 2021, 2023) osoittautuivat
riippumattomasti oikeiksi.

---

## A. VIRHE — L3: Daintree ei ole "kymmenen miljoonaa vuotta" Amazonia vanhempi

**Väite (L3):** "se on säilynyt lähes yhtäjaksoisena noin 180 miljoonaa
vuotta – **kymmenen miljoonaa vuotta kauemmin kuin Amazonin
sademetsä**."

**Ongelma:** En-Wikipedian "Daintree Rainforest" -artikkelin OMA
leipäteksti sanoo: "At around 180 million years old, these ancient,
self-sustaining forests are **nearly 100 million years older than the
Amazon** of South America". Faktapohjan "kymmenen miljoonaa vuotta"
tulee saman virkkeen ALAVIITTEEN sitaatista (YouTube-dokumentti: "it is
10 million years older than the Amazon"). Artikkelin leipäteksti ja sen
oma lähdesitaatti ovat siis keskenään ristiriidassa kertoimella
kymmenen — tämä on juuri se tilanne, josta lehtityö-resepti sanoo, että
ristiriita joko kirjoitetaan auki tai valitaan tarkempi lähde ja ero
selitetään.

**Suositus:** Älä käytä Amazon-vertailua lainkaan. 180 miljoonaa vuotta
ja "yksi maailman vanhimmista yhtäjaksoisista sademetsistä" kantavat
noston ilman kiistanalaista kerrointa, ja lisäksi Amazon-vertailu on
lehden kannalta sivuseikka. Jos vertailu halutaan mukaan, sen on
sanottava ristiriita ääneen — mikä on nostotekstissä raskasta.

---

## B. VIRHE — K1: Dalrymple ei leiriytynyt Trinity Bayhin "syyskuun lopulla"

**Väite (K1):** "**Syyskuun lopulla 1873** tutkimusretkeilijä George
Elphinstone Dalrymple leiriytyi Trinity Bayn rannalle."

**Ongelma:** Lähde sanoo, että retkikunta LÄHTI 29.9.1873 Cardwellin
läheltä. Trinity Bayhin päästiin vasta sen jälkeen, kun oli tutkittu
Mourilyan Harbour, Gladys Inlet ja Johnstone-joki; retkikunta palasi
Cardwelliin 22.12.1873. Trinity Bayn leiri on siis loka–marraskuun
puolella, ei syyskuun lopussa. Faktapohjan oma lähdeluettelo sanoo
päivämäärän oikein ("Dalrymple lähti 29.9.1873"), mutta julkaistavaksi
tarkoitettu proosa siirtää lähtöpäivän leiriytymispäiväksi.

**Suositus:** Kirjoita "syksyllä 1873" tai "loppuvuodesta 1873", ja
mainitse 29. syyskuuta erikseen lähtöpäivänä, jos päivämäärää halutaan.

---

## C. VIRHE — K1: *Flying Fish* ja *Coquette* olivat kuttereita, eivät kaljaaseja

**Väite (K1):** "Dalrymplen retkikunta etsi kahdella **kaljaasilla**,
Flying Fishillä ja Coquettella…"

**Ongelma:** Lähde sanoo "two [[cutter (boat)|cutters]] named *Flying
Fish* and *Coquette*". Cutter on suomeksi kutteri; kaljaasi (galeas) on
eri alustyyppi. Kyse on käännösvirheestä, ei lähteen väärinluvusta,
mutta se menisi lehteen sellaisenaan.

**Suositus:** "kahdella kutterilla".

---

## D. Kolme lukua, jotka lähde sanoo eri tavalla (muotoiltava uudelleen)

1. **L2, korallipeitteen menetys.** Faktapohja: "riutta on menettänyt
   tutkimusten mukaan yli puolet korallipeitteestään **vuosien 1995 ja
   2017 välillä**." Lähde (Great Barrier Reef, Climate change): "a
   study found that the Great Barrier Reef has lost more than half of
   its corals **since 1995**" — loppuvuotta ei anneta, tutkimus on
   vuodelta 2020. Kirjoita "vuodesta 1995 lähtien".
2. **L2, valkaistumisvuodet.** Lähteen luettelo on "1998, 2002, 2006,
   2016, 2017 and 2020"; vuoden 2022 joukkovalkaistuminen mainitaan
   erikseen omassa kappaleessaan ("In March 2022, another mass
   bleaching event has been confirmed"). Faktapohjan seitsemän vuoden
   lista on siis oikea, mutta se on koottu kahdesta kohdasta — se on
   hyvä tietää, jos joku kysyy lähdettä.
3. **H3, kiinalaisyhteisön koko 1901.** Faktapohja: "kutistivat
   yhteisön noin **1 450 asukkaasta** vuoden 1901 tienoilla". Lähde
   antaa vain: 450 henkeä 1909, "a decrease of around 1,000 since
   1901". 1 450 on faktapohjan oma vähennyslasku. Se on oikein, mutta
   turvallisempi muotoilu on lähteen oma: 450 vuonna 1909, noin tuhat
   vähemmän kuin 1901.

---

## E. Kaksi lukuristiriitaa lähteiden välillä (kirjoitettava auki tai kierrettävä)

1. **Kuku Yalanjin maanpalautus (L4): 160 213 ha / 29.9.2021 vastaan
   160 108 ha / 28.9.2021.** "Daintree Rainforest" sanoo "On 29
   September 2021 … 160,213 ha"; "Kuku Yalanji" sanoo "In an agreement
   signed on 28 September 2021 … 160,108 ha". Faktapohja huomasi
   hehtaariristiriidan mutta EI päivämääräristiriitaa. Kumpikin ero on
   pieni ja koskee samaa tapahtumaa. **Suositus:** kirjoita "syyskuun
   lopussa 2021" ja "runsaat 160 000 hehtaaria", ja selitä molemmat
   erot lohkokommentissa. Näin lehti ei valitse puolta eikä väitä
   tarkkuutta, jota lähteillä ei ole.
2. **Kuku Yalanjin palautuksen laajuus.** "Daintree Rainforest"
   mainitsee vain Daintreen kansallispuiston; "Kuku Yalanji" luettelee
   lisäksi Ngalba Bulalin, Kalkajakan ja Hope Islandsin
   kansallispuistot. Faktapohjan kolmen lisäpuiston luettelo on siis
   katteessa, mutta vain toisessa artikkelissa.

---

## F. Vahvistettu erityisen huolella

- **1873-kulma (tehtävänannon ydin).** "Dalrymple camped on a site that
  later became the city of Cairns" on sanatarkasti artikkelissa
  "George Elphinstone Dalrymple" (North East Coast expedition of 1873).
  Retkikunnan kokoonpano (Walter Hill, Robert Arthur Johnstone,
  Ferdinand Macquarie Tompson, 13 Native Police -sotilasta) ja
  paikallisten "large outrigger canoes with decorative prows"
  vahvistettu samasta osiosta.
- **Kaupungin perustaminen 1876.** Vahvistettu kahdesta kohdasta:
  "The city was founded in 1876 and named after Sir William Wellington
  Cairns, following the discovery of gold in the Hodgkinson River" ja
  "The area was named Cairns in late 1876 in honour of the then
  Governor of Queensland, William Cairns". Lisäksi vahvistui
  faktapohjasta puuttuva mutta hyödyllinen yksityiskohta: Brinsley G.
  Sheridan valitsi ensin Trinity Inletiltä ylempää paikan nimeltä
  Smith's Landing (uudelleennimettynä **Thornton**), ja vasta uusi
  kultakenttien polku Battle Campiin teki rannikkopaikasta
  suositellumman. Paikka oli enimmäkseen mangrovesuota ja hiekkaharjuja,
  ja suot täytettiin kuivalla mudalla, sahanpurulla ja louhoksen
  painolastilla.
- **Battle Camp 1872.** Vahvistettu sanatarkasti (History-osio): iso
  alkuperäisasukkaiden kaivo nykyisen rantabulevardin kohdalla,
  merikurkkukalastajat 1860-luvun lopulta, väkivaltainen yhteenotto
  1872 paikallisten yidinjien ja kalastaja Phillip Garlandin välillä,
  nimi Battle Camp sen jälkeen. Lähde on todella niin niukka kuin
  faktapohja sanoo — yksi virke ilman yksityiskohtia.
- **Neljä perinteisten omistajien ryhmää** (Dawul Wuru / yirrganydji,
  djabugay, gunggandji yli 7 500 ha Yarrabahin niemimaalla, ja
  yidinjiklaanit) vahvistettu "Indigenous languages and representation"
  -osiosta sanatarkasti. Gimuy-nimi ja gimuy-walubarra-klaani
  vahvistettu History-osiosta (lähteenä R. M. W. Dixon, *A grammar of
  Yidiny*, 1977, ja Cairns Regional Council). Alkuperäiskansojen osuus
  9,7 % väestöstä vahvistettu Demographics-osiosta (2021-laskenta).
- **Kurandan rata.** 1886 alku, valmis Kurandaan 1891,
  matkustajaliikenne 25.6.1891, 15 käsin louhittua tunnelia, 37 siltaa,
  merenpinnasta 328 metriin Macalisterin vuoriston läpi, kolme
  miljoonaa kuutiometriä maata, monta kuollutta työntekijää,
  ensimmäinen matkailujuna 1936, yhdensuuntainen matka nykyään n. 1 h
  55 min, radan pituus 37 km. Kaikki vahvistettu.
- **Ilmasto.** Köppen Am, sadekausi marraskuusta toukokuuhun, kuivempi
  kausi kesä-lokakuu, vuosisade "just under 2000 mm" (sääruudun oma
  summa 1 958,1 mm), tammikuun 1981 ennätys yli 1 417,4 mm, kuivin
  vuosi 2002 (721 mm), keskimääräinen ylin 26,2 °C (heinäkuu) – 31,7 °C
  (tammikuu). Kaikki vahvistettu. Sääruutu on 1991–2020-normaalikaudelta
  asemalta Cairns Aero AWS (16°52'12"S, 145°45'00"E, 2 m).
- **Sykloni Jasper 2023:** Barron-joki ylitti maaliskuun 1977 ennätyksen
  (3,8 m), pahin tulva sitten mittausten alkamisen 1915. Vahvistettu.
- **Esplanadin laguuni:** 4 800 neliömetriä, avattiin maaliskuussa 2003,
  "initially controversial". Vahvistettu.
- **Matkailun sija:** "the Cairns region is the fourth-most-popular
  destination for international tourists in Australia after Sydney,
  Melbourne and Brisbane" (Tourism Australia). Vahvistettu.
- **Toinen maailmansota:** liittoutuneiden tukikohta Tyynenmeren
  operaatioille, USAAF:n ja RAAF:n tukikohdat (nykyinen lentokenttä),
  merivoimien lentovenetukikohta Naval Base Cairns Trinity Inletissä,
  taistelulentoja Korallimeren taistelun (1942) tueksi, Z Experimental
  Station eli "The House on the Hill" Mooroobolin Munro's Hillillä
  ("Fairview"-tila). Kansainvälinen lentokenttä 1984. Kaikki
  vahvistettu.
- **Iso valliriutta:** maailmanperintökohde 1981, yli 2 900 riuttaa,
  matkailu tuottaa yli 3 miljardia Australian dollaria vuodessa,
  nykyisen elävän riuttarakenteen kasvu alkoi GBRMPA:n mukaan noin
  9 000 vuotta sitten ja CRC Reef Research Centren mukaan 6 000–8 000
  vuotta sitten, merenpinta oli viimeisen jääkauden huipulla 120 metriä
  nykyistä alempana, 2022 pohjois- ja keskiosien korallipeite oli
  suurin seurannan aikana mutta eteläosassa se väheni. Kaikki
  vahvistettu.
- **Daintree muilta osin:** noin 1 200 km², n. 3 000 kasvilajia lähes
  210 heimosta, yli 900 puulajia, 30 % Australian sammakko-, matelija-
  ja pussieläinlajeista, 90 % lepakko- ja perhoslajeista, 7 %
  lintulajeista, yli 12 000 hyönteislajia, 0,12 % Australian
  maapinta-alasta, kasuaari ja Bennettin puukenguru uhanalaisina.
  Kaikki vahvistettu. LISÄYS, jota faktapohjassa ei ole: Wet Tropics of
  Queensland lisättiin Unescon maailmanperintöluetteloon **1988**, ja
  metsä säilyi 1983–1984 tienrakennuksen vastaisten sulkujen ja
  vaikuttamiskampanjan ansiosta.
- **Green Island (Jakso 2).** Faktapohja epäili aiheellisesti, että
  lähde oli pelkkä kuvateksti. Tarkistin: **artikkeli "Green Island
  (Queensland)" on olemassa**, ja se kertoo saaren olevan
  korallikeko (coral cay) noin 27 kilometrin päässä Cairnsista,
  kansallispuisto vuodesta 1937 ja osa Ison valliriutan
  maailmanperintöaluetta. Jakso 2 voidaan siis kirjoittaa oikealla
  lähteellä eikä sitä tarvitse jättää pois.

---

## G. Kohdekartta: faktapohjan kahdeksan kohdetta eivät kelpaa sellaisenaan

Faktapohjan taulukossa kaksi kohdetta on **alle 200 metrin päässä**
toisistaan (Cairns City Council Chambers -16,9204/145,7752 ja Cairns
School of Arts -16,922/145,7753 — 178 metriä), ja Barrier Reef Hotel on
161 metrin päässä Cairns Customs Housesta. Petran, Mekan ja Karachin
oppi (200 metrin vähimmäisväli, jotta numeroympyrät eivät mene
päällekkäin) karsii nämä. Tarkistin kaikki välit uudelleen
`list=geosearch`-haulla keskustan ympäriltä ja mittasin etäisyydet itse.

Suositeltu kahdeksan kohteen sarja, jossa kaikki välit ovat yli 200
metriä ja jakauma on tasainen pohjoisesta etelään:

| Kohde | lat | lon |
|---|---|---|
| St Monican katedraali | -16.9171 | 145.7726 |
| Cairnsin vapaamuurarien temppeli | -16.9174 | 145.7704 |
| Cairnsin sotamuistomerkki | -16.9172 | 145.7752 |
| Kaupunginvaltuuston talo | -16.9204 | 145.7752 |
| Oikeustalojen kortteli | -16.9213 | 145.7777 |
| Rautatieasema | -16.92528 | 145.77222 |
| Tullitalo | -16.9235 | 145.7791 |
| Vanha satamalaituri | -16.9273 | 145.78 |

Vertailupisteeksi Cairns Wharf Complex käy hyvin (faktapohjan oma
perustelu on pätevä), mutta kartan RAJAUS kannattaa vetää keskustan
ympäri eikä laiturin ympäri: kaikki kahdeksan mahtuvat noin 2,4 × 2,5
kilometrin ruutuun.

---

## H. Sisältölinjaukset

- **Dalrymplen alkuperäisteksti on jätettävä lainaamatta.** Vahvistin,
  että artikkeli lainaa Dalrymplen omia sanoja ("savage cannibals",
  "copious effusion of blood") ja kuvaa leirien hajottamista
  kiväärivolleilla sekä kannibalismiväitteitä. Faktapohja on tehnyt
  oikein jättäessään nämä pois. Sama koskee kirjoittajaa:
  spec-mantereet.md:n Oseania-linjaus 2 ("piikki herroihin itseensä")
  ja Perustuslain pilari 4 kieltävät sekä ajan rasistisen kielen että
  väkivallan yksityiskohdat.
- **Irukandji-kansan ja Cairnsin suhde** on faktapohjassa kuvattu
  varovaisemmin kuin lähde vaatisi: artikkeli sanoo, että
  irukandji-kielen alue on Kuranda Rangen ja alemman Barron-joen
  ympärillä ja että **alue sisältää Cairns Regional Councilin
  maisemaa**. "Cairnsin pohjoispuolella" on siis oikein muttei koko
  totuus; kumpi tahansa muotoilu on katteessa.
- **Ei nykypolitiikkaa.** Cairns-artikkelissa on kunnallispolitiikkaa,
  vaalijärjestelmä ja ystävyyskaupunkilistoja — ei lehteen.

---

## Yhteenveto korjattavista kohdista

### PAKOLLISET KORJAUKSET

1. **[VIRHE] L3:** poista Amazon-vertailu tai kirjoita ristiriita auki
   (leipäteksti 100 milj. v, alaviite 10 milj. v). Ks. kohta A.
2. **[VIRHE] K1:** "syyskuun lopulla 1873" → "syksyllä 1873"; 29.9. on
   lähtöpäivä Cardwellista, ei Trinity Bayn leiripäivä. Ks. kohta B.
3. **[VIRHE] K1:** "kaljaasi" → "kutteri". Ks. kohta C.
4. **[RISTIRIITA] L4:** älä valitse hehtaarilukua äläkä päivämäärää
   toisen artikkelin mukaan; kirjoita "syyskuun lopussa 2021" ja
   "runsaat 160 000 hehtaaria" ja selitä ero lohkokommentissa.
   Ks. kohta E.
5. **[KARTTA] Osio 4:** kaksi kohdeparia on alle 200 metrin päässä
   toisistaan — käytä kohdan G taulukkoa. Ks. kohta G.

### MUOTOILUKORJAUKSET

6. L2: "vuosien 1995 ja 2017 välillä" → "vuodesta 1995".
7. H3: 1 450 on oma laskutoimitus — käytä lähteen omaa muotoa
   (450 vuonna 1909, noin tuhat vähemmän kuin 1901).
8. Jakso 2: Green Islandille ON oma artikkeli — käytä sitä, älä
   Gallery-osion kuvatekstejä.

---

## Kelpaako-tuomio

**KELPAA KORJAUSTEN JÄLKEEN.** Faktapohja on huolellinen ja sen omat
lähdeviittaukset ovat lähes poikkeuksetta täsmällisiä; kolme virhettä
ovat yksittäisiä eivätkä horjuta rakennetta. Amazon-vertailu (kohta A)
on ainoa, joka olisi mennyt lehteen selvästi vääränä väitteenä, ja
kohdekartan 200 metrin ongelma (kohta G) olisi näkynyt pelissä
päällekkäisinä numeroympyröinä. Kirjoitusvaihe voi edetä, kun nämä on
otettu huomioon.
