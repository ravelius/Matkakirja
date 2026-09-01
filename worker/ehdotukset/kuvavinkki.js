/*
 * KUVIEN SYÖTTÖPUTKI — yksi reitti, kolme sisäänkäyntiä (omistajan
 * tilaus 1.9.2026: *"kuvien syöttöputki tarvitaan myös pro sisällön
 * tuottajille, joten otetaan se työnalle heti. pelaajat voivat vinkata
 * myös mielenkiintoisista paikoista kuvien kautta"*).
 *
 * Tämä on saman ehdotusworkerin jatke omassa moduulissaan — sama malli
 * kuin pro.js:llä ja reaktiot.js:llä: reititys, CORS ja portit ovat
 * kasittelija.js:ssä, ja tänne annetaan `apu`-kimppu niillä apureilla,
 * jotka kasittelija omistaa. Näin lomakkeenluku ja ämpärin kirjoitus
 * ovat yhdet, eikä toista lähetyslogiikkaa synny.
 *
 * KOLME SISÄÄNKÄYNTIÄ, YKSI PUTKI JA YKSI JONO:
 *
 *   1. PELAAJAN KUVAVINKKI — hampurilaisvalikon "Vinkkaa paikasta
 *      kuvalla": kuva, paikkakuvaus ja vapaa teksti.
 *   2. PRO-TUOTTAJAN KUVAVINKKI — sama lomake tunnusparilla
 *      rikastettuna. Worker tunnistaa tuottajan samalla sähköposti +
 *      koodi -parilla kuin /laheta, ja lähetys merkitään pro-lähteeksi.
 *   3. HAVAINNEKUVAN PALAUTE — "Lähetä palautetta tästä kuvasta"
 *      -nappi havainnekuvan selitepopupissa. Mukana kulkee `kuvatunnus`,
 *      eli se kuva, josta palaute annetaan.
 *
 * KAIKKI KOLME MENEVÄT SAMAAN ÄMPÄRIIN samalla etuliitteellä kuin
 * tavalliset ehdotukset, jotta työhuoneen Lukijoilta-lehti näkee ne
 * ilman toista hakureittiä. `laji`-kenttä erottaa ne listassa.
 *
 * OIKEUDET KYSYTÄÄN KERRALLA JA PAKOLLISENA (omistajan tilaus): kuvaa
 * ei oteta vastaan ilman vakuutusta siitä, että lähettäjä omistaa
 * oikeudet, eikä ilman käyttölupaa. Jälkikäteen kysyminen on hidasta ja
 * unohtuu — ja ilman näitä kuva on työhuoneessa käyttökelvoton.
 *
 * EI JULKAISUAUTOMATIIKKAA. Kuva päätyy jonoon; ihminen poimii sen.
 */

/** Käyttöluvat suljettuna listana — vapaa teksti ei ole kirjaus. */
export const KAYTTOLUVAT = ['sellaisenaan', 'taustatieto'];

/**
 * Kuvavinkin kuvakatto (omistajan tilaus: ~10 Mt). Isompi kuin
 * tavallisen ehdotuksen 8 Mt, koska vinkin koko pointti on kuva:
 * selain pienentää sen canvasilla, mutta HEIC-kuva, jota selain ei osaa
 * purkaa, lähtee alkuperäisenä eikä sitä haluta torjua turhaan.
 */
export const KUVAVINKIN_KATTO = 10 * 1024 * 1024;

/** Kuvia yhdessä vinkissä enintään. */
export const KUVAVINKIN_KUVIA = 3;

/** Paikkakuvauksen merkkikatto. */
export const PAIKAN_KATTO = 200;

/** Kuvan tunnus (havainnekuvan palaute) — polku tai tiedostonimi. */
export const TUNNUKSEN_KATTO = 300;

/** Onko polku tämän jatkeen? */
export function kuvavinkkiPolku(polku) {
  return polku === '/kuvavinkki';
}

/**
 * POST /kuvavinkki
 *
 * @param {object} p
 * @param {Request} p.pyynto pyyntö
 * @param {object} p.env ympäristö (EHDOTUKSET, EHDOTUS_AVAIN)
 * @param {object} p.kors { origin, sallitut }
 * @param {object} p.apurit testien kello ja tunnus: { nyt, tunnus }
 * @param {object} p.apu kasittelijan apurit
 * @returns {Promise<Response>} vastaus
 */
