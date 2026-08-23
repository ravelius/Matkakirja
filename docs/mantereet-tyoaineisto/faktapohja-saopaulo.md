# São Paulo — faktakoostaja, uusi kaupunkilehti (E-Amerikan lauta)

Lauta-id `southamerica`, kaupunki-id `saopaulo`, maa BRA, en-Wikipedia
"São Paulo" (ellei toisin mainita). Kaikki tiedot haettu en-Wikipediasta
**23.8.2026** (`action=raw` + `action=query&prop=coordinates`-API,
NODE_USE_ENV_PROXY=1 ei tarvittu suoralle curl-kutsulle; MediaWiki-
coordinates-rajapinta vastasi kerran "too many requests" -virheellä,
uusinta `curl --retry 6 --retry-delay 5` -asetuksin korjasi heti).
Malli ja mitat luettu tiedostoista `docs/mantereet-tyoaineisto/
spec-mantereet.md` (SITOVA — E-Amerikan lauta), `docs/aasia-tyoaineisto/
lehtityo-resepti.md` (SITOVA yleisresepti), `docs/moduulit/
kaupunkilehti.md` sekä esimerkkinä `docs/mantereet-tyoaineisto/
faktapohja-vancouver.md`. Kaupungin visa on tarkistettu tiedostosta
`js/packs/southamerica-questions.js` (kohta `saopaulo`, viisi
kysymystä: metropolialue eteläisen pallonpuoliskon väkirikkain, kahvi
1800-luvun rikkauden lähteenä/terra roxa, sijainti Brasiliassa, Avenida
Paulista, japanilaisyhteisö suurin Japanin ulkopuolella) — näistä
neljä aihetta nousee myös tässä faktapohjassa (ks. osio 7, kohta 1
siitä miten nostot eroavat visan sanamuodosta ja luvuista). Merkkimäärät
on laskettu KONEELLISESTI Python-skriptillä (`len()`); skriptit
tallennettu scratchpadiin (`texts.py`, `johdannot.py`, `jaksot.py`).

**Spec-mantereet.md:n sitovat linjaukset joita tässä on noudatettu:**
(1) ei nykypolitiikkaa eikä nykyrikollisuutta — en-Wikipedian oma
"Public security" -osio (rikostilastot, homisidit) on jätetty kokonaan
pois koosteesta, samoin LGBT-osion nykypolitiikka; (2) kohdekartan
keskipiste valitaan HISTORIALLISEN YDINKESKUSTAN mukaan, ei hallinnollisen
koordinaattipisteen (San Franciscon ennakkotapaus) — São Paulon
Wikipedia-infoboksin pyöristetty kaupunkipiste (23,55°S 46,63333°W) on
vain n. 0,3–0,4 km päässä todellisesta perustamispaikasta, mutta osiossa
4 kartan keskipisteeksi on silti valittu nimenomaan Pátio do Colégio —
paikka jossa kaupunki tosiasiassa perustettiin 1554 — eikä infoboksin
pistettä; (3) 1873-kulma kerrotaan tapahtumina neutraalisti, piikki
mahdollisiin herroihin ei koskaan paikallisiin tai siirtolaisiin.

**Siirtolaisuuslinjaus (tehtävänannon erityishuomio):** italialainen,
japanilainen ja libanonilainen siirtolaisuus on koko koosteen ajan
kuvattu KAUPUNGIN NYKYISENÄ ELÄMÄNÄ — omana teemasivunaan `siirtolaisuus`,
ei historiasivun kuriositeettina. En-Wikipedian oma leipäteksti tukee
tätä suoraan: "[São Paulo on] home to the largest Arab, Italian, and
Japanese diasporas in the world, with ethnic neighborhoods like Bixiga,
Bom Retiro, and Liberdade" (pääartikkelin johdanto). Köyhyyttä
(favelat, kodittomuus) ei ole nostettu koosteeseen lainkaan — se olisi
sekä spec-mantereet.md:n nykyrikollisuus-rajauksen että Raamatun
köyhyyden-estetisoinnin-kiellon vastaista.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "São Paulo"

**Johdanto (208 merkkiä):**

> Jesuiitat perustivat 1554 kukkulalle pienen lähetyskoulun, josta
> kasvoi Etelä-Amerikan suurin kaupunki. Rautatie satamaan ja kahvin
> vientitulot muuttivat 1800-luvun lopulla köyhän kylän maailman
> metropoliksi.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Vakioaihe (`AIHE_IKONIT`-listalla on `historia`
valmiina omalla kuvakkeellaan). São Paulon aineisto on poikkeuksellisen
vahva juuri siinä murroskohdassa, jonka isoisän vuosi 1873 osuu keskelle:
vanha barokkikatedraali seisoi vielä torilla, kaupunki oli vasta
saamassa rautatiensä täyteen käyttöön, ja parikymmentä vuotta myöhemmin
koko kaupunkikuva oli mullistunut. `historia`-sivu jatkaa kaupunkisivun
tarinaa syvemmälle kuin neljä nostoa sallivat.

**Johdanto (190 merkkiä):**

> São Paulo oli isoisän matka-aikaan vielä pieni, köyhä kaupunki
> barokkikatedraaleineen ja kapeine katuineen. Rautatie ja kahvi
> muuttivat sen vuosikymmenessä pystysuoraksi maailmankaupungiksi.

### Sivu C — teemasivu, ehdotettu id `siirtolaisuus`, nimi "Siirtolaisuus"

**Perustelu valinnalle:** EI vakioaihe (`AIHE_IKONIT`-listalla ei ole
sopivaa valmista aihetta — lähinnä tulisi yleiskuvake/kirjanmerkki,
ellei kirjoittaja tee omaa viivakuvaketta). Perusteltu poikkeus samaan
tapaan kuin Vancouverin `alkuperaiskansat`: siirtolaisuus ei ole vain
`historia`-sivun taustaa, vaan se ON nykyinen São Paulo — kaupungissa on
en-Wikipedian oman sanan mukaan maailman suurimmat italialais-, japani-
ja arabidiasporat, ja niiden kaupunginosat (Bixiga, Liberdade, Rua 25 de
Março) ovat eläviä, toimivia paikkoja tänään, ei museoituja
kuriositeetteja. Tehtävänannon erityishuomio edellytti tätä painotusta.

**Johdanto (205 merkkiä):**

> Yli 70 kansallisuutta on saapunut São Pauloon Hospedaria dos
> Imigrantesin kautta – italialaisia, japanilaisia, libanonilaisia ja
> monia muita. He eivät ole kaupungin historiaa vaan sen tämänpäiväistä
> arkea.

---

