/*
 * KEVYEN KULUN NIMETYT MINITEHTÄVÄT — kaupunkilehden sivut 2 ja 3.
 *
 * Raamatun osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU (omistaja
 * 24.8.2026, ilta): *"Lehden sivuilla 2 ja 3 on KUMMALLAKIN YKSI
 * minitehtävä, erikseen nimettyinä: toinen AARTEEN AVAUS -tehtävä ja
 * toinen JULISTE-tehtävä. Aarteen avaus -tehtävän suoritus sytyttää
 * kartalle PIENEN VIHREÄNÄ HEHKUVAN PISTEEN … juliste-tehtävästä saa
 * julisteen."*
 *
 * ── MIKÄ TÄMÄ ON JA MIKÄ EI ────────────────────────────────────────
 *
 * Tämä EI ole uusi tehtävämekaniikka. Kysymys, vastauslipukkeet,
 * kirjanpito ja palkkio ovat lehden minitehtävän omia
 * (js/game.js actionMinitehtava, js/ui.js piirraMinitehtava): sama
 * avain vastataan kerran, raha maksetaan vain oikeasta vastauksesta ja
 * kaikki kulkee pelitallenteessa. Uutta on kolme asiaa:
 *
 *   1. NIMILAATTA. Laatikon otsake ei ole "Lehden minitehtävä" vaan
 *      tehtävän oma nimi — "AARTEEN AVAUS" tai "JULISTE". Se on koko
 *      kokeilun ydin: pelaajan pitää nähdä sivulta, kumpi tehtävä
 *      avaa tien aarteelle ja kumpi antaa julisteen.
 *   2. SIJAINTI SIVUNUMEROSSA. Tehtävä ei tule aihesivun omasta
 *      `tehtava`-kentästä vaan kaupungin fokusvirtadatasta
 *      (js/packs/fokusvirta-ateena.js lehtitehtavat), jossa jokaisella
 *      on sivunumero. Sivun oma tehtävä väistyy nimetyn tieltä, jotta
 *      sivulla on Raamatun vaatima YKSI minitehtävä eikä kahta.
 *   3. PALKINTONA PISTE. AARTEEN AVAUS ei maksa julistetta vaan
 *      sytyttää kartalle vihreän kohtaamispisteen (js/fokuspiste.js).
 *
 * ── LIPPU ──────────────────────────────────────────────────────────
 *
 * FOKUS_LEHTITEHTAVAT on kevyen kulun puoli, ja js/fokusvirta.js:n
 * FOKUSVIRTA_KORTIT on raskaan virran puoli. Liput ovat toistensa
 * vastakohdat: vanha korttiannostelu palautetaan kääntämällä tämä
 * `false`ksi ja se `true`ksi. Kumpikaan ei poista riviäkään koodia.
 *
 * ── MIKSI OMA MODUULI EIKÄ js/fokusvirta.js ────────────────────────
 *
 * Niputusjärjestys (tools/build-standalone.mjs, tarkista-niputus):
 * lehden sivunpiirto (js/maalehti.js piirraKategoria) kutsuu tätä, ja
 * se ladataan ENNEN js/fokusvirta.js:ää. Fokusvirta puolestaan lukee
 * täältä yhden kysymyksen — onko aarteen avaus jo ratkaistu — joten
 * riippuvuus kulkee vain tähän suuntaan.
 */
import { fokusmoodiPaalla, html, TOAST_MS } from './ui-apurit.js';
import { kaupunginJuliste } from './packs/julisteet.js';
import { fokusvirtaKaupungille } from './packs/fokusvirrat.js';
import { natiiviVastaus } from './natiivi.js';
import { sfx } from './sound.js';

/** Kevyen kulun lehtitehtävät päällä? Ks. LIPPU yllä. */
export const FOKUS_LEHTITEHTAVAT = true;

/**
 * Palkkio oikeasta vastauksesta.
 *
 * Sama luku kuin fokusvirran minivisalla (js/fokusvirta.js
 * TAKY_PALKKIO = 50), koska tehtävä on sama asia toisella pinnalla:
 * lämmittely ennen laattakysymystä. Lehden tavallinen minitehtävä
 * maksaa vähemmän (10), koska sen vastaus lukee samalla sivulla;
 * näiden vastaus on lehden toisella puolella tai kartalla.
 */
export const FOKUS_TEHTAVA_PALKKIO = 50;

/** Kirjanpitoavaimen etuliite: ei voi osua aihesivun omaan avaimeen. */
const TEHTAVA_ETULIITE = 'fokus';

/** Tehtävän aiheavain (game.actionMinitehtava) ja koko avain. */
function tehtavanAihe(tehtava) {
  return `${TEHTAVA_ETULIITE}:${tehtava.id}`;
}

function tehtavanAvain(ui, city, tehtava) {
  return `${ui.game.pack.id}:${city.id}:${tehtavanAihe(tehtava)}`;
}

