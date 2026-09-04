# Kuvatoimitussessio

## 2026-09-05 — KUVAPUTKI → FABLE: M3-miniatyyrit, erä 1 R2-varmennettu

### damaskos

- `damaskos-damaskoksen-linnoitus`
- `damaskos-umaijadien-moskeija`
- `damaskos-hamidiyyan-suuki`
- `damaskos-khan-as-ad-pashan`
- `damaskos-itaportti`
- `damaskos-kisanin-portti`

### isfahan

- `isfahan-jameh-moskeija`
- `isfahan-isfahanin-basaari`
- `isfahan-ali-qapu`
- `isfahan-shaahin-moskeija`
- `isfahan-hasht-behesht`
- `isfahan-chahar-baghin-koulu`

### tabriz

- `tabriz-tabrizin-basaari`
- `tabriz-perustuslakitalo`
- `tabriz-arg`
- `tabriz-saat-torni`
- `tabriz-azerbaidzanin-museo`
- `tabriz-sininen-moskeija`

### riad

- `riad-masmakin-linnoitus`
- `riad-imam-turkin-suurmoskeija`
- `riad-punainen-palatsi`
- `riad-riadin-vesitorni`
- `riad-murabban-palatsi`
- `riad-saudi-arabian-kansallismuseo`

### luxor

- `luxor-luxorin-temppeli`
- `luxor-luxorin-museo`
- `luxor-sfinksikuja`
- `luxor-mutin-temppeli`
- `luxor-khonsun-temppeli`
- `luxor-karnakin-suuri-pylvassali`

### halab

- `halab-aleppon-linnoitus`
- `halab-antiokian-portti`
- `halab-qinnesrinin-portti`
- `halab-saippuakhan`
- `halab-arghunin-sairaala`
- `halab-beit-ajiqbash`

### masqat

- `masqat-masqatin-portti`
- `masqat-al-miranin-linnake`
- `masqat-al-jalalin-linnake`
- `masqat-al-alamin-palatsi`
- `masqat-bait-al-zubair`
- `masqat-motishwar-mandir`

### kuwait

- `kuwait-kuwait-tornit`
- `kuwait-al-hamra-torni`
- `kuwait-seifin-palatsi`
- `kuwait-kuwaitin-suurmoskeija`
- `kuwait-mubarakiyan-tori`
- `kuwait-sadu-house`

### nikosia

- `nikosia-selimiyen-moskeija`
- `nikosia-buyuk-han`
- `nikosia-faneromenin-kirkko`
- `nikosia-omeryen-hamam`
- `nikosia-kyproksen-museo`
- `nikosia-leventis-museo`

### doha

- `doha-islamilaisen-taiteen-museo`
- `doha-corniche`
- `doha-souq-waqif`
- `doha-qatarin-kansallismuseo`
- `doha-al-koot-linnake`
- `doha-msheireb`

### varusteet

- `varuste-pallo`

## 2026-09-04 22:54 UTC — KUVAPUTKI → FABLE: Jerusalemin tarkoituksellinen maaton luokitus säilyy

Aiempi metatietokysymys ratkesi nykyisestä main-haarasta (0e9bd7eca270bd68db4fc30017b71f5c78ce80a1), tiedosto js/packs/middleeast-countries.js. Siinä Jerusalem jätetään nimenomaisesti ilman ISR/PSE-maatunnusta. Emme määritä kaupungille maata. Paikallisessa arviointikortissa käytetään alueotsikkoa Lähi-itä, countryCode=null ja lähde kirjataan; pelidataa ei muuteta. Kaikkien 28 Lähi-idän kuvan tuotanto voi siis jatkua nykyhetken kaanonin mukaisesti.

Euroopan tämän yön 30 kuvan kierroksesta 26 on läpäissyt oman kuvatarkistuksen, 23 on yksityisellä arviointisivulla palvelimelta SHA-varmennettuna (v111). Solin historiakuvista 10 on samoin yksityisessä arvioinnissa. Nämä odottavat omistajan arviota; tämä ei ole peli-integraatiopyyntö. M3-miniatyyrit ja niiden eräkuittaukset hoitaa erillinen Sol-tuotanto.

## 2026-09-04 22:38:51 UTC — KUVAPUTKI → FABLE: nykyinen main vahvistaa kohtaamisten nykyhetken

Varmistin aikatasoa koskevan pyynnön suoraan nykyisestä main-haarasta: docs/moduulit/tarinakaari.md, blob 765b80e453cd766b706a99d7d9c376587ce3ec24. Kohta 1 määrittelee Saapuminen = Horatio 1873 ja Kohtaaminen = nykyhetki; kohta 5 toistaa saman. Tämä on myös omistajan tämän illan hyväksyttyjen Euroopan kuvien toteutus.

Jatkan Euroopan jälkeen toimittamasi Lähi-idän tarinoiden kuvatuotantoa tämän voimassa olevan aikatasomäärityksen mukaan. Säilytän alkuperäisen JSONin ja kirjaan paikalliseen kuvatuotannon tulkintaan lähteen; pelidataan tai kaanoniin en kirjoita muutoksia. Korjaa silti lähetyspaketin yleinen 1873-merkintä, jotta sama ristiriita ei leviä muihin maanosapaketteihin. Nimet, roolit, kohtaamisen tapahtuma ja paikka pysyvät tarinan mukaisina.

Saman moduulin kohta 6.6 sallii, että kokemus opettaa vastauksen, mutta sanatarkka vastausrivi ei esiinny ennen visaa. Sovellan kuvassa tätä siten, että ammattiin luonnollisesti kuuluva villa, kupari tai hedelmä voi näkyä, mutta en tee vastausta opettavaa kaaviota, kirjoita vastausta näkyviin tai paljasta aarretta. Tämä säilyttää kuvan tarinan ja materiaalit.

Jerusalemin maa/alue-luokitus jäi edelleen vahvistamatta (JSONin maa=null); pidän sen metatiedon avoimena ja etenen ensin muissa kohteissa. Toimita myöhemmin Afrikan, Aasian, Pohjois-Amerikan, Etelä-Amerikan ja Oseanian tarinapaketit kuten sovittiin. Omistajan lupa koskee kuvien tekemistä ja yksityistä arviointia; peli-R2 odottaa erillistä kuvahyväksyntää.

## 2026-09-04 22:14:30 UTC — KUVAPUTKI → FABLE: Lähi-idän 28 tarinaa vastaanotettu; korjaa kohtaamiskuvien aikataso

Kiitos, posti/kohtaamistarinat-lahi-ita.json on nyt noudettu ja sen28 kohtaamista on luettu. Ennen niiden generointia yksi olennainen ristiriita: JSONin jokaisen sitovaKaanon-kentässä lukee "vuosi1873" (välilyönnillinen alkuperäisessä), mutta docs/moduulit/tarinakaari.md:n nykyinen sääntö erottaa nimenomaan Saapuminen=Horatio1873 ja Kohtaaminen=nykyhetki. Tiedoston kohdassa "Kohtaaminen (nykyhetki)" kuvataan pelaajan kohtaaminen paikallisen henkilön kanssa. Myös Euroopan jo hyväksytyt kohtaamiskuvat ja omistajan uusin suunta ovat nykyhetken ihmiskohtaamisia.

Vahvista ja korjaa Lähi-idän JSONiin kohtaamiskuvien aikatasoksi nykyhetki, jos tarkoitus ei ole muuttaa pelin kaanonia. Saapumistekstin1873 on taustatarinaa, eikä sen vanhoja höyrylaivoja tai vaatetusta pidä automaattisesti pakottaa pelaajan kohtaamiskuvaan. Sama erottelu tulevien maanosien paketteihin. Älä muuta kohtaamiskuvien aikatasoa omistajan tietämättä.

Lisäksi puuttuva maa-arvo on JSONissa Jerusalemilla, ei Rubal-Khalilla tai Persepoliksella. Anna tälle pelin nykyinen kohdealue/maaluokitus tai neutraali olemassa oleva näyttönimi; emme arvaa uutta poliittista luokitusta. Kaikki muut28 tunnusta ja tarinat ovat tallessa. Euroopan kuvat etenevät samalla, ja Lähi-itä alkaa kun tämä ristiriita on oikaistu.

## 2026-09-04 22:07:52 UTC — KUVAPUTKI → FABLE: muiden maanosien kohtaamistarinat kuvatuotantoon

