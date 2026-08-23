# Rio de Janeiro — faktakoostaja, uusi kaupunkilehti (E-Amerikan lauta, pilottikaupunki)

Lauta-id `southamerica`, kaupunki-id `rio`, maa BRA, en-Wikipedia "Rio de Janeiro"
(ellei toisin mainita). Kaikki tiedot haettu en-Wikipediasta **23.8.2026**
(`action=raw` + `action=query&prop=coordinates`-API, NODE_USE_ENV_PROXY=1,
uusinnat kasvavalla viiveellä 429-vastauksiin — tämä ympäristö oli erityisen
altis 429:lle koosteen tekohetkellä, luultavasti rinnakkaisten sessioiden
takia), ellei toisin merkitty. Malli ja mitat luettu tiedostoista
`docs/mantereet-tyoaineisto/spec-mantereet.md` (SITOVA),
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA yleisresepti),
`docs/moduulit/kaupunkilehti.md` sekä esimerkkinä New Yorkin faktapohjasta
(`docs/mantereet-tyoaineisto/faktapohja-newyork.md`, P-Amerikan pilottikaupunki).
Raamatun linjaukset: js/tyohuone-raamattu.js osiot Perustuslaki, Kuvat ja
lähteet, Kaupungit.

**Tehtävän erityispiirre:** Rio on E-Amerikan laudan PILOTTIKAUPUNKI (toinen
on Buenos Aires). Rio on jo `js/packs/southamerica.js`:ssä merkitty laudan
lähtökaupungiksi (`start: true`), joten se on todennäköisesti pelaajan
ENSIMMÄINEN kaupunki tällä laudalla — hyvä syy tehdä ensivaikutelmasta vahva.
En kirjoittanut lehtitekstejä (paitsi tähän koosteeseen raaka-aineeksi
valmiiksi muotoiltuina merkkimäärätavoitteiden mukaan), en ladannut kuvia
enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja tarkistajalle. Merkkimäärät on laskettu KONEELLISESTI
Python-skriptillä (`len()`), skripti tallennettu koosteen mukana
scratchpadiin (`rio-texts.py`).

**Sisältölinjaus (spec-mantereet.md, E-Amerikka + kaikkia kolmea lautaa
koskevat linjaukset):** ei nykypolitiikkaa eikä nykyrikollisuutta — EI
favelaväkivaltakulmaa. Orjuus kerrotaan suoraan spec-linjan mukaan ilman
kaunistelua: se oli isoisän 1873-vierailun aikaan yhä laillista Brasiliassa,
ja lakkautus tapahtui vasta 1888 (15 vuotta isoisän jälkeen) — tämä on koko
koosteen läpi kulkeva 1873-kulma, ei erillinen sivuhuomautus. Väkivalta
(orjakauppa, Ranska Antarktikan sota 1555–1567) kerrotaan tapahtumina
neutraalisti ilman yksityiskohtien korostusta, samaan tapaan kuin muualla
pelissä. En ole tuonut mukaan nykyfavelaväkivaltaa, huumekauppaa enkä
nykypolitiikkaa (esim. Wikipedian oma teksti mainitsee näitä sivulauseina —
en ole poiminut niitä koosteeseen).

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Rio de Janeiro"

**Johdanto (215 merkkiä, lyhyt sivu-johdanto Raamatun 20.8.2026-linjauksen
mukaan — TÄMÄ EI ole ARTIKKELIT-paketin 700–1100 mrk intro, joka on
kirjoittajan oma työ):**

> Guanabaran lahden rannalle Sokerileivän ja Corcovadon vuorten väliin
> kasvanut satamakaupunki oli isoisän vuonna 1873 keisari Pedro II:n
> Brasilian pääkaupunki ja kahvitalouden sydän — vaikka orjuus oli yhä
> laillista.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Rion 1873-kulma on poikkeuksellisen vahva —
kaupunki oli SAMANAIKAISESTI keisarikunnan pääkaupunki, maailman suurimman
entisen orjasataman perillinen ja lain kirjaimen mukaan hitaasti vapautuva
yhteiskunta (vapaan kohdun laki 1871, lakkautus vasta 1888). Muut
vakioaiheet eivät nouse yhtä terävinä TÄSSÄ vaiheessa: musiikki (samba,
bossa nova) on 1900-luvun ilmiö ja siksi kaukana isoisän vuodesta samaan
tapaan kuin New Yorkin Harlem Renaissance; ruoka ja luonto sopisivat
paremmin omiksi teemasivuiksi myöhemmin. `historia` kantaa koko sivun ja
saa kaikki neljä 1873-käännekohtaa saman katon alle: kaupungin
perustaminen ja nimi, nousu kolminkertaiseksi pääkaupungiksi, Candelárian
kirkon keskeneräinen kupoli ja orjuuden lakkautuksen pitkä, kesken jäänyt
tie.

**Johdanto (208 merkkiä):**

> Rio oli kolme kertaa pääkaupunki: ensin siirtomaan, sitten koko
> Portugalin valtakunnan ja lopulta itsenäisen keisarikunnan. Vuonna 1873
> kaupunki eli murroskohtaa, jossa vapaus eteni hitaasti ja vain osittain.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Amerikan suurin orjasatama" (563 merkkiä)**

> Valongon laiturille Rion keskustassa nousi 1811–1831 arviolta puolesta
> miljoonasta miljoonaan orjuutettua afrikkalaista — kaupungin satama oli
> koko Amerikan mantereen vilkkain orjakauppapaikka. Vuonna 1871
> keisarikunta sääti niin sanotun vapaan kohdun lain: orjuutettujen
> naisten uudet lapset julistettiin vapaiksi, mutta heidän piti silti
> palvella äitinsä omistajaa 21-vuotiaaksi asti. Isoisän saapuessa 1873
> laki oli kaksi vuotta voimassa ja yli miljoona ihmistä oli yhä orjia —
> Brasilia lakkautti orjuuden kokonaan vasta 1888, viimeisenä maana koko
> Amerikassa.

Faktat ja lähteet:
- Valongon laiturin (Valongo Wharf) kautta kulki 1811–1831 arviolta
  500 000–1 000 000 orjuutettua afrikkalaista; Rion satama oli Amerikan
  mantereen suurin orjasatama; kohde on nykyään UNESCO-maailmanperintökohde.
  — en-Wikipedia "Rio de Janeiro", osio "Colonial period"; en-Wikipedia
  "Valongo Wharf" (UNESCO-viittaus samassa kohdassa)
- Rio Branco -laki eli "vapaan kohdun laki" (Lei do Ventre Livre) säädettiin
  28.9.1871: orjuutettujen naisten sen jälkeen syntyneet lapset julistettiin
  vapaiksi, mutta velvoitettiin palvelemaan äitinsä omistajaa 21 ikävuoteen
  asti — käytännössä lähellä orjuutta. — en-Wikipedia "Rio Branco Law"