/**
 * Kaupungin nimetyt lehtitehtävät — tai tyhjä lista.
 *
 * Ehdot ovat samat kuin fokusvirralla (js/fokusvirta.js
 * fokusvirtaSisalto): lippu päällä, fokusmoodi päällä, pelaaja ihminen
 * ja kaupungilla sisältöä. Ilman yhtäkin niistä lehti näyttää sivunsa
 * omat tehtävät entiseen tapaan.
 */
function kaupunginTehtavat(ui, city) {
  if (!FOKUS_LEHTITEHTAVAT) return [];
  if (!city || !ui?.game || ui.game.player?.isBot) return [];
  if (!fokusmoodiPaalla()) return [];
  return fokusvirtaKaupungille(city.id)?.lehtitehtavat ?? [];
}

/**
 * ONKO AARTEEN AVAUS RATKAISTU OIKEIN?
 *
 * Vihreä piste ja pelinappulan paluu lehden päälle lukevat tämän
 * (js/fokuspiste.js, js/fokusvirta.js fokusvirtaLaattaNakyy). Mitta on
 * OIKEIN vastattujen joukko (game.minitehtavatOikein) eikä vastattujen:
 * väärä vastaus ei avaa tietä aarteelle, mutta se ei myöskään jätä
 * pelaajaa lukkoon — kysymykseen vastataan kerran, ja piste syttyy
 * silloin kun sivun tehtävä on oikeasti ratkaistu.
 */
export function fokusAarreAvattu(ui, city) {
  const tehtava = kaupunginTehtavat(ui, city).find((t) => t.palkinto === 'piste');
  if (!tehtava) return false;
  return Boolean(ui.game.minitehtavatOikein?.has(tehtavanAvain(ui, city, tehtava)));
}

/**
 * ONKO AARTEEN AVAUKSEEN JO VASTATTU — oikein tai väärin?
 *
 * Tätä tarvitaan umpikujan estoon: minitehtävään vastataan kerran
 * (game.actionMinitehtava), joten väärin vastannut ei voi enää sytyttää
 * pistettä. Silloin kohtaamisen on löydyttävä muualta, ja lehden oma
 * alanappi palaa (js/ui.js tehtavaNapinTila). Sama oppi kuin
 * fokusvirran täkyportilla: yksi väärä vastaus ei saa lukita pelaajaa
 * kaupunkiin.
 */
export function fokusAarreVastattu(ui, city) {
  const tehtava = kaupunginTehtavat(ui, city).find((t) => t.palkinto === 'piste');
  if (!tehtava) return false;
  return Boolean(ui.game.minitehtavatVastatut?.has(tehtavanAvain(ui, city, tehtava)));
}

/**
 * Juuri nyt auki olevan LEHDEN SIVUN nimetty tehtävä, tai null.
 *
 * KAUPUNKILEHTI JA NYKYINEN KAUPUNKI, EI MUUTA. Maalehden aihesivut
 * (tutkiTila 'maa') ja kehittäjän liitteet ('kehittaja') ovat toisen
 * lehden sivuja, ja Menovinkit-sivu on koko maan yhteinen — se näkyy
 * sekä kaupunkilehdessä että maalehdessä. Ilman tätä ehtoa Ateenan
 * JULISTE-tehtävä ilmestyisi Kreikan maalehteen ja jokaiseen Kreikan
 * kaupunkiin.
 */
export function fokusSivunTehtava(ui) {
  if (ui?.lehtitila?.tutkiTila !== 'kaupunki') return null;
  const city = ui.game?.cityOf?.();
  if (!city || ui.lehtitila.arrivalShownFor !== city.id) return null;
  const sivu = ui.lehtitila.tutkiSivu ?? 0;
  const tehtava = kaupunginTehtavat(ui, city).find((t) => t.sivu === sivu);
  return tehtava ? { city, tehtava } : null;
}

/**
 * KYTKENTÄKOHTA js/maalehti.js:n piirraKategoriassa.
 *
 * Yksi kutsu molempien sivumallien (nostosivu ja vinkkilista) lopussa,
 * ja se ratkaisee kumpi tehtävä sivulle tulee: kevyen kulun nimetty vai
 * sivun oma. Aiemmin kutsukohdissa luki `if (kategoria.tehtava)`, ja
 * juuri se ehto esti nimetyn tehtävän sivuilta, joilla omaa ei ole
 * (Menovinkit).
 */
export function piirraSivunTehtava(ui, kohde, kategoria) {
  const oma = fokusSivunTehtava(ui);
  if (oma) {
    piirraNimettyTehtava(ui, kohde, oma.city, oma.tehtava);
    return;
  }
  if (kategoria?.tehtava) ui.piirraMinitehtava(kohde, kategoria);
}

/**
 * Nimetty tehtävälaatikko sivun loppuun.
 *
 * Ulkoasu on lehden minitehtävän oma (.minitehtava ja sen luokat,
 * css/styles.css): kokeilu ei tuo lehteen uutta grafiikkaa, vaan
 * vaihtaa laatikon otsakkeen ja palkinnon. Otsake on isolla kirjoitettu
 * nimi datasta — se on Raamatun vaatima "näkyvä nimilaatta".
 */
