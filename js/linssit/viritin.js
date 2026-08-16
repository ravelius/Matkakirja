// Maailmanradion viritysääni: mitä kuuluu, kun soitin hakee kanavaa.
//
// TÄSSÄ TIEDOSTOSSA ON KAKSI KONETTA JA YKSI KYTKIN.
//
//   teeViritin        — syntetisoitu viritysääni, ei yhtään äänitettä.
//   teeNauhaviritin   — aidot vastaanotinäänitykset (js/packs/viritysaanet.js).
//   teeViritysaani    — se, jota radio kutsuu. Valinnan tekee VIRITYKSEN_TAPA
//                       heti tämän kommentin jälkeen: SE ON AINOA KOHTA,
//                       jota tavan vaihtaminen vaatii.
//
// Molemmilla on sama rajapinta (aloita, lopeta, asetaVoimakkuus, soi),
// joten js/linssit/radio.js ei tiedä kumpi soi — eikä sen pidä tietää.
//
// MIKSI SYNTEESI: omistajan huoli oli, "ettei ihan sama ääni toistuisi
// joka kerralla". Äänitteillä siihen vastataan arpomalla muutamasta
// klipistä ja aloituskohdasta, jolloin sama ääni palaa muutaman virityksen
// välein. Synteesillä siihen vastataan lopullisesti: jokainen viritys
// arvotaan uudelleen, eikä kahta samanlaista tule. Viritysääni on myös
// yksi harvoista äänistä, joka syntetisoituu vakuuttavasti — se ei ole
// mitään muuta kuin suodatettua kohinaa, pyyhkäiseviä vihellyksiä ja
// vilahtavia asemia.
//
// MIKSI ÄÄNITE: syntetisoitu kohina on aina hiukan liian siistiä. Aidossa
// äänityksessä on vastaanottimen oma sävy, kaukaisten asemien haamut ja
// ilmakehän epätasaisuus — asioita, joita ei osaa arpoa, koska niitä ei
// osaa kuvailla. Ero kuuluu heti, eikä se ole tekniikkaa vaan uskottavuutta.
//
// Ääni on kolme kerrosta:
//   1. KOHINAPOHJA — vaaleanpunaista kohinaa liikkuvan kaistanpäästön
//      läpi. Suodattimen keskitaajuuden liike ON viisarin liike.
//   2. HETERODYNE-VIHELLYKSET — siniaaltoja, joiden taajuus pyyhkäisee
//      alas tai ylös aseman ohittaessa. Tämä on se ääni, jonka kaikki
//      tunnistavat lyhytaaltoradioksi.
//   3. ASEMIEN VILAHDUKSET — kohina väistyy hetkeksi ja tilalle nousee
//      formanttisuodatettu puheenpätkä tai kaukaista musiikkia. Kaksi
//      tai kolme jaksoa kohti, omissa lokeroissaan niin etteivät ne osu
//      päällekkäin: kaksi asemaa yhtä aikaa ei ole tunnelma vaan sotku.
//
// EI OMAA ÄÄNIKONEISTOA. Kaikki menee js/sound.js:n valmiiseen bussiin
// (kaiku, kompressori, master) ja vaikenee pelin mykistyksestä.
//
// CPU: kaikki automaatio ajastetaan äänisäikeelle etukäteen, jakso
// kerrallaan. Pääsäie herää yhden setTimeoutin verran noin joka kuudes
// sekunti eikä tee muuta — ei ScriptProcessoria, ei AudioWorkletia, ei
// requestAnimationFrame-silmukkaa. Kartta ei siis nyki virityksen alla.

import { sfx } from '../sound.js';
import { haeAani } from '../media.js';
import { VIRITYSAANET, viritysPolku, arvoViritysaani } from '../packs/viritysaanet.js';

/*
 * ══════════════════════════════════════════════════════════════════════
 * KUMPI VIRITYSÄÄNI SOI. Tämä vakio on ainoa kohta, jota tavan
 * vaihtaminen vaatii — kaikki muu on molemmille yhteistä.
 * ══════════════════════════════════════════════════════════════════════
 *
 *   'automaatti'  aidot äänitteet, jos niitä on vähintään NAUHOJEN_VARA
 *                 kappaletta; muuten synteesi. Oletus.
 *   'nauha'       aina aidot äänitteet. Jos yksikään ei lataudu (yhden
 *                 tiedoston versio, levyltä avattu peli), soitin putoaa
 *                 silti synteesiin — hiljainen viritys on pahempi kuin
 *                 väärä viritys.
 *   'synteesi'    aina syntetisoitu.
 *
 * KOLME ON VÄHIMMÄISMÄÄRÄ, ja luku tulee omistajan pyynnöstä: "ihan sama
 * ääni ei toistuisi joka kerralla". Kahdella äänitteellä ja "ei samaa
 * kahdesti peräkkäin" -säännöllä ne vuorottelisivat pakosti — ABABAB on
 * kuultavampi kaava kuin sama ääni joka kerta. Kolmesta alkaen arvonta on
 * arvontaa. Nyt äänitteitä on viisi.
 */
export const VIRITYKSEN_TAPA = 'automaatti';
const NAUHOJEN_VARA = 3;

/*
 * Arvonnan rajat yhdessä paikassa, jäädytettynä.
 *
 * MIKSI JÄÄDYTETTY JA VIETY: satunnaisuus on tässä ominaisuus, mutta
 * rajaton satunnaisuus tuottaa ennen pitkää äänen, joka sattuu korvaan.
 * Näitä lukuja vasten testi tarkistaa, ettei arvonta koskaan karkaa —
 * ja koska tätä kuunnellaan kuulokkeilla, katto on tarkoituksella matala.
 */
export const VIRITTIMEN_RAJAT = Object.freeze({
  // Yhden viritysjakson pituus sekunteina. Jakson päätyttyä arvotaan uusi,
  // joten pitkäkään viritys ei ala kierrättää itseään.
  jakso: Object.freeze([4.5, 7.5]),

  // Kohinapohja
  kohinaVoima: Object.freeze([0.5, 0.85]),
  kohinaHz: Object.freeze([240, 1900]),
  kohinaQ: Object.freeze([0.6, 1.8]),
  // Viisarin nykäysten väli: liian tiheä kuulostaa hermostuneelta,
  // liian harva kuolleelta.
  viisarinAskel: Object.freeze([0.22, 0.75]),
  // Yhden nykäyksen suurin taajuushyppy kertoimena. Yli kahden se ei ole
  // enää viisarin liike vaan kanavan vaihto.
  viisarinHyppy: Object.freeze([0.55, 1.9]),

  // Heterodyne-vihellykset
  viheltajia: Object.freeze([2, 4]),
  vihellysHz: Object.freeze([380, 2600]),
  vihellysKesto: Object.freeze([0.45, 1.7]),
  vihellysVoima: Object.freeze([0.045, 0.12]),
  // Nousun osuus kestosta. Alaraja pitää huolen, ettei yksikään vihellys
  // ilmesty naksahtaen — 15 % lyhimmästäkin kestosta on 68 ms.
  vihellysNousu: Object.freeze([0.15, 0.5]),

  // Asemien vilahdukset
  vilahduksia: Object.freeze([2, 3]),
  vilahdusKesto: Object.freeze([0.5, 1.4]),
  vilahdusVoima: Object.freeze([0.3, 0.75]),
  // Paljonko kohina jää päälle vilahduksen ajaksi. Ei nollaan: täysin
  // puhdas asema keskellä viritystä kuulostaisi leikkaukselta.
  vilahdusVaisto: Object.freeze([0.15, 0.45]),
  // Aseman nousu ja lasku osuuksina kestosta.
  puheenNousu: Object.freeze([0.04, 0.1]),
  musiikinNousu: Object.freeze([0.2, 0.35]),
  asemanLasku: Object.freeze([0.2, 0.4]),
  // Puheen formantit. Ensimmäinen antaa vokaalin korkeuden, toinen sen
  // värin; yhdessä ne tekevät kohinasta tunnistettavasti ihmisäänen.
  formanttiYksi: Object.freeze([280, 780]),
  formanttiKaksi: Object.freeze([900, 2100]),
  formanttiQ: Object.freeze([4, 11]),
  // Tavun mitta ja tauko sen jälkeen. Näistä syntyy puheen rytmi.
  tavunKesto: Object.freeze([0.07, 0.19]),
  tavunTauko: Object.freeze([0.02, 0.08]),
  // Kaukaisen musiikin sävelet: matala perusääni ja pari kvinttiä
  // sen päällä. Ei melodiaa — melodia paljastaisi syntetisaattorin.
  musiikkiHz: Object.freeze([190, 620]),

  // Kaikkia kerroksia koskeva katto. Mikään ei pääse tämän yli, koska
  // kuulokkeissa kirkas kohina on kipeää eikä tunnelmaa.
  katto: 3200,
  /*
   * Pehmennykset sekunteina. NÄMÄ OVAT VAIN OLETUKSIA: kutsuja antaa
   * kummankin pituuden itse (aloita, lopeta), koska vain se tietää MIKSI
   * viritys alkaa tai loppuu. Radiossa molemmat päät ovat ristihäivytyksen
   * puolikkaita ja kestävät saman kuin lähetyksen väistö tai nousu
   * (js/linssit/radio.js RISTIHAIVYTYS). Nämä luvut jäävät niille
   * kutsujille, jotka eivät ristihäivytä mitään.
   */
  alkuHaive: 0.25,
  loppuHaive: 0.4,
});

