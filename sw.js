// Palvelutyöntekijä: pelin tiedostot välimuistiin, jotta sovellus toimii myös offline.
const CACHE = 'matkakirja-2026-08-09.1313';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  // Fokusmoodin annostelukortti lataa oman tyylinsä itse (js/fokusvirta.js).
  './css/fokusvirta.css',
  './css/fokuskohteet.css',
  './css/fokusnosto.css',
  // Sähkepinta lataa oman tyylinsä itse (js/sahke.js).
  './css/sahke.css',
  './js/muutokset.js',
  './js/main.js',
  './js/ui.js',
  './js/kartta.js',
  './js/karttamittari.js',
  './js/fokuskartta.js',
  './js/fokusmitat.js',
  './js/packs/fokus-grc.js',
  './js/sisaltotaulut.js',
  './js/ui-apurit.js',
  './js/liput.js',
  './js/karttazoom.js',
  './js/vertailu.js',
  './js/nahtavyydet.js',
  './js/kuvagalleria.js',
  './js/opas.js',
  './js/lehti.js',
  './js/ehdotukset.js',
  './js/reaktiot.js',
  './js/tekijakortti.js',
  './js/luenta.js',
  './js/visa.js',
  './js/fokusvirta.js',
  './js/fokusniput.js',
  './js/fokuskohteet.js',
  './js/fokuspiste.js',
  './js/fokusnosto-symbolit.js',
  './js/fokusnosto.js',
  './js/fokustehtavat.js',
  './js/maalehti.js',
  './js/lukija.js',
  './js/pollo.js',
  './js/puhe.js',
  './js/puhe-oletukset.js',
  './js/pollo-haku.js',
  './js/pollopoiminnat.js',
  './js/game.js',
  './js/tietajatasot.js',
  './js/tietajagalleria.js',
  './js/minipopup.js',
  './js/ai.js',
  // Retkikunta, sähkeet ja kaveriapu (Raamattu: SÄHKEJÄRJESTELMÄ).
  './js/sahke.js',
  './js/rules.js',
  './js/pack.js',
  './js/passport.js',
  './js/natiivi.js',
  './js/lahteet.js',
  './js/wiki.js',
  './js/media.js',
  './js/saa.js',
  './js/maakayrat.js',
  './js/uutiset.js',
  './js/packs/maailmankartta.js',
  './js/packs/maailmankartta-maasto.js',
  './js/packs/maailmankartta-nimet.js',
  './js/packs/maasto-vedet.js',
  './js/packs/maasto-korkeus.js',
  './js/packs/maasto-nimet-vuoret.js',
  './js/packs/vuori-valokuvat.js',
  './js/packs/maasto-nimet-vedet.js',
  './js/packs/maailmankartta-syvyys.js',
  './js/packs/maasto-tekstit-malli.js',
  './js/packs/maasto-tekstit.js',
  './js/packs/maailmankartta-varjostus.js',
  './js/packs/linssi-topografia.js',
  './js/packs/linssi-maaluvut.js',
  './js/packs/linssi-muuttoliike.js',
  './js/packs/linssi-historia.js',
  './js/packs/linssi-leviaminen.js',
  './js/packs/linssi-yokartta.js',
  './js/packs/linssi-topografia-kuva.js',
  './js/packs/linssi-ilmasto.js',
  './js/packs/linssi-kielet.js',
  './js/packs/linssi-tahdet.js',
  './js/packs/linssi-tuulet.js',
  './js/packs/maailma.js',
  './js/packs/maailma-questions.js',
  './js/packs/africa.js',
  './js/packs/africa-questions.js',
  './js/packs/africa-puzzles.js',
  './js/packs/africa-borders.js',
  './js/packs/africa-countries.js',
  './js/packs/omat-tiivistelmat.js',
  './js/packs/liput-paikalliset.js',
  './js/packs/lippu-tekijat.js',
  './js/linssit/kerros.js',
  './js/linssit/rekisteri.js',
  './js/linssit/omistus.js',
  './js/linssit/pistenaytto.js',
  './js/linssit/radiosoitin.js',
  './js/linssit/viritin.js',
  './js/linssit/radio.js',
  './js/linssit/topografia.js',
  './js/linssit/vertailu.js',
  './js/linssit/maatiedot.js',
  './js/linssit/vesistot.js',
  './js/packs/viritysaanet.js',
  './css/radio.css',
  './js/packs/valokuvat-paikalliset.js',
  './js/packs/valokuvat-flickr.js',
  './js/packs/africa-valokuvat.js',
  './js/packs/africa-saapumiset.js',
  './js/packs/africa-kulttuuri.js',
  './js/packs/africa-artikkelit.js',
  './js/packs/africa-maatiedot.js',
  './js/packs/europe.js',
  './js/packs/europe-questions.js',
  './js/packs/europe-puzzles.js',
  './js/packs/europe-countries.js',
  './js/packs/europe-saapumiset.js',
  './js/packs/tarinakaari.js',
  './js/tyohuone-kehitys-data.js',
  // Kehittäjän liitteet (Raamattu, Tilanne, Tilastot ja sen
  // pelikatalogi). Erillisen työhuonesivuston purkauduttua 18.8.2026
  // nämä ovat pelin omia moduuleja: ui.js tuo ne staattisesti, joten
  // ilman esilatausta koko peli jäisi offline käynnistymättä.
  './js/tyohuone-raamattu.js',
  './js/tyohuone-tilanne.js',
  './js/tyohuone-pelit.js',
  './js/tyohuone-tilastot.js',
  './js/viitekuva-herot.js',
  './js/packs/asia-saapumiset.js',
  './js/packs/northamerica-saapumiset.js',
  './js/packs/southamerica-saapumiset.js',
  './js/packs/oceania-saapumiset.js',
  './js/packs/asia-artikkelit.js',
  './js/packs/northamerica-artikkelit.js',
  './js/packs/southamerica-artikkelit.js',
  './js/packs/oceania-artikkelit.js',
  './js/packs/asia-valokuvat.js',
  './js/packs/asia-lisat-valokuvat.js',
  './js/packs/northamerica-valokuvat.js',
  './js/packs/southamerica-valokuvat.js',
  './js/packs/oceania-valokuvat.js',
  './js/packs/asia-maatiedot.js',
  './js/packs/radiot.js',
  './js/packs/vanhat-aanet.js',
  './js/packs/europe-kulttuuri.js',
  './js/packs/kulttuuri-kategoriat.js',
  './js/packs/maa-kategoriat.js',
  './js/packs/maakartat.js',
  './js/packs/nahtavyysjutut.js',
  './js/packs/miniatyyrit.js',
  './assets/kartat/symbolit/sym-elain.webp',
  './assets/kartat/symbolit/sym-historia.webp',
  './assets/kartat/symbolit/sym-huuto.webp',
  './assets/kartat/symbolit/sym-kauppa.webp',
  './assets/kartat/symbolit/sym-kulttuuri.webp',
  './assets/kartat/symbolit/sym-luonto.webp',
  './assets/kartat/symbolit/sym-merenkulku.webp',
  './assets/kartat/symbolit/sym-ruoka.webp',
  './assets/kartat/symbolit/sym-sana.webp',
  './assets/kartat/symbolit/sym-silma.webp',
  './assets/kartat/symbolit/sym-tekniikka.webp',
  './assets/kartat/symbolit/sym-urheilu.webp',
  './assets/kartat/symbolit/sym-kaupunki.webp',
  // Pelinappula (tinaherra) on aina näkyvissä, joten se kuuluu
  // esivarastoon siinä missä kartan symbolitkin.
  './assets/kartat/nappula-tinaherra.webp',
  './js/packs/julisteet.js',
  './js/packs/paikallisaarteet.js',
  './js/packs/lipputiedot.js',
  './js/packs/henkilot.js',
  './js/packs/saatiedot.js',
  './js/packs/kohtaamiset.js',
  './js/packs/fokusvirrat.js',
  './js/packs/fokuskohteet-grc.js',
  './js/packs/fokusvirta-ateena.js',
  './js/packs/fokuskohteet-bgr.js',
  './js/packs/fokusvirta-sofia.js',
  './js/packs/fokuskohteet-ita.js',
  './js/packs/fokusvirta-rooma.js',
  './js/packs/fokuskohteet-tur.js',
  './js/packs/fokusvirta-istanbul.js',
  './js/packs/fokuskohteet-rou.js',
  './js/packs/fokusvirta-bukarest.js',
  './js/packs/fokuskohteet-bih.js',
  './js/packs/fokusvirta-sarajevo.js',
  // Eurooppa kauttaaltaan valmiiksi, aalto 1 (28.8.2026): neljä uutta
  // fokusvirtaa. Näillä ei ole omaa kohdepakettia poimittavanaan
  // (kohdenostoja ei ole), joten paririviä ei tarvita.
  './js/packs/fokusvirta-madrid.js',
  './js/packs/fokusvirta-wien.js',
  './js/packs/fokusvirta-pariisi.js',
  './js/packs/fokusvirta-berliini.js',
  // Aalto 2 (29.8.2026): Lontoo, Budapest, Dubrovnik ja Praha. Näillä
  // ei ole kohdenostoja, joten paririviä ei tarvita — Britannian,
  // Unkarin ja Kroatian fokuskohdepaketit ovat omalla rivillään
  // alempana ihme-erien jäljiltä.
  './js/packs/fokusvirta-lontoo.js',
  './js/packs/fokusvirta-budapest.js',
  './js/packs/fokusvirta-dubrovnik.js',
  './js/packs/fokusvirta-praha.js',
  // Maat ilman omaa fokusvirtaa: kadonneiden ihmeiden erä 26.8.2026
  // ja Matkakirjan ihmeiden Euroopan erä 27.8.2026.
  './js/packs/fokuskohteet-egy.js',
  './js/packs/fokuskohteet-irq.js',
  './js/packs/fokuskohteet-fra.js',
  './js/packs/fokuskohteet-gbr.js',
  // Matkakirjan ihmeiden MAAILMAN erä 27.8.2026: seitsemän uutta maata.
  './js/packs/fokuskohteet-syr.js',
  './js/packs/fokuskohteet-chn.js',
  './js/packs/fokuskohteet-mex.js',
  './js/packs/fokuskohteet-jor.js',
  './js/packs/fokuskohteet-irn.js',
  './js/packs/fokuskohteet-afg.js',
  './js/packs/fokuskohteet-zwe.js',
  // Matkakirjan ihmeiden VÄLIMEREN erä 27.8.2026: kaksi uutta maata.
  './js/packs/fokuskohteet-lby.js',
  './js/packs/fokuskohteet-tun.js',
  // Unkarin kuratoitu lehti: Budapestin fokuslehden seitsemäntoista kohdetta.
  './js/packs/fokuskohteet-hun.js',
  // Kroatia 27.8.2026: kuratoitu fokuslehti (HRV.webp) ja sen
  // yhdeksäntoista karttakohdetta. Omaa fokusvirtaa ei vielä ole —
  // Dubrovnikin virta tulee omana työnään.
  './js/packs/fokuskohteet-hrv.js',
  // Saksa 27.8.2026: Berliinin lehti ja sen koko nimistö.
  './js/packs/fokuskohteet-deu.js',
  './js/packs/paivan-kuvat.js',
  './js/packs/uutislahteet.js',
  './js/packs/pollo-asetukset.js',
  './js/packs/pollo-kysymykset.js',
  './js/packs/pollo-poiminnat.js',
  './js/packs/europe-valokuvat.js',
  './js/packs/europe-kielet.js',
  './js/packs/europe-maatiedot.js',
  './js/packs/europe-artikkelit.js',
  './js/packs/middleeast.js',
  './js/packs/middleeast-countries.js',
  './js/packs/middleeast-questions.js',
  './js/packs/asia.js',
  './js/packs/asia-countries.js',
  './js/packs/asia-questions.js',
  './js/packs/oceania.js',
  './js/packs/oceania-countries.js',
  './js/packs/oceania-questions.js',
  './js/packs/northamerica.js',
  './js/packs/northamerica-countries.js',
  './js/packs/northamerica-questions.js',
  './js/packs/southamerica.js',
  './js/packs/southamerica-countries.js',
  './js/packs/southamerica-questions.js',
  './js/packs/istanbul.js',
  './js/packs/suomi.js',
  './js/packs/suomi-questions.js',
  './js/packs/istanbul-questions.js',
  './js/tokens.js',
  './js/mapart.js',
  './js/aani-ehdokkaat.js',
  './js/aani-tausta.js',
  './js/sound.js',
  './js/ambience-stream.js',
  './js/die.js',
  './assets/icon.svg',
  './assets/logo.png',
  // Etusivun työpöytäsommitelma: isoisän matkakirja ja sen alta
  // pilkottava irtolehti (läpinäkyviä PNG:itä). Ilman esilatausta
  // pelin ENSIMMÄINEN ruutu olisi offline-tilassa vajaa.
  './assets/etusivu/kansikuva.png',
  './assets/etusivu/irtolehti.png',
  // Kuvalinssit. Nämä ovat binäärejä eivätkä moduuleja — ilman
  // esilatausta ne puuttuisivat juuri offline-tilassa, jossa linssejä
  // selaillaan eniten.
  './assets/linssit/yokartta.jpg',
  './assets/linssit/topografia.webp',
  // Varustekuvat (linssien toimintakuvat, 10.8.2026).
  './assets/varusteet/varuste-topografia.jpg',
  './assets/varusteet/varuste-vesistot.jpg',
  './assets/varusteet/varuste-vertailu.jpg',
  './assets/varusteet/varuste-maatiedot.jpg',
  './assets/varusteet/varuste-radio.jpg',
  /*
   * ÄÄNTEN YDINSETTI — ainoat äänitiedostot, jotka esiladataan.
   *
   * Tällä listalla oli 16.8.2026 asti 420 äänitiedostoa eli noin 200 Mt,
   * ja ne haettiin joka asennuksessa. Niistä 195 Mt oli luentoja, joista
   * yksittäinen pelaaja kuulee murto-osan: peli latasi jokaiselle
   * kaikkien maanosien kertojaäänet, myös niiden kaupunkien, joihin hän
   * ei koskaan matkusta.
   *
   * Loput jaellaan nyt ämpäristä (js/media.js aaniUrl) ja tallentuvat
   * AANICACHEen sinä hetkenä kun ne ensi kerran soivat — sama malli kuin
   * valokuvilla. Omistajan linjaus 16.8.2026: OFFLINE-PELAUS EI OLE
   * TAVOITE, joten välimuisti on nopeutta varten eikä lupaus.
   *
   * Ydinsettiin jäävät kaksi lajia, joilla myöhästyminen kuuluisi:
   * pääaarteen huudahdukset (sama repliikki kuin kortilla — muiden
   * aarteiden huudahdukset ovat kahden sanan mittaisia eikä niitä
   * lueta ääneen) ja käyttöliittymän lyhyet tehosteet (alempana).
   * Ne EIVÄT kulje ämpärin kautta, koska silloin peli
   * pyytäisi eri osoitetta kuin minkä tämä lista esilatasi — sääntö on
   * js/media.js:n YDINAANI, ja nämä kaksi listaa kuuluvat yhteen.
   */
  './assets/audio/huudahdus-star-1.mp3',
  './assets/audio/huudahdus-star-2.mp3',
  './assets/audio/huudahdus-star-3.mp3',
  // Kohtaamiskuvat (kohtaamiskortti + kätkötulos, pilotti 10.8.2026).
  './assets/kohtaamiset/kohtaaminen-ateena.jpg',
  './assets/kohtaamiset/kohtaaminen-sofia.jpg',
  './assets/kohtaamiset/kohtaaminen-katko.jpg',
  // Mantereiden omat 1000 punnan aarteet (paljastuskortti).
  './assets/aarteet/aarre-europe-manner.jpg',
  './assets/aarteet/aarre-africa-manner.jpg',
  './assets/aarteet/aarre-middleeast-manner.jpg',
  './assets/aarteet/aarre-asia-manner.jpg',
  './assets/aarteet/aarre-northamerica-manner.jpg',
  './assets/aarteet/aarre-southamerica-manner.jpg',
  './assets/aarteet/aarre-oceania-manner.jpg',
  // Unohdetut aarteet — yksi per manner (omistajan päätös 11.8.2026).
  // Nämä puuttuivat esilatauksesta kokonaan, vaikka paljastuskortti on
  // pelin tärkein kuva.
  './assets/aarteet/aarre-europe-star.jpg',
  './assets/aarteet/aarre-africa-star.jpg',
  './assets/aarteet/aarre-middleeast-star.jpg',
  './assets/aarteet/aarre-asia-star.jpg',
  './assets/aarteet/aarre-northamerica-star.jpg',
  './assets/aarteet/aarre-southamerica-star.jpg',
  './assets/aarteet/aarre-oceania-star.jpg',
  // Katselulautojen pääaarteet (28.8.2026): Istanbulin sulttaanin
  // timantti ja maailmankartan Magellanin kompassi saivat omat kuvansa
  // samassa erässä kuin mantereet.
  './assets/aarteet/aarre-istanbul-star.jpg',
  './assets/aarteet/aarre-maailma-star.jpg',
  // Aarnin luettelon kaiverruskehys: pääaarteen diplomi (28.8.2026)
  // piirtää sen paljastuskortille heti laatan käännyttyä.
  './assets/aarteet/aarnin-luettelo-kehys.jpg',
  /*
   * Euroopan 58 paikallisaarretta (pieni + iso joka maalle,
   * js/packs/paikallisaarteet.js kuva-kentat, 28.8.2026). Sama laji
   * kuin ylla: paljastuskortin kuva, joka nakyy heti laatan kaannyttya,
   * joten myohastyminen huomattaisiin. Yhteensa noin 3,4 Mt.
   */
  './assets/aarteet/paikallis/fin-pieni.jpg',
  './assets/aarteet/paikallis/fin-iso.jpg',
  './assets/aarteet/paikallis/swe-pieni.jpg',
  './assets/aarteet/paikallis/swe-iso.jpg',
  './assets/aarteet/paikallis/nor-pieni.jpg',
  './assets/aarteet/paikallis/nor-iso.jpg',
  './assets/aarteet/paikallis/dnk-pieni.jpg',
  './assets/aarteet/paikallis/dnk-iso.jpg',
  './assets/aarteet/paikallis/isl-pieni.jpg',
  './assets/aarteet/paikallis/isl-iso.jpg',
  './assets/aarteet/paikallis/est-pieni.jpg',
  './assets/aarteet/paikallis/est-iso.jpg',
  './assets/aarteet/paikallis/lva-pieni.jpg',
  './assets/aarteet/paikallis/lva-iso.jpg',
  './assets/aarteet/paikallis/ltu-pieni.jpg',
  './assets/aarteet/paikallis/ltu-iso.jpg',
  './assets/aarteet/paikallis/pol-pieni.jpg',
  './assets/aarteet/paikallis/pol-iso.jpg',
  './assets/aarteet/paikallis/cze-pieni.jpg',
  './assets/aarteet/paikallis/cze-iso.jpg',
  './assets/aarteet/paikallis/deu-pieni.jpg',
  './assets/aarteet/paikallis/deu-iso.jpg',
  './assets/aarteet/paikallis/aut-pieni.jpg',
  './assets/aarteet/paikallis/aut-iso.jpg',
  './assets/aarteet/paikallis/che-pieni.jpg',
  './assets/aarteet/paikallis/che-iso.jpg',
  './assets/aarteet/paikallis/nld-pieni.jpg',
  './assets/aarteet/paikallis/nld-iso.jpg',
  './assets/aarteet/paikallis/gbr-pieni.jpg',
  './assets/aarteet/paikallis/gbr-iso.jpg',
  './assets/aarteet/paikallis/irl-pieni.jpg',
  './assets/aarteet/paikallis/irl-iso.jpg',
  './assets/aarteet/paikallis/fra-pieni.jpg',
  './assets/aarteet/paikallis/fra-iso.jpg',
  './assets/aarteet/paikallis/esp-pieni.jpg',
  './assets/aarteet/paikallis/esp-iso.jpg',
  './assets/aarteet/paikallis/prt-pieni.jpg',
  './assets/aarteet/paikallis/prt-iso.jpg',
  './assets/aarteet/paikallis/ita-pieni.jpg',
  './assets/aarteet/paikallis/ita-iso.jpg',
  './assets/aarteet/paikallis/grc-pieni.jpg',
  './assets/aarteet/paikallis/grc-iso.jpg',
  './assets/aarteet/paikallis/bgr-pieni.jpg',
  './assets/aarteet/paikallis/bgr-iso.jpg',
  './assets/aarteet/paikallis/rou-pieni.jpg',
  './assets/aarteet/paikallis/rou-iso.jpg',
  './assets/aarteet/paikallis/hun-pieni.jpg',
  './assets/aarteet/paikallis/hun-iso.jpg',
  './assets/aarteet/paikallis/hrv-pieni.jpg',
  './assets/aarteet/paikallis/hrv-iso.jpg',
  './assets/aarteet/paikallis/bih-pieni.jpg',
  './assets/aarteet/paikallis/bih-iso.jpg',
  './assets/aarteet/paikallis/ukr-pieni.jpg',
  './assets/aarteet/paikallis/ukr-iso.jpg',
  './assets/aarteet/paikallis/rus-pieni.jpg',
  './assets/aarteet/paikallis/rus-iso.jpg',
  './assets/aarteet/paikallis/tur-pieni.jpg',
  './assets/aarteet/paikallis/tur-iso.jpg',
  /*
   * Kohdekartat. Tämä ei ole koko kartasto (niitä on yli 50) vaan se
   * kourallinen, joka on ollut listalla alusta asti — muut tulevat
   * koriin ensimmäisellä katselulla, koska sama alkuperä menee
   * fetch-käsittelijän stale-while-revalidate -haaraan.
   *
   * PARI KUULUU YHTEEN. Kaupungilla, jolla on näkymävipu, listalla on
   * sekä piirros että satelliitti: pelkkä satelliitti tarkoittaisi,
   * että vivun oletusnäkymä on se, joka EI ole offline. Siksi
   * Helsingin ja Pariisin piirrokset lisättiin tähän 15.8.2026 samalla
   * kun ne saivat satelliittikuvan.
   */
  './assets/kartat/berliini-varikartta.png',
  // Berliinin miniatyyripiirrokset (kohdekartan kortit, v708).
  './assets/kartat/miniatyyrit/berliini-valtiopaivatalo.webp',
  './assets/kartat/miniatyyrit/berliini-brandenburgin-portti.webp',
  './assets/kartat/miniatyyrit/berliini-checkpoint-charlie.webp',
  './assets/kartat/miniatyyrit/berliini-museosaari.webp',
  './assets/kartat/miniatyyrit/berliini-tv-torni.webp',
  './assets/kartat/miniatyyrit/berliini-east-side-gallery.webp',
  './assets/kartat/miniatyyrit/helsinki-temppeliaukion-kirkko.webp',
  './assets/kartat/miniatyyrit/helsinki-linnanmaki.webp',
  './assets/kartat/miniatyyrit/helsinki-paarautatieasema.webp',
  './assets/kartat/miniatyyrit/helsinki-kaisaniemen-puisto.webp',
  './assets/kartat/miniatyyrit/helsinki-kallion-kirkko.webp',
  './assets/kartat/miniatyyrit/helsinki-tuomiokirkko.webp',
  './assets/kartat/miniatyyrit/helsinki-uspenskin-katedraali.webp',
  './assets/kartat/miniatyyrit/helsinki-johanneksenkirkko.webp',
  './assets/kartat/miniatyyrit/helsinki-suomenlinna.webp',
  './assets/kartat/miniatyyrit/pariisi-eiffel-torni.webp',
  './assets/kartat/miniatyyrit/pariisi-riemukaari.webp',
  './assets/kartat/miniatyyrit/pariisi-concorden-aukio.webp',
  './assets/kartat/miniatyyrit/pariisi-louvre.webp',
  './assets/kartat/miniatyyrit/pariisi-luxembourgin-puisto.webp',
  './assets/kartat/miniatyyrit/pariisi-sacre-coeur.webp',
  './assets/kartat/miniatyyrit/pariisi-pantheon.webp',
  './assets/kartat/miniatyyrit/pariisi-notre-dame.webp',
  './assets/kartat/miniatyyrit/pariisi-orsayn-taidemuseo.webp',
  './assets/kartat/miniatyyrit/pariisi-palais-garnier.webp',
  './assets/kartat/miniatyyrit/pariisi-place-des-vosges.webp',
  './assets/kartat/miniatyyrit/lontoo-buckinghamin-palatsi.webp',
  './assets/kartat/miniatyyrit/lontoo-trafalgar-square.webp',
  './assets/kartat/miniatyyrit/lontoo-big-ben.webp',
  './assets/kartat/miniatyyrit/lontoo-lontoon-silma.webp',
  './assets/kartat/miniatyyrit/lontoo-pyhan-paavalin-katedraali.webp',
  './assets/kartat/miniatyyrit/lontoo-tower-bridge.webp',
  './assets/kartat/miniatyyrit/rooma-pietarinkirkko.webp',
  './assets/kartat/miniatyyrit/rooma-castel-santangelo.webp',
  './assets/kartat/miniatyyrit/rooma-espanjalaiset-portaat.webp',
  './assets/kartat/miniatyyrit/rooma-trevin-suihkulahde.webp',
  './assets/kartat/miniatyyrit/rooma-pantheon.webp',
  './assets/kartat/miniatyyrit/rooma-colosseum.webp',
  './assets/kartat/miniatyyrit/wien-raatihuone.webp',
  './assets/kartat/miniatyyrit/wien-hofburg.webp',
  './assets/kartat/miniatyyrit/wien-valtionooppera.webp',
  './assets/kartat/miniatyyrit/wien-stephansdom.webp',
  './assets/kartat/miniatyyrit/wien-belvedere.webp',
  './assets/kartat/miniatyyrit/wien-jattiratas.webp',
  './assets/kartat/miniatyyrit/wien-schonbrunn.webp',
  './assets/kartat/miniatyyrit/praha-petrinin-nakotorni.webp',
  './assets/kartat/miniatyyrit/praha-prahan-linna.webp',
  './assets/kartat/miniatyyrit/praha-kaarlensilta.webp',
  './assets/kartat/miniatyyrit/praha-vanhauusi-synagoga.webp',
  './assets/kartat/miniatyyrit/praha-astronominen-kello.webp',
  './assets/kartat/miniatyyrit/praha-kansallismuseo.webp',
  './assets/kartat/miniatyyrit/amsterdam-keskusrautatieasema.webp',
  './assets/kartat/miniatyyrit/amsterdam-anne-frankin-talo.webp',
  './assets/kartat/miniatyyrit/amsterdam-kuninkaanpalatsi.webp',
  './assets/kartat/miniatyyrit/amsterdam-rembrandtin-talo.webp',
  './assets/kartat/miniatyyrit/amsterdam-artis-elaintarha.webp',
  './assets/kartat/miniatyyrit/amsterdam-rijksmuseum.webp',
  './assets/kartat/miniatyyrit/tukholma-kaupungintalo.webp',
  './assets/kartat/miniatyyrit/tukholma-riddarholmenin-kirkko.webp',
  './assets/kartat/miniatyyrit/tukholma-sergelin-tori.webp',
  './assets/kartat/miniatyyrit/tukholma-kuninkaanlinna.webp',
  './assets/kartat/miniatyyrit/tukholma-vasa-museo.webp',
  './assets/kartat/miniatyyrit/tukholma-skansen.webp',
  './assets/kartat/miniatyyrit/kobenhavn-pieni-merenneito.webp',
  './assets/kartat/miniatyyrit/kobenhavn-amalienborg.webp',
  './assets/kartat/miniatyyrit/kobenhavn-rundetarn.webp',
  './assets/kartat/miniatyyrit/kobenhavn-nyhavn.webp',
  './assets/kartat/miniatyyrit/kobenhavn-christiansborg.webp',
  './assets/kartat/miniatyyrit/kobenhavn-tivoli.webp',
  './assets/kartat/miniatyyrit/kobenhavn-vapahtajan-kirkko.webp',
  './assets/kartat/miniatyyrit/kobenhavn-rosenborgin-linna.webp',
  './assets/kartat/miniatyyrit/kobenhavn-kastellet.webp',
  // Erien 1-2 miniatyyripiirrokset: Tampere, Firenze, Bagdad, Teheran,
  // Tripoli, Tokio, Soul ja Shanghai (v844).
  './assets/kartat/miniatyyrit/tampere-nasinneula.webp',
  './assets/kartat/miniatyyrit/tampere-finlaysonin-tehdasalue.webp',
  './assets/kartat/miniatyyrit/tampere-museokeskus-vapriikki.webp',
  './assets/kartat/miniatyyrit/tampere-hameensilta.webp',
  './assets/kartat/miniatyyrit/tampere-pyynikin-nakotorni.webp',
  './assets/kartat/miniatyyrit/tampere-tampereen-tuomiokirkko.webp',
  './assets/kartat/miniatyyrit/firenze-duomo.webp',
  './assets/kartat/miniatyyrit/firenze-palazzo-vecchio.webp',
  './assets/kartat/miniatyyrit/firenze-uffizi.webp',
  './assets/kartat/miniatyyrit/firenze-ponte-vecchio.webp',
  './assets/kartat/miniatyyrit/firenze-santa-croce.webp',
  './assets/kartat/miniatyyrit/firenze-bobolin-puutarha.webp',
  './assets/kartat/miniatyyrit/bagdad-mutanabbin-katu.webp',
  './assets/kartat/miniatyyrit/bagdad-qushlan-kellotorni.webp',
  './assets/kartat/miniatyyrit/bagdad-abbasidipalatsi.webp',
  './assets/kartat/miniatyyrit/bagdad-khan-mirjan.webp',
  './assets/kartat/miniatyyrit/bagdad-mustansiriya-koulu.webp',
  './assets/kartat/miniatyyrit/bagdad-bagdadin-museo.webp',
  './assets/kartat/miniatyyrit/teheran-teheranin-basaari.webp',
  './assets/kartat/miniatyyrit/teheran-golestanin-palatsi.webp',
  './assets/kartat/miniatyyrit/teheran-dar-al-fonun.webp',
  './assets/kartat/miniatyyrit/teheran-iranin-kansallismuseo.webp',
  './assets/kartat/miniatyyrit/teheran-masoudiehin-talo.webp',
  './assets/kartat/miniatyyrit/teheran-sepahsalarin-moskeija.webp',
  './assets/kartat/miniatyyrit/tripoli-darghutin-moskeija.webp',
  './assets/kartat/miniatyyrit/tripoli-vanhankaupungin-kellotorni.webp',
  './assets/kartat/miniatyyrit/tripoli-karamanlin-moskeija.webp',
  './assets/kartat/miniatyyrit/tripoli-an-naqan-moskeija.webp',
  './assets/kartat/miniatyyrit/tripoli-marcus-aureliuksen-riemukaari.webp',
  './assets/kartat/miniatyyrit/tripoli-punainen-linna.webp',
  './assets/kartat/miniatyyrit/tokio-kaminarimon.webp',
  './assets/kartat/miniatyyrit/tokio-senso-ji.webp',
  './assets/kartat/miniatyyrit/tokio-kanei-ji.webp',
  './assets/kartat/miniatyyrit/tokio-tokion-kansallismuseo.webp',
  './assets/kartat/miniatyyrit/tokio-uenon-puisto.webp',
  './assets/kartat/miniatyyrit/tokio-shitamachi-museo.webp',
  './assets/tietaja/viisas-pollo.jpg',
  /*
   * Tietäjätasojen muotokuvat (18.8.2026): matkalaukun rivin kuvake,
   * tasonnousun juhlakupla ja tasogallerian ruudukko. Kymmenen pientä
   * jpg:tä — offline-pelissä laukku ei saa avautua tyhjine kehyksineen.
   */
  './assets/tietaja/taso-01.jpg',
  './assets/tietaja/taso-02.jpg',
  './assets/tietaja/taso-03.jpg',
  './assets/tietaja/taso-04.jpg',
  './assets/tietaja/taso-05.jpg',
  './assets/tietaja/taso-06.jpg',
  './assets/tietaja/taso-07.jpg',
  './assets/tietaja/taso-08.jpg',
  './assets/tietaja/taso-09.jpg',
  './assets/tietaja/taso-10.jpg',
  './assets/kartat/miniatyyrit/soul-gyeongbokgung.webp',
  './assets/kartat/miniatyyrit/soul-bukchonin-hanok-kyla.webp',
  './assets/kartat/miniatyyrit/soul-changdeokgung.webp',
  './assets/kartat/miniatyyrit/soul-jongmyo.webp',
  './assets/kartat/miniatyyrit/soul-tapgol-puisto.webp',
  './assets/kartat/miniatyyrit/soul-bosingak.webp',
  './assets/kartat/miniatyyrit/shanghai-bund.webp',
  './assets/kartat/miniatyyrit/shanghai-waibaidun-silta.webp',
  './assets/kartat/miniatyyrit/shanghai-rauhanhotelli.webp',
  './assets/kartat/miniatyyrit/shanghai-yu-puutarha.webp',
  './assets/kartat/miniatyyrit/shanghai-nanjing-katu.webp',
  './assets/kartat/miniatyyrit/shanghai-shanghain-museo.webp',
  './assets/kartat/miniatyyrit/bagdad-al-wazirin-moskeija.webp',
  './assets/kartat/miniatyyrit/bagdad-haydarkhanan-moskeija.webp',
  './assets/kartat/miniatyyrit/firenze-bargello.webp',
  './assets/kartat/miniatyyrit/firenze-galleria-dellaccademia.webp',
  './assets/kartat/miniatyyrit/firenze-santa-maria-novella.webp',
  './assets/kartat/miniatyyrit/kairo-abdeenin-palatsi.webp',
  './assets/kartat/miniatyyrit/kairo-al-azhar-puisto.webp',
  './assets/kartat/miniatyyrit/dubai-abra-laiturit.webp',
  './assets/kartat/miniatyyrit/dubai-al-ahmadiyan-koulu.webp',
  './assets/kartat/miniatyyrit/dubai-al-fahidin-linnoitus.webp',
  './assets/kartat/miniatyyrit/dubai-al-shindagha.webp',
  './assets/kartat/miniatyyrit/dubai-bastakian-kaupunginosa.webp',
  './assets/kartat/miniatyyrit/dubai-dhow-satama.webp',
  './assets/kartat/miniatyyrit/dubai-kultasuuk.webp',
  './assets/kartat/miniatyyrit/dubai-maustesuuk.webp',
  './assets/kartat/miniatyyrit/dubai-suuri-moskeija.webp',
  './assets/kartat/miniatyyrit/dubai-tekstiilisuuk.webp',
  './assets/kartat/miniatyyrit/istanbul-galatan-silta.webp',
  './assets/kartat/miniatyyrit/istanbul-galatan-torni.webp',
  './assets/kartat/miniatyyrit/istanbul-hagia-sofia.webp',
  './assets/kartat/miniatyyrit/istanbul-neitsyttorni.webp',
  './assets/kartat/miniatyyrit/istanbul-sininen-moskeija.webp',
  './assets/kartat/miniatyyrit/istanbul-sirkecin-asema.webp',
  './assets/kartat/miniatyyrit/istanbul-suleymaniyen-moskeija.webp',
  './assets/kartat/miniatyyrit/istanbul-suuri-basaari.webp',
  './assets/kartat/miniatyyrit/istanbul-topkapin-palatsi.webp',
  './assets/kartat/miniatyyrit/istanbul-uskudar.webp',
  './assets/kartat/miniatyyrit/kairo-bab-zuweila.webp',
  './assets/kartat/miniatyyrit/kairo-egyptin-museo.webp',
  './assets/kartat/miniatyyrit/kairo-ibn-tulunin-moskeija.webp',
  './assets/kartat/miniatyyrit/kairo-kairon-torni.webp',
  './assets/kartat/miniatyyrit/kairo-khan-el-khalili.webp',
  './assets/kartat/miniatyyrit/kairo-saladinin-linnoitus.webp',
  './assets/kartat/miniatyyrit/kairo-sulttaani-hassanin-moskeija.webp',
  './assets/kartat/miniatyyrit/kairo-tahririn-aukio.webp',
  './assets/kartat/miniatyyrit/shanghai-dajingin-pavilonki.webp',
  './assets/kartat/miniatyyrit/shanghai-fuyoun-moskeija.webp',
  './assets/kartat/miniatyyrit/shanghai-kaupunginjumalan-temppeli.webp',
  './assets/kartat/miniatyyrit/soul-gwanghwamun.webp',
  './assets/kartat/miniatyyrit/soul-insadong.webp',
  './assets/kartat/miniatyyrit/soul-jogyesa.webp',
  './assets/kartat/miniatyyrit/tampere-amurin-tyolaismuseokortteli.webp',
  './assets/kartat/miniatyyrit/tampere-tallipiha.webp',
  './assets/kartat/miniatyyrit/teheran-bagh-e-mellin-portti.webp',
  './assets/kartat/miniatyyrit/teheran-toopkhanen-aukio.webp',
  './assets/kartat/miniatyyrit/tokio-hanayashiki.webp',
  './assets/kartat/miniatyyrit/tokio-kyu-iwasaki-tei.webp',
  './assets/kartat/miniatyyrit/tokio-ueno-tosho-gu.webp',
  './assets/kartat/miniatyyrit/tokio-uenon-asema.webp',
  './assets/kartat/miniatyyrit/tripoli-gurgin-moskeija.webp',
  './assets/kartat/miniatyyrit/newyork-luonnonhistoriallinen-museo.webp',
  './assets/kartat/miniatyyrit/newyork-metropolitan-museo.webp',
  './assets/kartat/miniatyyrit/newyork-pyhan-patrickin-katedraali.webp',
  './assets/kartat/miniatyyrit/newyork-paakirjasto.webp',
  './assets/kartat/miniatyyrit/newyork-empire-state-building.webp',
  './assets/kartat/miniatyyrit/newyork-flatiron-building.webp',
  './assets/kartat/miniatyyrit/newyork-washington-squaren-riemukaari.webp',
  './assets/kartat/miniatyyrit/newyork-kaupungintalo.webp',
  './assets/kartat/miniatyyrit/newyork-trinity-church.webp',
  './assets/kartat/miniatyyrit/ateena-akropolis.webp',
  './assets/kartat/miniatyyrit/ateena-antiikin-agora.webp',
  './assets/kartat/miniatyyrit/ateena-kallimarmaro.webp',
  './assets/kartat/miniatyyrit/ateena-lykavittos.webp',
  './assets/kartat/miniatyyrit/ateena-syntagman-aukio.webp',
  './assets/kartat/miniatyyrit/ateena-zeuksen-temppeli.webp',
  './assets/kartat/miniatyyrit/bukarest-antipan-museo.webp',
  './assets/kartat/miniatyyrit/bukarest-cismigiun-puutarha.webp',
  './assets/kartat/miniatyyrit/bukarest-parlamenttipalatsi.webp',
  './assets/kartat/miniatyyrit/bukarest-romanian-ateneum.webp',
  './assets/kartat/miniatyyrit/bukarest-stavropoleoksen-kirkko.webp',
  './assets/kartat/miniatyyrit/bukarest-vanha-ruhtinaanhovi.webp',
  './assets/kartat/miniatyyrit/bukarest-yliopiston-aukio.webp',
  './assets/kartat/miniatyyrit/sarajevo-bascarsija.webp',
  './assets/kartat/miniatyyrit/sarajevo-gazi-husrev-begin-moskeija.webp',
  './assets/kartat/miniatyyrit/sarajevo-keltainen-linnake.webp',
  './assets/kartat/miniatyyrit/sarajevo-latinalaissilta.webp',
  './assets/kartat/miniatyyrit/sarajevo-sarajevon-katedraali.webp',
  './assets/kartat/miniatyyrit/sarajevo-vijecnica.webp',
  './assets/kartat/miniatyyrit/sofia-borisovan-puutarha.webp',
  './assets/kartat/miniatyyrit/sofia-kansalliskulttuuripalatsi.webp',
  './assets/kartat/miniatyyrit/sofia-mineraalikylpyla.webp',
  './assets/kartat/miniatyyrit/sofia-pyhan-yrjon-rotunda.webp',
  './assets/kartat/miniatyyrit/sofia-sofian-katedraali.webp',
  './assets/kartat/miniatyyrit/sofia-sofian-yliopisto.webp',
  './assets/kartat/miniatyyrit/budapest-gellertinvuori.webp',
  './assets/kartat/miniatyyrit/budapest-kalastajanlinnake.webp',
  './assets/kartat/miniatyyrit/budapest-ketjusilta.webp',
  './assets/kartat/miniatyyrit/budapest-parlamenttitalo.webp',
  './assets/kartat/miniatyyrit/budapest-pyhan-tapanin-kirkko.webp',
  './assets/kartat/miniatyyrit/budapest-sankarien-aukio.webp',
  './assets/kartat/miniatyyrit/budapest-suuri-kauppahalli.webp',
  './assets/kartat/miniatyyrit/lissabon-glorian-koysirata.webp',
  './assets/kartat/miniatyyrit/lissabon-kansallispanteoni.webp',
  './assets/kartat/miniatyyrit/lissabon-kauppatori.webp',
  './assets/kartat/miniatyyrit/lissabon-rossio.webp',
  './assets/kartat/miniatyyrit/lissabon-sao-jorgen-linna.webp',
  './assets/kartat/miniatyyrit/lissabon-tuomiokirkko.webp',
  './assets/kartat/miniatyyrit/madrid-alcalan-portti.webp',
  './assets/kartat/miniatyyrit/madrid-cibeleen-aukio.webp',
  './assets/kartat/miniatyyrit/madrid-kuninkaanlinna.webp',
  './assets/kartat/miniatyyrit/madrid-plaza-mayor.webp',
  './assets/kartat/miniatyyrit/madrid-prado-museo.webp',
  './assets/kartat/miniatyyrit/madrid-puerta-del-sol.webp',
  './assets/kartat/miniatyyrit/varsova-kopernikuksen-tiedekeskus.webp',
  './assets/kartat/miniatyyrit/varsova-kulttuuri-ja-tiedepalatsi.webp',
  './assets/kartat/miniatyyrit/varsova-pyhan-ristin-kirkko.webp',
  './assets/kartat/miniatyyrit/varsova-vanhankaupungin-tori.webp',
  './assets/kartat/miniatyyrit/varsova-varsovan-kansallismuseo.webp',
  './assets/kartat/miniatyyrit/varsova-varsovan-linna.webp',
  './assets/kartat/miniatyyrit/barcelona-arc-de-triomf.webp',
  './assets/kartat/miniatyyrit/barcelona-boquerian-kauppahalli.webp',
  './assets/kartat/miniatyyrit/barcelona-casa-batllo.webp',
  './assets/kartat/miniatyyrit/barcelona-kolumbuksen-patsas.webp',
  './assets/kartat/miniatyyrit/barcelona-musiikkipalatsi.webp',
  './assets/kartat/miniatyyrit/barcelona-sagrada-familia.webp',
  './assets/kartat/miniatyyrit/dublin-dublinin-linna.webp',
  './assets/kartat/miniatyyrit/dublin-guinness-panimo.webp',
  './assets/kartat/miniatyyrit/dublin-hapenny-silta.webp',
  './assets/kartat/miniatyyrit/dublin-patrickin-katedraali.webp',
  './assets/kartat/miniatyyrit/dublin-spire.webp',
  './assets/kartat/miniatyyrit/dublin-trinity-college.webp',
  './assets/kartat/miniatyyrit/edinburgh-calton-hill.webp',
  './assets/kartat/miniatyyrit/edinburgh-charlotte-square.webp',
  './assets/kartat/miniatyyrit/edinburgh-edinburghin-linna.webp',
  './assets/kartat/miniatyyrit/edinburgh-greyfriars-bobby.webp',
  './assets/kartat/miniatyyrit/edinburgh-holyroodin-palatsi.webp',
  './assets/kartat/miniatyyrit/oslo-akershusin-linnoitus.webp',
  './assets/kartat/miniatyyrit/oslo-karl-johans-gate.webp',
  './assets/kartat/miniatyyrit/oslo-kaupungintalo.webp',
  './assets/kartat/miniatyyrit/oslo-kuninkaanlinna.webp',
  './assets/kartat/miniatyyrit/oslo-oopperatalo.webp',
  './assets/kartat/miniatyyrit/oslo-oslon-tuomiokirkko.webp',
  './assets/kartat/miniatyyrit/edinburgh-st-gilesin-katedraali.webp',
  './assets/kartat/miniatyyrit/kiova-andreaksen-kirkko.webp',
  './assets/kartat/miniatyyrit/kiova-itsenaisyyden-aukio.webp',
  './assets/kartat/miniatyyrit/kiova-kiovan-kultainen-portti.webp',
  './assets/kartat/miniatyyrit/kiova-kontraktovan-aukio.webp',
  './assets/kartat/miniatyyrit/kiova-pyhan-mikaelin-luostari.webp',
  './assets/kartat/miniatyyrit/kiova-pyhan-sofian-katedraali.webp',
  './assets/kartat/miniatyyrit/moskova-bolsoi-teatteri.webp',
  './assets/kartat/miniatyyrit/moskova-moskovan-kreml.webp',
  './assets/kartat/miniatyyrit/moskova-punainen-tori.webp',
  './assets/kartat/miniatyyrit/moskova-pyhan-vasilin-katedraali.webp',
  './assets/kartat/miniatyyrit/moskova-tretjakovin-galleria.webp',
  './assets/kartat/miniatyyrit/pietari-kazanin-katedraali.webp',
  './assets/kartat/miniatyyrit/pietari-mariinski-teatteri.webp',
  './assets/kartat/miniatyyrit/pietari-pietari-paavalin-linnoitus.webp',
  './assets/kartat/miniatyyrit/pietari-talvipalatsi.webp',
  './assets/kartat/miniatyyrit/pietari-vaskiratsastaja.webp',
  './assets/kartat/miniatyyrit/pietari-verikirkko.webp',
  './assets/kartat/miniatyyrit/riika-keskustori.webp',
  './assets/kartat/miniatyyrit/riika-kolme-veljesta.webp',
  './assets/kartat/miniatyyrit/riika-mustapaiden-talo.webp',
  './assets/kartat/miniatyyrit/riika-pyhan-pietarin-kirkko.webp',
  './assets/kartat/miniatyyrit/riika-riian-tuomiokirkko.webp',
  './assets/kartat/miniatyyrit/riika-vapaudenpatsas.webp',
  './assets/kartat/miniatyyrit/ankara-anatolian-sivilisaatioiden-museo.webp',
  './assets/kartat/miniatyyrit/ankara-ankaran-linna.webp',
  './assets/kartat/miniatyyrit/ankara-augustuksen-temppeli.webp',
  './assets/kartat/miniatyyrit/ankara-julianuksen-pylvas.webp',
  './assets/kartat/miniatyyrit/ankara-linnanportin-kellotorni.webp',
  './assets/kartat/miniatyyrit/ankara-roomalainen-kylpyla.webp',
  './assets/kartat/miniatyyrit/izmir-hisarin-moskeija.webp',
  './assets/kartat/miniatyyrit/izmir-izmirin-kellotorni.webp',
  './assets/kartat/miniatyyrit/izmir-kemeraltin-basaari.webp',
  './assets/kartat/miniatyyrit/izmir-salepcioglun-moskeija.webp',
  './assets/kartat/miniatyyrit/izmir-smyrnan-agora.webp',
  './assets/kartat/miniatyyrit/izmir-sulu-han.webp',
  './assets/kartat/miniatyyrit/moskova-vapahtajan-katedraali.webp',
  './assets/kartat/miniatyyrit/tallinna-matkustajasatama.webp',
  './assets/kartat/miniatyyrit/tallinna-nevskin-katedraali.webp',
  './assets/kartat/miniatyyrit/tallinna-olevisten-kirkko.webp',
  './assets/kartat/miniatyyrit/tallinna-paksu-margareeta.webp',
  './assets/kartat/miniatyyrit/tallinna-raatihuoneentori.webp',
  './assets/kartat/miniatyyrit/tallinna-virun-portti.webp',
  './assets/kartat/miniatyyrit/vilna-aamuportti.webp',
  './assets/kartat/miniatyyrit/vilna-gediminaksen-torni.webp',
  './assets/kartat/miniatyyrit/vilna-pyhan-annan-kirkko.webp',
  './assets/kartat/miniatyyrit/vilna-uzupis.webp',
  './assets/kartat/miniatyyrit/vilna-vilnan-tuomiokirkko.webp',
  './assets/kartat/miniatyyrit/vilna-vilnan-yliopisto.webp',
  // Matkakirjan ihmeet: sama kohde loistoaikansa asussa NYKYMAAILMASSA
  // (Raamattu, osio "Matkakirjan ihmeet"; kohteiden `ihme`-kenttä
  // js/packs/fokuskohteet-*.js). Nämä ovat pelin kohokohtia, ja monella
  // kohteella ihmekuva on kortin ainoa kuva — ilman esilatausta ihme
  // jäisi lentokoneessa harmaaksi laatikoksi. Ensimmäisen erän
  // piirrosmaiset loistoaikarekonstruktiot poistettiin 27.8.2026
  // (omistajan tilaus): fotorealistinen ihmekuva korvasi ne.
  './assets/kartat/ihmeet/ihme-aleksandrian-kirjasto.webp',
  './assets/kartat/ihmeet/ihme-artemiin-temppeli.webp',
  './assets/kartat/ihmeet/ihme-babylonin-puutarhat.webp',
  './assets/kartat/ihmeet/ihme-faros.webp',
  './assets/kartat/ihmeet/ihme-halikarnassoksen-mausoleumi.webp',
  './assets/kartat/ihmeet/ihme-hefaistoksen-temppeli.webp',
  './assets/kartat/ihmeet/ihme-knossos.webp',
  './assets/kartat/ihmeet/ihme-parthenon.webp',
  './assets/kartat/ihmeet/ihme-rodoksen-kolossi.webp',
  './assets/kartat/ihmeet/ihme-zeuksen-patsas.webp',
  // Euroopan erä 27.8.2026: kolme kadonnutta eurooppalaista.
  './assets/kartat/ihmeet/ihme-forum-romanum.webp',
  './assets/kartat/ihmeet/ihme-tuileries.webp',
  './assets/kartat/ihmeet/ihme-vanha-st-paul.webp',
  // Maailman erä 27.8.2026: neljätoista ihmettä viideltä mantereelta.
  // Kahdeksan kadonnutta (tähti kartalla):
  './assets/kartat/ihmeet/ihme-bastilji.webp',
  './assets/kartat/ihmeet/ihme-crystal-palace.webp',
  './assets/kartat/ihmeet/ihme-vanha-london-bridge.webp',
  './assets/kartat/ihmeet/ihme-hippodromi.webp',
  './assets/kartat/ihmeet/ihme-palmyra.webp',
  './assets/kartat/ihmeet/ihme-yuanmingyuan.webp',
  './assets/kartat/ihmeet/ihme-templo-mayor.webp',
  './assets/kartat/ihmeet/ihme-bamiyan.webp',
  // Kuusi yhä olemassa olevaa ("Koe ihme" -nappi valokuvan alla):
  './assets/kartat/ihmeet/ihme-delfoi.webp',
  './assets/kartat/ihmeet/ihme-gizan-pyramidi.webp',
  './assets/kartat/ihmeet/ihme-karnak.webp',
  './assets/kartat/ihmeet/ihme-petra.webp',
  './assets/kartat/ihmeet/ihme-persepolis.webp',
  './assets/kartat/ihmeet/ihme-suuri-zimbabwe.webp',
  // Välimeren erä 27.8.2026: kahdeksan ihmettä antiikin Välimereltä
  // ja Mesopotamiasta. Neljä kadonnutta (tähti kartalla) — Ishtarin
  // portti ja Pergamonin alttari ovat siirretyt, Niniven palatsi ja
  // Karthagon satama tuhotut:
  './assets/kartat/ihmeet/ihme-ishtarin-portti.webp',
  './assets/kartat/ihmeet/ihme-niniven-palatsi.webp',
  './assets/kartat/ihmeet/ihme-karthagon-satama.webp',
  './assets/kartat/ihmeet/ihme-pergamonin-alttari.webp',
  // Neljä yhä olemassa olevaa ("Koe ihme" -nappi valokuvan alla):
  './assets/kartat/ihmeet/ihme-colosseum.webp',
  './assets/kartat/ihmeet/ihme-olympieion.webp',
  './assets/kartat/ihmeet/ihme-theodosiuksen-muurit.webp',
  './assets/kartat/ihmeet/ihme-leptis-magna.webp',
  // Täkynostojen loistoaikakuvat (omistajan päätös 28.8.2026: noston
  // pääkuvaksi sama kohde loistoaikansa asussa, nykytilan valokuva
  // kakkoseksi). Sama sarja ja sama syy kuin ihmekuvilla yllä: repon
  // oma generoitu kuva, jolla ei ole varareittiä — ilman esilatausta
  // kortin pääkuva jäisi lentokoneessa tyhjäksi.
  './assets/kartat/nostot/nosto-areena-loistoaika.webp',
  // Kreikan kaksi nostoa saivat omat loistoaikakuvansa 28.8.2026.
  './assets/kartat/nostot/nosto-kastrin-kyla-loistoaika.webp',
  './assets/kartat/nostot/nosto-olympoksen-huippu-loistoaika.webp',
  // Neljä vanhaa nostoa saivat pääkuvansa samana iltana (Bukarest,
  // Istanbul, Sarajevo, Rooma) ja Kreikan neljäs nosto oman kuvansa.
  './assets/kartat/nostot/nosto-dracula-loistoaika.webp',
  './assets/kartat/nostot/nosto-schliemann-loistoaika.webp',
  './assets/kartat/nostot/nosto-pyramidi-loistoaika.webp',
  './assets/kartat/nostot/nosto-kissat-loistoaika.webp',
  './assets/kartat/nostot/nosto-antikythera-kone-loistoaika.webp',
  // C-sarja: v1297:n kymmenen täkynostoa Madridissa, Wienissä,
  // Pariisissa ja Berliinissä saivat pääkuvansa 28.8.2026.
  './assets/kartat/nostot/nosto-altamira-loistoaika.webp',
  './assets/kartat/nostot/nosto-munkkiaratit-loistoaika.webp',
  './assets/kartat/nostot/nosto-cartagenan-kantoni-loistoaika.webp',
  './assets/kartat/nostot/nosto-maailmannayttely-1873-loistoaika.webp',
  './assets/kartat/nostot/nosto-kirahvimuoti-loistoaika.webp',
  './assets/kartat/nostot/nosto-lustig-eiffel-loistoaika.webp',
  './assets/kartat/nostot/nosto-kirahvin-kavelymatka-loistoaika.webp',
  './assets/kartat/nostot/nosto-kopenickin-kapteeni-loistoaika.webp',
  './assets/kartat/nostot/nosto-archaeopteryx-loistoaika.webp',
  './assets/kartat/nostot/nosto-neuschwanstein-loistoaika.webp',
  // Aallon 2 neljä täkynostoa saivat pääkuvansa 29.8.2026 (Lontoo,
  // Budapest, Dubrovnik, Praha).
  './assets/kartat/nostot/nosto-sutton-hoo-loistoaika.webp',
  './assets/kartat/nostot/nosto-szegedin-tulva-loistoaika.webp',
  './assets/kartat/nostot/nosto-pulan-areena-loistoaika.webp',
  './assets/kartat/nostot/nosto-karlstejn-loistoaika.webp',
  /*
   * ISOISÄN KARTTALIITTEET (29.8.2026, pilottina Wienin
   * maailmannäyttely). Sama syy kuin loistoaikakuvilla yllä: liite on
   * repon oma tiedosto ilman Commons-varareittiä, joten ilman
   * esilatausta kortin kolmas kuva jäisi lentokoneessa tyhjäksi — ja
   * juuri se on kuvista se, jota luetaan.
   */
  './assets/kartat/karttaliitteet/liite-maailmannayttely-1873.webp',
  // Lippuikkunan versioliput (pilotti Suomi + Saksa, v711).
  './assets/liput/versiot/fin-valtiolippu.png',
  './assets/liput/versiot/fin-sotalippu.png',
  './assets/liput/versiot/fin-presidentinlippu.png',
  './assets/liput/versiot/fin-leijonalippu-1918.png',
  './assets/liput/versiot/deu-virastolippu.png',
  './assets/liput/versiot/deu-keisarikunta.png',
  './assets/liput/versiot/deu-ddr.png',
  './assets/liput/tunnukset/fin-vaakuna.png',
  './assets/liput/tunnukset/fin-helsinki-vaakuna.png',
  './assets/liput/tunnukset/deu-vaakuna.png',
  './assets/liput/tunnukset/deu-berliini-vaakuna.png',
  './assets/liput/tunnukset/swe-vaakuna.png',
  './assets/liput/tunnukset/nor-vaakuna.png',
  './assets/liput/tunnukset/dnk-vaakuna.png',
  './assets/liput/tunnukset/isl-vaakuna.png',
  './assets/liput/tunnukset/est-vaakuna.png',
  './assets/liput/tunnukset/lva-vaakuna.png',
  './assets/liput/tunnukset/ltu-vaakuna.png',
  './assets/liput/tunnukset/fra-vaakuna.png',
  './assets/liput/tunnukset/gbr-vaakuna.png',
  './assets/liput/tunnukset/nld-vaakuna.png',
  './assets/liput/tunnukset/esp-vaakuna.png',
  './assets/liput/tunnukset/prt-vaakuna.png',
  './assets/liput/tunnukset/ita-vaakuna.png',
  './assets/liput/tunnukset/che-vaakuna.png',
  './assets/liput/tunnukset/aut-vaakuna.png',
  './assets/liput/tunnukset/pol-vaakuna.png',
  './assets/liput/tunnukset/cze-vaakuna.png',
  './assets/liput/tunnukset/svk-vaakuna.png',
  './assets/liput/tunnukset/hun-vaakuna.png',
  './assets/liput/tunnukset/rou-vaakuna.png',
  './assets/liput/tunnukset/bgr-vaakuna.png',
  './assets/liput/tunnukset/grc-vaakuna.png',
  './assets/liput/tunnukset/srb-vaakuna.png',
  './assets/liput/tunnukset/hrv-vaakuna.png',
  './assets/liput/tunnukset/svn-vaakuna.png',
  './assets/liput/tunnukset/bih-vaakuna.png',
  './assets/liput/tunnukset/ukr-vaakuna.png',
  './assets/liput/tunnukset/rus-vaakuna.png',
  './assets/liput/tunnukset/tur-vaakuna.png',
  './assets/liput/tunnukset/aze-vaakuna.png',
  './assets/liput/tunnukset/jpn-vaakuna.png',
  './assets/liput/tunnukset/kor-vaakuna.png',
  './assets/liput/tunnukset/chn-vaakuna.png',
  './assets/liput/tunnukset/ind-vaakuna.png',
  './assets/liput/tunnukset/mng-vaakuna.png',
  './assets/liput/tunnukset/npl-vaakuna.png',
  './assets/liput/tunnukset/bgd-vaakuna.png',
  './assets/liput/tunnukset/pak-vaakuna.png',
  './assets/liput/tunnukset/irn-vaakuna.png',
  './assets/liput/tunnukset/irq-vaakuna.png',
  './assets/liput/tunnukset/sau-vaakuna.png',
  './assets/liput/tunnukset/egy-vaakuna.png',
  './assets/liput/tunnukset/are-vaakuna.png',
  './assets/liput/tunnukset/kwt-vaakuna.png',
  './assets/liput/tunnukset/qat-vaakuna.png',
  './assets/liput/tunnukset/tha-vaakuna.png',
  './assets/liput/tunnukset/vnm-vaakuna.png',
  './assets/liput/tunnukset/idn-vaakuna.png',
  './assets/liput/tunnukset/mys-vaakuna.png',
  './assets/liput/tunnukset/sgp-vaakuna.png',
  './assets/liput/tunnukset/phl-vaakuna.png',
  './assets/liput/tunnukset/mmr-vaakuna.png',
  './assets/liput/tunnukset/khm-vaakuna.png',
  './assets/liput/tunnukset/lka-vaakuna.png',
  './assets/liput/tunnukset/lao-vaakuna.png',
  './assets/liput/versiot/usa-13-tahtea.png',
  './assets/liput/versiot/can-punalippu.png',
  './assets/liput/tunnukset/usa-vaakuna.png',
  './assets/liput/tunnukset/can-vaakuna.png',
  './assets/liput/tunnukset/mex-vaakuna.png',
  './assets/liput/tunnukset/grl-vaakuna.png',
  './assets/liput/tunnukset/cub-vaakuna.png',
  './assets/liput/tunnukset/gtm-vaakuna.png',
  './assets/liput/tunnukset/nic-vaakuna-1908.png',
  './assets/liput/tunnukset/pan-vaakuna.png',
  './assets/liput/tunnukset/pri-vaakuna.png',
  './assets/liput/tunnukset/bmu-vaakuna.png',
  './assets/liput/versiot/bra-keisarikunta.png',
  './assets/liput/versiot/per-1820.png',
  './assets/liput/versiot/bol-wiphala.png',
  './assets/liput/versiot/pry-takasivu.png',
  './assets/liput/tunnukset/bra-vaakuna.png',
  './assets/liput/tunnukset/arg-vaakuna.png',
  './assets/liput/tunnukset/chl-vaakuna.png',
  './assets/liput/tunnukset/per-vaakuna.png',
  './assets/liput/tunnukset/bol-vaakuna.png',
  './assets/liput/tunnukset/col-vaakuna.png',
  './assets/liput/tunnukset/ven-vaakuna.png',
  './assets/liput/tunnukset/ecu-vaakuna.png',
  './assets/liput/tunnukset/pry-vaakuna.png',
  './assets/liput/tunnukset/ury-vaakuna.png',
  './assets/liput/tunnukset/flk-vaakuna.png',
  './assets/liput/versiot/mar-1666.png',
  './assets/liput/versiot/lby-jamahiriya.png',
  './assets/liput/versiot/mli-1959.png',
  './assets/liput/versiot/gha-1964.png',
  './assets/liput/versiot/cmr-1961.png',
  './assets/liput/versiot/cod-vapaavaltio.png',
  './assets/liput/versiot/cod-zaire.png',
  './assets/liput/tunnukset/mar-vaakuna.png',
  './assets/liput/tunnukset/dza-vaakuna.png',
  './assets/liput/tunnukset/tun-vaakuna.png',
  './assets/liput/tunnukset/lby-vaakuna.png',
  './assets/liput/tunnukset/mli-vaakuna.png',
  './assets/liput/tunnukset/sen-vaakuna.png',
  './assets/liput/tunnukset/sle-vaakuna.png',
  './assets/liput/tunnukset/lbr-vaakuna.png',
  './assets/liput/tunnukset/gha-vaakuna.png',
  './assets/liput/tunnukset/nga-vaakuna.png',
  './assets/liput/tunnukset/tcd-vaakuna.png',
  './assets/liput/tunnukset/cmr-vaakuna.png',
  './assets/liput/tunnukset/cod-vaakuna.png',
  './assets/liput/versiot/zaf-1928.png',
  './assets/liput/versiot/zwe-rhodesia.png',
  './assets/liput/versiot/moz-1975.png',
  './assets/liput/versiot/mdg-merina.png',
  './assets/liput/versiot/tza-sansibar.png',
  './assets/liput/versiot/uga-protektoraatti.png',
  './assets/liput/versiot/eth-keisarikunta.png',
  './assets/liput/versiot/sdn-1956.png',
  './assets/liput/tunnukset/ago-vaakuna.png',
  './assets/liput/tunnukset/nam-vaakuna.png',
  './assets/liput/tunnukset/zaf-vaakuna.png',
  './assets/liput/tunnukset/zwe-vaakuna.png',
  './assets/liput/tunnukset/moz-vaakuna.png',
  './assets/liput/tunnukset/mdg-vaakuna.png',
  './assets/liput/tunnukset/tza-vaakuna.png',
  './assets/liput/tunnukset/ken-vaakuna.png',
  './assets/liput/tunnukset/uga-vaakuna.png',
  './assets/liput/tunnukset/som-vaakuna.png',
  './assets/liput/tunnukset/eth-vaakuna.png',
  './assets/liput/tunnukset/sdn-vaakuna.png',
  './assets/liput/tunnukset/ssd-vaakuna.png',
  // Lippuikkunan päätöserä: Oseania, Aasia, Lähi-itä ja Irlanti.
  './assets/liput/versiot/afg-1826.png',
  './assets/liput/versiot/afg-emiraatti.png',
  './assets/liput/versiot/aus-punalippu.png',
  './assets/liput/versiot/bhr-1932.png',
  './assets/liput/versiot/cyp-1960.png',
  './assets/liput/versiot/fji-kuningaskunta.png',
  './assets/liput/versiot/hkg-siirtomaa.png',
  './assets/liput/versiot/irl-harppulippu.png',
  './assets/liput/versiot/kaz-nst.png',
  './assets/liput/versiot/ncl-flnks.png',
  './assets/liput/versiot/nzl-heimoliitto.png',
  './assets/liput/versiot/slb-protektoraatti.png',
  './assets/liput/versiot/syr-1980.png',
  './assets/liput/versiot/tls-1965.png',
  './assets/liput/versiot/twn-lohikaarme.png',
  './assets/liput/versiot/twn-viisi-rotua.png',
  './assets/liput/versiot/uzb-buhara.png',
  './assets/liput/versiot/uzb-nst.png',
  './assets/liput/versiot/vut-vanuaaku.png',
  './assets/liput/versiot/yem-etela.png',
  './assets/liput/versiot/yem-kuningaskunta.png',
  './assets/liput/tunnukset/afg-vaakuna.png',
  './assets/liput/tunnukset/aus-vaakuna.png',
  './assets/liput/tunnukset/bhr-vaakuna.png',
  './assets/liput/tunnukset/cyp-vaakuna.png',
  './assets/liput/tunnukset/fji-vaakuna.png',
  './assets/liput/tunnukset/hkg-vaakuna.png',
  './assets/liput/tunnukset/irl-vaakuna.png',
  './assets/liput/tunnukset/kaz-vaakuna.png',
  './assets/liput/tunnukset/ncl-vaakuna.png',
  './assets/liput/tunnukset/nfk-vaakuna.png',
  './assets/liput/tunnukset/nzl-vaakuna.png',
  './assets/liput/tunnukset/png-vaakuna.png',
  './assets/liput/tunnukset/slb-vaakuna.png',
  './assets/liput/tunnukset/syr-vaakuna.png',
  './assets/liput/tunnukset/tls-vaakuna.png',
  './assets/liput/tunnukset/twn-vaakuna.png',
  './assets/liput/tunnukset/uzb-vaakuna.png',
  './assets/liput/tunnukset/vut-vaakuna.png',
  './assets/liput/tunnukset/yem-vaakuna.png',
  './assets/kartat/helsinki-varikartta.png',
  './assets/kartat/kairo-keskusta.png',
  './assets/kartat/lontoo-varikartta.png',
  './assets/kartat/madrid-keskusta.png',
  './assets/kartat/pariisi-varikartta.png',
  './assets/kartat/tukholma-varikartta.png',
  './assets/kartat/rooma-varikartta.png',
  './assets/kartat/wien-varikartta.png',
  './assets/kartat/praha-varikartta.png',
  './assets/kartat/amsterdam-varikartta.png',
  './assets/kartat/kobenhavn-varikartta.png',
  './assets/kartat/firenze-varikartta.png',
  './assets/kartat/tampere-varikartta.png',
  './assets/kartat/bagdad-varikartta.png',
  './assets/kartat/teheran-varikartta.png',
  './assets/kartat/tripoli-varikartta.png',
  './assets/kartat/tokio-varikartta.png',
  './assets/kartat/soul-varikartta.png',
  './assets/kartat/shanghai-varikartta.png',
  './assets/kartat/venetsia-keskusta.png',
  // Käyttöliittymän lyhyet tehosteet — ydinsetin toinen puolisko
  // (ks. huudahdusten kohdalla oleva selitys).
  './assets/audio/efekti-klik.mp3',
  './assets/audio/efekti-paperi.mp3',
  './assets/audio/efekti-kolikot.mp3',
  './assets/audio/efekti-oikein.mp3',
  './assets/audio/efekti-vaarin.mp3',
  './assets/audio/efekti-pyyhkaisy.mp3',
  './assets/audio/efekti-askel.mp3',
  './assets/audio/efekti-saapuminen.mp3',
  './assets/audio/efekti-laiva.mp3',
  './assets/audio/efekti-lento.mp3',
  './assets/audio/efekti-vihje.mp3',
  './assets/audio/efekti-tikitys.mp3',
  './assets/audio/efekti-aikaloppui.mp3',
  './assets/audio/efekti-kaanto.mp3',
  './assets/audio/efekti-naksu.mp3',
  './assets/audio/efekti-zoom.mp3',
  './assets/audio/efekti-tahti.mp3',
  './assets/audio/efekti-jalokivi.mp3',
  './assets/audio/efekti-rosvo.mp3',
  './assets/audio/efekti-tyhja.mp3',
  './assets/audio/efekti-jumissa.mp3',
  './assets/audio/efekti-vuoro.mp3',
  './assets/audio/efekti-voitto.mp3',
  // Liput (tools/fetch-flags.mjs) — pieniä ja tarvitaan heti saapumiskortilla.
  './assets/liput/algeria.png',
  './assets/liput/austria.png',
  './assets/liput/czech-republic.png',
  './assets/liput/denmark.png',
  './assets/liput/estonia.png',
  './assets/liput/finland.png',
  './assets/liput/hungary.png',
  './assets/liput/ireland.png',
  './assets/liput/latvia.png',
  './assets/liput/lithuania.png',
  './assets/liput/norway.png',
  './assets/liput/romania.png',
  './assets/liput/russia.png',
  './assets/liput/sweden.png',
  './assets/liput/switzerland.png',
  './assets/liput/ukraine.png',
  './assets/liput/netherlands.png',
  './assets/liput/angola.png',
  './assets/liput/basque-country.png',
  './assets/liput/berber-flag.png',
  './assets/liput/bosnia-and-herzegovina.png',
  './assets/liput/bulgaria.png',
  './assets/liput/cameroon.png',
  './assets/liput/catalonia.png',
  './assets/liput/chad.png',
  './assets/liput/croatia.png',
  './assets/liput/democratic-republic-of-the-congo.png',
  './assets/liput/egypt.png',
  './assets/liput/ethiopia.png',
  './assets/liput/france.png',
  './assets/liput/galicia.png',
  './assets/liput/germany.png',
  './assets/liput/ghana.png',
  './assets/liput/greece.png',
  './assets/liput/iceland.png',
  './assets/liput/italy.png',
  './assets/liput/kenya.png',
  './assets/liput/liberia.png',
  './assets/liput/libya.png',
  './assets/liput/madagascar.png',
  './assets/liput/mali.png',
  './assets/liput/morocco.png',
  './assets/liput/mozambique.png',
  './assets/liput/namibia.png',
  './assets/liput/nigeria.png',
  './assets/liput/occitania.png',
  './assets/liput/poland.png',
  './assets/liput/portugal.png',
  './assets/liput/sardinia-italy.png',
  './assets/liput/saudi-arabia.png',
  './assets/liput/senegal.png',
  './assets/liput/serbia.png',
  './assets/liput/sierra-leone.png',
  './assets/liput/somalia.png',
  './assets/liput/south-africa.png',
  './assets/liput/south-sudan.png',
  './assets/liput/spain.png',
  './assets/liput/sudan.png',
  './assets/liput/tanzania.png',
  './assets/liput/turkey.png',
  './assets/liput/flag-of-the-romani-people.png',
  './assets/liput/tunisia.png',
  './assets/liput/uganda.png',
  './assets/liput/united-kingdom.png',
  './assets/liput/upper-silesia.png',
  './assets/liput/zimbabwe.png',
  /*
   * Lähi-idän laudan liput. Ne tarvittiin vasta 9.8.2026, kun lauta sai
   * cityCountry-taulun: sitä ennen lauta ei näyttänyt maan lippua
   * lainkaan. Turkki, Saudi-Arabia ja Egypti ovat jo yllä muiden
   * lautojen mukana.
   */
  './assets/liput/cyprus.png',
  './assets/liput/iran.png',
  './assets/liput/iraq.png',
  './assets/liput/kuwait.png',
  './assets/liput/oman.png',
  './assets/liput/qatar.png',
  './assets/liput/syria.png',
  './assets/liput/united-arab-emirates.png',
  './assets/liput/yemen.png',
];