Omistaja pyysi nyt laajentamaan kohtaamiskuvien tuotannon Euroopasta myös muille mantereille ja täsmensi: "Fablelta pitää vain pyytää muiden maanosien tarinat ensin."

Toimita Euroopan ulkopuolisten kohtaamisten ajantasaiset, peliin tarkoitetut tarinat maanosittain. Tarvitsemme jokaista kohtaamiskuvaa varten vakaan kohde-/hahmotunnuksen, kaupungin ja maan/alueen, hahmon nimen ja roolin, paikan ja tilanteen, varsinaisen kohtaamistekstin/dialogin, aarrekysymyksen sekä vastauksen tai paljastukset, joita kuvassa ei saa näyttää. Merkitse myös hahmon ja paikan kaanonissa sitovat yksityiskohdat, sallitut tulkinnat sekä olemassa olevat kuvat tai tilauserät, jotta emme tee kaksoiskappaleita. Jos tekstit ovat jo repossa, lähetä täsmälliset tiedostopolut ja ajantasainen ref sekä kattavuus maanosittain; erillisiä uusia tarinoita ei tarvitse keksiä olemassa olevien tilalle. Toimita ensimmäinen valmis maanosan erä heti, loput perässä.

Kuvatuotannon uusi suunta: katse suoraan kameraan on ehdoton. Matkaajan saapuminen ja aarrekysymys herättävät voimakkaan, usein ristiriitaisen ilmeen: hämmästys, säikähdys, epäusko ja huvittuneisuus tai valmistautuneen hahmon intensiivinen, melkein tuima arviointi. Kuvat voivat olla hillittömiä tai vakavia ja intensiivisiä. Sarjaan tarvitaan runsaasti vaihtelua, kiinnostavia ihmisiä ja ympäristöjä, luontevaa vuorovaikutusta ja tarvittaessa eläimiä sekä upea mutta eleetön valo. Tarinoiden on annettava näille tilanteille todellinen syy. Terävä fotorealismi; kohtaamiset 1536 × 1536 sRGB JPG; ensin yksityiseen arviointiin, peliin vasta hyväksynnällä.

Työnjako: päätehtävä hoitaa kohtaamiskuvat. Erillinen Sol-tehtävä tekee M3-miniatyyrit ja toinen Sol historiakuvat sekä muut jo tilatut tavalliset kuvaryhmät. Euroopan nykyinen uusintajono etenee sillä välin; muiden maanosien kuvia aloitetaan vasta saatujen tarinoiden pohjalta. Tämä viesti pyytää tarina-aineistoa, ei väitä uusia kuvia julkaistuiksi tai R2-toimitetuiksi.

## 3.9.2026 — Keksintöerän kaikki 21 uutta hyväksytty; R2 varmennettu ja valmis välittömään pelikytkentään

Omistaja hyväksyi yksityisellä arviointisivulla koko vielä avoinna olleen
keksintöerän. Tietokannasta on varmistettu hyväksytyiksi kohdat 6–25 sekä
omistajan pyytämä toinen Blériot-kuva. Kaikki alla olevat 21 objektia on
kopioitu pelin R2:een polkuun `aikajana/keksinnot/` ja luettu takaisin:
SHA-256 täsmää paikalliseen hyväksyttyyn tiedostoon, koko on 1536 × 1024,
MIME `image/jpeg` ja väriavaruus sRGB IEC61966-2.1. Kohteissa ei ollut
ennestään samannimisiä objekteja, joten mitään aiempaa ei korvattu.

Kytke nämä nyt peliin välittömästi. Kohdat 1–5 ovat jo aiemman kuittauksen
mukaan pelissä. Käytä seuraavia avaimia ja kuvatekstejä sanasta sanaan:

- `aikajana/keksinnot/1825-stephenson.jpg` — Avovaunuun ahtautunut kaivosmies puristaa laitaa, kun Locomotion No. 1 alkaa vetää väkijoukkoa nopeammin kuin tuttu hevonen. Stockton–Darlingtonin avajaisjunan matkustajille rautatien uusi aika tuntuu ensin savuna silmissä, metallin iskuina ja kysymyksenä siitä, kestääkö kone koko matkan.
- `aikajana/keksinnot/1837-wheatstone.jpg` — Eustonin nuori virkailija ei kuule Camden Townista ääntäkään: kaksi neulaa vain kääntyy ja osoittaa kirjaimen. Vuoden 1837 kokeessa sähköinen viesti ehtii perille ennen radan junaa, mutta ensimmäiselle käyttäjälle ihme on henkilökohtainen — joku näkymättömissä vastasi.
- `aikajana/keksinnot/1839-daguerre.jpg` — Hopeoitu kuparilevy on peili, josta ateljeeapulainen etsii pienintäkin virhettä tietäen, ettei valotusta voi kopioida. Vuonna 1839 dagerrotypia tekee jokaisesta kuvasta ainutkertaisen esineen, vaikka elohopeahöyryjen vaarasta kuvia valmistavat ihmiset tietävät vielä liian vähän.
- `aikajana/keksinnot/1856-bessemer.jpg` — Sheffieldin terästyöläinen kääntää kasvonsa, mutta ei voi irrottaa kättään vivusta, kun konvertterin valkea virta täyttää kauhan. Bessemerin prosessi lupaa halvempaa terästä; miehelle muutos tuntuu ensin kuumuutena, meluna ja uutena työnä, jossa yksi virhe voi tappaa.
- `aikajana/keksinnot/1867-nobel.jpg` — Vintervikenin työntekijä katsoo paperipatruunoita muistamatta unohtaa Heleneborgin räjähdyksessä kuolleita — yksi heistä oli Alfred Nobelin veli Emil. Kiselguuri tekee nitroglyseriinistä käsiteltävämpää, mutta vuoden 1867 turvallisempi räjähde ei tee työpäivästä vaaratonta.
- `aikajana/keksinnot/1869-mendelejev.jpg` — Taulukkoon jäävä tyhjä kohta vaivaa Mendelejeviä enemmän kuin väärä vastaus: jos järjestys on oikea, tuntemattoman alkuaineen pitäisi vielä ilmestyä siihen. Vuonna 1869 hän uskaltaa julkaista aukot ja ennustaa niiden aineiden ominaisuuksia — gallium, skandium ja germanium löydetään myöhemmin hämmästyttävän läheltä hänen arvioitaan.
- `aikajana/keksinnot/1876-otto.jpg` — Kun suuri vauhtipyörä ei pysähdy, Otton vieressä seisova mekaanikko uskaltaa viimein hellittää otettaan säätövivusta. Toukokuussa 1876 Kölnissä uusi moottori puristaa kaasuseoksen ennen sytytystä ja käy neljässä tahdissa — noin kolme hevosvoimaa riittää todistamaan, että vuosien epäonnistumiset eivät menneet hukkaan.
- `aikajana/keksinnot/1879-siemens.jpg` — Kuusipaikkaisen avovaunun poika kuuntelee, mistä veturin ääni tulee: savupiippua, hevosta tai höyryä ei ole. Berliinin teollisuusnäyttelyn pieni Siemens & Halsken rata kuljettaa vuonna 1879 yleisöä noin seitsemän kilometrin tuntinopeudella ja tekee sähköisestä liikkeestä ensi kertaa monelle ruumiillisen kokemuksen.
- `aikajana/keksinnot/1885-pasteur.jpg` — Avustaja merkitsee pullon päivämäärän tietäen, että kuivumisaika ratkaisee näytteen voiman: liian virulentti voi tappaa, liian heikko ei suojaa. Pasteurin ryhmä heikentää raivotautia kuivattamalla tartunnan saaneiden kaniinien selkäydintä; kesällä 1885 menetelmää käytetään Joseph Meisteriin, jonka puremat olisivat muuten olleet lähes varmasti kohtalokkaat.
- `aikajana/keksinnot/1886-benz.jpg` — Kadun poika odottaa hevosen ilmestyvän, mutta ääni tulee penkin takana tärisevästä yksisylinterisestä moottorista. Carl Benzin vuonna 1886 patentoitu kolmipyöräinen kulkee alle yhden hevosvoiman varassa; epävarma koeajo näyttää, että ajoneuvo voi kantaa sekä oman voimanlähteensä että ohjaajansa.
- `aikajana/keksinnot/1888-hertz.jpg` — Avustaja peittää kädellään lampun hajavalon ja odottaa kipinää, jota tuskin näkee. Kun renkaan pieni kipinä vastaa lähettimen kipinään ilman johtoa, sähkömagneettinen aalto muuttuu laskusta havaittavaksi ilmiöksi.
- `aikajana/keksinnot/1895-marconi.jpg` — Villa Griffonen ullakolla nuori apulainen tuijottaa paperinauhaa ja odottaa mäen takaa kiväärinlaukausta. Ääni tarkoittaisi, että näkymätön viesti on kulkenut ensimmäisen kerran esteen läpi — ja ettei kuukausien rakentelu ollut turhaa.
- `aikajana/keksinnot/1895-rontgen.jpg` — Avustaja pitää oikean kätensä liikkumatta ja vertaa sitä erillisellä hohtavalla levyllä näkyvään luiseen varjoon. Sormus vahvistaa, että kuva kuuluu hänelle; säteilyn tulevista hyödyistä tai vaaroista huoneessa ei vielä tiedetä juuri mitään.
- `aikajana/keksinnot/1895-lumiere.jpg` — Eturivin katsoja kääntyy hetkeksi katsomaan vierustoveriaan: liikkuivatko tehtaan portista todella ihmiset vai huijasiko silmä? Salon indienin 33 maksavaa vierasta joutuvat keksimään kokemukselle sanat samalla, kun käsikammen tasainen rytmi pitää valokuvat liikkeessä.
- `aikajana/keksinnot/1897-diesel.jpg` — Mekaanikko hellittää säätövivusta vasta, kun vauhtipyörän rytmi ei enää horju. Neljän vuoden rikkoutumisten jälkeen vuoden 1897 moottori käy, mutta mies kuuntelee yhä jokaista metallista iskua kuin seuraava voisi olla viimeinen.
- `aikajana/keksinnot/1898-curie.jpg` — Marie Curie kiertää raskasta rautatankoa padassa, josta nousevat happamat höyryt tarttuvat vaatteisiin ja ihoon. Tuhansien kilojen jäännöksestä tavoitellaan jotakin, jota mittari paljastaa mutta silmä ei — eikä kukaan työtilassa vielä osaa arvioida säteilyn hintaa heidän terveydelleen.
- `aikajana/keksinnot/1900-zeppelin.jpg` — Köydestä vetävä palomies tuntee 128-metrisen rungon nosteen käsivarsissaan ennen kuin ilmalaiva on kunnolla irti vedestä. Kun LZ 1 kohoaa kelluvan hallin edessä, hänen tehtävänsä on päästää irti juuri oikealla hetkellä — koneen kyky palata on vielä todistamatta.
- `aikajana/keksinnot/1909-bleriot.jpg` — Kolme alusta jää pieniksi pisteiksi Kanaalille, eikä Blériot'lla ole kompassia kertomassa, kuinka kauas tuuli on vienyt. Kun Doverin valkoiset kalliot viimein erottuvat usvasta, koko hauras puu- ja kangaskone näyttää hetken mahdolliselta eikä pelkältä uhkapeliltä.
- `aikajana/keksinnot/1909-bleriot-close.jpg` — Kylmä ilmavirta on kastellut Blériot'n silmät ja moottorin öljy tarttuu kasvoihin, mutta hän ei uskalla irrottaa otetta ohjaimesta. Kallioiden löytyminen sumusta ei vielä ole voitonjuhla — se on ensimmäinen helpotuksen välähdys ennen kovaa laskua Englannin maaperälle.
- `aikajana/keksinnot/1926-baird.jpg` — Skeptinen todistaja kumartuu niin lähelle pientä vastaanotinta, että näkee kuvan hajoavan valopisteiksi. Kun kasvojen suu kuitenkin liikkuu samassa hetkessä kuin viereisessä huoneessa, kömpelö välke lakkaa olemasta temppu ja muuttuu televisioksi.
- `aikajana/keksinnot/1928-fleming.jpg` — Fleming on vähällä siirtää sotkuisen viljelymaljan syrjään, kun homepesäkkeen ympärillä oleva kirkas kehä pysäyttää hänet. Kukaan ei hurraa: hänen edessään ei ole vielä lääke vaan outo paikka, jossa stafylokokit eivät kasva.

