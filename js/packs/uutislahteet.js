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
};
