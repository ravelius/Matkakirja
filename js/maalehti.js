/*
 * Maalehden koneisto: tunnusluvut, mediarivit, kielinäyte ja V-Dem-info
 * sekä maasivujen piirto (etusivu, "maa numeroina", sisällyslista,
 * vinkkilistat ja kategorianostot). Siirretty js/ui.js:stä 17.8.2026
 * (remontin M5c, malli B — docs/moduulirakenne-suunnitelma.md).
 * Funktiot saavat ui-olion ensimmäisenä parametrinaan. Kulttuurinostojen
 * piirto ja kulttuurisuurennos asuvat ui.js:ssä ja kutsutaan ui-olion
 * kautta; samoin naytaTutkiSivu kutsutaan ui-delegaattorilla, ettei
 * lehti.js:n kanssa synny tuontikehää (lehti tuo tämän moduulin).
 */

import { piirraSivunTehtava } from './fokustehtavat.js';
import { avaaLippuikkuna } from './liput.js';
import { asetaKuva } from './media.js';
import { avaaKarttaSuurennos } from './nahtavyydet.js';
import {
  lippuUrl, lippuVara, valokuvaUrl, valokuvaVara,
} from './packs/africa-valokuvat.js';
import { LIPPUTIEDOT } from './packs/lipputiedot.js';
import { karttapiste } from './packs/maakartat.js';
import { radioMaalle } from './packs/radiot.js';
import { vanhaTallenne } from './packs/vanhat-aanet.js';
import { aiheAvain, piirraPoimintapillerit } from './pollopoiminnat.js';
import { KIELET, MAATIEDOT } from './sisaltotaulut.js';
import { taytaLahderivi } from './tekijakortti.js';
import {
  html, lahdemerkinta, MERKKI_SOITA, piirraLeipa,
  suojaa,
} from './ui-apurit.js';

/**
 * Maan tunnusluvut ja tervehdykset kartan alle (pilottimaat, omistajan
 * toive): väkiluku, pinta-ala, demokratiaindeksi (V-Dem — klikkaus
 * avaa maan kuvaajan Our World in Datassa) ja keskitulo pieninä
 * symboliriveinä; alla "hyvää päivää" maan merkittävillä kielillä ja
 * kunkin perässä kielen maan pikkulippu.
 */
export function naytaMaaTunnusluvut(ui, iso) {
  const tiedot = (MAATIEDOT[ui.game.pack.id] ?? {})[iso] ?? null;
  ui.arrivalMaaTunnusluvut.hidden = !tiedot;
  ui.arrivalMaaTervehdykset.hidden = !tiedot?.tervehdykset?.length;
  ui.arrivalMaaTunnusluvut.textContent = '';
  ui.arrivalMaaTervehdykset.textContent = '';
  if (!tiedot) return;
  const IKONIT = {
    vaki: '<circle cx="7.3" cy="4.1" r="2.7"/><path d="M2 13.4c.7-3.4 2.7-5.1 5.3-5.1s4.6 1.7 5.3 5.1"/>',
    ala: '<rect x="1" y="1" width="12.6" height="12.6" rx="1.8"/><path d="M1 9.4l3.4-3 2.6 2.2 3.2-3.6 3.4 2.6"/>',
    vaaka: '<path d="M7.3 1.8v11.4M3.6 13.2h7.4M2.4 4.2h9.8"/><path d="M2.4 4.2 1 7.9a2.2 2.2 0 0 0 2.8 0zM12.2 4.2l-1.4 3.7a2.2 2.2 0 0 0 2.8 0z"/>',
    raha: '<circle cx="7.3" cy="7.5" r="5.9"/><path d="M7.3 4.3v6.4M5.5 6.2c0-.9.8-1.6 1.8-1.6s1.8.65 1.8 1.5c0 1.9-3.6 1.05-3.6 2.95 0 .85.8 1.5 1.8 1.5s1.8-.7 1.8-1.6"/>',
  };
  /*
   * Rivijako säilyy DOM:issa (lukija.js ohittaa nämä nimellä), mutta
   * ladonnasta vastaa nyt laatikon ruudukko: .maa-tunnusrivi on
   * display: contents, joten kaikki neljä lukua asettuvat samaan
   * sarakejakoon — kapealla allekkain, leveällä kahteen palstaan.
   * Järjestys on entinen: väkiluku, pinta-ala, demokratia, tulot.
   */
  const rivi1 = html('div', 'maa-tunnusrivi');
  const rivi2 = html('div', 'maa-tunnusrivi');
  const rivi3 = html('div', 'maa-tunnusrivi tiivis');
  ui.arrivalMaaTunnusluvut.appendChild(rivi1);
  ui.arrivalMaaTunnusluvut.appendChild(rivi2);
  ui.arrivalMaaTunnusluvut.appendChild(rivi3);
  /*
   * ALMANAKAN RIVI (omistajan toive 21.8.2026: "voisivat olla vähän
   * isommalla ja ne voisi muotoilla vielä enemmän pelin tyyliin").
   * Rivi ladotaan kuin vanhan vuosikirjan taulukossa: ikoni, arvo,
   * pisteviivajohdin ja sen päässä sijoitusluku. Johdin on oma
   * elementtinsä, koska se venyy täyttämään arvon ja sijoituksen
   * välin — CSS ei osaa piirtää sitä pelkän tekstin varaan.
   */
  const kohta = (emo, ikoni, sisalto, sijaArvo, seloste) => {
    const osa = html('span', 'maa-tunnus');
    osa.title = seloste;
    const kuvake = html('span', 'maa-tunnus-ikoni');
    kuvake.innerHTML = `<svg viewBox="0 0 15 15" aria-hidden="true">${IKONIT[ikoni]}</svg>`;
    osa.appendChild(kuvake);
    const arvo = html('span', 'maa-tunnus-arvo');
    for (const pala of [].concat(sisalto)) {
      arvo.appendChild(typeof pala === 'string' ? document.createTextNode(pala) : pala);
    }
    osa.appendChild(arvo);
    osa.appendChild(html('span', 'maa-tunnus-johdin'));
    // Suluissa sijoitus maailmassa (omistajan toive).
    if (sijaArvo) osa.appendChild(html('span', 'maa-sija', `(${sijaArvo})`));
    emo.appendChild(osa);
    return osa;
  };
  // Todella pieni vakiomittainen palkki samalla rivillä (omistajan
  // tarkennus): täyttyvä osa on toteutuva osuus maksimista, ja väri
  // kertoo tason — punainen jos vähän, keltainen keskivaiheilla,
  // vihreä jos hyvällä mallilla. Palkki ladotaan arvon perään ennen
  // johdinta, jotta sijoitusluvut jäävät omaan suoraan sarakkeeseensa.
  const palkki = (osa, osuus) => {
    const pohja = html('span', 'maa-palkki');
    const tayte = html('span', 'maa-palkki-tayte');
    const rajattu = Math.min(1, Math.max(0.03, osuus));
    tayte.style.width = `${Math.round(rajattu * 100)}%`;
    tayte.style.background = osuus < 1 / 3 ? '#bf3d2d' : osuus < 2 / 3 ? '#d9a41f' : '#3e8f4a';
    pohja.appendChild(tayte);
    osa.insertBefore(pohja, osa.querySelector('.maa-tunnus-johdin'));
  };
  kohta(rivi1, 'vaki', tiedot.vakiluku, tiedot.vakilukuSija,
    'Väkiluku, suluissa sijoitus maailmassa');
  kohta(rivi1, 'ala', tiedot.pintaAla, tiedot.pintaAlaSija,
    'Pinta-ala, suluissa sijoitus maailmassa');
  if (tiedot.demokratia) {
    // Klikkaus avaa ensin pienen infoikkunan, joka selittää miksi
    // maan luku on se mikä on — varsinainen kuvaajalinkki on siellä
    // (omistajan toive).
    const nappi = html('button', 'maa-demokratia', `${tiedot.demokratia.arvo} · V-Dem`);
    nappi.type = 'button';
    nappi.addEventListener('click', () => naytaVdemInfo(ui, tiedot.demokratia));
    const osa = kohta(rivi2, 'vaaka', nappi, tiedot.demokratia.sija,
      'Demokratiaindeksi (V-Dem, 0–1), suluissa sijoitus maailmassa — avaa selityksen');
    // Indeksin maksimi on 1.
    const arvo = parseFloat(tiedot.demokratia.arvo.replace(',', '.'));
    if (Number.isFinite(arvo)) palkki(osa, arvo);
  }
  if (tiedot.keskitulo) {
    const osa = kohta(rivi3, 'raha', tiedot.keskitulo.arvo, tiedot.keskitulo.sija,
      'Bruttokansantulo asukasta kohden vuodessa, suluissa sijoitus maailmassa');
    // Maksimina maailman kärkitulo (noin 100 000 $/v).
    const tulo = parseInt(tiedot.keskitulo.arvo.replace(/[^0-9]/g, ''), 10);
    if (Number.isFinite(tulo)) palkki(osa, tulo / 100000);
  }
  for (const t of tiedot.tervehdykset ?? []) {
    const osa = html('span', 'tervehdys');
    osa.title = `"Hyvää päivää" — ${t.kieli}${t.osuus ? `, noin ${t.osuus} puhuu` : ''}`;
    /*
     * Tervehdys omaan kääreeseensä, jotta ladonta menee oikein
     * päin. Oikealta vasemmalle kirjoitettu tervehdys (arabian
     * "السلام عليكم") sekoitti rivin järjestyksen, kun se oli paljaana
     * tekstisolmuna vasemmalta oikealle latovan rivin sisällä: lippu
     * ja puhujaosuus saattoivat siirtyä tervehdyksen väärälle
     * puolelle. dir="auto" päättelee suunnan tekstistä ja
     * unicode-bidi: isolate (CSS) sulkee sen omaksi saarekkeekseen,
     * jolloin lippu on aina tervehdyksen jäljessä kielestä
     * riippumatta.
     */
    const teksti = html('span', 'tervehdys-teksti', t.teksti);
    teksti.dir = 'auto';
    osa.appendChild(teksti);
    // Lippu voi puuttua tarkoituksella. Vähemmistökielen merkitseminen
    // naapurivaltion lipulla liittäisi puhujat toiseen maahan, vaikka
    // he ovat oman maansa kansalaisia — ja niissä maissa, joihin se
    // valtio on hyökännyt tai jotka se on miehittänyt, se olisi
    // suorastaan väärin (omistajan päätös). Silloin rivillä on pelkkä
    // tervehdys ja kielen nimi.
    if (t.lippu) {
      const lippu = document.createElement('img');
      lippu.alt = t.kieli;
      lippu.className = 'tervehdys-lippu';
      // Ei loading="lazy": liput ovat repossa ja pikkuruisia, ja laiska
      // lataus jätti ne dialogin sisällä toisinaan kokonaan lataamatta.
      // Poisto vasta kun kumpikin osoite on pettänyt — oma virhekuuntelija
      // olisi vienyt lipun jo peilin ensimmäisestä virheestä.
      asetaKuva(lippu, lippuUrl(t.lippu, 40), lippuVara(t.lippu, 40), () => lippu.remove());
      osa.appendChild(lippu);
    }
    // Karkea puhujaosuus kielen perässä (omistajan kokeilu).
    if (t.osuus) osa.appendChild(html('span', 'maa-sija tervehdys-osuus', t.osuus));
    ui.arrivalMaaTervehdykset.appendChild(osa);
  }
}

