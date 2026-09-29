/*
 * Etsii jokaiselle maalle suoran radiolähetyksen, jossa puhutaan maan
 * kieltä.
 *
 *   node tools/hae-radiot.mjs            # kaikki maat
 *   node tools/hae-radiot.mjs FIN TUR    # vain nämä
 *
 * Omistajan havainto: "Kuuntele kieltä toimii mutta sisältö on heikko,
 * koska suurimmassa osassa pätkiä puhetta kuuluu aika vähän." Aporeen
 * äänimaisemat on tallennettu maisemaksi, ei puheeksi — torinäytteessä
 * kuuluu enimmäkseen askelia ja liikennettä. Suora puheradio on
 * päinvastainen: siinä puhutaan koko ajan, eikä se toistu koskaan
 * samanlaisena.
 *
 * Järjestys on omistajan antama: ensin maan virallinen ykkösradio, sen
 * puuttuessa mikä tahansa saman maan asema, ja vasta viimeisenä vanha
 * kolmen minuutin tallenne. Tallennetta ei poisteta — se jää
 * varareitiksi siihen päivään, kun lähetysosoite lakkaa toimimasta.
 *
 * Lähde on Radio Browser, vapaa yhteisöhakemisto ilman avainta.
 *
 * KOLME EHTOA, JOISTA EI JOUSTETA:
 *
 *  1. https. Peli tarjoillaan salattuna, ja selain estää salaamattoman
 *     äänivirran kokonaan. Osa asemista vastaa kumpaankin, joten
 *     http-osoite yritetään ensin päivittää — mutta vain jos se
 *     oikeasti vastaa.
 *  2. Ei HLS:ää. <audio> soittaa .m3u8-virtaa vain Safarissa. Peliä
 *     pelataan myös Chromella, ja hiljainen nappi on pahempi kuin
 *     huonompi asema.
 *  3. Osoite tarkistetaan hakemalla. Hakemiston "toimii"-merkintä on
 *     voinut vanhentua kuukausia sitten; ainoa luotettava tieto on
 *     ääntä sisältävä vastaus juuri nyt.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * Noden oma fetch ei lue HTTPS_PROXY-ympäristömuuttujaa, vaan ottaa
 * yhteyden suoraan — ja suora yhteys torjutaan tässä ympäristössä
 * vastauksella "Blocked by egress policy". Se näyttää aivan samalta
 * kuin aseman oma esto, ja työkalu hylkäisi hyvät asemat vääränä
 * tietona. Sama pyyntö curlilla onnistui, ja ero oli juuri välipalvelin.
 *
 * Muuttuja luetaan prosessin käynnistyessä, joten se on asetettava
 * ennen kuin tämä tiedosto suoritetaan. Siksi työkalu käynnistää
 * itsensä kerran uudestaan sen kanssa.
 */
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const nuku = (ms) => new Promise((r) => { setTimeout(r, ms); });

