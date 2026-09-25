# Somalia-maalehti (ISO-3: SOM) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 7.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`). Lyhyt faktapohja: vain ne luvut,
päiväykset ja nimet, jotka päätyivät `js/packs/maa-kategoriat.js`:n
SOM-lohkoon, sekä rajaukset ja ristiriidat. Rakenteen sitova lähde
docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Runous, Musiikki, Ruoka, Luonto.**
Minitehtävä on Ruoka-sivulla.

**Herkkyysrajaus.** Somalia on herkkä maa, ja lehti noudattaa M3:n
Myanmar-linjaa, joka on kirjattu myös `js/packs/maastokohteet-som.js`:n
erälohkoon: **nykytila ei ole aihe.** Lehdessä ei ole nykypolitiikkaa,
käynnissä olevia selkkauksia eikä vuoden 1991 jälkeisiä tapahtumia
(poikkeuksena Waaberin kiertueet 1997–1998, jotka ovat kulttuuria).
Siksi runoilija **Hadraawi jätettiin pois** kokonaan: hänen
elämäkertansa on pääosin poliittista vainoa ja vankeutta, eikä sitä voi
kertoa asiallisesti ilman nykyhistorian osapuolia. Samasta syystä
Waaberi-nosto kertoo ryhmän kiertueista eikä sen ajan hallinnosta, ja
`Music of Somalia` -artikkelin kuvaus musiikin tukahduttamisesta ja
Hargeisan maahan kaivetuista nauhoista jätettiin käyttämättä.

**Päällekkäisyysrajaus.** Somaliaa on pelissä jo paljon, ja lehti EI
toista mitään seuraavista:

- `js/packs/maastokohteet-som.js`: Shimbiris, Adeninlahti, Intian
  valtameri, Jubba (ja Ajuranin kastelujärjestelmä), Laas Geel,
  Dhambalin, Amud, Zeila, Bosaso, Hobyo, Hamar Weyne (Fakhr al-Dinin
  moskeija) ja Barawa.
- `js/packs/skandaalit.js` SOM: Berberan sopimukset 1884–1886 ja
  Britannian Somalimaa sekä dervissiliike.
- `js/packs/elaintakyt.js` SOM: beira-antilooppi.
- `js/packs/africa-kulttuuri.js` `rashafun` (Ras Hafun on pelikaupunki):
  suitsuke, Puntin maa ja monsuunikauppa — **siksi suitsuke ja Punt
  puuttuvat lehdestä kokonaan**, vaikka ne olisivat luontevia aiheita.
- `js/packs/africa-questions.js`: Mogadishu pääkaupunkina, suitsukkeen
  keräys ja monsuunikauppa.
- `MAA_KATEGORIAT.CHN`: Zheng Hen kirahvi 1414 — Somalian nosto kertoo
  saman laivaston Mogadishun päästä (lähettiläät Kiinaan) eikä toista
  qilin-tarinaa.

Kaupunkilehteä Somaliassa ei ole (`KULTTUURI_KATEGORIAT`-taulussa ei ole
Mogadishua eikä Ras Hafunia), joten kaupungin kansi ei rajaa aiheita.
Tunnusluvut ovat valmiina (`js/packs/africa-maatiedot.js`, SOM), joten
`tests/maatiedot.test.mjs` ei vaatinut mitään.

## 1. Historia

Kaikki neljä nostoa: en-Wikipedia **"Sultanate of Mogadishu"**, osiot
"Origins and early history", "Mogadishu in the accounts of Marco Polo",
"Madagascar and Mogadishu", "Mogadishan influence in Sofala" ja
"Mogadishu's society and Golden Age" (luettu 7.9.2026).

- **Ibn Battuta 1331:** kuvasi Mogadishun "exceedingly large city",
  jossa oli rikkaita kauppiaita ja joka oli kuulu hienosta kankaastaan;
  kangasta vietiin muun muassa Egyptiin. Kutomateollisuuden nimi
  **toob benadir**, ja se oli erikoistunut **Egyptin ja Syyrian**
  markkinoille. Vieraanvaraisuus: paikalliset majoittivat matkalaiset
  koteihinsa, mikä piti rahan kaupungissa. Sulttaani **Abu Bakr ibn
  Shaikh Umar**, "Barbara"-taustainen, puhui yhtä sujuvasti
  Mogadishun somalia ja arabiaa. **RISTIRIITA:** sulttaanikunnan
  perustamisajankohta on lähteissä joko 1200-luvun puoliväli tai 1330,
  ja perustajan Fakhr ad-Dinin alkuperästä kiistellään (Roland Oliver:
  arabitaustainen; Ibn Battuta ja Ross E. Dunn: somalialainen
  kaupunki). Nostossa ei väitetä kumpaakaan — vain Battutan oma
  havainto vuodelta 1331.
