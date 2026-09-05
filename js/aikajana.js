/*
 * AIKAJANAMOOTTORI — linssien yhteinen juokseva vuosiluku kartan päällä.
 *
 * Raamattu, Karttalinssit: *"Linssi = animoitu visualisointi kartalla
 * juoksevine vuosilukuineen"* ja AIKAJANA-AJO (omistaja 17.8.2026):
 * *"animaatiolinsseillä yhteinen aikajanamoottori juoksevine
 * vuosilukuineen — pelaajan käynnistämä, ele keskeyttää."*
 *
 * ENSIMMÄINEN AIKAJANALINSSI on keksinnöt (js/linssit/keksinnot.js,
 * omistajan tilaus 2.9.2026 ilta). Tämä moduuli ei tiedä keksinnöistä
 * mitään: se saa linssiltä KAAREN (otsikko, alku- ja loppuvuosi) ja
 * TAPAHTUMAT (vuosi, paikka laudalla, henkilö, otsikko, selite, kuvat)
 * ja ajaa ne kartan päällä. Seuraava aikajanalinssi (rautatiet,
 * silkkitiet, ihmisen leviäminen) antaa saman muodon eikä tarvitse
 * tästä riviäkään.
 *
 * TOINEN AIKAJANALINSSI on ihmisen matka (js/linssit/ihmisen-matka.js,
 * omistajan päätös 5.9.2026): nykyihmisen leviäminen Afrikasta 300 000
 * vuotta sitten n. vuoteen 1300 jaa. Se toi moottoriin kolme yleistystä,
 * ja jokainen niistä on kaaren VALINTA — ilman kenttää käytös on entinen:
 *
 *   `asteikko: 'vuosiaSitten'`  kello ei kulje vuosiluvuissa vaan
 *                  pysäkkien koordinaatistossa (jokainen väli yhtä
 *                  pitkä) ja näyttää logaritmisesti interpoloidun
 *                  lukeman "300 000 v. sitten". Ks. KELLON ASTEIKKO.
 *   `reitti: true` valojen väliin piirtyy isoympyrää seuraava
 *                  reittiviiva sitä mukaa kuin valot syttyvät
 *                  (rakennaReitti, vain pallolla).
 *   `lahikuva` ja `hyppykamera`  kaaren oma lähikuvan mitta, ja pitkällä
 *                  välillä kamera nousee niin kauas, että edellinen valo
 *                  näkyy yhä (pysakinLahikuva).
 *
 * Näytettävä ajoitus tulee silloin datan `ajoitus`-kentästä (`ajoitus`-
 * apuri) — kortti, lamppu, kellorivi ja havainnekuvan teksti lukevat
 * kaikki saman.
 *
 * ── NELJÄ PINTAA (omistajan kuvaus 2.9.2026 ilta, sanatarkasti
 *    olennaisilta osin) ──────────────────────────────────────────────
 *
 *   1. KELLO ylälaidassa: rullaava vuosiluku, joka juoksee tyhjien
 *      vuosien yli ja pysähtyy jokaiseen tapahtumaan. Napautus
 *      pysäyttää ja jatkaa. Kellon alla kaaren nimi ja nykyinen paikka.
 *   2. VALOT kartalla: *"kartalle syttyisi valo siihen kaupunkiin,
 *      missä se on tehty"*. Valo jää palamaan — kaaren lopussa kartalla
 *      on koko kaaren valokartta.
 *   3. FILMINAUHA alalaidassa. Ensimmäinen muoto oli omistajan kuvaus
 *      2.9.2026 illalta: *"aina seuraava kuva on vasemmassa reunassa
 *      blurrattuna ja nykyinen kuva heti sen oikealla puolella. Ja
 *      siitä oikealle päin näkyisi aiemmat kuvat ja keksinnön nimi,
 *      keksijä ja vuosiluku … vähän pienemmässä koossa."*
 *      KARUSELLI korvasi sen 3.9.2026 (omistaja, sanatarkasti):
 *      *"nuo henkiloiden kuvat voisi tayttaa koko alarivin niin etta
 *      nykyinen henkilo on aina keskella ruutua ja kaikki vasemmalla
 *      ja oikealla puolella olevat ovat merkittavasti pienempia ja
 *      kaikki vasemmalla puolella ovat kevyesti blurattuja."*
 *      Nauha on siis KRONOLOGINEN: menneet vasemmalla (sumennettuina),
 *      nykyinen keskellä ruutua isona, tulevat oikealla (tarkkoina
 *      mutta pienempinä ja vaimeampina). Vuoden vaihtuessa koko rivi
 *      liukuu yhden askeleen vasemmalle — ks. karusellinPaikat ja
 *      asettele. Nauhan kortit ovat keksijän KUVAPUTKEN GENEROIMIA
 *      studiomuotokuvia (omistajan tilaus 3.9.2026, datan kentät
 *      `kuva` ja kaksoispysäkillä `kuvaToinen`); aito Commons-kuva
 *      (`kuvaAito`) jää datassa odottamaan Tiedeliitettä.
 *   4. ILMIÖPANEELI oikeassa yläkulmassa: *"visualisoitu se keksintö
 *      tai joku muu kuva, joka selittäisi sitä itse ilmiötä … sen
 *      generoidun kuvan alle voisi tulla se keksinnön selite ja …
 *      keksijän nimi."* Kuva on datan kenttä (`ilmio`), joten
 *      generoitu kuva vaihdetaan yhdellä rivillä, kun se on R2:ssa.
 *
 *   *"Kaikki vaihdokset pitäisi mennä nätisti liukuen ja animoiden."*
 *   Siirtymät ovat CSS-siirtymiä (css/aikajana.css): kortti liukuu
 *   paikasta toiseen, paneeli ristihäivyttää, valo syttyy kerran.
 *
 * ── VIIDES PINTA: MUSIIKKI (omistajan tilaus 2.9.2026 ilta,
 *    *"Generoi linssille oma musiikki"*) ────────────────────────────
 *
 * Ajolla on oma raita, jonka laji tulee kaaresta (`aikajana.musiikki`,
 * keksinnöillä 'keksinnot'). Soittimen omistaa js/siirtymamusiikki.js
 * — sama koneisto kuin siirtymän musiikilla, koska vaatimukset ovat
 * samat: kaksi polkua ämpäriin, puuttuva raita hiljaisena
 * normaalitilana, väistö pöllön ja kertojan alta. Tämä moduuli vain
 * kertoo, milloin musiikki on tarpeen:
 *
 *   käynnistys      musiikki alkaa heti, kamera-ajon kanssa yhtä
 *                   aikaa — ennen kuin kello lähtee.
 *   tauko           EI katkaisua vaan himmennys puoleen: pelaaja
 *                   pysäytti kellon lukeakseen, ei vaientaakseen.
 *                   Sama koskee kaaren loppua.
 *   juttu auki      raita feidataan pois nähtävyyskortin ajaksi
 *                   (kortti on oma näkymänsä, jolla on oma äänensä)
 *                   ja palaa, kun kortti suljetaan ja ajo jatkuu.
 *   sulkeminen      feidaus pois purussa (pura()), myös silloin kun
 *                   koko lauta vaihtuu alta.
 *
 * Kaari ilman `musiikki`-kenttää on hiljainen eikä koske soittimeen
 * lainkaan — silloin siirtymän oma raita saa soida rauhassa.
 *
 * ── LINSSITILAN ÄÄNIMAAILMA (omistajan tilaus 3.9.2026, sanatarkasti:
 *    *"Kun linssitila menee päälle, niin kaikki muut äänet saisi
 *    vaieta taustalta ja oma linssin generoitu musiikki saisi alkaa
 *    toistua taustalla."*) ───────────────────────────────────────────
 *
 * Ajo on OMA NÄKYMÄNSÄ siinä missä pöllön paneeli (js/pollo.js avaa):
 *
 *   käynnistys   hiljennaAmbienssi(LINSSIN_HILJENNYS) vie kaupungin
 *                äänimaiseman, pohjavireen, visamusiikin ja radion
 *                yhdellä ja samalla syyllä alas; pysaytaLukija()
 *                vaientaa kesken olevan luennan. Linssin oma raita ei
 *                väisty tätä hiljennystä — se on sen itsensä pyytämä
 *                (js/siirtymamusiikki.js lajinVaisto).
 *   sulkeminen   palautaAmbienssi(LINSSIN_HILJENNYS) purussa, samalla
 *                syyllä. Syy on joukon alkio eikä laskuri, joten
 *                kahdesti purettu ajo ei nosta taustaa kahdesti.
 *
 * Keksinnön syttyessä soi KOHAHDUS (omistaja: *"joku uuu-huudahdus,
 * aivan kuin yleisö kohahtaisi, kun uusi hieno keksintö saapuu
 * maailmaan"*) — neljä ämpärissä olevaa varianttia, joista sama ei
 * toistu peräkkäin (js/tehosteet.js). Kun varianttia ei ole ladattu,
 * soi kellon oma syntetisoitu naksahdus (naksahda). Ääni tulee vain
 * ELÄVÄSTÄ vaihdoksesta: rakentaminen ja Alusta asettavat kellon
 * vuosiluvun ilman ääntä.
 *
 * ── MITÄ MOOTTORI EI TEE ──────────────────────────────────────────
 *
 *   • Ei RASKASTA animaatiota SVG-kartalla. Linssisopimuksen sääntö
 *     (docs/moduulit/linssit.md 1.7) kieltää suodattimet ja
 *     kehyskohtaisen JS-työn karttakerroksessa; omistaja tilasi
 *     3.9.2026 nimenomaan sykkivän merkin, ja se tehdään CSS-
 *     keyframeilla YHDELLE merkille kerrallaan (nykyinen keksintö) —
 *     ei ajastimilla, ei suodattimilla, ei jokaiselle merkille.
 *     Jäljelle jääneet merkit ovat liikkumattomia. prefers-reduced-
 *     motion sammuttaa sykkeen kokonaan.
 *     Kello, nauha ja paneeli ovat tavallista DOM:ia kartan päällä.
 *   • Ei kosketa pelitilaan eikä tallennukseen: aikajana on
 *     katselutila, ja sulkeminen palauttaa kartan sellaisenaan.
 *   • Ei omia eleitä kartalla: pelaaja saa panoroida ja zoomata
 *     aikajanan aikana; valot skaalautuvat kuten muutkin merkit.
 *
 * ── KYTKENTÄ ──────────────────────────────────────────────────────
 *
 * js/ui.js kaynnistaAikajana(tunnus) tuo tämän ja linssin
 * dynaamisesti (yhden tiedoston versio ei niputa linssejä, ks.
 * linssit.md 2.1) ja kutsuu kaynnistaAikajana(ui, linssi). Nyt
 * käynnistin on kehittäjävalikon rivi (index.html
 * #kehittaja-aikajana-btn); pelillinen ovi (Raamattu, PAIKKASIDONTA)
 * päätetään myöhemmin.
 */

import { el, maare } from './mapart.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { asetaKuva, lataaKuvaSitkeasti } from './media.js';
import { sfx } from './sound.js';
import { hiljennaAmbienssi, palautaAmbienssi, stopPlaceStream } from './ambience-stream.js';
import { stopDiaryVoice } from './luenta.js';
import {
  ESITTELYN_RUNKO, LOPUN_RUNKO, pysaytaLinssiluenta, soitaLinssiluenta, valinaytoksenRunko,
} from './linssipuhe.js';
import { pysaytaLukija } from './lukija.js';
import { esilataaKuvat } from './ui-apurit.js';
// Terävä tila pakotettuna ajon ajaksi (ks. pakotaLaatu). Moduuli on
// kevyt: se tuo vain fokusmitat ja ui-apurit, ei Globe.gl:ää.
import { pakotaPallonLaatu } from './pallo.js';
// Elävä liekkivalo pallolaudan lampuksi (omistaja 5.9.2026 klo 00.45).
// Koko piirto asuu omassa moduulissaan; tämä tiedosto vain pyytää
// lampun, kertoo sen tilan ja purkaa kerroksen.
import { luoLiekkivalot } from './aikajana-valo.js';
// Isoympyrä reittiviivalle: sama kaava kuin lentokaarella ja uomilla
// (js/linssit/vesistot.js tuo saman parin) — ei omaa kopiota.
import { isoympyranPiste, kulmaAsteina } from './pallolauta/reitit.js';
import { avaaTiedeliite, suljeTiedeliite } from './tiedeliite.js';
import { sytytaLyhdyt } from './lyhty.js';
import { rajausTyyli } from './isoisan-valokuvat.js';
import {
  aloitaSiirtymamusiikki, himmennaSiirtymamusiikki, lopetaSiirtymamusiikki,
  LINSSIN_HILJENNYS,
} from './siirtymamusiikki.js';

/* ==================== TAHTI ==================== */

/**
 * Tyhjä vuosi kestää tämän verran; tapahtuman kohdalla kello seisoo
 * VIIVE_MS. Tahti on tapahtumittain eikä vuosittain: 1780–1820 on
 * harva ja 1890-luku tiheä, ja kumpikin saa saman lukurauhan.
 */
export const AIKAJANA_VUOSI_MS = 260;
export const AIKAJANA_VIIVE_MS = 4600;
/** Merkkipaalu (ei valoa, esim. isoisän matka 1873) pysäyttää lyhyemmin. */
export const AIKAJANA_PAALU_MS = 3200;
/*
 * KELLO ON MATKAMITTARI (omistaja 3.9.2026 ilta: *"saisiko vuosinumerot
 * juoksemaan kokoajan kuin hedelmäpelissä ... numerot olisivat kokoajan
 * ainakin jonkinlaisessa liikkeessä"*). Tapahtuman tauolla kello ei
 * seiso: ykkösrulla hiipii tämän osuuden digitistä koko tauon aikana ja
 * jatkaa tauon jälkeen normaalia tahtia loppumatkan. Näin liike ei
 * pysähdy koskaan ajon aikana, mutta keksinnön kohdalla se on hidasta.
 */
export const AIKAJANA_TAUON_OSUUS = 0.6;
/** Tauko ei pääty ennen kuin selostaja on lopettanut: jäljelle jäävä vara (ms). */
export const LUENNAN_TAUKOVARA_MS = 900;
/** Luennan odotuksen katto syttymisestä (ms) — verkko voi jättää äänen lataamatta. */
export const LUENNAN_PISIN_MS = 14000;

/*
 * ── PEHMEÄT KIIHDYTYKSET JA JARRUTUKSET ────────────────────────────
 *
 * Omistaja sanatarkasti (3.9.2026): *"vuosinumerot juoksevat nyt mutta
 * niihin pitäisi tehdä pehmeät kiihdytykset ja jarrutukset
 * (logaritminen)."*
 *
 * PROFIILI. Kello ei enää kulje pysäkkien välillä vakionopeudella.
 * Nopeus on PAIKAN funktio: se riippuu siitä, montako vuotta on
 * lähimpään pysäkkiin — taaksepäin siihen kohtaan, josta liike lähti
 * (tauon hiipimän jälkeen), ja eteenpäin seuraavan tapahtuman vuoteen.
 * Käyrä on logaritmi, joka nousee jyrkästi heti liikkeelle lähdössä ja
 * loivenee: nopeus = ln(1 + etäisyys / TAITE) / ln(1 + KIIHTYMISMATKA /
 * TAITE), rajattuna välille [POHJANOPEUS, 1] ja kerrottuna
 * matkanopeudella (1 vuosi / AIKAJANA_VUOSI_MS).
 *
 * Koska sama käyrä luetaan kummastakin päästä, kiihdytys ja jarrutus
 * ovat symmetriset: kello lähtee liikkeelle suunnilleen samaa vauhtia
 * kuin se tauolla hiipi (POHJANOPEUS ≈ TAUON_OSUUS × VUOSI_MS /
 * VIIVE_MS = 0,034), kiihtyy täyteen matkavauhtiin ja jarruttaa
 * saapuessaan takaisin samaan pohjanopeuteen. LIIKE EI PYSÄHDY
 * KOSKAAN: pohjanopeus on aidosti nollaa suurempi.
 *
 * LYHYILLÄ VÄLEILLÄ (1–3 vuotta) kello ei ehdi täyteen vauhtiin — se
 * on tarkoitus: tiheä 1890-luku näkyy hitaana ja harva 1800-luvun alku
 * pitkinä vetoina.
 *
 * KESTO. Vakiot on säädetty niin, ettei profiili veny liikaa: 13
 * vuoden väli kestää 1,28× ja 40 vuoden väli 1,09× entisestä
 * (koko kaari taukoineen 1,17×). Reduced motion ohittaa profiilin
 * (tahti.lineaarinen) — silloin kello vain juoksee.
 */
/** Osuus matkanopeudesta, jota hitaammin kello ei koskaan kulje. */
export const AIKAJANA_POHJANOPEUS = 0.035;
/** Vuosia pysäkistä, jonka päässä kello on täydessä matkavauhdissa. */
export const AIKAJANA_KIIHTYMISMATKA = 1.5;
/** Logaritmin taite vuosina: pienempi = jyrkempi lähtö liikkeelle. */
export const AIKAJANA_KAYRAN_TAITE = 0.2;
/** Nopeus luetaan paikasta, joten iso kehysväli pilkotaan tähän. */
export const AIKAJANA_ALIASKEL_MS = 8;

/**
 * Nopeusprofiili puhtaana käyränä: kuinka suuren osan matkanopeudesta
 * kello kulkee, kun lähimpään pysäkkiin on `etaisyys` vuotta.
 * Palauttaa aina > 0 (ks. AIKAJANA_POHJANOPEUS).
 *
 * @param {number} etaisyys vuosia lähimpään pysäkkiin
 * @returns {number} osuus matkanopeudesta, välillä [POHJANOPEUS, 1]
 */
export function aikajananNopeus(etaisyys) {
  if (!(etaisyys > 0)) return AIKAJANA_POHJANOPEUS;
  const osuus = Math.log1p(etaisyys / AIKAJANA_KAYRAN_TAITE)
    / Math.log1p(AIKAJANA_KIIHTYMISMATKA / AIKAJANA_KAYRAN_TAITE);
  return Math.min(1, Math.max(AIKAJANA_POHJANOPEUS, osuus));
}

/**
 * Tauolla musiikki jää soimaan PUOLEEN tasoon (omistajan tilaus:
 * *"jatkuu pysäytyksen yli hiljennettynä puoleen"*). Vakio on tässä
 * eikä soittimessa: se on tämän linssin tapa, ei musiikkimoduulin.
 */
export const AIKAJANA_TAUKO_HIMMENNYS = 0.5;

/*
 * ── KEKSINNÖN PAIKKAMERKKI KARTALLA (omistajan tilaus 3.9.2026) ────
 *
 * Sanatarkasti: *"Keksinnön paikka ei näy oikein kartalla. Saisi olla
 * ensin todella selkeä vilkkuva pallo ja sitten kun siirrytään
 * seuraavaan vuoteen, niin pallo voisi hieman himmentyä ja lopettaa
 * vilkkumisen, mutta silti hehkua kartalla."*
 *
 * MIKSI SE EI NÄKYNYT OIKEIN. Merkin sisusryhmä skaalattiin
 * CSS-muunnoksella (`scale(0)` → `scale(1)`, nykyisellä `scale(1.35)`)
 * ja muunnoksen keskipiste haettiin parilla
 * `transform-box: fill-box; transform-origin: center`. Jos selain ei
 * tue `fill-box`-arvoa — vanhempi WebKit, eli juuri omistajan iPad —
 * `center` lasketaan SVG:N VIEWPORTIN keskeltä, ja jokainen ykkösestä
 * poikkeava skaalaus siirtää merkin kauas oikealta paikaltaan.
 * Vakioskaalassa (1) virhe on nolla, joten vika näkyi vain
 * NYKYISESSÄ merkissä — täsmälleen se, mistä omistaja raportoi.
 *
 * Korjaus on poistaa koko riippuvuus: kaikki kolme ympyrää ovat
 * keskipisteessä (0,0), jolloin skaalaus origon ympäri ON skaalaus
 * merkin keskipisteen ympäri, eikä `transform-box`-tukea tarvita
 * missään. Paikan antaa yksin ryhmän oma `translate` (paivitaMittakaava).
 *
 * TOINEN SYY oli MITTA, ja se selittää tyhjän kartan silloinkin kun
 * skaalaus osui oikeaan: merkki luki kokonsa lehden omasta vakiosta,
 * joka on aivan liian pieni koko Euroopan näkymässä (mitattu 1,5 px).
 * Mitta tulee nyt suoraan ruudusta — ks. merkkiSkaala.
 *
 * MITAT ovat siis RUUDUN PIKSELEITÄ: pallon säde ~7 px ja pehmeä
 * ulkohehku vajaat kaksi kertaa se. Syke laajenee CSS-keyframeilla
 * 2,4-kertaiseksi (css/aikajana.css).
 */
export const MERKIN_SADE = 7;
export const HEHKUN_SUHDE = 1.9;
/*
 * LAMPUT (omistaja 3.9.2026: *"pisteet, jotka hohtavat kartalla, olisivat
 * aivan kuin lamppuja ilman mustaa ympyrää ... kirkkaampi keskusta ja
 * sitten ne tummuisivat pikkuhiljaa reunoille päin, mutta valaisisivat
 * samalla myös kartan pintaa vaaleammaksi"*). Kajo on lampun valokeila
 * kartan päällä (screen-sekoitus) ja reikä on sama keila tummennuksen
 * maskissa: tummennettu kartta vaalenee lampun ympäriltä.
 */
export const KAJON_SUHDE = 7;
export const REIAN_SUHDE = 9;
/** Tummennuspinnan ulottuvuus laudan yksiköissä: reilusti yli laudan. */
const TUMMENNUKSEN_ULOTTUVUUS = 1e6;
/** Tummennuksen poistumisliuku (css .aikajana-tummennus-pinta). */
const TUMMENNUKSEN_POISTUMA_MS = 700;

/* ==================== AIKAJANA PALLOLAUDALLA ==================== */

/*
 * KAIKKI PALLOLLE (omistaja 5.9.2026, Raamattu KAIKKI PALLOLLE, VANHA
 * KARTTA SULJETAAN, sanatarkasti: *"Käännä kaikki pallolle, niin
 * voidaan sulkea vanha kartta kokonaan"*; docs/moduulit/karttapallo.md
 * luku 10, aalto 2A).
 *
 * Neljä pintaa viidestä ovat DOM:ia kartan päällä eivätkä tiedä
 * laudasta mitään: kello, karuselli, ilmiöpaneeli, avausjakso,
 * välinäytös, musiikki, luenta ja Tiedeliite ovat samat kummallakin
 * laudalla. Vain KAKSI asiaa oli tasokartan svg:tä, ja ne käännetään
 * tässä laudan linssiapurille (js/pallolauta/linssit.js):
 *
 *   VALOT       `lauta.linssit.merkit('aikajana', …)`. Sama
 *               kolmiosainen lamppu (kajo, syke, hehku, pallo) ja samat
 *               css-luokat, mutta HTML-elementtinä pallon pinnan
 *               pisteessä (CSS2D). Koko on ruutuvakio, joten
 *               vastaskaalausta (merkkiSkaala, paivitaMittakaava) ei
 *               tarvita — se jää tasokartan haaraksi.
 *   TUMMENNUS   `lauta.linssit.kalvoRuudulle('aikajana', { reika })`.
 *               CSS-kalvo kotelon päällä, reikä nykyisen lampun
 *               kohdalla ruutupikseleinä; tasokartan maski (yksi reikä
 *               per palava lamppu) ei käänny CSS-kalvolle, joten reikä
 *               on YKSI ja se seuraa nykyistä lamppua liukuen.
 *
 * Kamera on `ui.kamera()` eli hereillä olevan laudan oma (pallolla
 * js/pallolauta/kamera.js ajaKamera, sama allekirjoitus bbox mukaan
 * lukien). Fokuslukkoa ei pallolla ole, joten vapautaKamera ohitetaan.
 */

/** Linssiosan nimi laudan linssiapurissa (js/linssit/keksinnot.js pallolle). */
export const PALLON_OSA = 'aikajana';
/** Reiän säde ruutupikseleinä: sama mitta kuin tasokartan maskireiällä. */
export const PALLON_REIAN_SADE_PX = MERKIN_SADE * REIAN_SUHDE;
/**
 * Tummennuksen sävy pallolla. Tasokartalla pinta on `fill: #0a0705` ja
 * `opacity: 0.86` (css/aikajana.css .aikajana-tummennus-pinta), ja
 * maskin liukuväri vaalentaa reiän reunaa puolivälissä noin 41 %:iin —
 * samat luvut rgba-sävyinä, koska pallon kalvo on CSS-tausta.
 */
export const PALLON_TUMMENNUS = 'rgba(10, 7, 5, 0.86)';
export const PALLON_TUMMENNUS_KESKI = 'rgba(10, 7, 5, 0.35)';
/**
 * REIKÄ EI LIU'U (omistaja 5.9.2026 klo 00.45; ks. siirraReika).
 * Liuku oli 700 ms, ja juuri se näkyi valopallona, joka tuli liikkuen
 * paikoilleen. Luku jää nollaksi muistiin siitä, että paikanvaihto on
 * TARKOITUKSELLA hetkellinen: liike on lampun omassa syttymisessä.
 */
export const PALLON_REIAN_LIUKU_MS = 0;

/*
 * ── LÄHIKUVA JA ENNAKOIVA KAMERA PALLOLLA ─────────────────────────
 *
 * Omistaja 5.9.2026 ilta työpöytäselaimella, sanatarkasti: *"zoomaa
 * maapallo näin lähelle mutta liikuta palloa pehmeästi ja hieman jo
 * ennakoiden kohti uutta valopalloa niin että kun valopallo syttyy
 * kartan liike loppuu vasta vähän sen jälkeen. pidä kokoajan terävä
 * tila päällä."*
 *
 * KUINKA LÄHELLE. Omistajan kuvakaappauksessa (2000 px leveä ruutu)
 * näkyi Irlannista Tanskaan ja Pohjois-Saksaan, eli noin 1 500 km
 * ruudun leveydellä; Pariisin valopallo oli halkaisijaltaan noin
 * 160 px.
 *
 * LUKU ON MITATTU EIKÄ LASKETTU. Ensimmäinen mittaus (5.9.2026 ilta)
 * antoi luvun 260, koska `korkeusLeveydesta` (js/pallolauta/kamera.js)
 * asetti pyydetyn leveyden ruudun KORKEUDELLE — fov on pystykulma —
 * jolloin vaakakaista oli työpöydällä 1,7-kertainen pyydettyyn nähden.
 * Kaava sai kuvasuhteen 5.9.2026 yöllä (aloitusnäkymän zoom), ja luku
 * kalibroitiin uudelleen NIIN, ETTÄ RUUDULLA NÄKYY SAMA KAISTA KUIN
 * ENNEN. Mitattu Chromiumilla samalla tavalla kuin ennenkin (kamera
 * Pavian yllä, ruudun laitojen pisteet asteiksi ja väli isoympyränä),
 * kaavan korjauksen jälkeen: 260 → 898 km, 400 → 1 403 km,
 * **434 → n. 1 525 km**, 450 → 1 588 km (1400 × 900).
 *
 * MITTAKAAVA ON NYT SAMA JOKA RUUDULLA: pyydetty leveys tarkoittaa
 * lautayksiköitä ruudun LEVEYDELLÄ, joten 434 antaa saman ~1 500 km:n
 * kaistan sekä työpöydällä että puhelimella (mitattu 390 × 844:
 * 1 451 km luvulla 430). Ennen korjausta puhelin näytti samalla luvulla
 * vain noin 430 km — se oli dokumentin AVOIN-kohta, ja se ratkesi tässä.
 * Luku on VAKIO eikä kaaren rajaus: sama lähikuva pätee jokaisella
 * pysäkillä, ja kamera vain siirtyy lampusta toiseen. (Vertailuksi:
 * saapumisnäkymä on 240 yksikköä ja siirtonäkymä 120,
 * js/pallolauta/kamera.js.) Tasokartalla ajo sovittaa yhä koko kaaren
 * ruutuun — lähikuva on pallon oma, koska vain siellä laatat riittävät.
 *
 * MILLOIN LIIKE ALKAA JA LOPPUU. Kamera lähtee kohti seuraavaa lamppua
 * ENNEN sen syttymistä (AIKAJANAN_KAMERAN_ENNAKKO_OSUUS pysäkin
 * kestosta = 40 % × 4 600 ms ≈ 1 840 ms) ja on perillä vasta
 * AIKAJANAN_KAMERAN_JALKIJATTO_MS syttymisen JÄLKEEN. Saapumishetki
 * lasketaan samalla puhtaalla funktiolla kuin karusellin ennakko
 * (aikaSeuraavaan) — kello ei kulje vakionopeudella, joten "kaksi
 * sekuntia ennen" ei ole sama kuin "kahden sekunnin matka jäljellä".
 */
/** Lähikuvan leveys lautayksikköinä pallolla (mitattu 1 525 km ruudun leveydellä). */
export const AIKAJANAN_LAHIKUVA_LEVEYS = 434;
/** Osuus pysäkin kestosta, jonka kamera lähtee liikkeelle etuajassa. */
export const AIKAJANAN_KAMERAN_ENNAKKO_OSUUS = 0.4;
/** Ennakko millisekunteina: liike alkaa, kun syttymiseen on tämä aika. */
export const AIKAJANAN_KAMERAN_ENNAKKO_MS = Math.round(AIKAJANA_VIIVE_MS * AIKAJANAN_KAMERAN_ENNAKKO_OSUUS);
/** Ajo päättyy vasta tämän verran syttymisen jälkeen (omistaja: "vähän sen jälkeen"). */
export const AIKAJANAN_KAMERAN_JALKIJATTO_MS = 750;
/** Lyhinkin ajo kestää tämän: hyppy olisi pahempi kuin myöhästyminen. */
export const AIKAJANAN_KAMERAN_POHJA_MS = 900;

/*
 * ── MANNERTEN MITTAISET HYPYT (ihmisen matka, 5.9.2026) ───────────
 *
 * Keksintökaaressa naapuripysäkit ovat saman maanosan sisällä, ja yksi
 * lähikuvan mitta riittää koko ajolle. Ihmisen leviämisessä väli voi
 * olla Beringinsalmi tai Tyynenmeren saariketju: lähikuvassa edellinen
 * valo ja niiden välinen reittiviiva jäisivät ruudun ulkopuolelle, ja
 * pelaaja näkisi vain uuden lampun ilman matkaa, joka sinne johti.
 *
 * Kaari kertoo oman perusleveytensä (`aikajana.lahikuva`) ja pyytää
 * hyppykameran (`aikajana.hyppykamera`); silloin kunkin pysäkin leveys
 * lasketaan EDELLISEN pysäkin etäisyydestä isoympyränä. Ilman näitä
 * kenttiä (keksinnöt) mitta on entinen vakio.
 */