/**
 * Kuuntele kieltä: kaupungissa nauhoitettu näyte, jossa ihmiset
 * puhuvat (omistajan toive). Nappi on tervehdysrivin perässä, koska
 * teksti kertoo mitä sanotaan ja näyte miltä se kuulostaa.
 *
 * Näyte on eri asia kuin kaupungin taustaääni: se soi kerran
 * painalluksesta, joten selvä puhe on siinä vahvuus eikä toistuva
 * häiriö. Tausta väistyy näytteen ajaksi kuten kulttuurinostoissa.
 */
/**
 * Mediarivit molempiin lehtiin (omistajan toive 8.8.2026: "radio- ja
 * videonapit näkyviin kumpaankin lehteen").
 *
 * Ennen rivejä oli yksi ja se asui maaosastossa. Kun maaosasto
 * siirtyi karttamaissa omalle sivulleen, radio ja tv lähtivät
 * kaupunkilehdestä mukana — pelaaja oli juuri saapunut paikkaan,
 * mutta paikallisradio löytyi vain toisesta lehdestä.
 *
 * Nyt rivejä on kaksi. Kaupunkilehden rivi on aina, ja maaosaston
 * rivi vain silloin kun osasto on OMALLA sivullaan: jos se on
 * kaupungin etusivun palstassa (maat ilman korkokarttaa), samat
 * napit näkyisivät kahdesti samassa näkymässä.
 */
export function paivitaMediarivit(ui) {
  const city = ui.lehtitila.mediaKaupunki;
  const iso = ui.lehtitila.mediaIso;
  for (const kohde of [ui.arrivalMedia, ui.arrivalMediaKaupunki]) {
    if (!kohde) continue;
    kohde.replaceChildren();
    kohde.hidden = true;
    // Pariluokka on rivin sisällön ominaisuus, ei elementin: ilman
    // nollausta edellisen kaupungin vanha tallenne jättäisi seuraavan
    // kaupungin yksinäisen radionapin pariladontaan.
    kohde.classList.remove('maa-media-pari');
  }
  if (city && ui.arrivalMediaKaupunki) {
    naytaKieliNappi(ui, city, ui.arrivalMediaKaupunki);
  }
  // Maaosaston rivi vain, kun osasto ei ole kaupungin etusivulla.
  if (!(ui.lehtitila.tutkiMaaEtusivu || ui.lehtitila.tutkiTila === 'maa')) return;
  /*
   * Maalehden voi avata mistä tahansa maasta (Maiden tiedot), eikä
   * se silloin ole se maa, jossa pelaaja seisoo. Radio on maan oma ja
   * seuraa lehteä, mutta kaupungissa nauhoitettu kielinäyte EI kuulu
   * vieraan maan lehteen — se olisi väärästä paikasta. Siksi kaupunki
   * annetaan vain oman maan lehdelle.
   */
  const maanIso = ui.lehtitila.tutkiTila === 'maa' ? (ui.lehtitila.tutkiMaaLehti ?? iso) : iso;
  naytaKieliNappi(ui, maanIso === iso ? city : null, ui.arrivalMedia, maanIso);
}

/**
 * ÄÄNIRIVIN VASEN PUOLI: aikakauden tallenne (omistajan tilaus
 * 21.8.2026 — "vanhan kuvan alapuolelle" vasemmalle vanha äänitallenne,
 * oikealle nykyinen radionappi).
 *
 * Sama ENNEN ja NYT -ajatus kuin v986:n kuvaparissa, mutta korvalle.
 * Vasemmalla on gramofonin aika, oikealla suora lähetys tästä
 * hetkestä — ja koska kumpikin on nappi, pelaaja voi soittaa ne
 * peräkkäin ja kuulla sadan vuoden eron.
 *
 * MERKINTÄ ON PIENI JA PAINETTU: rooliotsikko "Ennen" ladotaan samalla
 * harvennetulla versaalilla kuin kuvaparin otsikko, ja lähderivi jää
 * napin alle pienimmällä kirjasimella kuten kulttuurinostojen
 * lähteet. Painotuotteessa merkintä kertoo mitä katsotaan; se ei ole
 * oma palkkinsa.
 *
 * SOITIN ON SAMA kuin radiolla ja kulttuurinostoilla
 * (kulttuuriAaniNapista): taustan väistö, aikanäyttö ja soita/tauko
 * tulevat siitä valmiina, eikä tälle riville synny toista soitinta,
 * joka voisi soida päällekkäin radion kanssa.
 */
