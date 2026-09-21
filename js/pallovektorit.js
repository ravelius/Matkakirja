/*
 * ======== PALLON VEKTORIVIIVAT: RANTAVIIVA ON RUUDUN PIKSELI =======
 *
 * OMISTAJA 6.9.2026 ilta (Raamattu, VEKTORIT SAMALLA — Fablen ehdotus
 * *"rantaviivat ja nimet vektoreina laattojen päälle, jolloin ne ovat
 * aina tasan pikselin levyisiä"*, omistaja sanatarkasti: *"Tehdään se
 * vektori juttu nyt samalla."*).
 *
 * Poltettu rantaviiva on PAPERIVAKIO laatassa (1,35 px mustetta
 * tools/fokuskartta/piirto.js osiossa 7) mutta KARTTAVAKIO ruudulla:
 * laatan venytys venyttää sen mukanaan, ja liikkeessä Z5-laatoilla se
 * on mitatusti 8 laitepikselin sumea vyö (docs/moduulit/
 * pallon-vektoriviivat.md luku 2.1). Tämä kerros piirtää saman
 * geometrian (Natural Earth 1:10m, sama 0,006°:n harvennus kuin
 * pyramidissa) VEKTOREINA laattojen päälle, jolloin viiva on tasan
 * tavoiteleveytensä laitepikseleitä joka korkeudella, levossa ja
 * liikkeessä — kuten Google Earthissä ja kuten CSS2D-nimet jo nyt.
 *
 * MITEN (suunnitelma docs/moduulit/pallon-vektoriviivat.md luku 4,
 * kaikki luvut mitattu, ei arvattu):
 *
 *  - THREE.JS:N FAT LINE (Line2 / LineSegments2 + LineMaterial), jonka
 *    varjostin laskee leveyden RUUTUPIKSELEINÄ (worldUnits false,
 *    resolution = kotelon koko css-pikseleinä). Luokat luetaan
 *    Globe.gl:n OMASTA NIPUSTA elävän polkuolion kautta — kirjasto
 *    rakentaa pathsDatan Line2:na — joten uutta kirjastoa ei ladata
 *    eikä yhden tiedoston versio muutu. Yksi instanssoitu piirtokutsu
 *    solua kohti (mitattu +22 Ateenan näkymässä, +2 koko pallolla);
 *    kirjaston oma pathsData olisi yksi piirtokutsu per viiva eli
 *    1 923 / 13 917 (luku 2.2, HYLÄTTY).
 *  - TÄSMÄLLEEN PINNAN SÄTEELLÄ (VEKTORIT_KORKEUS 0). Nostettu viiva
 *    kulki lähikuvassa parallaksin takia 2–4 laitepikseliä poltetun
 *    viivan VIERESSÄ (luku 2.3, sama oppi kuin lepokerroksen "hypyssä"
 *    v1641:ssä); järjestys hoidetaan syvyyssiirrolla, ei nostolla.
 *  - LÄPINÄKYVIEN JONOSSA, EI SYVYYSKIRJOITUSTA: renderOrder −0,5
 *    (laatat ja lepokerros ≤ −1, reitit 0, kalvot 1) ja polygonOffset
 *    −12 (laattakerroksen −8:n edelle). Opaakki viiva KATOSI
 *    lepokerroksen alle (magentaa 1 px vs 4 696), koska kerros on
 *    transparent ja piirtyy kaikkien opaakkien jälkeen. Näin viiva ei
 *    koskaan peitä pisteitä, nappulaa eikä reittejä (koepiste 0
 *    kaikissa mitatuissa ajoissa) ja pallon takapuoli leikkautuu
 *    syvyystestillä.
 *  - AINEISTO ÄMPÄRISTÄ tasoittain yksinkertaistettuna (viisi tasoa,
 *    toleranssit 0,1…0) ja 10°:n soluina, int16-deltana; taso valitaan
 *    ruudun tiheydestä samalla mitalla kuin lepokerroksella
 *    (laitepikseliä astetta kohti ruudun keskellä) ja solut näkyvästä
 *    alueesta. Työkalu ja työnkulku: tools/tee-pallovektorit.mjs (erä
 *    V0). Kaikki vuoden välimuistissa versioidussa polussa.
 *  - KAIKKI LIIKE ANIMOIDAAN PEHMEÄSTI (Raamattu 3.9.2026): uusi solu
 *    ei välähdä ruudulle vaan häipyy päälle 260 ms:n ease-outilla
 *    kloonatulla materiaalilla; häiveen jälkeen olio palaa jaettuun
 *    materiaaliin, joten materiaaleja on levossa tasan kaksi.
 *
 * KERROS EI KOSKE MUIHIN: se ei muuta Globe.gl:n kerroksia (pathsData
 * saa hetkeksi nollamittaisen osan `vektorit` luokkien lukemiseksi ja
 * menettää sen heti), laattakerrosta (js/pallolaatat.js, js/pallo.js)
 * eikä pelin merkkejä. Kytkentä tehdään pallolaudassa (erä V2) ja
 * perääntyminen on yksi rivi: `?vektorit=0` tai PALLOVEKTORIT_OLETUS.
 */

/*
 * Laattakerroksen puhtaat apurit tulevat js/pallo.js:n kautta (se vie
 * ne edelleen js/pallolaatat.js:stä): sama pallonPiste-kaava kuin
 * lepokerroksella, sama näkyvän alueen laatikko (sauman aukikierto) ja
 * samat mittaluvut, jotta kaksi kerrosta ei voi eriytyä.
 */
import {
  LEPOKERROS_MITTAMATKA_PX, LEPOKERROS_NAYTTEITA, kolmiulotteinen, kytkePallonKehys,
  lepokerroksenAlue, pallonPiste, pinnanPiste,
} from './pallo.js';

/*
 * pinnanPiste MUUTTI js/pallolaatat.js:ään (vika v1649): sormiveto
 * tarvitsee saman säde–pallo-leikkauksen eikä js/pallo.js voi tuoda
 * tätä moduulia (kehä). Vienti jatkuu tästä, joten kutsujat ja testit
 * näkevät sen edelleen samassa osoitteessa.
 */
export { pinnanPiste };

/** Pelin ämpäri (sama osoite kuin js/pallo.js:ssä). */
const R2 = 'https://media.matkakirja.app/';
/**
 * Vektoriaineiston versio = tools/tee-pallovektorit.mjs:n ajon kansio
 * (erä V0). Polku on versioitu ja ämpäri lähettää sille `immutable`,
 * joten uusi ajo saa AINA uuden version — vanha jää selainten koreihin.
 */
export const PALLOVEKTORIT_VERSIO = '2026-09-21-gshhs';
export const PALLOVEKTORIT_JUURI = `${R2}julisteet/pallo/vektorit/${PALLOVEKTORIT_VERSIO}/`;

/*
 * ======== VANHAN KARTAN VIIVA, EI TUSSIA (omistaja 7.9.2026) ========
 *
 * Omistaja työpöydällä sanatarkasti: *"Miksi muuten kartan rajat ovat
 * noin mustia ja röpelöisiä? Ovatko nuo nyt sitä uutta vektorilla
 * piirrettyä? Sitä saisi vähän pehmentää paremmin vanhan kartan tyyliin
 * istuvaksi."* Tyylivertailu on tasokartan rantaviiva: ohut, ruskea,
 * pehmeäreunainen — ei musta nauha.
 *
 * MITATUT SYYT (mittaus 7.9.2026, tools/savukkeet/savuke-pallo-rantaviivat.mjs):
 *
 *  1. PÄÄTYPYÖRYLÄT KASASIVAT MUSTEEN. LineSegments2 piirtää jokaisen
 *     janan pyöreillä päillä, jotka ulottuvat puoli viivanleveyttä
 *     kärkien YLI. Yleiskuvassa (23,8 laitepikseliä astetta kohti,
 *     lod 2 = 0,008°) jana on ruudulla 0,19 px pitkä ja pyörylä 0,75 px
 *     säteinen: JOKAINEN viivan pikseli sai päälleen ~8 läpinäkyvää
 *     kiekkoa, ja 1 − 0,1⁸ ≈ 1 — peitto 0,9 saturoitui mustaksi
 *     riippumatta siitä, mikä RANTA_PEITTO oli. Kärkitiheyden vaihtelu
 *     teki tummuudesta epätasaisen: se on se "röpelöinen".
 *     KORJAUS: varjostin hylkää päätypyörylät (`abs(vUv.y) > 1` →
 *     discard), jolloin janat laatoittavat viivan LIMITTÄMÄTTÄ ja
 *     musteen peitto on tasan se, mikä materiaaliin on kirjoitettu.
 *  2. KOVA REUNA. Kolmion reuna sai vain 4× MSAA:n (mitattu
 *     gl.SAMPLES = 4), eli tummalla ohuella viivalla viisi porrasta —
 *     silmä lukee sen sahalaidaksi. KORJAUS: nelikulmio piirretään
 *     VEKTORIT_PEHMENNYS_LAITEPX verran leveämpänä kummallekin
 *     reunalle ja varjostin häivyttää peiton siinä vyössä nollaan
 *     (smoothstep). Ydin pysyy tavoiteleveydessään.
 *  3. LIIKAA KÄRKIÄ KAUKAA. Ämpärin tasoportaat ovat karkeat
 *     (0,1 / 0,03 / 0,008 / 0,004 / 0), joten yleiskuva lataa 0,008°:n
 *     aineiston, jonka kärkiväli on murto-osa pikselistä. KORJAUS:
 *     Douglas–Peucker AJETAAN VIELÄ SELAIMESSA kameran korkeuden
 *     mukaan (harvennusPorras: viisi porrasta, jotta geometriaa ei
 *     rakenneta uudelleen joka kehyksellä) — lähikuvassa porras on 0
 *     eli täysi yksityiskohta.
 *  4. MUSTE OLI POLTETUN VIIVAN MUSTE. #3a2819 peitto 0,9 on tummempi
 *     kuin tasokartan rantaviiva; uusi arvo on mitattu omistajan
 *     kuvakaappauksesta (ks. RANTA_MUSTE).
 */

/**
 * Rantaviivan tavoiteleveys CSS-pikseleinä [kaukana, lähellä]. Leveys
 * on RUUTUVAKIO (varjostin laskee sen ruutupikseleinä), mutta
 * yleiskuvassa ohuempi: kaukaa katsottuna manner on pelkkää ääriviivaa
 * ja paksu viiva peittäisi maiseman. Vanhan tasokartan rantaviiva on
 * omistajan kuvassa noin 1 css-pikselin levyinen.
 */
export const VEKTORIT_LEVEYS_CSS = [0.8, 1.2];
/** Maiden rajan leveys css-pikseleinä [kaukana, lähellä] (rantaviivaa hennompi). */
export const VEKTORIT_RAJA_LEVEYS_CSS = [0.65, 0.95];
/**
 * Leveyden liukuma ruudun tiheydessä (laitepikseliä astetta kohti):
 * tämän alle kaikki on "kaukana", yli "lähellä", välissä lineaarinen.
 */
export const VEKTORIT_LEVEYS_TIHEYS = [25, 250];
/**
 * Reunan pehmennys LAITEPIKSELEINÄ kummallakin puolella: nelikulmio
 * levitetään tämän verran ja varjostin häivyttää peiton vyössä
 * nollaan. 0 = entinen kova reuna (vain MSAA).
 */
export const VEKTORIT_PEHMENNYS_LAITEPX = 0.65;
/**
 * TÄSMÄLLEEN PINNAN SÄTEELLÄ. Nosto 0,001 (0,1 yksikköä) siirsi viivan
 * lähikuvassa 2–4 laitepikseliä poltetun viivan viereen (parallaksi,
 * luku 2.3) — järjestys hoidetaan syvyyssiirrolla kuten lepokerroksella
 * (LEPOKERROS_KOROTUS 1).
 */
export const VEKTORIT_KORKEUS = 0;
/** Syvyyssiirto kameraa kohti: laattakerroksen −8:n edelle (luku 2.3). */
export const VEKTORIT_SYVYYSSIIRTO = -12;
/** Läpinäkyvien jono: laatat ja lepokerros ≤ −1, viivat, reitit 0, kalvot 1. */
export const VEKTORIT_RENDER_ORDER = -0.5;
/** Yksinkertaistuksen tavoitetarkkuus ruudulla (laitepikseliä). */
export const VEKTORIT_TERAVYYS_PX = 0.5;
/** Kameran liikkeen jarru: päivitys ajetaan korkeintaan näin tiheästi. */
export const VEKTORIT_JARRU_MS = 60;
/** Uuden solun häive päälle (KAIKKI LIIKE ANIMOIDAAN PEHMEASTI). */
export const VEKTORIT_HAIVE_MS = 260;
/** Muistissa pidettävien solujen katto (LRU karsii vanhimmat). */
export const VEKTORIT_SOLUKATTO = 160;
/** Rajat piirretään vasta tästä tiheydestä ylöspäin (laitepikseliä/aste). */
export const VEKTORIT_RAJAT_PX_ASTE = 30;
/** Näkyvän alueen reunus asteina (solu ladataan ennen kuin se tulee ruutuun). */
export const VEKTORIT_VARA_AST = 1;
/**
 * SELAIMEN OMA HARVENNUS: suurin sallittu poikkeama RUUDULLA
 * laitepikseleinä, kun ämpärin taso vielä tihennetään kameran mukaan.
 * Yhdessä VEKTORIT_TERAVYYS_PX:n (tiedostotason valinta) kanssa
 * pahin yhteenlaskettu virhe on 1,1 laitepikseliä eli reilusti alle
 * puoli css-pikseliä.
 */
export const VEKTORIT_HARVENNUS_PX = 0.6;
/**
 * Harvennuksen PORTAAT asteina (karkeasta tarkkaan; 0 = ei harvennusta).
 * Portaita on viisi eikä liukuma, jotta geometriaa ei rakenneta
 * uudelleen joka kehyksellä: porras vaihtuu vasta, kun kamera on
 * liikkunut nelinkertaisen matkan tiheydessä.
 */
export const VEKTORIT_HARVENNUS_PORTAAT = [0.05, 0.012, 0.003, 0.0008, 0];
/** Montako solua saa rakentaa uudelleen yhdellä päivityksellä (portaan vaihtuessa). */
export const VEKTORIT_HARVENNUS_KATTO = 8;
/**
 * Rantaviivan muste. Mitattu omistajan tasokarttakuvasta 7.9.2026:
 * viivan ydin on rgb(55, 47, 24) tienoilla ja paperi rgb(209, 202, 181),
 * eli viiva on RUSKEA eikä musta ja peittää vain osan pohjasta. Peitto
 * 0,58 antaa pergamentin päällä noin rgb(148, 135, 118) — sama
 * vaikutelma kuin tasokartan ohuella ruskealla rannikolla, kun
 * päätypyörylät eivät enää kasaa mustetta (ks. tiedoston alku).
 */
export const RANTA_MUSTE = '#5a4330';
export const RANTA_PEITTO = 0.58;
/**
 * Maiden raja: sama ruskea vaaleampana ja selvästi hennompana.
 *
 * TÄMÄ ON 14.9.2026 ALKAEN KAIKKIEN RAJOJEN MUSTE, myös kohdemaan
 * kehän (karttauudistuksen PÄÄTÖKSET 15 kohta 3, omistaja: *"Muuta
 * maanraja saman variseksi kuin muut rajat."*). Arvo on paletissa
 * (`--raja-muste`); tämä vakio on VARA sille, kun CSS:ää ei ole
 * luettu, eikä se saa erota paletista (tests/maakorostus.test.mjs).
 */
