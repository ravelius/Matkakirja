/*
 * SIIRRON KOREOGRAFIA — LAUTARIIPPUMATON OSA.
 *
 * Nappulan siirron ajoitus ja käyrät: hypyn lentoaika ja tauko,
 * jalkamatkan porrastettu askel, kameran trapetsipehmennys, saaton
 * kesto ja ennakkozoomin luvut. Nämä asuivat js/ui.js:ssä (rivit
 * 372–707 versiossa v1553) ja siirrettiin tänne SANATARKASTI
 * kommentteineen pallolaudan vaiheessa 2 (docs/moduulit/karttapallo.md
 * luku 7): tasokartta (js/ui.js animatePawnSisalla, js/kartta.js
 * ajaKamera) ja karttapallo (js/pallolauta/siirto.js,
 * js/pallolauta/kamera.js) lukevat SAMAT luvut ja SAMAN käyrän, joten
 * omistajan 2.9.2026 tilaama koreografia — kamera edellä, nappula
 * perässä, perille ennen — on kummallakin laudalla yksi ja sama.
 *
 * Tänne ei tule mitään, mikä tietää laudasta: ei SVG:tä, ei palloa, ei
 * DOM:ia. Lautakohtainen osa (nappulan poiminta, hyppy ruudulla,
 * laskeminen) on laudan oma kuljettaja (js/ui.js nappulanKuljettaja).
 * tests/siirtokoreografia.test.mjs vartioi, että luvut ja käyrä ovat
 * täsmälleen entiset; tests/siirtoajoitus.test.mjs vartioi suhteet.
 */

// Animaatioiden rytmi millisekunteina.

export const STEP_MS = 190; // yhden hypyn lentoaika kartalla
/*
 * NAPPULAN HYPPY (omistajan tilaus #100).
 *
 * `STEP_MS` on nyt HYPYN LENTOAIKA, ja tauko on oma lukunsa: askel
 * kestää yhteensä lento + tauko. Jako on tarkoituksellinen, koska
 * tulossa on erikseen hitaampi jalkamatkasiirtymä (#96) — silloin
 * riittää kasvattaa lentoaikaa (parametri `stepMs`), ja tauko pysyy
 * sinä pienenä hengähdyksenä, joka tekee liikkeestä siirretyn
 * pelinappulan eikä liukuvan pisteen.
 *
 * Kaaren korkeus laudan yksiköinä on suhteessa hypyn pituuteen, mutta
 * rajoissa: lyhyt askel ei saa jäädä litteäksi eikä pitkä (lento,
 * jossa askelia on yksi) kaartaa ruudun ulkopuolelle.
 */
