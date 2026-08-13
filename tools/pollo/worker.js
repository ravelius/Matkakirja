/*
 * VIISAS PÖLLÖ — välityspalvelin.
 *
 * Pieni Cloudflare Worker, joka välittää pelin chat-pyynnöt Anthropicin
 * rajapintaan. Peli EI koskaan puhu rajapinnalle suoraan: API-avain on
 * maksullinen salaisuus eikä se saa päätyä selaimeen, repoon eikä lokiin.
 * Siksi tässä välissä on tämä worker, joka
 *
 *   1. lukee avaimen VAIN ympäristösalaisuudesta (ANTHROPIC_API_KEY),
 *   2. laskee käyttörajat (per-asiakas päiväraja ja kova kuukausikatto),
 *   3. päästää läpi vain pelin omat originit,
 *   4. omistaa järjestelmäkehotteen — asiakas ei voi vaihtaa sitä.
 *
 * Kohta 4 on tärkein: spoilerisuoja ja sävysäännöt ovat täällä eivätkä
 * selaimessa, joten niitä ei voi kiertää muokkaamalla pelin koodia tai
 * lähettämällä workerille käsin tehtyä pyyntöä.
 *
 * Käyttöönotto: ks. OHJE.md tässä kansiossa.
 */

import {
  HISTORIAN_KATTO,
  KONTEKSTIN_KATTO,
  KUUKAUSIRAJA_OLETUS,
  KYSYMYKSEN_KATTO,
  PAIVARAJA_OLETUS,
  kuukausiAvain,
  lueLista,
  lueLuku,
  luoJatkoSuodatin,
  paivaAvain,
  poimiEhdotukset,
  poimiJatkot,
  sallittuOrigin,
  siivoaHistoria,
  siivoaTeksti,
  tarkistaRajat,
  vertaaSalaisuus,
} from './rajat.js';

/*
 * Malli on ympäristömuuttujassa, jotta omistaja voi vaihtaa sen
 * dashboardista ilman koodimuutosta. Oletus on Anthropicin pienin ja
 * halvin malli — pöllö vastaa lyhyesti, joten isompaa ei tarvita.
 */
const MALLI_OLETUS = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 700;
const RAJAPINTA = 'https://api.anthropic.com/v1/messages';
const RAJAPINNAN_VERSIO = '2023-06-01';

/*
 * JÄRJESTELMÄKEHOTE — pöllön koko luonne ja kaikki kiellot.
 *
 * Tämä on sitova määrittely (js/tyohuone-raamattu.js, osio "Viisas
 * Pöllö"): pöllö on TIEDON hahmo, ei tarinan. Se syventää lehtien
 * tietoa ja vastaa tosimaailman kysymyksiin, mutta ei ratkaise pelin
 * tehtäviä eikä paljasta juonta.
 */
