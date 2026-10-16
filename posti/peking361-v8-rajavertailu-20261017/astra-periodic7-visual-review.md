# #361 C7 — riippumaton visuaaliarvio

**HYLÄTTY kiveyksen materiaali- ja rajajatkuvuuden portissa.** C7 parantaa yksittäisten kivien luettavuutta ja poistaa V7:n laajan pehmeyden. Uusi pinta ei silti liity uskottavasti lähdekiveykseen: luonnollisen, epätasaisen kivipinnan vieressä uusi kiveys näyttää hyvin säännöllisiltä, lähes tasavärisiltä laatoilta. Rajakaista vaihtaa näiden kahden ilmeen välillä näkyvinä paloina. Lisääntynyt tarkkuus on todellinen parannus, mutta C7 ei vielä ole hyväksyttävä kokonaisuus.

## Katsottu näyttö

Luin AGENTS.md:n ja katsoin itse kaikki 30 actualGLB-renderöintiä alkuperäisessä 1600×900-koossa view_image-työkalulla. Juuri: `task361-v8-work/boundary-actual-renders-candidate7`; vaiheet: `before-v7` ja `after-v8-periodic7`. Mukana ovat kuusi kiinteää näkymää sekä `boundary-wide`, `boundary-close`, `boundary-side`, `interior-regression`, `north-boundary`, `south-boundary`, `northwest-corner`, `southwest-corner` ja `paving-top-repeat`.

Tarkistin kaikkien 30 kuvan SHA-256:n render-proof.jsonia vasten: ei eroja. Kuitin SHA-256 on `630a8193d1b6240c689bb0deb55739d90e621cd80404ce347dab1c8873dbf2e7`. Lisäksi katsoin muuttumattoman `gray-stone-slab-g31.png`:n ja C7:n `periodic-surface-candidate2/interior-albedo-lod0.jpg`:n. Päätös perustuu varsinaisiin mallikuviin; tekstuurit auttavat selittämään havaintoa.

Nämä ovat lähderenderöintejä erillisellä AO:lla, eivät Unity/Cesium-pelin tai muunnetun KTX2:n näyttöä. Vesi, cut, liike, LOD, pelimuisti, FPS ja omistajan hyväksyntä jäävät avoimiksi.

## Näkymäkohtainen tulos

| Näkymä | Havainto | Portti |
|---|---|---|
| boundary-close / wide | Ulompi lähdevaiheinen kaista jatkaa vanhaa kuviota paremmin kuin V7. Uusi sisäosa on nyt tarkka, mutta sen suorakaiteet ovat tasaisia, puhdasreunaisia ja pintarakenteeltaan huomattavasti lähdettä niukempia. | Hylätty materiaalijatkuvuudessa. |
| boundary-side | Vanhan pinnan rakeinen sävy, kuluneet reunat ja erilevyiset saumat vaihtuvat sileisiin suorakaiteisiin. Valikoidut lähdekivien palat näyttävät uusien laattojen päälle jätetyiltä näytepaloilta. | Hylätty; C4:n sumeusongelma on pienentynyt, tilalle jää materiaalin ero. |
| south-boundary | Vanha yläosa jatkuu ulkorajan yli, mutta noin y=350–550 näkyvä siirtymä paljastaa selvästi lähdekuvapalojen ja säännöllisen uuden kentän eron. Alaosan kivet ovat luettavia mutta liian tasapintaisia tähän naapuriin nähden. | Hylätty. |
| north-boundary | Entinen suora tarkka/sumea-raja noin y=400 on selvästi parempi. Katto peittää kuitenkin suuren osan kaistan sisäreunasta; vasemmalla näkyy pieni uuden tasaisen materiaalin alue. | Ulkorajassa parannus, koko pohjoisliittymän hyväksyntään riittämätön näkyvyys. |
| northwest-corner | Lähdekiveys kiertyy kulman ympäri paremmin. Sisäkulmassa erottuu molemmilta reunoilta sama laikukas materiaalivaihto. | Ei näkyvää uutta avointa kulmareikää, mutta materiaalijatkuvuus hylätty. |
| southwest-corner | Vanha kiveys jatkuu ulkopuolella, sisäpihan kulma erottuu sileämpänä ja värisoluiksi jakautuvana alueena. Siirtymäpaloja näkyy kahdella sivulla. | Hylätty materiaalijatkuvuudessa. |
| interior-regression | Tarkkuus ja rivien luettavuus paranevat. V7:n pehmeä, vaihteleva kivikenttä muuttuu kuitenkin huomattavan säännölliseksi, lähes graafiseksi laatoitukseksi. | Sisäosan materiaali-identiteetti muuttuu; tämä ei ole automaattisesti hyväksytty V7-suunnan säilytys. |
| paving-top-repeat | Tässä korkeassa kuvassa en erota selvää 30,4×32 m toistoruudukkoa tai saumoista muodostuvaa suurta laatikkoverkkoa. | Ei havaittua suurta toistovirhettä tässä stillissä; etäisyys ei todista toiston tai liikevälkkeen puuttumista. |
| taihedian | Etualan oikea puoli on tarkempi ja geometrisemman tasainen kuin vasen. Ero ei rajoitu kaikkein lähimpään kameraan. | Tukee materiaalijatkuvuuden hylkäystä. |
| ilma, aukio, beihai, jingshan, hutong_ilma | En näe selvää uutta suojatun ympäristön regressiota. Kiveyksen materiaaliero ei kaikissa kuvissa näy riittävässä koossa. | Rajallinen ympäristön regressiotarkistus. |

