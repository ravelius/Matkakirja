# Buenos Aires — faktakoostaja, uusi kaupunkilehti (E-Amerikan lauta, pilottikaupunki)

Lauta-id `southamerica`, kaupunki-id `buenosaires`, en-Wikipedia "Buenos Aires"
(ellei toisin mainita). Kaikki tiedot haettu en-Wikipediasta **23.8.2026**
(`action=raw` + `action=query&prop=coordinates`-API, `NODE_USE_ENV_PROXY=1`,
uusinnat kasvavalla viiveellä 429-vastauksiin — molemmat rajapinnat antoivat
useita 429-vastauksia haun aikana, ks. osio 8 huomio 6), ellei toisin
merkitty. Malli ja mitat luettu tiedostoista `docs/mantereet-tyoaineisto/
spec-mantereet.md` (SITOVA), `docs/aasia-tyoaineisto/lehtityo-resepti.md`
(SITOVA yleisresepti), `docs/moduulit/kaupunkilehti.md` sekä esimerkkinä
Pohjois-Amerikan pilotista (`docs/mantereet-tyoaineisto/faktapohja-newyork.md`
+ `tarkistus-newyork.md`, jonka rakennetta ja tarkkuustasoa tämä dokumentti
noudattaa). Raamatun linjaukset: `js/tyohuone-raamattu.js` osiot Perustuslaki,
Kuvat ja lähteet, Kaupungit.

**Tehtävän erityispiirre:** Buenos Aires on Etelä-Amerikan laudan
PILOTTIKAUPUNKI (toinen on Rio de Janeiro) — ensimmäinen mantereen
kaupunkilehti. Isoisän matkavuosi 1873 osuu Domingo Faustino Sarmienton
presidenttikauteen (1868–1874) ja aivan tuoreen keltakuume-epidemian (1871)
jälkimaininkeihin — kaupunki oli vielä toipumassa, kun eurooppalaisten
siirtolaisten aalto oli jo täynnä käynnissä. **Tango, josta Buenos Aires
tunnetaan nykyään, EI OLE VIELÄ OLEMASSA 1873** — laji syntyy vasta
1880-luvulla (ks. osio 2, Nosto H1) — tämä on tärkein anakronismivaroitus
koko koosteessa. En kirjoittanut lehtitekstejä, en ladannut kuvia enkä
koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta kirjoittajalle
ja tarkistajalle.

**Sisältölinjaus:** ei nykysotaa, ei nykypolitiikkaa. Falkland-suvereniteetti-
kiista ei koske Buenos Airesia suoraan (lauta-id `southamerica`, mutta kohde
`falkland` on eri kaupunki), joten sitä ei käsitellä tässä. Argentiinan
1976–1983 sotilasjuntta, "likainen sota" ja Falklandin sota 1982 ovat kaikki
kaupungin Wikipedia-artikkelin historiaosiossa, mutta ne ovat selvästi
isoisän ajan ULKOPUOLELLA (yli sata vuotta myöhemmin) — olen jättänyt ne
kokonaan pois ehdokaslistalta samalla logiikalla kuin New Yorkin
Draft Riots -tapaus: liian arka aihe kevyeen mainintaan, eikä ajallisesti
edes relevantti tälle koostukselle. 1873-ajan sisäinen levottomuus
(López Jordánin kapina, ks. Nosto H4) sen sijaan on 1800-luvun
sisällissotahistoriaa muiden pelin kaupunkien tapaan (esim. USA:n
sisällissota) ja kuuluu mukaan neutraalisti kerrottuna.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Buenos Aires"

**Johdanto (307 merkkiä, lyhyt kategoriajohdanto — HUOM osio 8, huomio 9):**

> Río de la Platan rannalle noussut satamakaupunki, jonka nimi tarkoittaa
> hyviä tuulia. Perustettiin kahdesti — 1536 ja pysyvästi 1580. Isoisän
> vierailun aikaan 1873 kaupunki oli nuori tasavalta täynnä eurooppalaisia
> siirtolaisia ja tuoretta keltakuumeen muistoa; tango syntyy vasta
> kymmenen vuotta myöhemmin.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Buenos Airesin 1873-kulma on poikkeuksellisen
rikas: presidentti selviää murhayrityksestä kadulla, maakunnassa käydään
sisäistä sotaa, kaupunki toipuu juuri epidemiasta, ja koko kaupungin
tulevaisuutta määrittävä ilmiö (tango) on vasta muutaman vuoden päässä
syntymästä mutta puuttuu vielä kokonaan. `historia` kantaa nämä neljä
säiettä (murhayritys, ensimmäinen Teatro Colón, tangon esiasteet, La Bocan
satamatyö) saman katon alle. Muut vakioaiheet (kuvataide, ruoka, luonto)
eivät nouse yhtä vahvoina TÄSSÄ vaiheessa — ne sopivat paremmin myöhemmiksi
teemasivuiksi kun kaari laajenee lähemmäs 1900-lukua.

**Johdanto (211 merkkiä):**

> Vuosi 1873: presidentti selviää murhayrityksestä, kapina jyllää
> maakunnissa, ja kaupunki toipuu vasta keltakuumeesta. Satamakortteleissa
> kuullaan jo tangon aineksia, vaikka itse tanssi puuttuu yhä vuosikymmenen.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Kaksi kertaa perustettu kaupunki" (485 merkkiä)**

> Espanjalainen Pedro de Mendoza perusti siirtokunnan Río de la Platan
> rannalle helmikuussa 1536 ja nimesi sen Pyhän Neitsyen mukaan hyvien
> tuulten kaupungiksi. Alkuperäisväestön hyökkäykset pakottivat asukkaat
> pakenemaan, ja paikka autioitui 1541. Pysyvä kaupunki syntyi vasta 1580,
> kun Juan de Garay purjehti Paraná-jokea alas Asunciónista ja perusti sen
> uudelleen nimellä Santísima Trinidad — satama säilytti alkuperäisen
> nimen, josta lyhennetty "Buenos Aires" vakiintui 1600-luvulla.

Faktat ja lähteet:
- Pedro de Mendoza perusti "Ciudad de Nuestra Señora Santa María del Buen
  Ayre" -nimisen siirtokunnan 2.2.1536 nykyisen San Telmon alueelle;
  intiaanien hyökkäykset pakottivat asutuksen hylkäämään paikan 1541/1542.
  — en-Wikipedia "Buenos Aires", osio "Viceregal times"
- Juan de Garay perusti kaupungin uudelleen pysyvästi 11.6.1580, purjehdittuaan
  Paraná-jokea Asunciónista; hän nimesi siirtokunnan "Santísima Trinidad"
  ja satama sai nimen "Puerto de Santa María de los Buenos Aires". —
  en-Wikipedia "Buenos Aires", osiot "Etymology" ja "Viceregal times"
- Lyhennetty muoto "Buenos Aires" vakiintui yleiseen käyttöön 1600-luvulla.
  — en-Wikipedia "Buenos Aires", osio "Etymology"