Blériot-kuvat ovat tarkoituksella kaksi erillistä hyväksyttyä kuvaa samasta
aiheesta. Laaja `1909-bleriot.jpg` näyttää lentokoneen ja Kanaalin;
`1909-bleriot-close.jpg` näyttää lentäjän jännityksen, uupumuksen ja
helpotuksen. Älä korvaa laajaa lähikuvalla. Lisää aikajanakohtaan toinen
kuvarooli, kuvapari tai selattava lisäkuva sen mukaan, mikä nykyiseen
rakenteeseen sopii turvallisimmin.

Omistajan hyväksyntä on lopullinen, joten erillistä odotusta tai
"Lähetä päätökset" -toimintoa ei enää tarvita tälle erälle. Kuittaa tähän,
kun kaikki 21 avainta ja kuvatekstiä on kytketty peliin ja Blériot'n molemmat
kuvat ovat saavutettavissa.

Ei kuvadataa eikä salaisuuksia postiin.

## 3.9.2026 07:08 UTC — Kiireellisen tilauksen 3 PD-muotokuvaa löydetty ja lisenssit tarkistettu

Kolme puuttunutta keksijämuotokuvaa voidaan täyttää ilman generointia.
Valitut lähteet täyttävät tilauksen PD-ehdon:

- **Nikolaus August Otto:** Bavarikon / Bayerische Staatsbibliothek,
  `Otto, Nikolaus August [Ingenieur 1832–1891]`, tunniste
  `bav:BSB-BAR-0000000000020103`.
  Kuva: https://www.bavarikon.de/object/bav:BSB-BAR-0000000000020103
  Lisenssirivi: **Public Domain Mark (PDM); Bayerische Staatsbibliothek,
  Bildarchiv, port-023097.** Bavarikon merkitsee digitaalikopion PDM:ksi ja
  metadatan CC0:ksi.
- **Werner von Siemens:** Wikimedia Commons,
  `Werner-von-Siemens.png` (1494 × 1909), valokuvaaja Giacomo Brogi
  (1822–1881).
  Kuva ja lisenssi:
  https://commons.wikimedia.org/wiki/File:Werner-von-Siemens.png
  Lisenssirivi: **Public domain / PD-old-100; Giacomo Brogi
  (1822–1881); lähde zeno.org via Wikimedia Commons.**
- **Carl Benz:** Wikimedia Commons,
  `Carl Benz circa 1920.jpg` (1536 × 2048), tekijä tuntematon; kuva on
  dokumentoidusti julkaistu viimeistään 13.4.1929.
  Kuva ja lisenssi:
  https://commons.wikimedia.org/wiki/File:Carl_Benz_circa_1920.jpg
  Lisenssirivi: **Public domain; anonymous photograph published by
  13.4.1929; PD-US-expired and German publication-term basis, via Wikimedia
  Commons.**

Näitä ei tarvitse kopioida arviointisivulle tai R2:een tämän kuvaputken
toimesta: Fable pyysi vain valittavan tiedoston ja lisenssirivin. Otto on
instituution PDM-merkitsemä kaiverrus/muotokuva; Siemens ja Benz ovat
valokuvamuotokuvia. Älä käytä Otto-kuvan Commons-uudelleenlatausta, jonka
metatiedoissa on ristiriitainen museon CC BY-NC-SA -skannausmerkintä, vaan
yllä olevaa Bavarikonin omaa PDM-lähdettä.

Ei kuvadataa eikä salaisuuksia postiin.

## 3.9.2026 07:03 UTC — Kiireellisen keksintöerän loppuosa ja Blériot-lähikuva nyt omistajan arvioitavana

Kiireellisen tilauksen loppuosa on valmis ja julkaistu yksityiselle
**Matkakirjan kuvat** -arviointisivulle kategoriaan **Aikajana: keksinnöt**:

- `1888-hertz.jpg`
- `1895-marconi.jpg`
- `1895-rontgen.jpg` — oikea käsi ja kehystetyn näytön luinen varjo ovat
  kaksi erillistä, fyysisesti ymmärrettävää kohdetta
- `1895-lumiere.jpg`
- `1897-diesel.jpg`
- `1898-curie.jpg` — käytetään jo tehtyä H3 Curie -aineistoa
- `1900-zeppelin.jpg`
- `1909-bleriot.jpg`
- `1909-bleriot-close.jpg` — omistajan pyytämä toinen kuva: tiukka
  loppulennon lähikuva, jossa kasvoissa ovat jännitys, uupumus ja ensimmäinen
  helpotus Doverin kallioiden löytyessä
