/*
 * Lehden sivukoneisto: sivupinon rakennus (rakennaSivut), sivujen
 * näyttö ja selaus, sisällysvalikko, lukijakytkennät sekä maa-,
 * kehittäjä-, Raamattu- ja tilannelehtien avaukset. Siirretty
 * js/ui.js:stä 17.8.2026 (remontin M5a–M5b, malli B —
 * docs/moduulirakenne-suunnitelma.md). Funktiot saavat ui-olion
 * ensimmäisenä parametrinaan ja kirjoittavat lehden muistitilaa vain
 * ui.lehtitila-olioon (kentät dokumentoitu ui.js:n rakentimessa) sekä
 * arrival*-DOM-kahvoihin. Pöllö, lukija,
 * nähtävyydet ja main kutsuvat näitä ui-olion delegaattorien
 * kautta (suora tuonti tekisi tuontisyklin).
 */

import { hiljennaAmbienssi } from './ambience-stream.js';
import {
  kaynnistaLukija, kokoaLuettavaTeksti, liitaLukija, paivitaLukija,
  pysaytaLukija, vieritaPehmeasti,
} from './lukija.js';
import {
  naytaMaaTunnusluvut, paivitaMediarivit, piirraKategoria,
  piirraMaaEtusivu, piirraMaaNumerotSivu, rakennaSisallysLista,
} from './maalehti.js';
import { asetaKuva } from './media.js';
import {
  nahtavyydenKaruselli, nahtavyydenKuva, piirraKaupunkiKartta,
  piirraMatkailijalle,
} from './nahtavyydet.js';
import {
  lippuUrl, lippuVara, valokuvaUrl, valokuvaVara,
} from './packs/africa-valokuvat.js';
import { KULTTUURI_KATEGORIAT } from './packs/kulttuuri-kategoriat.js';
import { MAA_KATEGORIAT } from './packs/maa-kategoriat.js';
import { KAUPUNKIKARTAT, MAAKARTAT } from './packs/maakartat.js';
import { SAATIEDOT } from './packs/saatiedot.js';
import {
  haeSaaTanaan, kuukausiSsa, piirraVuosiSaa, saaKuvaus, SAA_IKONIT,
} from './saa.js';
import { ARTIKKELIT, KULTTUURIT } from './sisaltotaulut.js';
import { sfx } from './sound.js';
import { RAAMATTU } from './tyohuone-raamattu.js';
import { TESTATTAVAA, TILANNE } from './tyohuone-tilanne.js';
import {
  cachedSummary, html, jaaKappaleiksi, kehittajaTilaPaalla, shortIntro,
} from './ui-apurit.js';
import {
  haeArtikkeli, haeUutiset, kaannaSuomeksi, uutislahde,
} from './uutiset.js';

/**
 * Muotoilee koko artikkelin tekstin: MediaWiki extracts palauttaa
 * väliotsikot muodossa "== Otsikko ==", ja ne muutetaan omiksi
 * otsikkoriveiksi. Pelkkää tekstiä — HTML:ää ei upoteta.
 *
 * Artikkeli katkaistaan ensimmäiseen HÄNTÄOSASTOON (Lähteet, Katso
 * myös, Aiheesta muualla…): explaintext riisuu viiteluettelot,
 * linkkilistat ja galleriat, joten näistä osastoista jää jäljelle
 * vain rivi tyhjiä otsikoita artikkelin perään (omistajan havainto
 * 10.8.2026 Espanjalaisista portaista: "Tätä ei ole siistitty").
 * Häntäosastot ovat Wikipediassa aina artikkelin lopussa, joten
 * katkaisu ei vie asiasisältöä mukanaan. Lista kattaa molemmat
 * hakukielet (WIKI_LANGS: fi ja en) — Colosseumin kaltaiset paikat
 * ratkeavat englanninkieliseen artikkeliin.
 */
export function renderArticle(ui, container, text) {
  const hanta = /^(katso myös|lähteet|viitteet|lähteet ja viitteet|kirjallisuutta?|aiheesta muualla|ulkoiset linkit|kuvia|kuvagalleria|galleria|huomautukset|aiheeseen liittyvää|see also|references|notes|footnotes|citations|sources|bibliography|further reading|external links|gallery)$/i;
  container.textContent = '';
  let para = [];
  const flush = () => {
    if (para.length) container.appendChild(html('p', 'wiki-p', para.join(' ')));
    para = [];
  };
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t) {
      flush();
      continue;
    }
    const m = t.match(/^(={2,6})\s*(.+?)\s*={2,6}$/);
    if (m) {
      flush();
      if (m[1].length <= 2 && hanta.test(m[2])) return;
      container.appendChild(html('p', m[1].length <= 2 ? 'wiki-h2' : 'wiki-h3', m[2]));
    } else {
      para.push(t);
    }
  }
  flush();
}

/**
 * Käsin kirjoitettu maastoartikkeli: tekstikappaleet ja niiden
 * väliin aikalaislainaukset omina sitaattilohkoinaan. Kuvakappaleet
 * ohitetaan tässä — ne kulkevat gallerian kautta (avaaMaastonimi),
 * jossa niillä on suurennos, selaus ja lähderivi valmiina.
 */
export function renderMaastoArtikkeli(ui, container, kappaleet) {
  container.textContent = '';
  for (const kpl of kappaleet) {
    if (kpl.teksti) {
      container.appendChild(html('p', 'wiki-p', kpl.teksti));
    } else if (kpl.lainaus) {
      const lohko = html('blockquote', 'maasto-lainaus');
      lohko.appendChild(html('p', 'maasto-lainaus-teksti', `”${kpl.lainaus}”`));
      const nimio = html('footer', 'maasto-lainaus-nimio');
      nimio.appendChild(document.createTextNode(`— ${kpl.kuka ?? 'tuntematon'}, `));
      if (kpl.linkki) {
        const a = html('a', '', kpl.teos ?? 'lähde');
        a.href = kpl.linkki;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        nimio.appendChild(a);
      } else {
        nimio.appendChild(html('cite', '', kpl.teos ?? ''));
      }
      if (kpl.vuosi) nimio.appendChild(document.createTextNode(` (${kpl.vuosi})`));
      lohko.appendChild(nimio);
      container.appendChild(lohko);
    }
  }
}

/**
 * "Lue lisää": Wikipedian artikkeli paikasta. Dialogi avautuu heti,
 * tiivistelmä täyttyy kun haku valmistuu, ja koko artikkeli ladataan
 * perään samalta kieleltä. Jos haku epäonnistuu — ei yhteyttä, 404 tai
 * täsmennyssivu — dialogissa lukee kohteliaasti, ettei tietoja saatu,
 * eikä peli jää siitä jumiin.
 */
export async function openWiki(ui, cityId) {
  const city = ui.game.board.cityById.get(cityId);
  if (!city?.wiki) return;
  await ui.openWikiArticle(city.wiki, city.name);
}

/**
 * Kirjanmerkkiliuskat Tutki-ikkunan yläreunaan.
 *
 * Omistajan toive: nostot jaoteltuina kategorioihin, joista yksi on
 * auki kerrallaan.
 *
 * Yleistä-liuska on aina ensimmäinen ja se on artikkeli. Sitä EI
 * korvata kategorioilla, vaikka omistaja ehdotti sitä: 122
 * kaupungilla on oma artikkeli ja kategorioita on toistaiseksi
 * yhdellä. Korvaaminen tyhjentäisi 142 kaupunkia sinä päivänä, kun
 * ominaisuus julkaistaan.
 *
 * Liuskat piilotetaan kokonaan, jos kategorioita ei ole. Yhden
 * liuskan rivi ei valitse mitään eikä siis kerro mitään.
 */
/*
 * Käsinpiirretty aaltoreuna (arkinAariviiva + piirraArkinReuna)
 * poistettiin v299:ssä: pohja on nyt sanomalehden tyyliin suora
 * leikattu reuna kaikissa kaupungeissa (omistajan päätös). Historia
 * löytyy gitistä hakusanalla "arkinAariviiva".
 */

/**
 * Tutki-ikkunan sivut: taitettu lehti (omistajan toive).
 *
 * "Ensimmäisellä sivulla olisi Lontoo, Iso-Britannia ja sen alla
 * historia — poistetaan nuo keskellä olevat valintanapit kokonaan.
 * Pelaaja voi yksinkertaisesti pyyhkäistä sivuja eteenpäin, jolloin
 * seuraavalle sivulle avautuisi aina yksi aihealue kerrallaan ja sen
 * alueen otsikko lukisi ylhäällä."
 *
 * Sivu 0 on etusivu: kaupunki ja maa, ei mitään muuta. Sivut 1…n ovat
 * yksi aihe kukin. Sivumäärä tulee aineistosta, ei koodista.
 *
 * ETUSIVULLA OLI ENNEN MYÖS ENSIMMÄINEN AIHE. Alkuperäisessä
 * toiveessa se luki mukana ("Lontoo, Iso-Britannia ja sen alla
 * historia"), mutta lopputulos oli epäsymmetrinen: historia oli
 * ainoa aihe ilman omaa sivuaan, se jäi kahden palstan alle
 * jatkoksi eikä sen otsikko aloittanut sivua kuten muiden.
 * Omistajan tarkennus 5.8.2026: *"Lontoon tutki sivun ens. sivu
 * voisi palauttaa alkuperäiseen muotoon ja siirtää historia omalle
 * sivulleen kuten muutkin aiheet."*
 *
 * Entinen kuvakeliuskarivi (rakennaLiuskat) on poistettu. Elementti
 * jää DOM:iin piiloon, jottei index.html ja muut siihen viittaavat
 * kohdat mene rikki.
 */
