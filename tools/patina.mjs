/*
 * PATINAPASSI: valmiin karttalehden jälkikäsittely 1873-vedokseksi.
 *
 *   node tools/patina.mjs <pohjakuva> <ulos-kansio> \
 *        [--taso hillitty|keskitaso|taysi|kaikki] [--tunnus GRC] \
 *        [--leveys 6400] [--laatu 0.9] [--muoto jpeg|webp|png] \
 *        [--vertailu] [--pala x,y,w,h]
 *
 * Työkalu EI piirrä karttaa. Se ottaa valmiin lehden
 * (tools/tee-fokuskartta.mjs tuottama GRC.webp tai vastaava) ja lisää
 * siihen sen, mitä painettu ja sata vuotta säilytetty paperi tekee
 * kuvalle: musteen sävyn, paperin syyn, ikääntymisen laikut,
 * akvarellin reunakertymän, rannikon vesiviivoituksen, painolaattojen
 * kohdistusheiton, musteen leviämisen ja taitteet.
 *
 * Miksi jälkikäsittelynä eikä piirtomoottorissa? Koska nämä ovat
 * TYYLIVALINTOJA, jotka on nähtävä rinnakkain ennen kuin yksi
 * valitaan. Piirtomoottorissa jokainen kokeilu maksaa täyden
 * renderöinnin (aineistot, ETOPO, selainajo); tässä se maksaa
 * sekunteja samasta pohjasta. Kun resepti on valittu, se ajetaan
 * samalla tiedostolla koko maailman lehdille — reseptiolio on siksi
 * yhdessä paikassa (RESEPTIT) eikä hajallaan koodissa.
 *
 * === KOLME TASOA ===
 *
 * `hillitty`   vain sävyt: viivat tummanruskeiksi (ei mustiksi),
 *              valkoinen kermaksi, sävykäyrä pehmeäksi, maaston
 *              pastellointi, lumppupaperin syy.
 * `keskitaso`  edelliset + epätasainen ikääntymissävy + akvarellin
 *              reunakertymä värialueiden rajoilla + rannikon
 *              vesiviivoitus.
 * `taysi`      kaikki + viivojen mikrorosoisuus + painolaattojen
 *              kohdistusheitto + musteen leviäminen nimissä +
 *              vinjetointi.
 *
 * Taso ei ole kytkinlista vaan valmis resepti: jokainen taso on
 * itsenäinen parametriolio, jota voi säätää rikkomatta muita.
 *
 * === LUETTAVUUS ON ETUSIJALLA ===
 *
 * Lehti on pelin luettava kartta, ei kuvitus. Siksi jokainen efekti,
 * joka koskee mustetta (rosoisuus, leviäminen) tai kontrastia
 * (sävykäyrä, vinjetti), on rajattu niin ettei nimien ja rantaviivan
 * erottuvuus laske. Kaksi kohtaa on erityisen herkkää ja ne on
 * kirjattu myös tänne, jotta seuraava säätäjä tietää mistä varoa:
 *
 *  1. SÄVYKÄYRÄN NOSTO nostaa mustan harmaaksi. Yli 24:n nosto alkaa
 *     syödä pienen tekstin ja rantaviivan eroa paperiin.
 *  2. MUSTEEN LEVIÄMINEN sumentaa nimet, jos säde ylittää noin
 *     kolme pikseliä 6400 pikselin leveydellä. Se on tarkoitettu
 *     hiuksenhienoksi kehäksi kirjaimen ympärille, ei sumennukseksi.
 *  3. PASTELLOINTI vaalentaa ja desaturoi maaston. Se on rajattu
 *     luminanssi- JA kromamaskilla keskisävyihin, jotta muste (tumma)
 *     ja meri (matala kroma) jäävät koskematta. Jos maskin alarajaa
 *     laskee alle 110:n, se alkaa haalistaa nimien reunapikseleitä.
 *
 * === PROSEDURAALINEN KOHINA, EI ULKOISIA TEKSTUUREJA ===
 *
 * Paperin syy, ikääntymisen laikut ja musteen rosoisuus syntyvät
 * siemenellisestä arvokohinasta (mulberry32 + bilineaarinen haku,
 * sama tapa kuin tools/fokuskartta/piirto.js). Ulkopuolisia
 * paperiskannauksia ei käytetä: ne olisivat lisenssikysymys
 * (CLAUDE.md: kuvat ja media vain PD/CC tarkistettuina) ja sitoisivat
 * lehden yhteen skannaukseen, joka toistuisi näkyvästi joka maassa.
 *
 * Kuvankäsittely ajetaan selaimen canvasilla (Playwright + Chromium),
 * koska koko putki tekee jo niin (tools/savyta-miniatyyrit.mjs,
 * tools/tee-fokuskartta.mjs) eikä repossa ole natiivikirjastoja
 * (sharp, canvas) eikä asennusvaihetta.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, extname, resolve } from 'node:path';

/* ============================================================ RESEPTIT */

/*
 * SÄVYT — kaikilla tasoilla sama pohja.
 *
 * Mitattu pohjakuvasta (GRC.webp, 6400 x 4000, 29.8.2026): tummimmat
 * pikselit ovat keskimäärin rgb(68,52,32) eli jo ruskeita, valkoisin
 * pää rgb(251,241,190) eli kellertävä. Mustaa (L<40) on 0,002 % ja
 * puhdasta valkoista ei käytännössä lainkaan. Sävytyön tehtävä ei ole
 * siis pelastaa mustaa vaan viimeistellä: nostaa musteen sävy
 * yhtenäiseksi lämpimäksi ruskeaksi, viedä kirkkain pää keltaisesta
 * kermaan ja pehmentää kontrasti painetun vedoksen tapaan.
 */
const SAVYT = {
  /* Musteen tavoiteväri. Tummempi kuin piirto.js:n MUSTE (#4a3421),
   * koska tämä on vain sävy — kirkkaus tulee pikselistä itsestään. */
  muste: [74, 52, 34],
  /* L-väli, jolla pikseli tulkitaan musteeksi. Alaraja täydellä
   * painolla, yläraja nollalla; väliin jää pehmeä reunapikselien
   * vyöhyke, jotta antialiasointi ei katkea. */
  musteVali: [70, 158],
  musteVoima: 0.55,
  /* Kerma. Ei valkoinen eikä pohjan kellertävä huippu, vaan lämmin
   * mutta neutraalimpi paperinvalkoinen. */
  kerma: [245, 237, 214],
  kermaVali: [224, 253],
  kermaVoima: 0.65,
  /*
   * Sävykäyrä: L' = L * kerroin + nosto. Kerroin 0,9 ja nosto 15
   * jättävät valkoisen 245:een ja nostavat mustan 15:een — vedoksen
   * pehmeä kontrasti ilman että pieni teksti sulaa paperiin (ks.
   * luettavuusvaroitus tiedoston alussa).
   */
  kayra: { kerroin: 0.9, nosto: 15 },
};

