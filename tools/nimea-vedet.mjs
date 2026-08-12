/*
 * Vesistöjen nimet kartalle: siivotut, suomennetut ja tärkeysjärjestetyt.
 *
 *   node tools/nimea-vedet.mjs [--kuiva]
 *
 * Lukee js/packs/maailmankartta-maasto.js (laudan koordinaatit) ja
 * kirjoittaa js/packs/maasto-nimet-vedet.js, jossa on jokaiselle
 * nimeämisen ansaitsevalle joelle ja järvelle suomenkielinen nimi,
 * tärkeysluku, piirretyn muodon mitta, Wikipedian otsikko ja lyhyt
 * selitys.
 *
 * --- miksi tämä on käsin kirjoitettu taulukko eikä haku ---
 *
 * Natural Earthin nimet ovat sellaisinaan kelvottomia kartalle:
 *
 *   1. Kieli vaihtelee kesken aineiston. Osa on jo suomeksi (Niili,
 *      Tonava, Jangtse), osa englanniksi (Huanghe, Great Bear Lake) ja
 *      osa ranskaksi (Bénoué, Lac Moeru). Sama joki esiintyy kahdella
 *      kielellä: Bénoué ylä-, Benue alajuoksulla.
 *   2. Sama joki on pilkottu pätkiksi. Ganges on aineistossa neljästi
 *      (pääuoma ja kolme suistohaaraa), Paraná neljästi, Niili
 *      viidellä eri nimellä Victorianjärveltä Välimerelle.
 *   3. Mukana on puroja, jotka eivät ansaitse nimeä. Santee on laudalla
 *      33 yksikköä pitkä, Xun 46 — nimi olisi viivaa pidempi.
 *
 * Mikään näistä ei ratkea säännöillä. Suomalainen vakiintunut nimi on
 * tiedettävä (Huanghe → Keltainenjoki, Daugava → Väinäjoki, Great Slave
 * Lake → Iso Orjajärvi), ja se että Za Qu on Mekongin latva vaatii
 * maantiedettä, ei merkkijonovertailua. Siksi taulukko on käsin tehty
 * ja tämä työkalu vain tarkistaa sen aineistoa vasten ja laskee mitat.
 *
 * --- mitä tarkistettiin ---
 *
 * Jokainen Wikipedia-otsikko on haettu ja todettu olemassa olevaksi
 * (ei täsmennyssivu), ja jokainen selityksessä esitetty väite —
 * pituus, laskujoki, mihin laskee — on luettu samasta artikkelista.
 * Peli hakee tiivistelmän js/wiki.js:n kautta suomeksi ja tarvittaessa
 * englanniksi, joten muutamalle joelle, jolla ei ole suomenkielistä
 * artikkelia lainkaan, otsikko on englanniksi.
 *
 * --- avain ---
 *
 * avain on täsmälleen se merkkijono, joka on maastoaineiston nimi-
 * kentässä. Sillä nimi liitetään piirrettyyn viivaan. Kolme seurausta:
 *
 *   - Usea pätkä voi kantaa samaa avainta (Ganges neljästi). Nimi
 *     kuuluu piirtää KERRAN, esimerkiksi ryhmän pisimmälle pätkälle.
 *   - Pätkä, jonka nimelle ei ole avainta, jää nimeämättä. Niin on
 *     tarkoitus: se on joko toisen joen latva (Za, Hailar, Bafing),
 *     saman joen toiskielinen jakso (Bénoué) tai liian pieni.
 *   - Muutama nimi esiintyy maapallolla oikeasti kahdesti: Colorado
 *     (Yhdysvallat ja Argentiina), Fraser (Brittiläinen Kolumbia ja
 *     Labrador), Mackenzie (Kanada ja Queensland). Nimi on kummassakin
 *     paikassa oikea, mutta selitys ja wiki koskevat tunnetumpaa.
 *     Työkalu huomauttaa näistä ajettaessa.
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const kuiva = process.argv.includes('--kuiva');

/*
 * Joet. tarkeys ratkaisee, millä zoomilla nimi ilmestyy:
 *   1 = maailman tunnetuimmat, näkyvät ensimmäisinä
 *   2 = merkittävät, tunnistettavat nimet
 *   3 = pienet ja paikalliset, vasta lähikuvassa
 * Ykkösiä on tarkoituksella vain kahdeksan: jos niitä olisi kolmekymmentä,
 * ne eivät erottuisi toisistaan eikä loitonnetusta kartasta tulisi selkeää.
 */
