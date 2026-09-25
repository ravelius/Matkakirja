# Dakar — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `dakar`, maa SEN, en-Wikipedia
"Dakar". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`, `docs/tyolista-opukselle.md`
(paketti O9, ETUSIVUKUVAN KAAVA) ja `tools/parvi/kaupunkilehti-ohje.md`.

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Dakar"**,
**"Lebu people"**, **"Cap-Vert"**, **"Four Communes"**,
**"Médina, Dakar"**, **"Les Mamelles Lighthouse"**,
**"African Renaissance Monument"**, **"Grand Mosque of Dakar"**,
**"Our Lady of Victories Cathedral, Dakar"**,
**"Théodore Monod African Art Museum"**,
**"Museum of Black Civilisations"**, **"Dakar Biennale"**,
**"World Festival of Black Arts"**, **"Ousmane Sow"**,
**"Dakar–Niger Railway"**, **"Cheikh Anta Diop University"**,
**"Gorée"**, **"House of Slaves"**.

## 0. Rajaus: mitä TÄHÄN lehteen EI kirjoiteta

Senegalin maalehti (`js/packs/maa-kategoriat.js`, avain `SEN`) on jo
tehty ja luettu kokonaan. Sen aiheita ei toisteta:

| Maalehden nosto | Aihe, joka on varattu |
| --- | --- |
| "Valtakunta, jonka perustaja puhui väärää kieltä" | Jolofin valtakunta |
| "Lingeer valitsi kuninkaan" | wolofien lingeer-arvo |
| "Ensimmäinen afrikkalainen Ranskan parlamentissa" | **Blaise Diagne** |
| "Runoilija, joka luopui vallasta itse" | **Léopold Sédar Senghor** |
| "Kansallisruoka syntyi ohran loputtua" | thiéboudienne |
| "Sipulia enemmän kuin lihaa" | yassa |
| "Maapähkinä muhennoksena" | mafé |
| "Kahvi, jossa on pippuria" | café Touba |
| "Rumpu, jonka kalvo kiristetään tapeilla" | sabar |
| "Kaksikymmentäyksi kieltä kurpitsan päällä" | kora |
| "Kirjaston paikkaa piti ihminen" | griot-perinne |
| "Sabar sähköbassolla" | **mbalax ja Youssou N'Dour** |
| "Ensimmäinen elokuva kuvattiin Seinen rannalla" | Paulin Vieyra |
| "Satamatyöläisestä elokuvan isäksi" | Ousmane Sembène |
| "Näyttelijä, joka erotettiin ja teki mestariteoksen" | Djibril Diop Mambéty |
| "Kultainen karhu isovanhempien maasta" | Mati Diop |
| "Puu, joka kasvaa väärinpäin" | baobab |
| "Järvi, joka on vaaleanpunainen" | Retba / Lac Rose |
| "Puisto, joka pääsi pois uhanalaisten listalta" | Djoudjin lintupuisto |
| "Muuri, joka on puita" | Suuri vihreä muuri |

Karttanostot (`js/packs/maastokohteet-sen.js`) on luettu kokonaan:
Atlantti (**Cap-Vert Afrikan läntisimpänä kohtana**), Senegaljoki,
Gambiajoki, **Gorée**, Saint-Louis, Djoudjin lintupuisto, Sine
Ngayènen kivikehät, Touban moskeija, Joal-Fadiouth, Saloumin suisto,
Ziguinchor. `js/packs/skandaalit.js` `SEN`: "Kuningas, joka kielsi
radan", "Sadesaaja, joka kiellettiin", "Kirjat, jotka piilotettiin
koteihin".

**Gorée on siis jo karttanostona** (nimen hollantilainen alkuperä,
saaren koko 18,2 ha, huomautus siitä että Senegalin suuremmat
orjakaupan keskukset olivat Saint-Louis'ssa ja Gambian jokisuulla).
Lehti EI tee Goréesta omaa nostoaan. Saari mainitaan vain siinä
määrin kuin kaupungin oma tarina vaatii — Ndakaaru perustettiin sitä
vastapäätä ja isoisän matkavuoden hallintotilanne oli "Dakar oli osa
Goréen kuntaa" — ja koska **kaupungin kulttuurivisa
(`js/packs/africa-kulttuuri.js`, `dakar.kysymys`) kysyy juuri
Goréesta**, jolloin visan vastauksen on löydyttävä lehdestä
(ks. osio 8).

**Tälle lehdelle jää:** lebu-kansa ja niemen alkuperäiset kylät,
Lebu-tasavalta, 1873 maapähkinäkaupan ja Goréen kunnan aikana, kaksi
kukkulaa ja majakka, sekä taiteen kaupunki (FESMAN 1966, Dak'Art,
Ousmane Sow, Mustien sivilisaatioiden museo) ja kohdekartan kahdeksan
kohdetta.

## 1. Perusluvut ja sijainti

Lähde: **"Dakar"** › johdanto, Geography, Administration.

- Dakar on **Senegalin pääkaupunki ja suurin kaupunki**.
- **Dakarin departementin väkiluku 1 278 469**; **metropolialueen
  väkiluku 4,0 miljoonaa (2023)**.
- Sijaitsee **Cap-Vertin niemellä Atlantin rannalla** ja on
  **Manner-Afrikan läntisin kaupunki**.
- Kaupunki on samalla **kunta (commune)**, yksi Senegalin 125
  kunnasta, ja **departementti**, yksi 45:stä — tilanne muistuttaa
  Pariisia. Senegalin departementeilla ei kuitenkaan ole poliittista
  valtaa.
- Departementti jakautuu neljään **arrondissementtiin**: Almadies,
  Grand Dakar, Parcelles Assainies (väkirikkain) ja Plateau/Gorée
  (keskusta).
- **30.8.1996** Dakar jaettiin **19 commune d'arrondissementiin**,
  koska miljoonan asukkaan kuntaa pidettiin liian suurena hallita
  yhdestä keskuksesta. Kunta säilyi niiden yläpuolella koordinoivana
  tasona, kuten Greater London koordinoi kaupunginosiaan.
- **Dakar-Plateau** (34 626 as.) on kaupungin historiallinen sydän ja
  ministeriöiden sijaintipaikka. **Médina** (136 697 as.) on tihein ja
  väkirikkain. **Yoff** (55 995 as.) on laajin. **Île de Gorée**
  (1 034 as.) on pienin.
- **Dakar isännöi vuoden 2026 nuorten kesäolympialaisia** — se on
  ensimmäinen Afrikassa järjestettävä olympiatapahtuma.
- Kaupunki on suuri rahoituskeskus: siellä toimii kymmenkunta
  kansallista ja alueellista pankkia, muun muassa **BCEAO**
  (Länsi-Afrikan valtioiden keskuspankki), joka hallinnoi yhteistä
  **CFA-frangia**.
- Väestössä on suuri **libanonilaisyhteisö 1920-luvulta** (tuonti- ja
  vientiala), marokkolaisia liikemiehiä sekä mauritanialaisia,
  kapverdeläisiä ja guinealaisia yhteisöjä. Ranskalaisia
  ulkomaalaisia on jopa **20 000**.

### Ilmasto ("Dakar" › Climate)

Sääriviä (`js/packs/saatiedot.js`) EI tehdä tässä erässä. Oppaan
sääjakso nojaa Climate-osioon ja sanoo sen ääneen.

- **Meren viilentämä trooppinen puolikuiva ilmasto** (Köppen **BSh**),
  lyhyt sadekausi ja pitkä kuiva kausi.
- **Sadekausi heinäkuusta lokakuuhun**; kuiva kausi kattaa loput
  kahdeksan kuukautta.
- Sadetta noin **411 mm vuodessa**.
- **Joulu–toukokuu**: päivälämpötila noin **25–28 °C**, yöt
  **18–20 °C**.
- **Touko–marraskuu**: päivän ylin **29–31 °C**, yön alin hieman yli
  **23–25 °C**.
- Silti selvästi viileämpi kuin sisämaan Sahelin kaupungeissa
  (Niamey, N'Djamena), joissa lämpötila pysyy suuren osan vuodesta
  yli **36 °C**:ssa. **Merituuli viilentää Dakaria ympäri vuoden.**

## 2. Lebu-kansa ja niemen kylät (lehden nosto D1)

Lähde: **"Dakar"** › History › Foundation and European Trade;
**"Lebu people"**; **"Cap-Vert"**.

- **Lebut asuttivat Cap-Vertin niemen viimeistään 1400-luvulla.**
  He ovat wolofien vesiviljelyyn erikoistunut alaryhmä.
- **Alkuperäiset kylät — Ouakam, Ngor, Yoff ja Hann — ovat yhä
  selvästi lebulaisia kaupunginosia.**
- Lebut ovat ensisijaisesti **kalastajayhteisö**, mutta heillä on myös
  merkittävää liiketoimintaa rakennustarvikkeissa ja kiinteistöissä.
  He puhuvat **lebu-wolofia**, joka on läheistä sukua varsinaiselle
  wolofille mutta **ei ole sen kanssa ymmärrettävissä**.
- **Yoffin perustamisen perinteinen vuosiluku on 1430.**
- Lebu-identiteetti erosi naapureiden wolofien ja sereerien
  identiteetistä **viimeistään 1400-luvun alussa, ennen eurooppalaisten
  tuloa**.
- Perimätiedon mukaan lebut tulivat, kuten wolofit ja sereeritkin,
  **Senegaljoen pohjoispuolelta**. Guiers-järven seudulla oli lebuja
  **1500-luvulla**, ja **vuoteen 1700 mennessä** he olivat siirtyneet
  Cap-Vertin niemelle. Aluetta hallitsi tuolloin **Cayorin damel**.
- Lebu-yhteiskunta korostaa **hurskautta ja vanhempien kunnioitusta**.
  Perheeseen kuuluvat elävien lisäksi **esi-isien henget**.
- **1444**: portugalilaiset saapuvat Dakarin lahdelle. **1456**
  **Diogo Gomes** avaa rauhanomaisen yhteyden, ja lahtea alettiin
  kutsua nimellä **"Angra de Bezeguiche"**, paikallisen hallitsijan
  mukaan.
- Lahti oli 1500-luvun alussa **Portugalin Intian-laivastojen tärkeä
  pysähdyspaikka** sekä meno- että paluumatkalla: laivat korjattiin,
  vettä otettiin Cap-Vertin rannan puroista ja kaivoista, ja
  paikallisilta ostettiin muonaa loppumatkalle.
- **Vuonna 1501 yhdellä näistä pysähdyksistä firenzeläinen
  merenkulkija Amerigo Vespucci alkoi rakentaa "uuden maailman"
  hypoteesiaan Amerikasta.**
- Lahden rannalle kasvoi kaupunki, joka oli yksi **Cayorin**
  tärkeimmistä satamista. Cayor oli Jolofin valtakunnan osavaltio,
  joka irtautui **1549**.
- Portugalilaiset perustivat asutuksen **Goréen saarelle** (silloin
  Bezeguichen tai Palman saari) ja alkoivat **vuoteen 1536 mennessä**
  käyttää sitä orjaviennin tukikohtana.
- **1600-luvulla** perustettiin **uusi lebu-kylä nimeltä Ndakaaru**
  suoraan Goréetä vastapäätä palvelemaan eurooppalaista
  kauppa-asemaa **ruoalla ja juomavedellä**. **Tästä kylästä kasvoi
  Dakar.**
- Gorée vaihtoi omistajaa monta kertaa: **Alankomaat 1588** (ja antoi
  saarelle nykyisen nimen), **englantilaiset amiraali Robert Holmesin
  johdolla 23.1.1664**, ja **Ranska 1677**.
- **1780-luvulla Dakar oli yksi Cayorin suurimmista kaupungeista.**

## 3. Lebu-tasavalta (lehden nosto D2)

Lähde: **"Dakar"** › History › Lebou Republic; **"Lebu people"** ›
History.

Kaksi lähdettä kertovat tapahtuman **eri vuosiluvuilla** — ristiriita
on kirjoitettava auki (ks. tarkistusraportti).

**"Dakar"-artikkelin versio:**
- **1795**: Cayorin marabuutit nousivat kapinaan damelia vastaan
  Futa Toron vallankumouksen innoittamina. Lebu-yhteisö liittyi
  kapinaan **Diop-suvun** johdolla; suku oli alun perin Cokista
  kotoisin oleva muslimien uskonnollinen oppineiden perhe.
- Ensimmäisten voittojen jälkeen muslimiarmeijat **kärsivät tappion
  Loofessa**, ja lebut vetäytyivät Cap-Vertille.
- He rakensivat **sarjan puolustusmuureja lateriittilohkareista**;
  pisin niistä ulottui **koko niemen poikki Yoffista Hanniin**, ja
  sen turvin he **torjuivat damelin armeijan**.
- Voiton myötä **Jaal Joop julisti uuden itsenäisen teokraattisen
  valtion**, jota ranskalaiset alkoivat kutsua **"Lebu-tasavallaksi"**,
  pääkaupunkina **Ndakaaru**.
- **Senegalin valtio tunnustaa Ndakaarun serignen yhä lebujen
  perinteiseksi poliittiseksi auktoriteetiksi.**

**"Lebu people" -artikkelin versio:**
- **1776**: marabuuttikapina puhkesi Cayorissa; kun se kukistettiin,
  osa tappion kärsineistä muslimeista pakeni lebujen suojiin.
- **1790**: vaikka useimmat lebut olivat yhä animisteja, Diop johti
  nämä marabuutit julistamaan itsenäisyyden.
- **20 vuoden sodan jälkeen, 1812, Cayor tunnusti itsenäisyyden** ja
  Diop julistettiin yhteisön **serigneksi** (hengelliseksi johtajaksi).
- Tämä "lebulainen teokraattinen tasavalta" **säilyttää erityisen
  oikeudellisen itsehallinnon nykypäivään asti**.
- Vallankäyttö on kahdella kokouksella: **Diambouri Ndakarou**
  (Dakarin kokous) ja **Diambouri Pintch** (kaupunginosien kokous).
  Kaupunginosien päälliköt valitsevat serignen yhdestä lebujen
  aristokraattisista suvuista, ja hän toimii **viimeisenä
  oikeusasteena**. He valitsevat myös **diarafin**, joka ratkoo maa- ja
  perintöriidat, ja **Ndeyedy Rew'n**, joka on eräänlainen sisä- ja
  ulkoasiainministeri ja on historiallisesti hoitanut **suhteet
  ranskalaisiin** ja toiminut yhteisön puhemiehenä.

**RATKAISU LEHTEEN:** kerrotaan tapahtumaketju (kapina → tappio →
lateriittimuuri niemen poikki → itsenäinen valtio) ja sanotaan
suoraan, että **lähteet antavat sille eri vuosiluvut: kaupungin oma
artikkeli 1795, lebu-kansan artikkeli 1776–1812**. Serignen asema
nykypäivänä kerrotaan molempien yhtenevän tiedon perusteella.

## 4. 1873 — isoisän matkavuosi (lehden nosto D3)

Lähde: **"Dakar"** › History › Lebou Republic, Colonial Dakar,
Administration; **"Four Communes"**; **"Dakar–Niger Railway"**.

Isoisän matkavuonna Dakar oli **pieni satamakylä, joka ei ollut vielä
oma kuntansa eikä minkään pääkaupunki**. Kehys on tarkka:

- Ranska **lakkautti orjakaupan helmikuussa 1794**, mutta **Napoleon
  palautti sen toukokuussa 1802**. **Orjakauppa jatkui Goréella
  vuoteen 1848**, jolloin se lopulta lakkautettiin **kaikilla
  Ranskan alueilla**.
- Orjakaupan tilalle ranskalaiset **edistivät maapähkinän viljelyä
  mantereella**.
- Maapähkinäkaupan kasvaessa **pikkuruinen Goréen saari, jonka
  väkiluku oli noussut 6 000:een, osoittautui riittämättömäksi
  satamaksi**. Goréen kauppiaat päättivät siirtyä mantereelle, ja
  **1840 Rufisqueen perustettiin varastoineen "faktoria"**.
- **1857**: ranskalaiset perustivat **sotilaspostin Ndakaaruun**
  (jota he kutsuivat nimellä "Dakar") ja **liittivät Lebu-tasavallan
  itseensä** — vaikka sen instituutiot jatkoivat nimellisesti
  toimintaansa.
- **1872: Gorée, Dakar mukaan lukien, tunnustettiin Ranskan
  kunnaksi.** Goréen kunta oli **yksi Afrikan vanhimmista
  länsimaistyyppisistä kunnista** (Algerian ja Etelä-Afrikan
  kuntien ohella).
- **Isoisän matkavuonna 1873 Dakar oli siis vuoden vanhan Goréen
  kunnan osa.** Se irrotettiin omaksi kunnakseen vasta
  **17.6.1887**.
- Siirtomaahallinto pani Dakariin suuria infrastruktuurirahoja:
  satamaan tehtiin **laitureita**, rannikkoa pitkin vedettiin
  **lennätinlinja Saint-Louis'hin**, ja **Dakar–Saint-Louis-rata
  valmistui 1885**, minkä jälkeen kaupungista tuli tärkeä tukikohta.
- **1902: Dakar korvasi Saint-Louis'n Ranskan Länsi-Afrikan
  pääkaupunkina.**
- **Toinen suuri rata, Dakar–Niger, rakennettiin 1906–1923** ja
  yhdisti Dakarin **Bamakoon**, mikä vahvisti kaupungin aseman
  Ranskan Länsi-Afrikan kärkenä.
- **1929**: Goréen saaren kunta, jossa oli enää muutama sata
  asukasta, **liitettiin Dakariin**.
- **Kunnan mayoreita on ollut 20 vuodesta 1887.** Ensimmäinen musta
  pormestari oli **Blaise Diagne**, pormestarina **1924–1934**
  (*Diagne itse on Senegalin maalehden aihe eikä siis tämän lehden
  nosto — mainitaan vain tässä faktapohjassa*). Pisimpään palveli
  **Mamadou Diop**, 18 vuotta **1984–2002**.
- Dakarin kunnan rajat ovat olleet **muuttumattomat vuodesta 1983**.
- **Gorée on nykyään Unescon maailmanperintökohde ja orjakaupan
  muistopaikka**, ja saarella on **orjatalo** (House of Slaves,
  rakennettu Goréelle 1776) museona ja **Goréen muistomerkki**.
  *(Tämä on lehden kulttuurivisan vastaus, ks. osio 8. Enempää
  Goréesta ei kirjoiteta — se on karttanosto.)*

## 5. Médina ja kaupunkirakenne

Lähde: **"Dakar"** › History › Colonial Dakar, Notable sites;
**"Médina, Dakar"**.

- Siirtomaa-ajan kaupungistumista leimasi **rodullinen ja
  yhteiskunnallinen erottelu**, jota perusteltiin usein terveydellä
  ja hygienialla, ja **se rakenteistaa kaupunkia yhä**.
- **Vuoden 1914 ruttoepidemian jälkeen** viranomaiset **pakottivat
  suurimman osan afrikkalaisväestöstä pois vanhoista kortteleista
  ("Plateau") uuteen kaupunginosaan nimeltä Médina**, jonka erotti
  Plateausta **"sanitaarinen vyöhyke"**.
- **Maan ensimmäisinä haltijoina kaupungin lebu-asukkaat vastustivat
  tätä pakkolunastusta menestyksekkäästi.** Heitä tuki Blaise Diagne.
- Plateausta tuli sen jälkeen hallinnollinen, kaupallinen ja
  asuinalue, joka varattiin yhä enemmän eurooppalaisille, ja siitä
  tuli **malli muiden Ranskan Afrikan siirtomaapääkaupunkien
  vastaaville alueille** (Bamako, Conakry, Abidjan, Brazzaville).
- Médinan kunta perustettiin **1914**. Se on nykyään **yksi Dakarin
  vanhimmista ja väkirikkaimmista kaupunginosista** ja on säilyttänyt
  alkuperäisen afrikkalaisen luonteensa vastakohtana Plateaun
  moderneille kortteleille. Se on siksi myös kaupungin
  **kulttuurikeskus**. Alue on nykyään **räätälinliikkeitä täynnä
  oleva kaupallinen keskus**.
- Médinassa syntyivät muun muassa laulajat **Youssou N'Dour** ja
  **Omar Pene**. *(Youssou N'Dour on maalehden aihe — ei nosto.)*
- Médinassa ovat **Suuri moskeija** ja **Soumbédiounen katukauppa**,
  Dakarin merkittävin katutori.
- **Layenen sufilaisveljeskunta**, jonka perusti **Seydina
  Mouhammadou Limamou Laye** **1883 Yoffissa**, kukoisti lebujen
  keskuudessa Yoffissa ja uudessa kylässä nimeltä **Cambérène**.
  Se on **Senegalin kolmanneksi suurin sufilaisveljeskunta**, ja
  Seydina on haudattu **Layenen mausoleumiin**.
- Itsenäistymisen jälkeen kaupunki on levinnyt itään **Pikinen**
  (2001 arvio 1 200 000 as., enemmän kuin varsinaisessa Dakarissa)
  ohi **Rufisqueen**, ja syntynyt yhdyskunta on lähes **3 miljoonaa
  asukasta** eli yli neljännes koko maan väestöstä.

## 6. Kaksi kukkulaa (lehden nosto D4)

Lähde: **"Dakar"** › Notable sites; **"Les Mamelles Lighthouse"**;
**"African Renaissance Monument"**.

- **Deux Mamelles** on kaksoiskukkulapari **Ouakamin kunnassa**. Ne
  ovat **kaupungin ainoa korkea maasto** ja tarjoavat näkymän koko
  alueelle.
- **Ensimmäisen kukkulan laella on Mamellesin majakka, valmistunut
  1864.** Sitä on kuvattu **"yhdeksi maailman suurista majakoista,
  joka opastaa laivat Afrikan läntisen kärjen ympäri"**.
- Majakka on **kokonaan valkoinen**: lieriömäinen torni kiinni
  kaksikerroksisen rakennuksen merenpuoleisessa kyljessä. Pohjakerrok-
  sessa on konehuone generaattoreineen ja akkuvarmennuksineen,
  toisessa kerroksessa vartiohuone, jota päivystäjät käyttävät öisin.
  Kierreportaat nousevat lyhtyhuoneeseen.
- Linssi on **Barbier, Benard et Turennen toisen luokan
  Fresnel-linssi, joka kelluu elohopeakylvyssä**. Valonlähde on
  **1 000 watin halogeenilamppu 220 voltin vaihtovirralla**.
- Valo antaa **valkoisen välähdyksen viiden sekunnin välein**,
  **polttopistekorkeus 120 m**, **nimellinen kantama 31 meripeninkulmaa**
  — **yksi Afrikan voimakkaimmista**.
- Alun perin öljykäyttöinen valo on nykyään sähköistetty, mutta
  majakka on **yhä miehitetty, koska sitä ei ole automatisoitu**.
- Majakka on **avoinna yleisölle**, ja majakanvartijat pitävät
  opastettuja kierroksia. Lyhtyparvekkeelta näkyy koko niemi:
  Almadies, N'Gor, Ouakam ja Renessanssimonumentti.
- Majakkaa ylläpitää **Dakarin satamaviranomaisen majakka- ja
  merimerkkiosasto**. Amiraliteettinumero **D3004**.
- **Toisen kukkulan päällä on Afrikan renessanssin monumentti**,
  **50 metriä korkea pronssipatsas**, joka seisoo **100-metrisellä
  kukkulalla** Ouakamissa ja katsoo Atlantille. **Se on Afrikan
  korkein patsas.**
- Suunnittelija oli senegalilainen arkkitehti **Pierre Goudiaby
  Atepa**, ja rakentaja pohjoiskorealainen monumenttiyhtiö
  **Mansudae Overseas Projects**.
- Kukkulan **pohjatyöt alkoivat 2006**, **pronssipatsaan rakentaminen
  2008**. Alun perin sen piti valmistua joulukuussa 2009, mutta
  viivästykset venyivät vuoden 2010 alkuun; **virallinen vihkiminen
  4.4.2010**, Senegalin kansallispäivänä ja **itsenäistymisen
  50-vuotispäivänä**.
- Patsas esittää **taivasta kohti nousevaa perhettä**: mies kantaa
  lastaan käsivarrellaan ja pitää vaimoaan vyötäröstä.
- Työn **aloitti senegalilainen kuvanveistäjä Ousmane Sow**, joka
  vetäytyi hankkeesta erimielisyyksien takia.
- **Patsaan hinta, 27 miljoonaa dollaria, herätti arvostelua.**
  *(Kirjataan yhtenä neutraalina lauseena; nykypolitiikkaa ei
  käsitellä.)*

## 7. Taiteen kaupunki (teemasivun nostot)

### 7.1 Mustan taiteen maailmanfestivaali 1966 (T1)

Lähde: **"World Festival of Black Arts"** › First World Festival of
Negro Arts, Summary, Proceedings, US participation, Festival critiques.

- **Ensimmäinen mustan taiteen maailmanfestivaali pidettiin Dakarissa
  1.–24. huhtikuuta 1966.** Isäntänä oli Senegalin presidentti
  Léopold Sédar Senghor, tukijoina **Unesco ja Ranskan hallitus**.
- Mukana oli **noin 2 500 osallistujaa 30 itsenäisestä Afrikan maasta**
  sekä muista maista, joissa oli afrikkalaista diasporaa —
  Yhdysvalloista, Brasiliasta, Karibialta, Ranskasta ja
  Yhdistyneestä kuningaskunnasta.
- **Se oli ensimmäinen valtion järjestämä festivaali, joka esitteli
  afrikkalaisten ja afrikkalaisen diasporan taiteilijoiden,
  muusikoiden ja kirjailijoiden työtä maailmanlaajuiselle yleisölle.**
- **Dakar rakennettiin osittain uudelleen festivaalia varten**:
  uusia teitä, **lentoaseman terminaali** ja **kaksi uutta
  esiintymispaikkaa — Théâtre National Daniel Sorano ja Musée
  Dynamique.** Käyttöön otettiin myös olemassa olevia rakennuksia:
  oikeuspalatsi, katedraali, kaupungintalo ja rantoja.
- Festivaali alkoi **kahdeksan päivän kollokviolla**, jonka Unesco
  järjesti yhdessä; se pidettiin **kansalliskokouksen rakennuksessa**.
  Avauspuheenvuoron piti Senghor ("The Defense and Illustration of
  Negritude"), ja **Langston Hughes** toi keskusteluun tekstin
  "Black Writers in a Troubled World".
- Elokuvia näytettiin **Cinema Palacessa**, kansallisia
  taidenäyttelyitä oli uudessa **Musée Dynamiquessa**, ja tanssia,
  näytelmiä ja jazzia esitettiin **Daniel Sorano -teatterissa**, jossa
  myös palkinnot jaettiin.
- Palkittujen joukossa olivat runoilija **Tchicaya U Tam'si**
  (Ranska) ja näytelmäkirjailija **Wole Soyinka** (Nigeria).
- Yhdysvaltain osallistujien joukossa olivat **Duke Ellington,
  Langston Hughes, Alvin Ailey, Marian Anderson, Leontyne Price,
  Sidney Poitier, Katherine Dunham, Ralph Bunche, Ossie Davis** ja
  **Arthur Mitchell**. Yhdysvaltain ulkoministeriö rahoitti komiteaa
  **150 000 dollarilla**.
- **Kävijöitä oli kaikkiaan 50 000.**
- **Arvostelu:** festivaalia moitittiin siitä, ettei se käsitellyt
  aikansa poliittisia kamppailuja eikä Afrikan vapautusliikkeitä,
  vaan painotti kulttuuria politiikan ja talouden sijaan. Sitä
  arvosteltiin myös osallistujavalinnasta: vain valtiot saivat
  lähettää edustajia, ja delegaatioiden oli saatava hyväksyntä.
  Afrobrasilialaiselta kirjailijalta **Abdias do Nascimentolta**
  evättiin pääsy, koska hän ei ollut hyväksytyn valtuuskunnan jäsen.
  *(Otetaan mukaan lyhyesti — Kunnioitus-pilari: kerrotaan myös
  kritiikki, ei vain juhlaa.)*

### 7.2 Dak'Art-biennaali (T2)

Lähde: **"Dakar Biennale"**.

- **Dak'Art — Biennale de l'Art Africain Contemporain** on suuri
  nykytaiteen näyttely, joka järjestetään **Dakarissa joka toinen
  vuosi**.
- **Suunniteltiin 1989** biennaaliksi, joka vuorottelee kirjallisuuden
  ja kuvataiteen välillä. **Ensimmäinen vuoden 1990 tapahtuma
  keskittyi kirjallisuuteen ja vuoden 1992 kuvataiteeseen.**
- **1993** rakenne muuttui, ja **Dak'Art 1996 oli ensimmäinen
  nimenomaan afrikkalaiselle nykytaiteelle omistettu näyttely.**
  Vuodesta 2000 se on ollut säännöllisesti kahden vuoden välein.
- **Dak'Art on Afrikan mantereen pitkäikäisin suuren mittakaavan
  taidetapahtuma.**
- **Vuodesta 2000** kansainväliseen näyttelyyn kelpuutetun taiteilijan
  piti olla **jonkin Afrikan maan kansalainen** joko syntymän tai
  kansalaistamisen kautta. **2014 se avattiin ensimmäistä kertaa
  myös muille kuin afrikkalaisille** — näyttelyssä "Cultural
  Diversity", joka pidettiin **IFANin Théodore Monod -museossa**.

### 7.3 Ousmane Sow (T3)

Lähde: **"Ousmane Sow"**.

- **Ousmane Sow (10.10.1935 – 1.12.2016)** oli senegalilainen
  kuvanveistäjä, joka teki **ylisuuria patsaita ihmisistä ja
  ihmisryhmistä**.
- **Syntyi Dakarissa** ja **kuoli Dakarissa** 81-vuotiaana.
- Isän kuoltua **1956** hän lähti Dakarista opiskelemaan Ranskaan ja
  suoritti **fysioterapeutin tutkinnon**. Hän palasi Senegaliin sen
  itsenäistyttyä **1960** ja avasi fysioterapiavastaanoton. Myöhemmin
  hän palasi Ranskaan työhön ja **tuli takaisin Senegaliin 1978**.
- **1984 alkaen** hän ryhtyi tekemään ylisuuria veistoksia **eteläisen
  Sudanin nuba-kansan lihaksikkaista painijoista**; innoituksena
  olivat **Leni Riefenstahlin valokuvat**. Niitä varten hän kehitti
  **uusia tekniikoita ja materiaaleja**.
- Veistokset esitettiin **Dakarin ranskalaisessa kulttuurikeskuksessa
  1987**. Myöhemmin hän teki sarjat **maasaista, zuluista,
  fulaneista** ja 1990-luvun lopulla **Pohjois-Amerikan
  alkuperäiskansoista**.
- Näyttelyt: **documenta IX Kasselissa 1992**, **Palazzo Grassi
  Venetsian biennaalin aikaan 1995**, ja **Pont des Arts Pariisissa
  1999**.
- **2008** hän oli yksi **Prince Claus -palkinnon** yhdestätoista
  saajasta teemalla "kulttuuri ja ihmisruumis".
- **11.4.2012** hänet valittiin **Institut de Francen Académie des
  Beaux-Artsin ulkomaiseksi liitännäisjäseneksi** Andrew Wyethin
  tilalle. **Hän oli ensimmäinen musta ihminen, joka on valittu sen
  jäseneksi.**

### 7.4 Mustien sivilisaatioiden museo (T4)

Lähde: **"Museum of Black Civilisations"**.

- **Avattiin 6. joulukuuta 2018.** Kansallinen museo Dakarissa.
- Johtaja on **Hamady Bocoum**, arkeologi ja Cheikh Anta Diop
  -yliopiston tutkija.
- Museon tavoite on korostaa **"Afrikan panosta maailman
  kulttuuriseen ja tieteelliseen perintöön"**. Bocoumin mukaan on
  erityisen tärkeää muistaa, että **"raudanvalmistus keksittiin
  Afrikassa 2 500 vuotta ennen Kristusta"**.
- Museo on **Léopold Sédar Senghorin vision toteutuma**: hän halusi
  museon, joka esittäisi mustien ihmisten historiaa ja nykykulttuuria
  kaikkialla. **Rakennuskustannus arviolta 30 miljoonaa dollaria.**
- Museo on **pyytänyt afrikkalaisten taideteosten palauttamista**,
  koska jopa **95 prosenttia Afrikan kulttuuriperinnöstä on Afrikan
  ulkopuolella** suurten museoiden hallussa. Esimerkiksi **Musée du
  quai Branly – Jacques Chirac** Pariisissa pitää hallussaan
  **70 000 esinettä** Saharan eteläpuolisesta Afrikasta.
- Museo oli **Felwine Sarrin ja Bénédicte Savoyn** marraskuussa 2018
  Ranskan presidentille jättämän **palautusraportin** listalla
  "ultramoderneista museoista".
- **Time-lehti valitsi sen yhdeksi vuoden 2019 sadasta parhaasta
  paikasta maailmassa.**

## 8. Kulttuurivisa ja minitehtävä

Kaupungin kulttuurivisa on `js/packs/africa-kulttuuri.js`,
avain `dakar`, kenttä `kysymys`:

> *"Mistä Dakarin edustalla oleva Goréen saari tunnetaan?"* →
> Orjakaupan muistopaikkana.

**Visan vastauksen on löydyttävä lehdestä.** Se on nostossa D3
(osio 4): Gorée on nykyään Unescon maailmanperintökohde ja orjakaupan
muistopaikka, ja siellä on orjatalo museona.

`js/packs/africa-questions.js` avaimen `dakar` viisi kysymystä:
Senegalin pääkaupunki, Gorée, Dakar-ralli, senegalilainen paini,
mbalax. **Minitehtävä ei saa kysyä yhtään näistä.**

Ehdotus (teemasivulle, vastaus samalla sivulla, osio 7.1):

> Mitkä kaksi uutta rakennusta Dakariin rakennettiin vuoden 1966
> festivaalia varten? → Daniel Sorano -teatteri ja Musée Dynamique.

Vastaus löytyy nostosta T1. Fakta ei ole lähdevirkkeen sanatarkka
kopio eikä siihen ole lisätty syy-yhteyttä, jota lähde ei sano.

## 9. Kohdekartan kahdeksan kohdetta

Kohteet on valittu niin, **etteivät ne toista lehden juttuja** eivätkä
karttanostoja (New Yorkin sääntö). Kaikilla kahdeksalla on **oma
nimetty lähde**; ilman lähdettä olleet ehdokkaat (Marché Kermel,
Place de l'Indépendance omana artikkelinaan, Palais Présidentiel
omana artikkelinaan, Sandaga, Layenen mausoleumi) hylättiin, koska
en-Wikipediassa ei ole niistä artikkelia eikä nähtävyysjuttua voi
kirjoittaa katteettomasti.

Koordinaatit: en-Wikipedian `prop=coordinates` (katedraali,
suurmoskeija, yliopisto) ja **Nominatim** (Pasteur-instituutti,
Théodore Monod -museo, Riippumattomuuden aukio, rautatieasema,
Soumbédiounen käsityökylä), haettu 7.9.2026.

| # | Kohde | lat | lon | Lähdeartikkeli |
| --- | --- | --- | --- | --- |
| 1 | Pasteur-instituutti | 14.65618 | −17.43503 | "Pasteur Institute of Dakar" |
| 2 | Dakarin katedraali | 14.66545 | −17.43761 | "Our Lady of Victories Cathedral, Dakar" |
| 3 | Théodore Monod -museo | 14.66367 | −17.43828 | "Théodore Monod African Art Museum" |
| 4 | Riippumattomuuden aukio | 14.66953 | −17.43206 | "Dakar" › Notable sites, Colonial Dakar, Independence |
| 5 | Dakarin rautatieasema | 14.67646 | −17.43368 | "Dakar–Niger Railway"; "Dakar" › Transport |
| 6 | Dakarin suuri moskeija | 14.67821 | −17.44246 | "Grand Mosque of Dakar" |
| 7 | Soumbédiounen käsityökylä | 14.67685 | −17.45781 | "Dakar" › Notable sites; "Médina, Dakar" |
| 8 | Cheikh Anta Diop -yliopisto | 14.68694 | −17.46333 | "Cheikh Anta Diop University" |

Rajausehdotus: `{ pohjoinen: 14.6905, etela: 14.6520, lansi: -17.4720,
ita: -17.4245 }` ≈ 5,1 km × 4,3 km. Kaikki kahdeksan mahtuvat sisään
väljästi. Soumbédioune on lähellä rantaviivaa, joten
`tools/tarkista-karttapisteet.mjs` on ajettava — jos piste osuu
veteen, se siirretään käsityökylän puolelle idemmäs.

### Kohteiden lähdetiedot

**1. Pasteur-instituutti** ("Pasteur Institute of Dakar"):
- **Institut Pasteur de Dakar (IPD)** on biolääketieteen
  tutkimuskeskus Dakarissa. Se on osa maailmanlaajuista
  **Pasteur-instituuttia**, joka hallinnoi sitä yhdessä Senegalin
  valtion kanssa.
- **1896**: ranskalainen lääkäri ja mikrobiologi **Émile Marchoux**,
  joka oli opiskellut **Louis Pasteurin** johdolla, perusti
  mikrobiologisen laboratorion **Saint-Louis'hin**, joka oli silloin
  Ranskan Senegalin pääkaupunki.
- **1913**: laitos siirrettiin **Dakariin**, josta oli tullut uusi
  pääkaupunki **1902**.
- Laitos jatkoi toimintaansa Senegalin itsenäistymisen jälkeen.
- Painopiste on **mikrobiologiassa ja virologiassa**, erityisesti
  **arboviruksissa**. **Keltakuume eristettiin Afrikassa ensimmäisen
  kerran tässä instituutissa, ja sen ensimmäinen rokote keksittiin
  IPD:ssä.**
- Covid-19-epidemian alettua instituutti alkoi kehittää
  **edullista koronatestiä**. **Heinäkuussa 2021** Senegal, Euroopan
  komissio, Euroopan investointipankki, Ranska, Saksa ja Belgia
  sopivat suuren **rokotetuotantolaitoksen** rakentamisesta
  Pasteur-instituutin yhteyteen.

**2. Dakarin katedraali** ("Our Lady of Victories Cathedral, Dakar"):
- Voittojen Neitsyt Marian katedraali on Dakarin **katolinen
  katedraali** ja **Dakarin arkkihiippakunnan** istuin.
- **Pyhäkkö rakennettiin vanhan lebu-hautausmaan paikalle**; valtio
  luovutti maan kirkolle.
- **Rakentaminen alkoi 1924**, ja katedraali vihittiin
  **12 vuotta myöhemmin, 2. helmikuuta 1936**. Vihkijä oli
  **kardinaali Jean Verdier, Pariisin arkkipiispa**.
- **1964** sisäänkäynnin yläpuolinen alkuperäinen kirjoitus vaihdettiin
  nykyiseen.
- **2001** kirkossa toimitettiin entisen presidentin **Léopold Sédar
  Senghorin hautajaiset**.
- **Kardinaali Hyacinthe Thiandoum**, joka kuoli 2004, on haudattu
  alttarin taakse katedraalin suojeluspyhimyksen, Voittojen
  Neitsyt Marian, patsaan viereen.

**3. Théodore Monod -museo** ("Théodore Monod African Art Museum"):
- **Yksi Länsi-Afrikan vanhimmista taidemuseoista.** Sen edistäjänä
  toimi maan ensimmäinen presidentti Léopold Senghor.
- Alkuperäinen nimi oli **IFANin afrikkalaisen taiteen museo**,
  myöhemmin **IFAN Museum of African Arts**. **Joulukuussa 2007**
  virallinen nimi muutettiin **Musée Théodore Monod d'Art africain**
  ranskalaisen luonnontieteilijän **Théodore André Monodin** mukaan,
  joka oli IFANin entinen johtaja.
- Museo on osa **Institut Fondamental d'Afrique Noire (IFAN)**
  -instituuttia, joka **perustettiin 1936** Ranskan kansanrintaman
  hallituksen aikana.
- Kun IFAN siirrettiin **1960** Cheikh Anta Diop -yliopistoon,
  **Place Soweton** rakennus kansalliskokouksen lähellä muutettiin
  museoksi.
- Museo on nykyään yksi arvostetuimmista **afrikkalaisen kulttuurin
  tutkimuskeskuksista** ja osa Cheikh Anta Diop -yliopistoa. Ranskan
  Länsi-Afrikan siirtomaiden **päätutkimuskeskuksena** siinä on
  merkittäviä kokoelmia kaikkialta ranskankielisestä Afrikasta.
- Se on yksi **Dak'Art-biennaalin vakituisista näyttelypaikoista**.

**4. Riippumattomuuden aukio** ("Dakar" › Notable sites, Colonial
Dakar, Independence):
- *Place de l'Indépendance* on **Dakarin keskusaukio**.
- Se on **Dakar-Plateaun** sydämessä. Plateau on kaupungin
  **historiallinen ydin**, ja siellä sijaitsee suurin osa
  ministeriöistä ja julkisista hallintoelimistä. Kunnanosan väkiluku
  on **34 626**.
- **1902**: Dakarista tuli Ranskan Länsi-Afrikan pääkaupunki
  Saint-Louis'n tilalle.
- Siirtomaakautensa huipulla **Dakar oli yksi Ranskan imperiumin
  suurkaupungeista, verrattavissa Hanoihin tai Beirutiin**.
  Ranskalaiset kauppahuoneet perustivat sinne sivukonttoreita, ja
  satama ja rautatie houkuttelivat teollisia investointeja —
  **myllyjä, panimoita, jalostamoita ja säilyketehtaita**.
- Kaupunki oli Ranskalle myös **strategisesti tärkeä**: satamassa oli
  merkittävä **laivastotukikohta ja hiiliasema**, ja kaupunki
  liitettiin varhaisiin **lento- ja lentopostireitteihin**,
  tunnetuimmin **Mermozin lentokentän** kautta, jota ei enää ole.
- **1959–1960** Dakar oli lyhytikäisen **Malin federaation**
  pääkaupunki, ja **1960** siitä tuli itsenäisen Senegalin
  tasavallan pääkaupunki.
- Presidentinpalatsi (*Palais Présidentiel*), hallituksen istuin, on
  **rakennettu 1907** ja sijaitsee aukion lähellä.

**5. Dakarin rautatieasema** ("Dakar–Niger Railway"; "Dakar" ›
Transport, Colonial Dakar):
- **Dakar–Saint-Louis-rata valmistui 1885**, ja sen jälkeen
  kaupungista tuli tärkeä tukikohta.
- **Dakar–Niger-rata rakennettiin 1906–1923** ja yhdisti Dakarin
  **Bamakoon**. Se vahvisti kaupungin aseman Ranskan
  Länsi-Afrikan kärkenä.
- Kaupungissa on **Dakarin autonominen satama** ja **Dakar–Niger
  -radan pääteasema**, joka **ei ole toiminnassa**.
- **Train Express Régional (TER)** yhdistää Dakarin **Blaise Diagnen
  kansainväliselle lentoasemalle (AIBD)**: ensimmäinen osuus
  Diamniadioon, toinen lentoasemalle. **14 asemaa**, nopein matka
  päästä päähän **45 minuuttia**, odotettu matkustajamäärä
  **115 000 päivässä**. Ensimmäinen koeajo **14.1.2019**, ensimmäinen
  matkustajajuna **joulukuussa 2021**.

**6. Dakarin suuri moskeija** ("Grand Mosque of Dakar"):
- Sijaitsee **Allée Pape Gueye Fallin varrella Dakarin medinassa**.
- Suunnittelijoina **marokkolaisia ja ranskalaisia arkkitehtejä**.
- **Avattiin 1964**, ja avaamassa olivat **Marokon kuningas
  Hassan II** ja **Senegalin presidentti Léopold Sédar Senghor**.
- Sisä- ja ulkopuoli on **rikkaasti koristeltu**, ja tyyliltään
  moskeija muistuttaa **Mohammed V:n mausoleumia Rabatissa**.
- Moskeijan alueella toimii **1964 perustettu Dakarin islamilainen
  instituutti**, julkinen laitos Senegalin opetusministeriön alaisena,
  omistettu islamilaiselle tutkimukselle ja opetukselle. Sen kirjasto,
  joka on nimetty prinssi **Naef Ben Abdelaziz Al-Saoudin** mukaan,
  avattiin **9.10.2004**.
- **HUOM. LÄHDEVIRHE-EPÄILY.** Artikkeli sanoo minareetin korkeudeksi
  **16 m**, mikä ei ole uskottava luku tämän kokoiselle moskeijalle
  (kuvateksti nimeää minareetin erikseen maamerkkinä).
  **Lukua ei käytetä lehdessä lainkaan.**

**7. Soumbédiounen käsityökylä** ("Dakar" › Notable sites; "Médina,
Dakar"):
- **Soumbédioune on Dakarin merkittävin katutori** ja suuri
  matkailukohde. Se sijaitsee **Médinan** kunnassa Atlantin rannalla.
- **Médinan kunta perustettiin 1914** siirtomaaviranomaisten
  toimesta. Tarkoitus oli nimenomaan luoda **"alkuasukaskortteli"**
  afrikkalaiselle väestölle, selvästi erotettuna eurooppalaisten
  asuinalueista — perusteluna esitettiin terveyssyyt.
- Erotus tehtiin **vuoden 1914 ruttoepidemian jälkeen**, ja
  Plateaun ja Médinan väliin jätettiin **"sanitaarinen vyöhyke"**.
- **Maan ensimmäisinä haltijoina kaupungin lebu-asukkaat vastustivat
  pakkolunastusta menestyksekkäästi.**
- Médina on nykyään **yksi Dakarin vanhimmista ja väkirikkaimmista
  kaupunginosista** (136 697 as.) ja **kaupungin tihein**. Se on
  säilyttänyt alkuperäisen afrikkalaisen luonteensa vastakohtana
  Plateaun moderneille kortteleille ja on siksi myös kaupungin
  **kulttuurikeskus**.
- Alue on nykyään **räätälinliikkeitä täynnä oleva kaupallinen
  keskus**.

**8. Cheikh Anta Diop -yliopisto** ("Cheikh Anta Diop University"):
- **UCAD** on nimetty senegalilaisen fyysikon, historioitsijan ja
  antropologin **Cheikh Anta Diopin** mukaan, ja siinä on
  **yli 60 000 opiskelijaa**.
- Yliopisto on **vanhempi kuin Senegalin itsenäisyys** ja kasvoi
  useista ranskalaisen siirtomaahallinnon perustamista laitoksista.
- **1918**: ranskalaiset perustivat **"école africaine de médecine"**
  -lääketieteellisen koulun, joka palveli pääosin valkoisia ja
  sekarotuisia opiskelijoita mutta oli avoin myös **Senegalin neljän
  vapaan kaupungin** pienelle koulutetulle eliitille.
- **1936**: Dakariin perustettiin **IFAN**, afrikkalaisen kulttuurin
  tutkimuslaitos.
- **1950-luvulla** ranskalaishallinto laajensi kouluja, lisäsi
  luonnontieteelliset tiedekunnat ja yhdisti ne
  **"Institut des Hautes Etudes de Dakar" -laitokseksi**.
- **1957**: rakennettiin uusi kampus **Ranskan 18. julkisena
  yliopistona**, liitettynä Pariisin ja Bordeaux'n yliopistoihin.
  Siitä tuli **Dakarin yliopisto, Ranskan Länsi-Afrikan suurin ja
  arvostetuin**.
- **1987**: nimi muutettiin Cheikh Anta Diopin kunniaksi.
- **Itsenäistyessä 1960** opiskelijoita oli **1 018**, joista vain
  **39 % senegalilaisia** — loput muista entisistä Ranskan
  siirtomaista. **1976** määrä oli **8 014**.
- Vuonna 2000 **noin 9 000 senegalilaista** sai ylioppilastutkinnon,
  ja yliopiston kirjoilla oli yli **40 000** opiskelijaa, vaikka
  kampuksella oli asuntolapaikkoja vain **5 000**.
- Yliopistolla on maine **yhtenä Afrikan arvostetuimmista
  laitoksista**. Suurin osa Senegalin itsenäisyyden jälkeisistä
  johtajista on sen kasvatteja, ja sen alumnit opettavat yliopistoissa
  eri puolilla maailmaa.

## 10. Matkaoppaan aineisto ("Matkailijan Dakar")

### Perille ja liikkeelle ("Dakar" › Transport)

- **Blaise Diagnen kansainvälinen lentoasema (AIBD)** ja sinne vievä
  **TER-juna** (ks. yllä).
- **Dakarin autonominen satama**.
- Kaupungissa on **täysin sähköinen BRT-runkobussiverkko, Sunu BRT**:
  tällä hetkellä **kaksi linjaa** käytössä ja kaksi suunnitteilla,
  **144 nivelsähköbussia**, oma kaista ja **32 syöttölinjaa**.
  Verkon rakentamisen rahoittivat **Maailmanpankki, Euroopan
  investointipankki ja Senegalin valtio**; kalustosta ja liikennöinnistä
  vastaa yksityinen **Dakar Mobilité** 15 vuoden käyttöoikeussopimuksella
  vuodesta 2021.
- BRT:n rakentaminen loi **1 000 suoraa työpaikkaa**, joista
  **35–45 % naisille**. Odotettu matkustajamäärä **noin 300 000
  päivässä**, ja matka-ajan odotetaan lyhenevän **95 minuutista
  45 minuuttiin**. Verkon jälkeen **69 % kaupungin väestöstä** pääsee
  keskustaan alle tunnissa, kun ennen osuus oli **12 %**.
- Dakarista alkaa **kolme Trans-African Highway -tietä**:
  Kairo–Dakar (TAH 1), Dakar–Ndjamena (TAH 5) ja Dakar–Lagos (TAH 7).
- **CETUD** perustettiin **1997** koordinoimaan Dakarin alueen
  liikennettä. Sen **2021 tekemän tutkimuksen** mukaan kansantalous
  menettää vuosittain lähes **900 miljardia CFA-frangia** (noin
  1,4 miljardia dollaria) huonon ilmanlaadun, ruuhkien, vaarallisten
  teiden ja melun takia — **lähes 6 % maan vuotuisesta BKT:sta**.
  *(Tämä on rehellinen "hyvä tietää" -tieto: liikenne on raskasta.)*

### Saaret ("Dakar" › Notable sites)

- Dakaria reunustaa **neljä pientä saarta**: **île de Yoff**,
  **Île de N'Gor**, **Îles de la Madeleine** ja **Île de Gorée**.
- **Île de N'Gor** on N'Gorin kunnan pohjoisrannalla, ja sen rannat
  vetävät muun muassa **surffaajia**. N'Gorin kunnassa on myös muita
  suosittuja rantakohteita, kuten **Plage de N'Gor**.
- Gorée on Unescon maailmanperintökohde, joka **säilyttää
  siirtomaa-ajan arkkitehtuurin**. Saarella on **Goréen muistomerkki**
  ja **orjatalo** museona. Saarella toimii myös satojen paikallisten
  taiteilijoiden **ulkoilmanäyttely**.

### Ruoka ja tapa ("Dakar" › Culture)

- Perinteinen kulttuuri on hyvin **perhekeskeistä** — myös
  ruokailutapa. Kun on ruoka-aika, joku sanoo **"kay lekk"**, tule
  syömään. Kaikki kokoontuvat **saman vadin ympärille ja syövät
  käsin**.
- Kuuluisia ruokia ovat **Cebbu Jën (thiéboudienne)** ja **yassa**.
  *(Molemmat ovat maalehden aiheita — mainitaan oppaassa nimeltä
  yhdellä lauseella, ei omana nostona.)*
- **Tervehtimättä jättäminen on törkeää.** Se on tapa, joka on
  yksinkertainen mutta olennainen.
- Koululaiset saavat keskipäivällä tauon ja **menevät kotiin
  lepäämään** — piirre, joka juontuu ranskalaisesta koulujärjestelmästä.
- Väestö on **pääosin muslimeja**, ja päivittäisiä uskonnollisia
  toimituksia on paljon; perjantaina mennään lähimoskeijaan.

### Uskonnolliset rakennukset ("Dakar" › Places of worship)

- Yleisimpiä ovat **moskeijat**. Kristillisiä kirkkoja on myös,
  muun muassa **Dakarin roomalaiskatolinen arkkihiippakunta**.
- **ISESCO valitsi Dakarin Afrikan alueen islamilaisen kulttuurin
  pääkaupungiksi vuodeksi 2007.**
- **Mosque of the Divinity** valmistui **1973** Ouakamissa; sillä on
  luonteenomaiset **kolmionmuotoiset ikkunat**. **Omarienne-moskeijan**
  minareettien päällä on **vihreät pallot**.

### Yliopisto ("Cheikh Anta Diop University")

- **Cheikh Anta Diop -yliopisto**, tunnetaan myös nimellä Dakarin
  yliopisto, **perustettiin 1957**.

### Sää matkailijalle

Ks. osio 1. Oppaan sääjaksossa sanotaan suoraan, että luvut ovat
en-Wikipedian **Dakar**-artikkelin Climate-osiosta ja että lehdellä ei
ole omaa vuosigraafia, koska säärivin tekee erillinen agentti.

## 11. Mitä repossa on ennestään

- `js/packs/africa-valokuvat.js` (`dakar`): **ennen–nyt-pari on
  valmis** — `Dakar mosque circa 1900.jpg` (E. Fortier, PD, noin
  1900) ja `Gorée 2024 - Vue de Dakar - 17.jpg` (Fawaz.tairou,
  CC BY 4.0). Lisäksi kolme lisäkuvaa: Almadiesin niemi (Tbo47,
  CC BY-SA 4.0), Goréen katu (UNESCO / Dominique Roger,
  CC BY-SA 3.0 IGO) ja Goréen orjatalon sisäpiha (August Dominus,
  CC0). **Ennen–nyt-pari kopioidaan tästä taulusta sellaisenaan**
  (tiedostonimi, vuosi, lähderivi) ja vain selitteet kirjoitetaan
  uudestaan yhden virkkeen mittaisiksi, kuten
  `docs/moduulit/kaupunkilehti.md` ohjeistaa.
- `js/packs/africa-kulttuuri.js` (`dakar`): kolme litteää nostoa
  (Gorée, Youssou N'Dour + Apple Music -linkki, teranga) ja
  `kysymys`. **Ei kosketa** — sama ratkaisu kuin Nairobissa
  (v1662-erä). Kun kaupunki saa kategoriat, litteät nostot eivät enää
  näy; asia raportoidaan Fablelle, koska Youssou N'Dourin
  musiikkilinkki jää silloin piiloon eikä sitä voi siirtää tähän
  lehteen (mbalax ja N'Dour ovat Senegalin maalehden aihe).
- `js/packs/africa-artikkelit.js` (`Dakar`): **merkintä on olemassa**
  mutta `intro` on vain **4 virkettä** — uusi tekstilinjaus vaatii
  **7–10 virkettä (~700–1100 mrk)**. Intro kirjoitetaan uudestaan.
  `artikkeli` on kolmikappaleinen ja kelvollinen, mutta sen
  Youssou N'Dour- ja thiéboudienne-painotus on nyt maalehden aihetta;
  se päivitetään kaupungin omaan tarinaan.
- `js/packs/africa-saapumiset.js` (`dakar`): **merkintä on olemassa**
  (kuvaus + isoisän nosto Goréestä). **Ei kosketa** — se on
  matkakirjatekstiä, joka on omistajan päätöksellä tauolla, ja se on
  1873-yhteensopiva (isoisä puhuu laivauksesta, ei rautatiestä).
- `js/packs/africa-questions.js`: `dakar` (visa) ja `HUOMIOT.dakar`
  ovat olemassa. **Ei kosketa.** Huomioissa isoisä sanoo "Tästä
  läntisimmästä kärjestä on Amerikkaan lyhyempi matka kuin kotiin
  Lontooseen" — ei ristiriitaa lehden kanssa.
- `js/packs/maakartat.js`: `KAUPUNKIKARTAT.dakar` **puuttuu**.
- `js/packs/nahtavyysjutut.js`: `dakar` **puuttuu**.
- `js/packs/saatiedot.js`: `dakar` **puuttuu** — säärivin tekee eri
  agentti.
