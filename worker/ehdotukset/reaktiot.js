/*
 * REAKTIOLASKURIT — jaetut äänet viiteen symboliin (js/reaktiot.js).
 *
 * MIKÄ TÄMÄ ON: peli näyttää jokaisen popupin ja jokaisen lehden
 * väliotsikon perässä pienen napin, jossa lukee eniten ääniä saanut
 * symboli ja sen määrä. Luku ei ole laitteen oma vaan KAIKKIEN
 * pelaajien yhteinen, joten jonkun on laskettava. Tämä moduuli on se
 * joku: viisi laskuria kohdetta kohti yhdessä JSON-oliossa.
 *
 * MIKSI TÄMÄN WORKERIN SISÄLLÄ EIKÄ OMANA PALVELUNAAN: lukijoiden
 * ehdotuskanava (worker/ehdotukset/) on jo pystyssä, sillä on
 * yksityinen R2-ämpäri, omistajan avain, origin-portti ja valmis
 * julkaisuputki (.github/workflows/ehdotukset-worker.yml). Uusi Worker
 * + KV olisi vaatinut omistajalta uuden sidoksen, uuden salaisuuden ja
 * uuden osoitteen peliin. Laskurit ovat sama asia samalle yleisölle,
 * joten ne asuvat samassa talossa — pelkkä uudelleenjulkaisu riittää
 * käyttöönotoksi.
 *
 * MIKSI R2 EIKÄ KV: ämpäri on jo sidottu (EHDOTUKSET), ja R2 osaa
 * ehdollisen kirjoituksen (onlyIf/etag), jolla kaksi yhtaikaista ääntä
 * ei ylikirjoita toisiaan. KV:n eventual consistency näkyisi pelaajalle
 * väärinä lukuina heti oman äänen jälkeen.
 *
 * ── EI HENKILÖTIETOJA ──────────────────────────────────────────────
 *
 * Tänne EI kirjoiteta laitetunnistetta, IP:tä, evästettä eikä
 * aikaleimaa äänestäjää kohden. Ainoa tieto on "montako ääntä tällä
 * symbolilla on tässä kohteessa". Yksi ääni per laite per kohde on
 * SELAIMEN puolella (localStorage): rajoitus on kohteliaisuus eikä
 * lukko, eikä sen valvominen palvelimessa olisi mahdollista ilman
 * juuri sitä tunnistetta, jota tänne ei haluta.
 *
 * ── VIRHEILMOITUKSET ───────────────────────────────────────────────
 *
 * Mustetahra on kuudes ääni siinä missä muutkin, mutta sillä on kaksi
 * eroa: sen vapaateksti kulkee vanhaa ehdotusreittiä (POST /laheta)
 * omistajan Lukijoilta-lehdelle arvioitavaksi, ja omistaja voi
 * NOLLATA tahralaskurin (PUT /reaktio-korjattu), kun virhe on
 * korjattu. Silloin tahra häviää kohteelta myös pelaajien näkymästä.
 */

/** Viisi symbolia. Järjestys on sama kuin pelin napissa. */
export const REAKTIO_SYMBOLIT = ['hieno', 'ihana', 'mielenkiintoinen', 'tylsa', 'virhe'];

/** Kansioetuliite ämpärissä (oma, ei ehdotusten alla). */
export const REAKTIO_ETULIITE = 'reaktiot/';

/** Kohdeavaimen merkkikatto. Pidempi ei ole tunniste vaan essee. */
export const KOHTEEN_KATTO = 200;

/** Montako kohdetta yksi haku saa kysyä. */
export const KOHTEITA_ENINTAAN = 60;

/** Montako kohdetta omistajan listaus palauttaa. */
export const LISTAN_KATTO = 400;

/**
 * Ehdollisen kirjoituksen uusintayritykset.
 *
 * Luku on mitoitettu pahimman uskottavan ruuhkan mukaan: kymmenkunta
 * ääntä samaan väliotsikkoon samalla sekunnilla. Jokainen hylätty
 * yritys lukee tuoreet luvut ja kirjoittaa uudestaan, joten ääni
 * katoaa vasta jos kaikki yritykset hylätään.
 */
const YRITYKSIA = 12;

/** Tyhjä äänirivistö. */
export function tyhjatAanet() {
  return Object.fromEntries(REAKTIO_SYMBOLIT.map((s) => [s, 0]));
}

