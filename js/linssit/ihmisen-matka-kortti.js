/*
 * IHMISEN MATKA — YKSI NOSTOMALLI: KORTTI (omistaja 7.9.2026 ilta,
 * Raamattu "IHMISEN MATKA: YKSI PALKKI, EI KARUSELLIA, KAIKKIIN
 * NOSTOIHIN KUVA, LINSSI MUISTAA PAIKKANSA", sanatarkasti: *"Kaikissa
 * nostoissa saisi olla vähintään yksi kuva … Kartalla saisi olla
 * mahdollisimman monta klikattavaa kohtaa, mistä näkyy kuva ja
 * lisätietoja. … Paras olisi, jos kaikki nostot olisivat suurin piirtein
 * samanlaisia. Toiset tietenkin voivat olla laajempia ja toiset
 * pienempiä."*).
 *
 * Löytöpaikat (kaaren 20 pysäkkiä) ja lisänostot (20) avautuvat SAMALLE
 * KORTILLE: ajoitus, otsikko, paikka, kuva-alue, 2–3 lausetta, lähde,
 * valmiit kysymykset pululle ja "Lue lisää" niillä, joilla on
 * Tiedeliitteen juttu. Kortti on kartan päällä kelluva lappu, joka
 * aukeaa sekä esityksen aikana (kartan kuvasta tai lampusta — esitys
 * pysähtyy tauolle ja jatkuu, kun kortti suljetaan) että
 * tutkimusvaiheessa (hehkuvasta nostosta).
 *
 * ── MIKSI OMA TIEDOSTO ────────────────────────────────────────────
 *
 * Kortti oli tutkimusvaiheen osa (js/linssit/ihmisen-matka-tutkimus.js),
 * mutta omistajan linjaus avaa sen myös kesken esityksen — ja esitys ei
 * saa tietää tutkimusvaiheesta mitään (raja on yksi kutsu). Kortti on
 * siksi kolmas, kummastakin riippumaton osa: aikajanamoottori luo sen
 * kertomuskaarelle linssin auetessa (`ui.nostokortti`), esitys avaa sen
 * lampusta ja kuvasta, tutkimusvaihe hehkusta. Kaikki kolme näkevät
 * saman kortin ja saman nostolistan.
 *
 * ── KUVA-ALUE: AINA VÄHINTÄÄN YKSI ────────────────────────────────
 *
 * Löytöpaikalla on havainnekuva ja esinekuva (kuvaputki toimitti
 * molemmat 7.9.2026). Lisänoston kuvituskuva haetaan ämpäristä polusta
 * aikajana/ihmisen-matka/nosto/<tunnus>.jpg — kuvat ovat TULOSSA
 * kuvaputkelta, joten kunnes ne ovat perillä, kuva-alueella on siisti
 * VARAPAIKKA: vanan sävyinen kehys ja ajoitus. EI tekstilaattaa
 * nimikirjaimin (omistajan aiempi havainto keksintökaaren "EI"/"SY"-
 * laatoista). Aito kuva (`kuvaAito`, valinnainen kenttä molemmilla
 * nostolajeilla) näytetään kuvituskuvan rinnalla, kun se on.
 *
 * ── MITÄ TÄSTÄ EI LÖYDY ───────────────────────────────────────────
 *
 * Pulun repliikki ("Kartta on sinun…") on kaanonia ja kuuluu
 * kertomusmoottorille; tämä ei avaa kuplia. Tiedeliite avataan
 * moottorin kautta (`ajo.avaaNostonJuttu`), koska musiikin vaimennus ja
 * lehden sulkeutumisen jälkeinen palautus ovat moottorin omia.
 */

import * as data from './ihmisen-matka-data.js';
import { IHMISEN_MATKA_VIRRAT } from './ihmisen-matka-virrat.js';
import { polloUlkoinenKysymys } from '../pollo.js';
import { haeIhmisenMatkanKysymykset, haeIhmisenMatkanVastaus } from './ihmisen-matka-kysymykset.js';
import { kuvatekstiLyhyt } from '../kuvatekstit.js';
import { polloNimilappu } from '../ui-apurit.js';
import { kortinKuvalahde } from '../tekijakortti.js';