## 2. Kaksitoista nostoehdotusta (4 + 4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto SP1 — "Lähetyskoulu joka antoi kaupungille nimen" (509 merkkiä)**

> Vuonna 1554 kaksitoista jesuiittapappia, muun muassa Manuel da
> Nóbrega ja José de Anchieta, perusti Piratiningan ylängölle pienen
> lähetyskoulun kukkulalle Anhangabaún ja Tamanduateín jokien välissä.
> Paikka sai nimensä koulun vihkimispäivästä, apostoli Paavalin
> kääntymyksen juhlasta, ja siitä tuli myöhemmin koko kaupungin nimi.
> Ensimmäiset rakennukset olivat paikallisten intiaanien perinteisellä
> tekniikalla tehtyä tampattua savea, ja seuraavat kaksisataa vuotta
> São Paulo pysyi köyhänä, eristyneenä kylänä.

Faktat ja lähteet:
- Kaksitoista jesuiittapappia (mm. Manuel da Nóbrega, José de Anchieta)
  perusti Colégio de São Paulo de Piratiningan 25.1.1554 kukkulalle
  Anhangabaú- ja Tamanduateí-jokien välissä. — en-Wikipedia "São Paulo"
  (Colonial period)
- Nimi tulee koulun vihkimispäivästä, apostoli Paavalin kääntymyksen
  juhlasta. — en-Wikipedia "São Paulo" (Colonial period, lead)
- Ensimmäinen rakennus oli paikallisten intiaanien perinteisellä
  tekniikalla tehty tampatun saven rakennus; seuraavat kaksisataa
  vuotta São Paulo oli köyhä, eristynyt kylä joka eli
  omavaraisviljelystä. — en-Wikipedia "São Paulo" (Colonial period)

**Nosto SP2 — "Rautatie joka toi kahvin merelle" (562 merkkiä)**

> Englantilainen São Paulo Railway Company avasi 16. helmikuuta 1867
> radan satamakaupunki Santosista ylängön poikki Jundiaihin. Insinööri
> Daniel Fox ratkaisi Serra do Mar -vuorijonon lähes 800 metrin nousun
> köysivedolla, kun tavallinen rata olisi vaatinut liian pitkän
> kierroksen ja ylittänyt budjetin. Rata valmistui kahdeksan vuoden
> sopimusajasta kymmenen kuukautta etuajassa, ja se kuljetti ylängön
> kahvin satamaan nopeammin kuin koskaan ennen. Isoisän matkavuonna
> 1873 rata oli ollut käytössä jo kuusi vuotta ja oli jo muuttamassa
> koko kaupungin tulevaisuutta.

Faktat ja lähteet:
- São Paulo Railway Company (SPR), yksityinen brittiläinen
  rautatieyhtiö, avasi radan Santosista São Paulon kautta Jundiaihin
  16.2.1867; radan tarkoitus oli viedä ylängön kahvi rannikolle vientiin.
  — en-Wikipedia "São Paulo Railway Company" (infobox, Planning)
- Serra do Mar -vuorijonon n. 800 m nousu ratkaistiin
  köysivetojärjestelmällä; insinööri Daniel Makinson Fox suunnitteli
  ratkaisun, koska tavallinen rata olisi vaatinut n. 26 mailin
  (42 km) kiertotien ja ylittänyt 200 000 punnan budjetin. —
  en-Wikipedia "São Paulo Railway Company" (Planning)
- Rakennustyö valmistui 10 kuukautta etuajassa kahdeksan vuoden
  sopimusajasta. — en-Wikipedia "São Paulo Railway Company"
  (Construction)
- **RISTIRIITA (ratkaistu, ks. osio 7 kohta 4):** pääartikkeli "São
  Paulo" sanoo kaupungin olleen Santosiin yhdistetty rautateitse
  "vuodesta 1869" nimellä Estrada de Ferro Santos-Jundiaí — tämä on
  sama rata kuin São Paulo Railway, mutta nimi ja vuosiluku ovat
  peräisin vasta radan 1946 kansallistamisen jälkeisestä ajasta.
  Tarkempi, tarkemmin lähteistetty oma artikkeli antaa täsmällisen
  avauspäivän 16.2.1867, ja sitä on käytetty tässä.

**Nosto SP3 — "Kaupunki jonka kahvi rakensi uudelleen" (527 merkkiä)**

> Vuonna 1872 São Paulossa asui 31 385 ihmistä – pieni kaupunki
> isoisän matka-aikaan. Rautatie ja kahvin vientitulot muuttivat
> kaiken: väkiluku lähes kaksinkertaistui 64 934:ään vuoteen 1890
> mennessä ja nousi 239 820:een vuosisadan vaihteessa. Kahvi teki São
> Paulon osavaltiosta maailman johtavan tuottajan, ja rikkaus valui
> kaupunkiin niin nopeasti, että sen nousukautta kutsuttiin myöhemmin
> nimellä "kahvi ja maito" yhdessä maitotalous-Minas Geraisin kanssa –
> kahdesta osavaltiosta tuli vuorotellen presidenttien kotivaltioita.

Faktat ja lähteet:
- Väestöhistoria: 1872: 31 385; 1890: 64 934; 1900: 239 820 asukasta
  (virallinen historiallinen väestötaulukko). — en-Wikipedia "São
  Paulo" (Demographics, Historical populations -taulukko)
- Kahvin vientitulot ja rautatie tekivät São Paulosta 1800-luvun
  lopulla nousevan talousmahdin; kaupunki nousi kansallisessa
  politiikassa vuorotellen Minas Geraisin (maitotalous) kanssa
  presidenttejä valitsevaksi liittoumaksi, tunnettu nimellä
  "café com leite" ("kahvi ja maito"). — en-Wikipedia "São Paulo"
  (Old Republican period)
- **EPÄVARMA:** pelin oma visakysymys (js/packs/southamerica-questions.js)
  mainitsee terra roxa -maaperän kahvinviljelyyn erityisen sopivana,
  ja punamullan väristä terra roxaa käsittelevä en-Wikipedian
  täsmennyssivu vahvistaa VAIN, että kyse on "punaisesta maaperästä,
  joka on yleinen Etelä- ja Länsi-Brasiliassa" — en-Wikipediassa ei ole
  erillistä artikkelia maaperän kahvinviljelysopivuudesta (haku
  "Terra roxa (soil)" 23.8.2026 palautti 404:n, koska linkki on
  interwiki-linkki portugalinkieliseen Wikipediaan). Jos kirjoittaja
  käyttää terra roxa -faktaa leipätekstissä, se kannattaa tarkistaa
  pt-Wikipediasta tai muusta lähteestä erikseen.

