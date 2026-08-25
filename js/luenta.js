/*
 * Luennan koneisto: avaustekstin ja päiväkirjan kertojaäänet,
 * lauserajakatkot, häivytykset ja puhujan väistön kirjanpito.
 * Siirretty js/ui.js:stä 17.8.2026 (remontin M6, malli B —
 * docs/moduulirakenne-suunnitelma.md). Funktiot saavat ui-olion
 * ensimmäisenä parametrinaan ja kirjoittavat luentapiirteen kenttiä
 * (ui.luennat, ui.diaryVoice, ui.introVoice, ui.lauseTauot,
 * ui.luentaTauolla, ui.merkintaJatko).
 */

import { kertojaTila, puheVoima } from './aani-ehdokkaat.js';
import { lisaaTaustaVaimennus } from './aani-tausta.js';
import { puheAlkoi, puheLoppui } from './ambience-stream.js';
import {
  lueAaneen, lukijaLukee, lukijaTuettu, pysaytaLukija,
} from './lukija.js';
import { aaniUrl, haeAani, onPeilista, peiliPetti } from './media.js';
import { puheTuettu } from './puhe.js';
import { sfx } from './sound.js';

/*
 * Luennan loppuhäivytys. Aiempi neljännessekunti oli niin lyhyt, että
 * kertoja katkesi töksähtäen (omistajan havainto) — etenkin lyhyessä
 * kertojatilassa, jossa ääni pysäytettiin lauserajalla ilman häivytystä
 * lainkaan. Puolitoista sekuntia riittää pehmentämään lopun ilman että
 * viimeinen sana hukkuu, koska käyrä on aluksi loiva.
 */
const LUENNAN_HAIPYMA_S = 1.5;
/*
 * Nauhoituksen LUONNOLLISEN lopun häivytys on eri asia.
 *
 * Yllä oleva puolitoista sekuntia on oikea silloin, kun luenta
 * katkaistaan kesken tiedoston lauserajalla: siinä häivytys korvaa
 * töksähtävän katkon keskellä puhetta. Nauhoituksen omassa lopussa se
 * on väärin — se alkaa jo puolitoista sekuntia ennen loppua ja nielee
 * viimeisen sanan (omistajan havainto).
 *
 * Lopussa tarvitaan vain sen verran, ettei soittimen pysäytys napsahda.
 *
 * VIISIKYMMENTÄ MILLISEKUNTIA EI RIITTÄNYT. Voimakkuutta säädetään
 * ruudunpäivityksen tahdissa eli noin 16 millisekunnin välein, joten
 * viimeinen säätö osui pahimmillaan kolmasosaan täydestä
 * voimakkuudesta — ja siitä syntyi napsahdus. Se kuului vain osassa
 * äänitteitä (omistajan havainto), koska osa loppuu jo valmiiksi
 * hiljaisuuteen eikä niissä ole mitä napsahtaa.
 *
 * Nyt häivytys on hitusen pidempi ja saavuttaa NOLLAN selvästi ennen
 * tiedoston loppua. Viimeiset parikymmentä millisekuntia ovat
 * hiljaisuutta, ja vasta siinä soitin pysäytetään.
 */
const LOPUN_HAIPYMA_S = 0.12;
/** Kuinka kauan ennen loppua ääni on jo täysin vaiennut. */
const LOPUN_HILJAISUUS_S = 0.025;
/** Pehmennyskäyrä: alkaa hitaasti, jyrkkenee lopussa (ease-in). */
const pehmene = (t) => Math.max(0, Math.min(1, t)) ** 1.8;