/** Kuinka monta kertaa hypyn pituus mahtuu ruudulle: 2,2 → molemmat päät. */
export const AIKAJANAN_HYPYN_KERROIN = 2.2;
/** Kauimmas kamera nousee hypyssä (lautayksikköä ruudun leveydellä). */
export const AIKAJANAN_HYPYN_KATTO = 3600;
/** Lautayksikköä yhdellä asteella (12 000 yksikköä = 360°). */
export const LAUTAYKSIKKOA_ASTEELLA = 12000 / 360;

/**
 * Lähikuvan leveys pysäkillä: perusmitta, tai pitkällä hypyllä niin
 * väljä, että myös edellinen valo ja reittiviiva ovat kuvassa.
 *
 * @param {number} perus kaaren oma lähikuvan leveys (lautayksikköä)
 * @param {number} matka edellisen pysäkin etäisyys (lautayksikköä)
 * @returns {number} näkyvä leveys lautayksikköinä
 */
export function pysakinLahikuva(perus, matka, {
  kerroin = AIKAJANAN_HYPYN_KERROIN, katto = AIKAJANAN_HYPYN_KATTO,
} = {}) {
  if (!(matka > 0)) return perus;
  return Math.min(katto, Math.max(perus, matka * kerroin));
}

/*
 * ── REITTIVIIVA VALOJEN VÄLIIN (kaari, jolla on `reitti: true`) ────
 *
 * Keksintökaaressa valot ovat toisistaan riippumattomia paikkoja;
 * ihmisen matkassa ne ovat YKSI MATKA, ja väli kahden lampun välillä on
 * yhtä tärkeä kuin lamput itse. Viiva piirretään laudan linssiapurilla
 * (`polut`) samaan osaan kuin valot, joten purku vie kummatkin.
 *
 * KOLME PIKSELIÄ, EI ASTETTA. `pathStroke` on tässä Globe.gl-versiossa
 * RUUTUPIKSELEITÄ (mitattu 5.9.2026, docs/moduulit/karttapallo.md luku
 * 10.3 avauslennon jälki): asteina laskettu paksuus jää alle pikselin
 * eli näkymättömiin. Viiva kulkee pallon pintaa (isoympyrä), ja yli
 * kahden asteen välit tihennetään, jottei se oikaise pallon läpi.
 */
/** Reittiviivan paksuus RUUTUPIKSELEINÄ (ks. yllä). */
export const REITIN_PAKSUUS_PX = 3;
/** Tätä pidempi väli tihennetään isoympyrän pisteillä (astetta). */
export const REITIN_TIHENNYS_AST = 2;
/** Viivan sävy: sama lampun kulta kuin valoissa, himmeämpänä. */
export const REITIN_VARI = 'rgba(255, 208, 102, 0.72)';

/**
 * Kahden pysäkin väli isoympyrän pisteinä ([[lat, lng]…]).
 * Puhdas funktio: ei selainta eikä Globe.gl:ää.
 */
export function reitinPisteet(a, b, tihennys = REITIN_TIHENNYS_AST) {
  const alku = { lat: a.lat, lng: a.lon ?? a.lng };
  const loppu = { lat: b.lat, lng: b.lon ?? b.lng };
  const kulma = kulmaAsteina(alku, loppu);
  // Pyöristysvara kuten vesistöjen tihennyksessä (tihennaKaarella).
  const osia = Math.max(1, Math.ceil(kulma / tihennys - 1e-9));
  const pisteet = [[alku.lat, alku.lng]];
  for (let k = 1; k < osia; k += 1) {
    const v = isoympyranPiste(alku, loppu, k / osia);
    pisteet.push([v.lat, v.lng]);
  }
  pisteet.push([loppu.lat, loppu.lng]);
  return pisteet;
}

/**
 * Kameran pehmennys ajon aikana: nolla nopeus molemmissa päissä
 * (smootherstep). Kirjaston Cubic.InOut ja siirtokoreografian trapetsi
 * lähtevät molemmat liikkeelle nykäisten, ja tässä liike on pitkä ja
 * jatkuva — omistaja pyysi *"pehmeästi"* ja *"loppuu vasta vähän sen
 * jälkeen"*, eli loppuvaiheen hiipuvan hännän.
 *
 * @param {number} t 0…1
 * @returns {number} kuljettu osuus matkasta
 */