/*
 * Media (liput ja äänet) on kymmeniä megatavuja, ja `addAll` on
 * kaikki-tai-ei-mitään: yksikin katkennut lataus kaatoi koko
 * asennuksen, jolloin peli jäi ilman välimuistia. Siksi koodi ja
 * tekstit haetaan yhtenä eränä (ne ovat pieniä ja niiden on oltava
 * ehjä kokonaisuus) ja media yksitellen niin, että yksi virhe
 * ohitetaan.
 *
 * Valokuvia EI enää haeta asennuksessa (omistajan päätös). Niitä on
 * satoja ja kymmeniä megatavuja, ja määrä kasvaa jokaisen uuden
 * kaupungin myötä — asennus olisi kasvanut kohtuuttomaksi. Sen sijaan
 * kuva tallentuu välimuistiin sinä hetkenä kun pelaaja sen ensi kerran
 * näkee (ks. KUVACACHE alempana), joten kerran nähty kaupunki toimii
 * offline.
 *
 * SAMA KOSKEE NYT ÄÄNIÄ (omistajan linjaus 16.8.2026). Luennat,
 * visamusiikki ja viritysäänet tulevat ämpäristä ja tallentuvat
 * AANICACHEen ensimmäisellä kuuntelulla; esilatauksessa on enää
 * ydinsetti (huudahdukset ja tehosteet), joka on osa MEDIA-erää kuten
 * ennenkin. Peli itse ja kartat haetaan yhä kokonaan etukäteen.
 */
