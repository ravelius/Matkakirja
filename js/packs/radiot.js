/*
 * Suora radiolähetys maittain: "Kuuntele kieltä" -napin ensisijainen
 * ääni.
 *
 * Miksi radio eikä äänite: aporeen äänimaisemat on tallennettu
 * maisemaksi, ei puheeksi, ja torinäytteessä kuuluu enimmäkseen
 * askelia ja liikennettä (omistajan havainto). Suorassa puheradiossa
 * puhutaan koko ajan, eikä lähetys ole koskaan kahdesti samanlainen.
 *
 * Järjestys on omistajan antama: maan virallinen ykkösradio ensin,
 * sen puuttuessa mikä tahansa saman maan asema, ja vasta viimeisenä
 * vanha kolmen minuutin tallenne (js/packs/europe-kielet.js). Tallenne
 * jää varareitiksi: lähetysosoitteet lakkaavat toimimasta ilman
 * varoitusta, ja silloin nappi soittaa äänitteen sen sijaan että
 * vaikenisi.
 *
 * Kaikki osoitteet ovat https-muotoisia ja tarkistettu hakemalla —
 * salaamatonta virtaa selain ei soita lainkaan. Lista on tuotettu
 * komennoilla
 *   node tools/hae-radiot.mjs
 *   node tools/kirjoita-radiot.mjs
 * Radio Browserin aineistosta. Älä muokkaa käsin: aja haku uudelleen.
 *
 * 110 maata, joista 72 maan yleisradion kanava.
 *
 * Avaimena ISO-3-maatunnus, sama jota map.cityCountry käyttää.
 */