export const RAJA_MUSTE = '#6b5539';
export const RAJA_PEITTO = 0.34;
/*
 * ======== PELAAJAN MAAN RAJA VAHVEMMALLA (omistaja 11.9.2026) ======
 *
 * Sanatarkasti: *"Peli voisi piirtää vahvemmalla aina kyseisen
 * valtion rajat jossa pelaaja on"*.
 *
 * KOROSTUS ON SAMAA MUSTETTA, EI TOISTA VÄRIÄ. Kartta on vuoden 1873
 * atlas, joten korostus tehdään niin kuin se tehtäisiin kaiverruksessa:
 * sama ruskea muste tummempana ja paksumpana, ei toista väriä eikä
 * hehkua. Sävy on 14.9.2026 alkaen TÄSMÄLLEEN naapurien rajan sävy
 * (RAJA_MUSTE, ks. alla PÄÄTÖKSET 15); peitto on täysi eikä rajan
 * 0,34, jotta oma maa erottuu myös naapurinsa rannikosta.
 *
 * LEVEYS ON SAMA SUHDE KUIN TASOKARTALLA. Tasokartan vahvistettu
 * ääriviiva on 2 ruutupikseliä eli runsas puolitoista kertaa poltettu
 * rantaviiva (js/maatummennus.js TUMMENNUS_VIIVA, omistajan mitoitus
 * 1.9.2026 *"paksunna maan rajaa myös hieman"*). Pallolla sama suhde
 * tarkoittaa noin 2,5-kertaista tavalliseen rajaan nähden — ja koska
 * leveys liukuu ruudun tiheydessä kuten muillakin lajeilla, korostus
 * ei paksune tolpaksi yleiskuvassa.
 *
 * VIIVA EI OLE KATKONAINEN. Poltettu ja vektoriraja ovat pisteviivaa
 * (RAJA_KATKO_YKS); korostus on YHTENÄINEN, koska juuri ehjä kehä
 * kertoo silmälle "tämä on yksi maa" — sama ero kuin tasokartalla,
 * jossa vahvistettu ääriviiva on yhtenäinen ja poltettu raja pisteinä.
 */
/*
 * ======== KEHÄN MUSTE (KARTTAUUDISTUKSEN PÄÄTÖKSET 1, 14 JA 15) ====
 *
 * Omistaja 13.9.2026: *"Maan rajat vahvistetaan punaisella viivalla
 * (pelin varipaletista)"* — kehä oli hetken `--mark`-punainen, sitten
 * murrettu punainen ja 14.9. iltapäivällä musteen sininen #1f3a5f.
 * PÄÄTÖKSET 15 kohta 3 (omistaja 14.9.2026) päättää sarjan
 * sanatarkasti: *"Muuta maanraja saman variseksi kuin muut rajat."*
 *
 * KEHÄ ON SIIS SAMAA MUSTETTA KUIN NAAPURIEN RAJAT (RAJA_MUSTE
 * #6b5539, paletissa `--raja-muste`). Ero naapuriin ei ole väri vaan
 *
 *   LEVEYS    3,1 css-px vs. tavallisen rajan 0,95 (yli kolminkertainen),
 *   PEITTO    1 vs. 0,34 (sama muste täytenä eikä haaleana),
 *   KUVIO     yhtenäinen viiva vs. pisteviiva (RAJA_KATKO_YKS).
 *
 * Tämä palauttaa myös 11.9.2026 kirjatun perustelun *"KOROSTUS ON
 * SAMAA MUSTETTA, EI TOISTA VÄRIÄ"* (yllä): kartta on vuoden 1873
 * atlas, ja kaiverruksessa oma maa korostetaan vahvemmalla vedolla,
 * ei toisella värillä. Värillisen kohdemaan päällä muste erottuu,
 * koska peitto on täysi: mitattu kontrasti seepiapaperiin 5,24 ja
 * värilliseen maahan (230,219,172) 5,06 (tests/maakorostus.test.mjs
 * laskee molemmat).
 *
 * === ARVO ON YHDESSÄ PAIKASSA, JA SE PAIKKA ON CSS ================
 *
 * Kehä piirretään kahdella laudalla: tasokartalla SVG-viivana
 * (js/maatummennus.js + `.maatummennus-viiva { stroke: var(--raja-muste) }`)
 * ja pallolla WebGL-viivana (tämä tiedosto). Pelaaja ei näe molempia,
 * mutta kaksi kovakoodattua heksalukua eriytyisi ensimmäisessä
 * sävynmuutoksessa — juuri se vika, jonka suunnitelman riski 4.3
 * nimeää. Molemmat pallon rajamateriaalit (tavallinen raja ja kehä)
 * lukevat saman muuttujan `rajanMuste()`-funktiolla, joten ne eivät
 * voi ajossa erota toisistaan; vakiot alla ovat VARA sille
 * tilanteelle, jossa muuttujaa ei ole (testit ilman tyylitiedostoa,
 * yhden tiedoston versio ennen CSS:n latausta).
 */
export const KOROSTUS_MUSTE = RAJA_MUSTE;

/**
 * Rajan muste juuri nyt: paletin `--raja-muste`, tai RAJA_MUSTE jos
 * muuttujaa ei saada luettua. Sama funktio kummallekin rajalajille —
 * kohdemaan kehä ei ole oma värinsä (PÄÄTÖKSET 15 kohta 3).
 */
export function rajanMuste(dokumentti = null) {
  const doc = dokumentti ?? globalThis.document ?? null;
  const juuri = doc?.documentElement ?? null;
  if (!juuri || typeof globalThis.getComputedStyle !== 'function') return RAJA_MUSTE;
  try {
    const arvo = globalThis.getComputedStyle(juuri).getPropertyValue('--raja-muste').trim();
    // Kelpaa vain, jos se on väri: selvittämätön var() kaataisi kolmion.
    return /^#[0-9a-fA-F]{3,8}$|^rgba?\(/.test(arvo) ? arvo : RAJA_MUSTE;
  } catch {
    return RAJA_MUSTE;
  }
}

/*
 * PEITTO ON TÄYSI, EI 0,68 (sama perustelu kuin tasokartalla,
 * css/styles.css .maatummennus-viiva): himmeä punainen luki
 * värikartalla ruskeana, eli juuri siltä, miltä sen ei pitänyt.
 *
 * TÄYSI PEITTO ON 14.9.2026 ALKAEN MYÖS SE, MIKÄ EROTTAA kehän
 * naapurin rajasta leveyden ja yhtenäisyyden ohella: sävy on nyt
 * sama, joten haalennettu kehä sulaisi naapurirajaan.
 */
/*
 * ══ KOROSTUS ON SÄDEKEHÄ, EI TOISTA RANTAVIIVAA ══════════════════════
 *
 * Omistaja 19.9.2026 klo 23.31 (iPad, Ranskan lehti Gironden ja
 * Arcachonin kohdalla): rannikon rajaviiva piirtyy irrallisina
 * silmukoina ja paikoin kaksoisviivana.
 *
 * JUURISYY (mittaus 20.9.2026, docs/raportit/viesti-fable-maalehti-
 * viivat-20260920.md): sama rannikko piirtyy kahdesta eri Natural
 * Earth -aineistosta. Rannikkoviiva tulee `ne_10m_ocean`ista 0,006°:n
 * harvennuksella, ja PELAAJAN OMAN MAAN korostuskehä
 * `assets/data/maapolygonit.json`ista, joka on `ne_10m_admin_0` DP
 * 0,2 lautayksikön harvennuksella ja 0,1 yksikön kvantisoinnilla.
 * Poikkeama on mediaanina 72 m mutta maksimeissa yli 700 m, ja koska
 * korostus oli LEVEÄMPI ja piirtyi PÄÄLLÄ, ohut rannikkoviiva pisti
 * esiin sen vierestä. Korostus on päällä vain pelaajan omassa maassa,
 * ja juuri siksi ilmiö näkyi Ranskassa eikä muualla.
 *
 * MIKÄ EI KORJANNUT SITÄ: korostusaineiston tarkkuuden nosto (0,02 yks
 * + 0,01 kvantisointi) pudotti mediaanin 8 metriin mutta jätti
 * maksimit ennalleen — ne ovat kohtia, joissa `admin_0` ja `ocean`
 * ovat eri mieltä rajan kulusta (suiston sulkeva viiva) — ja kasvatti
 * tiedoston 1,45 → 3,17 Mt ilman näkyvää eroa. Hylätty mittauksen
 * perusteella.
 *
 * MITÄ TEHTIIN (Fablen päätös 20.9.2026, vaihtoehto a): korostus
 * piirtyy rannikkoviivan ALLE ja leveämpänä, jolloin se lukee
 * sädekehänä — rannikko on yksi viiva, jonka reuna hohtaa maan omaa
 * mustetta. PEITTO PYSYY TÄYTENÄ: se on omistajan päätös 13.9.2026
 * (PÄÄTÖKSET 1, vartiona tests/maakorostus.test.mjs), koska kohdemaan
 * sisus on värillinen ja himmeä kehä luki ruskeana. Aineistoa ei
 * kasvatettu eikä kahta lähdettä yhdistetty; rakenteellinen korjaus
 * (korostuksen naulaus rannikkorenkaaseen) on Fablen jonossa.
 */
export const KOROSTUS_PEITTO = 1;
/*
 * Korostetun rajan leveys css-pikseleinä [kaukana, lähellä].
 *
 * LEVEÄMPI 14.9.2026 (karttauudistuksen PÄÄTÖKSET 11 kohta 2 c,
 * omistaja: *"aariviiva saisi olla hieman leveampi"*). Lähipää 2,5 →
 * 3,1 css-px on *hieman*: se on 24 % lisää eli yhden pikselin
 * kuudesosien tarkkuudella juuri se, mitä silmä lukee samana viivana
 * hitusen vahvempana. Kaukopää liukuu samassa suhteessa (1,7 → 2,1),
 * jottei yleiskuva paksune tolpaksi — liukusuhde on kerroksen oma
 * (viivanLeveysCss).
 *
 * TASOKARTAN KEHÄ EI LEVENE. Siellä 3 px mitattiin 1.9.2026 tolpaksi,
 * joka peitti Bretagnen pikkusaaret (js/maatummennus.js
 * TUMMENNUS_VIIVA); pallolla saaret piirtyvät laatoista eri
 * mittakaavassa eikä sama mittaus päde.
 */
/*
 * KAUKOPÄÄ 3,2 → 1,6 css-px (Sonnet 1, kierros 18, 20.9.2026:
 * *"Tanskan ja Viron ääriviiva on kaukokuvassa paksu musta möykky"*).
 *
 * MITATTU SYY: kaukokuvassa (tiheys 20 laitepx/aste) kehän janojen
 * mediaanipituus on 1,1 laitepikseliä ja 43 % janoista on alle
 * pikselin, kun viiva oli 9,6 laitepikseliä leveä (3,2 css × dpr 3).
 * Viiva oli siis YHDEKSÄN KERTAA janaa pidempi kuin jana itse — ja
 * saarivaltiolla (Tanska 15 rengasta, Viro 5) päällekkäiset janat
 * täyttivät maan umpeen. Lähipäässä sama luku on 5 css-px eikä siinä
 * ole vikaa: siellä jana on 5 laitepikseliä pitkä.
 *
 * 1,6 css-px on kaukopäässä kaksi kertaa rantaviivan leveys (0,8) —
 * kehä erottuu yhä korostukseksi mutta ei enää ole leveämpi kuin
 * kuvio, jota se seuraa.
 */
/* OMISTAJA 20.9.2026 klo 16.45 (Ranska koko iPadin ruudulla): "maan rajan
 * viiva liian paksu" -> lahipaa 5 -> 3 css-px. */
export const VEKTORIT_KOROSTUS_LEVEYS_CSS = [1.6, 3];
/**
 * PIENIN PIIRRETTÄVÄ RENGAS laitepikseleinä (sama havainto). Rengas,
 * jonka laatikon lävistäjä on ruudulla tätä pienempi, ei piirrä muotoa
 * vaan pisteen: Tanskan pikkusaaret olivat kaukokuvassa pelkkää
 * mustetta. Raja on kaksi kertaa kaukopään viivanleveys (1,6 css ×
 * dpr), eli rengas jätetään pois vasta kun se mahtuisi kokonaan oman
 * viivansa sisään.
 */
export const KOROSTUKSEN_PIENIN_RENGAS_PX = 10;
/**
 * Korostus piirtyy rannikkoviivan ja rajojen ALLE (ks. KOROSTUS ON
 * SÄDEKEHÄ yllä): läpinäkyvien jonossa pienempi luku piirtyy ensin,
 * joten −0,55 jää rannikon (−0,5) alle. Sama syvyyssiirto kuin muilla
 * vektoreilla — nostoa ei käytetä (VEKTORIT_KORKEUS 0, parallaksi).
 */
export const VEKTORIT_KOROSTUS_RENDER_ORDER = -0.55;
/*
 * ═══════════════════════════════════════════════════════════════════
 * HIMMEÄ REITTIVERKKO LIFTATESSA (omistaja 20.9.2026 klo 13.50)
 * ═══════════════════════════════════════════════════════════════════
 *
 * Omistaja, sanatarkasti: *"entä jos piirretaan myos muutkin reitit
 * mutta himmeammalla"* — Fablen sääntö: liftatessa piirretään heiton
 * kantaman kaaret normaalisti (js/pallolauta/reitit.js) ja KAIKKI muut
 * laudan kaaret himmeinä staattisena kerroksena, kerran per lauta,
 * ilman animaatiota.
 *
 * MIKSI TÄSSÄ MODUULISSA EIKÄ REITTIKERROKSESSA: reittikerros
 * (pathsData) on Globe.gl:n tweenattu kerros — jokainen datum siirtyy
 * pathTransitionDurationin verran, ja 411 kaaren lisäys sinne
 * animoituisi ja rakentuisi uudestaan joka valinnalla. Tämä moduuli on
 * jo pallon staattisten viivojen piirtäjä: sama Line2-luokkaketju,
 * sama ruutumittojen tahdistus, sama syvyyssiirto laattojen edelle,
 * sama palajako (vektorijanat), ja olio rakennetaan KERRAN laudan
 * avaimella ja kytketään näkyviin/piiloon `visible`-lipulla. Kirkkaat
 * kantaman kaaret ovat reittikerroksessa pinnan yläpuolella
 * (REITIN_KORKEUS), joten ne piirtyvät himmeän verkon PÄÄLLE ilman
 * järjestyssääntöjä.
 *
 * VÄRI JA PEITTO: sama rajamuste kuin muillakin vektoreilla, peitto
 * VERKKO_PEITTO — himmeämpi kuin rantaviiva (0,58), jotta verkko lukee
 * taustana eikä kilpaile kantaman kaarten kanssa. Yhtenäinen viiva
 * ilman katkoa: katko on kantaman kaarten oma kieli (50/50), ja himmeä
 * verkko erottuu juuri siitä.
 */
/** Himmeän reittiverkon leveys css-pikseleinä (kaukopää, lähipää). */
export const VEKTORIT_VERKKO_LEVEYS_CSS = [0.7, 1.1];
/** Himmeän reittiverkon peitto. */
export const VERKKO_PEITTO = 0.3;
/**
 * Himmeän reittiverkon KIINTEÄ harvennus asteina (Douglas–Peucker,
 * harvennaViivat). Laudan reittipolyt ovat tiheitä (411 kaarta, 24 538
 * pistettä), ja verkko on taustakerros liftauksen mittakaavassa
 * (korkeus 0,3–0,9, pikseli 2–5 km): 0,01 astetta (≈ 1 km) pudottaa
 * pisteet 4 585:een ilman näkyvää muutosta. Kiinteä eikä zoomin mukana,
 * koska kerros rakennetaan kerran per lauta eikä uudestaan portaittain.
 * Mitattu Chromium-ohjelmistopiirrolla 20.9.2026: 24 127 janaa nosti
 * kehysajan mediaanin 141 → 346 ms; ks. savuke-reittiverkko.mjs.
 */