/* Hakemisto puhuu kaksikirjaimista koodia, peli kolmikirjaimista. */
const ISO2 = {
  ARG: 'AR', AUS: 'AU', BOL: 'BO', BRA: 'BR', CAN: 'CA', CHL: 'CL', COL: 'CO',
  CUB: 'CU', ECU: 'EC', FJI: 'FJ', GRL: 'GL', GTM: 'GT', MEX: 'MX', NIC: 'NI',
  NZL: 'NZ', PAN: 'PA', PER: 'PE', PNG: 'PG', SLB: 'SB', TLS: 'TL', USA: 'US',
  VEN: 'VE', VUT: 'VU',
  AFG: 'AF', AGO: 'AO', ARE: 'AE', AUT: 'AT', BGR: 'BG', BIH: 'BA', CHE: 'CH',
  CHN: 'CN', CMR: 'CM', COD: 'CD', CYP: 'CY', CZE: 'CZ', DEU: 'DE', DNK: 'DK',
  DZA: 'DZ', EGY: 'EG', ESP: 'ES', EST: 'EE', ETH: 'ET', FIN: 'FI', FRA: 'FR',
  GBR: 'GB', GHA: 'GH', GRC: 'GR', HKG: 'HK', HRV: 'HR', HUN: 'HU', IDN: 'ID',
  IND: 'IN', IRL: 'IE', IRN: 'IR', IRQ: 'IQ', ISL: 'IS', ITA: 'IT', JOR: 'JO',
  JPN: 'JP', KAZ: 'KZ', KEN: 'KE', KOR: 'KR', KWT: 'KW', LBR: 'LR', LBY: 'LY',
  LKA: 'LK', LTU: 'LT', LVA: 'LV', MAR: 'MA', MDG: 'MG', MLI: 'ML', MMR: 'MM',
  MNG: 'MN', MOZ: 'MZ', NAM: 'NA', NGA: 'NG', NLD: 'NL', NOR: 'NO', NPL: 'NP',
  OMN: 'OM', PAK: 'PK', PHL: 'PH', POL: 'PL', PRT: 'PT', QAT: 'QA', ROU: 'RO',
  RUS: 'RU', SAU: 'SA', SDN: 'SD', SDS: 'SS', SEN: 'SN', SGP: 'SG', SHN: 'SH',
  SLE: 'SL', SOM: 'SO', SWE: 'SE', SYR: 'SY', TCD: 'TD', THA: 'TH', TUN: 'TN',
  TUR: 'TR', TWN: 'TW', TZA: 'TZ', UGA: 'UG', UKR: 'UA', UZB: 'UZ', VNM: 'VN',
  YEM: 'YE', ZAF: 'ZA', ZWE: 'ZW',

  /*
   * Radioiden maailmanlaajennus (omistaja 28.9.2026, Linssiseppä 2):
   * loput YK:n 193 jäsentä + Vatikaani, Palestiina, Kosovo. Eurooppa-
   * rajaus (VAIN EUROOPPA) koskee vain karttaa ja sisältöä, ei linssejä.
   */
  BEN: 'BJ', BWA: 'BW', BFA: 'BF', BDI: 'BI', CPV: 'CV', CAF: 'CF', COM: 'KM',
  COG: 'CG', CIV: 'CI', DJI: 'DJ', GNQ: 'GQ', ERI: 'ER', SWZ: 'SZ', GAB: 'GA',
  GMB: 'GM', GIN: 'GN', GNB: 'GW', LSO: 'LS', MWI: 'MW', MRT: 'MR', MUS: 'MU',
  NER: 'NE', RWA: 'RW', STP: 'ST', SYC: 'SC', TGO: 'TG', ZMB: 'ZM',
  ARM: 'AM', AZE: 'AZ', BHR: 'BH', BGD: 'BD', BTN: 'BT', BRN: 'BN', KHM: 'KH',
  GEO: 'GE', ISR: 'IL', KGZ: 'KG', LAO: 'LA', LBN: 'LB', MYS: 'MY', MDV: 'MV',
  PRK: 'KP', TJK: 'TJ', TKM: 'TM', PSE: 'PS',
  ALB: 'AL', AND: 'AD', BLR: 'BY', BEL: 'BE', LIE: 'LI', LUX: 'LU', MLT: 'MT',
  MDA: 'MD', MCO: 'MC', MNE: 'ME', MKD: 'MK', SMR: 'SM', SRB: 'RS', SVK: 'SK',
  SVN: 'SI', VAT: 'VA', XKX: 'XK',
  BLZ: 'BZ', CRI: 'CR', SLV: 'SV', HND: 'HN', ATG: 'AG', BHS: 'BS', BRB: 'BB',
  DMA: 'DM', DOM: 'DO', GRD: 'GD', HTI: 'HT', JAM: 'JM', KNA: 'KN', LCA: 'LC',
  VCT: 'VC', TTO: 'TT', GUY: 'GY', PRY: 'PY', SUR: 'SR', URY: 'UY',
  KIR: 'KI', MHL: 'MH', FSM: 'FM', NRU: 'NR', PLW: 'PW', WSM: 'WS', TON: 'TO',
  TUV: 'TV',
};

/*
 * Maan ykkösradio nimen perusteella. Tämä on käsin kirjoitettua tietoa
 * eikä sitä voi päätellä hakemistosta: hakemisto ei tiedä, mikä asema
 * on maan yleisradion puhekanava. Ilman tätä listaa haku valitsee
 * äänestetyimmän aseman, ja se on lähes aina musiikkikanava.
 *
 * Nimet ovat sekä paikallisella kielellä että latinalaisin kirjaimin,
 * koska hakemistoon on kirjattu kumpaakin.
 */