const JOKINIMET = {
  // --- 1: maailman tunnetuimmat ---
  Niili: {
    nimi: 'Niili', tarkeys: 1, wiki: 'Niili',
    selitys: 'Noin 6 650 kilometriä pitkää Niiliä pidetään maailman pisimpänä jokena, ja sen viljaville rannoille syntyi muinaisen Egyptin sivilisaatio. Kartalla nimeämätön yläjuoksu jatkuu Valkoisena Niilinä Victorianjärvelle saakka.',
  },
  Amazon: {
    nimi: 'Amazon', tarkeys: 1, wiki: 'Amazon (joki)',
    selitys: 'Amazon laskee Atlantin valtamereen ja on yleisimmän käsityksen mukaan maailman toiseksi pisin joki, joidenkin mittaustapojen mukaan pisin. Manausin kohdalla musta Rio Negro ja savinen pääuoma virtaavat pitkän matkan sekoittumatta; ilmiö tunnetaan nimellä Encontro das Águas.',
  },
  Mississippi: {
    nimi: 'Mississippi', tarkeys: 1, wiki: 'Mississippi (joki)',
    selitys: 'Mississippi alkaa Itascajärvestä Minnesotassa ja laskee noin 3 750 kilometrin päässä Meksikonlahteen Louisianassa. Yhdessä itseään pidemmän sivujokensa Missourin kanssa se on Pohjois-Amerikan pisin ja maailman neljänneksi pisin joki.',
  },
  Jangtse: {
    nimi: 'Jangtse', tarkeys: 1, wiki: 'Jangtse',
    selitys: 'Jangtse on Aasian pisin ja maailman kolmanneksi pisin joki; Kiinassa siitä käytetään nimeä Changjiang, ”pitkä joki”. Se laskee Itä-Kiinan mereen Shanghain pohjoispuolella.',
  },
  Ganges: {
    nimi: 'Ganges', tarkeys: 1, wiki: 'Ganges',
    selitys: 'Ganges saa alkunsa Gangotrijäätikön sulamisvesistä Himalajalta ja virtaa 2 510 kilometriä Pohjois-Intian tasangoille. Bangladeshissa se yhtyy Brahmaputraan ja hajoaa laajaksi suistoksi, jonka haarat näkyvät kartalla erillisinä uomina.',
  },
  Volga: {
    nimi: 'Volga', tarkeys: 1, wiki: 'Volga',
    selitys: 'Volga on Euroopan pisin ja runsasvetisin joki, 3 685 kilometriä, eikä se laske valtamereen vaan Kaspianmereen. Se on yhä yksi Venäjän merkittävimmistä kuljetusreiteistä.',
  },
  Tonava: {
    nimi: 'Tonava', tarkeys: 1, wiki: 'Tonava',
    selitys: 'Tonava virtaa Schwarzwaldista 2 845 kilometriä Mustallemerelle ja on Euroopan suurista joista ainoa, joka kulkee lännestä itään. Matkalla se halkoo kuutta valtiota Saksasta Romaniaan.',
  },
  Kongo: {
    nimi: 'Kongo', tarkeys: 1, wiki: 'Kongo (joki)',
    selitys: 'Kongo on virtaamaltaan maailman toiseksi suurin joki, ja siitä on mitattu 230 metrin syvyys — enemmän kuin mistään muusta joesta. Chambeshin latvoilta mitattuna se on 4 700 kilometriä pitkä.',
  },

  // --- suuret joet: enimmäkseen tärkeys 2, alueellisemmat 3 ---
  Lena: {
    nimi: 'Lena', tarkeys: 2, wiki: 'Lena',
    selitys: 'Lena alkaa Baikalvuorilta ja virtaa 4 294 kilometriä Laptevinmereen. Sen suistoalue on 27 700 neliökilometriä eli lähes Belgian kokoinen.',
  },
  Ob: {
    nimi: 'Ob', tarkeys: 2, wiki: 'Ob',
    selitys: 'Ob alkaa Altailta ja laskee Pohjoiseen jäämereen. Suulla on 800 kilometriä pitkä Obinlahti, yksi maailman pisimmistä estuaareista.',
  },
  Jenisei: {
    nimi: 'Jenisei', tarkeys: 2, wiki: 'Jenisei',
    selitys: 'Jenisei on keskivirtaamaltaan suurin Jäämereen laskevista joista. Se on jäässä yli puolet vuodesta, joten laivakausi jää lyhyeksi.',
  },
  Irtysh: {
    nimi: 'Irtyš', tarkeys: 2, wiki: 'Irtyš',
    selitys: 'Irtyš on Obin suurin sivujoki ja 4 248 kilometrillään pidempi kuin pääuoma. Se alkaa Kiinan Altailta ja virtaa Kazakstanin halki Siperiaan.',
  },
  Kolyma: {
    nimi: 'Kolyma', tarkeys: 2, wiki: 'Kolyma',
    selitys: 'Kolyma virtaa Kolyman ylängöltä 2 129 kilometriä Itä-Siperian mereen. Joki on jäässä suurimman osan vuodesta ja sulaa vasta kesäkuussa.',
  },
  Amur: {
    nimi: 'Amur', tarkeys: 2, wiki: 'Amur',
    selitys: 'Amur on maailman kymmenenneksi pisin joki ja kulkee pitkän matkaa Venäjän ja Kiinan rajaa. Se laskee Tatariansalmeen Ohotanmeren ja Japaninmeren väliin.',
  },
  Yukon: {
    nimi: 'Yukon', tarkeys: 2, wiki: 'Yukon (joki)',
    selitys: 'Yukon virtaa 3 190 kilometriä Kanadasta Alaskan halki Beringinmereen. Nimi tarkoittaa athabaskan kielessä suurta jokea, ja kultaryntäyksen aikaan se oli tärkein reitti sisämaahan.',
  },
  Mackenzie: {
    nimi: 'Mackenzie', tarkeys: 2, wiki: 'Mackenzie',
    selitys: 'Mackenzie lähtee Isosta Orjajärvestä ja on 1 738 kilometrillään Kanadan pisin joki. Peacen ja Finlayn kanssa mitattuna vesistö on 4 241 kilometriä eli Pohjois-Amerikan toiseksi pisin.',
  },
  Missouri: {
    nimi: 'Missouri', tarkeys: 2, wiki: 'Missouri (joki)',
    selitys: 'Missouri on 3 767 kilometrillään Yhdysvaltain pisin joki ja Mississippin sivujoki. Se alkaa Kalliovuorilta Montanassa kolmen joen yhtymäkohdasta.',
  },
  Mekong: {
    nimi: 'Mekong', tarkeys: 2, wiki: 'Mekong',
    selitys: 'Mekong alkaa Qinghaista Kiinasta ja kulkee kuuden maan halki Etelä-Kiinan mereen. Sen varrella ovat Laosin pääkaupunki Vientiane ja Kambodžan Phnom Penh.',
  },
  Paraná: {
    nimi: 'Paraná', tarkeys: 2, wiki: 'Paraná (joki)',
    selitys: 'Paraná on Amazonin jälkeen Etelä-Amerikan toiseksi pisin joki, noin 4 880 kilometriä. Se laskee Río de la Platan estuaariin Buenos Airesin kohdalla.',
  },
  Niger: {
    nimi: 'Niger', tarkeys: 2, wiki: 'Niger (joki)',
    selitys: 'Niger on 4 200 kilometrillään Afrikan kolmanneksi pisin joki. Se tekee oudon kaaren pohjoiseen Saharan reunaan ja muodostaa matkalla laajan sisämaasuiston Malissa.',
  },
  Indus: {
    nimi: 'Indus', tarkeys: 2, wiki: 'Indus',
    selitys: 'Indus alkaa Kailasvuorelta Tiibetistä ja laskee Arabianmereen Karachin kaakkoispuolella. Sen laaksossa kukoisti pronssikautinen Indus-kulttuuri, ja joki antoi nimen koko Intialle.',
  },
  Brahmaputra: {
    nimi: 'Brahmaputra', tarkeys: 2, wiki: 'Brahmaputra',
    selitys: 'Brahmaputra virtaa Tiibetissä Tsangpona lännestä itään ja murtautuu sitten Himalajan läpi etelään. Bengalinlahdella se yhtyy Gangesiin ja muodostaa maailman laajimman suistoalueen.',
  },
  Salween: {
    nimi: 'Salween', tarkeys: 2, wiki: 'Salween',
    selitys: 'Salween virtaa noin 2 815 kilometriä Tiibetin ylängöltä Andamaanienmereen. Se on yksi maailman pisimmistä patoamattomista joista, ja sen rinteet ovat paikoin kanjonimaisen jyrkät.',
  },
  Irrawaddy: {
    nimi: 'Iravadi', tarkeys: 2, wiki: 'Iravadi',
    selitys: 'Iravadi eli Irrawaddy on Myanmarin tärkein kulkureitti: 2 170 kilometriä halki maan Andamaanienmerelle. Se alkaa Hkakabo Razin juurelta aivan Kiinan rajalta.',
  },
  Eufrat: {
    nimi: 'Eufrat', tarkeys: 2, wiki: 'Eufrat',
    selitys: 'Eufrat virtaa Turkista Syyrian ja Irakin halki noin 2 780 kilometriä. Yhdessä Tigriksen kanssa se antoi nimen Mesopotamialle eli Kaksoisvirtainmaalle.',
  },
  Tigris: {
    nimi: 'Tigris', tarkeys: 2, wiki: 'Tigris',
    selitys: 'Tigris on noin 1 900 kilometriä pitkä ja runsasvetisempi kuin Eufrat. Bagdad on rakennettu sen länsirannalle, ja sen varrella olivat myös Niniven ja Ktesifonin kaupungit.',
  },
  'Amu Darya': {
    nimi: 'Amudarja', tarkeys: 2, wiki: 'Amudarja',
    selitys: 'Amudarja on Keski-Aasian pisin joki ja antiikin maailman Oksos. Se laski ennen Araljärveen, mutta kastelu vei suuren osan vedestä; purjehduskelpoista uomaa on 1 450 kilometriä.',
  },
  'Syr Darya': {
    nimi: 'Syrdarja', tarkeys: 2, wiki: 'Syrdarja',
    selitys: 'Syrdarja on 2 212 kilometriä pitkä ja kahdesta Araljärveen laskeneesta joesta pohjoisempi. Antiikissa se tunnettiin nimellä Jaksartes ja oli Aleksanteri Suuren valloitusten pohjoisraja.',
  },
  Huanghe: {
    nimi: 'Keltainenjoki', tarkeys: 2, wiki: 'Keltainenjoki',
    selitys: 'Keltainenjoki eli Huanghe on 5 464 kilometrillään Kiinan toiseksi pisin joki. Nimi tulee valtavasta liejumäärästä, joka värjää veden kellanruskeaksi ja nostaa uomaa niin, että joki on tulvinut tuhoisasti läpi historian.',
  },
  Sambesi: {
    nimi: 'Sambesi', tarkeys: 2, wiki: 'Sambesi',
    selitys: 'Sambesi on 2 574 kilometrillään Afrikan neljänneksi pisin joki ja suurin Intian valtamereen laskeva. Sen keskijuoksulla ovat Victorian putoukset.',
  },
  Orange: {
    nimi: 'Oranjejoki', tarkeys: 2, wiki: 'Oranje (joki)',
    selitys: 'Oranjejoki on Etelä-Afrikan suurin joki, 2 432 kilometriä Lohikäärmevuorilta Atlantille. Se muodostaa osan Lesothon ja Namibian vastaisista rajoista.',
  },
  Limpopo: {
    nimi: 'Limpopo', tarkeys: 2, wiki: 'Limpopo (joki)',
    selitys: 'Limpopo kiertää 1 770 kilometrin kaaressa Johannesburgin pohjoispuolelta Intian valtamerelle. Se on osa Etelä-Afrikan ja Botswanan sekä Zimbabwen välistä rajaa.',
  },
  Okavango: {
    nimi: 'Okavango', tarkeys: 2, wiki: 'Okavango (joki)',
    selitys: 'Okavango on 1 600 kilometriä pitkä eikä laske mereen lainkaan: se päättyy Kalaharin keskellä laajaan suistoon, joka haihtuu ja imeytyy hiekkaan. Suisto on eteläisen Afrikan tunnetuimpia eläinalueita.',
  },
  Colorado: {
    nimi: 'Colorado', tarkeys: 2, wiki: 'Coloradojoki',
    selitys: 'Coloradojoki kulkee noin 2 330 kilometriä Kalliovuorilta Kalifornianlahdelle ja on uurtanut matkalla Grand Canyonin. Kastelu ja padot kuluttavat vettä niin paljon, ettei joki kuivina aikoina enää yllä mereen asti.',
  },
  'Rio Grande': {
    nimi: 'Rio Grande', tarkeys: 2, wiki: 'Rio Grande',
    selitys: 'Rio Grande eli meksikolaisittain Río Bravo on 2 830 kilometriä pitkä ja muodostaa alajuoksullaan koko Meksikon ja Yhdysvaltain välisen rajan. Se on maailman 24. pisin joki.',
  },
  Ohio: {
    nimi: 'Ohio', tarkeys: 2, wiki: 'Ohio (joki)',
    selitys: 'Ohiojoki alkaa Pittsburghissa Alleghenyn ja Monongahelan yhtyessä ja on Mississippin suurin sivujoki. 1700-luvulla se oli asutuksen pääväylä länteen ja myöhemmin raja orjuuden sallineiden ja kieltäneiden osavaltioiden välillä.',
  },
  Columbia: {
    nimi: 'Columbia', tarkeys: 2, wiki: 'Columbia (joki)',
    selitys: 'Columbia laskee Kanadan Kalliovuorilta Tyyneenmereen. Tutkimusmatkailija Robert Gray löysi jokisuun vuonna 1792 ja nimesi joen laivansa mukaan.',
  },
  'Saint Lawrence': {
    nimi: 'Saint Lawrence', tarkeys: 2, wiki: 'Saint Lawrence (joki)',
    selitys: 'Saint Lawrence yhdistää Isotjärvet Atlanttiin ja on Ontariojärvestä mitattuna lähes 1 200 kilometriä pitkä. Sitä pitkin valtamerilaivat pääsevät sisämaahan Chicagoon asti; kartalla näkyy vain lyhyt jakso Montrealin yläpuolelta.',
  },
  Ural: {
    nimi: 'Uraljoki', tarkeys: 2, wiki: 'Ural (joki)',
    selitys: 'Uraljoki virtaa 2 428 kilometriä Uralvuorilta Kaspianmereen ja on Volgan ja Tonavan jälkeen Euroopan kolmanneksi suurin joki. Sitä on perinteisesti pidetty osana Euroopan ja Aasian rajaa.',
  },
  Don: {
    nimi: 'Don', tarkeys: 2, wiki: 'Don',
    selitys: 'Don virtaa 1 870 kilometriä Moskovan kaakkoispuolelta Asovanmereen ja on hyvin hidasvirtainen. Se on kasakkojen historiallinen kotiseutu.',
  },
  Dnepr: {
    nimi: 'Dnepr', tarkeys: 2, wiki: 'Dnepr',
    selitys: 'Dnepr on noin 2 290 kilometriä pitkä ja Euroopan neljänneksi pisin joki. Antiikin kreikkalaiset tunsivat sen nimellä Borysthenes, ja viikinkiaikana sitä pitkin kuljettiin Itämereltä Konstantinopoliin.',
  },
  Rein: {
    nimi: 'Rein', tarkeys: 2, wiki: 'Rein',
    selitys: 'Rein virtaa 1 230 kilometriä Alpeilta Pohjanmerelle ja on Euroopan vilkkaimpia tavaraliikenteen väyliä. Yhdessä Tonavan kanssa se muodosti aikoinaan Rooman valtakunnan pohjoisrajan.',
  },
  Elbe: {
    nimi: 'Elbe', tarkeys: 2, wiki: 'Elbe',
    selitys: 'Elbe virtaa 1 165 kilometriä Tšekistä Saksan halki Pohjanmerelle. Sen estuaari ulottuu Hampurista Cuxhaveniin, ja kylmän sodan aikana joki oli osa Itä- ja Länsi-Saksan rajaa.',
  },
  Veiksel: {
    nimi: 'Veiksel', tarkeys: 2, wiki: 'Veiksel',
    selitys: 'Veiksel eli Wisła on Puolan pisin joki, 1 064 kilometriä Karpaateilta Gdańskinlahdelle. Sen varrella ovat Krakova, Varsova, Toruń ja Gdańsk.',
  },
  Oder: {
    nimi: 'Oder', tarkeys: 2, wiki: 'Oder',
    selitys: 'Oder virtaa 841 kilometriä Määristä Itämerelle ja muodostaa viimeiset 189 kilometriä Saksan ja Puolan rajan. Oder–Neisse-linja vahvistettiin rajaksi toisen maailmansodan jälkeen.',
  },
  Loire: {
    nimi: 'Loire', tarkeys: 2, wiki: 'Loire',
    selitys: 'Loire on 1 020 kilometrillään pisin kokonaan Ranskassa virtaava joki ja laskee Atlanttiin Saint-Nazairen luona. Sen keskijuoksun linnalaakso kuuluu Unescon maailmanperintöluetteloon.',
  },
  Seine: {
    nimi: 'Seine', tarkeys: 2, wiki: 'Seine',
    selitys: 'Seine on 777 kilometriä pitkä ja virtaa Pariisin halki Englannin kanaaliin. Antiikissa se tunnettiin nimellä Sequana, ja kanavat yhdistävät sen muihin Ranskan vesistöihin.',
  },
  Rhône: {
    nimi: 'Rhône', tarkeys: 2, wiki: 'Rhône',
    selitys: 'Rhône virtaa 812 kilometriä Alpeilta Geneven kautta Välimerelle. Se on Niilin jälkeen Välimeren alueen merkittävin joki, ja sen varrella ovat Lyon, Avignon ja Arles.',
  },
  Tajo: {
    nimi: 'Tajo', tarkeys: 2, wiki: 'Tajo',
    selitys: 'Tajo on Iberian niemimaan pisin joki, 1 038 kilometriä Aragoniasta Lissaboniin. Portugalissa sen nimi on Tejo, ja jokisuu on niin leveä, että sen ylittää 12 kilometrin silta.',
  },
  Ebro: {
    nimi: 'Ebro', tarkeys: 2, wiki: 'Ebro',
    selitys: 'Ebro on Espanjan pisin ja vesimäärältään suurin joki, 910 kilometriä Cantabrianvuorilta Välimerelle. Iberian niemimaa on melko varmasti saanut nimensä juuri tästä joesta.',
  },
  Po: {
    nimi: 'Po', tarkeys: 2, wiki: 'Po',
    selitys: 'Po virtaa 652 kilometriä Alpeilta Adrianmerelle, ja sen valuma-alue kattaa lähes neljäsosan Italiasta. Laakso on maan teollisuuden ja maatalouden ydinaluetta.',
  },
  Thames: {
    nimi: 'Thames', tarkeys: 2, wiki: 'Thames',
    selitys: 'Thames on 335 kilometriä pitkä, ja sen kulkukelpoisella osalla on 45 sulkua. Lontoon alapuolinen 104 kilometrin estuaari teki kaupungista valtamerisataman.',
  },
  Neva: {
    nimi: 'Neva', tarkeys: 2, wiki: 'Neva (joki)',
    selitys: 'Neva on vain 74 kilometriä pitkä mutta erittäin runsasvetinen: se vie koko Laatokan vedet Suomenlahteen. Pietari rakennettiin sen suistoon vuonna 1703.',
  },
  Daugava: {
    nimi: 'Väinäjoki', tarkeys: 2, wiki: 'Väinäjoki',
    selitys: 'Väinäjoki eli Daugava virtaa 1 020 kilometriä Valdain ylängöltä Riianlahteen ja on Latvian tärkein joki. Nimen sana väinä tarkoittaa leveää, hitaasti virtaavaa jokea.',
  },
  Madeira: {
    nimi: 'Madeira', tarkeys: 2, wiki: 'Madeira (joki)',
    selitys: 'Madeira on Amazonin pisin sivujoki ja yhtyy pääuomaan Manausin tienoilla. Se tuo Andeilta runsaasti lietettä, joten sen vesi on savisen vaaleaa.',
  },
  'Rio Negro': {
    nimi: 'Rio Negro', tarkeys: 2, wiki: 'Rio Negro',
    selitys: 'Rio Negro on 2 230 kilometriä pitkä ja maailman suurin mustanveden joki: soiden humus värjää veden lähes mustaksi. Se on Amazonin suurin pohjoispuolinen sivujoki.',
  },
  Orinoco: {
    nimi: 'Orinoco', tarkeys: 2, wiki: 'Orinoco',
    selitys: 'Orinoco virtaa 2 140 kilometriä Venezuelan halki ja laskee Atlanttiin 22 500 neliökilometrin suistona. Yläjuoksulla se haarautuu poikkeuksellisesti myös Amazonin vesistöön Casiquiaren kautta.',
  },
  Murray: {
    nimi: 'Murray', tarkeys: 2, wiki: 'Murray (joki)',
    selitys: 'Murray on 2 375 kilometriä pitkä ja Darlingin latvoilta mitattuna 3 672 kilometriä, mikä tekee siitä Australian pisimmän joen. Se laskee Lake Alexandrinan laguuniin Adelaiden kaakkoispuolella.',
  },
  Darling: {
    nimi: 'Darling', tarkeys: 2, wiki: 'Darling (joki)',
    selitys: 'Darling on noin 1 545 kilometriä pitkä ja yhdessä Murrayn kanssa Australian tärkein jokialue. Vedenotto ja kuivuus ovat ajoittain katkaisseet virtauksen kokonaan.',
  },
  Angara: {
    nimi: 'Angara', tarkeys: 2, wiki: 'Angara',
    selitys: 'Angara on Baikaljärven ainoa laskujoki ja virtaa 1 779 kilometriä Jeniseihin. Sen varrella ovat Irkutsk ja Bratsk, ja joki on padottu useaan kertaan vesivoimaksi.',
  },
  'Sininen Niili': {
    nimi: 'Sininen Niili', tarkeys: 2, wiki: 'Sininen-Niili',
    selitys: 'Sininen Niili alkaa Etiopian Tanajärvestä ja yhtyy Khartumissa Valkoiseen Niiliin. Se tuo suurimman osan Niilin kesätulvan vedestä, joka aikoinaan lannoitti Egyptin pellot.',
  },
  Yamuna: {
    nimi: 'Jamuna', tarkeys: 2, wiki: 'Jamuna',
    selitys: 'Jamuna eli Yamuna on 1 376 kilometriä pitkä ja Gangesin toiseksi suurin sivujoki. Se virtaa Delhin ja Agran halki — Taj Mahal seisoo sen rannalla — ja on Intian saastuneimpia jokia.',
  },
  Magdalena: {
    nimi: 'Magdalena', tarkeys: 2, wiki: 'Magdalena (joki)',
    selitys: 'Magdalena on Kolumbian suurin joki, 1 650 kilometriä Andeilta Karibialle. Se oli vuosisatoja pääasiallinen kulkuyhteys rannikolta sisämaahan Bogotáan.',
  },
  Songhua: {
    nimi: 'Sungari', tarkeys: 3, wiki: 'Sungari',
    selitys: 'Sungari eli Songhua on noin 1 927 kilometriä pitkä ja Amurin suurin sivujoki. Se on Heilongjiangin maakunnan tärkein vedenlähde, ja sen varrella on Harbin.',
  },
  Athabasca: {
    nimi: 'Athabasca', tarkeys: 3, wiki: 'Athabascajoki',
    selitys: 'Athabascajoki alkaa Columbia Icefieldin jäätiköltä ja virtaa 1 532 kilometriä Athabascajärveen. Sen alajuoksulla ovat Albertan laajat öljyhiekkaesiintymät.',
  },
  Peace: {
    nimi: 'Peace', tarkeys: 3, wiki: 'Peace',
    selitys: 'Peace virtaa noin 1 923 kilometriä Kalliovuorilta Albertan halki ja yhtyy Slavejokeen. Yläjuoksun pato on padonnut Willistoninjärven, Brittiläisen Kolumbian suurimman tekojärven.',
  },
  Fraser: {
    nimi: 'Fraser', tarkeys: 3, wiki: 'Fraser',
    selitys: 'Fraser on Brittiläisen Kolumbian pisin joki, 1 375 kilometriä Kalliovuorilta Tyyneenmereen Vancouverissa. Provinssin historia on pitkälti sen laakson historiaa, turkiskaupasta kultaryntäykseen.',
  },
  Snake: {
    nimi: 'Snake', tarkeys: 3, wiki: 'Snake River',
    selitys: 'Snake River on Columbian suurin ja pisin sivujoki, 1 735 kilometriä Wyomingista Washingtoniin. Sen laaksoa pitkin kulki 1800-luvulla Oregon Trail, ja jokeen on rakennettu useita patoja.',
  },
  Arkansas: {
    nimi: 'Arkansas', tarkeys: 3, wiki: 'Arkansas (joki)',
    selitys: 'Arkansas on 2 350 kilometriä pitkä ja Missourin jälkeen Mississippin toiseksi pisin sivujoki. Se alkaa Kalliovuorilta jyrkkänä vuoristovirtana ja hidastuu preerian poikki Little Rockiin.',
  },
  Uruguay: {
    nimi: 'Uruguayjoki', tarkeys: 2, wiki: 'Uruguayjoki',
    selitys: 'Uruguayjoki virtaa 1 593 kilometriä Brasiliasta Río de la Platan estuaariin ja on suurimman osan matkasta valtakunnanraja. Maa Uruguay on saanut nimensä joesta.',
  },
  'São Francisco': {
    nimi: 'São Francisco', tarkeys: 2, wiki: 'São Francisco',
    selitys: 'São Francisco on 3 160 kilometrillään Etelä-Amerikan neljänneksi pisin joki ja virtaa kokonaan Brasilian sisällä. Se on Koillis-Brasilian kuivien seutujen elinehto.',
  },
  Purús: {
    nimi: 'Purus', tarkeys: 3, wiki: 'Purus',
    selitys: 'Purus on 3 211 kilometriä pitkä ja yhtyy Amazoniin Manausin lähellä. Se on yksi maailman mutkittelevimmista joista, joten uoma on paljon linnuntietä pidempi.',
  },
  Ucayali: {
    nimi: 'Ucayali', tarkeys: 3, wiki: 'Ucayalijoki',
    selitys: 'Ucayali on 1 960 kilometriä pitkä ja muodostaa Marañónin kanssa Amazonin alun Nautan luona Perussa. Yläjuoksullaan sitä kutsutaan Urubambaksi.',
  },
  Marañón: {
    nimi: 'Marañón', tarkeys: 3, wiki: 'Marañón',
    selitys: 'Marañón alkaa 5 800 metrin korkeudelta Andien jäätiköltä ja virtaa 1 600 kilometriä ennen yhtymistään Ucayaliin. Koskien ja putousten takia yläjuoksu ei kelpaa veneille.',
  },
  Godavari: {
    nimi: 'Godavari', tarkeys: 3, wiki: 'Godavari',
    selitys: 'Godavari on 1 465 kilometrillään yksi Intian pisimmistä joista ja virtaa Länsi-Ghateilta Bengalinlahteen. Se on hindujen pyhiä jokia, ja sen rannoilla on useita pyhiinvaelluskohteita.',
  },
  Krishna: {
    nimi: 'Krishna', tarkeys: 3, wiki: 'Krishna (joki)',
    selitys: 'Krishnan lähde on vain 64 kilometrin päässä Intian länsirannikosta, mutta joki virtaa 1 300 kilometriä itään Bengalinlahteen. Vedenjakaja kulkee siis aivan Arabianmeren tuntumassa.',
  },
  Narmada: {
    nimi: 'Narmada', tarkeys: 3, wiki: 'Narmada',
    selitys: 'Narmada on 1 312 kilometriä pitkä ja virtaa poikkeuksellisesti länteen Arabianmerelle, kun useimmat Intian suuret joet virtaavat itään. Se on yksi hindujen pyhistä joista.',
  },
  Sutlej: {
    nimi: 'Sutlej', tarkeys: 3, wiki: 'Sutlej',
    selitys: 'Sutlej alkaa 4 600 metrin korkeudelta Tiibetistä ja on pisin niistä viidestä joesta, joiden mukaan Punjab eli viiden virran maa on nimetty. Se yhtyy lopulta Indukseen Pakistanissa.',
  },
  Kasai: {
    nimi: 'Kasai', tarkeys: 3, wiki: 'Kasai (joki)',
    selitys: 'Kasai alkaa Angolasta ja yhtyy Kongojokeen Kwamouthissa lähellä Kinshasaa. Se on osan matkaa Angolan ja Kongon demokraattisen tasavallan rajajoki.',
  },
  Ubangi: {
    nimi: 'Ubangi', tarkeys: 3, wiki: 'Ubangi',
    selitys: 'Ubangi on 2 250 kilometriä pitkä ja Kongon suurin oikeanpuoleinen sivujoki. Se toimii Kongon kahden tasavallan ja Keski-Afrikan tasavallan välisenä rajana.',
  },
  Kama: {
    nimi: 'Kama', tarkeys: 3, wiki: 'Kama',
    selitys: 'Kama on 1 805 kilometriä pitkä Volgan sivujoki, joka tuo Uralin länsirinteiden vedet pääuomaan. Sitä pitkin kulki 1500-luvun lopulla venäläisten reitti Uralin yli Siperiaan.',
  },
  Petšora: {
    nimi: 'Petšora', tarkeys: 3, wiki: 'Petšora',
    selitys: 'Petšora virtaa 1 809 kilometriä Uralin länsipuolelta Barentsinmereen. Sen valuma-alue on Suomea suurempi, ja alue tunnetaan hiili- ja öljyesiintymistään.',
  },
  Vienanjoki: {
    nimi: 'Vienanjoki', tarkeys: 2, wiki: 'Vienanjoki',
    selitys: 'Vienanjoki eli Severnaja Dvina on 744 kilometriä pitkä ja laskee Vienanlahteen, jonka rannalla ovat Arkangeli ja Severodvinsk. Arkangeli oli 1500–1700-luvuilla Venäjän ainoa merisatama.',
  },

  // --- pienemmät ja paikalliset, kaikki tärkeys 3 ---
  Aldan: {
    nimi: 'Aldan', tarkeys: 3, wiki: 'Aldan (joki)',
    selitys: 'Aldan on 2 273 kilometriä pitkä ja Lenan toiseksi pisin sivujoki. Siitä 1 753 kilometriä kelpaa laivaliikenteelle, mikä on Jakutiassa merkittävä tieyhteys.',
  },
  Vilyuy: {
    nimi: 'Viljui', tarkeys: 3, wiki: 'Viljui',
    selitys: 'Viljui on 2 650 kilometrillään Lenan pisin sivujoki. Sen valuma-alueella ovat Jakutian timanttikaivokset.',
  },
  Olenjok: {
    nimi: 'Olenjok', tarkeys: 3, wiki: 'Olenjok',
    selitys: 'Olenjok virtaa 2 292 kilometriä Keski-Siperian ylängöltä Laptevinmereen aivan Lenan suiston länsipuolelle. Suulla on Ust-Olenjokin pikkuasutus.',
  },
  Indigirka: {
    nimi: 'Indigirka', tarkeys: 3, wiki: 'Indigirka',
    selitys: 'Indigirka on 1 726 kilometriä pitkä ja laskee Itä-Siperian mereen. Sen valuma-alue on hieman Suomea suurempi, ja seutu on maapallon kylmimpiä asuttuja alueita.',
  },
  Khatanga: {
    nimi: 'Hatanga', tarkeys: 3, wiki: 'Hatanga (joki)',
    selitys: 'Hatanga syntyy Kotuin ja Hetan yhtyessä ja virtaa 227 kilometriä Laptevinmereen. Samanniminen taajama sen varrella on yksi maailman pohjoisimmista pysyvistä asutuksista.',
  },
  Selenga: {
    nimi: 'Selenga', tarkeys: 3, wiki: 'Selenga',
    selitys: 'Selenga on 1 205 kilometriä pitkä ja tuo Mongolian vedet Baikaljärveen. Se on järven suurin tulojoki, ja sen alajuoksu on jäässä noin puoli vuotta.',
  },
  Argun: {
    nimi: 'Argun', tarkeys: 3, wiki: 'Argun (joki)',
    selitys: 'Argun on Amurin 1 620 kilometriä pitkä eteläinen latvajoki. Se on ollut Venäjän ja Kiinan raja vuoden 1689 Nertšinskin sopimuksesta lähtien.',
  },
  Tobol: {
    nimi: 'Tobol', tarkeys: 3, wiki: 'Tobol',
    selitys: 'Tobol virtaa Kazakstanin aroilta Irtyšiin. Sen suulla on Tobolsk, Siperian ensimmäinen pääkaupunki ja tärkeä etappi Venäjän itälaajenemisessa.',
  },
  Sukhona: {
    nimi: 'Suhona', tarkeys: 3, wiki: 'Suhona',
    selitys: 'Suhona virtaa 558 kilometriä Kubenskojejärvestä Vienanjokeen. Kanavat yhdistävät sen Volgaan asti, joten Moskovasta pääsi vesitse Vienanmerelle.',
  },
  Dnestr: {
    nimi: 'Dnestr', tarkeys: 3, wiki: 'Dnestr',
    selitys: 'Dnestr saa alkunsa Karpaateilta ja laskee Mustaanmereen. Se muodostaa osan Ukrainan ja Moldovan rajasta ja virtaa pitkän matkaa Moldovan halki.',
  },
  Tarim: {
    nimi: 'Tarim', tarkeys: 3, wiki: 'Tarim (joki)',
    selitys: 'Tarim on Xinjiangin merkittävin joki ja päättyy Taklamakanin autiomaahan ilman laskua mereen. Sen reunustamat keitaat olivat Silkkitien pohjoisia etappeja.',
  },
  Xi: {
    nimi: 'Xijiang', tarkeys: 3, wiki: 'Helmijoki',
    selitys: 'Xijiang eli Länsijoki on Helmijoen pääuoma ja päättyy Guangzhoun alapuolella laajaan suistoon. Suistosta on kasvanut yksi maailman tiheimmin asutuista teollisuusalueista.',
  },
  'Shatt al-Arab': {
    nimi: 'Shatt al-Arab', tarkeys: 3, wiki: 'Shatt al-Arab',
    selitys: 'Shatt al-Arab syntyy Eufratin ja Tigriksen yhtyessä ja virtaa noin 200 kilometriä Persianlahteen. Se on Irakin tärkein meriyhteys, sillä maalla on rannikkoa vain 40 kilometriä.',
  },
  Benue: {
    nimi: 'Benue', tarkeys: 3, wiki: 'Benue (joki)',
    selitys: 'Benue on 1 300 kilometriä pitkä ja Nigerin suurin sivujoki. Se alkaa Adamawan ylängöltä Kamerunista; kartalla ylempi, ranskankielinen jakso Bénoué on jätetty nimeämättä.',
  },
  Senegal: {
    nimi: 'Senegaljoki', tarkeys: 3, wiki: 'Senegal (joki)',
    selitys: 'Senegaljoki on 1 083 kilometriä pitkä ja muodostaa Mauritanian ja Senegalin rajan. Se laskee Atlanttiin Saint-Louisin kaupungin luona.',
  },
  Volta: {
    nimi: 'Volta', tarkeys: 3, wiki: 'Volta (joki)',
    selitys: 'Volta virtaa Ghanan halki Guineanlahteen ja on Mustan-Voltan latvoilta mitattuna 1 600 kilometriä pitkä. Akosombon pato on padonnut siitä Voltajärven, yhden maailman suurimmista tekojärvistä.',
  },
  Chari: {
    nimi: 'Chari', tarkeys: 3, wiki: 'Chari (joki)',
    selitys: 'Chari on 826 kilometriä pitkä ja tuo suurimman osan Tšadjärven vedestä. Joki ei laske mereen lainkaan, vaan päättyy sisämaajärveen, joka on kutistunut voimakkaasti.',
  },
  Uele: {
    nimi: 'Uele', tarkeys: 3, wiki: 'Uele',
    selitys: 'Uele on noin 1 200 kilometriä pitkä ja Ubangin lähdejoki Kongon pohjoisosassa. Se kerää vetensä Keski-Afrikan vedenjakajalta.',
  },
  Lualaba: {
    nimi: 'Lualaba', tarkeys: 3, wiki: 'Lualaba River',
    selitys: 'Lualaba on Kongon 1 800 kilometriä pitkä yläjuoksu, joka virtaa kokonaan Kongon demokraattisen tasavallan puolella. Se tuo Kongoon suurimman virtaaman, vaikka virallisena latvana pidetään Chambeshiä.',
  },
  Kagera: {
    nimi: 'Kagera', tarkeys: 3, wiki: 'Kagera',
    selitys: 'Kagera on 400 kilometriä pitkä ja laskee Victorianjärveen, joten se on Niilin kaukaisimpia latvoja. Joki kulkee Ruandan, Tansanian ja Ugandan rajoilla.',
  },
  Shire: {
    nimi: 'Shirejoki', tarkeys: 3, wiki: 'Shirejoki',
    selitys: 'Shirejoki on noin 400 kilometriä pitkä ja Njassajärven ainoa laskujoki kohti Sambesia. Sen laakso on osa Itä-Afrikan hautavajoamaa.',
  },
  Vaal: {
    nimi: 'Vaal', tarkeys: 3, wiki: 'Vaal',
    selitys: 'Vaal virtaa 1 210 kilometriä Drakensbergiltä Oranjejokeen. Sen padot antavat veden ja sähkön Johannesburgin ympäristön kaivos- ja teollisuusalueelle.',
  },
  'North Saskatchewan': {
    nimi: 'Pohjois-Saskatchewan', tarkeys: 3, wiki: 'North Saskatchewan River',
    selitys: 'Pohjois-Saskatchewan saa vetensä Kalliovuorten jäätiköiltä ja yhtyy Etelä-Saskatchewaniin Saskatchewanjoeksi. Sen varrella on Edmonton, ja vesi päätyy lopulta Hudsoninlahteen.',
  },
  Saskatchewan: {
    nimi: 'Saskatchewanjoki', tarkeys: 3, wiki: 'Saskatchewanjoki',
    selitys: 'Saskatchewanjoki on noin 550 kilometriä pitkä ja vie preerian vedet Winnipegjärveen. Se oli turkiskauppiaiden pääväylä lännen preerioille.',
  },
  Nelson: {
    nimi: 'Nelsonjoki', tarkeys: 3, wiki: 'Nelsonjoki',
    selitys: 'Nelsonjoki on 644 kilometriä pitkä ja johtaa Winnipegjärven vedet Hudsoninlahteen. Sen suun tuntumassa toimi Hudson’s Bay Companyn kauppapaikka York Factory.',
  },
  Slave: {
    nimi: 'Slave', tarkeys: 3, wiki: 'Slave (joki)',
    selitys: 'Slave on 415 kilometriä pitkä ja yhdistää Peace–Athabascan suiston Isoon Orjajärveen. Se on osa Mackenzien vesistöä, joten sen vesi päätyy Jäämereen.',
  },
  Ottawa: {
    nimi: 'Ottawa', tarkeys: 3, wiki: 'Ottawa (joki)',
    selitys: 'Ottawajoki on 1 271 kilometriä pitkä ja muodostaa Ontarion ja Québecin rajan. Se oli turkiskaupan pääreitti sisämaahan, ja Kanadan pääkaupunki nousi sen rannalle.',
  },
  'La Grande': {
    nimi: 'La Grande', tarkeys: 3, wiki: 'La Grande River',
    selitys: 'La Grande virtaa noin 900 kilometriä Jamesinlahteen ja on Québecin toiseksi pisin joki. 1980-luvun vesivoimahanke käänsi siihen kahden muun joen vedet ja lähes kaksinkertaisti valuma-alueen.',
  },
  Teslin: {
    nimi: 'Teslin', tarkeys: 3, wiki: 'Teslin River',
    selitys: 'Teslin virtaa 632 kilometriä Teslinjärveltä Yukoniin. Klondiken kultaryntäyksessä 1896–99 se oli suosittu reitti kultakentille Dawson Cityyn.',
  },
  Allegheny: {
    nimi: 'Allegheny', tarkeys: 3, wiki: 'Allegheny (joki)',
    selitys: 'Allegheny on 523 kilometriä pitkä ja muodostaa Monongahelan kanssa Ohiojoen Pittsburghissa. Sen laakso on Yhdysvaltain tärkeintä fossiilisten polttoaineiden aluetta.',
  },
  Araguaia: {
    nimi: 'Araguaia', tarkeys: 3, wiki: 'Araguaia',
    selitys: 'Araguaia on 1 910 kilometriä pitkä ja laskee Tocantinsiin. Sen keskijuoksulla on Bananal, maailman suurin jokisaari.',
  },
  Tocantins: {
    nimi: 'Tocantins', tarkeys: 3, wiki: 'Tocantins (joki)',
    selitys: 'Tocantins on runsaat kaksituhatta kilometriä pitkä ja laskee Parájokeen Amazonin suiston eteläreunalla. Se lasketaan vain toisinaan Amazonin sivujoeksi.',
  },
  Xingu: {
    nimi: 'Xingu', tarkeys: 3, wiki: 'Xingu',
    selitys: 'Xingu on 1 980 kilometriä pitkä Amazonin sivujoki, joka on putousten takia purjehduskelpoinen vain alajuoksultaan. Belo Monten pato on herättänyt laajaa vastustusta.',
  },
  Tapajós: {
    nimi: 'Tapajós', tarkeys: 3, wiki: 'Tapajós River',
    selitys: 'Tapajós tuo noin kuusi prosenttia Amazonin vesistön vedestä. Se oli aiemmin kirkasvetinen, mutta laiton kullankaivuu on samentanut sen.',
  },
  Mamoré: {
    nimi: 'Mamoré', tarkeys: 3, wiki: 'Mamoré River',
    selitys: 'Mamoré virtaa Bolivian Andeilta pohjoiseen ja on Madeiran, Amazonin pisimmän sivujoen, latvahaara. Se on Bolivian sisämaan tärkeimpiä vesireittejä.',
  },
  Paranaíba: {
    nimi: 'Paranaíba', tarkeys: 3, wiki: 'Paranaíba River',
    selitys: 'Paranaíba virtaa noin 1 000 kilometriä Minas Geraisista ja muodostaa Granden kanssa Paranájoen. Yhtymäkohdassa kohtaa kolmen Brasilian osavaltion raja.',
  },
  Negro: {
    nimi: 'Río Negro', tarkeys: 3, wiki: 'Río Negro (Argentiina)',
    selitys: 'Argentiinan Río Negro syntyy Neuquénin ja Limayn yhtyessä ja virtaa noin 640 kilometriä Patagonian halki Atlantille. Vain alin 400 kilometriä on purjehduskelpoista.',
  },
  Neuquén: {
    nimi: 'Neuquén', tarkeys: 3, wiki: 'Neuquén River',
    selitys: 'Neuquén on Limayn jälkeen maakuntansa toiseksi tärkein joki Argentiinan Patagoniassa, ja yhdessä ne muodostavat Río Negron. Altaan kerrostumat ovat runsasfossiilisia.',
  },
  Lachlan: {
    nimi: 'Lachlan', tarkeys: 3, wiki: 'Lachlan River',
    selitys: 'Lachlan on ajoittainen joki Uudessa Etelä-Walesissa, ja se yhtyy Murray–Darlingin vesistöön vasta tulvavuosina. Sen varrella on yhdeksän kansallisesti merkittävää kosteikkoa.',
  },
  Macquarie: {
    nimi: 'Macquarie', tarkeys: 3, wiki: 'Macquarie River',
    selitys: 'Macquarie virtaa Uuden Etelä-Walesin ylängöiltä luoteeseen Macquarien soille, joilta vesi jatkaa Barwonin kautta Darlingiin. Sen varrella ovat Bathurst ja Dubbo.',
  },
};

