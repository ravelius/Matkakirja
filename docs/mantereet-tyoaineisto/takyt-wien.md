# Täkyehdokkaat: Wien

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten, sama malli kuin
docs/mantereet-tyoaineisto/takyt-rooma.md ja takyt-istanbul.md
(jälkimmäinen eläintäkyjen malli). Kartoitus tehty 25.8.2026.

**HUIPPUANKKURI:** Wienin maailmannäyttely oli käynnissä tasan isoisän
matkavuonna — se avattiin **1.5.1873** ja suljettiin 2.11.1873. Kahdeksan
päivää avajaisten jälkeen Wienin pörssi romahti (9.5.1873), ja kesällä
kaupungissa puhkesi kolera. Isoisä osui siis keskelle vuotta, jossa
sama kaupunki juhli, vararikkoutui ja sairastui yhtä aikaa. Suurin osa
alla olevista täyistä ripustuu tähän vuoteen.

**Tila:** kartoitus. EI koodia, EI muutoksia olemassa oleviin
tiedostoihin. Fable valitsee, mitkä viedään peliin ja missä
sanamuodossa.

## Tarkistustapa

- Wikipedia-artikkelit haettu 25.8.2026 MediaWiki-rajapinnasta
  (`action=query&prop=extracts&explaintext=1&redirects=1`) Nodella,
  `NODE_USE_ENV_PROXY=1`, User-Agent-otsakkeen kanssa. Rajapinta vastasi
  ajoittain 429:llä ("You are making too many requests"); haut uusittiin
  kasvavalla viiveellä (3 s → 6 s → 12 s), jolloin kaikki menivät läpi.
- Ei mitään muistinvaraista. Jokaisen täyn alla on artikkeli, sen osio
  ja lainaus, johon väite nojaa. Saksankielinen Wikipedia on
  1873-aiheissa selvästi tarkempi kuin englanninkielinen; kummankin
  kieli on merkitty lähderiville.
- **Kuvat:** jokaisen ehdotetun Commons-tiedoston olemassaolo, koko,
  lisenssi, tekijä ja **Restrictions-kenttä** on kysytty erikseen
  Commonsin `imageinfo`-rajapinnalla — ei arvattuja tiedostonimiä.
  Kaikki ehdotetut ovat PD, CC0, CC BY tai CC BY-SA, ja kaikkien
  Restrictions on tyhjä.
- **SILMÄTARKISTUS** on merkitty kohteittain. Nyrkkisääntö: elävistä
  eläimistä ja ihmisistä otetut valokuvat on katsottava silmin ennen
  peliin vientiä (nimetty eläinyksilö voi olla kuollut, aitaus voi
  näyttää ahtaalta, kuvassa voi olla tunnistettavia ihmisiä).

---

## Olemassa oleva Wien-sisältö repossa (grep js/packs/)

`grep -rn "[Ww]ien|[Ii]tävalt|[Ss]chönbrunn|Habsburg" js/packs/` antoi
seuraavan. **Alla olevat täyt on valittu kiertämään kaikki nämä.**

- **js/packs/nahtavyysjutut.js** (avain `wien`, rivit n. 1841–2075):
  seitsemän valmista nähtävyysjuttua — **Raatihuone** (1872–1883,
  1575 huonetta, Rathausmann), **Hofburg** (Sydänten krypta, 54
  sydäntä; Wienin kongressi "tanssii muttei etene"), **Valtionooppera**
  (1861–1869, "uponnut aarrearkku", molempien arkkitehtien kuolema),
  **Stephansdom** (230 000 kattotiiltä, Pummerin, katakombien 11 000
  vainajaa), **Belvedere**, **Jättiratas** (1897, Kolmas mies) ja
  **Schönbrunn** (1441 huonetta, **maailman vanhin eläintarha**,
  Mozart 1762, Gloriette).
- **js/packs/kulttuuri-kategoriat.js** (avain `wien`, rivit n.
  1627–2215): "Matkailijan Wien" (Ring, kahvilaperinne Unescon
  listalla, ooppera, Naschmarkt, heurigerit) sekä nostot **"Ratas,
  joka kulkee kävelyä hitaammin"**, **"Keisarin aamiaishuone
  eläintarhan keskellä"** (Kaiserpavillon 1759, kaksitoista tarhaa
  kakunpaloina) ja **"Valkoiset hevoset syntyvät tummina"**
  (lipizzanit). Musiikkikategoriassa **Strauss / Tonava kaunoinen** ja
  **Taikahuilu / Schikaneder**.
- **js/packs/europe-saapumiset.js** (avain `wien`): kahvila,
  hopeatarjotin ja vesilasi; isoisän lause **vuoristovesijohdon
  avaamisesta 1873**.
- **js/packs/europe-questions.js** (avain `wien`): klassinen musiikki,
  Tonava, pääkaupunki, espanjalainen ratsastuskoulu, jättiratas.
  Lisäksi tietoiskut kahvilakulttuurista ja siitä, että **"Wienin
  juomavesi tulee putkia pitkin suoraan Alpeilta, ja vesijohto
  valmistui jo vuonna 1873"**.
- **js/packs/julisteet.js** (avain `wien`): juliste "Wien 1873",
  selite: *"Maailmannäyttely avattiin 1. toukokuuta 1873, mutta
  pörssiromahdus ja kolera pitivät kävijämäärän kaukana tavoitteesta."*
- **js/packs/europe-valokuvat.js** (avain `wien`): Café Bräunerhof,
  **Hochstrahlbrunnen 1873**, Stephansdomin luukammio.
- **js/packs/maakartat.js** (avain `wien`): kaupunkikartta, kohteina
  Raatihuone, Hofburg, Valtionooppera, Stephansdom, Belvedere,
  Jättiratas ja Schönbrunn (kainalokartassa).
- **js/tyohuone-kehitys-data.js**, KAARI_PAKETIT: Wienillä on valmis
  kaaripaketti (ks. raportin loppu) — saapumistekstissä mainitaan jo
  **maailmannäyttelyn rotunda Praterissa** yhdellä virkkeellä ja
  kysymyksessä **Habsburgien kolmiosainen hautaustapa** (kapusiinien
  krypta, sydämet, sisälmykset) ja **kryptan kolkutusseremonia**.

**Johtopäätös:** Ring, kahvilat, jättiratas, Schönbrunnin
eläintarhan ikä ja Kaiserpavillon, lipizzanit, Stephansdomin katto ja
katakombit, oopperatalon arkkitehdit, Strauss, Mozart, kapusiinien
krypta ja "vesijohto 1873" ovat **JO KÄYTÖSSÄ**. Uudet täyt menevät
niiden ohi: **maailmannäyttelyn sisään** (rotunda, romahdus, kolera,
sähkö, Japani, šaahi), **1870-luvun suurtyömaille** (Tonavan uusi
uoma, vesijohdon akveduktit, uusi keskushautausmaa) ja **uusiin
eläinaiheisiin** (kirahvimuoti 1828, hautausmaan kauriit, moa-luurangot,
Anna Sacherin bulldoggit).

---

## Täkyt

### 1. Kupoli, joka oli maailman suurin — ja jonka huipulla seisoi neljä metriä korkea keisarinkruunu

Maailmannäyttelyn tunnukseksi nousi Praterin puistoon **Rotunde**,
pyöreä kupolirakennus, jonka halkaisija oli **108 metriä** ja korkeus
84 metriä. Se oli aikanaan ylivoimaisesti maailman suurin kupoli:
Rooman Pantheonin kupoli, jota se päihitti, on halkaisijaltaan 43,4
metriä. Rotunden ennätys kesti **84 vuotta** — se ylitettiin vasta
1957 Belgradin messuhallilla (109 m). Kupoli lepäsi 32 rautapylvään
varassa, ja sen huipulla oli kullattu, kivin koristeltu **neljä metriä
korkea jäljennös Itävallan keisarinkruunusta**, joka näkyi koko
näyttelyalueelle. Sisätila oli noin 8 000 neliömetriä. Ensimmäiset
piirustukset teki skotlantilainen laivanrakennusinsinööri John Scott
Russell; toteutuksesta vastasi Carl von Hasenauer.

- **Paikka:** Prater, Wien. Näyttelyalue oli n. 233 hehtaaria, josta
  16 hehtaaria rakennettiin — noin viisi kertaa Pariisin 1867-alueen
  (Champ de Mars) koko.
- **Lähde:** de.wikipedia.org/wiki/Rotunde_(Wien), johdanto ja osio
  "Konstruktion"; de.wikipedia.org/wiki/Weltausstellung_1873, osio
  "Ausstellungsgelände und Architektur";
  en.wikipedia.org/wiki/1873_Vienna_World%27s_Fair, osio "Facilities".