export function rakennaSivut(ui, cityId) {
  /*
   * Maaosasto takaisin etusivun palstaan: piirraMaaEtusivu siirtää
   * elementin karttasivulle, ja ilman palautusta seuraava kaupunki,
   * jolla karttasivua ei ole, jäisi ilman maaosastoa.
   */
  if (ui.arrivalMaa.parentElement !== ui.arrivalPalstat) {
    ui.arrivalPalstat.appendChild(ui.arrivalMaa);
  }
  // Mediarivi samasta syystä takaisin uutisten kylkeen: maalehti
  // lainaa sen aihesivun kärkeen (ks. naytaTutkiSivu).
  if (ui.arrivalMedia && ui.arrivalOikea
    && ui.arrivalMedia.parentElement !== ui.arrivalOikea) {
    ui.arrivalOikea.appendChild(ui.arrivalMedia);
  }
  // Maa-etusivun kuvanosto ei kuulu etusivun maaosastoon.
  ui.arrivalMaa.querySelector(':scope > .maa-etusivu-nosto')?.remove();
  const kategoriat = cityId ? [...(KULTTUURI_KATEGORIAT[cityId] ?? [])] : [];
  const kaupunginOmia = kategoriat.length;
  /*
   * Kaupungit, joilla ei ole kategorioita mutta on litteä nostolista,
   * saavat yhden sivun nimeltä "Elämää".
   *
   * Ilman tätä nostot katoaisivat kokonaan 79 kaupungista, kun ne
   * siirrettiin pois saapumiskortista. Sama sääntö kuin artikkelin
   * kanssa: ominaisuuden lisääminen ei saa viedä mitään pois niiltä,
   * jotka eivät sitä vielä saa.
   */
  const litteat = cityId ? ((KULTTUURIT[ui.game.pack.id] ?? {})[cityId]?.nostot ?? []) : [];
  if (!kaupunginOmia && litteat.length) {
    kategoriat.push({ id: 'elama', nimi: 'Elämää', nostot: litteat, litteä: true });
  }
  /*
   * Maan aiheet kaupungin sivujen perään (omistajan malli 5.8.2026):
   * lehden kansisivut ovat kaupunkia, sisäsivut maata — sama
   * maapaketti palvelee maan jokaista kaupunkia, vain kansi vaihtuu.
   * Jos kaupungilla on jo sama aihe-id, kaupungin versio voittaa,
   * jotta Lontoon yhdeksän omaa aihetta eivät saa rinnalleen maan
   * kaksoiskappaleita.
   */
  const maanIso = cityId ? ui.game.pack.map?.cityCountry?.[cityId] : null;
  /*
   * Maan sivut erottuvat kaupungin sivuista maan lipulla otsikkorivin
   * oikeassa reunassa (omistajan tarkennus 7.8.2026: "Saksan
   * historia yms. otsikoista voisi ottaa saksan pois ja korvata se
   * lipulla"). Aiempi ratkaisu oli genetiivi otsikossa ("SAKSAN
   * HISTORIA", 6.8.2026) — maanAiheOtsikko ja genetiivitaulu ovat
   * yhä maa-kategoriat.js:ssä muuta käyttöä varten.
   */
  const otsikonMaa = maanIso ? ui.game.pack.map?.countryShapes?.[maanIso]?.nimi : null;
  const maanLippu = maanIso ? ui.game.pack.map?.countryShapes?.[maanIso]?.lippu : null;
  /*
   * Maaosion aloitussivu (omistajan toive 7.8.2026): iso korkokartta
   * kaupunkeineen, ja lehden etusivun maaosasto muuttaa tälle
   * sivulle — kumpikin etusivu on oma tiivistelmänsä, ja seuraavat
   * sivut syventävät. Vain maat, joille on kartta
   * js/packs/maakartat.js:ssä (pilottina Saksa); muut kaupungit
   * näyttävät maaosaston etusivulla entiseen tapaan.
   */
  const maakartta = maanIso && otsikonMaa ? MAAKARTAT[maanIso] ?? null : null;
  /*
   * KAUPUNKILEHTI JA MAALEHTI OVAT ERI LEHTIÄ (v350, omistajan
   * päätös 8.8.2026: "erotetaan kaupunki ja maa lehti toisistaan").
   *
   * Ennen nämä olivat yksi pino: kansi, kaupungin aiheet, maan
   * etusivu, maan aiheet ja numerot. Lontoossa siitä tuli 14 sivua,
   * ja kaupungin oma tarina hukkui maan alle. Nyt kaupunkilehti on
   * 3-4 sivua, ja maa on oma lehtensä, joka avataan kartalta maan
   * nimen "i"-painikkeesta tai Maiden tiedot -varusteella.
   *
   * Sama aihetunnus kaupungilla ja maalla ei enää piilota maan
   * sivua, koska listat ovat erilliset — mutta samaa sisältöä ei
   * silti kannata olla kahdessa paikassa (ks. Lontoon jako v349).
   */
  ui.lehtitila.maanSivut = [];
  if (maakartta) {
    ui.lehtitila.maanSivut.push(maanLippu
      ? {
        id: 'maa-etusivu', nimi: otsikonMaa, kartta: maakartta, maaLippu: maanLippu, maa: otsikonMaa,
      }
      : { id: 'maa-etusivu', nimi: otsikonMaa, kartta: maakartta });
  }
  for (const osa of (maanIso ? MAA_KATEGORIAT[maanIso] ?? [] : [])) {
    ui.lehtitila.maanSivut.push(maanLippu ? { ...osa, maaLippu: maanLippu, maa: otsikonMaa } : osa);
  }
  /*
   * Lehtitaitto (omistajan toive 5.8.2026): aihe, jonka id on
   * 'kaupunki', tekee kaupungista lehtikaupungin. Etusivu rakentuu
   * esittelytekstin ja isojen kuvien varaan, ja maa on samalla
   * sivulla omana osastonaan — kansiosion nostot saavat OMAN sivunsa
   * heti etusivun jälkeen, jottei etusivu veny eivätkä maan
   * ydintiedot huku (omistajan tarkennus 5.8.2026: ensimmäinen
   * versio taittoi nostot etusivulle, ja sivusta tuli liian pitkä).
   * Muut kaupungit näyttävät etusivun entiseen tapaan.
   */
  const kansi = kategoriat.find((k) => k.id === 'kaupunki') ?? null;
  const lehti = Boolean(kansi);
  /*
   * MENOVINKIT NÄKYY MOLEMMISSA LEHDISSÄ (omistajan tilaus 8.8.2026:
   * "tämä sivu voi kattaa koko maan linkit ja saisi näkyä myös maan
   * omalla lehdellä").
   *
   * Sivu ei ole matkaopas vaan lista parhaista paikoista
   * NETTIMATKAAJALLE: museoiden verkkokokoelmat, digitoidut arkistot
   * ja suorat kamerat. Sellainen aineisto on lähes aina koko maan
   * yhteistä — National Gallery ja Kew palvelevat samaa lukijaa
   * riippumatta siitä, mihin noppa vei — joten sisältö asuu
   * maapaketissa yhtenä kappaleena ja lainataan tähän. Kaupungille
   * ei tehdä omaa kopiota: kaksi kopiota ajautuisi erilleen
   * ensimmäisellä päivityksellä.
   *
   * Viimeiseksi sivuksi, koska se on lehden uloskäynti: linkit
   * vievät pelistä pois, ja niiden jälkeen odottaa enää kohtaaminen.
   *
   * Sivu tuodaan maan lipun kanssa (maanSivut on jo varustanut sen),
   * ja se on tarkoitus: lippu kertoo kaupunkilehdessäkin, että nämä
   * osoitteet kattavat koko maan eivätkä vain tätä kaupunkia.
   */
  if (lehti) {
    const vinkit = ui.lehtitila.maanSivut.find((s) => s.id === 'menovinkit');
    if (vinkit) kategoriat.push(vinkit);
  }
  /*
   * "Maa numeroina" viimeiseksi sivuksi jokaiseen kaupunkiin, jolla
   * on maatunnus (docs/valtion-analyysi.md): lehtikaupungissa se on
   * lehden arkkisivu, muualla sama sisältö maalohkon jatkona
   * kevyemmässä kehyksessä — kehys kevenee itsestään, koska
   * lehtitaitto on vain lehtikaupunkien luokka. Sivu lisätään
   * datasta riippumatta — aineisto haetaan laiskasti vasta sivun
   * avautuessa, ja jos sitä ei saada (yhden tiedoston versio ilman
   * verkkoa), sivu kertoo sen kohteliaasti itse.
   */
  if (maanIso) {
    // Otsikossa maan nimi kuten muillakin maan sivuilla (omistajan
    // toive 7.8.2026: "muuta myös maa numeroina sivu esim. Egypti
    // numeroina muotoon") — tässä nominatiivissa, koska "numeroina"
    // on jo taivutettu: "EGYPTI NUMEROINA".
    const nimi = otsikonMaa ? `${otsikonMaa} numeroina` : 'Maa numeroina';
    // Numerot ovat maan tietoa, joten ne kuuluvat maalehteen.
    ui.lehtitila.maanSivut.push({ id: 'maa-numeroina', nimi, numerot: maanIso });
  }
  ui.lehtitila.tutkiLehti = lehti;
  // Karttamaissa maaosasto ei asu etusivulla: kulmalinkki vie sen
  // omalle sivulleen, eikä sama sisältö saa näkyä kahdesti.
  ui.lehtitila.tutkiMaaEtusivu = Boolean(maakartta);
  if (maakartta) ui.arrivalMaa.hidden = true;
  ui.lehtitila.tutkiMaaIso = maanIso;
  ui.lehtitila.tutkiMaaNimi = otsikonMaa ?? null;
  // Liitelinkki päiväysrivillä: "Suomi-liite" (omistajan taitto-ohje 9.8.2026).
  ui.arrivalMaaLinkki.textContent = maakartta ? `${otsikonMaa}-liite` : '';
  ui.arrivalDialog.classList.toggle('lehti', lehti);
  piirraLehtiKuvat(ui, kansi?.kansikuvat, kansi?.avauskuvat);
  // Lehdessä ei ole Lue lisää -nappeja eikä wikin kuvakarusellia:
  // etusivun tekstit riittävät alkuun, ja syventyminen tapahtuu
  // sivuja kääntämällä. Kuvat ovat omia, tarkistettuja valintoja.
  if (lehti) {
    ui.arrivalWiki.hidden = true;
    ui.arrivalMaaWiki.hidden = true;
    ui.arrivalKuvakotelo.hidden = true;
  }
  ui.arrivalLehtiYla.hidden = !lehti;
  // Päiväysrivi kuin lehden nimiön alla: maa ja monesko matkapäivä.
  // Maan nimi on omassa spanissaan, koska kapealla ruudulla se
  // väistyy liitelinkin tieltä (linkki peitti päiväyksen iPhonella,
  // omistajan havainto 9.8.2026) — linkissä lukee sama maa, joten
  // tieto ei katoa. CSS: .pvm-maa.
  const maanNimi = ui.lehtitila.arrivalMaaTiedot?.nimi;
  ui.arrivalLehtiPvm.replaceChildren();
  if (lehti) {
    if (maanNimi) ui.arrivalLehtiPvm.appendChild(html('span', 'pvm-maa', `${maanNimi} · `));
    ui.arrivalLehtiPvm.appendChild(document.createTextNode(`${ui.game.dayCount()}. matkapäivä`));
  }
  ui.arrivalLehtiAla.hidden = !lehti;
  naytaLehtiSaa(ui, lehti ? cityId : null);
  ui.arrivalLiuskat.replaceChildren();
  ui.arrivalLiuskat.hidden = true;
  ui.lehtitila.tutkiSivut = kategoriat;
  // Kansi talteen sisällysvalikkoa varten: Etusivu-rivi saa siitä
  // pikkukuvan ja ingressin kuten muutkin rivit (omistajan havainto
  // 14.8.2026: "Kannesta puuttuu kuva ja tekstit").
  ui.lehtitila.tutkiKansi = kansi ?? null;
  // Kaupunkilehti aukeaa aina kaupunkitilassa; maalehti on oma
  // näkymänsä, joka avataan kartalta (avaaMaalehti).
  ui.lehtitila.tutkiTila = 'kaupunki';
  ui.lehtitila.tutkiMaaLehti = null;
  // Vasta tässä tiedetään, onko maaosasto omalla sivullaan, joten
  // mediarivit ratkaistaan uudestaan (ks. paivitaMediarivit).
  paivitaMediarivit(ui);
  naytaTutkiSivu(ui, 0, { heti: true });
}