export const VERKON_HARVENNUS_AST = 0.01;
/**
 * Himmeän verkon PALAJAKO on väljempi kuin muilla vektoreilla (v1983,
 * CI: 40 328 janaa kun jako oli 0,1°). Verkon kaaret ovat satojen
 * kilometrien suoria kaupunkivälejä, joten 0,1° paloittelu kymmen-
 * kertaisti janamäärän (4 174 → 40 428). Verkko on himmeä taustaviiva
 * liftauksen mittakaavassa, ja 0,3°:n pala painuu pinnan alle vain
 * 3,4·10⁻⁶·R — mitattu Kelttienmeren merireitillä samaksi kuin 0,1°
 * (savuke-reittiverkko V2). 14 846 janaa.
 */
export const VERKON_JANAN_ENIMMAISPITUUS_AST = 0.3;
/*
 * HISTORIALLISET RAJAT — Isoisän linssi 1873 (Raamattu, Karttalinssit
 * "ISOISÄN LINSSI — VUOSI 1873"; Karttaseppä 21.9.2026).
 *
 * Linssi antaa toisen aikakauden rajaviivaston valmiina
 * (assets/data/rajat-1873.json, tools/tee-rajat-1873.mjs), ja kerros
 * piirtää sen soluttomana lajina kuten himmeän reittiverkon: yksi
 * LineSegments2 luokkaa kohti, ei ämpäristä, ei polttoa. Sillä aikaa
 * NYKYISET rajat (solulaji `rajat`, poltetun viivatason vektoripari) ja
 * löytämisen sumun rajat (`kaydyt`) ovat näkymättömiä: vuoden 1873
 * kartalla ei ole vuoden 2026 rajoja. Piilotus tehdään jaetun
 * materiaalin peitolla (0), jolloin solulogiikka, haut ja välimuisti
 * pysyvät täsmälleen ennallaan ja paluu on yksi luku.
 *
 * Kaksi luokkaa (aineiston `l`): 1 = valtionraja, yhtenäinen ja
 * nykyrajaa vahvempi muste (retro atlaksen raja on painettu, ei
 * pisteytetty); 2 = vasalli tai autonominen alue (Romania, Serbia,
 * Montenegro, Egypti 1873), sama katkoviiva kuin nykyrajoilla mutta
 * ohuempi.
 */
export const VEKTORIT_HISTORIA_LEVEYS_CSS = [1.0, 1.7];
export const VEKTORIT_HISTORIA2_LEVEYS_CSS = [0.75, 1.2];
export const HISTORIA_PEITTO = 0.82;
export const HISTORIA2_PEITTO = 0.6;
/** Historiallisen rajan muste: tummempi ruskea kuin nykyrajan (painettu viiva). */
export const HISTORIA_MUSTE = '#4a3320';

/**
 * Lajin leveyspääte yhdessä taulussa: piirto, mittarit ja testit
 * lukevat saman rivin, joten uusi laji ei tarvitse yhtään ehtolausetta.
 */
export const VEKTORIT_LEVEYDET = Object.freeze({
  rannikko: VEKTORIT_LEVEYS_CSS,
  rajat: VEKTORIT_RAJA_LEVEYS_CSS,
  korostus: VEKTORIT_KOROSTUS_LEVEYS_CSS,
  verkko: VEKTORIT_VERKKO_LEVEYS_CSS,
  historia: VEKTORIT_HISTORIA_LEVEYS_CSS,
  historia2: VEKTORIT_HISTORIA2_LEVEYS_CSS,
});
/**
 * Rajan pistekuvio maailmayksikköinä (piste, väli): poltettu raja on
 * 1,5 R piste ja 3 R väli, ja z7:llä R ≈ 1 px ≈ 0,00727 yksikköä.
 */
export const RAJA_KATKO_YKS = [0.011, 0.022];
/** Kerros on oletuksena päällä; `?vektorit=0` ottaa sen pois. */
export const PALLOVEKTORIT_OLETUS = true;
/** Kytkimen muistipaikka (kehittäjän vipu, savukkeet). */
export const PALLOVEKTORIT_AVAIN = 'matkakirja-pallovektorit';

/**
 * Onko vektorikerros päällä: `?vektorit=0|1` voittaa muistetun valinnan,
 * muistettu valinta oletuksen. Apuri on TÄSSÄ MODUULISSA eikä
 * js/ui-apurit.js:ssä (suunnitelma luku 4.3): kerros on pallolaudan oma
 * eikä pelin asetus, ja ui-apurit on toisen erän työn alla.
 */
export function pallovektoritPaalla(ikkuna = globalThis) {
  try {
    const param = new URLSearchParams(ikkuna.location?.search ?? '').get('vektorit');
    if (param === '0') return false;
    if (param === '1') return true;
  } catch {
    /* ei osoitetta (testiajo) */
  }
  try {
    const muistettu = ikkuna.localStorage?.getItem(PALLOVEKTORIT_AVAIN);
    if (muistettu === '0') return false;
    if (muistettu === '1') return true;
  } catch {
    /* yksityinen selaus */
  }
  return PALLOVEKTORIT_OLETUS;
}

/*
 * HIMMEÄN REITTIVERKON KYTKIN (v1984 hotfix, omistajan havainto v1983
 * työpöydällä: Pariisista liftatessa nopan jälkeen näkymä zoomasi koko
 * pallolle, kaappaus liftaus-zoomasi-pallolle-v1983.webp). Vikaa ei
 * saatu toistettua Playwrightilla (paikallinen ja tuotanto, 2000 px,
 * noppa 3: kamera 0,205 → 0,217), joten syytä ei tiedetä; verkko on
 * ainoa uusi kerros samassa hetkessä, joten se on OLETUKSENA POIS
 * kunnes vika on ymmärretty (Fablen sääntö 30 min). `?reittiverkko=1`
 * tai localStorage-avain '1' kytkee päälle; savukkeet käyttävät avainta.
 */
export const REITTIVERKKO_AVAIN = 'matkakirja-reittiverkko';
export const REITTIVERKKO_OLETUS = false;
/** Verkko näkyy vain laudan mittakaavassa: korkeuden yläpuolella (maailmakuva) se on turha viivasto. */
export const REITTIVERKON_KORKEUSKATTO = 1.2;
export function reittiverkkoPaalla(ikkuna = globalThis) {
  try {
    const param = new URLSearchParams(ikkuna.location?.search ?? '').get('reittiverkko');
    if (param === '0') return false;
    if (param === '1') return true;
  } catch { /* ei osoitetta */ }
  try {
    const muistettu = ikkuna.localStorage?.getItem(REITTIVERKKO_AVAIN);
    if (muistettu === '0') return false;
    if (muistettu === '1') return true;
  } catch { /* yksityinen selaus */ }
  return REITTIVERKKO_OLETUS;
}

/**
 * Yksinkertaistustaso: matalin taso, jonka toleranssi on ruudulla
 * korkeintaan `teravyys` laitepikseliä. Jos mikään ei riitä, syvin —
 * silloin aineisto on jo harventamaton lähde. `pakotus` ohittaa
 * valinnan (savukkeet ja kehittäjän vipu).
 *
 * @param {number[]} lodit tasojen toleranssit asteina (0,1 … 0)
 * @param {number} tarve laitepikseliä astetta kohti ruudun keskellä
 * @param {number} teravyys tavoitetarkkuus laitepikseleinä
 * @param {?number} pakotus pakotettu taso tai null
 */
export function vektoritaso(lodit, tarve, teravyys = VEKTORIT_TERAVYYS_PX, pakotus = null) {
  const lista = Array.isArray(lodit) ? lodit : [];
  if (!lista.length) return 0;
  if (pakotus !== null && Number.isFinite(pakotus)) {
    return Math.max(0, Math.min(lista.length - 1, Math.round(pakotus)));
  }
  for (let k = 0; k < lista.length; k += 1) if (lista[k] * tarve <= teravyys) return k;
  return lista.length - 1;
}

/**
 * Viivan tavoiteleveys CSS-pikseleinä ruudun tiheyden mukaan: kaukana
 * ohut, lähellä hieman paksumpi, välissä lineaarinen liukuma.
 *
 * @param {number} tarve laitepikseliä astetta kohti ruudun keskellä
 * @param {number[]} paate [kaukana, lähellä] css-pikseleinä
 */
export function viivanLeveysCss(tarve, paate = VEKTORIT_LEVEYS_CSS) {
  const [a, b] = VEKTORIT_LEVEYS_TIHEYS;
  const t = Math.max(0, Math.min(1, ((tarve || 0) - a) / (b - a)));
  return paate[0] + (paate[1] - paate[0]) * t;
}

/**
 * Selaimen oman harvennuksen porras ASTEINA: karkein porras, joka
 * pysyy `px` laitepikselin sisällä ruudulla. Portaita on kourallinen
 * (VEKTORIT_HARVENNUS_PORTAAT), jotta geometria ei rakennu uudelleen
 * pienestä kameran nytkähdyksestä. Palauttaa 0, kun mikään porras ei
 * mahdu — silloin aineisto piirretään sellaisenaan (täysi yksityiskohta).
 *
 * @param {number} tarve laitepikseliä astetta kohti
 * @param {number} px suurin sallittu poikkeama laitepikseleinä
 */
export function harvennusPorras(tarve, px = VEKTORIT_HARVENNUS_PX) {
  if (!(tarve > 0)) return 0;
  const kate = px / tarve;
  for (const porras of VEKTORIT_HARVENNUS_PORTAAT) if (porras <= kate) return porras;
  return 0;
}

/**
 * Douglas–Peucker asteissa, leveyspiirin kutistuma huomioiden
 * (pituusaste kerrotaan cos(lat):lla, muuten napojen lähellä
 * harvennettaisiin liian vähän). Sama pinoversio kuin
 * tools/tee-pallovektorit.mjs:n `dp` — tämä ajetaan SELAIMESSA jo
 * harvennetun aineiston päälle kameran korkeuden mukaan.
 *
 * @param {Array<[number, number]>} viiva [lon, lat] -pisteet
 * @param {number} tol toleranssi asteina (0 = ei harvennusta)
 */
