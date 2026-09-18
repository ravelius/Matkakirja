/*
 * PALLOLAUDAN NOSTOT — karttanostot, skandaalit, historian hetket,
 * Matkakirjan ihmeet, eläintäyt ja kohtaamispiste pallolla (vaihe 3,
 * docs/moduulit/karttapallo.md luku 4.2).
 *
 * KAKSI KERROSTA RINNAKKAIN (Raamattu, KARTTANOSTOT POLTETAAN
 * LAATTOIHIN): laatoissa oleva nosto on POLTETTU ja saa vain
 * R-osuman — ei elementtiä, vain ruutupiste, johon napautus vertaa
 * (js/pallolauta/lauta.js napautaPintaan: lähin merkki 44 px:n sisällä,
 * fokusniput sääntö 9: lähin keskipiste voittaa). Polttamaton nosto on
 * ELÄVÄ ja piirtyy H-elementtinä: sama viivamerkki ja nimiö kuin
 * tasokartalla (js/fokusnosto-symbolit.js piirraNostosymKartalle) omaan
 * pieneen svg:hen, ruutuvakiona. Kumpi kumpi on, kertoo PALLON OMA
 * laattaluettelo (js/pallo.js pallonNostoOnPoltettu) — pallon sarja
 * poltetaan pyramidista eri hetkellä, joten pyramidi.json ei kelpaa.
 *
 * LADONTA ON SAMA KUIN LAATASSA JA KARTALLA. Merkkien paikat, kasaus
 * kaupungin kyljille (js/fokusniput.js), erottelu ja nimiön kylki
 * tulevat samasta tyngästä, jolla laatta poltettiin
 * (js/fokuskohteet.js maanKohdemerkit → ladoMaanTynka) — pallo ei lado
 * nostoja itse. Merkit näkyvät vasta, kun maan lehti täyttää vähintään
 * puolet näkymästä (LEHDEN_VAHIN_OSUUS), ei siirron aikana — sama
 * portti kuin kartalla.
 *
 * KATTO. Elävät H-merkit ovat CSS2D-elementtejä (karttapallo.md luku 6):
 * enintään NOSTOJEN_KATTO kerrallaan, lähimmät ruudun keskipistettä
 * ensin; ylimenevät odottavat polttoa (ne eivät ole ruudulla eivätkä
 * siksi napautettavia). Kohtaamispiste on aina ensimmäinen.
 *
 * KORTIT ANKKUROIDAAN RUUTUPISTEESTÄ: napautus antaa avaajalle merkin
 * ruutupisteen (avaaFokuskohde { ankkuri }), ja lauta siirtää auki olevaa
 * korttia levossa (asemoiFokuskohde).
 *
 * AIHEVALOT (js/karttavalot.js, karttaselite) ovat pistekerroksen
 * täpliä (P) vain ruudulla olevien merkkien alla; laskurit kertovat
 * selitteelle kappaleet samasta joukosta.
 */

import {
  KOVAN_ESTEEN_PAINO,
  VIUHKAN_ALAS_ALKU_PX, VIUHKAN_REUNAVARA_PX, VIUHKAN_SADE_PX,
  aiheenNimi, aihemerkinLaatikko, aihemerkkiElementti, aihenostonNimio, alasMahtuvatRivit,
  asetteleAihemerkki, keskitettyMahtuvatRivit, kohdanLaatikko, piirraViuhka, ryhmitaNostot,
  viuhkanAsemat, viuhkanNimioLeveys,
} from './aihemerkit.js';
import {
  kelattuLiuska, kelauksenAskel, liuskanRivit, liuskanSuurinRivimaara, nostonOmaPaikka,
  onKaupunginSisainen,
} from './kaupunkiliuska.js';
import { FOKUS_POHJAT } from '../packs/fokus-grc.js';
import { MAASTOKOHTEET_ARK } from '../packs/maastokohteet-ark.js';
import { MAASTOKOHTEET_ATA } from '../packs/maastokohteet-ata.js';
import {
  LEHDEN_VAHIN_OSUUS, avaaFokuskohde, kohdekartanNostopaikat, kohdeMerkinLadonta,
  kohteidenNykyinenIso, maanKohdemerkit, maanKohdetiedot, naapurienPoltetutMerkit,
  suljeFokuskohde,
} from '../fokuskohteet.js';
import { avaaElaintaky, elaintakyLaudalla } from '../elaintaky.js';
import { avaaFokuspiste, fokuspisteKuvio, fokuspisteenAsteet } from '../fokuspiste.js';
import { fokusvirtaAarrepisteOhje, fokusvirtaKohtaamispiste } from '../fokusvirta.js';
import {
  NOSTOSYM_MINI_RUUTU, NOSTOSYM_MITAN_KATTO, NOSTOSYM_NIMIO_KATTO_PX, NOSTOSYM_NIMIO_KOKO,
  nostosymAsetaPorras, nostosymKatettuMitta, nostosymNimioAsemointi,
  nostosymNimioMitta, nostosymPaakategoria, nostosymVirkistaRasterit, piirraNostosymKartalle,
  piirraNostosymNimio,
} from '../fokusnosto-symbolit.js';
import { KARTTANIMI_KOOT } from '../karttanimet.js';
import { karttavaloVari, karttavalotLue } from '../karttavalot.js';
import { nostoladontaTiiviste } from '../nostoladonta.js';
import {
  luoAnkkurivarasto, levitaMerkit, nostoankkuritSallittu, pikseleistaAsteiksi, yksiKokoSallittu,
} from './nostoankkurit.js';
import { pallonNostoOnPoltettu } from '../pallo.js';
import { PALLOLAUDAN_LEVEYS } from './kamera.js';
import { nimenKarttakerroin } from './nimet.js';
import { sovitteleLaput } from './sovittelu.js';

/** Eläviä nostoja pallolla enintään kerrallaan (karttapallo.md luku 6). */
export const NOSTOJEN_KATTO = 40;
/*
 * MAASTOKOHDE EI SULAUDU AIHEMERKKIIN (omistaja 16.9.2026, jatkoa
 * PAATOKSET 27 kohtaan 4 — perustelut js/pallolauta/aihemerkit.js
 * ryhmitaNostot-funktion alkukommentissa). Kenttä on jo TUNNISTETTAVA
 * datassa useimmille: `tyyppi` erottelee luonnon kohteet (vuori, meri,
 * joki, saari, järvi — sama viisikko kuin js/fokuskohteet.js
 * KOHDE_TYYPPISYMBOLIT:n 'luonto'-rivit) muusta sisällöstä, joten niitä
 * EI tarvitse merkitä erikseen. Mont-Saint-Michel ja Millaun silta ovat
 * poikkeus: niiden tyyppi on kulttuuri/tekniikka (js/packs/
 * maastokohteet-fra.js), koska ne ovat sisällöltään historiaa eivätkä
 * maastoa — mutta omistajan silmissä ne ovat silti "maan laajoja
 * yksittäisiä nostoja" siinä missä vuori tai saari. Näille datassa on
 * pienin mahdollinen merkintä, `maasto: true` (dokumentoitu
 * docs/moduulit/maalehti.md:ssä).
 */
const MAASTOTYYPIT = new Set(['vuori', 'meri', 'joki', 'saari', 'jarvi']);
/** Onko kohde MAASTOKOHDE, joka ei koskaan sulaudu aihemerkkiin. */
function onMaastokohde(kohde) {
  return Boolean(kohde) && (MAASTOTYYPIT.has(kohde.tyyppi) || kohde.maasto === true);
}
/**
 * AIHEMERKKIEN VASTAKOE YHDELLÄ LIPULLA: `?aihemerkit=0` sammuttaa
 * ryhmityksen, jolloin kartta latoo nostot kuten ennen PAATOKSET
 * 27:ää. Savuke mittaa molemmat samalla ajolla ja näkee, mitä ryhmitys
 * oikeasti maksaa ja tuottaa — sama tapa kuin `?vektorit=0`.
 */
export function ryhmitysSallittu() {
  try {
    const arvo = new URLSearchParams(globalThis.location?.search ?? '').get('aihemerkit');
    return !/^(0|ei|off)$/.test(arvo ?? '');
  } catch { return true; }
}
/**
 * KAUPUNGIN AINA-YHDISTYKSEN VASTAKOE: `?aihekaupunki=0` jättää
 * kaupunkijäsenyyden (PAATOKSET 27 TARKENNUS 2 kohta 7) huomiotta,
 * jolloin ryhmitys putoaa takaisin pelkkään limitykseen ja sormen
 * säteeseen. Lippu luetaan JOKA LADONNASSA osoitteesta, joten savuke
 * voi kääntää sen päälle ja pois ilman uutta sivunlatausta
 * (history.replaceState + uusi ladonta) — sama tapa kuin
 * `?aihemerkit=0`, mutta yhtä sääntöä tarkempi.
 */
export function kaupunkiYhdistysSallittu() {
  try {
    const arvo = new URLSearchParams(globalThis.location?.search ?? '').get('aihekaupunki');
    return !/^(0|ei|off)$/.test(arvo ?? '');
  } catch { return true; }
}
/*
 * ══ ETELÄMANNER: NOSTO ASTEINA, EI LAUDAN PISTEENÄ ════════════════
 *
 * OMISTAJA 11.9.2026, sanatarkasti: *"Etelä-Mantereelle tehdään myös
 * omia nostoja, koska se on mielenkiintoinen tutkimuspaikka."*
 *
 * Kaikki muut merkit tällä kerroksella tulevat LAUDAN pisteestä ja
 * kääntyvät asteiksi `asteet(kohta)`-funktiolla. Etelämantereella
 * lautapistettä ei ole eikä voi olla: pelin juliste on Millerin
 * lieriöprojektiota ja loppuu 61,47° S:ään, joten etelänapa
 * projisoituisi riville 7611, kun laudan korkeus on 5399. Piste jäisi
 * laudan ULKOPUOLELLE — ei epätarkasti vaan kokonaan.
 *
 * PALLOLLA ALUE ON OLEMASSA: napakalotit (js/pallo.js NAPAKALOTIT)
 * piirtävät 60°–90° S omana karttanaan. Siksi nostodata saa antaa
 * paikan SUORAAN asteina (`asteet: { lat, lon }`,
 * js/packs/maastokohteet-ata.js), ja tämä kerros lukee sen
 * sellaisenaan. Muuta se ei vaadi: merkki, napautus ja tietokortti
 * ovat samat rivit kuin muillakin nostoilla, koska kerros käsittelee
 * kaikkia merkkejä lat/lng-pareina tästä eteenpäin.
 *
 * TASOKARTALLA MERKKIÄ EI OLE, eikä se ole poikkeus: js/fokuskohteet.js
 * kohdeKarttarivit ottaa mukaan vain rivit, joilla on äärellinen
 * `laudat[lauta]`-piste, joten `asteet`-nosto putoaa samasta seulasta
 * kuin kartan ulkopuolelle jäävät hetket aina. Ei riviä, ei merkkiä,
 * ei rikkinäistä kohtaa.
 */
/*
 * ══ NAPA-ALUEEN PORTTI MITATAAN KORKEUDESTA, EI LEVEYDESTÄ ════════
 *
 * OMISTAJAN VIKAILMOITUS 12.9.2026 (kuvakaappaus, iPhone pystyssä,
 * pelaaja Alice Springsissä, pallo lähes koko maailman mitassa):
 * *"Tässä zoom tasossa kaupunkien pallot ei pitäisi enää edes näkyä.
 * Jotain hajosi viimeisissä päivityksissä"* — kuvassa näkyivät myös
 * arktiset nostot nimiöineen ("Saamelaiset", "Kuolan syväreikä").
 *
 * MIKSI PORTTI EI PITÄNYT. Portti luki näkymän LEVEYDEN asteina
 * (`nakyva.w`) ja päästi läpi, kun se oli enintään 90°. Kameran
 * pystykulma on kiinteä (fov 50°), joten näkymän KORKEUS asteina
 * riippuu vain kameran korkeudesta — mutta LEVEYS riippuu myös ruudun
 * kuvasuhteesta. Mitattu Chromiumilla 12.9.2026, sama kamerakorkeus
 * 1,0 (koko pallo ruudulla):
 *
 *     390 × 844 (puhelin pystyssä)   leveys 25,8°   korkeus 53,4°
 *     1440 × 900 (työpöytä)          leveys 92,4°   korkeus 53,4°
 *
 * Puhelimen pystyruudulla leveys ei yllä 90 asteeseen MILLÄÄN
 * zoomilla (uloimmallakin korkeudella 2,5 se on 64,5°), joten portti
 * oli puhelimessa aina auki ja työpöydällä kiinni — sama peli, eri
 * kartta. Korkeus on sama molemmissa, koska se on kameran oma mitta.
 *
 * MIKÄ SÄÄNTÖ NYT. Sama ajatus kuin muilla nostoilla: ALUE TÄYTTÄÄ
 * NÄKYMÄN (vrt. LEHDEN_VAHIN_OSUUS). Napa-alueen nostot kattavat
 * leveysastekaistan 60°–90° eli NAPA_ALUEEN_ASTEET astetta, ja portti
 * aukeaa, kun kaista täyttää vähintään ALUEEN_VAHIN_OSUUS näkymän
 * korkeudesta — eli kun näkymän korkeus on enintään
 * NAPA_ALUEEN_ASTEET / ALUEEN_VAHIN_OSUUS astetta.
 *
 * MIKSI OSUUS ON TIUKEMPI KUIN LEHDELLÄ (0,75 eikä 0,5): maan lehti on
 * LAATIKKO keskellä ruutua, napa-alue on YMPYRÄ ruudun laidalla.
 * Puolikkaan säännöllä (näkymän korkeus 60°) merkit olisivat vielä
 * mukana koko pallon yleiskuvassa, joka on mitattuna 53,4° — juuri se
 * näkymä, jota omistajan kuva koskee. Mitatut näkymän korkeudet
 * (Chromium 12.9.2026, sama molemmilla ruuduilla): kamerakorkeus 0,2 →
 * 10,7°, 0,37 (saapumisnäkymä) → 19,8°, 0,6 → 32,1°, 1,0 (koko pallo)
 * → 53,4°. Raja 40° päästää läpi alue- ja saapumisnäkymät ja sulkee
 * jokaisen yleiskuvan.
 */
/** Napa-alueen nostojen kattama leveysastekaista (60°–90°). */
export const NAPA_ALUEEN_ASTEET = 30;
/** Kuinka suuren osan näkymän korkeudesta alueen on täytettävä. */
export const ALUEEN_VAHIN_OSUUS = 0.75;
/**
 * Etelämantereen nostot näkyvät samalla portilla kuin muut nostot:
 * vasta kun alue täyttää näkymän, eli kun näkymän KORKEUS on enintään
 * tämän verran asteita. Yleiskuvassa kuusi merkkiä navalla olisi
 * rykelmä eikä kartta.
 */
export const ETELAMANNER_NAKYY_ASTETTA = NAPA_ALUEEN_ASTEET / ALUEEN_VAHIN_OSUUS;
/*
 * ══ POHJOISNAPA JA ARKTINEN ALUE: SAMA KAAVA ══════════════════════
 *
 * OMISTAJA 11.9.2026, sanatarkasti: *"tehdään sinne myös nostoja,
 * varsinkin historialliset ja oikeastaan kaikki mahdolliset nostot,
 * mitä sinne vain voi keksiä."*
 *
 * Pohjoisessa lauta loppuu 76,0° N:ään (js/fokusmitat.js
 * laudaltaAsteiksi rivillä y = 0), eli napa, Huippuvuoret, Frans
 * Josefin maa, Ellesmere ja jäädriftit ovat laudan ULKOPUOLELLA.
 * Napakalotti (js/pallo.js NAPAKALOTIT) kattaa 80°–90° N ja sen alla
 * ovat tavalliset laatat, joten pallolla koko alue on olemassa.
 * Nostodata (js/packs/maastokohteet-ark.js) antaa paikan samalla
 * `asteet`-kentällä kuin Etelämanner, ja tämä kerros lukee sen samalla
 * funktiolla (napanostonRivi). Perustelut kokonaisuudessaan ovat
 * paketin omassa alkukommentissa.
 */
/** Arktisen alueen nostot näkyvät samalla portilla kuin Etelämanner. */
export const ARKTIS_NAKYY_ASTETTA = ETELAMANNER_NAKYY_ASTETTA;
/**
 * Näkymän KORKEUS asteina (ks. NAPA-ALUEEN PORTTI MITATAAN
 * KORKEUDESTA). Tuntematon näkymä on yleiskuva, eli portti on kiinni.
 */
export function nakymanKorkeusAsteina(nakyva) {
  return nakyva?.h > 0 ? (nakyva.h * 360) / PALLOLAUDAN_LEVEYS : Infinity;
}
/**
 * Näkyykö alueen merkkikerros tällä näkymällä: näkymän korkeus enintään
 * `raja` astetta (ks. NAPA-ALUEEN PORTTI MITATAAN KORKEUDESTA).
 */
export function alueenMerkitNakyvat(nakyva, raja) {
  return nakymanKorkeusAsteina(nakyva) <= raja;
}
/*
 * ══ ELÄINTÄKY: SAMA ASIA, OMA LUKU PALLOLLE ═══════════════════════
 *
 * Eläintäkymerkkien sääntö on kirjattu js/elaintaky.js:n alkuun
 * ("MERKKI EI TÄYTÄ YLEISKUVAA"): merkit näkyvät vasta kun MAANOSA
 * täyttää ruudun, koska yleiskuvassa 53 merkkiä olisi ryteikkö eikä
 * kartta. Tasokartalla se on mitattu pituusasteina (29.8.2026, 1100 px
 * leveä ruutu: yleiskuva 349° piilossa, neljä porrasta 70° näkyvissä,
 * Euroopan lauta 80° näkyvissä) ja raja on ELAINTAKY_NAKYY_ASTETTA 90.
 *
 * MIKSI SAMA ASIA MITATAAN PALLOLLA ERI LUVULLA. Tasokartta on litteä
 * kuva, jota katsotaan suoraan ylhäältä: ruudun leveys ja korkeus
 * mittaavat samaa mittakaavaa, joten kumpi tahansa kelpaa, ja
 * js/elaintaky.js:n leveysmittaus on siellä oikein. Pallolla kamera on
 * perspektiivinen ja sen PYSTYKULMA on kiinteä (fov 50°): näkymän
 * korkeus asteina riippuu vain kameran korkeudesta, mutta LEVEYS
 * riippuu myös ruudun kuvasuhteesta. Mitattu 12.9.2026 samalla
 * kameran korkeudella 1,0 (koko pallo ruudulla): 390 × 844 leveys
 * 25,8° / korkeus 53,4°, ja 1440 × 900 leveys 92,4° / korkeus 53,4°.
 * Luku 90 ei siis tarkoita pallolla sitä, mitä se tarkoittaa
 * tasokartalla — puhelimen pystyruudulla leveys ei yllä siihen
 * millään zoomilla (uloimmallakin 64,5°), joten portti oli aina auki
 * ja Saint Helenan tikkuri näkyi maailmanyleiskuvassa asti.
 *
 * MISTÄ PALLON LUKU TULEE. Sama johto kuin napa-alueella, samalla
 * osuudella (ALUEEN_VAHIN_OSUUS): maanosan on täytettävä näkymän
 * korkeudesta vähintään kolme neljäsosaa. Maanosan korkeus luetaan
 * PELIN OMASTA aineistosta (pack.map.cityManner, maanosan kaupunkien
 * leveysastelaatikko) eikä arvata; mitattu 12.9.2026
 * maailmankartta-paketista:
 *
 *     europe 34,4°   asia 68,2°   africa 70,8°   southamerica 66,4°
 *     northamerica 52,4°   oceania 41,4°   middleeast 28,2°
 *
 * Mitta on EUROOPAN 34°, koska Eurooppa on eläintäkyjen tihein
 * maanosa ja juuri se maanosa, jolla tasokartan raja 29.8.2026
 * mitattiin — ja koska tiheimmän maanosan ryteikkö on se, jota sääntö
 * estää. Mitattu pallolla (390 × 844, kamera Euroopan keskellä):
 * Eurooppa täyttää ruudun korkeuden (1,02) näkymän korkeudella 32,1°
 * ja vielä 0,83 korkeudella 40,1°; koko pallon yleiskuvassa (53,4°)
 * enää 0,53. Raja 34 / 0,75 = 45,3° päästää siis läpi maanosanäkymän
 * ja sulkee yleiskuvan.
 *
 * LEVEYTTÄ EI VOI KÄYTTÄÄ PALLOLLA LAINKAAN: Eurooppa on 59,5°
 * pituusasteita leveä eikä mahdu puhelimen pystyruudulle vaakasuunnassa
 * millään pelattavalla zoomilla (mitattu: mahtuu vasta korkeudella
 * 2,5, jolloin koko maapallo on peukalonkynnen kokoinen).
 */
/** Maanosan korkeus leveysasteina — Eurooppa, mitattu (ks. yllä). */
export const ELAINTAKY_MAANOSAN_ASTEET = 34;
/** Eläintäkymerkit pallolla: näkymän korkeuden yläraja asteina. */
export const ELAINTAKY_NAKYY_KORKEUS = ELAINTAKY_MAANOSAN_ASTEET / ALUEEN_VAHIN_OSUUS;
/**
 * Merkin mitta ruudulla: kirjaston yksikkö → px niin, että nimiö on
 * kartan kohdenimiön kokoinen (js/karttanimet.js KOKO.kohde 8,5 px,
 * joka on myös poltetun nimiön katto) — sama koko kuin laatassa 1:1.
 */
export const NOSTON_MITTA = KARTTANIMI_KOOT.kohde / NOSTOSYM_NIMIO_KOKO;
/**
 * KOHDEMERKIN HALKAISIJA RUUDULLA (px) — se mitta, jota vasten
 * kohdekaupungin piste mitoitetaan (js/pallolauta/lauta.js
 * KOHDEKAUPUNGIN_PISTE_SUHDE).
 *
 * Merkin oma ruutu on NOSTOSYM_MINI_RUUTU kirjaston yksikköä säteenä
 * (js/fokusnosto-symbolit.js: piirroksen laatikko, hitunen musteen
 * ympärillä), ja NOSTON_MITTA vie sen ruudun pikseleiksi. Sama luku
 * mittaa nostojen laatikot (nostonLaatikko) — yksi mitta, ei kopiota.
 */
export const KOHDEMERKIN_RUUTU_PX = 2 * NOSTOSYM_MINI_RUUTU * NOSTON_MITTA;
/*
 * ══ KAUPUNKIMERKIN NIMIÖ ON ISOMPI KUIN NOSTON (omistaja 15.9.2026
 * klo 17.20 UTC, Raamattu KARTTAUUDISTUKSEN PAATOKSET 25 kohta 2:
 * *"Isommaksi, n. 11-12 px"*) ═════════════════════════════════════
 *
 * MIKSI: lisäkaupungit (js/packs/nakyvat-kaupungit-fra.js) OVAT
 * kartalla jo saapumisnäkymässä, mutta niiden nimiö on kohdenimiön
 * mitta 8,5 px (KARTTANIMI_KOOT.kohde, PAATOKSET 14) — Ranskan
 * kokoisella rajauksella hädin tuskin erottuva, ja juuri siksi
 * omistaja kysyi *"eika toisia kaupunkeja?"* vaikka ne olivat
 * ruudulla. Kaupunki on kartan hierarkiassa nimi muiden yläpuolella,
 * joten se saa oman mittansa: 11,5 px on tilatun välin 11–12
 * keskellä ja samalla kartan oma vuori-nimiön koko
 * (KARTTANIMI_KOOT.vuori 11), eli luku ei ole uusi tyyli vaan
 * olemassa oleva porras.
 *
 * SYMBOLI KASVAA MUKANA, EIKÄ SITÄ VOI ESTÄÄ: nimiö ja viivamerkki
 * ovat SAMASSA RASTERISSA (js/fokusnosto-symbolit.js
 * piirraNostosymKartalle), joten kerroin on merkin mitta eikä
 * pelkkä kirjasinkoko — sama sääntö kuin KARTTANOSTON KYLTTI ON
 * KARTAN MITTA -osiossa. Kaupungin piste kasvaa siis 1,35-kertaiseksi,
 * mikä on kartografisesti oikein päin (kaupunki > maastokohde).
 *
 * VAIN ELÄVÄ MERKKI. Poltettua mustetta ei voi suurentaa jälkikäteen
 * (sama syy kuin POLTETTUA MUSTETTA EI VOI PIILOTTAA alempana): jos
 * kaupungin merkki on laatassa, se on siellä 8,5 px:n nimiöllä, ja
 * kerroin vain irrottaisi osumapinnan musteesta. Kerroin koskee siksi
 * vain polttamattomia kaupunkimerkkejä; poltetut korjaantuvat, kun
 * nostotaso poltetaan uudelleen (R2-ajo).
 *
 * YKSI MITTA, EI KOPIOTA. Sama kerroin menee piirtoon
 * (`asetteleNosto` datumin `mitta`) ja laatikkoon (`nostonLaatikko`),
 * jotta ladonta, väistö ja osumapinta mittaavat sitä, mikä ruudulla
 * on — muuten isompi kaupunki söisi naapurinsa nimen.
 */
/** Lisäkaupungin nimiön koko saapumiszoomilla (px, PAATOKSET 25). */
export const KAUPUNKIMERKIN_NIMIO_PX = 11.5;
/** Kaupunkimerkin mittakerroin noston mittaan nähden (8,5 px → 11,5 px). */
export const KAUPUNKIMERKIN_KERROIN = KAUPUNKIMERKIN_NIMIO_PX / KARTTANIMI_KOOT.kohde;

/**
 * Merkin oma mittakerroin: kaupunki on isompi kuin nosto (ks. yllä).
 *
 * @param {?object} d  merkin rivi tai datum (`kaupunki`, `poltettu`)
 */
export function merkinKerroin(d) {
  return d?.kaupunki && !d?.poltettu ? KAUPUNKIMERKIN_KERROIN : 1;
}

