# Euroopan 9 laudan kaupungin tarinakaaret: luonnokset (Sisältökirjuri 11.10.2026, tarkistettu 12.10.2026)

PT:n tilaus 11.10. klo 21.2x: Äänittäjän inventaarion (`aanet-eurooppa-inventaario-20261011.md` kohdat 1–2) laudan kaupungit Bryssel, Kassa, Ljubljana, Luxemburg, Valletta (saapumisluenta + kaaret + fokus) sekä Bergen, Firenze, Sevilla, Tampere (saapumisluenta + kaaret). **Vain luonnokset; ääntä ei ole generoitu eikä tekstejä viety dataan.** Tekstit on kirjoitettu `docs/moduulit/tarinakaari.md`:n mukaan, kaanon `docs/tarina.md` + `docs/isoisan-raamattu.md`, ja faktat on tarkistettu (liite: `kaaret-eurooppa-faktat-20261011.md`; kolme Sonnet-tarkistajaa, korjaukset tehty).

## 1. Onko teksti jo datassa? (tarkistus ennen kirjoitusta)

| Kaupunki | Saapumismerkintä (fokusvirta `matkakirja`) | Fokus-luenta (`puhe-fokus-matkakirja-<id>`) | Aarremerkintä (`aarremerkinta`) | Kohtaamishahmo (fokusvirta `kohtaaminen`) | **Kaari** (`KAARI_PAKETIT`: saapuminen, kohtaaminen, kysymys, aarre) |
|---|---|---|---|---|---|
| Bryssel | on (teksti + luenta-kenttä) | **äänite puuttuu** | on | Kivenveistäjä Aline | **puuttuu** |
| Kassa | on | **äänite puuttuu** | on | Lennätinvirkailija Zuzana | **puuttuu** |
| Ljubljana | on | **äänite puuttuu** | on | Kukkakauppias Vesna | **puuttuu** |
| Luxemburg | on | **äänite puuttuu** | on | Kivenhakkaaja Nic | **puuttuu** |
| Valletta | on | **äänite puuttuu** | on | Teatterin lipunmyyjä Rita | **puuttuu** |
| Bergen | on | äänite on | on | Kalanvrakari Solveig | **puuttuu** |
| Firenze | on | äänite on | on | Kultaseppä Ginevra | **puuttuu** |
| Sevilla | on | äänite on | on | Jokiluotsi Amparo | **puuttuu** |
| Tampere | on | äänite on | on | Koneenhoitaja Vieno | **puuttuu** |

**Löydöksiä:**