/*
 * LUMPPUPAPERIN SYY JA RAE.
 *
 * MIKSI KOLME KERROSTA EIKÄ YKSI. Ensimmäinen versio oli yksi
 * venytetty kohina, ja kun sen voiman nosti näkyväksi, koko lehden yli
 * kulki säännöllinen vaakasyy: se luki skannerin juovana eikä
 * paperina. Voiman puolittaminen poisti juovan mutta samalla paperin.
 *
 * Oikea korjaus ei ole voima vaan SKAALAHAJONTA. Kolme kuitukerrosta
 * eri taajuuksilla (ei toistensa kerrannaisia) ja eri faaseilla
 * summautuvat epäjaksolliseksi syyksi, jota silmä ei lue rasterina.
 * Päälle tulee DOMAIN WARP: matalataajuinen kohina heiluttaa kuidun
 * omia koordinaatteja, jolloin kuitu aaltoilee kuten käsinammennetussa
 * paperissa eikä kohinataulun 512 yksikön kierto näy toistona.
 *
 * Rae on kahdessa osassa: pikselikohtainen hajautusrae (näkyy 1:1) ja
 * muutaman pikselin nyppy (näkyy myös pienennettynä). Kumpikaan ei ole
 * suuntautunut, joten kumpikaan ei voi tuottaa juovaa.
 *
 * Kerros = [skaalaX, skaalaY, paino, faasiX, faasiY]. Skaala on
 * pikseleitä kohinataulun yksikköä kohti 6400 pikselin lehdellä:
 * 90 x 6 tarkoittaa noin kuuden pikselin korkuisia, satojen pikselien
 * mittaisia kuituja.
 */
const PAPERI_KEVYT = {
  /* Pikselikohtainen rae, ±osuus. */
  rae: 0.050,
  /* Muutaman pikselin nyppy: karkeampi rakeisuus, joka kestää
   * pienennyksen. Skaala on pikseleitä kohinayksikköä kohti. */
  raeKarkea: 0.038,
  raeKarkeaSkaala: 2.4,
  kuitu: 0.042,
  kuituKerrokset: [
    [90, 6.0, 1.00, 0, 0],
    [47, 3.3, 0.62, 613, 271],
    [151, 11.5, 0.45, 2287, 1499],
  ],
  /* Toinen kuitusuunta hennompana — käsintehdyssä paperissa syy ei
   * ole yhdensuuntainen. */
  kuituRisti: 0.026,
  kuituRistiKerrokset: [
    [7.0, 70, 1.00, 1000, 500],
    [4.3, 38, 0.55, 3121, 907],
  ],
  /* Domain warp: [skaala pikseleinä, siirtymä kohinayksikköinä]. */
  warpSkaala: 300,
  warpVoima: 2.2,
};

/* Sama syy vahvempana täydellä tasolla. */
const PAPERI_TAYSI = {
  ...PAPERI_KEVYT,
  rae: 0.072, raeKarkea: 0.054, kuitu: 0.058, kuituRisti: 0.036,
};

/*
 * KORKEUSVARJOSTUKSEN PASTELLOINTI.
 *
 * Pohjan hypsometria ja rinnevarjostus ovat piirtomoottorissa
 * täysvahvoja: vuoristo on kylläistä oranssinruskeaa ja alanko
 * kirkasta keltaista. Painetussa 1873-vedoksessa maasto on samat
 * sävyt PUOLIKKAALLA kylläisyydellä ja korkeammalla vaaleudella —
 * väri on nostettu paperista eikä ruiskutettu sen päälle. Ilman tätä
 * passia lehti lukee digitaalisena reliefinä, ei litografiana.
 *
 * Efekti on kaksiosainen: kylläisyys lasketaan kohti pikselin omaa
 * luminanssia (LÄMPIMÄNÄ, ks. paperiSavy — kohti neutraalia harmaata
 * vedettynä maasto muuttuisi likaiseksi) ja tummat päät nostetaan
 * kohti kermaa.
 *
 * MASKI ON KOKO EFEKTIN TURVA. Se on kahden ehdon tulo:
 *  - luminanssi keskisävyissä: muste (L noin 65 sävytyksen jälkeen)
 *    jää alarajan alle eikä haalistu;
 *  - kroma riittävän suuri: meri on viileää paperia kromalla noin 30
 *    ja jää alarajan alle, joten vesiviivoitus ja meren sävy säilyvät.
 * Kumpikin raja on pehmeä, jotta maski ei piirrä omaa reunaansa.
 */
const PASTELLI_KEVYT = {
  /* Kylläisyyden lasku maskin täydellä painolla. */
  kyllaisyys: 0.26,
  /* Kohti mitä desaturoidaan: luminanssin kerroin kanavittain.
   * Lämmin harmaa, ei neutraali. */
  paperiSavy: [1.045, 0.995, 0.905],
  /* Tummien nosto kohti kermaa. */
  vaalennus: 0.10,
  vaalennusKohde: [246, 239, 219],
  /* Nosto painottuu tähän luminanssivyöhykkeeseen: täysi alarajalla,
   * nolla ylärajalla. Vuoristo on tummaa, alanko jo valmiiksi vaaleaa. */
  vaalennusVali: [120, 225],
  /* Maskin luminanssi-ikkuna [ala, ylä] ja reunojen pehmeys. */
  lumVali: [118, 238],
  lumPehmeys: 26,
  /* Maskin kromaikkuna: alle ala ei mitään (meri), yli ylä täysi. */
  kromaVali: [36, 72],
};

const PASTELLI_KESKI = {
  ...PASTELLI_KEVYT, kyllaisyys: 0.35, vaalennus: 0.15,
};

const PASTELLI_TAYSI = {
  ...PASTELLI_KEVYT, kyllaisyys: 0.43, vaalennus: 0.19,
};

/*
 * EPÄTASAINEN IKÄÄNTYMISSÄVY.
 *
 * Matalataajuinen kohina, joka tummentaa ja lämmittää laikuittain.
 * `lampo` kertoo, kuinka paljon enemmän sininen kanava tummuu kuin
 * punainen: ikääntyminen on kellastumista, ei harmaantumista.
 */
const IKAANTYMINEN = {
  voima: 0.075, skaala: 2.6, oktaavit: 3, lampo: 0.55,
  /* Reunat vanhenevat enemmän kuin keskusta (käsittely, valo, pöly). */
  reunapaino: 0.5,
};