export const HYPYN_TAUKO_MS = 190; // näkymätön käsi laskee nappulan ja tarttuu uudelleen
export const HYPYN_KAARI = 0.34; // kaaren huippu suhteessa hypyn pituuteen
export const HYPYN_KORKEUS_MIN = 9;
export const HYPYN_KORKEUS_MAX = 30;
/*
 * JALKAMATKAN OMA ASKEL (omistajan tilaus #96: *"Matkustusanimaatio
 * jalan saisi olla hitaampi."*).
 *
 * Muutos on täsmälleen se, jota #100 varautui: kasvatetaan HYPYN
 * LENTOAIKAA, ei taukoa. Tauko on se pieni hengähdys, joka tekee
 * liikkeestä siirretyn pelinappulan; jos sekin venyisi, jalkamatka
 * muuttuisi nykiväksi odotteluksi. Lento (STEP_MS, FLIGHT_MS,
 * MANNER_LENTO_MS) jää ennalleen — tilaus koski maareittejä.
 *
 * 190 → 640 ms eli 3,4×. Ensimmäinen yritys oli 340 ms (1,8×), mutta
 * omistajan pelitesti 27.8.2026 (iPhone) oikaisi sen: *"pelinappulan
 * etenemisvauhti pitäisi olla paljon hitaampi"* — paljon, ei vähän.
 * 640 ms on se aika, jossa silmä ehtii seurata yhden hypyn kaaren
 * alusta loppuun ja liike lukee käden siirroksi eikä lentoradaksi.
 *
 * VIELÄ HITAAMPI, MUTTA PORRASTETTUNA (omistajan tilaus 1.9.2026 ilta:
 * *"pelaajan nappulat saisi edetä vähän hitaammin"*).
 *
 * 640 → 860 ms eli 1,34×. "Vähän hitaammin" on tässä juuri se ero,
 * jonka silmä lukee rauhallisuudeksi eikä hitaudeksi: kaari nousee ja
 * laskee näkyvästi omassa ajassaan, mutta askel ei ala tuntua
 * pysähdykseltä. Tauko (HYPYN_TAUKO_MS) pysyy ennallaan — se on
 * käden hengähdys, ei vauhdin säädin.
 *
 * PORRASTUS ON PAKKO OLLA. Kuutosella hyppyjä on kuusi, ja pelkkä
 * kertoiminen tekisi matkasta 6 × 860 + 5 × 190 ≈ 6,1 s odottelua —
 * ja sen PÄÄLLE tulee vielä ennakkozoomi (ENNAKKOZOOMIN_MS). Siksi
 * askel lyhenee sitä mukaa kuin heitto pitenee: matkan hyppyihin ja
 * taukoihin varataan enintään JALKAMATKAN_KATTO_MS, ja pitkän heiton
 * askel kutistuu kattoon mahtuvaksi.
 *
 * ALARAJA ON VANHA ASKEL. Kutistus ei koskaan vie nopeammaksi kuin
 * ennen tätä muutosta (JALKAMATKAN_STEP_LYHIN_MS = 640), joten myös
 * pisin heitto on omistajan mittapuulla hitaampi kuin v1400-sarjan
 * peli — ei nopeampi. Käytännön luvut (tauko 190 ms):
 *
 *   1 askel  860 ms → matka 0,9 s
 *   3 askelta 860 ms → matka 3,0 s
 *   5 askelta 860 ms → matka 5,1 s
 *   6 askelta 708 ms → matka 5,2 s   (katto puree vasta tässä)
 */
export const JALKAMATKAN_STEP_MS = 860;
export const JALKAMATKAN_STEP_LYHIN_MS = 640;
export const JALKAMATKAN_KATTO_MS = 5200;

/**
 * Yhden hypyn lentoaika jalkamatkalla, kun matkassa on `askelia` hyppyä.
 *
 * Puhdas funktio ja tarkoituksella oma nimensä: tämä on se yksi paikka,
 * jossa askeltahdin porrastus lasketaan (ks. JALKAMATKAN_STEP_MS), ja
 * tests/siirtoajoitus.test.mjs vartioi sitä lukuina eikä lähdetekstinä.
 */
