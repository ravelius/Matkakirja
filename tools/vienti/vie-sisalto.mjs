#!/usr/bin/env node
/*
 * SISÄLLÖN VIENTI MOOTTORINEUTRAALIKSI JSONIKSI (Siirtoseppä 23.9.2026).
 *
 *   node tools/vienti/vie-sisalto.mjs [--ulos dist/vienti]
 *
 * Tausta: omistaja rakentaa natiivin iOS-pelin nykyisen rinnalle (loki
 * 23.9.2026 klo 09.43). Moottori on vielä valitsematta, joten sisältö
 * viedään muotoon, jonka mikä tahansa moottori osaa lukea: JSON-puita
 * ja mediaviittauksia ämpäriin (https://media.matkakirja.app/).
 *
 * Kolme kerrosta:
 *   moduulit/<polku>.json  RAAKAKERROS: jokaisen sisältömoduulin kaikki
 *                          exportit häviöttömästi (tools/vienti/
 *                          sarjallista.mjs). Totuus; muut kerrokset
 *                          johdetaan tästä.
 *   media.json             jokainen datassa mainittu kuva/ääni/URL,
 *                          missä se esiintyy ja ämpärin osoite, kun sen
 *                          voi laskea pelin omilla säännöillä.
 *   kokoelmat/*.json       KOKOELMAKERROS: tyypitetyt entiteetit (kaupungit,
 *                          reitit, maat...) id-viittauksineen — tuojan
 *                          helppo lähtöpiste (tools/vienti/kokoelmat.mjs).
 *   tiedostot/...          valmiit JSON-aineistot sellaisenaan (lahteet.mjs).
 *   web/<näkymä>.json      web-näkymän (lehti) koodi- ja tiedostoriippuvuudet
 *                          natiivin WKWebView-kuorelle (web-riippuvuudet.mjs).
 *   skeema/*.schema.json   JSON Schema (2020-12) jokaiselle tiedostolajille.
 *   manifest.json          sisällysluettelo: moduulit, exportit, lukumäärät,
 *                          tiivisteet. Tuoja tarkistaa tästä, että sai kaiken.
 *
 * Deterministinen: ei aikaleimoja, moduulit aakkosjärjestyksessä, exportit
 * moduulinimiavaruuden (aakkos)järjestyksessä, datan järjestys lähteen
 * järjestys. Sama lähde → tavulleen sama tulos (tests/vienti.test.mjs).
 *
 * Ei muuta peliä: lukee vain moduuleja. dist/ on .gitignoressa.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { sarjallista } from './sarjallista.mjs';
import { LISAMODUULIT, LISATIEDOSTOT, PAKETISTA_POISTETUT } from './lahteet.mjs';
import { SIVUSTON_ASSET_ETULIITE, TARKKUUS, mediaLaji, ratkaiseMedia, sivustonTiiviste } from './media.mjs';
import { kokoaKokoelmat } from './kokoelmat.mjs';
import { kokoaWebNakymat } from './web-riippuvuudet.mjs';
import { logiikkaLista } from './logiikka.mjs';
import { kokoaOffline } from './offline.mjs';
import { lueKuvamitat } from './kuvamitat.mjs';
import { kokoaLisenssit } from './lisenssit.mjs';

export const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const SKEEMAVERSIO = 'matkakirja-vienti/1';
/*
 * Skeeman major.minor (siirtoputkiraportin osa 5.3). Major on polussa
 * (`matkakirja-vienti/1`, ämpärissä `sisalto/1/`); minor nousee, kun
 * lisätään kenttä tai kokoelma, eikä vanha sovellus välitä siitä.
 * Poisto tai merkityksen muutos nostaa majoria ja vaihtaa osoitinpolun.
 *   1.0  ensimmäinen vienti (PR #2890)
 *   1.1  kaupungit: maa2 (ISO2), tyyppi, lentokentta, aloitus; osoitin
 *   1.2  kaupungit: tarkeys 0–3; manifest: tavuja kokoelmille, medialle
 *        ja lisätiedostoille; kaupunki.data merkitty raakaolioksi
 *   1.3  web/<näkymä>.json: web-näkymän (lehti) JS/CSS/tiedostoriippuvuudet
 *        WKWebView-kuorelle; manifest.webNakymat
 *   1.4  kokoelmat saannot (hinnat ja sääntövakiot) ja saapuminen
 *        (saapumishaut kaupungeittain valmiiksi laskettuina)
 *   1.5  manifest.logiikka (jokainen paketin funktio luokiteltuna,
 *        tools/vienti/logiikka.mjs), kokoelmat esilasketut ja laatat,
 *        media.suurennos; kaupungit.lauta {x, y}, reitit.askelia ja via
 *   1.6  saannot: tokens.js ja ai.js (aarteiden arvovälit, BOT_SKILL),
 *        litteät sääntörakenteet; kokoelma tapahtumat (AFRICA.events)
 *   1.7  kokoelma linssiaineisto (maskit, manifestit, pilvet, astronautin
 *        äänet, avauskynnykset)
 *   1.8  kokoelma aanitaulut (tehosteet ja näytteet, ambienssit, pulu,
 *        siirtymä-, tila- ja paikkaraidat, musiikkiketju kaupungeittain)
 *   1.9  kokoelmat kuvakysymykset, lippumaat, pulmaaineisto, luennat
 *        (aikaleimoineen), livianpuhe ja maat; offline.json (manifest.offline)
 *   1.10 (nippu 4) kokoelmat karttamerkit, karttavalot, maastonimet ja
 *        maarajat; kaupungit.korkeus; muotokuva kohtaamisiin ja tarinakaareen, laattojen ja
 *        paikallisaarteiden kuvat, linssiluennat, saannot KATKOKUVA;
 *        luennat: reaktiot, tekstiSha256, reaktioHetket (vain voimassa
 *        olevista aikaleimoista; vanhentuneet aikaleimat pois paketista).
 *        Vertaa versioita numeroina (1.10 > 1.9), ei merkkijonoina.
 *   1.11 Livian cue-data: livianpuhe.cuet[].ele, alku, loppu ja
 *        eleetTila, aaniTavut, aaniSha256 (tools/vienti/livian-eleet.mjs);
 *        luennat.reaktiot[].ele; kokoelma livianrepliikit (68 äänitettyä
 *        repliikkiä).
 *   1.12 Sivuston assetit ämpärissä: repon assets/-kuvat (karttamerkit,
 *        kätkökuva, liput, kartat, valokuvat…) osoittavat
 *        media.matkakirja.app/assets/…?v=<sha256 12>, Pages varana;
 *        saannot LIVIAN_ASTRONAUTTI_KYPARA. CI vie tiedostot
 *        (tools/vienti/sivustoassetit.mjs).
 *   1.13 media.json leveys ja korkeus (px, tools/vienti/kuvamitat.mjs).
 *   1.14 POISTOJA MINORINA (Fablen poikkeus 23.9.2026; sääntö 5.3 vaatisi
 *        majorin): kokoelma kaksintaistelut, saannot DUEL_PRIZE ja
 *        BOT_SKILL, moduuli js/ai.js, laatat.data.types.robber ja vanhat
 *        mannerlaudat (moduulit/js/packs/<lauta>[-questions].json,
 *        lahteet.mjs PAKETISTA_POISTETUT). Yksikään proto-haara ei lue niitä,
 *        ja kaksintaistelujen lukija sietää puuttuvan tiedoston.
 *   1.15 Lehdet natiiville (omistaja 23.9.2026, tools/vienti/lehdet.mjs):
 *        kaupunkilehdet ja maalehdet: aiheet[] (nostot kappaleineen,
 *        kuvat url/varat/mitat, äänet, musiikki, tehtävä palkkioineen,
 *        lista), sivut; kaupunkilehdet: laji, kansi, menovinkitMaalta,
 *        maaosastoEtusivulla, saa, kulttuurivisa ja "Elämää"-kaupungit
 *        (laji elama); kokoelmat kulttuurivisat ja saatiedot; maat: intro,
 *        maakartta, rajat, radio, vanhaAani, uutislahde, lipputarina,
 *        numeroina; kaupungit: intro, kielinayte; moduulit js/lehti.js,
 *        js/ui-apurit.js, js/ui.js ja js/saa.js (lehden kiinteät tekstit).
 *        Lisäksi kokoelma maakuntarajat (tools/vienti/maakuntarajat.mjs) ja
 *        lisenssit.json (manifest.lisenssit, tools/vienti/lisenssit.mjs).
 *   1.16 Radio hybridinä (omistajan kortti 23.9.2026): kokoelma radiot
 *        (asema, url, tyyppi, yleisradio, sivu, luokka sallittu | epaselva |
 *        kielletty, peruste; sallittu ja epaselva soivat; 17 kielletyn
 *        yleisradion maahan korvaava soiva asema tools/vienti/radiokorvaavat.json,
 *        kiellettyjä ei pakettiin, omistaja 23.9.2026) ja aanitaulut
 *        laji viritys (viritysäänet pelin osoitteella, tekijä ja lisenssi).
 *   1.17 kokoelma kohdekartat (kaupunkien kohdekartat, kohteiden x/y pelin
 *        karttapiste()-funktiolla, kartat ämpärissä assets/kartat/),
 *        kokoelma lehtitehtavat (fokusvirtojen lehtitehtävät) ja moduuli
 *        js/fokustehtavat.js (PULLA_NIMET, PULLA_YLEISNIMI, palkkio).
 *   1.18 nahtavyydet ja miniatyyrit päätasolle (2.0-polun ensimmäinen
 *        tyypitys, docs/raportit/sisaltopaketti-2-0-suunnitelma-20260923.md).
 *   1.19 kysymykset ja pulmat päätasolle (2.0-polku).
 *   1.20 elaintayt ja julisteet päätasolle (2.0-polku).
 *   1.21 fokusvirrat (virta: kuvat ratkaistuina, lehtitehtävien id:t) ja
 *        laatat (tyypit, mannerTyypit, maarat) päätasolle; 2.0-polun
 *        natiivin data-lukijat ovat nyt kaikki tyypitetty.
 *   1.22 kokoelma muutosloki-natiivi (Julkaisijan rivit) ja osoittimeen
 *        kokoelmaLkm ja muutos (automaattinen sisältörivi, julkaise-sisalto.mjs).
 *   1.23 offline.json ryhmat: maailma, maanosat (7) ja kaikki summattuine
 *        tavuineen; maat[].manner (omistaja: lataus maanosittain; arvot kuten kaupungit.manner).
 *   1.24 Natiivi-UI:n datatoiveet (tools/vienti/saapumiset.mjs, karttavalot.mjs):
 *        kokoelmat saapumistekstit (kaupungit ilman fokusvirtaa: pakin kuvaus
 *        ja nosto tai havainto, kuvapino R.kuva-muodossa, äänite), liviansaapumiset
 *        (LIVIAN_SAAPUMISET valintasääntöineen) ja takynostot (NOSTO_MAAT);
 *        karttavalot uusiksi webin pallon nostokerroksesta (maanKohdemerkit:
 *        + syvennykset, täky- ja maalehtinostot, napakohteet, kohdekartalle
 *        siirretyt paakartalla false; nimio, paikka, kategoria, tunnus, ladottu,
 *        taso, lahizoom, kaupunkiAvain, kohdekartta, takynosto, liitetytNostot);
 *        kohdekartat.kohteet[].linkit ja aihe.
 *   1.25 maakuntarajat: juuren kaaret (rajaviivat, jokainen jaettu raja kerran)
 *        ja renkaat rakennettuna samoista kaarista (Natiivisepän pyyntö,
 *        Fable 24.9.2026: rajat vektoriviivoina); tools/vienti/maakuntarajat.mjs
 *        kaariTopologia. Lisäksi julkaisun tarkistus skeemasopimus.mjs.
 *   1.26 2.0-polku jatkuu (Pelikoodarin pakettivartija, v32): tarinakaari,
 *        paikkatiedot, kohtaamiset, kohtaamiskuvat, paikallisaarteet,
 *        saapumispuheet sekä fokusvirtojen kohtaamispiste ja sahketehtava
 *        päätasolle (tools/vienti/tyypitys.mjs).
 *   1.27 työhuoneen moduulit natiivin KOKEET-valikolle (Natiivi-UI):
 *        js/tyohuone-raamattu.js RAAMATTU, js/tyohuone-tilanne.js TILANNE,
 *        TESTATTAVAA ja TUOREET, js/tyohuone-pelit.js PELIT (luokka kehittaja);
 *        tyohuone-musiikki.js HILJENNYKSEN_SYY ja TUNTEMATTOMAT_LAJIT.
 *        Kehittäjämoduulien sähköpostiosoitteet peitetään (peitaSahkopostit).
 *   1.28 kokoelma tyohuonetilastot (Natiivi-UI): webin laskeTilastot()
 *        valmiina (alkio = manner), juuressa sarakkeet (KAUPUNGIN_OSAT ja
 *        MAAN_OSAT ilman laskufunktioita).
 *   1.29 maarajat: renkaat rajattu webin laudan maamuodon alueelle (Natiiviseppä:
 *        NOR ilman Huippuvuoria kuten webissä), muutRenkaat ja kokoBbox
 *        (tools/vienti/maarajat.mjs rajaaWebinMuotoon).
 *   1.30 Pelikoodarin tilaus: aanitaulut (siirtyma, tila-/paikkaraita, pulu)
 *        kentät päätasolle, reitit.maksu, laattatyyppeihin nimi/symboli/arvo/vari.
 *   1.31 ennen 2.0:aa loput raakakentät päätasolle: skandaalit, historianHetket,
 *        monumentit ja fokusvirrat sellaisenaan; kaupungit wiki, ambienssi,
 *        nimionAnkkuri.
 *   1.32 linssiaineisto sellaisenaan päätasolle (Linssiseppä), tarinakaari kuva,
 *        lauta, saapumisLuenta; kohtaamiskuvat kansio, tiedosto; tapahtumat teksti,
 *        vaikutus. Vartija: jokainen raakakenttä päätasolla tai RAAKA_VASTINEET.
 *   1.33 kokoelma maamerkit (natiivin 3D-maamerkit, Pelikoodari; Raamattu LENNON
 *        KARTTA JA MAAMERKIT): lat, lon, maanKorkeus, suunta, mallinKorkeus,
 *        malli { url, sha256, tavuja }; mallit myös offline.json maat[].media.
 *   1.34 maarajat: 1.29:n rajaus pois (web #3078 piirtää Natural Earth 10m
 *        -rajat): renkaat = kaikki admin-0-renkaat, muutRenkaat = [].
 *   1.35 maat.fokuspohja = webin FOKUS_POHJAT (bbox ja rajaus asteina ja laudalla):
 *        nostotaso ja kameran rajaus kuten webissä (Natiiviseppä).
 *   1.36 kokoelma merinimet (Linssiseppä, build 11): webin nimiötason meret
 *        (nimisto-1873 luokka meri) nimi, lat, lon, kulma, kaari, tasot, lahde,
 *        lisenssi; juuren tyyli = webin piirto (tools/vienti/merinimet.mjs).
 *   1.37 kokoelma aluenimet (Karttaseppä, löydös 38 b): assets/data/aluenimet-natiivi.json
 *        sellaisenaan (meret, maakunnat, nykyalueet väistön jälkeisin ankkurein
 *        tasoittain + valtameret); juuressa tyylit, fontti, aineistoversio.
 *   1.38 kaupungit.asukkaat (Linssiseppä, radiouudistus): Wikidata P1082 (CC0),
 *        asukkaatVuosi, asukkaatAlue (luku koskee saarta/valtiota), asukkaatLahde
 *        (tools/vienti/hae-asukkaat.mjs → kaupunkien-asukkaat.json).
 *   1.39 karttavalot.ankkuri (webin lukittu ankkuri, js/packs/nostoankkurit-<iso>.js) ja
 *        karttavalot.puoli (nimiön poltettu kylki) — Natiivi-UI, löydös 50 C.
 *   1.40 monumentit.nimio (kartan nimiö, kun nimi ei mahdu 18 merkkiin; web: kohteenKarttanimi =
 *        nimio ?? nimi) — Sisältökirjurin nimiöt #3162, löydös b13 iPad 3. Karttavalojen nimio
 *        oli jo kentässä, vain arvot lyhenivät.
 *   1.41 offline.json: rasteripohja sarjaan 2026-09-25 (Z0–Z9), maittain z6–z8 kuten ennen ja
 *        z9 vain kaupunkien ympärillä listana välejä (lahteet.rasteri.kaupunkitaso: säde 60 km,
 *        kaupungit tyyppi 'kaupunki', sama rajaus kuin satelliittipinnalla) — Natiiviseppä, build 13.
 *   1.42 maakuntarajat kaikista webin maakuntamaista (138, oli 8; webin maakuntienMaa) ja juuren maat [{ iso3, nimi }];
 *        nimet webin maakunnanNimi-funktiolla — Fable 25.9.2026, Karttasepän löydökset 105/107.
 *   1.43 maakuntarajat.vari (0–4): webin väri ämpärin <ISO>.json-aineistosta (tools/tee-maakuntavektorit.mjs
 *        varita, naapureilla eri) — Natiiviseppä 25.9.2026, sama sävy kuin webissä.
 *   1.44 karttavalot.laji = webin symLaji (kohteen tyyppi: vuori, saari, jarvi, meri, joki, ruoka,
 *        tekniikka…; eläintäky elain): kuvamerkki ja vektorisymboli lajin mukaan — Pelikoodari, löydös 125.
 *   1.45 Elävä kartta (omistaja 26.9.2026, tools/vienti/elava-kartta.mjs): karttavalot.kokoluokka (+ kokoluokkaLahde),
 *        karttavalot.maakunta (+ maakuntaLahde) ja maakuntarajat.salaisuus. Vain natiivi.
 *   1.46 kokoelma reitit1873: vuoden 1873 laivalinjat ja rautatiet (Karttaseppä #3266, tools/vienti/reitit1873.mjs),
 *        juuressa lahteet. Elävä kartta, vain natiivi.
 *   1.47 kokoelma maakuntasalaisuudet: maakunnan salaisuus-nosto (lyhyt, teksti, nappi, viite, lat/lon) — Pelikoodari
 *        26.9.2026; oma kokoelma, koska build 16/17 piirtäisi karttavalorivit (Natiiviseppä). Elävä kartta.
 */
