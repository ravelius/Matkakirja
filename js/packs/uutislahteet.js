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
};

/*
 * Maan tv-kanava (omistajan toive 5.8.2026): maaosaston mediarivillä
 * on radion vieressä nappi, josta aukeaa maan uutiskanavan suora
 * lähetys popup-ikkunaan. Upotus on YouTuben kanavaupotus
 * (live_stream?channel=...): se seuraa aina kanavan kulloistakin
 * suoraa lähetystä, joten yksittäisen lähetyksen tunniste ei vanhene.
 * Ei tarvitse workeria eikä avaimia.
 *
 * Italiassa yleisradio Rai ei lähetä YouTubeen. Sky TG24 kokeiltiin
 * ensin, mutta sen striimi ei näkynyt Suomesta (YouTuben aluerajaus
 * on kanavan oma valinta) — euronews italiano lähettää italiaksi
 * maailmanlaajuisesti ilman aluerajauksia (todettu 5.8.2026).
 */
export const TV_KANAVAT = {
  /*
   * BRITANNIALLA EI OLE TV-NAPPIA (v347).
   *
   * Sky Newsin YouTube-live poistettiin omistajan päätöksen mukaisesti
   * ("livet eivät näytä oikein toimivan", 7.8.2026): tilalle piti tulla
   * tallenne, kuten Saksassa. Korvaajaa ei löytynyt. BBC:n
   * video-RSS on poistettu käytöstä (404, tarkistettu 7.8.2026), ja
   * BBC:n oma videoputki vaatii allekirjoitetut osoitteet eikä anna
   * suoraa mp4:ää. Sky Newsin ja Channel 4:n syötteissä on vain
   * kuvaliitteitä (image/jpeg), ei videota.
   *
   * Ohje on tässä tilanteessa yksiselitteinen: tv jätetään pois eikä
   * palata YouTube-liveen. Lehti toimii ilman — radio ja uutiset
   * jäävät ennalleen. Jos BBC joskus avaa mp4-rajapinnan, tähän
   * kirjoitetaan tallenteet DEU:n malliin.
   */
  /*
   * EGYPTILLÄ EI OLE TV-NAPPIA (v348), samasta syystä kuin
   * Britannialla: Al Qahera Newsin YouTube-live poistettiin omistajan
   * päätöksen mukaisesti, eikä tallennetta löytynyt tilalle. Youm7:n
   * videosyöte ohjaa 403:een ja Egypt Todayn syöte on botti-eston
   * takana; avointa mp4-rajapintaa ei ole (tarkistettu 7.8.2026).
   */
  /*
   * ITALIALLA JA ESPANJALLA EI OLE TV-NAPPIA (v356).
   *
   * Omistajan päätös 8.8.2026: livelähetyksistä luovutaan kokonaan,
   * myös Italian ja Espanjan osalta. Ne olivat viimeiset kaksi
   * YouTube-livea (euronews italiano ja RTVE Noticias) ja poistuivat
   * samalla päätöksellä kuin Britannian ja Egyptin omat aikanaan.
   *
   * Syy on sama kuin alun perin: live ei näytä laitteissa
   * luotettavasti oikein, ja nappi joka joskus toimii ja joskus ei on
   * huonompi kuin ei nappia lainkaan.
   *
   * Tilalle etsitään Saksan mallin mukaisia uutistallenteita (avoin
   * mp4, CORS sallittu). Jos sellaista ei löydy, maa jää ilman
   * tv-nappia — se on hyväksytty lopputulos, ei puute.
   */
  /*
   * Tallenteet suoran lähetyksen sijaan (omistajan päätös 7.8.2026:
   * "Live TV-lähetykset eivät näytä oikein toimivan. Ne voisi vaihtaa
   * johonkin yhteen tai kahteen videoklippiin. ... voisi koittaa
   * etsiä, saako pääuutislähetystä katsottua jälkikäteen.").
   *
   * tagesschaun avoin rajapinta listaa tuoreimmat lähetykset suorina
   * mp4-osoitteina (h264) — video-elementti soittaa ne kaikilla
   * laitteilla ilman YouTubea, ja CORS sallii haun suoraan selaimesta
   * (tarkistettu 7.8.2026). Kanava-arvo on rajapinnan channels-listan
   * title-kenttä täsmälleen.
   */
  DEU: {
    nimi: 'tagesschau',
    tallenteet: {
      api: 'https://www.tagesschau.de/api2u/channels',
      valinnat: [
        { nappi: 'Uutiset 100 sekunnissa', kanava: 'tagesschau in 100 Sekunden' },
        { nappi: 'Päälähetys klo 20', kanava: 'tagesschau' },
      ],
    },
  },
  /*
   * RUOTSILLA EI OLE TV-NAPPIA (kartoitettu 8.8.2026).
   *
   * SVT olisi muuten kelvollinen: `https://api.svt.se/video/<id>`
   * vastaa CORS `*`:lla, eikä sisältö ole suojattua tai rajattua
   * (`drmCopyProtection: false`, `geoBlockedSweden: false`,
   * `preventExternalEmbed: false`, osoitteessa jopa `/world/`-polku).
   *
   * Este on muoto: videoReferences tarjoaa yksitoista muunnosta, ja
   * jokainen niistä on HLS tai DASH — mp4:ää ei ole yhtään. HLS soi
   * natiivisti vain Safarissa ja iOS:ssä; Chrome ja Firefox
   * vaatisivat hls.js-kirjaston, ja sen lisääminen on oma
   * päätöksensä (voidaan avata myöhemmin). Nappi, joka toimii
   * puolella laitteista, on huonompi kuin ei nappia.
   *
   * Toinen puute: tuoreimmalle Rapport-lähetykselle ei löytynyt
   * rajapintaa, vaan id on kaivettava svt.se:n artikkelisivun
   * HTML:stä — se ei ole tagesschaun kaltainen siisti lista.
   */
  /*
   * ITALIALLA EI OLE TV-NAPPIA (kartoitettu 8.8.2026, omistajan
   * päätös: ei jatkohakua RAI:n ulkopuolelta).
   *
   * RAI:n video tulee relinkerin kautta
   * (`mediapolisvod.rai.it/relinker/relinkerServlet.htm?cont=<token>`),
   * ja siinä on kolme estettä, joista jokainen yksin riittäisi:
   *
   * 1. Vastaus on XML, jonka sisällä on m3u8 — ei mp4:ää.
   * 2. Osoitteessa on Akamai-token (`hdnea=st=…~exp=…`), jonka
   *    voimassaolo oli mitattuna noin 150 sekuntia. Peliin ei voi
   *    kirjoittaa osoitetta, joka vanhenee kahdessa minuutissa.
   * 3. Relinker ei palauta `access-control-allow-origin`-otsaketta
   *    lainkaan, joten selain ei saa hakea sitä pelin origonista.
   *
   * Lisäksi `cont`-arvo on obfuskoitu merkkijono, joka on kaivettava
   * sivun HTML:stä, eikä rainews.it:n JSON-polku anna mp4:ää.
   */
  /*
   * RTVE:n tallenteet (8.8.2026). Espanja on Saksan jälkeen toinen
   * maa, jolla on tv-nappi — ja samasta syystä: lähetys saadaan
   * oikeana mp4-tiedostona, ei upotuksena.
   *
   * Haku menee ohjelman videolistaan (`api.rtve.es`, CORS `*`, uusin
   * ensin), josta poimitaan tuoreimman jakson id. Tallenne on
   * osoitteessa `ztnr.rtve.es/ztnr/<id>.mp4`.
   *
   * SE OSOITE EI MENE SELLAISENAAN VIDEO-ELEMENTTIIN: ztnr ohjaa
   * `http://`-osoitteeseen, ja https:llä tarjoiltavassa pelissä se
   * olisi sekasisältöä (mitattu; Origin-, Referer- eikä
   * Upgrade-Insecure-Requests-otsake ei muuta sitä). Ohjaus
   * selvitetään siksi workerissa, joka palauttaa saman osoitteen
   * https:nä — ks. `?ohjaus=`-reitti tools/uutisproxy/worker.js:ssä.
   * Video itse tulee suoraan RTVE:ltä selaimeen; worker välittää vain
   * osoitteen.
   *
   * SÄÄ ON ENSIMMÄISENÄ TARKOITUKSELLA (omistajan päätös 8.8.2026):
   * se on alle minuutin mittainen, kuvassa on Espanjan kartta eikä
   * uutisaiheita, ja lehden avaava lapsi saa sen oletuksena. Kooste
   * on toinen valinta samalla perusteella kuin tagesschau Saksassa.
   *
   * `kanava` on tässä otsikon tunnistin, ei kanavan nimi: RTVE nimeää
   * saman ohjelman kahdella tavalla ("Telediario Matinal en 4'" ja
   * "Telediario matinal en cuatro minutos"), joten molemmat on
   * lueteltava pystyviivalla erotettuna. Ks. haeTallenne
   * (js/uutiset.js).
   *
   * MITATTU 410 GONE, JA MIKSI SE EI ESTÄ TÄTÄ: mediapalvelin vastaa
   * `410 Gone`, jos samasta osoitteesta haetaan monta tallennetta
   * peräkkäin — kokeessa 17 jaksoa putkeen tuotti täsmälleen yhden
   * onnistumisen. Yksittäisinä, tauon päässä toisistaan tehtyinä
   * hakuina ketju antaa aina 206:n ja oikeat mp4-tavut
   * (`ftypisom…moov`), myös workerin kautta. Rajoitus on siis
   * ryöppysuoja, ja pelin käyttö on juuri päinvastaista: yksi
   * napinpainallus kerrallaan. Jos haku silti epäonnistuu, nappi
   * kertoo sen ("Ei saatu haettua") eikä jää mustaksi ruuduksi.
   */
  ESP: {
    nimi: 'RTVE',
    tallenteet: {
      api: 'https://api.rtve.es/api/programas/135931/videos.json?size=20',
      valinnat: [
        { nappi: 'Sää tänään', kanava: 'el tiempo' },
        { nappi: 'Uutiset neljässä minuutissa', kanava: "en 4'|cuatro minutos" },
      ],
    },
  },
  /*
   * SVEITSI — SRF Tagesschau (kartoitettu ja mitattu 9.8.2026).
   *
   * Kolmas maa Saksan ja Espanjan jälkeen, ja samasta syystä: lähetys
   * saadaan oikeana mp4-tiedostona, ei upotuksena. Reitti on julkinen
   * eikä vaadi avainta:
   *   1. videos-by-show-id (CORS *) listaa tuoreimmat Tagesschau-jaksot
   *      → poimitaan uusimman urn.
   *   2. SRG:n integration layer mediaComposition byUrn (CORS *) antaa
   *      resourceList-taulussa suoran progressiivisen H264-mp4:n
   *      (protocol HTTP). Osoite tulee http:nä, mutta pelkkä skeeman
   *      vaihto https:ksi tuottaa 206:n ja oikeat ftyp-tavut (mitattu),
   *      joten workeria ei tarvita kuten RTVE:llä. Ks. haeTallenne
   *      (js/uutiset.js) SRF-haara.
   */
  CHE: {
    nimi: 'SRF',
    tallenteet: {
      api: 'https://www.srf.ch/play/v3/api/srf/production/videos-by-show-id?showId=ff969c14-c5a7-44ab-ab72-14d4c9e427a9&pageSize=1',
      valinnat: [
        { nappi: 'Tagesschau', kanava: 'srf' },
      ],
    },
  },
  /*
   * VIRO — ERR Aktuaalne kaamera (kartoitettu ja mitattu 9.8.2026).
   *
   * Puhtain löytö: ERR:n oma julkinen Jupiter-rajapinta antaa yhdellä
   * haulla suoran mp4:n. getContentPageData-vastauksen mainContent on
   * sarjan tuorein jakso, ja medias[0].src.file on suora
   * //vod.err.ee/file/…​.mp4 (CORS *, ftyp isom/h264, ei tokenia — API
   * kertoo itse drm:false, geoBlock:false). Skeema lisätään
   * (//→https:) haeTallenteessa. Kanava-kenttää ei tarvita: lähde on
   * yksi sarja.
   */
  EST: {
    nimi: 'ERR',
    tallenteet: {
      api: 'https://services.err.ee/api/v2/vodContent/getContentPageData?contentId=1038278',
      valinnat: [
        { nappi: 'Aktuaalne kaamera', kanava: 'err' },
      ],
    },
  },
};
