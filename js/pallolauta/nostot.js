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

import { FOKUS_POHJAT } from '../packs/fokus-grc.js';
import { MAASTOKOHTEET_ARK } from '../packs/maastokohteet-ark.js';
import { MAASTOKOHTEET_ATA } from '../packs/maastokohteet-ata.js';
import {
  LEHDEN_VAHIN_OSUUS, avaaFokuskohde, kohdeMerkinLadonta, kohteidenNykyinenIso, maanKohdemerkit,
  maanKohdetiedot, naapurienPoltetutMerkit, suljeFokuskohde,
} from '../fokuskohteet.js';
import { avaaElaintaky, elaintakyLaudalla } from '../elaintaky.js';
import { avaaFokuspiste, fokuspisteKuvio, fokuspisteenSiirto } from '../fokuspiste.js';
import { fokusvirtaKohtaamispiste } from '../fokusvirta.js';
import {
  NOSTOSYM_MINI_RUUTU, NOSTOSYM_NIMIO_KOKO, nostosymNimioAsemointi, nostosymNimioMitta,
  nostosymPaakategoria, piirraNostosymKartalle,
} from '../fokusnosto-symbolit.js';
import { KARTTANIMI_KOOT } from '../karttanimet.js';
import { karttavaloVari, karttavalotLue } from '../karttavalot.js';
import { nostoladontaTiiviste } from '../nostoladonta.js';
import { pallonNostoOnPoltettu } from '../pallo.js';
import { PALLOLAUDAN_LEVEYS } from './kamera.js';
import { sovitteleLaput } from './sovittelu.js';

/** Eläviä nostoja pallolla enintään kerrallaan (karttapallo.md luku 6). */
export const NOSTOJEN_KATTO = 40;
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
/** Aihevalon säde (Globe.gl pointRadius-yksikköä) ja korkeus kaupunkipisteen alla. */
export const VALON_SADE = 0.06;
export const VALON_KORKEUS = 0.0015;
export const VALON_PEITTO = 0.45;