**Nosto SP4 — "Eteläisen pallonpuoliskon suurin kaupunki tänään" (494 merkkiä)**

> Nykyään São Paulon kaupunkialueella asuu lähes 11,9 miljoonaa ja koko
> metropolialueella yli 21,5 miljoonaa ihmistä – eteläisen
> pallonpuoliskon suurin kaupunkialue. Kaupunki tuottaa yksin noin 12
> prosenttia Brasilian bruttokansantuotteesta ja isännöi B3-pörssiä,
> Latinalaisen Amerikan suurinta markkina-arvoltaan pörssiä. Rautatien
> tuoma kahvivauraus muuttui 1900-luvulla teollisuudeksi ja sitten
> palveluiksi – sama nousukäyrä jatkuu yhä samasta lähtöpisteestä,
> pienestä ylängön lähetysasemasta.

Faktat ja lähteet:
- São Paulo on Brasilian, Etelä-Amerikan, koko Amerikan mantereen ja
  sekä läntisen että eteläisen pallonpuoliskon väkirikkain kaupunki. —
  en-Wikipedia "São Paulo" (lead)
- Kaupungin väkiluku 11 904 961 (viimeisin arvio), metropolialueen
  (Greater São Paulo) väkiluku 21 518 955. — en-Wikipedia "São Paulo"
  (infobox)
- Kaupungin BKT vuonna 2010 oli n. 450 miljardia realia, noin 12,26 %
  Brasilian BKT:stä; São Paulo on B3:n, Latinalaisen Amerikan
  markkina-arvoltaan suurimman pörssin, kotikaupunki. — en-Wikipedia
  "São Paulo" (Economy)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Katedraali jonka isoisä olisi nähnyt" (503 merkkiä)**

> Praça da Séllä seisoi isoisän vierailuvuonna 1873 vaatimaton
> barokkikirkko vuodelta 1764 – ei nykyinen jättimäinen
> uusgoottilainen katedraali, joka perustettiin vasta 1913 ja valmistui
> torneineen vasta 1967. Alkuperäinen kirkko, kaupungin ensimmäinen
> "matriz", valmistui jo 1616 samalle paikalle, ja 1745 São Paulosta
> tuli hiippakunnan keskus. Vanha kirkko purettiin 1911 uuden tieltä;
> valokuvaaja Marc Ferrez kuvasi torin ja sen vanhan kirkon vuonna
> 1880, vain seitsemän vuotta isoisän käynnin jälkeen.

Faktat ja lähteet:
- Nykyinen São Paulon katedraali (uusgoottilainen) perustettiin 1913
  arkkitehti Maximilian Emil Hehlin suunnitelmalla, vihittiin käyttöön
  1954 (torneineen keskeneräisenä) ja valmistui torneineen vasta 1967.
  — en-Wikipedia "São Paulo Cathedral" (infobox, History)
- Paikalla oli 1589 päätetty rakentaa pääkirkko ("matriz"); se
  valmistui n. 1616. São Paulosta tuli hiippakunta 1745, ja vanha
  kirkko purettiin ja korvattiin barokkityylisellä kirkolla, joka
  valmistui n. 1764 ja toimi katedraalina vuoteen 1911, jolloin se
  purettiin. — en-Wikipedia "São Paulo Cathedral" (History)
- Valokuvaaja Marc Ferrez kuvasi Praça da Sén ja vanhan katedraalin
  1880, keisari Pedro II:n hallituskaudella. — en-Wikipedia
  "São Paulo" (kuvateksti, Imperial period)

**Nosto H2 — "Köyhästä siirtokunnasta bandeirantejen tukikohdaksi" (545 merkkiä)**

> 1600-luvulla São Paulo oli Portugalin siirtokunnan köyhimpiä
> alueita: paulistanot eivät varakkuutensa puutteessa voineet ostaa
> afrikkalaisia orjia kuten muut siirtolaiset, joten kaupungista tuli
> sen sijaan bandeirantejen – kulta- ja orjaretkikuntien johtajien –
> tukikohta. Kultaa löytyi Minas Geraisista 1690-luvulla, ja São Paulo
> sai kaupunkioikeudet vasta 11. heinäkuuta 1711. Kun kulta ehtyi
> 1700-luvun lopulla, kaupunki siirtyi sokeriruokoon, jota vietiin
> Santosin sataman kautta ensimmäistä kunnollista maantietä pitkin,
> Calçada do Lorenaa.

Faktat ja lähteet:
- 1600-luvulla São Paulo oli Portugalin siirtokunnan köyhimpiä
  alueita; paulistanot eivät köyhyytensä vuoksi voineet ostaa
  afrikkalaisia orjia kuten muut siirtokunnat, ja kaupungista tuli
  bandeirantejen (kulta-, jalokivi- ja orjaretkikuntien) tukikohta. —
  en-Wikipedia "São Paulo" (The Bandeirantes)
- Kultaa löytyi Minas Geraisin alueelta 1690-luvulla; São Paulon ja
  Minas de Ouron kapteenikunta perustettiin 3.11.1709, ja São Paulo
  sai kaupunkioikeudet 11.7.1711. — en-Wikipedia "São Paulo"
  (The Bandeirantes)
- Kullan ehdyttyä 1700-luvun lopulla siirryttiin sokeriruo'on
  viljelyyn, jota vietiin Santosin sataman kautta; ensimmäinen
  kunnollinen maantie rannikolle, Calçada do Lorena, rakennettiin
  tuolloin. — en-Wikipedia "São Paulo" (The Bandeirantes)

**Nosto H3 — "Kadut joita kahvi rakensi" (538 merkkiä)**

> Insinööri Joaquim Eugênio de Lima rakennutti Avenida Paulistan 1891
> asuinkaduksi kahviparonien ja tehtailijoiden – muun muassa
> Matarazzon suvun – koristeellisille huviloille. Kadun ensimmäinen
> talo kuului panimoyhtiö Antarcticaa pyörittäneelle Von Bülow'n
> perheelle, ja kadusta tuli São Paulon ensimmäinen asfaltoitu katu
> 1909, asfaltti tuotiin Saksasta asti. 1950-luvulta alkaen huvilat
> purettiin lähes yön yli pankkitorneille, ja kadulla kulkee nykyään
> yli 800 000 ihmistä päivässä – saman katutilan läpi, jossa ennen
> kasvoi puutarhoja.

Faktat ja lähteet:
- Avenida Paulistan rakennutti 1891 uruguaylais-brasilialainen
  insinööri Joaquim Eugênio de Lima; katu oli aluksi kahviparonien ja
  teollisuusyrittäjien (mm. Matarazzon perhe) koristeellisten
  huviloiden asuinkatu. — en-Wikipedia "Paulista Avenue" (Construction)
