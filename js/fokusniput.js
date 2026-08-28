/*
 * PISTENIPUT — kaupungin päälle osuvat merkit siistiksi sarakkeeksi.
 *
 * Omistajan pelitestitilaus 26.8.2026 (kuvakaappaus Kreikan
 * fokuskartasta, Ateena): kaupungin kultaisen merkin päällä oli kaksi
 * kohde-/täkymerkkiä (mm. silmäsymboli), eikä kaupunkia meinannut
 * pystyä painamaan. *"Tällaiset pisteet voisi kasata nippuun kaupungin
 * pisteen oikealle puolelle siististi allekkain."*
 *
 * ── MITÄ TÄMÄ TIEDOSTO ON ──────────────────────────────────────────
 *
 * Yksi yhteinen kasauspassi KAHDELLE merkkikerrokselle: kartan
 * fokuskohteille (js/fokuskohteet.js) ja täkysymboleille
 * (js/fokusnosto-symbolit.js). Kumpikin kerros kutsuu tätä omassa
 * asemointifunktiossaan juuri ennen muunnosten kirjoittamista, ja passi
 * kirjoittaa jokaiselle ankkuriryhmätietueelle `nippu`-kentän: joko
 * korvaavan piirtopaikan laudan koordinaateissa tai null (merkki pysyy
 * omalla paikallaan). Yhteinen passi on välttämätön, koska sarake on
 * YKSI: kohde- ja täkymerkit menevät samaan jonoon eivätkä kahteen
 * päällekkäiseen.
 *
 * ── SÄÄNNÖT (omistajan tilaus + Raamatun fokuslinjaukset) ──────────
 *
 * 1. KAUPUNKIMERKKI EI SIIRRY KOSKAAN — vain kohde- ja täkymerkit
 *    väistävät. Merkki katsotaan liian lähelle osuneeksi, kun sen
 *    keskipiste on kaupungin napautusalueen (js/ui.js
 *    FOKUS_LAATTA_OSUMA_PX) ja merkin oman aluslaatan säteiden summaa
 *    lähempänä kaupungin keskipistettä: silloin merkin laatta lepäisi
 *    kaupungin sormialueen päällä ja söisi sen napautuksen, koska
 *    merkkikerrokset ovat piirtojärjestyksessä laattakerroksen päällä.
 *
 * 2. NIPPU ON PYSTYSARAKE KAUPUNGIN OIKEALLA PUOLELLA, ylin merkki
 *    kaupunkimerkin korkeudella ja loput vakiovälein allekkain.
 *    Sarakkeen etäisyys on mitoitettu niin, että merkkien 44 px:n
 *    osuma-alueet (r = 22) jäävät kokonaan irti kaupungin 48 px:n
 *    alueesta (r = 24) — juuri se oli tilauksen vika.
 *
 * 3. KARTAN MITTAKAAVASSA (omistajan LOPULLINEN linjaus 26.8.2026,
 *    Raamattu): kaikki mitat ovat ruudun pikseleitä LEHDEN
 *    PERUSTASOLLA ja ne muunnetaan laudan yksiköiksi samalla
 *    vakioskaalalla kuin merkit itse (js/ui.js fokusMerkkiSkaala).
 *    Sarake elää siis kartan mukana kuten merkitkin, eikä nippu voi
 *    hajota tai mennä uusiksi zoomatessa.
 *
 * 4. VIHREÄ KOHTAAMISPISTE (js/fokuspiste.js) EI OLE NIPUTETTAVA —
 *    sen erilaisuus on sen merkki. Jos pisteen paikka osuu sarakkeen
 *    kohdalle, sarakkeen rivi hypätään yli eli MUUT väistävät sitä.
 *
 * 5. YLEINEN, EI ATEENA-KOHTAINEN: passi lukee nykyisen kaupungin
 *    pelistä (ui.game.cityOf) ja toimii jokaisella fokusmaalla ja
 *    mielivaltaisella määrällä päällekkäisiä merkkejä. Kiertävällä
 *    laudalla jokainen kaupungin kopio (ui.kiertoKohdat) saa oman
 *    sarakkeensa, ja saman merkin kopiot saavat saman rivin, koska
 *    jono järjestetään merkin omista koordinaateista.
 *
 * 6. YHDYSVIIVA KAUPUNKIIN — VAALEA KATKOVIIVA LAATTOJEN ALLA.
 *
 *    Tämä kohta luki aiemmin "EI UUSIA ELEMENTTEJÄ": yhdysviiva
 *    harkittiin ja jätettiin pois sillä perusteella, että sarake on
 *    kiinni kaupungissa ja yhteys siksi ilmeinen ilman viivaakin.
 *    OMISTAJAN PELITESTI 27.8.2026 KUMOSI SEN: *"ateenan lisäpisteisiin
 *    sen oikealla puolella saisi tulla pienet vaaleat katkoviivat,
 *    jotta tajuaa niiden olevan oikeasti ateenassa"*. Sarake ei siis
 *    kerro itsestään sitä, minkä se on tarkoittanut kertoa — merkit
 *    näyttävät omilta paikoiltaan kaupungin vierestä.
 *
 *    Viiva on kartan kevyttä apuviivastoa eikä nuoli: ohut, haalistunut
 *    muste, lyhyet katkot, ei nuolenpäitä. Se alkaa kaupungin laatan
 *    reunalta (NIPPU_LAATTA_R) eikä laatan alta ja päättyy merkin oman
 *    aluslaatan reunaan, joten kumpikaan pää ei jää minkään alle. Kerros
 *    on LAATTOJEN ALLA (nippuViivakerros) eikä ota napautuksia vastaan,
 *    joten kaupungin sormialue säilyy koskemattomana — juuri se oli
 *    koko nipun alkuperäinen tilaus.
 *
 *    Siirto itse on yhä ESITYSTÄ, EI DATAA — sama sopimus kuin
 *    kohtaamispisteellä (js/fokuspiste.js PISTE_ERO_MIN) ja
 *    kohdemerkkien erottelulla (js/fokuskohteet.js
 *    eritteleKohdeRyhmat): pakettien koordinaatit jäävät koskematta, ja
 *    osuma-alueet seuraavat merkkiä, koska ne ovat saman ankkuriryhmän
 *    lapsia. Viiva on saman esityksen jälki eikä uutta tietoa.
 *
 * 7. SARAKE MAHTUU AINA LEHDEN IKKUNAAN — RIVIVÄLI TIIVISTYY.
 *
 *    Omistajan pelitesti 28.8.2026 (iPhone, Kreikan fokuskartta):
 *    *"Miksi iphonella näkyy näin monia pisteitä viivan kanssa?"* —
 *    Ateenan ryppään merkit sinkoutuivat katkoviivoineen ympäri lautaa,
 *    Epidauros Kreetan alapuolelle ja Akropolis Santorínin eteläpuolelle,
 *    vaikka niiden pitäisi asettua pieneen viuhkaan kaupungin viereen.
 *
 *    SYY ON SÄÄNNÖN 3 MITTA KAPEALLA RUUDULLA. Kaikki tämän tiedoston
 *    luvut ovat ruudun pikseleitä LEHDEN PERUSTASOLLA, ja perustaso on
 *    lehden ikkuna sovitettuna karttaruutuun (js/ui.js
 *    fokusMerkkiSkaala: `Math.min(paneW / w, paneH / h)`). Puhelimen
 *    ruutu on kapea ja korkea, joten sovitus tulee LEVEYDESTÄ: Kreikan
 *    lehti on 468 × 292 lautayksikköä ja 374 pikselin ruudulla yksi
 *    pikseli on 1,25 lautayksikköä, kun se työpöydän 1419 pikselin
 *    ruudulla on 0,36. Sama 30 pikselin riviväli on siis puhelimella
 *    3,5-kertainen SUHTEESSA KARTTAAN — ja yhdeksän merkin sarake
 *    (8 × 30 px = 300 yksikköä) on puhelimella PIDEMPI KUIN KOKO LEHTI,
 *    joka on 292 yksikköä korkea. Mitattuna: alin rivi y = 2032, lehden
 *    alareuna y = 2018. Sarake valui kirjaimellisesti ulos kuvasta.
 *    Työpöydällä sama sarake on 85 yksikköä eli neljännes lehdestä, ja
 *    juuri siksi vika näkyi vain puhelimella.
 *
 *    KORJAUS ON RIVIVÄLISSÄ, EI MITTAKAAVASSA. Sääntö 3 pysyy: merkit ja
 *    sarake elävät kartan mukana eikä nippu hajoa zoomatessa. Riviväli
 *    saa kuitenkin TIIVISTYÄ, kun rivejä on niin monta, ettei sarake
 *    muuten mahtuisi lehden ikkunaan (nippuRiviVali,
 *    NIPPU_KORKEUS_OSUUS) — alarajana merkkien omat aluslaatat, jotka
 *    eivät saa mennä päällekkäin (NIPPU_VALI_RAKO). Tavallinen yhden,
 *    kahden tai neljän merkin nippu ei muutu lainkaan: tiivistys alkaa
 *    vasta siitä, missä sarake muuten karkaisi kartalta.
 *
 * 8. KAKSI MITTAA: MERKIN OMA JA SORMEN.
 *
 *    Omistajan pelitesti 28.8.2026 (jatko kohtaan 7): *"Viivat
 *    pisteisiin ovat isompia, varsinkin ne pisteet ja symbolit, ovat
 *    isompia kuin muut symbolit kartalla. --- selitetekstit, symbolit
 *    ja tekstit voisivat olla pienemmällä ja paljon lähempänä silloin
 *    Ateenaan."*
 *
 *    Merkkien NÄKYVÄ koko sai katon lehden omista mitoista (js/ui.js
 *    fokusMerkkiSkaalaKartalle): kapea ruutu ei enää paisuta merkkiä yli
 *    kartan omien symbolien. Nipun mitat jakautuvat siksi kahtia:
 *
 *      s       KATETTU merkkiskaala — rivien väli, yhdysviivan paksuus
 *              ja katkot sekä merkkien omat aluslaatat. Kun merkki
 *              pienenee, sarake tiivistyy samassa suhteessa ja rypäs
 *              kutistuu kaupungin viereen — juuri se, mitä tilattiin.
 *
 *      sRuutu  KATTAMATON skaala eli sormen mitta lehden perustasolla.
 *              Sillä lasketaan kaikki, mikä koskee NAPAUTUSTA:
 *              kaupungin osuma-alue (NIPPU_LAATTA_R), sarakkeen etäisyys
 *              (NIPPU_DX), vihreän pisteen väistövara (NIPPU_VAPAA) ja
 *              se raja, jonka sisällä merkki katsotaan kaupungin päälle
 *              osuneeksi. Nämä EIVÄT saa kutistua merkin mukana, tai
 *              sarake palaisi kaupungin sormialueen päälle — se oli
 *              koko nipun alkuperäinen tilaus (sääntö 1).
 *
 *    Leveällä ruudulla katto ei pure ja mitat ovat samat kuin ennen.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NIPPU_/nippu-etuliitteellä.
 */