1. **Saapumisluenta `puhe-europe-saapuminen-<id>` on poistunut käytöstä.** Euroopan vanha saapumistaulu arkistoitiin 8.9.2026 (omistaja: koko Eurooppa kulkee fokusvirtapakkien kautta; `js/sisaltotaulut.js` SAAPUMISLUENNAT, arkistoitu `docs/arkisto/europe-saapumiset-2026-09-08.js.txt`); Euroopan saapumismerkintä luetaan fokusvirran `matkakirja.aanite`-kentästä. Inventaarion sarake "luenta" ei siis ole generoitava. Se, mikä oikeasti puuttuu, on (a) viiden uuden kaupungin fokus-luenta (teksti on jo datassa, äänite puuttuu, `generoi-luennat.mjs`) ja (b) kaaren kolme luentaa kaikille yhdeksälle.
2. **Kaaren `saapuminen` on varjossa:** pelissä sitä käytetään vain varapolkuna, kun fokusmoodi on pois (`js/packs/tarinakaari.js`, `js/ui.js`). Siksi saapuminen kirjoitettiin eri 1873-hetkestä kuin fokusvirran merkintä ja aarremerkintä; `saapuminen`-luentaa kannattaa generoida vasta, jos varapolku halutaan äänelliseksi (säästö 9 luentaa).
3. **Aarremerkintä** (Meripihkahuoneen etsintä, #4410) ei ole kaaren `aarre`: kaaren `aarre` on paikallinen kätkö ja vartijan viimeinen repliikki. Luonnokset eivät toista aarremerkinnän paikkoja eivätkä ole ristiriidassa niiden kanssa.
4. Kaaren henkilöt ovat samat kuin fokusvirran kohtaamishahmot (kuten kaikissa 41:ssä valmiissa); kaaren kohtaaminen jatkaa fokusvirran kohtaamiskuvausten yksityiskohtia (Alinen oma reliefi, Zuzanan lennätin, Ginevran nimetön rivi vieraalla käsialalla, Solveigin vieras rivi, Amparon syvyyskirja, Vienon solmu ja piiput).

## 2. Kirjanpito (laudan tarkistuslista, 9 kaupunkia)

| Kaupunki | Sävel | Vartijan ääni | Odotuksen syy | Aarteen loppubeat | Aisti |
|---|---|---|---|---|---|
| Bryssel | ihmetys + huumori | puhelias | oma pieni teko | vartijan oma salaisuus | märän kiven kellarinhaju |
| Kassa | haikeus + arvoitus | äreä (kuiva, nopea) | pantti | tuore jälki | kuuma metalli, asemahalli |
| Ljubljana | lämpö | lämmin | vieraanvaraisuuden vastalahja | ajaton arvoitus | kukkien tuoksu |
| Luxemburg | jännitys (kommellus) + haikeus | hämmästyvä | keskeneräinen työ | vanha jälki | kalkkipöly |
| Valletta | hengähdys | kuiva huumori | vieraanvaraisuuden vastalahja | hiljainen loppu | kalkkikivi ja meren suola |
| Bergen | huumori + jännitys | äreä | oma pieni teko | tuore jälki | kuivattu kala |
| Firenze | arvoitus + huumori | epäuskoinen | kesken jäänyt kauppa | toinen esine jossain muualla | kuumennettu kulta |
| Sevilla | ihmetys + arvoitus | ylpeä, tyyni | keskeneräinen työ | tuore jälki | appelsiininkukka |
| Tampere | huumori | epäuskoinen | opetettu taito | hiljainen loppu | koski ja konepelti |

- **Beat-kiintiö:** tuore jälki 3/9 (Kassa, Bergen, Sevilla; ≤ puolet ✓); vanha jälki 1 (Luxemburg), hiljainen loppu 2 (Valletta, Tampere), muut kukin 1; **ei samaa beatia naapureilla** (luettelojärjestys Bryssel→Tampere) ✓.
- **Odotuksen syy ≤ 2:** oma pieni teko 2, vastalahja 2, keskeneräinen työ 2, pantti / kesken jäänyt kauppa / opetettu taito 1 ✓. Kukaan ei "maksa" eikä tilaa vuosisataa; Horatio on köyhä (pantti: kellon avain; tilaus maksettu puoliksi).
- **Ääniprofiilit:** puhelias (Aline), äreä (Zuzana, Solveig), epäuskoinen (Ginevra, Vieno), hämmästyvä (Nic), lämmin (Vesna), kuiva huumori (Rita), ylpeä tyyni (Amparo) ✓.
- **Sävelet:** lämpö (Ljubljana), hengähdys (Valletta), huumori (Bryssel, Bergen, Firenze, Tampere), arvoitus/ihmetys, haikeus (Kassa, Luxemburg), jännitys vain Luxemburgissa (kaatuva muuri = kommellus). Itseironia täsmälleen kerran: Firenze (tinkimisessä hävinnyt Horatio). Kommellus: Luxemburgin kaatuva muuri, Kassan pantiksi jäänyt avain.
- **Ei budjettimotiiveja:** ei barometrilukemaa (budjetti 4 täynnä), ei liituristiä, sähkettä, sateenvarjoa, herra G:tä eikä Phileasia. Hevospelko ei esiinny. Tuntematon kulkija (Euroopan mysteeri) näkyy vain havaintoina (Kassan öljytty lukko, Bergenin tuore rivi, Sevillan aamun lukema), ei nimettynä eikä aavemaisena.
- **Kunnioitus:** piikit osuvat Horatioon (tinkijä, mittausvirhe, pantti), ei paikallisiin; ei sotasisältöä; ei pyhiä paikkoja.
- **Pituudet (merkkejä):** saapuminen 290–332 (tavoite 280–350), kohtaaminen 184–252 (≤ 260), aarre 164–218 (≤ 220), kohde yhteensä ≤ 744 (≤ 800 ✓).
- **Kysymykset:** oikean vaihtoehdon paikat vaihtelevat (B, C, C, B, D, D, C, B, B), oikea ei ole yhdessäkään yksiselitteisesti pisin; väärät eivät ole puolitotuuksia (tarkistettu). Fakta-kentät ≤ 3 virkettä.
- **1873-ankkurit tositapahtumista:** Brysselin pörssitalo vihitään 27.12.1873 (julkisivutyö kesken kesällä), Kassan lennätin ja uusi rata, Luxemburgin linnoituksen purku (1867–1883), Vallettan oopperatalon palo 25.5.1873 (talo kiinni 1877 asti), Firenze entisenä pääkaupunkina (1865–1871).

## 3. Luonnokset

### 1. Bryssel — `bryssel`

**Otsikko:** Bryssel — kivi, jonka paino oli kirjattu  
**Henkilö:** Kivenveistäjä Aline huoltaa pörssitalon julkisivun koristeita telineillä ja tuntee jokaisen kiven painon.

**Saapuminen** (324 merkkiä):  
Pörssitalon julkisivua hakataan sateessakin, koska talon pitää valmistua jouluksi. Märästä kivestä nousi kellarin haju. Yksi veistäjistä sanoi nimensä ranskaksi niin nopeasti, että kirjaan mahtui vain R. Hän ojensi minulle sirun koristeesta. Punnitsin sen: neljäsataa grammaa. Palautin sirun, sillä seinästä ei oteta mitään.

**Kohtaaminen** (252):  
Aline hakkaa telineillä ja puhuu hakkaamisen tahdissa. Kun näytät kirjan merkin, hän laskee taltan. "Työmaan vanhassa kirjassa on rivi: vuonna 1873 vieras herra punnitsi sirun ja toi sen takaisin. Harvinaista! Vastaa, niin näytän, minne se laitettiin."

**Kysymys:** Kuka myöhemmin maailmankuuluksi tullut ranskalainen taiteilija veisti 1870-luvun alussa koristeita Brysselin pörssitaloon?  
- A) Edgar Degas
- B) Auguste Rodin ✓
- C) Claude Monet
- D) Pierre-Auguste Renoir  
*Fakta:* Auguste Rodin asui Brysselissä 1871–1877 ja teki muun muassa pörssitalon koristeveistoksia; maailmankuuluksi hän tuli vasta myöhemmin. Pörssitalo vihittiin käyttöön 27. joulukuuta 1873.

