/*
 * Korkeusruudukon varjostus — kuvitteellinen aurinko luoteesta.
 *
 *   import { varjosta } from './varjostus.mjs';
 *   const { varjo, tasainen } = varjosta(ruudukko);
 *
 * Komentoriviltä ajettuna sama tiedosto lataa ruudukon ja mittaa,
 * miltä eri liioittelukertoimet näyttävät lukuina:
 *
 *   NODE_USE_ENV_PROXY=1 node tools/varjostus.mjs [--liioittelu 6]
 *
 * --- miksi varjostus eikä väriskaala ---
 *
 * Omistaja näytti Wikipedian reliefikartan Magdalena-joesta ja kysyi,
 * pystyisikö topografialinssi samaan. Se mikä tekee siitä hienon EI OLE
 * VÄRISKAALA VAAN VARJOSTUS. Sama vihreä-ruskea-valkoinen asteikko
 * ilman varjoa on litteä läntti; varjon kanssa siitä tulee maastoa.
 * Väri kertoo KORKEUDEN, varjo kertoo MUODON — ja silmä lukee muodon.
 *
 * Siksi tämä on eri laskutoimitus kuin korkeusvyöhykkeet: vyöhyke
 * kysyy "kuinka korkealla tämä ruutu on", varjostus kysyy "mihin
 * suuntaan tämä ruutu viettää". Jälkimmäiseen ei riitä ruudun oma
 * korkeus vaan tarvitaan naapurien ero, ja siksi varjostus tarvitsee
 * ruudukon eikä monikulmioita (ks. tools/hae-korkeusruudukko.mjs).
 *
 * --- kaksi lopputulosta samasta laskennasta ---
 *
 * Omistajan päätös 4.8.2026: "täysväri siihen linssiin, mutta pidetään
 * seepia normaalissa pelinäkymässä, ja sitä voi hieman kehittää vielä
 * noiden mainitsemieni varjostusten ja muiden avulla."
 *
 * Tämä tiedosto laskee vain varjon. Se ei tiedä väristä mitään, ja
 * juuri siksi samat luvut kelpaavat molempiin: linssi kertoo varjolla
 * täysvärisen reliefikartan, pohjakartta samalla varjolla hyvin
 * hienovaraisen syvyyden seepiaan. Jos varjo osaisi värit, se olisi
 * pakko laskea kahdesti.
 *
 * Piirtäjää varten palautetaan myös `tasainen`: se arvo, jonka tasainen
 * maa saa. Pohjakartta ei halua varjon arvoa vaan sen POIKKEAMAN
 * tasaisesta (varjo - tasainen), jonka voi kertoa pienellä luvulla ja
 * lisätä seepian päälle vaalentavana tai tummentavana kalvona.
 */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAD = Math.PI / 180;

/*
 * Metriä yhtä leveysastetta kohti. Sama vakio kuin sisartyökaluissa
 * (hae-korkeusvyohykkeet.mjs alaKm2), jotta mittakaava on koko
 * työkalupakissa sama.
 */
const ASTE_M = 111320;

/*
 * AURINKO LUOTEESTA. Tämä on kartografian vakio, ja siihen on syy.
 *
 * Ihmisen silmä olettaa valon tulevan ylhäältä ja hieman vasemmalta —
 * niin se on koko sen ajan mitä ihminen on katsonut esineitä. Siksi
 * luoteesta valaistu pinta luetaan KOHOUMANA ja kaakosta valaistu
 * KUOPPANA, aivan riippumatta siitä kumpi on kumpi. Väärä suunta ei
 * siis tee huonompaa karttaa vaan väärän kartan: vuoret kääntyvät
 * laaksoiksi ja laaksot vuoriksi, eikä sitä huomaa muuten kuin
 * katsomalla — ilmiö on niin vahva, ettei sitä voi tahdolla kumota.
 *
 * Atsimuutti on asteina myötäpäivään pohjoisesta: 0 = pohjoinen,
 * 90 = itä, 315 = luode. Korkeuskulma on asteina horisontista — se on
 * eri asia kuin ruudukon `korkeus`, joka on rivien määrä, ja siksi
 * sillä on oma nimensä.
 */
