# Päätoimittajan toimituksellinen tarkistus: 31 kaupunkia ennen äänitystä

Tilaus: Päätoimittaja 7.10.2026. Haara `fable-esittely-tarkistus` (pohjana `pelikoodari-esittely-pilvi`).

Tarkistetut kaupungit: kaikki `esittely-tyo/korjattu/*.json` **paitsi** pariisi, praha, wien, rooma, lontoo ja
kööpenhamina (jo äänitetty). Yhteensä 31 kaupunkia, 383 kohdetta, 247 kierroskohdetta.

Tarkistus tehtiin ali-agenteilla (malli opus, enintään neljä rinnakkain, kaupungit jaettuina), ja lopuksi
erillinen tarkistaja-agentti kävi muutokset läpi. Jokaiselle kaupungille ajettiin
`node tools/opas/tarkista-esittely.mjs esittely-tyo/pohja/<id>.json esittely-tyo/korjattu/<id>.json`
tuloksella 0 virhettä.

## Tarkistetut löydöstyypit

Päätoimittajan omassa kolmen kaupungin tarkistuksessa (Lontoo, Kööpenhamina, Rooma) löytyi seitsemän
toistuvaa ongelmatyyppiä, joita etsittiin kaikista 31 kaupungista:

1. Saman kaupungin kierrosversiot (`lyhyt`) eivät saa kertoa samaa asiaa.
2. `lyhyt` on kiinnostava tarina tai yksityiskohta, ei hallinnollista tai tylsää tietoa.
3. Faktojen vivahteet (esim. Richard Owen vastusti luonnonvalintateoriaa, ei lajien polveutumista).
4. Avauksen lause "Kierros alkaa X:stä" vastaa pohjan ensimmäistä `kierros`-kohdetta.
5. Kartta elää nykyajassa: ei vanhentunutta tietoa (suljetut, siirretyt, uudelleennimetyt, 2025–2026 muutokset).
6. Kieli on luontevaa suomea; suomenkielinen alkusana (ääntäminen); sävy ei lapsellinen eikä saarnaava.
7. Kysymyksillä on vastaus, joka ei vanhene nopeasti, ja ne liittyvät kohteeseen.

---

<!-- MUUTOKSET-ALKAA -->

# Toimituksellinen tarkistus: amsterdam, ateena

Tarkistin: Amsterdam 0 virhettä (14 huomiota, kaikki "ei ala paikan nimellä" + "avaus puuttuu" — sama määrä kuin ennen).
Ateena 0 virhettä (5 huomiota, sama määrä kuin ennen).

## Amsterdam

### Rijksmuseum — kenttä `teksti`
- **Vanha:** "Sen tunnetuin teos on Rembrandtin Yövartio, joka siirrettiin vuonna 1715 Amsterdamin raatihuoneeseen."
- **Uusi:** "Sen tunnetuin teos on Rembrandtin Yövartio, joka siirrettiin Amsterdamin raatihuoneeseen jo vuonna 1715, kauan ennen museon avaamista."
- **Syy:** 6 (kieli ja logiikka). Edellinen virke kertoi juuri museon avaamisesta vuonna 1885, joten kuulija kuuli, että museon tunnetuin teos vietiin pois raatihuoneeseen. Aikajärjestys on nyt sanottu auki.
- **Lähde:** https://en.wikipedia.org/wiki/The_Night_Watch

### Rijksmuseum — kenttä `teksti`
- **Vanha:** "Jotta valtava maalaus mahtuisi kahden pylvään väliin, sitä leikattiin kaikilta neljältä sivulta, ja vasemmasta reunasta katosi kaksi hahmoa."
- **Uusi:** "Siellä maalausta leikattiin kaikilta neljältä sivulta, ilmeisesti siksi, että valtava taulu mahtuisi kahden pylvään väliin, ja vasemmasta reunasta katosi kaksi hahmoa."
- **Syy:** 3 (faktan vivahde). Lähde sanoo "presumably, to fit the painting between two columns" — syy on oletus, ei varmistettu tosiasia. Oma `lahteet`-merkintä sanoi jo "oletettavasti", mutta teksti esitti sen varmana.
- **Lähde:** https://en.wikipedia.org/wiki/The_Night_Watch

### Rijksmuseum — kenttä `lyhyt`
- **Vanha:** "Valtionmuseo Rijksmuseum avattiin uudelleen huhtikuussa 2013 kymmenen vuotta kestäneen remontin jälkeen, ja avajaisia johti kuningatar Beatrix. Remontti maksoi kolmesataaseitsemänkymmentäviisi miljoonaa euroa, ja rakennusongelmat lykkäsivät avaamista kerta toisensa jälkeen. Kiistaa käytiin myös siitä, saavatko pyöräilijät käytävänsä takaisin."
- **Uusi:** "Valtionmuseo Rijksmuseumin kirkollinen ulkonäkö oli tarkoituksellinen: katolinen Pierre Cuypers muokkasi hyväksyttyä suunnitelmaa hiljaa katolisempaan suuntaan ja vaihtoi renessanssin piirteitä goottilaisiin. Protestanttinen kuningas Vilhelm kolmas ei saapunut vuoden 1885 avajaisiin lainkaan vaan lähetti tilalleen ruhtinasparin."
- **Syy:** 2 (kierrosversio oli hallintoa: remontin hinta, rakennusongelmat ja viivästykset) ja 1 (pyöräkäytävä kerrottiin jo samassa `teksti`-kentässä). Tilalle tarina ihmisistä ja ristiriidasta: katolinen arkkitehti teki protestanttiseen maahan katedraalin, eikä kuningas tullut avajaisiin.
- **Lähde:** https://www.rijksmuseum.nl/en/stories/10-things/story/cuypers-museum-building

### Rijksmuseum — kenttä `kysymykset`
- **Vanha:** "Miksi museota moitittiin aikanaan liian katoliseksi?"
- **Uusi:** "Miksi pyörätie kulkee museon läpi?"
- **Syy:** 7. Uusi `lyhyt` vastaa jo vanhaan kysymykseen. Uuden kysymyksen vastaus on dokumentoitu (pyörätie oli alkuperäisen toimeksiannon vaatimus) eikä vanhene.
- **Lähde:** https://www.rijksmuseum.nl/en/stories/10-things/story/cuypers-museum-building

### Anne Frankin talo — kenttä `teksti`
- **Vanha:** "puu on kaatunut, mutta sen pistokkaita kasvaa ympäri maailmaa"
- **Uusi:** "puu on kaatunut, mutta sen siemenistä kasvatettuja taimia on istutettu ympäri maailmaa"
- **Syy:** 3 (faktan vivahde). Kastanjasta ei otettu pistokkaita, vaan sen siemenistä eli kastanjoista kasvatettiin taimia. Oma lähdemerkintä sanoi tämän oikein, teksti väärin.
- **Lähde:** https://www.annefrank.org/en/anne-frank/front-section/chestnut-tree/

### Anne Frankin talo — kenttä `lyhyt`
- **Vanha:** "… Talo avattiin museona vuonna 1960, ja nykyään siellä käy yli miljoona ihmistä vuodessa."
- **Uusi:** "… Talo oli jo määrä purkaa tehtaan tieltä, mutta kansalaiskampanja pelasti sen, ja museo avattiin vuonna 1960."
- **Syy:** 2 (kävijämäärä on ohjeen nimenomaan kieltämää kierrosversion sisältöä) ja 5 (kävijäluku vanhenee). Tilalla tapahtuma: Berghausin tekstiilitehdas aikoi purkaa kulmatalot, ja amsterdamilaisten komitea sekä lehdistökampanja pelastivat talon.
- **Lähde:** https://www.annefrank.org/en/about-us/how-it-all-began

### Van Gogh -museo — kenttä `lyhyt`
- **Vanha:** "Veljensä Theon kuoltua leski Jo van Gogh-Bonger teki Vincentin töitä ja kirjeitä tunnetuiksi…"
- **Uusi:** "Kun Vincentin veli Theo kuoli, tämän leski Jo van Gogh-Bonger teki Vincentin työt ja kirjeet tunnetuiksi…"
- **Syy:** 6 (kieli). Omistusliite "veljensä" viittasi virkkeen subjektiin eli Joon, joten lause sanoi kirjaimellisesti, että Theo oli Jon veli.
- **Lähde:** kielikorjaus, ei uutta väitettä

### Amsterdamin kuninkaallinen palatsi — kenttä `lyhyt`
- **Vanha:** "… ja muulloin se on avoinna yleisölle."
- **Uusi:** "… ja osan vuodesta se on avoinna yleisölle."
- **Syy:** 5 (nykytila). Palatsi ei ole avoinna aina, kun sitä ei käytetä: vuonna 2026 yleisölle 26. kesäkuuta – 11. marraskuuta.
- **Lähde:** https://www.paleisamsterdam.nl/en/