- **Lainaus/perustelu:** "Sie war zu ihrer Zeit die mit Abstand größte
  Kuppel der Welt (Durchmesser 108 m). Die Rotunde überbot dabei das
  von 118–125 n. Chr. erbaute Pantheon in Rom (Durchmesser 43,4 m);
  übertroffen wurde sie erst 1957 durch eine Messehalle in Belgrad
  (Durchmesser 109 m)." · "Die Kuppelhöhe betrug 84 Meter... ruhte auf
  32 Eisensäulen... die obere trug eine vergoldete, mit Steinen
  besetzte vier Meter hohe Nachbildung der Kaiserkrone." · "the
  Rotunda (Rotunde), a large circular building in the great park of
  Prater designed by the Scottish engineer John Scott Russell."
- **Kuva:** Commons **Rotunde Weltausstellung 1873.jpg** (1404×1098,
  public domain, Wiener Photographen-Association, 1873) — rotunden
  pääsisäänkäynti harjannostajaisköynnöksin, otettu näyttelyvuonna.
  Vaihtoehdot: **Rotunde construction2.jpg** (1412×1016, PD, Johann
  Baptist Obernetter, kuvattu 19.10.1872) rakennusaikainen ja
  **Weltausstellungsgelände-Wien-1873.jpg** (2166×1503, PD, Wien
  Museum, 1873) ilmakuva koko alueesta.
- **Varmuus:** VARMA — suoraan lähteessä. **HUOM:** Pantheonin kupoli
  on jo pelissä (nahtavyysjutut.js, `rooma`), joten vertailu 108 m vs.
  43,4 m toimii pelin sisäisenä ristiinviittauksena — mutta muista,
  että Pantheon on yhä maailman suurin *teräksetön* betonikupoli
  (europe-questions.js sanoo tämän jo). Ne eivät ole ristiriidassa:
  Rotunde oli terästä.

### 2. Wien menetti maamerkkinsä yhdessä iltapäivässä — kupolissa oli 400 tonnia puuta

Rotundea ei purettu näyttelyn jälkeen, koska rahat loppuivat: näyttelyn
alijäämä oli noin 15 miljoonaa guldenia. Niinpä siitä tuli ensin
kaupungin varasto (1877–1878) ja sitten Wienin oma maamerkki, jossa
pidettiin sirkusnäytöksiä, sähkönäyttely 1883, musiikkinäyttely 1892 ja
vuoden 1898 autonäyttely. **17. syyskuuta 1937** kello 12.36 kaksi
paloilmoitinta hälytti yhtä aikaa. Tuli oli lähtenyt yhdestä kantavasta
kupolipylväästä ja levisi rappauksen ja peltiverhouksen välisissä
onteloissa niin, ettei sitä ulkoa edes nähnyt. Peltikatto esti
sammutusveden pääsyn puuosiin, ja kupolissa oli **400 tonnia puuta**.
Kello 13.30 miehistö vedettiin ulos sortumisvaaran takia — kolme
minuuttia myöhemmin kupoli romahti. Seuraavan päivän Das Kleine Blatt
julkaisi otsikon *"Wien hat keine Rotunde mehr!"*

- **Paikka:** Prater; palopaikalle pääsi vain 15–18 metrin korkeudessa
  olleita portaita pitkin.
- **Lähde:** de.wikipedia.org/wiki/Rotunde_(Wien), osiot "Geschichte"
  ja "Brand".
- **Lainaus/perustelu:** "Das Defizit der Weltausstellung betrug ca.
  15 Millionen Gulden. So fehlten die finanziellen Mittel für den
  ursprünglich geplanten Abriss des Gebäudes." · "Das Hauptgebäude
  geriet am 17. September 1937 in Brand... Gemeldet wurde er unabhängig
  über zwei Brandmelder von verschiedenen Standorten um 12:36 Uhr." ·
  "So brannte die Kuppel, in der 400 t Holz verbaut waren, rasch ab.
  Um 13:30 mussten die Löschmannschaften... den Rückzug antreten...
  Tatsächlich stürzte die Kuppel drei Minuten später ein." · "Das
  Kleine Blatt vom 18. September 1937 berichtete mit der Schlagzeile
  Wien hat keine Rotunde mehr!"
- **Kuva:** Commons **Rotunde Brand2.jpg** (498×754, CC BY-SA 3.0,
  Wjoksch, kuvaus "Brand der Rotunde am 17. September 1937") — pieni,
  tarkista riittääkö. Isompi ja rauhallisempi vaihtoehto:
  **Rotunde im Prater.jpg** (677×541, public domain, Michael
  Frankenstein, 1873–1898) rakennus ehjänä.
- **Varmuus:** VARMA — suoraan lähteessä. **IKÄSOPIVUUS:** palosta ei
  kerrota uhreja lähteessä, eikä niitä pidä keksiä. Kerro rakennuksen
  loppu, ei ihmisten.

### 3. Kahdeksan päivää avajaisten jälkeen pörssi suljettiin poliisivoimin

Keisari Franz Joseph avasi näyttelyn 1.5.1873 sanoen, että
Itävalta-Unkari on "kaikin puolin ilahduttavassa nousussa". Kupla oli
silloin jo puhkeamassa. **9. toukokuuta 1873** aamulla ilmoitti
maksukyvyttömyydestään Adolf Petschek, jota kutsuttiin "meklarikaupan
kuninkaaksi". Samana aamupäivänä kaatui **120 muuta pankkia**, ja kello
13 poliisi sulki pörssin. Päivä jäi Itävallan historiaan nimellä
**"musta perjantai"**. Romahdus levisi Berliiniin ja 19.9.1873 New
Yorkiin, jossa Jay Cooke & Companyn kaatuminen sulki New Yorkin pörssin
ensimmäistä kertaa sen historiassa — kymmeneksi päiväksi. Isoisä
saapui kaupunkiin, joka oli juuri avannut maailmalle ovensa ja
menettänyt samalla viikolla rahansa.

- **Paikka:** Wienin pörssi; näyttelyalue Praterissa.
- **Lähde:** de.wikipedia.org/wiki/Gründerkrach (haettu hakusanalla
  "Wiener Börsenkrach"), osio "Wiener Börsenkrach von 1873";
  en.wikipedia.org/wiki/Panic_of_1873, osiot "Germany and
  Austria-Hungary" ja "Jay Cooke & Company fails".
- **Lainaus/perustelu:** "Am 1. Mai 1873 eröffnete Kaiser Franz Joseph
  I. die Weltausstellung mit dem Satz, Österreich-Ungarn sei 'nach
  allen Richtungen in erfreulichem Aufschwunge begriffen'. Dabei war
  die Spekulationsblase zu dieser Zeit bereits am Platzen." · "In den
  Morgenstunden des 9. Mai 1873 brach der Damm. Als erster gab Adolf
  Petschek seine Zahlungsunfähigkeit bekannt, der als 'König der
  Maklergeschäfte' galt... Noch am gleichen Vormittag wurden 120
  weitere Banken insolvent. Um 13 Uhr wurde die Börse polizeilich
  geschlossen. Dieser Tag ging auch als 'Schwarzer Freitag' in die
  Geschichte Österreichs ein." · "The New York Stock Exchange closed
  for ten days starting on 20 September."
- **Kuva:** Commons **Weltausstellungsgelände-Wien-1873.jpg**
  (2166×1503, public domain, Wien Museum -aineistoa, kuva 1873) —
  ilmakuva näyttelyalueesta romahdusvuonna.
- **Varmuus:** VARMA — suoraan lähteissä. **EI VARMENNETTU:** en
  löytänyt Commonsista yhtään tarkistettua kuvaa itse pörssistä tai
  romahduspäivästä; jos sellainen halutaan, se on haettava erikseen.
  **HUOM SANAMUOTO:** en-artikkeli mainitsee myös, että pienet
  sijoittajat syyttivät romahduksesta juutalaisia ja että siitä
  seurasi antisemitistinen aalto. Tätä EI oteta täkyyn; jos aihetta
  joskus käsitellään, se kuuluu omaan, harkittuun tekstiinsä.

### 4. Kolera tuli näyttelyvieraiden mukana — 20 miljoonaa odotettiin, 7,25 miljoonaa tuli