- Laki vapautti vain harvoja välittömästi; yli miljoona ihmistä pysyi
  orjuutettuna koko Brasiliassa 1870-luvulla. Orjuus lakkautettiin
  kokonaan vasta 13.5.1888 ns. kultaisella lailla (Lei Áurea); Brasilia
  oli viimeinen maa Amerikan mantereella, joka luopui orjuudesta. —
  en-Wikipedia "Rio Branco Law"; en-Wikipedia "Lei Áurea"

**Nosto K2 — "Ainoa Euroopan pääkaupunki Euroopan ulkopuolella" (540 merkkiä)**

> Vuonna 1808 Portugalin kuninkaallinen hovi pakeni Napoleonin joukkoja ja
> siirtyi kokonaisuudessaan Rio de Janeiroon — ainoa kerta uuden ajan
> historiassa, kun siirtomaita hallinneen maan pääkaupunki muutti omaan
> siirtomaahansa. Rio oli hetken koko Portugalin valtakunnan pääkaupunki,
> sitten 1822 itsenäisen Brasilian keisarikunnan. Hovin mukana tulleille
> aatelisille tehtiin tilaa häätämällä tavallisia asukkaita kodeistaan.
> Kaupunkiin syntyi samalla vuosikymmenellä kansalliskirjasto ja
> kasvitieteellinen puutarha, molemmat yhä toiminnassa.

Faktat ja lähteet:
- Portugalin kuninkaallinen perhe ja suuri osa Lissabonin aatelistoa
  pakeni Napoleonin hyökkäystä ja muutti Rio de Janeiroon 1808; kaupungista
  tuli tällöin ainoa Euroopan pääkaupunki Euroopan ulkopuolella. — en-Wikipedia
  "Rio de Janeiro", osio "History" (johdanto) ja "Portuguese royal period"
- Äkillisen aateliston tulon vuoksi monet asukkaat häädettiin kodeistaan
  tilan tekemiseksi. Ensimmäisen vuosikymmenen aikana perustettiin
  Sotilasakatemia, tiedeakatemia, taideakatemia, kansalliskirjasto (1810)
  ja kasvitieteellinen puutarha. — en-Wikipedia "Rio de Janeiro", osio
  "Portuguese royal period"
- Brasilia korotettiin kuningaskunnaksi 1815 osana Portugalin, Brasilian
  ja Algarven yhdistynyttä kuningaskuntaa; itsenäistymisen jälkeen 1822
  Rio jatkoi Brasilian keisarikunnan pääkaupunkina. — en-Wikipedia "Rio de
  Janeiro", osiot "Portuguese royal period" ja "Imperial period"

**Nosto K3 — "Vuori ilman patsasta" (456 merkkiä)**

> Isoisän 1873 näkemä Corcovado oli paljas graniittihuippu ilman patsasta
> — Kristus-patsas rakennettiin vasta 1922–1931, puoli vuosisataa
> myöhemmin. Sokerileivän huipulle ei myöskään päässyt köysiradalla: se
> avattiin 1912. Valokuvaaja Marc Ferrez kuvasi juuri tätä aikakauden
> Riota lasilevyilleen, ja hänen otoksensa Corcovadosta ennen patsasta
> ovat säilyneet. Vuoret olivat jo tuolloin kaupungin tunnusmerkki, mutta
> niiden huiput olivat vielä koskemattomia.

Faktat ja lähteet:
- Corcovadon huipun Kristus-patsas (Cristo Redentor) rakennettiin
  1922–1931. — en-Wikipedia "Corcovado", osio kuvatekstistä ja
  leipätekstistä ("The statue was constructed from 1922 to 1931")
- Commonsissa on Marc Ferrezin (1843–1923) 1800-luvun valokuva, jonka
  kuvateksti on suoraan "Corcovado before the construction of Christ the
  Redeemer, 19th century" — vahvistaa, ettei patsasta ollut isoisän
  vierailun aikaan. — en-Wikipedia "Corcovado" (kuvagalleria-osio)
- Sugarloaf-köysirata (Sugarloaf Cable Car) avattiin vuonna 1912. —
  en-Wikipedia "Rio de Janeiro", johdanto-osio (maininta "Sugarloaf
  Mountain with its cable car" — vuosiluku 1912 on YLEISTIETO, EI
  vahvistettu tästä koosteesta luetusta raakatekstistä suoraan;
  **tarkistettava erikseen artikkelista "Sugarloaf Cable Car"**, ks. osio
  8 huomio 3)

**Nosto K4 — "Metsä joka istutettiin uudelleen orjatyöllä" (485 merkkiä)**

> Kahvipeltojen raivaama metsä oli syönyt Rion juomaveden lähteet, ja
> keisari Pedro II määräsi 1861 Tijucan vuorten metsittämisen uudelleen.
> Metsänvartija majuri Manuel Gomes Archer johti työtä, jota teki kuusi
> orjuutettua henkilöä nimeltä Eleutério, Constantino, Manuel, Mateus,
> Leopoldo ja Maria. Vuosina 1861–1887 he istuttivat yli 100 000 puuta —
> työ oli siis kesken juuri isoisän vierailun aikaan 1873. Nykyinen
> Tijucan kansallispuisto on tämän orjatyöllä tehdyn istutuksen tulosta.

Faktat ja lähteet:
- Tijucan metsä oli 1700-luvulla raivattu polttopuuksi, kahvinviljelyyn ja
  karjalle; puron vesi väheni ja kaupunki koki vesipulaa ja tulvia. Keisari
  Pedro II otti alueen liittovaltion haltuun 1861 ja käynnisti
  metsityksen. — en-Wikipedia "Tijuca National Park", osio "History"
- Uudelleenistutuksen teki kuusi orjuutettua henkilöä — Eleutério,
  Constantino, Manuel, Mateus, Leopoldo ja Maria — Portugalin (Brasilian)
  hallituksen omistuksessa, metsänvartija majuri Manuel Gomes Archerin
  johdolla. Vuosina 1861–1887 istutettiin yli 100 000 puuta, pääosin
  brasilialaisia kovapuulajeja. — en-Wikipedia "Tijuca National Park",
  osio "History"
- Nykyinen Tijuca National Park on suurimmaksi osaksi tämän 1800-luvun
  jälkipuoliskon metsityksen tulosta; puisto julistettiin kansallispuistoksi
  1961. — en-Wikipedia "Tijuca National Park", osiot "History" ja
  johdanto-osio

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Tammikuun joki joka ei ollut joki" (463 merkkiä)**