const YKKOSRADIO = {
  /*
   * Amerikat ja Oseania. Latinalaisessa Amerikassa valtion kanava on
   * lähes aina "Radio Nacional", ja koska säännöt ovat maakohtaisia,
   * sama nimi kelpaa monessa maassa sekoittumatta.
   */
  ARG: /radio nacional|\bam 870\b|radio continental/i,
  AUS: /abc radio national|abc news radio|abc local|\bradio national\b/i,
  BOL: /patria nueva|radio fides|radio panamericana|radio illimani/i,
  BRA: /r[aá]dio nacional|r[aá]dio mec|\bebc\b|band ?news|cbn /i,
  CAN: /cbc radio (one|1)|ici premi[eè]re|radio-?canada/i,
  CHL: /radio cooperativa|radio bio ?b[ií]o|radio nacional de chile|radio agricultura/i,
  COL: /radio nacional de colombia|\brtvc\b|caracol radio|rcn radio|\bw radio\b/i,
  CUB: /radio rebelde|radio progreso|radio habana|radio reloj|radio taino/i,
  ECU: /radio p[uú]blica|radio quito|ecuadoradio|radio sucesos/i,
  FJI: /radio fiji|\bfbc\b|bula fm|radio pasifik/i,
  GRL: /\bknr\b|kalaallit nunaata/i,
  GTM: /\btgw\b|emisoras unidas|radio nacional|radio punto/i,
  MEX: /radio educaci[oó]n|\bimer\b|radio f[oó]rmula|radio unam|\bw radio\b/i,
  NIC: /radio nicaragua|radio corporaci[oó]n|primer[ií]sima|radio ya\b/i,
  NZL: /\brnz\b|radio new zealand|radio nz/i,
  PAN: /radio nacional|\brpc\b|radio panam[aá]|\bkw continente\b/i,
  PER: /radio nacional|\brpp\b|radio exitosa/i,
  PNG: /\bnbc\b|karai|radio kundu|national broadcasting/i,
  SLB: /\bsibc\b|solomon islands broadcasting/i,
  TLS: /radio timor|\brttl\b|radio liberdade|radio komunidade/i,
  USA: /\bnpr\b|national public radio|\bwnyc\b|\bkqed\b|\bwbur\b|\bwamu\b/i,
  VEN: /radio nacional de venezuela|\brnv\b|uni[oó]n radio|radio fe y alegr[ií]a/i,
  VUT: /radio vanuatu|\bvbtc\b/i,
  FIN: /yle radio 1|yle puhe/i,
  SWE: /sveriges radio p1|\bsr p1\b/i,
  NOR: /nrk p1|nrk alltid nyheter/i,
  DNK: /\bdr p1\b/i,
  ISL: /rás 1|ras 1|rúv|ruv/i,
  GBR: /bbc radio 4|bbc world service/i,
  IRL: /rté radio 1|rte radio 1/i,
  FRA: /france inter|franceinfo|france info|france culture/i,
  DEU: /deutschlandfunk|\bdlf\b/i,
  NLD: /npo radio 1|nporadio1/i,
  ESP: /radio nacional|\brne\b/i,
  PRT: /antena 1|\brdp\b/i,
  ITA: /rai radio 1|rai gr parlamento|radio1 rai/i,
  CHE: /rsi rete uno|srf 1|rts la premi/i,
  AUT: /ö1|oe1|orf ö1/i,
  CZE: /radiožurnál|radiozurnal|český rozhlas plus/i,
  POL: /polskie radio jedynka|polskie radio 1|polskie radio 24/i,
  HUN: /kossuth/i,
  ROU: /actualit[aă][tț]i|radio rom[aâ]nia/i,
  BGR: /хоризонт|horizont|бнр|\bbnr\b/i,
  HRV: /hrvatski radio|hrt hr 1|\bhr 1\b/i,
  BIH: /\bbhr\b|federalni radio|radio sarajevo/i,
  GRC: /πρώτο πρόγραμμα|proto programma|\bert\b/i,
  TUR: /trt radyo 1|trt haber/i,
  RUS: /радио россии|radio rossii|вести фм|vesti fm/i,
  UKR: /українське радіо|ukrainske radio|суспільне/i,
  EST: /vikerraadio/i,
  LVA: /latvijas radio 1/i,
  LTU: /lrt radijas/i,
  CYP: /ρικ|\brik\b|cybc/i,
  EGY: /راديو القاهرة|radio cairo|صوت العرب/i,
  MAR: /\bsnrt\b|radio maroc|الإذاعة الوطنية/i,
  DZA: /cha[iî]ne 1|radio alg[eé]rienne|الإذاعة الجزائرية/i,
  TUN: /radio tunis|radio nationale tunis/i,
  LBY: /libya|ليبيا/i,
  SDN: /sudan radio|إذاعة السودان/i,
  SDS: /south sudan|radio miraya/i,
  ETH: /\bebc\b|ethiopian (broadcasting|radio)|fana/i,
  KEN: /\bkbc\b|radio taifa/i,
  TZA: /tbc taifa|radio tanzania/i,
  UGA: /\bubc\b|radio uganda/i,
  NGA: /radio nigeria|\bfrcn\b|voice of nigeria/i,
  GHA: /\bgbc\b|uniiq|radio ghana/i,
  SEN: /\brts\b|radio s[eé]n[eé]gal/i,
  MLI: /\bortm\b|radio mali/i,
  CMR: /\bcrtv\b/i,
  COD: /\brtnc\b|radio okapi/i,
  AGO: /r[aá]dio nacional de angola|\brna\b/i,
  MOZ: /r[aá]dio mo[cç]ambique/i,
  ZAF: /\bsabc\b|\bsafm\b|sa fm/i,
  NAM: /\bnbc\b|namibian broadcasting/i,
  ZWE: /\bzbc\b|radio zimbabwe/i,
  MDG: /radio (nationale )?malagasy|radio madagasikara|\brnm\b/i,
  SOM: /radio muqdisho|radio mogadishu|goobjoog/i,
  LBR: /\belbc\b|liberia broadcasting/i,
  SLE: /\bslbc\b|sierra leone broadcasting/i,
  TCD: /\brnt\b|radiodiffusion nationale tchadienne/i,
  SAU: /إذاعة الرياض|saudi radio|riyadh radio/i,
  ARE: /abu dhabi|إذاعة أبوظبي|emirates radio/i,
  KWT: /إذاعة الكويت|kuwait radio/i,
  QAT: /إذاعة قطر|qatar radio/i,
  OMN: /إذاعة سلطنة عمان|oman radio/i,
  YEM: /إذاعة صنعاء|yemen radio/i,
  JOR: /إذاعة الأردن|jordan radio|hala akhbar/i,
  SYR: /إذاعة دمشق|radio damascus|sham fm/i,
  IRQ: /إذاعة الجمهورية|iraq radio|العراق/i,
  IRN: /irib|radio iran|صدا/i,
  AFG: /\brta\b|radio afghanistan|آر تی ای/i,
  PAK: /radio pakistan|\bfm 101\b/i,
  IND: /all india radio|akashvani|\bair \w/i,
  NPL: /radio nepal|रेडियो नेपाल/i,
  LKA: /\bslbc\b|sri lanka broadcasting/i,
  MMR: /myanmar radio|mrtv/i,
  THA: /thai pbs|radio thailand|วิทยุ/i,
  VNM: /\bvov\b|voice of vietnam|đài tiếng nói/i,
  CHN: /中国之声|china national radio|\bcnr\b/i,
  TWN: /中央廣播|\brti\b|警廣|中廣新聞/i,
  HKG: /\brthk\b|香港電台/i,
  JPN: /\bnhk\b/i,
  KOR: /\bkbs\b/i,
  MNG: /mongolian national|\bmnb\b|монголын радио/i,
  KAZ: /казахское радио|qazaq radio|радио классик/i,
  UZB: /o'zbekiston|uzbekiston|узбекистон/i,
  IDN: /\brri\b|radio republik indonesia/i,
  PHL: /radyo pilipinas|\bdzrh\b|\bdzbb\b/i,
  SGP: /938now|cna938|capital 95/i,
  SHN: /saint helena|\bsams\b/i,

  /*
   * Radioiden maailmanlaajennus (28.9.2026). Nimet on kirjattu sillä
   * varmuudella kuin yleistiedosta löytyy; epävarmoille maille ei ole
   * omaa riviä, ja haku valitsee silloin äänestetyimmän puheeksi
   * merkityn aseman (pisteet-funktio).
   */
  BEL: /vrt radio 1|la première|\bvrt\b/i,
  SRB: /radio beograd|радио београд/i,
  SVK: /slovensko\b|slovenský rozhlas/i,
  SVN: /radio slovenija|\bval 202\b/i,
  MKD: /\bmrt\b|радио скопје|makedonsko radio/i,
  MNE: /radio crne gore|rtcg/i,
  MDA: /radio moldova/i,
  ALB: /radio tirana/i,
  BLR: /беларускае радыё|belaruskaje radyjo|radio belarus/i,
  LUX: /\brtl\b|100,7|radio 100/i,
  MLT: /radio malta|\bpbs\b/i,
  SMR: /san marino rtv|\bsmrtv\b/i,
  AND: /radio nacional d'andorra|\brna\b/i,
  MCO: /radio monaco/i,
  VAT: /radio vaticana|vatican radio/i,
  XKX: /radio kosova|radio televizioni i kosovës|\brtk\b/i,
  ISR: /\bkan\b|reshet bet|רשת ב|כאן/i,
  LBN: /radio liban|إذاعة لبنان/i,
  MYS: /\brtm\b|radio televisyen malaysia|nasional fm/i,
  BGD: /bangladesh betar|বাংলাদেশ বেতার/i,
  BTN: /\bbbs\b|kuensel|bhutan broadcasting/i,
  BRN: /\brtb\b|radio televisyen brunei/i,
  KHM: /\brnk\b|radio national.{0,4}kampuchea/i,
  GEO: /radio 1|საზოგადოებრივი რადიო|pirveli radio/i,
  ARM: /հանրային ռադիո|hanrayin radio|public radio of armenia/i,
  AZE: /ictimai radio|azerbaijan radio/i,
  KGZ: /kyrgyz radio|кыргыз радиосу/i,
  LAO: /lao national radio|ลาว|ວິທະຍຸ/i,
  MDV: /voice of maldives|dhivehi raajjeyge adu/i,
  TJK: /tajik radio|радиои тоҷик/i,
  PSE: /palestine radio|إذاعة فلسطين|voice of palestine/i,
  BLZ: /love fm|belize broadcasting/i,
  CRI: /radio nacional|\bsinart\b/i,
  SLV: /radio nacional de el salvador/i,
  HND: /radio nacional de honduras|\bhrn\b/i,
  BHS: /\bzns\b/i,
  BRB: /cbc radio|starcom network/i,
  DMA: /\bdbs radio\b/i,
  DOM: /radio televisión dominicana|\brtvd\b/i,
  JAM: /\brjr\b|radio jamaica|\bjbc\b/i,
  TTO: /\bnbs radio\b|radio 610/i,
  GUY: /voice of guyana|\bncn\b/i,
  PRY: /radio nacional del paraguay/i,
  SUR: /\bsrs\b|stichting radio suriname/i,
  URY: /\bsodre\b|radio nacional/i,
  KIR: /radio kiribati/i,
  WSM: /\b2ap\b|radio 2ap|samoa broadcasting/i,
  TON: /radio tonga|a3z/i,
  TUV: /radio tuvalu/i,
};