**Aarre** (192, beat: vartijan oma salaisuus):  
Siru oli kääritty nenäliinaan ja piilotettu reliefin takaiseen rakoon. Aline vei kätensä sinne ja hiljeni. "Tämän raon veistin itse, eikä kukaan tiedä siitä." Nenäliina oli vanhempi kuin rako.

### 2. Kassa — `kosice`

**Otsikko:** Kassa — avain, jonka pantti jäi  
**Henkilö:** Lennätinvirkailija Zuzana pitää asemansa pöytäkirjaa, johon on kirjattu kaikki lunastamatta jäänyt.

**Saapuminen** (290 merkkiä):  
Sähke Wieniin kulki minuutissa, mutta sen hinta ei mahtunut taskuuni. Jätin lennätinvirkailijalle pantiksi kellon avaimen ja lupasin palata. Hän kirjasi avaimen pöytäkirjaan kuin se olisi arvopaperi, ja leimasi sivun. Kello kulkee nyt avaimetta, ja minä sen mukana: aika on ostettu velaksi.

**Kohtaaminen** (234):  
Zuzana ei nosta katsettaan avaimesta. Kun kysyt kätköstä, hän kaivaa pöytäkirjan esiin tuhahtaen. "Rivillä lukee: avain, pantiksi, 1873, lunastamatta. Meillä ei heitetä pois mitään, mitä ei ole lunastettu. Ensin yksi kysymys. Vastaa."