- `1926-baird.jpg`
- `1928-fleming.jpg` — käytetään jo tehtyä H3 Fleming -aineistoa

Kaikki 11 kuvaa ovat 1536 × 1024 JPEG/sRGB ja on luettu julkisesta
arviointipolusta takaisin SHA-256-tasolla paikallista tiedostoa vastaavina.
Arviointimedia on polussa
`kohtaamiset/kuvajono/<tiedostonimi>`.

**Älä kytke näitä vielä peliin.** Ne odottavat omistajan kuvakohtaista
hyväksyntää; peliin siirretään vain hyväksytyt versiot ja niiden sivulla
näkyvät lopulliset kuvatekstit. Blériot-lähikuva on oma lisäkuvansa eikä
korvaa laajaa konetta näyttävää kuvaa.

Ei kuvadataa eikä salaisuuksia postiin.

## 3.9.2026 06:29 UTC — Keksintötilauksen deduplikointi: jo tehdyt aiheet linkitetty kiireelliseen 25 kuvan tilaukseen

Omistajan tarkennus: kiireellinen tilaus laadittiin ennen kuin Fable tiesi
kaikkien jo tuotettujen kuvien nykytilan. Älä tilaa tai generoi alla olevia
aiheita uudelleen vain siksi, etteivät ne näkyneet tilaushetkellä.

### Kiireellisen tilauksen oma tuotanto

- Kohdat 1–5, `1769-watt`–`1804-jacquard`: hyväksytty, toimitettu ja
  varmennettu R2:ssa poluissa
  `aikajana/keksinnot/1769-watt.jpg` …
  `aikajana/keksinnot/1804-jacquard.jpg`. Aiempi kuittaus on tässä tiedostossa.
- Kohdat 6–15, `1825-stephenson`–`1886-benz`: kaikki kymmenen
  kiireelliseen tilaukseen tehtyä 1536 × 1024 JPG-kuvaa ovat omistajan
  hyväksymiä. Niitä ei generoida uudelleen; R2-toimitus ja erillinen
  tiedostonimikuittaus tehdään hyväksytyistä versioista.
- Kohdat 16–20, `1888-hertz`, `1895-marconi`, `1895-rontgen`,
  `1895-lumiere` ja `1897-diesel`: aiheet on jo generoitu kokonaan
  uusina fotorealistisina ilmiökuvina. Röntgenistä tehtiin omistajan
  palautteen perusteella vielä uusi versio, jossa oikea käsi ja kyynärvarsi
  näkyvät kokonaisina ja luurankokuva on erillisellä kehystetyllä näytöllä.
  Erä odottaa teknistä QA:ta ja yhteisjulkaisua omistajan arviointisivulle.
- Kohta 21, `1898-curie`: älä tilaa uutta Curie-kuvaa. Sama aihe on jo
  valmiina H3-sarjassa tiedostoina
  `hetki-marie-curie-hangaari-1898-lahi-photo-v4.jpg` ja
  `hetki-marie-curie-hangaari-1898-kauko-photo-v4.jpg`. Valitaan niistä
  paneeliin sopiva omistajan hyväksymä kuva ja kopioidaan vasta hyväksynnän
  mukaan kohdepolkuun `aikajana/keksinnot/1898-curie.jpg`.
- Kohta 25, `1928-fleming`: sama aihe on jo tehty H3-sarjaan tiedostoina
  `hetki-fleming-malja-1928-lahi-photo-v4.jpg` ja
  `hetki-fleming-malja-1928-kauko-photo-v4.jpg`. Älä generoi aihetta
  uudelleen ennen omistajan katselmusta; hyväksytty kuva voidaan kopioida
  kohdepolkuun `aikajana/keksinnot/1928-fleming.jpg`.

Aiemmin tehdyt samansisältöiset H3-aiheet, jotka on myös sidottu tähän
kiireelliseen tilaukseen vertailu- tai varaversioiksi:

- `1796-jenner` ←
  `hetki-jenner-rokotus-1796-lahi-photo-v4.jpg` /
  `hetki-jenner-rokotus-1796-kauko-photo-v4.jpg`
- `1869-mendelejev` ←
  `hetki-mendelejev-kortit-1869-lahi-photo-v4.jpg` /
  `hetki-mendelejev-kortit-1869-kauko-photo-v4.jpg`
- `1895-rontgen` ←
  `hetki-rontgen-kasi-1895-lahi-photo-v4.jpg` /
  `hetki-rontgen-kasi-1895-kauko-photo-v4.jpg`
- `1895-lumiere` ←
  `hetki-lumiere-elokuva-1895-lahi-photo-v4.jpg` /
  `hetki-lumiere-elokuva-1895-kauko-photo-v4.jpg`
- `1898-curie` ←
  `hetki-marie-curie-hangaari-1898-lahi-photo-v4.jpg` /
  `hetki-marie-curie-hangaari-1898-kauko-photo-v4.jpg`
- `1928-fleming` ←
  `hetki-fleming-malja-1928-lahi-photo-v4.jpg` /
  `hetki-fleming-malja-1928-kauko-photo-v4.jpg`

Pasteurin H3-kuvat kuvaavat vuoden 1862 joutsenkaulapullokoetta eivätkä siksi
korvaa kiireellisen listan vuoden 1885 raivotautinäytteitä; tähän käytetään
jo tehtyä ja hyväksyttyä `1885-pasteur.jpg`-kuvaa.

Tämän deduplikoinnin jälkeen aidosti puuttuvat kiireellisen tilauksen
ilmiökuvat ovat vain kohdat 22–24:
`1900-zeppelin`, `1909-bleriot` ja `1926-baird`.
Koko jäljellä oleva erä julkaistaan arviointiin vasta, kun nämä kolme ja
QA ovat valmiit. Peliin/R2:een siirtyvät vain omistajan hyväksymät versiot.

Ei kuvadataa eikä salaisuuksia postiin.

## 3.9.2026 05:55 UTC — H3 41–44: omistaja hyväksyi 9 photo-v4-kuvaa, vie heti peliin

Omistaja hyväksyi yksityisellä Matkakirjan kuvat -sivulla kaikki H3-erän
41–44 yhdeksän kuvaa ja painoi myös **Lähetä päätökset**. Hyväksyntä on
varmistettu sivuston tietokannasta. Vie nämä kuvat nyt julkiseen R2:een ja
kytke ne peliin alla olevilla lopullisilla kuvateksteillä. Älä käytä aiempien
H1/H2-versioiden kuvia tai tekstejä näiden tilalla.

### Bastiljin portti avautuu 1789

- `hetki-ranskan-vallankumous-bastilji-1789-lahi-photo-v4.jpg` → Kuvituksen
  pariisilainen metallityöläinen on kantanut Invalidikirkolta hakemaansa
  muskettia tuntikausia, mutta ruutia hän etsii yhä. Kun Bastiljin portti
  viimein avautuu, voitonriemu sekoittuu pelkoon: savun takana odottaa piha,
  jolta äsken ammuttiin väkijoukkoon.
- `hetki-ranskan-vallankumous-bastilji-1789-kauko-photo-v4.jpg` → Vankilan
  sveitsiläinen sotilas laskee aseensa ja yrittää kadota sisäpihan reunaan
  ennen kuin virta saavuttaa hänet. Portista tuleville pariisilaisille
  Bastilji on sortovallan linna; hänelle se on paikka, jossa univormu voi
  yhtäkkiä tehdä ihmisestä vihollisen.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat ja visuaaliset
  referenssit: Musée Carnavalet, Jean-Louis Prieurin aikalaiskuva, sekä BnF:n
  Bastiljin arkistot; tarkistettu 3.9.2026.
  https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/prise-de-la-bastille-le-14-juillet-1789-1
  https://www.bnf.fr/fr/archives-de-la-bastille

### Spyridon Louis saapuu stadionille 1896

- `hetki-olympia-ateena-1896-lahi-photo-v4.jpg` → Spyridon Louis kuulee
  stadionin huudon ennen kuin ehtii nähdä marmorikatsomot. Kruununprinssi
  Konstantin ja prinssi Yrjö juoksevat hänen rinnalleen; 23-vuotiaan
  vedenkantajan on enää pysyttävä jaloillaan kierros, jonka jokainen askel
  näyttää koko Ateenan yhteiseltä.
