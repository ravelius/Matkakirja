/*
 * SAAPUMISTEKSTIT JA LIVIAN SAAPUMISREPLIIKIT (skeema 1.24, Natiivi-UI:n
 * datatoiveet 1 ja 4, 23.9.2026).
 *
 * Kaupunki ilman fokusvirtaa (FOKUSVIRRAT-riviä ei ole) saa webissä
 * matkakirjakortin js/ui.js renderFact -varapolulta. Tämä vie saman
 * kortin sisällön tyypitettynä, valittuna ja jaettuna PELIN OMILLA
 * FUNKTIOILLA:
 *
 *   valinta          renderFact: SAAPUMISTEKSTIT[lauta][kaupunki] (pakin
 *                    kuvaus + nosto) → tarinakaaren saapuminen
 *                    (KAARI_LAUDAT, TARINAKAARI) → kaupungin havainto
 *                    (placeFacts: isoisän havainto ensin, muuten ensimmäinen)
 *   otsikko          'Matkakirjasta' tai havainnolla voiceTitle(factVoice())
 *   lihavoitu/jatko  js/ui-apurit.js ekaLause (vain ensimmäinen virke lihavoitu)
 *   aani             js/aani-ehdokkaat.js luentaVastaaTekstia +
 *                    js/sisaltotaulut.js luentaLauta (SAAPUMISLUENNAT),
 *                    tarinakaarella kaariLuentaSoi; osoite js/media.js aaniUrl
 *   kuvat            js/ui.js naytaPostikortti: kuvapino VALOKUVAT[lauta]
 *                    [kaupunki] (historiakuva, lisat, uusi), harmaasävy
 *                    js/ui-apurit.js onVanhaKuva, kuvat R.kuva-muodossa
 *   Livian kupla     js/fokusvirta.js fokusvirtaSaapumiskupla (LIVIAN_SAAPUMISET),
 *                    osat js/ui-apurit.js jaaPuheenvuoroksi
 */
import { ekaLause, jaaPuheenvuoroksi, onVanhaKuva } from '../../js/ui-apurit.js';
import { luentaVastaaTekstia } from '../../js/aani-ehdokkaat.js';
import { factText, factVoice, voiceTitle } from '../../js/pack.js';
import { aaniUrl, horatioAanenKesto } from '../../js/media.js';
import { KAARI_LAUDAT, kaariLuentaSoi } from '../../js/packs/tarinakaari.js';
import { LIVIAN_SAAPUMISET } from '../../js/fokusvirta.js';
import {
  livianKaupunkiAanitetty, livianKentanKuplat, livianKenttaPinoutuu, livianKuplat,
} from '../../js/liviapuhe.js';

const LAUTA = 'maailmankartta';

/*
 * Livian saapumispuheenvuoro (js/fokusvirta.js fokusvirtaSaapumiskupla):
 * kulun kommentti (pollo.kommentti) voittaa, sen puuttuessa vanha
 * maadoitus, ja vasta sitten kaupungin oma LIVIAN_SAAPUMISET-repliikki.
 * Kulku luetaan fokusvirrasta vain fokusmoodissa (fokusvirtaSisalto), joten
 * fokusmoodissa taulun repliikki näkyy vain kaupungissa, jolla ei ole
 * kommenttia eikä maadoitusta.
 */
function kulunKentta(virta) {
  if (livianKentanKuplat(virta, 'kommentti').length) return 'kommentti';
  if (livianKentanKuplat(virta, 'maadoitus').length) return 'maadoitus';
  return null;
}

function livianSaapumisRivit(FOKUSVIRRAT, kaupunkiIdt) {
  return Object.keys(LIVIAN_SAAPUMISET).sort().map((kaupunki) => {
    const kuplat = livianKuplat(LIVIAN_SAAPUMISET[kaupunki]);
    // Sama jako kuin livianOsatJaAani (kenttä '' = ei äänitettyä kenttää).
    const osat = livianKenttaPinoutuu('', kuplat.length) ? jaaPuheenvuoroksi(kuplat[0] ?? '') : kuplat;
    const virta = FOKUSVIRRAT[kaupunki] ?? null;
    const korvaa = virta ? kulunKentta(virta) : null;
    return {
      id: kaupunki,
      kaupunki: kaupunkiIdt.has(kaupunki) ? kaupunki : null,
      teksti: kuplat.join(' '),
      osat,
      aani: null,
      aanitetty: livianKaupunkiAanitetty(kaupunki, ''),
      fokuskaupunki: Boolean(virta),
      korvautuu: korvaa,
      naytetaanFokusmoodissa: !korvaa,
    };
  });
}