Näyttelylle laskettiin 20 miljoonaa kävijää. Tuli 7,25 miljoonaa.
Syitä oli kolme, ja ne osuivat peräkkäin: **sateet**, jotka muuttivat
Praterin suoksi jo päiviä ennen avajaisia; **pörssiromahdus**
toukokuussa; ja kesällä **koleraepidemia** Wienin köyhimmissä
kortteleissa. Wienin viemäröinti ei kestänyt yhtäkkistä
vierasmäärää — lääkäri Leopold Oserin elämäkerta sanoo suoraan, että
tauti puhkesi "maailmannäyttelyn suuren kävijämäärän ja riittämättömän
viemäröinnin seurauksena". Oser oli johtanut yleissairaalan
kolera-osastoa vuodesta 1866 ja teki 1873 uraauurtavaa työtä koleran
hoidossa. Näyttelyn viimeinen päivä 2.11. oli sen vilkkain:
**139 037 kävijää**. Tappio oli noin 15 miljoonaa guldenia.

- **Paikka:** Wienin esikaupungit ja Praterin näyttelyalue.
- **Lähde:** de.wikipedia.org/wiki/Weltausstellung_1873, osiot
  "Aussteller und Besucher" ja Rotunde-osio;
  de.wikipedia.org/wiki/Leopold_Oser, osio "Biographie/Wissen-
  schaftliche Laufbahn"; en.wikipedia.org/wiki/1873_Vienna_World%27s_Fair,
  osio "History".
- **Lainaus/perustelu:** "Eine Fülle an unglücklichen Ereignissen, wie
  schwere Regengüsse Tage vor der Eröffnung, wodurch sich der Prater in
  ein Sumpfgelände verwandelte, der Wiener Börsenkrach kurz nach
  Eröffnung... sowie eine ausbrechende Choleraepidemie in den Wiener
  Elendsvierteln, hielt in den ersten Monaten viele Besucher fern." ·
  "20 Millionen Besucher wurden erwartet, jedoch nur 7,25 Millionen
  haben die Weltausstellung besucht. Der 2. November war der letzte
  und gleichzeitig mit 139.037 Personen der meistbesuchte Tag." · "In
  Wien brach infolge der großen Anzahl der Besucher der Weltausstellung
  1873 und der unzulänglichen Kanalisation die Cholera aus. So war es
  kein Zufall, dass Oser Bahnbrechendes auf dem Gebiet der
  Cholerabehandlung leistete." · "The target of 20 million visitors was
  not reached due to a cholera outbreak and a stock exchange crash."
- **Kuva:** Commons **Leopold Oser (1839-1910).jpg** (239×344, public
  domain, muotokuva Leopold Horowitz, fotogravyyri Josef Löwy, n. 1900)
  — pieni, tarkista riittääkö. Isompi vaihtoehto: **Oser
  Krankenvisite.png** (1532×1112, CC0, Österreichs illustrierte
  Zeitung) — Oser lääkärinkierrolla poliklinikalla.
- **Varmuus:** VARMA kävijäluvuista ja syistä. **EPÄVARMA:** en
  löytänyt Wikipediasta lukua Wienin vuoden 1873 koleran uhreista
  (vuoden 1830–31 epidemian n. 2 000 kuollutta on eri asia, älä sekoita
  niitä). Jätä uhriluku pois tai sano "kesän epidemia".
  **IKÄSOPIVUUS:** kerrottavissa asiallisesti — tauti, syy, seuraus
  kävijämäärään; ei kuolinkuvauksia.

### 5. Wienissä kytkettiin kone väärin päin — ja huomattiin vahingossa, että sähkön voi lähettää johtoa pitkin

Belgialainen Zénobe Gramme oli rakentanut parannellun tasavirtageneraat-
torin, ja hänen yhtiökumppaninsa, ranskalainen insinööri Hippolyte
Fontaine, toi koneen Wienin maailmannäyttelyyn. Siellä he **huomasivat
vahingossa, että laite toimii myös toisin päin**: kun siihen johdettiin
tasavirtaa, se ei tuottanut sähköä vaan alkoi pyöriä. Näin syntyi
ensimmäinen teollisesti käyttökelpoinen sähkömoottori — ennen sitä
sähkömoottorit olivat leluja ja laboratoriokuriositeetteja. Samalla
näyttelyllä Fontaine osoitti, että sähkön voi **siirtää kahden
kilometrin päähän kuparijohtoa pitkin**. Kaksi vuotta myöhemmin,
1875, nuori Nikola Tesla näki Gramme-koneen Grazin teknillisessä
korkeakoulussa ja sai siitä idean vaihtovirrasta.

- **Paikka:** näyttelyn konehalli Praterissa (halli oli 800 metriä pitkä
  ja sen näyttelypinta-ala 40 000 m²).
- **Lähde:** en.wikipedia.org/wiki/Hippolyte_Fontaine, johdanto;
  en.wikipedia.org/wiki/Zénobe_Gramme, osiot "Career" ja "Gramme
  machine as motor"; konehallin mitat
  de.wikipedia.org/wiki/Weltausstellung_1873, kohta "Bedeutende
  Bauwerke".
- **Lainaus/perustelu:** "he accompanied Gramme to the Weltausstellung
  1873 Wien, where he demonstrated the reversibility of the electrical
  generator and the transmission of electricity over a two-kilometre
  distance via copper wiring." · "In 1873 he and Hippolyte Fontaine
  accidentally discovered that the device was reversible and would spin
  when connected to any DC power supply. The Gramme machine was the
  first usefully powerful electrical motor that was successful
  industrially. Before Gramme's inventions, electric motors attained
  only low power and were mainly used as toys or laboratory
  curiosities." · "In 1875, Nikola Tesla observed a Gramme machine at
  the Graz University of Technology."
- **Kuva:** Commons **Machine Gramme.jpg** (2832×2128, CC BY-SA 4.0,
  Icone5, 2007) — kuvaustekstin mukaan "Dynamo Gramme N°14 built by
  Mignon and Rouart in **1873**", eli juuri sen vuoden konetyyppi.
- **Varmuus:** VARMA — Fontaine-artikkeli nimeää Wienin näyttelyn
  suoraan. **HUOM:** Gramme-artikkeli sanoo vain "in 1873" ilman
  paikkaa; Wien-kytkös on Fontaine-artikkelista. Käytä sitä lähteenä.

### 6. ELÄINTÄKY: keisari hämmästyi luurankoja linnusta, jota ei ollut enää olemassa

Uusi-Seelanti toi Wieniin maorien nuijia, mattoja ja viittoja, kultaa,
puutöitä, kauri-pihkaa ja geologisia näytteitä — sekä lintukokoelman,
jonka oli valmistanut lontoolainen eläintentäyttäjä. Kaikkein eniten
huomiota sai kuitenkin **pari moa-luurankoa** Christchurchin Canterbury
Museumista. Moat olivat siivettömiä jättiläislintuja, jotka olivat
kuolleet sukupuuttoon Uudessa-Seelannissa vuosisatoja aiemmin. Keisari
Franz Josephin kerrotaan olleen luurankojen edessä "hämmästynyt".
Uusiseelantilaiset saivat näyttelystä yli 50 palkintoa — mutta
moa-luurangot eivät ilmeisesti sarjoitusvirheen takia olleet niiden
joukossa.

- **Paikka:** Uuden-Seelannin osasto, Wienin maailmannäyttely 1873.
  Luurangot olivat Canterbury Museumin kokoelmista (Christchurch —
  Uuden-Seelannin kaupunki, jolla on repossa oma faktapohja,
  faktapohja-christchurch.md).
- **Lähde:** en.wikipedia.org/wiki/1873_Vienna_World%27s_Fair, osio
  "New Zealand pavilion".
- **Lainaus/perustelu:** "New Zealand was represented at the 1873
  Vienna World's Fair by a collection of Māori clubs, mats and cloaks,
  as well as gold, woodwork, kauri gum and geological specimens...
  A collection of birds was prepared by a London taxidermist and
  Emperor Franz Joseph I of Austria-Hungary was said to have been
  'astonished' by a pair of moa skeletons from the Canterbury Museum.
  More than 50 awards were collected by New Zealand exhibitors but,
  apparently, because of a problem of categorisation on the part of the
  jurors, the moa display was not among them."
- **Kuva:** Commons **Moa skeletons exhibition, 1870, Canterbury
  Museum, 2016-01-27.jpg** (3713×2928, public domain, tekijä
  tuntematon, kuva vuodelta **1870**, luokiteltu Julius von Haastin
  aineistoksi) — aikalaisvalokuva samasta museosta kolme vuotta ennen
  Wieniä. Nykykuva samasta salista: **Moa skeletons, Canterbury Museum,
  2016-01-27.jpg** (4752×3168, public domain, Szilas, 2016).
- **Varmuus:** VARMA lähteen mukaan, mutta huomaa sen oma varaus:
  keisarin hämmästyksestä sanotaan "was said to have been" — siis
  kerrotaan, ei todisteta. Sano "kerrotaan hämmästyneen".
  **HUOM:** täky kytkee Wienin ja Christchurchin toisiinsa, mikä on
  pelille arvokasta — sama esine kahdella laudalla.

