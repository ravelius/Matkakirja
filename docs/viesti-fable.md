# Opus 1 → Fable: IRAN KOKONAINEN, julkaistu v560 (#802) — jatkan Irakiin (11.8.2026)

Iranin maalehdessä on nyt **viisi aihetta × neljä nostoa + minitehtävä**:
historia, rakennukset, puutarhat, **ruoka** ja **käsityö**. Ruoka ja
käsityö ovat tämän erän työtä; PR #802 on mergetty, versio v560.

**Ruoka:** sahrami (150 000 kukkaa kiloon, Iranin osuus ~90 %),
sangak (jokikivillä paistettu täysjyväleipä), pistaasi (kuori halkeaa
itsestään; Rafsanjanin pohjavesi ja maanpainuma) ja tee (Kashef
as-Saltaneh salakuljetti 4 000 tainta Intiasta 1898; Lahijanissa
300 000 pensasta 1903).

**Käsityö:** mattosolmu kangaspuilla (Unesco 2010: Kashan ja Fars),
khatam (~250 palaa kuutiosenttimetrissä), mina eli emali kuparille
(~700 asteen poltot, Isfahan) ja termeh Yazdista (boteh-kuvio).

Runous jätettiin tekemättä: se olisi ollut kuudes aihe eikä tehtävässä
pyydetty ("+ runous jos aineisto kantaa"). Aineisto kantaisi hyvin —
Ferdowsin Shahnamehin käsikirjoitussivut ja Hafezin hauta Shirazissa
ovat PD/CC — joten se on valmis aihe poimittavaksi, jos haluat Iranille
kuudennen sivun.

## Kuvat (8 uutta, kaikki katsottu silmällä)

| kuva | tekijä | lisenssi |
|---|---|---|
| Saffronfarm-860808 | Safa Daneshvar | CC BY-SA 3.0 |
| Sangak bread in Tehran … (28604326958) | Ninara | CC BY 2.0 |
| 860631-Pistachio-IMG 6862-2 | Safa Daneshvar | CC BY-SA 3.0 |
| Persian Tea.JPG | Zereshk | CC BY-SA 3.0 |
| Carpet weaving, Mahan, Iran (1249317642) | Fulvio Spada | CC BY-SA 2.0 |
| Khatam detail | Fabienkhan | CC BY-SA 2.5 |
| Iranian handicraft | Reza Hajipour | CC BY 3.0 |
| Termeh fabric motifs … Yazd (29078803508) | Ninara | CC BY 2.0 |

`tools/tarkista-tekijat.mjs maa-kategoriat.js`: näistä kahdeksasta
**ei yhtään poikkeamaa**. Jokainen kuva katsottiin ensin 900 px:llä ja
neljä vielä 1200–1400 px:llä — ja se toinen katselu **muutti neljää
kuvatekstiä**: sahramipellolla poimijoilla on hengityssuojaimet ja
kukkaa pitelee kaksi eri kättä (ei yksi), teelasin sokeripala on
puutikun päässä, lautaset ovat raidalliset eivät kukalliset, ja
emalimaljakon keskellä on vinoneliöruutu, jota en ollut huomannut.

**Teen ja pistaasin hakusanat oli vaihdettava**, kuten varoitit:
`Tea in Iran` -luokka ajautuu surujuhlakuviin. Kelvollinen reitti oli
`Category:Tea drinking in Iran` ja `Category:Pistacia vera of Iran`.
Sivuhavainto: Iranin uutistoimistojen kuvat (Tasnim, Mehr, Fars) ovat
CC BY 4.0 mutta **vesileimattuja** — Lahijanin teenpoiminta ja giveh-
kenkien kudonta olisivat muuten olleet hyviä nostoja. Jos vesileima on
sinusta hyväksyttävä, niistä saa nopeasti kaksi lisäaihetta.

## Kolme asiaa, jotka tarkistus esti

1. **Pistaasi:** olin kirjoittamassa Iranin olevan maailman suurin
   tuottaja. Se ei pidä paikkaansa 2024 luvuilla: Yhdysvallat 499 000 t,
   Turkki 383 000 t, Iran 316 000 t. Teksti sanoo nyt "kolmen
   suurimman joukossa".
2. **Termeh:** suurin osa nykyisestä termehistä on jacquard-koneella
   kudottua. Kuvatekstissä ei väitetä kaupan pakkoja käsintehdyiksi;
   koneistuminen on kerrottu leipätekstissä.
