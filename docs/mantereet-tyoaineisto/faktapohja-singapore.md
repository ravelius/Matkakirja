# Singapore-maalehti (ISO-3: SGP) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`). Lyhyt faktapohja: vain ne luvut,
päiväykset ja nimet, jotka päätyivät `js/packs/maa-kategoriat.js`:n
SGP-lohkoon, sekä ristiriidat. Rakenteen sitova lähde
docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Luonto, Ruoka, Musiikki, Kuvataide.**
Minitehtävä on Ruoka-sivulla.

**Rajaus.** Singapore on kaupunkivaltio: maa ja kaupunki ovat sama paikka,
joten päällekkäisyys kaupunkilehden kanssa oli tämän lehden suurin riski.
`KULTTUURI_KATEGORIAT.singapore` kattaa jo vuoden 1819 sopimuksen ja
Rafflesin, väkiluvun kasvun 1860 mennessä, vapaasataman ja Suezin
vaikutuksen, Cavenagh-sillan, vuoden 1822 Jackson-suunnitelman, Thian Hock
Kengin, Sri Mariamman -temppelin ja Naraina Pillain, Raffles Hotelin sekä
Matkailijalle-osiossa Changin, metron, neljä kansallista hanaa,
täyttömaan ja vuosien 1819–1965 hallintoketjun. Karttamerkit rajaavat
lisää: `js/packs/maastokohteet-sgp.js` kattaa kasvitieteellisen puutarhan
ja kumin, Pulau Ubinin graniitin, Kranjin sotamuistomerkin, Rafflesin
majakan, Haw Par Villan ja Bukit Timahin; `js/packs/skandaalit.js`
Baringsin romahduksen ja Pan-Electricin pörssisulun; eläintäkyä
Singaporella ei ole. **Maalehti ei koske yhteenkään näistä.** Siksi
historia alkaa 1300-luvulta eikä vuodesta 1819, luonto-osio ei mene
puutarhaan, Bukit Timahille eikä Pulau Ubinille (sarvinokkalinnun
nostossa saari mainitaan vain lajin paluun yhteydessä), eikä ruoka-osio
toista Matkailijalle-osion vesikertomusta. Malesian liitto 1963–1965 ei
ole omana nostonaan, koska se kuuluu maan introon
(`js/packs/asia-artikkelit.js`, avain `Singapore`).

## 1. Historia

- **Temasek ja Singapuran kuningaskunta** (en-Wikipedia "Kingdom of
  Singapura", johdanto sekä osiot "Etymology", "Archaeological evidence"
  ja "Sang Nila Utama"): malaijien kronikan mukaan palembanginlainen
  ruhtinas **Sang Nila Utama** nousi maihin Temasekiin **1299**, näki
  punaruumiisen, mustapäisen ja valkorintaisen eläimen, sai kuulla sen
  olevan leijona ja nimesi kaupungin **Singapuraksi** (sanskritin
  *siṃha* + *pūra*, leijonakaupunki). Yuan-kauden kauppias **Wang
  Dayuan** kävi saarella **1330-luvulla** ja kuvasi kaksi asutusta:
  **Ban Zu** (malaijin *pancur*, lähde) kukkulalla ja **Long Ya Men**
  salmen suulla. Kauppatavaroina hän luettelee **punakullan,
  puuvillapainokankaat, sinisen satiinin, lakkapuun ja
  sarvinokkalinnun nokkakypärät**. **Siamilainen 70 aluksen laivasto**
  piiritti muurattua kaupunkia **kuukauden** saamatta sitä; piiritys
  purkautui, kun kiinalaisia aluksia saapui. **John Miksicin kaivaukset
  vuodesta 1984** Fort Canningilla ja joen rannoilla varmistivat
  1300-luvun sataman olemassaolon. **Vuonna 1928** vesisäiliötä
  kaivaneet työmiehet löysivät kukkulalta kultakoruja: kaksi lähes
  samanlaista taipuisaa rannerengasta, lintuaiheinen sormus, kolme
  paria pyöreitä renkaita, soikea koru ja kivikoristeinen solki.
  **Suurin osa katosi Japanin miehityksen aikana; jäljellä on yksi
  rannerengas ja kaksi rengasta.** *(Kronikan historiallisuus on
  kiistanalainen: monet historioitsijat pitävät varmana vain viimeistä
  hallitsijaa Parameswaraa. Lehti kertoo tarinan kronikan kertomana ja
  arkeologian erikseen.)*