### 7. Japani rakensi Wieniin puutarhan ja pyhäkön — ja paluumatkalla laiva upposi

Japani sai kutsun näyttelyyn 1871, heti Meiji-restauraation jälkeen, ja
perusti sitä varten oman hallintovirastonsa. Maasta lähetettiin Wieniin
41 virkamiestä ja tulkkia sekä **25 käsityöläistä ja puutarhuria**,
jotka rakensivat paviljongin, kokonaisen japanilaisen puutarhan
pyhäkköineen ja pienoismallin Tokion keisarillisen temppelin pagodista.
Mukana oli 24 insinööriä, joiden tehtävä oli opiskella länsimaista
tekniikkaa Japanin teollisuutta varten. Esineistö kerättiin
maakunnittain kahtena kappaleena: toinen Wieniin, toinen Japaniin
jäävään kokoelmaan — ja siitä toisesta sarjasta kasvoi lopulta Tokion
kansallismuseon peruskokoelma. Paluumatka päättyi huonosti: ranskalainen
laiva **Le Nil** lähti Triestestä kohti Japania 192 laatikkoa lastinaan
ja **upposi Izun niemimaan edustalla 20.3.1874**. Osa taide-esineistä
saatiin myöhemmin nostettua, muun muassa Ogata Kenzanin viinirypäleillä
koristeltu neliömäinen keramiikkavati.

- **Paikka:** Japanin paviljonki näyttelyalueella; haaksirikko Izun
  niemimaan edustalla Japanissa.
- **Lähde:** en.wikipedia.org/wiki/1873_Vienna_World%27s_Fair, osio
  "Japanese pavilion"; de.wikipedia.org/wiki/Weltausstellung_1873, osio
  "Aussteller und Besucher".
- **Lainaus/perustelu:** "24 engineers were also sent with its
  delegation to study cutting-edge Western engineering at the fair for
  use in Japanese industry." · "Forty-one Japanese officials and
  government interpreters... came to Vienna to oversee the pavilion...
  25 craftsmen and gardeners created the main pavilion, as well as a
  full Japanese garden with shrine and a model of the former pagoda at
  Tokyo's imperial temple." · "they eventually formed the core
  collection of the institution that became the Tokyo National Museum."
  · "Le Nil, a French Ship, set off from the port of Triest to Japan
  loaded with a number of items from the fair, in total 192 boxes. It
  sank off the Izu Peninsula on March 20, 1874. Some items of art were
  later recovered. One of the items is a ceramic square dish with
  grapes by Ogata Kenzan."
- **Kuva:** **EI LÖYTYNYT** tarkistettua Commons-kuvaa Japanin
  paviljongista eikä Le Nilistä (hakusanat "Japanischer Garten
  Weltausstellung 1873", "Ogata Kenzan dish Le Nil" antoivat vain
  kirjadigitointeja). Korvaava yleiskuva: Commons **Eingangstor
  Weltausstellung 1873.jpg** (2109×1559, public domain, Michael
  Frankenstein, kuvattu 25.7.1872) — näyttelyn pääportti.
- **Varmuus:** VARMA — suoraan lähteessä. **HUOM:** de-artikkeli sanoo
  japanilaisten rakentaneen jäljennöksen "Kioton temppelistä", en-
  artikkeli Tokion keisarillisen temppelin pagodista. Ristiriita on
  lähteiden välinen; turvallisin muoto pelitekstiin on "jäljennös
  japanilaisesta temppelistä" ilman kaupunkia.

### 8. Persian šaahi tuli katsomaan näyttelyä — ja 40 000 muuta tuli katsomaan häntä

Näyttelyn suurin yleisömagneetti ei ollut kone eikä rakennus vaan
vieras. **Naser al-Din**, Persian šaahi, saapui 29.7.1873
erikoisjunalla Penzingin asemalle noin 60 hengen seurueen kanssa
ensimmäisellä Eurooppa-matkallaan. Sinä päivänä näyttelyyn päästettiin
**40 000 uteliasta kävijää**. Šaahi majoittui Laxenburgin linnaan ja
kirjoitti käynnistään pitkästi omaan käsin kirjoitettuun
matkapäiväkirjaansa. Persian oma paviljonki oli kaksikerroksinen,
keskeissuunnitelmainen rakennus, jonka pylväsportiikki näytti läntisen
arkkitehtuurin vaikutuksen kadžaarien Persiassa; ulos oli pystytetty
teltta, jolla esiteltiin paimentolaisten elämää. Näyttelyn virallinen
kirja kutsui rakennusta "merkittäväksi", Scientific American
"moderniksi".

- **Paikka:** näyttelyalue ja Laxenburgin linna Wienin eteläpuolella.
- **Lähde:** de.wikipedia.org/wiki/Weltausstellung_1873, osio
  "Aussteller und Besucher"; en.wikipedia.org/wiki/
  1873_Vienna_World%27s_Fair, osio "Persian pavillion".
- **Lainaus/perustelu:** "Die größte Publikumsattraktion war der Besuch
  von Naser al-Din, Schah von Persien... 40.000 neugierige Besucher
  wurden an diesem Tag eingelassen. Der Schah traf mit einem Gefolge
  von ca. 60 Personen am 29. Juli 1873 in einem 'Separathofzug' am
  Penzinger Bahnhof ein." · "Naser al-Din Shah Qajar visited 1873
  Vienna Fair and Persian pavillion, in his first European journey and
  wrote about it extensively, in his handwritten travelogue."
- **Kuva:** Commons **Naser al-Din Shah Qajar, close up, with slight
  smile by Nadar.jpg** (2470×3240, public domain, Nadar; päiväys
  "1873, 1878, or 1889 — dates of his visits to Europe") — Nadarin
  studiomuotokuva juuri näiltä Eurooppa-matkoilta.
- **Varmuus:** VARMA vierailusta ja kävijäluvusta. **RAJAUS
  (tärkeä):** de-artikkeli jatkaa kertomalla, että šaahi jätti Wienin
  kauppoihin maksamattomia laskuja ja että Laxenburg jouduttiin
  remontoimaan — ja selittää sen "maan tavaksi". Tämä osuus on
  aikalaislehdistön ivaa toistava ja etnisesti leimaava; **EI mukaan**.
  Käytä tasan yllä olevaa: vierailu, 40 000 kävijää, päiväkirja,
  paviljonki.

### 9. Näyttelyllä oli oma nurkka, jossa Wien katsoi itään — ja siitä syntyi valokuvakirja

Ottomaanien valtakunnan osaston järjesti arkeologi ja taidemaalari
**Osman Hamdi Bey** yhdessä ranskalaissyntyisen ottomaanivirkamiehen
Victor Marie de Launayn kanssa. Paviljonki nousi Egyptin paviljongin
viereen rotunden ulkopuoliseen puistoon, ja siihen rakennettiin
pienoismalleja: jäljennös **sulttaani Ahmed III:n suihkulähteestä**
Topkapın palatsista, malli-istanbulilaistalo, hamam, kahvila ja basaari.
Sisällä oli galleria mallinukkeja valtakunnan eri kansojen puvuissa.
Pukukokoelman täydennykseksi Osman Hamdi ja de Launay tekivät
valokuvakirjan **Elbise-i 'Osmaniyye**, jonka kuvat otti Pascal Sébah.
Koko näyttelyn asetelma oli tarkoituksellinen: länsimaiden paviljongit
oli asetettu itämaisia vastaan, ja isäntä Itävalta-Unkari itse
näiden väliin.

- **Paikka:** ottomaanien paviljonki rotunden ulkopuolisessa puistossa,
  Egyptin paviljongin vieressä.
- **Lähde:** en.wikipedia.org/wiki/1873_Vienna_World%27s_Fair, osio
  "Ottoman pavilion".
- **Lainaus/perustelu:** "Osman Hamdi Bey, an archaeologist and
  painter, was chosen by the Ottoman government as commissary of the
  empire's exhibits in Vienna. He organized the Ottoman pavilion with
  Victor Marie de Launay... The Ottoman pavilion... included small
  replicas of notable Ottoman buildings and models of vernacular
  architecture: a replica of the Fountain of Ahmed III at Topkapı
  Palace, a model Istanbul residence, a representative hamam, a cafe,
  and a bazaar." · "The Vienna exhibition set off Western nations'
  pavilions against Eastern pavilions, with the host, the
  Austro-Hungarian Empire, setting itself at the juncture between East
  and West." · "Osman Hamdi and de Launay created a photographic book
  of Ottoman costumes, the Elbise-i 'Osmaniyye... with photographs by
  Pascal Sébah."