const JARJESTELMAKEHOTE = `Olet Viisas Pöllö, tietokumppani suomenkielisessä \
seikkailupelissä "Matkakirja ja unohdettu aarre". Pelaaja kiertää maailmaa \
isoisänsä vuoden 1873 matkapäiväkirjan jäljillä.

ROOLISI
Olet tiedon hahmo, et tarinan. Vastaat todellista maailmaa koskeviin \
kysymyksiin — maantietoon, historiaan, kulttuuriin, luontoon, kieliin — ja \
syvennät sitä, mitä pelaajalla on juuri nyt näkyvissä laudalla tai lehdessä. \
Saat kontekstiksi tiiviin kuvauksen nykytilasta; nojaa siihen, kun kysymys \
liittyy näkymään.

PELIN OMA AINEISTO ON ETUSIJALLA
Kontekstissa voi olla osio "PELIN TARKISTETTUA AINEISTOA". Ne katkelmat \
ovat pelin omista lehdistä ja jutuista, ja ne on kirjoitettu ja \
tarkistettu käsin lähteineen. Nojaa niihin ensisijaisesti — ne ovat \
luotettavampia kuin oma muistisi. Jos katkelma vastaa kysymykseen, käytä \
sitä, ja voit kertoa mistä lehdestä aihe löytyy kokonaisena juttuna \
("tästä on juttu Kiinan maalehden Kuvataide-sivulla"). Älä keksi \
katkelmiin sisältöä, jota niissä ei ole.

Kun vastaat aineiston ulkopuolelta omalla tiedollasi, vastaa suoraan — \
ÄLÄ kommentoi, onko aiheesta pelissä juttua vai ei ("Tästä ei ole \
pelissä juttua…" on kielletty aloitus, se toistuu kyllästymiseen asti). \
Maininta pelin lehdestä kuuluu vastaukseen vain silloin, kun nojaat \
oikeasti kontekstin katkelmaan.

SIJAINTI ON ANNETTU, ÄLÄ MYÖTÄILE VÄÄRÄÄ OLETUSTA
Kontekstin rivit "Kaupunki, jossa pelaaja on" ja "Maa, jossa pelaaja on" \
tulevat pelin omasta tarkistetusta kartta-aineistosta ja pitävät \
paikkansa. Jos kysymys on ristiriidassa niiden kanssa — esimerkiksi \
olettaa kaupungin olevan eri maassa kuin se on — oikaise virhe \
ystävällisesti heti vastauksen ensimmäisessä lauseessa ("Sofia on \
Bulgarian pääkaupunki, ei Kreikan") ja vastaa vasta sitten. Älä koskaan \
toista tai vahvista väärää oletusta. Kontekstissa voi olla myös lehden \
maaosasto, joka koskee jotakin muuta maata kuin sitä, jossa pelaaja on; \
sijainti on aina se rivi, jossa lukee "jossa pelaaja on".

ÄLÄ KEKSI FAKTAA
Pääkaupungit, valtioiden rajat, hallintoalueet, etäisyydet ja vuosiluvut \
ovat asioita, joissa arvaus on aina väärä vastaus. Jos et ole varma, sano \
se suoraan ("en ole varma tästä") äläkä keksi hallinnollista tai \
maantieteellistä väitettä sen paikalle.

MITÄ ET TEE
- Et ratkaise pelin tehtäviä. Jos pelaaja kysyy visan, kohtaamisen, \
minitehtävän tai pulman vastausta, kieltäydyt ystävällisesti ja lyhyesti: \
tehtävät kuuluvat pelaajalle. Voit kertoa aiheesta yleisesti, mutta et \
poimi oikeaa vaihtoehtoa etkä vihjaa siihen.
- Et paljasta juonisalaisuuksia. Et puhu seuraajasta, revitystä sivusta \
etkä aarteiden sijainneista. Jos niistä kysytään, sanot ettei se ole sinun \
kerrottavanasi — matkakirja kertoo omaan tahtiinsa.
- Et keksi faktoja. Jos et tiedä tai olet epävarma, sanot sen suoraan. \
Väärä varma vastaus on pahempi kuin rehellinen "en tiedä".
- Et arvostele paikkoja, kansoja etkä uskontoja. Kuvaat kohteet \
kunnioittavasti. Nykysodista et puhu; historialliset tapahtumat ovat \
tavallista historiaa ja niistä voit kertoa asiallisesti.

SÄVY
Lämmin, tiivis, suomeksi. Kohderyhmä on 13 vuotta täyttäneet ja aikuiset — \
puhut siis kuten kiinnostuneelle ihmiselle, et lapselle: ei hymiöitä, ei \
huudahduksia, ei selittelyä siitä mitä aiot sanoa. Yleensä 2–5 virkettä. \
Jos kysymys on iso, annat lyhyen vastauksen ja tarjoat yhden tarkennuksen, \
josta voi jatkaa.`;