import { el, maare } from './mapart.js';

/*
 * MITAT RUUDUN PIKSELEINÄ LEHDEN PERUSTASOLLA (ks. sääntö 3).
 *
 * NIPPU_LAATTA_R on kaupungin napautusalueen säde — sama luku kuin
 * js/ui.js FOKUS_LAATTA_OSUMA_PX / 2 (48/2; vakiota ei voi tuoda
 * sieltä, koska ui.js tuo merkkikerrokset ja tuonti toisin päin olisi
 * kehä). NIPPU_KOHDE_R ja NIPPU_TAKY_R ovat kerrosten aluslaattojen
 * säteet (js/fokuskohteet.js KOHDE_HALO_R, js/fokusnosto-symbolit.js
 * laatan r) — törmäysraja lasketaan näistä perustason säteistä.
 */
const NIPPU_LAATTA_R = 24;
const NIPPU_KOHDE_R = 5.6;
const NIPPU_TAKY_R = 10.4;

/*
 * Sarakkeen etäisyys kaupungin keskipisteestä oikealle. Vähintään
 * kaupungin osuma-alue (24) + merkin osuma-alue (22), jotta sormialueet
 * eivät mene limittäin eikä sarakkeen merkki voi enää varastaa
 * kaupungin napautusta; kaksi pikseliä varaa päälle.
 */