- **Kuva:** **EI LÖYTYNYT** tarkistettua Commons-kuvaa ottomaanien
  paviljongista eikä Elbise-kirjasta (haut "Ottoman pavilion Vienna
  1873", "Pascal Sebah Elbise", "Osman Hamdi Bey Elbise-i Osmaniye"
  eivät tuottaneet käyttökelpoista tiedostoa). Käytä yleiskuvaa
  **Rotunde im Prater.jpg** (677×541, PD, Michael Frankenstein) tai jätä
  täky kuvattomaksi.
- **Varmuus:** VARMA — suoraan lähteessä. **HUOM:** täky kytkee Wienin
  suoraan Istanbuliin, joka on pelilaatta ja jolla on oma
  fokusaineisto (takyt-istanbul.md, js/packs/istanbul.js). Topkapı ja
  Ahmed III:n suihkulähde kannattaa tarkistaa Istanbul-aineistosta,
  ettei sama fakta toistu kahdesti.

### 10. ELÄINTÄKY: yksi kirahvi muutti koko kaupungin muodin

Schönbrunnin eläintarha sai ensimmäisen kirahvinsa **vuonna 1828**
lahjaksi Egyptin varakuninkaalta. Eläin herätti sellaisen innostuksen,
että se levisi muotiin, käsitöihin ja seuraelämään: kirahvikuvioita
ilmestyi vaatteisiin, kenkiin ja käyttöesineisiin, ja sen kunniaksi
keksittiin uusia kampauksia, hajuvesi, näytelmä ja kaksi
sävellystä. Isoisän matkavuoteen 1873 mennessä muoti oli tietysti
mennyt ohi — mutta eläintarha oli yhä pystyssä, keisariperheen
yksityisomaisuutena aina vuoteen 1918 asti.

- **Paikka:** Tiergarten Schönbrunn, Wien (48,1845°N, 16,3119°E, sama
  koordinaatti kuin pelin maakartan Schönbrunn-kohteella).
- **Lähde:** en.wikipedia.org/wiki/Schönbrunn_Zoo (haettu nimellä
  "Tiergarten Schönbrunn"), osio "In the 19th century" ja "Founding and
  early years".
- **Lainaus/perustelu:** "In 1828, Schönbrunn Zoo received its first
  giraffe as a gift from the Viceroy of Egypt. Its arrival sparked a
  widespread fascination, influencing fashion, handicrafts, and social
  life in Vienna. Giraffe motifs adorned clothes, shoes, and utensils,
  while new hairstyles, a perfume, a theatrical play, and two musical
  compositions inspired by the giraffe were created." · "The complex
  remained the private property of the imperial family until the
  dissolution of the Austro-Hungarian Empire in 1918."
- **Kuva:** Commons **Eduard Gurk - Die erste Giraffe im Schönbrunner
  Tiergarten - 1828.jpeg** (3702×2718, public domain, Eduard Gurk,
  1828) — juuri se kirahvi, maalattuna sinä vuonna kun se saapui.
- **Varmuus:** VARMA — suoraan lähteessä. **HUOM PÄÄLLEKKÄISYYS:**
  eläintarhan perustaminen 1752, sen ikä ja Kaiserpavillon ovat jo
  pelissä (nahtavyysjutut.js ja kulttuuri-kategoriat.js). Kirahvi ei
  ole — se on uusi kulma vanhaan kohteeseen.

### 11. ELÄINTÄKY: ensimmäinen eläintarhassa siitetty norsu syntyi Wienissä — ja sodan jälkeen tarhassa oli enää 400 eläintä

Schönbrunnin ensimmäinen norsu, intiannorsu, saapui **1770**;
ensimmäiset pedot, sudet ja karhut, **1781**. Vuonna **1906**
Schönbrunnissa syntyi maailman ensimmäinen eläintarhassa siitetty
norsu. Sotavuodet olivat tarhalle raskaat: ensimmäisen maailmansodan
jälkeen eloon jäi enää **400 eläintä**, ja tarha selvisi ainoastaan
siksi, että wieniläiset järjestivät sille avustuskeräyksen ja
lahjoittivat sekä eläimiä että tarvikkeita. Toisen maailmansodan
pommitukset tappoivat yli tuhat eläintä ja jäljelle jäi 300. Sana
"menageria" vaihdettiin virallisesti sanaan "eläintarha" vuonna 1926.
Nykyään tarhassa on noin 707 lajia ja 8 250 yksilöä, ja se on yksi
maailman 27 eläintarhasta, joissa on isopandoja.

- **Paikka:** Tiergarten Schönbrunn, 17 hehtaaria; Unescon
  maailmanperintökohde osana Schönbrunnin puistoa.
- **Lähde:** en.wikipedia.org/wiki/Schönbrunn_Zoo, johdanto ja osiot
  "Founding and early years", "In the 19th century", "World Wars and
  the 20th century".
- **Lainaus/perustelu:** "The first elephant, an Indian elephant,
  arrived at the zoo in 1770, and the first predators—wolves and
  bears—arrived in 1781." · "In 1906, the first elephant to be
  conceived in a zoological garden was born on its grounds." · "Only
  400 animals survived World War I due to supply shortages and
  associated hygiene problems... The zoo was able to endure thanks to
  the residents of Vienna, who organized a relief campaign and donated
  animals and materials to sustain the institution." · "As of 2021, it
  presented a total of 707 different species with around 8,250
  specimens... being one of only 27 zoos in the world to house them."
- **Kuva:** Commons **Elefenaten Tiergarten Schönbrunn.jpg**
  (2240×1488, CC BY 3.0, Ulrichulrich, 2011) tai **Elefant Kibali im
  Tiergarten Schönbrunn.jpg** (3191×2128, CC BY-SA 4.0,
  MathiasSeyfert, 2019).
  **SILMÄTARKISTUS PAKOLLINEN:** molemmat ovat kuvia elävistä
  eläimistä. Kibali on nimetty yksilö, jonka tilanne on voinut muuttua
  vuoden 2019 jälkeen; jos nimeä käytetään, se on tarkistettava
  erikseen, muuten kuvatekstissä ei pidä nimetä yksilöä. Tarkista myös
  aitauksen ilme kuvassa.
- **Varmuus:** VARMA — suoraan lähteessä. **RAJAUS:** artikkeli kertoo
  myös, että ensimmäisen maailmansodan aikana eläimiä teurastettiin
  toisten eläinten ruoaksi ja että katkeroitunut sotilas ampui
  jääkarhun luullen sitä paremmin ruokituksi kuin itsensä, sekä
  johtaja Otto Antoniuksen itsemurhan 1945. **NÄITÄ EI MUKAAN.**
  Käytä lukua 400, kaupunkilaisten keräystä ja jälleenrakennusta.

### 12. ELÄINTÄKY: hautausmaalla asuu kaksikymmentä kaurista — ja 1980-luvulle asti siellä oli oma metsästäjä

Wienin keskushautausmaa on 2,5 neliökilometriä ja siihen on haudattu
noin kolme miljoonaa ihmistä — enemmän kuin kaupungissa nykyään asuu,
ja noin puolet kaikista wieniläisistä, jotka ovat koskaan eläneet. Koon
ja tiheän puuston takia se on myös luontoalue. Näkyvimpiä asukkaita
ovat oravat, joita wieniläiset kutsuvat nimellä **"Hansi"** ja jotka
ovat tottuneet vierailijoiden pähkinöihin. Suurimpia ovat kuitenkin
**noin 20 kaurista**, jotka viihtyvät mieluiten **vanhan juutalaisen
hautausmaan** alueella, koska vanhojen hautakivien ympärillä kasvaa
ikivihreitä kasveja — luotettava ravinnonlähde kylmään aikaan.
Lisäksi alueella elää tuulihaukkoja, peltohamstereita, mäyriä, näätiä
ja sammakoita. **1980-luvun puoliväliin asti hautausmaa oli virallinen
metsästysalue**, ja riistakantaa hoiti metsähallinnon palkkaama
metsästäjä; nykyään tasapainoa yritetään pitää ilman aseita, ja osa
alueesta jätetään tarkoituksella villiintymään.

- **Paikka:** Wiener Zentralfriedhof, Simmering, Wienin 11. piiri.
  Kuuluu kaupungin itäiseen viherkehään.
- **Lähde:** de.wikipedia.org/wiki/Wiener_Zentralfriedhof, osio "Der
  Friedhof als Naturraum" ja osio kaupunkikuvasta;
  en.wikipedia.org/wiki/Vienna_Central_Cemetery, osio "History and
  description".