3. **Sotasisältörajaus piti.** Ruoka- ja käsityöaiheissa ei ollut
   houkutusta, mutta Irakin puolella se tulee heti vastaan (ks. alla).

## Portit, jotka ajettiin

- Oma esitarkistin minitehtäväsäännöille (vastaus nostotekstissä, ei
  vuotoa otsikkoon/johdantoon, oikea ei pisin, kysymys ainutkertainen
  186 kysymyksen joukossa, kuvaduplikaatit kaikista 87 paketista).
  **Rikoin sen kerran tahallaan** ja katsoin, että se huomaa.
  Tarkistin löysi kaksi omaa vikaani ennen julkaisua.
- Selainajo 390 px:llä, `serviceWorkers: 'block'` + reittikoukku:
  molemmat sivut renderöityvät, **8/8 kuvaa latautuu**, kaappaukset
  katsottu. Huom. koukun on katettava KAIKKI ulkopuoliset osoitteet:
  kuvat tulevat R2-peilin kautta, ei suoraan Commonsista, joten pelkkä
  `commons.wikimedia.org` -sääntö näytti "0 pyyntöä" ja silti "rikki 0".
- `node --test tests/*.test.mjs`: # pass 552, # fail 0, # skipped 1.
  `tarkista-kaksoisavaimet`: puhdas. Build ajettu.

## Kaksi asiaa sinulle päätettäväksi (ei estä minua etenemästä)

1. **Esitarkistin antaa yhden vanhan väärän hälytyksen:** IRN
   `rakennukset`-minitehtävän vastaus "Johtaa viileän tuulen alas"
   ei löydy sanahaulla, koska tekstissä lukee "viileämmän". Vastaus on
   sisällöllisesti oikein tekstissä, joten **en muuttanut mitään** —
   mutta jos haluat sen menevän myös koneellisesti läpi, vaihdan
   vaihtoehdon muotoon, joka on tekstissä.
2. **§7b:n kolmen agentin ristiintarkastus jäi ajamatta.** Tämän
   session ajo-ohje kieltää agenttien käynnistämisen ilman erillistä
   pyyntöä, joten tein tarkastuksen itse (lähteet alkulähteistä,
   kuvat kahteen kertaan eri koossa). Jos haluat sen silti ajettavan,
   se sopii Sonnetille luettavaksi tehtäväksi ilman että minun
   tarvitsee koskea sisältöön.

## Seuraavaksi: IRQ

Aloitan Irakin samalla reseptillä. Ehdokkaat, jotka ovat jo
lisenssitarkistettuja mutta **eivät vielä katsottuja**: masgouf
(Al Jazeera English, CC BY-SA 2.0) ja ruokomajat eli mudhif
(Hassan Al-Jarrah, CC BY-SA 4.0). Sotasisältörajaus on Irakissa
tiukempi kuin Iranissa: `Category:Mudhif` sisältää yhdysvaltalaisen
armeijan kuvia ja `Culture of Iraq` haarautuu suoraan
surujuhla-aiheisiin, joten kuvat poimitaan luokka kerrallaan eikä
vapaalla haulla. Aiheet tulevat muinaisuudesta, ruoasta, soilta ja
musiikista.

# Opus 1 → Fable: Iranin puutarhat valmiina (3/5 aihetta), jään valmiuteen (10.8.2026)

Päätöksesi kuitattu. **En julkaise vielä**, koska annoit luvan vasta
kun Iran on kokonainen — sillä on nyt kolme aihetta, ei viisi.

**Uutta tässä erässä: IRN puutarhat** (4 nostoa): chahar bagh -kaava
Kashanin Finin puutarhassa, qanat Shafiabadissa, Chehel Sotounin
heijastusallas, Shirazin Eramin puutarha kasvitieteellisenä kokoelmana.

Kuvat katsottu silmin, tekijät ja lisenssit Commonsin API:sta:

| kuva | tekijä | lisenssi |
|---|---|---|
| Jardín de Fin, Kashan (DD 22) | Diego Delso | CC BY-SA 4.0 |
| Shafiabad (Shahdad), qanat | Ninara | CC BY 2.0 |
| Chehel Sotoun Palace | Ninara | CC BY 2.0 |
| Eram Garden Shiraz 02 | Mostafameraji | CC BY-SA 4.0 |

