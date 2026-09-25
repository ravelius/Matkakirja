## 2026-09-25 — SISÄLTÖKIRJURI → KUVAPUTKI: maakuntien pikkukuvat, 97 aluetta (löydös 115)

Omistajan löydös 115 (Fable, 25.9. klo 17.3x): maakunnan mini-inforuutuun (kartan Maakunnat-tila, `js/karttatyokalu-maakunnat.js`, `maakunnat-luonnehdinta`-laatikko) pieni kuva maakunnasta. Uusi kenttä `pikkukuva` jokaiseen `MAAKUNTIEN_LUONNEHDINNAT`-olioon (js/packs/maakunnat-luonnehdinnat.js).

### Tyylisääntö (sama kuin karttanostojen miniatyyreillä)

- Kuvassa on YKSI TUNNUSMAISEMA TAI -RAKENNUS alueelta, tasaisella paperitaustalla, joka leikataan pois: läpinäkyvä webp (RGBA), kohteen ympärillä läpinäkyvää pohjaa. EI maalattua taustaa, taivasta tai maisemaa kohteen ympärillä.
- 512×512, akvarelli/seepia-luonnostyyli kuten muutkin miniatyyrit. Malli: assets/kartat/miniatyyrit/ateena-akropolis.webp.
- Vartija tests/miniatyyrit-leikkaus.test.mjs -tyylinen (täyttö < 0,6, reuna ≤ 0,35) laajennetaan kattamaan myös nämä — Sisältökirjuri hoitaa sen kun ensimmäiset kuvat tulevat.
- Tiedostopolku: `assets/kartat/maakunnat/<ISO>-<slug>.webp` (slug = tunnus pienellä, ASCII, väliviivat, esim. `fra-hauts-de-france.webp`, `esp-castilla-y-leon.webp`). Ei ämpäritunnuksia tässä vaiheessa.
- Valitse kohde `Lyhyt`-sarakkeen kontekstista (mitä alueen luonnehdinta jo kertoo) TAI alueen tunnetuimmasta maamerkistä/maisemasta, jos lyhyt-teksti ei anna selkeää kohdetta. Älä toista saman maan jo olemassa olevien karttanostojen tai lehtien kuvia samalla aiheella, jos vältettävissä.

### Järjestys ja laajuus (Fable 25.9., vahvistettu)

FRA → ESP → ITA → GBR (56 aluetta, isoisän reitin ydinmaat) ensin, sitten DEU → POL → AUT (41). Toimita maa kerrallaan, jotta Siirtoseppä voi viedä paketin sitä mukaa. **GRC ei ole tässä tilauksessa** — sen maakuntien luonnehdinnat (13 aluetta) tehdään ensin erikseen, kuvat vasta sen jälkeen.

Yhteensä tässä tilauksessa: 97 kuvaa.


### FRA (13)