/*
 * AKVARELLIN REUNAKERTYMÄ.
 *
 * Märkä väri kuivuu paksummaksi alueensa reunalle. Reunat haetaan
 * NELJÄSOSATARKKUUDELLA ja niin, että musteen omat pikselit jätetään
 * keskiarvon ulkopuolelle — muuten jokainen kirjain ja rantaviiva
 * saisi ympärilleen tumman kehän ja lehti sotkeutuisi. Näin jäljelle
 * jäävät vain oikeat värialueiden rajat: rannikko, hypsometrian
 * vyöhykkeet, naapurimaiden häivytys.
 *
 * TARKKUUS ON ITSE EFEKTIN LEVEYS. Kahdeksasosakuvalla Sobelin kolme
 * solua on 24 pikseliä, ja rannikko sai molemmin puolin niin leveän
 * tumman hunnun, että rantaviiva näytti sumealta. Neljäsosakuvalla
 * kertymä on 12 pikseliä eli akvarellin reuna eikä sumennus.
 */
const REUNAKERTYMA = {
  voima: 0.24,
  /* Sobelin tulos normalisoidaan tähän: sitä suurempi ero on
   * "täysi reuna". Yksikkö on 0-255 neljäsosakuvassa. */
  taysiEro: 30,
  /* Kertymä painottuu rajan tummemmalle puolelle (siihen, mihin väri
   * valuu); 0 = symmetrinen, 1 = vain tumma puoli. */
  tummaPaino: 0.55,
};

/*
 * RANNIKON VESIVIIVOITUS.
 *
 * 1800-luvun atlaksen tunnusmerkki: rantaviivan myötäiset ohuet
 * viivat merenpuolella, tiheimmät rannassa ja harvenevat ulospäin.
 *
 * Meri tunnistetaan KROMASTA, ei sinisestä: tämän lehden meri on
 * viileää paperia (piirto.js SYVYYS), ei sinistä. Mitattu
 * pohjakuvasta: meren kroma (max-min) on 28-34, maan 45-91 myös
 * häivytetyillä naapureilla. Raja 34...42 erottaa ne varmasti.
 *
 * Etäisyys rannasta lasketaan neljäsosatarkkuudella kahden pyyhkäisyn
 * chamfer-muunnoksella ja haetaan täydelle tarkkuudelle
 * bilineaarisesti. Neljäsosan kvantisointi näkyy viivan pienenä
 * huojuntana — mikä on käsin piirretyssä kartassa oikein.
 */
const VESIVIIVOITUS = {
  /* Viivaväli täysillä pikseleillä 6400 pikselin leveydellä. */
  vali: 15,
  /* Montako viivaa rannasta ulospäin. */
  viivoja: 7,
  /* Ensimmäisen viivan tummennus; loput vaimenevat. */
  voima: 0.085,
  /*
   * Viivan paksuus osuutena välistä. 0,2 x 15 px = kolme pikseliä
   * 6400 pikselin lehdellä. Leveämpi (0,3) luki sumeana huntuna eikä
   * viivana — vesiviivoituksen on oltava terävää ollakseen viivaa.
   */
  leveys: 0.2,
  /* Meren kromaraja [täysi meri, ei enää meri]. */
  kromaVali: [34, 44],
  /* Viivaa ei piirretä aivan rantaviivan päälle, jottei se paksunna
   * itse rantaviivaa: ensimmäinen viiva alkaa tästä etäisyydestä. */
  aloitus: 8,
};

/* Viivojen mikrorosoisuus: musteen reuna ei ole tasainen. */
const ROSOISUUS = { voima: 0.5, skaala: 420 };

/*
 * PAINOLAATTOJEN KOHDISTUSHEITTO — VAROVASTI.
 *
 * Kivipainossa värilaatta ei osu viivalaattaan pikselilleen. Sitä ei
 * jäljitellä siirtämällä koko kuvaa (silloin siirtyisivät myös nimet
 * ja rantaviiva, ja kartta menisi pois kohdistaan laudan kanssa) vaan
 * lisäämällä pikseliin MATALATAAJUISEN VÄRIN erotus siirretystä
 * kohdasta. Viiva- ja tekstitieto on korkeataajuista ja jää
 * paikalleen; siirtymä näkyy vain värialueiden rajoilla ohuena
 * väriripsauksena, kuten oikeassa vedoksessa.
 */
const KOHDISTUS = { dx: 2.6, dy: -1.8, voima: 0.85 };

/* Musteen kevyt leviäminen: hiuksenhieno kehä kirjaimen ympärille. */
const LEVIAMINEN = { sade: 2, voima: 0.3 };

/*
 * KEVYET TAITEJÄLJET — POIS KÄYTÖSTÄ KAIKISSA RESEPTEISSÄ.
 *
 * Ajatus: lehti on ollut taitettuna, yksi pystytaite keskellä ja kaksi
 * vaakataitetta kolmanneksissa; kapea tummempi ydin ja sen molemmin
 * puolin leveä vaalea vyöhyke (paperi on kohonnut).
 *
 * MIKSI POIS. Omistajan arvio 29.8.2026: "taitteet näyttävät
 * feikiltä". Syy on rakenteellinen eikä parametreissa: gaussinen viiva
 * kulkee koko lehden yli yhtä vahvana riippumatta siitä, mitä sen alla
 * on, kun oikeassa taitteessa muste on kulunut ytimestä pois ja
 * vaurio vaihtelee koko matkalla. Voiman pienentäminen ei korjaa
 * ilmiötä, se vain tekee siitä himmeän. Koodi jätetään paikalleen: jos
 * toteutus joskus paranee (musteen kuluminen ytimessä, epätasainen
 * vaurio, taitteen katkeaminen), riittää vaihtaa reseptin kenttä
 * `taitteet: false` arvoksi `TAITTEET`.
 */
const TAITTEET = {
  pysty: [0.5], vaaka: [0.34, 0.68],
  voima: 0.05, ydin: 2.4, hehku: 90, hehkuOsuus: 0.35,
  /* Taite ei ole viivotinsuora: kohina heiluttaa sitä. */
  huojunta: 6,
};

/* Vinjetointi: reunat tummenevat ja lämpenevät. */
const VINJETTI = { voima: 0.1, eksponentti: 2.4, lampo: 0.4 };