export function aikajananKameranPehmennys(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/*
 * ── HAVAINNEKUVAT ESILADATAAN PYSÄKKI ETUKÄTEEN ───────────────────
 *
 * Omistaja 5.9.2026 ilta, sanatarkasti: *"havainnekuvat pitää
 * esiladata, nyt tulivat vähän perässä."* Koko kaaren pienet kuvat
 * haetaan jo linssin avautuessa (esilataaPienet), mutta pyyntö on vain
 * pyyntö: selain saa yhä purkaa WebP:n vasta silloin, kun paneeli
 * pyytää sitä ruudulle, ja juuri se näkyi viiveenä valon syttyessä.
 *
 * Siksi seuraavan KAHDEN pysäkin havainnekuva ja muotokuvat ladataan
 * JA DEKOODATAAN jo edellisen pysäkin aikana (Image + decode), ja
 * valmis Image-olio jää välimuistiin. Paneeli ottaa sen sellaisenaan
 * (vaihdaPaneeli → kuvaTaiLaatta): silloin kuvaa ei ladata uudestaan
 * eikä dekoodausta odoteta, vaan sivu piirtyy samalla kehyksellä kuin
 * valo syttyy. Kirjanpito on sama kuin ui-apurit esilataaKuvat:lla —
 * yksi pyyntö per osoite, ja kaikki puretaan linssin mukana.
 */
/** Montako pysäkkiä eteenpäin havainnekuvat dekoodataan valmiiksi. */
export const PANEELIN_ESILATAUS_PYSAKKEJA = 2;
/**
 * Montako valmista Image-oliota varastossa pidetään. Kaksi pysäkkiä
 * eteenpäin tarkoittaa enintään kuutta kuvaa (havainnekuva ja kaksi
 * muotokuvaa kummaltakin), ja katto jättää varaa yhdelle kierrokselle
 * — sitä vanhemmat ovat jo selaimen välimuistissa.
 */
export const KUVAVARASTON_KATTO = 12;

/** Onko pallolauta se lauta, jolle tämä ajo piirtää? */
function pallolautaAlla(ui) {
  return Boolean(ui?.pallolautaPaalla?.() && ui.pallolauta?.linssit);
}

/* ==================== AVAUSJAKSO ==================== */

/**
 * AVAUSJAKSO (omistajan tilaus 4.9.2026 aamu: *"Kun linssi painetaan
 * päälle, kartta voisi ja kaikki muutkin elementit ruudulta
 * kartta-alueella voisi feidautua kokonaan mustaan. Sen jälkeen keskelle
 * voisi tulla otsikko ja pieni selite siitä, mitä seuraavaksi pelaajalle
 * havainnollistetaan. Sillä aikaa peli voi taustalla siirtyä ja piirtää
 * ... Ja peli alkaa vasta, kun käyttäjä klikkaa aloitustekstin alla
 * olevaa käynnistä nappia."*).
 *
 * KOLME VAIHETTA (css .aikajana-avaus; peite on kaksikerroksinen,
 * ks. tyylitiedoston oma selitys):
 *
 *   1. MUSTA   kartta-alue häipyy kokonaan mustaan
 *              (AVAUS_PIMENNYS_MS). Linssin oma juuri on rakennettu
 *              mutta odottaa näkymättömänä (.avaus-piilossa), joten
 *              kello ja karuselli eivät pompahda ruudulle. Mustan
 *              päälle tulee kaaren esittelylaatikko.
 *   2. SUMEA   tausta on valmis — kamera-ajo on ajettu pimeässä ja
 *              laatat ehtineet piirtyä, katto AVAUS_TAUSTAN_KATTO_MS —
 *              ja peite ohenee sumentavaksi: kartta ja linssin
 *              elementit tulevat himmeinä ja sumeina laatikon taakse.
 *   3. POIS    Käynnistä-nappi: laatikko häipyy, sumennus katoaa ja
 *              kello lähtee samalla hetkellä.
 *
 * Kello EI käy ennen nappia, eikä selostaja lue (sytyta vaikenee
 * avausjakson ajan). Alusta-nappi ei tuo avausta takaisin: se kuuluu
 * vain käynnistykseen.
 */
/** Kartta-alueen häivytys mustaan linssin kytkeytyessä. */
const AVAUS_PIMENNYS_MS = 500;
/** Kamera-ajo tehdään pimeässä, joten se saa olla lyhyt — sitä ei nähdä. */
const AVAUS_KAMERA_MS = 700;
/** Taustan valmistumista odotetaan enintään tämän verran avauksesta. */
const AVAUS_TAUSTAN_KATTO_MS = 2500;
/**
 * Otsikko saa mustan rauhassa vähintään näin kauan. Ilman alarajaa
 * nopea kamera-ajo (mitattu WebKitissä: alle 400 ms) vei sumennukseen
 * ennen kuin laatikko oli edes ehtinyt liukua esiin.
 */
const AVAUS_LUKUAIKA_MS = 900;
/** Peitteen poistuminen Käynnistä-napin jälkeen (css .aikajana-avaus.pois). */
const AVAUS_POISTUMA_MS = 700;

/* ==================== VÄLINÄYTÖS ==================== */

/**
 * VÄLINÄYTÖS MERKKIPAALUSSA (omistajan tilaus 4.9.2026 aamu,
 * sanatarkasti: *"Kertoja voisi myös kertoa vähän pidemmin isoisän
 * kohdalla mihin pulu sitten vain kommentoisi. Aika voisi pysähtyä
 * siinä kohtaa automaattisesti. Kertoja voisi isoisän kohdalla myös
 * summata jo nähtyä ja suunnata myös tulevaan. Nämä voisivat tulla
 * kartan keskelle myös tekstimuodossa yhdessä isoisän jonkun kuvan
 * kanssa. … Animaatio jatkuisi vasta popup tekstin alla olevasta
 * napista. Näin pitkään animaatioon tulee pieni hengähdys tauko."*).
 *
 * KULKU, kun kello saapuu paaluun ELÄVÄSSÄ AJOSSA (sytyta):
 *
 *   1. Kello PYSÄHTYY itsestään. Karuselli ja vuosimittari ovat jo
 *      paalussa, joten mikään ei liiku enää taustalla.
 *   2. Laatikko nousee kartan keskelle (css .aikajana-valinaytos):
 *      otsikko, kertojan teksti ja sen kyljessä isoisän kuva — kapealla
 *      ruudulla kuva tekstin yllä. Tausta himmenee KEVYESTI, ei mustaan:
 *      kartan valot jäävät näkyviin laatikon takana.
 *   3. Kertoja lukee saman tekstin (js/linssipuhe.js, runko
 *      `valinaytos-<vuosi>`). Puuttuva tiedosto on hiljainen.
 *   4. Luennan päätyttyä — tai heti, jos luentaa ei ole — PULU
 *      kommentoi kuplapinossa (js/pollo.js polloLinssikupla, linssin
 *      oma poikkeus kuplaporttiin).
 *   5. Jatka-nappi: kuplat pois, laatikko häipyy, kello jatkaa.
 *
 * KERRAN PER AJO. Paalu voi tulla kohdalle uudestaan (pelaaja selaa
 * taaksepäin ja antaa kellon käydä), eikä hengähdystauko saa toistua;
 * Alusta nollaa muistin. Pysäytetystä kelaus (siirry) ei avaa
 * välinäytöstä lainkaan — silloin pelaaja selaa itse.
 */
/** Kuplien viive, kun kertojan luentaa ei ole tai se ei lähtenyt. */
const VALINAYTOKSEN_KUPLAVIIVE_MS = 600;
/** Jatka-napin hehku alkaa hetken päästä, ei heti (omistaja: "hetkenpäästä"). */
export const VALINAYTOKSEN_HEHKUVIIVE_MS = 2500;
/** Rivien väli ilman luentaa. */
export const VALINAYTOKSEN_RIVIVALI_MS = 1900;
/** Rivit ehtivät ennen luennan loppua: viimeinen syttyy noin 85 %:n kohdalla. */
export const VALINAYTOKSEN_RIVIOSUUS = 0.92;
/** Havainnekuvan kuvakierto merkkipaalulla: vaihtoväli ja häivytys (css). */
export const KUVAKIERTO_MS = 7000;
/** Laatikon poistumisliuku Jatka-napin jälkeen (css .aikajana-valinaytos). */
const VALINAYTOKSEN_POISTUMA_MS = 420;

/** Paneelin kuvan dekoodauksen enimmäisodotus ennen ristihäivytystä. */
const PANEELIN_DEKOODAUSKATTO_MS = 250;
/**
 * Paneelin ristihäivytyksen kesto (css --aikajana-kesto 0,6 s) pienen
 * marginaalin kera: väistyvä sivu poistetaan ja korkeuslukko avataan
 * vasta tämän jälkeen, jottei kumpikaan katkaise liukua kesken.
 */
const PANEELIN_HAIVYTYS_MS = 700;
/*
 * ── HAVAINNEKUVA HÄIPYY, KUN KAMERA LÄHTEE ────────────────────────
 *
 * Omistaja 5.9.2026 klo 00.45, sanatarkasti: *"havainnekuvan pitää
 * häipyä kun kartan animaatio alkaa."* Kamera lähtee kohti seuraavaa
 * lamppua ennakoiden (AIKAJANAN_KAMERAN_ENNAKKO_MS ≈ 1 840 ms ennen
 * syttymistä), ja siihen asti paneelissa on EDELLISEN pysäkin kuva:
 * pallo liikkui kuvan alla, ja kuva jäi seisomaan väärän vuoden
 * kohdalle. Nyt paneeli häipyy samalla hetkellä kun ajo alkaa, ja
 * uusi kuva nousee vasta syttymisen ristihäivytyksessä (vaihdaPaneeli).
 *
 * HÄIVYTYS ON PANEELIN OMA LUOKKA eikä sivun, koska sivu vaihtuu juuri
 * syttymishetkellä: luokka `haipyy` poistetaan uuden sivun myötä
 * yhdestä paikasta, eikä kesken jäänyt häivytys voi jäädä päälle.
 */
export const PANEELIN_ENNAKKOHAIVYTYS_MS = 600;
/** Raahaus alkaa vasta tämän liikkeen jälkeen; sitä lyhyempi on napautus. */
export const PANEELIN_RAAHAUSKYNNYS = 6;
/**
 * Paneelin siirto ja koko muistetaan laitteella (kytkeRaahaus):
 * omistaja 3.9.2026 ilta: "eri kokoisilla näytöillä pelaaja voi itse
 * asetella sopivaan kokoon". Selaimen muisti on mukavuus, ei tila —
 * puuttuessaan oletus.
 */
const PANEELIN_SIIRTO = { dx: 0, dy: 0, koko: 1 };
/*
 * Avaimen versio nousi 4.9.2026 (oletusasettelut näyttöluokittain,
 * css .aikajana-ilmio): vanha muisti olisi pitänyt paneelin entisessä
 * koossa ja paikassa eikä omistajan uusi oletus olisi näkynyt.
 */
const PANEELIN_MUISTIAVAIN = 'matkakirja-linssi-paneeli-v2';
export const PANEELIN_KOKO_MIN = 0.55;
export const PANEELIN_KOKO_MAX = 2.2;
/** Hiiren rullan askel: yksi pykälä (100 yksikköä) ≈ 12 % koon muutos. */
export const PANEELIN_RULLAN_HERKKYYS = 0.0012;

/**
 * KAMERALAATIKKO NÄYTÖN MUODON MUKAAN (omistaja 4.9.2026 iltapäivä,
 * kolme kaappausta oletusasetteluista). Kaaren alue sovitetaan
 * ruutuun, mutta paneeli ja karuselli vievät osan ruudusta, joten
 * laatikkoa jatketaan niiden suuntaan: sovitus on sama, mutta
 * sisältö istuu vapaaseen osaan.
 *
 *   - Nauha peittää alalaidan aina: laatikkoa jatketaan alas 28 %,
 *     jotta kaaren eteläisimmät valot jäävät nauhan yläpuolelle.
 *   - PYSTYNÄYTTÖ (puhelin, tabletti pystyssä): paneeli on ylhäällä
 *     koko leveydeltä, joten laatikkoa jatketaan ylös — kartta
 *     laskeutuu paneelin alle (Rovaniemi noin kolmanneksen kohdalle).
 *   - VAAKANÄYTTÖ: Eurooppa täyttää ruudun lähes kokonaan ja paneeli
 *     (oikea yläkulma, 45 %) peittää koillisnurkan; nauhalle riittää
 *     pienempi jatke alas, ja laatikkoa jatketaan hieman vasemmalle,
 *     jotta Eurooppa istuu aavistuksen oikealla (Lissabon irti
 *     reunasta) kuten omistajan esimerkissä.
 *
 * Puhdas funktio: testi antaa juuren mitat itse.
 */
export const KAMERA_JATKE = { alas: 0.28, ylos: 0.5, vaakaAlas: 0.12, vaakaYlos: 0.14, vasemmalle: 0.08 };
export function kaarenKameralaatikko(alue, juuri) {
  const r = typeof juuri?.getBoundingClientRect === 'function' ? juuri.getBoundingClientRect() : null;
  const pysty = r ? r.height > r.width : false;
  if (pysty) {
    return {
      x: alue.x,
      y: alue.y - alue.h * KAMERA_JATKE.ylos,
      w: alue.w,
      h: alue.h * (1 + KAMERA_JATKE.alas + KAMERA_JATKE.ylos),
    };
  }
  // Pieni jatke ylös myös vaa'assa: vuosipalkki peittää ylälaidan, ja
  // omistajan esimerkissä Bergen istuu noin neljänneksen kohdalla.
  return {
    x: alue.x - alue.w * KAMERA_JATKE.vasemmalle,
    y: alue.y - alue.h * KAMERA_JATKE.vaakaYlos,
    w: alue.w * (1 + KAMERA_JATKE.vasemmalle),
    h: alue.h * (1 + KAMERA_JATKE.vaakaAlas + KAMERA_JATKE.vaakaYlos),
  };
}

function lataaPaneelinMuisti() {
  try {
    const m = JSON.parse(globalThis.localStorage?.getItem(PANEELIN_MUISTIAVAIN) ?? 'null');
    if (m && Number.isFinite(m.koko)) PANEELIN_SIIRTO.koko = rajaaPaneelinKoko(m.koko);
    if (m && Number.isFinite(m.dx) && Number.isFinite(m.dy)) { PANEELIN_SIIRTO.dx = m.dx; PANEELIN_SIIRTO.dy = m.dy; }
  } catch { /* ei muistia */ }
}

function tallennaPaneelinMuisti() {
  try { globalThis.localStorage?.setItem(PANEELIN_MUISTIAVAIN, JSON.stringify(PANEELIN_SIIRTO)); } catch { /* ei muistia */ }
}

/**
 * Rajaa paneelin kokokertoimen: vakioväli ja lisäksi paneelin on
 * mahduttava linssin alueelle (leveys nyt / kerroin nyt = perusleveys).
 *
 * @param {number} koko haluttu kerroin
 * @param {{leveys?:number, kokoNyt?:number, juuriLeveys?:number}} [mitat]
 */
export function rajaaPaneelinKoko(koko, mitat = {}) {
  let ylaraja = PANEELIN_KOKO_MAX;
  const { leveys, korkeus, kokoNyt, juuriLeveys, juuriKorkeus, ylaVara = 0 } = mitat;
  if (leveys > 0 && kokoNyt > 0 && juuriLeveys > 0) {
    ylaraja = Math.min(ylaraja, (juuriLeveys - 16) / (leveys / kokoNyt));
  }
  // Korkeussuunnassa paneelin on mahduttava vuosipalkin alta linssin alareunaan.
  if (korkeus > 0 && kokoNyt > 0 && juuriKorkeus > 0) {
    ylaraja = Math.min(ylaraja, (juuriKorkeus - ylaVara - 16) / (korkeus / kokoNyt));
  }
  ylaraja = Math.max(PANEELIN_KOKO_MIN, ylaraja);
  return Math.min(Math.max(Number.isFinite(koko) ? koko : 1, PANEELIN_KOKO_MIN), ylaraja);
}

/**
 * Rajaa paneelin siirron niin, että paneeli pysyy linssin alueella
 * (vähintään reunan verran näkyvissä joka suuntaan). Puhdas mittojen
 * suhteen: paneelin ja juuren laatikot annetaan tai mitataan.
 *
 * @param {{getBoundingClientRect:Function}} paneeli
 * @param {{getBoundingClientRect:Function}} juuri
 * @param {number} dx haluttu siirto
 * @param {number} dy haluttu siirto
 * @param {{dx:number, dy:number}} [nykyinen] nyt voimassa oleva siirto
 */
export function rajaaPaneelinSiirto(paneeli, juuri, dx, dy, nykyinen = PANEELIN_SIIRTO) {
  const p = paneeli?.getBoundingClientRect?.();
  const j = juuri?.getBoundingClientRect?.();
  if (!p || !j || !(p.width > 0) || !(j.width > 0)) return { dx, dy };
  // Paneelin paikka ilman siirtoa.
  const vasen = p.left - nykyinen.dx;
  const yla = p.top - nykyinen.dy;
  const vara = 8;
  const minX = j.left + vara - vasen;
  const maxX = j.right - vara - (vasen + p.width);
  const minY = j.top + vara - yla;
  const maxY = j.bottom - vara - (yla + p.height);
  return {
    dx: Math.min(Math.max(dx, Math.min(minX, maxX)), Math.max(minX, maxX)),
    dy: Math.min(Math.max(dy, Math.min(minY, maxY)), Math.max(minY, maxY)),
  };
}

/**
 * Naksahduksia enintään kahdeksan sekunnissa (omistajan tilaus
 * 3.9.2026). Tahti voi tuottaa vaihdon joka kehyksellä — nopeutetulla
 * tahdilla tai reduced motion -tilassa jopa 25 vuotta sekunnissa —
 * eikä laskurin naksu saa muuttua konekivääriksi.
 */
export const AIKAJANA_NAKSU_VALI_MS = 125;

/**
 * Puhdas askel: vie kelloa dt millisekuntia ja kertoo, mikä tapahtuma
 * (jos mikään) syttyy. DOM:iton, jotta tahti on testattavissa
 * (tests/aikajana.test.mjs).
 *
 * Nopeus ei ole vakio vaan luetaan paikasta (aikajananNopeus): kello
 * kiihtyy pysäkiltä lähtiessään ja jarruttaa seuraavaa lähestyessään.
 * Siksi kehysväli pilkotaan enintään AIKAJANA_ALIASKEL_MS:n paloihin —
 * niin sama matka kestää yhtä kauan riippumatta kehysvälistä.
 * `tila.alku` on se vuosi, josta liike lähti (tauon hiipimän jälkeen);
 * ilman sitä lähtökohta päätellään edellisestä tapahtumasta.
 *
 * @param {{vuosi:number, i:number, viive:number, viiveTaysi?:number, alku?:number}} tila
 * @param {number} dt millisekuntia edellisestä kehyksestä
 * @param {Array<{vuosi:number, paalu?:boolean}>} tapahtumat
 * @param {{vuosiMs?:number, viiveMs?:number, paaluMs?:number, lineaarinen?:boolean}} [tahti]
 * @returns {{tila:object, syttyi:number|null, loppu:boolean}}
 */
export function aikajanaAskel(tila, dt, tapahtumat, tahti = {}) {
  const vuosiMs = tahti.vuosiMs ?? AIKAJANA_VUOSI_MS;
  const viiveMs = tahti.viiveMs ?? AIKAJANA_VIIVE_MS;
  const paaluMs = tahti.paaluMs ?? AIKAJANA_PAALU_MS;
  const lineaarinen = Boolean(tahti.lineaarinen);
  let { vuosi, i, viive } = tila;
  let alku = tila.alku
    ?? (tapahtumat[i]?.vuosi != null ? tapahtumat[i].vuosi + AIKAJANA_TAUON_OSUUS : vuosi);
  let tauolta = false;
  if (viive > 0) {
    const taysi = tila.viiveTaysi ?? viive;
    viive = Math.max(0, viive - dt);
    // Tauolla ykkösrulla hiipii (AIKAJANA_TAUON_OSUUS) — kello ei seiso.
    const hiipima = taysi > 0 ? AIKAJANA_TAUON_OSUUS * (1 - viive / taysi) : 0;
    vuosi = Math.floor(vuosi) + Math.max(vuosi - Math.floor(vuosi), hiipima);
    // Liike lähtee siitä, mihin hiipimä ehti: kiihdytys jatkaa siitä.
    alku = vuosi;
    if (viive > 0) return { tila: { vuosi, i, viive, viiveTaysi: taysi, alku }, syttyi: null, loppu: false };
    if (i >= tapahtumat.length - 1) return { tila: { vuosi, i, viive: 0, alku }, syttyi: null, loppu: true };
    dt = 0;
    tauolta = true;
  }
  const seuraava = tapahtumat[i + 1];
  if (!seuraava) return { tila: { vuosi, i, viive: 0, alku }, syttyi: null, loppu: true };
  if (dt > 0) {
    if (lineaarinen) {
      vuosi += dt / vuosiMs;
    } else {
      const askelia = Math.max(1, Math.ceil(dt / AIKAJANA_ALIASKEL_MS));
      const pala = dt / askelia;
      for (let n = 0; n < askelia && vuosi < seuraava.vuosi; n += 1) {
        // Etäisyys lähimpään pysäkkiin: lähtökohta tai seuraava vuosi.
        const etaisyys = Math.max(0, Math.min(vuosi - alku, seuraava.vuosi - vuosi));
        vuosi += (pala / vuosiMs) * aikajananNopeus(etaisyys);
      }
    }
  }
  if (vuosi < seuraava.vuosi) return { tila: { vuosi, i, viive: 0, alku }, syttyi: null, loppu: false };
  i += 1;
  const uusiViive = seuraava.paalu ? paaluMs : viiveMs;
  // Kello napsahtaa tapahtuman vuoteen. Saman vuoden ketjussa (tauolta
  // suoraan seuraavaan) hiipinyt osuus säilyy, ettei mittari peruuta.
  const kohta = tauolta ? Math.max(vuosi, seuraava.vuosi) : seuraava.vuosi;
  return {
    tila: { vuosi: kohta, i, viive: uusiViive, viiveTaysi: uusiViive, alku: kohta },
    syttyi: i,
    loppu: false,
  };
}

/*
 * ── KARUSELLI LÄHTEE LIIKKEELLE ENNAKKOON ─────────────────────────
 *
 * Omistaja 4.9.2026 aamu, sanatarkasti: *"Alareunan muotokuvien
 * siirtymisen animointi kannattaa lähteä jo vähän ennakkoon
 * liikkeelle, eli kuva alkaa jo pienentyä vähän ennen vaihtoa ja
 * seuraava suurentua niin että kun kohde vuosi vaihtuu niin animaatio
 * juuri valmistuu. Alareunan animaatio saisi olla noin 2sek
 * pituinen."*
 *
 * MIKSI ETUKÄTEEN LASKETTU SAAPUMISAIKA. Kello ei kulje
 * vakionopeudella (aikajananNopeus), joten "kaksi sekuntia ennen"
 * EI ole sama kuin "kahden sekunnin matka jäljellä" — jarrutuksessa
 * viimeinen vuosi voi kestää monta sekuntia ja täydessä vauhdissa
 * neljäsosasekunnin. Ainoa rehellinen tapa tietää saapumishetki on
 * ajaa sama askel eteenpäin (aikaSeuraavaan), ja se on tässä puhtaana
 * funktiona samasta syystä kuin tahtikin: se rikkoutuu hiljaa.
 *
 * MITÄ ENNAKKO LIIKUTTAA. Vain karusellin kortit. Lamput, kello,
 * paneeli ja paikkarivi vaihtuvat vasta syttymishetkellä (sytyta) —
 * ennakko on liikettä, ei tiedon paljastamista, eikä keksinnön nimeä
 * saa lukea kartalta ennen sen vuotta.
 */
export const KARUSELLIN_ENNAKKO_MS = 2000;
/**
 * Lyhinkään ennakko ei mene tätä alle. Kaksi lähekkäistä pysäkkiä
 * (1895 ja 1896) tai pysäytetystä kellosta jatkaminen antavat vain
 * murto-osan sekunnista aikaa; silloin siirtymä saa valmistua vähän
 * syttymisen jälkeen, koska hyppäys olisi pahempi kuin myöhästyminen.
 */
export const KARUSELLIN_ENNAKKO_POHJA_MS = 400;

/**
 * KUINKA MONTA MILLISEKUNTIA SEURAAVAAN SYTTYMISEEN.
 *
 * Integroi aikajanaAskelta eteenpäin kiinteällä aliaskeleella samalla
 * nopeusprofiililla kuin oikea ajo — tauon jäljellä oleva viive siis
 * mukaan luettuna, koska sekin on odotusta ennen seuraavaa pysäkkiä.
 * `katto` katkaisee laskennan: kehyksessä riittää tietää, onko
 * saapuminen jo ennakon päässä, eikä kaukaisen pysäkin tarkkaa
 * hetkeä tarvitse laskea joka kehyksellä.
 *
 * @param {{vuosi:number, i:number, viive:number}} tila kellon tila
 * @param {Array<{vuosi:number, paalu?:boolean}>} tapahtumat
 * @param {object} [tahti] sama tahti kuin aikajanaAskelilla
 * @param {number} [katto] enimmäisaika, joka jaksetaan laskea
 * @returns {number} millisekuntia syttymiseen; Infinity jos kaari
 *   loppuu ennen sitä tai syttyminen ei osu katon sisään
 */
export function aikaSeuraavaan(tila, tapahtumat, tahti = {}, katto = 120000) {
  if (!Array.isArray(tapahtumat) || !tapahtumat.length) return Infinity;
  let t = tila;
  let kulunut = 0;
  while (kulunut < katto) {
    const askel = Math.min(AIKAJANA_ALIASKEL_MS, katto - kulunut);
    const tulos = aikajanaAskel(t, askel, tapahtumat, tahti);
    kulunut += askel;
    if (tulos.syttyi !== null) return kulunut;
    if (tulos.loppu) return Infinity;
    t = tulos.tila;
  }
  return Infinity;
}

/**
 * ENNAKON PÄÄTÖS JA KESTO YHTENÄ LUKUNA: nolla tarkoittaa "ei vielä".
 *
 * Siirtymä kestää sen, mitä syttymiseen on aikaa, jotta se valmistuu
 * juuri vuosiluvun vaihtuessa. Kaukainen pysäkki (yli ennakon) ei
 * käynnistä mitään; hyvin lähelläkin siirtymä saa pohjakestonsa.
 *
 * @param {number} eta millisekuntia syttymiseen (aikaSeuraavaan)
 * @returns {number} siirtymän kesto ms, tai 0 jos ennakko ei ala
 */
export function ennakonKesto(eta, ennakko = KARUSELLIN_ENNAKKO_MS, pohja = KARUSELLIN_ENNAKKO_POHJA_MS) {
  if (!Number.isFinite(eta) || eta < 0 || eta > ennakko) return 0;
  return Math.min(ennakko, Math.max(pohja, eta));
}

/* ==================== TYYLI ==================== */

const TYYLIN_TUNNUS = 'aikajana-tyyli';

function lataaTyyli() {
  if (typeof document === 'undefined') return null;
  if (document.getElementById(TYYLIN_TUNNUS)) return null;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return null;
  const linkki = document.createElement('link');
  linkki.id = TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('aikajana.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
  return linkki;
}

/* ==================== APURIT ==================== */

function solmu(tag, luokka, teksti) {
  const e = document.createElement(tag);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
}

/** Onko kuvatiedolla lähde: Commons-tiedosto tai valmis ämpäriosoite. */
function onKuva(kuvatieto) {
  return Boolean(kuvatieto?.tiedosto || kuvatieto?.osoite);
}

/* ==================== PIENI KUVAVERSIO ==================== */

/**
 * ÄMPÄRIOSOITTEEN PIENI VERSIO (Raamattu, KEKSIJAT LINSSIN ALARIVILLA
 * kohta 4: *"LINSSIKUVAT ESILADATAAN pienina (640 px WebP, ampari
 * aikajana/keksinnot/pieni/) linssin avautuessa; iso kuva vasta Lue
 * juttu -napista."*).
 *
 * Sääntö on täsmälleen sama kuin pienennystyökalulla
 * (tools/tee-pienet-kuvat.mjs `runkoOsoitteesta` + `ampariAvain`):
 * pieni versio menee ALKUPERÄISEN OMAN kansion `pieni/`-alikansioon ja
 * saa saman rungon WebP-päätteellä. Siksi kaksi kansiota kulkee
 * samalla säännöllä eikä nimilistaa tarvita:
 *
 *   …/aikajana/keksinnot/1769-watt.jpg
 *     → …/aikajana/keksinnot/pieni/1769-watt.webp
 *   …/aikajana/keksinnot/muotokuva/1769-james-watt.jpg
 *     → …/aikajana/keksinnot/muotokuva/pieni/1769-james-watt.webp
 *
 * PALAUTTAA SYÖTTEEN SELLAISENAAN, jos se ei ole URL, jos nimessä ei
 * ole päätettä tai jos osoite on jo pienessä kansiossa. Peli ei saa
 * kaatua kuvan takia — puuttuvan pienen version hoitaa kuvaelementin
 * kertaluontoinen varareitti (asetaAmpariKuva).
 *
 * @param {string} osoite
 * @returns {string}
 */
export function pieniOsoite(osoite) {
  if (typeof osoite !== 'string' || !osoite) return osoite;
  let url;
  try {
    url = new URL(osoite);
  } catch {
    return osoite;
  }
  const osat = url.pathname.split('/');
  const nimi = osat.pop() ?? '';
  const runko = nimi.replace(/\.[a-z0-9]+$/i, '');
  // Ei päätettä (runko === nimi) tai ei nimeä lainkaan: ei kosketa.
  if (!runko || runko === nimi) return osoite;
  if (osat.at(-1) === 'pieni') return osoite;
  url.pathname = [...osat, 'pieni', `${runko}.webp`].join('/');
  return url.href;
}

/**
 * Suurin leveys, jossa pieni versio (640 px) riittää. Sitä isompi
 * pyyntö — käytännössä vain jutun galleria — saa alkuperäisen.
 */
export const PIENEN_KATTO = 640;

/*
 * KARUSELLIN KUVAT VALMIIKSI PIENINÄ JA SUMENNETTUINA (omistaja 3.9.2026,
 * Raamattu: KARUSELLIN KUVAT VALMIIKSI PIENINA). Muotokuvista on ämpärissä
 * kaksi 400 px:n versiota (tools/tee-pienet-kuvat.mjs variantit):
 * karuselli/ (terävä) ja sumea/ (gblur). Kortti näyttää tulevalle
 * pysäkille sumean tiedoston ja muille terävän, joten CSS-suodatinta ei
 * tarvita — liuku ja suurennus ovat pelkkää siirtoa ja läpinäkyvyyttä.
 * Puuttuva versio putoaa pieneen (640) ja siitä alkuperäiseen.
 */
export const KARUSELLIN_KATTO = 400;

/** Muotokuvan karusellikokoinen osoite; muille kuin muotokuville pieni. */
export function karuselliOsoite(osoite, versio = 'karuselli') {
  const pieni = pieniOsoite(osoite);
  if (typeof pieni !== 'string' || !/\/muotokuva\/pieni\//.test(pieni)) return pieni;
  return pieni.replace('/muotokuva/pieni/', `/muotokuva/${versio}/`);
}

/** Valmiiksi sumennettu karusellikuva (vain muotokuvat). */
export function sumeaOsoite(osoite) {
  return karuselliOsoite(osoite, 'sumea');
}

/*
 * ── VARAKUVA: KORTTIIN HAVAINNEKUVA, KUN LÖYTÖÄ EI OLE ────────────
 *
 * Fablen arvio 6.9.2026: Ihmisen matka -kaaren löytökuvat (kallo,
 * kalastuskoukku) eivät ole vielä ämpärissä, ja kortissa oli siksi
 * nimikirjainlaatta ("EI", "SY"). Laatta on ruma eikä kerro mitään,
 * joten kortti putoaa pysäkin HAVAINNEKUVAAN — samaan kuvaan, jonka
 * oikean laidan paneeli näyttää.
 *
 * PUTOAMINEN ON KUVAELEMENTIN OMA `error`, ei erillinen HEAD-kysely:
 * selain hakee osoitteen kerran joka tapauksessa, ja 404 tulee
 * takaisin muutamassa millisekunnissa. Erillinen HEAD tuplaisi
 * pyynnöt ja tarvitsisi oman välimuistinsa. Kun kuvaputki tuo
 * löytökuvat, mikään ei muutu: ensimmäinen pyyntö vastaa 200 eikä
 * varareitille mennä.
 */

/** Viimeinen varareitti: kaaren oma havainnekuva kortissa. */
function otaVarakuva(kuva, vara) {
  if (!vara) return;
  kuva.addEventListener('error', () => {
    if (kuva.getAttribute('src') === vara) return;
    // Rajaus keskeltä (css .varakuva): vaakakuvan turva-alue on keskellä.
    kuva.classList.add('varakuva');
    kuva.src = vara;
  }, { once: true });
}

/**
 * Ämpärikuva elementtiin: pieni versio ensin, alkuperäinen VARANA
 * KERRAN. Kertaluontoinen kuuntelija (`once`) on tässä olennainen:
 * jos varakin kaatuu, uutta yritystä ei tule eikä synny silmukkaa.
 *
 * `pienet: false` on kaaren valinta (aikajana.pienetKuvat): kaarella,
 * jonka kuvista ei ole pieniä versioita ämpärissä, koko portaikko
 * olisi pelkkiä 404:iä. `vara` on ketjun viimeinen askel (ks.
 * VARAKUVA).
 */
function asetaAmpariKuva(kuva, osoite, leveys, { pienet = true, vara = null } = {}) {
  const pieni = pienet && leveys <= PIENEN_KATTO ? pieniOsoite(osoite) : osoite;
  const karuselli = pienet && leveys <= KARUSELLIN_KATTO ? karuselliOsoite(osoite) : pieni;
  // Alkuperäinen on ketjun viimeinen ämpärikuva; sen jälkeen varakuva.
  const alkuperaiseen = () => { otaVarakuva(kuva, vara); kuva.src = osoite; };
  /*
   * Kortin kuva kantaa molemmat karuselliversiot: asettele vaihtaa
   * terävän ja sumean välillä pysäkin mukaan (ei CSS-suodatinta).
   * Varareitit kerran kumpikin: karuselli → pieni → alkuperäinen.
   */
  if (karuselli !== pieni) {
    kuva.dataset.terava = karuselli;
    kuva.dataset.sumea = sumeaOsoite(osoite);
    kuva.dataset.vara = pieni;
  }
  if (pieni !== osoite) {
    kuva.addEventListener('error', () => {
      if (kuva.dataset.vara && kuva.src !== kuva.dataset.vara) {
        delete kuva.dataset.terava;
        delete kuva.dataset.sumea;
        kuva.src = kuva.dataset.vara;
        delete kuva.dataset.vara;
        kuva.addEventListener('error', alkuperaiseen, { once: true });
        return;
      }
      alkuperaiseen();
    }, { once: true });
  } else {
    // Ei pieniä versioita: yksi pyyntö, ja sen jälkeen suoraan varakuva.
    otaVarakuva(kuva, vara);
  }
  kuva.src = karuselli;
}

/**
 * KORTIN KUVAN VAIHTO ILMAN NYKÄYSTÄ (omistaja 3.9.2026: *"alareunan
 * kuvat pitäisi siirtyä animoidusti"*).
 *
 * MIKSI EI SUORAA `img.src = …`. Mitattuna se jätti kortin kuvaan
 * yhden tyhjän kehyksen: heti vaihdon jälkeen `complete` oli epätosi
 * ja `naturalWidth` nolla, eli kortti välähti tyhjänä juuri sillä
 * hetkellä, kun se lähti liukumaan. Uusi bittikartta haetaan ja
 * dekoodataan siksi DOM:in ulkopuolella, ja `src` vaihtuu vasta kun
 * kuva on valmis piirrettäväksi — silloin vaihto tapahtuu yhdessä
 * kehyksessä ilman välähdystä.
 *
 * `data-vaihtoon` on kilpailun esto: jos pysäkki ehtii vaihtua
 * uudelleen ennen dekoodausta, vanhentunut lataus ei enää kirjoita
 * korttiin. Epäonnistunut dekoodaus (puuttuva variantti) asettaa
 * osoitteen silti, jotta asetaAmpariKuva-varareitti pääsee töihin.
 */
function vaihdaKorttikuva(kuva, osoite) {
  if (!osoite || kuva.getAttribute('src') === osoite || kuva.dataset.vaihtoon === osoite) return;
  kuva.dataset.vaihtoon = osoite;
  const pane = () => {
    if (kuva.dataset.vaihtoon !== osoite) return;
    delete kuva.dataset.vaihtoon;
    if (kuva.getAttribute('src') !== osoite) kuva.src = osoite;
  };
  const esilataus = new Image();
  esilataus.decoding = 'async';
  esilataus.src = osoite;
  if (typeof esilataus.decode === 'function') void esilataus.decode().then(pane, pane);
  else pane();
}

/* ==================== VALOKEILAN EPÄSÄÄNNÖLLINEN REUNA ==================== */

/*
 * Omistaja 5.9.2026 ilta, sanatarkasti: *"saisiko havainnekuvan
 * häivytyksen hieman epäsäännöllisemmän muotoiseksi?"*
 *
 * Reuna oli yksi säännöllinen ellipsi (css .aikajana-ilmiokuva
 * mask-image), ja juuri sen säännöllisyys luki koneen tekemäksi. Nyt
 * maski on MONTA soikiota eri keskipisteissä: mask-image-kerrokset
 * yhdistyvät oletuksena unionina (alfa a + b(1−a)), joten keskusta on
 * yhä täysin peittävä mutta ulkoreuna kumpuilee suuntansa mukaan —
 * kuin vanhan valokuvan tai valokeilan pehmeä, epätasainen laita.
 *
 * KOLME EHTOA, JOTKA RATKAISIVAT TOTEUTUSTAVAN:
 *   1. DETERMINISTINEN. Muoto lasketaan siemenluvusta (tapahtuman
 *      indeksi), joten sama kuva saa aina saman reunan — myös
 *      taaksepäin selatessa. Kuvien kesken muoto vaihtelee.
 *   2. KERRAN, EI JOKA KEHYKSELLÄ. Suodattimia (feTurbulence,
 *      feDisplacementMap) ei käytetä lainkaan: iPadilla ne maksaisivat
 *      paneelin ristihäivytyksen jokaisella kehyksellä. Liukuvärit
 *      lasketaan tässä kerran merkkijonoksi, ja selain rasteroi maskin
 *      kerran elementtiä kohti.
 *   3. EI KOVAA REUNAA. Jokainen soikio häipyy nollaan ennen laatikon
 *      laitaa (keskipiste ± säde × ulottuvuus < 100 %), joten
 *      neliöraja ei näy missään — sama vaatimus kuin aiemmin.
 */
/** Soikioita perusmuodon päällä (yksi pohja + nämä). */
export const VALOKEILAN_LOHKOT = 6;

/*
 * VUOSILUVUN JA OTSIKON EROTIN havainnekuvan alla (omistaja 5.9.2026
 * klo 00.45: *"pitäisikö vuosiluvun jälkeen olla tähtisymboli? joku
 * mikä sopisi tyylillisesti"*). Piste `·` on typografian oletus eikä
 * pelin oma; koriste on PELIN OMA MERKKI ◈ — sama, joka on etusivun
 * julisteen hiusviivakoristeessa (index.html .juliste-viiva) ja
 * unohdetun aarteen tunnuksena (js/tokens.js star). Merkki on tässä
 * yhtenä vakiona, jotta se on vaihdettavissa yhdeltä riviltä;
 * kultainen sävy ja pieni koko tulevat css:stä (.aikajana-erotin).
 */
export const AIKAJANAN_EROTIN = '◈';

/** Siemenluvusta toistettava arpoja (mulberry32). */
function valokeilanArpoja(siemen) {
  let a = (Math.imul(Math.floor(Math.abs(siemen)) + 1, 2654435761) + 1013904223) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Havainnekuvan valokeilamaski: pohjasoikio ja sen päälle
 * epäsäännöllisiä lohkoja. Puhdas funktio (ei DOMia), jotta muodon
 * säännöt ovat mitattavissa (tests/aikajana.test.mjs).
 *
 * @param {number} siemen tapahtuman indeksi — sama luku, sama muoto
 * @param {number} [lohkoja] montako soikiota pohjan päälle
 * @returns {string} CSS:n mask-image -arvo (pilkulla erotetut kerrokset)
 */
export function valokeilanMaski(siemen = 0, lohkoja = VALOKEILAN_LOHKOT) {
  const arvo = valokeilanArpoja(siemen);
  const luku = (n) => Math.round(n * 10) / 10;
  const kerrokset = [
    // Pohja: entinen soikio hieman kutistettuna, jotta lohkot pääsevät
    // muotoilemaan reunan eikä pohja peitä niitä alleen.
    'radial-gradient(ellipse 46% 47% at 50% 50%, #000 40%, rgba(0, 0, 0, 0.74) 60%,'
    + ' rgba(0, 0, 0, 0.26) 82%, transparent 98%)',
  ];
  for (let i = 0; i < lohkoja; i += 1) {
    // Lohkot kiertävät kehää tasavälein arvotulla poikkeamalla, jotta
    // yksikään suunta ei jää ilman omaa kumpuaan.
    const kulma = ((i + arvo() * 0.7) / lohkoja) * Math.PI * 2;
    const etaisyys = 6 + arvo() * 5;
    const cx = 50 + Math.cos(kulma) * etaisyys;
    const cy = 50 + Math.sin(kulma) * etaisyys * 0.85;
    const rx = 30 + arvo() * 10;
    const ry = 28 + arvo() * 10;
    kerrokset.push(`radial-gradient(ellipse ${luku(rx)}% ${luku(ry)}% at ${luku(cx)}% ${luku(cy)}%,`
      + ' #000 26%, rgba(0, 0, 0, 0.6) 55%, transparent 92%)');
  }
  return kerrokset.join(', ');
}

/* ==================== ESILADATUT PANEELIKUVAT ==================== */

/**
 * Se osoite, jonka paneeli oikeasti pyytää: sama sääntö kuin
 * asetaAmpariKuva:lla (pieni versio 640 px:iin asti, ulkoinen
 * sellaisenaan). Ilman tätä esilataus hakisi eri tiedoston kuin
 * paneeli — ja kuva tulisi silti perässä.
 *
 * @param {object} kuvatieto
 * @param {number} leveys pyydetty leveys (kuvaTaiLaatan `leveys`)
 * @param {boolean} [pienet] onko kaaren kuvista pieniä versioita
 * @returns {string|null} osoite tai null (Commons-tiedosto tai ei kuvaa)
 */
export function paneelikuvanOsoite(kuvatieto, leveys, pienet = true) {
  const osoite = kuvatieto?.osoite;
  if (!osoite) return null;
  if (kuvatieto.ulkoinen || !pienet) return osoite;
  if (leveys <= KARUSELLIN_KATTO) return karuselliOsoite(osoite);
  return leveys <= PIENEN_KATTO ? pieniOsoite(osoite) : osoite;
}

/**
 * ESILADATTUJEN KUVIEN VARASTO. Yksi pyyntö per osoite (sama kirjanpito
 * kuin ui-apurit esilataaKuvat), ja valmis Image-olio jää talteen,
 * kunnes paneeli ottaa sen käyttöönsä. `ota` antaa elementin vain
 * KERRAN: sama olio ei voi olla kahdessa paikassa DOM-puuta, ja
 * uudelleen katsottu pysäkki saa oman kuvansa selaimen välimuistista.
 */
function luoKuvavarasto(katto = KUVAVARASTON_KATTO) {
  const kuvat = new Map();
  return {
    /** Lataa ja dekoodaa osoitteen, ellei sitä jo ole jonossa. */
    esilataa(osoite) {
      if (!osoite || kuvat.has(osoite) || typeof Image !== 'function') return;
      // Varasto on ETUKENOA eikä välimuisti: vanhin poistuu, kun katto
      // täyttyy (Map muistaa lisäysjärjestyksen). Selaimen oma
      // välimuisti hoitaa loput — nämä oliot vain pitävät bittikartan
      // purettuna niiden parin pysäkin ajan, jotka ovat tulossa.
      while (kuvat.size >= katto) kuvat.delete(kuvat.keys().next().value);
      const kuva = new Image();
      kuva.decoding = 'async';
      const tieto = { kuva, valmis: false };
      kuvat.set(osoite, tieto);
      const merkitse = () => { tieto.valmis = kuva.naturalWidth > 0; };
      /*
       * SITKEÄSTI (6.9.2026, r2.dev 429): kaaren
       * havainnekuvat tulevat samasta ämpäristä kuin kaikki muukin
       * media, ja ohimenevä purskerajoitus jätti esilatauksen
       * tekemättä juuri niiltä pysäkeiltä, joihin ollaan menossa.
       * Uusinta hoitaa sen (js/media.js), ja dekoodaus tehdään vasta
       * onnistuneen latauksen jälkeen kuten ennenkin.
       */
      void lataaKuvaSitkeasti(kuva, osoite, {
        /*
         * JONON OHI. Varasto valmistaa vain kahden seuraavan pysäkin
         * kuvat (enintään kuusi) ja niitä tarvitaan sekunneissa;
         * koko kaaren taustaesilataus (esilataaPienet) on samassa
         * jonossa ja veisi vuorot pitkäksi aikaa. Uusinta on silti
         * mukana — se on tämän muutoksen ydin.
         */
        jonota: false,
        onLatasi: () => {
          // Dekoodaus valmiiksi asti: pelkkä lataus jättäisi WebP:n
          // purkamisen siihen kehykseen, jossa valo syttyy.
          if (typeof kuva.decode === 'function') kuva.decode().then(merkitse, merkitse);
          else merkitse();
        },
        onVirhe: () => kuvat.delete(osoite),
      });
    },
    /** Onko osoite jo dekoodattu valmiiksi? */
    onValmis(osoite) { return Boolean(kuvat.get(osoite)?.valmis); },
    /** Valmis elementti kerran; muuten null. */
    ota(osoite) {
      const tieto = kuvat.get(osoite);
      if (!tieto?.valmis) return null;
      kuvat.delete(osoite);
      return tieto.kuva;
    },
    tyhjenna() { kuvat.clear(); },
    get koko() { return kuvat.size; },
  };
}

/**
 * Kuva pergamentille; ilman lähdettä nimikirjainlaatta.
 *
 * `pienet` on kaaren valinta (aikajana.pienetKuvat) ja kulkee sekä
 * varastohakuun että kuvaelementtiin, jotta esilataus ja paneeli
 * pyytävät varmasti samaa tiedostoa. Kuvatiedon `vara` on kortin
 * varakuva (ks. VARAKUVA).
 */
function kuvaTaiLaatta(kuvatieto, nimi, leveys, luokka, varasto = null, pienet = true) {
  const kehys = solmu('div', `aikajana-kuvakehys ${luokka}`);
  if (onKuva(kuvatieto)) {
    /*
     * ESILADATTU OLIO SELLAISENAAN (omistaja 5.9.2026: *"havainnekuvat
     * pitää esiladata, nyt tulivat vähän perässä"*): varastossa oleva
     * kuva on jo ladattu JA dekoodattu, joten se liitetään suoraan
     * paneeliin — uutta pyyntöä ei lähde eikä dekoodausta odoteta.
     */
    const esiladattu = varasto?.ota?.(paneelikuvanOsoite(kuvatieto, leveys, pienet)) ?? null;
    const kuva = esiladattu ?? document.createElement('img');
    if (esiladattu) kuva.dataset.esiladattu = '1';
    kuva.alt = kuvatieto.selite ?? nimi ?? '';
    kuva.decoding = 'async';
    kuva.loading = 'eager';
    /*
     * Generoitu kuva (kuvaputki, ämpäri) kulkee valmiina `osoite`-
     * kenttänä ilman thumb-putkea — sama sopimus kuin historian
     * hetkillä (js/historian-hetket.js) — mutta pienenä versiona ja
     * alkuperäinen varana (asetaAmpariKuva). Commons-kuva
     * (`tiedosto`) menee peilin ja Commonsin portaita kuten ennen.
     */
    if (esiladattu) {
      // src on jo paikallaan ja bittikartta muistissa: varareittejä ei
      // tarvita, koska esilataus onnistui.
    } else if (kuvatieto.ulkoinen && kuvatieto.osoite) {
      // Kuva oman kansion ulkopuolelta (isoisän valokuva): ei pieni-versiota, ei varareittiä.
      kuva.src = kuvatieto.osoite;
    } else if (kuvatieto.osoite) {
      asetaAmpariKuva(kuva, kuvatieto.osoite, leveys, { pienet, vara: kuvatieto.vara ?? null });
    } else asetaKuva(kuva, valokuvaUrl(kuvatieto.tiedosto, leveys), valokuvaVara(kuvatieto.tiedosto, leveys));
    // Cabinet cardin valkoinen reunus pois (js/isoisan-valokuvat.js rajausTyyli, css .isoisa-rajattu).
    const rajaus = rajausTyyli(kuvatieto);
    if (rajaus) { kuva.style.cssText += rajaus; kuva.classList.add('isoisa-rajattu'); }
    kehys.appendChild(kuva);
  } else {
    const kirjaimet = String(nimi ?? '?').split(/\s+/).map((s) => s[0] ?? '').join('').slice(0, 3);
    kehys.classList.add('tyhja');
    kehys.appendChild(solmu('span', 'aikajana-monogrammi', kirjaimet.toUpperCase()));
  }
  return kehys;
}

/**
 * Pysäkin keksijöiden muotokuvat järjestyksessä. Kaksoispysäkillä
 * (Montgolfier, Cooke ja Wheatstone, Lumière) tekijöitä on kaksi, ja
 * molemmat kuuluvat näkyviin: yksi kasvo kahdesta olisi väärä tieto.
 */
const muotokuvat = (t) => [t.kuva, t.kuvaToinen].filter(onKuva);

/**
 * Teksti virkkeiksi rivi kerrallaan -ladontaa varten: katkaisu pisteen,
 * huuto- tai kysymysmerkin jälkeen, jota seuraa välilyönti. Välimerkki
 * jää virkkeen loppuun; tyhjät pätkät karsitaan.
 */
export function jaaVirkkeiksi(teksti) {
  return String(teksti ?? '').split(/(?<=[.!?…])\s+/).map((v) => v.trim()).filter(Boolean);
}

/**
 * MUOTOKUVAKEHYS: yksi tai kaksi rintakuvaa samassa kehyksessä.
 *
 * Kaksi kuvaa menee vierekkäin (CSS .kaksi), ei päällekkäin — kortti
 * on kapea, joten päällekkäisyys peittäisi toisen kasvot. Ilman
 * yhtäkään kuvaa palataan nimikirjainlaattaan, joka on merkkipaalun
 * ainoa esitys.
 */
function muotokuvaKehys(t, leveys, luokka, pienet = true) {
  const kuvat = muotokuvat(t);
  if (kuvat.length < 2) {
    return kuvaTaiLaatta(kuvat[0] ?? null, t.henkilo ?? t.otsikko, leveys, luokka, null, pienet);
  }
  const kehys = solmu('div', `aikajana-kuvakehys ${luokka} kaksi`);
  for (const kuvatieto of kuvat) {
    const kuva = document.createElement('img');
    kuva.alt = kuvatieto.selite ?? t.henkilo ?? '';
    kuva.decoding = 'async';
    kuva.loading = 'eager';
    if (kuvatieto.osoite) {
      asetaAmpariKuva(kuva, kuvatieto.osoite, leveys, { pienet, vara: kuvatieto.vara ?? null });
    } else asetaKuva(kuva, valokuvaUrl(kuvatieto.tiedosto, leveys), valokuvaVara(kuvatieto.tiedosto, leveys));
    kehys.appendChild(kuva);
  }
  return kehys;
}

/** Kaupungin nimi tapahtumasta (paikka on datan kenttä). */
const paikka = (t) => t.paikka ?? t.kaupunki ?? '';

/*
 * NÄYTETTÄVÄ AJOITUS. Keksintökaaressa se on vuosiluku ja tulee
 * suoraan kellon koordinaatista; "vuotta sitten" -asteikolla vuosi on
 * pysäkin paikka kellossa eikä tarkoita ruudulla mitään, ja pysäkin oma
 * teksti (`ajoitus`: "300 000 vuotta sitten", "n. 1250 jaa.") on ainoa
 * rehellinen luku. Yksi apuri, jotta kortti, lamppu, kellorivi ja
 * havainnekuvan teksti eivät voi ajautua eri sanoihin.
 */
const ajoitus = (t) => t.ajoitus ?? t.vuosi;

/* ==================== KARUSELLI ==================== */

/*
 * ALARIVI ON KARUSELLI (omistaja 3.9.2026, sanatarkasti: *"nuo
 * henkiloiden kuvat voisi tayttaa koko alarivin niin etta nykyinen
 * henkilo on aina keskella ruutua ja kaikki vasemmalla ja oikealla
 * puolella olevat ovat merkittavasti pienempia ja kaikki vasemmalla
 * puolella ovat kevyesti blurattuja"*).
 *
 * MIKSI PUHTAANA FUNKTIONA. Koko asettelu on yhtä laskentaa: kuinka
 * kaukana keskeltä kortti on, kuinka pieni se on, näkyykö se ja
 * kuinka sumea se on. Laskenta rikkoutuu hiljaa (kortti liukuu ruudun
 * ulkopuolelle tai keskikortti ei ole keskellä), joten se on tässä
 * DOM:ittomana ja testattavana — kuten tahti ja vuosiluvun rullaus.
 * DOM saa vain valmiit luvut CSS-muuttujiin (asettele).
 */

/**
 * Kortin mitta etäisyyden mukaan: nykyinen täysi, naapurit
 * *"merkittavasti pienempia"* ja kauempana vielä pienempiä. Neljäs
 * arvo on pohja — sitä kauempana kortti ei enää kutistu, jotta
 * kasvot pysyvät tunnistettavina reunaan asti.
 */
/*
 * NYKYINEN ON SELVÄSTI ISOIN (omistaja 3.9.2026: *"valittu henkilö ja
 * hänen kuvansa saa olla vielä paljon isommalla"*): 1,45 x kortin
 * leveys, naapurit 0,62 ja siitä pienenevät. Nauhan korkeus css:ssä
 * (.aikajana-nauha) on mitoitettu tämän kertoimen mukaan.
 */
export const KARUSELLIN_MITAT = [1.45, 0.62, 0.52, 0.44];

/** Korttien väli: peräkkäisten korttien keskimitta + 5 % rakoa. */
export const KARUSELLIN_VALI = 1.05;

export function karusellinMitta(etaisyys) {
  const d = Math.min(Math.abs(Math.trunc(etaisyys)), KARUSELLIN_MITAT.length - 1);
  return KARUSELLIN_MITAT[d];
}

/**
 * Kortin keskipisteen etäisyys nauhan keskeltä KORTIN LEVEYKSINÄ.
 *
 * Kertyvä summa eikä vakioaskel: kun kortit kutistuvat ulospäin,
 * vakioaskel jättäisi reunoille ammottavat raot. Kahden vierekkäisen
 * kortin väli on niiden mittojen keskiarvo, joten karuselli pakkautuu
 * tasaisesti reunaa kohti.
 */
export function karusellinEtaisyys(d) {
  let x = 0;
  for (let k = 1; k <= Math.abs(d); k += 1) {
    x += ((karusellinMitta(k - 1) + karusellinMitta(k)) / 2) * KARUSELLIN_VALI;
  }
  return x;
}

/**
 * Yhden kortin paikka karusellissa.
 *
 * @param {number} i kortin järjestysnumero (kronologinen)
 * @param {number} nyt nykyisen pysäkin numero (-1 ennen ensimmäistä)
 * @param {number} leveysKortteina nauhan leveys kortin leveyksinä
 * @returns {{paikka:number, mitta:number, luokka:string,
 *   himmeys:number, sumennus:number, jarjestys:number}}
 *   `paikka` on negatiivinen menneille (vasemmalle) ja positiivinen
 *   tuleville (oikealle), yksikkönä kortin leveys.
 */
export function karusellinPaikat(i, nyt, leveysKortteina) {
  const ero = i - nyt;
  const d = Math.abs(ero);
  const mitta = karusellinMitta(d);
  const paikka = Math.sign(ero) * karusellinEtaisyys(d);
  // Mahtuuko kortti kokonaan ruudulle? Nykyinen mahtuu aina — se on
  // keskellä, ja ilman sitä nauha olisi tyhjä kapeimmalla puhelimella.
  const puolikas = Math.max(1, leveysKortteina || 0) / 2;
  const mahtuu = ero === 0 || Math.abs(paikka) + mitta / 2 <= puolikas;
  let luokka = 'piilossa';
  if (ero === 0) luokka = 'nykyinen';
  else if (mahtuu) luokka = ero < 0 ? 'mennyt' : 'tuleva';
  /*
   * TULEVAT SUMENTUVAT, MENNEET EIVÄT (omistajan oikaisu 3.9.2026:
   * *"Nyt kuvien blurraus menee juuri väärin päin, eli jo nähdyt
   * henkilöt pitäisi olla ei-blurrattuja, ja ne henkilöt, joiden
   * keksinnöt on vasta tulossa, pitäisi olla blurrattuna"*). Sumennus
   * on kevyt — 1,5–2 px — jotta kasvot yhä erottuvat: kyse on siitä,
   * ettei tulevaa vielä tiedä. Menneet erottuvat koolla ja vaimeudella.
   */
  const sumennus = ero > 0 ? Math.min(2, 1.5 + (d - 1) * 0.25) : 0;
  let himmeys = 1;
  if (ero < 0) himmeys = Math.max(0.4, 0.82 - (d - 1) * 0.14);
  else if (ero > 0) himmeys = Math.max(0.5, 0.9 - (d - 1) * 0.12);
  if (luokka === 'piilossa') himmeys = 0;
  return {
    paikka,
    mitta,
    luokka,
    himmeys,
    sumennus,
    // Lähempänä keskustaa oleva kortti peittää kauempana olevan.
    jarjestys: 100 - d,
  };
}

/* ==================== KELLON ASTEIKKO ==================== */

/*
 * KAKSI ASTEIKKOA, YKSI KELLO (omistajan päätös 5.9.2026: linssi
 * "Ihmisen matka", nykyihmisen leviäminen Afrikasta 300 000 vuotta
 * sitten n. vuoteen 1300 jaa.).
 *
 * Keksintökaaressa kellon lukema ON vuosiluku: se kasvaa yhden vuoden
 * kerrallaan ja tyhjä vuosi kestää AIKAJANA_VUOSI_MS. Sama tahti olisi
 * esihistoriassa mahdoton — 300 000 vuotta olisi 22 tuntia — eikä
 * lineaarinen asteikko olisi edes rehellinen: viimeisten pysäkkien
 * välit ovat tuhansia vuosia ja ensimmäisten kymmeniä tuhansia.
 *
 * Siksi kellolla on ASTEIKKO, ja se on tapahtumadatan valinta eikä
 * moottorin oletus:
 *
 *   vuosi          (oletus) kellon paikka on vuosiluku. Keksinnöt
 *                  saavat täsmälleen entisen käytöksensä — tämä on
 *                  se haara, joka ajetaan kun kaari ei pyydä muuta.
 *   vuosiaSitten   kellon paikka on PYSÄKKIEN KOORDINAATISTO: jokainen
 *                  väli on yhtä pitkä (ASTEIKON_VALI yksikköä), joten
 *                  jokainen pysäkkiväli kestää saman reaaliajan kuin
 *                  keksinnöissä keskimääräinen väli. Kellon LUKEMA
 *                  interpoloidaan välillä LOGARITMISESTI (geometrinen
 *                  keskiarvo), koska ihmissilmä lukee syvästä ajasta
 *                  suhteita eikä erotuksia: 300 000 → 210 000 on sama
 *                  askel kuin 3 000 → 2 100.
 *
 * Lukema on suuri, joten kello ei näytä yksittäisiä vuosia vaan
 * pyöristää (kellonAskel): 300 000 vuoden kohdalla tuhannen tarkkuus,
 * tuhannen kohdalla yhden. Ilman porrasta viimeinen rulla pyörisi
 * kymmeniä tuhansia numeroita sekunnissa eli harmaana sotkuna.
 *
 * Näytettävä TEKSTI pysäkillä tulee aina datasta (`ajoitus`):
 * "300 000 vuotta sitten", "n. 1250 jaa.". Kello on rullaava luku
 * välillä, teksti on pysäkin oma sana.
 */

/** Kellon askelia yhden pysäkkivälin yli "vuotta sitten" -asteikolla. */
export const ASTEIKON_VALI = 10;
/** Numeroita kellossa oletusasteikolla (nelinumeroinen vuosiluku). */
export const KELLON_NUMEROT = 4;

/*
 * ── KELLON ASKEL ON PYSÄKKIVÄLIN OMA (Fablen arvio 6.9.2026) ───────
 *
 * Ensimmäisessä toteutuksessa askel tuli lukeman suuruudesta (100 000
 * → tuhat vuotta, 10 000 → sata). Se näytti kartalla tältä: yksi
 * pysäkkiväli kestää noin 2,6 sekuntia, ja ensimmäisellä välillä
 * (300 000 → 233 000) kello ehti vaihtua 67 kertaa — kuusinumeroinen
 * luku pyöri harmaana sotkuna, ja koska matkamittari kuljettaa
 * VAIHTUVAA numeroa murto-osan verran, näkyvissä oli lisäksi
 * puolittaisia numeroita.
 *
 * Askel lasketaan siksi VÄLISTÄ eikä lukemasta: jokainen väli saa
 * suurimman tikkaan (KELLON_ASKELEET), jolla kello vaihtuu välin
 * aikana noin KELLON_MUUTOKSIA_VALILLA kertaa. Silloin vaihtoja on
 * kaikilla väleillä kahdesta neljään sekunnissa riippumatta siitä,
 * onko väli 67 000 vai 500 vuotta — ja koska jokainen tikas on sadan
 * monikerta, kahta viimeistä nollaa (isoissa askelissa kolmea) ei
 * pyöritetä lainkaan.
 */

/**
 * Askeltikkaat. Sadan monikertoja: viimeiset nollat seisovat aina.
 * Väliarvot 200, 2 000 ja 20 000 ovat mukana siksi, että pelkillä
 * kymmenpotensseilla lähin tikas heittäisi viisinkertaisesti.
 */
export const KELLON_ASKELEET = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];

/** Montako kertaa kello saa vaihtua yhden pysäkkivälin aikana. */
export const KELLON_MUUTOKSIA_VALILLA = 6;

/**
 * Yhden pysäkkivälin askel: suurin tikas, joka mahtuu väliin
 * KELLON_MUUTOKSIA_VALILLA kertaa. Lyhyilläkin väleillä (40 500 →
 * 40 000) jää pienin tikas, jotta kello liikkuu edes vähän.
 */
export function valinAskel(alku, loppu, muutoksia = KELLON_MUUTOKSIA_VALILLA) {
  const tavoite = Math.abs(alku - loppu) / Math.max(1, muutoksia);
  let askel = KELLON_ASKELEET[0];
  for (const tikas of KELLON_ASKELEET) if (tikas <= tavoite) askel = tikas;
  return askel;
}

/**
 * Kellon pyöristys lukeman kohdalla. `arvot` on pysäkkien
 * vuosiaSitten-lista laskevassa järjestyksessä; askel on sen välin
 * askel, jolla lukema on. Ilman listaa (tai sen ulkopuolella)
 * palautetaan lähimmän välin askel, jottei funktio koskaan palauta
 * nollaa.
 */
export function kellonAskel(lukema, arvot = []) {
  const luvut = (arvot ?? []).filter((v) => Number.isFinite(v));
  if (luvut.length < 2) return KELLON_ASKELEET[0];
  const a = Math.abs(lukema);
  for (let i = 0; i < luvut.length - 1; i += 1) {
    // Väli on [alku, loppu] laskevassa järjestyksessä; yläpää mukaan.
    if (a <= luvut[i] && a >= luvut[i + 1]) return valinAskel(luvut[i], luvut[i + 1]);
  }
  return a > luvut[0]
    ? valinAskel(luvut[0], luvut[1])
    : valinAskel(luvut.at(-2), luvut.at(-1));
}

/*
 * ── VIIMEISET PYSÄKIT OVAT VUOSILUKUJA (Fablen arvio 6.9.2026) ─────
 *
 * Kaaren loppupää on niin lähellä nykyaikaa, että "750 v. sitten" on
 * huonompi luku kuin "n. 1250 jaa." — ja aineisto sanoo saman:
 * viimeisen pysäkin `ajoitus` on "noin 1250–1300 jaa.". Kun lukema
 * alittaa KELLON_JAA_RAJAN, kello vaihtaa rullista TEKSTIIN ja näyttää
 * vuosiluvun. Nykyhetki on pyöreä 2000 (sama kuin aineiston
 * "vuotta sitten" -luvuissa: 750 → 1250 jaa.), ja luku pyöristetään
 * viiteenkymmeneen vuoteen, jotta kello päätyy tasan siihen lukuun,
 * jonka viimeinen pysäkki sanoo.
 */

/** Tämän alle mentäessä kello näyttää vuosiluvun tekstinä. */
export const KELLON_JAA_RAJA = 1900;
/** "Vuotta sitten" -lukujen nykyhetki (aineiston oma pyöristys). */
export const KELLON_NYKYHETKI = 2000;
/** Vuosiluvun pyöristys tekstitilassa. */
export const KELLON_VUOSI_TARKKUUS = 50;

/**
 * Kellon lukema vuosilukutekstinä, tai null jos ollaan yhä syvässä
 * ajassa. Puhdas funktio (tests/ihmisen-matka.test.mjs).
 */
export function kellonVuositeksti(lukema, raja = KELLON_JAA_RAJA) {
  if (!(Number.isFinite(lukema) && lukema < raja)) return null;
  const vuosi = Math.round((KELLON_NYKYHETKI - lukema) / KELLON_VUOSI_TARKKUUS)
    * KELLON_VUOSI_TARKKUUS;
  return vuosi > 0 ? `n. ${vuosi} jaa.` : `n. ${Math.abs(vuosi) || 0} eKr.`;
}

/**
 * "Vuotta sitten" -lukema kellon paikasta. Pysäkkien välit ovat yhtä
 * pitkiä ja vuodet interpoloidaan geometrisesti (logaritminen asteikko).
 *
 * @param {number} paikka kellon paikka (0 = ensimmäinen pysäkki)
 * @param {Array<number>} arvot pysäkkien vuosiaSitten järjestyksessä
 * @returns {number} vuosia sitten
 */
export function vuosiaSittenLukema(paikka, arvot, vali = ASTEIKON_VALI) {
  if (!arvot?.length) return 0;
  const p = Math.max(0, Math.min(paikka, (arvot.length - 1) * vali));
  const i = Math.min(arvot.length - 2, Math.floor(p / vali));
  if (i < 0) return arvot[0];
  const f = Math.max(0, Math.min(1, p / vali - i));
  const a = arvot[i];
  const b = arvot[i + 1];
  // Nolla tai negatiivinen ei kelpaa logaritmille: silloin suora.
  if (!(a > 0) || !(b > 0)) return a + (b - a) * f;
  return a * ((b / a) ** f);
}

/**
 * Kellon asteikko kaaresta. Palauttaa aina olion, myös oletusasteikolla
 * — silloin lukema on vuosiluku sellaisenaan ja kaikki kentät ovat
 * entiset arvot (numerot 4, suunta ylöspäin, ei yksikköä).
 *
 * @param {object} kaari linssin `aikajana`-lohko
 */
export function luoAsteikko(kaari) {
  const tapahtumat = kaari?.tapahtumat ?? [];
  if (kaari?.asteikko !== 'vuosiaSitten') {
    return {
      laji: 'vuosi',
      numerot: KELLON_NUMEROT,
      suunta: 1,
      yksikko: '',
      ryhmitys: false,
      // Keksintökello on matkamittari: ykkösrulla kulkee murto-osan.
      murtoOsa: true,
      alku: kaari?.alku ?? 0,
      loppu: kaari?.loppu ?? 0,
      lukema: (paikka) => paikka,
      askel: () => 1,
      teksti: () => null,
    };
  }
  const arvot = [...tapahtumat]
    .map((t) => Number(t?.vuosiaSitten))
    .filter((v) => Number.isFinite(v))
    .sort((a, b) => b - a);
  const suurin = arvot[0] ?? 0;
  return {
    laji: 'vuosiaSitten',
    // Numeroita niin monta kuin vanhimmassa pysäkissä on.
    numerot: Math.max(KELLON_NUMEROT, String(Math.round(suurin)).length),
    // Lukema PIENENEE ajan kuluessa: rullat kääntyvät toisin päin.
    suunta: -1,
    yksikko: kaari.yksikko ?? 'v. sitten',
    ryhmitys: true,
    /*
     * EI MURTO-OSAA (Fablen arvio 6.9.2026): syvässä ajassa kello
     * etenee askelin, ja jokainen askel on oma pieni rullauksensa.
     * Murto-osa näyttäisi tässä vain puolittaisia numeroita, koska
     * vaihtoja on välillä useita sekunnissa.
     */
    murtoOsa: false,
    /*
     * Lähtö on puoli väliä ennen ensimmäistä pysäkkiä: kello ehtii
     * näkyä lukuna ennen kuin ensimmäinen valo syttyy, kuten
     * keksinnöissä kaari alkaa neljä vuotta ennen Wattia.
     */
    alku: -ASTEIKON_VALI / 2,
    loppu: Math.max(0, arvot.length - 1) * ASTEIKON_VALI,
    lukema: (paikka) => vuosiaSittenLukema(paikka, arvot),
    // Askel tulee siitä pysäkkivälistä, jolla lukema on (ks. KELLON ASKEL).
    askel: (lukema) => kellonAskel(lukema, arvot),
    // Loppupäässä kello vaihtaa vuosilukuun (ks. VIIMEISET PYSÄKIT).
    teksti: (lukema) => kellonVuositeksti(lukema),
  };
}

/**
 * Pysäkit kellon järjestykseen ja kellon koordinaatistoon.
 *
 * Oletusasteikolla `vuosi` on vuosiluku ja järjestys sen mukainen
 * (saman vuoden sisällä datan järjestys). "Vuotta sitten" -asteikolla
 * pysäkit järjestetään vanhimmasta uusimpaan ja `vuosi` KORVATAAN
 * kellon paikalla (n × ASTEIKON_VALI) — näytettävä teksti tulee
 * `ajoitus`-kentästä, jota moottori käyttää kaikkialla, missä ennen
 * ladottiin vuosiluku.
 *
 * @returns {Array<object>} kopiot pysäkeistä kenttä `n` (datan indeksi)
 */
export function jarjestaTapahtumat(tapahtumat, asteikko) {
  const lista = [...(tapahtumat ?? [])].map((t, n) => ({ ...t, n }));
  if (asteikko?.laji !== 'vuosiaSitten') {
    return lista.sort((a, b) => (a.vuosi - b.vuosi) || (a.n - b.n));
  }
  lista.sort((a, b) => (b.vuosiaSitten - a.vuosiaSitten) || (a.n - b.n));
  return lista.map((t, k) => ({ ...t, vuosi: k * ASTEIKON_VALI }));
}

/**
 * Kellon näyttämä kokonaisluku: lukema pyöristettynä askeleen
 * tarkkuuteen. Laskeva kello pyöristää YLÖS — näkyvä luku on se, josta
 * rulla on matkalla seuraavaan.
 */
export function kellonNaytto(lukema, askel = 1, suunta = 1) {
  const yksikot = Math.max(0, lukema) / askel;
  return (suunta < 0 ? Math.ceil(yksikot) : Math.floor(yksikot)) * askel;
}

/* ==================== VUOSILUKU RULLAA ==================== */

/**
 * VUOSILUVUN RULLAUS (omistajan tilaus 3.9.2026: *"sen vuosiluvun
 * animoida niin, että numero pyörähtää ylhäältä alas, kuin
 * hedelmäpeli automaatissa"*).
 *
 * Jokainen numeromerkki on oma rulla (span.vuosi-numero), jonka
 * sisällä on kaksi päällekkäistä riviä: näkyvä merkki ja sen alle
 * väistyvä vanha. Vaihdossa vanha liukuu ikkunasta alas ja uusi tulee
 * ylhäältä sen tilalle — yksi liike myös silloin, kun vuosi hyppää
 * monta askelta (kortista toiseen kelaus): välivuosia ei käydä läpi.
 *
 * VAIN MUUTTUNEET NUMEROT LIIKKUVAT: 1769 → 1770 rullaa kaksi oikeaa
 * numeroa, vuosituhat ja -sata seisovat paikallaan. Kesto ja kaari
 * ovat Raamatun animaatiosäännön rajoissa (nopeutus ja hidastus,
 * 200–400 ms); `heti` on sekä linssin avaus että
 * prefers-reduced-motion, joissa merkki vaihtuu ilman liikettä.
 *
 * DOM:iton siltä osin kuin mahdollista: rulla on pelkkä
 * `{ vanha, uusi, merkki }` -pari, joten tahdin tapaan tämäkin on
 * testattavissa tyngällä (tests/aikajana.test.mjs).
 */
export const VUOSI_RULLAUS_MS = 320;
export const VUOSI_RULLAUS_KAARI = 'cubic-bezier(0.22, 0.9, 0.24, 1)';

function asetaRivi(rivi, y, siirtyma) {
  rivi.style.transition = siirtyma;
  rivi.style.transform = `translateY(${y}%)`;
}

/**
 * MATKAMITTARI: näyttää vuosiluvun rullissa murto-osaa myöten.
 *
 * Omistaja 3.9.2026 ilta: *"viimeisin numero liikkuu kokoajan alhaalta
 * ylös paljastaen aina uuden numeron ja samalla lailla myös isommat
 * kymmenet ja sadat vaihtuvat, tosin vasta numeron 9 kohdalla alkaa
 * niissä liike"*. Jokaisessa rullassa on kaksi riviä: `vanha` näyttää
 * nykyisen numeron ja `uusi` sitä seuraavan numeron alapuolella. Rivit
 * nousevat murto-osan verran: ykkösrulla kellon murto-osavuoden
 * mukaan, ylemmät rullat vain silloin, kun kaikki alemmat ovat 9:ssä
 * (mekaanisen matkamittarin tapaan).
 *
 * Kellon käydessä kutsu tulee joka kehyksellä ilman siirtymää; `liuku`
 * on pysäytetyn kellon hyppy pysäkiltä toiselle, jolloin vaihtuvat
 * numerot rullaavat yhdellä liikkeellä (vanha alas, uusi ylhäältä)
 * Raamatun animaatiosäännön kestolla. `heti` asettaa merkit paikoilleen
 * ilman liikettä (avaus, prefers-reduced-motion).
 *
 * ASKEL JA SUUNTA ovat "vuotta sitten" -asteikon jatke (ks. KELLON
 * ASTEIKKO): `askel` on pyöristys (1, 10, 100, 1000), jolloin sitä
 * pienemmät rullat ovat pyöristyksen nollia ja murto-osa liikuttaa
 * askeleen kohdalla olevaa rullaa; `suunta` −1 kääntää mittarin
 * laskevaksi (uusi numero tulee alhaalta, seuraava luku on pienempi).
 * Oletukset 1 ja 1 ovat entinen kello.
 *
 * MURTO-OSA ON ASTEIKON VALINTA (Fablen arvio 6.9.2026):
 * `murtoOsa: false` panee rullat seisomaan askelten välissä, jolloin
 * numero vaihtuu kerralla eikä ruudulla näy puolittaisia numeroita.
 * Syvässä ajassa vaihtoja on useita sekunnissa, ja silloin jatkuva
 * kuljetus on pelkkää sotkua; keksintökellon oletus (true) on entinen.
 *
 * @param {Array<{vanha:object, uusi:object, merkki:?string}>} rullat
 * @param {number} vuosi vuosiluku murto-osineen (1769.4)
 * @param {{liuku?:boolean, heti?:boolean, askel?:number, suunta?:number,
 *   murtoOsa?:boolean}} [asetukset]
 * @returns {Array} rullat, joiden numero vaihtui
 */
export function asetaMatkamittari(rullat, vuosi, {
  liuku = false, heti = false, askel = 1, suunta = 1, murtoOsa = true,
} = {}) {
  const arvo = Math.max(0, Number.isFinite(vuosi) ? vuosi : 0);
  const alas = suunta < 0;
  const yksikot = arvo / askel;
  const kokonainen = alas ? Math.ceil(yksikot) : Math.floor(yksikot);
  const teksti = String(kokonainen * askel).padStart(rullat.length, '0');
  const osuus = heti || !murtoOsa ? 0 : Math.abs(yksikot - kokonainen);
  const siirtyma = liuku && !heti ? `transform ${VUOSI_RULLAUS_MS}ms ${VUOSI_RULLAUS_KAARI}` : 'none';
  // Askeleen alapuoliset rullat ovat pyöristyksen nollia: ne eivät
  // liiku eivätkä vie murto-osaa ylöspäin (ks. kellonAskel).
  const askelIndeksi = rullat.length - 1 - Math.round(Math.log10(askel));
  // Laskeva kello kääntyy toisin päin: uusi numero tulee alhaalta ja
  // seuraava luku on yhtä pienempi.
  const s = alas ? -1 : 1;
  const raja = alas ? '0' : '9';
  const muuttuneet = [];
  const hypyt = [];
  let alemmatRajalla = true;
  for (let k = rullat.length - 1; k >= 0; k -= 1) {
    const rulla = rullat[k];
    const merkki = teksti[k] ?? '0';
    const seuraava = String((Number(merkki) + (alas ? 9 : 1)) % 10);
    const f = k <= askelIndeksi && alemmatRajalla ? osuus : 0;
    if (rulla.merkki !== merkki) {
      muuttuneet.push(rulla);
      if (siirtyma !== 'none' && rulla.merkki != null) {
        // Hyppy: vanha numero liukuu alas, uusi tulee ylhäältä.
        rulla.vanha.textContent = rulla.merkki;
        rulla.uusi.textContent = merkki;
        asetaRivi(rulla.vanha, 0, 'none');
        asetaRivi(rulla.uusi, -100 * s, 'none');
        hypyt.push(rulla);
        rulla.merkki = merkki;
        if (k <= askelIndeksi) alemmatRajalla = alemmatRajalla && merkki === raja;
        continue;
      }
      rulla.merkki = merkki;
    }
    rulla.vanha.textContent = merkki;
    rulla.uusi.textContent = seuraava;
    // Kolmen desimaalin tarkkuus riittää ruudulle ja pitää tyylin siistinä.
    asetaRivi(rulla.vanha, Math.round(-s * f * 100000) / 1000, 'none');
    asetaRivi(rulla.uusi, Math.round(s * (1 - f) * 100000) / 1000, 'none');
    if (k <= askelIndeksi) alemmatRajalla = alemmatRajalla && merkki === raja;
  }
  if (hypyt.length) {
    // Yksi pakotettu asettelu: ilman lukua siirtymä ei lähtisi lainkaan.
    void hypyt[0].uusi.offsetHeight;
    for (const rulla of hypyt) {
      asetaRivi(rulla.vanha, 100 * s, siirtyma);
      asetaRivi(rulla.uusi, 0, siirtyma);
    }
  }
  return muuttuneet;
}

/* ==================== MOOTTORI ==================== */

class Aikajana {
  constructor(ui, linssi) {
    this.ui = ui;
    this.linssi = linssi;
    const kaari = linssi.aikajana;
    this.kaari = kaari;
    /*
     * KELLON ASTEIKKO RATKAISTAAN KERRAN (ks. KELLON ASTEIKKO).
     * Oletuksella kellon paikka on vuosiluku ja kaikki on kuten ennen;
     * "vuotta sitten" -kaarella pysäkit saavat kellon koordinaatit ja
     * lukema interpoloidaan logaritmisesti.
     */
    this.asteikko = luoAsteikko(kaari);
    // Vuosi ratkaisee järjestyksen; saman vuoden sisällä datan järjestys.
    this.tapahtumat = jarjestaTapahtumat(kaari.tapahtumat, this.asteikko);
    this.alku = this.asteikko.alku;
    this.loppu = this.asteikko.loppu;
    /** Kaaren jakso kellorivillä: datan oma teksti tai vuosiluvut. */
    this.jakso = kaari.jakso ?? `${this.alku}–${this.loppu}`;
    /** Lähikuvan perusmitta pallolla; kaari saa antaa väljemmän. */
    this.lahikuva = kaari.lahikuva ?? AIKAJANAN_LAHIKUVA_LEVEYS;
    /*
     * Kaaren oma luentakansio ämpärissä (js/linssipuhe.js). Ilman
     * kenttää soittimen oletus eli keksintöjen kansio; puuttuva
     * tiedosto on hiljainen, ei virhe.
     */
    this.luentajuuri = kaari.luentajuuri ?? undefined;
    /*
     * ONKO KAAREN KUVISTA PIENIÄ VERSIOITA ämpärissä (Fablen arvio
     * 6.9.2026). Keksinnöillä on (tools/tee-pienet-kuvat.mjs), Ihmisen
     * matkalla ei vielä — ja ilman tätä lippua jokainen kuva haettiin
     * ensin kansiosta `pieni/`, joka vastasi 404. Kun työkalu joskus
     * ajetaan myös tälle kaarelle, lippu poistetaan datasta.
     */
    this.pienetKuvat = kaari.pienetKuvat !== false;
    /** Reittiviivan pätkät (kaari, jolla `reitti: true`). */
    this.reittiOsat = null;
    this.tila = { vuosi: this.alku, i: -1, viive: 0 };
    this.kaynnissa = false;
    this.loppu = false;
    this.raf = 0;
    this.viime = 0;
    this.kortit = [];
    this.valot = [];
    /*
     * LAUTA RATKAISTAAN KERRAN (aalto 2A). Pallolaudalla valot ja
     * tummennus piirretään laudan linssiapurilla, tasokartalla
     * ui.svg:hen; lauta ei voi vaihtua kesken ajon, koska laudan vaihto
     * purkaa aikajanan (js/ui.js drawBoard → pysaytaAikajana).
     */
    this.lauta = pallolautaAlla(ui) ? ui.pallolauta : null;
    this.pallolla = Boolean(this.lauta);
    /** Ruutukalvon kahva pallolla ({ pura, paivita }) ja reiän liuku. */
    this.kalvo = null;
    /** Liekkivalojen kerros pallolla (js/aikajana-valo.js). */
    this.liekit = null;
    this.reianLiuku = 0;
    this.reianMerkki = 0;
    this.reianPaikka = null;
    /*
     * ENNAKON TILA. `ennakkoKohde` on se pysäkki, johon karuselli on
     * jo matkalla vaikkei kello ole vielä siellä; null = karuselli
     * seuraa kelloa. `teravoitus` on kuuntelija, joka vaihtaa sumean
     * muotokuvan terävään kortin päästyä täyteen mittaansa.
     */
    this.ennakkoKohde = null;
    this.teravoitus = null;
    /*
     * KAMERAN ENNAKKO (omistaja 5.9.2026 ilta). `kameraKohde` on se
     * pysäkki, jota kohti pallo on jo matkalla — sama kirjanpito kuin
     * karusellin ennakolla, mutta oma luku, koska kamera lähtee eri
     * hetkellä ja saa saapua vasta syttymisen jälkeen.
     */
    this.kameraKohde = null;
    /** Terävä tila pakotettuna (js/pallo.js) — vain kerran ja aina takaisin. */
    this.laatuPakotettu = false;
    /** Seuraavien pysäkkien valmiiksi dekoodatut kuvat (luoKuvavarasto). */
    this.paneelikuvat = luoKuvavarasto();
    // Naksahduksen katto: nolla on "kauan sitten", koska kello
    // käynnistyy vasta kamera-ajon jälkeen.
    this.viimeNaksu = 0;
    this.skaala = null;
    // Kaari kertoo raidan; ilman kenttää ajo on hiljainen.
    this.musiikkiLaji = kaari.musiikki ?? null;
    /*
     * AVAUSJAKSON TILA. `avausKesken` on tosi mustan peitteen ja
     * Käynnistä-napin välisen ajan: silloin kello ei käy, selostaja
     * vaikenee eikä näppäimistö selaa pysäkkejä. Ajastimet ovat
     * listassa, jotta purku voi perua ne kesken vaiheen.
     */
    this.avaus = null;
    this.avausSumennin = null;
    this.avausPeite = null;
    this.avausNappi = null;
    this.avausKesken = false;
    this.avausAjastimet = [];
    /** Lyhtyjen sammutin (js/lyhty.js), kun avauslaatikko on ruudulla. */
    this.sammutaLyhdyt = null;
    /*
     * VÄLINÄYTÖKSEN TILA. `valinaytos` on laatikon juuri sen ollessa
     * ruudulla, `valinaytosNahty` estää saman hengähdystauon toistumisen
     * samalla ajolla (Alusta nollaa sen).
     */
    this.valinaytos = null;
    this.valinaytosNahty = false;
    this.valinaytosAjastin = null;
    this.valinaytosHehku = null;
    this.valinaytosRiviAjastimet = [];
    /** Havainnekuvan kuvakierron ajastin (kuvakierto). */
    this.kuvakiertoAjastin = null;
    this.reducedMotion = Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  }

  /* ---------- rakentaminen ---------- */

  rakenna() {
    const { ui } = this;
    lataaTyyli();
    const koti = ui.mapPane;
    if (!koti) return false;
    this.juuri = solmu('div', 'aikajana');
    this.juuri.setAttribute('role', 'region');
    this.juuri.setAttribute('aria-label', this.kaari.otsikko);
    // 0. Vinjetti peli-ikkunan reunoille: juuressa, ei kartan kuoressa,
    // joten se ei liiku kartan mukana (omistaja 3.9.2026 ilta).
    this.vinjetti = solmu('div', 'aikajana-vinjetti');
    this.vinjetti.setAttribute('aria-hidden', 'true');
    this.juuri.appendChild(this.vinjetti);

    // 1. Kello ja ohjaimet
    const ylarivi = solmu('div', 'aikajana-ylarivi');
    this.kello = solmu('button', 'aikajana-kello');
    this.kello.type = 'button';
    this.kello.title = 'Pysäytä tai jatka';
    this.kello.setAttribute('aria-live', 'off');
    /*
     * RULLAT (ks. asetaMatkamittari): neljä nelinumeroiselle
     * vuosiluvulle, kuusi "vuotta sitten" -asteikolle. Isoissa luvuissa
     * kolmen numeron välissä on tuhaterotin ja rullaston perässä
     * yksikkö ("v. sitten"); kumpikin tulee asteikosta eikä koodista.
     */
    this.rullat = [];
    this.kelloErottimet = [];
    const numerot = this.asteikko.numerot;
    for (let k = 0; k < numerot; k += 1) {
      const rulla = solmu('span', 'vuosi-numero');
      const vanha = solmu('span', 'vuosi-merkki');
      const uusi = solmu('span', 'vuosi-merkki');
      rulla.append(vanha, uusi);
      this.kello.appendChild(rulla);
      this.rullat.push({
        vanha, uusi, merkki: null, kehys: rulla,
      });
      const jaljella = numerot - 1 - k;
      if (this.asteikko.ryhmitys && jaljella > 0 && jaljella % 3 === 0) {
        const erotin = solmu('span', 'vuosi-erotin', ' ');
        erotin.setAttribute('aria-hidden', 'true');
        this.kello.appendChild(erotin);
        this.kelloErottimet.push({ el: erotin, k });
      }
    }
    if (this.asteikko.yksikko) {
      this.kello.appendChild(solmu('span', 'aikajana-kelloyksikko', this.asteikko.yksikko));
    }
    this.kello.addEventListener('click', () => this.taukoTaiJatka());
    const otsikot = solmu('div', 'aikajana-otsikot');
    this.otsikko = solmu('div', 'aikajana-otsikko', this.kaari.otsikko);
    this.paikkarivi = solmu('div', 'aikajana-paikka', this.jakso);
    otsikot.append(this.otsikko, this.paikkarivi);
    const ohjaimet = solmu('div', 'aikajana-ohjaimet');
    /*
     * KAKSI NAPPIA (omistaja 4.9.2026 iltapäivä: *"siinä olisi vain yksi
     * tauko/jatka nappi, jonka teksti muuttuisi tarpeen mukaan ja sulje
     * muuttuisi pelkäksi (x) kuvakkeeksi"*). Alusta-nappi poistui
     * palkista; alusta() on yhä olemassa näppäimistölle ja testeille.
     * Välinäytöksen aikana sama Tauko/Jatka-nappi on sen Jatka: kehys
     * alkaa hehkua hennon punaisena (css .aikajana-nappi.hehku).
     */
    this.taukoNappi = solmu('button', 'aikajana-nappi', 'Tauko');
    this.taukoNappi.type = 'button';
    this.taukoNappi.addEventListener('click', () => this.taukoTaiJatka());
    const sulje = solmu('button', 'aikajana-nappi aikajana-sulje', '✕');
    sulje.type = 'button';
    sulje.setAttribute('aria-label', 'Sulje');
    sulje.title = 'Sulje';
    sulje.addEventListener('click', () => ui.pysaytaAikajana?.());
    ohjaimet.append(this.taukoNappi, sulje);
    ylarivi.append(otsikot, this.kello, ohjaimet);

    // 4. Ilmiöpaneeli
    this.paneeli = solmu('div', 'aikajana-ilmio');
    this.paneeli.hidden = true;
    this.kytkeRaahaus();

    // 3. Filminauha
    this.nauha = solmu('div', 'aikajana-nauha');
    this.tapahtumat.forEach((t, i) => {
      const kortti = solmu('button', `aikajana-kortti${t.paalu ? ' paalu' : ''}`);
      kortti.type = 'button';
      kortti.dataset.i = String(i);
      kortti.appendChild(muotokuvaKehys(t, 400, 'aikajana-muotokuva', this.pienetKuvat));
      /*
       * KORTIN ALLA VAIN NIMI (omistaja 5.9.2026 ilta, sanatarkasti:
       * "henkilön muotokuvan alla pelkkä henkilön nimi"): vuosi ja
       * keksinnön nimi luetaan havainnekuvan alta, kortti on kasvot.
       */
      const teksti = solmu('div', 'aikajana-korttiteksti');
      teksti.append(solmu('div', 'aikajana-kortti-henkilo', t.henkilo ?? paikka(t)));
      kortti.appendChild(teksti);
      kortti.setAttribute('aria-label', `${ajoitus(t)}: ${t.otsikko}${t.henkilo ? `, ${t.henkilo}` : ''}`);
      kortti.addEventListener('click', () => this.napautaKorttia(i));
      this.nauha.appendChild(kortti);
      this.kortit.push(kortti);
    });

    this.juuri.append(ylarivi, this.paneeli, this.nauha);
    koti.appendChild(this.juuri);
    document.body.classList.add('aikajana-paalla');

    /*
     * KOON MUUTOS ASETTELEE KARUSELLIN UUDELLEEN. Ruudulle mahtuvien
     * korttien määrä tulee mitatusta leveydestä, joten ikkunan koon
     * muutos (myös puhelimen kääntö) on ainoa hetki, jolloin asettelu
     * pitää laskea ilman että pysäkki vaihtuu. Kuuntelija, ei ajastin
     * eikä kehyskohtainen työ.
     */
    this.koonMuutos = () => { if (this.juuri?.isConnected) this.asettele(); };
    globalThis.addEventListener?.('resize', this.koonMuutos);
    this.nappainkuuntelija = (e) => this.nappain(e);
    document.addEventListener?.('keydown', this.nappainkuuntelija);

    // 2. Valot kartalle
    this.rakennaValot();
    this.asettele();
    this.naytaVuosi(this.alku, true);
    return true;
  }

  rakennaValot() {
    const { ui } = this;
    if (this.pallolla) { this.rakennaValotPallolle(); return; }
    if (!ui.svg) return;
    /*
     * MÄÄRITYKSET: lampun ja kajon liukuvärit sekä tummennuksen maski.
     * Maski on valkoinen (tummennus näkyy) ja jokainen palava lamppu
     * piirtää siihen mustan, reunoille vaalenevan reiän: tummennettu
     * kartta vaalenee lampun ympäriltä (omistaja 3.9.2026).
     */
    this.maaritykset = el('defs', { class: 'aikajana-maaritykset' }, ui.svg);
    const lamppu = el('radialGradient', { id: 'aikajana-lamppu' }, this.maaritykset);
    el('stop', { offset: '0%', 'stop-color': '#fff7dc' }, lamppu);
    el('stop', { offset: '42%', 'stop-color': '#ffd066' }, lamppu);
    el('stop', { offset: '100%', 'stop-color': '#f09a2a', 'stop-opacity': '0.2' }, lamppu);
    const kajo = el('radialGradient', { id: 'aikajana-kajo' }, this.maaritykset);
    el('stop', { offset: '0%', 'stop-color': '#ffe2a0', 'stop-opacity': '0.8' }, kajo);
    el('stop', { offset: '100%', 'stop-color': '#ffd98a', 'stop-opacity': '0' }, kajo);
    const reika = el('radialGradient', { id: 'aikajana-reika' }, this.maaritykset);
    el('stop', { offset: '0%', 'stop-color': '#000' }, reika);
    el('stop', { offset: '50%', 'stop-color': '#6a6a6a' }, reika);
    el('stop', { offset: '100%', 'stop-color': '#fff' }, reika);
    this.maski = el('mask', {
      id: 'aikajana-maski', maskUnits: 'userSpaceOnUse', x: -TUMMENNUKSEN_ULOTTUVUUS, y: -TUMMENNUKSEN_ULOTTUVUUS,
      width: 2 * TUMMENNUKSEN_ULOTTUVUUS, height: 2 * TUMMENNUKSEN_ULOTTUVUUS,
    }, this.maaritykset);
    el('rect', {
      x: -TUMMENNUKSEN_ULOTTUVUUS, y: -TUMMENNUKSEN_ULOTTUVUUS,
      width: 2 * TUMMENNUKSEN_ULOTTUVUUS, height: 2 * TUMMENNUKSEN_ULOTTUVUUS, fill: '#fff',
    }, this.maski);
    /*
     * TUMMENNUS (omistaja 3.9.2026: *"Linssin kytkeytyessä päälle kartta
     * pitää tummentaa jonkun verran ... Kartan tummennuksen voi tehdä
     * reaaliajassa"*): yksi kartan kokoinen pinta maskilla, valojen
     * alla ja kaiken muun päällä. Liu'utetaan sisään seuraavassa
     * kehyksessä (css .aikajana-tummennus.paalla).
     */
    this.tummennus = el('g', { class: 'aikajana-tummennus' }, ui.svg);
    el('rect', {
      class: 'aikajana-tummennus-pinta', x: -TUMMENNUKSEN_ULOTTUVUUS, y: -TUMMENNUKSEN_ULOTTUVUUS,
      width: 2 * TUMMENNUKSEN_ULOTTUVUUS, height: 2 * TUMMENNUKSEN_ULOTTUVUUS, mask: 'url(#aikajana-maski)',
    }, this.tummennus);
    this.valokerros = el('g', { class: 'aikajana-valot' }, ui.svg);
    this.valot = this.tapahtumat.map((t, i) => {
      if (t.paalu || !Number.isFinite(t.x) || !Number.isFinite(t.y)) return null;
      const g = el('g', { class: 'aikajana-valo', role: 'button', tabindex: '-1' }, this.valokerros);
      /*
       * LAMPPU ON NAPAUTETTAVA (omistaja 3.9.2026 ilta: *"kartan pisteet
       * saisivat olla myös klikattavissa"*): napautus siirtyy pysäkkiin
       * kuten kortin napautus (siirry) ja jää tauolle. Vain palava
       * lamppu on näkyvissä ja ottaa osumia (css .aikajana-valo.palaa).
       */
      el('title', {}, g).textContent = `${ajoitus(t)}: ${t.otsikko}${t.henkilo ? `, ${t.henkilo}` : ''}`;
      g.setAttribute('aria-label', `${ajoitus(t)}: ${t.otsikko}`);
      g.addEventListener('click', (e) => { e.stopPropagation(); this.napautaValoa(i); });
      const sisus = el('g', { class: 'aikajana-valo-sisus' }, g);
      /*
       * NELJÄ YMPYRÄÄ, KAIKKI KESKIPISTEESSÄ (0,0) — ks. MERKIN_SADE.
       * Piirtojärjestys alhaalta ylös: kajo (valokeila kartalle),
       * sykkivä rengas, pehmeä hehku ja lamppu päällimmäisenä. Lampulla
       * ei ole reunaviivaa: kirkas keskusta tummuu reunoille (liukuväri).
       */
      el('circle', { class: 'aikajana-valo-kajo', r: MERKIN_SADE * KAJON_SUHDE }, sisus);
      el('circle', { class: 'aikajana-valo-syke', r: MERKIN_SADE }, sisus);
      el('circle', { class: 'aikajana-valo-hehku', r: MERKIN_SADE * HEHKUN_SUHDE }, sisus);
      el('circle', { class: 'aikajana-valo-pallo', r: MERKIN_SADE }, sisus);
      const reikaYmpyra = el('circle', { class: 'aikajana-reika', r: MERKIN_SADE * REIAN_SUHDE }, this.maski);
      return { g, reika: reikaYmpyra, x: t.x, y: t.y };
    });
    this.paivitaMittakaava();
    (ui.nipistysVastaskaalaajat ??= new Set()).add(this.vastaskaala ??= (suhde) => this.paivitaMittakaava(suhde));
    const tummennus = this.tummennus;
    const vinjetti = this.vinjetti;
    if (this.reducedMotion) { tummennus.classList.add('paalla'); vinjetti?.classList.add('paalla'); } else {
      requestAnimationFrame(() => { tummennus.classList.add('paalla'); vinjetti?.classList.add('paalla'); });
    }
  }

  /* ---------- valot pallolaudalla (aalto 2A) ---------- */

  /**
   * VALOT PALLON PINNALLE. Sama lamppu kuin kartalla — kajo, syke,
   * hehku ja pallo samoilla luokilla ja samoilla mitoilla — mutta
   * HTML-elementtinä pallon pinnan pisteessä (CSS2D). Mitat ovat jo
   * ruudun pikseleitä, joten mikään ei vastaskaalaudu: siksi
   * `paivitaMittakaava` ei tee pallolla mitään.
   *
   * ELEMENTTI RAKENNETAAN HETI eikä vasta kirjaston tehtaassa: koko
   * moottori lukee ja kirjoittaa lampun tilaa luokkina (`asetaValonTila`,
   * `sytyta`, `siirry`, `alusta`, `lopeta`), joten `valo.g`:n on oltava
   * olemassa myös silloin, kun merkki on pallon takana eikä kirjasto
   * ole vielä pyytänyt elementtiä.
   */
  rakennaValotPallolle() {
    const linssit = this.lauta.linssit;
    // Liukuvärit (lamppu ja kajo) ovat css:n `url(#…)`-viittauksia,
    // eikä pallolla ole kartan svg:tä, jossa ne asuisivat: linssi tuo
    // omat määrityksensä mukanaan piilotetussa svg:ssä. Tarvitaan yhä
    // varapolulle (SVG-lamppu ilman canvasia).
    this.maaritykset = this.pallonMaaritykset();
    /*
     * ELÄVÄ LIEKKIVALO (js/aikajana-valo.js, omistaja 5.9.2026 klo
     * 00.45). Kerros on ajon oma ja puretaan sen mukana; ilman canvasia
     * `lamppu()` palauttaa null ja lamppu piirretään entisin ympyröin.
     */
    this.liekit = luoLiekkivalot({ reducedMotion: this.reducedMotion });
    this.valot = this.tapahtumat.map((t, i) => {
      if (t.paalu || !Number.isFinite(t.lat) || !Number.isFinite(t.lon)) return null;
      const valo = {
        g: this.pallonLamppu(t, i), reika: null, i, x: t.x, y: t.y, lat: t.lat, lng: t.lon,
      };
      valo.datum = {
        avain: `${PALLON_OSA}:${i}`,
        lat: t.lat,
        lng: t.lon,
        elementti: () => valo.g,
        napautus: () => this.napautaValoa(i),
      };
      return valo;
    });
    linssit.merkit(PALLON_OSA, this.valot.filter(Boolean).map((v) => v.datum));
    /*
     * TUMMENNUS ON RUUTUKALVO (karttapallo.md luku 10.1): kotelon
     * päälle laskeutuva CSS-kalvo, jonka reikä on nykyisen lampun
     * kohdalla. `alle` panee sen kirjaston merkkikerroksen alle, jotta
     * lamput hehkuvat tummennuksen päällä kuten tasokartalla — pallon
     * pinta, kaupunkipisteet ja reitit jäävät sen alle.
     */
    this.kalvo = linssit.kalvoRuudulle(PALLON_OSA, {
      reika: null,
      vari: PALLON_TUMMENNUS,
      keski: PALLON_TUMMENNUS_KESKI,
      alle: true,
    });
    // Reittiviiva samaan osaan: purku vie valot, kalvon ja viivan.
    this.rakennaReitti();
    const vinjetti = this.vinjetti;
    if (this.reducedMotion) vinjetti?.classList.add('paalla');
    else requestAnimationFrame(() => vinjetti?.classList.add('paalla'));
  }

  /** Lampun liukuvärit piilotettuun svg:hen linssin juuressa. */
  pallonMaaritykset() {
    const svg = el('svg', {
      class: 'aikajana-maaritykset', width: 0, height: 0, 'aria-hidden': 'true',
    });
    svg.style.position = 'absolute';
    const defs = el('defs', {}, svg);
    const lamppu = el('radialGradient', { id: 'aikajana-lamppu' }, defs);
    el('stop', { offset: '0%', 'stop-color': '#fff7dc' }, lamppu);
    el('stop', { offset: '42%', 'stop-color': '#ffd066' }, lamppu);
    el('stop', { offset: '100%', 'stop-color': '#f09a2a', 'stop-opacity': '0.2' }, lamppu);
    const kajo = el('radialGradient', { id: 'aikajana-kajo' }, defs);
    el('stop', { offset: '0%', 'stop-color': '#ffe2a0', 'stop-opacity': '0.8' }, kajo);
    el('stop', { offset: '100%', 'stop-color': '#ffd98a', 'stop-opacity': '0' }, kajo);
    this.juuri?.appendChild(svg);
    return svg;
  }

  /**
   * Yksi lamppu pallon pinnalle.
   *
   * ENSISIJAISESTI ELÄVÄ LIEKKI (js/aikajana-valo.js): canvas, jonka
   * moduuli piirtää — epäsäännöllinen muoto, liekin syke, syttymisen
   * kaksi vaihetta ja likimain käänteisen neliön profiili. Elementti
   * ITSE EI LIIKU: kirjasto asettaa sen pallon pinnan pisteeseen, eikä
   * tässä ole yhtään sijainnin siirtymää (omistaja 5.9.2026 klo 00.45:
   * *"valopallo tuli nyt jotenkin liikuen paikoilleen"*).
   *
   * VARAPOLKU ilman canvasia: entiset neljä ympyrää samoilla luokilla
   * ja mitoilla, jolloin css hoitaa asun kuten ennenkin.
   */
  pallonLamppu(t, i = 0) {
    const laita = MERKIN_SADE * KAJON_SUHDE;
    const kehys = solmu('div', 'aikajana-valo aikajana-valo-pallolla');
    kehys.setAttribute('role', 'button');
    kehys.setAttribute('aria-label', `${ajoitus(t)}: ${t.otsikko}`);
    kehys.title = `${ajoitus(t)}: ${t.otsikko}${t.henkilo ? `, ${t.henkilo}` : ''}`;
    const liekki = this.liekit?.lamppu?.(i);
    if (liekki) {
      liekki.className = 'aikajana-valo-liekki';
      liekki.setAttribute('aria-hidden', 'true');
      kehys.appendChild(liekki);
      return kehys;
    }
    const svg = el('svg', {
      viewBox: `${-laita} ${-laita} ${2 * laita} ${2 * laita}`,
      width: 2 * laita,
      height: 2 * laita,
      'aria-hidden': 'true',
    }, kehys);
    const sisus = el('g', { class: 'aikajana-valo-sisus' }, svg);
    // Sama järjestys ja samat mitat kuin kartalla (ks. rakennaValot).
    el('circle', { class: 'aikajana-valo-kajo', r: MERKIN_SADE * KAJON_SUHDE }, sisus);
    el('circle', { class: 'aikajana-valo-syke', r: MERKIN_SADE }, sisus);
    el('circle', { class: 'aikajana-valo-hehku', r: MERKIN_SADE * HEHKUN_SUHDE }, sisus);
    el('circle', { class: 'aikajana-valo-pallo', r: MERKIN_SADE }, sisus);
    return kehys;
  }

  /**
   * REIKÄ ON SIELLÄ, MISSÄ LAMPPU — EI LIUKUA (omistaja 5.9.2026 klo
   * 00.45, sanatarkasti: *"samoin valopallo tuli nyt jotenkin liikuen
   * paikoilleen"*).
   *
   * === LIUKUMISEN JUURISYY (mitattu Chromiumilla 1400 x 900) ===
   *
   * Lampun ELEMENTTI ei liikkunut: se on kirjaston CSS2D-merkki, ja
   * mittauksessa jokainen uusi lamppu ilmestyi täsmälleen ruudun
   * keskelle (700, 478) eikä siirtynyt syttymisen jälkeen omin voimin.
   * Liikkuva valo oli TUMMENNUKSEN REIKÄ: kalvon kirkas aukko
   * (radial-gradient ruutupisteessä) liukui edellisen lampun kohdalta
   * uuden kohdalle 700 ms:n rAF-liu'ulla — tummalla pallolla se lukee
   * VALOPALLONA, joka lipuu paikoilleen juuri kun uusi valo syttyy.
   * Mitattu jakso: reikä (1007, 462) → (689, 410) samalla kun uusi
   * lamppu oli jo palanut kaksi kehystä keskellä ruutua.
   *
   * Nyt reikä siirtyy KERRALLA uuden lampun kohdalle syttymishetkellä.
   * Siirtymä ei jää kovaksi leikkaukseksi, koska juuri samalla
   * hetkellä alkaa lampun oma syttymisanimaatio (js/aikajana-valo.js:
   * pieni kirkas hehku, joka laajenee 1,2 sekunnissa) — liike on
   * valossa itsessään, ei sen paikassa.
   *
   * `valo === null` palauttaa tasaisen tummennuksen (Alusta).
   */
  siirraReika(valo) {
    if (!this.pallolla || !this.kalvo?.paivita) return;
    // Vanha liuku (jos jokin versio ehti käynnistää sellaisen) pois:
    // merkki nousee, jolloin kesken oleva kehys palaa heti.
    cancelAnimationFrame(this.reianLiuku);
    this.reianLiuku = 0;
    this.reianMerkki = (this.reianMerkki ?? 0) + 1;
    const maali = valo ? { lat: valo.lat, lng: valo.lng, sade: PALLON_REIAN_SADE_PX } : null;
    this.reianPaikka = maali;
    this.kalvo.paivita(maali);
  }

  /* ---------- reittiviiva (kaari, jolla `reitti: true`) ---------- */

  /**
   * REITTIVIIVA VALOJEN VÄLIIN. Pätkät lasketaan KERRAN (isoympyrä,
   * reitinPisteet) ja piirretään sitä mukaa kuin valot syttyvät, joten
   * kehyskohtaista työtä ei ole. Vain pallolla ja vain kaarella, joka
   * pyytää sen — keksintökaaressa valot eivät ole yksi matka.
   */
  rakennaReitti() {
    if (!this.pallolla || !this.kaari.reitti || !this.lauta?.linssit?.polut) return;
    this.reittiOsat = [];
    let edellinen = null;
    this.tapahtumat.forEach((t, i) => {
      if (!Number.isFinite(t.lat) || !Number.isFinite(t.lon)) return;
      if (edellinen) {
        this.reittiOsat.push({
          i,
          datum: {
            avain: `${PALLON_OSA}-reitti:${i}`,
            pisteet: reitinPisteet(edellinen, t),
            vari: REITIN_VARI,
            paksuus: REITIN_PAKSUUS_PX,
          },
        });
      }
      edellinen = t;
    });
    this.paivitaReitti(-1);
  }

  /**
   * Viiva piirtyy pysäkkiin `i` asti: sama sääntö kuin lampuilla
   * (palaa / ei pala), joten selailu taaksepäin lyhentää sen ja
   * Alusta (i = −1) vie sen kokonaan pois.
   */
  paivitaReitti(i) {
    if (!this.reittiOsat) return;
    this.lauta?.linssit?.polut?.(
      PALLON_OSA,
      this.reittiOsat.filter((o) => o.i <= i).map((o) => o.datum),
    );
  }

  /**
   * Lampun ja sen maskireiän tila yhdessä: `palaa` = syttynyt (jää
   * hehkumaan), `nykyinen` = viimeksi syttynyt (kirkkain, sykkii).
   * Reiän luokat ovat omat, jotta merkkien laskenta (`palaa`,
   * `nykyinen`) ei sekoitu maskiin.
   */
  asetaValonTila(valo, palaa, nykyinen) {
    if (!valo) return;
    valo.g.classList.toggle('palaa', palaa);
    valo.g.classList.toggle('nykyinen', nykyinen);
    // Liekkikerros piirtää saman tilan canvasiin (js/aikajana-valo.js);
    // luokat jäävät, koska moottori lukee niistä lampun tilan.
    this.liekit?.tila(valo.i, palaa, nykyinen);
    valo.reika?.classList.toggle('reika-palaa', palaa);
    valo.reika?.classList.toggle('reika-nykyinen', nykyinen);
    // Pallolla reikiä on yksi ja se on nykyisen lampun kohdalla.
    if (nykyinen) this.siirraReika(valo);
  }

  /**
   * MERKIN MITTA ON RUUDUN PIKSELI, EI LEHDEN PIKSELI.
   *
   * === TOINEN SYY SIIHEN, ETTEI PAIKKA NÄKYNYT (mitattu 3.9.2026) ===
   *
   * Merkki luki mittansa `fokusMerkkiSkaalaKartalle`-parista, joka on
   * LEHDEN oma vakio: se mitoittaa merkin siihen näkymään, johon
   * saapumisajo maahan päätyy (js/ui.js fokusMerkkiSkaala). Aikajana
   * ei ole siinä näkymässä — se vapauttaa kameran (vapautaKamera) ja
   * sovittaa ruutuun koko Euroopan.
   *
   * Mitattu Ateenasta avattuna (1280 x 800, Kreikan lehti voimassa):
   * kerroin oli 0,4056 ja kartan oma mittakaava 0,512, joten 7
   * lautayksikön pallo oli ruudulla 1,5 PIKSELIÄ. Kaari näytti
   * tyhjältä kartalta — täsmälleen omistajan raportti.
   *
   * Aikajana mitoittaa merkkinsä siksi suoraan RUUTUUN (näkyvän alueen
   * mittakaavan käänteisluku, sama varapolku jota lehdetön näkymä
   * käyttää), jolloin MERKIN_SADE on ruudun pikseleitä joka zoomilla ja
   * jokaisella laudalla. `suhde` on nipistyseleen kerroin, ja tässä
   * haarassa se merkitsee (js/kartta.js vastaskaalaaMerkit).
   * Lehtipari jää varareitiksi näkymään, jota ei voi mitata.
   */
  merkkiSkaala(suhde = 1) {
    const skaala = this.ui.nakyvaAlue?.()?.skaala;
    if (Number.isFinite(skaala) && skaala > 0) return 1 / (skaala * (suhde > 0 ? suhde : 1));
    return this.ui.fokusMerkkiSkaalaKartalle?.(suhde) ?? this.ui.fokusMerkkiSkaala?.(suhde) ?? 0;
  }

  paivitaMittakaava(suhde = 1) {
    // Pallolla merkki on ruutuvakio (CSS2D), joten vastaskaalausta ei ole.
    if (this.pallolla) return;
    const s = this.merkkiSkaala(suhde);
    if (!(s > 0)) return;
    const zoom = s.toFixed(4);
    if (zoom === this.skaala) return;
    this.skaala = zoom;
    for (const valo of this.valot) {
      if (!valo) continue;
      const siirto = `translate(${valo.x} ${valo.y}) scale(${zoom})`;
      valo.g.setAttribute('transform', siirto);
      valo.reika?.setAttribute('transform', siirto);
    }
  }

  /* ---------- kamera ---------- */

  /**
   * KAMERA VAPAAKSI AJON AJAKSI. Fokusmoodissa kamera on lukittu maan
   * ikkunaan (js/kartta.js fokusRajaukset, panorointiVapaa); kaari
   * kattaa monta maata, joten lukko avataan lipulla ja suljetaan
   * purussa. Rajaus ja zoomin pohja lasketaan lipun vaihtuessa
   * uudestaan samoin kuin kehittäjän maailmanäkymässä.
   */
  vapautaKamera(vapaa) {
    /*
     * PALLOLLA EI OLE FOKUSLUKKOA (aalto 2A): rajaus, panoroinnin
     * vapaus ja zoomin pohja ovat tasokartan omia (js/kartta.js
     * fokusRajaukset), ja pallon kamera on aina vapaa. Lippua ei siis
     * käännetä eikä nukkuvaa karttaa herätetä sen takia.
     */
    if (this.pallolla) return;
    const { ui } = this;
    ui.kameraVapaa = vapaa;
    ui.fokusAvain = null;
    ui.paivitaMaailmanRajaus?.();
    ui.kartta?.tarkistaFokusZoom?.();
  }

  /**
   * Hereillä olevan laudan kamera: pallolla js/pallolauta/kamera.js,
   * tasokartalla js/kartta.js. Allekirjoitus on sama kummallakin
   * (ajaKamera { x, y, leveys } tai { bbox, marginaali }), joten
   * aikajana ei tiedä laudasta muuta kuin tämän valinnan.
   */
  kamera() {
    return this.ui.kamera?.() ?? this.ui.kartta ?? null;
  }

  /**
   * Kamera kaaren alueeseen. Kesto on parametri, koska avausjaksossa
   * ajo tehdään mustan peitteen alla: sitä ei nähdä, joten se saa olla
   * lyhyt (AVAUS_KAMERA_MS). Alusta-nappi ajaa saman matkan näkyvissä.
   * Palauttaa ajon lupauksen, jotta avaus tietää milloin tausta on
   * paikallaan.
   */
  /**
   * Paluu linssiä edeltäneeseen näkymään (ks. kaynnista). Ajetaan vasta
   * kun kameran lukko on palautettu, joten lukko ei nykäise ajoa
   * kesken; sama lauta on ehto, koska laudanvaihto purkaa linssin ja
   * uuden laudan näkymä on jo oikea.
   */
  palautaKamera() {
    const n = this.kameraEnnen;
    this.kameraEnnen = null;
    const { ui } = this;
    const kamera = this.kamera();
    if (!n || !kamera?.ajaKamera || !ui.nakyvaAlue?.() || ui.game?.pack?.id !== this.laudanTunnus) return;
    kamera.ajaKamera({ x: n.x + n.w / 2, y: n.y + n.h / 2, leveys: n.w }, { kesto: this.reducedMotion ? 0 : 900 });
  }

  sovitaKaareen(kesto = this.reducedMotion ? 0 : 1400) {
    const alue = this.kaari.alue;
    const kamera = this.kamera();
    if (!alue || !kamera?.ajaKamera) return Promise.resolve(false);
    return kamera.ajaKamera({ bbox: kaarenKameralaatikko(alue, this.juuri), marginaali: 0.03 }, { kesto });
  }

  /* ---------- lähikuva ja ennakoiva kamera pallolla ---------- */

  /**
   * AJON ALKUNÄKYMÄ. Pallolla ajo alkaa ENSIMMÄISEN lampun yltä
   * lähikuvassa (omistaja 5.9.2026: *"zoomaa maapallo näin lähelle"*),
   * koska koko kaaren rajaus veisi kameran heti sen jälkeen kauas siitä
   * näkymästä, jossa ajo pysyy. Tasokartalla näkymä on entinen koko
   * kaaren sovitus — lähikuva on pallon oma, siellä laatat riittävät.
   */
  sovitaAlkuun(kesto = this.reducedMotion ? 0 : 1400) {
    if (this.pallolla) {
      const i = this.tapahtumat.findIndex((t) => Number.isFinite(t.lat) && Number.isFinite(t.lon));
      if (i >= 0) {
        this.kameraKohde = i;
        return this.ajaPysakille(i, kesto);
      }
    }
    return this.sovitaKaareen(kesto);
  }

  /**
   * Kamera pysäkin `i` ylle lähikuvaan. Vain pallolla: tasokartalla ajo
   * sovittaa koko kaaren eikä seuraa pysäkkejä.
   *
   * @param {number} i pysäkin indeksi
   * @param {number} kesto ajon kesto ms (0 = hyppy)
   * @returns {Promise<boolean>}
   */
  ajaPysakille(i, kesto) {
    const t = this.tapahtumat[i];
    const kamera = this.kamera();
    if (!this.pallolla || !t || !kamera?.ajaKamera) return Promise.resolve(false);
    if (!Number.isFinite(t.lat) || !Number.isFinite(t.lon)) return Promise.resolve(false);
    return kamera.ajaKamera(
      {
        x: t.x, y: t.y, lat: t.lat, lng: t.lon, leveys: this.pysakinLeveys(i),
      },
      { kesto: this.reducedMotion ? 0 : Math.max(0, kesto), pehmennys: aikajananKameranPehmennys },
    );
  }

  /**
   * NÄKYVÄ LEVEYS PYSÄKILLÄ. Kaaren oma perusmitta (keksinnöillä
   * AIKAJANAN_LAHIKUVA_LEVEYS) — ja jos kaari pyytää hyppykameran,
   * mannerten mittainen väli vetää kameran niin kauas, että edellinen
   * valo ja reittiviiva näkyvät samassa kuvassa (ks. pysakinLahikuva).
   *
   * @param {number} i pysäkin indeksi
   * @returns {number} leveys lautayksikköinä
   */
  pysakinLeveys(i) {
    const t = this.tapahtumat[i];
    const edellinen = this.tapahtumat[i - 1];
    if (!this.kaari.hyppykamera || !t || !edellinen) return this.lahikuva;
    if (!Number.isFinite(edellinen.lat) || !Number.isFinite(t.lat)) return this.lahikuva;
    const ast = kulmaAsteina(
      { lat: edellinen.lat, lng: edellinen.lon },
      { lat: t.lat, lng: t.lon },
    );
    return pysakinLahikuva(this.lahikuva, ast * LAUTAYKSIKKOA_ASTEELLA);
  }

  /**
   * KAMERA LÄHTEE ENNEN SYTTYMISTÄ JA SAAPUU VASTA SEN JÄLKEEN
   * (omistaja 5.9.2026 ilta, ks. AIKAJANAN_KAMERAN_ENNAKKO_MS).
   * Saapumisaika lasketaan samalla puhtaalla funktiolla kuin karusellin
   * ennakko; kesto venytetään jälkijätöllä, jolloin pehmennyksen loppu
   * jää hiipumaan syttymisen yli.
   */
  tarkistaKameraEnnakko(tahti) {
    if (!this.pallolla || this.reducedMotion) return;
    const kohde = this.tila.i + 1;
    if (this.kameraKohde === kohde || kohde >= this.tapahtumat.length) return;
    const eta = aikaSeuraavaan(this.tila, this.tapahtumat, tahti, AIKAJANAN_KAMERAN_ENNAKKO_MS + AIKAJANA_ALIASKEL_MS);
    if (!Number.isFinite(eta)) return;
    this.kameraKohde = kohde;
    // Havainnekuva häipyy SAMALLA hetkellä kuin kamera lähtee
    // (omistaja 5.9.2026 klo 00.45; ks. PANEELIN_ENNAKKOHAIVYTYS_MS).
    this.haivytaPaneeli();
    this.ajaPysakille(kohde, Math.max(AIKAJANAN_KAMERAN_POHJA_MS, eta + AIKAJANAN_KAMERAN_JALKIJATTO_MS));
  }

  /**
   * HAVAINNEKUVA POIS KAMERAN LÄHTIESSÄ. Luokka häivyttää koko
   * paneelin (kuva ja sen alla oleva "vuosi ◈ otsikko") pehmeästi
   * nollaan; uusi sivu poistaa luokan syttymishetkellä (vaihdaPaneeli),
   * jolloin ristihäivytys nostaa kuvan takaisin.
   *
   * Reduced motionissa kamera ei aja ennakoiden, joten tätä ei siellä
   * kutsuta lainkaan.
   */
  haivytaPaneeli() {
    if (!this.paneeli || this.paneeli.hidden || this.reducedMotion) return;
    this.paneeli.classList.add('haipyy');
  }

  /**
   * TERÄVÄ TILA KOKO AJON AJAN (omistaja 5.9.2026: *"pidä kokoajan
   * terävä tila päällä"*). Pyyntö menee js/pallo.js:n laatunostolle ja
   * VAPAUTETAAN AINA purussa — lippu pitää huolen, ettei sama ajo
   * pyydä kahdesti eikä vapauta toisen pyytäjän puolesta.
   */
  pakotaLaatu(paalla) {
    if (!this.pallolla || paalla === this.laatuPakotettu) return;
    this.laatuPakotettu = paalla;
    pakotaPallonLaatu(paalla);
  }

  /* ---------- musiikki (js/siirtymamusiikki.js) ---------- */

  /**
   * Käynnistää kaaren oman raidan ja asettaa sen heti oikeaan tasoon.
   * Turvallinen kutsua uudelleen: soittimen oma sääntö on, ettei sama
   * laji ala alusta, joten tämä ei nykäise raitaa (esim. kun juttu
   * suljetaan ja ajo jatkuu).
   */
  aloitaMusiikki(ajossa = this.kaynnissa) {
    if (!this.musiikkiLaji) return;
    aloitaSiirtymamusiikki(this.musiikkiLaji);
    this.saadaMusiikki(ajossa);
  }

  /**
   * Taso ajon tilan mukaan: täysi ajossa, puolet tauolla ja lopussa.
   * `ajossa` annetaan käsin vain käynnistyksessä, jossa kello ei ole
   * vielä lähtenyt mutta musiikki kuuluu jo täydellä — kamera-ajo on
   * osa ajoa, ei taukoa.
   */
  saadaMusiikki(ajossa = this.kaynnissa) {
    if (!this.musiikkiLaji) return;
    himmennaSiirtymamusiikki(ajossa ? 1 : AIKAJANA_TAUKO_HIMMENNYS);
  }

  /** Feidaus pois: sulkeminen, laudan vaihto tai avattu nähtävyyskortti. */
  lopetaMusiikki() {
    if (!this.musiikkiLaji) return;
    lopetaSiirtymamusiikki();
  }

  /**
   * TIEDELIITE ON OMA NÄKYMÄNSÄ: kun keksijän sivu avataan, aikajanan
   * musiikki väistyy kokonaan ja palaa vasta kun sivu suljetaan. Paluu
   * tehdään kortin omasta sulkukoukusta eikä ajastimella, koska kortin
   * voi sulkea monella tavalla (nappi, tausta, Esc) — ja jos aikajana
   * on sillä välin purettu, paluu jää tekemättä.
   */
  vaimennaJutunAjaksi() {
    if (!this.musiikkiLaji) return;
    this.lopetaMusiikki();
  }

  palautaJutunJalkeen() {
    if (!this.musiikkiLaji || !this.juuri?.isConnected) return;
    this.aloitaMusiikki();
  }

  /* ---------- ajo ---------- */

  /**
   * TAUSTA JA LUENTA POIS LINSSIN AJAKSI (omistaja 3.9.2026: *"mikäli
   * luenta tai kaupungin taustaääni on ollut päällä, niin ne kummatkin
   * lopetetaan"*). Kaupungin äänimaisema pysäytetään kokonaan (ei vain
   * vaimenneta) ja ui.syncAmbience pitää sen poissa linssin ajan;
   * kertojan luenta ja lukija pysäytetään. Hiljennyssyy pitää
   * pohjavireen ja muut väistäjät matalalla, ja purku palauttaa
   * maiseman samalla syyllä (suljeAanimaailma → syncAmbience).
   */
  avaaAanimaailma() {
    hiljennaAmbienssi(LINSSIN_HILJENNYS);
    stopPlaceStream();
    stopDiaryVoice(this.ui);
    pysaytaLukija();
  }

  /** Tausta takaisin: hiljennys pois ja maisema uudelleen pelin tilasta. */
  suljeAanimaailma() {
    palautaAmbienssi(LINSSIN_HILJENNYS);
    if (!this.ui.dead) this.ui.syncAmbience?.();
  }

  /**
   * Linssi kytkeytyy päälle: kaikki rakennetaan heti, mutta ruudulla
   * näkyy vain musta ja sen päällä kaaren esittely. Kello lähtee vasta
   * Käynnistä-napista (aloitaAjo) — ks. AVAUS_PIMENNYS_MS.
   */
  kaynnista() {
    if (!this.rakenna()) return false;
    /*
     * KARTTA PALAA SIIHEN, MISSÄ PELAAJA OLI (omistajan kysymys
     * 4.9.2026: "palaako kartta muuten juuri siihen kohtaan missä
     * pelaaja oli kun käynnisti linssin?"). Näkymä otetaan talteen
     * ennen kamera-ajoa ja ajetaan takaisin purussa (pura).
     */
    this.kameraEnnen = this.ui.nakyvaAlue?.() ?? null;
    this.laudanTunnus = this.ui.game?.pack?.id ?? null;
    /*
     * Linssin omat elementit odottavat mustan alla, jottei mikään
     * pompahda ruudulle kesken pimennyksen. Luokka on CSS:ssä (siinä
     * myös liuku), mutta sama arvo pannaan INLINE-tyyliin varmuudeksi:
     * css/aikajana.css ladataan vasta linssin auetessa (lataaTyyli), ja
     * ennen sen saapumista pelkkä luokka ei piilottaisi mitään.
     */
    this.juuri.classList.add('avaus-piilossa');
    this.juuri.style.opacity = '0';
    // Koko kaaren pienet kuvat taustalle jo pimennyksen aikana.
    this.esilataaPienet();
    // Kahden ensimmäisen pysäkin havainnekuvat myös DEKOODATAAN, jotta
    // ensimmäinen paneeli piirtyy heti valon syttyessä.
    this.valmistaSeuraavat(-1);
    // Terävä tila päälle koko ajon ajaksi (vapautetaan purussa).
    this.pakotaLaatu(true);
    this.avaaAanimaailma();
    // Musiikki alkaa jo pimennyksessä mutta HILJAA: täysi linssitaso
    // tulee vasta Käynnistä-napista, kuten kellokin.
    this.aloitaMusiikki(false);
    this.vapautaKamera(true);
    this.avaaAvausjakso();
    return true;
  }

  /* ---------- avausjakso ---------- */

  /** Avausjakson ajastin: kaikki talteen, jotta purku voi perua ne. */
  avausViive(tehtava, ms) {
    if (!(ms > 0)) { tehtava(); return; }
    this.avausAjastimet.push(setTimeout(tehtava, ms));
  }

  tyhjennaAvauksenAjastimet() {
    for (const id of this.avausAjastimet) clearTimeout(id);
    this.avausAjastimet.length = 0;
  }

  /**
   * Musta peite kartta-alueen päälle ja sen keskelle kaaren esittely.
   * Teksti tulee DATASTA (linssin `aikajana.esittely`), ei koodista:
   * omistaja hioo sanat kaarikohtaisesti.
   */
  avaaAvausjakso() {
    const koti = this.ui.mapPane;
    if (!koti) return;
    const esittely = this.kaari.esittely ?? {};
    const otsikko = esittely.otsikko ?? this.kaari.otsikko;
    this.avaus = solmu('div', 'aikajana-avaus');
    this.avaus.setAttribute('role', 'dialog');
    this.avaus.setAttribute('aria-modal', 'true');
    this.avaus.setAttribute('aria-label', otsikko);
    /*
     * KAKSI KERROSTA LAATIKON ALLA (ks. css/aikajana.css AVAUSJAKSO):
     * alimpana sumennin (pelkkä backdrop-filter, ei omaa väriä) ja sen
     * päällä peite (pelkkä väri, ei suodattimia). Jos selain ei piirrä
     * sumennusta — mitattu WebKitissä 4.9.2026 — musta ja himmennys
     * tulevat silti. Laatikko on kummankin päällä ja pysyy terävänä.
     */
    this.avausSumennin = solmu('div', 'aikajana-avaus-sumennin');
    this.avausSumennin.setAttribute('aria-hidden', 'true');
    this.avausPeite = solmu('div', 'aikajana-avaus-peite');
    this.avausPeite.setAttribute('aria-hidden', 'true');
    const laatikko = solmu('div', 'aikajana-avaus-laatikko');
    /*
     * LYHDYT YLÄKULMISSA (omistaja 4.9.2026: *"valot loimuamaan kuin
     * valo tulisi padasta ... alueelliset valovaihtelut liekin lailla
     * paperin päällä"*): js/lyhty.js ohjaa kahta valoa kehys kerrallaan;
     * sammutin kutsutaan, kun laatikko väistyy (aloitaAjo, puraAvaus).
     */
    this.sammutaLyhdyt = sytytaLyhdyt(laatikko, { reducedMotion: this.reducedMotion });
    laatikko.appendChild(solmu('h2', 'aikajana-avaus-otsikko', otsikko));
    if (esittely.teksti) laatikko.appendChild(solmu('p', 'aikajana-avaus-teksti', esittely.teksti));
    this.avausNappi = solmu('button', 'aikajana-avaus-nappi', 'Käynnistä');
    this.avausNappi.type = 'button';
    this.avausNappi.addEventListener('click', () => this.aloitaAjo());
    laatikko.appendChild(this.avausNappi);
    this.avaus.append(this.avausSumennin, this.avausPeite, laatikko);
    koti.appendChild(this.avaus);
    this.avausKesken = true;

    const heti = this.reducedMotion;
    // Pakotettu asettelu, jotta selain näkee alkuasennon (opacity 0)
    // omana tilanaan eikä hyppää suoraan mustaan.
    void this.avaus.getBoundingClientRect();
    this.avaus.classList.add('musta');
    /*
     * TAUSTA VALMIIKSI PIMEÄSSÄ. Kamera-ajo lähtee vasta kun ruutu on
     * musta, joten kartan hyppyä ei näe. Sumennusvaiheeseen siirrytään
     * kun ajo on ohi ja laatat ehtineet piirtyä (kaksi kehystä) — tai
     * viimeistään katon täytyttyä, jottei hidas laatta jumita avausta.
     */
    const katto = new Promise((valmis) => this.avausViive(valmis, heti ? 0 : AVAUS_TAUSTAN_KATTO_MS));
    this.avausViive(() => {
      if (!this.avausKesken) return;
      this.avaus.classList.add('laatikko-nakyy');
      this.avausNappi?.focus?.({ preventScroll: true });
      /*
       * KERTOJA LUKEE ESITTELYN LAATIKON AUETESSA — ei Käynnistä-napista.
       * Nappi on lähtölaukaus, ja teksti kuuluu siihen hetkeen, jolloin
       * se on luettavissa. Sama runkosääntö ja sama soitin kuin
       * pysäkeillä (js/linssipuhe.js kaarenPuheet); puuttuva tiedosto on
       * hiljainen, ja Käynnistä katkaisee luennan kesken (aloitaAjo).
       */
      if (esittely.teksti) soitaLinssiluenta(this.ui, null, { runko: ESITTELYN_RUNKO, juuri: this.luentajuuri });
      const ajo = Promise.resolve(this.sovitaAlkuun(heti ? 0 : AVAUS_KAMERA_MS))
        .then(() => new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok))));
      // Alaraja on otsikon lukuaika, yläraja katto: kumpikin täyttyy.
      const lukuaika = new Promise((ok) => this.avausViive(ok, heti ? 0 : AVAUS_LUKUAIKA_MS));
      Promise.all([Promise.race([ajo, katto]), lukuaika]).then(() => this.sumennaTausta());
    }, heti ? 0 : AVAUS_PIMENNYS_MS);
  }

  /**
   * Vaihe 2: musta ohenee himmeäksi ja linssin omat elementit tulevat
   * sen taakse näkyviin. Sumennus on SUMENTIMEN backdrop-filter eikä
   * kartan oma suodatin: filter-kerros kartta- tai SVG-solmussa jäi
   * iOS-kuoressa mitatusti tyhjäksi.
   */
  sumennaTausta() {
    if (!this.avausKesken || !this.avaus?.isConnected) return;
    this.avaus.classList.add('sumea');
    this.naytaLinssi();
  }

  /** Linssin juuri esiin: sekä inline-varmistus että luokka pois. */
  naytaLinssi() {
    if (!this.juuri) return;
    this.juuri.style.opacity = '';
    this.juuri.classList.remove('avaus-piilossa');
  }

  /**
   * KÄYNNISTÄ-NAPPI (omistaja 4.9.2026 aamu: *"kun käynnistän nappia
   * painetaan, niin lähinnä aloitustekstilaatikko häviää ja bluraus
   * poistuu ja silloin ollaan jo heti aloitus näkymässä ja vuosiluvut
   * alkavat virrata"*). Laatikko häipyy, peite katoaa ja kello lähtee
   * samalla hetkellä; musiikki nousee täyteen linssitasoon.
   */
  aloitaAjo() {
    if (!this.avausKesken) return;
    this.avausKesken = false;
    this.tyhjennaAvauksenAjastimet();
    // Esittelyn luenta katkeaa napista: pelaaja luki jo ja lähtee.
    pysaytaLinssiluenta(this.ui);
    this.naytaLinssi();
    const avaus = this.avaus;
    this.avausNappi = null;
    this.avausPeite = null;
    this.avausSumennin = null;
    if (avaus) {
      // Lyhdyt palavat vielä häipymisen ajan; silmukka pysähtyy, kun laatikko irtoaa.
      avaus.classList.remove('laatikko-nakyy');
      avaus.classList.add('pois');
      // Väistyvä peite ei enää nappaa napautuksia: kartta on pelaajan.
      avaus.style.pointerEvents = 'none';
      const pois = () => { avaus.remove(); if (this.avaus === avaus) this.avaus = null; };
      if (this.reducedMotion) pois(); else setTimeout(pois, AVAUS_POISTUMA_MS);
    }
    this.jatka();
    this.aloitaMusiikki(true);
  }

  /** Avausjakso pois yhdellä kertaa: ajastimet, peite ja laatikko. */
  puraAvaus() {
    this.avausKesken = false;
    this.tyhjennaAvauksenAjastimet();
    this.sammutaLyhdyt?.();
    this.sammutaLyhdyt = null;
    this.avaus?.remove();
    this.avaus = null;
    this.avausPeite = null;
    this.avausSumennin = null;
    this.avausNappi = null;
  }

  /** Yksi nappi: välinäytöksessä Jatka, muuten tauko tai jatko. */
  taukoTaiJatka() {
    if (this.valinaytos) { this.jatkaValinaytoksesta(); return; }
    if (this.kaynnissa) this.pysayta(); else this.jatka();
  }

  jatka() {
    if (this.loppu || this.kaynnissa) return;
    // Kello ei kulje välinäytöksen alla: teksti ja hehku pois ensin.
    if (this.valinaytos) this.suljeValinaytos();
    this.kaynnissa = true;
    this.saadaMusiikki();
    this.viime = performance.now();
    this.taukoNappi.textContent = 'Tauko';
    this.juuri.classList.remove('tauolla');
    this.raf = requestAnimationFrame((t) => this.kehys(t));
  }

  pysayta() {
    if (!this.kaynnissa) return;
    this.kaynnissa = false;
    // Pysäytetty kello ei ole matkalla mihinkään: karuselli palaa.
    this.peruEnnakko();
    this.saadaMusiikki();
    // Eikä havainnekuva jää häivytettynä odottamaan syttymistä, joka
    // ei tauolla tule (ks. haivytaPaneeli).
    this.paneeli?.classList.remove('haipyy');
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.taukoNappi.textContent = this.loppu ? 'Loppu' : 'Jatka';
    this.juuri.classList.add('tauolla');
  }

  alusta() {
    this.pysayta();
    // Hengähdystauko alkaa alusta sekin: laatikko pois ja muisti nolliin.
    this.suljeValinaytos({ heti: true });
    this.valinaytosNahty = false;
    pysaytaLinssiluenta(this.ui);
    this.paattaEnnakko();
    this.loppu = false;
    this.tila = { vuosi: this.alku, i: -1, viive: 0 };
    for (const valo of this.valot) this.asetaValonTila(valo, false, false);
    // Pallolla tummennus palaa tasaiseksi: yksikään lamppu ei ole nykyinen.
    this.siirraReika(null);
    this.paivitaReitti(-1);
    this.paneeli.hidden = true;
    this.paneeli.classList.remove('haipyy');
    this.paneeli.replaceChildren();
    // Korkeuslukko pois: tyhjä paneeli ei saa jäädä vanhaan mittaansa.
    this.paneelinKorkeusMerkki = (this.paneelinKorkeusMerkki ?? 0) + 1;
    this.paneeli.style.height = '';
    this.juuri.classList.remove('lopussa');
    this.paikkarivi.textContent = this.jakso;
    this.asettele();
    this.naytaVuosi(this.alku, true);
    this.kameraKohde = null;
    this.sovitaAlkuun();
    this.valmistaSeuraavat(-1);
    this.jatka();
  }

  /**
   * SELOSTAJA SAA PUHUA LOPPUUN (omistajan havainto 4.9.2026: *"Lukija
   * ei ehdi lukea lausettaan loppuun ennen kuin tulee jo seuraava
   * kortti."*). Pysäkin tauko (AIKAJANA_VIIVE_MS) on lyhyempi kuin
   * luenta, joten kello pidättää tauon loppua niin kauan kuin luenta
   * on kesken tai vasta alkamassa: viive ei laske alle
   * LUENNAN_TAUKOVARA_MS ennen kuin ääni on päättynyt. Hiipimä käyttää
   * max-sääntöä eikä peruuta. Katto (LUENNAN_PISIN_MS) estää ikuisen
   * odotuksen, jos ääni ei koskaan lataudu.
   */
  luentaSoi() {
    const a = this.ui?.linssiluenta;
    if (!a || a.ended) return false;
    if (this.ui.linssiluentaAjastin) return true;
    return !a.paused || a.readyState < 3;
  }

  /*
   * KELLO SEISOO LUENNAN AJAN (omistaja 4.9.2026: *"vuosiluvut voisi
   * pysähtyä siksiaikaa pyörimästä kun lukija puhuu ja sitten hieman
   * ennen vaihtoa kelautua tarvittavalla nopeudella seuraavan
   * vuosilukuun"*). Luennan aikana tauko pidetään vakiona
   * (LUENNAN_TAUKOVARA_MS) ja hiipimä nollassa; kun ääni päättyy,
   * jäljellä on juuri vara, jonka aikana ykkösrulla hiipii nollasta
   * täyteen hiipimään ja kello kiihtyy siitä seuraavaan vuoteen.
   */
  pidataTaukoaLuennalle() {
    if (!(this.tila.viive > 0) || !this.luentaSoi()) return;
    if (performance.now() - (this.luennanAlku ?? 0) > LUENNAN_PISIN_MS) return;
    this.tila = {
      ...this.tila,
      vuosi: Math.floor(this.tila.vuosi),
      viive: LUENNAN_TAUKOVARA_MS,
      viiveTaysi: LUENNAN_TAUKOVARA_MS,
    };
  }

  kehys(nyt) {
    if (!this.kaynnissa) return;
    const dt = Math.min(200, nyt - this.viime);
    this.viime = nyt;
    // Reduced motion: nopeutettu ja LINEAARINEN — pehmeät kiihdytykset
    // ovat juuri sitä liikettä, jota tässä tilassa vältetään.
    const tahti = this.reducedMotion ? { vuosiMs: 40, lineaarinen: true } : {};
    this.pidataTaukoaLuennalle();
    const { tila, syttyi, loppu } = aikajanaAskel(this.tila, dt, this.tapahtumat, tahti);
    this.tila = tila;
    this.naytaVuosi(tila.vuosi);
    if (syttyi !== null) this.sytyta(syttyi);
    else if (!this.luentaSoi()) { this.tarkistaEnnakko(tahti); this.tarkistaKameraEnnakko(tahti); }
    this.paivitaMittakaava();
    if (loppu) {
      this.lopeta();
      return;
    }
    /*
     * SYTTYMINEN SAATTOI PYSÄYTTÄÄ KELLON (merkkipaalun välinäytös
     * pysäyttää sen itse). Ilman tätä tarkistusta silmukka tilaisi
     * silti uuden kehyksen, ja Jatka käynnistäisi TOISEN rinnakkaisen
     * silmukan — kello kulkisi siitä eteenpäin kaksinkertaista vauhtia.
     */
    if (!this.kaynnissa) return;
    this.raf = requestAnimationFrame((t) => this.kehys(t));
  }

  /* ---------- ennakko (KARUSELLIN_ENNAKKO_MS) ---------- */

  /**
   * Onko seuraava pysäkki jo ennakon päässä? Laskenta katkaistaan
   * heti ennakon jälkeen (katto), joten kehyskohtainen työ on
   * enintään pari sataa aliaskelta eikä koko välin integrointi.
   * Reduced motion ohittaa ennakon kokonaan: kortit vaihtavat
   * paikkaa ilman liikettä, eikä ennakoitavaa liikettä ole.
   */
  tarkistaEnnakko(tahti) {
    if (this.reducedMotion) return;
    const kohde = this.tila.i + 1;
    if (this.ennakkoKohde === kohde || kohde >= this.tapahtumat.length) return;
    const eta = aikaSeuraavaan(this.tila, this.tapahtumat, tahti, KARUSELLIN_ENNAKKO_MS + AIKAJANA_ALIASKEL_MS);
    const kesto = ennakonKesto(eta);
    if (kesto > 0) this.aloitaEnnakko(kohde, kesto);
  }

  /**
   * Karuselli lähtee kohti pysäkkiä `kohde` niin, että liike valmistuu
   * vuosiluvun vaihtuessa. Kesto menee nauhan omaan muuttujaan, joten
   * se koskee vain kortteja — paneelin ristihäivytys pitää oman
   * kestonsa. Muuta näkymää ei kosketa.
   */
  aloitaEnnakko(kohde, kesto) {
    this.ennakkoKohde = kohde;
    this.nauha.style.setProperty('--aikajana-kesto', `${Math.round(kesto)}ms`);
    this.asettele();
    this.odotaTaysikokoista(kohde);
  }

  /**
   * TERÄVÄ KUVA VASTA TÄYSIKOKOISENA (omistaja 4.9.2026: *"vasta kun
   * muotokuva on täysikokoinen, niin sitten voi päivittää sen terävän
   * kuvan sumean tilalle"*). Siirtymän ajan kortti skaalaa valmiiksi
   * sumennettua pientä tiedostoa — se on kevyt eikä vaadi suodatinta —
   * ja terävä vaihdetaan siirtymän päätyttyä. Jos syttyminen ehtii
   * ensin (lyhyt väli), vaihdon tekee asettele syttymishetkellä.
   */
  odotaTaysikokoista(kohde) {
    const kortti = this.kortit[kohde];
    if (!kortti) return;
    this.lopetaTeravoitus();
    const teravoita = (e) => {
      // Kortilla liukuu sekä transform että opacity: vain toinen kelpaa.
      if (e?.propertyName && e.propertyName !== 'transform') return;
      this.teravoitaKortti(kohde);
    };
    this.teravoitus = { kortti, teravoita };
    kortti.addEventListener('transitionend', teravoita);
  }

  lopetaTeravoitus() {
    if (this.teravoitus) this.teravoitus.kortti.removeEventListener('transitionend', this.teravoitus.teravoita);
    this.teravoitus = null;
  }

  teravoitaKortti(i) {
    this.lopetaTeravoitus();
    const kortti = this.kortit[i];
    // Peruttu ennakko vei kortin takaisin tulevaksi: se pysyy sumeana.
    if (!kortti?.classList.contains('nykyinen')) return;
    for (const img of kortti.querySelectorAll('img[data-terava]')) vaihdaKorttikuva(img, img.dataset.terava);
  }

  /** Ennakko päättyy: kortit ovat perillä ja nauha palaa perustahtiin. */
  paattaEnnakko() {
    this.lopetaTeravoitus();
    if (this.ennakkoKohde === null) return;
    this.ennakkoKohde = null;
    this.nauha?.style.removeProperty('--aikajana-kesto');
  }

  /**
   * Ennakko perutaan, kun kello pysäytetään tai alustetaan ennen
   * syttymistä: karuselli liukuu takaisin nykyiseen pysäkkiin
   * perustahdilla, eikä ennakoitu kortti jää keskelle ruutua.
   */
  peruEnnakko() {
    if (this.ennakkoKohde === null) { this.lopetaTeravoitus(); return; }
    this.paattaEnnakko();
    this.asettele();
  }

  lopeta() {
    this.loppu = true;
    this.pysayta();
    this.juuri.classList.add('lopussa');
    /*
     * KAAREN LOPUSSA KAMERA PERÄÄNTYY (lähikuvan seuraus, 5.9.2026):
     * ajo katsoo yhtä lamppua kerrallaan, mutta loppusanat lupaavat,
     * että *"kartalla palavat nyt kaikki kaaren valot"* — ja lähikuvassa
     * niistä näkyisi yksi. Sama pehmeä ajo kuin muutkin, ja vain
     * pallolla: tasokartta on jo koko kaaren näkymässä.
     */
    if (this.pallolla) {
      this.kameraKohde = null;
      this.sovitaKaareen();
    }
    for (const valo of this.valot) { if (valo) this.asetaValonTila(valo, valo.g.classList.contains('palaa'), false); }
    // Koko matka näkyviin: loppusanat lupaavat kaaren kaikki valot.
    this.paivitaReitti(this.tapahtumat.length);
    const loppu = this.kaari.loppusanat;
    if (loppu) {
      this.vaihdaPaneeli({
        otsikko: loppu.otsikko ?? this.jakso,
        henkilo: this.kaari.otsikko,
        selite: loppu.teksti,
        ilmio: loppu.kuva ?? null,
        vuosi: this.loppu,
        ajoitus: loppu.ajoitus ?? this.jakso,
      });
      /*
       * LOPPUSANAT ÄÄNEEN (Fablen ohje 6.9.2026), jos kaari on ne
       * äänittänyt (`loppupuhe`, js/linssipuhe.js LOPUN_RUNKO).
       * Keksintökaarella lippua ei ole, joten sen loppu on hiljainen
       * kuten ennenkin — eikä peli hae tiedostoa, jota ei ole.
       */
      if (this.kaari.loppupuhe) {
        soitaLinssiluenta(this.ui, null, { runko: LOPUN_RUNKO, juuri: this.luentajuuri });
      }
    }
    this.paikkarivi.textContent = `${this.jakso} · ${this.valot.filter(Boolean).length} valoa`;
    sfx.play('paper');
  }

  /* ---------- näyttö ---------- */

  /**
   * Kello on matkamittari (asetaMatkamittari): käydessään se saa
   * murto-osavuoden joka kehyksellä ja rullat nousevat jatkuvasti;
   * pysäytettynä (siirry) numerot hyppäävät yhdellä liu'ulla, ja
   * `heti` asettaa ne paikoilleen ilman liikettä (avaus, alustus,
   * prefers-reduced-motion).
   */
  naytaVuosi(vuosi, heti = false) {
    const paikka = this.reducedMotion ? Math.floor(Math.max(0, vuosi)) : Math.max(0, vuosi);
    // Kellon paikka → lukema (asteikko: vuosiluku tai vuosia sitten).
    const arvo = Math.max(0, this.asteikko.lukema(paikka));
    const askel = this.asteikko.askel(arvo);
    const suunta = this.asteikko.suunta;
    /*
     * KAAREN LOPPUPÄÄ ON VUOSILUKU (ks. VIIMEISET PYSÄKIT): rullat
     * väistyvät ja kello näyttää tekstin "n. 1250 jaa.". Muissa
     * kohdissa ja koko keksintökaaressa teksti on null eikä mikään
     * muutu.
     */
    const vuositeksti = this.asteikko.teksti?.(arvo) ?? null;
    const teksti = vuositeksti
      ?? String(kellonNaytto(arvo, askel, suunta)).padStart(this.rullat.length, '0');
    // ELÄVÄ VAIHDOS = kello liikkui itse kokonaisen askeleen. Rakentaminen
    // ja Alusta asettavat luvun `heti`-lipulla ilman rullausta, eikä
    // ensimmäinen asetus (ei edellistä lukemaa) ole vaihdos lainkaan.
    const vaihtui = teksti !== this.kelloTeksti;
    const elava = vaihtui && !heti && this.kelloTeksti !== undefined;
    this.kelloTeksti = teksti;
    this.naytaKellonTeksti(vuositeksti);
    if (vuositeksti === null) {
      asetaMatkamittari(this.rullat, arvo, {
        heti: heti || this.reducedMotion,
        /*
         * Askelittain etenevä kello rullaa JOKA VAIHDOKSESSA: ilman
         * murto-osaa numero vain välähtäisi tilalle. Käyvä
         * keksintökello kuljettaa murto-osaa eikä käytä siirtymää.
         */
        liuku: !this.kaynnissa || !this.asteikko.murtoOsa,
        askel,
        suunta,
        murtoOsa: this.asteikko.murtoOsa !== false,
      });
      if (vaihtui) this.kellonSelite(teksti);
    }
    // Ääni vain elävästä vaihdosta: avaus ja alustus ovat `heti`,
    // ja pysäytetty kello on hiljainen (kortista toiseen kelaus myös).
    // Vuosiluvun vaihdos NAKSAHTAA; kohahdus kuuluu keksinnölle
    // (sytyta, omistajan päätös 3.9.2026).
    if (elava && this.kaynnissa) this.naksahda();
  }

  /**
   * KELLO TEKSTINÄ (ks. VIIMEISET PYSÄKIT). Rullat ja yksikkö
   * väistyvät luokalla `tekstina`, ja tilalle tulee yksi span, jossa
   * lukee vuosiluku. Solmu syntyy vasta kun sitä tarvitaan ja katoaa
   * heti kun kello palaa syvään aikaan (Alusta, uusi kaari), joten
   * keksintökellossa sitä ei ole koskaan.
   */
  naytaKellonTeksti(vuositeksti) {
    if (!this.kello) return;
    if (!vuositeksti) {
      if (this.kellonTekstisolmu) {
        this.kellonTekstisolmu.remove();
        this.kellonTekstisolmu = null;
        this.kello.classList.remove('tekstina');
      }
      return;
    }
    if (!this.kellonTekstisolmu) {
      this.kellonTekstisolmu = solmu('span', 'aikajana-kelloteksti');
      this.kello.appendChild(this.kellonTekstisolmu);
      this.kello.classList.add('tekstina');
    }
    if (this.kellonTekstisolmu.textContent !== vuositeksti) {
      this.kellonTekstisolmu.textContent = vuositeksti;
      this.kello.setAttribute('aria-label', vuositeksti);
    }
  }

  /**
   * Kellon ruudunlukijateksti ja ETUNOLLIEN PIILOTUS.
   *
   * Rullia on niin monta kuin kaaren suurimmassa luvussa (300 000 → 6),
   * ja pienemmät luvut ladottaisiin muuten muotoon "003 000". Nollat
   * jäävät paikoilleen mutta näkymättömiin (luokka `tyhja`), jolloin
   * numeroiden paikat eivät hypi rullan vaihtuessa; tuhaterotin katoaa
   * yhdessä sitä edeltävän numeron kanssa.
   */
  kellonSelite(teksti) {
    let ensimmainen = teksti.length - 1;
    for (let k = 0; k < teksti.length; k += 1) {
      if (teksti[k] !== '0') { ensimmainen = k; break; }
    }
    for (let k = 0; k < this.rullat.length; k += 1) {
      this.rullat[k].kehys?.classList.toggle('tyhja', k < ensimmainen);
    }
    for (const e of this.kelloErottimet ?? []) e.el.classList.toggle('tyhja', e.k < ensimmainen);
    const luku = Number(teksti);
    const yksikko = this.asteikko.yksikko;
    this.kello.setAttribute('aria-label', yksikko ? `${luku} ${yksikko}` : `Vuosi ${luku}`);
  }

  /**
   * KEKSINNÖN ÄÄNI: YKSI PEHMEÄ KILAHDUS (omistaja 3.9.2026: *"vaihda
   * se efektiääni, joka on, kun tulee uusi keksintö. Se pitää vaihtaa
   * johonkin todella yksinkertaiseen. Nykyinen on todella riinaava"*).
   * Aiempi yhdistelmä — tähtitehoste (SOUNDS.star) ja yleisön kohahdus
   * (js/tehosteet.js) — on pois; tilalla js/sound.js:n syntetisoitu
   * 'keksinto', lyhyt ja hiljainen. Merkkipaalu (1873) ei ole keksintö
   * eikä kilahda. Kohahdusäänet jäävät ämpäriin varalle.
   */
  keksinnonAani(t) {
    if (t?.paalu) return;
    sfx.play('keksinto');
  }

  /**
   * MEKAANISEN LASKURIN NAKSAHDUS vuoden vaihtuessa (omistajan tilaus
   * 3.9.2026: *"kun vuosiluku vaihtuu, niin siinäkin voisi olla pieni
   * ääniefekti taustalla"*). Ääni on js/sound.js:n 'vuosi' — hyvin
   * hiljainen, ja mykistyksen sekä taustatilan hoitaa SoundKit itse.
   * Liian tiheät ohitetaan (AIKAJANA_NAKSU_VALI_MS). Keksinnön kohdalla
   * soi kohahdus (keksinnonAani), ja tämä on sen vara.
   */
  naksahda() {
    const nyt = performance.now();
    if (nyt - this.viimeNaksu < AIKAJANA_NAKSU_VALI_MS) return false;
    this.viimeNaksu = nyt;
    sfx.play('vuosi');
    return true;
  }

  /**
   * ESILATAUS: KOKO KAARI PIENENÄ, HETI (omistajan havainto 3.9.2026:
   * *"kaikki kuvat pitää ladata ennakkoon taustalle ainakin tuossa
   * pienemmässä koossa mikä näkyy linssin animaation aikana"*, ja
   * Raamatun kohta 4: *"LINSSIKUVAT ESILADATAAN pienina … linssin
   * avautuessa; iso kuva vasta Lue juttu -napista."*).
   *
   * AIEMPI "kolme pysäkkiä edellä" oli kiertotie sille, että
   * alkuperäiset ovat 400–760 kt kappale: koko kaari niinä olisi yli
   * 14 Mt. Pieninä WebP-versioina (640 px, alle 90 kt) sama sarja on
   * 3–5 Mt, ja se ladataan taustalle kerralla kamera-ajon aikana.
   * Silloin karuselli ei enää odota verkkoa missään kohtaa — myöskään
   * silloin kun pelaaja hyppää kortista kauas eteenpäin.
   *
   * Isoja ei esiladata lainkaan: ne kuuluvat vasta jutun galleriaan.
   * Sama kirjanpito kuin muualla pelissä (ui-apurit esilataaKuvat):
   * yksi pyyntö per osoite per istunto.
   */
  esilataaPienet() {
    /*
     * VAIN JOS PIENET VERSIOT OVAT OLEMASSA (Fablen arvio 6.9.2026).
     * Koko kaaren esilataus on kannattava juuri siksi, että tiedostot
     * ovat pieniä (640 px WebP, alle 90 kt). Kaarella, jonka kuvista
     * ei ole pieniä versioita, tämä olisi joko kaksikymmentä 404:ää
     * tai kymmenen megatavun ryntäys alkuperäisiä — kummankin sijaan
     * riittää valmistaSeuraavat, joka hakee kaksi pysäkkiä edellä.
     */
    if (!this.pienetKuvat) return;
    const osoitteet = [];
    for (const t of this.tapahtumat) {
      for (const kuva of [t.kuva, t.kuvaToinen, t.ilmio, t.ilmioLisa]) {
        // Ulkoisella kuvalla ei ole pientä versiota; iso ladataan vasta pysäkillä.
        if (!kuva?.osoite || kuva.ulkoinen) continue;
        osoitteet.push(pieniOsoite(kuva.osoite));
        // Muotokuvista myös karusellin terävä ja sumea versio.
        const karuselli = karuselliOsoite(kuva.osoite);
        if (karuselli !== pieniOsoite(kuva.osoite)) osoitteet.push(karuselli, sumeaOsoite(kuva.osoite));
      }
    }
    esilataaKuvat(osoitteet);
  }

  /**
   * SEURAAVAT PYSÄKIT VALMIIKSI DEKOODATTUINA (omistaja 5.9.2026 ilta:
   * *"havainnekuvat pitää esiladata, nyt tulivat vähän perässä"*).
   *
   * esilataaPienet pyytää koko kaaren pienet tiedostot heti, mutta
   * pyyntö ei pura WebP:tä — se tehdään vasta, kun kuva pannaan
   * ruudulle. Tässä seuraavan KAHDEN pysäkin havainnekuva ja
   * muotokuvat ladataan JA dekoodataan jo edellisen pysäkin aikana,
   * ja valmis Image-olio jää varastoon paneelin otettavaksi
   * (kuvaTaiLaatta). Kutsutaan pysäkin vaihtuessa ja käynnistyksessä
   * (`i = -1`), joten jonossa on aina enintään pari kuvaa.
   *
   * @param {number} i juuri syttynyt pysäkki (−1 ennen ensimmäistä)
   */
  valmistaSeuraavat(i) {
    for (let n = 1; n <= PANEELIN_ESILATAUS_PYSAKKEJA; n += 1) {
      const t = this.tapahtumat[i + n];
      if (!t) return;
      // Havainnekuva paneelin omalla leveydellä (640) ja muotokuvat
      // karusellin mitassa (400) — samat osoitteet kuin ruudulla.
      this.paneelikuvat.esilataa(paneelikuvanOsoite(t.ilmio, 640, this.pienetKuvat));
      this.paneelikuvat.esilataa(paneelikuvanOsoite(t.kuva, 400, this.pienetKuvat));
      this.paneelikuvat.esilataa(paneelikuvanOsoite(t.kuvaToinen, 400, this.pienetKuvat));
    }
  }

  sytyta(i) {
    const t = this.tapahtumat[i];
    for (const valo of this.valot) { if (valo) this.asetaValonTila(valo, valo.g.classList.contains('palaa'), false); }
    const valo = this.valot[i];
    if (valo) {
      this.asetaValonTila(valo, true, true);
      // Palava valo päällimmäiseksi, jottei myöhempi naapuri peitä sitä.
      // (Pallolla kerrosta ei ole: kirjasto pinoaa merkit itse.)
      this.valokerros?.appendChild(valo.g);
    } else {
      sfx.play('paper');
    }
    this.keksinnonAani(t);
    this.paivitaReitti(i);
    this.paikkarivi.textContent = [ajoitus(t), paikka(t)].filter(Boolean).join(' · ');
    this.vaihdaPaneeli(t);
    /*
     * Ennakko on tässä joko juuri valmistunut tai (lyhyellä välillä)
     * yhä kesken. Kummassakin tapauksessa karuselli on jo oikeassa
     * kohteessa, joten asettele ei enää liikuta kortteja — se vaihtaa
     * vain sumean muotokuvan terävään, jos siirtymä ei ehtinyt.
     */
    this.paattaEnnakko();
    this.asettele();
    /*
     * KAMERA ON JO PERILLÄ TAI YHÄ MATKALLA (tarkistaKameraEnnakko).
     * Jos ennakko ei ehtinyt lähteä — lyhyt väli, pysäytetystä
     * jatkaminen tai ensimmäinen pysäkki — ajo lähtee nyt pohjakestolla,
     * jotta lamppu ei jää ruudun ulkopuolelle lähikuvassa.
     */
    if (this.pallolla && this.kameraKohde !== i) {
      this.kameraKohde = i;
      this.ajaPysakille(i, AIKAJANAN_KAMERAN_POHJA_MS);
    }
    // Seuraavien pysäkkien kuvat valmiiksi jo tämän pysäkin aikana.
    this.valmistaSeuraavat(i);
    // Avausjakson aikana selostaja vaikenee: esitys alkaa vasta napista.
    if (this.avausKesken) return;
    /*
     * MERKKIPAALUN VÄLINÄYTÖS SYRJÄYTTÄÄ PYSÄKKILUENNAN: laatikko lukee
     * oman, pidemmän tekstinsä (avaaValinaytos) eikä kolmen sanan
     * pysäkkiriviä sen päälle. Muualla kertoja lukee vuoden, keksijän
     * ja keksinnön (js/linssipuhe.js).
     */
    if (!this.avaaValinaytos(t)) {
      soitaLinssiluenta(this.ui, t, { juuri: this.luentajuuri });
      this.luennanAlku = performance.now();
    }
  }

  /* ---------- välinäytös (ks. VÄLINÄYTÖS tiedoston alussa) ---------- */

  /**
   * Merkkipaalun hengähdystauko: kello seis, laatikko kartan keskelle,
   * kertoja ja sen jälkeen pulu. Palauttaa epätoden, jos pysäkillä ei
   * ole välinäytöstä tai se on jo nähty — silloin kutsuja soittaa
   * tavallisen pysäkkiluennan.
   *
   * @param {object} t pysäkki
   * @returns {boolean} avautuiko laatikko
   */
  avaaValinaytos(t) {
    const tiedot = t?.valinaytos;
    if (!tiedot || this.valinaytosNahty || this.avausKesken) return false;
    const koti = this.ui.mapPane;
    if (!koti) return false;
    this.valinaytosNahty = true;
    // Kello pysähtyy automaattisesti (omistaja: *"Aika voisi pysähtyä
    // siinä kohtaa automaattisesti."*). Karuselli ja mittari ovat jo
    // paalussa, joten pysäytys ei liikuta mitään.
    this.pysayta();

    /*
     * TEKSTI SUORAAN KARTAN PÄÄLLE, EI KORTTIA (omistaja 4.9.2026
     * iltapäivä: *"voisi ehkä poistaa tuon kortin ja latoa teksti suoraan
     * kartan päälle"* / *"tämä teksti ... voisi tulla rivi kerrallaan
     * puheäänen kanssa euroopan kartan päälle"*). Kerros ei nappaa
     * napautuksia (css pointer-events: none), joten kartta, karuselli
     * ja pulun nappi pysyvät pelaajan käytössä; body-luokka avaa pulun
     * chatin linssin portista (js/ui-apurit.js linssiEstaaChatin).
     * Isoisän kuva ei ole enää tekstin kyljessä vaan havainnekuva-
     * paneelin kuvakierrossa (kuvakierto, t.ilmioSarja).
     */
    this.valinaytos = solmu('div', 'aikajana-valinaytos');
    this.valinaytos.setAttribute('role', 'region');
    this.valinaytos.setAttribute('aria-live', 'polite');
    this.valinaytos.setAttribute('aria-label', tiedot.otsikko ?? t.otsikko);
    const teksti = solmu('div', 'aikajana-valinaytos-teksti');
    teksti.appendChild(solmu('h2', 'aikajana-valinaytos-otsikko', tiedot.otsikko ?? t.otsikko));
    const rivit = jaaVirkkeiksi(tiedot.kertoja ?? '').map((rivi) => {
      const p = solmu('p', 'aikajana-valinaytos-rivi', rivi);
      teksti.appendChild(p);
      return p;
    });
    this.valinaytos.appendChild(teksti);
    koti.appendChild(this.valinaytos);
    document.body.classList.add('aikajana-valinaytos-auki');
    // Pakotettu asettelu, jotta liuku näkee alkuasennon omana tilanaan.
    void this.valinaytos.getBoundingClientRect?.();
    this.valinaytos.classList.add('esilla');
    /*
     * JATKA ON YLÄPALKIN NAPPI (omistaja: *"hetkenpäästä yläreunan
     * 'jatka' napin kehys voisi kevyesti alkaa hehkua hennon punaisena,
     * hitaasti sykkien. näin kartalle ei tarvitsisi tehdä tekstin
     * lisäksi mitään uutta nappia"*).
     */
    this.taukoNappi.textContent = 'Jatka';
    this.valinaytosHehku = setTimeout(() => {
      this.valinaytosHehku = null;
      if (this.valinaytos?.isConnected) this.taukoNappi.classList.add('hehku');
    }, VALINAYTOKSEN_HEHKUVIIVE_MS);

    const luenta = this.aloitaValinaytoksenPuhe(t, tiedot);
    this.ladoValinaytoksenRivit(rivit, luenta);
    return true;
  }

  /**
   * RIVI KERRALLAAN PUHEEN TAHDISSA. Luennan kesto luetaan
   * äänielementistä (loadedmetadata), ja jokainen virke syttyy siinä
   * kohdassa, jossa sen ensimmäinen merkki on koko tekstin pituudesta —
   * sanatarkkaa ajoitusta ei ole, mutta virkkeet ovat eri mittaisia ja
   * suhde osuu korvalle riittävän hyvin. Ilman luentaa (kertoja pois,
   * tiedosto puuttuu) rivit tulevat tasaisin välein; vähäisellä
   * liikkeellä kaikki kerralla.
   */
  ladoValinaytoksenRivit(rivit, luenta) {
    this.tyhjennaValinaytoksenRivit();
    if (!rivit.length) return;
    const nayta = (i) => { rivit[i]?.classList.add('nakyy'); };
    if (this.reducedMotion) { rivit.forEach((_, i) => nayta(i)); return; }
    const pituudet = rivit.map((p) => (p.textContent ?? '').length + 1);
    const yhteensa = pituudet.reduce((a, b) => a + b, 0) || 1;
    const alut = pituudet.map((_, i) => pituudet.slice(0, i).reduce((a, b) => a + b, 0) / yhteensa);
    const ajoita = (kestoMs) => {
      this.tyhjennaValinaytoksenRivit();
      rivit.forEach((_, i) => {
        this.valinaytosRiviAjastimet.push(setTimeout(() => nayta(i), Math.round(alut[i] * kestoMs)));
      });
    };
    // Tasainen vara heti: jos metatiedot eivät tule, rivit tulevat silti.
    ajoita(rivit.length * VALINAYTOKSEN_RIVIVALI_MS);
    const kesto = luenta?.duration;
    if (Number.isFinite(kesto) && kesto > 0) { ajoita(kesto * 1000 * VALINAYTOKSEN_RIVIOSUUS); return; }
    luenta?.addEventListener?.('loadedmetadata', () => {
      if (!this.valinaytos?.isConnected || !Number.isFinite(luenta.duration) || luenta.duration <= 0) return;
      ajoita(luenta.duration * 1000 * VALINAYTOKSEN_RIVIOSUUS);
    }, { once: true });
  }

  tyhjennaValinaytoksenRivit() {
    for (const a of this.valinaytosRiviAjastimet ?? []) clearTimeout(a);
    this.valinaytosRiviAjastimet = [];
  }

  /**
   * Kertoja ensin, pulu sen jälkeen (omistaja: *"Kertoja voisi myös
   * kertoa vähän pidemmin isoisän kohdalla mihin pulu sitten vain
   * kommentoisi."*).
   *
   * Kuplat lähtevät luennan 'ended'-tapahtumasta. Puuttuva tiedosto tai
   * pois kytketty kertoja johtaa samaan lopputulokseen pienen viiveen
   * päästä: kupla ei saa ilmestyä samassa silmänräpäyksessä laatikon
   * kanssa, koska silloin niitä ei lue kumpaakaan.
   */
  aloitaValinaytoksenPuhe(t, tiedot) {
    const osat = Array.isArray(tiedot.pulu) ? tiedot.pulu : [tiedot.pulu];
    const kuplat = () => {
      this.valinaytosAjastin = null;
      // Laatikko ehti sulkeutua (Jatka, Alusta, linssin purku).
      if (!this.valinaytos?.isConnected) return;
      polloLinssikupla(osat);
    };
    const viiveella = () => {
      clearTimeout(this.valinaytosAjastin);
      this.valinaytosAjastin = setTimeout(kuplat, VALINAYTOKSEN_KUPLAVIIVE_MS);
    };
    const luenta = soitaLinssiluenta(this.ui, t, { runko: valinaytoksenRunko(t), juuri: this.luentajuuri });
    if (!luenta) { viiveella(); return null; }
    luenta.addEventListener('ended', kuplat, { once: true });
    // Puuttuva tiedosto on hiljainen, mutta pulu puhuu silti.
    luenta.addEventListener('error', viiveella, { once: true });
    return luenta;
  }

  /** Jatka-nappi: kuplat pois, laatikko häipyy, kello jatkaa. */
  jatkaValinaytoksesta() {
    if (!this.valinaytos) return;
    this.suljeValinaytos();
    this.jatka();
  }

  /**
   * Laatikko pois yhdellä kertaa: ajastin, kesken oleva luenta ja
   * kuplat. Kuplien tekstit jäävät chatin virtaan (kirjaaKuplaViestiin),
   * joten pinon tyhjennys ei hukkaa puhetta.
   */
  suljeValinaytos({ heti = false } = {}) {
    clearTimeout(this.valinaytosAjastin);
    this.valinaytosAjastin = null;
    clearTimeout(this.valinaytosHehku);
    this.valinaytosHehku = null;
    this.tyhjennaValinaytoksenRivit();
    this.taukoNappi?.classList.remove('hehku');
    document.body?.classList.remove('aikajana-valinaytos-auki');
    const laatikko = this.valinaytos;
    this.valinaytos = null;
    if (!laatikko) return;
    pysaytaLinssiluenta(this.ui);
    polloKuplatPois();
    laatikko.classList.remove('esilla');
    // Väistyvä laatikko ei enää nappaa napautuksia: kartta on pelaajan.
    laatikko.style.pointerEvents = 'none';
    if (heti || this.reducedMotion) laatikko.remove();
    else setTimeout(() => laatikko.remove(), VALINAYTOKSEN_POISTUMA_MS);
  }

  /**
   * KUVAKIERTO (omistaja 4.9.2026 iltapäivä: *"ne itseasiassa voisivat
   * hitaasti vaihtua keskenään ja siihen voisi generoida kolme muuta
   * kuvaa lisäksi"*). Merkkipaalun havainnekuvapaneelissa on sarja
   * isoisän kuvia (t.ilmio + t.ilmioSarja), jotka vaihtuvat hitaalla
   * ristihäivytyksellä KUVAKIERTO_MS välein. Kehyksen pohjakuva on
   * sarjan ensimmäinen; kaksi päällyskuvaa vuorottelevat, jotta uusi
   * kuva häipyy aina suoraan edellisen päälle eikä pohjan kautta.
   * Seuraava kuva dekoodataan ennen vaihtoa (ei välähdystä), ja kierto
   * pysähtyy kun paneeli vaihtuu tai linssi puretaan.
   */
  aloitaKuvakierto(kehys, sarja, nimi) {
    const paallys = [0, 1].map(() => {
      const img = document.createElement('img');
      img.className = 'aikajana-kiertokuva';
      img.decoding = 'async';
      img.setAttribute('aria-hidden', 'true');
      kehys.appendChild(img);
      return img;
    });
    let kohta = 0;
    let vuoro = 0;
    const vaihda = async () => {
      if (!kehys.isConnected) { this.lopetaKuvakierto(); return; }
      kohta = (kohta + 1) % sarja.length;
      const tuleva = paallys[vuoro];
      const vanha = paallys[1 - vuoro];
      vuoro = 1 - vuoro;
      if (kohta === 0) {
        // Pohjakuva takaisin: molemmat päällykset pois.
        for (const p of paallys) p.classList.remove('esilla');
      } else {
        const kuvatieto = sarja[kohta];
        tuleva.alt = kuvatieto.selite ?? nimi ?? '';
        tuleva.style.cssText = rajausTyyli(kuvatieto);
        tuleva.classList.toggle('isoisa-rajattu', Boolean(kuvatieto.rajaus));
        tuleva.src = kuvatieto.osoite;
        if (typeof tuleva.decode === 'function') await tuleva.decode().catch(() => {});
        if (!kehys.isConnected) return;
        tuleva.classList.add('esilla');
        vanha.classList.remove('esilla');
      }
      this.kuvakiertoAjastin = setTimeout(vaihda, KUVAKIERTO_MS);
    };
    this.kuvakiertoAjastin = setTimeout(vaihda, KUVAKIERTO_MS);
  }

  lopetaKuvakierto() {
    clearTimeout(this.kuvakiertoAjastin);
    this.kuvakiertoAjastin = null;
  }

  /**
   * Ilmiöpaneelin ristihäivytys: uusi sisältö tulee alta esiin, vanha
   * häipyy ja poistuu siirtymän jälkeen (css .aikajana-ilmio-sivu).
   */
  vaihdaPaneeli(t) {
    const sivu = solmu('div', 'aikajana-ilmio-sivu');
    /*
     * PELKKÄ KUVA (omistaja 3.9.2026: *"havainnekuvan alta voisi poistaa
     * kaiken ja jättää pelkän kuvan"*). Otsikko, keksijä ja selite ovat
     * karusellin kortilla ja Tiedeliitteessä; paneeli on ikkuna
     * ilmiökuvaan. Kuva on nappi, joka avaa jutun. Vain kuvattomalla
     * pysäkillä (loppusanat) paneeli näyttää tekstin.
     */
    this.lopetaKuvakierto();
    if (onKuva(t.ilmio)) {
      const kehys = kuvaTaiLaatta(
        t.ilmio, t.otsikko, 640, 'aikajana-ilmiokuva', this.paneelikuvat, this.pienetKuvat,
      );
      /*
       * KOKO KUVA NÄKYVIIN, EI RAJAUSTA (kuvatoimituksen näyttöohje
       * 5.9.2026: *"koko kuva näkyviin (contain), EI cover-rajausta
       * ennen maskia"*). Kaari valitsee: `kuvasovitus: 'contain'`.
       * Ilman kenttää kuva täyttää kehyksen kuten ennen — keksintöjen
       * havainnekuvat on rajattu sitä varten.
       */
      if (this.kaari.kuvasovitus === 'contain') kehys.classList.add('kokonaan');
      /*
       * VALOKEILAN EPÄSÄÄNNÖLLINEN REUNA (omistaja 5.9.2026 ilta:
       * *"saisiko havainnekuvan häivytyksen hieman epäsäännöllisemmän
       * muotoiseksi?"*). Muoto lasketaan kerran tapahtuman indeksistä,
       * joten sama kuva saa aina saman reunan ja kuvat eroavat
       * toisistaan; css lukee sen muuttujasta (css/aikajana.css).
       */
      kehys.style.setProperty('--aikajana-valokeila', valokeilanMaski(t.n ?? t.vuosi ?? 0));
      const sarja = [t.ilmio, ...(t.ilmioSarja ?? [])].filter(onKuva);
      if (sarja.length > 1) this.aloitaKuvakierto(kehys, sarja, t.otsikko);
      if (t.juttu) {
        kehys.classList.add('avaa-jutun');
        kehys.setAttribute('role', 'button');
        kehys.setAttribute('tabindex', '0');
        kehys.setAttribute('aria-label', `${t.otsikko}: lue juttu`);
        kehys.addEventListener('click', () => this.avaaJuttu(t));
        kehys.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.avaaJuttu(t); } });
      }
      sivu.appendChild(kehys);
      /*
       * NIMI KUVAN ALAREUNAAN (omistaja 5.9.2026 yö, iPad: *"Keksinnön
       * nimi ei mahdu kuvan alle. Pitäisikö siirtää havainnekuvan
       * päälle vai miten?"*). Kapealla ruudulla karusellin kortti on
       * noin 100 px leveä, eikä "Kuumailmapallo" tai
       * "Montgolfier-veljekset" mahdu siihen. Koko nimi ladotaan siksi
       * havainnekuvan alareunaan valokeilan häipyvälle vyöhykkeelle:
       * vuosi ja otsikko isolla. Keksijän nimi on kortissa ja paikka
       * kellorivillä (omistaja 5.9.2026 ilta, sanatarkasti:
       * "havainnekuvan alla tulee lukea pelkkä keksinnön nimi ja
       * vuosiluku"). Teksti on kuvan sisar eikä lapsi, jotta se ei
       * maskaudu kuvan mukana.
       */
      /*
       * KUVAPUTKEN OMA KUVATEKSTI (kuvatoimitus 5.9.2026). Jos
       * havainnekuvalla on `kuvateksti`, se sisältää JO ajoituksen
       * ("Jebel Irhoud, noin 300 000 vuotta sitten"), joten isolla
       * rivillä on pelkkä otsikko eikä sama ajoitus kahteen kertaan;
       * kuvateksti ladotaan sen alle pienemmällä. Ilman kenttää muoto
       * on entinen "ajoitus · otsikko" (keksinnöt).
       */
      const kuvateksti = t.ilmio?.kuvateksti;
      const nimi = solmu('div', 'aikajana-ilmiokuvateksti');
      /*
       * VUOSI ◈ OTSIKKO (omistaja 5.9.2026 klo 00.45: teksti *"vähän
       * pienempi ja ehkä hieman tummempi"*, ja erottimeksi tyyliin
       * sopiva merkki). Erotin on oma elementtinsä, jotta se saa oman
       * kokonsa ja kultaisen sävynsä ilman että vuosi ja otsikko
       * muuttuvat; merkki tulee vakiosta AIKAJANAN_EROTIN.
       */
      const otsikko = solmu('span', 'aikajana-ilmiokuvateksti-otsikko');
      const erotin = solmu('span', 'aikajana-erotin', AIKAJANAN_EROTIN);
      // Koriste ei ole tekstiä: ruudunlukija lukee "1769 Höyrykone".
      erotin.setAttribute('aria-hidden', 'true');
      // Kolme elementtiä eikä tekstisolmuja: väli tulee css:n
      // marginaalista (.aikajana-erotin), jolloin sitä voi säätää
      // vaihtamatta merkkiä.
      otsikko.append(
        solmu('span', 'aikajana-ilmiokuvateksti-vuosi', String(ajoitus(t))),
        erotin,
        solmu('span', 'aikajana-ilmiokuvateksti-nimi', String(t.otsikko ?? '')),
      );
      /*
       * KUVAPUTKEN KUVATEKSTI (Ihmisen matka): kun pysäkillä on oma
       * kuvateksti, se sisältää jo ajoituksen, joten otsikkorivillä
       * on vain nimi ja kuvateksti ladotaan sen alle pienellä.
       */
      if (kuvateksti) {
        otsikko.replaceChildren(solmu('span', 'aikajana-ilmiokuvateksti-nimi', String(t.otsikko ?? '')));
        nimi.append(otsikko, solmu('span', 'aikajana-ilmiokuvateksti-kuvateksti', kuvateksti));
      } else {
        nimi.append(otsikko);
      }
      sivu.appendChild(nimi);
    } else {
      const teksti = solmu('div', 'aikajana-ilmio-teksti');
      const henkilorivi = solmu('div', 'aikajana-ilmio-henkilo');
      if (muotokuvat(t).length) {
        henkilorivi.appendChild(muotokuvaKehys(t, 200, 'aikajana-ilmio-kasvot', this.pienetKuvat));
      }
      henkilorivi.appendChild(solmu('span', 'aikajana-ilmio-nimi', t.henkilo ?? ''));
      teksti.append(
        henkilorivi,
        solmu('h3', 'aikajana-ilmio-otsikko', t.otsikko),
        solmu('p', 'aikajana-ilmio-selite', t.selite ?? ''),
      );
      if (t.juttu) {
        const lue = solmu('button', 'aikajana-lue', 'Lue juttu');
        lue.type = 'button';
        lue.addEventListener('click', () => this.avaaJuttu(t));
        teksti.appendChild(lue);
      }
      sivu.append(teksti);
    }
    const vanhat = [...this.paneeli.children];
    // Vanha korkeus talteen ENNEN uuden sivun liittämistä: se on
    // korkeusliu'un lähtöarvo (css .aikajana-ilmio transition: height).
    const vanhaKorkeus = this.paneeli.hidden ? 0 : (this.paneeli.getBoundingClientRect?.().height ?? 0);
    this.paneeli.hidden = false;
    // Ennakkohäivytys päättyy tähän: uusi sivu tulee esiin täyteen
    // paneeliin (ks. haivytaPaneeli).
    this.paneeli.classList.remove('haipyy');
    this.paneeli.appendChild(sivu);
    /*
     * KUVA DEKOODATAAN ENNEN RISTIHÄIVYTYSTÄ (omistaja 3.9.2026:
     * *"havainnekuvien vaihto pehmeämmäksi"*). Ilman tätä selain purki
     * WebP:n häivytyksen ensimmäisillä kehyksillä ja liike nyki. Pieni
     * kuva on esiladattu, joten dekoodaus on yleensä välitön; katto
     * pitää huolen, ettei vaihto jää odottamaan verkkoa.
     */
    const kuva = sivu.querySelector('img');
    // Esiladattua ei odoteta lainkaan: bittikartta on jo muistissa,
    // joten sivu voi liukua esiin samalla kehyksellä kuin valo syttyy.
    const esiladattu = Boolean(kuva?.dataset?.esiladattu) || Boolean(kuva?.complete && kuva.naturalWidth > 0);
    const valmis = kuva && !esiladattu && typeof kuva.decode === 'function'
      ? Promise.race([kuva.decode().catch(() => {}), new Promise((ok) => setTimeout(ok, PANEELIN_DEKOODAUSKATTO_MS))])
      : Promise.resolve();
    void valmis.then(() => requestAnimationFrame(() => {
      if (!sivu.isConnected) return;
      /*
       * LÄHTÖARVO PAKOTETAAN LASKETUKSI ennen luokan vaihtoa. Ilman
       * tätä lukua selain saa nähdä sivun ensi kerran vasta
       * `esilla`-luokan kanssa, jolloin siirtymällä ei ole mistä
       * lähteä ja kuva ilmestyy kerralla — juuri se kova leikkaus,
       * jonka omistaja näki. Sama luku lukitsee paneelin korkeuden
       * vanhaan mittaansa, jotta uusi voidaan liu'uttaa siitä.
       */
      void sivu.offsetHeight;
      if (vanhaKorkeus > 0) this.paneeli.style.height = `${vanhaKorkeus}px`;
      sivu.classList.add('esilla');
      for (const v of vanhat) {
        v.classList.remove('esilla');
        v.classList.add('poistuu');
        setTimeout(() => v.remove(), PANEELIN_HAIVYTYS_MS);
      }
      if (vanhaKorkeus > 0) {
        /*
         * `esilla` teki sivusta virran mukaisen, joten sen oma korkeus
         * on paneelin uusi mitta. Luku pakottaa sommittelun vielä
         * lukitulla korkeudella, ja vasta sen jälkeen asetettu uusi
         * arvo lähtee liukumaan. Lukko avataan häivytyksen jälkeen,
         * jottei kiinteä korkeus jää ikkunan koon muutoksen tielle;
         * merkki varmistaa, ettei vanhentunut ajastin avaa uudempaa.
         *
         * REUNUS MUKAAN, JA MITTA SOMMITTELUSTA EIKÄ RUUDULTA.
         * `style.height` on border-box (styles.css
         * `* { box-sizing: border-box }`), kun taas sivun korkeus on
         * paneelin sisältölaatikossa: ilman reunuslisää lukon avaus
         * nytkäytti paneelia parin pikselin verran juuri kun liuku oli
         * päättynyt. `offsetHeight` eikä `getBoundingClientRect`,
         * koska sivulla on juuri tässä käynnissä oma skaalaus
         * (0,985 → 1) ja ruudulta mitattu laatikko olisi sen verran
         * liian matala.
         */
        const reunat = this.paneeli.offsetHeight - this.paneeli.clientHeight;
        // Pohja mukaan: tekstisivulla min-height (9rem) on lopullinen
        // korkeus, ja ilman tätä liuku päättyi sen alle ja lukon avaus
        // ponnautti paneelin takaisin pohjalle.
        const pohja = Number.parseFloat(getComputedStyle(this.paneeli).minHeight) || 0;
        this.paneeli.style.height = `${Math.max(sivu.offsetHeight + reunat, pohja)}px`;
        const merkki = (this.paneelinKorkeusMerkki = (this.paneelinKorkeusMerkki ?? 0) + 1);
        setTimeout(() => {
          if (this.paneelinKorkeusMerkki === merkki) this.paneeli.style.height = '';
        }, PANEELIN_HAIVYTYS_MS);
      }
    }));
  }

  /**
   * NAUHAN LEVEYS KORTIN LEVEYKSINÄ. Kortin leveys on CSS-muuttuja
   * (`--aikajana-kortti-w`, clamp-arvo), joten se luetaan mitattuna
   * eikä arvattuna: sama laskenta pätee sekä 1280 px:n työpöydällä
   * että 390 px:n puhelimella. `offsetWidth` on ASETTELUN leveys eikä
   * skaalattu, joten kutistettu kortti ei sotke mittaa.
   */
  nauhanLeveysKortteina() {
    const nauha = this.nauha?.clientWidth ?? 0;
    const kortti = this.kortit[0]?.offsetWidth ?? 0;
    if (!(nauha > 0) || !(kortti > 0)) return 0;
    return nauha / kortti;
  }

  /**
   * KARUSELLIN ASETTELU. Nykyinen kortti on aina nauhan keskellä,
   * menneet vasemmalla ja tulevat oikealla kronologisessa
   * järjestyksessä (karusellinPaikat). Paikat, mitat, sumennus ja
   * himmeys menevät CSS-muuttujina, ja tyylitiedosto liu'uttaa koko
   * rivin uuteen asentoon yhdellä siirtymällä — vuoden vaihtuessa
   * rivi liukuu askeleen vasemmalle (Raamatun animaatiosääntö).
   *
   * Ruudun ulkopuolelle jäävät kortit saavat OMAN oikean paikkansa ja
   * pelkän läpinäkyvyyden nollaksi: silloin reunan takaa saapuva
   * kortti liukuu sisään oikeasta suunnasta eikä ilmesty tyhjästä.
   * Ne eivät ole napautettavia eivätkä fokusoitavia (aria-hidden).
   */
  asettele() {
    /*
     * KARUSELLI SAA OLLA KELLOA EDELLÄ. Ennakon aikana kohde on
     * seuraava pysäkki, vaikka kello on yhä edellisessä — ks.
     * aloitaEnnakko. Ilman tätä eroa ikkunan koon muutos (koonMuutos)
     * nykäisisi karusellin takaisin kesken siirtymän.
     */
    const nyt = this.ennakkoKohde ?? this.tila.i;
    const ennakossa = this.ennakkoKohde !== null;
    const leveys = this.nauhanLeveysKortteina();
    this.kortit.forEach((kortti, i) => {
      const { paikka: paikkaX, mitta, luokka, himmeys, sumennus, jarjestys } = karusellinPaikat(i, nyt, leveys);
      kortti.className = `aikajana-kortti ${luokka}${this.tapahtumat[i].paalu ? ' paalu' : ''}`;
      kortti.style.setProperty('--paikka', paikkaX.toFixed(3));
      kortti.style.setProperty('--mitta', mitta.toFixed(2));
      kortti.style.setProperty('--himmeys', himmeys.toFixed(2));
      kortti.style.setProperty('--sumennus', `${sumennus.toFixed(2)}px`);
      kortti.style.zIndex = String(jarjestys);
      /*
       * Tuleva pysäkki näyttää valmiiksi sumennetun tiedoston, muut
       * terävän. Vaihto menee dekoodauksen kautta (vaihdaKorttikuva),
       * jottei liukuvassa kortissa välähdä tyhjää kehystä.
       * ENNAKON AIKANA myös saapuva kortti pysyy sumeana: pieni kuva
       * on kevyt skaalata, ja terävä tulee vasta täydessä mitassa
       * (odotaTaysikokoista) — omistajan tilaus 4.9.2026.
       */
      const sumeana = luokka === 'tuleva' || (ennakossa && luokka === 'nykyinen');
      for (const img of kortti.querySelectorAll('img[data-terava]')) {
        vaihdaKorttikuva(img, sumeana ? img.dataset.sumea : img.dataset.terava);
      }
      const piilossa = luokka === 'piilossa';
      kortti.setAttribute('aria-hidden', piilossa ? 'true' : 'false');
      kortti.tabIndex = piilossa ? -1 : 0;
    });
    this.nauha.classList.toggle('tyhja', nyt < 0);
    this.asetaPaneelinYla();
  }

  /**
   * PANEELI ON RAAHATTAVA (omistaja 3.9.2026 ilta: *"tuota havainnekuvan
   * paikkaa pitäisi saada liikuttaa"*). Veto mistä tahansa paneelin
   * kohdasta siirtää sitä; alle kynnyksen jäävä liike on napautus, joka
   * menee kuvalle (avaa jutun) kuten ennenkin. Siirto on CSS-muuttujina
   * (--aikajana-paneeli-dx/-dy), jotta vuosipalkin alta mitattu
   * yläreuna (asetaPaneelinYla) ja siirto eivät sotke toisiaan, ja se
   * rajataan linssin alueelle. Paikka muistetaan istunnon ajan
   * (PANEELIN_SIIRTO), jotta linssin uudelleenavaus ei palauta sitä.
   */
  kytkeRaahaus() {
    const paneeli = this.paneeli;
    lataaPaneelinMuisti();
    this.asetaPaneelinKoko(PANEELIN_SIIRTO.koko);
    this.asetaPaneelinSiirto(PANEELIN_SIIRTO.dx, PANEELIN_SIIRTO.dy);
    let veto = null;
    /*
     * NIPISTYS (omistaja 3.9.2026 ilta: *"nipistämällä kuva suurenee tai
     * pienenee"*): kaksi osoitinta paneelilla mitoittavat sen; veto
     * keskeytyy nipistyksen ajaksi eikä jatku, kun toinen sormi nousee.
     * Hiirellä sama tehdään rullalla paneelin päällä (alla).
     */
    const sormet = new Map();
    let nipistys = null;
    const aloitaNipistys = () => {
      const [a, b] = [...sormet.values()];
      nipistys = { etaisyys: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), koko: PANEELIN_SIIRTO.koko };
      veto = null;
      paneeli.classList.add('nipistetaan');
    };
    paneeli.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      sormet.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (sormet.size >= 2) { aloitaNipistys(); return; }
      veto = { id: e.pointerId, x: e.clientX, y: e.clientY, dx: PANEELIN_SIIRTO.dx, dy: PANEELIN_SIIRTO.dy, liikkui: false };
    });
    const nipista = (e) => {
      if (!nipistys || !sormet.has(e.pointerId)) return false;
      sormet.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (sormet.size < 2) return true;
      const [a, b] = [...sormet.values()];
      const etaisyys = Math.hypot(a.x - b.x, a.y - b.y);
      e.preventDefault();
      this.asetaPaneelinKoko(this.rajattuPaneelinKoko(nipistys.koko * (etaisyys / nipistys.etaisyys)));
      return true;
    };
    const paataSormi = (e) => {
      sormet.delete(e.pointerId);
      if (nipistys && sormet.size < 2) {
        nipistys = null;
        paneeli.classList.remove('nipistetaan');
        this.raahattiin = true;
        setTimeout(() => { this.raahattiin = false; }, 0);
        tallennaPaneelinMuisti();
      }
    };
    paneeli.addEventListener('wheel', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const kerroin = Math.exp(-e.deltaY * PANEELIN_RULLAN_HERKKYYS);
      this.asetaPaneelinKoko(this.rajattuPaneelinKoko(PANEELIN_SIIRTO.koko * kerroin));
      clearTimeout(this.rullanAjastin);
      this.rullanAjastin = setTimeout(tallennaPaneelinMuisti, 300);
    }, { passive: false });
    // Liike ja irrotus kuunnellaan ikkunasta: kaappaus ei ole varma
    // (kartta ottaa osoittimen omaan käyttöönsä), ja veto saa jatkua
    // paneelin ulkopuolellakin.
    const liikkuu = (e) => {
      if (nipista(e)) return;
      if (!veto || e.pointerId !== veto.id) return;
      const dx = e.clientX - veto.x;
      const dy = e.clientY - veto.y;
      if (!veto.liikkui) {
        if (Math.hypot(dx, dy) < PANEELIN_RAAHAUSKYNNYS) return;
        veto.liikkui = true;
        paneeli.classList.add('raahataan');
        paneeli.setPointerCapture?.(e.pointerId);
      }
      e.preventDefault();
      const raja = rajaaPaneelinSiirto(paneeli, this.juuri, veto.dx + dx, veto.dy + dy);
      this.asetaPaneelinSiirto(raja.dx, raja.dy);
    };
    const lopeta = (e) => {
      paataSormi(e);
      if (!veto || e.pointerId !== veto.id) return;
      if (veto.liikkui) {
        paneeli.classList.remove('raahataan');
        paneeli.releasePointerCapture?.(e.pointerId);
        // Napautus ei saa mennä kuvalle raahauksen päätteeksi.
        this.raahattiin = true;
        setTimeout(() => { this.raahattiin = false; }, 0);
        tallennaPaneelinMuisti();
      }
      veto = null;
    };
    const irrota = () => {
      globalThis.removeEventListener?.('pointermove', liikkuu);
      globalThis.removeEventListener?.('pointerup', paata);
      globalThis.removeEventListener?.('pointercancel', paata);
    };
    const paata = (e) => { lopeta(e); if (!veto && !sormet.size) irrota(); };
    paneeli.addEventListener('pointerdown', () => {
      globalThis.addEventListener?.('pointermove', liikkuu);
      globalThis.addEventListener?.('pointerup', paata);
      globalThis.addEventListener?.('pointercancel', paata);
    });
    this.irrotaRaahaus = irrota;
    paneeli.addEventListener('click', (e) => {
      if (this.raahattiin) { e.stopPropagation(); e.preventDefault(); }
    }, true);
  }

  asetaPaneelinSiirto(dx, dy) {
    PANEELIN_SIIRTO.dx = dx;
    PANEELIN_SIIRTO.dy = dy;
    this.paneeli.style.setProperty('--aikajana-paneeli-dx', `${Math.round(dx)}px`);
    this.paneeli.style.setProperty('--aikajana-paneeli-dy', `${Math.round(dy)}px`);
  }

  /** Kokokerroin rajattuna linssin alueeseen (mitat ruudulta). */
  rajattuPaneelinKoko(koko) {
    const p = this.paneeli?.getBoundingClientRect?.();
    const j = this.juuri?.getBoundingClientRect?.();
    if (!p || !j) return rajaaPaneelinKoko(koko);
    // Paneelin yläreuna ilman siirtoa = vuosipalkin alta mitattu paikka.
    const ylaVara = Math.max(0, p.top - PANEELIN_SIIRTO.dy - j.top);
    return rajaaPaneelinKoko(koko, {
      leveys: p.width, korkeus: p.height, kokoNyt: PANEELIN_SIIRTO.koko,
      juuriLeveys: j.width, juuriKorkeus: j.height, ylaVara,
    });
  }

  asetaPaneelinKoko(koko) {
    PANEELIN_SIIRTO.koko = koko;
    this.paneeli.style.setProperty('--aikajana-paneeli-koko', koko.toFixed(3));
    // Suurempi paneeli ei saa työntyä linssin alueen yli.
    const raja = rajaaPaneelinSiirto(this.paneeli, this.juuri, PANEELIN_SIIRTO.dx, PANEELIN_SIIRTO.dy);
    if (raja.dx !== PANEELIN_SIIRTO.dx || raja.dy !== PANEELIN_SIIRTO.dy) this.asetaPaneelinSiirto(raja.dx, raja.dy);
  }

  /**
   * ILMIÖPANEELI ALKAA VUOSIPALKIN ALTA (omistaja 3.9.2026: *"havainne-
   * kuvan ruutu ei saisi olla kiinni vuosipalkissa ylhäällä"*). Palkin
   * korkeus riippuu kirjasimesta ja ruudun leveydestä, joten sen alareuna
   * mitataan ja paneelin yläreuna asetetaan CSS-muuttujaan; koon
   * muutos kutsuu asettelun uudestaan.
   */
  asetaPaneelinYla() {
    const palkki = this.kello?.parentElement;
    if (!palkki || !this.juuri || typeof palkki.getBoundingClientRect !== 'function') return;
    const yla = palkki.getBoundingClientRect().bottom - this.juuri.getBoundingClientRect().top;
    if (Number.isFinite(yla) && yla > 0) this.juuri.style.setProperty('--aikajana-paneeli-yla', `${Math.round(yla + 10)}px`);
  }

  /**
   * KORTIN NAPAUTUS PYSÄYTTÄÄ JA SIIRTYY (omistaja 3.9.2026: *"Pelaaja
   * voi minä hetkenä tahansa pysäyttää aikajanan klikkaamalla mitä
   * tahansa tiedemiestä alareunassa, eikä animaatio saa jatkua kuin
   * vasta sitten, jos pelaaja painaa Jatka-nappia ... eteenpäin kuin
   * taaksepäin historiassa vapaasti"*). Nykyisen kortin napautus avaa
   * Tiedeliitteen; muu kortti siirtää koko näkymän — kellon, kartan
   * lamput, paneelin ja karusellin — siihen pysäkkiin ja jää tauolle.
   */
  napautaKorttia(i) {
    const t = this.tapahtumat[i];
    if (!t) return;
    if (i === this.tila.i) {
      this.pysayta();
      if (t.juttu) this.avaaJuttu(t);
      return;
    }
    this.siirry(i);
  }

  /** Lampun napautus: nykyinen pysäkki vain pysäyttää, muu siirtyy siihen. */
  napautaValoa(i) {
    if (!this.tapahtumat[i]) return;
    if (i === this.tila.i) { this.pysayta(); return; }
    this.siirry(i);
  }

  /**
   * Siirtyminen pysäkkiin `i` tauolla. Lamput palavat pysäkkiin asti
   * ja sammuvat sen jälkeen, joten Jatka jatkaa juuri tästä kohdasta
   * ja myöhemmät keksinnöt syttyvät uudelleen vuorollaan. Vuosiluku
   * rullaa hiljaa (kello ei käy), kilahdusta ei tule.
   */
  siirry(i) {
    const t = this.tapahtumat[i];
    if (!t) return;
    this.pysayta();
    this.loppu = false;
    this.juuri.classList.remove('lopussa');
    const viive = t.paalu ? AIKAJANA_PAALU_MS : AIKAJANA_VIIVE_MS;
    this.tila = { vuosi: t.vuosi, i, viive, viiveTaysi: viive };
    this.naytaVuosi(t.vuosi);
    this.valot.forEach((valo, k) => { if (valo) this.asetaValonTila(valo, k <= i, k === i); });
    this.paivitaReitti(i);
    if (this.valot[i]) this.valokerros?.appendChild(this.valot[i].g);
    this.paikkarivi.textContent = [ajoitus(t), paikka(t)].filter(Boolean).join(' · ');
    this.vaihdaPaneeli(t);
    this.asettele();
    // Selaus vie kameran mukanaan: lähikuvassa toinen pysäkki on
    // ruudun ulkopuolella, eikä lamppua näkisi lainkaan.
    this.kameraKohde = i;
    this.ajaPysakille(i, AIKAJANAN_KAMERAN_POHJA_MS);
    this.valmistaSeuraavat(i);
    this.taukoNappi.textContent = 'Jatka';
    this.juuri.classList.add('tauolla');
  }

  /** Nuolinäppäimet selaavat pysäkkejä (sama tauko kuin napautuksessa). */
  nappain(e) {
    if (!this.juuri?.isConnected || this.ui.dead) return;
    /*
     * AVAUSJAKSO OMII NÄPPÄIMISTÖN: Enter tai välilyönti käynnistää
     * esityksen, Esc sulkee linssin. Nuolet eivät selaa pysäkkejä
     * ennen kuin ajo on alkanut. preventDefault estää myös fokusoidun
     * napin oman napautuksen, joten Käynnistä ei laukea kahdesti.
     */
    if (this.avausKesken) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        this.aloitaAjo();
      } else if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        this.ui.pysaytaAikajana?.();
      }
      return;
    }
    /*
     * VÄLINÄYTÖS OMII NÄPPÄIMISTÖN SAMALLA SOPIMUKSELLA: Enter tai
     * välilyönti on Jatka, Esc sulkee linssin, eivätkä nuolet selaa
     * pysäkkejä hengähdystauon aikana.
     */
    if (this.valinaytos) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        this.jatkaValinaytoksesta();
      } else if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        this.ui.pysaytaAikajana?.();
      }
      return;
    }
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const kohde = this.tila.i + (e.key === 'ArrowRight' ? 1 : -1);
    if (kohde < 0 || kohde >= this.tapahtumat.length) return;
    e.preventDefault();
    this.siirry(kohde);
  }

  /**
   * KEKSIJÄN SIVU = TIEDELIITE (Raamattu, KEKSIJAT LINSSIN ALARIVILLA
   * JA TIEDELIITE, kohta 3): napautus ja "Lue juttu" avaavat lehtisivun
   * Lisälehden taittoperheessä (js/tiedeliite.js) — generoitu
   * muotokuva, aito kuva ja ilmiökuvat samalla sivulla, juttu
   * palstoina, edellinen/seuraava keksijä alanapeista ja
   * hampurilaisesta. Kello pysyy pysäytettynä sivun ajan; kun pelaaja
   * selaa sivulla toiseen keksijään, linssin paneeli seuraa perässä
   * kuten menneen kortin napautuksessa (valot ja kello eivät liiku).
   */
  avaaJuttu(t) {
    const i = this.tapahtumat.indexOf(t);
    if (i < 0) return;
    const auki = avaaTiedeliite(this.ui, this.tapahtumat, i, {
      lahdeVara: this.linssi.lahde?.aineisto ?? 'Wikipedia',
      kunVaihtuu: (j) => {
        const kohde = this.tapahtumat[j];
        if (!kohde || !this.juuri?.isConnected || j === this.tila.i) return;
        this.vaihdaPaneeli(kohde);
        this.paikkarivi.textContent = [ajoitus(kohde), paikka(kohde)].filter(Boolean).join(' · ');
      },
      kunSuljetaan: () => this.palautaJutunJalkeen(),
    });
    if (auki) this.vaimennaJutunAjaksi();
  }

  /* ---------- purku ---------- */

  pura() {
    this.pysayta();
    // Sulkeminen kesken avauksen: peite, laatikko ja ajastimet pois.
    this.puraAvaus();
    // Sama kesken välinäytöksen: laatikko, ajastin ja kuplat pois.
    this.suljeValinaytos({ heti: true });
    pysaytaLinssiluenta(this.ui);
    suljeTiedeliite(this.ui);
    this.lopetaMusiikki();
    this.irrotaRaahaus?.();
    this.irrotaRaahaus = null;
    if (this.koonMuutos) globalThis.removeEventListener?.('resize', this.koonMuutos);
    this.koonMuutos = null;
    if (this.nappainkuuntelija) document.removeEventListener?.('keydown', this.nappainkuuntelija);
    this.nappainkuuntelija = null;
    this.juuri?.remove();
    this.valokerros?.remove();
    /*
     * PALLOLAUDALLA VALOT JA TUMMENNUS OVAT LAUDAN KERROKSIA (aalto 2A):
     * osan purku vie merkit ja ruutukalvon pois siirtymällä
     * (js/pallolauta/linssit.js pura). Reiän liuku pysäytetään ensin,
     * jottei kehys enää maalaa purettua kalvoa.
     */
    if (this.pallolla) {
      cancelAnimationFrame(this.reianLiuku);
      this.reianPaikka = null;
      this.kalvo = null;
      // Liekkien kehyssilmukka seis ennen kerrosten purkua.
      this.liekit?.pura();
      this.liekit = null;
      this.reittiOsat = null;
      this.lauta?.linssit?.pura(PALLON_OSA);
    }
    // Tummennus liukuu pois ja poistuu vasta sen jälkeen; määritykset
    // (maski) sen mukana, koska pinta viittaa niihin.
    const tummennus = this.tummennus;
    const maaritykset = this.maaritykset;
    if (tummennus) {
      tummennus.classList.remove('paalla');
      const pois = () => { tummennus.remove(); maaritykset?.remove(); };
      if (this.reducedMotion) pois(); else setTimeout(pois, TUMMENNUKSEN_POISTUMA_MS);
    } else {
      maaritykset?.remove();
    }
    // Terävän tilan pakotus pois AINA, myös kesken ajon suljettaessa.
    this.pakotaLaatu(false);
    this.paneelikuvat.tyhjenna();
    this.kameraKohde = null;
    if (this.vastaskaala) this.ui.nipistysVastaskaalaajat?.delete(this.vastaskaala);
    document.body.classList.remove('aikajana-paalla');
    /*
     * LUOKKA POIS → LIVIA SAA VUORON (ks. suljeKelluvat tiedoston
     * lopussa). Koukku on TÄSSÄ eikä pysaytaAikajana-funktiossa, koska
     * "Sulje" ja linssinapin purku menevät js/ui.js:n oman
     * pysaytaAikajanan kautta, joka kutsuu suoraan tätä purkua —
     * moottorin oma pysaytaAikajana on vain toinen sisäänkäynti samaan.
     */
    polloLinssiPaattyi();
    this.lopetaKuvakierto();
    if (this.ui.kameraVapaa) this.vapautaKamera(false);
    this.palautaKamera();
    this.juuri = null;
    this.valokerros = null;
    this.tummennus = null;
    this.maaritykset = null;
    this.maski = null;
    this.lauta = null;
    // Tausta takaisin vasta kun linssi on poissa: syncAmbiencen portti
    // lukee juuren kytkentää.
    this.suljeAanimaailma();
  }
}