/*
 * LYHYT KORTILLA (js/kuvatekstit.js, omistaja 9.9.2026). Ihmisen matkan
 * ilmiökuvissa nimet ovat toisin päin kuin muualla pelissä: `kuvateksti`
 * on se lyhyt yhden rivin teksti ja `selite` pitkä kertova versio. Yhteinen
 * apuri pitäisi `selitettä` lyhyenä, joten kentät normalisoidaan sille —
 * uusi `lyhyt` voittaa yhä, ja ilman sitä kortti näyttää täsmälleen saman
 * tekstin kuin ennen.
 */
const ilmionLyhyt = (kuva) => kuvatekstiLyhyt({ lyhyt: kuva?.lyhyt ?? kuva?.kuvateksti });

/**
 * Lisänostojen kuvituskuvat ämpärissä: <juuri>/nosto/<tunnus>.jpg.
 * IHMISEN_MATKA_KUVAJUURI on R2-juuren `aikajana/ihmisen-matka`.
 */
export const NOSTOKUVAN_JUURI = `${data.IHMISEN_MATKA_KUVAJUURI ?? ''}/nosto`;

export function nostokuvanOsoite(tunnus) {
  return tunnus ? `${NOSTOKUVAN_JUURI}/${tunnus}.jpg` : null;
}

/** Body-luokka: chatin portti aukeaa kortin ajaksi (js/ui-apurit.js). */
export const KORTIN_LUOKKA = 'aikajana-nostokortti-auki';

/* ==================== APURIT ==================== */

function solmu(tag, luokka, teksti) {
  const e = document.createElement(tag);
  if (luokka) e.className = luokka;
  if (teksti != null) e.textContent = teksti;
  return e;
}

/** Pituusaste [-180, 180]. */
export function kierraLon(lon) {
  let v = lon;
  while (v > 180) v -= 360;
  while (v < -180) v += 360;
  return v;
}

/** Heksaväri → "r, g, b" css-muuttujaan (sävytys ja hehku). */
export function heksaRgb(heksa, oletus = '212, 175, 90') {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(heksa ?? '').trim());
  if (!m) return oletus;
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/** Isoympyräetäisyys asteina. */
export function kulmaEro(aLat, aLon, bLat, bLon) {
  const RAD = Math.PI / 180;
  const f1 = aLat * RAD;
  const f2 = bLat * RAD;
  let dl = kierraLon(bLon - aLon) * RAD;
  if (!Number.isFinite(dl)) dl = 0;
  const k = Math.sin(f1) * Math.sin(f2) + Math.cos(f1) * Math.cos(f2) * Math.cos(dl);
  return Math.acos(Math.max(-1, Math.min(1, k))) / RAD;
}

/**
 * Noston virta: datan oma kenttä, tai lähin vanan kärki.
 *
 * Löytöpaikoilla (kaaren 20 pysäkkiä) kenttää ei ole — ne ovat
 * todisteita, eivät virran osia — joten sävy haetaan kartalta: mihin
 * vanaan piste on lähinnä, sen väriin se hehkuu. Kärkikohtainen
 * `virrat` ratkaisee, koska selkäranka vaihtaa väriä matkalla.
 */
export function nostonVirta(nosto, vanat = []) {
  if (nosto?.virta) return nosto.virta;
  let paras = null;
  let parasEro = Infinity;
  for (const vana of vanat) {
    const pisteet = vana?.pisteet ?? [];
    for (let k = 0; k < pisteet.length; k += 1) {
      const [lat, lon] = pisteet[k];
      const ero = kulmaEro(nosto.lat, nosto.lon, lat, lon);
      if (ero < parasEro) {
        parasEro = ero;
        paras = vana.virrat?.[k] ?? vana.virta;
      }
    }
  }
  return paras;
}