export const AURINKO = { atsimuutti: 315, korkeuskulma: 45 };

export const OLETUKSET = {
  ...AURINKO,
  /*
   * LIIOITTELU (z-kerroin).
   *
   * Maapallon mittakaavassa todellinen jyrkkyys on olematon. Yksi
   * 0,05°:n ruutu on päiväntasaajalla 5,5 kilometriä leveä, ja Andit
   * nousevat neljä kilometriä sadassa kilometrissä — se on kahden
   * asteen rinne. Ilman liioittelua kuva on siis tasainen läntti, ja
   * se on mitattu eikä arvattu.
   *
   * Koko maailman ruudukosta (0,05°, 25,9 miljoonaa ruutua) maan
   * päällä olevien ruutujen varjo, kun tasainen maa on 0,707:
   *
   *     kerroin  hajonta   2 % .. 98 %     täysin varjossa
   *        1      0,010    0,682..0,731         0,00 %
   *        3      0,031    0,628..0,772         0,00 %
   *        6      0,059    0,540..0,822         0,01 %
   *       10      0,089    0,419..0,868         0,13 %
   *       15      0,120    0,281..0,903         0,48 %
   *       20      0,143    0,164..0,923         0,97 %
   *       30      0,177    0,000..0,944         2,11 %
   *
   * Kertoimella 1 koko maailma mahtuu viiden sadasosan sisään: se on
   * harmaa läntti eikä maasto. Kolmestakymmenestä ylöspäin taas
   * KAKSI PROSENTTIA maasta on täysin mustaa, ja täysi varjo ei ole
   * muoto vaan reikä — sama vika kuin valkoisessa Himalajassa
   * (hae-korkeusvyohykkeet.mjs).
   *
   * 10 on suurin kerroin, jolla alin sadasosa maastosta on vielä
   * selvästi irti nollasta. Sillä vuoristo erottuu tasangosta yli
   * kaksinkertaisella kirkkauserolla eikä silti leikkaudu.
   *
   * Kerroin on tarkoituksella säädettävä: linssi saa hyvin ottaa
   * enemmän kuin pohjakartta, koska linssin koko idea on näyttää
   * enemmän kuin kartta. Pohjakartta säätää voimakkuutta piirrossa
   * (varjo - tasainen kerrottuna pienellä luvulla) eikä tällä
   * kertoimella — leikkautunut varjo pysyy leikkautuneena, vaikka sen
   * piirtäisi kuinka haaleana.
   */
  liioittelu: 10,
  /*
   * MERI. Varjostus lasketaan myös merenpohjasta — mannerjalustan
   * reuna, keskiselänteet ja syvänteet ovat maailman suurimpia
   * maastonmuotoja, ja litteä meri niiden päällä olisi valhe.
   *
   * Mutta meri on TAUSTA eikä aihe, ja tässä on yllätys: merenpohja
   * on maata RYPPYISEMPI. Kertoimella 10 ja vaimennus pois kytkettynä
   * yli kilometrin syvyisen meren varjo hajoaa 0,141 ja maa vain
   * 0,089 — valtameri siis huutaisi mantereita kovempaa, ja kartta
   * menisi tukkoon juuri niin kuin omistaja on kieltänyt.
   *
   * 0,35 puristaa meren hajonnan 0,049:ään eli selvästi maan alle.
   * Merenpohja näkyy, muttei kilpaile.
   */
  meriVaimennus: 0.35,
  /*
   * Syvyys, jossa vaimennus on täysi. Nollan ja tämän välillä
   * vaimennus liukuu.
   *
   * Liu'un on pakko olla liukuma eikä kytkin. Jyrkkä raja piirtäisi
   * jokaisen rantaviivan kohdalle yhden ruudun levyisen kirkkaus-
   * portaan — hiusviivan pitkin koko maailman rannikkoa, siis
   * täsmälleen sen virheen, jota varjostuksella yritetään välttää.
   * Mannerjalustan reuna (-200 m) on luonteva paikka täydelle
   * vaimennukselle: se on sama raja, jolla linssin matalin
   * merivyöhyke kulkee.
   */
  meriSyvyys: -200,
  /*
   * NAPA-ALUEET. Leveyspiiri kutistuu navoille päin, joten itä-länsi-
   * suunnassa ruudun todellinen leveys on ruutu * cos(leveysaste).
   * 89,95 asteella se on alle viisi metriä: yhden metrin ero
   * naapuriruutuun luetaan silloin jyrkkänä rinteenä, ja Etelämanner
   * sekä Jäämeri peittyisivät säteittäiseen raidoitukseen, joka ei ole
   * maastoa vaan jakolaskun räjähdys.
   *
   * Mitattuna oikeasta ruudukosta 89,9 asteen riviltä: ilman pohjaa
   * suurin poikkeama tasaisesta on 0,21 pohjoisessa ja 0,32
   * etelässä, pohjattuna 0,014. Raidat olisivat siis vahvempia kuin
   * mikään todellinen vuoristo samalla kartalla.
   *
   * Siksi kosini pohjataan tähän leveyspiiriin: napaa lähempänä ruudut
   * lasketaan niin leveiksi kuin ne olisivat 84 asteella. Se ei ole
   * oikein mutta se on rehellisesti väärin — napojen lähellä ruudut
   * ovat joka tapauksessa sama maasto moneen kertaan mitattuna.
   */
  napaRaja: 84,
  /*
   * RUUDUKON ALIMMAN RIVIN LEVEYSASTE.
   *
   * Koko maailman ruudukossa rivi 0 on etelänapa, ja siksi oletus on
   * −90. Lisätty 16.9.2026, kun tools/tee-pallotopografia-koko.mjs
   * alkoi varjostaa maailman KAISTALEINA: 1′:n ruudukko on 467 Mt,
   * eikä sitä oteta muistiin kerralla. Kaistale on oma pieni
   * ruudukkonsa, jonka rivi 0 on jossain muualla kuin navalla —
   * ilman tätä lukua kaistaleen leveyspiirit olisivat väärät, ja
   * niistä laskettu ruudun itä-länsi-leveys (cos lat) myös. Virhe
   * ei näkyisi muuna kuin siinä, että varjostus voimistuu
   * kaistaleiden reunoilla portaittain.
   *
   * KOKO MAAILMAN AJOT EIVÄT MUUTU: oletus on sama −90 kuin ennen.
   */
  lat0: -90,
};