function vanhaAaniPuoli(ui, vanha) {
  const puoli = html('div', 'aani-puoli aani-ennen');
  puoli.appendChild(html('b', 'aani-rooli', 'Ennen'));
  const nappi = html('button', 'kulttuuri-kuuntele vanha-kuuntele');
  nappi.type = 'button';
  nappi.title = `${vanha.nimi} — ${vanha.esittaja}, ${vanha.vuosi}`;
  /*
   * Vuosi on OMA elementtinsä eikä osa nimeä. Nimet ovat pitkiä
   * ("Hold Your Hand Out, Naughty Boy") ja katkeavat napissa kolmeen
   * pisteeseen — yhtenä merkkijonona vuosi katkesi ensimmäisenä,
   * vaikka juuri se erottaa tallenteen radiosta. Nyt vuosi ei kutistu
   * (ks. .vanha-vuosi), ja pisteet syövät vain nimen häntää.
   */
  nappi.innerHTML = `${MERKKI_SOITA}<span>${suojaa(vanha.nimi)}</span>`
    + `<span class="vanha-vuosi">· ${suojaa(vanha.vuosi)}</span>`
    + '<span class="aika" hidden></span>';
  nappi.addEventListener('click', () => ui.kulttuuriAaniNapista({
    aani: vanha.url,
    otsikko: vanha.nimi,
  }, nappi));
  puoli.appendChild(nappi);
  puoli.appendChild(html('p', 'kulttuuri-lahde aani-lahde',
    `${vanha.esittaja} · ${vanha.lahde}`));
  return puoli;
}

export function naytaKieliNappi(ui, city, kohde = ui.arrivalMedia, iso = null) {
  const nayte = city ? (KIELET[ui.game.pack.id] ?? {})[city.id] : null;
  /*
   * Suora lähetys ensin, äänite varalle (omistajan järjestys).
   * Äänitettä ei poistettu: lähetysosoitteet lakkaavat toimimasta
   * ilman varoitusta, ja silloin nappi soittaa nauhan sen sijaan
   * että jäisi hiljaiseksi.
   */
  const maa = iso ?? (city ? ui.game.pack.map?.cityCountry?.[city.id] : null);
  const radio = radioMaalle(maa);
  /*
   * Vanha tallenne on kaupungin oma, maan tallenne vain varalta
   * (js/packs/vanhat-aanet.js). Ilman tallennetta rivi pysyy
   * täsmälleen entisenä — pariluokkaa ei lisätä lainkaan, joten
   * yksinäinen radionappi ei muutu kapeammaksi.
   */
  const vanha = vanhaTallenne(city?.id ?? null, maa);
  if (!radio && !nayte?.url && !vanha) return;
  kohde.hidden = false;
  if (vanha) {
    kohde.classList.add('maa-media-pari');
    kohde.appendChild(vanhaAaniPuoli(ui, vanha));
  }
  if (!radio && !nayte?.url) return;
  /*
   * Napissa lukee aseman nimi, ei "Kuuntele kieltä" (omistajan
   * toive). Nimi on se, mikä tekee napista houkuttelevan: "TRT
   * Radyo 1" kertoo että toisessa päässä on oikea asema, kun taas
   * yleisnimike voisi olla mitä tahansa nauhaa.
   *
   * Merkki vuorottelee soita/pysäytä-kuvakkeiden välillä, ja
   * suoralle lähetykselle näkyy punainen piste. Piste EI ole
   * koriste vaan tieto: jos suora katkeaa ja soitin putoaa
   * nauhoitettuun näytteeseen, piste sammuu — muuten se väittäisi
   * suoraa lähetystä nauhasta.
   */
  const nappi = html('button', 'kulttuuri-kuuntele kieli-kuuntele');
  nappi.type = 'button';
  const nimi = radio ? radio.asema : (nayte.nimi ?? 'Kaupungissa nauhoitettu näyte');
  nappi.title = radio ? `${nimi} — suora lähetys` : nimi;
  nappi.innerHTML = `${MERKKI_SOITA}<span>${suojaa(nimi)}</span>`
    + (radio ? '<span class="live" title="suora lähetys">live</span>' : '')
    + '<span class="aika" hidden></span>';
  // Sama soitin kuin kulttuurinostojen näytteillä: peilin varareitti,
  // taustan väistö ja aikanäyttö tulevat siitä valmiina.
  nappi.addEventListener('click', () => ui.kulttuuriAaniNapista({
    aani: radio ? radio.url : nayte.url,
    vara: radio ? (nayte?.url ?? null) : null,
    otsikko: nimi,
    suora: Boolean(radio),
  }, nappi));
  /*
   * Parissa radionappi saa oman puolensa ja "Nyt"-otsikon, jotta se
   * asettuu vanhan tallenteen kanssa samaan latomukseen. Yksin se
   * menee riville sellaisenaan kuten ennenkin — ylimääräinen kääre
   * muuttaisi rivin mitat kaupungeissa, joilla tallennetta ei ole.
   */
  if (!vanha) {
    kohde.appendChild(nappi);
    return;
  }
  const puoli = html('div', 'aani-puoli aani-nyt');
  puoli.appendChild(html('b', 'aani-rooli', 'Nyt'));
  puoli.appendChild(nappi);
  kohde.appendChild(puoli);
}

/**
 * Pieni infoikkuna V-Dem-luvusta (omistajan toive): maakohtainen
 * selitys siitä, miksi luku on se mikä on, lyhyt kuvaus V-Demistä ja
 * vasta niiden alla varsinainen linkki maan kuvaajaan.
 */
export function naytaVdemInfo(ui, demokratia) {
  const emo = ui.arrivalDialog.open ? ui.arrivalDialog : document.body;
  const kerros = html('div', 'vdem-info');
  const kortti = html('div', 'vdem-kortti');
  const maaNimi = ui.arrivalMaaNimi?.textContent || '';
  kortti.appendChild(html('h3', 'vdem-otsikko', `Demokratia — ${maaNimi}`));
  kortti.appendChild(html('p', 'vdem-arvo',
    `V-Dem-indeksi ${demokratia.arvo}` + (demokratia.sija ? ` · sija ${demokratia.sija} maailmassa` : '')));
  if (demokratia.selitys) {
    kortti.appendChild(html('p', 'vdem-selitys', demokratia.selitys));
  }
  kortti.appendChild(html('p', 'vdem-yleis',
    'V-Dem (Varieties of Democracy) on Göteborgin yliopiston tutkimus'
    + 'laitos, jonka liberaalin demokratian indeksi (0–1) mittaa vaalien '
    + 'vapautta, kansalaisoikeuksia ja vallankäytön valvontaa. Luku on '
    + 'satojen tutkijoiden arvioiden yhdistelmä.'));
  const linkki = html('a', 'vdem-linkki', 'Avaa maan kuvaaja — Our World in Data');
  linkki.href = demokratia.linkki;
  linkki.target = '_blank';
  linkki.rel = 'noopener noreferrer';
  kortti.appendChild(linkki);
  kerros.appendChild(kortti);
  // Napautus kortin ulkopuolelle sulkee.
  kerros.addEventListener('click', (e) => {
    if (e.target === kerros) kerros.remove();
  });
  const sulje = html('button', 'vdem-sulje', '✕');
  sulje.type = 'button';
  sulje.addEventListener('click', () => kerros.remove());
  kortti.appendChild(sulje);
  emo.appendChild(kerros);
}

/**
 * MAAN KARTTA KOKORUUDULLE (omistajan tilaus 21.8.2026: "maan kartta
 * saisi olla klikattavissa koko näytölle").
 *
 * EI OMAA KATSELINTA. Kokoruutu on sama kuin kaupunkilehden
 * kohdekartassa (js/nahtavyydet.js: avaaKarttaSuurennos): sama tumma
 * kortti, sama zoom ja panorointi, samat +/−-napit ja sama sulku
 * pelkästä rastista ja Escapesta. Myös avausele on sama — napautus,
 * Enter tai väli — ja alakulman "⤢ Kokoruutu" -lappu kertoo sen
 * ennen napautusta.
 *
 * KEHYS RAKENNETAAN VASTA AVATTAESSA. Sivun oma karttakehys ei kelpaa
 * kokoruudun pohjaksi: sen sisällä on kuvan lisäksi lähderivi, joten
 * sen laatikko ei ole kartan kuvasuhde, ja v977:n mitoitus (kelluva
 * tai täysleveä kartta) kuuluu sivulle eikä kokoruudulle. Tässä
 * tehdään pelkkä ikkuna kartan ympärille: kotelo pisteineen muuttuu
 * kloonina zoomaavaksi lavaksi, ja kuvasuhde tulee mitatusta
 * kotelosta. Sivun kartta pysyy koskemattomana.
 *
 * ELE EI SAA HÄIRITÄ SIVUN VIERITYSTÄ. Kartta on lehtisivun keskellä
 * tekstin seassa, ja sen päältä pyyhkäistään sivua kuten muualtakin.
 * Siksi avaus luetaan osoitintapahtumien MITATUSTA MATKASTA:
 * paikallaan pysynyt sormi on napautus, liikkunut on vieritys.
 */