**Kysymys:** Zuzanan pöytäkirjan leimassa on Kassan vaakuna. Mistä se on Euroopassa kuuluisa?  
- A) Ensimmäinen vaakuna, johon on kuvattu lohikäärme
- B) Euroopan ainoa vaakuna, jossa on kaksi kruunua
- C) Euroopan vanhin säilynyt kaupungin vaakunakirja ✓
- D) Vaakuna, jonka paavi suunnitteli itse  
*Fakta:* Kuningas Ludvig I Suuri myönsi Kassalle vaakunan 1369. Vaakunakirja on Euroopan vanhin säilynyt kaupungille myönnetty, ja Kassaa sanotaan usein ensimmäiseksi. Isoisäsi aikaan Kassa kuului Unkarin kuningaskuntaan; nykyään se on Slovakian toiseksi suurin kaupunki.

**Aarre** (164, beat: tuore jälki):  
Avain oli kaapin pohjalla pöytäkirjan alla, messinki puhtaana ja kiiltävänä. "Tätä kaappia ei ole avattu vuosiin", Zuzana sanoi ja katsoi lukkoa. Lukko oli öljytty.

### 3. Ljubljana — `ljubljana`

**Otsikko:** Ljubljana — kimppu ja kartta  
**Henkilö:** Kukkakauppias Vesna sitoo kimppuja Keskustorilla Ljubljanica-joen rannalla ja tuntee jokaisen kukan nimen kahdella kielellä.

**Saapuminen** (294 merkkiä):  
Torilla kukkakauppias sanoi kukkien nimet kahdella kielellä, ja minä ymmärsin toisen. Ostin kimpun, jonka nimeä en osannut lausua. Vastalahjaksi piirsin hänelle kartan joen mutkista, sillä jokaisella on oikeus tietää, minne joki ehtii. Hän katsoi karttaa ylösalaisin ja sanoi sen olevan kaunis.

**Kohtaaminen** (232):  
Vesna sitoo kimppua yhdellä kädellä ja osoittaa toisella siltaa. "Torin vanhassa kirjassa lukee, että vieras herra sai kimpun ja jätti vastalahjaksi kartan joen mutkista. Karttaa en ole nähnyt. Vastaa, niin kerron, mihin se joutui."

**Kysymys:** Ljubljanan tunnuksena on lohikäärme. Kuka legendan mukaan tappoi sen kaupungin suolla?  
- A) Beowulf ja hänen kaksitoista miestään
- B) Siegfried Reinin rannalla
- C) Jason ja hänen argonauttinsa ✓
- D) Tristan ja kuningas Marke  
*Fakta:* Legendan mukaan Jason ja argonautit tappoivat lohikäärmeen Ljubljanican lähteillä suolla. Siitä lohikäärme on jäänyt kaupungin tunnukseksi: se on vaakunassa linnan tornin päällä ja Lohikäärmesillan kulmilla.

**Aarre** (188, beat: ajaton arvoitus):  
Kätkö oli ruukun pohjalla kuivuneen kimpun alla: kartta, joka oli piirretty yhdellä pitkällä viivalla. Vesna seurasi viivaa sormellaan. "Tämä ei ole joki. Joessa ei ole näin monta mutkaa."

### 4. Luxemburg — `luxemburg`

**Otsikko:** Luxemburg — kivi, joka jäi kesken  
**Henkilö:** Kivenhakkaaja Nic veistää puretun linnoituksen kivistä uusia paasia ja tuntee jokaisen kiven tarinan.

**Saapuminen** (332 merkkiä):  
Kallio kaikui vasaroista kuin jättimäinen kello. Muuri kaatui sekuntia ennen kuin ehdin ymmärtää huudon. Purkutyöläinen oli vetänyt minut sen taakse, ja pöly nousi kuin vaalea seinä. Kiitin saksaksi, hän vastasi paikallisella murteella, eikä kumpikaan ymmärtänyt toista. Nauroimme silti, koska kallio oli yhä pystyssä, ja minä myös.

**Kohtaaminen** (220):  
Nic pysäyttää talttansa ja katsoo kirjasi merkkiä kuin vanhaa tuttua. "Isoisoisäni jätti yhden kiven kesken, ja suvussa sitä on pidetty laiskuutena. Merkki on sinun kirjassasi! Vastaa, niin saan kiven vihdoin valmiiksi."