export const RESEPTIT = {
  hillitty: {
    nimi: 'hillitty',
    savyt: SAVYT,
    pastelli: PASTELLI_KEVYT,
    paperi: PAPERI_KEVYT,
    ikaantyminen: null,
    reunakertyma: null,
    vesiviivoitus: null,
    rosoisuus: null,
    kohdistus: null,
    leviaminen: null,
    /* Ks. TAITTEET: pois kaikista resepteistä, koodi jätetty lipun
     * taakse. Arvoksi TAITTEET, jos toteutus joskus paranee. */
    taitteet: false,
    vinjetti: null,
  },
  keskitaso: {
    nimi: 'keskitaso',
    savyt: SAVYT,
    pastelli: PASTELLI_KESKI,
    paperi: PAPERI_KEVYT,
    ikaantyminen: IKAANTYMINEN,
    reunakertyma: REUNAKERTYMA,
    vesiviivoitus: VESIVIIVOITUS,
    rosoisuus: null,
    kohdistus: null,
    leviaminen: null,
    taitteet: false,
    vinjetti: null,
  },
  taysi: {
    nimi: 'taysi',
    savyt: SAVYT,
    pastelli: PASTELLI_TAYSI,
    paperi: PAPERI_TAYSI,
    ikaantyminen: IKAANTYMINEN,
    reunakertyma: REUNAKERTYMA,
    vesiviivoitus: VESIVIIVOITUS,
    rosoisuus: ROSOISUUS,
    kohdistus: KOHDISTUS,
    leviaminen: LEVIAMINEN,
    taitteet: false,
    vinjetti: VINJETTI,
  },
};

/*
 * VERTAILUPALA: sama rajattu alue jokaisesta versiosta.
 *
 * Peloponnesos rannikkoineen 6400 pikselin lehdellä. Alueella on
 * yhtaikaa kaikki, mitä arvioitavana on: pitkä rantaviiva
 * (vesiviivoitus), vuoristo ja alanko vierekkäin (reunakertymä),
 * kaksi kaupunginnimeä (musteen leviäminen, luettavuus) ja iso
 * tyhjä meri (paperin syy, ikääntyminen). Muulla kuin 6400 pikselin
 * leveydellä rajaus skaalataan.
 */
export const VERTAILUPALA = {
  x: 1950, y: 1830, w: 1200, h: 900, lehdenLeveys: 6400,
};

/* ========================================================== selainkoodi */

/*
 * Koko kuvankäsittely yhtenä funktiona, joka ajetaan selaimessa.
 * Playwright sarjallistaa funktion lähdekoodiksi, joten se ei voi
 * viitata mihinkään moduulin ulkopuoliseen — kaikki apurit ovat
 * sisällä ja kaikki parametrit tulevat argumenttina.
 */
