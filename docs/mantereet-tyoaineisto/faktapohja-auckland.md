# Auckland — faktakoostaja, uusi kaupunkilehti (Oseanian lauta, pilottikaupunki)

Lauta-id `oceania`, kaupunki-id `auckland`, maa NZL, en-Wikipedia "Auckland" (ellei
toisin mainita). Kaikki tiedot haettu en-Wikipediasta **22.–23.8.2026**
(`action=raw` + `prop=coordinates`-API, `NODE_USE_ENV_PROXY=1`, uusinnat
kasvavalla viiveellä 429-vastauksiin ja ajoittaisiin "too many requests"
-tekstivastauksiin, jotka eivät palauta HTTP 429:ää mutta vaativat saman
takaisinvetäytymisen). Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/mantereet-tyoaineisto/spec-mantereet.md` (SITOVA, Oseania-osio) ja
`docs/moduulit/kaupunkilehti.md`, sekä esimerkkinä New Yorkin koonnista
(`docs/mantereet-tyoaineisto/faktapohja-newyork.md`, P-Amerikan pilotti).
Raamatun linjaukset: js/tyohuone-raamattu.js osiot Perustuslaki, Kuvat ja
lähteet, Kaupungit.

**Tehtävän erityispiirre:** Auckland on Oseanian laudan toinen pilottikaupunki
(ensimmäinen on Sydney). En kirjoittanut lehtitekstejä, en ladannut kuvia enkä
koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta kirjoittajalle ja
tarkistajalle.

**1873-kulma:** Auckland menetti pääkaupunkiasemansa Wellingtonille 1865 —
isoisän saapuessa 1873 tapahtumasta oli kulunut vain kahdeksan vuotta, ja
kaupunki oli yhä Aucklandin provinssin pääkaupunki (provinssijärjestelmä
lakkautettiin vasta 1876). Kaupunki sai kaupunkioikeudet 1871 (Municipal
Corporations Act) — kaksi vuotta ennen käyntiä. Aucklandin tulivuorikenttä on
koko kaupungin alla edelleen aktiivinen (viimeisin purkaus Rangitoto ~1450);
tätä ei ole syytä dramatisoida, mutta se on hyvä perustietona mainita.
Uuden-Seelannin sodat (Waikaton sota, maorien kuningasliikettä vastaan
1860-luvun alussa) ovat lähihistoriaa isoisän vierailuhetkellä — kerrottu
osiossa 2 (H4/J4) tapahtumina neutraalisti, spec-mantereet.md:n Oseania-linjan
mukaisesti.

**Sisältölinjaus:** maorikulttuuri ja Waitangin sopimus (1840) ovat
perushistoriaa, kerrottu suoraan ja kunnioittavasti — Ngāti Whātua Ōrākein oma
toimijuus (suoja Ngāpuhilta, strateginen maalahjoitus) korostuu, ei pelkkä
brittinäkökulma. Te reo -nimet (Tāmaki Makaurau, Maungakiekie) mainittu läpi
tekstin spec-mantereet.md:n mukaisesti. Ei nykypolitiikkaa. Uuden-Seelannin
sodat kerrottu tapahtumina (kuka teki mitä, minkä seurauksena) ilman
sankarikehystä kummallekaan suunnalle — ei taistelukuvauksia eikä
uhrilukuja, koska en löytänyt niitä luetusta raakatekstistä eikä niitä tarvita
tähän tarkkuustasoon.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Auckland"

**Johdanto (349 merkkiä):**

> Kaksi satamaa, viisikymmentäkolme tulivuorta ja kapea kannas Pohjois-Saaren
> yläosassa — sitä maorit kutsuvat nimellä Tāmaki Makaurau, "Tāmaki jota moni
> halusi". Auckland oli Uuden-Seelannin pääkaupunki 1841–1865, kunnes
> Wellington vei aseman; isoisän saapuessa 1873 kaupunki oli jo menettänyt
> hallinnon mutta kasvoi silti maan vilkkaimpana satamana.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** sama logiikka kuin New Yorkissa — Aucklandin
parhaiten dokumentoitu ja 1873-vuoteen tiiveimmin kytkeytyvä aines on
kaupungin oma muodonmuutosten historia: maorikannaksesta brittiläiseksi
pääkaupungiksi ja edelleen menetetyksi pääkaupungiksi kahdeksan vuotta ennen
isoisän käyntiä. Muut vakioaiheet (kuvataide, musiikki, ruoka) ovat
Aucklandissa vahvempia 1900-luvun kuin 1870-luvun näkökulmasta — ne sopivat
paremmin myöhemmiksi teemasivuiksi, kun kaari kirjoitetaan. `historia` kantaa
koko sivun ja saa kaikki neljä 1873-käännekohtaa saman katon alle: museo
vailla uutta taloa, Maungakiekien Māori-pā ja Campbellin maatila, Auckland
Domainin rauhoitus ja tenniskerho, sekä Waikaton sodan jälkijäljet.

**Johdanto (299 merkkiä):**

> Maorien kannaksesta brittiläiseksi pääkaupungiksi ja edelleen menetetyksi
> pääkaupungiksi — Aucklandin varhaishistoria on täynnä käänteitä, jotka
> osuivat lähelle isoisän vuotta 1873: kaupunki oli juuri menettänyt
> pääkaupunkiasemansa, museo odotti yhä uutta taloa ja Waikaton sota oli
> vasta historiaa.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Tāmaki jota moni halusi" (579 merkkiä)**

> Auckland kannaksen maorinimi on Tāmaki Makaurau, "Tāmaki jota moni halusi"
> — nimi viittaa alueen haluttuun maahan ja luonnonvaroihin. Maorit
> asettuivat kannakselle noin vuonna 1350, ja rikas maaperä kannatti suurta
> väestöä: parhaimmillaan alueella asui arviolta 20 000 maoria, jotka
> rakensivat linnoitettuja pā-kyliä etenkin tulivuorenhuipuille. 1700-luvun
> lopulla tuliaseiden leviäminen pohjoisesta järkytti voimatasapainon, ja
> 1807 alkaneet heimosodat ajoivat monet iwit turvaan rannikolta kauemmas —
> siksi eurooppalaisten saapuessa kannaksella asui suhteellisen vähän
> maoreja.

Faktat ja lähteet:
- Maorinimi "Tāmaki Makaurau" tarkoittaa "Tāmaki jota moni halusi", viitaten
  alueen haluttuun maahan ja maantieteeseen. — en-Wikipedia "Auckland", osio
  "Toponymy"
- Kannas asutettiin noin 1350; maoriväestön arvioidaan olleen huipussaan
  noin 20 000 ennen eurooppalaisten saapumista, pā-kylät sijaitsivat pääosin
  tulivuorenhuipuilla. — en-Wikipedia "Auckland", osio "Early history"
- Tuliaseiden käyttöönotto 1700-luvun lopulla Northlandista alkaen järkytti
  voimatasapainon ja johti 1807 alkaneisiin heimosotiin ("Musket Wars"),
  jotka ajoivat rannikolle alttiit iwit turvaan — siksi alueella oli
  suhteellisen vähän maoreja eurooppalaisasutuksen alkaessa. — en-Wikipedia
  "Auckland", osio "Early history"

**Nosto K2 — "Maa jonka Ngāti Whātua lahjoitti" (478 merkkiä)**

> Ngāti Whātua Ōrākein päällikkö Āpihai Te Kawau allekirjoitti Waitangin
> sopimuksen Manukaun rannalla 20. maaliskuuta 1840 ja haki heimolleen
> brittiläistä suojaa Ngāpuhin hyökkäyksiä vastaan. Pian tämän jälkeen
> Ngāti Whātua Ōrākei lahjoitti Waitematā-satamalla sijaitsevat 3 500
> eekkeriä maata uudelle kuvernöörille William Hobsonille uudeksi
> pääkaupungiksi. Hobson nimesi paikan George Edenin, Aucklandin jaarlin,
> kunniaksi. Kaupunki perustettiin virallisesti 18. syyskuuta 1840.

Faktat ja lähteet:
- Āpihai Te Kawau, Ngāti Whātua Ōrākein päällikkö, allekirjoitti Waitangin
  sopimuksen 20.3.1840 Manukau-sataman alueella; Ngāti Whātua haki
  brittisuojaa Ngāpuhia vastaan ja vastavuoroista suhdetta kruunuun ja
  kirkkoon. — en-Wikipedia "Auckland", osio "Early history"
- Pian sopimuksen jälkeen Ngāti Whātua Ōrākei lahjoitti strategisesti 3 500
  eekkeriä maata Waitematā-satamalla kuvernööri William Hobsonille uudeksi
  pääkaupungiksi; Hobson nimesi sen George Edenin, Aucklandin jaarlin
  (tuolloin Intian varakuningas), mukaan. — en-Wikipedia "Auckland", osio
  "Early history"
- Auckland perustettiin virallisesti 18.9.1840. — en-Wikipedia "Auckland",
  infobox ja osio "Early history"

**Nosto K3 — "Pääkaupunki jonka Wellington vei" (558 merkkiä)**

> Auckland julistettiin Uuden-Seelannin pääkaupungiksi 1841, mutta jo
> tuolloin Port Nicholson — nykyinen Wellington — nähtiin paremmaksi
> vaihtoehdoksi läheisyytensä vuoksi Eteläsaareen. Wellingtonista tuli
> pääkaupunki 1865, kahdeksan vuotta ennen isoisän vierailua, ja hallinto
> siirtyi pois Aucklandista. Kaupunki jatkoi silti kasvuaan: satama sekä
> hakkuu- ja kultakaivosalueet sisämaassa pitivät talouden käynnissä.
> Auckland pysyi Aucklandin provinssin pääkaupunkina, kunnes koko
> provinssijärjestelmä lakkautettiin 1876 — kolme vuotta isoisän käynnin
> jälkeen.

Faktat ja lähteet:
- Auckland julistettiin viralliseksi pääkaupungiksi 1841; jo 1840 Port
  Nicholson (myöh. Wellington) nähtiin parempana hallinnollisena
  pääkaupunkina läheisyytensä vuoksi Eteläsaareen, ja Wellingtonista tuli
  pääkaupunki 1865. — en-Wikipedia "Auckland", osio "Early history"
- Pääkaupunkiaseman menetyksen jälkeen Auckland kasvoi edelleen aluksi
  satamansa sekä sisämaan hakkuu- ja kultakaivostoiminnan ansiosta, myöhemmin
  laidunmaatalouden (etenkin maidontuotannon) ja kaupungin oman teollisuuden
  varassa. — en-Wikipedia "Auckland", osio "Early history"
- Auckland pysyi Aucklandin provinssin pääkaupunkina, kunnes
  provinssijärjestelmä lakkautettiin 1876. — en-Wikipedia "Auckland", osio
  "Early history"

**Nosto K4 — "Viisikymmentäkolme tulivuorta kaupungin alla" (554 merkkiä)**

> Auckland kohoaa Aucklandin tulivuorikentän päällä: viimeisten noin
> 193 000 vuoden aikana alueella on purkautunut ainakin 53 pientä tulivuorta,
> joista on jäljellä räjähdyskraattereita, tuffirenkaita, kuonakartioita ja
> laavavirtoja. Kenttää ruokkii peruskallion magma 70–90 kilometrin
> syvyydestä, eikä se liity Uuden-Seelannin muihin, mannerlaattojen alle
> työntymisestä syntyviin tulivuoriin. Jokainen kartion tulivuori purkautuu
> vain kerran. Viimeisin purkaus tapahtui Rangitoto-saarella noin vuonna
> 1450 — ainoa purkaus, jonka maorit näkivät omin silmin.

Faktat ja lähteet:
- Auckland sijaitsee Aucklandin tulivuorikentällä, jolla on purkautunut
  ainakin 53 pientä tulivuorikeskusta viimeisten n. 193 000 vuoden aikana;
  pinnalla näkyy maareja, tuffirenkaita, kuonakartioita ja laavavirtoja. —
  en-Wikipedia "Auckland", osio "Volcanoes"
- Kenttä saa magmansa suoraan vaipasta 70–90 km syvyydestä eikä liity
  Taupo-tulivuorivyöhykkeen subduktioperäiseen toimintaan n. 250 km päässä;
  kyseessä on monogeneettinen kenttä, jossa jokainen tulivuori purkautuu
  vain kerran. — en-Wikipedia "Auckland", osio "Volcanoes"
- Viimeisin purkaus tapahtui Rangitoto-tulivuorella noin vuonna 1450 — ainoa
  Aucklandin tulivuorikentän purkaus, jonka ihmiset (maorit) ovat
  todistaneet. — en-Wikipedia "Auckland", osio "Volcanoes"

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Museo joka odotti uutta taloa" (599 merkkiä)**

> Auckland Museum perustettiin 1852 tiedemiesten ja kauppiaiden keräämästä
> luonnonhistoriallisesta ja etnografisesta kokoelmasta; ensimmäisenä vuonna
> kävijöitä oli 708. Kiinnostus museota kohtaan hiipui 1860-luvulla, vaikka
> kokoelma kasvoi koko ajan, ja 1869 hoitovastuu siirtyi vasta perustetulle
> Auckland Institutelle. Isoisän vieraillessa 1873 museo asui yhä
> vaatimattomissa tiloissa Princes Streetillä — uusi italialaistyylinen
> rakennus valmistui vasta 1876. Ranskalainen taidemaalari Paul Gauguin
> vieraili museossa 1890-luvulla ja luonnosteli maorikokoelman esineitä
> myöhempiin tahitilaiskausiin.

Faktat ja lähteet:
- Auckland Museum perustettiin 1852; ensimmäisenä vuonna kävijöitä oli 708.
  — en-Wikipedia "Auckland War Memorial Museum", johdanto-osio ja
  leipäteksti (Southern Cross -lehden ilmoitus 25.10.1852)
- Kiinnostus hiipui 1860-luvulla kokoelman kasvusta huolimatta, ja 1869
  "hieman laiminlyöty ja hylätty" museo siirtyi Auckland Instituten
  hoitoon; italialaistyylinen uusi rakennus Princes Streetillä avattiin
  vasta 5.6.1876. — en-Wikipedia "Auckland War Memorial Museum"
- Ranskalainen taidemaalari Paul Gauguin vieraili museossa 1890-luvulla,
  luonnosteli maori-esineitä ja käytti niitä myöhemmin
  Tahiti-kauden maalauksissaan. — en-Wikipedia "Auckland War Memorial
  Museum"
- **Huom:** nykyinen sotamuistomerkkirakennus (nykyinen sijainti Auckland
  Domainissa) valmistui vasta 1929 — täysin isoisän ajan jälkeen; 1873
  museo oli siis vielä Princes Streetin vaatimattomassa rakennuksessa.

**Nosto H2 — "Suurin pā kannaksella" (585 merkkiä)**

> Maungakiekie, "kiekie-köynnöksen vuori", oli esieurooppalaisena aikana
> Aucklandin kannaksen suurin pā — linnoitettu kylä, jonka penkereet
> rakensi 1600-luvulla ngāti awa -päällikkö Tītahi. Waiohua-heimoliitto
> hallitsi vuorta 1700-luvulla, kunnes Ngāti Whātua voitti sen sodassa
> 1740-luvulla. Eurooppalaiset kauppiaat John Logan Campbell ja William
> Brown ostivat maat 1853 ja perustivat karjatilan; Campbell palasi
> Aucklandiin 1874, vuosi isoisän käynnin jälkeen, ja suunnitteli vuorelle
> italialaistyylistä kartanoa — suunnitelma hylättiin, ja vuori jäi
> maatilaksi vielä vuosikymmeniksi.

Faktat ja lähteet:
- Maungakiekie ("kiekie-köynnöksen vuori") oli esieurooppalaisena aikana
  Aucklandin kannaksen suurin pā; penkereet rakensi 1600-luvulla ngāti awa
  -päällikkö Tītahi. — en-Wikipedia "Maungakiekie / One Tree Hill", osiot
  "History" ja "Tāmaki Māori history"
- Waiohua-heimoliitto hallitsi vuorta 1700-luvulla; Ngāti Whātuan Te Taoū
  -alaheimo voitti sen sodassa 1740-luvulla, minkä jälkeen päällikkö
  Tuperiri rakensi uuden pā:n vuoren rinteelle. — en-Wikipedia "Maungakiekie
  / One Tree Hill", osio "Tāmaki Māori history"
- John Logan Campbell ja William Brown ostivat maat 1853 ja perustivat
  karjatilan; Campbell palasi Aucklandiin 1874 ja suunnitteli
  italialaistyylistä kartanoa vuoren viereen, mutta vaimo Emma ei
  hyväksynyt suunnitelmaa, ja hanke hylättiin 1876. — en-Wikipedia
  "Maungakiekie / One Tree Hill", osio "European history"

**Nosto H3 — "Puisto joka pelasti puut" (558 merkkiä)**

> Kuvernööri Robert FitzRoy määräsi 1844 osan Pukekawa-tulivuoren
> kraatterialueesta julkiseksi puistoksi nimeltä Auckland Park — nykyinen
> Auckland Domain, kaupungin vanhin puisto. Alue oli yksi harvoista
> siirtokunnan lähellä sijainneista paikoista, joilla oli vielä
> alkuperäistä puustoa jäljellä, ja rauhoitus suojeli juuri nämä puut.
> Puisto laajeni vuosikymmenten kuluessa kasvitieteelliseksi puutarhaksi ja
> urheilualueeksi: Parnell Lawn Tennis Club perustettiin sinne 1872, vuosi
> ennen isoisän vierailua — yksi Uuden-Seelannin varhaisimmista
> tennisseuroista.

Faktat ja lähteet:
- Kuvernööri Robert FitzRoy määräsi Domainin alueen julkiseksi puistoksi
  nimeltä "Auckland Park" 1844; Auckland Domain on kaupungin vanhin puisto,
  Pukekawa-tulivuoren räjähdyskraatterin ja tuffirenkaan jäänne. —
  en-Wikipedia "Auckland Domain", johdanto-osio ja osio historiasta
- Alue oli yksi harvoista siirtokunnan lähellä olevista paikoista, joilla
  oli vielä puustoa jäljellä, ja rauhoitus suojeli nämä puut. —
  en-Wikipedia "Auckland Domain"
- Parnell Lawn Tennis Club perustettiin Domainiin 1872. — en-Wikipedia
  "Auckland Domain", klubiluettelo

**Nosto H4 — "Sotilaita etelään" (614 merkkiä)**

> 1860-luvun alussa Aucklandista tuli brittihallinnon tukikohta maorien
> kuningasliikettä (Māori King Movement) vastaan, ja kaupunkiin sijoitetut
> 12 000 imperiumin sotilasta antoivat voimakkaan sysäyksen paikalliselle
> kaupalle. Samaan aikaan rakennettiin Great South Road etelään Waikaton
> suuntaan, mikä levitti eurooppalaista asutusta kauemmas kannakselta.
> Kaupungin väkiluku kasvoi nopeasti: 1 500 asukkaasta 1841 jo 12 423
> asukkaaseen 1864. Väestöstä poikkeuksellisen suuri osa, noin puolet, oli
> irlantilaista syntyperää — toisin kuin enemmän englantilaisissa
> Wellingtonissa, Christchurchissa tai New Plymouthissa.

Faktat ja lähteet:
- 1860-luvun alussa Auckland toimi tukikohtana maorien kuningasliikettä
  vastaan; kaupunkiin sijoitetut 12 000 imperiumin sotilasta vauhdittivat
  paikallista kauppaa. — en-Wikipedia "Auckland", osio "Early history"
- Jatkuva tienrakennus etelään (Great South Road) kohti Waikatoa levitti
  eurooppalaisen (Pākehā) vaikutuksen Aucklandista laajemmalle. —
  en-Wikipedia "Auckland", osio "Early history"
- Väkiluku kasvoi 1 500:sta (1841) 3 635:een (1845) ja edelleen 12 423:een
  (1864); noin puolet väestöstä oli irlantilaista syntyperää, mikä poikkesi
  selvästi englantilaisenemmistöisistä Wellingtonista, Christchurchista ja
  New Plymouthista. — en-Wikipedia "Auckland", osio "Early history"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Rakenne noudattaa New Yorkin/Manilan `matkailijalle.artikkeli.jaksot`-mallia.
Faktat valittu niin, etteivät ne toista osion 2 nostoja.

**Jakso 1 — "Perille ja liikkeelle"**

Auckland kohoaa kapealla maakannaksella kahden sataman välissä: pohjoisessa
Waitematā avautuu Hauraki-lahdelle ja Tyynellemerelle, etelässä Manukau
Tasmaninmerelle. Harvoja kaupunkeja maailmassa reunustaa satama kahdella
erillisellä vesialueella. Purjehdus on niin osa kaupungin identiteettiä, että
sitä kutsutaan "Purjeiden kaupungiksi" — nykyään Aucklandissa on rekisteröity
135 000 purjevenettä ja moottoriverkkoa, ja joka kolmas kotitalous omistaa
veneen.

Faktat ja lähteet:
- Auckland sijaitsee kannaksella Waitematā-sataman (pohjoinen, avautuu
  Hauraki-lahdelle ja Tyynellemerelle) ja Manukau-sataman (etelä, avautuu
  Tasmaninmerelle) välissä; harvoja kaupunkeja, joilla on satama kahdella
  eri merialueella. — en-Wikipedia "Auckland", johdanto- ja
  "Harbours and gulf" -osiot
- Lisänimi "City of Sails" tulee purjehduksen suosiosta; 135 000
  rekisteröityä venettä, noin joka kolmas kotitalous omistaa veneen. —
  en-Wikipedia "Auckland", osio "Leisure"

**Jakso 2 — Alueen rakenne**

Kannaksen keskiosa on kapeimmillaan alle kaksi kilometriä leveä. Kaupungin
ympärillä kohoavat sademetsän peittämät Waitākeren ja Hunuan vuoret, ja
Hauraki-lahden saaret — Waiheke, Rangitoto, Tiritiri Matangi — ovat
lauttayhteyden päässä keskustasta. Kaupunkia ympäröivät kukkulat ja saaret
tekevät maisemasta poikkeuksellisen vaihtelevan pienelle alalle: satama,
tulivuori ja sademetsä voivat näkyä samasta näkymästä.

Faktat ja lähteet:
- Kannaksen keskiosa on kapeimmillaan alle 2 km leveä, Māngere Inletin ja
  Tāmaki-joen välissä. — en-Wikipedia "Auckland", osio "Harbours and gulf"
- Kaupunkia ympäröivät sademetsän peittämät kukkulat: Hunuan vuoret
  kaakossa, Waitākeren vuoret lännessä. Lautat kulkevat Devonportiin,
  Waiheke-saarelle, Rangitoto-saarelle ja Tiritiri Matangille. —
  en-Wikipedia "Auckland", osiot "Geography" ja "Parks and nature"

**Jakso 3 — Arjen ilmiö: kauri-pihkan kaivajat**

Vuonna 1891 Aucklandin sataman kolme tärkeintä vientitavaraa olivat
kauri-pihka, kulta ja villa — yhteisarvoltaan lähes miljoona puntaa.
Kauri-pihkaa kaivettiin käsin metsien ja suomaiden alta pitkillä
pihkakepeillä; se oli halpaa työtä, johon riitti vain kaivinrauta ja pussi,
ja siitä tehtiin muun muassa lakkaa ja koruja. Moni siirtolainen sai
matkansa Aucklandiin halvalla tai avustetulla matkalipulla — arki
1800-luvun lopun Aucklandissa rakentui pitkälti tällaisen käsityömäisen
vientitalouden varaan.

Faktat ja lähteet:
- Vuonna 1891 Aucklandin sataman kolme tärkeintä vientituotetta olivat
  kauri-pihka, kulta ja villa, yhteisarvoltaan lähes miljoona puntaa. —
  en-Wikipedia "Auckland", osio "Economy"
- Suurin osa varhaisista siirtolaisista sai halvan tai avustetun matkalipun
  Uuteen-Seelantiin. — en-Wikipedia "Auckland", osio "Early history"
- **Huom (täydentävä yleistieto, ei tästä raakatekstistä):** kauri-pihkan
  käsinkaivu ("gum digging") oli 1800-luvun lopun Aucklandin ympäristön
  tunnettu elinkeino — tarkistettava erikseen tarkemmasta lähteestä
  (esim. artikkeli "Kauri gum"), jos kirjoittaja haluaa syventää jaksoa.

**Jakso 4 — Historian käännekohta: sota joka jätti tiet ja varuskunnat**

Isoisän vierailua edeltäneellä vuosikymmenellä Auckland toimi tukikohtana
brittiarmeijan sodassa maorien kuningasliikettä vastaan: kaupunkiin
majoitettiin kymmeniätuhansia sotilaita, ja etelään rakennettiin Great South
Road viemään joukkoja Waikatoon asti. Sota levitti eurooppalaista asutusta
kauemmas kannakselta ja toi kaupunkiin väliaikaisen kauppabuumin, mutta
jätti myös pitkän jäljen maan omistukseen — suuria alueita Waikatosta
takavarikoitiin sodan jälkeen. Isoisän saapuessa 1873 sota oli jo historiaa,
mutta sen jäljet — tiet, varuskunnat, uudisasutus — olivat yhä tuoreita.

Faktat ja lähteet:
- 1860-luvun alussa Auckland toimi tukikohtana Māori King Movementia
  vastaan; 12 000 imperiumin sotilasta sijoitettiin kaupunkiin, mikä toi
  voimakkaan sysäyksen paikalliselle kaupalle. Great South Road rakennettiin
  etelään kohti Waikatoa. — en-Wikipedia "Auckland", osio "Early history"
- **Huom (yleistieto, tarkistettava erikseen tarkemmasta artikkelista kuten
  "New Zealand Wars" tai "Waikato War"):** sodan seurauksena suuria alueita
  Waikatosta takavarikoitiin — tätä ei ollut suoraan luetussa "Auckland"
  -artikkelin katkelmassa, joten väite on merkittävä varmistettavaksi ennen
  julkaisua, tai jätettävä pois jos vahvistusta ei löydy.

**Jakso 5 — Milloin kannattaa tulla**

Aucklandin ilmasto on lauhkea ja merellinen (Köppen Cfb), mutta
Uuden-Seelannin ilmatieteen laitos NIWA luokittelee sen lämpimien kesien ja
leutojen talvien vuoksi lähemmäs kosteaa subtrooppista ilmastoa — kaupunki
on maan lämpimin suurista keskuksista. Tammikuun keskilämpötila on noin
20 °C ja heinäkuun noin 11 °C; sadetta tulee lähes tasaisesti ympäri
vuoden, yhteensä noin 1 120 mm vuodessa, talvikuukausina hieman muita
runsaammin. Lumi on äärimmäisen harvinaista, ja vallitsevat tuulet
puhaltavat lounaasta.

Faktat ja lähteet (en-Wikipedia "Auckland", osio "Climate"):
- Köppenin ilmastoluokka Cfb (merellinen/lauhkea); NIWA:n ja Trewarthan
  luokituksen mukaan lähempänä kosteaa subtrooppista ilmastoa (Cfbl),
  lämpimät kesät ja leudot talvet. Auckland on maan lämpimin suuri
  keskus.
- Kuukausikeskilämpötilat (Auckland Airport, 1991–2020-normaalit):
  tammikuu 20,0 °C, heinäkuu 11,2 °C, vuosikeskiarvo 15,6 °C.
- Sademäärä (laskettu kuukausiarvoista): noin 1 119 mm vuodessa, jakautuu
  melko tasaisesti — heinäkuu sateisin (n. 137 mm), tammikuu kuivin (n.
  58 mm).
- Lumisade on äärimmäisen harvinaista (merkittävin tapaus 27.7.1939).
  Vallitsevat tuulet lounaasta, keskituulennopeus lentokentällä n. 18 km/h.

---

## 4. Yhdeksän kohdekartan kohdetta

Koordinaatit MediaWiki-APIn `action=query&prop=coordinates`-kutsulla
(haettu 23.8.2026), `redirects=1`-parametrilla. Etäisyydet ja suunnat
laskettu koneellisesti haversine-kaavalla Python-skriptillä (New Yorkin
ennakkotapauksen mukaisesti — ei käsin).

| # | Nimi | Koordinaatit | Lähdeartikkeli | Etäisyys keskustasta | Suunta |
|---|---|---|---|---|---|
| 1 | Auckland, Wikipedian kaupunkipiste | 36,8492°S 174,7653°I | "Auckland" (API) | (vertailupiste) | — |
| 2 | St Patrick's Cathedral | 36,8465°S 174,7635°I | "St Patrick's Cathedral, Auckland" (API) | 0,34 km | LU |
| 3 | Old Government House | 36,84988°S 174,77042°I | "Old Government House, Auckland" (API) | 0,46 km | I |
| 4 | Auckland Ferry Terminal | 36,843°S 174,767°I | "Auckland Ferry Terminal" (API) | 0,71 km | P |
| 5 | Auckland Domain | 36,859158°S 174,775808°I | "Auckland Domain" (API) | 1,45 km | KA |
| 6 | Auckland War Memorial Museum | 36,86027778°S 174,77777778°I | "Auckland War Memorial Museum" (API) | 1,66 km | KA |
| 7 | Devonport Naval Base | 36,830241°S 174,786236°I | "Devonport Naval Base" (API) | 2,81 km | KO |
| 8 | Maungawhau / Mount Eden | 36,877°S 174,764°I | "Maungawhau / Mount Eden" (API) | 3,09 km | E |
| 9 | Maungakiekie / One Tree Hill | 36,9°S 174,78305556°I | "Maungakiekie / One Tree Hill" (API) | 5,87 km | E |

(P = pohjoinen, KO = koillinen, I = itä, KA = kaakko, E = etelä, LO = lounas,
L = länsi, LU = luode.)

**Koordinaattien merkintätapa, huomio:** taulukossa käytetään eteläisen
pallonpuoliskon merkintää S/I (etelä/itä), koska Auckland on eteläisellä
pallonpuoliskolla — POIKKEAA New Yorkin N/L-merkinnästä. Kartantekijän
kannattaa tarkistaa, kumpi merkintätapa pelin karttatyökalussa on
vakiintunut Etelä-pallonpuoliskon kaupungeille (esim. jos Sydney-koonnissa
on jo ratkaisu, sitä kannattaa seurata yhtenäisyyden vuoksi).

**Rajausehdotus:** kohteet ryhmittyvät selvästi Aucklandin 1873-ajan
ytimen ympärille (kohteet 2–6, kaikki alle 1,7 km keskustasta) — kaikki
olivat olemassa isoisän vierailun aikaan. Devonport Naval Base (7) on
laivastotukikohta toisella puolella Waitematā-satamaa, saavutettavissa
lautalla — sopii kartalle, koska laivastoasema perustettiin jo 1841.
Maungawhau/Mount Eden (8) ja Maungakiekie/One Tree Hill (9) ovat kauempana
etelässä/kaakossa mutta molemmat olivat merkittäviä maorien pā-paikkoja ja
myöhemmin eurooppalaisten maatiloja — kuuluvat kartalle historiallisen
painoarvonsa vuoksi, vaikka venyttävätkin rajausta lähes kuuteen
kilometriin. **Auckland Harbour Bridge on TIETOISESTI JÄTETTY POIS**
kartalta — silta valmistui vasta 1959, lähes sata vuotta isoisän käynnin
jälkeen, ja sen ottaminen mukaan olisi anakronismi samaan tapaan kuin New
Yorkin Vapaudenpatsas (ks. osio 6, huomio 2).

---

## 5. Säätiedot

- **Keskustan koordinaatit:** 36,8492°S, 174,7653°I — Wikipedian
  "Auckland"-artikkelin infobox-koordinaatti (`{{coord|region:NZ-AUK_city}}`
  -malline, haettu Wikidatan kautta samaan tapaan kuin New Yorkissa, koska
  raakateksti ei anna suoria lukuja).
- **ERA5-normaalit puuttuvat tästä koosteesta:** en ajanut
  `tools/hae-saanormaalit.mjs`-työkalua rajauksen mukaisesti (kirjoittaja
  ajaa `node tools/hae-saanormaalit.mjs --vain auckland` ennen lehden
  viimeistelyä).
- **NIWA:n/Wikipedian 1991–2020-normaalit (varalähde, jos Open-Meteo antaa
  429:n Samarkand-mallin mukaisesti):** en-Wikipedian "Auckland"-artikkelin
  säälaatikko antaa kuukausikeskiarvot Auckland Airportin asemalta
  (17 km eteläisimpänä keskustasta, normaalikausi 1991–2020, ennätykset
  1962–). Aseman etäisyys keskustasta kannattaa mainita oppaan sääjaksossa
  (Siinai/Petra-ennakkotapauksen mukaisesti, ks. lehtityö-resepti.md:n
  "Säärivin luonnehdinta" -kohta) — Aucklandin CBD on todennäköisesti
  hieman leudompi kuin lentokentän mittauspiste, koska CBD on lähempänä
  molempia satamia.
- **Sanallinen vuodenkierto** (varovainen, ei-numeerinen kuvaus, perustuu
  Wikipedian ilmasto-osioon): Aucklandissa on lauhkea, merellinen ilmasto
  lämpimillä kesillä ja leudoilla talvilla; sade jakautuu melko tasaisesti
  ympäri vuoden, talvikuukaudet hieman sateisempia. Lumi on äärimmäisen
  harvinaista.

---

## 6. Kuva-aiheet

Erityishuomio: **ei tunnistettavia ihmisiä missään kuvassa** (kaukaiset
pisteet ja selin olevat kelpaavat). Uluru-tyyppistä pyhän paikan
kuvarajoitusta ei sovelleta Aucklandiin (ei Uluru-tason pyhää kohdetta
kohdekartalla), mutta Maungakiekie/One Tree Hill on yhä maoreille
merkittävä paikka (Tūpuna Maunga) — kuvat kannattaa valita kunnioittavasti,
mieluiten maisemana eikä ainoastaan turistikohteena.

### 6.1 Avauskuvat (3)

1. Auckland Museumin (Princes Streetin ajan tai nykyisen rakennuksen)
   arkkitehtuuri lähikuvassa — teemasivun `historia` avaus.
2. Maungakiekie/One Tree Hill -kraatteri tai terassit lähikuvassa, ilman
   ihmisiä.
3. Auckland Domainin puustoa tai kasvitieteellistä puutarhaa.

### 6.2 Kansikuvaehdokkaiden KATEGORIALISTAUS — 3 laajaa yleiskuvaa

Raamatun KANSIKARUSELLI-linjauksen (21.8.2026) mukaisesti: kolme LAAJAA
yleiskuvaa kaupungin eri puolilta, ei yhtään yksityiskohtaa, sisäkuvaa,
reliefiä, ruokaa tai esinettä. Alla Commons-KATEGORIAT hakulähtökohdaksi —
EI valittuja tiedostoja, kirjoittaja tekee lopullisen valinnan ja
silmätarkistuksen:

1. **Siluetti kaukaa:** `Category:Skylines of Auckland` tai
   `Category:Aerial photographs of Auckland` — Aucklandin keskustan siluetti
   jommankumman sataman yli kuvattuna, mielellään ilman Sky Toweria
   dominoimasta (anakronistinen rakennus, valmistui 1997) — jos yleiskuva
   sattuu näyttämään Sky Towerin taustalla, se on hyväksyttävää (kuva ei
   väitä olevansa 1873-kuva), mutta selkeästi 1800-luvun rakennuksia
   näyttävä kulma on parempi.
2. **Satama/ranta:** `Category:Waitematā Harbour` tai
   `Category:Auckland Harbour` — laaja näkymä satamasta, esim. purjeveneitä
   tai laituria kuvaava panoraama (yhdistyy "City of Sails" -nimeen,
   ks. Jakso 1).
3. **Maamerkki ympäristössään:** `Category:Rangitoto Island` tai
   `Category:Auckland volcanic field` — tulivuori (esim. Rangitoto tai
   Maungakiekie) osana ympäröivää maisemaa, ei irrallisena
   yksityiskohtana — nostaa esiin kaupungin ainutlaatuisen tulivuorisijainnin
   (K4).

### 6.3 Nosto-/jaksokuvat (8)

1. Auckland Museumin Princes Streetin ajan rakennus (historiallinen kuva,
   jos löytyy) TAI nykyinen 1929 rakennus, jos vanhaa ei löydy Commonsista
   — kuvatekstissä selitettävä kumpi.
2. Maungakiekie/One Tree Hill -terassit tai kraatteri lähikuvassa.
3. Auckland Domain, vanha kartta tai varhainen valokuva 1800-luvulta.
4. Waitematā Harbour -satamanäkymä, mielellään purjeveneillä (K2/J1-tuki).
5. Rangitoto-saari kaukaa kuvattuna (K4-tuki, tulivuori).
6. Kauri-puu tai kauri-metsä (Jakso 3 -tuki, kauri-pihkan tausta) —
   Commonsissa `Category:Kauri` tai `Category:Waipoua Forest`.
7. Devonport tai Devonport Naval Base historiallinen näkymä (kohdekartan
   piste 7 -tuki).
8. Old Government House tai St Patrick's Cathedral julkisivu — molemmat
   olivat jo pystyssä 1873 (St Patrick'sin nykyinen puinen kirkko rakennettu
   1848, uusittu myöhemmin — tarkistettava tarkemmin, ks. osio 8, huomio 3).

### 6.4 Ennen ja nyt -kuvaparin ehdokkaat

En löytänyt vielä peliin tarkistettua paria Aucklandille (toisin kuin
New Yorkin Mulberry Street -pari) — Auckland ei ole aiemmin ollut
matkakirjan valokuvatauluissa, koska lauta on uusi. Ehdotan kirjoittajalle
hakukohteeksi **Queen Streetiä**: Commonsissa ja Aucklandin
kirjastoarkistossa on runsaasti 1800–1900-luvun vaihteen katunäkymiä (esim.
"Mid Queen Street.jpg", Jacques Carabainin 1889 maalaus mainittu
en-Wikipedia "Auckland" -artikkelin History-osiossa, joka kuvaa suurimman
osan tuolloin näkyneistä rakennuksista purettuina 1970-luvulla) ja
nykyaikaisia katukuvia samasta kadusta — tämä olisi luonnollinen pari,
mutta vaatii oman Commons-haun ja silmätarkistuksen, jota en tehnyt
rajauksen mukaisesti.

### 6.5 Kuvien lähdehuomio

En hakenut, katsonut enkä valinnut yksittäisiä Commons-tiedostoja tässä
koosteessa (rajauksen mukaisesti) — yllä on vain kategoria- ja
aihetasoisia ehdotuksia. Kirjoittaja tekee varsinaisen kuvahaun,
silmätarkistuksen ja lisenssivarmistuksen lehtityö-reseptin kuvasääntöjen
mukaisesti.

---

## 7. Vanhan äänitteen ehdokkaat (PD, n. 1900–1925)

**En tehnyt tähän kattavaa hakua** (aikarajaus) — Aucklandille tai
Uudelle-Seelannille ei löytynyt nopealla Commons-haulla ("New Zealand 1900
1910 recording audio historical") suoraan käyttökelpoista osumaa; hakutulos
oli lähinnä museon vuosikertomus, ei äänite.

**Suositus kirjoittajalle:** Uuden-Seelannin varhaisin tunnettu
äänitallenneperintö liittyy vahvasti maori-waiatoihin (esim. Ana Haton ja
Deane Watersin 1920-luvun levytykset) — nämä ovat kuitenkin 1920-luvun
LOPUN levytyksiä (tarkka vuosi tarkistettava, todennäköisesti 1927 tai
myöhemmin), jolloin ne saattavat ylittää `docs/moduulit/kaupunkilehti.md`:n
"n. 1900–1925" -ohjeraamin — tarkistettava tapauskohtaisesti. Vaihtoehtoinen
reitti on hakea Library of Congressin National Jukeboxista tai
archive.orgin georgeblood-kokoelmasta hakusanoilla "Auckland New Zealand"
tai "Waitemata" samaan tapaan kuin New Yorkin koonnissa käytettiin
"Sidewalks of New York" -hakua — en ehtinyt tehdä tätä hakua tässä
koosteessa. Jos sopivaa PD-äänitettä ei löydy, Auckland voi jäädä ilman
vanhaa ääniparia samalla tavalla kuin Dubai, Doha, Salalah ja Astana
(ks. `docs/moduulit/kaupunkilehti.md`, "Äänirivin ennen ja nyt" -kohta) —
tämä ei ole este julkaisulle.

---

## 8. Ristiriidat, epävarmuudet ja tarkistettavat kohdat

1. **Neljä 1873-läheistä käännekohtaa löytyi**, kaikki isoisän vierailua
   1–9 vuotta edeltävältä tai seuraavalta ajalta: pääkaupunkiaseman
   menetys 1865 (K3), kaupunkioikeudet 1871 (H4-taustalla, mainittu
   johdannossa), Parnell Lawn Tennis Club 1872 (H3) ja Campbellin
   paluu/kartanosuunnitelma 1874 (H2). Nämä eivät ole yhtä tiiviisti
   samana vuonna kuin New Yorkin viisi tapahtumaa, mutta muodostavat
   selvän "juuri ennen/juuri jälkeen" -kaaren isoisän käynnin ympärille —
   huomionarvoinen löydös Fablelle/kaaren kirjoittajalle.

2. **En löytänyt tarkkaa päivämäärää isoisän Aucklandin-vierailulle** —
   kaari ei ole vielä kirjoitettu tälle laudalle (Raamattu, "Kaupungit":
   "UUSIIN KAUPUNKEIHIN JA MAIHIN EI VIELÄ TARINAKAARTA"). Fable päättää
   myöhemmin ajoituksen.

3. **St Patrick's Cathedralin rakennusvuosi on TARKISTAMATTA tässä
   koosteessa** — mainitsin kuvaehdokkaissa (osio 6.3, kohta 8) yleistiedon
   "nykyinen puinen kirkko 1848, uusittu myöhemmin", mutta en lukenut
   `St Patrick's Cathedral, Auckland` -artikkelin raakatekstiä kokonaan,
   vain haettu sen koordinaatit API:lla. **Tarkistettava erikseen** ennen
   käyttöä, samaan tapaan kuin New Yorkin Grand Central -huomautus.