/** Satunnaisluku väliltä [min, max]. */
function valilta(arvonta, [min, max]) {
  return min + arvonta() * (max - min);
}

/** Kokonaisluku väliltä [min, max], molemmat mukaan luettuina. */
function kokonaisValilta(arvonta, [min, max]) {
  return min + Math.floor(arvonta() * (max - min + 1));
}

/** Rajaa arvon väliin. */
function rajaa(arvo, [min, max]) {
  return Math.min(max, Math.max(min, arvo));
}

/**
 * Arpoo yhden viritysjakson kaikki parametrit.
 *
 * MIKSI TÄMÄ ON OMA, PUHDAS FUNKTIONSA: Web Audiota ei ole Nodessa,
 * joten tämä on se osa, jonka testi voi oikeasti tarkistaa. Arvonta ja
 * soittaminen on siksi erotettu toisistaan — soitin vain toteuttaa
 * tämän tuloksen.
 *
 * @param {() => number} [arvonta] satunnaislähde, oletuksena Math.random
 * @returns {object} jakson kesto ja kaikki kerrokset sekunteina/hertseinä
 */
export function arvoViritysParametrit(arvonta = Math.random) {
  const R = VIRITTIMEN_RAJAT;
  const jakso = valilta(arvonta, R.jakso);

  // --- viisarin liike -----------------------------------------------------
  // Satunnaiskulku eikä riippumattomia arpoja: kädessä kääntyvä viisari
  // liikkuu naapuritaajuudelle, ei umpimähkään toiseen päähän kaistaa.
  const pisteet = [];
  let hz = valilta(arvonta, R.kohinaHz);
  let aika = 0;
  while (aika < jakso) {
    pisteet.push({ aika, hz, q: valilta(arvonta, R.kohinaQ) });
    aika += valilta(arvonta, R.viisarinAskel);
    hz = rajaa(hz * valilta(arvonta, R.viisarinHyppy), R.kohinaHz);
  }
  // Viimeinen piste tasan jakson lopussa, jotta seuraava jakso jatkaa
  // siitä mihin tämä jäi eikä hyppää.
  pisteet.push({ aika: jakso, hz, q: valilta(arvonta, R.kohinaQ) });

  // --- vihellykset --------------------------------------------------------
  const vihellykset = [];
  const viheltajia = kokonaisValilta(arvonta, R.viheltajia);
  for (let i = 0; i < viheltajia; i++) {
    const kesto = valilta(arvonta, R.vihellysKesto);
    const alkuHz = valilta(arvonta, R.vihellysHz);
    // Pyyhkäisyn suunta on kolikonheitto, mutta loppupää on aina
    // selvästi eri kuin alku — pieni siirtymä ei kuulostaisi ohitukselta.
    const alas = arvonta() < 0.5;
    const kerroin = 1 + arvonta() * 2.2;
    const loppuHz = rajaa(alas ? alkuHz / kerroin : alkuHz * kerroin, R.vihellysHz);
    vihellykset.push({
      alku: arvonta() * Math.max(0, jakso - kesto),
      kesto,
      alkuHz,
      loppuHz,
      voima: valilta(arvonta, R.vihellysVoima),
      nousu: valilta(arvonta, R.vihellysNousu),
    });
  }

  // --- asemien vilahdukset ------------------------------------------------
  // Jakso pilkotaan yhtä moneen lokeroon kuin vilahduksia on, ja kukin
  // arvotaan omaan lokeroonsa. Näin ne eivät voi osua päällekkäin —
  // päällekkäiset vilahdukset väistäisivät kohinaa kahdesti, ja tulos
  // olisi outo aukko eikä ohitettu asema.
  const vilahdukset = [];
  const maara = kokonaisValilta(arvonta, R.vilahduksia);
  const lokero = jakso / maara;
  for (let i = 0; i < maara; i++) {
    const kesto = Math.min(valilta(arvonta, R.vilahdusKesto), lokero * 0.7);
    const alku = i * lokero + arvonta() * Math.max(0, lokero - kesto);
    const puhe = arvonta() < 0.72;
    const vilahdus = {
      laji: puhe ? 'puhe' : 'musiikki',
      alku,
      kesto,
      voima: valilta(arvonta, R.vilahdusVoima),
      vaisto: valilta(arvonta, R.vilahdusVaisto),
      formantit: [valilta(arvonta, R.formanttiYksi), valilta(arvonta, R.formanttiKaksi)],
      formanttiQ: [valilta(arvonta, R.formanttiQ), valilta(arvonta, R.formanttiQ)],
      /*
       * Aseman nousun ja laskun osuudet kestosta. Näillä ohjataan sekä
       * aseman verhokäyrää ETTÄ kohinan väistöä, ja se on koko juju:
       * mitatussa nauhoituksessa kohina väistyi 60 ms:ssa mutta asema
       * nousi vasta 400 ms:ssa, joten alkuun jäi aukko. Puhe alkaa
       * heti ensimmäisestä tavusta, musiikki nousee kaukaa.
       */
      nousu: puhe ? valilta(arvonta, R.puheenNousu) : valilta(arvonta, R.musiikinNousu),
      lasku: valilta(arvonta, R.asemanLasku),
      tavut: [],
      savelet: [],
    };
    if (puhe) {
      // Tavut peräkkäin niin kauan kuin vilahdukseen mahtuu. Vaihteleva
      // voima tekee rytmistä puhetta eikä morsea.
      let t = 0;
      while (t < kesto - R.tavunKesto[0]) {
        const tavu = Math.min(valilta(arvonta, R.tavunKesto), kesto - t);
        vilahdus.tavut.push({ alku: t, kesto: tavu, voima: 0.35 + arvonta() * 0.65 });
        t += tavu + valilta(arvonta, R.tavunTauko);
      }
    } else {
      // Perusääni ja kvintti sen päällä, joskus oktaavi lisäksi. Nämä
      // suhteet soivat yhteen millä tahansa perustaajuudella, joten
      // arvonta ei voi tuottaa riitasointua.
      const perus = valilta(arvonta, R.musiikkiHz);
      vilahdus.savelet.push(perus, perus * 1.5);
      if (arvonta() < 0.5) vilahdus.savelet.push(perus * 2);
    }
    vilahdukset.push(vilahdus);
  }

  return {
    jakso,
    kohina: { voima: valilta(arvonta, R.kohinaVoima), pisteet },
    vihellykset,
    vilahdukset,
  };
}

