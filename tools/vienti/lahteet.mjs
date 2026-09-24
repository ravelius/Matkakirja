/*
 * VIENNIN LÄHTEET js/packs/-kansion ULKOPUOLELTA (inventaario 23.9.2026,
 * docs/raportit/sisallon-siirtoputki-20260923.md).
 *
 * js/packs/*.js viedään aina kokonaan: vie-sisalto.mjs listaa kansion,
 * joten uusi pack tulee mukaan ilman muutosta tähän.
 *
 * Muualta viedään vain NIMETYT exportit: niissä moduuleissa sisältö asuu
 * piirto- ja pelikoodin vieressä, ja koko nimiavaruus toisi mukaan satoja
 * funktioita. Jokainen rivi on inventaariossa todettu sisältödataksi, ja
 * kaikki latautuvat Nodessa samassa prosessissa ilman selainta.
 *
 * luokka:
 *   peli      pelin sisältöä tai sääntödataa
 *   linssi    linssien sisältö; LINSSI-olioissa on myös funktioita, jotka
 *             kulkevat { $funktio }-merkintöinä
 *   johdettu  ajon aikana packeista koottu näkymä (toistoa, mutta valmiina
 *             hakemistona tuojalle helpompi)
 *   kehittaja työhuoneen data; KAARI_PAKETIT on silti tarinakaaren
 *             kaanoninen lähde (69 kohdetta, TARINAKAARI suodattaa 42)
 *
 * Sisältö, joka asuu moduulin SISÄISESSÄ muuttujassa (ei exporttia), ei
 * näy tälle työkalulle — raportin "ei mekaaniset" -lista.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { FOKUSVIRRAT } from '../../js/packs/fokusvirrat.js';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

function voimassaOlevatAikaleimat() {
  // Voimassa = kohdistettu täsmälleen nykyiseen matkakirjatekstiin (sama
  // ehto kuin js/luentareaktiot.js tarkistaAikaleimat).
  const kansio = join(JUURI, 'assets/aikaleimat');
  const tekstit = new Map(Object.values(FOKUSVIRRAT).filter((v) => v?.matkakirja?.aanite)
    .map((v) => [v.matkakirja.aanite.split('/').at(-1).replace(/\.mp3$/, '.aikaleimat.json'), v.matkakirja.teksti]));
  return readdirSync(kansio).filter((f) => f.endsWith('.json')).sort().filter((f) => {
    const d = JSON.parse(readFileSync(join(kansio, f), 'utf8'));
    const teksti = tekstit.get(f);
    return d.versio === 2 && teksti && d.teksti === teksti
      && d.tekstiSha256 === createHash('sha256').update(teksti).digest('hex');
  }).map((f) => `assets/aikaleimat/${f}`);
}
const m = (moduuli, exportit, luokka = 'peli') => ({ moduuli, exportit, luokka });

/*
 * PAKETISTA POISTETUT (skeema 1.14, Fablen tarkastus 23.9.2026 A11 ja C5):
 * vanhat mannerlaudat eivät kuulu natiiviin (yksi lauta), eikä yksikään
 * proto-haara lue niitä. Vienti lataa ne yhä muistiin, koska kokoelma
 * tapahtumat tulee js/packs/africa.js:stä, mutta niitä ei kirjoiteta
 * pakettiin eikä niiden mediaviitteitä kerätä. Botti (js/ai.js) ja
 * kaksintaistelu on poistettu natiivista kokonaan.
 */
const MANNERLAUDAT = ['africa', 'asia', 'europe', 'istanbul', 'maailma', 'middleeast', 'northamerica', 'oceania',
  'southamerica', 'suomi'];
export const PAKETISTA_POISTETUT = new Set(MANNERLAUDAT.flatMap((l) => [`js/packs/${l}.js`, `js/packs/${l}-questions.js`]));
export const POISTETUT_SAANNOT = new Set(['DUEL_PRIZE', 'BOT_SKILL']);