export function jalkamatkanAskel(askelia) {
  const n = Math.max(1, Math.round(askelia || 1));
  // Taukoja on yksi vähemmän kuin hyppyjä; katto koskee koko matkaa.
  const varattu = JALKAMATKAN_KATTO_MS - (n - 1) * HYPYN_TAUKO_MS;
  const mahtuva = varattu / n;
  return Math.round(Math.max(JALKAMATKAN_STEP_LYHIN_MS, Math.min(JALKAMATKAN_STEP_MS, mahtuva)));
}
/*
 * SAATTAVA KAMERA (omistajan tilaus #96: *"Kartta voisi samalla myös
 * hitaasti siirtyä uuteen kohteeseen ja paljastaa sitä näkyviin sitä
 * mukaa kun nappula etenee."*).
 *
 * Kamera ei seuraa nappulaa hypyittäin — se olisi nykivä, koska hyppy
 * on paraabeli ja välissä on tauko — vaan LIUKUU koko matkan ajan
 * kohti määränpäätä yhtenä ajona (js/kartta.js ajaKamera). Se on
 * samalla se tapa, jolla kohde "paljastuu sitä mukaa": uutta maastoa
 * tulee näkyviin ruudun reunasta täsmälleen sitä tahtia kuin nappula
 * etenee.
 *
 * KAMERA MENEE MYÖS LÄHEMMÄS (omistajan pelitesti 27.8.2026, iPhone:
 * *"kamera-animaatio ei seuraa järkevästi pelinappulaa. pitäisi olla
 * ainakin lähempänä jotta lauta liikkuisi enemmän"*).
 *
 * Ensimmäinen toteutus piti mittakaavan ennallaan ja siirsi vain
 * keskipistettä. Ongelma ei ollut liu'ussa vaan siinä, ETTEI LAUTA
 * LIIKKUNUT TARPEEKSI: kaukaa katsottuna koko matka mahtuu ruudulle,
 * ja kamera siirtyy muutaman kymmenen pikseliä — silmä ei näe sitä
 * seuraamisena. Lähikuvassa sama matka on ruudullinen liikettä, ja
 * juuri se on "kartta siirtyy uuteen kohteeseen".
 *
 * === ZOOMI ENSIN, VASTA SITTEN NAPPULA (omistajan tilaus 1.9.2026
 * ilta: *"kartta saisi zoomautua lähemmäksi ensin ja sitten vasta
 * pelaaja alkaisi liikkua"*) =======================================
 *
 * Vanha ketju teki molemmat yhtä aikaa: yksi ajo, joka sekä zoomasi
 * että siirsi keskipisteen, ja nappula lähti samalla kehyksellä.
 * Silloin zoomi kilpaili nappulan kanssa katseesta eikä kumpikaan
 * lukenut selvästi. Nyt siirto on KAKSI PERÄKKÄISTÄ VAIHETTA:
 *
 *   1. ENNAKKOZOOMI (ennakoiSiirtoZoomi). Kamera ajaa lähemmäs
 *      nappulan ja reitin ensimmäisten askelten ympärille. Ajoa
 *      ODOTETAAN — nappulaa ei edes poimita laudalta ennen kuin zoomi
 *      on perillä, ja perään jää lyhyt hengähdys, jotta vaiheet
 *      erottuvat toisistaan eivätkä sula yhdeksi liikkeeksi.
 *   2. SAATTO (aloitaSaattavaKamera). Kamera liukuu määränpäähän
 *      nappulan tahdissa PITÄEN ennakkozoomin mittakaavan. Tämä on se
 *      vanha tilaus #96 sellaisenaan: uutta maastoa tulee näkyviin
 *      ruudun reunasta sitä mukaa kuin nappula etenee.
 *
 * SIIRTOZOOMIN MÄÄRÄ on kerroin nykyiseen zoomiin: 1,7× (portaikon
 * askel on 1,5, joten tämä on runsas yksi porras ja alle kahden). Ylä-
 * rajat hoitaa kartta.siirtoZoomiKerroin — se ei mene lähemmäs kuin
 * pelaajan sallittu lähin porras EIKÄ lähemmäs kuin siirtonäkymän oma
 * katto, eikä se koskaan zoomaa ULOS pelaajan omasta lähikuvasta.
 *
 * EI PALUUTA — KAMERA JÄÄ SINNE (sama tilaus). Aiemmin perillä ajettiin
 * takaisin lähtökertoimeen (SAATON_PALUU_MS 900), ja sille oli yksi
 * oikea syy: saattozoomi oli SUHTEELLINEN, joten ilman paluuta jokainen
 * heitto olisi kertonut zoomin uudelleen 1,7:llä ja kolmen siirron
 * jälkeen kartta olisi ollut portaikon pohjassa. Syy poistui, kun
 * katosta tuli absoluuttinen (kartta.siirtoZoomiKerroin): tavoite
 * kylläänty muutamassa siirrossa siirtonäkymän kattoon eikä nouse siitä
 * enää, joten kamera saa jäädä sinne minne se ajettiin. Samalla katosi
 * se nykäisy, jossa juuri katsottu lähikuva loittoni heti perillä.
 *
 * SAATOLLA ON OMA KÄYRÄNSÄ, EI KAMERA-AJON KUUTIOTA: kuutio seisoo
 * lähes paikallaan matkan ensimmäisen neljänneksen, ja kamera jäisi
 * jälkeen ja kirisi lopussa. Käyrä oli ensin smoothstep ja on
 * 2.9.2026 alkaen trapetsi (ks. seuraava osio) — molemmat lähtevät ja
 * pysähtyvät pehmeästi, mutta vain trapetsi kulkee välillä aidosti
 * tasaista vauhtia. Ennakkozoomi käyttää yhä kamera-ajon omaa
 * kuutiokäyrää: se on kohtaus eikä seuranta, ja Raamatun
 * KAMERA-AJOT-linjaus haluaa siihen kiihdytyksen ja jarrutuksen.
 *
 * ELE VOITTAA: ajon keskeyttää sormi kartalla, nipistys, rulla tai
 * zoomipainike (kartta.pysaytaKameraAjo), ja kartta jää siihen mihin
 * ajo ehti. Sitä ei yritetä jatkaa — pelaajan oma ele on viimeinen
 * sana kartan paikasta. Keskeytetty ennakkozoomi ei myöskään estä
 * nappulaa lähtemästä: matka jatkuu siitä näkymästä, jonka pelaaja
 * itse valitsi.
 */