async function patinoiSelaimessa({
  b64, tyyppi, resepti, leveys, muoto, laatu, tausta,
}) {
  /* --------------------------------------------------------- apurit */
  const mulberry32 = (a) => function satunnainen() {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  /** Siemenellinen arvokohina: N x N taulu ja bilineaarinen kiertohaku. */
  const teeKohina = (siemen, N = 256) => {
    const rnd = mulberry32(siemen);
    const t = new Float32Array(N * N);
    for (let i = 0; i < t.length; i++) t[i] = rnd();
    return (x, y) => {
      const fx = ((x % N) + N) % N; const fy = ((y % N) + N) % N;
      const x0 = Math.floor(fx); const y0 = Math.floor(fy);
      const x1 = (x0 + 1) % N; const y1 = (y0 + 1) % N;
      const tx = fx - x0; const ty = fy - y0;
      const sx = tx * tx * (3 - 2 * tx); const sy = ty * ty * (3 - 2 * ty);
      const a = t[y0 * N + x0]; const b = t[y0 * N + x1];
      const c = t[y1 * N + x0]; const d2 = t[y1 * N + x1];
      return (a + (b - a) * sx) * (1 - sy) + (c + (d2 - c) * sx) * sy;
    };
  };
  /** Monta oktaavia samasta kohinasta, keskiarvo 0,5. */
  const fbm = (kohina, x, y, oktaavit) => {
    let summa = 0; let paino = 0; let amp = 1; let taajuus = 1;
    for (let o = 0; o < oktaavit; o++) {
      summa += amp * kohina(x * taajuus, y * taajuus);
      paino += amp; amp *= 0.5; taajuus *= 2.07;
    }
    return summa / paino;
  };
  /** Pehmeä porras: 0 kun x<=a, 1 kun x>=b. */
  const pehmene = (a, b, x) => {
    if (b === a) return x < a ? 0 : 1;
    const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  /** Kokonaislukuhajautus pikselin omaan raeeseen. */
  const rae = (x, y, s) => {
    let h = Math.imul(x + 374761393, 668265263) ^ Math.imul(y + 3266489917, 374761393) ^ s;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };

  /* ------------------------------------------------------ kuvan avaus */
  const kuva = new Image();
  kuva.src = `data:image/${tyyppi};base64,${b64}`;
  await kuva.decode();
  const L = leveys || kuva.width;
  const K = Math.round(kuva.height * (L / kuva.width));
  const kanvaasi = document.createElement('canvas');
  kanvaasi.width = L; kanvaasi.height = K;
  const g = kanvaasi.getContext('2d', { willReadFrequently: true });
  g.imageSmoothingQuality = 'high';
  g.drawImage(kuva, 0, 0, L, K);
  const kuvadata = g.getImageData(0, 0, L, K);
  const d = kuvadata.data;
  /* Kaikki mitat on säädetty 6400 pikselin lehdelle. */
  const s = L / 6400;

  const lum = (r, gg, b) => 0.299 * r + 0.587 * gg + 0.114 * b;

  /* ------------------------------------------------- pienennetyt kentät */
  /*
   * Neljäsosakuva (meri ja kohdistus) ja kahdeksasosakuva (reunat).
   * Molemmissa MUSTE JÄTETÄÄN KESKIARVON ULKOPUOLELLE: muuten
   * rantaviiva ja nimet näkyisivät reunakenttänä ja saisivat
   * ympärilleen kehän.
   */
  const J4 = 4;
  const L4 = Math.ceil(L / J4); const K4 = Math.ceil(K / J4);
  const r4 = new Float32Array(L4 * K4); const g4 = new Float32Array(L4 * K4);
  const b4 = new Float32Array(L4 * K4); const a4 = new Float32Array(L4 * K4);
  {
    const n4 = new Float32Array(L4 * K4);
    for (let y = 0; y < K; y++) {
      const ry = (y / J4) | 0;
      for (let x = 0; x < L; x++) {
        const i = (y * L + x) * 4;
        const j = ry * L4 + ((x / J4) | 0);
        a4[j] += d[i + 3];
        if (lum(d[i], d[i + 1], d[i + 2]) < 150) continue;
        r4[j] += d[i]; g4[j] += d[i + 1]; b4[j] += d[i + 2]; n4[j] += 1;
      }
    }
    for (let j = 0; j < r4.length; j++) {
      a4[j] /= (J4 * J4);
      if (n4[j] > 0) { r4[j] /= n4[j]; g4[j] /= n4[j]; b4[j] /= n4[j]; } else { r4[j] = 210; g4[j] = 200; b4[j] = 180; }
    }
  }
  /** Bilineaarinen haku neljäsosakentästä täysillä koordinaateilla. */
  const hae4 = (kentta, x, y) => {
    const fx = Math.max(0, Math.min(L4 - 1.001, x / J4 - 0.5));
    const fy = Math.max(0, Math.min(K4 - 1.001, y / J4 - 0.5));
    const x0 = fx | 0; const y0 = fy | 0; const tx = fx - x0; const ty = fy - y0;
    const i0 = y0 * L4 + x0; const i1 = i0 + L4;
    return (kentta[i0] * (1 - tx) + kentta[i0 + 1] * tx) * (1 - ty)
      + (kentta[i1] * (1 - tx) + kentta[i1 + 1] * tx) * ty;
  };

  /* ------------------------------------------------ reunakertymäkenttä */
  let reuna4 = null; let kirkkaus4 = null;
  if (resepti.reunakertyma) {
    kirkkaus4 = new Float32Array(L4 * K4);
    /* Lämpö (r-b) erottaa värialueet, joilla on sama kirkkaus —
     * esimerkiksi meren ja alangon. */
    const lampo4 = new Float32Array(L4 * K4);
    for (let j = 0; j < kirkkaus4.length; j++) {
      kirkkaus4[j] = lum(r4[j], g4[j], b4[j]);
      lampo4[j] = r4[j] - b4[j];
    }
    /* Sobel sekä kirkkaudelle että lämmölle; suurempi voittaa. */
    reuna4 = new Float32Array(L4 * K4);
    const sob = (kentta, x, y) => {
      const p = (xx, yy) => kentta[Math.max(0, Math.min(K4 - 1, yy)) * L4
        + Math.max(0, Math.min(L4 - 1, xx))];
      const gx = (p(x + 1, y - 1) + 2 * p(x + 1, y) + p(x + 1, y + 1))
        - (p(x - 1, y - 1) + 2 * p(x - 1, y) + p(x - 1, y + 1));
      const gy = (p(x - 1, y + 1) + 2 * p(x, y + 1) + p(x + 1, y + 1))
        - (p(x - 1, y - 1) + 2 * p(x, y - 1) + p(x + 1, y - 1));
      return Math.hypot(gx, gy) / 4;
    };
    for (let y = 0; y < K4; y++) {
      for (let x = 0; x < L4; x++) {
        reuna4[y * L4 + x] = Math.max(sob(kirkkaus4, x, y), sob(lampo4, x, y) * 1.3);
      }
    }
  }
  /** Onko pikseli rajan tummemmalla puolella? (-1..1) */
  const haeTummaPuoli = (x, y, oma) => {
    const fx = Math.max(0, Math.min(L4 - 1, Math.round(x / J4)));
    const fy = Math.max(0, Math.min(K4 - 1, Math.round(y / J4)));
    return (kirkkaus4[fy * L4 + fx] - oma) / 40;
  };

  /* ------------------------------------------------ meren etäisyyskenttä */
  let etaisyys4 = null;
  if (resepti.vesiviivoitus) {
    const vv = resepti.vesiviivoitus;
    const meri = new Uint8Array(L4 * K4);
    for (let j = 0; j < meri.length; j++) {
      const kroma = Math.max(r4[j], g4[j], b4[j]) - Math.min(r4[j], g4[j], b4[j]);
      /* Meri: matala kroma, riittävä peitto ja järkevä kirkkaus. */
      const onMeri = kroma < vv.kromaVali[1] && a4[j] > 200
        && lum(r4[j], g4[j], b4[j]) > 120;
      meri[j] = onMeri ? 1 : 0;
    }
    /* Yksi avaus + sulkeminen 3x3: yksittäiset pikselit pois, jotta
     * viivoitus ei syty vaalean maan sisälle. */
    const morf = (lahde, laajenna) => {
      const ulos = new Uint8Array(lahde.length);
      for (let y = 0; y < K4; y++) {
        for (let x = 0; x < L4; x++) {
          let arvo = laajenna ? 0 : 1;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const xx = Math.max(0, Math.min(L4 - 1, x + dx));
              const yy = Math.max(0, Math.min(K4 - 1, y + dy));
              const v = lahde[yy * L4 + xx];
              if (laajenna) arvo = arvo || v; else arvo = arvo && v;
            }
          }
          ulos[y * L4 + x] = arvo ? 1 : 0;
        }
      }
      return ulos;
    };
    const siisti = morf(morf(morf(meri, false), true), true);
    /* Chamfer-etäisyysmuunnos: 0 maalla, kasvaa merellä. */
    const ISO = 1e9;
    etaisyys4 = new Float32Array(L4 * K4);
    for (let j = 0; j < etaisyys4.length; j++) etaisyys4[j] = siisti[j] ? ISO : 0;
    const A = 1; const B = 1.41421356;
    for (let y = 0; y < K4; y++) {
      for (let x = 0; x < L4; x++) {
        const j = y * L4 + x; let m = etaisyys4[j];
        if (m === 0) continue;
        if (x > 0) m = Math.min(m, etaisyys4[j - 1] + A);
        if (y > 0) m = Math.min(m, etaisyys4[j - L4] + A);
        if (x > 0 && y > 0) m = Math.min(m, etaisyys4[j - L4 - 1] + B);
        if (x < L4 - 1 && y > 0) m = Math.min(m, etaisyys4[j - L4 + 1] + B);
        etaisyys4[j] = m;
      }
    }
    for (let y = K4 - 1; y >= 0; y--) {
      for (let x = L4 - 1; x >= 0; x--) {
        const j = y * L4 + x; let m = etaisyys4[j];
        if (x < L4 - 1) m = Math.min(m, etaisyys4[j + 1] + A);
        if (y < K4 - 1) m = Math.min(m, etaisyys4[j + L4] + A);
        if (x < L4 - 1 && y < K4 - 1) m = Math.min(m, etaisyys4[j + L4 + 1] + B);
        if (x > 0 && y < K4 - 1) m = Math.min(m, etaisyys4[j + L4 - 1] + B);
        etaisyys4[j] = m;
      }
    }
    for (let j = 0; j < etaisyys4.length; j++) {
      if (etaisyys4[j] > 1e8) etaisyys4[j] = 1e8;
      etaisyys4[j] *= J4; /* takaisin täysiksi pikseleiksi */
    }
  }

  /* ------------------------------------------ värilaatta kohdistusta varten */
  /*
   * Kohdistusheitto siirtää VÄRILAATTAA, ja värilaatta on pehmeä.
   * Ilman sumennusta neljäsosakentässä on vielä vuoristovarjostuksen
   * korkeaa taajuutta, ja siirretty erotus näkyi rinteillä oransseina
   * pilkkuina — ei kohdistusheittona vaan väriroskana. Kolme
   * laatikkosumennusta tekee kentästä sen, mitä värilaatta on.
   */
  if (resepti.kohdistus) {
    const sumenna = (kentta) => {
      const apu = new Float32Array(kentta.length);
      for (let toisto = 0; toisto < 3; toisto++) {
        for (let y = 0; y < K4; y++) {
          for (let x = 0; x < L4; x++) {
            const j = y * L4 + x;
            const v = kentta[j - (x > 0 ? 1 : 0)] + kentta[j] + kentta[j + (x < L4 - 1 ? 1 : 0)];
            apu[j] = v / 3;
          }
        }
        for (let y = 0; y < K4; y++) {
          for (let x = 0; x < L4; x++) {
            const j = y * L4 + x;
            const v = apu[j - (y > 0 ? L4 : 0)] + apu[j] + apu[j + (y < K4 - 1 ? L4 : 0)];
            kentta[j] = v / 3;
          }
        }
      }
    };
    sumenna(r4); sumenna(g4); sumenna(b4);
  }

  /* ------------------------------------------------------- mustekentät */
  let musteSumea = null;
  if (resepti.leviaminen) {
    const sade = Math.max(1, Math.round(resepti.leviaminen.sade * s));
    const m = new Uint8Array(L * K);
    for (let p = 0; p < L * K; p++) {
      const i = p * 4;
      m[p] = Math.round(255 * pehmene(158, 70, lum(d[i], d[i + 1], d[i + 2])));
    }
    /* Erotteleva laatikkosumennus kahdesti = lähes gaussinen. */
    const apu = new Uint8Array(L * K);
    const laatikko = (lahde, ulos, vaaka) => {
      const N = vaaka ? L : K;
      const M = vaaka ? K : L;
      const askel = vaaka ? 1 : L;
      for (let rivi = 0; rivi < M; rivi++) {
        const pohja = vaaka ? rivi * L : rivi;
        let summa = 0;
        for (let k = -sade; k <= sade; k++) summa += lahde[pohja + Math.max(0, Math.min(N - 1, k)) * askel];
        for (let x = 0; x < N; x++) {
          ulos[pohja + x * askel] = summa / (2 * sade + 1);
          const poistu = Math.max(0, Math.min(N - 1, x - sade));
          const tule = Math.max(0, Math.min(N - 1, x + sade + 1));
          summa += lahde[pohja + tule * askel] - lahde[pohja + poistu * askel];
        }
      }
    };
    laatikko(m, apu, true);
    laatikko(apu, m, false);
    musteSumea = m;
  }

  /* ------------------------------------------------------- kohinakentät */
  /* Kuiduille iso taulu (512): pieninkin kuituskaala kiertää vasta
   * lehden korkeuden mittaisin välein, ja warp rikkoo lopunkin
   * jaksollisuuden. Muille 256 riittää. */
  const kohinaKuitu = teeKohina(20260829, 512);
  const kohinaRisti = teeKohina(51217, 512);
  const kohinaWarp = teeKohina(880301, 256);
  const kohinaRae = teeKohina(133742, 256);
  const kohinaIka = teeKohina(77003);
  const kohinaRoso = teeKohina(4242);
  const kohinaTaite = teeKohina(9191);

  /* ---------------------------------------------------------- pääsilmukka */
  const sv = resepti.savyt;
  const musteNorm = (() => {
    const l = lum(sv.muste[0], sv.muste[1], sv.muste[2]);
    return [sv.muste[0] / l, sv.muste[1] / l, sv.muste[2] / l];
  })();
  const pl = resepti.pastelli;
  const pa = resepti.paperi;
  const ika = resepti.ikaantyminen;
  const rk = resepti.reunakertyma;
  const vv = resepti.vesiviivoitus;
  const ro = resepti.rosoisuus;
  const ko = resepti.kohdistus;
  const le = resepti.leviaminen;
  const ta = resepti.taitteet;
  const vi = resepti.vinjetti;
  const kesX = L / 2; const kesY = K / 2;
  const kulmaEt = Math.hypot(kesX, kesY);

  for (let y = 0; y < K; y++) {
    for (let x = 0; x < L; x++) {
      const i = (y * L + x) * 4;
      const alfa = d[i + 3];
      if (alfa === 0) {
        if (muoto === 'jpeg') { d[i] = tausta[0]; d[i + 1] = tausta[1]; d[i + 2] = tausta[2]; d[i + 3] = 255; }
        continue;
      }
      let r = d[i]; let gg = d[i + 1]; let b = d[i + 2];
      const Lp = lum(r, gg, b);

      /* --- 1. sävyt: muste ruskeaksi, valkoinen kermaksi, käyrä --- */
      const musteW = pehmene(sv.musteVali[1], sv.musteVali[0], Lp) * sv.musteVoima;
      if (musteW > 0) {
        r += (musteNorm[0] * Lp - r) * musteW;
        gg += (musteNorm[1] * Lp - gg) * musteW;
        b += (musteNorm[2] * Lp - b) * musteW;
      }
      const kermaW = pehmene(sv.kermaVali[0], sv.kermaVali[1], Lp) * sv.kermaVoima;
      if (kermaW > 0) {
        r += (sv.kerma[0] - r) * kermaW;
        gg += (sv.kerma[1] - gg) * kermaW;
        b += (sv.kerma[2] - b) * kermaW;
      }
      r = r * sv.kayra.kerroin + sv.kayra.nosto;
      gg = gg * sv.kayra.kerroin + sv.kayra.nosto;
      b = b * sv.kayra.kerroin + sv.kayra.nosto;

      /* Meren tunnistus vesiviivoitusta varten tehdään TÄSTÄ kromasta,
       * ennen pastellointia: pastellointi laskee maaston kromaa, ja
       * jälkeenpäin mitattuna osa maasta osuisi meren kromaikkunaan. */
      const kroma0 = Math.max(r, gg, b) - Math.min(r, gg, b);

      /* --- 1b. korkeusvarjostuksen pastellointi --- */
      if (pl) {
        const Ln = lum(r, gg, b);
        const maski = pehmene(pl.lumVali[0], pl.lumVali[0] + pl.lumPehmeys, Ln)
          * pehmene(pl.lumVali[1], pl.lumVali[1] - pl.lumPehmeys, Ln)
          * pehmene(pl.kromaVali[0], pl.kromaVali[1], kroma0);
        if (maski > 0.004) {
          const w = pl.kyllaisyys * maski;
          r += (Ln * pl.paperiSavy[0] - r) * w;
          gg += (Ln * pl.paperiSavy[1] - gg) * w;
          b += (Ln * pl.paperiSavy[2] - b) * w;
          /* Nosto painottuu tummiin: vuoristo vaalenee, alanko ei. */
          const tummuus = pehmene(pl.vaalennusVali[1], pl.vaalennusVali[0], Ln);
          const v = pl.vaalennus * maski * tummuus;
          if (v > 0) {
            r += (pl.vaalennusKohde[0] - r) * v;
            gg += (pl.vaalennusKohde[1] - gg) * v;
            b += (pl.vaalennusKohde[2] - b) * v;
          }
        }
      }

      /* --- 2. painolaattojen kohdistusheitto (vain matala väritieto) --- */
      if (ko) {
        const oR = hae4(r4, x, y); const oG = hae4(g4, x, y); const oB = hae4(b4, x, y);
        const sR = hae4(r4, x + ko.dx * s, y + ko.dy * s);
        const sG = hae4(g4, x + ko.dx * s, y + ko.dy * s);
        const sB = hae4(b4, x + ko.dx * s, y + ko.dy * s);
        const oL = lum(oR, oG, oB); const sL = lum(sR, sG, sB);
        r += ((sR - sL) - (oR - oL)) * ko.voima;
        gg += ((sG - sL) - (oG - oL)) * ko.voima;
        b += ((sB - sL) - (oB - oL)) * ko.voima;
      }

      let kerroin = 1; /* kertova tummennus, kootaan efekteistä */
      let lampo = 0; /* positiivinen = sininen tummuu punaista enemmän */

      /* --- 3. akvarellin reunakertymä --- */
      if (rk) {
        const e = Math.min(1, hae4(reuna4, x, y) / rk.taysiEro);
        if (e > 0.02) {
          const puoli = Math.max(-1, Math.min(1, haeTummaPuoli(x, y, Lp)));
          /* puoli > 0 = pikseli on ympäristöään tummempi = kertymäpuoli */
          const paino = 1 + rk.tummaPaino * puoli;
          kerroin -= rk.voima * e * 0.25 * Math.max(0, paino);
          lampo += rk.voima * e * 0.1;
        }
      }

      /* --- 4. rannikon vesiviivoitus --- */
      if (vv) {
        const et = hae4(etaisyys4, x, y);
        if (et > 0.5 && et < 1e7) {
          const meriW = pehmene(vv.kromaVali[1], vv.kromaVali[0], kroma0);
          if (meriW > 0.01) {
            const alku = vv.aloitus * s;
            const vali = vv.vali * s;
            const nro = (et - alku) / vali;
            if (nro > -0.5 && nro < vv.viivoja) {
              const vaihe = Math.abs(nro - Math.round(nro));
              const viiva = pehmene(vv.leveys / 2, 0, vaihe);
              const vaimennus = Math.max(0, 1 - Math.max(0, Math.round(nro)) / vv.viivoja) ** 1.3;
              kerroin -= vv.voima * viiva * vaimennus * meriW;
            }
          }
        }
      }

      /* --- 5. musteen leviäminen nimissä --- */
      if (le && musteSumea) {
        const sumea = musteSumea[y * L + x] / 255;
        const oma = pehmene(158, 70, Lp);
        const kehä = Math.max(0, sumea - oma);
        kerroin -= le.voima * kehä;
      }

      /* --- 6. viivojen mikrorosoisuus --- */
      if (ro) {
        const w = pehmene(158, 70, Lp);
        const reunapaino = 4 * w * (1 - w); /* huippu viivan reunalla */
        if (reunapaino > 0.02) {
          const n = kohinaRoso(x / (s * 1.6), y / (s * 1.6)) - 0.5;
          kerroin += ro.voima * reunapaino * n * 0.6;
        }
      }

      /* --- 7. paperin syy --- */
      if (pa) {
        /* Domain warp: sama siirtymä molemmille kuitusuunnille, jotta
         * syy aaltoilee yhtenä paperina eikä kahtena kerroksena. */
        const wp = (kohinaWarp(x / (pa.warpSkaala * s), y / (pa.warpSkaala * s)) - 0.5)
          * pa.warpVoima;
        let kuitu = 0; let pk = 0;
        for (const [sx, sy, w, fx, fy] of pa.kuituKerrokset) {
          kuitu += w * (kohinaKuitu(fx + x / (sx * s) + wp * 0.35,
            fy + y / (sy * s) + wp) - 0.5);
          pk += w;
        }
        let risti = 0; let pr = 0;
        for (const [sx, sy, w, fx, fy] of pa.kuituRistiKerrokset) {
          risti += w * (kohinaRisti(fx + x / (sx * s) + wp,
            fy + y / (sy * s) + wp * 0.35) - 0.5);
          pr += w;
        }
        const raeN = rae(x, y, 1337) - 0.5;
        const karkea = kohinaRae(x / (pa.raeKarkeaSkaala * s),
          y / (pa.raeKarkeaSkaala * s)) - 0.5;
        kerroin += (kuitu / pk) * pa.kuitu + (risti / pr) * pa.kuituRisti
          + raeN * pa.rae + karkea * pa.raeKarkea;
      }

      /* --- 8. epätasainen ikääntymissävy --- */
      if (ika) {
        const n = fbm(kohinaIka, x / (ika.skaala * 640 * s), y / (ika.skaala * 640 * s), ika.oktaavit) - 0.5;
        const reunaEt = Math.hypot(x - kesX, y - kesY) / kulmaEt;
        const laikku = n + ika.reunapaino * (reunaEt ** 2 - 0.35);
        kerroin -= ika.voima * laikku;
        lampo += ika.voima * ika.lampo * Math.max(0, laikku);
      }

      /* --- 9. taitejäljet --- */
      if (ta) {
        let taite = 0;
        const heilu = (kohinaTaite(x / (40 * s), y / (40 * s)) - 0.5) * ta.huojunta * s;
        for (const p of ta.pysty) {
          const et = Math.abs(x - p * L + heilu);
          taite += Math.exp(-((et / (ta.ydin * s)) ** 2))
            - ta.hehkuOsuus * Math.exp(-((et / (ta.hehku * s)) ** 2));
        }
        for (const p of ta.vaaka) {
          const et = Math.abs(y - p * K + heilu);
          taite += Math.exp(-((et / (ta.ydin * s)) ** 2))
            - ta.hehkuOsuus * Math.exp(-((et / (ta.hehku * s)) ** 2));
        }
        kerroin -= ta.voima * taite;
      }

      /* --- 10. vinjetointi --- */
      if (vi) {
        const rr = Math.hypot((x - kesX) / kesX, (y - kesY) / kesY) / Math.SQRT2;
        const v = rr ** vi.eksponentti;
        kerroin -= vi.voima * v;
        lampo += vi.voima * vi.lampo * v;
      }

      r *= kerroin; gg *= kerroin * (1 - lampo * 0.35); b *= kerroin * (1 - lampo);

      if (muoto === 'jpeg' && alfa < 255) {
        const t = alfa / 255;
        r = tausta[0] + (r - tausta[0]) * t;
        gg = tausta[1] + (gg - tausta[1]) * t;
        b = tausta[2] + (b - tausta[2]) * t;
        d[i + 3] = 255;
      }
      d[i] = r < 0 ? 0 : (r > 255 ? 255 : r);
      d[i + 1] = gg < 0 ? 0 : (gg > 255 ? 255 : gg);
      d[i + 2] = b < 0 ? 0 : (b > 255 ? 255 : b);
    }
  }
  g.putImageData(kuvadata, 0, 0);
  const mime = muoto === 'jpeg' ? 'image/jpeg' : (muoto === 'webp' ? 'image/webp' : 'image/png');
  return { b64: kanvaasi.toDataURL(mime, laatu).split(',')[1], leveys: L, korkeus: K };
}