- **Singaporen kivi** (en-Wikipedia "Singapore Stone", johdanto sekä
  osiot "Discovery", "Appearance" ja "Destruction"): **kesäkuussa 1819**
  viidakkoa raivanneet työmiehet löysivät joen suun kalliokärjestä
  (Rocky Point, myöhemmin Artillery Point) noin **3 metriä korkean ja
  2,7–3 metriä pitkän** hiekkakivipaaden, jonka sileälle sivulle oli
  hakattu **50–52 riviä** kirjoitusta noin **1,9 cm** levein kirjaimin.
  Löytäjät säikähtivät niin, ettei heitä saatu jatkamaan raivausta.
  Kirjoitus oli jo tuolloin saaren asukkaille arvoitus; nykyarvaukset
  ovat **vanha jaava, sanskrit tai tamili**, ja paasi ajoitetaan
  **vähintään 1200-luvulle**, mahdollisesti 900–1000-luvulle. **Noin
  tammikuussa 1843** paasi räjäytettiin insinööri **D. H. Stevensonin**
  käskystä joensuun leventämiseksi Fort Fullertonia ja sen komentajan
  asuntoa varten. **Everstiluutnantti James Low** oli anonut paatta
  säästettäväksi ja tuli räjähdyksen jälkeen joen yli poimimaan
  kirjaimellisia kappaleita. Yksi palanen on **Singaporen
  kansallismuseossa** ja museo nimesi sen **tammikuussa 2006** yhdeksi
  Singaporen 11 kansallisaarteesta.
