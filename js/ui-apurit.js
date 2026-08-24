/*
 * UI:n apurit: puhtaat DOM- ja tekstiapufunktiot, ikonikirjasto,
 * alkuanimaation kehysmatematiikka ja pienet selainpalvelut
 * (esilataus, linssivalinnan tallennus). Siirretty sanatarkasti
 * js/ui.js:stä 17.8.2026 (moduuliremontin M2,
 * docs/moduulirakenne-suunnitelma.md) — ei pelitilariippuvuuksia.
 */

import { HUUDAHDUKSET } from './aani-ehdokkaat.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { asetaKuva } from './media.js';
import { tokenIconSvg } from './mapart.js';
import { fetchImage, fetchSummary } from './wiki.js';
import { OMAT_TIIVISTELMAT } from './packs/omat-tiivistelmat.js';

// Tapahtumakuplien kestot (siirretty ui.js:stä M3:ssa: myös
// vertailutila tarvitsee oletuskeston ilman kiertotuontia).
export const TOAST_MS = { die: 950, default: 1200 };

// Pyyhkäisy: osuus silmukasta, jonka aikana valmis jälki häipyy pois
// ennen kuin se piirtyy uudelleen. Ilman häivytystä koko reitti
// katoaisi yhdellä ruudulla, ja se näkyisi nykäyksenä.
export const JALJEN_PYYHKAISY = 0.06;

/*
 * SILMUKAN AVAINHETKET.
 *
 * Yksi kierros on `kesto` sekuntia, ja siitä matkaan käytetään
 * `ikkuna`n verran: punaisen reitin kaksi puoliskoa vuorottelevat
 * samassa kierrossa, joten kumpikin saa siitä oman osuutensa ja
 * odottaa lopun näkymättömänä. `kulku` on osuus matkasta ja `nakyy`
 * kerroin peittävyydelle; reunapehmennys estää sen, että piste
 * ilmestyisi ja katoaisi napsahtaen.
 */
const ALKU_REUNA = 0.06;
export function alkuKehykset(ikkuna) {
  return [
    { t: 0, kulku: 0, nakyy: 0 },
    { t: ikkuna * ALKU_REUNA, kulku: ALKU_REUNA, nakyy: 1 },
    { t: ikkuna * (1 - ALKU_REUNA), kulku: 1 - ALKU_REUNA, nakyy: 1 },
    { t: ikkuna, kulku: 1, nakyy: 0 },
    { t: 1, kulku: 1, nakyy: 0 },
  ];
}

/** Avainhetkien väliltä luettu arvo (lineaarinen, kuten SMIL itsekin). */
function alkuArvoKohdassa(kehykset, t) {
  for (let i = 1; i < kehykset.length; i++) {
    const a = kehykset[i - 1];
    const b = kehykset[i];
    if (t > b.t) continue;
    const osa = b.t > a.t ? (t - a.t) / (b.t - a.t) : 0;
    return {
      t,
      kulku: a.kulku + (b.kulku - a.kulku) * osa,
      nakyy: a.nakyy + (b.nakyy - a.nakyy) * osa,
    };
  }
  const viim = kehykset[kehykset.length - 1];
  return { t, kulku: viim.kulku, nakyy: viim.nakyy };
}

/*
 * Sauma on se hetki, jossa arvo hyppää kierroksen lopusta sen alkuun.
 * SMIL kulkee avainhetkestä toiseen lineaarisesti, joten hyppy tehdään
 * kahdella lähes päällekkäisellä hetkellä. Se osuu aina kohtaan, jossa
 * peittävyys on nolla, eikä sitä siksi näe.
 */
const ALKU_SAUMA = 0.0004;

/**
 * Kierretään avainhetket alkamaan vaiheesta `vaihe` (0…1 kierroksesta).
 *
 * NEGATIIVISTA VIIVETTÄ EI KÄYTETÄ. CSS-versiossa jälki jäi kärjestä
 * jälkeen negatiivisella animation-delaylla, ja SMIL osaa saman tempun
 * negatiivisella begin-arvolla — mutta juuri ajastuksen erikoistapaukset
 * ovat WebKitin SMIL-toteutuksessa se osa, johon ei kannata nojata, kun
 * korjataan vikaa jota ei pääse itse toistamaan. Vaihe leivotaan siis
 * suoraan avainhetkiin: jokainen animaatio alkaa nollasta ja on silti
 * omassa kohdassaan kierrosta.
 */
export function kierraKehykset(kehykset, vaihe) {
  const p = ((vaihe % 1) + 1) % 1;
  if (p < ALKU_SAUMA || p > 1 - 2 * ALKU_SAUMA) return kehykset.map((k) => ({ ...k }));
  const alku = alkuArvoKohdassa(kehykset, p);
  const uudet = [{ ...alku, t: 0 }];
  // Kierroksen loppuosa ensin: siitä vaihe alkaa.
  for (const k of kehykset) if (k.t > p && k.t < 1) uudet.push({ ...k, t: k.t - p });
  uudet.push({ ...alkuArvoKohdassa(kehykset, 1), t: 1 - p });
  uudet.push({ ...alkuArvoKohdassa(kehykset, 0), t: 1 - p + ALKU_SAUMA });
  // ...ja sen jälkeen kierroksen alkuosa.
  for (const k of kehykset) if (k.t > 0 && k.t < p) uudet.push({ ...k, t: k.t + (1 - p) });
  uudet.push({ ...alku, t: 1 });
  uudet.sort((a, b) => a.t - b.t);
  // keyTimes on oltava kasvava ja päätyttävä ykköseen, tai koko
  // animaatio hylätään. Sattumalta päällekkäin osuvat hetket
  // erotetaan toisistaan, ja viimeinen naulataan ykköseen.
  let edellinen = -1;
  for (const k of uudet) {
    if (k.t <= edellinen) k.t = edellinen + ALKU_SAUMA / 4;
    edellinen = Math.min(k.t, 1);
    k.t = edellinen;
  }
  uudet[uudet.length - 1].t = 1;
  return uudet;
}

/**
 * Jäljen avainhetket: kuinka monta pätkää reitistä on piirretty milläkin
 * hetkellä, kun silmukka luetaan reitin omasta lähtöhetkestä alkaen.
 *
 * `kulku` on nyt piirretty osuus (0…1) eikä kärjen paikka, ja siitä
 * poimitaan valmis katkoviivakuvio. Nimi on sama, koska kierto
 * (kierraKehykset) käsittelee molempia samalla koodilla — ja juuri sen
 * takia arvon on oltava vakio siinä kohdassa, josta kierretään.
 *
 * Silmukka: pätkät kasvavat matkan ajan (0…ikkuna), valmis reitti jää
 * lepäämään näkyviin, häipyy pyyhkäisyn ajan ja on kadonnut siinä
 * vaiheessa kun kuvio palaa tyhjäksi. Kuvion nollaus tapahtuu siis
 * peittävyyden ollessa nolla, eikä sitä näe.
 */
