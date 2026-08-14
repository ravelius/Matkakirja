// Palvelutyöntekijä: pelin tiedostot välimuistiin, jotta sovellus toimii myös offline.
const CACHE = 'matkakirja-2026-08-09.661';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/muutokset.js',
  './js/main.js',
  './js/ui.js',
  './js/lukija.js',
  './js/pollo.js',
  './js/puhe.js',
  './js/pollo-haku.js',
  './js/game.js',
  './js/ai.js',
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
  './js/packs/asia-saapumiset.js',
  './js/packs/northamerica-saapumiset.js',
  './js/packs/southamerica-saapumiset.js',
  './js/packs/oceania-saapumiset.js',
  './js/packs/asia-artikkelit.js',
  './js/packs/asia-valokuvat.js',
  './js/packs/asia-lisat-valokuvat.js',
  './js/packs/northamerica-valokuvat.js',
  './js/packs/southamerica-valokuvat.js',
  './js/packs/oceania-valokuvat.js',
  './js/packs/asia-maatiedot.js',
  './js/packs/radiot.js',
  './js/packs/europe-kulttuuri.js',
  './js/packs/kulttuuri-kategoriat.js',
  './js/packs/maa-kategoriat.js',
  './js/packs/maakartat.js',
  './js/packs/nahtavyysjutut.js',
  './js/packs/henkilot.js',
  './js/packs/saatiedot.js',
  './js/packs/kohtaamiset.js',
  './js/packs/paivan-kuvat.js',
  './js/packs/uutislahteet.js',
  './js/packs/pollo-asetukset.js',
  './js/packs/europe-valokuvat.js',
  './js/packs/europe-kielet.js',
  './js/packs/europe-maatiedot.js',
  './js/packs/europe-artikkelit.js',
  './js/packs/middleeast.js',
  './js/packs/middleeast-countries.js',
  './js/packs/middleeast-questions.js',
  './js/packs/asia.js',
  './js/packs/asia-questions.js',
  './js/packs/oceania.js',
  './js/packs/oceania-questions.js',
  './js/packs/northamerica.js',
  './js/packs/northamerica-questions.js',
  './js/packs/southamerica.js',
  './js/packs/southamerica-questions.js',
  './js/packs/istanbul.js',
  './js/packs/suomi.js',
  './js/packs/suomi-questions.js',
  './js/packs/istanbul-questions.js',
  './js/tokens.js',
  './js/mapart.js',
  './js/aani-ehdokkaat.js',
  './js/sound.js',
  './js/ambience-stream.js',
  './js/die.js',
  './assets/icon.svg',
  './assets/logo.png',
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
  // Aarrelöydön huudahdukset ääneen (sama repliikki kuin kortilla).
  './assets/audio/huudahdus-300-1.mp3',
  './assets/audio/huudahdus-300-2.mp3',
  './assets/audio/huudahdus-300-3.mp3',
  './assets/audio/huudahdus-300-4.mp3',
  './assets/audio/huudahdus-600-1.mp3',
  './assets/audio/huudahdus-600-2.mp3',
  './assets/audio/huudahdus-600-3.mp3',
  './assets/audio/huudahdus-600-4.mp3',
  './assets/audio/huudahdus-1000-1.mp3',
  './assets/audio/huudahdus-1000-2.mp3',
  './assets/audio/huudahdus-1000-3.mp3',
  './assets/audio/huudahdus-1000-4.mp3',
  './assets/audio/huudahdus-star-1.mp3',
  './assets/audio/huudahdus-star-2.mp3',
  './assets/audio/huudahdus-star-3.mp3',
  // Kohtaamiskuvat (kohtaamiskortti + kätkötulos, pilotti 10.8.2026).
  './assets/kohtaamiset/kohtaaminen-ateena.jpg',
  './assets/kohtaamiset/kohtaaminen-sofia.jpg',
  './assets/kohtaamiset/kohtaaminen-katko.jpg',
  // AI-generoidut aarrekuvat (paljastuskortti) — 21 kpl, 7 lautaa.
  './assets/aarteet/aarre-europe-ruby.jpg',
  './assets/aarteet/aarre-europe-emerald.jpg',
  './assets/aarteet/aarre-europe-topaz.jpg',
  './assets/aarteet/aarre-africa-ruby.jpg',
  './assets/aarteet/aarre-africa-emerald.jpg',
  './assets/aarteet/aarre-africa-topaz.jpg',
  './assets/aarteet/aarre-middleeast-ruby.jpg',
  './assets/aarteet/aarre-middleeast-emerald.jpg',
  './assets/aarteet/aarre-middleeast-topaz.jpg',
  './assets/aarteet/aarre-asia-ruby.jpg',
  './assets/aarteet/aarre-asia-emerald.jpg',
  './assets/aarteet/aarre-asia-topaz.jpg',
  './assets/aarteet/aarre-northamerica-ruby.jpg',
  './assets/aarteet/aarre-northamerica-emerald.jpg',
  './assets/aarteet/aarre-northamerica-topaz.jpg',
  './assets/aarteet/aarre-southamerica-ruby.jpg',
  './assets/aarteet/aarre-southamerica-emerald.jpg',
  './assets/aarteet/aarre-southamerica-topaz.jpg',
  './assets/aarteet/aarre-oceania-ruby.jpg',
  './assets/aarteet/aarre-oceania-emerald.jpg',
  './assets/aarteet/aarre-oceania-topaz.jpg',
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
  './assets/kartat/berliini-keskusta.png',
  // Saman kartan satelliittinäkymä (kartan vipu) — offline sekin.
  './assets/kartat/berliini-satelliitti.jpg',
  './assets/kartat/kairo-keskusta.png',
  './assets/kartat/lontoo-keskusta.png',
  './assets/kartat/madrid-keskusta.png',
  './assets/kartat/tukholma-keskusta.png',
  './assets/kartat/venetsia-keskusta.png',
  './assets/audio/intro-puhe.mp3',
  // Tarinakaaren luennat (saapuminen/kohtaaminen/aarre × 41 kohdetta).
  './assets/audio/puhe-kaari-aarre-alpit.mp3',
  './assets/audio/puhe-kaari-aarre-amsterdam.mp3',
  './assets/audio/puhe-kaari-aarre-ateena.mp3',
  './assets/audio/puhe-kaari-aarre-barcelona.mp3',
  './assets/audio/puhe-kaari-aarre-berliini.mp3',
  './assets/audio/puhe-kaari-aarre-budapest.mp3',
  './assets/audio/puhe-kaari-aarre-bukarest.mp3',
  './assets/audio/puhe-kaari-aarre-dublin.mp3',
  './assets/audio/puhe-kaari-aarre-dubrovnik.mp3',
  './assets/audio/puhe-kaari-aarre-edinburgh.mp3',
  './assets/audio/puhe-kaari-aarre-granada.mp3',
  './assets/audio/puhe-kaari-aarre-helsinki.mp3',
  './assets/audio/puhe-kaari-aarre-islanti.mp3',
  './assets/audio/puhe-kaari-aarre-istanbul.mp3',
  './assets/audio/puhe-kaari-aarre-kiova.mp3',
  './assets/audio/puhe-kaari-aarre-kobenhavn.mp3',
  './assets/audio/puhe-kaari-aarre-krakova.mp3',
  './assets/audio/puhe-kaari-aarre-kreeta.mp3',
  './assets/audio/puhe-kaari-aarre-lappi.mp3',
  './assets/audio/puhe-kaari-aarre-lissabon.mp3',
  './assets/audio/puhe-kaari-aarre-lontoo.mp3',
  './assets/audio/puhe-kaari-aarre-madrid.mp3',
  './assets/audio/puhe-kaari-aarre-marseille.mp3',
  './assets/audio/puhe-kaari-aarre-moskova.mp3',
  './assets/audio/puhe-kaari-aarre-odessa.mp3',
  './assets/audio/puhe-kaari-aarre-oslo.mp3',
  './assets/audio/puhe-kaari-aarre-pariisi.mp3',
  './assets/audio/puhe-kaari-aarre-pietari.mp3',
  './assets/audio/puhe-kaari-aarre-praha.mp3',
  './assets/audio/puhe-kaari-aarre-riika.mp3',
  './assets/audio/puhe-kaari-aarre-rooma.mp3',
  './assets/audio/puhe-kaari-aarre-sarajevo.mp3',
  './assets/audio/puhe-kaari-aarre-sisilia.mp3',
  './assets/audio/puhe-kaari-aarre-sofia.mp3',
  './assets/audio/puhe-kaari-aarre-tallinna.mp3',
  './assets/audio/puhe-kaari-aarre-tromssa.mp3',
  './assets/audio/puhe-kaari-aarre-tukholma.mp3',
  './assets/audio/puhe-kaari-aarre-varsova.mp3',
  './assets/audio/puhe-kaari-aarre-venetsia.mp3',
  './assets/audio/puhe-kaari-aarre-vilna.mp3',
  './assets/audio/puhe-kaari-aarre-wien.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-alpit.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-amsterdam.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-ateena.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-barcelona.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-berliini.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-budapest.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-bukarest.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-dublin.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-dubrovnik.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-edinburgh.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-granada.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-helsinki.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-islanti.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-istanbul.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-kiova.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-kobenhavn.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-krakova.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-kreeta.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-lappi.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-lissabon.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-lontoo.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-madrid.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-marseille.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-moskova.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-odessa.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-oslo.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-pariisi.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-pietari.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-praha.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-riika.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-rooma.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-sarajevo.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-sisilia.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-sofia.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-tallinna.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-tromssa.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-tukholma.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-varsova.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-venetsia.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-vilna.mp3',
  './assets/audio/puhe-kaari-kohtaaminen-wien.mp3',
  './assets/audio/puhe-kaari-saapuminen-alpit.mp3',
  './assets/audio/puhe-kaari-saapuminen-amsterdam.mp3',
  './assets/audio/puhe-kaari-saapuminen-ateena.mp3',
  './assets/audio/puhe-kaari-saapuminen-barcelona.mp3',
  './assets/audio/puhe-kaari-saapuminen-berliini.mp3',
  './assets/audio/puhe-kaari-saapuminen-budapest.mp3',
  './assets/audio/puhe-kaari-saapuminen-bukarest.mp3',
  './assets/audio/puhe-kaari-saapuminen-dublin.mp3',
  './assets/audio/puhe-kaari-saapuminen-dubrovnik.mp3',
  './assets/audio/puhe-kaari-saapuminen-edinburgh.mp3',
  './assets/audio/puhe-kaari-saapuminen-granada.mp3',
  './assets/audio/puhe-kaari-saapuminen-helsinki.mp3',
  './assets/audio/puhe-kaari-saapuminen-islanti.mp3',
  './assets/audio/puhe-kaari-saapuminen-istanbul.mp3',
  './assets/audio/puhe-kaari-saapuminen-kiova.mp3',
  './assets/audio/puhe-kaari-saapuminen-kobenhavn.mp3',
  './assets/audio/puhe-kaari-saapuminen-krakova.mp3',
  './assets/audio/puhe-kaari-saapuminen-kreeta.mp3',
  './assets/audio/puhe-kaari-saapuminen-lappi.mp3',
  './assets/audio/puhe-kaari-saapuminen-lissabon.mp3',
  './assets/audio/puhe-kaari-saapuminen-lontoo.mp3',
  './assets/audio/puhe-kaari-saapuminen-madrid.mp3',
  './assets/audio/puhe-kaari-saapuminen-marseille.mp3',
  './assets/audio/puhe-kaari-saapuminen-moskova.mp3',
  './assets/audio/puhe-kaari-saapuminen-odessa.mp3',
  './assets/audio/puhe-kaari-saapuminen-oslo.mp3',
  './assets/audio/puhe-kaari-saapuminen-pariisi.mp3',
  './assets/audio/puhe-kaari-saapuminen-pietari.mp3',
  './assets/audio/puhe-kaari-saapuminen-praha.mp3',
  './assets/audio/puhe-kaari-saapuminen-riika.mp3',
  './assets/audio/puhe-kaari-saapuminen-rooma.mp3',
  './assets/audio/puhe-kaari-saapuminen-sarajevo.mp3',
  './assets/audio/puhe-kaari-saapuminen-sisilia.mp3',
  './assets/audio/puhe-kaari-saapuminen-sofia.mp3',
  './assets/audio/puhe-kaari-saapuminen-tallinna.mp3',
  './assets/audio/puhe-kaari-saapuminen-tromssa.mp3',
  './assets/audio/puhe-kaari-saapuminen-tukholma.mp3',
  './assets/audio/puhe-kaari-saapuminen-varsova.mp3',
  './assets/audio/puhe-kaari-saapuminen-venetsia.mp3',
  './assets/audio/puhe-kaari-saapuminen-vilna.mp3',
  './assets/audio/puhe-kaari-saapuminen-wien.mp3',
  './assets/audio/puhe-lento-alku.mp3',
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
  './assets/audio/efekti-kenka.mp3',
  './assets/audio/efekti-rosvo.mp3',
  './assets/audio/efekti-tyhja.mp3',
  './assets/audio/efekti-jumissa.mp3',
  './assets/audio/efekti-vuoro.mp3',
  './assets/audio/efekti-voitto.mp3',
  // Maailmanradion viritysäänet (js/packs/viritysaanet.js). Nämä tulevat
  // koriin, vaikka itse lähetystä ei offline saakaan: soitin näyttää ja
  // kuulostaa oikealta siihen asti, että se toteaa verkon puuttuvan.
  './assets/audio/viritys-taajuustungos.mp3',
  './assets/audio/viritys-raskaskohina.mp3',
  './assets/audio/viritys-tyhjakaista.mp3',
  './assets/audio/viritys-datasignaali.mp3',
  './assets/audio/viritys-asteikonpaa.mp3',
  './assets/audio/musiikki-visa-afrikka-1.mp3',
  './assets/audio/musiikki-visa-afrikka-2.mp3',
  './assets/audio/musiikki-visa-afrikka-3.mp3',
  './assets/audio/puhe-africa-saapuminen-tanger.mp3',
  './assets/audio/puhe-europe-saapuminen-ateena.mp3',
  './assets/audio/puhe-europe-saapuminen-alpit.mp3',
  './assets/audio/puhe-europe-saapuminen-amsterdam.mp3',
  './assets/audio/puhe-europe-saapuminen-barcelona.mp3',
  './assets/audio/puhe-europe-saapuminen-berliini.mp3',
  './assets/audio/puhe-europe-saapuminen-budapest.mp3',
  './assets/audio/puhe-europe-saapuminen-bukarest.mp3',
  './assets/audio/puhe-europe-saapuminen-dublin.mp3',
  './assets/audio/puhe-europe-saapuminen-edinburgh.mp3',
  // Isoisän visa- ja aarresitaatit (pilotti: 4 kaupunkia).
  './assets/audio/puhe-europe-saapuminen-granada.mp3',
  './assets/audio/puhe-europe-saapuminen-helsinki.mp3',
  './assets/audio/puhe-europe-saapuminen-islanti.mp3',
  './assets/audio/puhe-europe-saapuminen-istanbul.mp3',
  './assets/audio/puhe-europe-saapuminen-kiova.mp3',
  './assets/audio/puhe-europe-saapuminen-kobenhavn.mp3',
  './assets/audio/puhe-europe-saapuminen-krakova.mp3',
  './assets/audio/puhe-europe-saapuminen-lappi.mp3',
  './assets/audio/puhe-europe-saapuminen-lissabon.mp3',
  './assets/audio/puhe-europe-saapuminen-madrid.mp3',
  './assets/audio/puhe-europe-saapuminen-marseille.mp3',
  './assets/audio/puhe-europe-saapuminen-moskova.mp3',
  './assets/audio/puhe-europe-saapuminen-odessa.mp3',
  './assets/audio/puhe-europe-saapuminen-oslo.mp3',
  './assets/audio/puhe-europe-saapuminen-pietari.mp3',
  './assets/audio/puhe-europe-saapuminen-praha.mp3',
  './assets/audio/puhe-europe-saapuminen-riika.mp3',
  './assets/audio/puhe-europe-saapuminen-sarajevo.mp3',
  './assets/audio/puhe-europe-saapuminen-tallinna.mp3',
  './assets/audio/puhe-europe-saapuminen-tromssa.mp3',
  './assets/audio/puhe-europe-saapuminen-tukholma.mp3',
  './assets/audio/puhe-europe-saapuminen-varsova.mp3',
  './assets/audio/puhe-europe-saapuminen-vilna.mp3',
  './assets/audio/puhe-europe-saapuminen-wien.mp3',
  './assets/audio/puhe-europe-saapuminen-dubrovnik.mp3',
  './assets/audio/puhe-europe-saapuminen-kreeta.mp3',
  './assets/audio/puhe-europe-saapuminen-lontoo.mp3',
  './assets/audio/puhe-europe-saapuminen-pariisi.mp3',
  './assets/audio/puhe-europe-saapuminen-rooma.mp3',
  './assets/audio/puhe-europe-saapuminen-sisilia.mp3',
  './assets/audio/puhe-europe-saapuminen-sofia.mp3',
  './assets/audio/puhe-europe-saapuminen-venetsia.mp3',
  './assets/audio/puhe-middleeast-saapuminen-aden.mp3',
  './assets/audio/puhe-middleeast-saapuminen-ankara.mp3',
  './assets/audio/puhe-middleeast-saapuminen-bagdad.mp3',
  './assets/audio/puhe-middleeast-saapuminen-damaskos.mp3',
  './assets/audio/puhe-middleeast-saapuminen-doha.mp3',
  './assets/audio/puhe-middleeast-saapuminen-dubai.mp3',
  './assets/audio/puhe-middleeast-saapuminen-halab.mp3',
  './assets/audio/puhe-middleeast-saapuminen-isfahan.mp3',
  './assets/audio/puhe-middleeast-saapuminen-izmir.mp3',
  './assets/audio/puhe-middleeast-saapuminen-jerusalem.mp3',
  './assets/audio/puhe-middleeast-saapuminen-kapadokia.mp3',
  './assets/audio/puhe-middleeast-saapuminen-kuwait.mp3',
  './assets/audio/puhe-middleeast-saapuminen-luxor.mp3',
  './assets/audio/puhe-middleeast-saapuminen-masqat.mp3',
  './assets/audio/puhe-middleeast-saapuminen-medina.mp3',
  './assets/audio/puhe-middleeast-saapuminen-mekka.mp3',
  './assets/audio/puhe-middleeast-saapuminen-mosul.mp3',
  './assets/audio/puhe-middleeast-saapuminen-nikosia.mp3',
  './assets/audio/puhe-middleeast-saapuminen-persepolis.mp3',
  './assets/audio/puhe-middleeast-saapuminen-petra.mp3',
  './assets/audio/puhe-middleeast-saapuminen-riad.mp3',
  './assets/audio/puhe-middleeast-saapuminen-rubalkhali.mp3',
  './assets/audio/puhe-middleeast-saapuminen-salalah.mp3',
  './assets/audio/puhe-middleeast-saapuminen-sana.mp3',
  './assets/audio/puhe-middleeast-saapuminen-siinai.mp3',
  './assets/audio/puhe-middleeast-saapuminen-tabriz.mp3',
  './assets/audio/puhe-middleeast-saapuminen-teheran.mp3',
  './assets/audio/puhe-asia-saapuminen-borneo.mp3',
  './assets/audio/puhe-asia-saapuminen-chennai.mp3',
  './assets/audio/puhe-asia-saapuminen-colombo.mp3',
  './assets/audio/puhe-asia-saapuminen-delhi.mp3',
  './assets/audio/puhe-asia-saapuminen-jakarta.mp3',
  './assets/audio/puhe-asia-saapuminen-kabul.mp3',
  './assets/audio/puhe-asia-saapuminen-karachi.mp3',
  './assets/audio/puhe-asia-saapuminen-kathmandu.mp3',
  './assets/audio/puhe-asia-saapuminen-kolkata.mp3',
  './assets/audio/puhe-asia-saapuminen-mumbai.mp3',
  './assets/audio/puhe-asia-saapuminen-singapore.mp3',
  './assets/audio/puhe-asia-saapuminen-sumatra.mp3',
  './assets/audio/puhe-asia-saapuminen-yangon.mp3',
  './assets/audio/puhe-northamerica-saapuminen-anchorage.mp3',
  './assets/audio/puhe-northamerica-saapuminen-appalakit.mp3',
  './assets/audio/puhe-northamerica-saapuminen-bermuda.mp3',
  './assets/audio/puhe-northamerica-saapuminen-chicago.mp3',
  './assets/audio/puhe-northamerica-saapuminen-churchill.mp3',
  './assets/audio/puhe-northamerica-saapuminen-denver.mp3',
  './assets/audio/puhe-northamerica-saapuminen-grandcanyon.mp3',
  './assets/audio/puhe-northamerica-saapuminen-guatemala.mp3',
  './assets/audio/puhe-northamerica-saapuminen-halifax.mp3',
  './assets/audio/puhe-northamerica-saapuminen-havanna.mp3',
  './assets/audio/puhe-northamerica-saapuminen-hawaii.mp3',
  './assets/audio/puhe-northamerica-saapuminen-houston.mp3',
  './assets/audio/puhe-northamerica-saapuminen-iqaluit.mp3',
  './assets/audio/puhe-northamerica-saapuminen-labrador.mp3',
  './assets/audio/puhe-northamerica-saapuminen-losangeles.mp3',
  './assets/audio/puhe-northamerica-saapuminen-managua.mp3',
  './assets/audio/puhe-northamerica-saapuminen-merida.mp3',
  './assets/audio/puhe-northamerica-saapuminen-mexico.mp3',
  './assets/audio/puhe-northamerica-saapuminen-miami.mp3',
  './assets/audio/puhe-northamerica-saapuminen-monterrey.mp3',
  './assets/audio/puhe-northamerica-saapuminen-montreal.mp3',
  './assets/audio/puhe-northamerica-saapuminen-mountrushmore.mp3',
  './assets/audio/puhe-northamerica-saapuminen-neworleans.mp3',
  './assets/audio/puhe-northamerica-saapuminen-newyork.mp3',
  './assets/audio/puhe-northamerica-saapuminen-nome.mp3',
  './assets/audio/puhe-northamerica-saapuminen-nuuk.mp3',
  './assets/audio/puhe-northamerica-saapuminen-panama.mp3',
  './assets/audio/puhe-northamerica-saapuminen-sanfrancisco.mp3',
  './assets/audio/puhe-northamerica-saapuminen-sanjuan.mp3',
  './assets/audio/puhe-northamerica-saapuminen-santafe.mp3',
  './assets/audio/puhe-northamerica-saapuminen-stjohns.mp3',
  './assets/audio/puhe-northamerica-saapuminen-toronto.mp3',
  './assets/audio/puhe-northamerica-saapuminen-vancouver.mp3',
  './assets/audio/puhe-northamerica-saapuminen-whitehorse.mp3',
  './assets/audio/puhe-northamerica-saapuminen-winnipeg.mp3',
  './assets/audio/puhe-northamerica-saapuminen-yellowknife.mp3',
  './assets/audio/puhe-northamerica-saapuminen-yellowstone.mp3',
  './assets/audio/puhe-southamerica-saapuminen-antofagasta.mp3',
  './assets/audio/puhe-southamerica-saapuminen-asuncion.mp3',
  './assets/audio/puhe-southamerica-saapuminen-bananal.mp3',
  './assets/audio/puhe-southamerica-saapuminen-boavista.mp3',
  './assets/audio/puhe-southamerica-saapuminen-bogota.mp3',
  './assets/audio/puhe-southamerica-saapuminen-buenosaires.mp3',
  './assets/audio/puhe-southamerica-saapuminen-campogrande.mp3',
  './assets/audio/puhe-southamerica-saapuminen-caphorn.mp3',
  './assets/audio/puhe-southamerica-saapuminen-caracas.mp3',
  './assets/audio/puhe-southamerica-saapuminen-cayenne.mp3',
  './assets/audio/puhe-southamerica-saapuminen-falkland.mp3',
  './assets/audio/puhe-southamerica-saapuminen-galapagos.mp3',
  './assets/audio/puhe-southamerica-saapuminen-iguazu.mp3',
  './assets/audio/puhe-southamerica-saapuminen-iquitos.mp3',
  './assets/audio/puhe-southamerica-saapuminen-joaopessoa.mp3',
  './assets/audio/puhe-southamerica-saapuminen-lima.mp3',
  './assets/audio/puhe-southamerica-saapuminen-macapa.mp3',
  './assets/audio/puhe-southamerica-saapuminen-machupicchu.mp3',
  './assets/audio/puhe-southamerica-saapuminen-manaus.mp3',
  './assets/audio/puhe-southamerica-saapuminen-montevideo.mp3',
  './assets/audio/puhe-southamerica-saapuminen-portoalegre.mp3',
  './assets/audio/puhe-southamerica-saapuminen-portovelho.mp3',
  './assets/audio/puhe-southamerica-saapuminen-puertomontt.mp3',
  './assets/audio/puhe-southamerica-saapuminen-puntaarenas.mp3',
  './assets/audio/puhe-southamerica-saapuminen-quito.mp3',
  './assets/audio/puhe-southamerica-saapuminen-rio.mp3',
  './assets/audio/puhe-southamerica-saapuminen-robinsoncrusoe.mp3',
  './assets/audio/puhe-southamerica-saapuminen-salta.mp3',
  './assets/audio/puhe-southamerica-saapuminen-salvador.mp3',
  './assets/audio/puhe-southamerica-saapuminen-sanambrosio.mp3',
  './assets/audio/puhe-southamerica-saapuminen-santacruz.mp3',
  './assets/audio/puhe-southamerica-saapuminen-santarem.mp3',
  './assets/audio/puhe-southamerica-saapuminen-saoluis.mp3',
  './assets/audio/puhe-southamerica-saapuminen-saopaulo.mp3',
  './assets/audio/puhe-southamerica-saapuminen-titicaca.mp3',
  './assets/audio/puhe-southamerica-saapuminen-valparaiso.mp3',
  './assets/audio/puhe-oceania-saapuminen-adelaide.mp3',
  './assets/audio/puhe-oceania-saapuminen-alicesprings.mp3',
  './assets/audio/puhe-oceania-saapuminen-auckland.mp3',
  './assets/audio/puhe-oceania-saapuminen-bali.mp3',
  './assets/audio/puhe-oceania-saapuminen-birdsville.mp3',
  './assets/audio/puhe-oceania-saapuminen-brisbane.mp3',
  './assets/audio/puhe-oceania-saapuminen-broome.mp3',
  './assets/audio/puhe-oceania-saapuminen-cairns.mp3',
  './assets/audio/puhe-oceania-saapuminen-christchurch.mp3',
  './assets/audio/puhe-oceania-saapuminen-cooberpedy.mp3',
  './assets/audio/puhe-oceania-saapuminen-darwin.mp3',
  './assets/audio/puhe-oceania-saapuminen-dili.mp3',
  './assets/audio/puhe-oceania-saapuminen-exmouth.mp3',
  './assets/audio/puhe-oceania-saapuminen-geraldton.mp3',
  './assets/audio/puhe-oceania-saapuminen-hobart.mp3',
  './assets/audio/puhe-oceania-saapuminen-honiara.mp3',
  './assets/audio/puhe-oceania-saapuminen-kalgoorlie.mp3',
  './assets/audio/puhe-oceania-saapuminen-melbourne.mp3',
  './assets/audio/puhe-oceania-saapuminen-milfordsound.mp3',
  './assets/audio/puhe-oceania-saapuminen-mountisa.mp3',
  './assets/audio/puhe-oceania-saapuminen-norfolk.mp3',
  './assets/audio/puhe-oceania-saapuminen-noumea.mp3',
  './assets/audio/puhe-oceania-saapuminen-nullarbor.mp3',
  './assets/audio/puhe-oceania-saapuminen-perth.mp3',
  './assets/audio/puhe-oceania-saapuminen-portmoresby.mp3',
  './assets/audio/puhe-oceania-saapuminen-portvila.mp3',
  './assets/audio/puhe-oceania-saapuminen-sepik.mp3',
  './assets/audio/puhe-oceania-saapuminen-suva.mp3',
  './assets/audio/puhe-oceania-saapuminen-sydney.mp3',
  './assets/audio/puhe-oceania-saapuminen-townsville.mp3',
  './assets/audio/puhe-oceania-saapuminen-uluru.mp3',
  './assets/audio/puhe-oceania-saapuminen-wellington.mp3',
  './assets/audio/puhe-asia-saapuminen-astana.mp3',
  './assets/audio/puhe-asia-saapuminen-bangkok.mp3',
  './assets/audio/puhe-asia-saapuminen-hanoi.mp3',
  './assets/audio/puhe-asia-saapuminen-hongkong.mp3',
  './assets/audio/puhe-asia-saapuminen-irkutsk.mp3',
  './assets/audio/puhe-asia-saapuminen-jakutsk.mp3',
  './assets/audio/puhe-asia-saapuminen-jekaterinburg.mp3',
  './assets/audio/puhe-asia-saapuminen-kamtsatka.mp3',
  './assets/audio/puhe-asia-saapuminen-kashgar.mp3',
  './assets/audio/puhe-asia-saapuminen-lhasa.mp3',
  './assets/audio/puhe-asia-saapuminen-magadan.mp3',
  './assets/audio/puhe-asia-saapuminen-manila.mp3',
  './assets/audio/puhe-asia-saapuminen-novosibirsk.mp3',
  './assets/audio/puhe-asia-saapuminen-peking.mp3',
  './assets/audio/puhe-asia-saapuminen-sahalin.mp3',
  './assets/audio/puhe-asia-saapuminen-samarkand.mp3',
  './assets/audio/puhe-asia-saapuminen-shanghai.mp3',
  './assets/audio/puhe-asia-saapuminen-soul.mp3',
  './assets/audio/puhe-asia-saapuminen-taipei.mp3',
  './assets/audio/puhe-asia-saapuminen-tokio.mp3',
  './assets/audio/puhe-asia-saapuminen-ulanbator.mp3',
  './assets/audio/puhe-asia-saapuminen-vladivostok.mp3',
  './assets/audio/puhe-asia-saapuminen-xian.mp3',
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
  './assets/audio/puhe-africa-saapuminen-kairo.mp3',
  './assets/audio/puhe-africa-saapuminen-marrakech.mp3',
  './assets/audio/puhe-africa-saapuminen-lagos.mp3',
  './assets/audio/puhe-africa-saapuminen-karthago.mp3',
  './assets/audio/puhe-africa-saapuminen-tshadjarvi.mp3',
  './assets/audio/puhe-africa-saapuminen-viktorianputoukset.mp3',
  './assets/audio/puhe-africa-saapuminen-nairobi.mp3',
  './assets/audio/puhe-africa-saapuminen-sthelena.mp3',
  './assets/audio/puhe-africa-saapuminen-tripoli.mp3',
  './assets/audio/puhe-africa-saapuminen-murzuk.mp3',
  './assets/audio/puhe-africa-saapuminen-alkufra.mp3',
  './assets/audio/puhe-africa-saapuminen-sahara.mp3',
  './assets/audio/puhe-africa-saapuminen-ahaggar.mp3',
  './assets/audio/puhe-africa-saapuminen-timbuktu.mp3',
  './assets/audio/puhe-africa-saapuminen-gao.mp3',
  './assets/audio/puhe-africa-saapuminen-dakar.mp3',
  './assets/audio/puhe-africa-saapuminen-sierraleone.mp3',
  './assets/audio/puhe-africa-saapuminen-kappalmas.mp3',
  './assets/audio/puhe-africa-saapuminen-kumasi.mp3',
  './assets/audio/puhe-africa-saapuminen-orjarannikko.mp3',
  './assets/audio/puhe-africa-saapuminen-kano.mp3',
  './assets/audio/puhe-africa-saapuminen-kamerun.mp3',
  './assets/audio/puhe-africa-saapuminen-kongo.mp3',
  './assets/audio/puhe-africa-saapuminen-angola.mp3',
  './assets/audio/puhe-africa-saapuminen-namib.mp3',
  './assets/audio/puhe-africa-saapuminen-kapkaupunki.mp3',
  './assets/audio/puhe-africa-saapuminen-kimberley.mp3',
  './assets/audio/puhe-africa-saapuminen-mosambik.mp3',
  './assets/audio/puhe-africa-saapuminen-madagaskar.mp3',
  './assets/audio/puhe-africa-saapuminen-sansibar.mp3',
  './assets/audio/puhe-africa-saapuminen-kilimandzaro.mp3',
  './assets/audio/puhe-africa-saapuminen-viktoria.mp3',
  './assets/audio/puhe-africa-saapuminen-tanganjika.mp3',
  './assets/audio/puhe-africa-saapuminen-bahrelghazal.mp3',
  './assets/audio/puhe-africa-saapuminen-darfur.mp3',
  './assets/audio/puhe-africa-saapuminen-suakin.mp3',
  './assets/audio/puhe-africa-saapuminen-addisabeba.mp3',
  './assets/audio/puhe-africa-saapuminen-rashafun.mp3',
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
 * offline. Peli itse, äänet ja kartat haetaan yhä etukäteen.
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
 * Työhuoneen tiedostot — sama palvelutyöntekijä, eri strategia.
 *
 * Miksi yksi työntekijä kahdelle sovellukselle:
 *
 * Palvelutyöntekijän laajuus on sen oman hakemiston polku, ja sekä peli
 * että työhuone asuvat sivuston juuressa. Kaksi eri työntekijää samassa
 * laajuudessa EI toimi rinnakkain: jälkimmäinen rekisteröinti korvaa
 * edellisen. Peli ja työhuone siis vuorottelivat, ja jokainen vaihto
 * asensi työntekijän uudelleen.
 *
 * Näkyvät seuraukset olivat kaksi:
 *  1. Työhuoneessa vilkkui ikuisesti "uusi versio ladattu" -palkki,
 *     koska asennus alkoi joka avauksella alusta.
 *  2. Pelin offline-välimuisti tuhoutui aina kun työhuone avattiin —
 *     ja peli on julkaistu tuote, jonka pitää käynnistyä lentokoneessa.
 *
 * Jälkimmäinen oli vaarallisempi eikä näkynyt mitenkään.
 *
 * Strategiat pysyvät erillisinä: peli välimuisti ensin (aukeaa
 * lentokoneessa), työhuone verkko ensin (kertoo mikä pelissä juuri nyt
 * on, ja siinä vanha tieto on pahempi kuin hidas lataus).
 */