| Tunnus | Nimi | Lyhyt (konteksti) |
| --- | --- | --- |
| Hauts-de-France | Hauts-de-France | Lillestä pääsee junalla alle tunnissa Brysseliin ja reilussa tunnissa Lontooseen – rajat tuntuvat kadonneen. |
| Grand Est | Grand Est | Strasbourgissa istuu Euroopan parlamentti, ja kaupungin joulumarkkinat vetävät väkeä joka puolelta Eurooppaa. |
| Provence-Alpes-Côte-d'Azur | Provence-Alpes-Côte-d'Azur | Nizzan rantabulevardilla kävelee kesällä koko Eurooppa, ja Cannesin punainen matto rullataan joka toukokuu. |
| Auvergne-Rhône-Alpes | Auvergne-Rhône-Alpes | Lyon tunnetaan Ranskan gastronomian pääkaupunkina – täältä ei lähdetä nälkäisenä minnekään! |
| Nouvelle-Aquitaine | Nouvelle-Aquitaine | Bordeaux on viinin maailmanpääkaupunki, ja kaupungin raitiovaunut kulkevat kaduilla ilman näkyviä ilmajohtoja. |
| Occitanie | Occitanie | Toulousessa kootaan jättiläismäisiä Airbus-matkustajakoneita – tehtaan vierestä näkee yhden nousevan taivaalle. |
| Bourgogne-Franche-Comté | Bourgogne-Franche-Comté | Comté-juusto kypsyy täällä kalkkikiviluolissa jopa kolme vuotta ennen kuin se päätyy kauppoihin. |
| Pays de la Loire | Pays de la Loire | Nantesin kaduilla kävelee mekaaninen jättiläiselefantti, jonka selkään pääsee kiipeämään ihan oikeasti. |
| Bretagne | Bretagne | Bretagnessa syödään galetteja joka kulmalla – suolainen tattaripannukakku on täällä aivan arkiruokaa. |
| Normandie | Normandie | Normandiassa omenat päätyvät harvoin vain hillopurkkiin – niistä tislataan väkevää kalvadosia. |
| Corse | Corse | Korsikalla vuoret syöksyvät suoraan mereen, ja saaren oma kieli kaikuu toreilla ranskan rinnalla. |
| Centre-Val de Loire | Centre-Val de Loire | Loiren laaksossa kohoaa yhä satoja linnoja, ja Chambordin katolla riittää torneja ihmeteltäväksi tunneiksi. |
| Île-de-France | Île-de-France | Pariisin seudulla asuu yli kaksitoista miljoonaa ihmistä, ja RER-juna vie keskustasta lentokentälle tunnissa. |

### ESP (19)

| Tunnus | Nimi | Lyhyt (konteksti) |
| --- | --- | --- |
| Castilla y León | Kastilia ja León | Salamancan satoja vuosia vanha yliopisto opettaa Kastilja ja Leónissa samoissa keskiaikaisissa kivisaleissa. |
| Andalucía | Andalusia | Andalusia on maailman suurin oliiviöljyn tuotantoalue – oliivipuiden rivit jatkuvat horisonttiin asti. |
| Castilla-La Mancha | Kastilia-La Mancha | Consuegran kylässä pyörivät yhä oikeat tuulimyllyt, jotka tekivät La Manchan tasangosta maailmankuulun. |
| Aragón | Aragonia | Aragonian Pyreneiden rinteet täyttyvät joka talvi laskettelijoista, kun alueen hiihtokeskukset avaavat ovensa. |
| Extremadura | Extremadura | Harvaan asuttu Extremadura on yksi Euroopan parhaista tähtitaivaan katselupaikoista pimeiden, tähtikirkkaiden öidensä ansiosta. |
| Cataluña | Katalonia | Barcelonan entiseen tehdaskortteliin syntynyt 22@-kaupunginosa on tehnyt siitä Espanjan vilkkaimman teknologiakeskuksen. |
| Galicia | Galicia | Santiago de Compostelaan saapuu satoja tuhansia pyhiinvaeltajia vuosittain pitkin Camino de Santiago -reittiä. |
| Valenciana | Valencia | Valencian Tiedeteiden kaupungin valkoiset, valaan luita muistuttavat rakennukset ovat nousseet kaupungin tunnusmerkiksi. |
| Asturias | Asturia | Asturialaisissa siiderikapakoissa siideri kaadetaan perinteisesti korkealta lasiin, jotta juoma saa raikkaan poreensa. |
| Murcia | Murcia | Murciaa kutsutaan Euroopan vihanneskaapiksi, sillä sen aurinkoiset pellot tuottavat hedelmiä ja vihanneksia ympäri mannerta. |
| Foral de Navarra | Navarra | Pamplonassa juostaan heinäkuussa sonnien edellä San Fermín -juhlan aikana, joka tunnetaan ympäri maailman. |
| Madrid | Madrid | Madrid on kasvanut Etelä-Euroopan vilkkaimmaksi startup-keskukseksi, jonne uusia yrityksiä perustetaan joka viikko. |
| País Vasco | Baskimaa | Bilbaon Guggenheim-museo muutti savuisen teollisuuskaupungin maailmankuuluksi arkkitehtuuri- ja designkohteeksi. |
| Canary Is. | Kanariansaaret | Kanariansaarten kirkas ja pilvetön taivas tekee Teneriffasta ja La Palmasta maailman arvostetuimpia tähtitieteen tutkimuspaikkoja. |
| Cantabria | Kantabria | Altamiran luolan kalliomaalaukset Kantabriassa tunnetaan lempinimellä esihistorian Sikstuksen kappeli. |
| La Rioja | La Rioja | La Riojan Harossa kastellaan kesäkuussa toisiaan punaviinillä Batalla del Vino -juhlassa, joka värjää koko kaupungin viininpunaiseksi. |
| Islas Baleares | Baleaarit | Baleaareilla peritään nykyään matkailijoilta ympäristömaksua, jolla suojellaan saarten luontoa massaturismin paineessa. |
| Ceuta | Ceuta | Ceuta on Espanjan alue Pohjois-Afrikassa – yksi EU:n vain kahdesta maarajasta Afrikkaan, vartioidun raja-aidan takana. |
| Melilla | Melilla | Melillassa on Barcelonan jälkeen Espanjan toiseksi eniten modernistisia rakennuksia, vaikka kaupunki sijaitsee Pohjois-Afrikassa. |