/*
 * ── LUENNAN KYTKIN (omistajan tilaus 25.8.2026) ─────────────────────
 *
 * Raamattu (Fokusmoodi, LUENTA): *"Luenta on striimiääni, jonka kytkin
 * on AINA puhekuplan alla painettavissa päälle ja pois."* Kytkin ohjaa
 * ISOISÄN matkakirjamerkintöjen luentaa — pöllön repliikkejä ei lueta
 * koskaan, joten kytkimellä ei ole niihin mitään sanottavaa.
 *
 * Tila on LAITEKOHTAINEN eikä pelitilanteen osa: se asuu omassa
 * localStorage-avaimessaan eikä matkusta pelitallennuksen mukana. Sama
 * kolmiarvoinen kaava kuin fokusmoodilla (js/ui-apurit.js): puuttuva
 * avain tarkoittaa PÄÄLLÄ, ja vain '0' tarkoittaa pois. Kelvoton tai
 * vanha arvo palautuu siis oletukseen eikä jätä peliä puolitilaan.
 *
 * Kytkintä käännetään kortin KAIUTTIMESTA (omistaja 25.8.2026:
 * erillinen liukukytkin poistui; js/ui.js paivitaKaiutinTila). Pois
 * kytkettynä kuvakkeen päällä on vinoviiva, päälle kääntäminen
 * aloittaa ruudulla olevan merkinnän alusta.
 */
const LUENTA_KYTKIN_AVAIN = 'matkakirja-luenta';

/** Onko matkakirjamerkintöjen automaattinen luenta päällä. */
export function luentaKytkinPaalla() {
  try {
    return localStorage.getItem(LUENTA_KYTKIN_AVAIN) !== '0';
  } catch {
    return true; // yksityinen selaus: oletus on päällä
  }
}

/** Kääntää kytkimen ja muistaa tilan seuraavaan istuntoon. */
export function asetaLuentaKytkin(paalla) {
  try {
    if (paalla) localStorage.removeItem(LUENTA_KYTKIN_AVAIN);
    else localStorage.setItem(LUENTA_KYTKIN_AVAIN, '0');
  } catch {
    /* yksityinen selaus: tila jää vain tälle istunnolle */
  }
}

/**
 * Avausteksti luettuna: omistajan ElevenLabsilla tuottama lukuääni
 * (assets/audio/intro-puhe.mp3). Selain ei salli ääntä ennen
 * ensimmäistä kosketusta — silloin puhe alkaa vasta ensimmäisestä
 * napautuksesta. Puuttuva tiedosto ei haittaa: virhe ohitetaan.
 */
export function playIntroVoice(ui) {
  if (!sfx.enabled) return;
  // Vain pitkä kertoja lukee avaustekstin: lyhyt lukee pelkän
  // matkakirjan kuvauksen ja ei kertojaa -tila ei mitään.
  if (kertojaTila() !== 'pitka') return;
  stopIntroVoice(ui);
  const audio = new Audio(aaniUrl('assets/audio/intro-puhe.mp3'));
  audio.volume = puheVoima();
  pehmeaLoppu(ui, audio);
  ui.introVoice = audio;
  merkitsePuhuja(ui, audio);
  audio.play().catch(() => {
    const aloita = () => {
      if (ui.introVoice === audio && ui.game.phase === 'pickstart' && !ui.dead) {
        audio.play().catch(() => {});
      }
    };
    window.addEventListener('pointerdown', aloita, { once: true });
  });
}

export function stopIntroVoice(ui) {
  const vanha = ui.introVoice;
  ui.introVoice = null;
  if (!vanha) return;
  haivytaJaSiivoa(ui, vanha);
}

/**
 * Häivyttää HTMLAudio-äänen pehmeästi ja siivoaa sen perässä —
 * myös puhujan rooli vapautuu, jotta tausta palaa täyteen voimaan.
 * Aiemmin intro-puhe katkesi kuin veitsellä, kun matka alkoi
 * (omistajan palaute 10.8.2026: edellisen näkymän äänten pitää
 * feidautua ulos samalla kun lennon ääni feidautuu sisään).
 *
 * HUOM nimestä: tämä EI saa olla haivytaAani — luokassa on
 * saman niminen luentojen häivytys (pause ilman siivousta, koska
 * kaiutinnappi voi jatkaa samasta kohdasta), ja JavaScriptissä
 * myöhempi metodi ylikirjoittaa aiemman äänettömästi. Juuri niin
 * kävikin (löytyi 10.8.2026): stopIntroVoice sai pause-version,
 * puhujan rooli jäi vapauttamatta ja tausta jäi väistöön.
 */