/**
 * Kokoelmat saapumistekstit ja liviansaapumiset. R = lehtien rakentajat
 * (tools/vienti/lehdet.mjs, R.kuva).
 */
export function saapumisKokoelmat(ns, hae, R, taulukko) {
  const P = ns.MAAILMANKARTTA;
  const { SAAPUMISTEKSTIT, SAAPUMISLUENNAT, VALOKUVAT, luentaLauta } = hae('js/sisaltotaulut.js');
  const { FOKUSVIRRAT, fokusvirtaKaupungille } = hae('js/packs/fokusvirrat.js');
  const { TARINAKAARI } = hae('js/packs/tarinakaari.js');
  const kaupunkiIdt = new Set(P.cities.map((c) => c.id));
  const livia = livianSaapumisRivit(FOKUSVIRRAT, kaupunkiIdt);
  const liviaNakyy = new Set(livia.filter((r) => r.naytetaanFokusmoodissa).map((r) => r.id));

  const aani = (polku) => ({ aanite: polku, url: aaniUrl(polku), kesto: horatioAanenKesto(polku) });

  // Postikortin kuvapino (js/ui.js naytaPostikortti): historiakuva, lisat, uusi.
  const kuvapino = (valokuva, paikka) => {
    if (!valokuva) return [];
    const historiakuva = Boolean(valokuva.tiedosto);
    const { lisat = [], uusi = null, ...oma } = valokuva;
    const pino = [
      ...(historiakuva ? [oma] : []),
      ...lisat,
      ...(uusi ? [{ ...uusi, vuosi: uusi.vuosi ?? 'nykypäivä' }] : []),
    ];
    return pino.map((o, i) => {
      const k = R.kuva(o);
      if (!k) return null;
      k.vanha = onVanhaKuva(o, i === 0 && historiakuva);
      // Postikortin lähderivi: paikka · vuosi · lähde.
      k.lahderivi = [paikka, o.vuosi, o.lahde].filter(Boolean).join(' · ') || null;
      return k;
    }).filter(Boolean);
  };

  const rivit = [];
  for (const c of P.cities) {
    if (fokusvirtaKaupungille(c.id)) continue;
    const vanha = (SAAPUMISTEKSTIT[LAUTA] ?? {})[c.id] ?? null;
    const kaari = !vanha && KAARI_LAUDAT.has(LAUTA) ? TARINAKAARI[c.id] ?? null : null;
    const uusi = kaari ? { kuvaus: kaari.saapuminen, nosto: '' } : vanha;
    let rivi;
    if (uusi) {
      const { eka, loput } = ekaLause(uusi.kuvaus);
      const jatko = [loput, uusi.nosto].filter(Boolean).join(' ');
      const lauta = kaari
        ? (kaariLuentaSoi(kaari, 'saapuminen') ? 'kaari' : null)
        : (luentaVastaaTekstia(uusi) ? luentaLauta(SAAPUMISLUENNAT, LAUTA, c.id) : null);
      rivi = {
        laji: kaari ? 'kaari' : 'matkakirja',
        otsikko: 'Matkakirjasta',
        kuvaus: uusi.kuvaus,
        lihavoitu: eka,
        jatko,
        nosto: uusi.nosto ? { teksti: uusi.nosto } : null,
        aani: lauta ? aani(`assets/audio/puhe-${lauta}-saapuminen-${c.id}.mp3`) : null,
        lukija: lauta ? null : [uusi.kuvaus, uusi.nosto].filter(Boolean).join(' '),
        wiki: null,
      };
    } else {
      const faktat = P.placeFacts?.[c.id] ?? [];
      const i = faktat.findIndex((f) => factVoice(f) === 'isoisa');
      const fakta = faktat[i >= 0 ? i : 0];
      if (!fakta) continue;
      const teksti = factText(fakta);
      const { eka, loput } = ekaLause(teksti);
      rivi = {
        laji: 'havainto',
        otsikko: voiceTitle(factVoice(fakta)),
        kuvaus: teksti,
        lihavoitu: eka,
        jatko: loput,
        nosto: null,
        aani: null,
        // Havainnon luenta on laitteen puhetta ensimmäisestä virkkeestä.
        lukija: eka,
        wiki: typeof fakta === 'string' ? null : fakta.wiki ?? null,
      };
    }
    const teksti = [rivi.lihavoitu, rivi.jatko].filter(Boolean).join(' ');
    const kuvat = kuvapino(VALOKUVAT[LAUTA]?.[c.id], c.name);
    rivit.push({
      id: c.id,
      kaupunki: c.id,
      laji: rivi.laji,
      otsikko: rivi.otsikko,
      paikkarivi: c.name,
      teksti,
      // Kortti on yksi kappale: lihavoitu alku + jatko (js/ui.js renderFact).
      kappaleet: [teksti],
      lihavoitu: rivi.lihavoitu,
      jatko: rivi.jatko || null,
      kuvaus: rivi.kuvaus,
      nosto: rivi.nosto,
      aani: rivi.aani,
      lukija: rivi.lukija,
      wiki: rivi.wiki,
      kuva: kuvat[0] ?? null,
      kuvat,
      livianRepliikki: liviaNakyy.has(c.id) ? c.id : null,
    });
  }

  return {
    saapumistekstit: taulukko(`js/sisaltotaulut.js#SAAPUMISTEKSTIT.${LAUTA} + VALOKUVAT + placeFacts (js/ui.js renderFact)`,
      'Saapumisen matkakirjakortti kaupungeille, joilla ei ole fokusvirtaa (fokusvirta-kaupungin kortti: fokusvirrat.virta.matkakirja '
        + 'ja luennat). Valinta kuten webissä: laji matkakirja = pakin kuvaus + nosto (SAAPUMISTEKSTIT), kaari = tarinakaaren '
        + 'saapuminen, havainto = kaupungin havainto (isoisän havainto ensin, muuten ensimmäinen placeFacts-rivi). otsikko = kortin '
        + 'otsake ("Matkakirjasta" tai havainnon äänen otsikko), paikkarivi = kaupungin nimi. teksti = koko näytettävä teksti yhtenä '
        + 'kappaleena (kappaleet = [teksti]); lihavoitu = ensimmäinen virke (lihavoidaan, ekaLause), jatko = loput + nosto '
        + 'tavallisena. kuvaus = pakin kuvaus sellaisenaan, nosto = { teksti } (isoisän nosto, joka jatkaa kuvausta) | null. '
        + 'aani = { aanite, url, kesto } kun äänite vastaa tekstiä (luentaVastaaTekstia), muuten null ja lukija = teksti, jonka '
        + 'web lukee laitteen puheella (matkakirja: koko merkintä, kun kertojatila on pitkä; havainto: ensimmäinen virke). '
        + 'wiki = havainnon Wikipedia-otsikko (kuvalinkki) | null. kuva = muistikirjan pikkukuva (pinon ensimmäinen), kuvat = '
        + 'postikortin pino järjestyksessä historiakuva, lisat, nykykuva: { arvo, url, varat, leveys?, korkeus?, lyhyt, selite, '
        + 'lahde, vuosi?, vanha (harmaasävy), lahderivi (paikka · vuosi · lähde) }. livianRepliikki = liviansaapumiset-id, jos '
        + 'Livia kommentoi kortin luennan jälkeen (webissä kaupunki ilman fokusvirtaa ei saa kuplaa: kaikki null).',
      { kaupunki: 'kaupungit', livianRepliikki: 'liviansaapumiset' }, rivit),
    liviansaapumiset: taulukko('js/fokusvirta.js#LIVIAN_SAAPUMISET',
      'Livian kirjoitetut saapumisrepliikit kaupungeittain (ei äänitetty: aani null, aanitetty false). VALINTASÄÄNTÖ '
        + '(js/fokusvirta.js fokusvirtaSaapumiskupla, ei satunnainen): matkakirjan luennan loputtua Livia saa yhden kuplasarjan '
        + 'per saapuminen. Fokusmoodissa kaupungin fokusvirran pollo.kommentti voittaa, sitten pollo.maadoitus, ja vasta niiden '
        + 'puuttuessa tämän taulun repliikki (korvautuu = voittava kenttä | null, naytetaanFokusmoodissa = !korvautuu). '
        + 'Fokusmoodin ollessa pois fokusvirtaa ei lueta ja taulun repliikki näkyy. Kaupunki ilman kumpaakaan ei saa kuplaa '
        + '(ei geneeristä täytettä). Kupla odottaa luennan loppua ja tauon (900 ms) sekä ensisaapumisen paljastussarjan; sama '
        + 'kaupunki kerran istunnossa. osat = kuplat järjestyksessä (jaaPuheenvuoroksi). Kaupungeille ilman fokusvirtaa ei ole '
        + 'yhtään riviä (saapumistekstit.livianRepliikki null).',
      { kaupunki: 'kaupungit' }, livia),
  };
}
