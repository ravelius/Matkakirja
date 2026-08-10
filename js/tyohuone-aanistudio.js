/*
 * Äänistudio: ehdokkaiden kuuntelu, valinta ja aloituskohdan säätö.
 *
 * Oli aiemmin oma sivunsa (aanet.html) ja upotettiin työhuoneeseen
 * iframellä. Omistajan toive 3.8.2026: "Äänistudiosta voi ottaa
 * erillisen sivun pois. Olisi hyvä, että se pyörisi samoilla
 * sivuilla." Nyt studio on työhuoneen Studio-välilehti, ja tämä
 * moduuli rakentaa sen.
 *
 * Käynnistys on laiska: `kaynnistaAanistudio()` kutsutaan vasta kun
 * välilehti avataan ensi kertaa. Studio rakentaa satoja rivejä DOMia
 * ja lukee kaikki äänipaketit, eikä sitä kannata tehdä joka
 * työhuoneen avauksella.
 */
import { sfx } from './sound.js';
import {
  EHDOKKAAT, kaikkiValinnat, valitseAani, valittuAani, jaaAlku,
  TYYPPI_EHDOKKAAT, TYYPPI_NIMET, KAUPUNGIT_TYYPEITTAIN,
  tyyppiKori, valitseTyyppiKori, puheVoima, asetaPuheVoima,
  KAUPUNKI_LISTA, kaupunkiKori, valitseKaupunkiKori, HUUDAHDUKSET,
} from './aani-ehdokkaat.js';

