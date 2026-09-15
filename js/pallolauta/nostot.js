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
import { avaaFokuspiste, fokuspisteKuvio, fokuspisteenAsteet } from '../fokuspiste.js';
import { fokusvirtaAarrepisteOhje, fokusvirtaKohtaamispiste } from '../fokusvirta.js';
import {
  NOSTOSYM_MINI_RUUTU, NOSTOSYM_NIMIO_KOKO, nostosymNimioAsemointi, nostosymNimioMitta,
  nostosymPaakategoria, piirraNostosymKartalle,
} from '../fokusnosto-symbolit.js';
import { KARTTANIMI_KOOT } from '../karttanimet.js';
import { karttavaloVari, karttavalotLue } from '../karttavalot.js';
import { nostoladontaTiiviste } from '../nostoladonta.js';
import { pallonNostoOnPoltettu } from '../pallo.js';
import { PALLOLAUDAN_LEVEYS } from './kamera.js';
import { nimenKarttakerroin } from './nimet.js';
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
/** Noston mitta juuri nyt: ruutuvakio × kartan kerroin. */
export function nostonMitta() {
  return NOSTON_MITTA * nostonKarttakerroin;
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
  const mitta = d.mitta ?? nostonMitta();
  g.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${mitta.toFixed(4)})`;
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
export function nostonLaatikko(p, d, {
  kylki = null, dx = 0, dy = 0, nimio = null,
} = {}) {
  const mitta = nostonMitta() * merkinKerroin(d);
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
export function luoNostot({
  ui, merkit, asteet, ruudulla, onPoltettu = pallonNostoOnPoltettu,
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
  const keraa = (nakyva, uloinOsuus = 0) => {
    const { game } = ui;
    const pack = game?.pack;
    const rivit = [];
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
        rivit.push({
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

  /**
   * Päivittää kerroksen: kutsutaan levossa (js/pallolauta/lauta.js).
   * Palauttaa elävien laatikot nimiladonnan varauksiksi ja määrän.
   */
  const paivita = ({
    nakyva, katto = NOSTOJEN_KATTO, keskipiste = null, uloinOsuus = 0,
    karttaskaala = 0, vertailuskaala = 0,
  } = {}) => {
    // Kyltti karttaan (ks. KARTTANOSTON KYLTTI ON KARTAN MITTA):
    // sama kerroin kuin kaupunkien nimikylteillä, laudan mittakaavasta.
    nostonKarttakerroin = nimenKarttakerroin(karttaskaala, vertailuskaala || undefined);
    viimeisinUloinOsuus = uloinOsuus;
    const rivit = keraa(nakyva, uloinOsuus);
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
    const elavat = nakyvat.filter((r) => !r.poltettu)
      .sort((a, b) => ((a.perhe === 'piste') - (b.perhe === 'piste')) * -1
        || (Number(Boolean(b.kaupunki)) - Number(Boolean(a.kaupunki)))
        || (a.etaisyys - b.etaisyys));
    const naytetaan = elavat.slice(0, Math.max(0, katto));
    const mittaNyt = nostonMitta();
    datumit = naytetaan.map((r) => ({
      avain: r.avain,
      // Kaupunki on isompi kuin nosto (merkinKerroin).
      mitta: mittaNyt * merkinKerroin(r),
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
    /**
     * Merkkiportin viimeisin päätös (ks. PÄÄKARTAN MERKKIRAJA):
     * `{ merkit, piiloon, polttovelka }` tai null, jos maan lehti ei
     * ole näkyvissä. Savukkeiden ja vartijoiden mittari.
     */
    portti: () => (portti ? { ...portti, uloinOsuus: viimeisinUloinOsuus } : null),
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