const TYOHUONE = (osoite) => /(?:^|\/)tyohuone(?:[-.]|$)/.test(osoite.pathname)
  || /\/(?:css|js)\/tyohuone-/.test(osoite.pathname);

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE && k !== KUVACACHE
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
    // Peilin äänet jäävät tarkoituksella pois: ne ovat satoja
    // megatavuja, ja selaimen oma välimuisti riittää niille.
    const kuvalahde = event.request.destination === 'image'
      && (osoite.hostname === 'upload.wikimedia.org'
        || (osoite.hostname === 'commons.wikimedia.org'
          && osoite.pathname.startsWith('/wiki/Special:FilePath/'))
        || (osoite.hostname.endsWith('.r2.dev')
          && /^\/(kuvat|liput)\//.test(osoite.pathname)));
    if (!kuvalahde) return;
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
  /*
   * Työhuone: verkko ensin, välimuisti vain turvaverkoksi.
   *
   * Vain onnistuneet vastaukset talteen. Ilman tätä 404-sivu jäisi
   * koriin ja näyttäisi ikuisesti siltä, ettei tiedostoa ole — vaikka
   * se olisi jo lisätty.
   */
  if (TYOHUONE(osoite)) {
    event.respondWith((async () => {
      try {
        /*
         * no-cache ohittaa selaimen http-välimuistin: GitHub Pages
         * antaa tiedostoille max-age=600, ja ilman tätä omistaja
         * näki jopa 10 minuuttia vanhaa työhuonetta heti julkaisun
         * jälkeen (havainto 8.8.2026). ETag-tarkistus pitää haun
         * kevyenä — muuttumaton tiedosto palaa 304:nä.
         */
        const vastaus = await fetch(event.request, { cache: 'no-cache' });
        if (vastaus && vastaus.ok) {
          const kopio = vastaus.clone();
          caches.open(CACHE).then((kori) => kori.put(event.request, kopio));
        }
        return vastaus;
      } catch (virhe) {
        const talletettu = await caches.match(event.request);
        if (talletettu) return talletettu;
        throw virhe;
      }
    })());
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