- **Miehitysvuodet** (en-Wikipedia "Japanese occupation of Singapore",
  johdanto sekä osiot "Events leading to the occupation", "Time of
  mass-terror" ja "Scarcity of basic needs"): saari antautui
  **15.2.1942 klo 18.20**, ja se nimettiin **Shonan-to** (Syonan-to),
  "etelän valon saari". Britannian valuutta poistui, ja tilalle tuli
  miehityshallinnon oma raha, jota painettiin lisää tarpeen mukaan;
  kansa kutsui sitä **banaanirahaksi** seteleiden banaanipuukuvan
  mukaan. **Sata kattia (n. 60 kg) riisiä maksoi ensin 5 dollaria ja
  sodan lopussa 5 000.** Ruoka jaettiin korteilla ("Peace Living
  Certificates"): **aikuiselle 5 kg riisiä kuussa, lapselle 2 kg**, ja
  aikuisen annosta leikattiin sodan edetessä **25 %**. **Bataatti,
  maniokki ja jamssi** korvasivat riisin, ja niitä kasvatettiin
  takapihoilla. **Kempeitain Sook Ching -vainoissa surmattiin
  25 000–55 000 siviiliä** Singaporessa ja Malaijalla, enimmäkseen
  18–50-vuotiaita kiinalaisia miehiä. Saari palautettiin Britannialle
  **12.9.1945**, ja antautumispäivää muistetaan yhä vuosittain
  **Total Defence Day** -päivänä. *(Lehteen on kirjoitettu arjen luvut
  ja vainot yhdellä lauseella ilman yksityiskohtia — Perustuslaki 4.)*
- **HDB ja muutto kerrostaloihin** (en-Wikipedia "Housing and
  Development Board", osiot "Background and formation" ja "The 1960s to
  1980s"; "Queenstown, Singapore", johdanto ja "History"): väkiluku
  kasvoi **940 700:sta 1,7 miljoonaan vuosina 1947–1957**, ja moni asui
  epävirallisissa asumuksissa tai ahtaissa kauppataloissa. **HDB
  perustettiin helmikuussa 1960** edeltäjänsä Singapore Improvement
  Trustin tilalle ja ilmoitti heti **yli 50 000 asunnon**
  viisivuotisohjelmasta mahdollisimman halvalla rakennettuna.
  **Toukokuussa 1961 Bukit Ho Sween tulipalo**, ja palopaikalle
  suunniteltiin ja rakennettiin nopeasti asuinalue, johon sijoitettiin
  myös muualta siirretyt. **Vuoteen 1965 mennessä asuntoja oli
  54 430.** **Vuodesta 1968** asunnon sai maksaa Central Provident
  Fund -eläkemaksuilla, ja **1980-luvulla** useimmat hakijat ostivat
  vuokraamisen sijaan. Uusia alueita **ei jaettu väestöryhmittäin**.
  **Queenstown oli maan ensimmäinen satelliittikaupunki**: SIT rakensi
  sitä 1950-luvulla ja HDB 1960-luvulla, ja vuosina **1952–1968**
  alueelle nousi **19 372 asuntoa**, enimmäkseen matalia
  porrastaloja.

## 2. Luonto

- **Sileäturkkisaukko** (en-Wikipedia "Smooth-coated otter", johdanto
  sekä osiot "Characteristics", "Distribution", "Habitat",
  "Reproduction" ja "Taxonomy"; "Wildlife of Singapore", osio "Urban
  environment interactions"): paino **7–11 kg**, ruumis **59–64 cm** ja
  häntä **37–43 cm**; häntä on litteä, kuono karvaton ja vinoneliön
  muotoinen. **IUCN: vaarantunut vuodesta 1996**, CITESin liitteessä I
  vuodesta 2019. Singaporessa laji on sopeutunut kaupunkiin: se käyttää
  **rakennusten alusia pesäkoloina** ja kulkee pystyseinäisiin
  betonikanaviin ja niistä pois **portaita ja tikkaita** pitkin.
  Kaupungin vesillä on **17 perhettä**, jotka "kalastavat tilapiaa ja
  nukkuvat siltojen alla"; koikarppilammikoiden tyhjentämisestä on
  valitettu. **Marraskuussa 2017** havaittiin **seitsemän poikasen**
  pentue, suurin luonnossa kirjattu (tavallinen pentue enintään viisi).
  Kaupungissa elää **vähintään 60 yksilön risteytyspopulaatio**, joka
  syntyi sileäturkkisaukkokoiraiden ja pikkukynsisaukkonaaraiden
  pariutumisista ja palautui takaisinristeytyksellä sileäturkkikantaan.
- **Sarvinokkalintu** (en-Wikipedia "Oriental pied hornbill", johdanto
  sekä osiot "Description", "Feeding", "Reproduction" ja
  "Conservation"): *Anthracoceros albirostris*, pituus **55–60 cm**,
  paino **600–1 050 g**; koiraalla keltainen mustatyvinen nokka ja
  **kirkkaanpunaiset silmät**, naaraalla harmaanruskeat. Nokan päällä
  on sivuiltaan litistynyt **kypärä**. Laji on **koloissa pesivä mutta
  ei itse koloa kaiva**: naaras menee koloon ja **muuraa aukon umpeen
  syljen, mudan, hedelmän, ulosteen ja puunkuoren seoksella** jättäen
  vain raon, josta koiras syöttää; poikaset ovat sisällä kuukausia.
  Sarvinokkalinnut ovat **isojen siementen levittäjiä** — harvalla
  muulla linnulla on riittävän leveä kita. **Singaporen kanta hävisi
  paikallisesti 1960-luvulla ja palasi 1990-luvulla**, ja lintu on nyt
  yleinen koko saarella; kanta syö säännöllisesti muiden lintujen munia
  ja poikasia, mikä saattaa olla sopeutuma kaupunkiin, jossa on
  vähemmän hedelmiä mutta enemmän avoimia pesiä. **RISTIRIITA:**
  "Wildlife of Singapore" sanoo lajin hävinneen **1800-luvulla** ja
  palanneen Pulau Ubinille; lehti seuraa lajin omaa artikkelia
  (1960-luku → 1990-luku) ja mainitsee Pulau Ubinin vain paluun
  paikkana.
- **Sungei Buloh** (en-Wikipedia "Sungei Buloh Wetland Reserve",
  johdanto sekä osiot "History" ja "Wildlife"): saaren luoteiskulmassa;
  **maan ensimmäinen suojeltu kosteikko (2002)** ja **130 hehtaaria**.
  Alue nousi esiin **1986**, kun Malayan Nature Societyn Singaporen
  osasto vaati sen suojelua poikkeuksellisen lintulajiston takia;
  **0,87 km² sai luonnonpuiston aseman 1989**, puisto avattiin
  **6.12.1993** ja koko alue rauhoitettiin **1.1.2002**. **ASEANin
  perintöpuisto 2003**, ja mukana **East Asian–Australasian Shorebird
  Site Network** -verkostossa. Muuttolintuja tulee **Siperiasta
  matkalla Australiaan**; lajeja mm. **pikkukuovi, valkoviklo,
  punajalkaviklo, mongoliantylli, kuovisirri, lampiviklo ja
  tundrakurmitsa**. Alueella on **piiloja** havainnointia varten, ja
  siellä nähdään **suistokrokotiileja**, joiden alkuperästä ei ole
  varmuutta. Takamangrovessa lentää **atlaskehrääjä**, Kaakkois-Aasian
  suurin yöperhonen.
- **Mitä metsästä on jäljellä** (en-Wikipedia "Wildlife of Singapore",
  johdanto sekä osiot "Fauna", "Flora" ja "Urban environment
  interactions"): **vuonna 1819 saari oli enimmäkseen sademetsää**;
  raivaus viljelmiksi oli pääosin tehty 1900-luvun alkuun mennessä, ja
  eräiden arvioiden mukaan **95 % luontaisista elinympäristöistä on
  hävinnyt 183 vuodessa**. Paikallisesti hävisi **yli 20
  makeanveden kalalajia ja 100 lintulajia**; vuoden 2003 arvio
  sukupuuttoon kuolleista oli **yli 28 %**. **Yli puolet maan
  luontaisesta eliöstöstä elää luonnonsuojelualueilla, jotka ovat
  0,25 % maapinta-alasta.** Nykyinen lajimäärä: **noin 80
  nisäkäslajia** (niistä **45 lepakkoa**), **395 lintulajia** (noin 180
  pesivää), **noin 110 matelijaa** (75 käärmettä), **30
  sammakkoeläintä** ja **1 358 luontaista putkilokasvia, joista noin
  759 on äärimmäisen uhanalaisia**. Puistoja yhdistää **yli 300 km:n
  Park Connector Network**. Muita kaupunkilaisia: **yli 2 000
  makakia** (2015), **villisikoja jopa 100 kg**, **sundanpangoliini**
  ja **sambarhirvi**, joka palasi keskusalueen metsiin 1970-luvulla
  eläintarhasta karattuaan.

## 3. Ruoka

- **Katukeittiöt** (en-Wikipedia "Hawker centre", johdanto ja osio
  "Singapore"): avoimia halleja, joissa on kymmeniä myyntipisteitä sekä
  pöydät ja tuolit. Ne syntyivät **1950- ja 1960-luvun** kaupungistumisen
  myötä osin siksi, että luvattomien katukauppiaiden hygienia oli
  huono. Nykyään pisteillä on **kirjainarvosana**: **A vaatii vähintään
  85 %**, huonoin **D on 40–49 %**, ja arvosana on pidettävä esillä.
  **Vuonna 1987** otettiin käyttöön **virhepistejärjestelmä**: kuusi
  pistettä johtaa korkeaan maksuun. Halleja omistavat **kansallinen
  ympäristövirasto NEA, asuntohallitus HDB ja JTC** sekä yksityiset.
  **16.12.2020** Unesco otti katukeittiökulttuurin aineettoman
  kulttuuriperinnön luetteloon ja kuvasi hallit sanoilla **"yhteisön
  ruokasalit"**. **Vuonna 2016** kaksi katukeittiöpistettä sai
  **ensimmäisinä katuruokamyyjinä maailmassa Michelin-tähden** (Hong
  Kong Soya Sauce Chicken Rice and Noodle sekä Hill Street Tai Hwa Pork
  Noodle); toinen menetti tähtensä 2021. **Heinäkuussa 2018** eräs
  nainen voitti myyntipisteen huutokaupan **10 028 dollarin**
  tarjouksella ja purki vuokrasopimuksen **samana päivänä** kuin
  allekirjoitti sen. **1.9.2021** alkaen tarjottimen ja roskien
  jättäminen pöytään on ollut lain vastaista.
- **Kanariisi** (en-Wikipedia "Hainanese chicken rice", johdanto sekä
  osiot "History" ja "Singapore"): pohjautuu Hainanin **Wenchang-kanaan
  ja wenchang-kanariisiin**, joka oli Singaporen hainanilaiskodeissa
  juhlaruokaa **1940-luvulle asti**. Singaporessa ruoka **syntyi
  niukkuudesta**: munintaikänsä ohittanut kana keitettiin liemeksi ja
  riisiksi, jotta maku saatiin talteen. **Ensimmäiset kanariisiravintolat
  avattiin miehityksen aikana**, kun britit joutuivat lähtemään ja
  heidän hainanilaiset palvelijansa menettivät toimeentulonsa; yksi
  ensimmäisistä oli **Yet Con 1940-luvun alussa**. Ruoan teki
  suosituksi **1950-luvulla Moh Lee Twee**, jonka **Swee Kee** toimi
  **1947–1997**. Kana **haudutetaan kiehumispisteen alapuolella**, ja
  kypsä kana **upotetaan jäihin**, jotta nahasta tulee hyytelömäinen.
  Liemestä kuoritaan rasva, ja **osa rasvasta ja liemestä keitetään
  riisin kanssa yhdessä inkiväärin, valkosipulin ja pandanuslehtien
  kanssa**. Artikkelin sanoin **"kanariisin tärkein osa ei ole kana
  vaan riisi"**. Kastikkeeksi tulee tuoretta punaista chiliä ja
  valkosipulia, lisäksi tummaa soijaa ja inkivääriä; kurkku keitetään
  kanaliemessä. Malesia ja Singapore ovat kiistelleet ruoan
  alkuperästä **vuoden 1965 eron jälkeen**, ja kiistaa on kuvattu
  sanalla **gastronationalism**.
- **Chilirapu** (en-Wikipedia "Chilli crab", johdanto sekä osiot
  "Origins", "20th century" ja "Description"): **portugalilaiset toivat
  chilin Malakkaan 1500-luvulla**; sitä ennen malaijit maustoivat
  pippurilla. Nykyisen ruoan juuret ovat **1950-luvulla**: **Cher Yam
  Tian** ja hänen miehensä **Lim Choo Ngee** myivät **vuodesta 1956**
  työntökärryistä rapuja, jotka oli paistettu pullochilikastikkeen ja
  tomaattikastikkeen seoksessa — alkuperäisessä ohjeessa pullokastiketta
  ei ollut. Menestys johti **Palm Beach Seafood -ravintolaan Upper East
  Coast Roadin varrella**. Nykyään levinneimmän version teki **Hooi Kok
  Wai 1960-luvulla**, yksi ajan neljästä tunnetusta kokista. Rapuna on
  tavallisimmin **mutarapu (Scylla serrata)**, ja kastike kauhotaan
  lautaselta **mantou-sämpylöillä**, joko paistetuilla tai höyrytetyillä.
  CNN Go listasi ruoan maailman **50 herkullisimman** joukkoon
  sijalle 35.
- **Kopitiam** (en-Wikipedia "Kopi (drink)", johdanto sekä osiot
  "Variations", "Beans and sources", "Roasting", "Serving", "Singapore"
  ja "Consumer market"; "Kaya toast", johdanto sekä osiot "History" ja
  "Variations"): hainanilaiset saapuivat Singaporeen myöhään
  (**1870-luvulla**) ja päätyivät palvelualoille; **1920–1950-luvuilla**
  he perustivat omia kahvilat eli **kopitiamit**, ja niissä syntyi
  paikallinen kahvi. Papuna on **robusta**, useimmiten Indonesian
  **EK-1**; paahdossa käytetään seosta **80 % papuja, 20 % sokeria** ja
  **margariinia**, **25 minuuttia 180 asteessa**, puolivälissä lisätään
  suola ja lopussa sokeri karamellipinnaksi. Jauhe pannaan
  **musliinipussiin**, päälle kaadetaan kiehuvaa vettä, ja juoma
  **kaadetaan edestakaisin kahden pitkänokkaisen kannun välillä**, jotta
  se ilmastuu ja jäähtyy. Tilaussanastossa on **ainakin 54 vakiomuotoa**.
  **Kaya-paahtoleivän** uskotaan syntyneen **1800-luvulla** brittilaivoilla
  palvelleiden hainanilaisten käsissä: **kaya**, kookos-kananmunahillo,
  korvasi läntisen hedelmähillon. Annos on kaksi paahtoleipäviipaletta
  voin ja kayan kanssa, **kaksi pehmeäksi keitettyä kananmunaa**, tummaa
  soijaa ja valkopippuria. **Killiney Kopitiam** perustettiin **1919**
  nimellä Kheng Hoe Heng. Kopitiamit yleistyivät **miehityksen jälkeen
  noin 1945**, kun liiketilojen vuokrat olivat halpoja. **Lokakuussa
  2021** rahaviranomainen julkaisi juhlarahat, joissa on mm.
  kaya-paahtoleipä, Unescon listauksen kunniaksi.

**Minitehtävä (Ruoka).** "Missä nesteessä kanariisin riisi keitetään?" —
oikea vastaus **kanaliemessä**; vastaus on Kanariisi-noston tekstissä.
Väärät vaihtoehdot: kookosmaidossa, riisiviinissä, pandanusteessä.

## 4. Musiikki

- **Zubir Said ja Majulah Singapura** (en-Wikipedia "Zubir Said",
  johdanto sekä osiot "Early years", "Move to Singapore", "Majulah
  Singapura", "Later years" ja "Music"; "Majulah Singapura", johdanto ja
  "History"): synt. **22.7.1907 Bukittinggissä** Minangkabaussa
  Sumatralla, kuoli **16.11.1987**. Tuli Singaporeen **1928
  21-vuotiaana** merimiesystävän kehotuksesta ja vastoin isänsä tahtoa;
  isä piti musiikkia uskonnon vastaisena. Ensimmäinen työ oli soittajana
  **City Opera** -bangsawan-ryhmässä Tanjong Pagarissa, ja hänestä tuli
  ryhmän kapellimestari; **1936** hän siirtyi levy-yhtiö His Master's
  Voicelle ja **1952** Cathay-Keris Film Productionsin sovittajaksi.
  **Heinäkuussa 1958** kaupunginvaltuuston varapormestari **Ong Pang
  Boon** pyysi häntä säveltämään tunnuslaulun nimeltä **Majulah
  Singapura** ("Eteenpäin, Singapore"), joka oli Victoria-teatterin
  remontin jälkeen sen seinään tuleva tunnuslause. **Sävel ja sanat
  valmistuivat kahdessa viikossa.** Zubirin omin sanoin vaikeus oli
  saada kaikki sanat lyhyeen sävelmään ja tehdä siitä **"hyvin
  yksinkertainen, kaikkien Singaporen kansanryhmien ymmärrettävissä"**.
  Kantaesitys **6.9.1958 Victoria-teatterissa** Singapore Chamber
  Ensemblen esittämänä. Laulusta tuli kansallislaulu, kun
  lakiasäätävä kokous hyväksyi sen **11.11.1959**, ja itsenäistymisen
  **9.8.1965** jälkeen se vahvistettiin tasavallan kansallislauluksi.
  **Lain mukaan se lauletaan malaijiksi**, mutta virallisia käännöksiä
  on englanniksi, mandariiniksi ja tamiliksi. Alkuperäinen sävellaji
  oli **G-duuri**; **2001** se laskettiin **F-duuriin**. Zubir kirjoitti
  arviolta **1 500 laulua, joista alle 10 % levytettiin**, ja kuollessaan
  hänellä oli **20 000 dollaria**. **Elokuussa 2016** laulu soitettiin
  ensimmäistä kertaa olympiakisojen mitalienjaossa, kun **Joseph
  Schooling** voitti 100 metrin perhosuinnin.
- **Xinyao** (en-Wikipedia "Xinyao", johdanto sekä osiot "Birth",
  "1980s: Peak", "1990s: Decline", "Education" ja "Media"):
  mandariininkielinen laulugenre, joka syntyi Singaporessa
  **1970-luvun lopun ja 1980-luvun** taitteessa. Nimi on **xīn**
  (Singapore) + **yáo** (laulu), lyhenne ilmauksesta "singaporelaisten
  nuorten itse tekemät laulut". Aiheina **ystävyys, koulu ja nuoruuden
  rakkaus**. Esikuvana oli **Taiwanin 1970-luvun kampuskansanlaulu**.
  Ensimmäinen radio-ohjelma **huhtikuussa 1982** (puolen tunnin
  *Our Song Writers*). Ensimmäinen kansalaistalolla rekisteröity
  ryhmä oli **Merlion Clementissä 1983**. **1983** kappale *Encounter*
  (Eric Moo ja Huang Hui-zhen) oli ensimmäinen xinyao-laulu
  radiolistalla. **1984** ilmestyi ensimmäinen albumi **"Tomorrow
  We'll be 21"**, joka myi **30 000 kappaletta**. **6.–7.9.1985**
  järjestettiin **Xinyao Festival '85**, jossa esiintyi **100 nuorta
  lauluntekijää**; liput myytiin loppuun 30. elokuuta mennessä.
  Vuoden 1985 loppuun mennessä rekisteröityjä ryhmiä oli **14** ja
  rekisteröimättömiä parikymmentä. **1990-luvulla** genre hiipui:
  festivaalin varainkeruu putosi **60 000:sta 20 000 dollariin** ja
  1 800-paikkaisen teatterin lipuista myytiin **70 %** edellisen
  vuoden 95:n sijaan. **Vuodesta 2015** opetusministeriöllä on
  koulujen xinyao-ohjelma; **2017** siihen osallistui yli **10 000
  oppilasta**.
- **Getai** (en-Wikipedia "Getai", johdanto sekä osiot "History" ja
  "The golden age of getai"): **歌台**, "laulunäyttämö" — äänekkäät
  lava-esitykset, joita pidetään **seitsemännen kuukalenterikuukauden
  haamujuhlan** aikana ja jumaluuksien syntymäpäivinä, tavallisesti
  **klo 19.30 – yli 22**. Lavat pystytetään **telttoihin tyhjille
  kentille, parkkipaikoille ja asuinalueille**; taustat ovat
  **pahvia ja kangasta** kirkkaissa väreissä, ja juontajat vaihtavat
  **mandariinin, hokkienin, teochew'n, kantonin, englannin ja
  intialaisten kielten** välillä. **Ensimmäinen penkkirivi jätetään
  tyhjäksi ja eristetään yleisöltä**, koska se on varattu hengille ja
  jumaluuksille. Getai **syntyi Singaporessa 1940-luvun
  miehitysvuosina**: New World -huvipuiston juomakaupan omistaja
  järjesti **Dayehui**-illat, joissa juoman ostanut sai kuunnella
  kolme tuntia elävää musiikkia. Kukoistuskausi oli **1950-luku**
  kolmessa "Worlds"-huvipuistossa (Great World, Happy World, New
  World); esiintyjä saattoi ansaita **1 200 dollaria**. Huvipuistojen
  getai hiipui 1950-luvun lopulla ja lavat suljettiin 1960-luvulla,
  mutta **1970-luvulla** muoto oli vakiintunut haamujuhlan
  katulavoille. **31.7.2011** getai esitettiin ensimmäistä kertaa
  Orchard Roadilla Ngee Ann Cityn aukiolla. *(Artikkelin 1950-luvun
  striptease- ja sensuurikappale on jätetty kokonaan pois —
  Perustuslaki 4.)*
- **Dick Lee** (en-Wikipedia "Dick Lee", johdanto sekä osiot "Early
  life", "Early years", "1990s" ja "2000s"): synt. **24.8.1956**
  nimellä Richard Lee Peng Boon; isä **Lee Kip Lee** oli peranakaani ja
  kirjoitti The Straits Timesiin. Aloitti **1971 viisitoistavuotiaana**
  pianistina Harmony-yhtyeessä, perusti veljiensä kanssa **Dick and the
  Gangin** ja julkaisi esikoisalbuminsa **Life Story 1974**. Läpimurto
  alueellisesti oli **The Mad Chinaman (1989)**; sitä edelsi **Life in
  the Lion City (1984)**. Muutti **1990 Japaniin** ja teki yhteistyötä
  mm. Tracy Huangin, Sandy Lamin ja Zoo-yhtyeen kanssa; toimi
  **1998–2000** Sony Music Asian A&R-varapresidenttinä Hongkongissa.
  Musikaaleja **Beauty World (1988)**, **Fried Rice Paradise (1991)**,
  **Kampong Amber (1994)** ja **Snow.Wolf.Lake (1997)**.
  Kansallispäivän tunnuslauluja: **"Home" (1998, laulaa Kit Chan)** ja
  **"We Will Get There" (2002, laulaa Stefanie Sun)**; hän oli myös
  vuoden **2002 kansallispäiväparaatin luova johtaja**. **Cultural
  Medallion 2005**, Fukuokan taide- ja kulttuuripalkinto **2003**.

## 5. Kuvataide

- **Nanyang-tyyli ja Balin matka** (en-Wikipedia "Nanyang Style",
  johdanto sekä osiot "History", "Trip to Bali (1952)" ja
  "Techniques"): Singaporeen muuttaneiden kiinalaissyntyisten
  maalareiden suuntaus **1940-luvun lopulta 1960-luvulle**. Nimi tulee
  sanasta **Nanyang** ("eteläinen meri"), jolla Kaakkois-Aasiaa
  kutsuttiin Kiinasta katsoen. Aiheina **trooppiset hedelmät,
  kampung-kylänäkymät ja batiikkikankaat**; tekniikka yhdistää
  **läntisen akvarellin ja öljymaalauksen kiinalaiseen tussiperinteeseen**.
  Uranuurtajaksi on nimetty **Lim Hak Tai**, ja tunnetuimmat ovat
  **Liu Kang, Chen Chong Swee, Chen Wen Hsi, Cheong Soo Pieng ja
  Georgette Chen**. **Vuonna 1952** neljä ensin mainittua matkusti
  **Balille** ja vieraili belgialaisen **Adrien-Jean Le Mayeur de
  Merprèsin** luona, jonka **1930-luvun näyttelyt Singaporessa** olivat
  antaneet heille ajatuksen; Balilla vietettiin **kuukausi**. **Vuoden
  1953 näyttelyssä** oli neljän maalarin **yli sata** matkalla syntynyttä
  työtä. **Liu Kangin *Artist and Model* (1954)** esittää Chen Wen Hsiä
  luonnostelemassa balilaista naista, ja siinä ääriviivat on maalattu
  poikkeuksellisesti **valkoisella** — piirteen on arveltu tulevan
  batiikista. Retken menestys innoitti myöhemmin **Ten Men Art
  Groupin** matkat 1961–1976.
- **Liu Kang** (en-Wikipedia "Liu Kang (artist)", johdanto sekä osiot
  "Early life and education", "Career" ja "Personal life and legacy"):
  **1.4.1911 – 1.6.2004**, synt. Fujianissa, muutti **viisivuotiaana**
  Brittiläiseen Malaijaan Muariin, jossa isä oli kumikauppias. Opiskeli
  Shanghain taideakatemiassa ja **Pariisin École des Beaux-Artsissa
  1929–1933**; opiskeli siellä Cézannea, Van Goghia, Gauguinia, Degasia
  ja Matissea. Opetti Shanghaissa **1933–1937**, muutti sodan takia
  Muariin ja **1942 Singaporeen**. **Miehityksen ajaksi hän jätti 200
  maalaustaan erääseen singaporelaiseen kouluun ja palatessaan
  totesi, että kaikki olivat poissa.** Piirsi **1946** kirjasarjaan
  *Chop Suey* **36 piirrosta** miehitysajan oloista. Society of Chinese
  Artistsin puheenjohtaja **1946–1958** ja Singapore Art Societyn
  **1968–1979**. **Vuonna 2003** hän lahjoitti Singaporen
  taidemuseolle **yli 1 000 työtä**, mikä oli tuolloin suurin
  kansallisen kulttuuriperintölautakunnan saama taidelahjoitus; arvoksi
  laskettiin **noin 18 miljoonaa Singaporen dollaria**. **Pounding Rice
  (1953)** myytiin **2023** hintaan **699 000 dollaria**, hänen
  kalleimpansa huutokaupassa. Hän oli **Balin retken neljästä viimeisenä
  elossa**.
- **Chen Wen Hsi** (en-Wikipedia "Chen Wen Hsi", johdanto sekä osiot
  "Early life and education", "Career" ja "Style"): **1906–1991**, synt.
  Jieyangissa Guangdongissa. Opiskeli Shanghaissa, sai **1937**
  tunnustusta maalari **Xu Beihongilta** ja tuli **1948 Singaporeen
  aikoen viipyä enintään kolme kuukautta**; jäi, kun Liu Kang ja
  ylikomissaari **Malcolm MacDonald** suostuttelivat. Opetti **Chinese
  High Schoolissa 1949–1968** ja Nanyangin taideakatemiassa
  **1951–1959**; piti **1923–1992 kaikkiaan 38 yksityisnäyttelyä**.
  Kuuluisimpia ovat **gibbonimaalaukset**. Innoitus tuli **1200-luvun
  maalarin Muqin** teoksen jäljennöksestä; **Chen ei ollut koskaan
  nähnyt gibbonia** eikä siksi tiennyt, ettei sillä ole häntää, ja
  maalasi hännällisiä gibboneita, kunnes eräs ulkomaalainen korjasi
  virheen **1940-luvun lopulla**. Chen osti tuolloin lemmikkikaupasta
  **valkonaamaisen gibbonin 300 dollarilla** ja piti sitä
  puutarhassaan; lopulta gibboneita oli **kuusi** (yksi valkoinen,
  yksi harmaa, neljä mustaa).
- **Georgette Chen** (en-Wikipedia "Georgette Chen", johdanto sekä
  osiot "Early life and education", "Impressionist French period",
  "Post-Impressionist and Fauvist China–Hong Kong Period" ja "Nanyang
  style in Malaya and Singapore"): synt. **Chang Li Ying 23.10.1906**
  Zhejiangissa, kuoli **15.3.1993**. Isä oli antiikkikauppias, jolla oli
  liikkeitä Pariisissa, Lontoossa ja New Yorkissa. Opiskeli **Art
  Students Leaguessa New Yorkissa 1926** ja Pariisin **Académie
  Colarossissa 1927**. **Vuonna 1930** kaksi teosta valittiin **Salon
  d'Automneen**, ja yhden osti **Musée du Jeu de Paume** — harvinaista
  aasialaiselle taiteilijalle. Avioitui samana vuonna **Eugene Chen
  Yourenin** kanssa; pariskunta muutti Hongkongiin 1937 ja **japanilaiset
  pidättivät heidät 1944**, minkä jälkeen Eugene kuoli Shanghaissa
  saman vuoden toukokuussa. Muutti **1951 Penangiin** ja piti **1953
  Singaporessa 80 työn näyttelyn**, minkä jälkeen jäi pysyvästi.
  Opetti **Nanyangin taideakatemiassa 1954–1981**. Opetteli malaijia ja
  otti itselleen malaijilaisen nimen **Chendana** ("santelipuu"), jonka
  hänen malaijilaiset taiteilijaystävänsä ehdottivat, koska siinä on
  tavu "Chen". Rakensi talon **Siglap Plainille**, kutsui itseään
  singaporelaiseksi jo **1955** ja sai kansalaisuuden **1966**. Maalasi
  trooppisia hedelmiä (**Sweet Rambutans, 1965**), Singapore-jokea sekä
  sikhivartijoita ja buddhalaismunkkeja turbaanien ja kaapujen värien
  takia. **Cultural Medallion 1982**; koska hän oli sairaalassa,
  mitalin otti vastaan hänen oppilaansa **Ng Eng Teng**.

## Uutislähde

**CNA** (channelnewsasia.com), englanti. Testattu 6.9.2026: Singapore-
osaston syötteestä jäsentyy kaksitoista juttua, ja kolmesta eri
artikkelisivusta poimittiin `<article>`-lohkosta 10, 19 ja 47 yli 60
merkin kappaletta sekä `og:image` joka kerta. Kieli on englanti, joka on
Singaporen neljästä virallisesta kielestä se, jolla asiat hoituvat, ja
CNA on maan luetuimpia uutissivustoja.

Hylätyt ja testatut vaihtoehdot: **The Straits Times**
(`straitstimes.com/news/singapore/rss.xml`, 44 juttua) läpäisi
syötetestin ja yhden artikkelin (14 kappaletta), mutta toisella
kokeillulla artikkelisivulla ei ollut `<article>`-elementtiä eikä
`[itemprop="articleBody"]`-merkintää lainkaan — jäsennys on siis
epävarma. **Berita Harian** (malaiji, `beritaharian.sg/rss.xml`)
läpäisi syötetestin mutta ei artikkelitestiä: sivulla on `og:image`,
mutta ei yhtään `<article>`-elementtiä. **Zaobao** (kiina): kokeillut
RSS-osoitteet vastaavat 404:llä. **Tamil Murasu** (tamili,
`tamilmurasu.com.sg/rss.xml`) läpäisi molemmat testit (50 juttua,
7 kappaletta, og:image) ja jää varalähteeksi, jos CNA joskus lakkaa
toimimasta.
