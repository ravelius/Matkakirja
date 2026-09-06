/*
 * MAASTOKOHTEET — HAKEMISTO. Yksi rivi maata kohti, yksi tuonti pelille.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi kaikkiin
 * maihin."* Ensimmäinen erä on Euroopan lauta (29 maata); muut mantereet
 * tulevat samalla putkella (tools/johda-maastokohteet.mjs).
 *
 * === MIKSI OMA TIEDOSTOPERHE EIKÄ RIVEJÄ fokuskohteet-PAKKEIHIN ===
 *
 * Kolme syytä, ja kaikki kolme ovat tämän erän kokoisia:
 *
 *  1. KAHDEKSAATOISTA MAATA EI OLE PAKKIA LAINKAAN. Espanja, Puola,
 *     Norja ja viisitoista muuta eivät olleet KOHDE_MAAT-taulussa
 *     ennen tätä erää, joten tiedosto olisi jouduttu luomaan niille
 *     joka tapauksessa. Vain kuudella tämän erän maalla on ennestään
 *     fokuskohteet-pakki.
 *
 *  2. OLEMASSA OLEVIIN PAKKEIHIN EI TARVITSE KOSKEA. Italia, Romania,
 *     Turkki ja Bosnia ja Hertsegovina saavat täydennyksensä omaan
 *     tiedostoonsa, eikä yhtään riviä niiden käsin kirjoitetuista
 *     pakeista muuteta. Se on sekä turvallisempaa (kuratoitu sisältö
 *     ei ole vaarassa) että helpompaa katselmoida: erän koko sisältö
 *     on uusissa tiedostoissa.
 *
 *  3. YKSI TUONTI, EI KAHTAKYMMENTÄNELJÄÄ. js/fokuskohteet.js on
 *     jaettu tiedosto, jota useampi rinnakkainen erä muokkaa
 *     samanaikaisesti. Tämä hakemisto pitää sen muutoksen kolmessa
 *     rivissä kahdenkymmenenneljän sijaan.
 *
 * Peli ei näe eroa: js/fokuskohteet.js liittää nämä maan omaan listaan,
 * ja kohteet käyttäytyvät täsmälleen kuten fokuskohteet-pakkien omat.
 *
 * Tiedostot on tuotettu työkalulla `node tools/johda-maastokohteet.mjs
 * <ISO> --runko`; sen jälkeen ne ovat tavallista käsin muokattavaa
 * lähdekoodia, eikä työkalua ajeta niiden yli uudelleen.
 *
 * === JAETTU VESISTÖ: YKSI RUNKO, MAAKOHTAINEN HÄNTÄ (1.9.2026) =====
 *
 * Kaksikymmentäyhdeksän tunnusta esiintyy 2–7 maassa: Itämeri kuudessa,
 * Välimeri seitsemässä, Atlantti seitsemässä, Barentsinmeri kahdessa.
 * Jokaisella maalla on OMA kohdeoliona, omalla paikallaan ja omilla
 * Pulu-kysymyksillään — sama kortti-implementaatio ei siis ole jaettu,
 * ja sama vesistö voi kertoa eri maassa eri asian.
 *
 * Se ei ollut ilmainen: teksti oli kopioitu maasta toiseen, ja kuuden
 * Itämeri-kortin ensimmäiset virkkeet olivat sanasta sanaan samat
 * tietosanakirjan johdannot (nostoaudit 1.9.2026, luku 2.1). Erässä 3B
 * viisi vesistöä kirjoitettiin siksi KAHTENA OSANA:
 *
 *   RUNKO   — sama teksti jokaisessa rantavaltiossa, ja se alkaa
 *             koukusta eikä määritelmästä: Itämeri on meri, jonka
 *             pohjassa puulaivat eivät lahoa; Pohjanlahti on katoamassa;
 *             Barentsinmeri lämpenee nopeammin kuin mikään muu arktinen
 *             meri. Yhteinen runko on tarkoituksellinen: pelaaja, joka
 *             avaa Itämeren Riiassa ja uudestaan Tukholmassa, tunnistaa
 *             sen samaksi mereksi.
 *   HÄNTÄ   — 1–3 virkettä siitä, mitä juuri tämä meri merkitsee juuri
 *             tälle maalle: satama, kalastus, historia. Tanskalla salmet,
 *             Liettualla meripihka, Ruotsilla Gotlanti ja merirosvot.
 *
 * Lähderivi nimeää molempien osien lähteet, ja hännän oma osio näkyy
 * siinä erikseen. Nimeä, tyyppiä, symbolia ja koordinaatteja ei
 * kosketa — ne ovat nostoladonnan tiivisteessä (js/nostoladonta.js).
 */