/*
 * ══════════════════════════════════════════════════════════════════
 * SIIRRON KOREOGRAFIA: KAMERA EDELLÄ, NAPPULA PERÄSSÄ, PERILLE ENNEN
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 2.9.2026, sanatarkasti: *"Kun pelinappula liikkuu
 * jalan, niin se nappulan liikkeelle lähtö voisi olla hieman
 * viivytetty niin, että kartta ehtii lähteä hitaasti jo rullaamaan
 * eteenpäin, juuri sellaisella vauhdilla, että kun se ensin vähän
 * hitaasti kiihdyttää, sitten pysyy vakionopeudessa ja lopussa taas
 * hitaasti jarruttaa, niin laatta ehtii viivytetysti lähtemään
 * liikkeelle ja etenemään loppuun asti, niin, että laatta saapuu
 * perille vähän ennen, kuin kartan panorointiliike loppuu."*
 *
 * Tilauksessa on kolme erillistä lukua, ja jokainen on oma vakionsa:
 *
 *   1. VIIVE (NAPPULAN_LAHDON_VIIVE_MS). Kamera lähtee ensin ja
 *      nappula vasta viiveen päästä. Viive on tarkoituksella se aika,
 *      jossa kiihdytysramppi ehtii juuri ohi (ks. SAATON_RAMPPI): kun
 *      nappula lähtee, kartta on jo vakionopeudessa, ja liike lukee
 *      nimenomaan "kartta rullaa jo, nappula lähtee mukaan".
 *   2. SAAPUMISERO (NAPPULAN_SAAPUMISERO_MS). Kamera-ajo jatkuu
 *      nappulan laskeuduttua vielä hetken ja pysähtyy pehmeästi.
 *      Ilman tätä matka päättyisi kahteen yhtaikaiseen pysähdykseen,
 *      ja se lukee töksähdyksenä; nyt liike sammuu vasta kun nappula
 *      on jo levossa.
 *   3. KÄYRÄ (siirtoajonPehmennys). Smoothstep oli ease-in-out mutta
 *      sen nopeus on paraabeli 6t(1−t) — se ei ole hetkeäkään
 *      vakio, vaan kiihtyy puoliväliin ja hidastuu heti perään.
 *      Tilaus sanoo *"ensin vähän hitaasti kiihdyttää, sitten pysyy
 *      vakionopeudessa ja lopussa taas hitaasti jarruttaa"* eli
 *      TRAPETSI: kiihdytysramppi, tasainen keskiosa, jarrutusramppi.
 *
 * KESTORAJAT. Kameran ajo on viive + nappulan oma kesto +
 * saapumisero, ja nappulan kesto on jo porrastettu heiton pituuden
 * mukaan (jalkamatkanAskel). Rajat ovat siis vartijoita eivätkä
 * säätimiä: nykyisillä luvuilla lyhin siirto on 1 440 ms ja pisin
 * 5 758 ms, eli kumpikaan raja ei pure. Ne ovat olemassa siksi,
 * ettei tuleva askeltahdin muutos voi vahingossa tehdä kamera-ajosta
 * välähdystä eikä minuutin ryömintää.
 */
