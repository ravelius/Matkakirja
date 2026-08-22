/*
 * Nähtävyydet ja kohdekartta: kaupungin värikartta piirroskohteineen,
 * nähtävyysjuttujen dialogi paluupinoineen, etusivun
 * Matkailijalle-paneeli ja kuvakarusellit. Siirretty js/ui.js:stä
 * 17.8.2026 (remontin M4, malli B —
 * docs/moduulirakenne-suunnitelma.md). Funktiot saavat ui-olion
 * ensimmäisenä parametrinaan; ne kirjoittavat vain oman piirteensä
 * kenttiä (ui.nahtavyys*). Opasartikkelin taitto kutsutaan
 * ui.taitaOpas-delegaattorin kautta, jotta js/opas.js:ään ei synny
 * tuontisykliä.
 */

import { kytkeKarttaZoom } from './karttazoom.js';
import { liitaLukija, pysaytaLukija } from './lukija.js';
import { el } from './mapart.js';
import { asetaKuva, julisteUrl } from './media.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { HENKILOLINKIT, HENKILOT } from './packs/henkilot.js';
import {
  KAUPUNKIKARTAT, karttaKuvasuhde, karttapiste, mittakaava, ydinAla,
} from './packs/maakartat.js';
import { MINIATYYRIT } from './packs/miniatyyrit.js';
import { NAHTAVYYSJUTUT } from './packs/nahtavyysjutut.js';
import { sfx } from './sound.js';
import { taytaLahderivi } from './tekijakortti.js';
import { esilataaKuvat, html, lahdemerkinta, vuosiluku } from './ui-apurit.js';

/**
 * Kaupunkisivun lopun kohdekartta. Omistajan taittopäätös 7.8.2026:
 * "Kartta kannattaakin tehdä isoksi ja merkata siihen
 * yksinkertaisesti pelkkiä ympyröitä, joissa on numero sisällä, ja
 * sitten tehdä selitteet tekstimuodossa kartan ulkopuolelle."
 *
 * Järjestys: otsikko, esittely, koko palstan levyinen kartta,
 * numeroidut selitteet ja lähderivi. Numerointi tulee kohteiden
 * järjestyksestä datassa. Kohde, jolla on tarkistettu fi.wikipedian
 * artikkeli, aukeaa sekä kartan ympyrästä että selitteestä; muut
 * ovat pelkkiä merkkejä. Data: js/packs/maakartat.js
 * (KAUPUNKIKARTAT).
 */