const NIPPU_DX = 48;

/*
 * Rivien pystyväli. Täkysymbolin laatta on 20,8 px — 30 px:n välillä
 * laattojen väliin jää siisti vakiorako, ja vaikka 44 px:n
 * osuma-alueet menevät naapureidensa kanssa hiukan limittäin,
 * napautus merkin NÄKYVÄÄN kohtaan osuu aina oikeaan: naapurin alue
 * (r = 22) ei yllä 30 px:n päähän eli merkin omaan keskustaan asti.
 *
 * TÄMÄ ON TAVOITE, EI POHJA (sääntö 7). Ahtaassa ryppäässä väli
 * tiivistyy, jottei sarake karkaisi lehdestä (nippuRiviVali), ja silloin
 * naapurin osuma-alue kyllä yltää merkin keskustaan asti. Napautus osuu
 * silti oikeaan, koska voittajan ratkaisee LÄHIN OSUMAMUODON KESKIPISTE
 * eikä piirtojärjestys (js/fokuskohteet.js lahinKohde, v1218) — sama
 * sääntö, jolla Parnassós ja Delfoi elävät viiden yksikön päässä
 * toisistaan.
 */
const NIPPU_VALI = 30;

/*
 * Vihreän kohtaamispisteen väistövara: pisteen osuma-alue (22) +
 * merkin osuma-alue (22) keskipisteestä keskipisteeseen. Piste pitää
 * kerroksensa päällimmäisenä (js/fokuspiste.js varmistaPistekerros),
 * joten tätä lähempänä oleva rivi menettäisi napautuksensa pisteelle.
 */