Qanat-kuvan kohdalla varmistin Commonsin kuvauksesta, että kyse on
todella qanatista eikä jostain muusta maanalaisesta käytävästä ennen
kuin kirjoitin siitä — tiedostonimessä lukee vain kylän nimi.

## Yksi työkaluansa, joka olisi mennyt läpi hiljaa

Liitin ensin aiheen työkalulla, joka etsi maan taulukon lopun
tekstihaulla `rindex('  ],')`. Taulukon sisällä on kymmeniä samalta
näyttäviä rivejä — jokaisen aiheen `nostot`-lista päättyy niin — joten
haku osui väärään ja **hukkasi juuri lisätyn aiheen**. Tiedosto
jäsentyi yhä, testit menivät läpi, eikä mikään portti huomannut
mitään; vika näkyi vasta kun laskin aiheet. Palautin tiedoston gitistä
ja kirjoitin liittimen uudelleen laskemaan hakasulkeita ja ohittamaan
merkkijonot. Ansa on kirjattu docs/opus1-tilanne.md:hen: **jäsennys ei
ole todiste, laske aiheet ja nostot joka liitoksen jälkeen.**

## Jatkokohta kirjattu, kuten pyysit

`docs/opus1-tilanne.md` kohta **1b** kertoo haaran, valmiin osuuden,
seuraavat askeleet järjestyksessä ja neljä kuvaehdokasta, jotka on jo
lisenssitarkistettu mutta **joita ei ole katsottu silmin** — ne on
katsottava ennen kuin niistä kirjoitetaan. Samassa kohdassa on
muistutus siitä, että pistaasille ja teelle ei löytynyt kelvollista
hakua: teehaku ajautui uskonnollisiin surujuhlakuviin, joten hakusanat
on vaihdettava.

## Portit

- `node --test tests/*.test.mjs` → **552 pass, 0 fail**, 1 skip
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- Minitehtäväsäännöt tarkistettu: vastaus nostotekstissä, ei vuoda
  otsikkoon eikä johdantoon, oikea vaihtoehto ei ole pisin (26 vs 34),
  kysymys ainutkertainen koko pelissä
- Ei uusia kuvaduplikaatteja

Konteksti on siinä pisteessä, jossa uuden maan aloittaminen olisi juuri
sitä mitä kielsit, joten en aloita ruokaa enkä käsityötä tässä
vuorossa. Jään valmiuteen; jatkosessio voi jatkaa suoraan kohdasta 1b.

---

# Opus 1 → Fable: ME-lehdet käynnissä — cityCountry korjattu + Iran aloitettu (10.8.2026)

Haara: **`claude/opus1-me-lehdet`**, pohja v554-main. Ei PR:ää, kuten
pyysit. Kaksi checkpoint-committia. **Kaksi asiaa vaatii päätöksesi
ennen kuin jatkan** — ne ovat heti alla.

## 1. PÄÄTÖSTÄ VAATIVA: tilauksesi kumoaa oman kaanonpäätöksesi

`middleeast-countries.js`:n otsikkokommentissa luki sanatarkasti:

> KUUSI LAUDAN KOHDETTA PUUTTUU TAHALLAAN kaupunki-maa-taulusta:
> Jerusalem, Petra, Siinai, Rub al-Khali, Persepolis ja Kappadokia.
> Ne eivät ole kaupunkeja vaan erikoiskohteita, eivätkä ne saa
> maa-attribuutiota (**Fablen kaanonpäätös 9.8.2026**) — isoisän
> päiväkirja puhuu paikasta itsestään eikä valtiosta. Esitystapa on
> Fablen pöydällä. **ÄLÄ lisää niitä tauluun ilman Fablen päätöstä.**

Tehtävänantosi puhui *puuttuvasta merkinnästä* eli näytti pitävän
tätä huolimattomuutena, ei päätöksen perumisena. **Tein muutoksen**,
koska tilaus tulee samalta taholta joka säännön asetti ja käytännön
peruste on vahva: maailmankartalla näillä viidellä on ollut sama
maatunnus koko ajan, joten laudat olivat keskenään ristiriidassa.
Päivitin myös otsikkokommentin, ettei tiedosto ole itsensä kanssa
ristiriidassa. **Jos kaanonpäätös oli tarkoitus pitää voimassa,
tämä commit on peruttava** — se on erillinen ja helppo kumota.

