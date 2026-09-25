# Addis Abeba — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `addisabeba`, maa ETH, en-Wikipedia
"Addis Ababa". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Mitat ja malli luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/agentin-yhteiset-saannot.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`, `docs/mantereet-tyoaineisto/
spec-mantereet.md` ja `docs/tyolista-opukselle.md` (paketti O9).

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Addis Ababa"**,
**"History of Addis Ababa"**, **"Timeline of Addis Ababa"**,
**"Mount Entoto"**, **"Addis Mercato"** (ohjaus haulla "Merkato"),
**"Taytu Betul"**, **"Menelik II"**, **"Ethio-Djibouti Railways"**,
**"Addis Ababa Light Rail"**, **"Ethio-jazz"**, **"Mulatu
Astatke"**, **"Injera"**, **"Ethiopian cuisine"**, **"St. George's
Cathedral, Addis Ababa"**, **"Holy Trinity Cathedral, Addis
Ababa"**, **"National Museum of Ethiopia"**, **"Ethnological
Museum, Addis Ababa"**, **"Menelik II School"**, **"Hager Fikir
Theatre"**, **"Taitu Hotel"**, **"Abrehot Library"**, "Africa
Hall", "Addis Ababa City Hall", "Meskel Square".

**RAJAUS TÄLLE LEHDELLE.** Etiopian maalehti (`js/packs/maa-
kategoriat.js`, ETH) on jo tehty, ja sen faktapohja on
`docs/mantereet-tyoaineisto/faktapohja-etiopia.md`. Maalehti kertoo
Lalibelasta, Kebra Nagastista, Zemene Mesafintista, Menelik II:sta
hallitsijana, tefistä, watista ja berberestä, ensetistä, paastosta,
pyhästä Yaredista, begenasta, azmareista, eskistasta, geezin
kirjaimistosta, Garima-evankeliumeista, suojakääröistä, kalenterista,
kirkkometsistä, walia-vuorikauriista, Sof Omarin luolasta ja
etiopiansudesta. **Kaupunkilehti ei toista näitä.** Samoin jätetään
väliin kartan maastokohteet (`js/packs/maastokohteet-eth.js`: Ras
Dejen, Tanajärvi, Sininen Niili, Aksum, Fasil Ghebbi, Harar, Tiya,
Debre Damo, Danakil, Hadar, Balen puisto) ja skandaalit
(`js/packs/skandaalit.js`: Tewodros II:n kirje, Wuchalen sopimus ja
Adwa). Adwan taistelu mainitaan tässä lehdessä vain ajankohtana,
johon kaksi rakennusta ajoittuu (katedraalin nimi ja hotellin
perustaminen) — taistelua itseään ei kerrota.

**Nykypolitiikka ja käynnissä olevat selkkaukset jätetään kokonaan
pois** (M3:n Myanmar-linja, sama kuin ETH-maalehdessä). Ulkopuolelle
jäävät siis vuoden 2014 yleiskaavakiista ja Oromo-mielenosoitukset,
Sheger City -hanke ja sen purkutyöt, Dergin vallankaappaus ja
punainen terrori, 1991 vallanvaihto, sekä Italian miehityksen
kaasusodankäynti ja teloitukset. Miehitys 1936–1941 kerrotaan
tapahtumana ja rakennusten historian osana, ilman julmuuksien
yksityiskohtia.

Kaupungin visa on luettu tiedostosta `js/packs/africa-questions.js`
(avain `addisabeba`, viisi kysymystä: minkä maan pääkaupunki,
Afrikan unionin päämaja, kahvin alkuperämaa, nimen merkitys "uusi
kukka", 13 kuukauden kalenteri). **Minitehtävä ei saa kysyä yhtään
näistä viidestä.** Kaikkien viiden aihe löytyy lehden teksteistä
(korkeus ja nimi kansisivulta, kahvi teemasivulta, Afrikan unioni ja
kalenteri matkaoppaasta).

Olemassa olevat lohkot on luettu ristiriitojen varalta:
- `js/packs/africa-kulttuuri.js` (`addisabeba`): litteät nostot
  kahviseremoniasta (kuva `Ethiopian coffee ceremony.jpg`),
  ethio-jazzista (Apple Music -linkki Mulatu Astatkeen) ja
  injerasta. Kun kaupunki saa kategoriat, nämä eivät enää näy —
  **musiikkilinkki ja kaikki kolme aihetta siirretään
  kategorioihin** (kaupunkilehti.md, "Kulttuurivisa ja litteä
  taulu"). Litteään tauluun jää vain `kysymys`.
- `js/packs/africa-valokuvat.js` (`addisabeba`): ennen–nyt-pari on
  valmis (`British delegation Addis Abeba.jpg` 1930 /
  `AddisView.jpg`) ja lisäkuvina eukalyptusmetsä Entoton rinteellä
  sekä kahviseremonia. Nämä tiedostonimet ovat varattuja.
- `js/packs/africa-saapumiset.js` (`addisabeba`): kuvaus korkeudesta
  ja kahviseremoniasta, isoisän nosto itsenäisyydestä. Ei
  anakronismia: teksti ei väitä isoisän käyneen kaupungissa.
  **1873-kehys lisätään** kuvaukseen (ks. alla).
- `js/packs/africa-artikkelit.js` (`Addis Abeba`): intro on vain
  kolme virkettä. **Kasvatetaan 7–10 virkkeeseen** (reseptin
  linjaus 20.8.2026).
- `js/packs/saatiedot.js`: ei riviä. Säärivin tekee erillinen
  agentti — tämä erä ei koske tiedostoon.

**1873-KEHYS.** Isoisän matkavuonna kaupunkia ei ollut. Ylängön
laakso oli **Finfinne**, kuumien lähteiden paikka (oromoksi
"kuuman kivennäisveden lähde"), ja pohjoispuolella kohosi
**Entoton** vuori. Menelik II asettui Entotolle **1884**, ja
laakson asutus alkoi **1886**, kun keisarinna **Taytu Betul** valitsi
paikan lähteiden luota ja antoi sille nimen Addis Abeba, "uusi
kukka". Kaupunki oli siis kolmetoista vuotta nuorempi kuin isoisän
matka. Vuonna 1889 asukkaita arvioitiin olleen 15 000 ja 1930 noin
80 000; nyt heitä on noin 6,3 miljoonaa (2025).

---

## 1. Kansisivu (id `kaupunki`) — nostot

### N1. Finfinne, kuumat lähteet ja uusi kukka

en-Wikipedia "Addis Ababa" (johdanto, "Foundation/Founding"),
"Timeline of Addis Ababa", "Taytu Betul".

- Asutus laakson puolella alkoi **1886** paikassa nimeltä
  **Finfinne**, joka viittaa kuumiin lähteisiin. Paikan valitsi
  keisarinna **Taytu Betul**: hän rakensi ensin talon
  **Filwuha**-kivennäisvesilähteiden luo, joissa hän ja Shewan
  hovi kävivät kylvyissä.
- Taytu suostutteli Menelik II:n siirtämään pääkaupungin **kylmältä
  ja tuuliselta Entotolta** alas tasangolle ja antoi uudelle
  kaupungille nimen Addis Abeba. Seuraavana vuonna suuria
  maapalstoja (`sefer`) jaettiin aatelisille, muille
  merkkihenkilöille ja kirkoille.
- Paikallisilta oromoheimoilta maat takavarikoitiin ja monet
  joutuivat siirtymään. **Tämä kerrotaan lehdessä suoraan**
  (pilari 4).
- Kaupunki perustettiin **katamaksi**, kuninkaalliseksi leiriksi:
  sefer-palstat asettuivat kuin marssiva armeija — Menelikin
  palatsi keskellä, vasemman (qeñazmach) ja oikean (grazmach) siiven
  johtajat sen kummallakin puolella ja palatsin itäpuoli
  dejazmachille. Moni palsta on yhä jäljitettävissä alkuperäiseen
  jakoon.
- Varhainen asumus oli pyöreä maja: seinät savea (`cheka`) ja olkea
  puurungon päällä, katto olkikatto.
- Menelik muodosti keisarillisen palatsinsa **1887**, ja Addis
  Abebasta tuli keisarikunnan pääkaupunki **1889**; sen jälkeen
  avattiin kansainväliset lähetystöt. Timeline antaa pääkaupungin
  siirrolle Entotolta likiarvon **1891** — **ristiriita
  kirjoitetaan auki:** pääartikkeli sanoo 1889, aikajana "noin
  1891". Lehti käyttää pääartikkelin lukua ja kertoo siirtymän
  vähittäisenä.
- Korkeus **2 355 m**; neljänneksi korkein pääkaupunki maailmassa ja
  Afrikan korkein.

### N2. Eukalyptus ja Entoton "keuhko"

en-Wikipedia "Addis Ababa" ("Foundation"), "Timeline of Addis
Ababa", "Mount Entoto".

- Menelikin näkyvimpiä jälkiä on **eukalyptuspuiden istuttaminen**
  kaupungin katujen varsille. Aikajana ajoittaa istutukset vuoteen
  **1903**.
- Puu tuotiin **Australiasta** Menelik II:n aikana, mutta suurin osa
  istutettiin vasta Haile Selassien aikana. Entoton vuorta sanotaan
  siksi **"Addis Abeban keuhkoksi"**.
- Metsä on yhä **tärkeä polttopuun lähde** kaupungille ja oli
  aiemmin myös rakennuspuun lähde.
- Entoto on Entoto-vuoriston korkein huippu, **3 200 m**. Vuori on
  pyhänä pidetty ja siellä on useita luostareita ja kirkkoja
  (Raguel ja Maria).
- **Entoto Natural Park** on 1 300 hehtaaria, korkeus 2 600–3 100 m,
  vuosisade 1 200 mm ja keskilämpötila 14 °C. Puiston pohjoisreuna
  on **Abay- (Sinisen Niilin) ja Awash-jokien vedenjakaja**.
- Huipulla on Ethiopian Space Science Societyn **observatorio**.
- Kaupungin alin kohta on Bolen lentoaseman seutu **2 326 m** ja
  ylin Entoton suunnassa yli **3 000 m**.

### N3. Rata merelle ja Afrikan ensimmäinen pikaraitiotie

en-Wikipedia "Ethio-Djibouti Railways" (johdanto, "Overview"),
"Addis Ababa Light Rail" (johdanto, "Overview"), "Addis Ababa"
("Railway", "Light rail"), "Timeline of Addis Ababa".

- Metrileveä rata rakennettiin **1897–1917** ja se yhdisti Addis
  Abeban Djiboutin satamaan: **784 km**, josta noin 100 km
  Djiboutin puolella, yksiraiteisena.
- Ennen rataa matka rannikolta Addis Abebaan kesti **kuusi
  viikkoa** kameli- ja muulikaravaanilla.
- Rakentaminen alkoi 1897, vuosi Adwan jälkeen. Rata oli aluksi
  ranskalaisvetoinen; **1909 se kansallistettiin Etiopiassa**, ja
  etiopialaisten osuus kasvoi niin, että he hoitivat suurimman osan
  tehtävistä **1959 jälkeen**. Radasta tuli itsenäisyyden vertauskuva.
- Aikajanan mukaan **Djibouti–Addis Abeba -rata aloitti liikenteen
  1917**.
- Rata oli maan päälinja **1950-luvulle asti**, kunnes tiekuljetus
  vei liikenteen. Vanha rata on keskisessä Etiopiassa ja Djiboutissa
  hylätty; uusi sähköistetty normaaliraiteinen rata valmistui
  **2017** (kaupunkiartikkeli sanoo liikenteen alkaneen **syyskuussa
  2016** — **ristiriita kirjoitetaan auki**: liikenteen aloitus 2016,
  valmistuminen 2017).
- **Addis Ababa Light Rail** avattiin yleisölle **20.9.2015** ja on
  **ensimmäinen pikaraitiotie Itä- ja Saharan eteläpuolisessa
  Afrikassa**. Toinen linja aloitti 9.11.2015. Linjoja on kaksi,
  yhteispituus **31,6 km** ja **39 asemaa**; itä–länsi-linja 17,4 km
  (Ayat–Torhailoch), pohjois–etelä-linja 16,9 km (Menelik II
  -aukio, Merkato, Lideta, Legehar, Meskel-aukio, Gotera, Kaliti).
  Yhteistä rataa noin 2,7 km.
- Pohjois–etelä-linjan vaunut ovat **sinivalkoisia**, itä–länsi-linjan
  **vihreävalkoisia**. Lippu maksaa **2–6 birriä** ja liput ostetaan
  aseman vieressä olevista **oransseista kioskeista**.
- Rakentaminen maksoi **475 miljoonaa dollaria** ja kesti kolme
  vuotta. Tammikuussa 2016 matkustajia oli keskimäärin **113 500
  päivässä**; 2023 keskiarvo oli 56 000, koska osa vaunuista on
  poissa käytöstä varaosapulan takia.

### N4. Ethio-jazz — kaupungin oma ääni

en-Wikipedia "Ethio-jazz", "Mulatu Astatke".

- Ethio-jazz yhdistää amharalaisen musiikin **viisisäveliset
  (pentatoniset) asteikot** länsimaisen musiikin 12-säveljärjestelmään
  ja soittimiin; myöhemmin mukaan tuli afrofunkia, soulia ja
  latinalaisrytmejä.
- Tyylin juuret ovat **1950-luvulla** ja armenialaistaustaisessa
  **Nerses Nalbandianissa**, joka sävelsi Haile Selassien tilauksesta
  musiikkia **Etiopian kansallisteatterille** ja sekoitti siinä
  etiopialaista ja länsimaista soitinnusta.
- **Mulatu Astatkea** pidetään ethio-jazzin isänä. Syntynyt
  **19.12.1943 Jimmassa**. Perhe lähetti hänet Walesiin oppimaan
  insinööritaitoa; hän saapui Britanniaan **1959 16-vuotiaana** ja
  opiskeli lopulta musiikkia Trinity College of Musicissa Lontoossa.
- **1963** hän siirtyi Bostoniin **Berklee College of Musiciin
  koulun ensimmäisenä afrikkalaisena opiskelijana** ja opiskeli
  vibrafonia ja lyömäsoittimia.
- Ensimmäiset levyt *Afro-Latin Soul* 1 ja 2 äänitettiin New Yorkissa
  **1966**. **1969** hän palasi Addis Abebaan ja toi mukanaan uuden
  soundin, jota kutsui ethio-jazziksi.
- Hän toi **vibrafonin ja congat** etiopialaiseen populaarimusiikkiin.
  Levyt ilmestyivät enimmäkseen **Amha Esheten Amha Recordsilla**,
  maan ensimmäisellä riippumattomalla levy-yhtiöllä.
  *Yekatit Ethio Jazz* (1974) oli ensimmäinen etiopialainen albumi,
  joka suunniteltiin kokonaisuudeksi eikä koottu vanhoista singleistä.
- **1973** Mulatu esiintyi vieraana **Duke Ellingtonin** orkesterin
  Etiopian-kiertueella; konsertissa oli läsnä Haile Selassie.
- Ranskalainen tuottaja **Francis Falceto** jäljitti Amha Esheten,
  ja **1998 Buda Musique** alkoi julkaista Amha-kauden levytyksiä
  **Éthiopiques**-sarjassa; ensimmäinen yhdelle muusikolle omistettu
  osa oli *Éthiopiques 4: Ethio Jazz & Musique Instrumentale
  1969–1974*. Vuoteen 2014 mennessä sarjassa oli **29 osaa**.
- Mulatu on perustanut Addis Abebaan musiikkikoulun ja **African
  Jazz Village -klubin**.
- Elokuva **Broken Flowers** (2005) käytti seitsemää hänen
  kappalettaan.

---

## 2. Teemasivu (id `ruoka`) — "Kahvin pääkaupunki"

### R1. Kahviseremonia

en-Wikipedia "Ethiopian cuisine" (osio "Beverages/Coffee"),
"Addis Mercato" (kahvi päätuotteena).

- Kahvi on Etiopian tunnetuin juoma; seremonia (`bunna maflat`)
  on vieraanvaraisuuden muoto: pavut paahdetaan, jauhetaan ja
  keitetään vieraiden nähden.
- Kahvi keitetään **jebena**-savipannussa ja tarjoillaan pieniin
  kuppeihin (`sini`); kierroksia on kolme (abol, tona, baraka).
- Merkaton läpi kulkeva päätavara on **paikallisesti kasvatettu
  maataloustuote — ennen kaikkea kahvi**.
- HUOM. Litteä nosto `africa-kulttuuri.js`:ssä kertoo saman asian;
  se korvautuu tällä. Maalehti EI käsittele kahvia.

### R2. Injera ja wat

en-Wikipedia "Injera", "Ethiopian cuisine".

- Injera on hapan, sienimäisen huokoinen lettuleipä, joka toimii
  samalla lautasena, lusikkana ja leipänä.
- Taikina käy **useita päiviä**, mikä antaa hapokkaan maun.
- Ruoka syödään käsin repimällä pala injeraa ja poimimalla sillä
  padasta; **yhteinen lautanen** on ateriakulttuurin ydin.
- HUOM. Maalehti käsittelee **tefiä viljana** sekä **watia ja
  berberea** — kaupunkilehti kertoo injerasta leipänä ja
  ateriatapana, ei viljasta eikä maustesekoituksesta.

### R3. Merkato

en-Wikipedia "Addis Mercato".

- **Afrikan suurin ulkoilmatori**, useiden neliökilometrien
  laajuinen; arviolta **13 000 työntekijää 7 100 yrityksessä**.
- Nimi on italiaa ("markkinat"), ja tori sijaitsee **Addis Keteman**
  piirissä. Nimi tarkoittaa myös koko kaupunginosaa.
- Ennen nykyistä Merkatoa tori oli **Pyhän Yrjön kirkon lähellä**
  siinä missä kaupungintalo nyt on. Miehityshallinto **siirsi torin
  länteen** Fitawrari Habte Giyorgis Dinagden maiden tienoille ja
  nimesi sen Merkato Dinagdeksi: **nykyinen Merkato syntyi
  miehityshallinnon erottelupolitiikasta**.
- Vanha Pyhän Yrjön tori rajattiin eurooppalaisille ja nimettiin
  **Piazzaksi**; siellä oli eurooppalaistyylisiä liikkeitä
  näyteikkunoineen. Arabikauppiaat siirtyivät noin puoli mailia
  länteen, ja 1960-luvulta lähtien Merkato on ollut paikallinen.
- Tori kasvoi ilman kaavaa ja jakautui tavaralajien mukaan
  osastoihin, joita kutsutaan nimellä **terra**.
- Osastoja ovat mm. romumetallin kierrätys, huonekalut ja
  kodinkoneet; kahvin, mausteiden ja pikkupurtavan osastot ovat
  matkailijalle tutuimpia.

### R4. Piazza, macchiato ja Anwarin moskeija

en-Wikipedia "Addis Ababa" ("Architecture", "Places of worship"),
"Addis Mercato", "Taitu Hotel".

- **Addis Abebaa ei rakennettu siirtomaakaupungiksi**, joten sillä ei
  ole eurooppalaista arkkitehtuuria — paitsi **Piazzan**
  kaupunginosassa, joka on selvin merkki italialaisvaikutuksesta:
  italialaistyyliset talot, italialaiset ravintolat, pienet kahvilat
  ja eurooppalaistyyliset kauppakeskukset.
- **Anwarin suurmoskeija** on Merkaton sydämessä ja Etiopian suurin
  moskeija; se rakennettiin **1922** italialaishallinnon käskystä.
  Muutaman metrin päässä lounaaseen on **Raguelin kirkko**, jonka
  keisarinna Menen rakennutti vapautuksen jälkeen. **Moskeijan ja
  kirkon läheisyys on vertauskuva kristinuskon ja islamin pitkästä
  rauhanomaisesta rinnakkaiselosta Etiopiassa.**
- **Itegue Taitu Hotel** on Etiopian vanhin hotelli, Piazzassa.

---

## 3. Kohdekartta (8 kohdetta) ja nähtävyysjutut

Rajaus: pohjoinen 9,0500 / etelä 9,0270 / länsi 38,7460 / itä
38,7690 (noin 2,5 × 2,5 km). Koordinaatit en-Wikipedian
`prop=coordinates`-rajapinnasta 7.9.2026. **Yksikään kohde ei ole
lehden noston aihe.**

| # | Kohde | lat, lon | Lähdeartikkeli |
| --- | --- | --- | --- |
| 1 | Etnologinen museo | 9.0467, 38.7578 | "Ethnological Museum, Addis Ababa" |
| 2 | Etiopian kansallismuseo | 9.03833333, 38.76194444 | "National Museum of Ethiopia" |
| 3 | Hager Fikir -teatteri | 9.03769167, 38.75453611 | "Hager Fikir Theatre" |
| 4 | Pyhän Yrjön katedraali | 9.036691, 38.751415 | "St. George's Cathedral, Addis Ababa" |
| 5 | Menelik II:n koulu | 9.0352, 38.7635 | "Menelik II School" |
| 6 | Taitu-hotelli | 9.030649, 38.7542562 | "Taitu Hotel" |
| 7 | Kolminaisuuden katedraali | 9.030799, 38.766562 | "Holy Trinity Cathedral, Addis Ababa" |
| 8 | Abrehot-kirjasto | 9.0303, 38.7624 | "Abrehot Library" |

Kaikki 28 kohdeparin väliä on laskettu haversinilla: pienin on
**360 m** (Hager Fikir – Pyhän Yrjön katedraali), seuraavat 388 m
(kansallismuseo – Menelik II:n koulu) ja 460 m (Kolminaisuuden
katedraali – Abrehot). Kaikki selvästi yli 200 metrin säännön.

**Juttujen ydinfaktat:**

1. **Etnologinen museo** — perustettu **1950**, Etiopian
   ensimmäinen yliopistomuseo. Kokoelmien pohjana olivat vanhat
   italialaiset eläintieteelliset näytteet ja ensimmäisten
   valmistuneiden keräämät esineet; aloitteentekijä oli
   yliopiston pääkirjastonhoitaja **Stanisław Chojnacki**. Museo on
   Addis Abeban yliopiston päakampuksella, jossa toimii **Institute
   of Ethiopian Studies**. Osastot: antropologia,
   etnomusikologia, taidegalleria, filatelia, numismatiikka.
   Rakennus on **Guenete Leul -palatsi** (aikajanan mukaan
   rakennettu **1930**), Haile Selassien entinen palatsi.
2. **Etiopian kansallismuseo** — museon idea esiteltiin **1936**
   näyttelyllä, jossa oli Salomonin dynastian lahjoittamia
   seremonia-asuja. Nykyinen museo kasvoi **1958 perustetusta
   Institute of Archaeologysta**, jonka ranskalaiset arkeologit
   perustivat pohjoisen Etiopian tutkimusta varten. Vuonna 1976
   perustettu kulttuuriperintöhallinto teki siitä kansallismuseon.
   Taiteilijat **Afewerk Tekle** ja **Mamo Tessema** olivat mukana
   perustamassa; jälkimmäinen toimi intendenttinä. Kellarissa on
   **Lucy** (Dinkinesh), Australopithecus afarensiksen osittainen
   luuranko, ja **Selam**, noin **3,3 miljoonaa vuotta** vanha
   fossiili (löydetty 2000–2004).
3. **Hager Fikir -teatteri** — Etiopian vanhimpia teattereita;
   aiemmin yökerho, teatteriksi **1935** yhdistyksen *Ye-hager
   Fikir Mahber* toimesta. Ensimmäinen esitys oli ulkoilmanäytös
   **Menelikin aukiolla**: fukera ja shilela, perinteisiä lauluja ja
   runoutta. Etiopialaisen draaman uranuurtaja **Yoftahe Negussie**
   oli mukana. Miehityksen aikana toiminta jatkui maan alla ja
   päättyi vasta vapautukseen **1941**; sen jälkeen teatteri siirtyi
   Piazzan varastorakennukseen, joka uudistettiin **1942**.
   Lavalla ovat esiintyneet mm. **Tilahun Gessesse** ja **Aster
   Aweke**; ohjelmistossa on sekä etiopialaisia näytelmiä että
   Shakespearea, Schilleriä, Ibseniä ja Molièrea.
4. **Pyhän Yrjön katedraali** — **kahdeksankulmainen**; rakennettu
   vanhemman, 1400-luvulta peräisin olevan kirkon raunioille.
   Nimi tulee siitä, että kirkon **tabot** kannettiin Adwan
   taisteluun. Suunnittelija ja rakentaja oli italialaisinsinööri
   **Sebastiano Castagna**, **1911** (aikajana ajoittaa kirkon
   rakentamisen vuoteen **1896** — **ristiriita kirjoitetaan
   auki**: perustaminen 1896, nykyinen rakennus 1911). Keisarinna
   **Zewditu kruunattiin täällä 1917** ja **Haile Selassie 1930**.
   Museossa on keisarillinen valtaistuin ja **Afewerk Teklen**
   lasimaalauksia sekä aseita: kaarevia miekkoja, kolmikärkiä ja
   leijonanharjasta tehtyjä kypäriä. Italialaishallinto sytytti
   rakennuksen tuleen **1937**, ja Haile Selassie kunnosti sen
   vapautuksen jälkeen.
5. **Menelik II:n koulu** — perustettu **lokakuussa 1908** Menelik
   II:n käskystä; **Etiopian ensimmäinen moderni koulu**. Opetusta
   ohjasi egyptiläinen kasvattaja **Hana Salib** koptiopettajien
   kanssa, ja rakennuksen suunnittelivat kreikkalaiset insinöörit ja
   arkkitehdit. Menelik antoi **1906** julistuksen, joka teki
   modernista koulutuksesta luvallista (aikajana ajoittaa koulun
   perustamisen vuoteen 1906 — **ristiriita kirjoitetaan auki**).
   Aloittaessa oppilaita oli noin **20**, myöhemmin sata, enimmäkseen
   aatelisten poikia; osa aatelisista lähetti kouluun palvelijoidensa
   tai sukulaistensa lapsia. Koulu suljettiin miehityksen ajaksi
   1935–1941. Nyt ala-asteella on yli 2 000 ja yläasteella yli
   7 000 oppilasta; koulu on **Arat Kilossa**.
6. **Taitu-hotelli** — **Etiopian vanhin hotelli**, Piazzassa;
   rakennettu **1905** ja perustaja keisarinna **Taytu Betul**,
   Menelik II:n puoliso, jotta ulkomaisilla vierailla olisi paikka
   levätä ja ruokailla. **Ristiriita kirjoitetaan auki:**
   pääartikkeli "Addis Ababa" sanoo hotellin rakennetun **1898
   Etiopian kalenterin mukaan** (= 1905/06 länsimaista lukua) ja
   aikajana sanoo hotellin olleen toiminnassa **1907** — luvut
   sopivat yhteen, kun kalenteri otetaan huomioon. **Läntinen siipi
   rakennettiin 1902** Baro Salientin liittäneen sopimuksen
   muistoksi. Hotelli oli diplomaattien, toimittajien ja
   matkailijoiden kokoontumispaikka; **Evelyn Waugh** teki siitä
   romaaniinsa *Scoop* "Liberty Hotelin". Miehityksen aikana
   italialaiskomentajat asuivat läntisessä siivessä, eikä hotellia
   palautettu alkuperäiseen kokoonsa. **Tammikuun 11. päivänä 2015**
   tulipalo vaurioitti rakennusta, ja se on sittemmin kunnostettu
   lähelle alkuperäistä asuaan. Ravintolassa soi **jazz joka ilta**.
7. **Kolminaisuuden katedraali** — Etiopian ortodoksisen
   tewahedo-kirkon arvokkain katedraali. Perustettu **22.12.1931**
   Haile Selassien johdolla, työ keskeytyi miehityksen ajaksi ja
   valmistui **1942**; rakennettu muistoksi vastarinnasta. Kolmijako
   noudattaa Salomonin temppelin mallia: ulkokehällä seurakunta
   laulaa hymnit, keskimmäisellä jaetaan ehtoollinen ja sisimpään,
   jonne vain papit pääsevät, on sijoitettu **tabot**. Kirkko on
   **nelikulmainen** — ympyränmuotoiset kirkot ovat Etiopiassa
   tavallisempia. Hautapaikkana: Haile Selassie ja keisarinna Menen
   Asfaw, patriarkat Abuna Tekle Haymanot ja Abune Paulos sekä
   brittiläinen etiopiantutkija ja suffragetti **Sylvia Pankhurst**.
8. **Abrehot-kirjasto** — avattiin **tammikuussa 2022**; nimi
   tarkoittaa amharaksi **"valistus"**. Etiopian suurin kirjasto:
   **19 000 m²**, neljä kerrosta, **1,5 km hyllyä**, tilaa
   **1,4 miljoonalle kirjalle** ja yli **2 000 kävijälle** kerralla;
   hinta yli **1,1 miljardia birriä**. Suunnittelu ZIAS Design
   International, rakentaminen kesti lähes kaksi vuotta. Kolme
   aluetta: **Knowledge Garden** (ulkotila, jota reunustavat
   oliivipuurivit ja jonka keskellä on neljä sessa-puuta),
   **Knowledge Springs** (verkko-oppimisen alue) ja **Knowledge
   Centre** (itse kirjasto). Kirjasto on auki **ympäri
   vuorokauden**, myös viikonloppuisin ja pyhinä. Kokoelmassa on yli
   300 000 kotimaista ja 120 000 kansainvälistä tutkimusartikkelia.
   Sijaitsee parlamenttitalon edessä.

---

## 4. Matkaopas (Matkailijan Addis Abeba) — 5 jaksoa

1. **Perille ja liikkeelle:** Bolen kansainvälinen lentoasema,
   uusi terminaali **2003**; kaupungin alin kohta 2 326 m.
   Julkinen liikenne: kolmen yhtiön bussit (Anbessa, Sheger,
   Alliance), pikaraitiotie sekä **sini-valkoiset taksit**, jotka
   ovat useimmiten enintään kahdentoista hengen pikkubusseja. Niissä
   on kuljettaja ja **weyala**, joka kerää maksut ja huutaa
   määränpään. Kehätien rakentaminen alkoi **1998**.
2. **Museokukkulalta Piazzaan:** kansallismuseo, etnologinen museo,
   Pyhän Yrjön katedraali ja Piazzan italialaiskorttelit; myös
   Etiopian kansallisteatteri (perustettu **1955**) ja Meskel-aukio,
   jonne kokoonnutaan **syyskuun lopun Meskel-juhlaan**.
3. **Mitä täällä syödään:** injera ja wat, kahviseremonia, Merkaton
   kahvi- ja maustekojut, Piazzan kahvilat.
4. **Afrikan kokouspaikka:** **Africa Hall** (UNECAn päämaja) on
   Menelik II -kadun varrella; siellä perustettiin **Afrikan
   yhtenäisyysjärjestö 1963**, joka lakkautettiin 2002 ja jonka
   tilalle tuli **Afrikan unioni**. **YK:n Afrikan talouskomissio
   (UNECA) perustettiin 1958** ja sen päämaja on kaupungissa.
   Afrikan unionin uusi päämaja rakennettiin kaupungin
   lounaisosaan. Kaupunkia kutsutaan **"Afrikan poliittiseksi
   pääkaupungiksi"**. Etiopian kalenteri (13 kuukautta) mainitaan
   tässä matkailijan käytännön tietona.
5. **Milloin kannattaa tulla:** subtrooppinen ylänköilmasto
   (Köppen **Cwb**). Korkeus tasaa lämpötilat, ja päiväntasaajan
   läheisyys pitää kuukaudet samankaltaisina: **yksikään kuukausi ei
   ylitä 22 °C:n keskilämpötilaa**. Marraskuun puolivälistä
   tammikuuhun on kuiva kausi, jolloin päivälämpötila on harvoin yli
   **23 °C** ja yöt **5–10 °C**, toisinaan pakkasen puolella.
   Lyhyt sadekausi **helmi–toukokuussa**, yölämpötilat **10–15 °C**.
   Pitkä sadekausi **kesäkuusta syyskuun puoliväliin** on vuoden
   kylmin ja pilvisin aika. Korkein mitattu **30,6 °C (26.2.2019)**,
   alin **0 °C**. **Säärivi (js/packs/saatiedot.js) ei kuulu tähän
   erään** — sen tekee erillinen agentti, ja sääjakso nojaa siksi
   en-Wikipedian Climate-osioon ja sanoo sen ääneen.

**Parasta (5 kohtaa):** kansallismuseo (Lucy), Merkato, Pyhän Yrjön
katedraali, Entoton metsä ja näköala, Piazza.
**Hyvä tietää (4 kohtaa):** korkeus ja hengästyminen; illat ovat
viileitä; pitkä sadekausi kesällä; kalenteri ja kellonaika poikkeavat
(kalenteri mainitaan matkaoppaassa, ei minitehtävässä).

---

## 5. Minitehtävä (teemasivulle `ruoka`)

**Ei saa toistaa visaa** (kahvin alkuperämaa on visassa!). Ehdotus:

> Kysymys: Mistä Addis Abeban Merkato sai alkunsa?
> Vaihtoehdot: miehityshallinnon erottelupolitiikasta / keisari
> Menelikin määräyksestä / rautatieaseman viereen syntyneestä
> kauppapaikasta / Afrikan unionin hankkeesta
> Oikea: miehityshallinnon erottelupolitiikasta
> Fakta: Vanha tori oli Pyhän Yrjön kirkon luona siinä, missä
> kaupungintalo nyt on; miehityshallinto siirsi sen länteen ja
> rajasi vanhan torin eurooppalaisille Piazzana.

Vastaus löytyy **samalta sivulta** (nosto R3).

---

## 6. Kuvat

Kuvat haetaan Commonsin API:sta kategoria- ja hakusanahauilla,
lisenssi ja tekijä luetaan `extmetadata`-kentistä, ja jokainen
valittu kuva katsotaan silmin. Varattuja (jo käytössä
`africa-valokuvat.js`:ssä ja `africa-kulttuuri.js`:ssä):
`British delegation Addis Abeba.jpg`, `AddisView.jpg`,
`Ethiopia IMG 5685 Addis Abeba, women carrying firewood.
(39809834812).jpg`, `Coffee ceremony of Ethiopia and Eritrea 3.jpg`,
`Ethiopian coffee ceremony.jpg`. Ennen–nyt-pari otetaan
valokuvataulusta (1930 / nykyinen näkymä) reseptin mukaan.