export function piirraKaupunkiKartta(ui, kohde) {
  const kartta = KAUPUNKIKARTAT[ui.lehtitila.arrivalShownFor];
  if (!kartta) return;
  const lohko = html('div', 'kaupunkikartta');
  lohko.appendChild(html('h3', 'kaupunkikartta-otsikko', 'Kaupunki kartalla'));
  // Esittely kahdessa palstassa (omistajan tilaus 15.8.2026:
  // "kaupunki kartalla teksti voisi olla kahdessa palstassa");
  // kapealla ruudulla CSS palauttaa yhden palstan.
  const palstat = html('div', 'kaupunkikartta-palstat');
  for (const kappale of (kartta.esittely ?? '').split('\n\n').filter(Boolean)) {
    palstat.appendChild(html('p', 'kaupunkikartta-esittely', kappale));
  }
  lohko.appendChild(palstat);
  /*
   * ZOOMATTAVA KARTTAIKKUNA (omistajan tilaus 14.8.2026: "voiko
   * kaupunkikartasta tehdä zoomattavaa ... pyörisi nykyisessä
   * ikkunassa").
   *
   * Kehys on kiinteä ikkuna, jonka koko ei muutu; lava on sen sisällä
   * oleva liikkuva taso, jolle KAIKKI kartan osat kuuluvat — kuva,
   * kohdepisteet ja mittajana. Siksi zoomia ei tarvitse ohjelmoida
   * kuin yhteen paikkaan: pisteet ja jana ovat prosentteina lavasta,
   * joten ne seuraavat muunnosta itsestään eikä yhtäkään
   * koordinaattia lasketa uudelleen. Sama pätee näkymävipuun:
   * piirros ja satelliittikuva ovat samassa rajauksessa, joten
   * zoomiasento säilyy näkymää vaihdettaessa sellaisenaan.
   */
  const kehys = html('div', 'kartta-kehys');
  /*
   * Kehys on näppäimistöllä oma kohteensa, jotta zoom ei jää
   * pelkäksi eleeksi: plus ja miinus suurentavat, nuolet siirtävät
   * zoomattua karttaa ja nolla palauttaa koko kartan.
   */
  kehys.tabIndex = 0;
  kehys.setAttribute('role', 'group');
  kehys.setAttribute(
    'aria-label',
    'Kartta. Avaa kokoruudulle Enterillä. Suurenna plus- ja miinusnäppäimillä, '
    + 'siirrä nuolilla, palauta nollalla.',
  );
  // Napautus avaa kartan kokoruudulle (ks. avaaKarttaSuurennos);
  // luokka antaa kohdistimen ja pitää zoomatun kartan otekohdistimen
  // ennallaan.
  kehys.classList.add('kartta-avattava');
  const kotelo = html('div', 'maakartta-kotelo kaupunkikartta-kotelo kartta-lava');
  /*
   * KARTTA JATKUU REUNOJEN YLI (omistajan tilaus 15.8.2026: "sitä
   * voisi lisätä piirroksessa että kartta jatkuisi pidemmälle").
   *
   * Juliste on piirretty ydinrajausta laajemmalta alueelta
   * (maakartat.js: piirtoRajat), mutta LEPOTILASSA SIVU NÄYTTÄÄ
   * TÄSMÄLLEEN YDINRAJAUKSEN — reunus paljastuu vasta zoomatessa,
   * kun panorointi jatkuu sen puolelle sen sijaan että pysähtyisi
   * kuvan reunaan.
   *
   * Se tehdään asettelulla eikä muunnoksella: lava on kehystä
   * suurempi (leveys = kehys / ydinrajauksen osuus) ja siirretty
   * negatiivisella left/top-arvolla niin, että ydinrajaus osuu
   * tarkalleen kehyksen päälle. Muunnos olisi ollut lyhyempi
   * kirjoittaa, mutta se rikkoisi kytkeKarttaZoomin invariantin:
   * kertoimella 1 lavalla EI SAA OLLA transformia lainkaan, tai
   * kartan hiusviivat rasteroituvat eri tavalla kuin ennen tätä
   * ominaisuutta.
   *
   * Kehys tarvitsee silloin oman korkeutensa (lava ei ole enää
   * virrassa): aspect-ratio ydinrajauksesta. Koska piirtoRajat on
   * SAMASTA KESKIPISTEESTÄ, molempien rajausten venytyskerroin on
   * sama, ja ydinrajauksen kuvasuhde kehyksessä on tarkalleen
   * karttaKuvasuhde(rajat) — sama luku, jolla piirtäjä valitsi
   * kuvan korkeuden.
   *
   * Vanha kartta ilman piirtoRajat-lohkoa ei käy tästä läpi
   * lainkaan: ydinAla palauttaa koko kuvan, laajennettu on epätosi
   * ja asettelu jää entiselleen.
   */
  const ydin = ydinAla(kartta);
  // Luokan nimi on kartta-laajennettu eikä laajennettu: pelkkä
  // `laajennettu` on varattu päiväkirjan poistuneelle välikoolle,
  // eikä se saa palata (tests/rules.test.mjs).
  const laajennettu = Boolean(kartta.piirtoRajat);
  if (laajennettu) {
    kehys.classList.add('kartta-laajennettu');
    kehys.style.aspectRatio = String(karttaKuvasuhde(kartta.rajat));
    kotelo.classList.add('kartta-laajennettu');
    kotelo.style.aspectRatio = String(karttaKuvasuhde(kartta.piirtoRajat));
    kotelo.style.width = `${(10000 / ydin.leveys).toFixed(4)}%`;
    kotelo.style.left = `${((-ydin.x * 100) / ydin.leveys).toFixed(4)}%`;
    kotelo.style.top = `${((-ydin.y * 100) / ydin.korkeus).toFixed(4)}%`;
  }
  const kuva = document.createElement('img');
  kuva.alt = 'Kaupungin kartta';
  // Hiiren raahaus panoroi karttaa; ilman tätä selain aloittaisi
  // sen sijaan oman kuvanvetonsa.
  kuva.draggable = false;
  // Oma julistekartta on paikallinen tiedosto (assets/kartat/);
  // Commons-pohjainen kartta haetaan peilin kautta kuten kuvat.
  // Värikartta ohittaa piirrosjulisteen (omistajan päätös
  // 15.8.2026: "pitää vain värillisen").
  const karttapohja = kartta.varikartta ?? kartta.polku;
  if (karttapohja) kuva.src = karttapohja;
  else asetaKuva(kuva, valokuvaUrl(kartta.tiedosto, 1000), valokuvaVara(kartta.tiedosto, 1000));
  kotelo.appendChild(kuva);
  /*
   * KEHYKSEN KORKEUS ILMAN piirtoRajat-LOHKOA (korjaus 20.8.2026,
   * omistajan havainto "Lähi-idässä ei näy kaupunkien kartat").
   *
   * .kartta-kehys on container-type: size -kokokontti (v892, jotta
   * valittu piirros voi mitata itsensä cqh:lla) — ja kokokontin
   * korkeus EI tule sisällöstä. Laajennettu kartta saa korkeutensa
   * yllä aspect-ratiosta, mutta ilman piirtoRajat-lohkoa piirretty
   * kartta (koko Lähi-itä v937+, uudet Aasian kartat) jäi nollaan:
   * osio näytti tekstin ja kohdelistan mutta itse kartta oli
   * näkymätön. Kuvasuhde otetaan itse kuvatiedostosta eikä
   * rajauksesta, koska kainalollisen kartan PNG on rajausta
   * korkeampi (kainalo piirtyy kuvan jatkeeksi) ja rajaussuhteella
   * kainalo leikkautuisi pois.
   */
  if (!laajennettu) {
    const mitoitaKehys = () => {
      if (kuva.naturalWidth && kuva.naturalHeight) {
        kehys.style.aspectRatio = `${kuva.naturalWidth} / ${kuva.naturalHeight}`;
      }
    };
    if (kuva.complete) mitoitaKehys();
    else kuva.addEventListener('load', mitoitaKehys, { once: true });
  }
  /*
   * Kuva peittää koko lavan. (Satelliittinäkymän erikoistapaus —
   * vanhan rajauksen kuva ydinrajauksen päällä — poistui v709:ssä,
   * kun värikartta korvasi satelliitin kaikissa kaupungeissa;
   * värikartta on piirretty samalta piirtoRajat-alueelta kuin
   * juliste.)
   */
  const asetaKuvanAla = () => {
    if (!laajennettu) return;
    kuva.style.left = '0%';
    kuva.style.top = '0%';
    kuva.style.width = '100%';
    kuva.style.height = '100%';
  };
  asetaKuvanAla();
  /*
   * Mittakaavajana kartan vasempaan alakulmaan (omistajan toive
   * 9.8.2026). Pituus ja teksti tulevat rajauksesta
   * (maakartat.js:n mittakaava), joten uusi kaupunki saa janan
   * ilman että tähän kosketaan.
   *
   * Leveys on prosentteina kuvan leveydestä eikä pikseleinä: kuva
   * skaalautuu puhelimesta työpöytään, ja pikselimitta valehtelisi
   * heti ensimmäisellä kokomuutoksella. Prosentti pitää janan
   * oikeana joka leveydellä.
   */
  const jana = mittakaava(kartta);
  if (jana) {
    const mitta = html('div', 'kartta-mittajana');
    mitta.style.width = `${jana.osuus.toFixed(2)}%`;
    /*
     * Jana kuuluu KEHYKSEN vasempaan alakulmaan, ei lavan. CSS
     * asemoi sen prosentteina lavasta (3,2 % / 5 %), mikä on sama
     * asia niin kauan kuin lava on kehyksen kokoinen — laajennetulla
     * kartalla se jäisi reunukselle kehyksen ulkopuolelle. Sama
     * kulma lasketaan siksi ydinrajauksen sisään.
     */
    if (laajennettu) {
      mitta.style.left = `${(ydin.x + 0.032 * ydin.leveys).toFixed(3)}%`;
      mitta.style.bottom = `${(100 - ydin.y - 0.95 * ydin.korkeus).toFixed(3)}%`;
    }
    mitta.appendChild(html('span', 'kartta-mittajana-teksti', jana.teksti));
    mitta.setAttribute('aria-label', `Mittakaava: janan pituus vastaa ${jana.teksti}`);
    kotelo.appendChild(mitta);
  }
  const selitteet = html('div', 'kartta-selitteet');
  /*
   * Nähtävyysjuttu voi asua joko suoraan kartan kohdeoliossa
   * (Lontoo, kirjoitettu maakartat.js:ään) tai omassa tiedostossaan
   * nimen mukaan avaimistettuna (js/packs/nahtavyysjutut.js) —
   * näin kartta/koordinaattidataa (maakartat.js) ei tarvitse
   * koskea, kun juttuja lisätään uusille kaupungeille. Juttu
   * voittaa kohteen mahdollisen wiki-kentän (undefined ohittaa
   * sen), koska omalla jutulla ei näytetä "Lue lisää" -linkkiä.
   */
  const kaupunki = ui.lehtitila.arrivalShownFor;
  // Piirrospisteet kerätään hajautusta varten (ks. metodin loppu).
  const piirrosPisteet = [];
  (kartta.kohteet ?? []).forEach((raaka, i) => {
    const juttu = NAHTAVYYSJUTUT[kaupunki]?.[raaka.nimi];
    const k = juttu ? { ...raaka, wiki: undefined, ...juttu } : raaka;
    const numero = String(i + 1);
    const p = karttapiste(kartta, k.lat, k.lon);
    // Napautettava, jos kohteella on oma juttu TAI wiki-artikkeli.
    const avattava = Boolean(k.teksti || k.wiki);
    const miniatyyri = MINIATYYRIT[kaupunki]?.[raaka.nimi] ?? null;
    /*
     * PIIRROS NUMERON PAIKALLA (omistajan tilaukset 15.8.2026:
     * "Piirrokset kartalla saisi näkyä numeroiden paikalla" ja
     * "Ota numerot pois kartalta ja tee piirroksista leikattuja").
     * Kohde, jolla on miniatyyri, piirtyy kartalle taustattomana
     * leikkauskuvana ilman numeroa; selitelistan numerointi riittää
     * kytkemään listan ja kartan. Kohde ilman miniatyyriä on
     * entinen numeroympyrä. Nimikyltti näkyy vain valittuna
     * (suurennettuna) — ks. valintalogiikka alempana.
     */
    const piste = html(avattava ? 'button' : 'span',
      'maakartta-piste kaupunki-kohde kohde-numero', miniatyyri ? '' : numero);
    if (miniatyyri) {
      piste.classList.add('kohde-piirros');
      const pikku = document.createElement('img');
      pikku.className = 'kohde-piirros-kuva';
      pikku.alt = '';
      pikku.decoding = 'async';
      pikku.draggable = false;
      pikku.src = miniatyyri;
      piste.appendChild(pikku);
      // Numero kylttiin (omistajan tilaus 15.8.2026: "Nimikyltissä
      // saisi olla numero näkyvissä") — kytkee kyltin selitelistaan.
      const kyltti = html('span', 'kohde-kyltti', `${numero} · ${k.nimi}`);
      kyltti.setAttribute('aria-hidden', 'true');
      piste.appendChild(kyltti);
      piirrosPisteet.push({ piste, x: p.x, y: p.y });
    }
    piste.style.left = `${p.x.toFixed(1)}%`;
    piste.style.top = `${p.y.toFixed(1)}%`;
    // Numero talteen myös piirroskohteelta: kokoruutunäkymä merkitsee
    // sillä piirrokset selitelistan numeroihin (avaaKarttaSuurennos).
    piste.dataset.numero = numero;
    const selite = html(avattava ? 'button' : 'span', 'kartta-selite');
    selite.appendChild(html('span', 'kartta-selite-numero', numero));
    selite.appendChild(document.createTextNode(k.nimi));
    /*
     * Oma juttu voittaa wikin (omistajan toive 7.8.2026: "kirjoita
     * itse nähtävyyksien tekstit"). Ilman omaa tekstiä napautus avaa
     * wikin kuten ennenkin, ja ilman kumpaakaan piste on pelkkä
     * merkki — vanhat kaupungit toimivat siis ennallaan.
     */
    const avaaJuttu = k.teksti ? () => avaaNahtavyys(ui, k, numero)
      : (k.wiki ? () => ui.openWikiArticle(k.wiki, k.nimi) : null);
    /*
     * NAPAUTUS SUURENTAA, KYLTTI AVAA JUTUN (omistajan linjaukset
     * 15.8.2026: "Riittää kun saa klikattua isommaksi (kasvaa vain
     * kokoa ilman ikkunaa)" ja "klikkaamalla avautuvaa nimikylttiä
     * pitäisi päästä kohteen pop-up-ikkunaan"). Napautus kuvaan
     * kasvattaa piirroksen ja näyttää nimikyltin (CSS: .valittu);
     * uusi napautus kuvaan palauttaa koon, mutta napautus KYLTTIIN
     * avaa jutun. Juttuun pääsee myös selitelistasta kuten ennen.
     * Numeroympyrä (kohde ilman piirrosta) avaa jutun suoraan.
     */
    const avaa = (miniatyyri && avaaJuttu)
      ? () => {
        /*
         * Suurennetun KUVAN tai kyltin napautus avaa jutun
         * (omistajan tilaus 15.8.2026: "Muuta koko kuva kyltin
         * lisäksi viemään pop up juttuun"). Valinta puretaan
         * napauttamalla kartan tyhjää kohtaa tai Escapella.
         */
        if (piste.classList.contains('valittu')) {
          avaaJuttu();
          return;
        }
        tyhjennaValinta();
        /*
         * KESKITYS (omistajan tilaus 15.8.2026: "Keskitä
         * suurennettu kuva") — reunakohteen suurennos leikkautui
         * karttaikkunan reunaan. Valittu piste siirtyy näkyvän
         * ikkunan keskelle ja palaa paikalleen suljettaessa;
         * alkuperäinen paikka talteen dataset-kenttiin.
         */
        piste.dataset.alkuLeft = piste.style.left;
        piste.dataset.alkuTop = piste.style.top;
        const kehysMitat = kehys.getBoundingClientRect();
        const lavaMitat = kotelo.getBoundingClientRect();
        if (lavaMitat.width > 0) {
          const x = ((kehysMitat.left + kehysMitat.width / 2 - lavaMitat.left)
            / lavaMitat.width) * 100;
          const y = ((kehysMitat.top + kehysMitat.height / 2 - lavaMitat.top)
            / lavaMitat.height) * 100;
          piste.style.left = `${x.toFixed(2)}%`;
          piste.style.top = `${y.toFixed(2)}%`;
        }
        piste.classList.add('valittu');
      }
      : avaaJuttu;
    /*
     * Kohteen nimi hiiren alla (omistajan toive 8.8.2026). Ympyrässä
     * lukee vain numero, ja selitelista on kartan alla — työpöydällä
     * kohteen tunnistaminen vaati siis katseen siirtämistä edestakaisin.
     *
     * Vihje on oma elementtinsä eikä selaimen `title`, koska title
     * ilmestyy sekunnin viiveellä eikä sitä voi tyylitellä. Se on myös
     * syy, miksi pisteestä EI enää anneta titleä: kaksi vihjettä
     * päällekkäin olisi pahempi kuin ei kumpaakaan. Saavutettava nimi
     * tulee tilalle aria-labelina, ja selitelistan napissa title
     * säilyy — siinä lukee jo nimi, joten päällekkäisyyttä ei synny.
     *
     * Näkyvyyden ratkaisee CSS yksin (`hover: hover`), joten
     * kosketuslaitteella tämä on olemassa vain DOM:issa: napautus
     * avaa jutun täsmälleen kuten ennen.
     */
    if (avaa) {
      const otsikko = k.teksti ? `${k.nimi} — lue lisää` : `${k.nimi} — avaa artikkelin`;
      piste.type = 'button';
      piste.addEventListener('click', avaa);
      selite.type = 'button';
      // Selitelistan rivi ohittaa kortin — nimi on jo rivillä.
      selite.addEventListener('click', avaaJuttu ?? avaa);
      selite.title = otsikko;
      piste.setAttribute('aria-label', miniatyyri ? `${k.nimi} — suurenna piirros` : otsikko);
    }
    const vihje = html('span', 'kohde-vihje', k.nimi);
    vihje.setAttribute('aria-hidden', 'true');
    /*
     * Vihje aukeaa ympyrän YLÄPUOLELLE, mutta zoomattava kartta on
     * leikkaava ikkuna (ks. kartta-kehys) — yläreunan kohteilla
     * vihje jäisi leikkauksen taakse. Ylimmät kohteet saavat sen
     * siksi ympyrän alle. Raja on prosenttia YDINRAJAUKSEN
     * korkeudesta eli siitä, mitä kehyksessä näkyy: laajennetulla
     * kartalla kuvan oma yläreuna on reunuksella, jota kehys ei
     * lepotilassa näytä lainkaan.
     */
    if (((p.y - ydin.y) / ydin.korkeus) * 100 < 14) piste.classList.add('vihje-alle');
    piste.appendChild(vihje);
    kotelo.appendChild(piste);
    selitteet.appendChild(selite);
  });
  /*
   * Napautus kartan tyhjään kohtaan (tai Escape) palauttaa
   * suurennetun piirroksen ennalleen. Kaappausvaihe, jotta myös
   * panorointiote kartan päältä sulkee valinnan.
   */
  const tyhjennaValinta = () => kotelo.querySelectorAll('.kohde-piirros.valittu')
    .forEach((v) => {
      v.classList.remove('valittu');
      // Keskitetty piste palaa omalle paikalleen kartalla.
      if (v.dataset.alkuLeft) v.style.left = v.dataset.alkuLeft;
      if (v.dataset.alkuTop) v.style.top = v.dataset.alkuTop;
    });
  // Oliko piirros suurennettuna, kun ele alkoi? Kokoruutu ei saa
  // aueta samasta napautuksesta, joka purkaa valinnan (alla).
  let oliValinta = false;
  kehys.addEventListener('pointerdown', (e) => {
    oliValinta = Boolean(kotelo.querySelector('.kohde-piirros.valittu'));
    if (!e.target.closest?.('.kohde-piirros')) tyhjennaValinta();
  }, true);
  /*
   * NAPAUTUS AVAA KARTAN KOKORUUDULLE (omistajan tilaus 21.8.2026:
   * "voisiko kaupunkikartan saada klikattua kokoruudulle?").
   *
   * Ele luetaan itse osoitintapahtumista eikä click-tapahtumasta:
   * kartalla on jo raahaus, nipistys ja tuplanapautus
   * (js/karttazoom.js), ja niiden perään jätetty napsautustulppa on
   * saman kehyksen kuuntelija — click-varainen avaus riippuisi
   * kuuntelijoiden rekisteröintijärjestyksestä. Mitattu matka on
   * yksiselitteinen: paikallaan pysynyt sormi tai hiiri on napautus,
   * liikkunut ei.
   *
   * Neljä poikkeusta, joista jokainen on jo jonkun toisen eleen:
   *   - nappi tai linkki (kohteen ympyrä, piirros, selite) avaa oman
   *     juttunsa kuten ennen;
   *   - napautus, joka purki suurennetun piirroksen valinnan;
   *   - zoomattu kartta, jossa napautus kuuluu panoroinnille ja
   *     tuplanapautuksen palautukselle;
   *   - useamman sormen ele (nipistys), joka ei ole napautus lainkaan.
   */
  let napautus = null;
  kehys.addEventListener('pointerdown', (e) => {
    if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) {
      napautus = null;
      return;
    }
    napautus = { x: e.clientX, y: e.clientY, valinta: oliValinta };
  });
  kehys.addEventListener('pointercancel', () => { napautus = null; });
  kehys.addEventListener('pointerup', (e) => {
    const alku = napautus;
    napautus = null;
    if (!alku || !e.isPrimary || alku.valinta) return;
    if (Math.hypot(e.clientX - alku.x, e.clientY - alku.y) > 6) return;
    if (e.target.closest?.('button, a')) return;
    if (kehys.classList.contains('zoomattu')) return;
    avaaKarttaSuurennos(ui, kehys, kartta);
  });
  kehys.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { tyhjennaValinta(); return; }
    // Enter ja väli tekevät näppäimistöllä saman kuin napautus. Sama
    // näppäin myös sulkee, jottei fokus tarvitse siirtyä mihinkään:
    // kokoruutu on kehyksen vaihtokytkin.
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    e.preventDefault();
    if (ui.lehtitila.kulttuuriKuvaEl) ui.suljeKulttuuriKuva();
    else avaaKarttaSuurennos(ui, kehys, kartta);
  });
  hajautaPiirrospisteet(kotelo, piirrosPisteet, ydin);
  /*
   * Näkymävipu piirroksen ja värikartan välillä (omistajan tilaus
   * 14.8.2026 satelliitille; värikartta korvasi satelliitin
   * 15.8.2026). Näkyy vain kaupungilla, jolle värikartta on
   * piirretty — muut kartat piirtyvät ilman vipua.
   *
   * Vaihto koskee VAIN taustakuvaa: molemmat julisteet on piirretty
   * samalta piirtoRajat-alueelta, joten kohdepisteet, selitteet,
   * mittajana, zoom ja panorointi ovat yhteiset ilman omaa koodia.
   *
   * Kaksi nappia eikä yksi vuorottelija: yhden napin teksti
   * valehtelee kumpaan suuntaan tahansa, koska "Värikartta"
   * tarkoittaisi kerran kohdetta ja kerran nykytilaa.
   *
   * Valinta on istuntokohtainen eikä mene tallennukseen — se on
   * katselutapa, ei pelitilanne. Muistissa on kaupungin tunnus eikä
   * pelkkä totuusarvo, jottei toisen kaupungin lehti aukea
   * värinäkymään.
   */
  const lahderivi = html('p', 'lahde', kartta.lahde);
  /*
   * Kartan työkalurivi: zoomipainikkeet vasemmalla, näkymävipu
   * oikealla. Rivi on kartan yllä, koska kuvan päälle asetetut
   * painikkeet peittäisivät juuri sen kohdan, jota katsotaan — ja
   * koska näkymävipu on ollut siinä 14.8.2026 alkaen.
   */
  const tyokalut = html('div', 'kartta-tyokalut');
  const zoomiRyhma = html('div', 'kartta-zoomi');
  zoomiRyhma.setAttribute('role', 'group');
  zoomiRyhma.setAttribute('aria-label', 'Kartan suurennus');
  const zoomiNappi = (merkki, nimi) => {
    const nappi = html('button', 'kartta-vipu-nappi kartta-zoomi-nappi', merkki);
    nappi.type = 'button';
    nappi.setAttribute('aria-label', nimi);
    nappi.title = nimi;
    zoomiRyhma.appendChild(nappi);
    return nappi;
  };
  const napit = {
    loitonna: zoomiNappi('−', 'Loitonna karttaa'),
    lahenna: zoomiNappi('+', 'Lähennä karttaa'),
  };
  /*
   * Zoomin ohjaus on kytketty vasta lohkon lopussa (kytkeKarttaZoom
   * tarvitsee valmiin kehyksen), mutta näkymävipu tarvitsee siihen
   * kahvan jo tässä. Olio täytetään kytkennässä.
   */
  const zoomOhjain = {};
  tyokalut.appendChild(zoomiRyhma);
  /*
   * VAIN VÄRIKARTTA (omistajan päätös 15.8.2026: "Piirroskartan voi
   * ottaa kokonaan pois ja pitää vain värillisen. Se on todella
   * hieno nyt!"). Piirros/Värikartta-vipu eli v707–v735; kaupunki,
   * jolla on varikartta-kenttä, näyttää nyt suoraan värikartan —
   * se on piirretty samalta piirtoRajat-alueelta kuin juliste,
   * joten zoom, panorointi ja pisteet toimivat sellaisinaan.
   * (Kuvan lähde asetetaan kuvan luonnissa ylempänä.)
   */
  lohko.appendChild(tyokalut);
  kehys.appendChild(kotelo);
  /*
   * OPASTE KARTAN PÄÄLLE (omistajan tilaus 18.8.2026): ohje kohteiden
   * napauttamisesta oli ennen jokaisen kaupungin esittelytekstin
   * viimeisenä virkkeenä — kaksitoista kertaa sama lause leipätekstissä,
   * kaukana siitä kartasta, jota se koskee. Nyt se on pieni kyltti
   * kartan oikeassa yläkulmassa ja kirjoitetaan VAIN tähän, joten
   * uusi kaupunki saa sen ilman omaa riviään.
   *
   * Kyltti kuuluu KEHYKSEEN eikä lavalle: lava zoomaa ja panoroi, ja
   * opaste on ohje eikä maisemaa — sen paikan on pysyttävä samana.
   * `pointer-events: none` pitää panorointiotteen ja kohteiden
   * napautukset ennallaan kyltin alla. Luenta ohittaa sen
   * (js/lukija.js: .kartta-opaste).
   */
  const opaste = html('div', 'kartta-opaste', 'Napauta nähtävyyttä, saat lisätietoja.');
  opaste.setAttribute('aria-hidden', 'true');
  kehys.appendChild(opaste);
  /*
   * SUURENNOSVIHJE OMANA LAPPUNAAN kartan oikeassa ALAkulmassa
   * (omistajan tilaus 21.8.2026). Ensin se kokeiltiin toisena rivinä
   * yläkulman opasteessa, mutta puhelimen kapealla ruudulla kyltistä
   * tuli neljä riviä korkea ja se peitti kartan pohjoisreunan
   * kohteet. Kahden sanan lappu vastakkaisessa kulmassa pysyy
   * yksirivisenä joka leveydellä; vasen alakulma on mittajanan, joten
   * oikea on vapaa.
   */
  const vihje = html('div', 'kartta-suurennusvihje', '⤢ Kokoruutu');
  vihje.setAttribute('aria-hidden', 'true');
  kehys.appendChild(vihje);
  lohko.appendChild(kehys);
  lohko.appendChild(selitteet);
  lohko.appendChild(lahderivi);
  kohde.appendChild(lohko);
  kytkeKarttaZoom(ui, kehys, kotelo, napit, ydin, zoomOhjain);
}

