# Pilvisession raportti: 34 kaupungin esittelytekstit

Haara `pelikoodari-esittely-pilvi`, 7.10.2026. Jokaiselle kaupungille ajettiin kaksi eri ali-agenttia (molemmat mallilla opus): KIRJOITTAJA → `luonnos/<id>.json` + `<id>-huomiot.md` ja TARKISTAJA → `korjattu/<id>.json` + `<id>-muutokset.md`. Avaukset ovat tiedostoissa `avaukset/<id>.md` (Pelikoodari siirtää ne avaus-kenttään). Jokainen kaupunki committattiin erikseen.

## Yhteenveto

- Valmiina **34/34** kaupunkia, yhteensä **435 kohdetta**, joista **271 kierroskohdetta** (lyhyt-versio) ja **2175 Kysy-kysymystä** (5 per kohde).
- Koneellinen tarkistin (`tools/opas/tarkista-esittely.mjs`): **0 virhettä kaikissa korjattu-tiedostoissa** ja kaikissa luonnoksissa. Ääntöhuomioita (vieraskielinen alku) 0 kpl.
- Jäljelle jäävät huomiot ovat vain kahta hyväksyttyä tyyppiä: "ei ala paikan nimellä" (lisäsääntö A: suomenkielinen etusana vieraskieliselle nimelle) ja "avaus puuttuu" (avaus on erillisessä .md-tiedostossa ohjeen mukaisesti).
- Kaikki lyhyet ovat 30–42 sanaa (tarkistin valvoo vain ylärajaa; 10 alle 30 sanan lyhyttä pidennettiin jälkipassissa) ja kaikki avaukset 35–41 sanaa.

## Poikkeamat ja tehdyt ratkaisut

- **Verkko:** WebFetch ja suora pääsy Wikipediaan olivat tässä ympäristössä estettyjä (egress-proxy). Faktat tarkistettiin WebSearchin hakuotteista; lahteet-kentän URLit ovat hakutulosten sivuja, joita ei avattu kokonaan. Pelin aineistoon nojaavat lähteet (`kaanon:pelin-aineisto`) vaihdettiin tarkistuksessa verkkolähteisiin tai väite poistettiin.
- **Ohjeiden päivitys kesken ajon:** Päätoimittajan commit f4bc64b toi kentän `kysymykset` (5/kohde) ja ääntöhuomion (f14587b). Neljään jo valmiiseen kaupunkiin (Amsterdam, Ateena, Barcelona, Bergen) kysymykset lisättiin jälkikäteen erillisellä kirjoittaja- ja tarkistaja-agentilla; Ateenan Sýntagman alku korjattiin muotoon "Syntagma-aukio".
- **Lisäsääntö A:** suomenkielinen tai suomeksi taivutettu nimi aloittaa tekstin; vain vieraskielisille nimille lisättiin suomenkielinen etusana. Islannin (þ, ð) ja Kreetan aksentilliset nimet saivat puhe_teksti-kentät.
- **Rinnakkaisuus:** enimmäisraja 4 kaupunkia ylittyi hetkellisesti kolmesti viidellä kaupungilla.
- **Orkestroijan omat korjaukset:** Ateena (Syntagma-alku), Madrid (Retiron lyhyestä poistettu isoisä-merkinnän syy-yhteystulkinta). Kirjattu muutostiedostoihin.
- **Pohjan kirjoitusvirhe:** Krakovan nimi "Barbaakani" (oikein Barbakaani) — nimi-kenttä pidettiin pohjan mukaisena, tekstissä oikea muoto. Pohja kannattaa korjata.

## Kaupungit