/**
 * Se arvo, jonka täysin tasainen maa saa. Auringon korkeuden sini:
 * 45 asteella 0,707.
 *
 * Tämä EI ole 0,5, eikä sitä kannata siirtää sinne. Varjo on valon
 * kosini pinnan normaalin kanssa, ja tasainen maa saa siitä
 * täsmälleen auringon korkeuden sinin. Piirtäjä, joka haluaa
 * nollakeskisen arvon, vähentää tämän pois.
 */
export const tasainenVarjo = (korkeuskulma = AURINKO.korkeuskulma) => Math.sin(korkeuskulma * RAD);

/**
 * Varjostaa korkeusruudukon.
 *
 * Ottaa `{ z, leveys, korkeus, ruutu }` (ks. tools/hae-korkeusruudukko.mjs)
 * ja palauttaa `{ varjo, tasainen, leveys, korkeus, ruutu }`, jossa
 * varjo on Float32Array välillä 0-1: 0 on täysi varjo, 1 on kohtisuoraan
 * aurinkoa vasten oleva rinne ja `tasainen` on tasaisen maan arvo.
 *
 * Ruudukon suuntasopimus on tämän laskennan perusta: y kasvaa
 * POHJOISEEN ja x ITÄÄN.
 */
export function varjosta(ruudukko, asetukset = {}) {
  const { z, leveys, korkeus, ruutu } = ruudukko;
  const a = { ...OLETUKSET, ...asetukset };
  if (!z || z.length !== leveys * korkeus) throw new Error('ruudukon mitat eivät täsmää');

  const varjo = new Float32Array(leveys * korkeus);
  const tasainen = tasainenVarjo(a.korkeuskulma);

  // Auringon yksikkövektori samassa koordinaatistossa kuin pinnan
  // normaali: x itään, y pohjoiseen, z ylös.
  const kork = a.korkeuskulma * RAD;
  const atsi = a.atsimuutti * RAD;
  const sx = Math.sin(atsi) * Math.cos(kork);
  const sy = Math.cos(atsi) * Math.cos(kork);
  const sz = Math.sin(kork);

  // Ruudun korkeus metreinä on vakio; leveys riippuu leveyspiiristä.
  const dyM = ruutu * ASTE_M;
  const kosiniPohja = Math.cos(a.napaRaja * RAD);

  for (let y = 0; y < korkeus; y++) {
    const lat = a.lat0 + y * ruutu;
    const dxM = ruutu * ASTE_M * Math.max(Math.abs(Math.cos(lat * RAD)), kosiniPohja);

    /*
     * Naapuririvit. Ylimmällä ja alimmalla rivillä naapuri on rivi itse:
     * pohjoisnavan pohjoispuolella ei ole maastoa, ja puolikkaasta
     * erotuksesta laskettu rinne on parempi kuin keksitty rivi.
     */
    const yP = Math.min(y + 1, korkeus - 1) * leveys; // pohjoinen
    const yK = y * leveys;
    const yE = Math.max(y - 1, 0) * leveys;           // etelä

    for (let x = 0; x < leveys; x++) {
      /*
       * Sauma. Sarakkeet 0 ja leveys-1 ovat sama meridiaani kahdesti,
       * joten sarakkeen 0 länsinaapuri on leveys-2 — ei leveys-1, joka
       * on ruutu itse. Tavallinen `(x - 1 + leveys) % leveys` osuisi
       * juuri siihen ja litistäisi itä-länsi-rinteen nollaan pitkin
       * koko päivämääränrajaa: kartan halki kulkisi pystysuora,
       * varjoton kaistale.
       */
      const xL = x === 0 ? leveys - 2 : x - 1;
      const xO = x === leveys - 1 ? 1 : x + 1;

      // Horn 1981: kolmen kertaa kolmen painotettu erotus. Kestää
      // yksittäisen ruudun kohinaa paremmin kuin pelkkä naapuriero.
      const el = z[yE + xL]; const ek = z[yE + x]; const eo = z[yE + xO];
      const kl = z[yK + xL]; const oma = z[yK + x]; const ko = z[yK + xO];
      const pl = z[yP + xL]; const pk = z[yP + x]; const po = z[yP + xO];

      const dzdx = ((eo + 2 * ko + po) - (el + 2 * kl + pl)) / (8 * dxM);
      const dzdy = ((pl + 2 * pk + po) - (el + 2 * ek + eo)) / (8 * dyM);

      // Pinnan normaali, liioittelu mukana. Pystykomponentti on 1,
      // joten pituus normalisoi loput.
      const nx = -dzdx * a.liioittelu;
      const ny = -dzdy * a.liioittelu;
      const pituus = Math.sqrt(nx * nx + ny * ny + 1);

      let v = (nx * sx + ny * sy + sz) / pituus;
      if (v < 0) v = 0; // aurinko horisontin takana: täysi varjo

      /*
       * Meren vaimennus ruudun oman syvyyden mukaan, liukuen.
       * Merenpinnan yläpuolella kerroin on 1 eikä maastoon kosketa.
       */
      if (oma < 0) {
        const osuus = Math.min(1, oma / a.meriSyvyys); // 0 rannalla, 1 syvällä
        const kerroin = 1 - osuus * (1 - a.meriVaimennus);
        v = tasainen + (v - tasainen) * kerroin;
      }

      varjo[yK + x] = v;
    }
  }

  return { varjo, tasainen, leveys, korkeus, ruutu };
}