export async function kuvavinkkiReitti({ pyynto, env, kors, apurit = {}, apu }) {
  const {
    vastaa, kentta, tekstikentta, rasti, teeKansio, satunnainenTunnus,
    kuvaTyypit, tekstinKatto, tunnistaPro, normalisoiSahkoposti, vertaa,
  } = apu;

  const ampari = env?.EHDOTUKSET;
  if (!ampari) return vastaa({ virhe: 'Ämpäri ei ole kytketty' }, { status: 503, ...kors });

  let lomake;
  try {
    lomake = await pyynto.formData();
  } catch {
    return vastaa({ virhe: 'Lähetystä ei voitu lukea' }, { status: 400, ...kors });
  }

  // Hunajapurkki kuten /laheta:lla — robotti täyttää kaiken, ihminen ei
  // näe kenttää. Vastaus on silti onnistunut, jottei robotti opi mitään.
  if (kentta(lomake, 'hunaja')) return vastaa({ ok: true, kansio: null }, kors);

  const paikka = kentta(lomake, 'paikka', PAIKAN_KATTO);
  const teksti = tekstikentta(lomake, 'teksti', tekstinKatto);
  const nimimerkki = kentta(lomake, 'nimimerkki', 80);
  const sahkoposti = kentta(lomake, 'sahkoposti', 120);
  const kuvatunnus = kentta(lomake, 'kuvatunnus', TUNNUKSEN_KATTO);
  const kuvalahde = kentta(lomake, 'kuvalahde', TUNNUKSEN_KATTO);
  const saaKrediitteihin = rasti(lomake, 'saaKrediitteihin');

  /*
   * PALAUTE ON ERI LAJI KUIN VINKKI, vaikka reitti on sama: palaute
   * havainnekuvasta saa olla pelkkää tekstiä ("torni oli toisella
   * puolella"), kun taas kuvavinkin koko idea on kuva. Laji päätellään
   * kuvatunnuksesta eikä lomakkeen omasta väitteestä — tunnus tulee
   * popupista, jota pelaaja ei kirjoita itse.
   */
  const palaute = Boolean(kuvatunnus);
  const laji = palaute ? 'kuvapalaute' : 'kuvavinkki';

  /*
   * PRO-TUOTTAJA tunnistetaan samalla parilla kuin /laheta:lla. Väärä
   * pari on 401 eikä hiljainen ohitus: muuten tuottaja luulisi
   * lähettäneensä kuvan pro-lähteenä, vaikka se olisi tallentunut
   * nimettömänä vinkkinä.
   */
  const koodiRaaka = lomake.get('koodi');
  let pro = null;
  if (typeof koodiRaaka === 'string' && koodiRaaka.trim() !== '') {
    const loyto = await tunnistaPro(env, normalisoiSahkoposti(sahkoposti), koodiRaaka, { vertaa });
    if (!loyto) {
      return vastaa({ virhe: 'Sähköposti ja koodi eivät täsmää.' }, { status: 401, ...kors });
    }
    pro = { tekijaId: loyto.tietue.tekijaId, nimi: loyto.tietue.nimi };
  }

  const tiedostot = lomake.getAll('kuvat')
    .filter((k) => k && typeof k === 'object' && typeof k.arrayBuffer === 'function');

  if (tiedostot.length > KUVAVINKIN_KUVIA) {
    return vastaa({ virhe: `Kuvia saa lähettää enintään ${KUVAVINKIN_KUVIA}.` },
      { status: 400, ...kors });
  }
  for (const tiedosto of tiedostot) {
    if (!kuvaTyypit[tiedosto.type]) {
      return vastaa({ virhe: 'Kuvan tyyppi ei kelpaa (jpeg, png, webp tai heic).' },
        { status: 415, ...kors });
    }
    if ((tiedosto.size ?? 0) > KUVAVINKIN_KATTO) {
      return vastaa({ virhe: 'Kuva on liian iso (yli 10 Mt).' }, { status: 413, ...kors });
    }
  }

  /*
   * OIKEUSVALINNAT ovat pakolliset heti kun kuvia on mukana — myös
   * palautteen liitekuvassa. Ilman niitä kuva on työhuoneessa
   * käyttökelvoton, ja käyttökelvoton kuva jonossa on pahempi kuin
   * torjuttu lähetys: se näyttää kelvolliselta.
   */
  const omaKuva = rasti(lomake, 'omakuva');
  const kayttolupa = kentta(lomake, 'kayttolupa', 40).toLowerCase();
  if (tiedostot.length) {
    if (!omaKuva) {
      return vastaa({ virhe: 'Vahvista vielä, että kuva on itse ottamasi ja omistat oikeudet.' },
        { status: 400, ...kors });
    }
    if (!KAYTTOLUVAT.includes(kayttolupa)) {
      return vastaa({ virhe: `Valitse käyttölupa (${KAYTTOLUVAT.join(', ')}).` },
        { status: 400, ...kors });
    }
  }

  // Vinkki ilman kuvaa ei ole kuvavinkki; palaute ilman tekstiä ja
  // ilman kuvaa ei kerro mitään.
  if (!tiedostot.length && !palaute) {
    return vastaa({ virhe: 'Valitse kuva paikasta, josta haluat vinkata.' },
      { status: 400, ...kors });
  }
  if (palaute && !teksti && !tiedostot.length) {
    return vastaa({ virhe: 'Kirjoita palaute tai liitä kuva.' }, { status: 400, ...kors });
  }
  if (!palaute && !paikka) {
    return vastaa({ virhe: 'Kerro, mistä paikasta kuva on.' }, { status: 400, ...kors });
  }

  const nyt = apurit.nyt ? apurit.nyt() : new Date();
  const kansio = teeKansio(nyt, apurit.tunnus ? apurit.tunnus() : satunnainenTunnus());

  const kuvat = [];
  for (let i = 0; i < tiedostot.length; i += 1) {
    const tiedosto = tiedostot[i];
    const nimi = `kuva-${i + 1}.${kuvaTyypit[tiedosto.type]}`;
    // eslint-disable-next-line no-await-in-loop
    await ampari.put(`${kansio}/${nimi}`, await tiedosto.arrayBuffer(), {
      httpMetadata: { contentType: tiedosto.type },
    });
    kuvat.push({ tiedosto: nimi, tyyppi: tiedosto.type, koko: tiedosto.size ?? null });
  }

  /*
   * META.JSON — versio 3. Kentät ovat tarkoituksella samat kuin
   * /laheta:n metassa siltä osin kuin ne ovat samoja asioita (kansio,
   * aikaleima, teksti, kuvat, kuratointi), jotta työhuoneen lista lukee
   * molempia ilman haaraa. Uudet kentät ovat `laji`, `paikka`,
   * `kuvaoikeudet` ja `kuvatunnus`.
   *
   * `sivu` täytetään lajilla, koska Lukijoilta-lehti otsikoi sivun sillä
   * — ilman sitä kuvavinkki näkyisi listassa nimettömänä.
   */
  const meta = {
    versio: 3,
    laji,
    aikaleima: nyt.toISOString(),
    kansio,
    sivu: palaute ? 'Palaute havainnekuvasta' : 'Kuvavinkki paikasta',
    tarkenne: '',
    paikka,
    teksti,
    nimimerkki,
    saaKrediitteihin,
    sahkoposti,
    // Oikeudet omana lohkonaan: rasti ja käyttölupa kulkevat yhdessä,
    // koska kumpikaan ei tarkoita mitään ilman toista.
    kuvaoikeudet: tiedostot.length
      ? { omaKuva: true, kayttolupa }
      : null,
    // Havainnekuvan palaute: mistä kuvasta palaute annettiin.
    kuvatunnus,
    kuvalahde,
    // Lisenssivakuutus on /laheta:n kenttä; kuvavinkissä sama lupaus on
    // kuvaoikeuksissa. Pidetään tosi, jotta vanha lukija ei väitä
    // vakuutuksen puuttuvan.
    lisenssivakuutus: Boolean(tiedostot.length),
    kuvat,
    pro,
    oikeudet: null,
    konteksti: null,
    video: '',
    // Kuratointi (PUT /kommentti täyttää nämä).
    tila: 'uusi',
    kommentti: '',
    palkkio: null,
    lunastuskoodi: '',
  };
  await ampari.put(`${kansio}/meta.json`, JSON.stringify(meta, null, 2), {
    httpMetadata: { contentType: 'application/json; charset=utf-8' },
  });

  return vastaa({ ok: true, kansio, laji }, kors);
}