export const LISAMODUULIT = [
  m('js/kohtaamiskuvat-data.js', ['kohtaamiskuvat', 'KOHTAAMIS_R2_JUURI']),
  m('js/isoisan-valokuvat.js', ['ISOISAN_VALOKUVAT', 'ISOISAN_KUVAJUURI']),
  m('js/tietajatasot.js', ['TIETAJATASOT']),
  m('js/etusivupallo.js', ['ETUSIVUN_KUVAKIERTO', 'ETUSIVUN_REITTI']),
  m('js/livia.js', ['LIVIAN_AVAUS']),
  // Natiivi-UI 23.9.2026: avausteksti, paikkarivi, aloitusnappi ja
  // periaatelappu (js/ui.js tuo samat vakiot).
  m('js/ui-tekstit.js', ['INTRO_TEXT', 'INTRO_PAIKKA', 'INTRO_VALINTA', 'PERIAATTEET']),
  // Natiivi-UI 23.9.2026: pullan nimet maittain (js/fokustehtavat.js pullanNimi)
  // ja lehtitehtävien palkkio; hinta on saannoissa (game.js PULLA_HINTA).
  m('js/fokustehtavat.js', ['PULLA_NIMET', 'PULLA_YLEISNIMI', 'FOKUS_TEHTAVA_PALKKIO', 'FOKUS_LEHTITEHTAVAT']),
  m('js/pollo.js', ['LIVIAN_MIETINNAT', 'POLLO_AARRE']),
  // Skeema 1.15 (lehdet natiiville): lehden kiinteät tekstit ja luvut.
  // LEHDEN_VAKIOESITTELY = etusivun esittely, kun kaupungilla ei ole omaa;
  // LEIPAN_ALOITUS_SANOJA = leipätekstin lihavoitu aloitus (sanaa);
  // MINITEHTAVA_PALKKIO = aihesivun minitehtävän palkkio (myös
  // kaupunkilehdet.aiheet[].tehtava.palkkio); säärivin koodit, kuvakkeet,
  // kuukaudet ja Open-Meteon osoite (kokoelma saatiedot).
  m('js/lehti.js', ['LEHDEN_VAKIOESITTELY']),
  m('js/ui-apurit.js', ['LEIPAN_ALOITUS_SANOJA']),
  m('js/ui.js', ['MINITEHTAVA_PALKKIO', 'AARRE_MUSIIKKI', 'JALKAMATKAN_MAISEMA']),
  m('js/saa.js', ['SAAKOODIT', 'SAA_IKONIT', 'KUUKAUDET_SSA', 'ENNUSTE_OSOITE']),
  m('js/game.js', ['ASKERS', 'MANNER_NIMET', 'FORM_WEIGHTS']),
  m('js/tokens.js', ['TOKEN_TYPES', 'PIENI_AARRE_ARVO', 'ISO_AARRE_ARVO']),
  // Matkustuksen hinnat (laiva, lento, bussi); skeema 1.4 kokoaa ne ja
  // game.js:n vakiot kokoelmaan saannot (tools/vienti/kokoelmat.mjs).
  m('js/rules.js', ['SEA_FEE', 'FLIGHT_PRICE', 'BUS_FARE']),
  m('js/sisaltotaulut.js', ['SAAPUMISLUENNAT', 'HAVAINTOLUENNAT', 'LAUTA_TUNNUSLUVUT', 'EI_VALOKUVAKYSYMYKSEEN', 'KAIKKI_VALOKUVAT', 'MAATIEDOT']),
  m('js/livia-tilanteet.js', ['LIVIAN_TUNTEET', 'LIVIAN_PUHEMERKITYKSET']),
  m('js/livia-pilotti-cuet.js', ['LIVIAN_LUENTA_CUET', 'LIVIAN_LUENTAKAUPUNGIT', 'ERA5_ODOTTAVAT_KAUPUNGIT']),
  m('js/liviapuhe.js', ['LIVIAN_AANIJUURI', 'LIVIAN_AANILAHTEET', 'LIVIAN_KAUPUNKILAHTEET', 'LIVIAN_AANITETYT',
    'LIVIAN_AANIERAT', 'LIVIAN_KESTOT', 'LIVIAN_VERSIOIDUT_AANET', 'LIVIAN_AANITETTY_PALJASTUS']),
  m('js/media.js', ['AANI_JUURI', 'ASSET_KANSIOT', 'R2_ASSETIT', 'HORATIO_TUOTANTO', 'VERSIOIDUT_HORATIO_AANET', 'UUSITUT_AANET', 'MUSIIKIN_PAATE']),
  m('js/fokusnosto-symbolit.js', ['NOSTOSYM_LUOKAT', 'NOSTOSYM_PAAKATEGORIAT', 'NOSTOSYM_TYYPIT', 'NOSTOSYM_PISTE_VARIT']),
  m('js/karttaselite.js', ['KARTTASELITE_JARJESTYS', 'KARTTASELITE_KOKONIMET']),
  m('js/kaupunkimusiikki.js', ['ALUERAIDAT', 'ALUEEN_MAAT']),
  // Skeema 1.8: äänitaulut natiiville (kokoelma aanitaulut).
  m('js/sound.js', ['REAL_SAMPLES', 'PULUN_TEHOSTEET', 'PULUN_TEHOSTEJUURI', 'AMBIENCE_TYPES', 'AANITEHOSTEET']),
  m('js/siirtymamusiikki.js', ['RAIDAT', 'SIIRTYMALAJIT']),
  m('js/musiikkivalitsin.js', ['TILARAIDAT', 'PAIKKARAIDAT', 'POHJARAITA']),
  // B7: äänimaiseman vakiopaikat (kori[0] ilman arvontaa).
  m('js/ambience-stream.js', ['VAKIOPAIKAT']),
  m('js/aani-ehdokkaat.js', ['EHDOKKAAT', 'TYYPPI_EHDOKKAAT', 'KAUPUNKI_EHDOKKAAT', 'TYYPPI_NIMET', 'KAUPUNGIT_TYYPEITTAIN', 'HUUDAHDUKSET']),
  m('js/viitekuva-herot.js', ['VIITEKUVA_HEROT']),
  m('js/lahteet.js', ['LAHTEET', 'PELI']),
  m('js/karttatyokalu-maakunnat.js', ['MAAKUNTIEN_NIMET', 'MAAKUNTIEN_MAAT']),
  m('js/tyohuone-musiikki.js', ['MUSIIKKISIVUN_RAIDAT', 'SFX_NIMET']),
  m('js/fokuskohteet.js', ['KOHDE_MAAT'], 'johdettu'),
  m('js/linssit/astronaut-kysymykset.js', ['ASTRONAUTIN_KYSYMYKSET'], 'linssi'),
  m('js/linssit/ihmisen-matka-data.js', ['IHMISEN_MATKA', 'IHMISEN_MATKA_LISANOSTOT', 'IHMISEN_MATKA_KYSYMYKSET',
    // Natiivi-UI 23.9.2026: aloituskortin ja kaistan tekstit.
    'IHMISEN_MATKA_ESITTELY', 'IHMISEN_MATKA_ALOITUS', 'IHMISEN_MATKA_KAISTASELITE', 'IHMISEN_MATKA_LOPPU'], 'linssi'),
  m('js/linssit/ihmisen-matka-kertomus.js', ['IHMISEN_MATKA_KERTOMUS'], 'linssi'),
  m('js/linssit/ihmisen-matka-kysymykset.js', ['IHMISEN_MATKAN_KYSYMYKSET'], 'linssi'),
  m('js/linssit/ihmisen-matka-virrat.js', ['IHMISEN_MATKA_VIRRAT', 'IHMISEN_MATKA_RETKI', 'IHMISEN_MATKA_VANHA', 'IHMISEN_MATKA_VANAT'], 'linssi'),
  m('js/linssit/ihmisen-matka.js', ['LINSSI', 'ESITYKSEN_KUVAT', 'ALOITUKSEN_TAUSTAKUVAT'], 'linssi'),
  m('js/linssit/keksinnot.js', ['KEKSINNOT', 'LINSSI'], 'linssi'),
  m('js/linssit/satelliitti-data.js', ['SATELLIITTI_KOHTEET', 'SATELLIITTI_LAHDE'], 'linssi'),
  m('js/linssit/satelliitti.js', ['LINSSI'], 'linssi'),
  m('js/linssit/pallo.js', ['LINSSI'], 'linssi'),
  m('js/linssit/radio.js', ['LINSSI'], 'linssi'),
  m('js/linssit/topografia.js', ['LINSSI'], 'linssi'),
  m('js/linssit/vertailu.js', ['LINSSI'], 'linssi'),
  m('js/linssit/maatiedot.js', ['LINSSI'], 'linssi'),
  m('js/linssit/vesistot.js', ['LINSSI'], 'linssi'),
  // Skeema 1.7 (Linssisepän tarve 23.9.2026): ihmisen matkan maskit,
  // äänimaisemien ja kertomuksen manifestien juuret, astronautin kameran
  // pilvet ja äänet, linssien omistussäännöt. Kokoelma linssiaineisto
  // kokoaa ne (tools/vienti/kokoelmat.mjs).
  m('js/linssit/ihmisen-matka-maamaski.js', ['MAAMASKI'], 'linssi'),
  m('js/linssit/ihmisen-matka-rantamaski.js', ['RANTAMASKI'], 'linssi'),
  m('js/linssit/ihmisen-matka-aanimaisema.js', ['MAISEMAJUURI'], 'linssi'),
  m('js/linssit/ihmisen-matka-luenta.js', ['KERTOMUS_MANIFESTI'], 'linssi'),
  m('js/linssit/astro-sumu.js', ['PILVIEN_LAHDE', 'PILVIEN_OSOITE', 'PILVIEN_LEVEYS', 'PILVIEN_KORKEUS'], 'linssi'),
  m('js/linssit/satelliitti-aani.js', ['ASTRONAUTIN_HUMINA', 'ASTRONAUTIN_MUSIIKKI', 'ASTRONAUTIN_MUSIIKKI_KAYTOSSA'], 'linssi'),
  m('js/linssit/omistus.js', ['LINSSIKYNNYKSET', 'OPTIKON_HYVITYS', 'PERUSLINSSIT'], 'linssi'),
  m('js/tyohuone-kehitys-data.js', ['KAARI_PAKETIT'], 'kehittaja'),
];

/** Valmiit JSON-aineistot, jotka kopioidaan vientiin sellaisenaan. */
export const LISATIEDOSTOT = [
  'assets/data/maakayrat.json',
  'assets/data/maapolygonit.json',
  // Matkakirjaluentojen sanatason aikaleimat (luentareaktiot) vain, kun
  // ne on kohdistettu nykyiseen luentatekstiin: 23.9.2026 kaikki 45
  // repon kopiota ovat vanhentuneita (teksti uusittu 14.9.), joten
  // mukaan ei tule yhtään. Ks. kokoelmat.mjs luentoKokoelma.
  ...voimassaOlevatAikaleimat(),
];