**Kysymys:** Luxemburgin kallioon rakennettu linnoitus oli aikanaan Euroopan vahvimpia. Millä lempinimellä sitä kutsuttiin?  
- A) Reinin Verdun
- B) Pohjolan Gibraltar ✓
- C) Idän Konstantinopoli
- D) Ardennien Malta  
*Fakta:* Luxemburgin linnoitusta kutsuttiin Pohjolan Gibraltariksi. Lontoon sopimus 1867 määräsi sen purettavaksi ja maan puolueettomaksi, ja purku kesti vuoteen 1883. Bockin kalliokasematit ovat nykyään osa Unescon maailmanperintöä.

**Aarre** (192, beat: vanha jälki):  
Nic käänsi kiven. Kyljessä oli isoisän merkki, mutta sen alla toinen, kulunut ja paljon vanhempi: joku oli veistänyt tähän ennen isoisääsi. "Hakkaajan tunnus", Nic mutisi. "Ei meidän sukumme."

### 5. Valletta — `valletta`

**Otsikko:** Valletta — talo ilman kattoa  
**Henkilö:** Teatterin lipunmyyjä Rita istuu lippukopissa oopperatalon raunioilla ja pitää kirjaa esityksistä, joita ei koskaan annettu.

**Saapuminen** (297 merkkiä):  
Oopperatalo oli palanut toukokuussa sisältä tyhjäksi, mutta lippuluukulla istui silti mies. Kysyin, mitä hän myy. Hän vastasi, ettei mitään, mutta ettei hänellä ole muutakaan paikkaa. Maksoin hänelle teen ja piirsin talon julkisivun, joka oli yhä pystyssä. Hän ripusti piirroksen luukkunsa taakse.

**Kohtaaminen** (223):  
Rita leikkaa lipun ihmiselle, joka ei sitä tarvitse. "Tapa on tapa." Hän osoittaa luukun takana riippuvaa piirrosta. "Vieras herra piirsi tämän teestä. Tee on juotu, piirros jäänyt. Vastaa, niin kerron, mitä sen takana on."

**Kysymys:** Vallettan kuninkaallisen oopperatalon raunioille on rakennettu uusi teatteri. Millainen se on?  
- A) Tarkka kopio palaneesta talosta
- B) Lasikupolin alla toimiva elokuvateatteri
- C) Maanalainen konserttisali
- D) Katoton, taivaan alla toimiva teatteri ✓  
*Fakta:* Oopperatalo avattiin 1866 ja paloi pahoin toukokuussa 1873, mutta se korjattiin ja avattiin uudelleen 1877. Sodan pommitukset tuhosivat sen 1942, ja jäännökset purettiin 1950-luvun lopulla. Raunioiden paikalle valmistui 2013 Renzo Pianon suunnittelema katoton ulkoilmateatteri.

**Aarre** (191, beat: hiljainen loppu):  
Lipukopin lattialaudan alta löytyi toinen piirros: palaneen oopperatalon julkisivu, vanha ja kulunut. Rita katsoi sitä pitkään. "Tästä puuttuu vain yleisö", hän sanoi ja pani laudan takaisin.

### 6. Bergen — `bergen`

**Otsikko:** Bergen — rivi väärässä sarakkeessa  
**Henkilö:** Kalanvrakari Solveig lajittelee kuivattua turskaa Bryggenin laiturilla ja pitää suvun lajittelukirjaa.

**Saapuminen** (322 merkkiä):  
Bryggenin lattialankut kitisivät jalkojeni alla kuin talo olisi kuunnellut askeleitani. Kuivattu kala haisi niin, että silmiin nousi vettä. Mestari antoi minulle esiliinan ja kysyi, osaanko erottaa hyvän kalan huonosta. Sanoin osaavani mitata sen. Hän sanoi, ettei se auta, ja antoi vihkon, johon sain kirjata yhden rivin.

**Kohtaaminen** (184):  
Solveig ei kehu eikä tervehdi. "Lajittelukirjassamme on 1800-luvulta rivi vierasta käsialaa, väärässä sarakkeessa. En korjaa sitä, vaikka kuinka katsoisit. Vastaa, äläkä seiso tiellä."