export function harvennaViiva(viiva, tol) {
  if (!(tol > 0) || !viiva || viiva.length < 3) return viiva;
  const n = viiva.length;
  const kx = Math.max(0.05, Math.cos((viiva[n >> 1][1] * Math.PI) / 180));
  const pida = new Uint8Array(n);
  pida[0] = 1; pida[n - 1] = 1;
  const pino = [[0, n - 1]];
  const t2 = tol * tol;
  while (pino.length) {
    const [a, b] = pino.pop();
    if (b - a < 2) continue;
    const ax = viiva[a][0] * kx; const ay = viiva[a][1];
    const dx = viiva[b][0] * kx - ax; const dy = viiva[b][1] - ay;
    const l2 = dx * dx + dy * dy;
    let paras = -1; let parasD = -1;
    for (let i = a + 1; i < b; i += 1) {
      const px = viiva[i][0] * kx; const py = viiva[i][1];
      let d;
      if (l2 === 0) d = (px - ax) ** 2 + (py - ay) ** 2;
      else {
        const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
        d = (px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2;
      }
      if (d > parasD) { parasD = d; paras = i; }
    }
    if (parasD > t2) { pida[paras] = 1; pino.push([a, paras], [paras, b]); }
  }
  const ulos = [];
  for (let i = 0; i < n; i += 1) if (pida[i]) ulos.push(viiva[i]);
  return ulos;
}

/** Koko solun viivat harvennettuna; tol 0 palauttaa saman taulukon. */
export function harvennaViivat(viivat, tol) {
  if (!(tol > 0) || !viivat?.length) return viivat ?? [];
  return viivat.map((v) => harvennaViiva(v, tol));
}

/**
 * PEHMEÄ REUNA JA EI PÄÄTYPYÖRYLÖITÄ (omistaja 7.9.2026, ks. tiedoston
 * alku). LineMaterial on ShaderMaterial, joten sen varjostinta voi
 * paikata suoraan ennen ensimmäistä käännöstä — uutta kirjastoa ei
 * tarvita eikä muiden Line2-olioiden (reitit, Ihmisen matkan vanat)
 * materiaaleihin kosketa.
 *
 *  - `discard` päätypyörylälle: janat laatoittavat viivan limittämättä,
 *    joten läpinäkyvä muste ei kasaudu mustaksi kärkien kohdalla.
 *  - `pehmennys` (osuus puolileveydestä) häivyttää peiton reunavyössä
 *    nollaan, jolloin viiva on antialiasoitu myös ilman MSAA:ta.
 *
 * ===== PÄÄTYPYÖRYLÄT PALAAVAT TÄYSIN PEITTÄVÄLLE VIIVALLE ==========
 *
 * KARTTAUUDISTUKSEN PÄÄTÖKSET 11 kohta 2 a (omistaja 14.9.2026:
 * *"jostain syysta kartan punainen aariviiva ei piirry koko
 * matkalta"*). Vika MITATTIIN, ja se on tässä: LineSegments2 piirtää
 * jokaisen janan omana nelikulmiona, eivätkä peräkkäiset janat kohtaa
 * kulmassa — pyörylä on se, mikä kulman täyttää. Kun pyörylä
 * heitetään pois, jokaiseen kulmaan jää lovi, ja lovia on sitä
 * enemmän mitä rosoisempi raja on: Ranskan MAARAJAT (Belgia, Rein,
 * Alpit, Pyreneet) ovat aineistossa lyhyttä siksakkia ja rannikko
 * pitkää kaarta, joten viiva näyttää katkeavan juuri maarajoilla ja
 * pysyvän ehjänä rannikolla.
 *
 * PYÖRYLÄN POISTON PERUSTELU EI KOSKE KOROSTUSTA. Se kirjoitettiin
 * 7.9.2026 LÄPINÄKYVÄLLE mustelle (rantaviiva 0,58, rajat 0,34):
 * limittyvä läpinäkyvä muste kasautuu tummaksi kärkien kohdalla.
 * Kohdemaan kehä piirretään TÄYDELLÄ peitolla (KOROSTUS_PEITTO 1),
 * eikä täysin peittävä muste voi kasautua — sama väri päällekkäin on
 * sama väri. Pyörylät ovat siis korostukselle puhdas voitto.
 *
 * @param {object} materiaali LineMaterial
 * @param {object} [valinnat]
 * @param {boolean} [valinnat.paatypyorylat] true = kulmat täytetään
 *   (täysin peittävä viiva), false = pyörylä leikataan pois (oletus).
 * @returns true, jos paikka meni läpi; false, jos varjostin ei ole
 * odotetun näköinen (silloin kutsuja jättää leveyden ennalleen).
 */
export function pehmennaLineMaterial(materiaali, { paatypyorylat = false } = {}) {
  if (!materiaali || materiaali.userData?.pallovektoritPehmennys) return Boolean(materiaali);
  const frag = materiaali.fragmentShader;
  const kohta = 'gl_FragColor = vec4( diffuseColor.rgb, alpha );';
  if (typeof frag !== 'string' || !frag.includes(kohta) || !frag.includes('uniform float linewidth;')) {
    return false;
  }
  materiaali.uniforms.pehmennys = { value: 0 };
  // Uniform eikä käännösaikainen haara: sama varjostinkoodi kaikilla
  // kolmella materiaalilla, yksi luku erottaa ne.
  materiaali.uniforms.paatyt = { value: paatypyorylat ? 1 : 0 };
  materiaali.fragmentShader = frag
    .replace('uniform float linewidth;', 'uniform float linewidth;\n\t\tuniform float pehmennys;\n\t\tuniform float paatyt;')
    .replace(kohta, [
      '#ifndef WORLD_UNITS',
      '  if ( paatyt < 0.5 && abs( vUv.y ) > 1.0 ) discard;',
      '  if ( pehmennys > 0.0 ) alpha *= 1.0 - smoothstep( 1.0 - pehmennys, 1.0, abs( vUv.x ) );',
      '  if ( alpha < 0.003 ) discard;',
      '#endif',
      kohta,
    ].join('\n\t\t\t'));
  materiaali.needsUpdate = true;
  materiaali.userData.pallovektoritPehmennys = true;
  materiaali.userData.pallovektoritPaatyt = Boolean(paatypyorylat);
  return true;
}

/** Solun avain (sama kaava kuin tools/tee-pallovektorit.mjs:ssä). */
export function vektorisoluAvain(lon, lat, solu) {
  const sarakkeita = Math.ceil(360 / solu);
  const riveja = Math.ceil(180 / solu);
  const s = Math.min(Math.floor((lon + 180) / solu), sarakkeita - 1);
  const r = Math.min(Math.floor((90 - lat) / solu), riveja - 1);
  return `${s}_${r}`;
}

/**
 * Näkyvän alueen solut. Alueen pituuspiirit ovat AUKIKIERRETTYJÄ
 * (lepokerroksenAlue), joten sauman yli katsova ruutu saa solut
 * molemmilta puolilta ilman koko maailman laatikkoa. Tasoilla, joilla
 * koko maailma on yksi solu (solu ≥ 360), palautetaan aina ['0_0'].
 */
export function vektorisolut(alue, solu) {
  if (!(solu > 0)) return [];
  if (solu >= 360) return ['0_0'];
  if (!alue) return [];
  const sarakkeita = Math.ceil(360 / solu);
  const riveja = Math.ceil(180 / solu);
  const rivi = (lat) => Math.max(0, Math.min(riveja - 1, Math.floor((90 - lat) / solu)));
  const r0 = rivi(Math.min(90, alue.lat1));
  const r1 = rivi(Math.max(-90, alue.lat0));
  const s0 = Math.floor((alue.lon0 + 180) / solu);
  const leveys = Math.min(sarakkeita, Math.floor((alue.lon1 + 180) / solu) - s0 + 1);
  const ulos = [];
  const nahty = new Set();
  for (let r = r0; r <= r1; r += 1) {
    for (let i = 0; i < leveys; i += 1) {
      const s = (((s0 + i) % sarakkeita) + sarakkeita) % sarakkeita;
      const avain = `${s}_${r}`;
      if (nahty.has(avain)) continue;
      nahty.add(avain);
      ulos.push(avain);
    }
  }
  return ulos;
}

/**
 * Solun tiedosto viivoiksi. Muoto (tools/tee-pallovektorit.mjs, erä V0):
 * peräkkäin viivoja, kukin int32 pisteiden määrä, int32 lon·1e4,
 * int32 lat·1e4 ja sitten (n − 1) × (int16 dlon, int16 dlat)
 * 1e-4°-yksikköinä, little-endian. Delta on int16, koska harvennettu
 * kärkiväli on aina alle 3,2° — pidemmät hypyt työkalu katkaisee omaksi
 * viivakseen.
 *
 * @param {ArrayBuffer|ArrayBufferView} puskuri solun .bin
 * @returns {Array<Array<[number, number]>>} viivat [lon, lat] -pisteinä
 */
export function puraDelta(puskuri) {
  if (!puskuri) return [];
  const nakyma = puskuri instanceof ArrayBuffer
    ? new DataView(puskuri)
    : new DataView(puskuri.buffer, puskuri.byteOffset, puskuri.byteLength);
  const viivat = [];
  let o = 0;
  while (o + 12 <= nakyma.byteLength) {
    const n = nakyma.getInt32(o, true);
    // Vajaa tai rikki mennyt tiedosto: luetaan se, mikä on ehjää.
    if (!(n >= 2) || o + 12 + (n - 1) * 4 > nakyma.byteLength) break;
    o += 4;
    let x = nakyma.getInt32(o, true);
    let y = nakyma.getInt32(o + 4, true);
    o += 8;
    const viiva = new Array(n);
    viiva[0] = [x / 1e4, y / 1e4];
    for (let k = 1; k < n; k += 1) {
      x += nakyma.getInt16(o, true);
      y += nakyma.getInt16(o + 2, true);
      o += 4;
      viiva[k] = [x / 1e4, y / 1e4];
    }
    viivat.push(viiva);
  }
  return viivat;
}

/**
 * Viivat janoiksi pallon pinnalle: LineSegments2 haluaa PARIT, joten
 * jokainen polyviivan väli kirjoitetaan omana janana (xyz, xyz).
 * Piste on täsmälleen säteellä `sade` (VEKTORIT_KORKEUS 0).
 */
/* ═══ RANNIKON NAULAUS (Fablen päätös 20.9.2026, vaihtoehto 2) ══════
 *
 * Omistaja: *"Täällä virheitä rajaviivassa"*. Sama rannikko piirtyi
 * kahdesta aineistosta: rannikkoviiva `ne_10m_ocean`ista ja pelaajan oman
 * maan korostuskehä `ne_10m_admin_0`:sta. Ne ovat eri mieltä rannan
 * kulusta (mediaani 72 m, p95 173 m, suurin 1,1 km), ja suistossa ero on
 * rakenteellinen: ocean kulkee suistoa ylös, admin_0 sulkee sen suulta
 * jänteellä. Sädekehä (v1971) peitti pienen eron, mutta suiston sulkeva
 * viiva jäi näkyviin.
 *
 * NAULAUS: korostuksen rannikko-osuus otetaan SAMASTA geometriasta kuin
 * rannikkoviiva. Korostuksen omista janoista pudotetaan ne, joiden
 * MOLEMMAT päät ovat rannikkoviivan tuntumassa — tämä kattaa sekä
 * rinnakkain kulkevan rannan että suiston sulkevan jänteen, jonka päät
 * ovat suun rannoilla mutta keskikohta vedessä. Tilalle piirretään maan
 * oman rannikon janat rannikkoaineistosta. Sisämaan rajat jäävät
 * admin_0:aan, jossa ne ovat ainoa lähde.
 */

/** Hilan solun avain asteina (ks. rannikkoHakemisto). */
export const NAULAUKSEN_RUUTU_ASTETTA = 0.05;
/**
 * Kuinka lähellä rannikkoviivaa korostuksen kärki on "rannalla".
 * 0,015° on noin 1,7 km päiväntasaajalla — aineistojen p95-ero on 173 m
 * ja suurin mitattu 1,1 km, joten kynnys kattaa erot mutta jättää
 * sisämaan rajat (lähin naapurin raja on kaukana rannasta) rauhaan.
 */
export const NAULAUKSEN_TOLERANSSI_ASTETTA = 0.015;
/**
 * Suiston mutka: kun admin_0 sulkee suun jänteellä, rannikkoaineiston
 * mutka poikkeaa korostuskehästä eikä pääsisi mukaan pelkällä
 * tuntumasäännöllä. Mutka silloitetaan, jos sen päät ovat korostuksen
 * tuntumassa lähekkäin (AUKON_RAJA, noin 55 km) ja rannan polku niiden
 * välillä on kohtuullinen (MUTKAN_RAJA, noin 220 km). Näin Gironde tulee
 * mukaan, mutta naapurimaan rannikko ei silloitu maan rajan yli.
 */
export const NAULAUKSEN_AUKON_RAJA_ASTETTA = 0.5;
export const NAULAUKSEN_MUTKAN_RAJA_ASTETTA = 2;
/**
 * MILLOIN NAULATAAN.
 *
 * KAKSI KERTAA VÄÄRIN, NYT MITATTU OIKEIN (20.9.2026).
 *
 * Portti oli ensin 120 (laskettu aineistojen p95-erosta 445 m) ja
 * sitten 30 (laskettu maksimipoikkeamasta 3 939 m). MOLEMMAT LUVUT
 * OLIVAT MITTARIN HARHAA: ne mittasivat kehän kärjen etäisyyttä
 * rantaviivan lähimpään KÄRKEEN, ja pitkän rantajanan keskikohta on
 * satoja metrejä lähimmästä kärjestä vaikka se on täsmälleen viivalla.
 * Oikea mitta on etäisyys lähimpään JANAAN, ja sillä ero on:
 *
 *   FRA  mediaani 62 m,  p95 141 m,  suurin 192 m
 *   DNK  mediaani 49 m,  p95 112 m,  suurin 140 m
 *   EST  mediaani 44 m,  p95 108 m,  suurin 141 m
 *   GRC  mediaani 65 m,  p95 145 m,  suurin 187 m (ompelun jälkeen)
 *
 * Yhden laitepikselin leveys on 111 320 m / tiheys, joten 190 metrin
 * ero täyttää pikselin vasta tiheydellä 586 px/aste. Kolmesataa on
 * siitä puolet: siinä ero on noin puoli pikseliä, eli juuri se raja,
 * jossa kaksi viivaa alkaa erottua toisistaan. Sitä karkeammassa
 * näkymässä naulaus ei paranna kuvaa mutta maksaa (ks. hinta alla) —
 * ja portti 30 teetti sitä koko ajan.
 *
 * HINTA: naulaus on mitattuna 29…83 ms koko Ranskan rannikolle tason
 * mukaan. Tiheydellä 300 kerroksella on tarkka taso muistissa, mutta
 * vain näkyvä alue — ja vaimennus (NAULAUKSEN_VAIMENNUS_MS) pitää
 * huolen siitä, ettei naulausta rakenneta joka kehyksellä.
 */
export const NAULAUKSEN_TIHEYS_RAJA = 300;
/** Naulausta ei rakenneta useammin kuin tämän välein (ms). */
export const NAULAUKSEN_VAIMENNUS_MS = 400;

/** Karkea asteetäisyys (pituusaste kutistuu leveyspiirillä). */
function asteEtaisyys(a, b) {
  let dLon = a[0] - b[0];
  if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
  const kerroin = Math.max(0.05, Math.cos((a[1] + b[1]) / 2 * Math.PI / 180));
  const x = dLon * kerroin;
  const y = a[1] - b[1];
  return Math.sqrt(x * x + y * y);
}

/** Solun x-avain kierrettynä: 179,99° ja -179,99° osuvat naapureiksi. */
function solunX(lon, ruutu) {
  const jako = Math.round(360 / ruutu);
  const gx = Math.round(lon / ruutu);
  return ((gx % jako) + jako) % jako;
}

/**
 * Rannikon kärjet hilaan: avain on solu, arvo pisteet [lon, lat].
 * Puhdas funktio (tests/maakorostus.test.mjs).
 */
export function rannikkoHakemisto(viivat, ruutu = NAULAUKSEN_RUUTU_ASTETTA) {
  const hila = new Map();
  for (const viiva of viivat ?? []) {
    for (const p of viiva ?? []) {
      if (!Array.isArray(p) || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;
      const avain = `${solunX(p[0], ruutu)}|${Math.round(p[1] / ruutu)}`;
      const lista = hila.get(avain);
      if (lista) lista.push(p); else hila.set(avain, [p]);
    }
  }
  return hila;
}

/** Onko piste rannikkohilan mukaan rannalla? Puhdas funktio. */
export function rannallaHilassa(piste, hila, {
  ruutu = NAULAUKSEN_RUUTU_ASTETTA, toleranssi = NAULAUKSEN_TOLERANSSI_ASTETTA,
} = {}) {
  if (!hila?.size || !Array.isArray(piste)) return false;
  const [lon, lat] = piste;
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return false;
  const jako = Math.round(360 / ruutu);
  const gx = solunX(lon, ruutu);
  const gy = Math.round(lat / ruutu);
  const raja = toleranssi * toleranssi;
  // Pituusasteen kutistuma leveyspiirillä: napojen lähellä aste on lyhyt.
  const kerroin = Math.max(0.05, Math.cos(lat * Math.PI / 180));
  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dy = -1; dy <= 1; dy += 1) {
      for (const q of hila.get(`${((gx + dx) % jako + jako) % jako}|${gy + dy}`) ?? []) {
        let dLon = lon - q[0];
        if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
        const x = dLon * kerroin;
        const y = lat - q[1];
        if (x * x + y * y <= raja) return true;
      }
    }
  }
  return false;
}

/**
 * Korostuksen janat naulattuna: sisämaan osuudet admin_0:sta ja rannikon
 * osuudet rannikkoaineistosta. Palauttaa viivat (polyviivoja) sekä
 * mittarit. Puhdas funktio (tests/maakorostus.test.mjs).
 *
 * @param {Array} renkaat korostuksen renkaat [[lon, lat], …]
 * @param {Array} rannikot rannikkoviivat samassa muodossa
 */
/*
 * JANAHAKEMISTO JA ETÄISYYS JANAAN (omistajan havainto v1982, 20.9.2026:
 * *"rajoissa kahdenlaista viivaa"*). Rannikon jana luettiin maan omaksi
 * vain, jos sen päät olivat kehän KÄRKIEN tuntumassa (0,015°) tai
 * silloitettavissa kahden tuntumakärjen väliin SAMASSA rannikkoviivassa.
 * Kehän kärjet ovat harvassa (harvennus 0,006° jättää suoraan rantaan
 * kilometrien välit) ja rannikkoviivat katkeavat solun reunaan, joten
 * osa rannasta jäi kehästä pois — MITATTU Gironden lähizoomilla
 * (2000 px, tiheys 699 px/aste): rannikon janoista 109, kehässä 71.
 * Siellä paksu kehä puuttui ja ohut rantaviiva kulki yksin sen
 * rinnalla. Nyt tuntuma mitataan kehän JANOIHIN: rannan kärki on maan
 * rantaa, jos se on toleranssin päässä lähimmästä kehän janasta —
 * sama korjaus kuin Opus 1:n mittausvirheessä (kärki vs jana).
 */
export const NAULAUKSEN_JANATOLERANSSI_ASTETTA = 0.02;

/** Janahakemisto: solun avain → janat [[a, b], …], jana lisätään joka soluun jonka laatikko peittää. */
export function janahakemisto(viivat, ruutu = NAULAUKSEN_RUUTU_ASTETTA) {
  const hila = new Map();
  const jako = Math.round(360 / ruutu);
  for (const viiva of viivat ?? []) {
    for (let k = 1; k < (viiva?.length ?? 0); k += 1) {
      const a = viiva[k - 1]; const b = viiva[k];
      if (!Array.isArray(a) || !Array.isArray(b)) continue;
      let dLon = b[0] - a[0];
      if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
      if (Math.abs(dLon) > 5 || Math.abs(b[1] - a[1]) > 5) continue; // saumajana tai roska
      const gx0 = Math.round(Math.min(a[0], a[0] + dLon) / ruutu); const gx1 = Math.round(Math.max(a[0], a[0] + dLon) / ruutu);
      const gy0 = Math.round(Math.min(a[1], b[1]) / ruutu); const gy1 = Math.round(Math.max(a[1], b[1]) / ruutu);
      for (let gx = gx0; gx <= gx1; gx += 1) {
        for (let gy = gy0; gy <= gy1; gy += 1) {
          const avain = `${((gx % jako) + jako) % jako}|${gy}`;
          const lista = hila.get(avain);
          if (lista) lista.push([a, b]); else hila.set(avain, [[a, b]]);
        }
      }
    }
  }
  return hila;
}