/* ============================================================ vertailu */

/** Kokoaa 2 x 2 -ruudukon samasta palasta neljästä kuvasta. */
async function vertailuSelaimessa({ kuvat, pala, laatu }) {
  const ladatut = [];
  for (const k of kuvat) {
    const kuva = new Image();
    kuva.src = `data:image/${k.tyyppi};base64,${k.b64}`;
    await kuva.decode();
    ladatut.push({ kuva, nimi: k.nimi });
  }
  const c = document.createElement('canvas');
  c.width = pala.w * 2; c.height = pala.h * 2;
  const g = c.getContext('2d');
  g.fillStyle = '#2c2018';
  g.fillRect(0, 0, c.width, c.height);
  ladatut.forEach((k, n) => {
    const px = (n % 2) * pala.w; const py = Math.floor(n / 2) * pala.h;
    /* Sama alue kaikista, vaikka kuvien leveys eroaisi. */
    const suhde = k.kuva.width / pala.lehdenLeveys;
    g.drawImage(k.kuva, pala.x * suhde, pala.y * suhde, pala.w * suhde, pala.h * suhde,
      px, py, pala.w, pala.h);
    g.font = 'bold 40px sans-serif';
    g.textBaseline = 'top';
    const teksti = k.nimi;
    const lev = g.measureText(teksti).width;
    g.fillStyle = 'rgba(30,22,16,0.78)';
    g.fillRect(px + 18, py + 18, lev + 36, 60);
    g.fillStyle = '#f3e8ce';
    g.fillText(teksti, px + 36, py + 30);
    g.strokeStyle = 'rgba(60,44,30,0.9)';
    g.lineWidth = 4;
    g.strokeRect(px + 2, py + 2, pala.w - 4, pala.h - 4);
  });
  return c.toDataURL('image/jpeg', laatu).split(',')[1];
}

