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
 * 6. EI UUSIA ELEMENTTEJÄ. Yhdysviivaa merkin oikealta paikalta
 *    sarakkeeseen harkittiin ja jätettiin pois: sarake on kiinni
 *    kaupungissa (alle sormenleveyden päässä), joten yhteys on
 *    ilmeinen ilman viivaakin, ja 1800-luvun karttatyyli sietää
 *    huonosti ylimääräistä viivastoa laatan vieressä. Siirto on
 *    ESITYSTÄ, EI DATAA — sama sopimus kuin kohtaamispisteellä
 *    (js/fokuspiste.js PISTE_ERO_MIN) ja kohdemerkkien erottelulla
 *    (js/fokuskohteet.js eritteleKohdeRyhmat): pakettien koordinaatit
 *    jäävät koskematta, ja osuma-alueet seuraavat merkkiä, koska ne
 *    ovat saman ankkuriryhmän lapsia.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NIPPU_/nippu-etuliitteellä.
 */

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
  const x = nippu ? nippu.x : ryhma.x + (ryhma.sx ?? 0);
  const y = nippu ? nippu.y : ryhma.y + (ryhma.sy ?? 0);
  ryhma.g?.setAttribute?.('transform',
    `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${s.toFixed(4)})`);
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
export function niputaFokusmerkit(ui, s) {
  if (!ui || !(s > 0)) return;
  const merkit = nippuMerkit(ui);
  if (!merkit.length) return;
  const city = ui.fokusmoodi && !ui.katselu ? ui.game?.cityOf?.() : null;
  if (!city || !Number.isFinite(city.x) || !Number.isFinite(city.y)) {
    for (const { ryhma } of merkit) nippuAseta(ryhma, null, s);
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
    // Törmäysraja merkkien perustason säteistä (ks. sääntö 1).
    if (etaisyys < (NIPPU_LAATTA_R + merkki.sade) * s) {
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
  const vapaa = NIPPU_VAPAA * s;
  for (const [cx, jono] of niput) {
    jono.sort((a, b) => (a.merkki.ryhma.y - b.merkki.ryhma.y)
      || (a.merkki.ryhma.x - b.merkki.ryhma.x)
      || (a.jono - b.jono));
    const x = cx + NIPPU_DX * s;
    let rivi = 0;
    for (const { merkki } of jono) {
      let y = city.y + rivi * NIPPU_VALI * s;
      // Vihreä piste ei väisty — sarake väistää sitä (ks. sääntö 4).
      let vaistoja = 0;
      while (vaistoja < NIPPU_VAISTOJA
        && pisteet.some((p) => Math.hypot(x - p.x, y - p.y) < vapaa)) {
        rivi += 1;
        vaistoja += 1;
        y = city.y + rivi * NIPPU_VALI * s;
      }
      nippuAseta(merkki.ryhma, { x, y }, s);
      rivi += 1;
    }
  }
}