- Nimen alkuperästä on kilpailevia tarinoita (merenkulkijoiden pyhimys
  Buen Ayren neitsyt vs. kansantarina huudahduksesta "Miten hyvät tämän
  maan tuulet ovat!") — kauppias Eduardo Madero päätyi 1882 laajan
  arkistotutkimuksen jälkeen pyhimysselitykseen. — en-Wikipedia
  "Buenos Aires", osio "Etymology"

**Nosto K2 — "Keltakuume muutti kaupungin kartan" (464 merkkiä)**

> Kaksi vuotta ennen isoisän matkaa Buenos Airesia runteli keltakuumeen
> epidemia: se tappoi arviolta 14 000 ihmistä, ja koko kansallishallitus
> pakeni kaupungista taudin tieltä. Pahiten kärsi San Telmon kortteli,
> josta varakkaat perheet muuttivat pois — yli 10 000 kuolemaa ajoi
> asukkaita pohjoiseen uusiin kaupunginosiin. Epidemian jälkeen kaupunki
> perusti uuden hautausmaan, La Chacaritan, ja rakensi ensimmäiset
> vesijohto- ja viemäriverkostot tautien torjumiseksi.

Faktat ja lähteet:
- Vuoden 1871 keltakuumeen epidemia — todennäköisesti Paraguayn sodan
  seuraus — tappoi noin 14 000 ihmistä Buenos Airesissa; koko
  kansallishallitus pakeni kaupungista, ja taudintorjunnasta vastasi
  erillinen komissio. — en-Wikipedia "Domingo Faustino Sarmiento", osio
  "Population and public health"
- San Telmon kortteli kärsi pahiten: epidemia vaati yli 10 000 uhria ja
  ajoi alueen keski- ja yläluokan muuttamaan pois, myöhemmin Barrio
  Norteen. — en-Wikipedia "San Telmo, Buenos Aires", osio "History"
  (**RISTIRIITA lukumäärässä, ks. osio 8 huomio 1: 14 000 vs. yli
  10 000 — molemmat lähteet ovat en-Wikipediasta mutta eri artikkeleista**)
- Epidemian jälkeen perustettiin La Chacaritan hautausmaa, ja seuraavina
  vuosina rakennettiin kaupungin ensimmäiset vesijohto- ja
  viemäriverkostot. — en-Wikipedia "Domingo Faustino Sarmiento", osio
  "Population and public health"

**Nosto K3 — "Presidentti joka selvisi pommista" (541 merkkiä)**

> Isoisän vierailun aikaan presidentti oli kirjailija-poliitikko Domingo
> Faustino Sarmiento, joka uskoi koulutukseen ja Eurooppaan mallimaana.
> Hänen kaudellaan 1868–1874 maahan saapui 280 000 siirtolaista, ja jo
> vuoden 1869 väestönlaskennassa puolet Buenos Airesin asukkaista oli
> syntynyt ulkomailla. Sarmiento selvisi hengissä myös murhayrityksestä:
> 22. elokuuta 1873 hänen vaunujaan vastaan räjäytettiin pommi Corrientes-
> ja Maipú-katujen kulmassa, mutta ampujan ase petti käsiin, eikä
> presidentti — joka oli kuuro — edes kuullut räjähdystä.

Faktat ja lähteet:
- Domingo Faustino Sarmiento toimi Argentiinan presidenttinä 1868–1874;
  hänen kaudellaan maahan saapui 280 000 siirtolaista, jotka asettuivat
  pääasiassa Buenos Airesiin. — en-Wikipedia "Domingo Faustino Sarmiento",
  osio "Population and public health"
- Vuoden 1869 väestönlaskennassa (Argentiinan ensimmäinen) 50 % Buenos
  Airesin väestöstä oli äskettäin maahan tulleita siirtolaisia (koko
  maassa osuus oli 11 %). — en-Wikipedia "Immigration to Argentina",
  osio "Support and control of immigration"
- 22.8.1873 Sarmiento selvisi murhayrityksestä matkalla Vélez Sarsfieldin
  kotiin: räjähdys ravisti hänen vaunuaan Corrientes- ja Maipú-katujen
  kulmassa. Ampujat olivat italialaiset anarkistiveljekset Francisco ja
  Pedro Guerri, jotka väittivät federalistikenraali Ricardo López
  Jordánin palkanneen heidät; isku epäonnistui, koska Francisco Guerrin
  ase räjähti hänen kädessään. Sarmiento oli kuuro eikä kuullut
  räjähdystä. — en-Wikipedia "Domingo Faustino Sarmiento", osio
  "Presidency (1868–1874) > Overview"
- **[LISÄTTY 23.8.2026, ei osa 541 merkin nostotekstiä — taustaksi
  kirjoittajalle, ks. osio 8 huomio 12]** Sarmiento esitetään tässä
  nostossa koulutususkovaisena uudistajana ja murhan uhrina, mikä on
  lähteiden mukaan oikein, mutta hänen perintönsä on nykyään myös
  kiistanalainen: hänen "sivilisaatio vs. barbaria" -ajattelunsa ja
  alkuperäiskansapolitiikkansa perintöä on arvosteltu jälkikäteen
  esimerkiksi Michiganin yliopistossa, joka poisti hänen rintakuvansa
  opiskelijaprotestien jälkeen. Spec-mantereet.md:n "piikki herroihin
  itseensä" -kehyksen hengessä kirjoittaja voi harkita yhtä varovaista,
  neutraalia mainintaa tästä lehtitekstissä. — en-Wikipedia "Domingo
  Faustino Sarmiento"

**Nosto K4 — "Vaaleanpunainen talo joka ei ollut vielä vaaleanpunainen"
(516 merkkiä)**

> Vuonna 1873 hallituksen talo ei vielä ollut se vaaleanpunainen palatsi,
> jonka nykyturisti näkee: Sarmiento tilasi juuri sinä vuonna
> ruotsalaiselta arkkitehti Carl Kihlbergiltä uuden postitalon vanhan
> linnoituksen viereen, ja rakennukset yhdistettiin toisiinsa vasta
> 1880-luvulla. Talon vaaleanpunainen väri periytyy Sarmientolta, joka
> sekoitti maalin liittopuolueen punaisen ja unitaaripuolueen valkoisen
> värin symboliksi sovinnosta. Aukiokin oli vielä kahtia jakautunut:
> erottava pylväsrivistö purettiin vasta 1883.

Faktat ja lähteet:
- Presidentti Domingo Sarmiento tilasi 1873 postin päärakennuksen
  vanhan linnoituksen (Fuerte) eteläsivulle vapautuneelle tontille;
  suunnittelijana toimi ruotsalainen arkkitehti Carl (Carlos) Kihlberg,
  ja rakennus edusti Italian renessanssin ja Ranskan toisen keisarikunnan
  tyylejä. — en-Wikipedia "Casa Rosada", osio "The Post Office Palace"
- Sarmiento kaunisti myös vanhaa hallintorakennusta ja maalautti sen
  julkisivun vaaleanpunaiseksi — kertoman mukaan sekoittaakseen
  federalistien punaisen ja unitaarien valkoisen värin sovinnon
  symboliksi (vaihtoehtoinen selitys: maali sisälsi lehmänverta
  kosteudensuojana). — en-Wikipedia "Casa Rosada", osio "History"
- Postitalo ja hallintorakennus yhdistettiin arkkitehti Francesco
  Tamburinin suunnittelemalla kaariholvilla vasta 1884, presidentti
  Julio Rocan kaudella; nykyinen "Vaaleanpunainen talo" valmistui
  kokonaisuudessaan 1898. — en-Wikipedia "Casa Rosada", osiot "History"
  ja "The Palace"
- Plaza de Mayon nykyinen yhtenäinen aukio syntyi vasta 1883, kun
  aukion kahtia jakanut, 1804 valmistunut pylväsrivistö (Recova)
  purettiin pormestari Torcuato de Alvearin määräyksestä — isoisän
  aikaan aukio oli siis yhä kahtia jaettu (Plaza de la Victoria /
  Plaza del Fuerte). (Artikkelin infobox ja johdanto-osio antavat
  erikseen vuoden 1884 — Wikipedian sisällä pieni epäjohdonmukaisuus —
  mutta History-osio, jota tämä nosto siteeraa, antaa vuoden 1883.)
  — en-Wikipedia "Plaza de Mayo", osio "History"

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Tanssi jota isoisä ei vielä kuullut" (501 merkkiä)**

> Isoisä ei kuullut tangoa Buenos Airesissa — laji syntyy vasta
> 1880-luvulla, kymmenisen vuotta hänen vierailunsa jälkeen. Vuonna 1873
> kaupungin satamakortteleissa kuultiin silti aineksia, joista tango
> myöhemmin syntyi: entisten orjien candombe-rummutusta, maaseudun
> milonga-lauluja ja kuubalaista habaneraa. Sanaa "tango" käytettiin jo
> 1700-luvulta lähtien orjien kokoontumisista, ja siirtomaahallinto yritti
> kieltää ne ensimmäisen kerran vuonna 1789 — sata vuotta ennen kuin
> sanasta tuli tanssin nimi.

Faktat ja lähteet:
- Tango tanssilajina syntyi 1880-luvulla Río de la Platan
  satamakortteleissa Argentiinan milongan, espanjalais-kuubalaisen
  habaneran ja uruguaylaisen candomben yhdistelmästä. — en-Wikipedia
  "Tango", johdanto-osio
- Sanoja "tango" ja "tambo" käytettiin Río de la Platan alueella jo
  1700-luvulla viittaamaan orjien musiikkikokoontumisiin; siirtomaa-
  viranomaiset yrittivät kieltää tällaiset kokoontumiset ensi kertaa jo
  vuonna 1789. — en-Wikipedia "Tango", osio "History"
- Candombe-tanssit entisten orjaistuneiden ihmisten seremonioista
  muovasivat osaltaan nykyistä tangoa; tango-musiikki syntyi useiden
  eurooppalaisten musiikkimuotojen sulautumasta. — en-Wikipedia "Tango",
  osio "History"
- **Huom:** sanan "tango" alkuperästä on useita kilpailevia teorioita
  (afrikkalainen Shangó-jumalan nimi, espanjan "tambor"='rumpu',
  portugalin "tanger"='soittaa', ketšuan "tanpu") eikä mitään niistä ole
  todistettu — en-Wikipedia "Tango", osio "Etymology"

**Nosto H2 — "Ensimmäinen Teatro Colón seisoi eri paikassa" (470 merkkiä)**

> Ennen nykyistä maailmankuulua oopperataloa Buenos Airesissa oli toinen
> Teatro Colón, joka seisoi suoraan Plaza de Mayolla ja oli isoisän
> vierailun aikaan 16 vuotta vanha. Se avattiin 1857 Verdin La
> traviatalla, ja sen 2 500 paikkaa sisälsivät erillisen aitiorivin
> suruvaatteisille vieraille. Rakennus palveli oopperakaupunkia vuoteen
> 1888 asti, jolloin se suljettiin uuden, nykyisen Teatro Colónin tieltä
> — sitä ei avattu ennen kuin 1908, kaksikymmentä vuotta myöhemmin.

Faktat ja lähteet:
- Ensimmäinen Teatro Colón sijaitsi Plaza de Mayolla, rakennettiin
  1856–1857 ja avattiin 27.4.1857 Verdin oopperalla La traviata — vain
  neljä vuotta sen italialaisen kantaesityksen jälkeen. — en-Wikipedia
  "Teatro Colón", osio "The first Teatro Colón"
- Sali oli menestynyt yli 30 vuotta, 2 500 paikkaa, ja siinä oli erillinen
  aitiorivi suruvaatteisille vieraille. Rakennus suljettiin 13.9.1888
  uuden teatterin tieltä; nykyinen Teatro Colón avattiin vasta kaksikymmentä
  vuotta myöhemmin, 25.5.1908. — en-Wikipedia "Teatro Colón", osiot
  "The first Teatro Colón" ja "Opening and subsequent history"
- Nykyisen Teatro Colónin peruskivi laskettiin vasta 1889 — siis
  isoisän vierailun jälkeen. — en-Wikipedia "Teatro Colón", osio
  "Opening and subsequent history"

**Nosto H3 — "San Telmo ennen matkamuistoja" (493 merkkiä)**

**[KORJATTU 23.8.2026 — ks. korjaushistoria lopussa. Alkuperäinen versio
oli otsikoitu ja kehystetty La Bocaksi, mutta nojasi kokonaan San Telmon
artikkeliin ja sisälsi lähteistämättömän väitteen genovalaisesta
siirtolaisuudesta 1870-luvulla sekä väitteen San Telmon ja La Bocan
yhteisestä satamatyöläisalueesta — kumpikaan ei löytynyt kummastakaan
lähdeartikkelista. Riippumaton tarkistus (tarkistus-buenosaires.md,
osio 1) sai La Bocan artikkelin auki: se ei sisällä 1800-luvun
telakkatyö-/tiilenpoltto-/varastointisisältöä, ja sen ainoa maininta
liguurialaisista/genovalaisista siirtolaisista sijoittaa ilmiön
2000-luvun sijaan nimenomaan 1900-luvulle, ei 1870-luvulle. Nosto on
siis kirjoitettu uudelleen San Telmo-painotteisena, koska juuri San
Telmon artikkeli tukee väitettä telakkatyöstä, tiilenpoltosta ja
varastoinnista 1600-luvulta 1870-luvulle asti.]**

> Vuosisatoja ennen kahviloita ja antiikkitoria San Telmo oli pelkkää
> satamatyötä: telakkatyöläisten ja tiilenpolttajien kortteli joen
> tuntumassa, kaupungin ensimmäinen teollisuusalue jo 1600-luvulta
> lähtien. Isoisän vierailun aikaan 1870-luvulla korttelin vanhoissa
> aitoissa varastoitiin ja pakattiin Argentiinan pääasiallinen
> tulonlähde — villaa, vuotia ja nahkaa — ennen laivaan lastausta
> Eurooppaan. Vasta keltakuume-epidemian jälkeen varakkaat muuttivat
> pois ja kortteli jäi työväen omaksi.

Faktat ja lähteet:
- San Telmon alue oli kaupungin ensimmäinen "teollisuusalue" jo
  1600-luvulta lähtien: telakkatyöläisten ja tiilenpolttajien kortteli,
  jossa valmistettiin ja varastoitiin suurin osa Argentiinan villa-,
  vuota- ja nahkaviennistä — maan pääasiallinen tulonlähde vielä
  1870-luvulla. — en-Wikipedia "San Telmo, Buenos Aires", osio "History"
- Keltakuume-epidemia (1871) ajoi San Telmon keski- ja yläluokan
  muuttamaan pois Barrio Norteen (ks. Nosto K2), jonka jälkeen kortteli
  jäi yhä selvemmin työväen ja satamatyön korttelina. — en-Wikipedia
  "San Telmo, Buenos Aires", osio "History"
- La Boca EI enää esiinny tässä nostossa lähteenä: sen oma artikkeli
  (haettu onnistuneesti riippumattomassa tarkistuksessa 23.8.2026) ei
  sisällä 1800-luvun telakkatyö-/tiilenpoltto-/varastointisisältöä, ja
  sen ainoa maininta liguurialaisista siirtolaisista sijoittaa ilmiön
  1900-luvulle ("during the 20th century, when millions of immigrants
  from Europe and Asia arrived... many of its settlers originated from
  the Italian region of Liguria"), ei 1870-luvulle. Väite San Telmon ja
  La Bocan yhteisestä satamatyöläisalueesta oli aiemmassa versiossa
  lähteistämätöntä päättelyä eikä sitä toisteta tässä. — en-Wikipedia
  "La Boca", osio "History"

**Nosto H4 — "Kesä jolloin presidentti kävi sotaa omaa maataan vastaan"
(511 merkkiä)**

> Kesällä 1873, samana vuonna kun isoisä matkusti Argentiinassa,
> presidentti Sarmiento kävi sotaa omaa maataan vastaan: Entre Ríosin
> maakunnassa federalistikenraali Ricardo López Jordán nousi toista
> kertaa kapinaan 16 000 miehen armeijan kanssa. Sarmiento asetti hänen
> päästään hintapalkkion — minkä kongressi hylkäsi — ja lähetti kolme
> armeijaa maakuntaan. Kapina kukistettiin joulukuussa, ja López Jordán
> pakeni Uruguayhin; levottomuudet kertovat, miten hauras nuori tasavalta
> yhä oli pääkaupungin ulkopuolella.

Faktat ja lähteet:
- Toukokuussa 1873 federalistikenraali Ricardo López Jordán nousi
  toistamiseen kapinaan Entre Ríosin maakunnassa, komennossaan lopulta
  16 000 miestä tykistöineen. — en-Wikipedia "Domingo Faustino Sarmiento",
  osio "The last federalist caudillos in the Litoral"
- Sarmiento vastasi asettamalla hintapalkkion López Jordánin päästä
  (kongressin hylkäämä toimenpide) ja määräämällä Entre Ríosin
  liittovaltion väliintulon alle; kolme armeijaa Sotaministeri Martín de
  Gainzan komennossa valtasi maakunnan. — en-Wikipedia "Domingo Faustino
  Sarmiento", osio "The last federalist caudillos in the Litoral"
- Kapina kukistettiin verisen tappion jälkeen, ja López Jordán pakeni
  Uruguayhin joulukuussa 1873. — en-Wikipedia "Domingo Faustino
  Sarmiento", osio "The last federalist caudillos in the Litoral"
- Sama López Jordán mainitaan epäiltynä tilaajana Sarmientoon kohdistuneen
  murhayrityksen (Nosto K3) takana elokuussa 1873 — kaksi tapahtumaa
  samana vuonna kytkeytyvät samaan poliittiseen konfliktiin. —
  en-Wikipedia "Domingo Faustino Sarmiento", osio "Presidency
  (1868–1874) > Overview"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Rakenne noudattaa New Yorkin/Manilan `matkailijalle.artikkeli.jaksot`-mallia.
Faktat on valittu niin, etteivät ne toista osion 2 nostoja suoraan — samat
rakennukset voivat esiintyä uudella kulmalla, mutta ydinfaktat ovat eri.

**Jakso 1 — "Perille ja liikkeelle"**

> Buenos Aires nousee tasaiselle pampa-rannikolle siinä kohtaa, missä Río
> de la Plata avautuu maailman leveimmäksi jokisuuksi — vastarantaa
> Uruguayssa ei näe. Sijainti teki paikasta luontaisen kauppasataman jo
> espanjalaisaikana, ja 1800-luvun lopulla siitä tuli Etelä-Amerikan
> vilkkain siirtolaisten porttikaupunki. Nykyinen 48 kaupunginosan verkko
> syntyi vasta myöhemmin; isoisän aikaan kaupunki oli vielä tiivis, matala
> ja rajattu muutamaan kortteliin joen tuntumassa.

Faktat ja lähteet:
- Buenos Aires sijaitsee Río de la Platan lounaisrannalla; joki on
  maailman leveimpiä jokisuita. — en-Wikipedia "Buenos Aires",
  johdanto-osio ja osio "Geography"
- Kaupunki jakautuu nykyään 48 viralliseen barrioon (kaupunginosaan). —
  en-Wikipedia "Buenos Aires", osio "Districts"

**Jakso 2 — Alueen rakenne**

> Kaupunki on rakennettu tasaiselle pampalle ilman luonnollisia rajoja, ja
> osa nykyisistä alueista — satama, rautatieasemat, uudet puistot — on
> myöhemmin täytettyä maata joen suunnasta. 1800-luvun lopulla
> "porteños"-lempinimen saaneiden asukkaiden määrä kolminkertaistui
> vuosien 1887 ja 1915 välillä 500 000:sta 1,5 miljoonaan, kun
> eurooppalaiset siirtolaiset täyttivät kaupungin nopeammin kuin sitä
> ehdittiin suunnitella.

Faktat ja lähteet:
- Buenos Aires sijaitsee pampa-alueella; useat nykyiset alueet (Puerto
  Madero, satama, lentokenttä) on rakennettu täytemaalle Río de la
  Platan rannalle. — en-Wikipedia "Buenos Aires", osio "Geography"
- Porteñojen määrä kolminkertaistui 500 000:sta 1,5 miljoonaan vuosien
  1887 ja 1915 välillä eurooppalaisen siirtolaisuuden ansiosta. —
  en-Wikipedia "Buenos Aires", osio "Population origin"
- Vuoden 1869 väestönlaskennassa (lähin isoisän vierailua) kaupungissa
  oli 187 126 asukasta. — en-Wikipedia "Buenos Aires", osio
  "Demographics" (INDEC-väestötaulukko)

**Jakso 3 — Arjen ilmiö: satamasta laivaan**

> 1870-luvulla Buenos Airesin vaurastuminen nojasi villaan, vuotiin ja
> nahkaan: karjatuotteet olivat Argentiinan pääasiallinen tulonlähde
> vielä silloin, ja ne varastoitiin ja pakattiin satamakortteleiden
> vanhoissa aitoissa ennen laivaan lastausta Eurooppaan. San Telmon
> kaltaiset korttelit elivät tästä työstä — telakoista, varastoista
> ja tiilenpoltosta, ei vielä turismista tai tangosta.

Faktat ja lähteet:
- Villa, vuodat ja nahka olivat Argentiinan alueen pääasiallinen
  tulonlähde vielä 1870-luvulla, ja niiden vienti valmisteltiin ja
  varastoitiin San Telmon satamakortteleissa siirtomaa-ajalta lähtien.
  **[KORJATTU 23.8.2026: aiempi versio mainitsi tässä myös La Bocan —
  poistettu, koska väite yhteisestä satamakorttelialueesta ei löydy
  kummastakaan lähdeartikkelista, ks. Nosto H3:n korjaushuomio ja
  korjaushistoria lopussa.]** — en-Wikipedia "San Telmo, Buenos Aires",
  osio "History"

**Jakso 4 — Historian käännekohta: presidentti sotaa omaa maataan vastaan**

> Presidentti Sarmienton kausi (1868–1874) oli täynnä sisäistä
> levottomuutta: samana kesänä 1873 kun isoisä matkusti maassa,
> federalistikenraali Ricardo López Jordán nousi Entre Ríosin
> maakunnassa toista kertaa kapinaan 16 000 miehen armeijalla presidenttiä
> vastaan. Sarmiento lähetti kolme armeijaa maakuntaan, ja kapina
> kukistettiin vasta joulukuussa — muistutus siitä, että nuori tasavalta
> ei ollut vakaa pääkaupungin ulkopuolella.

Faktat ja lähteet: sama kuin Nosto H4 (ks. yllä) — jakso käsittelee
tapahtuman matkaoppaan näkökulmasta (mitä se kertoo maasta), nosto
tapahtumana itsessään. Jos päällekkäisyys koetaan ongelmaksi, jakso
voidaan korvata: vaihtoehtoinen aihe on Recoleta-hautausmaa, joka oli jo
1873 puoli vuosisataa vanha (perustettu 1822) mutta ilman nykyistä
muuria ja porttia (lisätty 1881) — ks. osio 8 huomio 5.

**Jakso 5 — Milloin kannattaa tulla**

> Buenos Airesissa on lauhkea, kostea ilmasto (Köppen Cfa) neljine
> vuodenaikoineen: kesät ovat kuumia, talvet leutoja mutta viileitä, ja
> lämpötilaa heiluttavat sekä pohjoisesta puhaltava kuuma ilma että
> etelästä iskevä kylmä pampero-tuuli, joka tuo äkkiä ukkoskuuroja ja
> viilenee nopeasti. Sadetta tulee melko tasaisesti ympäri vuoden, noin
> 1 260 mm vuodessa. Säähavaintoja on tehty keskeytyksettä vuodesta 1856
> lähtien — siis jo ennen isoisän vierailua.

Faktat ja lähteet (en-Wikipedia "Buenos Aires", osio "Climate"):
- Köppenin ilmastoluokka Cfa (lauhkea, kostea, "humid subtropical").
- Kesät kuumia ja kosteita (tammikuun keskilämpö n. 24,9 °C), talvet
  leutoja mutta viileitä (heinäkuun keskilämpö n. 11,0 °C).
- Sadetta n. 1 257,6 mm vuodessa.
- Pampero-tuuli tuo äkillisiä, voimakkaita ukkoskuuroja kuumien
  hellejaksojen jälkeen ja viilentää sään nopeasti.
- Buenos Aires Central Observatoryn (Agronomía) ennätyslämpötilat
  ulottuvat vuoteen 1856 — siis 17 vuotta ennen isoisän vierailua.

---

## 4. Kohdekartan kohteet

Koordinaatit MediaWiki-APIn `action=query&prop=coordinates`-kutsulla
(haettu 23.8.2026, `redirects=1`-parametrilla). Etäisyydet ja suunnat
laskettu koneellisesti haversine-kaavalla Python-skriptillä (New Yorkin
ennakkotapauksen mukaisesti, ei käsin).

| # | Nimi | Koordinaatit | Lähdeartikkeli | Etäisyys keskustasta | Suunta |
|---|---|---|---|---|---|
| 1 | Buenos Aires, Wikipedian kaupunkipiste | 34,60389°E 58,38139°L | "Buenos Aires" (API) | (vertailupiste) | — |
| 2 | Metropolitan Cathedral of Buenos Aires | 34,60741°E 58,37328°L | "Metropolitan Cathedral of Buenos Aires" (API) | 0,84 km | KA |
| 3 | Cabildo of Buenos Aires | 34,60889°E 58,37361°L | "Cabildo of Buenos Aires" (API) | 0,90 km | KA |
| 4 | Plaza de Mayo | 34,60833°E 58,37194°L | "Plaza de Mayo" (API) | 1,00 km | KA |
| 5 | Casa Rosada | 34,60806°E 58,37028°L | "Casa Rosada" (API) | 1,12 km | KA |
| 6 | Puerto Madero | 34,61194°E 58,36472°L | "Puerto Madero" (API) | 1,77 km | KA |
| 7 | Teatro Colón (nykyinen, 1908) | 34,60108°E 58,38308°L | "Teatro Colón" (API) | 0,35 km | LU |
| 8 | La Recoleta Cemetery | 34,58806°E 58,39306°L | "La Recoleta Cemetery" (API) | 2,06 km | LU |
| 9 | San Telmo (kaupunginosan keskus) | 34,62056°E 58,37167°L | "San Telmo, Buenos Aires" (API) | 2,06 km | KA |
| 10 | La Boca (kaupunginosan keskus) | 34,63556°E 58,36472°L | "La Boca" (API) | 3,84 km | KA |

(P = pohjoinen, KO = koillinen, I = itä, KA = kaakko, E = etelä, LO =
lounas, L = länsi, LU = luode. Kaikki koordinaatit eteläisellä ja
läntisellä pallonpuoliskolla — taulukossa merkitty E/L-etumerkein
selkeyden vuoksi, tarkista kirjoittajan omassa muunnoksessa etumerkkien
suunta koodin karttapiste()-funktiolle sopivaksi.)

**Rajausehdotus:** kohteet ryhmittyvät SF/NY-ennakkotapausten tavoin
kahteen ryppääseen. Historiallinen ydin (kohteet 2–6, Plaza de Mayon
ympäristö) on tiiviisti alle 2 km:n säteellä ja kattaa täsmälleen
isoisän ajan hallinnollisen keskustan — Cabildo, katedraali, Casa Rosada
ja aukio ovat kaikki KA-suunnassa toisistaan muutaman sadan metrin
päässä. Nykyinen Teatro Colón (kohde 7) on maantieteellisesti lähellä
mutta ANAKRONISTINEN 1873-näkökulmasta (ks. osio 8 huomio 2) — ensimmäinen
Teatro Colón sijaitsi sen sijaan käytännössä samassa pisteessä kuin
kohde 4 (Plaza de Mayo), koska rakennus seisoi suoraan aukiolla.
Etäisemmät kohteet San Telmo (2,1 km) ja La Boca (3,8 km) olivat isoisän
aikaan jo olemassa työläiskortteleina, mutta nykyisessä turistiasussaan
(Caminito, Feria de San Telmo) ne ovat 1900-luvun ilmiöitä — teksti
kannattaa kirjoittaa niin, että kuvaus kertoo ENSIN 1873-ajan arjesta
(satamatyö, tiilenpoltto) ja mainitsee nykyisen turistikuvan erikseen
myöhempänä kehityksenä. **Suositus: n. 4 km rajaus**, joka näyttää sekä
tiiviin hallintoytimen että sitä ympäröineet työläiskorttelit — tämä on
kartantekijän lopullinen päätös.

**Wikipedian kaupunkipisteen tarkkuudesta (spec-mantereet.md kohta 4):**
Buenos Airesin Wikipedia-infobox-piste osoittaa kaupungin nykyiseen
hallinnolliseen keskipisteeseen, joka on n. 0,8–1,1 km LUOTEESEEN
historiallisesta ytimestä (Plaza de Mayo / Cabildo). Ero ei ole yhtä
suuri kuin San Franciscon ennakkotapauksessa (~2 km), mutta suosittelen
silti ankkuroimaan kohdekartan Plaza de Mayoon tai Cabildoon, ei
Wikipedian raakapisteeseen — isoisän Buenos Aires OLI Plaza de Mayon
ympäristö.

---

## 5. Säätiedot

- **Keskustan koordinaatit ehdotus:** 34,60833°E 58,37194°L (Plaza de
  Mayo, ks. osio 4 rajausehdotus) TAI 34,60389°E 58,38139°L (Wikipedian
  raakapiste) — kirjoittajan/Fablen päätös kumpaa käytetään
  `saatiedot.js`:n lat/lon-kenttinä.
- **ERA5-normaalit puuttuvat tästä koosteesta:** en ajanut
  `tools/hae-saanormaalit.mjs`-työkalua (rajauksen mukaan en koske
  js/packs-tiedostoihin). Kirjoittajan/Fablen kannattaa ajaa
  `node tools/hae-saanormaalit.mjs --vain buenosaires` ennen lehden
  viimeistelyä New Yorkin mallin mukaisesti.
- **En-Wikipedian säälaatikko (varalähde 429-tilanteessa, Samarkand-mallin
  mukaisesti):** "Buenos Aires" -artikkelin ilmastotaulukko antaa
  kuukausikeskiarvot Buenos Aires Central Observatorylta (Agronomía),
  normaalikausi 1991–2020, ennätykset vuodesta 1856. Nämä EIVÄT ole
  pelin oman ERA5-työkalun lukuja, mutta kelpaavat samaan tapaan kuin
  New Yorkin NOAA-data.
- **Sanallinen vuodenkierto (varovainen, ei-numeerinen kuvaus, perustuu
  Wikipedian ilmasto-osioon):** Buenos Airesissa on neljä selkeää
  vuodenaikaa; kesät ovat kuumia ja kosteita hellejaksoineen, talvet
  leutoja mutta viileitä ja usein sumuisia (suhteellinen kosteus
  70–80 %). Pampero-tuuli katkaisee hellejaksot äkillisillä,
  voimakkailla ukkoskuuroilla ja tuo mukanaan viileämpää ilmaa; sade
  jakautuu melko tasaisesti ympäri vuoden ilman selvää kuivaa kautta.
  Lumi on erittäin harvinaista (viimeksi 2007, sitä ennen 1918).

---

## 6. Kuva-aiheet

Erityishuomio: **ei tunnistettavia ihmisiä missään kuvassa** (kaukaiset
pisteet ja selin olevat kelpaavat). Buenos Airesilla ei ole tuhoutunutta
kaupunkia -linjauksen tarvetta.

### 6.1 Avauskuvat (3, teemasivun `historia` avaukseen)

1. Plaza de Mayo / Cabildo lähikuvassa (siirtomaa-ajan hallintorakennus,
   pystyssä jo 1610-luvulta) — 1873-ajan hallinnon ydin.
2. Casa Rosadan tai vanhan Postitalon (Kihlberg, 1873) julkisivu —
   suoraan isoisän matkavuoden rakennusprojekti.
3. Ensimmäisen Teatro Colónin historiallinen kuva (litografia/valokuva
   1864 tai 1881, Commonsista — rakennus purettu 1888, ei nykykuvaa
   saatavilla).

### 6.2 Kansikuvaehdokkaiden KATEGORIALISTAUS — 3 laajaa yleiskuvaa

Raamatun KANSIKARUSELLI-linjauksen (21.8.2026) mukaisesti: kolme LAAJAA
yleiskuvaa kaupungin ERI puolilta, ei yksityiskohtaa, sisäkuvaa,
reliefiä, ruokaa tai esinettä. Alla Commons-KATEGORIAT hakulähtökohdaksi
— EI valittuja tiedostoja, kirjoittaja tekee lopullisen valinnan ja
silmätarkistuksen:

1. **Siluetti/keskusta laajana:** `Category:Aerial photographs of Buenos
   Aires` tai `Category:Panoramas of Buenos Aires` — Plaza de Mayon
   ympäristö tai downtown-siluetti.
2. **Ranta/joki:** `Category:Río de la Plata` tai `Category:Puerto
   Madero` — laaja näkymä joesta/satamasta, korostaen maailman leveintä
   jokisuuta.
3. **Maamerkki ympäristössään:** `Category:Casa Rosada` tai
   `Category:Plaza de Mayo` laajana ilmakuvana tai katunäkymänä, jossa
   rakennus näkyy osana ympäröivää aukiota, ei irrallisena
   yksityiskohtana.

Koska osa 1873-ajan rakennuksista (ensimmäinen Teatro Colón, vanha
jaettu Plaza de Mayo) ei ole enää olemassa, kannattaa hakea myös
1800-luvun PD-vaihtoehtoja samaan tapaan kuin New Yorkissa: Commonsista
löytyy jo tarkistamattomia mutta lupaavia kandidaatteja kuten "Buenos
Aires. Plaza Victoria l LCCN2017656795.jpg" (LoC-photochrom, 1890,
PD) ja "Vieja Recova.jpg" (1864, vanha jaettu aukio) — molemmat
esiintyvät jo pelin `southamerica-valokuvat.js`:ssä (ks. osio 6.4),
joten NIITÄ EI PIDÄ käyttää uudelleen kansikuvina päällekkäisyyden
välttämiseksi (kaupunkilehti.md: "yksi kuva esiintyy kaupungissa vain
kerran").

### 6.3 Nosto-/jaksokuvat (8)

1. Plaza de Mayon/Cabildon 1800-luvun kuva jaetusta aukiosta (Recova-
   pylväsrivistö, purettu 1883) — Commonsista, esim. artikkelin "Plaza
   de Mayo" galleriakuvat "Vieja Recova.jpg" (1864) tai "Plaza de la
   Victoria.png" (1867-näkymä). HUOM: "Vieja Recova.jpg" on jo käytössä
   `southamerica-valokuvat.js`:ssä (ks. 6.4) — tarkista päällekkäisyys.
2. Casa Rosadan/Postitalon 1870-luvun kuva — Commonsissa mahdollisesti
   "Palacio de Correos y Telegrafos de Buenos Aires.jpg" (Kihlbergin
   suunnittelema postitalo) tai "Casa Rosada (1876).jpg" — molemmat
   mainittu Casa Rosada -artikkelin kuvateksteissä, tarkistettava
   Commonsista erikseen.
3. Ensimmäisen Teatro Colónin historiallinen kuva: "Teatro colon
   1881.jpg" (Alexander Witcombin valokuva 1881, ainoastaan 8 vuotta
   isoisän vierailun jälkeen) — mainittu Teatro Colón -artikkelin
   kuvatekstissä, tarkistettava Commonsista.
4. Domingo Faustino Sarmiento -muotokuva vuodelta 1873 — artikkelissa
   mainittu tiedosto "Sarmiento (1873).jpg", täsmälleen isoisän
   matkavuodelta.
5. La Chacaritan hautausmaan varhainen kuva (keltakuume-epidemian
   seuraus) — haettava erikseen Commonsista.
6. Riachuelo-joen/La Bocan satamatyön historiallinen kuva (telakat,
   villan/nahan lastaus) — haettava erikseen, aikakausikuva
   1870–1890-luvuilta.
7. Puerto Madero -alueen KARTTA tai piirros ennen satamaa (alue oli
   1873 vielä täyttämätöntä jokirantaa) — kontrasti nykyiseen
   Puerto Maderoon.
8. Recoleta-hautausmaan varhainen kuva "Cementerio de la Recoleta -
   Buenos Aires, según Pellegrini.tif" (1841-näkymä, mainittu Recoleta-
   artikkelissa) — hautausmaa oli jo 1873 puoli vuosisataa vanha mutta
   ilman nykyistä 1881 muuria/porttia.

