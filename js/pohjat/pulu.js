/**
 * PULU-POHJA, osa CHAT (tyylikirja.json pohjat.PULU: osat CHAT, VALINTATAULU, OPETUSTAULU; sulku Pulun napautus,
 * ohinapautus, Esc, ei ✕). Natiivissa MinipulunKortti (Kuvanakyma.cs). Siirretty sellaisenaan Astronautin kameran
 * minipulusta ja kysymyskortista (js/linssit/satelliitti.js, Päätoimittaja 2.10.2026: "satelliitin minipulu ja kortti
 * yhteiseksi PULU-pohjaksi, ei kahta kopiota"): minipulu kulmassa, valmiit kysymykset virran alussa ja vapaa kysymys
 * samaa reittiä kuin kartan pulu (js/pollo.js polloUlkoinenKysymys).
 *
 * `luokka` on luokkien etuliite: satelliitti käyttää omaa nahkaansa ('satelliitti' → .satelliitti-pulukortti ym.,
 * css/satelliitti.css), uudet pinnat pohjan tokenityylejä ('tk' → .tk-pulukortti ym., css/pohjat/pulu.css). DOM on
 * molemmissa sama.
 *
 * @param {{luokka?: string, teema?: string, aihe?: string, kysymykset?: string[]}} asetukset
 * @returns {{kulma: HTMLElement, kortti: HTMLElement, nappi: HTMLElement, minipulu: object|null,
 *   nayta: (auki: boolean) => void, kysy: (teksti: string) => Promise<void>, tuhoa: () => void}}
 */
import { luoMinipulu } from '../minipulu.js';
import { html, polloNimilappu } from '../ui-apurit.js';
import { polloUlkoinenKysymys } from '../pollo.js';
import { pohjatLataaTyyli } from './pohjat.js';