/*
 * Kohinapuskurit kontekstia kohti. Vaaleanpunaisen kohinan laskeminen on
 * halpaa mutta ei ilmaista, eikä sitä ole syytä tehdä uudelleen joka
 * virityksellä — sama puskuri kelpaa kaikille, koska sen päälle tuleva
 * suodatin on joka kerta eri.
 */
const KOHINAT = new WeakMap();

/*
 * Kohinapuskurin pituus sekunteina. Kaksi riittää, vaikka silmukka
 * lyhyenä yleensä kuuluu: sauma on ristihäivytetty, ja päällä liikkuu
 * koko ajan kaistanpäästö, joka muuttaa saman kohinan joka kierroksella
 * eri ääneksi.
 *
 * Mitattu hinta (Chromium, 48 kHz): 1 s 1,0 ms, 2 s 1,8 ms, 3 s 3,4 ms.
 * Puskuri lasketaan kerran kontekstia kohti ja jää välimuistiin, joten
 * tämä maksetaan vain ensimmäisellä virityksellä.
 */
const KOHINAN_KESTO = 2;

/**
 * Vaaleanpunaista kohinaa silmukoitavaksi.
 *
 * MIKSI VAALEANPUNAISTA EIKÄ VALKOISTA: valkoisessa on yhtä paljon
 * tehoa joka oktaavilla, joten se kuulostaa korvassa sihinältä. Radion
 * kohinapohja on matalapainotteinen, ja vaaleanpunainen (−3 dB/oktaavi)
 * on juuri sitä. Suodatin on Paul Kellettin taloudellinen approksimaatio.
 *
 * Silmukan sauma ristihäivytetään: pitkäaaltoinen kohina ei muuten osu
 * päistään yhteen, ja liitos kuuluisi naksahduksena joka kierroksella.
 */
function kohinaPuskuri(ctx) {
  const valmis = KOHINAT.get(ctx);
  if (valmis) return valmis;

  const rate = ctx.sampleRate || 44100;
  const kesto = KOHINAN_KESTO;
  const haive = Math.floor(rate * 0.02);
  const pituus = Math.floor(rate * kesto);
  const puskuri = ctx.createBuffer(1, pituus, rate);
  const data = puskuri.getChannelData(0);

  let b0 = 0; let b1 = 0; let b2 = 0;
  const raaka = new Float32Array(pituus + haive);
  for (let i = 0; i < raaka.length; i++) {
    const valkoinen = Math.random() * 2 - 1;
    b0 = 0.99765 * b0 + valkoinen * 0.0990460;
    b1 = 0.96300 * b1 + valkoinen * 0.2965164;
    b2 = 0.57000 * b2 + valkoinen * 1.0526913;
    raaka[i] = (b0 + b1 + b2 + valkoinen * 0.1848) * 0.22;
  }
  // Sauman ristihäivytys: alun ensimmäiset millisekunnit sekoitetaan
  // silmukan yli menevään häntään.
  for (let i = 0; i < haive; i++) {
    const osuus = i / haive;
    raaka[i] = raaka[i] * osuus + raaka[pituus + i] * (1 - osuus);
  }
  // Normalisoidaan huippu, jotta taso ei riipu arvonnan tuurista.
  let huippu = 0;
  for (let i = 0; i < pituus; i++) huippu = Math.max(huippu, Math.abs(raaka[i]));
  const kerroin = huippu > 0 ? 0.9 / huippu : 1;
  for (let i = 0; i < pituus; i++) data[i] = raaka[i] * kerroin;

  KOHINAT.set(ctx, puskuri);
  return puskuri;
}

/** Eksponentiaaliramppi ei siedä nollaa; tämä on käytännön hiljaisuus. */
const HILJAA = 0.0001;

/*
 * Ulostulon perustaso, MITATTU eikä arvattu.
 *
 * Kaistanpäästö vie kohinasta valtaosan tehosta: pelkillä
 * arvontakertoimilla viritys jäi 8 sekunnin nauhoituksessa huipultaan
 * −35 dBFS:ään pelin omassa masteriketjussa. Suora lähetys soi
 * <audio>-elementistä täydellä voimalla, joten viritys olisi jäänyt
 * kuulumattomiin ja asema hypännyt korvaan. Tällä kertoimella
 * mitattiin huipuksi −12…−17 dBFS ja RMS:ksi −32 dBFS: selvästi
 * lähetyksen alle mutta kymmenkunta desibeliä pelin omien tehosteiden
 * yli, mikä on oikein — viritys on radiotilassa ainoa ääni.
 *
 * Jos tätä muuttaa, MITTAA UUDELLEEN. Korva ei muista desibelejä, ja
 * mittaus on kolmen minuutin työ: nauhoita OfflineAudioContextilla
 * pelin masteriketjun (js/sound.js) läpi ja katso huippu ja RMS.
 */
const ULOSTULON_TASO = 2.2;

/*
 * Formanttisuodattimen vahvistuskorjaus. Q 4–11 päästää läpi vain
 * murto-osan oktaavista, joten sama kerroin, joka soittaa musiikin
 * oikealla tasolla, jättäisi puheen kuulumattomiin. Ilman tätä
 * vilahdukset kuuluivat aukkoina eivätkä asemina: kohina väistyi,
 * mutta tilalle ei tullut mitään.
 */
const FORMANTTI_KORJAUS = 3.5;

/*
 * Musiikkivilahduksen korjaus. Sointuäänet eivät kulje suodattimen
 * läpi, joten ne tarvitsevat paljon vähemmän vahvistusta kuin puhe —
 * mutta jonkin verran silti, koska kaukainen asema saa kuulua kohinan
 * takaa eikä sen alta.
 */
const MUSIIKIN_KORJAUS = 0.8;

/**
 * Nouseva, pysyvä ja laskeva verhokäyrä yhdelle tapahtumalle.
 *
 * MIKSI TÄSSÄ ON TASAINEN KESKIOSA: eksponentiaaliramppi kohti
 * hiljaisuutta on matkaltaan noin −80 dB, ja siitä kuljetaan valtaosa
 * heti ramppin alussa. Pelkkä nousu–lasku-pari romahti siis muutamassa
 * kymmenessä millisekunnissa, ja mitatussa nauhoituksessa jokainen
 * vilahdus näkyi AUKKONA eikä asemana: kohina väistyi, mutta tilalle
 * ei ehtinyt mitään. Keskiosa pitää tapahtuman äänessä koko kestonsa.
 *
 * @param {AudioParam} param   voimakkuusparametri
 * @param {number} alku        aloitushetki äänikellossa
 * @param {number} kesto       koko tapahtuman kesto sekunteina
 * @param {number} huippu      voimakkuuden huippuarvo
 * @param {number} [nousu]     nousun osuus kestosta
 * @param {number} [lasku]     laskun osuus kestosta
 */
function verho(param, { alku, kesto, huippu, nousu = 0.28, lasku = 0.35 }) {
  const taso = Math.max(huippu, HILJAA);
  const ylos = alku + kesto * Math.min(nousu, 1 - lasku);
  const alas = alku + kesto * (1 - lasku);
  param.setValueAtTime(HILJAA, alku);
  param.exponentialRampToValueAtTime(taso, ylos);
  if (alas > ylos) param.setValueAtTime(taso, alas);
  param.exponentialRampToValueAtTime(HILJAA, alku + kesto);
}

/*
 * Käyrän pisteiden määrä: 33 pistettä eli noin 20 ms välein 0,6 sekunnin
 * häivytyksessä. Käyrä on tiheämpi kuin korva erottaa, ja selain
 * interpoloi pisteiden välit joka tapauksessa.
 */
