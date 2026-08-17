/*
 * Matkailijan opas: lehden viihteellinen osa jaksotaittoineen,
 * laatikoineen ja säägraafeineen (opas 2.x). Siirretty js/ui.js:stä
 * 17.8.2026 (remontin M4, malli B —
 * docs/moduulirakenne-suunnitelma.md). Funktiot saavat ui-olion
 * ensimmäisenä parametrinaan; kuva- ja tekstiapurit tuodaan
 * nähtävyysmoduulista (yksisuuntainen tuonti).
 */

import { el } from './mapart.js';
import { SAATIEDOT } from './packs/saatiedot.js';
import { piirraVuosiSaa } from './saa.js';
import { html } from './ui-apurit.js';
import {
  nahtavyydenKaruselli, nahtavyydenKuva, nahtavyysKappale,
} from './nahtavyydet.js';

/**
 * MATKAILIJAN OPAS: jaksotettu taitto (paketti O1, omistajan linjaus
 * 16.8.2026). Nähtävyysjuttu on kappalevirta, jonka kuvat ripotellaan
 * sekaan; opas on toisenlainen lukukokemus — se on selailtava sivu,
 * jossa lukija hyppii otsikosta laatikkoon ja takaisin.
 *
 * Kiinteä järjestys omistajan speksistä:
 *   ingressi → jakso 1 → Milloin matkaan? → jakso 2 → nosto →
 *   loput jaksot → Suunnittele matka
 *
 * Matkakassa-laatikko poistettiin 17.8.2026 omistajan päätöksellä
 * ("tämä osio voidaan poistaa"): hintoja ei luetella oppaassa, vaan
 * hintataso kerrotaan kainalotaulussa plussana tai miinuksena.
 *
 * Laatikot sidotaan jaksojen VÄLIIN indeksillä eikä lasketa suhteessa
 * jaksojen määrään: sijainti on toimituksellinen päätös (sää tulee
 * heti liikkumisen jälkeen), eikä se saa liikkua sen mukaan, montako jaksoa
 * kaupungille sattuu kirjoitetuksi. Lyhyemmän oppaan väliin
 * mahtumattomat laatikot tulevat jaksojen perään omassa
 * järjestyksessään, jotta mikään ei katoa.
 */
export function taitaOpas(ui, sisalto, kohde, linkit) {
  const jaksot = kohde.jaksot ?? [];
  const matkailu = kohde.matkailu ?? null;
  // Ingressi: artikkelin oma teksti-kenttä on oppaassa lyhyt
  // aloituslause, ei koko juttu (jaksoissa on leipäteksti).
  for (const kappale of String(kohde.teksti ?? '').split('\n\n').filter(Boolean)) {
    const p = nahtavyysKappale(ui, kappale, linkit);
    p.classList.add('opas-ingressi');
    sisalto.appendChild(p);
  }
  /*
   * Kainalotaulu kelluu ENSIMMÄISEN JAKSON leipätekstin oikealla
   * puolella (omistajan palaute 16.8.2026), joten se annetaan jaksolle
   * mukaan eikä ladota omaksi lohkokseen ingressin alle. Jos
   * kaupungille ei ole kirjoitettu yhtään jaksoa, taulu tulee silti
   * näkyviin — ingressin perään, ettei tieto katoa taittosäännön takia.
   */
  const kainalo = opasKainalot(ui, matkailu);
  if (kainalo && !jaksot.length) sisalto.appendChild(kainalo);
  // Jakson indeksi → lohko, joka tulee sen JÄLKEEN.
  const valiin = new Map();
  if (matkailu?.parasAika || matkailu?.kaudet?.length) {
    valiin.set(0, () => opasKaudet(ui, matkailu));
  }
  if (kohde.nosto) valiin.set(1, () => opasNosto(kohde.nosto));
  jaksot.forEach((jakso, i) => {
    sisalto.appendChild(opasJakso(ui, jakso, linkit, i === 0 ? kainalo : null));
    const lohko = valiin.get(i);
    if (lohko) sisalto.appendChild(lohko());
  });
  for (const [i, lohko] of valiin) {
    if (i >= jaksot.length) sisalto.appendChild(lohko());
  }
  if (matkailu?.linkit?.length) sisalto.appendChild(opasLinkit(matkailu));
}