/* ================================================================ ajo */

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const lippu = (nimi) => argv.includes(`--${nimi}`);
/* Arvolliset valitsimet erotetaan lipuista, jotta valitsimen arvoa ei
 * lueta vahingossa tiedostopoluksi. */
const ARVOLLISET = ['taso', 'tunnus', 'leveys', 'laatu', 'muoto', 'pala'];
const vapaat = argv.filter((a, n) => !a.startsWith('--')
  && !(n > 0 && argv[n - 1].startsWith('--') && ARVOLLISET.includes(argv[n - 1].slice(2))));

const pohja = vapaat[0];
const ulosKansio = vapaat[1];
if (!pohja || !ulosKansio) {
  console.error('Käyttö: node tools/patina.mjs <pohjakuva> <ulos-kansio> '
    + '[--taso hillitty|keskitaso|taysi|kaikki] [--tunnus GRC] [--leveys 6400] '
    + '[--laatu 0.9] [--muoto jpeg|webp|png] [--vertailu] [--pala x,y,w,h]');
  process.exit(1);
}
const tasoValinta = valitsin('taso', 'kaikki');
const tasot = tasoValinta === 'kaikki' ? ['hillitty', 'keskitaso', 'taysi'] : [tasoValinta];
for (const t of tasot) {
  if (!RESEPTIT[t]) { console.error(`Tuntematon taso: ${t}`); process.exit(1); }
}
const tunnus = valitsin('tunnus', basename(pohja).replace(/\.[^.]+$/, '').replace(/-pohja$/, ''));
const leveys = Number(valitsin('leveys', 0)) || 0;
const laatu = Number(valitsin('laatu', 0.92));
const muoto = valitsin('muoto', 'jpeg');
const pala = (() => {
  const p = valitsin('pala', null);
  if (!p) return VERTAILUPALA;
  const [x, y, w, h] = p.split(',').map(Number);
  return { ...VERTAILUPALA, x, y, w, h };
})();
/* JPEG ei kanna läpinäkyvyyttä: lehden häivytetty vuotoreuna
 * ladotaan paperin väriin, ei mustaan (kuten canvas tekisi). */