const KAYRAN_PISTEET = 33;

/**
 * KATKAISEE PARAMETRIN KESKEN OLEVAN AUTOMAATION.
 *
 * MIKSI OMA FUNKTIO: viritys voi vaihtaa suuntaa kesken häivytyksen —
 * pelaaja painaa stopia sillä sekunnilla, jona kohina on vasta nousemassa
 * — ja silloin uusi käyrä ajoitettaisiin vanhan päälle. Web Audio ei
 * salli päällekkäisiä setValueCurveAtTime-jaksoja vaan heittää
 * NotSupportedErrorin, joten vanha on nimenomaisesti katkaistava ensin.
 *
 * VAIN cancelScheduledValues, EIKÄ cancelAndHoldAtTime SEN EDELLÄ.
 *
 * Tässä oli hetken molemmat, siinä järjestyksessä, ja pari on itsensä
 * kanssa ristiriidassa. cancelAndHoldAtTime jättää arvon paikalleen
 * lisäämällä pidätystapahtuman hetkeen `t`; heti perään tuleva
 * cancelScheduledValues(t) poistaa kaikki tapahtumat hetkestä `t`
 * eteenpäin eli myös juuri lisätyn pidätyksen. Jäljelle ei jää mitään, ja
 * parametri putoaa takaisin omaan pohja-arvoonsa — virittimellä se on
 * HILJAA. Sama koskee kesken olevaa käyrää: spesifikaation mukaan
 * cancelScheduledValues poistaa setValueCurve-tapahtuman kokonaan, jos
 * katkaisuhetki osuu käyrän sisään.
 *
 * Pidätystä ei tarvita, koska JOKAINEN KUTSUJA LUKEE ARVON ITSE ENNEN
 * KATKAISUA ja kirjoittaa sen uuden käyränsä ensimmäiseksi pisteeksi
 * (haivytaPois, haivytaSisaan, asetaVoimakkuus). Mitattu arvo on
 * täsmälleen se, minkä pidätys jättäisi — mutta se on meidän kädessämme
 * eikä riipu siitä, mitä kukin selain tekee peräkkäisillä perumisilla.
 *
 * JÄRJESTYS ON SIIS OSA SOPIMUSTA: lue arvo, katkaise, kirjoita uusi
 * kaari. Katkaisun jälkeen luettu `param.value` ei kerro enää mitään.
 */
function katkaiseAutomaatio(param, t) {
  param.cancelScheduledValues(t);
}

/**
 * Häivyttää voimakkuusparametrin hiljaisuuteen TASATEHOISESTI.
 *
 * MIKSI KOSINIKÄYRÄ EIKÄ PELKKÄ RAMPPI: tämä häivytys on ristihäivytyksen
 * toinen puoli. Viritys väistyy samalla kun suora lähetys nousee
 * (js/linssit/radio.js), ja ne ovat kaksi täysin riippumatonta ääntä.
 * Riippumattomat äänet summautuvat TEHOLTAAN, joten lineaarinen pari
 * jättää keskelle 3 dB:n notkahduksen — juuri sen kuulee reikänä. Kosini
 * ja sini toteuttavat cos² + sin² = 1, eli yhteisteho pysyy vakiona koko
 * vaihdon ajan.
 *
 * Eksponenttiramppi on varareitti niille konteksteille, joissa
 * setValueCurveAtTime puuttuu (tynkäkonteksti testeissä). Se on
 * desibeliasteikolla suora ja siksi kelvollinen häivytys yksinään —
 * vain ristihäivytyksen puoliskona se on väärä.
 */
function haivytaPois(param, audioCtx, kesto) {
  const t = audioCtx.currentTime;
  const lahto = Math.max(Number(param.value) || 0, HILJAA);
  katkaiseAutomaatio(param, t);
  if (typeof param.setValueCurveAtTime === 'function') {
    const kayra = new Float32Array(KAYRAN_PISTEET);
    for (let i = 0; i < KAYRAN_PISTEET; i++) {
      kayra[i] = lahto * Math.cos((i / (KAYRAN_PISTEET - 1)) * (Math.PI / 2));
    }
    try {
      param.setValueCurveAtTime(kayra, t, kesto);
      return;
    } catch {
      /* päällekkäinen automaatio — mennään rampilla */
    }
  }
  param.setValueAtTime(lahto, t);
  param.exponentialRampToValueAtTime(HILJAA, t + kesto);
}

/**
 * Nostaa voimakkuusparametrin hiljaisuudesta tasolleen TASATEHOISESTI.
 *
 * TÄMÄ ON RISTIHÄIVYTYKSEN TOINEN PÄÄ (omistajan toive: "virityssuhina
 * saisi feidautua kanavanvaihdon alussa ja lopussa. --- siinä pitäisi
 * olla ristifeidaus"). Kohina nousee siniä samalla kun edellinen kanava
 * väistyy kosinia (js/linssit/radio.js haivytaLahetysPois), täsmälleen
 * niin kuin lopussa mutta toisin päin. Sini ja kosini ovat sama pari kuin
 * haivytaPois-funktiossa, joten yhteisteho pysyy vakiona myös alussa.
 *
 * MIKSI EI PELKKÄ EKSPONENTTIRAMPPI, joka tässä ennen oli: se on
 * desibeliasteikolla suora eli nousee alussa hitaasti. Ristihäivytyksen
 * nousevan puolen pitää tehdä päinvastoin — nousta heti reippaasti — tai
 * vaihdon keskelle jää kuoppa, jossa kumpikaan ääni ei vielä kanna.
 *
 * Eksponenttiramppi jää varareitiksi sinne, missä setValueCurveAtTime
 * puuttuu, ks. haivytaPois.
 */
function haivytaSisaan(param, audioCtx, kesto, kohde) {
  const t = audioCtx.currentTime;
  const taso = Math.max(Number(kohde) || 0, HILJAA);
  katkaiseAutomaatio(param, t);
  if (typeof param.setValueCurveAtTime === 'function') {
    const kayra = new Float32Array(KAYRAN_PISTEET);
    for (let i = 0; i < KAYRAN_PISTEET; i++) {
      kayra[i] = taso * Math.sin((i / (KAYRAN_PISTEET - 1)) * (Math.PI / 2));
    }
    try {
      param.setValueCurveAtTime(kayra, t, kesto);
      return;
    } catch {
      /* päällekkäinen automaatio — mennään rampilla */
    }
  }
  param.setValueAtTime(HILJAA, t);
  param.exponentialRampToValueAtTime(taso, t + kesto);
}

/** Häivytyksen pituus sekunteina: kutsujan luku tai moduulin oletus. */
function haiveTai(arvo, oletus) {
  return Math.max(0.05, Number(arvo) || oletus);
}

/**
 * Rakentaa virittimen.
 *
 * @param {BaseAudioContext} audioCtx  pelin oma äänikonteksti (sfx.ensureContext())
 * @param {object}   [asetukset]
 * @param {number}   [asetukset.voimakkuus] 0–1, radion oma äänenvoimakkuusnuppi
 * @param {AudioNode} [asetukset.kohde]     mihin kytketään; oletus sfx.bus eli
 *                                          pelin kaiku- ja kompressoriketju
 * @param {() => boolean} [asetukset.mykistetty] oletus: pelin äänet pois päältä
 * @param {() => number}  [asetukset.arvonta]    satunnaislähde (testit, demot)
 * @returns {{aloita: Function, lopeta: Function, asetaVoimakkuus: Function}}
 */