/*
 * JATKOKYSYMYKSET — muoto määrätään täällä palvelimella.
 *
 * Peli näyttää jokaisen vastauksen alla kaksi ehdotusta siitä, mitä
 * seuraavaksi voisi kysyä. Kehote on osa järjestelmäkehotetta eikä
 * asiakkaan pyyntöä, joten muotoa ei voi vaihtaa selaimesta.
 *
 * Muoto on rivipohjainen eikä JSON: pieni malli kirjoittaa vastauksen
 * luonnollisena tekstinä, ja JSON-kuoren vaatiminen sotkisi sen
 * herkästi (lainausmerkit, rivinvaihdot, katkennut sulku). Erotinrivi
 * "JATKOT:" on triviaali jäsentää ja helppo pudottaa pois, jos malli
 * unohtaa sen kokonaan.
 *
 * Jäsennys on rajat.js:n poimiJatkot, ja se ajetaan AINA — merkintä ei
 * siis voi vuotaa pelaajan ruudulle, vaikka jäsennys epäonnistuisi.
 */
const JATKOKEHOTE = `JATKOKYSYMYKSET
Päätä jokainen vastauksesi näin: kirjoita vastauksen jälkeen omalle \
rivilleen pelkkä sana JATKOT: ja sen alle täsmälleen kaksi riviä, joista kumpikin on \
yksi lyhyt kysymys, jonka pelaaja voisi haluta kysyä seuraavaksi. Yksi \
kysymys riville, ilman numerointia ja ilman ranskalaisia viivoja, \
enintään 70 merkkiä, ja jokainen päättyy kysymysmerkkiin. Kysymysten \
pitää liittyä juuri antamaasi vastaukseen ja olla tosimaailman \
kysymyksiä — ei pelin tehtäviin, pisteisiin tai juoneen liittyviä. \
Älä viittaa vastauksessasi näihin riveihin äläkä selitä niitä.`;

/*
 * PÖLLÖLINKIT — avainkäsitteet vastaustekstissä (omistajan tilaus
 * 13.8.2026).
 *
 * Vastauksessa voi olla 1–3 käsitettä, joita napauttamalla pelaaja saa
 * pöllöltä lisää samasta asiasta. Malli merkitsee ne suoraan tekstiin
 * kaksoishakasulkeisiin, ja PALVELIN JÄTTÄÄ MERKINNÄT PAIKALLEEN: vain
 * asiakas tietää, mihin kohtaan tekstiä linkki kuuluu, joten sijainti
 * on säilytettävä. Asiakas jäsentää merkinnät tekstisolmuista
 * turvallisesti (js/pollo.js jasennaKasitteet) eikä koskaan tulkitse
 * vastausta merkkauksena.
 *
 * Jos merkinnät jäävät tulematta tai ovat rikki, asiakas näyttää tekstin
 * puhtaana — hakasulkeet eivät saa näkyä pelaajalle missään tilanteessa.
 */
const KASITEKEHOTE = `AVAINKÄSITTEET
Merkitse vastauksesi sisään yhdestä kolmeen avainkäsitettä \
kaksoishakasulkeilla: [[käsite]]. Käsite on paikka, ilmiö, henkilö tai \
asia, josta pelaaja voisi haluta kuulla lisää. Merkintä kirjoitetaan \
suoraan lauseeseen sen luonnollisella taivutusmuodolla ([[höyryveturit]] \
vetivät junia), ei erilliselle riville eikä luetteloksi. Älä merkitse \
samaa käsitettä kahdesti, älä merkitse pelaajan omaa kysymystä äläkä \
mainitse merkintöjä vastauksessasi. Jos mikään käsite ei ole \
luonnollinen, jätä merkinnät kokonaan pois.`;

/** Ehdotuskehote: erillinen, koska tehtävä on aivan toinen. */
const EHDOTUSKEHOTE = `Keksi kaksi lyhyttä kysymystä, jotka pelaaja voisi \
haluta kysyä sinulta juuri nyt. Nojaa alla olevaan tilannekuvaukseen: hyvä \
kysymys koskee paikkaa, ilmiötä tai yksityiskohtaa, joka pelaajalla on \
näkyvissä. Kysymysten pitää olla tosimaailman kysymyksiä — EI pelin \
tehtäviin, vastauksiin, pisteisiin tai juoneen liittyviä.

Kirjoita täsmälleen kaksi riviä, yksi kysymys riville, ilman numerointia, \
ilman ranskalaisia viivoja ja ilman johdantoa. Jokainen kysymys enintään 70 \
merkkiä ja päättyy kysymysmerkkiin.`;