function kytkeMaakartanSuurennos(ui, kehys, kotelo, kartta, nimi) {
  kehys.classList.add('kartta-avattava');
  kehys.tabIndex = 0;
  kehys.setAttribute('role', 'group');
  kehys.setAttribute('aria-label', `${nimi} kartalla. Avaa kokoruudulle Enterillä.`);
  // Lappu kuuluu KUVAN alakulmaan eikä kehyksen: kehyksen alareunassa
  // on vielä lähderivi, jonka päälle vihje asettuisi.
  const vihje = html('div', 'kartta-suurennusvihje', '⤢ Kokoruutu');
  vihje.setAttribute('aria-hidden', 'true');
  kotelo.appendChild(vihje);
  const avaa = () => {
    const mitat = kotelo.getBoundingClientRect();
    if (!(mitat.width > 0) || !(mitat.height > 0)) return;
    const iso = html('div', 'kartta-kehys kartta-kuvakehys');
    // Kehys on container-type: size -kokokontti, joten sen korkeus ei
    // tule sisällöstä vaan kuvasuhteesta (sama kuin kohdekartassa).
    iso.style.aspectRatio = `${mitat.width.toFixed(2)} / ${mitat.height.toFixed(2)}`;
    const lava = kotelo.cloneNode(true);
    lava.classList.add('kartta-lava');
    iso.appendChild(lava);
    avaaKarttaSuurennos(ui, iso, kartta, { mitat });
  };
  let napautus = null;
  kehys.addEventListener('pointerdown', (e) => {
    if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) {
      napautus = null;
      return;
    }
    napautus = { x: e.clientX, y: e.clientY };
  });
  kehys.addEventListener('pointercancel', () => { napautus = null; });
  kehys.addEventListener('pointerup', (e) => {
    const alku = napautus;
    napautus = null;
    if (!alku || !e.isPrimary) return;
    if (Math.hypot(e.clientX - alku.x, e.clientY - alku.y) > 6) return;
    if (e.target.closest?.('button, a')) return;
    avaa();
  });
  // Enter ja väli tekevät näppäimistöllä saman kuin napautus; sama
  // näppäin myös sulkee, jottei fokus tarvitse siirtyä mihinkään.
  kehys.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    e.preventDefault();
    if (ui.lehtitila.kulttuuriKuvaEl) ui.suljeKulttuuriKuva();
    else avaa();
  });
}

/**
 * Yhden kategorian nostot: johdanto ja sen alla kortit.
 *
 * Kohde on oletuksena aihesivun oma elementti; otsikon voi jättää
 * pois, jos sama piirto taittaa sisältöä muualle.
 */
/**
 * "Maa numeroina" -arkkisivu: moduuli ja aineisto haetaan vasta
 * tässä. Dynaaminen tuonti kuten linsseillä — yhden tiedoston
 * versio jää tarkoituksella ilman piirtäjää ja päätyy samaan
 * kohteliaaseen verkkoyhteysriviin kuin puuttuva aineisto.
 */
/**
 * Maaosion aloitussivu: iso korkokartta kaupunkipisteineen oikealla,
 * tunnusluvut ja esittely kiertävät sen vasemmalta, uutiset ja
 * mediarivi alla (omistajan taittotoive 7.8.2026).
 *
 * Sivu ei piirrä maaosaston sisältöä uudelleen vaan SIIRTÄÄ etusivun
 * #arrival-maa-elementin tänne: tunnusluvut, tervehdykset, esittely,
 * uutiset ja mediarivi täyttyvät openArrivalissa entiseen tapaan, ja
 * kuuntelijat ja kesken olevat haut seuraavat elementin mukana.
 * rakennaSivut palauttaa elementin etusivun palstaan seuraavassa
 * kaupungissa. Kartan päällystys asuu maakartat.js:ssä: pisteet
 * asemoidaan prosentteina tiedostosivun reunakoordinaateista.
 */
export function piirraMaaEtusivu(ui, kategoria) {
  const kohde = ui.arrivalKategoria;
  kohde.replaceChildren();
  /*
   * LIPPU MAAN NIMEN PERÄÄN (omistajan tilaus 16.8.2026). Karttasivu
   * piirtyy tästä omalla piirrollaan eikä piirraKategoriasta, joten
   * v785:ssä lisätty maaLippu-kenttä ei yksin riittänyt — otsikko
   * syntyi täällä ilman lippua (omistajan havainto: "maan etusivulta
   * puuttuu lippu maan nimen perästä otsikossa"). Lippu tehdään
   * samalla apurilla kuin aihesivuilla, joten se on myös sama nappi
   * lipun tarinaan siellä missä tarina on.
   */
  kohde.appendChild(aiheenOtsikko(ui, kategoria));
  const kartta = kategoria.kartta;
  // Kartta ennen tekstiä: kellutus koskee vain sen jälkeen tulevaa.
  const kehys = html('div', 'maakartta-kehys');
  // Pisteiden prosenttiasemointi vaatii kotelon, jossa on VAIN kuva —
  // lähderivi kehyksen sisällä venyttäisi asemointipohjaa alaspäin.
  const kotelo = html('div', 'maakartta-kotelo');
  const kuva = document.createElement('img');
  kuva.alt = `${kategoria.nimi} — korkokartta`;
  asetaKuva(kuva, valokuvaUrl(kartta.tiedosto, 1000), valokuvaVara(kartta.tiedosto, 1000));
  /*
   * KARTAN MITTA TULEE SEN OMASTA KUVASUHTEESTA (omistajan palaute
   * 21.8.2026: "kartat etusivulla saisi olla isompi"). Kehykselle
   * riittää tietää suhde: css laskee siitä leveyden korkeuskattoa
   * vasten, ja hyvin pitkulainen kartta siirtyy omaksi täysleveäksi
   * lohkokseen. Suunta selviää vasta latauksesta, kuten nostojen
   * pystykuvilla — eikä kuuntelija ole `once`, koska asetaKuva voi
   * vaihtaa lähteen varareitille kesken kaiken.
   */
  kuva.addEventListener('load', () => {
    if (!kuva.naturalWidth || !kuva.naturalHeight) return;
    const suhde = kuva.naturalWidth / kuva.naturalHeight;
    kehys.style.setProperty('--maakartta-suhde', suhde.toFixed(3));
    kehys.classList.toggle('kartta-levea', suhde >= 1.6);
  });
  kotelo.appendChild(kuva);
  for (const k of kartta.kaupungit ?? []) {
    const p = karttapiste(kartta, k.lat, k.lon);
    const piste = html('span', `maakartta-piste${k.paa ? ' paa' : ''}`);
    piste.style.left = `${p.x.toFixed(1)}%`;
    piste.style.top = `${p.y.toFixed(1)}%`;
    // Itäreunan lähellä nimi aukeaa länteen, ettei se leikkaudu
    // kuvan ulkopuolelle.
    if (p.x > 60) piste.classList.add('nimi-vasen');
    piste.appendChild(html('span', 'maakartta-nimi', k.nimi));
    kotelo.appendChild(piste);
  }
  kehys.appendChild(kotelo);
  kytkeMaakartanSuurennos(ui, kehys, kotelo, kartta, kategoria.nimi);
  kehys.appendChild(html('p', 'lahde', kartta.lahde));
  kohde.appendChild(kehys);
  ui.arrivalMaa.hidden = false;
  kohde.appendChild(ui.arrivalMaa);
  /*
   * Kuvanosto kartan ja uutisten väliin elävöittämään sivua
   * (omistajan toive 7.8.2026). Nosto piirretään maaosaston
   * SISÄÄN ennen uutispalstaa, koska uutiset ja media asuvat
   * samassa kääreessä — ja siivotaan pois rakennaSivutissa, kun
   * osasto palaa etusivun palstaan.
   */
  ui.arrivalMaa.querySelector(':scope > .maa-etusivu-nosto')?.remove();
  if (kartta.nosto) {
    const nostoKotelo = html('div', 'maa-etusivu-nosto');
    piirraKategoria(ui, { nostot: [kartta.nosto] }, nostoKotelo, { otsikko: false });
    ui.arrivalMaa.insertBefore(nostoKotelo, ui.arrivalOikea);
  }
  /*
   * PÄIVÄN KUVA POISTETTU (omistajan päätös 8.8.2026).
   *
   * Kuva tuli omasta tarkistetusta listasta ja vaihtui joka päivä,
   * mutta se ei liittynyt siihen maahan, jonka sivulla se oli.
   * Maalehdessä sivun jokaisen osan pitää kertoa siitä maasta.
   * js/packs/paivan-kuvat.js jää paikalleen: aineisto on
   * tarkistettua eikä sille ole tässä muuta käyttöä, mutta se voi
   * palata muualle.
   */
}