/* ==================== JULKINEN RAJAPINTA ==================== */

/*
 * LINSSIN AIKANA KAIKKI MUU ON KIINNI (omistajan tilaus 4.9.2026:
 * *"Pöllön kommentit saattavat tulla vielä kesken linssin. Tosin itse
 * käynnistin linssin kesken kaiken mutta silti pitää kaikki muu blokata
 * varmuuden vuoksi kun linssi alkaa."*).
 *
 * Kaksi puolta, ja kumpikin asuu yhdessä paikassa:
 *   1. AVAAMISEN PORTTI on ui-apureissa (linssiEstaa) ja lukee bodyn
 *      luokan, jonka tämä moduuli asettaa — kelluvien korttien avaajat
 *      kysyvät siltä itse (js/pollo.js, js/fokuskohteet.js,
 *      js/fokusnosto.js).
 *   2. RUUDUN TYHJENNYS on tässä: se mikä oli jo auki linssin
 *      alkaessa, suljetaan. Tuonnit ovat tarkoituksella tiedoston
 *      lopussa kytkennän vieressä — tämä on ainoa kohta, jossa
 *      aikajanamoottori tietää muusta käyttöliittymästä.
 */
import {
  polloKuplatPois, polloLinssiAlkoi, polloLinssikupla, polloLinssiPaattyi,
} from './pollo.js';
import { suljeFokuskohde } from './fokuskohteet.js';
import { suljeNostonKortti } from './fokusnosto.js';
import { suljeElaintaky } from './elaintaky.js';
import { suljeSyvennys } from './syvennys.js';