4. **Waikaton sodan maakonfiskaatiot (Jakso 4:n huomio) EIVÄT ole suoraan
   peräisin luetusta "Auckland"-artikkelin katkelmasta** — se on
   yleistietoa Uuden-Seelannin sotien seurauksista, jonka olen merkinnyt
   auki tekstiin. **Tarkistettava erikseen** artikkelista "New Zealand
   Wars" tai "Waikato War" ennen julkaisua, tai poistettava jos vahvistusta
   ei löydy — spec-mantereet.md:n Oseania-linjan mukaisesti tapahtumat
   kerrotaan neutraalisti, mutta väitteen pitää olla tarkistettu.

5. **Kauri-pihkan käsinkaivu ("gum digging") osiossa Jakso 3 on merkitty
   täydentäväksi yleistiedoksi**, ei suoraan luetusta raakatekstistä —
   1891 vientilukujen fakta ON tarkistettu ("Auckland"-artikkelin
   Economy-osio), mutta itse kaivutapaa kuvaava lause on yleistietoa.
   **Tarkistettava erikseen** (esim. artikkelista "Kauri gum") ennen
   käyttöä.

6. **Koordinaattien eteläinen merkintätapa (S/I) poikkeaa New Yorkin
   pohjoisesta mallista (N/L)** — ks. osio 4:n huomio. Tämä ei ole virhe
   vaan maantieteellinen väistämättömyys (Auckland on eteläisellä
   pallonpuoliskolla), mutta kartantekijän kannattaa varmistaa pelin
   karttatyökalun odottama koordinaattimuoto ennen kuin lukuja syötetään
   sellaisenaan.

