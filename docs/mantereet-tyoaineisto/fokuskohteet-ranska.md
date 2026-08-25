# Ranskan fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin. Kaikki tiedot koottu 25.8.2026.
Sisarpaperit: docs/mantereet-tyoaineisto/fokuskohteet-italia.md ja
fokuskohteet-kreikka.md, joiden rakennetta tämä noudattaa.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohdat
KOHDEKOROSTUS ja ETENEMINEN): pelilaattojen lisäksi fokusnäkymän
kartalla näkyy muita kaupunkeja, jokia, järviä ja vuoria; aarteen
löydyttyä niitä voi klikata, jolloin kartta korostaa juuri sen kohteen
niukalla taustalla ja avaa pienen pop-up-tietoruudun. Tämä dokumentti
on faktapohja niille pop-up-teksteille — ei lopullista pelitekstiä
eikä UI-suunnitelmaa.

## Ranskan pelilaatat — mitä kartalla JO on

js/packs/europe.js: Ranskan pelattavat laatat ovat **Pariisi** (256,
609) ja **Marseille** (312, 744). Naapurilaatta **Alpit** on
europe-countries.js:n mukaan Sveitsi (CHE), ei Ranska. Alla olevat
kohteet on valittu niin, ETTEIVÄT ne ole pelilaattoja: yksikään ei ole
Pariisi eikä Marseille. Chamonix mainitaan kohteessa 1 vain Mont
Blancin sijainnin kuvaajana.

Maailmankartalla (js/packs/maailmankartta.js) Pariisi on kaupunkina
`{"id":"pariisi","name":"Pariisi","wiki":"Pariisi","x":5911.1,
"y":1440.1}` ja CITY_COUNTRY liittää sen tunnukseen **FRA**; samassa
tiedostossa FRA:han on liitetty myös Cayenne ja Nouméa (merentakaiset
alueet) — nämä eivät kuulu tälle listalle, joka koskee Manner-Ranskaa
ja Korsikaa.

## Päällekkäisyys jo julkaistun sisällön kanssa

js/packs/maa-kategoriat.js, avain `FRA`, sisältää jo nostot
**Lascaux'n luolasta**, **Bayeux'n seinävaatteesta**, **Bastiljista**,
**Sainte-Chapellesta**, **Roquefortista**, **Pilat'n dyynistä**,
**camarguenhevosesta**, **Chaîne des Puys'stä**, **Mont-Saint-Michelin
vuorovedestä** ("Meri palaa saaren ympärille") ja **Lumièren
veljeksistä**. Nämä on otettu huomioon kohteittain: päällekkäiset
aiheet on joko jätetty pois (Lascaux, Pilat, Chaîne des Puys) tai
kirjoitettu **eri kulmasta** kuin lehdessä oleva nosto (kohteet 2, 10
ja 12) — merkintä kohdan lopussa.

## Tarkistustapa