/** Tuhaterotin välilyönnillä, joka ei katkea riviltä ("230 000"). */
export function ryhmitaLuku(n) {
  const kokonainen = Math.round(Math.abs(Number(n) || 0));
  return String(kokonainen).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * Ajoitus LYHYENÄ sisällysluetteloon ja varakuvaan: "230 000 v.",
 * "800 v.". Pitkät ajoitukset ("vähintään noin 230 000 vuotta sitten")
 * menivät Tiedeliitteen sisällyksessä päällekkäin (omistaja 7.9.2026).
 * Ilman lukua palautetaan sanallinen ajoitus sellaisenaan.
 */
export function lyhytAjoitus(nosto) {
  const v = Number(nosto?.vuosiaSitten);
  if (Number.isFinite(v) && v > 0) return `${ryhmitaLuku(v)}\u00a0v.`;
  return nosto?.ajoitus ?? '';
}

/** Kuvatieto → osoite (kenttä voi olla olio tai pelkkä merkkijono). */
function kuvanOsoite(k) {
  if (!k) return null;
  if (typeof k === 'string') return k;
  return k.osoite ?? null;
}

/**
 * Tutkimusvaiheen ja esityksen nostot yhtenä listana: kaaren
 * löytöpaikat ensin, lisänostot perään.
 *
 * LÖYTÖPAIKAN KORTTITEKSTI ON `loyto` eikä `juttu`: kortti on kartan
 * päällä kelluva lappu, ja koko juttu (kaksi kappaletta) kuuluu
 * Tiedeliitteeseen ("Lue lisää"). `loyto` kertoo juuri sen, mitä pelaaja
 * tässä kysyy — kuka löysi, mistä ja milloin. Selite on varana.
 *
 * @param {object[]} tapahtumat moottorin pysäkit (ihmisenMatkanPysakit,
 *   moottorin järjestyksessä — `indeksi` on Tiedeliitteen sivun avain)
 * @param {object[]} lisat IHMISEN_MATKA_LISANOSTOT
 */
export function kokoaNostot(tapahtumat = [], lisat = []) {
  const nostot = [];
  tapahtumat.forEach((t, indeksi) => {
    if (!Number.isFinite(t?.lat) || !Number.isFinite(t?.lon)) return;
    nostot.push({
      tunnus: t.tunnus,
      laji: 'loytopaikka',
      indeksi,
      otsikko: t.otsikko,
      paikka: t.paikka ?? null,
      maa: t.maa ?? null,
      ajoitus: t.ajoitus,
      vuosiaSitten: t.vuosiaSitten,
      lat: t.lat,
      lon: t.lon,
      teksti: t.loyto ?? t.selite ?? '',
      // ihmisenMatkanPysakit siirsi havainnekuvan `ilmio`-kenttään ja
      // löytökuvan `kuva`-kenttään; alkuperäinen `esine` on tallella.
      kuva: kuvanOsoite(t.ilmio) ?? null,
      kuvaSelite: ilmionLyhyt(t.ilmio) || t.otsikko || null,
      esine: kuvanOsoite(t.esine) ?? null,
      esineSelite: kuvatekstiLyhyt(t.esine) || null,
      kuvaAito: kuvanOsoite(t.kuvaAito) ?? null,
      kuvaAitoSelite: kuvatekstiLyhyt(t.kuvaAito) || null,
      kuvaAitoTiedot: t.kuvaAito && typeof t.kuvaAito === 'object' ? t.kuvaAito : null,
      lahde: t.lahde ?? null,
      virta: null,
      juttu: Boolean(t.juttu),
      kysymykset: t.kysymykset ?? [],
    });
  });
  for (const l of lisat) {
    if (!Number.isFinite(l?.lat) || !Number.isFinite(l?.lon)) continue;
    nostot.push({
      tunnus: l.tunnus,
      laji: 'lisanosto',
      indeksi: -1,
      otsikko: l.otsikko,
      paikka: l.paikka ?? null,
      maa: l.maa ?? null,
      ajoitus: l.ajoitus,
      vuosiaSitten: l.vuosiaSitten,
      lat: l.lat,
      lon: l.lon,
      teksti: l.teksti ?? '',
      // Kuvituskuva kuvaputkelta (tulossa): kunnes se on ämpärissä,
      // kortti näyttää varapaikan (luoNostokortti).
      kuva: kuvanOsoite(l.kuva) ?? nostokuvanOsoite(l.tunnus),
      kuvaSelite: ilmionLyhyt(l.kuva) || l.otsikko || null,
      esine: null,
      esineSelite: null,
      kuvaAito: kuvanOsoite(l.kuvaAito) ?? null,
      kuvaAitoSelite: kuvatekstiLyhyt(l.kuvaAito) || null,
      kuvaAitoTiedot: l.kuvaAito && typeof l.kuvaAito === 'object' ? l.kuvaAito : null,
      lahde: l.lahde ?? null,
      virta: l.virta ?? null,
      juttu: false,
      kysymykset: l.kysymykset ?? [],
    });
  }
  return nostot;
}

/** Kysymyksen konteksti pululle: noston teksti ja lähde. */
export function nostonKonteksti(nosto) {
  const osat = [nosto.otsikko, nosto.ajoitus].filter(Boolean).join(', ');
  const lahde = nosto.lahde ? ` (Lähde: ${nosto.lahde}.)` : '';
  const paikka = nosto.paikka ? `${nosto.paikka}${nosto.maa ? `, ${nosto.maa}` : ''}. ` : '';
  return {
    nimi: `${nosto.otsikko}${nosto.ajoitus ? ` — ${nosto.ajoitus}` : ''}`,
    tyyppi: 'Ihmisen matka -linssin nosto',
    teksti: `${osat}. ${paikka}${nosto.teksti}${lahde}`,
  };
}

/* ==================== KORTTI ==================== */

/**
 * Yksi kortti koko linssin ajaksi.
 *
 * @param {{ ajo: object, ui: object, linssi?: object, koti?: Element }} asetukset
 * @returns {object|null} { avaa, sulje, auki, nostot, virta, vari, tila, pura, el }
 */
export function luoNostokortti({ ajo, ui, linssi = null, koti = null }) {
  if (typeof document === 'undefined' || !ajo || !ui) return null;
  const pesa = koti ?? ui.mapPane ?? null;
  if (!pesa) return null;

  const nostot = kokoaNostot(ajo.tapahtumat ?? [], data.IHMISEN_MATKA_LISANOSTOT ?? []);
  const varit = new Map(IHMISEN_MATKA_VIRRAT.map((v) => [v.tunnus, v.vari]));
  /** Vanojen kärkilistat (sävytys) luetaan vasta kun virrat on laskettu. */
  let vanat = null;
  const vananPisteet = () => {
    if (vanat?.length) return vanat;
    vanat = ajo.virrat?.vanat?.()?.pisteet?.() ?? null;
    return vanat ?? [];
  };
  const virtaCache = new Map();
  const virta = (tunnus) => {
    const nosto = nostot.find((n) => n.tunnus === tunnus);
    if (!nosto) return null;
    if (nosto.virta) return nosto.virta;
    if (virtaCache.has(tunnus)) return virtaCache.get(tunnus);
    const pisteet = vananPisteet();
    const v = nostonVirta(nosto, pisteet);
    // Välimuistiin vasta kun vanat olivat käytettävissä: tyhjä tulos
    // ennen laskennan valmistumista ei saa jäädä pysyväksi.
    if (pisteet.length) virtaCache.set(tunnus, v);
    return v;
  };
  const vari = (tunnus) => varit.get(virta(tunnus))?.rintama ?? null;

  const kortti = solmu('div', 'ihmisen-nostokortti');
  kortti.hidden = true;
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-label', 'Nosto');
  pesa.appendChild(kortti);

  const tila = { auki: null, kysymyksia: 0, avattu: 0, pysaytin: false };

  const tallenna = () => ajo.tallennaMuisti?.();
  /** Auki olevan pulupaneelin tarjonta nykyiseen paikkaan (js/pollo.js tarkistaKonteksti). */
  const paivitaPulu = () => {
    try { globalThis.matkakirjaPollo?.tarkistaKonteksti?.(); } catch { /* pulu ei ole pelissä */ }
  };

  function sulje() {
    if (tila.auki === null && kortti.hidden) return;
    tila.auki = null;
    kortti.hidden = true;
    kortti.classList.remove('esilla');
    kortti.replaceChildren();
    document.body.classList.remove(KORTIN_LUOKKA);
    if (ui.fokuskohdeAuki?.linssinosto) ui.fokuskohdeAuki = null;
    paivitaPulu();
    /*
     * ESITYS JATKUU SULUSTA (omistaja: kortti aukeaa myös esityksen
     * aikana; esitys pysähtyy tauolle ja jatkuu sulusta). Jatketaan vain
     * jos juuri tämä kortti pysäytti sen — pelaajan oma Tauko pysyy.
     */
    if (tila.pysaytin) {
      tila.pysaytin = false;
      ajo.esitys?.jatka?.();
    }
    tallenna();
  }

  /**
   * Kuva-alueen yksi kehys. Puuttuva kuva (404 — kuvaputken erä on
   * vielä tulossa) vaihtuu VARAPAIKKAAN: vanan sävyinen kehys ja
   * ajoitus, ei tekstilaattaa nimikirjaimin. Kun noston aito kuva on
   * paikalla, tulossa olevan havainnekuvan 404 EI jätä varapaikkaa
   * aidon kuvan viereen (`ilmanVaraa`): kehys poistuu hiljaa.
   *
   * `kuvaTiedot` (aidon kuvan olio) tuo kuvan alle lähderivin —
   * tekijä ja lisenssi, CC BY/BY-SA vaatii maininnan siellä missä
   * kuva näkyy (js/tekijakortti.js taytaLahderivi).
   */
  function kuvakehys(nosto, osoite, selite, luokka, { kuvaTiedot = null, ilmanVaraa = false } = {}) {
    const kehys = solmu('figure', `ihmisen-nostokortti-kuvakehys ${luokka}`);
    kehys.style.setProperty('--nosto-savy', heksaRgb(vari(nosto.tunnus)));
    const kuva = document.createElement('img');
    kuva.className = 'ihmisen-nostokortti-kuva';
    kuva.loading = 'lazy';
    kuva.decoding = 'async';
    kuva.alt = selite ?? '';
    kuva.addEventListener('error', () => {
      if (ilmanVaraa) { kehys.remove(); return; }
      kuva.remove();
      kehys.classList.add('vara');
      const vara = solmu('div', 'ihmisen-nostokortti-varakuva');
      vara.setAttribute('aria-hidden', 'true');
      vara.append(
        solmu('span', 'ihmisen-nostokortti-varakuva-pilkku'),
        solmu('span', 'ihmisen-nostokortti-varakuva-ajoitus', lyhytAjoitus(nosto)),
      );
      kehys.prepend(vara);
    });
    kuva.src = osoite;
    kehys.appendChild(kuva);
    if (selite) kehys.appendChild(solmu('figcaption', 'ihmisen-nostokortti-kuvateksti', selite));
    if (kuvaTiedot?.lahde) {
      /*
       * LÄHDE VAIN SUURENNOKSESSA (omistaja 19.9.2026 klo 19.04): kortin
       * kuvan alla on vain lyhyt kuvateksti, ja kuvan napautus avaa saman
       * suurennoksen kuin kartan kohdekortti (js/fokuskohteet.js
       * avaaKohdeSuurennos), jossa tekijä ja lisenssi näkyvät — CC BY
       * vaatii maininnan siellä, missä kuva on isoimmillaan.
       */
      kehys.appendChild(kortinKuvalahde(solmu('div', 'ihmisen-nostokortti-kuvalahde'), kuvaTiedot.lahde, kuvaTiedot));
      kehys.classList.add('suurennettava');
      kuva.addEventListener('click', (tapahtuma) => {
        tapahtuma.stopPropagation();
        // Tuonti vasta napautuksella: fokuskohteet.js asentaa dokumentin
        // kuuntelijoita moduulin alustuksessa (testit ajavat tätä Nodessa).
        import('../fokuskohteet.js').then(({ avaaKohdeSuurennos }) => avaaKohdeSuurennos(
          ui, { osoite, lyhyt: selite ?? '', ...kuvaTiedot }, () => kuva, 'ihmisenKuvaZoom',
        ));
      });
    }
    return kehys;
  }

  /**
   * Avaa noston kortin. Toinen napautus samaan nostoon sulkee.
   * Esityksen aikana esitys pysähtyy tauolle (ja jatkuu sulusta).
   */
  function avaa(tunnus) {
    const nosto = nostot.find((n) => n.tunnus === tunnus);
    if (!nosto) return false;
    if (tila.auki === nosto.tunnus) { sulje(); return false; }
    tila.auki = nosto.tunnus;
    tila.avattu += 1;
    kortti.replaceChildren();
    kortti.style.setProperty('--nosto-savy', heksaRgb(vari(nosto.tunnus)));
    kortti.dataset.laji = nosto.laji;

    const sulkunappi = solmu('button', 'ihmisen-nostokortti-sulje', '✕');
    sulkunappi.type = 'button';
    sulkunappi.setAttribute('aria-label', 'Sulje nosto');
    sulkunappi.addEventListener('click', sulje);
    kortti.appendChild(sulkunappi);

    const ajoitus = solmu('div', 'ihmisen-nostokortti-ajoitus');
    ajoitus.append(solmu('span', 'ihmisen-nostokortti-pilkku'), document.createTextNode(nosto.ajoitus ?? ''));
    kortti.appendChild(ajoitus);
    kortti.appendChild(solmu('h2', 'ihmisen-nostokortti-otsikko', nosto.otsikko ?? ''));
    if (nosto.paikka) {
      kortti.appendChild(solmu('div', 'ihmisen-nostokortti-paikka',
        nosto.maa ? `${nosto.paikka} — ${nosto.maa}` : nosto.paikka));
    }

    // KUVA-ALUE: vähintään yksi kehys aina (kuvituskuva tai sen varapaikka).
    const kuvat = solmu('div', 'ihmisen-nostokortti-kuvat');
    if (nosto.kuva) {
      kuvat.appendChild(kuvakehys(nosto, nosto.kuva, nosto.kuvaSelite, 'kuvitus',
        { ilmanVaraa: Boolean(nosto.kuvaAito) }));
    }
    if (nosto.esine) kuvat.appendChild(kuvakehys(nosto, nosto.esine, nosto.esineSelite, 'esine'));
    if (nosto.kuvaAito) {
      kuvat.appendChild(kuvakehys(nosto, nosto.kuvaAito, nosto.kuvaAitoSelite ?? 'Aito kuva', 'aito',
        { kuvaTiedot: nosto.kuvaAitoTiedot }));
    }
    if (!kuvat.childElementCount) {
      // Ei yhtään osoitetta: varapaikka suoraan, sama asu kuin 404:llä.
      const kehys = solmu('figure', 'ihmisen-nostokortti-kuvakehys kuvitus vara');
      kehys.style.setProperty('--nosto-savy', heksaRgb(vari(nosto.tunnus)));
      const vara = solmu('div', 'ihmisen-nostokortti-varakuva');
      vara.setAttribute('aria-hidden', 'true');
      vara.append(
        solmu('span', 'ihmisen-nostokortti-varakuva-pilkku'),
        solmu('span', 'ihmisen-nostokortti-varakuva-ajoitus', lyhytAjoitus(nosto)),
      );
      kehys.appendChild(vara);
      kuvat.appendChild(kehys);
    }
    kortti.appendChild(kuvat);

    kortti.appendChild(solmu('p', 'ihmisen-nostokortti-teksti', nosto.teksti ?? ''));
    if (nosto.lahde) kortti.appendChild(solmu('div', 'ihmisen-nostokortti-lahde', nosto.lahde));

    if (nosto.juttu && typeof ajo.avaaNostonJuttu === 'function') {
      const lue = solmu('button', 'ihmisen-nostokortti-lue', 'Lue lisää');
      lue.type = 'button';
      lue.title = 'Tiedeliite: koko juttu';
      lue.addEventListener('click', () => ajo.avaaNostonJuttu(nosto.indeksi));
      kortti.appendChild(lue);
    }

    /*
     * PÄÄJAKSON KORTILLA ESIKIRJOITETUT KYSYMYKSET (Fablen kiireellinen
     * erä 19.9.2026 klo 19.57; Sonnet 1:n kierros 11, kuva 08): jos
     * jaksolle on valmiit kysymykset vastauksineen
     * (js/linssit/ihmisen-matka-kysymykset.js), kortti näyttää ne.
     * Lisänostolla ja ilman valmiita kortti käyttää noston omia.
     */
    const valmiit = nosto.laji === 'loytopaikka' ? haeIhmisenMatkanKysymykset(nosto.tunnus) : [];
    const kysymykset = (valmiit.length ? valmiit : (nosto.kysymykset ?? [])).filter(Boolean).slice(0, 3);
    if (kysymykset.length) {
      const ryhma = solmu('div', 'ihmisen-nostokortti-kysymykset');
      // Sama nimilappuvitsi arvonimineen kuin kartan korteissa
      // (js/ui-apurit.js polloNimilappu, VIISAAN POLLON ARVONIMET).
      ryhma.appendChild(polloNimilappu(solmu('div', 'ihmisen-nostokortti-kysyotsikko'), {
        ennen: 'Kysy ', yli: 'viisaalta pöllöltä', tilalle: 'pululta', jalkeen: '', arvonimi: true,
      }));
      for (const kysymys of kysymykset) {
        const nappi = solmu('button', 'ihmisen-nostokysymys', kysymys);
        nappi.type = 'button';
        nappi.addEventListener('click', () => kysyPululta(nosto, kysymys, nappi));
        ryhma.appendChild(nappi);
      }
      kortti.appendChild(ryhma);
    }

    kortti.hidden = false;
    // Pakotettu asettelu, jotta liuku lähtee alkuasennosta.
    void kortti.getBoundingClientRect();
    kortti.classList.add('esilla');
    kortti.scrollTop = 0;
    document.body.classList.add(KORTIN_LUOKKA);
    /*
     * KONTEKSTI PULULLE (js/pollo.js avoinKohdetietoruutu): sama kenttä
     * kuin kartan kohdetietoruudulla, joten noston teksti ja lähde
     * kulkevat kysymyksen mukana ilman että pöllö tarvitsee tiedon
     * tästä moduulista. `linssinosto` erottaa oman merkintämme
     * fokuskohteen omasta, jottei purku vie väärää korttia.
     */
    ui.fokuskohdeAuki = { kohde: nostonKonteksti(nosto), popup: kortti, linssinosto: true };
    // Auki oleva pulupaneeli vaihtaa valmiit kysymyksensä tämän noston
    // omiin (js/linssit/ihmisen-matka-pulukysymykset.js).
    paivitaPulu();

    // ESITYS TAUOLLE kortin ajaksi; jatko sulusta (ks. sulje).
    const esitys = ajo.esitys ?? null;
    if (esitys?.tila?.().kaynnissa) {
      esitys.tauko?.();
      tila.pysaytin = true;
    }
    tallenna();
    return true;
  }

  /*
   * VASTAUS KORTTIIN, EI PULUN PANEELIIN (Fablen kiireellinen erä
   * 19.9.2026 klo 19.57). Sonnet 1:n laitetesti v1962 (kierros 11,
   * kuva 08): kortti oli auki aikaselaimen tauolla, jolloin pulu on
   * esityksen ajan piilossa (`aikajana-pulu-piilossa`). `polloKysy`
   * avasi silti pelin pulupaneelin ja kirjoitti vastauksen sinne, joten
   * napautus vain himmensi napin eikä vastausta näkynyt missään
   * (mitattu WebKit 390 px: paneeli `visibility: hidden`, viesti
   * virrassa). Nyt vastaus kirjoitetaan kortin omaan kuplaan kysymysten
   * alle, eikä pelin paneelia avata lainkaan:
   *   • esikirjoitettu vastaus lähteineen, jos jaksolle on sellainen
   *     (ei mallikutsua),
   *   • muuten sama mallireitti kuin Astronautin kameran minipulun
   *     chatissa (polloUlkoinenKysymys, striimi palasina).
   * Kortin ✕ ja Jatka eivät riipu kysymyksestä: kupla on kortin lapsi,
   * ja keskeneräinen striimi kirjoittaa vain, jos kupla on yhä DOMissa.
   */
  let kysymysKesken = false;
  function vastauskupla() {
    let kupla = kortti.querySelector('.ihmisen-nostokortti-vastaus');
    if (!kupla) {
      kupla = solmu('div', 'ihmisen-nostokortti-vastaus');
      kupla.setAttribute('role', 'status');
      kupla.setAttribute('aria-live', 'polite');
      kortti.querySelector('.ihmisen-nostokortti-kysymykset')?.after(kupla);
    }
    return kupla;
  }
  async function kysyPululta(nosto, kysymys, nappi) {
    if (kysymysKesken || nappi.disabled) return;
    ui.fokuskohdeAuki = { kohde: nostonKonteksti(nosto), popup: kortti, linssinosto: true };
    nappi.classList.add('lahetetty');
    nappi.disabled = true;
    tila.kysymyksia += 1;
    const kupla = vastauskupla();
    const valmis = haeIhmisenMatkanVastaus(nosto.tunnus, kysymys);
    if (valmis?.vastaus) {
      kupla.replaceChildren(solmu('p', 'ihmisen-nostokortti-vastausteksti', valmis.vastaus));
      const lahteet = (valmis.lahteet ?? []).filter((l) => /^https:\/\//.test(String(l?.url ?? '')));
      if (lahteet.length) {
        const rivi = solmu('p', 'ihmisen-nostokortti-vastauslahde', 'Lähde: ');
        lahteet.forEach((l, i) => {
          if (i) rivi.appendChild(document.createTextNode(', '));
          const a = solmu('a', '', l.title || l.url);
          a.href = l.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          rivi.appendChild(a);
        });
        kupla.appendChild(rivi);
      }
      return;
    }
    kysymysKesken = true;
    const teksti = solmu('p', 'ihmisen-nostokortti-vastausteksti odottaa', '…');
    kupla.replaceChildren(teksti);
    try {
      const vastaus = await polloUlkoinenKysymys(kysymys, {
        onPala: (kertynyt) => { if (teksti.isConnected) { teksti.classList.remove('odottaa'); teksti.textContent = kertynyt; } },
      });
      if (teksti.isConnected) { teksti.classList.remove('odottaa'); teksti.textContent = vastaus; }
    } catch (virhe) {
      if (teksti.isConnected) {
        teksti.classList.remove('odottaa');
        teksti.textContent = virhe?.message === 'kesken'
          ? 'Pulu vastaa vielä edelliseen. Hetki vain.'
          : 'Pulu ei saanut kysymyksestä kiinni. Yritä hetken päästä uudelleen.';
      }
      nappi.classList.remove('lahetetty');
      nappi.classList.add('ei-lahtenyt');
      nappi.disabled = false;
    } finally {
      kysymysKesken = false;
    }
  }

  return {
    el: kortti,
    nostot,
    avaa,
    sulje,
    auki: () => tila.auki,
    virta,
    vari,
    tila: () => ({
      auki: tila.auki, kysymyksia: tila.kysymyksia, avattu: tila.avattu, nostoja: nostot.length,
    }),
    pura: () => {
      tila.pysaytin = false;
      sulje();
      kortti.remove();
      document.body.classList.remove(KORTIN_LUOKKA);
    },
  };
}