/**
 * Sivumäärä: etusivu ja sen jälkeen yksi sivu aihetta kohti.
 *
 * Etusivu on aina olemassa, aiheita voi olla nolla — silloin sivuja on
 * yksi eikä alanappeja piirretä lainkaan (paivitaTutkiAlapalkki).
 */
export function tutkiSivuja(ui) {
  return 1 + (ui.lehtitila.tutkiSivut?.length ?? 0);
}

/**
 * Ensimmäinen selattava sivu. Kaupunkilehdessä se on kansi (0),
 * maalehdessä ensimmäinen sisältösivu (1): maalehdellä ei ole
 * kantta, ja ilman alarajaa taaksepäin selaus päätyi tyhjälle
 * nimiösivulle (omistajan havainto 10.8.2026 ilta: "mailla on myös
 * tällaiset oudot etusivut"). Sivunumerointi alkaa samasta rajasta,
 * joten maalehti näyttää 1/8 eikä 2/9.
 */
export function tutkiEkaSivu(ui) {
  // Maalehdellä ja kehittäjän liitteillä ei ole kaupunkikantta:
  // indeksi 0 on kaupunkilehden etusivu, jota niillä ei ole.
  return (ui.lehtitila.tutkiTila === 'maa' || ui.lehtitila.tutkiTila === 'kehittaja') ? 1 : 0;
}

/**
 * Näyttää yhden sivun. Etusivulla (0) ovat kaupunki- ja maapalstat sekä
 * kulttuurivisa; aihesivuilla vain aihe, jotta luettava alkaa heti
 * otsikosta.
 */
export function naytaTutkiSivu(ui, indeksi, { heti = false, suunta = 0 } = {}) {
  // Arkki oikeaan leveyteen ENNEN sivun rakentamista: sivun sisällä
  // on kortin leveydestä mitoitettavia piirroksia (kohdekartta,
  // maakäyrät, tilastopalkit), ja niiden on nähtävä lopullinen mitta.
  ui.mitoitaArkki();
  const sivuja = tutkiSivuja(ui);
  const i = Math.min(Math.max(indeksi, tutkiEkaSivu(ui)), sivuja - 1);
  ui.lehtitila.tutkiSivu = i;
  const etusivu = i === 0;
  if (ui.arrivalPalstat) ui.arrivalPalstat.hidden = !etusivu;
  /*
   * Visa on pelitoiminto ja kuuluu saapumiseen, ei luettaviin
   * sivuihin. Lehtikaupungissa se asuu kaupungin omalla sivulla
   * (sivu 1) eikä etusivulla — etusivun päätehtävä on kohtaaminen,
   * eikä visa saa kilpailla sen kanssa (omistajan tarkennus
   * 5.8.2026). Muilla kaupungeilla visa pysyy etusivulla.
   */
  /*
   * Visa on saapumisen pelitoiminto: siitä saa puntia siitä
   * kaupungista, johon pelaaja juuri saapui. Maalehti avataan
   * kartalta mistä tahansa maasta, joten siellä visa olisi väärässä
   * paikassa — ja Maiden tiedot -varusteella sen voisi pelata
   * matkustamatta minnekään.
   */
  const visasivu = ui.lehtitila.tutkiTila !== 'maa' && ui.lehtitila.tutkiTila !== 'kehittaja'
    && (ui.lehtitila.tutkiLehti && sivuja > 1 ? i === 1 : etusivu);
  ui.arrivalKulttuuri.hidden = !visasivu || !ui.lehtitila.kulttuuriSaatavilla;

  // Kaupungin kohdekartta lehden etusivun loppuun (omistajan
  // tarkennus 7.8.2026: "kartta pitäisi olla jo ihan ensimmäisellä
  // sivulla" — aiemmin kaupunki-aihesivun pohjalla). Piirto on
  // kevyt ja kuva paikallinen, joten se tehdään joka avauksella.
  /*
   * Vain kaupunkilehdessä: maalehden nimiösivu on myös indeksi 0,
   * ja ilman tutkiTila-ehtoa Suomen lehden ensimmäisellä sivulla
   * luki "Kaupunki kartalla" ja alla oli Helsingin kohdekartta
   * (omistajan havainto 9.8.2026). Vika näkyi silloin, kun maalehti
   * avattiin kaupunkilehden liitenapista, koska arrivalShownFor
   * osoittaa yhä kaupunkiin.
   */
  const karttaEtusivulla = etusivu && ui.lehtitila.tutkiTila !== 'maa'
    && KAUPUNKIKARTAT[ui.lehtitila.arrivalShownFor];
  ui.arrivalKaupunkiKartta.hidden = !karttaEtusivulla;
  ui.arrivalKaupunkiKartta.replaceChildren();
  if (karttaEtusivulla) {
    piirraKaupunkiKartta(ui, ui.arrivalKaupunkiKartta);
    // Matkailijalle-osio kartan JÄLKEEN (omistajan sijoituspäätös
    // 15.8.2026: "se voisi olla itseasissa kartan jälkeen").
    piirraMatkailijalle(ui, ui.arrivalKaupunkiKartta);
  }

  /*
   * Kaupunkilehden radiorivi asuu palstojen ulkopuolella kohdekartan
   * yllä (omistajan taitto-ohje 9.8.2026: "radio napin voisi siirtää
   * ennen kaupunki kartalla kohtaan"), joten se ei enää peity
   * palstojen mukana — sivukohtainen näkyvyys ratkaistaan tässä.
   * Sisällön täyttää paivitaMediarivit ennen tätä; maalehdessä rivi
   * ei näy, koska siellä radio on maaosaston omalla rivillä.
   */
  if (ui.arrivalMediaKaupunki) {
    ui.arrivalMediaKaupunki.hidden = ui.lehtitila.tutkiTila === 'maa' || !etusivu
      || !ui.arrivalMediaKaupunki.childElementCount;
  }

  // Etusivu ei ole aihesivu, joten aiheiden numerointi alkaa vasta
  // sivulta 1: sivu 1 on ensimmäinen aihe, ei toinen.
  const kategoria = etusivu ? null : (ui.lehtitila.tutkiSivut?.[i - 1] ?? null);
  // Kulmalinkki maaosioon näkyy vain karttamaan etusivulla.
  ui.arrivalMaaLinkki.hidden = !etusivu || !ui.lehtitila.tutkiMaaEtusivu;
  // Karttasivu ja tilastosivu piirtyvät omilla piirroillaan — ne
  // ovat karttaa ja käyriä, eivät nostolistoja.
  ui.arrivalKategoria.classList.toggle('maa-etusivu', Boolean(kategoria?.kartta));
  if (kategoria?.kartta) piirraMaaEtusivu(ui, kategoria);
  else if (kategoria?.numerot) piirraMaaNumerotSivu(ui, kategoria);
  else piirraKategoria(ui, kategoria);
  ui.arrivalKategoria.hidden = !kategoria;
  /*
   * Mediarivi maalehden ensimmäiselle sivulle myös silloin, kun
   * maalla ei ole korkokarttaa.
   *
   * Karttamailla rivi tulee maaosaston mukana (piirraMaaEtusivu
   * siirtää arrivalMaan sivulle). Ruotsilla ja Espanjalla karttaa ei
   * vielä ole, joten niiden maalehti alkaa suoraan aihesivusta eikä
   * radiota näkyisi lainkaan — juuri sitä omistaja pyysi
   * korjaamaan. Rivi siirretään, ei kopioida: sama elementti palaa
   * paikalleen seuraavalla rakennaSivut-ajolla.
   */
  if (ui.lehtitila.tutkiTila === 'maa' && i === 1 && !kategoria?.kartta
    && ui.arrivalMedia && !ui.arrivalMedia.hidden) {
    ui.arrivalKategoria.insertBefore(ui.arrivalMedia, ui.arrivalKategoria.firstChild);
  }

  // Liike kertoo suunnan; ilman sitä sivu vain vaihtuu paikallaan.
  ui.arrivalKategoria.classList.remove('sivu-vasemmalta', 'sivu-oikealta');
  if (!heti && suunta) {
    // Uudelleenkäynnistys vaatii välissä asettelun lukemisen.
    void ui.arrivalKategoria.offsetWidth;
    ui.arrivalKategoria.classList.add(suunta > 0 ? 'sivu-oikealta' : 'sivu-vasemmalta');
  }

  paivitaTutkiNavi(ui);
  // Uusi sivu alkaa alusta, ei edellisen sivun vierityskohdasta.
  const kortti = ui.arrivalDialog.querySelector('.dialog-card');
  if (kortti) kortti.scrollTop = 0;
  /*
   * Kaiutin sivun ylälaitaan. Sivunvaihto pysäyttää käynnissä olevan
   * luennan: lukija ei saa jatkaa edellisen sivun tekstiä sen
   * jälkeen kun sivu on jo kääntynyt.
   */
  pysaytaLukija();
  const kaiutin = varustaLukija(ui, ui.arrivalDialog,
    () => ui.arrivalDialog.querySelector('.dialog-card'),
    // Lehden sivuilla luennalla on minne jatkaa: jatkuva luenta
    // (paneelin kytkin) kääntää sivun ja lukee eteenpäin.
    { jatko: () => jatkaLehdenLuentaa(ui) });
  sijoitaLehtiKaiutin(ui, kaiutin);
  /*
   * VIEREISET SIVUT VALMIIKSI heti, kun tämä sivu on näkyvissä
   * (Etukäteispuskurin periaate): sivunkääntö ei saa jäädä
   * odottamaan verkkoa. Kutsu tulee sivun piirron JÄLKEEN, jotta
   * näkyvä sivu saa yhteyden ensin — ja koska naytaTutkiSivu ajetaan
   * myös lehden avautuessa, sama koukku kattaa sekä avaamisen että
   * jokaisen käännöksen.
   */
  esilataaViereisetSivut(ui, i);
}

/**
 * Sivujen `sivu ± 1` kuvat taustalle.
 *
 * Sivu 0 on etusivu ja aiheet alkavat sivulta 1, joten sivun n
 * sisältö on tutkiSivut[n - 1]. Listan päät jäävät itsestään pois.
 *
 * MYÖS EDELLINEN (omistajan tarkennus 15.8.2026): sisällysvalikosta
 * voi hypätä keskelle lehteä, jolloin kumpikaan naapuri ei ole
 * käynyt näytöllä — takaisin selaaminen olisi silloin yhtä hidasta
 * kuin eteenpäin ilman puskuria. Jo haetut osoitteet eivät lähde
 * uudelleen (esipuskuroiKuvat pitää kirjaa).
 */