**Kysymys:** Bergenin laiturilla lajitellaan norjalaista kuivakalaa, jota on viety vuosisatoja kaukaiseen Italiaan asti. Mistä kalasta se tehdään?  
- A) Silakasta
- B) Lohesta
- C) Hauesta
- D) Turskasta ✓  
*Fakta:* Norjalainen tørrfisk on ulkona talven kylmässä ja tuulessa kuivattua turskaa. Sitä on viety Bergenistä Etelä-Eurooppaan jo vuosisatojen ajan, ja se säilyy ilman jääkaappia vuosia.

**Aarre** (218, beat: tuore jälki):  
Lajittelukirjan väliin oli painettu kuivunut lehti. Isoisän rivin alla oli uusi merkintä, tämän viikon päivämäärällä. "Kukaan ei ole kirjoittanut tähän kuuteenkymmeneen vuoteen", Solveig sanoi. Muste ei ollut kuivunut.

### 7. Firenze — `firenze`

**Otsikko:** Firenze — tilaus, jota ei haettu  
**Henkilö:** Kultaseppä Ginevra tekee työtä Ponte Vecchion verstaassa ja pitää vihkoa tilauksista, joita ei koskaan haettu.

**Saapuminen** (330 merkkiä):  
Firenze oli ollut Italian pääkaupunki kuusi vuotta, ja kun virkamiehet muuttivat Roomaan, kaupunki jäi täyteen tyhjiä huoneita. Vuokrasin yhden puolella hinnalla ja tinkin silti. Isäntä tunnisti tinkijän. Hän laski hintaa vielä, jotta pääsisi minusta eroon. Kirjasin vuokran ja alennuksen vierekkäin, ja alennus oli suurempi luku.

**Kohtaaminen** (214):  
Ginevra ei nosta katsettaan sormuksesta. "Vihkossa on rivi ilman nimeä, vieras käsiala: lasi kompassiin, maksettu puoliksi, hakematta. Pidän vihkoa taikauskona ja kirjoitan siihen silti. Vastaa, niin avaan vihkon."

**Kysymys:** Ponte Vecchion liikkeissä myytiin ennen kultaseppiä jotakin muuta. Mitä?  
- A) Silkkiä
- B) Pergamenttia
- C) Lihaa ✓
- D) Lasia  
*Fakta:* Sillalla oli aikoinaan teurastajien pitämiä liikkeitä. Ferdinando I de’ Medici käski 1590-luvulla kultaseppien korvata heidät, koska haju nousi Vasarin käytävään, ja kultasepät ovat pysyneet sillalla siitä asti.

**Aarre** (179, beat: toinen esine jossain muualla):  
Verstaan lattialaudan alta nousi pieni kehys: tilauksen numero ja puoli kompassikotelon kantta. "Toinen puoli on jossain muualla", Ginevra sanoi epäuskoisena. "Kauppa jäi kesken."

### 8. Sevilla — `sevilla`

**Otsikko:** Sevilla — sarja, joka jatkuu  
**Henkilö:** Jokiluotsi Amparo tuo laivoja Guadalquivirin mutkan läpi ja pitää kirjaa joen pohjasta.

**Saapuminen** (302 merkkiä):  
Triana-sillan raudan alla jokilaivat jonottivat satamaan, ja minä arvioin joen leveyden silmämitalla: erehdyin sata askelta. Luotsi kuuli arvaukseni, mutta ei sanonut mitään, vaan pyyhki otsaansa. Appelsiininkukat tuoksuivat sillalle asti. Hän näytti sormella, missä pohja nousee, ja minä kirjasin sen.

**Kohtaaminen** (228):  
Amparo katsoo jokea eikä sinua. "Syvyyskirjan rivit jatkavat toisiaan ilman aukkoa. Yhden rivin on kirjannut vieras herra, kun luotsimme oli sairaana. Pidän tapaa vanhanaikaisena ja jatkan sitä silti. Vastaa, niin avaan kirjan."

**Kysymys:** Torre del Oron rannassa purettiin 1500-luvulla rahtia kaukaisista maista. Minkä kaupan yksinoikeuden Sevilla sai?  
- A) Itämeren viljan kaupan Hansaliiton kanssa
- B) Uuden maailman kaupan Atlantin yli ✓
- C) Venetsialaisten lasikaupan Levantissa
- D) Pohjolan turkiskaupan Moskovan kanssa  
*Fakta:* Sevilla sai 1503 yksinoikeuden Espanjan Amerikan-kauppaan, ja laivat purkivat rahtinsa Guadalquivirin rannalla; kauppaa valvoi kruunun Casa de Contratación, joka siirrettiin Cádiziin vasta 1717.