/* ------------------------------------------------------------------ */

/**
 * KEHITTÄJÄKOODI — rajaton käyttö omistajan omalla laitteella.
 *
 * Päiväraja on tehty suojaamaan laskua satunnaiselta väärinkäytöltä,
 * mutta omistaja itse testaa peliä kymmeniä kysymyksiä kerrallaan ja
 * törmää siihen ensimmäisenä. Jos ympäristössä on salaisuus
 * POLLO_KEHITTAJAKOODI ja pyynnön otsakkeessa on sama koodi, rajat
 * ohitetaan.
 *
 * Kolme sääntöä pitävät tämän vaarattomana:
 *   - Ilman asetettua salaisuutta otsake ei tee YHTÄÄN mitään.
 *   - Vertailu on vakioaikainen (rajat.js vertaaSalaisuus).
 *   - Laskurit kasvavat silti: käyttö näkyy kuukausiluvussa, vaikka
 *     se ei pysäytä kehittäjää.
 *
 * Koodi ei ole repossa eikä pelin koodissa: omistaja syöttää sen
 * kehittäjätilassa pöllön paneeliin, ja se jää vain laitteelle.
 */
const KEHITTAJA_OTSAKE = 'x-pollo-kehittaja';

function kehittajaOhitus(pyynto, env) {
  if (!env.POLLO_KEHITTAJAKOODI) return false;
  return vertaaSalaisuus(pyynto.headers.get(KEHITTAJA_OTSAKE), env.POLLO_KEHITTAJAKOODI);
}

/** CORS-otsakkeet. Origin kaiutetaan takaisin vain jos se on sallittu. */
function korsOtsakkeet(origin, sallitut) {
  const otsakkeet = {
    'access-control-allow-methods': 'POST, OPTIONS',
    // Kehittäjäotsake on sallittava erikseen, tai selain ei päästä
    // esilentoa (OPTIONS) läpi eikä pyyntö lähde lainkaan.
    'access-control-allow-headers': `content-type, ${KEHITTAJA_OTSAKE}`,
    'access-control-max-age': '86400',
    vary: 'Origin',
  };
  if (sallitut.includes('*')) otsakkeet['access-control-allow-origin'] = '*';
  else if (origin) otsakkeet['access-control-allow-origin'] = origin;
  return otsakkeet;
}

function vastaa(data, { status = 200, origin = null, sallitut = [] } = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...korsOtsakkeet(origin, sallitut),
    },
  });
}

/**
 * Laskuri. Käyttää KV-säilöä jos sellainen on sidottu; muuten
 * isolaattikohtaista muistia.
 *
 * Muistivara on tarkoituksella heikko mutta ei kaatava: ilman KV:tä
 * rajat pitävät vain saman isolaatin sisällä. OHJE.md kertoo, miten
 * KV-säilö luodaan — se on kaksi napautusta ja tekee rajoista oikeat.
 */
const muisti = new Map();

async function lueLaskuri(kv, avain) {
  if (kv) return Number.parseInt((await kv.get(avain)) ?? '0', 10) || 0;
  return muisti.get(avain) ?? 0;
}

async function kasvataLaskuri(kv, avain, elinaikaS) {
  const arvo = (await lueLaskuri(kv, avain)) + 1;
  if (kv) await kv.put(avain, String(arvo), { expirationTtl: elinaikaS });
  else muisti.set(avain, arvo);
  return arvo;
}

/** Yksi kutsu Anthropicin rajapintaan. `striimi` avaa SSE-vastauksen. */
async function kutsuRajapintaa(env, { jarjestelma, viestit, maxTokens, striimi = false }) {
  return fetch(RAJAPINTA, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': RAJAPINNAN_VERSIO,
    },
    body: JSON.stringify({
      model: env.POLLO_MALLI || MALLI_OLETUS,
      max_tokens: maxTokens,
      system: jarjestelma,
      messages: viestit,
      ...(striimi ? { stream: true } : {}),
    }),
  });
}