export function esilataaViereisetSivut(ui, sivu) {
  const kuvat = [...ui.lehdenSivunKuvat(ui.lehtitila.tutkiSivut?.[sivu] ?? null)];
  if (sivu - 2 >= 0) {
    kuvat.push(...ui.lehdenSivunKuvat(ui.lehtitila.tutkiSivut?.[sivu - 2] ?? null));
  } else if (sivu === 1 && ui.lehtitila.tutkiTila !== 'maa') {
    // Ensimmäisen aihesivun edellinen on lehden etusivu; maalehdellä
    // sitä ei ole (tutkiEkaSivu on siellä 1).
    kuvat.push(...ui.kaupunkilehdenEtusivunKuvat());
  }
  ui.esipuskuroiKuvat(kuvat);
}

/**
 * Kaiutin asuu tarttuvan otsikkorivin SISÄLLÄ kuten hampurilainen
 * (omistaja 14.8.2026: "lukita lukija napin oikeaan reunaan samalle
 * korkeudelle") — dialogiin kiinnitettynä se jäi eri korkeudelle
 * kuin otsikko, ja korkeusero vaihteli lehtityypin mukaan.
 * Sivunpiirto pyyhkii aihe-otsikot, joten siirto tehdään joka
 * sivunäytöllä; ks. varmistaLehtiHampurilainen, jossa sama syy.
 */
export function sijoitaLehtiKaiutin(ui, nappi) {
  if (!nappi) return;
  const etusivulla = (ui.lehtitila.tutkiSivu ?? 0) === 0;
  const koti = (etusivulla ? ui.arrivalCity
    : ui.arrivalKategoria?.querySelector('.aihe-nimi')) ?? ui.arrivalCity;
  if (koti && nappi.parentElement !== koti) koti.appendChild(nappi);
}

/**
 * Kaiutinnappi tekstisisältösivulle — yksi yhteinen apuri kaikille
 * kolmelle ikkunalle (lehti, nähtävyysjuttu, "Lue lisää").
 *
 * Luettava teksti kootaan aina samalla valinnalla (js/lukija.js
 * kokoaLuettavaTeksti), joten lähteet, kuvatekstit ja visan
 * vaihtoehdot jäävät pois ilman että sivutyyppejä tarvitsee tuntea.
 * Piilotettu sivu jää pois itsestään, koska valinta ohittaa
 * [hidden]-elementit — lehden kaikki sivut asuvat samassa dialogissa.
 */
export function varustaLukija(ui, dialogi, haeJuuri, { seuraa = false, jatko = null } = {}) {
  const nappi = liitaLukija(dialogi, haeJuuri, { luokka: 'lukija-sivu', seuraa, jatko });
  paivitaLukija(nappi);
  return nappi;
}

/**
 * Jatkuvan luennan sivunvaihto (omistajan tilaus 15.8.2026: "auto
 * moodi toggle, joka vaihtaa lehden sivua eteenpäin automaattisesti
 * ja jatkaa lukemista"). Kutsutaan lukijasta, kun sivun luenta
 * päättyi omia aikojaan ja automoodi on päällä.
 *
 * Sivut, joilla ei ole luettavaa (pelkkä kartta- tai kuvasivu,
 * kaiutin piilossa), ohitetaan — luenta jatkuu seuraavalta
 * tekstisivulta. Viimeisen sivun jälkeen palautetaan false ja
 * luenta jää siihen: lehti ei ala alusta itsekseen.
 */
export function jatkaLehdenLuentaa(ui) {
  if (!ui.arrivalDialog?.open) return false;
  const sivuja = tutkiSivuja(ui);
  for (let hyppy = 0; hyppy < sivuja; hyppy += 1) {
    if (!vaihdaTutkiSivu(ui, 1)) return false;
    const nappi = ui.arrivalDialog.querySelector('.lukija-nappi');
    // Yläotsikko luetaan mukaan: kuulija ei nähnyt sivun vaihtuvan,
    // joten otsikko kertoo minne tultiin (omistajan tilaus 15.8.2026).
    if (nappi && !nappi.hidden) return kaynnistaLukija(nappi, { lueOtsikko: true });
  }
  return false;
}

/**
 * Maalehti omana näkymänään (omistajan päätös 8.8.2026: "erotetaan
 * kaupunki ja maa lehti toisistaan ... maan sivuille pääsisi nyt
 * suoraan kartalta").
 *
 * Sama arkki ja sama sivunkääntö kuin kaupunkilehdellä — vain
 * sivulista vaihtuu. Näin koko taitto, kuvien suurennus ja
 * pyyhkäisyselaus tulevat ilmaiseksi eikä mitään tarvitse toistaa.
 *
 * Kaupunkilehteen palataan sulkemalla; maalehti ei ole kaupungin
 * sivujen jatke vaan rinnakkainen lehti.
 */
export function avaaMaalehti(ui, iso, { nimi = null } = {}) {
  const maa = ui.game?.pack?.map?.countryShapes?.[iso];
  if (!maa) return;
  // Maalehti vaihtaa sisällön JO AUKI OLEVAAN dialogiin, joten
  // lukija.js:n keskitetty ponnahdusikkunasääntö ei näe avausta —
  // kaupunkilehden luenta vaiennetaan tässä (omistajan tilaus
  // 15.8.2026: "myös maalehden aukaisu ei pysäytä lukijaa").
  pysaytaLukija();
  // Mitta kuntoon ennen sivutusta, kuten kaupunkilehdessäkin.
  ui.varmistaLehtiMitta();
  const otsikko = nimi ?? maa.nimi;
  const sivut = [];
  /*
   * SISÄLLYSLUETTELOSIVUA EI OLE (omistajan päätös 8.8.2026: "Tämän
   * sivun voi ottaa pois kokonaan kun hampurilainen korvaa tuon").
   *
   * Vaiheet: ennen v366:ta etusivuna oli maan korkokartta, sitten
   * sisällysluettelo, ja nyt ei kumpaakaan omana sivunaan. Sama
   * luettelo aukeaa alapalkin hampurilaisesta pop-uppina miltä
   * tahansa sivulta, joten oma sivu oli vain yksi ylimääräinen
   * käännös ennen sisältöä.
   *
   * Kartta ei katoa: se on lehden ensimmäinen sivu niillä mailla,
   * joilla se on.
   */
  const kartta = MAAKARTAT[iso];
  const aiheet = (MAA_KATEGORIAT[iso] ?? [])
    .map((osa) => (maa.lippu ? { ...osa, maaLippu: maa.lippu, maa: otsikko } : osa));
  const numerot = { id: 'maa-numeroina', nimi: `${otsikko} numeroina`, numerot: iso };
  const sisalto = [
    // Otsikkona pelkkä maan nimi ja lippu perässä, ks. maalehdenEkaSivu.
    ...(kartta ? [maa.lippu
      ? {
        id: 'maa-etusivu', nimi: otsikko, kartta, maaLippu: maa.lippu, maa: otsikko,
      }
      : { id: 'maa-etusivu', nimi: otsikko, kartta }] : []),
    ...aiheet,
    numerot,
  ];
  if (!sisalto.length) return;
  sivut.push(...sisalto);

  /*
   * Maalehdellä ei ole kaupungin osia: ei kansikuvia, ei säärivi
   * eikä kohtaamista. Ne piilotetaan tässä, ja kaupunkilehti
   * palauttaa ne omalla rakennaSivut-ajollaan.
   */
  ui.lehtitila.tutkiTila = 'maa';
  ui.lehtitila.tutkiMaaLehti = iso;
  ui.lehtitila.tutkiSivut = sivut;
  ui.lehtitila.tutkiKansi = null;
  ui.lehtitila.tutkiLehti = true;
  ui.lehtitila.tutkiMaaEtusivu = false;
  ui.arrivalDialog.classList.add('lehti', 'arkki');
  ui.arrivalDialog.classList.toggle('maalehti', true);
  piirraLehtiKuvat(ui, null);
  ui.arrivalPalstat.hidden = true;
  ui.arrivalKulttuuri.hidden = true;
  /*
   * Saapumisen vakiolause pois maalehdestä (omistajan päätös
   * 8.8.2026): "Isoisä on merkinnyt tämän paikan karttaansa" on
   * oikein kaupunkilehdessä mutta ei maalehdessä — isoisä merkitsee
   * karttaansa PAIKKOJA, ei valtioita. Lause jää edelleen
   * kaupunkilehteen, jossa se on kirjoitettu.
   */
  ui.arrivalIntro.textContent = '';
  ui.arrivalIntro.hidden = true;
  ui.arrivalLehtiYla.hidden = false;
  ui.arrivalCity.textContent = otsikko;
  ui.arrivalLehtiPvm.textContent = 'Maan oma lehti';
  /*
   * Maaosasto täytetään SEN maan tiedoilla, jonka lehti avataan.
   * openArrival täyttää osaston pelaajan oman maan mukaan, ja
   * Maiden tiedot -varusteella avattu vieraan maan lehti näyttäisi
   * muuten edellisen maan luvut, uutiset ja esittelyn (kartan
   * vasen palsta oli pahimmillaan kokonaan tyhjä — omistajan
   * havainto 10.8.2026 ilta).
   */
  ui.lehtitila.arrivalMaaTiedot = maa;
  ui.arrivalMaaNimi.textContent = otsikko;
  ui.arrivalMaaIntro.textContent = '';
  ui.arrivalMaaWiki.hidden = true;
  ui.arrivalMaaLippu.hidden = true;
  if (maa.lippu) {
    ui.arrivalMaaLippu.alt = `${otsikko} — lippu`;
    asetaKuva(ui.arrivalMaaLippu, lippuUrl(maa.lippu, 96), lippuVara(maa.lippu, 96));
  } else {
    ui.arrivalMaaLippu.removeAttribute('src');
  }
  ui.arrivalMaaKartta.textContent = '';
  const minikartta = ui.piirraMaakartta(iso, null);
  if (minikartta) ui.arrivalMaaKartta.appendChild(minikartta);
  naytaMaaTunnusluvut(ui, iso);
  // Uutisten dialogivartija vertaa arrivalShownForiin — se osoittaa
  // yhä viimeksi avattuun kaupunkiin, joten se kelpaa tässä avaimeksi.
  naytaMaaUutiset(ui, iso, ui.lehtitila.arrivalShownFor);
  const maanAvain = maa.wiki ?? maa.nimi;
  const omaMaaIntro = ARTIKKELIT[maanAvain]?.intro;
  if (omaMaaIntro) {
    ui.arrivalMaaIntro.textContent = omaMaaIntro;
  } else {
    cachedSummary(maanAvain).then((summary) => {
      // Lehti on voitu sulkea tai vaihtaa toiseen maahan haun aikana.
      if (!ui.arrivalDialog.open || ui.lehtitila.tutkiMaaLehti !== iso) return;
      if (summary?.extract) ui.arrivalMaaIntro.textContent = shortIntro(summary.extract);
    });
  }
  ui.arrivalLehtiAla.hidden = false;
  naytaLehtiSaa(ui, null);
  if (!ui.arrivalDialog.open) ui.arrivalDialog.showModal();
  // Lukemisen ajaksi äänimaisema madaltuu; close-kuuntelija (constructor)
  // palauttaa sen, sulkeutuipa lehti mitä reittiä tahansa.
  hiljennaAmbienssi('lehti');
  const arkki = ui.arrivalDialog.querySelector('.dialog-card');
  if (arkki) kytkeTutkiSelaus(ui, arkki);
  // Radio ja tv seuraavat lehteä: maalehdessä ne ovat SEN maan,
  // ei sen, jossa pelaaja sattuu seisomaan (ks. paivitaMediarivit).
  paivitaMediarivit(ui);
  // Maalehti alkaa maan etusivulta (indeksi 0 on kaupunkilehden
  // kansi, jota maalehdellä ei ole — siksi sivu 1).
  naytaTutkiSivu(ui, 1, { heti: true });
}