/**
 * KOKORUUTUKARTAN MITOITUS MITATAAN, EI LASKETA CSS-YKSIKÖILLÄ
 * (omistajan iPad-palaute 21.8.2026: "iPadilla kaupungin kartta liian
 * pieni koko näytöllä" — kartta jäi pieneksi lapuksi mustan keskelle).
 *
 * Ensimmäinen mitoitus oli puhdasta CSS:ää:
 * `min(98vw, calc(82dvh * var(--kartta-suhde)))`. Kaava on oikea, ja
 * Chromiumissa se antaa pystyruudulla täyden leveyden — mutta se
 * nojaa kolmeen asiaan, joista jokainen voi pettää tabletilla:
 * dvh:n arvoon selaimen palkkien alla, `min()`-lausekkeeseen, jossa
 * on kahta eri viewport-yksikköä, ja siihen että laskettu ala on
 * sama kuin se, joka oikeasti näkyy. iPadin Safari näyttää sivua
 * tarvittaessa omassa mittakaavassaan, jolloin CSS:n ruutu ja
 * silmän ruutu eivät ole sama asia.
 *
 * Siksi luvut luetaan visualViewportista — siitä alasta, joka
 * KATSOJALLA on näkyvissä juuri nyt — ja kortin leveys asetetaan
 * pikseleinä. Sääntö on sama kuin ennen, nyt vain mitattuna:
 * leveyttä enintään 98 % näkyvästä leveydestä ja kartalle korkeutta
 * enintään 85 % näkyvästä korkeudesta, kumpi tahansa täyttyykin
 * ensin kartan omalla kuvasuhteella. Pystyruudulla vaakakartta
 * täyttää siis koko leveyden, ja sen alle jäävä tila on kuvasuhteen
 * laki eikä mitoituksen puute.
 *
 * TOINEN KIERROS ON SELITETTÄ VARTEN. Kartan alle tulevat vielä
 * numeroiden selite ja lähderivi, ja kapealla ruudulla selite voi
 * olla monirivinen. Ensimmäisen mitoituksen jälkeen kortin oma
 * korkeus mitataan, ja jos se ylittää ruudun, leveyttä pienennetään
 * tarkalleen sen verran kuin ylitys kartan kuvasuhteella vaatii —
 * arvaamisen sijaan.
 */
function mitoitaKarttaSuurennos(kortti, suhde) {
  const nakyma = window.visualViewport;
  const vw = Math.round(nakyma?.width || window.innerWidth || 0);
  const vh = Math.round(nakyma?.height || window.innerHeight || 0);
  if (!(vw > 0) || !(vh > 0) || !(suhde > 0)) return;
  const leveys = Math.min(vw * 0.98, vh * 0.85 * suhde);
  kortti.style.width = `${Math.round(leveys)}px`;
  kortti.style.maxHeight = `${Math.round(vh * 0.98)}px`;
  const yli = kortti.scrollHeight - vh * 0.98;
  // Alaraja puolet ruudusta: yksikään selite ei saa kutistaa karttaa
  // pienemmäksi kuin se oli lehden sivulla.
  if (yli > 1) kortti.style.width = `${Math.round(Math.max(leveys - yli * suhde, vw * 0.5))}px`;
}