const NIPPU_VAPAA = 44;

/** Varmistin: montako riviä väistö saa enintään hypätä. */
const NIPPU_VAISTOJA = 8;

/*
 * SARAKE EI SAA OLLA LEHTEÄ PIDEMPI (ks. sääntö 7).
 *
 * Osuus lehden IKKUNAN (ui.fokusPohjaRajaus) korkeudesta, jonka sarake
 * saa enimmillään viedä. Puolikas on mitoitettu Ateenan ryppäästä:
 * yhdeksän merkkiä mahtuu kaupungin viereen niin, että ylin ja alin rivi
 * jäävät selvästi lehden sisään eikä yksikään yhdysviiva ylitä puolta
 * ruutua. Isompi luku päästäisi sarakkeen taas ulos kuvasta, pienempi ei
 * enää muuttaisi mitään: alaraja tulee merkkien omasta koosta
 * (NIPPU_VALI_RAKO).
 *
 * 0,5 -> 0,3 (omistaja 28.8.2026: *"selitetekstit, symbolit ja tekstit
 * voisivat olla pienemmällä ja paljon lähempänä silloin Ateenaan. Nyt ne
 * haukkaavat liian ison osan kuva-alasta."*).
 *
 * PUOLIKAS OLI MITOITETTU ISOILLE MERKEILLE. Kun merkki oli iPhonella
 * 9,7 lautayksikköä leveä, tiiviimpi sarake olisi ollut merkkikasa; nyt
 * merkki on lehden oman symbolin mittainen 4,5 (sääntö 8), ja kolmannes
 * lehden korkeudesta riittää hyvin: Ateenan kahdeksan merkin sarake on
 * 12,5 yksikön välein eli lähes kolme merkinleveyttä harvassa.
 * Alaraja on yhä merkkien omissa aluslaatoissa (NIPPU_VALI_RAKO), joten
 * luku ei voi puristaa niitä päällekkäin.
 *
 * MITATTU (iPhone 390 x 844, Kreikan lehti, Ateena): sarakkeen korkeus
 * 146 -> 87 lautayksikköä ja pisin yhdysviiva 55 -> 33.
 */
const NIPPU_KORKEUS_OSUUS = 0.3;

/*
 * Tiivistetyn rivivälin alaraja: merkkien aluslaattojen väliin jäävä
 * rako ruudun pikseleinä lehden perustasolla. Väli ei siis koskaan
 * kutistu niin pieneksi, että laatat menisivät päällekkäin — ahtaassa
 * ryppäässä sarake on tiivis mutta merkit ovat yhä erillisiä.
 */
const NIPPU_VALI_RAKO = 3;

