# Kapkaupunki — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `kapkaupunki`, maa ZAF, en-Wikipedia
"Cape Town". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **6.9.2026**. Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`, `docs/mantereet-tyoaineisto/
spec-mantereet.md` ja `docs/tyolista-opukselle.md` (paketti O9,
ETUSIVUKUVAN KAAVA, kustannussääntö). Esikuvana `faktapohja-denver.md`.

Luetut lähdeartikkelit (en-Wikipedia, 6.9.2026): **"Cape Town"**,
**"History of Cape Town"**, **"Table Mountain"**, **"Bo-Kaap"**,
**"Cape Malays"**, **"Arabic Afrikaans"**, **"Abu Bakr Effendi"**,
**"Castle of Good Hope"**, **"Company's Garden"**, **"Robben
Island"**, **"District Six"**, **"District Six Museum"**, **"Kaapse
Klopse"**, **"Greenmarket Square"**, **"Slave Lodge, Cape Town"**,
**"Cape Town City Hall"**, **"Iziko South African Museum"**,
**"V&A Waterfront"**, **"Rust en Vreugd"**, "Cape Town railway
station".

Kaupungin visa on luettu tiedostosta `js/packs/africa-questions.js`
(avain `kapkaupunki`, viisi kysymystä: Pöytävuori, Robben Island ja
Mandela, lainsäädännöllinen pääkaupunki, pöytäliinapilvi ja
kaakkoistuuli, fynbos). Kaikki viisi aihetta esiintyvät tässä
faktapohjassa, koska ne ovat kaupungin ydintarinaa — resepti vaatii,
että visan vastaus löytyy lehden teksteistä. **Minitehtävä ei siis saa
kysyä yhtään näistä viidestä.** Ehdotus osiossa 7.

Olemassa olevat lohkot on luettu ristiriitojen varalta:
- `js/packs/africa-saapumiset.js` (`kapkaupunki`): Pöytävuori näkyy
  merelle tuntikausia ennen satamaa, pilvi valuu laen yli, isoisä
  täydentää vesitynnyrit vuoren juurella. **Ei ristiriitaa** — ja
  1873-kehys on jo oikein: Kapkaupunki oli isoisän aikaan Intian-reitin
  vesitäydennysasema ja siirtomaan pääkaupunki.
- `js/packs/africa-valokuvat.js` (`kapkaupunki`): ennen–nyt-pari on
  valmis (Adderley Street n. 1900 / sama katu nykyään) ja lisäkuvissa
  ovat Rijksmuseumin satamakuva n. 1870, pöytäliinapilvi ja
  Hyväntoivonniemi. Nämä tiedostonimet ovat varattuja, eikä lehti saa
  käyttää niitä uudelleen.
- `js/packs/africa-kulttuuri.js` (`kapkaupunki`): Bo-Kaapin värit,
  Cape jazz (Abdullah Ibrahim) ja braai. Lehden nostot eivät saa
  toistaa näitä samoilla kuvatiedostoilla.
- `js/packs/africa-artikkelit.js` (`Kapkaupunki`): lyhyt intro ja
  kolmiosainen artikkeli. **Intro on kasvatettava 7–10 virkkeeseen**
  (resepti, TEKSTIREMONTTI 20.8.2026).

**1873-KEHYS (omistajan tilaus 6.9.2026):** Kapkaupunki oli isoisän
matkavuonna Kapin siirtomaan pääkaupunki ja Intian-reitin tärkein
satama. Vastuullinen hallinto oli saatu läpi **vasta edellisenä
vuonna 1872**: siirtomaa sai oman, paikallisesti vastuullisen
pääministerin, kun parlamentti oli ollut olemassa jo 1854 lähtien.
Timantit oli löydetty Griqualand Westistä **1867**, ensimmäinen
rautatie oli rakennettu **1859** ja rataverkko laajeni nopeasti
1870-luvulla. Aallonmurtajan rakentaminen oli alkanut **1860**
(vuoden 1858 talvimyrskyt olivat tuhonneet yli 30 alusta ja Lloyd's
oli kieltäytynyt vakuuttamasta Taffelinlahdessa talvehtivia laivoja).
Orjuus oli lakkautettu siirtomaassa **1833/1834**. Kultaa
Witwatersrandilta ei vielä ollut (1886), Johannesburgia ei ollut
olemassa, eikä Robben Island ollut poliittinen vankila vaan
**spitaalisiirtola** (siirrot alkoivat 1845). Köysirata avattiin
vasta 1929, kaupungintalo 1905. Kirjoittaja EI saa sijoittaa näitä
isoisän aikaan.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Kapkaupunki"

**Johdanto (ehdotus, n. 250 merkkiä):**

> Kapkaupunki on rakennettu Pöytävuoren, Leijonanpään ja
> Paholaisenhuipun muodostamaan kulhoon meren rannalle. Se alkoi
> laivojen huoltoasemana 1652, ja isoisän matkavuonna 1873 se oli
> siirtomaan pääkaupunki, jonka satamasta lähti kaikki timanteista
> viiniin.

### Sivu B — teemasivu, ehdotettu id `luonto`, nimi "Pöytävuori"

**Perustelu:** `luonto` on vakioaihe (`AIHE_IKONIT`, js/ui-apurit.js),
eikä uusia sivu-id:itä tehdä. Aihe kantaa oman sivunsa: vuoren
syntytapa (syvennysvuori eli synkliini), pöytäliinapilvi, fynbos ja
Kapin kasvimaailma, Maclearin kiviröykkiö ja maapallon kaarevuuden
mittaus sekä kahden meren lämpötilaero.

---

## 2. Kaupunkisivun nostot (4 kpl, 440–660 merkkiä)

### K1 — ǁHui ǃGais, paikka ennen yhtiötä

- Saksalainen antropologi **Theophilus Hahn** kirjasi alueen
  alkuperäisen nimen muotoon **ǁHui ǃGais**, khoen kielen toponyymi,
  merkitys "*where clouds gather*" ("History of Cape Town", johdanto).
- Alueella asui khoe- ja san-kansoja, enimmäkseen puolikiertelevästi.
  Lähde erittelee: itsenäiset khoe-karjanviljelijät, **ǁAmmaqua**
  ("Watermans") -kauppiaat, **Sonqua**-siimakalastajat (san-haara) ja
  sisämaan **Ubiqua**-paimenmetsästäjät.
- Kun eurooppalaiset purjehtivat Taffelinlahteen, hallitseva paikallinen
  ryhmä olivat **!Uriǁʼaekua** ("Highclansmen", hollantilaisittain
  kirjoitettuna *Goringhaiqua*). Sama klaani on nykyisten
  **!Ora**-kansojen kantaväestöä ("Table Mountain", History).
- Khoekhoe-nimi Pöytävuorelle: **Huriǂ'oaxa**, "ocean-emerging
  (mountain)" ("Table Mountain"). "History of Cape Town" antaa muodon
  **Hoeri 'kwaggo** ("sea mountain") ja liittää sen khoi-asukkaisiin.
  → RISTIRIITA, ks. tarkistus.
- **Proto-satama:** merenkulkuarkistot osoittavat, että vuosina
  1600–1652 vähintään **1 070 laivaa** pysähtyi Kapissa menomatkalla.
  ǁAmmaqua kävi kauppaa lihalla, vedellä, suolalla ja puutavaralla.
  Raven-Hart: vuosina **1601–1608** ǁAmmaqua myi neljälle laivalle
  **1 839 lammasta ja 149 nautaa**. 1630- ja 1640-luvulla eurooppalaisia
  oli Kapissa jo puolipysyvästi, ja ǁAmmaqua perusti pysyvän
  kauppapaikan **Camissa-joen** varteen ja tarjosi myös
  sairaanhoitopalveluja ("History of Cape Town").
- 1510 **Salt Riverin taistelu**: portugalilainen amiraali Francisco de
  Almeida ja 64 hänen miestään kaatuivat, kun goringhaiqua-klaani
  torjui heidät — käyttäen karjaa, joka oli koulutettu vastaamaan
  vihellyksiin ja huutoihin ("Cape Town", Early period).

### K2 — Puutarha, joka ruokki laivat

- **6.4.1652** Jan van Riebeeckin kolmen aluksen retkikunta laski
  maihin. VOC:n tehtävä: pysyvä huoltoasema Itä-Intian-reitille.
- **29.4.1652** mestaripuutarhuri ja vapaaporvari **Hendrik Boom**
  valmisti ensimmäisen kylvömaan ("Company's Garden").
- Ensimmäiset kasvit: salaattiyrtit, herneet, isot pavut, retiisi,
  punajuuri, pinaatti, vehnä, kaali, parsa, nauris. **1653** mennessä
  siirtokunta ruokki itsensä ympäri vuoden; **1656** lisämaata
  Rondeboschista. **1658** mennessä puutarhassa kasvatettiin lähes
  jokaista Euroopan ja Intian puutarhakasvia — perunaa ja maissia ei
  vielä ollut.
- Vesi johdettiin **Fresh Riveristä (Camissa)** kanavia pitkin
  kasteluun ("History of Cape Town", 1652).
- **Työvoimapula** johti orjien tuontiin Indonesiasta ja
  Madagaskarilta ("Cape Town", Dutch period). Ensimmäinen suuri erä,
  **402 orjuutettua ihmistä**, tuotiin 1658 nykyisen Beninin ja Angolan
  alueelta; vuoden 1657 lopussa heitä oli ollut 20. Siitä lähtien
  ei-eurooppalaisia siirtolaisia oli Kapissa enemmän kuin
  eurooppalaisia ("History of Cape Town").
- **1754** väkiluku 5 510 eurooppalaista ja 6 729 orjaa.
- Nykyään Company's Garden on Etelä-Afrikan **vanhin puutarha** ja
  kansallinen perintökohde; se kastellaan Molteno-padon vedellä, joka
  tulee Pöytävuoren alarinteiden lähteistä. Puistossa kasvaa
  Etelä-Afrikan **vanhin viljelty päärynäpuu (n. 1652)**.

### K3 — 1873: satama, timantit ja oma hallitus

- **1833** orjuus lakkautettiin siirtomaassa; kaupungissa vapautui yli
  **5 500 orjaa**, lähes kolmannes kaupungin silloisesta väestöstä
  ("Cape Town", British period). "History of Cape Town" antaa koko
  siirtomaan luvuksi **n. 39 000** ja vuodeksi **1834**.
- **1854** Kapin siirtomaa valitsi ensimmäisen parlamenttinsa
  ei-rodullisen **Cape Qualified Franchise** -äänioikeuden pohjalta.
- **1872** siirtomaa sai vastuullisen hallinnon: oikeuden valita oma,
  paikallisesti vastuullinen toimeenpaneva valta ja pääministeri.
  Seurasi voimakkaan talouskasvun kausi ja **Cape Government
  Railwaysin nopea laajentuminen** sisämaahan.
- **1859** rakennettiin ensimmäinen rautatielinja (Cape Government
  Railways); rataverkko laajeni nopeasti **1870-luvulla**.
- **1867** timanttilöytö Griqualand Westissä ja **1886**
  Witwatersrandin kultaryntäys toivat maahanmuuttoaallon.
- Satama: kesäkuun **1858** talvimyrskyt tuhosivat yli **30 alusta**,
  ja Lloyd's kieltäytyi vakuuttamasta Taffelinlahdessa talvehtivia
  laivoja. **17.9.1860** kadetti prinssi Alfred, kuningatar Viktorian
  toinen poika, kaatoi ensimmäisen kivikuorman aallonmurtajaan.
  Alfred-allas ja sen jälkeen Victoria-allas rakennettiin **1860–1920**
  ("V&A Waterfront").
- **1891–1901** kaupungin väkiluku yli kaksinkertaistui 67 000:sta
  171 000:een.
- **1895** avattiin ensimmäinen julkinen voimalaitos, Graaff Electric
  Lighting Works.

### K4 — Bo-Kaap ja arabialainen afrikaans

- **1760** Jan de Waal osti maapalstan Signal Hillin juurelta Dorp- ja
  Wale-katujen väliltä, laajensi sitä vuotta myöhemmin, ja alkoi
  **1763** rakentaa pieniä vuokrataloja (*huurhuisjes*), jotka hän
  vuokrasi orjilleen. Ensimmäiset kolme: 71 Wale Street (nykyään
  Bo-Kaap Museum), Buitengracht Streetin yläpuolella ja 42 Leeuwen
  Street ("Bo-Kaap").
- Alueelle muutti taitavia muslimikäsityöläisiä (**Mardijkers**)
  Kaakkois-Aasiasta. Ensimmäinen moskeija **Auwal Mosque** Dorp
  Streetillä **1794**; **1804** perustettiin **Tana Baru**
  -hautausmaa. **Nurul Islam** -moskeija 1844.
- Vapautumisen (**1834**) jälkeen rakennettiin runsaasti kapeita ja
  syviä vuokrataloja vapautuneille orjille.
- **SAHRAn mukaan alueella on Etelä-Afrikan suurin ennen vuotta 1850
  rakennetun arkkitehtuurin keskittymä**, ja se on Kapkaupungin vanhin
  säilynyt asuinkortteli. Väestöstä 56,9 % on muslimeja.
- **VÄRIT:** lähde sanoo kaksi asiaa peräkkäin: kirkkaat julkisivut
  *"are attributed to an expression of freedom by the new homeowners,
  as all the houses were painted white while on lease"*, MUTTA
  *"it appears that the tradition of brightly coloured homes began in
  the late 20th century, rather than earlier"* ("Bo-Kaap"). → Tämä on
  kirjoitettava auki; `africa-kulttuuri.js`:n nykyinen nosto väittää
  värien olleen vapauden merkki. Ks. tarkistus.
- **1966** osa alueesta julistettiin kansallismonumentiksi;
  **toukokuussa 2019** 19 kohdetta sai kansallisen perintökohteen
  aseman.
- **Arabialainen afrikaans** (*Arabies Afrikaans*): afrikaansia
  kirjoitettuna persialais-arabialaisella kirjaimistolla. Alkoi
  **1830-luvulla** Kapkaupungin madrasoissa. Se on **ainoa
  germaaninen kieli**, jota tiedetään kirjoitetun tällä kirjaimistolla
  (paitsi eräs 1500-luvun saksankielinen käsikirjoitus). Tekstejä on
  säilynyt **74**; vanhin on **1845** ("Hidyat al-Islam", lähdekäsikirjoitus
  kadonnut), vanhin säilynyt käsikirjoitus on imaami **Abdul-Kahhar ibn
  Abdul-Malikin 1868**. 36 kirjainta.
- **Abu Bakr Effendi** (n. 1814 – 29.6.1880), osmanien qadi, jonka
  sulttaani **Abdulaziz lähetti kuningatar Viktorian pyynnöstä**
  Kapin siirtomaahan. Keisarillinen määräys 3.9. tai 3.10.1862;
  matka Lontoon ja Liverpoolin kautta, merimatka 44 vuorokautta, ja
  **saapuminen Kapiin 17.1.1863**. Opetti hanafilaista koulukuntaa
  (Kapissa opetettiin siihen asti shafi'ilaista), perusti madrasoja ja
  toi **fessin** miesten päähineeksi. Hänen teoksensa **Bayân al-Dîn**
  (1877) käännettiin afrikaansiksi; "Arabic Afrikaans" ajoittaa hänen
  version vuoteen **1869** ja nimeää sen *Uiteensetting van die
  Godsdiens*. → RISTIRIITA, ks. tarkistus.

---

## 3. Teemasivun nostot (4 kpl) — Pöytävuori

### L1 — Vuori, joka oli laakson pohja

- Pöytävuoren tasainen laki johtuu siitä, että se on **synkliinivuori**:
  se oli aikoinaan laakson pohja. Poimun huippu (antikliini) oli idässä
  ja on kulunut pois yhdessä pehmeämmän Malmesburyn liuskeen ja
  graniittiperustan kanssa — siitä syntyi **Cape Flats**, kannas joka
  yhdistää Kapin niemimaan mantereeseen ("Table Mountain", Geology).
- Ylin n. 600 m koko kilometrin korkuisesta pöytävuoresta on
  **450–510 miljoonaa vuotta vanhaa** (ordoviikki) Kapin poimuvuorten
  kahta alinta kerrosta. Ylempi ja nuorempi on erittäin kova
  kvartsiittinen hiekkakivi ("Table Mountain Sandstone", nykyisin
  Peninsula Formation Sandstone), alempi **70 m** paksu **Graafwater
  Formation** viininpunaisine mutakivineen.
- Ylätasanko on **noin 3 km** laidasta laitaan, ja sitä reunustavat
  jyrkät kalliot. Idässä Devil's Peak, lännessä Lion's Head. Yhdessä
  Signal Hillin kanssa ne muodostavat **City Bowlin** luonnollisen
  amfiteatterin.
- Korkein kohta on **Maclear's Beacon**, 1 086 m; se on n. 19 m
  korkeammalla kuin läntisen pään köysiradan asema.
- **Platteklip Gorge** halkaisee kalliot ja on ollut reitti laelle siitä
  asti, kun **António de Saldanha** nousi ensimmäisenä kirjatusti
  vuorelle **1503** ja nimesi sen *Taboa do Cabo*.

### L2 — Pöytäliina ja Kapin lääkäri

- **Pöytäliina** (*tablecloth*, afrikaansiksi *Karos*) on
  orografinen pilvi: kaakkoistuuli nostaa kostean ilman vuoren rinnettä
  ylös kylmempään ilmaan, jossa kosteus tiivistyy. Kansantarina liittää
  ilmiön Paholaisen ja Van Hunks -nimisen merirosvon
  tupakanpolttokilpailuun ("Table Mountain").
- Kevään ja kesän voimakas kaakkoistuuli tunnetaan nimellä **Cape
  Doctor**, koska se puhaltaa ilmansaasteet pois. Sen syy on
  Etelä-Atlantin pysyvä korkeapaine (South Atlantic High), joka siirtyy
  auringon mukana vuodenaikojen mukaan.
- Kapkaupunki saa **noin 3 100 tuntia aurinkoa vuodessa**.
- Ilmasto on kuumakesäinen välimerenilmasto (Köppen Csa). Talvi
  kesä–syyskuu: keskimääräinen ylin **18 °C**, alin **8,5 °C**. Kesä
  joulu–maaliskuu: ylin **26 °C**, alin **16 °C**. Vuosisade
  kaupungissa **515 mm**, mutta eteläisissä esikaupungeissa vuorten
  lähellä lähes **1 000 mm**. Lunta ja hallaa ei ole muualla kuin
  vuorten huipuilla. Ukkosia on vähän.
- **Kaksi merta, kaksi lämpötilaa:** Atlantin puolen rannikon
  pintaveden vuosikeskiarvo on **10–13 °C**, False Bayn **16–17 °C**.
  Kesällä False Bay yli 20 °C, ajoittain 22 °C. Ero syntyy Kapin
  niemimaalta alkavan **Benguelan virran** nostovedestä.

### L3 — Kaksituhatta kasvia yhdellä vuorella

- Pöytävuorella on **2 285 kasvilajia**, joista noin **80 % on
  fynbosia** (afrikaansia, "hieno pensaikko"). Näistä **1 500 kasvaa
  57 km²:n alalla**, jonka muodostavat Pöytävuori ja Back Table — yhtä
  monta lajia kuin koko Yhdistyneessä kuningaskunnassa.
- "Cape Town" -artikkeli: Pöytävuorelle rajoittuu arviolta **2 200
  kasvilajia**, kun koko Yhdistyneessä kuningaskunnassa on 1 200 lajia
  ja 67 kotoperäistä. → RISTIRIITA lukujen 2 285 / 2 200 välillä, ks.
  tarkistus.
- Päävyöhyke on uhanalainen **Peninsula Sandstone Fynbos**; pieninä
  laikkuina äärimmäisen uhanalaista Peninsula Granite Fynbosia,
  Peninsula Shale Renosterveldiä ja afromontaanista metsää.
- Fynbos on **tuleen sopeutunut** kasvillisuus: säännölliset kulot ovat
  hallinneet sitä vähintään 12 000 vuotta, ja **10–15 vuoden väli**
  suosii suuria proteoja. Vasco da Gama nimesi rannikon **1495**
  *Terra de Fume*, savujen maa, näkemiensä tulien takia.
- Kaupungin alueella on **19 kasvillisuustyyppiä**, yli **300
  uhanalaista kasvilajia** ja **13 jo hävinnyttä**. Kapin niemimaalla
  on maailman suurin uhanalaisten lajien tiheys mantereisella
  vastaavan kokoisella alueella.
- **Kirstenbosch** on 36 hehtaarin kansallinen kasvitieteellinen
  puutarha; viljelyssä yli **7 000 lajia**. Kapin kasvimaailma-alue,
  Kirstenbosch mukaan lukien, julistettiin Unescon maailmanperinnöksi
  **2004**.
- Yleisin nisäkäs vuorella oli **tamaani** (afrikaansiksi *dassie*),
  mutta kanta romahti n. 2000–2004 tuntemattomasta syystä. Viimeinen
  leijona ammuttiin alueella **n. 1802**; leopardit hävisivät
  paikallisesti ehkä 1920-luvulla. Kalliolla pesii **kalliokotka**
  (Verreaux's eagle).

### L4 — Maclearin kiviröykkiö

- **Maclear's Beacon** on kiviröykkiö, jonka **Sir Thomas Maclear**
  rakensi **1865** kolmiomittausta varten. Se on **1 086 m** (kyltin
  teksti sanoo 1 084 m — ks. tarkistus).
- **1750** Abbé Nicolas Louis de Lacaille mittasi meridiaanikaaren
  Kapkaupungista pohjoiseen määrittääkseen maapallon muodon ja päätteli
  kaarevuuden olevan eteläisillä leveysasteilla pienempi kuin
  vastaavilla pohjoisilla — eli maapallon olisi ollut päärynän
  muotoinen, pullistuma päiväntasaajan eteläpuolella.
- **1820** Sir George Everest kävi Kapissa, tarkasti Lacaillen
  mittauspaikan ja esitti Maclearille, että **Pöytävuoren
  massanvetovoima** oli voinut vääristää mittauksen. Kun tämä otettiin
  huomioon, Maclear osoitti eteläisen pallonpuoliskon kaarevuuden
  olevan **sama** kuin pohjoisen ("Table Mountain", kuvateksti
  File:Maclear's Beacon text.jpg).
- Muut vuoren rakenteet: **1796** kenraalimajuri Sir James Craig
  rakennutti kolme vartiotaloa (King's, Duke of York / myöh. Queen's,
  Prince of Wales); näistä King's blockhouse on yhä hyvässä kunnossa.
  **1896–1907** Back Tablelle avattiin viisi patoa (Woodhead,
  Hely-Hutchinson, De Villiers, Alexandria, Victoria).
- **Köysirata:** rakennusurakka annettiin **1926** leipzigilaiselle
  Adolf Bleichert & Co:lle, ja rata avattiin **4.10.1929**. Alempi
  asema on 302 m, ylempi 1 067 m. Peruskorjaukset 1958, 1974 ja
  1996–1997; **Rotair**-gondolissa (Garaventa AG – CWA) kapasiteetti
  nousi 20:stä **65 matkustajaan** ja lattia pyörii 360°.
- **Marraskuussa 2011** Pöytävuori valittiin yhdeksi
  New7Wonders of Nature -kohteista. Table Mountain National Park on
  Etelä-Afrikan käydyin kansallispuisto, **4,2 miljoonaa kävijää
  vuodessa**. Puiston julisti **Nelson Mandela 29.5.1998**
  (Cape Peninsula National Park, myöhemmin nimetty uudelleen).

---

## 4. Kohdekartta

**Rajausehdotus:** pohjoinen −33,8990, etelä −33,9320, länsi 18,4060,
itä 18,4370 → n. **3,7 × 2,9 km**. Alue kattaa V&A:n satama-altaat
pohjoisessa, 1800-luvun ruutukaavan keskellä ja Company's Gardenin
museokorttelin etelässä. Pöytävuori jää ulkopuolelle tarkoituksella:
se on teemasivun aihe.

**Kahdeksan kohdetta (koordinaatit en-Wikipedian
`prop=coordinates&redirects=1` -rajapinnasta 6.9.2026), pohjoisesta
etelään:**

| # | Kohde | lat | lon |
|---|-------|-----|-----|
| 1 | V&A Waterfront | −33,903056 | 18,422778 |
| 2 | Greenmarket Square | −33,922222 | 18,420000 |
| 3 | Iziko Slave Lodge | −33,925060 | 18,420393 |
| 4 | Kapkaupungin kaupungintalo | −33,925278 | 18,423889 |
| 5 | Hyväntoivonlinnoitus | −33,925900 | 18,427800 |
| 6 | District Six -museo | −33,927723 | 18,423673 |
| 7 | Iziko Etelä-Afrikan museo | −33,928889 | 18,415000 |
| 8 | Rust en Vreugd | −33,930400 | 18,420500 |

Pienin väli on **kaupungintalo – District Six -museo 273 m**; kaikki yli 200
metrin säännön. Pudotetut ja perustelut tarkistuksen kohdassa E.

**Kohteiden faktat:**

1. **V&A Waterfront.** Sijaitsee eteläisen pallonpuoliskon vanhimman
   toimivan sataman paikalla; **123 hehtaaria**; Kapkaupungin
   käydyin matkailukohde. **1654**, kaksi vuotta saapumisensa jälkeen,
   van Riebeeck rakensi pienen laiturin. **1938** aloitettiin
   maantäyttö kaupungin ja sataman väliin (Duncan Dock); Foreshore
   (**230 ha**) mahdollisti kaupungin laajenemisen. ("Cape Town"
   antaa Foreshoren pinta-alaksi **194 ha** ja vuodeksi **1945** —
   ristiriita, ks. tarkistus.) **Marraskuussa 1988** perustettiin
   Victoria and Alfred Waterfront (Pty) Ltd Transnetin tytäryhtiöksi
   kehittämään historiallista satama-aluetta. Nykyään alueella on
   yli 450 liikettä, 13 hotellia, seitsemän museota ja 22
   historiallista maamerkkiä.
2. **Greenmarket Square.** Rakennettiin **1696**, kun aukiolle
   pystytettiin porvarivartion vahtitupa. Aukio kehittyi luonnostaan
   Company's Gardenin ja lähitilojen tuotteiden myyntipaikaksi; pian
   sillä myytiin myös muuta tavaraa ja **orjia**. **1761** vahtitupa
   purettiin ja tilalle rakennettiin **Old Town House**, joka toimi
   aikanaan kaupungintalona ja jossa on nyt **Michaelis-kokoelma**.
   1730-luvulla olkikattoiset talot alkoivat vaihtua tasakattoisiin;
   **1845** mennessä lähes kaikki yksikerroksiset oli korvattu.
   **1879** aukiolle rakennettiin Central Metropolitan Church.
   Aukio menetti asemansa, kun kaupungintalo valmistui **1905** ja
   kauppa siirtyi Grand Paradelle. **1950-luvulla** aukio muutettiin
   pysäköintialueeksi, **1961** se ja ympäröivät rakennukset
   julistettiin kansallismonumentiksi, ja **1980-luvun lopulla**
   parkkipaikka korvattiin käsityötorilla. Aukion keskellä on
   käsikäyttöinen pumppu, joka nostaa vettä kaupungin alla virtaavasta
   maanalaisesta joesta. Old Town Housen pääoven edusta on
   Kapkaupungin **historiallinen keskipiste**.
3. **Iziko Slave Lodge.** VOC rakensi **1679** majoittamaan
   orjuutettuja ihmisiä, jotka oli tuotu tekemään yhtiön töitä;
   aluksi tilaa oli **500 ihmiselle**, ja olot olivat
   yliasutut. Tulijat olivat Itä-Afrikasta, Madagaskarilta, Intiasta
   ja Kaakkois-Aasiasta, ja he tekivät maatalous-, rakennus- ja
   kotitaloustöitä. Rakennus lakkasi toimimasta orjakortteerina
   **1811** britti­hallinnon aikana; sen jälkeen se oli
   virastorakennus (**1811–1911**), **1854** siellä kokoontui
   ensimmäinen Kapin parlamentti, sitten korkein oikeus
   (**1911–1960-luku**), ja **1966** se kunnostettiin museoksi, joka
   avattiin **1967**. **1998** nimeksi tuli Slave Lodge Museum ja se
   liitettiin Iziko-museoihin. Yksi Kapkaupungin vanhimmista
   rakennuksista.
4. **Kapkaupungin kaupungintalo.** Edwardiaaninen rakennus **1905**,
   Grand Paraden laidalla linnoituksen länsipuolella. Rakennettu
   **Bathista Englannista tuodusta hunajanvärisestä oolittisesta
   kalkkikivestä**. Ajatus heräsi **1887** kuningatar Viktorian
   50-vuotisjuhlan yhteydessä; **1893** järjestettiin arkkitehtuurikilpailu,
   jonka voittivat **Harry Austin Reid ja Frederick George Green**.
   Urut rakensi Norman and Beard (Lontoo ja Norwich) Lontoon Pyhän
   Paavalin urkurin **Sir George Martinin** laatimien määritysten
   mukaan: **3 165 pilliä**, pisin 32 jalkaa, lyhin 3/4 tuumaa.
   Tornissa on tornikello, joka lyö tunnit ja soittaa
   Westminster-neljännekset; kellot valoi John Taylor & Co
   Loughboroughissa. Carillon asennettiin ensimmäisen maailmansodan
   muistomerkiksi, ja **1925** siihen lisättiin 22 kelloa.
   **11.2.1990**, tunteja vapautumisensa jälkeen, **Nelson Mandela**
   piti ensimmäisen julkisen puheensa kaupungintalon parvekkeelta.
   **24.7.2018** samalle parvekkeelle paljastettiin Mandelan patsas.
   Talo ei enää ole kaupungin virastotalo; se on nykyään
   kulttuuritapahtumien paikka ja Kapkaupungin filharmonikkojen
   pääsali.
5. **Hyväntoivonlinnoitus (Castle of Good Hope).** 1600-luvun
   viisikulmainen bastionilinnoitus, jonka VOC rakensi **1666–1679**;
   Etelä-Afrikan **vanhin säilynyt rakennus**. Se korvasi van
   Riebeeckin savesta ja puusta tekemän Fort de Goede Hopen (1652).
   Ensimmäinen kivi laskettiin **2.1.1666**. Linnoitus rakennettiin
   osin orjatyöllä: VOC pelkäsi paikallisten kapinaa eikä
   orjuuttanut heitä, vaan toi **jopa 60 000** orjuutettua ihmistä
   Madagaskarilta, Mosambikista, Hollannin Itä-Intiasta ja Intiasta.
   **26.4.1679** viisi bastionia nimettiin Oranian Vilhelm III:n
   arvonimien mukaan: Leerdam, Buuren, Katzenellenbogen, Nassau,
   Oranje. **1682** portti siirrettiin merenpuolelta nykyiselle
   paikalleen; **1684** portin päälle rakennettiin kellotorni.
   Alkuperäinen kello, Etelä-Afrikan vanhin, valettiin Amsterdamissa
   **1697** (valaja Claude Fremy), painaa runsaat **300 kg** ja
   kuului **10 kilometrin** päähän. Keltainen väri valittiin, koska
   se vaimensi auringon ja kuumuuden vaikutusta. Sisäpihalla on
   **De Kat -parveke**, alkuperäinen 1695, nykyinen muoto 1786–1790
   (suunnittelu Louis Michel Thibault, reliefit ja veistokset Anton
   Anreith). **1936** ensimmäisenä kohteena Etelä-Afrikassa
   suojeltu historiallisena monumenttina. Nykyään arkipäivisin klo 10
   pidetään **avainseremonia**, joka jäljittelee noin 300 vuoden
   takaista aamurutiinia. Ranskalainen kirjailija François-Timoléon de
   Choisy kuvasi paikkaa **kesäkuussa 1685** ja kertoi, että yli
   **25 VOC:n laivaa** pysähtyi vuosittain Kapissa täydentämään
   muonaansa.
6. **District Six -museo.** Vanhassa metodistikirkossa; perustettu
   **1994** (säätiö 1989) muistomerkiksi noin **60 000** asukkaan
   pakkosiirrolle. Museon lattialla on suuri kartta kaupunginosasta,
   johon entiset asukkaat ovat käsin merkinneet, missä heidän
   talonsa olivat. Kokoelmassa on vanhoja liikennemerkkejä,
   perheiden esineitä ja purkamista koskevia näyttelyitä. Yksi
   entisistä asukkaista on jazzmuusikko **Abdullah Ibrahim**
   (Dollar Brand). **2003** museo sai Alankomaiden **Prince Claus
   -palkinnon**. — Taustaksi: alue nimettiin kaupungin
   **kuudenneksi kunnallispiiriksi 1966**; se alkoi kasvaa orjuuden
   lakkauttamisen (1833) jälkeen ja siellä asui lähes kymmenesosa
   Kapkaupungin väestöstä. **11.2.1966** alue julistettiin
   valkoisten alueeksi, siirrot alkoivat 1968, ja **1970** nimi
   muutettiin Zonnebloemiksi. **17.12.2019** nimi District Six
   palautettiin virallisesti.
7. **Iziko Etelä-Afrikan museo.** Company's Gardenin laidalla
   Kapkaupungin keskustassa; kokoelmissa merkittävää afrikkalaista
   eläintieteellistä, paleontologista ja arkeologista aineistoa.
   Samalla tontilla on Etelä-Afrikan kansallisgalleria.
8. **Rust en Vreugd.** 1700-luvun kaupunkitalo Buitenkant Streetin
   varrella; nykyään museo, jossa on esillä **William Fehrin kokoelma**
   (Iziko). Talo on rokokoo-koristeineen yksi Kapkaupungin
   hienoimmista säilyneistä kaupunkiasunnoista, ja sen edustalla on
   1700-luvun tyyliin palautettu puutarha.

---

## 5. Matkaopas (nykytietoa)

- **Perille:** Cape Town International; Metrorailin lähijunaverkon
  neljä linjaa lähtevät Cape Town -asemalta Adderley- ja
  Strand-katujen varrelta; kaukojunat (Shosholoza Meyl) Johannesburgiin
  Kimberleyn kautta, Durbaniin ja East Londoniin. MyCiTi- ja Golden
  Arrow -bussit.
- **Vuori:** köysirata Tafelberg Roadilta (302 m → 1 067 m),
  gondoli pyörii 360°. Kävellen Platteklip Gorge, n. 2,5 tuntia,
  600 m nousua, ei varjoa. Muita reittejä: Skeleton Gorge ja Nursery
  Ravine Kirstenboschista, Kasteelspoort Camps Bayn yllä, Lion's Head.
  Sumu ja kylmyys voivat tulla yllättäen mihin vuodenaikaan tahansa.
- **Ruoka:** **bobotie** (mausteinen jauhelihavuoka munakuorrutuksella,
  1600-luvulta), **gatsby** (ranskanperunoilla täytetty pitkä
  voileipä, ensi kerran tarjolla **1976** Athlonen kaupunginosassa),
  **koe'sister** (kanelilla maustettu cape malay -leivonnainen,
  kookoshiutaleilla), **malvapuuding** ja **Cape Brandy Pudding**.
  Kapkaupunki on Etelä-Afrikan viiniteollisuuden koti — maan
  ensimmäinen viini pullotettiin kaupungissa, ja Groot Constantia ja
  Klein Constantia toimivat yhä. Kahvikulttuuri on vahva: maan neljän
  suurimman kahvilaketjun pääkonttorit ovat Kapkaupungissa ja
  kaupungissa on kymmenen paahtimoa.
- **Luonto lähellä:** Kirstenbosch (36 ha, yli 7 000 lajia),
  Table Mountain National Park (4,2 milj. kävijää),
  valaiden katselu elo–marraskuussa (eteläinen mustavalas ja
  ryhävalas; Brydenvalas ja miekkavalas ympäri vuoden),
  Heavisidendelfiini on alueen kotoperäinen laji.
- **Kulttuuri:** **Kaapse Klopse** eli Cape Town Minstrel Carnival
  **2. tammikuuta** (Tweede Nuwe Jaar); jopa **13 000** esiintyjää
  kirkkaissa asuissa, ghoema-rummut, sateenvarjot, cape jazz.
  Perinne juontuu ajasta, jolloin orjuutetut saivat vapaapäivän
  2. tammikuuta; orjuus lakkautettiin Kapissa virallisesti
  **1.12.1834**. Ensimmäinen kulkueryhmä arvioidaan järjestetyn
  **1887**. Festivaali tunnettiin apartheidin aikana nimellä
  "Coon Carnival"; nimi on nykyään laajalti loukkaavana pidetty ja
  viranomaiset ovat nimenneet tapahtuman uudelleen. Kasvojen
  mustaamisen jatkumisesta kiistellään.
- **Arkkitehtuuri:** maailman suurin **Cape Dutch** -rakennusten
  tiheys; tyyli yhdistää Alankomaiden, Saksan, Ranskan ja Indonesian
  perinteitä. Etelä-Afrikan ainoa kokonainen tuulimylly on
  **Mostert's Mill** Mowbrayssä (1796, kunnostettu 1935 ja 1995).
  Kapkaupunki oli **World Design Capital 2014**.
- **Hyvä tietää:** kaakkoistuuli (Cape Doctor) on kevään ja kesän
  hallitseva tuuli; Atlantin puolen meri on kylmä (10–13 °C) ja False
  Bayn lämmin (16–17 °C); talvi kesä–syyskuu on sadeaika;
  kaupunki koki ankaran vesipulan **2015–2018** ja puolitti
  vedenkulutuksensa (1,2 mrd litrasta päivässä helmikuussa 2015
  516 milj. litraan 2018, Oxfam).

---

## 6. Säärivi

Open-Meteon arkisto ei ollut käytettävissä tämän erän aikana
(vuorokausikiintiö). **Säärivi jätetään pois** (Samarkand-malli v965),
ja oppaan sääjakso nojaa en-Wikipedian Climate-osioon ja sanoo sen
ääneen. Luvut yllä osiossa L2.

---

## 7. Minitehtävä (teemasivu)

Visa kysyy jo Pöytävuoren muodon, Robben Islandin, lainsäädännöllisen
pääkaupungin, pöytäliinapilven synnyn ja fynbosin. Minitehtävä ei saa
toistaa niitä. **Ehdotus:**

> Miksi Maclearin kiviröykkiö rakennettiin Pöytävuoren laelle 1865?
> — oikea: mittaamaan maapallon kaarevuutta eteläisellä
> pallonpuoliskolla.

Vastaus löytyy teemasivun nostosta L4.

---

## 8. Avoimet kysymykset kirjoittajalle

1. Hoeri 'kwaggo vai Huriǂ'oaxa? (ks. tarkistus A)
2. 2 285 vai 2 200 kasvilajia? (ks. tarkistus B)
3. Bo-Kaapin värien ikä — miten sanotaan? (ks. tarkistus C)
4. Abu Bakr Effendin teoksen vuosi 1869 vai 1877? (ks. tarkistus D)
5. Foreshoren pinta-ala 194 ha vai 230 ha? (ks. tarkistus F)