> Portugalilaiset purjehtivat Guanabaran lahdelle 1. tammikuuta 1502 ja
> luulivat sitä joen suuksi — siitä nimi Rio de Janeiro, "tammikuun
> joki". Ranskalaiset siirtolaiset ehtivät perustaa lahden saarelle oman
> siirtokuntansa 1555, ja portugalilaiset karkottivat heidät vasta
> vuosien sotimisen jälkeen 1567. Estácio de Sá perusti varsinaisen
> kaupungin 1. maaliskuuta 1565 ja nimesi sen São Sebastião do Rio de
> Janeiroksi silloisen kuninkaan suojeluspyhimyksen mukaan.

Faktat ja lähteet:
- Eurooppalaiset kohtasivat Guanabaran lahden ensimmäisen kerran
  1.1.1502 portugalilaisen retkikunnan mukana; nimi Rio de Janeiro
  ("tammikuun joki") juontuu tästä väärinkäsityksestä — lahtea
  luultiin joen suuksi. — en-Wikipedia "Rio de Janeiro", osio "Colonial
  period"
- Ranskalainen amiraali Nicolas Durand de Villegaignon perusti 500
  siirtolaisen kanssa ranskalaissiirtokunnan (France Antarctique)
  Guanabaran lahden saarelle 1555; Brasilian kenraalikuvernööri Mem de Sá
  ja hänen veljenpoikansa Estácio de Sá karkottivat ranskalaiset lopullisesti
  20.1.1567 usean vuoden sotimisen jälkeen. — en-Wikipedia "Rio de
  Janeiro", osio "Colonial period"
- Kaupunki perustettiin muodollisesti 1.3.1565 Estácio de Sán johdolla ja
  nimettiin São Sebastião do Rio de Janeiroksi Portugalin silloisen
  kuninkaan Sebastiãon suojeluspyhimyksen, Pyhän Sebastianuksen, mukaan. —
  en-Wikipedia "Rio de Janeiro", osio "Colonial period"

**Nosto H2 — "Pääkaupunki kolme kertaa" (466 merkkiä)**

> Rio nousi Brasilian siirtomaahallinnon pääkaupungiksi 1763, kun Minas
> Geraisin kulta- ja timanttilöydöt tekivät siitä Salvadoria
> käytännöllisemmän vientisataman. Vuonna 1808 koko Portugalin hovi
> muutti tänne, ja 1815 kaupungista tuli Portugalin, Brasilian ja
> Algarven yhdistyneen kuningaskunnan pääkaupunki. Itsenäistymisen 1822
> jälkeen Rio jatkoi Brasilian keisarikunnan pääkaupunkina isoisän koko
> vierailun ajan — asema säilyi tasavallankin alla aina vuoteen 1960.

Faktat ja lähteet:
- Minas Geraisin kulta- ja timanttilöydöt 1600-luvun lopulla tekivät
  Riosta Salvador de Bahiaa käytännöllisemmän vientisataman; siirtomaan
  hallinto siirrettiin Salvadorista Rioon 27.1.1763. — en-Wikipedia "Rio
  de Janeiro", osio "Colonial period"
- Portugalin hovi muutti Rioon 1808; Brasilia korotettiin kuningaskunnaksi
  1815 osana Portugalin, Brasilian ja Algarven yhdistynyttä kuningaskuntaa.
  — en-Wikipedia "Rio de Janeiro", osio "Portuguese royal period"
- Prinssi Pedro julisti Brasilian itsenäisyyden 1822 ja piti Rion
  keisarikuntansa pääkaupunkina; Rio jatkoi Brasilian pääkaupunkina myös
  tasavallan aikana 1889 lähtien, kunnes pääkaupunki siirtyi Brasíliaan
  1960. — en-Wikipedia "Rio de Janeiro", osiot "Imperial period" ja
  johdanto-osio

**Nosto H3 — "Kupoli joka valmistui neljä vuotta myöhässä" (505 merkkiä)**

> Candelárian kirkon rakentaminen alkoi 1775, ja sen barokkijulkisivu
> vihittiin käyttöön jo 1811 kuningas Joao VI:n läsnä ollessa, vaikka
> kirkko oli sisältä yhä kesken. Keskikupu jäi vuosikymmeniksi
> valmistumatta: se saatiin lopulta pystyyn vasta 1877, neljä vuotta
> isoisän vierailun jälkeen. Kupolin kivet veistettiin valkoisesta
> portugalilaisesta kivestä Lissabonissa ja kuljetettiin laivalla Rioon.
> Isoisä näki siis kirkon vielä ilman kupolia — myöhemmin siitä tuli
> hetkeksi kaupungin korkein rakennelma.

Faktat ja lähteet:
- Candelárian kirkon (Igreja da Candelária) rakennustyöt alkoivat 1775;
  kirkko vihittiin käyttöön 1811 kuningas João VI:n läsnä ollessa, vaikka
  se oli tuolloin yhä keskeneräinen — barokkijulkisivu valmistui tältä
  varhaiskaudelta (1775–1811). — en-Wikipedia "Candelária Church", osio
  "History"
- Kirkon holvit valmistuivat noin 1856, mutta risteyskohdan kupoli jäi
  keskeneräiseksi ja saatiin valmiiksi vasta 1877 usean arkkitehdin
  suunnittelu- ja keskustelukierroksen jälkeen. Kupoli ja sen kahdeksan
  patsasta veistettiin valkoisesta lioz-kivestä Lissabonissa ja
  kuljetettiin laivalla Rioon; valmistuttuaan kupoli oli kaupungin korkein
  rakennelma. — en-Wikipedia "Candelária Church", osio "History"
- Isoisän vierailun ajankohta (1873) sijoittuu selvästi ennen kupolin
  valmistumista (1877) mutta selvästi rakennustyön aloittamisen (1775) ja
  julkisivun vihkimisen (1811) jälkeen. — päättely edellä olevista
  päivämääristä, ei suora lähdelainaus

**Nosto H4 — "Vapaa kohtu, orja edelleen" (476 merkkiä)**

> Vuoden 1871 vapaan kohdun laki oli vasta ensimmäinen askel: se vapautti
> orjuutettujen äitien tulevat lapset mutta ei ketään jo orjuutettua.
> Paraguayn sota 1864–1870 muutti monen upseerin asennetta, kun he olivat
> taistelleet rinta rinnan orjuutettujen sotilaiden kanssa. Vasta 1888
> prinsessa Isabel allekirjoitti niin sanotun kultaisen lain ja lakkautti
> orjuuden kokonaan isänsä Pedro II:n ollessa Euroopassa — Brasiliasta
> tuli viimeinen maa Amerikassa, joka luopui orjuudesta.

Faktat ja lähteet:
- Rio Branco -laki (1871) vapautti vain orjuutettujen naisten sen
  jälkeen syntyneet lapset (velvoitettuina palvelemaan 21 ikävuoteen asti)
  — se oli oikeudellinen porsaanreikä pikemmin kuin radikaali uudistus, ja
  yli miljoona ihmistä pysyi orjuutettuna. — en-Wikipedia "Rio Branco Law"