/**
 * Kohdeavain ämpärin poluksi.
 *
 * Kohdeavain on pelin oma vakaa tunniste ('juttu:lontoo:Tower Bridge',
 * 'otsikko:aihe:lontoo:historia:sumu-ja-savu'), jossa on välilyöntejä,
 * kaksoispisteitä ja skandeja. encodeURIComponent tekee siitä
 * kelvollisen ja KÄÄNNETTÄVÄN polun — hajautusarvo olisi lyhyempi,
 * mutta silloin omistajan listaus ei voisi näyttää, mistä kohteesta on
 * kyse ilman erillistä hakemistoa.
 *
 * @param {string} kohde pelin tunniste
 * @returns {string|null} ämpärin avain tai null jos kohde ei kelpaa
 */
export function kohteenPolku(kohde) {
  const puhdas = String(kohde ?? '').trim();
  if (!puhdas || puhdas.length > KOHTEEN_KATTO) return null;
  // Ohjausmerkit pois: ne eivät voi olla osa mitään pelin tunnistetta
  // ja tekisivät avaimesta arvaamattoman.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(puhdas)) return null;
  return `${REAKTIO_ETULIITE}${encodeURIComponent(puhdas)}.json`;
}

/** Ämpärin avaimesta takaisin pelin tunnisteeksi. */
export function polunKohde(polku) {
  if (typeof polku !== 'string' || !polku.startsWith(REAKTIO_ETULIITE)) return '';
  try {
    return decodeURIComponent(polku.slice(REAKTIO_ETULIITE.length).replace(/\.json$/, ''));
  } catch {
    return '';
  }
}

/** Tietue puhtaaksi: puuttuvat laskurit nolliksi, roskat pois. */
export function siivoaTietue(raaka, kohde) {
  const aanet = tyhjatAanet();
  for (const symboli of REAKTIO_SYMBOLIT) {
    const luku = Number(raaka?.aanet?.[symboli]);
    aanet[symboli] = Number.isFinite(luku) && luku > 0 ? Math.floor(luku) : 0;
  }
  return {
    kohde: String(raaka?.kohde ?? kohde ?? ''),
    otsikko: String(raaka?.otsikko ?? '').slice(0, KOHTEEN_KATTO),
    aanet,
    paivitetty: typeof raaka?.paivitetty === 'string' ? raaka.paivitetty : '',
    korjattu: typeof raaka?.korjattu === 'string' ? raaka.korjattu : '',
  };
}

/** Vain laskurit — tämä menee pelaajalle. */
export function julkinenTietue(tietue) {
  return { kohde: tietue.kohde, aanet: tietue.aanet };
}

async function lueTietue(ampari, polku, kohde) {
  const olio = await ampari.get(polku);
  if (!olio) return { tietue: null, etag: null };
  let raaka = null;
  try {
    raaka = JSON.parse(await olio.text());
  } catch {
    raaka = null; // rikkinäinen tiedosto: aloitetaan puhtaalta
  }
  return { tietue: siivoaTietue(raaka, kohde), etag: olio.etag ?? null };
}

/**
 * Lukee, muuttaa ja kirjoittaa yhden kohteen tietueen.
 *
 * EHDOLLINEN KIRJOITUS on tässä koko juju: kaksi pelaajaa voi äänestää
 * samaa väliotsikkoa samalla sekunnilla, ja tavallinen lue–muuta–
 * kirjoita hukkaisi toisen äänen. R2 hylkää kirjoituksen (palauttaa
 * null), jos olio on muuttunut lukemisen jälkeen, ja silloin kierros
 * aloitetaan alusta tuoreilla luvuilla.
 *
 * Jos ämpäri ei tunne onlyIf-ehtoa (testien muistivarasto), put
 * palauttaa undefinedin eikä nullia — silloin kirjoitus hyväksytään
 * sellaisenaan eikä testi jää ikuiseen silmukkaan.
 *
 * @param {object} ampari R2-sidos
 * @param {string} polku ämpärin avain
 * @param {string} kohde pelin tunniste
 * @param {(tietue: object) => object} muunna muutos tietueeseen
 * @returns {Promise<object>} kirjoitettu tietue
 */
async function paivitaTietue(ampari, polku, kohde, muunna) {
  let viimeisin = null;
  for (let yritys = 0; yritys < YRITYKSIA; yritys += 1) {
    // eslint-disable-next-line no-await-in-loop
    const { tietue, etag } = await lueTietue(ampari, polku, kohde);
    const uusi = muunna(tietue ?? siivoaTietue(null, kohde));
    viimeisin = uusi;
    const asetukset = {
      httpMetadata: { contentType: 'application/json; charset=utf-8' },
    };
    // Ehto vain kun etag on tiedossa; olematon olio kirjoitetaan vain
    // jos kukaan ei ehtinyt luoda sitä välissä.
    if (etag) asetukset.onlyIf = { etagMatches: etag };
    else if (tietue === null) asetukset.onlyIf = { etagDoesNotMatch: '*' };
    // eslint-disable-next-line no-await-in-loop
    const tulos = await ampari.put(polku, JSON.stringify(uusi, null, 2), asetukset);
    if (tulos !== null) return uusi;
  }
  // Neljä hylättyä yritystä on niin epätodennäköistä, ettei ääntä
  // kannata enää jonottaa: pelaaja näkee oman äänensä joka tapauksessa
  // optimistisesti, eikä yksi kadonnut ääni ole pelivirhe.
  return viimeisin;
}