/**
 * KOHDEKARTTA KOKORUUDULLE (omistajan tilaus 21.8.2026: "voisiko
 * kaupunkikartan saada klikattua kokoruudulle?").
 *
 * EI UUTTA IKKUNAJÄRJESTELMÄÄ. Suurennos on täsmälleen sama
 * postikorttikatselin, jolla lehden valokuvat, uutiset ja vuosisää jo
 * aukeavat (js/ui.js: naytaKulttuuriKuva, js/lehti.js: naytaVuosiSaa):
 * kortti `postikortti kulttuuri-suurennos`, tumma pohja kortin omasta
 * ::before-kerroksesta, sulku rastista ja Escapesta
 * (ui.rekisteroiSuurennosNappaimet).
 * Kortti menee päällimmäiseen avoimeen dialogiin (ui.suurennosIsanta),
 * joten kartta aukeaa yhtä lailla kaupunkilehdestä kuin Matkailijan
 * oppaan ikkunasta.
 *
 * SULKU VAIN RASTISTA JA ESCAPESTA (omistajan palaute 21.8.2026: "Se
 * myös sulkeutuu heti, jos karttaa painaa ... Kartta voisi sulkeutua
 * vasta X-kirjaimesta"). Muut suurennokset sulkeutuvat mistä tahansa
 * napautuksesta, mutta kartta ei ole katselukuva vaan käsiteltävä
 * kartta: sitä zoomataan, panoroidaan ja tuplanapautetaan, ja jokainen
 * niistä eleistä alkaa napautuksella kortin päällä. Kokoruudun
 * napautussulku olisi siis suoraan zoomin tiellä.
 *
 * KARTTA KLOONATAAN KEHYKSINEEN, ei näytetä pelkkänä <img>-kuvana.
 * Numeroympyrät, leikatut piirroskohteet ja mittajana ovat
 * DOM-elementtejä kuvan päällä prosenttipaikoissaan, joten pelkkä
 * kuvatiedosto jäisi kokoruudulla ilman numeroita — juuri niitä
 * varten karttaa suurennetaan. Klooni on katselukuva vain siltä osin
 * kuin lehden omat kuuntelijat eivät seuraa mukana: zoomiasento
 * nollataan avattaessa, ja kloonille kytketään OMA karttazoominsa
 * (kytkeKarttaZoom), joten kokoruudulla pyörä, nipistys, raahaus ja
 * tuplanapautus toimivat kuten lehden kartassa.
 *
 * ALKUPERÄISEEN KARTTAAN EI KOSKETA. Kehys on container-type: size
 * -kokokontti, jonka kuvasuhde asetetaan kuvan load-tapahtumassa
 * (v958); klooni saa oman leveytensä --kartta-suhde-muuttujasta eikä
 * paikallaan olevan kartan mitoista muutu mikään. Kuvasuhde MITATAAN
 * kehyksestä eikä lueta sen aspect-ratio-arvosta, koska sama kenttä
 * on kirjoitettu kahdessa muodossa (luku ja `leveys / korkeus`) —
 * mitattu laatikko kertoo saman luvun kummassakin tapauksessa.
 *
 * KAHDELLE KARTTATYYPILLE (21.8.2026). Sama avaaja palvelee myös
 * maalehden korkokarttaa (js/maalehti.js): se rakentaa kartastaan
 * kehyksen, jossa kaupunkipisteet ovat lavalla samaan tapaan kuin
 * kohdekartan numeroympyrät, ja antaa kuvasuhteen `asetukset.mitat`
 * -kentässä — sen oma kehys sisältää lähderivin, joten mitattu
 * laatikko valehtelisi. Kaikki muu on yhteistä: klooni, zoom,
 * panorointi, mitoitus ja sulku.
 */
export function avaaKarttaSuurennos(ui, kehys, kartta, asetukset = {}) {
  const mitat = asetukset.mitat ?? kehys.getBoundingClientRect();
  if (!(mitat.width > 0) || !(mitat.height > 0)) return;
  ui.suljeKulttuuriKuva();
  const kortti = html('div', 'postikortti kulttuuri-suurennos kartta-suurennos');
  const suhde = mitat.width / mitat.height;
  kortti.style.setProperty('--kartta-suhde', suhde.toFixed(4));
  const sulku = html('button', 'uutinen-sulku', '×');
  sulku.type = 'button';
  sulku.setAttribute('aria-label', 'Sulje suurennettu kartta');
  sulku.title = 'Sulje';
  kortti.appendChild(sulku);
  const iso = kehys.cloneNode(true);
  // Kehyksen oma näppäin- ja ruudunlukijarooli kuuluu paikallaan
  // olevalle kartalle; klooni on kuva kuvasta.
  iso.removeAttribute('tabindex');
  iso.removeAttribute('role');
  iso.removeAttribute('aria-label');
  iso.classList.remove('zoomattu', 'kartta-avattava');
  // Ohjekyltit koskevat paikallaan olevaa karttaa: kokoruudulla ei ole
  // enää kokoruutua avattavana eikä napautettavia kohteita.
  iso.querySelector('.kartta-opaste')?.remove();
  iso.querySelector('.kartta-suurennusvihje')?.remove();
  const lava = iso.querySelector('.kartta-lava');
  if (lava) {
    lava.classList.remove('silea');
    // Zoomattuna avattu kartta näytetään kokonaisena: muunnos pois ja
    // vastaskaalauksen kerroin takaisin ykköseen.
    lava.style.transform = '';
    lava.style.setProperty('--zoom', '1');
  }
  for (const valittu of iso.querySelectorAll('.kohde-piirros.valittu')) {
    valittu.classList.remove('valittu');
    // Valinta oli siirtänyt pisteen ikkunan keskelle (ks. avaa);
    // kokoruudulla se kuuluu omalle paikalleen kartalla.
    if (valittu.dataset.alkuLeft) valittu.style.left = valittu.dataset.alkuLeft;
    if (valittu.dataset.alkuTop) valittu.style.top = valittu.dataset.alkuTop;
  }
  for (const nappi of iso.querySelectorAll('button')) nappi.tabIndex = -1;
  /*
   * NUMEROLAPPU PIIRROSKOHTEILLE. Numeroympyrä kertoo itse, monesko
   * kohde on kyseessä, mutta leikattu piirros ei — lehdessä numeron
   * näkee vasta napauttamalla piirroksen nimikylttiin, eikä
   * kokoruudulla napauteta mitään. Ilman lappua alla oleva selitelista
   * jäisi piirroskaupungeissa (Tokio, Kioto, Peking...) irralliseksi
   * nimiluetteloksi. Numero tulee samasta lähteestä kuin listakin:
   * kohteen järjestysnumero datassa (dataset.numero).
   */
  for (const piirros of iso.querySelectorAll('.kohde-piirros')) {
    if (!piirros.dataset.numero) continue;
    const lappu = html('span', 'kohde-numerolappu', piirros.dataset.numero);
    lappu.setAttribute('aria-hidden', 'true');
    piirros.appendChild(lappu);
  }
  kortti.appendChild(iso);
  /*
   * NUMEROIDEN SELITE KARTAN ALLE. Kokoruudulla numeroympyrät jäisivät
   * muuten arvoituksiksi: selitelista on lehdessä kartan alapuolella,
   * eikä sitä näy suurennoksen takaa. Lista rakennetaan datasta eikä
   * kloonata lehdestä, koska tässä se on nimenomaan KARTAN SELITE eikä
   * linkkirivi — kokoruutu on katselutila, ja avattava rivi houkuttelisi
   * napautukseen, joka sulkisi suurennoksen. Numerointi on sama kuin
   * kartalla ja lehden listassa: kohteiden järjestys datassa.
   *
   * Kapealla ruudulla lista täyttää samalla sen pystytilan, joka jää
   * vaakakuvan alle — puhelimen pystyruudulla koko kartta ja koko
   * selite näkyvät nyt kerralla ilman vieritystä.
   */
  const kohteet = kartta.kohteet ?? [];
  if (kohteet.length) {
    const selite = html('div', 'kartta-selitteet kartta-suurennos-selitteet');
    kohteet.forEach((k, i) => {
      const rivi = html('span', 'kartta-selite');
      rivi.appendChild(html('span', 'kartta-selite-numero', String(i + 1)));
      rivi.appendChild(document.createTextNode(k.nimi));
      selite.appendChild(rivi);
    });
    kortti.appendChild(selite);
  }
  if (kartta.lahde) kortti.appendChild(html('p', 'kuvalahde', kartta.lahde));
  /*
   * ZOOMIPAINIKKEET KARTAN PÄÄLLE, eivät omalle riville. Kortin
   * mitoitus lasketaan kartan kuvasuhteesta (--kartta-suhde) ja
   * korkeuskatto on jaettu kartan, selitteen ja lähderivin kesken;
   * uusi rivi ottaisi siitä osansa. Kelluva pilleripari kortin
   * vasemmassa yläkulmassa jättää mitoituksen ennalleen ja antaa
   * samalla näppäimistölle ja hiirelle sen, minkä sormi saa
   * nipistyksestä. Painikkeet ovat kartan päällä sillä puolella, jossa
   * ei ole sulkurastia.
   */
  const tyokalut = html('div', 'kartta-tyokalut kartta-suurennos-tyokalut');
  const zoomiRyhma = html('div', 'kartta-zoomi');
  zoomiRyhma.setAttribute('role', 'group');
  zoomiRyhma.setAttribute('aria-label', 'Kartan suurennus');
  const isoZoomiNappi = (merkki, nimi) => {
    const nappi = html('button', 'kartta-vipu-nappi kartta-zoomi-nappi', merkki);
    nappi.type = 'button';
    nappi.setAttribute('aria-label', nimi);
    nappi.title = nimi;
    zoomiRyhma.appendChild(nappi);
    return nappi;
  };
  const isoNapit = {
    loitonna: isoZoomiNappi('−', 'Loitonna karttaa'),
    lahenna: isoZoomiNappi('+', 'Lähennä karttaa'),
  };
  tyokalut.appendChild(zoomiRyhma);
  // Ilman lavaa ei ole mitään zoomattavaa (vanha kartta ilman
  // kartta-lava-koteloa) — silloin ei myöskään näytetä säätimiä.
  if (lava) kortti.appendChild(tyokalut);
  sulku.addEventListener('click', (e) => {
    e.stopPropagation();
    ui.suljeKulttuuriKuva();
  });
  ui.suurennosIsanta().appendChild(kortti);
  ui.lehtitila.kulttuuriKuvaEl = kortti;
  ui.rekisteroiSuurennosNappaimet();
  /*
   * MITOITUS HETI LIITTÄMISEN JÄLKEEN ja uudelleen aina kun näkyvä
   * ala muuttuu — tabletin kääntö vaihtaa vaakaruudun pystyksi, ja
   * kartan pitää täyttää uusi ruutu yhtä lailla. Kuuntelijat siivoavat
   * itsensä ensimmäisellä kerralla, kun kortti ei ole enää sivulla:
   * suurennoksen sulkeminen poistaa elementin, eikä erillistä
   * purkukoukkua ole olemassa.
   */
  const mitoita = () => {
    if (!kortti.isConnected) {
      window.removeEventListener('resize', mitoita);
      window.removeEventListener('orientationchange', mitoita);
      window.visualViewport?.removeEventListener('resize', mitoita);
      return;
    }
    mitoitaKarttaSuurennos(kortti, suhde);
  };
  mitoitaKarttaSuurennos(kortti, suhde);
  window.addEventListener('resize', mitoita);
  window.addEventListener('orientationchange', mitoita);
  window.visualViewport?.addEventListener('resize', mitoita);
  /*
   * ZOOM KOKORUUDULLE (omistajan palaute 21.8.2026: "sitä pitäisi
   * pystyä zoomaamaan koko näytöllä"). Sama widget kuin lehden
   * kartassa, kytkettynä kloonin omaan kehykseen ja lavaan — ei uutta
   * zoomikoodia, joten pisteiden vastaskaalaus, reunuksen aukeaminen
   * ja panoroinnin rajat ovat kokoruudulla samat kuin lehdessä.
   *
   * KYTKENTÄ VASTA LIITTÄMISEN JÄLKEEN: widget mittaa lavan
   * offsetWidthin heti alustuksessa, ja irrallisen kloonin mitat
   * olisivat nollia. Ydinrajaus luetaan samasta kartta-oliosta kuin
   * lehden kartassa (ydinAla), joten laajennetun kartan reunus
   * panoroituu kokoruudullakin oikein.
   *
   * PAIKALLAAN OLEVAAN KARTTAAN EI KOSKETA: kytkentä osuu vain
   * klooniin, jonka sulkeminen poistaa kuuntelijoineen päivineen.
   */
  if (lava) kytkeKarttaZoom(ui, iso, lava, isoNapit, ydinAla(kartta));
  sfx.play('paper');
}