/**
 * Oppaan aihejakso: pieni väliotsikko → kappale(et) → kuva
 * kuvatekstillä. Kuva on oletuksena KOKO PALSTAN levyinen — omistajan
 * havainto 16.8.2026 oli, että ripoteltu kuvataitto on opasjutussa
 * levoton, eikä oletusta muuteta.
 *
 * KAKSI POIKKEUSTA, molemmat omistajan tilauksesta 16.8.2026:
 *
 *   1. `kuva.asettelu === 'kapea'` ("Leipomokuva voisi olla pienemmällä
 *      ja teksti vasemmalla"): kuva kelluu oikealla ja jakson teksti
 *      kiertää sen vasemmalta. Jakso saa silloin oman
 *      lohkomuotoiluympäristön (opas-jakso-kapea → display: flow-root),
 *      jotta kelluke pysyy OMASSA jaksossaan eikä vuoda seuraavan
 *      väliotsikon päälle. Sama tehdään luokalla eikä :has-valitsimella,
 *      koska taittosääntö on rakenteen tosiasia — se ei saa riippua
 *      siitä, tukeeko selain :has-valitsinta.
 *   2. `kuva` saa olla myös LISTA (paketti O3, osa 3): useamman kuvan
 *      jakso saa saman karusellin kuin nähtävyysjutut ja lehden
 *      avauskuvat. Karuselli on jo olemassa nuolineen, laskureineen,
 *      pyyhkäisyineen ja koko sarjan suurennoksineen — oma kevyt
 *      toteutus olisi tuonut neljännen selauskoneiston samaan peliin
 *      ilman, että se tekisi mitään uutta.
 *
 * Asetteluvalinta luetaan sarjan ENSIMMÄISESTÄ kuvasta: karuselli on
 * yksi kehys, joten asettelu on kehyksen eikä yksittäisen kuvan asia.
 */
export function opasJakso(ui, jakso, linkit, kainalo = null) {
  const osa = html('section', 'opas-jakso');
  if (jakso.otsikko) osa.appendChild(html('h3', 'opas-valiotsikko', jakso.otsikko));
  /*
   * Kainalotaulu ennen leipätekstiä, väliotsikon JÄLKEEN: näin
   * väliotsikon alaviiva jää koko palstan levyiseksi ja vain teksti
   * kiertää taulun. Kapealla ruudulla taulu nousee tehtävänannon
   * mukaisesti ingressin alle — se tehdään sarakejärjestyksellä
   * (opas-jakso-kainalo), koska DOM-järjestys palvelee leveää näkymää.
   */
  if (kainalo) {
    osa.classList.add('opas-jakso-kainalo');
    osa.appendChild(kainalo);
  }
  const kuvat = (Array.isArray(jakso.kuva) ? jakso.kuva : [jakso.kuva])
    .filter((k) => k?.tiedosto);
  const kapea = kuvat[0]?.asettelu === 'kapea';
  let kehys = null;
  if (kuvat.length) {
    kehys = kuvat.length > 1
      ? nahtavyydenKaruselli(ui, kuvat)
      : nahtavyydenKuva(ui, kuvat[0]);
    kehys.classList.add('opas-kuva');
    if (kapea) {
      kehys.classList.add('opas-kuva-kapea');
      osa.classList.add('opas-jakso-kapea');
      // Kelluke ENNEN leipätekstiä: kellukkeen ohittanut teksti ei
      // enää kierrä sitä, joten tekstin jälkeen lisätty kuva jäisi
      // yksin jakson alaosaan ja jättäisi viereensä tyhjän palstan.
      osa.appendChild(kehys);
    }
  }
  for (const kappale of String(jakso.teksti ?? '').split('\n\n').filter(Boolean)) {
    osa.appendChild(nahtavyysKappale(ui, kappale, linkit));
  }
  if (kehys && !kapea) osa.appendChild(kehys);
  return osa;
}