export function kaynnistaAanistudio() {
  
  // --- pikatestit ---------------------------------------------------------
  const nimet = [
    'quizOpen', 'click', 'paper', 'swipe', 'pen', 'dieTick', 'dieLand', 'step', 'arrive',
    'ferry', 'flight', 'correct', 'wrong', 'hint', 'tick', 'timeout',
    'flip', 'clack', 'star', 'gem', 'horseshoe', 'robber', 'empty',
    'coin', 'stuck', 'turn', 'win',
  ];
  const lista = document.getElementById('lista');
  for (const nimi of nimet) {
    const b = document.createElement('button');
    b.textContent = nimi;
    b.addEventListener('click', () => sfx.play(nimi));
    lista.appendChild(b);
  }
  document.getElementById('lento-alku').addEventListener('click', () => sfx.startFlight());
  document.getElementById('lento-loppu').addEventListener('click', () => sfx.stopFlight());
  
  // --- omat ehdokkaat -----------------------------------------------------
  const OMAT_AVAIN = 'matkakirja-omat-ehdokkaat';
  const omatEhdokkaat = () => {
    try { return JSON.parse(localStorage.getItem(OMAT_AVAIN) ?? '{}'); } catch { return {}; }
  };
  const tallennaOmat = (kaikki) => {
    try { localStorage.setItem(OMAT_AVAIN, JSON.stringify(kaikki)); } catch { /* ei säily */ }
  };
  
  // --- yksi jaettu soitin (yläpalkissa) ----------------------------------
  const soitin = new Audio();
  let soiva = null;   // { slot, url, alku, nimi }
  let edellinen = null;
  // Alkukohtien esitäytöt muistissa: ⌖ täyttää kentän myös riveille,
  // joita ei ole vielä valittu.
  const esitaytot = new Map(); // `${slot}|${url}` -> sekunnit
  const voimaEsitaytot = new Map(); // `${slot}|${url}` -> voimakerroin
  const mika = document.getElementById('soitin-mika');
  const jana = document.getElementById('soitin-jana');
  const aika = document.getElementById('soitin-aika');
  // Esikuuntelun perustaso: rivin voimakerroin kuuluu tämän päälle,
  // joten 1.0× soi mukavalla tasolla ja 3.0× yltää täyteen.
  const PERUSTASO = 0.33;
  const luuppi = document.getElementById('soitin-luuppi');
  // Kokonaistaso = master-liuku × klipin oma voimakerroin.
  const asetaTaso = () => {
    soitin.volume = Math.min(1, PERUSTASO * (soiva?.voima ?? 1));
  };
  asetaTaso();
  luuppi.addEventListener('change', () => { soitin.loop = luuppi.checked; });
  
  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  soitin.addEventListener('timeupdate', () => {
    if (!soitin.duration) return;
    jana.value = (soitin.currentTime / soitin.duration) * 100;
    aika.textContent = `${mmss(soitin.currentTime)} / ${mmss(soitin.duration)}`;
  });
  jana.addEventListener('input', () => {
    if (soitin.duration) soitin.currentTime = (Number(jana.value) / 100) * soitin.duration;
  });
  
  // Voimaliu'un vaikutus kuuluu heti, jos sama ääni soi esikuuntelussa.
  function saadaEsikuunteluVoima(slot, url, arvo) {
    if (soiva && soiva.slot === slot && soiva.url === url) {
      soiva.voima = arvo;
      asetaTaso();
    }
  }
  
  function soita(ehdokas) {
    if (soiva && soiva.url === ehdokas.url && soiva.slot === ehdokas.slot) {
      if (soitin.paused) soitin.play(); else soitin.pause();
      return;
    }
    if (soiva) edellinen = { ...soiva, kohta: soitin.currentTime };
    soiva = ehdokas;
    soitin.src = ehdokas.url;
    asetaTaso();
    mika.textContent = `▶ ${ehdokas.nimi}`;
    const kohta = ehdokas.kohta ?? ehdokas.alku ?? 0;
    if (kohta > 0) {
      soitin.addEventListener('loadedmetadata', () => { soitin.currentTime = kohta; }, { once: true });
    }
    soitin.play().catch(() => { mika.textContent = `Ei saatu soimaan: ${ehdokas.nimi}`; });
  }
  document.getElementById('soitin-tauko').addEventListener('click', () => {
    if (!soitin.src) return;
    if (soitin.paused) soitin.play(); else soitin.pause();
  });
  document.getElementById('soitin-seis').addEventListener('click', () => {
    soitin.pause();
    soitin.removeAttribute('src');
    soiva = null;
    mika.textContent = 'Pysäytetty.';
  });
  document.getElementById('soitin-ab').addEventListener('click', () => {
    if (!edellinen) return;
    soita({ ...edellinen });
  });
  // ⌖: soittimen nykyinen kohta klipin aloituskohdaksi. Jos klippi on
  // valittuna, valinta tallentuu heti uudella kohdalla — muuten kohta
  // jää kenttään odottamaan valintaa.
  document.getElementById('soitin-merkitse').addEventListener('click', () => {
    if (!soiva || !soitin.duration) return;
    const sek = Math.round(soitin.currentTime);
    // Korin ääni: kohta kirjoitetaan suoraan maanosan koriin, jos ääni
    // on rastittu. Lokero on muotoa kori:tyyppi:lauta.
    if (soiva.slot?.startsWith('kori:')) {
      const [, tyyppi, lauta] = soiva.slot.split(':');
      const nyt = tyyppiKori(tyyppi, lauta);
      const idx = nyt.findIndex((k) => jaaAlku(k).url === soiva.url);
      if (idx >= 0) {
        const { voima } = jaaAlku(nyt[idx]);
        const osat = [];
        if (sek > 0) osat.push(`alku=${sek}`);
        if (voima !== 1) osat.push(`voima=${voima}`);
        nyt[idx] = osat.length ? `${soiva.url}#${osat.join('&')}` : soiva.url;
        valitseTyyppiKori(tyyppi, lauta, nyt);
      }
    } else {
      esitaytot.set(`${soiva.slot}|${soiva.url}`, sek);
      const valittu = jaaAlku(valittuAani(soiva.slot));
      if (valittu.url === soiva.url) {
        valitseAani(soiva.slot, sek > 0 ? `${soiva.url}#alku=${sek}` : soiva.url);
      }
    }
    mika.textContent = `⌖ Alkukohta ${sek} s — ${soiva.nimi}`;
    rakenna();
  });
  
  // --- Freesound-haku: lisää ehdokkaita suoraan kategoriaan --------------
  const FS_AVAIN = 'matkakirja-freesound-avain';
  const fsAvain = document.getElementById('fs-avain');
  try { fsAvain.value = localStorage.getItem(FS_AVAIN) ?? ''; } catch { /* ei säily */ }
  fsAvain.addEventListener('change', () => {
    try { localStorage.setItem(FS_AVAIN, fsAvain.value.trim()); } catch { /* ei säily */ }
  });
  
  // Hakusanaehdotus paikan mukaan; kenttää saa muokata vapaasti.
  const HAKUEHDOTUKSET = {
    'musiikki:tietovisa': 'calm kalimba loop',
    'musiikki:tietovisa:africa': 'calm african kalimba kora loop',
    'tehoste:dice': 'dice roll wooden table',
    'tehoste:pen': 'typewriter single key',
    'tehoste:jet': 'airplane cabin interior',
    'tehoste:quizOpen': 'book page turn',
    'tehoste:click': 'wooden click ui',
    'tehoste:paper': 'paper page turn old book',
    'tehoste:coin': 'coins leather pouch',
    'tehoste:correct': 'brass bell chime success',
    'tehoste:wrong': 'heavy book close thud',
  };
  const RYHMAHAUT = {
    basaari: 'bazaar market street ambience',
    aavikko: 'desert wind ambience',
    meri: 'ocean waves shore ambience',
    'sademetsä': 'rainforest jungle ambience',
    savanni: 'african savanna ambience',
    'ylänkö': 'mountain highland wind ambience',
  };
  const hakuEhdotus = (slot, tiedot) => HAKUEHDOTUKSET[slot]
    ?? RYHMAHAUT[tiedot.ryhma] ?? tiedot.otsikko;
  
  const lisenssiNimi = (url) => (/zero/.test(url) ? 'CC0'
    : /by-nc/.test(url) ? 'CC BY-NC' : /by/.test(url) ? 'CC BY' : url);
  
  async function haeFreesound(slot, kysely, kohde) {
    const token = fsAvain.value.trim();
    kohde.textContent = '';
    if (!token) {
      kohde.textContent = 'Lisää ensin Freesoundin API-avain (osio sivun yläosassa).';
      return;
    }
    kohde.textContent = 'Haetaan…';
    const params = new URLSearchParams({
      query: kysely,
      page_size: '8',
      token,
      fields: 'id,name,username,license,previews,duration',
      // Vain CC0 ja CC BY: käytettävissä ilman erikoisehtoja.
      filter: 'license:("Creative Commons 0" OR "Attribution")',
      sort: 'rating_desc',
    });
    try {
      const res = await fetch(`https://freesound.org/apiv2/search/text/?${params}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      kohde.textContent = '';
      if (!data.results?.length) {
        kohde.textContent = 'Ei osumia — kokeile toista hakusanaa.';
        return;
      }
      for (const osuma of data.results) {
        const url = osuma.previews?.['preview-lq-mp3'] ?? osuma.previews?.['preview-hq-mp3'];
        if (!url) continue;
        const nimi = `${osuma.name} — ${osuma.username}, ${lisenssiNimi(osuma.license)}`;
        const rivi = document.createElement('div');
        rivi.className = 'rivi';
        const play = document.createElement('button');
        play.textContent = '▶';
        play.className = 'soita';
        play.addEventListener('click', () => soita({ slot, url, nimi, alku: 0 }));
        rivi.appendChild(play);
        const teksti = document.createElement('span');
        teksti.style.cssText = 'flex:1 1 12rem;align-self:center;color:var(--himmea);font-size:0.86rem;';
        teksti.textContent = `${nimi} · ${mmss(osuma.duration ?? 0)}`;
        rivi.appendChild(teksti);
        const lisaa = document.createElement('button');
        lisaa.textContent = '+ ehdokkaaksi';
        lisaa.addEventListener('click', () => {
          const kaikki = omatEhdokkaat();
          if (!(kaikki[slot] ?? []).some((e) => e.url === url)) {
            kaikki[slot] = [...(kaikki[slot] ?? []), { url, nimi }];
            tallennaOmat(kaikki);
          }
          rakenna();
        });
        rivi.appendChild(lisaa);
        kohde.appendChild(rivi);
      }
    } catch (virhe) {
      kohde.textContent = virhe.message === '401'
        ? 'Avain ei kelpaa — tarkista se yläosan Freesound-haku-osiosta.'
        : 'Haku epäonnistui — tarkista verkko ja avain.';
    }
  }
  
  // Kertasiivous: vanhat kaupunkikohtaiset valinnat poistetaan
  // talletuksesta — kaupungit saavat äänensä arvontakoreista.
  try {
    const AVAIN = 'matkakirja-aanivalinnat';
    const vanhat = JSON.parse(localStorage.getItem(AVAIN) ?? '{}');
    const siistit = Object.fromEntries(
      Object.entries(vanhat).filter(([slot]) => !slot.startsWith('kaupunki:')),
    );
    if (Object.keys(siistit).length !== Object.keys(vanhat).length) {
      localStorage.setItem(AVAIN, JSON.stringify(siistit));
    }
  } catch { /* yksityinen selaustila */ }
  
  // --- suodatus -----------------------------------------------------------
  let vainAvoimet = false;
  let haku = '';
  document.getElementById('vain-avoimet').addEventListener('click', (e) => {
    vainAvoimet = !vainAvoimet;
    e.target.classList.toggle('paalla', vainAvoimet);
    rakenna();
  });
  document.getElementById('haku').addEventListener('input', (e) => {
    haku = e.target.value.trim().toLowerCase();
    rakenna();
  });
  
  // --- valintalista ryhmiteltynä -----------------------------------------
  const valinnat = document.getElementById('valinnat');
  const laskuri = document.getElementById('laskuri');
  const aukiRyhmat = new Set(); // säilyy uudelleenpiirron yli
  const aukiPaikat = new Set(); // paikat, joiden vaihtoehdot on avattu
  
  // Minipelien tehosteet Efektit-tason omana lohkonaan; tietovisan
  // musiikki kuuluu Muihin ääniin ja jaotellaan maanosittain.
  const MINIPELIT = new Set([
    'tehoste:quizOpen', 'tehoste:correct',
    'tehoste:wrong', 'tehoste:hint', 'tehoste:tick', 'tehoste:timeout',
    'tehoste:swipe', 'tehoste:robber', 'tehoste:star', 'tehoste:gem',
    'tehoste:horseshoe', 'tehoste:empty',
  ]);
  
  /**
   * Yhden maanosan kori maisematyypin alla: rastit ja liu'ut. Ehdokkaat
   * ovat tyypin yhteiset, mutta rastit ja säädöt tallentuvat tälle
   * maanosalle — Aasian savanni voi soida eri korista kuin Afrikan.
   */
  const kiinniMannet = new Set(); // maanosalohkot ovat oletuksena auki
  
  function rakennaMaanosaKori(tyyppi, tiedot, rivit) {
    const koriSlot = `kori:${tyyppi}:${tiedot.lauta}`;
    const koriNyt = tyyppiKori(tyyppi, tiedot.lauta);
    const kotelo = document.createElement('details');
    kotelo.className = 'manner';
    kotelo.open = haku ? true : !kiinniMannet.has(koriSlot);
    kotelo.addEventListener('toggle', () => {
      if (kotelo.open) kiinniMannet.delete(koriSlot);
      else kiinniMannet.add(koriSlot);
    });
    const summary = document.createElement('summary');
    const nimi = TYYPPI_NIMET[tyyppi] ?? tyyppi;
    const tyyppiOtsikko = `${nimi.charAt(0).toUpperCase()}${nimi.slice(1)}`;
    const maita = (tiedot.maat ?? []).filter((m) => m.nimi).length;
    const laajuus = maita
      ? `${maita} maata` : `${tiedot.kaupungit.length} paikkaa`;
    summary.innerHTML = `${tyyppiOtsikko} <span class="maara">· korissa ${koriNyt.length} · ${laajuus}</span>`;
    kotelo.appendChild(summary);
    // Maanosan alla paikat listataan maittain (tyyppi → maanosa → maat).
    const seloste = document.createElement('div');
    seloste.className = 'kori-seloste';
    seloste.textContent = (tiedot.maat ?? [])
      .map((m) => (m.nimi ? `${m.nimi} (${m.kaupungit.join(', ')})` : m.kaupungit.join(', ')))
      .join(' · ');
    kotelo.appendChild(seloste);
  
    for (const ehdokas of rivit) {
      const tallennettu = koriNyt.find((k) => jaaAlku(k).url === ehdokas.url) ?? null;
      const pohja = jaaAlku(tallennettu ?? (ehdokas.alku ? `${ehdokas.url}#alku=${ehdokas.alku}` : ehdokas.url));
      const koriRivi = document.createElement('div');
      koriRivi.className = 'kori-rivi';
      const soitto = document.createElement('button');
      soitto.type = 'button';
      soitto.className = 'soita';
      soitto.textContent = '▶';
      const nimio = document.createElement('label');
      const ruutu = document.createElement('input');
      ruutu.type = 'checkbox';
      ruutu.checked = tallennettu !== null;
      nimio.appendChild(ruutu);
      nimio.appendChild(document.createTextNode(ehdokas.nimi));
      const aika = document.createElement('input');
      aika.type = 'range';
      aika.className = 'alku';
      aika.min = '0';
      aika.max = '120';
      aika.step = '1';
      aika.value = String(pohja.alku || 0);
      aika.title = 'aloituskohta sekunteina';
      const sek = document.createElement('span');
      sek.className = 'sek';
      sek.textContent = `${pohja.alku || 0} s`;
      const voimaKentta = document.createElement('input');
      voimaKentta.type = 'range';
      voimaKentta.min = '0.2';
      voimaKentta.max = '3';
      voimaKentta.step = '0.1';
      voimaKentta.value = String(pohja.voima || 1);
      voimaKentta.title = 'voimakkuuskerroin';
      const kertaa = document.createElement('span');
      kertaa.className = 'sek';
      kertaa.textContent = `${(pohja.voima || 1).toFixed(1)}×`;
      aika.addEventListener('input', () => { sek.textContent = `${aika.value} s`; });
      voimaKentta.addEventListener('input', () => {
        kertaa.textContent = `${Number(voimaKentta.value).toFixed(1)}×`;
        saadaEsikuunteluVoima(koriSlot, ehdokas.url, Number(voimaKentta.value));
      });
      const arvoNyt = () => {
        const osat = [];
        const a = Math.max(0, Number(aika.value) || 0);
        const v = Math.max(0.1, Number(voimaKentta.value) || 1);
        if (a > 0) osat.push(`alku=${a}`);
        if (v !== 1) osat.push(`voima=${v}`);
        return osat.length ? `${ehdokas.url}#${osat.join('&')}` : ehdokas.url;
      };
      soitto.addEventListener('click', () => soita({
        url: ehdokas.url, nimi: ehdokas.nimi,
        alku: Math.max(0, Number(aika.value) || 0),
        voima: Math.max(0.1, Number(voimaKentta.value) || 1),
        slot: koriSlot,
      }));
      const talleta = () => {
        const nyt = tyyppiKori(tyyppi, tiedot.lauta).filter((k) => jaaAlku(k).url !== ehdokas.url);
        if (ruutu.checked) nyt.push(arvoNyt());
        valitseTyyppiKori(tyyppi, tiedot.lauta, nyt);
      };
      ruutu.addEventListener('change', () => { talleta(); rakenna(); });
      aika.addEventListener('change', talleta);
      voimaKentta.addEventListener('change', talleta);
      koriRivi.appendChild(soitto);
      koriRivi.appendChild(nimio);
      koriRivi.appendChild(aika);
      koriRivi.appendChild(sek);
      koriRivi.appendChild(voimaKentta);
      koriRivi.appendChild(kertaa);
      if (ehdokas.oma) {
        const poista = document.createElement('button');
        poista.type = 'button';
        poista.textContent = '✕';
        poista.className = 'poista';
        poista.title = 'Poista oma ääni';
        poista.addEventListener('click', () => {
          const kaikki = omatEhdokkaat();
          const omaSlot = `kori:${tyyppi}`;
          kaikki[omaSlot] = (kaikki[omaSlot] ?? []).filter((e) => e.url !== ehdokas.url);
          if (!kaikki[omaSlot].length) delete kaikki[omaSlot];
          tallennaOmat(kaikki);
          // Ehdokas on tyypin yhteinen: poisto siivoaa sen joka maanosan korista.
          for (const l of KAUPUNGIT_TYYPEITTAIN[tyyppi] ?? []) {
            valitseTyyppiKori(tyyppi, l.lauta,
              tyyppiKori(tyyppi, l.lauta).filter((k) => jaaAlku(k).url !== ehdokas.url));
          }
          rakenna();
        });
        koriRivi.appendChild(poista);
      }
      kotelo.appendChild(koriRivi);
    }
    kotelo.appendChild(rakennaLisaaAania(tyyppi));
    return kotelo;
  }
  
  /**
   * Yhden kaupungin omat kenttä-äänitykset. Sama rakenne kuin
   * tyyppikorilla — rastit, aloituskohta ja voimakkuus — mutta kori on
   * vain tälle kaupungille. Kun korissa on yksikin ääni, se soi
   * maisematyypin korin sijaan; kaikkien rastien poisto palauttaa
   * kaupungin tyyppikoriin.
   */
  function rakennaKaupunkiKori(lauta, kaupunki) {
    const koriSlot = `kaupunki:${lauta}:${kaupunki.id}`;
    const koriNyt = kaupunkiKori(lauta, kaupunki.id);
    const kotelo = document.createElement('details');
    kotelo.className = 'manner';
    kotelo.open = haku ? true : !kiinniMannet.has(koriSlot);
    kotelo.addEventListener('toggle', () => {
      if (kotelo.open) kiinniMannet.delete(koriSlot);
      else kiinniMannet.add(koriSlot);
    });
    const summary = document.createElement('summary');
    const tila = koriNyt.length ? `korissa ${koriNyt.length}` : 'tyyppikorista';
    summary.innerHTML = `${kaupunki.nimi} <span class="maara">· ${tila}`
      + ` · ${kaupunki.ehdokkaat.length} äänitystä</span>`;
    kotelo.appendChild(summary);
  
    for (const ehdokas of kaupunki.ehdokkaat) {
      const tallennettu = koriNyt.find((k) => jaaAlku(k).url === ehdokas.url) ?? null;
      const pohja = jaaAlku(tallennettu
        ?? (ehdokas.alku ? `${ehdokas.url}#alku=${ehdokas.alku}` : ehdokas.url));
      const rivi = document.createElement('div');
      rivi.className = 'kori-rivi';
      const soitto = document.createElement('button');
      soitto.type = 'button';
      soitto.className = 'soita';
      soitto.textContent = '▶';
      const nimio = document.createElement('label');
      const ruutu = document.createElement('input');
      ruutu.type = 'checkbox';
      ruutu.checked = tallennettu !== null;
      nimio.appendChild(ruutu);
      nimio.appendChild(document.createTextNode(ehdokas.nimi));
      const aika = document.createElement('input');
      aika.type = 'range';
      aika.className = 'alku';
      aika.min = '0';
      aika.max = '120';
      aika.step = '1';
      aika.value = String(pohja.alku || 0);
      aika.title = 'aloituskohta sekunteina';
      const sek = document.createElement('span');
      sek.className = 'sek';
      sek.textContent = `${pohja.alku || 0} s`;
      const voimaKentta = document.createElement('input');
      voimaKentta.type = 'range';
      voimaKentta.min = '0.2';
      voimaKentta.max = '3';
      voimaKentta.step = '0.1';
      voimaKentta.value = String(pohja.voima || 1);
      voimaKentta.title = 'voimakkuuskerroin';
      const kertaa = document.createElement('span');
      kertaa.className = 'sek';
      kertaa.textContent = `${(pohja.voima || 1).toFixed(1)}×`;
      aika.addEventListener('input', () => { sek.textContent = `${aika.value} s`; });
      voimaKentta.addEventListener('input', () => {
        kertaa.textContent = `${Number(voimaKentta.value).toFixed(1)}×`;
        saadaEsikuunteluVoima(koriSlot, ehdokas.url, Number(voimaKentta.value));
      });
      const arvoNyt = () => {
        const osat = [];
        const a = Math.max(0, Number(aika.value) || 0);
        const v = Math.max(0.1, Number(voimaKentta.value) || 1);
        if (a > 0) osat.push(`alku=${a}`);
        if (v !== 1) osat.push(`voima=${v}`);
        return osat.length ? `${ehdokas.url}#${osat.join('&')}` : ehdokas.url;
      };
      soitto.addEventListener('click', () => soita({
        url: ehdokas.url,
        nimi: `${kaupunki.nimi}: ${ehdokas.nimi}`,
        alku: Math.max(0, Number(aika.value) || 0),
        voima: Math.max(0.1, Number(voimaKentta.value) || 1),
        slot: koriSlot,
      }));
      const talleta = () => {
        const nyt = kaupunkiKori(lauta, kaupunki.id)
          .filter((k) => jaaAlku(k).url !== ehdokas.url);
        if (ruutu.checked) nyt.push(arvoNyt());
        valitseKaupunkiKori(lauta, kaupunki.id, nyt);
      };
      ruutu.addEventListener('change', () => { talleta(); rakenna(); });
      aika.addEventListener('change', talleta);
      voimaKentta.addEventListener('change', talleta);
      rivi.appendChild(soitto);
      rivi.appendChild(nimio);
      rivi.appendChild(aika);
      rivi.appendChild(sek);
      rivi.appendChild(voimaKentta);
      rivi.appendChild(kertaa);
      kotelo.appendChild(rivi);
    }
    return kotelo;
  }
  
  /**
   * Tyypin yhteinen "lisää ääniä" -lohko: oma osoite ja Freesound-haku.
   * Lisätty ääni ilmestyy tyypin listaan kaikissa maanosissa.
   */
  function rakennaLisaaAania(tyyppi) {
    const nimi = TYYPPI_NIMET[tyyppi] ?? tyyppi;
    const omaSlot = `kori:${tyyppi}`;
    const loput = document.createElement('details');
    loput.className = 'loput';
    loput.open = haku ? true : aukiPaikat.has(omaSlot);
    loput.addEventListener('toggle', () => {
      if (loput.open) aukiPaikat.add(omaSlot);
      else aukiPaikat.delete(omaSlot);
    });
    const avaus = document.createElement('summary');
    avaus.textContent = 'Lisää ääniä tyypin listaan — oma osoite · Freesound-haku';
    loput.appendChild(avaus);
    const oma = document.createElement('div');
    oma.className = 'rivi oma';
    const osoite = document.createElement('input');
    osoite.type = 'url';
    osoite.placeholder = 'https://cdn.freesound.org/previews/…mp3';
    const nimike = document.createElement('input');
    nimike.type = 'text';
    nimike.placeholder = 'nimi ja lisenssi';
    const lisaa = document.createElement('button');
    lisaa.textContent = '+ Lisää';
    lisaa.addEventListener('click', () => {
      const u = osoite.value.trim();
      if (!u) return;
      const kaikki = omatEhdokkaat();
      kaikki[omaSlot] = [...(kaikki[omaSlot] ?? []), { url: u, nimi: nimike.value.trim() || u }];
      tallennaOmat(kaikki);
      rakenna();
    });
    oma.appendChild(osoite);
    oma.appendChild(nimike);
    oma.appendChild(lisaa);
    loput.appendChild(oma);
    const hakuRivi = document.createElement('div');
    hakuRivi.className = 'rivi oma';
    const kysely = document.createElement('input');
    kysely.type = 'text';
    kysely.value = RYHMAHAUT[nimi] ?? `${nimi} ambience`;
    kysely.style.flex = '2 1 12rem';
    kysely.title = 'Hakusana Freesoundiin';
    const hae = document.createElement('button');
    hae.textContent = 'Hae Freesoundista';
    const tulokset = document.createElement('div');
    hae.addEventListener('click', () => haeFreesound(omaSlot, kysely.value.trim(), tulokset));
    hakuRivi.appendChild(kysely);
    hakuRivi.appendChild(hae);
    loput.appendChild(hakuRivi);
    loput.appendChild(tulokset);
    return loput;
  }
  
  /** Ylätason lohko (Taustaäänet, Efektit, Puhe, Muut äänet). */
  function ylaRyhma(nimi, maaraTeksti) {
    const kotelo = document.createElement('details');
    kotelo.className = 'ryhma';
    kotelo.open = haku ? true : aukiRyhmat.has(nimi);
    kotelo.addEventListener('toggle', () => {
      if (kotelo.open) aukiRyhmat.add(nimi);
      else aukiRyhmat.delete(nimi);
    });
    const summary = document.createElement('summary');
    summary.innerHTML = `${nimi} <span class="maara">· ${maaraTeksti}</span>`;
    kotelo.appendChild(summary);
    return kotelo;
  }
  
  /**
   * Taustaäänet: ylätaso, jonka alla maanosat (Maailma, Afrikka, …) ja
   * niiden alla maisematyyppien arvontakorit maittain listattuine
   * kaupunkeineen. Myöhemmin jaottelu tarkentuu maihin ja kaupunkeihin
   * (omistajan linjaus).
   */
  function rakennaTaustaRyhma() {
    const laudat = new Map(); // lauta -> { maanosa, tyypit }
    for (const tyyppi of Object.keys(TYYPPI_EHDOKKAAT)) {
      const nimi = TYYPPI_NIMET[tyyppi] ?? tyyppi;
      const omat = (omatEhdokkaat()[`kori:${tyyppi}`] ?? []).map((e) => ({ ...e, oma: true }));
      const rivit = [...TYYPPI_EHDOKKAAT[tyyppi], ...omat];
      for (const tiedot of KAUPUNGIT_TYYPEITTAIN[tyyppi] ?? []) {
        if (haku && !nimi.toLowerCase().includes(haku)
          && !tiedot.maanosa.toLowerCase().includes(haku)
          && !'taustaäänet'.includes(haku)
          && !rivit.some((e) => e.nimi.toLowerCase().includes(haku))
          && !tiedot.kaupungit.some((k) => k.toLowerCase().includes(haku))
          && !(tiedot.maat ?? []).some((m) => m.nimi && m.nimi.toLowerCase().includes(haku))) continue;
        if (!laudat.has(tiedot.lauta)) laudat.set(tiedot.lauta, { maanosa: tiedot.maanosa, tyypit: [] });
        laudat.get(tiedot.lauta).tyypit.push({ tyyppi, tiedot, rivit });
      }
    }
    if (!laudat.size) return null;
    // Maailma ensin, sitten maanosat siinä järjestyksessä kuin ne
    // ilmestyvät sisältöön.
    const jarjestetty = [...laudat.entries()]
      .sort((a, b) => (a[0] === 'maailma' ? -1 : b[0] === 'maailma' ? 1 : 0));
  
    const kotelo = ylaRyhma('Taustaäänet',
      jarjestetty.map(([, l]) => l.maanosa).join(' · '));
    const seloste = document.createElement('p');
    seloste.className = 'kori-seloste';
    seloste.textContent = 'Paikkojen äänimaisemat maanosittain. Kaupungin oma '
      + 'kenttä-äänitys soi ensin; ilman sitä peli arpoo äänen maisematyypin '
      + 'korista. Kun kaupungin kaikki rastit ottaa pois, se palaa tyyppikoriin.';
    kotelo.appendChild(seloste);
  
    for (const [lauta, t] of jarjestetty) {
      const lohko = document.createElement('details');
      lohko.className = 'manner';
      lohko.open = haku ? true : !kiinniMannet.has(`lauta:${lauta}`);
      lohko.addEventListener('toggle', () => {
        if (lohko.open) kiinniMannet.delete(`lauta:${lauta}`);
        else kiinniMannet.add(`lauta:${lauta}`);
      });
      const omat = (KAUPUNKI_LISTA.find((l) => l.lauta === lauta)?.kaupungit ?? [])
        .filter((k) => !haku || k.nimi.toLowerCase().includes(haku)
          || k.ehdokkaat.some((e) => e.nimi.toLowerCase().includes(haku)));
      const ots = document.createElement('summary');
      ots.innerHTML = `${t.maanosa} <span class="maara">· ${t.tyypit.length} maisematyyppiä`
        + `${omat.length ? ` · ${omat.length} kaupungilla oma äänitys` : ''}</span>`;
      lohko.appendChild(ots);
      // Kaupunkien omat äänitykset ensin: ne soivat tyyppikorin edellä.
      if (omat.length) {
        const omaKotelo = document.createElement('details');
        omaKotelo.className = 'manner';
        omaKotelo.open = haku ? true : !kiinniMannet.has(`omat:${lauta}`);
        omaKotelo.addEventListener('toggle', () => {
          if (omaKotelo.open) kiinniMannet.delete(`omat:${lauta}`);
          else kiinniMannet.add(`omat:${lauta}`);
        });
        const omaOts = document.createElement('summary');
        omaOts.innerHTML = 'Kaupunkien omat äänitykset '
          + `<span class="maara">· ${omat.length} kaupunkia · radio aporee</span>`;
        omaKotelo.appendChild(omaOts);
        for (const kaupunki of omat) {
          omaKotelo.appendChild(rakennaKaupunkiKori(lauta, kaupunki));
        }
        lohko.appendChild(omaKotelo);
      }
      for (const { tyyppi, tiedot, rivit } of t.tyypit) {
        lohko.appendChild(rakennaMaanosaKori(tyyppi, tiedot, rivit));
      }
      kotelo.appendChild(lohko);
    }
    return kotelo;
  }
  
  // Puheen esikuuntelu omalla soittimella tarkalleen valitulla tasolla.
  let puheEsikuuntelu = null;
  
  /** Puhe: yksi voimakkuussäätö kaikkiin luentoihin. */
  function rakennaPuheRyhma() {
    const kotelo = ylaRyhma('Puhe', 'yksi säätö kaikkiin luentoihin');
    const seloste = document.createElement('p');
    seloste.className = 'kori-seloste';
    seloste.textContent = 'Koskee kaikkia luentoja: alkuteksti, saapumiset ja '
      + 'kuuntele-napit. Luentoja ei eritellä. Esikuuntelu soittaa '
      + 'alkutekstin luentaa valitulla tasolla.';
    kotelo.appendChild(seloste);
    const rivi = document.createElement('div');
    rivi.className = 'kori-rivi';
    const soitto = document.createElement('button');
    soitto.type = 'button';
    soitto.className = 'soita';
    soitto.textContent = '▶';
    const liuku = document.createElement('input');
    liuku.type = 'range';
    liuku.className = 'alku';
    liuku.min = '0.1';
    liuku.max = '1';
    liuku.step = '0.05';
    liuku.value = String(puheVoima());
    const lukema = document.createElement('span');
    lukema.className = 'sek';
    lukema.textContent = `${Math.round(puheVoima() * 100)} %`;
    liuku.addEventListener('input', () => {
      lukema.textContent = `${Math.round(Number(liuku.value) * 100)} %`;
      if (puheEsikuuntelu) puheEsikuuntelu.volume = Number(liuku.value);
    });
    liuku.addEventListener('change', () => asetaPuheVoima(Number(liuku.value)));
    soitto.addEventListener('click', () => {
      if (puheEsikuuntelu && !puheEsikuuntelu.paused) {
        puheEsikuuntelu.pause();
        return;
      }
      puheEsikuuntelu ??= new Audio('assets/audio/intro-puhe.mp3');
      puheEsikuuntelu.volume = Number(liuku.value);
      puheEsikuuntelu.play().catch(() => {});
    });
    rivi.appendChild(soitto);
    rivi.appendChild(liuku);
    rivi.appendChild(lukema);
    kotelo.appendChild(rivi);
    return kotelo;
  }
  
  /*
   * Huudahdukset kuunneltaviksi (omistajan pyyntö 10.8.2026:
   * "saisiko huudahdukset työhuoneeseen niin kuuntelen"). Lista
   * tulee pelin omasta HUUDAHDUKSET-taulusta, joten tekstit ja
   * tiedostonimet eivät voi erkaantua pelistä.
   */
  let huudahdusSoitin = null;
  function rakennaHuudahdusRyhma() {
    const kotelo = ylaRyhma('Huudahdukset', 'aarrelöydön repliikit luettuina');
    const seloste = document.createElement('p');
    seloste.className = 'kori-seloste';
    seloste.textContent = 'Nuoren herran hihkaisut aarteen paljastuksessa — sama '
      + 'repliikki kirjoitettuna ja luettuna. Arvoluokka kertoo, minkä '
      + 'löydön kohdalla repliikki voi osua.';
    kotelo.appendChild(seloste);
    const NIMET = { 300: 'Pieni löytö (300)', 600: 'Keskilöytö (600)', 1000: 'Arvolöytö (1000)', star: 'Pääaarre' };
    for (const [avain, lista] of Object.entries(HUUDAHDUKSET)) {
      const ryhmanNimi = document.createElement('p');
      ryhmanNimi.className = 'kori-seloste';
      ryhmanNimi.textContent = NIMET[avain] ?? avain;
      kotelo.appendChild(ryhmanNimi);
      lista.forEach((teksti, i) => {
        const rivi = document.createElement('div');
        rivi.className = 'kori-rivi';
        const soitto = document.createElement('button');
        soitto.type = 'button';
        soitto.className = 'soita';
        soitto.textContent = '▶';
        const nimi = document.createElement('span');
        nimi.textContent = teksti;
        soitto.addEventListener('click', () => {
          huudahdusSoitin?.pause();
          huudahdusSoitin = new Audio(`assets/audio/huudahdus-${avain}-${i + 1}.mp3`);
          huudahdusSoitin.volume = puheVoima();
          huudahdusSoitin.play().catch(() => {});
        });
        rivi.appendChild(soitto);
        rivi.appendChild(nimi);
        kotelo.appendChild(rivi);
      });
    }
    return kotelo;
  }

  const rakenna = () => {
    valinnat.textContent = '';
    const tehdyt = kaikkiValinnat();
    const slotit = Object.keys(EHDOKKAAT);
    laskuri.textContent = `Valittu ${slotit.filter((s) => s in tehdyt).length} / ${slotit.length}`;
  
    // 1) Taustaäänet: maanosat ja niiden maisematyyppien korit.
    const tausta = rakennaTaustaRyhma();
    if (tausta) valinnat.appendChild(tausta);
  
    // 2) Slotit ylätasoihin: tietovisan musiikki (maanosittain) kuuluu
    // Muihin ääniin; minipelien ja yleiset tehosteet Efekteihin.
    const minipelit = [];
    const yleiset = [];
    const tietovisat = [];
    for (const [slot, tiedot] of Object.entries(EHDOKKAAT)) {
      const omat = omatEhdokkaat()[slot] ?? [];
      const kaikkiRivit = [...tiedot.ehdokkaat, ...omat.map((e) => ({ ...e, oma: true }))];
      if (haku && !tiedot.otsikko.toLowerCase().includes(haku)
        && !kaikkiRivit.some((e) => e.nimi.toLowerCase().includes(haku))) continue;
      const valittu = valittuAani(slot);
      if (vainAvoimet && valittu !== null) continue;
      const jasen = { slot, tiedot, kaikkiRivit, valittu };
      if (slot.startsWith('musiikki:tietovisa')) tietovisat.push(jasen);
      else if (MINIPELIT.has(slot)) minipelit.push(jasen);
      else yleiset.push(jasen);
    }
  
    // Ylätasot omistajan jaottelulla: Efektit, Puhe ja Muut äänet
    // (Taustaäänet on jo yllä).
    const paketit = [];
    if (minipelit.length || yleiset.length) {
      paketit.push({
        nimi: 'Efektit',
        seloste: 'Tehosteet ovat samat kaikissa paikoissa — paikkajaottelua ei tarvita.',
        lapset: [['Tietovisa ja minipelit', minipelit], ['Yleiset', yleiset]]
          .filter(([, joukko]) => joukko.length),
      });
    }
    paketit.push({ puhe: true });
    if (tietovisat.length) {
      paketit.push({
        nimi: 'Muut äänet',
        seloste: 'Tietovisan musiikki valitaan maanosittain — ilman omaa valintaa '
          + 'soi yleinen. Tulevat paikkaäänet (esimerkiksi esitykset '
          + 'Tutki-sivulla) jaotellaan tänne paikkahierarkian mukaan.',
        lapset: [['Tietovisat — musiikki maanosittain', tietovisat]],
      });
    }
  
    for (const paketti of paketit) {
      if (paketti.puhe) {
        if (!haku || 'puhe luenta voimakkuus'.includes(haku)) {
          valinnat.appendChild(rakennaPuheRyhma());
          valinnat.appendChild(rakennaHuudahdusRyhma());
        }
        continue;
      }
      const emo = ylaRyhma(paketti.nimi,
        `${paketti.lapset.reduce((summa, [, joukko]) => summa + joukko.length, 0)} paikkaa`);
      const emoSeloste = document.createElement('p');
      emoSeloste.className = 'kori-seloste';
      emoSeloste.textContent = paketti.seloste;
      emo.appendChild(emoSeloste);
      for (const [lohkoNimi, jasenet] of paketti.lapset) {
      const kotelo = document.createElement('details');
      kotelo.className = 'manner';
      kotelo.open = haku ? true : !kiinniMannet.has(`lohko:${lohkoNimi}`);
      kotelo.addEventListener('toggle', () => {
        if (kotelo.open) kiinniMannet.delete(`lohko:${lohkoNimi}`);
        else kiinniMannet.add(`lohko:${lohkoNimi}`);
      });
      const summary = document.createElement('summary');
      const valittuja = jasenet.filter((j) => j.valittu !== null).length;
      summary.innerHTML = `${lohkoNimi} <span class="maara">· ${jasenet.length} paikkaa · valittu ${valittuja}</span>`;
      kotelo.appendChild(summary);
  
      for (const { slot, tiedot, kaikkiRivit, valittu } of jasenet) {
        const os = document.createElement('div');
        os.className = 'osio';
        os.textContent = tiedot.otsikko;
        const tila = document.createElement('span');
        tila.className = 'tila';
        if (valittu !== null) {
          tila.textContent = '✓ valittu';
          tila.classList.add('tila-valittu');
        } else {
          tila.textContent = tiedot.oletus ? 'oletus käytössä' : 'syntetisoitu (oletus)';
        }
        os.appendChild(tila);
        kotelo.appendChild(os);
  
        const kaytossa = valittu === null ? tiedot.oletus : (valittu === '' ? null : valittu);
        const kaytto = jaaAlku(kaytossa);
  
        // Vain käytössä oleva ääni säätöineen näkyy oletuksena; loput
        // vaihtoehdot, omat lisäykset ja Freesound-haku aukeavat
        // nuolesta (omistajan toive — lista pysyy lyhyenä).
        const loput = document.createElement('details');
        loput.className = 'loput';
        loput.open = haku ? true : aukiPaikat.has(slot);
        loput.addEventListener('toggle', () => {
          if (loput.open) aukiPaikat.add(slot);
          else aukiPaikat.delete(slot);
        });
        const avaus = document.createElement('summary');
        loput.appendChild(avaus);
        let piilotettuja = 0;
  
        for (const ehdokas of kaikkiRivit) {
          const { url, nimi, alku, oma } = ehdokas;
          const rivi = document.createElement('div');
          rivi.className = 'rivi';
          const onValittu = (url ?? null) === (kaytto.url ?? null);
          let aikaKentta = null;
          let voimaKentta = null;
          // Ilman kenttiä valinta perii ehdokkaan oman alkukohdan
          // (esim. Metris 20 s), jotta se ei katoa yksinkertaistuksessa.
          const sekunnit = () => (aikaKentta
            ? Math.max(0, Number(aikaKentta.value) || 0)
            : (alku ?? 0));
          const kerroin = () => Math.max(0.1, Number(voimaKentta?.value) || 1);
          const arvoksi = (u) => {
            const osat = [];
            if (sekunnit() > 0) osat.push(`alku=${sekunnit()}`);
            if (kerroin() !== 1) osat.push(`voima=${kerroin()}`);
            return osat.length ? `${u}#${osat.join('&')}` : u;
          };
          if (url) {
            const play = document.createElement('button');
            play.textContent = '▶';
            play.className = 'soita';
            play.addEventListener('click', () => soita({ slot, url, nimi, alku: sekunnit(), voima: kerroin() }));
            rivi.appendChild(play);
          }
          const valitse = document.createElement('button');
          valitse.className = 'nimi';
          valitse.textContent = (onValittu ? '✓ ' : '') + nimi;
          if (onValittu) valitse.style.borderColor = 'var(--korostus)';
          valitse.addEventListener('click', () => {
            valitseAani(slot, url ? arvoksi(url) : url);
            rakenna();
          });
          rivi.appendChild(valitse);
          // Aloituskohta ja voimakerroin näkyvät vain musiikilla ja
          // lentoäänellä: kaupunkien viritys tapahtuu arvontakorissa
          // (omistajan toive — rivit pysyvät siisteinä), ja
          // kaupunkikohtainen hienosäätö hoituu Miksaus-osiossa.
          const saadettava = url && (slot.startsWith('musiikki:') || slot === 'tehoste:jet');
          if (saadettava) {
            // Samat liukusäätimet kuin Taustaäänten koreissa
            // (omistajan huomio: numerokentät eivät riittäneet).
            aikaKentta = document.createElement('input');
            aikaKentta.type = 'range';
            aikaKentta.className = 'alku';
            aikaKentta.min = '0';
            aikaKentta.max = '120';
            aikaKentta.step = '1';
            aikaKentta.value = esitaytot.get(`${slot}|${url}`)
              ?? (onValittu && kaytto.alku ? kaytto.alku : (alku ?? 0));
            aikaKentta.title = 'Aloituskohta sekunteina';
            const tallenna = () => {
              esitaytot.set(`${slot}|${url}`, sekunnit());
              voimaEsitaytot.set(`${slot}|${url}`, kerroin());
              saadaEsikuunteluVoima(slot, url, kerroin());
              if (onValittu) {
                valitseAani(slot, arvoksi(url));
                rakenna();
              }
            };
            const sek = document.createElement('span');
            sek.className = 'sek';
            sek.textContent = `${Number(aikaKentta.value)} s`;
            aikaKentta.addEventListener('input', () => { sek.textContent = `${aikaKentta.value} s`; });
            aikaKentta.addEventListener('change', tallenna);
            rivi.appendChild(aikaKentta);
            rivi.appendChild(sek);
            voimaKentta = document.createElement('input');
            voimaKentta.type = 'range';
            voimaKentta.min = '0.2';
            voimaKentta.max = '3';
            voimaKentta.step = '0.1';
            voimaKentta.value = voimaEsitaytot.get(`${slot}|${url}`)
              ?? (onValittu && kaytto.voima !== 1 ? kaytto.voima : 1);
            voimaKentta.title = 'Voimakerroin (1 = normaali)';
            const kert = document.createElement('span');
            kert.className = 'sek';
            kert.textContent = `${Number(voimaKentta.value).toFixed(1)}×`;
            voimaKentta.addEventListener('input', () => {
              kert.textContent = `${Number(voimaKentta.value).toFixed(1)}×`;
              saadaEsikuunteluVoima(slot, url, kerroin());
            });
            voimaKentta.addEventListener('change', tallenna);
            rivi.appendChild(voimaKentta);
            rivi.appendChild(kert);
          }
          if (oma) {
            const poista = document.createElement('button');
            poista.textContent = '✕';
            poista.className = 'poista';
            poista.title = 'Poista oma ehdokas';
            poista.addEventListener('click', () => {
              const kaikki = omatEhdokkaat();
              kaikki[slot] = (kaikki[slot] ?? []).filter((e) => e.url !== url);
              if (!kaikki[slot].length) delete kaikki[slot];
              tallennaOmat(kaikki);
              rakenna();
            });
            rivi.appendChild(poista);
          }
          if (onValittu) kotelo.appendChild(rivi);
          else {
            loput.appendChild(rivi);
            piilotettuja += 1;
          }
        }
  
        // Oma ehdokas: liitä mikä tahansa mp3-osoite tähän paikkaan.
        const oma = document.createElement('div');
        oma.className = 'rivi oma';
        const osoite = document.createElement('input');
        osoite.type = 'url';
        osoite.placeholder = 'https://cdn.freesound.org/previews/…mp3';
        const nimike = document.createElement('input');
        nimike.type = 'text';
        nimike.placeholder = 'nimi ja lisenssi';
        const lisaa = document.createElement('button');
        lisaa.textContent = '+ Lisää';
        lisaa.addEventListener('click', () => {
          const u = osoite.value.trim();
          if (!u) return;
          const kaikki = omatEhdokkaat();
          kaikki[slot] = [...(kaikki[slot] ?? []), { url: u, nimi: nimike.value.trim() || u }];
          tallennaOmat(kaikki);
          rakenna();
        });
        oma.appendChild(osoite);
        oma.appendChild(nimike);
        oma.appendChild(lisaa);
        loput.appendChild(oma);
  
        // Konehaku: hae lisää ehdokkaita tähän paikkaan Freesoundista.
        const hakuRivi = document.createElement('div');
        hakuRivi.className = 'rivi oma';
        const kysely = document.createElement('input');
        kysely.type = 'text';
        kysely.value = hakuEhdotus(slot, tiedot);
        kysely.style.flex = '2 1 12rem';
        kysely.title = 'Hakusana Freesoundiin';
        const hae = document.createElement('button');
        hae.textContent = 'Hae Freesoundista';
        const tulokset = document.createElement('div');
        hae.addEventListener('click', () => haeFreesound(slot, kysely.value.trim(), tulokset));
        hakuRivi.appendChild(kysely);
        hakuRivi.appendChild(hae);
        loput.appendChild(hakuRivi);
        loput.appendChild(tulokset);
        avaus.textContent = `Muut vaihtoehdot (${piilotettuja}) · omat äänet · Freesound-haku`;
        kotelo.appendChild(loput);
      }
      emo.appendChild(kotelo);
      }
      valinnat.appendChild(emo);
    }
  };
  rakenna();
  
  // --- vienti ja tuonti ---------------------------------------------------
  document.getElementById('kopioi').addEventListener('click', () => {
    const kaikki = kaikkiValinnat();
    const rivit = Object.entries(kaikki).filter(([slot]) => EHDOKKAAT[slot]).map(([slot, arvo]) => {
      const paikka = EHDOKKAAT[slot];
      const { url, alku } = jaaAlku(arvo);
      const omat = omatEhdokkaat()[slot] ?? [];
      const nimi = arvo === ''
        ? 'Syntetisoitu äänimaisema'
        : [...(paikka?.ehdokkaat ?? []), ...omat].find((e) => e.url === url)?.nimi ?? arvo;
      const { voima } = jaaAlku(arvo);
      const osat = [];
      if (alku > 0) osat.push(`alkaa ${alku} s`);
      if (voima !== 1) osat.push(`voima ${voima}×`);
      const alkuosa = osat.length ? ` (${osat.join(', ')})` : '';
      return `${paikka?.otsikko ?? slot}: ${nimi}${alkuosa}`;
    });
    // Arvontakorit omana lohkonaan maanosittain.
    for (const [tyyppi, laudat] of Object.entries(kaikkiKorit())) {
      for (const [lauta, lista] of Object.entries(laudat)) {
        const maanosa = (KAUPUNGIT_TYYPEITTAIN[tyyppi] ?? [])
          .find((l) => l.lauta === lauta)?.maanosa ?? lauta;
        const nimet = lista.map((k) => {
          const { url, alku, voima } = jaaAlku(k);
          const nimi = (TYYPPI_EHDOKKAAT[tyyppi] ?? []).find((e) => e.url === url)?.nimi ?? k;
          const osat = [];
          if (alku > 0) osat.push(`alkaa ${alku} s`);
          if (voima !== 1) osat.push(`voima ${voima}×`);
          return osat.length ? `${nimi} (${osat.join(', ')})` : nimi;
        });
        rivit.push(`Arvontakori ${tyyppi} (${maanosa}): ${nimet.join(' | ')}`);
      }
    }
    // Kaupunkien omat äänitykset omana lohkonaan.
    for (const [lauta, kaupungit] of Object.entries(kaikkiKaupunkiKorit())) {
      const tiedot = KAUPUNKI_LISTA.find((l) => l.lauta === lauta);
      for (const [cityId, lista] of Object.entries(kaupungit)) {
        const kaupunki = tiedot?.kaupungit.find((k) => k.id === cityId);
        const nimet = lista.map((k) => {
          const { url, alku, voima } = jaaAlku(k);
          const nimi = kaupunki?.ehdokkaat.find((e) => e.url === url)?.nimi ?? k;
          const osat = [];
          if (alku > 0) osat.push(`alkaa ${alku} s`);
          if (voima !== 1) osat.push(`voima ${voima}×`);
          return osat.length ? `${nimi} (${osat.join(', ')})` : nimi;
        });
        rivit.push(`Kaupungin ääni ${kaupunki?.nimi ?? cityId} (${tiedot?.maanosa ?? lauta}): `
          + (nimet.length ? nimet.join(' | ') : 'tyyppikorista'));
      }
    }
    const teksti = rivit.length
      ? `Äänivalinnat:\n${rivit.join('\n')}`
      : 'Ei vielä valintoja — kaikki oletuksilla.';
    document.getElementById('valinnat-teksti').textContent = teksti;
    navigator.clipboard?.writeText(teksti).catch(() => {});
  });
  // Kaikki tallennetut arvontakorit tyypeittäin ja maanosittain.
  const kaikkiKorit = () => {
    const korit = {};
    for (const tyyppi of Object.keys(TYYPPI_EHDOKKAAT)) {
      for (const { lauta } of KAUPUNGIT_TYYPEITTAIN[tyyppi] ?? []) {
        const lista = tyyppiKori(tyyppi, lauta);
        if (lista.length) (korit[tyyppi] ??= {})[lauta] = lista;
      }
    }
    return korit;
  };
  // Kaupunkien omat korit: vain ne, joita on studiossa muokattu.
  // Muokkaamaton kaupunki soittaa koodin oletusäänitykset.
  const kaikkiKaupunkiKorit = () => {
    const korit = {};
    try {
      const tallennetut = JSON.parse(localStorage.getItem('matkakirja-kaupunkivalinnat') ?? '{}');
      for (const [lauta, kaupungit] of Object.entries(tallennetut)) {
        for (const [cityId, lista] of Object.entries(kaupungit ?? {})) {
          if (Array.isArray(lista)) (korit[lauta] ??= {})[cityId] = lista;
        }
      }
    } catch {
      /* yksityinen selaustila — ei vietävää */
    }
    return korit;
  };
  document.getElementById('kopioi-json').addEventListener('click', () => {
    const siistit = Object.fromEntries(
      Object.entries(kaikkiValinnat()).filter(([slot]) => EHDOKKAAT[slot]),
    );
    const teksti = JSON.stringify({
      valinnat: siistit, korit: kaikkiKorit(), kaupungit: kaikkiKaupunkiKorit(),
    }, null, 1);
    document.getElementById('valinnat-teksti').textContent = teksti;
    navigator.clipboard?.writeText(teksti).catch(() => {});
  });
  document.getElementById('tuo').addEventListener('click', () => {
    try {
      const tuotu = JSON.parse(document.getElementById('tuo-alue').value);
      // Uusi muoto: { valinnat, korit }. Vanha muoto: pelkkä valinnat-kartta.
      const valinnatOsa = tuotu.valinnat ?? tuotu;
      for (const [slot, arvo] of Object.entries(valinnatOsa)) {
        // Vanhan muodon kaupunkivalinta oli yksi osoite paikkaa kohti.
        // Nyt kaupungilla on kori, joka tuodaan omasta kaupungit-
        // lohkostaan, joten vanhat rivit ohitetaan.
        if (slot.startsWith('kaupunki:')) continue;
        valitseAani(slot, arvo === '' ? null : arvo);
      }
      for (const [tyyppi, arvo] of Object.entries(tuotu.korit ?? {})) {
        // Vanha muoto (pelkkä lista) koski kaikkia maanosia.
        if (Array.isArray(arvo)) {
          for (const l of KAUPUNGIT_TYYPEITTAIN[tyyppi] ?? []) {
            valitseTyyppiKori(tyyppi, l.lauta, arvo);
          }
        } else if (arvo && typeof arvo === 'object') {
          for (const [lauta, lista] of Object.entries(arvo)) {
            if (Array.isArray(lista)) valitseTyyppiKori(tyyppi, lauta, lista);
          }
        }
      }
      for (const [lauta, kaupungit] of Object.entries(tuotu.kaupungit ?? {})) {
        for (const [cityId, lista] of Object.entries(kaupungit ?? {})) {
          if (Array.isArray(lista)) valitseKaupunkiKori(lauta, cityId, lista);
        }
      }
      rakenna();
      document.getElementById('valinnat-teksti').textContent = 'Valinnat tuotu.';
    } catch {
      document.getElementById('valinnat-teksti').textContent = 'Tuonti epäonnistui: tarkista JSON.';
    }
  });
}