7. **Etäisyydet ja suunnat osiossa 4 on laskettu koneellisesti**
   (Python-skripti, haversine-kaava, R=6371 km, 8-suuntainen
   ilmansuuntataulukko), New Yorkin ennakkotapauksen mukaisesti.

8. **Verkkohaussa esiintyi toistuvasti Wikimedian "too many requests"
   -tekstivastaus, joka EI palauta HTTP 429 -statuskoodia** vaan HTTP 200
   -vastauksen tekstisisällössä — normaali 429-tunnistus ei siis riitä,
   vaan vastauksen SISÄLTÖ on tarkistettava ennen JSON-jäsennystä. Kirjasin
   tämän tekniseksi huomioksi seuraaville koostajille (ks. dokumentin
   alkulause) — koodi mukautettiin kesken työn tunnistamaan myös tämä
   tapaus ja perääntymään kasvavalla viiveellä.

9. **Yhdeksän kohdekartan pistettä eivät kaikki mahdu tiiviisti isoisän
   1873-ajan ytimeen** — Maungawhau/Mount Eden ja Maungakiekie/One Tree
   Hill venyttävät rajauksen lähes kuuteen kilometriin (ks. osio 4).
   Vaihtoehto on rajata kartta tiiviimmin viiteen kohteeseen (2–6) ja
   jättää kaksi tulivuorta pois, jos kartantekijä pitää rajausta liian
   laajana — **tämä on kartantekijän päätös, ei tässä ratkaistavissa**,
   samaan tapaan kuin New Yorkin kahden ryppään kysymys.

10. **En hakenut, katsonut enkä valinnut yksittäisiä Commons-tiedostoja
    enkä äänitteitä lopullisesti** (rajauksen mukaisesti) — kaikki osiot
    6 ja 7 ovat aihe- ja kategoriatasoisia ehdotuksia kirjoittajalle.

11. **Merkkimäärät on laskettu koneellisesti** Python-skriptillä
    (`len()`) jokaiselle nostolle ja johdannolle; kaikki kahdeksan nostoa
    (K1–K4, H1–H4) ovat 440–660 merkin sisällä New Yorkin ennakkotapauksen
    mukaisesti. Johdannot (349 ja 299 merkkiä) noudattavat samaa
    "hieman yli vanhan 154–232 merkin normin" -ratkaisua kuin New Yorkissa,
    koska Raamatun 20.8.2026-linjaus ei anna tarkkaa lukua sivun
    johdannolle — kirjoittaja voi tiivistää tarpeen mukaan.