| Kaupunki | Kohteita | Kierros | Kysymyksiä | Tarkistin (korjattu) | Puhetta (mrk) | Avaus (sanaa) |
|---|---|---|---|---|---|---|
| Amsterdam | 15 | 8 | 75 | 0 virhettä, 14 huomiota | 12496 | 35 |
| Ateena | 15 | 8 | 75 | 0 virhettä, 5 huomiota | 11776 | 36 |
| Barcelona | 15 | 8 | 75 | 0 virhettä, 19 huomiota | 12027 | 40 |
| Bergen | 11 | 8 | 55 | 0 virhettä, 12 huomiota | 9874 | 36 |
| Berliini | 16 | 8 | 80 | 0 virhettä, 8 huomiota | 13242 | 37 |
| Bryssel | 13 | 8 | 65 | 0 virhettä, 13 huomiota | 11309 | 35 |
| Budapest | 15 | 8 | 75 | 0 virhettä, 9 huomiota | 12924 | 37 |
| Bukarest | 14 | 8 | 70 | 0 virhettä, 7 huomiota | 12683 | 39 |
| Dublin | 14 | 8 | 70 | 0 virhettä, 17 huomiota | 11708 | 39 |
| Edinburgh | 12 | 8 | 60 | 0 virhettä, 14 huomiota | 10255 | 37 |
| Firenze | 14 | 8 | 70 | 0 virhettä, 12 huomiota | 11690 | 36 |
| Granada | 9 | 8 | 45 | 0 virhettä, 10 huomiota | 8395 | 38 |
| Helsinki | 15 | 8 | 75 | 0 virhettä, 1 huomiota | 12089 | 37 |
| Islanti | 11 | 8 | 55 | 0 virhettä, 24 huomiota | 10304 | 37 |
| Kööpenhamina | 14 | 8 | 70 | 0 virhettä, 8 huomiota | 11579 | 36 |
| Košice | 8 | 8 | 40 | 0 virhettä, 7 huomiota | 8146 | 37 |
| Krakova | 12 | 8 | 60 | 0 virhettä, 9 huomiota | 10435 | 37 |
| Kreeta | 13 | 8 | 65 | 0 virhettä, 10 huomiota | 11004 | 41 |
| Lissabon | 14 | 8 | 70 | 0 virhettä, 12 huomiota | 12010 | 38 |
| Ljubljana | 10 | 8 | 50 | 0 virhettä, 10 huomiota | 8933 | 37 |
| Lontoo | 19 | 8 | 95 | 0 virhettä, 16 huomiota | 15006 | 36 |
| Luxemburg | 7 | 7 | 35 | 0 virhettä, 11 huomiota | 6774 | 36 |
| Madrid | 15 | 8 | 75 | 0 virhettä, 13 huomiota | 12576 | 36 |
| Marseille | 10 | 8 | 50 | 0 virhettä, 6 huomiota | 8779 | 38 |
| Oslo | 15 | 8 | 75 | 0 virhettä, 7 huomiota | 12119 | 36 |
| Rooma | 19 | 8 | 95 | 0 virhettä, 18 huomiota | 14412 | 36 |
| Sevilla | 11 | 8 | 55 | 0 virhettä, 10 huomiota | 9651 | 38 |
| Sisilia | 14 | 8 | 70 | 0 virhettä, 10 huomiota | 11450 | 39 |
| Sofia | 10 | 8 | 50 | 0 virhettä, 3 huomiota | 9607 | 36 |
| Tampere | 9 | 8 | 45 | 0 virhettä, 1 huomiota | 8548 | 36 |
| Tukholma | 14 | 8 | 70 | 0 virhettä, 9 huomiota | 12270 | 36 |
| Valletta | 8 | 8 | 40 | 0 virhettä, 7 huomiota | 7998 | 37 |
| Venetsia | 14 | 8 | 70 | 0 virhettä, 9 huomiota | 11192 | 38 |
| Vilna | 10 | 8 | 50 | 0 virhettä, 3 huomiota | 9201 | 38 |

## Isoisä-maininnat lähderiveineen

Isoisä mainitaan enintään yhdessä kohteessa kaupunkia kohden ja vain, kun merkintä nimeää tai yksiselitteisesti kuvaa kohteen. Bukarestin maininta (Calea Victoriei) poistettiin tarkistuksessa liian heikkona liitoksena. Rajatapauksia Päätoimittajalle: Edinburgh (merkintä sanoo vain "Edinburghin hautausmaalla"; teksti ei väitä Greyfriarsia), Marseille ("Marseillen satamassa" → vanha satama), Sofia ("Sofian lämmin lähde" → keskeinen mineraalikylpylä), Krakova ("yliopistossa" + Jagellonien maapallo → Collegium Maius). Tukholmassa merkintä kertoo Oskarin kruunajaisista "Tukholmassa"; Suurkirkkoon ei liitetty.

- **Amsterdam:** ei mainintaa.
- **Ateena:** ei mainintaa.
- **Barcelona:** ei mainintaa.
- **Bergen – Bergenin tuomiokirkko** (Q819531):
  - lähde `kaanon:isoisan-paivakirja`: Isoisä näki tykinkuulan, mainitsi oppaalle palvelleensa laivastossa ja vakuutti, että mukana oli vain lyijykynä.