**Jerusalem jätettiin ennalleen**, kuten ohjeistit. Perustelu ei ole
mielipide: sitä ei ole kummallakaan laudalla, eikä laudalla ole
ISR- tai PSE-muotoa lainkaan. Tunnuksen antaminen olisi kannanotto.

Petra osoittaa nyt Jordaniaan, jolla ei ole muotoa tällä laudalla.
Tarkistin ettei se riko mitään: maan aihesivut haetaan
ISO-tunnuksella, ja saapumiskortin minikartta ohittaa muodottoman maan
omalla vartijallaan (`js/ui.js` piirraMaakartta).

## 2. Mittaukseni poikkeaa tehtävänannosta yhdessä kohdassa

Mittasin kattavuuden itse `maa-kategoriat.js`:stä enkä luottanut
listaan. **Jordania ei puutu** — sillä on jo kaksi aihetta (vedet,
rauniot). Petralta puuttui vain cityCountry-rivi, joka on nyt lisätty,
joten Jordanian lehti aukeaa Petrassa ilman uutta sisältöä.

Oikea puutelista on siis **viisi maata, ei kuusi**: IRN, IRQ, SYR,
YEM, CYP.

Sivuhavainto: nykyisistä ME-maista useimmilla on vain 2–4 aihetta
(KWT 2, SAU 3, QAT 2, BHR 2, OMN 2, ARE 4), eli alle tilaamasi 5–6:n
mitan. Jos mitta on tarkoitus nostaa myös niille, se on oma erillinen
työnsä.

## 3. Iran: kaksi aihetta valmiina, neljä kesken

**IRN historia** (4 nostoa): Apadanan lahjakulkue-reliefi, Kyroksen
sylinteri, Kserkseen kalliohauta Naqsh-e Rostamissa, Meybodin
karavaaniseraabi.
**IRN rakennukset** (4 nostoa): Naqsh-e Jahanin aukio, Si-o-se-polin
silta, Yazdin tuulitornit, Sheikh Lotfollahin kupoli.

Kuvat ja lisenssit (kaikki katsottu silmin, tekijät Commonsin API:sta):

| kuva | tekijä | lisenssi |
|---|---|---|
| Persepolis stairs of the Apadana relief | Phillip Maiwald (Nikopol) | CC BY-SA 3.0 |
| Cyrus Cylinder – British Museum | Joyofmuseums | CC BY-SA 4.0 |
| Xerxes tomb at Naqsh-e Rostam | dynamosquito | CC BY-SA 2.0 |
| Courtyard of a silk road caravanserail at Meybod | dynamosquito | CC BY-SA 2.0 |
| Naghshe Jahan Square Isfahan modified | Arad | CC BY-SA 3.0 |
| Si-o-se-Pol | Reza Haji-pour | CC BY 3.0 |
| Shish Badgiri, Yazd (DD 01) | Diego Delso | CC BY-SA 4.0 |
| Isfahan Lotfollah mosque ceiling | Phillip Maiwald (Nikopol) | CC BY-SA 3.0 |

**Kolme kuvaa oli GFDL-kategoriassa** — tarkistin kunkin
lisenssiwikitekstin: kaikki kolme ovat monilisensoituja
(`{{self|GFDL|cc-by-sa-3.0…}}`), joten käytämme CC BY-SA 3.0:aa ja
GFDL-kielto ei esty.

**Yksi ehdokas hylättiin silmätarkistuksessa:** Naqsh-e Rostamin kuvaan
`Ka'ba-ye Zartosht and Achaemenid Tombs …` on poltettu valokuvaajan
vesileima ("JULIA MAUDLIN | PHOTO") koko alareunan levyiseksi. Tilalle
Kserkseen haudan julkisivu.

Toinenkin karsinta tehtiin, ja se liittyy rajaukseesi: Naqsh-e
Rostamin **tunnetuimmat** reliefit esittävät Shapur I:n voittoa
roomalaisista keisareista ja Bahram II:n ratsastustaistelua. Ne ovat
sotasisältöä, joten jätin ne pois, vaikka ne olisivat kuvina hyviä.
Sama linja koski koko erää: aiheet ovat historiaa, arkkitehtuuria,
ruokaa, käsityötä ja luontoa.

**Minitehtäväsäännöistä kaksi rikkoutui ensimmäisessä versiossani** ja
korjattiin: historian otsikko "Kansat kantavat lahjansa" vuoti
vastauksen, ja rakennusten oikea vaihtoehto oli kahdeksan merkkiä
pisin. Molemmat ajettiin läpi tarkistimella, joka lukee myös
ainutkertaisuuden koko pelistä.

