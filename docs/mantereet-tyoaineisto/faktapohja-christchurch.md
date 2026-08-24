# Christchurch — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `christchurch`, maa NZL, en-Wikipedia
"Christchurch" ellei toisin mainita. Kaikki tiedot haettu en-Wikipediasta
**24.8.2026** (`action=raw`, `NODE_USE_ENV_PROXY=1`; jokainen haettu otsikko
tarkistettu #REDIRECT-rivin varalta — "ChristChurch Cathedral" ohjautuu
artikkeliin "Christ Church Cathedral, Christchurch" ja "Hagley Park" on
täsmennyssivu, oikea artikkeli on "Hagley Park, Christchurch". Useat haut
osuivat Wikipedian ja Commonsin 429-rajoitukseen; odotin kasvavan viiveen
ja yritin uudelleen resepti-ohjeen mukaisesti). Malli ja mitat luettu
tiedostoista `docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA) ja
`docs/moduulit/kaupunkilehti.md`, sekä mallitiedostona
`docs/mantereet-tyoaineisto/faktapohja-adelaide.md` (sama lauta, sama
putki, rakenne kopioitu siitä). Luin myös `docs/mantereet-tyoaineisto/
spec-mantereet.md` (Oseania-osio ja kaikkia kolmea uutta mannerta
koskevat viisi linjausta) ja `js/packs/oceania-questions.js` (vienti
`OCEANIA_QUESTIONS`, kohta `christchurch`, viisi kysymystä: saari,
Eteläiset Alpit, Canterburyn tasanko, vuoden 2011 järistys, puutarha-
kaupunki-lempinimi — ks. osio 8 siitä, miten päällekkäisyyksiä on
vältetty). `OCEANIA_FACTS`-taulussa on jo neljä christchurch-riviä
(kolme faktaa + isoisän repliikki), joita ei ole toistettu tässä
faktapohjassa sanasta sanaan — ks. osio 8.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus (tehtävänanto + spec-mantereet.md + Raamattu pilari 3):**
kāi tahu (Ngāi Tahu) kuvataan nykyisenä, elävänä kansana omalla nimellään;
heimon nykyinen hallintoelin Te Rūnanga o Ngāi Tahu toimii Christchurchin
Addingtonissa. Vuoden 1998 Ngāi Tahu Claims Settlement Act -sopimuslaki ja
pääministeri Jenny Shipleyn marraskuussa 1998 Ōnukun marae-kokoontumis-
paikalla Akaroan lähellä lukema virallinen anteeksipyyntö ovat mukana
omana nostonaan (K4). Maanjäristykset 2010–2011 käsitellään tapahtumina
ja lukuina toteavasti, ilman uhrien kärsimyksen kuvailua; painopiste on
jälleenrakennuksessa ja siinä, mitä kaupungissa on NYT — katedraalin
pitkä ja yhä kesken oleva kohtalo, Pahvikatedraali, Te Kaha -stadion,
FESTA/Open Christchurch -taidekulttuuri. Isoisän matkan vuosi 1873 osuu
suoraan ChristChurch-katedraalin rakennustyön uudelleenkäynnistykseen
arkkitehti Benjamin Mountfortin johdolla (H3) — ks. osio 8, huomio 1.
Ei nykysotaa, ei nykypolitiikkaa.

---

## 1. Sivuehdotukset

Tehtävänanto salli 1–3 teemasivua. Käytin kaikki kolme: aineisto kantoi
kolme selvästi erillistä, päällekkäisyydetöntä teemaa (yleishistoria ja
nykykansa, maanjäristykset ja jälleenrakennus, puutarhakaupunki/luonto),
ja jälleenrakennusteema on tehtävänannon eksplisiittinen painopiste,
joten se ansaitsee oman sivunsa yksittäisen noston sijaan.

### Sivu A — id `kaupunki`, nimi "Christchurch"

**Johdanto (209 merkkiä):**

> Kirkko ja korkeakoulu keskellä ruutukaavaa – niin Canterbury-yhdistys
> suunnitteli Christchurchin 1850. Isoisän matkan aikoihin asukkaita oli
> reilut 14 000, ja kaupunki oli jo Uuden-Seelannin vanhin virallinen.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Maanjäristykset ja jälleenrakennus"

**Perustelu valinnalle:** Tehtävänanto nimeää maanjäristykset 2010–2011
aiheeksi, joka "on käsiteltävä, koska ne muuttivat kaupungin täysin ja
jälleenrakennus on sen nykyinen tarina" — tämä on ainoa Oseania-laudan
kaupunki, jolla on näin vahva ja ajallisesti yhtenäinen "ennen/jälkeen"-
kaari, joten se kantaa oman sivunsa hyvin. Sivu etenee kronologisesti
lievemmästä syyskuun 2010 järistyksestä helmikuun 2011 tuhoon ja siitä
katedraalin vuosikymmenien pituiseen, yhä kesken olevaan kohtaloon sekä
Pahvikatedraaliin ja uuteen Te Kaha -stadioniin — eli juuri siihen, mitä
kaupungissa on nyt.

**Huomio nimestä:** id `historia` on käytössä (ei omaa aihe-id:tä
"jarleenrakennus" tms.), koska AIHE_IKONIT-vakioaiheisiin ei kuulu
maanjäristys-ikonia ja `historia` on lähin vakioaihe (ui.js). Sivun
näkyvä nimi voi silti olla "Maanjäristykset ja jälleenrakennus" — ks.
kaupunkilehti.md: teemasivu näyttää kategoriatason nimen.

**Johdanto (228 merkkiä):**

> Christchurch rakennettiin anglikaanisen kirkon unelmaksi englantilaisesta
> kaupungista eteläisellä pallonpuoliskolla – katedraali keskellä,
> korkeakoulu vieressä. 2010–2011 kaupunki koki jotain, mihin perustajat
> eivät varautuneet.

### Sivu C — teemasivu, ehdotettu id `luonto`, nimi "Luonto"

**Perustelu valinnalle:** Vakioaihe `luonto` sopii suoraan tehtävänannon
nimeämiin vahvoihin aiheisiin (puutarhakaupunki, Avon-joki, Hagley Park).
Sivu tuo myös kāi tahun paikannimet (Ōtākaro, Pūtaringamotu) luontoon
kietoutuneena, ilman päällekkäisyyttä kaupunki-sivun K2-noston kanssa,
joka käsittelee heimojen historiaa yleisemmällä tasolla.

**Johdanto (204 merkkiä):**

> Puutarhakaupungin nimi ei ole pelkkää markkinointia: Hagley Park ja
> kasvitieteellinen puutarha syntyivät jo 1850–60-luvuilla, ja mutkitteleva
> Avon-joki kantaa kahta nimeä, kahta kieltä ja kahta historiaa.

---

## 2. Kaksitoista nostoehdotusta (4 × 3 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Kaupunki joka rakennettiin katedraalin ympärille" (578 merkkiä)**

> Lontoolaiset lordit ja piispat perustivat Canterbury-yhdistyksen
> maaliskuussa 1848 rakentaakseen Uuteen-Seelantiin anglikaanisen
> ihannesiirtokunnan: kaupungin keskiöön oli tarkoitus nousta katedraali
> ja korkeakoulu Oxfordin Christ Church -collegen mallin mukaan.
> Ensimmäiset neljä laivaa – Charlotte Jane, Randolph, Sir George Seymour
> ja Cressy – toivat "Canterburyn pyhiinvaeltajat" Lyttelton Harbouriin
> joulukuussa 1850. Christchurchistä tuli kuninkaallisella patenttikirjeellä
> kaupunki 31. heinäkuuta 1856, ja se on siitä lähtien Uuden-Seelannin
> virallisesti vanhin kaupunki.

Faktat ja lähteet:
- Canterbury-yhdistys perustettiin Lontoossa 27.3.1848 parlamentin
  jäsenten, aatelisten ja anglikaanikirkon johtajien toimesta
  rakentamaan Canterbury-nimistä siirtokuntaa, jonka keskukseksi
  suunniteltiin Christchurchiä (nimetty Oxfordin Christ Church
  -collegen mukaan, jossa perustajajäsen John Robert Godley oli
  opiskellut). — en-Wikipedia "Canterbury Association"
- Ensimmäiset neljä laivaa (Charlotte Jane, Randolph, Sir George
  Seymour, Cressy) toivat "Canterburyn pyhiinvaeltajat" Lyttelton
  Harbouriin joulukuussa 1850; Charlotte Jane saapui ensimmäisenä
  16.12.1850. — en-Wikipedia "Christchurch" / "Canterbury Association"
- Christchurchistä tuli kuninkaallisella patenttikirjeellä (letters
  patent) kaupunki 31.7.1856 — Uuden-Seelannin ensimmäinen ja siten
  virallisesti vanhin kaupunki. — en-Wikipedia "Christchurch"
- Pyhiinvaeltajilla oli tavoitteena rakentaa kaupunki katedraalin ja
  korkeakoulun ympärille Oxfordin Christ Church -collegen mallin
  mukaisesti. — en-Wikipedia "Christchurch"

**Nosto K2 — "Kolme kansaa ja kolme nimeä" (522 merkkiä)**

> Ennen eurooppalaisia alueella asui vuorotellen kolme heimoa: 1200-luvulla
> saapunut waitaha väistyi 1500-luvulla kāti māmoelle, joka puolestaan
> sulautui sata vuotta myöhemmin kāi tahuun avioliittojen ja konfliktien
> kautta. Kaupungin māorinkielinen nimi Ōtautahi omaksuttiin vasta
> 1930-luvulla; se viittaa erääseen tiettyyn paikkaan Avon-joen varrella,
> jossa kāi tahu -päällikkö Te Pōtiki Tautahi keräsi ruokaa. Sitä ennen
> kāi tahu kutsui koko aluetta nimellä Karaitiana – suora ääntämyslaina
> englannin sanasta Christchurch.

Faktat ja lähteet:
- Alueella asui ensin waitaha-heimo 1200-luvulta alkaen; noin 1500
  kāti māmoe muutti alueelle etelään ja valtasi Canterburyn, ja kāi
  tahu saapui sata vuotta myöhemmin, jolloin molemmat sulauttivat
  waitahan itseensä konfliktien ja avioliittojen kautta. — en-Wikipedia
  "Christchurch"
- Māorinkielinen nimi Ōtautahi omaksuttiin 1930-luvulla; se viittaa
  tarkasti erääseen paikkaan Avon-joen (Ōtākaro) varrella keskustassa,
  kāi tahu -päällikkö Te Pōtiki Tautahin kausittaiseen
  ruoankeräyspaikkaan. — en-Wikipedia "Christchurch"
- Ennen Ōtautahi-nimeä kāi tahu kutsui aluetta yleisesti nimellä
  Karaitiana, joka on suora transkriptio englannin sanasta
  "Christchurch" māorin kielelle. — en-Wikipedia "Christchurch"

**Nosto K3 — "Kaupunki jonka puolet asukkaista väisti pyöräilijöitä" (554 merkkiä)**

> 1890-luvun vaihteessa Christchurchiä kutsuttiin lempinimellä
> "Cyclopolis": kaupungin tasainen maasto teki siitä Uuden-Seelannin
> pyöräilykaupungin. Kirjailija Mark Twain kuvasi vuonna 1895 näkymää
> sanoin, joissa puolet asukkaista polki pyörää ja toinen puoli väisteli
> heitä. Perintö elää yhä: 2020-luvulla lähes neljäsosa koko maan
> pyöräilevistä työmatkalaisista asuu Christchurchissä, ja
> pyöräilijämäärät kasvoivat 30 prosenttia vuosina 2016–2023 kaupungin
> rakennettua satoja kilometrejä uusia pyöräteitä maanjäristysten
> jälkeisessä jälleenrakennuksessa.

Faktat ja lähteet:
- Christchurch tunnettiin 1900-luvun taitteessa lempinimellä
  "Cyclopolis" tasaisen keskustan ansiosta; Mark Twain kuvasi
  kaupunkia 1895 paikkana, "jossa puolet väestä ajaa polkupyörällä ja
  toinen puoli on kiireisenä väistelemässä heitä". — en-Wikipedia
  "Christchurch"
- 2023 väestönlaskennan mukaan lähes 25 % kaikista Uuden-Seelannin
  pyöräilevistä työmatkalaisista asuu Christchurchissä. — en-Wikipedia
  "Christchurch"
- Pyöräilymatkat kasvoivat 30 % vuosina 2016–2023, yli 3,6 miljoonaa
  pyöräilijää havaittiin laskentapisteissä 12 kuukauden aikana;
  kasvu liittyy maanjäristysten jälkeiseen pyöräteiden
  laajennusohjelmaan (Major Cycle Route -hanke, tavoite 100 km uusia
  reittejä). — en-Wikipedia "Christchurch"

**Nosto K4 — "Anteeksipyyntö joka luettiin Akaroan lähellä" (585 merkkiä)**

> Vuonna 1998 Uuden-Seelannin parlamentti sääti Ngāi Tahu Claims
> Settlement Act -lain, joka tunnusti Kruunun rikkoneen toistuvasti
> Waitangin sopimuksen periaatteita ostaessaan 1840–1860-luvuilla yli
> 34,5 miljoonaa eekkeriä kāi tahun maata halvalla. Pääministeri Jenny
> Shipley luki virallisen anteeksipyynnön marraskuussa 1998 Ōnukun
> marae-kokoontumispaikalla Akaroan lähellä. Te Rūnanga o Ngāi Tahu,
> heimon nykyinen hallintoelin, toimii Addingtonin kaupunginosassa
> Christchurchissä – yksi monista todisteista siitä, että kāi tahu on
> tämän päivän kaupungin elävä osa, ei historian jäänne.

Faktat ja lähteet:
- Ngāi Tahu Claims Settlement Act säädettiin 1998; laki tallensi
  Kruunun antaman anteeksipyynnön ja totesi Kruunun toimineen
  "kohtuuttomasti ja toistuvasti Waitangin sopimuksen periaatteiden
  vastaisesti" kāi tahun maakauppojen yhteydessä 1844–1864, jolloin
  yli 34,5 miljoonaa eekkeriä maata siirtyi Kruunulle 14 750 punnalla.
  — en-Wikipedia "Ngāi Tahu Claims Settlement Act 1998"
- Kuninkaallinen hyväksyntä (royal assent) laille annettiin
  1.10.1998; pääministeri Jenny Shipley luki anteeksipyynnön
  henkilökohtaisesti Ōnukun marae-kokoontumispaikalla Akaroan
  lähellä Banks Peninsulalla marraskuussa 1998. — en-Wikipedia
  "Ngāi Tahu Claims Settlement Act 1998"
- Sopimus sisälsi 170 miljoonan dollarin taloudellisen hyvityksen ja
  kulttuurisen hyvityksen, jossa Kruunu tunnusti kāi tahun perinteisen
  kaitiaki (huoltaja) -roolin Eteläsaaren luonnonvarojen hoidossa. —
  en-Wikipedia "Ngāi Tahu Claims Settlement Act 1998"
- Te Rūnanga o Ngāi Tahu, heimon tunnustettu hallintoelin, toimii
  Christchurchissä ja Invercargillissa. — en-Wikipedia "Ngāi Tahu" /
  "Ngāi Tahu Claims Settlement Act 1998"

### Teemasivu `historia` (Maanjäristykset ja jälleenrakennus) — 4 nostoa

**Nosto H1 — "Järistys joka säästi kaupungin – kerran" (535 merkkiä)**

> Lauantaina 4. syyskuuta 2010 kello 4.35 aamulla magnitudiltaan 7,1
> järistys ravisteli Christchurchiä Darfieldin kylän lähettyviltä. Se
> vaurioitti rakennuksia ja katkaisi sähköjä laajalti, mutta koska
> järistys osui varhaisaamuun eikä kaupungissa juuri ollut
> vahvistamattomasta tiilestä tehtyjä taloja, seuraukset jäivät
> suhteellisen lieviksi: kaksi kuoli ja yli 1 700 loukkaantui.
> Vakuutuskorvauksia haettiin jo tästä yksittäisestä järistyksestä
> 2,75–3,5 miljardin dollarin edestä. Kukaan ei vielä tiennyt, että
> pahin oli vasta tulossa.

Faktat ja lähteet:
- 4.9.2010 kello 4.35 paikallista aikaa Christchurchiä ja Canterburyn
  aluetta ravisteli magnitudiltaan 7,1 järistys, jonka episentrumi oli
  Darfieldin lähellä, syvyydessä 10 km. — en-Wikipedia "2010 Canterbury
  earthquake"
- Vähäisten henkilövahinkojen syyksi mainitaan varhainen kellonaika ja
  se, ettei kaupungissa ollut paljon vahvistamattomasta muurauksesta
  tehtyjä rakennuksia; kaksi kuoli ja yli 1 700 loukkaantui. —
  en-Wikipedia "2010 Canterbury earthquake"
- Vakuutusvaateet tästä järistyksestä olivat 2,75–3,5 miljardia
  dollaria (epäselvää kuinka paljon kustannuksista kuuluu millekin
  koko 2010–2011 järistyssarjan tapahtumalle erikseen). —
  en-Wikipedia "2010 Canterbury earthquake"

**Nosto H2 — "Kolmetoista sekuntia joka muutti kaiken" (556 merkkiä)**

> Tiistaina 22. helmikuuta 2011 kello 12.51 keskikaupungin alle vain
> viiden kilometrin syvyyteen osunut 6,3 magnitudin järistys teki sen,
> mitä syyskuun järistys ei ollut tehnyt: se tappoi 185 ihmistä ja
> tuhosi keskustan. Maaperän nesteytyminen työnsi esiin noin 400 000
> tonnia silttiä itäisissä lähiöissä, ja yli 8 000 kotia jouduttiin
> lopulta purkamaan tai siirtämään mahdottomaksi käyneiltä punaisen
> vyöhykkeen tonteilta. Yli tuhat historiallista rakennusta purettiin
> vuoteen 2015 mennessä, ja kaupungin korkeimmat tornitalot katosivat
> kokonaan siluetista.

Faktat ja lähteet:
- 22.2.2011 kello 12.51 keskikaupungin lähellä, 5 km syvyydessä osunut
  järistys (kirjallisuudessa yleisesti "6,3 magnitudin", infoboxissa
  6,1–6,2 momenttimagnitudi eri laitosten mukaan — ks. osio 8, huomio
  2) tappoi 185 ihmistä yli 20 maasta. — en-Wikipedia "2011 Christchurch
  earthquake" / "Christ Church Cathedral, Christchurch"
- Merkittävä nesteytyminen tuotti itäisissä lähiöissä noin 400 000
  tonnia silttiä. — en-Wikipedia "2011 Christchurch earthquake"
- Yli 8 000 kotia asumiskelvottomaksi todetuilla "punaisen vyöhykkeen"
  alueilla purettiin tai siirrettiin Kruunun ja vakuutusyhtiöiden
  vapaaehtoisin lunastuksin; viimeinen purku valmistui lokakuussa
  2021. — en-Wikipedia "2011 Christchurch earthquake"
- Helmikuuhun 2015 mennessä Neljän Avenuen sisällä oli tehty 1 240
  purkua syyskuun 2010 järistyksen jälkeen; kaupungin korkeimmat
  tornitalot purettiin. — en-Wikipedia "2011 Christchurch earthquake"

**Nosto H3 — "Katedraali joka ei ole vieläkään valmis" (655 merkkiä)**

> Neogoottinen ChristChurch-katedraali oli keskeneräinen 40 vuotta
> ennen vihkimistään 1881 – rakentaminen alkoi 1864, pysähtyi rahapulaan
> kahdeksaksi vuodeksi ja jatkui vasta arkkitehti Benjamin Mountfortin
> johdolla 1873, isoisän matkan vuonna. Helmikuun 2011 järistys tuhosi
> tornin huipun kokonaan, ja katedraali vihittiin pois käytöstä
> marraskuussa. Kymmenen vuoden riita purkamisesta ja ennallistamisesta
> päättyi 2017 äänestykseen entisöinnin puolesta, mutta kustannusarvio
> kasvoi 104 miljoonasta lähes 250 miljoonaan dollariin, ja työt
> pysäytettiin 2024 rahoitusvajeen vuoksi. Uusi "Re:Opening"-suunnitelma
> avaa tornin ja pääsalin vaiheittain 2026–2030.

Faktat ja lähteet:
- Peruskivi laskettiin 16.12.1864; rakennustyö pysähtyi rahapulaan
  lähes kahdeksaksi vuodeksi (aukio oli "hylätty ja ruohottunut" –
  Anthony Trollope 1872), ja jatkui vasta 1873, kun uusi paikallinen
  arkkitehti Benjamin Mountfort otti projektin johtoonsa. Pääsali ja
  torni vihittiin 1.11.1881. — en-Wikipedia "Christ Church Cathedral,
  Christchurch"
- Helmikuun 2011 järistys tuhosi tornin huipun kokonaan; katedraali
  vihittiin pois käytöstä (deconsecrated) 9.11.2011. — en-Wikipedia
  "Christ Church Cathedral, Christchurch"
- Syyskuussa 2017 anglikaaninen synodi äänesti 55 % enemmistöllä
  katedraalin ennallistamisen puolesta pitkän purkukiistan jälkeen. —
  en-Wikipedia "Christ Church Cathedral, Christchurch"
- Kustannusarvio nousi 2017 vuoden 104 miljoonasta dollarista 2024
  arvioon 248 miljoonaa dollaria; elokuussa 2024 hallitus päätti olla
  jatkamatta rahoitusta ja työt pysäytettiin ("mothballing"). Syyskuussa
  2025 esiteltiin "Re:Opening"-suunnitelma, jonka mukaan tornin, pääsalin
  ja ruusuikkunan ensimmäinen vaihe valmistuu vuoteen 2030 mennessä. —
  en-Wikipedia "Christ Church Cathedral, Christchurch"

**Nosto H4 — "Pahvista rakennettu kirkko joka kesti odotettua kauemmin" (645 merkkiä)**

> Kun piispa päätti katedraalin kohtalon jäävän vuosikausiksi auki,
> seurakunta tarvitsi väliaikaisen kodin – ja sai sellaisen japanilaiselta
> arkkitehti Shigeru Banilta. Pahvikatedraaliksi ristitty rakennus nousi
> 96 pahviputkesta, puusta ja teräksestä Latimer Squarelle ja vihittiin
> käyttöön elokuussa 2013: se oli ensimmäinen merkittävä uudisrakennus
> koko jälleenrakennuksessa. Rakennus mahtuu 700 hengelle ja on
> suunniteltu kestämään 50 vuotta – ei ikuisesti, mutta paljon kauemmin
> kuin kukaan osasi odottaa hätäratkaisulta. Vuonna 2026 valmistunut
> 30 000 katsojan Te Kaha -stadion on toinen suuri esimerkki siitä, mitä
> tuhon paikalle on noussut.

Faktat ja lähteet:
- Japanilainen "katastrofiarkkitehti" Shigeru Ban suunnitteli
  siirtymäkauden katedraalin pro bono yhteistyössä Christchurchin
  arkkitehtitoimisto Warren and Mahoneyn kanssa; rakennus valmistui
  96 pahviputkesta, puusta ja teräksestä Latimer Squarelle ja
  vihittiin käyttöön 15.8.2013. — en-Wikipedia "Cardboard Cathedral"
- Rakennus mahtuu noin 700 hengelle ja on suunniteltu kestämään 50
  vuotta pysyvän sijaan; se oli ensimmäinen merkittävä valmistunut
  rakennus osana Christchurchin jälleenrakennusta. — en-Wikipedia
  "Cardboard Cathedral"
- Uusi 30 000 katsojan monikäyttöstadion Te Kaha, joka korvaa
  järistyksissä tuhoutuneen Lancaster Parkin, valmistui huhtikuussa
  2026. — en-Wikipedia "Christchurch" (Sport-osio)

### Teemasivu `luonto` — 4 nostoa

**Nosto L1 — "Puutarhakaupunki joka ansaitsi nimensä" (514 merkkiä)**

> Brittiläinen lakimies John Eldon Gorst antoi Christchurchille
> lempinimen "puutarhakaupunki" verrattuaan sitä Englannin
> puutarhakaupunkeihin. Nimi ei ole liioittelua: maakunnan hallitus
> varasi Hagley Parkin pysyvästi yleiseksi puistoksi jo 1855, ja sen
> kupeeseen perustettu kasvitieteellinen puutarha avattiin 1863, kun
> tammi istutettiin prinssi Albert Edwardin ja prinsessa Alexandran
> häiden kunniaksi. Puiston pohjoisosan kirsikkapuut, jotka istutettiin
> Arbor Dayna 1936, vetävät yhä kukkiessaan väkeä ihailemaan.

Faktat ja lähteet:
- Brittiläinen lakimies John Eldon Gorst antoi Christchurchille
  lempinimen "The Garden City" verratessaan sitä Englannin
  puutarhakaupunkeihin. — en-Wikipedia "Christchurch"
- Hagley Park (164,6 hehtaaria, Christchurchin suurin kaupunkipuisto)
  varattiin maakunnan hallituksen päätöksellä pysyvästi yleiseksi
  puistoksi 1855; nimetty Lord Lytteltonin, Canterbury-yhdistyksen
  puheenjohtajan, kotitilan mukaan. — en-Wikipedia "Hagley Park,
  Christchurch"
- Kasvitieteellinen puutarha (21 ha) perustettiin 1863, kun englantilainen
  tammi istutettiin prinssi Albert Edwardin ja prinsessa Alexandra
  Tanskalaisen häiden kunniaksi. — en-Wikipedia "Christchurch Botanic
  Gardens"
- Puiston pohjoisosan kirsikkapuut istutettiin Harper Avenuelle Arbor
  Dayna 1936 ja ovat suosittu nähtävyys kukkiessaan. — en-Wikipedia
  "Christchurch"

**Nosto L2 — "Joki jonka Shakespeare-nimi ei ehtinyt käyttöön" (517 merkkiä)**

> Ensimmäiset eurooppalaiset uudisasukkaat, veljekset John ja William
> Deans, nimesivät joen 1848 uudelleen Skotlannin Avon-joen mukaan,
> jonka varrella heidän isoisänsä tila sijaitsi – Canterbury-yhdistys
> oli suunnitellut nimeksi "Shakespere"-jokea, mutta veljekset ehtivät
> ensin. Kāi tahulle joki oli Ōtākaro, "leikkipaikka", koska lapset
> leikkivät rannalla ruoanhankinnan aikana. Vuoden 1998 sopimuslaki teki
> nimestä virallisesti kaksikielisen: Avon River / Ōtākaro kantaa
> nykyään molempia historioita samanaikaisesti.

Faktat ja lähteet:
- Kāi tahun nimi joelle on Ōtākaro, "leikkipaikka" — nimi viittaa
  lapsiin, jotka leikkivät rannalla aikuisten kerätessä ruokaa. —
  en-Wikipedia "Avon River / Ōtākaro"
- Canterbury-yhdistys oli suunnitellut nimeäjoelle "Shakespere"; John
  Deans nimesi joen 1848 uudelleen Skotlannin Avon-joen (Ayrshire)
  mukaan, jonka lähellä hänen isoisänsä tila sijaitsi. Nimien
  yhteneväisyys Stratford-upon-Avonin kanssa on siis sattumaa, ei
  syy nimivalinnalle. — en-Wikipedia "Avon River / Ōtākaro"
- Nimi muutettiin virallisesti kaksikieliseksi Avon River / Ōtākaroksi
  Ngāi Tahu Claims Settlement Act 1998:n myötä, osana laajempaa
  paikannimien kaksikielistämistä. — en-Wikipedia "Avon River / Ōtākaro"

**Nosto L3 — "Metsä jonka nimi tarkoittaa katkaistua korvaa" (586 merkkiä)**

> Riccartonin esikaupungissa kasvaa 6,4 hehtaarin kaistale alkuperäistä
> kahikatea-metsää, jollaista koko Canterburyn tasangolla peitti ennen
> mahdollisesti tuhansia vuosia – nykyään sitä on jäljellä vain neljällä
> erillisellä paikalla. Kāi tahu kutsui paikkaa nimellä Pūtaringamotu,
> "katkaistu korva", koska metsäsaareke oli eristyksissä muusta
> metsästä. Deans-veljekset sopivat jo 1848 New Zealand Companyn kanssa
> metsän suojelusta, ja vuoden 1914 erityislaki teki suojelusta
> pysyvän. Kääntöpuolisto: aitaus pitää pedot loitolla, ja kiwilinnun
> palauttamista alueelle on alettu suunnitella.

Faktat ja lähteet:
- Riccarton Bush (Deans Bush, māorinkielinen nimi Pūtaringamotu,
  "korvan repeämä/katkaistu korva" — kuvaannollinen ilmaus muusta
  metsästä eristetylle saarekkeelle) on yksi vain neljästä jäljellä
  olevasta palasta Canterburyn tasangon alkuperäistä kahikatea-metsää,
  joka säästyi moa-metsästyskauden laajoilta metsäpaloilta. —
  en-Wikipedia "Riccarton, New Zealand"
- John ja William Deans sopivat 1848 New Zealand Companyn kanssa noin
  22 hehtaarin kahikatea-metsän suojelusta Pūtaringamotussa; 1914
  jäljellä oleva 6,4 hehtaaria suojattiin pysyvästi Riccarton Bush
  Act 1914 -lailla, jota ajoivat mm. Harry Ell ja kasvitieteilijä
  Leonard Cockayne. — en-Wikipedia "Riccarton, New Zealand"
- Petoeläimiltä suojaava aita on pystytetty toiveena palauttaa kiwi
  alueelle. — en-Wikipedia "Riccarton, New Zealand"

**Nosto L4 — "Puisto joka syntyi tuhon jälkeen" (563 merkkiä)**

> Maanjäristykset tekivät osasta Avon-joen rantalähiöitä
> asumiskelvottomia – yli 8 000 kotia purettiin tai siirrettiin niin
> sanotulla punaisella vyöhykkeellä. Paikallinen Avon-Ōtākaro Network
> -verkosto alkoi heti ajaa ajatusta, että tyhjentyneistä tonteista
> rakennettaisiin yhtenäinen puistokäytävä joen varrelle keskustasta
> suistoon asti – kaupunginjohtajakin tuki hanketta. Osana samaa
> parannustyötä kaupunki osti 2015 englantilaisen kuvanveistäjä Antony
> Gormleyn kaksi patsasta, joista toinen sijoitettiin jokeen:
> taiteilijan oma tulkinta kaupungin toipumisesta.

Faktat ja lähteet:
- Suuri osa Avon-joen alajuoksun rantamaasta jouduttiin merkitsemään
  "punaiseksi vyöhykkeeksi" maanjäristysten jälkeen; paikallinen
  Avon-Ōtākaro Network (AvON) -kansalaisverkosto on ajanut ajatusta
  yhtenäisestä puistokäytävästä keskustasta suistoon, ja sai tuen
  kaupunginjohtaja Bob Parkerilta. — en-Wikipedia "Avon River / Ōtākaro"
- Syyskuussa 2015 Christchurch City Council ja Canterbury Earthquake
  Recovery Authority ostivat kaksi Antony Gormley-patsasta ("Stay"),
  joista toinen sijoitettiin Avon-jokeen ja toinen Arts Centrelle;
  taiteilija halusi teosten tukevan kaupungin toipumista järistyksistä.
  — en-Wikipedia "Avon River / Ōtākaro"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia sanasta sanaan.

**Jakso 1 — "Perille ja liikkeelle"**

Christchurch on Eteläsaaren suurin kaupunki, ja sen lentokenttä on maan
toiseksi vilkkain – ja samalla yksi maailman viidestä Etelämantereen
porttikaupungista. Antarktinen yhteys alkoi jo 1901 Discovery-tutkimus-
matkasta, ja nykyään Yhdysvaltain, Uuden-Seelannin, Etelä-Korean ja
Italian antarktisohjelmat lähtevät liikkeelle täältä. Rautatieasemalta
lähtee myös TranzAlpine, yksi maailman kauneimmista junamatkoista
Eteläisten Alppien läpi Greymouthiin.

Faktat ja lähteet:
- Christchurch Airport on Uuden-Seelannin toiseksi vilkkain lentokenttä.
  — en-Wikipedia "Christchurch" (Transport-osio)
- Kaupungin Etelämanner-yhteys alkoi 1901 Discovery-tutkimusmatkasta
  Lytteltonista; Christchurch on nykyään yksi viidestä "Antarctic
  gateway city" -kaupungista, ja sitä käyttävät Yhdysvaltain,
  Uuden-Seelannin, Etelä-Korean ja Italian antarktisohjelmat. —
  en-Wikipedia "Christchurch" (Gateway to the Antarctic -osio)
- TranzAlpine-juna kulkee Main South- ja Midland-linjoja Otira-tunnelin
  ja Eteläisten Alppien kautta Greymouthiin; matkaa pidetään usein
  yhtenä maailman kymmenestä hienoimmasta junamatkasta. — en-Wikipedia
  "Christchurch" (Transport-osio)

**Jakso 2 — Alueen rakenne**

Kaupunki lepää lähes tasaisena Canterburyn tasangolla, joka on koko
maan laajin ja tärkein maatalousalue – vain Port Hillsin kukkulat
etelässä rikkovat tasaisuuden. Tasangon takana kohoavat Eteläiset Alpit,
joiden korkein huippu Aoraki nousee yli 3 700 metriin ja joissa on yli
3 000 jäätikköä. Vuoret jakavat saaren kahtia säältään: läntinen rinne
saa moninkertaisesti enemmän sadetta kuin itäinen puoli, jolle
Christchurch ja koko tasanko jäävät.

Faktat ja lähteet:
- Christchurch sijaitsee lähes tasaisena Canterburyn tasangolla; Port
  Hills Banks Peninsulalla on ainoa poikkeus tasaisuudesta. —
  en-Wikipedia "Christchurch" (Location-osio)
- Canterburyn tasanko on Uuden-Seelannin laajin tasanko, syntynyt
  Eteläisten Alppien jäätiköiden kuljettamasta soraisesta aineksesta.
  — en-Wikipedia "Canterbury Plains"
- Eteläiset Alpit (Kā Tiritiri o te Moana) ulottuvat n. 500 km;
  korkein huippu Aoraki / Mount Cook 3 724 m, ja vuoristossa on
  yli 3 000 yli hehtaarin kokoista jäätikköä. — en-Wikipedia
  "Southern Alps"
- Vuoret sijaitsevat kohtisuorassa vallitseviin länsituuliin nähden:
  vuotuinen sademäärä vaihtelee noin 3 000 mm:stä länsirannikolla
  aina 15 000 mm:iin lähellä päävedenjakajaa, kun taas 30 km itään
  vedenjakajasta sademäärä on enää noin 1 000 mm — Christchurch ja
  koko Canterburyn tasanko jäävät tälle kuivemmalle puolelle. —
  en-Wikipedia "Southern Alps" (Climate-osio)

**Jakso 3 — Arjen ilmiö: taidetta tyhjillä tonteilla**

Maanjäristysten jälkeen tyhjäksi jääneistä keskustan tonteista tuli
odottamaton taidealusta: vuodesta 2012 järjestetty Festival of
Transitional Architecture (FESTA) täytti aukot väliaikaisilla
asennuksilla, ja perintö jatkuu nykyään Open Christchurch
-arkkitehtuuritapahtumana. Samaan aikaan Latimer Squarella
pahvikatedraali toimii sekä kirkkona että konserttitilana, ja New
Regent Streetin espanjalaistyylinen kauppakatu – jonka läpi raitiovaunu
yhä kulkee – kertoo, ettei kaupunki ole vain jälleenrakennustyömaa.

Faktat ja lähteet:
- Festival of Transitional Architecture (FESTA) järjestettiin
  2012–2018 arkkitehtuurihistorioitsija Jessica Hallidayn perustamana;
  perintö jatkuu vuodesta 2019 vuosittaisena Open Christchurch
  -tapahtumana, jota järjestää Te Pūtahi Centre for Architecture and
  City Making. — en-Wikipedia "Christchurch" (Festivals-osio)
- Pahvikatedraali toimii sekä seurakunnan kirkkona että
  konferenssi/konserttitilana. — en-Wikipedia "Christ Church Cathedral,
  Christchurch" (Transitional cathedral -osio)
- 1995 uudelleen perustettu heritage-raitiovaunu kulkee lyhyttä
  silmukkaa keskustan katujen kautta, pysäkkeinä mm. Cathedral Square,
  Arts Centre ja Canterbury Museum; New Regent Street näkyy myös
  Christchurchin infoboxin kuvakarusellissa nimenomaan raitiovaunun
  kanssa. — en-Wikipedia "Christchurch" (Transport-osio)

**Jakso 4 — Historian käännekohta: agraarikaupungista teollisuuskaupungiksi**

1900-luvun alussa Christchurch teollistui nopeasti: Woolstonin ja
Addingtonin lähiöihin nousi kumitehtaita, panimoita ja rautatiepajoja,
ja väestö kasvoi työläisperheiden muuttaessa kaupunkiin. Asukasluku
ylitti ensi kertaa 100 000 vuonna 1919. Samalla kaupunki rakensi maan
varhaisimpia työväen valtion vuokra-asuntoja Sydenhamiin jo 1900-luvun
ensimmäisellä vuosikymmenellä – vuosikymmeniä ennen kuin valtion
asuntotuotanto yleistyi muualla maassa.

Faktat ja lähteet:
- Christchurch teollistui voimakkaasti 1900-luvun alussa erityisesti
  Woolstonin (kumiteollisuus) ja Addingtonin (rautatiepajat)
  lähiöissä; väkiluku ylitti 100 000 ensimmäistä kertaa 1919. —
  en-Wikipedia "Christchurch" (History-osio)
- Varhaisimmat valtion vuokra-asunnot (state housing) rakennettiin
  Sydenhamiin 1900-luvun ensimmäisellä vuosikymmenellä lähitehtaiden
  työläisille, lisää 1909 Addington Railway Workshopsin lähelle. —
  en-Wikipedia "Christchurch" (City growth -osio)

**Jakso 5 — Milloin kannattaa tulla**

Christchurchillä on lauhkea merellinen ilmasto ilman selvää kuivaa
kautta: kesät ovat leudot (tammikuun keskilämpötila reilut 22 astetta)
ja talvet viileät mutta harvoin ankarat, joskin pakkasöitä on
lentokentällä keskimäärin 50 vuodessa ja lunta sataa muutaman kerran
talvessa. Ajoittainen luoteistuuli nor'wester voi puhaltaa myrskyksi
asti ja tuoda äkillisiä lämpöpiikkejä. Kirkkaina talvi-iltoina kaupungin
ympärillä olevat kukkulat pitävät kylmän ilman paikallaan ja voivat
aiheuttaa savusumua – siksi avotulet on kielletty keskustassa vuodesta
2006.

Faktat ja lähteet:
- Köppen-luokka Cfb (lauhkea merellinen ilmasto): leudot kesät,
  viileät talvet, kohtalainen sademäärä; keskimääräinen
  päivälämpötila tammikuussa 22,6 °C ja heinäkuussa 10,9 °C. —
  en-Wikipedia "Christchurch" (Climate-osio)
- Pakkasöitä keskimäärin 50 kertaa vuodessa lentokentällä (23 kertaa
  keskustassa); lunta sataa keskimäärin kolmesti vuodessa. —
  en-Wikipedia "Christchurch" (Climate-osio)
- Nor'wester on ajoittain myrskyvoimakkuuteen yltävä föhn-tuuli, joka
  aiheuttaa pientä omaisuusvahinkoa. — en-Wikipedia "Christchurch"
  (Climate-osio)
- Kirkkaina, tyyninä talvi-öinä muodostuu inversiokerros, joka voi
  aiheuttaa WHO:n suositukset ylittävää savusumua; avotulet on
  kielletty vuodesta 2006. — en-Wikipedia "Christchurch" (Climate-osio)
- **HUOM:** samoin kuin muissa tämän sarjan kaupungeissa, yllä olevat
  luvut ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin
  pelin `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali.
  Tarkat kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 4. Kahdeksan kohdekartan kohdetta (+ vertailupiste)