- **Lainaus/perustelu:** "Am häufigsten zu beobachten sind die vielen
  Eichhörnchen, die von den Wienern 'Hansi' genannt werden und
  vergleichsweise zutraulich sind... Weniger bekannt sind die größten
  'tierischen Bewohner' des Friedhofs, rund 20 Rehe, die vorzugsweise
  auf dem Areal des alten jüdischen Friedhofs anzutreffen sind, nicht
  zuletzt wegen der dort um die alten Grabsteine wachsenden
  immergrünen Pflanzen... Darüber hinaus bietet der Zentralfriedhof
  Lebensraum für Turmfalken, Feldhamster, Dachse, Marder, Frösche und
  andere Kleintiere." · "Bis Mitte der 1980er Jahre war das
  Friedhofsgelände sogar offizielles Jagdgebiet, und der Wildbestand
  wurde durch einen von der Forstverwaltung eingesetzten Jäger
  kontrolliert." · "Mit drei Millionen Bestatteten 'beherbergt' der
  Zentralfriedhof deutlich mehr Wienerinnen und Wiener als in der Stadt
  von heute Lebende."
- **Kuva:** Commons **Capreolus capreolus Wien Zentralfriedhof
  20221021 01.jpg** (5822×3881, CC BY-SA 4.0, Uoaei1, 2022) —
  kuvausteksti: "Roe deer in the old Israelite section of Central
  Cemetery, Vienna". Vaihtoehto: **Wiener-Zentalfriedhof-Rehe-1.jpg**
  (3436×2291, CC BY-SA 4.0, SchiDD, 2018).
  **SILMÄTARKISTUS:** eläviä eläimiä; tarkista, ettei kuvassa ole
  tunnistettavia nimiä hautakivissä tai ihmisiä.
- **Varmuus:** VARMA — suoraan lähteessä. **IKÄSOPIVUUS:** hautausmaa
  aiheena on 13+:lle sopiva, kun se kerrotaan luontoalueena ja
  kaupungin osana, ei kuoleman kuvauksena. Vältä uhrilukuja ja
  vandalismikohtia, joita artikkelissa on.

### 13. Vainajat aiottiin lähettää hautausmaalle putkipostina

Wienin uusi keskushautausmaa suunniteltiin 1870 ja avattiin
**1.11.1874** — isoisän matkavuonna se oli siis suuri työmaa
kaupungin ulkopuolella. Kaupunki oli päättänyt sen rakentamisesta jo
1863, koska Wienin arvioitiin kasvavan neljään miljoonaan asukkaaseen
vuosisadan loppuun mennessä. Ongelma oli matka. Satoja vainajia
viikossa kuljetettiin hevosvaunuilla Simmeringer Hauptstraßea pitkin,
ja loputtomat saattueet alkoivat painaa varren asukkaiden mieltä; jo
ensimmäisenä talvena saattueita jäi jumiin lumeen. Ratkaisuja
ehdotettiin monia. Arkkitehti **Josef Hudetzin** ja insinööri **Franz
von Felbingerin** suunnitelma oli suorastaan futuristinen: vainajat
kuljetettaisiin **putkipostin tapaan paineilmalla pitkässä tunnelissa**,
joka päättyisi hautausmaalle. Sitä ei toteutettu. Hevoset jatkoivat
työtä, ja ensimmäinen moottoroitu ruumisauto otettiin käyttöön vasta
1925 — sitä ennen, vuodesta 1918, arkkuja kuljetti myös raitiovaunun
muunneltu perävaunu.

- **Paikka:** Zentralfriedhof, Simmering, ja Simmeringer Hauptstraße.
- **Lähde:** de.wikipedia.org/wiki/Wiener_Zentralfriedhof, osiot "Der
  ungeliebte neue Friedhof" ja "Der lange Weg zur letzten Ruhe";
  en.wikipedia.org/wiki/Vienna_Central_Cemetery, osio "History and
  description".
- **Lainaus/perustelu:** "The decision to establish a new, big cemetery
  for Vienna came in 1863... City leaders expected that Vienna... would
  grow to four million inhabitants by the end of the 20th century." ·
  "The cemetery was designed in 1870... The cemetery was opened on All
  Saints' Day in 1874." · "Bei hunderten Toten pro Woche, die zur
  damaligen Zeit mit Pferdewagen in die neu entstandene Nekropole
  gebracht werden mussten, prägten diese kaum enden wollenden
  Leichenzüge schon bald das alltägliche Bild der Simmeringer
  Hauptstraße... Schon ab dem ersten Winter kam es immer wieder dazu,
  dass Kondukte im Schnee steckenblieben." · "Geradezu futuristisch war
  der Plan des Architekten Josef Hudetz und des Ingenieurs Franz von
  Felbinger, ähnlich dem Prinzip der Rohrpost die Leichenbeförderung
  pneumatisch in einem langen, beim Zentralfriedhof endenden Tunnel
  durchzuführen."
- **Kuva:** Commons **Wiener-Zentalfriedhof-Tor2.jpg** (3122×2081,
  CC BY-SA 4.0, SchiDD, 2018) — pääportti, jonka pyloneissa on
  kaupungin GW-monogrammi. Vaihtoehto: **Alter Jüdischer Friedhof am
  Zentralfriedhof Wien.jpg** (2600×1976, CC BY-SA 4.0, Jens Schommer,
  2009).
- **Varmuus:** VARMA — suoraan lähteessä. **IKÄSOPIVUUS:** aihe on
  makaaberi mutta kerrottavissa insinöörijuttuna, ei kuolemajuttuna:
  logistiikkaongelma, keksintö, se ettei sitä tehty. Älä kuvaa
  vainajia. Pelin sävylle sopivin kärki on "ehdotus, joka ei
  toteutunut".

### 14. Wieniin kaivettiin uusi joki Suezin kanavan koneilla

Tonava kulki Wienin kohdalla vuoteen 1870 asti täysin sääntelemättä ja
etsi uomansa itse: vuosien 1455 ja 1870 välillä joen uoma siirtyi
Wienin kohdalla keskimäärin 20 metriä ja liikkui 100–130 vuoden
sykleissä kohti kaupunkia ja siitä poispäin. Tulvat uhkasivat
Jedleseen, Floridsdorfin ja Stadlaun kyliä. Kiista siitä, mihin uusi
uoma kaivettaisiin, halvaannutti komission lähes 20 vuodeksi, ja vasta
kun sitä vastustanut Florian Pasetti jäi eläkkeelle 1868, päätös
syntyi. Työt tehtiin **1870–1875**: uusi pääuoma tehtiin **280 metriä
leveäksi**, sen viereen jätettiin 450 metriä leveä tulva-alue ja
vanhasta pääuomasta tuli Alte Donau. Urakoitsija oli ranskalainen
**Castor, Couvreux et Hersent**, sama yhtiö, joka oli työskennellyt
**Suezin kanavalla** — ja se siirsi koneensa sieltä Wieniin. Samalla
rakennettiin viisi uutta Tonavan siltaa. Isoisä näki 1873 työmaan
kesken.

- **Paikka:** Wienin pohjoislaita, nykyiset Floridsdorfin ja
  Donaustadtin piirit. Vanhakaupunki jäi sivu-uoman, Donaukanalin,
  varrelle — kuten pelin maakartan Wien-esittely jo kertoo.
- **Lähde:** de.wikipedia.org/wiki/Wiener_Donauregulierung, osiot "Die
  unregulierte Donau" ja "Die erste Regulierung (ab 1870)";
  de.wikipedia.org/wiki/Donauregulierung, osio "19. Jahrhundert".
- **Lainaus/perustelu:** "Zwischen 1455 und 1870 betrug die
  Laufverlagerung der Donau in Wien durchschnittlich 20 Meter, wobei
  sich der Fluss in Zyklen von 100 bis 130 Jahren in Richtung Stadt
  oder von ihr weg bewegte." · "In den Jahren 1870 bis 1875 wurde die
  Donau demgemäß reguliert... Das neue Hauptbett, das auch der
  Schifffahrt dient, wurde 280 m breit angelegt... Die Arbeiten wurden
  von der französischen Firma Castor, Couvreux et Hersent durchgeführt,
  die auch am Sueskanal gearbeitet hatte und die entsprechenden
  Maschinen nach Wien verlegte." · "Im Zuge der Regulierung wurden fünf
  neue Donaubrücken gebaut."
- **Kuva:** Commons **Karte Donaudurchstich.jpg** (1479×1028, public
  domain, tekijä tuntematon, n. 1870–1875) — aikalaiskartta
  läpikaivannosta.
- **Varmuus:** VARMA — suoraan lähteessä. **EPÄVARMA:** uuden uoman
  avaamispäivä. Artikkelin lähdeluettelossa on Neue Freie Pressen
  juttu "Die Schifffahrt-Eröffnung im neuen Donaubett" 31.5.1875, joten
  laivaliikenne alkoi keväällä 1875 — mutta artikkelin leipäteksti ei
  anna päivämäärää. Sano "valmistui 1875", älä anna päivää.
  **HUOM:** Suezin kanava on jo pelissä useassa kohdassa; tämä täky
  yhdistää sen Wieniin.