## Mitä on vielä tekemättä

- **IRN**: puutarhat, ruoka, käsityö (+ mahdollinen runous). Kuvaehdokkaat
  on jo haettu ja lisenssitarkistettu puutarhoille (Finin puutarha,
  Eramin puutarha, qanat Shahdadissa, Chehel Sotoun) — ne odottavat
  vain silmätarkistusta ja tekstejä.
- **IRQ, SYR, YEM, CYP**: aloittamatta.

Työ jäi kesken kontekstibudjettiin, ei esteeseen. En halunnut kirjoittaa
kuvatekstejä kuvista joita en ole katsonut — se on se sääntö, joka on
tässä erässä jo kerran pelastanut (vesileima).

## Portit

- `node --test tests/*.test.mjs` → **552 pass, 0 fail**, 1 skip
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `node tools/tarkista-maakyltit.mjs` → 13 maata kunnossa
- Ei uusia kuvaduplikaatteja: jokainen 8 kuvasta esiintyy pelissä kerran
- Genetiivit: Iranin, Irakin, Syyrian, Jemenin syntyvät säännöstä;
  Kypros → Kyproksen on jo `MAAN_GENETIIVIT`-taulussa. Ei muutoksia.

---

# Opus 5 → Fable: vuorikohteiden kuvakarusellit

Haara: `claude/opus5-vuorikuvat`. Työ ei koske mainiin eikä nosta
versiota — poimi ja julkaise sinä.

**Tilanne 10.8.2026 ilta: mekanismi valmis ja käytössä.
21/52 kohdetta kuratoitu, 146 kuvaa. Loput 31 kesken — lista alla.**

Erä on julkaisukelpoinen sellaisenaan: kuratoimaton kohde toimii
täsmälleen kuten ennenkin (Wikipedian oma kuvasto), joten mitään ei
riko se, että työ on kesken.

## Tehtävä

Omistajan tilaus (kuvakaappaus Kaukasus-popupista): "Vuorilta on
varmasti hienoja kuvia. Niitä voisi lisätä jopa kymmenen. Tällaisiin
kohteisiin, samanlaisiin karuselliin, voi käydä kaikki vuorikohteet
läpi samalla tavalla ja lisätä laadukkaita kuvia."

Kohteita on 52 (`js/packs/maasto-nimet-vuoret.js`).

## Mikä mekanismi on jo olemassa

Karusellia ei tarvitse rakentaa: maastonimen i-nappi avaa saman
Lue lisää -ikkunan kuin kaupungit (`ui.js: avaaMaastonimi` →
`openWikiArticle`), ja siinä on jo nuolet, laskuri ja suurennos
(`wiki-kuvakotelo`). Kuvat tulevat `cachedGallery(title)`:sta, joka
katsoo ENSIN käsin kuratoidun listan `OMAT_GALLERIAT` ja vasta sitten
Wikipedian artikkelin kuvat. Victoria-järvi on tämän ainoa nykyinen
käyttäjä.

Vuoret saavat siis kuratoidut kuvansa samasta hanasta — oma
pakettitiedosto, ei 400 riviä lisää ui.js:ään.

## Työtapa

1. `tools/hae-vuorikuvat.mjs` kokoaa ehdokkaat Commonsin
   KATEGORIASTA (Wikidatan P373 kautta, ei nimihausta) — vain
   PD/CC-lisenssit ilman ND- ja NC-ehtoa, vähintään 1600 px leveä,
   vaakakuva, kartat ja kaaviot karsittuna. Commonsin omat laatuluokat
   (Quality/Featured/Valued) nostetaan jonon kärkeen.
2. `tools/tee-kuvataulu.py` latoo ehdokkaat yhdeksän ruudun tauluksi,
   ruutu 480 px — jokainen kuva KATSOTAAN silmällä ennen hyväksyntää.
   Työkalu ei valitse mitään.
3. Hyväksytyt kirjataan pakettiin lisenssirivin kanssa.

Kumpikaan työkalu ei tarvitse avaimia.

## PÄÄTÖSTÄ VAATIVA LÖYDÖS: peilin nimeämissääntö rikkoo kuvia

Tämä ei ollut tehtävässä, mutta se tuli vastaan heti ensimmäisessä
kuvassa, ja se on pahempi kuin miltä kuulostaa.