/**
 * Kehittäjän liite: mikä tahansa jäsennelty sisältö luettavana
 * lehtenä (omistajan tilaus 15.8.2026: "Tee raamatussa selattava
 * lehti peliin ... Yritetään jatkossa pitää työhuone integroituna
 * suoraan peliin kehittäjä vivun ollessa päällä").
 *
 * Sama arkki ja sivunkääntö kuin maalehdellä — sivunvaihdot,
 * sisällysvalikko, lukija ja etukäteispuskuri tulevat ilmaiseksi.
 * Sivut ovat synteettisiä aihekategorioita (nimi + nostot), joten
 * piirraKategoria taittaa ne kuten minkä tahansa aihesivun.
 */
export function avaaKehittajaLehti(ui, otsikko, sivut) {
  if (!kehittajaTilaPaalla() || !sivut?.length) return;
  ui.varmistaLehtiMitta();
  ui.lehtitila.tutkiTila = 'kehittaja';
  ui.lehtitila.tutkiMaaLehti = null;
  ui.lehtitila.tutkiSivut = sivut;
  ui.lehtitila.tutkiKansi = null;
  ui.lehtitila.tutkiLehti = true;
  ui.lehtitila.tutkiMaaEtusivu = false;
  ui.arrivalDialog.classList.add('lehti', 'arkki');
  ui.arrivalDialog.classList.toggle('maalehti', true);
  piirraLehtiKuvat(ui, null);
  ui.arrivalPalstat.hidden = true;
  ui.arrivalKulttuuri.hidden = true;
  ui.arrivalIntro.textContent = '';
  ui.arrivalIntro.hidden = true;
  ui.arrivalLehtiYla.hidden = false;
  ui.arrivalCity.textContent = otsikko;
  ui.arrivalLehtiPvm.textContent = 'Kehittäjän liite';
  ui.arrivalLehtiAla.hidden = false;
  naytaLehtiSaa(ui, null);
  if (!ui.arrivalDialog.open) ui.arrivalDialog.showModal();
  hiljennaAmbienssi('lehti');
  const arkki = ui.arrivalDialog.querySelector('.dialog-card');
  if (arkki) kytkeTutkiSelaus(ui, arkki);
  naytaTutkiSivu(ui, 1, { heti: true });
}

/** Raamattu lehtenä: johdanto + jokainen osio omana sivunaan. */
export function avaaRaamattuLehti(ui) {
  const sivut = [{
    id: 'raamattu-johdanto',
    nimi: 'Raamattu',
    yksipalsta: true,
    nostot: [{
      otsikko: `Päivitetty ${RAAMATTU.paivitetty}`,
      teksti: RAAMATTU.johdanto,
    }],
  }, ...RAAMATTU.osiot.map((osio, i) => {
    // Valmiusaste värichippinä otsikossa "Tila:"-rivin sijaan.
    const valmis = (osio.tila ?? '').startsWith('hyväksytty');
    return {
      id: `raamattu-${i}`,
      nimi: osio.otsikko,
      yksipalsta: true,
      tagi: { teksti: valmis ? 'valmis' : 'kesken', luokka: valmis ? 'valmis' : 'kesken' },
      // Tyhjä rivi kohtien välissä = oma kappale taitossa
      // (jaaKappaleiksi kunnioittaa kirjoittajan kappalerajoja).
      nostot: [{
        teksti: (osio.kohdat ?? []).join('\n\n'),
      }],
    };
  })];
  avaaKehittajaLehti(ui, 'Raamattu', sivut);
}

/** Työhuoneen tilannetaulut lehtenä: tilanne + testattavaa. */
export function avaaTilanneLehti(ui) {
  const sivut = [{
    id: 'tilanne-taulu',
    nimi: 'Tilanne',
    yksipalsta: true,
    nostot: [{
      otsikko: TILANNE.paivitetty,
      teksti: TILANNE.tavoite,
    }, ...(TILANNE.rivit ?? []).map((rivi) => ({
      otsikko: `${rivi.tekija} — ${rivi.rooli} (${rivi.tila})`,
      teksti: [rivi.tehtava, rivi.seuraavaksi ? `Seuraavaksi: ${rivi.seuraavaksi}` : '']
        .filter(Boolean).join('\n\n'),
    }))],
  }, {
    id: 'tilanne-testattavaa',
    nimi: 'Testattavaa',
    yksipalsta: true,
    // Äärimmäisen minimalistinen (omistajan linjaus 15.8.2026):
    // pelkkiä viivarivejä, rivi per kappale.
    nostot: [{
      teksti: (TESTATTAVAA ?? []).map((rivi) => `— ${rivi}`).join('\n\n'),
    }],
  }];
  avaaKehittajaLehti(ui, 'Tilannelehti', sivut);
}

/** Sivun vaihto suuntaan (+1 seuraava, -1 edellinen). */
export function vaihdaTutkiSivu(ui, suunta) {
  const sivuja = tutkiSivuja(ui);
  const uusi = (ui.lehtitila.tutkiSivu ?? 0) + suunta;
  if (uusi < tutkiEkaSivu(ui) || uusi >= sivuja) return false;
  sfx.play('paper');
  naytaTutkiSivu(ui, uusi, { suunta });
  return true;
}

/**
 * Alalaidan sivupilleri ‹ 2/7 › poistui (omistaja 14.8.2026: "Nuoli
 * alas ja ala navigointi pois kokonaan") — sivut vaihtuvat
 * pyyhkäisyllä, sivun lopun alanapeilla ja sisällysvalikosta.
 * Poisto siivoaa vanhan pillerin myös ennen v666:tta avatusta
 * dialogista.
 */
export function paivitaTutkiNavi(ui) {
  ui.arrivalDialog.querySelector(':scope > .tutki-navi')?.remove();
  paivitaTutkiAlapalkki(ui);
}

/**
 * Lehden alapalkki (omistajan päätös 8.8.2026: "muuta kaupunkilehden
 * navigointi alas niin että tapaa henkilö x on vasta viimeisellä
 * sivulla. aiemmilla sivuilla on nappi seuraavalle (ja edelliselle
 * jos on) sekä poistu").
 *
 * Kohtaaminen on lehden PÄÄTEPISTE: se ei kilpaile lukemisen kanssa
 * vaan odottaa, kunnes lehti on luettu. Sitä ennen alapalkki on
 * pelkkää navigointia.
 *
 * Maalehdellä ei ole kohtaamista lainkaan — siellä viimeiselläkin
 * sivulla on vain Poistu.
 */
export function paivitaTutkiAlapalkki(ui) {
  const kyllä = document.getElementById('arrival-yes');
  const ei = document.getElementById('arrival-no');
  if (!kyllä || !ei) return;
  const sivuja = tutkiSivuja(ui);
  const viimeisella = (ui.lehtitila.tutkiSivu ?? 0) >= sivuja - 1;
  const etusivulla = (ui.lehtitila.tutkiSivu ?? 0) === 0;
  const maalehti = ui.lehtitila.tutkiTila === 'maa';
  /*
   * Kohtaaminen/kätkö JOKAISEN kaupunkisivun alareunassa
   * (omistajan tarkennus 9.8.2026: "etsi kätkö pitää olla
   * jokaisen kaupunkisivun alareunassa") — täysleveä palkki, jota
   * ei tarvitse etsiä miltään tietyltä sivulta.
   */
  /*
   * Tehtävänapin tila lasketaan keskitetysti (tehtavaNapinTila):
   * kohtaamisen vaiheet, pulma/laatta ja harmaa loppuasento.
   * Maalehdellä nappia ei ole lainkaan.
   */
  if (maalehti) {
    kyllä.hidden = true;
  } else {
    const kaupunki = ui.game.board?.cityById?.get(ui.lehtitila.arrivalShownFor) ?? null;
    if (kaupunki) ui.paivitaTehtavaNappi(kaupunki);
    else kyllä.hidden = true;
  }
  ei.textContent = maalehti || viimeisella ? 'Poistu' : 'Poistu lehdestä';

  /*
   * "Lue X-liite" kaupunkilehden viimeiselle sivulle (omistajan
   * toive 9.8.2026): lehden lopusta pääsee suoraan maalehteen,
   * jossa pitkä versio asuu. Nappi rakennetaan kerran ja
   * päivitetään sivun mukana.
   */
  let liite = ui.arrivalDialog.querySelector(':scope .maa-liite-nappi');
  if (!liite) {
    liite = html('button', 'maa-liite-nappi');
    liite.type = 'button';
    liite.addEventListener('click', () => {
      if (ui.lehtitila.tutkiMaaIso) avaaMaalehti(ui, ui.lehtitila.tutkiMaaIso);
    });
    ei.parentElement?.appendChild(liite);
  }
  const liiteNimi = ui.lehtitila.tutkiMaaNimi;
  liite.hidden = maalehti || !viimeisella || !ui.lehtitila.tutkiMaaIso || !liiteNimi;
  // Pelkkä "Suomi-liite" (omistajan tarkennus 9.8.2026).
  liite.textContent = liiteNimi ? `${liiteNimi}-liite` : '';

  let palkki = ui.arrivalDialog.querySelector(':scope .tutki-alanapit');
  if (!palkki) {
    palkki = html('div', 'tutki-alanapit');
    /*
     * Napin sisällä on kaksi riviä: suunta ja sen alla pienellä se
     * aihe, jolle nappi vie (omistajan toive 8.8.2026). "Seuraava"
     * kertoo vain että jotain tulee; "Seuraava — Ruokaa ja
     * tapakulttuuria" kertoo kannattaako mennä.
     */
    const tee = (luokka, teksti, suunta) => {
      const nappi = html('button', `tutki-alanappi ${luokka}`);
      nappi.type = 'button';
      nappi.appendChild(html('span', 'alanappi-suunta', teksti));
      nappi.appendChild(html('span', 'alanappi-aihe'));
      nappi.addEventListener('click', () => vaihdaTutkiSivu(ui, suunta));
      palkki.appendChild(nappi);
      return nappi;
    };
    tee('edellinen', 'Edellinen', -1);
    tee('seuraava', 'Seuraava', 1);
    /*
     * Hampurilaisvalikko sisällysluetteloon (omistajan toive
     * 8.8.2026). Sisällys on etusivulla, mutta sivulta 5 sinne
     * pääsisi muuten vain selaamalla takaisin — valikko tekee
     * hypystä yhden napautuksen mistä tahansa.
     */
    const valikko = html('button', 'tutki-alanappi sisallysnappi');
    valikko.type = 'button';
    valikko.title = 'Sisällys';
    valikko.setAttribute('aria-label', 'Sisällys');
    valikko.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none"'
      + ' stroke="currentColor" stroke-width="1.8" stroke-linecap="round">'
      + '<path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    valikko.addEventListener('click', () => avaaSisallysvalikko(ui));
    palkki.appendChild(valikko);
    ei.parentElement?.insertBefore(palkki, ei);
  }

  // Aihe nappien alle: mihin sivulle kumpikin suunta vie.
  const sivunNimi = (i) => {
    // Sivu 0 on molemmissa lehdissä nimiö ja esittely. Maalehdessä
    // se luki ennen "Sisällys", koska sisällysluettelo oli oma
    // sivunsa — nyt luettelo on vain alapalkin pop-upissa.
    if (i <= 0) return 'Etusivu';
    return ui.lehtitila.tutkiSivut?.[i - 1]?.nimi ?? '';
  };
  const nyt = ui.lehtitila.tutkiSivu ?? 0;
  const edellinen = palkki.querySelector('.edellinen');
  const seuraava = palkki.querySelector('.seuraava');
  edellinen.querySelector('.alanappi-aihe').textContent = sivunNimi(nyt - 1);
  seuraava.querySelector('.alanappi-aihe').textContent = sivunNimi(nyt + 1);
  // Maalehdessä taakse ei pääse sivulle 0 (tyhjä nimiösivu, ks.
  // tutkiEkaSivu) — nappi pois kun ollaan ensimmäisellä oikealla.
  edellinen.hidden = nyt <= tutkiEkaSivu(ui);
  seuraava.hidden = viimeisella;
  /*
   * Valikko vain maalehdessä (omistajan päätös 8.8.2026:
   * *"Kaupunkilehdessä on niin vähän sivuja että se on turha."*).
   *
   * v382 kokeili valikkoa myös kaupunkilehdessä, jotta maaosioon
   * olisi ollut sieltä rivi. Reitiksi riittävät etusivun kulmalinkki
   * ja kartan Maiden lehdet -nappi, ja viiden sivun lehdessä valikko
   * on enemmän nappi kuin oikotie.
   */
  palkki.querySelector('.sisallysnappi').hidden = !maalehti || sivuja - tutkiEkaSivu(ui) < 3;
  palkki.hidden = sivuja - tutkiEkaSivu(ui) < 2;
  /*
   * Ylälaidan hampurilainen (omistaja 14.8.2026): vasempaan reunaan
   * pysyvä valikkonappi, joka näkyy tarttuvan otsikon rinnalla koko
   * ajan — molemmissa lehdissä. Siitä sisällys aukeaa YLÄREUNAAN;
   * maalehden alapalkin hampurilainen jää ennalleen (aukeaa alas).
   */
  varmistaLehtiHampurilainen(ui, sivuja - tutkiEkaSivu(ui) >= 2);
}