/*
 * YHDYSVIIVAN MITAT JA SÄVY (ks. sääntö 6).
 *
 * Mitat ovat samaa ruutupikselimittaa lehden perustasolla kuin sarakkeen
 * omat luvut, ja ne kerrotaan samalla vakioskaalalla s — viivan paksuus
 * ja katkojen pituus elävät siis kartan mukana täsmälleen kuten merkit,
 * eikä viiva voi paksuuntua tikuksi loitonnettaessa.
 *
 * Sävy on kartan haalistunutta mustetta (vrt. css/fokuskohteet.css
 * .fokuskohde-rengas #5d3f0f) vaaleampana ja läpikuultavana: viiva on
 * apuviivastoa, ei merkintä. Väri, himmeys ja katkot kirjoitetaan
 * määreinä eikä tyylitiedostosta, koska kerros syntyy tässä moduulissa
 * eikä saa olla riippuvainen siitä, kumpi merkkikerros sattui lataamaan
 * oman tyylinsä.
 */
const NIPPU_VIIVA_LEVEYS = 1.2;
const NIPPU_VIIVA_KATKO = 2.6;
const NIPPU_VIIVA_VARI = '#8a6a2c';
const NIPPU_VIIVA_HIMMEYS = 0.42;
// Pieni rako merkin aluslaatan reunaan, jottei viiva näytä kasvavan
// merkistä kiinni.
const NIPPU_VIIVA_RAKO = 2.5;
// Tätä lyhyempi pätkä ei ole viiva vaan roska: rivi jätetään piirtämättä
// (voi käydä, jos merkki päätyy poikkeuksellisen lähelle laatan reunaa).
const NIPPU_VIIVA_MIN = 5;

/**
 * Kerrosten ankkuriryhmätietueet yhtenä jonona.
 *
 * Tietueet ovat kerrosten omia ({ g, x, y, ... }); tämä passi lisää
 * niihin vain `nippu`-kentän. Aktiivisen täyn ankkuri (pieni piste,
 * jonka päälle tekstikupla asettuu) EI niputu: kupla osoittaa siihen
 * kohtaan karttaa, jota juttu koskee, eikä ankkuri ota napautuksia
 * vastaan (css pointer-events) — se ei siis ole kaupungin tiellä.
 */
function nippuMerkit(ui) {
  const merkit = [];
  for (const ryhma of ui.fokuskohdeRyhmat ?? []) {
    merkit.push({ ryhma, sade: NIPPU_KOHDE_R });
  }
  for (const ryhma of ui.nostosymRyhmat ?? []) {
    if (ryhma.g?.firstElementChild?.classList?.contains('fokusnosto-ankkuri')) continue;
    merkit.push({ ryhma, sade: NIPPU_TAKY_R });
  }
  return merkit;
}

/*
 * ASETTELUN VERSIO. Kasvaa aina kun jonkin merkin nippupaikka oikeasti
 * muuttui — kohdemerkkien nimiöväistö (js/fokuskohteet.js
 * paivitaKohdeNimiot) tarvitsee halvan tavan tietää, onko sen laskema
 * asettelu vanhentunut. Ilman tätä se joutuisi joko rakentamaan
 * paikoista tunnisteen joka kutsulla tai laskemaan törmäykset turhaan.
 */
let NIPPU_VERSIO = 0;

/** Nippuasettelun versio: kasvaa vain, kun jokin merkki oikeasti siirtyi. */
export function nippuAsettelunVersio() {
  return NIPPU_VERSIO;
}

/**
 * Yhden tietueen nippupaikka ja muunnos heti, jos paikka muuttui.
 *
 * MUUNNOS KIRJOITETAAN TÄSSÄ VAIN MUUTOKSESSA. Kumpikin kerros
 * kirjoittaa omat muunnoksensa joka asemointikutsulla heti tämän
 * passin perään — mutta kerrokset asemoituvat eri hetkinä (kohteet
 * pelin piirrossa, symbolit noston kartan vahdissa), ja ilman tätä
 * riviä toisen kerroksen merkki jäisi väärään paikkaan siihen asti,
 * kunnes sen oma asemointi sattuu ajautumaan.
 */
function nippuAseta(ryhma, nippu, s) {
  const vanha = ryhma.nippu ?? null;
  const sama = vanha === nippu || (vanha && nippu
    && Math.abs(vanha.x - nippu.x) < 0.01 && Math.abs(vanha.y - nippu.y) < 0.01);
  ryhma.nippu = nippu;
  if (sama) return;
  NIPPU_VERSIO += 1;
  const x = nippu ? nippu.x : ryhma.x + (ryhma.sx ?? 0);
  const y = nippu ? nippu.y : ryhma.y + (ryhma.sy ?? 0);
  ryhma.g?.setAttribute?.('transform',
    `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${s.toFixed(4)})`);
}