**Aarre** (189, beat: tuore jälki):  
Syvyyskirjan viimeiselle riville oli merkitty tämän aamun lukema. Amparo luki sen kahdesti. "En kirjoittanut tätä." Hän mittasi pohjan itse ja katsoi sitten pitkään jokea. Lukema oli oikea.

### 9. Tampere — `tampere`

**Otsikko:** Tampere — viisitoista, ehkä kuusitoista  
**Henkilö:** Koneenhoitaja Vieno pitää Tammerkosken turbiinin käynnissä ja luottaa mittareihin enemmän kuin tarinoihin.

**Saapuminen** (316 merkkiä):  
Laskin sillalta tehtaiden piiput ääneen ja sain viisitoista. Ohikulkija pysähtyi, kysyi, mitä teen, ja laski kanssani. Hän sai kuusitoista. Tehtaan kello soi kesken laskun, ja kumpikin aloitti alusta. Seisoimme sillalla kymmenen minuuttia emmekä sopineet. Kirjasin molemmat luvut, koska kumpikaan ei antanut periksi.

**Kohtaaminen** (201):  
Vieno pyyhkii käsiään rättiin. "Sukumme kertoo, että tehtaan nainen opetti vieraalle herralle katkenneen langan solmun. Pidän sitä satuna. Solmun osaan silti, ja se pitää. Vastaa, niin saat nähdä sen."

**Kysymys:** Tammerkoski virtaa Tampereen halki kahden järven välillä. Mitkä järvet ovat?  
- A) Päijänne ja Vesijärvi
- B) Näsijärvi ja Pyhäjärvi ✓
- C) Saimaa ja Pyhäselkä
- D) Oulujärvi ja Kallavesi  
*Fakta:* Tammerkoski virtaa Näsijärvestä Pyhäjärveen noin kilometrin matkan, ja sen putouskorkeus on noin 18 metriä. Koski antoi voimaa Finlaysonin kehräämölle ja muille tehtaille.

**Aarre** (185, beat: hiljainen loppu):  
Kätkö oli turbiinihallin oven pielessä: lanka, solmittu isoisän solmulla, ja sen päässä lappu, jossa luki kuusitoista. Vieno luki sen kolmesti. "Eihän se voi olla." Hän lähti laskemaan.

## 3b. Tarkistus 12.10.2026 (PT:n erä: tarkistuslistat, kaanon, faktat, AIKA)

Luonnokset käytiin läpi `docs/moduulit/tarinakaari.md`:n tarkistuslistoilla ja päivitettyä kaanonia vasten (docs/tarina.md, isoisan-raamattu.md; Euroopan aarre = Kolme veljestä 11.10.). **Korjattu itse:**

1. **Kohtaamishenkilön kolme kiellettyä odotusta (tarina.md, kaanon 7.9.2026):** henkilö ei tunnista Horatiota, ei odota perillistä eikä kanna perittyä lupausta. Ensiversion kaikki yhdeksän kohtaamista sanoivat "Isoisäsi …" ja pitivät lupausta; ne kirjoitettiin uusiksi: henkilö reagoi kysyjän kirjaan/kysymykseen ja kertoo paikallisena kirjanpitona (työmaakirja, pöytäkirja, lajittelukirja, syvyyskirja, vihko) 1873:n "vieraasta herrasta". Kaaren muut osat ja kysymykset ennallaan.
2. **Toistot:** kolmen sanan toistoja ei ole; "Vastaa, niin …" -loppurituaali on tarkoituksellinen (7 kertaa); "Kun näytät kirjan merkin" vain kerran, "kirjasi merkki" kerran.
3. **Pituudet** uusinnan jälkeen: kohtaamiset 184–266 → kaikki ≤ 260 (Bryssel lyhennetty 252); saapuminen 290–332, aarre 164–218; kohde ≤ 744.
4. **Varallisuussääntö:** ei "maksoi/tilasi/käski"-rakenteita; Horatio köyhä (pantti: kellon avain; maksettu puoliksi; vastalahja kartta/piirros).
5. **Aarnin luettelo** ei esiinny teksteissä (kaanon 11.10.: pelaaja ei vielä tiedä luettelosta); Meripihkahuonetta ei mainita (aarremerkinnät pois pelistä).
6. **Faktat:** kaikki maailmaa koskevat väitteet kahden lähteen tarkistuksessa (liite), korjaukset tehty ennen luonnosten hyväksyntää.
7. **AIKA-sääntö (kartta nykyajassa):** kohtaamiset ja aarteet tapahtuvat nykyhetkessä (Aline kunnostaa pörssitalon, Rita istuu oopperatalon raunioilla/ulkoilmateatterin kopissa, Nic veistää purkukivistä); 1873 vain saapumisissa ja paikallisessa kirjanpidossa.