### ITA (20)

| Tunnus | Nimi | Lyhyt (konteksti) |
| --- | --- | --- |
| Piemonte | Piemonte | Nykyään tunnetaan Barolon ja Barbarescon viinimäistä sekä Bra-kaupungista, josta koko Slow Food -liike sai alkunsa 1980-luvulla. |
| Lombardia | Lombardia | Milano on Italian muoti- ja pörssikeskus, mutta koko Po-tasanko tahkoaa maan vilkkainta teollisuutta. |
| Sicily | Sisilia | Etna kohoaa savuten saaren yllä, ja sen tulinen tuhka pitää rinteiden appelsiiniviljelmät poikkeuksellisen antoisina. |
| Toscana | Toscana | Chianti-mäkien viinitilat ja agriturismot elävät nyt yhtä paljon matkailijoista kuin rypäleistä. |
| Emilia-Romagna | Emilia-Romagna | Parman kinkku ja Modenan balsamico kypsyvät täällä edelleen, mutta Maranellon tehtaalta lähtee nykyään myös Ferrari. |
| Sardegna | Sardinia | Ogliastran vuoristokylät ovat yksi maailman harvoista sinisistä vyöhykkeistä, joissa ihmiset elävät poikkeuksellisen pitkään. |
| Veneto | Veneto | Venetsia kelluu turistivirrassa, mutta maaseudulla mäet täyttyvät nykyään prosecco-viinitarhoista. |
| Apulia | Apulia | Alberobellon kartiokattoiset trullit ja loputtomat oliivitarhat tekevät Apuliasta Italian nousevan matkailuosavaltion. |
| Lazio | Lazio | Rooma on Italian pääkaupunki ja hallinnon sydän, ja Vatikaani vetää keskustaan miljoonia kävijöitä vuosittain. |
| Trentino-Alto Adige | Trentino-Alto Adige | Alueella puhutaan saksaa ja italiaa rinnakkain, ja laaja itsehallinto pitää Dolomiittien hiihtokeskukset kukoistavina. |
| Calabria | Calabria | Reggio Calabrian ympärillä kasvatetaan lähes koko maailman bergamottia, jota käytetään muun muassa Earl Grey -teessä. |
| Campania | Campania | Napolista alkanut pizza elää vilkkaana katukeittiöissä ja pizzerioissa savuavan Vesuviuksen juurella. |
| Abruzzo | Abruzzo | Abruzzon kansallispuisto suojelee nykyään Euroopan harvinaisinta karhua, Marsican ruskeakarhua, sukupuutolta. |
| Basilicata | Basilicata | Matera muutti luolakaupunkinsa hotelleiksi ja gallerioiksi, ja siitä tuli 2019 Euroopan kulttuuripääkaupunki. |
| Marche | Marche | Adrianmeren rannikkokaupungit valmistavat kenkiä ja huonekaluja, jotka päätyvät kauppoihin ympäri Eurooppaa. |
| Umbria | Umbria | Assisin pyhiinvaeltajavirta jatkuu yhä, ja vihreäksi sydämeksi kutsuttu Umbria on Keski-Italian ainoa maakunta ilman merenrantaa. |
| Friuli-Venezia Giulia | Friuli-Venezia Giulia | Triesten satama toimii Euroopan suurimpana kahvin tuontiväylänä, vaikka alue ei kasvata papua grammaakaan. |
| Liguria | Liguria | Cinque Termen kylät ripustautuvat kallioihin turistien iloksi, ja Genovan satamasta lähtee pesto maailmalle. |
| Molise | Molise | Toiseksi pienin maakunta tyhjenee hitaasti nuorista, mutta se on ylpeä 'Molisea ei ole olemassa' -vitsistään. |
| Valle d'Aosta | Aostanlaakso | Kaksikielinen ranskaa ja italiaa puhuva vuoristoalue elää nykyään Mont Blancin hiihtomatkailusta ja laajasta itsehallinnostaan. |