// Linssikuvat kuuluvat samaan erään: yölinssin kuva on satoja kilotavuja,
// eikä sen katkennut lataus saa kaataa koko asennusta. Ilman tätä rivi
// päätyisi YDIMEEN, jossa yksikin virhe vie pelin ilman välimuistia.
const MEDIAA = (osoite) => /\/assets\/(liput|audio|linssit)\//.test(osoite);
const YDIN = SHELL.filter((o) => !MEDIAA(o));
const MEDIA = SHELL.filter(MEDIAA);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // cache: 'reload' ohittaa selaimen HTTP-välimuistin: ilman sitä
      // iOS saattoi täyttää uuden välimuistiversion vanhoilla
      // tiedostoilla, jolloin versionumero päivittyi mutta osa
      // sisällöstä (esim. matkakirjan tekstit) jäi vanhaksi.
      .then(async (cache) => {
        await cache.addAll(YDIN.map((osoite) => new Request(osoite, { cache: 'reload' })));
        await Promise.all(MEDIA.map((osoite) => cache
          .add(new Request(osoite, { cache: 'reload' }))
          .catch(() => {})));
      })
      .then(() => self.skipWaiting()),
  );
});

// Kuvien ajonaikainen välimuisti: kerran nähty kuva latautuu jatkossa
// heti ja toimii offline. Oma kori, jota version vaihto ei tyhjennä —
// kuvat eivät vanhene version mukana, eikä pelaaja joudu lataamaan
// samoja kuvia uudelleen joka päivityksellä.
//
// Korissa on kahdenlaisia kuvia: Wikipedian ja Commonsin verkkokuvat
// sekä repon omat valokuvat (assets/valokuvat), joita ei enää haeta
// asennuksessa.
const KUVACACHE = 'matkakirja-wikikuvat-v1';