/**
 * Kartan päällä kelluvat kortit pois linssin tieltä.
 *
 * JOKAINEN KELLUVA KORTTI ERIKSEEN: kohdekortilla, täkynostolla,
 * eläintäyllä ja syvennystarinalla on kullakin OMA kerrosluokkansa
 * (`.fokusnosto-kerros`, `.elaintaky-kerros`, `.syvennys-kerros`),
 * jottei toisen sulkeminen veisi toista mukanaan — sama ero pätee
 * tässäkin, ja siksi kutsuja on neljä. Kuvasuurennokset ovat korttien
 * omia jatkeita ja lähtevät niiden mukana.
 */
function suljeKelluvat(ui) {
  // Pöllö ensin: kuplapino ja chatti (omistajan kuvakaappaus 4.9.2026,
  // kuplapino keskellä keksintölinssin ajoa). Kuplien tekstit jäävät
  // chatin virtaan, joten mitään ei menetetä.
  polloLinssiAlkoi();
  polloKuplatPois();
  suljeFokuskohde(ui);
  suljeNostonKortti(ui);
  suljeElaintaky(ui);
  suljeSyvennys(ui);
}

/**
 * Käynnistää linssin aikajanan kartan päälle. Edellinen aikajana
 * puretaan ensin: kartalla on kerrallaan yksi kello.
 *
 * @returns {boolean} lähtikö ajo
 */
export function kaynnistaAikajana(ui, linssi) {
  if (typeof document === 'undefined' || !ui || !linssi?.aikajana) return false;
  pysaytaAikajana(ui);
  const ajo = new Aikajana(ui, linssi);
  if (!ajo.kaynnista()) return false;
  ui.aikajana = ajo;
  // Vasta kun ajo on pystyssä: bodyn luokka on paikallaan, joten
  // portti pitää eivätkä juuri suljetut kortit avaudu takaisin.
  suljeKelluvat(ui);
  return true;
}

export function pysaytaAikajana(ui) {
  if (!ui?.aikajana) return false;
  // Purku poistaa bodyn luokan ja päästää lykätyt puheenvuorot ulos
  // (pura → polloLinssiPaattyi).
  ui.aikajana.pura();
  ui.aikajana = null;
  return true;
}

export function aikajanaPaalla(ui) {
  return Boolean(ui?.aikajana?.juuri?.isConnected);
}