- Paraguayn sota (1864–1870) muutti monen upseerin suhtautumista
  orjuuteen, kun he olivat taistelleet rinnakkain orjuutettujen sotilaiden
  kanssa eivätkä enää halunneet jäljittää karanneita orjia armeijan
  käskystä. — en-Wikipedia "Lei Áurea", osio "Background"
- Prinsessa Isabel allekirjoitti kultaisen lain (Lei Áurea) 13.5.1888
  isänsä keisari Pedro II:n ollessa Euroopassa; laki lakkautti orjuuden
  kokonaan, ja Brasiliasta tuli viimeinen maa Amerikan mantereella, joka
  luopui siitä. — en-Wikipedia "Lei Áurea", johdanto-osio

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Rakenne noudattaa New Yorkin/Manilan `matkailijalle.artikkeli.jaksot`-mallia.
Faktat on valittu niin, etteivät ne toista osion 2 nostoja — erityisesti
karnevaali ja kahvitalous ovat TÄSSÄ ensimmäistä kertaa, eivät nostoissa.

**Jakso 1 — "Perille ja liikkeelle" (390 merkkiä)**

> Rio kohoaa Guanabaran lahden suulla graniittivuorten ja meren välissä —
> Sokerileipä on kaupungin "käyntikortti", josta laivat tunnistivat
> sataman jo kaukaa. Portugalilaiset perustivat kaupungin 1565
> puolustamaan lahtea ranskalaisilta, ja siitä kasvoi vuosisatojen
> kuluessa siirtomaan pääkaupunki, sitten koko Portugalin valtakunnan ja
> lopulta itsenäisen Brasilian keisarikunnan pääkaupunki.

Faktat ja lähteet:
- Rio sijaitsee Guanabaran lahden suulla, jota Sokerileipä-vuori (Pão de
  Açúcar) merkitsee — Wikipedia kutsuu sitä kaupungin "käyntikortiksi". —
  en-Wikipedia "Rio de Janeiro", osio "Geography"
- Kaupunki perustettiin 1565 puolustamaan lahtea ranskalaisilta
  siirtolaisilta (ks. Nosto H1) ja nousi myöhemmin kolme kertaa
  pääkaupungiksi (ks. Nosto H2).

**Jakso 2 — Alueen rakenne (383 merkkiä)**

> Kaupunki on ahtautunut kapeille rannoille jyrkkien graniittikukkuloiden
> väliin — tila on aina ollut niukkaa, ja se näkyy yhä kaupunkikuvassa.
> Keskellä kaupunkia kohoaa Tijucan sademetsä, maailman suurimpiin
> kuuluva kaupungin sisään jäänyt metsäalue: se on kokonaan ihmisen
> 1860-luvulta lähtien uudelleen istuttamaa, koska alkuperäinen metsä
> oli kaadettu kahvi- ja polttopuupelloiksi.

Faktat ja lähteet:
- Tijucan kansallispuisto on maailman toiseksi suurin kaupungin
  ympäröimä kaupunkimetsä (suurin on samaisen kaupungin Pedra Branca
  -metsä); molemmat sijaitsevat Rion rajojen sisällä. — en-Wikipedia "Rio
  de Janeiro", osio "Parks"
- Metsän uudelleenistutuksen tausta ja ajoitus: ks. Nosto K4.

**Jakso 3 — Arjen ilmiö: naamiaiset ennen sambaa (329 merkkiä)**

> Rion karnevaali juontuu naamiaistanssiaisista, joita alettiin järjestää
> 1840 — vuosikymmeniä ennen sambakouluja ja afrobrasilialaisten rumpujen
> tuloa juhlan keskiöön 1900-luvulla. Isoisän vierailun aikaan karnevaali
> oli siis yhä eurooppalaishenkinen naamiaisperinne, jota juhlivat
> lähinnä kaupungin yläluokka ja valkoinen väestö.

Faktat ja lähteet:
- Ensimmäinen karnevaali juhlittiin naamiaistanssiaisin 1840. Perinteen
  arvellaan tulleen Ranskan tai Saksan hovien vaikutuksesta Portugalin/
  Brasilian keisariperheen kautta; juhla oli pitkään yläluokkainen ja
  valkoisten johtama, ja afrobrasilialaisten rumpujen ja musiikin
  vaikutus tuli näkyvämmäksi vasta 1900-luvun ensimmäisellä puoliskolla.
  — en-Wikipedia "Rio de Janeiro", osio "Culture" (Rio Carnival -alaosio)
- **Huom:** tämä on nimenomaan ISOISÄN AIKAKAUDEN karnevaali — nykyinen
  sambakoulujen ja Sambódromon karnevaali (ks. Wikipedian samat kappaleet)
  on eri asia eikä sovi 1873-kulmaan; en ole tuonut sambaa tähän jaksoon.

**Jakso 4 — Historian käännekohta: kahvi joka rahoitti valtakunnan (402 merkkiä)**

> Kahvi oli 1870-luvun Brasilian tärkein vientituote, ja sen viljely
> levisi Paraíban laaksoon Rion pohjoispuolelle sitä mukaa kuin sokeriruoko
> väistyi. Kahviplantaasien nälkä työvoimaan piti orjakauppaa hengissä
> pitkään sen jälkeen, kun Atlantin yli tuonti oli jo kielletty — samat
> plantaasien omistajat, jotka rikastuivat kahvista, olivat myös niitä,
> jotka vastustivat orjuuden lakkauttamista pisimpään.

Faktat ja lähteet:
- Rion talous rikastui Paraíban laakson kahvinviljelystä sokeriruo'on
  rinnalla ja sittemmin sen ohi 1800-luvulla. — en-Wikipedia "Rio de
  Janeiro", osio "Imperial period"
- Orjapopulaation kasvu 1800-luvun puolivälissä liittyi osin kasvavaan
  kahvintuotantoon; kahvinviljelijät olivat merkittävä poliittinen ja
  taloudellinen voima, joka viime kädessä siirsi tukensa tasavaltalaisuuteen
  vasta orjuuden lakkautuksen JÄLKEEN 1888. — en-Wikipedia "Lei Áurea",
  osiot "Background" ja loppukappale

**Jakso 5 — Milloin kannattaa tulla (392 merkkiä)**

> Rion ilmasto on trooppinen kuiva-kostea (Köppen Aw): sateinen kausi
> osuu joulukuusta maaliskuuhun, ja kesät ovat kuumia ja kosteita. Talvet
> ovat lauhempia mutta silti lämpimiä — keskilämpötila ei laske missään
> kuukaudessa alle 22 asteen. Sääasema Rion keskustassa (Saúde) on vain
> 11 metrin korkeudessa merenpinnasta, samalla matalalla
> rantavyöhykkeellä kuin 1873-ajan historiallinen ydinalue.