- **Koordinaatit:** en-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates`, `redirects=1`), haettu 25.8.2026
  Noden `fetch`illä (`NODE_USE_ENV_PROXY=1`) User-Agent-otsakkeen
  kanssa. EI yhtään koordinaattia muistista. Kaksi koordinaattia on
  tarkoituksella likiarvoja (Loire = joen suu, Korsika = saaren
  keskipiste) — merkitty kohteittain.
- **Popup-faktat:** en-Wikipedian artikkeleista
  (`prop=extracts&explaintext=1`). Jokaisen kohdan alla on artikkeli JA
  se kappale tai osio, johon väite nojaa.
- **Suomenkieliset nimet:** tarkistettu fi-Wikipediasta
  (`titles=...&redirects=1`). Kolme tarkennusta löytyi: **Mont
  Saint-Michel** (ilman ensimmäistä väliviivaa), **Versailles'n
  palatsi** (heittomerkillä) ja se, ettei Verdonin rotkosta ole
  fi-artikkelia lainkaan — merkitty kohteittain.
- **Kuvat:** jokaisen ehdotetun TIEDOSTON olemassaolo, koko, lisenssi,
  tekijä ja `Restrictions`-kenttä on kysytty Commonsin
  `imageinfo`-rajapinnalla. Ei arvattuja tiedostonimiä. Kaikkien
  Restrictions-kenttä oli tyhjä. Kaikki ehdotetut ovat PD, CC0 tai
  CC BY / CC BY-SA; tekijä on merkitty, koska CC BY vaatii maininnan.
- **HERKKYYS-merkinnät:** kolmessa kohteessa (1, 13, 10) on aiheita,
  jotka vaativat sanamuodon harkintaa. Ne on merkitty erikseen.

---

## Kohteet

### 1. Mont Blanc

- **Nimi:** Mont Blanc (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** vuori.
- **Koordinaatit:** 45,8328°N, 6,865°E — en-Wikipedia "Mont Blanc".
- **Popup-teksti (n. 430 merkkiä):**

  > Alppien korkein huippu, 4 807 metriä, kohoaa tasan Ranskan ja
  > Italian rajalla. Ensimmäisinä sen huipulle nousivat 8. elokuuta
  > 1786 kristallinetsijä Jacques Balmat ja lääkäri Michel-Gabriel
  > Paccard — sitä pidetään koko vuorikiipeilyn alkuhetkenä.
  > Ensimmäinen huipulle noussut nainen oli Marie Paradis vuonna 1808.
  > Vuonna 1891 huipulle yritettiin rakentaa tähtitornia: Gustave
  > Eiffel lupasi tehdä sen, jos kallio löytyy alle kahdentoista metrin
  > syvyydestä jään alta. Kaivettiin kaksi 23 metrin tunnelia. Kalliota
  > ei löytynyt, ja hanke haudattiin.

- **Lähde:** en-Wikipedia "Mont Blanc", johdanto ("rising 4,807.3 m
  above sea level, located right at the Franco-Italian border") sekä
  osiot ensinousuista ("The first recorded ascent... was on 8 August
  1786 by Jacques Balmat and the doctor Michel-Gabriel Paccard... The
  first woman to reach the summit was Marie Paradis in 1808") ja
  Eiffelin observatoriohankkeesta ("Gustave Eiffel agreed to take on
  the project, provided he could build on a rock foundation if found at
  a depth of less than twelve metres below the ice. In 1891, the Swiss
  surveyor Imfeld dug two 23-metre horizontal tunnels... but found
  nothing solid. Consequently, the Eiffel project was abandoned").
- **Kuva:** Commons **Alpinistes Aiguille du Midi 03.JPG** (2592×2978,
  CC BY-SA 3.0, Benh LIEU SONG, 2007) — kiipeilijöitä harjanteella.
  Vaihtoehto laajaan asetteluun: **Massif du Mont-Blanc from Lac de
  Joux Plane 05.jpg** (13739×3730, CC BY-SA 4.0, Krzysztof Golik,
  2020) — erittäin leveä panoraama, sopii vain kaistaleeksi.
- **HERKKYYS:** Mont Blancin tunnelissa paloi vuonna 1999 rekka ja 39
  ihmistä kuoli. Se on merkittävä tosiasia, mutta ei kuulu tähän
  popupiin. Korkeuslukema vaihtelee vuosittain lumen mukaan (2002:
  4 807,40 m; 2003: 4 808,45 m) — käytä muotoa "noin 4 800 metriä" tai
  virallista 4 807:ää.

### 2. Mont Saint-Michel

- **Nimi:** Mont Saint-Michel (fi-Wikipedia; **huom**, fi-artikkelissa
  ei ole ensimmäistä väliviivaa, toisin kuin ranskaksi ja englanniksi).
- **Tyyppi:** vuorovesisaari ja luostari.
- **Koordinaatit:** 48,636°N, -1,511°E — en-Wikipedia "Mont-Saint-Michel".
- **Popup-teksti (n. 450 merkkiä):**

  > Seitsemän hehtaarin graniittiluoto kilometrin päässä rannasta.
  > Vuorovesi vaihtelee noin neljätoista metriä, ja keskiajan pyhiinvaeltajat
  > antoivat paikalle nimen "Pyhä Mikael meren vaarassa". Luostari kesti
  > satavuotisen sodan valloittamattomana, ja Ludvig XI teki siitä
  > vankilan. Vuonna 1879 saarelle rakennettiin korotettu pengertie,
  > joka pysäytti veden virtauksen ja alkoi liettää lahtea. Vuonna 2009
  > aloitettiin pato- ja siltahanke, jonka tarkoitus oli tehdä
  > Mont Saint-Michelistä taas saari. Saaren asukasluku vuonna 2023: 23.

- **Lähde:** en-Wikipedia "Mont-Saint-Michel", johdanto ja osiot
  vuorovedestä ja yhteydestä mantereeseen ("The tides vary greatly, at
  roughly 14 metres between highest and lowest water marks. Popularly
  nicknamed 'St. Michael in peril of the sea'"; "The island remained
  unconquered during the Hundred Years' War... Louis XI... turned it
  into a prison"; "Previously connected by tidal causeway uncovered
  only at low tide, this was converted into a raised causeway in 1879,
  preventing the tide from scouring the silt"; "As of 2023, the island
  has a population of 23").
- **Kuva:** Commons **Mont-Saint-Michel vu du ciel.jpg** (4000×2250,
  CC BY-SA 4.0, Amaustan, 2018) — ilmakuva. Vaihtoehto:
  **Mont Saint-Michel, France ESA394286.jpg** (5266×4258,
  CC BY-SA 3.0 igo, European Space Agency, 2018) — satelliittikuva.
- **PÄÄLLEKKÄISYYS:** maa-kategoriat.js:n FRA-nosto "Meri palaa saaren
  ympärille" kertoo jo vuorovedestä. Tämä popup on kirjoitettu eri
  kulmasta: **1879 rakennettu pengertie ja sen seuraus** eli se, että
  saaresta tuli melkein niemi ja se piti korjata takaisin saareksi.

### 3. Loire

- **Nimi:** Loire (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** joki.
- **Koordinaatit:** 47,2692°N, -2,1858°E — en-Wikipedia "Loire".
  **HUOM:** rajapinnan antama piste on joen **suu** Atlantilla, ei
  keskikohta eikä lähde. Jos kartalla halutaan Loiren laakso, käytä
  Chambordin koordinaatteja (kohde 4) tai piirrä joki viivana.
- **Popup-teksti (n. 400 merkkiä):**

  > Ranskan pisin joki, 1 006 kilometriä. Se saa alkunsa Massif
  > Centralin Cévennes-vuorilla noin 1 350 metrin korkeudelta, virtaa
  > ensin pohjoiseen Orléansiin ja kääntyy siellä länteen kohti
  > Atlanttia. Loiren valuma-alue on yli viidesosa koko Ranskasta,
  > mutta sen keskivirtaama on vain puolet Rhônen virtaamasta. Nimi
  > tulee gallian sanasta *liga*, "liete". Laakson keskiosa on ollut
  > Unescon maailmanperintökohde vuodesta 2000, ja rantoja reunustaa
  > yli tuhat linnaa.

- **Lähde:** en-Wikipedia "Loire", johdanto ("the longest river in
  France... With a length of 1,006 kilometres, it drains 117,054 km²,
  more than a fifth of France's land, while its average discharge is
  only half that of the Rhône"), osio lähteestä ("It rises in the
  southeastern quarter of the French Massif Central in the Cévennes
  range... at 1,350 m"), nimen alkuperä ("The Gaulish name comes from
  the Gaulish word liga, which means 'silt, sediment, deposit'") ja
  maailmanperintö ("was added to the World Heritage Sites list of
  UNESCO on December 2, 2000... studded with over a thousand châteaux").
- **Kuva:** Commons **View of Saumur and castle on the Loire.jpg**
  (7121×3572, CC BY-SA 3.0, Wolfgang Moroder, 2014) — joki, kaupunki
  ja linna samassa kuvassa. Vaihtoehto: **Typical Gabare boat of the
  Loire river - panoramio.jpg** (3648×2736, CC BY-SA 3.0, Franck
  Michel, 2014) — perinteinen jokivene.
- **HUOM lähdemerkinnässä:** artikkeli antaa lähdekorkeudeksi kahdessa
  kohdassa eri luvun (johdannossa 1 350 m, lähdeosiossa 1 408 m
  Gerbier de Joncin juurella). Käytä muotoa "noin 1 400 metrin
  korkeudelta" tai jätä luku pois.

### 4. Chambordin linna

- **Nimi:** Chambordin linna (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Château de Chambord.
- **Tyyppi:** kulttuurikohde (renessanssilinna).
- **Koordinaatit:** 47,6161°N, 1,5172°E — en-Wikipedia "Château de
  Chambord".
- **Popup-teksti (n. 430 merkkiä):**

  > Frans I:n metsästyslinna, rakennettu 1519–1547. Siinä on 440
  > huonetta, 282 takkaa ja 84 porrasta — mutta kuuluisin on yksi:
  > keskellä kohoaa avoin kaksoiskierreporras, jonka kaksi kierrettä
  > nousevat kolmen kerroksen läpi kohtaamatta koskaan toisiaan. Ylös
  > ja alas kulkeva näkevät toisensa vain pienistä aukoista. Osa
  > tutkijoista pitää portaan suunnittelijana Leonardo da Vinciä, joka
  > oli kuninkaan vieraana lähellä Amboisea — varmaa se ei ole.
  > Kuningas halusi linnan kattojen näyttävän Konstantinopolin
  > siluetilta.

- **Lähde:** en-Wikipedia "Château de Chambord", johdanto ("commissioned
  by Francis I of France and built between 1519 and 1547"), osio
  arkkitehtuurista ("The château features 440 rooms, 282 fireplaces,
  and 84 staircases"; "the open double-spiral staircase... The two
  spirals ascend the three floors without ever meeting"; "he wanted it
  to look like the skyline of Constantinople") ja osio suunnittelijasta
  ("There are suggestions that Leonardo da Vinci may have designed the
  staircase, but this has not been confirmed"; "many scholars now agree
  that Leonardo was at least responsible for the design of the central
  staircase").
- **Kuva:** Commons **Aerial image of Château de Chambord (view from
  the northwest).jpg** (4400×3100, CC BY-SA 4.0, Carsten Steger, 2025)
  — kattojen metsä näkyy ilmasta. Vaihtoehto: **Château de Chambord -
  juin 2013.jpg** (3515×2118, CC BY-SA 4.0, Starus, 2013).
- **HUOM:** Leonardo-yhteys on kirjoitettava varaukseksi ("osa
  tutkijoista"), koska lähde sanoo itse "has not been confirmed".
  John Evelyn muisti portaassa 274 askelmaa — lähde merkitsee itse
  muistinvaraisuuden ("as I remember"), joten lukua ei kannata käyttää.

### 5. Carcassonne

- **Nimi:** Carcassonne (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki ja linnoitus.
- **Koordinaatit:** 43,2133°N, 2,3508°E — en-Wikipedia "Carcassonne".
- **Popup-teksti (n. 440 merkkiä):**

  > Kaksinkertaisen muurin ja 52 tornin ympäröimä keskiaikainen
  > kaupunki, jonka alimmat kivikerrokset ovat roomalaisia. 1800-luvun
  > alussa se oli niin huonossa kunnossa, että valtio päätti purkaa sen:
  > määräys annettiin 1849. Kirjailija Prosper Mérimée ja kaupungin
  > pormestari saivat kansan liikkeelle, ja purku peruttiin.
  > Kunnostuksen aloitti 1853 Eugène Viollet-le-Duc — sama arkkitehti,
  > joka kunnosti Notre-Damen. Häntä myös arvosteltiin: hän kattoi
  > tornit liuskekivellä, jota seudulta ei louhita, ja teki katoista
  > pohjoisranskalaisen teräviä.

- **Lähde:** en-Wikipedia "Carcassonne", johdanto ("restored by the
  theorist and architect Eugène Viollet-le-Duc between 1853 and 1879"),
  osio linnoituksesta ("a concentric design of two outer walls with 52
  towers and barbicans"; "One section is Roman") ja osio kunnostuksesta
  ("A decree to that effect that was made official in 1849 caused an
  uproar. The antiquary and mayor of Carcassonne, Jean-Pierre
  Cros-Mayrevieille, and the writer Prosper Mérimée... led a campaign to
  preserve the fortress"; "he made the error of using slate... instead
  of terracotta tiles. The slate roofs were claimed to be more typical
  of northern France, as was the addition of the pointed tips").
- **Kuva:** Commons **S01 605 Cité Carcassonne, Stadtmauern.jpg**
  (3984×2656, CC BY-SA 4.0, Falk2, 2010) — muurit ja tornit.
  Vaihtoehto, joka näyttää juuri kiistellyt katot: **Carcassonne - Rue
  Gustave Nadaud - View SW on La Cité - Rooftops are Viollet-Le-Duc's
  Addition.jpg** (3024×2016, CC BY-SA 4.0, Txllxt TxllxT, 2009).
- **1873-KYTKÖS:** kunnostus oli isoisän matkavuonna kesken (1853–1879),
  eli hän olisi nähnyt työmaan. Tämä on hyvä pari Pariisin
  1873-täkyjen kanssa (takyt-pariisi.md).

### 6. Pont du Gard

- **Nimi:** Pont du Gard (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kulttuurikohde (roomalainen akveduktisilta).
- **Koordinaatit:** 43,9472°N, 4,5356°E — en-Wikipedia "Pont du Gard".
- **Popup-teksti (n. 450 merkkiä):**

  > Kolmikerroksinen roomalainen akveduktisilta, 48,8 metriä korkea,
  > rakennettu ensimmäisellä vuosisadalla. Se oli osa 50 kilometrin
  > vesijohtoa, joka toi Uzèsin lähteiltä Nîmesiin noin 40 000
  > kuutiometriä vettä päivässä. Koko johdon korkeusero on vain 17
  > metriä, ja sillan kohdalla vesi laskee 456 metrin matkalla 2,5
  > senttiä — yhdellä osuudella seitsemän millimetriä sataa metriä
  > kohti. Vesi lakkasi virtaamasta, kun kalkkisakka tukki kourun eikä
  > kukaan enää raaputtanut sitä puhtaaksi.

- **Lähde:** en-Wikipedia "Pont du Gard", johdanto ("built in the first
  century AD to carry water over 50 km to the Roman colony of Nemausus
  (Nîmes)"), osio rakenteesta ("three tiers of arches... stands 48.8 m
  high... an estimated 40,000 m³ of water a day"), osio kaltevuudesta
  ("The Fontaine d'Eure, at 76 m above sea level, is only 17 m higher
  than the repartition basin in Nîmes"; "The Pont du Gard itself
  descends 2.5 cm in 456 m"; "a fall of only 7 millimetres per 100
  metres of the conduit") ja osio ylläpidosta ("lack of maintenance
  after the 4th century led to clogging by mineral deposits"; "It
  required constant maintenance by circitores, workers... who crawled
  along the conduit scrubbing the walls clean").
- **Kuva:** Commons **Pont du Gard 2017.jpg** (15000×6663, CC BY-SA 3.0,
  Wolfgang Moroder, 2017) — hyvin leveä; kapeampaan asetteluun **Pont
  du Gard (30).jpg** (4485×2726, CC BY-SA 4.0, Krzysztof Golik, 2019).

### 7. Versailles'n palatsi

- **Nimi:** Versailles'n palatsi (fi-Wikipedia; hakusana "Versaillesin
  palatsi" ohjautuu tänne heittomerkilliseen muotoon).
- **Tyyppi:** kulttuurikohde (palatsi ja puisto).
- **Koordinaatit:** 48,8047°N, 2,1203°E — en-Wikipedia "Palace of
  Versailles".
- **Popup-teksti (n. 440 merkkiä):**

  > Ludvig XIII:n vaatimaton metsästysmaja vuodelta 1623 kasvoi
  > palatsiksi, jossa kuningas, hovi ja hallitus asuivat yhtäjaksoisesti
  > 6. toukokuuta 1682 alkaen aina 6. lokakuuta 1789 asti. Nykyään
  > rakennuksessa on noin 2 300 huonetta ja puistossa 815 hehtaaria —
  > ennen vallankumousta yli 8 000. Palatsin syntysyy oli kateus:
  > vuonna 1661 Ludvig XIV vieraili valtiovarainhoitajansa Nicolas
  > Fouquet'n uudessa linnassa, ihastui siihen, vangitutti isäntänsä
  > ja palkkasi tämän arkkitehdin, puutarhurin ja maalarin itselleen.

- **Lähde:** en-Wikipedia "Palace of Versailles", osiot hovista ("The
  king, the court, and the royal government lived there permanently
  from 6 May 1682 until 6 October 1789"), koosta ("contains roughly
  2,300 rooms"; "The park... covers 815 hectares today, compared with
  more than 8,000 hectares before the French Revolution"),
  metsästysmajasta ("Louis XIII built a modest brick-and-stone hunting
  lodge in 1623") ja Vaux-le-Vicomtesta ("On 17 August 1661, Louis XIV
  was a guest at a sumptuous festival hosted by Nicolas Fouquet...
  Vaux-le-Vicomte's scale and opulence led him to imprison Fouquet that
  September... he recruited its authors for his own projects").
- **Kuva:** Commons **Chateau Versailles Galerie des Glaces.jpg**
  (3892×2584, CC BY-SA 3.0, Myrabella, 2011) — peilisali.
- **1873-KYTKÖS:** marsalkka Bazainen sotaoikeus istui Versailles'n
  Grand Trianonissa 6.10.1873 (ks. takyt-pariisi.md, täky 7).
  Versailles ei ollut 1873 pelkkä museo vaan tasavallan
  kokoontumispaikka — kansalliskokous istui Versailles'ssa, ei
  Pariisissa. **HUOM:** tätä viimeistä väitettä EI tarkistettu tässä
  haussa; jos se halutaan popupiin, se on haettava erikseen.

### 8. Étretat

- **Nimi:** Étretat (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** luontokohde (liitukalliot) ja kylä.
- **Koordinaatit:** 49,71°N, 0,21°E — en-Wikipedia "Étretat".
- **Popup-teksti (n. 400 merkkiä):**

  > Normandian rannikon liitukalliot, paikoin 90 metriä korkeat.
  > Merestä nousee kolme luonnonkaarta ja niiden vierestä 70-metrinen
  > kivipiikki, jota sanotaan Neulaksi. Muoto syntyy kalkkikerroksista,
  > jotka ovat noin 90 miljoonaa vuotta vanhoja. Kalliot vetivät
  > 1800-luvulla puoleensa maalarit — Courbet, Boudin, Daubigny ja
  > ennen kaikkea Claude Monet, joka maalasi kaaret yhä uudestaan.
  > Kirjailija Maurice Leblanc teki Neulasta 1909 Arsène Lupin
  > -romaanin aarrekätkön.

- **Lähde:** en-Wikipedia "Étretat", johdanto ja osiot kallioista
  ("three natural arches and a pointed formation called L'Aiguille or
  the Needle, which rises 70 metres above the sea... a complex
  stratigraphy of Turonian and Coniacian chalks. Some of the cliffs are
  as high as 90 metres"), taiteilijoista ("attracted artists including
  Eugène Boudin, Charles Daubigny, Gustave Courbet and Claude Monet")
  ja kirjallisuudesta ("They were featured prominently in the 1909
  Arsène Lupin novel The Hollow Needle by Maurice Leblanc").
- **Kuva:** Commons **Étretat, falaise et porte d'Aval, arche et
  aiguille, plage, août 2015.jpg** (5312×2988, CC BY-SA 4.0, Jbdeparis,
  2015). Vaihtoehto: **Aiguille et Porte d´Aval.jpg** (5332×3000,
  CC BY-SA 4.0, Jörg Braukmann, 2019).
- **HERKKYYS:** en-artikkelissa kerrotaan yhden kirjailijan kuolemasta
  kallion juurella vuonna 1967 sekä Maupassantin asunnossaan pitämästä
  ihmiskädestä. Kumpaakaan ei viedä popupiin. Kallioita ei myöskään
  kannata esittää kiipeilykohteena — ne murenevat.
- **AARREPELIYHTEYS:** Leblancin *Onton neulan* aarre on tässä
  poikkeuksellisen sopiva viittaus, koska se on **kaunokirjallinen**
  aarre oikeassa maastossa. Fablen päätettäväksi, halutaanko peliin
  fiktioviittaus vai vain kalliot.

### 9. Verdonin rotko

- **Nimi:** ei fi-Wikipedia-artikkelia (haut "Verdonin rotko" ja
  "Verdon" palauttivat *missing*). Käytä muotoa **Verdonin rotko**
  (Gorges du Verdon) ja merkitse, ettei fi-lähdettä ole.
- **Tyyppi:** luontokohde (kanjoni).
- **Koordinaatit:** 43,7378°N, 6,3639°E — en-Wikipedia "Verdon Gorge".
- **Popup-teksti (n. 420 merkkiä):**

  > Noin 25 kilometriä pitkä ja jopa 700 metriä syvä kanjoni
  > Provencessa. Verdon-joki on nimetty värinsä mukaan: jäätiköiltä
  > tuleva kivijauho pitää veden turkoosina. Kanjonin pohja on
  > kapeimmillaan kuusi metriä leveä. Ensimmäisen läpikulun teki vasta
  > vuonna 1905 tutkimusmatkailija Édouard-Alfred Martel seurueineen,
  > joka kartoitti rotkoa sähköyhtiön palveluksessa; koko rotkon läpi
  > kulki ensimmäisenä Robert de Joly vuonna 1928. Kallioseinillä on
  > nykyään noin 1 500 kiipeilyreittiä.

- **Lähde:** en-Wikipedia "Verdon Gorge", johdanto ("about 25 km long
  and up to 700 metres deep... the Verdon River, which is named for its
  turquoise-green colour"), osio mitoista ("widths of 6 to 100 metres
  at the level of the Verdon river"), osio väristä ("The river's
  turquoise colour is associated with glacial sources and the minerals
  of rock flour"), osio kiipeilystä ("with 1,500 routes available") ja
  osio retkikunnista ("Martel had visited the Verdon in 1905 as an
  employee of the Southeast Electricity Company... Their successful
  arrival at the Pas de Galetas marked the completion of the first
  expedition of the Verdon Canyon"; "Robert de Joly, who in 1928 was
  the first to completely cross the Verdon Gorge").
- **Kuva:** Commons **Verdon Gorge 1.jpg** (9000×6000, CC BY-SA 4.0,
  kallerna, 2024). Vaihtoehto: **Verdon Trescaire.jpg** (3380×3295,
  CC BY 2.5, Benh LIEU SONG, 2007).

### 10. Camargue

- **Nimi:** Camargue (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** luontokohde (jokisuisto).
- **Koordinaatit:** 43,5333°N, 4,5°E — en-Wikipedia "Camargue".
- **Popup-teksti (n. 440 merkkiä):**

  > Rhônen suisto Välimeren rannalla, yli 930 neliökilometriä
  > suolalampia, ruovikkoa ja hiekkasärkkiä — Länsi-Euroopan
  > suurimpia jokisuistoja. Alueella on tavattu yli 400 lintulajia, ja
  > sen suolaiset lammikot ovat yksi harvoista paikoista Euroopassa,
  > joissa isoflamingo pesii. Suisto kasvaa koko ajan: Rhône tuo
  > mukanaan jopa 20 miljoonaa kuutiometriä lietettä vuodessa.
  > Keskiajalla merenrantaan perustettu satamakaupunki Aigues-Mortes
  > on nyt viiden kilometrin päässä sisämaassa.

- **Lähde:** en-Wikipedia "Camargue", johdanto ("between the
  Mediterranean Sea and the two arms of the Rhône river delta"), osio
  koosta ja luonnosta ("With an area of over 930 km², the Camargue is
  one of western Europe's largest river deltas"; "home to more than 400
  species of birds... Its brine ponds provide one of the few European
  habitats for the greater flamingo") ja osio muutoksesta ("the Rhône
  as it transports huge quantities of mud downstream – as much as 20
  million m³ annually... Aigues-Mortes, originally built as a port on
  the coast, is now some 5 km inland").
- **Kuva:** Commons **001 Greater flamingo in flight in the Camargue
  Photo by Giles Laurent.jpg** (7120×4747, CC BY-SA 4.0, Giles Laurent,
  2024) — lentävä flamingo. Hevosvaihtoehto: **White Horse of the
  Camargue.jpg** (4000×2248, CC BY 3.0, Peter Broster, 2018).
- **PÄÄLLEKKÄISYYS:** maa-kategoriat.js:n FRA-nosto "Hevonen vaihtaa
  väriä kasvaessaan" kertoo jo camarguenhevosesta. Siksi tämä popup on
  kirjoitettu **flamingojen ja suiston kasvun** kautta; hevonen
  mainitaan vain kuvavaihtoehtona.
- **HERKKYYS:** artikkeli kertoo, että alueen karjaa kasvatetaan
  taisteluhäriksi ja viedään Espanjaan. Härkätaisteluita ei oteta
  popupiin; jos gardian-paimenet mainitaan, ne mainitaan paimenina.

### 11. Korsika

- **Nimi:** Korsika (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** saari ja alue.
- **Koordinaatit:** 42°N, 9°E — en-Wikipedia "Corsica".
  **HUOM:** rajapinnan antama piste on saaren likimääräinen keskipiste
  (tasaluvut), ei kaupunki. Jos kartalla halutaan tarkempi piste,
  käytä Ajaccion omia koordinaatteja (ei haettu tässä erässä).
- **Popup-teksti (n. 430 merkkiä):**

  > Välimeren neljänneksi suurin saari, jonka pinta-alasta kaksi
  > kolmasosaa on yhtenäistä vuorijonoa. Genova hallitsi sitä vuodesta
  > 1284 vuoteen 1755, jolloin saari julistautui omaksi
  > italiankieliseksi tasavallakseen Pasquale Paolin johdolla. Vuonna
  > 1768 Genova luovutti Korsikan Ranskan kuninkaalle velkojensa
  > pantiksi, ja Ranska valtasi saaren 1769 — samana vuonna Ajacciossa
  > syntyi Napoleon Bonaparte. Genovalaiset jättivät jälkeensä kaksi
  > asiaa: rannikon vartiotornit ja kastanjapuun.

- **Lähde:** en-Wikipedia "Corsica", johdanto ("the fourth-largest
  island in the Mediterranean... A single chain of mountains makes up
  two-thirds of the island"), osio Genovan ajasta ("ruled by the
  Republic of Genoa from 1284 to 1755, when it seceded to become a
  self-proclaimed, Italian-speaking republic. In 1768, Genoa officially
  ceded it to Louis XV of France as part of a pledge for the debts...
  France annexed the island in 1769. The future Emperor of the French,
  Napoleon Bonaparte, was a native Corsican, born that same year in
  Ajaccio") ja osio genovalaisten perinnöstä ("they introduced the
  chestnut tree on a large scale, improving the diet of the population,
  and built a chain of towers along the coast to defend Corsica from
  the attacks of the Barbary pirates").
- **Kuva:** Commons **Les aiguilles de Bavella.jpg** (5582×4000,
  CC BY-SA 4.0, Julien JOLY, 2019) — Bavellan huiput.
  **EI KÄYTTÖÖN:** samasta hausta löytyneet Emmanuel de Martonnen
  kuvat ovat **Licence Ouverte** (Etalab), eivät PD/CC.
- **PIKKUYHTEYS:** Tuileries'n palatsin kivistä rakennettiin Korsikalle
  Ajaccion lähelle Château de la Punta (ks. takyt-pariisi.md, täky 8) —
  jos kartalla halutaan yhdistää kaksi kohdetta, tässä on valmis lanka.

### 12. Lyon

- **Nimi:** Lyon (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 45,7675°N, 4,835°E — en-Wikipedia "Lyon".
- **Popup-teksti (n. 440 merkkiä):**

  > Kaupunki kahden joen liitoskohdassa: Rhône ja Saône yhtyvät tässä.
  > Rooman aikana se oli *Lugdunum*, Gallian pääkaupunki, ja kaksi
  > keisaria — Claudius ja Caracalla — syntyi täällä; arkkipiispaa
  > kutsutaan yhä "Gallian primaakiksi". Nimi tulee gallian sanoista,
  > jotka voivat tarkoittaa jumala Lugin kukkulaa, varisten kukkulaa
  > tai loistavaa kukkulaa. Renessanssissa kaupunki rikastui silkistä.
  > Kesäkuussa 1827 kaduille kerääntyi 30 000 ihmistä katsomaan
  > kirahvia, joka oli kävelemässä Marseillesta Pariisiin.

- **Lähde:** en-Wikipedia "Lyon", johdanto ("located at the confluence
  of the rivers Rhône and Saône"; "historically an important area for
  the production and weaving of silk"), osio nimestä ("The Gallic
  Lugdun... The second is dunos ('fortress', 'hill')... could mean
  'hill of the god Lug', 'hill of the crows' or 'shining hill'") ja
  osio Rooman ajasta ("the city became... the capital of the province,
  Gallia Lugdunensis. Two Emperors were born in this city: Claudius...
  and Caracalla"; "the archbishop of Lyon is still referred to as
  'Primat des Gaules'"). Kirahvi: en-Wikipedia "Zarafa (giraffe)"
  ("She arrived in Lyon on 6 June, where she was greeted by an
  enthusiastic crowd of 30,000").
- **Kuva:** Commons **01. Panorama de Lyon pris depuis le toit de la
  Basilique de Fourvière.jpg** (7798×2800, CC BY-SA 3.0, Otourly, 2012)
  — hyvin leveä. Kapeampi vaihtoehto: **Confluence du Rhône et de la
  Saône.jpg** (4606×3454, CC BY-SA 4.0, SashiRolls, 2022).
- **PÄÄLLEKKÄISYYS:** maa-kategoriat.js:n FRA-nosto "Ensimmäinen
  elokuvayleisö mahtui yhteen huoneeseen" kertoo jo Lumièren
  veljeksistä, jotka olivat lyonilaisia. Siksi tämä popup EI mainitse
  elokuvaa lainkaan.

### 13. Strasbourg

- **Nimi:** Strasbourg (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 48,5833°N, 7,7458°E — en-Wikipedia "Strasbourg".
- **Popup-teksti (n. 430 merkkiä):**

  > Kaupunki Rein-joen rannalla, aivan Saksan rajalla. Nimi on
  > germaaninen ja tarkoittaa teiden risteyksen kaupunkia. Piispat
  > hallitsivat sitä vuoteen 1262, jolloin porvarit kapinoivat ja
  > Strasbourgista tuli vapaa keisarikaupunki; Ranskaan se liitettiin
  > 1681. Vuoden 1870–71 sodan jälkeen kaupunki oli jälleen saksalainen
  > vuoteen 1918 asti. Täällä painettiin maailman ensimmäinen
  > sanomalehti vuonna 1605 ja täällä sävellettiin Marseljeesi vuonna
  > 1792 — laulu, joka on nimetty toisen kaupungin mukaan.

- **Lähde:** en-Wikipedia "Strasbourg", osio nimestä ("That name is of
  Germanic origin and means 'town (at the crossing) of roads'") ja osio
  historiasta ("In 1262, the citizens violently rebelled against the
  bishop's rule (Battle of Hausbergen) and Strasbourg became a free
  imperial city. It became a French city in 1681... In 1871, after the
  Franco-Prussian War, the city, as part of the Imperial Territory of
  Alsace–Lorraine, became German again, until 1918"; "1605 (world's
  first newspaper printed by Johann Carolus), 1792 (La Marseillaise)").
- **Kuva:** Commons **Strasbourg Cathedral Exterior - Diliff.jpg**
  (6574×8402, CC BY-SA 3.0, Diliff, 2014) — katedraalin julkisivu.
  Vaihtoehto kaupunkikuvaksi: **Two towers of Ponts Couverts and
  Strasbourg Cathedral in the distance.jpg** (2160×1440, CC BY 2.0,
  Christina, 2007).
- **HERKKYYS ja 1873:** isoisän matkavuonna Strasbourg **ei ollut
  Ranskassa** — se oli Saksan keisarikunnan Elsass-Lothringenia
  vuodesta 1871. Tämä on kartalla arvokas tieto, mutta se on
  kirjoitettava tosiasiana, ei kannanottona. Artikkeli listaa myös
  kaupungin historian synkimmät vuodet (mm. vuoden 1349 juutalaisvaino
  ja natsimiehitys) — niitä ei viedä popupiin, mutta niistä ei myöskään
  saa esittää mitään kaunistelevaa.
- **PELIYHTEYS:** Marseljeesin nimi liittyy Marseilleen, joka on
  pelilaatta ja jolla on jo aiheesta kysymys (europe-questions.js:
  "Mikä laulu on saanut nimensä Marseillen mukaan?"). Tämä popup
  täydentää sitä: laulu **sävellettiin Strasbourgissa**.

### 14. Carnacin kivet

- **Nimi:** fi-Wikipediassa on artikkeli **Carnac** (kylästä); hakusana
  "Carnacin kivet" ei löydy. Käytä muotoa "Carnacin kivirivit" ja
  merkitse, että fi-artikkeli koskee kuntaa.
- **Tyyppi:** muinaisjäännös (megaliittikentät).
- **Koordinaatit:** 47,5972°N, -3,0639°E — en-Wikipedia "Carnac
  stones".
- **Popup-teksti (n. 440 merkkiä):**

  > Bretagnessa seisoo yli 3 000 pystykiveä riveissä, jotka jatkuvat
  > kilometrikaupalla: pelkästään Ménecin rivistö on 1 165 metriä pitkä
  > ja Kermarion rivistössä on 1 029 kiveä kymmenessä sarakkeessa.
  > Kivet pystytettiin todennäköisesti noin 3300 eaa., osa ehkä jo
  > 4500 eaa. Lähialueen hautakummuista on löytynyt kirveitä, joiden
  > jade on peräisin Italian Alpeilta, ja koruja, joiden kivi tuotiin
  > laivalla Iberiasta. Keskiajan selitys oli yksinkertaisempi:
  > kivet olivat roomalainen legioona, jonka Merlin muutti kiveksi.

- **Lähde:** en-Wikipedia "Carnac stones", johdanto ("More than 3,000
  prehistoric standing stones... The stones were erected at some stage
  during the Neolithic period, probably around 3300 BC, but some may
  date to as early as 4500 BC"), osiot rivistöistä ("Eleven converging
  rows of menhirs stretching for 1,165 by 100 metres"; "It consists of
  1029 stones in ten columns"), osio hautakummuista ("many of the
  axeheads are made of jade from the Italian Alps, whilst the callaïs
  was imported from south-western Iberia... brought from Iberia by
  boat") ja osio legendoista ("Local tradition similarly claims that
  the reason they stand in such perfectly straight lines is that they
  are a Roman legion turned to stone by Merlin the Wizard").
- **Kuva:** Commons **Alignements de Carnac, Morbihan (France).jpg**
  (4000×2000, CC BY-SA 4.0, Le Passant, 2019) — rivistö laajana.
  Vaihtoehto: **Carnac alignement Menec 2018.jpg** (5184×3456,
  CC BY-SA 4.0, Ultare, 2018).
- **HUOM:** artikkeli kertoo, että kivien tekijöistä kiistellään
  (metsästäjä-keräilijät vai maanviljelijät) — "The question of which
  people Carnac stones are to be attributed to is still debated".
  Popup ei saa väittää tekijää.

---

## Hylätyt / harkintaan jätetyt

- **Lascaux'n luola, Pilat'n dyyni, Chaîne des Puys, Bayeux'n
  seinävaate:** kaikki ovat JO pelissä maa-kategoriat.js:n
  FRA-nostoina. Jätetty pois tarkoituksella. Jos kartalle halutaan
  näitäkin pisteitä, popup-teksti on kirjoitettava niin, ettei se
  toista lehden nostoa.
- **Rhône** (43,3308°N, 4,8456°E — koordinaatit tarkistettu, piste on
  joen suu): hyvä toinen jokikohde, jos jokia halutaan kaksi. Lähde
  antaa valmiit faktat: alkaa Rhônen jäätiköltä noin 2 208 metristä,
  virtaa Genevenjärven läpi, saa Lyonissa suurimman sivujokensa Saônen
  (473 m³/s), ja virtaus voi yltää 10 km/h. Jäi pois, koska Camargue
  (kohde 10) kertoo jo Rhônen suiston.
- **Bordeaux, Avignon, Nizza, Reims, Saint-Malo, Cirque de Gavarnie,
  Millaun silta:** ei haettu tässä erässä. Nämä ovat ilmeisimmät
  seuraavat, jos kohteita halutaan enemmän kuin neljätoista.
- **Normandian maihinnousurannat ja Verdunin taistelukenttä:** näitä ei
  otettu listalle tarkoituksella. Ne ovat sotahautausmaita ja
  muistopaikkoja; jos ne joskus viedään karttaan, teksti on
  kirjoitettava muistopaikan sävyllä ja erillisellä
  HERKKYYS-arvioinnilla (Perustuslaki 3).

## Yhteenveto

**14 kohdetta, kaikki koordinaatit ja kaikki kuvat tarkistettu
rajapinnasta.** Kaksi koordinaattia on tarkoituksella likiarvoja
(Loire = joen suu, Korsika = saaren keskipiste) ja molemmat on merkitty
kohteen kohdalle. Kolmelle kohteelle ei löytynyt suoraa fi-Wikipedian
vastinetta halutulla nimellä (Verdonin rotko, Carnacin kivet,
Mont Saint-Michelin väliviiva) — merkitty kohteittain.

**Tyyppijakauma:** vuori 1 (Mont Blanc), joki 1 (Loire), kanjoni 1
(Verdon), rannikko/luonto 3 (Mont Saint-Michel, Étretat, Camargue),
saari 1 (Korsika), kaupunki 3 (Carcassonne, Lyon, Strasbourg),
kulttuurikohde 4 (Chambord, Pont du Gard, Versailles, Carnac).

**Kolme parasta ehdotustani:**

1. **#5 Carcassonne.** Vahvin puhtaasti 1873-kytköksinen kohde koko
   listalla: isoisän matkavuonna linnoituskaupunki oli **työmaa**
   (Viollet-le-Duc 1853–1879), ja koko kohde on olemassa vain siksi,
   että purkupäätös vuodelta 1849 peruttiin kansalaisliikkeen takia.
   Tämä on juuri sitä 13+ -aineistoa, joka tekee kartasta ajassa
   elävän: paikka, joka melkein hävitettiin ja joka näyttää
   keskiaikaiselta, koska 1800-luku rakensi sen niin. Ja kohde opettaa
   ilman saarnaa, että restaurointi on tulkintaa — jopa väärän
   kattomateriaalin verran.

2. **#12 Lyon yhdessä Pariisin kirahvitäyn kanssa.** Suosittelen näitä
   parina: Zarafa nousi maihin Marseillessa (pelilaatta), sai Lyonissa
   6.6.1827 vastaansa 30 000 ihmistä (tämä kohde) ja päätyi Pariisiin
   (pelilaatta, takyt-pariisi.md täky 2). Kolme karttapistettä, yksi
   tarina, kaikki tarkistettu samasta artikkelista — ja fokusnäkymän
   kohdekorostukselle täydellinen syy klikata kolmea pistettä
   peräkkäin.

3. **#6 Pont du Gard.** Paras yksittäinen "yksi luku, joka jää
   mieleen" -kohde: seitsemän millimetriä sataa metriä kohti. Se on
   ymmärrettävä ilman esitietoja, se on tarkistettu, ja se kertoo
   samalla, miksi akvedukti lopulta lakkasi toimimasta — kukaan ei
   enää raaputtanut kalkkia pois. Aarrepelin sävyyn sopii se, että
   rakennelma säilyi vuosisatoja vain siksi, että siitä tuli
   tullisilta: käyttö suojeli sitä.