**PT:n päätettäväksi / huomattavaa:**

| Kaupunki | Tila | PT päättää / huomio |
|---|---|---|
| Bryssel | valmis | Rodin-kysymys: Rodinin osuus pörssitaloon (tekijyys) on lähteissä tulkinnanvarainen; kysymys sanoo vain "veisti koristeita" |
| Kassa | valmis | "Lennätinvirkailija" on fokusvirran kohtaamishahmo (nykyhetkessä lennätinhuone epäuskottava; hahmo kaanonia) |
| Ljubljana | valmis | – |
| Luxemburg | valmis | Kielikohtaus ("paikallinen murre") perustuu yhteen tarkistukseen; kommellus (kaatuva muuri) ainoa jännitys erässä |
| Valletta | valmis | Vallettan oopperatalo palanut sisältä toukokuussa 1873 (ei "katto"), avattu uudelleen 1877 |
| Bergen | valmis | Kysymys (turskasta) on helpoin erässä; halutaanko vaikeampi? |
| Firenze | valmis | Itseironia-annos (tinkijä) kuluu tässä; kysymys sillan teurastajista (1590-luku) |
| Sevilla | valmis | Aarteen tuore jälki ("aamun lukema") viittaa tuntemattomaan kulkijaan; sama säie Kassassa ja Bergenissä (3/9) |
| Tampere | valmis | Humoristinen loppu: "kuusitoista" (piippujen lasku) palaa saapumisesta; hyväksytäänkö loppu ilman koukkua |

**Päätettävää kaikille yhdeksälle:** (a) kaaren `saapuminen` on varapolku (fokusmoodi pois) → generoidaanko vain kohtaaminen + aarre (18 luentaa, ei 27); (b) tekstit dataan hyväksynnän jälkeen, luennat vasta omistajan luvalla.

## 4. Seuraavat askeleet (päätettävä PT/omistaja)

1. **Luonnosten hyväksyntä** (jakotaulu on kohdassa 2; tekstit ovat jakotaulun mukaiset). Ennen hyväksyntää korjaukset ovat ilmaisia, generoinnin jälkeen maksavat.
2. Hyväksynnän jälkeen: tekstit `KAARI_PAKETIT`-dataan (kenttärakenne kuten Helsinki/Tallinna: `tunneKohtaaminen`, `tunneAarre`, `mykistetyt`), luenta-kentät tunnetageilla (2–5/luenta), `generoi-kaari.mjs` (27 luentaa tai 18 ilman saapumista, vain omistajan luvalla; ei generointia nyt).
3. Viiden uuden kaupungin **fokus-luenta** (`puhe-fokus-matkakirja-{bryssel,kosice,ljubljana,luxemburg,valletta}.mp3`) on erillinen, jo kirjoitettu eräsi: pelkkä generointi.
4. `aanet-eurooppa-inventaario-20261011.md` kohta 2: sarake "luenta" voi poistaa tai merkitä "arkistoitu 8.9."

## 5. Tarkistetut väitteet
Liite `kaaret-eurooppa-faktat-20261011.md`: kaikki maailmaa koskevat väitteet, lähteet ja korjaukset (esim. Vallettan palo 25.5.1873 ja talo avattiin uudelleen 1877; Kassan vaakunakirja "vanhin säilynyt"; Ljubljanan Keskustori; Sevillan Casa de Contratación siirtyi Cádiziin 1717).