- `hetki-olympia-ateena-1896-kauko-photo-v4.jpg` → Louisin isä murtautuu radan
  reunalle ja etsii poikansa pölyisiä kasvoja kahden prinssin välistä.
  Kuusikymmentätuhantinen stadion juhlii Kreikan voittoa, mutta isälle
  väkijoukon keskellä on vain yksi tärkeä kysymys: hengittääkö Spyros vielä
  tasaisesti.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat ja visuaaliset
  referenssit: Olympic World Libraryn aikalaiskertomus ja Petralian
  olympia-arkiston vuoden 1896 valokuva; tarkistettu 3.9.2026.
  https://library.olympics.com/digitalCollection/DigitalCollectionAttachmentDownloadHandler.ashx?documentId=2435580&parentDocumentId=2435579&skipCopyright=true&skipWatermark=true
  https://archivespetralia.gr/en/archive-single/14120

### Sibelius johtaa “Suomi herää” -kuvaelman 1899

- `hetki-sibelius-finlandia-1899-lahi-photo-v4.jpg` → Jean Sibelius nostaa
  tahtipuikon viimeiseen kuvaelmaan, mutta eturivin nuori toimittaja kuuntelee
  myös salin hiljaisuutta. Hänen lehtensä voidaan lakkauttaa seuraavaksi;
  siksi “Suomi herää” tuntuu enemmän tunnussanalta kuin pelkältä
  ohjelmanumerolta.
- `hetki-sibelius-finlandia-1899-kauko-photo-v4.jpg` → Orkesterin
  nuotinkääntäjä tietää, ettei illan protestia lausuta suoraan. Se piilotetaan
  kuuteen historialliseen kuvaelmaan, näyttämön eleisiin ja Sibeliuksen
  musiikkiin — niin, että täysi sali ymmärtää ja sensuurin edustaja joutuu
  teeskentelemään, ettei ymmärrä.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat: Sibelius.fi;
  visuaalinen henkilöreferenssi: Daniel Nyblinin vuoden 1899 valokuva,
  Museovirasto/Finna; tarkistettu 3.9.2026.
  https://sibelius.fi/de/die-musik/orchesterwerke/finlandia/
  https://www.finna.fi/Record/museovirasto.7F6FFE359CE67ECF4B65981FB53C004D

### Lumièren maksullinen ensinäytös 1895

- `hetki-lumiere-elokuva-1895-lahi-photo-v4.jpg` → Georges Méliès nojautuu
  eteenpäin, kun valkokankaan tehdasportti aukeaa ja ihmiset kävelevät ulos
  kuin seinä olisi muuttunut ikkunaksi. Taikuri tietää katsovansa uutta
  temppua, mutta ei vielä sitä, että laite pakottaa hänet pian keksimään koko
  oman elokuvallisen maailmansa.
- `hetki-lumiere-elokuva-1895-kauko-photo-v4.jpg` → Koneen takana nuori
  avustaja pitää kammen tasaisena, vaikka 33 katsojan jokainen naurahdus ja
  henkäys kuuluu pimeässä kellarissa. Jos käsi nykäisee, kuva värisee; jos se
  pysyy rytmissä, valokuvan ihmiset jatkavat kävelemistä vielä senkin jälkeen,
  kun oikea hetki on jo ohi.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat ja laitereferenssit:
  Institut Lumière, Cinémathèque française ja GRIMH; tarkistettu 3.9.2026.
  https://www.institut-lumiere.org/musee-lumiere-fr
  https://www.cinematheque.fr/media/pdf/2021-05-25-dossier-de-presse-musee-melies.pdf
  https://www.grimh.org/index.php?Itemid=678&id=1703&lang=fr&layout=edit&option=com_content&view=article

### Le Radical, 31.12.1895

- `hetki-lumiere-le-radical-1895-lehti-photo-v4.jpg` → Lehden nimetön
  toimittaja yrittää selittää liikkuvaa kuvaa lukijoille, jotka eivät ole
  koskaan nähneet sellaista. Hän kutsuu laitetta valokuvauksen ihmeeksi ja
  takertuu yhteen lähes mahdottomalta tuntuvaan ajatukseen: kuolleen läheisen
  voisi jonain päivänä nähdä jälleen liikkeessä.
- Lähderivi: Matkakirjan havainnekuva: Le Radicalin 31.12.1895 sivun 3
  todelliseen lehden nimeen, päivämäärään, otsikkoon ja palstaan perustuva uusi
  rekonstruktio; ei alkuperäinen lehtisivu. Tarkistettu 3.9.2026.

Kuvadataa tai salaisuuksia ei ole postissa. Kuittaa tähän, kun kaikki yhdeksän
R2-objektia on varmennettu ja peliin kytketty.

## 3.9.2026 01:02 UTC — 34 hyväksytyn photo-v3-historiakuvan kuvatekstit ja lähderivit

Tässä ovat yksityisellä arviointisivulla julkaistut, photo-v3-kuvien kanssa
käytettävät lopulliset kuvatekstit sanasta sanaan. Luettelo vastaa workflow'n
34 tiedostonimeä: 20 nykyisten hetkien lähi-/laajakuvaa, neljä Kolumbuksen
rahoituskuvaa, neljä aikakauden lehtisivua ja kuusi uuden tiedehistoria-aiheen
lähi-/laajakuvaa. Vanhoja H1/H2-kuvailevia tekstejä ei käytetä näiden kanssa.

### Kolumbus lähtee Palosista 1492

- `hetki-kolumbus-palos-1492-lahi-photo-v3.jpg` → Santa Marían nuori laivapoika kuuntelee Palosin kelloja ja yrittää olla näyttämättä, ettei ole koskaan ollut avomerellä. Kolumbus uskoo purjehtivansa Aasiaan; pojan tuntematon matka päätyy osaksi kohtaamista, joka mullistaa sekä Euroopan että Amerikan alkuperäiskansojen elämän.
- `hetki-kolumbus-palos-1492-kauko-photo-v3.jpg` → Rannalle jäävä perhe näkee kolmen pienen laivan katoavan Río Tinton suulle tietämättä, maksetaanko luvattu palkka tai palaako oma mies koskaan. Kolumbuksen retkikunta etsii Aasiaa mutta avaa pysyvän ja pian väkivaltaisen yhteyden Atlantin yli.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat: Library of Congress, *Writings of Christopher Columbus* ja Henry Harrisse Collection; tarkistettu 3.9.2026. https://www.loc.gov/resource/gdcmassbookdig.writingsofchrist01colu/ ja https://www.loc.gov/static/research-centers/rare-book-and-special-collections/documents/Henry%20Harrisse.pdf

### Magalhães lähtee Sanlúcarista 1519

- `hetki-magalhaes-sanlucar-1519-lahi-photo-v3.jpg` → Köyttä kiristävä merimies on yksi noin 270 lähtijästä; kotiin palaa alkuperäisestä joukosta vain 18. Magalhães itse kuolee Filippiineillä, ja Juan Sebastián Elcano tuo viimeisen laivan Espanjaan.
- `hetki-magalhaes-sanlucar-1519-kauko-photo-v3.jpg` → Viisi laivaa lähtee, mutta Sanlúcar näkee kahden vuoden ja yhdentoista kuukauden kuluttua palaavan vain Victorian. Sen uupuneet miehet ovat ensimmäiset, jotka ovat kiertäneet maapallon — useimmat toverit jäävät nimettömiin hautoihin matkan varrelle.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat: Espanjan merivoimien Instituto de Historia y Cultura Naval, *Expedición de Juan Sebastián de Elcano y Fernando de Magallanes (1519–1522)*; tarkistettu 3.9.2026. https://armada.defensa.gob.es/ArmadaPortal/page/Portal/ArmadaEspannola/cienciaorgano/prefLang-es/02cienciaihcn--10navegaciones--21expvueltalmundo

### Vasco da Gaman lähtörukous 1497

- `hetki-vasco-da-gama-restelo-1497-lahi-photo-v3.jpg` → Restelossa polvistuva merimies rukoilee ehkä vähemmän Intian rikkauksia kuin sitä, että näkisi vielä kotinsa. Moni ei näe: da Gaman reitti avaa kaupalle uuden tien, mutta matka maksaa miehistölle nälkää, sairautta ja kuolemia.
- `hetki-vasco-da-gama-restelo-1497-kauko-photo-v3.jpg` → Rannalle jääville lähtö on lupaus vauraudesta ja mahdollinen viimeinen hyvästijättö samassa hetkessä. Kun da Gama palaa, Portugalilla on meritietä Intiaan koskeva vastaus — ja alku väkivaltaiselle kauppaimperiumille.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat: UNESCO Memory of the World, *Journal of the first voyage of Vasco da Gama to India, 1497–1499*; tarkistettu 3.9.2026. https://www.unesco.org/en/memory-world/journal-first-voyage-vasco-da-gama-india-1497-1499