/** Onko piste toleranssin päässä jostakin hakemiston janasta (leveyspiirin kutistuma huomioiden)? */
export function lahellaJanaa(piste, hila, {
  ruutu = NAULAUKSEN_RUUTU_ASTETTA, toleranssi = NAULAUKSEN_JANATOLERANSSI_ASTETTA,
} = {}) {
  if (!hila?.size || !Array.isArray(piste)) return false;
  const [lon, lat] = piste;
  const jako = Math.round(360 / ruutu);
  const gx = solunX(lon, ruutu);
  const gy = Math.round(lat / ruutu);
  const kerroin = Math.max(0.05, Math.cos(lat * Math.PI / 180));
  const raja = toleranssi * toleranssi;
  const dx = (x, y) => { let d = x - y; if (d > 180) d -= 360; else if (d < -180) d += 360; return d * kerroin; };
  for (let ix = -1; ix <= 1; ix += 1) {
    for (let iy = -1; iy <= 1; iy += 1) {
      for (const [a, b] of hila.get(`${((gx + ix) % jako + jako) % jako}|${gy + iy}`) ?? []) {
        const ax = dx(a[0], lon); const ay = a[1] - lat;
        const bx = dx(b[0], lon); const by = b[1] - lat;
        const vx = bx - ax; const vy = by - ay;
        const l2 = vx * vx + vy * vy;
        let s = l2 > 0 ? -(ax * vx + ay * vy) / l2 : 0;
        s = Math.max(0, Math.min(1, s));
        const px = ax + s * vx; const py = ay + s * vy;
        if (px * px + py * py <= raja) return true;
      }
    }
  }
  return false;
}

export function naulaaKorostus(renkaat, rannikot, asetukset = {}) {
  const viivat = Array.isArray(renkaat) ? renkaat : [];
  const hila = rannikkoHakemisto(rannikot, asetukset.ruutu);
  if (!hila.size) {
    return { viivat, pudotettuja: 0, rannikkojanoja: 0, sisamaajanoja: null };
  }
  const ulos = [];
  let pudotettuja = 0;
  let sisamaajanoja = 0;
  for (const viiva of viivat) {
    if (!Array.isArray(viiva) || viiva.length < 2) continue;
    let pala = [];
    let edellinenRannalla = rannallaHilassa(viiva[0], hila, asetukset);
    for (let k = 1; k < viiva.length; k += 1) {
      const rannalla = rannallaHilassa(viiva[k], hila, asetukset);
      if (edellinenRannalla && rannalla) {
        // Rannikko piirtää tämän: myös suiston sulkeva jänne (päät rannalla).
        pudotettuja += 1;
        if (pala.length >= 2) ulos.push(pala);
        pala = [];
      } else {
        if (!pala.length) pala.push(viiva[k - 1]);
        pala.push(viiva[k]);
        sisamaajanoja += 1;
      }
      edellinenRannalla = rannalla;
    }
    if (pala.length >= 2) ulos.push(pala);
  }
  // Maan oma rannikko korostuksen väreillä: janat, joiden molemmat päät
  // ovat korostuskehän tuntumassa (eli tämän maan rantaa).
  const keha = rannikkoHakemisto(viivat, asetukset.ruutu);
  const kehanJanat = janahakemisto(viivat, asetukset.ruutu);
  const janaAsetukset = { ruutu: asetukset.ruutu, toleranssi: asetukset.janatoleranssi };
  const aukonRaja = asetukset.aukonRaja ?? NAULAUKSEN_AUKON_RAJA_ASTETTA;
  const mutkanRaja = asetukset.mutkanRaja ?? NAULAUKSEN_MUTKAN_RAJA_ASTETTA;
  let rannikkojanoja = 0;
  for (const viiva of rannikot ?? []) {
    if (!Array.isArray(viiva) || viiva.length < 2) continue;
    // Tuntuma kärkeen TAI janaan (ks. JANAHAKEMISTO JA ETÄISYYS JANAAN).
    const lahella = viiva.map((p) => rannallaHilassa(p, keha, asetukset) || lahellaJanaa(p, kehanJanat, janaAsetukset));
    // Kumulatiivinen polku ja lähimmät tuntumakärjet kumpaankin suuntaan,
    // jotta mutkan silloitus on vakioaikainen jokaiselle janalle.
    const matka = [0];
    const edel = [lahella[0] ? 0 : -1];
    for (let k = 1; k < viiva.length; k += 1) {
      matka.push(matka[k - 1] + asteEtaisyys(viiva[k - 1], viiva[k]));
      edel.push(lahella[k] ? k : edel[k - 1]);
    }
    const seur = new Array(viiva.length).fill(-1);
    for (let k = viiva.length - 1; k >= 0; k -= 1) {
      seur[k] = lahella[k] ? k : (k + 1 < viiva.length ? seur[k + 1] : -1);
    }
    let pala = [];
    for (let k = 1; k < viiva.length; k += 1) {
      let omaa = lahella[k - 1] && lahella[k];
      if (!omaa) {
        const a = edel[k - 1];
        const b = seur[k];
        omaa = a >= 0 && b >= 0
          && asteEtaisyys(viiva[a], viiva[b]) <= aukonRaja
          && (matka[b] - matka[a]) <= mutkanRaja;
      }
      if (omaa) {
        if (!pala.length) pala.push(viiva[k - 1]);
        pala.push(viiva[k]);
        rannikkojanoja += 1;
      } else if (pala.length >= 2) { ulos.push(pala); pala = []; } else pala = [];
    }
    if (pala.length >= 2) ulos.push(pala);
  }
  return { viivat: ulos, pudotettuja, rannikkojanoja, sisamaajanoja };
}

/*
 * ═══════════════════════════════════════════════════════════════════
 * PITKÄ JANA PAINUU PINNAN ALLE — JAETAAN PALOIKSI (mitattu 20.9.2026)
 * ═══════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN VIKA (Raamattu, Gironde 20.9.2026): Ranskan pelikartalla
 * *"paksu tumma kehä seuraa suistoa ja toinen viiva kulkee suorana"*.
 * Kaappauksissa (docs/raportit/kaappaukset/omistaja-20260920/gironde-*)
 * Médocin Atlantin ranta Pointe de Gravesta Arcachoniin on ILMAN
 * korostusta ja ilman rantaviivaa — näkyvissä on vain laatan meren
 * täytön pehmeä reuna, ja se on se "toinen viiva".
 *
 * MITATTU JUURISYY (Chromium, Marseille-tallenne, kamera 45,45 N
 * −0,95 E korkeus 0,055): korostus SISÄLTÄÄ Médocin rannan — sekä
 * korostuksessa että rannikkosolussa on sama jana −1,199 E 45,121 N →
 * −1,260 E 44,627 N, 0,50 astetta eli 55 km yhtenä suorana (ne_10m:n
 * Côte d'Argent on oikeasti suora, ja 0,006 asteen harvennus jättää
 * siihen vain päät). Jänteen keskikohdalla ruudulla 0 tummaa pikseliä
 * 24 × 24:stä; kun korostuksen depthTest kytkettiin pois, samassa
 * kohdassa 206. Lyhyet janat (0,16–0,21 astetta) piirtyivät molemmilla
 * asetuksilla.
 *
 * SYY ON GEOMETRIAA: LineSegments2 piirtää janan SUORANA 3D-avaruudessa,
 * ja pallon pinnan kahden pisteen välinen jänne painuu pinnan alle
 * keskeltä R · (1 − cos(θ/2)) — 0,5 asteella 9,5 · 10⁻⁶ · R, kun taas
 * 0,2 asteella 1,5 · 10⁻⁶ · R. Laattakerros on itsekin pinnan jänteitä
 * (silmät 0,02–0,25 astetta), ja syvyyssiirto (−12 vs. laattojen −8)
 * kattaa vain lyhyiden janojen painuman. Pitkä jänne jää laatan alle
 * ja syvyystesti leikkaa sen keskeltä pois — se ei ole aineiston,
 * naulauksen eikä harvennuksen vika, vaan piirron.
 *
 * KORJAUS: jokainen jana, joka on pidempi kuin VEKTORIT_JANAN_ENIMMAIS-
 * PITUUS_AST, jaetaan tasavälein paloiksi, joiden päät ovat pinnalla.
 * 0,1 asteen palan painuma on 3,8 · 10⁻⁷ · R — neljäsosa siitä, mikä
 * mitattiin piirtyväksi (0,2 astetta). Palat lisätään VAIN pitkiin
 * janoihin; rosoinen ranta ja raja ovat lähes aina lyhyempiä, joten
 * janamäärä ei muutu niillä lainkaan. Sama kaava koskee korostusta ja
 * soluja, koska tämä on niiden ainoa yhteinen pisteiden latoja.
 *
 * MIKSI EI NOSTOA PINNASTA: VEKTORIT_KORKEUS 0 on mitattu valinta
 * (parallaksi 2–4 laitepikseliä, ks. yllä) — palat pitävät viivan
 * pinnalla ilman nostoa.
 */
/** Vektorijanan enimmäispituus asteina pallon pinnalla; pidemmät jaetaan. */
export const VEKTORIT_JANAN_ENIMMAISPITUUS_AST = 0.1;

/** Moneenko palaan jana a→b jaetaan (vähintään yksi). */
function janaPaloiksi(a, b, enimmaispituus) {
  if (!(enimmaispituus > 0)) return 1;
  return Math.max(1, Math.ceil(asteEtaisyys(a, b) / enimmaispituus));
}

export function vektorijanat(viivat, sade, enimmaispituus = VEKTORIT_JANAN_ENIMMAISPITUUS_AST) {
  let janoja = 0;
  for (const v of viivat ?? []) {
    for (let k = 1; k < v.length; k += 1) janoja += janaPaloiksi(v[k - 1], v[k], enimmaispituus);
  }
  const paikat = new Float32Array(janoja * 6);
  let i = 0;
  for (const v of viivat ?? []) {
    if (v.length < 2) continue;
    let p = pallonPiste(v[0][1], v[0][0], sade);
    for (let k = 1; k < v.length; k += 1) {
      const paloja = janaPaloiksi(v[k - 1], v[k], enimmaispituus);
      // Sauman yli kulkeva jana: pituusaste kasvaa lyhyempää tietä.
      let dLon = v[k][0] - v[k - 1][0];
      if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
      const dLat = v[k][1] - v[k - 1][1];
      for (let j = 1; j <= paloja; j += 1) {
        const q = j === paloja
          ? pallonPiste(v[k][1], v[k][0], sade)
          : pallonPiste(v[k - 1][1] + dLat * (j / paloja), v[k - 1][0] + dLon * (j / paloja), sade);
        paikat[i] = p.x; paikat[i + 1] = p.y; paikat[i + 2] = p.z;
        paikat[i + 3] = q.x; paikat[i + 4] = q.y; paikat[i + 5] = q.z;
        i += 6;
        p = q;
      }
    }
  }
  return { paikat, janoja };
}

/**
 * Line2-luokat elävästä pallosta. Globe.gl 2.46 rakentaa jokaisen
 * pathsData-viivan Line2:na, joten yksi olio scenessä antaa koko
 * konstruktoriketjun — uutta kirjastoa ei ladata eikä vendor-vientiä
 * tarvita. Palauttaa null, kunnes olio on scenessä.
 *
 * Vienti: myös Ihmisen matkan vanat (js/aikajana-vanat.js) piirtää fat
 * lineä samalla temppulla, eikä luokkien hakua kannata kirjoittaa
 * kahdesti.
 */
export function line2Luokat(pallo) {
  let olio = null;
  pallo.scene?.()?.traverse?.((o) => { if (!olio && o.type === 'Line2') olio = o; });
  if (!olio?.geometry || !olio.material?.resolution) return null;
  const Line2 = olio.constructor;
  const LineSegments2 = Object.getPrototypeOf(Line2.prototype).constructor;
  const LineGeometry = olio.geometry.constructor;
  const LineSegmentsGeometry = Object.getPrototypeOf(LineGeometry.prototype).constructor;
  const LineMaterial = olio.material.constructor;
  const Vector2 = olio.material.resolution.constructor;
  return { Line2, LineSegments2, LineGeometry, LineSegmentsGeometry, LineMaterial, Vector2 };
}

/**
 * Vektorikerros yhdelle pallolle. Kytkentä tehdään pallolaudassa
 * (js/pallolauta/lauta.js, erä V2); valikkopallo ei saa kerrosta.
 *
 * @param {object} p.pallo   Globe.gl-instanssi (rakennaPallo)
 * @param {HTMLElement} p.kotelo pallon kotelo (ruudun mitat)
 * @param {object} p.ikkuna  window (testit antavat oman)
 * @param {object} p.reitit  js/pallolauta/reitit.js -kahva (aseta)
 * @returns {{ paivita: function, mittarit: function, pura: function, valmis: Promise }}
 */