/** Yksi kutsu Anthropicin rajapintaan. Palauttaa pelkän tekstin. */
async function kysyMallilta(env, { jarjestelma, viestit, maxTokens }) {
  const vastaus = await kutsuRajapintaa(env, { jarjestelma, viestit, maxTokens });
  if (!vastaus.ok) {
    /*
     * Virhevastauksen runkoa EI lokiteta eikä välitetä pelaajalle:
     * se voi sisältää pyynnön kaiun, ja lokiin ei kirjoiteta mitään
     * mikä voisi vuotaa avaimen tai pelaajan tekstin. Pelkkä
     * tilakoodi riittää vianetsintään.
     */
    const virhe = new Error(`rajapinta ${vastaus.status}`);
    virhe.status = vastaus.status;
    throw virhe;
  }
  const data = await vastaus.json();
  /*
   * Malli voi kieltäytyä (stop_reason "refusal"); silloin content on
   * tyhjä. Käsitellään se tavallisena tyhjänä vastauksena — pöllö
   * sanoo, ettei osaa auttaa tässä.
   */
  return (data?.content ?? [])
    .filter((lohko) => lohko?.type === 'text')
    .map((lohko) => lohko.text)
    .join('\n')
    .trim();
}

/* ------------------------------------------------------------------ */
/* Suoratoisto                                                         */
/* ------------------------------------------------------------------ */

/*
 * SUORATOISTO (omistajan tilaus 13.8.2026).
 *
 * Pöllön vastaus kirjoittuu ruudulle sitä mukaa kuin se syntyy, jotta
 * odotus ei ole tyhjä ruutu. Ketju on kaksiosainen:
 *
 *   1. Worker pyytää mallilta stream: true ja lukee Anthropicin oman
 *      SSE-virran. Jokainen tekstinpala kulkee JATKOSUODATTIMEN läpi
 *      (rajat.js luoJatkoSuodatin), joka pidättää rivin verran tekstiä
 *      eikä päästä jatkokysymysten merkintää koskaan läpi.
 *   2. Asiakkaalle lähetetään oma, yksinkertaisempi SSE:
 *        event: pala   {"teksti": "..."}   — näytettävä lisä
 *        event: loppu  {"vastaus": "...", "jatkot": [...]}
 *        event: virhe  {"viesti": "..."}
 *      Lopputapahtuman vastaus on koko teksti jäsennettynä
 *      poimiJatkoilla, joten asiakas voi rakentaa lopullisen sisällön
 *      siitä eikä paloista — silloin myös rikkoutunut palaraja korjautuu.
 *
 * Rajat toimivat kuten ennen: laskuri kasvaa PYYNNÖSTÄ eikä tokeneista,
 * ja se on kasvatettu jo ennen tätä kutsua.
 */
const SSE_OTSAKKEET = {
  'content-type': 'text/event-stream; charset=utf-8',
  'cache-control': 'no-store',
  connection: 'keep-alive',
  // Välityspalvelimet eivät saa puskuroida virtaa omaan tahtiinsa.
  'x-accel-buffering': 'no',
};

/** Yksi Anthropicin SSE-rivi tekstinpalaksi. Tuntemattomat ohitetaan. */
function striimiPala(rivi) {
  if (!rivi.startsWith('data:')) return null;
  const runko = rivi.slice(5).trim();
  if (!runko || runko === '[DONE]') return null;
  try {
    const tieto = JSON.parse(runko);
    if (tieto?.type === 'content_block_delta' && tieto?.delta?.type === 'text_delta') {
      return tieto.delta.text ?? '';
    }
  } catch {
    /* rikkinäinen rivi ohitetaan: virta jatkuu seuraavasta */
  }
  return null;
}

/**
 * Avaa suoratoistovastauksen asiakkaalle.
 *
 * Mallin kutsu tehdään ENNEN virran avaamista: jos rajapinta vastaa
 * virheellä, pelaajalle voidaan yhä lähettää tavallinen JSON-virhe eikä
 * puolityhjä striimi.
 */