export const SKEEMAVERSIO_TARKKA = '1.47';

const sha = (s) => createHash('sha256').update(s).digest('hex');

/*
 * Kehittäjämoduulit (työhuone) ovat julkisia webissäkin, mutta paketti
 * jaetaan sovelluksen mukana: henkilöiden sähköpostit peitetään.
 * Pelin omat osoitteet (@matkakirja.app) jäävät.
 */
const SAHKOPOSTI = /[A-Za-z0-9._%+-]+@(?!matkakirja\.app\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
export const peitaSahkopostit = (teksti) => teksti.replace(SAHKOPOSTI, '[sähköposti]');
const tavuja = (s) => Buffer.byteLength(s);

/**
 * Kaikki vietävät moduulit aakkosjärjestyksessä: js/packs/*.js kokonaan
 * (exportit: null = kaikki, luokka 'pack') + lahteet.mjs:n nimetyt exportit.
 */
export function vietavatModuulit(juuri = JUURI) {
  const packit = readdirSync(join(juuri, 'js/packs'))
    .filter((f) => f.endsWith('.js'))
    .map((f) => ({ moduuli: `js/packs/${f}`, exportit: null, luokka: 'pack' }));
  return [...packit, ...LISAMODUULIT].sort((a, b) => (a.moduuli < b.moduuli ? -1 : 1));
}

function laji(v) {
  if (v === null) return 'null';
  if (typeof v === 'function') return 'funktio';
  if (Array.isArray(v)) return 'taulukko';
  if (v instanceof Map) return 'map';
  if (v instanceof Set) return 'set';
  return { object: 'olio', string: 'merkkijono', number: 'luku', boolean: 'totuusarvo' }[typeof v] ?? typeof v;
}

function lukumaara(v) {
  if (Array.isArray(v)) return v.length;
  if (v instanceof Map || v instanceof Set) return v.size;
  if (v && typeof v === 'object') return Object.keys(v).length;
  return null;
}

/**
 * Kokoaa koko viennin muistiin. Palauttaa { tiedostot: Map<polku, teksti>,
 * manifest }. Kirjoittaminen levylle on erillään, jotta testi voi ajaa
 * tämän ilman sivuvaikutuksia.
 */
export async function kokoaVienti({ juuri = JUURI } = {}) {
  const tiedostot = new Map();
  const mediat = new Map(); // arvo -> { laji, esiintymat[] }
  const nimiavaruudet = new Map();
  const manifestModuulit = [];

  for (const { moduuli: polku, exportit: valitut, luokka } of vietavatModuulit(juuri)) {
    const lahde = readFileSync(join(juuri, polku), 'utf8');
    const ns = await import(pathToFileURL(join(juuri, polku)).href);
    nimiavaruudet.set(polku, ns);
    if (PAKETISTA_POISTETUT.has(polku)) continue;
    const exportit = {};
    const kuvaus = [];
    for (const nimi of valitut ?? Object.keys(ns)) {
      if (!(nimi in ns)) throw new Error(`${polku}: exporttia ${nimi} ei ole (tools/vienti/lahteet.mjs)`);
      let viitteita = 0;
      let funktioita = 0;
      const puu = sarjallista(ns[nimi], {
        kaynti(teksti, kohta) {
          const ml = mediaLaji(teksti, kohta, polku);
          if (!ml) return;
          viitteita++;
          if (!mediat.has(teksti)) mediat.set(teksti, { laji: ml, esiintymat: [] });
          else if (TARKKUUS(ml) < TARKKUUS(mediat.get(teksti).laji)) mediat.get(teksti).laji = ml;
          mediat.get(teksti).esiintymat.push({ moduuli: polku, export: nimi, polku: kohta });
        },
      });
      const teksti = JSON.stringify(puu);
      funktioita = (teksti.match(/\{"\$funktio":/g) || []).length;
      exportit[nimi] = puu;
      kuvaus.push({
        nimi,
        laji: laji(ns[nimi]),
        lkm: lukumaara(ns[nimi]),
        funktioita,
        mediaviitteita: viitteita,
      });
    }
    const tiedosto = `moduulit/${polku.replace(/\.js$/, '.json')}`;
    const raaka = JSON.stringify({ $skeema: `${SKEEMAVERSIO}/moduuli`, moduuli: polku, exportit });
    const sisalto = luokka === 'kehittaja' ? peitaSahkopostit(raaka) : raaka;
    tiedostot.set(tiedosto, sisalto + '\n');
    manifestModuulit.push({
      moduuli: polku,
      luokka,
      kaikkiExportit: valitut === null,
      tiedosto,
      lahdeSha256: sha(lahde),
      sha256: sha(sisalto + '\n'),
      tavuja: Buffer.byteLength(sisalto) + 1,
      exportit: kuvaus,
    });
  }

  // Skeema 1.13: leveys ja korkeus px ensisijaisesta tiedostosta
  // (tools/vienti/kuvamitat.mjs), jos mitattu.
  const kuvamitat = lueKuvamitat();
  const mediaLista = [...mediat.keys()].sort().map((arvo) => ({
    arvo,
    laji: mediat.get(arvo).laji,
    ...ratkaiseMedia(arvo, mediat.get(arvo).laji),
    ...(kuvamitat[arvo] ? { leveys: kuvamitat[arvo][0], korkeus: kuvamitat[arvo][1] } : {}),
    esiintymat: mediat.get(arvo).esiintymat,
  }));
  const mediaTeksti = JSON.stringify({ $skeema: `${SKEEMAVERSIO}/media`, viitteet: mediaLista }) + '\n';
  tiedostot.set('media.json', mediaTeksti);

  const kokoelmat = kokoaKokoelmat(nimiavaruudet, { media: mediaLista });
  const kokoelmaKuvaus = [];
  for (const [nimi, k] of Object.entries(kokoelmat)) {
    const teksti = JSON.stringify({ $skeema: `${SKEEMAVERSIO}/kokoelma`, nimi, ...k }) + '\n';
    const tiedosto = `kokoelmat/${nimi}.json`;
    tiedostot.set(tiedosto, teksti);
    kokoelmaKuvaus.push({ nimi, tiedosto, lahde: k.lahde, lkm: k.alkiot.length, sha256: sha(teksti), tavuja: tavuja(teksti) });
  }

  const lisatiedostot = LISATIEDOSTOT.map((polku) => {
    const teksti = readFileSync(join(juuri, polku), 'utf8');
    JSON.parse(teksti); // vain kelvollinen JSON kelpaa sellaisenaan
    tiedostot.set(`tiedostot/${polku}`, teksti);
    return { lahde: polku, tiedosto: `tiedostot/${polku}`, sha256: sha(teksti), tavuja: tavuja(teksti) };
  });

  const webNakymat = kokoaWebNakymat(juuri).map(({ nimi, tiedosto, sisalto }) => {
    const teksti = JSON.stringify(sisalto) + '\n';
    tiedostot.set(tiedosto, teksti);
    return { nimi, tiedosto, sha256: sha(teksti), tavuja: tavuja(teksti) };
  });

  // Offline-manifesti (skeema 1.9): maittain ladattavat laatat, maasto ja
  // media arvioituine tavuineen (tools/vienti/offline.mjs).
  const offline = kokoaOffline({
    tiedostot,
    manifest: { media: { tiedosto: 'media.json' }, kokoelmat: kokoelmaKuvaus },
    countryShapes: nimiavaruudet.get('js/packs/maailmankartta.js').MAAILMANKARTTA.map.countryShapes,
    // Skeema 1.23: maanosaryhmät (offline.json ryhmat).
    kartta: (({ cities, map }) => ({ countryShapes: map.countryShapes, cities, cityCountry: map.cityCountry,
      cityManner: map.cityManner }))(nimiavaruudet.get('js/packs/maailmankartta.js').MAAILMANKARTTA),
    mannerNimet: nimiavaruudet.get('js/game.js').MANNER_NIMET,
  });
  const offlineTeksti = JSON.stringify(offline) + '\n';
  tiedostot.set('offline.json', offlineTeksti);
  const lisenssiTeksti = JSON.stringify(kokoaLisenssit(), null, 1) + '\n';
  tiedostot.set('lisenssit.json', lisenssiTeksti);

  const skeemat = readdirSync(join(JUURI, 'tools/vienti/skeema')).filter((f) => f.endsWith('.json')).sort();
  for (const f of skeemat) tiedostot.set(`skeema/${f}`, readFileSync(join(JUURI, 'tools/vienti/skeema', f), 'utf8'));

  const mediaLaskenta = {};
  for (const m of mediaLista) mediaLaskenta[m.laji] = (mediaLaskenta[m.laji] || 0) + 1;

  const manifest = {
    $skeema: `${SKEEMAVERSIO}/manifest`,
    skeemaversio: SKEEMAVERSIO_TARKKA,
    kuvaus: 'Matkakirjan sisältö moottorineutraalissa muodossa. Ks. docs/raportit/sisallon-siirtoputki-20260923.md.',
    mediaJuuri: 'https://media.matkakirja.app/',
    laskennat: {
      moduuleja: manifestModuulit.length,
      exportteja: manifestModuulit.reduce((a, m) => a + m.exportit.length, 0),
      funktioita: manifestModuulit.reduce((a, m) => a + m.exportit.reduce((b, e) => b + e.funktioita, 0), 0),
      mediaviitteita: mediaLista.length,
      mediaEsiintymia: mediaLista.reduce((a, m) => a + m.esiintymat.length, 0),
      mediaLajeittain: mediaLaskenta,
      kokoelmia: kokoelmaKuvaus.length,
    },
    lisatiedostot,
    skeemat: skeemat.map((f) => `skeema/${f}`),
    media: { tiedosto: 'media.json', sha256: sha(mediaTeksti), tavuja: tavuja(mediaTeksti) },
    kokoelmat: kokoelmaKuvaus,
    webNakymat,
    offline: { tiedosto: 'offline.json', sha256: sha(offlineTeksti), tavuja: tavuja(offlineTeksti) },
    lisenssit: { tiedosto: 'lisenssit.json', sha256: sha(lisenssiTeksti), tavuja: tavuja(lisenssiTeksti) },
    logiikka: logiikkaLista(),
    moduulit: manifestModuulit,
  };
  tiedostot.set('manifest.json', JSON.stringify(manifest, null, 1) + '\n');
  return { tiedostot, manifest, nimiavaruudet };
}

/** Paketin viittaamat ämpärin assets/-tiedostot: { polku: sha256 }. */
export function sivustonAssetit(tiedostot) {
  const polut = new Set();
  const malli = new RegExp(`${SIVUSTON_ASSET_ETULIITE.replaceAll('.', '[.]')}([^"?\\s]+)[?]v=`, 'g');
  for (const teksti of tiedostot.values()) {
    for (const [, polku] of teksti.matchAll(malli)) polut.add(`assets/${polku}`);
  }
  return Object.fromEntries([...polut].sort().map((p) => [p, sivustonTiiviste(p)]));
}

export function kirjoita(tiedostot, ulos) {
  rmSync(ulos, { recursive: true, force: true });
  for (const [polku, teksti] of tiedostot) {
    const kohde = join(ulos, polku);
    mkdirSync(dirname(kohde), { recursive: true });
    writeFileSync(kohde, teksti);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--ulos');
  const ulos = resolve(i > 0 ? process.argv[i + 1] : join(JUURI, 'dist/vienti'));
  const { tiedostot, manifest } = await kokoaVienti();
  kirjoita(tiedostot, ulos);
  // Ämpäriin vietävät sivuston assetit paketin ulkopuolelle (CI:n syöte).
  const assetit = sivustonAssetit(tiedostot);
  writeFileSync(join(dirname(ulos), 'sivusto-assetit.json'), `${JSON.stringify(assetit, null, 1)}\n`);
  const l = manifest.laskennat;
  const tavut = [...tiedostot.values()].reduce((a, t) => a + Buffer.byteLength(t), 0);
  console.log(`vienti → ${relative(process.cwd(), ulos) || '.'}: ${tiedostot.size} tiedostoa, ${(tavut / 1e6).toFixed(1)} Mt`);
  console.log(`  ${l.moduuleja} moduulia, ${l.exportteja} exporttia, ${l.funktioita} funktiota (logiikkaa, ei dataa)`);
  console.log(`  ${l.mediaviitteita} mediaviitettä (${l.mediaEsiintymia} esiintymää): ${JSON.stringify(l.mediaLajeittain)}`);
  console.log(`  kokoelmat: ${manifest.kokoelmat.map((k) => `${k.nimi} ${k.lkm}`).join(', ')}`);
}