### GBR (4)

| Tunnus | Nimi | Lyhyt (konteksti) |
| --- | --- | --- |
| England | Englanti | Lontoossa kuulee kadulla yli 300 kieltä – kaupunki on yhä maailman vilkkaimpia rahoitus- ja kulttuurikeskuksia! |
| Scotland | Skotlanti | Skotlannissa viski ei ole vain juoma vaan koko identiteetti: tislaamoja on yli sata, ja moni kylä elää niistä. |
| Wales | Wales | Walesissa aiempaa useampi lapsi opiskelee kokonaan kymriksi – kieli elää uudestaan koulujen ja television kautta. |
| Northern Ireland | Pohjois-Irlanti | Belfastin entinen telakka-alue, jossa rakennettiin Titanic, on nyt vilkas kaupunginosa museoineen ja toimistoineen. |

### DEU (16)

| Tunnus | Nimi | Lyhyt (konteksti) |
| --- | --- | --- |
| Sachsen | Saksi | Leipzig sykkii nyt musiikista ja startupeista, ja kevään kirjamessut täyttävät kadut lukijoista! |
| Bayern | Baijeri | München yhdistää nykyään Oktoberfest-perinteen ja huipputeknologian – BMW:n tehtaat hurisevat keskustan kupeessa. |
| Rheinland-Pfalz | Rheinland-Pfalz | Mosel- ja Rheinjoen rinteillä viljellään uskomattoman jyrkkiä viinitarhoja, joista osa vaatii köysiä työntekoon. |
| Saarland | Saarland | Saarbrücken tuntuu vähän Ranskalta – täällä syödään croissantteja ja puhutaan murteessa ranskaa sekaan. |
| Schleswig-Holstein | Schleswig-Holstein | Kahden meren välissä tuulimyllyt pyörivät joka suuntaan – tuulivoima on täällä arkipäivää, ei erikoisuus. |
| Niedersachsen | Ala-Saksi | Wolfsburgissa Volkswagenin tehdas on kaupungin sydän – koko kaupunki tuntuu rakentuneen autotehtaan ympärille. |
| Nordrhein-Westfalen | Nordrhein-Westfalen | Ruhrin alueen entiset kaivokset ovat nyt taidemuseoita ja konserttisaleja – teollisuusromantiikka vetää turisteja. |
| Baden-Württemberg | Baden-Württemberg | Stuttgartissa Mercedes-Benzin tehtaat hurisevat keskustan kupeessa – autoteollisuus on täällä lähes uskonto. |
| Brandenburg | Brandenburg | Potsdamin palatsit ja puistot ympäröivät Berliiniä kuin vihreä rengas – Sanssouci vetää päivämatkalaisia täyteen. |
| Mecklenburg-Vorpommern | Mecklenburg-Etu-Pommeri | Itämeren rannalla on Saksan hiljaisimmat rannat – Rügenin liidukalliot vetävät kesäisin väkeä valokuvaamaan. |
| Bremen | Bremen | Bremenin kaupunginmuusikot seisovat raatihuoneen kupeessa, ja Weserin satama on yhä kaupungin elinehto. |
| Hamburg | Hampuri | Hampurin uusin maamerkki on Elbphilharmonia – aaltoileva konserttitalo kohoaa sataman yllä ja vetää kuulijoita ympäri maailmaa! |
| Hessen | Hessen | Frankfurtin pilvenpiirtäjät kohoavat keskellä Saksaa – täällä lyödään Euroopan keskuspankin rahapäätökset. |
| Thüringen | Thüringen | Thüringenin metsät peittävät suuren osan maakunnasta – siksi sitä kutsutaan Saksan vihreäksi sydämeksi. |
| Sachsen-Anhalt | Saksi-Anhalt | Dessaussa Bauhaus-rakennukset seisovat pystyssä – muotoilukoulun perintö näkyy koko kaupunkikuvassa. |
| Berlin | Berliini | Berliinin yöelämä on legendaarista – klubit, kuten Berghain, aukeavat vasta puolilta öin ja pyörivät päivään asti! |