/*
 * MITATUT LUVUT, EI ARVATUT (tools/savukkeet/savuke-siirtokoreografia.mjs,
 * Chromium iPhone 402x874 ja iPad 834x1112, 2.9.2026). Ruudulla mitattu
 * viive ja saapumisero jäävät nimellisiä pienemmiksi, koska sekä
 * `wait()` että nappulan hypyt pyöristyvät kehysrajoille ja matka
 * kerää sitä ylitystä joka hypyllä. Nimellinen 300 ms mittautui
 * 340-380 ms:ksi (viive jää kehyksen verran myöhäiseksi) ja nimellinen
 * 280 ms mittautui 170-245 ms:ksi (nappula myöhästyy hyppyjen
 * ylityksellä). Molemmat osuvat omistajan haarukoihin RUUDULLA
 * (250-400 ms ja 150-300 ms), ja juuri se on se luku, joka
 * merkitsee.
 *
 * SAAPUMISERO ON HAARUKAN YLÄPÄÄSSÄ TARKOITUKSELLA. Nappulan matka on
 * kehysvetoinen (hypyt + `wait`-tauot) ja kamera-ajo aikavetoinen,
 * joten hidas laite venyttää nappulaa muttei kameraa — ero kutistuu
 * juuri silloin kun kehykset ovat harvassa. Mitattu ero oli kontin
 * Chromiumissa 60-200 ms, eli järjestys säilyi jokaisessa ajossa,
 * mutta vara ei ole suuri. Jos jollakin laitteella nappula ehtii
 * kameran ohi, tätä lukua nostetaan — ei nappulan tahtia lasketa.
 */
export const NAPPULAN_LAHDON_VIIVE_MS = 300;
export const NAPPULAN_SAAPUMISERO_MS = 280;
export const SIIRTOAJON_LYHIN_MS = 1200;
export const SIIRTOAJON_PISIN_MS = 6200;
/*
 * Kiihdytyksen ja jarrutuksen osuus ajosta, kumpikin erikseen. 0,3
 * jättää keskelle 40 % matkasta tasaista vauhtia — tarpeeksi, että
 * silmä ehtii lukea sen vakionopeudeksi, ja niin vähän, etteivät
 * päät tunnu äkkinäisiltä. Ramppien summa ei saa ylittää ykköstä
 * (siirtoajonPehmennys rajaa 0,49:ään varmuuden vuoksi).
 */
export const SAATON_RAMPPI = 0.3;