/** Ylälaidan pysyvä valikkonappi lehteen; piiloon yksisivuisesta. */
export function varmistaLehtiHampurilainen(ui, nakyviin) {
  /*
   * Nappi asuu SEN SIVUN tarttuvan otsikon sisällä (omistaja
   * 14.8.2026): vain niin se pysyy täsmälleen otsikkorivillä ja
   * otsikon viivojen sisäpuolella myös tarttumisen ääripäissä.
   * Etusivulla otsikko on nimiö (#arrival-city), aihesivuilla
   * aihe-nimi — nimiö on niillä piilossa palstojen mukana, ja
   * maalehti alkaa suoraan aihesivulta, joten nimiöön naulattu
   * nappi ei näkynyt maalehdessä lainkaan (omistajan havainto
   * 14.8.2026). Sivunpiirto pyyhkii otsikot, joten nappi luodaan
   * tai siirretään joka sivunäytöllä (naytaTutkiSivu →
   * paivitaTutkiNavi → paivitaTutkiAlapalkki).
   */
  const etusivulla = (ui.lehtitila.tutkiSivu ?? 0) === 0;
  const koti = (etusivulla ? ui.arrivalCity
    : ui.arrivalKategoria?.querySelector('.aihe-nimi')) ?? ui.arrivalCity;
  let nappi = ui.arrivalDialog.querySelector('.lehti-hampurilainen');
  if (!nappi && nakyviin) {
    nappi = html('button', 'lehti-hampurilainen');
    nappi.type = 'button';
    nappi.title = 'Sisällys';
    nappi.setAttribute('aria-label', 'Sisällys');
    nappi.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none"'
      + ' stroke="currentColor" stroke-width="1.8" stroke-linecap="round">'
      + '<path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    nappi.addEventListener('click', () => avaaSisallysvalikko(ui, { ylhaalla: true }));
  }
  if (nappi && nappi.parentElement !== koti) koti.appendChild(nappi);
  if (nappi) nappi.hidden = !nakyviin;
}

/**
 * Sisällysluettelo alapalkin valikosta.
 *
 * Sama lista kuin etusivulla, mutta päälle avautuvana levynä. Ei
 * uutta dialogia: lehti on jo dialogissa, ja sisäkkäiset modaalit
 * sotkevat sekä näppäimistön että paluunapin.
 */
export function avaaSisallysvalikko(ui, { ylhaalla = false } = {}) {
  const vanha = ui.arrivalDialog.querySelector(':scope > .sisallys-levy');
  if (vanha) { vanha.remove(); return; }
  // Sisällyssivua ei enää ole: lehden sivut OVAT sisällys.
  const sisallys = ui.lehtitila.tutkiSivut ?? [];
  // Ylälaidan hampurilaisesta levy laskeutuu YLÄREUNAAN (omistaja
  // 14.8.2026); alapalkin hampurilaisesta se nousee alhaalta kuten
  // ennenkin.
  const levy = html('div', `sisallys-levy${ylhaalla ? ' ylhaalla' : ''}`);
  /*
   * Levy sulkeutuu myös mistä tahansa sen ULKOPUOLELTA (omistaja
   * 14.8.2026: "Hampurilainen saisi sulkeutua missä tahansa, jos
   * painaa sen ulkopuolelta"). Kuuntelija on dialogissa
   * kaappausvaiheessa, jotta se näkee myös kortin sisällön
   * napautukset; hampurilaiset ohitetaan, jotta niiden oma
   * click-vipu saa hoitaa sulkemisen eikä levy avaudu heti
   * uudelleen samasta painalluksesta.
   */
  const ulkosulku = (e) => {
    if (levy.contains(e.target)) return;
    if (e.target.closest?.('.lehti-hampurilainen, .sisallysnappi')) return;
    sulje();
  };
  const sulje = () => {
    levy.remove();
    ui.arrivalDialog.removeEventListener('pointerdown', ulkosulku, true);
  };
  ui.arrivalDialog.addEventListener('pointerdown', ulkosulku, true);
  const otsikkoRivi = html('div', 'sisallys-levy-ylä');
  otsikkoRivi.appendChild(html('span', '', 'Sisällys'));
  const x = html('button', 'sisallys-sulje', '×');
  x.type = 'button';
  x.title = 'Sulje';
  x.addEventListener('click', sulje);
  otsikkoRivi.appendChild(x);
  levy.appendChild(otsikkoRivi);
  /*
   * Kaupunkilehdessä listaan kuuluu myös ETUSIVU (omistajan havainto
   * 14.8.2026: "kaupungin hampurilaisessa ei näy kaupunkilehden
   * etusivua") — aihesivulta ei muuten pääse takaisin kanteen kuin
   * selaamalla. Maalehdessä riviä ei ole, koska maalehti alkaa
   * suoraan aihesivulta (tutkiEkaSivu 1) eikä kantta ole.
   */
  levy.appendChild(rakennaSisallysLista(ui, sisallys, {
    suljeValikko: sulje,
    etusivuRivi: tutkiEkaSivu(ui) === 0,
  }));
  /*
   * PALUU KARTALLE (omistajan tilaus 14.8.2026): hampurilaisen takaa
   * pääsee myös suoraan pois lehdestä. Nappi painaa samaa Poistu-
   * nappia kuin alapalkki, joten sulkemisen erikoistapaukset
   * (tarjousvaiheen vuoronpäätös ym.) käyttäytyvät täsmälleen samoin.
   *
   * Nappi on omalla rivillään listan ULKOPUOLELLA: lista vierii,
   * mutta paluu pysyy aina näkyvissä levyn pohjalla (omistajan
   * kaappaus 14.8.2026 — nappi jäi listan alle piiloon). Kunnollinen
   * nappi oikeassa reunassa, peukalon ulottuvilla (omistajan toive).
   */
  const paluuRivi = html('div', 'sisallys-paluurivi');
  const paluu = html('button', 'sisallys-paluu');
  paluu.type = 'button';
  paluu.innerHTML = '<span class="viiva-ikoni" aria-hidden="true">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"'
    + ' stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M13.5 5.5 7 12l6.5 6.5"/><path d="M7 12h10.5"/></svg></span>'
    + 'Palaa kartalle';
  paluu.addEventListener('click', () => {
    sulje();
    document.getElementById('arrival-no')?.click();
  });
  paluuRivi.appendChild(paluu);
  levy.appendChild(paluuRivi);
  levy.addEventListener('click', (e) => { if (e.target === levy) sulje(); });
  ui.arrivalDialog.appendChild(levy);
}

/**
 * Sivunvaihto pyyhkäisystä ja nuolinäppäimistä.
 *
 * Pyyhkäisy ei saa syödä pystyvieritystä: sivu on pitkä ja sitä
 * luetaan pystyyn. Siksi pystysuunta voittaa heti kun se on
 * vaakasuuntaa suurempi, ja vaakasuunnalta vaaditaan sekä 60
 * pikselin matka että kaksinkertainen ylivoima pystysuuntaan.
 *
 * Kuuntelijat ovat kortissa, eivät ikkunassa: kartalla on oma
 * raahauslogiikkansa, eikä Tutki-ikkunan ele saa vuotaa sinne.
 */