/**
 * Matkailijalle-osio kartan perään (omistajan tilaus 15.8.2026:
 * "kaupunkilehden etusivulla olisi hyvä kuvailla kaupunkia myös
 * turistin näkökulmasta, millainen ilmapiiri siellä on ja mikä
 * siellä on mielenkiintoista ... oma otsikko ... kartan jälkeen.
 * Siitä voisi avautua oma pidempi pop-up artikkeli matkailijalle").
 *
 * Kappale on kansikategorian omaa, tarkistettua sisältöä
 * (kulttuuri-kategoriat.js: matkailijalle-kenttä), ja nappi avaa
 * pidemmän artikkelin SAMASSA nähtävyysikkunassa kuin kartan
 * kohteet — sama kortti, samat eleet, ei uutta ikkunatyyppiä.
 * Kaupunki ilman matkailijalle-kenttää ei näytä osiota.
 */
export function piirraMatkailijalle(ui, kohde) {
  const tiedot = ui.lehtitila.tutkiKansi?.matkailijalle;
  if (!tiedot?.kappale) return;
  const lohko = html('div', 'matkailijalle');
  lohko.appendChild(html('h3', 'kaupunkikartta-otsikko', 'Matkailijalle'));
  /*
   * Valokuva otsikon alla oikeassa laidassa, teksti kiertää
   * vasemmalta (omistajan tilaus 15.8.2026). Sama latausputki ja
   * napautussuurennos kuin nostojen kuvilla; kaupunki ilman
   * kuva-kenttää taittuu ennalleen.
   */
  /*
   * Oppaaseen johtaa KOLME sisäänkäyntiä (omistajan taitto-ohje
   * 16.8.2026): kuvan yläkulman vino kyltti, itse kuva ja
   * leipätekstin lopun Lue lisää -linkki. Sama avaaja kaikille.
   */
  const avaaOpas = tiedot.artikkeli?.teksti
    ? () => avaaNahtavyys(ui, tiedot.artikkeli, null, {
      henkilolinkit: [], valikko: false,
    })
    : null;
  // Yksi diagonaalinen kulmanauha, teksti pelkkä "Matkaopas"
  // (omistajan tarkennus 16.8.2026: "kaikki muut rimpsut pois").
  const luoNauha = () => {
    const kotelo = html('span', 'opas-nauha-kotelo');
    const nappi = html('button', 'opas-nauha', 'Matkaopas');
    nappi.type = 'button';
    nappi.addEventListener('click', avaaOpas);
    kotelo.appendChild(nappi);
    return kotelo;
  };
  if (tiedot.kuva?.tiedosto) {
    const kotelo = html('figure', 'matkailijalle-kuva');
    const kuva = document.createElement('img');
    ui.varustaNostonKuva(kuva, tiedot.kuva, 640);
    if (avaaOpas) {
      // Kuva on oppaan sisäänkäynti, ei suurennos: kaappausvaihe
      // ohittaa varustaNostonKuvan suurennoskuuntelijan.
      kuva.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        avaaOpas();
      }, true);
    }
    kotelo.appendChild(kuva);
    if (tiedot.kuva.selite) {
      const teksti = html('figcaption', 'kuvateksti', tiedot.kuva.selite);
      if (tiedot.kuva.lahde) {
        teksti.appendChild(html('span', 'lehti-kuvalahde', ` ${tiedot.kuva.lahde}`));
      }
      kotelo.appendChild(teksti);
    }
    lohko.appendChild(kotelo);
  }
  // Nauha koko osion oikeaan yläkulmaan (omistajan tarkennus
  // 16.8.2026: nauha kulkee kuvan reunan yli, vaalean pohjan
  // yläreunasta oikeaan sivureunaan) — kiinnitys osioon, ei kuvaan.
  if (avaaOpas) lohko.appendChild(luoNauha());
  let viimeinenKappale = null;
  for (const kappale of tiedot.kappale.split('\n\n').filter(Boolean)) {
    viimeinenKappale = html('p', 'kaupunkikartta-esittely', kappale);
    lohko.appendChild(viimeinenKappale);
  }
  if (avaaOpas && viimeinenKappale) {
    const lue = html('button', 'opas-lue-lisaa', 'Lue lisää matkailijan oppaasta →');
    lue.type = 'button';
    lue.addEventListener('click', avaaOpas);
    viimeinenKappale.appendChild(document.createTextNode(' '));
    viimeinenKappale.appendChild(lue);
  }
  kohde.appendChild(lohko);
}

/**
 * PIIRROSTEN HAJAUTUS (omistajan tilaus 15.8.2026: "Piirrokset
 * ovat liian lähellä toisiaan" — ja saman päivän jatko "Tee
 * sittenkin pienemmiksi ja ota nuolet pois": sijaintinuolet
 * ehtivät elää vain v715–v717).
 *
 * Liian lähekkäiset piirrokset työnnetään toisistaan erilleen
 * yksinkertaisella rentoutuksella. Lasketaan pikseleinä vasta
 * asettelun jälkeen (rAF), koska piirroksen koko on kiinteä 48 px
 * mutta lavan leveys vaihtelee puhelimesta työpöytään. Tulos
 * kirjoitetaan takaisin prosentteina, joten se skaalautuu ikkunan
 * ja zoomin mukana sellaisenaan.
 */
export function hajautaPiirrospisteet(kotelo, pisteet, ydin) {
  if (pisteet.length < 2) return;
  const asettele = () => {
    const mitat = kotelo.getBoundingClientRect();
    // Etukäteispuskurin lehti renderöityy piilossa (leveys 0) —
    // palautetaan epätosi ja jäädään odottamaan kokovahtia.
    if (mitat.width < 40) return false;
    const W = mitat.width;
    const K = mitat.height;
    // 46 px ≈ 40 px:n laatikko + ilmarako (koko on elänyt
    // omistajan palautteiden mukana: 64 → 48 → 40 px; väli
    // vastaavasti 72 → 54 → 46). Pieni väli tarkoittaa pieniä
    // siirtymiä, mikä sopii nuolettomaan karttaan.
    const MIN = 46;
    const paikat = pisteet.map((m) => ({ ...m, X: (m.x / 100) * W, Y: (m.y / 100) * K }));
    // Piirrokset pysyvät lepotilassa näkyvällä ydinalueella.
    const M = 24;
    const x0 = (ydin.x / 100) * W + M;
    const x1 = ((ydin.x + ydin.leveys) / 100) * W - M;
    const y0 = (ydin.y / 100) * K + M;
    const y1 = ((ydin.y + ydin.korkeus) / 100) * K - M;
    /*
     * Reunarajaus tehdään JOKA KIERROKSELLA eikä vasta lopuksi:
     * muuten reunan viereinen rykelmä työntyy ensin rajan yli ja
     * painuu rajauksessa takaisin kasaan (Pariisin oikea laita,
     * havaittu 15.8.2026). Kierroksen sisällä rajattu piste saa
     * seuraavalla kierroksella uuden työnnön reunaa PITKIN.
     */
    for (let kierros = 0; kierros < 60; kierros++) {
      let liikkui = false;
      for (let a = 0; a < paikat.length; a++) {
        for (let b = a + 1; b < paikat.length; b++) {
          const A = paikat[a];
          const B = paikat[b];
          let dx = B.X - A.X;
          let dy = B.Y - A.Y;
          let d = Math.hypot(dx, dy);
          if (d >= MIN) continue;
          // Täsmälleen päällekkäiset erotetaan vaakasuuntaan.
          if (d < 0.001) { dx = 1; dy = 0; d = 1; }
          const siirto = (MIN - d) / 2;
          A.X -= (dx / d) * siirto;
          A.Y -= (dy / d) * siirto;
          B.X += (dx / d) * siirto;
          B.Y += (dy / d) * siirto;
          liikkui = true;
        }
      }
      for (const m of paikat) {
        m.X = Math.min(Math.max(m.X, x0), x1);
        m.Y = Math.min(Math.max(m.Y, y0), y1);
      }
      if (!liikkui) break;
    }
    for (const m of paikat) {
      m.X = Math.min(Math.max(m.X, x0), x1);
      m.Y = Math.min(Math.max(m.Y, y0), y1);
      m.piste.style.left = `${((m.X / W) * 100).toFixed(2)}%`;
      m.piste.style.top = `${((m.Y / K) * 100).toFixed(2)}%`;
      // Vihje ja kyltti valitsevat puolensa siirtyneen paikan mukaan.
      const osuus = (((m.Y / K) * 100 - ydin.y) / ydin.korkeus) * 100;
      m.piste.classList.toggle('vihje-alle', osuus < 14);
      m.piste.classList.toggle('kyltti-ylle', osuus > 84);
    }
    return true;
  };
  requestAnimationFrame(() => {
    if (asettele()) return;
    const vahti = new ResizeObserver(() => {
      if (asettele()) vahti.disconnect();
    });
    vahti.observe(kotelo);
  });
}



/**
 * Kaupunkikartan kohteen oma juttu (omistajan toive 7.8.2026:
 * *"kirjoita itse nähtävyyksien tekstit ... kuvia voisi näyttää
 * niiden nostossa gallerian sijaan tekstin joukossa 3-5"*).
 *
 * Taitto on lehtijutun taitto eikä galleriaselain: kappaleet ovat
 * lyhyitä, ja kuvat ovat yhdessä kehyksessä avauskappaleen jälkeen
 * — useampi kuva karusellina (omistajan palaute 10.8.2026:
 * peräkkäin ladottuina lisäkuvat venyttivät sivun liian pitkäksi).
 *
 * Vuosiluku on oma rivinsä otsikon yllä (omistajan toive: "käytä
 * vuosiluku korostuksia"), ja lainaus nostetaan kappaleiden väliin
 * omaksi lohkokseen silloin kun se on mielekäs — ei väkisin.
 */