- **Lähettiläät Kiinaan:** sulttaanikunta lähetti lähettiläitä Kiinaan
  ja synnytti **ensimmäisen tunnetun afrikkalaisyhteisön Kiinassa**;
  tunnetuin **Sa'id Mogadishulainen**, artikkelin mukaan ensimmäinen
  afrikkalainen, joka astui Kiinan maaperälle. Vastavuoroisesti
  **Ming-keisari Yongle** lähetti **Zheng Hen** johdolla yhden Kiinan
  historian suurimmista laivastoista Mogadishuun; mukaan lähti kultaa,
  suitsuketta ja kangasta, ja Kiinaan vietiin ensimmäiset
  afrikkalaiset eläimet (virtahepoja, kirahveja, gaselleja).
- **Madagaskarin nimi:** tunnettu hypoteesi on, että nimi on väännös
  Mogadishusta; **Marco Polo** sekoitti paikat muistelmissaan
  (Socotran eteläpuolinen "Madagaskar"), ja nimi levisi renessanssin
  karttoihin. **Jerome Megiser 1609:** Mogadishun ja Adalin
  hallitsijat lähtivät suurella laivastolla itään, myrsky ajoi heidät
  Madagaskariin, ja he pystyttivät saarelle **kahdeksan pylvästä**,
  joihin oli kaiverrettu **Magadoxo**. Nosto sanoo tämän
  nimenomaisesti selitykseksi eikä varmaksi tiedoksi.
- **Sofala:** mogadishulaiset kauppiaat perustivat sataman Mosambikin
  rannikolle päästäkseen **Suuren Zimbabwen** kultakenttiin (Buzi-joki
  → Manica). Salaisuus säilyi Kilwalta, joka purjehti harvoin **Cabo
  Delgadon** eteläpuolelle, kunnes kalastaja tarttui isoon kalaan,
  joutui sen vetämänä Sofalan matalikoille ja palasi kertomaan
  sulttaani **Suleiman Hassanille**; tämä purjehti paikalle kangaslasti
  mukanaan, tarjosi Mwenemutapalle paremman kaupan ja syrjäytti
  mogadishulaiset **1180-luvulla**. Sama tapahtuma toisesta suunnasta:
  `js/packs/maastokohteet-moz.js` (Sofala) — se kertoo Kilwan
  valtauksen ja portugalilaiset, ei mogadishulaisia, joten nostot eivät
  mene päällekkäin.

## 2. Runous

- **"Nation of Poets"** (en-Wikipedia "Somali literature", osiot
  "Nation of Bards" ja "Structure"): **Richard Francis Burton**
  kirjoitti *First Footsteps in East Africa* -kirjassaan 1850-luvun
  matkastaan, että "the country teems with poets" ja että jokaisella
  päälliköllä on oltava ylistysruno, jonka hänen klaaninsa laulaa.
  **Margaret Laurence** loi nimityksen "Nation of Poets". Eidagalleja
  pidettiin parhaina runoseppinä; **Hersi Jama** kertoi Laurencelle,
  että sadasta eidagallemiehestä 95 osaisi laulaa oman gabay-runonsa.
- **Alkusointu:** somalialaisessa runoudessa alkusointu on pakollinen
  ja kulkee koko runon läpi (vrt. germaaninen alkusointuinen runous);
  runolajit erottaa toisistaan säkeen tavuluku.
- **Ali Bu'ul (Cali Bucul)**, 1800-luku: geeraar-runot ylistävät
  hevosta, joka oli paimentolaiselle kulkuneuvo ja arvoesine. Runossa
  *Guulside* alkusointu kaikuu hevosen nimeä. Häneltä jäi kieleen sana
  **guulwade** (voitonkantaja).