### POL (16)

| Tunnus | Nimi | Lyhyt (konteksti) |
| --- | --- | --- |
| Masovian | Masovia | Varsova on nykyään vilkas pääkaupunkiseutu, jossa pilvenpiirtäjät kohoavat Kulttuuripalatsin viereen ja bisnes sykkii ympärivuorokautisesti. |
| Greater Poland | Suur-Puola | Poznańissa messuhallit täyttyvät vuosittain, sillä kaupunki on yhä Puolan vilkkain kauppa- ja messukaupunki. |
| Warmian-Masurian | Varmia-Masuria | Tuhannen järven maakunta elää purjeveneistä ja kesämökkeilijöistä, jotka täyttävät Masurian vesistöt kesäisin. |
| West Pomeranian | Länsi-Pommeri | Szczecin on satamakaupunki, jonka telakat ja Odra-joen suisto pitävät merenkulun arjen keskiössä. |
| Lublin | Lublin | Itäinen Lublinin seutu on Puolan vihannestarha: pellot ja hedelmätarhat ulottuvat horisonttiin asti. |
| Podlachian | Podlasia | Podlasiessa villi luonto voittaa: Białowieżan aarnimetsässä vaeltaa Euroopan viimeisiä visenttejä. |
| Pomeranian | Pommeri | Gdańsk elää Itämeren rannasta kiinni, ja vanha telakka-alue on nyt taidetta ja tapahtumia täynnä. |
| Lower Silesian | Ala-Sleesia | Wrocławin vanhaakaupunkia kiertäessä kannattaa laskea pronssisia patsaskääpiöitä, niitä piiloutuu satoja kadunkulmiin. |
| Łódź | Łódź | Entiset tehdashallit ovat Łódźissa nyt ostoskeskuksia ja gallerioita, ja kaupunki tunnetaan elokuvakoulustaan. |
| Kuyavian-Pomeranian | Kujavia-Pommeri | Toruńissa leivotaan perinteisiä piparkakkuja, ja Kopernikuksen syntymäkaupunki elää tiedehistoriastaan. |
| Subcarpathian | Podkarpackie | Rzeszówin seutua kutsutaan Lentolaaksoksi, sillä ilmailuteollisuus työllistää alueella tuhansia. |
| Lesser Poland | Vähä-Puola | Kraków on Puolan turistimagneetti, jonka vanhakaupunki ja Wawel täyttyvät kävijöistä ympäri vuoden. |
| Lubusz | Lubuskie | Zielona Góra on Puolan viinialuetta, ja rajaseutu Saksaan näkyy arjessa ja kaupassa. |
| Silesian | Sleesia | Katowicen ympäristössä hiilikaivokset vaihtuvat hiljalleen kulttuuriin, kuten NOSPR-konserttitaloon. |
| Świętokrzyskie | Świętokrzyskie | Kielcen seudulla kohoavat Pyhänristinvuoret, Puolan vanhimmat ja kuluneimmat tunturit. |
| Opole | Opole | Opole on Puolan vähäväkisin voivodikunta, hiljainen seutu jossa saksankielinen vähemmistö on näkyvä. |