const SVG = 'http://www.w3.org/2000/svg';

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
  const dx = d.dx ?? 0;
  const dy = d.dy ?? 0;
  g.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${NOSTON_MITTA.toFixed(4)})`;
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
  fokuspisteKuvio(g);
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', `${d.nimi}: ${d.teko}`);
  return el;
}

/**
 * Elävän noston laatikko ruudulla (nimiladonnan varaus): symbolin
 * ruutu ja nimiön kaista kirjaston asemoinnista (nostosymNimioAsemointi)
 * merkin mitassa.
 */
export function nostonLaatikko(p, d, {
  kylki = null, dx = 0, dy = 0, nimio = null,
} = {}) {
  const r = NOSTOSYM_MINI_RUUTU * NOSTON_MITTA;
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
    x0: Math.min(laatikko.x0, x + a.x1 * NOSTON_MITTA),
    y0: Math.min(laatikko.y0, y + a.y1 * NOSTON_MITTA),
    x1: Math.max(laatikko.x1, x + a.x2 * NOSTON_MITTA),
    y1: Math.max(laatikko.y1, y + a.y2 * NOSTON_MITTA),
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
export function luoNostot({
  ui, merkit, asteet, ruudulla, onPoltettu = pallonNostoOnPoltettu,
}) {
  let osumat = []; // ruudulla olevat, napautettavat merkit
  let laatikot = [];
  let laskurit = new Map();
  let valot = [];
  let lappuja = []; // elävät nimiölaput sovittelua varten ({ r, datum })
  let datumit = []; // viimeksi asetetut nostodatumit (sovittelu päivittää)
  let sovittelu = {
    siirretty: 0, kylkiVaihtui: 0, piilotettu: 0, jaljella: 0, lappuja: 0,
  };
  let laskeLaatikot = () => { laatikot = []; };
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
  const keraa = (nakyva) => {
    const { game } = ui;
    const pack = game?.pack;
    const rivit = [];
    if (!pack || ui.katselu || game.phase === 'pickstart' || ui.aloituslentoKesken) return rivit;
    const liikkuu = ui.movingPlayerId != null;
    const iso = kohteidenNykyinenIso(ui);
    const pohja = iso ? FOKUS_POHJAT[iso] : null;
    const lehtiNakyy = lehdenOsuus(pohja, nakyva, pack.id) >= LEHDEN_VAHIN_OSUUS;
    if (lehtiNakyy && !liikkuu) {
      const tiedot = maanKohdetiedot(ui, iso);
      for (const m of maanKohdemerkit(pack, iso, pohja, onPoltettu)) {
        const a = asteet(m);
        if (!a) continue;
        const kohde = tiedot.get(m.id) ?? m.kohde;
        if (!kohde) continue;
        rivit.push({
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
          avaa: (ankkuri) => avaaFokuskohde(ui, kohde, { ankkuri }),
        });
      }
      // Naapurimaan poltettu muste on myös napautettava (2.9.2026, Bosnia).
      for (const m of naapurienPoltetutMerkit(ui, nakyva, onPoltettu)) {
        const a = asteet(m);
        if (!a || !m.kohde) continue;
        rivit.push({
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
        rivit.push({
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
        if (rivi) rivit.push(rivi);
      }
    }
    if (alueenMerkitNakyvat(nakyva, ARKTIS_NAKYY_ASTETTA) && !liikkuu) {
      for (const kohde of MAASTOKOHTEET_ARK) {
        const rivi = napanostonRivi(ui, kohde, { avain: `ark:${kohde.id}` });
        if (rivi) rivit.push(rivi);
      }
    }
    // Kevyen kulun vihreä kohtaamispiste (js/fokuspiste.js sääntö).
    const city = game.cityOf?.();
    const piste = city ? fokusvirtaKohtaamispiste(ui, city) : null;
    if (piste) {
      /*
       * PISTE POIS NAPPULAN ALTA (omistaja 6.9.2026 ilta: *"aarteen
       * piste syttyy liian lähelle ateenaa, ei pysty painamaan"*): sama
       * sivusiirto kuin tasokartalla (js/fokuspiste.js
       * fokuspisteenSiirto) — merkki JA osuma siirtyvät, data ei.
       * Nappula ei ota napautuksia (css pointer-events), mutta ilman
       * siirtoa piste ja kaupunki olivat samassa ruutupisteessä ja
       * lähin merkki -sääntö antoi tasapelin kaupungille.
       */
      const siirto = fokuspisteenSiirto(city, piste);
      const a = asteet({ x: piste.x + siirto.x, y: piste.y + siirto.y });
      if (a) {
        rivit.push({
          avain: `piste:${city.id}`,
          id: `piste:${city.id}`,
          perhe: 'piste',
          lat: a.lat,
          lng: a.lon,
          nimi: piste.nimi,
          teko: piste.teko,
          nimioNakyy: true,
          aihe: null,
          poltettu: false,
          avaa: () => avaaFokuspiste(ui, city),
        });
      }
    }
    return rivit;
  };

  /**
   * Päivittää kerroksen: kutsutaan levossa (js/pallolauta/lauta.js).
   * Palauttaa elävien laatikot nimiladonnan varauksiksi ja määrän.
   */
  const paivita = ({ nakyva, katto = NOSTOJEN_KATTO, keskipiste = null } = {}) => {
    const rivit = keraa(nakyva);
    const nakyvat = [];
    for (const r of rivit) {
      const p = ruudulla(r.lat, r.lng);
      if (!p) continue;
      nakyvat.push({ ...r, p, etaisyys: keskipiste ? Math.hypot(p.x - keskipiste.x, p.y - keskipiste.y) : 0 });
    }
    // Elävät: kohtaamispiste ensin, sitten lähimmät ruudun keskipistettä.
    const elavat = nakyvat.filter((r) => !r.poltettu)
      .sort((a, b) => ((a.perhe === 'piste') - (b.perhe === 'piste')) * -1 || (a.etaisyys - b.etaisyys));
    const naytetaan = elavat.slice(0, Math.max(0, katto));
    datumit = naytetaan.map((r) => ({
      avain: r.avain,
      laji: r.perhe === 'piste' ? 'piste' : 'nosto',
      id: r.id,
      perhe: r.perhe,
      lat: r.lat,
      lng: r.lng,
      nimi: r.nimi,
      teko: r.teko ?? null,
      nimioNakyy: r.nimioNakyy,
      kategoria: r.kategoria ?? null,
      symLaji: r.symLaji ?? null,
      puoli: r.puoli ?? 'oikea',
      dx: 0,
      dy: 0,
      aihe: r.aihe ?? null,
      lunastettu: Boolean(r.lunastettu),
      elementti: r.perhe === 'piste' ? pisteElementti : nostoElementti,
      asettele: r.perhe === 'piste' ? undefined : asetteleNosto,
    }));
    merkit.aseta('nostot', datumit);
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
    });
    // Poltetun musteen lappu on paistettu laattaan: lauta ei näe sitä,
    // mutta tuntee sen laatikon samasta kaavasta (ladonta on sama).
    for (const r of nakyvat) {
      if (!r.poltettu || r.perhe === 'piste') continue;
      r.lappu = (p) => nostonLaatikko(p, r, { nimio: Boolean(r.nimioNakyy && r.nimi) });
    }
    osumat = [...naytetaan, ...nakyvat.filter((r) => r.poltettu)];
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
    naytetaan.forEach((r, i) => {
      if (r.perhe === 'piste') return;
      ikonit.push({ r, datum: datumit[i] });
      if (r.nimioNakyy && r.nimi) lappuja.push({ r, datum: datumit[i] });
    });
    const ikonilaatikko = ({ r, datum }) => nostonLaatikko(r.p, r, {
      dx: datum.dx, dy: datum.dy, nimio: false,
    });
    laskeLaatikot = () => {
      laatikot = [
        ...ikonit.map(ikonilaatikko),
        ...nakyvat.filter((r) => r.poltettu).map((r) => nostonLaatikko(r.p, r)),
      ];
    };
    laskeLaatikot();
    sovittelu = {
      siirretty: 0, kylkiVaihtui: 0, piilotettu: 0, jaljella: 0, lappuja: lappuja.length,
    };
    laskurit = new Map();
    for (const o of osumat) if (o.aihe) laskurit.set(o.aihe, (laskurit.get(o.aihe) ?? 0) + 1);
    paivitaValot();
    // Auki oleva kortti, jonka merkki ei ole enää ruudulla, sulkeutuu
    // kuten kartalla kerroksen piiloutuessa.
    const auki = ui.fokuskohdeAuki;
    if (auki?.ankkuri && !osumat.some((o) => o.id === auki.id)) suljeFokuskohde(ui);
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
   */
  const sovittele = ({ nimet = [] } = {}) => {
    if (!lappuja.length) return sovittelu;
    const tulos = sovitteleLaput({
      laput: lappuja.map(({ r, datum }) => ({
        avain: datum.avain,
        kylki: datum.puoli,
        laatikko: (kylki, dx, dy, nimio) => nostonLaatikko(r.p, r, {
          kylki, dx, dy, nimio,
        }),
      })),
      esteet: nimet,
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
    sovittelu = {
      siirretty: tulos.siirretty,
      kylkiVaihtui: tulos.kylkiVaihtui,
      piilotettu: tulos.piilotettu,
      jaljella: tulos.jaljella,
      lappuja: lappuja.length,
    };
    return sovittelu;
  };

  return {
    paivita,
    sovittele,
    paivitaValot,
    /**
     * Napautettavat merkit ruudulla ({ avain, id, lat, lng, nimi, avaa,
     * perhe, poltettu }). Nostoilla ja eläintäyillä on lisäksi
     * `lappu(p)`: nimilapun ruutulaatikko annetussa ruutupisteessä —
     * ikonin ja näkyvän nimiön yhdiste, tai pelkkä ikonin ruutu, jos
     * lappua ei juuri nyt ole (ks. NIMILAPPU ON OSA OSUMAPINTAA).
     */
    osumat: () => osumat,
    /** Kiinteän musteen laatikot nimiladonnan varauksiksi (ks. paivita). */
    laatikot: () => laatikot,
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
      .map(({ r, datum }) => ({
        id: datum.id,
        nimi: datum.nimi,
        // Perhe kertoo savukkeelle, mikä ovi lapun takaa aukeaa
        // (nosto = kohdekortti, elain = eläintäky).
        perhe: datum.perhe,
        puoli: datum.puoli,
        dx: datum.dx,
        dy: datum.dy,
        ...nostonLaatikko(r.p, r, {
          kylki: datum.puoli, dx: datum.dx, dy: datum.dy, nimio: true,
        }),
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