export function haivytaJaSiivoa(ui, audio, kesto = 600) {
  const alkuVoima = audio.volume;
  const t0 = performance.now();
  const askel = () => {
    const osuus = (performance.now() - t0) / kesto;
    if (osuus >= 1 || audio.paused) {
      audio.pause();
      audio.removeAttribute('src');
      vapautaPuhuja(ui, audio);
      return;
    }
    audio.volume = alkuVoima * (1 - osuus);
    setTimeout(askel, 40);
  };
  askel();
}

/*
 * Soivat äänitepohjaiset luennat isäntineen (avaus, päiväkirja,
 * hihkaisu). Kirjanpito on tässä eikä ui-oliossa kahdesta syystä:
 * taustavahti (js/aani-tausta.js) ei näe ui-oliota, ja sama luenta voi
 * olla käynnissä ilman että se on enää `ui.diaryVoice`. Elinkaari
 * seuraa puhujan roolia: merkitsePuhuja lisää, vapautaPuhuja poistaa.
 */
const soivatLuennat = new Map(); // audio → ui

/**
 * Merkitsee äänen puhujaksi: tausta väistyy niin kauan kuin yksikin
 * puhuu. Vapautus tapahtuu kerran ja vain kerran — 'ended' ja
 * 'error' voivat molemmat laueta, ja kaksinkertainen vapautus
 * nostaisi taustan kesken toisen luennan.
 */
export function merkitsePuhuja(ui, audio) {
  if (!audio || audio.puhujaMerkitty) return;
  audio.puhujaMerkitty = true;
  soivatLuennat.set(audio, ui);
  puheAlkoi();
  const lopeta = () => vapautaPuhuja(ui, audio);
  audio.addEventListener('ended', lopeta);
  audio.addEventListener('error', lopeta);
}

/** Vapauttaa äänen puhujan roolista; turvallista kutsua monta kertaa. */
export function vapautaPuhuja(ui, audio) {
  if (!audio?.puhujaMerkitty) return;
  audio.puhujaMerkitty = false;
  soivatLuennat.delete(audio);
  // Isäntä voi puuttua taustavahdin siivouksessa (js/aani-tausta.js):
  // puhujan rooli on silti vapautettava, muuten tausta jää väistöön.
  ui?.luennat?.delete(audio);
  puheLoppui();
}

/*
 * ── TAUSTALLE MENEVÄ PELI (omistajan tilaus 24.8.2026) ──────────────
 *
 * Äänitteenä soiva kertoja EI JÄÄ TAUOLLE vaan päättyy: nauhoitus on
 * yksi yhtenäinen luenta, ja sen jatkaminen minuuttien päästä keskeltä
 * lausetta olisi oudompaa kuin hiljaisuus. Sama linjaus kuin
 * lukijaäänellä (js/lukija.js): pelaaja käynnistää luennan uudelleen
 * kuuntelunapista.
 *
 * Puhujan rooli on pakko vapauttaa samalla. Pysäytetty äänite ei
 * laukaise enää 'ended'- eikä 'error'-tapahtumaa, ja ilman vapautusta
 * taustan väistö jäisi pysyvästi päälle — sama vika, joka löytyi
 * haivytaLuennasta (ks. sen kommentti).
 */
export function taustaHiljennaLuennat() {
  for (const [audio, isanta] of [...soivatLuennat]) {
    try {
      audio.pause();
      audio.removeAttribute('src');
    } catch {
      /* soitin oli jo purettu */
    }
    if (isanta) {
      if (isanta.diaryVoice === audio) isanta.diaryVoice = null;
      if (isanta.introVoice === audio) isanta.introVoice = null;
      if (isanta.luentaTauolla === audio) isanta.luentaTauolla = null;
    }
    vapautaPuhuja(isanta, audio);
  }
}

lisaaTaustaVaimennus({ hiljenna: taustaHiljennaLuennat });