export async function piirraMaaNumerotSivu(ui, kategoria) {
  const kohde = ui.arrivalKategoria;
  kohde.replaceChildren();
  kohde.appendChild(html('h3', 'aihe-nimi', kategoria.nimi));
  const tila = html('p', 'johdanto', 'Haetaan tilastoja…');
  kohde.appendChild(tila);
  try {
    const { lataaMaakayrat, piirraMaaNumerot } = await import('./maakayrat.js');
    const data = await lataaMaakayrat();
    // Pelaaja ehti kääntää sivua: piirraKategoria tyhjensi kotelon,
    // eikä myöhässä valmistunut sivu saa kirjoittaa uuden päälle.
    if (!kohde.contains(tila)) return;
    if (!data) {
      tila.textContent = 'Tämä sivu tarvitsee verkkoyhteyden ensimmäisellä '
        + 'avauksella — luvut haetaan silloin talteen.';
      return;
    }
    if (!data.maat?.[kategoria.numerot]) {
      // Aineisto on, mutta maa puuttuu siitä — eri asia kuin verkko.
      tila.textContent = 'Tästä maasta ei ole vielä tilastosarjoja.';
      return;
    }
    tila.remove();
    // V-Dem on jo pelissä (maatiedot-paketit) — näytetään uudelleen,
    // ei haeta uudestaan.
    const maatiedot = MAATIEDOT[ui.game.pack.id] ?? {};
    const demokratia = maatiedot[kategoria.numerot]?.demokratia ?? null;
    /*
     * VERTAILU MUUTTI KARTALLE (v321). Tällä sivulla oli
     * Vertailulinssin maavalitsin, josta toisen maan sai samoille
     * asteikoille. Omistajan päätös 7.8.2026: *"ei upoteta näkymää
     * tutki osioon vaan linssi toimisi suoraan karttanäkymässä"* —
     * valitsin poistui, ja linssi ottaa nyt kartan haltuunsa
     * (tahdistaVertailu). Sivu palasi siihen, mitä se oli ennen
     * linssiä: maan omat käyrät ja Suomi himmeänä vertailuviivana.
     */
    piirraMaaNumerot(kohde, kategoria.numerot, data, { demokratia });
  } catch {
    tila.textContent = 'Tämä sivu tarvitsee verkkoyhteyden ensimmäisellä '
      + 'avauksella — luvut haetaan silloin talteen.';
  }
}

/**
 * Menovinkkien listamalli: ryhmiteltyjä rivejä, joissa on pieni
 * kuva, nimi linkkinä ja lyhyt selitys.
 *
 * Ryhmäotsikko on lukijan kartta: kaksikymmentä osoitetta peräkkäin
 * on luettelo, mutta samat kaksikymmentä neljän otsikon alla on
 * hakemisto, josta löytää sen mitä etsii.
 *
 * Kuvaton rivi on täysin kelvollinen (ks. piirraKategoria).
 */
/**
 * Yhden aihesivun tiivistys sisällysluetteloon: pieni kuva ja
 * yhden rivin ingressi.
 *
 * Kuva otetaan sivun omasta aineistosta eikä erillisestä
 * kansikuvakentästä — sellaista ei ole, ja jokaisen aiheen
 * varustaminen sillä käsin olisi kahdenkymmenen maan työ. Sivun
 * ensimmäinen kuva on käytännössä aina sen paras kuva.
 */
export function sisallysTiedot(ui, osa) {
  if (osa.kartta) return { kuva: osa.kartta.tiedosto, ingressi: 'Kaupungit ja maasto kartalla.' };
  if (osa.numerot) return { kuva: null, ingressi: 'Väkiluku, pinta-ala ja muut tunnusluvut.' };
  const ensimmainen = osa.lista?.[0]?.kohteet?.[0] ?? osa.nostot?.[0] ?? null;
  // Ingressi on johdannon ensimmäinen virke: se on kirjoitettu
  // kertomaan mistä sivulla on kyse, eli juuri tähän tarkoitukseen.
  const johdanto = osa.johdanto ?? ensimmainen?.teksti ?? '';
  const virke = (johdanto.match(/[^.!?]+[.!?]/) ?? [johdanto])[0].trim();
  return { kuva: ensimmainen?.tiedosto ?? null, ingressi: virke };
}

/** Sisällysluettelon rivit. Käytetään sekä etusivulla että valikossa. */
export function rakennaSisallysLista(ui, sisallys, { suljeValikko = null, etusivuRivi = false } = {}) {
  const lista = html('div', 'sisallys');
  // Etusivurivi vain valikkoon (etusivulla lista on jo etusivulla).
  if (etusivuRivi) {
    const rivi = html('button', 'sisallys-rivi');
    rivi.type = 'button';
    /*
     * Kansi saa saman kohtelun kuin muutkin rivit (omistajan
     * havainto 14.8.2026: "Kannesta puuttuu kuva ja tekstit"):
     * pikkukuvana kannen pääkuva ja ingressinä kansiosion johdannon
     * ensimmäinen virke. Ilman kansidataa rivi näkyy entisellään.
     */
    const kansi = ui.lehtitila.tutkiKansi;
    const kansikuva = kansi?.kansikuvat?.[0]?.tiedosto ?? null;
    if (kansikuva) {
      const img = document.createElement('img');
      img.className = 'sisallys-kuva';
      img.alt = '';
      img.decoding = 'async';
      asetaKuva(img, valokuvaUrl(kansikuva, 320), valokuvaVara(kansikuva, 320));
      rivi.appendChild(img);
    }
    const johdanto = kansi?.johdanto ?? '';
    const ingressi = johdanto
      ? (johdanto.match(/[^.!?]+[.!?]/) ?? [johdanto])[0].trim()
      : 'Lehden kansi.';
    const teksti = html('div', 'sisallys-teksti');
    teksti.appendChild(html('span', 'sisallys-otsikko', 'Etusivu'));
    teksti.appendChild(html('span', 'sisallys-ingressi', ingressi));
    rivi.appendChild(teksti);
    rivi.addEventListener('click', () => {
      suljeValikko?.();
      ui.naytaTutkiSivu(0, { suunta: -1 });
    });
    lista.appendChild(rivi);
  }
  for (const osa of sisallys ?? []) {
    const { kuva, ingressi } = sisallysTiedot(ui, osa);
    const rivi = html('button', 'sisallys-rivi');
    rivi.type = 'button';
    if (kuva) {
      const img = document.createElement('img');
      img.className = 'sisallys-kuva';
      img.alt = '';
      img.decoding = 'async';
      asetaKuva(img, valokuvaUrl(kuva, 320), valokuvaVara(kuva, 320));
      rivi.appendChild(img);
    }
    const teksti = html('div', 'sisallys-teksti');
    // Sama otsikko kuin sivulla itsellään ja alapalkin napeissa
    // (kaupunki-sivulla "X pintaa syvemmältä").
    teksti.appendChild(html('span', 'sisallys-otsikko', sivunOtsikko(osa)));
    if (ingressi) teksti.appendChild(html('span', 'sisallys-ingressi', ingressi));
    rivi.appendChild(teksti);
    rivi.addEventListener('click', () => {
      const i = (ui.lehtitila.tutkiSivut ?? []).indexOf(osa);
      if (i >= 0) {
        suljeValikko?.();
        ui.naytaTutkiSivu(i + 1, { suunta: 1 });
      }
    });
    lista.appendChild(rivi);
  }
  return lista;
}