export function jaljenKehykset(ikkuna, jaksoja) {
  const kehykset = [];
  for (let i = 0; i <= jaksoja; i++) {
    kehykset.push({ t: (ikkuna * i) / jaksoja, kulku: i / jaksoja, nakyy: 1 });
  }
  kehykset.push({ t: 1 - JALJEN_PYYHKAISY, kulku: 1, nakyy: 1 });
  kehykset.push({ t: 1 - ALKU_SAUMA, kulku: 1, nakyy: 0 });
  kehykset.push({ t: 1, kulku: 0, nakyy: 0 });
  return kehykset;
}

/*
 * KARUSELLIN ESILATAUS (omistajan tilaus 14.8.2026): "kun sivulle
 * aukeaa mikä tahansa kuvakaruselli, kuvat pitäisi ladata taustalla
 * heti valmiiksi, jotta kuvien selaus olisi mahdollisimman nopeaa."
 *
 * Selain lataa kuvan heti kun Image-oliolle annetaan osoite; olio
 * pidetään joukossa latauksen ajan, ettei keräilijä pääse perumaan
 * kesken jäänyttä latausta. Sama osoite esiladataan vain kerran per
 * istunto — karusellit avataan usein uudelleen, eikä välimuistissa
 * jo olevaa kannata edes pyytää. Muistikirjanpito katkaistaan tuhannen
 * osoitteen kohdalla; se on kirjanpidon raja, ei latauksen.
 */
const esiladatut = new Set();
const esilataukset = new Set();
export function esilataaKuvat(osoitteet) {
  for (const osoite of osoitteet ?? []) {
    if (!osoite || esiladatut.has(osoite)) continue;
    if (esiladatut.size >= 1000) esiladatut.clear();
    esiladatut.add(osoite);
    const kuva = new Image();
    kuva.decoding = 'async';
    esilataukset.add(kuva);
    const valmis = () => esilataukset.delete(kuva);
    kuva.addEventListener('load', valmis, { once: true });
    kuva.addEventListener('error', valmis, { once: true });
    kuva.src = osoite;
  }
}

/**
 * Sama lehtisivu ilman kuvatiedostoja.
 *
 * Käytetään vain esikatselupiirrossa (ks. maalehdenEtusivuRunko):
 * kuvaton kopio tuottaa saman luettavan tekstin, koska lukija ohittaa
 * IMG-elementit ja kuvatekstit, mutta piirto ei silloin lataa
 * kymmentä kuvaa esilatausjonon ohi.
 */
export function kuvitukseton(kategoria) {
  const riisu = (kohde) => {
    const kopio = { ...kohde };
    delete kopio.tiedosto;
    delete kopio.galleria;
    return kopio;
  };
  const sivu = { ...kategoria };
  if (sivu.nostot) sivu.nostot = sivu.nostot.map(riisu);
  if (sivu.lista) {
    sivu.lista = sivu.lista.map((rivi) => ({ ...rivi, kohteet: (rivi.kohteet ?? []).map(riisu) }));
  }
  return sivu;
}

// Tapahtumakuplien äänet.
export const EVENT_SOUND = { fare: 'ferry', flight: 'flight', aid: 'coin', stuck: 'stuck' };

// Paljastusruudun alateksti laattatyypeittäin.
// (Matkustustapojen nimilista TRAVEL_LABEL poistui 13.8.2026: sitä
// luki vain kartan päällä kellunut tilarivi, jota ei enää ole.)

/*
 * Laatat, jotka ovat aarre: unohdettu aarre ja kolme jalokiveä. Erottelu
 * on iOS-kuoren juhlatärähdystä varten (js/natiivi.js) — muut laatat
 * ovat löytöjä, mutta eivät sitä hetkeä, jota varten juhla on olemassa.
 */
export const AARRELAATAT = new Set(['star', 'ruby', 'emerald', 'topaz']);

export const REVEAL_SUB = {
  star: 'Vie unohdettu aarre kotiin ja voitat pelin!',
  horseshoe: 'Voit voittaa, jos ehdit kotiin ensimmäisenä',
  robber: 'Rosvo haastaa kaksintaisteluun!',
  empty: 'Isoisän merkintä oli vanhentunut — täältä ei löytynyt mitään',
  // Ilman tätä riviä taikalasin alle tulisi "+0 puntaa": laattatyypin
  // arvo on nolla, koska linssi ei ole rahaa (js/tokens.js).
  linssi: 'Uusi linssi kartalle — katso maailmaa toisin',
};

/*
 * Nuoren herran huudahdus paljastushetkellä (omistajan tilaus
 * 9.8.2026): lyhyt spontaani repliikki heti kun aarre kääntyy esiin,
 * ENNEN varsinaista cliffhanger-tekstiä. Sävy kasvaa aarteen arvon
 * mukana — pikkulöytö kuitataan, suurlöytö vie sanat. Arvotaan joka
 * kerta, jotta toisto ei kulu.
 */

/**
 * Arvo huudahdus laattatyypin mukaan; muille kuin aarteille ei
 * mitään. Palauttaa tekstin JA sitä vastaavan äänitiedoston — sama
 * repliikki luetaan ja kirjoitetaan (omistajan tarkennus 10.8.2026:
 * "Hihkaisu saisi olla sama luettuna ja kirjoitettuna"). Tiedostot
 * generoi tools/generoi-hihkaisut.mjs täsmälleen tästä taulusta.
 */
export function arvoHuudahdus(type, token) {
  const avain = type === 'star' ? 'star' : token.value;
  const lista = HUUDAHDUKSET[avain];
  if (!lista) return null;
  const i = Math.floor(Math.random() * lista.length);
  return { teksti: lista[i], tiedosto: `assets/audio/huudahdus-${avain}-${i + 1}.mp3` };
}

/*
 * Aarrekuvan osoitepari asetaKuvalle. AI-generoidut aarrekuvat ovat
 * repon omassa assets/aarteet-kansiossa — ne ladataan suoraan, ilman
 * peiliä tai Commons-varareittiä, joita niillä ei ole. Commons-nimi
 * (ilman assets-alkua) kulkee entistä peili + Commons -reittiä, jos
 * jokin lauta vielä sellaista käyttää.
 */
export function aarrekuvanOsoitteet(kuva) {
  if (kuva.startsWith('assets/')) return [kuva, null];
  return [valokuvaUrl(kuva, 640), valokuvaVara(kuva, 640)];
}

/*
 * Aarteen pikkuikoni: tarinallinen aarrekuva pyöreäksi rajattuna
 * aina, kun laattatyypillä on kuva (omistajan päätös 10.8.2026:
 * vanhat Afrikan tähti -tyyliset jalokivi-ikonit pois kaikkialta).
 * token on VALMIIKSI RATKAISTU näyttötieto (game.aarreTyyppi /
 * aarreMantereella) — maailmankartalla se on löytömantereen aarre.
 * Piirrosikoni jää varasoluksi laatoille, joilla ei ole kuvaa
 * (kenkä, rosvo, linssi; Suomi ja Istanbul) — sekä tilanteeseen,
 * jossa kuva ei lataudu.
 */
