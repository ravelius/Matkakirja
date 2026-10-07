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

# Toimituksellinen tarkistus: Budapest ja Bukarest

Tarkistaja: toimituksellinen passi 7.10.2026. Verkko auki, kaikki alla mainitut lähteet avattu WebFetchillä
(WebSearch vain lähteiden löytämiseen). Löydöstyyppi 4 (avauksen kierroslause) ohitettu ohjeen mukaan.

## Budapest

Tarkistin: **0 virhettä, 9 huomiota** (sama määrä kuin ennen passia; kaikki huomiot ovat
"ei ala paikan nimellä" suomenkielisen etusanan takia sekä "avaus puuttuu").
Muutoksia: **13** (kuusi `lyhyt`-kenttää, kaksi `teksti`-kenttää, yksi `syventava`, kaksi `kysymykset`-korjausta,
lisäksi lähdekorjauksia). Avaukseen ei muutoksia.

### Sankarien aukio — kenttä `teksti`
- **Vanha:** "Sankarien aukio avautuu Andrássynkadun päässä kaupunginpuiston laidalla, ja sen keskeltä nousee kolmekymmentäkuusi metriä korkea pylväs, **jonka huipulla seisoo arkkienkeli Gabriel. Legendan mukaan enkeli ilmestyi Tapanille unessa ja tarjosi hänelle Unkarin kruunua**, ja patsaskin pitää kruunua oikeassa kädessään. Pylvään juurella ratsastavat Árpádin johtamat seitsemän heimopäällikköä, ja taustan kaarevissa pylväskäytävissä seisoo kuninkaiden ja kansallissankarien patsaita. Muistomerkkiä alettiin rakentaa vuonna 1896 Unkarin tuhatvuotisjuhlaksi, mutta se valmistui vasta vuonna 1929. Aukion laidoilla seisovat Taidemuseo ja Taidehalli."
- **Uusi:** "Sankarien aukio avautuu Andrássynkadun päässä kaupunginpuiston laidalla, ja sen keskeltä nousee kolmekymmentäkuusi metriä korkea pylväs, jonka huipulle arkkienkeli Gabrielin patsas nostettiin vuonna 1901. Legendan mukaan enkeli ilmestyi unessa paavi Sylvester toiselle ja käski lähettää kruunun Tapanille, ja patsas pitää samaa kruunua oikeassa kädessään. Syksyllä 2024 patsas laskettiin alas kunnostettavaksi, ja jalustan alta löytyi lasiastia, johon oli kätketty kirjerulla ja kahdeksan kolikkoa. Pylvään juurella ratsastavat Árpádin johtamat seitsemän heimopäällikköä, ja taustan pylväskäytävissä seisoo kuninkaiden ja kansallissankarien patsaita. Muistomerkkiä alettiin rakentaa vuonna 1896 tuhatvuotisjuhlaksi, mutta se valmistui vasta vuonna 1929."
- **Syy:** Kaksi löydöstä samassa virkkeessä. (5) NYKYAIKA, passin vakavin löydös: **Gabrielin patsas EI ole tällä hetkellä pylvään huipulla.** Se laskettiin alas syksyllä 2024 ensimmäisen kerran yli 120 vuoteen, koska kunto oli hengenvaarallinen, ja myös pylvästä korjataan. Maaliskuussa 2026 tavoite oli palautus vuoden 2026 loppuun; viimeisimmät tiedot sanovat, että palautus siirtyy seuraavaan vuoteen. Teksti sanoi preesensissä, että enkeli seisoo huipulla — väärin lokakuussa 2026. Uusi muotoilu kertoo vain pysyviä tosiasioita (nostettiin 1901, laskettiin 2024 kunnostettavaksi), joten se ei vanhene kumpaankaan suuntaan. (3) FAKTOJEN VIVAHDE: legendassa arkkienkeli ilmestyi **paavi Sylvester toisen** unessa ja antoi hänelle kruunun pian saapuvan kansan johtajalle — ei Tapanille, jolle enkeli olisi "tarjonnut kruunua". Lisäksi aikakapselilöytö korvaa poistetun museoluettelon konkreettisella yksityiskohdalla; sanamäärä 72 → 88 (raja 65–90), virkkeitä yhä 5.
- **Lähde:** https://nepszava.hu/3296473_gabriel-arkangyal ; https://www.origo.hu/itthon/2026/03/gabriel-arkangyal-szobra-alol-idokapszula-hosok-tere ; https://budappest.hu/budapest-hosok-tere-gabriel-arkangyal-tortenete/ ; https://en.wikipedia.org/wiki/Heroes%27_Square_(Budapest)

### Sankarien aukio — kenttä `kysymykset` (3.)
- **Vanha:** "Mitä aukion laidan taidemuseossa on?"
- **Uusi:** "Miksi Gabrielin patsas laskettiin alas?"
- **Syy:** (7) Vanha kysymys kysyi käytännössä "mitä näyttelyssä on nyt", mikä on ohjeessa nimenomaan kielletty, eikä museo esiinny enää tekstissä. Uuden kysymyksen oletus on tosi ja vastaus pysyvä, ja se antaa pelaajalle väylän nykytilaan (patsas on kunnostuksessa).
- **Lähde:** https://nepszava.hu/3296473_gabriel-arkangyal

### Gellért-kylpylä — kenttä `teksti`
- **Vanha:** "…ja vuonna 1927 sen ulkoalueelle rakennettiin aaltoallas, **jota pidetään maailman ensimmäisenä**."
- **Uusi:** "…ja vuonna 1927 sen ulkoalueelle rakennettiin aaltoallas, **yksi maailman ensimmäisistä**."
- **Syy:** (3) Superlatiivi ei kestä tarkistusta. Matkailusivut toistavat väitettä, mutta Radebeulin Bilzbadiin asennettiin Undosa-aaltokone jo 1912, ja se oli ensimmäinen maalle rakennettu julkinen aaltoallas; englanninkielinen Wikipedia kutsuu Gellértin allasta nimenomaan "another early public wave pool". Edellinen tarkistaja hyväksyi väitteen hakuotteiden perusteella.
- **Lähde:** https://en.wikipedia.org/wiki/Wave_pool ; https://de.wikipedia.org/wiki/Bilz-Bad ; https://en.wikipedia.org/wiki/Gell%C3%A9rt_Baths

### Gellért-kylpylä — kenttä `kysymykset` (2.)
- **Vanha:** "Miten maailman ensimmäinen aaltoallas toimi?"
- **Uusi:** "Miten kylpylän aaltokone sai aallot liikkeelle?"
- **Syy:** (7) Kysymyksen oletus oli epätosi samasta syystä kuin yllä. Kysymys on yhä tästä kohteesta ja vastaus pysyvä.
- **Lähde:** https://en.wikipedia.org/wiki/Wave_pool

### Kalastajanlinnake — kenttä `lyhyt`
- **Vanha:** "Kalastajanlinnakkeen terasseilta näkyy Tonavan yli suoraan parlamenttitaloon. Linnakkeen ja viereisen Matiaksenkirkon nykyinen ilme on saman miehen käsialaa: arkkitehti Frigyes Schulek johti 1800-luvun lopulla myös kirkon uudistamista ja palautti sen goottilaiseen asuun."
- **Uusi:** "Kalastajanlinnake vaurioitui pahoin toisen maailmansodan lopun taisteluissa, ja sen korjaustyötä johti vuosina 1947 ja 1948 János Schulek, linnakkeen suunnitelleen Frigyes Schulekin poika. Viimeiset työt valmistuivat vasta vuonna 1953, ja terasseilta aukeaa jälleen näkymä Tonavan yli parlamenttitaloon."
- **Syy:** (1) PÄÄLLEKKÄISYYS: tämä ja Matiaksenkirkon `lyhyt` kertoivat kierroksella peräkkäisissä pysähdyksissä (4. ja 5.) saman asian — Schulek uudisti Matiaksenkirkon goottilaiseen asuun 1800-luvun lopulla. Lisäksi (2) kierrosversio oli arkkitehti- ja tyylitietoa, ei tarinaa. Uusi versio kertoo tarinan, joka ei toistu missään muussa kohteessa: pojan johtama isänsä työn korjaus. Näköalavirke säilyi.
- **Lähde:** https://hu.wikipedia.org/wiki/Hal%C3%A1szb%C3%A1stya ("A helyreállítást 1947-48-ban az építő Schulek Frigyes fia, Schulek János vezette"; jatkotyöt Bors László johdolla 1953 asti)

### Kalastajanlinnake — kenttä `teksti` (kaksi vivahdetta)
- **Vanha:** "…jonka seitsemän suippokattoista tornia muistuttavat unkarilaisten **seitsemästä heimosta**. … Nimensä se sai **keskiajan kalastajien killalta, jonka tehtävä oli puolustaa** juuri tätä muurin osuutta."
- **Uusi:** "…jonka seitsemän suippokattoista tornia muistuttavat unkarilaisten **seitsemästä heimopäälliköstä**. … Nimensä se sai **alapuolella sijainneesta kalastajien kaupunginosasta, jonka kilta puolusti tarpeen tullen** juuri tätä muurin osuutta."
- **Syy:** (3) Kaksi vivahdetta. Tornit symboloivat seitsemää **heimopäällikköä** (hét honfoglaló vezér) — niin sanoo myös kohteen oma lähderivi, jonka kanssa teksti oli ristiriidassa. Nimi tulee todennäköisemmin linnakkeen alapuolisesta Halászváros-kaupunginosasta kuin killasta, ja killan **tehtävä** oli kalakauppa; muuria se puolusti tarpeen tullen.
- **Lähde:** https://hu.wikipedia.org/wiki/Hal%C3%A1szb%C3%A1stya

### Matiaksenkirkko — kenttä `lyhyt`
- **Vanha:** "Matiaksenkirkon nykyinen ulkoasu on peräisin 1800-luvun lopulta, jolloin arkkitehti Frigyes Schulek uudisti sen varhaisgoottilaiseen tyyliin, jota hän piti rakennukselle ihanteellisena. Kellotorni nousee noin seitsemänkymmenenkahdeksan metrin korkeuteen ja on linnamäen korkein rakennelma."
- **Uusi:** "Matiaksenkirkosta kerrotaan legenda: kun kristityt joukot piirittivät Budaa, tykinkuula mursi kirkon seinän ja sen takaa paljastui vanha Marian patsas. Patsas ilmestyi moskeijassa rukoilevien osmanien eteen, heidän taistelutahtonsa romahti, ja kaupunki kaatui samana päivänä."
- **Syy:** (2) Kierrosversio oli täsmälleen sitä, mitä ohje kieltää: "uudisti arkkitehti X tyyliin Y" ja korkeusmitta. Tästä ei jää mieleen mitään. Uusi versio on kirkon tunnetuin tarina, ja se on kirjoitettu legendaksi ("kerrotaan legenda"), ei tosiasiaksi (löydöstyyppi 3: legendan ja tosiasian ero). Vuosilukua 1686 ei toisteta, koska `teksti` kertoo sen — näin lyhyt ja teksti eivät kerro samaa.
- **Lähde:** https://en.wikipedia.org/wiki/Matthias_Church ("an old votive Madonna statue was hidden behind the wall… the morale of the Muslim garrison collapsed and the city fell on the same day")

### Budan linna — kenttä `lyhyt`
- **Vanha:** "Budan linnamäelle on noussut köysirata vuodesta 1870. Avatessaan se oli Euroopan toinen laatuaan Lyonin jälkeen, ja yhä se kuljettaa matkustajia joen rannasta mäelle. Palatsin pohjoispuolella seisoo Sándorin palatsi, jossa on Unkarin presidentin virka-asunto ja työhuone."
- **Uusi:** "Budan linnan länsipihalla on suihkulähde, joka esittää kuningas Matiaksen metsästysretkeä. Tarun mukaan kuningas kulki metsällä tuntemattomana ja rakastui talonpoikaistyttöön, kauniiseen Ilonkaan. Kun tyttö näki hänet kuninkaan asussa ja ymmärsi rakkauden mahdottomaksi, hän kuoli suruun."
- **Syy:** (3) Vivahde oli väärä: "on noussut köysirata vuodesta 1870… ja yhä se kuljettaa" väittää yhtäjaksoista toimintaa, mutta pommit tuhosivat vaunut ja asemat toisessa maailmansodassa, rata purettiin ja se avattiin uudelleen vasta vuonna 1986 — yli neljäkymmentä vuotta myöhemmin. Lisäksi (2) viimeinen virke oli puhdasta hallintoa (presidentin virka-asunto ja työhuone). Korvaava tarina on kierroksen kannalta myös parempi: kierroksella oli kolme peräkkäistä "sota tuhosi, sitten korjattiin" -versiota, ja tämä poisti yhden. Köysiradan oikaistu tieto jäi lähderiville.
- **Lähde:** https://en.wikipedia.org/wiki/Budapest_Castle_Hill_Funicular (tuhoutuminen ja uudelleenavaus 1986) ; https://en.wikipedia.org/wiki/Matthias_Fountain (Stróbl ja Hauszmann 1904; Vörösmartyn balladin Szép Ilonka)

### Unkarin parlamenttitalo — kenttä `lyhyt`
- **Vanha:** "Unkarin parlamenttitalon kupolisalissa on säilytetty vuodesta 2000 lähtien Unkarin pyhää kruunua ja muita kruunajaisesineitä, ja niitä vartioi vuorokauden ympäri armeijan kruunukaarti. **Kupoli on täsmälleen yhtä korkea kuin Pyhän Tapanin kirkon kupoli.**"
- **Uusi:** "Unkarin parlamenttitalon kupolisalissa on säilytetty vuodesta 2000 lähtien Unkarin pyhää kruunua, ja sitä vartioi vuorokauden ympäri armeijan kruunukaarti. Kruunun huipulla oleva risti on vinossa, luultavasti siksi että se taittui 1600-luvulla, kun kruunu suljettiin hätäisesti rautaiseen arkkuun. Vinoutta ei ole oikaistu."
- **Syy:** (1) PÄÄLLEKKÄISYYS: yhdeksänkymmenenkuuden metrin yhtäläinen korkeus esiintyi kierroksella kolme kertaa — parlamentin `lyhyt`, Pyhän Tapanin kirkon `teksti` ja saman kirkon `lyhyt`. Jätin faktan sinne, minne se kuuluu (kirkon `teksti`), ja korvasin sen täällä yksityiskohdalla, joka jää mieleen ja jatkaa saman virkkeen kruunuaihetta.
- **Lähde:** https://en.wikipedia.org/wiki/Holy_Crown_of_Hungary ("The cross was knocked crooked during the 17th century… possibly by the top of the iron chest… being hastily closed… The cross has since been left in this slanted position")

### Unkarin parlamenttitalo — kenttä `syventava`
- **Vanha:** "Miksi kupoli on yhdeksänkymmentäkuusi metriä?"
- **Uusi:** "Miten pyhä kruunu palasi Unkariin?"
- **Syy:** (1) `teksti` vastasi tähän syventävään kysymykseen jo itse ("Luku on valittu tarkoituksella: se muistuttaa vuodesta 896"), joten opas olisi toistanut itseään. Uuden kysymyksen oletus on tosi: kruunu palautettiin Yhdysvalloista Unkariin tammikuussa 1978.
- **Lähde:** https://en.wikipedia.org/wiki/Holy_Crown_of_Hungary

### Pyhän Tapanin kirkko — kenttä `lyhyt`
- **Vanha:** "Pyhän Tapanin kirkko on nimetty Unkarin ensimmäisen kuninkaan mukaan. Kirkko vihittiin vuonna 1905, ja seuraavana vuonna sen viimeinen kivi asetettiin paikalleen keisari Frans Joosefin läsnä ollessa. **Kupolin ja parlamentin yhtäläisen korkeuden sanotaan kuvaavan kirkon ja valtion tasapainoa.**"
- **Uusi:** "Pyhän Tapanin kirkon suuren kellon vei Saksan armeija toukokuussa 1944 sotatarvikkeiksi. Vuonna 1990 saksalaiset lahjoittivat kirkolle uuden kellon, joka valettiin Passaussa ja painaa yli yhdeksän tonnia; se on Unkarin suurin kello."
- **Syy:** (1) Sama kohde kertoi `teksti`- ja `lyhyt`-kentässä saman asian (kupolit yhtä korkeat), mikä on ohjeessa erikseen kielletty, ja ensimmäinen virke oli pelkkää perustietoa. (2) Uusi versio on tarina, jossa on käänne: saksalaiset veivät kellon sotatarvikkeiksi ja saksalaiset lahjoittivat uuden.
- **Lähde:** https://pestbuda.hu/en/cikk/20200821_the_bells_of_saint_stephen_s_basilica_hungarian_and_german_masterpieces (Hősök- eli Szent Imre -kello 7 945 kg vietiin 20.5.1944; Szent István -kello 9 250 kg, Perner, Passau, vihitty 20.8.1990, Unkarin suurin)

### Lähdekorjaukset (ei tekstimuutosta)
- **Matiaksenkirkko:** tornin korkeuden lähde `famous-historic-buildings.org.uk` → `https://hu.wikipedia.org/wiki/Budav%C3%A1ri_Nagyboldogasszony-templom`, joka sanoo tarkasti "A Mátyás-torony teljes magassága a templom padozatától 78,16 méter". **Tämä ratkaisee PILVI-RAPORTIN epävarmuuden "Matiaksenkirkon torni 78/80 m": 78 on oikea**, ja matkailusivujen 80 metriä on pyöristys. Tekstin "noin seitsemänkymmentäkahdeksan metriä" ja `korkeus_m` 78 jäivät ennalleen.
- **Kalastajanlinnake, Budan linna, Pyhän Tapanin kirkko, Sankarien aukio, Gellért-kylpylä:** lähderivit päivitetty vastaamaan muuttuneita väitteitä, kaikki itse avatuista osoitteista.

### Tarkistettu ja jätetty ennalleen (ei korjattavaa)
- **Gellért-kylpylä, remontti (korkean riskin kohta):** kylpylä suljettiin 1.10.2025 ja virallinen tavoite on avautuminen 2028; rahoituspäätös oli heinäkuussa 2026 yhä avoin, joten aikataulu voi venyä. Tekstin muotoilu "avautua aikaisintaan vuonna 2028" pitää paikkansa eikä vanhene, joten se jäi ennalleen. Lähde: https://en.wikipedia.org/wiki/Gell%C3%A9rt_Baths
- **Budan linna, kansallisgalleria ja kansalliskirjasto (korkean riskin kohta):** Városligetin uusi galleriahanke peruttiin kesäkuussa 2026, uutta paikkaa ei ole päätetty, ja **sekä kansallisgalleria että Széchényin kansalliskirjasto ovat yhä Budan linnassa**. Tekstin "nykyään palatsissa toimivat…" on oikein lokakuussa 2026. **PILVI-RAPORTIN epävarmuus ratkaistu toistaiseksi.** Lähteet: https://en.wikipedia.org/wiki/National_Sz%C3%A9ch%C3%A9nyi_Library ; https://www.theartnewspaper.com/2026/09/08/hungary-new-government-scraps-national-gallery-plans
- **Gellértinvuori, Citadella:** avautui pääsiäisenä 5.4.2026 yhdentoista vuoden sulun jälkeen; puisto ja näköalaterassit maksutta avoinna, läntisessä tykkitornissa näyttely "A Szabadság Bástyája". Kierrosversio on oikein.
- **Matiaksenkirkko, Matias Corvinuksen häät:** molemmat häät (Katariina Podiebradilainen 1463, Beatrice Napolilainen 1476) pidettiin tässä kirkossa — oikein. Lisztin kruunajaismessu kantaesitettiin kruunajaisissa 1867 — oikein.
- **Pyhän Tapanin kirkko, kupolin romahdus:** 22.1.1868 vahvistui hu.wikipediasta; englanninkielisen Wikipedian "1858" on virhe. Tekstin aikajana (Hild kuoli 1867, kupoli romahti seuraavan vuoden tammikuussa) on oikein.
- **Dohány-kadun synagoga, Tony Curtis:** "Muistomerkin rahoitti näyttelijä Tony Curtis unkarilaissyntyisen isänsä muistoksi" vahvistui ("paid for by the late American actor Tony Curtis for his Hungarian-born father Emanuel Schwartz"), joten pelin aineiston heikompi muotoilu "tuki osaltaan" ei ollut syy muuttaa tekstiä.
- **Gellért-kylpylä, naapurihotelli:** kysymyksen "Mitä kylpylän naapurihotellille tapahtuu?" oletus on tosi — Hotel Gellért suljettiin 1.12.2021 ja avautuu Mandarin Oriental Gellertinä vuonna 2027.
- **Vapaudensilta:** sillan kesäiset autottomat viikonloput kerrotaan imperfektissä, joten teksti ei väitä mitään nykytilasta väärin; syyskuussa 2026 silta suljettiin autoilta kaupungin autottomana viikonloppuna, eli perinne jatkuu.
- **Unkarin valtionooppera:** avautui 12.3.2022 lähes viiden vuoden korjauksen jälkeen, Mahler johtajana 1888–1891 — oikein.
- **Avaus (avaukset/budapest.md):** ei muutoksia. 37 sanaa, alkaa suomenkielisellä sanalla "Tervetuloa", kuva on aidosti ilmasta nähtävä (Tonava kahden puolen, Budan kukkulat, Pestin kattojen meri), ja kierroksen ensimmäinen kohde Gellértinvuori vastaa pohjan `kierros`-listaa.
- **Kierroksen kahdeksan `lyhyt`-versiota luettiin peräkkäin** passin alussa ja uudelleen muutosten jälkeen. Loput päällekkäisyydet (turullintu esiintyy sekä Budan linnan että Vapaudensillan `teksti`-kentässä, mutta Vapaudensilta ei ole kierroksella) jätettiin.

### Epävarmuudet Päätoimittajalle
- **Gabrielin patsas:** uusi muotoilu kestää sekä nykytilan että palautuksen, mutta jos patsas nousee takaisin, kaupunkiin kannattaa jossain vaiheessa palauttaa virke siitä, että enkeli seisoo huipulla. Palautus siirtyi maaliskuun 2026 tavoitteesta ("vuoden loppuun") seuraavaan vuoteen.
- **Kierroksen sotateema:** kolmen kierrospysähdyksen (Ketjusilta, Kalastajanlinnake, Pyhän Tapanin kirkko) `lyhyt` sijoittuu toiseen maailmansotaan, vaikka jokainen kertoo eri tarinan (silta avattiin uudelleen tasan sata vuotta myöhemmin; poika johti isänsä työn korjausta; kello vietiin ja saksalaiset lahjoittivat uuden). Poistin yhden neljästä vaihtamalla Budan linnan version. Jos Päätoimittaja haluaa vielä vähemmän, Kalastajanlinnakkeen versio on helpoin vaihtaa (vaihtoehto: Schulekin leveä porras korvasi ahtaan ja pimeän jesuiittaportaan, joka oli siihen asti ainoa tie linnamäelle).
- **Gellért-kylpylän avautuminen** voi siirtyä vuoteen 2029 tai myöhemmäksi rahoituspäätöksen takia; teksti ei lukitse vuotta.
- **Nagyn hautajaisten väkimäärä** jää muotoon "satoja tuhansia" (arviot 200 000–250 000).
- **Pyhän Tapanin kirkon päätöskivi:** hu.wikipedia vahvistaa päivän 8.12.1906, jota edellinen tarkistaja ei saanut varmistettua. Tieto ei ole enää tekstissä, mutta se on käytettävissä, jos sitä halutaan takaisin.

## Bukarest

Tarkistin: **0 virhettä, 7 huomiota** (sama määrä kuin ennen passia; kuusi "ei ala paikan nimellä" ja "avaus puuttuu").
Muutoksia: **14** (seitsemän `lyhyt`-kenttää, kolme `teksti`-kenttää, yksi `kuvaus`, kaksi `kysymykset`-korjausta,
lisäksi lähdekorjauksia). Avaukseen ei muutoksia.

Yleishavainto Päätoimittajalle: Bukarestin kierrosversiot olivat järjestelmällisesti löydöstyypin 2 vastaisia.
Edellinen (pilvi)sessio ei päässyt verkkoon, joten se poisti värikkäät mutta vahvistamattomat väitteet ja korvasi ne
varmoilla hallinnollisilla tiedoilla: perustamisvuosilla, arkkitehtien ja seurojen nimillä, pinta-aloilla ja
avaamisvuosilla. Seitsemästä kierrosversiosta kahdeksasta ei jäänyt mieleen mitään. Nyt verkko oli auki, joten
tilalle löytyi vahvistettuja tarinoita.

### Herăstrău-puisto — kenttä `teksti`
- **Vanha:** "Toisen maailmansodan jälkeen puisto nimettiin Stalinin mukaan, ja sen sisäänkäynnille pystytettiin Stalinin patsas; **vuonna 1956 patsas kaadettiin** ja puisto nimettiin järven mukaan."
- **Uusi:** "Toisen maailmansodan jälkeen puisto nimettiin Stalinin mukaan, ja sen sisäänkäynnille nousi vuonna 1951 yhdeksän metriä korkea pronssinen Stalin; patsas purettiin yhdessä yössä maaliskuussa 1962, ja samalla paikalla seisoo nyt Charles de Gaullen patsas."
- **Syy:** (3) PILVI-RAPORTIN epävarmuus "Stalinin patsaan vuodet ristiriidassa" **ratkaistu, ja vanha tieto oli väärä.** Patsas paljastettiin vuonna 1951 ja purettiin yöllä maaliskuussa 1962 — ei vuonna 1956. Englanninkielinen Wikipedia niputtaa patsaan purun ja puiston nimenmuutoksen samaan vuoteen 1956; romaniankielinen Wikipedia käsittelee patsasta omassa artikkelissaan ja antaa vuodet 1951 ja 1962, samoin puiston artikkeli ("erected in 1951 and demolished in 1962"). Vuosi 1956 koskee nimenmuutosta, ei patsasta. Lisäsin Charles de Gaullen patsaan, joka seisoo nyt samalla paikalla — nykyajan ankkuri samaan virkkeeseen. Sanamäärä 77 → 88 (raja 65–90), virkkeitä yhä 5.
- **Lähde:** https://ro.wikipedia.org/wiki/Statuia_lui_Stalin_din_Bucure%C8%99ti ; https://ro.wikipedia.org/wiki/Parcul_Her%C4%83str%C4%83u ; https://en.wikipedia.org/wiki/King_Michael_I_Park

### Romanian patriarkaalinen katedraali — kenttä `teksti` (kaksi löydöstä)
- **Vanha:** "…ja ylhäältä sen katolla erottuu **kolme kupolia ja neljä tornia**. … Vuodesta 1925, jolloin Romanian ortodoksinen kirkko sai oman patriarkan, **kirkko on ollut sen pääkirkko**."
- **Uusi:** "…ja ylhäältä sen katolta kohoaa **neljä monikulmaista tornia**. … Vuodesta 1925, jolloin Romanian ortodoksinen kirkko sai oman patriarkan, **se on ollut patriarkan istuinkirkko**."
- **Syy:** (3) PILVI-RAPORTIN epävarmuus "katedraalin kolme kupolia ja neljä tornia (yksi lähde)" **ratkaistu, ja vanha tieto oli väärä.** Bukarestin arkkipiispakunnan oma sivu sanoo: "În elevaţie prezintă aceleaşi patru turle prismatice ca şi ctitoria lui Neagoe Basarab de la Argeş" — neljä monikulmaista tornia, samat kuin esikuvassa Curtea de Argeșissa. Ei kolmea kupolia ja neljää tornia; inyourpocket oli väärässä. (5) NYKYAIKA: sana "pääkirkko" ei enää pidä paikkaansa yksiselitteisesti, koska Romanian uusi kansalliskatedraali vihittiin lokakuussa 2025 ja se rakennettiin nimenomaan patriarkaatin katedraaliksi; se on myös maailman suurin ortodoksinen kirkko. Vanha kirkko on edelleen nimeltään Catedrala Patriarhală ja patriarkan istuinkirkko, joten tarkka sana korvasi epätarkan. Lokakuun pyhiinvaellus tarkistettiin erikseen: pyhän Demetrios Uuden reliikit ovat yhä tässä kirkossa hopeisessa arkussa, ja pyhiinvaellus pidetään täällä, joten tekstin viimeinen virke on oikein.
- **Lähde:** https://arhiepiscopiabucurestilor.ro/exarhat/manastiri/catedrala-patriarhala ; https://ro.wikipedia.org/wiki/Catedrala_Patriarhal%C4%83_din_Bucure%C8%99ti ; https://en.wikipedia.org/wiki/National_Cathedral_of_Romania

### Romanian patriarkaalinen katedraali — kenttä `kuvaus`
- **Vanha:** "Romanian ortodoksisen kirkon pääkirkko"
- **Uusi:** "Patriarkan istuinkirkko mäen laella"
- **Syy:** (5) Sama NYKYAIKA-peruste kuin yllä: kuvaus oli ristiriidassa uuden kansalliskatedraalin kanssa.
- **Lähde:** https://en.wikipedia.org/wiki/National_Cathedral_of_Romania

### Romanian patriarkaalinen katedraali — kenttä `lyhyt`
- **Vanha:** "Romanian patriarkaalisen katedraalin vieressä on patriarkaatin palatsi, joka valmistui vuonna 1907 kansanedustajien istuntotaloksi, ja se oli Romanian ensimmäinen teräsbetonirakennus. Parlamentti kokoontui siellä vuoteen 1997, jolloin talo siirtyi kirkolle. Kirkon kellotornin rakennutti ruhtinas Constantin Brâncoveanu vuonna 1698."
- **Uusi:** "Romanian patriarkaalisen katedraalin hopeisessa arkussa ovat pyhän Demetrios Uuden luut. Venäläinen kenraali Saltikov aikoi lähettää ne Venäjälle vuonna 1774, mutta romanialaisen Hagi Dimitrien pyynnöstä hän antoi ne Valakialle. Pyhimyksen oikean käden kenraali kuitenkin vei Kiovaan."
- **Syy:** (2) Vanha versio oli kokonaan hallintoa ja tekniikkaa — valmistumisvuosi, rakennusmateriaali, parlamentin muutto, kellotornin tilaaja — eikä se edes kertonut kirkosta vaan naapuritalosta. Uusi versio on reliikkien tulotarina, jossa on ihminen, ristiriita ja käänne, ja se liittyy suoraan siihen, mitä kirkossa yhä on.
- **Lähde:** https://ro.wikipedia.org/wiki/Sf%C3%A2ntul_Dimitrie_cel_Nou ; https://arhiepiscopiabucurestilor.ro/exarhat/manastiri/catedrala-patriarhala (reliikit tuotiin hopeisessa arkussa Basarabin kylästä 13.7.1774)

### Romanian patriarkaalinen katedraali — kenttä `kysymykset` (1.)
- **Vanha:** "Kuka oli pyhä Demetrios Uusi?"
- **Uusi:** "Miksi Demetrios on Bukarestin suojelija?"
- **Syy:** (7) Kysymys oli sanasta sanaan sama kuin `syventava`-kenttä, mikä on ohjeessa erikseen kielletty. Uusi kysymys koskee samaa pyhimystä mutta eri asiaa, ja sen oletus on tosi.
- **Lähde:** https://basilica.ro/en/celebrations-of-saint-demetrius-the-new-begin-at-patriarchal-cathedral-in-bucharest/

### Vallankumouksen aukio — kenttä `lyhyt`
- **Vanha:** "Vallankumouksen aukion nimi oli vuoteen 1989 asti Palatsiaukio, sillä sen laidalla on entinen kuninkaanlinna. **Joulukuun 1989 taisteluissa linnassa toiminut taidemuseo kärsi pahoin, ja yli tuhat taideteosta vaurioitui tai tuhoutui.** Aukion muistomerkki on omistettu vallankumouksen uhreille."
- **Uusi:** "Vallankumouksen aukion laidalla, taidemuseota vastapäätä, on yliopiston keskuskirjasto, joka syttyi palamaan joulukuun 1989 taisteluissa. Tulessa tuhoutui yli puoli miljoonaa kirjaa ja lähes neljätuhatta käsikirjoitusta. Kirjasto korjattiin ja avattiin uudelleen vuonna 2001."
- **Syy:** (1) PÄÄLLEKKÄISYYS: tämä kierrosversio kertoi täsmälleen saman asian kuin seuraavan pysähdyksen (Romanian kansallinen taidemuseo, kierroksen 6.) `teksti`: museo kärsi joulukuussa 1989 ja yli tuhat teosta vaurioitui tai tuhoutui. Pysähdykset ovat kierroksella peräkkäin. Lisäksi viimeinen virke toisti oman `teksti`-kentän muistomerkkiä. Uusi versio kertoo saman päivän toisen menetyksen samalta aukiolta, josta kohteen `teksti` ei kerro mitään.
- **Lähde:** https://en.wikipedia.org/wiki/Central_University_Library,_Bucharest ("over 500,000 books, along with 3,700 manuscripts, were burnt"; avattiin uudelleen 20.11.2001; sijaitsee taidemuseota vastapäätä). Hakuotteissa mainittiin myös Eminescun, Maiorescun ja Caragialen käsikirjoitukset, mutta en saanut lähdettä auki, joten jätin nimet pois.

### Romanian kansallinen taidemuseo — kenttä `lyhyt`
- **Vanha:** "Romanian kansallisen taidemuseon eurooppalaisen taiteen galleria on linnan Kretzulescun siivessä, ja sen noin kolmesataa teosta esittelevät Euroopan taidekouluja 1300-luvulta 1800-luvulle. Linnan uudelleenrakentamisen käynnisti kuningas Kaarle toinen. Museon keskiaikaisen taiteen kokoelma avattiin uudelleen keväällä 2002."
- **Uusi:** "Romanian kansallisen taidemuseon eurooppalainen kokoelma oli alun perin kuningas Kaarle ensimmäisen oma. Hänen keräämiensä teosten joukossa on Rembrandtin, El Grecon ja Rubensin maalauksia, ja museon romanialaisessa kokoelmassa on Constantin Brâncușin veistoksia."
- **Syy:** (2) Vanha versio oli kokoelmaluetteloa ja hallintoa: siipi, teosmäärä, vuosiluvut, kuka käynnisti rakennustyöt. (1) Lisäksi se toisti kohteen oman `teksti`-kentän avaamisvuosia. Uudessa versiossa on yksi yllätys: Bukarestin maailmanluokan vanhan taiteen kokoelma on yhden kuninkaan oma kokoelma.
- **Lähde:** https://en.wikipedia.org/wiki/National_Museum_of_Art_of_Romania ("The European Museum Art Gallery reopened in 2000 with 214 works of art from the collection of King Carol I", El Greco, Rembrandt, Bruegel, Rubens; Brâncuși ja Paciurea romanialaisessa kokoelmassa)

### Romanian kansallinen taidemuseo — kenttä `kysymykset` (1.)
- **Vanha:** "Mitkä taideteokset tuhoutuivat vallankumouksessa?"
- **Uusi:** "Mikä on museon kuuluisin maalaus?"
- **Syy:** (7) Kysymys toisti `syventava`-kentän ("Mitkä teokset tuhoutuivat vuonna 1989?") lähes sanasta sanaan. Uuden kysymyksen oletus on tosi ja vastaus pysyvä.
- **Lähde:** https://en.wikipedia.org/wiki/National_Museum_of_Art_of_Romania

### Romanian ateneum — kenttä `lyhyt`
- **Vanha:** "Romanian ateneumin rakennutti vuonna 1865 perustettu Romanian ateneumin kulttuuriseura tontille, joka oli kuulunut Văcărescun suvulle. Vaikka talo avattiin vuonna 1888, rakennustyöt jatkuivat vielä vuoteen 1897 asti. Seuran perustajiin kuuluivat muun muassa Constantin Esarcu ja Nicolae Kretzulescu."
- **Uusi:** "Romanian ateneumin tontille oli alettu rakentaa ratsastusseuran maneesia, mutta työ keskeytyi, ja ympyränmuotoinen perustus jäi paikalleen. Konserttitalo suunniteltiin sen päälle sellaisenaan, ja siksi sali on pyöreä ja sen kattona on kupoli."
- **Syy:** (2) Vanha versio oli oppikirjaesimerkki kielletystä muodosta: seuran perustamisvuosi, tontin aiempi omistaja, rakennusvuodet ja perustajien nimet. Uusi versio vastaa siihen, mitä kohteen `teksti` herättää — miksi konserttitalo on pyöreä — ja vastaus on yllättävä: talo seisoo kesken jääneen ratsastusmaneesin ympyränmuotoisen perustuksen päällä.
- **Lähde:** https://ro.wikipedia.org/wiki/Ateneul_Rom%C3%A2n ("planurile clădirii au fost concepute de arhitectul francez Albert Galleron, în așa fel încât să se poată folosi fundația deja turnată a manejului început de «Societatea Equestra Română»") ; https://www.secretromania.com/romanian-athenaeum-bucharest/ (vahvistus: perustus pakotti pyöreän muodon ja kupolin)

### Riemukaari — kenttä `lyhyt`
- **Vanha:** "Riemukaaren julkisivujen veistokset ovat romanialaisten kuvanveistäjien, muun muassa Ion Jalean ja Dimitrie Paciurean, käsialaa. Kaaren sisältä portaat johtavat katolle näköalaterassille. Kaari on rakennettu Transilvanian Devasta louhitusta graniitista. Arkkitehti Petre Antonescu suunnitteli sekä vuoden 1922 väliaikaisen kaaren että nykyisen."
- **Uusi:** "Riemukaaren eteläsivulla olivat kuningas Ferdinandin ja kuningatar Marian kuvat, mutta kommunistihallinto poisti ne ja asetti tilalle kaksi suurta kivikukkaa. Vuoden 1989 jälkeen kukat purettiin ja paikoille nousivat pronssiset medaljongit, mutta kuninkaan puheita ei ole kaiverrettu takaisin kaaren kylkiin."
- **Syy:** (2) Vanha versio oli neljä irrallista teknistä tietoa peräkkäin: veistäjien nimet, portaat, kivilaji, arkkitehti. Mitään ei jää mieleen. Uusi versio on tarina, jossa on ristiriita ja keskeneräinen loppu: kuninkaalliset poistettiin, kivikukat tulivat tilalle, kasvot palasivat mutta tekstit eivät.
- **Lähde:** https://agerpres.ro/documentare/2023/05/11/atunci-i-acum-arcul-de-triumf--1106293 (Alexandru Călinescun efigiat poistettiin, tilalle "două mari flori de piatră"; vuoden 1989 jälkeen pronssimedaljongit; kaksi Ferdinandin julistusta poistettiin kaaren sivuilta eikä niitä ole palautettu)

### CEC-palatsi — kenttä `lyhyt`
- **Vanha:** "Säästöpankin palatsin rakentaminen alkoi kesäkuussa 1897, ja työmaata valvoi romanialainen arkkitehti Ion Socolescu. Julkisivua koristavat kaupan jumalan Merkuriuksen ja maanviljelyksen jumalattaren Demeterin patsaat. Tontilla seisoneen luostarikirkon oli aikoinaan kunnostanut ruhtinas Constantin Brâncoveanu."
- **Uusi:** "Säästöpankin palatsin ovella seisovat kaupan jumala Merkurius ja maanviljelyksen jumalatar Demeter. Talo selvisi toisen maailmansodan pommituksista ja vuoden 1977 maanjäristyksestä vahingoittumatta, ja se on yksi harvoista Bukarestin vanhoista taloista, jota ei ole juuri muutettu avajaisten jälkeen."
- **Syy:** (2) Vanha versio alkoi rakennustöiden aloituskuukaudella ja työmaavalvojan nimellä. (1) Lisäksi viimeinen virke kertoi majatalon elättämästä luostarista, mikä toisti kierroksen ensimmäisen pysähdyksen (Stavropoleos) `teksti`-kentän aiheen. Uusi versio sanoo saman kaupungissa, joka on purettu uudelleen ja uudelleen: tämä talo kesti pommitukset ja vuoden 1977 maanjäristyksen eikä ole juuri muuttunut.
- **Lähde:** https://stirileprotv.ro/stiri/travel/palatul-cec-unul-dintre-simbolurile-bucurestiului-istoricul-si-curiozitati-despre-emblematica-cladire-de-pe-calea-victoriei.html ("A rezistat impecabil cutremurelor, inclusiv celui din anul 1977… şi a scăpat neatinsă chiar şi în timpul bombardamentelor din Al Doilea Război Mondial"; "una dintre puţinele clădiri vechi din Bucureşti care a rămas aproape neschimbată din anul inaugurării"; patsaat: Athanasie Constantinescu, Demeter ja Merkurius)

### Romanian parlamenttitalo — kenttä `lyhyt`
- **Vanha:** "…talo painaa noin neljä miljoonaa tonnia. **Lattiaa on kolmesataakuusikymmentäviisituhatta neliömetriä** ja huoneita yli tuhat, mutta suurin osa niistä on yhä tyhjillään. **Maan päällä talossa on kaksitoista kerrosta.**"
- **Uusi:** "…talo painaa noin neljä miljoonaa tonnia. Huoneita on yli tuhat, mutta suurin osa niistä on yhä tyhjillään. Maan alle rakennettiin kahdeksan kerrosta, ja syvimmässä on ydinpommisuoja, josta johtaa tunneleita valtion virastoihin."
- **Syy:** (2) Ohje kieltää kierrosversiossa nimenomaan pinta-alat, ja kerrosluku oli pelkkää täytettä. Paino ja tyhjät huoneet jäivät, koska ne jäävät mieleen; tilalle tuli yksityiskohta, joka jää vielä paremmin: kahdeksan maanalaista kerrosta, syvimmässä ydinpommisuoja ja kahdenkymmenen kilometrin tunneliverkko valtion virastoihin.
- **Lähde:** https://en.wikipedia.org/wiki/Palace_of_the_Parliament ("The building has eight underground levels, the deepest housing a nuclear bunker, linked to main state institutions by 20 km of tunnels")

### Vanha ruhtinaanhovi — kenttä `teksti`
- **Vanha:** "Arkeologiset kaivaukset alkoivat vuonna 1953, ja **nykyään aluetta hoitaa Bukarestin kaupunginmuseo**."
- **Uusi:** "Arkeologiset kaivaukset alkoivat vuonna 1953, ja aluetta hoitaa Bukarestin kaupunginmuseo, **mutta rauniot suljettiin yleisöltä vuonna 2015 korjausta varten**."
- **Syy:** (5) NYKYAIKA, oma löydös jota PILVI-RAPORTTI ei tuntenut. Vanha virke antoi ymmärtää, että paikalla on toimiva museokohde. Kaupunginmuseon oma sivu sanoo: "The Old Princely Court is currently closed to the public for maintenance work on the archaeological site", ja vanhempi ilmoitus samalla sivulla: suljettu yleisöltä 18.11.2015 lähtien vahvistus- ja entisöintitöiden vuoksi. Museo toimi vuoteen 2015, ja toukokuussa 2026 Bukarestin pormestari allekirjoitti vasta rakennusluvan rakenteiden tukemiseen. Muotoilin virkkeen menneeksi tapahtumaksi ("suljettiin vuonna 2015"), joten se pysyy totena myös silloin, kun rauniot aikanaan avataan. Sanamäärä 74 → 81.
- **Lähde:** https://muzeulbucurestiului.ro/en/the-old-princely-court-museum.html ; https://www.digi24.ro/stiri/actualitate/social/palatul-voievodal-curtea-veche-din-bucuresti-intra-in-reabilitare-ciucu-a-semnat-autorizatia-de-construire-pentru-punerea-in-siguranta-3780323

### Tarkistettu ja jätetty ennalleen (ei korjattavaa)
- **Cișmigiun puutarha, Kirjailijoiden rotunda:** PILVI-RAPORTIN epävarmuus "Rotundan Eminescu/Caragiale" **ratkaistu: molemmat ovat oikein.** Rotundassa on kahdentoista kirjailijan rintakuvat, ja nimilistassa ovat sekä Mihai Eminescu että Ion Luca Caragiale (samoin Ion Creangă, jonka edellinen tarkistaja vaihtoi pois tarpeettomasti). Teksti jäi ennalleen. Lähde: https://en.wikipedia.org/wiki/Ci%C8%99migiu_Gardens
- **Cișmigiun puutarha, luistinrata:** "talvella se muuttuu luistinradaksi" vahvistui romaniankielisestä Wikipediasta sanatarkasti ("Iarna, lacul este secat și se transformă într-un imens patinoar"), eli järvi tyhjennetään ja sen tilalle tulee rata; rata oli auki myös kaudella 2025 ja 2026. Järven mitat 1,3 kilometriä ja 50 metriä vahvistuivat samasta lähteestä. Lähde: https://ro.wikipedia.org/wiki/Lacul_Ci%C8%99migiu
- **Pyhä Demetrios Uusi:** PILVI-RAPORTIN epävarmuus suomenkielisestä asusta jää Päätoimittajalle, mutta sisältö vahvistui: hän on Bukarestin suojeluspyhimys, reliikit tuotiin 13.7.1774, juhlapäivä 27. lokakuuta ja pyhiinvaellus pidetään tässä kirkossa myös uuden kansalliskatedraalin vihkimisen jälkeen.
- **Vanha ruhtinaanhovi, Vlad kolmas:** "rakennutti tänne asuinpalatsin" ja syyskuun 1459 asiakirja vahvistuivat ("built as a palace or residence during the rule of Vlad III Dracula in 1459"; 20.9.1459 slaavinkielinen asiakirja, jossa mainitaan Bukarestin linnoitus). Hovin kirkko 1559, Mircea Paimen, vahvistui.
- **Romanian parlamenttitalo:** maailman painavin rakennus, noin 4 098 500 tonnia, yli tuhat huonetta, joista noin 70 prosenttia tyhjillään — kaikki vahvistui.
- **CEC-palatsi, nykytila:** talo on yhä CEC Bankin pääkonttori eikä ole säännöllisesti yleisölle avoinna, joten tekstin viimeinen virke on oikein.
- **Avaus (avaukset/bukarest.md):** ei muutoksia. 39 sanaa, alkaa suomenkielisellä sanalla, kuva on ilmasta nähtävä (tasanko, suoristettu Dâmbovița, parlamenttitalon kivimassa), ja kierroksen ensimmäinen kohde Stavropoleoksen kirkko vastaa pohjan `kierros`-listaa; kirkko on vuodelta 1724, eli 1700-luvun alkua.
- **Stavropoleoksen kirkon kierrosversio** jätettiin ennalleen: nunnien kirjojen ja ikonien entisöinti ja lasi-ikonien maalaus on konkreettinen ja jää mieleen, joten se läpäisee löydöstyyppi kahden testin.
- **Kierroksen kahdeksan `lyhyt`-versiota luettiin peräkkäin** passin alussa ja uudelleen muutosten jälkeen.

### Epävarmuudet Päätoimittajalle
- **Uusi kansalliskatedraali.** Vihittiin lokakuussa 2025 ja se on maailman suurin ortodoksinen kirkko, 120 metriä korkea. Se ei ole pohjan kohdelistalla, mutta se on nyt Bukarestin näkyvimpiä rakennuksia ilmasta ja aivan parlamenttitalon vieressä. Jos omistaja haluaa, se kannattaa lisätä pohjaan omana kohteena; en lisännyt kohteita, koska ohje kieltää sen. Patriarkaalisen katedraalin kysymys "Miten tämä kirkko eroaa uudesta katedraalista?" kattaa asian toistaiseksi.
- **Vanha ruhtinaanhovi** on yhä suljettu, ja korjaustyöt olivat toukokuussa 2026 vasta aloittamassa. Jos se avataan, kohteen viimeinen virke kannattaa päivittää.
- **Yliopiston keskuskirjaston käsikirjoitukset.** Useat lähteet sanovat, että palossa tuhoutui myös Eminescun, Maiorescun ja Caragialen käsikirjoituksia, mutta en saanut noita sivuja auki (HTTP 429), joten nimet jäivät pois. Jos Päätoimittaja haluaa nimet mukaan, ne on helppo lisätä yhdellä vahvistuksella.
- **Puiston nimenmuutosvuosi.** Romaniankieliset lähteet eivät sano, milloin "Parcul I. V. Stalin" palasi Herăstrăuksi; englanninkielinen Wikipedia sanoo 1956. Teksti ei enää lukitse nimenmuutoksen vuotta.
- **CEC-palatsin peruskiven päivä.** Englanninkielinen Wikipedia sanoo 8.6.1897, romanialainen uutislähde 8.7.1897 kuningas Kaarle ensimmäisen ja kuningatar Elisabetin läsnä ollessa. Teksti ei mainitse päivää, joten ristiriita ei vaikuta mihinkään.

# Toimituksellinen tarkistus: Barcelona ja Bergen

Tarkistaja: toimituksellinen passi 7.10.2026. Verkko auki, kaikki alla mainitut
lähteet avattu WebFetchillä (tai WebSearchillä vahvistettu ja sen jälkeen avattu).

## Barcelona

Kierrosjärjestys luettiin läpi kuin pelaaja kuulee sen: Palau de la Música, Arc de
Triomf, katedraali, La Rambla, Casa Batlló, Casa Milà, Sagrada Família, Güellin puisto.
Viidestä kahdeksasta kierrosversiosta löytyi löydöstyyppi 2 (hallintoa tai pelkkiä
tekijätietoja) ja kolmessa myös päällekkäisyys oman `teksti`-kentän kanssa.

### Sagrada Família — kenttä `lyhyt`
- **Vanha:** "Pyhän perheen kirkon vihki käyttöön paavi Benedictus kuudestoista vuonna 2010, ja samalla hän julisti sen basilikaksi. Gaudín kuollessa rakennuksesta oli valmiina alle neljännes. Keskitorni on nyt valmis, mutta pääjulkisivu, Kunnian julkisivu, on yhä rakenteilla."
- **Uusi:** "Pyhän perheen kirkon keskitornin Gaudí mitoitti tarkoituksella matalammaksi kuin Montjuïcin kukkula, sillä ihmiskäden työ ei hänen mielestään saanut nousta Jumalan luoman yli. Kesäkuussa 2026 paavi Leo neljästoista vihki valmistuneen tornin Gaudín kuoleman satavuotispäivänä. Kirkon pääjulkisivu on yhä rakenteilla."
- **Syy:** Löydöstyyppi 2 ja 5. Vanha kierrosversio oli kirkollista hallintoa (vihkiminen, basilikaksi julistaminen) eikä jäänyt mieleen. Lisäksi aineistosta puuttui kaupungin tuorein tapahtuma: paavi vihki valmistuneen keskitornin 10.6.2026, tarkalleen sata vuotta Gaudín kuolemasta. Uusi versio kertoo yllättävän syyn tornin korkeudelle (ja sitoo sen Montjuïciin, joka on sama kaupungin toinen kohde) sekä nykytilan. Tornin korkeus ja helmikuun 2026 risti jäävät `teksti`-kenttään, joten päällekkäisyyttä ei tule.
- **Lähde:** https://en.wikipedia.org/wiki/Sagrada_Fam%C3%ADlia ja https://www.catalannews.com/popes-visit/item/pope-leo-xiv-popemobil-barcelona-june-10-2026

### Sagrada Família — kenttä `lahteet`
- **Vanha:** "Benedictus XVI vihki kirkon ja julisti sen basilikaksi 7.11.2010."
- **Uusi:** kaksi merkintää: Gaudín mitoitusperuste (Montjuïc) ja paavin vihkiminen 10.6.2026.
- **Syy:** Löydöstyyppi 3. Lähteet vastaavat nyt tekstissä esitettyjä väitteitä.
- **Lähde:** kuten yllä.

### Casa Batlló — kenttä `lyhyt`
- **Vanha:** "Luutaloksi kutsuttu Casa Batlló rakennettiin alun perin jo vuonna 1877, ja vuonna 1904 Gaudí ryhtyi muokkaamaan sitä uuteen asuun. Suoria linjoja talossa ei ole juuri lainkaan. Nykyään talo on museo ja osa Unescon maailmanperintöä."
- **Uusi:** "Luutaloksi kutsuttu Casa Batlló oli vuonna 1906 ehdolla Barcelonan kaupungin vuotuiseksi parhaaksi rakennukseksi, mutta palkinto meni toiselle talolle. Omistaja oli ensin halunnut purkaa paikalla olleen vanhan talon kokonaan, ja Gaudí sai hänet tyytymään muutostöihin. Nykyään talossa on museo."
- **Syy:** Löydöstyyppi 2 ja 1. Vanha versio oli kolme hallinnollista perustietoa peräkkäin (rakennusvuosi, muutosvuosi, Unesco), eikä siinä ollut mitään muistiin jäävää. Lisäksi "luutalo" ja Gaudín muutostyö kerrottiin jo `teksti`-kentässä, ja Unesco-maininta toistui Casa Milàn kierrosversiossa. Uusi versio kertoo ristiriidan (kilpailussa häviäminen) ja ihmisen päätöksen (purkaminen vaihtui muutostyöhön). Samalla poistui edellisen tarkistajan epävarmaksi merkitsemä "suoria linjoja ei ole juuri lainkaan", jolle lähde puhui vain julkisivusta.
- **Lähde:** https://en.wikipedia.org/wiki/Casa_Batll%C3%B3

### Güellin puisto — kenttä `lyhyt`
- **Vanha:** "… Pylväshallin katon mosaiikit teki Gaudín työtoveri Josep Maria Jujol. Gaudín entinen koti puistossa on nykyään museo."
- **Uusi:** "… Se ei ole pelkkä koriste, sillä eläimen suu on maanalaisen vesisäiliön ylivuotoaukko. Gaudín entinen koti puistossa on nykyään museo."
- **Syy:** Löydöstyyppi 2. Keskimmäinen virke oli pelkkä tekijätieto. Tilalle tuli lähteen vahvistama yllätys: portaikon lohikäärme on vesijärjestelmän osa, ja sen suu on pylväshallin alla olevan säiliön ylivuotoaukko. Ensimmäinen virke (mosaiikkilisko) ja viimeinen (talomuseo) jäivät ennalleen.
- **Lähde:** https://parkguell.barcelona/en/park-guell/emblematic-features/hypostyle-room

### Casa Milà — kenttä `lyhyt`
- **Vanha:** "Kivilouhokseksi kutsutun Casa Milàn varsinainen omistaja oli Roser Segimon, joka asui talossa kuolemaansa saakka vuoteen 1964. Vuonna 1984 talo liitettiin Unescon maailmanperintöluetteloon, ja nykyään siellä toimii näyttelyitä ja vierailuja järjestävä säätiö."
- **Uusi:** "Asuintalo Casa Milàn emäntä Roser Segimon valitti Gaudílle, ettei talossa ollut yhtään suoraa seinää, jota vasten hänen Steinway-pianonsa olisi mahtunut. Gaudí vastasi, että soittakoon sitten viulua. Arkkitehdin kuoltua Segimon hävitti talosta suurimman osan Gaudín suunnittelemista huonekaluista."
- **Syy:** Löydöstyyppi 3 JA 2. Faktavirhe omistussuhteessa: Segimon ei ollut talon "varsinainen omistaja" vaan yhteisomistaja miehensä Pere Milàn kanssa, ja Milàn kuoltua 1940 hän **myi talon vuonna 1946** Josep Ballvé i Pelliséelle — hän vain asui pääkerroksessa kuolemaansa 1964 asti. Lisäksi vanha versio oli pelkkää hallintoa (omistus, Unesco-vuosi, säätiö) ja "kivilouhos" toistui sekä `teksti`-kentästä että `syventava`-kentästä. Uusi versio on dokumentoitu kohtaus talon emännän ja arkkitehdin välillä.
- **Lähde:** https://en.wikipedia.org/wiki/Casa_Mil%C3%A0

### Casa Milà — kenttä `lahteet`
- **Vanha:** "Roser Segimon omisti talon ja asui siinä kuolemaansa 1964 asti." (lonelyplanet.com)
- **Uusi:** kaksi merkintää: pianokohtaus ja huonekalujen hävittäminen sekä erillinen tarkennus omistussuhteesta (yhteisomistus, myynti 1946, asuminen 1964 asti).
- **Syy:** Löydöstyyppi 3. Vanha lähdemerkintä toisti saman virheellisen omistusväitteen.
- **Lähde:** https://en.wikipedia.org/wiki/Casa_Mil%C3%A0

### La Rambla — kenttä `lyhyt`
- **Vanha:** "… Perinne alkoi, kun läheinen sanomalehti ripusti otteluiden tulokset ikkunaansa."
- **Uusi:** "… Perinne alkoi, kun viereisen urheilulehden toimituksen eteen kirjoitettiin päivän tulokset liitutaululle."
- **Syy:** Löydöstyyppi 3 (vivahde). Tulokset eivät olleet lehden ikkunassa vaan ne kirjoitettiin liitutaululle toimituksen eteen kadulle; kyse oli nimenomaan urheilulehdestä nimeltä La Rambla.
- **Lähde:** https://bid.barcelonaturisme.com/wv3/en/page/1213/canaletes-fountain.html

### La Rambla — kenttä `lahteet`
- **Vanha:** Canaletesin kaivon legendan url oli `https://en.wikipedia.com/wiki/Ramblas` (rikkinäinen: `.com`, ei `.org`, eikä sellaista artikkelia ole).
- **Uusi:** `https://en.wikipedia.org/wiki/Font_de_Canaletes`, joka vahvistaa legendan sanatarkasti; lisäksi kannattajaperinteen liitutaulu sai oman lähteen (barcelonaturisme) ja en.wikipedia jäi vahvistamaan vain 1930-luvun alun.
- **Syy:** Löydöstyyppi 3. Vanha url ei auennut, eikä en.wikipedian Font de Canaletes -artikkeli tue lehti-väitettä ollenkaan.
- **Lähde:** https://en.wikipedia.org/wiki/Font_de_Canaletes ja https://bid.barcelonaturisme.com/wv3/en/page/1213/canaletes-fountain.html

### Palau de la Música Catalana — kenttä `teksti`
- **Vanha:** "Se on Euroopan ainoa konserttisali, jota päivisin valaisee pelkkä luonnonvalo, ja vuonna 1997 siitä tuli maailman ainoa Unescon maailmanperintökohteeksi nimetty konserttisali."
- **Uusi:** "Päiväsaikaan salia ei tarvitse valaista sähköllä lainkaan, ja vuonna 1997 siitä tuli maailman ainoa Unescon maailmanperintökohteeksi nimetty konserttisali."
- **Syy:** Löydöstyyppi 3 (superlatiivi). Tämä oli edellisen tarkistajan jättämä epävarmuus, ja se on nyt ratkaistu: Palaun oma sivusto vahvistaa Unesco-superlatiivin sanatarkasti ("the only concert hall in the world to be declared a World Heritage Site"), mutta EI väitettä Euroopan ainoasta luonnonvalolla valaistusta salista. Kyseinen väite löytyy vain matkailusivuilta. Väitteen tarkistuva sisältö (päivisin ei tarvita sähkövaloa) jäi tekstiin; koko Euroopan kattava ainutlaatuisuus poistettiin. Unesco-superlatiivi jäi, koska sillä on ensisijainen lähde.
- **Lähde:** https://www.palaumusica.cat/en/the-palau-de-la-musica-catalana-the-only-concert-hall-in-the-world-recognised-by-unesco_1653219

### Palau de la Música Catalana — kenttä `lyhyt`
- **Vanha:** "… Kattoikkunan lasimaalauksen suunnitteli Antoni Rigalt, ja saliin mahtuu noin kaksituhatta kaksisataa kuulijaa."
- **Uusi:** "… Lavan oikealla puolella seinästä ratsastavat ulos Wagnerin valkyyriat, ja niiden alapuolella on Beethovenin rintakuva."
- **Syy:** Löydöstyyppi 1 ja 2. Kattoikkuna kerrottiin jo `teksti`-kentässä, ja paikkaluku on tylsä tekninen tieto. Tilalle tuli konkreettinen nähtävä yksityiskohta samasta seinästä, josta muusat jo kertoivat: lavan kaaren oikealla laidalla on Valkyyrioiden ratsastus ja sen alla Beethovenin rintakuva. Muusavirke jäi ennalleen, koska se on hyvä.
- **Lähde:** https://en.wikipedia.org/wiki/Palau_de_la_M%C3%BAsica_Catalana

### Arc de Triomf — kenttä `lyhyt`
- **Vanha:** "Riemukaari Arc de Triomf vihittiin toukokuussa 1888. Etupuolen friisin veisti Josep Reynés, ja takapuolen Palkinto-nimisen kivireliefin teki Josep Llimona. Itse maailmannäyttely pidettiin Ciutadellan puistossa, joka sai nykyisen asunsa juuri näyttelyä varten."
- **Uusi:** "Riemukaari Arc de Triomfin kahteen pylvääseen on veistetty kivisiä lepakoita. Lepakko oli 1200-luvulla Aragonian kuninkaan tunnus ja onnenmerkki, ja se on yhä Valencian kaupungin vaakunassa. Katalonian modernistiset arkkitehdit suosivat tällaisia eläinaiheita rakennustensa koristeissa."
- **Syy:** Löydöstyyppi 2, ja selvimmin koko kaupungissa: vanha versio oli vihkimispäivä ja kaksi veistäjän nimeä, eli pelkkiä tekijätietoja, eikä siitä jäänyt mieleen mitään. Lisäksi etupuolen friisi kerrottiin jo `teksti`-kentässä (löydöstyyppi 1). Uusi versio on yksityiskohta, jonka voi itse etsiä kaaresta, ja sen selitys. Kaaren vaakunoita ei käytetty, koska ne ovat kohteen `kysymykset`-listalla; FC Barcelonan ensimmäistä vaakunaa (jossa lepakko myös oli) ei käytetty, koska La Ramblan kierrosversio kertoo jo jalkapalloseurasta.
- **Lähde:** https://en.wikipedia.org/wiki/Arc_de_Triomf ja https://barcelona.de/en/barcelona-arc-de-triomf.html

### La Boqueria — kenttä `teksti`
- **Vanha:** "Kun peruskivi laskettiin Pyhän Joosefin päivänä vuonna 1840, sen alle kätkettiin kultaa ja kolikoita tuomaan torille vaurautta."
- **Uusi:** "Peruskivi laskettiin Pyhän Joosefin päivänä vuonna 1840, mutta kauppiaat suojasivat tavaransa säältä omin väliaikaisin katoksin aina metallikaton valmistumiseen asti."
- **Syy:** Löydöstyyppi 3. Kulta- ja kolikkoväitteelle oli merkitty lähteeksi amicsdelarambla.cat, mutta sivulla ei esiinny sanoja gold, ounce, coins, first stone eikä wealth. Väitettä ei löytynyt myöskään en.wikipediasta, torin omilta sivuilta (boqueria.barcelona), barcelona.comilta eikä beteve.catilta — eli mistään sivusta, jonka sain auki. Vaihdoin sen torin omien sivujen vahvistamaan tietoon: peruskivi 19.3.1840 ja vuoden 1914 metallikatto päätti ajan, jona kauppiaat joutuivat suojaamaan tavaransa väliaikaisin katoksin.
- **Lähde:** https://www.boqueria.barcelona/history ja https://www.amicsdelarambla.cat/en/turismo-detalle/la-boqueria-market

### Montjuïc — kenttä `teksti`
- **Vanha:** "Ranskan ja Espanjan välisen sodan sytyttyä Méchain joutui jäämään Barcelonaan."
- **Uusi:** "Kun Ranska ja Espanja joutuivat sotaan vuonna 1793, linnoitus otettiin sotilaskäyttöön, ja Méchain jatkoi havaintojaan majatalonsa huoneesta."
- **Syy:** Löydöstyyppi 3 (syy-yhteys ja vivahde). Sota ei ensisijaisesti pitänyt Méchainia Barcelonassa vaan ajoi hänet pois Montjuïcilta: linnoitus tarvittiin sotilaskäyttöön maaliskuussa 1793, eikä hän päässyt sinne enää takaisin, vaan mittasi leveysasteen majatalostaan. Juuri nämä majatalomittaukset erosivat linnan tuloksista ja vaivasivat häntä loppuelämänsä.
- **Lähde:** https://mathshistory.st-andrews.ac.uk/Biographies/Mechain/

### Casa Vicens — kenttä `teksti`
- **Vanha:** "Se oli Antoni Gaudín ensimmäinen talo, ja hän suunnitteli sen kolmekymmentäyksivuotiaana pörssimeklari Manel Vicens i Montanerin kesäasunnoksi."
- **Uusi:** "Se oli Antoni Gaudín ensimmäinen merkittävä talo, ja hän suunnitteli sen pörssimeklari Manel Vicens i Montanerin kesäasunnoksi vasta valmistuneena arkkitehtina."
- **Syy:** Löydöstyyppi 3. Ikä oli ristiriitainen: englanninkielinen Wikipedia sanoo Gaudín saaneen tilauksen vuonna 1878 ja olleen silloin noin 26-vuotias, kun taas mymodernmet.com sanoo 31-vuotias (eli vuoden 1883 rakennustöiden alku). Koska tarkka ikä riippuu siitä, lasketaanko tilaus vai rakentaminen, ikä on jätetty pois ja tilalle on pantu varmistettu asia: Gaudí valmistui arkkitehdiksi vuonna 1878 ja sai Vicensin tilauksen samana vuonna.
- **Lähde:** https://en.wikipedia.org/wiki/Casa_Vicens ja https://en.wikipedia.org/wiki/Antoni_Gaud%C3%AD

### Barcelona — tarkistettu, ei muutettu
- **Avaus** (40 sanaa, alkaa sanalla "Tervetuloa"): kuva on aidosti ilmasta nähtävä (meren ja vuorten väli, kahdeksankulmaisten kortteleiden ruudukko, Sagrada Famílian tornit). Eixamplen korttelit todella ovat kahdeksankulmaisia, koska neliön neljä kulmaa on viistetty. Avauksen "jonka salia valaisee päivisin pelkkä luonnonvalo" ei sisällä superlatiivia, joten se on nyt yhdenmukainen korjatun Palau-tekstin kanssa. Ei muutosta.
- **Katedraalin** kierrosversio (tanssiva kananmuna, ou com balla) on juuri sellainen tarina, jota löydöstyyppi 2 hakee; jätettiin rauhaan. Keskitornin 70 metriä ja valmistuminen 1913, kolmetoista hanhea ja Eulalian ikä vahvistettiin: https://en.wikipedia.org/wiki/Barcelona_Cathedral
- **Barcelona-paviljonki:** Kolben veistoksen suomennos oli edellisen tarkistajan epävarmuus. Ratkaistu: en.wikipedia antaa teoksen nimeksi "Alba (Dawn)", eli "Aamunkoitto" on oikea, ja veistos on nimenomaan pienemmässä altaassa, kuten tekstissä sanotaan. Ei muutosta. https://en.wikipedia.org/wiki/Barcelona_Pavilion
- **Torre Glòries:** nykytila tarkistettu, Mirador ja Saracenon Cloud Cities ovat yhä avoinna (yli 300 000 kävijää vuoteen 2025). Kysymyksen "Kuka on kiivennyt tornin seinää ylös?" oletus on tosi: Alain Robert on kiivennyt tornin useita kertoja, viimeksi poikansa kanssa 2022. https://en.wikipedia.org/wiki/Torre_Gl%C3%B2ries
- **Casa Milàn katto:** harkittiin, onko "kypärää muistuttavia savupiippuja" ja "piiput näyttävät vartioivan portaiden uloskäyntejä" oikein. On: en.wikipedia kutsuu niitä "six skylights/staircase exits" ja selittää Gimferrerin nimityksen juuri sillä, että piiput näyttävät suojaavan niitä. Ei muutosta.
- **Palau Güell:** harkittiin kupolin tähtitaivasta. Katalaaninkielinen Wikipedia vahvistaa, että pienet aukot päästävät läpi päivänvalon, joten tekstin väite kestää; englanninkielinen Wikipedia lisää, että iltaisin aukkojen taakse ripustettiin ulkopuolelta lyhtyjä. Koska kyse ei ole virheestä vaan lisätiedosta, teksti jätettiin ennalleen. Rakennusvuodet 1886–1890, kupoli 17,5 metriä ja kaksikymmentä savupiippua vahvistettiin: https://www.lapedrera.com/en/work-antoni-gaudi/palau-guell/ ja https://ca.wikipedia.org/wiki/Palau_G%C3%BCell
- **Sant Pau -sairaala:** Pau Gil oli Pariisissa asunut katalaanipankkiiri, kuoli 1896, testamentti määräsi perinnön uuden sairaalan rakentamiseen, hoitotoiminta siirtyi pois syksyllä 2009, paviljongit yhdistetään maanalaisin käytävin. Kaikki vahvistui. https://santpaubarcelona.org/en/recinte-modernista/historia/
- **Güellin puisto:** kuusikymmentä tonttia, vain kaksi taloa, Gaudí muutti 1906 isänsä ja veljentyttärensä kanssa — vahvistettu. https://en.wikipedia.org/wiki/Park_G%C3%BCell
- **La Rambla:** Mirón mosaiikin vuosi on ristiriitainen (en.wikipedia 1971, paikallinen lähde vihkiminen 23.12.1976). Teksti sanoo "paljastettiin vuonna 1976", mikä vastaa vihkimistä, joten se jätettiin. https://www.amicsdelarambla.cat/en/turismo-detalle/miros-mosaic-at-pla-de-los
- **Isoisä:** ei mainintaa yhdessäkään kohteessa, koska pohjan merkintä (ihmistorni "Barcelonan laidalla") ei liity mihinkään kohteeseen. Oikea ratkaisu, ei muutosta.

### Barcelona — epävarmuudet Päätoimittajalle
- La Boquerian kulta ja kolikot peruskiven alla: väite on todellinen ja laajalti toistettu (hakukone löytää sen sanatarkasti), mutta en saanut auki yhtään sivua, jolla se on. Jos Päätoimittaja löytää sille avattavan lähteen, yksityiskohta kannattaa palauttaa — se oli tekstin paras kuva.
- Palaun luonnonvalosuperlatiivi: poistin sen tekstistä, vaikka pelin aineisto esittää sen. Jos omistaja haluaa aineiston mukaisen muotoilun takaisin, se on Päätoimittajan päätös; väitteen sisältö (ei sähkövaloa päivisin) on joka tapauksessa tallella.
- Arc de Triomfin lepakon "onnenmerkki" on barcelona.de-sivun sanamuoto ("his lucky charm"); en.wikipedia sanoo vain "emblem". Jos Päätoimittaja haluaa tiukemman muotoilun, "onnenmerkki" voi pudota pois (kierrosversio pysyy silloin 30 sanassa, eli yhä rajoissa).
- Casa Vicensin "kahden vuoden kunnostuksen jälkeen" nojaa yhä mymodernmet.com-lähteeseen; MoraBanc osti talon 2014 ja museo avattiin marraskuussa 2017, joten kunnostus kesti pikemminkin kaksi–kolme vuotta. Jätin ennalleen, koska väite ei ole väärä.

### Barcelona — koneellinen tarkistus
`Barcelona: 15 kohdetta, 0 virhettä, 19 huomiota, puhetta 12262 merkkiä`
Kaikki 18 "ei ala paikan nimellä" -huomiota johtuvat suomenkielisestä etusanasta (ääntämissääntö), ja yhdeksästoista on "avaus puuttuu" (avaus on erillisessä tiedostossa). Huomioiden määrä ei kasvanut: ennen passia nimialkuhuomioita oli samat 18.

## Bergen

Kierrosjärjestys luettiin läpi kuin pelaaja kuulee sen: Bryggen, Bergenhusin linnake,
Mariankirkko, Fløibanen, Bergenin tuomiokirkko, Fløyen, Fantoftin sauvakirkko, Troldhaugen.
Kaikki kahdeksan kierrosversiota osuivat löydöstyyppiin 2: ne olivat vuosilukuja, rakennusmääriä,
Unesco-merkintöjä, tekijätietoja tai reittiohjeita, eikä yhdestäkään jäänyt mieleen tarinaa.
Lisäksi kaupungista löytyi kolme nykytilavirhettä (löydöstyyppi 5), joista yksi on vakava.

### Troldhaugen — kenttä `lyhyt`
- **Vanha:** "Säveltäjä Griegin kodin Troldhaugenin suunnitteli hänen serkkunsa, arkkitehti Schak Bull, joka suunnitteli myös kalliohaudan, jonka kiveen on kaiverrettu Griegin nimi tyylitellyin riimukirjaimin. Talo avattiin museoksi vuonna 1928, ja nykyään huvila, säveltäjänmaja ja hauta muodostavat Edvard Griegin museon."
- **Uusi:** "Säveltäjä Griegin kodin Troldhaugenin säveltäjänmajan pöydälle jäi lappu aina, kun Grieg lähti matkalle. Siinä hän pyysi mahdollisia murtautujia jättämään nuotit rauhaan, koska niistä ei olisi kenellekään muulle hyötyä. Griegin onnenkalut, sammakko, peikko ja possu, kulkivat matkoilla hänen mukanaan."
- **Syy:** Löydöstyyppi 5 ja 2, ja tämä on passin vakavin löytö. **Griegin huvila on suljettu.** Se sulkeutui 15.8.2025 perusteelliseen kunnostukseen, ja museon oma sivusto kertoo nyt, että se avautuu uudelleen kesällä 2027. Vanha kierrosversio väitti, että "nykyään huvila, säveltäjänmaja ja hauta muodostavat Edvard Griegin museon" — tätä ei voi lukea ääneen pysyvälle äänitteelle. Avoinna ovat puisto, säveltäjänmaja, hauta, kahvila ja päivittäiset konsertit. Koska avautumisajankohta vaihtelee lähteissä (fib.no sanoo kesä 2026, museo itse kesä 2027), kirjoitin kierrosversion niin ettei se vanhene: siinä ei oteta kantaa siihen, mitä on auki. Samalla korjautui löydöstyyppi 2: vanha versio oli pelkkiä tekijätietoja ja museovuosi, nyt siinä on dokumentoitu tarina Griegin lapusta murtautujille sekä hänen onnenkalunsa.
- **Lähde:** https://www.kodebergen.no/en/about-us/visit-troldhaugen-this-summer , https://csmonitor.com/2000/1031/p21s1.html ja https://www.kodebergen.no/en/collections/the-collection-at-troldhaugen

### Troldhaugen — kenttä `lahteet`
- **Vanha:** "Kokonaisuuteen kuuluvat Edvard Griegin museo, huvila, säveltäjänmaja ja hauta."
- **Uusi:** nykytilamerkintä huvilan sulkemisesta ja avautumisesta, lapun lähde ja onnenkalujen lähde.
- **Syy:** Löydöstyyppi 5. Lähde dokumentoi nyt, miksi väite poistettiin.
- **Lähde:** kuten yllä.

### Ulriken — kenttä `teksti`
- **Vanha:** "Huipulle nousee köysirata Ulriksbanen, jonka rakensi sveitsiläinen yhtiö ja joka avattiin vuonna 1961."
- **Uusi:** "Huipulle nousee köysirata Ulriksbanen, jonka sveitsiläinen yhtiö rakensi vuonna 1961 ja jonka vaunut uusittiin vuonna 2021."
- **Syy:** Löydöstyyppi 5. Teksti antoi ymmärtää, että huipulle nousee vuoden 1961 köysirata. Todellisuudessa lokakuussa 2021 avattiin uusi vaunu ja laajennettu Skyskraperen-ravintola nimellä Ulriken643. Vanha muotoilu olisi vanhentunut heti.
- **Lähde:** https://en.wikipedia.org/wiki/Ulriksbanen

### Fløibanen — kenttä `teksti`
- **Vanha:** "Rata on yksi Norjan suosituimmista nähtävyyksistä, ja vuonna 2018 sillä tehtiin yli kaksi miljoonaa matkaa."
- **Uusi:** "Rata on yksi Norjan suosituimmista nähtävyyksistä, ja sillä tehdään lähes kaksi miljoonaa matkaa vuodessa."
- **Syy:** Löydöstyyppi 5. Kahdeksan vuotta vanha kävijäluku vanhenee joka vuosi. Englanninkielinen Wikipedia kertoo nykyään vuositason ("nearly two million passengers annually"), joka ei vanhene samalla tavalla.
- **Lähde:** https://en.wikipedia.org/wiki/Fl%C3%B8ibanen

### Fløibanen — kenttä `lyhyt`
- **Vanha:** "Köysirata Fløibanenin nykyiset vaunut rakennettiin Sveitsissä. Ne suunnitteli erityisesti tätä rataa varten teollinen muotoilija Espen Thorup, ja edeltäjiensä tavoin niissä on suuret ikkunat ja lasikatto, joten matkustajat näkevät vuoren rinteen ja kaupungin."
- **Uusi:** "Köysirata Fløibanenia käyttivät sotavuosina saksalaiset miehitysjoukot tavaran ja väen kuljettamiseen. Miehityksen päätyttyä vaunut maalattiin toinen punaiseksi ja toinen siniseksi, ja yhdessä valkoisen ala-aseman kanssa ne muodostavat Norjan lipun värit. Samoja värejä on käytetty siitä asti."
- **Syy:** Löydöstyyppi 2. Vanha versio oli valmistusmaa, muotoilijan nimi ja ikkunoiden kuvaus, eli pelkkää teknistä tietoa. Uusi versio kertoo, miksi vaunut ovat juuri punainen ja sininen: miehitysvuosina saksalaiset joukot kuluttivat radan kuljetuksillaan, ja miehityksen päätyttyä vaunut maalattiin niin, että ne yhdessä valkoisen ala-aseman kanssa muodostavat Norjan lipun. Värit näkyvät edelleen kaikille, jotka katsovat rataa. Kierrosversio ei vastaa `syventava`-kenttään ("Miksi vaunu on nimeltään Punahilkka?") eikä kysymykseen Blåmannin nimestä, koska ne koskevat nimiä, ei värejä.
- **Lähde:** https://en.wikipedia.org/wiki/Fl%C3%B8ibanen

### Bryggen — kenttä `lyhyt`
- **Vanha:** "Bergenin vanhasta laiturista, Bryggenistä, on säilynyt kuusikymmentäkaksi rakennusta, ja se on ollut Unescon maailmanperintökohde vuodesta 1979. Hansaliitolla oli ulkomailla neljä kontoria, ja Bryggen on niistä ainoa, joka on säilynyt meidän päiviimme."
- **Uusi:** "Bergenin vanhaa laituria, Bryggeniä, kutsuttiin 1300-luvulta lähtien Tyskebryggeniksi eli saksalaisten laituriksi. Toukokuussa 1945, heti Saksan miehityksen päätyttyä, kaupunginvaltuusto päätti, että virallinen nimi on vastedes pelkkä Bryggen. Hansaliiton neljästä ulkomaisesta kontorista Bryggen on ainoa säilynyt."
- **Syy:** Löydöstyyppi 2 JA 3. Vanha versio oli rakennusmäärä ja Unesco-vuosi, eli juuri sitä hallinnollista tietoa, jota kierrosversioon ei kuulu. Lisäksi luku kuusikymmentäkaksi ei kestänyt tarkistusta: englanninkielinen Wikipedia ei enää mainitse mitään lukua, ja norjankielinen sanoo 61 suojeltua rakennusta. Luku on siksi poistettu. Tilalle tuli tarina, jonka päivämäärä on tarkistettu: laituria kutsuttiin Tyskebryggeniksi 1300-luvulta lähtien, ja kaupunginvaltuusto päätti 25.5.1945, heti miehityksen päätyttyä, että nimi on vastedes pelkkä Bryggen. Hansaliiton kontorin säilyminen jäi viimeiseksi virkkeeksi, koska se on kohteen ydinasia.
- **Lähde:** https://no.wikipedia.org/wiki/Bryggen_i_Bergen ja https://www.thelocal.no/20111018/bergen-votes-down-german-wharf-name-change

### Bryggen — kenttä `lahteet`
- **Vanha:** "Säilyneitä rakennuksia on 62; Unescon maailmanperintöluettelossa vuodesta 1979." (en.wikipedia)
- **Uusi:** kolme merkintää: Unesco 1979 ja 61 suojeltua rakennusta perusteluna luvun poistolle, nimenmuutos 25.5.1945, ja nimen historia sekä vuoden 2011 ehdotus.
- **Syy:** Löydöstyyppi 3. Vanha lähde ei enää tue lukua 62.
- **Lähde:** kuten yllä.

### Bergenhusin linnake — kenttä `lyhyt`
- **Vanha:** "Bergenhusin linnake menetti 1800-luvulla puolustustehtävänsä, mutta armeija piti sen hallinnollisena tukikohtanaan, ja siellä palvelee yhä noin sataviisikymmentä sotilasta. Rosenkrantzin torni sai nykyisen muotonsa 1560-luvulla, kun lääninherra Erik Rosenkrantz korotti sitä kolmella kerroksella."
- **Uusi:** "Bergenhusin linnakkeen Rosenkrantzin torni sai 1560-luvulla kolme tehtävää yhtä aikaa, sillä pohjakerrokseen tuli tyrmä, keskikerroksiin lääninherran asunto ja ylimmälle tasolle tykkiasemat. Työn tekivät skotlantilaiset kivenhakkaajat, ja tornin ydin on lähes kolmesataa vuotta vanhempi kuninkaan asuintorni."
- **Syy:** Löydöstyyppi 2. Vanha versio oli organisaatiomuutos ("menetti puolustustehtävänsä", "hallinnollinen tukikohta"), henkilöstömäärä ja kerrosluku — juuri ohjeen kieltämää hallintoa. Tarkistuksessa selvisi kiinnostavampi ja vahvistettu asia: torni on kolme rakennusta sisäkkäin, sen ydin on 1270-luvun kuninkaallinen asuintorni, ja 1560-luvun laajennuksen teki Erik Rosenkrantzin palveluksessa ollut skotlantilainen kivenhakkaajajoukko. Yhdessä rakennuksessa oli samaan aikaan tyrmä, lääninherran koti ja tykkiasemat.
- **Lähde:** https://en.wikipedia.org/wiki/Rosenkrantz_Tower

### Mariankirkko — kenttä `lyhyt`
- **Vanha:** "Mariankirkko on ainoa norjalainen seurakuntakirkko, jonka länsipäässä kohoaa kaksi tornia. Kirkkoa alettiin rakentaa 1130- tai 1140-luvulla, ja sen arvellaan valmistuneen noin vuonna 1180. Viimeinen saksankielinen jumalanpalvelus pidettiin siellä vuonna 1868."
- **Uusi:** "Mariankirkko säilyi Bergenin muiden keskiaikaisten kirkkojen rapistuessa, ja syy oli raha. Saksalaiset kauppiaat ottivat kirkon haltuunsa vuonna 1408 ja sisustivat sen rikkaasti. Pääalttarin kaappi tuotiin Lyypekistä 1400-luvulla, ja sitä pidetään maan hienoimpana keskiaikaisena alttarikaappina."
- **Syy:** Löydöstyyppi 1, 2 ja 7. Kaksi tornia kerrottiin jo `teksti`-kentässä ("ylhäältä sen tunnistaa … kahdesta korkeasta, neliskulmaisesta tornista"), ja mikä pahempaa, kierrosversio vastasi kohteen omaan kysymykseen "Miksi kirkon länsipäässä on kaksi tornia?". Rakennusvuodet olivat pelkkää hallintoa. Tilalle tuli syy-yhteys, joka on tarina: kirkko säilyi, koska se kuului rikkaille saksalaisille kauppiaille, jotka ottivat sen haltuunsa vuonna 1408 ja koristelivat sen, kun kaupungin muut keskiaikaiset kirkot rapistuivat. Lisäksi yksi konkreettinen esine, Lyypekistä tuotu alttarikaappi, joka herättää uteliaisuuden kohteen kysymykseen "Mitä keskiaikaisessa alttarikaapissa kuvataan?" vastaamatta siihen.
- **Lähde:** https://en.wikipedia.org/wiki/St_Mary%27s_Church,_Bergen ja https://snl.no/Mariakirken_-_Bergen

### Bergenin tuomiokirkko — kenttä `lyhyt`
- **Vanha:** "Bergenin tuomiokirkko oli vuonna 1814 vaalikirkko, yksi yli kolmestasadasta äänestyspaikasta, kun Norjassa valittiin edustajia Eidsvollin kansalliskokoukseen. Arkkitehdit Christian Christie ja Peter Andreas Blix poistivat 1880-luvulla kirkon rokokoosisustuksen ja palauttivat sisätiloille keskiaikaisen asun."
- **Uusi:** "Bergenin tuomiokirkko mainitaan ensimmäisen kerran kirjallisissa lähteissä vuonna 1181. Silloin talonpoikien päällikkö Jon Kutiza kävi Bergenissä kuningas Sverren kimppuun, ja osa Sverren miehistä pakeni kirkon suojaan. Kirkon ensimmäiset urut hankittiin vuonna 1549, ja nykyinen soitin on järjestyksessä viides."
- **Syy:** Löydöstyyppi 2. Vanha versio oli hallintoa kahdesti: vaalijärjestely, joka päti yli kolmeensataan muuhun kirkkoon (eli ei erottanut tätä kohdetta mistään — sama fakta päti myös Mariankirkkoon), ja kahden arkkitehdin nimet. Uusi versio on dokumentoitu kohtaus Sverren saagasta: kirkon ensimmäinen esiintyminen historiassa on se, että sinne paettiin hyökkäystä. Urkujen ikäjatkumo vuodesta 1549 antaa lopuksi konkreettisen mittakaavan.
- **Lähde:** https://en.wikipedia.org/wiki/Bergen_Cathedral

### Fløyen — kenttä `lyhyt`
- **Vanha:** "Kaupunkivuori Fløyenin ja Bergenin korkeimman vuoren Ulrikenin välillä kulkee Vidden-reitti, noin kolmentoista kilometrin vaellus avoimen ylängön poikki. Reitti on suositeltavaa kulkea Ulrikenilta Fløyenille, koska silloin vaellus alkaa korkeammalta ja alas kaupunkiin pääsee lopuksi köysiradalla."
- **Uusi:** "Kaupunkivuori Fløyenilta kaupunkiin laskeutuvat tiet ja polut valaistaan talvikuukausina, ja silloin bergeniläiset laskevat niitä pitkin pulkalla alas rinnettä. Kesällä samoilla poluilla kuljetaan jalan, ja vuoren laella olevalta Skomakerdiket-lammelta voi lainata kanootin."
- **Syy:** Löydöstyyppi 1 ja 2. Vidden-reitti kerrotaan jo Ulrikenin `teksti`-kentässä samoilla tiedoilla (avoin ylänkö, Fløyenille, matka-aika), joten sama asia oli kaupungin aineistossa kahdesti. Toinen virke oli pelkkää reittiohjetta. Uusi versio on kaupunkilaisten oma käyttö vuoresta ja näkyy ylhäältä: koko rinne on talvella valaistu ja sitä lasketaan pulkalla alas kaupunkiin.
- **Lähde:** https://en.wikipedia.org/wiki/Fl%C3%B8yen ja https://www.bergen.kommune.no/hvaskjer/tema/byfjellene/turinformasjon/floyen

### Fantoftin sauvakirkko — kenttä `lyhyt`
- **Vanha:** "Fantoftin sauvakirkko sai lohikäärmeenpäänsä ja veistetyt porttinsa Borgundin sauvakirkon mallista, kun konsuli Gaden puusepät pystyttivät sen uudelleen. Vuodesta 1997 lähtien kirkkoa on ympäröinyt aita, jonka tehtävä on suojata sitä uusilta tuhopoltoilta."
- **Uusi:** "Fantoftin sauvakirkon kaltaisia puukirkkoja rakennettiin Norjassa keskiajalla arvioiden mukaan tuhat tai jopa kaksi tuhatta. Niistä on jäljellä kaksikymmentäkahdeksan, eikä Fantoft ole niiden joukossa, koska alkuperäinen tuhoutui. Vuodesta 1997 kirkkoa on ympäröinyt aita suojaamassa sitä uusilta tuhopoltoilta."
- **Syy:** Löydöstyyppi 3, 1 ja 7. Borgund-esikuva oli edellisen tarkistajan merkitsemä epävarmuus, ja se on nyt ratkaistu: englanninkielinen Wikipedia ei mainitse Borgundia lainkaan, ja väite löytyy vain matkailusivuilta, joten se on poistettu. Samalla korjautuivat lohikäärmeenpäiden toisto `teksti`-kentän kanssa ja se, että kierrosversio vastasi kohteen omaan kysymykseen "Miksi kirkon katoilla on lohikäärmeenpäitä?". Tilalle tuli vahvistettu ja yllättävä mittakaava: keskiajan Norjaan rakennettiin arviolta tuhat tai jopa kaksi tuhatta sauvakirkkoa, niistä on pystyssä kaksikymmentäkahdeksan, eikä Fantoft ole niiden joukossa.
- **Lähde:** https://en.wikipedia.org/wiki/Stave_church ja https://en.wikipedia.org/wiki/Fantoft_Stave_Church

### Nykirken — kenttä `teksti`
- **Vanha:** "Huhtikuussa 1944 satamassa räjähtänyt laiva sytytti kirkon jälleen tuleen. Seurakunta toivoi uutta kirkkoa keskeisemmälle paikalle, mutta viranomaiset vaativat vanhan korjaamista, ja kirkko vihittiin uudelleen vuonna 1956."
- **Uusi:** "Huhtikuussa 1944 satamassa räjähtänyt laiva sytytti kirkon jälleen tuleen, ja seurakunta toivoi uutta kirkkoa keskeisemmälle paikalle, mutta viranomaiset vaativat vanhan korjaamista. Kirkko vihittiin uudelleen vuonna 1956, ja vuodesta 2002 seurakunta on kutsunut sitä lasten tuomiokirkoksi."
- **Syy:** Löydöstyyppi 5. Koko kappale oli historiaa eikä kertonut lainkaan, mikä rakennus on nyt. Kirkko on yhä säännöllisessä käytössä, ja vuodesta 2002 sitä on painotettu lasten kirkkona; seurakunta kutsuu sitä lasten tuomiokirkoksi. Virkerakenne säilyi viidessä virkkeessä yhdistämällä kaksi vanhaa virkettä.
- **Lähde:** https://en.wikipedia.org/wiki/Nykirken

### Bergen — tarkistettu, ei muutettu
- **Avaus** (36 sanaa, alkaa sanalla "Tervetuloa"): kuva on aidosti ilmasta nähtävä (kattojen kirjo seitsemän vuoren sylissä, vuonolta työntyvä Vågen-lahti), ja ensimmäinen kohde Bryggen mainitaan. Väite puutalojen rivin nousemisesta jokaisen palon jälkeen samalle paikalle vahvistui Unescon kuvauksesta. Ei muutosta.
- **Grieghallen:** kaikki tarkistettu ja oikein — valmistui 1978, tanskalainen Knud Munk, 1500 paikkaa, filharmonikkojen koti, orkesteri perustettu 1765, Grieg johti 1880–1882, Euroviisut 1986, festivaalin päänäyttämö. Nykytila: ei remonttisulkua. Grieg Quarter -laajennusta odotetaan vuoteen 2031, mutta se ei muuta nykytilaa. Ei muutosta. https://en.wikipedia.org/wiki/Grieg_Hall
- **Ulriken:** televisiomasto ja ravintola huipulla vahvistettiin, 643 metriä ja asema seitsemän vuoren korkeimpana vahvistettiin. https://en.wikipedia.org/wiki/Ulriken
- **Bergenhusin salin** vuodet tarkistettiin: uudelleenavaus 1961 on tasan 700 vuotta ensimmäisestä käytöstä vuonna 1261, joten virke pitää. Ei muutosta.
- **Bryggenin riimukirjoitukset** (noin 670 kappaletta, "rakkaani, suutele minua") vahvistettiin, samoin kaivausten alku vuoden 1955 palosta. https://en.wikipedia.org/wiki/Bryggen_inscriptions
- **Mariankirkon** vuolukivi, 1600-luvun barokkisaarnatuoli, palot 1198 ja 1248 sekä viiden vuoden kunnostus ja avaus 2015 vahvistettiin.
- **Fantoftin** alkuperäinen kirkko noin 1150 Fortunissa, siirto osina 1883, tuhopoltto 6.6.1992 ja aita vuodesta 1997 vahvistettiin.
- **Isoisä:** mainitaan vain Bergenin tuomiokirkossa ja vain päiväkirjamerkinnän sisällöllä (tykinkuula, laivastopalvelus, lyijykynä). Oikein, ei muutosta.

### Bergen — epävarmuudet Päätoimittajalle
- **Troldhaugenin huvila:** omistajan päätettävä, halutaanko äänitteeseen maininta sulkemisesta. Nyt teksti ei väitä huvilan olevan auki eikä kiinni. Museon oma sivu sanoo kesä 2027, festivaalin sivu kesä 2026 — kun oikea päivä on tiedossa, kohteeseen voi halutessa lisätä nykytilan.
- **Bryggenin kontorin perustamisvuosi:** teksti sanoo "noin vuonna 1350". Unescon kuvaus sanoo 1350, norjankielinen Wikipedia sanoo saksalaisen kontorin toimineen 1360–1754. "Noin" kattaa haarukan, joten jätin sen, mutta jos halutaan täsmällinen luku, se on syytä päättää erikseen.
- **Bryggenin rakennusmäärä:** 62 poistui, koska lähde ei enää tue sitä. Norjankielinen Wikipedia sanoo 61 suojeltua rakennusta. Jos luku halutaan takaisin, 61 on dokumentoitu.
- **Fantoftin jälleenrakennusvuosi:** teksti sanoo 1997 ja aita "vuodesta 1997". Englanninkielinen Wikipedia sanoo jälleenrakennuksen kestäneen kuusi vuotta vuoden 1992 palon jälkeen, mikä viittaisi vuoteen 1998. En muuttanut vuotta, koska muut lähteet sanovat 1997, mutta ristiriita kannattaa tietää.
- **Mariankirkon saksankieliset jumalanpalvelukset:** snl.no sanoo viimeisen olleen 1868, englanninkielinen Wikipedia sanoo saarnoja pidetyn saksaksi ensimmäisen maailmansodan jälkeenkin. Poistin väitteen kierrosversiosta tätä ratkaisematta; snl on luotettavampi, mutta jos luku halutaan tekstiin, ristiriita on olemassa.
- **Troldhaugenin asumisaika:** teksti sanoo Griegien asuneen talossa yli kaksikymmentä vuotta. Se on totta vuosiluvuilla 1885–1907, mutta englanninkielinen Wikipedia tarkentaa, että he asuivat siellä pääosin kesät. Jätin ennalleen.
- **Griegin onnenkalut:** museon oma sivu sanoo "are said to have been brought with him on his travels", eli kyse on perimätiedosta. Kirjoitin kierrosversioon "kulkivat matkoilla hänen mukanaan"; jos Päätoimittaja haluaa, siihen voi lisätä varauksen.

### Bergen — koneellinen tarkistus
`Bergen: 11 kohdetta, 0 virhettä, 12 huomiota, puhetta 10041 merkkiä`
Yksitoista huomiota on "ei ala paikan nimellä" (suomenkielinen etusana, ääntämissääntö) ja kahdestoista "avaus puuttuu" (avaus on erillisessä tiedostossa). Nimialkuhuomioiden määrä on sama kuin ennen passia.

## Dublin

### Christ Church -katedraali — kenttä `lyhyt`
- **Vanha:** "Dublinin vanhin katedraali, Christ Church, oli 1800-luvulla rapistumassa, kunnes viskintislaaja Henry Roe maksoi sen kunnostuksen yksin. Työt kestivät vuodesta 1871 vuoteen 1878. Entisessä synodisalissa toimii nykyään keskiajan Dublinista kertova museo Dublinia."
- **Uusi:** "Dublinin vanhimmasta katedraalista, Christ Churchista, varastettiin maaliskuussa 2012 kaupungin suojeluspyhimyksen Laurence O'Toolen sydän, jota säilytettiin rautakalterein suljetussa rasiassa. Poliisi löysi sen kuusi vuotta myöhemmin Phoenix Parkista, ja marraskuussa 2018 sydän pantiin jälleen esille katedraalissa."
- **Syy:** 1 (päällekkäisyys) ja 2 (hallintoa). Pyhän Patrickin katedraalin lyhyt kertoo saman tarinan (rapistunut katedraali, jonka rikas panimo-/tislaamosuvun mies kunnosti omilla rahoillaan); lisäksi "työt kestivät vuodesta X vuoteen Y" on hallintotietoa. Patrickin versio jätettiin, Christ Churchiin vaihdettiin sydänvarkauden tarina. Henry Roen lähde poistettu.
- **Lähde:** https://en.wikipedia.org/wiki/Christ_Church_Cathedral,_Dublin ; https://www.irishpost.com/news/heart-dublins-patron-saint-laurence-otoole-back-display-2012-theft-161893

### Guinness Storehouse — kenttä `lyhyt`
- **Vanha:** "Panimomuseo Guinness Storehouse avattiin vuonna 2000, ja siitä on tullut Irlannin suosituin maksullinen nähtävyys. Arthur Guinness vuokrasi käyttämättömän panimon vuonna 1759 neljänkymmenenviiden punnan vuosivuokralla, mutta yhtiö osti tontin myöhemmin omakseen, joten sopimus raukesi."
- **Uusi:** "Panimomuseo Guinness Storehousen panimo oli vähällä jäädä ilman vettä huhtikuussa 1775, kun kaupunki huomasi Arthur Guinnessin muuttaneen putkiaan ja päätti katkaista vesijohdon. Guinness kohtasi kaupungin miehet hakku kädessä ja uhkasi kaivaa oman kanavan. Kiista ratkesi vuonna 1785: Guinness alkoi maksaa vedestä vuokraa."
- **Syy:** 1 ja 2. Vanha lyhyt kertoi samasta vuokrasopimuksesta kuin saman kohteen teksti (isoisän merkintä), ja avausvuosi + "suosituin maksullinen nähtävyys" on kävijätilastoa. Uusi: vesikiista ja hakku. Vivahde säilytetty: kaupunki puuttui asiaan, koska Guinness oli muuttanut putkiaan saadakseen lisää vettä.
- **Lähde:** https://en.wikipedia.org/wiki/Arthur_Guinness

### Kilmainhamin vankila — kenttä `lyhyt`
- **Vanha:** "Kilmainhamin vankila on näytellyt elokuvissa englantilaista vankilaa, muun muassa elokuvissa Isän nimeen ja The Italian Job. Vapaaehtoiset aloittivat rapistuneen vankilan kunnostuksen vuonna 1960, ja työ päättyi vuonna 1971, kun kappelin alttari oli rakennettu uudelleen."
- **Uusi:** "Kilmainhamin vankila on esittänyt elokuvissa englantilaista vankilaa, esimerkiksi elokuvassa Isän nimeen. Sisällissodan jälkeen vuonna 1923 Éamon de Valera oli koko länsisiiven ainoa vanki, ja hän pelasi tiettävästi käsipalloa vankilanjohtajan kanssa. Muurin yli lentäneet pallot päätyivät naapureille, jotka lahjoittivat ne myöhemmin museolle."
- **Syy:** 1 ja 2. Tekstin viimeinen virke kertoo jo, että vapaaehtoiset kunnostivat vankilan museoksi; lyhyt toisti saman vuosilukuineen (hallintotietoa). Huom: harkitsin "de Valera oli vankilan viimeinen vanki" -väitettä (yleinen matkailusivuilla), mutta museon satavuotisartikkelin mukaan viimeinen vanki oli Ernie O'Malley, joten väitettä EI käytetty. "Tiettävästi", koska lähde sanoo "it seems".
- **Lähde:** https://www.irishlegal.com/articles/kilmainham-gaol-museum-marks-centenary-of-last-prisoners

### Spire — kenttä `lyhyt` (3. virke)
- **Vanha:** "Suunnitelma valittiin vuonna 1998 järjestetyssä kilpailussa, jonka voitti brittiarkkitehti Ian Ritchien ehdotus."
- **Uusi:** "Neulan piti valmistua vuosituhannen vaihteen juhliin, mutta yhden vastustajan valitus vei suunnitelman oikeuteen, eikä neula ehtinyt ajoissa."
- **Syy:** 2 (suunnittelukilpailu ja arkkitehti on perustietoa, ei tarinaa). Suunnittelijasta on yhä Kysy-kysymys.
- **Lähde:** https://en.wikipedia.org/wiki/Spire_of_Dublin

### Phoenix Park — kenttä `teksti`
- **Vanha:** "Puiston nimi ei viittaa feenikslintuun vaan iirin sanoihin fionn uisce, kirkas vesi."
- **Uusi:** "Puiston nimen on usein väitetty tulevan iirin sanoista fionn uisce, kirkas vesi, mutta todellisuudessa se periytyy 1600-luvun alussa rakennetusta Phoenix-nimisestä kartanosta."
- **Syy:** 3 (faktan vivahde, käänteinen): Wikipedian mukaan fionn uisce -selitys on 1800-luvun kansanetymologia ja nimi tulee Sir Edward Fisherin vuonna 1611 rakennuttamasta House of the Phoenix -kartanosta; logainm.ie: Fionnuisce-paikannimestä ei ole todisteita. Peurojen määrä (noin 600) tarkistettu puiston omalta sivulta (Wikipedia sanoo 400–450; jätetty virallisen lähteen mukaan).
- **Lähde:** https://en.wikipedia.org/wiki/Phoenix_Park ; https://www.logainm.ie/en/themes/125 ; https://phoenixpark.ie/?p=362

### St Stephen's Green — kenttä `teksti` (ja `puhe_teksti`)
- **Vanha:** "…kapinalliset kaivoivat puistoon juoksuhautoja kreivitär Markieviczin valvonnassa. Kerrotaan, että kumpikin osapuoli suostui kahdesti päivässä tulitaukoon, jotta lampien sorsat ja joutsenet saatiin ruokittua."
- **Uusi:** "…kapinalliset kaivoivat puistoon juoksuhautoja komentaja Michael Mallinin ja kreivitär Markieviczin johdolla. Kerrotaan, että ammunta keskeytettiin välillä, jotta puiston puutarhuri pääsi ruokkimaan lampien sorsat."
- **Syy:** 3. Komentaja oli Michael Mallin, Markievicz hänen alaisensa; "kahdesti päivässä" ja "kumpikin osapuoli suostui" löytyvät vain yhdestä blogista, Wikipedia kertoo vain ammunnan tilapäisestä keskeytyksestä puutarhurin vuoksi. Säilytetty "Kerrotaan" (perimätietoa).
- **Lähde:** https://en.wikipedia.org/wiki/St_Stephen%27s_Green

### St Stephen's Green — kenttä `kysymykset`
- **Vanha:** "Mitä Grafton Streetillä on nykyään?"
- **Uusi:** "Miksi puistossa on sokeiden puutarha?"
- **Syy:** 7 (kysymys koski eri paikkaa, ja vastaus vanhenee).
- **Lähde:** https://en.wikipedia.org/wiki/St_Stephen%27s_Green

### Trinity College — kenttä `teksti`
- **Vanha:** "Samassa rakennuksessa säilytetään Kellsin kirjaa, keskiaikaista koristeltua evankeliumikirjaa, joka tuli yliopistolle vuonna 1661."
- **Uusi:** "Yliopiston suurin aarre on Kellsin kirja, keskiaikainen koristeltu evankeliumikirja, joka tuli sen kokoelmiin vuonna 1661."
- **Syy:** 5 (nykyaika): vanha kirjasto suljetaan remonttiin vuoden 2027 lopussa ja Kellsin kirja siirtyy Printing House -rakennukseen; äänitetty "samassa rakennuksessa" vanhenisi.
- **Lähde:** https://www.tcd.ie/old-library-campaign/faq

### Trinity College — kenttä `kysymykset`
- **Vanha:** "Miksi vanhaa kirjastoa kunnostetaan nyt?"
- **Uusi:** "Miksi katolinen kirkko kielsi opiskelun täällä?"
- **Syy:** 7 (vanhenee remontin myötä). Katolisen kirkon kielto (vuoteen 1970) on tosi oletus.
- **Lähde:** —

### Muuta tarkistettua (ei muutosta)
- Pilven epävarmuudet ratkaistu: sorsien tulitauko → korjattu yllä; kellotornin taikausko jää "uskotaan"-muotoon (opiskelijaperinne, ei faktaväite); linna "yli seitsemänsataa vuotta" (1204–1922) pitää.
- Avaus: 39 sanaa, alkaa "Tervetuloa", ilmakuva (kattojen ja puistojen tilkkutäkki, Liffey) kunnossa.
- Lyhyet luettu peräkkäin: muita päällekkäisyyksiä ei jäänyt (Patrickin Guinness-kunnostus ja Storehousen vesikiista ovat eri aiheita).
- Tarkistin: 0 virhettä, 17 huomiota (sama määrä kuin ennen).

## Edinburgh

### Calton Hill — kenttä `lyhyt` (2. virke)
- **Vanha:** "Ajan mittaan pylväsrivistä tuli yksi kaupungin rakastetuimmista maamerkeistä, ja kukkulalta näkyy koko vanhakaupunki linnasta palatsiin."
- **Uusi:** "Suurimpia kiviä vedettiin rinnettä ylös kahdentoista hevosen ja seitsemänkymmenen miehen voimin, ja arkkitehti William Playfair kutsui monumenttia skottien ylpeydeksi ja köyhyydeksi."
- **Syy:** 1 (päällekkäisyys): kierroksen ensimmäinen kohde Arthur's Seat kertoo lyhyessään saman näkymän ("koko vanhaankaupunkiin, linnasta Kuninkaallista mailia pitkin palatsille asti"). Arthur's Seatin versio jätettiin, Calton Hilliin vaihdettiin rakennustarina ja Playfairin ironinen lausahdus ("pride and poverty of us Scots").
- **Lähde:** https://historic-uk.com/HistoryUK/HistoryofScotland/National-Monument-of-Scotland

### St Gilesin katedraali — kenttä `lyhyt` (2. virke)
- **Vanha:** "Sen tarkoin veistettyjen puisten penkkien ja vaakunoiden sekaan on kätketty pieni enkeli, joka soittaa säkkipilliä."
- **Uusi:** "Sen tarkoin veistettyjen penkkien, vaakunoiden ja koristeiden sekaan on kätketty säkkipilliä soittavia enkeleitä."
- **Syy:** 3 (vivahde): katedraalin oma sivu puhuu monikossa "angels playing bagpipes"; Atlas Obscuran mukaan enkeleitä on kolme, kaksi puusta ja yksi kivestä — "pieni puinen enkeli" yksikössä ei pidä. Lukumäärää ei mainita, koska vain yksi lähde antaa sen.
- **Lähde:** https://www.stgilescathedral.org.uk/the-thistle-chapel ; https://assets.atlasobscura.com/places/st-giles-cathedral-thistle-chapel

### Kuninkaallinen kasvitieteellinen puutarha (Royal Botanic Garden Edinburgh) — kenttä `kysymykset`
- **Vanha:** "Miksi vanhat palmuhuoneet suljettiin kunnostukseen?"
- **Uusi:** "Mitä vanhoissa palmuhuoneissa kasvaa?"
- **Syy:** 5 ja 7 (nykyaika): palmuhuoneet avattiin uudelleen yleisölle perjantaina 2.10.2026 viiden vuoden Edinburgh Biomes -kunnostuksen jälkeen; kunnostusta koskeva kysymys olisi jo nyt vanhentunut. Teksti ("Britannian korkein perinteinen palmuhuone", 1858) on oikein eikä väitä mitään sulkemisesta — ei muutosta. Lähteen "ovat olleet suljettuina" -maininta päivitetty.
- **Lähde:** https://www.rbge.org.uk/news/articles/historic-palm-houses-to-reopen-after-5-year-restoration/ ; https://www.rbge.org.uk/collections/living-collection/living-collection-at-the-royal-botanic-garden-edinburgh/glasshouses-history/

### Kuninkaallinen kasvitieteellinen puutarha — `lahteet` (ei tekstimuutosta)
- Pilven epävarmuus "puiden 12 m (jaloista muunnettu)" ratkaistu: RBGE:n arkiston mukaan McNab siirsi puita, "some over 40 feet high" (yli 12 m), joten "jopa kahdentoista metrin" on varovainen ja oikea. 12 hevosta ja kulkue vahvistettu RCPE:n sivulta. Scotsman-lähde ei auennut (403), siksi lisätty avatut lähteet.
- **Lähde:** https://atom-2.rbge.org.uk/index.php/mcnab-william ; https://www.rcpe.ac.uk/heritage/botanics

### Muuta tarkistettua (ei muutosta)
- Lyhyet luettu peräkkäin (Arthur's Seat → Holyrood → Calton Hill → Royal Mile → St Giles → Greyfriars → linna → Scott): muuta toistoa ei jäänyt. Huom. Päätoimittajalle: linnan `teksti` (kello yhden tykki laivoille) ja Calton Hillin `teksti` (aikapallo laivoille kello yksi) kertovat rinnakkaisen asian; ne ovat Kerro lisää -tekstejä eivätkä lyhyitä, ja laitteet todella toimivat yhdessä, joten jätin ne. Calton Hillin uusi lyhyt ja kasvitieteellisen puutarhan teksti mainitsevat kumpikin "kahdentoista hevosen" — eri asioita, eri kerrostasoilla, jätetty.
- Nykytila: Tattoo-katsomo on yhä joka kesä pystytettävä väliaikainen (2026); Scottin muistomerkki auki (180-vuotisjuhla 2026); Nelsonin muistomerkin aikapallo kunnostettiin ja nostettiin takaisin 28.5.2025 ja putoaa kello yksi (tarkkaa 2026-tilaa en saanut virallisesta lähteestä, mutta ei viitteitä pysähtymisestä); Dolly yhä esillä kansallismuseossa; Kellsin kirjan kaltaisia siirtoja ei Edinburghissa.
- Faktat avattu: Jenny Geddes "tarinan mukaan" vastaa Wikipediaa ("Tradition attests"); "maailman presbyteeristen kirkkojen äitikirkko" vahvistettu.
- Avaus: 37 sanaa, alkaa "Tervetuloa", ilmakuva (linna kalliolla, vanhakaupunki harjanteella) kunnossa.
- Tarkistin: 0 virhettä, 14 huomiota (sama määrä kuin ennen).

## Firenze

### Firenzen tuomiokirkko — kenttä `lyhyt`
- **Vanha:** "Firenzen tuomiokirkon värikäs marmorijulkisivu näyttää keskiaikaiselta, mutta se valmistui vasta vuonna 1887 arkkitehti Emilio De Fabrisin suunnitelmasta. Hän sovitti vihreän, valkoisen ja vaaleanpunaisen marmorin kirkon kylkien ja Giotton kellotornin kuvioihin, jotta kokonaisuus näyttäisi yhtenäiseltä."
- **Uusi:** "Firenzen tuomiokirkon keskeneräinen keskiaikainen julkisivu purettiin vuonna 1587, ja uutta odotettiin lähes kolmesataa vuotta. Sillä välin paljasta seinää koristeltiin ruhtinashäihin maalauksin, ja viimeinen niistä, vuodelta 1688, näkyy haalistuneena vielä 1800-luvun valokuvissa. Nykyinen marmorijulkisivu valmistui vasta vuonna 1887."
- **Syy:** 2 (kierrosversio oli juuri kielletty kaava "valmistui vuonna X arkkitehti Y:n suunnitelmasta" ja materiaalikuvausta). Uusi kertoo saman yllätyksen (julkisivu on 1800-luvulta) tarinana: kolmesataa vuotta paljasta seinää ja maalatut hääjulkisivut. Lähteet päivitetty.
- **Lähde:** https://en.wikipedia.org/wiki/Florence_Cathedral ; https://it.wikipedia.org/wiki/Facciata_di_Santa_Maria_del_Fiore

### Uffizin galleria — kenttä `lyhyt`
- **Vanha:** "Uffizin galleriasta jatkuu Vasarin käytävä, joka ylittää Arnon Vanhan sillan kauppojen katolla ja päättyy Pittin palatsiin. Käytävä oli kahdeksan vuotta suljettuna korjausten takia, ja joulukuussa 2024 se avattiin taas yleisölle."
- **Uusi:** "Uffizin gallerian kuuluisimpia saleja on Tribuna, kahdeksankulmainen aarrekammio, jonka Francesco ensimmäinen rakennutti 1580-luvun alussa. Sali kuvaa neljää alkuainetta: lattian kirjava marmori on maata, seinien punainen sametti tulta, tuulille avoin lyhty ilmaa ja kupolin lähes kuusituhatta Intian valtameren helmiäissimpukkaa vettä."
- **Syy:** 1 + 2. Päällekkäisyys kierroksella: Pittin palatsin `lyhyt` kertoo samasta Vasarin käytävästä (Vanhasta palatsista Pittiin joen yli). Lisäksi sulkemis- ja avaamistieto oli hallintoa. Korvattu Tribunan neljän alkuaineen tarinalla. Tarkistin, ettei synny uutta päällekkäisyyttä: Buontalentin nimi jätettiin pois, koska Bobolin `lyhyt` kertoo hänen tekoluolastaan. Vanhat käytävälähteet poistettu, Tribunan lähde lisätty.
- **Lähde:** https://uffizi.it/en/artworks/the-tribune (5780 helmiäissimpukkaa, alkuaineet, jalokivien säilytys) ; https://en.wikipedia.org/wiki/Tribuna_of_the_Uffizi (kahdeksankulmainen, Francesco I)

### Uffizin galleria — kenttä `lahteet` (ei tekstimuutosta)
- Botticellin salien lähde abcnews.com palauttaa 404:n. Vaihdettu: https://wtop.com/news/2026/06/uffizi-gallery-unveils-new-arrangement-for-botticellis-birth-of-venus-and-primavera/ (AP 16.6.2026: Venus ja Kevät viereisissä tiloissa vastakkaisilla seinillä). Teksti "vierekkäisissä saleissa" pitää paikkansa. Kullan lähdeväite tarkennettu (Wikipedia: kultaa pigmenttinä hiuksissa).

### Ponte Vecchio — kenttä `teksti`
- **Vanha:** "…mutta vuonna 1593 suurherttua Ferdinando ensimmäinen määräsi…"
- **Uusi:** "…mutta 1500-luvun lopulla suurherttua Ferdinando ensimmäinen määräsi…"
- **Syy:** 3. Vuosiluvusta lähteet ovat ristiriidassa: italiankielisen Wikipedian mukaan dekreetti annettiin 27.9.1594, monen matkalähteen mukaan 1593, ja englanninkielinen Wikipedia mainitsee jopa vuoden 1565 dekreetin. Ferdinando ensimmäinen ja hajuperuste (kauppa käytävän ikkunoiden alla) vahvistuvat. Siksi vuosisadan loppu. Lähde vaihdettu.
- **Lähde:** https://it.wikipedia.org/wiki/Ponte_Vecchio ; https://aviewoncities.com/florence/ponte-vecchio

### Piazza della Signoria — kenttä `lyhyt`
- **Vanha:** "…Neptunuksen suihkulähde, Firenzen ensimmäinen julkinen suihkulähde, jota firenzeläiset alkoivat kutsua valkoiseksi jättiläiseksi. Sen piti valmistua jo vuonna 1565 Medicien prinssin Francescon häihin, mutta se paljastettiin vasta vuonna 1574."
- **Uusi:** "…Neptunuksen suihkulähde, Firenzen ensimmäinen suuri julkinen suihkulähde, jonka marmorista merenjumalaa firenzeläiset pilkkasivat isoksi valkoiseksi. Lähde piti saada valmiiksi jo vuonna 1565 Medicien prinssin Francescon häihin, mutta kokonaan se valmistui vasta lähes kymmenen vuotta myöhemmin."
- **Syy:** 3. (a) Lähteen mukaan "prima grande fonte pubblica" eli ensimmäinen SUURI julkinen suihkulähde. (b) Biancone tarkoittaa "isoa valkoista", ja se on pilkkanimi, joka syntyi kansan arvostelusta. "Valkoinen jättiläinen" oli väärä vivahde. (c) "Paljastettiin vasta 1574" ei pidä: italiankielisen Wikipedian mukaan Neptunuksen patsas paljastettiin jo häissä 1565 ja koko suihkulähde valmistui 1575, englanninkielisen mukaan 1574. Siksi "kokonaan se valmistui vasta lähes kymmenen vuotta myöhemmin".
- **Lähde:** https://it.wikipedia.org/wiki/Fontana_del_Nettuno_(Firenze) ; https://en.wikipedia.org/wiki/Fountain_of_Neptune,_Florence

### Piazza della Signoria — kenttä `teksti`
- **Vanha:** "…jossa munkki Girolamo Savonarola poltettiin vuonna 1498."
- **Uusi:** "…jossa munkki Girolamo Savonarola hirtettiin ja poltettiin vuonna 1498."
- **Syy:** 3. Savonarola hirtettiin ennen polttamista. Lahteet-kentän väite sanoi tämän jo oikein.
- **Lähde:** https://www.througheternity.com/travel-guide/savonarola-in-florence-visions-of-the-apocalypse (olemassa oleva lähde)

### Santa Crocen basilika — kenttä `lyhyt`
- **Vanha:** "…kirkon museosaleissa vesi nousi lähes kuuden metrin korkeuteen."
- **Uusi:** "…kirkon museosaleissa vesi nousi yli viiden metrin korkeuteen."
- **Syy:** 3. Santa Crocen Operan oman museosivun mukaan vesi nousi entisessä ruokasalissa (museossa) 5,2 metriin. Cimabuen krusifiksin "yli puolet" vastaa lähteen 60 prosenttia, ja sakaristoon siirto 2013 vahvistui.
- **Lähde:** https://www.santacroceopera.it/en/places/museum/ ; https://www.santacroceopera.it/en/catalogue-of-works/cimabue-crucifix/

### Santa Maria Novellan basilika — kenttä `teksti`
- **Vanha:** "…Masaccion Pyhä kolminaisuus, ensimmäinen monumentaalinen renessanssimaalaus, jossa käytettiin keskeisperspektiiviä."
- **Uusi:** "…Masaccion Pyhä kolminaisuus, yksi ensimmäisistä monumentaalisista renessanssimaalauksista, joissa käytettiin keskeisperspektiiviä."
- **Syy:** 3. Superlatiivi oli liian jyrkkä: lähteen mukaan "one of the first". Maailman vanhin apteekki vahvistui ("recognised as the oldest pharmacy in the world").
- **Lähde:** https://en.wikipedia.org/wiki/Holy_Trinity_(Masaccio) ; https://en.wikipedia.org/wiki/Officina_Profumo-Farmaceutica_di_Santa_Maria_Novella

### San Miniato al Monte — kenttä `lahteet` (ei tekstimuutosta)
- Edellisen session epävarmuus ratkaistu: gregoriaaninen laulu on vahvistettu myös iltarukouksessa (vesprat), ja vierailijat voivat osallistua. Lähde italyplanner.ai (tekoälymatkaopas) vaihdettu: https://www.firenzemadeintuscany.com/en/article/san-miniato-al-monte-il-millenario/ . Legenda ja vihkiminen 1018 vahvistettu Wikipediasta.

### Palazzo Pitti — kenttä `lahteet` (ei tekstimuutosta)
- "Rakennettiin viidessä kuukaudessa" -väitteen lähde (aviewoncities) ei vahvista viittä kuukautta. Vaihdettu https://en.wikipedia.org/wiki/Vasari_Corridor (vahvistaa viisi kuukautta 1565). Huom: Wikipedia antaa käytävän pituudeksi nyt "noin kilometrin". Teksti "yli seitsemänsataa metriä" on tosi kummallakin luvulla, joten se jätettiin ennalleen.

### Tarkistettu, ei muutosta (Firenze)
- Kierroksen kahdeksan `lyhyt`-versiota luettu peräkkäin: Uffizin käytävätoiston poiston jälkeen ei päällekkäisyyksiä (Palazzo Vecchio: suuren salin taistelukuvat, Signoria: Neptunus, Uffizi: Tribuna, Ponte Vecchio: Cellini, Pitti: käytävä, Boboli: Suuri luola, Santa Croce: tulva, tuomiokirkko: julkisivu).
- Nykytila: La Loggia -ravintola Piazzale Michelangelolla toimii (The Florentine 23.6.2026). Vasarin käytävä on auki joulukuusta 2024. Botticellin uusi ripustus kesäkuusta 2026 on tekstissä oikein.
- Avaus: 36 sanaa, ilmakuva (kattojen meri, kupoli, Arno), alkaa "Tervetuloa". Ei muutosta.
- Kysymykset: kaikki kohdekohtaisia ja vanhenemattomia. Ei muutoksia.
- Edellisen session muut epävarmuudet: Bobolin hankinta 1549 on passiivissa ja kestää. koko_m-arvot (Ponte Vecchio 100, kastekappeli 40) eivät ole selvästi vääriä, joten ne jätettiin.

## Granada

### Alhambra — kenttä `lyhyt`
- **Vanha:** "Palatsilinnoitus Alhambra kuuluu Espanjan vierailluimpiin monumentteihin, ja vuonna 2024 siellä kävi yli kaksi ja puoli miljoonaa ihmistä. Kansainvälisen maineen sille toi amerikkalainen kirjailija Washington Irving, joka asui palatsissa vuonna 1829 ja kirjoitti siitä tarinakokoelman."
- **Uusi:** "Palatsilinnoitus Alhambrassa asui vuonna 1829 kolmisen kuukautta amerikkalainen kirjailija Washington Irving, joka sai tutkia myös palatsin arkistoja. Oleskelu päättyi, kun hänet nimitettiin lähetystösihteeriksi Lontooseen. Hänen tarinakokoelmansa toi Alhambran uudelleen länsimaisen yleisön tietoon, ja huoneissa, joissa hän kirjoitti, on nykyään muistolaatta."
- **Syy:** 2 + 5. Kävijämäärä on hallinnollista tietoa ja vanhenee vuosittain. Irvingin osuus laajennettiin tarinaksi (arkistot, lähtö Lontooseen, muistolaatta). El Debaten kävijämäärälähde poistettu.
- **Lähde:** https://en.wikipedia.org/wiki/Tales_of_the_Alhambra

### Alhambra — kenttä `kysymykset`
- **Vanha:** "Montako kävijää palatsiin päästetään päivässä?"
- **Uusi:** "Miksi Washington Irving asui palatsissa?"
- **Syy:** 7. Päiväkiintiö muuttuu, joten vastaus vanhenee.

### Leijonain piha — kenttä `kysymykset`
- **Vanha:** "Kuinka moni kävijä näkee pihan päivittäin?"
- **Uusi:** "Mitä leijonille tehtiin kunnostuksessa?"
- **Syy:** 7. Kävijämäärä vanhenee. Uusi kysymys liittyy tekstin kunnostustarinaan (2002–2012).

### Kaarle V:n palatsi — kenttä `lyhyt`
- **Vanha:** "Kaarle viidennen palatsissa toimii nykyään kaksi museota, alakerrassa Alhambran museo ja yläkerrassa Granadan taidemuseo. Pyöreällä pihalla soittavat kesäisin suuret sinfoniaorkesterit Granadan kansainvälisellä musiikki- ja tanssijuhlalla. Pyöreän pihan toteutti Pedro Machucan poika Luis, joka jatkoi työtä isänsä jälkeen."
- **Uusi:** "Kaarle viidennen palatsi rahoitettiin Granadan moriskeilta eli kastetuilta muslimeilta perityllä verolla, jota vastaan he saivat pitää omat tapansa. Kun moriskit nousivat kapinaan vuonna 1568 ja heidät karkotettiin, rahat loppuivat juuri ennen kuin kattopalkit ehdittiin nostaa, ja palatsi seisoi ilman kattoa 1900-luvulle asti."
- **Syy:** 2. Kierrosversio oli perustietoa ja hallintoa (museot, festivaali). Festivaali toistui myös Generalifen tekstissä. Uusi versio kertoo ristiriidan: keisarin voittopalatsi rakennettiin voitettujen verorahoilla, ja heidän kapinansa jätti sen kattamatta.
- **Lähde:** https://andalucia.com/cities/granada/palace-carlos-quinto.htm (moriskivero, rahoitus loppui karkotukseen ennen kattopalkkeja, kattamaton 1900-luvulle) ; https://en.wikipedia.org/wiki/Palace_of_Charles_V (1568 kapina pysäytti työt, katto 1967)

### Kaarle V:n palatsi — kenttä `teksti`
- **Vanha:** "…kun hän vietti kuherruskuukauttaan Alhambrassa Portugalin Isabellan kanssa ja nasridipalatsi tuntui ahtaalta ja kylmältä. … Rakennus jäi kuitenkin keskeneräiseksi vuosisadoiksi ja valmistui vasta 1900-luvulla."
- **Uusi:** "…kun hän vietti kuherruskuukauttaan Alhambrassa Portugalin Isabellan kanssa ja halusi linnoitukseen uuden kuninkaallisen asunnon. … Pyöreän pihan toteutti hänen poikansa Luis, joka jatkoi työtä isänsä jälkeen."
- **Syy:** 3 + 1. (a) "Ahtaalta ja kylmältä" ei vahvistunut. Patronaton oma sivu, joka oli väitteen lähde, sanoo vain, että keisari halusi linnoitukseen uuden kuninkaallisen asunnon (ja palatsi symboloi kristinuskon voittoa). Edellisen session epävarmuus on näin ratkaistu. Kuherruskuukausi Alhambrassa 1526 vahvistui. (b) Viimeinen virke (keskeneräinen 1900-luvulle) olisi toistanut uuden kierrosversion asian, joten se korvattiin vanhan kierrosversion varmistetulla Luis Machuca -tiedolla. Museoiden ja festivaalin lähteet poistettu, ja uudet lähteet lisätty.
- **Lähde:** https://www.alhambra-patronato.es/en/edificios-lugares/palace-of-charles-v ; https://en.wikipedia.org/wiki/Isabella_of_Portugal ; https://en.wikipedia.org/wiki/Palace_of_Charles_V (Luis Machuca, olemassa oleva lähde)

### Albayzín — kenttä `lyhyt`
- **Vanha:** "…muurein suojatun linnoituksen. Osa muureista ja porteista on yhä pystyssä. Unesco liitti kaupunginosan Alhambran maailmanperintökohteeseen vuonna 1994."
- **Uusi:** "…muurein suojatun linnoituksen. Kukkulan juurella Darron rannalla on yhä keskiaikainen arabialainen kylpylä, jonka tähdenmuotoisista kattoaukoista valo pääsi sisään ja höyry ulos."
- **Syy:** 2. Unescon vuosi on hallintotietoa. Tilalle tuli konkreettinen, nähtävä yksityiskohta (El Bañuelo). Ajoitusta ei väitetty samaksi kuin zirideillä, koska kylpylä on perinteisesti ajoitettu 1000-luvulle mutta mahdollisesti myöhempi. Unesco-lähde poistettu.
- **Lähde:** https://en.wikipedia.org/wiki/El_Ba%C3%B1uelo

### Granadan katedraali — kenttä `lyhyt`
- **Vanha:** "Granadan katedraalia rakennettiin satakahdeksankymmentäyksi vuotta, sillä peruskivi laskettiin vuonna 1523 ja työt saatiin päätökseen vasta jouluaattona 1704. Diego de Siloén suunnittelemassa kirkossa on viisi laivaa, ja sen pohjapiirroksen esikuvana olivat varhaiskristilliset hautakirkot."
- **Uusi:** "Granadan katedraalin pyöreä pääkappeli suunniteltiin alun perin Habsburg-suvun kuninkaiden hautakirkoksi, ja sen kupoli kohoaa kahdenkymmenenkahden metrin levyisen rotundan yllä. Suunnitelma raukesi, kun Filip toinen päätti siirtää kuninkaalliset hautaukset rakennuttamaansa El Escorialin luostariin Madridin lähelle."
- **Syy:** 2. Vuosiluvut, laivojen määrä ja pohjapiirroksen esikuva olivat teknistä perustietoa. Uusi versio kertoo hylätyn suunnitelman tarinan. Kysymys "Miksi rakentaminen kesti lähes kaksisataa vuotta?" on yhä tosi (1523–1704), ja vanha lähde säilyy.
- **Lähde:** https://es.wikipedia.org/wiki/Catedral_de_Granada ("Concebida inicialmente como panteón para los Austrias… Felipe II decidió trasladar los enterramientos reales al Monasterio de El Escorial"; halkaisija 22 m)

### Tarkistettu, ei muutosta (Granada)
- Kierroksen kahdeksan `lyhyt`-versiota luettu peräkkäin korjausten jälkeen: Alhambra (Irving), Generalife (vesiportaat), Leijonain piha (kupolin purku 1934), Kaarle V (moriskivero), Sacromonte (lyijykirjat), Albayzín (zirit ja kylpylä), katedraali (hylätty hautakirkko), Kuninkaallinen kappeli (Isabellan kruunu ja Ferdinandin miekka). Ei päällekkäisyyksiä. Kappelin kierrosversio on esineluettelo, mutta konkreettiset kuninkaalliset esineet jäävät mieleen, ja sisältö vahvistui (Wikipedia: Botticelli ja flaamilaiset, capillarealgranada.com: kruunu, valtikka, rasia, peili, miekka). Jätettiin ennalleen.
- Sacromonte: lyijykirjojen 1682-tuomio ja palautus Granadaan 2000 vahvistuivat (Wikipedia: Vatikaani piti niitä jo 1682 "harhaoppisina väärennöksinä", joten teksti on oikein).
- Avaus: 38 sanaa, ilmakuva (tasanko, Sierra Nevada, kaksi kukkulaa), alkaa "Tervetuloa". Ei muutosta.
- Epävarmuus Päätoimittajalle: Clintonin auringonlasku (Albayzínin `teksti`) on yhä "Kerrotaan"-muodossa. Virallista lähdettä ei löytynyt, mutta legendaksi merkittynä se on hyväksyttävä. Jätettiin.

## Helsinki

### Helsingin tuomiokirkko — kenttä `lyhyt`
- **Vanha:** "Helsingin tuomiokirkko on kuusikymmentäkaksi metriä korkea, ja vihreine kupoleineen se on maamerkki kaikille, jotka saapuvat kaupunkiin mereltä. Alun perin se oli Nikolainkirkko, itsenäistymisen jälkeen Suurkirkko, ja tuomiokirkoksi se nimettiin vasta vuonna 1959."
- **Uusi:** "Helsingin tuomiokirkon neljä pientä kulmatornia lisäsi Engelin apulainen Ernst Lohrmann, koska kirkon rakennetta pelättiin liian heikoksi ja päätorni tarvitsi tukea. Raskaita kelloja ei uskallettu nostaa kupoliin, joten Lohrmann piirsi portaiden reunoille erillisen kellotapulin ja sen pariksi kappelin."
- **Syy:** Tyyppi 2: korkeus ja nimenmuutokset olivat perustietoa ja hallintoa (nimeäminen tuomiokirkoksi hiippakunnan synnyttyä). Lisäksi tyyppi 1: "maamerkki mereltä" sivusi saman kohteen tekstin isoisäkohtaa (apostolit katsovat merelle). Uusi tarina selittää, miksi tekstin mainitsemat neljä pientä kupolia ovat olemassa, toistamatta tekstiä. Vanhojen lyhyen lähteiden (maamerkki, nimihistoria) rivit poistettu lahteista, 62 metriä jäi korkeus_m:n lähteeksi.
- **Lähde:** https://fi.wikipedia.org/wiki/Helsingin_tuomiokirkko ; https://en.wikipedia.org/wiki/Helsinki_Cathedral

### Suomenlinna — kenttä `lyhyt`
- **Vanha:** "Suomenlinnaan pääsee Kauppatorilta ympäri vuoden kulkevalla lautalla tavallisella joukkoliikennelipulla. Saarten kirkko rakennettiin alun perin ortodoksiseksi varuskuntakirkoksi, ja sen tornissa on majakka, jonka valo välähtää neljä kertaa peräkkäin: se on morseaakkosten H niin kuin Helsinki."
- **Uusi:** "Suomenlinnan kirkko rakennettiin vuonna 1854 linnoituksen venäläisen varuskunnan ortodoksiseksi kirkoksi. Itsenäistymisen jälkeen siitä tehtiin luterilainen kirkko, ja sipulikupolit ja sivutornit poistettiin. Vuodesta 1929 tornissa on ollut majakka, jonka valo välähtää neljästi: se on morseaakkosten H niin kuin Helsinki."
- **Syy:** Tyyppi 1 ja 2: lauttavirke oli käytännön liikennetietoa (lippu, aikataulu), ja sama ympäri vuoden kulkeva lautta kerrotaan jo Kauppatorin tekstissä. Tilalle kirkon muodonmuutos ortodoksisesta luterilaiseksi; majakkayksityiskohta säilyi. Nykytila tarkistettu: tuomiokirkkoseurakunta on luopumassa kirkon säännöllisestä käytöstä 2026, mutta rakennus ja majakka säilyvät, eikä teksti väitä kirkon toiminnasta mitään.
- **Lähde:** https://fi.wikipedia.org/wiki/Suomenlinnan_kirkko

### Uspenskin katedraali — kenttä `lyhyt`
- **Vanha:** "Uspenskin katedraalin suunnitteli venäläinen arkkitehti Aleksei Gornostajev, joka kuoli vuonna 1862 eikä nähnyt kirkkoa valmiina. Sisällä katse kiinnittyy runsaaseen ikonostaasiin, jonka maalasi Pavel Šiltsov ja jossa evankelistat reunustavat ehtoollista ja taivaaseenastumista esittäviä kuvia."
- **Uusi:** "Uspenskin katedraalin alakerran kryptakappeli on pyhitetty pappismarttyyri Aleksandr Hotovitskille. Hän perusti ortodoksisia seurakuntia Pohjois-Amerikassa ja toimi ensimmäisen maailmansodan vuosina Helsingin ortodoksisen seurakunnan kirkkoherrana, mutta Stalinin vainoissa hänet teloitettiin vuonna 1937. Venäjän ortodoksinen kirkko julisti hänet pyhäksi vuonna 1994."
- **Syy:** Tyyppi 2: arkkitehti ja ikonostaasin kuvaus olivat perustietoa. Tyyppi 1: "arkkitehti kuoli eikä nähnyt kirkkoa valmiina" toisti saman rakenteen kuin tuomiokirkon teksti (valmistui kaksitoista vuotta Engelin kuoleman jälkeen). Uusi tarina kertoo ihmisestä. Teloitus mainitaan vain sanana, ei kuvata.
- **Lähde:** https://fi.wikipedia.org/wiki/Uspenskin_katedraali ; https://fi.wikipedia.org/wiki/Aleksandr_Hotovitski ; https://en.wikipedia.org/wiki/Alexander_Hotovitzky

### Temppeliaukion kirkko — kenttä `teksti`
- **Vanha:** "…ja sen pintaan on kierretty kuparilankaa kaksikymmentäkaksi kilometriä."
- **Uusi:** "…ja sen pinta on verhottu kuparinauhalla, jota on jopa kaksikymmentäkaksi kilometriä."
- **Syy:** Tyyppi 3: kupoli on verhottu kuparinauhalla, ei kierretty langalla (fi-wiki: kuparinauhaverhous; MyHelsinki: "jopa 22 kilometristä kuparinauhaa"). Ratkaisee pilviraportin epävarmuuden "Temppeliaukion kuparilanka". Lahteet: Strömman sivu ei sisältänyt 180 ikkunaa, kallion ikää eikä konserttimäärää, joten ne siirretty MyHelsingin lähteelle (avattu, vahvistaa kaikki); Berglund en.wikipedialle; Strömma jäi vain alttarihalkeaman lähteeksi.
- **Lähde:** https://www.myhelsinki.fi/fi/places/temppeliaukion-kirkko/ ; https://en.wikipedia.org/wiki/Temppeliaukio_Church

### Helsingin päärautatieasema — kenttä `lyhyt`
- **Vanha:** "Helsingin päärautatieaseman kautta kulkee arviolta kaksisataatuhatta matkustajaa päivässä, joten se on Suomen vilkkain rakennus. Arkkitehti Eliel Saarisen ehdotus valittiin aikanaan kahdenkymmenenyhden kilpailuehdotuksen joukosta, ja koko massiivinen rakennus verhoiltiin suomalaisella graniitilla."
- **Uusi:** "Helsingin päärautatieaseman suunnittelukilpailun voitti Eliel Saarisen kansallisromanttinen ehdotus, jossa oli torneja ja kahdeksan graniittista karhua. Arkkitehdit moittivat sitä vanhanaikaiseksi, ja lehtien pilakuvissa yksi karhuista hyppäsi kadulle jahtaamaan ihmisiä. Saarinen piirsi aseman lähes kokonaan uudelleen, ja karhut jäivät pois."
- **Syy:** Tyyppi 2: kävijämäärä, kilpailuehdotusten määrä ja verhousmateriaali olivat hallinnollista perustietoa. Samalla poistui epävarma "Suomen vilkkain rakennus" (pilviraportin epävarmuus; fi-wikin mukaan matkustajia on noin 250 000, joten luku olisi myös vanhentunut). Uusi tarina on ristiriita ja yllätys.
- **Lähde:** https://fi.wikipedia.org/wiki/Helsingin_p%C3%A4%C3%A4rautatieasema ; https://en.wikipedia.org/wiki/Helsinki_Central_Station

### Oodi — kenttä `lyhyt`
- **Vanha:** "Oodin ylimmän kerroksen laaja terassi katsoo suoraan aukion yli eduskuntataloa kohti. Kirjasto ja eduskunta ovat Kansalaistorin eri puolilla vastakkain, ja kirjastolain tavoitteena on edistää muun muassa sivistystä, demokratiaa ja sananvapautta."
- **Uusi:** "Oodi on rakennettu kuin silta: kirjasto kaartuu yli sadan metrin matkalta avoimen pohjakerroksen yllä kahden massiivisen teräskaaren varassa. Ratkaisu teki sisätiloista pilarittomia ja jätti tontin alle tilaa tulevalle autotunnelille, jonka suunnittelu kuitenkin keskeytettiin vuonna 2019."
- **Syy:** Tyyppi 1: terassinäkymä eduskuntataloon kerrotaan jo Eduskuntatalon tekstissä. Tyyppi 2: kirjastolain tavoitepykälä oli hallintoa (ja sävyltään saarnaava). Uusi yksityiskohta on rakenteellinen yllätys, jossa on ristiriita (tunneli jäi rakentamatta).
- **Lähde:** https://www.metalocus.es/en/news/helsinki-central-library-oodi-ala-architects ; https://www.ramboll.com/fi-fi/projektit/kiinteistot/helsingin-keskustakirjasto-oodi ; https://fi.wikipedia.org/wiki/Helsingin_keskustatunneli

### Kiasma — kenttä `kysymykset`
- **Vanha:** "Millaista taidetta Kiasmassa on nyt esillä?"
- **Uusi:** "Miten Kiasma hyödyntää päivänvaloa?"
- **Syy:** Tyyppi 7: vastaus vanhenee näyttelyiden vaihtuessa.

### Linnanmäki — kenttä `kysymykset`
- **Vanha:** "Mikä on Linnanmäen uusin laite?"
- **Uusi:** "Kuinka nopeasti Vuoristoradan juna kulkee?"
- **Syy:** Tyyppi 7: vastaus vanhenee joka kausi.

### Sibelius-monumentti — kenttä `kysymykset`
- **Vanha:** "Mitä Sibeliuksen musiikkia kannattaa kuunnella ensin?"
- **Uusi:** "Miksi muistomerkin nimi on Passio Musicae?"
- **Syy:** Tyyppi 7: kysymys koski säveltäjää yleisesti, ei tätä kohdetta.

### Tarkistettu, ei muutettu (Helsinki)
- Avaus: ilmakuva (niemi, saaret), 37 sanaa, alkaa "Tervetuloa" — kunnossa.
- Senaatintorin lyhyt (Sederholmin talo): fi-wiki "Helsingin kantakaupungin vanhin rakennus" vastaa muotoilua "keskustan vanhin rakennus"; Lasten kaupunki toimii talossa yhä (kaupunginmuseon sivu). Lyhyt on yllättävä vertailu, jätettiin.
- Kauppatorin lyhyt (Havis Amanda): lakitus pidettiin myös vappuna 2026 (HYY); Kauppatorin peruskorjaus vasta 2030-luvulla. Ei muutosta.
- Tuomiokirkko: julkisivuremontti valmistui marraskuussa 2025 (Kirkko ja kaupunki), kirkko on kolmessa vaaleanharmaan sävyssä ja näyttää valkoiselta; tekstin "valkoisena ristinä" ja kysymys "Miksi kirkko on niin valkoinen?" pätevät.
- Uspenski: auki, pääsymaksu toukokuusta 2025; "Länsi-Euroopan suurin ortodoksinen kirkko" en.wikipedian mukaan (pilviraportin epävarmuus: lähde vahvistaa, jätettiin).
- Suomen kansallismuseo: suljettuna peruskorjauksen ja laajennuksen vuoksi syksystä 2023 kevääseen 2027. Teksti ei väitä museon olevan auki (aulan freskot ovat yhä paikallaan), joten ei muutosta — **Päätoimittajalle:** halutaanko sulkeminen mainita? En lisännyt, koska tieto vanhenee keväällä 2027.
- Ateneum: van Gogh 1903 "ensimmäinen museokokoelma maailmassa" vahvistettu en.wikipediasta.
- Kiasma: ei sulkemistietoa 2026.
- koko_m-arviot (pilviraportin epävarmuus): uskottavia, ei muutettu.

## Islanti

### Hallgrímskirkja — kenttä `lyhyt`
- **Vanha:** "Islannin suurimman kirkon, Hallgrímskirkjan, tornissa kulkee hissi näköalatasanteelle, jolta Reykjavikin kadut ja talot levittäytyvät lahden rantaan asti. Kirkkaalla säällä lännessä erottuu kaukainen Snæfellsjökullin jäätikkö. Kirkon suuret urut rakensi saksalainen urkurakentamo Klais, ja ne valmistuivat vuonna 1992."
- **Uusi:** "Islannin luterilaisen kirkon johto halusi Hallgrímskirkjalle suuren tornin, joka peittoaisi katolisen Landakotskirkjan, vaikka rakennuksesta oli alun perin tarkoitus tehdä matalampi. Torni ja siivet valmistuivat jo vuonna 1974, kauan ennen kirkkosalia."
- **Syy:** Tyyppi 2: hissi, näkymä ja urkurakentamo olivat matkailu- ja perustietoa. Uusi tarina on ristiriita kahden kirkkokunnan välillä ja kytkeytyy kierroksen Landakotskirkjaan (jonka teksti kertoo sen olleen 1929 Islannin suurin kirkko). Poistaa samalla pilviraportin epävarmuuden Snæfellsjökull-näkymästä. puhe_lyhyt poistettu (uudessa lyhyessä ei þ/ð/æ-kirjaimia).
- **Lähde:** https://en.wikipedia.org/wiki/Hallgr%C3%ADmskirkja

### Reykjavíkin tuomiokirkko — kenttä `lyhyt`
- **Vanha:** "Reykjavikin tuomiokirkko oli ensimmäinen rakennus, joka tehtiin nimenomaan sitä silmällä pitäen, että Reykjavikista tulisi maan pääkaupunki. Kirkkoa laajennettiin 1840-luvulla, ja nykyään se on Islannin piispan istuin ja maan luterilaisen kirkon äitikirkko."
- **Uusi:** "Reykjavikin tuomiokirkko ei pysynyt kunnossa kauan: jo vuonna 1815, vain yhdeksäntoista vuotta vihkimisen jälkeen, sitä ei pidetty kelvollisena jumalanpalveluksiin. Vuonna 1840 sinne tuotiin urut, ja ne olivat ensimmäiset islantilaiseen kirkkoon hankitut urut."
- **Syy:** Tyyppi 1: piispanistuin kerrottiin jo saman kohteen tekstissä (piispanistuin siirrettiin tänne 1796). Tyyppi 2: laajennus ja asema äitikirkkona olivat hallinnollista perustietoa. Uudessa on yllätys ja ensimmäisyys. Tarkistettu myös tekstin arkkitehti: en.wikipedia nimeää Andreas Hallanderin, mutta kirkon oma historiasivu nimeää A. Kirkerupin, joten tekstin Kirkerup jäi.
- **Lähde:** https://is.wikipedia.org/wiki/D%C3%B3mkirkjan_%C3%AD_Reykjav%C3%ADk ; https://domkirkjan.is/sagan/

### Perlan — kenttä `lyhyt`
- **Vanha:** "Näköalarakennus Perlanin suunnitteli arkkitehti Ingimundur Sveinsson. Nykyään se on luontomuseo, jossa on revontulinäytös, jäätikkönäyttely ja kymmenen metriä korkea jäljennös Látrabjargista, yhdestä Euroopan suurimmista lintukallioista. Rakennuksessa on myös kahvila, ravintola ja jäätelöbaari."
- **Uusi:** "Näköalarakennus Perlanin kukkula kohoaa kuusikymmentäyksi metriä merenpinnan yläpuolelle, ja siksi kaupungin kuuma vesi varastoitiin sen laelle. Korkeus antoi niin paljon painetta, että vesi nousi kymmenenteen kerrokseen asti ja riitti koko kaupunkiin, jopa Hallgrímskirkjan kukkulalle."
- **Syy:** Tyyppi 2: arkkitehti, näyttelyluettelo ja kahvila/ravintola/jäätelöbaari olivat perustietoa ja mainosmaista; näyttelyluettelo myös vanhenee (tyyppi 5). Arkkitehdin nimi oli lisäksi ristiriitainen (is.wiki Ingimundur Sveinsson, en.wiki rakennesuunnittelija Jón Búi Guðlaugsson), joten se jäi pois. Uusi lyhyt selittää, miksi säiliöt ovat juuri mäellä, toistamatta tekstin vuotta 1939.
- **Lähde:** https://en.wikipedia.org/wiki/Perlan

### Perlan — kenttä `kysymykset`
- **Vanha:** "Miksi kuumaa vettä säilytetään mäen laella?"
- **Uusi:** "Paljonko kuumaa vettä säiliöihin mahtuu?"
- **Syy:** Tyyppi 7 ja 1: uusi lyhyt vastaa jo vanhaan kysymykseen. Vastaus on pysyvä (kuusi säiliötä, kukin viisi miljoonaa litraa, en.wiki/is.wiki).

### Höfði — kenttä `lyhyt` (ja `puhe_lyhyt`)
- **Vanha:** "Jugendtyylinen talo Höfði on ollut Reykjavikin kaupungin omistuksessa vuodesta 1958, ja vuodesta 1967 siinä on pidetty kaupungin vastaanottoja. Perimätiedon mukaan…"
- **Uusi:** "Jugendtyylinen talo Höfði valmistettiin osina Norjassa, laivattiin Islantiin ja koottiin Reykjavikissa. Perimätiedon mukaan…" (kummitustarina ennallaan)
- **Syy:** Tyyppi 2: omistus ja käyttötarkoitus olivat hallintoa. Tilalle yllättävä yksityiskohta (Norjassa tehty valmistalo). puhe_lyhyt päivitetty (Höfdi).
- **Lähde:** https://en.wikipedia.org/wiki/H%C3%B6f%C3%B0i

### Höfði — `lahteet` (ei tekstimuutosta)
- Tekstin "sieltä näkyy Faxaflóin lahden yli Esja-vuorelle": visitreykjavik.is-sivu ei mainitse näkymää, joten lähde vaihdettu sivuun, joka sanoo sen (guidetoiceland.is: "looks out over Faxaflói Bay and Mount Esjan"). Ratkaisee pilviraportin epävarmuuden.

### Harpa — kenttä `lyhyt`
- **Vanha:** "Konserttitalo Harpa voitti vuonna 2013 Euroopan unionin Mies van der Rohe -arkkitehtuuripalkinnon. Talossa on esitetty myös oopperaa, vaikka konserteille suunnitellusta talosta puuttuvat esirippu, näyttämöaukko ja perinteinen näyttämökoneisto. Pääsaliin mahtuu ainakin tuhat kuusisataa kuulijaa."
- **Uusi:** "Konserttitalo Harpan lasijulkisivun itä- ja länsiosissa on yhteensä seitsemänsataaneljätoista ledvaloa, joilla Olafur Eliasson on luonut talon kylkiin vaihtuvia valoteoksia. Talon kymmenvuotisjuhlaan vuonna 2021 hän suunnitteli kaksitoista uutta valoteosta, yhden kullekin kuukaudelle."
- **Syy:** Tyyppi 2: palkinto ja paikkamäärä olivat perustietoa. Tyyppi 5: oopperavirke vanheni — en.wikipedian mukaan uusi Islannin kansallisooppera muuttaa Harpaan vuodesta 2026, joten "esitetty myös oopperaa, vaikka…" -kehys ei enää kuvaa nykytilaa. Uusi lyhyt on ilmasta nähtävä yksityiskohta, ja siinä on ihminen.
- **Lähde:** https://en.wikipedia.org/wiki/Harpa_(concert_hall)

### Alþingishúsið — kenttä `teksti` (ja `puhe_teksti`)
- **Vanha:** "…jotka ovat lohikäärme, kotka, jättiläinen ja härkä."
- **Uusi:** "…jotka ovat lohikäärme, aarnikotka, jättiläinen ja härkä."
- **Syy:** Tyyppi 3: Islannin suojelijoiden lintu (Gammur) on suomenkielisessä vakiintuneessa käytössä aarnikotka (fi.wiki, Islannin vaakuna); en.wikipedian "vulture" ja vaakunan "eagle/griffin" vaihtelevat. Ratkaisee pilviraportin epävarmuuden.
- **Lähde:** https://fi.wikipedia.org/wiki/Islannin_vaakuna

### Tarkistettu, ei muutettu (Islanti)
- Avaus: ilmakuva (kirjava kattojen tilkkutäkki, lahti, Esja), 37 sanaa, alkaa "Tervetuloa" — kunnossa.
- Harpan "yli tuhannesta kaksitoistatahkoisesta lasitiilestä": Henning Larsenin sivu sanoo sanatarkasti "more than 1,000 quasi-bricks", joten jätettiin (pilviraportin epävarmuus ratkaistu).
- Alþingishúsiðin lyhyt (kirjasto, kokoelmat, yliopisto talossa) on yllättävä yksityiskohta, eikä se toistu muualla, joten jätettiin. Täysistunnot pidetään yhä talossa.
- Landakotskirkjan lyhyt (ranskalaiset papit) on tarina, joten jätettiin. Tjörninin lyhyt (luistelu) jätettiin, koska se on kohtaus eikä hallintoa; se on kierroksen heikoin, mutta ei virheellinen.
- Laugardalsvöllur: yhä maajoukkueen kotikenttä (en.wiki); hybridinurmi ja lämmitys 2024–2026 eivät muuta tekstiä.
- Kansallisteatteri: "ensimmäinen arkkitehdiksi kouluttautunut islantilainen" vahvistettu (en.wiki: "the first Icelander to be educated in architecture").
- Isoisä: ei mainita (pohjan merkintä koskee pesulähteitä Reykjavikin ulkopuolella, ei mitään kohdetta suoraan), kuten aiemmin.

## Kreeta

### Heraklionin venetsialaiset muurit — kenttä `lyhyt`
- **Vanha:** "Heraklionin venetsialaisille muureille, Martinengon bastionin laelle, haudattiin vuonna 1957 kirjailija Nikos Kazantzakis, koska ortodoksinen kirkko ei sallinut hänen hautaamistaan hautausmaalle. Hautakivessä lukee: En toivo mitään, en pelkää mitään, olen vapaa."
- **Uusi:** "Heraklionin venetsialaisille muureille, Martinengon bastionin laelle, haudattiin vuonna 1957 kirjailija Nikos Kazantzakis. Usein väitetään, että kirkko eväsi häneltä hautajaiset, mutta Kreetan arkkipiispa siunasi hänet, vaikka kiihkoilijat polttivat hänen kirjojaan kirkon edessä. Hautakivessä lukee: En toivo mitään, en pelkää mitään, olen vapaa."
- **Syy:** Tyyppi 3 (vivahde, legenda esitetty tosiasiana). Väite "kirkko ei sallinut hautaamista hautausmaalle" on yleinen länsimainen myytti: en.wikipedian mukaan kirkon johto hylkäsi ekskommunikaation, eikä artikkeli mainitse hautauskieltoa. Ateenan arkkipiispa kielsi ruumiin julkisen esillepanon Ateenassa, mutta Kreetan arkkipiispa Eugenios toimitti hautajaiset Heraklionissa, ja pappi siunasi haudan. Hautajaispäivä jätetty pois (lähteissä 5. tai 6.11.). Lonely Planet -lähde, joka toisti myytin, poistettu.
- **Lähde:** https://en.wikipedia.org/wiki/Nikos_Kazantzakis ; https://www.cretanbeaches.com/en/cities-and-towns-in-crete/heraklion-city/historical-monuments-of-heraklion/nikos-kazantzakis-grave-martinengo ; https://www.patrickcomerford.com/2025/04/climbing-walls-of-iraklion-at-easter-to.html?m=1

### Heraklionin venetsialaiset muurit — kenttä `teksti`
- **Vanha:** "Martinengon bastionilla on nykyään kokonainen jalkapallostadion. Muurien päällä kulkee nykyään…"
- **Uusi:** "Martinengon bastionilla on kokonainen jalkapallostadion. Muurien päällä kulkee nykyään…"
- **Syy:** Tyyppi 6 (kieli): "nykyään" kahdessa peräkkäisessä virkkeessä. Stadionin sijainti bastionilla ja nykykäyttö tarkistettu.
- **Lähde:** https://en.wikipedia.org/wiki/Nikos_Kazantzakis_Stadium

### Pyhän Menaksen tuomiokirkko — kenttä `lyhyt`
- **Vanha:** "Pyhän Menaksen tuomiokirkon peruskivi muurattiin vuonna 1862, mutta työt keskeytyivät Kreetan kapinan ajaksi, ja kirkko vihittiin vasta vuonna 1895. Sen ikonostaasi ja piispanistuin on tehty Tinoksen saaren valkoisesta ja vihreästä marmorista."
- **Uusi:** "Pyhän Menaksen tuomiokirkon pohjoispuolella on esillä outo muistoesine, saksalainen lentopommi. Se putosi kirkon viereen, kun saksalaiset pommittivat Heraklionia vuonna 1941, mutta jäi räjähtämättä. Kaupunkilaiset pitivät kirkon säästymistä oman suojeluspyhimyksensä ihmeenä."
- **Syy:** Tyyppi 2: vanha kierrosversio oli pelkkää perustietoa (peruskivi, vihkimisvuosi, materiaali). Uusi on tarina ja näkyvä yksityiskohta. Kazantzakiksen ruumis oli myös esillä tässä kirkossa, mutta sitä ei käytetty, koska muurien kierrosversio kertoo jo Kazantzakiksesta. Lähteiden mukaan pommi putosi kirkon VIEREEN, ei kirkon päälle (yksi hakuote väitti päälle). Vanhojen väitteiden lähderivit poistettu.
- **Lähde:** https://cretanbeaches.com/en/cities-and-towns-in-crete/heraklion-city/religious-monuments-of-heraklion/cathedral-of-saint-minas ; https://religious.incrediblecrete.gr/en/metropolitan-church-of-agios-minas/

### Pyhän Menaksen tuomiokirkko — kenttä `teksti`
- **Vanha:** "Kirkon ympäri ratsastanut harmaahiuksinen soturi ajoi joukon pakoon…"
- **Uusi:** "Perimätiedon mukaan kirkon ympäri ratsastanut harmaahiuksinen soturi ajoi joukon pakoon…"
- **Syy:** Tyyppi 3: legenda oli kerrottu tosiasiana. Lähde kertoo sen ihmekertomuksena (ilmestyi ratsain upseeri; muslimit luulivat häntä Ayan Agaksi, kristityt pyhäksi Menakseksi). Legendan lähde (PILVI-RAPORTIN epävarmuus) avattu ja todettu yhteneväksi.
- **Lähde:** https://religious.incrediblecrete.gr/en/metropolitan-church-of-agios-minas/

### Koulesin linnoitus — kenttä `lyhyt`
- **Vanha:** "Koulesin linnoitus puolusti kaupunkia ottomaanien piirityksessä, joka kesti yli kaksikymmentäyksi vuotta. Nykyään sen saleissa on esillä amforia ja tykkejä, jotka meritutkija Jacques Cousteau nosti Dian saaren edustan hylyistä vuonna 1976."
- **Uusi:** "Koulesin linnoituksen edustalla, noin kolmentoista kilometrin päässä merellä, on Dian saari, jonka vesillä meritutkija Jacques Cousteau etsi 1970-luvulla kadonneen Atlantiksen jälkiä. Atlantista ei löytynyt, mutta saaren hylyistä nostetut amforat ja tykit tuotiin linnoitukseen."
- **Syy:** Tyyppi 1: yli kaksikymmentä vuotta kestänyt piiritys kerrotaan jo avauksessa ("torjui piirittäjiä yli kaksikymmentä vuotta") ja muurien tekstissä. Tyyppi 5: "Nykyään sen saleissa on esillä" ei ole varmistettavissa vuodelle 2026. Cousteaun löydöt avattiin näytteille 2016, mutta 2026 päivitetyt matkailulähteet kertovat vaihtuvista näyttelyistä mainitsematta Cousteauta. Uusi muotoilu ei vanhene, ja siinä on tarina (Atlantiksen etsintä). Cousteaun vuosi on lähteissä ristiriitainen (1974–1975 / 1976), joten muotoiltu "1970-luvulla".
- **Lähde:** https://www.gomega.gr/en/destinations-203/dia-island/ ; https://www.cretanbeaches.com/en/islands-and-islets-around-crete/dia-island ; https://news.gtp.gr/2016/08/18/heraklion-fortress-reopens-music/ ; https://www.argophilia.com/news/why-dia-islet-is-the-mysterious-rock-everyone-forgets/244411

### Morosinin suihkulähde — kenttä `kysymykset`
- **Vanha:** "Toimiiko suihkulähde yhä?"
- **Uusi:** "Miksi altaassa on juuri leijonia?"
- **Syy:** Tyyppi 7: vastaus vanhenee. Lähde on heinäkuussa 2026 kuiva, ja kunnostus on siirretty alkamaan 1.11.2026, jolloin veden palauttamista selvitetään.
- **Lähde:** https://www.argophilia.com/news/morosini-fountain-restoration/250497/

### Archánes — kenttä `lahteet`
- **Vanha:** url https://cretetravel.com/guide/archanes/ (sivu palauttaa "Page not found")
- **Uusi:** https://www.argophilia.com/news/visit-archanes-for-a-sampling-of-sacred-cretan-village-life/224190 (14 km Heraklionista, Juktas, Euroopan toiseksi parhaiten entistetty kylä; vahvistaa myös https://cretevillas4u.com/en/blog/archanes-village)
- **Syy:** Kuollut lähde. Tekstiä ei muutettu. Palkinnon myöntäjä on argophilian mukaan EU, mutta vuotta ei löytynyt, ja teksti on jo varovainen ("palkittu yhtenä Euroopan parhaiten entistetyistä kylistä").
- **Lähde:** ks. yllä

### Tarkistettu ilman muutoksia (Kreeta)
- Avaus: ilmasta nähtävä kuva (talojen kenno, bastionimuuri, vuori), 41 sanaa, alkaa "Tervetuloa". Ei muutoksia.
- PILVI-RAPORTIN epävarmuudet: Koulesin rakennusvuodet (1523/1540), leijonakohokuvat ja upotetut laivat vahvistettu avaamalla explorecrete.com. Linnoitus on auki vuonna 2016 tehdyn kunnostuksen jälkeen (2026 aukioloajat). "Euroopan vanhin valtaistuin" pysyy "jota pidetään" -muodossa (en.wiki).
- Kierrosversiot luettu peräkkäin: Knossos (lineaari-B), valtaistuinsali (Haagin jäljennös), museo (härkähyppy), Tituksen kallo, Morosinin aamu-bougatsa ja muurit. Ei muita päällekkäisyyksiä eikä hallintosisältöä. Morosinin kierrosversio on tunnelmakuva eikä tarina, mutta ei hallintoa, joten se jätettiin ennalleen.
- Lähde-URLit testattu: kaikki vastaavat. Bigthink, biblicalarchaeology ja franciscanmedia palauttavat botille 403:n, eli ne ovat olemassa mutta estävät botit.

## Lissabon

### Santa Justan hissi — kenttä `teksti`
- **Vanha:** "…uusgoottilainen rautatorni, joka nostaa matkustajat alakaupungin kaduilta Carmon aukion tasolle. … Hissi kuuluu yhä Lissabonin liikennelaitoksen kalustoon, ja sitä hoitaa sama yhtiö kuin kaupungin raitiovaunuja."
- **Uusi:** "…uusgoottilainen rautatorni, joka rakennettiin nostamaan matkustajat alakaupungin kaduilta Carmon aukion tasolle. … Kun läheisen Glórian köysiradan vaunu suistui radaltaan syyskuussa 2025 ja kuusitoista ihmistä kuoli, myös Santa Justan hissi suljettiin turvallisuustarkastuksia varten."
- **Syy:** Tyyppi 5 (NYKYAIKA). Hissi on ollut suljettuna syyskuusta 2025, eikä Carris ollut vahvistanut avaamispäivää 2.9.2026 mennessä. Preesens "nostaa matkustajat" ei pitänyt paikkaansa. Uusi muotoilu ei vanhene: menneen ajan tapahtuma pysyy totena, vaikka hissi avattaisiin.
- **Lähde:** https://rfm.pt/atualidade/23708/gloria-bica-lavra-e-santa-justa-um-ano-depois-do-acidente-o-que-aconteceu-aos-elevadores-historicos-de-lisboa ; https://en.wikipedia.org/wiki/2025_Ascensor_da_Gl%C3%B3ria_derailment

### Santa Justan hissi — kenttä `lyhyt`
- **Vanha:** "Santa Justan hissin rautapitsimäisen tornin sisällä kulkee kaksi kiillotetusta puusta tehtyä hissikoria. Rakennuslupa myönnettiin jo vuonna 1882, mutta työt alkoivat vasta vuonna 1900. Huipun näköalatasanteelta avautuu näkymä alakaupungin kattojen yli joelle ja linnamäelle."
- **Uusi:** "Santa Justan hissin rautasillan vihki kuningas Kaarle ensimmäinen elokuussa 1901 hoviväen ja aatelisten seurassa, mutta ensimmäinen hissikori lähti liikkeelle vasta seuraavana kesänä. Tornin kahdessa korissa on puupaneelit, peilit ja ikkunat, ja kumpaankin mahtui alun perin kaksikymmentäneljä matkustajaa."
- **Syy:** Tyyppi 2: lupavuosi ja töiden alkuvuosi ovat hallintoa. Tyyppi 5: näköalatasanne on suljettu yhdessä hissin kanssa. Uusi on tapahtuma: silta vihittiin ennen kuin hissi toimi. Lupavuoden ja Carrisin lähderivit poistettu.
- **Lähde:** https://en.wikipedia.org/wiki/Santa_Justa_Lift

### Praça do Comércio — kenttä `lyhyt`
- **Vanha:** "Kauppatorin joenpuoleiselta reunalta leveät portaat laskeutuvat suoraan veteen, ja aikanaan arvovieraat nousivat niitä pitkin veneistä kaupunkiin. Uuden aukion suunnittelivat maanjäristyksen jälkeen Eugénio dos Santos ja Carlos Mardel, kun markiisi Pombal johti kaupungin jälleenrakennusta."
- **Uusi:** "Kauppatorin takana alkava alakaupunki rakennettiin maanjäristyksen jälkeen uudella tavalla: talojen seinien sisään kätkettiin joustava puuristikko, jonka piti huojua kaatumatta. Pienoismalleja testattiin antamalla sotilaiden marssia niiden ympärillä. Talot kuuluvat Euroopan varhaisimpiin maanjäristyksen varalle suunniteltuihin rakennuksiin."
- **Syy:** Tyyppi 2: "suunnittelivat X ja Y" on kielletty perustietorakenne. Tyyppi 1: "aukio avautuu suoraan veteen" kerrotaan jo avauksessa juuri ennen tätä kierrosversiota. Portaiden lähde oli matkailusivu (PILVI-RAPORTIN epävarmuus), ja se poistui samalla. Uusi on yllättävä yksityiskohta (sotilaat marssivat "keinomaanjäristyksenä"). Superlatiivi muotoiltu lähteen mukaan: "among the earliest seismically protected constructions in Europe".
- **Lähde:** https://en.wikipedia.org/wiki/1755_Lisbon_earthquake ; https://en.wikipedia.org/wiki/Pombaline_Baixa ; https://en.wikipedia.org/wiki/Pombaline_style

### Belémin torni — kenttä `lyhyt`
- **Vanha:** "Joensuun vartiotornin, Belémin tornin, suunnitteli sotilasarkkitehti Francisco de Arruda. Usein kerrotaan, että joki siirtyi pois tornin ympäriltä vuoden 1755 maanjäristyksessä, mutta torni rakennettiin alun perin pienelle saarelle rannan tuntumaan. Vuodesta 1983 se on ollut Unescon maailmanperintöä Hieronymuksen luostarin kanssa."
- **Uusi:** "Lissabonia mereltä suojaavan Belémin tornin varuskunta antautui vuonna 1580 muutaman tunnin taistelun jälkeen Alban herttuan espanjalaisjoukoille. Sen jälkeen tornin tyrmiä käytettiin vankilana vuoteen 1830 asti, ja kuningas Mikael sulki niihin liberaaleja vastustajiaan."
- **Syy:** Tyyppi 2: arkkitehti ja Unesco-vuosi ovat perustietoa. Tyyppi 1: tornin rakentaminen pienelle saarelle kerrotaan jo saman kohteen tekstissä. Uusi on tapahtuma ja ristiriita (puolustustorni antautui ja muuttui vankilaksi). Hallitsijan nimi fi.wikipedian mukaan Mikael (Mikael Anastaja, port. Miguel I). Torni avattiin uudelleen 28.5.2026 vuoden kestäneen restauroinnin jälkeen (https://www.sabado.pt/gps/amp/torre-de-belem-reabre-a-brilhar-e-com-novo-sistema-de-entradas-para-reduzir-filas), eikä mikään teksti väitä sitä suljetuksi.
- **Lähde:** https://en.wikipedia.org/wiki/Bel%C3%A9m_Tower

### Belémin torni — kenttä `teksti`
- **Vanha:** "…joka saapui Intiasta Lissaboniin kuningas Manuel ensimmäisen lahjaksi vuonna 1515."
- **Uusi:** "…joka saapui Intiasta Lissaboniin lahjaksi kuningas Manuel ensimmäiselle vuonna 1515."
- **Syy:** Tyyppi 3/6: "Manuel ensimmäisen lahjaksi" voi kuulostaa siltä, että Manuel antoi lahjan. Todellisuudessa sarvikuono oli lahja Manuelille (Gujaratin sulttaanilta).
- **Lähde:** https://en.wikipedia.org/wiki/D%C3%BCrer%27s_Rhinoceros

### Belémin torni — kenttä `kysymykset`
- **Vanha:** "Käytettiinkö tornia myös vankilana?"
- **Uusi:** "Miksi torni on koristeltu kuin palatsi?"
- **Syy:** Tyyppi 7: uusi kierrosversio vastaa jo vanhaan kysymykseen.
- **Lähde:** –

### Alfama — kenttä `lahteet`
- **Vanha:** "yli 80 prosenttia tuhoutui" | https://www.odysseytraveller.com/articles/alfama-portugal/
- **Uusi:** "85 prosenttia Lissabonin rakennuksista tuhoutui" | https://en.wikipedia.org/wiki/1755_Lisbon_earthquake
- **Syy:** PILVI-RAPORTIN epävarmuus ratkaistu. Tekstin "yli neljä viidesosaa" pitää paikkansa, tekstiä ei muutettu.

### Tarkistettu ilman muutoksia (Lissabon)
- Joosef ensimmäisen patsas, yksi valu 15.10.1774: vahvistettu en.wikipediasta (Statue of José I), epävarmuus ratkaistu.
- Rua Augustan riemukaaren huipulle pääsy vuodesta 2013: vahvistettu (trienaldelisboa). Näköalatasanne on auki 2026 (13-vuotisjuhla 9.8.2026).
- Löytöretkien muistomerkki: avattiin uudelleen huhtikuussa lyhyen kunnostuksen jälkeen, eikä teksteissä ole vanhenevaa väitettä. São Jorgen linnan camera obscura on yhä käytössä (linnan oma sivu, opastukset 1.10.2026–28.2.2027).
- Avaus: ilmasta nähtävä kuva (kukkulat, punaiset katot, Tejo), 38 sanaa, alkaa "Tervetuloa". Ei muutoksia.
- Kierrosversiot luettu peräkkäin uusien kanssa: Kauppatori (maanjäristystalot), tuomiokirkko (Antonius ja sardiinit), Alfama (raitiolinja 28 ja maurit), linna (riikinkukot ja camera obscura), Santa Justa (kuninkaan vihkimä silta), Hieronymus (munkit, pastel de nata, Lissabonin sopimus), muistomerkki (kompassiruusu), Belém (antautuminen ja vankila). Ei päällekkäisyyksiä. Huom.: Alfaman kierrosversion maurivalta ja vuosi 1147 toistuvat linnan ja tuomiokirkon TEKSTEISSÄ, mutta eivät toisessa kierrosversiossa, joten Alfama jätettiin ennalleen.
- Lähde-URLit testattu: kaikki vastaavat (franciscanmedia 403 = botti-esto).

## Päätoimittajalle jätetyt epävarmuudet
- Lissabon, Santa Justa: jos hissi avataan uudelleen, teksti pysyy totena, mutta Päätoimittaja voi halutessaan lisätä tiedon uudelleenavaamisesta.
- Kreeta, Koules: Cousteaun löydöt ovat varmasti olleet esillä linnoituksessa (2016), mutta niiden nykyistä esillä oloa ei voitu varmistaa. Siksi teksti ei enää väitä niitä esillä oleviksi.
- Kreeta, Pyhä Menas: pommin putoamispäiväksi yksi hakuote antoi 23.5.1941, mutta avatut lähteet kertovat vain vuoden, joten käytettiin vuotta 1941.

## Ljubljana

### Prešerenin aukio — kenttä `lyhyt`
- **Vanha:** "Ljubljanan Prešerenin aukion patsaan veisti Ivan Zajec, ja jalustan suunnitteli arkkitehti Max Fabiani. Runottaren herättämä kohu ratkaistiin lopulta istuttamalla koivuja, jotka peittivät alastoman hahmon kirkon ovelta katsottuna. Kohu täytti viikkokausia sanomalehtien palstat."
- **Uusi:** "Ljubljanan Prešerenin aukion runoilija on Slovenialle niin tärkeä, että hänen kuolinpäivänsä kahdeksas helmikuuta on maan kulttuuripäivä ja yleinen vapaapäivä. Hänen maljarunonsa Zdravljica seitsemäs säkeistö on Slovenian kansallislaulu, joka toivottaa elämää kaikille kansoille, jotka odottavat päivää, jolloin riita karkotetaan maailmasta."
- **Syy:** Tyyppi 3 (legenda tosiasiana): koivujen istuttaminen runottaren peittämiseksi on matkailutarina. en-wikin Prešeren Monument -artikkeli ei mainitse koivuja lainkaan, ja Prešeren Square -artikkelin mukaan kolme koivua istutettiin merkitsemään Ljubljanan "energiakeskusta"; edellisen tarkistajan lähde (en-wiki) ei tue väitettä, eikä RTV:n artikkeli kerro kohun ratkaisusta. Lisäksi tyyppi 1 ja 2: lyhyt jatkoi tekstin kohua ("Runottaren herättämä kohu" edellytti tekstin kuulemista) ja alkoi tekijätiedoilla. Korvattu tarinalla runoilijan merkityksestä (Prešerenin päivä, kansallislaulu).
- **Lähde:** https://en.wikipedia.org/wiki/Pre%C5%A1eren_Square ; https://en.wikipedia.org/wiki/Pre%C5%A1eren_Day ; https://en.wikipedia.org/wiki/National_anthem_of_Slovenia ; https://en.wikipedia.org/wiki/Zdravljica

### Ljubljanan tuomiokirkko — kenttä `lyhyt`
- **Vanha:** "Ljubljanan tuomiokirkon paikalla seisoi ennen vanhempi kirkko, joka tuhoisan tulipalon jälkeen vuonna 1361 rakennettiin uudelleen goottilaiseksi. Nykyisen kirkon sisätiloja peittävät Giulio Quaglion barokkifreskot, ja eteläoven kuusi piispaa kertovat hiippakunnan historiasta."
- **Uusi:** "Ljubljanan tuomiokirkon eteläseinällä on vuodelta 1826 aurinkokello, jonka latinankielinen tunnuslause muistuttaa ohikulkijaa: ette tiedä päivää ettekä hetkeä. Kellotorneissa riippuu yhä Slovenian toiseksi vanhin kirkonkello, joka valettiin vuonna 1326, lähes neljä vuosisataa ennen nykyistä kirkkoa."
- **Syy:** Tyyppi 2: rakennushistoriaa ja luettelo, josta ei jää mitään mieleen. Lisäksi tyyppi 3: en-wikin mukaan sivuoven (Ljubljanan oven) reliefit ovat 1900-luvun piispojen muotokuvia, eivät "hiippakunnan historia". Quaglio mainitaan jo tekstissä (harhakupoli).
- **Lähde:** https://en.wikipedia.org/wiki/Ljubljana_Cathedral

### Lohikäärmesilta — kenttä `teksti`
- **Vanha:** "Rakenteen suunnitteli professori Josef Melan, ja lohikäärmeet, kaiteet ja lyhdyt piirsi Otto Wagnerin oppilas, dalmatialainen arkkitehti Jurij Zaninović."
- **Uusi:** "Rakenne perustui insinööri Josef Melanin patentoimaan järjestelmään, ja lohikäärmeet ja kaiteet piirsi Otto Wagnerin oppilas, arkkitehti Jurij Zaninović."
- **Syy:** Tyyppi 3 (kuka suunnitteli): en-wikin mukaan silta rakennettiin wieniläisen Pittel+Brausewetterin suunnitelmin Melanin patentin ("Melanin järjestelmä") pohjalta; Melan ei ollut sillan suunnittelija. Lyhdyt ja "dalmatialainen" poistettu, koska avattu lähde ei mainitse niitä (Zaninović suunnitteli kaiteet ja kuparilevyiset lohikäärmeet). Ratkaisee PILVI-RAPORTIN epävarmuuden "Melanin rooli". Lohikäärmeiden kuparilevy vahvistui samasta lähteestä (ei muutosta).
- **Lähde:** https://en.wikipedia.org/wiki/Dragon_Bridge_(Ljubljana)

### Ljubljanan linna — kenttä `lyhyt`
- **Vanha:** "Ljubljanan linna sai nykyisen ulkoasunsa 1400-luvun perusteellisessa uudistuksessa, ja suurin osa sen rakennuksista on 1500- ja 1600-luvuilta. Vuosisatojen ajan linna oli Krainin herrojen pääpaikka. Nykyään linnan pihoilla ja saleissa järjestetään konsertteja, näyttelyitä ja häitä."
- **Uusi:** "Ljubljanan linnasta piti tulla kaupunginmuseo, mutta suunnitelma jäi toteutumatta, ja kaupunki asutti linnaan sen sijaan köyhiä perheitä. Vanhojen muurien sisällä asuttiin aina vuoteen 1963, jolloin alettiin valmistella kunnostusta, joka teki linnasta nykyisen kulttuurikeskuksen."
- **Syy:** Tyyppi 2: pelkkää perustietoa (rakennuskaudet, omistajat, tapahtumatyypit). Korvattu tarinalla, joka jatkaa tekstin vuoden 1905 ostoa toistamatta sitä.
- **Lähde:** https://en.wikipedia.org/wiki/Ljubljana_Castle

### Tivolin puisto — kenttä `lyhyt`
- **Vanha:** "Tivolin puistossa toimii kesäisin ulkoilmakirjasto, josta voi lainata kirjoja, sarjakuvia ja lehtiä monella kielellä maksutta. Puiston kasvihuoneessa, jota hoitaa Ljubljanan kasvitieteellinen puutarha, kasvaa trooppisia kasveja, ja Cekinin kartanossa toimii Slovenian nykyhistorian museo."
- **Uusi:** "Tivolin puiston linnan edessä vartioi neljä valurautaista koiraa, jotka valettiin vuonna 1864 määriläisessä valimossa. Koirilta puuttuvat kielet, ja kaupungilla huhuttiin, että kuvanveistäjä Anton Fernkorn ei kestänyt häpeää ja riisti henkensä. Tarina on perätön, eikä Fernkorn edes tehnyt koiria."
- **Syy:** Tyyppi 2: palveluluettelo (kirjasto, kasvihuone, museo), joka vanhenee helposti ja toistaa kysymyksen "Mitä puiston kartanoissa on nykyään?". Uusi tarina on merkitty huhuksi ja kumotuksi kuten lähde.
- **Lähde:** https://en.wikipedia.org/wiki/Tivoli_City_Park

### Križanke — kenttä `teksti`
- **Vanha:** "…vanhankaupungin eteläpuolella, ja sen eteläisen pihan voi kattaa suurella siirrettävällä katoksella." / "Ulkoilmateatteriin mahtuu yli kolmetuhatta katsojaa."
- **Uusi:** "…vanhankaupungin eteläpuolella, ja pihojen keskeltä erottuu barokkikirkon aaltoileva kupoli." / "Rock-konserteissa kesäteatteriin mahtuu seisomaan yli kolmetuhatta kuulijaa."
- **Syy:** Tyyppi 5 (nykytila): siirrettävä kangaskatto romahti märän lumen alla huhtikuussa 2016, ja vuodesta 2022 kesäteatteria on kattanut kiinteä katto, joten se ei ole enää ulkoilmateatteri eikä katos ole siirrettävä. Kapasiteetti: Festival Ljubljanan mukaan 1 226 istumapaikkaa ja 3 400 seisomapaikkaa; edellisen tarkistajan "3500" ei löydy nykyisestä en-wikistä. Katto siirretty lyhyeen (ks. alla), joten tekstin ilmakuva vaihdettu kirkon kupoliin. Edellisen tarkistajan lähde ljubljanafestival.si/en/krizanke-en/krizanke-history palauttaa 404; sen väitteet (1228, 1945, Plečnik 1952, kahdeksankymppinen Plečnik) vahvistettiin en-wikistä ja hakuotteista, ja url vaihdettiin en-wikiin.
- **Lähde:** https://www.ljubljanafestival.si/en/premises-rental/summer-theatre/ ; https://n1info.si/novice/slovenija/avditorij-krizank-pod-novo-streho-pomembna-a-polemicna-resitev/ ; https://en.wikipedia.org/wiki/Kri%C5%BEanke

### Križanke — kenttä `lyhyt`
- **Vanha:** "Entisen luostarin Križanken viehättävin piha on Pirunpiha, jonka seiniä Plečnik koristi sgraffitoin ja keskiaikaisen böömiläisen taiteen innoittamin reliefihahmoin. Barokkikirkko valmistui vuonna 1715, ja nykyään pihoilla soivat klassinen musiikki, jazz ja rock."
- **Uusi:** "Entisen luostarin Križanken kesäteatteria suojasi 1960-luvun alusta kevyt kangaskatto, jonka sai vedettyä auki tai kiinni sään mukaan. Huhtikuussa 2016 odottamaton märkä lumi painoi sen alas puolessatoista tunnissa. Vuonna 2022 tilalle tuli kiinteä, läpikuultava katto, ja konsertit tähtitaivaan alla jäivät historiaan."
- **Syy:** Tyyppi 1: sgraffitot kerrottiin sekä lyhyessä että tekstissä. Tyyppi 5: uusi tarina kertoo samalla katon muutoksen oikein. Huom.: visitljubljana.com puhuu yhä "suuresta liukukatosta" — vanhentunut sivu; Festival Ljubljanan oma vuokraussivu sanoo "fixed roof".
- **Lähde:** https://n1info.si/novice/slovenija/avditorij-krizank-pod-novo-streho-pomembna-a-polemicna-resitev/ ; https://www.rtvslo.si/kultura/dediscina/krizanke-bodo-ze-aprila-prvic-uporabile-novo-streho/614890 ; https://www.ljubljanafestival.si/en/premises-rental/summer-theatre/

### Muut tarkistukset (ei muutosta)
- Julija Primic (PILVI-epävarmuus): en-wikin mukaan perhe muutti 1822 Teatterikadulle, nykyiselle Wolfovalle kadulle, ja patsas katsoo ikkunaa, jossa hän asui; reliefi on talossa, jota Prešeren katsoo. Teksti pitää. Lähde lisätty: https://en.wikipedia.org/wiki/Julija_Primic
- Kolmoissillan kaiteet (PILVI-epävarmuus): en-wiki "The balustrades with 642 balusters are made of concrete" — teksti pitää.
- Lohikäärmeiden materiaali: kuparilevy (en-wiki) — pitää.
- Teurastajien sillan lukot: visitljubljana.com kuvaa ne yhä, poistosta ei tietoa — lyhyt pitää.
- Nebotičnik: kattokahvila ja näköalaterassi yhä auki (2026) — pitää. Kaupungintalo, Plečnikin tori, Kolmoissilta: väitteet vahvistuivat.
- Avaus: 37 sanaa, ilmakuva (punaiset katot, linnavuori, joki), alkaa "Tervetuloa" — ei korjattavaa.
- Kysymykset: ei muutoksia; "Miksi pihaa kutsutaan Pirunpihaksi?" jätetty, vaikka Pirunpiha ei enää ole lyhyessä (piha on olemassa).

## Luxemburg

### Guillaume II:n aukio — kenttä `lyhyt` (ja `puhe_lyhyt` samoin, "Guillaume toisen")
- **Vanha:** "Luxemburgin keskusaukion, Guillaume II:n aukion, ratsastajapatsaan teki ranskalainen kuvanveistäjä Antonin Mercié, ja hevosen veisti Victor Peter. Jalustaa koristavat Oranje-Nassaun suvun ja Luxemburgin vaakunat sekä maan kahdentoista kantonin vaakunat. Tarkka jäljennös patsaasta seisoo Haagissa."
- **Uusi:** "Luxemburgin keskusaukion, Guillaume II:n aukion, ratsastajapatsaasta on tarkka kopio Haagissa. Kun Haagin oma Vilhelm toisen patsas jouduttiin siirtämään uuden kadun tieltä, rahat eivät riittäneet uuteen taideteokseen, joten vuonna 1924 valettiin kopio Luxemburgin patsaasta, vaikka viisitoista taiteilijajärjestöä vaati kilpailua."
- **Syy:** Tyyppi 2: tekijä- ja vaakunaluettelo on perustietoa. Kerrottu tarina kopion synnystä (Luxemburgin patsas on alkuperäinen 1884, Haagin kopio 1924).
- **Lähde:** https://bkdh.nl/en/kunstwerken/ruiterstandbeeld-van-koning-willem-ii/ ; https://luxembourg-city.com/en/place/monument/equestrian-statue-of-william-ii

### Guillaume II:n aukio — kenttä `kysymykset`
- **Vanha:** "Miksi patsaasta on kopio Haagissa?"
- **Uusi:** "Kuka veisti aukion ratsastajapatsaan?"
- **Syy:** Tyyppi 7: uusi lyhyt vastaa vanhaan kysymykseen; tekijätieto siirtyi kysymykseksi.
- **Lähde:** https://luxembourg-city.com/en/place/monument/equestrian-statue-of-william-ii

### Bockin kasematit — kenttä `teksti`
- **Vanha:** "…ja jonka laelle kreivi Siegfried rakensi linnansa vuonna 963." / "…ja 1700-luvulla kallion uumeniin mahtui jo viisikymmentä tykkiä ja tuhannen kahdensadan miehen varuskunta."
- **Uusi:** "…ja jonka laella olleen linnoituksen kreivi Siegfried hankki itselleen vuonna 963." / "…ja 1700-luvulla käytävissä oli jo kaksikymmentäviisi tykkiasemaa ja tilaa tuhannelle kahdellesadalle sotilaalle."
- **Syy:** Tyyppi 3. (a) Vuosi 963 on kauppakirjan vuosi: Siegfried hankki vaihtokaupalla Bockilla jo olleen linnoituksen ("castellum quod dicitur Lucilinburhuc"), eli hän ei rakentanut linnaa vuonna 963. (b) PILVI-epävarmuus ratkaistu: en-wikin mukaan Bockin kasemateissa oli Neippergin 1744 laajennuksen jälkeen 25 tykkiasemaa ja kasarmitila jopa 1 200 sotilaalle. Luku "viisikymmentä tykkiä" koski luxtoday-sivulla ilmeisesti laajempaa kokonaisuutta.
- **Lähde:** https://en.wikipedia.org/wiki/Bock_(Luxembourg)

### Bockin kasematit — kenttä `lyhyt`
- **Vanha:** "Bockin kasematit avattiin yleisölle vuonna 1933, ja vuodesta 1994 ne ovat kuuluneet Unescon maailmanperintöön. Linnoitusten purkamisen jälkeen kaupungin alle on yhä seitsemäntoista kilometriä käytäviä, koska niitä ei voitu tuhota vahingoittamatta taloja niiden yläpuolella."
- **Uusi:** "Bockin kalliota ja vanhaakaupunkia yhdistää itävaltalaisten vuonna 1735 rakentama kaksikerroksinen Linnasilta, jonka voi ylittää neljää reittiä: tietä, kaarikäytävää, kierreportaita ja tunnelia. Linnoitusten purkamisen jälkeen kaupungin alle jäi silti seitsemäntoista kilometriä käytäviä, koska niitä ei voitu tuhota vahingoittamatta taloja niiden yläpuolella."
- **Syy:** Tyyppi 2: avaamisvuosi ja Unesco-merkintä ovat hallinnollista perustietoa. Ne korvattiin ilmasta näkyvällä Linnasillan yksityiskohdalla. Tarina 17 kilometristä säilyi. Nykytila tarkistettu: kasematit ovat auki 2026.
- **Lähde:** https://en.wikipedia.org/wiki/Bock_(Luxembourg) ; https://www.luxembourg-city.com/en/things-to-do/sights/underground

### Suurherttuan palatsi — kenttä `lyhyt`
- **Vanha:** "…Nykyään palatsi on suurherttuan virka-asunto, ja kesäisin opastetuilla kierroksilla pääsee näkemään esimerkiksi suurherttuan työhuoneen ja ruokasalin."
- **Uusi:** "…Nykyään palatsissa majoittuvat valtiovierailulla olevat ulkomaiset valtionpäämiehet, ja suurherttuan jouluaaton puhe lähetetään joka vuosi palatsin Keltaisesta salista."
- **Syy:** Tyyppi 2 ja 5: kävijäpalvelutieto vanhenee helposti. En-wikin mukaan kierroksia järjestetään vain "useimpina vuosina", ja vallanvaihto (suurherttua Henri luopui vallasta lokakuussa 2025) tekee kesäaukiolosta epävarman. Korvattu pysyvällä yksityiskohdalla. Ensimmäinen virke (käskynhaltija vuodesta 1817) säilyi.
- **Lähde:** https://en.wikipedia.org/wiki/Grand_Ducal_Palace,_Luxembourg

### Suurherttuan palatsi — kenttä `lahteet` (ei tekstimuutosta)
- 1554 räjähdys ("salama sytytti kirkon ullakolle varastoidun ruudin") vahvistettu: List of explosions ("barrels of gunpowder stored in a church attic") ja Timeline of Luxembourg City (fransiskaanikirkko; uusi kaupungintalo 1572). Lisätty lähde https://en.wikipedia.org/wiki/Timeline_of_Luxembourg_City

### Pétrusse — kentät `lyhyt` ja `syventava`
- **Vanha:** "Luxemburgin Pétrusse-joen laakso oli aikoinaan osa linnoitusta. Sen reunalla Perustuslain aukion alla kulkevat Pétrussen kasematit, ja aukio on espanjalaisten vuonna 1644 rakentaman bastionin laella. Aukiolla kohoaa myös kaatuneiden muistomerkki, Kultainen nainen." / syventava "Mitä Pétrussen kasemateissa on?"
- **Uusi:** "Luxemburgin Pétrusse-laakson reunalla, Perustuslain aukiolla, kohoaa obeliskin huipulla kultainen naishahmo, Gëlle Fra. Saksalaiset miehittäjät purkivat muistomerkin vuonna 1940, ja patsas oli kateissa neljäkymmentä vuotta, kunnes se löytyi vuonna 1980 piilotettuna kansallisen jalkapallostadionin pääkatsomon alta." / syventava "Kuka piilotti Kultaisen naisen?"
- **Syy:** Tyyppi 2: linnoitustopografia ja luettelo. Tyyppi 1: kasematit ovat jo Bockin kohteen aihe. Tyyppi 3: muistomerkki on en-wikin mukaan omistettu liittoutuneiden armeijoissa vapaaehtoisina palvelleille luxemburgilaisille, joten pelkkä "kaatuneiden muistomerkki" oli epätarkka. Syventava vaihdettu, koska kasematit eivät ole enää lyhyessä eivätkä tekstissä. Avattu lähde kertoo patsaan löytyneen piilotettuna, mutta ei sitä, kuka sen kätki, joten kysymys herättää uteliaisuutta ja sen oletus on tosi (live-vastaus voi kertoa tarkemmin).
- **Lähde:** https://en.wikipedia.org/wiki/G%C3%ABlle_Fra

### Muut tarkistukset (ei muutosta)
- "Murheellisten lohduttaja" (PILVI-epävarmuus): vahvistettu Loreton litanian suomenkielisestä tekstistä ("Syntisten turva, Murheellisten lohduttaja, Kristittyjen auttaja") — https://opusdei.org/fi-fi/article/loreton-litania/ . Katedraalin lyhyen väitteet (kulkue 8.12.1624, kahden viikon oktaavi) vahvistettu: https://en.wikipedia.org/wiki/Our_Lady_of_Luxembourg
- Katedraalin teksti (1613, 1870, laajennus 1935–1938, keskitorni kolmannes muiden korkeudesta, Juhana Sokea kryptassa) vahvistettu: https://en.wikipedia.org/wiki/Notre-Dame_Cathedral,_Luxembourg
- Guillaume II:n aukion patsaan vuosi 1884 vahvistettu (bkdh.nl). En-wikin Place Guillaume II -artikkeli väittää patsaan paljastetun 1844, mikä on ilmeinen virhe Wikipediassa (Vilhelm II kuoli 1849), joten tekstin 1884 jätettiin ennalleen. Knuedler-nimen selitys on lähteissä tosiasia, ei kansanetymologia.
- Thüngenin linnake: 1732–1733, Thüngen, 1867, rekonstruktio 1990-luvulla, museo 2012 vahvistettu (en-wiki Fort Thüngen).
- Pétrussen ennallistaminen: ensimmäinen vaihe valmistui vuoden 2024 lopussa, ja toinen vaihe kestää keväästä 2025 noin kaksi ja puoli vuotta, joten "työ jatkuu" pitää vuonna 2026 (paperjam.lu / hakuote). **Päätoimittajalle:** virke vanhenee noin vuonna 2028.
- Teemat: Bockin ja Pétrussen lyhyet eivät enää kerro molemmat kasemateista.
- Avaus: 36 sanaa, ilmakuva (kallioniemi, rotkot, sillat), alkaa "Tervetuloa" — ei korjattavaa.

## Košice

### Pyhän Elisabetin katedraali — kenttä `lyhyt`
- **Vanha:** "Pyhän Elisabetin katedraalin pohjoistorni kohoaa noin kuuteenkymmeneen metriin, ja sen kapeita kiviportaita pääsee näköalatasanteelle. Pohjoisen sisäänkäynnin yllä on veistetty kuva viimeisestä tuomiosta ja kahdentoista apostolin patsaat. Kirkkoon mahtuu yli viisituhatta ihmistä."
- **Uusi:** "Pyhän Elisabetin katedraalin seinällä on vesikouru, jota kutsutaan juopuneeksi naiseksi, ja kansantarinan mukaan se esittää rakennusmestarin viinaan menevää vaimoa. Toinen tarina kertoo, että rakentajat kätkivät kirkkoon onton kiven. Kukaan ei tiedä sen paikkaa, mutta jos kivi katoaa, koko kirkko sortuu."
- **Syy:** Tyyppi 2. Vanha versio oli pelkkää perustietoa: tornin korkeus, portaali ja kävijämäärä. Uusi kertoo kaksi kirkon omaa kansantarinaa, ja ne on esitetty tarinoina eikä tosiasioina. Tornin, portaalin ja kävijämäärän lähteet poistettiin.
- **Lähde:** https://en.wikipedia.org/wiki/Cathedral_of_St._Elizabeth (osio Legends: "gargoyle of the drunk woman… master builder's alcoholic wife", "hollow stone… Were the stone to be lost, the whole cathedral would fall")

### Košicen kansallisteatteri — kenttä `lyhyt`
- **Vanha:** "Kansallisteatterin näyttämö on muodoltaan lyyran mallinen, ja sisätiloja koristaa runsas stukkityö. Katon maalauksissa nähdään myös Kuningas Lear ja Kesäyön uni. Julkisivuja koristavat teatteriaiheiset veistosryhmät, ja kupolin yllä kohoaa aamunkoittoa esittävä patsas."
- **Uusi:** "Kansallisteatteri rakennettiin keskiaikaisen raatihuoneen paikalle. Kaupungin edellinen kivinen teatteri oli avattu vuonna 1788, mutta se suljettiin turvallisuussyistä vuonna 1894. Syyskuussa 1924 talon uusi slovakialainen teatteri aloitti Ján Chalupkan komedialla Kocúrkovo, joka pilkkaa pikkukaupungin ahdasmielisyyttä."
- **Syy:** Tyypit 1 ja 2. Lyhyt jatkoi saman kohteen tekstin Shakespeare-kattomaalauksia ("myös Kuningas Lear…"), ja se oli pelkkää sisustuksen kuvailua. Veistosryhmiä ja aamunkoittopatsasta ei myöskään löytynyt avatusta TASR-lähteestä, joten niiden lähde poistettiin. Uusi versio kertoo talon historiasta.
- **Lähde:** https://www.teraz.sk/kultura/kosice-divadlo-narodne-historia/97912-clanok.html ("na mieste niekdajšej stredovekej radnice", 1788, "V roku 1894 budovu z bezpečnostných dôvodov uzavreli", "Prvou premiérou novej divadelnej scény bola 13. septembra 1924 hra od Jána Chalupku Kocúrkovo"); https://en.wikipedia.org/wiki/J%C3%A1n_Chalupka (komedia, satiiri paikallispatriotismista ja ahtaista elämänpäämääristä)

### Hlavná-katu — kenttä `lyhyt`
- **Vanha:** "Pääkadun varrella on suurin osa kaupungin tärkeimmistä historiallisista kohteista. Joulukuussa 2002 kadulle paljastettiin yli kolmen metrin korkuinen pronssinen vaakunapatsas. Se muistuttaa, että kuningas Ludvig Suuri myönsi Košicelle vuonna 1369 vaakunan ensimmäisenä kaupunkina Euroopassa."
- **Uusi:** "Pääkadun eteläosassa seisoo yli kolmen metrin korkuinen pronssienkeli, joka kannattelee kaupungin vaakunaa. Patsas paljastettiin joulukuussa 2002 muistoksi siitä, että kuningas Ludvig Suuri antoi Košicelle vuonna 1369 vaakunakirjeen ensimmäisenä kaupunkina Euroopassa. Vuoteen 1502 mennessä kaupunki oli saanut vaakunakirjeen neljältä eri hallitsijalta."
- **Syy:** Tyypit 2 ja 3. Täytevirke ("suurin osa kohteista") korvattiin näkyvällä yksityiskohdalla, eli patsas on enkeli, joka pitää vaakunaa. Vivahde tarkennettiin lähteen mukaiseksi: Košice sai ensimmäisenä kuninkaallisen vaakunakirjeen (royal warrant). Lisäksi kerrotaan neljästä vaakunakirjeestä.
- **Lähde:** https://slovakia.travel/en/the-memorial-of-the-coat-of-arms-of-kosice ; https://www.kosice.sk/city/the-arms-of-kosice-city

### Laulava suihkulähde — kenttä `teksti`
- **Vanha:** "…ja lähdettä pidetään entisen Tšekkoslovakian vanhimpana laatuaan."
- **Uusi:** "…ja se on yksi entisen Tšekkoslovakian ensimmäisistä laulavista suihkulähteistä."
- **Syy:** Tyyppi 3, superlatiivi. Myös Mariánské Lázněn laulava suihkulähde valmistui vuonna 1986 ja soi ensimmäisen kerran samana vuonna. Tšekkiläisen hakutuloksen mukaan se soi jo 30.4.1986, ja Košicen lähde avattiin 1.5.1986, joten "vanhin" ei kestä.
- **Lähde:** https://www.kudyznudy.cz/aktuality/jedte-do-marianskych-lazni-na-podzimni-slavnosti-a ; https://www.kamnavylet.sk/en/attraction/singing-fountain-and-carillon (sivun kommenteissakin kiistetään "vanhin")

### Laulava suihkulähde — kenttä `lyhyt`
- **Vanha:** "Laulava suihkulähde otettiin uudelleen käyttöön huhtikuussa 2024 sen historian suurimman uudistuksen jälkeen. Nyt siinä on neljäkymmentäkolme pumppua ja seitsemänsataaviisikymmentä suutinta, ja keskimmäinen suihku nousee kahdenkymmenenneljän metrin korkeuteen. Suihkujen muodostamaan vesiverhoon voidaan heijastaa myös kansallisteatterin esityksiä."
- **Uusi:** "Laulavan suihkulähteen idean toi Košiceen vuonna 1986 pormestari Rudolf Schuster, joka nousi myöhemmin Slovakian presidentiksi. Nykyään uudistetun lähteen keskimmäinen suihku nousee kahdenkymmenenneljän metrin korkeuteen, ja suihkujen vesiverhoon voidaan heijastaa kansallisteatterin esityksiä."
- **Syy:** Tyypit 2 ja 1. Pumppujen ja suuttimien määrä on teknistä tietoa, ja ne korvattiin ihmisellä. Myös uudistusta korostava aloitus poistettiin, koska saman kohteen teksti kertoo jo uudistuksesta.
- **Lähde:** https://sita.sk/spievajuca-fontana-v-kosiciach-je-opat-v-prevadzke-podla-primatora-je-najmodernejsiou-v-europe-a-jedina-s-umelou-inteligenciou-videofoto/ (Schuster "priniesol myšlienku… v roku 1986", 24 m) ; https://en.wikipedia.org/wiki/Rudolf_Schuster ; https://enrsi.stvr.sk/articles/news/361472/fountain-in-kosice-city-centre-sings-again (vesisumuun heijastetut teatteriesitykset)

### Laulava suihkulähde — kenttä `kysymykset`
- **Vanha:** "Mihin suihkulähteen tekoälyä käytetään?"
- **Uusi:** "Mitä suihkulähteen uudistuksessa muutettiin?"
- **Syy:** Tyyppi 7. Tekoäly on vain pormestarin mainoslause ("ainoa tekoälyllä"), eikä mikään lähde kerro, mitä se tekee. Oletuksen todenperäisyys oli siis epävarma.
- **Lähde:** sama sita.sk-artikkeli

### Laulava suihkulähde — kenttä `lahteet`
- Suunnittelija Peter Sceranka vahvistettiin Košicen virallisen matkailuorganisaation sivulta. Tämä ratkaisee PILVI-RAPORTIN epävarmuuden. Kupi.com-lähde (403) korvattiin osoitteella https://visitkosice.org/en/namapke/refresh-yourself-at-the-fountains-of-kosice-part-1 ("Košice sculptor Petr Sceranka").
- U. S. Steel Košicen sivusto on siirtynyt Nippon Steelin alle (usske.sk ohjaa uuteen osoitteeseen). URLit päivitettiin osoitteisiin https://www.sk.nipponsteel.com/en/article/kosice-steel-again-helped-make-the-city-alive (venttiilit 1986, miljoona euroa) ja https://www.sk.nipponsteel.com/en/article/the-fountain-also-lives-thanks-to-metallurgists. Tekstin "terästehtaan säätiö" pysyy oikeana.

### Jakabin palatsi — kenttä `teksti`
- **Vanha:** "Myöhemmin kaupunki kiisteli talon omistuksesta yli kaksikymmentä vuotta, eikä palatsia voitu sinä aikana avata yleisölle."
- **Uusi:** "Myöhemmin talon omistuksesta on käyty oikeutta yli kaksikymmentä vuotta, ja kiistan vuoksi palatsi on pysynyt pitkään suljettuna."
- **Syy:** Tyyppi 5. Imperfekti antoi ymmärtää, että kiista on ohi. Kiista jatkuu kuitenkin edelleen: maaliskuussa 2025 korkein oikeus kumosi aluetuomioistuimen vuoden 2021–2022 päätöksen, jossa talo annettiin perillisille, ja palautti asian uudelleen käsiteltäväksi. Palatsi on suljettu. Uusi muotoilu ei vanhene, vaikka kiista ratkeaisi.
- **Lähde:** https://www.kosice.sk/clanok/najvyssi-sud-priblizil-jakabov-palac-kosicanom-rozhodne-krajsky-sud (7.3.2025)

### Jakabin palatsi — kenttä `lahteet`
- Rakentajat ratkaistu (PILVI-RAPORTIN epävarmuus): unkarilainen perintörekisteri vahvistaa veljekset Árpád ja Géza Jakabin, ja kaupungin sivu nimeää ensimmäiseksi omistajaksi Árpád Jakabin. "Peter Jakab" esiintyy vain matkailusivuilla. Teksti pysyi ennallaan.
- Spectatorin URL (maksumuuri, ei avattavissa) ja Hungaricana (403) korvattiin osoitteilla https://hunektar.sk/en/records/jakab-palota (veljekset, tuomiokirkon kiviveistokset, myllypuro kuivattu 1968, myynti Barkányille 1908) ja https://www.kosice.sk/city/jacabs-palace (tuomiokirkon kivet, presidentin asuinpaikka huhti–toukokuussa 1945).

### Itä-Slovakian museo — kenttä `teksti`
- **Vanha:** "Talo valmistui vuonna 1901 arkkitehti Ödön Lechnerin suunnitelmien mukaan,"
- **Uusi:** "Talo valmistui vuonna 1901 budapestilaisen arkkitehdin suunnitelmien mukaan,"
- **Syy:** Tyyppi 3. Arkkitehdin nimi ei kestänyt tarkistusta. Explorecarpathia nimeää Lechner Ödönin, mutta unkarilainen perintörekisteri hunektar.sk nimeää budapestilaisen Lechner Jenőn. Unkarinkielisen Wikipedian Lechner Ödönin teosluettelossa ei ole mitään Kassassa, eikä en- tai sk-Wikipedia nimeä arkkitehtia. Kaikki lähteet ovat yhtä mieltä vain siitä, että arkkitehti oli budapestilainen.
- **Lähde:** https://hunektar.sk/en/records/felso-magyarorszagi-rakoczi-muzeum ; https://www.explorecarpathia.eu/en/hungary/kassa-kosice/former-museum-of-upper-hungary-now-east-slovakian-museum ; https://hu.wikipedia.org/wiki/Lechner_%C3%96d%C3%B6n

### Itä-Slovakian museo — kenttä `kysymykset`
- **Vanha:** "Kuka arkkitehti Ödön Lechner oli?"
- **Uusi:** "Kuka suunnitteli museon päärakennuksen?"
- **Syy:** Tyyppi 7. Kysymyksen oletus (Lechner Ödön arkkitehtina) on epävarma.
- **Lähde:** kuten yllä

### Itä-Slovakian museo — kenttä `lyhyt`
- **Vanha:** "Itä-Slovakian museo perustettiin Ylä-Unkarin museona, ja vuonna 1906 se nimettiin Ferenc Rákóczin mukaan, kun ruhtinas oli haudattu uudelleen tuomiokirkkoon. Aukio museon edessä on nimetty Euroopan vanhimman maratonin mukaan, jota on juostu vuodesta 1924."
- **Uusi:** "Itä-Slovakian museo sai vuonna 1906 Ferenc Rákóczin nimen, kun ruhtinaan jäänteet tuotiin Košiceen ja museo järjesti hänen muistoesineistään näyttävän näyttelyn. Aukio museon edessä on nimetty Euroopan vanhimman maratonin mukaan, jonka ensimmäiset juoksijat lähtivät vuonna 1924 Turňan linnanraunioiden juurelta."
- **Syy:** Tyyppi 2. Vanha versio kertoi organisaation nimenmuutoksista. Uusi kertoo tapahtumasta, eli ruhtinaan muistoesineiden näyttelystä, ja ensimmäisen maratonin yllättävästä lähtöpaikasta.
- **Lähde:** https://hunektar.sk/en/records/felso-magyarorszagi-rakoczi-muzeum ("a spectacular exhibition of the prince's relics was organized and the institution was renamed") ; https://en.wikipedia.org/wiki/Ko%C5%A1ice_Peace_Marathon ("began beneath the ruins of Turňa Castle")

### Itä-Slovakian museo — kenttä `lahteet`
- Holvia koskeva väite "holvi rakennettiin 1969" ei löytynyt Wikipediasta. Lähteeksi päivitettiin, että aarre on museon holviosastolla (Wikipedia, Košice gold treasure). Tekstin "museon alle rakennetussa holvissa" säilyi, koska holviosaston olemassaolo vahvistui.

### Miklušin vankila — kenttä `teksti`
- **Vanha:** "…kahdesta goottilaisesta porvaristalosta, jotka rakennettiin 1200- ja 1300-lukujen vaihteessa." / "…vankilanhoitaja Miklóssylta, joka johti vankilaa lähes neljäkymmentä vuotta 1800-luvun jälkipuoliskolla."
- **Uusi:** "…kahdesta goottilaisesta porvaristalosta, joista vanhempi rakennettiin 1200- ja 1300-lukujen vaihteessa." / "…vankilanhoitaja Miklóssylta, joka hoiti vankilaa 1800-luvun jälkipuoliskolla."
- **Syy:** Tyyppi 3. Medievalheritage.eu:n mukaan vain itäinen talo on 1200- ja 1300-lukujen vaihteesta, ja läntinen on 1400-luvun alkupuoliskolta. "Lähes neljäkymmentä vuotta" (1861–1899) ei vahvistunut mistään avatusta lähteestä. TASR ja tutkimus kertovat vain, että Miklóssy hoiti vankilaa 1800-luvun jälkipuoliskolla, ja hänet tunnetaan lähteistä 1860-luvulta alkaen.
- **Lähde:** https://medievalheritage.eu/en/main-page/heritage/slovakia/kosice-prison-of-miklusz/ ; https://www.teraz.sk/regiony/miklusovu-vaznicu-caka-rozsiahla-obn/871232-clanok.html

### Miklušin vankila — kenttä `lyhyt`
- **Vanha:** "…juuri ennen kuin Gábor Bethlenin joukot valtasivat kaupungin. Vuodesta 1872 rakennus oli kaupungin poliisin vankila. Museon kierrokseen on kuulunut pyövelin asunto, jossa on esillä mestaajien miekkoja."
- **Uusi:** "…juuri ennen kuin Gábor Bethlenin joukot valtasivat kaupungin. Pyövelin asunto rakennettiin vankilan viereen luultavasti 1600-luvun jälkipuoliskolla, ja myöhemmin se liitettiin suoraan vankilaan. Museossa on ollut esillä Košicen pyövelien alkuperäisiä miekkoja."
- **Syy:** Tyypit 2 ja 5. Poliisivankila 1872 on hallinnollinen tieto, eikä sitä löytynyt avatuista lähteistä. Lisäksi lauseessa "on kuulunut… jossa on esillä" aikamuodot olivat ristiriidassa, koska museo on suljettu korjauksen ajaksi. Uusi muoto ei vanhene.
- **Lähde:** https://www.kamnavylet.sk/en/attraction/miklus-s-prison-and-executioner-s-apartment ("probably built in the second half of the 17th century… later connected", "original swords of Košice executioners")

### Miklušin vankila — kenttä `kysymykset`
- **Vanha:** "Ketä vankilassa pidettiin vangittuna?"
- **Uusi:** "Keitä vankilaan suljettiin?"
- **Syy:** Tyyppi 6. Vanhassa muodossa oli toisto (vankilassa – vangittuna) ja yksikkö "ketä".
- **Lähde:** —

### Miklušin vankila — kenttä `lahteet`
- Valmistuminen kesällä 2027 ei näkynyt vanhassa teraz.sk-lähteessä (elokuu 2023). Se korvattiin TASR:n 14.4.2025 artikkelilla ("približne v júni 2027"), joka on linkitetty yllä. Tekstin "kesällä 2027" pitää paikkansa.

### Ei muutettu, tarkistettu
- Urbanin torni: Wikipedia vahvisti kaikki väitteet (36 hautakiveä, roomalainen 300-luvulta, Illenfeld 1557, palo 1966, avattiin uudelleen 1971, VSŽ:n jäljennös 1996, vaurioitunut kello tornin edessä).
- Hlavná-kadun teksti: Wikipedia vahvisti ruttopylvään (14 m, 1723, hirsipuun paikka, rutto 1709–1710) ja jalankulkualueen (1984, Schuster, Wuppertal). Ruttopylvään sijainti "kadun pohjoisosassa" on ratkaistu: katu haarautuu pohjoisessa Immaculatan kohdalla (Wikipedia, Plague Column). Teatterin nimen palautus 1.5.2023 ja sen aiempi nimi Národné divadlo 1946–1955 vahvistuivat (sita.sk, teraz.sk).
- Kulta-aarteen tiedot (24.8.1935, Hlavná 68, 2 920 kolikkoa, suurin Slovakiasta löydetty) vahvistuivat, samoin museon avoinna olo.
- Avaus: 37 sanaa, alkaa sanalla "Tervetuloa" ja käyttää ilmasta nähtävää kuvaa (Hornádin laakso, kukkulat, punaiset katot, pääkatu). Ei muutoksia.

## Krakova

### Wawelin linna — kenttä `lyhyt`
- **Vanha:** "Wawelin linnan kuuluisimpia aarteita on kuningas Sigismund Augustin kuvakudoskokoelma, joka kudottiin Brysselissä 1500-luvun puolivälissä. Se on suurin koskaan yhden hallitsijan tilaama kuvakudoskokoelma. Linna on Puolan vierailluin taidemuseo, ja vuonna 2025 siellä kävi lähes kolme ja puoli miljoonaa ihmistä."
- **Uusi:** "Wawelin linnan Päiden saliksi kutsutun huoneen katossa on kolmekymmentä lehmuspuusta veistettyä päätä, eikä yksikään niistä ole samanlainen. Yhden naisen suu on peitetty siteellä. Tarinan mukaan pää huomautti kerran latinaksi kuningas Sigismund Augustille, että tämän tuomio oli epäoikeudenmukainen."
- **Syy:** Tyypit 2 ja 7/5. Kävijämäärä on ohjeessa nimenomaan kielletty, ja se vanhenee vuosittain. Kuvakudosten superlatiivi oli perustietoa. Kokeilin ensin kuvakudosten sotapakotarinaa (Kanada 1939–1961), mutta se olisi toistanut Mariankirkon uuden alttaritaulutarinan rakennetta (aarre pakoon toista maailmansotaa). Siksi tilalle valittiin Wawelin päiden legenda.
- **Lähde:** https://wawel.krakow.pl/images/upload/blog/infografiki/pdf/legenda-o-glowie-2.pdf (Wawelin linnan oma aineisto: "Sala pod Głowami", "Żadna z trzydziestu… głów nie jest tam taka sama", "dlaczego jedna z nich ma zakryte usta", "KOBIETA Z PODWIKĄ NA USTACH", kuningas Zygmunt August, "niesprawiedliwy wyrok", "W jakim języku odezwała się głowa?") ; https://pl.wikipedia.org/wiki/G%C5%82owy_wawelskie (194 alkuperäistä, 30 säilynyttä)

### Mariankirkko — kenttä `lyhyt`
- **Vanha:** "Mariankirkon pääalttarin takana on Veit Stossin veistämä alttarikaappi, maailman suurin goottilainen alttaritaulu. Se on kolmetoista metriä korkea ja yksitoista metriä leveä. Kuvanveistäjä työsti sitä vuodesta 1477 vuoteen 1489, ja siinä on yli kaksisataa maalattua ja kullattua hahmoa."
- **Uusi:** "Mariankirkon pääalttarina on Veit Stossin 1400-luvun lopulla veistämä alttaritaulu. Puolalaiset purkivat sen osiin juuri ennen toista maailmansotaa ja piilottivat eri puolille maata, mutta saksalaiset löysivät laatikot ja veivät ne Nürnbergin linnan kellariin. Alttaritaulu palasi Krakovaan vuonna 1946."
- **Syy:** Tyypit 2 ja 3. Vanha versio oli luettelo mitoista, vuosista ja hahmojen määrästä. Superlatiivia "maailman suurin goottilainen alttaritaulu" ei löytynyt alttaritaulun eikä basilikan Wikipedia-artikkelista. Uusi versio kertoo taulun vaiheista sodassa.
- **Lähde:** https://en.wikipedia.org/wiki/Veit_Stoss_altarpiece_in_Krak%C3%B3w ("A few weeks prior to the outbreak… disassembled", "basement of the Nuremberg Castle", "returned to Poland in 1946")

### Sukiennice (kauppahalli) — kenttä `lyhyt`
- **Vanha:** "Kangashalli Sukiennicen yläkertaan perustettiin vuonna 1879 Puolan ensimmäinen kansallismuseo. Nykyään siellä on 1800-luvun puolalaisen maalaustaiteen galleria, jossa on esillä muun muassa Jan Matejkon, Henryk Siemiradzkin, Jacek Malczewskin ja Józef Chełmońskin teoksia."
- **Uusi:** "Kangashalli Sukiennicen yläkertaan perustettiin vuonna 1879 Krakovan kansallismuseo. Sen ensimmäinen teos oli Henryk Siemiradzkin valtava maalaus Neron soihdut, jonka taiteilija lahjoitti kaupungille. Pian lahjoituksia alkoi virrata myös aatelisilta ja muilta taiteilijoilta, ja nykyään yläkerrassa on 1800-luvun puolalaisen maalaustaiteen galleria."
- **Syy:** Tyypit 2 ja 3. Nimiluettelo korvattiin museon syntytarinalla. Väite "Puolan ensimmäinen kansallismuseo" ei löytynyt Sukiennice Museum- eikä National Museum in Kraków -artikkelista, joten se muutettiin muotoon "Krakovan kansallismuseo".
- **Lähde:** https://en.wikipedia.org/wiki/Sukiennice_Museum ("established on October 7, 1879", Siemiradzki "offered his monumental painting called Nero's Torches as gift to the city", lahjoitukset aatelisilta ja taiteilijoilta) ; https://en.wikipedia.org/wiki/National_Museum,_Krak%C3%B3w

### Kazimierz — kenttä `lyhyt`
- **Vanha:** "…puolikkaasta patongista tehtyä lämmintä voileipää. Kaupunginosan Vanha synagoga on yksi maailman vain kahdesta säilyneestä goottilaisesta synagogasta, ja se rakennettiin 1500-luvun alussa."
- **Uusi:** "…puolikkaasta patongista tehtyä lämmintä voileipää. Halli valmistui vuonna 1900 katetuksi kauppahalliksi, ja vuodesta 1927 sen osassa toimi rituaalinen siipikarjateurastamo aina saksalaisten miehitykseen asti."
- **Syy:** Tyypit 1 ja 3. Saman kohteen teksti kertoo jo Vanhasta synagogasta. Lisäksi Wikipedia ei vahvista väitettä "yksi kahdesta goottilaisesta synagogasta", ja rakennusajaksi se antaa 1407–1570 eikä "1500-luvun alkua". Tilalle kerrotaan saman pyöreän hallin oma historia.
- **Lähde:** https://krakow.pl/instcbi/1362/inst/8124/2396/Plac-Nowy.html (rakennettu 1899–1900 katetuksi kauppahalliksi, "Od 1927 r. w jego części działała rytualna rzeźnia drobiu, zlikwidowana podczas okupacji") ; https://en.wikipedia.org/wiki/Old_Synagogue_(Krak%C3%B3w)

### Kazimierz — kenttä `teksti`
- **Vanha:** "…joka on toiminut juutalaisen historian ja kulttuurin museona vuodesta 1961."
- **Uusi:** "…joka on toiminut juutalaisen historian ja kulttuurin museona vuodesta 1958."
- **Syy:** Tyyppi 3. Kaupungin virallinen sivu ("Oddział muzealny działa tu od 1958 r.") ja Wikipedia ("Since 1958") antavat vuoden 1958. Muzeum Krakowan sivu vahvistaa, että synagoga on nyt avoinna (tyyppi 5).
- **Lähde:** https://krakow.pl/instcbi/15664/inst/11541/981/Muzeum-Krakowa-Stara-Synagoga.html ; https://muzeumkrakowa.pl/oddzialy/stara-synagoga

### Florianin portti — kenttä `lyhyt`
- **Vanha:** "Florianin portin viereen jäi pätkä keskiaikaista kaupunginmuuria ja kaksi pienempää puolustustornia. Muurin kylkeen ripustetaan nykyään maalauksia, joita taiteilijat myyvät ohikulkijoille, ja portin alta Florianinkatu johtaa suoraan pääaukiolle, samaa reittiä kuin kruunajaiskulkueet aikanaan."
- **Uusi:** "Florianin portin viereisen muurin kylkeen ripustetaan nykyään maalauksia, joita taiteilijat myyvät ohikulkijoille. Portin pohjoisseinän kivisen kotkan veisti vuonna 1882 Zygmunt Langman taidemaalari Jan Matejkon suunnitelman mukaan, ja eteläseinää koristaa 1700-luvulta peräisin oleva pyhän Florianin reliefi."
- **Syy:** Tyyppi 1. Muurinpätkä toisti saman kohteen tekstiä ("lyhyt pätkä vanhaa kaupunginmuuria"), ja kruunajaiskulkueiden reitti toisti sekä tekstiä että Barbakaanin lyhyttä ("kuninkaallisen tien alkupää"). Tilalle tuli portin oma näkyvä yksityiskohta.
- **Lähde:** https://en.wikipedia.org/wiki/St._Florian%27s_Gate ("a stone eagle that was carved in 1882 by Zygmunt Langman, based on a design by painter Jan Matejko", "an 18th-century bas-relief of St. Florian", viereisillä muureilla myytävää taidetta)

### Barbaakani — kenttä `lyhyt`
- **Vanha:** "Barbakaani välttyi purkamiselta 1800-luvun alussa, kun lähes kaikki Krakovan linnoitukset hajotettiin ja niiden paikalle tehtiin Plantyn puisto. Sisältä linnakkeen halkaisija on runsaat kaksikymmentäneljä metriä, ja se suojasi aikanaan kuninkaallisen tien alkupäätä."
- **Uusi:** "Barbakaanin itäseinän muistolaatta kertoo krakovalaisesta porvarista Marcin Oracewiczista. Hän puolusti kaupunkia venäläisiä vastaan Barin konfederaation aikana 1700-luvulla, ja tarinan mukaan hän ampui venäläisen everstin Paninin, kun oli ladannut aseensa luodin sijaan takkinsa napilla."
- **Syy:** Tyypit 1 ja 2. Kuninkaallinen tie toistui Florianin portin lyhyessä, ja purkamiselta pelastuminen toistui Florianin portin tekstissä. Halkaisija on teknistä tietoa. Uusi versio kertoo ihmisestä, ja nappilegenda on merkitty tarinaksi. Plantyn puiston lähde poistettiin tarpeettomana. `nimi` säilyi pohjan mukaisena ("Barbaakani"), mutta tekstissä käytetään oikeaa muotoa Barbakaani.
- **Lähde:** https://en.wikipedia.org/wiki/Krak%C3%B3w_Barbican ("On its eastern wall, a tablet commemorates the feat of a Kraków burgher, Marcin Oracewicz… shot their Colonel Panin, according to a legend, using a czamara button instead of a bullet")

### Ei muutettu, tarkistettu
- Wawelin katedraalin lyhyt (Sigismundin kello) ja Rynek Głównyn lyhyt (Mickiewicz ja szopka-kilpailu) ovat tarinoita eivätkä päällekkäisiä. Kierroksen kahdeksan lyhyttä luettiin peräkkäin korjausten jälkeen: päiden legenda, Sigismundin kello, Okrąglak, szopka, kansallismuseon synty, alttaritaulun sotavaiheet, Matejkon kotka ja Oracewiczin nappi.
- Mariankirkon torni (PILVI-RAPORTIN epävarmuus): Wikipedian basilika-artikkelissa kirkon korkeus on 80 m ja korkeamman tornin vanhassa lähteessä 82 m, joten tekstin "yli kahdeksankymmentä metriä" ja korkeus_m 82 jäivät ennalleen. Hejnał soi Wikipedian mukaan ympäri vuorokauden joka päivä, ja keskipäivän soitto lähetetään Polskie Radio Jedynkassa.
- Raatihuoneen tornin rakennusaika on 1300-luvun loppu (Wikipedia), joten "1300-luvun raatihuoneesta" pitää paikkansa. Collegium Maiusin kellon soittoajat 9, 11, 13, 15 ja 17 ja hahmot vahvistettiin maius.uj.edu.pl:stä.
- Jan Olbracht: suomenkielistä vakiintunutta nimeä ei edelleenkään löytynyt (fi-Wikipedian sivuja ei ole kummallakaan muodolla), joten puolalainen muoto jäi.
- Avaus: 37 sanaa, alkaa sanalla "Tervetuloa" ja käyttää ilmasta nähtävää kuvaa (soikea vanhakaupunki, puistorengas, tori, Wawelin kukkula Veikselin mutkassa). Ei muutoksia.

### Epävarmuudet Päätoimittajalle
- Košice, Itä-Slovakian museo: arkkitehti on Lechner Ödön tai Lechner Jenő, ja lähteet ovat ristiriidassa. Tekstissä on "budapestilainen arkkitehti". Jos Päätoimittaja löytää ratkaisevan lähteen, nimi voidaan palauttaa.
- Krakova, Wawelin päät: Wawelin oma aineisto vahvistaa siteellä peitetyn naisen pään, kuningas Sigismund Augustin ja epäoikeudenmukaisen tuomion. Kielen se vahvistaa vain kysymyksenä ("Missä kielessä pää puhui? Onko kieli yhä käytössä?"). Latinankieliset sanat "Rex Auguste, iudica iuste" esiintyvät Wawelia lainaavassa hakuotteessa, jota en saanut avattua. "Latinaksi" on siksi hyvin todennäköinen mutta ei sanatarkasti lähteestä.
- Krakova, Barbakaani: vakiintunutta suomenkielistä nimeä Jan Olbrachtille ei löytynyt.

## Madrid

Tarkistin: 0 virhettä, 13 huomiota (12 × "ei ala paikan nimellä" suomenkielisen etusanan takia, 1 × "avaus puuttuu"), sama määrä kuin ennen.

### Retiron puisto — kenttä `lyhyt`
- **Vanha:** "Retiron puiston lasinen Kristallipalatsi rakennettiin vuonna 1887 Filippiinien kasveja esittelevän näyttelyn kasvihuoneeksi, ja nykyään siinä on taidenäyttelyitä. Isoisäsi kirjoitti vuonna 1873, että kuningattaren entinen puisto kuului nyt kaupungille ja että tähän seuraan pääsi ilman esittelyä."
- **Uusi:** "Retiron puiston lasinen Kristallipalatsi koottiin vuonna 1887 valmiista osista vain viidessä kuukaudessa Filippiinien kasveja esittelevää näyttelyä varten. Puiston suihkulähteellä seisoo Ricardo Bellverin Langennut enkeli, joka on kuuluisa harvinaisena paholaista esittävänä veistoksena, ja suihkulähteen kerrotaan olevan kuudensadankuudenkymmenenkuuden metrin korkeudella."
- **Syy:** Tyyppi 5: Kristallipalatsi on ollut suljettuna restauroinnin vuoksi vuodesta 2024, ja sulku jatkuu vuoteen 2027, joten "nykyään siinä on taidenäyttelyitä" ei pidä. Uusi muotoilu ei väitä mitään nykytilasta. Tyyppi 1: isoisä mainittiin sekä tekstissä että lyhyessä, ja lyhyen "puisto kuului nyt kaupungille" toisti tekstin virkkeen "vuoteen 1868, jolloin siitä tuli kaupungin puisto". Isoisä jää vain tekstiin (kuten Pariisin mallin Louvressa), ja sielläkin vain merkinnän sisällöllä (käyntikortti, vartija viittasi sisään katsomatta nimeä, mies teki tilaa penkillä). Isoisää ei mainita missään muussa kohteessa. 666 metriä on muotoiltu "kerrotaan"-sanalla.
- **Lähde:** https://www.timeout.es/madrid/es/noticias/el-palacio-de-cristal-del-retiro-estara-cerrado-por-obras-hasta-2027-082124 ; https://www.timeout.es/madrid/es/noticias/el-arte-vuelve-a-este-icono-centenario-del-parque-de-el-retiro-011025 ; https://museoreinasofia.es/en/museo/architectural-heritage/palacio-velazquez-palacio-cristal (viisi kuukautta, esivalmisteinen) ; https://en.wikipedia.org/wiki/Fountain_of_the_Fallen_Angel

### Retiron puisto — kenttä `kysymykset`
- **Vanha:** "Mitä Kristallipalatsissa on nyt esillä?"
- **Uusi:** "Mistä Kristallipalatsi sai mallinsa?"
- **Syy:** Tyyppi 7: vastaus vanhenee (rakennus on suljettu vuoteen 2027). Uusi kysymys koskee Lontoon Kristallipalatsia mallina, ja museon sivu vahvistaa sen.
- **Lähde:** https://museoreinasofia.es/en/museo/architectural-heritage/palacio-velazquez-palacio-cristal

### Prado-museo — kenttä `lyhyt`
- **Vanha:** "… Paroni Émile d’Erlanger lahjoitti ne museolle vuonna 1881. Las Meninasissa Velázquezin rinnassa näkyvä ritarikunnan risti lisättiin kuvaan vasta vuoden 1659 jälkeen."
- **Uusi:** "Prado-museon kokoelmiin kuuluvat Goyan synkät mustat maalaukset, jotka hän maalasi alun perin talonsa seiniin. Paroni Émile d’Erlanger siirrätti ne vuodesta 1874 alkaen seiniltä kankaalle ja aikoi myydä ne Pariisin maailmannäyttelyssä, mutta lahjoitti ne lopulta Espanjan valtiolle vuonna 1881."
- **Syy:** Tyyppi 1: Las Meninas toistui kierroksella kahdesti (Prado-lyhyt ja Kuninkaanlinna-lyhyt), ja lisäksi Pradon teksti kertoo Las Meninasista. Tyyppi 3: d’Erlanger lahjoitti maalaukset Espanjan valtiolle, ei museolle.
- **Lähde:** https://en.wikipedia.org/wiki/Black_Paintings

### Kuninkaanlinna — kenttä `teksti`
- **Vanha:** "Kuningas Filip viides halusi tilalle palatsin, joka ei voisi palaa, ja se rakennettiin kivestä ja tiiliholveista ilman puuta."
- **Uusi:** "Kuningas Filip viides halusi tilalle tulenkestävän palatsin, joten se muurattiin kivestä ja tiilestä holvikatoin, ja puuta käytettiin vain ovissa, ikkunoissa ja katon rakenteissa."
- **Syy:** Tyyppi 3, ja samalla ratkaistu edellisen tarkistajan epävarmuus, joka nojasi matkailusivuun. Espanjankielisen Wikipedian mukaan puuta käytettiin vähän mutta ei ollenkaan "ilman puuta": puusepäntöissä ja vesikaton rakenteissa sitä oli.
- **Lähde:** https://es.wikipedia.org/wiki/Palacio_Real_de_Madrid ; https://en.wikipedia.org/wiki/Royal_Palace_of_Madrid (Las Meninas heitettiin ikkunasta, 1738, 1764, suurin kuninkaanlinna: vahvistettu)

### Puerta del Sol — kenttä `lyhyt`
- **Vanha:** "Auringonportin aukion postitalo valmistui vuonna 1768, ja nykyään siinä on Madridin itsehallintoalueen presidentin virasto. Aukion laidalla seisoo …"
- **Uusi:** "Auringonportin aukion kattojen yllä loistaa sherrymerkki Tío Pepen neonmainos, joka palasi aukiolle vuonna 2014, kun yli viisikymmentätuhatta ihmistä oli allekirjoittanut vetoomuksen sen puolesta. Aukion laidalla seisoo vuodelta 1967 oleva patsas, jossa karhu kurkottaa mansikkapuuhun, sillä sama aihe on Madridin vaakunassa."
- **Syy:** Tyyppi 2: valmistumisvuosi ja virasto ovat hallintotietoa. Ne korvattiin tarinalla (mainos purettiin 2011, kansalaiskampanja keräsi yli 50 000 nimeä, ja mainos palasi 2014 aukion numeroon 11). Karhupatsas säilyi.
- **Lähde:** https://www.miradormadrid.com/?p=2995 ; https://donquijote.org/blog/tio-pepe-and-schweppes-two-iconic-madrid-brands

### Gran Vía — kenttä `teksti`
- **Vanha:** "Kadun itäpäässä, Alcalá-kadun kulmassa, Metrópolis-talon kupolin huipulla seisoo siivekäs voitonjumalatar."
- **Uusi:** "Talosta lähettivät sodan aikana juttujaan myös ulkomaiset kirjeenvaihtajat, kuten Ernest Hemingway ja Antoine de Saint-Exupéry."
- **Syy:** Tyyppi 1: saman kohteen lyhyt kertoo voitonjumalattaresta. Tekstin edellinen virke käsittelee Telefónican taloa, joten uusi virke jatkaa sitä.
- **Lähde:** https://en.wikipedia.org/wiki/Telef%C3%B3nica_Building (vahvistaa myös "Euroopan korkein pilvenpiirtäjä" ja tähystyspaikan)

### Plaza Mayor — kenttä `kysymykset`
- **Vanha:** "Miksi Filip kolmannen patsas kaadettiin?"
- **Uusi:** "Mitä Filip kolmannen patsaan sisältä löytyi?"
- **Syy:** Tyyppi 7 ja 3 (oletus ei ollut tosi): patsasta ei kaadettu. Vuonna 1931 hevosen suuhun pantiin räjähde, ja korjauksessa onton patsaan sisältä löytyi satojen loukkuun jääneiden lintujen luita. Lisäksi lyhyen "autuaaksi julistamisia" vahvistettiin (San Isidron autuaaksi julistus) ja lähteet lisättiin.
- **Lähde:** https://www.miradormadrid.com/?p=2072 ; https://es.wikipedia.org/wiki/Plaza_Mayor_de_Madrid ; https://en.wikipedia.org/wiki/Plaza_Mayor,_Madrid

### Almudenan katedraali — kenttä `lyhyt`
- **Vanha:** "… Kiko Argüellon vuonna 2004 valmistuneet työt, herättivät valmistuttuaan kiistaa."
- **Uusi:** "… Kiko Argüellon vuonna 2004 valmistuneet työt, herättivät heti kiistaa."
- **Syy:** Tyyppi 6: "valmistuneet … valmistuttuaan" toisti saman sanan.
- **Lähde:** ei uutta faktaa.

### Las Ventasin härkätaisteluareena — kenttä `kysymykset`
- **Vanha:** "Onko härkätaistelut kielletty osassa Espanjaa?"
- **Uusi:** "Onko härkätaistelu kielletty jossain päin Espanjaa?"
- **Syy:** Tyyppi 6: kongruenssivirhe ("Onko … härkätaistelut").
- **Lähde:** ei uutta faktaa.

### Ratkaistut epävarmuudet (PILVI-RAPORTTI)
- Kuninkaanlinna "ilman puuta": korjattu, ks. yllä.
- Metrópolis-talon voitonjumalatar 1975/1977: englanninkielisen Wikipedian Gran Vía -artikkelissa lukee 1975, mutta Victoria Alada -artikkeli antaa tarkan asennuspäivän 11.10.1977. 1977 jää lyhyeen (https://en.wikipedia.org/wiki/Victoria_Alada_(Madrid)).
- Isoisä-lyhyen syy-yhteystulkinta: isoisä on poistettu lyhyestä kokonaan, ja tekstissä on vain merkinnän sisältö.

### Tarkistettu ilman muutoksia
Cibeleen aukio (kultaholvi 35 m vahvistettu, Forbes España), Plaza Mayorin teksti ja lyhyt, Kuninkaanlinnan lyhyt (Las Meninas heitettiin ikkunasta: Wikipedia), Almudenan teksti, avaus (36 sanaa, alkaa "Tervetuloa", ilmasta nähtävä kuva: punaruskeat katot ja linna jyrkänteellä).

## Marseille

Tarkistin: 0 virhettä, 6 huomiota (5 × "ei ala paikan nimellä", 1 × "avaus puuttuu"), sama määrä kuin ennen.

### Notre-Dame de la Garde — kenttä `lyhyt`
- **Vanha:** "Basilika Notre-Dame de la Garde on Henri-Jacques Espérandieun suunnittelema, ja hän sai tehtävän vasta vähän yli kaksikymmentävuotiaana. Kirkossa on kaksi kerrosta: alhaalla kallioon louhittu romaaninen krypta ja sen päällä mosaiikein koristeltu yläkirkko."
- **Uusi:** "Basilika Notre-Dame de la Garden kellotornissa riippuu yli kahdeksantuhatta kiloa painava suurkello Marie Joséphine. Kun se vuonna 1845 vedettiin kaupungista mäelle, kuusitoista hevosta ei riittänyt, vaan rinteeseen valjastettiin kaikkiaan kaksikymmentäkuusi hevosta, ja nousu kesti kolme päivää."
- **Syy:** Tyyppi 1: Espérandieu oli aiheena kahdessa kierroksen lyhyessä (Notre-Dame de la Garde ja katedraali). Tyyppi 2: kerrosrakenne on perustietoa. Espérandieu jää katedraalin lyhyeen. Samalla poistui edellisen tarkistajan epävarmuus Espérandieun iästä.
- **Lähde:** https://en.wikipedia.org/wiki/Notre-Dame_de_la_Garde ; https://www.marseille.fr/culture/patrimoine-culturel/notre-dame-de-la-garde (suurkello 8 234 kg nyt basilikassa)

### Marseillen katedraali — kenttä `teksti`
- **Vanha:** "Peruskiven laski keisari Napoleon kolmas vuonna 1852, ja …"
- **Uusi:** "Peruskiven laski vuonna 1852 Louis-Napoléon Bonaparte, josta tuli saman vuoden lopulla keisari Napoleon kolmas, ja …"
- **Syy:** Tyyppi 3 (titteli): peruskivi laskettiin 26.9.1852, ja silloin Louis-Napoléon oli vielä prinssipresidentti. Keisarikunta julistettiin joulukuussa 1852.
- **Lähde:** https://fr.wikipedia.org/wiki/Cath%C3%A9drale_Sainte-Marie-Majeure_de_Marseille

### Marseillen katedraali — kenttä `lyhyt`
- **Vanha:** "Marseillen katedraalin vihreä raitakivi tuotiin Firenzestä asti. Kirkkoon mahtuu kolmetuhatta ihmistä, ja se seisoo paikalla, jolla Marseillen katedraalit ovat sijainneet 400-luvulta lähtien. Sen suunnittelivat arkkitehdit Léon Vaudoyer ja Henri-Jacques Espérandieu, joista jälkimmäinen piirsi myös Notre-Dame de la Garden."
- **Uusi:** "Marseillen katedraalin vihreä raitakivi tuotiin Firenzestä asti. Kun arkkitehti Léon Vaudoyer kuoli vuonna 1872, työtä jatkoi Henri-Jacques Espérandieu, protestanttiperheen poika, joka oli jo piirtänyt kaupungille toisen suuren katolisen kirkon, Notre-Dame de la Garden."
- **Syy:** Tyyppi 2: lyhyt oli luettelo (paikkamäärä, sijainti, arkkitehdit). Nyt siinä on ihminen ja ristiriita: protestantti suunnitteli kaupungin kaksi suurta katolista kirkkoa. Tyyppi 1: Espérandieu mainitaan kierroksella enää vain tässä.
- **Lähde:** https://en.wikipedia.org/wiki/Henri-Jacques_Esp%C3%A9randieu ; https://fr.wikipedia.org/wiki/Cath%C3%A9drale_Sainte-Marie-Majeure_de_Marseille (pierre verte de Florence)

### MuCEM — kenttä `lyhyt`
- **Vanha:** "Euroopan ja Välimeren sivilisaatioiden museossa, MuCEMissa, kaksi ulkoluiskaa nousee katolle asti, ja betoniverkon aukoista avautuu näkymä linnakkeelle ja avomerelle. Vuodesta 2013 vuoteen 2016 museon alueella kävi kahdeksan ja puoli miljoonaa ihmistä."
- **Uusi:** "Euroopan ja Välimeren sivilisaatioiden museon, MuCEMin, kokoelmat tulivat Pariisista: niiden ytimenä on vuonna 2005 suljetun kansallisen kansanperinnemuseon aineisto. Kaikkiaan kokoelmissa on nykyään noin miljoona esinettä, kirjaa, valokuvaa, julistetta, postikorttia ja äänitettä."
- **Syy:** Tyyppi 2: kävijämäärä ja luiskien kuvaus. Lisäksi betoniverkko oli jo tekstissä (tyyppi 1). Uusi lyhyt kertoo yllätyksen: pariisilainen kansallismuseo muutti Marseilleen.
- **Lähde:** https://fr.wikipedia.org/wiki/Mus%C3%A9e_des_Civilisations_de_l%27Europe_et_de_la_M%C3%A9diterran%C3%A9e

### Calanquesin kansallispuisto — kenttä `lyhyt`
- **Vanha:** "Calanquesin kansallispuiston tunnetuimpia kalliolahtia ovat Sugiton, Sormiou ja Morgiou, ja kaikkiaan jyrkkien kalkkikivikallioiden reunustamia lahtia on rannikolla kaksikymmentäkahdeksan. Puisto on Ranskan kymmenes kansallispuisto, ja maalla ja merellä siellä käy vuosittain yli kaksi miljoonaa ihmistä."
- **Uusi:** "Calanquesin kansallispuiston kapeat kalliolahdet ovat laaksoja, joita joet kovertivat ja luolien sortumat avasivat kalkkikiveen meren ollessa nykyistä paljon alempana. Kun jääkausi päättyi ja meren pinta nousi, vesi täytti laaksot, ja niin syntyivät muun muassa Sugitonin, Sormioun ja Morgioun lahdet."
- **Syy:** Tyyppi 2: lyhyt oli luettelo, järjestysnumero ja kävijämäärä. Kävijämäärä oli myös edellisen tarkistajan epävarmuus, ja nyt se on poistettu. Uusi lyhyt kertoo, miten lahdet syntyivät. Tekstin Cosquer-tarinaa se ei toista.
- **Lähde:** https://en.wikipedia.org/wiki/Calanque

### Calanquesin kansallispuisto — kenttä `kysymykset`
- **Vanha:** "Miten kalliolahdet ovat syntyneet?"
- **Uusi:** "Mistä sana calanque on peräisin?"
- **Syy:** Tyyppi 7: lyhyt vastaa nyt jo vanhaan kysymykseen.
- **Lähde:** ei faktaväitettä.

### Ifin linna — kenttä `lahteet`
- Lyhyen sarvikuonotarina on vahvistettu ja lähde lisätty. Ranskankielisen Wikipedian mukaan Provencen historioitsijat kertovat, että laiva pysähtyi saarelle 23.1.1516 ja Frans I kävi saarella 24.1.1516. Matkallaan hän huomasi, että rannikko oli huonosti puolustettu. Tekstiin ei tehty muutoksia. https://fr.wikipedia.org/wiki/Ch%C3%A2teau_d%27If

### MuCEM — kenttä `lahteet`
- Tekstin mainitsema Cosquer Méditerranée on vuonna 2026 avoinna, ja lähde on lisätty. https://www.marseille-tourisme.com/decouvrez-marseille/culture-et-patrimoine/cosquer-mediterranee-marseille-2eme-fr-3520089/

### Ratkaistut ja jätetyt epävarmuudet
- Espérandieun ikä: väite poistui Notre-Dame de la Garden lyhyestä. Englanninkielinen Wikipedia vahvistaa 23 vuotta, mutta sitä ei enää tarvita.
- Calanquesin kävijämäärä: poistettu.
- Isoisän liitos vanhaan satamaan ("Marseillen satamassa") jää Päätoimittajalle rajatapauksena. Teksti kertoo vain merkinnän sisällön, ja tervan, kalan ja suolaveden "haju" on lievä tulkinta merkinnän sanoista "seurasivat majataloon". Muutosta ei tehty.

### Tarkistettu ilman muutoksia
Saint-Victorin luostari (kynttilänpäivän kulkue), vanha satama (teksti, lyhyt ja peilikatos), Frioulin saaret, Ifin linnan teksti, Saint-Charlesin asema, Stade Vélodrome, avaus (38 sanaa, alkaa "Tervetuloa", ilmasta nähtävä amfiteatterikuva).

## Sisilia

Tarkistin: `Sisilia: 14 kohdetta, 0 virhettä, 10 huomiota` (huomiot samat kuin ennen: suomenkieliset etusanat + avaus erillisessä tiedostossa).

### Normannien palatsi — kenttä `lyhyt`
- **Vanha:** "Normannien palatsi oli Hauteville-suvun normannikuninkaiden asunto ja myöhemmin myös keisari Fredrik toisen hallitsijanistuin. Kuninkaalliset huoneistot ovat yleisön nähtävissä silloin, kun Sisilian parlamentti ei ole koolla. Palatsi kappeleineen kuuluu Unescon maailmanperintöluetteloon."
- **Uusi:** "Normannien palatsista hallinneen keisari Fredrik toisen hovissa runoilijat alkoivat 1230-luvulla kirjoittaa rakkausrunoja omalla kansankielellään, ja niistä kasvoi ensimmäinen italialainen kirjakieli. Hovin notaarin Giacomo da Lentinin uskotaan keksineen sonetin, runomuodon, jota Dante ja Petrarca myöhemmin hioivat."
- **Syy:** Tyyppi 2 (aukioloaika, Unesco-merkintä ja asukaslista = perustietoa) ja tyyppi 1 (parlamentti kerrottiin jo saman kohteen tekstissä).
- **Lähde:** https://en.wikipedia.org/wiki/Sicilian_School ; https://en.wikipedia.org/wiki/Giacomo_da_Lentini ; https://en.wikipedia.org/wiki/Palazzo_dei_Normanni

### San Cataldon kirkko — kenttä `lyhyt`
- **Vanha:** "San Cataldon kirkko on kuulunut 1930-luvulta lähtien Pyhän haudan ritarikunnalle. Vuonna 2015 se liitettiin Unescon maailmanperintöluetteloon osana Palermon arabialais-normannilaisten rakennusten sarjaa, johon kuuluu yhdeksän kohdetta. Kirkko on Bellinin aukiolla aivan Martoranan kirkon vieressä."
- **Uusi:** "San Cataldon kirkossa toimi vuodesta 1787 Palermon kuninkaallinen posti, ja 1800-luvun alussa sen ympärille rakennettiin postitalo, joka kätki kirkon kokonaan sisäänsä. Vasta 1880-luvulla lisärakennukset purettiin, ja keskiaikainen kirkko kupoleineen tuli taas esiin."
- **Syy:** Tyyppi 2 (omistaja, Unesco-vuosi, sijainti = hallintoa). Patricolon nimeä ja punaisten kupolien tarinaa ei käytetty, koska ne ovat jo Erakkojen kirkon tekstissä.
- **Lähde:** https://www.balarm.it/news/quell-intrigante-atmosfera-divenuta-simbolo-di-palermo-l-imponente-san-cataldo-111930 ; https://www.balarm.it/news/palermo-e-quelle-cupole-tinte-di-bianco-cose-che-non-sapevi-su-uno-dei-simboli-della-citta-126475 ; https://en.wikipedia.org/wiki/Church_of_San_Cataldo

### San Cataldon kirkko — kenttä `teksti`
- **Vanha:** "Maio Barilainen, kuningas Vilhelm ensimmäisen kansleri"
- **Uusi:** "Maio Barilainen, kuningas Vilhelm ensimmäisen suuramiraali"
- **Syy:** Tyyppi 3 (titteli): Maio oli kansleri vuodesta 1152, mutta kirkon rakennusaikana vuosina 1154–1160 hän oli "amiraalien amiraali".
- **Lähde:** https://en.wikipedia.org/wiki/Maio_of_Bari

### San Giovanni degli Eremiti — kenttä `teksti`
- **Vanha:** "Paavi Gregorius Suuri perusti paikalle benediktiiniluostarin vuonna 581, mutta 800-luvulla saaren vallanneet muslimit tuhosivat sen ja rakensivat tilalle moskeijan. Vuonna 1132 kuningas Roger toinen vihki rakennuksen jälleen kirkoksi."
- **Uusi:** "Perimätiedon mukaan paikalle perusti luostarin jo 500-luvulla Gregorius Suuri, myöhempi paavi, mutta 800-luvulla saaren vallanneet muslimit tuhosivat sen. Kuningas Roger toinen rakennutti nykyisen kirkon 1130-luvulla ja antoi sen munkkien hoitoon."
- **Syy:** Tyyppi 3: Gregorius ei ollut paavi vuonna 581 (paavi 590 alkaen), ja lähteissä perustaminen on perimätietoa ("is said"). Moskeija on lähteissä vain "ehkä", joten se poistettiin. Roger toinen ei "vihkinyt rakennusta jälleen kirkoksi" vaan rakennutti kirkon vuosina 1132–1136.
- **Lähde:** https://it.wikipedia.org/wiki/Chiesa_di_San_Giovanni_degli_Eremiti ; https://en.wikipedia.org/wiki/San_Giovanni_degli_Eremiti

### San Giovanni degli Eremiti — kenttä `lyhyt`
- **Vanha:** "…Muurien suojaamassa puutarhassa kasvaa appelsiinipuita, korkeita palmuja ja viikunakaktuksia, ja sieltä näkyvät kupolit lähietäisyydeltä."
- **Uusi:** "…Ristikäytävän puutarhassa on yhä arabiaikainen vesisäiliö, ja sieltä kirkon punaiset kupolit näkyvät aivan läheltä."
- **Syy:** Tyyppi 1: palmut ja appelsiinipuut toistuivat avauksessa ("palmujen keskellä") ja saman kohteen tekstissä.
- **Lähde:** https://en.wikipedia.org/wiki/San_Giovanni_degli_Eremiti

### San Giovanni degli Eremiti — kenttä `kysymykset`
- **Vanha:** "Miltä rakennus näytti moskeijana?"
- **Uusi:** "Mitä paikalla oli ennen nykyistä kirkkoa?"
- **Syy:** Tyyppi 7: oletus (rakennus oli moskeija) ei ole varma.
- **Lähde:** https://en.wikipedia.org/wiki/San_Giovanni_degli_Eremiti

### Mondello — kenttä `teksti`
- **Vanha:** "noin kahden kilometrin pituisena"
- **Uusi:** "noin puolentoista kilometrin pituisena"
- **Syy:** Tyyppi 3, PILVI-RAPORTIN epävarmuus ratkaistu: Wikipedian mukaan ranta on noin 1,5 km. Kahden kilometrin luku oli vain matkailusivulta.
- **Lähde:** https://en.wikipedia.org/wiki/Mondello

### Palermon katedraali — `lahteet` (ei tekstimuutosta)
- Porfyyriarkun ja hopea-arkun lähde vaihdettiin, koska cittametropolitana-sivu ei tue väitteitä. Roger II teetti arkut Cefalùhun ja Fredrik II siirsi ne Palermoon (smarteducationunescosicilia.it/?p=48186); arkku tehtiin vuodesta 1631 alkaen (…/?p=48250).

### Monrealen katedraali — `lahteet` (ei tekstimuutosta)
- PILVI-RAPORTIN epävarmuus ratkaistu: Bonanno Pisano teki Pisan tuomiokirkon Porta Realen vuosina 1179–1180, ja ovi tuhoutui vuonna 1595. Lähde lisätty: https://en.wikipedia.org/wiki/Bonanno_Pisano

### Muut tarkistetut (ei muutoksia)
- Teatro Massimo: väite "avajaisaikaan Euroopan kolmanneksi suurin Pariisin ja Wienin jälkeen" vahvistui (en.wikipedia), joten PILVI-epävarmuus on ratkaistu. Kummisetä III ja sulkeminen 1974–1997 ovat kunnossa.
- Palatiinikappeli (isoisä ok), Quattro Canti (1608–1620, kaupunginosat, Piazza Vigliena), Martorana (frutta martorana "is said", joten muotoilu "tulivat kuuluisiksi" on riittävän varovainen), Monte Pellegrino (606 m, pyhäkkö), Politeama (sinfoniaorkesterin kausi 2026/27 on yhä Politeamassa), Zisa ja Amiraalin silta.
- Charleston-kylpylä: avattu 15.7.1913 (ok). Nimi Charleston tulee vuonna 1969 avatusta ravintolasta; syventävän kysymyksen oletus on tosi.
- Avaus: 39 sanaa, ilmakuva (kenno, laakso, Monte Pellegrino), alkaa sanalla "Tervetuloa". Ok.

## Sofia

Tarkistin: `Sofia: 10 kohdetta, 0 virhettä, 3 huomiota` (sama kuin ennen).

### Aleksanteri Nevskin katedraali — kenttä `lyhyt`
- **Vanha:** "Aleksanteri Nevskin katedraalin kryptassa toimii kansallisgallerian kristillisen taiteen museo, joka perustettiin vuonna 1965. Sen kokoelmassa on yli kaksisataa ikonia 1200-luvulta 1800-luvulle, ja se on yksi maailman rikkaimmista ikonikokoelmista. Näyttelyssä on myös seinämaalausten katkelmia ja kaiverruksia."
- **Uusi:** "Aleksanteri Nevskin katedraali on nimetty venäläisen ruhtinaan mukaan, mutta ensimmäisessä maailmansodassa Bulgaria ja Venäjä taistelivat vastakkaisilla puolilla. Siksi kirkko kantoi vuodesta 1916 vuoteen 1920 slaavien apostolien Kyrilloksen ja Methodioksen nimeä, kunnes vanha nimi palautettiin."
- **Syy:** Tyyppi 2 (perustamisvuosi ja kokoelman koko). Lisäksi museon nykyinen sivu ei enää vahvista lukua "yli 200 ikonia 1200–1800-luvuilta", sillä sivu kertoo kokoelman kattavan 300-luvulta 1800-luvulle. Kysymys "Mitä katedraalin kryptassa on nykyään?" säilyy, ja museo on yhä auki.
- **Lähde:** https://en.wikipedia.org/wiki/Saint_Alexander_Nevsky_Cathedral,_Sofia ; https://nationalgallery.bg/visiting/museum-of-christian-art/

### Sofian yliopisto — kenttä `lyhyt`
- **Vanha:** "Sofian yliopistossa opiskelee noin kaksikymmentäyksituhatta opiskelijaa kuudessatoista tiedekunnassa. Evlogi Georgiev testamenttasi yliopistolle tontin ja kahdeksansataatuhatta leviä jo vuonna 1896, ja lopulta veljekset antoivat rakennusta varten kuusi miljoonaa leviä. Päärakennus valmistui vasta lähes neljäkymmentä vuotta testamentin jälkeen."
- **Uusi:** "Sofian yliopiston opiskelijat buuasivat tammikuussa 1907 ruhtinas Ferdinandille uuden kansallisteatterin avajaisissa. Hallitus sulki yliopiston rangaistukseksi ja erotti yhdellä päätöksellä kaikki sen opettajat, ja vasta seuraavan vuoden alussa uusi hallitus palautti professorit virkoihinsa."
- **Syy:** Tyyppi 2 (opiskelija- ja tiedekuntamäärät, jotka myös vanhenevat) ja tyyppi 1 (Georgievin veljesten rahoitus kerrottiin jo saman kohteen tekstissä).
- **Lähde:** https://en.wikipedia.org/wiki/Sofia_University ; https://bg.wikipedia.org/wiki/Софийски_университет

### Sofian yliopisto — `lahteet` (ei tekstimuutosta)
- Tekstin väitteellä kirjastosta ("maan suurin tieteellinen kirjasto, yli kaksi ja puoli miljoonaa julkaisua") ei ollut lähdettä. Väite vahvistui, ja lähde lisättiin: https://libsu.uni-sofia.bg/UB/?p=1301

### Banja Bashin moskeija — kenttä `teksti`
- **Vanha:** "ja sen nimi tarkoittaa monia kylpylöitä"
- **Uusi:** "ja sen turkinkielinen nimi viittaa kylpylään"
- **Syy:** Tyyppi 3 (kansanetymologia esitettynä tosiasiana): banyo on kylpy ja baş pää, joten nimi tarkoittaa "kylpylän pää(moskeija)" eikä "monia kylpylöitä". Wikipedia mainitsee molemmat ja toteaa, että "kylpylän pää" on oikeampi.
- **Lähde:** https://en.wikipedia.org/wiki/Banya_Bashi_Mosque

### Banja Bashin moskeija — kenttä `kysymykset`
- **Vanha:** "Kuinka monta muslimia Sofiassa asuu nykyään?"
- **Uusi:** "Miten tämä moskeija säästyi, kun muut tuhottiin?"
- **Syy:** Tyyppi 7: vastaus on vanheneva tilasto. Uusi kysymys liittyy kohteeseen ja kierrosversioon (vuonna 1878 räjäytetyt moskeijat), ja sen oletus on tosi.
- **Lähde:** https://en.wikipedia.org/wiki/Sofia

### Sofian synagoga — kenttä `lyhyt`
- **Vanha:** "Sofian synagoga oli suljettuna vuosina 1943 ja 1944, kun suurin osa kaupungin juutalaisista oli karkotettu maaseudulle. Rakennus on Kaakkois-Euroopan suurin synagoga, ja sen sisäkupoli kohoaa kahteenkymmeneenkolmeen metriin. Pääsalissa on yli tuhat istumapaikkaa."
- **Uusi:** "Sofian synagogaan osui huhtikuussa 1944 kaupungin pommitusten aikana pommi, joka ei räjähtänyt, mutta isku rikkoi tärinällään koristeelliset lasimaalaukset. Vuonna 1982 eräs ministeri yritti muuttaa synagogan konserttisaliksi, mutta juutalaisyhteisö sai torjuttua hankkeen."
- **Syy:** Tyyppi 2 (koko, kupolin korkeus, paikkamäärä) ja tyyppi 1 (vuosien 1943–1944 karkotusaihe oli jo saman kohteen tekstissä).
- **Lähde:** https://www.sofiasynagogue.com/en/history/

### Sofian synagoga — kentät `teksti` ja `kuvaus`
- **Vanha:** "ja se on Euroopan suurin sefardijuutalaisten synagoga" / kuvaus "Euroopan suurin sefardisynagoga"
- **Uusi:** "ja se on yksi Euroopan suurimmista sefardijuutalaisten synagogista" / kuvaus "Balkanin suurin synagoga"
- **Syy:** Tyyppi 3 (superlatiivi): synagogan oma sivu sanoo "one of the three largest Sephardic synagogues in Europe and the largest on the Balkan Peninsula". En.wikipedia ei sano "Euroopan suurin sefardisynagoga", vaikka vanha lähde väitti niin.
- **Lähde:** https://www.sofiasynagogue.com/en/history/ ; https://en.wikipedia.org/wiki/Sofia_Synagogue

### Pyhän Yrjön rotunda — kenttä `lyhyt`
- **Vanha:** "Pyhän Yrjön rotunda on vain noin neljätoista metriä korkea, mutta se on ollut vuorotellen kylpylä, kirkko ja moskeija. Nykyään se on taas ortodoksinen kirkko, ja pihalle pääsee vapaasti kujaa pitkin presidentin virkatalon ja opetusministeriön välistä."
- **Uusi:** "Pyhän Yrjön rotunda rakennettiin roomalaiseen Serdicaan, jossa keisari Galerius antoi vuonna 311 suvaitsevaisuusediktin. Se lopetti kristittyjen vainot kaksi vuotta ennen kuuluisampaa Milanon ediktiä. Keisari Konstantinus Suuren kerrotaan sanoneen kaupungista: Serdica on minun Roomani."
- **Syy:** Tyyppi 1 (kylpylä–kirkko–moskeija toisti saman kohteen tekstin) ja tyyppi 2 (korkeus ja kulkureitti). PILVI-epävarmuus kulkureitistä poistui, koska väite poistettiin. Rilan Johanneksen pyhäinjäännöksiä ei valittu, koska seuraava kierroskohde (Sveta Nedelya) kertoo jo pyhäinjäännöksistä.
- **Lähde:** https://en.wikipedia.org/wiki/Serdica ; https://en.wikipedia.org/wiki/Church_of_Saint_George,_Sofia

### Sveta Nedelyan kirkko — kenttä `teksti`
- **Vanha:** "Kupolin alla olevaan pylvääseen oli kätketty kaksikymmentäviisi kiloa räjähteitä"
- **Uusi:** "Kirkon ullakolle kupolia kannattavan pylvään yläpuolelle oli kätketty kaksikymmentäviisi kiloa räjähteitä"
- **Syy:** Tyyppi 3: räjähteet vietiin ullakolle pääkupolin pylvään yläpuolelle eikä pylvään sisään. Kuolleiden määrä "yli kaksisataa" (213) ja tsaarin myöhästyminen vahvistuivat.
- **Lähde:** https://en.wikipedia.org/wiki/St._Nedelya_Church_bombing

### Kansalliskulttuuripalatsi — kenttä `lyhyt`
- **Vanha:** "Kansalliskulttuuripalatsin edustalla on suihkulähteitä ja laaja puisto, joka on suosittu kävelypaikka. Vitoša-bulevardin alittavan alikulun seinille on maalattu katutaidetta, ja alikulusta pääsee suoraan metroasemalle, joka on nimetty palatsin mukaan ja avattiin vuonna 2012."
- **Uusi:** "Kansalliskulttuuripalatsi rakennettiin kommunistijohtaja Todor Živkovin tyttären Ljudmila Živkovan aloitteesta, ja hän kuoli heinäkuussa 1981, vain muutama kuukausi talon avajaisten jälkeen. Seuraavana kesänä talo nimettiin hänen mukaansa, ja nimestä luovuttiin vasta vuonna 1990."
- **Syy:** Tyyppi 2 (puisto, alikulku, metroaseman avausvuosi = perustietoa) ja tyyppi 1 (suihkulähteet ja puisto olivat jo saman kohteen tekstissä).
- **Lähde:** https://en.wikipedia.org/wiki/National_Palace_of_Culture ; https://bg.wikipedia.org/wiki/Национален_дворец_на_културата

### Kansalliskulttuuripalatsi — kenttä `teksti`
- **Vanha:** "purettiin vuonna 2017 taiteilijoiden vastalauseista huolimatta"
- **Uusi:** "purettiin vuonna 2017 mielenosoittajien vastalauseista huolimatta"
- **Syy:** Tyyppi 3: vuonna 2017 purkua vastustivat paikalle tulleet mielenosoittajat. Taiteilijaliiton kirje on vuodelta 2012. PILVI-epävarmuus on ratkaistu: muistomerkki purettiin vuonna 2017.
- **Lähde:** https://architectuul.com/architecture/monument-to-1300-years-of-bulgaria

### Bojanan kirkko — kenttä `lyhyt`
- **Vanha:** "Freskojen maalarin nimeä ei tunneta,"
- **Uusi:** "Freskojen maalarin nimeä ei tiedetä varmasti,"
- **Syy:** Tyyppi 3: restauroinnissa vuosina 2006–2008 löytyi mahdollinen maalarin signeeraus.
- **Lähde:** https://en.wikipedia.org/wiki/Boyana_Church

### Muut tarkistetut (ei muutoksia)
- Banja Bashi: PILVI-epävarmuus on ratkaistu. En.wikipedia antaa vuodeksi 1566, ja osa lähteistä mainitsee 1576. Muotoilu "suunnittelijaksi mainitaan Mimar Sinan" jätetään ennalleen. Lyhyen versio seitsemästä vuonna 1878 räjäytetystä moskeijasta vahvistui sanatarkasti (en.wikipedia Sofia).
- Sveta Nedelya: Milutinin pyhäinjäännökset kunnossa. Bojana: nauriit, sipuli ja yksitoista apostolia vahvistuivat (BNR), samoin vuosi 1259 sekä 89 kohtausta ja 240 hahmoa.
- Ivan Vazovin kansallisteatteri: kunnossa (3.1.1907, tulipalo 1923, Dülfer 1929, nimi 1962).
- Mineraalikylpylä: kunnossa (isoisä kertoo vain merkinnän sisällön; museo vuodesta 2015).
- Avaus: 36 sanaa, ilmakuva (vuorten ympäröimä laakso, Vitoša), alkaa sanalla "Tervetuloa". Ok.

### Epävarmuudet Päätoimittajalle
- Sofian yliopisto: "buuasivat" perustuu en.wikipedian sanaan "booed". Bg.wikipedia puhuu ruhtinasta vastustaneesta mielenosoituksesta. Ilmaisu on tavallinen, mutta sävyn voi halutessaan muuttaa.
- Rotunda: lause "Serdica on minun Roomani" on esitetty muodossa "kerrotaan sanoneen", koska alkuperäistä antiikin lähdettä ei mainita.

## Oslo

Tarkistin: 0 virhettä, 7 huomiota (sama määrä kuin ennen: 6 × "ei ala paikan nimellä" suomenkielisen etusanan takia, 1 × "avaus puuttuu" koska avaus on omassa tiedostossaan). Avaus (avaukset/oslo.md) tarkistettu: 36 sanaa, alkaa "Tervetuloa", ilmakuva (vuonon perukka, metsäiset kukkulat) — ei muutoksia.

### Oslon kuninkaanlinna — kenttä `lyhyt`
- **Vanha:** "Oslon kuninkaanlinnassa on sataseitsemänkymmentäkolme huonetta, ja kesäisin osaan niistä pääsee opastetulla kierroksella. Kansallispäivänä seitsemästoista toukokuuta kuninkaallinen perhe tervehtii linnan parvekkeelta lasten kulkuetta, ja tavan aloitti kuningas Haakon seitsemäs vuonna 1906."
- **Uusi:** "Oslon kuninkaanlinnan rakennustyöt pysähtyivät vuonna 1827, kun rahat loppuivat ja suurkäräjät kieltäytyivät lisärahoista vastalauseena kuninkaalle. Siksi arkkitehti Hans Linstow piirsi halvemman linnan ilman ulkonevia siipiä. Kansallispäivänä kuninkaallinen perhe tervehtii parvekkeelta lasten kulkuetta, ja tavan aloitti kuningas Haakon seitsemäs."
- **Syy:** Tyyppi 2. Huonemäärä ja opastetut kierrokset ovat perustietoa. Ne korvattiin tarinalla siitä, miten suurkäräjät pysäyttivät rahoituksen ja linnasta tuli suunniteltua vaatimattomampi. Parvekeperinne säilyi.
- **Lähde:** https://en.wikipedia.org/wiki/Royal_Palace,_Oslo

### Oslon kuninkaanlinna — kenttä `teksti`
- **Vanha:** "Linnaa alettiin rakentaa vuonna 1825 Hans Linstowin piirustusten mukaan, mutta kuningas Kaarle Juhana ei ehtinyt asua siinä,"
- **Uusi:** "Kuningas Kaarle Juhana laski linnan peruskiven vuonna 1825, mutta hän ei ehtinyt asua siinä,"
- **Syy:** Tyyppi 3. Työmaa alkoi jo 1824, ja vuonna 1825 laskettiin peruskivi. Linstow siirtyi kierrosversioon, joten hän ei enää toistu tekstissä (tyyppi 1).
- **Lähde:** https://en.wikipedia.org/wiki/Royal_Palace,_Oslo

### Karl Johans gate — kenttä `lyhyt`
- **Vanha:** "Oslon pääkadun Grand Hotel avattiin vuonna 1874, ja rauhanpalkinnon saaja majoittuu perinteisesti sen Nobel-sviitissä. Kadun nimi juontaa kuninkaasta, joka tunnetaan Ruotsissa nimellä Kaarle neljästoista Juhana ja joka oli alun perin ranskalainen marsalkka Jean Bernadotte."
- **Uusi:** "Oslon pääkatu kantaa nimeä mieheltä, joka pakotti Norjan unioniin Ruotsin kanssa. Ranskalaissyntyinen kruununprinssi Kaarle Juhana voitti norjalaiset vuonna 1814 alle kolme viikkoa kestäneessä sodassa, mutta hyväksyi silti heidän juuri säätämänsä perustuslain. Ruotsia tai norjaa hän ei koskaan oppinut kunnolla."
- **Syy:** Tyyppi 1. Grand Hotel ja rauhanpalkinnon saaja toistivat saman kohteen tekstiä (soihtukulkue Grand Hotelin eteen, parveke). Avausvuosi oli lisäksi pelkkää perustietoa (tyyppi 2). Uusi versio kertoo ristiriidasta: pääkatu on nimetty miehen mukaan, joka voitti Norjan sodassa mutta hyväksyi sen perustuslain.
- **Lähde:** https://en.wikipedia.org/wiki/Charles_XIV_John

### Karl Johans gate — kenttä `kysymykset`
- **Vanha:** "Kuinka monta lasta kansallispäivän kulkueessa on?"
- **Uusi:** "Miksi soihtukulkue päättyy Grand Hotelin eteen?"
- **Syy:** Tyyppi 7. Vastaus vaihtuu joka vuosi.
- **Lähde:** —

### Oslon oopperatalo — kenttä `lyhyt`
- **Vanha:** "Oslon oopperatalo on suurin Norjaan rakennettu kulttuurirakennus sitten Nidarosin tuomiokirkon. Pääsalissa on tuhat kolmesataakuusikymmentäneljä istumapaikkaa, ja salia ympäröi tammella verhoiltu seinä. Vedessä kelluva veistos She Lies on Monica Bonvicinin tulkinta Caspar David Friedrichin maalauksesta Jäämeri."
- **Uusi:** "Oslon oopperatalon katon marmori ei ole tasaista, sillä taiteilijat Kristian Blystad, Jorunn Sannes ja Kalle Grude suunnittelivat siihen kuvion, joka ei toista itseään. Pinnassa on koholla olevia kohtia, erikoisia leikkauksia ja eri tavoin työstettyjä laattoja. Näyttämötornin alumiinilevyjen kuviot taas pohjautuvat vanhoihin kudontamalleihin."
- **Syy:** Tyyppi 1, koska She Lies on myös saman kohteen tekstissä. Tyyppi 2, koska superlatiivi ja istumapaikkojen määrä ovat perustietoa. Uusi versio kertoo yksityiskohdan, jonka näkee katolla kävellessä.
- **Lähde:** https://en.wikipedia.org/wiki/Oslo_Opera_House ; https://www.dezeen.com/2008/04/09/opera-house-oslo-by-snohetta-2/

### Oslon kaupungintalo — kenttä `lyhyt`
- **Vanha (2. virke):** "Talossa työskentelevät kaupunginvaltuusto ja kaupungin hallinto, ja sen suureen saliin pääsee tutustumaan maksutta."
- **Uusi (2. virke):** "Talon ulkoseinillä on Dagfin Werenskioldin värikkäitä reliefejä, joiden aiheet on poimittu muinaisnorjalaisista Edda-runoista."
- **Syy:** Tyyppi 2. Hallintotieto ja pääsymaksu vaihdettiin näkyvään taideyksityiskohtaan. Tähtitieteellinen kello säilyi.
- **Lähde:** https://en.wikipedia.org/wiki/Oslo_City_Hall

### Vigelandin puisto — kenttä `lyhyt`
- **Vanha:** "Vuonna 1921 kaupunki antoi Gustav Vigelandille suuren ateljeen, ja hän lupasi vastineeksi kaupungille kaikki teoksensa."
- **Uusi:** "Vuonna 1921 kaupunki sitoutui rakentamaan Gustav Vigelandille suuren ateljeen, ja vastineeksi hän lupasi kaupungille kaikki teoksensa."
- **Syy:** Tyyppi 3. Vuonna 1921 tehtiin sopimus ja rakentaminen alkoi. Ateljee ei ollut vielä valmis annettavaksi.
- **Lähde:** https://en.wikipedia.org/wiki/Vigeland_Museum

### Holmenkollbakken — kenttä `lyhyt`
- **Vanha:** "Hyppyrimäki Holmenkollbakken oli vuoden 1952 talviolympialaisten areena, ja suurmäen kilpailua seurasi silloin satakaksikymmentätuhatta katsojaa. Holmenkollenin hiihtojuhlat ovat kuuluneet vuodesta 1980 lähtien mäkihypyn maailmancupiin. Mäen katsomoihin ja rinteille mahtuu nykyään seitsemänkymmentätuhatta katsojaa."
- **Uusi:** "Hyppyrimäki Holmenkollbakken on nähnyt tulevan kuninkaankin hyppäämässä, sillä kruununprinssi Olav kilpaili täällä nuorimpien sarjassa vuosina 1922 ja 1923. Kaikkiaan hän oli mukana seitsemässäkymmenessäkahdessa Holmenkollenin kisassa hyppääjänä tai katsojana. Vuoden 1952 olympialaisissa mäkikilpailua seurasi satakaksikymmentätuhatta katsojaa."
- **Syy:** Tyyppi 2. Maailmancup-vuosi ja katsomokapasiteetti ovat hallinto- ja tilastotietoa. Ne korvattiin tarinalla kruununprinssi Olavista mäkihyppääjänä. Olympialaisten yleisöennätys säilyi.
- **Lähde:** https://snl.no/Holmenkollrennene ; https://holmenkollen.com/en/historien-om-bakken/

### Viikinkilaivamuseo — kenttä `kysymykset`
- **Vanha:** "Mitä laivoja uuteen museoon tulee?" / "Milloin uusi museo avataan yleisölle?"
- **Uusi:** "Mitä laivoja uuteen museoon siirrettiin?" / "Miksi laivat piti siirtää uuteen museoon?"
- **Syy:** Tyyppi 7 ja 5. Laivat on jo siirretty (Oseberg 10.9.2025, Gokstad 29.10.2025, Tune 24.2.2026). Avajaiskysymyksen oletus vanhenee, kun museo avataan (suunnitelma: marraskuu 2027).
- **Lähde:** https://www.tu.no/artikler/norges-forste-vikingskipfunn-flyttes-til-nytt-museum/568644 ; https://snl.no/Vikingtidsmuseet

### Viikinkilaivamuseo — kenttä `lahteet`
- Kuolleet lähteet (tu.no/nyhetsstudio/88519 → 404, lokalhistoriewiki → 503) vaihdettiin avattuihin lähteisiin. Lyhyen version väitteet tarkistettiin: tärinältä suojattu laatikko, sata metriä, kymmenen vuoden suunnittelu, lähes puoli miljardia ja ensimmäinen siirto 99 vuoteen (tv4.se/TT), katon nosturirata (sciencenorway). Tekstiä ei muutettu. Nykytila tarkistettiin: vanha talo suljettiin 2021, ja kaikki kolme laivaa siirrettiin vuosina 2025 ja 2026.
- **Lähde:** https://www.tv4.se/artikel/tt-250910-vikingaskepp1-3f4aa926/vikingaskepp-flyttas-for-halv-miljard ; https://www.sciencenorway.no/viking-age-archaeology-culture/final-voyage-for-the-viking-ships/2492239

### Fram-museo — kenttä `teksti`
- **Vanha:** "kuin yhdelläkään muulla laivalla"
- **Uusi:** "kuin yhdelläkään muulla puulaivalla"
- **Syy:** Tyyppi 3. Ennätys koskee puulaivoja. Nykyiset jäänmurtajat ovat käyneet pohjoisnavalla, joten väite "kaikista laivoista" on väärä.
- **Lähde:** https://frammuseum.no/polar-ship/fram/ ; https://www.oslo-spirit.com/guides/fram-museum/

### Nobelin rauhankeskus — kenttä `teksti`
- **Vanha:** "Keskus avattiin kesäkuussa 2005, ja avajaisvieraina olivat Nelson Mandela ja tuore rauhanpalkinnon saaja Wangari Maathai. Näyttelyt kertovat Alfred Nobelista, rauhanpalkinnon saajista ja heidän työstään, ja joka vuosi keskus esittelee uusimman palkitun omassa näyttelyssään."
- **Uusi:** "Kuningas Harald avasi keskuksen kesäkuussa 2005, kun edellisen vuoden rauhanpalkinnon saaja Wangari Maathai oli paikalla, ja Nelson Mandela oli käynyt tutustumassa siihen jo kaksi päivää aiemmin. Näyttelyt kertovat Alfred Nobelista, rauhanpalkinnon saajista ja heidän työstään rauhan hyväksi."
- **Syy:** Tyyppi 3, koska Mandela ei ollut avajaisvieras: hän kävi keskuksessa kaksi päivää ennen avajaisia (keskuksen oma sivu ja Equinorin avajaisuutinen 11.6.2005). Maathai sai palkinnon 2004, joten "tuore" tarkennettiin. Tyyppi 5, koska keskus uusii perusnäyttelyään vuodesta 2025 syksyyn 2027 ja on osittain suljettu 8.9.2026 alkaen. Joulukuun 2026 näyttely on valokuvanäyttely 125 vuoden rauhanpalkinnoista, ei uusimman palkitun näyttely. Väite vuosittaisesta palkitun näyttelystä poistettiin, jotta äänite ei vanhene.
- **Lähde:** https://www.nobelpeacecenter.org/en/news/nobel-peace-prize-laureates-home-away-from-home ; https://www.equinor.com/en/news/archive/2005/06/11/NobelCenterAPeaceBridge.html ; https://www.nobelpeacecenter.org/en/visit/opening-hours

### Nobelin rauhankeskus — kenttä `kysymykset`
- **Vanha:** "Mitä keskuksen näyttelyissä on nähtävänä?"
- **Uusi:** "Mitä Mandela sanoi käydessään keskuksessa?"
- **Syy:** Tyyppi 7. Kysymys koski nykyisiä näyttelyjä, jotka ovat juuri uusittavina. Uusi kysymys liittyy tähän kohteeseen, ja sen vastaus ei vanhene (Mandela kiitti Norjaa, vaikka häntä oli kielletty puhumasta).
- **Lähde:** https://www.nobelpeacecenter.org/en/news/nobel-peace-prize-laureates-home-away-from-home

### Tarkistettu, ei muutosta (Oslo)
- Akershus: vastarintamuseo ja puolustusvoimien museo toimivat yhä (Forsvarsbygg), Quisling ja vuosi 1940 ovat oikein. Kuninkaanlinnan vartionvaihto kello 13.30 ja parvekeperinne pitävät paikkansa.
- Munch-museo (Bjørvika 2021, Tracey Eminin Äiti), Kon-Tiki-museo (avoinna, uusi näyttely avattu, Ra II esillä) ja Kollensvevet (toiminnassa 2026, 361 metriä) ovat ajan tasalla.
- Tuomiokirkon pronssiovet: Oslo byleksikon ja kirken.no kertovat vuorisaarnasta (autuaaksijulistukset). SNL mainitsee ehtoollisaiheet. Teksti jätettiin ennalleen enemmistölähteiden mukaan.
- Spikersuppan nimi tulee naulatehtaasta, joka rahoitti altaan: Wikipedia sanoo nimen olevan leikillinen lempinimi, ja teksti sanoo samoin.
- Kierroksen kahdeksan lyhyttä versiota luettiin peräkkäin muutosten jälkeen, eikä niissä ole enää päällekkäisiä aiheita.

### Epävarmuudet Päätoimittajalle (Oslo)
- Viikinkilaivamuseon teksti kertoo siirroista yhdellä virkkeellä ("siirrettiin … vuosina 2025 ja 2026"), ja kierrosversio kertoo Osebergin siirron tarinan. Näkökulmat ovat eri, ja tekstin virke on nykytilan kehys, joten jätin molemmat. Päätä, onko tämä liian lähellä tyypin 1 päällekkäisyyttä.
- Viikinkiajan museo avautuu suunnitelman mukaan marraskuussa 2027, mutta tu.no kertoi rahoitusvajeesta (noin 200 miljoonaa kruunua). Avausvuotta ei siksi kirjoitettu tekstiin.
- Tuomiokirkon pronssiovien aihe: SNL (ehtoollinen) ja Oslo byleksikon (vuorisaarna) ovat ristiriidassa.

## Sevilla

Tarkistin: 0 virhettä, 10 huomiota (sama määrä kuin ennen: 9 × "ei ala paikan nimellä" suomenkielisen etusanan takia, 1 × "avaus puuttuu"). Avaus (avaukset/sevilla.md) tarkistettu: 38 sanaa, alkaa "Tervetuloa", ilmakuva (vaaleat talot, sisäpihat, Guadalquivir, katedraalin torni) — ei muutoksia.

### Sevillan katedraali — kenttä `lyhyt`
- **Vanha:** "Sevillan katedraalin kupoli on romahtanut kahdesti, ensin vuonna 1511 pian kirkon valmistumisen jälkeen ja uudelleen vuonna 1888. Vuonna 1987 Unesco liitti katedraalin maailmanperintöluetteloon yhdessä viereisen kuninkaanlinnan ja Intian arkiston kanssa."
- **Uusi:** "Sevillan katedraalin tuomiokapitulin kerrotaan päättäneen vuonna 1401 rakentaa niin kauniin ja suuren kirkon, että sen nähneet pitäisivät rakentajia hulluina. Pöytäkirjaan merkittiin vaatimattomammin kirkko, jolle ei ole vertaista. Kupoli romahti myöhemmin kahdesti, vuosina 1511 ja 1888."
- **Syy:** Tyyppi 2. Unesco-merkintä on hallinnollista perustietoa. Tilalle tuli tunnettu "hulluina pitävät" -lausuma, joka on merkitty perimätiedoksi ("kerrotaan"), ja sen rinnalle se, mitä pöytäkirjaan todella kirjattiin (tyyppi 3: legendan ja tosiasian ero). Kupolin romahdukset säilyivät.
- **Lähde:** https://en.wikipedia.org/wiki/Seville_Cathedral

### Giralda — kenttä `lyhyt`
- **Vanha (3. virke):** "Nykyinen tuuliviiripatsas on yli kolme metriä korkea ja painaa jalustoineen yli tonnin."
- **Uusi (3. virke):** "Nykyinen pronssipatsas, lippua kantava nainen, kuvaa kristillistä uskoa, mutta sen esikuvana oli luultavasti antiikin jumalatar Pallas Athene."
- **Syy:** Tyyppi 2. Korkeus ja paino vaihdettiin ristiriitaan: minareetin huipulla kristillistä uskoa kuvaava patsas, jonka esikuva on pakanajumalatar. Mittatiedotkin olivat epävarmat, sillä Wikipedia sanoo neljä metriä ja 1 500 kiloa, IAPH 3,5 metriä ja 1 300 kiloa.
- **Lähde:** https://en.wikipedia.org/wiki/Giralda

### Giralda — kenttä `kysymykset`
- **Vanha:** "Mitä huipun Giraldillo-patsas esittää?"
- **Uusi:** "Missä Giraldillon kopio nykyään on?"
- **Syy:** Tyyppi 7 ja 1. Kierrosversio vastaa nyt vanhaan kysymykseen. Uusi kysymys perustuu siihen, että alkuperäinen patsas oli kunnostettavana 1999–2005 ja huipulla oli sillä aikaa kopio.
- **Lähde:** https://en.wikipedia.org/wiki/Giralda

### Torre del Oro — kenttä `teksti`
- **Vanha:** "Kultaa siinä ei ole koskaan ollut, vaan nimi tulee hohteesta, jonka laastin, kalkin ja puristetun heinän seos loi."
- **Uusi:** "Nimi tulee todennäköisimmin kultaisesta hohteesta, jonka laastin, kalkin ja puristetun heinän seos loi, eikä tornissa säilytetty Amerikan kultaa, kuten usein kerrotaan."
- **Syy:** Tyyppi 3. Nimelle on useita selityksiä, ja kultainen hohde on niistä todennäköisin (vuoden 2005 restauroinnin tulos). Myös kaakeliteoria ja Pedro I:n aarrekertomus ovat olemassa. Väite "kultaa ei koskaan" oli liian ehdoton, sillä Pedro I:n kullan ja hopean säilyttäminen tornissa on legendaa mutta ei kumottu. Kumottu on vain väite Amerikan kullasta, joka säilytettiin Casa de la Contrataciónissa.
- **Lähde:** https://es.wikipedia.org/wiki/Torre_del_Oro

### Torre del Oro — kenttä `lyhyt`
- **Vanha:** "…kappeli, aatelisten vankila, ruutivarasto ja satamaviranomaisten toimisto…"
- **Uusi:** "…kappeli, aatelisten vankila ja satamakapteenin virasto…"
- **Syy:** Tyyppi 3. Ruutivarastoa ei löytynyt yhdestäkään avatusta lähteestä (es.wikipedia, hoteles.net, hispanopedia). Se mainittiin vain hakuotteessa, joten se poistettiin. Muut käyttötarkoitukset vahvistuivat: kappeli 1271, vankila 1400-luvun alussa, laivaston satamakapteenin virasto 1870 ja merenkulkumuseo vuodesta 1944. Museo toimii yhä (palvelulupaus vuosille 2026–2029).
- **Lähde:** https://es.wikipedia.org/wiki/Torre_del_Oro

### Intian arkisto — kenttä `lyhyt`
- **Vanha:** "Intian arkiston rakentaminen alkoi vuonna 1584, ja kauppiaat ottivat talon käyttöön vuonna 1598. Nykyään hyllymetrejä on noin kahdeksan kilometriä, ja asiakirjat kattavat yli kolme vuosisataa Tulimaasta Yhdysvaltain eteläosiin ja Filippiineille."
- **Uusi:** "Intian arkiston kätköissä on Kristoffer Kolumbuksen omakätisiä papereita ja paavi Aleksanteri kuudennen bulla vuodelta 1493, jolla paavi antoi Espanjalle kaikki maat napalta navalle vedetyn rajalinjan länsipuolelta. Arkiston kartoista näkee, miten Amerikan siirtomaakaupungit suunniteltiin."
- **Syy:** Tyyppi 2, koska rakennusvuodet ja hyllymetrit ovat perustietoa. Hyllymetreistä oli myös ristiriita: Wikipedia sanoo nykyään yhdeksän kilometriä. Tyyppi 1, koska aineiston laajuus toistui tekstin "kahdeksankymmentä miljoonaa sivua" -virkkeen kanssa. Bullan sisältö on muotoiltu tarkasti: bulla antoi Espanjalle maat rajalinjan länsi- ja eteläpuolelta, eikä se vielä "jakanut maailmaa Portugalin kanssa", sillä jako tuli vasta Tordesillasin sopimuksessa 1494.
- **Lähde:** https://en.wikipedia.org/wiki/General_Archive_of_the_Indies ; https://en.wikipedia.org/wiki/Inter_caetera

### Metropol Parasol — kenttä `teksti`
- **Vanha:** "ja sitä pidetään maailman suurimpana puurakenteena"
- **Uusi:** "ja sitä mainostetaan maailman suurimpana puurakenteena"
- **Syy:** Tyyppi 3. Superlatiivi on markkinointiväite ("marketed as the world's largest wooden structure"), ei riippumaton luokitus.
- **Lähde:** https://en.wikipedia.org/wiki/Metropol_Parasol

### Maestranzan areena — kenttä `lyhyt`
- **Vanha:** "Maestranzan areenaan mahtuu noin kaksitoistatuhatta katsojaa, ja sen rakentamista johtivat aluksi arkkitehdit Francisco Sánchez de Aragón ja Vicente de San Martín. Huhtikuun markkinajuhlan aikaan siellä järjestetään yksi maailman tunnetuimmista härkätaistelusarjoista, ja areenaan kuuluu myös museo ja pieni kappeli."
- **Uusi:** "Maestranzan areenaa vastapäätä, rantakadun toisella puolella, seisoo patsas sikarityttö Carmenista. Georges Bizet'n oopperassa Carmen kuolee mustasukkaisen Don Josén käsissä Sevillan härkätaisteluareenan edustalla samaan aikaan, kun yleisö hurraa sisällä härkätaistelija Escamillolle."
- **Syy:** Tyyppi 2. Katsojamäärä, arkkitehtien nimet, museo ja kappeli ovat perustietoa, ja kapasiteetista oli lisäksi ristiriita (es.wikipedia 11 500, en.wikipedia 12 000). Uusi versio kertoo areenan tunnetuimman kulttuuriyhteyden. Kuolema mainitaan yksityiskohditta.
- **Lähde:** https://visitasevilla.es/en/?p=32858 ; https://en.wikipedia.org/wiki/Carmen

### Maestranzan areena — kenttä `teksti`
- **Vanha:** "Rakennus on kolmenkymmenen erimittaisen sivun monikulmio, koska sitä rakennettiin katkonaisesti vuodesta 1761 vuoteen 1881."
- **Uusi:** "Rakennus on kolmenkymmenen erimittaisen sivun monikulmio, ja sitä rakennettiin katkonaisesti vuodesta 1761 vuoteen 1881."
- **Syy:** Tyyppi 3. Syy-yhteys ei ole varma. Hakuotteen mukaan CSIC:n tutkimus (Informes de la Construcción 2018) toteaa, ettei epäsäännölliselle muodolle ole löydetty vakuuttavaa perustelua, ja selitystä etsitään rakennushistoriasta. Artikkelia ei saatu auki (503), joten syy-yhteys poistettiin eikä sitä korvattu uudella väitteellä.
- **Lähde:** https://en.wikipedia.org/wiki/Maestranza_(Seville) (rakennusvaiheet, 1786 kielto pysäytti työt)

### Tarkistettu, ei muutosta (Sevilla)
- Plaza de España: Lawrence of Arabiassa aukio esitti Allenbyn päämajaa Kairossa (andaluciadestinodecine.com), Kloonien hyökkäyksessä Naboon Theediä. Rakennuksessa on yhä valtion virastoja. Kaupunginjohtajan vuoden 2024 ehdotus aidata aukio ja periä pääsymaksu ei ole toteutunut, eikä teksti väitä aukiosta mitään sellaista, mikä muuttuisi.
- Alcázar, Trianan silta, Casa de Pilatos ja Alamillon silta: ei vanhentuneita nykytilaväitteitä eikä vivahdevirheitä. Casa de Pilatos -tekstissä on jo "Perimätiedon mukaan".
- Metropol Parasolin kierrosversio (hinta 50 → noin 100 miljoonaa euroa, esikuvina katedraalin holvit ja fiikuspuut) vahvistui Wikipediasta, joten pilviraportin epävarmuus on ratkaistu. Versio jätettiin, koska se kertoo ristiriidasta (suunnitelma, jota ei voinut rakentaa) eikä ole pelkkä luku.
- Kierroksen kahdeksan lyhyttä versiota luettiin peräkkäin muutosten jälkeen, eikä niissä ole päällekkäisiä aiheita.

### Epävarmuudet Päätoimittajalle (Sevilla)
- Maestranzan uusi kierrosversio kertoo oopperan kuolemankohtauksesta yhdellä lauseella ilman yksityiskohtia. Ooppera ei nimeä Maestranzaa, joten tekstissä lukee "Sevillan härkätaisteluareenan edustalla". Kuuntele, onko sävy sopiva.
- Giraldillon kopion nykyinen paikka (katedraalin Prinssin portilla) jäi vahvistamatta avatulla lähteellä. Kysymyksen oletus, että kopio on olemassa, on Wikipedian mukaan tosi.

## Tampere

### Näsinneula — kenttä `lyhyt`
- **Vanha:** "Näsinneulan hissit kulkevat kuusi metriä sekunnissa ja nousevat näköalatasanteelle sadankahdenkymmenen metrin korkeuteen noin puolessa minuutissa. Tornin juurella levittäytyy Särkänniemen huvipuisto, ja kirkkaana päivänä tasanteelta näkee kauas järvien ja metsien yli."
- **Uusi:** "Näsinneulan teräsbetonirunko valettiin liukuvaluna kesällä 1970, ja Unkarista tilatut rakennusmiehet saivat sen pystyyn kolmessakymmenessäkolmessa vuorokaudessa. Tornin korkeus päätettiin kokeilemalla eri korkeuksia helikopterista, ja nimen keksi kunnallisneuvos Lauri Santamäki yhdistämällä Näsijärven ja Seattlen Space Needle -tornin."
- **Syy:** 2 (tekninen tieto: hissin nopeus ja korkeus; toinen virke täytettä) ja 1 (huvipuisto toistui Särkänniemen kierrosversion kanssa). Tilalle rakentamis- ja nimitarina. Hissikysymys jäi, koska kierrosversio ei enää kerro sitä.
- **Lähde:** https://fi.wikipedia.org/wiki/N%C3%A4sinneula

### Tammerkoski — kenttä `lyhyt`
- **Vanha:** "Tammerkoski rantapuistoineen ja punatiilisine tehtaineen on Tampereen kansallisen kaupunkipuiston ydin, ja puisto on maan kahdestoista. Sen pinta-alasta yli kuusikymmentä prosenttia on vettä. Jo 1600-luvulla kosken rannoilla oli vilkas markkinapaikka, kauan ennen ensimmäisiä tehtaita."
- **Uusi:** "Tammerkoski syntyi noin seitsemäntuhatta viisisataa vuotta sitten. Sitä ennen muinaisen Näsijärven vedet virtasivat pohjoiseen ja laskivat Lapuanjoen latvojen kautta Pohjanlahteen, mutta maankohoamisen myötä vesi nousi etelässä, ja sinne syntynyt puro kalvoi hiekkaiseen maaperään vähitellen kosken."
- **Syy:** 2 (hallintoa: kaupunkipuiston järjestysnumero ja vesipinta-alan osuus). Tilalle tarina kosken synnystä ja virtaussuunnan kääntymisestä.
- **Lähde:** https://fi.wikipedia.org/wiki/Tammerkoski

### Tammerkoski — kenttä `kysymykset`
- **Vanha:** "Mitä kansallismaisema tarkoittaa?"
- **Uusi:** "Milloin kosken rannoilla pidettiin markkinoita?"
- **Syy:** 7 (yleinen kysymys, ei liity nimenomaan tähän kohteeseen). Markkinatieto jäi pois kierrosversiosta, joten se siirtyi kysymykseksi (Brahe määräsi markkinat 1638).
- **Lähde:** https://fi.wikipedia.org/wiki/Tammerkoski

### Särkänniemi — kenttä `lyhyt`
- **Vanha:** "Särkänniemessä käy vuosittain yli kuusisataatuhatta vierailijaa, ja niemen akvaario avattiin jo vuonna 1969, ennen huvipuistoa. …"
- **Uusi:** "Särkänniemen akvaario avattiin jo vuonna 1969, kuusi vuotta ennen huvipuistoa. …" (delfinaariovirke ennallaan)
- **Syy:** 2 (kävijämäärä). Delfinaarion lähde vaihdettu: endcap.eu palautti virheen 500, joten tilalle Yle, joka vahvistaa neljä delfiiniä ja eläinoikeusryhmien arvostelun. Nykytila tarkistettu: akvaario, planetaario ja Sara Hildénin taidemuseo toimivat 2026 (museolla näyttely 1–4/2026, laajennus nykyisellä paikalla kaavoitteilla).
- **Lähde:** https://fi.wikipedia.org/wiki/S%C3%A4rk%C3%A4nniemi ; https://yle.fi/a/3-11968942 ; https://sarkanniemi.fi/en

### Särkänniemi — kenttä `kysymykset`
- **Vanha:** "Mikä on Särkänniemen hurjin laite?"
- **Uusi:** "Mitä niemellä oli ennen huvipuistoa?"
- **Syy:** 7 (vastaus vanhenee: uusi Konect-vuoristorata avataan 2026, laitteet vaihtuvat).
- **Lähde:** https://en.wikipedia.org/wiki/S%C3%A4rk%C3%A4nniemi

### Finlaysonin tehdasalue — kenttä `teksti`
- **Vanha:** "…ja uusien omistajien aikana siitä kasvoi puuvillatehdas, jossa työskenteli 1900-luvun alussa yli kolmetuhatta ihmistä."
- **Uusi:** "…ja uusien omistajien aikana puuvillatehdas kasvoi niin suureksi, että siellä työskenteli 1900-luvun alussa yli kolmetuhatta ihmistä."
- **Syy:** 3 (vivahde: Finlayson itse aloitti puuvillan kehruun jo 1828; uudet omistajat vuodesta 1836 kasvattivat tehtaan, eivät tehneet siitä puuvillatehdasta).
- **Lähde:** https://en.wikipedia.org/wiki/James_Finlayson_(industrialist)

### Finlaysonin tehdasalue — kenttä `lyhyt`
- **Vanha:** "…Plevnan piirityksen, mukaan, ja nykyään siinä toimii elokuvateatteri."
- **Uusi:** "…Plevnan piirityksen, mukaan, ja valmistuessaan se oli Pohjoismaiden suurin kutomosali."
- **Syy:** 1 (elokuvateatteri toistui saman kohteen tekstissä). Lisäksi kuollut/epätarkka lähde: en.wikipedia Plevna ei mainitse "neljäs Euroopassa" eikä 120 lamppua; ne vahvistuivat James Finlaysonin artikkelista.
- **Lähde:** https://en.wikipedia.org/wiki/Plevna,_Tampere ; https://en.wikipedia.org/wiki/James_Finlayson_(industrialist)

### Pyynikin näkötorni — kenttä `teksti`
- **Vanha:** "Ensimmäisen, puisen tornin kaupunki rakennutti tähän jo vuonna 1888"
- **Uusi:** "Ensimmäinen, puinen torni rakennettiin tähän jo vuonna 1888"
- **Syy:** 3 (rakennuttajaa "kaupunki" ei vahvistunut; lähteet kertovat vain vuoden ja suunnittelijan Georg Schreckin).
- **Lähde:** https://en.wikipedia.org/wiki/Pyynikki_observation_tower

### Pyynikin näkötorni — kenttä `lyhyt`
- **Vanha:** "Pyynikin näkötornin suunnitteli arkkitehti Vilho Kolho, ja torni muurattiin paikallisesta punaisesta graniitista. Tornin juurella toimiva kahvila on kuuluisa munkeistaan. Pyynikki rauhoitettiin luonnonsuojelualueeksi vuonna 1993, ja harjun luontopolku alkaa aivan tornin juurelta."
- **Uusi:** "Pyynikin näkötornin vihkiäiset oli määrä pitää syyskuussa 1929, mutta ne peruttiin, kun höyrylaiva Kuru upposi Näsijärvellä ja yli sata ihmistä hukkui. Onnettomuus on yhä Suomen sisävesien pahin. Tornin juurella toimii nykyään munkeistaan kuuluisa kahvila."
- **Syy:** 2 ("suunnitteli arkkitehti Y" + rauhoituspäätös = perustietoa ja hallintoa); punagraniitti toistui myös tekstissä (1). Tilalle Kurun onnettomuus ja peruttu vihkiäinen, munkkikahvila säilyi. Kolhon tittelin ristiriita ratkesi: fi.wikipedia "apulaiskaupunginarkkitehti" (ei enää tekstissä).
- **Lähde:** https://fi.wikipedia.org/wiki/Pyynikin_n%C3%A4k%C3%B6torni ; https://en.wikipedia.org/wiki/SS_Kuru

### Museokeskus Vapriikki — kenttä `lyhyt`
- **Vanha:** "Museokeskus Vapriikin talo kuului Tampereen Pellava- ja Rautateollisuudelle, jonka nimi lyhennettiin 1950-luvulla Tampellaksi. Yhtiö syntyi vuonna 1861, kun kosken rannalla toimineet pellavatehdas ja konepaja yhdistettiin. Myöhemmin Tampella valmisti muun muassa paperikoneita, vetureita ja aseita."
- **Uusi:** "Museokeskus Vapriikin Suomen pelimuseo syntyi joukkorahoituksella, kun yli tuhat tukijaa lahjoitti hankkeelle vuonna 2015 yhteensä yli kahdeksankymmentäviisituhatta euroa ja peliyhtiöt kuten Supercell tukivat sitä. Museo avattiin vuonna 2017, ja samana vuonna Vapriikki valittiin yleisöäänestyksessä Suomen vuosisadan museoksi."
- **Syy:** 2 (yhtiön nimenmuutos ja fuusio = organisaatiohistoriaa). Nykytila: pelimuseo on ollut remontissa ja avautuu uudelleen laajennettuna 10.10.2026 (vapriikki.fi), joten teksti ei väitä, mitä museossa nyt on. Tampella-kysymys jäi (oletus tosi).
- **Lähde:** https://en.wikipedia.org/wiki/Finnish_Museum_of_Games ; https://en.wikipedia.org/wiki/Vapriikki_Museum_Centre ; https://www.vapriikki.fi/

### Lähdekorjaukset ilman tekstimuutosta
- Näsinneula: journal.fi-lähde (hissit) korvattu fi.wikipedialla.
- Tammerkoski: kaupunkipuiston lähteet (yle, valtioneuvosto) poistettu, koska väite poistui.

### Ratkaistut epävarmuudet (PILVI-RAPORTTI)
- Tuomiokirkon seppele "kohti alttaritaulua": ku.fi sanoo "kaksitoista poikaa kantaa elämänseppelettä kohti Ylösnousemus-taulua", ja Ylösnousemus on Enckellin alttaritaulu. Väite pidetty.
- Kosken ylitys 1500-luvulla: en.wikipedia Hämeensilta "first known bridge 16th century". Pidetty.
- Kuoleman puutarhan paikka: fi.wikipedia sanoo "alttarin kahta puolta", ku.fi/hakutulokset "pohjoisen lehterin alla"; ei ristiriitaa (lehterin alla alttarin sivulla). Pidetty, merkitään Päätoimittajalle pieneksi epävarmuudeksi.
- Näsinneula "Pohjoismaiden korkein näkötorni": pätee, Kaknästornet on yhä suljettu yleisöltä (Teracom ei avaa).

Muut tarkistetut: avaus (36 sanaa, ilmakuva kannaksesta ja koskesta, Hämeensillan patsaat 1929 = "lähes sata vuotta" pätee), Hämeensilta (patsaat, Haarla, vapunaaton lakitus), Amuri, tuomiokirkko.

## Tukholma

### Tukholman kuninkaanlinna — kenttä `lyhyt`
- **Vanha:** "…kuten Kustaa Vaasan valtakunnanmiekkaa ja Erik neljännentoista kruunua. Kuningaspari työskentelee linnassa, mutta kotinsa se on tehnyt vuodesta 1981 Drottningholmin linnaan kaupungin länsipuolelle."
- **Uusi:** "…kuten Kustaa Vaasan valtakunnanmiekkaa. Siellä on myös flaamilaisen kultasepän vuonna 1561 valmistama Erik neljännentoista kruunu, jota pidetään maailman vanhimpana yhä käytössä olevana kuninkaankruununa."
- **Syy:** 1 (kuninkaan asuminen Drottningholmissa vuodesta 1981 toistui Drottningholmin tekstissä ja kierrosversiossa, ja "työskentelee linnassa" avauksessa "työpaikka"). Tilalle kruunun tarina.
- **Lähde:** https://www.kungligaslotten.se/english/archives/the-state-regalia/2018-03-05-king-erik-xivs-crown.html

### Tukholman kaupungintalo — kenttä `lyhyt`
- **Vanha:** "…Hänen jäännöksiään ei kuitenkaan koskaan saatu siirrettyä Varnhemin luostarikirkosta, joten hauta on yhä tyhjä. Kesäisin torniin pääsee kiipeämään, ja huipulta näkyy koko keskusta."
- **Uusi:** "…Varnhemin seurakunta kieltäytyi kuitenkin luovuttamasta hänen jäännöksiään luostarikirkostaan, joten hauta on yhä tyhjä. Vuonna 2002 Varnhemin hauta avattiin, ja DNA-tutkimus vahvisti, että jaarli todella lepää siellä."
- **Syy:** 5 (NYKYAIKA: torni on suljettu koko 2026, ja peruskorjaus kestää alkuvuodesta 2027 vuoden 2028 loppuun, stadshuset.stockholm). Lisäksi 3: "ei saatu siirrettyä" → syy oli Varnhemin kirkkoneuvoston kieltäytyminen. Lähde (tornin aukiolo) poistettu.
- **Lähde:** https://stadshuset.stockholm/en/visit-stockholm-city-hall/city-hall-tower ; https://www.vastsverige.com/en/skara/varnhem/history-of-varnhem/birger-jarl--the-royal-graves/

### Tukholman kaupungintalo — kenttä `kysymykset`
- **Vanha:** "Miksi Birger-jaarlin hauta on tyhjä?" → **Uusi:** "Kuka oli Birger-jaarli?"
- **Syy:** 7 (kierrosversio vastaa nyt suoraan kysymykseen; tilalle ihmiseen liittyvä kysymys).

### Riddarholmenin kirkko — kenttä `teksti`
- **Vanha:** "Riddarholmenin kirkko seisoo pienen Riddarholmenin saaren keskellä, ja sen valurautainen pitsihuippu…"
- **Uusi:** "Pienen Riddarholmenin saaren keskellä seisoo Riddarholmenin kirkko, jonka valurautainen pitsihuippu…"
- **Syy:** 6 (teksti alkoi ruotsinkielisellä nimellä; nyt suomenkielinen alkusana). Lähdekorjaus: "Tukholman ainoa säilynyt keskiaikainen luostarikirkko" ei löytynyt historyhit.com-sivulta, vahvistettu sv.wikipediasta ("Stockholms enda bevarade medeltida klosterkyrka").
- **Lähde:** https://sv.wikipedia.org/wiki/Riddarholmskyrkan

### Riddarholmenin kirkko — kenttä `lyhyt`
- **Vanha:** "Riddarholmenin kirkon seiniä peittävät vaakunakilvet, sillä perinteen mukaan jokaisen kuolleen Serafiimiritarikunnan ritarin vaakuna kiinnitetään kirkon seinään. Ensimmäinen tänne haudattu kuningas oli Maunu Ladonlukko. Kirkko rakennettiin lähes kokonaan tiilestä, mikä oli silloin Ruotsissa harvinaista."
- **Uusi:** "Kuninkaiden hautakirkon seiniä Riddarholmenilla peittävät vaakunakilvet, sillä jokaisen kuolleen Serafiimiritarikunnan ritarin vaakuna kiinnitetään kirkon seinään. Ritarin hautajaispäivänä kirkon kellot soivat keskipäivällä taukoamatta tunnin ajan. Kirkon 1200-luvun lopulla muuratut seinät ovat Tukholman vanhimmat maanpäälliset tiilimuurit."
- **Syy:** 6 (ruotsinkielinen alkusana); 1 (hautaamisaihe toistui saman kohteen tekstissä ja kierroksella kaupungintalon ja metsähautausmaan kanssa: Maunu Ladonlukon virke pois, tilalle serafiimisoitto); 3 ("tiili harvinainen Ruotsissa" ei löytynyt mainitusta lähteestä, joten se vaihdettiin sv.wikipedian vahvistamaan väitteeseen vanhimmista tiilimuureista). PILVI-epävarmuus Maunu Ladonlukosta ratkesi: kungligaslotten.se vahvistaa, mutta sv.wikipedian mukaan vuoden 2011 analyysissä luut ajoitettiin vuosiin 1430–1520, joten virke jäi pois.
- **Lähde:** https://sv.wikipedia.org/wiki/Riddarholmskyrkan ; https://en.wikipedia.org/wiki/Riddarholmen_Church

### Gamla stan — kenttä `lyhyt`
- **Vanha:** "Vanhassakaupungissa asuu nykyään noin kolmetuhatta ihmistä. Suomalaisen kirkon takapihalla istuu Tukholman pienin julkinen muistomerkki, viisitoista senttimetriä korkea Rautapoika, joka katselee kuuta. Talvella patsaalla on usein pipo ja kaulaliina, ja ohikulkijat jättävät sille kolikoita."
- **Uusi:** "Vanhankaupungin Suomalaisen kirkon takapihalla istuu Tukholman pienin patsas, viisitoista senttimetriä korkea Rautapoika. Kuvanveistäjä Liss Eriksson kuvasi siinä itseään poikana, joka istui kylmissään ullakkohuoneessa kädet jalkojen ympärillä ja katseli kuuta. Talvella tukholmalaiset neulovat patsaalle pipoja ja kaulaliinoja."
- **Syy:** 2 (asukasluku = tilastoa). Tilalle patsaan syntytarina. Kolikot siirtyivät kysymykseksi (kysymys jo olemassa).
- **Lähde:** https://www.svenskakyrkan.se/nyheter/rautapoika ; https://en.wikipedia.org/wiki/J%C3%A4rnpojke

### Vasa-museo — kenttä `lyhyt`
- **Vanha:** "Vasa-museon laiva on koristeltu sadoilla puuveistoksilla. Alus oli rakennettu liian kapeaksi ja korkeaksi, ja kun ensimmäinen kunnon tuulenpuuska kallisti sitä, vesi ryntäsi sisään avoimista tykkiporteista. Vuonna 2024 museossa kävi yli miljoona kolmesataatuhatta ihmistä."
- **Uusi:** "Vasa-museon laiva oli rakennettu liian kapeaksi ja korkeaksi. Jo ennen lähtöä vara-amiraali Fleming seurasi koetta, jossa miehistö juoksi kannen poikki edestakaisin, ja keskeytti sen kolmen juoksun jälkeen, koska pelkäsi laivan kaatuvan. Neitsytmatkalla tuulenpuuska painoi avoimet tykkiportit veden alle."
- **Syy:** 2 (kävijämäärä vuodelta 2024, joka myös vanhenee). Tilalle vakauskokeen tarina.
- **Lähde:** https://en.wikipedia.org/wiki/Vasa_(ship)

### Ulkoilmamuseo Skansen — kenttä `lyhyt`
- **Vanha:** "Ulkoilmamuseon Sollidenin lavalta lähetetään kesäisin Ruotsin suosituinta yhteislauluohjelmaa, Allsång på Skansenia, jota seuraa televisiosta tavallisesti noin kaksi miljoonaa katsojaa. Sollidenin terassilta avautuu koko puiston paras näkymä veden yli kohti kaupunkia."
- **Uusi:** "Ulkoilmamuseossa on laulettu yhteislauluja kesäisin vuodesta 1935, jolloin ensimmäiseen Allsång på Skanseniin osallistui vain noin viisikymmentä ihmistä. Nykyään kesätiistaisin televisioitavassa ohjelmassa Sollidenin lavan edessä laulaa kerralla jopa yli kaksikymmentätuhatta ihmistä."
- **Syy:** 2/3 (katsojaluku oli vain matkailusivulta, vaihtelee vuosittain ja "suosituin" ilman tukea; PILVI-epävarmuus). Tilalle vahvistettu alku 1935 ja yleisömäärä paikan päällä. Ohjelma jatkuu 2026.
- **Lähde:** https://en.wikipedia.org/wiki/Alls%C3%A5ng_p%C3%A5_Skansen ; https://www.svt.se/kultur/ingrosso-tar-over-allsangsscenen

### Drottningholmin linna — kenttä `teksti`
- **Vanha:** "Drottningholmin linna seisoo Mälarenin…" → **Uusi:** "Kuninkaallinen Drottningholmin linna seisoo Mälarenin…"
- **Syy:** 6 (ruotsinkielinen alkusana).

### Drottningholmin linna — kenttä `lyhyt`
- **Vanha:** "Drottningholmin linnaan pääsee keväästä syksyyn laivalla kaupungintalon vierestä, ja matka kestää noin tunnin. Puistossa seisoo Kiinalainen paviljonki, joka kertoo aikansa eurooppalaisten innostuksesta Kaukoitään. Kuninkaallinen pari asuu linnan eteläsiivessä, ja muu linna on avoinna kävijöille."
- **Uusi:** "Kuninkaallisen Drottningholmin puiston Kiinalainen paviljonki sai alkunsa kuningas Adolf Fredrikin yllätyslahjasta, kun hän rakennutti puisen kiinalaisen linnan kuningatar Lovisa Ulrikan syntymäpäiväksi vuonna 1753. Kultaisen avaimen ojensi kiinalaiseksi mandariiniksi puettu pieni kruununprinssi Kustaa, ja lahonneen puulinnan tilalle valmistui nykyinen paviljonki vuonna 1769."
- **Syy:** 2 (laivareitti ja aukiolo = käytännön tietoa), 1 (kuningasparin asuminen toistui tekstissä ja kuninkaanlinnan kierrosversiossa), 6 (ruotsinkielinen alkusana). Laivareitin ja Kiinalaisen paviljongin matkailusivulähteet poistettu.
- **Lähde:** https://en.wikipedia.org/wiki/Chinese_Pavilion_at_Drottningholm

### Drottningholmin linna — kenttä `kysymykset`
- **Vanha:** "Mikä Kiinalainen paviljonki on?" → **Uusi:** "Mitä Kiinalaisen paviljongin sisällä on?"
- **Syy:** 7 (kierrosversio vastaa nyt kysymykseen).

### Skeppsholmen — kenttä `teksti`
- **Vanha:** "…vanha purjelaiva af Chapman, jossa toimii retkeilymaja."
- **Uusi:** "…vanha purjelaiva af Chapman, joka toimi retkeilymajana yli seitsemänkymmentä vuotta."
- **Syy:** 5 (NYKYAIKA: retkeilymaja lopetti vuonna 2022; en.wikipedia on vanhentunut. Kesällä 2026 laivalla oli pop up -kahvila, ja siksi teksti ei kerro nykykäytöstä). Itä-Aasian museo avautui remontin jälkeen 19.9.2026, joten "toimivat nyt" pätee.
- **Lähde:** https://via.tt.se/pressmeddelande/4401515/skeppet-af-chapman-oppnar-igen?lang=sv ; https://via.tt.se/pressmeddelande/4405020/sommaroppet-pa-af-chapman?lang=sv

### Tarkistettu, ei muutosta
- Avaus (36 sanaa, ilmakuva saarista ja salmista, "Tervetuloa" suomeksi). Slussen ei esiinny Tukholman aineistossa.
- Kaknästornet: on yhä suljettu yleisöltä (ei avausta 2025–2026), teksti pätee. Globen/Avicii Arena ja SkyView pätevät. Stortorget: Nobel-museo on yhä Pörssitalossa (virallinen nimi nykyään Nobelprismuseet; "Nobel-museo" jätetty). Skogskyrkogården, Suurkirkko, Sergelin tori: ei korjattavaa.

### Epävarmuudet Päätoimittajalle
- Riddarholmen `korkeus_m` 90: huipun purku alkoi 17.9.2026, ja huippu kootaan takaisin vuoteen 2028 mennessä. Kirkko näyttää ilmasta nyt tornittomalta tai telineissä. Arvo jätettiin, koska se ei ole selvästi väärä pysyvälle äänitteelle.
- Tarkistimen huomiot nousivat 9:stä 13:een, koska Drottningholmin ja Riddarholmenin teksti ja lyhyt alkavat nyt suomenkielisellä sanalla (tyyppi 6).

## Valletta

### Pyhän Johanneksen ko-katedraali — kenttä `lyhyt`
- **Vanha:** "Pyhän Johanneksen ko-katedraali sai nimensä vuonna 1816, kun paavin bulla nosti sen samanarvoiseksi kuin Mdinan katedraali, Maltan piispan perinteinen istuin. Caravaggio otettiin ritarikuntaan vuonna 1608, mutta saman vuoden joulukuussa hänet erotettiin siitä oman maalauksensa edessä."
- **Uusi:** "Pyhän Johanneksen ko-katedraalin kuuluisimman maalauksen teki Caravaggio, joka saapui Maltalle vuonna 1607 Roomassa tehdyn tapon vuoksi etsittynä. Ritarikunta otti hänet jäsenekseen seuraavana kesänä, mutta jo joulukuussa hänet erotettiin poissaolevana, juuri hänen oman maalauksensa edessä."
- **Syy:** Tyyppi 2: ensimmäinen virke oli hallintopäätös (paavin bulla ja nimen alkuperä). Tilalle Caravaggion tarina kokonaisena. Lisäksi tyyppi 3: erottaminen tapahtui poissaolevana (in absentia), koska Caravaggio oli jo paennut. Syventävä "Miksi Caravaggio pakeni Maltalta?" jää edelleen auki. Bulla-lähde poistettu, lisätty kaksi uutta.
- **Lähde:** https://en.wikipedia.org/wiki/Caravaggio ; https://en.wikipedia.org/wiki/The_Beheading_of_Saint_John_the_Baptist_(Caravaggio)

### Suurmestarin palatsi — kenttä `lyhyt`
- **Vanha:** "Suurmestarin palatsi oli Maltan parlamentin istuin vuodesta 1921 vuoteen 2015, ja aluksi edustajat kokoontuivat palatsin seinävaatesalissa. Vuonna 1976 parlamentti siirtyi ritarikunnan entiseen asehuoneeseen, ja palatsin asekokoelma on nykyään yleisölle avoin museo."
- **Uusi:** "Suurmestarin palatsin seinävaatesalissa riippuu kymmenen gobeliinia, jotka espanjalainen suurmestari Ramon Perellos tilasi Pariisista vuonna 1708 lahjaksi ritarikunnalle. Niissä vilisee eksoottisia eläimiä ja kasveja vasta vähän aiemmin löydetyistä maista, ja sarja on ainoa täydellisenä säilynyt, joka on kudottu alkuperäisten mallipiirrosten mukaan."
- **Syy:** Tyyppi 2: vanha kierrosversio oli pelkkää organisaatiohistoriaa (parlamentin istuin ja salin vaihto). Tyyppi 5: seinävaatteet olivat entisöitävinä Belgiassa 2024–2026 ja palasivat saliin 2026, joten "riippuu" pitää nyt paikkansa. Kellon turkkilaiset orjahahmot (pilviraportin epävarmuus) vahvistettu Maltan kulttuuriministeriön sivulta, ja lähde vaihdettu sinne. Wikipedia vahvistaa korttelin.
- **Lähde:** https://heritagemalta.mt/news/the-grand-masters-palace-tapestries-start-a-two-year-restoration-journey-in-belgium/ ; https://www.guidememalta.com/en/magnificent-grand-master-s-palace-tapestries-return-after-two-year-restoration ; https://culture-malta.org/grand-masters-palace-and-armoury/ ; https://en.wikipedia.org/wiki/Grandmaster%27s_Palace,_Valletta

### Suurmestarin palatsi — kenttä `kysymykset`
- **Vanha:** "Mitä seinävaatesalin seinävaatteet esittävät?" / "Kuka toimii nykyään Maltan presidenttinä?"
- **Uusi:** "Mistä kellon kerrotaan tuodun Maltalle?" / "Kuka maalasi palatsin kattofreskot?"
- **Syy:** Tyyppi 7: presidenttikysymyksen vastaus vanhenee. Seinävaatekysymykseen vastaa nyt kierrosversio. Kellon Rhodos-perinne ja Nasonin freskot (1724) mainitaan Wikipediassa.
- **Lähde:** https://en.wikipedia.org/wiki/Grandmaster%27s_Palace,_Valletta

### Auberge de Castille — kenttä `lyhyt`
- **Vanha:** "Kastilian ritaritalo on paikalla jo toinen: nykyinen palatsi korvasi vuonna 1574 rakennetun talon, jossa Kastilian, Leónin ja Portugalin ritarit olivat asuneet. Pääministerin virasto muutti taloon vuonna 1972, kun pääministerinä oli Dom Mintoff."
- **Uusi:** "Kastilian ritaritalon rakennutti suurmestari Manuel Pinto, joka johti ritarikuntaa kolmekymmentäkaksi vuotta ja koristeli Maltaa barokkirakennuksilla. Loistolla oli hintansa: Pinton velat ajoivat osaltaan ritarikunnan hänen kuolemansa jälkeen vararikkoon, ja neljännesvuosisata myöhemmin talossa toimi jo ranskalaisten miehittäjien päämaja."
- **Syy:** Tyyppi 2: rakennushistoria ja viraston muutto ovat hallintoa. Tyyppi 1: "vuodesta 1972 pääministerin virasto" oli jo tekstissä. Uusi kertoo ihmisestä (Pinto, jonka rintakuva on tekstissä) ja käänteestä 1773 → 1798. Vararikko on muotoiltu Wikipedian mukaan ("contributed to bankrupting the Order").
- **Lähde:** https://en.wikipedia.org/wiki/Manuel_Pinto_da_Fonseca ; https://en.wikipedia.org/wiki/Auberge_de_Castille

### Auberge de Castille — kenttä `kysymykset`
- **Vanha:** "Kuka oli suurmestari Manuel Pinto?"
- **Uusi:** "Miksi talon katolla oli aikoinaan antenni?"
- **Syy:** Tyyppi 7 ja 1: kierrosversio vastaa nyt Pinto-kysymykseen. Katolle rakennettiin signaaliasema antenneineen vuonna 1889.
- **Lähde:** https://en.wikipedia.org/wiki/Auberge_de_Castille

### Manoel-teatteri — kenttä `lyhyt`
- **Vanha:** "Vallettan Manoel-teatteri on pieni, sillä salissa on vähän yli viisisataa paikkaa. Ensi-illan lavasteet suunnitteli ritarikunnan sotilasarkkitehti François Mondion, ja teatteri on saanut nimensä rakennuttajansa, portugalilaisen suurmestari António Manoel de Vilhenan mukaan."
- **Uusi:** "Vallettan Manoel-teatterin oven yllä lukee latinaksi, että talo on rakennettu kansan kunnialliseksi huviksi. Kun kaupunkiin avattiin vuonna 1866 uusi kuninkaallinen oopperatalo, teatteri hiljeni, ja kodittomat vuokrasivat sen permantopaikkoja yösijoikseen muutamalla pennillä. Valtio otti talon haltuunsa vasta vuonna 1956."
- **Syy:** Tyyppi 2: paikkaluku, lavastaja ja nimen alkuperä ovat perustietoa. Tyyppi 1: Vilhena rakennuttajana oli jo tekstissä. Samalla poistui epävarma paikkaluku (534/547).
- **Lähde:** https://en.wikipedia.org/wiki/Manoel_Theatre

### Piirityskello-muistomerkki — kenttä `lyhyt`
- **Vanha:** "Piirityskello-muistomerkki muistuttaa toisen maailmansodan pitkästä piirityksestä, jolloin Saksan ja Italian ilmavoimat pommittivat Maltaa kesäkuusta 1940 marraskuuhun 1942. Pahin kuukausi oli huhtikuu 1942, jolloin pienelle saarelle pudotettiin noin kuusituhatta seitsemänsataa tonnia pommeja."
- **Uusi:** "Piirityskello-muistomerkki katsoo satamaan, jonne elokuussa 1942 hinattiin kahden hävittäjäaluksen väliin sidottuna pahoin vaurioitunut tankkeri Ohio. Neljästätoista kauppalaivasta perille pääsi vain viisi, ja koska päivä oli Neitsyt Marian taivaaseenastumisen juhla, maltalaiset nimesivät saattueen Santa Marijan saattueeksi."
- **Syy:** Tyyppi 2: aikaväli ja pommitonnit ovat tilastoa. Tyyppi 1: "Saksan ja Italian ilmavoimat 1940" toisti saman sotakehyksen kuin Pyhän Elmon kierrosversio. Tilalle tuli tarina.
- **Lähde:** https://en.wikipedia.org/wiki/Operation_Pedestal

### Piirityskello-muistomerkki — kenttä `kysymykset`
- **Vanha:** "Mikä oli Pedestal-saattue?"
- **Uusi:** "Miksi kello soi juuri keskipäivällä?"
- **Syy:** Tyyppi 7: kierrosversio vastaa nyt saattuekysymykseen. Oletus, että kello soi keskipäivällä, on tekstissä ja lähteissä.
- **Lähde:** https://www.guidememalta.com/en/attraction/the-siege-bell-war-memorial (olemassa oleva lähde)

### Grand Harbour — kenttä `lyhyt`
- **Vanha:** "Vallettan suursatamaan hyökkäsi heinäkuussa 1941 varhain aamulla italialainen erikoisosasto pikaveneillä ja ihmistorpedoilla. Yksi räjähdevene osui sataman suulla aallonmurtajalle vievään siltaan, jonka jänne sortui, ja uusi silta rakennettiin samaan paikkaan vasta vuonna 2012."
- **Uusi:** "Vallettan suursataman vastarannalla Senglean niemen kärjessä seisoo pieni kivinen vartiokoju, jota kutsutaan nimellä Gardjola. Sen ikkunoiden yläpuolelle on veistetty silmä ja korva, valppauden vertauskuvat, sillä vartijan tehtävä oli tarkkailla sataman suuta."
- **Syy:** Tyyppi 1: kierroksen kolme viimeistä kierrosversiota (Piirityskello, Grand Harbour, Pyhä Elmo) kertoivat kaikki toisesta maailmansodasta. Grand Harbour vaihdettiin ritariajan yksityiskohtaan, joka myös näkyy ylhäältä. Syventävä "Miksi aallonmurtajan ja rannan välissä on aukko?" (se nojasi vanhaan kierrosversioon) → "Miksi ritarit muuttivat Birgusta Vallettaan?" (teksti kertoo Pyhän Angelon linnakkeesta). Aallonmurtajakysymys jää kysymyksiin, ja sen oletus pitää yhä.
- **Lähde:** https://www.visitmalta.com/en/a/info/senglea/

### Pyhän Elmon linnake — kenttä `lyhyt`
- **Vanha:** "Pyhän Elmon linnakkeen sotamuseon tärkein esine on George-risti, jonka kuningas Yrjö kuudes myönsi koko saarelle vuonna 1942. Museossa on myös Faith-niminen kaksitaso, ainoa säilynyt kolmesta hävittäjästä, jotka puolustivat saarta Italian julistettua sodan vuonna 1940."
- **Uusi:** "Pyhän Elmon linnakkeen sotamuseossa on George-risti, jonka Yrjö kuudes myönsi koko saarelle. Siellä on myös Faith-hävittäjän runko: tarinan mukaan saarta puolusti vuonna 1940 vain kolme konetta, Faith, Hope ja Charity, mutta todellisuudessa niitä oli useampia, ja nimet keksi myöhemmin maltalainen sanomalehti."
- **Syy:** Tyyppi 3: "kolme hävittäjää" on legenda. Hal Farin lennostolla oli käytössä kuusi Gladiatoria, ja nimet antoi kuukausia myöhemmin maltalainen sanomalehti. Legenda kerrotaan nyt legendana. Museon lähde vaihdettu (lonelyplanet nonprod → Wikipedia, kansallinen sotamuseo: George-risti esillä).
- **Lähde:** https://en.wikipedia.org/wiki/Hal_Far_Fighter_Flight ; https://en.wikipedia.org/wiki/National_War_Museum_(Malta)

### Tarkistettu, ei muutettu
- Yläbarrakan puutarhat: kierrosversio (puutarha avattiin kansalle vasta vuonna 1800, hissi 2012, 58 metriä, alle puoli minuuttia) on vahvistettu Wikipediasta (hissi noin 23 sekuntia). Se on tarinaksi heikohko mutta ei hallintoa, joten jätettiin. Tykinlaukaukset kello 12 ja 16 vahvistettu.
- Avaus: 37 sanaa, ilmakuva (vaalea kalkkikiviniemi kahden sataman välissä, ruutukaava, muurit), alkaa sanalla "Tervetuloa". Ei muutoksia.
- Isoisä: vain Grand Harbourin tekstissä ja vain merkinnän sisällöllä (mustat rungot kyljittäin kuin tikkuja laatikossa). OK.
- Pilviraportin epävarmuudet ratkaistu: palatsi täyttää korttelin (Wikipedia), orjahahmot vahvistettu (culture-malta.org), teatterin paikkaluku poistui kierrosversiosta.
- Tarkistin: `Valletta: 8 kohdetta, 0 virhettä, 7 huomiota` (sama määrä kuin ennen).

## Venetsia

### Pyhän Markuksen kellotorni — kenttä `lyhyt`
- **Vanha:** "Pyhän Markuksen kellotornin huipulla Galileo Galilei esitteli elokuussa 1609 kaukoputkeaan dogelle ja senaattoreille, jotka erottivat sen avulla kaukana merellä kulkevia laivoja. Vaikutus oli niin suuri, että Galilein palkka Padovan yliopistossa kaksinkertaistettiin."
- **Uusi:** "Pyhän Markuksen kellotornin kellotasanteella Galileo Galilei esitteli elokuussa 1609 kaukoputkeaan Venetsian ylimyksille ja senaattoreille. Galilein mukaan he erottivat merellä purjeita, jotka näkyivät paljaalla silmällä vasta kahden tunnin kuluttua, ja senaatti antoi hänelle elinikäisen viran Padovan yliopistossa."
- **Syy:** Tyyppi 3: dogea ei ollut tornissa. Tornissa 21.8.1609 olivat prokuraattori Priuli ja muita ylimyksiä, ja dogelle kaukoputki esiteltiin kolme päivää myöhemmin Dogen palatsin loggiasta. "Kaksinkertaistettiin" ei vahvistunut avatuista lähteistä, mutta elinikäinen virka (tuhat floriinia) vahvistui. Physicsworld-lähde (se sekoitti tapahtumat) korvattu.
- **Lähde:** https://en.wikipedia.org/wiki/St_Mark%27s_Campanile ; https://sts-program.mit.edu/news/discovery-is-always-political-by-david-kaiser/

### Pyhän Markuksen kellotorni — kenttä `kysymykset`
- **Vanha:** "Mitä Galileo näytti tornista dogelle?"
- **Uusi:** "Mitä Galileo näytti tornista senaattoreille?"
- **Syy:** Tyyppi 7: kysymyksen oletus oli epätosi (doge ei ollut tornissa).
- **Lähde:** https://en.wikipedia.org/wiki/St_Mark%27s_Campanile

### Pyhän Markuksen kellotorni — kenttä `teksti`
- **Vanha:** "…ainoa uhri oli tornin vartijan kissa, joka löytyi raunioita raivattaessa."
- **Uusi:** "…ainoa uhri oli tornin vartijan kissa."
- **Syy:** Tyyppi 3: kissan löytyminen raunioista nojasi yhteen lähteeseen (pilviraportin epävarmuus). Wikipedia vahvistaa vain, että vartijan kissa oli ainoa kuolonuhri. Teksti on nyt 68 sanaa.
- **Lähde:** https://en.wikipedia.org/wiki/St_Mark%27s_Campanile

### Pyhän Markuksen basilika — kenttä `teksti`
- **Vanha:** "…vuonna 828 ja kätkivät sen sianlihan alle…"
- **Uusi:** "…vuonna 828 ja kertomuksen mukaan kätkivät sen sianlihan alle…"
- **Syy:** Tyyppi 3: sianlihakätkö tunnetaan keskiaikaisten kronikoiden kertomuksesta (translatio), ei todennettuna tosiasiana. Isoisän virke on ennallaan ja vastaa merkintää.
- **Lähde:** https://en.wikipedia.org/wiki/St_Mark%27s_Basilica

### Pyhän Markuksen basilika — kentät `syventava` ja `kysymykset`
- **Vanha:** syventävä "Mistä basilikan pronssihevoset tulivat?", kysymys "Mistä pronssihevoset ovat peräisin?"
- **Uusi:** syventävä "Mitä basilikan kultamosaiikit esittävät?", kysymys "Miksi Napoleon vei hevoset Pariisiin?"
- **Syy:** Tyypit 1 ja 7: kierrosversio vastaa jo kysymykseen hevosten alkuperästä, joten syventävä ja kysymys toistivat sen. Syventävä liittyy nyt tekstin mosaiikkeihin. Napoleon vei hevoset vuonna 1797, ja ne palautettiin vuonna 1815.
- **Lähde:** https://en.wikipedia.org/wiki/Horses_of_Saint_Mark

### Huokausten silta — kenttä `lyhyt`
- **Vanha:** "Huokausten sillan toisessa päässä on Uusi vankila, joka rakennettiin, koska palatsin omat sellit eivät enää riittäneet. Nykyään Dogen palatsin museokierros kulkee sillan toista käytävää pitkin vankilaan, joten saman matkan voi kulkea itse."
- **Uusi:** "Huokausten sillasta kerrotaan nykyään romanttisempaa tarinaa kuin vankien huokauksista: pari, joka suutelee gondolissa sillan alla auringonlaskun aikaan kirkonkellojen soidessa, pysyy rakastuneena ikuisesti. Sama uskomus on vuoden 1979 elokuvan A Little Romance juonen ytimessä."
- **Syy:** Tyyppi 2: rakentamisen syy ja museoreitti ovat hallintoa ja käytännön tietoa. Lisäksi vankila mainittiin jo tekstissä. Uusi on tarina, joka asettuu vastakohdaksi tekstin vankilegendalle. Kysymys "Voiko sillan läpi kävellä nykyään?" jää kysymyksiin.
- **Lähde:** https://en.wikipedia.org/wiki/Bridge_of_Sighs

### Santa Maria della Salute — kenttä `lyhyt`
- **Vanha:** "Kupolikirkon Santa Maria della Saluten juhlaa vietetään yhä joka marraskuu, ja silloin Canal Granden yli rakennetaan kirkolle tilapäinen silta. Pääalttarilla on Kreetalta vuonna 1670 tuotu bysanttilainen Neitsyt Marian ikoni, ja sakaristossa on Tizianin maalauksia."
- **Uusi:** "Kupolikirkon Santa Maria della Saluten juhlapäivänä venetsialaiset kävelevät joka marraskuu Canal Granden yli tilapäistä siltaa pitkin kirkkoon viemään kynttilän. Juhlaruokana syödään castradinaa, savustetusta lampaanlihasta ja kaalista haudutettua ruokaa, perimätiedon mukaan kiitoksena dalmatialaisille, jotka toivat kaupunkiin savulihaa ruton aikana."
- **Syy:** Tyyppi 2: toinen virke oli inventaario (ikoni ja maalaukset). Tilalle tuli juhlan elävä yksityiskohta. Dalmatialaisten osuus kerrotaan perimätietona.
- **Lähde:** https://1600.venezia.it/en/node/1374

### Santa Maria della Salute — kenttä `kysymykset`
- **Vanha:** "Mitä marraskuun Saluten juhlassa tapahtuu?"
- **Uusi:** "Mikä ikoni kirkon pääalttarilla on?"
- **Syy:** Tyyppi 7: kierrosversio vastaa nyt juhlakysymykseen. Ikoni (Mesopanditissa, vuodelta 1670) on vanhoissa lähteissä.
- **Lähde:** https://en.wikipedia.org/wiki/Panagia_Mesopantitisa (olemassa oleva lähde)

### Rialton silta — kenttä `teksti`
- **Vanha:** "Kivisillan suunnittelusta kilpailivat muiden muassa Michelangelo ja Andrea Palladio, mutta työ annettiin…"
- **Uusi:** "Kivisillan suunnitelmia tekivät muiden muassa Andrea Palladio ja Jacopo Sansovino, ja Michelangeloakin harkittiin, mutta työ annettiin…"
- **Syy:** Tyyppi 3: Wikipedian mukaan suunnitelmia jättivät Sansovino, Palladio ja Vignola, ja Michelangeloa vain harkittiin. Hän ei osallistunut kilpailuun.
- **Lähde:** https://en.wikipedia.org/wiki/Rialto_Bridge

### Rialton silta — kenttä `lyhyt`
- **Vanha:** "Rialton silta lepää noin kahdentoistatuhannen puupaalun varassa, jotka lyötiin syvälle laguunin mutaan. Vuosina 2015 ja 2016 silta kunnostettiin perusteellisesti ensimmäistä kertaa yli neljäänsataan vuoteen, ja työt tehtiin osissa, jotta silta pysyi koko ajan auki."
- **Uusi:** "Rialton sillan yhtä kivikaarta pidettiin aikanaan niin uhkarohkeana, että arkkitehti Vincenzo Scamozzi ennusti sen sortuvan. Silta on silti seissyt jo yli neljäsataa vuotta noin kahdentoistatuhannen puupaalun varassa, jotka lyötiin syvälle laguunin mutaan."
- **Syy:** Tyyppi 2: paalumäärä ja kunnostusurakka olivat teknistä tietoa. Paalut jäävät, mutta nyt osana tarinaa (ennuste tuhosta ja sen kumoutuminen).
- **Lähde:** https://en.wikipedia.org/wiki/Rialto_Bridge ; https://amusementlogic.com/general-news/deep-foundations-the-example-of-venice/ (olemassa oleva paalulähde)

### Canal Grande — kenttä `lyhyt`
- **Vanha:** "Suuren kanavan, Canal Granden, ylittää nykyään neljä siltaa. Uusin on Santiago Calatravan suunnittelema teräskaari, joka avattiin syyskuussa 2008 rautatieaseman ja Piazzale Roman välille. Vanhin on Rialton silta, joka oli pitkään kanavan ainoa silta."
- **Uusi:** "Suuren kanavan, Canal Granden, varrella seisoo palatsi Ca' Vendramin Calergi, jossa säveltäjä Richard Wagner kuoli sydänkohtaukseen helmikuussa 1883. Vuodesta 1959 palatsissa on toiminut Venetsian kasino, ja sen huoneissa on myös Wagnerille omistettu museo."
- **Syy:** Tyyppi 1: "Rialto oli pitkään kanavan ainoa silta" toisti Rialton sillan tekstiä ("vuoteen 1854 asti ainoa paikka, josta kanavan yli pääsi kävellen"). Tyyppi 2: siltaluettelo oli perustietoa. Uusi kertoo ihmisestä ja yllättävästä nykykäytöstä. Syventävä "Mitkä neljä siltaa kanavan ylittävät?" jää.
- **Lähde:** https://en.wikipedia.org/wiki/Ca%27_Vendramin_Calergi

### Ca' d'Oro — kenttä `kysymykset`
- **Vanha:** "Mitä palatsin taidegalleriassa on nähtävissä?"
- **Uusi:** "Mitä taideteoksia Franchetti keräsi?"
- **Syy:** Tyypit 5 ja 7: Galleria Giorgio Franchetti on suljettu viimeisen entisöintivaiheen ajaksi helmikuusta 2026 (avoinna vain Mantegnan kappeli ja piha), joten "nähtävissä" ei pidä nyt. Teksti ei väitä museon olevan auki, joten sitä ei muutettu.
- **Lähde:** https://cultura.gov.it/evento/domenica-al-museo-alla-galleria-giorgio-franchetti-alla-ca-doro-1-febbraio-2026

### Pyhän Markuksen tori — kenttä `lahteet`
- Kielitekstit ennallaan. Maurien lyöntiaikojen (kaksi minuuttia ennen tasaa ja jälkeen) lähteeksi lisätty Italian virallinen matkailusivu ja Wikipedia (paljastettiin 1.2.1499, pohjoislaita).
- **Lähde:** https://www.italia.it/es/veneto/venecia/torre-dell-orologio ; https://en.wikipedia.org/wiki/St_Mark%27s_Clocktower

### Tarkistettu, ei muutettu
- Dogen palatsi: Casanovan pako (kierrosversio) ja Falieron musta verho ovat kunnossa. koko_m 110 (pilviraportin epävarmuus) on järkevä kameramitta palatsikorttelille (julkisivut noin 70–75 metriä, kortteli noin 100 metriä), joten sitä ei muutettu.
- Nykytila: MOSE, päiväkävijämaksu ja risteilyalusten kielto eivät esiinny missään tekstissä. Torin "korkean veden aikaan se tulvii ensimmäisenä" pitää yhä, koska MOSE nostetaan vasta noin 110 sentin ennusteella ja tori tulvii jo matalammalla vedellä. Basilikan hevosten jäljennökset parvekkeella ja alkuperäiset museossa vahvistettu. Kellotornin perustusten vahvistustyöt valmistuivat vuonna 2013. Rialton kunnostus (2015–2016) on valmis, eikä siitä enää puhuta. Kyyhkysten ruokintakielto on yhä voimassa.
- Napoleonin "Euroopan salonki" on kerrottu "kerrotaan"-muodossa (pilviraportin epävarmuus), ja se riittää.
- Ca' d'Oron "lahjoitti valtiolle 1916": Wikipedia sanoo "bequeathed", mutta Franchetti kuoli vasta 1920-luvulla, joten lahjoitus on oikea muoto. Jätetty ennalleen.
- Avaus: 38 sanaa, ilmakuva (punaiset katot, saarirykelmä, Canal Granden käänteinen S), alkaa sanalla "Tervetuloa". Ei muutoksia.
- Isoisä: vain basilikan tekstissä, merkinnän sisällöllä. OK.
- Tarkistin: `Venetsia: 14 kohdetta, 0 virhettä, 9 huomiota` (sama määrä kuin ennen).

## Vilna

### Vilnan vanhakaupunki — kenttä `lyhyt`
- **Vanha:** "Vilnan vanhassakaupungissa on seitsemänkymmentäneljä korttelia, seitsemänkymmentä katua ja kujaa sekä lähes tuhat viisisataa rakennusta. Sitä pidetään Alppien pohjoispuolen suurimpana ja itäisimpänä barokkikaupunkina. Kaupunkia ympäröi aikoinaan muuri, jonka yhdeksästä portista vain yksi on yhä pystyssä."
- **Uusi:** "Vilnan vanhassakaupungissa seisoi yli kolmesataa vuotta Suuri synagoga, juutalaisen Vilnan sydän. Natsit tuhosivat sen sodassa, ja neuvostovalta purki rauniot ja rakensi paikalle päiväkodin ja koulun. Viime vuosina arkeologit ovat kaivaneet maan alta esiin rukoussalin lattian ja barokkityylisen lukukorokkeen."
- **Syy:** Tyyppi 2: korttelit, kadut ja rakennusmäärät ovat tilastoa. Tyyppi 1: "yhdeksästä portista vain yksi on pystyssä" toisti Aamuportin tekstin (Aamuportti on kierroksella). Tyyppi 3: superlatiivi "Alppien pohjoispuolen suurin barokkikaupunki" ei löytynyt avatusta Wikipediasta. Wikipedian nykyversio sanoo "Itä- ja Keski-Euroopan suurin barokkivanhakaupunki". Uusi tarina tulee pelin aineistosta (Suuri synagoga, Liettuan Jerusalem), ja nykytila on tarkistettu: päiväkoti purettiin 2025 ja rukoussali sekä bima paljastettiin 2026. Kaksi tilastolähdettä poistettu, yksi lisätty.
- **Lähde:** https://en.wikipedia.org/wiki/Great_Synagogue_of_Vilna

### Vilnan vanhakaupunki — kenttä `kysymykset`
- **Vanha:** "Mitä vanhassakaupungissa tehdään nykyään iltaisin?"
- **Uusi:** "Miksi Vilnaa kutsuttiin Liettuan Jerusalemiksi?"
- **Syy:** Tyyppi 7: yleinen iltaelämäkysymys sopisi minkä tahansa kohteen alle, ja vastaus vanhenee. Uusi kysymys liittyy uuteen kierrosversioon, ja oletus on tosi (pelin aineisto).
- **Lähde:** pelin aineisto (pohja/vilna.json, tausta)

### Gediminasin torni — kentät `lyhyt` ja `puhe_lyhyt`
- **Vanha:** "…nousi Liettuan kolmivärinen lippu ensimmäisen kerran uudenvuodenpäivänä 1919…"
- **Uusi:** "…nousi Liettuan kolmivärinen lippu uudenvuodenpäivänä 1919…"
- **Syy:** Tyyppi 3: lähteet ovat ristiriidassa. Liettuan yleisensyklopedian (VLE) mukaan lippu nostettiin torniin 1.1.1919 "toisen kerran", koska siitä oli tehty päätös jo 1918. Kansallismuseon ja liputuspäivän mukaan kyseessä oli ensimmäinen kerta. Kiistanalainen "ensimmäisen kerran" poistettu, eikä muuta muuteta. Lähteiden kuvaukset päivitetty: linnamäen korkeus 48 m (Castle Hill -artikkeli), ja vuoden 1988 lipunnosto vahvistettu tv3.lt:stä.
- **Lähde:** https://www.vle.lt/straipsnis/lietuvos-valstybes-veliava/ ; https://www.tv3.lt/naujiena/lietuva/trispalvei-90-n193469 ; https://en.wikipedia.org/wiki/Castle_Hill_(Vilnius)

### Gediminasin torni — `lahteet` (NYKYAIKA-tarkistus, tekstiin ei muutoksia)
- Tornin museo ja näköalatasanne ovat auki 2026: VilniusGO kertoo 12.3.2026, että uudistettu torni näyttelyineen ja näköalatasanteineen on avoinna, ja linnamäen rinteet vahvistettiin 2017–2022. Tekstin "Nykyään tornissa on museo, ja sen näköalatasanteelta näkee koko vanhankaupungin" pitää paikkansa. Museolähteeksi vaihdettu VilniusGO.
- **Lähde:** https://vilniusgo.lt/atsinaujines-gedimino-pilies-bokstas-ka-verta-pamatyti/ ; https://en.wikipedia.org/wiki/Castle_Hill_(Vilnius)

### Vilnan tuomiokirkko — kenttä `lyhyt`
- **Vanha:** "Hautaholvi löytyi vasta vuonna 1931, kun tulva oli huuhtonut kirkon kellareita."
- **Uusi:** "Hautaholvi löytyi vasta vuonna 1931, kun insinöörit tutkivat tulvan vaurioittamia perustuksia."
- **Syy:** Tyyppi 3: tulva ei paljastanut holvia. Insinöörit kaivoivat lattian alle tarkistaakseen tulvan jälkeen perustusten kunnon ja löysivät onkalon. Vanha lähde (bpmuziejus.lt/crypts.html) palauttaa 404:n, joten se on korvattu LRT:n jutulla. Joulukuun 2024 kruunulöytö on vahvistettu LRT:stä: kruunuja ei ole vielä asetettu näytteille, eikä teksti niin väitäkään.
- **Lähde:** https://www.lrt.lt/en/news-in-english/19/1360434/the-great-1931-flood-of-vilnius-sailing-on-wardrobes-and-a-macabre-discovery ; https://www.lrt.lt/en/news-in-english/19/2453837/burial-crowns-of-lithuanian-polish-rulers-discovered-in-vilnius-cathedral

### Vilnan tuomiokirkko — `lahteet` ja `korkeus_m` (ei tekstimuutosta)
- Vuoden 1949 sulkemiselle ei ollut lähdettä (Kuzman artikkeli ei mainitse sitä). Lisätty cityofmercy.lt: "suljettu 1949–1988, pitkään taidegalleriana". Kellotapulin lähde on vaihdettu govilnius.lt:hen.
- `korkeus_m` 57 on kellotapulin korkeus ristin kanssa (ilman ristiä 52 m). Kirkkorakennuksen oman korkeuden lähdettä ei löytynyt. Arvo jätetään ennalleen, koska kameran kehystyksessä korkein osa on tapuli. Ratkaisu Päätoimittajalle, jos halutaan pelkän kirkon korkeus.
- **Lähde:** https://cityofmercy.lt/en_GB/objektai/vilniaus-arkikatedra-bazilika/ ; https://govilnius.lt/vilnius-cathedral-bell-tower

### Aamuportti — kenttä `lyhyt`
- **Vanha:** "Aamuportin Neitsyt Marian kuva maalattiin todennäköisesti noin vuonna 1630 pohjoisen renessanssin tyyliin. Paljasjalkakarmeliitat rakensivat sille oman kappelin vuonna 1671. Paavi Johannes Paavali toinen rukoili kuvan edessä rukousnauhaa pyhiinvaeltajien kanssa vuonna 1993."
- **Uusi:** "Aamuportin Neitsyt Marian kuvan oikeassa hihassa näkyy yhä luodinreikä. Kerrotaan, että sen ampui ruotsalainen sotilas, kun Ruotsin armeija valtasi Vilnan vuonna 1702. Legendan mukaan raskas rautaportti putosi pääsiäislauantain aamuna ja murskasi neljä ruotsalaista sotilasta."
- **Syy:** Tyyppi 2: kolme vuosilukua peräkkäin (maalaus, kappeli, paavin vierailu) ilman tarinaa. Lisäksi tyyppi 3: lähteet ovat ristiriidassa kappelin vuodesta (1671 tai 1672). Tilalle tuli vuoden 1702 tarina, jossa legenda on merkitty legendaksi. Kaksi lähdettä poistettu, yksi lisätty.
- **Lähde:** https://en.wikipedia.org/wiki/Our_Lady_of_the_Gate_of_Dawn

### Pyhän Annan kirkko — kenttä `teksti`
- **Vanha:** "Todellisuudessa hänen ratsuväkensä piti kirkossa hevosiaan ja poltti sen puiset sisustukset."
- **Uusi:** "Todellisuudessa hänen perääntyvät sotilaansa tekivät kirkosta varaston ja polttivat sen penkit ja rippituolit."
- **Syy:** Tyyppi 3: lähteeksi merkitty History Hit ei mainitse ratsuväkeä, talleja eikä vuotta 1859 (tarkistettu). Liettuan suurruhtinaskunnan historiasivun mukaan perääntyvä armeija teki kirkosta varaston ja poltti penkit, rippituolit ja muut puutyöt. Saman lähteen mukaan Napoleonin lausahdus julkaistiin vasta Kirkorin oppaassa 1859. Molemmat lähteet vaihdettu.
- **Lähde:** https://www.ldkistorija.lt/?p=8428

### Pyhän Annan kirkko — kenttä `lyhyt`
- **Vanha:** "Pyhän Annan kirkon vieressä seisoo 1800-luvulla rakennettu kellotapuli, joka jäljittelee goottilaista tyyliä. Kirkon arkkitehdiksi on arveltu gdanskilaista Michał Enkingeriä, joka työskenteli kirkolla 1500-luvun alussa. Yhdessä bernardiinikirkon ja luostarin kanssa se muodostaa yhden Vilnan merkittävimmistä rakennuskokonaisuuksista."
- **Uusi:** "Pyhän Annan kirkon paikalla seisoi ensin puukirkko, joka rakennettiin Vytautas Suuren ensimmäiselle puolisolle Annalle ja kaupungissa käyville saksalaisille katolilaisille. Puukirkko paloi vuonna 1419. Nykyisen tiilikirkon ulkoasu on säilynyt lähes muuttumattomana, mutta julkisivun pienet sivutornit puuttuivat pitkään ja rakennettiin uudelleen vasta vuonna 2009."
- **Syy:** Tyyppi 2: kellotapuli, arkkitehtiarvelu ja "merkittävä kokonaisuus" ovat perustietoa. Tyyppi 1: bernardiinikokonaisuus oli jo tekstissä. Tyyppi 3: Wikipedian nykyversion mukaan arkkitehdiksi on ehdotettu joko Enkingeriä tai Benedikt Rejtiä, eikä kumpaakaan tue kirjallinen lähde. Uusi kertoo kirkon alkuperästä ja sivutornien paluusta. Enkinger-lähde poistettu.
- **Lähde:** https://en.wikipedia.org/wiki/Church_of_St._Anne,_Vilnius

### Vilnan yliopisto — kenttä `lyhyt`
- **Vanha:** "Vilnan yliopiston pihan laidalla on vuonna 1753 perustettu tähtitorni, Euroopan neljänneksi vanhin. Sen julkisivuun on kaiverrettu eläinradan merkit ja latinankielisiä lauseita. Yliopiston kirjakaupan Litteran holveja peittävät vuonna 1978 maalatut freskot, jotka kuvaavat yliopistossa kukoistaneita taiteita ja tieteitä."
- **Uusi:** "Vilnan yliopiston tähtitorni on Euroopan neljänneksi vanhin, ja sen julkisivuun on kaiverrettu eläinradan merkit. Kaupungin valot ovat kuitenkin kasvaneet niin kirkkaiksi, ettei tähtiä voi enää tarkkailla keskustasta. Havainnot tehdään nykyään kaukana maaseudulla, mutta vanhassa tähtitornissa tutkimus jatkuu yhä."
- **Syy:** Tyyppi 2: perustamisvuosi ja kahden kohteen perustiedot rinnakkain, ilman juonta. Uusi kertoo ristiriidan: tähtitornista ei näe enää tähtiä. Asia on pelin aineistossa ja Wikipediassa (Molėtain observatorio). Littera siirtyi kysymykseksi.
- **Lähde:** https://en.wikipedia.org/wiki/Vilnius_University_Astronomical_Observatory

### Vilnan yliopisto — kenttä `kysymykset`
- **Vanha:** "Paljonko yliopistossa on opiskelijoita nykyään?"
- **Uusi:** "Mitä Litteran kirjakaupan freskot esittävät?"
- **Syy:** Tyyppi 7: opiskelijamäärä vanhenee vuosittain. Litteran freskojen olemassaolo on vahvistettu VU:n kirjaston sivulta (lähde on jo listassa).
- **Lähde:** https://biblioteka.vu.lt/e.parodos/kiemeliai/vu/filologijosfakultetas/infoen.html

### Vilnan yliopisto — `lahteet` (ei tekstimuutosta)
- vu.lt/en/about-vu/history/university-ensemble ei enää kerro sisäpihoista eikä tapulista. Kolmentoista sisäpihan lähteeksi vaihdettu VU:n museo. Tapulin korkeus 68 m ja "vanhankaupungin korkein rakennus" on vahvistettu VU:n museon uutisesta, ja lähde vaihdettu siihen.
- **Lähde:** https://www.muziejus.vu.lt/en/departments/architectural-ensemble-and-bell-tower ; https://www.muziejus.vu.lt/en/news/news1/1110-after-a-long-lockdown-architectural-ensemble-of-vilnius-university-is-opening-up-guests-can-once-again-visit-the-highest-building-of-vilnius-old-town

### Užupis — kenttä `teksti`
- **Vanha:** "…jolla on presidentti, lippu, hymni ja noin yhdentoista miehen armeija. Perustuslain neljäkymmentäyksi pykälää ovat esillä…"
- **Uusi:** "…jolla on presidentti, lippu, hymni ja oma valuutta. Perustuslain neljäkymmentäyksi pykälää on esillä…"
- **Syy:** Tyyppi 5: armeijan nykytila on epävarma. Wikipedian nykyversiosta armeija on poistettu, ja hakuotteen mukaan "armeija on sittemmin lakkautettu". OCA Magazine (2018) mainitsee rahan, joten armeija korvattiin valuutalla. Tyyppi 6: kongruenssi "neljäkymmentäyksi pykälää ovat" → "on". Julistusvuosi 1997 on vahvistettu (Wikipedia, OCA Magazine: 1.4.1997). Pilviraportin "1998" ei saa tukea.
- **Lähde:** https://www.ocamagazine.com/2018/07/09/uzupis-republic-and-where-on-earth-is-that ; https://en.wikipedia.org/wiki/U%C5%BEupis

### Užupis — kenttä `lyhyt`
- **Vanha:** "Kaupunginosa Užupis juhlii itsenäisyyspäiväänsä joka vuosi aprillipäivänä. Silloin Paupio-kadun seinälle kiinnitetään perustuslaki taas uudella kielellä. Perustuslain kirjoittivat Romas Lileikis ja Tomas Čepaitis, ja kerrotaan, että siihen meni vain kolme tuntia."
- **Uusi:** "Kaupunginosa Užupisin ulkoministeriö on nimittänyt maailmalle yli viisisataa suurlähettilästä, joiden joukossa on suurlähettiläs kolibrien keskuudessa ja kaduilla viheltämisen suurlähettiläs. Tasavallan kunniakansalaiseksi on nimetty Dalai-lama, joka istutti vuonna 2018 puun kaupunginosan Tiibetin aukiolle."
- **Syy:** Tyyppi 1: aprillipäivä, Paupio-kadun seinä ja perustuslain kielet olivat jo saman kohteen tekstissä. Vaihtoehdoista hylättiin lipun vuodenaikaväri, koska Gediminasin tornin kierrosversio kertoo jo lipusta. Lileikis–Čepaitis-lähde poistettu, Wikipedia-lähde lisätty.
- **Lähde:** https://en.wikipedia.org/wiki/U%C5%BEupis

### Pyhän Pietarin ja Pyhän Paavalin kirkko — kenttä `lyhyt`
- **Vanha:** "Pyhän Pietarin ja Pyhän Paavalin kirkon suunnitteli ja rakensi krakovalainen Jan Zaor. Stukkohahmojen ympärille koristeet teki italialainen Giovanni Maria Galli, ja sisätilaa pidetään Euroopassa ainutlaatuisena. Kirkon katosta riippuu laivan muotoinen kattokruunu."
- **Uusi:** "Pyhän Pietarin ja Pyhän Paavalin kirkon raunioihin hetmani Pac kerrotaan piiloutuneen vuonna 1662, kun kapinoivat sotilaat yrittivät surmata hänet. Samat sotilaat tappoivat myöhemmin kenttähetmani Wincenty Gosiewskin. Pac selvisi ja päätti rakentaa tuhoutuneen kirkon uudelleen."
- **Syy:** Tyyppi 2: arkkitehti, koristelija ja "ainutlaatuinen" ovat perustietoa. Tyyppi 1: stukkokoristelu on jo tekstissä. Uusi on tarina rakennuttajasta, ja "kerrotaan" on Wikipedian "It is said" -muotoilun mukainen. Kattokruunukysymys jää kysymyksiin, ja sen oletus pitää (kruunu hankittiin 1901–1905).
- **Lähde:** https://en.wikipedia.org/wiki/Church_of_St._Peter_and_St._Paul,_Vilnius

### Kolme ristiä — kenttä `teksti`
- **Vanha:** "…paikalla on ollut puisia ristejä 1600-luvun alusta."
- **Uusi:** "…paikalla on ollut puisia ristejä ainakin 1600-luvun puolivälistä."
- **Syy:** Tyyppi 3: Wikipedian mukaan puiset ristit mainitaan ensimmäisen kerran vuonna 1649, joten "1600-luvun alusta" ei saa tukea. Muut väitteet on vahvistettu: Vivulskis 1916, purku 1950 ja uudet ristit 1989 (Kuzma ja Šilgalis).
- **Lähde:** https://en.wikipedia.org/wiki/Three_Crosses

### Tarkistettu ilman muutoksia
- Avaus (avaukset/vilna.md): 38 sanaa, alkaa sanalla "Tervetuloa", ja ilmakuva (katot, tornit, kukkulat, jokien yhtymäkohta) toimii. Ei muutoksia.
- Liettuan suurruhtinaiden palatsi: 1655, 1801, 2002 ja 2013 vahvistettu Wikipediasta. Museo avattiin osittain 2013 ja kokonaan 2018, joten "museo avattiin yleisölle vuonna 2013" pitää paikkansa.
- Vanhankaupungin teksti: Pilies-kadun väitteet on vahvistettu govilnius.lt:stä.
- Aamuportin teksti: 1503–1514, Medininkai, muurien purku 1799–1805 ja riza vahvistettu Wikipediasta.
- Isoisä: ei mainintaa missään kohteessa, koska merkintä ei nimeä kohdetta. Oikein.
- Kierrosversioiden päällekkäisyys tarkistettu muutosten jälkeen. Aiheet: krypta ja kruunut, Suuri synagoga, tähtitorni ja valosaaste, luodinreikä ja ruotsalaiset, Užupisin suurlähettiläät, puukirkko ja sivutornit, lippu 1919 ja 1988, Pacin piilopaikka. Ei toistoja.

### Epävarmuudet Päätoimittajalle
- Gediminasin tornin lippu: kansallismuseon (lnm.lt) sivu, jolla raitojen repiminen 6.1.1919 mainitaan, on Cloudflare-suojattu, enkä saanut sitä auki. Väite on kahdessa hakuotteessa ja kansallismuseon nimissä, mutta en ole lukenut sitä itse. Säilytin sen, koska kansallismuseo hoitaa tornia. Jos halutaan täysi varmuus, raitojen repiminen pitää vahvistaa tai virke muotoilla uudelleen.
- Tuomiokirkon `korkeus_m` 57 on kellotapulin korkeus ristin kanssa (ks. yllä).

---

# TARKISTAJAN PASSI (erillinen tarkistaja-agentti)

Tarkistaja A: amsterdam–islanti (14 kaupunkia).

# Toinen lukija (tarkistaja A): muutosten tarkistus, 14 kaupunkia

Laajuus (koordinaattorin rajaus kesken työn): amsterdam, ateena, barcelona, bergen, berliini, bryssel, budapest,
bukarest, dublin, edinburgh, firenze, granada, helsinki, islanti. Kosice–tukholma siirtyivät toiselle tarkistajalle.
Valletta, venetsia ja vilna jätettiin rauhaan.

Menetelmä: kenttäkohtainen vertailu `git show 9710c46:esittely-tyo/korjattu/<id>.json` ↔ nykyinen tiedosto. Jokainen
muuttunut `teksti`, `lyhyt`, `syventava`, `kysymykset`, `puhe_*` ja `lahteet` luettiin. Uudet `lyhyt`-versiot luettiin
kierrosjärjestyksessä avauksen kanssa päällekkäisyyksien varalta. Koneellinen sääntöhaku (sulkeet, perspektiivi,
kaksoispistetaivutus, viivavälit, numeroina kirjoitetut muut luvut, pisteelliset lyhenteet, "Kun tulet paikalle" ja isoisä
enintään kerran, kysymykset 5 kpl ≤ 60 merkkiä kysymysmerkillä ilman numeroita): ei löydöksiä missään 14 kaupungissa.
Tarkistin `tarkista-esittely.mjs`: kaikki 14 kaupunkia 0 virhettä, huomioiden määrä ennallaan.

Yhteensä 10 tarkistajan korjausta: Amsterdam 3, Berliini 2, Budapest 1, Bukarest 3, Helsinki 1, muut 0.

## Amsterdam

### Amsterdamin kanaalivyöhyke — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "…Herengrachtin Kultaisessa mutkassa, kaupunki antoi rikkaimpien ostaa kaksi tonttia vierekkäin, joten sinne nousi…"
- **Uusi:** "…Herengrachtin Kultaisessa mutkassa, ostajia kannustettiin hankkimaan kaksi tonttia vierekkäin, joten sinne nousi…"
- **Syy:** 3, vivahde. Lähteen mukaan ostajia kannustettiin ("were encouraged to buy two lots"). "Kaupunki antoi" tarkoittaa lupaa, ja sitä lähde ei sano. Agentin omassa `lahteet`-merkinnässäkin luki "kannustettiin".
- **Lähde:** https://en.wikipedia.org/wiki/Gouden_Bocht

### Dam-aukio — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "…hän valitti vaa'an peittävän näkymänsä ja määräsi sen purettavaksi. Vaaka hävisi aukiolta eikä sitä rakennettu enää uudelleen."
- **Uusi:** "…hän valitti rakennuksen peittävän näkymänsä ja määräsi sen purettavaksi. Vaakaa ei rakennettu aukiolle enää uudelleen."
- **Syy:** 6, kieli. Ääneen luettuna "vaa'an peittävän näkymänsä" kuulostaa siltä kuin vaaka-astia peittäisi näkymän. Lisäksi "hävisi … eikä sitä rakennettu" oli kömpelö.
- **Lähde:** https://en.wikipedia.org/wiki/Dam_Square ("demolished in 1808 by order of Louis Bonaparte who … complained that his view was obstructed")

### Dam-aukio — kenttä `syventava` (TARKISTAJAN KORJAUS)
- **Vanha:** "Miten hallitsija vihitään virkaansa?" - **Uusi:** "Miten hallitsija astuu virkaansa?"
- **Syy:** 3/6, vivahde. Alankomaiden hallitsijaa ei vihitä eikä kruunata, vaan hän vannoo valan virkaanastujaisissa. Teksti sanoo itsekin "astuneet virkaansa", ja kysymyslistassa on "Miksi Alankomaiden kuningasta ei kruunata?". `lahteet`-merkinnän sanamuoto on korjattu vastaavasti.
- **Lähde:** https://en.wikipedia.org/wiki/Dam_Square

Pistokokeet (avattu): Rijksmuseumin Cuypers-tarina ja Vilhelm kolmannen poissaolo avajaisista (rijksmuseum.nl, vahvistaa
sanatarkasti); Westerkerkin kruunun sininen väri vuodelta 2006 (en.wikipedia Westerkerk, vahvistaa); Picasson veistos
"lintu, jonka yleisö näki kalana" (stadscuratorium.nl, vahvistaa); kastanjan taimet (annefrank.org, vahvistaa); Damin
vaakarakennus 1808 (vahvistaa); Kultainen mutka (vivahdekorjaus yllä). Muut muutokset hyväksytty.

## Ateena
- Hyväksytty sellaisenaan.
- Pistokokeet: karyatidien eri tukijalat ja kaulaa tukevat kampaukset (en.wikipedia Caryatid, vahvistaa sanatarkasti);
  Sullan viemät pylväät ja vuoden 1759 ruutiräjäytys moskeijan laastiksi (en.wikipedia Temple of Olympian Zeus, vahvistaa);
  evzonien sunnuntain valkoinen fustanella (whyathens.com, vahvistaa). Akropolis-museon suunnittelijat Tschumi ja
  Photiadis pitävät paikkansa.
- Huomio: karyatidit ovat aiheena sekä Erekhtheionin että Akropolis-museon kierrosversiossa (ks. Päätoimittajalle).

## Barcelona
- Hyväksytty sellaisenaan.
- Pistokokeet: paavi Leo neljästoista siunasi ja vihki Jeesuksen tornin 10.6.2026 (catalannews.com, uutinen 10.6.2026
  menneessä aikamuodossa; en.wikipedia vahvistaa, ja torni valmistui rakenteeltaan 20.2.2026); Gaudín Montjuïc-perustelu
  (vahvistaa); Casa Milàn Steinway ja "soita sitten viulua" sekä huonekalujen hävittäminen (vahvistaa); Casa Batllón
  purkuaikeet ja vuoden 1906 palkintoehdokkuus (vahvistaa); Palaun valkyyriat, Beethoven ja kahdeksantoista muusaa
  (vahvistaa). Agentti poisti superlatiivin "Euroopan ainoa luonnonvalolla valaistu sali" tekstistä. Wikipedia käyttää
  sitä, mutta varovainen muotoilu on hyvä.

## Bergen
- Hyväksytty sellaisenaan.
- Pistokokeet: Tyskebryggen 1300-luvulta ja valtuuston päätös 25.5.1945 (no.wikipedia ja thelocal.no, vahvistavat);
  Fløibanenin miehitysaika ja punainen ja sininen vaunu Norjan lipun väreinä, lähes kaksi miljoonaa matkaa vuodessa
  (en.wikipedia, vahvistaa sanatarkasti). Troldhaugenin huvilan sulkemiseen 2025–2027 agentti on reagoinut oikein:
  nykyaikaväite on poistettu.
- Huomio: kaksi kierrosversiota kertoo nyt "miehityksen päätyttyä" tehdystä symbolisesta muutoksesta (ks. Päätoimittajalle).

## Berliini

### Brandenburgin portti — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "…neuvostoliittolaiset ripustivat portin pylväiden väliin suuret punaiset kankaat…"
- **Uusi:** "…itäsaksalaiset rajavartijat ripustivat portin pylväiden väliin suuret punaiset kankaat…"
- **Syy:** 3, vivahde ja toimija. Agentin lähde oli englanninkielinen Wikipedia ("the Soviets"), mutta saksalainen
  historiadokumenttikokoelma ja Berliinin kaupungin aineisto kertovat, että kankaat ripustivat DDR:n rajavartijat. `lahteet`-kenttään on lisätty tarkentava merkintä.
- **Lähde:** https://germanhistorydocs.org/en/two-germanies-1961-1989/u-s-president-john-f-kennedy-visits-west-berlin-june-26-1963 ("East German border guards suspended large panels of red cloth from the Brandenburg Gate")

### Museosaari — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "Museo on nyt peruskorjauksen vuoksi suljettu, ja sen pohjoissiipi avautuu vuonna 2027."
- **Uusi:** "Museon peruskorjaus kestää vuosia, ja se avataan uudelleen vaiheittain."
- **Syy:** 5, nykyaika. Pysyvä äänite vanhenisi jo vuonna 2027, kun pohjoissiipi avautuu. Uusi muotoilu pitää paikkansa
  koko korjausajan, joka on arviolta 2037–2043 asti. `lahteet`-kenttään on lisätty selittävä merkintä.
- **Lähde:** https://en.wikipedia.org/wiki/Pergamon_Museum

Pistokokeet: televisiotornin ravintolan kierrosnopeus kaksinkertaistettiin vuonna 1997, ja yleisö pääsi torniin 7.10.1969
(lähde lahteet-kentässä, uskottava); tuomiokirkon palopommi 1944 ja uudelleenvihkiminen 1993; East Side Galleryn
kahdeksan kieltäytynyttä taiteilijaa. Muut muutokset hyväksytty, myös "entinen Sony Center" ja Hauptbahnhofin lasikaton
lyhennys, joka de.wikipedian mukaan oli 454,6 metristä 321 metriin, eli "runsas sata metriä" pitää.

## Bryssel
- Hyväksytty sellaisenaan.
- Pistokokeet: oikeuspalatsin julkisivu ilman telineitä ensimmäistä kertaa yli neljäänkymmeneen vuoteen elokuussa 2026
  (vrt.be 28.8.2026, vahvistaa); kaupungintalon virastojen muutto 2023, vihkimiset jatkuvat, lähes kolmesataa
  1800-luvun patsasta, alkuperäiset ja Pyhä Mikael kaupunginmuseossa (en.wikipedia, vahvistaa). Victor Hugon Le Pigeon
  ja Marxin Le Cygne ovat vakiintunut kertomus, ja lähteet tukevat niitä.

## Budapest

### Unkarin parlamenttitalo — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "…luultavasti siksi että se taittui 1600-luvulla…" - **Uusi:** "…luultavasti siksi että se vääntyi 1600-luvulla…"
- **Syy:** 3, vivahde. Risti on vinossa ("knocked crooked"), ei taittunut. "Taittui" antaa ymmärtää, että risti olisi poikki.
- **Lähde:** https://en.wikipedia.org/wiki/Holy_Crown_of_Hungary

Pistokokeet: Gabrielin patsaan alta vuonna 2024 löytynyt lasiastia, kirjerulla ja kahdeksan kolikkoa (origo.hu 3/2026,
vahvistaa sanatarkasti); basilikan kello: Saksan armeija vei sen 20.5.1944, ja vuoden 1990 Passaussa valettu
9 250 kilon kello on Unkarin suurin (pestbuda.hu, vahvistaa). Kalastajanlinnakkeen János Schulek ja Matiaksen
suihkulähteen Ilonka hyväksytty lähteiden perusteella.

## Bukarest

### Riemukaari — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "…paikoille nousivat pronssiset medaljongit, mutta kuninkaan puheita ei ole kaiverrettu takaisin kaaren kylkiin."
- **Uusi:** "…paikoille nousivat pronssiset medaljongit, ja vuonna 2016 kaaren kylkiin palasivat myös kuninkaan poistetut julistukset."
- **Syy:** 3/5, VÄÄRÄ FAKTA. Agentin lähde (agerpres.ro) kertoo vain julistusten poistamisesta, ei siitä, etteikö niitä
  olisi palautettu. Vuosien 2014–2016 kunnostuksessa Ferdinandin molemmat julistukset palasivat kaaren sivuille
  ("Au reapărut şi mesajele de război şi de victorie ale suveranului Unirii"), ja kaari vihittiin 28.11.2016.
  Agentin `lahteet`-merkinnästä on poistettu virheellinen loppu, ja uusi lähde on lisätty.
- **Lähde:** https://www.puterea.ro/arcul-de-triumf-din-bucuresti-are-o-poveste-spectaculoasapovestea-arcului-de-triumf/

### Romanian kansallinen taidemuseo — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "…taidemuseon eurooppalainen kokoelma oli alun perin kuningas Kaarle ensimmäisen oma."
- **Uusi:** "…taidemuseon eurooppalaisen kokoelman pohjana on kuningas Kaarle ensimmäisen oma kokoelma."
- **Syy:** 3, vivahde. Lähteen mukaan galleria koottiin 214 Kaarle ensimmäisen teoksen pohjalta, ja mukaan liitettiin
  muiden kuninkaallisten teoksia. Koko kokoelma ei ollut hänen.
- **Lähde:** https://en.wikipedia.org/wiki/National_Museum_of_Art_of_Romania

### Herăstrău-puisto — kenttä `teksti` (TARKISTAJAN KORJAUS)
- **Vanha:** "…samalla paikalla seisoo nyt Charles de Gaullen patsas. Joulukuussa 2017 se sai nykyisen nimensä…"
- **Uusi:** "…samalla paikalla seisoo nyt Charles de Gaullen patsas. Joulukuussa 2017 puisto sai nykyisen nimensä…"
- **Syy:** 6, kieli. Agentin lisäämän virkkeen jälkeen "se" viittasi de Gaullen patsaaseen, ei puistoon.
- **Lähde:** ei faktamuutosta.

Pistokokeet: Ateneumin pyöreä sali maneesin perustuksella (ro.wikipedia, vahvistaa). Patriarkaalisen katedraalin Saltikov-tarina ja yliopiston kirjaston palo 1989
on hyväksytty lähteiden perusteella. Vanhan ruhtinaanhovin "suljettu 2015 alkaen" on museon oman sivun mukainen.

## Dublin
- Hyväksytty sellaisenaan.
- Pistokokeet: de Valera länsisiiven ainoana vankina ja käsipallot naapurin Flewettin perheeltä (irishlegal.com,
  vahvistaa); Spiren valitus High Courtiin, kaksi massavaimenninta ja kahdeksan kartiota (en.wikipedia, vahvistaa);
  Guinnessin hakku vuonna 1775 ja ratkaisu vuonna 1785 (en.wikipedia Arthur Guinness, vahvistaa). Phoenix Parkin
  kansanetymologian korjaus ja St Stephen's Greenin sorsatarina on hyväksytty.

## Edinburgh
- Hyväksytty sellaisenaan.
- Pistokokeet: Calton Hillin kaksitoista hevosta ja seitsemänkymmentä miestä sekä Playfairin "pride and poverty"
  (historic-uk.com, vahvistaa; Walter Scottia sivu ei mainitse, mutta väite on vanhaa tekstiä). Ohdakeritarikunnan
  kappelin säkkipillienkelit (Atlas Obscura). Palmuhuoneiden kysymyksen vaihto on oikea, koska huoneet avautuivat 2.10.2026.

## Firenze
- Hyväksytty sellaisenaan. Tiedoston sisennys on muuttunut, joten git-diff on suuri, mutta sisältömuutoksia on vähän.
- Pistokokeet: tuomiokirkon julkisivu purettiin 1587, väliaikaiset maalatut julkisivut tehtiin vuosina 1589, 1661 ja 1688,
  ja vuoden 1688 julkisivu näkyy varhaisissa valokuvissa (it.wikipedia Facciata di Santa Maria del Fiore, vahvistaa);
  Tribunan neljä alkuainetta ja 5 780 simpukkaa (uffizi.it-lähde lahteet-kentässä). Uffizin lyhyt ei enää toista Pittin
  Vasarin käytävää, mikä on hyvä korjaus.

## Granada
- Hyväksytty sellaisenaan.
- Pistokokeet: Kaarle V:n palatsin moriskivero ja rahoituksen loppuminen ennen kattopalkkeja (andalucia.com vahvistaa
  veron ja kattopalkit; Wikipedian mukaan katto valmistui 1967, eli "1900-luvulle asti" pitää). Kohta "jota vastaan he
  saivat pitää omat tapansa" ei löydy agentin lähteestä. Hakutulos (cervantesvirtual: "Carlos V y la cuestión morisca")
  tukee sitä: moriskit maksoivat vuonna 1526 kahdeksankymmentätuhatta dukaattia, jotta heidän tapojaan koskevat
  uudistukset jätettäisiin toteuttamatta, ja palatsiin ohjattiin osa summasta. Sivu palautti WebFetchille 403-virheen,
  joten jätin väitteen voimaan mutta merkitsen sen Päätoimittajalle. Irvingin oleskelu Alhambrassa (en.wikipedia Tales of
  the Alhambra) ja katedraalin 22-metrinen rotunda on hyväksytty.

## Helsinki

### Helsingin tuomiokirkko — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "Helsingin tuomiokirkon neljä pientä kulmatornia lisäsi Engelin apulainen Ernst Lohrmann…"
- **Uusi:** "Helsingin tuomiokirkon neljä pientä kulmatornia lisäsi Engelin seuraaja Ernst Lohrmann…"
- **Syy:** 3, titteli. Lohrmann tuli Suomeen vuonna 1841, Engelin kuoleman (1840) jälkeen, ja toimi intendentinkonttorin
  päällikkönä Engelin jälkeen. Hän ei siis voinut olla Engelin apulainen. Suomenkielisen Wikipedian tuomiokirkkoartikkeli
  sanoo "apulainen", mutta Lohrmannin oma artikkeli ja aikajärjestys kumoavat sen. `lahteet`-kenttään on lisätty merkintä.
- **Lähde:** https://fi.wikipedia.org/wiki/Ernst_Lohrmann

Pistokokeet: kulmatornien ja kellotapulin syy (fi.wikipedia Helsingin tuomiokirkko, vahvistaa); Saarisen karhut ja
pilakuva sekä Oodin teräskaaret ja keskustatunnelin keskeytys 2019 on hyväksytty lähteiden perusteella. Hotovitskin
teloitus mainitaan, sitä ei kuvata, eli sävy on sopiva.

## Islanti
- Hyväksytty sellaisenaan.
- Pistokokeet: Harpan 714 ledvaloa ja kaksitoista kuukausiteosta vuonna 2021 (en.wikipedia, vahvistaa sanatarkasti);
  tuomiokirkon urut vuonna 1840 ensimmäisinä islantilaisessa kirkossa (domkirkjan.is, vahvistaa) ja kirkon
  kelpaamattomuus vuonna 1815 (is.wikipedia, vahvistaa). Perlanin painevesi ja Höfðin norjalaiset valmisosat on
  hyväksytty Wikipedian perusteella.

## Päätoimittajalle

1. **Bergen, päällekkäisyys (tyyppi 1):** Bryggenin lyhyt (nimi muutettiin toukokuussa 1945 "heti Saksan miehityksen
   päätyttyä") ja Fløibanenin lyhyt ("Miehityksen päätyttyä vaunut maalattiin" Norjan lipun väreihin) ovat kierroksella
   1. ja 4. kohde. Tarinat ovat eri, mutta rakenne ja aihe toistuvat. En kirjoittanut uudelleen, koska molemmat ovat
   lähteiden mukaan oikein ja hyviä tarinoita. Päätä, vaihdetaanko toinen.
2. **Ateena, aihetoisto:** karyatidit ovat aiheena sekä Erekhtheionin lyhyessä (veistotapa ja kampaukset) että
   Akropolis-museon lyhyessä (laserpuhdistus ja kuudennen tyhjä jalusta). Lisäksi Erekhtheionin teksti kertoo, että viisi
   on museossa ja kuudes Lontoossa. Toisto oli jo vanhassa versiossa. Agentit siirsivät yksityiskohtia, mutta aihe
   toistuu yhä.
3. **Granada, Kaarle V:n palatsi:** "jota vastaan he saivat pitää omat tapansa" ei löydy kentän omasta lähteestä
   (andalucia.com: "agreed to pay rather than face further repression"). Hakutulosten mukaan väite on historiallisesti
   oikein (vuoden 1526 kahdeksankymmenentuhannen dukaatin maksu), mutta en saanut avattua tukevaa sivua (403). Joko
   hyväksy, tai muotoile "jonka he suostuivat maksamaan välttääkseen uusia rajoituksia".
4. **Barcelona, Sagrada Família:** "Kirkon pääjulkisivu on yhä rakenteilla" on totta nyt, mutta vanhenee, kun Kunnian
   julkisivu valmistuu, arviolta 2030-luvulla. Kyse on vanhasta tekstistä, joten en muuttanut sitä.
5. **Berliini, Voitonpylväs (vanha teksti):** "yli sadantuhannen hengen yleisölle". Obaman vuoden 2008 yleisöksi
   arvioidaan yleensä noin kaksisataatuhatta. Väite on teknisesti tosi mutta vähättelevä. En muuttanut, koska kenttää ei
   muutettu tässä tarkistuksessa.

Tarkistaja B: kosice–tukholma (14 kaupunkia).

# Toisen lukijan tarkistus (tarkistaja B): kosice–tukholma, 14 kaupunkia

Tarkistettu jokainen muutettu kenttä: `git diff 9710c46`, kenttätasolla JSON-vertailuna (Ljubljanan ja Luxemburgin suuri diff on pääosin muotoilua; sisältömuutokset käytiin kentittäin). Kaikkien muutettujen `teksti`- ja `lyhyt`-kenttien numerot, sulkeet, vuosivälit, perspektiivi, isoisä ja roomalaiset numerot tarkistettiin myös koneellisesti; poikkeamia ei löytynyt. Avauksiin ei ollut tehty muutoksia. Tarkistin: 0 virhettä kaikissa 14 kaupungissa.

## Košice
- Hyväksytty sellaisenaan.
- Avatut lähteet: en.wikipedia Cathedral_of_St._Elizabeth (juopuneen naisen vesikouru ja ontto kivi: tukee), teraz.sk teatterihistoria (raatihuoneen paikka, kivinen teatteri 1788, suljettiin 1894 turvallisuussyistä, Kocúrkovo 13.9.1924: tukee).
- Lisäksi luettu: Hlavná-kadun vaakunaenkeli, suihkulähteen Schuster-lyhyt ja museon Rákóczi-lyhyt. Lyhyet eivät toista toisiaan. Rákóczin jäänteiden tuonti 1906 mainitaan myös katedraalin tekstissä, mutta ei toisessa lyhyessä, joten sitä ei korjattu.

## Krakova

### Florianin portti — kenttä `kysymykset` (TARKISTAJAN KORJAUS)
- **Vanha:** "Ketkä myyvät maalauksia muurin vieressä?"
- **Uusi:** "Miksi valkoinen kotka on Puolan tunnus?"
- **Syy:** Tyyppi 1/7: uuden lyhyen ensimmäinen virke vastaa kysymykseen suoraan ("taiteilijat myyvät ohikulkijoille"). Uusi kysymys liittyy lyhyen kotkareliefiin, ja sen oletus on tosi.
- **Lähde:** https://en.wikipedia.org/wiki/St._Florian%27s_Gate (kotka pohjoisseinällä)

- Avatut lähteet: en.wikipedia Old_Synagogue (museo vuodesta 1958: tukee), krakow.pl Plac Nowy (Okrąglak 1899–1900, siipikarjateurastamo vuodesta 1927: tukee), en.wikipedia Veit_Stoss_altarpiece (purku ja hajasijoitus, Nürnbergin linnan kellari, paluu 1946: tukee), Krakow_Barbican (Oracewicz ja nappi: tukee), St._Florian's_Gate (Langman 1882, Matejko, 1700-luvun reliefi: tukee), Sukiennice_Museum (7.10.1879, Neron soihdut: tukee).
- Wawelin päiden legenda: wawel.krakow.pl:n PDF on liian suuri avattavaksi, ja pl.wikipedia ei mainitse legendaa. Haku löysi kaksi versiota: pää esti väärän tuomion, tai pää huomautti jo annetusta väärästä tuomiosta. Lyhyen muotoilu vastaa jälkimmäistä, joten muutosta ei tehty.

## Kreeta

### Koulesin linnoitus — kenttä `kysymykset` (TARKISTAJAN KORJAUS)
- **Vanha:** "Mitä Cousteau löysi Dian saaren hylyistä?"
- **Uusi:** "Miksi Cousteau etsi Atlantista Kreetan vesiltä?"
- **Syy:** Tyyppi 1/7: uusi lyhyt vastaa kysymykseen suoraan ("hylyistä nostetut amforat ja tykit"). Uusi kysymys jatkaa lyhyen Atlantis-aihetta, ja sen oletus on tosi.
- **Lähde:** https://www.cretanbeaches.com/en/islands-and-islets-around-crete/dia-island (lyhyen olemassa oleva lähde)

- Avatut lähteet: cretanbeaches Kazantzakis-sivu (Kreetan arkkipiispa Eugenios toimitti hautajaiset, kiihkoilijat polttivat kirjoja kirkon ulkopuolella: tukee), gomega.gr Dia (seitsemän meripeninkulmaa eli noin kolmetoista kilometriä, Cousteau 1976, löydöt Koulesiin: tukee; "tykit" ei mainita tällä sivulla, mutta väite oli jo vanhassa lyhyessä).

## Lissabon
- Hyväksytty sellaisenaan.
- Avatut lähteet: rfm.pt (Santa Justa suljettu syyskuusta 2025 Glórian onnettomuuden jälkeen, kuusitoista kuollutta, avaamispäivää ei ole: tukee), en.wikipedia Belém_Tower (antautuminen 1580 muutaman tunnin jälkeen, vankila vuoteen 1830, Mikael I ja liberaalit: tukee).
- Nykyaika: Santa Justan teksti kertoo sulkemisen menneenä tapahtumana ("suljettiin"), joten se pysyy totena, vaikka hissi avattaisiin. Hyväksytty.

## Ljubljana

### Tivolin puisto — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "… Tarina on perätön, eikä Fernkorn edes tehnyt koiria."
- **Uusi:** "… Tarina on perätön, eikä edes Fernkornin tekijyydestä ole varmuutta."
- **Syy:** Tyyppi 3 (vivahde): lähteen mukaan koirat liitettiin vanhoissa kirjoissa Fernkorniin, ja ne suunnittelivat itävaltalaiset kuvanveistäjät määriläisessä valimossa. Lähde ei sano suoraan, ettei Fernkorn tehnyt niitä.
- **Lähde:** https://en.wikipedia.org/wiki/Tivoli_City_Park

### Ljubljanan linna — kenttä `kysymykset` (TARKISTAJAN KORJAUS)
- **Vanha:** "Miksi pormestari halusi kaupungin ostavan linnan?"
- **Uusi:** "Mitä linnan Pyhän Yrjön kappelissa on?"
- **Syy:** Tyyppi 1/7: uusi lyhyt vastaa kysymykseen suoraan (kaupunginmuseoksi). Pyhän Yrjön kappeli on linnassa, joten oletus on tosi.
- **Lähde:** ei uutta väitettä (kysymys)

- Avatut lähteet: n1info.si (Marinčekin kangaskatto, märkä lumi huhtikuussa 2016, puolitoista tuntia, kiinteä katto 2022: tukee), en.wikipedia Tivoli_City_Park (katso yllä).
- Sävy: Tivolin "riisti henkensä" mainitsee perättömän huhun itsemurhasta. Sitä ei kuvata, joten se on hyväksyttävä.

## Luxemburg
- Hyväksytty sellaisenaan.
- Avatut lähteet: bkdh.nl (Haagin kopio 16.9.1924, rahat eivät riittäneet, viisitoista taiteilijajärjestöä vastusti: tukee), en.wikipedia Gëlle_Fra (purku 21.10.1940, löytyi tammikuussa 1980 stadionin pääkatsomon alta: tukee).
- Huomio: `syventava` "Kuka piilotti Kultaisen naisen?" Piilottajaa ei tiedetä, mutta oletus siitä, että patsas piilotettiin, on tosi. Jätetty ennalleen.

## Madrid
- Hyväksytty sellaisenaan.
- Avatut lähteet: miradormadrid.com (Tío Pepe 1935, purku noin 2011, yli 50 000 allekirjoitusta, paluu 2014 numeroon 11: tukee). museoreinasofia.es palautti 403-virheen, joten tarkistin Kristallipalatsin viiden kuukauden rakennusajan haulla, jonka useat lähteet vahvistivat, ja en.wikipedian Palacio_de_Cristal-sivulta (vuoden 1887 Filippiinien näyttely, kasvihuone).
- Isoisä: Retiron tekstissä, merkinnän sisällöllä, vain yhdessä kohteessa. Kunnossa.
- Huomio: Pradon kysymys "Miten Las Meninas pelastettiin tulipalosta?" saa vastauksen kuninkaanlinnan lyhyestä (heitettiin ikkunasta). Kumpikaan kenttä ei muuttunut tässä erässä, joten tätä ei korjattu.

## Marseille

### MuCEM — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "… Kaikkiaan kokoelmissa on nykyään noin miljoona esinettä, kirjaa, valokuvaa, julistetta, postikorttia ja äänitettä."
- **Uusi:** "… Sen perusti vuonna 1937 museomies Georges Henri Rivière, jonka tutkijat kiersivät Ranskan maaseutua keräämässä arkisia esineitä ja perinteitä."
- **Syy:** Tyyppi 2 ja kieli. Uusi toinen virke oli kuuden sanan luettelo ja kokoelman kappalemäärä, siis inventaariotietoa. Korvasin sen ihmisellä ja tarinalla. Lisäsin `lahteet`-kenttään uuden väitteen.
- **Lähde:** https://fr.wikipedia.org/wiki/Georges_Henri_Rivi%C3%A8re (perusti museon 1937, valtion kenttätutkimukset) ja https://fr.wikipedia.org/wiki/Mus%C3%A9e_des_Civilisations_de_l%27Europe_et_de_la_M%C3%A9diterran%C3%A9e (MNATP:n kokoelmat, suljettiin 2005)

- Muut lyhyet (Notre-Damen kello, katedraali, Calanques) luettu, eivätkä ne toista toisiaan.

## Oslo
- Hyväksytty sellaisenaan.
- Avatut lähteet: sciencenorway.no (Oseberg siirrettiin 10.9.2025 noin sata metriä kattokiskoa pitkin, näytteillä vuodesta 1926, noin 549 miljoonaa kruunua: tukee), snl.no Holmenkollrennene (Olav nuorimpien sarjassa 1922 ja 1923, seitsemänkymmentäkaksi kisaa: tukee), nobelpeacecenter.org (Harald avasi 11.6.2005, Maathai paikalla, Mandela kaksi päivää aiemmin: tukee; myös kysymykselle "Mitä Mandela sanoi…" löytyy vastaus). Satakaksikymmentätuhatta katsojaa vuonna 1952 ei näy snl:ssä tarkkana lukuna, mutta haku vahvistaa sen yleisesti käytetyksi luvuksi, ja väite oli jo vanhassa lyhyessä.

## Sevilla
- Hyväksytty sellaisenaan.
- Avatut lähteet: visitasevilla.es (Carmen-patsas areenaa vastapäätä Paseo Colónin toisella puolella: tukee). Carmenin kuolema on oopperan juonta Wikipedian Carmen-artikkelin mukaan.
- Sävy, Maestranzan lyhyt: "Carmen kuolee mustasukkaisen Don Josén käsissä" mainitsee kuoleman ilman väkivallan kuvausta (puukotusta ei mainita), ja se on yleisesti tunnettu oopperan loppu. Sopii kohderyhmälle 13+, joten hyväksytty.

## Sisilia
- Hyväksytty sellaisenaan.
- Avatut lähteet: balarm.it (kuninkaallinen posti 1787, postitalo kätki kirkon 1800-luvun alussa, Patricolo vapautti sen 1882–1885: tukee), en.wikipedia San_Giovanni_degli_Eremiti (arabiaikainen vesisäiliö ristikäytävässä, Gregorius Suuri perimätietona, Roger II noin 1136: tukee).

## Sofia

### Sofian yliopisto — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "Sofian yliopiston opiskelijat buuasivat tammikuussa 1907 ruhtinas Ferdinandille uuden kansallisteatterin avajaisissa."
- **Uusi:** "Sofian yliopiston opiskelijat ottivat ruhtinas Ferdinandin vastaan paheksuvin huudoin uuden kansallisteatterin avajaisissa tammikuussa 1907."
- **Syy:** Tyyppi 6, sävy ja kieli: "buuasivat" on puhekielinen laina, joka sopii huonosti pysyvään opastekstiin. Uusi muotoilu on neutraali ja kertoo saman asian.
- **Lähde:** https://en.wikipedia.org/wiki/Sofia_University (booed, yliopisto suljettiin kuudeksi kuukaudeksi, kaikki opettajat erotettiin)

### Banja Bashin moskeija — kenttä `kysymykset` (TARKISTAJAN KORJAUS)
- **Vanha:** "Miksi muut Sofian moskeijat tuhottiin?"
- **Uusi:** "Miksi moskeijan vieressä on lähdevesihanoja?"
- **Syy:** Tyyppi 7: edellinen tarkistaja lisäsi kysymyksen "Miten tämä moskeija säästyi, kun muut tuhottiin?", jolloin kaksi kysymystä kysyi samaa. Lisäksi lyhyt vastaa jo tuhoamiseen (venäläiset sotilasinsinöörit 1878). Uuden kysymyksen oletus tulee kohteen omasta tekstistä.
- **Lähde:** ei uutta väitettä (kysymys)

- Avattu lisäksi: en.wikipedia National_Palace_of_Culture (avattiin 31.3.1981, joten "muutama kuukausi ennen Živkovan kuolemaa heinäkuussa 1981" pitää).

## Tampere
- Hyväksytty sellaisenaan.
- Avatut lähteet: fi.wikipedia Näsinneula (unkarilaiset rakennusmiehet, liukuvalu 33 vuorokaudessa kesäkuusta 1970, korkeus kokeiltiin helikopterista, Santamäki ja Space Needle: tukee), en.wikipedia Finnish_Museum_of_Games (85 860 euroa 1 120 tukijalta 2015, avattiin tammikuussa 2017, Supercell: tukee). Särkänniemen akvaarion nykytila tarkistettiin haulla: akvaario toimii, joten kysymyksen oletus pitää.
- Huomio: Vapriikin lyhyt on rahoitustiedon (joukkorahoituksen summat) rajalla, mutta siinä on tarina ja yllätys, joten se on hyväksytty.

## Tukholma

### Gamla stan — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "Talvella tukholmalaiset neulovat patsaalle pipoja ja kaulaliinoja."
- **Uusi:** "Talvella pojalla on usein päässään pipo ja kaulassaan kaulaliina."
- **Syy:** Tyyppi 3: lähteet eivät tue väitettä, että tukholmalaiset neulovat vaatteet. Ne kertovat vain, että patsaalla on talvella pipo ja kaulaliina. Lisätty lähde.
- **Lähde:** https://en.wikipedia.org/wiki/J%C3%A4rnpojke ("In winter, the little boy is also to be found wearing a winter hat and scarf"); svenskakyrkan.se/nyheter/rautapoika ei mainitse vaatteita.

- Avatut lähteet: kungligaslotten.se (Erik XIV:n kruunu, Cornelis ver Weiden 1561, maailman vanhin yhä käytössä oleva kuninkaankruunu: tukee), svenskakyrkan.se Rautapoika (omakuva, viisitoista senttiä, Tukholman pienin patsas: tukee).

## Päätoimittajalle
1. **Košice, Miklušin vankila, `teksti`** (ei muutettu tässä erässä): "Työn on määrä valmistua kesällä 2027" ja kysymys "Millainen uusi näyttely vankilaan tulee?" vanhenevat, kun museo avataan. Tekstiä ei voi kirjoittaa nyt niin, että se olisi sekä tosi että pysyvä. Ehdotus: poista viimeinen virke (teksti pysyy 4–5 virkkeessä ja yli 65 sanassa) tai äänitä kohde uudelleen avaamisen jälkeen.
2. **Luxemburg, Pétrusse, `teksti`** (ei muutettu tässä erässä): "Ensimmäinen vaihe valmistui vuoden 2024 lopussa, ja työ jatkuu." vanhenee, kun työ valmistuu. Sama ratkaisu kuin edellä.
3. **Lissabon, Santa Justan hissi, `teksti`:** sulkeminen kerrotaan menneenä tapahtumana, joten teksti pysyy totena. Päätettävä: halutaanko äänitteeseen Glórian onnettomuus kuudentoista kuolonuhrin mainintoineen?
4. **Sevilla, Maestranza:** Carmenin kuolema mainitaan ilman kuvausta, ja olen hyväksynyt sen. Lopullinen sävyarvio on ihmisen päätös.
5. **Krakova, Wawel:** päiden legendasta on kaksi versiota (pää esti väärän tuomion, tai pää huomautti jo annetusta). Lyhyt käyttää jälkimmäistä. Muutosta ei tehty.
6. **Madrid:** Pradon kysymys Las Meninasin pelastamisesta saa vastauksen kuninkaanlinnan lyhyestä. Kumpikaan kenttä ei muuttunut tässä erässä.

Tarkistaja C: valletta, venetsia, vilna sekä Bergenin kierrosversioiden päällekkäisyys.

# Toinen lukija (tarkistaja C): valletta, venetsia, vilna + Bergenin rajattu tehtävä

Menetelmä: kenttäkohtainen vertailu `git show 9710c46:esittely-tyo/korjattu/<id>.json` ↔ nykyinen tiedosto. Luin
jokaisen muuttuneen `teksti`-, `lyhyt`-, `syventava`-, `kysymykset`-, `puhe_*`- ja `lahteet`-kentän. Luin kahdeksan
`lyhyt`-versiota kierrosjärjestyksessä avauksen ja saman kohteen `teksti`- ja kysymyskenttien kanssa. Avasin lähteet
WebFetchillä tai Wikipedian raakatekstinä.

Yhteensä 6 tarkistajan korjausta: Valletta 0, Venetsia 0, Vilna 5 (neljä kohdetta), Bergen 1 (tilattu tehtävä).
Tarkistin: kaikissa neljässä kaupungissa 0 virhettä, huomioiden määrä ennallaan.

## Valletta
- Hyväksytty sellaisenaan.
- Tarkistettu (avattu): gobeliinit, eli Perellos, Gobelins 1708, gioia eli lahja, eksoottinen kasvisto ja eläimistö,
  "ainoa täydellinen alkuperäisten kartonkien mukaan kudottu sarja", kymmenen suurta seinävaatetta (heritagemalta.mt,
  vahvistaa). Paluu saliin 2026 (guidememalta.com 25.6.2026: entisöinti valmis, sarja esillä seinävaatesalissa,
  vahvistaa). Myös "riippuu" pitää siis paikkansa. Kellon Rhodos-perinne "kerrotaan"-muodossa ja Nasonin kattofreskot
  1724 (en.wikipedia, vahvistaa). Manoel-teatterin latinankielinen kirjoitus, yömaja "a few pennies a night" ja
  pakkolunastus 1956 (en.wikipedia, vahvistaa). Pinto 32 vuotta, velat ja barokki, ranskalaisten päämaja 1798 ja
  signaaliasema antenneineen 1889 (en.wikipedia, vahvistaa). Hal Farin kuusi Gladiatoria, sanomalehden antamat nimet ja
  Faithin runko museossa (vahvistaa). Ohio hinattiin Ledburyn ja Pennin väliin sidottuna, viisi neljästätoista
  kauppalaivasta pääsi perille, ja 15.8. oli taivaaseenastumisen juhla (en.wikipedia Operation Pedestal, vahvistaa).
  Gardjolan silmä ja korva (visitmalta.com, vahvistaa).
- Säännöt ja kysymykset: ei huomautettavaa. Uusien kysymysten oletukset ovat tosia.
- Pieni huomio, ei korjattu: kierroksen kohteet 2 (Yläbarrakka: "ranskalaisten miehitys päättyi") ja 3 (Castille:
  "ranskalaisten miehittäjien päämaja") mainitsevat molemmat ranskalaisten miehityksen. Kyse on sivulauseista eri
  tarinoissa, ei samasta anekdootista.

## Venetsia
- Hyväksytty sellaisenaan.
- Tarkistettu (avattu): Galileo-korjaus. MIT:n sivu vahvistaa, että paikalla oli "numerous gentlemen and senators",
  että purjeet näkyivät paljaalla silmällä vasta "two hours or more" myöhemmin ja että Galileo sai elinikäisen viran
  tuhannen floriinin palkalla. Dogen poisto on oikein. Ca' d'Oro: cultura.gov.it vahvistaa, että museo suljettiin
  helmikuussa 2026 viimeisen entisöintivaiheen ajaksi ja että auki ovat vain Mantegnan kappeli ja piha. Teksti ei väitä
  museon olevan auki, ja uusi kysymys "Mitä taideteoksia Franchetti keräsi?" ei vanhene. Saluten juhla 21.11.,
  kynttilä, votiivisilta ja dalmatialaisten savulampaanliha ruton aikana (1600.venezia.it, vahvistaa). Castradinan kaali
  (it.wikipedia Castradina: verza, vahvistaa). Wagner kuoli Ca' Vendramin Calergissa 13.2.1883, kasino on toiminut siellä
  vuodesta 1959 ja Wagner-museo on palatsissa (en.wikipedia, vahvistaa). Haulla ei löytynyt tietoa kasinon muutosta.
  Huokausten sillan suudelmalegenda ja A Little Romance (en.wikipedia, vahvistaa).
- Säännöt ja kysymykset: ei huomautettavaa. "Miksi Napoleon vei hevoset Pariisiin?" ei toista kierrosversiota.

## Vilna

### Vilnan vanhakaupunki — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "…Natsit tuhosivat sen sodassa, ja neuvostovalta purki rauniot… Viime vuosina arkeologit ovat kaivaneet…"
- **Uusi:** "…Natsit ryöstivät ja polttivat sen sodassa, ja neuvostovalta purki rauniot… Vuodesta 2016 lähtien arkeologit ovat kaivaneet…"
- **Syy:** Tyyppi 3, vivahde: Wikipedian mukaan natsit "looted, burned, and partly destroyed", ja lopullisen tuhon teki
  neuvostovalta. Tyyppi 5: "viime vuosina" vanhenee pysyvässä äänitteessä, kun taas "vuodesta 2016 lähtien" ei vanhene
  (kaivaukset alkoivat 2016, ja bima julkistettiin 2018). Pituus 40 sanaa. `lahteet` päivitetty.
- **Lähde:** https://en.wikipedia.org/wiki/Great_Synagogue_of_Vilna

### Gediminasin torni — kenttä `lahteet` (TARKISTAJAN KORJAUS, teksti ennallaan)
- **Vanha:** raitojen repiminen merkitty lähteeseen tv3.lt/trispalvei-90
- **Uusi:** tv3.lt tukee vain vuoden 1988 lipunnostoa. Raitojen repimiselle on lisätty lähteeksi Liettuan kansallismuseon
  (tornin ylläpitäjä) englanninkielinen sivu.
- **Syy:** Tyyppi 3: tv3.lt-artikkeli ei mainitse bolševikkeja eikä raitoja (luettu kokonaan). Kansallismuseon sivu
  aukesi suoralla haulla: "On January 1, 1919, Lithuanian volunteers led by officer Kazys Škirpa raised the tricolor flag
  atop the tower for the first time. … on January 6, Bolshevik forces seized Vilnius and tore off the yellow and green
  stripes." Väite on nyt varmistettu, joten virke säilyy.
- **Lähde:** https://lnm.lt/en/news/gediminas-tower-how-well-do-you-know-the-history-of-this-national-symbol/

### Pyhän Annan kirkko — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "…Annalle ja kaupungissa käyville saksalaisille katolilaisille."
- **Uusi:** "…Annalle ja kaupungissa käyville katolilaisille."
- **Syy:** Tyyppi 3: Wikipedia merkitsi syyskuussa 2026 saksalaiset lähteettömiksi ("citation needed"), eikä muuta
  lähdettä löytynyt. Varmistettu osa jää. 41 sanaa.
- **Lähde:** https://en.wikipedia.org/wiki/Church_of_St._Anne,_Vilnius

### Pyhän Pietarin ja Pyhän Paavalin kirkko — kenttä `lyhyt` (TARKISTAJAN KORJAUS)
- **Vanha:** "…kirkon raunioihin hetmani Pac kerrotaan piiloutuneen vuonna 1662…"
- **Uusi:** "…kirkon raunioihin tuleva hetmani Pac kerrotaan piiloutuneen vuonna 1662…"
- **Syy:** Tyyppi 3, titteli: Pac nimitettiin kenttähetmaniksi vasta 1663 ja suurhetmaniksi 1667. Vuonna 1662 hän ei
  ollut hetmani, ja samassa virkkeessä Gosiewski on oikein kenttähetmani.
- **Lähde:** https://en.wikipedia.org/wiki/Micha%C5%82_Kazimierz_Pac

- Muut tarkistetut (avattu): Užupisin yli viisisataa suurlähettilästä, kolibrit, kadulla viheltäminen ja Dalai-laman
  puu 2018 (en.wikipedia, vahvistaa). Oma valuutta (OCA Magazine: "issued currency", vahvistaa). Aamuportin luodinreikä
  oikeassa hihassa 1702 ja legenda rautaportista pääsiäislauantaina (vahvistaa). Tähtitorni: valosaaste, havainnot
  Molėtaissa ja "continues scientific research" (vahvistaa). Tuomiokirkon holvi löytyi, kun insinöörit kaivoivat lattian
  alle tutkiakseen tulvan jälkeen perustuksia (LRT, vahvistaa). Pacin piiloutuminen 1662 "It is said" ja Annan kirkon
  puukirkko 1419 sekä sivutornit 2009 (vahvistaa). Kolme ristiä 1649 ja Užupisin kongruenssi "pykälää on" ovat kunnossa.
- Kieli: "Dalai-lama" kirjoitetaan Kielitoimiston mukaan "dalai-lama", mutta se ei vaikuta ääneen luettuna, joten jätin.
- Päällekkäisyys uudelleen luettuna: ei toistoja.
- Tarkistin: `Vilna: 10 kohdetta, 0 virhettä, 3 huomiota`.

## Bergen

### Fløibanen — kenttä `lyhyt` (TARKISTAJAN KORJAUS, tilattu tehtävä)
- **Vanha:** "Köysirata Fløibanenia käyttivät sotavuosina saksalaiset miehitysjoukot tavaran ja väen kuljettamiseen. Miehityksen päätyttyä vaunut maalattiin toinen punaiseksi ja toinen siniseksi, ja yhdessä valkoisen ala-aseman kanssa ne muodostavat Norjan lipun värit. Samoja värejä on käytetty siitä asti."
- **Uusi:** "Köysirata Fløibanen juuttui keväällä 1986 kesken matkan, kun signaalijohto putosi alas. Kyydissä oli toimittajien kanssa kolmetoistavuotias belgialainen Sandra Kim, ja matkustajat joutuivat kiipeämään tikkailla ulos ja laskeutumaan radan viertä kulkevia kapeita portaita. Muutamaa päivää myöhemmin Kim voitti Bergenissä Euroviisut."
- **Syy:** Tyyppi 1. Bryggenin (kohde 1) ja Fløibanenin (kohde 4) kierrosversiot kertoivat molemmat miehityksen
  päättymisestä. Vaihdoin Fløibanenin, koska:
  - sen värit toistivat myös saman kohteen tekstiä (punainen Rødhette ja sininen Blåmann)
  - no.wikipedian mukaan vaunut saivat sinisen ja punaisen värinsä "tidlig på 1950-tallet", mikä on ristiriidassa
    vanhan väitteen "miehityksen päätyttyä" kanssa (tyyppi 3)
  - Bryggenin nimitarina on kaupungin oma ja liittyy suoraan kohteeseen.

  Uusi tarina ei toista avausta, muita kierrosversioita, Fløibanenin tekstiä eikä kysymyksiä. Vanha lähde-entry on
  poistettu ja kaksi uutta lisätty. 39 sanaa ja 3 virkettä. Alkusana "Köysirata" on suomenkielinen, ja
  "kolmetoistavuotias" on kirjoitettu sanoin.
- **Lähde:** https://no.wikipedia.org/wiki/Fl%C3%B8ibanen ("Sammen med en del pressefolk tok hun Fløibanen noen dager før finalen, da en signalledning falt ned … Passasjerene måtte klatre ut ved hjelp av stiger og ta seg ned på den smale trappen langs skinnegangen.") ; https://en.wikipedia.org/wiki/Sandra_Kim (13 vuotta, voitto Bergenissä 1986)
- Muuhun Bergenissä ei koskettu. Tarkistin: `Bergen: 11 kohdetta, 0 virhettä, 12 huomiota`.

## Päätoimittajalle
1. **Vilna, Gediminasin lippu:** raitojen repiminen 6.1.1919 on nyt varmistettu kansallismuseon omalta sivulta.
   Edellisen agentin lähde (tv3.lt) ei tukenut väitettä lainkaan. Kansallismuseo sanoo myös "for the first time", mutta
   agentti poisti sanat "ensimmäisen kerran" VLE:n ristiriidan vuoksi. Varovainen muoto on edelleen hyvä.
2. **Bergen, Fløibanenin värit:** en.wikipedian "miehityksen jälkeen" ja no.wikipedian "1950-luvun alussa" ovat
   ristiriidassa. Väite on nyt poistettu kierrosversiosta, joten asia ei enää koske tekstiä.
3. **Valletta:** ranskalaisten miehitys vilahtaa kierroksen peräkkäisissä kohteissa 2 ja 3 (sivulauseina). Jätin ennalleen.
4. **Prosessihuomio:** ajoin vahingossa `git stash` -komennon tarkistinsilmukassa ja palautin muutokset heti
   `git stash pop` -komennolla. Stashissa olivat vain omat bergen- ja vilna-muutokseni. Ne on tarkistettu ehjiksi, eikä
   muiden tiedostoihin koskettu.