export const RADIOT = {
  AFG: { url: 'https://s5.radio.co/se6264cb34/listen', asema: 'Radio Begum (Kabul)' },
  AGO: { url: 'https://stream.zeno.fm/vyu630hfy4zuv', asema: 'Rádio Luanda (RNA)', virallinen: true },
  ARE: { url: 'https://l3.itworkscdn.net/smcradiolive/smcradiolive/icecast.audio', asema: 'Sharjah FM 94.4 (إذاعة الشارقة)', virallinen: true },
  ARG: { url: 'https://sa.mp3.icecast.magma.edge-access.net/sc_rad1', asema: 'LRA1 Radio Nacional Argentina', virallinen: true },
  AUS: { url: 'https://abc.streamguys1.com/live/rnnsw/icecast.audio', asema: 'ABC Radio National', virallinen: true },
  AUT: { url: 'https://orf-live.ors-shoutcast.at/oe1-q2a', asema: 'Ö1 | ORF | HQ', virallinen: true },
  BGR: { url: 'https://play.global.audio/testb.aac?dist=RADIOPLAY', asema: 'BNR Horizont', virallinen: true },
  BIH: { url: 'https://s2.free-shoutcast.com/stream/18170', asema: 'Federalni radio (RTVFBiH)', virallinen: true },
  BOL: { url: 'https://stream.zeno.fm/pnwpbyfambruv', asema: 'Radio Panamericana', virallinen: true },
  BRA: { url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/BANDNEWSFM_SPAAC_SC', asema: 'BandNews FM', virallinen: true },
  CAN: { url: 'https://26733.live.streamtheworld.com/CBLAFM_CBC_SC', asema: 'CBC Radio One - Toronto, ON (MP3 stream)', virallinen: true },
  CHE: { url: 'https://stream.srg-ssr.ch/m/la-1ere/mp3_128', asema: 'RTS La Première', virallinen: true },
  CHL: { url: 'https://unlimited3-cl.dps.live/biobiotemuco/aac/icecast.audio', asema: 'Radio Bio Bio Temuco', virallinen: true },
  CHN: { url: 'https://lhttp.qtfm.cn/live/15318317/64k.mp3', asema: 'CNR-1 中国之声', virallinen: true },
  CMR: { url: 'https://stream.zeno.fm/43q33pgvbphvv', asema: 'Radio Bafung' },
  COD: { url: 'https://mpbradio.ice.infomaniak.ch/topcongo3-128.mp3', asema: 'Top Congo FM 88.4 (Kinshasa)' },
  COL: { url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CARACOL_RADIOAAC.aac', asema: 'Caracol Radio - 100.9 FM / 810 AM - HJGL / HJCY -', virallinen: true },
  CUB: { url: 'https://securestreams7.autopo.st/?uri=https://icecast.teveo.cu/kHKL7tWd', asema: 'Radio Rebelde 1180 AM', virallinen: true },
  CYP: { url: 'https://r1.cloudskep.com/cybcr/cybc1/icecast.audio', asema: 'ΡΙΚ Πρώτο Πρόγραμμα (CyBC)', virallinen: true },
  CZE: { url: 'https://rozhlas.stream/radiozurnal_sport_high.aac', asema: 'ČRO Radiožurnál Sport', virallinen: true },
  DEU: { url: 'https://st01.sslstream.dlf.de/dlf/01/128/mp3/stream.mp3?aggregator=web', asema: 'Deutschlandfunk | DLF | MP3 128k', virallinen: true },
  DNK: { url: 'https://live-icy.gss.dr.dk/A/A03H.mp3', asema: 'DR P1', virallinen: true },
  DZA: { url: 'https://radiochaine1.ice.infomaniak.ch/chaine1.mp3', asema: 'Algérie Chaine 1', virallinen: true },
  ECU: { url: 'https://icecast.radiopichincha.com/radiopichincha', asema: 'Radio Pichincha' },
  EGY: { url: 'https://9090streaming.mobtada.com/9090FMEGYPT', asema: 'Radio 9090 / 90.90 FM Radio Egypt (Kairo)' },
  ESP: { url: 'https://d131.rndfnk.com/star/crtve/rne5/main/mp3/128/stream.mp3?aggregator=tunein&cid=01GEP4MW5CAHPYP1EXHVKWFJ8W&sid=2OeE42hivuba6dTGvjnMGjKByQe&token=cdczXcnimVx4AY4iamqYbTMdu3cK7oBxmS2UQN9cWc0&tvf=pdPcDBxuVxdkMTMxLnJuZGZuay5jb20', asema: 'Radio Nacional de España - Radio 5 Todo noticias', virallinen: true },
  EST: { url: 'https://icecast.err.ee/vikerraadio.mp3', asema: 'Vikerraadio', virallinen: true },
  ETH: { url: 'https://stream-25.zeno.fm/2xguamap7yzuv', asema: 'EBC Radio 104.7 Addis Abeba', virallinen: true },
  FIN: { url: 'https://icecast.live.yle.fi/radio/YleRadio1Hifi/icecast.audio', asema: 'Yle Radio 1 Hifi', virallinen: true },
  FJI: { url: 'https://icecast1.sere.plus/RFOne', asema: 'Radio Fiji One (FBC, fidžin kieli)', virallinen: true },
  FRA: { url: 'https://icecast.radiofrance.fr/franceinter-hifi.aac', asema: 'France Inter', virallinen: true },
  GBR: { url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service_east_asia', asema: 'BBC World Service', virallinen: true },
  GHA: { url: 'https://node-27.zeno.fm/ey34mac27vzuv?rj-ttl=5&rj-tok=AAABdyidjk4ACEJncwCTuO-dTg', asema: 'Info Radio Ghana', virallinen: true },
  GRC: { url: 'https://radiostreaming.ert.gr/ert-proto', asema: 'ΕΡΤ Πρώτο Πρόγραμμα', virallinen: true },
  GRL: { url: 'https://getnanoq.retro-radio.dk/Nanoq-TX-1', asema: 'Nanoq FM (Nuuk)' },
  GTM: { url: 'https://stream.zenolive.com/z96sq8tndseuv', asema: 'Emisoras Unidas 89.7', virallinen: true },
  HKG: { url: 'https://stm1.rthk.hk/radio1', asema: 'RTHK Radio 1', virallinen: true },
  HRV: { url: 'https://27863.live.streamtheworld.com/PROGRAM1AAC_SC', asema: 'HRT HR 1 - Prvi program', virallinen: true },
  HUN: { url: 'https://icast.connectmedia.hu/4736/mr1.mp3', asema: 'Kossuth', virallinen: true },
  IDN: { url: 'https://stream-node0.rri.co.id/streaming/14/9014/kbrn.mp3', asema: 'RRI Pro 3 KBRN', virallinen: true },
  IND: { url: 'https://audio-edge-fvq45.ams.d.radiomast.io/3ccc1156-fcf8-4ba7-9a0c-28e3a465e1ae?listening-from-radio-garden=1607152226837', asema: 'aakashvani', virallinen: true },
  IRL: { url: 'https://icecast.rte.ie/radio1', asema: 'RTÉ Radio 1', virallinen: true },
  IRN: { url: 'https://radio.iraninternational.app/iintl_c', asema: 'Radio Iran International', virallinen: true },
  IRQ: { url: 'https://radio.shafaq.com/radio', asema: 'Radio Shafaq (Shafaq News)' },
  ISL: { url: 'https://stream.utvarpsaga.is/Hljodver', asema: 'Útvarp Saga' },
  ITA: { url: 'https://icestreaming.rai.it/1.mp3', asema: 'Rai Radio 1', virallinen: true },
  JOR: { url: 'https://dc1.serverse.com/proxy/kjxwtpdt/stream', asema: 'Hayat FM (Amman)' },
  JPN: { url: 'https://fmsetagaya834.out.airtime.pro/fmsetagaya834_a', asema: 'エフエム世田谷 (FM Setagaya 83.4 MHz, Tokio)' },
  KAZ: { url: 'https://radio-streams.kaztrk.kz/qazradio/qazradio/icecast.audio', asema: 'Qazaq radiosy', virallinen: true },
  KEN: { url: 'https://stream.zeno.fm/ud2u96xst5quv', asema: 'KBC', virallinen: true },
  KOR: { url: 'https://wbsradio.kr/wbs-seoul', asema: 'WBS 원음방송 서울' },
  KWT: { url: 'https://listen.radioking.com/radio/280804/stream/326527', asema: 'moja (مُوجَة), Kuwait City' },
  LBR: { url: 'https://stream.zeno.fm/xxmnohwx4zyuv', asema: 'LBS Radio (Liberia Broadcasting System)', virallinen: true },
  LBY: { url: 'https://stream.zeno.fm/z9wfrdpmgg0uv', asema: 'Radio Funun Tripoli (راديو فنون طرابلس)' },
  LKA: { url: 'https://stream-32.zeno.fm/xekhrn4zetzuv?zs=KXT1gTNYSemcxyslV6-vdA', asema: 'SLBC Tamil National Service', virallinen: true },
  LTU: { url: 'https://netradio.ziniur.lt/ziniur.mp3', asema: 'Žinių radijas' },
  LVA: { url: 'https://live.radioswh.lv/plusmp3', asema: 'Radio SWH+' },
  MAR: { url: 'https://stream.zeno.fm/une3a02mb', asema: 'MA:-Hit Radio Maroc', virallinen: true },
  MDG: { url: 'https://direct.radiomadagasikara.com/listen/rnm/radio.mp3', asema: 'RNM', virallinen: true },
  MEX: { url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/W_RADIOAAC.aac', asema: 'W Radio Ciudad de México - 96.9 FM / 900 AM -', virallinen: true },
  MLI: { url: 'https://stream-157.zeno.fm/yerp85sughwtv?zs=bzqHawb1Rha3gGg97iW8xg', asema: 'Radio Malijet', virallinen: true },
  MMR: { url: 'https://listen.radioking.com/radio/681745/stream/746185', asema: 'Shwe FM (valtakunnallinen FM-verkko, Yangon)' },
  MNG: { url: 'https://c2.radioboss.fm/stream/394', asema: 'Гэр бүлийн радио 104.5 (Family Radio, Ulaanbaatar)' },
  MOZ: { url: 'https://stream.zeno.fm/tskpv4vscv8uv', asema: 'Rádio Moçambique', virallinen: true },
  NAM: { url: 'https://edge.iono.fm/xice/193_high.aac', asema: 'Omulunga Radio 100.9 (Windhoek)' },
  /*
   * KÄSIN VAIHDETUT ASEMAT (4.8.2026): NGA, NOR, NPL ja TUN on vaihdettu
   * asemiin, joiden palvelin lähettää CORS-otsakkeet — vain silloin
   * VU-mittari voi mitata lähetystä oikeasti (ks. js/linssit/radio.js
   * liitaMittariin). Jokainen osoite on koestettu: vastaa 200, antaa
   * audio/mpeg-tavuja ja Access-Control-Allow-Origin: *. NOR pysyi
   * samalla yleisradiolla (NRK); NPL ja TUN vaihtuivat maan johtavaan
   * yksityiseen puheasemaan, koska yleisradio ei lähetä CORSia — tämä
   * on tietoinen kauppa mittarin hyväksi. Jos lista generoidaan
   * uudelleen, hae-radiot.mjs:ään pitää ensin lisätä CORS-koe, tai
   * nämä neljä palautuvat CORSittomiksi.
   */
  NGA: { url: 'https://go.webgateready.com/metrofm/radio.mp3', asema: 'Metro FM 97.7 (Radio Nigeria, Lagos)', virallinen: true },
  NIC: { url: 'https://stream.zeno.fm/cbd1wweamzzuv', asema: 'La Voz del Norte' },
  NLD: { url: 'https://icecast.omroep.nl/radio1-bb-mp3', asema: 'NPO Radio 1', virallinen: true },
  NOR: { url: 'https://cdn0-47115-liveicecast0.dna.contentdelivery.net/p1_mp3_h', asema: 'NRK P1 (Stor-Oslo)', virallinen: true },
  NPL: { url: 'https://radio-broadcast.ekantipur.com/stream', asema: 'Kantipur FM' },
  NZL: { url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/NZME_41AAC.aac', asema: 'Newstalk ZB' },
  OMN: { url: 'https://stream.zeno.fm/84652g7meg8uv', asema: 'Al Wisal (الوصال), Muscat' },
  PAK: { url: 'https://samaakhi107-itelservices.radioca.st/stream', asema: 'MERA FM 107.4' },
  PAN: { url: 'https://stream.zeno.fm/nvpr0uec8e9uv', asema: 'La Exitosa Panamá' },
  PER: { url: 'https://mdstrm.com/audio/5fab3416b5f9ef165cfab6e9/icecast.audio', asema: 'Radio RPP Noticias', virallinen: true },
  PHL: { url: 'https://azura.dzrh.com.ph/listen/dzrh_manila/radio.mp3', asema: 'DZRH', virallinen: true },
  PNG: { url: 'https://stream.rcs.revma.com/n5vb288kmbpwv', asema: 'Yumi FM (tok pisin, Port Moresby)' },
  POL: { url: 'https://radiostream.pl/tuba10-1.mp3', asema: 'TOK FM' },
  PRT: { url: 'https://radiocast.rtp.pt/rdpint80a.mp3', asema: 'RDP Internacional - Main', virallinen: true },
  QAT: { url: 'https://l3.itworkscdn.net/alarabyradiolive/alarabyradio_audio/icecast.audio', asema: 'Al Araby Radio (Doha/Lusail)' },
  ROU: { url: 'https://edge76.rcs-rds.ro/digifm/digi24fm.mp3', asema: 'Digi24 FM' },
  /*
   * RUS poistettiin 14.8.2026 (13.8. linjaus: ei valtiollista mediaa;
   * Vesti FM on valtion VGTRK:n kanava) ja PALAUTETTIIN 15.8.2026
   * omistajan uudella linjauksella: "Venäjällä saa kuulua radio".
   * Radio on kielinäyte, ei uutislähde — uutiset ja tv pysyvät
   * Venäjän lehdistä poissa 13.8. linjauksen mukaisesti.
   */
  RUS: { url: 'https://icecast-vgtrk.cdnvideo.ru/vestifm_mp3_64kbps', asema: 'Вести ФМ', virallinen: true },
  SAU: { url: 'https://stream-154.zeno.fm/pdeizhgrtrstv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJwZGVpemhncnRyc3R2IiwiaG9zdCI6InN0cmVhbS0xNTQuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6Im9vbng2V1J3UXJ5Q0k5TVV0N01heEEiLCJpYXQiOjE3MjgyMjQ1MTYsImV4cCI6MTcyODIyNDU3Nn0.gpUIWkDBFNNFjqCg2R-xQN4LXT4z8_Ivs7d2UkeFE_8', asema: 'SBA Riyadh Radio 91.5 FM', virallinen: true },
  SDN: { url: 'https://a13.asurahosting.com/listen/al_masaa_fm_101/radio.mp3', asema: 'Al Masaa FM 101 (Khartum)' },
  SDS: { url: 'https://stream.zeno.fm/w3lic6qp9eouv', asema: 'Freedom FM' },
  SEN: { url: 'https://stream.zeno.fm/kxud8vhqt1duv', asema: 'RTS Matam 89.1', virallinen: true },
  SGP: { url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CAPITAL958FM_PREM.aac', asema: 'CAPITAL 958', virallinen: true },
  SHN: { url: 'https://s2.radio.co/s418cc827e/listen', asema: 'SAMS Radio 1' },
  SLB: { url: 'https://listen.mixlr.com/e1e2be07dfce2a18e8ee3cdd0dd2d437', asema: 'SIBC Solomon Islands Broadcasting (Honiara)', virallinen: true },
  SLE: { url: 'https://stream.zeno.fm/jetj7igyezmtv', asema: 'Culture Radio FM 104.5 (Freetown)' },
  SOM: { url: 'https://stream.zeno.fm/m7p996vfec9uv', asema: 'Radio Shabelle 101.5 (Mogadishu)' },
  SWE: { url: 'https://live1.sr.se/p1-aac-32', asema: 'Sveriges Radio P1', virallinen: true },
  SYR: { url: 'https://asima.out.airtime.pro/asima_a', asema: 'Al Asemeh FM / العاصمة إف إم (Damaskos)' },
  TCD: { url: 'https://strhls.streamakaci.tv/str_tchad_radio/str_tchad_radio/icecast.audio', asema: 'Radiodiffusion Nationale Tchadienne', virallinen: true },
  THA: { url: 'https://radio12.plathong.net/7234/;stream.mp3', asema: 'วิทยุเสียงอิสลาม', virallinen: true },
  TLS: { url: 'https://streaming.kalohan.net/proxy/raliber?mp=/stream', asema: 'Rádio Liberdade Dili' },
  TUN: { url: 'https://streaming.diwanfm.net/stream', asema: 'Diwan FM' },
  TUR: { url: 'https://trt.radyotvonline.net/trt1', asema: 'TRT Radyo 1', virallinen: true },
  TWN: { url: 'https://n03.rcs.revma.com/78fm9wyy2tzuv', asema: '中廣新聞網', virallinen: true },
  TZA: { url: 'https://a7.asurahosting.com/listen/tbc_taifa/radio.mp3', asema: 'TBC Taifa', virallinen: true },
  UGA: { url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service_west_africa', asema: '107.3 BBC Radio Uganda', virallinen: true },
  UKR: { url: 'https://online-news.radioplayer.ua/RadioNews', asema: 'Єдині новини (Radio News)' },
  USA: { url: 'https://fm939.wnyc.org/wnycfm', asema: 'WNYC-FM 93.9 New York Public Radio', virallinen: true },
  UZB: { url: 'https://live.qalbimnavosi.uz/qalbimnavosi', asema: 'Qalbim navosi' },
  VEN: { url: 'https://guri.tepuyserver.net/8048/stream', asema: 'Radio Nacional de Venezuela - Informativa', virallinen: true },
  VNM: { url: 'https://rfienvietnamien64k.ice.infomaniak.ch/rfienvietnamien-64.mp3', asema: 'RFI Tiếng Việt' },
  VUT: { url: 'https://radio.vbtc.vu/paradisefm', asema: 'Paradise 98FM (VBTC, Port Vila)', virallinen: true },
  YEM: { url: 'https://dc5.serverse.com/proxy/pbmhbvxs/stream', asema: 'Sana\'a Radio (إذاعة صنعاء)', virallinen: true },
  ZAF: { url: 'https://25643.live.streamtheworld.com/UKHOZIFMAAC_SC', asema: 'Ukhozi FM (SABC)', virallinen: true },
  ZWE: { url: 'https://edge.iono.fm/xice/159_high.aac', asema: 'Star FM 89.7 (Harare)' },
};

/** Maan suora lähetys, tai null. */
export function radioMaalle(maa) {
  return (maa && RADIOT[maa]) || null;
}