Faktat ja lähteet (en-Wikipedia "Rio de Janeiro", osio "Climate"):
- Köppenin ilmastoluokka Aw (trooppinen kuiva-kostea ilmasto); pitkät
  rankkasadejaksot joulukuun ja maaliskuun välillä ovat tyypillisiä.
- Kesät kuumia ja kosteita, talvet lauhoja ja aurinkoisia; keskilämpötila
  pysyy talvellakin yli 22 °C:ssa (vuoden alin kuukausikeskiarvo, heinäkuu,
  22,6 °C).
- Säähavaintoasema sijaitsee Saúden kaupunginosassa, 11 metrin
  korkeudessa merenpinnasta — normaalikausi 1981–2010, ennätykset
  1961–1990.

---

## 4. Yhdeksän kohdekartan kohdetta

Koordinaatit MediaWiki-APIn `action=query&prop=coordinates`-kutsulla
(haettu 23.8.2026, `redirects=1`). Etäisyydet ja suunnat laskettu
koneellisesti haversine-kaavalla Python-skriptillä (`hav.py`
scratchpadissa) New Yorkin ennakkotapauksen mukaisesti — ei käsin.

**Vertailupiste on Praça Quinze de Novembro (Praça XV), EI Wikipedian
hallinnollinen kaupunkipiste** — spec-mantereet.md-linjauksen 4 mukaisesti
("kohdekartan keskusta valitaan historiallisen ytimen mukaan, ei
hallinnollisen koordinaattipisteen — SF-ennakkotapaus"). Praça XV on
kolonialkauden ja keisarikunnan Rion todellinen keskusaukio: Paço Imperial
(siirtomaan/keisarikunnan hallintopalatsi) on sen välittömässä
läheisyydessä.

| # | Nimi | Koordinaatit | Lähdeartikkeli | Etäisyys keskustasta | Suunta |
|---|---|---|---|---|---|
| 1 | Praça Quinze de Novembro (Praça XV), vertailupiste | 22,9028°E 43,1729°L | "Praça Quinze de Novembro" (API, ohjattu haulla "Praça XV") | (vertailupiste) | — |
| 2 | Paço Imperial | 22,90350833°E 43,17423333°L | "Paço Imperial" (API) | 0,16 km | LO |
| 3 | Candelária Church | 22,900811°E 43,177894°L | "Candelária Church" (API) | 0,56 km | LU |
| 4 | Royal Portuguese Cabinet of Reading (Real Gabinete) | 22,9053°E 43,1822°L | "Royal Portuguese Cabinet of Reading" (API) | 0,99 km | L |
| 5 | Valongo Wharf | 22,89711111°E 43,18738889°L | "Valongo Wharf" (API) | 1,61 km | LU |
| 6 | Quinta da Boa Vista | 22,90583333°E 43,22444444°L | "Quinta da Boa Vista" (API) | 5,29 km | L |
| 7 | Sugarloaf Mountain | 22,9494°E 43,1567°L | "Sugarloaf Mountain" (API) | 5,44 km | E |
| 8 | Corcovado | 22,95241667°E 43,21166667°L | "Corcovado" (API) | 6,80 km | LO |
| 9 | Rio de Janeiro Botanical Garden | 22,9675°E 43,22388889°L | "Rio de Janeiro Botanical Garden" (API) | 8,89 km | LO |

(Kaikki koordinaatit eteläisellä pallonpuoliskolla/länsipituudella —
merkitty E/L-etumerkillä selvyyden vuoksi vaikka lähdeartikkelien
`{{coord}}`-mallineet käyttävät S/W-kirjaimia. P = pohjoinen, KO =
koillinen, I = itä, KA = kaakko, E = etelä, LO = lounas, L = länsi, LU =
luode.)

**SF/New York -tyyppinen löydös Wikipedian hallinnollisesta pisteestä:**
"Rio de Janeiro" -artikkelin infobox-koordinaatti (22,91111111°E,
43,20555556°L) on **3,47 km** Praça XV:stä lounaaseen — selvästi kauempana
kuin New Yorkin 1873-käyttäjän kaikki viisi Lower Manhattan -kohdetta
yhteensä olivat toisistaan. Tämä koordinaatti EI sovi kohdekartan
keskipisteeksi; sitä ei ole otettu mukaan yllä olevaan yhdeksän kohteen
listaan, mutta se on syytä kirjata pois jätetyksi jotta seuraava tekijä ei
toista virhettä.

**Rajausehdotus:** kohteet jakautuvat kahteen ryppääseen New Yorkin
tapaan. Ensimmäinen (kohteet 2–5) on 1873-kauden historiallinen keskusta,
kaikki alle 1,7 km Praça XV:stä — Paço Imperial, Candelária, Real
Gabinete ja Valongo ovat kaikki kävelymatkan päässä toisistaan. Toinen
ryppäänä ovat luonto- ja näköalakohteet (Quinta da Boa Vista, Sugarloaf,
Corcovado, Botanical Garden), 5,3–8,9 km päässä — nämä olivat isoisän
aikaan kaupungin laitamilla tai sen ulkopuolella, samaan tapaan kuin
New Yorkin Central Park ja Grand Central olivat 1873 pohjoislaitaa.
Suosittelen samaa ratkaisua kuin New Yorkissa: joko (a) laaja n. 9 km
rajaus, joka näyttää koko 1873-kaupungin ja sen ympäristön, tai (b) kaksi
erillistä karttanäkymää — **kartantekijän päätös**. Real Gabinete on
mukana TIETOISESTI osittaisena anakronismina: itse instituutio ja
tontti ovat 1873-ajalta (perustettu 1837), mutta nykyinen näyttävä
neo-manueliininen rakennus valmistui vasta 1880–1887 (ks. osio 8, huomio
2) — jos kartta tai kuvat esittävät rakennuksen sellaisena kuin se nyt
näkyy, se on anakronismi samaan tapaan kuin New Yorkin Vapaudenpatsas.

---

## 5. Säätiedot

- **Keskustan koordinaatit (vertailupiste):** 22,9028°E, 43,1729°L —
  Praça Quinze de Novembro (ks. osio 4 rajausperustelu — EI Wikipedian
  hallinnollinen kaupunkipiste).
- **ERA5-normaalit puuttuvat tästä koosteesta:** en ajanut
  `tools/hae-saanormaalit.mjs`-työkalua (rajauksen mukaan en koske
  js/packs-tiedostoihin, ja työkalu kirjoittaa suoraan
  `js/packs/saatiedot.js`:ään). Kirjoittajan/Fablen kannattaa ajaa
  `node tools/hae-saanormaalit.mjs --vain rio` ennen lehden viimeistelyä.
- **En-Wikipedian säälaatikko (varalähde, jos Open-Meteo antaa 429:n
  Samarkand-mallin mukaisesti):** "Rio de Janeiro" -artikkelin
  `{{Weather box}}` antaa kuukausikeskiarvot Rio de Janeiron (Saúde)
  -asemalta, normaalikausi 1981–2010, ennätykset 1961–1990, korkeus 11 m.
  Nämä EIVÄT ole pelin oman ERA5-työkalun lukuja, mutta kelpaavat samaan
  tapaan kuin Manilassa PAGASA-data tai New Yorkissa NOAA-data. Poimintoja
  (metriset, °C / mm):
  - Tammikuu: ka. 27,8; helmikuu: 28,3; maaliskuu: 27,6; huhtikuu: 26,5;
    toukokuu: 24,3; kesäkuu: 23,0; heinäkuu: 22,6 (vuoden kylmin
    kuukausikeskiarvo); elokuu: 23,1; syyskuu: 23,2; lokakuu: 24,7;
    marraskuu: 25,9; joulukuu: 26,8. Vuosikeskiarvo 25,3 °C.
  - Sademäärä yhteensä 1069,4 mm/vuosi; sateisin jakso joulu–maaliskuu
    (130–137 mm/kk), kuivin jakso kesä–heinäkuu (n. 42 mm/kk).
  - Ennätyskuumin päivä 43,2 °C (26.12.2012, Santa Cruzin asema, EI Saúden
    asema — eri mittauspisteestä, kirjattu selvyyden vuoksi tähän).
- **Sanallinen vuodenkierto (varovainen, ei-numeerinen kuvaus, perustuu
  Wikipedian ilmasto-osioon):** trooppinen kuiva-kostea ilmasto (Köppen
  Aw): pitkiä rankkasadejaksoja joulukuusta maaliskuuhun, kuumia ja
  kosteita kesiä ja lauhoja, aurinkoisia mutta silti lämpimiä talvia —
  Rio ei tunne kylmää vuodenaikaa lainkaan.
- **Mittauspisteen huomautus (Petra/Siinai-ennakkotapaus, resepti):**
  Saúden asema on matala rantakaupunginosa (11 m), samalla korkeudella
  kuin 1873-ajan historiallinen ydin (Praça XV ym.) — EI vuoristo/rannikko-
  ristiriitaa toisin kuin Petrassa/Siinaissa, koska Rion vuoret
  (Corcovado, Sugarloaf, Tijuca) ovat kaupungin laidalla erillisinä
  huippuina, eivät koko kaupungin sijaintia määrittäviä.

---

## 6. Kuva-aiheet

Erityishuomio: **ei tunnistettavia ihmisiä missään kuvassa** (kaukaiset
pisteet ja selin olevat kelpaavat). Rio EI ole tuhoutunut kaupunki —
tuhoutuneen kaupungin nykykuvat -linjausta ei tarvita.

### 6.1 Avauskuvat (3) — teemasivun `historia` avaus

1. Candelárian kirkon julkisivu tai kupoli lähikuvassa — vahvin
   1873-ankkuri (Nosto H3).
2. Valongon laiturin arkeologinen kohde (UNESCO-kohde) ulkoa kuvattuna,
   ei ihmisiä.
3. Tijucan sademetsän puustoa/vesiputousta — reforestation-tarinan
   (Nosto K4) kuvitusta.

### 6.2 Kansikuvaehdokkaiden KATEGORIALISTAUS — 3 laajaa yleiskuvaa

Raamatun KANSIKARUSELLI-linjauksen (21.8.2026) mukaisesti: kolme LAAJAA
yleiskuvaa kaupungin ERI puolilta, ei yhtään yksityiskohtaa, sisäkuvaa,
reliefiä, ruokaa tai esinettä. Alla Commons-KATEGORIAT hakulähtökohdaksi
— EI valittuja tiedostoja, kirjoittaja tekee lopullisen valinnan ja
silmätarkistuksen:

1. **Siluetti kaukaa:** `Category:Aerial photographs of Rio de Janeiro`
   tai `Category:Panoramas of Rio de Janeiro` — Sokerileipä ja Corcovado
   Guanabaran lahden yli kuvattuna.
2. **Ranta/satama:** `Category:Guanabara Bay` tai `Category:Botafogo Bay`
   — laaja näkymä lahdesta tai rannasta, esim. Botafogon lahti (Rio
   itsekin käyttää tätä artikkelissaan kahtena historiallisena
   valokuvana 1869/1889, ks. osio 6.4 mahdollinen lisäpari).
3. **Maamerkki ympäristössään:** `Category:Views from Sugarloaf Mountain`
   tai `Category:Views of Corcovado` — laaja näkymä, jossa vuori näkyy
   osana ympäröivää kaupunkia ja lahtea, ei irrallisena yksityiskohtana.

### 6.3 Nosto-/jaksokuvat (8) — PD-ehdokkaita ESIVARMISTETTU tästä koosteesta

Seuraavat kolme on jo tarkistettu extmetadata-rajapinnasta tämän
koosteen aikana (lisenssi + koko + tekijä), koska ne osuivat suoraan
1873-kulman ytimeen. Kirjoittajan tulee silti katsoa kuva silmin ennen
käyttöä (kaupunkilehti.md:n vaatimus) — tässä on vain koneellinen
lisenssi-/kokovarmistus, ei silmätarkistusta.

1. **"Floresta da Tijuca e Pedra da Gávea ao fundo.jpg"** — Marc Ferrez
   (Instituto Moreira Salles -kokoelma). Lisenssi: Public domain
   (extmetadata.LicenseShortName). Koko: 9135×6964 px. Sopii Nosto
   K4:ään (Tijucan metsitys) tai avauskuvaksi. Lähderivi valmiiksi
   muodossa: "Marc Ferrez / Instituto Moreira Salles, Wikimedia Commons
   (PD)" (huom: tekijäkenttä extmetadata.Artist antoi tässä tapauksessa
   "Núcleo de digitalização / IMS" digitointilaitokselle — TARKISTA
   kirjoittaja, kumpi nimi on oikea Artist-kentän tulkinta ennen käyttöä,
   ks. osio 8 huomio 4).