export function piirraVinkkilista(ui, kohde, ryhmat) {
  for (const ryhma of ryhmat ?? []) {
    if (ryhma.otsikko) kohde.appendChild(html('h4', 'vinkki-ryhma', ryhma.otsikko));
    const lista = html('ul', 'vinkkilista');
    for (const k of ryhma.kohteet ?? []) {
      const rivi = html('li', `vinkki${k.tiedosto ? '' : ' kuvaton'}`);
      if (k.tiedosto) {
        const kuva = document.createElement('img');
        kuva.className = 'vinkki-kuva';
        kuva.alt = k.selite ?? k.nimi ?? '';
        kuva.decoding = 'async';
        kuva.draggable = false;
        // Pikkukuva riittää: rivin kuva on noin sata pikseliä leveä,
        // ja iso tiedosto vain hidastaisi kahdenkymmenen rivin sivua.
        asetaKuva(kuva, valokuvaUrl(k.tiedosto, 320), valokuvaVara(k.tiedosto, 320));
        rivi.appendChild(kuva);
      }
      const teksti = html('div', 'vinkki-teksti');
      const linkki = html('a', 'vinkki-nimi', k.nimi ?? k.linkki);
      linkki.href = k.linkki;
      linkki.target = '_blank';
      linkki.rel = 'noopener noreferrer';
      teksti.appendChild(linkki);
      if (k.teksti) teksti.appendChild(html('p', 'vinkki-selitys', k.teksti));
      // Lähdemaininta on lisenssin ehto, ei koriste — pienellä,
      // mutta aina näkyvissä.
      if (k.lahde) teksti.appendChild(html('p', 'vinkki-lahde', k.lahde));
      rivi.appendChild(teksti);
      lista.appendChild(rivi);
    }
    kohde.appendChild(lista);
  }
}

/**
 * Aihesivun otsikkorivi: nimi, mahdollinen kehittäjätagi ja maan
 * lippu perässä.
 *
 * Oma metodinsa, koska SAMA rivi tarvitaan kahdessa piirrossa:
 * tavallisilla aihesivuilla (piirraKategoria) ja maan karttasivulla
 * (piirraMaaEtusivu), joka piirtyy kokonaan omalla koodillaan. Kun
 * lippu oli vain piirraKategoriassa, karttasivun otsikko jäi ilman
 * lippua vaikka data oli kunnossa — omistajan havainto 16.8.2026.
 */
/*
 * KAKKOSSIVUN NIMI (omistajan tarkennus 21.8.2026): kaupunki-sivu
 * eli kansisivun jälkeinen sivu toisti kaupungin nimen otsikkona.
 * Nyt se saa vakiokaavan "X pintaa syvemmältä"; teemasivut pysyvät
 * kategoriatason vakionimissään (omistaja: spesifit otsikot olivat
 * liikaa). Valinnainen otsikko-kenttä voittaa aina kaavan. Sivu-id
 * ja nimi säilyvät ennallaan (visat, kuvakkeet, Pöllö).
 *
 * Oma funktionsa, koska sama nimi tarvitaan myös alapalkin
 * EDELLINEN/SEURAAVA-napeissa (omistajan havainto 21.8.2026:
 * napissa luki "Rooma" vaikka sivu on "Rooma pintaa syvemmältä").
 */
export function sivunOtsikko(kategoria) {
  const oletus = kategoria.id === 'kaupunki'
    ? `${kategoria.nimi} pintaa syvemmältä` : kategoria.nimi;
  return kategoria.otsikko ?? oletus;
}

export function aiheenOtsikko(ui, kategoria) {
  const nimi = html('h3', 'aihe-nimi', sivunOtsikko(kategoria));
  // Kehittäjän liitteissä osion valmiusaste värichippinä
  // otsikon perässä (omistajan tilaus 15.8.2026).
  if (kategoria.tagi) {
    nimi.appendChild(html('span', `kehittaja-tagi ${kategoria.tagi.luokka}`,
      kategoria.tagi.teksti));
  }
  // Maan sivun tunnisteena lippu otsikkorivin oikeassa reunassa
  // (omistajan toive 7.8.2026) — nimessä ei enää maan genetiiviä.
  if (kategoria.maaLippu) {
    const lippu = document.createElement('img');
    lippu.className = 'aihe-lippu';
    lippu.alt = kategoria.maa ?? '';
    lippu.title = kategoria.maa ?? '';
    asetaKuva(lippu, lippuUrl(kategoria.maaLippu, 96), lippuVara(kategoria.maaLippu, 96));
    /*
     * LIPPU ON NAPPI, JOS SILLE ON TARINA (omistajan tilaus
     * 15.8.2026: "Tee lipusta klikattava" — pilotti Suomi ja
     * Saksa). Maa ilman lipputietoja pitää entisen pelkän kuvan.
     */
    const tiedot = LIPPUTIEDOT[kategoria.maaLippu];
    if (tiedot) {
      const nappi = html('button', 'aihe-lippu-nappi');
      nappi.type = 'button';
      nappi.title = `${tiedot.maa} — lipun tarina`;
      nappi.setAttribute('aria-label', `${tiedot.maa} — avaa lipun tarina`);
      nappi.appendChild(lippu);
      nappi.addEventListener('click', () => avaaLippuikkuna(kategoria.maaLippu));
      nimi.appendChild(nappi);
    } else {
      nimi.appendChild(lippu);
    }
  }
  return nimi;
}

/*
 * PÖLLÖPOIMINNAT AIHESIVULLE (omistajan tilaus 23.8.2026).
 *
 * Vain oikea aihesivu saa pillerit: karttasivun nostokotelo piirtyy
 * samalla funktiolla mutta omaan säiliöönsä ilman otsikkoa (ks.
 * piirraMaaEtusivu), eikä kehittäjän liitteillä (Raamattu, Tilanne,
 * Tilastot) ole artikkelitunnistetta lainkaan.
 *
 * Omistaja erottelee kaupunkilehden ja maalehden saman aiheen sivut
 * samalla logiikalla kuin minitehtävän avain (js/ui.js).
 */
function piirraAiheenPoiminnat(ui, kohde, kategoria, otsikko) {
  if (!otsikko || kohde !== ui.arrivalKategoria) return;
  if (ui.lehtitila?.tutkiTila === 'kehittaja' || !kategoria?.id) return;
  const omistaja = ui.lehtitila?.tutkiTila === 'maa' && ui.lehtitila?.tutkiMaaLehti
    ? ui.lehtitila.tutkiMaaLehti : ui.lehtitila?.arrivalShownFor;
  piirraPoimintapillerit(kohde, aiheAvain(omistaja, kategoria.id));
}