- Kadun ensimmäinen talo (numero yksi) kuului Antarctica-panimoa
  pyörittäneelle Von Bülow'n perheelle; kadusta tuli São Paulon
  ensimmäinen asfaltoitu katu 1909, asfaltti tuotiin Saksasta. —
  en-Wikipedia "Paulista Avenue" (Construction)
- 1950-luvulta alkaen presidentti Kubitschekin talouskasvun hengessä
  kadun huvilat purettiin nopeasti pankkien ja rahoituslaitosten
  tieltä. — en-Wikipedia "Paulista Avenue" (Modernization)
- Kadulla arvioidaan liikkuvan yli 800 000 työmatkalaista päivittäin.
  — en-Wikipedia "Paulista Avenue" (Transportation)

**Nosto H4 — "Modernismin viikko ja ensimmäinen pilvenpiirtäjä" (494 merkkiä)**

> Vuoden 1922 Modernismin viikko Theatro Municipalissa kokosi yhteen
> kirjailija Mário de Andraden, taidemaalari Tarsila do Amaralin ja
> kuvanveistäjä Victor Brecheretin kaltaiset uudistajat, jotka
> halusivat irrottautua eurooppalaisesta perinteestä. Samaan aikaan
> kahvirahat muuttuivat pystysuoraksi kaupunkikuvaksi: São Paulo sai
> ensimmäisen pilvenpiirtäjänsä, Martinelli Buildingin, vuonna 1929.
> Väkiluku oli tuolloin jo ylittänyt miljoonan – kolme sukupolvea
> isoisän 31 000 asukkaan kaupungista.

Faktat ja lähteet:
- Vuoden 1922 Modernismin viikko (Semana de Arte Moderna) pidettiin
  Theatro Municipalissa; keskeisiä hahmoja olivat mm. runoilijat Mário
  de Andrade ja Oswald de Andrade, taidemaalarit Anita Malfatti ja
  Tarsila do Amaral sekä kuvanveistäjä Victor Brecheret. —
  en-Wikipedia "São Paulo" (Old Republican period)
- São Paulo sai ensimmäisen pilvenpiirtäjänsä, Martinelli Buildingin,
  1929. — en-Wikipedia "São Paulo" (Old Republican period)
- Kaupunki saavutti ensimmäisen miljoonan asukkaan rajan 1928;
  1890-luvulla väkiluku oli kaksinkertaistunut vuosikymmenessä. —
  en-Wikipedia "São Paulo" (Old Republican period)

### Teemasivu `siirtolaisuus` — 4 nostoa

**Nosto A1 — "Majatalo jonka kautta kulki 2,5 miljoonaa" (488 merkkiä)**

> Hospedaria dos Imigrantes -majatalo rakennettiin suoraan
> rautatielinjan viereen korvaamaan aiemman, huonokuntoisen majatalon
> Bom Retiron kaupunginosassa. Se avattiin 1887, vielä kesken
> rakennustöiden, kun ensimmäinen siirtolaisryhmä saapui jo 5.
> kesäkuuta samana vuonna. Yli 70 kansallisuudesta saapuneet,
> yhteensä yli 2,5 miljoonaa ihmistä, kulkivat majatalon kautta ennen
> sen sulkemista 1978. Rakennus toimii nykyään Museu da Imigraçãona,
> joka kertoo saman tarinan uusille sukupolville.

Faktat ja lähteet:
- Hospedaria dos Imigrantes rakennettiin rautatielinjan viereen
  korvaamaan huonokuntoisen, puutteellisen aiemman majatalon Bom
  Retiron kaupunginosassa; rakennustyöt alkoivat 1886, ja rakennus
  avattiin 1887 ennen valmistumistaan (valmistui 1888). — en-Wikipedia
  "Immigrant Inn"
- Ensimmäinen siirtolaisryhmä saapui majataloon 5.6.1887; sen
  toiminta-aikana (1887–1978) yli 70 kansallisuudesta saapuneet,
  yhteensä yli 2,5 miljoonaa ihmistä, kulkivat majatalon kautta. —
  en-Wikipedia "Immigrant Inn"
- Rakennus toimii nykyään Museu da Imigração do Estado de São
  Paulona (Immigration Museum of the State of São Paulo). —
  en-Wikipedia "Immigrant Inn"

**Nosto A2 — "Enemmän italialaisia kuin Roomassa" (538 merkkiä)**

> São Paulossa on enemmän italialaistaustaisia asukkaita kuin missään
> Italian kaupungissa, Rooma mukaan lukien: noin puolella kaupungin
> asukkaista on osittain tai kokonaan italialaiset juuret. Vuoteen
> 1920 mennessä osavaltioon oli saapunut yli miljoona italialaista, ja
> samana vuonna lähes 80 prosenttia kaupungin väestöstä oli
> siirtolaisia tai heidän jälkeläisiään. Nykyään Bixigan, Brásin ja
> Moocan kaupunginosat pitävät perinnettä yllä juhlineen, ja
> kaupungissa paistetaan päivittäin noin miljoona pizzaa kuudessa
> tuhannessa pizzeriassa.

Faktat ja lähteet:
- São Paulossa on enemmän italialaisten jälkeläisiä kuin missään
  Italian kaupungissa (Italian suurin kaupunki Rooma, 2,8 miljoonaa
  asukasta); noin 50 % (5 miljoonaa) kaupungin 12 miljoonasta
  asukkaasta on osittain tai kokonaan italialaista syntyperää. —
  en-Wikipedia "São Paulo" (Immigration and migration)
- Vuoteen 1920 mennessä São Paulon osavaltioon oli saapunut
  1 078 437 italialaista; 1888–1919 saapuneista siirtolaisista 38 %
  oli italialaisia. — en-Wikipedia "São Paulo" (Immigration and
  migration)
- 1920 lähes 80 % kaupungin väestöstä oli siirtolaisia tai heidän
  jälkeläisiään, ja italialaiset muodostivat yli puolet kaupungin
  miespuolisesta väestöstä. — en-Wikipedia "São Paulo" (Immigration
  and migration)
- Italialaiset ovat yhä koolla Bixigan, Brásin ja Moocan
  kaupunginosissa juhlien ja tapahtumien merkeissä; kaupungissa on
  6 000 pizzeriaa, jotka paistavat n. miljoona pizzaa päivässä. —
  en-Wikipedia "São Paulo" (Immigration and migration)

**Nosto A3 — "Japani Etelä-Amerikassa" (526 merkkiä)**