export function kytkeTutkiSelaus(ui, kortti) {
  if (ui.lehtitila.tutkiSelausKytketty) return;
  ui.lehtitila.tutkiSelausKytketty = true;
  let alku = null;
  kortti.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) { alku = null; return; }
    alku = { x: e.clientX, y: e.clientY, pysty: false };
  });
  kortti.addEventListener('pointermove', (e) => {
    if (!alku || alku.pysty) return;
    if (Math.abs(e.clientY - alku.y) > Math.abs(e.clientX - alku.x)) alku.pysty = true;
  });
  kortti.addEventListener('pointercancel', () => { alku = null; });
  kortti.addEventListener('pointerup', (e) => {
    const a = alku;
    alku = null;
    if (!a || a.pysty) return;
    const dx = e.clientX - a.x;
    const dy = e.clientY - a.y;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 2) return;
    if (!vaihdaTutkiSivu(ui, dx < 0 ? 1 : -1)) return;
    // Pyyhkäisyn päättävä napsautus ei saa painaa nappia eikä avata
    // kuvaa sillä sivulla, jolle juuri siirryttiin.
    kortti.addEventListener('click', (napsautus) => {
      napsautus.preventDefault();
      napsautus.stopPropagation();
    }, { capture: true, once: true });
  });
  ui.arrivalDialog.addEventListener('keydown', (e) => {
    if (!ui.arrivalDialog.open || tutkiSivuja(ui) < 2) return;
    if (e.key === 'ArrowRight') { if (vaihdaTutkiSivu(ui, 1)) e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { if (vaihdaTutkiSivu(ui, -1)) e.preventDefault(); }
  });

  /*
   * RUUDUN YLÄ- JA ALAREUNAN NAPAUTUS VIERITTÄÄ PÄÄHÄN (omistaja
   * 14.8.2026: "Ala ja yläreunan napautus scrollaamaan alas ja
   * ylös") — pohjaan vievä väkänen poistui samalla.
   *
   * Kaistan historia: napautuskaista poistui 9.8.2026, koska
   * iPadilla vierityksen pysäyttävä sormi laukaisi sen 350 ms:n
   * vahdista huolimatta — kuuntelija oli pointer-tapahtumissa.
   * Nyt kuunnellaan click-tapahtumaa: selain ei tuota clickiä
   * vierityksen pysäyttävästä kosketuksesta eikä raahauksesta,
   * joten vahtia ei tarvita. Napit, linkit ja kuvat voittavat
   * kaistan, ja pyyhkäisyn perään lisätty kertakäyttöinen
   * click-tulppa (yllä) estää sivunvaihdon jälkilaukauksen.
   *
   * Tarttuva otsikkorivi lasketaan yläkaistaan koko leveydeltään:
   * se on aina näkyvissä ylälaidassa, ja otsikon napautus alkuun
   * palaamiseksi on tuttu ele (iOS:n tilarivi).
   */
  /*
   * Liuku omalla ease-in-out-ajurilla (js/lukija.js
   * vieritaPehmeasti; omistajan tilaus 15.8.2026 "pehmeästi
   * scrollaten, ease in ja out"). Sama ajuri korvasi aiemman
   * behavior:'smooth' + hyppyvarmistus -parin: selaimen pehmeä
   * vieritys ei luvannut käyrää eikä headlessissä edes lähtenyt
   * liikkeelle syötteen perään. Liikkeen välttäjän hyppy on ajurin
   * sisällä.
   */
  const vierita = (ylos) => {
    vieritaPehmeasti(kortti, ylos ? 0 : kortti.scrollHeight);
  };
  kortti.addEventListener('click', (e) => {
    if (e.target.closest?.('button, a, input, select, textarea, img, svg')) return;
    const korkeus = window.innerHeight || kortti.clientHeight || 0;
    if (!korkeus) return;
    const kaista = Math.max(56, korkeus * 0.06);
    const otsikossa = Boolean(e.target.closest?.('#arrival-city, .aihe-nimi'));
    /*
     * Ylhäällä ollessa yläkaistan napautus EI tee mitään (omistajan
     * havainto 15.8.2026: lippunapin viereen osunut napautus "söi"
     * ensimmäisen painalluksen, kun rullaus nollaan käynnistyi
     * turhaan jo valmiiksi ylhäällä).
     */
    if (otsikossa || e.clientY <= kaista) {
      if (kortti.scrollTop > 4) vierita(true);
    } else if (e.clientY >= korkeus - kaista) vierita(false);
  });
}

/*
 * Kuvataitto, sää ja uutiset (siirretty ui.js:stä remontin M5b:ssä):
 * lehden etusivun kuvarivit, säärivi ja vuosisääkortti sekä maasivun
 * uutislista käännöksineen. Kulttuurisuurennoksen koneisto (huntu,
 * näppäimet, sulku) asuu yhä ui.js:ssä ja kutsutaan ui-olion kautta.
 */

/**
 * Lehden etusivun kuvataitto (omistajan toive 5.8.2026): iso
 * pääkuva maston alla ja pienempien kuvien rivi esittelytekstin
 * jälkeen. Kuvat ovat kansikategorian omia, tarkistettuja valintoja
 * (kansikuvat-kenttä) — eivät wikin satunnaiskaruselli. Napautus
 * avaa selattavan suurennoksen, jossa koko sarja kulkee nuolilla.
 */
export function piirraLehtiKuvat(ui, kuvat, avauskuvat = null) {
  const lista = kuvat ?? [];
  const panoraamat = avauskuvat ?? [];
  ui.arrivalLehtiPaakuva.replaceChildren();
  ui.arrivalLehtiKuvat.replaceChildren();
  ui.arrivalLehtiPaakuva.hidden = !lista.length && !panoraamat.length;
  ui.arrivalLehtiKuvat.hidden = panoraamat.length ? !lista.length : lista.length < 2;
  if (!lista.length && !panoraamat.length) return;
  const teeKuva = (teos, indeksi, leveys) => {
    const kotelo = html('figure', 'lehti-kuva');
    const kuva = document.createElement('img');
    kuva.decoding = 'async';
    kuva.draggable = false;
    kuva.alt = teos.selite ?? '';
    asetaKuva(kuva, valokuvaUrl(teos.tiedosto, leveys), valokuvaVara(teos.tiedosto, leveys));
    ui.napautuksesta(kuva, () => ui.naytaKulttuuriKuva(teos, {
      teokset: lista, kohdalla: indeksi,
    }));
    kotelo.appendChild(kuva);
    if (teos.selite) {
      const teksti = html('figcaption', 'kuvateksti', teos.selite);
      if (teos.lahde) teksti.appendChild(html('span', 'lehti-kuvalahde', ` ${teos.lahde}`));
      kotelo.appendChild(teksti);
    }
    return kotelo;
  };
  /*
   * AVAUSKUVAT (omistajan tilaus 15.8.2026: "saisi olla laadukas
   * vaakakuva jossa näkyy itse kaupunkia enemmän, sellainen
   * yleisnäkymä. ja niitä voisi olla useampi karusellissa"): iso
   * kuvapaikka on yleisnäkymien karuselli — sama komponentti kuin
   * nähtävyysjutuissa, joten nuolet, laskuri, pyyhkäisy ja
   * suurennos toimivat tutusti. Pikkuriville vapautuvat silloin
   * kansikuvien KAKSI ENSIMMÄISTÄ, koska iso paikka ei enää syö
   * niistä ensimmäistä. Kaupunki ilman avauskuvia taittuu ennalleen.
   */
  if (panoraamat.length) {
    ui.arrivalLehtiPaakuva.appendChild(panoraamat.length > 1
      ? nahtavyydenKaruselli(ui, panoraamat)
      : nahtavyydenKuva(ui, panoraamat[0]));
    for (let i = 0; i < Math.min(lista.length, 2); i += 1) {
      ui.arrivalLehtiKuvat.appendChild(teeKuva(lista[i], i, 640));
    }
    return;
  }
  ui.arrivalLehtiPaakuva.appendChild(teeKuva(lista[0], 0, 1200));
  for (let i = 1; i < Math.min(lista.length, 3); i += 1) {
    ui.arrivalLehtiKuvat.appendChild(teeKuva(lista[i], i, 640));
  }
}

/**
 * Päivän sää lehden mastoon (omistajan toive 5.8.2026). Rivillä
 * lukee heti kuukauden normaali — se toimii ilman verkkoa — ja
 * ennusteen valmistuttua tilalle vaihtuu tämä päivä. Rivi on nappi:
 * napautus avaa koko vuoden graafin (naytaVuosiSaa).
 */
export function naytaLehtiSaa(ui, cityId) {
  const tiedot = cityId ? SAATIEDOT[cityId] : null;
  ui.lehtitila.lehtiSaaTiedot = tiedot ?? null;
  ui.arrivalSaa.hidden = !tiedot;
  if (!tiedot) return;
  const kuukausi = new Date().getMonth();
  asetaSaaRivi(ui, 'pilvi',
    `${kuukausiSsa(kuukausi)} keskimäärin ${Math.round(tiedot.keskilampo[kuukausi])}°, sadetta ${tiedot.sade[kuukausi]} mm`);
  haeSaaTanaan(tiedot.lat, tiedot.lon).then((saa) => {
    // Pelaaja on voinut ehtiä jatkaa matkaa haun aikana.
    if (!saa || ui.lehtitila.arrivalShownFor !== cityId) return;
    const kuvaus = saaKuvaus(saa.koodi);
    const sade = saa.sademaara >= 1 ? `, sadetta ${Math.round(saa.sademaara)} mm` : '';
    asetaSaaRivi(ui, kuvaus.kuvake,
      `tänään ${saa.lampotila}° (${saa.alin}…${saa.ylin}°), ${kuvaus.teksti}${sade}`);
  });
}

export function asetaSaaRivi(ui, kuvake, teksti) {
  ui.arrivalSaa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">'
    + `${SAA_IKONIT[kuvake] ?? SAA_IKONIT.pilvi}</svg>`
    + '<span class="saa-teksti"></span><span class="saa-vihje">vuosiennuste ›</span>';
  ui.arrivalSaa.querySelector('.saa-teksti').textContent = teksti;
}

/**
 * Koko vuoden sää samana korttina kuin kulttuurikuvan suurennos:
 * keskilämpökäyrä ja sadepalkit kuukausittain, napautus sulkee.
 * Graafi piirtyy staattisista normaaleista, joten se aukeaa myös
 * ilman verkkoa.
 */
export function naytaVuosiSaa(ui) {
  const tiedot = ui.lehtitila.lehtiSaaTiedot;
  if (!tiedot) return;
  ui.suljeKulttuuriKuva();
  ui.lisaaKevytHuntu();
  const kortti = html('div', 'postikortti kulttuuri-suurennos vuosisaa-kortti');
  const sulku = html('button', 'uutinen-sulku', '×');
  sulku.type = 'button';
  sulku.setAttribute('aria-label', 'Sulje sää');
  kortti.appendChild(sulku);
  const nimi = ui.game.board.cities.find((c) => c.id === ui.lehtitila.arrivalShownFor)?.name ?? '';
  kortti.appendChild(html('p', 'kuvateksti vuosisaa-otsikko', `Sää vuoden mittaan — ${nimi}`));
  kortti.appendChild(piirraVuosiSaa(tiedot));
  /*
   * LUONNEHDINTA graafin ALLE eikä viereen (omistajan toive
   * 17.8.2026: "muutaman lauseen luonnehdinta vuoden
   * säävaihteluista"). Kortti on kapea — enintään 480 pikseliä — ja
   * graafi täyttää sen leveyden, joten viereen jäisi tekstille vain
   * muutama sana riville. Alla teksti saa koko palstan ja lukee
   * graafin selityksenä: ensin kuva, sitten mitä siinä näkyy, ja
   * vasta viimeisenä lähderivi. Kenttä on valinnainen: ilman sitä
   * kortti näyttää täsmälleen samalta kuin ennen.
   */
  if (tiedot.luonnehdinta) {
    kortti.appendChild(html('p', 'vuosisaa-luonnehdinta', tiedot.luonnehdinta));
  }
  kortti.appendChild(html('p', 'kuvalahde',
    'Käyrä keskilämpö °C · palkit sademäärä mm · Open-Meteo (ERA5), 1991–2020'));
  kortti.addEventListener('click', () => ui.suljeKulttuuriKuva());
  ui.arrivalDialog.appendChild(kortti);
  ui.lehtitila.kulttuuriKuvaEl = kortti;
  ui.rekisteroiSuurennosNappaimet();
  sfx.play('paper');
}