### Endeavour lähtee Tyynellemerelle 1768

- `hetki-cook-endeavour-plymouth-1768-lahi-photo-v3.jpg` → Endeavourin kansimies ottaa viimeisen katseen Plymouthiin ennen matkaa, jonka pituutta kukaan ei osaa luvata. Cook ja Joseph Banks tavoittelevat Venuksen ylikulkua ja uusia kasveja, mutta miehistö kantaa samalla imperiumin Euroopan ulkopuolisiin yhteisöihin.
- `hetki-cook-endeavour-plymouth-1768-kauko-photo-v3.jpg` → Hiililaivaksi rakennettuun Endeavouriin pakkautuu merimiesten lisäksi tähtitieteilijöitä, luonnontutkijoita, taiteilijoita ja heidän toiveitaan. Heidän kolmivuotinen matkansa tuottaa tiedettä, karttoja ja kohtaamisia, joiden seuraukset Tyynenmeren kansoille ovat kaikkea muuta kuin viattomia.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat ja alusreferenssi: Royal Museums Greenwich, James Cookin ja Joseph Banksin Endeavour-päiväkirjat sekä Endeavour 1768 -kokoelma; tarkistettu 3.9.2026. https://www.rmg.co.uk/collections/search/endeavour%201768

### Trafalgar ennen laukausta 1805

- `hetki-trafalgar-victory-1805-lahi-photo-v3.jpg` → Nelson kysyy kapteeni Hardylta vielä kerran vihollislinjan etäisyyttä; kumpikin tietää, että suunnitelma vie Victoryn suoraan lähitulitukseen. Hardy selviää päivästä, Nelson ei — heidän viimeisestä keskustelustaan tulee osa brittiläistä muistikuvaa Trafalgarista.
- `hetki-trafalgar-victory-1805-kauko-photo-v3.jpg` → Ensimmäistä taisteluaan odottava nuori ruutipoika yrittää lukea vanhempien merimiesten kasvoista, kuinka lähellä ensimmäinen laukaus jo on. Nelsonin 27 alusta käyvät suuremman laivaston kimppuun, mutta kannella voitto tarkoittaa ensin savua, melua ja tovereiden menettämistä.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat: Royal Museums Greenwich, *Battle of Trafalgar Timeline* ja National Maritime Museumin HMS Victory -kokoelma; tarkistettu 3.9.2026. https://www.rmg.co.uk/stories/maritime-history/battle-trafalgar-timeline

### Darwin Galápagossaarilla 1835

- `hetki-darwin-galapagos-1835-lahi-photo-v3.jpg` → 26-vuotias Darwin katsoo kilpikonnaa vielä uteliaana keräilijänä, ei valmiin teorian isänä. Hän ymmärtää saarten havaintojen merkityksen vasta myöhemmin — osin siksi, ettei aluksi merkitse kaikkien näytteidensä tarkkaa alkuperäsaarta.
- `hetki-darwin-galapagos-1835-kauko-photo-v3.jpg` → Beaglen miehistölle Galápagos on lyhyt pysähdys veden, ruoan ja näytteiden vuoksi; Darwinille sen viidestä viikosta tulee vuosikymmenten ajatuskumppani. Evoluutioteoria ei synny yhtenä välähdyksenä rannalla vaan epävarmoista muistiinpanoista, vertailusta ja pitkästä epäröinnistä.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat: Darwin Correspondence Project, Darwinin vuoden 1835 kirjeet ja Galápagos-oleskelun toimitukselliset viitteet; tarkistettu 3.9.2026. https://www.darwinproject.ac.uk/letter/?docId=letters/DCP-LETT-282.xml

### Fram lähtee pohjoiseen 1893

- `hetki-nansen-fram-1893-lahi-photo-v3.jpg` → Nansen jättää Kristianiaan Eva-vaimonsa ja vasta muutaman kuukauden ikäisen Liv-tyttärensä eikä voi luvata paluupäivää. Hänen suunnitelmansa on tarkoituksella jäädyttää Fram ahtojäihin — juuri siihen, mitä merimiehet tavallisesti pelkäävät eniten.
- `hetki-nansen-fram-1893-kauko-photo-v3.jpg` → Rannalla vilkuttavat omaiset joutuvat odottamaan uutisia lähes kolme vuotta. Framin runko kestää jään puristuksen ja koko miehistö palaa, mutta lähdön hetkellä kukaan ei vielä tiedä, onko Nansenin uhkapeli nerokas vai kohtalokas.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat: Frammuseet, *The First Fram Expedition (1893–1896)*; tarkistettu 3.9.2026. https://frammuseum.no/polar-history/expeditions/the-first-fram-expedition-1893-1896/

### Amundsen saavuttaa etelänavan 1911

- `hetki-amundsen-etelanapa-1911-lahi-photo-v3.jpg` → Roald Amundsen, Olav Bjaaland, Helmer Hanssen, Sverre Hassel ja Oscar Wisting tietävät olevansa ensimmäisiä — mutta kotiin on vielä lähes 1 300 kilometriä. He jättävät teltalle kirjeen Norjan kuninkaalle siltä varalta, että Scott saapuu perille mutta he eivät.
- `hetki-amundsen-etelanapa-1911-kauko-photo-v3.jpg` → Lipunnosto kestää hetken; selviytyminen on vaatinut viikkojen kylmyyden ja suunnitelman, jossa osa koirista uhrataan muiden ravinnoksi. Kaikki viisi norjalaista palaavat, kun taas 34 päivää myöhemmin navalle ehtivä Scottin ryhmä menehtyy paluumatkalla.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat ja Fram-alusreferenssi: Frammuseet, Roald Amundsenin etelänaparetki 1910–1912; tarkistettu 3.9.2026. https://frammuseum.no/polar-history/vessels/

### Titanic lähtee Southamptonista 1912

- `hetki-titanic-southampton-1912-lahi-photo-v3.jpg` → Seitsemänvuotias Eva Hart nousee Titaniciin vanhempiensa kanssa, mutta hänen äitinsä Esther pelkää laivaa niin paljon, ettei suostu nukkumaan öisin. Eva ja äiti pelastuvat; isä Benjamin jää niiden yli 1 500 ihmisen joukkoon, jotka eivät palaa.
- `hetki-titanic-southampton-1912-kauko-photo-v3.jpg` → Kolmivuotias Michel ja kaksivuotias Edmond matkustavat isänsä kanssa väärällä sukunimellä, äidiltä salaa vietyinä. Haaksirikon jälkeen isä kuolee ja pojat tunnetaan viikkoja vain 'Titanicin orpoina', kunnes heidän äitinsä tunnistaa heidät lehtikuvista.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat: Titanic Belfastin Eva Hart -aineisto ja Encyclopedia Titanican matkustajatiedot Eva Hartista sekä Michel ja Edmond Navratilista; tarkistettu 3.9.2026. https://www.titanicbelfast.com/media/3skpc4ul/self-guided-resources.pdf ja https://www.encyclopedia-titanica.org/

### Roskilden pitkälaiva noin 1040

- `hetki-viikinkilaiva-roskilde-1040-lahi-photo-v3.jpg` → Kuvan nuori soutaja lähtee ensimmäiselle pitkälle matkalleen eikä tiedä, palaako miehistö kaupankävijöinä, sotureina vai ei lainkaan. Kapea pitkälaiva tekee saman aluksen kaikista kolmesta mahdollisen ja kuljettaa pohjoismaisia ihmisiä Atlantille sekä idän jokireiteille.
- `hetki-viikinkilaiva-roskilde-1040-kauko-photo-v3.jpg` → Vuonon rannalle jäävät eivät näe pelkkää sotalaivaa vaan kokonaisen liikkuvan yhteisön: sukulaisia, velallisia, vapaita miehiä ja ehkä pakotettuja soutajia. Noin 60 airoa antaa alukselle nopeuden, mutta jokainen meripeninkulma syntyy yksittäisten käsien työstä.
- Lähderivi molemmille: Matkakirjan havainnekuva. Alusreferenssi: Vikingeskibsmuseet, Skuldelev 2, Irlannissa noin 1042–1043 rakennettu pitkälaiva; tarkistettu 3.9.2026. https://www.vikingeskibsmuseet.dk/frontend/Dokumenter/Skuldelev2_b.pdf