const TAUSTA = [232, 220, 188];

mkdirSync(resolve(ulosKansio), { recursive: true });

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--max-old-space-size=4096'],
});
const sivu = await selain.newPage();
sivu.on('pageerror', (e) => console.error('[selain]', e.message));

const tyyppiNimesta = (polku) => {
  const p = extname(polku).toLowerCase();
  if (p === '.webp') return 'webp';
  if (p === '.jpg' || p === '.jpeg') return 'jpeg';
  return 'png';
};

const pohjaB64 = readFileSync(resolve(pohja)).toString('base64');
const pohjaTyyppi = tyyppiNimesta(pohja);
const paate = muoto === 'jpeg' ? 'jpg' : muoto;
const tehdyt = [];

for (const taso of tasot) {
  const alku = Date.now();
  const tulos = await sivu.evaluate(patinoiSelaimessa, {
    b64: pohjaB64,
    tyyppi: pohjaTyyppi,
    resepti: RESEPTIT[taso],
    leveys,
    muoto,
    laatu,
    tausta: TAUSTA,
  });
  const nimi = `${tunnus}-patina-${taso}.${paate}`;
  const polku = resolve(ulosKansio, nimi);
  writeFileSync(polku, Buffer.from(tulos.b64, 'base64'));
  tehdyt.push({ taso, polku, nimi });
  const kt = Math.round(Buffer.from(tulos.b64, 'base64').length / 1024);
  console.log(`${nimi}: ${tulos.leveys} x ${tulos.korkeus}, ${kt} kt, `
    + `${((Date.now() - alku) / 1000).toFixed(1)} s`);
}

if (lippu('vertailu')) {
  const kuvat = [
    { nimi: 'nykyinen (pohja)', b64: pohjaB64, tyyppi: pohjaTyyppi },
    ...tehdyt.map((t) => ({
      nimi: t.taso, b64: readFileSync(t.polku).toString('base64'), tyyppi: muoto,
    })),
  ];
  const b64 = await sivu.evaluate(vertailuSelaimessa, { kuvat, pala, laatu });
  const polku = resolve(ulosKansio, 'patina-vertailu.jpg');
  writeFileSync(polku, Buffer.from(b64, 'base64'));
  console.log(`patina-vertailu.jpg: ${pala.w * 2} x ${pala.h * 2} `
    + `(pala ${pala.x},${pala.y} ${pala.w}x${pala.h})`);
}

await selain.close();