### 15. Vuoriston vesi tuotiin Wieniin 95 kilometriä ilman ainuttakaan pumppua — ja urakoitsija maksoi suihkulähteen omasta palkkiostaan

Wienin ensimmäinen vuoristovesijohto, aikanaan nimeltään
**Kaiser-Franz-Josef-Hochquellenleitung**, valmistui neljässä vuodessa
ja avattiin **24. lokakuuta 1873**. Se on **95 kilometriä pitkä** ja
kulkee kokonaan painovoiman varassa Rax- ja Schneeberg-vuorten
lähteiltä kaupunkiin — juuri siksi Wienin rakennusjärjestykset 1859 ja
1868 rajoittivat talojen korkeuden noin 25 metriin: sitä korkeammalle
vesi ei olisi noussut itsestään. Matkalla on **30 akveduktia ja muuta
laaksonylitystä**, jotka kaikki ovat nykyään suojeltuja. Rahoituksesta
sovittiin poikkeuksellisesti: urakoitsija **Antonio Gabrielli** tarjoutui
itse, että hänen palkkiostaan vähennettäisiin yksi prosentti, kunnes
kasaan tulisi 100 000 guldenia — ja niillä rahoilla rakennettaisiin
suihkulähde, joka otettaisiin käyttöön samana päivänä kuin vesijohto.
Niin syntyi **Hochstrahlbrunnen** Schwarzenbergplatzille. Kesällä 1873
kaupunki kärsi vedenpuutteesta, ja Gabriellin kanssa sovittiin töiden
kiirehtimisestä, jotta suuri osa kaupungista saisi vettä jo lokakuussa.
Vesijohto tuottaa yhä yli puolet Wienin juomavedestä.

- **Paikka:** Kaiserbrunn Höllentalissa (Reichenau an der Rax) →
  Wien; suihkulähde Schwarzenbergplatzilla.
- **Lähde:** de.wikipedia.org/wiki/I._Wiener_Hochquellenleitung,
  johdanto ja osiot rakennuskorkeuksista, akvedukteista, rahoituksesta
  ja avajaisista.
- **Lainaus/perustelu:** "Nach vierjähriger Bauzeit wurde die 95
  Kilometer lange Leitung am 24. Oktober 1873 eröffnet. Heute liefert
  sie rund 62 Millionen Kubikmeter pro Jahr (53 Prozent der
  Gesamtmenge des Wiener Trinkwassers, Stand 2007)." · "Entlang der
  I. Hochquellenleitung wurden 30 Aquädukte und sonstige Talquerungen
  errichtet, die heute alle unter Denkmalschutz stehen." · "Mit diesem
  Gemeinderatsbeschluss wurde gleichzeitig das von Anton Gabrielli
  gemachte Angebot angenommen, ihm von allen Verdienstbeträgen so lange
  ein Prozent abzuziehen, bis ein Maximalbetrag von 100.000 Gulden
  erreicht sei. Um dieses Geld sollte ein Brunnen – der spätere
  Hochstrahlbrunnen am Schwarzenbergplatz – errichtet werden, der
  gleichzeitig mit der Hochquellenleitung in Betrieb genommen werden
  sollte." · "Wegen Wassermangels im Jahr 1873 wurde von der
  Stadtverwaltung mit Antonio Gabrielli eine Vereinbarung getroffen,
  die Bauarbeiten so zu beschleunigen, dass bereits im Oktober des
  Jahres weite Teile der Stadt versorgt werden können."
- **Kuva:** Commons **GuentherZ 2009-01-10 0003 Aquaedukt
  Leobersdorf.jpg** (600×402, CC BY-SA 3.0, GuentherZ, 2009) — pieni;
  isompi vaihtoehto **Aquädukt Liesing- Teil der 1. Wiener
  Hochquellenleitung 1.jpg** (4032×3024, CC BY-SA 4.0, Anna Saini,
  2019). Suihkulähteestä: **Wien - Schwarzenbergplatz - View NE along
  Hochstrahlbrunnen 1873.jpg** (3024×2016, CC BY-SA 4.0, Txllxt TxllxT,
  2010).
- **Varmuus:** VARMA — suoraan lähteessä. **PÄÄLLEKKÄISYYSVAROITUS:**
  vesijohto 1873 on JO pelissä kahdessa paikassa (europe-saapumiset.js
  isoisän lauseena ja europe-questions.js tietoiskuna), ja
  Hochstrahlbrunnen on jo europe-valokuvat.js:ssä. Uutta tässä ovat
  **30 akveduktia**, **rakennuskorkeuden 25 metrin raja** ja
  **Gabriellin prosentti**. Käytä vain niitä, älä toista jo kerrottua.
  Nimi on lähteessä kahdessa muodossa (Anton / Antonio Gabrielli) —
  käytä muotoa Antonio, jota artikkeli käyttää useammin, tai jätä
  etunimi pois.

### 16. "Keisari Joosefin kuivakakku" — maailman ensimmäinen vain mielisairaille rakennettu talo

Wienin 9. piirissä seisoo **Narrenturm**, viisikerroksinen rengasrakennus
noin 40 metrin halkaisijalla, jonka keisari Joosef II rakennutti
**1783–1784** osana Wienin terveydenhuollon uudistusta. Ensimmäiset
potilaat siirrettiin sinne 2.4.1784, ja 10.–19. huhtikuuta taloon
tuotiin 109 ihmistä muista Wienin sairaaloista. Jokainen kerros oli oma
osastonsa, ja kerroksessa oli 28 selliä. Talon epätavallinen muoto ja
rakennuttaja synnyttivät wieniläisen pilanimen **"Kaiser Josephs
Gugelhupf"** eli keisari Joosefin kuivakakku — ja vuodesta 1848 alkaen
sanaa Gugelhupf alettiin Wienissä käyttää yleisnimenä koko laitostyypistä.
Rakennus lakkasi olemasta sairaala **1869**, joten isoisän matkavuonna
1873 se oli jo tyhjillään ja toimi henkilökunnan asuntoloina,
varastona ja verstaana. Purkupäätös tehtiin 1902 mutta jäi tekemättä.
Vuodesta 1971 talossa on ollut patologis-anatominen kokoelma, joka on
vuodesta 2012 osa Wienin luonnonhistoriallista museota.

- **Paikka:** Spitalgasse 2, Alsergrund; vanhan yleissairaalan (AKH)
  pohjoispuolella. Omistaja on Wienin yliopisto.
- **Lähde:** de.wikipedia.org/wiki/Narrenturm, johdanto ja osiot
  "Bezeichnung", "Entstehung in der Wiener Gesundheitsreform 1784",
  "Gebäudenutzung" ja "Baubeschreibung". (en-Wikipediassa ei ole
  artikkelia nimellä "Narrenturm (Vienna)".)
- **Lainaus/perustelu:** "Der Narrenturm im 9. Wiener Gemeindebezirk
  Alsergrund ist ein fünfstöckiger Ringbau, der von 1783 bis 1784 unter
  Kaiser Joseph II. errichtet wurde. Bis 1869 war das Gebäude als
  öffentliche psychiatrische Anstalt in Verwendung. Nach wechselnder
  Nachnutzung beherbergt es seit 1971 die Pathologisch-anatomische
  Sammlung, die 2012 in das Naturhistorische Museum eingegliedert
  wurde." · "Von der ungewöhnlichen Rundform und dem Bauherrn leitete
  sich in Wien die scherzhafte Bezeichnung 'Kaiser Josephs Gugelhupf'
  ab, die ab 1848 nachweisbar ist." · "Vom 10. bis zum 19. April 1784
  wurden 109 psychisch Kranke... in den Turm transferiert." · "Ab
  diesem Jahr bis 1993 wurde er als Dienstunterkunft für
  Krankenhauspersonal, Lager und Werkstätte genutzt."
- **Kuva:** Commons **Narrenturm um 1875.jpg** (800×487, CC0, A. F.
  Czihak, n. 1875) — piirros kahden vuoden päästä isoisän matkasta.
  Nykykuva: **Narrenturm NHM Wien 2019-05-31.jpg** (4000×3003, CC BY
  4.0, Herbert Ortner, 2019).