/** Repon oma valokuva, joka haetaan vasta kun se ensi kerran näytetään. */
const OMA_VALOKUVA = (osoite) => osoite.pathname.includes('/assets/valokuvat/');

/*
 * Äänten ajonaikainen välimuisti (omistajan linjaus 16.8.2026).
 *
 * Oma kori, jota versionvaihto ei tyhjennä — kuten kuvilla. Äänet ovat
 * kuvia isompia eivätkä vanhene version mukana: kerran kuultu luenta ei
 * saa latautua uudelleen joka päivityksellä.
 *
 * Kori on kuvista ERILLÄÄN tarkoituksella. Luennat ovat satoja
 * kilotavuja kappale, ja jos selaimen kiintiö täyttyy, kaadettavaksi
 * pitää voida valita se kori, joka ei riko lehtien ulkoasua.
 *
 * Uusiksi äänitetty tiedosto EI vaadi korin numeron nostoa: js/media.js
 * UUSITUT_AANET antaa sille uuden kyselyversio-osoitteen, jolloin vain
 * se latautuu uudelleen — koko korin kaataminen latauttaisi kaikki
 * kuullut luennat kaikilla pelaajilla turhaan.
 */
const AANICACHE = 'matkakirja-aanet-v1';

/**
 * Osittaisvastaus (206) välimuistista noudetusta kokonaisesta äänestä.
 *
 * TÄMÄ ON KORIN EHTO, EI KORISTE. Cache API EI OTA VASTAAN 206-vastausta
 * (`cache.put` hylkää sen), ja juuri sellaisen <audio>-elementti yleensä
 * pyytää: Safari lähettää Range-otsakkeen aina, Chrome useimmiten.
 * Ilman tätä koria ei siis koskaan täyttyisi — tai jos täyttyisi, siitä
 * tarjottu 200-vastaus katkaisisi selaimen kelauksen. Siksi verkosta
 * haetaan aina koko tiedosto, ja pala leikataan täällä.
 *
 * Tuntematon tai kelvoton alue palauttaa koko vastauksen; se on
 * laillinen vastaus Range-pyyntöön eikä jätä ääntä soimatta.
 */