### AUT (9)

| Tunnus | Nimi | Lyhyt (konteksti) |
| --- | --- | --- |
| Niederösterreich | Ala-Itävalta | Wienin ympärillä leviää Ala-Itävalta, jonka Wachaun jokilaakso on täynnä viinitarhoja aina Tonavan rantaan asti. |
| Steiermark | Steiermark | Steiermarkia kutsutaan Itävallan vihreäksi sydämeksi – täällä kurpitsansiemenöljy on lähes joka ruoan mauste. |
| Tirol | Tiroli | Tirolissa vuoret määräävät arjen: Innsbruckista pääsee hiihtämään tunnissa, ja moni asukas tekee sen töiden jälkeen. |
| Oberösterreich | Ylä-Itävalta | Linzin tehdaskaupunki on muuttunut digitaalisen taiteen keskukseksi, kun Ars Electronica täyttää kadut valoilla. |
| Kärnten | Kärnten | Kärntenin kirkkaat vuoristojärvet, etenkin Wörthersee, täyttyvät kesäisin uimareista ja purjelautailijoista. |
| Salzburg | Salzburg | Salzburgin vanhakaupunki elää yhä Mozartista: kesän musiikkijuhlat täyttävät torit ja kirkot joka ilta. |
| Burgenland | Burgenland | Burgenland on Itävallan nuorin osavaltio, ja Neusiedler-järven ruovikot ovat nyt Euroopan tärkeimpiä lintualueita. |
| Vorarlberg | Vorarlberg | Vorarlbergissa tekstiiliteollisuuden perintö näkyy nyt rohkeana arkkitehtuurina, josta Bregenzerwaldin kylät ovat kuuluisia. |
| Wien | Wien | Wien nousee joka vuosi maailman parhaiten asuttavien kaupunkien kärkeen – kahvilakulttuuri on siihen yksi syy. |

### Toimitus

- Uudet webp-tiedostot `assets/kartat/maakunnat/`-kansioon PR:ään, maa kerrallaan (esim. yksi PR per maa tai muutaman maan erä, kuten kohtauskuva-tilauksessa). Avaa PR, jätä auki, älä mergeä — Julkaisija ottaa sen junaan.
- Lisää samassa PR:ssä `js/packs/maakunnat-luonnehdinnat.js`:ään kunkin alueen olioon kenttä `pikkukuva: 'assets/kartat/maakunnat/<tiedosto>.webp'` (rakenne kuten `kuva`-kenttä samassa tiedostossa, mutta merkkijono ei taulukko — vain tämä yksi pieni leikattu kuva).
- Kirjoita tähän postilaatikkoon rivi "PR #n valmis junaan" (mainitse maa/maat ja aluemäärä).
- Sisältökirjuri kirjoittaa vartijatestin ensimmäisen erän saavuttua ja ilmoittaa, jos jokin kuva ei läpäise sitä.