/**
 * Trapetsipehmennys: kiihdytys → vakionopeus → jarrutus.
 *
 * Palauttaa kuljetun matkan osuuden (0…1) ajan osuudella `t`.
 *
 * NOPEUSRAMPIT OVAT ITSEKIN PEHMEITÄ (smoothstep) eivätkä lineaarisia.
 * Lineaarisella rampilla kiihtyvyys hyppäisi askelmana ramppien
 * päissä, ja juuri se hyppy näkyy kartalla pieninä nytkähdyksinä
 * silloin kun koko ruutu liikkuu. Smoothstep-rampin pinta-ala on
 * täsmälleen sama kuin lineaarisen (1/2), joten huippunopeus on
 * kummallakin `1/(1−r)` — pehmennys ei siis muuta ajoituksia
 * lainkaan, vain kiihtyvyyden muodon.
 *
 * Kaava paloittain, kun r = ramppi ja v = 1/(1−r):
 *   t < r        s = v·r·(a³ − a⁴/2),  a = t/r
 *   r ≤ t ≤ 1−r  s = v·(t − r/2)
 *   t > 1−r      s = 1 − v·r·(b³ − b⁴/2),  b = (1−t)/r
 *
 * Palat kohtaavat: molemmissa saumoissa arvo on v·r/2 ja 1 − v·r/2.
 */
export function siirtoajonPehmennys(t, ramppi = SAATON_RAMPPI) {
  const x = Math.min(1, Math.max(0, t));
  const r = Math.min(0.49, Math.max(0.0001, ramppi));
  const v = 1 / (1 - r);
  if (x < r) {
    const a = x / r;
    return v * r * (a ** 3 - (a ** 4) / 2);
  }
  if (x > 1 - r) {
    const b = (1 - x) / r;
    return 1 - v * r * (b ** 3 - (b ** 4) / 2);
  }
  return v * (x - r / 2);
}

/**
 * Kamera-ajon kesto, kun nappulan oma matka kestää `nappulanKesto` ms.
 *
 * Puhdas funktio ja oma nimensä samasta syystä kuin jalkamatkanAskel:
 * tämä on se yksi paikka, jossa koreografian ajoitus lasketaan, ja
 * tests/siirtoajoitus.test.mjs vartioi sitä lukuina.
 */
export function siirtoajonKesto(nappulanKesto) {
  const kokonais = NAPPULAN_LAHDON_VIIVE_MS
    + Math.max(0, nappulanKesto || 0)
    + NAPPULAN_SAAPUMISERO_MS;
  return Math.round(Math.min(SIIRTOAJON_PISIN_MS, Math.max(SIIRTOAJON_LYHIN_MS, kokonais)));
}

export const SAATON_PEHMENNYS = (t) => siirtoajonPehmennys(t);
/*
 * SIIRTOZOOMIN MÄÄRÄ 1,7 → 2,0 (omistaja 2.9.2026: *"tässä kartta saa
 * olla suht lähelle zoomattuna, jolloin liikkeestä tulee
 * dynaamisemman näköinen"*).
 *
 * Kerroin on suhteellinen, mutta sen katto on absoluuttinen
 * (js/kartta.js siirtoZoomiKerroin, SIIRTONAKYMAN_LAHIN_KERROIN 3,5×
 * lähimmästä portaasta), joten nosto EI vie lähemmäs kuin ennen — se
 * vie kattoon NOPEAMMIN. Ero näkyy juuri siinä missä omistaja sen
 * pyysi: ensimmäisessä heitossa maan yleisnäkymästä. Vanhalla 1,7:llä
 * kattoon tarvittiin kaksi heittoa, uudella yksi, ja jo ensimmäinen
 * siirto liikuttaa lautaa ruudullisen verran.
 */
export const SIIRTOZOOMIN_LAHENNYS = 2.0;
/*
 * Ennakkozoomin kesto ja sen jälkeinen hengähdys.
 *
 * 760 ms on lyhyempi kuin kartan muut ajot (kartta.js AJO_MS 2000,
 * saapuminen): tämä toistuu joka heitolla, joten se saa olla ripeä
 * ele eikä kohtaus. Hengähdys on tarkoituksellisen lyhyt — se erottaa
 * vaiheet toisistaan (*"ja sitten vasta pelaaja alkaisi liikkua"*)
 * ilman että peli tuntuu jumittuvan.
 */