`turvanimi` (js/media.js) pudottaa kaiken a-z0-9:n ulkopuolisen. Siksi
**kokonaan arabialainen, kyrillinen tai kiinalainen tiedostonimi
kutistui tyhjäksi**, ja peli haki niitä kaikkia samasta osoitteesta
`kuvat/.jpg`. Ämpärissä ne ovat kirjoittuneet toistensa päälle.

Mitattu 10.8.2026: `kuvat/.jpg` (406 kt) ja `kuvat/..jpg` (512 kt)
vastaavat molemmat 200:lla ja ovat kelvollisia JPEG-kuvia. Pelaaja ei
siis näe rikkinäistä ruutua vaan **väärän valokuvan** — ja se on
näyttänyt oikealta kuvakaappauksissa koko ajan.

Osumia nykyisessä aineistossa **21 kuvaa** seitsemässä paketissa:
africa-valokuvat, asia-valokuvat, asia-lisat-valokuvat,
kulttuuri-kategoriat, maa-kategoriat, maasto-tekstit, nahtavyysjutut
(mm. Bagdadin, Odessan, Kiovan, Pietarin ja Sahalinin kuvat).

**Korjasin tämän**, koska Kaukasuksen kuvista kolmella on venäjänkielinen
nimi eikä erää voi julkaista rikkinäisenä: nimi, josta ei jää yhtään
kirjainta tai numeroa, saa perään tiivisteen alkuperäisestä nimestä
(`kuva-19cxnn5.jpg`). Latinalaiset nimet eivät muutu lainkaan, joten jo
peilatut tiedostot pysyvät paikallaan.

Sama vika toistui vielä toisessa muodossa, ja sen löysi tähän eränä
kirjoitettu testi: kiinalaisista nimistä "…玉珠峰雪山 02.jpg" ja
"…昆仑山 02.jpg" jäi jäljelle pelkkä **"02"**, joka törmäsi keskenään
JA erääseen jo pelissä olevaan ruokakuvaan (`普通腊汁肉夹馍 02.jpg`).
Yksikin näistä vuorikuvista olisi siis korvannut ämpärissä olemassa
olevan kuvan. Sääntö on nyt: nimi, josta ei jää yhtään KIRJAINTA, saa
tiivisteen — pelkkä numero on yhtä hyödytön nimi kuin tyhjä.

**Sinulle jää kaksi asiaa:**

1. **Peili on ajettava uudelleen** (`tools/peilaa-media.mjs`), jotta ne
   21 kuvaa ilmestyvät omilla nimillään. Siihen asti ne latautuvat
   Commonsista varareittiä pitkin — eli oikein, mutta hitaammin.
   Nimi vaihtuu kaikkiaan **15 tiedostolla**, joista 8 on tämän erän
   omia. Seitsemän muuta ovat nykyisiä kuvia, joiden nimeksi jäi pelkkä
   numero (`02`, `2018`, `3754`, `1910`, `2020`): asia-valokuvat,
   asia-lisat-valokuvat, kulttuuri-kategoriat, maa-kategoriat ja
   nahtavyysjutut. Ne näkyvät pelissä oikein koko ajan — vain hakupolku
   vaihtuu.
2. **Neljä törmäystä jäi korjaamatta**, koska niiden korjaus vaihtaisi
   JO PEILATTUJEN tiedostojen nimet (404 kunnes peili ajetaan). Ne ovat
   tests/media.test.mjs:n `TUNNETUT_TORMAYKSET`-listalla, ja uusi
   törmäys kaataa testin. Luokat: 90 merkin katkaisu (kaksi pitkää
   nimeä samasta teoksesta), pelkkä latinalainen häntä
   ("- panoramio"), ja pelkkä kirjainkoko ("Potemkin stairs" vs
   "Potemkin Stairs" — Commonsissa kaksi eri tiedostoa).

## Mitä koodiin muuttui

- `js/packs/vuori-valokuvat.js` (uusi) — kuratoidut kuvat avaimella.
- `js/ui.js` — `avaaMaastonimi` antaa kuratoidun listan mukaan;
  `openWikiArticle` näyttää sen HETI ennen verkkoa; kuvateksti ja
  lähderivi karusellin alle; suurennos jatkaa samasta listasta.
- `index.html`, `css/styles.css` — kuvatekstin paikka ja tyyli
  (samat luokat kuin nähtävyysjutuissa).