function piirraNimettyTehtava(ui, kohde, city, tehtava) {
  const visa = tehtava.visa;
  if (!visa?.vaihtoehdot?.length) return;
  const juliste = tehtava.palkinto === 'juliste' ? kaupunginJuliste(city.id) : null;
  const laatikko = html('div', `minitehtava${juliste ? ' minitehtava-palkinnollinen' : ''}`);
  laatikko.appendChild(html('p', 'minitehtava-otsikko', tehtava.otsake));
  const avain = tehtavanAvain(ui, city, tehtava);

  if (ui.game.minitehtavatVastatut?.has(avain)) {
    /*
     * Takautuva myöntö samalla säännöllä kuin lehden minitehtävässä
     * (js/ui.js piirraMinitehtava): oikein vastannut saa julisteensa,
     * vaikka palkinto olisi lisätty vasta vastauksen jälkeen. Väärin
     * vastannut ei saa sitä takaoven kautta.
     */
    const voitettu = Boolean(juliste)
      && (ui.game.minitehtavatOikein?.has(avain) || ui.game.julisteet?.has(city.id));
    if (juliste) {
      const myonto = voitettu ? ui.game.myonnaJuliste(city.id) : { uusi: false };
      ui.piirraJulistepalkinto(laatikko, city.id, juliste, voitettu);
      if (myonto.uusi) ui.onChange?.(ui.game);
    }
    laatikko.appendChild(html('p', 'minitehtava-kysymys',
      visa.fakta ?? 'Tämän sivun minitehtävä on jo ratkaistu.'));
    kohde.appendChild(laatikko);
    return;
  }

  // Palkinto ensin, jotta teksti kiertää sen (float oikealle, css).
  const palkinto = juliste
    ? ui.piirraJulistepalkinto(laatikko, city.id, juliste, ui.game.julisteet?.has(city.id))
    : null;
  laatikko.appendChild(html('p', 'minitehtava-kysymys', visa.kysymys));
  const vaihtoehdot = html('div', 'kulttuuri-vaihtoehdot');
  const tulos = html('p', 'kulttuuri-tulos');
  tulos.hidden = true;
  visa.vaihtoehdot.forEach((teksti, i) => {
    const nappi = html('button', '', teksti);
    nappi.type = 'button';
    nappi.addEventListener('click', () => {
      const oikein = i === visa.oikea;
      const vastaus = ui.game.actionMinitehtava(
        city.id, tehtavanAihe(tehtava), oikein, FOKUS_TEHTAVA_PALKKIO,
      );
      if (!vastaus.ok) return;
      vaihtoehdot.replaceChildren();
      tulos.hidden = false;
      tulos.className = oikein ? 'kulttuuri-tulos oikein-tulos' : 'kulttuuri-tulos vaarin-tulos';
      tulos.textContent = (oikein
        ? `Oikein! +${FOKUS_TEHTAVA_PALKKIO} puntaa. `
        : `Oikea vastaus: ${visa.vaihtoehdot[visa.oikea]}. `) + (visa.fakta ?? '');
      sfx.play(oikein ? 'correct' : 'wrong');
      natiiviVastaus(oikein);
      if (oikein) {
        const box = ui.buildToast?.({
          kind: 'stamp',
          icon: 'kukkaro',
          text: `+${FOKUS_TEHTAVA_PALKKIO} puntaa`,
          sub: `${tehtava.otsake} ratkesi`,
        });
        if (box) setTimeout(() => ui.removeToast(box), TOAST_MS.default);
      }
      if (oikein && juliste) {
        // Juliste kokoelmaan heti, katselu vasta napista (omistajan
        // tilaus 22.8.2026): oikean vastauksen tekstin ehtii lukea.
        ui.game.myonnaJuliste(city.id);
        palkinto?.merkitseVoitetuksi();
        ui.elavoitaLaukku?.();
        const lunasta = html('button', 'minitehtava-lunastus', 'Lunasta juliste');
        lunasta.type = 'button';
        lunasta.addEventListener('click', () => ui.naytaJuliste(city.id));
        laatikko.appendChild(lunasta);
      }
      // Koko render() sulkisi lehden — riittää tallentaa ja päivittää
      // rahapilleri (sama syy kuin lehden minitehtävässä).
      ui.onChange?.(ui.game);
      ui.renderTurnPill?.();
      /*
       * VIHREÄ PISTE SYTTYY HETI. Kartta on lehden takana, ja piste on
       * siellä valmiina kun pelaaja sulkee lehden — mutta ilman tätä
       * kutsua se odottaisi seuraavaa kartan päivitystä, ja pelaaja
       * voisi ehtiä katsoa karttaa sitä ennen.
       */
      if (oikein && tehtava.palkinto === 'piste') ui.paivitaFokuspiste?.();
    });
    vaihtoehdot.appendChild(nappi);
  });
  laatikko.appendChild(vaihtoehdot);
  laatikko.appendChild(tulos);
  kohde.appendChild(laatikko);
}