export function teeViritin(audioCtx, {
  voimakkuus = 1,
  kohde = null,
  mykistetty = null,
  arvonta = Math.random,
} = {}) {
  let ulos = null;
  let katto = null;
  let kohinaVaimennus = null;
  let kohinaSuodatin = null;
  /*
   * Solmut kahdessa kasassa: pysyvä pohja (ulostulo, katto, kohinaketju)
   * ja jaksoittainen kertakäyttötavara (vihellykset, vilahdukset).
   * Jälkimmäinen puretaan heti kun jakso on vaiennut — muuten pitkä
   * viritys kasaisi solmuja loputtomiin, koska jaksoja tulee lisää
   * niin kauan kuin asemaa haetaan.
   */
  let pohja = { solmut: [], lahteet: [] };
  let jaksot = [];
  let nykyJakso = null;
  let ajastin = 0;
  let siivous = 0;
  let seuraavaAlku = 0;
  let kaynnissa = false;
  let lopetettu = false;
  let taso = rajaa(Number(voimakkuus) || 0, [0, 1]);

  const onMykistetty = typeof mykistetty === 'function'
    ? mykistetty
    // Oletus lukee pelin omaa äänivalintaa: jos pelaaja on sammuttanut
    // äänet, viritinkin on hiljaa — se ei ole radion ääni vaan pelin.
    : () => sfx?.enabled === false;

  /** Ajastin, joka ei pidä Nodea hereillä testeissä. */
  function ajasta(tehtava, ms) {
    const id = setTimeout(tehtava, ms);
    if (id && typeof id.unref === 'function') id.unref();
    return id;
  }

  /** Muistiin, jotta jakson vaihto ja lopeta() saavat solmut irti. */
  function muista(solmu, onLahde = false) {
    const kasa = nykyJakso ?? pohja;
    kasa.solmut.push(solmu);
    if (onLahde) kasa.lahteet.push(solmu);
    return solmu;
  }

  /** Irrottaa yhden kasan solmut ketjusta. */
  function pura(kasa) {
    for (const solmu of kasa.solmut) {
      try { solmu.disconnect(); } catch { /* jo irrotettu */ }
    }
  }

  /**
   * Soittaa yhden arvotun jakson ja ajastaa seuraavan.
   *
   * Kaikki tämän jakson tapahtumat aikataulutetaan kerralla äänisäikeelle,
   * joten pääsäie on jakson ajan täysin vapaa kartalle.
   */
  function soitaJakso() {
    if (lopetettu || !kaynnissa) return;
    const p = arvoViritysParametrit(arvonta);
    // Jos välilehti on ollut taustalla, ajastin herää myöhässä eikä
    // menneisyyteen voi enää aikatauluttaa mitään.
    const nyt = audioCtx.currentTime;
    const t0 = Math.max(seuraavaAlku, nyt + 0.02);

    // Vaienneiden jaksojen solmut pois ketjusta. Pysäytetty mutta
    // kytketty solmu jää elämään, koska ketju pitää siitä kiinni.
    jaksot = jaksot.filter((jakso) => {
      if (jakso.loppuu > nyt) return true;
      pura(jakso);
      return false;
    });
    nykyJakso = { loppuu: t0 + p.jakso + 0.5, solmut: [], lahteet: [] };
    jaksot.push(nykyJakso);

    // --- kohinapohjan liike -------------------------------------------
    kohinaVaimennus.gain.setValueAtTime(p.kohina.voima, t0);
    for (const piste of p.kohina.pisteet) {
      const t = t0 + piste.aika;
      kohinaSuodatin.frequency.linearRampToValueAtTime(piste.hz, t);
      kohinaSuodatin.Q.linearRampToValueAtTime(piste.q, t);
    }

    // --- heterodyne-vihellykset ---------------------------------------
    for (const v of p.vihellykset) {
      const alku = t0 + v.alku;
      const osc = muista(audioCtx.createOscillator(), true);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(v.alkuHz, alku);
      osc.frequency.exponentialRampToValueAtTime(Math.max(v.loppuHz, 20), alku + v.kesto);
      const g = muista(audioCtx.createGain());
      // Nousu ja lasku molemmat rampilla: vihellys tulee esiin ja katoaa
      // niin kuin asema liukuisi viisarin alta, ei kuin kytkin.
      verho(g.gain, {
        alku, kesto: v.kesto, huippu: v.voima, nousu: v.nousu, lasku: 0.35,
      });
      osc.connect(g).connect(ulos);
      osc.start(alku);
      osc.stop(alku + v.kesto + 0.05);
    }

    // --- asemien vilahdukset ------------------------------------------
    for (const v of p.vilahdukset) {
      const alku = t0 + v.alku;
      const loppu = alku + v.kesto;
      /*
       * Kohina väistyy asemalle ja palaa perässä — täsmälleen samassa
       * tahdissa kuin asema nousee ja laskee. Tämä on ristihäivytys eikä
       * kaksi erillistä liikettä: muuten toinen ehtii ensin ja väliin
       * jää joko aukko tai kaksinkertainen ääni.
       */
      const nousuAika = Math.max(0.05, v.kesto * v.nousu);
      const laskuAika = Math.max(0.06, v.kesto * v.lasku);
      kohinaVaimennus.gain.setValueAtTime(p.kohina.voima, Math.max(alku, t0));
      kohinaVaimennus.gain.linearRampToValueAtTime(p.kohina.voima * v.vaisto, alku + nousuAika);
      kohinaVaimennus.gain.setValueAtTime(p.kohina.voima * v.vaisto, loppu - laskuAika);
      kohinaVaimennus.gain.linearRampToValueAtTime(p.kohina.voima, loppu);

      const g = muista(audioCtx.createGain());
      g.gain.value = HILJAA;
      g.connect(ulos);

      if (v.laji === 'puhe') {
        // Kohinaa kahden formantin läpi = ihmisääni ilman sanoja. Sanoja
        // ei yritetäkään: tunnistettava puheenkaltaisuus riittää, ja
        // väärä kieli olisi pahempi kuin ei kieltä lainkaan.
        const lahde = muista(audioCtx.createBufferSource(), true);
        lahde.buffer = kohinaPuskuri(audioCtx);
        lahde.loop = true;
        for (let i = 0; i < 2; i++) {
          const f = muista(audioCtx.createBiquadFilter());
          f.type = 'bandpass';
          f.frequency.value = v.formantit[i];
          f.Q.value = v.formanttiQ[i];
          lahde.connect(f).connect(g);
        }
        for (const tavu of v.tavut) {
          verho(g.gain, {
            alku: alku + tavu.alku,
            kesto: tavu.kesto,
            huippu: v.voima * tavu.voima * FORMANTTI_KORJAUS,
            nousu: 0.25,
            lasku: 0.3,
          });
        }
        lahde.start(alku, arvonta() * (KOHINAN_KESTO - 0.1));
        lahde.stop(loppu + 0.05);
      } else {
        // Kaukainen musiikki: pari sointusäveltä, jotka nousevat ja
        // laskevat yhtenä eleenä.
        verho(g.gain, {
          alku, kesto: v.kesto, huippu: v.voima * MUSIIKIN_KORJAUS, nousu: v.nousu, lasku: v.lasku,
        });
        for (const hz of v.savelet) {
          const osc = muista(audioCtx.createOscillator(), true);
          osc.type = 'triangle';
          osc.frequency.value = hz;
          const og = muista(audioCtx.createGain());
          // Ylemmät sävelet hiljempaa, muuten sointu on kirkkaampi kuin
          // kohina jonka takaa sen pitäisi kuulua.
          og.gain.value = 0.45 / v.savelet.length;
          osc.connect(og).connect(g);
          osc.start(alku);
          osc.stop(loppu + 0.05);
        }
      }
    }

    // Pohja on taas se kasa, johon aloita() kirjaisi solmunsa.
    nykyJakso = null;
    seuraavaAlku = t0 + p.jakso;
    /*
     * Seuraava jakso ajastetaan hieman ennen kuin tämä loppuu, jotta
     * äänisäikeellä on tapahtumat valmiina eikä pohjan liikkeeseen jää
     * aukkoa. Tämä on virittimen AINOA pääsäikeen työ: yksi herätys noin
     * kuudessa sekunnissa.
     */
    ajastin = ajasta(soitaJakso, Math.max(60, (p.jakso - 0.4) * 1000));
  }

  /**
   * Aloittaa virityksen. Toinen kutsu ei tee mitään — päällekkäiset
   * viritykset olisivat kaksi radiota, ei yksi.
   *
   * `haiveSekunteina` on sisäänhäivytyksen pituus, ja se on kutsujan
   * tieto samasta syystä kuin lopetuksessakin: vain kutsuja tietää, onko
   * alku ristihäivytyksen puolikas (edellinen kanava väistyy samaan
   * tahtiin) vai nousu hiljaisuudesta. Oletus on moduulin oma alkuHaive.
   *
   * @returns {boolean} soiko viritin nyt
   */
  function aloita(haiveSekunteina = VIRITTIMEN_RAJAT.alkuHaive) {
    if (lopetettu || kaynnissa) return kaynnissa;
    if (!audioCtx || typeof audioCtx.createGain !== 'function') return false;
    if (onMykistetty()) return false;

    const paate = kohde ?? (audioCtx === sfx?.ctx ? sfx.bus : audioCtx.destination);
    if (!paate) return false;

    // Katto koko ketjulle: kuulokkeissa kirkas kohina on kipeää.
    katto = muista(audioCtx.createBiquadFilter());
    katto.type = 'lowpass';
    katto.frequency.value = VIRITTIMEN_RAJAT.katto;
    katto.Q.value = 0.7;
    katto.connect(paate);

    ulos = muista(audioCtx.createGain());
    ulos.connect(katto);
    const t0 = audioCtx.currentTime;
    // Kohina nousee ristihäivytyksen nousevaa puolta, ks. haivytaSisaan.
    ulos.gain.value = HILJAA;
    haivytaSisaan(
      ulos.gain, audioCtx, haiveTai(haiveSekunteina, VIRITTIMEN_RAJAT.alkuHaive),
      taso * ULOSTULON_TASO,
    );

    // Kohinapohja on yksi ainoa lähde koko virityksen ajan. Sen suodatin
    // liikkuu jaksosta toiseen, joten pohjaan ei tule saumaa silloinkaan
    // kun arvonta uusitaan.
    const lahde = muista(audioCtx.createBufferSource(), true);
    lahde.buffer = kohinaPuskuri(audioCtx);
    lahde.loop = true;
    // Matalat pois: kuulokkeissa alle sadan hertsin kohina on jyrinää,
    // eikä radion kohinapohjassa sellaista ole.
    const pohja = muista(audioCtx.createBiquadFilter());
    pohja.type = 'highpass';
    pohja.frequency.value = 130;
    kohinaSuodatin = muista(audioCtx.createBiquadFilter());
    kohinaSuodatin.type = 'bandpass';
    kohinaSuodatin.frequency.value = 700;
    kohinaSuodatin.Q.value = 1;
    kohinaVaimennus = muista(audioCtx.createGain());
    kohinaVaimennus.gain.value = HILJAA;
    lahde.connect(pohja).connect(kohinaSuodatin).connect(kohinaVaimennus).connect(ulos);
    // Aloituskohta arvotaan, ettei sama kohina ala aina samasta kohdasta.
    lahde.start(t0, arvonta() * (KOHINAN_KESTO - 0.1));

    kaynnissa = true;
    seuraavaAlku = t0;
    soitaJakso();
    return true;
  }

  /**
   * Lopettaa virityksen pehmeästi ja vapauttaa solmut.
   *
   * Turvallinen kutsua kahdesti ja ilman aloitusta: suora lähetys voi
   * alkaa tai pettää missä tahansa kohtaa, ja radiossa on kaksi paikkaa,
   * jotka molemmat pysäyttävät äänen.
   *
   * `haiveSekunteina` on häivytyksen pituus. Kutsuja antaa sen, koska vain
   * se tietää MIKSI viritys loppuu: suoran lähetyksen alkaessa häivytys on
   * ristihäivytyksen puolikas ja kestää saman kuin lähetyksen nousu, kun
   * taas stop-napin painallus saa loppua nopeasti. Oletus on moduulin oma
   * loppuHaive.
   */
  function lopeta(haiveSekunteina = VIRITTIMEN_RAJAT.loppuHaive) {
    clearTimeout(ajastin);
    ajastin = 0;
    if (lopetettu || !ulos) {
      lopetettu = true;
      kaynnissa = false;
      return;
    }
    lopetettu = true;
    kaynnissa = false;

    const haive = haiveTai(haiveSekunteina, VIRITTIMEN_RAJAT.loppuHaive);
    const t = audioCtx.currentTime;
    try {
      haivytaPois(ulos.gain, audioCtx, haive);
    } catch {
      /* solmu oli jo purettu */
    }
    // Lähteet pysäytetään vasta häivytyksen jälkeen: katkaisu kesken
    // häivytyksen olisi juuri se töksähdys, joka tässä yritetään välttää.
    // Kaikki kasat käydään läpi — myös jo vaienneet jaksot, joiden
    // lähteitä ei ole vielä ehditty purkaa.
    const kasat = [pohja, ...jaksot];
    for (const kasa of kasat) {
      for (const lahde of kasa.lahteet) {
        try { lahde.stop(t + haive + 0.05); } catch { /* jo pysäytetty */ }
      }
    }
    /*
     * Irrotus vasta kun kaikki on vaiennut. Pysäytetty mutta kytketty
     * solmu jää elämään, koska ketju pitää siitä kiinni — vasta
     * disconnect päästää roskienkerääjän niihin käsiksi.
     */
    pohja = { solmut: [], lahteet: [] };
    jaksot = [];
    nykyJakso = null;
    ulos = null;
    katto = null;
    kohinaVaimennus = null;
    kohinaSuodatin = null;
    siivous = ajasta(() => {
      siivous = 0;
      for (const kasa of kasat) pura(kasa);
    }, (haive + 0.2) * 1000);
  }

  /**
   * Radion äänenvoimakkuusnuppi kesken virityksen. Ramppi eikä hyppy,
   * koska nuppia vedetään sormella eikä askelin.
   *
   * Kesken oleva sisäänhäivytys katkaistaan siihen arvoon, mihin se on
   * ehtinyt (katkaiseAutomaatio): ilman sitä nupin vääntäminen vaihdon
   * aikana jättäisi kaksi automaatiota päällekkäin.
   */
  function asetaVoimakkuus(arvo) {
    taso = rajaa(Number(arvo) || 0, [0, 1]);
    if (!ulos || lopetettu) return taso;
    const t = audioCtx.currentTime;
    try {
      // LÄHTÖARVO ENNEN KATKAISUA, ks. katkaiseAutomaatio. Katkaisun
      // jälkeen luettu arvo on pohja-arvo eli HILJAA, ja nuppia
      // väännettäisiin joka kerta hiljaisuuden kautta.
      const lahto = Math.max(Number(ulos.gain.value) || 0, HILJAA);
      katkaiseAutomaatio(ulos.gain, t);
      ulos.gain.setValueAtTime(lahto, t);
      ulos.gain.exponentialRampToValueAtTime(Math.max(taso * ULOSTULON_TASO, HILJAA), t + 0.08);
    } catch {
      /* solmu oli jo purettu */
    }
    return taso;
  }

  return {
    aloita,
    lopeta,
    asetaVoimakkuus,
    get soi() { return kaynnissa; },
    // Vain testejä ja mittausta varten: kuinka monta solmua on elossa.
    get solmuja() {
      return pohja.solmut.length + jaksot.reduce((summa, j) => summa + j.solmut.length, 0);
    },
    // Siivousajastin näkyviin, jotta testi voi todeta sen käynnistyvän.
    get siivoaa() { return siivous !== 0; },
    // Kumpi kone soi. Nauhaviritin kertoo tässä valitsemansa äänitteen;
    // synteesillä ei ole nimettävää lähdettä.
    get valinta() { return null; },
  };
}