Tummat pitkät kulmikkaat viivat sekä sivukuvan ohut ulkoreunaviiva esiintyvät jo ennen-versiossa; en nimeä niitä C7:n uusiksi rei'iksi tai normaalivirheiksi. En myöskään päättele staattisista kuvista z-fightingia. Uusia selviä suuria väriruudukoita ei näy, mutta yksittäisten tasaväristen kivien voimakas säännöllisyys on eri asia kuin todistettu 32 m tekstuuriperiodin näkyminen.

## Raja, normaalit ja V7:n ilme

Kivien mittakaava ja pitkänomainen muoto ovat edelleen järkeviä. Aiemman lähdetekstuurin arvioni kanssa C7:n noin 0,946 m keskileveys ja 0,50 m rivijako eivät anna syytä pienentää kiviä sokkona. Ladontasuunnat näyttävät pääosin johdonmukaisilta näissä kuvissa; tarkka vyöhykekartoitus kuuluu Solin auditointiin.

Suurin jäljellä oleva ero on **kiven sisäinen pintavaihtelu, reunan luonnollinen epäsäännöllisyys ja sauman luonne**, ei kuvan kokonaissävy eikä yksin texelitiheys. Uuden kentän hillitty harmaan/ruskean paletti säilyy, mutta värivaihtelu näkyy pääasiassa kivien välisinä suorakaiteina. Luonnollinen vaihtelu yhden kiven sisällä ja sen reunan ympärillä jää lähteeseen nähden vähäiseksi. Tästä syntyy uuden sileän laatan vaikutelma.

G31 on rakeinen kivipinnan kuva ilman kivien välisiä saumoja. Sen 32×16 näytteistäminen yhden analyyttisen suorakaiteen sisään ei itsessään tuota lähteen kaltaista reunakulumaa, saumaleveyden vaihtelua tai kivien yksilöllisiä muotoja. C7:n albedo tukee samaa havaintoa kuin mallikuvat. Albedoon ei kannata vastata vain satunnaisen värikontrastin kasvattamisella: se korostaisi värilaattoja.

Sivukuvassa uusi pinta näyttää myös tasaisemmalta. Näyttö ei kuitenkaan erota albedon vaikutusta varmasti normaali- ja karheuskarttojen vaikutuksesta. En vahvista yksittäistä normal-kartan merkkivirhettä enkä hyväksy targetin tangenttikehystä. Kaistan data-PBR on sisäosaa karkeampi, ja Solin mukaan normal/MR eivät muuttuneet gen1→gen2. Niiden yhtenäisyys pitää arvioida myös muuttuvassa valossa ja varsinaisella vastaanottajan normaalikehyksellä. COLOR_0:n puuttuminen ei yksin selitä kiven reunan ja pintarakenteen puutetta, eikä makrovärin lisääminen ratkaisisi sitä.

## Seuraava rajattu suunta: kokonaan uusi muurattu kivitekstuuri

**Suosittelen seuraavaksi yhden kokonaan uuden AI-kiveyslähteen tekemistä, jossa on kivet ja niiden saumat yhtenä materiaalina.** En pidä kuvista todistettuna, että AI olisi ainoa mahdollinen menetelmä: vastaava voidaan rakentaa myös riittävän hyvällä materiaalimallilla. Näiden kierrosten jälkeen kokonaisen luonnollisen kivipinnan tuottaminen on kuitenkin perustellumpi seuraava kokeilu kuin uuden rakeisuuden tai keskimääräisen värin säätäminen samojen puhdasreunaisten solujen sisälle.