/**
 * Yhdysviivojen kerros LAATTOJEN ALLE (ks. sääntö 6).
 *
 * Kerros menee laudan juureen laattakerroksen (ui.tokenLayer) ETEEN,
 * jolloin kaupungin kultainen laatta ja pelin muut merkit piirtyvät sen
 * päälle — viiva on kartan pintaa, ei pelikerrosta. Se ei myöskään ota
 * napautuksia vastaan (pointer-events), joten se ei voi varastaa
 * kaupungin sormialuetta; juuri sen suojeleminen on koko nipun syy.
 *
 * Uusi lauta rakentaa uuden juuren, jolloin vanha kerros jää irralleen —
 * sama isConnected-tarkistus kuin muillakin kerroksilla (vrt.
 * js/fokuskohteet.js varmistaKohdekerros) rakentaa sen silloin uusiksi.
 */
function nippuViivakerros(ui) {
  const laatat = ui?.tokenLayer;
  const juuri = laatat?.parentNode;
  if (!juuri) return null;
  const vanha = ui.nippuViivaKerros;
  if (!vanha?.isConnected || vanha.parentNode !== juuri) {
    const kerros = el('g', { class: 'nippuviivat', 'pointer-events': 'none' });
    juuri.insertBefore(kerros, laatat);
    ui.nippuViivaKerros = kerros;
  }
  return ui.nippuViivaKerros;
}

/**
 * Piirtää katkoviivat nipun merkeistä kaupungin pisteeseen.
 *
 * @param {object} ui
 * @param {Array} viivat  { cx, cy, x, y, sade } laudan koordinaateissa —
 *   kaupungin (kopion) piste, merkin nippupaikka ja merkin oman
 *   aluslaatan säde perustason pikseleinä.
 * @param {number} s      merkkien vakioskaala.
 *
 * SOLMUT KIERRÄTETÄÄN eikä pureta ja rakenneta uudestaan: passi ajetaan
 * jokaisella asemoinnilla (myös panoroinnin ja nipistyksen aikana), ja
 * määreetkin kirjoitetaan vain muutoksessa (js/mapart.js maare) — sama
 * sääntö ja sama syy kuin kohdemerkkien muunnoksilla.
 */
function nippuPiirraViivat(ui, viivat, s, sRuutu = s) {
  const kerros = nippuViivakerros(ui);
  if (!kerros) return;
  let i = 0;
  for (const v of viivat) {
    const dx = v.x - v.cx;
    const dy = v.y - v.cy;
    const pituus = Math.hypot(dx, dy);
    if (!(pituus > 0)) continue;
    /*
     * Alkupää kaupungin sormialueen reunalta (sRuutu, ks. sääntö 8),
     * loppupää merkin oman aluslaatan reunaan (s) — kumpikin pää siis
     * omassa mitassaan, jottei viiva jää minkään alle.
     */
    const alku = NIPPU_LAATTA_R * sRuutu;
    const loppu = pituus - (v.sade + NIPPU_VIIVA_RAKO) * s;
    if (loppu - alku < NIPPU_VIIVA_MIN * s) continue;
    const yx = dx / pituus;
    const yy = dy / pituus;
    const solmu = kerros.childNodes[i] ?? el('line', {
      class: 'nippuviiva',
      stroke: NIPPU_VIIVA_VARI,
      opacity: NIPPU_VIIVA_HIMMEYS,
      'stroke-linecap': 'round',
    }, kerros);
    maare(solmu, 'x1', (v.cx + yx * alku).toFixed(2));
    maare(solmu, 'y1', (v.cy + yy * alku).toFixed(2));
    maare(solmu, 'x2', (v.cx + yx * loppu).toFixed(2));
    maare(solmu, 'y2', (v.cy + yy * loppu).toFixed(2));
    maare(solmu, 'stroke-width', (NIPPU_VIIVA_LEVEYS * s).toFixed(3));
    const katko = (NIPPU_VIIVA_KATKO * s).toFixed(3);
    maare(solmu, 'stroke-dasharray', `${katko} ${katko}`);
    i += 1;
  }
  while (kerros.childNodes.length > i) kerros.lastChild.remove();
}