/*
 * ══════════════════════════════════════════════════════════════════
 * KARTTANOSTON KYLTTI ON KARTAN MITTA (omistajan päätös 14.9.2026
 * klo 15.05 UTC, Raamattu KARTTAUUDISTUKSEN PAATOKSET 14 kohta 1:
 * *"Nimikyltit karttaan"*)
 * ══════════════════════════════════════════════════════════════════
 *
 * `NOSTON_MITTA` on RUUTUVAKIO: nimiö oli 8,5 px joka zoomilla, joten
 * merkki liukui kartan päällä, kun kartta kasvoi allansa. Kerroin on
 * täsmälleen sama funktio kuin kaupunkien nimikylteillä
 * (js/pallolauta/nimet.js `nimenKarttakerroin`, vertailuna KUNKIN
 * LAITTEEN oma saapumisnäkymä) — yksi sääntö, ei kopiota.
 *
 * SYMBOLI JA NIMIÖ SKAALAUTUVAT YHDESSÄ, koska ne ovat samassa
 * rasterissa (js/fokusnosto-symbolit.js piirraNostosymKartalle): kylttiä
 * ei voi skaalata erikseen koskematta piirtoon. Sama kerroin menee
 * siksi sekä piirtoon (`asetteleNosto`) että laatikkoon
 * (`nostonLaatikko`), jotta ladonta, väistö ja osumapinta mittaavat
 * juuri sen, mikä ruudulla on. OSUMASÄÄNTÖIHIN EI KOSKETA — vain
 * mitta, jolla laatikko lasketaan, seuraa nyt karttaa.
 *
 * Kerroin on kerroksen tilaa eikä datumin kenttä, koska se on sama
 * kaikille merkeille ja luetaan piirrossa: `paivita` asettaa sen
 * ladonnan alussa (lauta antaa kameran mittakaavan), ja oletus 1 on
 * entinen ruutuvakio.
 */
let nostonKarttakerroin = 1;
/*
 * ══════════════════════════════════════════════════════════════════
 * NIMIÖLLÄ ON RUUTUPIKSELIKATTO (omistaja 16.9.2026 klo 16.05 UTC,
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 31 kohta 2, iPhone-kuva
 * Pariisin lähizoomista: nimiöt *"jattimaisia ja sumeita"*)
 * ══════════════════════════════════════════════════════════════════
 *
 * MITATTU VIKA (Chromium 390 × 844 dpr 2, Ranska-tallenne, pelaaja
 * Pariisissa, 16.9.2026). Nimiö on PAATOKSET 14:stä lähtien KARTAN
 * mitta: kerroin = kameran mittakaava / saapumisnäkymän mittakaava, ja
 * koska se kasvaa rajatta sisäänpäin zoomatessa, nimiön RUUTUKOKO
 * kasvaa samassa suhteessa:
 *
 *   uloinOsuus            kerroin   noston nimiö   kaupunkimerkin
 *   1,000 (saapuminen)      1,00      8,5 px         11,5 px
 *   0,700                   1,43     12,1 px         16,4 px
 *   0,500                   2,00     17,0 px         23,0 px
 *   0,341 (SISIN MAHDOLLINEN) 2,94    25,0 px         33,8 px
 *
 * Uloszoomauksen esto pitää pohjan kohdassa 0,341 (mitattu
 * `pointOfView().altitude` 0,0698 ja `maanZoomiraja().max`), joten
 * 25 px / 33,8 px EI ole reunatapaus vaan se, mitä pelaaja näkee, kun
 * hän zoomaa Pariisiin niin lähelle kuin peli sallii. Kolme nimiötä
 * (*Mona Lisan varkaus* 205 px, *Kaulanauhajuttu* 207 px, *Torni
 * romuraudaksi* 239 px) on silloin leveämpi kuin puolet 373 px:n
 * kotelosta: ne leikkautuvat ruudun laidoista ja peittävät toisensa —
 * juuri se, minkä omistaja näki.
 *
 * KATTO ON MERKIN OMASSA MITASSA, EI KERTOIMESSA. Sama kerroin ajaa
 * sekä nostoa (perusnimiö 8,5 px) että kaupunkimerkkiä (11,5 px,
 * KAUPUNKIMERKIN_KERROIN), joten yksi kerroinkatto antaisi niille eri
 * lopputuloksen. Katto asetetaan siksi siihen lukuun, joka ruudulla
 * oikeasti mitataan: nimiön kirjasinkoko on
 * `mitta × NOSTOSYM_NIMIO_KOKO`, joten mitta katkaistaan kohtaan
 * NOSTON_NIMIO_KATTO_PX / NOSTOSYM_NIMIO_KOKO. Molemmat pysähtyvät
 * silloin TÄSMÄLLEEN 16 px:iin, kumpikin omalla zoomillaan
 * (nosto 0,53 · uloimmasta, kaupunkimerkki 0,72 ·).
 *
 * SYMBOLI PYSÄHTYY NIMIÖN MUKANA, koska ne ovat samassa rasterissa
 * (ks. SYMBOLI JA NIMIÖ SKAALAUTUVAT YHDESSÄ yllä): kylttiä ei voi
 * kattaa koskematta piirtoon. Se on myös oikein — merkki on kartan
 * merkki eikä kartan alue.
 *
 * KAUPUNKIEN NIMIKYLTTEIHIN (js/pallolauta/nimet.js `.pallolauta-nimi`)
 * EI KOSKETA: ne ovat PAATOKSET 14:n mukaan samaa mittaa kuin
 * maapaneelin leipäteksti, ja katto irrottaisi ne siitä. Omistajan
 * kuvassa jättimäiset nimiöt ovat kaikki NOSTOJEN nimiöitä (Mona
 * Lisan varkaus, Paras patonki, Metron.), ja PAATOKSET 25 kohta 3
 * sallii nimenomaan nostojen nimiön jäädä kaupunkien alle.
 *
 * KATON LUKU on omistajan mitta PAATOKSET 31:stä (*"ei kasva yli n.
 * 16 px ruudulla"*): kaksinkertainen saapumisnäkymän 8,5 px:ään ja
 * hitusen yli kaupunkimerkin 11,5 px:n, eli lähikuvassa teksti on
 * selvästi isompi mutta mahtuu yhä puhelimen ruudulle (leveimmät
 * nimiöt 131–153 px 373 px:n kotelossa, mitattu).
 *
 * KATTO PURKAA MYÖS RYHMITYKSEN UMPIKUJAN. Ilman kattoa nimiö kasvoi
 * samassa suhteessa kuin merkkien väli, eikä limitys voinut koskaan
 * purkautua zoomaamalla (se oli syy aihemerkkien zoomiporttiin,
 * js/pallolauta/aihemerkit.js). Katon yläpuolella nimiö seisoo ja
 * merkkien väli kasvaa, joten limitys purkautuu itsestään — ja
 * ryhmitys voi vihdoin noudattaa PAATOKSET 27 kohtaa 3 sellaisenaan.
 */
/*
 * KATTO ON YHTEINEN, EI TÄMÄN KERROKSEN OMA (PAATOKSET 31 TARKENNUS 1
 * kohta 3, 16.9.2026). Luku ja katkofunktio asuvat siellä, missä nimiön
 * kirjasinkokokin (js/fokusnosto-symbolit.js NOSTOSYM_NIMIO_KATTO_PX),
 * jotta turisti-infon kyltti (js/kaupunkinosto.js) saa TÄSMÄLLEEN saman
 * katon tuomalla sen. Nämä kaksi nimeä jäävät tähän kerroksen omalla
 * sanastollaan — savukkeet ja aihemerkit lukevat niitä — mutta ne ovat
 * nyt saman luvun kaksi nimeä eivätkä kaksi lukua.
 */
/** Nimiön suurin kirjasinkoko ruudulla (px), ks. yllä. */
export const NOSTON_NIMIO_KATTO_PX = NOSTOSYM_NIMIO_KATTO_PX;
/** Merkin mitan katto: nimiö ei kasva yli NOSTON_NIMIO_KATTO_PX:n. */
export const NOSTON_MITAN_KATTO = NOSTOSYM_MITAN_KATTO;
/**
 * Noston mitta juuri nyt: ruutuvakio × kartan kerroin × merkin oma
 * kerroin, katkaistuna nimiön ruutupikselikattoon (ks. yllä).
 *
 * @param {number} [omaKerroin] merkin oma kerroin (merkinKerroin)
 */
export function nostonMitta(omaKerroin = 1) {
  return nostosymKatettuMitta(NOSTON_MITTA * nostonKarttakerroin * omaKerroin);
}

/**
 * MAAN LEHDEN OSUUS NÄKYMÄN LEVEYDESTÄ — kohdemerkkien portin oma luku.
 *
 * Merkit piirretään vasta kun maan lehti täyttää vähintään puolet
 * näkymästä (LEHDEN_VAHIN_OSUUS). Sama luku kertoo myös, milloin
 * kartalla ON kohdemerkkejä, joita vasten kohdekaupunki mitataan
 * (js/pallolauta/lauta.js kohdekaupunginMitat) — siksi se lasketaan
 * yhdessä paikassa ja luovutetaan sieltä molemmille.
 *
 * @returns {number} 0, jos lehteä ei ole; muuten bbox.w / nakyva.w
 */
export function lehdenOsuus(pohja, nakyva, packId = null) {
  if (!(pohja?.bbox?.w > 0) || !(nakyva?.w > 0)) return 0;
  if (packId && pohja.lauta && pohja.lauta !== packId) return 0;
  return pohja.bbox.w / nakyva.w;
}
/*
 * ══ PÄÄKARTAN MERKKIRAJA JA LÄHIZOOMIPORTTI (`nosto.lahi`) ════════
 *
 * KAKSI AVOINTA ASIAA SAMASTA JUURESTA. Karttauudistuksen erä 10
 * jätti Fablelle kaksi kohtaa (docs/raportit/viesti-fable-
 * karttauudistus-era10-20260913.md 11.5 ja 11.7.5): pääkartan 21
 * merkin raja on rikki seitsemässä maassa, ja suunnitelman luvun 4.5
 * lupaama per-nosto-portti `nosto.lahi` puuttuu yhä. Ne ovat sama
 * asia: raja pitää, kun ylimääräiset merkit siirtyvät lähizoomiin.
 *
 * MITATTU LÄHTÖTILA (node tools/laske-karttanostot.mjs, origin/main
 * 14.9.2026): GRC 33, TUR 29, DEU 28, ESP 25, HRV 23, ITA 22, RUS 22 —
 * seitsemän maata yli 21:n, muut 112:sta rajan sisällä.
 *
 * MITÄ RAJA TEKI TÄHÄN ASTI: EI MITÄÄN. Luku 21 ei ollut koodissa
 * missään, vaan pelkkänä vakiona savukkeessa
 * (tools/savukkeet/savuke-kaupunkien-nostot.mjs PAAKARTAN_KATTO).
 * Peli piirsi kaikki merkit — ei hiljaista pudotusta, ei virhettä
 * pelaajalle. Ainoat oikeasti pudottavat katot ovat muualla ja eri
 * asiaa varten: kaupunkiruuhkan katto 3 merkkiä 8 yksikön säteellä
 * (js/fokuskohteet.js karsiKaupunkiruuhka) ja CSS2D-elementtien katto
 * NOSTOJEN_KATTO 40 kappaletta (yllä). Tämä portti on siis ensimmäinen
 * kerta, kun 21 on sääntö eikä toive.
 *
 * SÄÄNTÖ (Fable 14.9.2026): RAJA EI NOUSE HILJAA. Uloimmalla zoomilla
 * piirtyy enintään PAAKARTAN_MERKKIKATTO tärkeintä merkkiä; loput
 * tulevat näkyviin zoomatessa. Mitään ei poisteta.
 *
 * TÄRKEYSJÄRJESTYS. Datassa ei ole yleistä tärkeyskenttää — ainoa
 * olemassa oleva järjestys (js/fokuskohteet.js nostonPrioriteetti) on
 * kaupunkiruuhkan oma eikä sovi tähän, koska se pudottaisi kaupungit
 * ja maastokohteet ENNEN nostokortteja. Fablen antama järjestys on
 * siksi: kaupunkimerkit ensin, sitten aarteet (Matkakirjan ihmeet),
 * sitten kaikki muu DATAN OMASSA JÄRJESTYKSESSÄ. Järjestys on vakaa
 * (tasapelin ratkaisee alkuperäinen rivinumero), joten sama data antaa
 * saman kartan joka ajolla.
 *
 * PER-NOSTO-PORTTI: `lahi: true`. Kohde, jonka datassa on `lahi: true`,
 * EI piirry uloimmalla zoomilla lainkaan — ei silloinkaan, kun maassa
 * on tilaa katon alla. Se on suunnitelman luvun 4.5 kenttä: sisältö,
 * joka kuuluu lähikuvaan eikä maan yleiskuvaan.
 *
 * MITTA ON OSUUS ULOIMMASTA ZOOMISTA — JA SE ON MITATTU VALINTA.
 * Ensimmäinen yritys käytti samaa lukua kuin koko kerroksen portti
 * (lehdenOsuus = maan lehden bbox / näkymän leveys). MITTAUS KAATOI
 * SEN: saapumisnäkymä ei ole sama osuus joka maassa, koska
 * saapumislaatikko on maan ÄÄRIVIIVOJEN laatikko (+ maapaneeli) ja
 * lehden bbox on fokuspohjan ikkuna. Chromium 390 × 844, `saavu()`
 * ajettuna, osuus saapumisnäkymässä ja yksi porras sisäänpäin:
 *
 *     TUR  1,31 → 2,62      ESP  1,91 → 3,83      DEU  1,94 → 3,89
 *     GRC  1,93 → 3,85      FRA  2,14 → 4,27      ITA  3,00 → 5,99
 *     RUS  31,27 → 62,53   (Venäjän saapumislaatikko on yksi rengas)
 *
 * Turkin PORRAS SISÄÄNPÄIN (2,62) on pienempi kuin Italian
 * SAAPUMISNÄKYMÄ (3,00), joten yksikään kiinteä osuusluku ei voi olla
 * yhtä aikaa kiinni saavuttaessa ja auki portaan päässä. Mitta on siksi
 * se, mikä portti oikeasti tarkoittaa: PALJONKO NÄKYMÄ ON ULOIMMASTA
 * SALLITUSTA. Uloszoomaus on lukittu maan laatikkoon
 * (js/pallolauta/kamera.js ULOSZOOMAUKSEN_KERROIN, js/pallolauta/lauta.js
 * maanZoomiraja), ja lauta antaa tälle kerrokselle valmiiksi lasketun
 * osuuden `uloinOsuus` = kameran korkeus / uloin sallittu korkeus.
 * Kerros ei siis arvaa rajaa eikä pidä siitä omaa muistia — ensimmäinen
 * yritys teki niin ("levein tällä maalla nähty näkymä") ja MITTAUS
 * KAATOI SENKIN: sivun latauksessa kamera ehtii olla laatikkoa
 * leveämmällä ennen kuin raja on asetettu, jolloin muisti venyi
 * (Espanja: uloin muistiin 746,2 kun saapumisnäkymä on 499,7) ja portti
 * oli auki jo saavuttaessa.
 *
 * Korkeuden osuus on sama luku kuin leveyden osuus: näkyvä leveys on
 * tällä korkeusvälillä suoraan verrannollinen korkeuteen (mitattu
 * Ranskassa: korkeus 0,6268 → leveys 538,8 ja korkeus 0,3134 → 269,4).
 *
 * ILMAN RAJAA PORTTI ON KIINNI. Jos maan laatikkoa ei ole (aineisto ei
 * vielä ladattu, tai kehittäjätilan maailmanappi vapauttaa zoomin),
 * `uloinOsuus` on 0 ja katto on voimassa — mieluummin katto turhaan
 * kuin ohi vahingossa.
 *
 * Yksi zoomiporras puolittaa näkyvän leveyden (js/pallolauta/kamera.js
 * PALLOLAUDAN_SIIRTOLEVEYS: *"puolet saapumisleveydestä eli yksi
 * lähennys saapumisnäkymästä"*), joten kynnys 0,7 on saapumisnäkymän
 * (1,0) ja yhden portaan (0,5) geometrisessa keskivälissä: kumpikaan
 * pää ei ole rajatapaus, eikä luku riipu maasta.
 *
 * POLTETTUA MUSTETTA EI VOI PIILOTTAA. Pallon merkeistä valtaosa on
 * poltettu laattoihin (mitattu 14.9.2026 nostotasosta
 * 2026-09-07a-nostot-f: GRC 32/33, TUR 27/29, DEU 24/28, HRV 21/23,
 * ITA 21/22, RUS 21/22 — ESP 0/25). Poltettu merkki piirtyy laatasta
 * riippumatta tästä kerroksesta, joten portti ei voi ottaa sitä pois
 * ruudulta. Se jätetään siksi NAPAUTETTAVAKSI — muuten kartalla olisi
 * mustetta ilman korttia — ja kirjataan POLTTOVELAKSI (`polttovelka`),
 * samalla tavalla kuin tingitty nimiö (js/fokuskohteet.js "TINKIMINEN
 * MUKAAN"). Velka nollautuu, kun nostotaso poltetaan uudelleen
 * (tools/tee-pallolaatat.mjs --nostot) tämän portin päätöksillä; se on
 * R2-ajo eikä kuulu tähän erään.
 */
/** Pääkartan merkkikatto maata kohti uloimmalla zoomilla. */
export const PAAKARTAN_MERKKIKATTO = 21;
/*
 * ══ KATTO EI KOSKE KOHDEMAATA (omistaja 15.9.2026 klo 17.20 UTC,
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 25 kohta 1: *"Kohdemaalle ei
 * kattoa"*) ═══════════════════════════════════════════════════════
 *
 * MIKSI: katto 21 on olemassa siksi, ettei PÄÄKARTTA ruuhkaudu — se
 * mitoitettiin 13.9.2026 maailmankuvaan, jossa jokainen maa on yksi
 * nimi muiden joukossa. Saapumisnäkymässä ruudulla on VAIN YKSI maa,
 * ja pelaaja on siinä nimenomaan katsomassa sitä maata. Kun v1894
 * kolminkertaisti Ranskan merkkimäärän (maalehden nostot + seitsemän
 * lisäkaupunkia), sama katto piilotti 62 merkistä 40 — eli kaksi
 * kolmasosaa pilotin sisällöstä jäi yhden zoomiportaan taakse, ja
 * juuri sen omistaja näki (SELVITYS: RANSKAN NOSTOT JA MUUT
 * KAUPUNGIT PUUTTUVAT).
 *
 * MITÄ MUUTTUU JA MITÄ EI. Kohdemaan merkit piirtyvät kaikki heti;
 * MUIDEN MAIDEN merkit pysyvät katon alla, eli Fablen sääntö
 * *"raja ei nouse hiljaa"* on yhä voimassa siellä, missä se
 * mitoitettiin.
 *
 * MYÖS `lahi: true` AUKEAA KOHDEMAASSA — JA SE ON MITATTU EIKÄ
 * TULKITTU. Ranskan saapumisnäkymässä kattoa nostamalla jäi piiloon
 * täsmälleen 18 merkkiä, ja jokainen niistä oli `nosto-maalehti-*`
 * eli v1894:n maalehtinostoja. Niiden `lahi`-lipun PERUSTELU on
 * kirjoitettu auki datassa (js/packs/maalehtinostot-fra.js
 * "LÄHIZOOMIPORTTI `lahi`"): *"Pääkartan 21 merkin raja — pysyy,
 * joten tämän erän uudet nostot on merkitty `lahi: true` -portin
 * taakse"*. Lippu oli siis kiertotie tälle katolle, ja kun omistaja
 * poisti katon kohdemaasta, kiertotien syy poistui samalla — muuten
 * PAATOKSET 25:n *"KAIKKI nostot ja kaupungit"* jäisi 44:ään 62:sta.
 *
 * LIPPUA EI SILTI POISTETTU DATASTA, koska se tekee kohdemaassa vielä
 * toista työtä: `lahi`-merkki ohittaa kaupunkiruuhkan kolmen merkin
 * katon (js/fokuskohteet.js karsiKaupunkiruuhka), ja ilman lippua
 * kaupungin kohdalle osuvat nostot putoaisivat kartalta kokonaan.
 * Lippu jää siksi voimaan datana; vain tämä portti päästää sen
 * kohdemaassa läpi. Muualla (laattageneraattori, savukkeet, muut
 * maat) `lahi` toimii entiseen tapaan.
 *
 * MISSÄ TÄMÄ NÄKYY. Pelin oma kerros (keraa alempana) kerää merkit
 * VAIN kohdemaasta (kohteidenNykyinenIso; katselutilassa ei
 * lainkaan), joten se antaa lipun aina. Laattageneraattori ja
 * savukkeet kysyvät samaa porttia ilman lippua ja saavat katon
 * entisellään — siksi lippu on parametri eikä vakion muutos.
 */
/*
 * ══ VAIN KOHDEMAAN NOSTOT ═════════════════════════════════════════
 *
 * OMISTAJA 14.9.2026, sanatarkasti (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 12): *"pystyyko muiden maiden karttanostoja piilottamaan
 * helposti?"* — Fablen päätös: kyllä, ja oletuksena piilossa; fokus
 * pysyy kohdemaassa. Lippu on yksi vakio, jonka voi kääntää takaisin.
 *
 * MITÄ LIPPU KOSKEE. Vain NAAPURIMAIDEN nostomerkkejä
 * (js/fokuskohteet.js naapurienPoltetutMerkit), jotka tämä kerros
 * lisää osumalistaan oman maan merkkien rinnalle. Kaupunkimerkit,
 * aarre, reitit, kohtaamispiste ja eläintäyt ovat omia kerroksiaan
 * eivätkä kuulu tähän.
 *
 * MITÄ LIPPU EI VOI TEHDÄ — MITATTU, EI ARVATTU. Naapurin nostomerkki
 * on POLTETTU laattaan (Raamattu, KARTTANOSTOT POLTETAAN LAATTOIHIN):
 * muste piirtyy laatasta eikä tästä kerroksesta, joten lippu ei ota
 * sitä ruudulta pois — se ottaa pois vain SEN NAPAUTETTAVUUDEN.
 * Mitattu Chromiumilla 14.9.2026 (Ranskan saapumisnäkymä, 390 × 844):
 * ruudulla oli 114 napautettavaa merkkiä, joista Ranskan omia 20,
 * naapurimaiden poltettuja 78 ja eläintäkyjä 16 — ja ELÄVIÄ
 * H-merkkejä koko ruudulla vain 7 (Ranskan omat polttamattomat).
 * Naapurien 78 merkistä yksikään ei siis ollut elävä: lipun jälkeen
 * ruudun MUSTE on sama, mutta napautus ei enää avaa naapurin korttia.
 *
 * TÄMÄ ON TIETOINEN MYÖNNYTYS JA SE MAKSAA. Naapurin poltettu muste
 * sai napautuksensa takaisin 2.9.2026 (omistaja, Bosnia: *"Dinara ja
 * Sveti Jure eivät ole klikattavissa"*); lippu ottaa sen uudestaan
 * pois, eli kartalle jää mustetta ilman korttia, kunnes naapurimaiden
 * nostotaso poltetaan kohdemaakohtaisesti uudelleen. Se on R2-ajo
 * (tools/tee-pallolaatat.mjs --nostot) eikä kuulu tähän erään.
 */
/**
 * Piirretäänkö pääkartan karttanostot vain kohdemaasta (omistajan
 * kysymys 14.9.2026, ks. VAIN KOHDEMAAN NOSTOT). `false` palauttaa
 * naapurimaiden poltetun musteen napautettavaksi kuten ennen.
 */
export const NAYTA_VAIN_KOHDEMAAN_NOSTOT = true;
/**
 * LÄHIZOOMIPORTIN KYNNYS — näkymän osuus uloimmasta sallitusta.
 *
 * Mitoitettu Ranskan saapumisnäkymästä (Chromium 390 × 844,
 * tools/savukkeet/savuke-merkkirajat.mjs): saapumisnäkymässä osuus on
 * 1,0 (näkyvä leveys 538,8 lautayksikköä) ja yksi zoomiporras
 * sisäänpäin 0,5 (269,4). Kynnys 0,7 on näiden geometrisessa
 * keskivälissä, joten kumpikaan pää ei ole rajatapaus eikä luku riipu
 * maasta. Ks. MITTA ON OSUUS ULOIMMASTA ZOOMISTA yllä.
 */
export const LAHIZOOMIN_OSUUS_ULOIMMASTA = 0.7;

/**
 * Merkin tärkeysluokka (pienin ensin) — ks. TÄRKEYSJÄRJESTYS yllä.
 *
 * @param {?object} kohde  merkin oma kohdeolio (KOHDE_MAAT-rivi tai nosto)
 * @returns {number} 0 kaupunki, 1 aarre (Matkakirjan ihme), 2 muut
 */
export function merkinTarkeys(kohde) {
  if (kohde?.tyyppi === 'kaupunki') return 0;
  if (kohde?.ihme) return 1;
  return 2;
}

/**
 * Onko lähizoomi auki (ks. MITTA ON OSUUS ULOIMMASTA ZOOMISTA).
 *
 * @param {number} uloinOsuus  kameran korkeus / uloin sallittu korkeus;
 *   0 tai tuntematon = portti kiinni ja katto voimassa.
 */
export function lahizoomiAuki(uloinOsuus) {
  return uloinOsuus > 0 && uloinOsuus <= LAHIZOOMIN_OSUUS_ULOIMMASTA;
}

/*
 * ══ AIHENOSTON NIMIÖ VAIN LÄHIZOOMISSA ════════════════════════════
 *
 * OMISTAJA 17.9.2026 klo 04.15 UTC (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 27 TARKENNUS 4 kohta 10, kortti *"Nimiö vain
 * lähizoomissa"*): aihenoston NIMIÖ näkyy VAIN lähizoomissa — *"sama
 * kynnys kuin nostojen nimiöiden esiintulolla kaupunkia
 * lähestyttäessä"* — ja koko maan näkymässä aihenosto on pelkkä
 * symboli.
 *
 * KYNNYS ON SAMA FUNKTIO, EI SAMA LUKU. Se kynnys, jolla kaupungin
 * nostot (ja siten niiden nimiöt) tulevat esiin lähestyttäessä, on
 * `lahizoomiAuki` — LAHIZOOMIN_OSUUS_ULOIMMASTA 0,7, sama portti,
 * joka päästää kohdekartan nostot (`lahi: true`, karsiKaupunkikartan-
 * Nostot) pääkartalle. Tämä funktio KUTSUU sitä sen sijaan, että
 * toistaisi luvun: jos kynnystä joskus siirretään, aihenoston nimiö
 * siirtyy mukana eikä jää jälkeen omaan vakioonsa.
 *
 * MIKSI (mitattu, docs/raportit/viesti-fable-julkaisu-v1927-
 * 20260917.md luku 5.1): v1927:ssä aihenostot latoivat nimiönsä myös
 * koko Ranskan saapumisnäkymään — noin kahdeksan pitkää nimiötä
 * lisää 390 px:n ruudulle — ja savuke-nimikyltin vartio 9b
 * (limittyviä nimiöpareja enintään 4) nousi puhelimella 5 → 8.
 * Vastakoe `?aihekaupunki=0` osoitti, ettei syy ollut kaupungin
 * aina-yhdistys (ilman sitä pareja oli 9), vaan nimiö itse.
 *
 * LAATIKKO SEURAA LIPPUA. Kun nimiö ei näy, `aihemerkinLaatikko`
 * antaa pelkän värilautasen (d.nimioNakyy on false), ja rivi jää pois
 * sovittelun `lappuja`-listalta — muuten saapumisnäkymän sovittelu
 * varaisi tilaa nimiölle, jota ei piirretä.
 */