// ------------------------------------------------------------------- ajo

/*
 * Komentorivikäyttö on mittalaite eikä osa moduulia: ruudukon haku
 * tuodaan vasta täällä, jotta varjosta() pysyy puhtaana funktiona,
 * jonka testi voi ajaa keksityllä ruudukolla ilman verkkoa.
 */
async function main() {
  const valitsin = (nimi) => {
    const i = process.argv.indexOf('--' + nimi);
    return i < 0 ? undefined : Number(process.argv[i + 1]);
  };
  const { haeKorkeusruudukko } = await import('./hae-korkeusruudukko.mjs');
  const ruutu = valitsin('ruutu');
  const g = await haeKorkeusruudukko(ruutu === undefined ? {} : { ruutu });

  const pyydetty = valitsin('liioittelu');
  const kertoimet = pyydetty === undefined ? [1, 3, 6, 10, 15, 20, 30] : [pyydetty];

  process.stderr.write(`\nruudukko ${g.leveys} x ${g.korkeus} (${g.ruutu}°), `
    + `${(g.z.length * 4 / 1024 / 1024).toFixed(1)} Mt\n`);
  process.stderr.write(`aurinko atsimuutti ${AURINKO.atsimuutti}°, korkeuskulma ${AURINKO.korkeuskulma}°, `
    + `tasainen maa = ${tasainenVarjo().toFixed(3)}\n\n`);
  process.stderr.write('kerroin  maan hajonta  2 % .. 98 %  täysin varjossa  syvän meren hajonta\n');

  for (const liioittelu of kertoimet) {
    const { varjo } = varjosta(g, { liioittelu });
    /*
     * Maa ja meri erikseen: ne ovat eri asioita, ja meren pitää jäädä
     * maan alle. Prosenttipisteet kerätään joka 37. ruudusta, koska
     * 8,8 miljoonan luvun järjestäminen ei kerro tästä yhtään
     * enempää kuin neljännesmiljoonan.
     */
    const otos = [];
    let maaN = 0; let maaS = 0; let maaS2 = 0; let mustia = 0;
    let meriN = 0; let meriS = 0; let meriS2 = 0;
    for (let i = 0; i < varjo.length; i++) {
      const v = varjo[i];
      if (g.z[i] >= 0) {
        maaN++; maaS += v; maaS2 += v * v;
        if (v <= 0.0001) mustia++;
        if (i % 37 === 0) otos.push(v);
      } else if (g.z[i] < -1000) { meriN++; meriS += v; meriS2 += v * v; }
    }
    otos.sort((a, b) => a - b);
    const hajonta = (n, s, s2) => Math.sqrt(Math.max(0, s2 / n - (s / n) ** 2));
    const piste = (q) => otos[Math.floor(otos.length * q)].toFixed(3);
    process.stderr.write(`${String(liioittelu).padStart(6)}  `
      + `${hajonta(maaN, maaS, maaS2).toFixed(3).padStart(12)}  `
      + `${piste(0.02)}..${piste(0.98)}  `
      + `${(mustia / maaN * 100).toFixed(2).padStart(13)} %  `
      + `${hajonta(meriN, meriS, meriS2).toFixed(3).padStart(19)}\n`);
  }
}

/*
 * Vain suoraan ajettaessa. Tämä on ensisijaisesti moduuli, ja testi
 * tuo sen — jos mittaus lähtisi käyntiin tuonnista, `npm test`
 * yrittäisi ladata sata megatavua ETOPO1:tä.
 */
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(e => { process.stderr.write('VIRHE: ' + (e.stack || e.message) + '\n'); process.exit(1); });
}