2. **"Copacabana MET DP234153.jpg"** — Marc Ferrez (Metropolitan Museum
   of Art -kokoelma). Lisenssi: CC0 (extmetadata). Koko: 3909×2971 px.
   Tekijä: Marc Ferrez. Sopii K3:een (vuoret ennen patsasta/köysirataa)
   tai avauskuvaksi.
3. **"Ipanema, RJ, 1870.jpg"** — Marc Ferrez. Lisenssi: Public domain.
   **HYLÄTTY KOKO PUOLESTA:** vain 776×432 px, alittaa 1200 px:n rajan.
   Jos kirjoittaja löytää tästä suuremman version (esim. alkuperäinen
   Biblioteca Mário de Andrade -skannaus), se voisi silti kelvata.

Muita Marc Ferrez -aiheisia hakusanoja Commonsista (haku ei kattava,
`Category:Marc Ferrez` on laaja — kirjoittaja jatkakoon hausta):
"Rua São Clemente, ao fundo o morro do Corcovado" (kaksi versiota),
"Preparations for victory celebration.jpg" (Paraguayn sodan aiheinen,
EI sovi ikäsopivuus/sisältölinjaukseen sotakuvana — VÄLTÄ), kuvia myös
Instituto Moreira Salles -kategoriasta.

Loput 5 nosto-/jaksokuvaa (Candelária, Valongo, Real Gabinete, Praça XV/
Paço Imperial, karnevaali/kahvi) EIVÄT olleet tämän koosteen hakupiirissä
— kirjoittaja hakee ne itse Commons-kategorioista (`Category:Candelária
Church`, `Category:Valongo Wharf`, `Category:Royal Portuguese Reading
Room` tms.) reseptin mukaisella yksi-kerrallaan-haulla.

