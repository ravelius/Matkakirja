/*
 * Kieli kuuluviin: kaupungissa nauhoitettu näyte, jossa ihmiset puhuvat.
 *
 * Tämä on tarkoituksella eri asia kuin kaupungin taustaääni
 * (js/aani-ehdokkaat.js KAUPUNKI_EHDOKKAAT). Taustaääni soi silmukassa
 * minuutteja, ja selvä puhe alkaa toistuessaan kiinnittää huomion:
 * pelaaja tunnistaa samat lauseet ja tausta muuttuu häiriöksi. Siksi
 * taustaan haetaan puheetonta maisemaa, ja kieli soi omasta napistaan
 * kerran painalluksesta — silloin selvä puhe on vahvuus.
 *
 * Nappi on saapumiskortissa tervehdysrivin perässä: teksti kertoo mitä
 * "hyvää päivää" on kyseisellä kielellä, näyte kertoo miltä se
 * kuulostaa oikeassa kadunkulmassa.
 *
 * Äänitteet ovat radio aporeesta ja haettu koordinaattien perusteella
 * (tools/hae-kaupunkiaanet.mjs --puhe), joten ne ovat varmasti siitä
 * kaupungista. Parhaita ovat tori, kahvila ja katusoittaja: ihmisiä on
 * monta, puhe on luontevaa eikä äänite ole kenenkään yksityinen
 * keskustelu.
 *
 * Muoto: { url, nimi, kesto } — nimi kertoo paikan, tekijän ja
 * lisenssin, ja se näkyy sellaisenaan lähdemainintana.
 */