import { MAASTOKOHTEET_AFG } from './maastokohteet-afg.js';
import { MAASTOKOHTEET_AGO } from './maastokohteet-ago.js';
import { MAASTOKOHTEET_ARE } from './maastokohteet-are.js';
import { MAASTOKOHTEET_ARG } from './maastokohteet-arg.js';
import { MAASTOKOHTEET_AUS } from './maastokohteet-aus.js';
import { MAASTOKOHTEET_AUT } from './maastokohteet-aut.js';
import { MAASTOKOHTEET_BIH } from './maastokohteet-bih.js';
import { MAASTOKOHTEET_BOL } from './maastokohteet-bol.js';
import { MAASTOKOHTEET_BRA } from './maastokohteet-bra.js';
import { MAASTOKOHTEET_CAN } from './maastokohteet-can.js';
import { MAASTOKOHTEET_CHE } from './maastokohteet-che.js';
import { MAASTOKOHTEET_CHL } from './maastokohteet-chl.js';
import { MAASTOKOHTEET_CHN } from './maastokohteet-chn.js';
import { MAASTOKOHTEET_CMR } from './maastokohteet-cmr.js';
import { MAASTOKOHTEET_COD } from './maastokohteet-cod.js';
import { MAASTOKOHTEET_COL } from './maastokohteet-col.js';
import { MAASTOKOHTEET_CUB } from './maastokohteet-cub.js';
import { MAASTOKOHTEET_CYP } from './maastokohteet-cyp.js';
import { MAASTOKOHTEET_CZE } from './maastokohteet-cze.js';
import { MAASTOKOHTEET_DNK } from './maastokohteet-dnk.js';
import { MAASTOKOHTEET_DZA } from './maastokohteet-dza.js';
import { MAASTOKOHTEET_EGY } from './maastokohteet-egy.js';
import { MAASTOKOHTEET_ESP } from './maastokohteet-esp.js';
import { MAASTOKOHTEET_EST } from './maastokohteet-est.js';
import { MAASTOKOHTEET_ETH } from './maastokohteet-eth.js';
import { MAASTOKOHTEET_FIN } from './maastokohteet-fin.js';
import { MAASTOKOHTEET_FJI } from './maastokohteet-fji.js';
import { MAASTOKOHTEET_FRA } from './maastokohteet-fra.js';
import { MAASTOKOHTEET_GBR } from './maastokohteet-gbr.js';
import { MAASTOKOHTEET_GHA } from './maastokohteet-gha.js';
import { MAASTOKOHTEET_GRL } from './maastokohteet-grl.js';
import { MAASTOKOHTEET_GTM } from './maastokohteet-gtm.js';
import { MAASTOKOHTEET_HKG } from './maastokohteet-hkg.js';
import { MAASTOKOHTEET_IDN } from './maastokohteet-idn.js';
import { MAASTOKOHTEET_IND } from './maastokohteet-ind.js';
import { MAASTOKOHTEET_IRL } from './maastokohteet-irl.js';
import { MAASTOKOHTEET_IRN } from './maastokohteet-irn.js';
import { MAASTOKOHTEET_IRQ } from './maastokohteet-irq.js';
import { MAASTOKOHTEET_ISL } from './maastokohteet-isl.js';
import { MAASTOKOHTEET_ITA } from './maastokohteet-ita.js';
import { MAASTOKOHTEET_JOR } from './maastokohteet-jor.js';
import { MAASTOKOHTEET_JPN } from './maastokohteet-jpn.js';
import { MAASTOKOHTEET_KAZ } from './maastokohteet-kaz.js';
import { MAASTOKOHTEET_KEN } from './maastokohteet-ken.js';
import { MAASTOKOHTEET_KOR } from './maastokohteet-kor.js';
import { MAASTOKOHTEET_KWT } from './maastokohteet-kwt.js';
import { MAASTOKOHTEET_LBR } from './maastokohteet-lbr.js';
import { MAASTOKOHTEET_LBY } from './maastokohteet-lby.js';
import { MAASTOKOHTEET_LKA } from './maastokohteet-lka.js';
import { MAASTOKOHTEET_LTU } from './maastokohteet-ltu.js';
import { MAASTOKOHTEET_LVA } from './maastokohteet-lva.js';
import { MAASTOKOHTEET_MAR } from './maastokohteet-mar.js';
import { MAASTOKOHTEET_MDG } from './maastokohteet-mdg.js';
import { MAASTOKOHTEET_MLI } from './maastokohteet-mli.js';
import { MAASTOKOHTEET_MMR } from './maastokohteet-mmr.js';
import { MAASTOKOHTEET_MNG } from './maastokohteet-mng.js';
import { MAASTOKOHTEET_MOZ } from './maastokohteet-moz.js';
import { MAASTOKOHTEET_NAM } from './maastokohteet-nam.js';
import { MAASTOKOHTEET_NGA } from './maastokohteet-nga.js';
import { MAASTOKOHTEET_NIC } from './maastokohteet-nic.js';
import { MAASTOKOHTEET_NLD } from './maastokohteet-nld.js';
import { MAASTOKOHTEET_NOR } from './maastokohteet-nor.js';
import { MAASTOKOHTEET_NPL } from './maastokohteet-npl.js';
import { MAASTOKOHTEET_NZL } from './maastokohteet-nzl.js';
import { MAASTOKOHTEET_OMN } from './maastokohteet-omn.js';
import { MAASTOKOHTEET_PAK } from './maastokohteet-pak.js';
import { MAASTOKOHTEET_PHL } from './maastokohteet-phl.js';
import { MAASTOKOHTEET_PNG } from './maastokohteet-png.js';
import { MAASTOKOHTEET_POL } from './maastokohteet-pol.js';
import { MAASTOKOHTEET_PRT } from './maastokohteet-prt.js';
import { MAASTOKOHTEET_QAT } from './maastokohteet-qat.js';
import { MAASTOKOHTEET_ROU } from './maastokohteet-rou.js';
import { MAASTOKOHTEET_RUS } from './maastokohteet-rus.js';
import { MAASTOKOHTEET_SAU } from './maastokohteet-sau.js';
import { MAASTOKOHTEET_SDN } from './maastokohteet-sdn.js';
import { MAASTOKOHTEET_SDS } from './maastokohteet-sds.js';
import { MAASTOKOHTEET_SEN } from './maastokohteet-sen.js';
import { MAASTOKOHTEET_SGP } from './maastokohteet-sgp.js';
import { MAASTOKOHTEET_SLB } from './maastokohteet-slb.js';
import { MAASTOKOHTEET_SLE } from './maastokohteet-sle.js';
import { MAASTOKOHTEET_SOM } from './maastokohteet-som.js';
import { MAASTOKOHTEET_SWE } from './maastokohteet-swe.js';
import { MAASTOKOHTEET_SYR } from './maastokohteet-syr.js';
import { MAASTOKOHTEET_TCD } from './maastokohteet-tcd.js';
import { MAASTOKOHTEET_THA } from './maastokohteet-tha.js';
import { MAASTOKOHTEET_TLS } from './maastokohteet-tls.js';
import { MAASTOKOHTEET_TUN } from './maastokohteet-tun.js';
import { MAASTOKOHTEET_TUR } from './maastokohteet-tur.js';
import { MAASTOKOHTEET_TWN } from './maastokohteet-twn.js';
import { MAASTOKOHTEET_TZA } from './maastokohteet-tza.js';
import { MAASTOKOHTEET_UGA } from './maastokohteet-uga.js';
import { MAASTOKOHTEET_UKR } from './maastokohteet-ukr.js';
import { MAASTOKOHTEET_UZB } from './maastokohteet-uzb.js';
import { MAASTOKOHTEET_VNM } from './maastokohteet-vnm.js';
import { MAASTOKOHTEET_YEM } from './maastokohteet-yem.js';
import { MAASTOKOHTEET_ZAF } from './maastokohteet-zaf.js';
import { MAASTOKOHTEET_ZWE } from './maastokohteet-zwe.js';