export function avaaNahtavyys(ui, kohde, numero, {
  henkilolinkit = null, muista = false, palaa = false, rulla = 0, valikko = true,
} = {}) {
  const dialogi = document.getElementById('nahtavyys-dialog');
  if (!dialogi) return;
  /*
   * PALUUPOLKU (omistajan tilaus 15.8.2026: "engelin artikkelista
   * ei pääse takaisin edelliseen artikkeliin ... nuoli taaksepäin").
   * Henkilölinkki vaihtaa saman dialogin sisällön (muista: true),
   * jolloin edellinen juttu vieritysasentoineen menee pinoon ja
   * yläreunaan ilmestyy paluunuoli. Nuoli-, valikko- ja tuore avaus
   * tyhjentävät pinon — paluu koskee vain linkkipolkua, jolla ei
   * ole muuta reittiä takaisin.
   */
  ui.lehtitila.nahtavyysPino ??= [];
  const kortti = dialogi.querySelector('.nahtavyys-kortti');
  if (!palaa) {
    if (muista && dialogi.open && ui.lehtitila.nahtavyysAuki) {
      ui.lehtitila.nahtavyysPino.push({ ...ui.lehtitila.nahtavyysAuki, rulla: kortti?.scrollTop ?? 0 });
    } else ui.lehtitila.nahtavyysPino = [];
  }
  ui.lehtitila.nahtavyysAuki = { kohde, numero, henkilolinkit, valikko };
  const takaisin = document.getElementById('nahtavyys-takaisin');
  if (takaisin) {
    if (!takaisin.dataset.kytketty) {
      takaisin.dataset.kytketty = '1';
      takaisin.addEventListener('click', () => {
        const edellinen = ui.lehtitila.nahtavyysPino.pop();
        if (!edellinen) return;
        avaaNahtavyys(ui, edellinen.kohde, edellinen.numero, {
          henkilolinkit: edellinen.henkilolinkit, palaa: true,
          rulla: edellinen.rulla, valikko: edellinen.valikko ?? true,
        });
      });
    }
    takaisin.hidden = !ui.lehtitila.nahtavyysPino.length;
  }
  /*
   * Nähtävyystekstissä mainittu henkilö linkitetään omaan juttuunsa
   * (omistajan tilaus 10.8.2026, pilotti: Engel Helsingissä).
   * Linkit tulevat kaupungin mukaan (arrivalShownFor on kaupunki,
   * jonka kartalta juttu avattiin); henkilöjuttu itse avataan
   * tyhjällä listalla, ettei nimi linkitä itseensä.
   */
  const linkit = henkilolinkit ?? (HENKILOLINKIT[ui.lehtitila.arrivalShownFor] ?? []);
  /*
   * Sulku taustaa napauttamalla (omistajan toive 8.8.2026). Kortti
   * täyttää dialogin tarkalleen, joten dialogiin itseensä osuva
   * napautus voi tulla vain reunojen ulkopuolelta eli taustalta.
   * Jos kuvasuurennos on auki, suljetaan ensin vain se.
   */
  if (!dialogi.dataset.taustaSulkee) {
    dialogi.dataset.taustaSulkee = '1';
    dialogi.addEventListener('click', (e) => {
      if (e.target !== dialogi) return;
      if (ui.lehtitila.kulttuuriKuvaEl) { ui.suljeKulttuuriKuva(); return; }
      dialogi.close();
    });
  }
  document.getElementById('nahtavyys-otsikko').textContent = kohde.nimi;
  taytaNahtavyysValikko(ui, kohde, valikko);
  varustaNahtavyysSelaus(ui, kohde);
  const aika = document.getElementById('nahtavyys-aika');
  aika.textContent = [numero ? `Kohde ${numero}` : null, kohde.aika]
    .filter(Boolean).join(' · ');
  aika.hidden = !aika.textContent;

  const sisalto = document.getElementById('nahtavyys-sisalto');
  sisalto.textContent = '';
  /*
   * OPASTAITTO (omistajan linjaus 16.8.2026, Raamattu/Kaupungit:
   * "Matkailijan opas on pelin kevyt ja viihteellinen osa, joka
   * houkuttelee matkustamaan" — aihejaksot isoine kuvineen,
   * tekstinosto sekä sää-, hinta- ja suunnittelulaatikot).
   *
   * Oma haara eikä lisäys entiseen: opas ei ole kappalevirta kuvineen
   * vaan jaksoista koottu sivu, jossa laatikot ja nosto tulevat
   * jaksojen VÄLIIN määrätyssä järjestyksessä. Ripoteltu-taitto
   * (kaikki muut kaupungit, kunnes opas monistetaan) kulkee
   * entisellään alla — kappaleet ja kuvat tyhjennetään vain siltä
   * varalta, ettei kumpikaan haara maalaa samaa ainesta kahdesti.
   */
  const opas = kohde.taitto === 'opas' && Boolean(kohde.jaksot?.length);
  kortti?.classList.toggle('opas-kortti', opas);
  dialogi.classList.toggle('opas-arkki', opas);
  if (opas) ui.taitaOpas(sisalto, kohde, linkit);
  const kappaleet = opas ? [] : String(kohde.teksti ?? '').split('\n\n').filter(Boolean);
  const kuvat = opas ? [] : (kohde.kuvat ?? []).slice(0, 5);
  /*
   * Useampi kuva näytetään KARUSELLINA yhden kehyksen sisällä
   * (omistajan palaute 10.8.2026: peräkkäin ladottuina lisäkuvat
   * venyttivät sivun liian pitkäksi). Kehys tulee heti
   * avauskappaleen jälkeen — juttu ei ala eikä lopu kuvaan.
   */
  /*
   * TAITETUT KUVAT (omistajan tilaus 16.8.2026 opasartikkeliin:
   * "Kuvia pitää lisätä näkymään taitettuna sivulle eri kohtiin").
   * Kun jutulle on merkitty taitto: 'ripoteltu', karusellia ei
   * tehdä: ensimmäinen kuva tulee entiseen tapaan avauskappaleen
   * jälkeen ja loput kelluvat pikkukuvina tekstin lomassa
   * vuorotellen oikeassa ja vasemmassa laidassa, tasavälein pitkin
   * juttua. Kelluvina ne eivät venytä sivua — karusellin alkusyy
   * (palaute 10.8.2026) ei koske tätä taittoa.
   */
  const ripoteltu = kohde.taitto === 'ripoteltu' && kuvat.length > 1;
  const kuvaKehys = kuvat.length > 1 && !ripoteltu
    ? nahtavyydenKaruselli(ui, kuvat)
    : (kuvat.length ? nahtavyydenKuva(ui, kuvat[0]) : null);
  // Kappaleindeksi → sen edelle taitettava kelluva kuva.
  const taittokuvat = new Map();
  if (ripoteltu) {
    kuvat.slice(1).forEach((kuva, j, lisat) => {
      const kehys = nahtavyydenKuva(ui, kuva);
      kehys.classList.add('nahtavyys-taittokuva', j % 2 ? 'vasen' : 'oikea');
      // Tasajako kappaleiden kesken; ei ennen avauskappaletta eikä
      // kahta samaan väliin.
      let paikka = Math.max(1, Math.round(((j + 1) * kappaleet.length) / (lisat.length + 1)));
      while (taittokuvat.has(paikka)) paikka += 1;
      taittokuvat.set(paikka, kehys);
    });
  }
  // Lainaus keskelle, kappaleiden puoliväliin.
  const lainauksenPaikka = kohde.lainaus ? Math.ceil(kappaleet.length / 2) : -1;

  /*
   * PIIRROS JUTUN AVAUKSEEN (omistajan tilaus 15.8.2026: "lisätä
   * piirretty kuva pop up ikkunan ensimmäisen kappaleen oikealle
   * puolelle niin että teksti kulkee sen vasempaa puolta").
   * Sama leikattu miniatyyri kuin kartalla, float oikealle
   * ensimmäisen kappaleen sisään; läpinäkyvä ja ilman marginaaleja
   * (omistajan tarkennus: läpinäkyvä alue on jo leveä). Henkilö-
   * jutut ja muut ei-karttakohteet eivät löydä piirrosta nimellään,
   * jolloin kappale taittuu ennalleen.
   */
  const piirros = MINIATYYRIT[ui.lehtitila.arrivalShownFor]?.[kohde.nimi] ?? null;

  kappaleet.forEach((kappale, i) => {
    const kpl = nahtavyysKappale(ui, kappale, linkit);
    if (i === 0 && piirros) {
      const kuva = document.createElement('img');
      kuva.className = 'nahtavyys-piirros';
      kuva.src = piirros;
      kuva.alt = '';
      kuva.decoding = 'async';
      kuva.draggable = false;
      kpl.insertBefore(kuva, kpl.firstChild);
    }
    // Kelluva kuva ennen kappaletta, jotta teksti kiertää sen.
    if (taittokuvat.has(i)) sisalto.appendChild(taittokuvat.get(i));
    sisalto.appendChild(kpl);
    if (i + 1 === lainauksenPaikka) {
      const lohko = html('blockquote', 'nahtavyys-lainaus');
      lohko.appendChild(html('p', 'nahtavyys-lainaus-teksti', kohde.lainaus.teksti));
      if (kohde.lainaus.lahde) {
        lohko.appendChild(html('p', 'nahtavyys-lainaus-lahde', kohde.lainaus.lahde));
      }
      sisalto.appendChild(lohko);
    }
    if (i === 0 && kuvaKehys) sisalto.appendChild(kuvaKehys);
  });
  // Kappaleeton juttu (ei pitäisi olla, mutta data voi yllättää):
  // kuva ei saa kadota.
  if (!kappaleet.length && kuvaKehys) sisalto.appendChild(kuvaKehys);
  // Väliin mahtumattomat taittokuvat (enemmän kuvia kuin
  // kappaleväliä) päätyvät loppuun eivätkä katoa.
  for (const [paikka, kehys] of taittokuvat) {
    if (paikka >= kappaleet.length) sisalto.appendChild(kehys);
  }

  // Jutun ensimmäinen kuva saa oman luokkansa: vaakana se levenee
  // koko palstalle, pystynä se pysyy pienenä (omistajan ohje).
  // Oppaassa EI: siellä jokainen jaksokuva on koko palstan levyinen,
  // ja ensikuvan pystysääntö kutistaisi ensimmäisen jaksokuvan.
  if (!opas) sisalto.querySelector('.nahtavyys-kuvakehys')?.classList.add('nahtavyys-ensikuva');

  if (kohde.wiki) {
    const nappi = html('button', 'wiki-btn', 'Lue lisää aiheesta');
    nappi.type = 'button';
    nappi.addEventListener('click', () => ui.openWikiArticle(kohde.wiki, kohde.nimi));
    sisalto.appendChild(nappi);
  } else if (kohde.lahde) {
    // Oma kooste ilman tarkistettua fi.wikipedian artikkelia: pelkkä
    // lähdemaininta, ei linkkiä (omistajan spesifikaatio 8.8.2026;
    // sanamuoto kertoo tekstin omaksi, ks. lahdemerkinta).
    sisalto.appendChild(html('p', 'nahtavyys-lahderivi', lahdemerkinta(kohde.lahde)));
  }
  mitoitaNahtavyysDialogi(ui);
  if (!dialogi.open) dialogi.showModal();
  ui.nollaaDialoginVieritys(dialogi);
  // Paluu palauttaa lukukohdan: juttu jatkuu siitä mihin se jäi,
  // ei alusta. rAF, koska korkeus on olemassa vasta taiton jälkeen.
  if (palaa && rulla && kortti) requestAnimationFrame(() => { kortti.scrollTop = rulla; });
  /*
   * YLÄREUNAN VAHTI (omistajan havainto 15.8.2026 kahdesti:
   * "otsikko jää puoliksi piiloon" — v759:n kaksi ajastettua
   * nollausta eivät riittäneet iPadilla, koska liukuma voi tulla
   * vasta niiden jälkeen, esim. hitaasti peilistä latautuvan kuvan
   * tai Safarin fokusvierityksen myötä). Juttu avataan AINA
   * alusta, joten avausikkunan ajan mikä tahansa ohjelmallinen
   * liukuma nollataan heti — kunnes käyttäjä itse tarttuu korttiin
   * (kosketus, rulla tai näppäin).
   *
   * HUOM 16.8.2026: omistajan kolmesti näkemän "otsikko puoliksi
   * piilossa" -vian JUURISYY ei ollut vieritys laisinkaan, vaan
   * lehden tarttuva paperikaista, joka maalautui otsikon päälle
   * (korjattu CSS:ssä, ks. .nahtavyys-kortti::before). Vahti jää
   * silti varmistukseksi oikeita liukumia vastaan, ja sen ikä EI
   * ole enää kiinteä: ruuhkainen Commons/peili voi tuoda jutun
   * kuvan vasta monen sekunnin päästä, ja liukuma tulisi vasta
   * silloin — vahti elää, kunnes JOKAINEN kortin kuva on
   * latautunut ja hetki siitä yli (vähintään 2,5 s, enintään 15 s).
   */
  // Edellisen avauksen vahti sammuu aina — myös paluupolulla,
  // ettei se nollaa juuri palautettua lukukohtaa.
  clearInterval(ui.lehtitila.nahtavyysYlaVahti);
  if (!palaa && kortti) {
    let kayttajaOtti = false;
    const irrota = () => { kayttajaOtti = true; };
    for (const laji of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
      kortti.addEventListener(laji, irrota, { once: true, passive: true });
    }
    const alku = performance.now();
    let rauhassa = null; // hetki, jolloin joka kuva oli valmis
    ui.lehtitila.nahtavyysYlaVahti = setInterval(() => {
      const nyt = performance.now();
      const kesken = [...kortti.querySelectorAll('img')].some((k) => !k.complete);
      if (kesken) rauhassa = null;
      else rauhassa ??= nyt;
      const valmis = nyt - alku > 2500 && rauhassa !== null && nyt - rauhassa > 700;
      if (kayttajaOtti || valmis || nyt - alku > 15000) {
        clearInterval(ui.lehtitila.nahtavyysYlaVahti);
        return;
      }
      if (kortti.scrollTop !== 0) kortti.scrollTop = 0;
    }, 100);
  }
  // Uusi juttu, uusi teksti: edellisen kohteen luenta ei saa jatkua.
  pysaytaLukija();
  const kaiutin = ui.varustaLukija(dialogi, () => dialogi.querySelector('.nahtavyys-kortti'));
  /*
   * KAIUTIN OTSIKON PERÄÄN (omistajan tilaus 16.8.2026:
   * "kaiuttimen voisi siirtää otsikon perään"). Oletuksena nappi on
   * dialogin lapsi ja asemoitu oikeaan yläkulmaan, jossa se osui
   * hampurilaisvalikon alle omaksi irralliseksi merkikseen. Otsikon
   * sisällä se on osa nimeä: "Belvedere 🔊".
   *
   * Sama siirto tehdään jo lehdessä (sijoitaLehtiKaiutin), ja
   * liitaLukija etsii napin koko puusta juuri siksi — siirretty
   * nappi löytyy eikä kaksosta synny.
   */
  const otsikko = document.getElementById('nahtavyys-otsikko');
  if (kaiutin && otsikko && kaiutin.parentElement !== otsikko) {
    otsikko.appendChild(kaiutin);
  }
}