### Amsterdamin keskusrautatieasema — kenttä `lyhyt`
- **Vanha:** "Amsterdamin keskusrautatieaseman suunnittelivat arkkitehti Pierre Cuypers ja insinööri ja arkkitehti Adolf Leonard van Gendt. Cuypers piirsi myös valtionmuseo Rijksmuseumin, ja van Gendt Concertgebouw-konserttitalon. Nykyään asema on koko Alankomaiden vierailluin suojeltu valtakunnallinen muistomerkki."
- **Uusi:** "Amsterdamin keskusrautatieaseman edessä olevan vesialtaan alle rakennettiin pyöräparkki, joka avattiin vuonna 2023 ja johon mahtuu lähes seitsemäntuhatta polkupyörää. Aseman takana on veden alla toinen, pienempi halli. Pyöränsä jättänyt kävelee käytävää pitkin asemalle kastumatta."
- **Syy:** 2. Vanha kierrosversio oli juuri ohjeen kieltämää tyyppiä "suunnittelivat arkkitehti Y ja insinööri Z" sekä hallinnollinen superlatiivi "vierailluin suojeltu valtakunnallinen muistomerkki" — mitään ei jäänyt mieleen. Harkitsin tilalle aseman kuninkaallista odotushuonetta (vahvistettu), mutta hylkäsin sen löydöstyypin 1 takia: kierroksen kohteet kaksi, kolme ja neljä olisivat kaikki kertoneet kuninkaallisista. Veden alle rakennettu pyöräparkki on sekä yllätys että nykyaikaa, ja se säilyttää tekstin teeman (asema rakennettiin veteen).
- **Lähde:** https://dutchcycling.nl/knowledge/cycling-news/new-underwater-bike-parking-at-amsterdam-central-station/

### Amsterdamin keskusrautatieasema — kenttä `kysymykset`
- **Vanha:** "Miksi aseman pyöräparkki on rakennettu veden alle?"
- **Uusi:** "Miksi asemalle tarvittiin niin suuri pyöräparkki?"
- **Syy:** 7. Uusi `lyhyt` kertoo jo, että parkki on veden alla; kysymys siirtyy siihen, mitä se ei kerro.
- **Lähde:** https://dutchcycling.nl/knowledge/cycling-news/new-underwater-bike-parking-at-amsterdam-central-station/

### Amsterdamin keskusrautatieasema — kenttä `puhe_lyhyt`
- **Vanha:** "… ja van Gendt Konsertgebau-konserttitalon. …"
- **Uusi:** kenttä poistettu
- **Syy:** 2 (seuraus edellisestä). Ääntämiskenttä oli olemassa vain sanan Concertgebouw takia, eikä uudessa kierrosversiossa ole sellaista nimeä.
- **Lähde:** –

### Dam-aukio — kenttä `lyhyt`
- **Vanha:** "Amsterdamin Dam-aukiolla vietetään joka vuosi neljäntenä toukokuuta Alankomaiden kansallista muistopäivää, jolloin sodan uhreja muistetaan kansallismonumentin juurella. Kuningatar Juliana paljasti monumentin samana päivänä vuonna 1956, ja sen suunnittelivat kuvanveistäjä John Rädecker ja arkkitehti Jacobus Oud."
- **Uusi:** "Amsterdamin Dam-aukiolla seisoi ennen kaupungin vaakarakennus, jossa punnittiin kauppatavarat. Kun Hollannin kuningas Ludvig Bonaparte muutti vuonna 1808 aukion laidalla olevaan palatsiin, hän valitti vaa'an peittävän näkymänsä ja määräsi sen purettavaksi. Vaaka hävisi aukiolta eikä sitä rakennettu enää uudelleen."
- **Syy:** 1 ja 2. Sama kohteen `teksti` kertoo jo kansallismonumentista ja sen uurnista, ja toinen virke oli puhdasta "suunnittelivat X ja Y" -tietoa. Tilalla ihminen ja yllätys: kuningas purki kaupungin vaa'an, koska se oli hänen näkymänsä tiellä.
- **Lähde:** https://en.wikipedia.org/wiki/Dam_Square

### Dam-aukio — kenttä `syventava`
- **Vanha:** "Mitä uurnissa on?"
- **Uusi:** "Miten hallitsija vihitään virkaansa?"
- **Syy:** 7. Kohteen `teksti` kertoo sanatarkasti, mitä uurnissa on, joten jatkokysymys oli jo vastattu. Uusi kysymys jatkaa tekstin mainintaa Uudesta kirkosta.
- **Lähde:** https://en.wikipedia.org/wiki/Dam_Square

### Amsterdamin kanaalivyöhyke — kenttä `lyhyt`
- **Vanha:** "Amsterdamin kanaalivyöhykkeen loisteliain kohta on Herengrachtin Kultainen mutka Vijzelstraatin ja Leidsestraatin välissä. Sen varrelle rikkaimmat kauppiaat ja korkeat virkamiehet rakensivat 1600-luvulla kanavien komeimmat talot, ja se oli koko uuden kaupunginosan varakkain kortteli."
- **Uusi:** "Amsterdamin kanaalivyöhykkeen komeimmassa kohdassa, Herengrachtin Kultaisessa mutkassa, kaupunki antoi rikkaimpien ostaa kaksi tonttia vierekkäin, joten sinne nousi kaksi kertaa muita leveämpiä kaupunkipalatseja. Nykyään niissä on enimmäkseen pankkien ja rahoituslaitosten konttoreita ja yksi pieni kissataiteen museo."
- **Syy:** 2. Vanha versio kertoi vain, että korttelissa asuivat rikkaat ja talot olivat komeita — ei ihmistä, tapahtumaa eikä yllätystä. Uusi kertoo ristiriidan: tiukasti säädellyssä kanavakaupungissa, jossa talot olivat kapeita, kaupunki antoi tässä yhdelle ostajalle kaksi tonttia. Mukana myös nykytila (pankit ja Kattenkabinet).
- **Lähde:** https://en.wikipedia.org/wiki/Gouden_Bocht

### Westerkerk — kenttä `teksti`
- **Vanha:** "… ja sen kahdeksankymmentäviisi metriä korkea torni on Amsterdamin korkein kirkontorni. Tornin huipulla kimaltaa keisarillinen kruunu, jonka keisari Maksimilian myönsi kaupungille."
- **Uusi:** "… ja sen torni on Amsterdamin korkein kirkontorni. Tornin huipulla kimaltaa keisarillinen kruunu, jonka keisari Maksimilian myönsi kaupungille, ja vuonna 2006 kruunu palautettiin alkuperäiseen siniseen väriinsä."
- **Syy:** 3. Edellinen tarkistaja jätti epävarmuudeksi 85 vai 87 metriä. Englanninkielinen Wikipedia sanoo nyt 87 metriä, matkailusivut 85 metriä, eikä lukua voi ratkaista; ohjeen mukaan varmistamaton väite jätetään pois. Korkein kirkontorni -asema on kaikissa lähteissä sama. Poistetun luvun tilalle tuli lähteellä varmistettu, ilmasta näkyvä yksityiskohta: kruunu maalattiin vuonna 2006 takaisin siniseksi. `korkeus_m` 85 jätettiin ennalleen, koska se on vain kameran mitta.
- **Lähde:** https://en.wikipedia.org/wiki/Westerkerk

### Vondelpark — kenttä `teksti`
- **Vanha:** "Lampien ja nurmikoiden keskellä on myös Pablo Picasson abstrakti veistos Kala sekä alankomaalaisen Nelson Carrilhon teos Mama Baranka."
- **Uusi:** "Lampien ja nurmikoiden keskellä seisoo Pablo Picasson abstrakti betoniveistos vuodelta 1965: Picasso tarkoitti sen linnuksi, mutta amsterdamilaiset ovat aina nähneet siinä kalan. Puistossa on myös alankomaalaisen Nelson Carrilhon veistos Mama Baranka."
- **Syy:** 3 (faktan vivahde). Teoksen nimi ei ole Kala: se on Figure découpée l'Oiseau, ja Picasso tarkoitti sen linnuksi. Kala on amsterdamilaisten antama lempinimi, jonka vanha teksti esitti teoksen nimenä. Vivahde on samalla parempi tarina.
- **Lähde:** https://stadscuratorium.nl/en/?p=3351