export function luoPallovektorit({ pallo, kotelo, ikkuna = globalThis, reitit }) {
  const mittarit = {
    tila: 'kaynnistyy', syy: '', lod: null, tol: null, tarvePxAste: 0, soluja: 0, ladattu: 0,
    janoja: 0, tavua: 0, pyyntoja: 0, paivitaMs: 0, rakennusMs: 0, linewidthCss: 0,
    pikselisuhde: 0, alue: null,
    /** Viivan YDIN css-pikseleinä (linewidthCss on ydin + pehmennysvyöt). */
    leveysCss: 0,
    /** Reunan häivytys osuutena puolileveydestä (0 = kova reuna). */
    pehmennys: 0,
    /** Selaimen oman harvennuksen porras asteina (0 = täysi yksityiskohta). */
    harvennus: 0,
    /** Janoja näkyvää solua kohti — kaukaa vähemmän kuin läheltä. */
    janojaSolua: 0,
    /** Onko varjostimen pehmennyspaikka mennyt läpi. */
    pehmennysPaikka: false,
    /** Korostettu maa (ISO A3) tai null — pelaajan oma maa. */
    korostus: null,
    /** Korostuksen renkaat (maapolygonien rengasmäärä kohdemaalle). */
    korostusRenkaita: 0,
    /** Korostuksen janat (0 = maata ei ole aineistossa). */
    korostusJanoja: 0,
    korostusPudotettuja: 0,
    korostusRannikkojanoja: 0,
    /** Himmeän reittiverkon lauta-avain, janat ja näkyvyys. */
    verkko: null,
    verkkoJanoja: 0,
    verkkoNakyy: false,
  };
  const pyydetyt = new Set();
  /** id (`<laji>/l<k>/<solu>`) → { laji, k, avain, lupaus, viivat, olio, janoja, tavua, kaytto } */
  const solut = new Map();
  /*
   * PELAAJAN MAAN KOROSTUS on soluton laji: renkaat annetaan valmiina
   * asteina (js/maanaariviivat.js) eikä niitä haeta ämpäristä, koska
   * korostettavia maita on kerrallaan yksi ja aineisto on pelissä jo
   * (assets/data/maapolygonit.json). Olio on siksi yksi eikä ruudukko,
   * mutta kaikki muu on sama kuin soluilla: sama säde, sama
   * syvyyssiirto, sama selaimen harvennus ja sama häive — olio kelpaa
   * sellaisenaan `haivyta`-apurille (kentät `laji` ja `olio`).
   */
  const korostus = {
    laji: 'korostus', iso: null, renkaat: null, olio: null, janoja: 0, harvennus: -1,
    // Monestako rannikkoviivasta naulaus viimeksi tehtiin (ks. rakennaKorostus).
    rannikkoja: -1,
    /** Milloin naulaus viimeksi rakennettiin (vaimennus). */
    naulattuHetki: -Infinity,
  };
  /*
   * HIMMEÄ REITTIVERKKO on korostuksen tapaan soluton laji (ks.
   * HIMMEÄ REITTIVERKKO LIFTATESSA): viivat annetaan valmiina asteina
   * (js/pallolauta/reitit.js verkonViivat), olio rakennetaan kerran
   * laudan avaimella ja näkyvyys on pelkkä lippu.
   */
  /*
   * LÖYTÄMISEN SUMU (js/pallolauta/sumu.js, prototyyppi): käymättömien
   * maiden rajat vaaleammalla (rajamateriaalin peitto × kerroin) ja
   * käytyjen maiden renkaat normaalilla rajapeitolla omana
   * viivajoukkonaan (`kaydyt`, sama katkoviiva kuin rajoilla).
   */
  const kaydyt = {
    laji: 'kaydyt', avain: null, viivat: null, olio: null, janoja: 0, paalla: false,
  };
  const verkko = {
    laji: 'verkko', avain: null, viivat: null, olio: null, janoja: 0, nakyy: false,
  };
  /*
   * HISTORIALLISET RAJAT (Isoisän linssi): soluton laji, ks. vakioiden
   * selostus (VEKTORIT_HISTORIA_LEVEYS_CSS). `oliot` luokittain 1 ja 2.
   */
  const historia = {
    laji: 'historia', avain: null, viivat: null, oliot: [], janoja: 0, paalla: false,
  };
  /** Sumun kerroin nykyrajojen peittoon (asetaSumu); historia nollaa peiton. */
  let sumunKerroin = 1;
  /** Häiveen ajaksi kloonatut materiaalit (ruutumitat päivitetään näihinkin). */
  const kloonit = new Set();
  let luettelo = null;
  let luokat = null;
  let kolmi = null;
  let materiaalit = null;
  let purettu = false;
  let nakyvat = new Set();
  let kello = 0;
  /*
   * Viimeisimmät kehysmitat piirtokoukusta (js/pallo.js
   * kytkePallonKehys): kamera, pov, ruudun koko ja pikselisuhde SAMASTA
   * kehyksestä kuin laattakerroksella. Null ennen ensimmäistä piirtoa ja
   * yksikkötesteissä — silloin luetaan kuten ennen.
   */
  let kehysmitat = null;
  let kehyspurku = () => {};
  let viimeAjo = -Infinity;
  let viimeTunnus = '';

  const renderer = pallo.renderer?.();
  const nyt = () => ikkuna.performance?.now?.() ?? Date.now();
  const odota = (ms) => new Promise((ok) => { ikkuna.setTimeout(ok, ms); });
  const reduced = () => Boolean(ikkuna.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  const sade = () => pallo.getGlobeRadius() * (1 + VEKTORIT_KORKEUS);
  const pikselisuhde = () => kehysmitat?.suhde
    ?? renderer?.getPixelRatio?.() ?? (ikkuna.devicePixelRatio || 1);
  /** Ruudun koko: piirretty koko kehyskoukusta, kotelo varana. */
  const ruutu = () => ({
    W: kehysmitat?.W || kotelo.clientWidth,
    H: kehysmitat?.H || kotelo.clientHeight,
  });
  /*
   * Ruudun tiheys (laitepikseliä astetta kohti) viime päivityksestä:
   * viivan leveys ja selaimen oma harvennus liukuvat sen mukana.
   * Nolla ennen ensimmäistä mittausta = ohuin pää.
   */
  let tiheys = 0;
  /** Selaimen oman harvennuksen porras asteina (0 = täysi yksityiskohta). */
  let harvennus = 0;
  /** Meniko varjostimen pehmennyspaikka läpi (pehmennaLineMaterial). */
  let pehmennysPaikka = false;
  /** Viivan YDIN css-pikseleinä (ilman pehmennysvyötä). */
  const ydinLeveys = (laji) => viivanLeveysCss(
    tiheys, VEKTORIT_LEVEYDET[laji] ?? VEKTORIT_LEVEYS_CSS,
  );
  /** Pehmennysvyö css-pikseleinä kummallakin reunalla. */
  const pehmennysCss = () => (pehmennysPaikka ? VEKTORIT_PEHMENNYS_LAITEPX / pikselisuhde() : 0);
  /**
   * Nelikulmion leveys css-pikseleinä = ydin + kaksi pehmennysvyötä
   * (varjostin häivyttää vyön nollaan, joten NÄKYVÄ leveys on ydin).
   */
  const cssLeveys = (laji) => ydinLeveys(laji) + 2 * pehmennysCss();
  /** Häivytysvyön osuus puolileveydestä varjostimelle. */
  const pehmennysOsuus = (laji) => {
    const leveys = cssLeveys(laji);
    return leveys > 0 ? Math.min(0.95, (2 * pehmennysCss()) / leveys) : 0;
  };

  const luovuta = (syy) => { mittarit.syy = syy; mittarit.tila = 'ei'; return false; };

  /* ---------------- käynnistys ------------------------------------- */

  const valmis = (async () => {
    if (!reitit?.aseta) return luovuta('reittikerrosta ei annettu');
    // Luettelo revalidoidaan kuten laatat.json (no-cache): polku on
    // versioitu, mutta luettelo voi vaihtua saman version alla.
    const luetteloLupaus = ikkuna.fetch(`${PALLOVEKTORIT_JUURI}luettelo.json`, { cache: 'no-cache' })
      .then((v) => (v?.ok ? v.json() : null))
      .catch(() => null);
    mittarit.pyyntoja += 1;
    pyydetyt.add(`${PALLOVEKTORIT_JUURI}luettelo.json`);
    /*
     * NOLLAMITTAINEN POLKU luokkien lukemiseksi: läpinäkyvä kahden
     * saman pisteen viiva reittikerroksen omana osana, joka poistetaan
     * heti kun kirjasto on rakentanut siitä Line2:n. Osarekisteri
     * (reitit.aseta) takaa, ettei tämä pyyhi pelin reittejä.
     */
    reitit.aseta('vektorit', [{
      avain: 'vektorit-luokat', pisteet: [[0, 0], [0, 0]], paksuus: 1, vari: 'rgba(0,0,0,0)',
    }]);
    for (let i = 0; i < 100 && !purettu; i += 1) {
      luokat = luokat ?? line2Luokat(pallo);
      kolmi = kolmi ?? kolmiulotteinen(pallo);
      if (luokat && kolmi?.juuri) break;
      await odota(50); // eslint-disable-line no-await-in-loop
    }
    reitit.aseta('vektorit', []);
    if (purettu) return false;
    // Ilman luokkia kerros jää pois — pallo toimii täsmälleen kuten ennen.
    if (!luokat) return luovuta('Line2-luokkia ei saatu');
    if (!kolmi?.juuri) return luovuta('pallon ryhmää ei saatu');
    luettelo = await luetteloLupaus;
    if (purettu) return false;
    if (!luettelo?.lodit?.length || !luettelo.lajit) return luovuta('vektoriluetteloa ei saatu');
    materiaalit = teeMateriaalit();
    // Maa on voitu pyytää jo ennen kuin luokat olivat valmiina.
    if (korostus.renkaat) rakennaKorostus(true);
    // Sama himmeälle verkolle: lauta on voinut antaa viivansa jo.
    if (verkko.viivat) rakennaVerkko();
    if (kaydyt.viivat) rakennaKaydyt();
    if (historia.viivat) rakennaHistoria();
    paivitaRajapeitto();
    /*
     * PÄIVITYS PIIRTOKOUKUSSA, EI TAPAHTUMASSA (vika v1649). Ennen tätä
     * kerros heräsi ohjainten `change`-tapahtumasta — eli pointermoven
     * sisältä — ja luki ruudun koon kotelon CSS-laatikosta 60 ms:n
     * ajastimella. Laattakerros luki omansa updatePovista. Kaksi eri
     * lähdettä ja kaksi eri hetkeä tarkoittavat raahauksen aikana kahta
     * eri näkyvää aluetta. Nyt molemmat saavat saman olion samasta
     * kehyksestä (js/pallo.js kytkePallonKehys); jarru ja kaikki V3:n
     * vakiot ovat ennallaan.
     */
    kehyspurku = kytkePallonKehys(pallo, kotelo, kehyksessa, ikkuna);
    mittarit.tila = 'nakyy';
    await paivita();
    return true;
  })().catch((syy) => luovuta(String(syy?.message ?? syy)));

  /**
   * Kolme materiaalia, ei enempää: rantaviiva, rajat ja pelaajan maan
   * korostus. Leveys on ruutupikseleitä varjostimessa (worldUnits
   * false), ei syvyyskirjoitusta, syvyystesti pallon pintaa vasten ja
   * polygonOffset laattojen edelle (ks. tiedoston alun mittaukset).
   *
   * Korostus on samaa mustetta täytenä ja YHTENÄISENÄ viivana
   * (ks. RAJA_MUSTE): se on sama kerros, sama sävy ja samat säännöt
   * kuin muillakin vektoreilla, vain oma leveys ja peitto.
   */
  function teeMateriaalit() {
    const yhteiset = {
      worldUnits: false,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      polygonOffset: true,
      polygonOffsetFactor: 0,
      polygonOffsetUnits: VEKTORIT_SYVYYSSIIRTO,
    };
    const ranta = new luokat.LineMaterial({
      ...yhteiset, color: RANTA_MUSTE, opacity: RANTA_PEITTO,
    });
    const raja = new luokat.LineMaterial({
      // Sama sävy paletista kuin kehällä (ks. rajanMuste): rajan väri
      // on yksi, ero on peitossa, leveydessä ja pistekuviossa.
      ...yhteiset, color: rajanMuste(), opacity: RAJA_PEITTO, dashed: true,
    });
    [raja.dashSize, raja.gapSize] = RAJA_KATKO_YKS;
    raja.dashScale = 1;
    const korostusMateriaali = new luokat.LineMaterial({
      // Sävy paletista (ks. rajanMuste): sama lähde kuin tasokartan
      // kehällä JA kuin tavallisella rajalla, eikä toista heksalukua.
      ...yhteiset, color: rajanMuste(), opacity: KOROSTUS_PEITTO,
    });
    // Himmeä reittiverkko: sama muste, oma peitto, yhtenäinen viiva.
    const verkkoMateriaali = new luokat.LineMaterial({
      ...yhteiset, color: rajanMuste(), opacity: VERKKO_PEITTO,
    });
    /*
     * PEHMEÄ REUNA, EI PÄÄTYPYÖRYLÖITÄ (omistaja 7.9.2026). Paikka
     * tehdään ENNEN ensimmäistä käännöstä ja ennen leveyden asetusta:
     * jos varjostin ei ole odotetun näköinen, pehmennysvyö jää nollaan
     * ja viiva on entisellään.
     */
    pehmennysPaikka = pehmennaLineMaterial(ranta) && pehmennaLineMaterial(raja)
      && pehmennaLineMaterial(korostusMateriaali, { paatypyorylat: true })
      && pehmennaLineMaterial(verkkoMateriaali);
    mittarit.pehmennysPaikka = pehmennysPaikka;
    ranta.linewidth = cssLeveys('rannikko');
    raja.linewidth = cssLeveys('rajat');
    korostusMateriaali.linewidth = cssLeveys('korostus');
    verkkoMateriaali.linewidth = cssLeveys('verkko');
    // Käytyjen maiden rajat (löytämisen sumu): sama katkoviiva kuin rajoilla.
    const kaydytMateriaali = new luokat.LineMaterial({
      ...yhteiset, color: rajanMuste(), opacity: RAJA_PEITTO, dashed: true,
    });
    [kaydytMateriaali.dashSize, kaydytMateriaali.gapSize] = RAJA_KATKO_YKS;
    kaydytMateriaali.dashScale = 1;
    pehmennaLineMaterial(kaydytMateriaali);
    kaydytMateriaali.linewidth = cssLeveys('rajat');
    // Historialliset rajat (Isoisän linssi): yhtenäinen valtionraja ja
    // katkoviivainen vasalliraja, oma tummempi muste.
    const historiaMateriaali = new luokat.LineMaterial({
      ...yhteiset, color: HISTORIA_MUSTE, opacity: HISTORIA_PEITTO,
    });
    pehmennaLineMaterial(historiaMateriaali, { paatypyorylat: true });
    historiaMateriaali.linewidth = cssLeveys('historia');
    const historia2Materiaali = new luokat.LineMaterial({
      ...yhteiset, color: HISTORIA_MUSTE, opacity: HISTORIA2_PEITTO, dashed: true,
    });
    [historia2Materiaali.dashSize, historia2Materiaali.gapSize] = RAJA_KATKO_YKS;
    historia2Materiaali.dashScale = 1;
    pehmennaLineMaterial(historia2Materiaali);
    historia2Materiaali.linewidth = cssLeveys('historia2');
    return {
      rannikko: ranta, rajat: raja, korostus: korostusMateriaali, verkko: verkkoMateriaali,
      kaydyt: kaydytMateriaali, historia: historiaMateriaali, historia2: historia2Materiaali,
    };
  }

  /**
   * Nykyrajojen peitto yhdestä paikasta: sumu himmentää (kerroin),
   * historialliset rajat sammuttavat (0). Sama sääntö käytyjen maiden
   * rajoille, jotka ovat samaa nykyistä rajaviivastoa.
   */
  function paivitaRajapeitto() {
    if (!materiaalit) return;
    const nyk = historia.paalla ? 0 : RAJA_PEITTO * (kaydyt.paalla ? sumunKerroin : 1);
    materiaalit.rajat.opacity = nyk;
    materiaalit.rajat.needsUpdate = true;
    materiaalit.kaydyt.opacity = historia.paalla ? 0 : RAJA_PEITTO;
    materiaalit.kaydyt.needsUpdate = true;
    for (const m of kloonit) {
      const laji = m.userData?.pallovektoritLaji;
      if (laji === 'rajat' && historia.paalla) m.opacity = 0;
    }
  }

  /** Ruutumitat materiaaleihin: leveys laitepikseleinä, resoluutio css-pikseleinä. */
  function tahdista() {
    if (!materiaalit) return;
    const { W, H } = ruutu();
    mittarit.linewidthCss = +cssLeveys('rannikko').toFixed(3);
    mittarit.leveysCss = +ydinLeveys('rannikko').toFixed(3);
    mittarit.pehmennys = +pehmennysOsuus('rannikko').toFixed(3);
    mittarit.pikselisuhde = pikselisuhde();
    for (const [laji, m] of Object.entries(materiaalit)) {
      m.linewidth = cssLeveys(laji);
      m.resolution.set(W, H);
      if (m.uniforms?.pehmennys) m.uniforms.pehmennys.value = pehmennysOsuus(laji);
    }
    for (const m of kloonit) {
      m.resolution.set(W, H);
      m.linewidth = cssLeveys(m.userData?.pallovektoritLaji ?? 'rannikko');
      if (m.uniforms?.pehmennys) {
        m.uniforms.pehmennys.value = pehmennysOsuus(m.userData?.pallovektoritLaji ?? 'rannikko');
      }
    }
  }

  /* ---------------- solut ------------------------------------------ */

  /**
   * Solun rakennus: viivat janoiksi, janat instanssoiduksi
   * LineSegments2:ksi pallon ryhmään (piilossa, kunnes se on näkyvien
   * joukossa). Olio ei ota kosketusta vastaan — pelin merkit ja
   * onGlobeClick toimivat kuten ennen.
   */
  function rakenna(s, nakyva = false) {
    /*
     * SELAIMEN OMA HARVENNUS ennen janoiksi purkua: ämpärin tasoportaat
     * ovat karkeat, joten yleiskuvassa lataamme aineistoa, jonka
     * kärkiväli on murto-osa pikselistä. Porras on 0 lähikuvassa =
     * täysi yksityiskohta. Aineiston oma toleranssi (luettelo.lodit[k])
     * kertoo, milloin harvennus ei enää muuttaisi mitään.
     */
    const porras = harvennus > (luettelo?.lodit?.[s.k] ?? 0) ? harvennus : 0;
    s.harvennus = harvennus;
    const viivat = harvennaViivat(s.viivat, porras);
    const { paikat, janoja } = vektorijanat(viivat, sade());
    s.janoja = janoja;
    if (!janoja) return;
    const geometria = new luokat.LineSegmentsGeometry();
    geometria.setPositions(paikat);
    const olio = new luokat.LineSegments2(geometria, materiaalit[s.laji]);
    if (s.laji === 'rajat') olio.computeLineDistances?.();
    olio.renderOrder = VEKTORIT_RENDER_ORDER;
    olio.raycast = () => {};
    olio.visible = nakyva;
    olio.userData.pallovektorit = { laji: s.laji, k: s.k, avain: s.avain };
    kolmi.juuri.add(olio);
    s.olio = olio;
  }

  /**
   * Solun oliot pois, viivat muistiin: harvennusportaan vaihtuessa
   * geometria rakennetaan uudelleen samasta aineistosta (vapauta()
   * heittäisi viivatkin pois ja pakottaisi uuden latauksen).
   */
  function vapautaOlio(s) {
    if (!s.olio) return;
    s.olio.parent?.remove(s.olio);
    s.olio.geometry?.dispose?.();
    const m = s.olio.material;
    if (m && !Object.values(materiaalit ?? {}).includes(m)) { kloonit.delete(m); m.dispose?.(); }
    s.olio = null;
  }

  /**
   * Häive päälle kloonatulla materiaalilla (KAIKKI LIIKE ANIMOIDAAN
   * PEHMEASTI): jaettua materiaalia ei voi häivyttää, koska se on
   * kaikkien saman lajin solujen yhteinen. Häiveen päätteeksi olio
   * palaa jaettuun materiaaliin ja klooni vapautetaan, joten levossa
   * materiaaleja on tasan kaksi.
   */
  function haivyta(s) {
    const jaettu = materiaalit[s.laji];
    const kesto = reduced() ? 0 : VEKTORIT_HAIVE_MS;
    if (!(kesto > 0) || !s.olio) { if (s.olio) s.olio.material = jaettu; return; }
    const oma = jaettu.clone();
    oma.userData.pallovektoritLaji = s.laji;
    oma.linewidth = cssLeveys(s.laji);
    if (oma.uniforms?.pehmennys) oma.uniforms.pehmennys.value = pehmennysOsuus(s.laji);
    oma.resolution.copy?.(jaettu.resolution);
    oma.opacity = 0;
    kloonit.add(oma);
    s.olio.material = oma;
    const t0 = nyt();
    const paata = () => {
      kloonit.delete(oma);
      if (s.olio?.material === oma) s.olio.material = jaettu;
      oma.dispose?.();
    };
    const askel = () => {
      if (purettu || s.olio?.material !== oma) { paata(); return; }
      const t = Math.min(1, (nyt() - t0) / kesto);
      // Ease-out: sisääntulo pehmeällä jarrutuksella (Raamattu).
      oma.opacity = jaettu.opacity * (1 - (1 - t) ** 3);
      if (t < 1) { ikkuna.requestAnimationFrame(askel); return; }
      paata();
    };
    ikkuna.requestAnimationFrame(askel);
  }

  /* ---------------- pelaajan maan korostus -------------------------- */

  /**
   * Korostuksen oma olio pois (materiaali on jaettu, ei vapauteta).
   * Häiveen ajaksi kloonattu materiaali siivotaan samalla säännöllä
   * kuin soluilla.
   */
  function vapautaKorostus() {
    if (!korostus.olio) return;
    korostus.olio.parent?.remove(korostus.olio);
    korostus.olio.geometry?.dispose?.();
    const m = korostus.olio.material;
    if (m && !Object.values(materiaalit ?? {}).includes(m)) { kloonit.delete(m); m.dispose?.(); }
    korostus.olio = null;
    korostus.janoja = 0;
    korostus.harvennus = -1;
  }

  /** Käytyjen maiden rajaviivat pois. */
  function vapautaKaydyt() {
    if (!kaydyt.olio) return;
    kaydyt.olio.parent?.remove(kaydyt.olio);
    kaydyt.olio.geometry?.dispose?.();
    kaydyt.olio = null;
    kaydyt.janoja = 0;
  }

  /** Käytyjen maiden renkaat viivoiksi (löytämisen sumu). */
  function rakennaKaydyt() {
    if (purettu || !materiaalit || !luokat || !kolmi?.juuri) return;
    vapautaKaydyt();
    if (!kaydyt.paalla || !kaydyt.viivat?.length) return;
    const viivat = harvennaViivat(kaydyt.viivat, VERKON_HARVENNUS_AST);
    const { paikat, janoja } = vektorijanat(viivat, sade(), VERKON_JANAN_ENIMMAISPITUUS_AST);
    kaydyt.janoja = janoja;
    mittarit.kaydytJanoja = janoja;
    if (!janoja) return;
    const geometria = new luokat.LineSegmentsGeometry();
    geometria.setPositions(paikat);
    const olio = new luokat.LineSegments2(geometria, materiaalit.kaydyt);
    olio.computeLineDistances?.();
    olio.renderOrder = VEKTORIT_RENDER_ORDER;
    olio.raycast = () => {};
    olio.userData.pallovektorit = { laji: 'kaydyt', avain: kaydyt.avain };
    kolmi.juuri.add(olio);
    kaydyt.olio = olio;
  }

  /** Himmeän reittiverkon olio pois (lauta vaihtui tai purku). */
  function vapautaHistoria() {
    for (const olio of historia.oliot) {
      olio.parent?.remove(olio);
      olio.geometry?.dispose?.();
    }
    historia.oliot = [];
    historia.janoja = 0;
    mittarit.historiaJanoja = 0;
  }

  /**
   * Historialliset rajat: luokat 1 ja 2 omiksi olioikseen (eri
   * materiaali), pituudet katkoviivaa varten. Ei harvennusta zoomin
   * mukaan: aineisto on jo 0,006°:n harvennuksella ja ~10 k pistettä.
   */
  function rakennaHistoria() {
    if (purettu || !materiaalit || !luokat || !kolmi?.juuri) return;
    vapautaHistoria();
    if (!historia.paalla || !historia.viivat?.length) return;
    let janojaYht = 0;
    for (const lk of [1, 2]) {
      const viivat = historia.viivat.filter((v) => (v.l ?? 1) === lk).map((v) => v.p);
      if (!viivat.length) continue;
      const { paikat, janoja } = vektorijanat(viivat, sade());
      if (!janoja) continue;
      janojaYht += janoja;
      const geometria = new luokat.LineSegmentsGeometry();
      geometria.setPositions(paikat);
      const laji = lk === 2 ? 'historia2' : 'historia';
      const olio = new luokat.LineSegments2(geometria, materiaalit[laji]);
      if (lk === 2) olio.computeLineDistances?.();
      olio.renderOrder = VEKTORIT_RENDER_ORDER;
      olio.raycast = () => {};
      olio.userData.pallovektorit = { laji, avain: historia.avain };
      kolmi.juuri.add(olio);
      historia.oliot.push(olio);
    }
    historia.janoja = janojaYht;
    mittarit.historiaJanoja = janojaYht;
  }

  function vapautaVerkko() {
    if (!verkko.olio) return;
    verkko.olio.parent?.remove(verkko.olio);
    verkko.olio.geometry?.dispose?.();
    verkko.olio = null;
    verkko.janoja = 0;
    mittarit.verkkoJanoja = 0;
  }

  /**
   * Himmeä reittiverkko pallon pinnalle — KERRAN laudan avaimella, ilman
   * häivettä ja KIINTEÄLLÄ harvennuksella (VERKON_HARVENNUS_AST), ei
   * zoomin portaalla: verkko on staattinen kerros, jota ei rakenneta
   * uudestaan zoomin mukana. Palajako (vektorijanat) on sama kuin
   * muilla vektoreilla, jottei pitkä kaupunkiväli painu pinnan alle.
   * Näkyvyys tulee `verkko.nakyy`-lipusta (naytaVerkko).
   */
  function rakennaVerkko() {
    if (purettu || !materiaalit || !luokat || !kolmi?.juuri) return;
    vapautaVerkko();
    if (!verkko.viivat?.length) return;
    const viivat = harvennaViivat(verkko.viivat, VERKON_HARVENNUS_AST);
    const { paikat, janoja } = vektorijanat(viivat, sade(), VERKON_JANAN_ENIMMAISPITUUS_AST);
    verkko.janoja = janoja;
    mittarit.verkkoJanoja = janoja;
    if (!janoja) return;
    const geometria = new luokat.LineSegmentsGeometry();
    geometria.setPositions(paikat);
    const olio = new luokat.LineSegments2(geometria, materiaalit.verkko);
    olio.renderOrder = VEKTORIT_RENDER_ORDER;
    olio.raycast = () => {};
    olio.visible = verkko.nakyy;
    olio.userData.pallovektorit = { laji: 'verkko', avain: verkko.avain };
    kolmi.juuri.add(olio);
    verkko.olio = olio;
  }

  /**
   * Korostettu ääriviiva pallon pinnalle nykyisellä harvennusportaalla.
   * `haivella` on tosi vain maanvaihdossa: portaan vaihtuessa viiva on
   * jo ruudulla eikä sitä saa feidata uudelleen.
   *
   * Ilman renkaita (maata ei ole aineistossa, aineistoa ei saatu) tämä
   * ei tee mitään — peli näyttää täsmälleen samalta kuin ennen.
   */
  /**
   * Ladattujen rannikkosolujen viivat yhtenä listana (naulaus, ks.
   * RANNIKON NAULAUS). Vain ne solut, joiden aineisto on jo muistissa —
   * naulaus tarkentuu sitä mukaa kuin soluja saapuu, ja korostus
   * rakennetaan uudelleen, kun rannikkoaineiston määrä muuttuu.
   */
  /*
   * VAIN NÄKYVÄT SOLUT (omistajan havainto v1982, 20.9.2026: *"rajoissa
   * kahdenlaista viivaa"* — Gironden ja Arcachonin lähizoomilla paksu
   * kehä oli kulmikas monikulmio ja sen rinnalla kulki ohuempi, sileä
   * rantaviiva). MITATTU (Chromium 2000 px, korkeus 0,03, tiheys 699
   * px/aste, solutaso l4 = harventamaton ne_10m): alueella rannikon
   * janoja 102, korostuksen 62, korostuksen janan mediaani 4,5 km —
   * kehä oli koottu KARKEAMMAN tason (l2–l3) solujen rannasta, jotka
   * olivat yhä muistissa piilotettuina (LRU) ja joita tämä keräsi
   * `solut`-taulusta tasosta välittämättä. Naulaus valitsi niistä
   * harvemman kopion, ja piirretty rantaviiva (näkyvä l4-solu) kulki
   * sen vieressä sileänä. Kerätään siksi vain näkyvien solujen viivat:
   * ne ovat samaa tasoa kuin piirretty ranta, ja kehä yhtyy siihen.
   * Solun tason vaihtuessa viivamäärä muuttuu ja kehä rakennetaan
   * uudelleen (ks. rannikkoViivoja ja korostus.rannikkoja).
   */
  function rannikkoviivat() {
    const ulos = [];
    for (const [id, s2] of solut) {
      if (s2.laji !== 'rannikko' || !s2.viivat?.length || !nakyvat.has(id)) continue;
      for (const v of s2.viivat) ulos.push(v);
    }
    return ulos;
  }

  /** Sama luku ilman listan rakentamista — tätä kysytään joka kehys. */
  function rannikkoViivoja() {
    let n = 0;
    for (const [id, s2] of solut) {
      if (s2.laji === 'rannikko' && s2.viivat?.length && nakyvat.has(id)) n += s2.viivat.length;
    }
    return n;
  }

  /**
   * Piirtyykö rengas muotona vai pelkkänä mustepisteenä? Laatikon
   * lävistäjä ruudulla = asteet × tiheys (laitepikseliä astetta kohti).
   */
  function rengasNakyy(rengas) {
    if (!tiheys || !Array.isArray(rengas) || rengas.length < 2) return true;
    let lon0 = Infinity; let lat0 = Infinity; let lon1 = -Infinity; let lat1 = -Infinity;
    for (const [lon, lat] of rengas) {
      if (lon < lon0) lon0 = lon;
      if (lon > lon1) lon1 = lon;
      if (lat < lat0) lat0 = lat;
      if (lat > lat1) lat1 = lat;
    }
    const kerroin = Math.max(0.05, Math.cos((lat0 + lat1) / 2 * Math.PI / 180));
    const lavistaja = Math.hypot((lon1 - lon0) * kerroin, lat1 - lat0) * tiheys;
    return lavistaja >= KOROSTUKSEN_PIENIN_RENGAS_PX;
  }

  /** Onko näkymä niin tarkka, että kaksoisviiva näkyisi? (ks. raja) */
  const naulattava = () => tiheys >= NAULAUKSEN_TIHEYS_RAJA;

  function rakennaKorostus(haivella = false) {
    if (purettu || !materiaalit || !luokat || !kolmi?.juuri) return;
    vapautaKorostus();
    const renkaat = korostus.renkaat;
    if (!renkaat?.length) return;
    /*
     * RANNIKKO SAMASTA GEOMETRIASTA (Fablen päätös 20.9.2026): korostuksen
     * rannalla kulkevat janat pudotetaan ja tilalle tulevat maan oman
     * rannikon janat rannikkoaineistosta. Ilman ladattuja rannikkosoluja
     * korostus on entisellään.
     */
    /*
     * PIKKURENKAAT POIS KAUKOKUVASSA (ks. KOROSTUKSEN_PIENIN_RENGAS_PX).
     * Mitta on renkaan laatikon lävistäjä ruudulla: asteet × tiheys.
     */
    const nakyvatRenkaat = renkaat.filter((r) => rengasNakyy(r));
    if (!nakyvatRenkaat.length) return;
    const rannikot = naulattava() ? rannikkoviivat() : [];
    const naulaus = naulaaKorostus(nakyvatRenkaat, rannikot);
    korostus.naulattuHetki = nyt();
    korostus.rannikkoja = rannikot.length;
    mittarit.korostusPudotettuja = naulaus.pudotettuja;
    mittarit.korostusRannikkojanoja = naulaus.rannikkojanoja;
    /*
     * KOROSTUS HARVENNETAAN TÄSMÄLLEEN KUTEN RANNIKKOSOLU (korjaus
     * 20.9.2026). Solu ohittaa harvennuksen, kun aineiston oma
     * toleranssi on jo karkeampi kuin porras (ks. rakenna), mutta
     * korostus harvennettiin aina portaalla — naulattu rannikko-osuus
     * siis erkani piirretystä rantaviivasta uudelleen juuri siinä, mitä
     * naulaus oli yhdistämässä. Sama sääntö molemmille.
     */
    const lodTol = luettelo?.lodit?.[mittarit.lod] ?? 0;
    const porras = harvennus > lodTol ? harvennus : 0;
    const viivat = harvennaViivat(naulaus.viivat, porras);
    const { paikat, janoja } = vektorijanat(viivat, sade());
    korostus.janoja = janoja;
    korostus.harvennus = harvennus;
    mittarit.korostusJanoja = janoja;
    if (!janoja) return;
    const geometria = new luokat.LineSegmentsGeometry();
    geometria.setPositions(paikat);
    const olio = new luokat.LineSegments2(geometria, materiaalit.korostus);
    olio.renderOrder = VEKTORIT_KOROSTUS_RENDER_ORDER;
    olio.raycast = () => {};
    olio.visible = true;
    olio.userData.pallovektorit = { laji: 'korostus', iso: korostus.iso };
    kolmi.juuri.add(olio);
    korostus.olio = olio;
    // KAIKKI LIIKE ANIMOIDAAN PEHMEASTI: uusi maa häipyy esiin kuten solu.
    if (haivella) haivyta(korostus);
  }

  /** Solu muistista tai ämpäristä; palauttaa aina kirjanpito-olion. */
  function lataa(laji, k, avain) {
    const id = `${laji}/l${k}/${avain}`;
    const oli = solut.get(id);
    if (oli) { oli.kaytto = kello; return oli; }
    const taso = luettelo.lajit[laji]?.tasot?.[k];
    const s = {
      laji, k, avain, lupaus: null, viivat: null, olio: null, janoja: 0, tavua: 0,
      kaytto: kello, tyhja: !taso?.tiedostot?.[avain],
    };
    solut.set(id, s);
    if (s.tyhja) { s.lupaus = Promise.resolve(null); return s; }
    const osoite = `${PALLOVEKTORIT_JUURI}${laji}/l${k}/${avain}.bin`;
    mittarit.pyyntoja += 1;
    pyydetyt.add(osoite);
    s.lupaus = ikkuna.fetch(osoite)
      .then((v) => (v?.ok ? v.arrayBuffer() : null))
      .then((puskuri) => {
        if (!puskuri || purettu || !solut.has(id)) return null;
        s.tavua = puskuri.byteLength;
        mittarit.tavua += puskuri.byteLength;
        s.viivat = puraDelta(puskuri);
        const t0 = nyt();
        rakenna(s);
        mittarit.rakennusMs = +(mittarit.rakennusMs + (nyt() - t0)).toFixed(2);
        mittarit.ladattu += 1;
        return s;
      })
      .catch(() => null);
    return s;
  }

  /** Solun oliot ja muisti pois (LRU ja purku). */
  function vapauta(s) {
    vapautaOlio(s);
    s.viivat = null;
  }

  /**
   * Harvennusportaan vaihto: näkyvät solut rakennetaan uudelleen samasta
   * aineistosta, korkeintaan VEKTORIT_HARVENNUS_KATTO kappaletta
   * kerrallaan, jottei zoomaus nykäise. Loput tulevat seuraavilla
   * päivityksillä (jarru 60 ms).
   */
  function tasoitaUudelleen() {
    let jaljella = VEKTORIT_HARVENNUS_KATTO;
    for (const id of nakyvat) {
      if (jaljella <= 0) break;
      const s = solut.get(id);
      if (!s || s.tyhja || !s.viivat || !s.olio || s.harvennus === harvennus) continue;
      const nakyi = s.olio.visible;
      vapautaOlio(s);
      rakenna(s, nakyi);
      jaljella -= 1;
    }
  }

  /** LRU: katon yli menevät, näkymättömät solut pois vanhimmasta alkaen. */
  function karsi() {
    if (solut.size <= VEKTORIT_SOLUKATTO) return;
    const ehdokkaat = [...solut.entries()]
      .filter(([id, s]) => !nakyvat.has(id) && !s.tyhja)
      .sort((a, b) => a[1].kaytto - b[1].kaytto);
    for (const [id, s] of ehdokkaat) {
      if (solut.size <= VEKTORIT_SOLUKATTO) break;
      vapauta(s);
      solut.delete(id);
    }
  }

  /** Näkyvyys päälle ja pois; uusi näkyvä solu häipyy pehmeästi. */
  function nayta() {
    let janoja = 0;
    for (const [id, s] of solut) {
      if (s.tyhja || !s.olio) continue;
      const nakyy = nakyvat.has(id);
      if (nakyy && !s.olio.visible) { s.olio.visible = true; haivyta(s); }
      else if (!nakyy && s.olio.visible) s.olio.visible = false;
      if (nakyy) janoja += s.janoja;
    }
    mittarit.janoja = janoja;
    mittarit.janojaSolua = mittarit.soluja ? Math.round(janoja / mittarit.soluja) : 0;
  }

  /* ---------------- päivitys ---------------------------------------- */

  /** Näkyvä alue ja ruudun tiheys — sama mitta kuin lepokerroksella. */
  function nakyvaAlue() {
    const kamera = kehysmitat?.kamera ?? pallo.camera?.();
    const { W, H } = ruutu();
    const R = kehysmitat?.sade ?? pallo.getGlobeRadius?.();
    if (!kamera || !(W > 0) || !(H > 0) || !(R > 0)) return { alue: null, tarve: 0 };
    const N = LEPOKERROS_NAYTTEITA;
    const naytteet = [];
    for (let j = 0; j < N; j += 1) {
      for (let i = 0; i < N; i += 1) {
        naytteet.push(pinnanPiste(kamera, (W * i) / (N - 1), (H * j) / (N - 1), W, H, R));
      }
    }
    const pov = kehysmitat?.pov ?? pallo.pointOfView?.() ?? { lng: 0 };
    const alue = lepokerroksenAlue(naytteet, pov.lng ?? 0, { vara: VEKTORIT_VARA_AST });
    const keski = pinnanPiste(kamera, W / 2, H / 2, W, H, R);
    const alas = pinnanPiste(kamera, W / 2, H / 2 + LEPOKERROS_MITTAMATKA_PX, W, H, R);
    const ero = keski && alas ? Math.abs(keski.lat - alas.lat) : 0;
    const tarve = ero > 1e-6 ? (LEPOKERROS_MITTAMATKA_PX * pikselisuhde()) / ero : 0;
    return { alue, tarve };
  }

  /** Kehyksen tunnus: kamera ja ruudun mitat. Sama tunnus = ei tarvetta. */
  const kehysTunnus = (k) => (k?.pov
    ? `${k.pov.lat.toFixed(5)},${k.pov.lng.toFixed(5)},${(k.pov.altitude ?? 0).toFixed(6)},${k.W},${k.H},${k.suhde}`
    : '');

  /*
   * Piirtokoukun kuuntelija. Jarru on ennallaan (VEKTORIT_JARRU_MS):
   * kerros päivittyy enintään kerran siinä ajassa ja vain, kun kamera
   * tai ruudun koko on muuttunut. Kehysmitat talletetaan JOKA kehyksellä,
   * jotta materiaalien ruutumitat ja näkyvä alue tulevat aina siitä
   * kehyksestä, jonka kanssa laattakerros laski omansa.
   */
  /** Verkko piiloon maailmakuvassa (REITTIVERKON_KORKEUSKATTO), näkyviin laudan mittakaavassa. */
  function verkonKorkeusportti(pov) {
    if (!verkko.olio || !verkko.nakyy) return;
    const sallittu = !(pov?.altitude > REITTIVERKON_KORKEUSKATTO);
    if (verkko.olio.visible !== sallittu) verkko.olio.visible = sallittu;
  }

  function kehyksessa(kehys) {
    verkonKorkeusportti(kehys?.pov ?? pallo.pointOfView?.());
    if (purettu) return;
    kehysmitat = kehys;
    if (kehys.aika - viimeAjo < VEKTORIT_JARRU_MS) return;
    const tunnus = kehysTunnus(kehys);
    if (tunnus === viimeTunnus) return;
    viimeAjo = kehys.aika;
    viimeTunnus = tunnus;
    void paivita();
  }

  async function paivita() {
    if (purettu || !luettelo || !luokat) return false;
    const t0 = nyt();
    kello += 1;
    const { alue, tarve } = nakyvaAlue();
    /*
     * TIHEYS ENSIN, VASTA SITTEN MATERIAALIT: viivan leveys ja
     * harvennusporras liukuvat kameran korkeuden mukana, joten ne on
     * luettava SAMASTA kehyksestä kuin näkyvä alue (sama oppi kuin
     * v1649:n kahdessa kartassa).
     */
    tiheys = tarve;
    harvennus = harvennusPorras(tarve);
    mittarit.harvennus = harvennus;
    tahdista();
    /*
     * Korostus elää samassa harvennusportaassa kuin muut viivat, mutta
     * se on yksi olio eikä ruudukko — ei kattoa, ei jonoa: portaan
     * vaihtuessa se rakennetaan heti (Suomen renkaat ovat murto-osa
     * yhdestä solusta) ja ilman häivettä, koska viiva on jo ruudulla.
     */
    if (korostus.renkaat && korostus.harvennus !== harvennus) {
      rakennaKorostus();
    } else if (korostus.renkaat
      && korostus.rannikkoja !== (naulattava() ? rannikkoViivoja() : 0)
      && nyt() - korostus.naulattuHetki >= NAULAUKSEN_VAIMENNUS_MS) {
      // Rannikkoaineisto muuttui (solu saapui tai näkymä ylitti rajan):
      // naulaus uusiksi, mutta korkeintaan vaimennusvälin tahdissa.
      rakennaKorostus();
    }
    const k = vektoritaso(luettelo.lodit, tarve, VEKTORIT_TERAVYYS_PX);
    mittarit.lod = k;
    mittarit.tol = luettelo.lodit[k];
    mittarit.tarvePxAste = +tarve.toFixed(1);
    mittarit.alue = alue;
    /*
     * RAJAT VASTA MAANÄKYMÄSTÄ SISÄÄNPÄIN: karkeilla tasoilla rajan
     * pistekuvio olisi tiheämpi kuin ruutu ja rajat sulaisivat läiskiksi
     * (luku 4.2; näkyvyysrajan lopullinen arvo on V3:n omistajapäätös).
     */
    const lajit = tarve >= VEKTORIT_RAJAT_PX_ASTE ? ['rannikko', 'rajat'] : ['rannikko'];
    const uudet = new Set();
    const odotettavat = [];
    for (const laji of lajit) {
      const taso = luettelo.lajit[laji]?.tasot?.[k];
      if (!taso) continue;
      for (const avain of vektorisolut(alue, taso.solu ?? luettelo.solu)) {
        const s = lataa(laji, k, avain);
        if (s.tyhja) continue;
        uudet.add(`${laji}/l${k}/${avain}`);
        if (!s.viivat) odotettavat.push(s.lupaus);
      }
    }
    nakyvat = uudet;
    mittarit.soluja = uudet.size;
    tasoitaUudelleen();
    nayta();
    karsi();
    mittarit.paivitaMs = +(nyt() - t0).toFixed(2);
    if (odotettavat.length) {
      await Promise.all(odotettavat);
      if (!purettu) { tasoitaUudelleen(); nayta(); karsi(); }
    }
    return true;
  }

  return {
    valmis,
    paivita,
    /**
     * PELAAJAN MAAN RAJA VAHVEMMALLA (omistaja 11.9.2026). Kutsuja on
     * js/maanaariviivat.js (pallolaudan `paivita`), joka antaa maan
     * renkaat valmiiksi asteina — tämä kerros ei tunne pelitilaa eikä
     * maatauluja, vain viivan.
     *
     * `iso` on mukana pelkkänä tunnisteena (mittarit, savukkeet).
     * Tyhjä tai puuttuva rengaslista PYYHKII korostuksen: maa, jota
     * aineistossa ei ole, jättää pallon täsmälleen entiselleen.
     */
    korostaMaa(iso, renkaat) {
      const uusiIso = iso || null;
      const uudet = Array.isArray(renkaat) && renkaat.length ? renkaat : null;
      if (uusiIso === korostus.iso && uudet === korostus.renkaat) return false;
      korostus.iso = uusiIso;
      korostus.renkaat = uudet;
      mittarit.korostus = uusiIso;
      mittarit.korostusRenkaita = uudet?.length ?? 0;
      if (!uudet) { vapautaKorostus(); mittarit.korostusJanoja = 0; return true; }
      rakennaKorostus(true);
      return true;
    },
    /**
     * LÖYTÄMISEN SUMU: `paalla` vaalentaa kaikki rajat (× kerroin) ja
     * `viivat` (käytyjen maiden renkaat asteina) piirretään normaalilla
     * rajapeitolla päälle. Palauttaa true, jos jokin muuttui.
     */
    asetaSumu({ paalla = false, avain = null, viivat = null, kerroin = 0.35 } = {}) {
      const uusiPaalla = Boolean(paalla);
      const uudet = Array.isArray(viivat) && viivat.length ? viivat : null;
      const sama = uusiPaalla === kaydyt.paalla && avain === kaydyt.avain && uudet === kaydyt.viivat;
      if (sama) return false;
      kaydyt.paalla = uusiPaalla;
      kaydyt.avain = avain;
      kaydyt.viivat = uudet;
      sumunKerroin = kerroin;
      paivitaRajapeitto();
      mittarit.sumu = uusiPaalla;
      rakennaKaydyt();
      return true;
    },
    /**
     * HIMMEÄ REITTIVERKKO (ks. tiedoston alku). `avain` on lauta (pack.id):
     * sama avain ei rakenna mitään uudestaan; uusi avain vaihtaa
     * geometrian. `viivat` on lista viivoja, viiva on lista [lon, lat]
     * -pisteitä — sama muoto kuin rannikkosoluilla. Tyhjä lista pyyhkii.
     */
    asetaVerkko(avain, viivat) {
      const uusiAvain = avain || null;
      const uudet = Array.isArray(viivat) && viivat.length ? viivat : null;
      if (uusiAvain === verkko.avain && uudet === verkko.viivat) return false;
      verkko.avain = uusiAvain;
      verkko.viivat = uudet;
      mittarit.verkko = uusiAvain;
      if (!uudet) { vapautaVerkko(); return true; }
      rakennaVerkko();
      return true;
    },
    /** Verkko näkyviin tai piiloon — pelkkä lippu, ei häivettä, ei rakennusta. */
    /**
     * Toisen aikakauden rajat (Isoisän linssi 1873): `{ avain, viivat:
     * [{ l, p: [[lon, lat], …] }] }` tai null (pois). Kun päällä,
     * nykyiset ja käytyjen maiden rajat ovat näkymättömiä.
     */
    asetaHistoriarajat(aineisto = null) {
      const uudet = Array.isArray(aineisto?.viivat) && aineisto.viivat.length ? aineisto.viivat : null;
      const avain = uudet ? (aineisto.avain ?? 'historia') : null;
      if (avain === historia.avain && uudet === historia.viivat) return false;
      historia.avain = avain;
      historia.viivat = uudet;
      historia.paalla = Boolean(uudet);
      mittarit.historia = avain;
      paivitaRajapeitto();
      if (!uudet) vapautaHistoria(); else rakennaHistoria();
      return true;
    },
    naytaVerkko(nakyy) {
      const uusi = Boolean(nakyy) && reittiverkkoPaalla(ikkuna);
      if (uusi === verkko.nakyy) return false;
      verkko.nakyy = uusi;
      mittarit.verkkoNakyy = uusi;
      if (verkko.olio) verkko.olio.visible = uusi;
      return true;
    },
    /** Mittarit savukkeille ja vartijalle (suunnitelman luku 5). */
    mittarit: () => ({ ...mittarit, pyydetyt: [...pyydetyt] }),
    pura() {
      purettu = true;
      kehyspurku();
      kehyspurku = () => {};
      kehysmitat = null;
      vapautaKorostus();
      korostus.iso = null;
      korostus.renkaat = null;
      vapautaVerkko();
      verkko.avain = null;
      verkko.viivat = null;
      vapautaKaydyt();
      kaydyt.viivat = null;
      vapautaHistoria();
      historia.viivat = null;
      historia.paalla = false;
      for (const s of solut.values()) vapauta(s);
      solut.clear();
      nakyvat = new Set();
      for (const m of kloonit) m.dispose?.();
      kloonit.clear();
      for (const m of Object.values(materiaalit ?? {})) m.dispose?.();
      materiaalit = null;
      reitit?.aseta?.('vektorit', []);
      mittarit.tila = 'purettu';
    },
  };
}