### Lisäys 25.9. ilta: GRC mukaan heti 7 maan perään

Fable vahvisti: GRC:n maakuntarajat ovat Karttasepän 2026-09-25a-vektoreissa ja sisältöpaketti 1.42:ssa (tuotantoon build 15:n jälkeen) — pelkkä tools/vienti/maakuntarajat.json on vanha webin 128 alueen tiedosto eikä sitä tarvitse odottaa. GRC:n 14 maakunnan luonnehdinnat ovat nyt tekstinä (PR #3219, js/packs/maakunnat-luonnehdinnat.js). Sama tyylisääntö ja polkukaava kuin yllä (assets/kartat/maakunnat/grc-<slug>.webp). Järjestys: GRC heti FRA→ESP→ITA→GBR-erän jälkeen, ennen DEU→POL→AUT.


### GRC (14)

| Tunnus | Nimi | Lyhyt (konteksti) |
| --- | --- | --- |
| Attiki | Attiki | Ateenan Akropolis kohoaa yhä keskustan yllä, mutta rannikolla Ateenan Riviera houkuttelee uimaan aivan kaupungin kupeessa. |
| Kentriki Makedonia | Keski-Makedonia | Thessaloniki on Kreikan toiseksi suurin kaupunki, ja sen rantabulevardilla Valkoinen torni katsoo yhä Thermaisenlahdelle. |
| Kriti | Kreeta | Kreeta on Kreikan suurin saari, ja sen vuoristoisella Samarian rotkolla vaeltaa tuhansia retkeilijöitä joka kesä. |
| Peloponnisos | Peloponnesos | Korinton kanava halkaisee Peloponnesoksen niemimaan kapeasta kannaksesta, ja sillalta autoilijat katsovat yli 70 metriä alas. |
| Thessalia | Thessalia | Thessalian pystyjen kalliopylväiden laella kohoavat Meteoran luostarit, joihin munkit kiipesivät ennen tikapuilla ja köysillä. |
| Ipeiros | Epeiros | Epeiroksen Vikosin rotko on maailman syvimpiä suhteessa leveyteensä, ja sen reunoilla vanhat kivikylät ovat yhä asuttuja. |
| Dytiki Makedonia | Länsi-Makedonia | Kastorian kaupunki kiertää turkiskaupasta vaurastuneen järven ympäri, ja talvisin sen kapea niemi peittyy usein usvaan. |
| Dytiki Ellada | Länsi-Kreikka | Rio–Antirrion silta yhdistää Peloponnesoksen manner-Kreikkaan, ja Patran karnevaali on koko maan suurin katujuhla. |
| Stereá Elláda | Keski-Kreikka | Delfoin oraakkelin rauniot kohoavat Parnassosvuoren rinteellä – antiikin kreikkalaiset pitivät paikkaa maailman napana. |
| Anatoliki Makedonia kai Thraki | Itä-Makedonia ja Traakia | Traakiassa asuu Kreikan suurin muslimivähemmistö, ja rajajoki Evros erottaa alueen naapurimaasta Turkista. |
| Ionioi Nisoi | Jooniansaaret | Korfun venetsialaistyylinen vanhakaupunki on Unescon listalla, ja Joonianmeren saaristo makaa Kreikan läntisimpänä. |
| Notio Aigaio | Etelä-Egean saaret | Etelä-Egean saariin kuuluvat sekä Santorinin tulivuorikaldera että Rodoksen keskiaikainen ritarilinnoitus. |
| Voreio Aigaio | Pohjois-Egean saaret | Lesboksen saaren kivettynyt metsä on yli 20 miljoonaa vuotta vanha, ja saari tunnetaan yhä anisviina ouzon tislauksesta. |
| Ayion Oros | Athos | Athosvuoren munkkitasavaltaan pääsee vain erityisluvalla, eivätkä naiset saa astua sen maaperälle lainkaan. |

