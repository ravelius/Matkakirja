/*
 * Uutislähteet maittain (omistajan toive 5.8.2026): lehden
 * maaosastossa näkyy muutama ajankohtainen uutisotsikko paikallisella
 * kielellä. Otsikoita EI lyhennetä eikä mukailla — ne ovat aitoa
 * paikallista mediaa sellaisenaan.
 *
 * Selain ei voi hakea RSS-syötteitä suoraan (CORS), joten haku kulkee
 * pienen Cloudflare Worker -välityksen kautta. Workerin lähdekoodi ja
 * käyttöönotto-ohje: tools/uutisproxy/. Kun omistaja on ottanut
 * workerin käyttöön, sen osoite kirjoitetaan UUTISPROXY-vakioon —
 * siihen asti uutisosio pysyy piilossa eikä peli yritä hakuja.
 *
 * Rakenne per maa (avain = ISO-3, sama kuin map.cityCountry):
 *   nimi  — lähteen nimi lähderiville
 *   kieli — syötteen kieli (MyMemory-käännöksen lähdekieli)
 *   syote — RSS-syötteen osoite (lisää myös workerin sallittujen
 *           listaan, tools/uutisproxy/worker.js)
 */
// Omistajan worker, otettu käyttöön 5.8.2026 (ks. tools/uutisproxy/).
// HUOM: https://-alku on pakollinen — ilman sitä selain tulkitsisi
// osoitteen suhteelliseksi poluksi pelin omalle sivustolle.
export const UUTISPROXY = 'https://matkakirja-uutiset.samireivinen.workers.dev';