/**
 * KAINALOTAULU (omistajan palaute 16.8.2026 opas 2.1:stä: "liian
 * raskas taulukko. Tee vain otsikkotasolla ja sijoita leipätekstin
 * oikealle puolelle. Yksi taulu jossa vain pohjaväri muuttuu. Voi
 * tehdä mini pop upin jota painamalla tulisi tarkemmat tiedot.").
 *
 * Opas 2.1:n kaksipalstainen paneeli oli oma lohkonsa ingressin alla,
 * ja siinä luki jokaisen rivin perustelu kokonaisena virkkeenä. Tässä
 * versiossa taulu on yksi kapea kelluke leipätekstin oikealla
 * puolella, ja NÄKYVISSÄ ON VAIN OTSIKKOTASO: aihe ja tähdet tai
 * pelkkä aiheen nimi. Perustelu on rivin takana miniponnahduksessa.
 *
 * YKSI KEHYS, KAKSI VYÖHYKETTÄ. Sama typografia, sama reunus, sama
 * otsikkoväri — ainoa ero on pohjaväri: lämmin ylhäällä (suositukset),
 * viileä alla (varaukset). Siksi vyöhykeotsikot EIVÄT ota aksenttiaan
 * lohkon väristä niin kuin 2.1:ssä: jos otsikkokin vaihtaisi väriä,
 * eroja olisi kaksi eikä yksi.
 *
 * Miniponnahdus on pelin oma pikkuseloste (avaaPikkuseloste): ankkurin
 * viereen asettuva pieni laatikko, joka sulkeutuu Escistä,
 * ulkopuolisesta napautuksesta ja omasta ×:stään, ja joka osaa jo
 * asettua avoimen dialogin sisään. Uusi kupla olisi ollut sama koodi
 * uudestaan — ja huonompi, koska tämä hoitaa myös aria-expandedin.
 *
 * Kunnioitus-pilari koskee yhä varjopuolia: "Hyvä tietää" on faktoja
 * matkailijalle, ei kaupungin mollausta, eikä siinä ole tähtiä —
 * haitoille ei anneta arvosanoja.
 */
export function opasKainalot(ui, matkailu) {
  const parasta = matkailu?.parasta ?? [];
  const hyvaTietaa = matkailu?.hyvaTietaa ?? [];
  if (!parasta.length && !hyvaTietaa.length) return null;
  const taulu = html('aside', 'opas-kainalo');
  taulu.setAttribute('aria-label', 'Kaupunki lyhyesti');

  /*
   * Yksi rivi. Rivi on nappi vain silloin, kun sen takana on jotain
   * avattavaa: selitteetön rivi ei saa näyttää painettavalta.
   */
  const rivi = (nimi, selite, tahdet) => {
    const kohta = html('li', 'opas-vyo-rivi');
    const sisus = (el) => {
      el.appendChild(html('span', 'opas-vyo-nimi', nimi ?? ''));
      if (tahdet != null) el.appendChild(opasTahdet(tahdet));
      return el;
    };
    if (!selite) {
      kohta.appendChild(sisus(html('span', 'opas-vyo-rivisisus')));
      return kohta;
    }
    const nappi = sisus(html('button', 'opas-vyo-rivisisus opas-vyo-nappi'));
    nappi.type = 'button';
    nappi.setAttribute('aria-expanded', 'false');
    nappi.addEventListener('click', (e) => {
      e.stopPropagation();
      // Toinen napautus samaan riviin sulkee: rivi on katkaisija.
      if (ui.pikkuseloste?.ankkuri === nappi) ui.suljePikkuseloste();
      else ui.avaaPikkuseloste(nappi, selite);
    });
    kohta.appendChild(nappi);
    return kohta;
  };

  const vyohyke = (luokka, otsikko, rivit) => {
    const osa = html('div', `opas-vyo ${luokka}`);
    osa.appendChild(html('h3', 'opas-vyo-otsikko', otsikko));
    const lista = html('ul', 'opas-vyo-lista');
    for (const kohta of rivit) lista.appendChild(kohta);
    osa.appendChild(lista);
    taulu.appendChild(osa);
  };

  if (parasta.length) {
    vyohyke('opas-vyo-lammin', 'Parasta täällä',
      parasta.map((r) => rivi(r.mita, r.selite, r.tahdet)));
  }
  if (hyvaTietaa.length) {
    vyohyke('opas-vyo-viilea', 'Hyvä tietää',
      hyvaTietaa.map((r) => rivi(r.otsikko, r.teksti, null)));
  }
  return taulu;
}