- **Elmi Boodhari** (en-Wikipedia "Somali literature" ja "Elmi
  Boodhari"): kirjoitti kaikki runonsa **Hodan Abdullelle**, joka
  naitettiin varakkaammalle miehelle; rakastetun nimeäminen oli tapojen
  vastaista, ja hän sai osakseen julkista pilkkaa. Runot tunnetaan
  nimellä **Qaraami** (intohimo); **Margaret Laurence** esitteli niitä
  englanniksi kokoelmassa *A Tree for Poverty*.
- **Kirjoitusjärjestelmät** (en-Wikipedia "Somali language", osio
  "Writing system"): arabialainen kirjoitus ja **wadaad-kirjoitus**
  olivat käytössä vuosisatoja, mutta lähinnä uskonoppineilla.
  1900-luvun omat kirjaimistot: **osmanja** (Osman Yusuf Kenadid),
  **borama** (Abdurahman Sheikh Nuur) ja **kaddare** (Hussein Sheikh
  Ahmed Kaddare). **Latinalainen aakkosto otettiin virallisesti
  käyttöön 1972**; kehittäjinä muun muassa **Musa Haji Ismail Galal,
  B. W. Andrzejewski ja Shire Jama Ahmed**. Käyttää kaikkia englannin
  kirjaimia paitsi **p, v ja z**; kolme yhdistelmää DH, KH ja SH.

## 3. Musiikki

- **Abdi Sinimo** (en-Wikipedia "Abdi Sinimo"): **1920–1967**, kotoisin
  Jaarahoratosta noin 40 km Boramasta koilliseen; ajoi Djiboutin
  satamaviranomaisen kuorma-autoa **Djibouti–Dire Dawa–Addis Abeba**.
  Hyräili **1943** runon korjatessaan rikkoutunutta autoa, ja siitä
  alkoi **balwo**-tyyli; jätti ajamisen **1944** ja perusti Boramaan
  Balwo-nimisen yhtyeen. Balwosta kehittyi **heello**, ja niistä
  moderni somalimusiikki.
- **Abdullahi Qarshe** (en-Wikipedia "Abdullahi Qarshe"): **1924–1994**,
  syntyi somaliyhteisöön **Moshissa Tansaniassa**, siirtyi **1931**
  kouluun **Adeniin**, jossa kohtasi ensi kertaa elokuvan ja radion
  (intialaista ja arabialaista musiikkia) ja osti luutun tehdäkseen
  vastaavaa musiikkia somaliksi. Tunnetaan **somalimusiikin isänä**;
  toi **kabanin (oudin)** somalilaulun säestäjäksi. **1957** kirjoitti
  ja sävelsi **Qolobaa Calankeed**, Somalian kansallislaulun.
- **Sointi ja soittimet** (en-Wikipedia "Music of Somalia"): laulut ovat
  **pentatonisia** (viisi säveltä oktaavissa). Työnjako: sanoittaja
  **lahamiste**, säveltäjä **abwaan**, laulaja **odka** ("ääni"); tanssi
  **ciyaar**. Pääsoitin **kaban** (oud-luuttu), taustalla pieniä rumpuja
  ja ruokohuilu; raskas lyömäsoitinten käyttö ja metalliset äänet ovat
  harvinaisia. Rannikon ja jokivarren soittimia mm. **shareero** (lyyra),
  **sumaari** (kaksoisklarinetti), **shanbaal** (puukalistimet).
- **Waaberi** (en-Wikipedia "Waaberi"): syntyi radion
  taiteilijayhdistyksen jäsenistä, toimi kansallisteatterin yhteydessä,
  sai **nimen Waaberi ("aamunkoitto") 1969**, kiersi Egyptissä ja
  Sudanissa ja esiintyi Kiinassa; jatkoi yksityisenä ryhmänä
  1990-luvulle. **Maryam Mursal**, ensimmäinen somalialaista jazzia
  soittanut nainen, oli jäsen. **WOMAD 1997** Englannissa,
  Pohjois-Amerikan kiertue **1998**, levy egyptiläisen **Hossam
  Ramzyn** kanssa.

## 4. Ruoka

Kaikki neljä nostoa: en-Wikipedia **"Somali cuisine"**, osiot
"Breakfast", "Lunch", "Dinner" ja "Dessert/Snacks" (luettu 7.9.2026).

- **Quraac ja canjeero:** aamiainen on tärkeä ateria; juomana **shaah**
  tai **qahwa**. Pääleipä **canjeero / laxoox**, letun kaltainen
  hapatettu leipä; syödään hunajan ja **subagin** (voisulan),
  oliivi- tai seesamiöljyn kanssa. Lapsille tee + öljy + murennettu
  leipä = **macsaro**. Ero Etiopian injeraan: canjeero on **pienempi,
  ohuempi ja makeampi**. Lisukkeina maksa, vuohenliha (**hilib ari**),
  **suqaar** tai **muqmad/oodkac** (voisulassa keitetyt kuivatun lihan
  palat).
- **"Federation":** pasta (**baasto**) on italialaisten perua ja
  syödään paksun muhennoksen kanssa. Federaatio-annos: **yhtä suuret
  kokonaiset annokset riisiä ja spagettia** soikean vadin eri puolilla,
  päällä haudutettua lihaa ja kasviksia, mukana salaatti ja
  vapaaehtoinen banaani. Nimen arvellaan tulevan kahden ruokalajin
  liitosta ja annoksen koosta; tilataan ravintolasta, kotona harvinainen.
  **Minitehtävän vastaus on tässä nostossa.**
- **Xalwo:** benadirilainen makeinen id-juhliin ja häihin; sokeria,
  maissitärkkelystä, kardemummaa, muskottipähkinää ja voisulaa,
  toisinaan maapähkinöitä. Ilta-ateriana **rooti iyo xalwo**
  (leipäviipaleita ja hyytelömäistä makeista).
- **Shaah:** mustaa teetä, mausteina inkivääri, kardemumma ja kaneli —
  **mustapippuria ei käytetä**, toisin kuin monessa muussa maustetussa
  teessä. **Maito lisätään vasta keittämisen jälkeen** (shaah cadeeys).
  Ennen nukkumaanmenoa lasi kardemummalla maustettua maitoa.
  Janojuomia **balbeelmo** (greippi), **raqey** (tamarindi) ja
  **isbarmuunto** (limonadi).

## 5. Luonto

- **Somalian virta** (en-Wikipedia "Somali Current", johdanto):
  **kylmä länsireunan rajavirta** Somalian ja Omanin rannikolla,
  Intian valtameren vastine Golfvirralle; **ainoa suuri kumpuamisalue
  valtameren länsireunalla**. **Kesä–syyskuussa** lounaismonsuuni
  työntää rannikkovettä koilliseen ja synnyttää kumpuamisen; samaan
  aikaan puhaltaa **Somalian suihkuvirtaus (Findlaterin suihkuvirtaus)**.
  Rannikko- ja avomerikumpuaminen yhdessä tekevät alueesta yhden
  **maailmanmeren tuotteliaimmista ekosysteemeistä**.
- **Kamelit** (en-Wikipedia "Economy of Somalia", johdanto, ja "Camel
  milk", osio "Production"): Somalian keskuspankin mukaan **noin 80 %**
  väestöstä on paimentolaisia tai puolipaimentolaisia, jotka pitävät
  vuohia, lampaita, kameleita ja nautoja ja täydentävät tulojaan
  hartsien keräyksellä. Kamelinmaidon maailmantuotanto **2017: 2,85
  miljoonaa tonnia**, josta **Somalia ja Kenia yhdessä 64 %**.
  Kamelinmaidosta syntyy helposti jogurttia, mutta **voita ja juustoa
  siitä ei juuri saa**.
- **Somalianstrutsi** (en-Wikipedia "Somali ostrich"): *Struthio
  molybdophanes*, tunnistettiin **omaksi lajikseen 2014** (aiemmin
  afrikanstrutsin alalaji) — nyt strutsilajeja on kaksi. Kaulan ja
  reisien iho **sinertävän harmaa**, koiraalla soidinaikaan kirkkaan
  sininen; **ei valkoista kaularengasta**. Erosi kantamuodosta
  **3,6–4,1 miljoonaa vuotta sitten**; Itä-Afrikan hautavajoama on
  pitänyt lajit erillään. Somalit ovat **osittain kesyttäneet**
  strutseja.
- **Somalianvilliaasi** (en-Wikipedia "Somali wild ass"): afrikan-
  villiaasin alalaji, **jalat raidalliset kuin seepralla**; luonnossa
  arviolta **600 yksilöä**, IUCN **äärimmäisen uhanalainen**. Elää
  fissio–fuusio-yhteisöissä: aikuiset useimmiten yksin, tammat ja varsat
  pieninä laumoina, suurempia joukkoja vain sateisilla alueilla. Ori voi
  pitää **jopa yhdeksän neliömailin (n. 23 km²)** reviiriä ja merkitä
  rajat lantakasoin. **Italian kotiaasien** katsotaan polveutuvan tästä
  aasista roomalaisajoista asti.

## Uutislähde

**Shabelle Media** (mogadishulainen mediatalo), somaliksi,
`https://shabellemedia.com/feed/`. Testattu 7.9.2026 molemmilla
testeillä: syötteessä kymmenen juttua; artikkelisivun
`<article>`-lohkossa neljä yli 60 merkin kappaletta ja `og:image`
löytyy. MyMemory kääntää parin `so|fi` (kokeiltu samana päivänä).
Hylätyt vaihtoehdot on lueteltu `js/packs/uutislahteet.js`:n
SOM-kommentissa.

## Kuvat

Kuvat on haettu Commonsin haku- ja kategoriarajapinnasta, lisenssi ja
tekijä tarkistettu `extmetadata`-kentistä ja jokainen käytetty kuva
katsottu 480 px esikatselukuvana ennen hyväksymistä. Käyttöön kelpasi
neljä:

| Nosto | Tiedosto | Lisenssi ja tekijä |
| --- | --- | --- |
| Ruoka / xalwo | `Halwo 003.jpg` (1632×1224) | CC BY-SA 3.0, Middayexpress |
| Luonto / kamelit | `Somaliland (6790596624) (2).jpg` (3264×1840) | CC BY 2.0, YoTuT (Berbera) |
| Luonto / strutsi | `Struthio molybdophanes 443006323.jpg` (2048×1365) | CC BY 4.0, Tommy Andriollo (kuvattu Etiopiassa, mikä sanotaan selitteessä) |
| Luonto / villiaasi | `Equus africanus somaliensis - Réserve africaine de Sigean 01.jpg` (4452×3416) | CC BY-SA 3.0, H. Zell (Sigean, Ranska — sanotaan selitteessä) |

**Loput 16 nostoa jäivät kuvattomiksi tarkoituksella** — kuvaton on
parempi kuin väärä kuva. Syyt:

- **Ruoka.** Canjeerosta ei ole Commonsissa yhtään ≥ 1200 px kuvaa
  (`LahohS.jpg` on 750 px); haku "canjeero" palauttaa pelkkiä
  etiopialaisia injera-kuvia, jotka olisivat väärä leipä. Federaatiosta
  ja shaahista ei ole kuvia lainkaan; "SOMALI FAVORITE MAIN FOOD.jpg" on
  riisiä ja kanaa, ei riisiä ja spagettia.
- **Musiikki ja runous.** Commonsin `Category:Music of Somalia` sisältää
  yhden valokuvan (sotilassoittokunta) ja `Category:Culture of Somalia`
  vain tanssikuvia, joissa on tunnistettavia kasvoja. Osmanya-kirjaimista
  suurin tiedosto on 960 px kirjoituskone. Abdi Sinimosta, Abdullahi
  Qarshesta, Waaberista ja Elmi Boodharista ei ole vapaita kuvia.
- **Historia.** Zheng Hen laivastosta on vain nykyisiä museomalleja ja
  Nanjingin betonireplika, jotka eivät kerro Mogadishusta;
  `Majeerteen horse riders in hafun.jpg` (PD) on komea 1800-luvun
  piirros, mutta se esittää aseistettua ratsuparvea höyrylaivan edessä
  eli siirtomaakahakkaa — hylättiin herkkyyslinjan takia. Vanhoista
  kartoista ainoa ≥ 1200 px "Magadoxo"-kartta on BnF:n panoraama, jonka
  tekijä on tuntematon eikä nimeä voi tarkistaa 480 px kuvasta.

Kuvaputkelle tilattavat kuvat on lueteltu erän raportissa.