### 6.4 Ennen ja nyt -kuvaparin ehdokkaat

**TÄRKEÄ LÖYDÖS: Riolla on jo valmis, PELIIN TARKISTETTU ennen–nyt-pari**
tiedostossa `js/packs/southamerica-valokuvat.js` (avain `rio`, rivi n.
1130). Kaupunkilehti.md:n ohjeen mukaisesti tämä pari kannattaa siirtää
`ennenNyt`-kenttään sellaisenaan:

- **Vanha:** `Copacabana, Acervo do Instituto Moreira Salles.jpg`, vuosi
  "1895" (huom: EI 1873, mutta selvästi 1800-luvun jälkipuolisko ja
  reilusti harmaasävyrajan 1960 alla), lähde "Marc Ferrez / Instituto
  Moreira Salles, Commons (PD)". Nykyinen selite (valokuvatauluista)
  kuvaa Copacabanan lahtea autiona hiekkarantana ilman
  rakennuskantaa.
- **Uusi:** `BrunaPrado Praia de Copacabana Praia do Leme Rio de Janeiro
  RJ (40070449945).jpg`, lähde "Bruna Prado / MTur Destinos, Commons
  (public domain)". Nykyinen selite kertoo saman rannan nykytilasta
  (yhtenäinen tornitalorivi rannan takana).
- **Toimenpide kirjoittajalle:** kopioi tiedostonimet, vuosi ja
  lähderivit SELLAISENAAN `ennenNyt: [ vanha, uusi ]` -kenttään ja
  kirjoita KUMPAANKIN YKSI virke uudeksi seliteeksi (nykyiset selitteet
  ovat valokuvataulun sääntöjen mukaan useamman virkkeen mittaisia).
  Sama lähdekuva ("Copacabana...IMS.jpg") EI ole sama tiedosto kuin osion
  6.3 kohdan 2 CC0-versio (Copacabana MET DP234153.jpg) — eri arkistojen
  digitoinnit samasta Ferrez-negatiivista ovat mahdollisia, mutta
  tiedostonimet eroavat, joten kaksoiskäyttökielto ei laukea; kirjoittaja
  tarkistakoon silti, etteivät ne osoita PIKSELILTÄÄN samaan kuvaan
  ennen kuin käyttää molempia.
- **Sivuhuomio:** `southamerica-valokuvat.js`:n rio-lohkossa on jo myös
  kolme `lisat`-kuvaa (Selarónin portaat, São Cristóvãon markkinat,
  Rocinhan favela) — nämä ovat kaikki 2010–2024-ajan NYKYKUVIA eivätkä
  liity 1873-kulmaan; en ole ehdottanut niitä tähän koosteeseen, mutta ne
  ovat jo olemassa peliin tarkistettuina, jos matkailijan-oppaan osio
  tarvitsee nykyaikaisia kuvia.

### 6.5 Kuvien lähdehuomio

Toisin kuin New Yorkin koosteessa, tässä koosteessa TARKISTIN kolme
konkreettista Marc Ferrez -kuvaa extmetadata-rajapinnasta (lisenssi,
koko, tekijä — ks. 6.3), koska ne osuivat niin suoraan 1873-kulmaan.
En kuitenkaan silmätarkistanut mitään kuvaa Read-työkalulla enkä valinnut
lopullista kuvasarjaa — se on kirjoittajan työ kaupunkilehti.md:n
kuvasääntöjen mukaisesti.

---

## 7. Vanhan äänitteen ehdokkaat (PD, n. 1900–1925)

Etsin archive.orgin georgeblood-kokoelmasta (78 rpm -digitointi) Rioon/
Brasiliaan liittyvää PD-äänitettä `js/packs/vanhat-aanet.js`:n mallin
mukaisesti (kaupunki-id `rio`; tiedostoa ei ladata repoon, vain osoite).

**Ei löytynyt kelpaavaa osumaa.** Hakusanoilla "Rio OR Brazil OR samba OR
maxixe" georgeblood-kokoelmasta löytyi kymmenen osumaa, mutta yksikään ei
osunut 1900–1925-ikkunaan eikä ollut selvästi Rio-aiheinen: vanhin
löydetty osuma ("ALMA CARIOCA", Rion asukkaan sielua tarkoittava nimi)
ei antanut vuosilukua haussa, ja loput olivat 1929–1954-ajalta tai
muualta Latinalaisesta Amerikasta. Karnevaalin ja sambakoulujen musiikki
on joka tapauksessa liian myöhäistä (1900-luvun alkupuoli/keskivaihe)
1873-kulmaan sopiakseen (ks. Jakso 3: isoisän aikakauden karnevaali oli
vielä eurooppalainen naamiaisperinne ilman sambaa).

**Suositus kirjoittajalle:** jos aikaa on, tee lisähaku suoraan
Bibliotheca Nacional do Brasilin tai Instituto Moreira Sallesin
digitoiduista arkistoista varhaisesta maxixe- tai choro-musiikista
(1900-luvun alkuvuodet, ennen sambaa) — nämä eivät olleet tämän koosteen
hakupiirissä (archive.org georgeblood on kansainvälinen kokoelma, ei
brasilialainen erikoisarkisto).

---

## 8. Ristiriidat, epävarmuudet ja ei-Wikipedia-lähteet