/*
 * Järvet. Kaspianmeri on aineistossa järvenä, ja niin se kartalla
 * piirretäänkin: se on suolainen sisämeri, mutta järveksi luettuna
 * ylivoimaisesti maailman suurin.
 */
const JARVINIMET = {
  Kaspianmeri: {
    nimi: 'Kaspianmeri', tarkeys: 1, wiki: 'Kaspianmeri',
    selitys: 'Kaspianmeri on suolainen sisämeri Euroopan ja Aasian rajalla, ja järveksi luettuna ylivoimaisesti maailman suurin. Sen pinta on merenpinnan alapuolella, eikä siitä lähde vettä minnekään.',
  },
  Baikal: {
    nimi: 'Baikal', tarkeys: 1, wiki: 'Baikaljärvi',
    selitys: 'Baikal on maailman syvin järvi: pohja on noin 1 642 metrin syvyydessä. Sen ainoa laskujoki on Angara, ja järvi on maailman vanhin.',
  },
  Victoriajärvi: {
    nimi: 'Victorianjärvi', tarkeys: 1, wiki: 'Victorianjärvi',
    selitys: 'Victorianjärvi on Afrikan suurin järvi ja pinta-alaltaan maailman toiseksi suurin makean veden järvi, 68 800 neliökilometriä. Se on laajuuteensa nähden matala, syvimmilläänkin vain 84 metriä.',
  },
  Yläjärvi: {
    nimi: 'Yläjärvi', tarkeys: 2, wiki: 'Yläjärvi',
    selitys: 'Yläjärvi eli Lake Superior on pinta-alaltaan maailman suurin makean veden järvi, jos Huron ja Michigan luetaan erillisiksi. Yhdysvaltain ja Kanadan raja kulkee järven halki.',
  },
  Huronjärvi: {
    nimi: 'Huronjärvi', tarkeys: 2, wiki: 'Huronjärvi',
    selitys: 'Huronjärvi on tilavuudeltaan maailman seitsemänneksi suurin järvi. Se on kapean Mackinacsalmen kautta yhteydessä Michiganjärveen, joten järvet ovat maantieteellisesti samaa vesialuetta.',
  },
  Michiganjärvi: {
    nimi: 'Michiganjärvi', tarkeys: 2, wiki: 'Michiganjärvi',
    selitys: 'Michiganjärvi on maailman viidenneksi suurin järvi ja ainoa Isoistajärvistä, joka on kokonaan Yhdysvaltain puolella. Sen etelärannalla on Chicago.',
  },
  Eriejärvi: {
    nimi: 'Eriejärvi', tarkeys: 2, wiki: 'Eriejärvi',
    selitys: 'Eriejärvi on Isoistajärvistä matalin, keskimäärin vain 19 metriä syvä. Siitä laskee Niagarajoki Ontariojärveen, ja pudotusta kiertämään rakennettiin Wellandin kanava.',
  },
  Ontariojärvi: {
    nimi: 'Ontariojärvi', tarkeys: 2, wiki: 'Ontariojärvi',
    selitys: 'Ontariojärvi on Isoistajärvistä alin ja laskee Saint Lawrencea pitkin Atlantille. Nimi on irokeesien kieltä ja tarkoittaa kaunista järveä tai kimmeltävää vettä.',
  },
  Tanganjika: {
    nimi: 'Tanganjika', tarkeys: 2, wiki: 'Tanganjikajärvi',
    selitys: 'Tanganjika on Afrikan syvin järvi, 1 471 metriä, ja yli 670 kilometriä pitkä kaistale Itä-Afrikan hautavajoamassa. Burton ja Speke löysivät sen vuonna 1858 etsiessään Niilin lähdettä.',
  },
  Malawijärvi: {
    nimi: 'Njassajärvi', tarkeys: 2, wiki: 'Njassajärvi',
    selitys: 'Njassa- eli Malawijärvi on maailman yhdeksänneksi suurin järvi, ja siinä elää enemmän kalalajeja kuin missään muussa järvessä. Se on hautavajoaman eteläisin suuri järvi.',
  },
  'Great Bear Lake': {
    nimi: 'Iso Karhujärvi', tarkeys: 2, wiki: 'Iso Karhujärvi',
    selitys: 'Iso Karhujärvi on Pohjois-Amerikan neljänneksi suurin järvi ja sijaitsee napapiirillä. Se kuuluu Mackenziejoen vesistöön, ja jää peittää sen suuren osan vuodesta.',
  },
  'Great Slave Lake': {
    nimi: 'Iso Orjajärvi', tarkeys: 2, wiki: 'Iso Orjajärvi',
    selitys: 'Iso Orjajärvi on 614 metrillään Pohjois-Amerikan syvin järvi. Siitä lähtee Mackenziejoki kohti Jäämerta.',
  },
  Winnipegjärvi: {
    nimi: 'Winnipegjärvi', tarkeys: 2, wiki: 'Winnipegjärvi',
    selitys: 'Winnipegjärvi on maailman 12. suurin makean veden allas ja peittää lähes neljä prosenttia Manitoban pinta-alasta. Sen vedet jatkavat Nelsonjokea pitkin Hudsoninlahteen.',
  },
  Laatokka: {
    nimi: 'Laatokka', tarkeys: 2, wiki: 'Laatokka',
    selitys: 'Laatokka on Euroopan suurin järvi, ja siitä lähtee Neva Suomenlahteen. Vain matala Karjalankannas erottaa sen merestä.',
  },
  Saimaa: {
    nimi: 'Saimaa', tarkeys: 2, wiki: 'Saimaa',
    selitys: 'Saimaa on Suomen suurin järvi ja Vuoksen vesistön pääjärvi. Sen vedet virtaavat Vuoksea pitkin Laatokkaan ja edelleen Nevaa myöten Itämerelle.',
  },
  Titicaca: {
    nimi: 'Titicaca', tarkeys: 2, wiki: 'Titicaca',
    selitys: 'Titicaca on Etelä-Amerikan suurin järvi ja maailman korkeimmalla sijaitseva purjehduskelpoinen järvi, 3 821 metriä merenpinnan yläpuolella. Se on Perun ja Bolivian rajalla Andien altiplanolla.',
  },
  Ääninen: {
    nimi: 'Ääninen', tarkeys: 3, wiki: 'Ääninen',
    selitys: 'Ääninen eli Äänisjärvi on Euroopan toiseksi suurin järvi, 9 800 neliökilometriä. Se sijaitsee pääosin Karjalan tasavallassa Laatokan koillispuolella.',
  },
  Vänern: {
    nimi: 'Vänern', tarkeys: 3, wiki: 'Vänern',
    selitys: 'Vänern on Ruotsin ja Euroopan unionin suurin järvi sekä Euroopan kolmanneksi suurin. Sen laskujoki Göta älv vie vedet Kattegattiin Göteborgin kohdalla.',
  },
  'Lake Balkhash': {
    nimi: 'Balkašjärvi', tarkeys: 3, wiki: 'Balkašjärvi',
    selitys: 'Balkašjärvi on Kaspianmeren jälkeen Keski-Aasian toiseksi suurin järvi, mutta hyvin matala eikä siitä lähde vettä minnekään. Se kutistuu Araljärven tavoin, koska tulojokia on otettu kasteluun.',
  },
  'Issyk-Kul': {
    nimi: 'Ysyk-Köl', tarkeys: 3, wiki: 'Ysyk-Köl',
    selitys: 'Ysyk-Köl on vuoristojärvi Tienšanissa 1 608 metrin korkeudessa Kirgisiassa. Nimi tarkoittaa kuumaa järveä: se ei jäädy talvellakaan.',
  },
  'Pohjois-Araljärvi': {
    nimi: 'Pohjois-Araljärvi', tarkeys: 3, wiki: 'Araljärvi',
    selitys: 'Araljärvi oli vielä 1960 maailman neljänneksi suurin järvi, mutta kastelu kuivatti sen useaksi erilliseksi altaaksi. Pohjoinen allas on padon ansiosta osittain palautunut.',
  },
  'Etelä-Araljärvi': {
    nimi: 'Etelä-Araljärvi', tarkeys: 3, wiki: 'Araljärvi',
    selitys: 'Eteläinen Aral jäi Amudarjan kuivuttua lähes kokonaan ilman tulovettä. Entinen järvenpohja on nykyään suolaista autiomaata.',
  },
  Turkanajärvi: {
    nimi: 'Turkanajärvi', tarkeys: 3, wiki: 'Turkanajärvi',
    selitys: 'Turkanajärvi on maailman suurin pysyvä aavikkojärvi, 6 750 neliökilometriä. Siitä ei lähde vettä minnekään, vaan se poistuu haihtumalla.',
  },
  Albertjärvi: {
    nimi: 'Albertinjärvi', tarkeys: 3, wiki: 'Albertinjärvi',
    selitys: 'Albertinjärvi on Afrikan seitsemänneksi suurin järvi Ugandan ja Kongon rajalla. Se on Niilin vesistön pohjoisin hautavajoamajärvi.',
  },
  'Lac Moeru': {
    nimi: 'Mwerujärvi', tarkeys: 3, wiki: 'Mwerujärvi',
    selitys: 'Mwerujärvi on Kongon ja Sambian rajalla ja kuuluu Kongojoen vesistöön. Sen eteläosa on vain parin metrin syvyinen.',
  },
  'Tšadjärvi': {
    nimi: 'Tšadjärvi', tarkeys: 3, wiki: 'Tšadjärvi',
    selitys: 'Tšadjärvi on neljän valtion alueella ja keskisyvyydeltään vain puolitoista metriä. Se kuivui rajusti 1960-luvulta 1980-luvulle, ja kartan muoto on siksi vain suuntaa antava.',
  },
  Nicaraguajärvi: {
    nimi: 'Nicaraguajärvi', tarkeys: 3, wiki: 'Nicaraguajärvi',
    selitys: 'Nicaraguajärvi eli Cocibolca on Keski-Amerikan suurin järvi. Sitä harkittiin pitkään osaksi Panaman kanavan kilpailijaa Atlantilta Tyynellemerelle.',
  },
  'Lake Eyre North': {
    nimi: 'Eyrejärvi', tarkeys: 3, wiki: 'Eyrejärvi',
    selitys: 'Eyrejärvi eli Kati Thanda on Australian sisäosien laskujoeton allas, joka on useimmiten kuiva suolatasanko. Harvoina sadevuosina se täyttyy jopa 9 700 neliökilometrin laajuiseksi järveksi.',
  },
  'Lake Torrens': {
    nimi: 'Torrensjärvi', tarkeys: 3, wiki: 'Torrensjärvi',
    selitys: 'Torrensjärvi on Australian toiseksi suurin järvi ja sekin useimmiten kuiva suola-allas. Edward John Eyre löysi sen vuonna 1839.',
  },
  'Lake Athabasca': {
    nimi: 'Athabascajärvi', tarkeys: 3, wiki: 'Athabascajärvi',
    selitys: 'Athabascajärvi on Kanadan kahdeksanneksi suurin järvi ja 283 kilometriä pitkä. Se on sekä Albertan että Saskatchewanin syvin järvi.',
  },
  'Reindeer Lake': {
    nimi: 'Peurajärvi', tarkeys: 3, wiki: 'Peurajärvi (Kanada)',
    selitys: 'Peurajärvi eli Reindeer Lake on Kanadan yhdeksänneksi suurin järvi Saskatchewanin ja Manitoban rajalla. Sen rantaviiva on hyvin rikkonainen ja saaria on tuhansia.',
  },
  'Lake Winnipegosis': {
    nimi: 'Winnipegosisjärvi', tarkeys: 3, wiki: 'Winnipegosisjärvi',
    selitys: 'Winnipegosisjärvi on Kanadan 11. suurin järvi Manitobassa. Se on jäänne jääkauden jälkeisestä Agassiz-jääjärvestä, kuten naapurinsa Winnipeg ja Manitoba.',
  },
  'Lake Manitoba': {
    nimi: 'Manitobajärvi', tarkeys: 3, wiki: 'Manitobajärvi',
    selitys: 'Manitobajärvi on noin 200 kilometriä pitkä ja pienin Manitoban kolmesta suuresta järvestä. Provinssi on saanut nimensä siltä.',
  },
  'Lake Nipigon': {
    nimi: 'Nipigonjärvi', tarkeys: 3, wiki: 'Nipigonjärvi',
    selitys: 'Nipigonjärvi on suurin kokonaan Ontarion sisällä oleva järvi. Sen vedet on 1940-luvulta lähtien ohjattu Nipigonjokea pitkin Yläjärveen vesivoimaksi.',
  },
  'Nettilling Lake': {
    nimi: 'Nettillingjärvi', tarkeys: 3, wiki: 'Nettillingjärvi',
    selitys: 'Nettillingjärvi on Baffininsaarella Nunavutissa ja Nunavutin suurin järvi. Se on jäässä suurimman osan vuodesta.',
  },
  'Lake of the Woods': {
    nimi: 'Metsäjärvi', tarkeys: 3, wiki: 'Lake of the Woods',
    selitys: 'Lake of the Woods eli Metsäjärvi on Yhdysvaltain ja Kanadan rajalla. Se erottaa Minnesotasta Northwest Anglen, jonne pääsee maitse vain Kanadan kautta.',
  },
  'Georgian Bay': {
    nimi: 'Georgianlahti', tarkeys: 3, wiki: 'Georgian Bay',
    selitys: 'Georgianlahti on Huronjärven itäinen osa ja kokonaan Kanadan puolella. Manitoulin, sen luoteispuolella, on maailman suurin järvisaari.',
  },
  'Lake Taymyr': {
    nimi: 'Taimyrjärvi', tarkeys: 3, wiki: 'Taimyrjärvi',
    selitys: 'Taimyrjärvi on Taimyrin niemimaalla ja jäässä syyskuusta kesäkuuhun. Se on keskisyvyydeltään vain kolmisen metriä ja laskee Karanmereen.',
  },
};