/* ------------------------------------------------------------------ *
 * Julkiset reitit (origin-portti, ei avainta)
 * ------------------------------------------------------------------ */

/**
 * GET /reaktiot?kohteet=a,b,c — laskurit kysytyille kohteille.
 *
 * Kohteet tulevat pilkulla erotettuna JA kukin erikseen
 * encodeURIComponentilla koodattuna, koska pelin tunnisteissa on
 * kaksoispisteitä ja välilyöntejä. Tuntematon kohde palautetaan
 * nollarivistönä eikä 404:nä: peli piirtää napin joka tapauksessa, ja
 * puuttuva kohde on "ei vielä ääniä".
 *
 * @param {URL} url pyynnön osoite
 * @param {object} env ympäristö
 * @param {object} apu { vastaa, kors }
 * @returns {Promise<Response>} vastaus
 */
export async function haeReaktiot(url, env, apu) {
  const pyydetyt = String(url.searchParams.get('kohteet') ?? '')
    .split(',')
    .map((osa) => {
      try {
        return decodeURIComponent(osa.trim());
      } catch {
        return '';
      }
    })
    .filter(Boolean)
    .slice(0, KOHTEITA_ENINTAAN);

  const reaktiot = {};
  for (const kohde of pyydetyt) {
    const polku = kohteenPolku(kohde);
    if (!polku) continue;
    // eslint-disable-next-line no-await-in-loop
    const { tietue } = await lueTietue(env.EHDOTUKSET, polku, kohde);
    reaktiot[kohde] = tietue ? tietue.aanet : tyhjatAanet();
  }
  return apu.vastaa({ reaktiot }, apu.kors);
}

/**
 * POST /reaktio — yksi ääni, mahdollisesti aiemman tilalle.
 *
 * Runko: { kohde, otsikko, symboli, edellinen }. `symboli` on uusi
 * ääni (null = pelaaja perui äänensä) ja `edellinen` se, jonka hän
 * antoi aiemmin samalle kohteelle. Vähennys tehdään vain jos laskuri
 * on plussalla — muuten tyhjennetty selainmuisti voisi painaa luvut
 * miinukselle.
 *
 * @param {Request} pyynto pyyntö
 * @param {object} env ympäristö
 * @param {object} apu { vastaa, kors }
 * @returns {Promise<Response>} vastaus
 */
export async function kirjaaReaktio(pyynto, env, apu) {
  let runko;
  try {
    runko = await pyynto.json();
  } catch {
    return apu.vastaa({ virhe: 'Runko ei jäsenny' }, { status: 400, ...apu.kors });
  }
  const kohde = String(runko?.kohde ?? '').trim();
  const polku = kohteenPolku(kohde);
  if (!polku) return apu.vastaa({ virhe: 'Kohde ei kelpaa' }, { status: 400, ...apu.kors });

  const symboli = REAKTIO_SYMBOLIT.includes(runko?.symboli) ? runko.symboli : null;
  const edellinen = REAKTIO_SYMBOLIT.includes(runko?.edellinen) ? runko.edellinen : null;
  if (!symboli && !edellinen) {
    return apu.vastaa({ virhe: 'Symboli ei kelpaa' }, { status: 400, ...apu.kors });
  }
  if (symboli === edellinen) {
    // Sama ääni uudestaan ei ole muutos. Palautetaan nykytila, jottei
    // tuplanapautus kasvattaisi laskuria.
    const { tietue } = await lueTietue(env.EHDOTUKSET, polku, kohde);
    return apu.vastaa({ ok: true, ...julkinenTietue(tietue ?? siivoaTietue(null, kohde)) },
      apu.kors);
  }

  const otsikko = String(runko?.otsikko ?? '').trim().replace(/\s+/g, ' ');
  const tietue = await paivitaTietue(env.EHDOTUKSET, polku, kohde, (vanha) => {
    const uusi = { ...vanha, aanet: { ...vanha.aanet } };
    if (edellinen && uusi.aanet[edellinen] > 0) uusi.aanet[edellinen] -= 1;
    if (symboli) uusi.aanet[symboli] += 1;
    if (otsikko) uusi.otsikko = otsikko.slice(0, KOHTEEN_KATTO);
    uusi.kohde = kohde;
    uusi.paivitetty = new Date().toISOString();
    // Uusi tahra tarkoittaa, ettei kohde ole enää korjattu: merkintä
    // pois, tai omistajan listassa lukisi "korjattu" tuoreen
    // ilmoituksen vieressä.
    if (symboli === 'virhe') uusi.korjattu = '';
    return uusi;
  });
  return apu.vastaa({ ok: true, ...julkinenTietue(tietue) }, apu.kors);
}