/**
 * Yhden sarakkeen riviväli laudan yksiköinä (ks. sääntö 7).
 *
 * Tavallisesti NIPPU_VALI ruudun pikseleinä lehden perustasolla, kuten
 * kaikki muutkin tämän tiedoston mitat. Jos rivejä on niin monta, ettei
 * sarake mahtuisi lehden ikkunaan, väli tiivistyy juuri sen verran, että
 * se mahtuu — mutta ei koskaan merkkien omia aluslaattoja tiheämmäksi,
 * jottei sarakkeesta tule päällekkäisten laattojen kasaa.
 *
 * @param {Array} jono     sarakkeen tietueet ({ merkki, jono })
 * @param {number} s       merkkien vakioskaala
 * @param {?object} ikkuna lehden rajaus laudan yksiköinä tai null
 */
function nippuRiviVali(jono, s, ikkuna) {
  const tavoite = NIPPU_VALI * s;
  const rivit = jono.length;
  // Yksi merkki ei tarvitse väliä, eikä lehdetön varapolku tiedä
  // ikkunasta mitään: silloin entinen mitta on ainoa mitta.
  if (rivit < 2 || !(ikkuna?.h > 0)) return tavoite;
  const mahtuu = (ikkuna.h * NIPPU_KORKEUS_OSUUS) / (rivit - 1);
  if (mahtuu >= tavoite) return tavoite;
  /*
   * Alaraja on nipun SUURIN aluslaatta: täkysymbolin laatta on
   * kohdemerkin laattaa isompi, ja jos väli mitoitettaisiin pienimmän
   * mukaan, täky peittäisi naapurinsa.
   */
  const suurin = jono.reduce((m, { merkki }) => Math.max(m, merkki.sade), 0);
  return Math.max((2 * suurin + NIPPU_VALI_RAKO) * s, mahtuu);
}

/**
 * KASAUSPASSI — kutsutaan kerrosten asemoinnista ennen muunnoksia.
 *
 * @param {object} ui  Pelin UI-olio (fokuskohdeRyhmat, nostosymRyhmat,
 *   fokuspisteRyhmat, game, kiertoKohdat, fokusmoodi, katselu).
 * @param {number} s   Merkkien vakioskaala (js/ui.js fokusMerkkiSkaala)
 *   — sama arvo, jolla kutsuja on juuri kirjoittamassa muunnoksiaan.
 *
 * DETERMINISTINEN: jono järjestetään merkkien omista koordinaateista
 * (y, sitten x, sitten jonon vakaa järjestys), joten sama lauta antaa
 * aina saman sarakkeen — eikä rivi vaihdu sen mukaan, kumpi kerros
 * sattui asemoitumaan ensin. Työ on muutaman merkin lajittelu ilman
 * yhtäkään mittausta, joten passin voi ajaa huoletta joka kutsulla.
 */