Koordinaatit poimittu Wikipedian `action=query&prop=coordinates`
-rajapinnasta (Cardboard Cathedral: infobox `{{coord}}`-parametrit
raakatekstistä). Etäisyydet ja suunnat OMIA LASKELMIANI koordinaatti-
eroista (asteet × 111 km, pituusasteille kerrottu cos(43,531°) ≈ 0,725),
tarkistettu Node-skriptillä — sama menetelmä kuin
faktapohja-adelaide.md:ssä.

**Vertailupiste on Cathedral Square, Christchurchin ruutukaavan
historiallinen keskus** (spec-mantereet.md sääntö 4: kartan keskusta
valitaan historiallisen ytimen mukaan, ei hallinnollisen koordinaatti-
pisteen). Christchurchissä tämä on erityisen selkeä valinta: koko
kaupungin 1850 Black Map -ruutukaava suunniteltiin nimenomaan katedraalin
ja aukion ympärille (ks. K1, H3), eikä Wikipedian pääartikkeli edes anna
erillistä kaupunkipistettä (infobox käyttää placeholderia
`{{Coord|region:NZ}}`) — Cathedral Square on siis sekä historiallinen
että käytännön ainoa luonteva ankkuri.

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta vertailupisteestä |
|---|---|---|---|---|
| 1 | Cathedral Square (vertailupiste) | 43,53083°S 172,63639°I | "Cathedral Square, Christchurch" | (vertailupiste) |
| 2 | Christ Church Cathedral | 43,531°S 172,637°I | "Christ Church Cathedral, Christchurch" | ~0,05 km itään |
| 3 | Victoria Square, Christchurch | 43,52778°S 172,63528°I | "Victoria Square, Christchurch" | ~0,35 km pohjoiseen |
| 4 | New Regent Street | 43,52926°S 172,63872°I | "New Regent Street" | ~0,26 km koilliseen |
| 5 | Cardboard Cathedral | 43°31'56,1"S 172°38'34,3"I | "Cardboard Cathedral" | ~0,54 km itään |
| 6 | Christchurch Art Gallery | 43,53056°S 172,63111°I | "Christchurch Art Gallery" | ~0,43 km länteen |
| 7 | Canterbury Museum | 43,5309°S 172,6271°I | "Canterbury Museum, Christchurch" | ~0,75 km länteen |
| 8 | Hagley Park / Christchurch Botanic Gardens | 43,53°S 172,62°I | "Hagley Park, Christchurch" / "Christchurch Botanic Gardens" | ~1,32 km länteen |
| 9 | Riccarton Bush / Riccarton House | 43,52998°S 172,59744°I | "Riccarton, New Zealand" | ~3,14 km länteen |