/**
 * Kappale, jossa vuosiluvut on korostettu (omistajan toive: "käytä
 * vuosiluku korostuksia").
 *
 * Korostus tehdään KOODISSA eikä aineistossa: jos vuosiluvut
 * kirjoitettaisiin dataan HTML-tageina, jokainen tekstikenttä pitäisi
 * renderöidä innerHTML:llä — ja silloin yksikin lainausmerkki tai
 * ampersandi aineistossa voisi rikkoa taiton tai pahempaa. Tässä
 * teksti pilkotaan säännöllisellä lausekkeella ja osat lisätään
 * tekstisolmuina; mikään aineistossa oleva merkki ei voi muuttua
 * merkkaukseksi.
 *
 * Tunnistetaan neljä muotoa: 1666, 1940-luku, 1863–1866 ja 2500 eaa.
 *
 * NELINUMEROINEN riittää yksinään, KOLMINUMEROINEN vaatii
 * ajanmääreen (879 jaa., 300-luku). Ilman tätä eroa mitat
 * korostuisivat vuosiluvuiksi: "korkeus 146 metriä" näytti
 * ensimmäisessä versiossa vuodelta. Kaksinumeroisia ei korosteta
 * lainkaan — ne ovat lähes aina lukumääriä.
 */
export function nahtavyysKappale(ui, teksti, henkilot = []) {
  const p = html('p', 'nahtavyys-kappale');
  /*
   * Henkilölinkit ensin: kappale jaetaan nimiosumien kohdalta, nimet
   * muuttuvat napeiksi jotka avaavat henkilön oman jutun
   * (js/packs/henkilot.js), ja muut osat saavat vuosikorostuksen
   * entiseen tapaan. Nappi eikä <a>, koska kohde ei ole osoite vaan
   * saman dialogin sisältö — ja tekstisolmupohjainen jako pitää
   * saman turvatakuun kuin vuosikorostus: aineiston merkit eivät
   * voi muuttua merkkaukseksi.
   */
  let loppu = teksti;
  for (;;) {
    let eka = null;
    for (const h of henkilot) {
      const osuma = loppu.match(h.kuvio);
      if (osuma && (!eka || osuma.index < eka.osuma.index)) eka = { h, osuma };
    }
    if (!eka) break;
    vuosikorosta(p, loppu.slice(0, eka.osuma.index));
    const nappi = html('button', 'henkilo-linkki', eka.osuma[0]);
    nappi.type = 'button';
    const henkilo = HENKILOT[eka.h.id];
    nappi.addEventListener('click', () => avaaNahtavyys(ui, henkilo, null, {
      henkilolinkit: [], muista: true,
    }));
    p.appendChild(nappi);
    loppu = loppu.slice(eka.osuma.index + eka.osuma[0].length);
  }
  vuosikorosta(p, loppu);
  return p;
}

/** Lisää tekstin kappaleeseen vuosiluvut korostettuina (ks. yllä). */
export function vuosikorosta(p, teksti) {
  if (!teksti) return;
  const jakso = '(?:\\s?[–-]\\s?\\d{2,4})?';
  const kuvio = new RegExp(
    `\\b\\d{4}${jakso}(?:-luvu\\w*)?(?:\\s(?:eaa\\.|jaa\\.))?`
    + `|\\b\\d{3}${jakso}(?:-luvu\\w*(?:\\s(?:eaa\\.|jaa\\.))?|\\s(?:eaa\\.|jaa\\.))`,
    'g',
  );
  let kohta = 0;
  for (const osuma of teksti.matchAll(kuvio)) {
    /*
     * Tuhaterotin ei ole vuosiluku: "1 700 siltaa" ei saa korostua
     * muotoon "1 [700] siltaa". Tarkistus tehdään käsin eikä
     * lookbehindillä, koska Safari sai lookbehind-tuen vasta
     * versiossa 16.4 ja peliä luetaan vanhemmillakin iPadeilla.
     */
    const edellinen = teksti[osuma.index - 1];
    const sitaEdellinen = teksti[osuma.index - 2];
    if ((edellinen === ' ' || edellinen === '\u00a0') && /\d/.test(sitaEdellinen ?? '')) continue;
    if (osuma.index > kohta) p.appendChild(document.createTextNode(teksti.slice(kohta, osuma.index)));
    p.appendChild(html('b', '', osuma[0]));
    kohta = osuma.index + osuma[0].length;
  }
  if (kohta < teksti.length) p.appendChild(document.createTextNode(teksti.slice(kohta)));
}

/**
 * Edellinen/seuraava nähtävyys ilman popupin sulkemista (omistajan
 * toive 10.8.2026: *"nähtävyyksiä olisi kiva voida liikkua
 * edestakaisin nuolinäppäimillä"*, kaappaus Sponza-palatsista).
 *
 * Kolme reittiä samaan siirtoon, koska omistaja pelaa iPhonella ja
 * iPadilla: vaakapyyhkäisy kortin päällä, nuolinapit popupin
 * reunoilla ja näppäimistön nuolet. Laskuri kertoo kohdan kuten
 * lehden kuvakaruselleissa, ja reunoilta kierretään ympäri samalla
 * modulo-säännöllä kuin `arrivalKuvat`- ja karuselliselauksessa.
 *
 * Selattava lista on kaupungin OMAT jutut, joissa on kuva. Pelkkä
 * wiki-kohde jää pois, koska se avaa eri ikkunan — nuoli veisi
 * silloin ulos popupista, ei sen sisällä eteenpäin. Henkilöjutussa
 * (esim. Engel) selaus piilotetaan kokonaan: henkilö ei ole kartan
 * kohde eikä siis kuulu mihinkään kohtaan listaa. Hampurilaisvalikko
 * jää ainoaksi tieksi wiki-kohteisiin, kuten ennenkin.
 */
export function varustaNahtavyysSelaus(ui, kohde) {
  const dialogi = document.getElementById('nahtavyys-dialog');
  const edellinen = document.getElementById('nahtavyys-edellinen');
  const seuraava = document.getElementById('nahtavyys-seuraava');
  if (!dialogi || !edellinen || !seuraava) return;

  const lista = nahtavyysKohteet(ui)
    .filter(({ k }) => k.teksti && (k.kuvat?.length ?? 0) > 0);
  const kohdalla = lista.findIndex(({ k }) => k.nimi === kohde.nimi);
  /*
   * Alle kaksi selattavaa (tai kohde listan ulkopuolelta): ei nuolia
   * — popup näyttää täsmälleen samalta kuin ennen.
   *
   * Kohdelaskuri ("5/6") poistettiin omistajan päätöksellä
   * 16.8.2026: sama tieto on jo aikarivillä ("KOHDE 5 · 1712–1723"),
   * eikä yläkulmassa tarvita kolmatta merkkiä hampurilaisen ja
   * kaiuttimen rinnalle.
   */
  const selattava = kohdalla >= 0 && lista.length > 1;
  ui.lehtitila.nahtavyysSelaus = selattava ? { lista, kohdalla } : null;
  for (const el of [edellinen, seuraava]) el.hidden = !selattava;
  if (!selattava) return;

  if (!dialogi.dataset.selausKytketty) {
    dialogi.dataset.selausKytketty = '1';
    const siirry = (suunta) => {
      const tila = ui.lehtitila.nahtavyysSelaus;
      if (!tila) return false;
      const i = (tila.kohdalla + suunta + tila.lista.length) % tila.lista.length;
      const { k, numero } = tila.lista[i];
      sfx.play('paper');
      avaaNahtavyys(ui, k, numero);
      return true;
    };
    edellinen.addEventListener('click', (e) => { e.stopPropagation(); siirry(-1); });
    seuraava.addEventListener('click', (e) => { e.stopPropagation(); siirry(1); });
    /*
     * Näppäimet kuunnellaan dialogilla eikä documentilla, jotta
     * kuvasuurennoksen oma kaappausvaiheen kuuntelija ehtii ensin:
     * kun suurennos on auki, nuolet selaavat sen kuvia eivätkä
     * vaihda nähtävyyttä alta pois.
     */
    dialogi.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (!siirry(e.key === 'ArrowRight' ? 1 : -1)) return;
      e.preventDefault();
      e.stopPropagation();
    });
    /*
     * Pyyhkäisy vain kortin tyhjällä alueella. Kuvakehys ja karuselli
     * käyttävät vaakavedon jo omaan kuvaselaukseensa, ja valikko on
     * oma pintansa — niiltä alkava veto ei saa vaihtaa nähtävyyttä.
     * Kynnys ja suhde ovat samat kuin karusellissa, jotta ele tuntuu
     * samalta koko pelissä.
     */
    const kortti = dialogi.querySelector('.nahtavyys-kortti');
    let veto = null;
    kortti?.addEventListener('pointerdown', (e) => {
      veto = e.target.closest('.nahtavyys-kuvakehys, .nahtavyys-valikko, .nahtavyys-valikko-nappi')
        ? null : { x: e.clientX, y: e.clientY };
    });
    kortti?.addEventListener('pointercancel', () => { veto = null; });
    kortti?.addEventListener('pointerup', (e) => {
      const alku = veto;
      veto = null;
      if (!alku || ui.lehtitila.kulttuuriKuvaEl) return;
      const dx = e.clientX - alku.x;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - alku.y)) {
        siirry(dx < 0 ? 1 : -1);
      }
    });
  }
}

/**
 * Avoimen kaupungin nähtävyydet kartan järjestyksessä, numeroituina.
 *
 * Yhteinen lähde hampurilaisvalikolle ja nuoliselaukselle, jotta
 * niiden järjestys ja numerointi eivät voi erkaantua. Sääntö on sama
 * kuin kartan pisteillä: oma juttu voittaa wikin. Suodatus jätetään
 * kutsujalle — valikkoon kelpaa myös pelkkä wiki-kohde, selaukseen ei.
 */
export function nahtavyysKohteet(ui) {
  const kaupunki = ui.lehtitila.arrivalShownFor;
  return (KAUPUNKIKARTAT[kaupunki]?.kohteet ?? []).map((raaka, i) => {
    const juttu = NAHTAVYYSJUTUT[kaupunki]?.[raaka.nimi];
    const k = juttu ? { ...raaka, wiki: undefined, ...juttu } : raaka;
    return { k, numero: String(i + 1) };
  });
}