/**
 * Saapumismerkinnän lukuääni. Soi kerran kun merkintä ilmestyy ja
 * vaikenee, kun tietoruutu vaihtaa aihetta. Puuttuva tiedosto (esim.
 * lauta jolle puhetta ei ole tuotettu) ohitetaan hiljaa.
 * `ekaLauseeseen` pysäyttää toiston ensimmäisen virkkeen jälkeiseen
 * hiljaisuuteen — kaiutinnappi jatkaa samasta kohdasta.
 */
/*
 * Omistajan ehto 4.8.2026: radiotilassa kaupungin matkakirja saa
 * päivittyä, mutta ilman luenta-ääntä. Kaksi ääntä yhtä aikaa on
 * sekasotku. Yksi tarkistus kattaa kaikki kuusi luennan
 * aloituskohtaa, koska ne kaikki kulkevat tästä.
 */
/**
 * MERKINNÄN LUENTA LUKIJAÄÄNELLÄ (omistajan päätös 14.8.2026:
 * ElevenLabs-äänitteet pois käytöstä toistaiseksi, tilalle
 * striimattu ääni).
 *
 * Sama lukija kuin kaiutinnapilla (js/lukija.js), persoona
 * 'merkinnat' ja oma äänisäilö. Tausta väistyy luennan ajaksi kuten
 * äänitteillä: puheAlkoi ennen aloitusta ja puheLoppui lukijan
 * loppukoukusta — koukku laukeaa myös pysäytyksestä ja virheestä,
 * joten tausta ei voi jäädä vaimeaksi.
 *
 * Lyhyttä tilaa (vain ensimmäinen virke) varten kutsuja antaa
 * tekstiksi pelkän ensimmäisen virkkeen ja panee loput talteen
 * ui.merkintaJatko-kenttään — kaiutinnappi jatkaa siitä.
 *
 * @returns {boolean} lähtikö luenta (tai sen ajastus) käyntiin
 */
export function lueMerkinta(ui, teksti, { viive = 0 } = {}) {
  if (ui.radioModuuli && !ui.radioModuuli.luentaSallittu()) return false;
  const puhuttava = String(teksti ?? '').trim();
  if (!puhuttava || !lukijaTuettu()) return false;
  const aloita = () => {
    puheAlkoi();
    const lahti = lueAaneen(puhuttava, ui.factKuuntele, {
      persoona: 'merkinnat',
      sailio: 'merkinnat',
      onLoppu: () => puheLoppui(),
    });
    if (!lahti) puheLoppui();
  };
  if (viive > 0) {
    // Sama hengähdys kuin äänitteillä; merkinnän vaihtuminen kesken
    // odotuksen peruu aloituksen (factKey on jo ehtinyt vaihtua).
    const avain = ui.factKey;
    setTimeout(() => {
      if (ui.factKey === avain) aloita();
    }, viive);
  } else {
    aloita();
  }
  return true;
}

/**
 * KERTOJAN LUENTA LUKIJAÄÄNELLÄ (omistajan päätös 14.8.2026:
 * ElevenLabs-äänitteet pois käytöstä toistaiseksi, tilalle
 * striimattu ääni). Kohtaamisten tervehdykset, löytöhetken
 * repliikit ja tarinakaaren aarretekstit luetaan samalla lukijalla
 * kuin lehdet — persoona 'kertoja' ja kertojan oma äänisäilö,
 * joten vakiotekstit generoidaan kerran ja soivat sen jälkeen
 * säilöistä. Tausta väistyy kuten äänitteillä (puheAlkoi/-Loppui).
 *
 * Sivuvaikutuksena luennan saavat myös kohtaamiset, joille
 * äänitettä ei koskaan nauhoitettu (uudet kaupungit).
 *
 * @returns {boolean} lähtikö luenta (tai sen ajastus) käyntiin —
 *   false pudottaa kutsujan äänitevarapolulle
 */