Kahdeksan varsinaista kohdetta (rivit 1, 3–9, vertailupiste mukaan
lukien 1) täyttää pyydetyn 8–10 kohteen välin; rivi 2 (Christ Church
Cathedral) on niin lähellä vertailupistettä, että se voidaan kirjoittaja
harkintansa mukaan yhdistää vertailupisteen selitystekstiin sen sijaan
että se piirretään kartalle erillisenä pisteenä — kaksi pistettä 50
metrin päässä toisistaan eivät erotu kartalla toisistaan.

**Kaksi kauempana olevaa kohdetta, koordinaatit talteen mutta EI
taulukossa** (liian kaukana ydinklusterista, mutta kytkeytyvät suoraan
historia- ja luonto-nostoihin):

- **Lyttelton** (satama, jonne "Canterburyn pyhiinvaeltajat" saapuivat
  1850, K1-nosto), 43°36'0"S 172°43'12"I — n. 10,2 km kaakkoon
  vertailupisteestä. Kärsi myös pahoin vuoden 2011 järistyksessä
  (Timeball Station romahti kokonaan kesäkuun 2011 jälkijäristyksessä,
  entisöity 2018).
- **Ōnuku (marae) / Akaroa** (K4-nosto, vuoden 1998 anteeksipyynnön
  paikka), n. 43°48'15"S 172°58'00"I (Akaroan piste) — n. 40 km
  kaakkoon. Ōnuku-marae itse sijaitsee Akaroan välittömässä
  läheisyydessä, tarkkaa erillistä koordinaattia ei haettu tässä
  faktapohjassa.