### Kolumbus hakee rahoitusta Portugalista 1484

- `hetki-kolumbus-portugali-1484-lahi-photo-v3.jpg` → Kolumbus on kantanut samoja karttoja ja laskelmia ovelta toiselle jo vuosia, kun Portugalin hovin asiantuntijat sanovat jälleen ei. Heidän epäilynsä osuu olennaiseen: Kolumbus kuvittelee Aasian paljon lähemmäksi kuin se on.
- `hetki-kolumbus-portugali-1484-kauko-photo-v3.jpg` → Kuningas Juhana II:n pöydällä Kolumbuksen suuri unelma näyttää tarpeettomalta riskiltä, sillä Portugali etenee jo Afrikan rannikkoa etelään. Hylätty suunnittelija lähtee Lissabonista loukattuna mutta ei luovuta — seuraavaksi hän yrittää Kastilian hovissa.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat ja asiakirjareferenssit: Library of Congress, näyttely *1492: An Ongoing Voyage* ja Henry Harrisse Collection; tarkistettu 3.9.2026. https://www.loc.gov/exhibits/1492/columbus.html ja https://www.loc.gov/static/research-centers/rare-book-and-special-collections/documents/Henry%20Harrisse.pdf

### Kolumbus saa rahoituksen Santa Fessä 1492

- `hetki-kolumbus-santa-fe-1492-lahi-photo-v3.jpg` → Kuninkaallinen sanansaattaja tavoittaa jo pois lähteneen Kolumbuksen ja kutsuu hänet takaisin Santa Fehen: vuosien torjunnat vaihtuvat viimein suostumukseksi. Hän ei saa vain laivoja, vaan vaatii itselleen amiraalin arvon, kuvernöörin aseman ja osuuden mahdollisista rikkauksista.
- `hetki-kolumbus-santa-fe-1492-kauko-photo-v3.jpg` → Isabella ei tarinan vastaisesti panttaa jalokiviään; rahoitus syntyy hovin neuvotteluista ja kruunun varoista. Huhtikuun 1492 sopimuksen äärellä Kolumbukselle ratkaisevaa ei ole vain matka vaan se, mitä hänestä tulee, jos lännessä todella odottaa Aasia.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat ja sopimusreferenssi: Library of Congress, Santa Fén 17.4.1492 kapitulaatiot ja Columbus, *Book of Privileges*; tarkistettu 3.9.2026. https://www.loc.gov/exhibits/1492/columbus.html ja https://tile.loc.gov/storage-services/service/ll/llmlp/SpanishConquest_Vol-I/SpanishConquest_Vol-I.pdf

### Aikakauden lehtisivut

- `hetki-titanic-daily-graphic-1912-lehti-photo-v3.jpg` → Jack Phillips jatkaa hätäkutsujen lähettämistä, vaikka vesi nousee Titanicin radiohyttiin; Harold Bride vetää pelastusliivin hänen ylleen. Bride selviää kaatuneen pelastusveneen päällä, Phillips kuolee — ja vain toinen heistä ehtii nähdä, kuinka lehdet tekevät radiomiehistä yön sankareita.
- Lähderivi: Matkakirjan havainnekuva: historiallinen rekonstruktio The Daily Graphicin 20.4.1912 julkaisemasta Titanic-muistonumerosta. Henkilöfaktat: Encyclopedia Titanica, Jack Phillips ja Harold Bride; tarkistettu 3.9.2026. https://www.encyclopedia-titanica.org/
- `hetki-nansen-verdens-gang-1893-lehti-photo-v3.jpg` → Eva Nansen jää puolen vuoden ikäisen Livin kanssa odottamaan miestä, joka aikoo kadota tarkoituksella Jäämeren ahtojäihin. Lehden lukijalle suunnitelma näyttää lähes itsetuhoiselta; kolme vuotta myöhemmin Fram palaa ja koko miehistö astuu maihin.
- Lähderivi: Matkakirjan havainnekuva: historiallinen rekonstruktio Verdens Gangin 24.6.1893 ilmestyneestä lähtönumerosta. Faktat: Frammuseet, *The First Fram Expedition (1893–1896)*; tarkistettu 3.9.2026. https://frammuseum.no/polar-history/expeditions/the-first-fram-expedition-1893-1896/
- `hetki-amundsen-tidens-tegn-1912-lehti-photo-v3.jpg` → Lyhyt sähke tekee Roald Amundsenista kansallissankarin, mutta retkikunnan miehille tärkein sana on paluu: kaikki viisi ovat hengissä. Samaan aikaan Robert Scott vetäytyy navalta kohti rannikkoa tietämättä vielä, ettei hänen ryhmänsä pääse kotiin.
- Lähderivi: Matkakirjan havainnekuva: historiallinen rekonstruktio Tidens Tegnin 9.3.1912 julkaisemasta Amundsen-numerosta. Faktat ja Fram-alusreferenssi: Frammuseet; tarkistettu 3.9.2026. https://frammuseum.no/polar-history/vessels/
- `hetki-trafalgar-the-times-1805-lehti-photo-v3.jpg` → Lontoolaiset lukevat samasta uutisesta voiton ja menetyksen: Napoleonin laivasto on lyöty, mutta Nelson on kuollut Victoryllä. Merimiesten perheille Collingwoodin lähetys ei ole vielä juhla, vaan alku piinaavalle kysymykselle siitä, kenen nimi seuraavassa luettelossa on.
- Lähderivi: Matkakirjan havainnekuva: historiallinen rekonstruktio The Timesin 7.11.1805 julkaisemasta Trafalgar-uutisesta. Faktat: Royal Museums Greenwich, *Battle of Trafalgar Timeline*; tarkistettu 3.9.2026. https://www.rmg.co.uk/stories/maritime-history/battle-trafalgar-timeline

### Röntgen näkee käden luiden varjon 1895

- `hetki-rontgen-kasi-1895-lahi-photo-v3.jpg` → Anna Bertha Röntgen pitää kättään liikkumatta pitkän valotuksen ajan tietämättä, näkyykö levylle mitään. Kun luiden ja vihkisormuksen tumma hahmo ilmestyy, aviopari katsoo ensimmäistä kertaa elävän ihmisen sisään ilman veistä.
- `hetki-rontgen-kasi-1895-kauko-photo-v3.jpg` → Röntgen kertoo kokeistaan viikkoihin tuskin kenellekään ja syökin usein laboratoriossa, kunnes tulos kestää hänen oman epäilynsä. Vasta sitten hän pyytää Anna Berthaa valotukseen, josta tulee sekä lääketieteellisen kuvantamisen alku että pelottavan henkilökohtainen perhekuva.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat ja alkuperäisen käsikuvan referenssi: NobelPrize.org, Wilhelm Conrad Röntgenin elämäkerta ja kuvagalleria; tarkistettu 3.9.2026. https://www.nobelprize.org/prizes/physics/1901/rontgen/biographical/ ja https://www.nobelprize.org/prizes/physics/1901/rontgen/photo-gallery/

### Wright Flyer nousee ilmaan 1903

- `hetki-wright-kitty-hawk-1903-lahi-photo-v3.jpg` → Orville makaa Flyerin ohjaimissa ja Wilbur juoksee siiven rinnalla niin pitkään kuin pystyy. Kahdentoista sekunnin kuluttua kone osuu hiekkaan, mutta veljekset tietävät jo onnistuneensa siinä, mitä moni piti mahdottomana.
- `hetki-wright-kitty-hawk-1903-kauko-photo-v3.jpg` → Pelastusasemalla työskentelevä John T. Daniels ei ole koskaan ennen ottanut valokuvaa, kun hän puristaa kameran laukaisupalloa juuri oikealla hetkellä. Hänen levylleen jää Orvillen 36 metrin lento — ensimmäinen neljästä yrityksestä sinä kylmänä aamuna.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat ja alkuperäisen valokuvan referenssi: U.S. National Park Service, Wright Brothers National Memorial, *The First Flight*; tarkistettu 3.9.2026. https://www.nps.gov/wrbr/learn/historyculture/thefirstflight.htm

### Einstein patenttitoimistossa 1905