export function lueKertojana(ui, teksti, { viive = 0, onLoppu = null } = {}) {
  if (ui.radioModuuli && !ui.radioModuuli.luentaSallittu()) return false;
  const puhuttava = String(teksti ?? '').trim();
  if (!puhuttava || !puheTuettu()) return false;
  let peruttu = false;
  let alkoi = false;
  const aloita = () => {
    if (peruttu) return;
    alkoi = true;
    puheAlkoi();
    const lahti = lueAaneen(puhuttava, null, {
      persoona: 'kertoja',
      sailio: 'kertoja',
      onLoppu: () => {
        puheLoppui();
        onLoppu?.();
      },
    });
    if (!lahti) {
      puheLoppui();
      onLoppu?.();
    }
  };
  let ajastin = null;
  if (viive > 0) ajastin = setTimeout(aloita, viive);
  else aloita();
  /*
   * Paluuarvo on PYSÄYTIN — funktiona totuusarvoltaan tosi, joten
   * vanhat `if (tts)` / `!lueKertojana(...)` -tarkistukset toimivat
   * ennallaan. Kutsuja pysäyttää luennan, kun sen isäntänäkymä
   * suljetaan (omistaja 18.8.2026: "puheen tulee lakata samaan
   * aikaan eikä jäädä taustalle jatkamaan") — viiveellä odottava
   * luenta perutaan ennen alkuaan, käynnissä oleva pysäytetään
   * (pysaytaLukija laukoo loppukoukut, joten taustan väistö purkautuu).
   */
  return () => {
    peruttu = true;
    if (ajastin) clearTimeout(ajastin);
    if (alkoi) pysaytaLukija();
  };
}

export function playDiaryVoice(ui, url, { ekaLauseeseen = false, osuus = null, viive = 0 } = {}) {
  stopDiaryVoice(ui);
  if (ui.radioModuuli && !ui.radioModuuli.luentaSallittu()) return;
  if (!url || !sfx.enabled) return;
  /*
   * Luennat tulevat ämpäristä (js/media.js aaniUrl), repon polku on
   * varareitti. Ämpärin pettäessä siirrytään siihen kerran ja
   * merkitään virhe äänipeilin katkaisijalle — sama kahden portaan
   * malli kuin äänimaisemilla ja visamusiikilla.
   */
  const audio = new Audio(aaniUrl(url));
  let varareittiKokeiltu = false;
  audio.addEventListener('error', () => {
    if (varareittiKokeiltu || ui.diaryVoice !== audio) return;
    if (!onPeilista(audio.getAttribute('src'))) return;
    varareittiKokeiltu = true;
    peiliPetti('aanet');
    audio.src = url;
    audio.load();
    audio.play().catch(() => { /* varareittikään ei soi — hiljaisuus */ });
  });
  audio.volume = puheVoima();
  pehmeaLoppu(ui, audio);
  ui.diaryVoice = audio;
  // Kirjanpito kaikista luennoista: pysäytys hiljentää myös sellaisen
  // äänen, joka ei enää ole diaryVoice mutta soi yhä.
  (ui.luennat ??= new Set()).add(audio);
  // Tausta väistyy puheen ajaksi (omistajan havainto: puhetta oli
  // vaikea kuulla). Merkintä tehdään tähän eikä play():n jälkeen,
  // jotta se pariutuu varmasti vapautuksen kanssa myös silloin kun
  // soitto ei koskaan käynnisty.
  merkitsePuhuja(ui, audio);
  if (ekaLauseeseen) {
    lauseTauko(ui, url, osuus).then((raja) => {
      if (ui.diaryVoice !== audio || raja == null) return;
      const vahti = () => {
        if (audio.jatkettu) {
          audio.removeEventListener('timeupdate', vahti);
          return;
        }
        // Häivytys alkaa jo ennen lauserajaa, jotta ääni on hiljainen
        // juuri silloin kun se loppuu — pelkkä pause() katkaisi sen
        // töksähtäen (omistajan havainto).
        if (audio.currentTime >= raja - LUENNAN_HAIPYMA_S) {
          audio.removeEventListener('timeupdate', vahti);
          haivytaAani(ui, audio);
        }
      };
      audio.addEventListener('timeupdate', vahti);
    });
  }
  const aloita = () => {
    audio.play().then(() => {
      // play() on asynkroninen: jos luenta ehti vaihtua tai pysähtyä
      // käynnistyksen aikana, myöhässä herännyt ääni pysäytetään heti —
      // muuten kaksi luentaa soi päällekkäin (omistajan havainto).
      if (ui.diaryVoice !== audio) audio.pause();
    }).catch((virhe) => {
      /*
       * Virhe näkyviin. Aiemmin se niellettiin kokonaan, ja silloin
       * "ääni ei kuulu" -vika ei jätä mitään jälkeä mihinkään.
       * iOS hylkää play():n NotAllowedError-virheellä, jos kutsu ei
       * enää liity käyttäjän eleeseen — sen erottaa nyt latausvirheestä.
       */
      console.warn('luenta ei käynnistynyt:', virhe?.name ?? virhe, url);
      if (ui.diaryVoice === audio) ui.diaryVoice = null;
      // Käynnistymätön luenta ei laukaise elementin omia tapahtumia,
      // mutta kuuntelijat (mm. aarrekortin odotus) tarvitsevat lopun
      // signaalin — muuten ne odottaisivat varmuusrajaansa asti.
      audio.dispatchEvent(new Event('error'));
    });
  };
  // Pieni hengähdys ennen luennan alkua (omistajan toive): kortti ehtii
  // asettua ennen kuin lukija aloittaa. Pysäytys ohittaa odottavan
  // luennan, koska diaryVoice ei enää osoita tähän ääneen.
  if (viive > 0) {
    setTimeout(() => {
      if (ui.diaryVoice === audio) aloita();
    }, viive);
  } else {
    aloita();
  }
  // Kutsuja saa kahvan luentaan: aarrekortti pysyy esillä luennan
  // ajan ja sen ruksi feidaa juuri tämän äänen (playTokenReveal).
  return audio;
}