- **Varmuus:** VARMA rakennuksesta, nimestä ja vuosiluvuista.
  **EPÄVARMAA:** rakennuksen arkkitehti on kiistanalainen (Canevale /
  Gerl / Quarin / keisari itse) — älä nimeä yhtä. **28 sellin ja
  kuukalenterin yhteys** on Alfred Stohlin vuoden 2000 spekulaatio,
  ei tosiasia; jätä pois.
  **IKÄSOPIVUUS (tärkeä):** aihe on mielisairaanhoidon historia.
  Kerrottava rakennuksena ja aikakautena — muoto, pilanimi,
  vuosiluvut, se että talo tyhjeni 1869 — EI potilaiden kohtaloina.
  Nykyinen patologis-anatominen kokoelma on preparaattinäyttely;
  sitä ei kuvailla.

### 17. Keisarinna, joka vältti julkisia esiintymisiä, tuli näyttelyyn — ja hänen kampauksensa vei kaksi tuntia

Näyttelyn vieraskirja on kuin Euroopan hoviluettelo: Belgian Leopold
II, Italian Viktor Emanuel II, Preussin kruununprinssi Friedrich,
Walesin prinssi, Tanskan kruununprinssi, Montenegron ruhtinas
Nikolaus I. Mukana oli myös keisarinna **Elisabeth**, "Sisi", vaikka
hän muuten karttoi julkisia esiintymisiä — de-Wikipedia sanoo hänen
hoitaneen edustusvelvollisuutensa. Sisi oli aikansa kuuluisimpia
kaunottaria ja aikaansa nähden epätavallisen pitkä, 173 senttiä.
Hänen hiustensa hoito vei päivittäin useita tunteja: hiukset
punottiin monimutkaisiin kampauksiin, ja niiden painon hän sanoi
aiheuttavan päänsärkyä — helpotukseksi hän sitoi ne nauhoilla kattoon
tai seinäkoukkuihin. Kampaajan, entisen Burgtheaterin
teatterikampaajan **Franziska Feifalikin**, oli kiellettyä käyttää
sormuksia ja pakko käyttää valkoisia hansikkaita, ja tuntien työn
jälkeen irronneet hiukset oli esitettävä keisarinnalle hopeamaljassa
tarkastettaviksi. Kerran kahdessa viikossa hiukset pestiin munan ja
konjakin seoksella — ja sinä päivänä peruttiin kaikki muu.

- **Paikka:** Wienin maailmannäyttely 1873; hovi Hofburgissa ja
  Schönbrunnissa.
- **Lähde:** de.wikipedia.org/wiki/Weltausstellung_1873, osio
  "Aussteller und Besucher"; en.wikipedia.org/wiki/
  Empress_Elisabeth_of_Austria, osiot "Beauty" ja hänen mitoistaan.
- **Lainaus/perustelu:** "Sogar die sonst öffentliche Auftritte
  scheuende Kaiserin Elisabeth kam ihren Repräsentationspflichten
  nach." · "At 1.73 m (5 ft 8 in), Elisabeth was unusually tall for her
  time." · "Daily care of her exceptionally long hair reportedly took
  several hours... She is said to have complained that its weight
  caused headaches, and to relieve her scalp, she would use ribbons to
  tie her hair to the ceiling or wall hooks." · "Her hairdresser,
  Franziska Feifalik, was originally a stage hairdresser at the Wiener
  Burgtheater... Feifalik was forbidden to wear rings and required to
  wear white gloves; after hours of dressing, braiding, and pinning up
  the Empress' tresses, the hairs that fell out had to be presented in
  a silver bowl to the reproachful Empress for inspection. When her
  hair was washed with a combination of eggs and cognac once every two
  weeks, all activities and obligations were cancelled for that day."
- **Kuva:** Commons **Empress Elisabeth of Austria in dancing-dress,
  1865, Franz Xaver Winterhalter.jpg** (1500×2000, public domain,
  Franz Xaver Winterhalter, 1865) — kuuluisa timanttitähtimuotokuva,
  kahdeksan vuotta ennen näyttelyä.
- **Varmuus:** VARMA näyttelykäynnistä ja hiusrituaalista, mutta
  huomaa lähteen omat varaukset: "reportedly took several hours" ja
  "She is said to have complained" — sano "kerrotaan".
  **RAJAUS (tärkeä):** artikkeli käsittelee laajasti myös Sisin
  paastoamista, korsettien kiristystä, painon tarkkailua ja
  historioitsijoiden arviota syömishäiriöstä sekä hänen murhaansa 1898
  ja poikansa kuolemaa Mayerlingissä 1889. **NÄITÄ EI TÄKYYN.**
  Käytä tasan yllä olevaa: näyttelykäynti, pituus, hiukset, kampaaja,
  hopeamalja, pesupäivä.

### 18. ELÄINTÄKY: hotellinjohtaja poltti sikaria ja kasvatti bulldoggeja, joilla oli oma nimi

Franz Sacherin poika **Eduard Sacher** avasi Hotel Sacherin
Philharmonikerstraßelle **1876** — kolme vuotta isoisän matkan jälkeen;
kakku itse oli keksitty jo 1830- tai 1840-luvulla. Eduardin kuoltua
1892 hotellin otti haltuunsa hänen leskensä **Anna Sacher**
(1859–1930), teurastajan tytär Leopoldstadtista, joka oli lapsena
auttanut isäänsä lihakaupassa. Hän teki talosta yhden Euroopan
kuuluisimmista hotelleista ja johti sitä vuoteen 1929 asti. Anna
Sacher tunnettiin kahdesta asiasta, jotka eivät kuuluneet aikansa
naiskuvaan: **sikareista** ja **pienistä ranskanbulldoggeista**, joita
hän kasvatti itse kennelnimellä "Dernier cri". Wienissä koiria
kutsuttiin nimellä **"Sacher-Bullys"**.

- **Paikka:** Hotel Sacher, Philharmonikerstraße, Wienin ensimmäinen
  piiri, valtionoopperan takana. Anna Sacher on haudattu Dornbachin
  hautausmaalle.
- **Lähde:** en.wikipedia.org/wiki/Anna_Sacher, osio "Life";
  en.wikipedia.org/wiki/Sachertorte, osiot "Origin" ja "Spread".
- **Lainaus/perustelu:** "In 1880, she married the restaurateur and
  hotelier Eduard Sacher (1843-1892)... In 1876, Eduard Sacher opened
  his hotel on the Vienna Philharmonic Street... After her husband died
  in 1892, Anna took over the management of the house and the hotel." ·
  "Her fondness for cigars and for small French Bulldogs (so-called
  'Sacher-Bullys'), which she also bred herself under her kennel name
  'Dernier cri'." · "In 1929 Anna Sacher retired from hotel
  management."
- **Kuva:** Commons **Anna-Maria-Sacher-1908.jpg** (716×718, public
  domain, valokuvaaja Madame d'Ora, 1908) — muotokuva. Hotellista:
  **Hotel Sacher Vienna Sept 2006 002.jpg** (2048×1536, CC BY 2.5,
  Gryffindor, 2006).
- **Varmuus:** VARMA — suoraan lähteessä. **HUOM:** kaikki mainitut
  henkilöt ovat kuolleet (Anna Sacher † 1930, Eduard † 1892), joten
  täky kelpaa myös täkynostoksi. **HUOM AJOITUS:** hotelli EI ollut
  vielä olemassa 1873, joten isoisä ei voinut siellä käydä — kakku
  kyllä oli. Jos täky viedään Wien-laatalle, se on kerrottava
  myöhempänä juttuna eikä isoisän havaintona.

---

## Yhteenveto: kärkiehdokkaat

1. **Täky 1 (Rotunde)** — huippuankkuri. 108 metriä, Pantheon kaksi ja
   puoli kertaa pienempi, kruunu huipulla, ennätys kesti 84 vuotta.
   Kuva on aikalaisvalokuva näyttelyvuodelta.
2. **Täky 5 (sähkö vahingossa)** — maailmanhistoriallinen käänne, joka
   tapahtui juuri siellä missä isoisä oli, ja kuva on samana vuonna
   valmistuneesta koneesta.
3. **Täky 12 (hautausmaan kauriit, ELÄIN)** — söpö, outo ja tosi;
   kytkeytyy suoraan täkyyn 13 ja vuoteen 1873 (hautausmaa oli silloin
   työmaa).

Muut erityisen vahvat: **3** (pörssi kiinni klo 13), **6** (moa-luurangot
— kytkee Christchurchiin), **10** (kirahvimuoti), **18** (Anna Sacher).

## Mitä EI löytynyt

- Vuoden 1873 Wienin koleraepidemian uhriluku (ks. täky 4).
- Tarkistettua Commons-kuvaa Japanin paviljongista, Le Nilistä,
  ottomaanien paviljongista tai pörssiromahduksesta (täyt 7, 9, 3).
- Tonavan uuden uoman avaamispäivä leipätekstistä (täky 14).