- `js/media.js` — yllä kuvattu nimikorjaus.
- `sw.js`, `tools/build-standalone.mjs` — uusi paketti listoille.
- `tests/vuorikuvat.test.mjs` (uusi), `tests/media.test.mjs` —
  lisenssirivin muoto, kymmenen kuvan katto, ei duplikaatteja, ei
  peilipolkujen törmäyksiä.

Testit vihreinä: 552 pass, 0 fail. **Versiota ei ole nostettu eikä
buildia ajettu** — ne kuuluvat sinulle.

## Valmiit kohteet (21)

himalaja 10, karakoram 10, kaukasus 10, alpit 10, skandit 8,
kamtshatka 8, elburz 7, japanin-alpit 7, hindukush 7, pamir 7,
tienshan 7, apenniinit 7, zagros 6, tiibetin-ylatasanko 6,
verhojansk 6, pyreneet 6, ural 5, kunlun 5, taurusvuoret 5,
lansi-ghatit 5, karpaatit 4.

Kuvamäärä vaihtelee tarkoituksella: kymmenen tuli sinne, missä oli
kymmenen upeaa kuvaa. Karpaateilla jäi neljä, koska puolet ehdokkaista
oli saman valokuvaajan VESILEIMATTUJA otoksia — ne hylättiin.

## Kesken (31)

altai, annamin-ylanko, sarawat, dinaariset-alpit, balkanvuoret,
atlas, etiopian-ylangot, drakensberg, ruwenzori, kilimanjaro,
kenia-vuori, ahaggar, tibesti, kamerunvuori, kapmaan-taittovuoret,
madagaskarin-ylanko, kalliovuoret, sierra-nevada, appalakit,
sierra-madre-occidental, sierra-madre-oriental, alaskan-vuoristo,
kaskadit, rannikkovuoret, andit, guyanan-ylanko, brasilian-ylanko,
kaakkois-australian-ylangot, suuri-vedenjakajavuoristo,
uuden-seelannin-alpit, uuden-guinean-ylangot.

Kaikilla näillä ehdokaslistat ovat valmiina
(`tools/vuorikuva-aineisto/`, ei repossa — aja `hae-vuorikuvat.mjs`).
Jatko on mekaanista: taulu → silmätarkistus → merkintä pakettiin.

## Mitä silmätarkistus on hylännyt

Nämä eivät ole teoriaa — jokainen näistä oli automaattiseulan
läpäissyt, oikein lisensoitu ehdokas, ja vain katsominen paljasti sen:

- **Vesileimat.** Karpaateilla useassa kuvassa oli valokuvaajan nimi
  poltettuna kulmaan. Kuvataulun keskirajaus PIILOTTI osan niistä,
  joten valituille tehdään vielä kokonaisen kuvan tarkistus
  (`tee-kuvataulu.py --koko`).
- **Väärä vuori.** Commonsin sarja "Province of L'Aquila in 2013" on
  kuvattu Dolomiiteilla, ei Apenniineilla. Otsikko valehteli
  suoraan — juuri siksi kategoriat tarkistetaan ja kuvat katsotaan.
- **Tuntematon paikka.** Hammondin diakuvien oma kuvaus sanoo, ettei
  kuvauspaikkaa tiedetä. Sellainen ei voi esittää "juuri sitä
  vuoristoa".
- **Ei vuorta lainkaan.** Uralin kategoriapuu oli mineraalinäytteitä ja
  kuorolaulajia, Pyreneiden leipää ja koruja, Karakoramin arkiston
  albumiaukeamia, Kamtšatkan satelliittirenderöintejä. Nämä kaikki on
  nyt seulottu koneella, mutta ne löytyivät silmällä.

## Kategoriat, jotka piti valita käsin

Wikidatan P373 osoitti tyhjään tai väärään paikkaan yhdeksällä
kohteella. Perustelut ovat koodissa (`KATEGORIA`), tässä tiivistys:
kolmella vuoristolla ei ole omaa kategoriaa lainkaan, joten tilalle
valittiin sen tunnetuin osa — Brasilian ylänkö → Serra da Mantiqueira
(kohteen oma huippu Pico da Bandeira), Guyanan ylänkö → Mount Roraima,
Apenniinit → Gran Sasso (Corno Grande). Nämä kolme kannattaa katsoa
läpi: valinta on tulkinta, ei tosiasia.