- **Berliini:** ei mainintaa.
- **Bryssel – Grand-Place** (Q215429):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: Grand-Placen kullatut kiltatalot kiiltävät sateen jälkeen kuin avattu korulipas.
- **Budapest – Széchenyin ketjusilta** (Q465534):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: Buda, Pest ja Óbuda liitettiin yhteen; Ketjusillalla perittiin yhä maksu; hän huomautti pysyvänsä samassa kaupungissa; maksunkerääjä nyökkäsi ja piti kätensä ojossa.
- **Bukarest:** ei mainintaa.
- **Dublin – Guinness Storehouse** (Q261012):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: vuokrasopimus yhdeksäksituhanneksi vuodeksi vaatii uskoa olueen tai janoon; portilla mies vieritti tynnyreitä kärryille, ja kun isoisä kysyi, loppuuko työ koskaan, mies katsoi pitkään ja vieritti seuraavan tynnyrin.
- **Edinburgh – Greyfriars Kirkyard** (Q2876448):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä 1873: Edinburghin hautausmaalla vanha rautahäkki peitti hautaa; hän kysyi haudankaivajalta, kauanko häkkiä oli tarvittu, ja vastaus oli: kunnes ruumis ei enää kelvannut kaupaksi. Merkintä ei nimeä hautausmaata.
- **Firenze – Piazza della Signoria** (Q849846):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä 1873: David seisoi aukiolla, patsas aiottiin siirtää sateelta suojaan, hän katseli sen suurta kättä ja omaansa.
- **Granada – Alhambra** (Q47476):
  - lähde `kaanon:isoisan-paivakirja`: Isoisä poimi jätekasasta sinisen kaakelinpalan ja antoi sen miehelle, joka keräsi sirpaleita museota varten.
- **Helsinki – Helsingin tuomiokirkko** (Q738015):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: kirkon apostolit katsoivat merelle (Helsingfors, heinäkuu 1873).
- **Islanti:** ei mainintaa.
- **Kööpenhamina – Tivoli** (Q110289):
  - lähde `kaanon:isoisan-paivakirja`: Isoisä katsoi Tivolin teatterissa näytöstä, jossa palvelija piilotti paistin isännältään sanaakaan lausumatta; tanskalainen poika nauroi samoissa kohdissa, ja isoisä ymmärsi juonet vaivatta.
- **Košice – Pyhän Elisabetin katedraali** (Q569428):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: tuomiokirkko on niin suuri, että kaupunki tuntuu rakennetun sen ympärille.
- **Krakova – Collegium Maius** (Q919596):
  - lähde `kaanon:isoisan-paivakirja`: Isoisä näki Krakovan yliopistossa vanhan maapallon, jossa Intian eteläpuolelle oli merkitty Amerikka ja vieressä luki vastikään löydetty.
- **Kreeta:** ei mainintaa.
- **Lissabon – Carmon luostari** (Q1470414):
  - lähde `kaanon:isoisan-paivakirja`: Isoisä: Carmon kirkon katto oli sortunut 1755, rauniot säilytetty muistomerkkinä; hän riisui ovella hattunsa vanhasta tottumuksesta ja pani sen takaisin, kun sade alkoi.
- **Ljubljana – Ljubljanan linna** (Q2075156):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä 1873: linnassa on vankila, ei ruhtinaita.
- **Lontoo:** ei mainintaa.
- **Luxemburg – Bockin kasematit** (Q125561209):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: Bockin käytävissä kaikuu iskuvasaroita; kallio on purettava kivi kiveltä.
- **Madrid – Retiron puisto** (Q1131807):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä 1873: Retiron portilla hän valmistautui näyttämään käyntikorttinsa, vartija viittasi sisään katsomatta nimeä; kuningattaren entinen puisto kuului nyt kaupungille; lammen rannalla eväitään levittänyt mies teki hänelle tilaa penkillä.
- **Marseille – Marseillen vanha satama** (Q437959):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: Marseillen satamassa saippuaa myytiin tiiliskivinä; hän osti palan, mutta terva, kala ja suolavesi seurasivat majataloon.
- **Oslo:** ei mainintaa.
- **Rooma – Pantheon** (Q99309):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: kattoaukosta satoi sisään, vesi katosi lattian pieniin reikiin, vanhalle talolle ei kai tohtinut huomauttaa katosta.
- **Sevilla:** ei mainintaa.
- **Sisilia – Palatiinikappeli** (Q1034853):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: kappeli hohti kultaa, katseli kunnes niska väsyi, kuninkaan nimi tunnettiin, tekijöiden nimiä olisi kuunnellut kauemmin.
- **Sofia – Sofian keskeinen mineraalikylpylä** (Q190435):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: Sofiassa maa lämmitti veden ilman halkoja; lähteellä nainen täytti kannun.
- **Tampere – Finlaysonin tehdasalue** (Q15846380):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä, Tampere 1873: Finlaysonilla nainen näytti katkenneen langan solmun; isoisän sormissa lanka katkesi heti, nainen sitoi sen katsomatta.
- **Tukholma:** ei mainintaa.
- **Valletta – Grand Harbour** (Q220899):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä: Grand Harbourissa kyljettäin laivaston mustia runkoja kuin tikkuja laatikossa.
- **Venetsia – Pyhän Markuksen basilika** (Q172988):
  - lähde `kaanon:isoisan-paivakirja`: Isoisän merkintä 1873: opas kertoi San Marcon kirkossa, että ruumis tuotiin Egyptistä sianlihan alla eikä muslimivartijoiden tutkittu koria; hän katseli kultaisia mosaiikkeja; hänen laivastossaan tästä olisi seurannut kuulustelu, Venetsiassa oli rakennettu kirkko.