Näitä kahta EI lasketa mukaan "8–10 kohteen" ydinklusteriin, koska ne
ovat kaupungin ulkopuolella eivätkä sovi samalle kohdekartalle
tiiviisti — kirjoittaja päättää, tarvitaanko niille mainintaa
leipätekstissä vai jätetäänkö kokonaan pois.

---

## 5. Kuva-aiheet (Commons-kategoriat)

Kategoriat tarkistettu OLEMASSA OLEVIKSI Commonsin
`action=query&titles=Category:...`-kutsulla (ja `list=search`-haulla
niille kolmelle, joiden ensimmäinen arvattu nimi ei osunut) 24.8.2026
— pelkkä olemassaolotarkistus, SISÄLTÖÄ EI ole silmäilty, se on
kirjoittajan työ kuvasääntöjen mukaisesti. Commons-haku osui
429-rajoitukseen useaan kertaan; odotin ja yritin uudelleen resepti
mukaisesti.

**Avauskuvat (3):**
1. `Category:Christchurch Central City` — laaja katunäkymä tai
   ilmakuva keskustasta.
2. `Category:Cathedral Square, Christchurch` — ruutukaavan sydän,
   mahdollisesti Cardboard Cathedral tai katedraalin nykytila
   näkyvissä.
3. `Category:Hagley Park, Christchurch` — puutarhakaupungin
   maisemakuva.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Christchurch` — kaupungin siluetti tai Avon-joen
   näkymä keskustaan.
2. `Category:Christ Church Cathedral, Christchurch` — koko rakennuksen
   nykytila (huom: valitse kuva joka näyttää nykyisen tilan asiallisesti,
   ei raunioita — resepti sallii tuoreet vauriokuvat mutta lehden pitää
   kertoa lukijalle selkeästi miksi rakennus näyttää siltä miltä
   näyttää).
3. `Category:2011 Canterbury earthquake` — TARKISTA huolella: tämä
   kategoria sisältää sekä ennallistamiskuvia että vaurioita; valitse
   neutraali, ei-järkyttävä kuva (esim. tyhjä keskusta-alue tai
   jälleenrakennustyömaa) resepti-ohjeen "LINJAUSMUUTOS 20.8.2026"
   mukaisesti.

**Nosto-/jaksokuvat, sivuittain:**

*Kaupunki:*
- `Category:Christ Church Cathedral, Christchurch` (K1, alkuperäinen
  rakennussuunnitelma/vanha kuva)
- `Category:Ngāi Tahu` (K2, K4 — nykykulttuuria, EI historiallista
  kurjuuskuvastoa; tarkista erikseen ettei kuvissa ole tunnistettavia
  kasvoja ilman lupaa)
- `Category:Trams in Christchurch` (K3, pyöräily-nosto ei löytänyt
  suoraa kategoriaa — kirjoittajan kannattaa hakea myös
  `Category:Cycling in New Zealand` tai vastaavaa)

*Maanjäristykset ja jälleenrakennus:*
- `Category:2011 Canterbury earthquake` (H1, H2 — TARKISTA
  neutraalius, ks. yllä)
- `Category:Christ Church Cathedral, Christchurch` (H3 — ennallistamis-
  työmaan kuvat)
- `Category:Cardboard Cathedral` (H4)

*Luonto:*
- `Category:Christchurch Botanic Gardens` (L1)
- `Category:Avon River / Ōtākaro` (L2)
- `Category:Riccarton Bush` (L3)
- Osalle L4:ää (Gormley-patsas joessa) ei löydetty erillistä
  Commons-kategoriaa tässä koosteessa — kirjoittajan pitää hakea
  esim. `Category:Stay (Gormley sculpture)` tai vastaavaa erikseen.

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:Victoria Square, Christchurch`
- `Category:New Regent Street`
- `Category:Canterbury Museum`
- `Category:Christchurch Art Gallery`
- `Category:Lyttelton, New Zealand`

