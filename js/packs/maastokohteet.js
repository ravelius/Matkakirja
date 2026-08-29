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
 */
import { MAASTOKOHTEET_AUT } from './maastokohteet-aut.js';
import { MAASTOKOHTEET_BIH } from './maastokohteet-bih.js';
import { MAASTOKOHTEET_CHE } from './maastokohteet-che.js';
import { MAASTOKOHTEET_CZE } from './maastokohteet-cze.js';
import { MAASTOKOHTEET_DNK } from './maastokohteet-dnk.js';
import { MAASTOKOHTEET_ESP } from './maastokohteet-esp.js';
import { MAASTOKOHTEET_EST } from './maastokohteet-est.js';
import { MAASTOKOHTEET_FIN } from './maastokohteet-fin.js';
import { MAASTOKOHTEET_FRA } from './maastokohteet-fra.js';
import { MAASTOKOHTEET_GBR } from './maastokohteet-gbr.js';
import { MAASTOKOHTEET_IRL } from './maastokohteet-irl.js';
import { MAASTOKOHTEET_ISL } from './maastokohteet-isl.js';
import { MAASTOKOHTEET_ITA } from './maastokohteet-ita.js';
import { MAASTOKOHTEET_LTU } from './maastokohteet-ltu.js';
import { MAASTOKOHTEET_LVA } from './maastokohteet-lva.js';
import { MAASTOKOHTEET_NLD } from './maastokohteet-nld.js';
import { MAASTOKOHTEET_NOR } from './maastokohteet-nor.js';
import { MAASTOKOHTEET_POL } from './maastokohteet-pol.js';
import { MAASTOKOHTEET_PRT } from './maastokohteet-prt.js';
import { MAASTOKOHTEET_ROU } from './maastokohteet-rou.js';
import { MAASTOKOHTEET_RUS } from './maastokohteet-rus.js';
import { MAASTOKOHTEET_SWE } from './maastokohteet-swe.js';
import { MAASTOKOHTEET_TUR } from './maastokohteet-tur.js';
import { MAASTOKOHTEET_UKR } from './maastokohteet-ukr.js';

/** Maan ISO-tunnus → maan maastokohteet. 24 maata. */
export const MAASTOKOHTEET = {
  AUT: MAASTOKOHTEET_AUT,
  BIH: MAASTOKOHTEET_BIH,
  CHE: MAASTOKOHTEET_CHE,
  CZE: MAASTOKOHTEET_CZE,
  DNK: MAASTOKOHTEET_DNK,
  ESP: MAASTOKOHTEET_ESP,
  EST: MAASTOKOHTEET_EST,
  FIN: MAASTOKOHTEET_FIN,
  FRA: MAASTOKOHTEET_FRA,
  GBR: MAASTOKOHTEET_GBR,
  IRL: MAASTOKOHTEET_IRL,
  ISL: MAASTOKOHTEET_ISL,
  ITA: MAASTOKOHTEET_ITA,
  LTU: MAASTOKOHTEET_LTU,
  LVA: MAASTOKOHTEET_LVA,
  NLD: MAASTOKOHTEET_NLD,
  NOR: MAASTOKOHTEET_NOR,
  POL: MAASTOKOHTEET_POL,
  PRT: MAASTOKOHTEET_PRT,
  ROU: MAASTOKOHTEET_ROU,
  RUS: MAASTOKOHTEET_RUS,
  SWE: MAASTOKOHTEET_SWE,
  TUR: MAASTOKOHTEET_TUR,
  UKR: MAASTOKOHTEET_UKR,
};