export function piirraKategoria(ui, kategoria, kohde = ui.arrivalKategoria, { otsikko = true } = {}) {
  kohde.replaceChildren();
  if (!kategoria) return;
  // Kehittäjän liitteet taitetaan yhdelle palstalle ilman lehden
  // koristeita (omistaja 15.8.2026: "Poista palstat raamatun
  // taitosta. Ei tarvitse näyttää lehdeltä."). Toggle, jotta luokka
  // lähtee pois kun samaan koteloon piirtyy tavallinen sivu.
  kohde.classList.toggle('yksipalsta', Boolean(kategoria.yksipalsta));
  // Kuvake ei kerro nimeä, joten nimi lukee sisällön yllä.
  if (otsikko) kohde.appendChild(aiheenOtsikko(ui, kategoria));
  /*
   * Litteä nostolista piirretään vanhalla piirrolla: siinä on
   * musiikkilinkit, ääninäytteet ja "Lue lisää aiheesta" -napit,
   * joita kategorianostoissa ei ole.
   */
  if (kategoria.litteä) {
    ui.piirraKulttuuriNostot(kohde, kategoria.nostot ?? []);
    return;
  }
  /*
   * OMA PIIRTO (kehittäjän liitteet, Tilastot-lehti 18.8.2026).
   *
   * Sivu, jonka sisältö ei ole nostoja vaan taulukko tai muu
   * rakennelma, tuo mukanaan oman piirtofunktionsa. Sama malli kuin
   * kartta- ja numerosivuilla (js/lehti.js naytaTutkiSivu), mutta
   * täällä, koska otsikko ja yksipalstaisuus tulevat kategoriasta.
   * PELIN sisältöpaketeissa kenttää ei ole eikä saa olla: pelaajan
   * lehti on luettavaa tekstiä.
   */
  if (kategoria.rakenna) {
    kategoria.rakenna(kohde, ui);
    /*
     * rakennaJatka (20.8.2026, Tilannelehden tuoreet-chipit): sivu
     * voi haluta oman rakennelman NOSTOJEN LISÄKSI eikä niiden
     * sijaan. Oletus on vanha käytös (pelkkä rakenna), jotta
     * Tilastot-lehden taulusivut eivät muutu.
     */
    if (!kategoria.rakennaJatka) return;
  }
  if (kategoria.johdanto) {
    kohde.appendChild(html('p', 'johdanto', kategoria.johdanto));
  }
  /*
   * LISTAMALLI (omistajan päätös 8.8.2026: menovinkit "enemmän
   * listamaiseksi").
   *
   * Nostomalli antaa yhdelle kohteelle puoli sivua. Se on oikein
   * silloin, kun kohteita on kuusi ja jokaisesta on jotain
   * kerrottavaa — mutta menovinkit on hakemisto, ja hakemistossa
   * määrä on arvo itsessään: kaksikymmentä osoitetta ryhmiteltynä
   * palvelee lukijaa paremmin kuin kuusi esseetä.
   *
   * Rivi on siis pieni kuva, nimi linkkinä ja lause tai kaksi.
   * Kuva on VAPAAEHTOINEN: hyvä osoite pääsee listalle ilman
   * kuvaakin, koska kelvollista vapaata kuvaa ei ole jokaisesta
   * museosta eikä puuttuva kuva saa karsia hyvää kohdetta.
   */
  /*
   * Luokka togglena eikä add-kutsuna (omistajan tilaus 23.8.2026):
   * add jätti vinkkisivu-luokan päälle Menovinkit-käynnin jälkeen,
   * jolloin SEURAAVIENKIN aihesivujen johdanto kasvoi ingressiksi.
   */
  kohde.classList.toggle('vinkkisivu', Boolean(kategoria.lista));
  if (kategoria.lista) {
    /*
     * Taitto pois tasapaksusta pötköstä (omistajan palaute
     * 10.8.2026: "voisi olla vaikka yksi iso kuva ja alustusteksti
     * isommalla, listaa voisi myös kaventaa"): johdanto nousee
     * ingressiksi (vinkkisivu-luokka kasvattaa sen CSS:ssä) ja
     * ryhmien ensimmäisen kuvallisen kohteen kuva nostetaan sivun
     * avauskuvaksi täyteen leveyteen. Kohde jää silti listaan —
     * hero on taittoa, ei uusi sisältöpaikka.
     */
    const eka = (kategoria.lista ?? [])
      .flatMap((r) => r.kohteet ?? [])
      .find((k) => k.tiedosto);
    if (eka) {
      const hero = html('figure', 'vinkki-hero');
      const kuva = document.createElement('img');
      kuva.alt = eka.selite ?? eka.nimi ?? '';
      kuva.decoding = 'async';
      asetaKuva(kuva, valokuvaUrl(eka.tiedosto, 1200), valokuvaVara(eka.tiedosto, 1200), () => hero.remove());
      hero.appendChild(kuva);
      /*
       * Kuvateksti on lukijalle, kreditti lisenssille — omistajan
       * palaute 10.8.2026: "Kuvan kreditit pienemmällä ja isommalla
       * kuvateksti." Selite siis leipätekstikoossa ja kreditti sen
       * JATKEENA samalla rivillä hennolla pienellä (omistajan tilaus
       * 23.8.2026; ks. css/styles.css "LÄHDERIVI KUVATEKSTIN JATKEEKSI").
       */
      if (eka.selite || eka.lahde) {
        const teksti = html('figcaption', 'vinkki-hero-teksti');
        if (eka.selite) teksti.appendChild(html('span', 'vinkki-hero-selite', eka.selite));
        if (eka.lahde) teksti.appendChild(html('span', 'lahde', eka.lahde));
        hero.appendChild(teksti);
      }
      // Hero johdannon perään, ennen ryhmiä.
      kohde.appendChild(hero);
    }
    piirraVinkkilista(ui, kohde, kategoria.lista);
    piirraAiheenPoiminnat(ui, kohde, kategoria, otsikko);
    // Kevyen kulun nimetty tehtävä voittaa sivun oman; ilman kumpaakaan
    // ei piirretä mitään (js/fokustehtavat.js piirraSivunTehtava).
    piirraSivunTehtava(ui, kohde, kategoria);
    return;
  }
  /*
   * SITAATTINOSTO POISTETTU KOKONAAN (omistajan päätös 23.8.2026:
   * "Nämä nostot ovat turhia koska kappaleet ovat itsessään niin
   * lyhyitä. Voi ottaa pois.").
   *
   * Nosto poimi virkkeen SEURAAVASTA jutusta, ja koska aihesivujen
   * jutut ovat lyhyitä, sama virke luettiin heti sen alta uudestaan
   * — Istanbulin "Pintaa syvemmältä" -sivulla Yerebatan-virke näkyi
   * kahdesti samassa ruudussa. Ei siis omaa hengähdyspaikkaa vaan
   * toistoa. Sitaatti oli myös luennassa (blockquoten kappale on
   * lukijan valkolistalla), joten se poistuu nyt myös kuunneltavasta
   * sivusta.
   */
  let ensimmainen = true;
  for (const nosto of kategoria.nostot ?? []) {
    const lohko = html('div', 'wiki-nosto');
    // Otsikko ja kuuntelu-/musiikkinapit samalla rivillä — sama
    // toiminnallisuus kuin litteissä nostoissa, ettei monistaminen
    // hävitä Apple Music -linkkejä ja ääninäytteitä.
    const otsikkoRivi = html('div', 'kulttuuri-otsikkorivi');
    otsikkoRivi.appendChild(html('h3', '', nosto.otsikko));
    ui.lisaaNostonNapit(otsikkoRivi, nosto);
    // Ajankohta otsikkorivin oikeassa reunassa hahmottamisen tueksi
    // (omistajan toive 7.8.2026: "Historia sivulla vuosisadan voisi
    // merkitä jotenkin otsikkorivillä") — kenttä on vapaaehtoinen
    // ja toimii millä tahansa sivulla.
    if (nosto.aika) otsikkoRivi.appendChild(html('span', 'nosto-aika', nosto.aika));
    lohko.appendChild(otsikkoRivi);
    let kuva = null;
    if (nosto.tiedosto) {
      kuva = document.createElement('img');
      // Sama syy kuin litteissä nostoissa: nollan kokoinen laiska kuva
      // ei lataudu WebKitissä lainkaan. Vain avatun aiheen kuvat ovat
      // kerrallaan DOM:issa, joten määrä pysyy pienenä.
      ui.varustaNostonKuva(kuva, nosto, 900);
      /*
       * Pystykuva saa kainalossa oman, kapeamman mittansa (omistajan
       * palaute 21.8.2026: "pysty joka levittäytyy aivan liian
       * korkeaksi"): 42 prosentin leveys venyttäisi 2:3-kuvan noin
       * 500 pikseliin. Suunta selviää vasta kuvan latauduttua.
       *
       * Kuuntelija EI ole enää `once`, eikä galleriaa ohiteta
       * (21.8.2026). Juuri Ateenan evzoni-galleria oli se lohko, josta
       * omistaja huomautti: sekä sen ensimmäinen kuva että "toinen
       * vaihtoehto" ovat pystyjä. Nyt luokka lasketaan sille kuvalle,
       * joka kulloinkin on näkyvissä, ja teosta vaihtaessa mitta
       * korjautuu mukana.
       */
      kuva.addEventListener('load', () => {
        lohko.classList.toggle('pysty', kuva.naturalHeight > kuva.naturalWidth * 1.15);
        /*
         * TÄYSLEVEÄ NOSTOKUVA (omistajan tilaus 23.8.2026: "visuaalisesti
         * laadukkaat vaakakuvat saisi olla täysleveitä" — esimerkkinä
         * Gaertnerin Berliini-panoraama). Valinta on kaksiportainen:
         *
         *   1. KÄSINOHJAUS voittaa aina: noston kenttä
         *      leveys: 'taysi' pakottaa täysleveäksi ja
         *      leveys: 'kapea' pitää kainalossa, vaikka automatiikka
         *      sanoisi toisin.
         *   2. AUTOMATIIKKA: selvästi leveä vaakakuva (suhde ≥ 1,6)
         *      levitetään koko palstalle. Kynnys on harkittu niin,
         *      että tavalliset 3:2-valokuvat (1,5) jäävät kainaloon
         *      ja vasta panoraamamaiset kuvat (16:9 = 1,78,
         *      maalauspanoraamat) leviävät — juuri ne, jotka 36 %:n
         *      kainalossa kutistuvat postimerkiksi.
         *
         * Suunta ja suhde selviävät vasta kuvan latauduttua, ja
         * galleriassa luokka lasketaan uudelleen joka teokselle kuten
         * pysty-luokkakin.
         */
        const suhde = kuva.naturalWidth / Math.max(1, kuva.naturalHeight);
        const taysi = nosto.leveys === 'taysi'
          || (nosto.leveys !== 'kapea' && suhde >= 1.6);
        lohko.classList.toggle('taysileve', taysi);
      });
      lohko.appendChild(kuva);
    } else if (nosto.kuvaUrl) {
      /*
       * SUORA OSOITE (Lukijoilta-lehti, js/lehti.js): lukijan
       * lähettämä kuva tulee workerin kautta eikä ole pelin peilissä,
       * joten sille ei ole valokuvaUrl-polkua eikä varareittiä.
       * Tavallinen img riittää — jos kuva ei lataudu, se jää tyhjäksi
       * eikä vie muuta sivua mukanaan.
       */
      kuva = document.createElement('img');
      kuva.decoding = 'async';
      kuva.draggable = false;
      kuva.alt = nosto.selite ?? nosto.otsikko ?? 'Lukijan lähettämä kuva';
      kuva.src = nosto.kuvaUrl;
      lohko.appendChild(kuva);
    }
    /*
     * KUVATEKSTI POIS AIHESIVUILTA (omistajan päätös 23.8.2026:
     * "ota ennemmin Kuvatekstit pois ja laita leipäteksti kiertämään
     * kuvaa, niin tyhjä tila katoaa samalla").
     *
     * Selite oli kuvan alla kolmesta viiteen riviä ja teki kelluvasta
     * kainalosta juttua korkeamman: leipäteksti loppui kuvan puolivälin
     * kohdalla ja lohkon vasempaan alanurkkaan jäi tyhjä kaista (mitattu
     * Istanbulin "pintaa syvemmältä" -sivulla, 1280 px). Nyt kainalossa
     * on kuva ja sen alla pelkkä lähderivi, ja teksti juoksee kuvan
     * ohi sen alle asti.
     *
     * SELITE EI KATOA TIEDOSTA: se on yhä kuvan alt-teksti
     * (varustaNostonKuva) ja suurennoksen kuvateksti
     * (naytaKulttuuriKuva saa noston sellaisenaan), eli ruudunlukija ja
     * suurennoksen avaava lukija saavat sen kuten ennenkin.
     *
     * LÄHDERIVI SÄILYY. Se ei ole koriste vaan lisenssiehto: Commonsin
     * CC-kuvat vaativat tekijän ja lisenssin näkyviin (Raamattu). Tyyli
     * on v1040:n pienennetty krediittirivi sellaisenaan.
     */
    // Pro-tuottajan kuvassa (`tekijaId`) tekijän nimi on lähderivillä
    // painike, joka avaa tekijäsivun (js/tekijakortti.js). Ilman
    // kenttää rivi on tavallista tekstiä kuten ennen.
    const lahde = nosto.lahde
      ? taytaLahderivi(html('p', 'lahde'), lahdemerkinta(nosto.lahde), nosto) : null;
    /*
     * Kehys tehdään AINA kun nostossa on kuva (21.8.2026). Ennen se
     * jäi tekemättä, jos kuvalla ei ollut selitettä eikä lähdettä, ja
     * paljas img olisi jäänyt kainalotaiton ulkopuolelle — yksi kuva
     * sivulla olisi käyttäytynyt eri tavalla kuin muut ilman että
     * lukija näkee siihen mitään syytä.
     */
    if (kuva) {
      const kehys = html('div', 'kuvakehys');
      kehys.appendChild(kuva);
      if (lahde) kehys.appendChild(lahde);
      lohko.appendChild(kehys);
      /*
       * KAINALOKUVA (omistajan palaute 21.8.2026: "ruokakuvat
       * kannattaisi pienentää pienemmiksi ja laittaa leipäteksti
       * juoksemaan sen vierelle"). Luokka kertoo taitolle, että
       * lohkossa on kelluva kuva; itse kellutus ja mitat ovat
       * CSS:ssä ja voimassa vasta ≥ 700 px:n ruudulla.
       *
       * Myös selattava galleria: nuolet ovat kuvan päällä kolmanneksen
       * levyisinä osuma-alueina, joten ne kutistuvat kuvan mukana eikä
       * mikään jää tavoittamattomiin.
       */
      lohko.classList.add('kainalo');
    } else if (lahde) {
      lohko.appendChild(lahde);
    }
    // Yksipalstainen kehittäjäsivu ei saa anfangia — se on lehden
    // koriste (omistaja 15.8.2026).
    const leipa = piirraLeipa(lohko, nosto.teksti, {
      anfangi: ensimmainen && !kategoria.yksipalsta,
    });
    ensimmainen = false;
    if (nosto.wiki) {
      const nappi = html('button', 'wiki-btn', 'Lue lisää aiheesta');
      nappi.type = 'button';
      nappi.addEventListener('click', () => ui.openWikiArticle(nosto.wiki, nosto.otsikko));
      // Heti leipätekstin loppuun, ei erilliseksi lohkoksi sivun
      // pohjalle (omistajan toive 5.8.2026).
      leipa.appendChild(nappi);
    }
    /*
     * TOIMINTONAPIT — vain kehittäjälehdillä (js/lehti.js: Lukijoilta
     * ja sen pro-osio). Nosto voi kantaa napit, joilla omistaja tekee
     * päätöksen suoraan lehdestä, koska työhuone ON lehti eikä
     * erillistä hallintapaneelia ole. Pelin sisältöpaketeissa kenttää
     * ei ole eikä saa olla: pelaajan lehti on lukemista varten.
     */
    for (const toiminto of nosto.toiminnot ?? []) {
      const nappi = html('button', 'wiki-btn', toiminto.nimi);
      nappi.type = 'button';
      nappi.addEventListener('click', () => toiminto.tehtava(nappi));
      leipa.appendChild(nappi);
    }
    ui.lisaaNostonLinkki(leipa, nosto);
    // Selattava teosgalleria noston kuvan ympärille (pilottina
    // Venetsian Canaletto): nuolet vaihtavat teosta ja lähderivi
    // seuraa mukana. Selitettä ei enää ole sivulla (ks. yllä), joten
    // galleria saa sen paikalle tyhjän — teoksen oma selite kulkee
    // silti alt-tekstinä ja suurennoksessa (nayta()).
    if (kuva && nosto.galleria?.length) {
      ui.kaariNostoGalleria(kuva, nosto, { lahde });
    }
    kohde.appendChild(lohko);
  }
  // Pöllöpoiminnat jutun perään, ennen minitehtävää (omistajan tilaus
  // 23.8.2026): tehtävälaatikko erottaa luettavan sivun pelitoiminnosta,
  // ja pillerit kuuluvat luettavan puolelle.
  piirraAiheenPoiminnat(ui, kohde, kategoria, otsikko);
  // Lehden minitehtävä sivun loppuun (omistajan toive 5.8.2026) — tai
  // kevyen kulun nimetty tehtävä, jos sivulla on sellainen.
  piirraSivunTehtava(ui, kohde, kategoria);
  // Kohdekartta EI ole enää täällä kaupunkisivun pohjalla: omistajan
  // tarkennus 7.8.2026 "kartta pitäisi olla jo ihan ensimmäisellä
  // sivulla" siirsi sen lehden etusivulle (naytaTutkiSivu), eikä
  // sama sisältö saa näkyä kahdesti.
}