/**
 * Tähtiarvio 1–3. Tyhjät tähdet piirretään mukaan, koska pelkkä
 * "★★" ei kerro lukijalle onko asteikko kolmen vai viiden — ja
 * kolmen tähden rivi erottuu kahden tähden rivistä vasta, kun
 * asteikko on näkyvissä. Ruudunlukijalle menee sanallinen arvio,
 * ei tähtimerkkejä.
 */
export function opasTahdet(maara) {
  const n = Math.max(0, Math.min(3, Math.round(Number(maara) || 0)));
  const kehys = html('span', 'opas-tahdet');
  kehys.setAttribute('role', 'img');
  kehys.setAttribute('aria-label', `${n}/3 tähteä`);
  for (let i = 1; i <= 3; i += 1) {
    const tahti = html('span', i <= n ? 'opas-tahti' : 'opas-tahti opas-tahti-tyhja', '★');
    tahti.setAttribute('aria-hidden', 'true');
    kehys.appendChild(tahti);
  }
  return kehys;
}

/** Oppaan laatikon runko: otsikkorivi ja aksenttipohja luokasta. */
export function opasLaatikko(otsikko, luokka) {
  const laatikko = html('aside', `opas-laatikko ${luokka}`);
  laatikko.appendChild(html('h3', 'opas-laatikko-otsikko', otsikko));
  return laatikko;
}

/**
 * "Milloin matkaan?" — parasAika-lause ja kausirivit
 * (kausi · kuukaudet · lämpöhaarukka · luonnehdinta). Lämmöt tulevat
 * datasta valmiiksi muotoiltuna merkkijonona, koska haarukan
 * pyöristys on toimituksellinen päätös eikä laskutoimitus.
 */
export function opasKaudet(ui, matkailu) {
  const laatikko = opasLaatikko('Milloin matkaan?', 'opas-saa');
  // Vuosikäyrä kelluu laatikon leipätekstin oikealla puolella
  // (omistajan tilaus 16.8.2026), joten se on otsikon jälkeen mutta
  // ennen tekstiä: kelluke tarvitsee tekstiä kierrettäväkseen.
  const graafi = opasSaagraafi(SAATIEDOT[ui.arrivalShownFor]);
  if (graafi) laatikko.appendChild(graafi);
  if (matkailu.parasAika) {
    laatikko.appendChild(html('p', 'opas-parasaika', matkailu.parasAika));
  }
  if (matkailu.kaudet?.length) {
    const lista = html('dl', 'opas-kaudet');
    for (const kausi of matkailu.kaudet) {
      const nimi = html('dt', 'opas-kausi-nimi');
      nimi.appendChild(html('span', 'opas-kausi-sana', kausi.nimi ?? ''));
      if (kausi.kk) nimi.appendChild(html('span', 'opas-kausi-kk', kausi.kk));
      lista.appendChild(nimi);
      const tiedot = html('dd', 'opas-kausi-tiedot');
      if (kausi.lampotila) {
        tiedot.appendChild(html('span', 'opas-kausi-lampo', kausi.lampotila));
      }
      if (kausi.kuvaus) tiedot.appendChild(html('span', 'opas-kausi-kuvaus', kausi.kuvaus));
      lista.appendChild(tiedot);
    }
    laatikko.appendChild(lista);
  }
  return laatikko;
}

