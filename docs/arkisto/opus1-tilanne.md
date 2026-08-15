> **ARKISTOITU 15.8.2026** — kertaluontoinen tilannekuva tai toteutettu suunnitelma. Ei sisällä voimassa olevia ohjeita; ne ovat Raamattu 2.0:ssa (js/tyohuone-raamattu.js) ja sen dokumenttikartan tiedostoissa.

# Opus 1:n tilanne (päivitetty 11.8.2026 aamulla)

Tämä on **luovutuspaperi**: seuraava Opus-sessio toisella tilillä voi
jatkaa suoraan tästä ilman edellisen session kontekstia. Voimassa olevat
ohjeet ovat CLAUDE.md:ssä ja docs/roolitus.md:ssä — tämä kertoo vain,
mihin oma työ jäi ja mitä kannattaa tietää ennen kuin koskee mihinkään.

Rooli lyhyesti: **Opus 1 = lehdet ja koodi.** Kaupunkilehdet, maalehtien
aihesivut, minitehtävät, menovinkit, lehtien kuvat, UI-koodi ja
työkalut. **Tarinatekstit eivät kuulu tälle kaistalle** — saapumistekstit,
kohtaamiset, aarrevihjeet ja kulttuurivisat kirjoittaa Fable. Jos
tarinatekstissä on vika, se raportoidaan Fablelle eikä korjata itse.

> **AJANTASAINEN TILANNE ON KOHDASSA 1c.** Kohdat 1–2 kuvaavat
> 10.8. tilannetta ja ovat osin vanhentuneita; ne on jätetty siksi,
> että niiden opit (kohdat 3–8) ovat yhä voimassa.

## 1. Missä ollaan juuri nyt

**ME-maiden aihesivujono on erään C asti valmis.**

| Erä | Sisältö | Tila |
|-----|---------|------|
| A | Emiraattien 3. sivu + Jordania | v499 mainissa |
| B | Oman + Qatar | v501 mainissa |
| C | Egypti + Kuwait | v507 ja v511 mainissa |
| D | Saudi-Arabia | v515 mainissa, korjattu v520 |
| D | Bahrain | **v526 geometria + v527 sivut — ERÄ D VALMIS** |

**Seuraava tehtävä: 13 kuvaduplikaatin vaihto** (Fablen tehtävänanto
10.8.2026). Taulukko tiedosto+rivi-tarkkuudella on Sonnet 1:n
QA-raportissa haarassa `claude/matkakirja-game-dev-la16ae`
(docs/viesti-fable.md, osa D). 12 luokan b tapausta vaihdetaan,
Parthenon on luokan c rajatapaus jonka perustelu kirjataan
docs/kuvaduplikaatit.md:hen.