1. **Neljä 1873-käännekohtaa eivät osu samaan kuukauteen** kuten New
   Yorkin viisi tapahtumaa — Rion 1873-kulma on rakenteellisempi
   (kaupunki OLI pääkaupunki koko vuoden, laki OLI voimassa koko vuoden,
   kirkko OLI kesken koko vuoden, metsitys OLI kesken koko vuoden) eikä
   perustu yksittäisiin päivämääriin samalla tavalla. Tämä tekee Riosta
   erilaisen mutta ei heikomman 1873-kohteen: sen sijaan että isoisä
   näkisi yhden tapahtuman, hän näkisi tilan, joka oli koko vuoden
   samanlainen.

2. **Real Gabinete Português de Leitura on OSITTAINEN anakronismi** —
   tärkeä varoitus samaan tapaan kuin New Yorkin Vapaudenpatsas. Itse
   instituutio perustettiin 1837 (olemassa 1873), mutta sen tunnettu,
   näyttävä neo-manueliininen rakennus (se, joka näkyy lähes kaikissa
   nykykuvissa hausta) rakennettiin vasta 1880–1887 — Emperor Pedro II
   laski peruskiven 10.6.1880 ja Isabel vihki rakennuksen käyttöön
   10.9.1887, 14 vuotta isoisän vierailun JÄLKEEN. Jos kirjoittaja
   käyttää Real Gabinetea nostossa tai kartalla, tekstin/kuvatekstin
   pitää olla tarkka siitä, ettei väitä isoisän nähneen NYKYISTÄ
   rakennusta. — en-Wikipedia "Royal Portuguese Cabinet of Reading",
   osio "History"

3. **Sugarloaf-köysiradan avausvuosi (1912) on tässä koosteessa
   YLEISTIETO** poimittuna "Rio de Janeiro" -pääartikkelin johdanto-
   lauseesta, EI vahvistettu suoraan artikkelista "Sugarloaf Cable Car".
   **Tarkistettava erikseen** ennen julkaisua samaan tapaan kuin New
   Yorkin Grand Central Terminal -huomautus.

4. **Marc Ferrez -kuvan "Floresta da Tijuca..." Artist-kenttä on
   moniselitteinen:** extmetadata.Artist antoi tekstiksi "Núcleo de
   digitalização / IMS" (digitointiyksikkö), ei suoraan "Marc Ferrez",
   vaikka Commonsin kuvasivun rakenne (title, description) nimeää
   valokuvaajaksi Marc Ferrezin ja ylläpitäjäksi/digitoijaksi Instituto
   Moreira Sallesin. Lehtityö-reseptin sääntö ("tekijä TÄSMÄLLEEN
   extmetadata.Artist-muodossa") viittaisi kirjaimellisesti "Núcleo de
   digitalização / IMS" -muotoon, mutta tämä tuntuu virheelliseltä
   valokuvan todelliselle tekijälle — **kirjoittajan pitää avata kuvasivu
   itse ja päättää oikea Artist-muotoilu**, samaan tapaan kuin resepti
   ohjeistaa CNG-lyhenteen avaamisessa.

5. **Praça XV / Praça Quinze de Novembro -nimen kaksinaisuus:**
   MediaWiki-API ohjasi haun "Praça XV" automaattisesti artikkeliin
   "Praça Quinze de Novembro" (`redirects=1`). Tämä ei ole ongelma
   koordinaattien kannalta (sama piste), mutta kirjoittajan kannattaa
   käyttää täyttä nimeä "Praça Quinze de Novembro" tai vakiintunutta
   lyhennettä "Praça XV" johdonmukaisesti koko lehdessä.

6. **En löytänyt tarkkaa päivämäärää isoisän Rion-vierailulle** — kaari
   ei ole vielä kirjoitettu tälle laudalle (Raamattu, "Kaupungit":
   "UUSIIN KAUPUNKEIHIN JA MAIHIN EI VIELÄ TARINAKAARTA"). Kaikki tämän
   koosteen 1873-viittaukset koskevat KOKO vuotta 1873, eivät yksittäistä
   kuukautta (ks. huomio 1) — tämä tekee ajoituksesta joustavamman kuin
   New Yorkissa, koska mikä tahansa 1873-vierailun ajankohta sopii yhtä
   hyvin.

7. **Etäisyydet ja suunnat osiossa 4 on laskettu koneellisesti**
   (Python-skripti, haversine-kaava, R=6371 km), EI käsin. Suunnat on
   pyöristetty lähimpään kahdeksasosaan (P/KO/I/KA/E/LO/L/LU) — kolme
   kohdetta (Real Gabinete, Candelária, Valongo) osuu suuntien rajalle
   (ero alle 2° lähimpään vaihtoehtoiseen ilmansuuntaan), joten
   kartantekijä voi tarkentaa nämä silmämääräisesti kartalla.

8. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
   tekstiksi** merkkimäärätavoitteiden mukaan, merkkimäärät laskettu
   KONEELLISESTI Python-skriptillä (`len()`, tiedosto `rio-texts.py`
   scratchpadissa). Nostot K1–K4, H1–H4 ovat kaikki 440–660 merkin
   sisällä (kaupunkilehti.md:n mitta) — H3 vaati yhden lisäyksen
   ensimmäisestä luonnoksesta (426→505 merkkiä) päästäkseen minimiin.
   Sivujen johdannot (215 ja 208 merkkiä) noudattavat Raamatun 20.8.2026
   päivitettyä "1–2 virkettä, lyhyt" -sääntöä, EIVÄT ARTIKKELIT-paketin
   700–1100 mrk intro-vaatimusta — sitä en ole kirjoittanut, koska se on
   kirjoittajan (Opuksen) oma teksti eikä faktakoosteen tehtävä.

9. **Orjuuden käsittely on tarkistettu spec-mantereet.md:n ja Raamatun
   linjauksia vasten kahteen kertaan** kirjoitusvaiheessa: mikään nosto
   ei kuvaile väkivaltaa yksityiskohtaisesti (esim. K1 mainitsee
   orjamäärät ja lain kirjaimen, ei fyysistä kohtelua), ja jokainen
   maininta on aikakauden tapahtuma tai laki, ei nykypäivän kommentti.
   Tämä poikkeaa tietoisesti "kaunistelemattomuuden" ja
   "yksityiskohtien välttämisen" tasapainosta — jos kirjoittaja katsoo,
   että jokin kohta silti ylittää ikäsopivuusrajan, se on oma harkinta,
   jota en ole tehnyt puolesta.

10. **Valongo Wharf -orjamäärä (500 000–1 000 000) on Wikipedian OMA
    ristiriitainen ilmaisu** — pääartikkeli "Rio de Janeiro" sanoo
    "between 500 thousand and one million Africans", ja tämä laaja
    haarukka on kirjoitettu auki sellaisenaan Nosto K1:een reseptin
    ohjeen mukaisesti ("Wikipedian sisäiset ristiriidat kirjoitetaan
    auki") sen sijaan että valittaisiin yksi luku.