/**
 * VUOSIKÄYRÄ (omistajan tilaus 16.8.2026: "lämpötilatauluun voisi
 * leipätekstin oikealle puolelle tuoda pienen kuvan vuosiennusteesta
 * ja sitä klikkaamalla se suurenisi isommaksi animoidusti").
 *
 * TÄSSÄ ON MAALEHDEN OMA GRAAFI, EI JÄLJITELMÄ (omistajan tarkennus
 * 16.8.2026: *"tee vielä enemmän tämän näköinen tai paras kaikista,
 * käytä juuri samaa"*). Opas 2.2 piirsi ensin oman min–max-käyränsä,
 * ja 2.3 lainasi siihen lehden tyylikeinot. Nyt tässä kutsutaan
 * suoraan `piirraVuosiSaa`ta (js/saa.js): sama kultakäyrä, samat
 * sadepalkit, samat asteikot ja sama lähde — kaksi graafia samassa
 * pelissä ei enää eroa toisistaan millään tavalla.
 *
 * Data tulee samasta paketista kuin lehdenkin (SAATIEDOT, ERA5
 * 1991–2020), joten oppaalla ei ole omaa ilmastodataansa
 * ylläpidettävänä eikä kaupungin lukuja ole kahdessa paikassa.
 * Kaupunki ilman säätietoja taittuu ilman graafia.
 *
 * @param {{keskilampo: number[], sade: number[]}} tiedot
 */
export function opasSaagraafi(tiedot) {
  if (!tiedot?.keskilampo?.length || !tiedot?.sade?.length) return null;
  const kehys = html('figure', 'opas-saagraafi');
  const nappi = html('button', 'opas-saagraafi-nappi');
  nappi.type = 'button';
  nappi.setAttribute('aria-label', 'Sää vuoden mittaan — suurenna kuvaaja');
  nappi.appendChild(piirraVuosiSaa(tiedot));
  nappi.addEventListener('click', () => avaaSaagraafi(tiedot, nappi));
  kehys.appendChild(nappi);
  kehys.appendChild(html('figcaption', 'opas-saagraafi-teksti',
    'Sää vuoden mittaan. Napauta suuremmaksi.'));
  return kehys;
}

/**
 * Suurennos: kuvaaja kasvaa pienestä kelluketta vastaavasta paikasta
 * ruudun keskelle. Animaatio on FLIP — suuri kuvaaja asetetaan
 * paikalleen, mitataan, ja lähtöruutu piirretään sen päälle
 * muunnoksena. Näin selain animoi vain transformia ja opacityä eikä
 * asettelua lasketa kertaakaan uudestaan kesken liikkeen.
 *
 * Overlay menee avoimen dialogin sisään samasta syystä kuin
 * pikkuseloste: <dialog>-modaali nostetaan omaan ylätasoonsa, ja
 * muualle lisätty kerros jäisi sen alle näkymättömiin.
 */