export function niputaFokusmerkit(ui, s, sRuutu = s) {
  if (!ui || !(s > 0)) return;
  // Sormen mitta ei saa jäädä nollaksi, jos kutsuja ei sitä anna.
  const ruutu = sRuutu > 0 ? sRuutu : s;
  const merkit = nippuMerkit(ui);
  // Tyhjä kerros myös silloin kun nippua ei ole: vanhat viivat eivät saa
  // jäädä kartalle merkkien lähdettyä (ks. sääntö 6).
  if (!merkit.length) {
    nippuPiirraViivat(ui, [], s, ruutu);
    return;
  }
  const city = ui.fokusmoodi && !ui.katselu ? ui.game?.cityOf?.() : null;
  if (!city || !Number.isFinite(city.x) || !Number.isFinite(city.y)) {
    for (const { ryhma } of merkit) nippuAseta(ryhma, null, s);
    nippuPiirraViivat(ui, [], s, ruutu);
    return;
  }
  /*
   * Kiertävällä laudalla kaupunki on kartalla kahdesti; jokainen
   * merkkikopio niputetaan LÄHIMMÄN kaupunkikopion viereen, jolloin
   * saman merkin kopiot saavat saman rivin omissa sarakkeissaan.
   */
  const kohdat = ui.kiertoKohdat?.(city.x) ?? [city.x];
  const niput = new Map();
  merkit.forEach((merkki, jono) => {
    let cx = kohdat[0];
    let etaisyys = Infinity;
    for (const kohta of kohdat) {
      const e = Math.hypot(merkki.ryhma.x - kohta, merkki.ryhma.y - city.y);
      if (e < etaisyys) { etaisyys = e; cx = kohta; }
    }
    /*
     * Törmäysraja merkkien perustason säteistä (ks. sääntö 1):
     * kaupungin sormialue kattamattomassa mitassa, merkin oma aluslaatta
     * katetussa (sääntö 8).
     */
    if (etaisyys < NIPPU_LAATTA_R * ruutu + merkki.sade * s) {
      const jold = niput.get(cx) ?? [];
      jold.push({ merkki, jono });
      niput.set(cx, jold);
    } else {
      nippuAseta(merkki.ryhma, null, s);
    }
  });
  // Vihreän pisteen piirtopaikat (sivusiirtoineen) väistöä varten.
  const pisteet = (ui.fokuspisteRyhmat ?? [])
    .map(({ x, y }) => ({ x, y }))
    .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
  // Väistövara on kahden sormialueen summa — kattamaton mitta (sääntö 8).
  const vapaa = NIPPU_VAPAA * ruutu;
  // Yhdysviivat kerätään samassa silmukassa ja piirretään kerralla.
  const viivat = [];
  for (const [cx, jono] of niput) {
    jono.sort((a, b) => (a.merkki.ryhma.y - b.merkki.ryhma.y)
      || (a.merkki.ryhma.x - b.merkki.ryhma.x)
      || (a.jono - b.jono));
    // Sarakkeen etäisyys on kahden sormialueen summa (sääntö 8).
    const x = cx + NIPPU_DX * ruutu;
    /*
     * RIVIVÄLI TIIVISTYY, JOS SARAKE EI MUUTEN MAHDU LEHTEEN (sääntö 7).
     * Väli lasketaan kerran koko sarakkeelle eikä riveittäin: eri
     * mittaiset välit lukisivat sotkuna, ei nippuna.
     */
    const vali = nippuRiviVali(jono, s, ui.fokusPohjaRajaus);
    /*
     * SARAKE KESKITETÄÄN KAUPUNGIN KORKEUDELLE (rivit 0, +1, −1, +2, …
     * — omistaja 26.8.2026, Akropolis: "piste on liian kaukana
     * ateenasta"). Ennen rivit laskivat vain alaspäin, ja kun vihreä
     * piste vielä työnsi ensimmäisen merkin riville 1, kaupungin
     * keskellä oleva kohde valui diagonaalisesti kauas laatasta.
     * Yksittäinen merkki — tavallisin tapaus — istuu nyt suoraan
     * laatan viereen samalle korkeudelle.
     */
    const riviY = (i) => city.y
      + (i === 0 ? 0 : (i % 2 ? (i + 1) / 2 : -(i / 2))) * vali;
    let indeksi = 0;
    for (const { merkki } of jono) {
      let y = riviY(indeksi);
      // Vihreä piste ei väisty — sarake väistää sitä (ks. sääntö 4).
      let vaistoja = 0;
      while (vaistoja < NIPPU_VAISTOJA
        && pisteet.some((p) => Math.hypot(x - p.x, y - p.y) < vapaa)) {
        indeksi += 1;
        vaistoja += 1;
        y = riviY(indeksi);
      }
      nippuAseta(merkki.ryhma, { x, y }, s);
      indeksi += 1;
      /*
       * Yhdysviiva samasta laskennasta (ks. sääntö 6). Piilotetun
       * merkkikerroksen riviä ei piirretä: yleiskuvassa kohdemerkit ovat
       * poissa (css .fokuskohteet-piilossa), ja viiva jäisi osoittamaan
       * tyhjää.
       *
       * LUOKAN ON OLTAVA TUORE. Tämä lukee DOMista tilan, jonka
       * js/fokuskohteet.js paivitaNakyvyys kirjoittaa — ja se kutsutaan
       * siksi ENNEN asemointia, ei sen jälkeen. Jäljessä oleva luokka
       * näkyi savukkeessa suoraan: yleiskuvasta lähennettäessä viivoja
       * ei piirretty lainkaan ennen seuraavaa kartan liikahdusta.
       */
      if (!merkki.ryhma.g?.parentNode?.classList?.contains('fokuskohteet-piilossa')) {
        viivat.push({ cx, cy: city.y, x, y, sade: merkki.sade });
      }
    }
  }
  nippuPiirraViivat(ui, viivat, s, ruutu);
}