### 6.4 Ennen ja nyt -kuvaparin tilanne

**TÄRKEÄ LÖYDÖS: Buenos Airesilla on jo valmis, PELIIN TARKISTETTU
kuva-aineisto** tiedostossa `js/packs/southamerica-valokuvat.js` (rivit
n. 235–270+, avain `buenosaires`) — mutta se on kirjoitettu VANHAN
kuvataulun (`galleria`/`lisat`) muotoon, ei uuden `ennenNyt`-kentän
kaksikkomuotoon. Sisältö:

- **Päävanha kuva:** "Buenos Aires. Plaza Victoria l LCCN2017656795.jpg",
  vuosi 1890, lähde Photoglob Co./Library of Congress (PD). Kuvaa Plaza
  Victoria/Plaza de Mayoa käsinväritettynä photochrom-vedoksena.
- **Muut jo tarkistetut kuvat:** "Feria de San Telmo, Buenos Aires.jpg"
  (2005, CC BY 3.0), "San Telmo Plaza Dorrego.JPG" (2008, CC BY-SA 3.0),
  "2018-10-19 La Boca, Buenos Aires, Argentina (Martin Rulsch) 10.jpg"
  (2018, CC BY-SA 4.0, Caminito).
- **Toimenpide kirjoittajalle:** näistä ei suoraan synny valmista
  `ennenNyt`-paria samalla tavalla kuin New Yorkin Mulberry Streetillä,
  koska "Plaza Victoria" (1890) ja nykykuvat (San Telmo tori, La Boca)
  eivät kuvaa TÄSMÄLLEEN samaa kohdetta samasta kuvakulmasta. Jos
  `ennenNyt`-pari halutaan, suosittelen hakemaan ERIKSEEN Commonsista
  nykykuva samasta Plaza de Mayo -kuvakulmasta kuin 1890-kuva, tai
  käyttämään Casa Rosadan 1876-kuvaa (mainittu Casa Rosada -artikkelissa,
  ei vielä tarkistettu Commonsista) parina nykyisen Casa Rosadan kanssa
  — tämä olisi vahvin 1873-kulman pari, koska sama rakennus, sama kuvakulma
  on mahdollinen.