### Amsterdam — tarkistetut mutta muuttamattomat kohdat
- **Rembrandtin talo `lyhyt`**: päivittäiset maalin- ja etsausnäytökset sekä vuoden 2023 laajennus ja etsausullakko vahvistettiin museon omilta sivuilta (https://www.rembrandthuis.nl/en/plan-your-visit/visitor-information/introduction/). Kolmas virke ("museo laajeni") on hieman museouutismainen, mutta kaksi ensimmäistä virkettä kantavat kierrosversion, joten en kirjoittanut sitä uudelleen.
- **Keskusaseman tornit**: edellisen tarkistajan epävarmuus ratkaistu. Hollanninkielinen Wikipedia sanoo "een klok (oostelijke toren) en een windwijzer (westelijke toren)", eli julkisivun edestä katsottuna kello on oikealla ja tuulinäyttäjä vasemmalla, kuten teksti sanoo. Lähde vaihdettu matkailusivulta Wikipediaan.
- **Artis**: syyskuun alennuskuukausi ("kwartjesmaand", noin 25 prosentin alennus) on yhä voimassa, joten "syyskuu on yhä alennuskuukausi" jää.
- **Van Gogh -museo**: museo on auki; Masterplanin peruskorjaus ajoittuu vuosiin 2028–2031, joten tekstiin ei tule nykytilakorjausta.
- **Magere Brug**: silta on auki, nykyhahmo vuodelta 1934 ja käsikäyttö vuoteen 1994 vahvistettu. Harkitsin sanaa "nostosilta": kyse on läppäsillasta, mutta "nostosilta" on suomessa vakiintunut yleisnimi avattavalle sillalle, joten jätin sen.
- **Munttoren, Oude Kerk, NEMO**: väitteet pitävät, ei korjattavaa.

## Ateena

### Akropolis — kenttä `lyhyt`
- **Vanha:** "… kallion pienin temppeli, Athena Niken pyhäkkö."
- **Uusi:** "… kallion pienin temppeli, Athene Niken pyhäkkö."
- **Syy:** 6 (vakiintunut suomenkielinen nimi ja kaupungin sisäinen johdonmukaisuus). Aineistossa oli sekaisin Athena, Athenan ja Athene; suomessa jumalatar on Athene, ja sama tiedosto käytti jo muodoilla Athene ja Athenen muualla. Ääneen luettuna vaihtelu kuuluisi virheeksi.
- **Lähde:** https://fi.wikipedia.org/wiki/Athene

### Akropolis — kenttä `kysymykset`
- **Vanha:** "Kuinka monta vierailijaa kalliolla käy päivässä?"
- **Uusi:** "Miksi Akropoliilla on aina rakennustelineitä?"
- **Syy:** 7. Ohje kieltää nimenomaan kävijämääräkysymykset, joiden vastaus vanhenee (ja Akropoliin päivittäinen kävijäkatto on muuttunut viime vuosina). Uuden kysymyksen vastaus — vuosikymmeniä jatkunut entisöinti — pysyy.
- **Lähde:** https://en.wikipedia.org/wiki/Acropolis_of_Athens

### Parthenon — kenttä `kuvaus` ja `teksti`
- **Vanha:** kuvaus "Athenan temppeli Akropoliilla"; teksti "… vajaassa kymmenessä vuodessa Athena Parthenoksen temppeliksi…"
- **Uusi:** kuvaus "Athenen temppeli Akropoliilla"; teksti "… vajaassa kymmenessä vuodessa Athene Parthenoksen temppeliksi…"
- **Syy:** 6, sama nimiasia kuin yllä.
- **Lähde:** https://fi.wikipedia.org/wiki/Athene

### Parthenon — kenttä `teksti`
- **Vanha:** "… ja pylväät kallistuvat aavistuksen sisäänpäin, jotta temppeli näyttäisi silmään suoralta."
- **Uusi:** "… ja pylväät kallistuvat aavistuksen sisäänpäin, ja hienosäätöä on selitetty sillä, että temppeli näyttäisi silmään täysin suoralta."
- **Syy:** 3 (faktan vivahde, syy-yhteys). Edellinen tarkistaja jätti tämän epävarmuudeksi, ja se on oikea huoli: optisen korjauksen tarkoitus on yleisin mutta kiistelty tulkinta, ei mitattu tosiasia. Nyt teksti kertoo kaartuvan alustan ja kallistuvat pylväät tosiasiana ja selityksen selityksenä.
- **Lähde:** https://www.thecollector.com/parthenon-illusion/

### Antiikin agora — kenttä `lyhyt`
- **Vanha:** "Antiikin agoran itälaidan pylväshalli, Attaloksen stoa, oli alun perin Pergamonin kuninkaan Attalos toisen lahja kaupungille 100-luvulla ennen ajanlaskun alkua. Amerikkalaiset arkeologit rakensivat sen uudelleen 1950-luvulla, ja nykyään siinä toimii agoran museo."
- **Uusi:** "Antiikin agoran pohjoislaidalla seisoi Maalattu pylväshalli eli Stoa Poikile, jonka suojissa kyproslainen Zenon opetti oppilaitaan noin kolmesataa vuotta ennen ajanlaskun alkua. Kreikan sana stoa tarkoittaa pylväshallia, ja juuri tästä hallista koko stoalaisuuden aate sai nimensä."
- **Syy:** 2. Vanha kierrosversio oli perustietoa: kuka lahjoitti, milloin rakennettiin, milloin rakennettiin uudelleen, mitä siinä nyt on. Tilalla yllätys, joka jää mieleen: tuttu sana stoalaisuus tulee tältä torilta, ja sen takana on yksi ihminen. Attaloksen stoa säilyy kohteen `teksti`-kentässä, jossa itälaidan kaksikerroksinen pylväshalli mainitaan.
- **Lähde:** https://en.wikipedia.org/wiki/Stoa_Poikile

### Erekhtheion — kenttä `lyhyt`
- **Vanha:** "Erekhtheionin karyatidit eivät ole toistensa kopioita, sillä kampaukset, vaatteiden laskokset ja polven asento vaihtelevat. Museossa viisi siskoa, jotka siirrettiin sisätiloihin vuonna 1979, puhdistettiin 2010-luvulla laserilla mustasta noesta, ja vierailijat saivat seurata työtä suorana."
- **Uusi:** "Erekhtheionin karyatidit eivät ole toistensa kopioita: kasvot ja vaatteiden laskokset on veistetty erikseen, ja kolme seisoo oikealla, kolme vasemmalla jalalla. Hahmojen paksut, taidokkaat kampaukset eivät ole vain koristeita, vaan ne tukevat kaulaa, joka olisi muuten koko patsaan heikoin kohta."
- **Syy:** 1 ja 6. Kierroksen kohde neljä (Erekhtheion) ja kohde kuusi (Akropolis-museo) kertoivat molemmat samasta asiasta: museon viidestä karyatidista. Nyt Erekhtheion kertoo patsaista itse temppelillä ja museo museossa. Lisäksi "saivat seurata työtä suorana" on anglismi, joka antaa ymmärtää suoran lähetyksen, kun kyse oli siitä, että museovieraat näkivät työn paikan päällä. Uusi toinen virke on lähteellä varmistettu rakennetieto: kampaus toimii kaulan tukena.
- **Lähde:** https://en.wikipedia.org/wiki/Caryatid

### Akropolis-museo — kenttä `lyhyt`
- **Vanha:** "… Museossa on esillä myös viisi Erekhtheionin karyatidia, ja kuudennen jalusta on jätetty tyhjäksi."
- **Uusi:** "… Museossa viisi Erekhtheionin karyatidia puhdistettiin laserilla mustasta noesta museon vieraiden nähden, ja kuudennen jalusta on jätetty tyhjäksi."
- **Syy:** 1 (sama päällekkäisyys kuin yllä, ratkaistu toisesta päästä). Laserpuhdistus kuuluu museoon, joten se siirtyi tähän, ja tyhjä jalusta jää loppuhuipennukseksi.
- **Lähde:** https://resources.culturalheritage.org/conservators-converse/2014/07/08/from-the-new-york-times-acropolis-maidens-glow-anew/

### Akropolis-museo — kenttä `teksti`
- **Vanha:** "Museo avattiin vuonna 2009, ja sen suunnitteli arkkitehti Bernard Tschumi."
- **Uusi:** "Museo avattiin vuonna 2009, ja sen suunnittelivat arkkitehdit Bernard Tschumi ja Michael Photiadis."
- **Syy:** 3 (kuka suunnitteli). Museo on Tschumin ja ateenalaisen Michael Photiadisin yhteinen työ; oma `lahteet`-merkintä sanoi tämän oikein, teksti ei.
- **Lähde:** https://en.wikipedia.org/wiki/Acropolis_Museum

### Olympoksen Zeuksen temppeli — kenttä `lyhyt`
- **Vanha:** "Olympoksen Zeuksen temppelin rakentaminen alkoi tyranni Peisistratoksen aikana, mutta työ pysähtyi perustuksiin, kun hänen sukunsa menetti vallan. Vuosisatoja myöhemmin keisari Hadrianus vihki temppelin, ja sen viereen pystytettiin hänen kunniakseen porttikaari."
- **Uusi:** "Olympoksen Zeuksen temppelistä on vuosisatojen varrella kadonnut pylväitä yksi kerrallaan. Rooman kenraali Sulla vei muutaman Roomaan jo ennen ajanlaskun alkua, ja vuonna 1759 kaupungin osmanihallitsija räjäytti yhden ruudilla ja poltti marmorin kalkiksi moskeijansa laastiin."
- **Syy:** 1 ja 2. Vanha kierrosversio toisti saman kaaren kuin kohteen `teksti` ("rakentaminen aloitettiin 500-luvulla, mutta temppeli valmistui vasta Hadrianuksen aikana") ja lopetti porttikaareen, joka on oma kohteensa kaupungissa. Uusi kertoo konkreettisen tapahtuman: seitsemäntoistametrinen pylväs räjäytettiin ja poltettiin moskeijan laastiksi.
- **Lähde:** https://en.wikipedia.org/wiki/Temple_of_Olympian_Zeus,_Athens

### Olympoksen Zeuksen temppeli — kenttä `kysymykset`
- **Vanha:** "Mihin temppelin kadonneet pylväät joutuivat?"
- **Uusi:** "Kuka oli roomalainen kenraali Sulla?"
- **Syy:** 7. Uusi `lyhyt` vastaa jo vanhaan kysymykseen; uusi kysymys vie samaan tarinaan ihmisen kautta.
- **Lähde:** https://en.wikipedia.org/wiki/Temple_of_Olympian_Zeus,_Athens

### Sýntagman aukio — kenttä `teksti`
- **Vanha:** "Sen edessä on tuntemattoman sotilaan hauta, jota vartioivat evzonit valkoisissa hameissaan ja tupsukengissään. Vartio vaihtuu tasatunnein hitaalla askelluksella, jossa jalka nousee suorana eteen."
- **Uusi:** "Sen edessä on tuntemattoman sotilaan hauta, jota vartioivat evzonit tupsukengissään. Vartio vaihtuu tasatunnein hitaalla askelluksella, jossa jalka nousee suorana eteen, ja sunnuntaisin vaihto tehdään juhlallisemmin valkoisissa laskoshameissa."
- **Syy:** 3 ja 5. Edellinen tarkistaja jätti hameen värin epävarmuudeksi, ja asia ratkesi: valkoista fustanellaa käytetään sunnuntaisin, juhlapäivinä ja virallisissa tilaisuuksissa, maanantaista lauantaihin evzoneilla on khakinvärinen kesäasu tai musta talviasu. Vanha teksti lupasi kuulijalle valkoiset hameet joka tunti.
- **Lähde:** https://whyathens.com/changing-of-the-guard-hellenic-parliament/

### Ateena — tarkistetut mutta muuttamattomat kohdat
- **Kallimarmaro `lyhyt`**: "luovutetaan nykyään olympiatuli" pitää paikkansa. Milano Cortina 2026 -kisojen tuli luovutettiin Italialle Panathinaikos-stadionilla joulukuussa 2025 (https://www.tovima.com/world/olympic-flame-handed-over-to-italy-for-2026-winter-games). Ei muutosta.
- **Likavittos `teksti`**: köysirata on yhä liikenteessä (noin kello yhdeksästä puoli kolmeen yöllä, lippuhinnat 2026), joten "ylös pääsee köysiradalla" jää.
- **Hefaistoksen temppeli `lyhyt`**: harkitsin löydöstyyppiä 2, koska kuninkaallinen julistus on hallintopäätös. Jätin ennalleen: tapahtuma on kuvallinen (Kreikan pääkaupunkipäätös luettiin 2 300 vuotta vanhassa temppelissä) ja paikkaan sidottu.
- **Parthenon `lyhyt`**: kirkko, moskeija ja Elginin veistokset vahvistettu; Elgin mainitaan vain yhdessä `lyhyt`-kentässä, joten kierroksella ei tule toistoa.
- **Akropolis, Pláka, Tuulien torni, Hadrianuksen kaari, Dionysoksen teatteri, Herodes Atticuksen odeion**: väitteet tarkistettu, ei korjattavaa.

## Epävarmuudet Päätoimittajalle

1. **Westerkerkin tornin korkeus** (Amsterdam) jäi ratkeamatta: englanninkielinen Wikipedia sanoo 87 metriä, useat muut lähteet 85 metriä. Luku poistettiin tekstistä, mutta `korkeus_m` on edelleen 85.
2. **Amsterdamin kanaalivyöhykkeen `teksti` on kuusi virkettä**, kun ohje sanoo neljästä viiteen. En korjannut, koska virkemäärät ovat toimeksiannon "Mitä EI muuteta" -listalla; jos haluat tämän siistittäväksi, kahden keskimmäisen virkkeen voi yhdistää.
3. **Ateena, Herodes Atticuksen odeion**: teksti sanoo Ateenan festivaalin esityksiä järjestettävän "joka vuosi toukokuusta lokakuuhun". Väite nojaa englanninkieliseen Wikipediaan; käytännössä ohjelmisto painottuu kesäkuukausiin. Jos haluat varmuuden, lause voi sanoa vain "kesäkuukausina".
4. **Ääntäminen** (molemmat kaupungit): uusia vieraskielisiä nimiä tuli kaksi, Stoa Poikile (Ateena) ja Herengrachtin Kultainen mutka (Amsterdam, oli jo ennen). Muuten uudet tekstit välttävät vaikeita nimiä: Amsterdamin aseman kierrosversiosta poistui Concertgebouw, ja Kattenkabinet sanotaan muodossa "pieni kissataiteen museo".
5. **Amsterdam, isoisä**: olen samaa mieltä edellisten kanssa. Päiväkirjamerkintä kertoo ullakkokirkosta (Ons' Lieve Heer op Solder), jota ei ole pohjan kohteissa, joten isoisää ei mainita.

# Toimituksellinen tarkistus: Berliini ja Bryssel

Tarkistaja: toimituksellinen passi 7.10.2026. Verkko auki, kaikki alla olevat lähteet avattu WebFetchillä.
Koneellinen tarkistus: Berliini 0 virhettä, 8 huomiota (sama kuin ennen passia).

## Berliini

### Brandenburgin portti — kenttä `teksti`
- **Vanha:** "…joista leveintä keskimmäistä sai käyttää vain hovi."
- **Uusi:** "…joista leveintä keskimmäistä sai käyttää vain kuninkaallinen perhe."
- **Syy:** Löydöstyyppi 3 (faktan vivahde). Keskiaukko oli varattu kuninkaalliselle perheelle, ei koko hoville. Wikipedia: "Only the royal family was allowed to pass through the central archway" (lisäksi Pfuelin suku 1814–1919).
- **Lähde:** https://en.wikipedia.org/wiki/Brandenburg_Gate

### Brandenburgin portti — kenttä `lyhyt`
- **Vanha:** "Brandenburgin portin esikuvana oli Ateenan Akropoliin porttirakennus. Portti rakennettiin kohtaan, josta tie lähti Brandenburg an der Haveliin, ja siitä alkaa yhä Unter den Linden -bulevardi, joka johtaa entiselle kaupunkilinnalle ja tuomiokirkolle."
- **Uusi:** "Brandenburgin portin esikuvana oli Ateenan Akropoliin porttirakennus. Kun Yhdysvaltain presidentti John Kennedy vieraili Berliinissä vuonna 1963, neuvostoliittolaiset ripustivat portin pylväiden väliin suuret punaiset kankaat, jottei hän voisi katsoa portin läpi itään."
- **Syy:** Löydöstyyppi 2 (kierrosversio oli perustietoa: esikuva, tien lähtökohta ja bulevardin suunta — matkaopasfaktaa, josta ei jää mitään mieleen). Tilalle tapahtuma ja ihminen: Kennedyn vierailu ja punaiset kankaat. Vuoden 1873 tielinjaus ei myöskään kerro portista nykyajassa mitään.
- **Lähde:** https://en.wikipedia.org/wiki/Brandenburg_Gate ("In 1963, U.S. President John F. Kennedy visited the Brandenburg Gate. The Soviets hung large red banners across it to prevent him looking into East Berlin.")

### Valtiopäivätalo — kenttä `teksti`
- **Vanha:** "…mutta päätykolmion omistuskirjoitus Saksan kansalle lisättiin vasta joulukuussa 1916…"
- **Uusi:** "…mutta omistuskirjoitus Saksan kansalle lisättiin pääportaalin yläpuolelle vasta joulukuussa 1916…"
- **Syy:** Löydöstyyppi 3. Kirjoitus Dem deutschen Volke on länsiportaalin pääsisäänkäynnin arkkitraavissa, ei päätykolmiossa. Kirjaimet kiinnitettiin 20.–24.12.1916.
- **Lähde:** https://de.wikipedia.org/wiki/Reichstagsgeb%C3%A4ude

### Berliinin televisiotorni — kenttä `lyhyt`
- **Vanha:** "Berliinin televisiotornin pallossa on näköalatasanne ja vähän sen yläpuolella ravintola, joka kiertää täyden kierroksen puolessa tunnissa. Torni aloitti koelähetykset lokakuussa 1969, ja virallisesti se vihittiin neljä päivää myöhemmin Itä-Saksan kansallispäivänä."
- **Uusi:** "Berliinin televisiotornin pallossa runsaan kahdensadan metrin korkeudessa on ravintola, joka kiertää täyden kierroksen puolessa tunnissa. Aluksi kierros kesti tunnin, mutta vuoden 1997 korjauksessa vauhti kaksinkertaistettiin. Yleisölle torni avattiin Itä-Saksan kansallispäivänä lokakuussa 1969."
- **Syy:** Löydöstyyppi 3 JA 2. Vanha väite oli väärinpäin: Ulbricht vihki tornin 3.10.1969 ja yleisö pääsi sisään vasta 7.10.1969, joka oli kansallispäivä — vihkiminen ei siis ollut kansallispäivänä. Samalla tilalle tuli muistettava yksityiskohta (ravintolan pyörimisnopeus kaksinkertaistettiin) pelkän vihkimisseremonian sijaan. Poistin myös sanan "näköalatasanne", joka toistui Voitonpylvään kierrosversiossa (löydöstyyppi 1).
- **Lähde:** https://en.wikipedia.org/wiki/Fernsehturm_Berlin

### Museosaari — kenttä `lyhyt`
- **Vanha:** "Museosaaren Pergamon-museo on ollut kokonaan suljettuna peruskorjauksen vuoksi vuodesta 2023, ja sen on määrä avautua osittain uudelleen vuonna 2027 ja kokonaan vasta noin vuonna 2037. Saaren uusi sisäänkäyntirakennus, James Simonin galleria, avattiin vuonna 2019."
- **Uusi:** "Museosaaren Pergamon-museon kuuluisin aarre on Pergamonin alttarin suuri kuvafriisi, jonka Puna-armeija vei sodan jälkeen Leningradiin. Friisi palasi Itä-Berliiniin vuonna 1959. Museo on nyt peruskorjauksen vuoksi suljettu, ja sen pohjoissiipi avautuu vuonna 2027."
- **Syy:** Löydöstyyppi 2. Vanha kierrosversio oli pelkkää hallintoa: remonttiaikataulu kolmella vuosiluvulla ja uuden sisäänkäyntirakennuksen avajaiset. Tilalle tarina (friisi purettiin 1941, Puna-armeija vei sen sotasaaliina, Eremitaasin varastossa Leningradissa vuoteen 1958, palautus 1959) ja nykytila yhdellä virkkeellä.
- **Lähde:** https://en.wikipedia.org/wiki/Pergamon_Altar ja https://en.wikipedia.org/wiki/Pergamon_Museum

### Berliinin tuomiokirkko — kenttä `teksti`
- **Vanha:** "Keisari Vilhelm toinen piti Karl Friedrich Schinkelin uusklassista kirkkoa liian vaatimattomana…"
- **Uusi:** "Keisari Vilhelm toinen piti vanhaa barokkikirkkoa, jonka Karl Friedrich Schinkel oli muuttanut uusklassiseksi, liian vaatimattomana…"
- **Syy:** Löydöstyyppi 3 (kuka rakensi vs. kuka suunnitteli). Schinkel ei suunnitellut paikalla ollutta kirkkoa, vaan muutti Johann Boumann vanhemman barokkikirkon (1747–1750) sisä- ja ulkoasun uusklassiseksi 1817 ja 1820–1822.
- **Lähde:** https://en.wikipedia.org/wiki/Berlin_Cathedral

### Berliinin tuomiokirkko — kenttä `teksti`
- **Vanha:** "…jossa on lähes sata sukuun kuuluneiden arkkua ja hautamuistomerkkiä neljän vuosisadan ajalta."
- **Uusi:** "…jossa on lähes sata arkkua ja hautamuistomerkkiä neljän vuosisadan ajalta."
- **Syy:** Löydöstyyppi 6. "Sata sukuun kuuluneiden arkkua" ei ole suomea, jonka opas sanoisi ääneen (genetiivimonikko + partitiivi ei kongruoi), ja määre on tarpeeton, koska holvi on jo nimetty Hohenzollernien hautaholviksi.
- **Lähde:** https://www.berlinerdom.de/en/visiting/about-the-cathedral/the-cathedral-since-1993/

### Berliinin tuomiokirkko — kenttä `lyhyt`
- **Vanha:** "Berliinin tuomiokirkko vaurioitui pahoin toisessa maailmansodassa, ja se avattiin uudelleen vasta vuonna 1993, kun sisätilojen kalliit korjaukset valmistuivat. Kirkon suuret urut rakensi Wilhelm Sauerin urkutehdas vuonna 1905, ja niissä on yli seitsemäntuhatta pilliä."
- **Uusi:** "Berliinin tuomiokirkkoon osui toukokuussa 1944 palopommi, joka sytytti kupolin huipulla olevan lyhdyn, ja palava lyhty romahti kirkon lattialle. Pääsali vihittiin uudelleen vasta vuonna 1993. Kirkon suuret urut rakensi Wilhelm Sauerin urkutehdas, ja niissä on yli seitsemäntuhatta pilliä."
- **Syy:** Löydöstyyppi 2. "Vaurioitui pahoin ja avattiin uudelleen, kun kalliit korjaukset valmistuivat" on hallintoa ja yleispätevää; mikä tahansa sodan kokenut kirkko voisi sanoa saman. Lähde antaa tarkan tapahtuman: 24.5.1944 palavaa nestettä sisältänyt pommi osui kupolin lyhtyyn, tulta ei saatu sammumaan ja lyhty romahti pääkerrokseen. Urkutieto säilytettiin, vuosiluku 1905 poistettiin siitä, koska se toistui tekstissä.
- **Lähde:** https://en.wikipedia.org/wiki/Berlin_Cathedral

### East Side Gallery — kenttä `lyhyt`
- **Vanha:** "Säälle ja töhryille alttiin East Side Galleryn maalaukset kärsivät vuosien mittaan, ja vuonna 2009 Vrubelin suudelma pyyhittiin muurista. Taiteilija maalasi sen uudelleen. Teoksen nimi on Jumala, auta minua selviytymään tästä kuolettavasta rakkaudesta."
- **Uusi:** "Säästä ja töhryistä kärsineet East Side Galleryn maalaukset uusittiin vuonna 2009, mutta kahdeksan alkuperäistä taiteilijaa kieltäytyi maalaamasta teostaan toiseen kertaan. Heidän työnsä oli pyyhitty pois, ja he vaativat tekijänoikeuksiaan, kun kuvia jäljennettiin ilman lupaa."
- **Syy:** Löydöstyyppi 1. Kohteen `teksti` kertoo jo Vrubelin suudelmamaalauksesta ja sen esikuvavalokuvasta, ja `lyhyt` jatkoi täsmälleen samasta maalauksesta — saman kohteen lyhyt ja teksti eivät saa kertoa samaa asiaa. Tilalle sama tapahtuma (vuoden 2009 kunnostus) toisesta, yllättävästä kulmasta: kahdeksan taiteilijaa kieltäytyi ja perusti tekijänoikeusryhmän.
- **Lähde:** https://en.wikipedia.org/wiki/East_Side_Gallery

### Checkpoint Charlie — kenttä `lyhyt`
- **Vanha:** "…ja alkuperäinen koppi on liittoutuneiden museossa."
- **Uusi:** "…ja viimeinen aito koppi on liittoutuneiden museossa Zehlendorfissa."
- **Syy:** Löydöstyyppi 3. Museossa ei ole vuoden 1961 alkuperäinen koppi vaan rajanylityspaikan viimeinen vartiokoppi; museon oma sivu sanoo "the last guardhouse of Checkpoint Charlie". Lisäsin sijainnin, koska museo on kaukana keskustasta.
- **Lähde:** https://www.alliiertenmuseum.de/en/

### Potsdamer Platz — kenttä `teksti`
- **Vanha:** "…ja ylhäältä Sony Centerin teltan muotoinen lasikatto erottuu kuin jättimäinen sateenvarjo."
- **Uusi:** "…ja ylhäältä entisen Sony Centerin teltan muotoinen lasikatto erottuu kuin jättimäinen sateenvarjo."
- **Syy:** Löydöstyyppi 5 (uudelleennimetty kohde). Sonyn nimioikeudet päättyivät 31.3.2023, ja omistajat Oxford Properties ja Norges Bank nimesivät korttelin uudelleen; se on nyt Das Center am Potsdamer Platz. Uusi nimi on vielä vakiintumaton, joten teksti kirjoitettiin niin ettei se vanhene uudelleen: tunnistettava maamerkki mainitaan entisenä nimenä.
- **Lähde:** https://www.oxfordproperties.com/news/oxford-properties-and-norges-bank-rename-berlins-sony-center-as-part-of-200-million-repositioning

### Potsdamer Platz — kenttä `kysymykset`
- **Vanha:** "Kuka suunnitteli Sony Centerin katon?" ja "Mitä Sony Centerin katon alla on?"
- **Uusi:** "Kuka suunnitteli teltan muotoisen lasikaton?" ja "Mitä teltan muotoisen katon alla on?"
- **Syy:** Löydöstyypit 5 ja 7. Kysymyksen oletuksen on oltava tosi, eikä kohde enää kanna Sonyn nimeä.
- **Lähde:** sama kuin yllä.

### Gendarmenmarkt — kenttä `teksti`
- **Vanha:** "…on tori, jonka keskellä seisoo Karl Friedrich Schinkelin suunnittelema konserttitalo…"
- **Uusi:** "…on tori, jonka länsilaidalla seisoo Karl Friedrich Schinkelin suunnittelema konserttitalo…"
- **Syy:** Löydöstyyppi 3. Konserttitalo ei seiso torin keskellä vaan sen länsilaidalla; ranskalainen kirkko on torin pohjoispäässä ja saksalainen eteläpäässä, joten "molemmin puolin" pitää paikkansa vasta länsilaidalta katsottuna. Kamera lentää yllä, joten väärä sijainti näkyisi kuvassa.
- **Lähde:** https://de.wikipedia.org/wiki/Gendarmenmarkt

### Oberbaumbrücke — kenttä `teksti`
- **Vanha:** "Arkkitehti Otto Stahn viimeisteli sillan vuonna 1896 pohjoissaksalaiseen tiiligotiikkaan…"
- **Uusi:** "Silta rakennettiin vuonna 1896 Otto Stahnin suunnitelmien mukaan pohjoissaksalaiseen tiiligotiikkaan…"
- **Syy:** Löydöstyyppi 3 (kuka rakensi vs. kuka suunnitteli). Stahn oli suunnittelija; silta valmistui hänen suunnitelmiensa mukaan, hän ei "viimeistellyt" sitä.
- **Lähde:** https://en.wikipedia.org/wiki/Oberbaum_Bridge

### Oberbaumbrücke — kenttä `teksti`
- **Vanha:** "…ja sen vieressä joessa on vuodesta 1999 seissyt Jonathan Borofskyn kolmenkymmenen metrin korkuinen Molekyylimies-veistos."
- **Uusi:** "…ja sen lähellä joessa on vuodesta 1999 seissyt Jonathan Borofskyn kolmenkymmenen metrin korkuinen veistos Molecule Men, jossa kolme hahmoa sulautuu toisiinsa."
- **Syy:** Löydöstyyppi 3. Teoksen nimi on Molecule Men monikossa, ja siinä on kolme toisiinsa sulautuvaa hahmoa — "Molekyylimies" on sekä keksitty suomennos että väärä lukumäärä. Veistos ei myöskään ole sillan vieressä vaan sen lähellä, kolmen kaupunginosan rajakohdassa.
- **Lähde:** https://www.visitberlin.de/en/molecule-men

### Oberbaumbrücke — kentät `syventava` ja `kysymykset`
- **Vanha:** syventava "Mitä Molekyylimies-veistos esittää?"; kysymys "Mitä Molekyylimies-veistos esittää?"
- **Uusi:** syventava "Mitä Molecule Men -veistos esittää?"; kysymys "Miksi sillan tornit muistuttavat kaupunginporttia?"
- **Syy:** Löydöstyypit 3 ja 7. Nimi korjattu, ja kysymys oli sanatarkka kopio syventävästä kysymyksestä eli kuluneena paikkana hukkaan heitetty. Uusi kysymys on kohdekohtainen ja sen oletus tosi (tornien esikuvana Prenzlaun Mitteltorturm).
- **Lähde:** https://en.wikipedia.org/wiki/Oberbaum_Bridge

### Berliinin päärautatieasema — kenttä `teksti`
- **Vanha:** "Rakennuttaja pyysi lyhentämään lasikattoa noin sadalla metrillä, jotta työt saataisiin päätökseen aiemmin."
- **Uusi:** "Rautatieyhtiö lyhensi lasikattoa suunnitellusta runsaalla sadalla metrillä, jotta asema valmistuisi ajoissa jalkapallon maailmanmestaruuskisoihin."
- **Syy:** Löydöstyyppi 3. Edellinen tarkistaja oli muuttanut luvun lähteen varassa, jonka url ei ole olemassa (www.wikipedia.org/wiki/Berlin_Hbf). Saksankielinen Wikipedia antaa tarkat mitat: hallin katto lyheni suunnitellusta 454,6 metristä 321 metriin eli noin 133 metriä, joten "noin sata metriä" alittaa todellisen. "Runsaalla sadalla metrillä" kestää kummankin lähteen (en: noin 100 m, de: 133 m). Lisäksi syy täsmennettiin: aikataulupaine vuoden 2006 maailmanmestaruuskisoihin, ei yleinen "työt päätökseen aiemmin". Virheellinen url korvattiin kahdella avatulla lähteellä.
- **Lähde:** https://de.wikipedia.org/wiki/Berlin_Hauptbahnhof ja https://en.wikipedia.org/wiki/Berlin_Hauptbahnhof

### Berliinin päärautatieasema — kenttä `lahteet`
- **Vanha:** väite "Euroopan suurin tornirautatieasema" lähteenä en.wikipedia, joka ei sano sitä.
- **Uusi:** väite jaettu kahtia: rakenteellinen tornirautatieasema (en.wikipedia) ja superlatiivi erillisellä lähteellä.
- **Syy:** Löydöstyyppi 3 (superlatiivi: minkä mittarin mukaan). Englannin- eikä saksankielinen Wikipedia ei sano asemaa Euroopan suurimmaksi tornirautatieasemaksi; superlatiivi löytyy Berlinin kaupunkipalvelun sivulta ("der größte Turmbahnhof Europas"), joten teksti jätettiin ennalleen mutta väite sai lähteen, jonka itse avasin. Jää Päätoimittajan harkintaan, halutaanko superlatiivi pitää näin ohuella lähteellä.
- **Lähde:** https://www.berlinstadtservice.de/xinh/Hauptbahnhof_Berlin.html

### Berliini — avaus (`avaukset/berliini.md`)
Ei korjattavaa. Tarkistettu: 37 sanaa, alkaa suomenkielisellä sanalla ("Tervetuloa"), kuva on aidosti ilmasta nähtävä (tasainen kattojen, puistojen ja järvien maisema, Spree länteen, Tiergarten keskustan länsilaidalla), ja kierroksen ensimmäinen kohde on televisiotorni = pohjan `kierros[0]`. Spreen virtaussuunta länteen ja tornin hopeanhohtoinen teräspallo tarkistettu.

### Berliini — harkitut mutta muuttamatta jätetyt kohdat
- **Edellisen tarkistajan epävarmuudet ratkaistu:** (a) Brandenburgin portin `koko_m` 65 — Wikipedian leveys 62,5 m on rakenteen leveys, ja kameramitta 65 kehystää portin aukion laidalla oikein; jätetty ennalleen. (b) Televisiotornin "kirkkoja vierastanut valtio" — lähde vahvistaa, että lempinimi paavin kosto syntyi juuri siitä, että virallisesti ateistinen valtio poisti kirkoista ristejä ja sai ristin torniinsa; tulkinta pitää ja jätetty ennalleen. (c) Valtiopäivätalon Christo-kääre ja Fosterin korjaustöiden järjestys — kääre oli 24.6.–7.7.1995 ja työt alkoivat heti sen jälkeen; teksti ei väitä järjestyksestä mitään, joten ennallaan.
- **Voitonpylväs:** kierrosversio tarkistettu (Drake, Goldelse, 8,3 m, Obama 24.7.2008) — pitää, ei muutettu. Tekstin ja kierrosversion päällekkäisyys kullatusta huippuveistoksesta on vain visuaalinen maininta ylhäältä, ja kierrosversio lisää tekijän, lempinimen ja mittakaavan.
- **Keisari Vilhelmin muistokirkko, kysymys "Mitä Breitscheidplatzin joulumarkkinoilla tapahtui?":** oletus on tosi ja kysymys kohdekohtainen, mutta vastaus syntyy livenä ja koskee vuoden 2016 terrori-iskua. Ei kuulu seitsemään löydöstyyppiin, joten jätin sen, mutta jätän Päätoimittajalle harkittavaksi, halutaanko kysymys muotoilla niin että vastaus ohjautuu muistomerkkiin eikä itse iskuun.
- **Gendarmenmarktin kysymys joulumarkkinoista:** tarkistettu nykytila — markkinat olivat Bebelplatzilla torin peruskorjauksen aikana 2022–2024 ja palasivat Gendarmenmarktille 2025, joten oletus on taas tosi. Peruskorjaus valmistui maaliskuussa 2025.
- **Berliinin olympiastadion:** syventävä kysymys ja ensimmäinen Kysy-kysymys ovat sanatarkasti samat ("Kuka oli Jesse Owens?"). Ohje sallii tämän kertaalleen kaupungissa, ja korjasin Oberbaumbrücken vastaavan, joten kaupungissa on enää yksi tällainen toisto. Jätetty tarkoituksella.

## Bryssel

Koneellinen tarkistus: 0 virhettä, 12 huomiota (ennen passia 13; Atomiumin kierrosversio alkaa nyt taivutetulla nimellä, joten yksi huomio poistui).
Huomio: edellinen tarkistaja kirjasi tarkistaneensa väitteet WebSearchilla eikä avannut lähteitä. Kolme lähdesivua oli kuollut tai ristiriidassa väitteensä kanssa, ja ne löytyivät vasta avaamalla.

### Grand-Place — kenttä `lyhyt`
- **Vanha:** "Brysselin keskusaukiolla Grand-Placella asui maanpaossa kirjailija Victor Hugo, peräti kahdessa eri talossa. Karl Marx taas juhli uutta vuotta 1848 aukion Joutsen-nimisessä talossa työläisyhdistyksen kanssa. Aukio on ollut Unescon maailmanperintökohde vuodesta 1998."
- **Uusi:** "Brysselin keskusaukiolla Grand-Placella asui vuonna 1852 maanpaossa kirjailija Victor Hugo, Kyyhkysen talossa. Saman aukion Joutsenen talossa Karl Marx kirjoitti osan Kommunistisesta manifestista, ja talossa toimii nykyään ravintola. Aukio on ollut Unescon maailmanperintökohde vuodesta 1998."
- **Syy:** Löydöstyyppi 3. Kumpikaan vanha väite ei kestänyt tarkistusta. (a) "Peräti kahdessa eri talossa": Hugon asumisesta Grand-Placella löytyy vain Le Pigeon eli Kyyhkysen kiltatalo vuonna 1852; toista taloa ei vahvistanut yksikään avattu lähde, ja väitteen alkuperäinen lähde (bruxellessecrete) ei palauta enää sisältöä. Väite jätetty pois ja tilalle tarkka vuosi ja talon nimi. (b) Marxin uudenvuodenaatto 1847/1848 Deutscher Arbeitervereinin kanssa: lähteeksi merkitty lamaisonducygne.com/history antaa 404, ja talon nykyinen oma historiasivu kertoo vain, että Marx ja Engels kirjoittivat siellä osan Kommunistisesta manifestista. Väite vaihdettu siihen, minkä kaksi avattua lähdettä vahvistavat.
- **Lähde:** https://en.wikipedia.org/wiki/Grand-Place , https://www.brusselstimes.com/50850/the-10-most-famous-emigres-to-call-brussels-home , https://www.lamaisonducygne.com/en/histoire/

### Brysselin kaupungintalo — kenttä `lyhyt`
- **Vanha:** "Brysselin kaupungintalo oli vuoden 1695 pommituksessa tykkien päämaali. Tuli tuhosi sen sisätilat, arkiston ja taidekokoelmat, mutta kivinen julkisivu ja torni kestivät. Nykyäänkin talo on Brysselin kaupunginhallinnon istuin, ja sen juhlasaleissa vietetään yhä tilaisuuksia."
- **Uusi:** "Brysselin kaupungintalon julkisivua koristaa lähes kolmesataa patsasta, mutta ne ovat 1800-luvun kunnostusten työtä. Alkuperäiset 1400-luvun veistokset ja tornin huipun alkuperäinen Pyhä Mikael ovat aukion toisella puolella kaupunginmuseossa. Virastot muuttivat talosta pois vuonna 2023, mutta pariskuntia vihitään siellä yhä."
- **Syy:** Löydöstyypit 1 ja 5. (1) Grand-Place on kierroksen ensimmäinen kohde ja kaupungintalo heti toinen, ja Grand-Placen `teksti` kertoo jo saman asian samoilla yksityiskohdilla: "Elokuussa 1695 Ranskan armeija pommitti kaupunkia… pystyyn jäivät vain kaupungintalon julkisivu ja torni." Pelaaja olisi kuullut saman tarinan kaksi kertaa peräkkäin. (5) Väite kaupunginhallinnon istuimesta on vanhentunut: hallinnon toimistot siirtyivät talosta muualle vuonna 2023, ja taloon jäivät edustustehtävät ja vihkimiset. Uusi kierrosversio kertoo yllätyksen, joka näkyy paikan päällä: keskiaikaiselta näyttävät patsaat ovat 1800-luvun työtä, ja alkuperäiset ovat museossa aukion toisella laidalla.
- **Lähde:** https://en.wikipedia.org/wiki/Brussels_Town_Hall

### Manneken Pis — kenttä `teksti`
- **Vanha:** "…ja nykyisen hahmon veisti kuvanveistäjä Jérôme Duquesnoy vanhempi vuonna 1619."
- **Uusi:** "…ja hahmon veisti alun perin kuvanveistäjä Jérôme Duquesnoy vanhempi vuonna 1619."
- **Syy:** Löydöstyyppi 3. "Nykyisen hahmon" on ristiriidassa seuraavan virkkeen kanssa, joka kertoo kulmassa seisovan vuoden 1965 kopion. Duquesnoyn työ on alkuperäinen patsas, joka on kaupunginmuseossa.
- **Lähde:** https://en.wikipedia.org/wiki/Manneken_Pis

### Manneken Pis — kenttä `teksti`
- **Vanha:** "Kun Ranskan kuninkaan Ludvig viidennentoista sotilaat veivät patsaan vuonna 1747, kuningas lahjoitti pojalle anteeksipyynnöksi kultakirjaillun asun."
- **Uusi:** "Kerrotaan, että Ranskan kuninkaan Ludvig viidennentoista sotilaat veivät patsaan vuonna 1747, ja anteeksipyynnöksi kuningas lahjoitti pojalle kultakirjaillun asun."
- **Syy:** Löydöstyyppi 3 (legendan ja tosiasian ero). Kaupungin oma sivu kertoo varkaudesta tapahtuneena, mutta Wikipedia sanoo krenatöörien *yrittäneen* viedä patsaan ja merkitsee tapauksen perimätiedoksi. Lähteet ovat ristiriidassa siitä, onnistuiko varkaus, joten väite merkitään kerrotuksi. Asun lahjoitus on riidaton.
- **Lähde:** https://en.wikipedia.org/wiki/Manneken_Pis ja https://www.mannekenpis.brussels/en/the-oldest-outfit-in-the-collection

### Manneken Pis — kenttä `lyhyt`
- **Vanha:** "Pronssipojalla, Manneken Pisillä, on oma vaatekaappi: kokoelmassa on yli tuhat asua, ja joka vuosi niitä tulee parikymmentä lisää. Asut ovat esillä läheisessä museossa, mutta poliittisia, uskonnollisia ja mainosasuja poika ei pue ylleen."
- **Uusi:** "Pronssipojalla, Manneken Pisillä, on oma vaatekaappi: kokoelmassa on yli tuhat asua. Asuista päättää Manneken Pisin ystävien veljeskunta, joka käy läpi satoja ehdotuksia vuodessa, ja asut ovat esillä aivan lähellä omassa museossaan."
- **Syy:** Löydöstyyppi 3. Molemmat vanhat yksityiskohdat olivat edellisen tarkistajan omien epävarmuuksien listalla, ja kumpaakaan ei saanut vahvistettua: brussels.be:n sivu, joka oli merkitty lähteeksi, kertoo vain asujen määrän (yli tuhatsataneljäkymmentä) eikä sano mitään vuosittaisesta lisäyksestä eikä kielletyistä asutyypeistä. Tilalle vahvistettu ja parempi yksityiskohta: valinnoista päättää Manneken Pisin ystävien veljeskunta, joka käy läpi satoja ehdotuksia vuodessa.
- **Lähde:** https://en.wikipedia.org/wiki/Manneken_Pis ja https://www.brussels.be/node/59695

### Kuninkaanpalatsi — kenttä `lyhyt`
- **Vanha:** "Kuninkaanpalatsin paikalla seisoi ennen Coudenbergin palatsi, joka paloi helmikuussa 1731. … Raunioiden päälle rakennettiin myöhemmin Kuninkaallinen aukio, ja vanhan palatsin kellareihin pääsee nyt maan alle museon kautta."
- **Uusi:** "Kuninkaanpalatsin naapurissa, nykyisen Kuninkaallisen aukion alla, seisoi Coudenbergin palatsi, joka paloi helmikuussa 1731. … Rauniot peitettiin aukion alle, ja vanhan palatsin saleihin pääsee nyt maan alle museon kautta."
- **Syy:** Löydöstyyppi 3, ja teksti oli myös itsensä kanssa ristiriidassa. Coudenbergin palatsi ei seisonut nykyisen kuninkaanpalatsin paikalla: palatsin rauniot jäivät Kuninkaallisen aukion alle, joka rakennettiin niiden päälle vuoden 1775 jälkeen, ja nykyisen palatsin tontilla oli kaksi uutta kaupunkipalatsia. Vanha kierrosversio väitti ensin palatsin seisoneen samalla paikalla ja sitten raunioiden jääneen aukion alle. Kamera katsoo kohdetta ylhäältä, joten paikka on näkyvä asia.
- **Lähde:** https://en.wikipedia.org/wiki/Royal_Palace_of_Brussels

### Pyhän Mikaelin ja Pyhän Gudulan katedraali — kenttä `lyhyt`
- **Vanha:** "Pyhän Mikaelin ja Pyhän Gudulan katedraali sai katedraalin aseman vasta vuonna 1962."
- **Uusi:** "Pyhän Mikaelin ja Pyhän Gudulan katedraali sai katedraalin arvon vasta vuonna 1962, ja se jakaa arvon Mechelenin tuomiokirkon kanssa."
- **Syy:** Löydöstyyppi 3 (titteli ja asema). Kirkosta tuli vuonna 1962 Mechelenin ja Brysselin arkkihiippakunnan *toinen* katedraali, ei hiippakunnan ainoa; arkkihiippakunnan pääkirkko on Mechelenin tuomiokirkko.
- **Lähde:** https://en.wikipedia.org/wiki/Cathedral_of_St._Michael_and_St._Gudula

### Oikeuspalatsi — kenttä `lyhyt`
- **Vanha:** "Oikeuspalatsin julkisivulle pystytettiin telineet vuonna 1984, ja niistä tuli vuosikymmeniksi osa kaupunkikuvaa. Vasta vuonna 2026 etujulkisivu näkyi ilman telineitä ensimmäistä kertaa yli neljäänkymmeneen vuoteen. Koko rakennuksen kunnostuksen arvioidaan maksavan yli kuusisataa miljoonaa euroa."
- **Uusi:** "Oikeuspalatsin julkisivulle pystytettiin telineet vuonna 1984, ja niistä tuli vuosikymmeniksi osa kaupunkikuvaa. Lopulta telineet olivat niin kuluneet, että ne oli kunnostettava ennen kuin niiltä voitiin korjata itse rakennusta. Etujulkisivu nähtiin ilman telineitä vuonna 2026 ensimmäistä kertaa yli neljäänkymmeneen vuoteen."
- **Syy:** Löydöstyyppi 2. Kustannusarvio on hallintoa, josta ei jää mieleen mitään, ja se vanhenee. Tilalle lähteestä löytynyt yksityiskohta, joka kertoo koko tarinan yhdellä iskulla: telineet olivat vuosikymmenten käytön jäljiltä niin huonossa kunnossa, että liittovaltio joutui kunnostamaan telineet ennen kuin niiltä voi kunnostaa rakennusta. Kustannusarvio ja aikataulu jäivät `lahteet`-kenttään.
- **Lähde:** https://www.brusselstimes.com/160259/scaffolds-on-brussels-palace-of-justice-get-renovated-federal-government-public-buildings-administration-place-poelaert-minimes-laines-wynants-mathieu-michel ja https://www.vrt.be/vrtnws/en/2026/08/28/facade-of-justice-palace-visible-for-first-time-in-40-years-vid/

### Saint-Hubertin kauppakäytävät — kenttä `lyhyt`
- **Vanha:** "…kun veljesten Lumière liikkuvat kuvat tulivat tuoreeltaan Pariisista."
- **Uusi:** "…kun Lumièren veljesten liikkuvat kuvat tulivat tuoreeltaan Pariisista."
- **Syy:** Löydöstyyppi 6. "Veljesten Lumière" on käännöskieltä, jota suomalainen opas ei sanoisi ääneen; suomessa määrite tulee ennen pääsanaa.
- **Lähde:** —

### Saint-Hubertin kauppakäytävät — kenttä `lahteet`
- **Vanha:** väitteen "Näytös pidettiin sanomalehti La Chroniquen tiloissa" lähteenä Brussels Times, joka sanoo näytöksen paikaksi lehden *La Quotidien*.
- **Uusi:** lisätty lähde, joka vahvistaa La Chroniquen (Galerie du Roi 7, muistolaatta), ja Brussels Timesin väite kirjattu erikseen.
- **Syy:** Löydöstyyppi 3. Lähde ei tukenut väitettä, jonka tueksi se oli merkitty. Ranskankieliset lähteet vahvistavat La Chroniquen toimituksen ja osoitteen, joten itse teksti pitää ja sai oikean lähteen. Samalla varmistui, että 1.3.1896 oli ensimmäinen *julkinen* näytös: yksityinen näytös oli pidetty 10.11.1895.
- **Lähde:** https://www.lalibre.be/regions/bruxelles/2022/06/22/les-secrets-des-galeries-royales-saint-hubert-a-bruxelles-M56YH24DVRDIFGSAX73V4NI72U/

### Atomium — kenttä `lyhyt`
- **Vanha:** "Maamerkki Atomium oli 1990-luvun lopulla niin huonossa kunnossa, että se oli vähällä joutua puretuksi. Kunnostuksessa, joka valmistui vuonna 2006, pallojen alkuperäinen alumiinipinta vaihdettiin ruostumattomaan teräkseen, joka kestää syöpymistä paremmin ja eristää ääntä."
- **Uusi:** "Atomiumin pallojen alumiinikuori oli vuosikymmenten jäljiltä niin kulunut, että se vaihdettiin kokonaan ruostumattomaan teräkseen kunnostuksessa, joka valmistui vuonna 2006. Vanhat kolmiolevyt myytiin kunnostuksen rahoittamiseksi yleisölle muistoiksi, ja parimetrisestä levystä maksettiin tuhat euroa."
- **Syy:** Löydöstyypit 3, 1 ja 2. (3) Kaksi väitettä nojasi yhteen lähteeseen, atomium.be:n kunnostussivuun, joka antaa nyt 404: "oli vähällä joutua puretuksi 1990-luvun lopulla" ja "eristää ääntä". Kumpaakaan ei vahvista yksikään avattu lähde, joten ne jätettiin pois; Wikipedia sanoo vain, että huoltoa oli tehty kolmenkymmenen vuoden ajan vain vähän ja levyt olivat haalistuneet. (1) Purkamisuhka toistui myös kohteen `teksti`-versiossa ("suosio pelasti sen purkamiselta"), joten kierrosversio kertoi samaa asiaa. (2) Tilalle konkreettinen ja muistettava tarina: vanhat kolmiolevyt myytiin yleisölle, ja noin kaksimetrinen levy meni tuhannella eurolla. Kierrosversio alkaa nyt taivutetulla nimellä, joten koneellinen huomio väheni yhdellä.
- **Lähde:** https://en.wikipedia.org/wiki/Atomium

### Berlaymont — kenttä `teksti`
- **Vanha:** "…näkyy ylhäältä ristinä, jonka neljä siipeä haarautuvat keskiosasta…"
- **Uusi:** "…näkyy ylhäältä ristinä, jonka neljä siipeä haarautuu keskiosasta…"
- **Syy:** Löydöstyyppi 6 (kongruenssi). Lukusanasubjekti saa yksikön: sama virhetyyppi, jonka kirjoittajan ohje nimeää esimerkkinä ("kolmekymmentä patsasta reunustavat" → "reunustaa").
- **Lähde:** —

### Brysselin pörssi — kenttä `teksti`
- **Vanha:** "Viimeiset meklarit lähtivät talosta vuonna 2015, ja vuodesta 2023 yläkerroksissa on toiminut olutmuseo Belgian Beer World."
- **Uusi:** "Pörssilattian kauppa loppui talossa vuonna 1996, pörssi muutti pois vuonna 2015, ja vuodesta 2023 yläkerroksissa on toiminut olutmuseo Belgian Beer World."
- **Syy:** Löydöstyyppi 3. Meklarit eivät lähteneet vuonna 2015: pörssilattian kauppa loppui heinäkuussa 1996, kun kassamarkkinat siirtyivät kokonaan tietokoneille, ja vuonna 2015 talosta muutti pois Euronext Brussels sen jälkeen kun kaupunki oli purkanut vuokrasopimuksen 2012. Vanha muotoilu nojasi yhteen lehtiartikkeliin.
- **Lähde:** https://en.wikipedia.org/wiki/Bourse_Palace

### Bryssel — avaus (`avaukset/bryssel.md`)
Ei korjattavaa. Tarkistettu: 35 sanaa, alkaa suomenkielisellä sanalla, kuva on ilmasta nähtävä (vanhan keskustan viisikulmio, bulevardien kehä entisten muurien paikalla, yläkaupunki itälaidalla), ja kierroksen ensimmäinen kohde on Grand-Place = pohjan `kierros[0]`.

### Bryssel — harkitut mutta muuttamatta jätetyt kohdat
- **Edellisen tarkistajan epävarmuudet ratkaistu:** (a) Begonioiden määrä: Wikipedia sanoo kukkia olevan lähes miljoona (begonioita ja daalioita) ja maton olevan joka parillisen vuoden elokuussa, joten "yli puoli miljoonaa begoniaa" pitää paikkansa; lähde lisätty, teksti ennallaan. (b) Manneken Pisin vuosittaiset asut ja asukiellot: ei vahvistunut, väitteet poistettu (ks. yllä). (c) Atomiumin ääneneristys: ei vahvistunut, poistettu (ks. yllä). (d) Kaupungintalon Pyhä Mikael tuuliviirinä: vahvistui Wikipediasta; samalla selvisi, että huipulla oleva on jäljennös. (e) Saint-Hubertin suomenkieliset etusanat: perusteltuja, jätetty.
- **Kuninkaanpalatsi, "Neljän vuoden tauon jälkeen":** lähteet olivat ristiriidassa (Brussels Times kirjoitti kolmesta vuodesta), mutta Time Out vahvistaa neljän vuoden sulun ja avaamisen 3.7.2026, joten teksti jätettiin ennalleen ja sai toisen lähteen. Jan Fabren peilisalin katto (yli puolitoista miljoonaa jalokuoriaisen kuorta, kuningatar Paolan tilaus 2002) vahvistui; Wikipedian vuosiluku 2004 on vähemmistössä, ja teksti puhuu tilaamisesta.
- **Cinquantenaire:** tarkistettu nykytila — kolme museota (sotahistoria, Autoworld, taide- ja historiamuseo) toimivat yhä, ja suuri Cinquantenaire Bicentenaire -kunnostus tähtää vuoteen 2030 ilman ilmoitettuja sulkemisia. Moskeijan rakennusvuosi 1897 ja maailmannäyttely vahvistuivat kahdesta Wikipediasta, vaikka puiston muut rakennukset ovat vuoden 1880 näyttelystä. Ei muutoksia.
- **Mini-Europe:** tarkistettu, että puisto toimii yhä Bruparckissa Atomiumin juurella NEO-hankkeen keskellä (vuoden 2021 sopimus turvasi jatkon), ja että luvut 350 rakennusta, 80 kaupunkia, mittakaava yksi kahteenkymmeneenviiteen ja prinssi Philippen avajaiset 1.6.1989 pitävät. Ei muutoksia.
- **Oikeuspalatsin hissi:** "ilmainen julkinen hissi alas Marollesiin" pitää (kaksi hissiä, käytössä vuodesta 2002, maksuttomia), vaikka ne ovat kärsineet toistuvista vioista. Ei muutoksia.
- **Grand-Placen kierrosversion Unesco-virke:** harkitsin sen vaihtamista tarinaan (löydöstyyppi 2), mutta kierrosversiossa on jo kaksi ihmistarinaa, ja vuosiluku kertoo pelaajalle, miksi aukio on suojeltu. Jätetty.
- **Epävarmuus Päätoimittajalle:** Pyhän Mikaelin katedraalin kellopeli on 49 kelloa, mutta Wikipedian mukaan vain seitsemän niistä soi varsinaisina kelloina. Kierrosversio sanoo "neljänkymmenenyhdeksän kellon kellopeli", mikä on kellopelistä puhuttaessa oikein, mutta jos tarkkuutta halutaan, virke voi täsmentää, että soittokelloja on seitsemän.