- **Vilna:** ei mainintaa.

## Jäljelle jääneet epävarmuudet (tarkistajien raportit)

Tarkemmat tiedot kunkin kaupungin `korjattu/<id>-muutokset.md`-tiedostossa.

- **Amsterdam:** Westerkerk 85/87 m; aseman tuulitaulu matkailusivujen varassa; ääntämys Prinsengracht, Jodenbreestraat, Westerman/Werlemann/Wijsmuller.
- **Ateena:** Parthenonin optisten korjausten tulkinta, evzonien hameen väri arkiasussa; kertojan ääntämys alkunimille (Erekhtheion, Likavittos).
- **Barcelona:** Palaun "Euroopan ainoa luonnonvalolla valaistu konserttisali" (toissijainen lähde), Casa Batllón "ei juuri suoria linjoja", Kolben veistoksen suomennos Aamunkoitto.
- **Bergen:** Fantoftin Borgund-esikuva ja lohikäärmeenpäät vain matkailusivuilta; Troldhaugen 1885/1886 (ei vuotta tekstissä); Nykirkenin sijainti lokalhistoriewikin varassa.
- **Berliini:** Brandenburgin portin koko_m 65 (leveys 62,5); tv-tornin 'kirkkoja vierastanut valtio' tulkinta.
- **Bryssel:** begonioiden määrä, Manneken Pisin uudet asut vuodessa, Atomiumin ääneneristys (virallisten sivujen varassa).
- **Budapest:** kansallisgalleria/-kirjasto siirtymässä pois linnasta; Gellért-kylpylä 2028–2029; Matiaksenkirkon torni 78/80 m; Nagyn hautajaisväki.
- **Bukarest:** katedraalin kolme kupolia ja neljä tornia (yksi lähde); 'pyhä Demetrios Uusi'; Stalinin patsaan vuodet ristiriidassa; Rotundan Eminescu/Caragiale.
- **Dublin:** sorsien tulitauko perimätietoa; Trinityn kellotornin taikausko; linna 'yli 700 vuotta'.
- **Edinburgh:** puutarhan puiden 12 m (jaloista muunnettu); palmuhuoneiden uudelleenavaus syksyllä 2026.
- **Firenze:** San Miniaton gregoriaaninen iltarukous; Bobolin hankinta 1549 (Cosimo/Eleonora); koko_m Ponte Vecchio 100, kastekappeli 40.
- **Granada:** Clintonin auringonlasku ('Kerrotaan'); Kaarle V:n palatsin perustelu yhden lähteen varassa.
- **Helsinki:** koko_m-arviot; Temppeliaukion kuparilanka; Uspenski Länsi-Euroopan suurin ortodoksinen kirkko.
- **Islanti:** suojeluhengen lintu kotka/korppikotka; Esjan ja Snæfellsjökullin näkyvyys matkailusivuilta; Harpan lasimoduulien määrä.
- **Košice:** suihkulähteen suunnittelija Sceranka; Jakabin palatsin rakentajat; ruttopylvään sijainti.
- **Krakova:** tornin korkeus 80–82 m; pohjan nimi 'Barbaakani' kirjoitusvirhe.
- **Kreeta:** Menaksen legenda, Koulesin rakennus- ja laivatiedot, Archánesin palkinto matkailusivuilta; Euroopan vanhin valtaistuin (en.wiki, 'jota pidetään').
- **Kööpenhamina:** Merenneidon kasvojen malli (teksti ei ota kantaa); Kastelletin kysymys miehityksestä; Rosenborgin kruunu 'mestariteos'.
- **Lissabon:** Joosef ensimmäisen patsaan valu 1774; Alfaman tuho yli 80 %, Kauppatorin portaat, Rua Augustan hissi 2013 matkailulähteistä.
- **Ljubljana:** Melanin rooli; lohikäärmeiden materiaali; Wolfova 4 ja Julija Primic; Kolmoissillan kaiteiden materiaali.
- **Lontoo:** Westminster Hall 1097; St Paulin kupolin korkeus 111–114 m.
- **Luxemburg:** 'murheellisten lohduttaja' -suomennos; Bockin tykit ja varuskunta koskevat koko kasemattiverkkoa.
- **Madrid:** kuninkaanlinnan rakenne ilman puuta (matkailusivu); Metrópolis-talon Victoria 1975/1977.
- **Marseille:** liitos Vanhaan satamaan tulkinta (myös La Joliette 1873); Espérandieun ikä; Calanquesin kävijämäärä.
- **Oslo:** ø-kirjaimet sanojen keskellä ilman puhe_tekstiä (Bjørvika, Bygdøy, Sørenga, Gjøa) – kuunneltava.
- **Rooma:** Colosseumin katsojamäärä noin 50 000; seinien kolojen selitys matkailusivuilta.
- **Sevilla:** Metropol Parasolin hinta; Kultatornin käyttöhistoria (andalucia.org).
- **Sisilia:** Teatro Massimo Euroopan kolmanneksi suurin; Mondellon ranta ~2 km; Bonanno Pisanon Pisan ovet.
- **Sofia:** Banja Bashi 1566/1576 ja Sinan; muistomerkin purku 2017; Rotundan pihan reitti.
- **Tampere:** tuomiokirkon seppele kohti alttaritaulua (ku.fi); kosken ylitys 1500-luvulla tällä kohdalla.
- **Tukholma:** Riddarholmenin korkeus_m 90 ehjälle tornille; Allsång-katsojamäärä; Maunu Ladonlukko ensimmäinen haudattu kuningas.
- **Valletta:** palatsin kortteli, kellon orjahahmot matkailusivulta; teatterin paikkaluku 534/547.
- **Venetsia:** kampanilen kissa; Dogen palatsin koko_m 110; Napoleonin lausuma perinne.
- **Vilna:** Gediminasin tornin museo auki 2026?; Užupisin julistus 1997/1998; tuomiokirkon korkeus_m 57 kellotapulin.