export const UUTISLAHTEET = {
  // BBC:n syöte ja artikkelisivut aukeavat workerin läpi ongelmitta
  // (testattu 6.8.2026: <article> jäsentyy, og:image löytyy).
  GBR: {
    nimi: 'BBC News',
    kieli: 'en',
    syote: 'https://feeds.bbci.co.uk/news/rss.xml',
  },
  // Youm7 (اليوم السابع) on Egyptin luetuimpia uutissivustoja.
  // Al-Ahramin syötteet ovat botti-eston takana (testattu 5.8.2026),
  // Youm7:n RSS ja artikkelisivut aukeavat workerin läpi ongelmitta.
  EGY: {
    nimi: 'Youm7',
    kieli: 'ar',
    syote: 'https://www.youm7.com/rss/SectionRss?SectionID=65',
  },
  ITA: {
    nimi: 'ANSA',
    kieli: 'it',
    syote: 'https://www.ansa.it/sito/ansait_rss.xml',
  },
  /*
   * 20minutos on Espanjan luetuimpia uutissivustoja ja ilmainen.
   *
   * El País kokeiltiin ensin (omistajan ehdotus): SYÖTE aukeaa, mutta
   * ARTIKKELISIVUT palauttavat 403 botti-estosta (testattu 6.8.2026),
   * jolloin popupiin jäisi vain syötteen parin lauseen kuvaus. RTVE:n
   * syötteen linkit osoittavat vanhentuneisiin osoitteisiin, jotka
   * sekin palauttaa 403:na. 20minutoksen syöte (190 juttua) ja
   * artikkelisivut aukeavat molemmat: <article> jäsentyy, leipäteksti
   * poimiutuu ja og:image löytyy.
   */
  ESP: {
    nimi: '20minutos',
    kieli: 'es',
    syote: 'https://www.20minutos.es/rss/',
  },
  /*
   * SVT on Ruotsin yleisradio ja maan luetuimpia uutissivustoja.
   * Testattu 7.8.2026 (UA matkakirja-uutisvalitys/1.0): syöte antaa
   * sata juttua ja artikkelisivulta jäsentyy <article> sekä
   * og:image, eli popup saa koko leipätekstin.
   *
   * Sveriges Radion Ekot kokeiltiin ensin (omistajan ehdotus), mutta
   * api.sr.se palauttaa ATOM-syötteen (<entry>), ja peli lukee RSS:n
   * <item>-alkioita — syötteestä ei siis irtoaisi yhtään otsikkoa
   * ilman koodimuutosta. Aftonbladetin RSS ja artikkelisivut
   * läpäisivät molemmat testit; yleisradio valittiin samalla
   * perusteella kuin Britanniassa BBC.
   *
   * HUOM: osoite www.svt.se/nyheter/rss.xml ohjaa osoitteeseen
   * www.svt.se/rss.xml. Tässä on ohjauksen päätepiste, koska worker
   * ei seuraa uudelleenohjauksia.
   */
  SWE: {
    nimi: 'SVT Nyheter',
    kieli: 'sv',
    syote: 'https://www.svt.se/rss.xml',
  },
  /*
   * tagesschau on Saksan yleisradion (ARD) uutissivusto ja maan
   * seuratuimpia lähteitä. Syöte JA artikkelisivut testattu 7.8.2026:
   * syötteessä 40 juttua, artikkelissa <article> jäsentyy (11 pitkää
   * kappaletta) ja og:image löytyy. Osoite on lopullinen kohde —
   * tagesschau.de/xml/rss2 ohjaa tänne 301:llä, ja suora osoite
   * säästää yhden hypyn workerissa.
   */
  DEU: {
    nimi: 'tagesschau',
    kieli: 'de',
    syote: 'https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml',
  },
  /*
   * Global News on Corus Entertainmentin valtakunnallinen uutissivusto
   * ja Kanadan luetuimpia. Testattu 6.9.2026 (UA
   * matkakirja-uutisvalitys/1.0): syöte aukeaa ja artikkelisivulta
   * jäsentyy <article> (20 yli 60 merkin kappaletta) sekä og:image.
   *
   * CBC kokeiltiin ensin, koska yleisradio on ollut valinta
   * Britanniassa, Ruotsissa ja Saksassa: sen SYÖTE aukeaa ongelmitta,
   * mutta ARTIKKELISIVULLA ei ole <article>-elementtiä eikä
   * [itemprop="articleBody"]-merkintää, joten popupiin jäisi vain
   * syötteen parin lauseen kuvaus (sama vika kuin El Paísilla
   * 6.8.2026). CTV Newsin vanha RSS-osoite palauttaa 404.
   */
  CAN: {
    nimi: 'Global News',
    kieli: 'en',
    syote: 'https://globalnews.ca/feed/',
  },
  /*
   * La Jornada on Mexico Cityn suuria päivälehtiä ja sen syöte on
   * avoin. Testattu 6.9.2026: syöte aukeaa ja artikkelisivulta
   * jäsentyy <article> sekä og:image. Excélsiorin rss.xml palauttaa
   * 404 ja Milenion /rss 403:n (botti-esto).
   */
  MEX: {
    nimi: 'La Jornada',
    kieli: 'es',
    syote: 'https://www.jornada.com.mx/rss/edicion.xml',
  },
  /*
   * RPP Noticias on Perun seuratuimpia uutislähteitä, ja sen radio on
   * jo pelissä (js/packs/radiot.js, PER). Testattu 6.9.2026: syöte
   * aukeaa ja artikkelisivulta jäsentyy <article> sekä og:image.
   *
   * HUOM: osoite rpp.pe/feed ohjaa osoitteeseen rpp.pe/rss. Tässä on
   * ohjauksen päätepiste, koska worker ei seuraa uudelleenohjauksia
   * (sama ratkaisu kuin SVT:llä). La Repúblican arcio/rss palauttaa
   * 404:n.
   */
  PER: {
    nimi: 'RPP Noticias',
    kieli: 'es',
    syote: 'https://rpp.pe/rss',
  },
  /*
   * La Nación on chileläinen uutissivusto, jonka syöte JA artikkelisivut
   * läpäisivät molemmat testit 6.9.2026: syötteessä kymmenen juttua ja
   * artikkelisivun ensimmäisessä <article>-lohkossa kaksitoista yli 60
   * merkin kappaletta sekä og:image.
   *
   * Chilen suuret sivustot kokeiltiin ensin ja hylättiin: La Tercera
   * (syöte 100 juttua, og:image löytyy, mutta sivulla ei ole
   * <article>-elementtiä eikä [itemprop="articleBody"]-merkintää —
   * sama vika kuin El Paísilla 6.8.2026), Radio U. de Chile (sama vika),
   * The Clinic (kaksitoista <article>-lohkoa, joista ensimmäinen on
   * nostokortti eikä leipäteksti), ex-ante.cl (artikkelisivu 403).
   * Emol, BioBioChile, Cooperativa, 24horas, ADN, Meganoticias, CNN
   * Chile, El Mostrador ja T13 eivät tarjonneet toimivaa RSS-osoitetta.
   */
  CHL: {
    nimi: 'La Nación',
    kieli: 'es',
    syote: 'https://www.lanacion.cl/feed/',
  },
  /*
   * La Silla Vacía on kolumbialainen tutkivan journalismin sivusto.
   * Testattu 6.9.2026: syötteessä kymmenen juttua ja artikkelisivun
   * ensimmäisessä <article>-lohkossa 40 yli 60 merkin kappaletta sekä
   * og:image.
   *
   * El Tiempo kokeiltiin ensin, koska se on maan luetuin: sen syöte
   * aukeaa ja og:image löytyy, mutta sivun ensimmäisessä
   * <article>-lohkossa on vain kuvateksti ja tilausmainos — peli poimii
   * aina ensimmäisen <article>-elementin, joten popupiin ei jäisi
   * leipätekstiä. Semanan syötteessä on sata juttua, mutta sen ainoassa
   * <article>-lohkossa ei ole yhtään kappaletta. El Espectador, El
   * Colombiano, Blu Radio, RCN Radio, Caracol, Pulzo ja Publimetro eivät
   * tarjonneet toimivaa RSS-osoitetta.
   */
  COL: {
    nimi: 'La Silla Vacía',
    kieli: 'es',
    syote: 'https://www.lasillavacia.com/feed/',
  },
  /*
   * Montevideo Portal on Uruguayn luetuimpia uutissivustoja. Testattu
   * 6.9.2026: syötteessä kahdeksan juttua (otsikot CDATA-kentissä, jotka
   * DOMParser purkaa itsestään), ja artikkelisivun ensimmäisestä
   * <article>-lohkosta jäsentyy kuusi yli 60 merkin kappaletta sekä
   * og:image.
   *
   * Hylätyt: El Paísin /rss ja /rss/ vastaavat 302:lla eikä worker seuraa
   * uudelleenohjauksia; El Observadorin syöte aukeaa, mutta sen
   * ensimmäisessä <article>-lohkossa on vain ingressi (sama vika kuin El
   * Paísilla 6.8.2026); La Repúblican /feed/ palauttaa 404 ja Teledocen
   * syötteen linkit osoittavat etusivulle. La Diaria läpäisi molemmat
   * testit, mutta sen leipätekstin seassa on kirjautumiskehote.
   */
  URY: {
    nimi: 'Montevideo Portal',
    kieli: 'es',
    syote: 'https://www.montevideo.com.uy/anxml.aspx?59',
  },
  /*
   * ABC Color on Paraguayn suurin päivälehti. Testattu 6.9.2026:
   * syötteessä sata juttua ja artikkelisivun ensimmäisestä
   * <article>-lohkosta jäsentyy viisi yli 60 merkin kappaletta sekä
   * og:image.
   *
   * HUOM: osoitteessa on kyselymerkkijono (?outputType=xml), joka
   * kulkee workerin läpi ongelmitta, koska peli koodaa koko osoitteen
   * url-parametriin. Hylätyt: abc.com.py/rss.xml (404), Última Horan
   * rss.xml ja rss/portada.xml (404), La Nación PY /feed/ (404) ja Hoy
   * /rss (301 ilman toimivaa päätepistettä).
   */
  PRY: {
    nimi: 'ABC Color',
    kieli: 'es',
    syote: 'https://www.abc.com.py/arc/outboundfeeds/rss/?outputType=xml',
  },
  /*
   * El Nacional on Venezuelan vanhimpia päivälehtiä. Testattu 6.9.2026:
   * syötteessä sata juttua ja artikkelisivun ensimmäisestä
   * <article>-lohkosta jäsentyy 28 yli 60 merkin kappaletta sekä
   * og:image. Efecto Cocuyon syöte vastasi myös 200:lla, mutta El
   * Nacional läpäisi artikkelisivutestin ensimmäisellä yrityksellä.
   */
  VEN: {
    nimi: 'El Nacional',
    kieli: 'es',
    syote: 'https://www.elnacional.com/feed/',
  },
  /*
   * KUUBA (CUB) JÄI ILMAN LÄHDETTÄ (Opus 6.9.2026) — Havannan lehti
   * näkyy siis ilman uutisosiota, eikä mikään mene rikki.
   *
   * Testattu ja hylätty: Cubadebate (syöte aukeaa ja og:image löytyy,
   * mutta sivulla ei ole <article>-elementtiä eikä
   * [itemprop="articleBody"]-merkintää — leipäteksti on
   * <section id="content">-lohkossa, jota js/uutiset.js ei lue),
   * Prensa Latina (sama vika, ja og:image on kaikissa jutuissa sama
   * yleiskuva), OnCuba ja 14ymedio (usea <article>-lohko, joista
   * ensimmäisessä ei ole yhtään kappaletta). Granma, Juventud Rebelde,
   * Escambray, Trabajadores, ACN, Radio Rebelde, CubaSí, Invasor ja
   * Vanguardia eivät vastanneet lainkaan tästä ympäristöstä.
   *
   * Päätöstä vaativa kysymys Fablelle: kelpaako Cubadebate kuvineen ja
   * syötteen kuvauksineen, vai lisätäänkö js/uutiset.js:n poimintaan
   * kolmas valitsin? Kumpikin on linjauspäätös, ei mekaaninen korjaus.
   */
  /*
   * Post-Courier on Papua-Uuden-Guinean vanhin päivälehti. Testattu
   * 6.9.2026: syötteessä kymmenen juttua, ja artikkelisivun
   * ensimmäisessä <article>-lohkossa on yli 60 merkin kappaleita sekä
   * og:image.
   *
   * The National (thenational.com.pg) kokeiltiin ensin, koska se on
   * maan toinen suuri päivälehti: sen /feed/ palauttaa 403:n
   * (botti-esto). EMTV:n syöte ohjaa toiseen osoitteeseen eikä worker
   * seuraa uudelleenohjauksia, ja looppng.com ei vastannut lainkaan
   * tästä ympäristöstä.
   */
  PNG: {
    nimi: 'Post-Courier',
    kieli: 'en',
    syote: 'https://www.postcourier.com.pg/feed/',
  },
  /*
   * The Island Sun on honiaralainen päivälehti. Testattu 6.9.2026:
   * syötteessä kymmenen juttua, ja artikkelisivun ainoassa
   * <article>-lohkossa on 24 yli 60 merkin kappaletta sekä og:image.
   *
   * Solomon Star (solomonstarnews.com) palautti syötteestä 403:n ja
   * SIBC (sibconline.com.sb) 503:n.
   */
  SLB: {
    nimi: 'The Island Sun',
    kieli: 'en',
    syote: 'https://theislandsun.com.sb/feed/',
  },
  /*
   * FIDŽI (FJI) JÄI ILMAN LÄHDETTÄ (Opus 6.9.2026) — Suvan lehti näkyy
   * siis ilman uutisosiota, eikä mikään mene rikki. Sama tilanne kuin
   * Kuuballa.
   *
   * Testattu ja hylätty: The Fiji Times (osoite
   * www.fijitimes.com.fj/feed/?post_type=post avautuu ja siinä on 20
   * juttua — pelkkä /feed/ ohjautuu etusivulle, koska Yoast on
   * kytkenyt syötteet pois — mutta artikkelisivulla ei ole
   * <article>-elementtiä eikä [itemprop="articleBody"]-merkintää),
   * FBC News (syöte aukeaa, kymmenen juttua ja og:image löytyy, mutta
   * artikkelisivulla ei ole <article>-elementtiä), Islands Business
   * (artikkelisivun ensimmäisessä <article>-lohkossa ei ole yhtään yli
   * 60 merkin kappaletta). Fiji Sun, Fijivillage ja Fijilive eivät
   * tarjonneet toimivaa RSS-osoitetta (404, HTML-sivu tai 403).
   */
  /*
   * Capital FM on nairobilainen yksityinen uutis- ja radiokanava.
   * Testattu 6.9.2026: syötteessä kymmenen juttua, ja artikkelisivun
   * ensimmäisestä <article>-lohkosta jäsentyy neljästä viiteen yli 60
   * merkin kappaletta sekä og:image.
   *
   * OSOITE ON .africa EIKÄ .co.ke TARKOITUKSELLA: capitalfm.co.ke
   * vastaa 301:llä uuteen osoitteeseen, eikä worker seuraa
   * uudelleenohjauksia.
   *
   * Testattu ja hylätty: Nation ja Taifa Leo (Cloudflaren botti-esto,
   * 403), The Standard (syöte antaa kolmekymmentä juttua, mutta
   * artikkelisivulla ei ole <article>-elementtiä eikä
   * [itemprop="articleBody"]-merkintää), Tuko (artikkelisivulla on
   * viisitoista <article>-lohkoa, joista ensimmäinen alkaa mainoksella
   * eikä jutulla), Kenyans.co.ke (ensimmäisessä <article>-lohkossa ei
   * yhtään yli 60 merkin kappaletta), The Star ja People Daily (404 ja
   * 301). KBC läpäisi molemmat testit, mutta se on valtion
   * yleisradioyhtiö, joten yksityinen Capital FM valittiin sen ohi.
   */
  KEN: {
    nimi: 'Capital FM',
    kieli: 'en',
    syote: 'https://capitalfm.africa/news/feed/',
  },
  /*
   * Global Publishers on dar es salaamilainen swahilinkielinen
   * lehtitalo. Testattu 6.9.2026: syötteessä kymmenen juttua, ja
   * artikkelisivun ainoasta <article>-lohkosta jäsentyy kahdeksasta
   * kolmeenkymmeneen yli 60 merkin kappaletta sekä og:image.
   *
   * HUOMIO FABLELLE: talo julkaisee sekä uutis- että viihdelehtiä, ja
   * syötteessä on molempia. Vaihtoehtoja ei juuri ollut: Mwananchi ja
   * The Citizen (Nation-ryhmä) ovat Cloudflaren botti-eston takana,
   * IPP Median ja Daily Newsin syötteet vastaavat 403:lla tai
   * JavaScript-haasteella, Habari Leo samoin, Millard Ayo oli poissa
   * käytöstä, ja The Chanzon sekä Jamhuri Median artikkelisivuilla ei
   * ole <article>-elementtiä lainkaan.
   */
  TZA: {
    nimi: 'Global Publishers',
    kieli: 'sw',
    syote: 'https://globalpublishers.co.tz/feed/',
  },
  /*
   * Nile Post on kampalalainen uutissivusto. Testattu 6.9.2026:
   * syötteessä kolmesataa juttua, ja artikkelisivun ainoasta
   * <article>-lohkosta jäsentyy yli kymmenen yli 60 merkin kappaletta
   * sekä og:image.
   *
   * OSOITTEESSA EI OLE LOPPUKAUTTAVIIVAA: nilepost.co.ug/feed/ vastaa
   * 301:llä osoitteeseen ilman viivaa, eikä worker seuraa
   * uudelleenohjauksia.
   *
   * Testattu ja hylätty: Daily Monitor (Cloudflaren botti-esto, 403),
   * New Vision (/rss vastaa 404:llä), The Independent (palomuurin
   * esto), The Observer (301 ilman toimivaa päätepistettä) ja
   * ChimpReports (syöte vastaa 302:lla).
   */
  UGA: {
    nimi: 'Nile Post',
    kieli: 'en',
    syote: 'https://nilepost.co.ug/feed',
  },
  /*
   * Hespress on Marokon luetuimpia uutissivustoja ja arabiankielinen.
   * Testattu 6.9.2026: syötteessä kaksitoista juttua, ja artikkelisivun
   * ensimmäisessä <article>-lohkossa on seitsemän yli 60 merkin
   * kappaletta sekä og:image. Oikealta vasemmalle kirjoitettava kieli
   * toimii ilman lisätöitä (dir="auto", v297).
   */
  MAR: {
    nimi: 'Hespress',
    kieli: 'ar',
    syote: 'https://www.hespress.com/feed',
  },
  /*
   * TSA (Tout sur l'Algérie) on ranskankielinen algerialainen
   * uutissivusto. Testattu 6.9.2026: syötteessä kymmenen juttua, ja
   * artikkelisivulla on sekä [itemprop="articleBody"] -lohko että
   * <article>, jossa on kolmetoista yli 60 merkin kappaletta, sekä
   * og:image.
   */
  DZA: {
    nimi: 'TSA',
    kieli: 'fr',
    syote: 'https://www.tsa-algerie.com/feed/',
  },
  /*
   * African Manager on tunisialainen ranskankielinen uutissivusto.
   * Testattu 6.9.2026: syötteessä sata juttua, ja artikkelisivun
   * ensimmäisessä <article>-lohkossa on leipäteksti ja og:image.
   *
   * Testattu ja hylätty: Mosaique FM (syöte aukeaa ja siinä on 40
   * juttua, mutta artikkelisivun <article>-lohko on tyhjä eikä
   * leipätekstiä saa poimittua), Kapitalis (syöte ja artikkelisivu
   * aukeavat, mutta sivun ENSIMMÄINEN <article> on 317 merkin
   * otsikkolohko — js/uutiset.js poimii juuri sen), Leaders
   * (syötteen linkit ovat http:// ja palauttavat 301, eikä worker
   * seuraa uudelleenohjauksia), Tunisie Numérique, Webmanagercenter,
   * Espace Manager ja Assabah (301/404 syötteestä), Business News ja
   * TAP (varmenneketju ei aukea tästä ympäristöstä).
   */
  TUN: {
    nimi: 'African Manager',
    kieli: 'fr',
    syote: 'https://africanmanager.com/feed/',
  },
  /*
   * Nigerian, Ghanan ja Senegalin lähteet (maalehdet NGA/GHA/SEN,
   * Opus 6.9.2026). Kaikki kolme läpäisivät MOLEMMAT testit: syöte
   * aukeaa ja artikkelisivun ensimmäisestä <article>-lohkosta jäsentyy
   * yli 60 merkin kappaleita, ja sivulla on og:image.
   *
   * Testattu ja hylätty Nigeriassa: Punch (syötteessä ei <item>-alkioita
   * lainkaan), Premium Times ja Vanguard (syöte ja og:image kunnossa,
   * mutta sivun ENSIMMÄINEN <article> on sivupalkin juttukortti, josta
   * ei jäsenny yhtään pitkää kappaletta — juuri sen js/uutiset.js
   * poimii), Guardian Nigeria, TheCable ja The Nation (403), Channels TV
   * (artikkelisivu 403). Nigerian Tribune läpäisi testit ja on varalla.
   */
  NGA: {
    nimi: 'Daily Trust',
    kieli: 'en',
    syote: 'https://dailytrust.com/feed/',
  },
  /*
   * Ghanassa hylättiin MyJoyOnline ja GBC (syöte kunnossa, mutta
   * artikkelisivulta ei jäsenny leipätekstiä), 3news (sama), Graphic
   * Online (ei og:imagea) ja GhanaWeb (syöteosoite 404). Ghanaian Times
   * läpäisi testit ja on varalla.
   */
  GHA: {
    nimi: 'Adom Online',
    kieli: 'en',
    syote: 'https://www.adomonline.com/feed/',
  },
  /*
   * Senegalissa APS eli Agence de Presse Sénégalaise oli ainoa, jonka
   * artikkelisivulta leipäteksti jäsentyy. Hylätyt: Le Soleil,
   * Dakaractu, PressAfrik ja Senego (syöte ja og:image kunnossa, mutta
   * ei <article>-lohkoa tai ei pitkiä kappaleita), Seneweb ja IGFM
   * (syöteosoite 404), Sud Quotidien (ei vastausta).
   */
  SEN: {
    nimi: 'APS',
    kieli: 'fr',
    syote: 'https://aps.sn/feed/',
  },
  /*
   * GUATEMALA, NICARAGUA JA PANAMA (Opus 6.9.2026, maalehtierä
   * GTM+NIC+PAN). Jokainen lähde on testattu kahdesti kuten resepti
   * vaatii: ensin syöte, sitten yksi artikkelisivu.
   *
   * La Hora on guatemalalainen päivälehti vuodesta 1920. Syötteessä oli
   * testihetkellä 12 saman päivän juttua, ja artikkelisivulta löytyivät
   * sekä <article>-lohko (53 yli 60 merkin kappaletta) että og:image.
   * Prensa Libre kokeiltiin ensin: sen syöte aukeaa ja siinä on 99
   * juttua, mutta artikkelisivulla ei ole <article>-elementtiä eikä
   * [itemprop="articleBody"]-merkintää, joten popup jäisi tyhjäksi.
   * Soy502:n rss.xml palauttaa HTML-sivun.
   */
  GTM: {
    nimi: 'La Hora',
    kieli: 'es',
    syote: 'https://lahora.gt/feed/',
  },
  /*
   * Confidencial on nicaragualainen uutissivusto. Syötteessä oli 62
   * juttua, ja artikkelisivulla on <article>-lohko (31 yli 60 merkin
   * kappaletta) ja og:image. HUOM: syöte on osoitteessa
   * www.confidencial.digital mutta artikkelilinkit osoittavat
   * isäntänimeen confidencial.digital ilman www:tä, joten workerin
   * sallittujen listalla on molemmat. La Prensan (laprensani.com)
   * syöte palautti 403:n.
   */
  NIC: {
    nimi: 'Confidencial',
    kieli: 'es',
    syote: 'https://www.confidencial.digital/feed/',
  },
  /*
   * Panamá América on panamalainen päivälehti. Syöte on lyhyt (kuusi
   * juttua), mutta se jäsentyy, ja artikkelisivulla on <article>-lohko
   * (kahdeksan yli 60 merkin kappaletta) ja og:image. La Prensan
   * (prensa.com) /feed/ palauttaa HTML-sivun, TVN:n ja La Estrellan
   * osaston rss-osoitteet 404:n.
   */
  PAN: {
    nimi: 'Panamá América',
    kieli: 'es',
    syote: 'https://www.panamaamerica.com.pa/rss.xml',
  },
  /*
   * Radio Dabanga on sudanilaisten toimittajien tekemä uutispalvelu,
   * joka julkaisee arabiaksi ja englanniksi. Testattu 6.9.2026:
   * englanninkielisessä syötteessä kaksitoista juttua, ja
   * artikkelisivun ensimmäisessä <article>-lohkossa on yksitoista yli
   * 60 merkin kappaletta sekä og:image. Arabiankielisen osaston syöte
   * (/ar/all-news/feed) palautti nolla juttua, joten kieleksi jäi en.
   *
   * Testattu ja hylätty: Sudan Tribune (sudantribune.com/feed/) ja
   * Al-Rakoba (alrakoba.net/feed/) palauttavat 403:n Cloudflaren
   * botti-estosta, ja Sudanow Magazinen /feed/ ohjaa etusivulle.
   */
  SDN: {
    nimi: 'Radio Dabanga',
    kieli: 'en',
    syote: 'https://www.dabangasudan.org/en/all-news/feed',
  },
  /*
   * Radio Tamazuj lähettää Etelä-Sudaniin ja julkaisee verkossa
   * englanniksi ja arabiaksi. Testattu 6.9.2026: syötteessä
   * kaksitoista juttua, ja artikkelisivun <article>-lohkossa on 27 yli
   * 60 merkin kappaletta sekä og:image. Syötteen osoite /en/rss ohjaa
   * osoitteeseen /en/feed, eikä worker seuraa uudelleenohjauksia —
   * siksi taulussa on suoraan lopullinen osoite.
   *
   * Testattu ja hylätty: Eye Radio (eyeradio.org/feed/) ja Sudans Post
   * (sudanspost.com/feed/) — molempien syöte aukeaa, mutta
   * artikkelisivulla ei ole <article>-elementtiä eikä
   * [itemprop="articleBody"]-merkintää.
   */
  SDS: {
    nimi: 'Radio Tamazuj',
    kieli: 'en',
    syote: 'https://www.radiotamazuj.org/en/feed',
  },
  /*
   * ETIOPIA (ETH) JÄI ILMAN LÄHDETTÄ (Opus 6.9.2026) — Addis Abeban ja
   * Lalibelan lehdissä ei siis näy uutisosiota, eikä mikään mene
   * rikki. Sama tilanne kuin Kuuballa ja Fidžillä.
   *
   * Testattu ja hylätty: Fana Media Corporation (www.fanamc.com/feed,
   * amharankielinen syöte, kymmenen juttua) — artikkelisivulla on
   * <article>-lohko, mutta leipäteksti ei ole <p>-elementeissä, joten
   * poiminta jäisi tyhjäksi; Addis Fortune (addisfortune.news/feed) ja
   * New Business Ethiopia — syöte aukeaa, mutta artikkelisivulta
   * puuttuu <article> tai og:image; Addis Standard, Ethiopian Reporter
   * ja The Reporter Ethiopia palauttavat 403:n tai captchan; ENA, EBC,
   * Walta, Addis Zeybe, Shega ja Borkena eivät tarjonneet toimivaa
   * RSS-osoitetta.
   */
  /*
   * Hong Kong Free Press on hongkongilainen riippumaton uutissivusto.
   * Testattu 6.9.2026: syötteessä kolmekymmentä juttua, ja
   * artikkelisivun <article>-lohkosta jäsentyy 19–33 yli 60 merkin
   * kappaletta sekä og:image (kaksi eri artikkelia testattu).
   *
   * KIELI ON ENGLANTI EIKÄ KANTONI, JA SIIHEN ON SYY. Englanti on
   * Hongkongin toinen virallinen kieli, mutta kiinankielistä lähdettä
   * etsittiin ensin yhdestätoista paikasta eikä yksikään läpäissyt
   * molempia testejä: RTHK (rthk9.rthk.hk, syöte aukeaa, mutta
   * artikkelisivulla ei ole <article>-elementtiä eikä
   * [itemprop="articleBody"]-merkintää) ja Bastille Post
   * (bastillepost.com/hongkong/feed, syöte aukeaa kymmenellä jutulla,
   * artikkelisivulla ei <article>-elementtiä); Ming Pao ja HKET
   * vastaavat 403:lla; HK01, am730, Sing Tao / stheadline, Wen Wei Po,
   * Ta Kung Pao, on.cc ja HKCNews eivät tarjonneet toimivaa
   * RSS-osoitetta. SCMP läpäisi molemmat testit, mutta sen
   * <article>-lohkon toinen kappale on lähes 28 000 merkin CSS-lohko,
   * joka päätyisi sellaisenaan popupiin — siksi se hylättiin.
   */
  HKG: {
    nimi: 'Hong Kong Free Press',
    kieli: 'en',
    syote: 'https://hongkongfp.com/feed/',
  },
  /*
   * Myanmar Now on burmankielinen uutissivusto, ja sen burmankielinen
   * osasto on osoitteessa myanmar-now.org/mm/. Testattu 6.9.2026:
   * syötteessä kymmenen juttua, ja artikkelisivun ainoasta
   * <article>-lohkosta jäsentyy 18–24 yli 60 merkin kappaletta sekä
   * og:image. Syötteen osoitteen LOPPUKAUTTAVIIVA ON PAKOLLINEN:
   * ilman sitä palvelin vastaa 301:llä eikä worker seuraa
   * uudelleenohjauksia.
   *
   * Testattu ja hylätty: Eleven Media (news-eleven.com/rss.xml vastaa
   * 200:lla mutta syötteessä ei ole yhtään <item>-alkiota, ja
   * /feed on 404), The Irrawaddy ja Mizzima (Cloudflaren botti-esto,
   * 403 tai captcha sekä englannin- että burmankielisissä
   * osastoissa), DVB (www.dvb.no/feed ja burmese.dvb.no/feed ohjaavat
   * 301:llä etusivulle eivätkä syötteeseen), Khit Thit ja Yangon Khit
   * Thit (yhteys katkeaa TLS-kättelyssä).
   */
  MMR: {
    nimi: 'Myanmar Now',
    kieli: 'my',
    syote: 'https://myanmar-now.org/mm/feed/',
  },
  /*
   * Ada Derana on colombolainen uutissivusto, jolla on erilliset
   * sinhalan-, tamilin- ja englanninkieliset toimitukset.
   * Sinhalankielinen syöte on paikalliskielinen, ja se valittiin
   * englanninkielisen ohi maalehtiohjeen mukaisesti. Testattu
   * 6.9.2026: syötteessä 25 juttua, ja artikkelisivun ainoasta
   * <article>-lohkosta jäsentyi viidestä yhdeksään yli 60 merkin
   * kappaletta sekä og:image (kaksi eri juttua testattu).
   *
   * OSOITE ON rss.xml EIKÄ rss.php: vanha rss.php vastaa 301:llä
   * uuteen osoitteeseen, eikä worker seuraa uudelleenohjauksia. Samasta
   * syystä isäntänimi on sinhala.adaderana.lk — adaderana.lk ja
   * www.adaderana.lk ohjaavat molemmat eteenpäin.
   *
   * Testattu ja hylätty: Daily Mirror (dailymirror.lk/rss, Cloudflaren
   * botti-esto, 403) ja Hiru News (hirunews.lk/rss.php, 404).
   */
  LKA: {
    nimi: 'Ada Derana',
    kieli: 'si',
    syote: 'https://sinhala.adaderana.lk/rss.xml',
  },
  /*
   * NAMIBIA (NAM). New Era on windhoekilainen englanninkielinen
   * päivälehti. Testattu 6.9.2026: syötteessä kymmenen juttua, ja
   * artikkelisivun ensimmäisestä <article>-lohkosta jäsentyy
   * seitsemästä kahdeksaantoista yli 60 merkin kappaletta sekä
   * og:image (kokeiltu kahdella eri jutulla).
   *
   * MIKSI ENGLANTI: englanti on Namibian ainoa virallinen kieli,
   * vaikka vain 2,3 prosenttia puhuu sitä kotikielenään (oshiwambo
   * 49,7 %). Yhtään päivälehteä ei ilmesty oshiwamboksi.
   *
   * Testattu ja hylätty: The Namibian (maan luetuin lehti,
   * namibian.com.na/feed/ — syöte aukeaa ja og:image löytyy, mutta
   * sivun ENSIMMÄINEN <article> on sivupalkin juttukortti, josta ei
   * jäsenny yhtään yli 60 merkin kappaletta, ja juuri sen js/uutiset.js
   * poimii); Namibian Sun ja Republikein (sama julkaisujärjestelmä:
   * /rss palauttaa HTML-sivun); Allgemeine Zeitung (saksankielinen,
   * sama järjestelmä — /rss on hakemistosivu, jonka takana on vain
   * aihekohtaisia /rssFeed/-nnn-osoitteita); Windhoek Observer
   * (observer24.com.na/feed/ — syöte ja leipäteksti jäsentyvät, mutta
   * testatulla artikkelisivulla ei ollut og:imagea); Informanté
   * (yhteys katkeaa); The Brief (403); NBC (ei RSS-osoitetta).
   */
  NAM: {
    nimi: 'New Era',
    kieli: 'en',
    syote: 'https://neweralive.na/feed/',
  },
  /*
   * DataCameroon on doualalainen ranskankielinen datajournalismin
   * toimitus. Testattu 6.9.2026: syötteessä kymmenen juttua, ja
   * artikkelisivun ainoasta <article>-lohkosta jäsentyy seitsemästä
   * kahdeksaan yli 60 merkin kappaletta sekä og:image (testattu kaksi
   * eri artikkelia). Ranska on maan kahdesta virallisesta kielestä
   * puhutumpi, joten se valittiin englannin edelle.
   *
   * Testattu ja hylätty: Actu Cameroun (syötteessä kaksikymmentä
   * juttua, mutta artikkelisivulla ei ole <article>-elementtiä,
   * [itemprop="articleBody"]-merkintää eikä og:imagea), Camer.be
   * (syöte antaa kaksikymmentä juttua ja og:image löytyy, mutta sivun
   * 64 <article>-lohkosta ensimmäisessä ei ole yhtään yli 60 merkin
   * kappaletta), Mimi Mefo Info ja Investir au Cameroun (syöte ja
   * og:image kunnossa, mutta artikkelisivulla ei <article>-elementtiä),
   * 237actu (artikkelisivun ensimmäisessä <article>-lohkossa ei
   * kappaleita eikä sivulla og:imagea), CamerounWeb ja StopBlaBlaCam
   * (syöte aukeaa mutta on tyhjä), Journal du Cameroun ja Cameroon
   * Tribune (yhteys ei aukea lainkaan), Cameroon-Info.Net (522), The
   * Guardian Post (404) sekä CRTV ja Le Bled Parle (301/308 eikä
   * worker seuraa uudelleenohjauksia).
   */
  CMR: {
    nimi: 'DataCameroon',
    kieli: 'fr',
    syote: 'https://datacameroon.com/feed/',
  },
  /*
   * SAINT HELENAN (SHN) LÄHDE ON SAAREN HALLINNON OMA UUTISSYÖTE, EI
   * LEHTITALO (Opus 6.9.2026), ja syy on kirjattava: saarella asuu
   * 4 439 ihmistä ja molemmat viikkolehdet ovat käytännössä
   * saavuttamattomissa.
   *
   * Testattu 6.9.2026: syötteessä kymmenen juttua, tuorein samalta
   * viikolta, ja artikkelisivun ainoasta <article>-lohkosta jäsentyy
   * viisi yli 60 merkin kappaletta sekä og:image (saaren vaakuna).
   * Jutut ovat tiedotteita — säävaroituksia, tiepätkien sulkuja,
   * kuvernöörin virkaanastujaisia — eli juuri sitä, mistä pienen
   * saaren uutiset koostuvat.
   *
   * Testattu ja hylätty: The Sentinel / South Atlantic Media Services
   * (www.sams.sh/feed/) — syöte aukeaa, mutta sen tuorein juttu on
   * lokakuulta 2024 ja sisältö on radiokanavan omaa tiedotusta;
   * varsinainen viikkolehti julkaistaan vain PDF-latauksena. The St
   * Helena Independent (www.independent.sh/feed/) vastaa 500:lla
   * ("Database Error"). Saint Helena Island Info
   * (sainthelenaisland.info) on staattinen hakemistosivusto, jolla ei
   * ole syötettä lainkaan.
   */
  SHN: {
    nimi: 'St Helena Government',
    kieli: 'en',
    syote: 'https://www.sainthelena.gov.sh/feed/',
  },
  /*
   * Radio Okapi on maan laajimmalle kuuluva radioasema ja yksi sen
   * luetuimmista uutissivustoista; se toimii YK:n Kongon-operaation ja
   * sveitsiläisen Fondation Hirondellen yhteistyönä ja julkaisee
   * ranskaksi. Testattu 6.9.2026: syötteessä viisikymmentä juttua, ja
   * artikkelisivun ainoasta <article>-lohkosta jäsentyy kahdeksan yli 60
   * merkin kappaletta sekä og:image.
   *
   * Testattu ja hylätty: Actualite.cd (syöte aukeaa, kymmenen juttua,
   * mutta artikkelisivun <article>-lohko sisältää vain otsikon —
   * leipäteksti on sen ulkopuolisessa div-lohkossa, joten popupiin ei
   * jäisi yhtään kappaletta), 7sur7.cd ja Mediacongo (ei toimivaa
   * RSS-osoitetta: 404), Politico.cd (syöteosoite vastaa 301:llä eikä
   * worker seuraa uudelleenohjauksia). Zoom Eco ja La Prunelle RDC
   * tarjoavat toimivan syötteen, mutta ne ovat selvästi pienempiä
   * julkaisuja kuin valittu lähde.
   */
  COD: {
    nimi: 'Radio Okapi',
    kieli: 'fr',
    syote: 'https://www.radiookapi.net/feed',
  },
  /*
   * Onlinekhabar on Nepalin luetuimpia verkkolehtiä ja julkaisee
   * nepaliksi. Testattu 6.9.2026: syötteessä 55 juttua, ja
   * artikkelisivulla on täsmälleen yksi <article>-lohko, josta
   * jäsentyy 30–58 yli 60 merkin kappaletta sekä og:image.
   *
   * HUOMIO FABLELLE: pieni osa jutuista (osa urheilu- ja kuvajutuista)
   * on eri pohjalla, jossa <article>-elementtiä ei ole lainkaan —
   * yhdeksästä testatusta artikkelista kahdeksassa lohko oli. Niissä
   * popup näyttää syötteen kuvauksen, eikä mikään mene rikki.
   *
   * Testattu ja hylätty: ekantipur.com/rss (Kantipur, maan suurin
   * lehtitalo) palauttaa RSS:n sijaan HTML-sivun; Setopati (syöte
   * viisi juttua) ja Ratopati (kolmekymmentä juttua) — molempien syöte
   * aukeaa, mutta artikkelisivulla ei ole <article>-elementtiä eikä
   * [itemprop="articleBody"]-merkintää; Nagarik News ja Khabarhub
   * läpäisevät molemmat testit, mutta niiden artikkelisivulla on
   * viisi ja kaksi <article>-lohkoa, joista ensimmäinen ei ole itse
   * juttu — Onlinekhabarin yksi lohko on siksi turvallisin.
   * Khabarhubin syöte on lisäksi ilman www:tä, eikä worker seuraa
   * uudelleenohjauksia.
   */
  NPL: {
    nimi: 'Onlinekhabar',
    kieli: 'ne',
    syote: 'https://www.onlinekhabar.com/feed',
  },
  /*
   * L'Express de Madagascar on saaren luetuimpia päivälehtiä. Testattu
   * 6.9.2026: Blogger-syötteessä (feeds/posts/default?alt=rss) 25
   * juttua, ja artikkelisivun ensimmäisestä <article>-lohkosta jäsentyy
   * yhdeksän yli 60 merkin kappaletta sekä og:image. Syöte ja
   * artikkelisivut ovat samalla isäntänimellä.
   *
   * MALAGASSINKIELISTÄ LÄHDETTÄ EI LÖYTYNYT, vaikka paikalliskielinen
   * olisi ensisijainen. Testattu ja hylätty: newsmada.com/feed/
   * (malagassinkielinen, viisi juttua, artikkelisivun <article>-lohkosta
   * jäsentyy kolme yli 60 merkin kappaletta — mutta sivulla ei ole
   * yhtään og-merkintää, joten popupin kuva jäisi puuttumaan);
   * 2424.mg/feed/ (ranska, syöte kunnossa, mutta sivun ensimmäinen
   * <article> on sivupalkin juttukortti ilman kappaleita — sama vika
   * kuin Nigerian hylätyissä); madagascar-tribune.com (syöte ja
   * og:image kunnossa, mutta artikkelisivulta puuttuvat sekä <article>
   * että [itemprop="articleBody"]); midi-madagasikara.mg (Sucurin
   * palomuuri, 403); gazetiko.mg, aoraha.com, inonanovaovao.com,
   * gasikara.mg ja tvplus.mg (ei nimipalveluvastausta tai yhteys
   * katkeaa); sobika.com/feed/ (ohjaa mainossivulle).
   */
  MDG: {
    nimi: 'L\'Express de Madagascar',
    kieli: 'fr',
    syote: 'https://www.lexpress.mg/feeds/posts/default?alt=rss',
  },
  /*
   * Sierraloaded on Freetownissa toimiva verkkolehti ja maan
   * luetuimpia uutissivustoja. Testattu 6.9.2026: syötteessä kymmenen
   * juttua, ja artikkelisivun ensimmäisestä <article>-lohkosta jäsentyy
   * viisitoista yli 60 merkin kappaletta sekä og:image. Syöte ja
   * artikkelisivut ovat samalla isäntänimellä.
   *
   * Testattu ja hylätty: Awoko (awokonewspaper.sl:n varmenne ei vastaa
   * isäntänimeä, joten yhteys ei aukea), Politico SL
   * (www.politicosl.com/feed vastaa 404:lla), Concord Times
   * (slconcordtimes.com/feed ohjaa 302:lla etusivulle eikä worker seuraa
   * uudelleenohjauksia), Standard Times Press (404) ja Sierra Leone
   * Times (403). Sierra Leone Telegraphin ja AYV Newsin syötteet
   * aukesivat molemmat, mutta Sierraloaded valittiin, koska se on
   * näistä luetuin ja sen artikkelisivun rakenne on selkein.
   */
  SLE: {
    nimi: 'Sierraloaded',
    kieli: 'en',
    syote: 'https://sierraloaded.sl/feed/',
  },
  /*
   * NUR.KZ on Kazakstanin luetuimpia uutissivustoja, ja sillä on oma
   * kazakinkielinen laitos osoitteessa kaz.nur.kz — siksi taulussa on
   * se eikä venäjänkielinen www.nur.kz, jonka syöte toimii yhtä hyvin.
   * Testattu 6.9.2026: syötteessä viisikymmentä juttua, ja
   * artikkelisivun <article>-lohkosta jäsentyy kymmenen yli 60 merkin
   * kappaletta sekä og:image; toinen artikkelisivu tarkistettiin
   * erikseen. MyMemory kääntää kieliparin kk|fi.
   *
   * Testattu ja hylätty: Egemen Qazaqstan (egemen.kz/rss, viisikymmentä
   * juttua) ja Kazinformin kazakinkielinen syöte
   * (kaz.inform.kz/rss/kz.xml, kaksisataa juttua) — molempien syöte
   * aukeaa, mutta artikkelisivulla ei ole <article>-elementtiä eikä
   * [itemprop="articleBody"]-merkintää, joten popupiin jäisi vain
   * syötteen parin lauseen kuvaus; sama vika on Jas Qazaqilla
   * (jasqazaq.kz/feed/) ja Ordalla (orda.kz/feed/). Tengrinewsin,
   * Zakon.kz:n, Liter.kz:n, Kazpravdan, Aikynin, Ulysmedian,
   * Turkystanin, Qazaquni.kz:n, 24.kz:n, Baq.kz:n, Abai.kz:n ja
   * El.kz:n RSS-osoitteet vastaavat 404:llä tai ohjaavat etusivulle,
   * ja Informburo antaa 403:n. Sputnik Kazakstan jätettiin pois
   * lähdeperiaatteen takia (valtiollinen media, sama linjaus kuin
   * Vesti FM:n poistossa, ks. js/packs/radiot.js).
   */
  KAZ: {
    nimi: 'NUR.KZ',
    kieli: 'kk',
    syote: 'https://kaz.nur.kz/rss/all.rss',
  },
  /*
   * TOLOnews on Afganistanin katsotuin uutiskanava, ja sillä on omat
   * syötteet darin, pashtun ja englannin kielillä. Taulussa on
   * DARINKIELINEN syöte (kieli 'fa'), koska paikalliskielinen lähde on
   * ensisijainen ja dari on maan lingua franca; oikealta vasemmalle
   * kirjoitettava teksti toimii ilman lisätöitä (dir="auto" on
   * koodissa v297:stä alkaen).
   *
   * Testattu 6.9.2026: syötteessä kolmekymmentä juttua, ja
   * artikkelisivun <article>-lohkosta jäsentyy 15–23 yli 60 merkin
   * kappaletta sekä og:image. Osoitteessa ei ole www-etuliitettä eikä
   * uudelleenohjausta, joten workerin SALLITUT-rivi on
   * https://tolonews.com/.
   *
   * Testattu ja hylätty: Pajhwok Afghan News (feed vastaa 410 Gone),
   * Khaama Press (captcha-uudelleenohjaus heti syötteessä), Ariana
   * News (Sucuri-palomuuri, 403) ja Hasht-e Subh eli 8am.media (syöte
   * aukeaa mutta on tyhjä, ei yhtään <item>-alkiota).
   */
  AFG: {
    nimi: 'TOLOnews',
    kieli: 'fa',
    syote: 'https://tolonews.com/fa/rss.xml',
  },
  /*
   * SINGAPORE (SGP), Opus-lehtiagentti 6.9.2026. CNA on Mediacorpin
   * uutiskanava ja maan luetuimpia uutissivustoja; syöte on sen
   * Singapore-osasto. Testattu 6.9.2026: syötteestä jäsentyy
   * kaksitoista juttua, ja kolmesta eri artikkelisivusta poimittiin
   * <article>-lohkosta 10, 19 ja 47 yli 60 merkin kappaletta sekä
   * og:image joka kerta.
   *
   * KIELI ON ENGLANTI TARKOITUKSELLA: se on Singaporen neljästä
   * virallisesta kielestä se, jolla asiat hoituvat.
   *
   * Testattu ja hylätty: The Straits Times
   * (straitstimes.com/news/singapore/rss.xml) läpäisi syötetestin (44
   * juttua) ja ensimmäisen artikkelin (14 kappaletta), mutta toisella
   * kokeillulla artikkelisivulla ei ollut <article>-elementtiä eikä
   * [itemprop="articleBody"]-merkintää lainkaan; Berita Harian
   * (malaiji) läpäisi syötetestin mutta artikkelisivulla on vain
   * og:image eikä yhtään <article>-elementtiä; Zaobaon (kiina)
   * kokeillut RSS-osoitteet vastaavat 404:llä. Tamil Murasu (tamili,
   * tamilmurasu.com.sg/rss.xml) läpäisi molemmat testit ja jää
   * varalähteeksi.
   */
  SGP: {
    nimi: 'CNA',
    kieli: 'en',
    syote: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=10416',
  },
};