/** Maan ISO-tunnus → maan maastokohteet. 97 maata. */
export const MAASTOKOHTEET = {
  AFG: MAASTOKOHTEET_AFG,
  AGO: MAASTOKOHTEET_AGO,
  ARE: MAASTOKOHTEET_ARE,
  ARG: MAASTOKOHTEET_ARG,
  AUS: MAASTOKOHTEET_AUS,
  AUT: MAASTOKOHTEET_AUT,
  BIH: MAASTOKOHTEET_BIH,
  BOL: MAASTOKOHTEET_BOL,
  BRA: MAASTOKOHTEET_BRA,
  CAN: MAASTOKOHTEET_CAN,
  CHE: MAASTOKOHTEET_CHE,
  CHL: MAASTOKOHTEET_CHL,
  CHN: MAASTOKOHTEET_CHN,
  CMR: MAASTOKOHTEET_CMR,
  COD: MAASTOKOHTEET_COD,
  COL: MAASTOKOHTEET_COL,
  CUB: MAASTOKOHTEET_CUB,
  CYP: MAASTOKOHTEET_CYP,
  CZE: MAASTOKOHTEET_CZE,
  DNK: MAASTOKOHTEET_DNK,
  DZA: MAASTOKOHTEET_DZA,
  EGY: MAASTOKOHTEET_EGY,
  ESP: MAASTOKOHTEET_ESP,
  EST: MAASTOKOHTEET_EST,
  ETH: MAASTOKOHTEET_ETH,
  FIN: MAASTOKOHTEET_FIN,
  FJI: MAASTOKOHTEET_FJI,
  FRA: MAASTOKOHTEET_FRA,
  GBR: MAASTOKOHTEET_GBR,
  GHA: MAASTOKOHTEET_GHA,
  GRL: MAASTOKOHTEET_GRL,
  GTM: MAASTOKOHTEET_GTM,
  HKG: MAASTOKOHTEET_HKG,
  IDN: MAASTOKOHTEET_IDN,
  IND: MAASTOKOHTEET_IND,
  IRL: MAASTOKOHTEET_IRL,
  IRN: MAASTOKOHTEET_IRN,
  IRQ: MAASTOKOHTEET_IRQ,
  ISL: MAASTOKOHTEET_ISL,
  ITA: MAASTOKOHTEET_ITA,
  JOR: MAASTOKOHTEET_JOR,
  JPN: MAASTOKOHTEET_JPN,
  KAZ: MAASTOKOHTEET_KAZ,
  KEN: MAASTOKOHTEET_KEN,
  KOR: MAASTOKOHTEET_KOR,
  KWT: MAASTOKOHTEET_KWT,
  LBR: MAASTOKOHTEET_LBR,
  LBY: MAASTOKOHTEET_LBY,
  LKA: MAASTOKOHTEET_LKA,
  LTU: MAASTOKOHTEET_LTU,
  LVA: MAASTOKOHTEET_LVA,
  MAR: MAASTOKOHTEET_MAR,
  MDG: MAASTOKOHTEET_MDG,
  MLI: MAASTOKOHTEET_MLI,
  MMR: MAASTOKOHTEET_MMR,
  MNG: MAASTOKOHTEET_MNG,
  MOZ: MAASTOKOHTEET_MOZ,
  NAM: MAASTOKOHTEET_NAM,
  NGA: MAASTOKOHTEET_NGA,
  NIC: MAASTOKOHTEET_NIC,
  NLD: MAASTOKOHTEET_NLD,
  NOR: MAASTOKOHTEET_NOR,
  NPL: MAASTOKOHTEET_NPL,
  NZL: MAASTOKOHTEET_NZL,
  OMN: MAASTOKOHTEET_OMN,
  PAK: MAASTOKOHTEET_PAK,
  PHL: MAASTOKOHTEET_PHL,
  PNG: MAASTOKOHTEET_PNG,
  POL: MAASTOKOHTEET_POL,
  PRT: MAASTOKOHTEET_PRT,
  QAT: MAASTOKOHTEET_QAT,
  ROU: MAASTOKOHTEET_ROU,
  RUS: MAASTOKOHTEET_RUS,
  SAU: MAASTOKOHTEET_SAU,
  SDN: MAASTOKOHTEET_SDN,
  SDS: MAASTOKOHTEET_SDS,
  SEN: MAASTOKOHTEET_SEN,
  SGP: MAASTOKOHTEET_SGP,
  SLB: MAASTOKOHTEET_SLB,
  SLE: MAASTOKOHTEET_SLE,
  SOM: MAASTOKOHTEET_SOM,
  SWE: MAASTOKOHTEET_SWE,
  SYR: MAASTOKOHTEET_SYR,
  TCD: MAASTOKOHTEET_TCD,
  THA: MAASTOKOHTEET_THA,
  TLS: MAASTOKOHTEET_TLS,
  TUN: MAASTOKOHTEET_TUN,
  TUR: MAASTOKOHTEET_TUR,
  TWN: MAASTOKOHTEET_TWN,
  TZA: MAASTOKOHTEET_TZA,
  UGA: MAASTOKOHTEET_UGA,
  UKR: MAASTOKOHTEET_UKR,
  UZB: MAASTOKOHTEET_UZB,
  VNM: MAASTOKOHTEET_VNM,
  YEM: MAASTOKOHTEET_YEM,
  ZAF: MAASTOKOHTEET_ZAF,
  ZWE: MAASTOKOHTEET_ZWE,
};