> Japanilaiset siirtolaiset alkoivat asettua Liberdaden kaupunginosaan
> 1912, kun kahvitiloilla työskennelleet etsivät parempia
> mahdollisuuksia pääkaupungista – halvat kellaritilat mahdollistivat
> useiden perheiden asumisen samassa talossa. Vuonna 1958 kaupungissa
> laskettiin 120 000 japanilaista ja 1987 jo 326 000, minkä ansiosta
> São Paulo on yhä suurimman Japanin ulkopuolisen japanilaisyhteisön
> koti maailmassa. Vuodesta 1974 kaupunginosan sisäänkäyntiä on
> merkinnyt yhdeksänmetrinen punainen torii-portti Rua Galvão
> Buenolla.

Faktat ja lähteet:
- Japanilaiset siirtolaiset alkoivat asettua Liberdadeen 1912; moni
  tuli São Paulon osavaltion sisältä, koska ei sopeutunut
  kahvitilatyöhön ja etsi parempia mahdollisuuksia pääkaupungista.
  Edulliset kellaritilat mahdollistivat useiden perheiden asumisen
  samassa talossa. — en-Wikipedia "Liberdade (district of São Paulo)"
  (lead)
- 1958 kaupungissa laskettiin 120 000 japanilaista, 1987 jo 326 000
  (ja 170 000 lisää osavaltion muualla); São Paulo on maailman
  suurimman Japanin-ulkopuolisen japanilaisyhteisön koti. —
  en-Wikipedia "São Paulo" (Immigration and migration)
- Vuodesta 1974 Liberdaden sisäänkäyntiä Rua Galvão Buenolla on
  merkinnyt yhdeksänmetrinen punainen torii-portti. — en-Wikipedia
  "Liberdade (district of São Paulo)" (Overview)

**Nosto A4 — "Kauppias joka avasi kadun" (571 merkkiä)**

> Ensimmäiset syyrialaiset ja libanonilaiset kauppiaat saapuivat São
> Pauloon 1880-luvulla, ja 1887 libanonilainen Benjamin Jafet avasi
> ensimmäisen kaupan Rua 25 de Marçolla – kadulla, joka oli nimetty
> Brasilian ensimmäisen perustuslain päivämäärän mukaan. Muut
> kauppiaat seurasivat perässä, ja 1920-luvulla lähes 40 prosenttia
> Brasilian syyrialais-libanonilaisista asui juuri São Paulon
> osavaltiossa. Kadusta kasvoi vuosikymmenten myötä koko Brasilian
> tunnetuin halpakauppakatu – ja se on sitä yhä, satakolmekymmentä
> vuotta myöhemmin, uusien siirtolaissukupolvien pitämänä.

Faktat ja lähteet:
- Ensimmäiset syyrialaiset ja libanonilaiset saapuivat São Pauloon
  n. 1880; 1887 libanonilainen Benjamin Jafet avasi ensimmäisen
  kaupan Rua 25 de Marçolla, ja muut kauppiaat seurasivat perässä. —
  en-Wikipedia "Rua 25 de Março" (History)
- Katu on nimetty Brasilian ensimmäisen perustuslain
  allekirjoituspäivän (25.3.1824) mukaan; nimi vaihdettiin 1865
  aiemmasta "Rua de Baixo" -nimestä. — en-Wikipedia "Rua 25 de
  Março" (History)
- Vuoteen 1920 mennessä Brasiliassa laskettiin 50 246 syyrialaista ja
  libanonilaista, joista 38,4 % (lähes 40 %) asui São Paulon
  osavaltiossa. — en-Wikipedia "Arab Brazilians" (lead)
- Rua 25 de Março on pysynyt Brasilian tunnettuna halpa- ja
  tukkukauppa-alueena; maine syntyi erityisesti 1960-luvun
  tulvavahingoista, jotka pakottivat myymään varastoja nopeasti
  alennuksella. — en-Wikipedia "Rua 25 de Março" (lead, History)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja.

**Jakso 1 — "Perille ja liikkeelle"**

São Pauloon saavutaan nykyään useimmiten Guarulhos'n kansainvälisen
lentokentän kautta, josta pääsee keskustaan bussilla tai metrolla.
Kaupungin metro avattiin 1974 pormestari José Vicente de Faria Liman
kaudella, ja vuoteen 2016 mennessä sen verkosto käsitti jo 71,5
kilometriä ja 64 asemaa viidellä linjalla – yli miljardi matkustajaa
vuodessa samalla radalla, jonka rakentamisesta ensimmäiset selvitykset
tehtiin jo 1963.

Faktat ja lähteet:
- São Paulon metro aloitti kaupallisen liikenteen 14.9.1974
  pormestari José Vicente de Faria Liman kaudella; ensimmäiset
  tutkimuskomissiot rakentamiseksi perustettiin 13.2.1963. —
  en-Wikipedia "São Paulo" (Revolution of 1932 and contemporary era)
- Vuonna 2016 verkosto käsitti 71,5 km rataa ja 64 asemaa viidellä
  linjalla; sinä vuonna järjestelmässä kuljetettiin 1,1 miljardia
  matkustajaa. — en-Wikipedia "São Paulo" (Revolution of 1932 and
  contemporary era)

**Jakso 2 — Alueen rakenne**

São Paulo sijaitsee 760 metrin korkeudessa merenpinnasta ylängöllä,
jonka pohjoispuolelta kulkee Etelänkääntöpiiri – silti korkeus pitää
ilmaston leudompana kuin trooppisella leveysasteella voisi odottaa.
Kaksi jokea, Tietê ja Pinheiros, halkovat kaupunkia keskeltä; molemmat
ovat nykyään pahoin saastuneita, ja niiden puhdistushanke on yhä
kesken.

Faktat ja lähteet:
- Kaupungin korkeus on 760 m merenpinnasta (infoboksin arvo;
  säähavaintoaseman Mirante de Santanan korkeus on 785 m). —
  en-Wikipedia "São Paulo" (infobox, Climate-taulukko)