## Avaukset

### Amsterdam (35 sanaa)

Tervetuloa Amsterdamiin. Ylhäältä kaupunki näyttää puolikuulta, jonka kanavat kiertävät vanhaa keskustaa sisäkkäisinä kaarina kuin puun vuosirenkaat. Pohjoisessa puolikuuta rajaa satama lauttoineen. Kierros alkaa keskustan itälaidalta Rembrandtin talosta, jossa maalari asui ja työskenteli lähes kaksikymmentä vuotta.

### Ateena (36 sanaa)

Tervetuloa Ateenaan. Ylhäältä kaupunki näyttää vaalealta talomatolta, joka täyttää koko laakson vuorten ja meren välissä. Sen keskeltä nousee jyrkkä kallio, jonka laella marmoritemppelit hohtavat. Kierros alkaa tältä kalliolta, Akropoliilta, jonka temppelit rakennettiin 400-luvulla ennen ajanlaskun alkua.

### Barcelona (40 sanaa)

Tervetuloa Barcelonaan. Ylhäältä kaupunki levittäytyy meren ja vuorten väliin, ja sen keskellä on tasainen ruudukko kahdeksankulmaisia kortteleita, joiden yllä kohoavat Sagrada Famílian tornit. Kierros alkaa vanhan kaupungin laidalta konserttitalosta Palau de la Música Catalanasta, jonka salia valaisee päivisin pelkkä luonnonvalo.

### Bergen (36 sanaa)

Tervetuloa Bergeniin. Ylhäältä kaupunki on kattojen kirjo seitsemän vuoren sylissä, ja sen keskelle työntyy vuonolta kapea Vågen-lahti. Kierros alkaa lahden itärannalta Bryggeniltä, hansakauppiaiden vanhalta laiturilta, jonka puutalojen rivi on noussut jokaisen tulipalon jälkeen uudelleen samalle paikalle.

### Berliini (37 sanaa)

Tervetuloa Berliiniin. Ylhäältä kaupunki on laaja ja tasainen kattojen, puistojen ja järvien maisema, jonka halki Spree kiemurtelee hitaasti länteen. Keskustan länsilaidalla levittäytyy Tiergartenin vihreä puisto. Kierros alkaa Alexanderplatzin laidalta televisiotornilta, jonka hopeanhohtoinen pallo näkyy lähes koko kaupunkiin.