/**
 * Ajankohtaiset uutisotsikot maaosastoon paikallisella kielellä
 * (omistajan toive 5.8.2026). Osio näkyy vain, kun maalla on lähde
 * uutislahteet.js:ssä JA uutisvälitys on otettu käyttöön — muuten
 * mitään ei haeta eikä näytetä. Otsikoita ei lyhennetä eikä
 * mukailla; napautus avaa uutisen pelin kirjasimilla.
 */
export function naytaMaaUutiset(ui, iso, cityId) {
  const lahde = uutislahde(iso);
  ui.arrivalUutiset.hidden = true;
  if (!lahde) return;
  haeUutiset(iso).then((uutiset) => {
    if (!uutiset.length) return;
    if (!ui.arrivalDialog.open || ui.lehtitila.arrivalShownFor !== cityId) return;
    // "Uutisissa tänään" ja lähde suluissa (omistajan sanamuoto).
    ui.arrivalUutiset.querySelector('.uutiset-nimio').textContent =
      `Uutisissa tänään (${lahde.nimi})`;
    const lista = ui.arrivalUutiset.querySelector('.uutiset-lista');
    lista.replaceChildren();
    for (const uutinen of uutiset.slice(0, 3)) {
      const rivi = html('button', 'uutinen-rivi');
      rivi.type = 'button';
      rivi.lang = lahde.kieli;
      const teksti = html('span', 'uutinen-rivi-teksti', uutinen.otsikko);
      // dir="auto": oikealta vasemmalle kirjoitettava otsikko (esim.
      // arabia) asettuu oikein ilman kielikohtaista koodia.
      teksti.dir = 'auto';
      rivi.appendChild(teksti);
      rivi.addEventListener('click', () => avaaUutinen(ui, uutinen, lahde));
      lista.appendChild(rivi);
      // Suomennos otsikon alle pienemmällä ja kevyemmällä — ilman
      // etikettiä (omistajan toive).
      kaannaSuomeksi(uutinen.otsikko, lahde.kieli).then((suomeksi) => {
        if (!suomeksi || !rivi.isConnected) return;
        const rivinSuomennos = html('span', 'uutinen-rivi-suomeksi', suomeksi);
        rivinSuomennos.dir = 'auto';
        teksti.appendChild(rivinSuomennos);
      });
      // Pikkukuva otsikon viereen (omistajan toive): sama
      // artikkelihaku lämmittää muistin, joten popup aukeaa heti.
      haeArtikkeli(uutinen.linkki).then((artikkeli) => {
        if (!artikkeli?.kuva || !rivi.isConnected) return;
        const pikkukuva = document.createElement('img');
        pikkukuva.alt = '';
        pikkukuva.loading = 'lazy';
        pikkukuva.addEventListener('error', () => {
          pikkukuva.remove();
          rivi.classList.remove('kuvallinen');
        });
        pikkukuva.src = artikkeli.kuva;
        rivi.prepend(pikkukuva);
        rivi.classList.add('kuvallinen');
      });
    }
    ui.arrivalUutiset.hidden = false;
  });
}

/**
 * Uutispopup pikkulehtenä (omistajan toive 7.8.2026): ylärivillä
 * jutun päiväys ja Käännä-nappi, niiden alla lähteen nimiö lehden
 * tuplaviivojen välissä, iso otsikko ja leipäteksti, jota
 * artikkelin kuva taittaa — teksti juoksee kellutetun kuvan
 * ympäri. Koko juttu haetaan uutissivulta workerin kautta, ja
 * syötteen lyhyt kuvaus on vain varateksti. Tausta EI tummene;
 * kortin sulkee sen napautus tai kulman rasti.
 */
export function avaaUutinen(ui, uutinen, lahde) {
  ui.suljeKulttuuriKuva();
  sfx.play('paper');
  ui.lisaaKevytHuntu();
  const kortti = html('div', 'postikortti kulttuuri-suurennos uutinen-kortti');
  const sulku = html('button', 'uutinen-sulku', '×');
  sulku.type = 'button';
  sulku.setAttribute('aria-label', 'Sulje uutinen');
  kortti.appendChild(sulku);

  // Ylärivi: jutun päiväys vasemmalla, käännösnappi oikealla rastin
  // vieressä. Kellonaika on lehdessä turha — päivä riittää.
  const ylarivi = html('div', 'uutinen-ylarivi');
  const aika = uutinen.aika ? new Date(uutinen.aika) : null;
  ylarivi.appendChild(html('span', 'uutinen-paivays',
    aika && !Number.isNaN(aika.getTime())
      ? `${aika.getDate()}.${aika.getMonth() + 1}.${aika.getFullYear()}`
      : ''));
  const nappi = html('button', 'uutinen-kaanna', 'Käännä');
  nappi.type = 'button';
  ylarivi.appendChild(nappi);
  kortti.appendChild(ylarivi);

  // Lähteen nimiö kuin lehden masto: tuplaviiva yllä, ohut alla.
  kortti.appendChild(html('p', 'uutinen-masto', lahde.nimi));

  const otsikko = html('p', 'uutinen-otsikko', uutinen.otsikko);
  otsikko.lang = lahde.kieli;
  otsikko.dir = 'auto';
  kortti.appendChild(otsikko);

  /*
   * Runko: artikkelin kuva on rungon SISÄLLÄ ja kelluu oikealla,
   * jotta kappaleet juoksevat sen ympäri. Syötteen kuvaus näkyy
   * heti, ja koko artikkeli korvaa sen kun haku valmistuu; jos
   * artikkelia ei saada (esim. workerin vanha versio), kuvaus jää
   * — popup ei ole koskaan tyhjä.
   */
  const runko = html('div', 'uutinen-runko');
  const kuva = document.createElement('img');
  kuva.className = 'uutinen-kuva';
  kuva.alt = '';
  kuva.hidden = true;
  kuva.addEventListener('error', () => { kuva.hidden = true; });
  runko.appendChild(kuva);
  kortti.appendChild(runko);

  /*
   * Käännös vaihtaa otsikon ja kappaleet PAIKALLAAN samoihin
   * elementteihin: suomi saa täsmälleen saman taiton ja tyylin kuin
   * alkuperäinen (omistaja 7.8.2026: ei kursiivia, jutun pitää olla
   * yhtä hyvän näköinen suomeksi), eikä kelluva kuva hypähdä.
   */
  let alkuperaiset = uutinen.kuvaus ? [uutinen.kuvaus] : [];
  let naytaSuomi = false;
  let suomennos = null;
  const naytaOtsikko = (teksti, kieli) => {
    otsikko.textContent = teksti;
    otsikko.lang = kieli;
  };
  const naytaKappaleet = (tekstit, kieli) => {
    for (const p of runko.querySelectorAll('p')) p.remove();
    runko.lang = kieli;
    for (const teksti of tekstit) {
      const p = html('p', 'uutinen-kappale', teksti);
      // dir="auto": oikealta vasemmalle kirjoitettava kieli (esim.
      // arabia) asettuu oikein ilman kielikohtaista koodia.
      p.dir = 'auto';
      runko.appendChild(p);
    }
  };
  if (alkuperaiset.length) naytaKappaleet(alkuperaiset, lahde.kieli);

  /*
   * Suomennos: otsikko ja kappaleet käännetään erikseen, jotta
   * kappalejako säilyy. Jos ilmainen palvelu ehtyy kesken jutun,
   * näytetään käännetyt kappaleet eikä sekakielistä loppua —
   * otsikon on kuitenkin käännyttävä tai koko yritys hylätään.
   */
  const kaannaKaikki = async () => {
    const otsikkoFi = await kaannaSuomeksi(uutinen.otsikko, lahde.kieli);
    if (!otsikkoFi) return null;
    const kappaleetFi = [];
    for (const kappale of alkuperaiset) {
      const fi = await kaannaSuomeksi(kappale, lahde.kieli);
      if (!fi) break;
      kappaleetFi.push(fi);
    }
    if (!kappaleetFi.length) return null;
    return { otsikko: otsikkoFi, kappaleet: kappaleetFi };
  };

  haeArtikkeli(uutinen.linkki).then(async (artikkeli) => {
    if (!kortti.isConnected || !artikkeli) return;
    if (artikkeli.kuva) {
      kuva.src = artikkeli.kuva;
      kuva.hidden = false;
    }
    if (artikkeli.kappaleet?.length) {
      alkuperaiset = artikkeli.kappaleet;
      // Pelkästä kuvauksesta tehty suomennos ei kata artikkelia.
      suomennos = null;
      if (!naytaSuomi) {
        naytaKappaleet(alkuperaiset, lahde.kieli);
        return;
      }
      // Pelaaja ehti kääntää pelkän kuvauksen — käännetään koko
      // juttu perään (valmiit palat ovat muistissa, haku on kevyt).
      const koko = await kaannaKaikki();
      if (!kortti.isConnected || !naytaSuomi || !koko) return;
      suomennos = koko;
      naytaOtsikko(koko.otsikko, 'fi');
      naytaKappaleet(koko.kappaleet, 'fi');
    }
  });

  // Sama nappi kulkee kahteen suuntaan: Käännä suomentaa myös
  // otsikon, jolloin näkyvissä on pelkkää suomea, ja Palauta tuo
  // alkuperäiskielen takaisin (omistajan malli 7.8.2026).
  nappi.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (naytaSuomi) {
      naytaSuomi = false;
      naytaOtsikko(uutinen.otsikko, lahde.kieli);
      naytaKappaleet(alkuperaiset, lahde.kieli);
      nappi.textContent = 'Käännä';
      return;
    }
    if (!suomennos) {
      nappi.textContent = 'Käännetään…';
      nappi.disabled = true;
      suomennos = await kaannaKaikki();
      // Kortti on voitu ehtiä sulkea käännöksen aikana.
      if (!kortti.isConnected) return;
      nappi.disabled = false;
      if (!suomennos) {
        nappi.textContent = 'Yritä uudelleen';
        return;
      }
    }
    naytaSuomi = true;
    naytaOtsikko(suomennos.otsikko, 'fi');
    naytaKappaleet(suomennos.kappaleet, 'fi');
    nappi.textContent = 'Palauta';
  });

  kortti.addEventListener('click', () => ui.suljeKulttuuriKuva());
  ui.arrivalDialog.appendChild(kortti);
  ui.lehtitila.kulttuuriKuvaEl = kortti;
  ui.rekisteroiSuurennosNappaimet();
}