/* ═══════════════════════════════════════════════════════════════════════
 * TAPA 2: AIDOT ÄÄNITTEET
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Viisi vastaanotinäänitystä, kaikki public domainia, ks.
 * js/packs/viritysaanet.js. Silmukka soitetaan Web Audiolla eikä
 * <audio loop>:lla: mp3:n koodausviive jättäisi kierrosten väliin pienen
 * tauon, ja kohinassa tauko kuuluu.
 */

/*
 * Puretut äänitteet kontekstia kohti: tiedostonimi → lupaus AudioBufferista.
 *
 * MIKSI PURETUT EIKÄ RAAKATAVUT: decodeAudioData irrottaa saamansa
 * ArrayBufferin (detach), joten samaa tavupuskuria ei voi purkaa toista
 * kertaa. Puretut puskurit taas kelpaavat rajattomasti — ja radiotilassa
 * viritys alkaa uudestaan joka napautuksella.
 *
 * Muisti vapautetaan unohdaViritysaanet():lla, kun radiotila suljetaan.
 * Viisi purettua pätkää on 48 kHz:n kontekstissa noin 8 Mt, eikä sitä ole
 * syytä pitää tallessa koko pelin ajan yhden linssin takia.
 */
const NAUHAT = new WeakMap();

/** Kontekstin oma nauhakori, luodaan tarvittaessa. */
function nauhakori(audioCtx) {
  let kori = NAUHAT.get(audioCtx);
  if (!kori) {
    kori = new Map();
    NAUHAT.set(audioCtx, kori);
  }
  return kori;
}