### Bryssel (35 sanaa)

Tervetuloa Brysseliin. Ylhäältä vanha keskusta erottuu viisikulmiona, jota kiertää leveä bulevardien kehä entisten kaupunginmuurien paikalla, ja sen itälaidalla yläkaupunki kohoaa palatseineen ja puistoineen. Kierros alkaa keskustan sydämestä Grand-Placelta, jota reunustavat kullatut kiltatalot ja goottilainen kaupungintalo.

### Budapest (37 sanaa)

Tervetuloa Budapestiin. Ylhäältä kaupunki jakautuu Tonavan kahdelle puolelle: lännessä kohoavat Budan kukkulat ja linnamäki, idässä levittäytyy Pestin tasainen kattojen meri, ja joki kaartuu niiden välissä siltojen alitse. Kierros alkaa Gellértinvuorelta, jonka laelta koko kaupunki näkyy yhdellä silmäyksellä.

### Bukarest (39 sanaa)

Tervetuloa Bukarestiin. Ylhäältä kaupunki on laaja tasanko, jonka halki Dâmbovița-joki kulkee suoristettuna uomana ja jonka keskeltä nousee parlamenttitalon valtava valkoinen kivimassa. Kierros alkaa vanhan keskustan kapeiden katujen keskeltä, pieneltä Stavropoleoksen kirkolta, jonka pylväät ja kaaret veistettiin kivestä 1700-luvun alussa.

### Dublin (39 sanaa)

Tervetuloa Dubliniin. Ylhäältä kaupunki on matalien kattojen ja vihreiden puistojen tilkkutäkki, jonka halki Liffey-joki virtaa itään kohti Dublininlahtea. Kierros alkaa joen etelärannalta Trinity Collegesta, Irlannin vanhimmasta yliopistosta, joka perustettiin vuonna 1592 ja jonka harmaat kivipihat avautuvat nyt keskellä kaupunkia.

### Edinburgh (37 sanaa)

Tervetuloa Edinburghiin. Ylhäältä kaupunki on tummaa kiveä ja vihreitä kukkuloita: lännessä linna kohoaa jyrkän kallion laella, ja vanhakaupunki valuu siitä kapeaa harjannetta pitkin itään. Kierros alkaa kaupungin itälaidalta Arthur's Seatilta, sammuneelta tulivuorelta, jonka huipulta koko kaupunki näkyy.

### Firenze (36 sanaa)

Tervetuloa Firenzeen. Ylhäältä kaupunki on punaruskeiden tiilikattojen tiivis meri, jonka keskeltä tuomiokirkon valtava kupoli kohoaa ja jonka halki Arno virtaa siltojen alitse. Kierros alkaa Vanhasta palatsista, Palazzo Vecchiosta, jonka korkea torni on vartioinut kaupunkia keskiajalta asti.

### Granada (38 sanaa)

Tervetuloa Granadaan. Ylhäältä kaupunki levittäytyy tasangolle Sierra Nevadan vuorten juurelle, ja sen yllä kohoaa kaksi kukkulaa: toisella valkoinen vanha kaupunginosa, toisella punertavien muurien kehystämä palatsilinnoitus. Kierros alkaa tuolta punaiselta kukkulalta Alhambrasta, joka oli Iberian niemimaan viimeisen muslimivaltion sydän.

### Helsinki (37 sanaa)

Tervetuloa Helsinkiin. Ylhäältä kaupunki on vaalea niemi, jota meri saartaa kolmelta puolelta ja jonka edustalla saaret ja luodot sirottuvat Suomenlahdelle. Kierros alkaa niemen keskeltä päärautatieasemalta, jonka graniittinen kellotorni näkyy kauas ja jonka ovella neljä kivimiestä pitelee pallolamppujaan.

### Islanti (37 sanaa)

Tervetuloa Reykjavikiin. Ylhäältä maailman pohjoisin itsenäisen valtion pääkaupunki on matalien, kirjavien kattojen tilkkutäkki, joka levittäytyy lahden rantaan, ja veden takana kohoaa Esja-vuori. Kierros alkaa keskustan kukkulalta Hallgrímskirkjasta, Islannin suurimmasta kirkosta, jonka basalttipylväitä muistuttava torni näkyy kaikkialle kaupunkiin.

### Kööpenhamina (36 sanaa)

Tervetuloa Kööpenhaminaan. Ylhäältä Tanskan pääkaupunki on matala kattojen ja vihreiden kuparitornien kenttä salmen rannalla, ja satama ja kanavat kiemurtelevat sen läpi. Kierros alkaa keskustan laidalta Tivolista, huvipuistosta, jonka puiden ja paviljonkien lomassa kimmeltää vanhan vallihaudan järvi.