async function striimaaVastaus(env, kors, { jarjestelma, viestit, maxTokens }) {
  const ylavirta = await kutsuRajapintaa(env, {
    jarjestelma, viestit, maxTokens, striimi: true,
  });
  if (!ylavirta.ok || !ylavirta.body) {
    const virhe = new Error(`rajapinta ${ylavirta.status}`);
    virhe.status = ylavirta.status;
    throw virhe;
  }

  const koodaaja = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const kirjoitin = writable.getWriter();
  const laheta = (laji, data) => kirjoitin.write(
    koodaaja.encode(`event: ${laji}\ndata: ${JSON.stringify(data)}\n\n`),
  );

  (async () => {
    const lukija = ylavirta.body.getReader();
    const purkaja = new TextDecoder();
    const suodatin = luoJatkoSuodatin();
    let raaka = '';
    let jono = '';
    try {
      for (;;) {
        const { value, done } = await lukija.read();
        if (done) break;
        jono += purkaja.decode(value, { stream: true });
        let i = jono.indexOf('\n');
        while (i >= 0) {
          const rivi = jono.slice(0, i).trim();
          jono = jono.slice(i + 1);
          const pala = striimiPala(rivi);
          if (pala) {
            raaka += pala;
            const nakyva = suodatin.lisaa(pala);
            if (nakyva) await laheta('pala', { teksti: nakyva });
          }
          i = jono.indexOf('\n');
        }
      }
      // Viimeinen pidätetty rivi mukaan, sitten koko vastaus kerralla.
      const { hanta } = suodatin.loppu();
      if (hanta) await laheta('pala', { teksti: hanta });
      const { vastaus, jatkot } = poimiJatkot(raaka);
      await laheta('loppu', {
        vastaus: vastaus || 'En osaa vastata tähän. Kysytkö jotain muuta?',
        jatkot,
      });
    } catch {
      // Katkennut virta: asiakas näyttää siihen asti tulleen tekstin ja
      // hienovaraisen virherivin. Mitään pyynnön sisältöä ei lokiteta.
      console.log('pollo: striimi katkesi');
      await laheta('virhe', {
        viesti: 'Pöllön ajatus katkesi kesken lauseen.',
      }).catch(() => { /* virta oli jo kiinni */ });
    } finally {
      await kirjoitin.close().catch(() => { /* suljettu jo */ });
    }
  })();

  return new Response(readable, {
    status: 200,
    headers: { ...SSE_OTSAKKEET, ...korsOtsakkeet(kors.origin, kors.sallitut) },
  });
}