/**
 * Ensimmäisen virkkeen jälkeisen hengähdyksen paikka äänitteessä.
 * Pelkkä "ensimmäinen hiljaisuus" osui lukijan hengitykseen ja katkaisi
 * virkkeen kesken (omistajan havainto), joten raja valitaan nyt
 * tekstistä lasketun arvion läheltä: ensimmäisen virkkeen osuus koko
 * tekstistä kertoo, missä kohdassa puhetta virkkeen loppu suunnilleen
 * on, ja sitä lähin vähintään 0,3 sekunnin hiljaisuus voittaa.
 * Lasketaan kerran per tiedosto ja muistetaan.
 */
export function lauseTauko(ui, url, osuus = null) {
  ui.lauseTauot ??= new Map();
  const avain = `${url}|${osuus == null ? '' : osuus.toFixed(3)}`;
  if (!ui.lauseTauot.has(avain)) {
    const lupaus = (async () => {
      const ctx = sfx.ensureContext();
      if (!ctx) return null;
      // haeAani hoitaa saman peili-ensin-varareitin kuin soitto (ja
      // merkitsee katkaisijaan), joten lauserajaa ei lasketa eri
      // tiedostosta kuin mitä soitetaan.
      const data = await haeAani(url)
        .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()));
      const buf = await ctx.decodeAudioData(data);
      const kanava = buf.getChannelData(0);
      const ikkuna = Math.floor(buf.sampleRate * 0.05);
      let huippu = 0;
      for (let i = 0; i < kanava.length; i += 16) huippu = Math.max(huippu, Math.abs(kanava[i]));
      const raja = huippu * 0.04;
      // Ikkunoittainen äänekkyys: siitä puheen alku ja loppu sekä
      // puheen sisään jäävät hiljaisuudet.
      const aanekas = [];
      for (let i = 0; i < kanava.length; i += ikkuna) {
        let maksimi = 0;
        const loppu = Math.min(i + ikkuna, kanava.length);
        for (let j = i; j < loppu; j += 4) maksimi = Math.max(maksimi, Math.abs(kanava[j]));
        aanekas.push(maksimi >= raja);
      }
      const eka = aanekas.indexOf(true);
      const vika = aanekas.lastIndexOf(true);
      if (eka < 0) return null;
      const s = 0.05; // yhden ikkunan kesto sekunteina
      const tauot = []; // vähintään 0,3 s hiljaisuuksien alkukohdat
      let alkoi = -1;
      for (let i = eka; i <= vika + 1; i++) {
        if (i <= vika && !aanekas[i]) {
          if (alkoi < 0) alkoi = i;
        } else {
          if (alkoi >= 0 && (i - alkoi) * s >= 0.3) tauot.push(alkoi * s);
          alkoi = -1;
        }
      }
      if (!tauot.length) return null; // yksivirkkeinen — soi kokonaan
      const puheAlku = eka * s;
      const puheLoppu = (vika + 1) * s;
      let valinta = null;
      if (osuus == null) {
        // Ilman tekstiarviota kelpaa ensimmäinen tauko 1,2 s jälkeen.
        valinta = tauot.find((t) => t >= 1.2) ?? null;
      } else {
        // Arvio virkkeen lopusta puheen kestoon sovitettuna — lähin
        // tauko voittaa, jolloin hengitystauko kesken virkkeen häviää
        // aina oikealle virkerajalle.
        const arvio = puheAlku + (puheLoppu - puheAlku) * osuus;
        for (const t of tauot) {
          if (valinta == null || Math.abs(t - arvio) < Math.abs(valinta - arvio)) valinta = t;
        }
      }
      // Tauon alku + pieni hengähdys, jotta sana ehtii loppuun.
      return valinta == null ? null : valinta + 0.15;
    })().catch(() => null);
    ui.lauseTauot.set(avain, lupaus);
  }
  return ui.lauseTauot.get(avain);
}