export const ENNAKKOZOOMIN_MS = 760;
export const ENNAKON_HENGAHDYS_MS = 120;
/*
 * Montako reitin ensimmäistä askelta ennakkozoomi ottaa rajaukseensa
 * nappulan lisäksi. Kaksi askelta kertoo katsojalle SUUNNAN — mihin
 * päin nappula on lähdössä — mutta ei vielä vedä kameraa määränpäähän,
 * joka on saaton oma tehtävä.
 */
export const ENNAKON_ASKELIA = 2;
/*
 * Alle tämän jäävää siirtoa ei ajeta lainkaan: kohde on jo käytännössä
 * ruudun keskellä, ja pikkuliike näyttäisi vain siltä että kartta
 * värähtää nappulan lähtiessä. Mitta on RUUDUN pikseleitä.
 *
 * KYNNYS ON RUUDUN KOKOON SUHTEUTETTU (mitattu 2.9.2026,
 * tools/savukkeet/savuke-siirtokoreografia.mjs). Kiinteä 60 px oli
 * puhelimen kokoisella ruudulla liikaa: mittaus löysi Ateenasta
 * kahden askeleen maasiirron, jossa iPadilla kamera saattoi normaalisti
 * mutta iPhonella (402 px leveä) ajo jäi kokonaan tekemättä — sama
 * matka lautayksikköinä on kapealla ruudulla noin 40 % pikseleistä,
 * koska yleiskuvan mittakaava lasketaan ruudun leveydestä. Silloin
 * omistajan tilaus jäisi toteutumatta juuri sillä laitteella, jolla
 * peliä pelataan: *"kartta ehtii lähteä hitaasti jo rullaamaan
 * eteenpäin."*
 *
 * "Näkyykö liike" on ruudun kokoon suhteutettu kysymys, joten kynnys
 * on nyt osuus karttaruudun leveydestä ja absoluuttinen pohja sen
 * alle. 6 % on iPhonella 24 px ja iPadilla 50 px — kummallakin selvästi
 * enemmän kuin pyöristysvirhe, mutta vähemmän kuin puolet
 * askelvälistä.
 */
export const SAATON_VAHIN_PX = 24;
export const SAATON_VAHIN_OSUUS = 0.06;

/*
 * ── TÄSTÄ ALASPÄIN UUTTA (pallolauta vaihe 2), EI SIIRRETTYÄ ─────────
 */

/**
 * Hypyn vaihe ajan osuudella `t` (0…1): vaakaliikkeen ease-in-out
 * (`e`) ja kaaren korkeuden osuus huipusta (`nousu`, paraabeli
 * 4t(1−t), nolla päissä).
 *
 * Kaava on täsmälleen tasokartan hyppaaAskelin (js/ui.js, #100):
 * "Vaaka: ease-in-out. Pysty: paraabeli, nolla päissä." Se on tässä
 * omana funktionaan, jotta pallolla hyppivä nappula (js/pallolauta/
 * siirto.js) kaartaa täsmälleen samalla käyrällä kuin tasokartalla —
 * kaksi kopiota samasta kaavasta eriytyisi huomaamatta.
 */
export function hypynVaihe(t) {
  const x = Math.min(1, Math.max(0, t));
  const e = x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2;
  return { e, nousu: 4 * x * (1 - x) };
}

/**
 * Hypyn kaaren huippu, kun hypyn pituus on `matka` (laudan yksikköä
 * tasokartalla, ruudun pikseliä pallolla): suhteessa pituuteen mutta
 * rajoissa (HYPYN_KAARI, HYPYN_KORKEUS_MIN/MAX — perustelu STEP_MS:n
 * kohdalla yllä).
 */
export function hypynHuippu(matka) {
  return Math.min(HYPYN_KORKEUS_MAX, Math.max(HYPYN_KORKEUS_MIN, matka * HYPYN_KAARI));
}