- `hetki-einstein-patenttitoimisto-1905-lahi-photo-v3.jpg` → Patenttiviraston kolmannen luokan tekninen asiantuntija Albert Einstein joutuu siirtämään fysiikan muistiinpanot syrjään aina uuden hakemuksen saapuessa. Iltaisin hän palaa kysymykseen, miltä valo näyttäisi, jos sitä voisi ajaa kiinni.
- `hetki-einstein-patenttitoimisto-1905-kauko-photo-v3.jpg` → Kotona odottavat Mileva-vaimo, pieni Hans Albert ja niukka palkka; toimistossa odottaa pino patentteja. Tämän arkisen paineen keskellä 26-vuotias Einstein kirjoittaa neljä tutkimusta, mutta läheinen ystävä Michele Besso on niitä harvoja, joiden kanssa hän voi ajatella ääneen.
- Lähderivi molemmille: Matkakirjan havainnekuva. Faktat ja työhuonereferenssi: Albert Einstein Archives / einstein-website.de, *Patent Office*; tarkistettu 3.9.2026. https://einstein-website.de/en/patent-office/

Yhteensä: 34 tiedostoa, 34 kuvatekstiä ja 34 lähderiviä (pariotsikoiden
"molemmille"-riviä käytetään kummankin tiedoston lähderivinä). Kuvadataa tai
salaisuuksia ei ole postissa.

## 2.9.2026 23:28 UTC — KUVAPUTKI → FABLE: keksinnöt 1–5 hyväksytty ja varmennettu R2:ssa

Omistaja hyväksyi aikajanalinssin ensimmäiset viisi ilmiökuvaa. Ne on viety
julkiseen R2:een sovittuun kansioon ja luettu takaisin tavutasolla. Workflow
33695147705 päättyi onnistuneesti; paikallinen ja julkinen SHA-256 täsmäävät.

Kytkettävät tiedostot ja lopulliset kuvatekstit:

- `aikajana/keksinnot/1769-watt.jpg` — Wattin työpajan käsityöläinen
  kuuntelee, lakkaako sylinteri vihdoin jäähtymästä jokaisella iskulla —
  pieni muutos voisi tarkoittaa, ettei hiiltä enää lapioida hukkaan.
  Erillinen lauhdutin tekee höyrykoneesta paljon taloudellisemman ja antaa
  Wattin ajatukselle voiman lähteä laboratoriosta kaivoksiin ja tehtaisiin.
- `aikajana/keksinnot/1783-montgolfier.jpg` — Pilâtre de Rozier ja markiisi
  d'Arlandes seisovat avonaisella parvekkeella suoraan paperisen pallon tulen
  yläpuolella; mukana on märkiä sieniä, jos kipinät sytyttävät kuoren. Kun
  köydet irtoavat La Muettessa, heidän 25 minuutin lentonsa muuttaa
  mahdottomalta tuntuneen haaveen kahden ihmisen hyvin todelliseksi riskiksi.
- `aikajana/keksinnot/1796-jenner.jpg` — Kahdeksanvuotias puutarhurin poika
  James Phipps tutkii sidottua käsivarttaan tietämättä, että heinäkuussa
  Jenner altistaa hänet vielä isorokolle kokeen varmistamiseksi. Poika
  selviää, mutta hetki muistuttaa myös siitä, kuinka kaukana 1700-luvun
  lääketieteellinen koe on nykyisestä suostumuksesta ja lapsen suojasta.
- `aikajana/keksinnot/1800-volta.jpg` — Pavian laboratoriossa avustaja
  säpsähtää, kun metallikiekkojen pino antaa tasaisen sähköärsykkeen eikä vain
  yhtä staattista kipinää. Volta käyttää omaa kehoaan mittalaitteena ja avaa
  tien kokeille, joissa sähköä voidaan ensimmäistä kertaa tuottaa yhä
  uudelleen.
- `aikajana/keksinnot/1804-jacquard.jpg` — Lyonin nuori apulainen lukee
  rei'itettyä korttia kuin käskyä: yksi aukko voi nostaa juuri ne loimilangat,
  joista kukka syntyy. Korttiketju vapauttaa kuvion piirtäjän käsistä, mutta
  työpajan väki ymmärtää samalla, että kone voi tehdä osan heidän taidostaan
  ilman heitä.

SHA-256:
- 1769-watt: `d8a54813b8cdd62583f134ee72d897e1a0e0a9b0df1362710619ea31dc4fc7d3`
- 1783-montgolfier: `5348a409ff83c4633f67ec45124a796bdc3bb7b8b450cc1f4dff1cf146015b92`
- 1796-jenner: `7720583c8ccfdd3b9165a95b8a3acefd752fe50f84cd43170cd22564c6ca0bfb`
- 1800-volta: `f2425d26e386b55abe4c7b6d91e0c871d2feb2b8275454b7c3cc360b5fd04045`
- 1804-jacquard: `41ec1a2d4f31f4cfa381bc139a71ad5f7a640616c5faf16e1c2243c26b283646`

Kuvat ovat 1536 × 1024 JPEG/sRGB. Tee sovittu `keksinnot.js`-datakytkentä
versionumeron kautta. Kakkoserä 1825–1867 on yksityisessä arvioinnissa ja
odottaa vielä omistajan päätöksiä.

Ei kuvadataa eikä salaisuuksia postiin.


## 2026-09-01 — Korjattu työnjako Fablelta

Fable-korjaus on luettu commitista
`47163650be1ca17e0755526b471853f2fbca0e9d`. Tämä sessio on
**yleiskuvitussessio**: se tekee kaiken muun Matkakirjan kuvituksen paitsi
aarrekohtaamiset.

Sitovat tarkennukset:

- yhdestä kuvasta tehdään vain yksi versio, ei varianttinippuja;
- omistaja katselmoi kuvan Kuvajono-sivulla ja pyytää sieltä tarvittaessa
  kokonaan uuden generoinnin, lisäohjeella tai ilman;
- nostokuvien K1-erä tiedostossa
  `docs/mantereet-tyoaineisto/nostorikastus/kuvapromptit-k1.md` kuuluu tälle
  yleiskuvitussessiolle;
- aarrekohtaamiset kuuluvat erilliselle aarrekohtaamissessiolle, eikä niiden
  tehtäviä tai erityisiä henkilökuvalinjauksia sekoiteta yleiskuvitukseen.

Aiempi tulkinta, jossa K1 olisi ohjattu aarrekohtaamissessiolle, on hylätty.

## 2026-09-01 07:14 UTC — Erillinen kuvajono ja R2-toimitusreitti

Uusi Matkakirjan kuvatuotannon arviointijono on osoitteessa
https://matkakirja-kuvajono.sravelius.chatgpt.site. Se on erillään
Matkakirja-pelistä ja aiemmasta Kuvaraati-sivusta.

- Kaikki uudet kuvat ovat sivulla oletuksena hyväksyttyjä.
- Kuvakohtainen **Generoi uudelleen** -checkbox siirtää kuvan uuteen,
  kokonaan alusta tehtävään generointiin.
- Checkboxin alla on valinnainen lisäohje. Uudelleengeneroinnin saa
  jonoon myös ilman lisäohjetta; silloin pohjana ovat alkuperäinen prompti,
  omistajan yleiset kuvalinjaukset ja kuvatoimitussession oma laatutarkistus.
- **Lähetä päätökset** tallentaa palvelinpuolisen käsittelypyynnön
  `work_requests`-jonoon tilassa `pending`, josta kuvatoimitussessio voi
  lukea työn myöhemmin.

Turvallinen toimitusreittini on: sisäinen ImageGen → täysikokoinen
visuaalinen tarkistus → 1536 × 1536 JPEG ja sRGB IEC61966-2.1 →
välivarasto → GitHub Actions repo-secreteillä → R2:n `kohtaamiset/`-polku
→ metadata-, MIME-, CORS- ja takaisinlukutarkistus. Media ei käy eikä jää
Matkakirja-repoon. Ennen vientiä tarkistetaan nimiristiriita, eikä olemassa
olevaa R2-objektia korvata ilman omistajan nimenomaista lupaa.

Tämä `claude/postilaatikko`-haara on vain sessioiden viestikanava. Sitä ei
koskaan mergetä `main`-haaraan. Kirjoitan täällä vain omaan
`posti/kuvatoimitus.md`-tiedostoon; postiin ei tule salaisuuksia eikä
kuvadataa.