import { aaniLisenssiSallittu } from '../lisenssi.js';
export const EUROPE_KIELET_KAIKKI = {
  lontoo: { url: 'https://archive.org/download/aporee_16582_19251/EastStreetmarketElephantCastle.mp3', nimi: 'Itäkadun tori (Lontoo) — yll_foundations, PD', kesto: 180 },
  istanbul: { url: 'https://archive.org/download/aporee_67584_78236/Bazarauen.mp3', nimi: 'Katettu basaari (Istanbul) — jakob.roth, PD', kesto: 180 },
  dublin: { url: 'https://archive.org/download/aporee_23825_27683/EarlstreetNorthLotsofLanguagespeoplepassingSPsD.mp3', nimi: 'Earl Street (Dublin) — jo_pamo, PD', kesto: 180 },
  pariisi: { url: 'https://archive.org/download/aporee_44695_50798/SquareduVertGalant20190604145003.mp3', nimi: 'Vert-Galantin puisto (Pariisi) — Thijs Geritz, PD', kesto: 180 },
  marseille: { url: 'https://archive.org/download/aporee_55692_63657/Noailles25082020.mp3', nimi: 'Noailles\'n tori (Marseille) — jfcavro, PD', kesto: 180 },
  lissabon: { url: 'https://archive.org/download/aporee_25987_30058/MAYCOM95Lissaboninsatamankauppahallissaaamupivlleditoitu.mp3', nimi: 'Ribeiran kauppahalli (Lissabon) — Petri Syrjänen, PD', kesto: 180 },
  madrid: { url: 'https://archive.org/download/aporee_26259_30348/SanMiguelmarket.mp3', nimi: 'San Miguelin kauppahalli (Madrid) — maciej janasik, PD', kesto: 180 },
  barcelona: { url: 'https://archive.org/download/aporee_27037_31166/LaBoqueriaMarket.mp3', nimi: 'La Boquerían tori (Barcelona) — RorySmith, PD', kesto: 180 },
  amsterdam: { url: 'https://archive.org/download/aporee_14169_16501/dapperm.mp3', nimi: 'Dappermarktin tori (Amsterdam) — milos, PD', kesto: 180 },
  berliini: { url: 'https://archive.org/download/aporee_46857_53203/BalkonHusemannstrasseNebenstrasseUnter.mp3', nimi: 'Husemannstraße kevätiltana (Berliini) — fabian.schmidt, PD', kesto: 180 },
  praha: { url: 'https://archive.org/download/aporee_10415_12393/aamalka.mp3', nimi: 'Kahvila Trafika (Praha) — mkin, CC BY-SA', kesto: 97 },
  budapest: { url: 'https://archive.org/download/aporee_13332_15569/12041917streetvendorsathatarut.mp3', nimi: 'Katukauppiaita (Budapest) — nagysui, PD', kesto: 180 },
  varsova: { url: 'https://archive.org/download/aporee_19329_22452/7FontannaWielkawParkOgrodSaski.mp3', nimi: 'Ogród Saskin puiston suihkulähde (Varsova) — Anton Mobin, PD', kesto: 284 },
  krakova: { url: 'https://archive.org/download/aporee_57732_66098/kazimierzmarket.mp3', nimi: 'Plac Nowyn sunnuntaitori (Krakova) — maciej janasik, PD', kesto: 114 },
  venetsia: { url: 'https://archive.org/download/aporee_16461_19081/fishmarketvenice.mp3', nimi: 'Kalatori (Venetsia) — Carlos Santos, PD', kesto: 180 },
  rooma: { url: 'https://archive.org/download/aporee_41154_46967/Aporee180216003RomemarketclossingCampodeFiori.mp3', nimi: 'Campo de\' Fiorin tori sulkeutuu (Rooma) — Benjamin Trimoreau, PD', kesto: 180 },
  sisilia: { url: 'https://archive.org/download/aporee_43256_49289/catania20190322124151.mp3', nimi: 'Kalatori raiteiden alla (Catania, Sisilia) — zvukac, PD', kesto: 464 },
  ateena: { url: 'https://archive.org/download/aporee_49899_56908/08527AthensGreece.mp3', nimi: 'Lauantain vihannestori (Ateena) — Piotrek Zyla, PD', kesto: 180 },
  kreeta: { url: 'https://archive.org/download/aporee_14960_17433/markt46.mp3', nimi: 'Iraklionin torikatu (Kreeta) — maciej janasik, PD', kesto: 180 },
  sofia: { url: 'https://archive.org/download/aporee_15486_18035/LS110995catstory.mp3', nimi: 'Naisten tori (Sofia) — Jüang Ren, PD', kesto: 180 },
  bukarest: { url: 'https://archive.org/download/aporee_63580_73186/1005BIBUCHARESTObormarketwalkoutin230506at1145.mp3', nimi: 'Oborin tori (Bukarest) — Piotrek Zyla, PD', kesto: 180 },
  kiova: { url: 'https://archive.org/download/aporee_41362_47184/upload20180928142313.mp3', nimi: 'Kadun ääniä (Kiova) — soundkovalsky, PD', kesto: 153 },
  moskova: { url: 'https://archive.org/download/aporee_30424_35011/readymade.mp3', nimi: 'Kahvila Leninskillä (Moskova) — kawks, PD', kesto: 180 },
  pietari: { url: 'https://archive.org/download/aporee_30261_34830/039.mp3', nimi: 'Sennajan tori (Pietari) — spbsoundmap, CC BY-SA', kesto: 180 },
  helsinki: { url: 'https://archive.org/download/aporee_13153_15385/11081005HelsinkiKauppatori171216bit224.mp3', nimi: 'Kauppatori (Helsinki) — damir.kustic, PD', kesto: 139 },
  tallinna: { url: 'https://archive.org/download/aporee_9779_11715/baltijaammeatmarket01.mp3', nimi: 'Balti jaaman lihatori (Tallinna) — john grzinich, CC BY-SA', kesto: 89 },
  riika: { url: 'https://archive.org/download/aporee_13114_15344/11080718rigatram204816bit224.mp3', nimi: 'Joukkoliikenteessä (Riika) — damir.kustic, PD', kesto: 180 },
  vilna: { url: 'https://archive.org/download/aporee_50430_57520/gmdgediminas.mp3', nimi: 'Kävely katumusiikin päivänä (Vilna) — alas23/sala, PD', kesto: 180 },
  tukholma: { url: 'https://archive.org/download/aporee_33214_38190/StockholmplaaHtorgetmercatdeflors.mp3', nimi: 'Kukkatori (Tukholma) — Albert Murillo, CC BY', kesto: 152 },
  oslo: { url: 'https://archive.org/download/aporee_13979_16300/StazioneCleTabelloneTreniPassi.mp3', nimi: 'Päärautatieasema (Oslo) — hatoriyumi, PD', kesto: 180 },
  kobenhavn: { url: 'https://archive.org/download/aporee_43901_49961/cphnyhavn150415h00.mp3', nimi: 'Nyhavnin rantakatu (Kööpenhamina) — Vincent Duseigne, CC BY', kesto: 420 },
};

/*
 * LISENSSIPORTTI (Fable 23.9.2026, js/lisenssi.js): NC- ja ND-ehtoinen
 * kielinäyte ei soi — kaupungin "Kuuntele kieltä" -nappi jää pois, kunnes
 * näytteelle löytyy vapaa korvaaja (docs/raportit/lisenssi-inventaario-
 * 20260923.md, kohta C). Kaikki rivit ovat EUROPE_KIELET_KAIKKI:ssa.
 */
export const EUROPE_KIELET = Object.fromEntries(
  Object.entries(EUROPE_KIELET_KAIKKI).filter(([, e]) => aaniLisenssiSallittu(e.nimi)),
);