export function avaaSaagraafi(tiedot, ankkuri) {
  const koti = ankkuri.closest('dialog[open]') ?? document.body;
  const overlay = html('div', 'opas-saa-overlay');
  const laatikko = html('div', 'opas-saa-suuri');
  laatikko.appendChild(piirraVuosiSaa(tiedot));
  // Sama lähderivi sanasta sanaan kuin lehden omassa suurennoksessa
  // (naytaVuosiSaa) — sama graafi ansaitsee saman selitteen.
  laatikko.appendChild(html('p', 'opas-saa-suuri-teksti',
    'Käyrä keskilämpö °C · palkit sademäärä mm · Open-Meteo (ERA5), 1991–2020'));
  overlay.appendChild(laatikko);
  koti.appendChild(overlay);
  ankkuri.setAttribute('aria-expanded', 'true');

  const hidas = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const muunnos = () => {
    const a = ankkuri.getBoundingClientRect();
    const b = laatikko.getBoundingClientRect();
    if (!b.width || !b.height) return '';
    return `translate(${a.left + a.width / 2 - (b.left + b.width / 2)}px, `
      + `${a.top + a.height / 2 - (b.top + b.height / 2)}px) `
      + `scale(${Math.max(a.width / b.width, 0.05)})`;
  };
  if (hidas) {
    overlay.classList.add('nakyy');
  } else {
    laatikko.style.transform = muunnos();
    laatikko.style.opacity = '0';
    /*
     * Kaksi ruutua: ensimmäisessä selain laskee lähtötyylin (pieni,
     * läpinäkyvä, himmennys pois), toisessa siirtymä lähtee liikkeelle.
     * Yhdellä rAF:lla selain ehtisi yhdistää molemmat samaan
     * tyylilaskentaan, jolloin mikään ei animoituisi.
     */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!overlay.isConnected) return;
      overlay.classList.add('nakyy');
      laatikko.classList.add('liikkuu');
      laatikko.style.transform = '';
      laatikko.style.opacity = '';
    }));
  }

  let suljettu = false;
  const sulje = () => {
    if (suljettu) return;
    suljettu = true;
    document.removeEventListener('keydown', nappaimesta, true);
    ankkuri.setAttribute('aria-expanded', 'false');
    if (hidas) { overlay.remove(); return; }
    // Sama matka takaisin. Poistetaan vasta siirtymän jälkeen, ja
    // varmuusajastin siltä varalta ettei transitionend tule (esim.
    // kun kerros ehditään irrottaa DOMista muuta kautta).
    laatikko.style.transform = muunnos();
    laatikko.style.opacity = '0';
    overlay.classList.remove('nakyy');
    const pois = () => overlay.remove();
    laatikko.addEventListener('transitionend', pois, { once: true });
    setTimeout(pois, 400);
  };
  const nappaimesta = (e) => {
    if (e.key !== 'Escape') return;
    // Suurennos on päällimmäisin: se saa Escin eikä päästä sitä
    // eteenpäin dialogille, joka sulkeutuisi samasta näppäimestä.
    e.preventDefault();
    e.stopPropagation();
    sulje();
  };
  overlay.addEventListener('click', sulje);
  document.addEventListener('keydown', nappaimesta, true);
  return overlay;
}

/**
 * "Suunnittele matka" — 3–4 ulkoista linkkiä. Uuteen välilehteen ja
 * rel="noopener noreferrer": peli jää auki taakse, eikä avattu sivu
 * pääse käsiksi avaajaansa window.openerin kautta.
 */
export function opasLinkit(matkailu) {
  const laatikko = opasLaatikko('Suunnittele matka', 'opas-suunnittele');
  const lista = html('ul', 'opas-linkkilista');
  for (const linkki of matkailu.linkit ?? []) {
    const rivi = html('li', 'opas-linkkirivi');
    const osoite = html('a', 'opas-linkki', linkki.nimi ?? linkki.url);
    osoite.href = linkki.url;
    osoite.target = '_blank';
    osoite.rel = 'noopener noreferrer';
    rivi.appendChild(osoite);
    lista.appendChild(rivi);
  }
  laatikko.appendChild(lista);
  return laatikko;
}

/** Tekstinosto: yksi lause isolla antiikvalla, koristeviivat CSS:stä. */
export function opasNosto(teksti) {
  const lohko = html('blockquote', 'opas-nosto');
  lohko.appendChild(html('p', 'opas-nosto-teksti', teksti));
  return lohko;
}