### Košice (37 sanaa)

Tervetuloa Košiceen. Ylhäältä kaupunki levittäytyy Hornád-joen laaksoon vihreiden kukkuloiden keskelle, ja vanhankaupungin halki kulkee punaisten kattojen välissä pitkä, keskeltä leveä pääkatu. Kierros alkaa tämän kadun keskeltä Pyhän Elisabetin katedraalilta, Slovakian suurimmalta kirkolta, jonka kirjava tiilikatto erottuu kauas.

### Krakova (37 sanaa)

Tervetuloa Krakovaan. Ylhäältä vanhakaupunki näyttää soikealta kattojen saarelta, jota vihreä puistorengas kehystää ja jonka keskellä avautuu valtava neliön muotoinen tori. Etelässä kalkkikivikukkula kohoaa Veikselin mutkaan. Kierros alkaa kukkulan laelta Wawelin linnasta, jossa Puolan kuninkaat asuivat vuosisatojen ajan.

### Kreeta (41 sanaa)

Tervetuloa Heraklioniin. Ylhäältä Kreetan suurin kaupunki on vaaleiden talojen tiivis kenno meren rannalla, ja sen vanhaa keskustaa kiertää venetsialaisten kärkevä bastionimuuri. Etelässä siintää vuori, jonka harjanteessa paikalliset näkevät Zeuksen kasvot. Kierros alkaa muureilta, joiden suojissa kaupunki torjui piirittäjiä yli kaksikymmentä vuotta.

### Lissabon (38 sanaa)

Tervetuloa Lissaboniin. Ylhäältä kaupunki näyttää vaaleiden talojen ja punaisten kattojen peittämiltä kukkuloilta, jotka laskeutuvat leveän Tejo-joen rantaan. Kierros alkaa joen äärestä Kauppatorilta, joka avautuu keltaisten kaarikäytävien kehystämänä suoraan veteen ja jonka paikalla seisoi kuninkaanlinna ennen vuoden 1755 maanjäristystä.

### Ljubljana (37 sanaa)

Tervetuloa Ljubljanaan. Ylhäältä kaupunki on punaisten kattojen rykelmä, jonka keskeltä kohoaa metsäinen linnavuori ja sen laella linna. Vuoren juurella Ljubljanica-joki kiemurtelee vanhankaupungin ohi. Kierros alkaa joen rannalta Prešerenin aukiolta Kolmoissillan päästä, kansallisrunoilijan patsaan ja vaaleanpunaisen fransiskaanikirkon luota.

### Lontoo (36 sanaa)

Tervetuloa Lontooseen. Ylhäältä kaupunki on loputon kattojen, tornien ja vihreiden puistojen kenttä, jonka halki Thames kiemurtelee leveinä mutkina itään kohti merta. Kierros alkaa joen pohjoisrannalta Westminsteristä, jossa Big Ben on lyönyt tunteja parlamenttitalon kellotornissa vuodesta 1859.

### Luxemburg (36 sanaa)

Tervetuloa Luxemburgiin. Ylhäältä vanha kaupunki näyttää kallioiselta niemeltä, jota Alzette- ja Pétrusse-joet kiertävät syvissä vihreissä rotkoissa ja jonka jyrkkiä reunoja kantavat linnoitusmuurit ja korkeat kaarisillat. Kierros alkaa yläkaupungin sydämestä Guillaume toisen aukiolta, jota paikalliset kutsuvat Knuedleriksi.

### Madrid (36 sanaa)

Tervetuloa Madridiin. Ylhäältä kaupunki on punaruskeiden kattojen meri keskellä paljasta ylätasankoa, ja sen länsilaidalla kuninkaanlinna kohoaa jyrkänteellä jokilaakson yllä. Kierros alkaa itälaidan Retiron puistosta, jonka suurella lammella hovi katseli aikanaan lavastettuja meritaisteluja ja jolla nykyään soudetaan.

### Marseille (38 sanaa)

Tervetuloa Marseilleen. Ylhäältä kaupunki on vaaleiden talojen amfiteatteri, joka laskeutuu kalkkikivikukkuloilta kapean vanhan sataman ympärille ja Välimeren rantaan. Kierros alkaa kaupungin korkeimmalta kalliolta, jolla basilika Notre-Dame de la Garde ja sen kullattu Neitsyt Maria vartioivat satamaa ja merta.

### Oslo (36 sanaa)