---

## 6. Säätiedot

Ks. osio 3, Jakso 5 — samat luvut, sama lähde (en-Wikipedian
Climate-osio, EI ERA5).

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Vahvin löytämäni yksittäinen 1873-osuma on ChristChurch-katedraalin
   rakennustyön uudelleenkäynnistys arkkitehti Benjamin Mountfortin
   johdolla juuri vuonna 1873** (H3) — kymmenen vuoden rahapula-
   pysähdyksen jälkeen. Tämä on poikkeuksellisen vahva "isoisän
   matkan vuosi" -kulma, koska se ei ole yksittäinen tapahtumapäivä
   vaan koko myöhemmän katedraalin (ja siten koko kaupungin
   tunnetuimman maamerkin) rakennushistorian käännekohta. Suosittelen
   pitämään tämän historia-sivun avausnostona tai vähintään
   voimakkaasti esillä.
2. **Vuoden 2011 järistyksen magnitudi esitetään en-Wikipediassa kahdella
   eri tavalla.** "2011 Christchurch earthquake" -artikkelin infobox
   antaa 6,2 Mw (GCMT-lähde) / 6,1 Mw (USGS-lähde), mutta saman
   artikkelin ja "Christ Church Cathedral, Christchurch" -artikkelin
   leipäteksti kutsuu järistystä toistuvasti "6,3 magnitudin"
   järistykseksi. Käytin nostoissa leipätekstin lukua 6,3, koska se
   toistuu useammassa artikkelissa ja on yleisemmin käytetty; kirjasin
   ristiriidan tähän eksplisiittisesti reseptin ennakkotapausten
   mukaisesti (v925, v932, v937 -tyyppinen tilanne, mutta tässä kyse ei
   ole koordinaateista vaan kahdesta eri magnitudilähteestä samassa
   infoboxissa).
