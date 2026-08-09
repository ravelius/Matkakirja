/*
 * Uutiset lehden maaosastoon (omistajan toive 5.8.2026).
 *
 * Kaksi tehtävää:
 *  1. haeUutiset(iso) — RSS-syöte Worker-välityksen kautta ja
 *     kevyt jäsennys DOMParserilla. Palauttaa enintään viisi
 *     tuoreinta otsikkoa; virhe tai puuttuva välitys palauttaa
 *     tyhjän listan, jolloin osio pysyy piilossa.
 *  2. kaannaSuomeksi(teksti, kieli) — konekäännös MyMemoryllä
 *     (ilmainen, avaimeton, CORS-avoin). Pitkä teksti käännetään
 *     virkkeittäin paloissa, koska palvelu ottaa enintään ~500
 *     merkkiä kerrallaan. Virhe palauttaa null — nappi kertoo
 *     silloin, ettei käännöstä saatu.
 */
import { UUTISPROXY, UUTISLAHTEET } from './packs/uutislahteet.js';

const KAANNOS_OSOITE = 'https://api.mymemory.translated.net/get';
// Puoli tuntia: lehteä selataan saman pelisession aikana monta
// kertaa, eikä syöte ehdi muuttua.
const VALIMUISTI_MS = 30 * 60 * 1000;
const valimuisti = new Map();

export function uutislahde(iso) {
  return UUTISPROXY ? (UUTISLAHTEET[iso] ?? null) : null;
}

/** Enintään viisi uutista: { otsikko, kuvaus, linkki, aika }. */
export async function haeUutiset(iso) {
  const lahde = uutislahde(iso);
  if (!lahde) return [];
  const vanha = valimuisti.get(iso);
  if (vanha && Date.now() - vanha.aika < VALIMUISTI_MS) return vanha.uutiset;
  try {
    const osoite = `${UUTISPROXY}?url=${encodeURIComponent(lahde.syote)}`;
    const vastaus = await fetch(osoite, { signal: AbortSignal.timeout(10000) });
    if (!vastaus.ok) return [];
    const dokumentti = new DOMParser().parseFromString(await vastaus.text(), 'text/xml');
    const uutiset = [...dokumentti.querySelectorAll('item')].slice(0, 5).map((item) => ({
      otsikko: item.querySelector('title')?.textContent.trim() ?? '',
      kuvaus: item.querySelector('description')?.textContent.trim() ?? '',
      linkki: item.querySelector('link')?.textContent.trim() ?? '',
      aika: item.querySelector('pubDate')?.textContent.trim() ?? '',
    })).filter((u) => u.otsikko);
    valimuisti.set(iso, { aika: Date.now(), uutiset });
    return uutiset;
  } catch {
    return [];
  }
}

/*
 * Jako virkkeisiin niin, ettei yksikään pala ylitä MyMemoryn rajaa.
 * Ylipitkä virke katkaistaan sanarajalta — parempi hieman katkennut
 * käännös kuin ei käännöstä lainkaan.
 */
function paloittele(teksti, raja = 450) {
  const virkkeet = teksti.match(/[^.!?]+[.!?]*\s*/g) ?? [teksti];
  const palat = [];
  let pala = '';
  for (let virke of virkkeet) {
    // Ylipitkä virke katkotaan sanarajoilta omiksi paloikseen.
    while (virke.length > raja) {
      const katko = virke.lastIndexOf(' ', raja);
      const kohta = katko > 0 ? katko : raja;
      if (pala) {
        palat.push(pala);
        pala = '';
      }
      palat.push(virke.slice(0, kohta));
      virke = virke.slice(kohta + 1);
    }
    if ((pala + virke).length > raja && pala) {
      palat.push(pala);
      pala = '';
    }
    pala += virke;
  }
  if (pala) palat.push(pala);
  return palat;
}