Tervetuloa Osloon. Ylhäältä Norjan pääkaupunki levittäytyy pitkän vuonon perukkaan, ja metsäiset kukkulat kaartuvat sen ympärille kuin suojaava kämmen. Kierros alkaa Oslon pääkadulta Karl Johans gatelta, joka halkoo keskustan suorana nauhana rautatieasemalta aina kuninkaanlinnan matalalle kukkulalle asti.

### Rooma (36 sanaa)

Tervetuloa Roomaan. Ylhäältä kaupunki on okranväristen kattojen ja kupolien meri, jonka halki Tiber kiemurtelee ja jonka kortteleiden välistä pilkottaa antiikin raunioita. Kierros alkaa kaupungin muinaisesta sydämestä, Forum Romanumilta, jossa roomalaiset kävivät kauppaa, käräjöivät ja palvoivat jumaliaan.

### Sevilla (38 sanaa)

Tervetuloa Sevillaan. Ylhäältä kaupunki on vaaleiden talojen, sisäpihojen ja appelsiinipuiden kirjoma matto, jonka länsireunaa Guadalquivir seurailee leveänä ja jonka keskeltä kohoaa katedraalin kellotorni. Kierros alkaa joen rannalta almohadien rakentamasta Kultatornista, joka on vartioinut kaupungin jokiliikennettä jo 1200-luvulta lähtien.

### Sisilia (39 sanaa)

Tervetuloa Palermoon. Ylhäältä Sisilian pääkaupunki on vaaleiden talojen ja kirkonkupolien tiivis kenno, joka levittäytyy sataman ympärille vuorten rajaaman laakson pohjalle. Pohjoisessa kohoaa jyrkkä Monte Pellegrino. Kierros alkaa vanhan kaupungin länsilaidalta Erakkojen kirkolta, jonka viisi punaista kupolia hehkuu palmujen keskellä.

### Sofia (36 sanaa)

Tervetuloa Sofiaan. Ylhäältä kaupunki levittäytyy laajaan, joka puolelta vuorten ympäröimään laaksoon, ja sen eteläreunalla Vitoša-vuori nousee aivan viimeisten korttelien takaa. Kierros alkaa keskustan kultaisten kupolien luota Aleksanteri Nevskin katedraalilta, joka on yksi maailman suurimmista ortodoksisista kirkoista.

### Tampere (36 sanaa)

Tervetuloa Tampereelle. Ylhäältä kaupunki levittäytyy kapealle kannakselle kahden suuren järven väliin, ja sen keskellä vaahtoava koski virtaa punatiilisten tehtaiden ohi. Kierros alkaa keskustan sydämestä Hämeensillalta, jonka kaiteilla neljä pronssipatsasta on vartioinut kosken ylitystä lähes sata vuotta.

### Tukholma (36 sanaa)

Tervetuloa Tukholmaan. Ylhäältä kaupunki on saarten, siltojen ja salmien mosaiikki, jossa Mälarenin makea vesi virtaa Itämereen. Kierros alkaa vanhankaupungin pohjoispäästä kuninkaanlinnalta, joka rakennettiin tulipalossa tuhoutuneen keskiaikaisen linnan paikalle ja on yhä kuninkaan virallinen asunto ja työpaikka.

### Valletta (37 sanaa)

Tervetuloa Vallettaan. Ylhäältä kaupunki on vaalea kalkkikiviniemi kahden syvän sataman välissä: suorat kadut halkovat sitä ruutukaavana, ja paksut muurit kiertävät sen reunoja. Kierros alkaa kaupungin keskeltä Pyhän Johanneksen ko-katedraalilta, jonka pelkistetyn julkisivun takana on ritarikunnan kultainen barokkisisus.

### Venetsia (38 sanaa)

Tervetuloa Venetsiaan. Ylhäältä kaupunki on punaisten kattojen tiivis saarirykelmä keskellä vaaleaa laguunia, ja sen halki kiemurtelee Canal Grande kuin suuri käänteinen S-kirjain. Kierros alkaa Pyhän Markuksen torilta, jonka itäpäässä basilikan kupolit kohoavat ja jonka laidalla seisoo korkea kellotorni.

### Vilna (38 sanaa)

Tervetuloa Vilnaan. Ylhäältä vanhakaupunki näyttää punaisten kattojen ja barokkitornien kirjavalta tilkkutäkiltä, joka levittäytyy metsäisten kukkuloiden väliin Neris- ja Vilnia-jokien yhtymäkohtaan. Kierros alkaa linnamäen juurelta Vilnan tuomiokirkolta, jonka valkoinen pylväikkö muistuttaa antiikin temppeliä ja jonka vieressä kohoaa erillinen kellotapuli.