/**
 * Hakee ja purkaa yhden viritysäänen. Palauttaa lupauksen, joka on
 * `null`, jos ääntä ei saatu — silloin soitin putoaa synteesiin.
 *
 * Epäonnistunut haku POISTETAAN korista, jotta seuraava viritys yrittää
 * uudelleen: verkko voi olla poikki hetken, ja pysyvästi muistettu virhe
 * tuomitsisi koko istunnon synteesiin yhden katkoksen takia.
 */
function haeNauha(audioCtx, aani) {
  const kori = nauhakori(audioCtx);
  const nimi = aani?.tiedosto;
  if (!nimi) return Promise.resolve(null);
  const valmis = kori.get(nimi);
  if (valmis) return valmis;

  const lupaus = (async () => {
    // haeAani: ämpäri ensin, repon polku varalla (js/media.js).
    // Viritysäänet eivät ole enää sw.js:n esilatauslistalla, joten tämä
    // on oikeasti verkkohaku ensimmäisellä kerralla.
    const vastaus = await haeAani(viritysPolku(aani));
    if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
    const tavut = await vastaus.arrayBuffer();
    // decodeAudioData ottaa myös takaisinkutsut; lupausmuoto on se, jota
    // kaikki nykyselaimet tukevat ja jonka virheen saa kiinni.
    return await audioCtx.decodeAudioData(tavut);
  })().catch((syy) => {
    console.warn('Viritysäänen lataus epäonnistui.', nimi, syy);
    kori.delete(nimi);
    return null;
  });
  kori.set(nimi, lupaus);
  return lupaus;
}

/**
 * Noutaa viritysäänet verkosta valmiiksi selaimen välimuistiin.
 *
 * EI PURA NIITÄ. Purkaminen veisi muistia turhaan — pelaaja ehkä avaa
 * radion mutta ei soita mitään. Nouto taas on 284 kt kerran ja poistaa
 * ainoan kohdan, jossa viritys voisi alkaa myöhässä: ensimmäisen
 * napautuksen. Nouto menee ämpäriin (js/media.js haeAani) ja jää
 * palvelutyöntekijän äänikoriin, joten seuraavilla kerroilla tämä ei
 * tee mitään verkkoon.
 */
export function esilataaViritysaanet(audioCtx = null) {
  if (viritystapa() !== 'nauha') return;
  // Äänikonteksti saa puuttua. Juuri silloin tämä on tarpeellisimmillaan:
  // radiotila on vasta avattu eikä yhtään ääntä ole soinut, joten mitään
  // ei ole vielä purettuna eikä välimuistissa.
  const kori = audioCtx ? nauhakori(audioCtx) : null;
  for (const aani of VIRITYSAANET) {
    if (kori?.has(aani.tiedosto)) continue;
    haeAani(viritysPolku(aani)).then((v) => v.arrayBuffer()).catch(() => {
      /* nouto on pelkkää etukäteistyötä: virhe hoidetaan vasta haeNauhassa */
    });
  }
}

/** Vapauttaa kontekstin puretut viritysäänet (radiotila suljettiin). */
export function unohdaViritysaanet(audioCtx) {
  if (audioCtx) NAUHAT.delete(audioCtx);
}

/*
 * Äänitteen ulostulon taso, MITATTU eikä arvattu.
 *
 * Pätkät on normalisoitu RMS −20 dB:hen (js/packs/viritysaanet.js), ja
 * pelin masteriketju vaimentaa noin 14 dB (js/sound.js: dry 0,82 ×
 * master 0,24). Ilman korotusta viritys jäisi RMS −36 dBFS:ään eli
 * selvästi hiljaisemmaksi kuin synteesi, jonka taso mitattiin
 * kuunneltavaksi.
 *
 * Kerroin 1,5 mitattiin nauhoittamalla kolme viritystä molemmilla
 * tavoilla pelin masteriketjun läpi: nauha RMS −31,7…−31,9 dBFS,
 * synteesi −31,9…−33,8 dBFS. Ero on alle desibelin, joten tavan
 * vaihtaminen VIRITYKSEN_TAPA-vakiosta ei muuta äänenvoimakkuutta.
 *
 * Jos tätä muuttaa, MITTAA UUDELLEEN — ks. ULOSTULON_TASO yllä.
 */
const NAUHAN_TASO = 1.5;

/*
 * Viimeksi arvottu äänite koko moduulin muistissa, ei virittimen.
 *
 * Jokainen viritys on OMA virittimensä (teeViritysaani kutsutaan joka
 * napautuksella), joten virittimen sisään talletettu muisti ei muistaisi
 * mitään. Sääntö "ei samaa kahdesti peräkkäin" tarvitsee juuri sen tiedon,
 * mikä soi edellisellä kerralla.
 */
let edellinenNauha = null;

/**
 * Rakentaa nauhavirittimen: aito äänite silmukkana, arvottu aloituskohta.
 *
 * ALOITUSKOHTA ARVOTAAN, ja se on turvallista NIMENOMAAN SILMUKASSA.
 * Pätkät ovat 7–9 s eli lyhyempiä kuin viritys pisimmillään (12 s), joten
 * kertasoittona keskeltä aloittaminen katkaisisi äänen kesken. Silmukassa
 * toisto kiertää tiedoston lopusta sen alkuun, ja juuri se sauma on
 * ristihäivytetty tuotannossa — arvottu aloituskohta siirtää vain sitä
 * kohtaa, jossa sauma ohitetaan.
 *
 * Rajapinta on sama kuin synteesivirittimellä, ks. teeViritin.
 *
 * @param {BaseAudioContext} audioCtx
 * @param {object}  [asetukset]
 * @param {object}  [asetukset.aani] pakotettu äänite (mittaus ja demot)
 */