/*
 * Hakusanat samalle asemalle. Maalistaus palauttaa 250 äänestetyintä
 * asemaa, ja kansallinen puhekanava ei aina mahdu joukkoon — Tšadin
 * Radio Tchad ja Angolan RNA eivät mahtuneet. Nimihaku löytää ne
 * suoraan, ja tulos rajataan jälkikäteen oikeaan maahan.
 *
 * Vain ne maat, joille maalistaus ei löytänyt virallista asemaa.
 */
const HAKUSANAT = {
  ARG: ['Radio Nacional Argentina', 'Radio Continental', 'AM 750'],
  AUS: ['ABC Radio National', 'ABC News Radio', 'ABC Sydney'],
  BOL: ['Radio Patria Nueva', 'Radio Fides', 'Radio Panamericana'],
  BRA: ['Radio Nacional Brasilia', 'Radio MEC', 'CBN Rio'],
  CAN: ['CBC Radio One', 'Ici Premiere', 'CBC Toronto'],
  CHL: ['Radio Cooperativa', 'Radio Bio Bio', 'Radio Agricultura'],
  COL: ['Radio Nacional de Colombia', 'Caracol Radio', 'RCN Radio'],
  CUB: ['Radio Rebelde', 'Radio Progreso', 'Radio Habana Cuba'],
  ECU: ['Radio Publica del Ecuador', 'Radio Quito', 'Radio Sucesos'],
  FJI: ['Radio Fiji One', 'FBC Radio', 'Bula FM'],
  GRL: ['KNR', 'Kalaallit Nunaata Radioa'],
  GTM: ['Radio TGW', 'Emisoras Unidas', 'Radio Punto'],
  MEX: ['Radio Educacion', 'IMER', 'Radio UNAM', 'Radio Formula'],
  NIC: ['Radio Nicaragua', 'Radio Corporacion', 'La Primerisima'],
  NZL: ['RNZ National', 'Radio New Zealand'],
  PAN: ['Radio Nacional Panama', 'RPC Radio', 'KW Continente'],
  PER: ['Radio Nacional del Peru', 'RPP Noticias', 'Radio Exitosa'],
  PNG: ['NBC PNG', 'Radio Kundu', 'Karai'],
  SLB: ['SIBC', 'Solomon Islands Broadcasting'],
  TLS: ['Radio Timor Leste', 'RTTL', 'Radio Liberdade Dili'],
  USA: ['WNYC', 'KQED', 'WBUR', 'NPR News'],
  VEN: ['Radio Nacional de Venezuela', 'Union Radio', 'Radio Fe y Alegria'],
  VUT: ['Radio Vanuatu', 'VBTC'],
  EGY: ['Nile FM', 'Radio Cairo', 'ERTU'],
  IND: ['Akashvani', 'All India Radio', 'AIR News'],
  AFG: ['Radio Afghanistan', 'Salam Watandar', 'Arman FM'],
  AGO: ['Radio Nacional de Angola', 'RNA Angola'],
  ARE: ['Abu Dhabi Radio', 'Emarat FM', 'Quran Dubai'],
  BIH: ['BH Radio 1', 'Radio Federacije', 'Radio Republike Srpske'],
  CMR: ['CRTV Radio', 'Radio Cameroun'],
  COD: ['Radio Okapi', 'RTNC'],
  CYP: ['CyBC', 'RIK Proto', 'Radio Proto Programma'],
  IRQ: ['Radio Iraq', 'Al Iraqiya', 'Al Mirbad'],
  ISL: ['RÚV Rás 1', 'Ras 1 Iceland'],
  JOR: ['Radio Jordan', 'Amman FM'],
  JPN: ['NHK Radio', 'NHK Daiichi', 'Radio Japan'],
  KOR: ['KBS Radio', 'KBS 1Radio', 'MBC Standard FM'],
  KWT: ['Kuwait Radio', 'Radio Kuwait'],
  LBR: ['ELBC Liberia', 'Radio Liberia', 'OK FM Liberia'],
  LBY: ['Libya Radio', 'Radio Libya'],
  LTU: ['LRT Radijas', 'LRT Klasika'],
  LVA: ['Latvijas Radio', 'LR1'],
  MMR: ['Myanmar Radio', 'MRTV'],
  MNG: ['Mongolian National Radio', 'MNB Radio'],
  MOZ: ['Radio Mocambique', 'RM Antena Nacional'],
  NAM: ['NBC National Radio', 'Namibian Broadcasting'],
  OMN: ['Oman Radio', 'Radio Sultanate of Oman'],
  PAK: ['Radio Pakistan', 'FM 101 Pakistan'],
  QAT: ['Qatar Radio', 'QBS Radio'],
  ROU: ['Radio Romania Actualitati', 'Radio Romania Cultural'],
  SDN: ['Radio Omdurman', 'Sudan Radio'],
  SDS: ['Radio Miraya', 'South Sudan Broadcasting'],
  SHN: ['Saint FM', 'SAMS Radio'],
  SLE: ['SLBC Sierra Leone', 'Radio Democracy'],
  SOM: ['Radio Muqdisho', 'Radio Mogadishu', 'Goobjoog'],
  SYR: ['Radio Damascus', 'Sham FM'],
  TCD: ['Radio Tchad', 'RNT Tchad'],
  TUN: ['Radio Tunis', 'Radio Nationale Tunisienne'],
  TZA: ['TBC Taifa', 'Radio Tanzania'],
  UKR: ['Ukrainske Radio', 'Suspilne Radio'],
  UZB: ['Uzbekiston radiosi', "O'zbekiston radiosi"],
  VNM: ['VOV1', 'VOV Giao Thong', 'Voice of Vietnam'],
  YEM: ['Radio Sanaa', 'Yemen Radio'],
  ZAF: ['SAfm', 'SABC Radio', 'RSG'],
  ZWE: ['Radio Zimbabwe', 'ZBC National FM'],
};