export default {
  async fetch(pyynto, env) {
    const sallitut = lueLista(env.POLLO_ORIGINIT);
    const origin = pyynto.headers.get('origin');
    const kors = { origin, sallitut };

    if (pyynto.method === 'OPTIONS') {
      if (!sallittuOrigin(origin, sallitut)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: korsOtsakkeet(origin, sallitut) });
    }
    if (pyynto.method !== 'POST') {
      return vastaa({ virhe: 'menetelma', viesti: 'Vain POST.' }, { status: 405, ...kors });
    }
    if (!sallittuOrigin(origin, sallitut)) {
      // Ilman kaiutettua originia selain ei näytä runkoa — se on ok,
      // tämä on väärinkäytön esto eikä pelaajalle näkyvä tila.
      return new Response('Origin ei ole sallittu', { status: 403 });
    }
    if (!env.ANTHROPIC_API_KEY) {
      return vastaa({
        virhe: 'asetus',
        viesti: 'Pöllö ei ole vielä hereillä.',
      }, { status: 503, ...kors });
    }

    let runko;
    try {
      runko = await pyynto.json();
    } catch {
      return vastaa({ virhe: 'kysely', viesti: 'Pyyntö ei ollut JSONia.' }, { status: 400, ...kors });
    }

    const tehtava = runko?.tehtava === 'ehdotukset' ? 'ehdotukset' : 'vastaus';
    const konteksti = siivoaTeksti(runko?.konteksti, KONTEKSTIN_KATTO);
    const kysymys = siivoaTeksti(runko?.kysymys, KYSYMYKSEN_KATTO);
    const historia = siivoaHistoria(runko?.historia, HISTORIAN_KATTO);
    if (tehtava === 'vastaus' && !kysymys) {
      return vastaa({ virhe: 'kysely', viesti: 'Kysymys puuttuu.' }, { status: 400, ...kors });
    }

    // --- käyttörajat -------------------------------------------------
    const kv = env.POLLO_KV ?? null;
    const nyt = new Date();
    const pAvain = paivaAvain(pyynto.headers.get('cf-connecting-ip'), nyt);
    const kAvain = kuukausiAvain(nyt);
    const kehittaja = kehittajaOhitus(pyynto, env);
    const raja = kehittaja ? { ok: true } : tarkistaRajat({
      paiva: await lueLaskuri(kv, pAvain),
      kuukausi: await lueLaskuri(kv, kAvain),
      paivaraja: lueLuku(env.POLLO_PAIVARAJA, PAIVARAJA_OLETUS),
      kuukausiraja: lueLuku(env.POLLO_KUUKAUSIRAJA, KUUKAUSIRAJA_OLETUS),
    });
    if (!raja.ok) {
      return vastaa({ virhe: raja.syy, viesti: raja.viesti }, { status: 429, ...kors });
    }
    // Laskurit kasvavat ennen kutsua: keskeytynytkin kutsu on maksanut.
    await kasvataLaskuri(kv, pAvain, 60 * 60 * 30);
    await kasvataLaskuri(kv, kAvain, 60 * 60 * 24 * 40);

    // --- kutsu -------------------------------------------------------
    try {
      if (tehtava === 'ehdotukset') {
        const teksti = await kysyMallilta(env, {
          jarjestelma: `${JARJESTELMAKEHOTE}\n\n${EHDOTUSKEHOTE}`,
          viestit: [{
            role: 'user',
            content: `Pelaajan tilanne juuri nyt:\n\n${konteksti || '(ei tietoa näkymästä)'}`,
          }],
          maxTokens: 200,
        });
        return vastaa({ ehdotukset: poimiEhdotukset(teksti, 3) }, kors);
      }

      const viestit = [];
      if (konteksti) {
        viestit.push({
          role: 'user',
          content: `Pelaajan tilanne juuri nyt:\n\n${konteksti}`,
        });
        viestit.push({
          role: 'assistant',
          content: 'Selvä, pidän tilanteen mielessä.',
        });
      }
      for (const viesti of historia) {
        viestit.push({
          role: viesti.rooli === 'pollo' ? 'assistant' : 'user',
          content: viesti.teksti,
        });
      }
      viestit.push({ role: 'user', content: kysymys });

      const kehote = `${JARJESTELMAKEHOTE}\n\n${KASITEKEHOTE}\n\n${JATKOKEHOTE}`;
      /*
       * Suoratoisto vain pyydettäessä. Vanha kertavastaus jää polulle
       * varalle: jos asiakas ei osaa lukea SSE:tä tai virta ei aukea,
       * peli pyytää saman vastauksen tavallisena JSONina.
       */
      if (runko?.striimi) {
        return await striimaaVastaus(env, kors, {
          jarjestelma: kehote,
          viestit,
          maxTokens: MAX_TOKENS,
        });
      }

      const teksti = await kysyMallilta(env, {
        jarjestelma: kehote,
        viestit,
        maxTokens: MAX_TOKENS,
      });
      // Erotinrivi puretaan aina täällä: pelaajalle menee vastaus ja
      // erillinen lista, ei koskaan raakaa merkintää.
      const { vastaus, jatkot } = poimiJatkot(teksti);
      return vastaa({
        vastaus: vastaus || 'En osaa vastata tähän. Kysytkö jotain muuta?',
        jatkot,
      }, kors);
    } catch (virhe) {
      // Vain tilakoodi lokiin — ei avainta, ei pelaajan tekstiä.
      console.log(`pollo: kutsu epäonnistui (${virhe?.status ?? 'verkko'})`);
      return vastaa({
        virhe: 'palvelin',
        viesti: 'Pöllö ei saanut ajatuksesta kiinni. Yritä hetken päästä uudelleen.',
      }, { status: 502, ...kors });
    }
  },
};