/*
 * Artikkelin leipäteksti uutissivulta (omistajan toive 5.8.2026:
 * "eikö saa pidempää tekstiä pop-up-ikkunaan?"). Syötteiden kuvaukset
 * ovat parin lauseen mittaisia, joten popupia varten haetaan itse
 * artikkelisivu workerin kautta ja poimitaan siitä kappaleet.
 *
 * Poiminta: ensin schema.org-merkintä [itemprop="articleBody"] (ANSA
 * käyttää sitä), sitten <article>. Lyhyet rivit ja copyright-häntä
 * suodatetaan. Jos worker ei vielä päästä artikkelisivuja läpi
 * (vanha versio, 403) tai jäsennys ei löydä mitään, palautetaan null
 * ja popup näyttää syötteen kuvauksen — mikään ei mene rikki.
 */
const artikkeliMuisti = new Map();

export async function haeArtikkeli(linkki) {
  if (!UUTISPROXY || !linkki) return null;
  if (artikkeliMuisti.has(linkki)) return artikkeliMuisti.get(linkki);
  let artikkeli = null;
  try {
    const osoite = `${UUTISPROXY}?url=${encodeURIComponent(linkki)}`;
    const vastaus = await fetch(osoite, { signal: AbortSignal.timeout(12000) });
    if (vastaus.ok) {
      const dokumentti = new DOMParser().parseFromString(await vastaus.text(), 'text/html');
      const runko = dokumentti.querySelector('[itemprop="articleBody"]')
        ?? dokumentti.querySelector('article');
      const kappaleet = [...(runko?.querySelectorAll('p') ?? [])]
        .map((p) => p.textContent.replace(/\s+/g, ' ').trim())
        .filter((t) => t.length > 60 && !/Riproduzione riservata|©|Copyright/i.test(t))
        .slice(0, 6);
      // Artikkelin kuva jakokuvamerkinnästä: <img> ei tarvitse CORSia,
      // joten osoite kelpaa suoraan popupiin ilman välitystä.
      const kuva = dokumentti.querySelector('meta[property="og:image"]')?.content ?? null;
      if (kappaleet.length || kuva) artikkeli = { kappaleet, kuva };
    }
  } catch {
    artikkeli = null;
  }
  artikkeliMuisti.set(linkki, artikkeli);
  return artikkeli;
}

/*
 * Päivän kuva EI tule enää tästä tiedostosta: Commonsin päivän kuvan
 * haku wikitekstiriisuntoineen (v331) korvattiin omalla kuratoidulla
 * listalla, koska Commonsin valintaa ei tehdä lapsille (omistajan
 * havainto 7.8.2026: olutpäivän elokuvajuliste). Ks.
 * js/packs/paivan-kuvat.js.
 */

/*
 * Käännösmuisti: etusivun otsikot suomennetaan joka avauksella, ja
 * ilmainen palvelu laskee merkkejä — sama teksti käännetään siksi
 * vain kerran istunnossa.
 */
const kaannosMuisti = new Map();

/** Konekäännös suomeksi tai null. */
export async function kaannaSuomeksi(teksti, kieli) {
  if (!teksti?.trim()) return '';
  const muistiAvain = `${kieli}|${teksti}`;
  if (kaannosMuisti.has(muistiAvain)) return kaannosMuisti.get(muistiAvain);
  try {
    const palat = paloittele(teksti.trim());
    const kaannokset = [];
    for (const pala of palat.slice(0, 4)) {
      const osoite = `${KAANNOS_OSOITE}?q=${encodeURIComponent(pala)}`
        + `&langpair=${encodeURIComponent(`${kieli}|fi`)}`;
      // Palat haetaan peräkkäin, ei rinnakkain — ilmainen palvelu
      // rajoittaa pyyntejä, eikä uutispopupilla ole kiire.
      const vastaus = await fetch(osoite, { signal: AbortSignal.timeout(10000) });
      if (!vastaus.ok) return null;
      const data = await vastaus.json();
      const kaannos = data?.responseData?.translatedText;
      if (!kaannos || data.responseStatus !== 200) return null;
      kaannokset.push(kaannos);
    }
    const koko = kaannokset.join(' ');
    kaannosMuisti.set(muistiAvain, koko);
    return koko;
  } catch {
    return null;
  }
}