/* Puhetta luvassa. */
const PUHE = /\b(news|talk|speech|public radio|information|current affairs|politics|culture|spoken|debate|puhe|nachrichten|actualit|noticias|haber|أخبار|新聞|ニュース)/i;
/*
 * Pelkkää musiikkia. Lista on pitkä siksi, että hakemiston suosituin
 * asema on lähes poikkeuksetta musiikkikanava — ensimmäinen ajo valitsi
 * Intiaan "Bollywood Gaane Purane" -aseman, jossa ei puhuta lainkaan.
 * Jokainen tähän lisätty sana on yksi torjuttu väärä valinta.
 */
const MUSA = new RegExp('\\b(dance|techno|house|trance|hits|top 40|pop|rock|metal|jazz|blues'
  + '|classical|lounge|chill|edm|hiphop|hip hop|rnb|r&b|reggae|schlager|oldies|disco|retro'
  + '|bollywood|gaane|filmi|bhajan|salsa|cumbia|country|instrumental|ambient|relax|sleep'
  + '|romantic|love songs|gold|80s|90s|2000s|k-pop|anime|musik|musique|m[uú]sica|müzik)\\b', 'i');
/*
 * Uskonnollinen resitointi ei ole arkipuhetta. Se on oikeaa kieltä ja
 * kelpaa viimeisenä vaihtoehtona, mutta pelaajan on tarkoitus kuulla
 * miltä maassa puhutaan — ei laulettua klassista arabiaa.
 */