export function teeNauhaviritin(audioCtx, {
  voimakkuus = 1,
  kohde = null,
  mykistetty = null,
  arvonta = Math.random,
  aani = null,
} = {}) {
  let ulos = null;
  let lahde = null;
  let vara = null;
  let kaynnissa = false;
  let lopetettu = false;
  let valittu = null;
  let aloituskohta = 0;
  let taso = rajaa(Number(voimakkuus) || 0, [0, 1]);
  /*
   * Sisäänhäivytyksen pituus talteen aloita():sta. Äänite puretaan
   * taustalla, joten häivytys alkaa vasta lupauksen ratkettua — ja
   * silloin kutsujan antama luku on jo kaukana kutsupinosta.
   */
  let alkuHaive = VIRITTIMEN_RAJAT.alkuHaive;

  const onMykistetty = typeof mykistetty === 'function'
    ? mykistetty
    : () => sfx?.enabled === false;

  /** Nauhan huipputaso nykyisellä nupin asennolla. */
  const huippu = () => Math.max(taso * NAUHAN_TASO, HILJAA);

  /*
   * Varareitti: äänite ei latautunut, joten soitetaan synteesi.
   *
   * Tämä on syy siihen, ettei nauhatapa voi jättää viritystä hiljaiseksi.
   * Peli avataan myös levyltä (file:) ja yhden tiedoston versiona, joissa
   * fetch ei tuo mitään — ja hiljainen tauko on juuri se, minkä omistaja
   * halusi pois.
   */
  function kaynnistaVara() {
    vara = teeViritin(audioCtx, {
      voimakkuus: taso, kohde, mykistetty: () => false, arvonta,
    });
    // Sama sisäänhäivytys kuin nauhalla: varareitin pitää kuulostaa
    // samalta myös vaihdon alussa, tai sen tunnistaa varareitiksi.
    if (!vara.aloita(alkuHaive)) vara = null;
  }

  /** Panee puretun äänitteen soimaan silmukkana arvotusta kohdasta. */
  function kaynnistaNauha(puskuri) {
    const t0 = audioCtx.currentTime;
    lahde = audioCtx.createBufferSource();
    lahde.buffer = puskuri;
    lahde.loop = true;
    lahde.connect(ulos);
    // Aloituskohta mistä tahansa pätkän sisältä. Viimeisen kymmenyksen
    // jättäminen väliin ei ole makuasia: puskurin lopun yli aloitettu
    // toisto alkaa Web Audiossa hiljaisuudella eikä silmukan alusta.
    aloituskohta = arvonta() * Math.max(0, puskuri.duration - 0.1);
    lahde.start(t0, aloituskohta);
    // Nousu ristihäivytyksen sinipuolta, ks. haivytaSisaan.
    ulos.gain.value = HILJAA;
    haivytaSisaan(ulos.gain, audioCtx, alkuHaive, huippu());
  }

  /**
   * Aloittaa virityksen. Palauttaa heti — äänite puretaan taustalla, ja
   * jos lopeta() ehtii ensin, mitään ei käynnisty.
   *
   * `haiveSekunteina` on sisäänhäivytyksen pituus, ks. teeViritin aloita.
   */
  function aloita(haiveSekunteina = VIRITTIMEN_RAJAT.alkuHaive) {
    if (lopetettu || kaynnissa) return kaynnissa;
    if (!audioCtx || typeof audioCtx.createGain !== 'function') return false;
    if (onMykistetty()) return false;
    const paate = kohde ?? (audioCtx === sfx?.ctx ? sfx.bus : audioCtx.destination);
    if (!paate) return false;

    valittu = aani ?? arvoViritysaani(edellinenNauha, arvonta);
    edellinenNauha = valittu;
    kaynnissa = true;
    alkuHaive = haiveTai(haiveSekunteina, VIRITTIMEN_RAJAT.alkuHaive);

    ulos = audioCtx.createGain();
    ulos.gain.value = HILJAA;
    ulos.connect(paate);

    haeNauha(audioCtx, valittu).then((puskuri) => {
      if (lopetettu || !kaynnissa || !ulos) return;
      if (puskuri) kaynnistaNauha(puskuri);
      else kaynnistaVara();
    });
    return true;
  }

  /**
   * Lopettaa virityksen. Turvallinen kutsua kahdesti ja ilman aloitusta,
   * ks. teeViritin lopeta — radio pysäyttää äänen useasta kohdasta.
   */
  function lopeta(haiveSekunteina = VIRITTIMEN_RAJAT.loppuHaive) {
    if (lopetettu) return;
    lopetettu = true;
    kaynnissa = false;
    const haive = haiveTai(haiveSekunteina, VIRITTIMEN_RAJAT.loppuHaive);
    vara?.lopeta(haive);
    vara = null;
    if (!ulos) return;

    try {
      haivytaPois(ulos.gain, audioCtx, haive);
    } catch {
      /* solmu oli jo purettu */
    }
    // Lähde pysäytetään vasta häivytyksen jälkeen: katkaisu kesken
    // häivytystä on juuri se töksähdys, jota tässä vältetään.
    const loppu = audioCtx.currentTime + haive + 0.05;
    try { lahde?.stop(loppu); } catch { /* ei vielä käynnistynyt */ }
    const vanhat = [lahde, ulos];
    lahde = null;
    ulos = null;
    // Irrotus vasta kun kaikki on vaiennut: pysäytetty mutta kytketty
    // solmu jää elämään, koska ketju pitää siitä kiinni.
    const siivoa = () => {
      for (const solmu of vanhat) {
        try { solmu?.disconnect(); } catch { /* jo irrotettu */ }
      }
    };
    const id = setTimeout(siivoa, (haive + 0.2) * 1000);
    if (id && typeof id.unref === 'function') id.unref();
  }

  /** Radion äänenvoimakkuusnuppi kesken virityksen. */
  function asetaVoimakkuus(arvo) {
    taso = rajaa(Number(arvo) || 0, [0, 1]);
    vara?.asetaVoimakkuus(taso);
    if (!ulos || lopetettu) return taso;
    const t = audioCtx.currentTime;
    try {
      // Lähtöarvo ennen katkaisua, ks. katkaiseAutomaatio.
      const lahto = Math.max(Number(ulos.gain.value) || 0, HILJAA);
      katkaiseAutomaatio(ulos.gain, t);
      ulos.gain.setValueAtTime(lahto, t);
      ulos.gain.exponentialRampToValueAtTime(huippu(), t + 0.08);
    } catch {
      /* solmu oli jo purettu */
    }
    return taso;
  }

  return {
    aloita,
    lopeta,
    asetaVoimakkuus,
    get soi() { return kaynnissa; },
    get solmuja() { return (ulos ? 1 : 0) + (lahde ? 1 : 0) + (vara?.solmuja ?? 0); },
    get siivoaa() { return false; },
    // Kumpi äänite arvottiin ja mistä kohtaa se alkoi. Mittaus ja demot
    // lukevat nämä; peli ei.
    get valinta() { return valittu; },
    get aloituskohta() { return aloituskohta; },
  };
}

/**
 * Kumpi tapa on voimassa: 'nauha' vai 'synteesi'.
 *
 * Erillinen funktio eikä pelkkä vakio, koska valinta riippuu myös siitä,
 * montako äänitettä pakkauksessa oikeasti on — ja se voi muuttua ilman
 * että tätä tiedostoa kosketaan (js/packs/viritysaanet.js on työkalun
 * tuottama).
 */
export function viritystapa(aanet = VIRITYSAANET, tapa = VIRITYKSEN_TAPA) {
  if (tapa === 'nauha' || tapa === 'synteesi') return tapa;
  return (aanet?.length ?? 0) >= NAUHOJEN_VARA ? 'nauha' : 'synteesi';
}

/**
 * Rakentaa viritysäänen voimassa olevalla tavalla. TÄTÄ RADIO KUTSUU.
 *
 * @param {BaseAudioContext} audioCtx
 * @param {object} [asetukset] samat kuin teeViritin / teeNauhaviritin
 */
export function teeViritysaani(audioCtx, asetukset = {}) {
  return viritystapa() === 'nauha'
    ? teeNauhaviritin(audioCtx, asetukset)
    : teeViritin(audioCtx, asetukset);
}
