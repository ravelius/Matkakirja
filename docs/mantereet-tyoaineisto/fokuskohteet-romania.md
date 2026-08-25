# Romanian fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin. Kaikki tiedot koottu 25.8.2026.
Sama rakenne kuin docs/mantereet-tyoaineisto/fokuskohteet-kreikka.md.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohdat
KOHDEKOROSTUS/ETENEMINEN): pelilaatan (Bukarest) lisäksi fokusnäkymän
kartalla näkyy muita kaupunkeja, jokia, vuoria ja kohteita; aarteen
löydyttyä niitä voi klikata, jolloin kartta korostaa juuri sen kohteen
niukalla taustalla ja avaa pienen pop-up-tietoruudun. Tämä dokumentti
on faktapohja niille pop-up-teksteille — ei lopullista pelitekstiä
eikä UI-suunnitelmaa.

Tehty omistajan luvalla 25.8.2026 (Raamattu, Fokusmoodi: Bukarest
tehdään yhtä valmiiksi kuin Kreikka).

## Tarkistustapa

- **Koordinaatit:** en-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates`, `redirects=1`), haettu 25.8.2026
  curlilla. Rajapinta vastasi toistuvasti 429:llä; kaikki haut uusittiin
  kasvavalla viiveellä (3 s → 12 s → 27 s → 48 s...). **EI yhtään
  koordinaattia muistista.** Yksi kohde (Salina Turda) ei ole
  en-Wikipedian coordinates-rajapinnassa; sen koordinaatti on haettu
  Commonsin kautta ja merkitty erikseen.
- **Popup-faktat:** en-Wikipedian artikkeleista
  (`prop=extracts&explaintext=1`), koko artikkelin tekstistä. Jokaisen
  nostetun faktan kohdalla on merkitty artikkeli JA se osio, johon
  väite nojaa.
- **Suomenkieliset nimet:** tarkistettu fi-Wikipediasta
  (`action=query&titles=...&redirects=1`). Kuudelle kohteelle
  fi-Wikipediassa EI ole artikkelia (Peleș, Săpânța/Iloinen hautausmaa,
  Salina Turda) — merkitty kohteittain. Kahdessa tapauksessa
  fi-Wikipedian luku poikkeaa en-Wikipedian luvusta; molemmat on
  merkitty ja **peliin menee en-Wikipedian luku**, koska se on tämän
  aineiston tarkistusstandardi.
- **Kuvat:** jokainen ehdotettu Commons-tiedosto on tarkistettu
  `imageinfo`-rajapinnalla (koko, lisenssi, tekijä, päiväys). Ei
  arvattuja tiedostonimiä. Kaikki ehdotetut ovat PD, CC0 tai CC.

## Vuoden 1873 rajaus, joka koskee useaa kohdetta

Isoisän matkatessa Romania ei ollut itsenäinen eikä sen nykyisen
kokoinen. Kolme kohdetta alla oli vuonna 1873 **kokonaan Romanian
ulkopuolella**: Constanța ja Tonavan suisto olivat Ottomaanien
valtakuntaa (siirtyivät Romanialle 1878), ja koko Transilvania —
eli Bran, Sighișoara, Corvin, Sarmizegetusa, Turda ja Făgărașin
vuoret — kuului Itävalta-Unkariin vuoteen 1920 asti. Peleșin linna
taas oli 1873 vasta peruskivi. Nämä ovat pop-up-teksteille etu, eivät
haitta: jokainen on luonteva kohta sanoa, mitä isoisä olisi nähnyt.

---

## Kohteet

### 1. Branin linna

- **Nimi:** Branin linna (fi-Wikipedia, artikkeli olemassa).
  Paikallinen: Castelul Bran; saksaksi Törzburg.
- **Tyyppi:** muu (linna).
- **Koordinaatit:** 45,515°N, 25,36722°E — en-Wikipedia "Bran Castle".
- **Popup-teksti (n. 430 merkkiä):**

  > Linnan rakensivat Kronstadtin eli Brașovin saksalaiset omalla
  > kustannuksellaan ja omalla työvoimallaan, kun Unkarin kuningas
  > Ludvig I antoi siihen luvan 19. marraskuuta 1377. Se vartioi
  > Transilvanian ja Valakian välistä vuoristosolaa ja toimi
  > myöhemmin tullipaikkana. Maailmalla sitä markkinoidaan Draculan
  > linnana – mutta Vlad Seivästäjä ei asunut täällä, eikä Bram
  > Stoker tiettävästi tiennyt linnasta mitään.

- **Lähde:** en-Wikipedia "Bran Castle", osiot "Stone castle of the
  Kronstadt Saxons" (Ludvig I:n asiakirja 19.11.1377, saksalaiset
  rakensivat omalla kustannuksellaan, tullipaikka vuoristosolassa;
  "The Wallachian ruler Vlad Țepeș ... does not seem to have had a
  significant role in the history of the fortress") ja
  "'Dracula's Castle'" ("most historians agree that Vlad III Dracula
  ... never lived in Castle Bran... Bran Castle is not mentioned in
  the novel Dracula, and there is no evidence that Stoker ever visited
  either Transylvania or Bran Castle... The claimed connection between
  the castle and the Dracula legend is tourism-driven.").
  **HUOM (nimien ristiriita):** fi-Wikipedia sanoo linnan valmistuneen
  1382; en-Wikipedia puhuu vuoden 1377 rakennusluvasta. Peliin menee
  en-Wikipedian muotoilu ("lupa 1377"), ei valmistumisvuosi.
- **Commons:** **Castelul Bran2.jpg** (3791×2516, CC BY-SA 3.0 ro,
  Dobre Cezar, 2012). Vaihtoehto: **Bran Castle 002.jpg** (8092×6122,
  CC BY-SA 4.0, Vislupus, 2018).
- **Lisätieto pop-upin toiseen versioon:** linna oli kuningatar Marian
  suosikkikoti, ja hänen sydämensä tuotiin sinne 1940 (ks.
  takynostot-romania.md, ehdokas 6).

### 2. Sighișoara

- **Nimi:** Sighișoara (fi-Wikipedia, ei uudelleenohjausta).
  Saksaksi Schäßburg, unkariksi Segesvár.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 46,21694°N, 24,79111°E — en-Wikipedia "Sighișoara".
- **Popup-teksti (n. 420 merkkiä):**

  > Sighișoara on yksi harvoista yhä asutuista keskiaikaisista
  > linnoituskaupungeista Itä-Euroopassa, ja sen vanhakaupunki on
  > ollut Unescon maailmanperintökohteena vuodesta 1999.
  > Kaupungissa asui maanpaossa Vlad Dracul – Vlad Seivästäjän isä –
  > joka löi täällä omia kolikoitaan, vaikka rahanlyönti kuului
  > Unkarin kuninkaille. Hänen asiakirjassaan esiintyy myös kaupungin
  > romanialainen nimi ensimmäistä kertaa, vuonna 1435.

- **Lähde:** en-Wikipedia "Sighișoara", johdanto (Unesco 1999) ja osio
  "History" ("The Wallachian voivode Vlad Dracul (father of Vlad the
  Impaler), who lived in exile in the town, had coins minted in the
  town (otherwise coinage was the monopoly of the Hungarian kings...)
  and issued the first document listing the city's Romanian name,
  Sighișoara. The Romanian name is first attested in 1435." Sekä:
  "In Eastern Europe and Southeastern Europe, Sighișoara is one of the
  few fortified towns that are still inhabited.").
- **Commons:** **Casa Vlad Dracul din Sighisoara4.JPG** (4000×3000,
  CC BY-SA 4.0, Cezar Suceveanu, 2015) — talo, jossa Vlad Dracul asui.
  Yleiskuva: **Sighisoara vedere spre cetate de pe podul peste
  Tarnava.jpg** (3008×2000, CC BY-SA 4.0, Mtoderic).
- **HUOM:** en-Wikipedia mainitsee, että historioitsija Radu Florescun
  mukaan Vlad Seivästäjä syntyi Sighișoarassa isänsä kolmikerroksisessa
  kivitalossa — mutta esittää sen yhden historioitsijan kantana
  ("Historian Radu Florescu writes that..."), ei varmuutena.
  **Pop-upissa saa sanoa vain, että isä asui täällä**, ei että poika
  syntyi täällä.

### 3. Peleșin linna (Sinaia)

- **Nimi:** fi-Wikipediassa EI ole artikkelia (haettu "Peleș",
  "Peleş", "Peleșin linna" — kaikki "missing"). Suomenkielinen nimi
  on siis Fablen valittava; ehdotus **Peleșin linna**. Paikallinen:
  Castelul Peleș.
- **Tyyppi:** muu (palatsi/linna).
- **Koordinaatit:** 45,35984°N, 25,54265°E — en-Wikipedia
  "Peleș Castle".
- **Popup-teksti (n. 445 merkkiä) — HUOM 1873-NÄKÖKULMA KESKEINEN:**

  > Peruskivi laskettiin 22. elokuuta 1873 – täsmälleen isoisän
  > matkavuonna. Carol I oli ihastunut vuoristomaisemaan jo 1866 ja
  > osti Kruunulle viisi neliökilometriä maata 1872; linna valmistui
  > lopullisesti vasta 1914, ja vihkiäisiä vietettiin 1883. Siitä
  > tuli maailman ensimmäinen linna, joka toimi kokonaan omalla,
  > paikan päällä tuotetulla sähköllä. Työmaalla puhuttiin
  > kuningattaren mukaan neljäätoista kieltä.

- **Lähde:** en-Wikipedia "Peleș Castle", johdanto ("built between
  1873 and 1914. Its inauguration was held in 1883") ja osio "History"
  ("When King Carol I ... first visited the site ... in 1866, he fell
  in love with the magnificent mountain scenery. In 1872, the Crown
  purchased 5 square kilometres ... the foundation was laid for Peleș
  Castle on 22 August 1873... Peleș became the world's first castle
  fully powered by locally produced electricity."). Neljätoista kieltä
  on kuningatar Elisabethin päiväkirjalainaus samassa osiossa
  ("...hundreds of national costumes and fourteen languages in which
  they spoke, sang, cursed and quarreled...").
- **Commons:** **01 Chateau Peles.jpg** (3986×2848, CC BY-SA 3.0,
  Myrabella, 2012). Vaihtoehto: **Castelul Peleș din Sinaia 02.jpg**
  (3968×2976, CC BY-SA 4.0, Nicubunu, 2018).
- **Bonus, jota EI tarvitse pop-upiin mutta joka on lähteessä:**
  Orient Expressin ensimmäisellä Bukarestin-matkalla 1883 Pariisista
  tulleet matkustajat kutsuttiin Peleșiin, ja Carol I muurasi
  seremoniallisesti viimeisen tiilen paikalleen.

### 4. Transfăgărășan

- **Nimi:** Transfăgărășan (fi-Wikipedia, artikkeli olemassa).
  Virallinen tienumero DN7C.
- **Tyyppi:** muu (vuoristotie).
- **Koordinaatit:** 45,5981°N, 24,6165°E (korkein kohta) —
  en-Wikipedia "Transfăgărășan".
- **Popup-teksti (n. 425 merkkiä):**

  > Yhdeksänkymmenen kilometrin vuoristotie rakennettiin 1970–1974
  > Nicolae Ceaușescun käskystä, vastauksena Neuvostoliiton
  > hyökkäykseen Tšekkoslovakiaan 1968: hän halusi reitin, jota
  > vihollinen ei voisi tukkia jokilaaksossa. Työhön kului noin kuusi
  > miljoonaa kiloa dynamiittia 2 000 metrin korkeudessa, ja hinta oli
  > kova. Tie kiipeää 2 042 metriin ja on lumen takia auki vain
  > kesäkuun lopusta lokakuulle.

- **Lähde:** en-Wikipedia "Transfăgărășan", osiot "History"
  (rakennusvuodet 1970–1974, syy 1968 Tšekkoslovakia, "roughly six
  million kilograms ... of dynamite", avattiin 20.9.1974) ja "Route"
  (2 042 m, kiinni lokakuun lopusta kesäkuun loppuun).
- **Commons:** **Wide view over the northern Transfagarasan.jpg**
  (1600×1067, CC BY 2.0, Horia Varlan, 2008). Vaihtoehto
  aikalaiskuvana: **Transfagarasan in 1974.jpg** (1000×764,
  CC BY-SA 3.0, MAPN).
- **IKÄSOPIVUUSRAJAUS (tärkeä):** lähde kertoo, että työhön käytettiin
  räjäytystöihin kouluttamattomia varusmiehiä ja että moni kuoli —
  virallisesti 40 sotilasta, työntekijöiden epävirallisten arvioiden
  mukaan satoja. Tämä on 13+ -yleisölle kerrottavissa, mutta se
  kuuluu **lauseen loppupainoksi ("hinta oli kova") tai lehden
  tekstiin, ei pop-upin ensimmäiseen virkkeeseen.** Jos luvut kerrotaan,
  kerro molemmat, älä valitse dramaattisempaa.
- **Lisätieto:** tien varrella, Arefun kylän lähellä, on Poenarin
  linna (45,35386°N, 24,63522°E), joka **oli** Vlad Seivästäjän
  asuinlinna — toisin kuin Bran.

### 5. Tonavan suisto

- **Nimi:** Tonavan suisto (fi-Wikipedia, artikkeli olemassa).
  Paikallinen: Delta Dunării.
- **Tyyppi:** muu (jokisuisto ja luonnonsuojelualue).
- **Koordinaatit:** 45,2°N, 29,5°E — en-Wikipedia "Danube Delta".
  **HUOM:** tämä on koko suiston yleispiste, ei täsmäpaikka.
- **Popup-teksti (n. 440 merkkiä):**

  > Euroopan toiseksi suurin jokisuisto ja maanosan parhaiten
  > säilynyt: yli 4 000 neliökilometriä ruovikkoa, kanavia ja
  > hiekkasärkkiä. Kesäisin täällä on yli 320 lintulajia ja talvella
  > yli miljoona lintua, ja yli puolet koko Euraasian
  > pelikaanikannasta pesii juuri täällä. Asukkaita on kaksi
  > neliökilometriä kohti – vähemmän kuin melkein missään muualla
  > lauhkeassa Euroopassa. Isoisän aikaan 1873 suisto kuului yhä
  > Ottomaanien valtakuntaan.

- **Lähde:** en-Wikipedia "Danube Delta", johdanto (Euroopan toiseksi
  suurin ja parhaiten säilynyt suisto, 4 152 km²), osio "Main
  ecosystems" (yli 320 lintulajia kesällä, yli miljoona talvehtivaa
  lintua), osio "Inhabitants" (2 asukasta/km², "one of the least
  inhabited regions of temperate Europe") ja osio "History" (Pariisin
  rauha 1856 antoi suiston Ottomaanien valtakunnalle; raja siirtyi
  1878). Pelikaanit: en-Wikipedia "Great white pelican" ("More than
  50% of Eurasian great white pelicans breed in the Danube Delta in
  Romania").
- **Commons:** **Danube Delta 2024-09-25 - 47 - flock of Great white
  pelicans.jpg** (6000×4000, CC BY-SA 4.0, Joe Mabel, 2024).
  Aikalaisvaihtoehto: **Danube mouths 1867.JPG** (4064×3088, public
  domain, **1867**, Heinrich Kiepert) — kartta suistosta kuusi vuotta
  ennen isoisän matkaa. Villihevosista: **Pădurea Letea Nature
  Reserve 021.jpg** (5908×3833, CC BY-SA 4.0, Joe Mabel).
- **Lisätieto:** suistossa elää Letean metsän villihevoslauma
  (ks. takyt-bukarest.md, eläintäky E3) — hyvä toinen pop-up-versio
  samalle kohteelle.

### 6. Iloinen hautausmaa (Săpânța, Maramureș)

- **Nimi:** fi-Wikipediassa EI ole artikkelia (haettu "Iloinen
  hautausmaa", "Săpânța" — molemmat "missing"). Suomenkielinen nimi
  Fablen valittava; ehdotus **Iloinen hautausmaa**. Paikallinen:
  Cimitirul Vesel.
- **Tyyppi:** muu (hautausmaa / ulkoilmamuseo).
- **Koordinaatit:** 47,97139°N, 23,69556°E — en-Wikipedia
  "Merry Cemetery".
- **Popup-teksti (n. 400 merkkiä):**

  > Säpänțan kylässä haudat ovat kirkkaanvärisiä puuristejä, joihin
  > on maalattu naiivi kuva vainajan elämästä ja kirjoitettu runo
  > hänestä – usein huumorilla. Ensimmäisen ristin veisti paikallinen
  > taiteilija Stan Ioan Pătraș vuonna 1935, ja 1960-luvulta lähtien
  > tammiristejä on kertynyt yli 800. Hautausmaa poikkeaa tietoisesti
  > eurooppalaisesta tavasta pitää kuolemaa yksinomaan juhlallisena.

- **Lähde:** en-Wikipedia "Merry Cemetery", johdanto (kirkkaanväriset
  hautakivet, naiivit maalaukset, huumori, ulkoilmamuseo; "diverges
  from the prevalent belief ... that views death as something
  indelibly solemn") ja osio "Founder" ("In 1935, Pătraș carved the
  first epitaph and, as of the 1960s, more than 800 of such oak wood
  crosses came into sight").
- **Commons:** **Cimitirul Vesel, Săpânța, Maramureș - (2023) - IMG
  18.jpg** (3024×4235, CC BY-SA 4.0, Chainwit., 2023). Vaihtoehto:
  **Cimitirul Vesel de la Sapanta6.jpg** (2048×1536, CC BY-SA 3.0,
  Paf).
- **HUOM (kirjoitusasu):** kylän nimi on **Săpânța**; älä kirjoita
  "Sapanta" pelitekstiin, vaikka moni Commons-tiedostonimi tekee niin.

### 7. Moldoveanu ja Făgărașin vuoret

- **Nimi:** Moldoveanu (fi-Wikipedia, artikkeli olemassa).
  Paikallinen: Vârful Moldoveanu.
- **Tyyppi:** vuori.
- **Koordinaatit:** 45,6°N, 24,73778°E — en-Wikipedia
  "Moldoveanu Peak".
- **Popup-teksti (n. 380 merkkiä):**

  > Moldoveanu on Romanian korkein huippu, 2 545 metriä, ja se kohoaa
  > Etelä-Karpaattien Făgărașin vuoristossa. Suosituimmat reitit
  > nousevat viereisen Viștea Maren (2 527 m) kautta, ja lähimmät
  > kylät ovat Victoria pohjoisessa ja Câmpulung etelässä. Vuoden
  > 2019 joulukuussa Moldoveanun mukaan nimettiin tähti: XO-1,
  > 536 valovuoden päässä Pohjankruunun tähdistössä.

- **Lähde:** en-Wikipedia "Moldoveanu Peak", johdanto (2 545 m,
  Romanian korkein, Argeșin lääni, Făgărașin vuoret,
  Etelä-Karpaatit), reitit (Viștea Mare 2 527 m, Podragu, Sâmbăta,
  Viștea-laakso), lähimmät asutukset (Victoria/Câmpulung) ja
  tähtinimi ("In December 2019, the star XO-1, located 536 light-years
  away in the constellation Corona Borealis, was named Moldoveanu
  after the mountain").
  **HUOM (lukujen ristiriita):** fi-Wikipedia antaa korkeudeksi
  2 544 m, en-Wikipedia 2 545 m. Peliin **2 545 m** (en-Wikipedia),
  tai jätä desimaali pois sanomalla "reilut 2 500 metriä".
- **Commons:** **Moldoveanu Peak (Romania).jpg** (6704×3136,
  CC BY-SA 4.0, MIHAIL, 2018).
- **Lisätieto:** Karpaateilla elää noin 2 800 ilvestä ja Romaniassa
  noin kuusituhatta ruskeakarhua (ks. takyt-bukarest.md, E1 ja E4) —
  luonteva toinen pop-up-versio tälle kohteelle.

### 8. Rautaportti (ja Ada Kaleh)

- **Nimi:** Rautaportti (fi-Wikipedia, artikkeli olemassa: "Tonavan
  muodostama puhkaisulaakso Serbian ja Romanian rajalla").
  Paikallinen: Porțile de Fier.
- **Tyyppi:** muu (rotko/kanjoni Tonavassa).
- **Koordinaatit:** 44,67111°N, 22,52972°E — en-Wikipedia
  "Iron Gates".
- **Popup-teksti (n. 440 merkkiä):**

  > Tonava kaivautuu tässä Karpaattien ja Balkanin vuorten väliin, ja
  > virta oli vuosisatoja niin vaarallinen, että laivat tarvitsivat
  > paikallisen luotsin – ottomaanien aikaan luotsia kutsuttiin
  > nimellä kalauz, "opas". Vielä 1900-luvulla laivat vedettiin
  > kanavan läpi veturilla. Kun patoja rakennettiin 1960–70-luvulla,
  > vedenpinta nousi 35 metriä ja Ada Kalehin saari jäi pinnan alle:
  > entinen turkkilainen erillisalue, moskeija ja tuhat kujaa.

- **Lähde:** en-Wikipedia "Iron Gates", johdanto (rotko erottaa
  Etelä-Karpaatit Balkanin vuorten esiharjanteista), osio "Navigation
  and channels" (paikalliset luotsit, "called kalauz (from Turkish
  kılavuz, meaning guide, travel leader)"; "until 1973, ships had to
  be dragged upstream along the canal by locomotive"), osio "Dams"
  (rakentaminen alkoi 1964, Iron Gate I 1972, vedenpinta nousi 35 m,
  Ada Kaleh ja viisi kylää, 17 000 asukasta siirrettiin) ja osio
  "Ada Kaleh" ("A former Turkish exclave, it had a mosque and a
  thousand twisting alleys, and was known as a free port and
  smuggler's nest").
- **Commons:** **Ada-Kaleh.jpg** (985×600, public domain,
  1800-luvun loppu) — saari sellaisena kuin isoisä olisi voinut sen
  nähdä. Nykykuva rotkosta: **CazaneleDunarii.JPG** (3264×2448,
  CC BY-SA 2.5, Țetcu Mircea Rareș). Trajanuksen kivilaatta:
  **RC174-Tabula Traiana.JPG** (2592×1944, CC BY 3.0, Rlichtefeld).
- **Varmuus:** VARMA. HUOM: Ada Kaleh oli olemassa vuonna 1873 —
  tämä on pop-upin vahvin isoisä-kytkös ("hän saattoi nähdä sen; sinä
  et voi").

### 9. Constanța

- **Nimi:** Constanța (fi-Wikipedia, artikkeli olemassa).
  Antiikin nimi Tomis.
- **Tyyppi:** kaupunki (satama Mustallamerellä).
- **Koordinaatit:** 44,16667°N, 28,63333°E — en-Wikipedia
  "Constanța".
- **Popup-teksti (n. 445 merkkiä):**

  > Romanian vanhin yhtäjaksoisesti asuttu kaupunki, perustettu
  > kreikkalaisena siirtokuntana Tomis noin 600 eaa. Vuonna 8 jaa.
  > keisari Augustus karkotti tänne runoilija Ovidiuksen, joka vietti
  > elämänsä kahdeksan viimeistä vuotta valittaen kohtaloaan
  > runoissaan Tristia ja Epistulae ex Ponto – hänen mukaansa
  > kaupunki oli "sodan runtelema kulttuurierämaa valtakunnan
  > kaukaisimmalla laidalla". Isoisän aikaan 1873 Constanța oli yhä
  > ottomaanien kaupunki; Romanialle se siirtyi vasta 1878.

- **Lähde:** en-Wikipedia "Constanța", johdanto (Romanian vanhin
  yhtäjaksoisesti asuttu kaupunki, perustettu n. 600 eaa.), osio
  "Ancient history" (Tomis kreikkalaisena siirtokuntana 500-luvulla
  eaa.; "In AD 8, the Roman poet Ovid ... was banished to Tomis by
  Emperor Augustus for the last eight years of his life. He lamented
  his Tomisian exile in his poems Tristia and Epistulae ex Ponto.
  Tomis was 'by his account a town located in a war-stricken cultural
  wasteland on the remotest margins of the empire'.") ja osio "Recent
  history" ("In 1878, after the Romanian War of Independence,
  Constanța and the rest of Northern Dobruja were ceded by the
  Ottoman Empire to Romania").
  **HUOM:** johdanto sanoo perustamisajaksi "around 600 BC" ja
  "Ancient history" -osio "in the 6th century BC" — sama asia, käytä
  "noin 600 eaa.".
- **Commons:** **Statue of Ovid and National History Museum in
  Constantza.jpg** (3124×2082, CC BY-SA 2.0, Alexandru Pănoiu, 2009) —
  Ovidiuksen patsas (Ettore Ferrari, 1887) aukiolla, joka on nimetty
  hänen mukaansa.
- **Lisätieto:** Constanțan kasino (Carol I tilasi 1910, Daniel
  Renard ja Petre Antonescu, art nouveau) on kaupungin tunnetuin
  rakennus, mutta se on 1873-kehyksen ulkopuolella.

### 10. Sarmizegetusa Regia

- **Nimi:** Sarmizegethusa (fi-Wikipedia; "Sarmizegetusa" ohjautuu
  tänne). Paikallinen: Sarmizegetusa Regia.
- **Tyyppi:** muu (antiikin linnoitus ja pyhäkkö, arkeologinen kohde).
- **Koordinaatit:** 45,6219°N, 23,3093°E — en-Wikipedia
  "Sarmizegetusa Regia".
- **Popup-teksti (n. 430 merkkiä):**

  > Daakialaisten pääkaupunki ennen Rooman sotia: kuusi linnoitusta
  > 1 200 metrin korkuisen vuoren päällä Orăștien vuoristossa,
  > linnoitusala lähes 30 000 neliömetriä. Muurit on ladottu
  > tekniikalla, jolla on oma nimensä, murus dacicus. Pyhällä
  > alueella on suuri pyöreä pyhäkkö, jota kutsutaan usein
  > kalenteriksi: puupylväitä D-kirjaimen muotoon, ympärillä puinen
  > kehä ja kivireunus – asetelma muistuttaa jonkin verran
  > englantilaista Stonehengeä.

- **Lähde:** en-Wikipedia "Sarmizegetusa Regia", johdanto (daakialaisten
  pääkaupunki ja tärkein sotilaallinen, uskonnollinen ja poliittinen
  keskus; kuusi linnoitusta 1 200 metrin vuorella Orăștien vuoristossa;
  Grădiștea de Munten kylä, Hunedoaran lääni) ja osio "Layout"
  (murus dacicus, viisi terassia, lähes 30 000 m²; "the large circular
  sanctuary or calendar. It consisted of a setting of timber posts in
  the shape of a D, surrounded by a timber circle which in turn was
  surrounded by a low stone kerb. The layout of the timber settings
  bears some resemblance to the stone monument at Stonehenge in
  England.").
  **HUOM:** artikkeli sanoo "bears some resemblance" — pop-upin on
  sanottava "muistuttaa jonkin verran", EI "on kuin" tai "on
  Romanian Stonehenge".
- **Commons:** **Sarmizegetusa Regia - Sanctuarul mare circular. (Zona
  sacra).jpg** (3872×2592, CC BY-SA 3.0 ro, Calin Jorza, 2011) — juuri
  se pyöreä pyhäkkö. Vaihtoehto: **Murus Dacicus.JPG** (2592×1944,
  public domain, Oroles).
- **Sekaannusvaroitus (lähde varoittaa itse):** älä sekoita tätä
  **Ulpia Traiana Sarmizegetusaan**, joka on Trajanuksen rakentama
  ROOMALAINEN Daakian pääkaupunki noin 40 km:n päässä — se ei ole
  daakialaisten pääkaupunki, ja sekaannus on aiheuttanut vääriä
  johtopäätöksiä jo tutkimuksessa.

### 11. Salina Turda

- **Nimi:** fi-Wikipediassa EI ole artikkelia (haettu "Salina Turda",
  "Turdan suolakaivos" — molemmat "missing"). Suomenkielinen nimi
  Fablen valittava; ehdotus **Turdan suolakaivos**.
- **Tyyppi:** muu (suolakaivos, nykyään käyntikohde).
- **Koordinaatit:** 46,58771°N, 23,78740°E. **HUOM:** en-Wikipedian
  artikkelilla "Salina Turda" EI ole coordinates-tietoa (haku palautti
  "NO COORD"); tämä koordinaatti on Commonsin kautta ja
  **tarkistettava vielä kerran ennen kartalle vientiä**.
- **Popup-teksti (n. 350 merkkiä):**

  > Turdan suolakaivos Durgău-Valea Sărată -alueella avattiin
  > turisteille vasta vuonna 1992, ja siitä tuli nopeasti yksi
  > Transilvanian oudoimmista käyntikohteista: vanhojen kaivoskuilujen
  > pohjalla on maanalainen järvi, jolla soudetaan, ja valaistuja
  > rakennelmia luolan katosta riippumassa. Vuonna 2017 kaivoksessa
  > kävi noin 618 000 vierasta.

- **Lähde:** en-Wikipedia "Salina Turda", johdanto (Durgău-Valea
  Sărată -alue Turdassa, Clujin lääni; avattiin turisteille 1992;
  n. 618 000 kävijää 2017; Business Insider listasi sen 2013
  "25 hidden gems around the world" -listalle).
- **Commons:** **UFO-shaped constructions in the underground lake,
  Mina Terezia, Turda salt mine, Turda, 2017.jpg** (5839×3882, **CC0**,
  DimiTalen, 2017) — maanalainen järvi ja valaistut rakennelmat.
  Vaihtoehto: **Salina Turda 1.jpg** (4752×3168, CC BY 2.0,
  Cristian Bortes).
- **Varmuus:** VARMA lähteen sanomasta. **EPÄVARMA:** kaivoksen ikä ja
  historia (roomalaisajalta alkanut suolanlouhinta) EI ole tässä
  artikkelissa — älä väitä siitä mitään ilman uutta lähdettä.
  Popup-teksti yllä nojaa vain varmennettuun.

### 12. Corvinin linna (Hunedoara)

- **Nimi:** Corvinin linna (fi-Wikipedia, artikkeli olemassa; myös
  "Hunyadin linna"). Paikallinen: Castelul Corvinilor.
- **Tyyppi:** muu (linna).
- **Koordinaatit:** 45,74917°N, 22,88833°E — en-Wikipedia
  "Corvin Castle".
- **Popup-teksti (n. 330 merkkiä):**

  > Hunedoaran goottilais-renessanssilinna on yksi Euroopan
  > suurimmista linnoista ja kuuluu "Romanian seitsemään ihmeeseen".
  > Se tunnetaan myös nimillä Hunyadin linna ja Hunedoaran linna,
  > ja sen tornit, silta ja pihat ovat säilyneet niin ehjinä, että
  > linna on ollut suosittu elokuvien kuvauspaikka.

- **Lähde:** en-Wikipedia "Corvin Castle", johdanto ("a Gothic-
  Renaissance castle in Hunedoara... It is considered one of the
  largest castles in Europe and is one of the Seven Wonders of
  Romania"). **HUOM:** viimeinen virke (elokuvien kuvauspaikka) on
  yleistieto, jota EN varmentanut tästä artikkelista —
  **jätä se pois tai korvaa varmennetulla**, jos tarkkuus on tärkeä.
  fi-Wikipedian mukaan linnan rakensi Anjoun suku 1300-luvulla ja se
  siirtyi vuosisadan puolivälissä Iancu de Hunedoaralle; tätä EI ole
  ristiintarkistettu en-Wikipediasta.
- **Commons:** **Castle of Hunedoara 2019 01.jpg** (2400×2107,
  CC BY-SA 4.0, Pasztilla aka Attila Terbócs, 2019).
- **Varmuus:** OSITTAIN VARMENNETTU — tämä on listan heikoin kohde
  lähdepohjaltaan, koska en-Wikipedian artikkelista haettiin vain
  johdanto-osa. Jos kohde otetaan käyttöön, hae artikkeli kokonaan.

---

## Yhteenveto: koordinaattitaulukko

| # | Kohde | Tyyppi | Koordinaatit | Lähdeartikkeli |
|---|---|---|---|---|
| 1 | Branin linna | muu (linna) | 45,515°N 25,36722°E | Bran Castle |
| 2 | Sighișoara | kaupunki | 46,21694°N 24,79111°E | Sighișoara |
| 3 | Peleșin linna | muu (linna) | 45,35984°N 25,54265°E | Peleș Castle |
| 4 | Transfăgărășan | muu (tie) | 45,5981°N 24,6165°E | Transfăgărășan |
| 5 | Tonavan suisto | muu (suisto) | 45,2°N 29,5°E (yleispiste) | Danube Delta |
| 6 | Iloinen hautausmaa | muu | 47,97139°N 23,69556°E | Merry Cemetery |
| 7 | Moldoveanu | vuori | 45,6°N 24,73778°E | Moldoveanu Peak |
| 8 | Rautaportti | muu (rotko) | 44,67111°N 22,52972°E | Iron Gates |
| 9 | Constanța | kaupunki | 44,16667°N 28,63333°E | Constanța |
| 10 | Sarmizegetusa Regia | muu (arkeologinen) | 45,6219°N 23,3093°E | Sarmizegetusa Regia |
| 11 | Turdan suolakaivos | muu (kaivos) | 46,58771°N 23,78740°E* | Salina Turda |
| 12 | Corvinin linna | muu (linna) | 45,74917°N 22,88833°E | Corvin Castle |

\* Ei en-Wikipedian coordinates-rajapinnasta — tarkistettava uudelleen.

(Vertailuksi pelilaatta Bukarest: 44,4325°N, 26,10389°E —
en-Wikipedia "Bucharest", ei oma kohde tässä listassa vaan laatta
itse. Lisäksi haettuja koordinaatteja, jos kohteita halutaan lisää:
Brașov 45,66667°N 25,61667°E, Cluj-Napoca 46,76667°N 23,58333°E,
Sibiu 45,79278°N 24,15194°E, Iași 47,16222°N 27,58889°E,
Timișoara 45,75972°N 21,23°E, Ploiești 44,94111°N 26,0225°E,
Sinaia 45,35°N 25,55139°E, Poenarin linna 45,35386°N 24,63522°E.)

---

## Hylätyt / epävarmat

1. **Salina Turdan koordinaatti ei tullut en-Wikipedian
   coordinates-rajapinnasta** (ks. kohde 11). Se on ainoa listan
   koordinaatti, joka ei ole samasta lähteestä kuin muut — merkitty
   taulukkoon tähdellä.

2. **Corvinin linna jäi ohuimmaksi** (kohde 12): siitä haettiin vain
   johdanto, joten pop-up-teksti on lyhyt ja yksi sen virkkeistä on
   merkitty varmentamattomaksi. Jos kohteita on pakko karsia
   kymmeneen, tämä ja Salina Turda ovat ensimmäiset pois.

3. **Kaksi lukujen ristiriitaa fi- ja en-Wikipedian välillä**, merkitty
   kohteittain: Branin linna (fi 1382 / en lupa 1377) ja Moldoveanu
   (fi 2 544 m / en 2 545 m). Peliin menee en-Wikipedian versio.

4. **Kolmelle kohteelle ei ole fi-Wikipedian artikkelia** eikä siis
   vahvistettua suomenkielistä nimeä: Peleșin linna, Iloinen
   hautausmaa / Săpânța ja Salina Turda. Nimiehdotukset yllä ovat
   omiani, Fable päättää.

5. **Vlad Seivästäjän syntymäpaikka Sighișoarassa** (kohde 2) on
   lähteessä yhden historioitsijan (Radu Florescu) kantana, ei
   varmennettuna faktana. Pop-up puhuu vain isästä.

6. **Transfăgărășanin kuolonuhrit** on rajattu pop-upin ulkopuolelle
   ikäsopivuuden vuoksi, mutta merkitty kohteen huomioon, koska
   pelkkä "hieno vuoristotie" -kehys olisi epärehellinen.

7. **Cluj-Napoca, Brașov, Sibiu, Iași ja Timișoara** olisivat kaikki
   olleet mahdollisia lisäkohteita (Timișoaralla erityisen vahva
   koukku: en-Wikipedian mukaan se oli Habsburgien monarkian
   ensimmäinen katuvalaistuksen saanut kaupunki 1760 ja
   **ensimmäinen eurooppalainen kaupunki, jonka kadut valaistiin
   sähköllä 1884**). Ne jäivät pois, koska 12 kohteen runko täyttyi ja
   koska niistä haettiin vain johdanto — Timișoaran valaistusväite on
   siis lähteessä, mutta kohteena se vaatisi vielä koko artikkelin
   haun.

8. **Bukarest–Giurgiu-rata (1869) ja Constanța–Cernavodă-rata (1860)**
   vahvistuivat molemmat, mutta ne eivät ole karttakohteita vaan
   kaupunkitason yksityiskohtia — ne kuuluvat takyt-bukarest.md:hen.