const HARTAUS = /\b(quran|qur'an|coran|قرآن|القرآن|gospel|worship|praise|rosary|kirtan)\b/i;

async function hae(osoite, yrityksia = 4) {
  for (let i = 0; i < yrityksia; i++) {
    try {
      const vastaus = await fetch(osoite, {
        headers: { 'user-agent': 'Matkakirja/1.0 (opetuspeli)' },
      });
      if (vastaus.ok) return vastaus.json();
      // 429 ja 5xx menevät ohi odottamalla; muu on pysyvä vastaus.
      if (vastaus.status !== 429 && vastaus.status < 500) {
        console.log(`  HTTP ${vastaus.status}`);
        return null;
      }
    } catch (virhe) {
      console.log(`  yhteys katkesi (${virhe?.cause?.code ?? virhe?.name ?? '?'})`);
    }
    await nuku(2000 * (i + 1));
  }
  return null;
}

/*
 * Soiko osoite oikeasti? Pyydetään virran alkua ja katsotaan, mitä
 * palvelin sanoo sisällöstä. Virta ei lopu koskaan, joten yhteys
 * katkaistaan heti kun otsikot ovat tulleet — muuten pyyntö jäisi auki
 * ikuisesti.
 *
 * Osa icecast-palvelimista ei kerro content-typeä lainkaan. Silloin
 * riittää, ettei vastaus ole HTML: soittolista tai verkkosivu ei ole
 * ääntä, mutta tuntematon binäärivirta lähes varmasti on.
 */
async function soiko(osoite) {
  const katkaisin = new AbortController();
  const ajastin = setTimeout(() => katkaisin.abort(), 9000);
  try {
    const vastaus = await fetch(osoite, {
      signal: katkaisin.signal,
      headers: { 'user-agent': 'Matkakirja/1.0 (opetuspeli)', icy_metadata: '0' },
    });
    if (!vastaus.ok) return false;
    const laji = (vastaus.headers.get('content-type') ?? '').toLowerCase();
    vastaus.body?.cancel().catch(() => {});
    if (/text\/html|application\/xml|\/json/.test(laji)) return false;
    if (/audio|ogg|mpeg|aacp?/.test(laji)) return true;
    return laji === '' || laji === 'application/octet-stream';
  } catch {
    return false;
  } finally {
    clearTimeout(ajastin);
  }
}

/** https-muoto osoitteesta, tai null jos salattua ei ole. */
async function salattu(osoite) {
  if (!osoite) return null;
  if (osoite.startsWith('https://')) return await soiko(osoite) ? osoite : null;
  if (!osoite.startsWith('http://')) return null;
  const yritys = `https://${osoite.slice(7)}`;
  return await soiko(yritys) ? yritys : null;
}

/*
 * Onko tämä maan yleisradion kanava?
 *
 * Osuman on oltava nimen alussa. Ensimmäinen versio hyväksyi osuman
 * mistä tahansa kohtaa, ja "ZamRock Radio Nigeria Relay" meni läpi
 * Nigerian yleisradiona — nimessä oli "Radio Nigeria", mutta asema
 * soittaa rockia. Yleisradion kanava alkaa lähes aina omalla
 * nimellään.
 */
function onYkkosradio(nimi, maa) {
  const alku = nimi.slice(0, 28);
  if (YKKOSRADIO[maa]?.test(alku)) return true;
  return (HAKUSANAT[maa] ?? []).some((s) => alku.toLowerCase().includes(s.toLowerCase().slice(0, 14)));
}

function pisteet(asema, maa) {
  const nimi = asema.name ?? '';
  const merkit = `${nimi} ${asema.tags ?? ''}`;
  let p = 0;
  if (onYkkosradio(nimi, maa)) p += 500;
  if (PUHE.test(merkit)) p += 60;
  if (MUSA.test(merkit)) p -= 80;
  if (HARTAUS.test(merkit)) p -= 50;
  if (asema.lastcheckok === 1) p += 30;
  if ((asema.url_resolved ?? '').startsWith('https://')) p += 25;
  // Äänet ratkaisevat vasta tasapelin: suosituin on yleensä musiikkia.
  p += Math.min(20, Math.log10(1 + (asema.votes ?? 0)) * 6);
  return p;
}

// --- ajo ----------------------------------------------------------------------

/*
 * Maat luetaan lautojen omista taulukoista eikä käsin kirjoitetusta
 * listasta: kaupunkeja lisätään pakkoihin, ja käsin ylläpidetty lista
 * jäisi jälkeen huomaamatta. Lauta "vanhamaailma" jakautui aikanaan
 * kolmeksi (maailmankartta, europe, africa), ja haku etsi sitä vielä
 * nimellä — silloin se kaatui heti alkuun.
 */
const { PACKS } = await import('../js/pack.js');
const LAUDAT = ['maailmankartta', 'europe', 'africa'];
const kaikki = [...new Set(LAUDAT.flatMap((id) => Object.values(
  PACKS.find((p) => p.id === id)?.map?.cityCountry ?? {},
)))].sort();
const pyydetyt = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const maat = pyydetyt.length ? pyydetyt : kaikki;

/* Vanha tulos pohjaksi: keskeytynyt ajo ei aloita alusta. */
const ulosPolku = join(JUURI, 'tools', 'radiot.json');
let tulos = {};
try { tulos = JSON.parse(readFileSync(ulosPolku, 'utf8')); } catch { /* ensimmäinen ajo */ }

console.log(`${maat.length} maata\n`);
for (const maa of maat) {
  const koodi = ISO2[maa];
  if (!koodi) { console.log(`${maa}: ei maakoodia`); continue; }
  const data = await hae(`https://all.api.radio-browser.info/json/stations/bycountrycodeexact/${koodi}`
    + '?hidebroken=true&order=votes&reverse=true&limit=250');

  /*
   * Nimihaku täydentää maalistan. Se palauttaa asemia kaikista maista,
   * joten tulos on rajattava maakoodilla — muuten Korean haku löytäisi
   * Pjongjangin, kuten ensimmäisellä ajolla kävi.
   */
  const nimella = [];
  for (const sana of HAKUSANAT[maa] ?? []) {
    const osumat = await hae('https://all.api.radio-browser.info/json/stations/byname/'
      + `${encodeURIComponent(sana)}?hidebroken=true&limit=40`);
    for (const a of osumat ?? []) if (a.countrycode === koodi) nimella.push(a);
    await nuku(250);
  }

  const kaikkiAsemat = [...(data ?? []), ...nimella];
  if (!kaikkiAsemat.length) { console.log(`${maa}: ei asemia hakemistossa`); continue; }

  const nahty = new Set();
  const jarjestys = kaikkiAsemat
    .filter((a) => { const k = a.stationuuid ?? a.url_resolved; if (nahty.has(k)) return false; nahty.add(k); return true; })
    .filter((a) => a.hls !== 1)
    .filter((a) => /^https?:\/\//.test(a.url_resolved ?? a.url ?? ''))
    .map((a) => ({ asema: a, p: pisteet(a, maa) }))
    .sort((x, y) => y.p - x.p)
    .slice(0, 12);

  let valittu = null;
  for (const { asema, p } of jarjestys) {
    const osoite = await salattu(asema.url_resolved || asema.url);
    if (!osoite) continue;
    valittu = {
      url: osoite,
      asema: asema.name.trim(),
      kieli: (asema.language ?? '').split(',')[0] || '',
      virallinen: onYkkosradio(asema.name ?? '', maa),
      pisteet: Math.round(p),
    };
    break;
  }

  if (valittu) {
    tulos[maa] = valittu;
    console.log(`${maa}  ${valittu.virallinen ? '★' : ' '} ${valittu.asema}`);
  } else {
    console.log(`${maa}  — ei salattua toimivaa virtaa (${jarjestys.length} yritetty)`);
  }
  writeFileSync(ulosPolku, `${JSON.stringify(tulos, null, 1)}\n`);
  await nuku(300);
}

const loytyi = maat.filter((m) => tulos[m]);
const viralliset = loytyi.filter((m) => tulos[m].virallinen);
console.log(`\n${loytyi.length}/${maat.length} maalle asema, joista ${viralliset.length} maan ykkösradio.`);
const ilman = maat.filter((m) => !tulos[m]);
if (ilman.length) console.log('ilman asemaa:', ilman.join(' '));