export function aarreIkoni(token, type, size) {
  const kuva = token?.kuva;
  if (!kuva) return tokenIconSvg(type, size);
  const img = document.createElement('img');
  img.className = 'token-icon aarre-ikoni';
  img.width = size;
  img.height = size;
  img.alt = token.name ?? '';
  const [osoite, vara] = aarrekuvanOsoitteet(kuva);
  asetaKuva(img, osoite, vara, () => img.replaceWith(tokenIconSvg(type, size)));
  return img;
}

/*
 * Valittu linssi on laitteen katseluasetus, ei pelin tapahtuma.
 *
 * Siksi se ei kuulu pelitallennukseen vaan omaan avaimeensa kuten
 * äänet ja kertoja (docs/moduulit/linssit.md luku 5.3). Kelvoton tai
 * omistamaton arvo ohitetaan hiljaa: tallennus voi olla vanhalta
 * versiolta, jossa linssi oli toisen niminen.
 */
const LINSSI_AVAIN = 'matkakirja-linssi';

export function tallennettuLinssi() {
  try {
    return localStorage.getItem(LINSSI_AVAIN);
  } catch {
    return null; // yksityinen selaus
  }
}

export function tallennaLinssi(tunnus) {
  try {
    if (tunnus) localStorage.setItem(LINSSI_AVAIN, tunnus);
    else localStorage.removeItem(LINSSI_AVAIN);
  } catch {
    /* yksityinen selaus: valinta jää vain tälle istunnolle */
  }
}

/**
 * Ensimmäinen virke lainaus- ja päätösmerkkeineen; loput erikseen.
 * Päiväkirjan luennassa ääneen luetaan vain tämä ja teksti lihavoidaan.
 */