/**
 * Hampurilaisvalikko nähtävyyspopupiin (omistajan toive 10.8.2026):
 * saman kaupungin muihin nähtävyyksiin pääsee suoraan, ilman että
 * popup pitää sulkea ja kohde etsiä kartalta uudestaan. Lista tulee
 * kaupunkikartan kohteista samalla säännöllä kuin kartan pisteet:
 * oma juttu voittaa wikin, ja ilman kumpaakaan kohde jää pois.
 * Valikko toimii myös henkilöjutussa (esim. Engel) — se vie
 * takaisin kaupungin nähtävyyksiin.
 */
export function taytaNahtavyysValikko(ui, nykyinen, salli = true) {
  const nappi = document.getElementById('nahtavyys-valikko-nappi');
  const valikko = document.getElementById('nahtavyys-valikko');
  if (!nappi || !valikko) return;
  // Matkailijan opas ei ole kartan kohde: valikkonappi jäi
  // kellumaan otsikon päälle irrallisena (omistajan palaute
  // 15.8.2026 "häiriö ylhäällä") — opas avataan ilman valikkoa.
  if (!salli) {
    nappi.hidden = true;
    valikko.hidden = true;
    nappi.setAttribute('aria-expanded', 'false');
    return;
  }
  const sulje = () => {
    valikko.hidden = true;
    nappi.setAttribute('aria-expanded', 'false');
  };
  if (!nappi.dataset.kytketty) {
    nappi.dataset.kytketty = '1';
    nappi.addEventListener('click', () => {
      valikko.hidden = !valikko.hidden;
      nappi.setAttribute('aria-expanded', String(!valikko.hidden));
    });
    // Valikko sulkeutuu, kun napautus osuu sen ulkopuolelle.
    document.getElementById('nahtavyys-dialog').addEventListener('click', (e) => {
      if (!valikko.hidden && !valikko.contains(e.target) && e.target !== nappi) sulje();
    });
  }
  sulje();
  valikko.replaceChildren();
  const kohteet = nahtavyysKohteet(ui).filter(({ k }) => k.teksti || k.wiki);
  nappi.hidden = kohteet.length < 2;
  if (nappi.hidden) return;
  for (const { k, numero } of kohteet) {
    const rivi = html('button', 'nahtavyys-valikko-rivi');
    rivi.type = 'button';
    rivi.appendChild(html('span', 'kartta-selite-numero', numero));
    rivi.appendChild(document.createTextNode(k.nimi));
    if (k.nimi === nykyinen.nimi) rivi.classList.add('nykyinen');
    rivi.addEventListener('click', () => {
      sulje();
      if (k.teksti) avaaNahtavyys(ui, k, numero);
      else ui.openWikiArticle(k.wiki, k.nimi);
    });
    valikko.appendChild(rivi);
  }
}

/**
 * Nähtävyysdialogin leveys PIKSELEINÄ mitatusta näkymästä, ei
 * media querystä (omistajan havainto 15.8.2026 iPadilla: "jos käy
 * toisessa ohjelmassa välillä niin sivun leveys palaa iphone
 * muotoon"). WKWebView voi taustalta palatessa pitää asettelu-
 * viewportin vanhassa kapeassa mitassa, jolloin CSS:n
 * min-width-ehto ei laukea ja kortti kapenee — sama vika, jonka
 * lehti sai 13.8. (varmistaLehtiMitta). mittaaNakyma tunnistaa
 * jämähtäneen mitan visualViewportin ristiintarkistuksella, ja
 * pikselileveys ohittaa vanhentuneen media queryn kokonaan.
 * Kapealla ruudulla inline-leveys tyhjennetään ja CSS:n
 * min(90vw, 640px) hoitaa asian ennallaan.
 */
export function mitoitaNahtavyysDialogi(ui) {
  const dialogi = document.getElementById('nahtavyys-dialog');
  if (!dialogi) return;
  // Korkeus samalla kertaa kuin leveys: kortin alalaidassa on
  // Sulje-nappi, joka jää ruudun ali jos katto on vanhentunut.
  ui.mitoitaArkinKorkeus();
  const mitta = ui.mittaaNakyma() || 0;
  // Sama jako kuin CSS:ssä (styles.css, .dialog.nahtavyys-arkki):
  // nähtävyysjuttu levenee 92 vw:hen 700 pikselistä alkaen
  // (omistajan palaute 18.8.2026: "iPadilla leveämpi"), opas pitää
  // 84 vw:n julistemittansa 760:stä alkaen.
  const opas = dialogi.classList.contains('opas-arkki');
  const raja = opas ? 760 : 700;
  const osuus = opas ? 0.84 : 0.92;
  const katto = opas ? 840 : 860;
  dialogi.style.width = mitta >= raja
    ? `${Math.min(Math.round(mitta * osuus), katto)}px`
    : '';
}

/** Yksi nähtävyysjutun kuva selitteineen ja lähteineen. */
export function nahtavyydenKuva(ui, kuva) {
  const kehys = html('figure', 'nahtavyys-kuvakehys');
  const el = document.createElement('img');
  el.className = 'nahtavyys-kuva kulttuuri-kuva-nappi';
  el.alt = kuva.selite ?? '';
  // Sama peiliputki ja suurennus kuin nostojen kuvilla.
  ui.varustaNostonKuva(el, kuva, 900);
  /*
   * Kuvan suunta luokaksi kehykseen (omistajan ohje 8.8.2026:
   * jutun ensimmäinen kuva saa olla iso jos se on vaaka; pysty
   * pidetään pienempänä). Suunta selviää vasta kun selain tietää
   * kuvan mitat, joten luokka lisätään load-hetkellä — CSS päättää
   * koon vasta ensikuva+suunta-yhdistelmästä.
   */
  const luokita = () => {
    if (!el.naturalWidth || !el.naturalHeight) return;
    kehys.classList.add(el.naturalWidth >= el.naturalHeight ? 'kuva-vaaka' : 'kuva-pysty');
  };
  if (el.complete) luokita();
  el.addEventListener('load', luokita, { once: true });
  kehys.appendChild(el);
  const teksti = html('figcaption', 'nahtavyys-kuvateksti');
  if (kuva.selite) teksti.appendChild(html('span', 'nahtavyys-selite', kuva.selite));
  // Lähderivi: pro-tuottajan kuvassa tekijän nimi on painike, joka
  // avaa tekijäsivun (js/tekijakortti.js). Ilman `tekijaId`-kenttää
  // rivi on tavallista tekstiä kuten ennen.
  if (kuva.lahde) {
    teksti.appendChild(taytaLahderivi(html('span', 'nahtavyys-lahde'), kuva.lahde, kuva));
  }
  kehys.appendChild(teksti);
  return kehys;
}

/**
 * Useamman kuvan karuselli nähtävyysjuttuun: yksi kuva kerrallaan
 * samassa kehyksessä, nuolet ja "1/3"-laskuri päällä (omistajan
 * palaute 10.8.2026: peräkkäin ladottuina lisäkuvat venyttivät
 * sivun liian pitkäksi).
 *
 * Kuvaelementti luodaan joka vaihdolla UUTENA, koska
 * varustaNostonKuva olettaa kertakäytön: se lisää elementille
 * virhe- ja napautuskuuntelijat, jotka kasautuisivat samaa
 * elementtiä kierrätettäessä (suurennos aukeaisi väärään kuvaan).
 * Suuntaluokka (kuva-vaaka/pysty) lasketaan joka kuvalle load-
 * hetkellä uudestaan, koska pysty- ja vaakakuvia voi olla sekaisin
 * samassa jutussa.
 */
export function nahtavyydenKaruselli(ui, kuvat) {
  const kehys = html('figure', 'nahtavyys-kuvakehys nahtavyys-karuselli');
  const ikkuna = html('div', 'karuselli-ikkuna');
  const teksti = html('figcaption', 'nahtavyys-kuvateksti');
  // Sarjan kaikki kuvat latautuvat taustalla heti — sama osoite ja
  // leveys kuin varustaNostonKuvassa, jotta välimuisti osuu.
  esilataaKuvat(kuvat.map((k) => (k.ampari ? julisteUrl(k.ampari) : valokuvaUrl(k.tiedosto, 900))));
  let kohta = 0;
  let el = null;

  const nayta = (i) => {
    kohta = (i + kuvat.length) % kuvat.length;
    const kuva = kuvat[kohta];
    kehys.classList.remove('kuva-vaaka', 'kuva-pysty');
    const uusi = document.createElement('img');
    uusi.className = 'nahtavyys-kuva kulttuuri-kuva-nappi';
    uusi.addEventListener('load', () => {
      if (uusi !== el || !uusi.naturalWidth || !uusi.naturalHeight) return;
      kehys.classList.add(uusi.naturalWidth >= uusi.naturalHeight ? 'kuva-vaaka' : 'kuva-pysty');
    });
    ui.varustaNostonKuva(uusi, kuva, 900);
    // Suurennos aukeaa koko sarjana (omistajan toive 10.8.2026:
    // "täysikoon kuvakaruselli samanlaiseksi kuin lehtisivulla") —
    // galleriaTila antaa katselimelle nuolet, laskurin ja selauksen.
    uusi.galleriaTila = { teokset: kuvat, kohdalla: kohta };
    if (el) el.replaceWith(uusi); else ikkuna.prepend(uusi);
    el = uusi;
    teksti.replaceChildren();
    if (kuva.selite) teksti.appendChild(html('span', 'nahtavyys-selite', kuva.selite));
    if (kuva.lahde) {
      teksti.appendChild(taytaLahderivi(html('span', 'nahtavyys-lahde'), kuva.lahde, kuva));
    }
    laskuri.textContent = `${kohta + 1}/${kuvat.length}`;
  };

  /*
   * Selaus on sama kuin lehden kuvakotelossa (omistajan toive
   * 10.8.2026): kuvan laidat ovat hentoja nuolialueita, laskuri on
   * tumma pilleri kulmassa, ja vaakapyyhkäisy vaihtaa kuvaa. Samat
   * CSS-luokat kuin lehdessä, joten ulkoasu pysyy yhtenä.
   */
  const nuoli = (luokka, merkki, siirto, nimi) => {
    const nappi = html('button', `arrival-kuva-nuoli ${luokka}`, merkki);
    nappi.type = 'button';
    nappi.setAttribute('aria-label', nimi);
    nappi.addEventListener('click', (e) => { e.stopPropagation(); nayta(kohta + siirto); });
    return nappi;
  };
  ikkuna.appendChild(nuoli('edellinen', '‹', -1, 'Edellinen kuva'));
  ikkuna.appendChild(nuoli('seuraava', '›', 1, 'Seuraava kuva'));
  const laskuri = html('span', 'arrival-kuva-laskuri');
  ikkuna.appendChild(laskuri);
  // Pyyhkäisy: vaakaveto vaihtaa kuvaa. Kynnys erottaa vedon
  // napautuksesta (suurennos) ja pystyvieritys jää selaimelle.
  let veto = null;
  ikkuna.addEventListener('pointerdown', (e) => { veto = { x: e.clientX, y: e.clientY }; });
  ikkuna.addEventListener('pointercancel', () => { veto = null; });
  ikkuna.addEventListener('pointerup', (e) => {
    const alku = veto;
    veto = null;
    if (!alku) return;
    const dx = e.clientX - alku.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - alku.y)) {
      nayta(kohta + (dx < 0 ? 1 : -1));
    }
  });

  kehys.appendChild(ikkuna);
  kehys.appendChild(teksti);
  nayta(0);
  return kehys;
}