3. **"2010 Canterbury earthquake" -pääartikkeli ja "Christchurch"
   -pääartikkeli ovat lievässä ristiriidassa syyskuun 2010 järistyksen
   kuolonuhrien suhteen.** Christchurch-pääartikkeli sanoo syyskuun
   2010 järistyksen aiheuttaneen "widespread damage... but no direct
   fatalities" (H1-tekstin lähialueella), kun taas oma dedikoitu
   artikkeli "2010 Canterbury earthquake" sanoo selvästi "2 dead, over
   1,700 injured" sekä infoboxissa että leipätekstissä ("At least two
   people died"). Käytin H1-nostossa dedikoidun artikkelin tarkempaa
   ja toistuvaa lukua (kaksi kuoli), koska se on yksityiskohtaisempi
   lähde samasta tapahtumasta.
4. **Hagley Parkin perustamisvuosi vaihtelee saman artikkelin sisällä
   yhdellä vuodella:** infobox antaa `created = 1856`, mutta leipäteksti
   sanoo puiston olleen "established in 1855 by the Provincial
   Government". Käytin L1-nostossa leipätekstin tarkempaa vuotta 1855.
   Pieni, ei-merkittävä ristiriita, mutta kirjattu tähän täydellisyyden
   vuoksi.
5. **Perämangki-tyyppistä toista alkuperäiskansaa ei löytynyt.** Toisin
   kuin Adelaidessa (jossa kaurnojen rinnalla oli myös perämangkit),
   Christchurchin lähialueella ei en-Wikipedian mukaan ole toista,
   erillistä iwiä samalla tavalla — kāi tahu (aiemmin waitaha ja kāti
   māmoe, jotka sulautuivat siihen) on koko Canterburyn ja käytännössä
   koko Eteläsaaren alueen tunnustettu iwi. Pilari 3:n vaatimus
   täyttyy siis kāi tahun oman, elävän nykyhallinnon (Te Rūnanga o
   Ngāi Tahu, K4) kautta eikä usean rinnakkaisen kansan kautta.