/**
 * Näkyykö aihenoston nimiö tällä zoomilla (PAATOKSET 27 TARKENNUS 4
 * kohta 10). Puhdas funktio: sama osuus antaa aina saman vastauksen.
 *
 * @param {number} uloinOsuus  kameran korkeus / uloin sallittu korkeus
 * @returns {boolean} true vain lähizoomissa (osuus <= kynnys)
 */
export function aihenostonNimioNakyy(uloinOsuus) {
  return lahizoomiAuki(uloinOsuus);
}

/**
 * NIMIÖKYNNYKSEN VASTAKOE: `?aihenimiokynnys=0` poistaa kynnyksen,
 * jolloin aihenoston nimiö näkyy kaikilla zoomeilla kuten v1927:ssä.
 * Lippu luetaan JOKA LADONNASSA osoitteesta, joten savuke voi kääntää
 * sen päälle ja pois ilman uutta sivunlatausta — sama tapa kuin
 * `?aihemerkit=0` ja `?aihekaupunki=0`.
 */
export function aihenimionKynnysSallittu() {
  try {
    const arvo = new URLSearchParams(globalThis.location?.search ?? '').get('aihenimiokynnys');
    return !/^(0|ei|off)$/.test(arvo ?? '');
  } catch { return true; }
}

/**
 * PÄÄKARTAN MERKKIPORTTI. Lähizoomilla kaikki; uloimmalla enintään
 * PAAKARTAN_MERKKIKATTO tärkeintä, ja `lahi`-merkit eivät lainkaan.
 *
 * @param {Array} merkit   maanKohdemerkit-rivit datan järjestyksessä
 * @param {boolean} lahella  onko lähizoomi auki (lahizoomiAuki)
 * @param {function} kohdeHaku  rivi → kohdeolio (oletuksena rivin oma)
 * @param {{kohdemaa?: boolean}} [asetukset]  `kohdemaa: true` = merkit
 *   ovat korostetun kohdemaan omia, jolloin niitä ei pidätä katto
 *   eikä `lahi`-lippu (KATTO EI KOSKE KOHDEMAATA yllä).
 * @returns {{merkit: Array, piiloon: Array<string>, polttovelka: Array<string>}}
 *   `merkit` piirretään, `piiloon` jäi lähizoomia odottamaan,
 *   `polttovelka` on portin hylkäämä mutta laatoissa yhä oleva muste.
 */
export function merkkiPortti(
  merkit, lahella, kohdeHaku = (m) => m.kohde ?? null, { kohdemaa = false } = {},
) {
  if (lahella) return { merkit, piiloon: [], polttovelka: [] };
  const katto = kohdemaa ? Infinity : PAAKARTAN_MERKKIKATTO;
  const kuuluu = new Set();
  const jarjestys = merkit.map((m, i) => ({ m, i }))
    .sort((a, b) => (merkinTarkeys(kohdeHaku(a.m)) - merkinTarkeys(kohdeHaku(b.m)))
      || (a.i - b.i));
  for (const { m, i } of jarjestys) {
    if (!kohdemaa && kohdeHaku(m)?.lahi) continue;
    if (kuuluu.size >= katto) continue;
    kuuluu.add(i);
  }
  const ulos = [];
  const piiloon = [];
  const polttovelka = [];
  merkit.forEach((m, i) => {
    if (kuuluu.has(i)) { ulos.push(m); return; }
    // Poltettua mustetta ei voi piilottaa (ks. POLTETTUA MUSTETTA…).
    if (m.poltettu) { polttovelka.push(m.id); ulos.push(m); return; }
    piiloon.push(m.id);
  });
  return { merkit: ulos, piiloon, polttovelka };
}

/** Aihevalon säde (Globe.gl pointRadius-yksikköä) ja korkeus kaupunkipisteen alla. */
export const VALON_SADE = 0.06;
export const VALON_KORKEUS = 0.0015;
export const VALON_PEITTO = 0.45;

const SVG = 'http://www.w3.org/2000/svg';

/*
 * ══════════════════════════════════════════════════════════════════
 * LIUSKAN TEKSTIKOKO = KARTTAAN POLTETUN TEKSTIN RUUTUKOKO (omistaja
 * 18.9.2026 klo 06.58 Suomen aikaa, Raamattu KARTTAUUDISTUKSEN
 * PAATOKSET 34 kohta 13 a, iPhone-kuva v1935:n liuskasta:
 * *"Teksteja ei nae puhelimella. Kaikki pitaisi olla samalla koolla
 * kuin karttaan poltetut tekstit."*)
 * ══════════════════════════════════════════════════════════════════
 *
 * MITATTU VIKA (Chromium 390 × 844 dpr 2, Pariisi, lähizoomi 0,34
 * uloimmasta; tools/savukkeet/savuke-pariisi-lahizoom.mjs vartio 8l):
 *
 *   kartan kerroin (nimenKarttakerroin)            2,937
 *   POLTETTU nimiö ruudulla (8,5 px × kerroin)    24,96 px
 *   PARIISI-nimi ruudulla (13,5 px × kerroin)     39,65 px
 *   liuskan rivi ruudulla (NOSTON_MITTA × 11)      8,50 px
 *
 * Poltettu muste on KARTAN mitta: se on laatassa kiinni ja kasvaa
 * ruudulla sitä mukaa kuin kartta suurenee allansa. Elävä nosto sen
 * sijaan on ruutuvakio (PAATOKSET 32 kohta 4, *"yksi koko"*), ja
 * liuska peri sen — 8,5 px on lähizoomissa alle kolmasosa siitä,
 * mitä sen vieressä oleva poltettu nimiö on. Juuri sen omistaja näki.
 *
 * SÄÄNTÖ ON SIKSI SAMA FUNKTIO KUIN POLTETULLA MUSTEELLA, EI UUSI
 * LUKU: liuskan rivin mitta on NOSTON_MITTA × `nimenKarttakerroin`
 * (js/pallolauta/nimet.js), täsmälleen se kerroin, jolla kaupunkien
 * nimikyltit ja laattojen muste seuraavat karttaa. Kartan omat merkit
 * pysyvät yhtenä kokona kuten ennen — muutos koskee VAIN liuskaa,
 * joka ei ole kartan merkki vaan sen päälle avautuva lista.
 *
 * KATTO JA LATTIA OVAT PIKSELEITÄ, RIVIVÄLI SEURAA NIITÄ. Kaava
 * yksin antoi syvimmässä zoomissa 25 px:n rivin, joka ei mahtunut
 * ruudulle; omistajan tarkistus 18.9.2026 asetti katoksi 18 px ja
 * lattiaksi 13 px (ks. LIUSKAN_KIRJASIN_KATTO_PX). Riviväli EI ole
 * enää viuhkan vakio vaan 1,45 × kirjasin, eli se kasvaa ja kutistuu
 * rivin mukana — päätöksen lause *"rivivali vastaavasti"* on juuri
 * tämä. 16 px:n nimiökatto on KARTAN merkkien katto (ne ovat kartan
 * päällä, missä *"jattimaiset ja sumeat"* nimiöt peittivät kartan);
 * liuskan rivi on listan sisällä eikä peitä muuta kuin oman pohjansa.
 */
/*
 * KATTO 18 px, LATTIA 13 px (omistajan tarkistus 18.9.2026, Fablen
 * kaappaus liuska-auki-390.png). Edellinen erä sitoi rivin suoraan
 * poltetun nimiön ruutukokoon ja mittasi sen SYVIMMÄSSÄ zoomissa:
 * kerroin 2,937 → 25 px. Omistajan omassa v1935:n kuvassa poltettu
 * *"Chartresin."* oli ruudulla noin 16 px, ja se on tavoitetaso —
 * 25 px:n rivit katkesivat, valuivat ruudun laidan yli ja peittivät
 * naapurin nimiön. Kaava on siis ennallaan (poltetun musteen
 * ruutukoko), mutta se leikataan näiden kahden luvun väliin: katto
 * pitää listan luettavana venyttämättä sitä ruudun yli, lattia estää
 * uloimmassa zoomissa syntyvän silmälle näkymättömän rivin.
 */
/** Liuskan rivin kirjasimen katto ruudulla (px). */
export const LIUSKAN_KIRJASIN_KATTO_PX = 18;
/** Liuskan rivin kirjasimen lattia ruudulla (px). */
export const LIUSKAN_KIRJASIN_LATTIA_PX = 13;
/** Riviväli kirjasinkokoon nähden (omistaja: *"riviväli 1,45 × fontti"*). */
export const LIUSKAN_RIVIVALI_KERROIN = 1.45;
/**
 * Tihein sallittu riviväli kirjasinkokoon nähden. Lista kutistaa
 * rivivälin ennen kuin se kelaa (kelaus on viimeinen keino), mutta ei
 * niin tiheäksi, että hiusviivan molemmin puolin jäisi alle puolta
 * kirjasinta ilmaa: rivin puolikorkeus on puoli riviväliä, joten
 * 1,25 jättää hiusviivan ja tekstin väliin 0,5 × fontti.
 */
export const LIUSKAN_TIHEIN_KERROIN = 1.25;
/** Kartan kerroin liuskalle (ks. yllä); `paivita` asettaa sen. */
let liuskanKarttakerroin = 1;
/** Liuskan rivin kirjasinkoko ruudulla juuri nyt (px). */
export function liuskanKirjasinPx() {
  const poltettu = NOSTOSYM_NIMIO_KOKO * NOSTON_MITTA * Math.max(1, liuskanKarttakerroin);
  return Math.min(LIUSKAN_KIRJASIN_KATTO_PX, Math.max(LIUSKAN_KIRJASIN_LATTIA_PX, poltettu));
}
/**
 * Liuskan rivin mitta juuri nyt: poltetun kartan tekstin ruutukoko
 * leikattuna kirjasimen lattian ja katon väliin.
 */
export function liuskanMitta() {
  return liuskanKirjasinPx() / NOSTOSYM_NIMIO_KOKO;
}
/**
 * LIUSKAN LEVEYDEN KATTO: osuus ruudun leveydestä. Liuska on sisällön
 * levyinen (levein rivi + laatikon marginaalit), mutta ei koskaan
 * leveämpi kuin tämä — loppu rivittyy, ei katkea (omistaja 18.9.2026:
 * *"ei katkaisua"*).
 */
export const LIUSKAN_LEVEYDEN_OSUUS = 0.78;
/** Rivilaatikon vaakamarginaalit (kohdanLaatikko sisä + ulko, px). */
const LIUSKAN_LAATIKON_VARA_PX = 28;
/** Kaupunkiliuskan haitarin sisennys yhtä tasoa kohti (merkin yksiköt). */
export const LIUSKAN_SISENNYS_PX = 9;
/** Kategoriarivin väripallon säde (merkin yksiköt). */
const LIUSKAN_PALLON_R = 2.4;

/**
 * KAUPUNKILIUSKAN YHDEN RIVIN PIIRTO. Rivi on nimiö kuten viuhkassa;
 * kategoriarivillä on lisäksi aiheen väripallo (sama muste kuin
 * karttaselitteessä) ja haitarin kohteet ovat sisennettyjä.
 * Hiusviiva erottaa yläryhmän kategorioista (PAATOKSET 34 kohta 8).
 */
function piirraLiuskanRivi(g, r, kylki, suunta, teksti = null, { leveysYksikkoina = 60, jatko = false } = {}) {
  const sisennys = suunta * r.sisennys * LIUSKAN_SISENNYS_PX;
  const sisus = document.createElementNS(SVG, 'g');
  sisus.setAttribute('class', `pallolauta-liuska-rivi pallolauta-liuska-${r.laji}`);
  if (sisennys) sisus.style.transform = `translate(${sisennys.toFixed(2)}px, 0px)`;
  g.appendChild(sisus);
  /*
   * HIUSVIIVA ON OMA RIVINSÄ (Fablen tarkistus 18.9.2026: viiva leikkasi
   * Turistiopas-rivin tekstin). Se piirtyy oman rivinsä keskelle, joten
   * riviväli (1,45 × kirjasin) jättää sen molemmin puolin yli puolen
   * kirjasimen verran ilmaa — ennen viiva oli ensimmäisen kategoriarivin
   * sisällä 11 yksikköä sen yläpuolella ja kasvoi kirjasimen mukana
   * naapurin tekstin päälle.
   */
  if (r.laji === 'hiusviiva') {
    const viiva = document.createElementNS(SVG, 'line');
    viiva.setAttribute('class', 'pallolauta-liuska-hiusviiva');
    viiva.setAttribute('x1', String(suunta * 5));
    viiva.setAttribute('x2', String(suunta * Math.max(20, leveysYksikkoina)));
    viiva.setAttribute('y1', '0');
    viiva.setAttribute('y2', '0');
    sisus.appendChild(viiva);
    return;
  }
  // Väripallo on rivin OMALLA ensimmäisellä rivillä; rivityksen
  // jatkorivi on pelkkää tekstiä, jottei pallo toistu kahdesti.
  if (r.laji === 'kategoria' && !jatko) {
    const pallo = document.createElementNS(SVG, 'circle');
    pallo.setAttribute('class', 'pallolauta-liuska-pallo');
    pallo.setAttribute('r', String(LIUSKAN_PALLON_R));
    pallo.setAttribute('cx', String(suunta * 7));
    pallo.setAttribute('cy', '0');
    pallo.setAttribute('fill', karttavaloVari(r.aihe));
    sisus.appendChild(pallo);
  }
  const nimi = teksti ?? r.nimi;
  if (nimi) piirraNostosymNimio(sisus, nimi, null, kylki, Infinity);
}

/** Elävän noston elementti: viivamerkki + nimiö samaan pieneen svg:hen. */
export function nostoElementti(d) {
  const el = document.createElement('div');
  el.className = `pallolauta-nosto pallolauta-nosto-${d.perhe}`;
  el.dataset.nosto = d.id;
  el.dataset.aihe = d.aihe ?? '';
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  svg.setAttribute('aria-hidden', 'true');
  /*
   * LIUSKA PIIRTYY KAUPUNKIMERKIN OMAAN ELEMENTTIIN, samasta syystä
   * kuin viuhka aihemerkin omaan (js/pallolauta/aihemerkit.js VIUHKA
   * PIIRTYY AIHEMERKIN OMAAN ELEMENTTIIN): uusi CSS2D-merkki ei synny
   * ennen kirjaston seuraavaa kehystä, eikä levossa oleva pallo tuota
   * sellaista — liuskan olisi odotettava napautuksen jalkeen.
   */
  const viuhka = document.createElementNS(SVG, 'g');
  viuhka.setAttribute('class', 'pallolauta-viuhka');
  svg.appendChild(viuhka);
  const g = document.createElementNS(SVG, 'g');
  g.setAttribute('class', 'pallolauta-nosto-siirto');
  svg.appendChild(g);
  el.appendChild(svg);
  asetteleNosto(el, d);
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', d.nimi || d.id);
  return el;
}

/**
 * Noston sisäasettelu: mittakaava, sovittelun pieni siirto ja se kylki,
 * jolla nimiö piirretään (js/pallolauta/sovittelu.js).
 *
 * SIIRTO ON CSS-MUUNNOS, EI transform-MÄÄRE: `.pallolauta-nosto-siirto`
 * animoi muunnoksen 200 ms:ssä (css/styles.css), joten väistö liukuu
 * eikä hypi — sama ratkaisu kuin nimen siirtymällä
 * (js/pallolauta/nimet.js .pallolauta-nimi-siirto). Reduced motion
 * poistaa siirtymän samasta säännöstä.
 *
 * RASTERI PIIRRETÄÄN VAIN KUN RESEPTI MUUTTUU. piirraNostosymKartalle
 * LISÄÄ ryhmään uuden <image>-solmun eikä tyhjennä sitä, joten ryhmä on
 * tyhjennettävä ensin — ja koska kyljen vaihto on rasterille vain uusi
 * välimuistiavain (kylki on avaimessa), uusi kuva saapuu osumassa jo
 * samalla mikrotehtävällä.
 */