async function aaniPalanen(vastaus, alue) {
  const tavut = await vastaus.clone().arrayBuffer();
  const osuma = /^bytes=(\d*)-(\d*)$/.exec(alue.trim());
  if (!osuma || (osuma[1] === '' && osuma[2] === '')) return vastaus;
  const koko = tavut.byteLength;
  // "bytes=-500" tarkoittaa viimeistä 500 tavua, ei alkua 0.
  const alku = osuma[1] === '' ? Math.max(0, koko - Number(osuma[2])) : Number(osuma[1]);
  const loppu = osuma[1] === '' || osuma[2] === ''
    ? koko - 1
    : Math.min(Number(osuma[2]), koko - 1);
  if (!Number.isFinite(alku) || alku > loppu || alku >= koko) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${koko}` },
    });
  }
  const pala = tavut.slice(alku, loppu + 1);
  return new Response(pala, {
    status: 206,
    statusText: 'Partial Content',
    headers: {
      'Content-Type': vastaus.headers.get('Content-Type') ?? 'audio/mpeg',
      'Content-Length': String(pala.byteLength),
      'Content-Range': `bytes ${alku}-${loppu}/${koko}`,
      'Accept-Ranges': 'bytes',
    },
  });
}

/**
 * Ääni peilistä: välimuisti ensin, talletus ensimmäisellä kuuntelulla.
 *
 * Nouto tehdään ILMAN pyynnön omaa Range-otsaketta ja CORS-tilassa —
 * vain kokonainen, läpinäkyvä 200-vastaus kelpaa koriin. Jos CORS ei
 * onnistu (peli avattu muualta kuin ravelius.github.io:sta, tai ämpärin
 * sääntö on poistettu), pyyntö menee läpi sellaisenaan eikä mitään
 * talleteta: ääni soi, mutta vasta verkon kautta.
 */
async function aaniPeilista(pyynto) {
  const kori = await caches.open(AANICACHE);
  const alue = pyynto.headers.get('range');
  let vastaus = await kori.match(pyynto.url);
  if (!vastaus) {
    const haettu = await fetch(pyynto.url, { mode: 'cors' }).catch(() => null);
    if (!haettu || !haettu.ok || haettu.status !== 200) {
      return fetch(pyynto).catch(() => haettu ?? Response.error());
    }
    // Kiintiön täyttyminen ei saa jättää ääntä soimatta: talletus on
    // pelkkää nopeutta, ja vastaus palautetaan joka tapauksessa.
    await kori.put(pyynto.url, haettu.clone()).catch(() => {});
    vastaus = haettu;
  }
  return alue ? aaniPalanen(vastaus, alue) : vastaus;
}

/*
 * ERILLINEN TYÖHUONESIVUSTO ON POISTETTU (18.8.2026).
 *
 * Tässä oli oma verkko-ensin-strategiansa tyohuone.html:lle ja sen
 * moduuleille: kaksi sovellusta jakoi yhden palvelutyöntekijän, koska
 * sama laajuus ei voi kuulua kahdelle. Sivusto purettiin ja työhuone
 * elää nyt pelin sisällä kehittäjävivun takana (Raamattu-, Tilanne-,
 * Tilastot- ja Lukijoilta-lehdet), joten js/tyohuone-*.js ovat pelin
 * omia moduuleja ja kuuluvat SHELLiin kuten muutkin — välimuisti
 * ensin, jotta peli käynnistyy lentokoneessa.
 */

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE && k !== KUVACACHE && k !== AANICACHE
          // Lukijaäänen pysyvät säilöt (js/puhe.js) eivät ole tämän
          // workerin omia — siivous ei saa tuhota niitä versionvaihdossa.
          && !k.startsWith('matkakirja-puhe-')).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Välimuisti ensin, päivitys taustalla: peli aukeaa heti ja toimii offline,
// mutta uusi versio latautuu taustalla ja on käytössä seuraavalla avauksella.
// Yläpalkin Päivitä-nappi tyhjentää välimuistin, jolloin uusin versio tulee heti.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const osoite = new URL(event.request.url);
  // Ulkoisista kutsuista välimuistitetaan vain wikikuvat (kuva kerran
  // nähtynä latautuu heti ja toimii offline). Muut ulkoiset kutsut
  // (esim. Wikipedian tiivistelmä-JSON) menevät suoraan verkkoon.
  if (osoite.origin !== self.location.origin) {
    // Peili (Cloudflare R2 -ämpäri) on ensisijainen kuvalähde, Commons
    // ja upload.wikimedia.org varareittejä. Kaikki kolme kuuluvat samaan
    // koriin, jotta kerran nähty kuva toimii offline riippumatta siitä,
    // kummasta se sillä kertaa tuli.
    //
    // Ämpärin osoite tunnistetaan päätteestä eikä koko nimestä: sama
    // sääntö kestää sen, että ämpärin eteen laitetaan joskus oma
    // verkkotunnus. Ehto on silti tiukka, koska destination === 'image'
    // rajaa jo valmiiksi vain kuviin.
    //
    // Äänet ovat oma haaransa heti kuvien jälkeen: ne tarvitsevat
    // Range-käsittelyn (ks. aaniPalanen), jota kuvat eivät tarvitse.
    const kuvalahde = event.request.destination === 'image'
      && (osoite.hostname === 'upload.wikimedia.org'
        || (osoite.hostname === 'commons.wikimedia.org'
          && osoite.pathname.startsWith('/wiki/Special:FilePath/'))
        || (osoite.hostname.endsWith('.r2.dev')
          && /^\/(kuvat|liput)\//.test(osoite.pathname)));
    if (kuvalahde) {
      /*
       * CORS-nouto vain sinne, mistä sen tiedetään onnistuvan.
       *
       * Wikimedia lähettää Access-Control-Allow-Origin: *, joten sieltä
       * vastaus on tavallinen (ei opaakki) ja kelpaa koriin sellaisenaan.
       *
       * Peili (R2:n oma pub-*.r2.dev-osoite) EI lähetä sitä otsaketta.
       * Sinne tehty { mode: 'cors' } -nouto hylätään aina — ja juuri niin
       * kävi: jokainen peilikuva epäonnistui palvelutyöntekijässä, ja peli
       * eli koko ajan Commons-varareitin varassa. Yksittäinen kuva näytti
       * silti toimivan, joten vika ei näkynyt mistään — paitsi silloin kun
       * kuvia pyydettiin monta kerralla ja Commons alkoi rajoittaa: silloin
       * pino jäi tyhjäksi tai kuva rikkinäiseksi.
       *
       * Peilille tehdään siis pyyntö sellaisenaan (kuvan oma no-cors),
       * jolloin se onnistuu. Vastausta ei panna koriin: opaakki vastaus
       * vie selaimen kiintiölaskennassa moninkertaisen tilan todelliseen
       * kokoonsa nähden, ja peilin kuvilla on 30 vuorokauden
       * Cache-Control, jonka selaimen oma välimuisti hoitaa.
       *
       * Offline-tuen saa takaisin lisäämällä ämpäriin CORS-säännön
       * (Cloudflare: R2 > Settings > CORS policy, AllowedOrigins *).
       * Silloin tämän ehdon voi poistaa.
       *
       * ── PÄIVITYS 6.8.2026: ÄMPÄRISSÄ ON NYT CORS-SÄÄNTÖ ──
       *
       * Tarkistettu vastauksen otsakkeista: kun pyyntö tulee osoitteesta
       * https://ravelius.github.io, ämpäri vastaa
       * `access-control-allow-origin: https://ravelius.github.io`.
       * Peilikuvat voidaan siis panna koriin siinä missä Commonsinkin.
       *
       * Se ei ole pelkkä offline-parannus vaan korjaus toistuvaan
       * vikaan: r2.dev on Cloudflaren rajoitettu kehitysosoite, ja
       * lehden kansi pyytää kymmeniä kuvia kerralla. Kun mitään ei
       * säilötty, joka avaus oli uusi purske — ja purske laukaisi
       * katkaisijan (js/media.js), jolloin kuvat jäivät rikki. Kerran
       * nähty kuva ei enää lähde verkkoon lainkaan.
       *
       * CORS-nouto YRITETÄÄN ensin ja tavallinen nouto jää varareitiksi.
       * Näin peli toimii yhä sellaisenaan muualta avattuna (yhden
       * tiedoston versio levyltä, oma verkkotunnus), jolloin ämpärin
       * sääntö ei osu pyyntöön: silloin kuva haetaan kuten ennenkin
       * eikä sitä säilötä.
       */
      event.respondWith(
        caches.open(KUVACACHE).then(async (kuvat) => {
          const osuma = await kuvat.match(event.request.url);
          if (osuma) return osuma;
          const vastaus = await fetch(event.request.url, { mode: 'cors' }).catch(() => null);
          if (vastaus && vastaus.ok) {
            kuvat.put(event.request.url, vastaus.clone());
            return vastaus;
          }
          /*
           * CORS ei onnistunut. Kuvan oma no-cors-pyyntö menee silti
           * läpi — vastaus on opaakki eikä kelpaa koriin, mutta kuva
           * näkyy. Tämä on sama reitti kuin ennen tätä muutosta.
           */
          return fetch(event.request).catch(() => vastaus ?? Response.error());
        }),
      );
      return;
    }
    /*
     * Peilin omat äänitiedostot (audio/): välimuisti ensin, talletus
     * ensimmäisellä kuuntelulla. Ämpärissä on kaksi äänikansiota ja
     * molemmat kuuluvat tänne — audio/ on pelin oma äänite (luenta,
     * musiikki, viritysääni) ja aanet/ ulkopuolelta peilattu
     * äänimaisema. Ne käyttäytyvät soitossa samoin, joten myös
     * välimuistin on kohdeltava niitä samoin.
     */
    if (osoite.hostname.endsWith('.r2.dev') && /^\/(?:audio|aanet)\//.test(osoite.pathname)) {
      event.respondWith(aaniPeilista(event.request));
      return;
    }
    return;
  }
  // Repon omat valokuvat: sama kori kuin wikikuvilla, jotta ne eivät
  // katoa versiopäivityksessä. Välimuisti ensin, verkko vasta jos kuvaa
  // ei ole vielä nähty.
  if (OMA_VALOKUVA(osoite)) {
    event.respondWith(
      caches.open(KUVACACHE).then(async (kuvat) => {
        const osuma = await kuvat.match(event.request.url);
        if (osuma) return osuma;
        const vastaus = await fetch(event.request).catch(() => null);
        if (vastaus && vastaus.ok) kuvat.put(event.request.url, vastaus.clone());
        return vastaus ?? Response.error();
      }),
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((hit) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => hit ?? caches.match('./index.html'));
      return hit ?? network;
    }),
  );
});