export function ekaLause(teksti) {
  const m = /^[\s\S]*?[.!?…](?:["»”])?(?=\s|$)/.exec(teksti);
  if (!m) return { eka: teksti, loput: '' };
  return { eka: m[0], loput: teksti.slice(m[0].length).trimStart() };
}

/*
 * Lehden etusivun leipäteksti kappaleina ja maltillisin lihavoinnein
 * (omistaja 20.8.2026: "Kokeile jakaa pariin kappaleeseen ja lisäksi
 * voi käyttää boldausta tarvittaessa"). Kappaleraja on tyhjä rivi
 * (jaaKappaleiksi) ja lihavointi merkitään tekstissä **näin** —
 * DOM rakennetaan käsin, ei innerHTML:ää.
 */
export function piirraLeipateksti(el, teksti) {
  el.replaceChildren();
  for (const kappale of jaaKappaleiksi(teksti)) {
    const p = document.createElement('p');
    const palat = kappale.split(/\*\*/);
    palat.forEach((pala, i) => {
      if (!pala) return;
      if (i % 2 === 1) {
        const b = document.createElement('strong');
        b.textContent = pala;
        p.appendChild(b);
      } else {
        p.appendChild(document.createTextNode(pala));
      }
    });
    el.appendChild(p);
  }
}

export function html(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/*
 * Lähdemerkintä uudelleenkirjoitetulle tekstille (omistajan linjaus
 * 13.8.2026: "Wikipedia on käytetty lähteenä, mutta tekstit on sen
 * pohjalta kirjoitettu uudestaan — miten sen merkitsisi?").
 *
 * Pelkkä "Wikipedia" väitti tekstiä lainatuksi, vaikka jutut ovat
 * pelin omaa kirjoitusta Wikipedian tietojen pohjalta — faktat eivät
 * ole tekijänoikeuden alaisia, joten oma teksti ei tarvitse CC BY-SA
 * -merkintää, vain reilun lähdemaininnan. Sanatarkat wiki-otteet
 * (tiivistelmät, "Wikipedia (CC BY-SA)" -merkinnät) kulkevat tästä
 * läpi muuttumattomina: niissä lisenssimaininta on lisenssin ehto.
 */
const OMA_TEKSTI_LAHDE = 'Matkakirjan oma teksti · lähteenä Wikipedia';
export function lahdemerkinta(lahde) {
  return lahde === 'Wikipedia' ? OMA_TEKSTI_LAHDE : lahde;
}

/**
 * Pehmeä käyrä pisteiden läpi (Catmull–Rom kuutiollisina Bézier-paloina).
 *
 * Merireittien välipisteet ovat harvassa siellä missä vettä riittää ja
 * tiheässä salmissa. Suorat viivat niiden välillä näyttäisivät
 * kulmikkailta juuri avomerellä, jossa reitin pitäisi kaartaa. Käyrä
 * kulkee jokaisen annetun pisteen kautta, joten rannikot pysyvät
 * kierrettyinä.
 */
function pehmeatJaksot(pisteet) {
  const p = (i) => pisteet[Math.min(pisteet.length - 1, Math.max(0, i))];
  const jaksot = [];
  for (let i = 0; i < pisteet.length - 1; i++) {
    const [x0, y0] = p(i - 1);
    const [x1, y1] = p(i);
    const [x2, y2] = p(i + 1);
    const [x3, y3] = p(i + 2);
    // Kerroin 1/6 on Catmull–Romin vakiomuunnos Bézier-ohjauspisteiksi.
    jaksot.push({
      a: [x1, y1],
      c1: [x1 + (x2 - x0) / 6, y1 + (y2 - y0) / 6],
      c2: [x2 - (x3 - x1) / 6, y2 - (y3 - y1) / 6],
      b: [x2, y2],
    });
  }
  return jaksot;
}

/**
 * Onko piste monikulmion sisällä? Säteenheitto vaakasuoraan.
 *
 * Klassinen algoritmi lyhimmässä muodossaan: lasketaan monta kertaa
 * pisteestä oikealle lähtevä säde ylittää monikulmion sivun. Pariton
 * määrä = sisällä. Reunatapaus (piste tasan sivulla) ei ole tässä
 * merkityksellinen — kutsuja kysyy "missä maassa tämä nimi on", eikä
 * rannikon pikselintarkka puoli ratkaise mitään.
 *
 * Rengas on lista [x, y] -pareja pelilaudan koordinaateissa.
 */
export function pisteMonikulmiossa(x, y, rengas) {
  let sisalla = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
    const [xi, yi] = rengas[i];
    const [xj, yj] = rengas[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      sisalla = !sisalla;
    }
  }
  return sisalla;
}

export function pehmeaPolku(pisteet) {
  if (pisteet.length < 2) return '';
  const jaksot = pehmeatJaksot(pisteet);
  const luvut = [`M${jaksot[0].a[0]},${jaksot[0].a[1]}`];
  for (const { c1, c2, b } of jaksot) {
    luvut.push(`C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} `
      + `${b[0].toFixed(1)},${b[1].toFixed(1)}`);
  }
  return luvut.join(' ');
}

/**
 * Saman käyrän pituus laskettuna itse, EI selaimen getTotalLengthilla.
 *
 * WebKit palauttaa geometriakyselyihin nollan elementille, jota ei
 * piirretä (kerros syntyy drawBoardissa ennen kuin body saa
 * data-mode="start", eli se on siinä hetkessä piilotettu). Nolla
 * pituus olisi tehnyt katkoviivan mitoista ja jäljen viiveistä
 * roskaa juuri sillä selaimella, jolla vika ilmeni — ja hiljaa,
 * ilman virheilmoitusta. Sama luku lasketaan nyt kaikissa
 * selaimissa samasta kaavasta.
 *
 * Kaari mitataan murtoviivana: 24 osaa jaksoa kohti riittää tämän
 * kokoisilla kaarilla alle promillen virheeseen, eikä tarkempi
 * mittaus näkyisi ruudulla mitenkään.
 */
export function polunPituus(pisteet) {
  if (pisteet.length < 2) return 0;
  const OSIA = 24;
  let summa = 0;
  for (const { a, c1, c2, b } of pehmeatJaksot(pisteet)) {
    let edellinen = a;
    for (let k = 1; k <= OSIA; k++) {
      const t = k / OSIA;
      const u = 1 - t;
      const kohta = [0, 1].map((i) => u * u * u * a[i] + 3 * u * u * t * c1[i]
        + 3 * u * t * t * c2[i] + t * t * t * b[i]);
      summa += Math.hypot(kohta[0] - edellinen[0], kohta[1] - edellinen[1]);
      edellinen = kohta;
    }
  }
  return summa;
}

/*
 * Onko valokuva niin vanha, että se näytetään mustavalkoisena?
 *
 * Omistajan toive: "matkakirjan kuvat pitäisi pitää värillisinä jos ne
 * ovat uusia. vain oikeasti vanhat kuvat saisivat olla mustavalkoisia,
 * jotta kävisi helpommin ilmi, kumpia kuvat ovat."
 *
 * Aiemmin harmaasävy oli CSS-sääntö, joka koski kaikkia postikortin
 * kuvia. Silloin nykypäivän kuva näytti yhtä vanhalta kuin sadan
 * vuoden takainen, ja koko ennen/nyt-asetelma katosi.
 *
 * Ratkaisu luetaan AINEISTOSTA eikä kortin paikasta: jokaisella
 * kuvalla on vuosi-kenttä, ja se kertoo totuuden silloinkin, kun
 * pinon keskellä on 1924 otettu lisäkuva.
 *
 * Raja on 1960, sama kuin tools/tarkista-kuvaiat.mjs:ssä. Väri­kuvaus
 * yleistyi 1950-luvulla, joten sitä vanhempi kuva on käytännössä aina
 * mustavalkoinen jo valmiiksi — harmaasävy ei siis muuta sitä miltä
 * kuva näyttää, vaan siistii skannauksen kellastumat pois.
 */
const VARIKUVAN_RAJA = 1960;

export function vuosiluku(teksti) {
  const m = /\d{4}/.exec(String(teksti ?? ''));
  return m ? Number(m[0]) : null;
}

export function onVanhaKuva(kuvaTiedot, oletusVanha = false) {
  const v = vuosiluku(kuvaTiedot?.vuosi);
  // Tuntematon vuosi: luotetaan kutsujan tietoon siitä, mikä kuva on
  // kyseessä. Pelkkä arvaus värittäisi historiakuvan tai
  // harmaannuttaisi nykykuvan, ja molemmat valehtelisivat.
  if (v === null) return oletusVanha;
  return v < VARIKUVAN_RAJA;
}

/**
 * Merkkijono turvalliseksi innerHTML:ään.
 *
 * Radioasemien nimet tulevat generoidusta paketista, joka on koottu
 * Radio Browserin avoimesta hakemistosta — siellä on ampersandeja ja
 * lainausmerkkejä ("Rádio & Televisão", 'FM 83.4"'). Ilman suojausta
 * ne rikkoisivat napin rakenteen.
 */
export function suojaa(teksti) {
  return String(teksti)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/*
 * Soita- ja pysäytä-merkit ääninappeihin.
 *
 * Aiemmin napissa oli kaiutinkuvake, joka pysyi samana soi tai ei —
 * vain teksti vaihtui. Kolmio ja neliö kertovat tilan yhdellä
 * silmäyksellä, ja ne ovat samat merkit kuin kaikissa soittimissa,
 * joten niitä ei tarvitse opetella.
 *
 * Piirretään samalla kynällä kuin kartta: pelkkä ääriviiva nykyisellä
 * tekstivärillä (ks. VIIVA_IKONIT alla).
 */
export const MERKKI_SOITA = '<svg class="merkki" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">'
  + '<path d="M8.4 5.8 18 12l-9.6 6.2z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
  + '</svg>';
export const MERKKI_SEIS = '<svg class="merkki" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">'
  + '<rect x="7" y="7" width="10" height="10" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.7"/>'
  + '</svg>';

/*
 * Aiheliuskojen kuvakkeet.
 *
 * Omistajan toive: "liuskan otsikot ehkä kuvakkeina että mahtuu yhteen
 * riviin." Yhdeksän suomenkielistä sanaa vie puhelimella kolme riviä;
 * yhdeksän kuvaketta mahtuu yhdelle.
 *
 * Piirretty samalla ohuella kynällä kuin kartta ja muut viivaikonit:
 * pelkkä ääriviiva nykyisellä tekstivärillä, ei täyttöä.
 *
 * Jokaisella liuskalla on silti nimi — se on napin aria-label ja
 * title, ja se lukee avatun liuskan alla otsikkona. Pelkkä kuvake
 * ilman nimeä jättäisi arvailun varaan, ja arvailu on sitä
 * todennäköisempää mitä pienempi kuvake on.
 */
export const AIHE_IKONIT = {
  historia: '<path d="M7 3.6h10M7 20.4h10M8 3.6c0 4 4 5.6 4 8.4s-4 4.4-4 8.4M16 3.6c0 4-4 5.6-4 8.4s4 4.4 4 8.4"/>',
  kuvataide: '<path d="M4.4 19.6 14 10l1.9 1.9-9.6 9.6zM4.4 19.6l-.9 2.9 2.9-.9"/><path d="m15.9 8.1 2.4-2.4a1.7 1.7 0 0 1 2.4 2.4l-2.4 2.4z"/>',
  kirjallisuus: '<path d="M5 20.5c3-7.5 8-12.5 14.5-16.5-1 7-4.5 12-9.5 15"/><path d="M5 20.5c1.5-1 3.5-1.5 5-1.5"/>',
  musiikki: '<path d="M9 18.5V6.2l9-1.7v11.3"/><circle cx="6.8" cy="18.6" r="2.2"/><circle cx="15.8" cy="15.9" r="2.2"/>',
  ruoka: '<path d="M3.5 11.5h17c0 4.4-3.8 7-8.5 7s-8.5-2.6-8.5-7z"/><path d="M2.5 21h19"/><path d="M9 8.4c0-1.3 1.2-1.6 1.2-2.9M12 8.4c0-1.3 1.2-1.6 1.2-2.9M15 8.4c0-1.3 1.2-1.6 1.2-2.9"/>',
  luonto: '<path d="M12 21c0-6.5 2.5-11 8-13.5C20 14 16.5 19 12 21z"/><path d="M12 21C12 14.5 9.5 10 4 7.5 4 14 7.5 19 12 21z"/><path d="M12 21v-6"/>',
  tiede: '<path d="M9.5 3.5h5M10.5 3.5v6L5.5 19a1.6 1.6 0 0 0 1.4 2.4h10.2A1.6 1.6 0 0 0 18.5 19l-5-9.5v-6"/><path d="M7.8 15.4h8.4"/>',
  nykytaide: '<path d="M4 20.5 12 4l8 16.5z"/><path d="M8.2 13h7.6"/>',
  huumori: '<path d="M3.6 8.4c2.8-1.6 5.6-1.6 8.4 0 2.8-1.6 5.6-1.6 8.4 0-.4 5.2-2.6 8.4-4.8 8.4-1.6 0-2.6-1.4-3.6-1.4s-2 1.4-3.6 1.4c-2.2 0-4.4-3.2-4.8-8.4z"/><circle cx="8" cy="11.4" r="1"/><circle cx="16" cy="11.4" r="1"/>',
  // Varaliuska kaupungeille, joilla on vain litteä nostolista.
  elama: '<circle cx="12" cy="12" r="4.2"/><path d="M12 3.4v2.4M12 18.2v2.4M3.4 12h2.4M18.2 12h2.4M5.9 5.9l1.7 1.7M16.4 16.4l1.7 1.7M18.1 5.9l-1.7 1.7M7.6 16.4l-1.7 1.7"/>',
  // Yleiskuvake aiheelle, jolle ei ole omaa: kirjanmerkki. Ilman tätä
  // tuntematon aihe-id piirtyisi leveänä tekstinappina ja rikkoisi
  // yhden rivin kuvakerivin.
  muu: '<path d="M7 3.6h10v16.8l-5-3.4-5 3.4z"/>',
};

/**
 * Toimintonappien viivaikonit: emoji erottui kartan mustepiirroksesta,
 * joten ikonit piirretään samalla kynällä kuin kartta — pelkkä ääriviiva
 * nykyisellä tekstivärillä. Nopan silmät ovat ainoa täytetty muoto.
 */
export const VIIVA_IKONIT = {
  saapas: '<path d="M7 3.5h4.4v8.2c0 .9.6 1.7 1.5 2l4.8 1.6c1.4.5 2.3 1.3 2.3 2.4 0 .8-.6 1.4-1.4 1.4H8.6c-.9 0-1.6-.7-1.6-1.6z"/><path d="M7 6h4.4M7 8.2h4.4M4 20.6h16.5"/>',
  purje: '<path d="M11 5.4 6 13.6h5zM13 4.2l5.6 9.4H13z"/><path d="M4.6 16.2h14.8l-2 3.4H6.6zM12 13.6v2.6"/>',
  suurennuslasi: '<circle cx="9.8" cy="9.8" r="5.6"/><path d="M13.9 13.9 20 20"/>',
  /*
   * Silmälasit linssivalitsimelle. Suurennuslasi oli siinä ennen, mutta
   * se on jo Tutki-napissa — sama kuvake kahdessa eri toiminnossa on
   * pahempi kuin osuva ja tylsä (omistaja: "suurennuslasikuvake on jo
   * toisessa napissa"). Lasit sopivat myös nimeen: linssit ovat pelissä
   * TAIKALASIT, eivät suurennuslaseja.
   */
  taikalasit: '<circle cx="6.9" cy="13.6" r="3.5"/><circle cx="17.1" cy="13.6" r="3.5"/>'
    + '<path d="M10.4 13.2c1-.8 2.2-.8 3.2 0"/>'
    + '<path d="M3.5 12.2 2.1 9.2M20.5 12.2 21.9 9.2"/>',
  /*
   * VARUSTEET: matkareppu läppineen ja solkineen.
   *
   * Valikon nimi vaihtui taikalaseista varusteiksi (omistaja 5.8.2026),
   * ja kuvakkeen oli vaihduttava mukana: lasit ovat yksi väline, ja
   * valikossa on jo radio ja kartta-aiheiset linssit. Reppu on se, mistä
   * välineet otetaan — sama esine kuin pelin matkalaukku mutta selässä,
   * eli se ei sekoitu ylärivin kukkaroon.
   *
   * Ei kompassia: se on jo kartan piirroksessa ja omana ikoninaan.
   */
  varusteet: '<path d="M9.2 8.4V6.9a2.8 2.8 0 0 1 5.6 0v1.5"/>'
    + '<rect x="4.6" y="8.4" width="14.8" height="12" rx="3.4"/>'
    + '<path d="M4.7 14.6h14.6"/>'
    + '<rect x="10.4" y="13.1" width="3.2" height="3.8" rx="1.1"/>',
  /*
   * SEEPIAPÖLLÖ. Sama piirros kuin pöllönapissa (js/pollo.js
   * POLLO_IKONI), mutta ilman <svg>-kuorta — tässä sarjassa kuvakkeet
   * ovat pelkkiä polkuja, ja viivaIkoni() kääräisee ne.
   *
   * Kaksoiskappale on tarkoituksellinen: js/pollo.js ei tuo tätä
   * tiedostoa, ja niputettu yhden tiedoston versio (MODULES) latoisi
   * kehäriippuvuuden. Piirros on lyhyt ja muuttumaton; jos se joskus
   * muuttuu, molemmat on päivitettävä.
   *
   * Käyttö: matkalaukun tietäjäpisterivi (omistajan tilaus 18.8.2026)
   * — pöllö on se, joka onnittelee tason noususta, joten sen kuvake
   * kuuluu samalle riville.
   */
  pollo: '<path d="M6.4 5.2 8.4 7.6"/><path d="M17.6 5.2 15.6 7.6"/>'
    + '<path d="M12 3.7c3.3 0 5.7 2.6 5.7 6.3 0 5.1-2.3 8.5-5.7 8.5s-5.7-3.4-5.7-8.5c0-3.7 2.4-6.3 5.7-6.3z"/>'
    + '<circle cx="9.6" cy="9.5" r="1.9"/><circle cx="14.4" cy="9.5" r="1.9"/>'
    + '<circle class="taytto" cx="9.6" cy="9.5" r="0.75"/>'
    + '<circle class="taytto" cx="14.4" cy="9.5" r="0.75"/>'
    + '<path d="M12 11.3 11 13.1h2z"/>'
    + '<path d="M8.7 14.7c1 .9 1.9 1.3 3.3 1.3s2.3-.4 3.3-1.3"/>'
    + '<path d="M9.4 18.4v1.6M14.6 18.4v1.6"/>'
    + '<path d="M4.4 20.2h15.2"/>',
  noppa: '<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="3.2"/><g class="taytto"><circle cx="8.2" cy="8.2" r="1.25"/><circle cx="15.8" cy="8.2" r="1.25"/><circle cx="12" cy="12" r="1.25"/><circle cx="8.2" cy="15.8" r="1.25"/><circle cx="15.8" cy="15.8" r="1.25"/></g>',
  kompassi: '<circle cx="12" cy="12" r="8.4"/><path d="M12 5.8 14.3 12 12 18.2 9.7 12z"/><circle class="taytto" cx="12" cy="12" r="1"/>',
  nuoli: '<path d="M9.5 6.2 5 10.6l4.5 4.4"/><path d="M5 10.6h9.2a4.6 4.6 0 1 1 0 9.2H9.5"/>',
  kone: '<path d="M12 3.6v5.9l7.6 4.6v2.1L12 13.7v4.4l2.4 1.9v1.6L12 20.5l-2.4 1.1V20l2.4-1.9v-4.4L4.4 16.2v-2.1L12 9.5z"/>',
  tahti: '<path d="m12 3.8 2.5 5.2 5.5.7-4 3.9 1 5.6-5-2.7-5 2.7 1-5.6-4-3.9 5.5-.7z"/>',
  passi: '<rect x="5.5" y="3.5" width="13" height="17" rx="2"/><circle cx="12" cy="10.3" r="2.9"/><path d="M8.6 16.6h6.8"/>',
  paivita: '<path d="M19.4 4.8v3.7h-3.7"/><path d="M19.2 8.4a7.4 7.4 0 1 0 1 5.4"/>',
  kallo: '<path d="M12 3.8c-3.9 0-6.5 2.7-6.5 6.1 0 2 .9 3.3 2.1 4.2v2.5h8.8v-2.5c1.2-.9 2.1-2.2 2.1-4.2 0-3.4-2.6-6.1-6.5-6.1z"/><g class="taytto"><circle cx="9.6" cy="10.1" r="1.3"/><circle cx="14.4" cy="10.1" r="1.3"/></g><path d="M10.3 16.6v2.4M13.7 16.6v2.4"/>',
  kenka: '<path d="M5.2 19.6h4.3v-3.2a5.7 5.7 0 1 1 5 0v3.2h4.3"/>',
  kukkaro: '<path d="M9.6 6.9 8.3 4.2h7.4L14.4 6.9"/><path d="M9.6 6.9h4.8c2.5 1.6 4.1 4.2 4.1 7 0 3.3-2.5 5.4-6.5 5.4s-6.5-2.1-6.5-5.4c0-2.8 1.6-5.4 4.1-7z"/>',
  estetty: '<circle cx="12" cy="12" r="8.4"/><path d="M6.3 6.3l11.4 11.4"/>',
  ankkuri: '<circle cx="12" cy="5" r="1.8"/><path d="M12 6.8v12.6M8.7 9.6h6.6"/><path d="M5.2 13.8c.3 3.9 3.2 6.3 6.8 6.3s6.5-2.4 6.8-6.3"/><path d="M5.2 13.8 3.5 12.6M18.8 13.8l1.7-1.2"/>',
  mitali: '<path d="M9.6 3.6 8.2 9.2M14.4 3.6l1.4 5.6"/><circle cx="12" cy="14.4" r="5.2"/><circle class="taytto" cx="12" cy="14.4" r="1.1"/>',
  // Kaiutin ääniaaltoineen — aloitussivun ääniviihje.
  kaiutin: '<path d="M4.2 9.3h3.2l4.4-3.6v12.6l-4.4-3.6H4.2z"/><path d="M14.8 9.4a3.7 3.7 0 0 1 0 5.2"/><path d="M17.4 6.9a7.3 7.3 0 0 1 0 10.2"/>',
  /*
   * Kaupunkikartan näkymävivun kaksi kuvaketta (14.8.2026). Taitettu
   * kartta on se, mitä lehdessä on ennenkin ollut: käsin piirretty
   * juliste. Satelliitti on paneelit ja lautasantenni — kiertoradan
   * rengasta ei käytetä, koska se näyttää tällä koolla pallolta.
   */
  taitekartta: '<path d="M3.6 6.6 9 4.4v13l-5.4 2.2z"/><path d="M9 4.4 15 6.6v13L9 17.4z"/>'
    + '<path d="M15 6.6l5.4-2.2v13L15 19.6z"/>',
  satelliitti: '<rect x="2.8" y="9.7" width="5.4" height="4.6" rx="0.7"/>'
    + '<rect x="15.8" y="9.7" width="5.4" height="4.6" rx="0.7"/>'
    + '<rect x="9.9" y="9.3" width="4.2" height="5.4" rx="1"/>'
    + '<path d="M8.2 12h1.7M14.1 12h1.7"/>'
    + '<path d="M12 9.3V6.4"/><path d="M9.7 5.5a3.4 3.4 0 0 1 4.6 0"/>',
  // Värikartan vipu (15.8.2026): maalarin paletti, täpät täytettyinä
  // samaan tapaan kuin pöllön silmäterät (.taytto).
  varikartta: '<path d="M12 3.6c4.7 0 8.4 3.1 8.4 7 0 2.5-1.9 3.5-3.7 3.5h-1.9c-1 0-1.7.8-1.4 1.7.3.8.9 1.3.9 2.3 0 1.4-1.1 2.3-2.5 2.3-4.6 0-8.2-3.8-8.2-8.4 0-4.6 3.8-8.4 8.4-8.4z"/>'
    + '<circle class="taytto" cx="8.2" cy="9.4" r="1"/>'
    + '<circle class="taytto" cx="12" cy="7.6" r="1"/>'
    + '<circle class="taytto" cx="15.8" cy="9.4" r="1"/>',
};

/*
 * Linssivalitsimen oma kuvake: sama suurennuslasi kuin Tutki-napissa,
 * yliviivattuna. Se on valitsimen "Ei linssiä" -rivi, ja siksi se on
 * piirretty samalla kynällä kuin linssien omat kuvakkeet — rivien on
 * oltava keskenään samaa sarjaa, tai valinta näyttää sekalaiselta.
 */
/**
 * Viivaikoni omaksi SVG-elementikseen annetussa koossa.
 *
 * Linssimoduulit antavat kuvakkeensa 24 × 24 -polkuina ilman <svg>-kuorta
 * (sama muoto kuin VIIVA_IKONIT). Matkalaukku tarvitsee niistä isomman
 * version tavaroiden riveille, ja tämä on se kuori.
 */
export function viivaIkoniSvg(polut, koko = 44) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(koko));
  svg.setAttribute('height', String(koko));
  svg.setAttribute('class', 'viiva-ikoni-kuva');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = polut;
  return svg;
}

export const LINSSI_EI_IKONI = `${VIIVA_IKONIT.taikalasit}<path d="M5.4 5.4 20 20"/>`;

/**
 * Liuskanapin kuvake. Sama kuori kuin aiheliuskoilla (rakennaLiuskat):
 * linssimoduulit antavat kuvakkeensa täsmälleen samassa muodossa,
 * 24×24-polkuina ilman <svg>-kuorta.
 */
export function liuskaIkoniSvg(piirto, koko = 19) {
  return `<svg viewBox="0 0 24 24" width="${koko}" height="${koko}" aria-hidden="true" fill="none"
       stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
       stroke-linejoin="round">${piirto}</svg>`;
}

/** Viivaikoni ikonin nimellä — tai null, jos nimi onkin tekstimerkki. */
export function viivaIkoni(nimi) {
  const piirto = VIIVA_IKONIT[nimi];
  if (!piirto) return null;
  const span = html('span', 'icon-glyph viiva-ikoni');
  span.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${piirto}</svg>`;
  return span;
}

/**
 * Lyhentää Wikipedian tiivistelmän saapumiskortin parin lauseen esittelyksi.
 * Suomen järjestysluvut ("3. suurin") voivat katkaista lauseen liian
 * aikaisin — se on harvinaista ja lopputulos on silti luettava.
 */
export function shortIntro(text, maxChars = 280, maxSentences = 3) {
  const siisti = String(text).replace(/\s+/g, ' ').trim();
  const lauseet = siisti.match(/[^.!?]+[.!?]+/g);
  if (!lauseet) {
    return siisti.length > maxChars ? `${siisti.slice(0, maxChars).trimEnd()}…` : siisti;
  }
  let esittely = '';
  let maara = 0;
  for (const lause of lauseet) {
    if (maara && (maara >= maxSentences || esittely.length + lause.length > maxChars)) break;
    esittely += lause;
    maara++;
  }
  return esittely.trim();
}

/*
 * ══════════════════════════════════════════════════════════════════════
 * TUTKI-SIVUN TYPOGRAFIA: LEHTIMÄINEN LEIPÄTEKSTI
 * ══════════════════════════════════════════════════════════════════════
 *
 * Omistaja: "Se on tällä hetkellä vaivalloinen lukea, kun tekstiä on niin
 * paljon." Ja: "tekstiä pitäisi vähän elävöittää poldauksilla tai muilla
 * nostoilla, niin kuin lehdessä."
 *
 * Kaksi vikaa, jotka näkyvät jo mitasta. Yhden kategorian sivulla on
 * 4–7 nostoa à noin 500–650 merkkiä eli kolmisen tuhatta merkkiä
 * yhtenäistä tekstiä — ja se oli KIRJOITUSKONEKIRJASIMELLA yhtenä
 * kappaleena nostoa kohti. Kirjoituskone on oikea valinta otsikoihin ja
 * nappeihin, mutta pitkän leipätekstin lukeminen sillä on työlästä:
 * tasalevyinen kirjasin ei anna sanoille muotoa, josta silmä tunnistaa
 * ne vilkaisulla.
 *
 * Tämä funktio tekee tekstille kolme lehdestä tuttua asiaa:
 *
 *   1. KAPPALEJAKO. Virkkeet jaetaan kahteen kappaleeseen suunnilleen
 *      puolivälistä. Yksi tekstimuuri muuttuu kahdeksi luettavaksi
 *      palaksi ilman että sanoihin kosketaan.
 *   2. LIHAVOITU ALOITUS. Ensimmäiset sanat lihavana — se on lehden vanha
 *      keino tarttua lukijaan, ja juuri se "poldaus", jota omistaja
 *      pyysi. Sanamäärä on kiinteä eikä valittu sisällön mukaan: kone ei
 *      osaa päättää, mikä kohta on tärkeä, mutta alku on aina alku.
 *   3. ANFANGI ensimmäiseen kappaleeseen sivulla (vain kerran, ks.
 *      kutsuja) — aukeaman avaus.
 */
const LEIPAN_ALOITUS_SANOJA = 4;

/*
 * VIRKEJAKO, JOKA OSAA SUOMEA.
 *
 * Ensimmäinen versio katkaisi jokaisesta pisteestä, ja se meni heti
 * pieleen: suomen JÄRJESTYSLUVUSSA on piste. Teksti "…10. kesäkuuta 1735
 * astui voimaan laki…" katkesi luvun jälkeen, ja sivun sitaattinosto
 * alkoi keskeltä virkettä sanalla "kesäkuuta" — nähtiin esikatselussa
 * ennen julkaisua.
 *
 * Piste päättää virkkeen vain, jos sen edellä EI ole numeroa
 * (järjestysluku, päivämäärä, mitta) ja sen jälkeen tulee väli ja iso
 * kirjain tai lainausmerkki.
 *
 * Ei takaumakatsetta (lookbehind): sitä ei ole vanhemmissa iOS-Safareissa,
 * ja tämä on peli, jota pelataan puhelimella. Silmukka on yhtä tarkka.
 */
const VIRKKEEN_ALKU = /[0-9A-ZÅÄÖÜÉ"\u201C\u00AB]/;

export function virkkeiksi(teksti) {
  const t = String(teksti ?? '');
  const ulos = [];
  let alku = 0;
  for (let i = 0; i < t.length; i++) {
    const merkki = t[i];
    if (merkki !== '.' && merkki !== '!' && merkki !== '?') continue;
    if (merkki === '.' && /[0-9]/.test(t[i - 1] ?? '')) continue;
    const osuma = /^\s+(.)/.exec(t.slice(i + 1));
    if (!osuma) break;
    if (!VIRKKEEN_ALKU.test(osuma[1])) continue;
    ulos.push(t.slice(alku, i + 1).trim());
    alku = i + 1;
  }
  if (alku < t.length) ulos.push(t.slice(alku).trim());
  return ulos.filter(Boolean);
}

export function jaaKappaleiksi(teksti) {
  const koko = String(teksti ?? '').trim();
  /*
   * KIRJOITTAJAN OMAT KAPPALERAJAT VOITTAVAT (omistaja 15.8.2026:
   * "Käytä enemmän rivinvaihtoja. Teksti on nyt aivan liikaa yhteen
   * putkeen"). Tyhjä rivi tekstissä on tarkoituksellinen kappaleen
   * raja — kehittäjän liitteet taittavat Raamatun kohdat ja
   * tilannetaulun rivit omiksi kappaleikseen sen avulla. Automaattinen
   * puolitus koskee vain tekstiä, jossa rajoja ei ole annettu.
   */
  if (koko.includes('\n\n')) {
    return koko.split(/\n{2,}/).map((k) => k.trim()).filter(Boolean);
  }
  const virkkeet = virkkeiksi(koko);
  if (virkkeet.length < 3) return [koko].filter(Boolean);
  const puoli = Math.ceil(virkkeet.length / 2);
  return [virkkeet.slice(0, puoli).join(' '), virkkeet.slice(puoli).join(' ')].filter(Boolean);
}

export function piirraLeipa(kohde, teksti, { anfangi = false } = {}) {
  const kappaleet = jaaKappaleiksi(teksti);
  /*
   * Kappaleet kääritään yhteen lohkoon, jotta leipäteksti voidaan
   * taittaa leveällä ruudulla kahdelle palstalle YHTENÄ juoksuna
   * (omistajan toive 5.8.2026) — palstoitus kappale kerrallaan
   * katkeaisi kahdeksi erilliseksi palstapariksi.
   */
  const leipa = html('div', 'leipa');
  kohde.appendChild(leipa);
  kohde = leipa;
  kappaleet.forEach((kappale, i) => {
    const p = html('p', i === 0 ? 'teksti ensimmainen' : 'teksti');
    if (i === 0 && anfangi) p.classList.add('anfangi');
    if (i === 0) {
      // Lihavoitu aloitus omaksi elementikseen; loppu jää tavalliseksi.
      const sanat = kappale.split(' ');
      const alku = sanat.slice(0, LEIPAN_ALOITUS_SANOJA).join(' ');
      const loppu = sanat.slice(LEIPAN_ALOITUS_SANOJA).join(' ');
      p.appendChild(html('strong', 'leipa-aloitus', alku));
      if (loppu) p.appendChild(document.createTextNode(` ${loppu}`));
    } else {
      p.textContent = kappale;
    }
    kohde.appendChild(p);
  });
  return leipa;
}

/*
 * SITAATTINOSTON POIMINTA (poimiNostoVirke) POISTETTU 23.8.2026.
 * Aihesivujen jutut ovat niin lyhyitä, että nostettu virke näkyi
 * heti uudestaan parin rivin päässä — omistajan päätös: nostot pois.
 * Ks. js/maalehti.js piirraKategoria.
 */

/*
 * Kehittäjätila (omistajan toive): kaupunkiin pääsee napauttamalla sen
 * laattaa, jolloin minkä tahansa kaupungin sisältöä voi katsoa ilman
 * että sinne pitää pelata.
 *
 * Tila säilyy selaimessa, koska sisällön tarkastelu jatkuu yleensä
 * seuraavallakin avauksella. Se ei kuulu pelin tallennukseen: tila on
 * laitteen asetus eikä pelitilanteen osa, eikä sen pidä matkustaa
 * tallennuksen mukana.
 */
const KEHITTAJA_AVAIN = 'matkakirja-kehittaja';

export function kehittajaTilaPaalla() {
  try {
    return localStorage.getItem(KEHITTAJA_AVAIN) === '1';
  } catch {
    return false; // yksityinen selaus
  }
}

export function asetaKehittajaTila(paalla) {
  try {
    if (paalla) localStorage.setItem(KEHITTAJA_AVAIN, '1');
    else localStorage.removeItem(KEHITTAJA_AVAIN);
  } catch {
    /* yksityinen selaus: tila jää vain tälle istunnolle */
  }
}

/*
 * FOKUSMOODI (omistajan linjaus 24.8.2026, Raamatun osio "Fokusmoodi").
 *
 * Fokusmoodi on PELIN OLETUSTILA: tietoa, kysymyksiä ja valintoja
 * niukasti kerrallaan, ja kartalla vain se maa, jossa matka juuri on.
 * Siksi puuttuva avain tarkoittaa PÄÄLLÄ — tavallinen pelaaja ei
 * koskaan näe kytkintä eikä siis koskaan kirjoita avainta.
 *
 * Poiskytkentä on kehittäjän vertailukeino ("miltä vanha peli näytti"),
 * ja se kirjoittaa avaimeen nimenomaan '0'. Arvo on siis kolmiarvoinen
 * vain näennäisesti: kaikki muu kuin '0' on päällä, joten kelvoton tai
 * vanha arvo palauttaa oletuksen eikä jätä peliä puolitilaan.
 *
 * Sama kaava kuin KEHITTAJA_AVAIMELLA yllä: oma avain, try/catch ja ei
 * riviäkään pelitallennuksessa. Fokusmoodi on laitteen esitystapa eikä
 * pelitilanteen osa, eikä sen pidä matkustaa tallennuksen mukana.
 */
const FOKUSMOODI_AVAIN = 'matkakirja-fokusmoodi';

export function fokusmoodiPaalla() {
  try {
    return localStorage.getItem(FOKUSMOODI_AVAIN) !== '0';
  } catch {
    return true; // yksityinen selaus: oletus on päällä
  }
}

export function asetaFokusmoodi(paalla) {
  try {
    if (paalla) localStorage.removeItem(FOKUSMOODI_AVAIN);
    else localStorage.setItem(FOKUSMOODI_AVAIN, '0');
  } catch {
    /* yksityinen selaus: tila jää vain tälle istunnolle */
  }
}

/*
 * SUMENNUSTEN PIKAKYTKIN (kehittäjäasetus, omistaja 24.8.2026).
 *
 * Fokusmoodissa on kaksi erillistä asiaa: MITÄ kartalta näytetään
 * (käymättömien maiden datakerros pois) ja MILTÄ loppu näyttää
 * (himmennys ja epäterävyys). Ennen–jälkeen-vertailua varten
 * jälkimmäinen tarvitsee oman kytkimensä: sumennus pois, muu
 * fokusmoodi ennallaan.
 *
 * Oletus on päällä samoin perustein kuin fokusmoodilla itselläänkin,
 * ja arvo '0' tarkoittaa pois. Kytkin näkyy vain kehittäjätilassa.
 */
const FOKUSSUMENNUS_AVAIN = 'matkakirja-fokussumennus';

export function fokusSumennusPaalla() {
  try {
    return localStorage.getItem(FOKUSSUMENNUS_AVAIN) !== '0';
  } catch {
    return true; // yksityinen selaus: oletus on päällä
  }
}

export function asetaFokusSumennus(paalla) {
  try {
    if (paalla) localStorage.removeItem(FOKUSSUMENNUS_AVAIN);
    else localStorage.setItem(FOKUSSUMENNUS_AVAIN, '0');
  } catch {
    /* yksityinen selaus: tila jää vain tälle istunnolle */
  }
}

// Tiivistelmät ja kuvat haetaan kerran per artikkeli: sama kuva näkyy
// sekä saapumiskortissa että Lue lisää -dialogissa ilman uutta hakua.
const wikiSummaryCache = new Map();
const wikiImageCache = new Map();

export async function cachedSummary(title) {
  if (!wikiSummaryCache.has(title)) {
    // Oma suomenkielinen tiivistelmä paikkaa puuttuvan tai englannin-
    // kielisen wikitekstin — ja toimii myös ilman verkkoa. Kunnollinen
    // fi-artikkeli ohittaa oman tekstin itsestään. Wikihaun kuva
    // säilytetään, otsikko pysyy pelin omana.
    wikiSummaryCache.set(title, fetchSummary(title).then((summary) => {
      const oma = OMAT_TIIVISTELMAT[title];
      if (!oma || (summary && summary.lang === 'fi')) return summary;
      return { ...(summary ?? {}), title, extract: oma, lang: 'fi', oma: true };
    }).catch(() => {
      const oma = OMAT_TIIVISTELMAT[title];
      return oma ? { title, extract: oma, lang: 'fi', oma: true } : null;
    }));
  }
  return wikiSummaryCache.get(title);
}

export async function cachedImage(title) {
  if (!wikiImageCache.has(title)) {
    wikiImageCache.set(title, cachedSummary(title).then((s) => fetchImage(s)));
  }
  return wikiImageCache.get(title);
}