Lisäksi mainissa on **v514 (#752)**: tekijämerkintöjen lupa-ajo
kaikkien pakettien yli, ks. kohta 4.

## 2. Erä D: Saudi valmis, Bahrain odottaa päätöstä

**Saudi-Arabia (v515)** sai kolme sivua: `kalliot` (Hegra, Jubbahin
kalliopiirrokset, AlUlan vanha kaupunki), `vuoret` (Asirin vuoristo,
savitornitalot, al-qatt al-asiri) ja `meri` (Farasanin saaristo,
korallikivi, papukaijakala ja hareed-juhla). Rub al-Khali jätettiin
tietoisesti pois: aavikkosivu on jo ARE:lla, QAT:lla ja KWT:lla.
Fablelta on kysytty, halutaanko se silti.

**Bahrain on valmis mutta liittämättä.** Syy ei ole sisällössä:

- Bahrainilla ei ole maamuotoa yhdelläkään laudalla
  (`middleeast-countries.js` 12 maata, `maailmankartta.js` 84 maata),
  eikä laudalla ole yhtään Bahrainin kaupunkia.
- `avaaMaalehti('BHR')` palaa heti rivillä `if (!maa) return;`.
- `tests/maa-otsikot.test.mjs` kaatuu liittämisen jälkeen:
  *"BHR: maalla on aihesivuja mutta ei nimeä millään laudalla"*.

Valmis sisältö on **`docs/erad-bahrain-valmis.json`** (kaksi sivua,
kuusi juttua, kuvat katsottu, lähteet Commonsin API:sta). Se liitetään
sellaisenaan heti kun Fable päättää esitystavan ja BHR saa
lautageometrian — se tiedosto on Opus 2:n kaistaa, älä koske siihen
itse. **Älä aloita erää E ennen kuin Fable on vastannut tähän.**

Fablen antamat rajaukset erälle D, sitovina (yhä voimassa):

- **Saudi-Arabia: EI Mekkaa eikä Medinaa eikä pyhiinvaellusta.** Pyhät
  kaupungit tulevat myöhemmin omana sivutyyppinään, ja **Fable
  kirjoittaa niiden johdannot** — älä aloita niitä.
  Fablen ehdottamat suunnat: aavikko, kulttuuri, meri. Lupaavia aiheita,
  jotka eivät osu naapureiden sivuihin: AlUlan ja Hegran kalliohaudat,
  Rub al-Khali, Asirin vuoret ja Al-Qatt Al-Asiri -seinämaalaus,
  Farasanin saaret, kalliopiirrokset, arabianleopardi.
- **Bahrain:** helmenkalastus, Dilmunin hautakummut, Qal'at al-Bahrain,
  Elämänpuu, meren pohjan makean veden lähteet, tuulitornit. Öljy ja
  moderni kaupunki ovat jo naapurien sivuilla.
- ~~Lehdettömät maat (Irak, Iran, Jemen) pysyvät kahden sivun
  mallissa.~~ **VANHENTUNUT:** Fable avasi 10.–11.8. täydet aihesivut,
  ja Iran (5 aihetta) sekä Irak (4 aihetta) ovat valmiit.
- **Ei sotasisältöä. Syyria-linja ennallaan.**

Jonon jälkeen avoinna olevat omat työt ovat kohdassa 7.

## 3. Aihesivun resepti (nykyinen, älä käytä vanhaa)

- **2–4 aihesivua per maa, 3 juttua per sivu + minitehtävä.** Vanha
  4 sivua × 4 juttua -speksi on vanhentunut; docs/tyolista-opukselle.md
  saattaa yhä puhua siitä.
- **Menovinkit aina viimeisenä sivuna**, jos maalla on ne.
- Minitehtävän säännöt, jotka esitarkistin vahtii:
  1. vastaus löytyy **nostotekstistä** (ei pelkästä otsikosta tai
     sivun johdannosta),
  2. vastaus **ei vuoda** otsikkoon eikä johdantoon,
  3. oikea vaihtoehto ei ole selvästi pisin (ero ≥ 3 merkkiä),
  4. kysymys on ainutkertainen koko pelissä,
  5. ei törmää lehtikaupungin kulttuurivisaan.
- Sivun `id` saa toistua eri maissa (`aavikko` on jo ARE:lla, QAT:lla ja
  KWT:lla) — avain on maatunnus.

## 4. Kuvasäännöt, ja se yksi kohta jossa mokasin

- Vain Wikimedia Commons, vapaa lisenssi (PD, CC0, CC BY, CC BY-SA).
  **Ei FAL, ei GODL.**
- Kuvan on oltava **siitä maasta**, jota sivu käsittelee.
- **Jokainen kuva katsotaan silmällä ~480–600 px:n levyisenä ennen kuin
  selite kirjoitetaan.** Commonsin kuvaus ei riitä. Tässä erässä
  katsominen hylkäsi: häkissä olevan fenekkiketun ("aavikolla"),
  muovilaatikossa numerolaput kuorissa olevat kilpikonnat ("villi
  eläin"), ja nubialaistalon kuvan, jonka etualalla oli tunnistettava
  selfietä ottava mies.
- Kuva ei saa olla pelissä ennestään. Duplikaattitutka lukee **kaikki**
  paketit tekstihaulla `tiedosto:` — aiempi versio luki vain
  `kansikuvat`/`nostot` ja päästi kolme duplikaattia läpi.

**Älä koskaan kirjoita `lahde`-kenttää muistista.** Kirjoitin Kuwaitin
kuuden kuvan tekijän nimen käsin ja sain **kaikki kuusi väärin** —
nimet olivat uskottavia, joten mikään ei näyttänyt oudolta. Sama vika
oli lipsahtanut Egyptiin kahdesti. Tekijämerkintä on CC BY:n
lisenssiehto, joten väärä nimi on rikkomus siinä missä puuttuvakin.

Repossa on nyt kaksi työkalua:

    node tools/lisaa-tekijat.mjs            # täydentää PUUTTUVAN tekijän
    node tools/tarkista-tekijat.mjs [pkt]   # vertaa OLEMASSA olevat Commonsiin

Jälkimmäinen on uusi ja tehty juuri tämän vian takia. Sen tulos on
luettava eikä pelkkä virhelista: loppuun jää tahallisia eroja
(suomennetut laitosnimet, translitteroinnit). maa-kategoriat.js:ssä
jää noin 20 riviä kolmesta tuhannesta kuvasta, ja keksitty nimi erottuu
siitä heti.

**Lupa-ajo on tehty (v514, #752).** Omistaja antoi 10.8. luvan ajaa
tarkistin kaikkien pakettien yli. Tulos ja se, mitä siitä opittiin:

- **32 kuvaa `europe-valokuvat.js`:ssä oli kokonaan ilman tekijää** —
  koko merkintä oli `lahde: 'CC BY-SA 4.0'`. Nämä olivat pahin löydös,
  eivät väärät nimet.
- `lisaa-tekijat.mjs`:n tunnistus katsoi vain merkinnän ALKUA, ja
  paketeissa on **kolme eri kenttäjärjestystä** (tekijä alussa,
  suluissa tai lopussa). Sääntö meni väärin molempiin suuntiin: se
  ohitti tekijättömät JA olisi kirjoittanut nimen toiseen kertaan 155
  merkintään, jos työkalu olisi ajettu sellaisenaan `--kirjoita`.
  Korjattu: järjestystä ei enää katsota lainkaan.
- **Aja aina kuivaharjoitus ja LASKE rivit ennen `--kirjoita`.** Tuo
  155 olisi mennyt läpi hiljaa.

Jäljelle jää kaksi asiaa, jotka ovat Fablella eivätkä tällä kaistalla:
neljä kuvaa kielletyllä lisenssillä (FAL/GFDL, `africa-kulttuuri.js`
ja `asia-lisat-valokuvat.js`) ja 383 PD/CC0-kuvaa ilman tekijää (ei
rikkomus).

## 5. Työkalut ja se, mitä niistä katosi

Repossa pysyvästi:

- `tools/uusi-versio.mjs "Muutosrivi"` — **ainoa** sallittu tapa nostaa
  versionumero. Ajetaan vasta juuri ennen buildia.
- `tools/build-standalone.mjs` — yhden tiedoston versio `dist/`-kansioon.
- `tools/lisaa-tekijat.mjs`, `tools/tarkista-tekijat.mjs` — yllä.

**Kertakäyttöiset apuskriptit olivat `/tmp`:ssä ja katosivat kontin
mukana.** Ne kannattaa tehdä uudestaan tarpeen tullen; tässä on mitä ne
tekivät, tärkeysjärjestyksessä:

1. **Esitarkistin** (`esitarkistus-maa2.mjs`): lukee `/tmp/maa-XXX.json`
   ja tarkistaa kohdan 3 minitehtäväsäännöt, sivu- ja juttumäärät sekä
   kuvaduplikaatit **ennen** kuin sivut liitetään pakettiin. Se on
   maksanut itsensä takaisin joka erässä: Omanissa ja Qatarissa se
   löysi kolme vikaa, Egyptissä kaksi. Vastauksen sanahaku käyttää
   ≥ 6 merkin sanojen 7 merkin alkuja, joten "Telttaa" ei löydä sanaa
   "teltta" — vaihtoehto kirjoitetaan siihen muotoon, jossa sana on
   tekstissä.
2. **Liittäjä** (`liita-maa.mjs XXX`): kirjoittaa JSON-sivut
   `js/packs/maa-kategoriat.js`:ään oikeaan kohtaan (menovinkit
   viimeiseksi). Kaupunkiversio `liita-kaupunki.mjs` **pudotti aikanaan
   hiljaa tuntemattomat kentät** ja rikkoi musiikkinäytteet — uusi
   versio kävelee `Object.entries(n)` ja **heittää** poikkeuksen
   tuntemattomasta tyypistä. Jos teet liittäjän uudestaan, tee se näin.
3. **Lähdetäyttäjä** (`taytä-lahteet.mjs XXX`): kirjoittaa jokaisen
   `lahde`-kentän suoraan Commonsin API:sta. Tämän jälkeen kohdan 4
   virhe on mahdoton.
4. **Duplikaattitutka** (`dup-kaikki.mjs`): tekstihaku `tiedosto:`
   kaikista paketeista.
5. **Selainmittari**: Playwright 390 px:n leveydellä. **Kaksi ehtoa,
   joita ilman tulos on merkityksetön:** `serviceWorkers: 'block'`
   (muuten service worker sieppaa kuvapyynnöt eivätkä Commons-kuvat
   lataudu koskaan — "rikki 0" ei silloin todista mitään) ja
   `page.route`-koukku, joka hakee kuvat Nodella proxyn läpi ja
   syöttää tavut selaimelle. Chromium on polussa
   `/opt/pw-browsers/chromium`. Noden fetch tarvitsee
   `NODE_USE_ENV_PROXY=1`.

## 5b. ÄLÄ aja tools/fetch-photos.mjs kevyesti

Se ei hae vain uusia kuvia. Se lukee **kaikki** `tiedosto:`-viittaukset
js/packs-kansiosta ja hakee jokaisen, jota ei vielä ole paikallisesti.
Paikallisia kopioita on 147, mutta viittauksia noin 3 000 — eli ajo
lataa reiluun tuntiin noin 2 900 kuvaa ja paisuttaa repon. Ajoin sen
kerran vahingossa neljän kuvan vaihdon yhteydessä ja jouduin
keskeyttämään sen 1 100 tiedoston kohdalla ja siivoamaan
`git clean -fd assets/valokuvat/`.

Kun vaihdat yksittäisen kuvan, jolla on paikallinen kopio:

1. hae uusi kuva käsin `Special:FilePath/<nimi>?width=1000`
   kansioon `assets/valokuvat/` työkalun nimeämissäännöllä
   (pienet kirjaimet, ei-kirjaimet viivoiksi, enintään 60 merkkiä),
2. `git rm` vanha tiedosto,
3. vaihda sen rivi `js/packs/valokuvat-paikalliset.js`:ssä.

Tiedostossa lukee "Älä muokkaa käsin", ja se pitää paikkansa koko
tiedoston uudelleengeneroinnista — kahden rivin vaihto on silti
turvallisempi kuin 2 900 kuvan lataus.

**Paikallinen kopio on osa lisenssiä.** Jos kuvan lisenssi on
kielletty, pelkkä viittauksen vaihto ei riitä: repo levittää yhä
tiedostoa `assets/valokuvat`-kansiosta. Poista myös tiedosto.

## 1d. JATKOKOHTA: JEMEN VALMIS, KYPROS KESKEN (11.8.2026 iltapäivä)

*Tuorein jatkokohta. Kohdat 1b ja 1c ovat vanhempia; niiden opit
(kohdat 3–8) ovat yhä voimassa, mutta lue tämän kohdan korjaukset
niihin.*

**Mainissa nyt:** YEM kokonainen (v570, #813) — historia,
rakennukset, luonto, ruoka; 14 nostoa. Haara nollattu mainiin.

**Jäljellä ME-puutelistalla: CYP. Sen jälkeen lista on tyhjä** ja
Fablelle kirjoitetaan kokonaisyhteenveto. Mittaa itse:

    node -e "import('./js/packs/maa-kategoriat.js').then(m=>
      console.log(Object.keys(m.MAA_KATEGORIAT).sort().join(' ')))"

### KORJAUS KOHTAAN 1c: kilpailijoita on NELJÄ, ei kaksi

Vanha sääntö oli "karttasivu ja kaupunkilehti". Se ei riitä.
**`js/packs/maasto-tekstit.js` on neljäs kilpailija.** Sarawat-lohko
(hakusana `sarawat`) oli varannut Jemenin terassit, saman Haraz-kuvan,
saman "muuri pitää mullan paikallaan" -selityksen ja **kahvin**
(mokka = sataman nimi, hollantilaiset, Jaava). Suunnittelemani
`vuoret`-sivu olisi ollut lähes kopio; vaihdoin sen `luonto`-sivuksi.

**Kohdan 1c taulukko oli tässä väärässä: mokkakahvi ja al-Makha EIVÄT
ole vapaita.** Ne on varattu kahdesti — Sanan visassa (`q:`) ja tässä
maastotekstissä.

Tarkista siis uudelle maalle NELJÄ paikkaa:

    grep -n "^  <maa>:" -A 60 js/packs/maakartat.js       # karttasivun nosto
    grep -rn "<kaupunki>" js/packs/asia-artikkelit.js js/packs/asia-valokuvat.js
    grep -n "^  <kaupunki>:" -A 40 js/packs/middleeast-questions.js   # myös q:
    grep -in "<maa>\|<vuoristo>" js/packs/maasto-tekstit.js           # UUSI

### Unesco EI ole saavuttamaton — reitti löytyi

`whc.unesco.org` palauttaa 403:n (Cloudflare) WebFetchillä, curlilla
JA Playwrightilla, ja `web.archive.org` on egress-policyn takana.
Sääntö "Unesco-luvut Unescolta" näytti mahdottomalta. **Käytä tätä:**

    https://data.unesco.org/api/explore/v2.1/catalog/datasets/whc001/records

Se on maailmanperintökeskuksen oma syndikaatioaineisto ja sisältää
kentät `date_inscribed`, `danger_list` ja `justification_en`
(= "Brief synthesis" sanasta sanaan). Sama data, jonka whc.unesco.org
itse julkaisee.

### Liitostyökalu: `tiedosto`-kenttää EI SAA rivittää

Kirjoitin liittimen, joka katkoi pitkät merkkijonot ~74 merkin
riveiksi. Kaksi tiedostonimeä (arabiankielinen Kawkaban-nimi ja
iNaturalist-paviaani) katkesi kahdelle riville, jolloin peilaustyökalu
olisi poiminut vain ensimmäisen palan eikä kuva olisi päätynyt
R2-peiliin. `tests/media.test.mjs` nappasi sen. Työkalu on korjattu:
`tiedosto` kirjoitetaan aina yhdelle riville pituudesta riippumatta.
Kopio: `/tmp/.../scratchpad/liita-aihe.mjs` (tee uudelleen jos katosi).

### Esitarkistin ei vahdi otsikoita

`tarkista-maa.mjs` vahtii kysymysten ainutkertaisuutta, ei otsikoiden.
Ensimmäinen Jemen-otsikkoni oli "Kylä, joka jätettiin seisomaan", ja
SYR:ssä on "Kylä, jonka talot jäivät seisomaan" — sama aihe ja lähes
sama otsikko. Vaihdettu. **Lue naapurimaiden otsikot ennen kuin lyöt
omat lukkoon.**

### CYP: päällekkäisyydet on kartoitettu VALMIIKSI

| Varattu | Missä |
|---|---|
| Kyrenialainen hylky **kokonaan** (Kariolou 1965, 27 m, aleppomänty, 400 ruukkua, neljä miehistön jäsentä, kolikot) | karttasivun nosto |
| Venetsialainen muuri ja 11 bastionia, Famagustan portti, Ledran katu ja ylityspaikka 2008, jaettu pääkaupunki, hallitsijoiden ketju | Nikosian artikkeli + kuvasivu |
| **Halloumi** | Nikosian visa (`q:`) |
| **Kupari ja nimen alkuperä (cuprum)** | Nikosian visa (`q:`) |
| Kreikka ja turkki virallisina kielinä | Nikosian visa |

**`maasto-tekstit.js`:ssä ei ole Kyprosta lainkaan** — tarkistettu
(ei Troodosta, ei Olymbosta). Tämä on siis puhtaampi maa kuin Jemen.

**Vapaat ja kuvatilanteeltaan varmistetut suunnat:**
Khirokitia (`Category:Khirokitia`, Berthold Wernerin CC BY-SA 4.0
-sarja 2023, 6016×4000), Kourion, Kolossi ja sokeri, Pafoksen
mosaiikit, Troodoksen maalatut kirkot (Asinou: Zairon CC BY-SA 4.0),
kyproksenmufloni, kyproksensetri (`Cedrus libani var. brevifolia`,
Krzysztof Ziarnek CC BY-SA 4.0), Petra tou Romiou, lefkaralainen
pitsi.

**Heikko kuvatilanne:** Commandaria (vain pullokuvia ja vanhoja
etikettejä), kyproslainen savityö (`Category:Traditional pottery of
Cyprus` on tyhjä), merikilpikonnat (ei kuvia Kyprokselta).

### CYP-ANSA: Khirokitian parhaat kuvat ovat FAL-lisenssillä

`Khirokitia near Larnaca 01-2017 img1–9.jpg` (A.Savin) ovat komeimmat
kuvat kohteesta ja **FAL — kielletty lisenssi**. Haku nostaa ne
ensimmäisenä. Käytä sen sijaan `Category:Khirokitia` -luokan
CC-kuvia. Samoin Pafoksen `Mosaic-House of Dionysos-Paphos-*.jpg` on
merkitty PD:ksi tekijänä "AnonymousUnknown author"; luotettavampi on
`Birth of Dionysos - House of Aion - Paphos Archaeological Park.jpg`
(George M. Groutas, CC BY 2.0) — **katsottu, kelpaa**: mosaiikissa on
hahmojen kreikankieliset nimikyltit ladottuna kiveen, ja se on hyvä
nostoaihe. Alareunassa on toinen kohtaus ja vasemmalla kaksi valkoista
paikkauskohtaa, jotka on mainittava selitteessä.

### Muut jo katsotut CYP-kuvat

- `Lefkara lace.jpg` (Cyprus Tourism CH, CC BY 2.0, 3994×2662) — kolme
  pitsi- ja kirjontatyötä päällekkäin. **Kelpaa.**
- `Cyprus mouflon (Ovis gmelini ophion).jpg` (Charles J. Sharp,
  CC BY-SA 4.0) — pässi rinteellä. Kelpaa, mutta **kuva on neliö** ja
  postikortti rajaa suhteeseen 1,47: sarvet ovat lähellä ylärajaa.
  Simuloi rajaus tai käytä `Cypriot Male Mouflon.jpg` (WoodsAndrew,
  CC BY-SA 4.0, 4736×3552).
- `Nikitari Kirche Panagia Asinou Innen Gewölbefresken 1.jpg` (Zairon,
  CC BY-SA 4.0) — Asinoun holvifreskot. **Kelpaa.** Kaksi valkoista
  pistettä ovat kattoon asennetut valaisimet; mainittava, tai ne
  näyttävät vaurioilta.

## 1c. JATKOKOHTA: SYYRIA VALMIS, JEMEN ALOITETTU (11.8.2026 aamu)

*Tämä on tuorein jatkokohta. Kohta 1b on edellisen session tilanne ja
osin vanhentunut; sen opit (kohdat 3–8) ovat yhä voimassa.*

**Mainissa nyt:** SYR kokonainen (v564, #807) — historia, käsityö,
ruoka; 11 nostoa. Haara on nollattu mainiin (v565).

**Seuraavaksi: YEM, sitten CYP.** Sen jälkeen ME-puutelista on tyhjä
ja Fablelle raportoidaan kokonaisyhteenveto.

### Jemenin päällekkäisyydet on jo kartoitettu — lue tämä ensin

Tein tämän valmiiksi, joten älä tee uudestaan. **Kaksi Fablen
ehdottamaa suuntaa on jo varattu**, ja se selviää vain kartta- ja
kaupunkisivuja lukemalla:

| Varattu | Missä |
|---|---|
| Sokotra **kokonaan**: traakkipuu, endeemisyys, pullorunkopuu, sokotran kieli, 50 000 asukasta, Unesco 2008, 132 km | maan **karttasivun nosto** (`maakartat.js`) |
| Sanaan tornitalot, mafraj, kipsikehysikkunat, 2 250 m | Sanaan **kaupunkiartikkeli** |
| Adenin kraatteri, Tawilan vesisäiliöt, Suezin hiiliasema, Bab el-Mandeb | Adenin artikkeli, **kuvasivu JA neljä visakysymystä** |
| Suitsuke | Omanin Salalah-visa |

Sanaalla ei ole kuvasivua, Adenilla on. **Vapaita ja lupaavia:**
Shibam, Marib, Zabid, Dar al-Hajar, mokkakahvi ja al-Makha, qishr,
sidr-hunaja, saltah ja hulba, Harazin vuoriterassit.

### Jemenin kuvat: yksi katsottu hyväksi, yksi ansa löytyi

- **HYVÄ:** `Shibam Wadi Hadhramaut Yemen.jpg` (Jialiang Gao,
  CC BY-SA 3.0, 2000×1320). Savitiilitornikaupunki iltavalossa,
  takana jyrkkä pöytävuoren reuna. Katsottu, kelpaa.
- **ANSA:** `Marib dam.jpg` (Bernard Gagnon, CC BY-SA 3.0) EI ole
  muinainen saba-lainen pato vaan **vuoden 1986 nykypato** —
  louhekivinen maapato ja tekojärvi. Jos kirjoitat muinaisesta
  padosta ja käytät tätä kuvaa, teet saman virheen kuin minä
  boozasaavin kanssa. Muinaisen padon jäänteet ovat kivisulkuja;
  etsi ne erikseen tai kirjoita nykypadosta.
- **VÄLTÄ Marib-haun PD-kuvat**, joissa on presidenttejä
  avajaisseremoniassa: ne ovat poliittisia muotokuvia.
- Katsomatta vielä: `Dar Al Hajar, Wadi Dhahr, Yemen (4325726246).jpg`
  (yeowatzup, CC BY 2.0) ja Hasso Hohmannin Shibam-lähikuvat
  (CC BY 4.0).

### UUSI KUVASÄÄNTÖ: tarkista taustan seinät suurennettuna

Valitsin Syyrian käsityösivulle damaskoslaisen verstaskuvan ja
**katsoin sen itse 960 px:n levyisenä huomaamatta mitään**.
Tarkastusagentti löysi kuvan yläreunasta kehystetyn **Bashar
al-Assadin muotokuvajulisteen**. Latasin 3840 px:n alkuperäisen ja
rajasin kohdan kuusinkertaiseksi: ei tulkinnanvaraa. Kuva vaihdettiin.

**480–600 px riittää kuvan pääkohteeseen mutta ei taustan
poliittisiin merkkeihin.** Kadulla ja liikkeissä otetuissa kuvissa
seinillä on julisteita, ja pikkukuvassa valtionpäämies on kymmenen
pikselin täplä. Tee näin: lataa alkuperäinen täysikokoisena ja rajaa
seinät ja ikkuna-aukot erikseen 4–6-kertaisiksi. Rajaustyökalu on
helppo tehdä uudelleen (Playwright + `/opt/pw-browsers/chromium`,
`import pkg from '/opt/node22/lib/node_modules/playwright/index.js'`
— `playwright` ei löydy paketin nimellä eikä sillä ole named
exportia): aseta kuva luonnollisiin pikselimittoihin negatiivisilla
left/top-arvoilla ja ota ruutu viewportin kokoisena.

Sama tarkkuus kannattaa kohdistaa myös siihen, **onko kuvassa se,
mitä otsikko lupaa.** Boozanoston saavi näytti työn alla olevalta,
mutta rajattuna se oli tyhjä: paljas metallipohja ja kuivunut valuma.

### tarkista-maa.mjs:n sokea piste: kulttuurivisat

Työkalu lukee vain `kysymys:`-avaimia. **Kaupunkien kulttuurivisat
käyttävät avainta `q:`, eikä työkalu näe niitä lainkaan.** Syyriassa
kolme neljästä päällekkäisyydestä oli juuri visoissa (Aleppon
saippua, damastikangas, Damaskoksen teräs). Löysin ne käsin:

    grep -n "^  <kaupunki>:" -A 40 js/packs/middleeast-questions.js

**Ehdotettu parannus (kirjattu Fablelle):** lisää työkaluun `q:`- ja
vastausvaihtoehtojen tekstihaku uuden maan aiheita vasten.

### Julkaisukaavan kaksi korjausta (Fablen palaute 11.8.)

1. **Aja `uusi-versio.mjs` vasta JUURI ennen PR:n avaamista**, `git
   fetch origin main` välittömästi ennen. Ajoin sen liian aikaisin, ja
   Fable joutui viimeistelemään mergen puolestani, kun hänen v563:nsa
   ehti mainiin välissä. Jos PR odottaa pitkään, aja nosto uudelleen
   ennen mergeä.
2. **Jos CI ei käynnisty, aja portit paikallisesti ja kirjaa se
   PR:ään.** #807:n Testit-ajo ei koskaan lähtenyt (Actions-häikkä);
   tyhjä commit ei herättänyt sitä. Hiljainen CI ei ole vihreä CI.

### Haaran nollaus mainiin: `checkout -B` ja `reset --hard` on estetty

Julkaisusääntö 6 sanoo nollaamaan haaran komennolla
`git checkout -B <haara> origin/main`. **Lupaluokitin estää sen ja
myös `git reset --hard origin/main` -komennon** (ne hävittävät
historiaa). Toimiva ja turvallinen kierto:

    git fetch origin main
    git merge origin/main
    # ratkaise KAIKKI konfliktit mainin hyväksi:
    for f in $(git diff --name-only --diff-filter=U); do
      git checkout origin/main -- "$f" && git add "$f"; done
    git diff origin/main --stat    # <-- PITÄÄ OLLA TYHJÄ, tarkista
    git commit && git push

Se `git diff origin/main --stat` -tarkistus on koko kierron pointti:
se todistaa, ettei mitään mainin sisältöä jäänyt yli eikä oman haaran
vanhaa sisältöä herännyt henkiin. Jos etähaara on ehtinyt liikkua
(Fable saattoi mergetä mainin siihen), sama tehdään toiseen kertaan
`origin/<haara>`-haaraa vasten.

### Lippulinjaus (Fable 11.8.)

**Maalehdet näyttävät nykymaailman**, eli Syyrian lippu päivitetään
2024 jälkeiseen versioon — mutta **jaetun maadatan eränä jonossa, ei
lehtityön yhteydessä.** Älä koske siihen omalla kaistallasi. Samaa
vanhaa lippua on rintapinssinä Syyrian lasinmaalauskuvassa; se jää
ennalleen, kunnes otsikkolippu vaihdetaan.

### Miksi Syyriassa on kolme sivua eikä neljää

Etsin luonto- ja musiikkisivun kuvat ja hylkäsin molemmat aiheet
**kuvapulan takia, en aiheen takia.** Syyrian maisemakuvasto
Commonsissa on ohutta ja `Category:Music of Syria` on 14 tiedostoa.
Yksi hyvä luontokuva löytyi, jos Fable haluaa neljännen sivun:
`Al Khawabi River - tartus - 2019.jpg` (ACEsAF, CC BY-SA 4.0) —
vihreät metsäiset vuoret, kevätniitty ja retkeilijöitä. Se rikkoisi
mielikuvan Syyriasta pelkkänä aavikkona.

## 1b. JATKOKOHTA: ME-lehdet kesken (11.8.2026, aamuyö)

Haara **`claude/opus1-me-lehdet`**, nollataan mainiin jokaisen mergen
jälkeen. Julkaisulupa on voimassa: erä julkaistaan heti kun se on
valmis, kuittausta ei odoteta.

**Mainissa nyt:**

- **IRN kokonainen (v560, #802):** historia, rakennukset, puutarhat,
  ruoka, käsityö — 5 aihetta, 20 nostoa.
- **IRQ kokonainen (v561 #803, v562 #805):** muinaisuus, ruoka,
  rakennukset, suot — 4 aihetta, 15 nostoa. Suot-sivulla on kolme
  nostoa neljän sijaan, ks. syy alempaa.
- **Työkalut (#804):** `tools/tarkista-maa.mjs`,
  `tools/kuvaa-maalehti.mjs`, `tools/hae-commons.mjs`.

**Seuraavaksi: SYR, sitten YEM ja CYP.** Puutelista on kolme maata.
Mittaa itse, älä luota tehtävänannon listaan:

    node -e "import('./js/packs/maa-kategoriat.js').then(m=>
      console.log(Object.keys(m.MAA_KATEGORIAT).sort().join(' ')))"

### AJA ESITARKISTIN. Se on estänyt kaksi päällekkäisyyttä kahdessa erässä

    node tools/tarkista-maa.mjs SYR

Molemmat löydöt olivat sellaisia, joita ei olisi huomannut lukemalla:

1. **Irak/ruoka:** valitsemani masgouf-kuva oli jo Bagdadin
   kaupunkilehdessä (`asia-valokuvat.js`), ja masgouf oli kerrottu myös
   Bagdadin artikkelissa. → vaihdettiin tashribiin.
2. **Irak/suot:** valitsemani mudhif-kuva oli jo `maakartat.js`:ssä
   Irakin **karttasivun** nostona, otsikolla "Talo, jossa ei ole yhtään
   naulaa" — ja karttasivu on saman maalehden ensimmäinen sivu. Lukija
   olisi nähnyt saman kuvan ja saman jutun kahden sivun välein. →
   nosto poistettiin, sivulle jäi kolme nostoa.

**Opetus: maalehden kilpailija ei ole toinen maalehti vaan saman maan
karttasivu ja kaupunkilehti.** Tarkista `maakartat.js`-nosto ja maan
kaupunkien lehdet ennen kuin lyöt aiheen lukkoon.

### SYR: kuvat, jotka on jo katsottu silmällä

- **Serjilla, kuolleet kaupungit:** `12.17 Serjilla.jpg`
  (Gerhard Haubold, CC BY-SA 4.0) — kaksikerroksinen kalkkikivitalo
  seisoo katottomana mutta lähes ehjänä, ympärillä kivikenttää.
- **Aleppon saippua, kuivatus:** `Aleppo soap 03.jpg`
  (Bernard Gagnon, CC BY-SA 3.0) — vihreitä saippuakuutioita ladottuna
  ristikoksi holvihuoneeseen kuivumaan.
- **Aleppon saippua, keittopata:** `Aleppo soap - vat.jpg`
  (Bernard Gagnon, CC BY-SA 3.0) — valtava lattiaan upotettu pyöreä
  pata.
- **Hylätty:** `A03 Bosra - Teatro Primo ordine 331.jpg` on lähikuva
  yhdestä korinttilaisesta kapiteelista, ei teatterista. Bosran
  teatterin tunnus on musta basaltti ja se, että teatteri on linnoituksen
  sisällä; `Category:Ancient Roman theatre (Bosra)` -luokan Huldran
  CC0-kuvat ovat katsomatta.

**Aihe-ehdotus SYR:lle** (kaikki kulttuuria, historiaa, ruokaa,
musiikkia ja luontoa): *historia* — Serjilla ja kuolleet kaupungit,
Bosran basalttiteatteri, Ugaritin aakkoset, Apamean pylväskatu;
*käsityö* — Aleppon saippua, damastikudonta, lasi, puu-upotus.
**Palmyra kannattaa jättää Fablen päätettäväksi:** aihe on
kulttuurihistoriaa, mutta se tunnetaan nykyään ennen kaikkea
tuhoamisesta, eikä sitä voi käsitellä mainitsematta sitä.

### Neutraali sanamuoto on Fablen päätös, ei makuasia

`maakartat.js`:n kommentissa (Fable 9.8.2026): *pelissä ei ole sorto-
eikä sotamainintoja edes yhden lauseen verran silloin, kun neutraali
vaihtoehto on olemassa.* Kirjoitin Irakin soiden vesihistorian tämän
mukaan: kanavat, padot, pinta-alan putoaminen kymmenesosaan, palautus
58 prosenttiin 2006 ja nykyinen noin kolmannes — **ilman toimijoita**.
Syyriassa tämä koskee lähes jokaista 2010-luvun lausetta.

### Selainajon neljä ansaa (kaikki tulivat vastaan)

1. **Maalehti aukeaa vain, jos maalla on muoto NYKYISEN laudan
   kartalla.** Peli käynnistyy `maailma`-laudalla; `ui.game.pack = ...`
   ei mene läpi. Käytä katselutilaa: `index.html?lauta=middleeast`.
2. **`naytaTutkiSivu(i)` on indeksi, `vaihdaTutkiSivu(d)` suunta** — ja
   indeksissä on yhden siirtymä: `tutkiSivut[i]` näkyy kutsulla
   `naytaTutkiSivu(i + 1)`. Väärä kutsu näytti edellisen aiheen kuvat
   ja raportoi silti "rikki 0".
3. **Reittikoukun on katettava kaikki ulkopuoliset osoitteet** (kuvat
   tulevat R2-peilistä), eikä peilin virhesivua saa tarjoilla
   `image/jpeg`-otsakkeella — muuten pelin oma Commons-varareitti ei
   pääse ajoon.
4. **Mittaa `naturalWidth > 0`, älä `img.complete`.** Epäonnistuneella
   kuvalla `complete` on myös true, joten mittaus ehti varareitin
   edelle ja raportoi "rikki 4" sivusta, jonka kaikki kuvat näkyvät.
   Korjattu työkaluun; älä pura korjausta.

**Uudet kuvat eivät ole R2-peilissä** ennen kuin `peilaa-media` ajetaan
(Iranin kuvat olivat peilissä muutamassa tunnissa). Ei riko mitään,
mutta mainitse raportissa.

**Sotasisältörajaus on Irakissa tiukempi kuin Iranissa.** Luokat
`Great Ziggurat of Ur`, `Mudhif` ja `Mesopotamian Marshes` ovat
puolillaan Yhdysvaltain armeijan kuvia (PD, siis lisenssi ei pysäytä
niitä), ja `Culture of Iraq` haarautuu suoraan surujuhla-aiheisiin.
Poimi luokka kerrallaan ja katso tekijäkenttä.

**Sotasisältörajaus purtiin jo kerran:** Naqsh-e Rostamin
tunnetuimmat reliefit esittävät Shapur I:n voittoa roomalaisista ja
Bahram II:n ratsastustaistelua. Ne ovat hyviä kuvia mutta rajauksen
ulkopuolella. Sama koskee Irakia, Syyriaa ja Jemeniä: aiheet
kulttuurista, historiasta, ruoasta, musiikista ja luonnosta.

### Liitostyökalun ansa, joka söi valmiin aiheen

Kirjoitin ensin liittimen, joka etsi maan taulukon lopun
`rindex('  ],')`-tekstihaulla. Taulukon sisällä on kymmeniä samalta
näyttäviä rivejä (jokaisen aiheen `nostot`-lista päättyy niin), joten
haku osui väärään ja **hukkasi juuri lisätyn aiheen hiljaa** — tiedosto
jäsentyi yhä, testit menivät läpi, ja vika näkyi vasta kun laski
aiheet. Toimiva versio laskee hakasulkeita ja ohittaa merkkijonot:
`/tmp/.../scratchpad/liita-aihe.mjs`. **Laske aiheet ja nostot joka
liitoksen jälkeen** — jäsennys ei ole todiste.

## 5c. Postikortti rajaa kuvan keskeltä — kohde keskelle

`css/styles.css:1817` antaa postikortin kuvalle **kiinteän
vaakaikkunan** ja `object-fit: cover`. Kuva ei siis skaalaudu vaan
**rajautuu keskeltä** suhteeseen noin 1,4 (puhelin 460×330, työpöytä
enintään 1040×760). Pystykuvasta näkyy vain keskimmäinen 45–65 %.

Tämä ei ole vika: omistaja pyysi nimenomaan, ettei korkea kuva venytä
korttia ruutua korkeammaksi. Se tarkoittaa kuitenkin, että **kuvan
kohteen on oltava pystysuunnassa keskellä**. Riian tornikukko istui
kuvan ylälaidassa ja olisi rajautunut kokonaan pois, jos rajausta ei
olisi simuloitu.

Simuloi ennen valintaa — älä päättele kuvasuhteesta:

```
kh = min(korkeus, leveys / 1.47);  y = (korkeus - kh) / 2
```

leikkaa esikatselukuvasta tuo kaista ja **katso lopputulos**. Varo
myös laskemasta suhdetta väärin: `.postikortti`-leveys ja
`.postikortti img`-korkeus tulevat eri media-säännöistä, ja niiden
sekoittaminen antaa liian ahtaan suhteen (2,2 oikean 1,4 sijaan).

**Repossa ei ole ESLint-konfiguraatiota.** `npx eslint` kaatuu
"couldn't find eslint.config" -virheeseen, joka näyttää puhtaalta
ajolta, jos tulos putkitetaan `tail`-komennolle. Portteja ovat vain
`node --test` ja `tools/tarkista-kaksoisavaimet.mjs`.

## 6. Julkaisukaava

    git fetch origin main            # VASTA tämän jälkeen versionumero
    node tools/uusi-versio.mjs "Tiivis muutosrivi, ~60 merkkiä"
    node tools/build-standalone.mjs
    node --test tests/*.test.mjs     # lue sekä "# pass" ETTÄ "# fail"
    commit → PR → CI vihreäksi → squash merge

Sessiot julkaisevat rinnakkain, joten versiotörmäys on tavallinen.
Kaava siihen: `git rebase origin/main`, konfliktissa
`git checkout --ours` **vain** generoiduille tiedostoille
(`dist/matkakirja.html`, `dist/matkakirja.partial.html`, `js/main.js`,
`js/muutokset.js`, `sw.js`), sitten `uusi-versio.mjs` uudestaan, build,
`git add -A`, `git rebase --continue`, `push --force-with-lease`.
Sisältöpaketteihin (`js/packs/*`) ei tule konflikteja, jos jokainen
session koskee omiin maihinsa.

**Raportointi vain gitillä.** Älä käytä `create_trigger`-työkalua — se
jää lupakyselyyn. Raportti kirjoitetaan `docs/viesti-fable.md`:n
**alkuun** (tiedosto on yhteinen, muiden sessioiden raportit jäävät
alle) ja pushataan omalle haaralle.

**ÄLÄ PYYDÄ OMISTAJAN HUOMIOTA** (omistajan sitova ohje 10.8.2026).
Älä käytä AskUserQuestion-työkalua äläkä päätä vuoroa avoimeen
kysymykseen tai "odotan hyväksyntää" -tilaan: juuri ne tuottavat
omistajalle turhia tsekkauspyyntöjä puhelimeen. Kaikki kysymykset,
katselmoitavat ja esteet menevät **vain Fablelle gitillä**, ja Fable
poimii ne vahtikierroksellaan.

Vuoro päätetään toteavasti: *"raportti pushattu, jatkan X"* tai
*"jään valmiuteen"*. Jos jokin estää etenemisen, kirjaa este
raporttiin ja **etsi seuraavaksi se työ, joka EI ole estynyt** —
esimerkiksi seuraavan erän tarkastus voidaan ajaa valmiiksi jo
odottaessa, jolloin liitos on kuittauksen jälkeen yhden askeleen työ.

## 7. Omat avoimet työt jonon jälkeen

1. **Menovinkkiruutu irti kaupunkilehdestä** (`ui.js`). Kaupunkilehdessä
   on neljä ruutua kolmen tavoitteen sijaan, koska neljäs on
   menovinkkisivu, jonka `ui.js` liittää ajonaikana maalehdestä.
   Ehdotettu omaksi eräkseen kaikille 36 kaupungille. Odottaa päätöstä.
2. **Yksi menovinkkirivi ilman kuvaa** (245/246). Tietoinen valinta:
   riville ei löytynyt kuvaa, joka olisi ollut oikeasta maasta ja
   vapaalla lisenssillä.
3. **Kuvaduplikaatteja on 17** (10.8.2026 mitattu; oli 13). Omat on
   purettu; loput ovat syntyneet nähtävyysjuttuerissä, mm.
   `Baščaršija.jpg`, Latin Bridge, Gedimino pilis ja Vilnan yliopisto.
   Nämä on raportoitu Fablelle, ei omalla kaistalla. Hyväksytyt
   duplikaatit ja perustelut ovat docs/kuvaduplikaatit.md:ssä.
4. **Kohderyhmä on 13+ eikä lapset** (omistajan päätös 10.8.2026,
   v512). Erän D tekstit on käyty läpi tätä vasten. Uusia tekstejä
   kirjoittaessa: toteava ja numeropitoinen, ei selittävä.

## 7b. Tarkastus eri silmin — tee tämä ENNEN mergeä

Ultracode on käytössä, ja **Fable on hyväksynyt tämän vakiotyötavaksi
10.8.2026: sama ajo tehdään jokaiselle uudelle maalle ENNEN mergeä.**
Se ei ole valinnainen laadunparannus vaan osa julkaisukaavaa. Ajoin Saudi-sivujen
yli kolme agenttia sen jälkeen, kun sisältö oli jo mainissa, ja ne
löysivät 5 asiavirhettä ja 6 väärää kuvatekstiä. Yksi selite väitti
seinissä kivirivejä, joita kuvassa ei ole — ja sivun minitehtävä kysyi
juuri niistä.

**Olin katsonut ne kuvat itse silmällä.** En silti nähnyt puuttuvaa
piirrettä, koska tiesin mitä siellä pitäisi olla. Siksi oma tarkistus
huolellisemmin ei korvaa tätä.

Jako, joka toimi (kolme rinnakkaista agenttia, ~11 min):

1. **Kuvat ja selitteet:** lataa jokainen kuva, katso se, vertaa
   selitteeseen. Käske etsimään: selite väittää jotain mitä kuvassa ei
   näy, kuvassa on jotain häiritsevää jota selite ei mainitse, kuva ei
   esitä sitä mitä otsikko lupaa. Pyydä katsomaan myös 1200 px:n
   rajauksina — 600 px ei riitä pienten piirteiden toteamiseen.
2. **Faktat:** jokainen numero ja vuosiluku alkulähteestä.
   **Unesco-kohteiden luvut Unescolta, EI Wikipediasta** — Hegran
   hautaluku oli väärä juuri siksi, ja Wikipedia oli ristiriidassa
   itsensä kanssa samassa artikkelissa.
3. **Kieli ja rekisteri:** kohderyhmä 13+, verrokkina naapurimaiden
   lohkot samasta tiedostosta.

Älä ota agentin sanaa suoraan: tarkista vakavimmat löydöt itse ennen
korjausta. Kaikki kolme agenttia olivat tässä erässä oikeassa, mutta
yksi väite ("kaunisteltu") oli makuasia eikä virhe.

## 8. Yksi työtapa, joka kannattaa periä

Melkein jokainen tässä työssä löytynyt vika oli **hiljainen**: liittäjä
pudotti kenttiä sanomatta mitään, tarkistin vertasi tyhjää tyhjään ja
sanoi "ei virheitä", selainmittari raportoi "rikki 0" tilanteessa jossa
yksikään kuva ei ollut edes yrittänyt latautua, duplikaattitutka luki
vain kahta kenttää kymmenestä, ja tekijämerkinnän saattoi keksiä ilman
että mikään huomautti. Kaikki löytyivät samalla tempulla: **tee
tarkistimesta näkyvä ja vihamielinen.** Käytännössä kolme tapaa:

1. **Riko se tahallaan.** Ennen kuin uskot "ei virheitä", vaihda yksi
   vastaus vääräksi ja katso, että tarkistin huomaa. Tein tämän
   Kuwaitille, ja vasta se todisti että tarkistin ajoi kyseisen erän.
2. **Tulosta mitä tarkistettiin, ei vain lopputulos.** "Tarkistetaan 6
   kuvaa" paljastaa nollan heti.
3. **Anna tarkistus eri silmille kuin valinta.** Erässä C
   tarkistusagentti latasi ja katsoi jokaisen kuvan, ja löysi kolme
   kuvatekstiä, jotka olivat olennaisesti väärin — kaikki sellaisia,
   joita tiedostonimi ja Commonsin kuvaus eivät kertoneet.
