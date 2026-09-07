# Lagos — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `lagos`, maa NGA, en-Wikipedia "Lagos".
Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Malli ja mitat luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`, `tools/parvi/kohdekartta-ohje.md`,
`docs/moduulit/kaupunkilehti.md` ja `docs/mantereet-tyoaineisto/
spec-mantereet.md`. Malli: Nairobin ja Miamin lehdet.

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Lagos"**,
**"History of Lagos"**, **"Lagos Island"**, **"Lagos Colony"**,
**"Eyo festival"**, **"Saro people"**, **"Shitta-Bey Mosque"**,
**"Oba of Lagos"**, **"Iga Idunganran"**, **"Makoko"**,
**"Third Mainland Bridge"**, **"Danfo"**, **"Lagos Lagoon"**,
**"Nollywood"**, **"Lekki Conservation Centre"**, **"Amala (food)"**,
**"Agege bread"**, **"Fuji music"**, **"Samuel Ajayi Crowther"**,
**"Cathedral Church of Christ, Lagos"**, **"Tinubu Square"**,
**"Lagos Central Mosque"**, **"Ajele Cemetery"**,
**"Freedom Park (Lagos)"**, **"King's College, Lagos"**,
**"Tafawa Balewa Square"**, **"Nigerian National Museum"**.

## 0. Rajaus tälle lehdelle

**Nigerian maalehti (js/packs/maa-kategoriat.js, NGA) on jo tehty, ja
sen aiheita EI toisteta.** Maalehti kertoo: Amina ja Zazzaun muurit,
Oyon tyhjä kalebassi, Nana Asmaʼu ja jajit, vuoden 1929 naisten sota;
jollof, suya, egusi, iyán; puhuva rumpu, jùjú ja Tunde King 1932,
Grammy-ehdokkuus, afrobeat ja Fela Kuti; Ifen päät, Olowen ovi,
Ben Enwonwu, adire; Tutuola, Achebe, Soyinka, Onitshan toriproosa.
Karttanostot (`js/packs/maastokohteet-nga.js`: Chappal Waddi,
Guineanlahti, Nigerjoki, Benue, Sukur, Osun-Osogbo, Zuma Rock,
Igbo-Ukwu, Yankari, Kainji, Nok, Badagry) ja skandaalit
(`js/packs/skandaalit.js`, NGA: Benin 1897, Jaja) on luettu — yksikään
ei ole tämän lehden aihe.

**Tämä lehti pysyy kaupungissa:** Aworien perustamistaru, Eko ja
Benin, vuosien 1851–1861 tapahtumat ja siirtomaan asema 1873,
paluumuuttajat (Saro ja Aguda), Eyo-kulkue, laguuni, Makoko, sillat
ja Nollywood.

Kaupungin visa on luettu tiedostosta `js/packs/africa-questions.js`
(avain `lagos`, viisi kysymystä: maa Nigeria, Guineanlahti, mikä on
Nollywood, englanti virallisena kielenä, nimen alkuperä portugalin
laguuni-sanasta). **Minitehtävä ei saa kysyä yhtään näistä viidestä.**
Kulttuurivisa `js/packs/africa-kulttuuri.js` (`lagos`) kysyy
afrobeatista ja Fela Kutista.

**Litteää taulua `africa-kulttuuri.js` EI muuteta** — sama ratkaisu
kuin Nairobissa ja Kapkaupungissa tässä samassa parvierässä, jossa
kategoriat lisättiin flat-taulun rinnalle koskematta siihen.

Olemassa olevat lohkot on luettu:
- `js/packs/africa-saapumiset.js` (`lagos`): valmis, ei kosketa.
- `js/packs/africa-valokuvat.js` (`lagos`): **ennen–nyt-pari on
  valmiiksi tarkistettu** (Lagos 1929 / Lagos Island City Scape), ja
  lisäkuvina Carterin silta, Idumotan tori ja Makoko. Nämä viisi
  tiedostonimeä ovat varattuja eikä niitä käytetä uudestaan muualla
  kuin ennen–nyt-parissa.
- `js/packs/africa-kulttuuri.js` (`lagos`): Eyo-kuva
  (`Eyo masquerades. Lagos State, Nigeria.jpg`), afrobeat-linkki,
  jollof. Lehden nostot eivät käytä samaa kuvatiedostoa.
- `js/packs/africa-artikkelit.js` (`Lagos`): lyhyt intro ja
  kolmiosainen artikkeli. **Intro kasvatetaan 7–10 virkkeeseen**
  (Nairobi-malli); artikkeli jää ennalleen.

**1873-KEHYS:** isoisän matkavuonna Lagos oli **Britannian
siirtomaa**, joka oli julistettu siirtomaaksi 5.3.1862 mutta jota
hallittiin **Kultarannikolta** käsin; omaksi siirtomaakseen se
erotettiin vasta 1886 kuvernööri Cornelius Alfred Moloneyn aikana.
Kaupungissa asui jo Saro- ja Aguda-paluumuuttajia, ja anglikaaninen
Kristuksen katedraali oli valmistunut 1869 — neljä vuotta ennen
Foggin isoisän matkaa. Ensimmäinen Eyo-kulkue oli järjestetty
20.2.1854.

---

## 1. Nimi ja perustaminen

- Lagos tulee portugalin sanasta "järvet" ("Lagos is derived from the
  Portuguese word for 'lakes'"). Kaupunki on todennäköisimmin nimetty
  **Portugalin Lagosin** mukaan, joka oli 1400-luvun portugalilaisten
  Afrikan-retkien pääsatama. Alfred Moloney piti tätä selitystä
  todennäköisempänä kuin johtamista sanasta *lago*, ja Sir Alan Burns
  sanoi samaa. Rui de Sequeira kävi alueella **1472** ja nimesi seudun
  **Lago de Curamo**, Curamon järvi.
- Jorubankielinen nimi on **Èkó**. Kaksi selitystä (ks. tarkistus,
  kohta A): "Lagos"-artikkeli johtaa sen joruban sanasta *Ereko*,
  maatila tai kylä; "History of Lagos" sanoo nimen tulleen edon
  sanasta *Ikurame*, sotaleiri, ajalta jolloin saari oli Beninin
  hallinnossa. Alkuperäinen aworinkielinen nimi oli **Oko**.
  Portugalilaiset kutsuivat paikkaa ensin nimellä **Onim**.
- **Perustamistaru:** Aworien hallitsija **Olofin** sai Oduduwalta
  savilautasen ja ohjeen laskea se jokeen ja asettua sinne, mihin se
  uppoaa. Lautanen ajelehti alavirtaan ja upposi Lagosin laguuniin.
  Olofin jakoi saaren kymmenen poikansa kesken. Yksi heistä,
  **Aromire**, istutti viereiselle saarelle pippuria; myöhemmin
  paikalle rakennettu Lagosin oban palatsi **Iga Idunganran**
  tarkoittaa siksi kirjaimellisesti "pippuripellon palatsia".
- Vanhimmat laguunin asukkaat olivat kalastajia. Aworit saapuivat
  1400-luvulla Ogun-jokea alas sotaa pakoon. Ekon juuret ovat
  **Isherissä** Ogunin alajuoksulla, jossa **Ogunfunminire** Ifestä
  oli ensimmäinen kuningas. Kaupan kasvaessa painopiste siirtyi ensin
  Ebute-Mettaan, sitten Iddoon ja lopulta Ekon saarelle. Laguunin yli
  saarelle viljelemään menneet pysyivät Iddon kuninkaan Olofinin
  alaisuudessa.
- Kauppa veti alueelle ryhmiä: ijebut 1400-luvulla, binit 1500-luvulla.
  Portugalilaiset aloittivat kaupan laguunilla noin 1472 mutta
  ohittivat pienet saariyhteisöt ja menivät suoraan Ijebuun.

## 2. Benin, sotaleiri ja Ashipa

- 1500-luvun puolivälissä Beninin kuningaskunta laajeni länteen
  hallitakseen useampia rannikon kauppapaikkoja ja kankaan
  tuotantokeskuksia. Noin **1600** puhkesi kiista beniniläisten ja
  muiden ulkomaisten kauppiaiden sekä paikallisten aworien välillä.
- Oba **Orhogbua** hyökkäsi Iddoon; aworit ja Olofin löivät hänet
  takaisin. Lopulta Beninin armeijat voittivat (beniniläisen
  perimätiedon mukaan) tai sota päättyi neuvoteltuun sopimukseen
  (aworien mukaan). Lagosin saaresta tuli **linnoitettu Beninin
  sotilastukikohta**, jonka komentaja **Asheru** sai merkittävän
  vaikutusvallan.
- Asheru kuoli hyökkäyksessä Isheriin. Aworipäällikkö **Ashipa**
  palautti komentajan jäännökset Beniniin, ja Beninin oba nimitti
  hänet Ekon hallitsijaksi. Ashipa perusti uuden hallitsijasuvun,
  joka aikanaan otti käyttöön myös oban arvonimen; edolaiset johtajat
  perustivat suvut, joista tuli uuden kuningaskunnan sotilaalliset ja
  hallinnolliset päälliköt. Ashipa aloitti veronmaksun Beniniin, ja
  se lakkautettiin vasta **1830** — vaikka alamaisuus oli 1700-luvulla
  enää nimellistä.

## 3. Orjakauppasatama ja seuraajakiistat

- 1600-luvulla kauppa portugalilaisten kanssa kasvoi, ja Onimista
  tuli Atlantin orjakaupan keskus. Ensimmäinen kirjattu englantilainen
  orjaosto Lagosissa oli **1652**.
- Tärkeäksi orjasatamaksi Lagos nousi vasta **1760-luvulla**.
  Perimätiedon mukaan riita veljensä Gabaron kanssa oli ajanut prinssi
  **Akinsemoyinin** maanpakoon Badagryyn, jossa hän loi suhteet
  eurooppalaisiin orjakauppiaisiin; valtaan noustuaan hän avasi
  kuningaskuntansa orjakaupalle. Kauppa kasvoi valtavasti 1780-luvulla
  ja edelleen 1800-luvun alussa, ja Eko oli silloin **pohjoisen
  pallonpuoliskon suurin orjien viejä**.
- Eko piti yllä diplomaattisia ja taloudellisia suhteita
  Etelä-Amerikkaan, lähetti lähetystöjä Portugalin Brasiliaan ja oli
  **1823 yksi ensimmäisistä valtioista, jotka tunnustivat Brasilian
  itsenäisyyden**.
- Seuraajakiistat: Akinsemoyin kuoli n. 1775; Ologun Kutere n. 1780;
  hänen kuolemansa jälkeen kiistelivät veljekset Osinlokun ja Adele
  Ajosun. Idewu Ojularin ahneus johti siihen, että päälliköt
  valittivat Beninin oballe, joka lähetti tälle **kallon, miekan ja
  viestin**, ettei Lagosin väki enää tunnusta häntä kuninkaaksi;
  Idewu tulkitsi kallon kehotukseksi ottaa myrkkyä ja miekan uhkaksi
  ja teki itsemurhan. **Kosoko** estettiin toistuvasti valtaistuimelta,
  ja heinäkuussa 1845 puhjenneessa sisällissodassa hänen joukkonsa
  piirittivät palatsia kolme viikkoa; puolustajat joutuivat juomaan
  suolavettä, ja taistelu muistetaan nimellä **Ogun Olomiro,
  suolavesisota**. Akitoye pakeni Abeokutaan ja Badagryyn.
- Britannia nimitti **John Beecroftin** Beninin- ja Biafranlahtien
  konsuliksi 1849. Akitoye otti Badagryssä yhteyttä Beecroftiin,
  varakonsuli John Duncaniin ja lähetyssaarnaajiin. **1851** Britannia
  puuttui Lagosin asioihin (Bombardment of Lagos / Capture of Lagos):
  Akitoye asetettiin oban paikalle ja Kosoko syrjäytettiin. Akitoye
  allekirjoitti orjuuden kieltävän sopimuksen, ja **1852**
  allekirjoitettu sopimus aloitti konsuliajan, jolloin Britannia antoi
  Lagosille sotilaallisen suojan.
- Kuninkaallinen laivasto oli käyttänyt tukikohtanaan Espanjan
  Fernando Poʼn satamaa; kun Espanja otti sataman itselleen **1855**,
  laivasto tarvitsi uuden tukikohdan, ja Lagos oli houkuttelevin.

## 4. Luovutussopimus 1861 ja siirtomaa

- Pääministeri **Palmerston** kirjasi 1861, ettei Lagosin muodollisen
  protektoraatin ottamisessa kannata hukata aikaa. Virkaa tekevä
  konsuli **William McCoskry** ja komentaja **Bedingfield** kutsuivat
  oba **Dosunmun** koolle **30.7.1861** HMS Prometheuksen kannelle.
  Dosunmu vastusti ehtoja, mutta Bedingfieldin uhattua pommittaa
  Lagosin hän allekirjoitti **Lagosin luovutussopimuksen 6.8.1861**.
- Lagos julistettiin siirtomaaksi **5.3.1862**, mutta sitä hallittiin
  **Kultarannikolta**. Omaksi siirtomaakseen Kultarannikosta erilleen
  se tuli **1886** kuvernööri **Cornelius Alfred Moloneyn** aikana.
- Lagosista tuli nopeasti maahanmuuton kohde. Nigerian ja muiden
  Länsi-Afrikan maiden muuttajien lisäksi tulivat paluumuuttajat:
  **Saro** Freetownista, Sierra Leonesta, sekä **Aguda/Amaro**
  Brasiliasta ja Kuubasta. Heidän portugalilaisen arkkitehtuurin
  tuntemuksensa näkyy yhä Lagosin saaren rakennuksissa.
- **1869** perustettiin Kristuksen katedraali (Cathedral Church of
  Christ). Viisi vuotta aiemmin, **1864**, **Samuel Ajayi Crowther**
  oli tullut anglikaanisen kirkon ensimmäiseksi afrikkalaiseksi
  piispaksi.
- **1906** Lagos liitettiin Etelä-Nigerian protektoraattiin ja siitä
  tuli sen pääkaupunki. **1.1.1914** Pohjois- ja Etelä-Nigeria
  yhdistettiin, ja Lagos oli pääkaupunki. Pääkaupunki siirtyi
  **Abujaan virallisesti 12.12.1991** (päätös oli tehty jo 1976).

## 5. Saro ja Aguda

- Saro (jorubaksi *sàró*, lyhentymä sanasta Sierra Leone) olivat
  afrikkalaisia, jotka oli vapautettu ja asutettu Freetowniin
  kuninkaallisen laivaston toimesta sen jälkeen kun Britannian
  parlamentti oli säätänyt vuoden 1807 orjakauppalain. Heitä alkoi
  muuttaa Nigeriaan **1830-luvulta** alkaen, useiden sukupolvien
  aikana.
- **Aguda** (jorubaksi *àgùdà*) olivat Brasiliasta palanneita,
  **Amaro** yleisemmin Latinalaisesta Amerikasta palanneita.
- Sierra Leonessa monet olivat saaneet länsimaisen koulutuksen —
  Fourah Bay College — ja työskennelleet lääkäreinä, juristeina ja
  virkamiehinä. Lagosissa saro asettuivat **Ebute Mettaan,
  Olowogbowoon ja Yabaan**, perustivat kaupungin vanhimpia kirkkoja ja
  nousivat johtavaksi kauppiasryhmäksi. He toivat kolapähkinän
  eteläisen Nigerian viljelyyn: ensimmäinen kolaviljelmä ja alan
  hallitseva kauppahuone olivat molemmat saro-omistuksessa.
- **Mohammed Shitta Bey** oli saro, jonka vanhemmat olivat Sierra
  Leonessa syntyneitä jorubataustaisia. Hän rahoitti **Shitta-Beyn
  moskeijan**: rakentaminen alkoi 1891, moskeija perustettiin 1892 ja
  vihittiin **4.7.1894**. Rakennustyötä valvoi brasilialainen
  arkkitehti **João Baptista da Costa**, ja laattatyö on
  afrobrasilialaista tyyliä. Vihkiäisissä oli läsnä Lagosin kuvernööri
  Sir Gilbert Carter, oba Oyekan I, Edward Wilmot Blyden ja Abdullah
  Quilliam, joka edusti sulttaani Abdul Hamid II:ta. Samassa
  tilaisuudessa Mohammed Shitta sai sulttaanilta **Bey**-arvonimen ja
  Medjidie-ritarikunnan kolmannen luokan, siviilin korkeimman.
  Moskeija on Etelä-Nigerian vanhimpia ja Nigerian ensimmäinen
  kansainvälisesti tunnustettu; kansallismonumentti vuodesta 2013.

## 6. Eyo — Adamu Orisha Play

- Eyo on jorubalainen juhla, joka on **ainutlaatuinen Lagosille**.
  Sillä on vahva historiallinen tausta Iperu-Remossa Ogunin osavaltiossa.
- Sana Eyo tarkoittaa myös naamiohahmoja, jotka kulkevat juhlassa.
  Perinne on peräisin Lagosin salaseurojen sisältä. Juhla järjestettiin
  saattamaan edesmenneen kuninkaan tai päällikön sielua ja
  toivottamaan uusi kuningas tervetulleeksi.
- Eyo-päivänä kaupungin pääväylä **Carterin sillan päästä Tinubun
  aukiolle** suljetaan liikenteeltä, ja kulkue kulkee **Idumotasta
  Iga Idunganranin palatsille**. Valkopukuiset Eyo-hahmot edustavat
  vainajien henkiä, ja niistä käytetään jorubaksi nimeä **agogoro
  Eyo**, pitkä Eyo.
- Ensimmäinen kulkue Lagosissa oli **20.2.1854** oba Akitoyen elämän
  muistoksi.
- Viisi ryhmää tunnistaa hatun väristä: **Adimu** (musta,
  leveälierinen — pääjuhlija), **Laba** (punainen), **Oniko**
  (keltainen), **Ologede** (vihreä), **Agere** (violetti). Viikkoa
  ennen juhlaa, aina sunnuntaina, vanhin ryhmä Adimu tulee julkisuuteen
  sauvan kanssa; se tarkoittaa, että juhla on seuraavana lauantaina.
  Neljä muuta ryhmää tulevat vuorollaan maanantaista torstaihin.
- Kiellettyä juhlassa: okada-moottoripyörätaksit, polkupyörät,
  sandaalit, **suku**-hiuslaite, tupakointi, naisilla huivi tai muu
  pään peite, miehillä minkäänlainen lakki sekä Eyo-asun pitäminen yön
  yli tai sen kanssa joen tai laguunin ylittäminen. Naamiohahmot ovat
  tunnettuja siitä, että ne lyövät sauvallaan sitä, joka käyttää
  kiellettyä esinettä.

## 7. Laguuni, saaret ja sillat

- Lagos jaetaan karkeasti kahteen alueeseen: **saareen** ja
  **mantereeseen**. Saari on joukko saaria, jotka erottaa toisistaan
  salmet ja yhdistää sillat; se erottuu mantereesta laguunia Atlantille
  laskevasta pääväylästä, joka muodostaa **Lagosin sataman**.
- Kolme suurta siltaa yhdistää saaren mantereeseen: **Carterin silta**
  (Iddosta), **Ekon silta** (aiemmin Second Mainland Bridge) ja
  **kolmas mannersilta**. Lekki–Ikoyi-linkkisilta on Nigerian
  ensimmäinen vinoköysisilta.
- **Ensimmäinen silta** Lagosin saaren ja mantereen välille rakennettiin
  **1901**: Carterin silta, nimetty kuvernöörin mukaan, joka oli virassa
  1891–1898.
- **Kolmas mannersilta** on noin **11,8 km** pitkä ja oli **Afrikan
  pisin silta vuoteen 1996**, jolloin Kairon 6. lokakuun silta
  valmistui. Sen rakensi Julius Berger Nigeria PLC; ensimmäisen vaiheen
  vihki presidentti Shehu Shagari **1980** ja kokonaisuuden viimeisteli
  presidentti Ibrahim Babangida **1990**. Kahdeksankaistainen silta
  alkaa Oworonshokista ja päättyy Adeniji Adelen liittymään Lagosin
  saarella. Sillalta avautuu näkymä laguunille, Lagosin yliopiston
  rantaan, kansallisteatterille ja Makokoon.
- **Makoko:** epävirallinen asuinalue mantereen rannalla kolmannen
  mannersillan kohdalla. **Kolmasosa yhteisöstä on rakennettu paalujen
  varaan** laguuniin, loput maalle. Vesirajan asukkaat ovat pääosin
  **egun**-kansaa, joka muutti Badagrysta ja Beninin tasavallasta;
  pääelinkeino on kalastus. Makoko koostuu kuudesta kylästä, joista
  neljä on kelluvia (**Adogbo, Migbewhe, Oko Agbon, Yanshiwhe**) ja
  kaksi maalla (**Apollo, Sogunro**). Osavaltio kutsuu aluetta nimellä
  Makoko-Iwaya Waterfront. Aluetta kutsutaan joskus **"Afrikan
  Venetsiaksi"**. Nimi tulee jorubasta ja tarkoittaa "poimi akoko":
  akoko-lehtiä käytetään hedelmällisyyden apuna ja päällikön
  kruunajaisissa, ja niitä kasvoi alueella runsaasti. Yhteisö
  perustettiin 1700–1800-luvulla. Asukasluvuksi arvioidaan 85 840,
  mutta aluetta ei laskettu vuoden 2007 väestönlaskennassa.
- **Danfo:** keltaiset pikkubussit, joissa on tavallisesti **14–18
  matkustajapaikkaa**. Ne yleistyivät **1970-luvulla**, kun julkinen
  liikenne heikkeni; varhaiset autot olivat matkustajakäyttöön
  muutettuja Volkswagen Type 2 -pakettiautoja. Nimen uskotaan tulevan
  joruban sanasta, joka tarkoittaa kiirettä. Kuljettajan lisäksi
  mukana on rahastaja, joka kerää maksut matkan aikana. Bussit
  liikennöivät päätekohteiden eli *parkkien* välillä mutta ottavat
  ja jättävät matkustajia joustavasti.
- **Lekki Conservation Centre** on käytännössä Lagosin eläintarha:
  aidattu kasvillisuuskaistale, jossa jäljitellään sademetsää,
  mangrovea ja savannia. Siellä on apinoita, lintuja, käärmeitä ja
  krokotiileja sekä pieni museo. LUFASI Nature Park (Lekki Urban
  Forestry and Animal Shelter Initiative) suojelee luontoa ja uhanalaisia
  lajeja; Nollywoodin kuvausryhmät käyttävät puistoa usein kuvauspaikkana.
- Rannat: Tarkwa Bay, Elegushi Beach ja Alpha Beach. Victoria Islandin
  merenrannalla on ympäristöllisesti uudelleenrakennettu **Bar Beach**.
  **Eko Atlantic** on rakenteilla oleva hanke laguunin suulla, joka
  laajentaa Victoria Islandia.
- Ikoyi on liitetty Lagosin saareen **täyttömaalla** ja yhdistetty
  Victoria Islandiin Falomon sillalla Five Cowrie Creekin yli. Osa
  salmista on ruopattu ja rakennettu umpeen.

## 8. Ruoka, elokuva ja musiikki

- Lagosin tunnettuja ruokia: **eba ja egusi; amala ja ewedu;** jollof
  (juhlaruoka); **ofada-riisi**; **dodo** eli paistetut banaanit;
  pavut; suya; **asaro**, jota syödään monenlaisten vihannesten kanssa;
  iyán. (Egusi, jollof, suya ja iyán ovat maalehden aiheita — tämä
  lehti käyttää amalaa, eweduta, ofadaa, dodoa ja asaroa.)
- **Amala** on jorubalainen "swallow"-ruoka, joka tehdään jamssijauhosta
  (*elubo*) tai kassavasta; tumma väri syntyy kuivatusta jamssista.
  Tarjotaan ewedu- ja gbegiri-keiton kanssa.
- **Agege-leipä** on nimetty Lagosin Agegen kaupunginosan mukaan, ja se
  on pehmeä, makea, tiivis vaalea leipä.
- **Nollywood** on sanaleikki sanoista Nigeria ja Hollywood. Termi
  jäljitetään **vuoden 2002 New York Timesin artikkeliin** (Matt
  Steinglass; myös Norimitsu Onishi käytti nimeä syyskuussa 2002).
  Igbonkielinen **Living in Bondage (1992)** käynnisti nykyisen
  Nollywood-kauden. Jorubankielinen elokuva alkoi jo **1960-luvun
  puolivälissä** kiertävistä teatteriryhmistä; **Ajani Ogun (1976)**
  ja **Mosebolatan (1985)**, joka tuotti 107 000 nairaa viidessä
  päivässä, olivat käännekohtia. **Surulere** on Nigerian
  elokuvateollisuuden keskus.
- Lagos on synnyttänyt tyylejä: sakara, nigerialainen hiphop,
  highlife, jùjú, **fuji** ja afrobeats. Paul McCartney levytti
  yhtyeineen albuminsa **Band on the Run** EMI:n studiossa Lagosissa
  **elo–syyskuussa 1973** — sata vuotta isoisän matkan jälkeen.
  James Brown esiintyi Lagosissa 1970.
- Juhlat: Lagos Carnival tammikuussa, Eko International Film Festival
  maaliskuussa, Lagos Black Heritage Carnival huhtikuussa, Lagos Photo
  Festival marraskuussa, Book & Art Festival marraskuussa ja Lagos
  Food Festival joulukuussa.

## 9. Ilmasto

- Trooppinen savanni-ilmasto (Aw): kolmena kuukautena sadetta alle
  60 mm. Sadekausi **toukokuusta lokakuuhun**, kuiva kausi
  **marraskuusta huhtikuuhun**, lisäksi lyhyt kuiva jakso
  **heinä–elokuussa**.
- Sateisin kuukausi **kesäkuu, 316 mm**; kuivin **tammikuu, 13 mm**.
- Keskimääräiset ylimmät lämpötilat **28–32 °C**. Kuumin maaliskuu
  (vuorokausivaihtelu 26–32 °C), viilein elokuu (24–28 °C).
- Merenpinnan nousu: Lagos on yksi kahdestatoista Afrikan
  suurkaupungista, joihin nousu vaikuttaisi voimakkaimmin; maan
  painuminen (subsidenssi) voimistaa vaikutusta.

## 10. Kohdekartan kahdeksan kohdetta (ehdotus)

Koordinaatit en-Wikipedian geosearchista 7.9.2026. **Yksikään ei ole
lehden noston aihe.** Iga Idunganran (nosto L1), Shitta-Beyn moskeija
(nosto L4), Carterin silta ja kolmas mannersilta (teemasivu), Makoko
(teemasivu) ja Idumotan tori (valokuvataulu) on siksi jätetty pois.

| # | Kohde | lat | lon |
| --- | --- | --- | --- |
| 1 | Lagosin keskusmoskeija | 6.457222 | 3.388056 |
| 2 | Tinubun aukio | 6.4538 | 3.3894 |
| 3 | Kristuksen katedraali | 6.4508 | 3.3902 |
| 4 | Ajelen hautausmaa | 6.4515 | 3.3942 |
| 5 | Vapauden puisto | 6.4489 | 3.3965 |
| 6 | King's College | 6.44961 | 3.39905 |
| 7 | Tafawa Balewan aukio | 6.447222 | 3.401389 |
| 8 | Nigerian kansallismuseo | 6.444444 | 3.403333 |

Pienin väli on **293 metriä** (Vapauden puisto – King's College);
kaikki 28 väliä laskettu haversinilla. Holy Cross -katedraali (112 m
Vapauden puistosta), John Randle -keskus (145 m kansallismuseosta),
Bookshop House (163 m katedraalista) ja Ilojo Bar (63 m Tinubun
aukiosta) pudotettiin 200 metrin säännöllä.

**Kohteiden ydinfaktat**

1. **Lagosin keskusmoskeija.** Jum'at-moskeija Nnamdi Azikiwe
   Streetillä, Lagosin ylimmän imaamin päämaja. Ensimmäisen
   keskusmoskeijan kehitti Lagosin Jamat Muslim Council, joka perusti
   moskeijan johtokunnan noin 1905; rakennus valmistui heinäkuussa
   1913 ja palveli 70 vuotta. Uusi rakennus avattiin **28.5.1988**.
   Neljä minareettia (kaksi pientä sisäänkäynnin päällä, kaksi
   korkeaa siivissä), noin acren pohja-ala, 750 neliömetrin
   rukoushuone ja 15 metriä halkaisijaltaan oleva metallikupoli,
   jonka kullattu alumiinivaippa erottuu ulos.
2. **Tinubun aukio.** Broad Streetillä, nimetty **Efunroye Tinubun**
   mukaan — jorubalainen orjakauppias, kauppias ja aristokraatti.
   Aiemmin Ita Tinubu, sitten ensimmäisen tasavallan aikana
   Independence Square. Historioitsijan mukaan paikalla oli
   ensimmäinen tuomioistuin, joka korvattiin 1918 korkeimmalla
   oikeudella. Aukio oli eri kulttuurien kohtaamispaikka:
   syntyperäiset lagosilaiset, brasilialaistaustaiset ja
   siirtomaahallinto. Rautainen aita, kaksi suihkulähdettä ja
   luonnollisen kokoinen Tinubun patsas kenotafilla. Remontoitiin
   viimeksi 2017.
3. **Kristuksen katedraali (Cathedral Church of Christ Marina).**
   Ensimmäisen kirkkorakennuksen peruskivi laskettiin **29.3.1867** ja
   katedraali perustettiin **1869**. Nykyisen rakennuksen työ alkoi
   arkkitehti Bagan Benjaminin piirustusten mukaan **1.11.1924**,
   peruskiven laski Walesin prinssi 21.4.1925, ja rakennus valmistui
   **1946**. **1976** siirrettiin tänne **Samuel Ajayi Crowtherin**
   jäännökset; hänelle on pystytetty kenotafi. Nigerian kirkon vanhin
   anglikaaninen katedraali. Urut rakensi saksalainen Oberlinger
   Orgelbau ja uusi englantilainen Harrison & Harrison: 64 äänikertaa,
   neljä sormiota ja jalkio — Nigerian suurimmat urut.
4. **Ajelen hautausmaa.** Lagosin saaren suuri hautausmaa, jonka
   Lagosin osavaltion sotilashallinto purki **joulukuussa 1971**
   tehdäkseen tilaa osavaltion virastotalolle. *Ajele* tarkoittaa
   jorubaksi hallinnon virkamiestä, ja nimi tuli sinne haudatuista
   brittiläisistä siirtomaavirkamiehistä. Purkua arvosteltiin
   laajalti: professori J. D. Y. Peel sanoi sen vieneen lagosilaisilta
   sekä arvokkaan viheralueen keskeltä kaupunkia että esivanhempien
   muistomerkit, ja Wole Soyinka kutsui purkua "esi-isien paikan
   loukkaamiseksi". Haudattuja olivat mm. James Pinson Labulo Davies,
   Samuel Ajayi Crowther, konsuli Benjamin Campbell ja Thomas
   Babington Macaulay.
5. **Vapauden puisto (Freedom Park).** Entinen **Her Majesty's Broad
   Street Prison**. Vankila perustettiin sen jälkeen kun Britannia
   teki Lagosista siirtomaan 1861; ensimmäinen rakennus tehtiin
   **1882** savimuureista ja ruohokatosta, mutta se ei kestänyt, koska
   siirtomaahallinnon vastustajat sytyttivät sen toistuvasti
   tuleen — **1885** hallinto toi tiilet Englannista ja rakensi
   vankilan uudelleen. Vankila maksoi 1882 noin **16 000 puntaa**,
   kun koulutukseen käytettiin samana vuonna **700 puntaa**. Vuoden
   1898 siirtomaaraportin mukaan vankilassa oli sinä vuonna 676
   miestä, 26 naista ja 11 nuorta. Vankila purettiin **1979**.
   Arkkitehti **Theo Lawson** suunnitteli puiston 1999, ja se avattiin
   itsenäisyyden 50-vuotisjuhlaan **lokakuussa 2010**. Vankilassa oli
   istunut itsenäisyyden puolesta toimineita, mm. Herbert Macaulay.
   Nigerian ensimmäinen skeittipuisto avattiin puistoon maaliskuussa
   2024.
6. **King's College, Lagos.** Perustettiin **20.9.1909** kymmenellä
   oppilaalla Lagosin saarelle, Tafawa Balewan aukion viereen. Taustalla
   oli **Henry Rawlingson Carrin** 1908 kuvernööri Walter Egertonille
   esittämä koulutussuunnitelma; oba **Esugbayi** luovutti maan.
   Rakennus ja kalustus maksoivat 10 001 puntaa. Tarkoitus oli antaa
   siirtomaan nuorille korkeampaa yleissivistystä kuin olemassa olevat
   koulut ja valmistaa heitä Lontoon yliopiston pääsykokeeseen.
   Oppilaita oli 1910 keskimäärin 16, vuonna 1914 jo 67. Nykyään yksi
   Nigerian 104 unity school -koulusta.
7. **Tafawa Balewan aukio.** Alun perin **Lagos Race Course**,
   kilparata, jolla oli myös jalkapallo- ja krikettikenttä. Maan
   luovutti siirtomaahallinnolle **oba Dosunmu 1859**. Rata oli noin
   seitsemän–kahdeksan furlongia eli mailin mittainen ja isännöi
   Empire Day -paraateja. **1960** alue rakennettiin uudelleen
   itsenäisyysjuhlaa varten, ja **1.10.1960** pääministeri Tafawa
   Balewa piti siellä puheensa unionin lipun laskiessa. Nykyinen aukio
   rakennettiin **1972**. Portin päällä on neljä valkoista hevosta ja
   seitsemän punaista kotkaa, jotka ovat kansallisvaakunan tunnuksia
   ja merkitsevät voimaa ja arvokkuutta. Alueella on myös
   Remembrance Arcade ja **1963 valmistunut 26-kerroksinen
   Independence House**, joka oli pitkään Nigerian korkein rakennus.
   Aukion krikettikenttä on Nigerian kriketin perinteinen koti;
   betonipinta vaihdettiin kymmenen kaistaleen nurmeen ja työ
   valmistui tammikuussa 2022.
8. **Nigerian kansallismuseo.** Onikanissa, Lagosin saarella.
   Ensimmäiset arkkitehtiluonnokset esitettiin heinäkuussa 1948
   museopolitiikan konferenssissa; museon perusti **1957** englantilainen
   arkeologi **Kenneth Murray**, joka oli koonnut naamioita Cross
   Riverin osavaltiosta. Kokoelman koko on arviolta **47 000
   esinettä**. Tunnetuin on **Jemaan pää**, Nok-kulttuurin terrakottapää
   noin vuosilta 900–200 eaa. Kokoelmissa on naamioita, tekstiilejä,
   rumpuja, puuveistoksia, ennustusmaljoja, Mumuye- ja Ikenga-hahmoja,
   Ekpo- ja Gelede-naamioita sekä akwete-kangasta. Museo avattiin
   uudelleen huhtikuussa 2026 laajan peruskorjauksen jälkeen
   (rakenteet, sähköt, esineiden digitointi).

## 11. Minitehtäväehdotus

Tehtävä sijoitetaan **teemasivulle** (kuten Nairobissa ja Miamissa), ja
vastaus löytyy saman sivun noston tekstistä. Kysymys ei osu kaupungin
viiteen visakysymykseen (Nigeria, Guineanlahti, Nollywood, englanti,
nimen alkuperä) eikä kulttuurivisaan (afrobeat / Fela Kuti).

> **Mistä Makoko sai nimensä?**
> a) laguunin kalasta · b) akoko-lehdistä, joita alueella kasvoi
> runsaasti (oikea) · c) ensimmäisestä kalastajasta ·
> d) portugalilaisesta kauppiaasta
>
> Fakta: nimi on jorubaa ja tarkoittaa kirjaimellisesti "poimi
> akoko". Akoko-lehtiä käytetään hedelmällisyyden apuna ja päällikön
> kruunajaisissa.
