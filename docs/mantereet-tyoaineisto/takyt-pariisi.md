# Täkyehdokkaat: Pariisi

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten, sama malli kuin
docs/mantereet-tyoaineisto/takyt-rooma.md ja takyt-istanbul.md.
Fokusmaa Ranska, fokuskaupunki Pariisi; isoisä kävi kaupungissa
**lokakuussa 1873**, mikä on tämän listan tärkein ajallinen ankkuri.

**Tila:** kartoitus. EI koodia, EI muutoksia olemassa oleviin
tiedostoihin. Fable valitsee, mitkä viedään peliin ja missä
sanamuodossa.

## Miksi 1873 on Pariisissa poikkeuksellisen hyvä täkyvuosi

Isoisän matkavuonna Pariisi oli vasta toipumassa kahdesta katastrofista
peräkkäin: Preussin piiritys (19.9.1870–28.1.1871) ja kommuuni
(maalis–toukokuu 1871). Kolmas tasavalta oli kaksi vuotta vanha,
presidentiksi oli valittu toukokuussa 1873 marsalkka MacMahon, ja
kaupungin keskellä seisoi vielä palaneita raunioita. Kaikki alla olevat
täyt on valittu niin, että vähintään kolmasosassa on **tarkistettu
kytkös vuoteen 1873** — se on tämän maan oma erikoisuus, jota Rooman ja
Istanbulin listoilla ei samassa määrin ollut.

## Tarkistustapa

- Wikipedia-artikkelit haettu 25.8.2026 Noden `fetch`illä
  (`NODE_USE_ENV_PROXY=1`) osoitteesta
  `https://en.wikipedia.org/w/api.php?action=query&titles=<ARTIKKELI>&prop=extracts|coordinates&explaintext=1&format=json&formatversion=2&redirects=1`,
  User-Agent-otsakkeen kanssa ja uusintayrityksin kasvavalla viiveellä
  (429- ja 5xx-vastaukset).
- Ei mitään muistinvaraista. Jokaisen täyn alla on artikkeli, sen osio
  tai kappale ja lainaus, johon väite nojaa.
- **Koordinaatit** en-Wikipedian `prop=coordinates`-rajapinnasta, eivät
  arvattuja. Kolme kohdetta (Zarafa, kyyhkyposti, Wallace-suihkukaivot)
  on ilmiöitä eikä paikkoja — niillä ei ole koordinaatteja, ja niiden
  sijainti on kuvattu sanallisesti.
- **Kuvat:** jokaisen ehdotetun Commons-tiedoston olemassaolo, koko,
  lisenssi, tekijä JA `Restrictions`-kenttä on kysytty erikseen
  Commonsin `imageinfo`-rajapinnalla (`iiprop=url|size|extmetadata`) —
  ei arvattuja tiedostonimiä. Kaikkien ehdotettujen Restrictions-kenttä
  oli **tyhjä**. Kaikki ovat PD, CC0 tai CC BY / CC BY-SA; poikkeukset
  on merkitty kohteittain.
- **fi-nimet** tarkistettu fi-Wikipediasta (`redirects=1`).
- **Tunnistettavat elävät henkilöt:** yksikään ehdotettu kuva ei ole
  henkilökuva elävästä ihmisestä. Kolmessa nykyvalokuvassa (kissakatu,
  koirien hautausmaa, Zouave-tulvakuvat) voi näkyä ohikulkijoita —
  ne on merkitty **SILMÄTARKISTUS**-merkinnällä, koska kuvaa ei voi
  hyväksyä pelkän API-tiedon perusteella.

---

## Olemassa oleva Pariisi-sisältö repossa (grep js/packs/)

`grep -ril "pariisi" js/packs/` antoi 34 tiedostoa. Olennaiset:

- **js/packs/nahtavyysjutut.js** (rivit n. 2305–2675), avain `pariisi`:
  **yksitoista** valmista nähtävyysjuttua — Eiffel-torni (72 nimeä, 2,5
  milj. niittiä, Maupassantin lounas), Riemukaari, Concorden aukio
  (Luxorin obeliski, giljotiini), Louvre, Luxembourgin puisto, Sacré-Cœur
  (1875–1914, Abadie, 77 ehdotusta, travertiini, Savoyarde), Panthéon
  (Foucault'n heiluri, 38 umpeenmuurattua ikkunaa), Notre-Dame,
  Orsayn museo, Palais Garnier (171 kilpailijaa, 1861 Garnier) ja
  Place des Vosges.
- **js/packs/kulttuuri-kategoriat.js** (rivi 4349 alkaen): "Matkailijan
  Pariisi" -opas (hintataso, taskuvarkaat, jonot, elokuun sulut,
  kaudet, linkit) sekä **viisi nostoa**: Tornissa on 72 nimeä kullalla,
  Metron sisäänkäynti koottiin palasista (Guimard, 167 → 86), Kukko
  putosi ja löytyi seuraavana päivänä (Notre-Dame 2019), Paras patonki
  valitaan sokkona, Édith Piaf lauloi ensin kadulla, Kaksi sormea riitti.
- **js/packs/europe-saapumiset.js**, avain `pariisi`: kioskin lehti ja
  löytötavaratoimiston matkalaukku vuodelta 1873.