- Etelänkääntöpiiri (n. 23°27'S) kulkee São Paulon pohjoispuolella;
  kaupungin korkeus tekee ilmastosta leudomman kuin trooppisella
  leveysasteella olisi odotettavissa. — en-Wikipedia "São Paulo"
  (Climate)
- Tietê- ja Pinheiros-joet halkovat kaupunkia ja ovat pahoin
  saastuneita; niiden puhdistushanke on käynnissä. — en-Wikipedia
  "São Paulo" (Social challenges)

**Jakso 3 — Arjen ilmiö: Mercadão**

Vuonna 1933 avattu Mercado Municipal – paikallisille tuttavallisesti
Mercadão – on yhä kaupungin sydän: 12 600 neliömetrin hallissa
työskentelee 1 500 ihmistä ja sen läpi kulkee 450 tonnia ruokaa
päivässä. Rakennuksen 72 lasimaalausta kuvaavat São Paulon seudun
ruoantuotantoa, ja arkkitehti Francisco Ramos de Azevedon suunnittelema
holvikatto päästää sisään saman valon, jossa kojukauppiaat ovat
työskennelleet lähes sata vuotta.

Faktat ja lähteet:
- Mercado Municipal de São Paulo, arkkitehti Francisco Ramos de
  Azevedo, vihittiin käyttöön 25.1.1933 tukku- ja vähittäismyyntiin
  hedelmille, vihanneksille, lihalle ja mausteille. — en-Wikipedia
  "Municipal Market of São Paulo" (infobox, lead)
- Halli kattaa 12 600 m², työllistää 1 500 ihmistä, ja sen läpi
  kulkee 450 tonnia ruokaa päivässä yli 290 myyntipisteessä. —
  en-Wikipedia "Municipal Market of São Paulo" (Structure)
- Julkisivun ja hallin 72 lasimaalausta (32 paneelissa) ovat
  taiteilija Conrado Sorgenicht Filhon työtä ja kuvaavat São Paulon
  seudun ruoantuotantoa. — en-Wikipedia "Municipal Market of São
  Paulo" (Stained glass)

**Jakso 4 — Historian käännekohta: Ibirapuera Park**

Kaupungin 400-vuotisjuhlaan 1954 valmistui Ibirapuera Park, São
Paulon ensimmäinen suuri metropolipuisto – 158 hehtaaria vihreää
keskellä kivikaupunkia, suunnittelijoinaan maisema-arkkitehti Roberto
Burle Marx ja arkkitehti Oscar Niemeyer. Puistosta tuli nopeasti koko
Etelä-Amerikan suosituin kaupunkipuisto, yli 18 miljoonaa kävijää
vuodessa, ja sen paviljongeissa toimii yhä São Paulon taidebiennaalin
säätiö.

Faktat ja lähteet:
- Ibirapuera Park vihittiin käyttöön 21.8.1954 São Paulon 400-
  vuotisjuhlaan; puisto oli kaupungin ensimmäinen metropolipuisto,
  suunnittelijoinaan maisema-arkkitehti Roberto Burle Marx (yleisilme)
  ja arkkitehti João Felipe Pereira / myöhemmin Oscar Niemeyerin
  paviljonkikompleksi. — en-Wikipedia "Ibirapuera Park" (infobox,
  lead)
- Puisto kattaa 158 hehtaaria ja on Etelä-Amerikan suosituin
  kaupunkipuisto, yli 18 miljoonaa kävijää vuodessa (2021 tiedon
  mukaan). — en-Wikipedia "Ibirapuera Park" (infobox, lead)
- **HUOM (heikompi lähde):** São Paulo Biennial Foundation mainitaan
  Ibirapuera-artikkelin "Katso myös" -listalla muttei leipätekstissä
  suoraan puiston sijaintina — pääartikkeli "São Paulo" vahvistaa
  vain, että kaupunki isännöi São Paulo Art Biennialia yhtenä
  merkittävistä kulttuuritapahtumistaan, ei tarkkaa sijaintia. Jos
  kirjoittaja käyttää tätä, kannattaa tarkistaa Biennaalin oma sivu.

**Jakso 5 — Milloin kannattaa tulla**

São Paulon ilmasto on lauhkean subtrooppinen (Köppen: Cwa): kesät
(tammi–maaliskuu) ovat sateisia ja lämpimiä, keskilämpötila noin
19–28 astetta, kun taas talvi on leuto mutta sateeton, 12–22 astetta.
Vuotuinen sademäärä on noin 1658 millimetriä, josta suurin osa sataa
tammikuussa. Ennätyskuumin päivä mitattiin lokakuussa 2014, 38,4
astetta, ja kylmin päivä kesäkuussa 1918, jolloin lämpötila laski
lähes pakkaselle.

Faktat ja lähteet: ks. osio 5 (Säätiedot) — samat luvut, samat
lähteet.

---

## 4. Yhdeksän kohdekartan kohdetta

Koordinaatit haettu en-Wikipedian MediaWiki-rajapinnasta
(`action=query&prop=coordinates`, redirects=1) 23.8.2026. **Kartan
keskipisteeksi on spec-mantereet.md:n rajauksen (kohdekartan keskusta
historiallisen ytimen mukaan) mukaisesti valittu Pátio do Colégio** —
paikka jossa kaupunki tosiasiassa perustettiin 1554 — EI Wikipedian
infoboksin pyöristettyä kaupunkipistettä (23,55°S 46,63333°W), joka on
vain hallinnollinen keskiarvo ja osuisi joka tapauksessa lähes samaan
kohtaan (n. 0,3 km päähän). Etäisyydet ovat OMIA LASKELMIANI
koordinaattieroista (asteet × 111 km, pituusasteille kerrottu
cos(23,548°) ≈ 0,9170), tarkistettu Python-skriptillä.

| # | Nimi suomeksi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta keskipisteestä (oma laskelma) |
|---|---|---|---|---|
| 1 | Pátio do Colégio, perustamispaikka 1554 | 23,5481°S 46,6325°W | "Pátio do Colégio" | (keskipiste) |
| 2 | Sé-katedraali / Praça da Sé | 23,5512°S 46,6343°W | "São Paulo Cathedral" | ~0,4 km lounaaseen |
| 3 | Luz-asema (rautatien pääte) | 23,5350°S 46,6353°W | "Luz Station" | ~1,5 km pohjoiseen |
| 4 | Mercado Municipal (Mercadão) | 23,5417°S 46,6292°W | "Municipal Market of São Paulo" | ~0,8 km koilliseen |
| 5 | Avenida Paulista / MASP | 23,5611°S 46,6558°W | "Paulista Avenue", "São Paulo Museum of Art" | ~2,8 km lounaaseen |
| 6 | Liberdade (japanilaiskaupunginosa) | 23,5678°S 46,6294°W | "Liberdade (district of São Paulo)" | ~2,2 km etelään |
| 7 | Rua 25 de Março | 23,5443°S 46,6326°W | "Rua 25 de Março" | ~0,4 km pohjoiseen |
| 8 | Museu da Imigração (Hospedaria dos Imigrantes) | 23,5495°S 46,6128°W | "Immigrant Inn" | ~2,0 km itään |
| 9 | Ibirapuera Park | 23,5883°S 46,6589°W | "Ibirapuera Park" | ~5,2 km lounaaseen |

**Rajausehdotus:** Kahdeksan ensimmäistä kohdetta mahtuvat n. 3 km ×
3 km alueeseen historiallisen keskustan (Sé) ympärillä, mutta kohde 9
(Ibirapuera Park) on n. 5,2 km lounaaseen – sama ratkaisu kuin
Vancouverin mallissa: joko oma zoomaustaso tai hieman väljempi
kokonaisrajaus, koska puisto kuuluu olennaisesti jakso-osioon (osio 3,
Jakso 4) eikä sitä pidä jättää kartalta pois vain tiiviyden vuoksi.

---

## 5. Säätiedot

- **Keskustan koordinaatit:** 23,55°S, 46,63333°W (Wikipedia-infoboksin
  hallinnollinen keskipiste; ei sama kuin osion 4 kartan historiallinen
  keskipiste). — en-Wikipedia "São Paulo"
- **Köppen-luokka:** Cwa (lauhkea, sateinen kesä -subtrooppinen
  ilmasto), Trewartha Cwal. — en-Wikipedia "São Paulo" (Climate)
- **Lämpötila:** kesällä (tammi–maaliskuu) keskialin n. 19 °C,
  keskiylin n. 28 °C; talvella 12–22 °C. — en-Wikipedia "São Paulo"
  (Climate)
- **Ennätykset:** korkein mitattu lämpötila 38,4 °C (17.10.2014); alin
  −3,2 °C (25.6.1918). — en-Wikipedia "São Paulo" (Climate)
- **Sademäärä:** vuotuinen keskiarvo n. 1658 mm; tammikuussa (sateisin
  kuukausi) keskimäärin n. 292 mm, elo-syyskuussa (kuivin) n. 32 mm. —
  en-Wikipedia "São Paulo" (Climate)
- **Korkeus:** 760 m merenpinnasta (infoboksi); säähavaintoasema
  Mirante de Santana 785 m. — en-Wikipedia "São Paulo" (infobox,
  Climate-taulukko)
- **HUOM:** samoin kuin muissa uusissa kaupunkilehdissä, yllä olevat
  luvut ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin
  pelin `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali.
  Tarkat kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

Erityishuomio: Avenida Paulistan, Rua 25 de Marçon ja Mercado
Municipalin katukuvat ovat aina täynnä ihmisiä – valitse kuvakulma joka
näyttää paikan arkkitehtuurin tai toiminnan, ei yksilöityjä kasvoja.
Siirtolaisuusteeman kuvissa vältä kaikkea, mikä esittää yhteisöt vain
historiallisena kuriositeettina (esim. pelkkiä 1800-luvun
studiopotretteja Immigrant Inn -artikkelin kuvituksesta) – tasapainota
NYKYAIKAISILLA kuvilla Liberdaden toriista, Rua 25 de Marçon
kauppakaduista ja Bixigan/Moocan italialaisjuhlista, tehtävänannon
linjauksen mukaisesti. Ei köyhyyden estetisointia: favelat ja
kodittomuus rajattu pois koko koosteesta, eikä niitä pidä hakea
kuvituksenakaan.

**Avauskuvat (3), ehdotus:**
1. Avenida Paulista iltavalossa, pankkitornit ja MASP näkyvissä.
2. Praça da Sé ja katedraalin uusgoottilaiset tornit.
3. Liberdaden punainen torii-portti ja lyhtypylväät.

**Kansikuvat (3), ehdotus:**
1. São Paulon pilvenpiirtäjäsiluetti laajana yleiskuvana (esim.
   Avenida Paulistan suunnasta).
2. Ibirapuera Park ilmakuvana, vihreä keskellä kivikaupunkia.
3. Mercado Municipalin julkisivu tai holvikatto ulkopuolelta.

**Commons-kategoriat kuvahakuun (kaikki tarkistettu olemassa oleviksi
23.8.2026 Commonsin haku-API:lla; sisältö pitää silti aina tarkistaa
silmin lisenssisääntöjen mukaisesti):**
- `Category:Pátio do Colégio` — perustamispaikka, nykyinen jälleen-
  rakennettu rakennus
- `Category:Sé (São Paulo)` — Praça da Sé, katedraali, historiallinen
  keskusta
- `Category:São Paulo Railway` — rautatiehistoria, Serra do Mar
- `Category:Estação da Luz` — Luz-rautatieasema
- `Category:History of São Paulo` — yleinen historiallinen aineisto,
  laaja yläkategoria
- `Category:Avenida Paulista` — nykyinen katu, pankkitornit, MASP
- `Category:Mercado Municipal de São Paulo` — Mercadão sisältä ja
  ulkoa
- `Category:Liberdade (São Paulo)` — japanilaiskaupunginosa, torii,
  tori
- `Category:Rua 25 de Março` — libanonilais-/syyrialaistaustainen
  kauppakatu
- `Category:Museu da Imigração do Estado de São Paulo` — Hospedaria
  dos Imigrantes, siirtolaismuseo
- `Category:Italian immigration in São Paulo` — italialaisyhteisön
  historia ja nykypäivä
- `Category:Brazilian coffee cycle` — kahvihistoria, plantaasit,
  vienti
- `Category:Ibirapuera Park` — puisto, Niemeyer-paviljongit
- `Category:Skylines of São Paulo (city)` — nykyinen kaupunkisiluetti
- `Category:Jafet family` — Benjamin Jafetin ja Rua 25 de Marçon
  taustaa (HUOM: sukukategoria, ei välttämättä katukuvia — tarkista
  sisältö ennen käyttöä)
- **HUOM:** `Category:Liberdade, São Paulo` EI ole olemassa (tarkistettu
  23.8.2026) — oikea kategorianimi on `Category:Liberdade (São Paulo)`,
  ks. yllä. Myöskään erillisiä kategorioita `Italians in São Paulo`,
  `Japanese in São Paulo`, `Arabs in São Paulo`, `Coffee production in
  Brazil` tai `Skyline of São Paulo` (yksikössä) ei ole — käytä yllä
  listattuja oikeita nimiä.

**Nosto-/jaksokuvat, aihe-ehdotuksia (ei tiedostonimiä):**
1. Historiallinen valokuva Praça da Séstä ja vanhasta barokkikatedraalista
   1880-luvulta (Marc Ferrez tunnetusti kuvasi torin 1880).
2. São Paulo Railwayn Serra do Mar -viadukti tai köysivetojärjestelmän
   asema 1860–1900-luvulta.
3. Avenida Paulista 1900-luvun alussa, huviloineen (ennen
   verticalisointia) – hyvä pari nykyiselle pankkitornikuvalle.
4. Hospedaria dos Imigrantesin 1800-luvun lopun tai 1900-luvun alun
   siirtolaisryhmä (Commonsissa tunnetusti mm. "Italians Sao Paulo"
   -kuva n. 1890).
5. Liberdaden nykyinen viikonlopputori tai torii-portti.
6. Rua 25 de Marçon nykyinen kauppakatu, kojut ja väkijoukko
   (arkkitehtuuri/toiminta, ei yksilöityjä kasvoja).
7. Bixigan tai Moocan italialaisjuhla tai pizzeria nykyaikana.
8. Ibirapuera Park ilmasta tai Niemeyer-paviljongit.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Neljä nostoa liikkuu lähellä visan aiheita, mutta ei anna
   vastausta suoraan samalla sanamuodolla.** Visa kysyy (a) São Paulon
   metropolialueen asemaa eteläisen pallonpuoliskon väkirikkaimpana,
   (b) kahvia/terra roxaa 1800-luvun rikkauden lähteenä, (c) sijaintia
   Brasiliassa, (d) Avenida Paulistaa, (e) japanilaisyhteisöä. SP4
   käyttää täsmällisiä lukuja (11,9 milj. kaupunki, 21,5 milj. metro,
   12 % BKT:stä) visan ympäripyöreän "yli 20 miljoonaa" -sanamuodon
   sijaan; SP3 käsittelee kahvibuumia väestönkasvulukujen ja
   "café com leite" -politiikan kautta, EI terra roxa -maaperäväitteen
   kautta (joka on merkitty EPÄVARMAKSI, ks. kohta 3); H3 käsittelee
   Avenida Paulistaa rakennushistorian ja arkkitehtuurin kautta, ei
   "tunnetuin pääkatu" -kuvauksena; A3 käyttää tarkkoja
   vuosilukuja (1912, 1958: 120 000, 1987: 326 000, 1974 torii) visan
   yleisluontoisen "suurin Japanin ulkopuolella" -väitteen sijaan.
   Kirjoittajan kannattaa silti tarkistaa lopullinen teksti visaa
   vasten ennen julkaisua, sillä sama perusfakta esiintyy usealla
   sivulla eri sanoin.
2. **Terra roxa -maaperäväite on EPÄVARMA en-Wikipedian osalta.** Pelin
   oma visakysymys väittää terra roxan sopineen kahvinviljelyyn
   erityisen hyvin; en-Wikipedian täsmennyssivu "Terra roxa" vahvistaa
   vain maaperätyypin olemassaolon ("red soil common in southern and
   western Brazil") ilman mainintaa kahvinviljelysopivuudesta, eikä
   erillistä artikkelia maaperästä ole englanniksi (linkki on
   pelkkä interwiki-viittaus puuttuvaan pt-Wikipedia-artikkeliin,
   haku palautti 404:n 23.8.2026). SP3-nostossa terra roxaa EI ole
   käytetty väitteen ytimenä juuri tästä syystä – kahvibuumin syy-
   seuraussuhde on kerrottu ilman maaperäväitettä.
3. **São Paulo Railwayn avausvuosi ratkaistu tarkemman lähteen
   hyväksi (ks. SP2).** Pääartikkeli "São Paulo" sanoo rautatie-
   yhteyden Santosiin syntyneen "vuodesta 1869" nimellä Estrada de
   Ferro Santos-Jundiaí; tämä on kuitenkin saman radan myöhempi nimi
   vuoden 1946 kansallistamisen jälkeen. Radan oma, tarkemmin
   lähteistetty artikkeli "São Paulo Railway Company" antaa täsmällisen
   avauspäivän 16.2.1867 sekä infoboksissa että leipätekstissä kahdella
   erillisellä lähteellä. Koska tehtävänanto nimenomaan pyysi nostamaan
   1867-vuoden esiin sen osuessa lähelle isoisän 1873-matkaa, tarkempi
   ja aiempi päivämäärä on valittu – sama periaate kuin aiemmissa
   ennakkotapauksissa (koordinaatit/tarkat päivämäärät voittavat
   pyöristetyt leipätekstin maininnat).
4. **Ibirapuera Parkin ja São Paulo Art Biennialin yhteys on heikommin
   lähteistetty** (ks. Jakso 4:n huomautus) – "Katso myös" -linkki,
   ei suoraa leipätekstiä. Kirjoittajan kannattaa tarkistaa tämä
   erikseen jos yhteys mainitaan tekstissä.
5. **MST-tyylistä sisäistä ristiriitaa ei löytynyt** väestölukujen
   osalta paitsi yksi: Coffee production in Brazil -artikkeli antaa
   pyöristetyt luvut ("30 000 asukasta 1850-luvulla, 70 000 vuonna
   1890, 240 000 vuonna 1900"), kun taas pääartikkelin virallinen
   Historical populations -taulukko antaa tarkat luvut (1872: 31 385;
   1890: 64 934; 1900: 239 820). SP3-nostossa on käytetty tarkkaa
   taulukkoa pyöristettyjen arvioiden sijaan.
6. **Coordinates-rajapinta vastasi kerran "too many requests"
   -virheellä** (Wikimedian yleinen nopeusrajoitusvaroitus, ei
   varsinainen 429-HTTP-koodi) — `curl --retry 6 --retry-delay 5`
   -uusinta korjasi heti eikä yksikään koordinaatti jäänyt puuttumaan.
7. **Vain en-Wikipediaa ja sen MediaWiki-rajapintaa sekä Wikimedia
   Commonsin hakurajapintaa (kategorioiden olemassaolon tarkistukseen)
   on käytetty.** Ei ulkopuolisia hakuja tämän faktapohjan sisältöön.
8. **Ei nykypolitiikkaa eikä nykyrikollisuutta käsitelty**
   spec-mantereet.md:n linjauksen mukaisesti. En-Wikipedian "Public
   security" -osio (rikostilastot, homisidit, poliisiasemat) ja
   "Social challenges" -osion favela-/kodittomuuskuvaus on jätetty
   kokonaan pois lukuun ottamatta yhtä neutraalia mainintaa jokien
   saastumisesta (jakso 2) — ei köyhyyden estetisointia, kuten
   tehtävänanto erikseen edellytti.
9. **Kaikki nostot, johdannot ja jaksot on kirjoitettu valmiiksi
   suomenkieliseksi tekstiksi** merkkimäärävaatimusten mukaan
   (johdannot 190–208, nostot 488–571) ja tarkistettu koneellisesti
   Python-skriptillä (`len()`).