Tavoitteen tulee olla suoraan ylhäältä nähty, tasaisesti valaistu, saumattomaksi tarkoitettu luonnonkiveys: pitkänomaiset noin 2:1 kivet limittäisissä riveissä, hillitty harmaa/lämmin harmaa paletti, pienet yksilölliset muotoerot, hienoinen reunan kuluminen ja vaihteleva mutta kapea sauma. Ei voimakkaita halkeamia, suuria tahroja, kiiltoa, perspektiiviä, lavastettua valoa, suuntavarjoa tai maalattua ympäristön AO:ta. Muuttumatonta vanhaa lähdekuvaa voi käyttää luettavana mittakaavan ja materiaalin vertailuna. Uusi kuva tehdään kokonaan uutena; G31:tä tai aiempia generoituja RGB-kuvia ei muokata.

Ensin arvioidaan tämä uusi lähde alkuperäiskoossa sekä sen toisto ja alaspäin suodatettu ulkonäkö. AI:n ilmoitettu saumattomuus, kivimäärä tai perspektiivittömyys ei ole todiste; ne tarkistetaan. Fyysinen periodi sovitetaan toteutuneeseen kivimäärään ja tavoitekokoon. Kuvaa ei venytetä 30,4×32 metriin pelkästään nykyisen periodin säilyttämiseksi, jos sen toteutunut kiviverkko ei vastaa sitä. Uuden periodin toistoriski ja tavubudjetti tulevat silloin uudelleen tarkistettaviksi.

**Koko uuden kiviverkon on ohjattava myös uusia normal/MR-karttoja ja siirtymän valintaa.** Vanhan C7:n analyyttisiä soluja tai normaalisaumoja ei saa käyttää suoraan uuden RGB:n päällä: silloin albedon kiven halki voisi kulkea vanha kohosauma. Saumat ja kivien rajat tunnistetaan uudesta kokonaisesta lähteestä, ja uusi PBR-sarja tuotetaan niiden kanssa rekisteröitynä. Pelkkä albedon luminanssin tulkitseminen korkeudeksi ei todista oikeaa relieffiä, sillä mineraalin väri ei ole sama kuin korkeus.

Ulkorajalla säilyy lähdevaiheinen kaista. Kun uusi materiaali muistuttaa lähdettä aidosti myös reunoiltaan, siirtymän arvio on mielekkäämpi. Kuitenkin sekä vanhan että uuden kivirajoihin nähden mielivaltainen hard-cell-maskaus voi edelleen leikata kiviä. Uutta RGB:tä ei siksi pidä liittää nykyiseen valintamaskiin ja nimetä sitä valmiiksi rajakorjaukseksi. Siirtymä on kohdistettava varmennettuihin kivisaumoihin tai hylättävä näkyvän katkeamisen perusteella. Kaistan leventäminen tai sumennus eivät ole tämän materiaalieron oletuskorjaus.

Pidä seuraava tekninen kokeilu edelleen yhdessä pilotissa, samoilla kuvilla ja suojatuilla lähdepinneillä. Ensin uusi materiaalilähde ja rekisteröity PBR tarkistetaan, sitten actualGLB:n kolme reunaa, kaksi kulmaa ja sisäosa. Koko pakettia tai uusia karttoja ei hyväksytä etukäteen. Kuudella vakiokameralla säilytetään ympäristön vertailu. #362 ei tule mukaan.

## Teknisen auditin erillinen tila

Luin `sol-periodic7-geometry-audit.md`:n. Sen mukaan C7:n raakakoko on **164 084 512 B**, yläraja **164 326 250 B**, liikkumavara **241 738 B**. Suojatut lähdeaineistot säilyvät. Poistettuja mikrosiivukolmioita on 40/LOD ja mitattu actualXY-unionin menetys noin 2,33×10⁻¹¹ m². Materiaalin suunnan vyöhykkeisiin tehty 5 mm operaatio tuotti enintään noin 5,64 mm Hausdorff-eron; tämä koskee taiteellista UV-suuntaluokitusta, ei rakennusten tai maan peittoalan/korkeuksien muuttamista. Nämä ovat luetun lähdeauditin tietoja, eivät minun tekemäni uusi binaariauditointi.

Lisätekstuurien tekemisen lupa ei ole tavurajan ylityslupa. Luonnollisempi uusi tekstuuri voi pakkautua nykyisiä tasaisia soluja suuremmaksi, joten koko 72 GLB:n summa tarkistetaan uudestaan. Muunnettu KTX2, liike/LOD, muisti, ruutuaika, laitteen sekä omistajan hyväksyntä jäävät erillisiksi.

Kirjoitettu vain tämä MD/JSON-pari. Pythonin SHA-luku ajettiin ulkoisen launcherin kautta. Ei generointia, assetti-/lähdemuutoksia, Blenderiä, Gitiä, delegointia, automaatio-ohjausta tai vastaanottajaviestintää.