/* ------------------------------------------------------------------ *
 * Omistajan reitit (EHDOTUS_AVAIN)
 * ------------------------------------------------------------------ */

/**
 * GET /reaktio-lista?avain=… — kaikki kohteet, joilla on ääniä.
 *
 * Järjestys: tahralliset ensin (ne odottavat korjausta), sitten eniten
 * ääniä saaneet. Omistaja avaa listan nähdäkseen kaksi asiaa: mistä
 * pidetään ja mikä on rikki.
 *
 * @param {object} env ympäristö
 * @param {object} apu { vastaa, kors }
 * @returns {Promise<Response>} vastaus
 */
export async function listaaReaktiot(env, apu) {
  const ampari = env.EHDOTUKSET;
  const avaimet = [];
  let kursori;
  do {
    // eslint-disable-next-line no-await-in-loop
    const sivu = await ampari.list({ prefix: REAKTIO_ETULIITE, cursor: kursori });
    for (const olio of sivu.objects ?? []) {
      if (olio.key.endsWith('.json')) avaimet.push(olio.key);
    }
    kursori = sivu.truncated ? sivu.cursor : null;
  } while (kursori);

  const kohteet = [];
  for (const avain of avaimet.slice(0, LISTAN_KATTO)) {
    // eslint-disable-next-line no-await-in-loop
    const { tietue } = await lueTietue(ampari, avain, polunKohde(avain));
    if (!tietue) continue;
    const yhteensa = REAKTIO_SYMBOLIT.reduce((summa, s) => summa + tietue.aanet[s], 0);
    if (!yhteensa) continue;
    kohteet.push({ ...tietue, yhteensa });
  }
  kohteet.sort((a, b) => (b.aanet.virhe - a.aanet.virhe) || (b.yhteensa - a.yhteensa)
    || a.kohde.localeCompare(b.kohde));
  return apu.vastaa({ kohteet }, apu.kors);
}

/**
 * PUT /reaktio-korjattu?avain=… — tahra pois korjatulta kohteelta.
 *
 * Omistajan linjaus: "korjattu virhe: tahra häviää; sitä ennen
 * julkisesti näkyvissä." Muut laskurit jäävät koskematta — kohde on
 * yhä sama juttu, ja siitä pitäminen ei katoa korjauksen mukana.
 *
 * @param {Request} pyynto pyyntö ({ kohde })
 * @param {object} env ympäristö
 * @param {object} apu { vastaa, kors }
 * @returns {Promise<Response>} vastaus
 */
export async function merkitseKorjatuksi(pyynto, env, apu) {
  let runko;
  try {
    runko = await pyynto.json();
  } catch {
    return apu.vastaa({ virhe: 'Runko ei jäsenny' }, { status: 400, ...apu.kors });
  }
  const kohde = String(runko?.kohde ?? '').trim();
  const polku = kohteenPolku(kohde);
  if (!polku) return apu.vastaa({ virhe: 'Kohde ei kelpaa' }, { status: 400, ...apu.kors });
  const { tietue } = await lueTietue(env.EHDOTUKSET, polku, kohde);
  if (!tietue) return apu.vastaa({ virhe: 'Ei löydy' }, { status: 404, ...apu.kors });

  const paivitetty = await paivitaTietue(env.EHDOTUKSET, polku, kohde, (vanha) => ({
    ...vanha,
    aanet: { ...vanha.aanet, virhe: 0 },
    korjattu: new Date().toISOString(),
  }));
  return apu.vastaa({ ok: true, kohde: paivitetty }, apu.kors);
}

/** Kuuluuko polku reaktiolaskureille? */
export function reaktioPolku(polku) {
  return polku === '/reaktiot' || polku === '/reaktio'
    || polku === '/reaktio-lista' || polku === '/reaktio-korjattu';
}

/** Vaatiiko reitti omistajan avaimen? */
export function reaktioOmistajanPolku(polku) {
  return polku === '/reaktio-lista' || polku === '/reaktio-korjattu';
}