6. **Kahdeksan varsinaista kohdekartan kohdetta on tiiviisti klusteroitu
   (0,05–3,14 km vertailupisteestä), mikä poikkeaa hieman
   Adelaide-mallista** (jossa etäisyydet olivat 0,07–1,79 km).
   Riccarton Bush (3,14 km) on kauimmainen, mutta silti selvästi
   kaupungin sisällä eikä esikaupunkien ulkopuolella — pidin sen
   ydinlistassa L3-noston painoarvon vuoksi.
7. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
   tekstiksi** merkkimäärävaatimusten mukaan (johdannot 204–228 mrk,
   nostot 504–655 mrk) ja tarkistettu koneellisesti Python-skriptillä.
8. **Kulttuurivisan (`oceania-questions.js`, kohta `christchurch`)
   vastauksia ei ole toistettu sanasta sanaan nostoissa, mutta ne
   LÖYTYVÄT lehden teksteistä VISASÄÄNNÖN mukaisesti:**
   - Kysymys 1 (Eteläsaari, järistykset 2010–2011): vastaus löytyy
     intro-kaupunki-tekstistä (Eteläsaari ei mainita eksplisiittisesti
     tässä faktapohjassa — kirjoittajan HUOMIOITAVA lisätä maininta
     "Eteläsaaren suurin kaupunki" esim. kaupunki-sivun johdantoon tai
     matkaoppaan jaksoon 1, jossa se jo onkin) sekä H1/H2-nostoista
     (järistykset).
   - Kysymys 2 (Eteläiset Alpit, Aoraki yli 3 700 m, läntinen rinne
     sateisin/itäinen kuiva): vastaus on matkaoppaan jaksossa 2 —
     TARKISTETTU, ettei sanamuoto toista visan fact-kenttää suoraan
     (visa: "Läntinen rinne on maailman sateisimpia paikkoja, itäinen
     taas kuivaa lakeutta"; oma tekstini: "läntinen rinne saa
     moninkertaisesti enemmän sadetta kuin itäinen puoli").
   - Kysymys 3 (Canterburyn tasanko, tärkein maatalousalue): vastaus
     matkaoppaan jaksossa 2.
   - Kysymys 4 (2011 järistys tuhosi keskustan, uudelleenrakennettu
     matalammaksi/joustavammaksi): vastaus H2- ja H3-nostoissa sekä
     H4:ssä (uudet, matalammat rakennukset kuten Pahvikatedraali ja
     Te Kaha). Visan fact-kenttä mainitsee eksplisiittisesti "matalammaksi
     ja joustavammaksi" — omissa teksteissäni käytän eri sanamuotoja
     (esim. "50 vuotta kestäväksi suunniteltu", "uudet, matalammat
     rakennukset") ja tuon lisäyksityiskohtia (kustannusarviot,
     päivämäärät), joita visan fact-kentässä ei ole.
   - Kysymys 5 (puutarhakaupunki, Avonjoen puistot, puistovene/melonta):
     vastaus L1- ja L2-nostoissa sekä luonto-sivun johdannossa.
     Melontaa/puistovenettä ei ole erikseen mainittu tässä faktapohjassa
     — kirjoittajan kannattaa tarkistaa `Avon Punting`-tieto (L2-noston
     lähdeartikkelissa "Avon River / Ōtākaro" on oma Punting-osio
     kaupallisesta joenvenepalvelusta), joka sopisi hyvin joko L2-nostoon
     tai matkaoppaan jaksoihin.
   - `OCEANIA_FACTS.christchurch`-rivit (Eteläsaaren suurin kaupunki +
     järistykset; Eteläiset Alpit lännessä; Canterburyn lakeus; isoisän
     repliikki englantilaisesta kaupungista vuorten alla) ovat kaikki
     yleistasoisia yhteenvetoja, joita tämän faktapohjan nostot
     syventävät uusilla yksityiskohdilla (tarkat päivämäärät, luvut,
     nimet) toistamatta niiden sanamuotoa.
9. **Vain en-Wikipediaa ja sen raakatekstiä (action=raw) käytetty
   kaikkiin faktoihin**, paitsi Commons-kategorioiden
   olemassaolotarkistukseen (osio 5), joka käytti Commonsin
   `action=query`- ja `list=search`-rajapintoja vain kategorianimien
   vahvistamiseen — EI kuvasisällön tarkistamiseen. Ei ulkopuolisia
   hakuja tämän faktapohjan sisältöön.
10. **`docs/mantereet-tyoaineisto/spec-mantereet.md` oli tehtävänannon
    lukulistalla** ja sen Oseania-osio sekä kaikkia kolmea uutta
    mannerta koskevat viisi linjausta (mm. sääntö 4 kohdekartan
    ytimestä, sääntö 5 katastrofien käsittelystä) on sovellettu
    suoraan tähän faktapohjaan.