export function asetteleNosto(el, d) {
  const g = el.querySelector('.pallolauta-nosto-siirto');
  if (!g) return;
  // Liuska on merkin oma sisus (sama resepti kuin aihemerkin viuhkalla).
  const liuskaJuuri = el.querySelector('.pallolauta-viuhka');
  if (liuskaJuuri) {
    const pohja = d.viuhkaPohja;
    const resepti = `${pohja ? `${pohja.x0.toFixed(1)},${pohja.y0.toFixed(1)},${pohja.x1.toFixed(1)},${pohja.y1.toFixed(1)}` : '-'}#`
      + (d.viuhka ?? [])
        .map((k) => `${k.nimi}@${k.dx.toFixed(1)},${k.dy.toFixed(1)}|${k.puoli}|${k.leveys.toFixed(1)}`).join(';');
    if (liuskaJuuri.dataset.resepti !== resepti) {
      liuskaJuuri.dataset.resepti = resepti;
      piirraViuhka(liuskaJuuri, d);
    }
    el.classList.toggle('pallolauta-liuska-auki', Boolean((d.viuhka ?? []).length));
  }
  const dx = d.dx ?? 0;
  const dy = d.dy ?? 0;
  const mitta = d.mitta ?? nostonMitta();
  g.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${mitta.toFixed(4)})`;
  /*
   * LIUSKAN ANKKURI EI PIIRRA MERKKIA (PAATOKSET 34, kerrosraja).
   * Kaupungin oma merkki ja nimi tulevat laudalta; ankkuri on pelkka
   * ripustuspiste liuskalle, joten toinen symboli samaan pisteeseen
   * olisi sama kaupunki kahdesti.
   */
  if (d.ankkuri) {
    if (g.dataset.resepti !== 'ankkuri') { g.dataset.resepti = 'ankkuri'; g.replaceChildren(); }
    el.dataset.nimio = '';
    el.classList.add('pallolauta-nosto-ankkuri');
    return;
  }
  const nimio = d.nimioNakyy && d.nimi ? d.nimi : '';
  const puoli = d.puoli ?? 'oikea';
  const resepti = `${d.kategoria ?? ''}|${d.symLaji ?? ''}|${puoli}|${nimio}`;
  if (g.dataset.resepti !== resepti) {
    g.dataset.resepti = resepti;
    g.replaceChildren();
    piirraNostosymKartalle(g, d.kategoria, nimio, d.symLaji, puoli);
  }
  el.dataset.nimio = nimio;
  el.classList.toggle('lunastettu', Boolean(d.lunastettu));
  // Listan alle jäänyt merkki piiloutuu listan ajaksi (ks. LISTA EI
  // KOSKAAN TOISEN TEKSTIN PÄÄLLE); seuraava ladonta palauttaa sen.
  el.classList.toggle('pallolauta-nosto-piilossa', Boolean(d.piiloListanAlla));
  // Kaupunkimerkki on isompi (ks. KAUPUNKIMERKIN NIMIÖ ON ISOMPI KUIN
  // NOSTON). Luokka on savukkeiden ja CSS:n kahva: ilman sitä
  // mittaava savuke poimisi DOM-järjestyksen ensimmäisen merkin eikä
  // tietäisi, kumman mitan se luki.
  el.classList.toggle('pallolauta-nosto-kaupunki', Boolean(d.kaupunki));
}

/** Kohtaamispisteen elementti: sama tuike kuin kartalla (css/fokusvirta.css). */
export function pisteElementti(d) {
  const el = document.createElement('div');
  el.className = 'pallolauta-piste';
  el.dataset.piste = d.id;
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  svg.setAttribute('aria-hidden', 'true');
  const g = document.createElementNS(SVG, 'g');
  g.setAttribute('class', 'fokuspiste');
  svg.appendChild(g);
  el.appendChild(svg);
  fokuspisteKuvio(g, { lukittu: Boolean(d.lukittu) });
  el.setAttribute('role', 'img');
  asetteleFokuspiste(el, d);
  return el;
}

/**
 * PISTEEN TILA ILMAN UUTTA ELEMENTTIÄ (karttauudistuksen erä 7).
 *
 * Merkkien avain säilyy kaupungin yli (js/pallolauta/merkit.js aseta:
 * sama avain → sama elementti), joten lukon aukeaminen ei saa jäädä
 * kiinni siihen, että elementti rakennetaan vain kerran. Luokka ja
 * lappu päivitetään siksi tässä, ja merkkikone kutsuu tätä joka
 * ladonnassa — sama kaava kuin nostoilla (asetteleNosto).
 */
export function asetteleFokuspiste(el, d) {
  const g = el.querySelector('.fokuspiste');
  el.classList.toggle('lukittu', Boolean(d.lukittu));
  g?.classList.toggle('fokuspiste-lukittu', Boolean(d.lukittu));
  el.setAttribute('aria-label', `${d.nimi}: ${d.teko}`);
}

/**
 * Elävän noston laatikko ruudulla (nimiladonnan varaus): symbolin
 * ruutu ja nimiön kaista kirjaston asemoinnista (nostosymNimioAsemointi)
 * merkin mitassa.
 */
/**
 * NOSTON MUSTE OSINA: [ikonin ruutu, nimiön kaista] — sama kaava kuin
 * `nostonLaatikko`, mutta ILMAN yhteistä kehystä.
 *
 * MIKSI (mitattu Macilla 17.9.2026, savuke-pallo-nostolaput/Bukarest):
 * `nostonLaatikko` on ikonin ja nimiön YHTEINEN kehys, ja kun nimiö on
 * kyljessä, kehykseen jää tyhjiä kulmia, joissa ei ole yhtään mustetta.
 * Naapurin nimilappu osuu juuri sellaiseen kulmaan, jolloin molempien
 * etäisyys kehykseen on 0 ja tasapelin ratkaisi keskipistemitta —
 * napautus Transfăgărășanin omaan tekstiin avasi Strousbergin noston.
 * Osalaatikoilla osumatesti tietää, kenen OMALLA musteella sormi on
 * (Raamattu, PAATOKSET 31 TARKENNUS 2 kohta 4).
 */
export function nostonOsat(p, d, {
  kylki = null, dx = 0, dy = 0, nimio = null,
} = {}) {
  const mitta = nostonMitta(merkinKerroin(d));
  const r = NOSTOSYM_MINI_RUUTU * mitta;
  const x = p.x + dx;
  const y = p.y + dy;
  const ikoni = {
    x0: x - r, y0: y - r, x1: x + r, y1: y + r,
  };
  const nakyy = nimio === null ? Boolean(d.nimioNakyy) : Boolean(nimio);
  if (!nakyy || !d.nimi) return [ikoni];
  const { leveys } = nostosymNimioMitta(d.nimi, d.symLaji);
  const a = nostosymNimioAsemointi(kylki ?? d.puoli ?? 'oikea', leveys);
  return [ikoni, {
    x0: x + Math.min(a.x1, a.x2) * mitta,
    y0: y + Math.min(a.y1, a.y2) * mitta,
    x1: x + Math.max(a.x1, a.x2) * mitta,
    y1: y + Math.max(a.y1, a.y2) * mitta,
  }];
}

export function nostonLaatikko(p, d, {
  kylki = null, dx = 0, dy = 0, nimio = null,
} = {}) {
  // Katto on merkin omassa mitassa, joten oma kerroin menee mukaan
  // laskuun eikä sen jälkeen (ks. NIMIÖLLÄ ON RUUTUPIKSELIKATTO):
  // laatikon on oltava täsmälleen se, mikä ruudulle piirtyy.
  const mitta = nostonMitta(merkinKerroin(d));
  const r = NOSTOSYM_MINI_RUUTU * mitta;
  const x = p.x + dx;
  const y = p.y + dy;
  const laatikko = {
    x0: x - r, y0: y - r, x1: x + r, y1: y + r,
  };
  const nakyy = nimio === null ? Boolean(d.nimioNakyy) : Boolean(nimio);
  if (!nakyy || !d.nimi) return laatikko;
  const { leveys } = nostosymNimioMitta(d.nimi, d.symLaji);
  const a = nostosymNimioAsemointi(kylki ?? d.puoli ?? 'oikea', leveys);
  return {
    x0: Math.min(laatikko.x0, x + a.x1 * mitta),
    y0: Math.min(laatikko.y0, y + a.y1 * mitta),
    x1: Math.max(laatikko.x1, x + a.x2 * mitta),
    y1: Math.max(laatikko.y1, y + a.y2 * mitta),
  };
}

/**
 * NAPAKOHTEEN RIVI: nosto, jonka paikka on datassa asteina eikä laudan
 * pisteenä (js/packs/maastokohteet-ata.js ja -ark.js). Sama tietue kuin
 * tavallisella nostolla, mutta paikka luetaan kohteen omasta
 * `asteet`-kentästä ja merkki on aina elävä: laattapyramidi on
 * julisteen projektiota, josta napojen takaiset alueet puuttuvat,
 * joten pallon laattaluettelossa ei voi olla näitä merkkejä.
 *
 * Palauttaa null, jos paikka puuttuu tai kohteen tyypille ei ole
 * karttasymbolia (js/fokuskohteet.js KOHDE_TYYPPISYMBOLIT) — ilman
 * symbolia merkkiä ei voi piirtää.
 */
export function napanostonRivi(ui, kohde, { avain }) {
  const a = kohde.asteet;
  if (!Number.isFinite(a?.lat) || !Number.isFinite(a?.lon)) return null;
  const lado = kohdeMerkinLadonta(ui, kohde);
  if (!lado.symboli) return null;
  return {
    avain,
    id: kohde.id,
    perhe: 'nosto',
    lat: a.lat,
    lng: a.lon,
    nimi: lado.nimi ?? kohde.nimi,
    nimioNakyy: Boolean(lado.nimi),
    kategoria: lado.symboli,
    symLaji: lado.laji,
    puoli: 'oikea',
    aihe: nostosymPaakategoria(lado.symboli),
    poltettu: false,
    avaa: (ankkuri) => avaaFokuskohde(ui, kohde, { ankkuri }),
  };
}

/**
 * Nostokerros pallolle. `ruudulla(lat, lng)` antaa ruutupisteen tai
 * null (pallon takana tai ulkona), `merkit` on merkkirekisteri (osa
 * `nostot`), `onPoltettu(tunnus, tiiviste)` pallon laattaluettelon
 * vastaus.
 */
/**
 * LAUDAN KAUPUNGIN ANKKURIRIVIN AVAIN nostokerroksessa (PAATOKSET 34).
 * Etuliite erottaa sen sisaltopakettien omista riveista, joiden avain
 * tulee kohteen tunnuksesta — sama kaupunki ei voi saada kahta riviä.
 */
const laudanAvain = (k) => `lauta:${k?.id ?? k?.nimi ?? k?.name ?? ''}`;

export function luoNostot({
  ui, merkit, asteet, ruudulla, onPoltettu = pallonNostoOnPoltettu,
  /*
   * VIUHKA TARVITSEE KOLME ASIAA LAUDALTA (ks. js/pallolauta/aihemerkit.js).
   * `ruutu` on kotelon koko: kaari sovitetaan ruudulle eikä palloon.
   * `ankkuri` antaa kortin ankkurin RUUDUN pikseleinä, jotta viuhkasta
   * avattu kortti nousee sen kohdan kohdalta, jota sormi kosketti.
   * `ladoUudelleen` pyytää uuden ladonnan, kun viuhka aukeaa tai
   * sulkeutuu — kerros ei omista kameraa eikä ladonnan tahtia.
   */
  ruutu = null, ankkuri = null, ladoUudelleen = null,
  /*
   * LISTA VÄISTÄÄ PELIMERKIT (PAATOKSET 32 kohta 3: lista ei saa
   * peittää *"kaupungin nimea eika pelinappulaa"*). `esteet` antaa
   * pelimerkkien ruutulaatikot (nappula, kohteet) kotelon pikseleinä;
   * kaupunkien nimet tulevat sovittelusta (viimeisimmatNimet).
   */
  esteet = null,
  /*
   * KAUPUNKIEN NIMILAATIKOT TUOREINA (Fablen tarkistus 18.9.2026).
   * Lukufunktio nimikerrokseen (js/pallolauta/nimet.js `laatikot`):
   * sovittelun jättämä `viimeisimmatNimet` on ladonnan verran vanha,
   * ks. KAUPUNGIN NIMI LUETAAN TUOREENA liuskan ladonnassa.
   */
  nimienLaatikot = null,
  /*
   * LAUDAN OMAT KAUPUNGIT (PAATOKSET 34, Fablen paatos kerrosrajasta
   * 17.9.2026: *"liuska ripustetaan LAUDAN OMAAN KAUPUNKIMERKKIIN"*).
   *
   * MITATTU SYY (era 3, savuke-pariisi-lahizoom 8c, kaappaus
   * pariisi-liuska-auki-390.png): nostokerroksen `kaupunki`-rivit
   * syntyvat sisaltopakettien nakyvista kaupungeista (Lille,
   * js/packs/nakyvat-kaupungit-fra.js). Pelaajan napauttama Pariisi on
   * LAUDAN kaupunki, eika sella ole riviä tassa kerroksessa lainkaan —
   * joten liuskalla ei ollut mihin ripustua eika kaupungin sisaisia
   * nostoja pudottanut kartalta mikaan.
   *
   * Lauta antaa siis kaupunkinsa tanne: `() => [{ id, nimi, lat, lng }]`.
   * Ne eivat ole merkkeja (lauta piirtaa oman kaupunkimerkkinsa ja
   * nimensa) vaan ANKKUREITA: kategorioiden laskenta (kohta 3) kayttaa
   * niita joka ladonnassa, ja liuskan auetessa yksi niista saa oman
   * CSS2D-elementin, johon liuska piirtyy.
   */
  laudanKaupungit = null,
}) {
  let osumat = []; // ruudulla olevat, napautettavat merkit
  let laatikot = [];
  let laskurit = new Map();
  let valot = [];
  let lappuja = []; // elävät nimiölaput sovittelua varten ({ r, datum })
  let datumit = []; // viimeksi asetetut nostodatumit (sovittelu päivittää)
  // Viimeisin merkkiportin päätös (savukkeet ja vartijat lukevat sen).
  let portti = null;
  let viimeisinUloinOsuus = 0;
  let sovittelu = {
    siirretty: 0, kylkiVaihtui: 0, piilotettu: 0, jaljella: 0, lappuja: 0,
  };
  /*
   * MILLE LAPPUJOUKOLLE JA RUUDULLE SOVITTELU ON RATKAISTU (ks.
   * NIMIÖN KYLKI LUKITAAN, KUN ANKKURI VALITAAN `sovittele`n yllä).
   * Tyhjä = ei ratkaistu, jolloin seuraava sovittelu ajetaan.
   */
  let sovittelunAvain = '';
  /** Lukitut asennot avaimittain: avain → { kylki, dx, dy, nimio }. */
  let sovitellutAsennot = new Map();
  /** Viimeisin oikeasti ajettu sovittelu (ohitettu ajo palauttaa tämän). */
  let viimeisinSovittelu = {
    siirretty: 0, kylkiVaihtui: 0, piilotettu: 0, jaljella: 0,
  };
  let laskeLaatikot = () => { laatikot = []; };
  /*
   * MERKKIEN MUSTE OMISSA PAIKOISSAAN — ILMAN SOVITTELUN SIIRTOJA
   * (omistaja 17.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET 31
   * TARKENNUS 3; vika mitattu GitHub Actionsin ajossa 35201833942).
   *
   * `laatikot` (kiinteä muste) lasketaan datumin `dx`/`dy`:llä, eli
   * EDELLISEN ladonnan sovittelun tuloksella. Se on oikein nimiladonnan
   * varauksille — ne kuvaavat sitä, mikä ruudulla on — mutta se on
   * VÄÄRÄ lähde turisti-infon kyltin asennon valinnalle: silloin
   * asento riippuu siitä, kuinka monta ladontakierrosta kone on ehtinyt
   * ajaa, ja hidas kone päätyy eri asentoon kuin nopea. Nämä laatikot
   * ovat merkin OMASSA paikassa, joten ne riippuvat vain kamerasta ja
   * datasta — sama kone tai toinen, sama tulos.
   *
   * KAKSI LUKEMAA SAMASTA KAAVASTA: `{ nimiot: false }` on pelkkä
   * symbolin ruutu (kyltin LAATIKKO ei saa mennä sen päälle) ja
   * `{ nimiot: true }` koko muste nimiöineen (kyltin ANKKURI ei saa
   * jäädä sen alle) — ks. js/pallolauta/lauta.js paivitaTuristiInfo.
   */
  let omatLaatikot = () => [];
  /*
   * AUKI OLEVA VIUHKA: { avain, p, uloinOsuus } tai null. Viuhka
   * sulkeutuu kartan napautuksesta (js/pallolauta/lauta.js
   * napautaPintaan), zoomista ja panoroinnista (paivita vertaa
   * kameran osuutta ja merkin ruutupistettä avaushetkeen) sekä
   * toisen viuhkan avauksesta — PAATOKSET 27 kohta 2.
   */
  let viuhka = null;
  // Ryhmiin sulautuneiden nostojen id:t: auki oleva kortti ei sulkeudu
  // sen takia, että sen merkki on juuri nyt aihemerkin sisällä.
  let ryhmitetytIdt = new Set();
  // Auki olevan viuhkan kohdat ruutulaatikkoineen (osumatesti lukee).
  let viuhkanKohdat = [];
  /*
   * AUKI OLEVA KAUPUNKILIUSKA (Raamattu, KARTTAUUDISTUKSEN PAATOKSET
   * 34): { avain, p, uloinOsuus, avattuKategoria } tai null. Sama
   * kone kuin viuhkalla — ero on ripustus (kaupunkimerkki) ja rivien
   * laji (yläryhmä, kategoriat, haitarin kohteet).
   */
  let liuska = null;
  let liuskanKohdat = [];
  /*
   * VIIMEISIMMAN LADONNAN KAUPUNKIRIVIT (nostokerroksen omat, esim.
   * Lille). `avaaLiuskaKaupungista` etsii niistä ensin: pakkojen
   * nakyva kaupunki kayttaa OMAA riviaan, ja vain sen puuttuessa
   * luodaan ankkuri (sama polku, kaksi lahdetta).
   */
  let kaupunkirivitNyt = [];
  /** Viimeisimman ladonnan laudan kaupunkien ankkuririvit (savukkeet). */
  let laudanAnkkurit = [];
  /*
   * VIIMEISIMMAN LADONNAN KOKO RIVISTO (savukkeen juurisyymittari).
   * `osumat` on ruudulla olevien lista, joten siitä ei voi lukea, onko
   * nosto pudotettu kartalta vai vain kuvan ulkopuolella — juuri se
   * ero oli vartio 8b:n juurisyy (18.9.2026). Tämä on `keraa`n tuotos
   * sellaisenaan: sama lähde, josta liuskan jäsenyys lasketaan.
   */
  let rivitNyt = [];
  /** Liuskaan siirrettyjen avaimet viimeisimmästä ladonnasta. */
  let liuskaanSiirretyt = new Set();
  /*
   * KAUPUNGIN SISÄISET NOSTOT ladonnasta: avain = kaupunkirivin avain.
   * Sama lista pudottaa merkit kartalta (PAATOKSET 34 kohta 3) ja
   * täyttää liuskan kategoriat — yksi laskenta, kaksi käyttöä.
   */
  let sisaisetKaupungeittain = new Map();
  /*
   * Listan alle piilotettu muste: { avain, osa } (ks. LISTA EI KOSKAAN
   * TOISEN TEKSTIN PÄÄLLE). Vain mittausta ja vartioita varten —
   * piilotus itse elää datumeissa ja purkautuu seuraavassa ladonnassa.
   */
  let piilotetutListanAlta = [];
  /*
   * VIIMEISIN NIMILADONTA. Kaupunkien nimilaatikot tulevat laudalta
   * vasta `sovittele`ssa, eli ladonnan JÄLKEEN; lista tarvitsee ne
   * ladonnassa. Edellisen kierroksen laatikot kelpaavat: viuhka
   * avataan aina ladonnan jälkeen (avaaViuhka → ladoUudelleen), ja
   * nimet eivät liiku levossa.
   */
  let viimeisimmatNimet = [];
  const varit = new Map();

  /** Aiheen väri CSS-muuttujasta pistekerroksen väriksi (rgba). */
  const valonVari = (aihe) => {
    if (varit.has(aihe)) return varit.get(aihe);
    let vari = 'rgba(138, 109, 74, 0.45)';
    try {
      const koe = document.createElement('span');
      koe.style.color = karttavaloVari(aihe);
      document.body.appendChild(koe);
      const rgb = getComputedStyle(koe).color.match(/\d+(\.\d+)?/g);
      koe.remove();
      if (rgb && rgb.length >= 3) vari = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${VALON_PEITTO})`;
    } catch { /* ilman DOMia oletusväri */ }
    varit.set(aihe, vari);
    return vari;
  };

  /** Valotäplät palaville aiheille ruudulla olevien merkkien alle. */
  const paivitaValot = () => {
    const palaa = karttavalotLue();
    valot = osumat
      .filter((o) => o.aihe && palaa.has(o.aihe))
      .map((o) => ({
        laji: 'valo', id: `valo:${o.avain}`, aihe: o.aihe, lat: o.lat, lon: o.lng, vari: valonVari(o.aihe),
      }));
    return valot;
  };

  /**
   * Kerää tämän näkymän merkit: oman maan nostot (elävät ja poltetut),
   * naapurimaiden poltetut, eläintäyt ja kohtaamispiste. `nakyva` on
   * kameran näkyvä alue laudan yksiköissä (ui.nakyvaAlue-muoto).
   */
  const keraa = (nakyva, uloinOsuus = 0) => {
    const { game } = ui;
    const pack = game?.pack;
    const rivit = [];
    /*
     * LADONNAN JÄRJESTYSNUMERO (`ladontaNro`) — aihenoston nimiön
     * ankkuri (PAATOKSET 27 TARKENNUS 2 kohta 8, ks. AIHENOSTON NIMIÖ
     * alempana). Rivit syntyvät DATAN järjestyksessä, joka ei muutu
     * kameran mukana; ruutujärjestys muuttuu joka panoroinnissa.
     */
    let nro = 0;
    /*
     * NOSTON OMA DATAPAIKKA (`omaLat`/`omaLng`, PAATOKSET 34 kohta 4).
     *
     * `lat`/`lng` EIVÄT säily: ankkurilevitys (PAATOKSET 32,
     * js/pallolauta/nostoankkurit.js) kirjoittaa niiden päälle sen
     * pisteen, johon merkki lopulta ladottiin — Pariisissa 33–74 km
     * päähän kaupungista (mitattu 18.9.2026, erä 4). Kaupunkijäsenyys
     * on kuitenkin datan tieto eikä ladonnan: päätös sanoo *"noston
     * OMA paikka"*. Alkuperäinen piste otetaan siksi talteen tässä,
     * ainoassa paikassa, jonka läpi jokainen rivi kulkee.
     */
    const kohdekarttaPaikat = kohdekartanNostopaikat();
    const lisaa = (rivi) => {
      /*
       * KAUPUNKIKARTAN PISTE VOITTAA LADOTUN. Jos päätoimittaja on
       * antanut nostolle pisteen kaupunkilehden kohdekartalla
       * (js/packs/maakartat.js KAUPUNKIKARTAT), se ON noston oma
       * paikka — kartalle ladottu piste on sommittelua.
       */
      const oma = kohdekarttaPaikat.get(rivi.id) ?? null;
      rivit.push({
        ...rivi,
        omaLat: oma?.lat ?? (Number.isFinite(rivi.lat) ? rivi.lat : null),
        omaLng: oma?.lng ?? (Number.isFinite(rivi.lng) ? rivi.lng : null),
        ladontaNro: nro++,
      });
    };
    if (!pack || ui.katselu || game.phase === 'pickstart' || ui.aloituslentoKesken) return rivit;
    const liikkuu = ui.movingPlayerId != null;
    const iso = kohteidenNykyinenIso(ui);
    const pohja = iso ? FOKUS_POHJAT[iso] : null;
    const lehtiNakyy = lehdenOsuus(pohja, nakyva, pack.id) >= LEHDEN_VAHIN_OSUUS;
    portti = null;
    if (lehtiNakyy && !liikkuu) {
      const tiedot = maanKohdetiedot(ui, iso);
      /*
       * MERKKIRAJA JA LÄHIZOOMIPORTTI (ks. PÄÄKARTAN MERKKIRAJA yllä).
       * Portti saa merkit DATAN järjestyksessä ja päättää, mitkä
       * kuuluvat tälle zoomille; `tiedot` kantaa kohdeolion, jolta
       * `lahi`-lippu ja tyyppi luetaan.
       *
       * KOHDEMAA-LIPPU (ks. KATTO EI KOSKE KOHDEMAATA). Tämä kerros
       * kerää merkit vain siitä maasta, jossa pelaaja seisoo ja joka
       * on kartalla korostettuna (js/pallolauta/lauta.js korostusIso =
       * sama kohteidenNykyinenIso), eikä katselutilassa lainkaan —
       * ylempänä tässä funktiossa. Siksi lippu on tässä aina tosi.
       */
      portti = merkkiPortti(
        maanKohdemerkit(pack, iso, pohja, onPoltettu),
        lahizoomiAuki(uloinOsuus),
        (m) => tiedot.get(m.id) ?? m.kohde ?? null,
        { kohdemaa: true },
      );
      for (const m of portti.merkit) {
        const a = asteet(m);
        if (!a) continue;
        const kohde = tiedot.get(m.id) ?? m.kohde;
        if (!kohde) continue;
        lisaa({
          avain: `nosto:${m.id}`,
          id: m.id,
          perhe: 'nosto',
          lat: a.lat,
          lng: a.lon,
          nimi: m.nimi ?? '',
          nimioNakyy: m.nimioNakyy,
          kategoria: m.kategoria,
          symLaji: m.laji,
          puoli: m.puoli ?? 'oikea',
          aihe: nostosymPaakategoria(m.kategoria),
          poltettu: m.poltettu,
          /*
           * NÄKYVÄ KAUPUNKI ILMAN KORTTIA (`vainNimi`, omistaja
           * KARTTAUUDISTUKSEN PAATOKSET 13). Merkki ja nimi ovat
           * kartalla, mutta korttia ei ole eikä sitä saanut tässä
           * erässä kirjoittaa — joten merkki ei myöskään ota
           * napautusta. Rivi jätetään osumalistalta pois alempana
           * (`osumat`), jottei se voi voittaa naapurinoston sormea.
           */
          vainNimi: Boolean(kohde.vainNimi),
          // Kaupunkimerkin nimiö on isompi (ks. KAUPUNKIMERKIN NIMIÖ
          // ON ISOMPI KUIN NOSTON); sama lippu ohjaa piirron ja
          // laatikon, jotta väistö mittaa ruudulla olevaa mittaa.
          kaupunki: kohde.tyyppi === 'kaupunki',
          // MAASTOKOHDE EI SULAUDU AIHEMERKKIIN (ks. MAASTOKOHDE EI
          // SULAUDU AIHEMERKKIIN yllä ja aihemerkit.js ryhmitaNostot).
          maasto: onMaastokohde(kohde),
          /*
           * KAUPUNKIJÄSENYYS (PAATOKSET 27 TARKENNUS 2 kohta 7,
           * js/fokuskohteet.js nostonKaupunkiAvain): saman kaupungin
           * saman aiheen nostot yhdistyvät AINA yhdeksi aihenostoksi,
           * zoomista riippumatta. Kenttä tulee ladonnasta eikä
           * näkymästä, joten se ei muutu kameran mukana.
           */
          kaupunkiAvain: m.kaupunkiAvain ?? null,
          /*
           * PAIKKANIMI DATASTA (PAATOKSET 34 kohta 4, toinen polku):
           * jos pakka sanoo noston paikaksi kaupungin nimen, nosto on
           * kaupungin sisällä ilman koordinaattimittaa — arvioitu
           * koordinaatti ei voi kiistää datan omaa sanaa.
           */
          paikkaNimi: typeof kohde.paikka === 'string' ? kohde.paikka : null,
          avaa: kohde.vainNimi
            ? null
            : ((ankkuri) => avaaFokuskohde(ui, kohde, { ankkuri })),
        });
      }
      // Naapurimaan poltettu muste on myös napautettava (2.9.2026,
      // Bosnia) — ellei lippu pidä fokusta kohdemaassa (ks. VAIN
      // KOHDEMAAN NOSTOT).
      const naapurit = NAYTA_VAIN_KOHDEMAAN_NOSTOT
        ? [] : naapurienPoltetutMerkit(ui, nakyva, onPoltettu);
      for (const m of naapurit) {
        const a = asteet(m);
        if (!a || !m.kohde) continue;
        lisaa({
          avain: `naapuri:${m.iso}:${m.id}`,
          id: m.id,
          perhe: 'nosto',
          lat: a.lat,
          lng: a.lon,
          nimi: m.nimi ?? '',
          nimioNakyy: Boolean(m.nimio),
          kategoria: m.kategoria,
          symLaji: m.laji,
          puoli: m.puoli ?? 'oikea',
          aihe: nostosymPaakategoria(m.kategoria),
          poltettu: true,
          avaa: (ankkuri) => avaaFokuskohde(ui, m.kohde, { ankkuri }),
        });
      }
    }
    /*
     * Eläintäyt: koko laudalla, vasta kun maanosa täyttää ruudun.
     * PORTTI ON NÄKYMÄN KORKEUS, EI LEVEYS (ks. ELÄINTÄKY: SAMA ASIA,
     * OMA LUKU PALLOLLE) — tasokartan oma 90 asteen leveysraja jäi
     * puhelimen pystyruudulla auki joka zoomilla.
     */
    if (alueenMerkitNakyvat(nakyva, ELAINTAKY_NAKYY_KORKEUS) && !liikkuu) {
      for (const t of elaintakyLaudalla(ui)) {
        const a = asteet(t);
        if (!a) continue;
        const tiiviste = nostoladontaTiiviste({
          tunnus: t.tunnus, symboli: 'elain', laji: 'elain', nimio: t.nimio, x: t.x, y: t.y, osat: [],
        });
        lisaa({
          avain: `elain:${t.iso}`,
          id: t.tunnus,
          perhe: 'elain',
          lat: a.lat,
          lng: a.lon,
          nimi: t.nimio,
          nimioNakyy: true,
          kategoria: 'elain',
          symLaji: 'elain',
          puoli: 'oikea',
          aihe: 'elaimet',
          lunastettu: Boolean(game.elaintakyLunastettu?.(t.iso)),
          poltettu: onPoltettu(t.tunnus, tiiviste),
          avaa: () => { if (!ui.busy) avaaElaintaky(ui, t.iso); },
        });
      }
    }
    /*
     * Navat (ks. lohko tiedoston alussa): paikka luetaan kohteen omasta
     * `asteet`-kentästä eikä laudalta. Merkki ei ole koskaan poltettu —
     * laattapyramidi on julisteen projektiota, josta napojen takaiset
     * alueet puuttuvat — joten se on aina elävä H-merkki.
     *
     * PORTTI ON NÄKYMÄN KORKEUS, EI LEVEYS (ks. NAPA-ALUEEN PORTTI
     * MITATAAN KORKEUDESTA): leveys riippuu ruudun kuvasuhteesta, joten
     * leveysportti oli puhelimen pystyruudulla aina auki.
     */
    if (alueenMerkitNakyvat(nakyva, ETELAMANNER_NAKYY_ASTETTA) && !liikkuu) {
      for (const kohde of MAASTOKOHTEET_ATA) {
        const rivi = napanostonRivi(ui, kohde, { avain: `ata:${kohde.id}` });
        if (rivi) lisaa(rivi);
      }
    }
    if (alueenMerkitNakyvat(nakyva, ARKTIS_NAKYY_ASTETTA) && !liikkuu) {
      for (const kohde of MAASTOKOHTEET_ARK) {
        const rivi = napanostonRivi(ui, kohde, { avain: `ark:${kohde.id}` });
        if (rivi) lisaa(rivi);
      }
    }
    // Kevyen kulun vihreä kohtaamispiste (js/fokuspiste.js sääntö).
    const city = game.cityOf?.();
    const piste = city ? fokusvirtaKohtaamispiste(ui, city) : null;
    /*
     * PULUN KARTTAOHJE (karttauudistuksen erä 7) lähtee sieltä, missä
     * pisteen tila lasketaan. Tasokartalla se on js/fokuspiste.js
     * paivitaFokuspiste; pallo latoo merkkinsä täällä eikä aja tuota
     * funktiota lainkaan, joten sama kutsu tarvitaan molempiin.
     * Kertalippu ja ajastin tekevät kutsusta halvan.
     */
    fokusvirtaAarrepisteOhje(ui, city);
    if (piste) {
      /*
       * PISTE POIS NAPPULAN ALTA (omistaja 6.9.2026 ilta: *"aarteen
       * piste syttyy liian lähelle ateenaa, ei pysty painamaan"*):
       * merkki JA osuma siirtyvät, data ei. Nappula ei ota napautuksia
       * (css pointer-events), mutta ilman siirtoa piste ja kaupunki
       * ovat samassa ruutupisteessä ja lähin merkki -sääntö antaa
       * tasapelin kaupungille.
       *
       * SIIRTO LASKETAAN ASTEISSA, EI LAUDAN YKSIKÖISSÄ (mitattu
       * 14.9.2026, js/fokuspiste.js fokuspisteenAsteet). Kaupungin
       * merkki EI ole pallolla laudan kohdassaan vaan omassa
       * pallopisteessään, ja `asteet()` antaa juuri sen — joten sekä
       * kynnys että siirto mitataan siitä pisteestä, jonka pelaaja
       * näkee. Laudan yksiköissä mitattu kynnys jätti Budapestin,
       * Barcelonan, Marseillen ja Helsingin pisteen kaupungin merkin
       * alle (0,1–1,9 px). Tasokartta pitää oman sääntönsä
       * (fokuspisteenSiirto): siellä laudan yksikkö ON merkin mitta.
       */
      const a = fokuspisteenAsteet(asteet({ x: city.x, y: city.y }), asteet(piste));
      if (a) {
        lisaa({
          avain: `piste:${city.id}`,
          id: `piste:${city.id}`,
          perhe: 'piste',
          lat: a.lat,
          lng: a.lon,
          nimi: piste.nimi,
          teko: piste.teko,
          lukittu: Boolean(piste.lukittu),
          nimioNakyy: true,
          aihe: null,
          poltettu: false,
          avaa: () => avaaFokuspiste(ui, city),
        });
      }
    }
    return rivit;
  };

  /*
   * VIUHKAN OMAT MITAT. Lepo on se, minkä verran merkin ruutupiste saa
   * huojua ladonnasta toiseen ilman että viuhka sulkeutuu (kirjaston
   * siirtymä ja pallon pyöristykset liikuttavat pistettä pari
   * pikseliä levossakin); zoomivara on sama ajatus kameran osuudelle.
   */
  const VIUHKAN_LEPO_PX = 12;
  const VIUHKAN_ZOOMIVARA = 0.01;

  /** Avaa viuhkan aihemerkistä; toinen viuhka sulkeutuu samalla. */
  const avaaViuhka = (rivi) => {
    viuhka = {
      avain: rivi.avain, p: { x: rivi.p.x, y: rivi.p.y }, uloinOsuus: viimeisinUloinOsuus,
    };
    ladoUudelleen?.();
    return true;
  };

  /** Sulkee auki olevan viuhkan; palauttaa tosi, jos jokin sulkeutui. */
  const suljeViuhka = () => {
    if (!viuhka) return false;
    viuhka = null;
    ladoUudelleen?.();
    return true;
  };

  /**
   * NAPAUTUS VIUHKAN KOHTAAN: kortti aukeaa kohdan omasta paikasta.
   *
   * Ankkuri on aihemerkin ruutupiste + kohdan siirto — sama kaksi
   * lukua, joilla kohta piirrettiin — jotta kortti nousee siitä, mitä
   * sormi kosketti (js/fokuskohteet.js avaaFokuskohde { ankkuri }).
   * Viuhka sulkeutuu avauksessa: kortti on vastaus, viuhka oli kysymys.
   */
  const napautaViuhkastaan = (rivi, m, asema) => {
    if (ui.dead || ui.busy || typeof m.avaa !== 'function') return false;
    const pohja = ankkuri ? ankkuri(rivi.lat, rivi.lng) : null;
    const kohdanAnkkuri = pohja ? () => {
      const a = pohja();
      return a ? { x: a.x + asema.dx, y: a.y + asema.dy } : null;
    } : undefined;
    viuhka = null;
    m.avaa(kohdanAnkkuri);
    ladoUudelleen?.();
    return true;
  };

  /**
   * AVAA KAUPUNKILIUSKAN kaupunkimerkistä (PAATOKSET 34 kohta 1).
   * `p` on merkin ruutupiste avaushetkellä: lepotesti vertaa siihen.
   * Kamera-ajo (kohta 10) tehdään ENNEN tätä kutsua laudalla, jottei
   * ajon oma siirto sulje juuri avattua liuskaa.
   */
  const avaaLiuska = (rivi, { liiku = false } = {}) => {
    if (!rivi?.p) return false;
    viuhka = null;
    liuska = {
      avain: rivi.avain,
      p: { x: rivi.p.x, y: rivi.p.y },
      uloinOsuus: viimeisinUloinOsuus,
      avattuKategoria: null,
      // Sisäisen kelauksen tila (PAATOKSET 34 kohta 5, ks. paivita).
      kelaus: 0,
      kelausIkkuna: 0,
      kelausRiveja: 0,
      // Siirtymisrivi on olemassa vain, kun lauta tarjosi siirron
      // (js/pallolauta/lauta.js napautaKaupunki) — ks. LIIKU_NIMIO.
      liiku,
    };
    ladoUudelleen?.();
    return true;
  };

  /** Sulkee liuskan; palauttaa tosi, jos jokin sulkeutui. */
  const suljeLiuska = () => {
    if (!liuska) return false;
    liuska = null;
    ladoUudelleen?.();
    return true;
  };

  /*
   * ══════════════════════════════════════════════════════════════════
   * PALLON MERKIT OVAT RASTEREITA — JOTEN PALLON ON MYÖS TILATTAVA
   * NIILLE TARKKUUS (omistaja 16.9.2026, PAATOKSET 31 kohta 2:
   * nimiöt ovat *"jattimaisia ja SUMEITA"*)
   * ══════════════════════════════════════════════════════════════════
   *
   * MITATTU VIKA. Kartan merkki ei ole vektoria vaan yksi <image>,
   * joka on paistettu canvasille PORTAALLA = laitepikseliä kirjaston
   * yksikköä kohti (js/fokusnosto-symbolit.js NOSTOSYM_PORTAAT
   * [1,5 · 3 · 6 · 9]), ja `asetteleNosto` venyttää sen ruudulle
   * CSS-muunnoksella `scale(mitta)`. Portaan tilaa kutsuja —
   * mutta tilaajia oli vain yksi, TASOKARTTA (js/fokuskohteet.js
   * paivitaRasteriporras). Pallolauta ei kutsunut
   * `nostosymAsetaPorras`ta kertaakaan, joten pallolla porras oli se,
   * minkä tasokartta oli viimeksi jättänyt — käytännössä oletus 1,5.
   *
   * Tarve on merkin NÄKYVÄ koko: `mitta × devicePixelRatio`. Mitattu
   * 390 × 844 dpr 2: saapumisnäkymässä tarve 2,09 ja sisimmällä
   * zoomilla 2,91 — eli kuva venytettiin 1,4–1,9-kertaiseksi omasta
   * tarkkuudestaan JO ENNEN nimiökattoa, ja ilman kattoa (kaupunki-
   * merkki 33,8 px) tarve oli 6,1 eli nelinkertainen venytys. Siitä
   * sumeus.
   *
   * KATTO TEKEE TARPEESTA RAJALLISEN. Koska nimiö ei enää kasva yli
   * NOSTON_NIMIO_KATTO_PX:n, suurin mahdollinen tarve on
   * `NOSTON_MITAN_KATTO × tiheys` = 2,91 (dpr 2) tai 4,36 (dpr 3):
   * porras 3 riittää puhelimelle koko zoomivälille ja porras 6
   * retinalle. Tarve lasketaan silti mitatusta suurimmasta mitasta
   * eikä katosta, jotta uloin zoomi ei tilaa lähikuvan rasteria.
   *
   * PORRAS VAIHTUU VAIN LEVOSSA, koska tämä ajetaan ladonnasta, jota
   * lauta kuristaa (LADONNAN_TAHTI_MS). Vaihtuessaan se EI pura
   * kerrosta: `nostosymVirkistaRasterit` vaihtaa vain valmistuvien
   * rasterien osoitteet erissä (kahdeksan merkkiä kehystä kohti).
   */
  const tahdistaRasteriporras = () => {
    if (typeof document === 'undefined') return;
    const tiheys = typeof window === 'undefined' ? 1 : (window.devicePixelRatio || 1);
    // Suurin ruudulla oleva mitta: kaupunkimerkki, jos sellainen on.
    const suurin = datumit.reduce((a, d) => Math.max(a, d.mitta ?? 0), 0)
      || nostonMitta();
    if (!nostosymAsetaPorras(suurin * Math.min(tiheys, 3))) return;
    const juuri = ui?.pallolauta?.kuori ?? document;
    nostosymVirkistaRasterit(juuri);
  };

  /*
   * ══ KIINTEÄT KARTTA-ANKKURIT (PAATOKSET 32 kohdat 1, 2, 5) ══════
   * Perustelu ja algoritmi: js/pallolauta/nostoankkurit.js.
   */
  const ankkurivarasto = luoAnkkurivarasto();
  /** Ankkurointi on päällä, kun lippu sallii ja kamera on mitattavissa. */
  const ankkurointiPaalla = (uloinOsuus) => nostoankkuritSallittu() && uloinOsuus > 0;
  /**
   * Valitsee jokaiselle elävälle nostolle ja aihenostolle kartta-ankkurin
   * KERRAN (kaupungin saapumisnäkymän mitoilla) ja pitää sen: zoomi vain
   * skaalaa ruutupaikan. Kirjoittaa rivin `lat`/`lng`/`p` ankkuriin.
   *
   * VARAUS ON AINA NIMIÖLLINEN, vaikka nimiö olisi juuri nyt piilossa
   * (aihenoston nimiö näkyy vain lähizoomissa, PAATOKSET 27 TARKENNUS
   * 4): muuten ankkurit riippuisivat zoomista juuri sen kentän kautta,
   * jonka takia ne laskettiin.
   */
  const ankkuroi = (piirrettavat, nakyvat, uloinOsuus, esteet, mitta) => {
    if (!ankkurointiPaalla(uloinOsuus)) return;
    const kehys = (p) => ({ x: p.x * uloinOsuus, y: p.y * uloinOsuus });
    const liikkuvat = piirrettavat.filter((r) => r.p
      && (r.perhe === 'nosto' || r.perhe === 'aihemerkki') && !r.kaupunki && !r.poltettu);
    if (!liikkuvat.length) return;
    const ruutuNyt = ruutu?.() ?? { leveys: 0, korkeus: 0 };
    const tunnus = ankkurivarasto.tunnus(null, ruutuNyt);
    /*
     * VAIN UUDET LADOTAAN. Jo ankkuroitu nosto pysyy paikallaan — se
     * on koko sääntö (PAATOKSET 32 kohta 1) — ja uudet väistävät sitä
     * kiinteänä esteenä. Näin kameran pudottamien merkkien paluu ei
     * lado koko kaupunkia uudelleen.
     */
    const laatikkoKehyksessa = (r) => (r.perhe === 'aihemerkki'
      ? aihemerkinLaatikko(kehys(r.p), { ...r, mitta }, {
        kylki: r.puoli ?? 'oikea', nimio: Boolean(r.nimi),
      })
      : nostonLaatikko(kehys(r.p), r, { kylki: r.puoli ?? 'oikea', nimio: Boolean(r.nimi) }));
    /*
     * KIINTEÄT ESTEET SAAPUMISKEHYKSESSÄ (ks. alempana `kiinteat`).
     * Ruutuvakio este (pelinappula) skaalataan PAIKASTA, ei koosta.
     */
    const esteetKehyksessa = (esteet ?? []).map((e) => {
      const kx = ((e.x0 + e.x1) / 2) * uloinOsuus;
      const ky = ((e.y0 + e.y1) / 2) * uloinOsuus;
      const puoliW = (e.x1 - e.x0) / 2;
      const puoliH = (e.y1 - e.y0) / 2;
      return {
        x0: kx - puoliW, y0: ky - puoliH, x1: kx + puoliW, y1: ky + puoliH,
      };
    });
    /*
     * ══════════════════════════════════════════════════════════════
     * ANKKURI EI SAA JÄÄDÄ KIINTEÄN ESTEEN ALLE (omistaja 17.9.2026
     * illalla, Raamattu KARTTAUUDISTUKSEN PAATOKSET 32 TARKENNUS 2
     * kohta b)
     * ══════════════════════════════════════════════════════════════
     *
     * MITATTU VIKA (Pariisi 390 px, kolme zoomia, 17.9.2026 illalla):
     * nimiö *"Tuileriain rauniot…"* makasi pelinappulan päällä KAIKILLA
     * kolmella zoomilla, vaikka nappula on annettu levitykselle
     * kiinteänä esteenä. Syy ei ole levityksessä vaan AJOITUKSESSA:
     * ankkuri valitaan KERRAN ja pidetään (kohta 1), ja pelinappula on
     * merkkikerroksen oma elementti, joka syntyy globe.gl:n omalla
     * kellolla (`tyonna` → kirjaston seuraava kehys). Jos ensimmäinen
     * ladonta ehti ennen nappulan elementtiä, `esteet` oli tyhjä, ja
     * ankkuri lukittui nappulan alle pysyvästi.
     *
     * KORJAUS ON ITSEKORJAAVA EIKÄ UUSI AJOITUSOLETUS: ankkuri, joka
     * on kiinteän esteen alla, katsotaan uudelleen ladottavaksi. Se ei
     * riko kohtaa 1 (*"sama nosto samassa lat/lng-pisteessä kaikilla
     * zoomeilla"*), koska tarkistus tehdään SAAPUMISKEHYKSESSÄ eikä
     * nykyisellä zoomilla: kehys on ahtain mahdollinen näkymä, joten
     * kerran siitä irronnut ankkuri on vapaa joka zoomilla eikä ehto
     * enää laukea. Levitys työntää koko siirron liikkuvalle, joten
     * pako on muutaman kymmenen pikselin mittainen ja hyvin
     * ANKKURIN_SIIRTOKATTO_PX:n sisällä.
     */
    const esteenAlla = (r) => {
      if (!esteetKehyksessa.length) return false;
      const a = ankkurivarasto.lue(r.avain);
      if (!a) return false;
      const p = ruudulla(a.lat, a.lng);
      if (!p) return false;
      const laatikko = laatikkoKehyksessa({ ...r, p });
      return esteetKehyksessa.some((e) => laatikko.x0 < e.x1 && e.x0 < laatikko.x1
        && laatikko.y0 < e.y1 && e.y0 < laatikko.y1);
    };
    const uudetRivit = liikkuvat.filter((r) => !ankkurivarasto.lue(r.avain) || esteenAlla(r));
    if (uudetRivit.length) {
      const levitettavat = uudetRivit.map((r) => ({
        avain: r.avain, ...kehys(r.p), laatikko: laatikkoKehyksessa(r),
      }));
      // Kiinteä muste ei väisty: poltettu laatta, kaupunkimerkit ja
      // laudan antamat esteet (pelinappula).
      const ladotaan = new Set(uudetRivit.map((r) => r.avain));
      /*
       * JO ANKKUROITU ON ESTE OMASSA ANKKURISSAAN, EI DATAPISTEESSÄÄN
       * (korjattu 17.9.2026 illalla). Laatikko laskettiin ennen raa'asta
       * `r.p`:stä, joten levitys väisti paikkaa, jossa merkkiä ei enää
       * ollut. Uudelleen ladottava rivi ei myöskään saa olla oma
       * esteensä — muuten se ei pääsisi mihinkään.
       */
      const ankkurinKehys = (r) => {
        const a = ankkurivarasto.lue(r.avain);
        const p = a ? ruudulla(a.lat, a.lng) : null;
        return p ? laatikkoKehyksessa({ ...r, p }) : null;
      };
      const kiinteat = [
        ...liikkuvat.filter((r) => !ladotaan.has(r.avain) && ankkurivarasto.lue(r.avain))
          .map(ankkurinKehys).filter(Boolean),
        ...piirrettavat.filter((r) => r.p && r.kaupunki)
          .map((r) => nostonLaatikko(kehys(r.p), r, { nimio: Boolean(r.nimi) })),
        ...nakyvat.filter((r) => r.p && r.poltettu && r.perhe !== 'piste')
          .map((r) => nostonLaatikko(kehys(r.p), r, { nimio: Boolean(r.nimi) })),
        // Ruutuvakio este (pelinappula) kehyksessä, ks. esteetKehyksessa.
        ...esteetKehyksessa,
      ];
      const siirrot = levitaMerkit(levitettavat, kiinteat);
      const uudet = new Map();
      for (const r of uudetRivit) {
        const siirto = siirrot.get(r.avain);
        const oma = { lat: r.lat, lng: r.lng };
        if (!siirto || (!siirto.dx && !siirto.dy)) { uudet.set(r.avain, oma); continue; }
        // Kehyksen px → nykyiset px → asteet merkin omassa ympäristössä.
        const asteiksi = pikseleistaAsteiksi(ruudulla, r.lat, r.lng);
        uudet.set(r.avain, asteiksi
          ? asteiksi({ dx: siirto.dx / uloinOsuus, dy: siirto.dy / uloinOsuus })
          : oma);
      }
      ankkurivarasto.aseta(tunnus, uudet);
    }
    for (const r of liikkuvat) {
      const ankkuri = ankkurivarasto.lue(r.avain);
      if (!ankkuri) continue;
      const p = ruudulla(ankkuri.lat, ankkuri.lng);
      if (!p) continue;
      r.lat = ankkuri.lat;
      r.lng = ankkuri.lng;
      r.p = p;
    }
  };

  /**
   * Päivittää kerroksen: kutsutaan levossa (js/pallolauta/lauta.js).
   * Palauttaa elävien laatikot nimiladonnan varauksiksi ja määrän.
   */
  const paivita = ({
    nakyva, katto = NOSTOJEN_KATTO, keskipiste = null, uloinOsuus = 0,
    karttaskaala = 0, vertailuskaala = 0,
    /*
     * KIINTEÄT ESTEET LEVITYKSELLE (PAATOKSET 32 kohta 5): pelinappula
     * ja muu muste, joka ei ole tämän kerroksen omaa eikä voi väistää.
     * Lauta antaa ne ruutulaatikkoina (js/pallolauta/lauta.js
     * ladoLevossa) — kerros ei tunne pelinappulaa itse.
     */
    esteet = [],
  } = {}) => {
    // Kyltti karttaan (ks. KARTTANOSTON KYLTTI ON KARTAN MITTA):
    // sama kerroin kuin kaupunkien nimikylteillä, laudan mittakaavasta.
    /*
     * YKSI KOKO — KAIKKI NOSTOT POLTETUN KARTAN KOKOA (omistaja
     * 17.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET 32 kohta 4:
     * *"Kaikki nostoPallot ja tekstit saisi olla saman kokoisia kuin
     * poltetussa kartassa"*). Poltettu muste on laatassa kiinteänä
     * ruutumittana (nimiö 8,5 px), joten ainoa tapa olla sen kokoinen
     * on olla RUUTUVAKIO: kartan kerroin (PAATOKSET 14) on 1.
     *
     * Tämä kumoaa PAATOKSET 14:n kasvun ja tekee samalla PAATOKSET
     * 31:n 16 px:n katon tarpeettomaksi käytännössä (mitta jää katon
     * alle joka zoomilla) — katto jää kuitenkin paikalleen, koska se
     * on oma päätöksensä ja suojaa myös vastakokeen `?nostokoko=0`
     * vanhaa polkua.
     */
    nostonKarttakerroin = yksiKokoSallittu()
      ? 1
      : nimenKarttakerroin(karttaskaala, vertailuskaala || undefined);
    // Liuska seuraa karttaa myös silloin, kun kartan merkit eivät
    // (ks. LIUSKAN TEKSTIKOKO = KARTTAAN POLTETUN TEKSTIN RUUTUKOKO).
    liuskanKarttakerroin = nimenKarttakerroin(karttaskaala, vertailuskaala || undefined);
    viimeisinUloinOsuus = uloinOsuus;
    const rivit = keraa(nakyva, uloinOsuus);
    rivitNyt = rivit;
    const nakyvat = [];
    for (const r of rivit) {
      const p = ruudulla(r.lat, r.lng);
      if (!p) continue;
      nakyvat.push({ ...r, p, etaisyys: keskipiste ? Math.hypot(p.x - keskipiste.x, p.y - keskipiste.y) : 0 });
    }
    /*
     * Elävät: kohtaamispiste ensin, SITTEN KAUPUNGIT, sitten lähimmät
     * ruudun keskipistettä.
     *
     * KAUPUNKI EI SAA PUDOTA DOM-KATTOON (omistaja 15.9.2026,
     * KARTTAUUDISTUKSEN PAATOKSET 25: *"kohdemaan KAIKKI nostot ja
     * kaupungit piirtyvät heti saapumisnäkymässä"*). Kun katto 21
     * poistui kohdemaasta, eläviä merkkejä on Ranskassa enemmän kuin
     * CSS2D-budjetti (`NOSTOJEN_KATTO` 40, karttapallo.md luku 6)
     * päästää, ja pelkkä etäisyysjärjestys pudotti Strasbourgin,
     * Nizzan ja Lillen — kolme seitsemästä lisäkaupungista, jotka
     * olivat kartalla ennen tätä erää (mitattu 15.9.2026). Merkkiportin
     * oma tärkeysjärjestys (merkinTarkeys: kaupungit ensin) ei auta
     * tässä, koska tämä on eri katto eri syystä; siksi sama järjestys
     * toistetaan tässä. Kaupunkeja on maata kohti kourallinen, joten
     * ne eivät voi täyttää budjettia.
     */
    const jarjestys = (a, b) => ((a.perhe === 'piste') - (b.perhe === 'piste')) * -1
      || (Number(Boolean(b.kaupunki)) - Number(Boolean(a.kaupunki)))
      || (a.etaisyys - b.etaisyys);
    const elavatKaikki = nakyvat.filter((r) => !r.poltettu).sort(jarjestys);
    /*
     * ══ KAUPUNKI ON YKSI PISTE (PAATOKSET 34 kohdat 2-3) ═══════════
     *
     * Kaupungin sisäiset elävät nostot EIVÄT piirry kartalle millään
     * zoomilla: ne ovat kaupunkiliuskan kategorioissa. Raja on noston
     * OMA paikka (js/pallolauta/kaupunkiliuska.js onKaupunginSisainen),
     * joten Versailles, Chartres ja Chambord jäävät kartalle vaikka
     * ovat ankkuroituja Pariisiin. Mitta on maantieteellinen, joten
     * jäsenyys on sama kaikilla zoomeilla (vrt. PAATOKSET 32 kohta 1).
     *
     * SAMA LISTA TÄYTTÄÄ LIUSKAN. Jos suodatus ja liuska laskettaisiin
     * erikseen, kartalta voisi kadota nosto, jota mikään lista ei avaa.
     */
    const omatKaupunkirivit = elavatKaikki.filter((r) => r.kaupunki);
    kaupunkirivitNyt = omatKaupunkirivit;
    /*
     * ══ LAUDAN KAUPUNKI ON MYOS KAUPUNKI (Fablen paatos kerrosrajasta,
     * PAATOKSET 34 TILA) ═══════════════════════════════════════════
     *
     * Ankkuririvi on kaupungin koordinaateissa, sillä ei ole musteta
     * eikä osumaa (`vainNimi`), ja se on olemassa jokaisessa
     * ladonnassa — muuten kaupungin sisaiset nostot jaisivat kartalle
     * aina kun liuska on kiinni, ja vartio 8a mittaa nimenomaan
     * suljettua karttaa. Nimi erottaa sen pakkojen omasta rivistä:
     * jos nostokerroksessa jo ON tämän kaupungin rivi (Lille), lauta
     * ei tuo omaansa, jottei sama kaupunki olisi kahdesti.
     */
    /*
     * KAUPUNGIN KESKUS ON KAUPUNGIN OMA PISTE (Fablen tarkennus
     * 18.9.2026, PAATOKSET 34 kohta 4).
     *
     * ERÄ 4 MITTASI VÄÄRÄÄ ASIAA. Se luki jäsenyyden LEVITETYISTÄ
     * ankkureista (Tuileriain rauniot 33,1 km · Mona Lisan varkaus
     * 50,2 km · Kyyhkyposti 54,6 km · Tuileries 73,9 km) ja päätteli
     * niistä, että laudan kaupungin piste on kymmeniä kilometrejä
     * väärässä paikassa. Se ei ollut: 33–74 km oli ANKKURILEVITYKSEN
     * (PAATOKSET 32) siirto, ei datan paikka. Korjaus on siksi
     * kahtaalla: jäsenyys mitataan noston omasta datapaikasta
     * (`omaLat`/`omaLng`, ks. `lisaa` yllä) ja keskus on kaupungin oma
     * piste.
     *
     * MITATTU 18.9.2026 (tests/kaupunkiliuska.test.mjs · laudan
     * Pariisi `maailmankartta` 5911,1/1440,1 → 48,845 N / 2,333 E):
     * ero oikeaan Pariisiin on **1,9 km**, ja kaupungin omat nostot
     * ovat 0–3 km päässä siitä. Mediaani oli erä 4:n kiertotie
     * väärälle mitalle; se ajautui nostojen ladottujen paikkojen
     * mukana eikä ollut kaupungin paikka lainkaan.
     */
    const laudanRivit = [];
    for (const k of (laudanKaupungit?.() ?? [])) {
      const nimi = k?.nimi ?? k?.name ?? '';
      if (!Number.isFinite(k?.lat) || !Number.isFinite(k?.lng)) continue;
      if (omatKaupunkirivit.some((r) => r.nimi === nimi)) continue;
      const p = ruudulla(k.lat, k.lng);
      if (!p) continue;
      laudanRivit.push({
        avain: laudanAvain(k),
        id: k.id,
        perhe: 'nosto',
        ankkuri: true,
        kaupunki: true,
        vainNimi: true,
        poltettu: false,
        nimi,
        nimioNakyy: false,
        lat: k.lat,
        lng: k.lng,
        // Kaupungin oma piste myös datapaikkana: jäsenyyden keskus
        // luetaan aina samasta kentästä kuin nostojen paikka.
        omaLat: k.lat,
        omaLng: k.lng,
        p,
        etaisyys: keskipiste ? Math.hypot(p.x - keskipiste.x, p.y - keskipiste.y) : 0,
      });
    }
    laudanAnkkurit = laudanRivit;
    const kaupunkirivit = [...omatKaupunkirivit, ...laudanRivit];
    /*
     * ══ JÄSENYYS LUETAAN KOKO DATASTA, EI RUUDUSTA ═════════════════
     * (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 4; Fablen
     * tarkistus 18.9.2026: liuskassa oli 390 px:llä 16 nostoa ja
     * 1400 px:llä 10.)
     *
     * MITATTU JUURISYY: `elavatKaikki` on `nakyvat`-lista, ja
     * `nakyvat` syntyy suodattamalla `ruudulla(lat, lng)` — joka
     * palauttaa nullin, kun piste on pallon takana TAI ruudun
     * ulkopuolella (js/pallolauta/lauta.js `ruudulla`). Pariisin
     * nostot ovat ankkurilevityksen jäljiltä 33-74 km päässä
     * kaupungista (PAATOKSET 32, erä 5), joten osa niistä jäi
     * leveällä ruudulla kuvan ulkopuolelle ja katosi liuskasta.
     * Ruutu ei ole jäsenyyden mitta: päätös sanoo *"noston OMA
     * paikka"*, ja se on datan tieto.
     *
     * Lähde on siis `keraa`n rivit SELLAISENAAN — samat rivit, joista
     * `nakyvat` suodatetaan. Liuskan rivi ei tarvitse ruutupistettä:
     * se piirtyy kaupunkimerkin omaan elementtiin (ks. KAUPUNKILIUSKAN
     * RIVIT), ja vain kaupungin oman rivin `p` on ripustuspiste.
     * Kartan siivous (`sisaisetAvaimet`) kohdistuu yhä ruudulla
     * oleviin riveihin, joten kartalta ei voi pudota mitään, mitä
     * liuska ei näytä.
     */
    const liuskanLahde = rivit.filter((r) => !r.poltettu);
    sisaisetKaupungeittain = new Map();
    const sisaisetAvaimet = new Set();
    for (const city of kaupunkirivit) {
      /*
       * Jäsenyyden keskus on kaupungin OMA paikka — laudan kaupungilla
       * sen ankkuririvin `omaLat`/`omaLng` (kaupunkia ei levitetä,
       * mutta kenttä on silti oikea lähde) ja pakan näkyvällä
       * kaupungilla (Lille) sen datapaikka. Säde mitataan tästä
       * pisteestä noston omaan datapaikkaan, ei ladottuun.
       */
      const keskus = nostonOmaPaikka(city) ?? city;
      const omat = liuskanLahde.filter((r) => r.perhe === 'nosto' && !r.kaupunki
        && !r.vainNimi && typeof r.avaa === 'function'
        && onKaupunginSisainen(r, keskus));
      if (!omat.length) continue;
      sisaisetKaupungeittain.set(city.avain, omat);
      for (const r of omat) sisaisetAvaimet.add(r.avain);
    }
    liuskaanSiirretyt = sisaisetAvaimet;
    const elavat = elavatKaikki.filter((r) => !sisaisetAvaimet.has(r.avain));
    const mittaNyt = nostonMitta();
    /*
     * SAMAN AIHEEN LÄHEKKÄISET NOSTOT YHDEKSI AIHEMERKIKSI (omistaja
     * 15.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET 27; säännöt ja
     * mitat js/pallolauta/aihemerkit.js).
     *
     * EHTO ON LIMITYS, EI ZOOMIPORRAS (korjattu 16.9.2026, Raamattu
     * KARTTAUUDISTUKSEN PAATOKSET 31 kohta 2; sääntö on PAATOKSET 27
     * kohta 3 sellaisenaan: merkit hajoavat omikseen *"yhden zoom-
     * portaan sisään TAI KUN NOSTOT MAHTUVAT LIMITTYMÄTTÄ"*).
     *
     * MITÄ ZOOMIPORTTI TEKI (mitattu Chromium 390 × 844 dpr 2,
     * Ranska-tallenne, pelaaja Pariisissa, 16.9.2026): ryhmitys
     * sammui heti kun `lahizoomiAuki(uloinOsuus)` — eli kun kamera
     * ohitti 0,7 uloimmasta — ja sen jälkeen Pariisin 21 nostoa
     * latoivat nimiönsä yksi kerrallaan. Ne EIVÄT kuitenkaan olleet
     * erkaantuneet. Rykelmän omat ruutupisteet (ei sovittelun
     * siirtämät) zoomeittain:
     *
     *   osuus   px/yks   rykelmän ala      lyhin väli   pareja ≤ 44 px
     *   1,000   2,12     26,6 × 135,4 px   13,4 px      97 / 210
     *   0,700   3,03     38,0 × 193,3 px   19,1 px      65 / 210
     *   0,500   4,25     53,2 × 270,6 px   26,7 px      19 / 210
     *   0,341   6,23     78,1 × 396,9 px   39,2 px      19 / 210
     *
     * Uloszoomauksen esto pysähtyy 0,341:een, joten LYHIN VÄLI EI
     * KOSKAAN YLITÄ SORMEN 44 px:ää (RYHMITYKSEN_ETAISYYS_PX):
     * rykelmä ei voi hajota kokonaan millään pelin sallimalla
     * zoomilla puhelimella. Portti kuitenkin sammutti ryhmityksen jo
     * 0,7:ssä, jolloin jokainen 21:stä latoi oman nimiönsä. Nimiö oli
     * silloin 25 px korkea ja jopa 239 px leveä (*Torni
     * romuraudaksi*), joten sovittelun oli singottava ne tikapuiksi,
     * ja viisi laatikkoa valui 373,6 px:n kotelon laidoista ulos:
     * pelaajalle jäi kasa palloja ja viisi päällekkäistä nimeä. Juuri
     * tämän omistaja näki (*"iso osa nostoista on jossain piilossa"*).
     *
     * PORTIN PERUSTELU KAATUI RUUTUPIKSELIKATTOON. Portti oli
     * olemassa siksi, ettei limitys voinut purkautua itsestään, kun
     * nimiö kasvoi samaa tahtia kuin merkkien väli (ks.
     * js/pallolauta/aihemerkit.js). Nimiöllä on nyt katto
     * (NOSTON_NIMIO_KATTO_PX), joten katon yläpuolella teksti seisoo
     * ja väli kasvaa: limitys purkautuu zoomaamalla siellä, missä
     * merkit oikeasti erkanevat, ja rykelmä pysyy aihemerkkinä
     * siellä, missä ne eivät erkane. Ryhmitys noudattaa siis omaa
     * mittaansa eikä kameran kelloa.
     *
     * RYHMÄÄN KELPAAVAT VAIN ELÄVÄT KOHDENOSTOT. Poltettu muste on
     * laatassa eikä sitä voi piilottaa; kaupunkimerkki on kartan
     * hierarkiaa eikä nosto; kohtaamispiste ja eläintäky ovat omia
     * merkkejään; nimikyltti (`vainNimi`) ei avaa mitään.
     */
    const ryhmitysPaalla = ryhmitysSallittu();
    const ehdokkaat = ryhmitysPaalla
      ? elavat.filter((r) => r.perhe === 'nosto' && r.aihe && !r.kaupunki
        && !r.vainNimi && typeof r.avaa === 'function')
      : [];
    // VASTAKOE `?aihekaupunki=0` (ks. kaupunkiYhdistysSallittu):
    // kaupunkijäsenyys pois, jolloin jäljelle jää pelkkä mitta.
    const ryhmitettavat = kaupunkiYhdistysSallittu()
      ? ehdokkaat : ehdokkaat.map((r) => ({ ...r, kaupunkiAvain: null }));
    /*
     * RYHMITYS SAAPUMISKEHYKSESSÄ (PAATOKSET 32 kohta 1; perustelu
     * js/pallolauta/nostoankkurit.js SAAPUMISKEHYS). Ryhmityksen
     * kynnykset ovat ruutupikseleitä (limitys ja 44 px), joten
     * kaupungin ulkopuoliset rykelmät hajosivat ja syntyivät
     * uudelleen zoomatessa — ja aihemerkin keskipiste hyppäsi mukana.
     * Kun pisteet skaalataan uloimman zoomin kehykseen, kynnys mittaa
     * merkkien MAANTIETEELLISTÄ etäisyyttä ja jäsenyys on sama
     * kaikilla zoomeilla. Kaupungin oma jäsenyys (PAATOKSET 27
     * TARKENNUS 2 kohta 7) oli jo zoomista riippumaton.
     */
    const saapumiskehys = ankkurointiPaalla(uloinOsuus)
      ? (p) => ({ x: p.x * uloinOsuus, y: p.y * uloinOsuus })
      : (p) => p;
    const ryhmitysRivit = ankkurointiPaalla(uloinOsuus)
      ? ryhmitettavat.map((r) => ({ ...r, p: saapumiskehys(r.p) }))
      : ryhmitettavat;
    const alkuperaiset = new Map(ryhmitettavat.map((r) => [r.avain, r]));
    const { ryhmat: ryhmatRaaka } = ryhmitysPaalla
      ? ryhmitaNostot(ryhmitysRivit, (r) => nostonLaatikko(r.p, r))
      : { ryhmat: [] };
    const ryhmat = ryhmatRaaka.map((kasa) => kasa.map((r) => alkuperaiset.get(r.avain) ?? r));
    const ryhmassa = new Set();
    ryhmitetytIdt = new Set();
    for (const kasa of ryhmat) {
      for (const r of kasa) { ryhmassa.add(r.avain); ryhmitetytIdt.add(r.id); }
    }
    /*
     * AIHENOSTON NIMIÖ ON TÄRKEIMMÄN NOSTON NIMI + `…` (omistaja
     * 16.9.2026 klo 19.00 UTC, Raamattu PAATOKSET 27 TARKENNUS 2
     * kohta 8; muoto js/pallolauta/aihemerkit.js aihenostonNimio).
     *
     * TÄRKEIN ON PAKETIN ENSIMMÄINEN LADONNASSA, EI RUUDULLA.
     * Ryhmän jäsenet järjestetään `ladontaNro`:n mukaan — siis siihen
     * järjestykseen, jossa maan kohdemerkit syntyvät datasta
     * (js/fokuskohteet.js maanKohdemerkit). Kaksi syytä, molemmat
     * mitattuja 16.9.2026 (Chromium, Pariisi 390 × 844):
     *
     *   a) SE ON OMISTAJAN OMA ESIMERKKI. Pariisin skandaalirykelmän
     *      ensimmäinen ladottu on *Mona Lisan varkaus* — täsmälleen se
     *      nimi, jonka omistaja kirjoitti tarkennukseen (*"esim. 'Mona
     *      Lisan varkaus…'"*).
     *   b) SE EI VAIHDU KAMERAN MUKANA. Ruutujärjestys (`jarjestys`:
     *      lähimmät ruudun keskipistettä) antoi saman rykelmän
     *      nimiöksi saapumisnäkymässä *Kaulanauhajuttu…* ja
     *      lähizoomissa *Carmenin ensi-ilta…*: nimi olisi vaihtunut
     *      joka panoroinnissa. Sama luku on myös aihenoston AVAIN,
     *      joten vakaa järjestys pitää auki olevan viuhkan auki.
     *
     * Jäsenten järjestys on samalla VIUHKAN järjestys, joten kaari
     * alkaa siitä nostosta, jonka nimi on pallon kyljessä.
     */
    /*
     * NIMIÖ VAIN LÄHIZOOMISSA (PAATOKSET 27 TARKENNUS 4 kohta 10; ks.
     * AIHENOSTON NIMIÖ VAIN LÄHIZOOMISSA yllä). Luku on koko ladonnan
     * yhteinen, koska kynnys on kameran eikä merkin ominaisuus.
     */
    const aihenimioLahella = aihenimionKynnysSallittu()
      ? aihenostonNimioNakyy(uloinOsuus)
      : true;
    const aiherivit = ryhmat.map((kasaRaaka) => {
      const kasa = [...kasaRaaka].sort((a, b) => (a.ladontaNro ?? 0) - (b.ladontaNro ?? 0));
      const lat = kasa.reduce((a, r) => a + r.lat, 0) / kasa.length;
      const lng = kasa.reduce((a, r) => a + r.lng, 0) / kasa.length;
      const p = ruudulla(lat, lng) ?? kasa[0].p;
      const tarkein = kasa[0];
      const nimio = aihenostonNimio(tarkein.nimi);
      return {
        avain: `aihemerkki:${tarkein.avain}`,
        id: `aihemerkki:${tarkein.id}`,
        perhe: 'aihemerkki',
        lat,
        lng,
        /*
         * RYHMÄN OMA DATAPAIKKA on jäsenten datapaikkojen keskiarvo,
         * ei ladottujen (PAATOKSET 34 kohta 4). Ryhmä syntyy vasta
         * kaupungin sisäisten suodatuksen JÄLKEEN, joten tämä ei
         * ratkaise jäsenyyttä — mutta savukkeen vartio lukee sen, ja
         * ilman kenttää se putoaisi ladottuun keskiarvoon.
         */
        omaLat: kasa.reduce((a, r) => a + (nostonOmaPaikka(r)?.lat ?? r.lat), 0) / kasa.length,
        omaLng: kasa.reduce((a, r) => a + (nostonOmaPaikka(r)?.lng ?? r.lng), 0) / kasa.length,
        p,
        etaisyys: Math.min(...kasa.map((r) => r.etaisyys)),
        aihe: tarkein.aihe,
        kategoria: tarkein.kategoria,
        symLaji: tarkein.symLaji,
        nimi: nimio,
        // Aiheen oma nimi jää saavutettavuustekstiin (selitteen taulu).
        aiheNimi: aiheenNimi(tarkein.aihe),
        kaupunkiAvain: tarkein.kaupunkiAvain ?? null,
        puoli: tarkein.puoli ?? 'oikea',
        maara: kasa.length,
        jasenet: kasa,
        nimioNakyy: Boolean(nimio) && aihenimioLahella,
        poltettu: false,
        avaa: null,
      };
    });
    for (const r of aiherivit) r.avaa = () => avaaViuhka(r);
    /*
     * VIUHKA SULKEUTUU ZOOMISTA JA PANOROINNISTA (PAATOKSET 27 kohta
     * 2). Kerros ei kuuntele kameraa itse — se näkee sen ladonnassa:
     * jos merkin ruutupiste on siirtynyt VIUHKAN_LEPO_PX:ää enemmän
     * tai kameran osuus uloimmasta on muuttunut, ele oli kameran ele
     * ja viuhka on mennyttä. Sama sulku hoitaa myös sen, että ryhmä
     * itse katosi (zoomi sisään hajotti sen).
     */
    /*
     * ANKKURIT ENNEN VIUHKAN LEPOTESTIÄ: testi vertaa merkin
     * ruutupistettä avaushetkeen, ja ankkuroimaton piste eroaisi
     * ankkuroidusta aina — viuhka sulkeutuisi heti auettuaan.
     */
    ankkuroi([...elavat.filter((r) => !ryhmassa.has(r.avain)), ...aiherivit],
      nakyvat, uloinOsuus, esteet, mittaNyt);
    if (viuhka) {
      const rivi = aiherivit.find((r) => r.avain === viuhka.avain);
      const siirtyi = rivi
        ? Math.hypot(rivi.p.x - viuhka.p.x, rivi.p.y - viuhka.p.y) > VIUHKAN_LEPO_PX
        : true;
      const zoomasi = Math.abs(uloinOsuus - viuhka.uloinOsuus)
        > VIUHKAN_ZOOMIVARA * Math.max(uloinOsuus, viuhka.uloinOsuus, 1e-6);
      if (!rivi || siirtyi || zoomasi) viuhka = null;
    }
    /*
     * LIUSKA SULKEUTUU ZOOMISTA JA PANOROINNISTA samalla lepotestillä
     * kuin viuhka. Avaushetken `p` on kirjattu ANKKUROIDUSTA
     * ruutupisteestä (avaaLiuska ajetaan ladonnan jälkeen), joten
     * testi ei laukea heti auettuaan (PAATOKSET 34 kohta 1).
     */
    /*
     * ANKKURIRIVI MUKAAN VASTA KUN LIUSKA ON AUKI: se on ainoa, joka
     * maksaa CSS2D-merkin. Kiinni ollessaan laudan kaupunki elaa vain
     * `sisaisetKaupungeittain`-laskennassa (kartan siivous, kohta 3).
     */
    const ankkuriRivit = liuska
      ? laudanRivit.filter((r) => r.avain === liuska.avain)
      : [];
    const elavatJaAnkkurit = [...elavat, ...ankkuriRivit];
    if (liuska) {
      const rivi = elavatJaAnkkurit.find((r) => r.avain === liuska.avain);
      const siirtyi = rivi
        ? Math.hypot(rivi.p.x - liuska.p.x, rivi.p.y - liuska.p.y) > VIUHKAN_LEPO_PX
        : true;
      const zoomasi = Math.abs(uloinOsuus - liuska.uloinOsuus)
        > VIUHKAN_ZOOMIVARA * Math.max(uloinOsuus, liuska.uloinOsuus, 1e-6);
      if (!rivi || siirtyi || zoomasi) liuska = null;
    }
    const piirrettavat = [...elavat.filter((r) => !ryhmassa.has(r.avain)), ...aiherivit]
      .sort(jarjestys);
    /*
     * ANKKURI EI KILPAILE DOM-KATOSTA. Se lisataan katon JALKEEN:
     * ilman sita liuska voisi jaada auki ilman elementtia, jolloin
     * napautus avaisi sen ja mitaan ei nakyisi (juuri se vika, jonka
     * era 3 mittasi).
     */
    const naytetaan = [...piirrettavat.slice(0, Math.max(0, katto)), ...ankkuriRivit];
    datumit = naytetaan.map((r) => (r.perhe === 'aihemerkki' ? {
      avain: r.avain,
      mitta: mittaNyt,
      laji: 'nosto',
      id: r.id,
      perhe: r.perhe,
      lat: r.lat,
      lng: r.lng,
      nimi: r.nimi,
      aiheNimi: r.aiheNimi,
      maara: r.maara,
      aihe: r.aihe,
      kategoria: r.kategoria,
      symLaji: r.symLaji,
      // Aihenostolla on nimiö (PAATOKSET 27 TARKENNUS 2 kohta 8), ja
      // sen myötä myös kylki ja sovittelun siirto kuten nostoilla.
      nimioNakyy: Boolean(r.nimioNakyy && r.nimi),
      puoli: r.puoli ?? 'oikea',
      dx: 0,
      dy: 0,
      avattu: viuhka?.avain === r.avain,
      // Viuhka täytetään alempana, kun kaari on laskettu; kenttä on
      // oltava tässä, koska datum on pysyvä (merkit.aseta Object.assign).
      viuhka: null,
      elementti: aihemerkkiElementti,
      asettele: asetteleAihemerkki,
    } : {
      avain: r.avain,
      // Liuskan ankkuri on nakymaton: sillä ei ole symbolia eika
      // nimioa, vain `.pallolauta-viuhka`-ryhma liuskaa varten.
      ankkuri: Boolean(r.ankkuri),
      // Kaupunki on isompi kuin nosto (merkinKerroin) — mutta nimiön
      // ruutupikselikatto katkaisee molemmat samaan 16 px:iin
      // (ks. NIMIÖLLÄ ON RUUTUPIKSELIKATTO).
      mitta: nostonMitta(merkinKerroin(r)),
      kaupunki: Boolean(r.kaupunki),
      poltettu: Boolean(r.poltettu),
      laji: r.perhe === 'piste' ? 'piste' : 'nosto',
      id: r.id,
      perhe: r.perhe,
      lat: r.lat,
      lng: r.lng,
      nimi: r.nimi,
      teko: r.teko ?? null,
      lukittu: Boolean(r.lukittu),
      nimioNakyy: r.nimioNakyy,
      kategoria: r.kategoria ?? null,
      symLaji: r.symLaji ?? null,
      puoli: r.puoli ?? 'oikea',
      dx: 0,
      dy: 0,
      aihe: r.aihe ?? null,
      lunastettu: Boolean(r.lunastettu),
      elementti: r.perhe === 'piste' ? pisteElementti : nostoElementti,
      asettele: r.perhe === 'piste' ? asetteleFokuspiste : asetteleNosto,
    }));
    /*
     * VIUHKAN KAARI LASKETAAN TÄSSÄ, koska vain ladonta tietää merkin
     * ruutupisteen ja ruudun koon. Kohdat eivät ole omia merkkejään
     * vaan aihemerkin oman datumin kenttä, jonka merkin `asettele`
     * piirtää (ks. js/pallolauta/aihemerkit.js VIUHKA PIIRTYY
     * AIHEMERKIN OMAAN ELEMENTTIIN) — ne eivät siis kuluta
     * CSS2D-kattoa eivätkä odota kirjaston seuraavaa kehystä.
     * Sama lista jää osumatestin käyttöön (viuhkanKohdat).
     */
    viuhkanKohdat = [];
    piilotetutListanAlta = [];
    if (viuhka) {
      const rivi = naytetaan.find((r) => r.avain === viuhka.avain);
      if (!rivi) viuhka = null;
      else {
        const leveydet = rivi.jasenet.map((m) => viuhkanNimioLeveys(
          m.nimi ? nostosymNimioMitta(m.nimi, m.symLaji).leveys : 0, mittaNyt,
        ));
        /*
         * ══ LISTA EI KOSKAAN TOISEN TEKSTIN PÄÄLLE ════════════════
         * (omistaja 17.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET 32
         * kohta 5: *"Yksikään teksti ei saa mennä toisen päälle."*)
         *
         * MITATTU VIKA (viuhkalistan erä, PR #2566, kaappaus 390 px):
         * listan rivit ladottiin *Kyyhkyposti…*- ja *Tuileriain
         * rauniot…* -nimiöiden päälle. Juurisyitä oli kaksi: muiden
         * nostojen NIMIÖT eivät olleet esteitä lainkaan (`laatikot` on
         * ikonien ja poltetun musteen joukko, ilman elävien nimiöitä),
         * ja este oli pelkkä SAKKO — ahtaassa paikassa pienin sakko on
         * silti päällekkäisyys.
         *
         * KAKSI ESTELUOKKAA. Kaupungin nimi ja pelinappula ovat
         * KOVIA: niitä ei voi piilottaa, joten lista väistää niitä
         * (KOVAN_ESTEEN_PAINO). Muiden nostojen nimiöt ja merkit ovat
         * yhtä lailla esteitä, mutta jos lista ei mahdu ruudulle
         * limittymättä, ne PIILOTETAAN listan ajaksi ja palautetaan
         * sulkiessa — sillä lista on se, jota juuri luetaan. Nimiö
         * piiloutuu ensin ja merkki vain, jos lista peittää senkin.
         */
        /*
         * ESTEET ON TÄSSÄ LISTA, EI FUNKTIO (mitattu 18.9.2026,
         * savuke-pariisi-lahizoom: `TypeError: esteet is not a
         * function`). `luoNostot`in valinta `esteet` ON funktio, mutta
         * `paivita`n oma parametri samannimisenä varjostaa sen ja on
         * laudan antama LAATIKKOLISTA. Kutsu `esteet?.()` kaatoi siis
         * koko ladonnan heti, kun lista avautui — ja juuri siksi myös
         * aihenostojen viuhka oli rikki (Raamattu, PAATOKSET 34 TILA).
         */
        const kovat = [...viimeisimmatNimet, ...(Array.isArray(esteet) ? esteet : [])]
          .filter(Boolean)
          .map((e) => ({ ...e, paino: KOVAN_ESTEEN_PAINO }));
        /*
         * Muiden nostojen muste TÄMÄN ladonnan asennoissa: ikonin ruutu
         * ja nimiöllinen laatikko erikseen, jotta piilotus osaa ottaa
         * ensin nimiön ja vasta sitten merkin. Rivin OMA kylki (r.puoli)
         * kelpaa: sovittelu ajetaan vasta ladonnan jälkeen, ja sen
         * siirto on muutama pikseli.
         */
        const nostomuste = [];
        naytetaan.forEach((r2, i2) => {
          if (r2 === rivi || r2.perhe === 'piste' || !r2.p) return;
          const datum2 = datumit[i2];
          if (!datum2) return;
          const laatikko = (nimio) => (r2.perhe === 'aihemerkki'
            ? aihemerkinLaatikko(r2.p, datum2, { dx: 0, dy: 0, kylki: r2.puoli ?? 'oikea', nimio })
            : nostonLaatikko(r2.p, r2, { dx: 0, dy: 0, kylki: r2.puoli ?? 'oikea', nimio }));
          const merkki = laatikko(false);
          nostomuste.push({ ...merkki, avain: r2.avain, osa: 'merkki' });
          if (r2.nimioNakyy && r2.nimi) {
            nostomuste.push({ ...laatikko(true), avain: r2.avain, osa: 'nimio' });
          }
        });
        const listanEsteet = [...kovat, ...nostomuste, ...laatikot];
        const {
          puoli, asemat, leveys: listaLeveys, pohja,
        } = viuhkanAsemat({
          p: rivi.p,
          ruutu: ruutu?.() ?? { leveys: 1400, korkeus: 900 },
          leveydet,
          esteet: listanEsteet,
        });
        /*
         * PIILOTUS: LISTAN ALLE EI JÄÄ TEKSTIÄ. Lista on nyt siinä
         * asennossa, jossa se peittää vähiten — ja jos se yhä osuu
         * toisen noston nimiöön tai merkkiin, se muste väistyy
         * PIILOUTUMALLA listan ajaksi. Piilotus kirjoitetaan datumiin
         * ennen `merkit.aseta`a, joten se näkyy samalla kehyksellä kuin
         * lista; kun lista sulkeutuu, seuraava ladonta rakentaa datumit
         * taas rivin omista kentistä eikä piilotusta ole (palautus on
         * siis paluu normaaliin, ei erillinen tila).
         */
        const listanLaatikot = asemat.map((a) => {
          const l = kohdanLaatikko(a.dx, a.dy, listaLeveys, puoli);
          return {
            x0: rivi.p.x + l.x0,
            y0: rivi.p.y + l.y0,
            x1: rivi.p.x + l.x1,
            y1: rivi.p.y + l.y1,
          };
        });
        const osuuListaan = (e) => listanLaatikot.some((l) => l.x0 < e.x1 && e.x0 < l.x1
          && l.y0 < e.y1 && e.y0 < l.y1);
        piilotetutListanAlta = [];
        for (const e of nostomuste) {
          if (!osuuListaan(e)) continue;
          const i2 = naytetaan.findIndex((r2) => r2.avain === e.avain);
          const datum2 = i2 >= 0 ? datumit[i2] : null;
          if (!datum2) continue;
          if (e.osa === 'merkki') datum2.piiloListanAlla = true;
          else datum2.nimioNakyy = false;
          piilotetutListanAlta.push({ avain: e.avain, osa: e.osa });
        }
        // Listan rivit ovat samanlevyisiä: yksi leveys piirtoon,
        // osumapintaan ja mittaukseen.
        viuhkanKohdat = rivi.jasenet.map((m, i) => ({
          m, rivi, asema: asemat[i], leveys: listaLeveys, puoli,
        }));
        // Kohdat ovat aihemerkin oman datumin kenttä, eivät omia
        // merkkejään (ks. js/pallolauta/aihemerkit.js VIUHKA PIIRTYY
        // AIHEMERKIN OMAAN ELEMENTTIIN).
        const datum = datumit[naytetaan.indexOf(rivi)];
        if (datum) {
          datum.viuhka = rivi.jasenet.map((m, i) => ({
            id: m.id,
            nimi: m.nimi,
            dx: asemat[i].dx,
            dy: asemat[i].dy,
            puoli,
            leveys: listaLeveys,
            mitta: mittaNyt,
            piirra: (g, kylki) => piirraNostosymKartalle(g, m.kategoria, m.nimi, m.symLaji, kylki),
          }));
          // Listan kehyksetön pohja (yksi laatikko kaikkien rivien alle).
          datum.viuhkaPohja = pohja;
        }
      }
    }
    /*
     * ══ KAUPUNKILIUSKAN RIVIT (PAATOKSET 34 kohdat 1 ja 5-9) ═══════
     *
     * Rakenne tulee mallista (js/pallolauta/kaupunkiliuska.js
     * liuskanRivit), asemat samasta koneesta kuin viuhkalla
     * (viuhkanAsemat): kovat esteet = kaupungin nimi ja pelinappula,
     * pehmeät = muiden nostojen muste. Rivit piirtyvät kaupunkimerkin
     * omaan elementtiin (asetteleNosto), eivät omiksi merkeikseen.
     *
     * LISTA ON KESKITETTY, JA KARTTA TEKEE SILLE TILAA (PAATOKSET 34
     * kohta 12, omistaja sanatarkasti: *"Lista voisi olla
     * keskitetysti sekä ylös että alas ja kartta voisi liikkua
     * automaattisesti niin että oikealle puolelle tulis lisää
     * tilaa"*). Tämä KUMOAA erä 6:n alaspäin kasvavan listan: siellä
     * lista väisti esteitä itse, tässä kartta ajetaan asentoon, jossa
     * esteitä ei ole. Kolme sääntöä siinä järjestyksessä kuin ne
     * ratkaistaan:
     *
     * 1. KAMERA AJAA ENSIN (js/pallolauta/lauta.js napautaPintaan,
     *    `liuskanTilantarve`): kaupunkimerkki viedään ruudun
     *    keskilinjan VASEMMALLE puolelle, jotta liuskalle jää tilaa
     *    oikealle, ja pystysuunnassa asentoon, jossa keskitetty lista
     *    mahtuu ylälaidan kalusteiden ja pulun väliin.
     * 2. LISTA ON KESKITETTY merkin kohdalle (`kasvu: 'keskitetty'`,
     *    viuhkan oma käytös): se kasvaa yhtä paljon ylös ja alas.
     *    Puoli valitaan kartan keskeltä poispäin, joten vasemmalle
     *    ajettu merkki saa listansa oikealle itsestään. Kovat esteet
     *    (kaupungin nimi, nappula, pulu, Liiku, paikkarivi) painavat
     *    50-kertaisesti, joten ne väistyvät ennen pehmeää mustetta, ja
     *    riviväli kutistuu ennen kuin lista siirtyy niiden päälle.
     * 3. VASTA SITTEN KELAUS: jos tiheinkään keskitetty lista ei mahdu
     *    (keskitettyMahtuvatRivit), liuska näyttää ikkunan ja
     *    kelausrivit (kelattuLiuska) sen sijaan että ylittäisi
     *    esteet.
     */
    liuskanKohdat = [];
    if (liuska) {
      const rivi = naytetaan.find((r) => r.avain === liuska.avain);
      if (!rivi) liuska = null;
      else {
        const omat = sisaisetKaupungeittain.get(rivi.avain) ?? [];
        const ruutuNyt = ruutu?.() ?? { leveys: 1400, korkeus: 900 };
        const kaikkiRivit = liuskanRivit({
          kaupunki: rivi,
          nostot: omat,
          avattuKategoria: liuska.avattuKategoria,
          liiku: Boolean(liuska.liiku),
        });
        /*
         * KAUPUNGIN NIMI LUETAAN TUOREENA (Fablen tarkistus 18.9.2026).
         * `viimeisimmatNimet` on sovittelun jättämä jälki, ja sovittelu
         * ajetaan VASTA `paivita`n jälkeen (js/pallolauta/lauta.js
         * ladoLevossa) — liuskan ladonta näki siis edellisen ladonnan
         * laatikot. Kamera-ajo (kohta 10) siirtää karttaa juuri ennen
         * avausta, joten yhden ladonnan vanha laatikko on väärässä
         * paikassa täsmälleen silloin kun sitä eniten tarvitaan.
         * `nimienLaatikot` on laudan antama lukufunktio samaan
         * kerrokseen (js/pallolauta/nimet.js `laatikot`).
         */
        const nimiLaatikot = (() => {
          const tuoreet = nimienLaatikot?.() ?? null;
          return Array.isArray(tuoreet) && tuoreet.length ? tuoreet : viimeisimmatNimet;
        })();
        // Sama varjostus kuin viuhkalla (ks. ESTEET ON TÄSSÄ LISTA).
        const kovat = [...nimiLaatikot, ...(Array.isArray(esteet) ? esteet : [])]
          .filter(Boolean)
          .map((e) => ({ ...e, paino: KOVAN_ESTEEN_PAINO }));
        const listanEsteet = [...kovat, ...laatikot];
        /*
         * VAAKAPAKO: ehdokkaat ovat etäisyyksiä merkistä kovien
         * esteiden ULKOREUNAAN sillä puolella, jolle lista kasvaa.
         * Nolla on aina ensin (vapaa paikka voittaa), ja listan oma
         * reunakiinnitys leikkaa liian suuret pois — ehdokas, joka ei
         * mahdu ruudulle, päätyy samaan asentoon kuin pienempi eikä
         * voi siksi voittaa sitä (tasapelin ratkaisee järjestys).
         */
        const vaakaEhdokkaat = [0];
        for (const e of kovat) {
          if (!Number.isFinite(e?.x0) || !Number.isFinite(e?.x1)) continue;
          if (!Number.isFinite(e?.y0) || !Number.isFinite(e?.y1)) continue;
          for (const reuna of [e.x1 - rivi.p.x, rivi.p.x - e.x0]) {
            const d = Math.round(reuna + VIUHKAN_REUNAVARA_PX);
            if (d > 0 && d < ruutuNyt.leveys && !vaakaEhdokkaat.includes(d)) {
              vaakaEhdokkaat.push(d);
            }
          }
        }
        vaakaEhdokkaat.sort((a, b) => a - b);
        /*
         * LIUSKAN RIVI ON POLTETUN TEKSTIN KOKOA, LEIKATTUNA KATTOON
         * JA LATTIAAN (ks. LIUSKAN TEKSTIKOKO = KARTTAAN POLTETUN
         * TEKSTIN RUUTUKOKO). Sama mitta menee leveyslaskentaan,
         * riviväliin, asemointiin ja piirtoon — yksi luku, ei kopiota.
         */
        const liuskaMitta = liuskanMitta();
        const kirjasinPx = liuskanKirjasinPx();
        /*
         * RIVIVÄLI JA RIVIN PUOLIKORKEUS SEURAAVAT KIRJASINTA. Ennen
         * ne olivat viuhkan vakioita (30 / 26 / 13 px), jotka on
         * mitoitettu 11 px:n kirjasimelle: 18 px:n rivit menivät
         * toistensa päälle ja rivin osumalaatikko oli tekstiä matalampi.
         * Tihein väli on riviväli, jonka lista sallii itselleen ennen
         * kelausta (kelaus on viimeinen keino), ja rivin puolikorkeus
         * on puolet siitä — laatikot koskettavat toisiaan mutta eivät
         * mene päällekkäin edes tiheimmillään.
         */
        const valiPx = LIUSKAN_RIVIVALI_KERROIN * kirjasinPx;
        const tiheinPx = LIUSKAN_TIHEIN_KERROIN * kirjasinPx;
        const riviPx = tiheinPx / 2;
        /*
         * LIUSKAN LEVEYS ON SISÄLLÖN LEVEYS, KATTONA 78 % RUUDUSTA
         * (omistajan tarkistus 18.9.2026, kaappaus liuska-auki-390.png:
         * *"Kadonneet i… (2)"*, *"Mona Lisan v…"*, lista ruudun oikean
         * laidan yli). Edellinen erä KATKAISI rivin siihen, mikä jäi
         * merkin oikealle puolelle, ja katkaisu söi nimen. Nyt tila on
         * suurempi kahdesta (oikea puoli tai puoli ruutua), leikattuna
         * kattoon — ja se, mikä ei mahdu, RIVITTYY (ei kolmea pistettä).
         *
         * SÄDE KAHDESTI oikean puolen laskennassa: ensimmäinen on
         * listan oma etäisyys merkistä (VIUHKAN_SADE_PX), toinen on
         * pelinappulan vara. Nappula seisoo pelaajan kaupungin merkin
         * kyljessä ja on kova este, joka ei voi väistää; jos rivit
         * veisivät koko oikean laidan, listalle ei jäisi vapaata
         * asentoa sen vierestä (vartio 8j).
         */
        const leveydenKatto = ruutuNyt.leveys * LIUSKAN_LEVEYDEN_OSUUS - LIUSKAN_LAATIKON_VARA_PX;
        const tilaaOikealla = ruutuNyt.leveys - rivi.p.x
          - VIUHKAN_REUNAVARA_PX - 2 * VIUHKAN_SADE_PX;
        const rivinTila = Math.max(0,
          Math.min(leveydenKatto, Math.max(tilaaOikealla, ruutuNyt.leveys / 2)));
        const rivinLeveys = (teksti) => (teksti
          ? viuhkanNimioLeveys(nostosymNimioMitta(teksti, null, Infinity).leveys, liuskaMitta)
          : 0);
        /*
         * PITKÄ NIMI RIVITTYY, EI KATKEA (PAATOKSET 34 kohta 5:
         * lukumäärä *"(n)"* on osa riviä, ja kohta 13 a kieltää
         * lukukelvottoman rivin). Jako on sanoittainen; lukumäärä
         * liimataan edeltävään sanaan, jottei *"(3)"* jää yksin
         * omalle rivilleen. Sanaa ei koskaan katkaista: jos yksi sana
         * on tilaa leveämpi, se saa oman rivinsä sellaisenaan ja
         * reunakiinnitys pitää listan silti ruudussa.
         */
        const rivinTekstit = (nimi, sisennys) => {
          if (!nimi) return [''];
          const tila = Math.max(0, rivinTila - sisennys * LIUSKAN_SISENNYS_PX * liuskaMitta);
          if (rivinLeveys(nimi) <= tila) return [nimi];
          const sanat = String(nimi).split(/\s+/u).filter(Boolean);
          if (sanat.length > 1 && /^\(\d+\)$/u.test(sanat[sanat.length - 1])) {
            const hanta = sanat.pop();
            sanat[sanat.length - 1] = `${sanat[sanat.length - 1]} ${hanta}`;
          }
          const ulos = [];
          let nyt = '';
          for (const sana of sanat) {
            const ehdokas = nyt ? `${nyt} ${sana}` : sana;
            if (!nyt || rivinLeveys(ehdokas) <= tila) { nyt = ehdokas; continue; }
            ulos.push(nyt);
            nyt = sana;
          }
          if (nyt) ulos.push(nyt);
          return ulos.length ? ulos : [nimi];
        };
        /*
         * HIUSVIIVA ON OMA RIVINSÄ (kohta 3 omistajan tarkistuksessa).
         * Malli (js/pallolauta/kaupunkiliuska.js) merkitsee sen yhä
         * ensimmäisen kategoriarivin lipuksi — ladonta on se kerros,
         * joka tietää rivivälin, joten viiva saa oman asemansa vasta
         * tässä. Listan RIVIT ovat siis piirrettäviä rivejä: yksi
         * mallirivi voi olla useampi niistä (rivitys), ja osumatesti
         * lukee `r`:n, joten kumpikin puolisko avaa saman asian.
         */
        const HIUSVIIVA = {
          laji: 'hiusviiva', nimi: '', avain: 'hiusviiva', sisennys: 0,
        };
        const levita = (lista) => {
          const ulos = [];
          for (const r2 of lista) {
            if (r2.hiusviiva) ulos.push({ r: HIUSVIIVA, teksti: '', osa: 0 });
            rivinTekstit(r2.nimi, r2.sisennys)
              .forEach((teksti, i) => ulos.push({ r: r2, teksti, osa: i }));
          }
          return ulos;
        };
        const laske = (lista) => {
          const leveydet = lista.map((k) => (k.r.laji === 'hiusviiva' ? 0
            : rivinLeveys(k.teksti) + k.r.sisennys * LIUSKAN_SISENNYS_PX * liuskaMitta));
          return viuhkanAsemat({
            p: rivi.p,
            ruutu: ruutuNyt,
            leveydet,
            esteet: listanEsteet,
            kasvu: 'keskitetty',
            vaakaEhdokkaat,
            valiPx,
            tiheinPx,
            riviPx,
            /*
             * `kovaEnsin` EI OLE PÄÄLLÄ — mitattu 18.9.2026. Kokeilin
             * ratkaista puolen pelkällä kovalla sakolla, jotta runsas
             * pehmeä muste ei veisi listaa väärälle puolelle. Mittaus
             * kumosi sen: ruudun reuna on myös kovaa sakkoa, joten 390
             * px:llä oikea puoli (joka kiinnittyy reunaan) hävisi
             * vasemmalle ja liuska siirtyi merkin väärälle puolelle.
             * Yhteenlaskettu sakko on siis oikea mitta; puolen
             * ratkaisee kamera-ajo (PAATOKSET 34 kohta 12).
             */
          });
        };
        const mahtuu = keskitettyMahtuvatRivit({
          p: rivi.p, ruutu: ruutuNyt, tihein: tiheinPx, riviPx,
        });
        let rivit = levita(kaikkiRivit);
        let asemointi = laske(rivit);
        // Kelaus vasta kun vapaata asentoa EI löytynyt (kovaSakko > 0):
        // väljällä ruudulla lista on kokonaisena, kuten ennenkin.
        if (asemointi.kovaSakko > 0 && rivit.length > mahtuu) {
          // Ikkuna on MALLIRIVEJÄ, mutta ruutuun mahtuu piirrettäviä
          // rivejä: rivityksen ja hiusviivan lisärivit vähennetään
          // ikkunasta, jottei kelattu liuska silti ylitä ruutua.
          const lisaa = rivit.length - kaikkiRivit.length;
          const ikkuna = Math.max(1, mahtuu - lisaa);
          const kelattu = kelattuLiuska(kaikkiRivit, {
            enintaan: ikkuna, kelaus: liuska.kelaus ?? 0,
          });
          liuska.kelaus = kelattu.kelaus;
          liuska.kelausIkkuna = ikkuna;
          liuska.kelausRiveja = kaikkiRivit.length;
          rivit = levita(kelattu.rivit);
          asemointi = laske(rivit);
        } else {
          liuska.kelaus = 0;
          liuska.kelausIkkuna = 0;
          liuska.kelausRiveja = kaikkiRivit.length;
        }
        const {
          puoli, asemat, leveys: listaLeveys, pohja,
        } = asemointi;
        liuskanKohdat = rivit.map((k, i) => ({
          r: k.r,
          teksti: k.teksti,
          osa: k.osa,
          rivi,
          asema: asemat[i],
          leveys: listaLeveys,
          puoli,
          riviPx,
        }));
        const datum = datumit[naytetaan.indexOf(rivi)];
        if (datum) {
          const suunta = puoli === 'vasen' ? -1 : 1;
          datum.viuhka = rivit.map((k, i) => ({
            id: `${k.r.avain}#${k.osa}`,
            nimi: k.teksti,
            dx: asemat[i].dx,
            dy: asemat[i].dy,
            puoli,
            leveys: listaLeveys,
            mitta: liuskaMitta,
            piirra: (g2, kylki) => piirraLiuskanRivi(
              g2, k.r, kylki, suunta, k.teksti,
              { leveysYksikkoina: listaLeveys / liuskaMitta, jatko: k.osa > 0 },
            ),
          }));
          datum.viuhkaPohja = pohja;
        }
      }
    }
    merkit.aseta('nostot', datumit);
    tahdistaRasteriporras();
    /*
     * NIMILAPPU ON OSA OSUMAPINTAA (Raamattu, VIAT v1672; omistaja
     * 7.9.2026 illalla sanatarkasti: *"Karttanostoissa teksti ei ota
     * klikkausta ainoastaan kuvake. Saisiko myös tekstit
     * klikattaviksi?"*).
     *
     * Osuma on tähän asti ollut pelkkä ruutuetäisyys merkin pisteeseen
     * (js/pallolauta/lauta.js napautaPintaan, 44 px), ja lappu piirtyy
     * ikonin KYLKEEN: pitkän nimen ulkopää jää säteen ulkopuolelle tai
     * lähemmäksi naapurin keskipistettä, jolloin napautus tekstiin ei
     * tehnyt mitään tai avasi väärän noston.
     *
     * Jokainen osuma antaa siksi oman LAPPUNSA LAATIKON ruudulla —
     * täsmälleen sen, jota sovittelu (js/pallolauta/sovittelu.js) käytti
     * väistössä, samasta kaavasta (nostonLaatikko) samoilla asennoilla.
     * Piilotetulla lapulla (sovittelu vei nimen) laatikko on pelkkä
     * IKONIN ruutu — jokaisella nostolla on oma laatikkonsa, jotta
     * kuvakkeen päällä oleva sormi ei häviä naapurin lapun
     * kosketusvaralle (js/pallolauta/lauta.js LAPUN_KOSKETUSVARA_PX).
     *
     * Laatikko lasketaan VASTA NAPAUTUKSESSA annetusta ruutupisteestä
     * (`lappu(p)`) eikä ladonnan hetkellä: kamera on voinut liikkua
     * ladonnan jälkeen, ja lappu seuraa merkkiään.
     */
    naytetaan.forEach((r, i) => {
      const d = datumit[i];
      if (r.perhe === 'piste') return;
      // Ankkurilla ei ole musteta, joten sillä ei ole myoskaan
      // osumapintaa eika nimiladonnan varausta.
      if (r.ankkuri) { r.datum = d; return; }
      // Aihenostolla on nyt nimiö (PAATOKSET 27 TARKENNUS 2 kohta 8),
      // joten sen osumapinta on lautanen JA nimiö — sama kaava kuin
      // nostolla (js/pallolauta/aihemerkit.js aihemerkinLaatikko).
      if (r.perhe === 'aihemerkki') {
        r.datum = d;
        r.lappu = (piste) => aihemerkinLaatikko(piste, d, {
          kylki: d.puoli, dx: d.dx, dy: d.dy, nimio: Boolean(d.nimioNakyy && d.nimi),
        });
        return;
      }
      // Datum kantaa sovittelun jälkeisen asennon (kylki ja siirto);
      // osuma lukee sen vasta napautuksessa, jotta väistö näkyy myös
      // osumapinnassa.
      r.datum = d;
      // Piiloon sovitellulla lapulla laatikko on pelkkä IKONIN ruutu —
      // ei null. Osumatestillä on kosketusvara (js/pallolauta/lauta.js
      // LAPUN_KOSKETUSVARA_PX), ja ilman omaa laatikkoa nimetön nosto
      // häviäisi kuvakkeensa päällä naapurin lapun varalle.
      r.lappu = (p) => nostonLaatikko(p, r, {
        kylki: d.puoli, dx: d.dx, dy: d.dy, nimio: Boolean(d.nimioNakyy && d.nimi),
      });
      // Osumatestin oma muste ilman yhteistä kehystä (ks. nostonOsat).
      r.osat = (p) => nostonOsat(p, r, {
        kylki: d.puoli, dx: d.dx, dy: d.dy, nimio: Boolean(d.nimioNakyy && d.nimi),
      });
    });
    // Poltetun musteen lappu on paistettu laattaan: lauta ei näe sitä,
    // mutta tuntee sen laatikon samasta kaavasta (ladonta on sama).
    for (const r of nakyvat) {
      if (!r.poltettu || r.perhe === 'piste') continue;
      r.lappu = (p) => nostonLaatikko(p, r, { nimio: Boolean(r.nimioNakyy && r.nimi) });
      r.osat = (p) => nostonOsat(p, r, { nimio: Boolean(r.nimioNakyy && r.nimi) });
    }
    // Nimikyltti (`vainNimi`) ei ole osuma: sillä ei ole korttia, ja
    // osumalistalla se veisi napautuksen naapurinostolta.
    osumat = [...naytetaan, ...nakyvat.filter((r) => r.poltettu)]
      .filter((r) => !r.vainNimi);
    /*
     * KIINTEÄ MUSTE ON NIMILADONNAN VARAUS, LIIKKUVA EI (Raamattu,
     * KAUPUNGIN NIMI NOSTOJEN PAALLA). Nimi väistää vain sitä, mikä ei
     * voi väistää itse: POLTETUN noston koko musteen (ikoni + laattaan
     * paistettu nimiö) ja elävän noston IKONIN, joka on kiinni omassa
     * karttapisteessään. Elävän noston LAPPU ei ole varaus — se on
     * sovittelun liikkuva osapuoli, ja se väistää nimen jälkeenpäin
     * (sovittele). Ennen tätä järjestys oli päinvastainen: lappu varasi
     * paikkansa ja NIMI putosi, mikä on juuri se, mitä omistaja ei
     * halunnut.
     */
    lappuja = [];
    const ikonit = [];
    /*
     * YKSI LAPPU, KAKSI KAAVAA. Aihenoston nimiö istuu värilautasen
     * kyljessä (aihemerkinLaatikko) ja noston nimiö symbolin ruudun
     * kyljessä (nostonLaatikko); kumpikin antaa saman neljän luvun
     * laatikon, joten sovittelu, ladonnan varaus ja osumapinta
     * lukevat niitä samalla tavalla. Kaava valitaan tässä kerran ja
     * kannetaan lapun mukana, jottei sovittelu joudu tuntemaan
     * merkkien perheitä.
     */
    const lapunLaatikko = (r, datum) => (r.perhe === 'aihemerkki'
      ? (kylki, dx, dy, nimio) => aihemerkinLaatikko(r.p, datum, {
        kylki, dx, dy, nimio,
      })
      : (kylki, dx, dy, nimio) => nostonLaatikko(r.p, r, {
        kylki, dx, dy, nimio,
      }));
    naytetaan.forEach((r, i) => {
      if (r.perhe === 'piste' || r.ankkuri) return;
      ikonit.push({ r, datum: datumit[i] });
      if (r.nimioNakyy && r.nimi) {
        lappuja.push({ r, datum: datumit[i], laatikko: lapunLaatikko(r, datumit[i]) });
      }
    });
    /*
     * EDELLINEN SOVITTELU KANNETAAN ETEENPÄIN (ks. NIMIÖN KYLKI
     * LUKITAAN, KUN ANKKURI VALITAAN `sovittele`n yllä). Datumit
     * rakennetaan joka ladonnassa datasta, joten ilman tätä nimiön
     * kylki putoaisi takaisin merkin omaan kylkeen joka ladonnalla ja
     * sovittelun olisi pakko ratkaista se uudestaan — juuri se, minkä
     * kohta 13 c kieltää. Asento luetaan lukosta jo TÄSSÄ, jotta myös
     * nimiladonnan varaukset ja osumapinnat kuvaavat sitä, mikä
     * ruudulla on.
     */
    for (const d of datumit) {
      const a = sovitellutAsennot.get(d.avain);
      if (!a) continue;
      d.puoli = a.kylki;
      d.dx = a.dx;
      d.dy = a.dy;
      if (d.nimi) d.nimioNakyy = d.nimioNakyy && a.nimio;
    }
    const ikonilaatikko = ({ r, datum }) => (r.perhe === 'aihemerkki'
      ? aihemerkinLaatikko(r.p, datum, { dx: datum.dx, dy: datum.dy, nimio: false })
      : nostonLaatikko(r.p, r, {
        dx: datum.dx, dy: datum.dy, nimio: false,
      }));
    laskeLaatikot = () => {
      laatikot = [
        ...ikonit.map(ikonilaatikko),
        ...nakyvat.filter((r) => r.poltettu).map((r) => nostonLaatikko(r.p, r)),
      ];
    };
    /*
     * ASENTO LUETAAN RIVILTÄ, EI DATUMILTA. Sovittelu kirjoittaa
     * tuloksensa DATUMIIN (`datum.puoli`, `datum.nimioNakyy`,
     * `datum.dx/dy`), ja juuri se on se ladontahistoria, jota kyltin
     * asento ei saa nähdä. Rivi (`r`) rakennetaan joka ladonnassa
     * datasta, joten sen kylki ja nimiö ovat merkin OMAT.
     */
    omatLaatikot = ({ nimiot = false } = {}) => [
      ...ikonit.map(({ r, datum }) => {
        const asetus = {
          dx: 0,
          dy: 0,
          kylki: r.puoli ?? 'oikea',
          nimio: nimiot ? Boolean(r.nimioNakyy && r.nimi) : false,
        };
        return r.perhe === 'aihemerkki'
          ? aihemerkinLaatikko(r.p, datum, asetus)
          : nostonLaatikko(r.p, r, asetus);
      }),
      ...nakyvat.filter((r) => r.poltettu).map((r) => nostonLaatikko(r.p, r)),
    ];
    laskeLaatikot();
    sovittelu = {
      siirretty: 0, kylkiVaihtui: 0, piilotettu: 0, jaljella: 0, lappuja: lappuja.length,
    };
    laskurit = new Map();
    // Aihemerkki on monta nostoa: selite laskee kappaleet, ei merkkejä.
    for (const o of osumat) {
      if (o.aihe) laskurit.set(o.aihe, (laskurit.get(o.aihe) ?? 0) + (o.maara ?? 1));
    }
    paivitaValot();
    // Auki oleva kortti, jonka merkki ei ole enää ruudulla, sulkeutuu
    // kuten kartalla kerroksen piiloutuessa.
    const auki = ui.fokuskohdeAuki;
    // Ryhmään sulautunut nosto EI ole kadonnut ruudulta: sen merkki on
    // aihemerkin sisällä, ja juuri viuhkasta avattu kortti sulkeutuisi
    // muuten samalla ladonnalla, joka sen avasi.
    if (auki?.ankkuri && !osumat.some((o) => o.id === auki.id)
      && !ryhmitetytIdt.has(auki.id)) suljeFokuskohde(ui);
    return { maara: naytetaan.length, laatikot, osumia: osumat.length };
  };

  /**
   * NOSTOJEN LAPUT VÄISTÄVÄT KAUPUNGIN NIMEÄ (js/pallolauta/sovittelu.js).
   * Ajetaan `paivita`n ja nimiladonnan JÄLKEEN samassa levossa: nimet
   * ovat silloin kiinteitä laatikoita, joita lappu ei saa peittää.
   *
   * `nimet` on ladottujen kaupunkinimien ruutulaatikot
   * (js/pallolauta/nimet.js laatikot). Mitat lasketaan kaavasta
   * (nostonLaatikko) eikä ruudulta, joten sovittelu ei koske DOMiin
   * ennen kuin jokin lappu oikeasti liikkuu — ei layout-thrashia.
   *
   * `kiinteat` on muu liikkumaton muste, jota lappu ei saa peittää:
   * tällä hetkellä turisti-infon kyltti (js/pallolauta/lauta.js
   * ladoLevossa, Raamattu KARTTAUUDISTUKSEN PAATOKSET 31 TARKENNUS 2
   * kohta 6). Se on eri lista kuin `nimet` vain kutsujan selkeyden
   * vuoksi — sovittelulle kaikki esteet ovat samaa laatikkojoukkoa.
   *
   * ══════════════════════════════════════════════════════════════════
   * NIMIÖN KYLKI LUKITAAN, KUN ANKKURI VALITAAN (omistaja 18.9.2026 klo
   * 06.58 Suomen aikaa, Raamattu KARTTAUUDISTUKSEN PAATOKSET 34 kohta
   * 13 c: *"Samoin kaikki nostot pitaisi pysya paikallaan."*)
   * ══════════════════════════════════════════════════════════════════
   *
   * JUURISYY: SOVITTELU AJETTIIN JOKA LADONNASSA. `ladoLevossa`
   * (js/pallolauta/lauta.js) kutsuu tätä jokaisella ladonnalla — myös
   * niillä viidellä sekunnissa, jotka ajetaan kesken vedon (LADONTA
   * KULKEE MUKANA) — ja `sovitteleLaput` ratkaisee kyljen ja siirron
   * uudestaan sitä vasten, mitä juuri sillä hetkellä on ruudulla
   * tiellä. Kaupungin nimi, pelinappula ja naapurilaput liikkuvat
   * ruudulla vedossa ja kasvavat zoomissa, joten sama nimiö vaihtoi
   * kylkeä kesken vedon — sama ilmiö kuin kaupunkien nimillä ennen
   * niiden lukkoa (js/pallolauta/nimet.js NIMIKYLTTI ON KIINNI
   * KAUPUNGISSA), vain toisessa kerroksessa.
   *
   * LÄÄKE ON SAMA KUIN NIMILLÄ: ratkaise kerran, kanna eteenpäin.
   * Sovittelu ajetaan vain, kun SE, MITÄ SOVITELLAAN, muuttuu — eli
   * kun lappujoukko (nostot ja niiden nimiöiden näkyvyys) tai ruudun
   * koko vaihtuu. Veto ja zoomi eivät kumpaakaan muuta, joten nimiön
   * kylki ja siirto pysyvät ja koko ruutuvektori merkistä nimiöön on
   * sama pikselilleen (zoomissa kerrottuna merkin mitalla).
   *
   * MIKSI RUUDUN KOKO ON MUKANA AVAIMESSA: kääntö tai ikkunan koon
   * muutos vaihtaa sen, mitä laidalle mahtuu, ja silloin ladonta ON
   * uusi — sama raja kuin ankkurivaraston tunnuksella
   * (js/pallolauta/nostoankkurit.js `tunnus`).
   */
  const sovittele = ({ nimet = [], kiinteat = [] } = {}) => {
    viimeisimmatNimet = nimet ?? [];
    if (!lappuja.length) {
      sovittelunAvain = '';
      sovitellutAsennot = new Map();
      return sovittelu;
    }
    const ruutuNyt = ruutu?.() ?? { leveys: 0, korkeus: 0 };
    /*
     * AVAIN LUETAAN RIVILTÄ, EI DATUMISTA. Sovittelu kirjoittaa
     * tuloksensa datumiin (`nimioNakyy` piilotuksessa), ja jos avain
     * lukisi sen, jokainen piilotus muuttaisi avainta ja pakottaisi
     * uuden sovittelun — sama ansa kuin `omatLaatikot`issa (ks. ASENTO
     * LUETAAN RIVILTÄ, EI DATUMILTA). Rivi rakennetaan datasta.
     */
    const avain = `${Math.round(ruutuNyt.leveys)}x${Math.round(ruutuNyt.korkeus)}#`
      + lappuja.map(({ r, datum }) => `${datum.avain}:${r.nimioNakyy && r.nimi ? 1 : 0}`
        + `:${r.perhe === 'aihemerkki' ? 'a' : 'n'}`).join(';');
    // Sama lappujoukko samalla ruudulla: kylki on jo ratkaistu (ks.
    // NIMIÖN KYLKI LUKITAAN). Veto ja zoomi eivät koeta sitä uudestaan.
    if (avain === sovittelunAvain) {
      sovittelu = { ...viimeisinSovittelu, lappuja: lappuja.length };
      return sovittelu;
    }
    sovittelunAvain = avain;
    const tulos = sovitteleLaput({
      laput: lappuja.map(({ r, datum, laatikko }) => ({
        avain: datum.avain,
        kylki: datum.puoli,
        laatikko,
        /*
         * AIHENOSTO VÄISTÄÄ KAIKKEA (js/pallolauta/sovittelu.js
         * AIHENOSTO SOVITELLAAN VIIMEISENÄ). Sen paikka ja nimi
         * syntyvät vasta ajossa ryhmän jäsenistä, joten sillä ei ole
         * sitä käsin hiottua ladontaa, jonka nojalla muut laput
         * saavat jäädä paikoilleen — ja kaupungin rykelmän
         * aihenostot syntyvät kaikki saman kaupungin päälle.
         */
        este: r.perhe === 'aihemerkki',
      })),
      esteet: kiinteat.length ? [...nimet, ...kiinteat] : nimet,
    });
    let muuttui = false;
    for (const { r, datum } of lappuja) {
      const a = tulos.asennot.get(datum.avain);
      if (!a) continue;
      if (datum.puoli === a.kylki && datum.dx === a.dx && datum.dy === a.dy
        && datum.nimioNakyy === a.nimio) continue;
      datum.puoli = a.kylki;
      datum.dx = a.dx;
      datum.dy = a.dy;
      datum.nimioNakyy = a.nimio;
      muuttui = true;
    }
    // Siirtynyt ikoni on myös siirtynyt varaus (js/pallolauta/lauta.js
    // lukee laatikot myös sovittelun jälkeen).
    if (muuttui) { laskeLaatikot(); merkit.aseta('nostot', datumit); }
    // Lukko talteen: seuraavat ladonnat kantavat tämän eteenpäin
    // (ks. EDELLINEN SOVITTELU KANNETAAN ETEENPÄIN).
    sovitellutAsennot = new Map(tulos.asennot);
    viimeisinSovittelu = {
      siirretty: tulos.siirretty,
      kylkiVaihtui: tulos.kylkiVaihtui,
      piilotettu: tulos.piilotettu,
      jaljella: tulos.jaljella,
    };
    sovittelu = { ...viimeisinSovittelu, lappuja: lappuja.length };
    return sovittelu;
  };

  return {
    paivita,
    sovittele,
    paivitaValot,
    /** Auki olevan viuhkan aihemerkin avain tai null (PAATOKSET 27). */
    viuhkaAuki: () => viuhka?.avain ?? null,
    /** Listan alle piilotettu muste (savukkeiden vartio, ks. LISTA EI…). */
    viuhkanPiilotetut: () => piilotetutListanAlta.map((e) => ({ ...e })),
    /** Sulkee viuhkan (kartan napautus, js/pallolauta/lauta.js). */
    suljeViuhka,
    /* ── KAUPUNKILIUSKA (PAATOKSET 34) ───────────────────────────── */
    /**
     * LAUDAN KAUPUNKIEN ANKKURIT juuri nyt: ripustuspiste (`lat`/`lng`)
     * ja jäsenyyden keskus (`keskus`) erikseen — savukkeen on mitattava
     * samasta pisteestä kuin kerros (ks. KAUPUNGIN OMA PISTE).
     */
    /**
     * KOKO RIVISTO VIIMEISIMMASTA LADONNASTA (savukkeen vartio 8b).
     * Kartalta pudottaminen ja kuvan ulkopuolelle jääminen ovat eri
     * asioita, ja vain tämä lista erottaa ne: `ruudulla` kertoo, onko
     * merkillä ruutupiste juuri nyt, ja `omaLat`/`omaLng` sen
     * datapaikan, josta kaupunkijäsenyys mitataan.
     */
    kartanRivit: () => rivitNyt.map((r) => ({
      avain: r.avain,
      id: r.id,
      nimi: r.nimi ?? '',
      perhe: r.perhe,
      lat: r.lat,
      lng: r.lng,
      omaLat: r.omaLat,
      omaLng: r.omaLng,
      paikkaNimi: r.paikkaNimi ?? null,
      kaupunki: Boolean(r.kaupunki),
      vainNimi: Boolean(r.vainNimi),
      poltettu: Boolean(r.poltettu),
      ruudulla: Boolean(ruudulla(r.lat, r.lng)),
      /*
       * KARTALTA PUDOTTAMINEN ON TÄMÄ LIPPU, EI `ruudulla` (PAATOKSET
       * 34 kohta 4). Kaupungin sisäinen nosto siirtyy liuskaan eikä
       * piirry kartalle millään zoomilla; ruudun laita on kameran asia
       * ja vaihtuu ruutukoon mukana.
       */
      liuskassa: liuskaanSiirretyt.has(r.avain),
    })),
    /** Kaupungin sisaisten nostojen tunnukset (savukkeen vartio 3). */
    liuskanSisaiset: (avain) => (sisaisetKaupungeittain.get(avain) ?? []).map((r) => r.id),
    laudanAnkkurit: () => laudanAnkkurit.map((r) => ({
      avain: r.avain,
      id: r.id,
      nimi: r.nimi,
      lat: r.lat,
      lng: r.lng,
      keskus: { ...r.keskus },
      sisaisia: (sisaisetKaupungeittain.get(r.avain) ?? []).length,
    })),
    /** Auki olevan liuskan kaupunkirivin avain tai null. */
    liuskaAuki: () => liuska?.avain ?? null,
    /** Auki olevan kategorian aihe tai null (haitari, kohta 8). */
    liuskanKategoria: () => liuska?.avattuKategoria ?? null,
    suljeLiuska,
    /**
     * PALJONKO TILAA SUURIN LIUSKA VAATII MERKIN ALAPUOLELLA (px).
     *
     * PAATOKSET 34 kohta 10 (*"kartta voisi ajaa itsensa sellaiseen
     * paikkaan missa nostot mahtuvat aukeamaan hyvin"*): lauta ajaa
     * kameran ENNEN avausta, joten sen on tiedettävä etukäteen, kuinka
     * korkea lista voi olla. Mitta on SUURIN kategoria avattuna, ei
     * kiinni oleva lista — muuten kamera joutuisi ajamaan uudestaan
     * haitaria avattaessa ja ajo sulkisi juuri avatun liuskan
     * (VIUHKAN_LEPO_PX).
     *
     * Paluuarvo on `{ rivit, px }`; `px` on VIUHKAN_ALAS_ALKU_PX +
     * rivivälit + viimeisen rivin puolikas + reunavara, eli täsmälleen
     * se, mitä `alasMahtuvatRivit` mittaa toisesta päästä.
     */
    liuskanTilantarve: (valinnat = {}) => {
      const avain = valinnat.avain
        ?? laudanAvain({ id: valinnat.id, nimi: valinnat.nimi });
      let omat = sisaisetKaupungeittain.get(avain) ?? null;
      if (!omat && valinnat.nimi) {
        const rivi = kaupunkirivitNyt.find((o) => o.nimi === valinnat.nimi);
        omat = rivi ? (sisaisetKaupungeittain.get(rivi.avain) ?? []) : [];
      }
      const n = liuskanSuurinRivimaara({ nostot: omat ?? [], liiku: Boolean(valinnat.liiku) })
        // Hiusviiva on oma rivinsä (ks. HIUSVIIVA ON OMA RIVINSÄ),
        // joten kamera-ajon on varattava sille tilaa sekin.
        + 1;
      // Riviväli ja rivin puolikorkeus ovat liuskan omat, eivät viuhkan
      // vakiot: ne seuraavat kirjasinta (ks. LIUSKAN TEKSTIKOKO…).
      const vali = LIUSKAN_RIVIVALI_KERROIN * liuskanKirjasinPx();
      const puolikas = (LIUSKAN_TIHEIN_KERROIN * liuskanKirjasinPx()) / 2;
      return {
        rivit: n,
        // Alaspäin kasvavan listan tarve (jää mittariksi).
        px: VIUHKAN_ALAS_ALKU_PX + Math.max(0, n - 1) * vali
          + puolikas + VIUHKAN_REUNAVARA_PX,
        // KESKITETYN listan koko korkeus (PAATOKSET 34 kohta 12):
        // rivivälit + ylimmän ja alimman rivin puolikkaat + reunavara.
        korkeus: Math.max(0, n - 1) * vali
          + 2 * (puolikas + VIUHKAN_REUNAVARA_PX),
      };
    },
    /**
     * AVAA LIUSKAN kaupunkimerkistä ruutupisteen perusteella: lauta
     * tuntee kaupungin asteet, kerros tuntee rivit. Palauttaa epätosi,
     * jos kaupungilla ei ole riviä ruudulla (silloin lauta avaa
     * vanhan kortin).
     */
    avaaLiuskaKaupungista: (lat, lng, valinnat = {}) => {
      const p = ruudulla(lat, lng);
      if (!p) return false;
      /*
       * KAKSI LAHDETTA, YKSI POLKU (Fablen paatos kerrosrajasta,
       * PAATOKSET 34 TILA).
       *
       * 1) PAKKOJEN NAKYVA KAUPUNKI (Lille) kayttaa OMAA riviaan
       *    nostokerroksessa. Rivin on oltava sama kaupunki eika vain
       *    lahin: 60 px:n sade poimi Pariisin kohdalla Lillen rivin ja
       *    liuska olisi avannut vaaran kaupungin sisallon (mitattu
       *    18.9.2026, savuke-pariisi-lahizoom 8c).
       * 2) LAUDAN OMA KAUPUNKI (Pariisi) ei ole nostokerroksen kohde
       *    lainkaan, joten sille luodaan ANKKURI kaupungin
       *    koordinaatteihin (liuskanAnkkuri → laudanRivit → naytetaan).
       *    Ankkuri saa oman CSS2D-elementin seuraavassa ladonnassa,
       *    jonka `avaaLiuska` pyytaa.
       */
      let paras = null;
      let parasMatka = Infinity;
      for (const o of kaupunkirivitNyt) {
        if (!o.p) continue;
        if (valinnat.nimi && o.nimi && o.nimi !== valinnat.nimi) continue;
        const matka = Math.hypot(o.p.x - p.x, o.p.y - p.y);
        if (matka < parasMatka) { parasMatka = matka; paras = o; }
      }
      if (paras && parasMatka <= 60) return avaaLiuska(paras, valinnat);
      return avaaLiuska({ avain: laudanAvain({ id: valinnat.id, nimi: valinnat.nimi }), p }, valinnat);
    },
    /**
     * OSUIKO NAPAUTUS LIUSKAN RIVIIN. Kategoriarivi vaihtaa haitarin
     * (toisen avaus sulkee edellisen jo rakenteesta), kohderivi avaa
     * noston kortin samasta paikasta kuin viuhkan kohta, yläryhmän
     * rivit palauttavat lajinsa laudalle (`{ laji }`), joka omistaa
     * kaupunkilehden, nähtävyydet ja oppaan.
     */
    napautaLiuskasta: (kohta) => {
      if (!kohta || !liuskanKohdat.length) return null;
      for (const k of liuskanKohdat) {
        // Hiusviiva on oma rivinsä muttei tekonsa: sormi menee sen läpi.
        if (k.r.laji === 'hiusviiva') continue;
        const p = ruudulla(k.rivi.lat, k.rivi.lng);
        if (!p) continue;
        const l = kohdanLaatikko(p.x + k.asema.dx, p.y + k.asema.dy, k.leveys, k.puoli, k.riviPx);
        if (kohta.x < l.x0 || kohta.x > l.x1 || kohta.y < l.y0 || kohta.y > l.y1) continue;
        if (k.r.laji === 'kategoria') {
          liuska.avattuKategoria = liuska.avattuKategoria === k.r.aihe ? null : k.r.aihe;
          // Uusi kategoria alkaa aina alusta: kelaus on ikkunan tila,
          // ei kategorian ominaisuus.
          liuska.kelaus = 0;
          ladoUudelleen?.();
          return { laji: 'kategoria', aihe: k.r.aihe };
        }
        // Kelausrivi siirtää ikkunaa; liuska pysyy auki (kohta 5).
        if (k.r.laji === 'kelaus') {
          liuska.kelaus = kelauksenAskel({
            kelaus: liuska.kelaus ?? 0,
            suunta: k.r.suunta,
            enintaan: liuska.kelausIkkuna ?? 0,
            maara: liuska.kelausRiveja ?? 0,
          });
          ladoUudelleen?.();
          return { laji: 'kelaus', suunta: k.r.suunta };
        }
        if (k.r.laji === 'kohde') {
          if (ui.dead || ui.busy || typeof k.r.nosto?.avaa !== 'function') return null;
          const pohja = ankkuri ? ankkuri(k.rivi.lat, k.rivi.lng) : null;
          const kohdanAnkkuri = pohja ? () => {
            const a = pohja();
            return a ? { x: a.x + k.asema.dx, y: a.y + k.asema.dy } : null;
          } : undefined;
          liuska = null;
          k.r.nosto.avaa(kohdanAnkkuri);
          ladoUudelleen?.();
          return { laji: 'kohde' };
        }
        liuska = null;
        ladoUudelleen?.();
        return { laji: k.r.laji };
      }
      return null;
    },
    /**
     * LIUSKAN RIVIT JUURI NYT (savukkeet ja vartijat).
     *
     * YKSI MALLIRIVI ON YKSI RIVI, vaikka se piirtyisi kahdelle
     * riville: rivitys on ladonnan keino eikä listan sisältöä, ja
     * vartiot laskevat rivejä (*"kategorioita ≥ 2"*, *"kohteita =
     * otsikon luku"*). Rivitetyn rivin laatikko on sen osien YHTEINEN
     * laatikko, jotta *"ei toisen päällä"* mittaa koko rivin, ja
     * teksti on osat yhteen liitettynä — silloin vartio näkee saman
     * nimen kuin silmä (ja katkaisumerkin, jos sellainen syntyisi).
     */
    liuskanRivit: () => {
      const ulos = [];
      const paikat = new Map();
      for (const k of liuskanKohdat) {
        const p = ruudulla(k.rivi.lat, k.rivi.lng);
        const l = p
          ? kohdanLaatikko(p.x + k.asema.dx, p.y + k.asema.dy, k.leveys, k.puoli, k.riviPx)
          : null;
        const oli = paikat.get(k.r);
        if (oli) {
          if (k.teksti) oli.nimi = `${oli.nimi} ${k.teksti}`.trim();
          if (l) {
            oli.x0 = Math.min(oli.x0 ?? l.x0, l.x0);
            oli.y0 = Math.min(oli.y0 ?? l.y0, l.y0);
            oli.x1 = Math.max(oli.x1 ?? l.x1, l.x1);
            oli.y1 = Math.max(oli.y1 ?? l.y1, l.y1);
          }
          continue;
        }
        const uusi = {
          laji: k.r.laji,
          avain: k.r.avain ?? null,
          nimi: k.r.laji === 'hiusviiva' ? '' : (k.teksti ?? k.r.nimi),
          aihe: k.r.aihe ?? null,
          maara: k.r.maara ?? null,
          sisennys: k.r.sisennys,
          auki: Boolean(k.r.auki),
          // Onko rivillä avaaja (savukkeiden 8h: erottaa "napautus ei
          // mennyt läpi" ja "nostolla ei ole korttia" toisistaan).
          avattava: typeof k.r.nosto?.avaa === 'function',
          ...(l ?? {}),
        };
        paikat.set(k.r, uusi);
        ulos.push(uusi);
      }
      return ulos;
    },
    /**
     * OSUIKO NAPAUTUS VIUHKAN KOHTAAN (js/pallolauta/lauta.js
     * napautaPintaan). `kohta` on napautuksen ruutupiste kotelon
     * pikseleinä. Laatikko on sama kaava, jolla kohta piirrettiin
     * (js/pallolauta/aihemerkit.js kohdanLaatikko) — sormi ja silmä
     * mittaavat samaa. Avaa noston ja palauttaa tosi, jos osui.
     */
    napautaViuhkasta: (kohta) => {
      if (!kohta || !viuhkanKohdat.length) return false;
      for (const k of viuhkanKohdat) {
        const p = ruudulla(k.rivi.lat, k.rivi.lng);
        if (!p) continue;
        const l = kohdanLaatikko(p.x + k.asema.dx, p.y + k.asema.dy, k.leveys, k.puoli);
        if (kohta.x >= l.x0 && kohta.x <= l.x1 && kohta.y >= l.y0 && kohta.y <= l.y1) {
          return napautaViuhkastaan(k.rivi, k.m, k.asema);
        }
      }
      return false;
    },
    /**
     * Viuhkan kohtien OSUMALAATIKOT ruudulla (savukkeet ja vartijat):
     * sama kaava, jota napautus vertaa — kohta mahtuu ruudulle silloin
     * ja vain silloin, kun tämä laatikko mahtuu.
     */
    viuhkanOsumalaatikot: () => viuhkanKohdat.map((k) => {
      const p = ruudulla(k.rivi.lat, k.rivi.lng);
      if (!p) return null;
      return {
        id: k.m.id,
        nimi: k.m.nimi,
        ...kohdanLaatikko(p.x + k.asema.dx, p.y + k.asema.dy, k.leveys, k.puoli),
      };
    }).filter(Boolean),
    /**
     * Viuhkan kohdat juuri nyt (savukkeet ja vartijat): kohdan
     * ruutupiste ja nimi samasta laskusta, jolla se piirrettiin.
     */
    viuhkanKohdat: () => viuhkanKohdat.map((k) => ({
      id: k.m.id, nimi: k.m.nimi, dx: k.asema.dx, dy: k.asema.dy, puoli: k.puoli, leveys: k.leveys,
    })),
    /**
     * Aihemerkit juuri nyt: aihe, kappalemäärä ja jäsenten id:t
     * (PAATOKSET 27:n mittari).
     */
    aihemerkit: () => osumat.filter((o) => o.perhe === 'aihemerkki').map((o) => ({
      id: o.id,
      aihe: o.aihe,
      // Aihenoston nimiö (PAATOKSET 27 TARKENNUS 2 kohta 8) ja se
      // kaupunki, joka sitoi ryhmän (kohta 7) — vartijoiden mittarit.
      nimi: o.nimi,
      nimioNakyy: Boolean(o.datum?.nimioNakyy ?? o.nimioNakyy),
      kaupunkiAvain: o.kaupunkiAvain ?? null,
      maara: o.maara,
      jasenet: o.jasenet.map((m) => ({
        id: m.id,
        nimi: m.nimi,
        aihe: m.aihe,
        kaupunkiAvain: m.kaupunkiAvain ?? null,
        maasto: Boolean(m.maasto),
        x: m.p.x,
        y: m.p.y,
      })),
      x: o.p?.x ?? 0,
      y: o.p?.y ?? 0,
    })),
    /**
     * Napautettavat merkit ruudulla ({ avain, id, lat, lng, nimi, avaa,
     * perhe, poltettu }). Nostoilla ja eläintäyillä on lisäksi
     * `lappu(p)`: nimilapun ruutulaatikko annetussa ruutupisteessä —
     * ikonin ja näkyvän nimiön yhdiste, tai pelkkä ikonin ruutu, jos
     * lappua ei juuri nyt ole (ks. NIMILAPPU ON OSA OSUMAPINTAA).
     */
    osumat: () => osumat,
    /**
     * Merkkiportin viimeisin päätös (ks. PÄÄKARTAN MERKKIRAJA):
     * `{ merkit, piiloon, polttovelka }` tai null, jos maan lehti ei
     * ole näkyvissä. Savukkeiden ja vartijoiden mittari.
     */
    portti: () => (portti ? { ...portti, uloinOsuus: viimeisinUloinOsuus } : null),
    /** Kiinteän musteen laatikot nimiladonnan varauksiksi (ks. paivita). */
    laatikot: () => laatikot,
    /**
     * Ikonien laatikot MERKKIEN OMISSA paikoissa, ilman sovittelun
     * siirtoja (ks. omatLaatikot yllä). Turisti-infon kyltin asento
     * luetaan näistä, jotta se ei riipu ladontakierrosten määrästä
     * eikä koneen nopeudesta.
     */
    omatIkonilaatikot: () => omatLaatikot(),
    /**
     * Sama omissa paikoissaan, mutta NIMIÖINEEN: koko muste, jonka
     * päälle kyltin ankkuri ei saa jäädä (ks. paivitaTuristiInfo).
     */
    omaMuste: () => omatLaatikot({ nimiot: true }),
    /**
     * Kohdemerkkien portin luku juuri nyt (ks. lehdenOsuus): sama maa,
     * sama lehti ja sama jakolasku kuin merkkien keräyksessä. Laudan
     * kaupunkipiste lukee tästä, onko kartalla kohdemerkkejä, joita
     * vasten kohdekaupunki mitoitetaan (js/pallolauta/lauta.js).
     *
     * MYÖS PELITILAN PORTTI (8.9.2026 ilta): zoom ei riitä, jos merkkejä
     * ei ylipäätään piirretä. Vastaus on 0 samoissa tiloissa, joissa
     * keraa palauttaa tyhjän listan tai ohittaa merkit — katselutila,
     * lähtövalinta, avauslento ja kesken oleva siirto. Ilman tätä
     * kaupunkipisteen lattia olisi voimassa siellä, missä verrattavaa
     * ei ole (ks. lauta.js LATTIA ON YHDEN PISTEEN SÄÄNTÖ).
     */
    lehdenOsuus: (nakyva) => {
      const { game } = ui;
      const pack = game?.pack;
      if (!pack || ui.katselu || game.phase === 'pickstart' || ui.aloituslentoKesken) return 0;
      if (ui.movingPlayerId != null) return 0;
      const iso = kohteidenNykyinenIso(ui);
      return lehdenOsuus(iso ? FOKUS_POHJAT[iso] : null, nakyva, pack.id ?? null);
    },
    /** Viimeisimmän sovittelun luvut (savukkeet ja vartijat). */
    sovittelunTulos: () => sovittelu,
    /**
     * Elävien nostojen NIMILAPPUJEN laatikot sovittelun jälkeen —
     * mitat kaavasta, samasta kuin sovittelu käytti (savukkeet ja
     * vartijat mittaavat tästä, eivät ruudulta: elementin oma svg on
     * 1 x 1 px ja ylivuotava, joten getBoundingClientRect ei kerro
     * lapusta mitään).
     */
    lappuLaatikot: () => lappuja
      .filter(({ datum }) => datum.nimioNakyy && datum.nimi)
      .map(({ datum, laatikko }) => ({
        id: datum.id,
        nimi: datum.nimi,
        // Perhe kertoo savukkeelle, mikä ovi lapun takaa aukeaa
        // (nosto = kohdekortti, elain = eläintäky, aihemerkki = viuhka).
        perhe: datum.perhe,
        puoli: datum.puoli,
        dx: datum.dx,
        dy: datum.dy,
        ...laatikko(datum.puoli, datum.dx, datum.dy, true),
      })),
    /**
     * NAPAUTETTAVIEN LAPPUJEN LAATIKOT juuri nyt (savukkeet ja
     * vartijat): sama `lappu(p)`, jota osumatesti käyttää
     * (js/pallolauta/lauta.js lappuunOsunut), joten savuke mittaa
     * täsmälleen sitä pintaa, jota sormi napauttaa — myös POLTETUSTA
     * musteesta, jolla ei ole elementtiä lainkaan.
     */
    osumaLaatikot: () => osumat.map((o) => {
      const p = typeof o.lappu === 'function' ? ruudulla(o.lat, o.lng) : null;
      const r = p ? o.lappu(p) : null;
      return r ? {
        id: o.id,
        nimi: o.nimi,
        perhe: o.perhe,
        poltettu: Boolean(o.poltettu),
        puoli: o.datum?.puoli ?? o.puoli ?? 'oikea',
        ...r,
      } : null;
    }).filter(Boolean),
    valot: () => valot,
    /** Kappaleet aiheittain selitevalikolle (js/karttavalot.js). */
    laskurit: () => laskurit,
  };
}