/**
 * Pehmeä loppu puhetiedostoille: viimeinen neljännessekunti häivytetään
 * ja toisto pysäytetään juuri ennen tiedoston reunaa. ElevenLabsin
 * tiedosto päättyy keskeltä signaalia, ja kova reuna kuului pienenä
 * töksähdyksenä (omistajan havainto etusivulla) — pehmennys tehdään
 * toistossa, joten tiedostoja ei tarvinnut generoida uusiksi.
 */
export function pehmeaLoppu(ui, audio) {
  const perus = audio.volume;
  let rampissa = false;
  const rullaa = () => {
    if (audio.paused || !audio.duration) {
      rampissa = false;
      audio.volume = perus;
      return;
    }
    const jaljella = audio.duration - audio.currentTime;
    /*
     * Ääntä EI pysäytetä ennen aikojaan.
     *
     * Aiemmin soitin pysäytettiin, kun loppuun oli 50 millisekuntia —
     * ja sitä ennen ääni oli jo häivytetty puolentoista sekunnin ajan.
     * Yhdessä ne söivät viimeisen sanan. Nyt nauhoitus soi loppuun
     * asti ja vain aivan viimeinen hetki vaimenee, jottei pysäytys
     * napsahda.
     */
    if (jaljella <= LOPUN_HILJAISUUS_S) {
      // Pysäytys osuu jo vaienneeseen ääneen eikä voi napsahtaa.
      audio.volume = 0;
      audio.pause();
      rampissa = false;
      return;
    }
    if (jaljella < LOPUN_HAIPYMA_S) {
      const matka = (jaljella - LOPUN_HILJAISUUS_S) / (LOPUN_HAIPYMA_S - LOPUN_HILJAISUUS_S);
      audio.volume = perus * Math.max(0, Math.min(1, matka));
    }
    requestAnimationFrame(rullaa);
  };
  // timeupdate on liian harva häivytykseen (~4 krt/s): se vain
  // käynnistää tiheän rampin, kun loppu lähestyy. Puoli sekuntia
  // ennen loppua on riittävä varoaika 50 millisekunnin häivytykselle.
  audio.addEventListener('timeupdate', () => {
    if (rampissa || !audio.duration) return;
    if (audio.duration - audio.currentTime < LOPUN_HAIPYMA_S + 0.5) {
      rampissa = true;
      requestAnimationFrame(rullaa);
    }
  });
}