- **js/packs/europe-questions.js**, avain `pariisi`: Seine, Eiffel-torni,
  kansallispäivä, **katakombit** ("Mikä Pariisin maanalainen
  käytäväverkosto syntyi vanhoista kivilouhoksista?"), Notre-Dame 2024.
- **js/packs/julisteet.js**: juliste "Pariisi 1889" (maailmannäyttely) —
  huom. Pariisin juliste EI ole 1873-juliste toisin kuin monella muulla
  kaupungilla.
- **js/packs/europe-valokuvat.js**: Boulevard Saint-Michel, Abbesses'n
  metroasema, Les Deux Magots, Notre-Damen gargoylet.
- **js/packs/miniatyyrit.js**: kahdeksan Pariisi-miniatyyriä (Eiffel,
  Riemukaari, Concorde, Louvre, Luxembourg, Sacré-Cœur, Panthéon,
  Notre-Dame).
- **js/packs/maa-kategoriat.js**, avain `FRA`: Lascaux, Bayeux'n
  seinävaate, Bastilji, Sainte-Chapelle ("Sali, joka rakennettiin
  valosta"), Roquefort, loppiaiskakku, Michelin, kynttilänpäivä,
  kuumailmapallo, Braille, Pasteur, Lumièret, Pilat'n dyyni,
  camarguenhevonen, Chaîne des Puys, Mont-Saint-Michel ("Meri palaa
  saaren ympärille"), Tour de France, petankki, Roland-Garros,
  Marseillen saippua, patonkikilpailu, **Seinen vihreät kirjalaatikot**.

**Johtopäätös:** Eiffel, Notre-Dame, Louvre, Concorde, Panthéon,
Sacré-Cœurin rakennusvuodet, Garnier, metro, patonki, bukinistit ja
Piaf ovat JO KÄYTÖSSÄ. Alla olevat täyt kiertävät ne kaikki: uusia
paikkoja (kissakatu, koirien hautausmaa, Buttes-Chaumont, Flamelin
talo, Pont Neuf), uusia kulmia jo tunnettuun (Sacré-Cœur vuoden 1873
äänestyksenä, katakombit aukioloaikoina) ja **1871–73-aikakausikoukku**,
jota pelissä on toistaiseksi vain saapumistekstin matkalaukussa.

---

## Täkyt

### 1. Pariisin kapein katu on nimetty kalastavan kissan mukaan (ELÄINTÄKY)

Seinen eteläpuolella, Saint-Michelin metroaseman kulmilla, on katu joka
on **1,80 metriä leveä ja 29 metriä pitkä** — Pariisin kapein.
Se rakennettiin 1540 ja päättyi silloin suoraan joen rantaan. Nimi on
ollut käytössä ainakin vuodesta 1636, ja se tulee kalakaupan kyltistä:
kaupan omistajalla, kaniikki Dom Perlet'llä, oli musta kissa, joka
tunnettiin siitä, että se sieppasi kaloja Seinestä yhdellä
käpälänvedolla. Katu on niin kapea, että sen läpi kävelee kymmenessä
sekunnissa — ja se on kaupungin ilmaisin nähtävyys.

- **Paikka:** Rue du Chat-qui-Pêche, 5. kaupunginosa. 48,8531°N,
  2,3461°E (en-Wikipedia, coordinates).
- **Lähde:** en.wikipedia.org/wiki/Rue_du_Chat-qui-Pêche, johdanto ja
  nimeä käsittelevä kappale.
- **Lainaus/perustelu:** "is considered the narrowest street in Paris.
  It is only 1.80 m wide for the whole of its 29 m length." — "Built in
  1540, it then ended on the bank of the river Seine." — "Its current
  name is attested by 1636 as the Rue du Chat qui pesche... This name
  comes from the sign of a fishmongery, whose owner, a canon, Dom
  Perlet, owned a black cat known for its ability to catch fish from
  the Seine with a single swipe of its paw."
- **Kuva:** Commons **Rue du Chat-qui-Pêche (from the Rue de la
  Huchette) MET DP200362.jpg** (1436×1886, CC0, Charles Marville,
  n. 1868) — **aikalaiskuva viisi vuotta ennen isoisän käyntiä**.
  Nykyvaihtoehto: **Rue du Chat-qui-Pêche 2.jpg** (3648×5472,
  CC BY-SA 4.0, Celette, 2018) — **SILMÄTARKISTUS:** katukuvassa voi
  näkyä ohikulkijoita.
- **Varmuus:** VARMA. **Tarkennus, joka on kerrottava:** sama artikkeli
  sanoo, ettei katu ole kapein *kapeimmalta kohdaltaan* — Sentier des
  Merisiers on kapeimmillaan 87 cm. Sano siis "kapein katu"
  (kokonaisleveydeltä), älä "kapein kohta Pariisissa".

### 2. Kirahvi käveli Marseillesta Pariisiin — takki päällä ja kengät jalassa (ELÄINTÄKY)

Egyptin varakuningas Muhammad Ali lähetti 1827 kolme kirahvia kolmelle
Euroopan hallitsijalle. Ranskan osuus saapui laivalla Marseilleen
31.10.1826 — kannessa oli sahattu reikä, josta kaula mahtui ulos.
Merimatka Atlantin ympäri katsottiin liian vaaralliseksi, joten
päätettiin, että kirahvi **kävelee 900 kilometriä Pariisiin**.
Luonnontieteilijä Étienne Geoffroy Saint-Hilaire, 55, käveli mukana ja
teetti eläimelle kaksiosaisen keltaisen takin ja kengät. Matka kesti 41
päivää. Lyonissa vastassa oli 30 000 ihmistä; Pariisissa kirahvia kävi
katsomassa yli 100 000 — joka kahdeksas kaupunkilainen. Muoti muuttui:
hiukset kammattiin torneiksi, kankaisiin tuli täpliä ja väri nimeltä
"kirahvin vatsa" myi kaiken. Eläin eli Jardin des Plantes'ssa 18
vuotta ja kuoli 1845.

- **Paikka:** Ménagerie du Jardin des Plantes, 5. kaupunginosa.
  48,8447°N, 2,3597°E (en-Wikipedia "Ménagerie du Jardin des plantes").
- **Lähde:** en.wikipedia.org/wiki/Zarafa_(giraffe), osiot matkasta ja
  vastaanotosta.
- **Lainaus/perustelu:** "Because of her height, a hole was cut through
  the deck above the cargo hold through which she could poke her neck."
  — "it was decided that she should walk the 900 km to Paris." — "He
  ordered a two-part yellow coat to keep her warm, and shoes for her
  feet." — "The trip to Paris took 41 days... She arrived in Lyon on 6
  June, where she was greeted by an enthusiastic crowd of 30,000." —
  "Over 100,000 people came to see her, approximately an eighth of the
  population of Paris at the time."
- **Kuva:** Commons **Nicolas Hüet, the Younger - Study of the Giraffe
  Given to Charles X by the Viceroy of Egypt - Google Art Project.jpg**
  (4793×6392, public domain, Nicolas Hüet nuorempi, 1827) — maalaus
  juuri tästä kirahvista. Vaihtoehto: **Giraffe du Sennaar.png**
  (2383×3455, public domain, litografia Langlumé, 1827).
- **Varmuus:** VARMA matkasta ja vastaanotosta. **EPÄVARMA
  1873-kytkös:** artikkeli sanoo, että täytetty kirahvi oli esillä
  Jardin des Plantes'n aulassa "for many years" ennen siirtoa La
  Rochelleen — eli isoisä *saattoi* nähdä sen 1873, mutta lähde ei
  vahvista vuotta. Älä väitä, että hän näki sen. **Nimi:** "Zarafa" on
  vasta 1985 annettu nimi (kirjailija Michael Allin); aikalaiset
  kutsuivat sitä nimillä *le bel animal du roi* ja *la Belle
  Africaine*. Tämä kannattaa kertoa, ei piilottaa.

### 3. Pariisin koirien hautausmaan kuuluisin patsas kertoo tarinan, joka ei ole totta (ELÄINTÄKY)

Asnières-sur-Seinen saarelle avattiin 1899 lemmikkien hautausmaa, jota
pidetään usein maailman ensimmäisenä eläinten nekropolina. Siellä
lepäävät muun muassa elokuvatähti Rin Tin Tin, näyttelijä Marguerite
Durandin lemmikkileijona ja säveltäjä Camille Saint-Saënsin eläin.
Portilla seisoo monumentti bernhardilaiskoira Barrylle (1800–1814),
joka pelasti Sveitsin Suuren Pyhän Bernhardin solassa yli 40 ihmistä.
Patsaan teksti kuuluu: *"Il sauva la vie à 40 personnes. Il fut tué par
le 41ème"* — hän pelasti 40 ihmisen hengen, ja 41. tappoi hänet.
Tarina on kaunis, ja se on **väärin**: Barry vietiin kahdentoista
palvelusvuoden jälkeen eläkkeelle Berniin ja kuoli siellä 14-vuotiaana.
Monumentti Pariisissa kertoo yhä toisin.

- **Paikka:** Cimetière des Chiens et Autres Animaux Domestiques,
  4 pont de Clichy, Asnières-sur-Seine. 48,9094°N, 2,2967°E
  (en-Wikipedia, coordinates).
- **Lähde:** en.wikipedia.org/wiki/Cimetière_des_Chiens_et_Autres_Animaux_Domestiques
  (johdanto) sekä en.wikipedia.org/wiki/Barry_(dog), osiot "rescues" ja
  legendasta.
- **Lainaus/perustelu:** "It opened in 1899 at 4 pont de Clichy on Île
  des Ravageurs in Asnières-sur-Seine." — "at the entry is the monument
  to Barry, a Saint Bernard mountain rescue dog who died in 1814. The
  plaque says that during his lifetime, 'Barry' was responsible for
  saving the lives of 40 people." — "There is a plaque... which states,
  'Il sauva la vie à 40 personnes. Il fut tué par le 41ème'..." —
  "However, the legend of his death is untrue. After twelve years of
  service at the monastery, Barry was brought... to Bern... He died at
  the age of 14."
- **Kuva:** Commons **Cimetière des Chiens 7, Asnières-sur-Seine,
  France 2013.jpg** (4899×3251, CC BY 2.0, Tommie Hansen, 2013) —
  **SILMÄTARKISTUS** (hautausmaakuva, tarkista ettei kuvassa ole
  ihmisiä eikä tuoreita hautoja). **HUOM lisenssistä:** Commonsissa on
  useita 1900-luvun alun postikortteja juuri Barryn patsaasta, mutta ne
  ovat **Licence Ouverte (Etalab)** — ei PD eikä CC. Älä käytä niitä
  ilman erillistä päätöstä.
- **Varmuus:** VARMA. **Ristiriita on itse aihe** — patsaan teksti vs.
  museon tieto. Kirjoita se juuri niin: monumentti sanoo yhtä, tutkimus
  toista. Artikkeli sanoo myös, että "often claimed to be the first
  zoological necropolis in the modern world" mutta muistuttaa
  Ashkelonin muinaisesta koirahautausmaasta — käytä muotoa
  "usein ensimmäiseksi kutsuttu", älä "maailman ensimmäinen".

### 4. Piiritetystä kaupungista kirjoitettiin ulos kyyhkyillä — ja mikrofilmi keksittiin siihen (ELÄINTÄKY)

Kun preussilaiset sulkivat Pariisin syyskuussa 1870, viimeiset
lennätinlangat katkaistiin 19.9. ja Seinen pohjassa kulkenut
salakaapeli löydettiin ja katkaistiin 27.9. Kaupunkiin päin ainoa
toimiva reitti oli kirjekyyhky. Kyyhkyt vietiin ulos
kuumailmapalloilla, ja valokuvaaja **René Dagron** — mikrofilmin
patentin haltija vuodesta 1859 — tarjoutui pienentämään viestit.
Sopimus allekirjoitettiin 11.11.1870: 15 frangia tuhatta merkkiä
kohti. Dagron sai kuvat pienenemään yli 40-kertaisesti; yksi filmi
painoi noin **0,05 grammaa**, ja yksi kyyhky kantoi niitä jopa
kaksikymmentä pyrstösulkiin sidotussa putkessa. Perillä filmi
asetettiin kahden lasilevyn väliin ja **heijastettiin taikalyhdyllä
seinälle**, josta viestit kirjoitettiin puhtaaksi. Saksalaiset
kouluttivat haukkoja pysäyttämään kyyhkyjä.

- **Paikka:** koko piiritetty Pariisi; kyyhkylakat keskustassa,
  vastapää Toursissa ja Poitiersissa.
- **Lähde:** en.wikipedia.org/wiki/René_Dagron (osio piirityksestä) ja
  en.wikipedia.org/wiki/Pigeon_post (osio "Siege of Paris").
- **Lainaus/perustelu:** "Dagron proposed to the authorities to use his
  microfilming process to carry the messages by carrier pigeons across
  German lines... a contract was signed on 11 November... Dagron was to
  be paid 15 francs per 1000 characters photographed." — "The microfilms
  so produced weighed approximately 0.05 grams each and a pigeon was
  able to carry up to 20 at a time." — "was then projected by magic
  lantern on the wall." — "the last overhead telegraph wires were cut
  on the morning of 19 September, and the secret telegraph cable in the
  bed of the Seine was located and cut on 27 September." — "the Germans
  having set the example by employing hawks against the Paris pigeons
  in 1870–71."
- **Kuva:** Commons **Pellicule du Journal Pigeons Voyageurs, Souvenir
  du Siège de Paris, 1870-1871. PH20110 (15 of 20).jpg** (5047×8008,
  CC0, valokuvaaja René Dagron, 1870–1871) — **Dagronin oma
  mikrofilmi**. Vaihtoehto samasta sarjasta: **(12 of 20).jpg**
  (5601×4375, CC0).
- **Varmuus:** VARMA — suoraan lähteestä. **EI KÄYTTÖÖN:** sama
  Pigeon post -artikkeli kumoaa erikseen laajalle levinneen väitteen,
  että haavoittuneita olisi evakuoitu palloilla ("this myth has been
  definitively disproven"). Älä sekoita palloposti ja
  haavoittuneiden kuljetus.

### 5. Maailman toiseksi vanhin eläintarha — ja talvi, jona sen norsut syötiin (ELÄINTÄKY, 1873-ANKKURI)

Jardin des Plantes'n eläintarha perustettiin vallankumouksen aikana
1794, suurelta osin Versailles'n hylätyn kuninkaallisen eläintarhan
eläimillä. Se on Wienin Schönbrunnin jälkeen maailman toiseksi vanhin
eläintieteellinen puutarha. Vuonna 1793 kansalliskokous oli määrännyt,
että yksityisten eksoottiset eläimet on luovutettava tai tapettava ja
täytettävä tieteen käyttöön — tutkijat päättivät toisin ja antoivat
niiden elää. Piirityksen talvena 1870–71 kaupungista loppui liha:
lokakuussa syötiin hevoset, marraskuussa teurastajat myivät koiraa ja
kissaa, sitten rottaa, ja lopulta vuoro tuli eläintarhalle. Myös
Pariisin ainoa norsupari, **Castor ja Pollux**, teurastettiin.
Kun isoisä käveli puutarhaan lokakuussa 1873, siitä oli kaksi ja puoli
vuotta.

- **Paikka:** Ménagerie du Jardin des Plantes, 48,8447°N, 2,3597°E
  (en-Wikipedia, coordinates).
- **Lähde:** en.wikipedia.org/wiki/Ménagerie_du_Jardin_des_plantes
  (johdanto ja perustamisosio) sekä
  en.wikipedia.org/wiki/Siege_of_Paris_(1870–1871), osio ruoasta.
- **Lainaus/perustelu:** "Founded in 1794, largely with animals brought
  from the royal zoo of the Palace of Versailles... it is the second
  oldest zoological garden in the world (after Tiergarten Schönbrunn)."
  — "exotic animals in private hands were to be donated to the
  Menagerie in Versailles or killed, stuffed and donated to the natural
  scientists... However, the scientists let the animals... live." —
  "Parisians turned first to horses in early-October... By mid-November
  ... butchers began offering dog and cat meat. People also turned to
  rats... Even Castor and Pollux, the only pair of elephants in Paris,
  were slaughtered for their meat."
- **Kuva:** Commons **Jardin des Plantes. La rotonde - dessin - Gaëtan
  Cathelineau - btv1b103030763 (1 of 2).jpg** (3440×2464, public
  domain, Gaëtan Cathelineau, 1821) — rotunda, jossa suuret eläimet
  pidettiin vuodesta 1808. Kevyempi vaihtoehto: **Promenade au Jardin
  des Plantes. Paris Musées 20230620204536 (cropped) elephant.jpg**
  (1483×1028, CC0).
- **Varmuus:** VARMA. **IKÄSOPIVUUS:** tämä on listan raskain täky.
  13+ kestää sen, mutta kirjoita se nälänhädän tosiasiana, älä
  ruokalistan kuriositeettina; en-artikkelin siteeraamat
  ravintolamenut (rottasalami, koiranreisi) on parempi jättää pois.
  Norsujen nimet riittävät — ne tekevät asiasta ihmisen kokoisen.

### 6. Taidemaalari kaadatti patsaan — ja valtio lähetti hänelle laskun (1873-ANKKURI)

Napoleon I:n pystyttämä Vendôme-pylväs oli valettu Austerlitzin
voiton muistoksi, ja sen kierteinen pronssipinta oli tehty vallatuista
tykeistä. Kommuuni päätti 12.4.1871 purkaa sen, ja **16.5.1871** pylväs
kaadettiin. Taidemaalari Gustave Courbet oli ehdottanut jo 4.9.1870,
että pylväs siirrettäisiin Invalidien pihaan, koska se "ylläpitää
ilmauksellaan sodan ja valloituksen ajatuksia". Kommuunin kukistuttua
Courbet sai kuusi kuukautta vankeutta ja 500 frangin sakon. Sitten tuli
jatko: **vuonna 1873** uusi presidentti MacMahon ilmoitti, että pylväs
rakennetaan uudelleen — ja laskun maksaa Courbet. Hän pakeni
Sveitsiin. Toukokuussa 1877 summa lyötiin lukkoon: **323 000 frangia,
10 000 frangia vuodessa 33 vuoden ajan.** Courbet kuoli 31.12.1877,
päivää ennen ensimmäisen erän eräpäivää. Kun isoisä kulki aukion ohi
lokakuussa 1873, keskellä oli tyhjä jalusta: pylväs pystytettiin
takaisin vasta 1874.

- **Paikka:** Place Vendôme, 1. kaupunginosa. 48,8675°N, 2,3294°E
  (en-Wikipedia, coordinates). fi-Wikipedia: **Place Vendôme**.
- **Lähde:** en.wikipedia.org/wiki/Place_Vendôme (osio kommuunista) ja
  en.wikipedia.org/wiki/Gustave_Courbet (osiot oikeudenkäynnistä ja
  maanpaosta).
- **Lainaus/perustelu:** "it was torn down on 16 May 1871, by decree of
  the Paris Commune" — "In 1873, the newly elected president of the
  Republic, Patrice de MacMahon, announced plans to rebuild the column,
  with the cost to be paid by Courbet. Unable to pay, Courbet went into
  a self-imposed exile in Switzerland" — "In May 1877, the state set the
  final cost of reconstructing the Vendôme Column at 323,000 francs for
  Courbet to repay in annual installments of 10,000 francs for the next
  33 years. On 31 December 1877, a day before the first installment was
  due, Courbet died" — "In 1874 meanwhile, the column was re-erected at
  the center of the Place Vendôme with a copy of the original statue on
  top."
- **Kuva:** Commons **Destruction de la colonne Vendôme, 1871,
  PH3076.jpg** (5778×3816, CC0, tuntematon valokuvaaja, 1871) —
  valokuva kaadetusta pylväästä. Vaihtoehto: **Franck, Colonne Vendôme,
  1871.jpg** (3470×2644, public domain, Franck, 1871).
- **Varmuus:** VARMA. **Ristiriita merkittävä:** Place Vendôme
  -artikkeli sanoo pylvään nousseen takaisin **1874**, Courbet-artikkeli
  puhuu vain summan lyömisestä lukkoon 1877. Vuosiluku 1874 on
  Place Vendôme -artikkelin; käytä sitä, mutta älä väitä tarkkaa
  kuukautta. Sama artikkeli mainitsee myös, että Karl Marx ennusti
  pylvään kaatumisen 1852 kirjoituksessaan — hyvä lisämauste, jos
  täkyyn halutaan vielä yksi käänne.

### 7. Marsalkka tuomittiin kuolemaan Versailles'ssa — ja kiipesi vuotta myöhemmin köyttä pitkin kalliolta mereen (1873-ANKKURI)

Ranskan tappio 1870 vaati syyllisen. Marsalkka François Achille Bazaine,
joka oli antautunut Metzissä 170 000 miehen kanssa, palasi
saksalaisvankeudesta ja **vaati itse** oikeudenkäyntiä maineensa
puhdistamiseksi. Sotaoikeus kokoontui Versailles'n Grand Trianonissa
**6.10.1873** — juuri kun isoisä oli Pariisissa. Puheenjohtajana istui
Aumalen herttua. Tuomio oli kuolema ja sotilasarvon menetys, ja lisäksi
Bazainen oli maksettava oikeudenkäynnin kulut, 300 000 frangia, mikä
olisi jättänyt perheen puille paljaille. Sama tuomioistuin allekirjoitti
välittömästi ja yksimielisesti armonanomuksen presidentille; MacMahon
muunsi tuomion kahdenkymmenen vuoden vankeudeksi. Bazaine suljettiin
Sainte-Marguerite-saaren linnakkeeseen — ja pakeni yön 9.–10.8.1874:
63-vuotias marsalkka sitoi pakettinarusta ja matkalaukkuhihnoista
köyden, kiinnitti sen vesikouruhahmoon ja laskeutui kalliota alas
veneeseen, jonka hänen vaimonsa oli tuonut Cannes'ista.

- **Paikka:** Grand Trianon, Versailles (48,8047°N, 2,1203°E,
  en-Wikipedia "Palace of Versailles"); pakopaikka Île
  Sainte-Marguerite Cannes'in edustalla.
- **Lähde:** en.wikipedia.org/wiki/François_Achille_Bazaine, osiot
  oikeudenkäynnistä ja vankeudesta.
- **Lainaus/perustelu:** "he formally requested and was granted a trial
  before a military court... which started the following year (6
  October 1873) under the presidency of the Duc D'Aumale in the Grand
  Trianon's Peristyle." — "The court unanimously sentenced Bazaine to
  'degradation and death', and to pay the costs of the enormous trial
  (300,000 francs)" — "they immediately and unanimously signed a
  petition for 'Executive Clemency'" — "His sentence was commuted then
  to 20 years in prison... by the new president, Marshal MacMahon" —
  "During the night of 10 August 1874, using parcel rope... and baggage
  straps which he knotted into a rope, the 63-year-old attached one end
  to his body and tied the other end to a gargoyle and climbed down the
  300 foot cliffs to a boat, which his wife had brought out from
  Cannes."
- **Kuva:** Commons **Procès Bazaine - Les témoins... -
  btv1b102134148.jpg** (1184×1213, public domain, 1873) —
  aikalaispiirros oikeudenkäynnin todistajista. **HUOM:** kuva on
  pieni; tarkista riittääkö se pelin kuvakokoihin.
- **Varmuus:** VARMA päivämääristä ja tuomiosta. **Kiistanalaisuus on
  kerrottava:** artikkeli lainaa aikalaisarviota, jonka mukaan mikään
  oikeudenkäynnissä ei osoittanut Bazainea petturiksi, ja kutsuu häntä
  syntipukiksi ("bouc émissaire"). Kirjoita siis "tuomittiin", älä
  "petti maansa". Bazaine kuoli 1888 — ei elävä henkilö.
  **RISTIRIITA lähteen sisällä:** artikkelissa esiintyy sekä "During
  the night of 9–10 August 1874" että "During the night of 10 August
  1874"; käytä muotoa "elokuussa 1874".

### 8. Kaupungin keskellä seisoi yksitoista vuotta poltettu palatsi (1873-ANKKURI)

Tuileries'n palatsi seisoi Louvren länsipäässä ja oli useimpien Ranskan
hallitsijoiden Pariisin-asunto Henrik IV:stä Napoleon III:een.
23.5.1871 kaksitoista miestä sytytti sen palamaan petrolilla, tervalla
ja tärpätillä; tuli paloi 48 tuntia ja kupoli räjäytettiin. Seinät
jäivät kuitenkin pystyyn, ja **rauniot seisoivat paikallaan yksitoista
vuotta** — eli isoisä käveli lokakuussa 1873 Louvren ohi ja näki
palatsin tyhjät ikkuna-aukot taivasta vasten. Kunnostaminen olisi ollut
mahdollista, mutta 1882 päätettiin purkaa. Purku alkoi helmikuussa 1883
ja päättyi 30.9.1883. Kivet myytiin: yrittäjä Achille Picart kaupitteli
niitä matkamuistoina, ja osista rakennettiin Korsikalle kokonainen
palatsi, Château de la Punta. Palasia on nykyään Berliinissä,
Italiassa ja Quitossa asti.

- **Paikka:** Tuileries'n puutarhan itäpää, 48,8622°N, 2,3325°E
  (en-Wikipedia "Tuileries Palace", coordinates).
- **Lähde:** en.wikipedia.org/wiki/Tuileries_Palace, osiot
  "Destruction" ja "Demolition".
- **Lainaus/perustelu:** "On 23 May 1871... 12 men under the orders of
  the Commune's former chief military commander Jules Bergeret set the
  Tuileries on fire using petroleum, liquid tar, and turpentine. The
  fire lasted 48 hours" — "The ruins of the Tuileries stood on the site
  for 11 years. Although the roofs and the inside of the palace had
  been utterly destroyed by the fire, the stone walls of the palace
  remained intact and restoration was possible." — "The demolition was
  started in February 1883 and was completed on 30 September 1883. Bits
  of stone and marble from the palace were sold by a private
  entrepreneur, Achille Picart, as souvenirs, and even to build a palace
  in Corsica, near Ajaccio, the Château de la Punta."
- **Kuva:** Commons **Vue des Tuileries après l'incendie de 1871,
  PH83415.jpg** (3000×2285, CC0, Henri Godefroy, otettu 1871–1883) —
  **juuri se näkymä, jonka isoisä olisi nähnyt**. Sarjassa on useita
  saman kuvaajan otoksia (PH82861, PH83418, PH83414, PH82862), kaikki
  CC0.
- **Varmuus:** VARMA. Sopii pariksi täylle 6: molemmat ovat
  "1873 = raunioiden vuosi" -kulmasta, ja niissä on aikalaiskuva.

### 9. Basilika, josta äänestettiin — ja jonka alle jouduttiin kaivamaan 83 kaivoa (1873-ANKKURI)

Sacré-Cœur on pelissä jo nähtävyysjuttuna, mutta sen tarina alkaa
tarkalleen isoisän matkavuonna. Kansalliskokous hyväksyi hankkeen
**heinäkuussa 1873**; virallisessa perustelussa sanottiin, että
"oli tarpeen pyyhkiä pois tällä sovitustyöllä ne rikokset, jotka ovat
kruunanneet surumme". Montmartren huippu valittiin, koska osa maasta
oli kunnan ja hanke julistettiin kansalliseksi eduksi. Kirkon
peruskiveä ei laskettu vielä pitkään aikaan: mäki oli täynnä vanhoja
kipsilouhoksia, joten alle piti kaivaa **83 kaivoa, kukin 30 metriä
syvä**, ja täyttää ne kivellä ja betonilla maanalaisiksi pilareiksi.
Seitsemän miljoonan frangin rahat oli käytetty ennen kuin maan päällä
näkyi mitään. Vuonna 1882 Clemenceaun johtama vasemmisto yritti
pysäyttää työn, mutta hanke oli edennyt niin pitkälle, että
peruuttaminen olisi maksanut kaksitoista miljoonaa.

- **Paikka:** Montmartre, 18. kaupunginosa. (Artikkelin
  `coordinates`-kysely ei palauttanut koordinaatteja Sacré-Cœurille
  tässä haussa — sijainti kuvattava sanallisesti tai haettava
  erikseen.)
- **Lähde:** en.wikipedia.org/wiki/Sacré-Cœur,_Paris, osiot sijainnista,
  rakentamisesta ja vastustuksesta.
- **Lainaus/perustelu:** "In July 1873, the proposal was finally
  brought forward and approved in the National Assembly with the
  official statement that 'it was necessary to efface by this work of
  expiation the crimes which have crowned our sorrows.'" — "The
  groundbreaking for the new church finally took place in 1875." —
  "Eighty-three wells, each thirty meters deep, had to be dug under the
  site and filled with rock and concrete to serve as subterranean
  pillars supporting the basilica." — "faced with enormous liabilities
  of twelve million francs from project cancellation, the government
  had to allow the construction to proceed."
- **Kuva:** Commons **Louis-Émile Durandelle, Construction du
  Sacré-Cœur, 1882.jpg** (5297×3400, public domain, Louis-Émile
  Durandelle, 10.3.1882) — työmaa yhdeksän vuotta äänestyksen jälkeen.
- **Varmuus:** VARMA. **Päällekkäisyys:** nahtavyysjutut.js kertoo jo
  arkkitehtikilpailun, travertiinin ja Savoyarde-kellon — tämä täky ei
  toista niitä, vaan kertoo äänestyksen ja perustukset. **Sävy:**
  lainaus "rikoksista, jotka ovat kruunanneet surumme" viittaa
  kommuuniin; kerro se sitaattina ja historiallisena tosiasiana, älä
  ota kantaa siihen, kenen rikoksista oli kyse (Perustuslaki 3).

### 10. Kuuden miljoonan vainajan luolasto — ja isoisä olisi päässyt sisään kerran kuussa

Pariisin katakombit ovat vanhoja kivilouhoksia, joihin siirrettiin
kaupungin ylitäysien hautausmaiden luut: nykyään siellä on yli **kuusi
miljoonaa** ihmistä. Siirto alkoi 1788 öisinä peitettyjen vaunujen
kulkueina. Kaivosinsinööri Héricart de Thury järjesti 1810-luvulla
kallot ja reisiluut kuvioiksi ja lisäsi kiveen hakatut varoitukset;
sisäänkäynnin yllä lukee *"Arrête! C'est ici l'empire de la Mort"*.
Yleisö on käynyt siellä alusta asti — ensimmäisiä vierailijoita oli
Artois'n kreivi 1787 — mutta pääsy on vaihdellut: neljä kertaa
vuodessa vuodesta 1850, **kerran kuussa vuodesta 1867**, ja kahdesti
kuussa (kuukauden ensimmäisenä ja kolmantena lauantaina) vuodesta
1874. Isoisä olisi siis lokakuussa 1873 saanut yhden mahdollisuuden
kuukaudessa — ja seuraavana vuonna kaksi.

- **Paikka:** Barrière d'Enfer / Place Denfert-Rochereau, 14.
  kaupunginosa. 48,8339°N, 2,3322°E (en-Wikipedia, coordinates).
  fi-Wikipedia: **Pariisin katakombit**.
- **Lähde:** en.wikipedia.org/wiki/Catacombs_of_Paris, johdanto sekä
  osiot renovoinnista ja vierailuista.
- **Lainaus/perustelu:** "underground ossuaries in Paris, France, which
  hold the remains of more than six million people" — "from 1788,
  nightly processions of covered wagons transferred remains" — "As one
  visits the catacombs, a sign above reads Arrête! C'est ici l'empire de
  la Mort" — "The catacombs were open again for four visits a year from
  1850, and public demand caused the government to allow monthly visits
  from 1867, bi-weekly visits on the first and third Saturday of each
  month from 1874."
- **Kuva:** Commons **L'ossuaire. Catacombes de Paris, G.38836.jpg**
  (1923×2615, CC0, tekijä tuntematon, ajoittamaton) — vanha painokuva
  ossuaariosta. Iso nykyvaihtoehto: **Catacumbas, París, Francia,
  2022-11-01, DD 117-119 HDR.jpg** (5775×8662, CC BY-SA 4.0, Diego
  Delso, 2022).
- **Varmuus:** VARMA. **RISTIRIITA lähteen sisällä:** johdanto sanoo
  ossuaarion avautuneen yleisölle "from 1874", kun taas
  vierailuhistorian osio kertoo säännöllisistä käynneistä jo 1850- ja
  1867-luvuilta. Kerro aukiolojen tihentymisenä, älä
  "avattiin 1874". **Päällekkäisyys:** katakombit mainitaan jo
  europe-questions.js:n kysymyksessä — tämä täky antaa aiheelle uuden,
  ajallisen kulman eikä toista kysymyksen tietoa.

### 11. Hautausmaa, jolle kukaan ei halunnut — kunnes sinne muutettiin kaksi kuuluisaa vainajaa

Kun Père-Lachaise avattiin 1804, se oli kaupungin laidalla ja
pariisilaisten mielestä väärässä paikassa: ensimmäisenä vuonna sinne
haudattiin **13 ihmistä**. Hallinto keksi markkinointikeinon. Vuonna
1817 järjestettiin suuri seremonia, jossa hautausmaalle siirrettiin
Jean de La Fontainen ja Molièren jäännökset — ja pian perään toinen
näytös, jossa tuotiin **väitetyt** Pierre Abélardin ja Héloïsen
jäännökset sekä hautakatos, joka koottiin puretun Nogent-sur-Seinen
luostarin paloista. Se tepsi: vuonna 1812 hautauksia oli jo 833.
Abélardin ja Héloïsen haudalle jätetään yhä kirjeitä — rakastuneilta
ja niiltä, jotka toivovat rakastuvansa.

- **Paikka:** Père-Lachaise, 20. kaupunginosa. 48,86°N, 2,395°E
  (en-Wikipedia, coordinates). fi-Wikipedia: **Père-Lachaise**.
- **Lähde:** en.wikipedia.org/wiki/Père_Lachaise_Cemetery, osio
  hautausmaan alkuvuosista.
- **Lainaus/perustelu:** "In 1804, the Père Lachaise contained only 13
  graves. The next year there were 44 burials... and 833 during 1812.
  Consequently, the administrators devised a marketing strategy to
  improve the cemetery's stature: in 1817, with great fanfare, they
  organised the transfer of the remains of Jean de La Fontaine and
  Molière to the new resting place. Then, in another great spectacle,
  the purported remains of Pierre Abélard and Héloïse d'Argenteuil were
  also transferred... By tradition, lovers or lovelorn singles leave
  letters at the crypt."
- **Kuva:** Commons **Haigh - Tomb of Abelard and Heloise 01.jpg**
  (2300×3343, public domain, A. C. Pugin / Charles Heath, 1831) —
  aikalaiskaiverrus. Nykyvaihtoehto: **The Tomb of Héloïse and Abélard,
  Père Lachaise cemetery, Paris July 2015.jpg** (5982×3984, CC0, Joe
  deSousa, 2015).
- **Varmuus:** VARMA. **Sanamuoto:** lähde sanoo itse "purported
  remains" Abélardista ja Héloïsesta — käytä sanaa "väitetyt", älä
  "jäännökset". Kommuunin muuri (Mur des Fédérés) on samalla
  hautausmaalla ja liittyy vuoteen 1871, mutta sitä EI tarkistettu
  tässä haussa; älä lisää sitä ilman uutta lähdettä.

### 12. Puisto, jossa on hirsipuun, kaatopaikan ja kipsilouhoksen pohja

Buttes-Chaumont'n kukkulaa vältettiin vuosisatoja. Siellä sijaitsi
**Montfauconin hirsipuu**, jossa teloitettujen ruumiita pidettiin
näytteillä 1200-luvulta vuoteen 1760. Vallankumouksen jälkeen paikasta
tuli kaatopaikka, sitten hevosenruhojen paloittelupaikka ja lopulta
jätevesivarasto; puiston rakentaja Alphand kirjoitti, että "paikka
levitti tartuntahöyryjä paitsi naapurustoon, myös tuulen suuntaa
seuraten koko kaupunkiin". Sen lisäksi mäessä oli kipsilouhos, josta
löytyi eoseenikauden nisäkäsfossiileja, joita Georges Cuvier tutki.
Haussmann valitsi juuri tämän paikan uudeksi puistoksi. Työ kesti
kolme vuotta: kaksi vuotta pelkkään maan muotoiluun, oma rautatie
kuljettamaan **200 000 kuutiometriä** multaa, tuhat työmiestä,
räjähteitä kallion veistämiseen ja pumput, jotka nostivat vettä
vesiputoukseksi. Puisto avattiin **1.4.1867** — isoisän käydessä se oli
kuuden vuoden ikäinen.

- **Paikka:** Parc des Buttes Chaumont, 19. kaupunginosa. 48,8803°N,
  2,3828°E (en-Wikipedia, coordinates).
- **Lähde:** en.wikipedia.org/wiki/Parc_des_Buttes_Chaumont, osiot
  historiasta ja rakentamisesta.
- **Lainaus/perustelu:** "it was the site of the Gibbet of Montfaucon,
  where from the 13th century until 1760, the bodies of hanged
  criminals were displayed after their executions. After the 1789
  Revolution, it became a refuse dump, and then a place for cutting up
  horse carcasses and a depository for sewage." — "'the site spread
  infectious emanations not only to the neighbouring areas, but,
  following the direction of the wind, over the entire city.'" —
  "Another part of the site was a quarry that produced limestone and
  gypsum... The quarry also yielded Eocene mammal fossils, including
  Palaeotherium, which were studied by Georges Cuvier." — "Two years
  were required simply to terrace the land. Then a railroad track was
  laid to bring in cars carrying two hundred thousand cubic meters of
  topsoil. A thousand workers remade the landscape" — "The park opened
  on 1 April 1867."
- **Kuva:** Commons **Gezicht op de Temple de la Sibylle in het Parc
  des Buttes-Chaumont in Parijs, RP-F-F05476.jpg** (4280×2090, CC0,
  Rijksmuseum, n. 1867–1880) — **aikalaisvalokuva juuri isoisän
  vuosikymmeneltä**. Nykyvaihtoehto: **Temple de la Sibylle.jpg**
  (5990×3966, CC BY-SA 4.0, FreCha, 2026).
- **Varmuus:** VARMA. **IKÄSOPIVUUS:** hirsipuu on faktana selvä ja
  kuuluu 13+ -aineistoon; kerro se yhdellä lauseella ilman
  yksityiskohtia teloituksista.

### 13. Pariisin uusin silta on sen vanhin — ja sen kaiteilla irvistää 381 kasvoa

Pont Neuf ("uusi silta") on Seinen vanhin yhä seisova silta.
Se sai nimensä siitä, että se oli ensimmäinen kivisilta Pariisissa
**ilman talorivejä päällä** — Henrik IV kielsi talot, koska ne olisivat
peittäneet näkymän Louvreen. Sillassa oli sen sijaan jotain muuta uutta:
jalkakäytävät, jotka suojasivat kävelijää mudalta ja hevosilta.
Sivuja kiertää **381 kivinaamiota**, jokainen erilainen: metsän ja
niityn jumaluuksia, satyyreja ja metsänhaltijoita. Alkuperäiset
liitetään renessanssikuvanveistäjä Germain Piloniin; kun silta
rakennettiin uudelleen 1851–54, naamiot korvattiin 1800-luvun tekijöiden
kopioilla, ja osa alkuperäisistä siirtyi museoihin. Sillan keskellä
seisovan Henrik IV:n ratsastajapatsaan sisään on lisäksi suljettu neljä
laatikkoa: kuninkaan elämäkerta, 1600-luvun pergamentti alkuperäisestä
patsaasta, kuvaus uuden tilaamisesta ja lista lahjoittajista. Ja
1600-luvun Pariisissa sillalla oli oma hirsipuunsa.

- **Paikka:** Pont Neuf, Île de la Cité. 48,8575°N, 2,3417°E
  (en-Wikipedia, coordinates).
- **Lähde:** en.wikipedia.org/wiki/Pont_Neuf, johdanto sekä osiot
  rakentamisesta, mascaroneista ja patsaasta.
- **Lainaus/perustelu:** "The Pont Neuf... is the oldest standing
  bridge across the river Seine in Paris" — "It was the first stone
  bridge in Paris not to support houses in addition to a thoroughfare,
  and was also fitted with pavements protecting pedestrians from mud
  and horses" — "The mascarons are 381 stone masks, each different from
  the others" — "Inside the statue, the new sculptor François-Frédéric
  Lemot put four boxes, containing a history of the life of Henry IV, a
  17th-century parchment... and a list of people who contributed" —
  "For a long time, the bridge even had its own gallows."
- **Kuva:** Commons **Mascaron du Pont Neuf, S3053(4).jpg** (7860×5400,
  CC0, tuntematon kuvanveistäjä) — yksi naamio suurena. Samassa
  sarjassa useita CC0-kuvia (S3053, S3055BIS, S3056BIS).
- **Varmuus:** VARMA. Aarrepelin kannalta paras yksityiskohta on
  patsaan sisään suljetut laatikot — vahvistettu lähteessä.

### 14. Pariisi mittaa tulvansa yhden sotilaan patsaan mukaan — vaikkei se ole mittari

Pont de l'Alma valmistui 1856, ja sen pilareihin asetettiin neljä
sotilaspatsasta. Kun silta uusittiin 1970–74, kolme siirrettiin muualle
ja yksi jätettiin: **Zouave**, Georges Diébolt'n veistämä
zuaavisotilas. Pariisilaiset alkoivat lukea Seinen pintaa sen mukaan:
kun vesi nousee jalkoihin, rantakäytävät suljetaan; kun se yltää
reisiin, joki ei ole enää kuljettavissa. Vuoden 1910 suurtulvassa vesi
oli **olkapäissä**. Kaunis yksityiskohta on se, ettei tällä ole
virallista asemaa lainkaan: viranomaiset mittasivat pintaa Pont de la
Tournellestä ja vuodesta 1868 Pont d'Austerlitzistä. Zouave on siis
mittari, jonka kaupunki valitsi itse.

- **Paikka:** Pont de l'Alma, 8./16. kaupunginosan rajalla. 48,8635°N,
  2,3018°E (en-Wikipedia, coordinates).
- **Lähde:** en.wikipedia.org/wiki/Pont_de_l'Alma, osio "The Zouave
  statue and flooding".
- **Lainaus/perustelu:** "The general public took the original bridge as
  a measuring instrument for water levels... access to the footpaths by
  the river embankments usually were closed when the Seine's level
  reached the feet of The Zouave; when the water hit his thighs, the
  river was unnavigable. During the great flood of the Seine in 1910,
  the level reached his shoulders. The French Civil Service used the
  Pont de la Tournelle, not the Pont de l'Alma, to gauge flood levels,
  and since 1868 uses the Pont d'Austerlitz."
- **Kuva:** Commons **Zouave du Pont de l'Alma, février 1924.jpg**
  (1300×824, public domain, Agence Meurisse) — tulva 1924.
  Nykyvaihtoehto: **26-Jan-2018 Crue de la Seine - Pont de l'Alma - Le
  Zouave - Paris.jpg** (2250×3000, CC BY-SA 4.0, Jmdigne, 2018) —
  **SILMÄTARKISTUS** (kaupunkikuva, mahdollisia ohikulkijoita).
- **Varmuus:** VARMA. **HUOM:** silta on sama, jonka tunnelissa
  Diana, Walesin prinsessa kuoli 1997. Sitä EI pidä käyttää eikä
  mainita — kunnioitussääntö, ja tapaus on lähiomaisten kannalta yhä
  elävä.

### 15. Pariisin vanhin kivitalo rakennutettiin miehen rahoilla, jonka uskottiin osanneen tehdä kultaa

Osoitteessa 51 rue de Montmorency seisoo Pariisin vanhin kivitalo,
rakennettu **1407**. Seinässä on vanha kaiverrus, joka pyytää talon
porstuassa asuvia kyntömiehiä ja -naisia lukemaan joka päivä yhden
Isä meidän -rukouksen ja yhden Ave Marian syntisten puolesta. Talon
rakennutti kirjuri **Nicolas Flamel** (k. 1418). Hänen testamenttinsa
osoittaa, että hän oli antelias mutta ei tavattoman rikas — eikä
mikään aikalaislähde kerro hänen harrastaneen alkemiaa. Maine syntyi
vasta 200 vuotta kuoleman jälkeen: 1612 julkaistiin hänen nimissään
kirja, jonka mukaan hän oli ratkaissut viisasten kiven arvoituksen ja
tehnyt ensin hopeaa 1382, sitten kultaa. Isaac Newtonin muistiinpanoissa
puhutaan "Flammelin lohikäärmeistä", Victor Hugo mainitsee hänet
Notre-Damen kellonsoittajassa — ja talo seisoo yhä paikallaan.

- **Paikka:** 51 rue de Montmorency, 3. kaupunginosa. (Artikkelilla ei
  ole koordinaatteja; osoite on artikkelissa.)
- **Lähde:** en.wikipedia.org/wiki/Nicolas_Flamel, osiot elämästä ja
  "Posthumous reputation as an alchemist".
- **Lainaus/perustelu:** "One of Flamel's houses still stands in Paris,
  at 51 rue de Montmorency. It is the oldest stone house in the city.
  There is an old inscription on the wall, which states, 'We, plowmen
  and women living at the porch of this house, built in 1407, are
  requested to say every day an "Our Father" and an "Ave Maria"...'" —
  "His will, dated 22 November 1416, indicates that he was generous but
  that he did not have the extraordinary wealth of later alchemical
  legend. There is no indication that the real Flamel of history was
  involved in alchemy, pharmacy or medicine." — "An alchemical book,
  published in Paris in 1612... producing first silver in 1382 and then
  gold."
- **Kuva:** Commons **Vieille maison du XVè siècle, maison de Nicolas
  Flamel, dite maison du grand pignon, 51 rue de Montmorency,
  D.3493.jpg** (3933×3008, CC0, Georges-Henri Manesse) — piirros
  talosta. Vanha valokuva: **Maison dite de Nicolas Flamel - Façade sur
  rue, ensemble - ... - APMH00015945.jpg** (375×512, public domain,
  Jean-Eugène Durand, ennen 1912) — pieni, vain varalle.
- **Varmuus:** VARMA sekä talosta että siitä, että alkemistimaine on
  jälkikäteinen. **Tämä on täyn ydin:** älä kerro Flamelia
  alkemistina vaan miehenä, josta *tehtiin* alkemisti 200 vuotta
  myöhemmin. Se on rehellisempi ja parempi tarina — ja sopii peliin,
  jossa etsitään aarteita, joita ei ehkä ole.

### 16. Purkumiehet löysivät seinästä 3 210 kultarahaa — ja yksi luuli niitä kuparirojuksi

24.5.1938 purettiin taloja osoitteissa 51 ja 53 rue Mouffetard. Numero
53:n seinästä löytyi kätkö: kangaskääröihin käärittyjä
kultakolikkokääröjä, yhteensä **3 210 kultarahaa** Ludvig XV:n ajalta.
Yksi työmiehistä otti muutaman ja luuli niitä arvottomiksi
kuparirahoiksi — hän antoi ne pojalleen marmorikuulien tilalle.
Kätköstä löytyi myös testamentti: kuninkaan sihteeri Louis Nivelle oli
testamentannut rahat tyttärelleen Anne-Louise-Claudelle, mutta kuoli
äkilliseen sydänkohtaukseen ehtimättä kertoa tyttärelleen, missä ne
olivat. Löytö jaettiin kolmeen osaan: työmiehille, Pariisin
kaupungille sekä talon omistajalle ja Anne Nivellen **82 todistetulle
perilliselle**.

- **Paikka:** 53 rue Mouffetard, 5. kaupunginosa. (Artikkelilla ei ole
  koordinaatteja; osoite on artikkelissa.)
- **Lähde:** en.wikipedia.org/wiki/Treasure_of_Rue_Mouffetard, koko
  lyhyt artikkeli.
- **Lainaus/perustelu:** "a collection of 3210 gold coins discovered by
  chance in 1938... The coins date to the reign of Louis XV." — "On May
  24, 1938, workers were demolishing buildings at 51 and 53, Rue
  Mouffetard... they noticed a hiding place in a wall at the building at
  No. 53." — "At first, a worker who had taken some of the coins
  believed them to be worthless copper coins, and gave them to his son
  to play marbles." — "Louis Nivelle had died of a sudden heart attack
  before telling his daughter about the coins." — "the 82 attested
  heirs of Anne Nivelle."
- **Kuva:** Commons **Double Louis-d'or of Louis XV of France, 1750 MET
  139186.jpg** (1992×1992, CC0, Joseph-Charles Roettiers, 1759) —
  **HUOM: tämä ei ole itse aarre**, vaan saman ajan ja hallitsijan
  kultaraha. Kuvateksti on kirjoitettava niin, ettei se väitä muuta.
- **Varmuus:** VARMA lähteen mukaan; artikkeli on kuitenkin **hyvin
  lyhyt** (n. 1 600 merkkiä) eikä nimeä lähteitään laajasti. Jos tämä
  viedään peliin, se kannattaa ristiintarkistaa toisesta lähteestä.
  Aarrepelille tämä on lähes liian osuva täky — kirjaimellisesti
  seinästä löytynyt aarre samassa kaupungissa, jossa isoisä kulki.

### 17. Kun isoisä lähti Pariisista, kolmekymmentä taiteilijaa oli perustamassa omaa näyttelyään (1873-ANKKURI)

Ranskan taide-elämää hallitsi Salon, ja hylätyille tarkoitettua omaa
näyttelyä oli anottu turhaan 1867 ja 1872. **Joulukuussa 1873** —
kaksi kuukautta isoisän Pariisin-käynnin jälkeen — Monet, Renoir,
Pissarro, Sisley, Cézanne, Berthe Morisot, Degas ja joukko muita
perustivat oman yhdistyksen, *Société anonyme des artistes peintres,
sculpteurs, graveurs*, esittääkseen työnsä itse. Jäseneksi liittyvän
piti luopua Salonista. Ensimmäinen näyttely pidettiin huhtikuussa 1874
valokuvaaja Nadarin ateljeessa, ja mukana oli kolmekymmentä taiteilijaa.
Kriitikko Louis Leroy ivasi Monet'n maalausta *Impression, soleil
levant* ja otsikoi juttunsa "Impressionistien näyttely". Pilkkanimi jäi
— ja taiteilijat ottivat sen itse käyttöön.

- **Paikka:** Nadarin ateljee, 35 boulevard des Capucines, 2.
  kaupunginosa. (Osoite EI ole tässä haetussa Impressionism-artikkelin
  tekstissä — se on yleistieto, joka on tarkistettava erikseen ennen
  peliin vientiä. Artikkeli sanoo vain "at the studio of the
  photographer Nadar".)
- **Lähde:** en.wikipedia.org/wiki/Impressionism, osio "The First
  Impressionist Exhibition 1874".
- **Lainaus/perustelu:** "Artists' petitions requesting a new Salon des
  Refusés in 1867, and again in 1872, were denied. In December 1873,
  Monet, Renoir, Pissarro, Sisley, Cézanne, Berthe Morisot, Edgar Degas
  and several other artists founded the Société anonyme des artistes
  peintres, sculpteurs, graveurs, etc. ... Members of the association
  were expected to forswear participation in the Salon." — "In total,
  thirty artists participated in their first exhibition, held in April
  1874 at the studio of the photographer Nadar." — "Derisively titling
  his article 'The Exhibition of the Impressionists'..."
- **Kuva:** Commons **Monet - Impression, Sunrise.jpg** (5773×4478,
  public domain, Claude Monet, **1872**) — maalaus on Commonsin
  tietojen mukaan vuodelta 1872, siis maalattu ennen isoisän matkaa ja
  esillä vasta sen jälkeen.
- **Varmuus:** VARMA yhdistyksen perustamisesta ja näyttelystä.
  **Sama Nadar** rakensi piirityksen aikaiset kuumailmapallolähdöt —
  yhteys täkyyn 4 on olemassa, mutta sitä EI vahvistettu tässä haussa,
  joten älä kirjoita sitä auki ilman uutta lähdettä.

### 18. Englantilainen jäi piiritettyyn kaupunkiin — ja maksoi sen jälkeen pariisilaisille juomaveden

Richard Wallace (1818–1890) peri isänsä omaisuuden elokuussa 1870,
kuukausi ennen piirityksen alkua. Hän olisi voinut siirtyä
maakartanoihinsa, mutta jäi Pariisin-huvilaansa, "jotta olisi
Pariisissa silloin kun häntä tarvitaan". Piiritys ja kommuuni
tuhosivat vesijohtoja, ja veden hinta nousi; köyhien juoma vesi tuli
usein Seinestä, johon valui katujen ja viemärien vedet, joten oli
turvallisempaa juoda olutta, joka oli lähes yhtä halpaa. Wallace
suunnitteli ja maksoi kaupungille valurautaiset juomavesikaivot, joiden
veistoksellisen muodon toteutti nantesilainen kuvanveistäjä
Charles-Auguste Lebourg: kahdeksankulmaisen jalustan päällä neljä
karyatidia selät vastakkain, kupoli ja siitä valuva ohut vesisuihku.
Kaivoissa oli kaksi tinattua rautamukia ketjuissa; ne poistettiin
hygieniasyistä vasta 1952. Ne ovat yhä kaupungissa — ja yhä ilmaisia.

- **Paikka:** ympäri Pariisia, vilkkaimmilla jalkakäytävillä;
  paikat valitsi kaupunki, käytännössä vesi- ja viemärijohtaja
  Eugène Belgrand.
- **Lähde:** en.wikipedia.org/wiki/Wallace_fountain, osiot Wallacesta,
  taustasta ja malleista.
- **Lainaus/perustelu:** "Having inherited a large fortune from his
  father in August 1870, he decided that all Parisians should profit
  from it" — "Wallace's devotion led him to remain in his Parisian villa
  even as the city was besieged... so as to be in Paris when he was
  needed." — "As a result of the siege of Paris and the Commune episode,
  many aqueducts had been destroyed, and the price of water... increased
  considerably... it was safer to drink beer or other alcoholic
  beverages, which were almost as cheap as water." — "two tin-plated,
  iron cups attached to the fountain by a small chain... These cups were
  removed in 1952."
- **Kuva:** Commons **Sir Richard Wallace drinking fountain, Paris May
  2014.jpg** (2946×4572, CC BY 2.0, David McSpadden, 2014).
- **Varmuus:** VARMA taustasta ja rakenteesta. **EI VAHVISTETTU:**
  laajalti toistettu vuosiluku 1872 ensimmäisten kaivojen
  pystyttämiselle EI löydy tästä artikkelista. Ainoa artikkelin antama
  1870-luvun päivämäärä on **6.10.1873**, jolloin toinen hyväntekijä,
  Daniel Osiris, tilasi kuusi suurta mallia Bordeaux'hun — ei siis
  Pariisiin. Älä väitä vuotta; sano "piirityksen jälkeisinä vuosina".

---

## Isoisän Pariisi lokakuussa 1873 — mitä hän olisi nähnyt

Kaikki alla oleva on tarkistettu edellä nimetyistä artikkeleista.

- **Tyhjä jalusta Place Vendômella.** Pylväs kaadettiin 16.5.1871 ja
  pystytettiin takaisin vasta 1874 (täky 6).
- **Poltettu Tuileries'n palatsi keskellä kaupunkia.** Rauniot seisoivat
  1871–1883 (täky 8).
- **Kaupungintalon työmaa.** Hôtel de Ville paloi 23.–24.5.1871 ja sen
  mukana lähes koko kaupungin arkisto ennen vuotta 1860; jälleenrakennus
  oli juuri alkamassa. **RISTIRIITA:** sama en-artikkeli sanoo sekä
  "rebuilt... between 1874 and 1882" että "Reconstruction of City Hall
  lasted from 1873 through 1892". Käytä muotoa "1870-luvun alussa
  alkanut jälleenrakennus", älä yksittäistä vuosilukua.
  (en.wikipedia.org/wiki/Hôtel_de_Ville,_Paris)
- **Uusi presidentti.** Thiers erosi toukokuussa 1873, ja
  kansalliskokouksen rojalistienemmistö valitsi marsalkka MacMahonin
  presidentiksi; **9.11.1873** hänelle myönnettiin seitsemän vuoden
  toimikausi. Hallitus ajoi "moraalisen järjestyksen" politiikkaa.
  (en.wikipedia.org/wiki/Patrice_de_MacMahon)
- **Keisari oli kuollut samana vuonna.** Napoleon III kuoli maanpaossa
  Britanniassa **9.1.1873**. (en.wikipedia.org/wiki/Napoleon_III)
- **Sotaoikeus Versailles'ssa.** Bazainen oikeudenkäynti alkoi Grand
  Trianonissa **6.10.1873** — tasan isoisän kuukautena (täky 7).
- **Basilikasta äänestettiin heinäkuussa 1873**, mutta Montmartren
  huipulla ei näkynyt vielä mitään: peruskivi laskettiin 1875 (täky 9).
- **Oopperatalo oli keskeneräinen.** Palais Garnier avattiin vasta 1875
  (nahtavyysjutut.js kertoo tämän jo; Place Vendôme -artikkeli
  vahvistaa "the opening in 1875 of the Palais Garnier").
- **Katakombeihin pääsi kerran kuussa** (täky 10).
- **Eiffel-tornia, Sacré-Cœuria, metroa tai Orsayn asemaa ei ollut.**
  Nämä kaikki ovat pelissä jo — ja kaikki ovat isoisän matkan jälkeen.
  Tämä on hyvä kärki koko fokusmaalle: *pelaajan tuntema Pariisi on
  melkein kokonaan nuorempi kuin päiväkirja.*
- **Kaksi kuukautta myöhemmin** perustettiin impressionistien yhdistys
  (täky 17).

---

## Varapenkki (tarkistettu, ei mahtunut listalle)

- **Viemärikierrokset.** en.wikipedia.org/wiki/Paris_sewers vahvistaa,
  että Belgrand rakensi 1855 alkaen järjestelmän, jossa kaltevuus on
  3 cm/metri, että käytössä oli erikoisveneitä ja -vaunuja puhdistukseen
  ja että "Tours of the sewage system have been popular since the
  1800s". **EI VAHVISTETTU** usein toistettu vuosiluku 1867
  ensimmäisille yleisökierroksille — siksi tämä jäi varapenkille.
  Viemärimuseon sisäänkäynti on Pont de l'Alman luona, eli sama paikka
  kuin täky 14.
- **Pariisin observatorio ja Le Verrier.** Artikkelin johtajaluettelo
  antaa Charles-Eugène Delaunayn kaudeksi 1870–1873, ja samassa
  artikkelissa mainitaan, että Marseillen observatorio irtautui
  Pariisista 1873. Aineksia on, mutta selkeää koukkua ei syntynyt tässä
  erässä.
- **Quartier-tason kohteet** (Passage des Panoramas, Petite Ceinture,
  Bièvre-joki, Deyrollen eläintäyttämö): ei haettu tässä erässä.

## Hylätyt / tarkistuksessa kaatuneet

1. **Notre-Damen katolla asuvat mehiläiset.** Haettu artikkeli
   "Notre-Dame fire" (22 145 merkkiä) — sanoja "bee", "beehive" tai
   "hive" EI esiinny lainkaan. Tunnettu tarina, mutta ei tästä
   lähteestä. Ei käyttöön ilman uutta lähdettä.
2. **Pariisin ruumishuone yleisönähtävyytenä.** Artikkelia "Paris
   Morgue" ei ole (*missing*), ja yleisartikkeli "Morgue" kertoo vain
   sanan etymologian ja Châteletin käytön — ei mitään
   1800-luvun yleisökäynneistä. Ei käyttöön.
3. **Kyyhkypostin "150 000 viestiä"** ja muut pyöreät luvut: artikkeli
   antaa vain tarkkoja osalukuja (61 putkea, 246 virallista ja 671
   yksityistä sanomaa 7.1. alkaen). Älä käytä pyöreää kokonaislukua.
4. **Haavoittuneiden evakuointi kuumailmapalloilla.** Siege of Paris
   -artikkeli kumoaa tämän erikseen ("this myth has been definitively
   disproven"). Ei käyttöön.
5. **Wallace-suihkukaivojen vuosi 1872.** Ks. täky 18 — ei löydy
   lähteestä.
6. **Zarafan täytetty ruumis Jardin des Plantes'ssa 1873.** Lähde sanoo
   vain "for many years". Ei väitetä.
7. **Barryn kuolema 41. pelastettavan käsissä.** Kaunis tarina, jonka
   lähde itse kumoaa — käytä sitä *kumottuna*, älä totena (täky 3).

---

## Yhteenveto

**18 täkyä, kaikki tarkistettu; yksikään ei jäänyt vahvistamatta.**
Viidessä kohdassa lähde itse toteaa asian epävarmaksi, kiistellyksi tai
vääräksi (Abélardin ja Héloïsen "purported remains", Barryn kuolema
legendana, Flamelin alkemia jälkikäteisenä maineena, Bazainen
syyllisyys, Zarafan täytetty ruumis "for many years") — nämä on merkitty
kohdittain, ja niiden sanamuoto on kirjoitettava varaukseksi.
Kolme numeroitua sisäistä ristiriitaa löytyi ja on merkitty
(Vendôme-pylvään paluuvuosi, katakombien avautumisvuosi, kaupungintalon
jälleenrakennuksen alkuvuosi).

**Eläintäyt (Raamatun ELÄINTÄYT-vaatimus, väh. 2 per maa): viisi.**
#1 kissakatu, #2 kirahvi Zarafa, #3 koirien hautausmaa ja Barry,
#4 kyyhkyposti, #5 eläintarha ja piirityksen talvi. Näistä neljä
ensimmäistä ovat söpöjä tai lämpimiä; #5 on tarkoituksella raskas ja
merkitty ikäsopivuushuomiolla.

**1873-ankkuroituja täkyjä: seitsemän** (#5, #6, #7, #8, #9, #10, #17)
sekä oma osionsa "Isoisän Pariisi lokakuussa 1873".

**Kolme parasta ehdotustani:**

1. **#6 — Taidemaalari kaadatti patsaan, ja valtio lähetti hänelle
   laskun.** Tämä on koko listan täydellisin osuma: se on yhtä aikaa
   henkilöskandaali (kuollut henkilö, Perustuslaki kestää),
   uskomaton tositarina (kuolema päivää ennen ensimmäistä eräpäivää) ja
   tarkka 1873-ankkuri — isoisä käveli tyhjän jalustan ohi juuri sinä
   syksynä, kun valtio päätti laskuttaa maalarilta 323 000 frangia.
   Aikalaisvalokuva kaadetusta pylväästä on CC0 ja iso. Sama aihe
   kantaa myös täkynostoksi (takynostot-ranska.md ehdokas 1).

2. **#2 — Kirahvi käveli Marseillesta Pariisiin takki päällä.**
   Paras eläintäky: söpö ilman söpöilyä, ja jokainen yksityiskohta on
   uskomaton mutta tarkistettu (reikä laivan kannessa, kaksiosainen
   keltainen takki, kengät, 41 päivää, 30 000 ihmistä Lyonissa, joka
   kahdeksas pariisilainen katsomassa). Se on myös **koko fokusmaan
   sidosaine**: reitti kulkee Marseillesta (pelilaatta) Lyonin kautta
   (fokuskohteet-ranska.md kohde 12) Pariisiin — yksi täky, joka
   piirtää kartalle viivan.

3. **#8 — Kaupungin keskellä seisoi yksitoista vuotta poltettu
   palatsi.** Vahvin "isoisän silmillä" -täky. Se ei vaadi pelaajalta
   mitään ennakkotietoa, sen kuva on aikalaisvalokuva juuri siitä
   näkymästä, ja se kääntää tutun Pariisin oudoksi: Louvren vieressä
   oli tyhjä, palanut kuori, ja sen kivet myytiin lopulta
   matkamuistoiksi ja Korsikalle asti. Suosittelen tätä paria täyn 6
   kanssa — kaksi rauniota, sama vuosi, kaksi CC0-valokuvaa.

Kunniamaininnat: **#16 (rue Mouffetardin kultarahat)** on aarrepelin
kannalta osuvin täky koko listalla (varaus: hyvin lyhyt artikkeli, joka
kannattaa ristiintarkistaa); **#3 (Barryn patsas, joka kertoo
väärin)** on paras, jos halutaan täky, joka opettaa lähdekriittisyyttä
ilman saarnaamista; **#1 (kissakatu)** on lyhin ja iskevin yhden
lauseen täky, ja sillä on harvinaisen hyvä pari: Marvillen
aikalaisvalokuva vuodelta 1868 ja sama kuja tänään.