/* --- laskenta --- */

const { MAAILMANKARTAN_MAASTO: maasto } =
  await import(`file://${join(JUURI, 'js/packs/maailmankartta-maasto.js')}`);

const luku = (n) => Number(n.toFixed(1));

/** Murtoviivan pituus laudan yksiköissä. */
const pituus = (pisteet) => {
  let s = 0;
  for (let i = 1; i < pisteet.length; i++) {
    s += Math.hypot(pisteet[i][0] - pisteet[i - 1][0], pisteet[i][1] - pisteet[i - 1][1]);
  }
  return s;
};

/** Renkaan suurin mitta: kahden kaukaisimman pisteen etäisyys. */
const halkaisija = (rengas) => {
  let suurin = 0;
  for (let i = 0; i < rengas.length; i++) {
    for (let j = i + 1; j < rengas.length; j++) {
      const d = Math.hypot(rengas[i][0] - rengas[j][0], rengas[i][1] - rengas[j][1]);
      if (d > suurin) suurin = d;
    }
  }
  return suurin;
};

const laatikko = (pisteet) => {
  const xs = pisteet.map((p) => p[0]);
  const ys = pisteet.map((p) => p[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
};

const laatikkoEtaisyys = (a, b) => Math.hypot(
  Math.max(0, Math.max(a[0] - b[2], b[0] - a[2])),
  Math.max(0, Math.max(a[1] - b[3], b[1] - a[3])),
);

/*
 * Saman nimen pätkät ryppäiksi.
 *
 * Kynnys on 300 laudan yksikköä eli noin yhdeksän astetta. Se on
 * reilusti enemmän kuin katkos saman joen pätkien välillä (Lualaban
 * puolikkaiden väli on noin 90) ja reilusti vähemmän kuin etäisyys
 * eri maanosien samannimisten jokien välillä (Coloradot ovat toisistaan
 * yli 5 000 yksikön päässä). Kynnys erottaa siis eri joet mutta ei
 * pilko yhtä jokea.
 */
const KYNNYS = 300;
const ryppaat = (osat) => {
  const laat = osat.map(laatikko);
  const ryhma = osat.map((_, i) => i);
  let muutos = true;
  while (muutos) {
    muutos = false;
    for (let i = 0; i < osat.length; i++) {
      for (let j = i + 1; j < osat.length; j++) {
        if (ryhma[i] === ryhma[j]) continue;
        if (laatikkoEtaisyys(laat[i], laat[j]) > KYNNYS) continue;
        const [pieni, iso] = [Math.min(ryhma[i], ryhma[j]), Math.max(ryhma[i], ryhma[j])];
        for (let k = 0; k < ryhma.length; k++) if (ryhma[k] === iso) ryhma[k] = pieni;
        muutos = true;
      }
    }
  }
  const summat = new Map();
  osat.forEach((p, i) => summat.set(ryhma[i], (summat.get(ryhma[i]) ?? 0) + pituus(p)));
  return [...summat.values()].sort((a, b) => b - a);
};

/** Kerää saman avaimen muodot yhteen. */
const kerays = (lista, kentta) => {
  const ulos = new Map();
  for (const m of lista) {
    const avain = m.nimi;
    if (!ulos.has(avain)) ulos.set(avain, []);
    ulos.get(avain).push(m[kentta]);
  }
  return ulos;
};

const jokiOsat = kerays(maasto.joet, 'pisteet');
const jarviOsat = kerays(maasto.jarvet, 'rengas');

const virheet = [];
const huomiot = [];

/*
 * Rakentaa yhden viennin listan. Samalla tarkistetaan, ettei taulukossa
 * ole nimeä, jota aineistossa ei ole — kirjoitusvirhe avaimessa jäisi
 * muuten huomaamatta, koska sen ainoa oire on puuttuva nimi kartalla.
 */
function kokoa(taulukko, osat, mitta) {
  const ulos = [];
  for (const [avain, tiedot] of Object.entries(taulukko)) {
    const muodot = osat.get(avain);
    if (!muodot) {
      virheet.push(`taulukossa on nimi, jota aineistossa ei ole: ${avain}`);
      continue;
    }
    if (!Number.isInteger(tiedot.tarkeys) || tiedot.tarkeys < 1 || tiedot.tarkeys > 3) {
      virheet.push(`${avain}: tärkeys on oltava 1-3`);
    }
    for (const kentta of ['nimi', 'wiki', 'selitys']) {
      if (!tiedot[kentta]?.trim()) virheet.push(`${avain}: ${kentta} puuttuu`);
    }
    // Selitys on tarkoitettu 1-2 lauseeksi. Pitkä valuu laatikon yli.
    if (tiedot.selitys && tiedot.selitys.length > 330) {
      virheet.push(`${avain}: selitys on liian pitkä (${tiedot.selitys.length} merkkiä)`);
    }
    ulos.push({
      avain,
      nimi: tiedot.nimi,
      tarkeys: tiedot.tarkeys,
      pituus: luku(mitta(muodot, avain)),
      wiki: tiedot.wiki,
      selitys: tiedot.selitys,
    });
  }
  return ulos.sort((a, b) => a.tarkeys - b.tarkeys || b.pituus - a.pituus);
}

/* Joen mitta: suurimman ryppään yhteispituus. */
const jokiMitta = (muodot, avain) => {
  const koot = ryppaat(muodot);
  if (koot.length > 1 && koot[1] > 20) {
    huomiot.push(`${avain}: kartalla ${koot.length} erillistä samannimistä jokea `
      + `(${koot.map((k) => Math.round(k)).join(', ')}) — selitys koskee suurinta`);
  }
  return koot[0];
};

/* Järven mitta: suurimman renkaan halkaisija. Kierron kopiot ovat
 * samankokoisia, joten suurin kertoo järven todellisen leveyden. */
const jarviMitta = (muodot) => Math.max(...muodot.map(halkaisija));

const joet = kokoa(JOKINIMET, jokiOsat, jokiMitta);
const jarvet = kokoa(JARVINIMET, jarviOsat, jarviMitta);

/*
 * Nimeämättä jätetyt. Jokainen aineiston nimi on oltava joko
 * taulukossa tai tässä: muuten uusi maastoajo voi tuoda kartalle
 * nimen, jota kukaan ei ole katsonut.
 */
const OHITETUT = {
  'Albert Nile': 'Niilin jakso Albertinjärven ja Nimulen välillä',
  'Victoria Nile': 'Niilin jakso Victorianjärveltä Albertinjärvelle',
  'Bahr el Jebel': 'Valkoisen Niilin jakso Nimulesta Lake Nolle',
  'Valkoinen Niili': 'Niilin läntinen päähaara — nimi piirretään pääuomalle',
  'Bénoué': 'Benuen ranskankielinen yläjuoksu',
  Maquan: 'Brahmaputran latva Tiibetissä (Maquan He)',
  Shiquan: 'Induksen latva Tiibetissä (Shiquan He)',
  Za: 'Mekongin latva Qinghaissa (Za Qu)',
  "N'Mai": 'Iravadin itäinen latvajoki',
  Nanpan: 'Xijiangin yläjuoksu Yunnanissa',
  Hongshui: 'Xijiangin keskijuoksu',
  Xun: 'Xijiangin jakso — laudalla vain 46 yksikköä',
  Ideriyn: 'Selengan latva Mongoliassa',
  'Shishhid Gol': 'Jenisein latva Mongoliassa',
  'Kyzyl-Khem': 'Jenisein latva Tuvassa',
  'Pieni Jenisei': 'Jenisein latvahaara — laudalla vain 48 yksikköä',
  Hailar: 'Argunin yläjuoksu (Hailar He)',
  Bafing: 'Senegaljoen latva Guineassa',
  Barwon: 'Darlingin yläjuoksu',
  Dumaresq: 'Barwonin latva — laudalla vain 65 yksikköä',
  Guaporé: 'Mamorén latva — laudalla vain 58 yksikköä',
  Indaiá: 'São Franciscon latva — laudalla vain 71 yksikköä',
  Madison: 'Missourin latvajoki Montanassa',
  Kibali: 'Uelen latva',
  Santee: 'pikkujoki Etelä-Carolinassa — laudalla vain 33 yksikköä',
};

for (const avain of jokiOsat.keys()) {
  if (!(avain in JOKINIMET) && !(avain in OHITETUT)) {
    virheet.push(`aineistossa on joki, jolle ei ole päätöstä: ${avain}`);
  }
}
for (const avain of Object.keys(OHITETUT)) {
  if (!jokiOsat.has(avain)) virheet.push(`ohituslistassa on nimi, jota aineistossa ei ole: ${avain}`);
}
for (const avain of jarviOsat.keys()) {
  if (!(avain in JARVINIMET)) virheet.push(`aineistossa on järvi, jolle ei ole nimeä: ${avain}`);
}

/* --- raportti --- */

const kpl = (lista, t) => lista.filter((r) => r.tarkeys === t).length;
console.log(`joet    ${joet.length} nimettyä (${kpl(joet, 1)} + ${kpl(joet, 2)} + ${kpl(joet, 3)}), `
  + `${Object.keys(OHITETUT).length} ohitettu`);
console.log(`järvet  ${jarvet.length} nimettyä (${kpl(jarvet, 1)} + ${kpl(jarvet, 2)} + ${kpl(jarvet, 3)})`);
for (const h of huomiot) console.log(`  huom: ${h}`);
for (const v of virheet) console.error(`  VIRHE: ${v}`);
if (virheet.length) process.exit(1);
if (kuiva) process.exit(0);

/* --- kirjoitus --- */

/*
 * Rivi JavaScriptin oliokirjoitusasussa, ei JSONina.
 *
 * Ero on käytännöllinen: tools/tarkista-wikit.mjs etsii paketeista
 * hahmoa `wiki: '...'` ja tarkistaa jokaisen otsikon Wikipediasta.
 * JSONin `"wiki":"..."` jäisi sen ulkopuolelle, ja kuollut linkki
 * paljastuisi vasta pelaajalle tyhjänä Lue lisää -ikkunana.
 */
const lainaus = (arvo) => `'${String(arvo).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const rivi = (r) => `  { avain: ${lainaus(r.avain)}, nimi: ${lainaus(r.nimi)}, `
  + `tarkeys: ${r.tarkeys}, pituus: ${r.pituus}, wiki: ${lainaus(r.wiki)},\n`
  + `    selitys: ${lainaus(r.selitys)} },`;

const teksti = `// Vesistöjen nimet maailmankartalle: joet ja järvet.
//
// TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA. Älä muokkaa käsin —
// muuta tools/nimea-vedet.mjs ja aja se uudelleen.
//
// avain      sama merkkijono kuin maailmankartta-maasto.js:n nimi-
//            kentässä. Usea pätkä voi kantaa samaa avainta: nimi
//            piirretään silloin KERRAN, esimerkiksi pisimmälle
//            pätkälle. Pätkä, jonka nimelle ei ole avainta, jää
//            nimeämättä — se on latvajoki, toisen kielinen jakso
//            tai liian pieni nimettäväksi.
// nimi       kartalle kirjoitettava suomenkielinen nimi.
// tarkeys    1 = maailman tunnetuimmat, 2 = merkittävät, 3 = pienet.
//            Ratkaisee, millä zoomilla nimi ilmestyy.
// pituus     laudan yksiköitä. Joella kaikkien avaimen pätkien
//            yhteispituus, järvellä renkaan suurin halkaisija.
//            Kertoo, paljonko nimelle on tilaa.
// wiki       Wikipedian otsikko "Lue lisää" -ikkunaa varten. Suomeksi
//            aina kun suomenkielinen artikkeli on olemassa; muutamalla
//            pienellä joella otsikko on englanniksi, koska js/wiki.js
//            kokeilee suomen jälkeen englantia.
// selitys    1-2 lausetta aikuiselle lukijalle: jotain, mitä kartalta
//            ei näe.

const JOKINIMET = [
${joet.map(rivi).join('\n')}
];

const JARVINIMET = [
${jarvet.map(rivi).join('\n')}
];

export const VESISTONIMET = { joet: JOKINIMET, jarvet: JARVINIMET };
`;

const ulos = join(JUURI, 'js/packs/maasto-nimet-vedet.js');
writeFileSync(ulos, teksti);
console.log(`kirjoitettu ${ulos} (${Math.round(teksti.length / 1024)} kt)`);