/**
 * Häivyttää soivan luennan pois annetussa ajassa. Käytetään myös
 * lyhyen kertojan lauserajalla: siellä ääni pysähtyi ennen kesken
 * sanaa, koska pause() tuli ilman häivytystä.
 */
export function haivytaAani(ui, audio, kesto = LUENNAN_HAIPYMA_S * 1000) {
  const perus = audio.volume;
  const t0 = performance.now();
  const askel = (nyt) => {
    if (audio.paused) return;
    const t = Math.min(1, Math.max(0, (nyt - t0) / kesto));
    audio.volume = perus * pehmene(1 - t);
    if (t < 1) requestAnimationFrame(askel);
    else audio.pause();
  };
  requestAnimationFrame(askel);
}

export function stopDiaryVoice(ui) {
  ui.diaryVoice = null;
  ui.luentaTauolla = null;
  // Laitteen lukija on saman kaiuttimen takana kuin generoitu äänite,
  // joten "luenta kiinni" tarkoittaa myös sitä.
  if (lukijaLukee(ui.factKuuntele)) pysaytaLukija();
  // Kaikki luennat kiinni — myös mahdollinen myöhästelijä, joka ei
  // enää ollut diaryVoice mutta soi yhä.
  for (const audio of [...(ui.luennat ?? [])]) {
    audio.pause();
    audio.removeAttribute('src');
    // Vapautus ennen tyhjennystä: muuten laskuri jäisi plussalle eikä
    // tausta palaisi enää koskaan täyteen voimaan.
    vapautaPuhuja(ui, audio);
  }
  ui.luennat?.clear();
}

/**
 * Häivyttää käynnissä olevan luennan pehmeästi pois (nopanheitto
 * keskeyttää tarinan — omistajan toive: ei töksähdystä). Tauolla
 * oleva tai jo hiljainen luenta suljetaan suoraan.
 */
export function haivytaLuenta(ui, kestoMs = 700) {
  const audio = ui.diaryVoice;
  if (!audio || audio.paused) {
    stopDiaryVoice(ui);
    return;
  }
  // Irrotetaan heti, jotta seuraava luenta saa alkaa puhtaalta pöydältä.
  ui.diaryVoice = null;
  ui.luentaTauolla = null;
  const alku = audio.volume;
  const t0 = performance.now();
  const askel = (nyt) => {
    const t = Math.min(1, (nyt - t0) / kestoMs);
    audio.volume = alku * (1 - t);
    if (t < 1 && !audio.paused) {
      requestAnimationFrame(askel);
    } else {
      audio.pause();
      audio.removeAttribute('src');
      ui.luennat?.delete(audio);
      /*
       * Vapautus puhujan roolista, samasta syystä kuin
       * stopDiaryVoicessa: muuten laskuri jää plussalle eikä tausta
       * palaa enää koskaan täyteen voimaan.
       *
       * Tämä puuttui, ja se näkyi juuri kehittäjätilassa (omistajan
       * havainto: "taustaäänet katoavat kun jonkun aikaa hypin
       * kartalla"). Jokainen hyppy kutsuu haivytaLuentaa, ja
       * pysäytetty luenta ei laukaise enää 'ended'- eikä
       * 'error'-tapahtumaa — eli sitä, jonka varassa merkitsePuhujan
       * vapautus muuten on. Yksikin keskeytetty luenta jätti taustan
       * pysyvästi puheen alle (0,25), eikä laskuri palannut nollaan
       * enää istunnon aikana.
       *
       * Vasta häivytyksen päätteeksi eikä heti alussa: tausta nousee
       * silloin kun luenta oikeasti vaikenee, ei sen päälle.
       */
      vapautaPuhuja(ui, audio);
    }
  };
  requestAnimationFrame(askel);
}
