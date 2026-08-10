# Opus 1 → Fable: erä D puoliksi maalissa, Bahrain tyssäsi lautaan (10.8.2026)

**Mainissa nyt: v514 (tekijämerkinnät, #752) ja v515 (Saudi-Arabia,
#754).** `# pass 578 / # fail 0` molemmissa. Uusi tili, uusi kontti;
taustatutkimus ja kertakäyttötyökalut tehtiin alusta.

**Yksi asia vaatii sinun päätöksesi: Bahrain.** Se on kohdassa 3.

## 1. Tekijämerkintöjen lupa-ajo (v514, #752)

Ajoin `tarkista-tekijat.mjs`:n kaikkien 86 paketin yli, 2 720
merkintää. Löytyi enemmän kuin odotin, ja pahin ei ollut väärä nimi
vaan **puuttuva nimi**:

- **32 kuvaa `europe-valokuvat.js`:ssä ilman tekijää.** Koko
  lähdemerkintä oli lisenssitunnus, esim. `lahde: 'CC BY-SA 4.0'`.
  CC BY vaatii nimeämisen, joten nämä näytettiin ehtojen vastaisesti.
  Nimet haettiin Commonsin API:sta.
- **4 lippua** puuttui `lippu-tekijat.js`:stä (työkalun generoima).
- **4 väärää lisenssimerkintää.** Kaksi näistä esitti CC BY-SA -kuvan
  public domainina: Struwwelpeter-sivu (`maa-kategoriat.js`) ja
  Nevskin katedraali 1900 (`nahtavyysjutut.js`).

**Miksi ne olivat jääneet huomaamatta — ja miksi tämä oli lähellä
mennä pahasti pieleen.** `lisaa-tekijat.mjs` päätteli tekijän
merkinnän ALUSTA: "ei ala arkiston nimellä" ⇒ tekijä on jo.
Paketeissa on kuitenkin **kolme eri kenttäjärjestystä**:

    Diego Delso, Wikimedia Commons (CC BY-SA 4.0)   tekijä alussa
    CC BY-SA 3.0 (Wolfgang Moroder, Commons)        tekijä suluissa
    Wikimedia Commons (CC BY 2.0), James St. John   tekijä lopussa
    CC BY-SA 4.0                                    ei tekijää

Sääntö meni väärin molempiin suuntiin. Se piti neljättä muotoa
tekijällisenä — siksi ne 32 ohitettiin joka ajolla hiljaa. Ja se piti
muotoja 2 ja 3 tekijättöminä: **jos olisin ajanut työkalun
sellaisenaan `--kirjoita`, se olisi kirjoittanut tekijän nimen toiseen
kertaan 155 merkintään**, mm. koko `maasto-tekstit.js`:ään. Huomasin
tämän vain siksi, että ajoin kuivaharjoituksen ja laskin rivit.
Tunnistus ei enää katso järjestystä vaan pilkkoo merkinnän osiin.

**Tahalliset erot, joihin en koskenut (listaus pyynnöstäsi).**
Poikkeamia jäi 139, ja ne ovat käytännössä kaikki tarkoituksellisia:
suomennetut laitosnimet (*Turkin tasavallan presidentin kanslia* /
"Presidency of the Republic of Turkey"), translitteroinnit
(*Jevgeni Haldei* / "Yevgeny Khaldei", *Vjatseslav Buharov* /
"Vyacheslav Bukharov"), Commonsin käyttäjätunnus vs. oikea nimi
(*David Iliff* / "Diliff", *Sarah Stierch* / "Missvain") ja API:n
rikkomat tarkkeet (*Kıvanç* / "K?vanç"). Näistä ei kannata tehdä
mitään.

**Kaksi havaintoa, jotka jätän sinulle (eivät omalla kaistallani):**

1. **Neljä kuvaa on kielletyllä lisenssillä.** CLAUDE.md sallii vain
   PD/CC0/CC BY/CC BY-SA. Nämä eivät ole:
   `Lunar Rainbow at Victoria Falls` (FAL) ja `Mount Kilimanjaro`
   (GFDL 1.2) `africa-kulttuuri.js`:ssä, sekä kaksi A. Savinin
   Karachi-kuvaa (FAL) `asia-lisat-valokuvat.js`:ssä. Korjaus vaatii
   korvaavat kuvat, eli sisältötyötä toisen kaistalla — en tehnyt sitä.
2. **383 PD/CC0-kuvaa on ilman tekijän nimeä.** Ei lisenssirikkomus,
   joten en muuttanut niitä. Jos haluat ne täydennettäviksi,
   `lisaa-tekijat.mjs` osaa sen nyt yhdellä ajolla.

## 2. Saudi-Arabia (v515, #754)

Kolme aihesivua, kolme juttua kullakin. **Ei Mekkaa, ei Medinaa, ei
pyhiinvaellusta, ei sotasisältöä.**

- **Kalliot** — Hegran 131 kalliohautaa ja kesken jäänyt Qasr al-Farid,
  Jubbahin kalliopiirrokset ja kadonnut järvi, AlUlan vanha kaupunki,
  jonka talot ovat itse kaupungin muuri.
- **Vuoret** — Asirin vihreä vuoristo ja porrasviljelmät, savitornitalot
  ja niiden sadevesirivat, al-qatt al-asiri -seinämaalaus (Unesco 2017).
- **Meri** — Farasanin lähes 200 saarta satelliitista, kohonnut
  korallikivi, papukaijakala ja hareed-juhla.

Päällekkäisyys naapureihin tarkistettiin: aavikko on jo ARE:lla,
QAT:lla ja KWT:lla, mangrove ja flamingot ARE:lla, dhow ja
kilpikonnat OMN:lla. Siksi Rub al-Khali jäi väliin, vaikka se oli
listallasi — neljäs aavikkosivu peräkkäin olisi ollut toistoa.
Sanothan, jos haluat sen silti.

**Kuvat.** Yhdeksän, jokainen ladattu ja katsottu 600 px:n levyisenä
ennen selitteen kirjoittamista. Katsominen hylkäsi kaksi ehdokasta,
joiden tiedostonimi valehteli: *"Rijal Alma village from the inside"*
oli sisätila portaikkoineen, ei kylänäkymä, ja *"Bahrain's Pearling
Pathway"* oli nykyinen katunäkymä kauppakylttien ja pysäköityjen
autojen kanssa. Kumpaakaan ei olisi huomannut tiedostonimestä.

**Yhtään tekijänimeä ei kirjoitettu käsin** — lähdetäyttäjä hakee ne
API:sta. Se paljasti samalla oman bugini: siistimissääntö "X by Y"
söi lisenssistä "CC BY 2.0" → "2.0". Näkyi vain siksi, että työkalu
tulostaa kirjoittamansa rivit.

## 3. PÄÄTÖSTÄ VAATIVA: Bahrain ei ole laudalla

Bahrainin sisältö on **valmis** — kaksi sivua (helmenkalastus,
muinaisuus), kuusi juttua, kuvat katsottu, lähteet API:sta,
esitarkistin puhdas. Sitä ei voi liittää:

- Bahrainilla **ei ole maamuotoa yhdelläkään laudalla**:
  `middleeast-countries.js` 12 maata, `maailmankartta.js` 84 maata,
  ei kummassakaan BHR. Laudalla ei ole myöskään yhtään Bahrainin
  kaupunkia.
- `avaaMaalehti('BHR')` palaa heti rivillä `if (!maa) return;`, joten
  sivut olisivat kuollutta dataa.
- **Repo vahtii tätä jo itse:** `tests/maa-otsikot.test.mjs` kaatui
  heti liittämisen jälkeen viestiin *"BHR: maalla on aihesivuja mutta
  ei nimeä millään laudalla"*. Hyvä testi.

Korjaus on BHR:n lautageometria `middleeast-countries.js`:ään, joka on
**Opus 2:n kaista ja pilottitiedosto**, joten en koskenut siihen.
Huomaa myös, että tiedoston oma kommentti kertoo Jordanian ja Israelin
jääneen pois juuri siksi, ettei niillä ole laudalla kaupunkia johon
korostus kiinnittyisi — Bahrain on sama tapaus, joten tämä on
esitystapapäätös eikä pelkkä geometrian lisäys.

Valmis sisältö odottaa tiedostossa **`docs/erad-bahrain-valmis.json`**
(mainissa, #754:n mukana), otsakkeessaan syy ja se mitä tarvitaan. Se
liitetään sellaisenaan heti kun päätät esitystavan. **Erä D on siis
puoliksi kesken, ja odotan tästä ohjeen ennen erää E.**

## 4. Muuta huomattua

- **Kuvaduplikaatteja on nyt 17** (luovutuspaperissa 13). Yksikään ei
  ole uusista kuvista. Valtaosa on `nahtavyysjutut.js`:n ja
  `kulttuuri-kategoriat.js`:n välillä — mm. Latin Bridge, Baščaršija,
  Gedimino pilis, Vilnan yliopisto, Kööpenhaminan Rundetårn.
  Sonnet 2:n kaistaa, en koskenut.
- **Kohderyhmän muutos 13+ (v512) tuli kesken erän.** Luin sen ja
  kävin Saudi-tekstit läpi sitä vasten: ne ovat toteavia ja
  numeropitoisia, eivät lapsille selittäviä, joten en muuttanut niitä.
  Jos haluat rekisteriä vielä ylemmäs, kerro — se on helppo passi.
- **Versiotörmäyksiä oli kolme** (v512, v513, v514 menivät muille
  kesken työn). Kaavasi toimii; tein siitä skriptin, joka ottaa
  generoidut tiedostot mainista ja pysähtyy, jos konflikti on muualla.
- **Selainmittaria en ajanut.** Sen sijaan jokainen kuva ladattiin
  oikeasti proxyn läpi ja katsottiin — se todistaa latautumisen
  suoremmin kuin "rikki 0". Sano jos haluat silti Playwright-ajon.

## 5. Mitä tarvitsen sinulta

1. **Bahrain:** esitystapa vai odotetaanko? (kohta 3)
2. **Rub al-Khali:** neljäs aavikkosivu Saudille vai ei? (kohta 2)
3. **FAL/GFDL-kuvat:** kenelle korvaavien kuvien haku menee? (kohta 1)

---

# Opus 1 → Fable: ME-erä C valmis, jään valmiuteen (10.8.2026)

**v501 (Oman + Qatar) ja v507 (Egypti) mainissa; Kuwait (v511) on
PR #745:ssä ja mergeän sen heti kun CI on vihreä** — se on erän
viimeinen toimenpide, ei kesken jäävä työ.
`# tests 578 / # pass 577 / # fail 0`. Erä B:n raportti jäi haaralleni
rebasessa, joten sen ydin on tässä mukana. Jatkokohta on kirjattu
**docs/opus1-tilanne.md**:hen niin että toisen tilin uusi Opus voi
jatkaa suoraan siitä. **En aloita uusia eriä — jään valmiuteen.**

## Erä B: Oman ja Qatar (v501)

**Oman** — *Vuoret*: Jebel Shamsin rotko, Jebel Akhdarin terassikylät ja
ruusuvesi, suitsukehartsi. *Meri*: Surin dhow-telakka, vihreän
merikilpikonnan poikaset Ras al Jinzissä, Musandamin vuonot.
**Qatar** — *Aavikko*: Khor Al Adaidin sisämeri, Zekreetin sienikalliot,
hiekan alle jäänyt Al Zubarah. *Rakennukset*: kansallismuseon
aavikkoruusu, Souq Waqif, Islamilaisen taiteen museo.

Kirjoitin ensin Qatar-aiheen Omanin sivulle ja siirsin sen. Kirjaan
tämän, koska houkutus lainata naapurimaan aihetta kasvaa mitä
pienemmästä maasta on kyse.

## Erä C: Egypti (v507) ja Kuwait (v511)

**Egypti** oli jo seitsemän aihesivun maa, joten katsoin ensin mitä
puuttuu: **Eläimet** (Suezinlahden lintupullonkaula, dugongi
meriheinäniityllä, egyptinkilpikonna) ja **Käsityöt** (khayamiyan
ompelijoiden katu, Tunisin savenvalajakylä, nubialaiskylien maalatut
seinät).

**Kuwaitilla** ei ollut yhtään aihesivua. Nyt: **Linnut** (2–3 miljoonaa
läpimuuttavaa lintua vuodessa, Kubbarin 380 metriä leveä tiirasaari,
Al-Jahran ruovikko) ja **Aavikko** (Mitribahin 53,9 °C, talvisateen
jälkeinen kukinta ja arfaj, beduiinien sadu-kudonta).

## Kuwaitin sotaherkkyys: mitä tein ja miksi

Tutkimusvaiheessa nousi kolme kytkentää: Bubiyanin saarelle tehtiin
aseellinen maihinnousu 1.5.2026, Kubbarilla on kuusi vuoden 1991
sotahautaa, ja arfaj on noussut kestävyyden vertauskuvaksi tämän vuoden
iskujen aikana. Linjasi on **ei sotasisältöä**, joten:

- **Pudotin Bubiyanin kokonaan pois.** Kolmas lintujuttu olisi ollut sen
  vuorovesiuomista — aihe on hieno, mutta saarella on käynnissä olevan
  sodan tapahtumia. Tilalle tuli Al-Jahran kosteikko.
- **Kubbar jäi**, koska juttu kertoo tiirakoloniasta ja saari on
  luontokohde. Vuosi 1991 ei esiinny tekstissä.
- Hylkäsin myös kuvan, jossa muuttolinnut lensivät Vapaudentornin yli:
  torni on 1991-monumentti, ja se oli kuvan hallitsevin kohde.

Yksikään juttu ei mainitse sotaa, eikä maalehden nostoissa ole
wiki-linkkejä, joten lapsi ei päädy linkkiä seuraamallakaan
sota-artikkeliin. **Jos haluat Kuwaitin pois kokonaan tai Kubbarinkin
vaihtoon, sano — se on yhden erän työ.**

## Yksi asia, joka vaatii sinun päätöksesi

**Kirjoitin kuuden kuvan tekijän nimen muistista ja sain kaikki kuusi
väärin.** Kuwaitin `lahde`-kentissä oli keksittyjä mutta uskottavan
näköisiä nimiä. Sama vika oli lipsahtanut Egyptiin kahdesti, ja yksi
lisenssi oli merkitty public domainiksi, vaikka tiedoston wikitekstissä
lukee CC BY 4.0 (API:n `extmetadata` väittää siitä eri asiaa kuin sivun
oma lisenssimalline). Korjasin omani ja tein työkalun, joka kirjoittaa
kentän suoraan API:sta.

Tekijänmerkintä on CC BY:n **lisenssiehto**, joten väärä nimi on
rikkomus siinä missä puuttuvakin. `tools/lisaa-tekijat.mjs` täydentää
vain PUUTTUVAN tekijän eikä katso niitä rivejä, joissa nimi jo on —
siis juuri niitä, joissa tämä vika piilee. Lisäsin repoon
**`tools/tarkista-tekijat.mjs`**, joka vertaa olemassa olevat nimet
Commonsiin. Ajoin sen `maa-kategoriat.js`:lle: omat rivini ovat
puhtaita, ja jäljelle jää parikymmentä riviä, jotka ovat tahallisia
(suomennetut laitosnimet, translitteroinnit).

**Päätettäväksesi: ajanko työkalun kaikkien pakettien yli?** En koskenut
muiden sessioiden kirjoittamiin lähdemerkintöihin ilman lupaa. Ajo on
nopea ja tulos on lyhyt lista silmäiltäväksi.

## Seuraavaksi jonossa (ei aloitettu)

**Erä D = Saudi-Arabia ilman Mekkaa ja Medinaa + Bahrain.** Rajaukset,
aihe-ehdokkaat ja koko työtapa ovat docs/opus1-tilanne.md:ssä.

---

# Sonnet 2 → Fable: erä 13 valmis — EUROOPPA TÄYSIN KATETTU, jään valmiuteen (10.8.2026)

Varareitti käytössä pysyvästi (ei create_trigger- eikä
send_later-työkalua).

**Erä 13 (Vilna/Oslo/Kööpenhamina, 18 kohdetta) valmis**: v508
mainissa, PR #742 squash-mergetty itse CI:n mentyä vihreäksi
(Monitor-työkalulla). Versiokollisio v507→v508 hoidettu itse
(toinen PR ehti mergetä v507:n ensin — sama kaava kuin erässä 10).
Amalienborg-disambiguointi tarkistettu (Tanskan kuninkaanlinna, ei
pelin virheellisesti linkittämä ruotsalainen panimo). Haara nollattu
tuoreeseen mainiin.

**TÄLLÄ EUROOPPA ON TÄYSIN VALMIS**: kaikki 37 `maakartat.js`:n
Euroopan kohdekarttakaupunkia ovat saaneet nähtävyysjutut (tarkistettu
ohjelmallisesti diffaamalla `KAUPUNKIKARTAT`-avaimet
`NAHTAVYYSJUTUT`-avaimiin — täsmällinen osuma, ei puuttuvia eikä
ylimääräisiä). Ainoa `maakartat.js`:n kaupunki ilman nähtävyysjuttua
on Dubai, joka on Lähi-idän kaupunki eikä kuulu Eurooppa-tehtävään.

Kirjoitin täsmällisen jatko-/luovutusdokumentin `docs/sonnet2-
tilanne.md`:ään toista tiliä varten (kaikki 13 erää versionumeroineen
ja PR-numeroineen, lukittu sisältömalli ja uusi monikuvalinja
kriteereineen, koko toimiva prosessiputki vaihe vaiheelta, yleiset
wiki-disambiguointikuviot, "ei sotasisältöä" -linja Venäjän/Ukrainan
kohteissa, viestintärajoitus (ei create_trigger/send_later),
kontinkierrätyksen selviytymisohje). Tarkoitus on, että uusi sessio
voi jatkaa suoraan siitä ilman tätä keskustelua.

**En aloita erää 14 tai Lähi-idän töitä** — jään valmiustilaan kuten
pyysit. Odotan uutta kuittausta.

**Erä 12 (Tromssa/Dubrovnik/Riika) valmis** (edellinen raportti):
v502 mainissa, PR #733. Ei sotasisältöä -linja sovellettu.

---

# Opus 1 → Fable: ME-erä A valmis (10.8.2026)

**v499 mainissa** (#729). `# tests 571 / # pass 570 / # fail 0`.

## Mitä tuli

**Emiraatit, kolmas sivu "Ranta ja rata"** — mangrovemetsä, joka kasvaa
suolavedessä ja hengittää juurillaan; flamingot Ras Al Khorin lahdella
keskellä kaupunkia; kamelikilpailut, joissa ratsastajana on
radio-ohjattu robotti. Minitehtävä robotista.

**Jordania, maan ensimmäiset sivut.**
- *Vedet*: Kuollutmeri kannattelee kelluvaa, ranta siirtyy kauemmas
  pinnan laskiessa noin metrin vuodessa, ja maan 27 kilometrin
  merenranta Akabassa on korallien peitossa.
- *Rauniot*: Jerashin soikea tori, Ammanin Herkuleen temppeli ja
  Qusayr Amran aavikkolinna tähtitaivaskupoleineen.

Petraan ja Wadi Rumiin en koskenut, myöskään kuvissa.

## Kolme havaintoa

**1. Esitarkistin päivitetty** (hyväksyntäsi mukaan): 2–4 aihesivua,
kolme juttua kullakin. Sisältötarkistukset löysivät tästä erästä yhden
aidon vian — kamelitehtävän vastaus vuoti jutun otsikkoon — ja otsikko
kirjoitettiin uusiksi.

**2. Jordanialla ei ole menovinkkisivua**, eikä sitä ole muillakaan
tulevilla ME-mailla (vain ARE:lla ja EGY:llä on). Maalehti toimii ilman,
mutta viimeinen sivu jää nyt aihesivuksi. Sano jos haluat menovinkit
mukaan samoihin eriin — silloin lisään ne kunkin maan kohdalla, mikä
kasvattaa erän kokoa noin kolmanneksella.

**3. Kuvien maakohtaisuus vaati tarkkuutta.** Kuolleenmeren ja knafehin
parhaat Commons-kuvat ovat Israelin puolelta, ja sääntömme on että kuva
on siitä maasta, jota sivu käsittelee. Vaihdoin molemmat: Kuollutmeri
esitetään nyt jordanialaiselta rannalta, ja ruoka-aihe jäi kokonaan pois
tästä erästä, koska jordanialaisia ruokakuvia ei löytynyt riittävästi.
Jordanialle voi siis myöhemmin tehdä kolmannen sivun (ruoka tai Danan
luonnonpuisto), jos etsin kuvat erikseen.

## Seuraavaksi

Jatkan jonoa ilman eri lupaa: **erä B = Oman + Qatar**. Raportoin
samalla tavalla.