export function luoPohjaPulu({ luokka = 'tk', teema = 'paperi', aihe = '', kysymykset = [] } = {}) {
  const L = luokka;
  const nappi = (luokka2, teksti, otsikko) => {
    const b = html('button', luokka2, teksti);
    b.type = 'button';
    b.title = otsikko;
    b.setAttribute('aria-label', otsikko);
    return b;
  };
  /*
   * ── MINIPULU RUUDUN OIKEASSA ALAKULMASSA ─────────────────────────
   *
   * OMISTAJA 16.9.2026 klo 06.15 UTC, sanatarkasti: *"Lisäksi minipulu
   * ei ole nyt näkyvissä. Se saisi olla oikeassa alareunassa näkyvillä,
   * ja jokaiseen kohteeseen voisi generoida kaksi valmista kysymystä."*
   * (Raamattu, kohdat 9 ja 10.)
   *
   * PELIN PULU ON NYT ASTRONAUTTINA KARTALLA. Tämä Codexin toimittama
   * MINIPULU (js/minipulu.js, PR 2521) säilyy silti kuvauskortin omana
   * oppaana: se on pieni ja tummalle pohjalle sovitettu, eikä korvaa
   * kartan paperinukkea.
   *
   * KOLME SYYTÄ SILLE, MIKSI TÄMÄ EI OLE `pollo-nappi` UUDESSA
   * PAIKASSA:
   *   • pelin pulu elää kartan päällä ja sen kuplapino on ruudun
   *     alalaidassa — linssissä molemmat on piilotettu, ja piilotuksen
   *     purkaminen toisi takaisin myös kuplat ja kasvokankaan;
   *   • minipulu ei tee mallikutsuja eikä kuplia: se on pelkkä hahmo,
   *     jonka kutsuja sijoittaa (docs/moduulit/minipulu.md);
   *   • kysymykset ovat ESIKIRJOITETTUJA (js/linssit/astronaut-
   *     kysymykset.js) — vastaus tulee aineistosta, ei mallilta.
   *
   * PAIKKA ON RUUDUN KULMA, EI KUVAN: sama sääntö kuin selitteellä ja
   * pienoiskuvilla (omistaja 16.9.2026). Pienoiskuvat ovat vasemmassa
   * alakulmassa ja niiden nauha on enintään puolet leveydestä
   * (css/satelliitti.css), joten kulmat eivät voi leikata toisiaan.
   */
  const pulukulma = html('div', `${L}-pulukulma`);
  // Pohjan omat tyylit (luokka 'tk'): teema kulmaan, tyylit kerran (css/pohjat/pulu.css). Satelliitilla oma nahka.
  if (L === 'tk') { pohjatLataaTyyli(); pulukulma.classList.add(`tk-teema-${teema}`); }
  const pulunappi = html('button', `${L}-pulunappi`);
  pulunappi.type = 'button';
  pulunappi.title = 'Kysy pululta';
  pulunappi.setAttribute('aria-label', `Kysy pululta: ${aihe}`);
  pulunappi.setAttribute('aria-expanded', 'false');
  let minipulu = null;
  try {
    minipulu = luoMinipulu(pulunappi, { koko: 'auto', suunta: 'vasen' });
  } catch {
    /*
     * Minipulu on hahmo, ei toiminto: jos SVG-koneisto ei ole
     * käytettävissä (riisuttu ympäristö), nappi jää tyhjäksi eikä
     * valokuvanäkymä kaadu sen mukana.
     */
  }

  /*
   * ── PULUN NORMAALI CHATTI, MINIPULUN KOKOISENA ───────────────────
   *
   * OMISTAJA 16.9.2026 klo 18.35 UTC (iPhone-kuva Issaouanen
   * hiekkamerestä, Raamattu LISÄYS 10, kohta 29), sanatarkasti:
   * *"Pulun chatti pitäisi toimia normaalisti vaikka itse pulu olisi
   * pienemmän kokoinen."*
   *
   * TÄMÄ KUMOAA AIEMMAN "VAIN KAKSI ESIKIRJOITETTUA KYSYMYSTÄ"
   * -KORTIN. Kortti osasi vastata vain kahteen kysymykseen eikä
   * ottanut vastaan pelaajan omia — pulu näytti tyhmemmältä pienenä
   * kuin isona, ja juuri sen omistaja huomasi.
   *
   * KOLME OSAA, SAMASSA JÄRJESTYKSESSÄ KUIN KARTAN CHATISSA:
   *
   *   • EHDOTUSPILLERIT (kohteen kaksi valmista kysymystä, js/linssit/
   *     astronaut-kysymykset.js) chatin alussa. Näiden napautus vastaa
   *     ESIKIRJOITETULLA tekstillä ILMAN MALLIKUTSUA: vastaus on jo
   *     olemassa ja lähteistetty, joten kutsu maksaisi ja antaisi
   *     huonomman vastauksen. Sama sääntö kuin ennenkin.
   *   • VIRTA: pelaajan kysymykset ja pulun kuplat allekkain.
   *   • VAPAA KYSYMYSKENTTÄ, joka menee SAMAA REITTIÄ kuin kartan
   *     pulu (js/pollo.js polloUlkoinenKysymys → Pollo.kysyUlkoisesti):
   *     sama palvelin, sama konteksti, sama historia, sama striimi ja
   *     samat rajoitukset (yksi pyyntö kerrallaan, pulu pitää olla
   *     löydetty).
   *
   * MIKSI KUPLA PIIRRETÄÄN TÄHÄN EIKÄ `polloLinssikupla`lla: pelin
   * paneeli ja kuplapino ovat linssin ajan `visibility: hidden`
   * (KRIITTINEN_TYYLI), joten sitä kautta tullut vastaus EI NÄKYISI.
   * Kupla kiinnittyy siis MINIPULUUN — kortti kasvaa hahmon yläpuolelle
   * samassa kulmassa, kuten omistaja pyysi.
   */
  const pulukortti = html('div', `${L}-pulukortti`);
  pulukortti.setAttribute('role', 'dialog');
  pulukortti.setAttribute('aria-label', `Kysy pululta: ${aihe}`);
  pulukortti.hidden = true;
  // Nimilappuvitsi arvonimineen (js/ui-apurit.js polloNimilappu,
  // Raamattu VIISAAN POLLON ARVONIMET).
  const pulunOtsikko = polloNimilappu(html('div', `${L}-pulu-otsikko`), {
    ennen: 'Kysy ', yli: 'viisaalta pöllöltä', tilalle: 'pululta', jalkeen: ':', arvonimi: true,
  });
  const pulunSulku = nappi(`${L}-pulu-sulku`, '×', 'Sulje kysymykset');
  const pulunYlarivi = html('div', `${L}-pulu-ylarivi`);
  pulunYlarivi.append(pulunOtsikko, pulunSulku);
  const pulunRivi = html('div', `${L}-pulu-kysymykset`);
  pulunRivi.setAttribute('role', 'group');
  const pulunVirta = html('div', `${L}-pulu-virta`);
  pulunVirta.setAttribute('role', 'log');
  pulunVirta.setAttribute('aria-live', 'polite');
  const pulunSyote = html('form', `${L}-pulu-syote`);
  const pulunKentta = html('input', `${L}-pulu-kentta`);
  pulunKentta.type = 'text';
  pulunKentta.maxLength = 300;
  pulunKentta.placeholder = 'Kysy mitä tahansa…';
  pulunKentta.setAttribute('aria-label', `Kysy pululta kohteesta ${aihe}`);
  pulunKentta.autocomplete = 'off';
  const pulunLaheta = nappi(`${L}-pulu-laheta`, '↑', 'Lähetä kysymys');
  pulunLaheta.type = 'submit';
  pulunSyote.append(pulunKentta, pulunLaheta);
  /*
   * VALMIIT KYSYMYKSET OVAT OSA KESKUSTELUVIRTAA (Raamattu PAATOKSET 53,
   * omistaja 19.9.2026: "nuo valmiit kysymykset pitäisi scrollautua pois
   * kuten normaalistikin pululla"). Rivi on virran ensimmäinen lapsi, ja
   * kun vastaus tulee, virta vierii alas ja kysymykset liukuvat ylös pois
   * näkyvistä — kuten pelin omassa pulussa.
   */
  pulunVirta.appendChild(pulunRivi);
  pulukortti.append(pulunYlarivi, pulunVirta, pulunSyote);

  /**
   * Yksi kupla virtaan.
   *
   * TEKSTINÄ, EI innerHTML:nä (astronaut-kysymykset.js:n ohje eikä
   * mallin vastauskaan saa tuoda merkkausta ruudulle).
   *
   * @param {'oma'|'pulu'} laji kuka puhuu.
   * @param {string} teksti kuplan sisältö.
   * @returns {HTMLElement} kupla, jota striimi voi päivittää.
   */
  /**
   * Virta siihen kohtaan, jossa vastauskuplan yläreuna on ylimpänä.
   *
   * ETÄISYYS MITATAAN LAATIKOISTA, EI offsetTopista: kuplan
   * offsetParent ei ole virta (kortti on flex-sarake), joten
   * offsetTop-erotus antoi väärän kohdan kapealla ruudulla.
   *
   * TYHJÄ TILA KUPLAN ALLE: selain ei vieritä pohjaa pidemmälle, joten
   * lyhyt kupla ei mahtuisi ylimmäksi ilman apua — virta jäisi
   * "ankkuroimatta" ja jokainen tekstipala vierittäisi sitä vähän lisää,
   * eli juuri se jatkuva rullaus, josta omistaja huomautti (puhelimella
   * virta on vain 240 px). Siksi virran pohjaan lisätään näkymän
   * korkuinen tyhjä tila ENNEN ankkurointia: kupla nousee ylimmäksi
   * kerralla, ja kasvava teksti täyttää tyhjän tilan alta. Kun vastaus
   * on valmis, tila kutistetaan siihen mitä ankkurin pitäminen vaatii
   * (`vapautaTila`).
   *
   * TILA ON OMA ELEMENTTI, EI padding-bottom: vieritysalueen padding
   * flex-sarakkeessa on ollut WebKitissä epäluotettava, ja iPad on
   * pelin päälaite.
   */
  const pulunTila = html('div', `${L}-pulu-tila`);
  pulunTila.setAttribute('aria-hidden', 'true');
  const ankkuroiVastaukseen = (kupla) => {
    if (!kupla?.isConnected) return;
    pulunTila.style.height = `${pulunVirta.clientHeight}px`;
    pulunVirta.appendChild(pulunTila);
    const ero = kupla.getBoundingClientRect().top - pulunVirta.getBoundingClientRect().top;
    if (Math.abs(ero) > 1) pulunVirta.scrollTop += ero;
  };
  /**
   * Kutistaa tyhjän tilan kuplan alla pienimpään, jolla kuplan alku
   * pysyy yhä ylimpänä (selain rajaa scrollTopin pohjaan — jos tilaa
   * jäisi liian vähän, virta hyppäisi). Kuplaa pidempi vastaus ei
   * tarvitse tilaa lainkaan.
   */
  const vapautaTila = (kupla) => {
    if (!kupla?.isConnected) { pulunTila.remove(); return; }
    const nakyva = pulunVirta.clientHeight;
    const kuplanKorkeus = kupla.getBoundingClientRect().height;
    const tarve = Math.max(0, Math.ceil(nakyva - kuplanKorkeus));
    if (tarve > 0) pulunTila.style.height = `${tarve}px`;
    else pulunTila.remove();
  };

  const lisaaKupla = (laji, teksti) => {
    const kupla = html('div', laji === 'oma' ? `${L}-pulu-oma` : `${L}-pulu-vastaus`);
    if (laji !== 'oma') kupla.setAttribute('role', 'status');
    kupla.replaceChildren(document.createTextNode(String(teksti ?? '')));
    /*
     * VAIN TUOREIN PULUN KUPLA ON `.satelliitti-pulu-vastaus`in
     * viimeinen: vanhat jäävät virtaan luettaviksi, eikä chatti nollaa
     * keskustelua joka kysymyksen kohdalla.
     */
    pulunVirta.appendChild(kupla);
    /*
     * ── VASTAUS LUETAAN ALUSTA (omistaja 20.9.2026 klo 14.30) ──────
     *
     * Ennen jokainen pala vieritti virran pohjaan, joten kasvava
     * vastaus juoksi pelaajan silmien alta pois ja luettavaksi jäi
     * vain viimeinen rivi. Nyt virta kelataan KERRAN niin, että uuden
     * kuplan YLÄREUNA on näkyvissä, ja sen jälkeen näkymään ei kosketa:
     * teksti kasvaa alaspäin piiloon, ja pelaaja vierittää itse kun
     * ehtii. Sama reunaehto kuin paneelin vastauksella (js/pollo.js:
     * vastaus ei koskaan rullaa itsestään).
     *
     * Oma kysymys kelataan yhä pohjaan: pelaaja kirjoitti sen juuri,
     * eikä sen alkuun tarvitse palata.
     */
    if (laji === 'oma') {
      // Edellisen vastauksen tyhjä tila pois, jotta pohja on aito pohja.
      pulunTila.remove();
      pulunVirta.scrollTop = pulunVirta.scrollHeight;
      pulukortti.scrollTop = pulukortti.scrollHeight;
    } else {
      ankkuroiVastaukseen(kupla);
    }
    return kupla;
  };

  /*
   * EHDOTUS MENEE SAMAAN MALLIREITTIIN KUIN VAPAA KYSYMYS (omistaja
   * 17.9.2026, Raamattu ASTRONAUTIN KAMERA LISAYS 14: "ainoastaan
   * kysymykset ovat etukäteen mietittyjä, mutta vastaukset haetaan
   * samalla tapaa kuin muissakin pelin kohdissa"). Esikirjoitettuja
   * vastauksia ei enää näytetä. Pilleri merkitään valituksi ja teksti
   * annetaan lahetaKysymys-funktiolle, joka on määritelty alempana.
   */
  const vastaaKysymykseen = (kysymys, painike) => {
    for (const b of pulunRivi.querySelectorAll('button')) {
      b.classList.toggle('valittu', b === painike);
      b.setAttribute('aria-pressed', b === painike ? 'true' : 'false');
    }
    lahetaKysymys(kysymys);
  };

  for (const kysymys of kysymykset) {
    const b = html('button', `${L}-pulu-kysymys`, kysymys);
    b.type = 'button';
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', (e) => { e.stopPropagation(); vastaaKysymykseen(kysymys, b); });
    pulunRivi.appendChild(b);
  }

  /*
   * ── VAPAA KYSYMYS MENEE PELIN OMAA REITTIÄ ───────────────────────
   *
   * Kysymys on PELAAJAN ÄÄNTÄ (Raamattu, PULUN KARAKTÄÄRI koskee
   * vastausta): tänne ei kirjoiteta repliikkiä pulun suuhun. Vastaus
   * striimataan kuplaan palasittain, aivan kuten paneelissa, ja
   * epäonnistuminen näkyy yhtenä siistinä rivinä — ei konsolissa.
   */
  let kysymysKesken = false;
  const lahetaKysymys = async (raaka) => {
    const teksti = String(raaka ?? '').replace(/\s+/g, ' ').trim();
    if (!teksti || kysymysKesken) return;
    kysymysKesken = true;
    // Leijunta tauolle, kun pulu puhuu (PAATOKSET 53, css/satelliitti.css).
    pulukulma.classList.add(`${L}-pulu-puhuu`);
    pulunKentta.value = '';
    pulunLaheta.disabled = true;
    lisaaKupla('oma', teksti);
    const kupla = lisaaKupla('pulu', '…');
    kupla.classList.add(`${L}-pulu-odottaa`);
    try { minipulu?.reagoi?.(); } catch { /* liikkeenvähennys tai purettu hahmo */ }
    try {
      const vastaus = await polloUlkoinenKysymys(teksti, {
        onPala: (kertynyt) => {
          if (!kupla.isConnected) return;
          kupla.classList.remove(`${L}-pulu-odottaa`);
          // Näkymään EI kosketa: alku on ankkuroitu kuplan syntyessä ja
          // teksti kasvaa alaspäin tyhjään tilaan (ks. ankkuroiVastaukseen).
          kupla.replaceChildren(document.createTextNode(kertynyt));
        },
      });
      if (kupla.isConnected) {
        kupla.classList.remove(`${L}-pulu-odottaa`);
        kupla.replaceChildren(document.createTextNode(vastaus));
      }
      try { minipulu?.reagoi?.(); } catch { /* liikkeenvähennys tai purettu hahmo */ }
    } catch (virhe) {
      if (kupla.isConnected) {
        kupla.classList.remove(`${L}-pulu-odottaa`);
        kupla.replaceChildren(document.createTextNode(
          virhe?.message === 'kesken'
            ? 'Pulu vastaa vielä edelliseen. Hetki vain.'
            : 'Pulu ei saanut kysymyksestä kiinni. Yritä hetken päästä uudelleen.',
        ));
      }
    } finally {
      kysymysKesken = false;
      pulukulma.classList.remove(`${L}-pulu-puhuu`);
      pulunLaheta.disabled = false;
      // Valmis vastaus ei hyppää pohjaan: pelaaja voi olla vasta
      // ensimmäisellä rivillä. Ylimääräinen tyhjä tila kuplan alta pois.
      vapautaTila(kupla);
    }
  };
  pulunSyote.addEventListener('submit', (e) => { e.preventDefault(); e.stopPropagation(); lahetaKysymys(pulunKentta.value); });
  /* Kuvan eleet (zoom, panorointi, selitteen kelaus) eivät kuulu chattiin. */
  for (const laji of ['click', 'pointerdown', 'wheel', 'keydown']) {
    pulukortti.addEventListener(laji, (e) => e.stopPropagation());
  }

  /** Chatti auki/kiinni. Kohteen vaihto sulkee koko näkymän. */
  const naytaPulukortti = (auki) => {
    pulukortti.hidden = !auki;
    pulunappi.setAttribute('aria-expanded', auki ? 'true' : 'false');
    if (!auki) return;
    try { minipulu?.katso?.('vasen'); } catch { /* purettu hahmo */ }
  };
  pulunappi.addEventListener('click', (e) => {
    e.stopPropagation();
    naytaPulukortti(Boolean(pulukortti.hidden));
  });
  pulunSulku.addEventListener('click', (e) => { e.stopPropagation(); naytaPulukortti(false); });
  // Pohjan sulku (tyylikirja PULU: Pulun napautus, ohinapautus, Esc, ei ✕): uusilla pinnoilla × on piilossa
  // (css/pohjat/pulu.css) ja kortin ulkopuolinen napautus sulkee sen. Satelliitin oma × säilyy ennallaan.
  const ohi = (e) => {
    if (pulukortti.hidden || pulukortti.contains(e.target) || pulunappi.contains(e.target)) return;
    naytaPulukortti(false);
  };
  if (L === 'tk') document.addEventListener('pointerdown', ohi, true);
  pulukulma.append(pulukortti, pulunappi);

  return {
    kulma: pulukulma,
    kortti: pulukortti,
    nappi: pulunappi,
    get minipulu() { return minipulu; },
    nayta: naytaPulukortti,
    kysy: lahetaKysymys,
    /** Minipulu pitää yllä rAF-silmukkaa ja kuuntelijoita: purettava näkymän mukana (docs/moduulit/minipulu.md). */
    tuhoa() {
      document.removeEventListener('pointerdown', ohi, true);
      try { minipulu?.tuhoa?.(); } catch { /* jo purettu */ }
      minipulu = null;
    },
  };
}