- Näitä vanhoja kuvia EI PIDÄ käyttää uudelleen osion 6.2/6.3
  kansi-/nostokuvina päällekkäisyyden välttämiseksi.

### 6.5 Kuvien lähdehuomio

En hakenut, katsonut enkä valinnut yksittäisiä Commons-tiedostoja tässä
koosteessa (rajauksen mukaisesti, paitsi mitä jo peliin tarkistetun
`southamerica-valokuvat.js`:n lukeminen paljasti) — yllä on vain
kategoria- ja aihetasoisia ehdotuksia. Kirjoittaja tekee varsinaisen
kuvahaun, silmätarkistuksen ja lisenssivarmistuksen lehtityö-reseptin
kuvasääntöjen mukaisesti.

---

## 7. Vanhan äänitteen ehdokkaat (PD)

**Tärkeä varoitus ennen hakua:** koska tango ei ollut vielä olemassa
1873, kaupunkikohtainen "vanhat äänet" -tallenne (`js/packs/
vanhat-aanet.js`) EI voi olla varhainen tango-levytys esitettynä
"isoisän aikaisena musiikkina" — se olisi anakronismi (ks. osio 8
huomio 2). Sopivin ratkaisu on joko (a) tallenne joka on eksplisiittisesti
myöhempää, tangon syntymän jälkeistä aikaa (esim. 1900-luvun alun
tango-78-levy, kehystettynä lehdessä selvästi "syntyi vuosikymmen
isoisän vierailun jälkeen") tai (b) ei tallennetta lainkaan.

En ehtinyt tehdä varsinaista archive.org/Commons-hakua tälle osiolle
tämän koosteen rajatussa ajassa (ks. osio 8 huomio 6, toistuvat
429-katkokset veivät suuren osan käytettävissä olevasta hakuajasta).
Suositus kirjoittajalle: hae ensin Commonsista/archive.orgista varhaisia
PD-tango-78-levyjä (esim. Ángel Villoldon "El Choclo", tunnettu vuodelta
1903 — TARKISTAMATON tässä koosteessa, pelkkä yleistieto joka on
vahvistettava lähteestä) ja kehystä se lehdessä selvästi "tulevaisuuden
äänenä" pikemminkin kuin isoisän kuulemana musiikkina. Vaihtoehtoisesti
maan varatallenne (`VANHAT_AANET_MAA`, ARG) voi olla perusteltu valinta,
jos sopivaa kaupunkikohtaista PD-äänitettä ei löydy — ks.
`docs/moduulit/kaupunkilehti.md` ohje.

---

## 8. Ristiriidat, epävarmuudet ja huomiot

1. **Keltakuume-epidemian 1871 kuolinluku on ristiriitainen kahden
   en-Wikipedia-artikkelin välillä:** Sarmiento-artikkeli antaa n. 14 000
   kuollutta koko kaupungissa, San Telmo -artikkeli "yli 10 000" pelkästään
   San Telmon korttelissa. Nämä EIVÄT ole suoraan ristiriidassa (10 000+
   yhdessä korttelissa voi sopia 14 000:een koko kaupungissa), mutta
   olen kirjoittanut molemmat luvut auki Nostoon K2 sen sijaan että
   valitsisin yhden — kirjoittaja/tarkistaja päättää lopullisen muotoilun.
   — en-Wikipedia "Domingo Faustino Sarmiento" ja "San Telmo, Buenos
   Aires"

2. **Tango EI ollut olemassa 1873 — tärkein anakronismivaroitus koko
   koosteessa.** En-Wikipedian "Tango"-artikkeli on yksiselitteinen: laji
   syntyi 1880-luvulla. Isoisän matkakirjatekstissä (jos/kun sellainen
   joskus kirjoitetaan) hän EI voi kuulla tai nähdä tangoa Buenos
   Airesissa — ainoastaan sen esiasteita (candombe, milonga, habanera).
   Tämä poikkeaa olemassa olevasta pelisisällöstä: `southamerica-
   saapumiset.js`:n buenosaires-kohdan isoisän lainaus ("Heidän mukanaan
   tulivat sävelet, joista pian syntyi tango. Ukko ehti paikalle juuri
   ennen sitä.") on itse asiassa JO KIRJOITETTU tämän anakronismin
   tietoisena — se sanoo suoraan isoisän ehtineen paikalle "juuri ennen"
   tangoa, ei nähneen sitä. **Tämä olemassa oleva teksti on siis jo
   linjassa faktojen kanssa eikä vaadi korjausta**, mutta uuden
   kirjoittajan kannattaa käyttää samaa "juuri ennen" -kehystä
   kaikkialla, ei vain saapumistekstissä. — en-Wikipedia "Tango", osio
   "History"; `js/packs/southamerica-saapumiset.js`

3. **Falklandin suvereniteettikiista ei koske Buenos Airesia** —
   spec-mantereet.md:n Falkland-linjaus (yksi neutraali virke) koskee
   kohdetta `falkland`, joka on eri kaupunki samalla laudalla. En ole
   tuonut Falkland-aihetta tähän koosteeseen ollenkaan.

4. **[KORJATTU 23.8.2026] La Boca -artikkeli ei avautunut TÄMÄN
   koosteen alkuperäisessä hakuvaiheessa (ks. huomio 6), ja Nosto H3:n
   faktat koottiin tuolloin korvaavasti San Telmon artikkelista mutta
   otsikoitiin virheellisesti La Bocaksi, mukaan lukien lähteistämätön
   väite "San Telmo ja La Boca olivat 1800-luvulla osa samaa
   satamatyöläisaluetta". Riippumaton tarkistus (tarkistus-
   buenosaires.md) sai La Bocan artikkelin auki 23.8.2026: se EI tue
   väitettä yhteisestä satamatyöläisalueesta, eikä siinä ole
   1800-luvun telakkatyö-/tiilenpoltto-sisältöä — artikkelin ainoa
   maininta liguurialaisista/genovalaisista siirtolaisista sijoittaa
   ilmiön 1900-luvulle. Nosto H3 ja Jakso 3 on tämän korjauskierroksen
   yhteydessä kirjoitettu uudelleen San Telmo-painotteisina, eikä
   lähteistämätöntä väitettä yhteisestä satamatyöläisalueesta enää
   toisteta. Ks. Nosto H3:n korjaushuomio ja korjaushistoria lopussa.
   La Bocan 1882 "itsenäistymisyritys" ja 1900-luvun genovalainen
   siirtolaisuus jäävät joka tapauksessa 1873-koosteen aikarajauksen
   ulkopuolelle eivätkä siis nouse tähän faktapohjaan korvaavanakaan
   aiheena.

5. **Recoleta-hautausmaa oli jo olemassa 1873 mutta ilman nykyistä
   ilmettä:** perustettu 1822 vanhan fransiskaaniluostarin puutarhaan,
   mutta sen tunnusomainen muuri ja pylväsporttikäytävä rakennettiin
   vasta 1881 (arkkitehti Juan Antonio Buschiazzo, pormestari Torcuato
   de Alvearin tilauksesta) — kahdeksan vuotta isoisän vierailun
   jälkeen. Jos hautausmaa nostetaan kuvaan tai tekstiin, kannattaa
   mainita että isoisän aikainen hautausmaa näytti vaatimattomammalta.
   — en-Wikipedia "La Recoleta Cemetery", osio "History"

6. **Toistuvat 429-katkokset veivät merkittävän osan hakuajasta.** Sekä
   `action=raw`- että `action=query`-rajapinnat antoivat useita
   peräkkäisiä 429-vastauksia haun aikana; onnistuin lopulta hakemaan
   kaikki suunnitellut artikkelit paitsi La Boca (ks. huomio 4) 5–95
   sekunnin odotuksilla pyyntöjen välissä. Tämä vastaa lehtityö-
   reseptin kuvausta ("katkokset ovat normi") mutta hidasti koostetta
   merkittävästi.

7. **Etäisyydet ja suunnat osiossa 4 on laskettu koneellisesti**
   (Python-skripti, haversine-kaava pallogeometrialla, R=6371 km,
   erillinen bearing-laskenta 8-suuntaiselle ilmansuuntamerkinnälle),
   EI käsin.

8. **Väestönlaskentojen luvut ovat kansallisia/kaupunkitasoisia eri
   lähteistä ja saattavat pyöristyä hieman eri tavoin eri artikkeleissa**
   (esim. 1869 kaupungin väkiluku 187 126 Buenos Aires -artikkelin
   INDEC-taulukosta vs. Immigration-artikkelin yleisluontoisempi "50 %
   siirtolaisia" -prosenttiluku samalta vuodelta) — molemmat on merkitty
   omine lähteineen, ei yhdistetty samaksi väitteeksi.

9. **Sivujen johdanto-kentät on kirjoitettu Raamatun 20.8.2026-linjauksen
   ("Sivujen johdanto-kentät LYHYITÄ, 1–2 virkettä") mukaisesti, EI
   erillisen ARTIKKELIT-paketin etusivun leipätekstin (7–10 virkettä,
   ~700–1100 mrk) mukaisesti** — sama huomio kuin New Yorkin koosteessa
   (sen osio 8 huomio 9). Kirjoittajan tehtävä on laajentaa `kaupunki`-
   sivun johdanto tuohon pidempään ARTIKKELIT-muotoon käyttäen Nostojen
   K1–K4 faktoja raaka-aineena (nimi, kaksi perustamista, keltakuume,
   Sarmiento, siirtolaisuus, tango vielä syntymättä) — tässä koosteessa
   on tarjolla riittävästi faktaa 7–10 virkkeen tekstiin, mutta en ole
   itse kirjoittanut sitä valmiiksi rajauksen mukaisesti ("en
   kirjoittanut lehtitekstejä").

10. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi** merkkimäärätavoitteiden mukaan, ja merkkimäärät on
    laskettu KONEELLISESTI Python-skriptillä (`len()`). Nostot K1–K4,
    H1–H4 ovat kaikki 440–660 merkin sisällä (kaupunkilehti.md:n mitta,
    tarkat luvut otsikoissa). Jaksot eivät kaupunkilehti.md:n mukaan
    kanna samaa tiukkaa merkkirajaa kuin nostot, joten niiden pituudet
    (398–468 merkkiä) ovat viitteellisiä, saman mittaluokan mukaisia
    kuin New Yorkin jaksot.

11. **[LISÄTTY 23.8.2026] Mendozan siirtokunnan autioitumisvuosi on
    ristiriitainen en-Wikipedian OMASSA "Buenos Aires" -artikkelissa:**
    osio "Etymology" antaa vuoden 1541 ("was abandoned in 1541"), mutta
    osio "Viceregal times" (sekä leipäteksti että kuvateksti) antaa
    vuoden 1542 ("in 1542, the site was thusly abandoned"; "had been
    abandoned since 1542"). Nosto K1:n Faktat-lähteet-rivi hedgeaa jo
    oikein muodossa "1541/1542", mutta itse nostotekstissä lukee vain
    "autioitui 1541" mainitsematta epävarmuutta. Kirjoittajan kannattaa
    joko pyöristää nostotekstissä ("1540-luvun alussa") tai mainita
    molemmat vuodet, samaan tapaan kuin keltakuume-lukuristiriita on
    avattu Nostossa K2 (ks. huomio 1). — en-Wikipedia "Buenos Aires",
    osiot "Etymology" ja "Viceregal times"

12. **[LISÄTTY 23.8.2026] Sarmiento esiintyy koosteessa yksinomaan
    myönteisessä valossa** (koulutususkovainen, murhan uhri,
    siirtolaisuuden edistäjä) — spec-mantereet.md:n "piikki herroihin
    itseensä" -kehyksen hengessä tähän on lisätty yksi varovainen
    maininta Nostoon K3 (ks. yllä): Sarmienton "sivilisaatio vs.
    barbaria" -ajattelu ja hänen alkuperäiskansapolitiikkansa perintö on
    nykyään kiistanalainen, minkä myös en-Wikipedian oma
    Sarmiento-artikkeli mainitsee (Michiganin yliopiston rintakuvan
    poistaminen opiskelijaprotestien seurauksena, perusteluna
    "controversies surrounding his policies towards the indigenous
    people in Argentina"). Tämä ei ole 1873-ajan tapahtuma sinänsä
    (Conquest of the Desert toteutui vasta Roca'n kaudella), joten
    maininta on tarkoituksella lyhyt ja neutraali eikä laajenna
    aikarajausta. — en-Wikipedia "Domingo Faustino Sarmiento"

---

## Korjaushistoria

**23.8.2026 — korjauskierros riippumattoman tarkistuksen
(`tarkistus-buenosaires.md`, tuomio "kelpaa korjauksin") perusteella.**
Kaikki en-Wikipedia-lähteet tarkistettu uudelleen `action=raw`-API:lla,
`NODE_USE_ENV_PROXY=1`, 429-uusinnat kasvavalla viiveellä.

1. **Nosto H3 kirjoitettu kokonaan uudelleen** ("Satamakortteli ennen
   matkamuistoja" → "San Telmo ennen matkamuistoja", 458 → 493
   merkkiä). Alkuperäinen versio oli otsikoitu/kehystetty La Bocaksi
   mutta nojasi kokonaan San Telmon artikkeliin, ja sisälsi
   lähteistämättömän väitteen (a) San Telmon ja La Bocan yhteisestä
   1800-luvun satamatyöläisalueesta ja (b) genovalaisten siirtolaisten
   kasautumisesta 1870-luvulla. La Bocan oma artikkeli (nyt haettu
   onnistuneesti) ei tue kumpaakaan väitettä — sen ainoa maininta
   liguurialaisista siirtolaisista sijoittaa ilmiön 1900-luvulle.
   Uusi nosto on San Telmo-painotteinen ja lähteistetty vain San Telmon
   artikkelista. Jakso 3 korjattu samalla logiikalla (La Boca-maininta
   poistettu lähteistämättömänä). Osio 8 huomio 4 kirjoitettu
   uudelleen selittämään korjaus. Mitta tarkistettu Nodella
   (`[...s].length`).
2. **Nosto K4:n Plaza de Mayo -pylväsrivistön purkuvuosi
   yhtenäistetty:** Faktat-lähteet-rivi muutettu "1884" → "1883"
   vastaamaan nostotekstiä ja en-Wikipedian "Plaza de Mayo" -artikkelin
   History-osiota (jota faktapohja itse siteeraa); mukaan lisätty
   huomio Wikipedian omasta infobox/johdanto-ristiriidasta (1884).
3. **Osioon 8 lisätty huomio 11:** Buenos Aires -artikkelin sisäinen
   ristiriita Mendozan siirtokunnan autioitumisvuodesta (1541
   Etymology-osiossa vs. 1542 Viceregal times -osiossa) — Nosto K1:n
   Faktat-lähteet-rivi hedgeasi jo tämän, mutta osio 8 ei maininnut
   sitä ennen tätä korjausta.
4. **Osioon 8 lisätty huomio 12 ja Nosto K3:n faktat-listaan täydennys**
   spec-mantereet.md:n "piikki herroihin itseensä" -kehyksestä:
   Sarmientoa ei enää esitetä yksinomaan myönteisessä valossa —
   lisätty neutraali, ei-nostotekstiin kuuluva tausta-maininta hänen
   alkuperäiskansapolitiikkansa kiistanalaisesta perinnöstä
   (en-Wikipedian oman Sarmiento-artikkelin mukaan).

Ei-pakollisiksi merkityt tarkistajan huomiot (osio 3: keltakuumeen
"San Telmon korttelissa" -muotoilun tarkkuus) jätetty ennalleen —
tarkistus totesi, ettei korjausta vaadita.
