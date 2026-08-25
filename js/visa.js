/*
 * Visan koneisto: tehtävä- ja kaksintaistelukortit, tiimalasi ja
 * vastausten käsittely. Siirretty js/ui.js:stä 17.8.2026 (remontin
 * M6, malli B — docs/moduulirakenne-suunnitelma.md). Funktiot saavat
 * ui-olion ensimmäisenä parametrinaan ja kirjoittavat visapiirteen
 * kenttiä (ui.quiz*, ui.hg*, ui.hourglass, ui.timedQuiz, ui.remaining,
 * ui.lastTick, ui.lastWhole). Kortin yhteiset apurit (syncOptions,
 * typeText, renderEvent, playTokenReveal) asuvat yhä ui.js:ssä ja
 * kutsutaan ui-olion kautta.
 */

import { kertojaTila } from './aani-ehdokkaat.js';
import { startQuizMusic, stopQuizMusic } from './ambience-stream.js';
import {
  EXPLORE_REWARD, FIFTY_FIFTY_PRICE, HARD_BONUS,
  HINT_PRICE, QUIZ_SECONDS,
} from './game.js';
import { lueKertojana, playDiaryVoice } from './luenta.js';
import { asetaKuva } from './media.js';
import { natiiviVastaus } from './natiivi.js';
import { piirraAfrikanPulma, onAfrikanPulma } from './packs/africa-puzzles.js';
import { piirraEuroopanPulma } from './packs/europe-puzzles.js';
import {
  lippuUrl, lippuVara, valokuvaUrl, valokuvaVara,
} from './packs/africa-valokuvat.js';
import { KOHTAAMISET } from './packs/kohtaamiset.js';
import { POLLO_AARRE } from './pollo.js';
import { TARINAKAARI } from './packs/tarinakaari.js';
import { KOHTAAMISLUENNAT } from './sisaltotaulut.js';
import { sfx } from './sound.js';
import { aarreIkoni, html } from './ui-apurit.js';

/**
 * Pulman piirros oikeasta laudasta. Tunnisteet ovat yksilöllisiä yli
 * lautojen, joten oikea piirtäjä löytyy kysymällä.
 */
function drawPuzzle(svg, id, data) {
  if (onAfrikanPulma(id)) piirraAfrikanPulma(svg, id, data);
  else piirraEuroopanPulma(svg, id, data);
}

// Tehtäväkortti paljastuu vaiheittain: kehys, tauko, kysymys, tauko,
// vaihtoehdot. Kirjoituskone on etusivua ripeämpi mutta rauhallisempi
// kuin pelitilanneilmoitukset.
const QUIZ_TYPE_MS = 95;
const QUIZ_PAUSE_MS = 700;

export function renderQuiz(ui) {
  if (ui.dead) return; // kesken jäänyt animaatioketju voi kutsua tätä vielä destroyn jälkeen
  const { game } = ui;
  ui.renderEvent();
  if (game.phase === 'duel' && game.duel) {
    renderDuel(ui);
    return;
  }
  const quiz = game.quiz;
  if (game.phase !== 'quiz' || !quiz) {
    stopQuizTimer(ui);
    stopQuizMusic();
    if (ui.quizDialog.open) ui.quizDialog.close();
    return;
  }

  const city = game.board.cityById.get(quiz.cityId);
  const hardTag = quiz.hard ? ` · vaikea kysymys +${HARD_BONUS} p` : '';
  // Kohtaaminen koskee tavallista visaa: muut muodot (pulma, väittämä,
  // valokuva, lippu, portti) pitävät omat kehyshahmonsa.
  const kohtaaminen = (!quiz.kind && !quiz.gate) ? (KOHTAAMISET[quiz.cityId] ?? null) : null;
  const tervehdysAvain = `${game.pack.id}:${quiz.cityId}`;
  /*
   * Tarinakaaren kohtaaminen syrjäyttää tavallisen tervehdyksen:
   * kaupungin ensimmäisessä aarrevisassa puhuu kaaren henkilö, ja
   * hänen kysymyksensä on visan kysymys (game.js pariutti ne).
   * Avain merkitään nähdyksi, ettei vanha tervehdyshahmo esittäydy
   * heti perään toisessa visassa.
   */
  const kaariTarina = quiz.kaari ? (TARINAKAARI[quiz.cityId] ?? null) : null;
  const tervehdys = kaariTarina
    ? kaariTarina.kohtaaminen
    : (kohtaaminen && !ui.kohtaamisetNahty.has(tervehdysAvain)
      ? kohtaaminen.tervehdys
      : null);
  // Pulman piirros ensin, kysymysrivi alla — kortti on isoisän luonnos.
  // HUOM: SVGElement ei peri HTMLElementiä, joten .hidden-ominaisuus ei
  // heijastu attribuuttiin — se jäisi päälle ja [hidden]-sääntö piilottaisi
  // piirroksen pysyvästi. Attribuuttia on siis käsiteltävä suoraan.
  ui.quizSketch.toggleAttribute('hidden', quiz.kind !== 'puzzle');
  if (quiz.kind === 'puzzle' && ui.sketchFor !== quiz) {
    ui.sketchFor = quiz;
    ui.quizSketch.textContent = '';
    drawPuzzle(ui.quizSketch, quiz.puzzleId, quiz.sketchData);
  }
  // Piirroksen selite: kertoo mitä luonnoksessa näkyy.
  ui.quizSelite.hidden = quiz.kind !== 'puzzle' || !quiz.selite;
  if (!ui.quizSelite.hidden) ui.quizSelite.textContent = quiz.selite;

  // Valokuvakysymyksen kuva ladataan kerran per kysymys. Jos kuvaa ei
  // saada (esim. verkko katkesi kysymyksen avauduttua), tilalle jää
  // kysymysteksti — vaihtoehtoihin voi silti vastata tai antaa ajan
  // valua umpeen.
  ui.quizPhoto.hidden = quiz.kind !== 'photo' && quiz.kind !== 'flag';
  if (quiz.kind === 'photo' && ui.photoShownFor !== quiz) {
    ui.photoShownFor = quiz;
    ui.quizPhoto.removeAttribute('src');
    // Kuratoitu valokuva samasta putkesta kuin postikortit ja liput:
    // paikallinen kopio tai peili ensin, Commons varalla.
    if (quiz.photoFile) {
      asetaKuva(ui.quizPhoto,
        valokuvaUrl(quiz.photoFile, 640), valokuvaVara(quiz.photoFile, 640));
      ui.quizPhoto.alt = 'Matkavalokuvaajan vedos';
    }
  }
  /*
   * Lippu tulee samaan kehykseen kuin valokuva, mutta se on repossa
   * eikä verkossa — kysymys toimii siis myös yhteydettömänä. Alt-teksti
   * ei saa kertoa maata: se olisi vastaus.
   */
  ui.quizPhoto.classList.toggle('quiz-lippu', quiz.kind === 'flag');
  if (quiz.kind === 'flag' && ui.photoShownFor !== quiz) {
    ui.photoShownFor = quiz;
    asetaKuva(ui.quizPhoto, lippuUrl(quiz.flagFile, 320), lippuVara(quiz.flagFile, 320));
    ui.quizPhoto.alt = 'Tullimiehen näyttämä lippu';
  }

  // Leima näkyy vain pulmissa ja valokuvissa: irrallinen "Tietovisa"-sana
  // on turha, kun kehys kertoo kuka kysymyksen esittää.
  ui.quizBadge.hidden = !['puzzle', 'photo', 'flag'].includes(quiz.kind);
  ui.quizBadge.textContent = { photo: 'Valokuva', flag: 'Lippu' }[quiz.kind] ?? 'Pulma';
  let otsikko;
  if (quiz.kind === 'puzzle') {
    otsikko = `Isoisän luonnoskirjasta — ${quiz.title}`;
  } else if (quiz.kind === 'claim') {
    // Väittämässä puhuu isoisä, ei peli: otsikko kertoo äänen ja paikan,
    // jota merkintä koskee — se on usein muu kuin pelaajan sijainti.
    const aihe = quiz.place ? ` · ${quiz.place}` : '';
    otsikko = `Isoisän päiväkirjasta, 1873${aihe} — pitääkö tämä yhä paikkansa?`;
  } else if (quiz.gate) {
    otsikko = `${city.name} — portti: ${quiz.gate.label}`;
  } else if (kaariTarina) {
    // Tarinakaaren kohtaaminen: kehyksenä kaupunki ja kohtaaminen —
    // henkilö esittäytyy itse repliikissään.
    otsikko = `${city.name} — kohtaaminen:${hardTag}`;
  } else if (kohtaaminen) {
    // Tarinallinen kohtaaminen (omistajan toive 5.8.2026): nimetty
    // paikallinen hahmo kysyy, ei satunnainen kysyjä.
    otsikko = `${city.name} — ${kohtaaminen.frame}:${hardTag}`;
  } else {
    // Kehystarina: paikallinen kysyjä. Vanhassa tallenteessa kehystä ei
    // ole, jolloin otsikkona on pelkkä kaupunki.
    otsikko = quiz.frame
      ? `${city.name} — ${quiz.frame}:${hardTag}`
      : `${city.name}${hardTag}`;
  }
  // Kortti paljastuu vaiheittain kirjoituskoneella: ensin kehystarina,
  // pieni tauko, sitten kysymys, tauko, ja vasta lopuksi vaihtoehdot.
  // Samalla kääntyy päiväkirjan sivu ja hiljainen mietintämusiikki alkaa.
  if (ui.typedQuizFor !== quiz) {
    ui.typedQuizFor = quiz;
    ui.quizStage = 0;
    // Edellisen kysymyksen mahdollinen aloitusportti pois.
    ui.quizAloita.hidden = true;
    ui.jatkaKysymykseen = null;
    sfx.play('quizOpen');
    startQuizMusic(ui.game.pack.id);
    ui.quizQuestion.textContent = '';
    ui.quizKohtaaminen.textContent = '';
    ui.quizKohtaaminen.hidden = !tervehdys;
    /*
     * Kohtaamiskuva tekstin oikealle puolelle, jos kohteelle on
     * generoitu muotokuva (omistajan pilotti 10.8.2026: Ateena ja
     * Sofia ensin). Kuva on kaaridatan kuva-kenttä; puuttuva
     * tiedosto piilottaa kuvan äänettömästi onerror-varasolulla.
     */
    const kohtaamisKuva = tervehdys ? (kaariTarina?.kuva ?? null) : null;
    if (ui.quizKohtaaminenKuva) {
      if (kohtaamisKuva) {
        ui.quizKohtaaminenKuva.src = kohtaamisKuva;
        ui.quizKohtaaminenKuva.onerror = () => { ui.quizKohtaaminenKuva.hidden = true; };
      }
      ui.quizKohtaaminenKuva.hidden = !kohtaamisKuva;
    }
    /*
     * Vanha isoisän sitaattilohko poistui, kun tarinakaari korvasi
     * sen (omistajan tilaus 9.8.2026): isoisän jälki kulkee nyt
     * kohtaamisen ja sen kysymyksen kautta, ei erillisenä
     * sitaattina kysymyksen yllä.
     */
    ui.quizIsoisa.hidden = true;
    const vaihtoehdot = () => {
      if (ui.dead || ui.typedQuizFor !== quiz) return;
      ui.quizStage = 2;
      renderQuiz(ui);
    };
    const kysymys = () => {
      if (ui.dead || ui.typedQuizFor !== quiz) return;
      ui.quizStage = 1;
      ui.typeText(ui.quizQuestion, quiz.question, 'quiz', () => {
        ui.typeTimers.quiz = setTimeout(vaihtoehdot, QUIZ_PAUSE_MS);
      }, QUIZ_TYPE_MS);
    };
    // Kohtaamisen avaus kirjoittuu otsikon ja kysymyksen väliin —
    // vain ensi kerralla; sen jälkeen hahmo menee suoraan asiaan.
    const avaus = () => {
      if (ui.dead || ui.typedQuizFor !== quiz) return;
      if (!tervehdys) {
        kysymys();
        return;
      }
      ui.kohtaamisetNahty.add(tervehdysAvain);
      /*
       * KERTOJA EI ENÄÄ LUE TERVEHDYSTÄ (omistajan tilaus 18.8.2026:
       * "Ota kertojan ääni pois ... siitä hetkestä, kun pelaaja menee
       * tapaamaan henkilöä"). Tervehdys kirjoittuu kirjoituskoneella
       * luettavaksi; vastausrepliikkien luennat alempana säilyvät.
       */
      ui.typeText(ui.quizKohtaaminen, tervehdys, 'quiz', () => {
        /*
         * Peli alkaa vasta Aloita peli -napista (omistajan toive
         * 10.8.2026): tervehdys saa tulla luetuksi rauhassa, kysymys
         * ja vaihtoehdot tulevat esiin painalluksesta, ja tiimalasi
         * käynnistyy vasta niiden myötä (esilla-ehto alla). Botille
         * porttia ei jätetä — se vastaa suoraan pelitilaan.
         */
        if (ui.game.player.isBot) {
          ui.typeTimers.quiz = setTimeout(kysymys, QUIZ_PAUSE_MS);
          return;
        }
        ui.jatkaKysymykseen = kysymys;
        ui.quizAloita.hidden = false;
      }, QUIZ_TYPE_MS);
    };
    ui.typeText(ui.quizCity, otsikko, 'quiz', () => {
      ui.typeTimers.quiz = setTimeout(avaus, QUIZ_PAUSE_MS);
    }, QUIZ_TYPE_MS);
  } else if ((ui.quizStage ?? 2) >= 2) {
    // Itsekorjaus valmiille kortille: jos jokin muu kirjoitus on ehtinyt
    // sotkea tekstit (esim. edellisen pelin kesken jäänyt kirjoituskone),
    // ne asetetaan kerralla kokonaan — muuten vaihtoehdot ja tulos
    // näkyisivät väärän kysymyksen alla.
    if (ui.quizCity.textContent !== otsikko) ui.quizCity.textContent = otsikko;
    if (ui.quizQuestion.textContent !== String(quiz.question)) {
      ui.quizQuestion.textContent = quiz.question;
    }
  }
  ui.syncOptions(quiz, (i) => answerQuiz(ui, i));
  // Vaihtoehdot ja apukeinot pysyvät piilossa, kunnes kysymys on
  // kirjoitettu loppuun. Vanha tallenne (ei quizStage-arvoa) näyttää
  // kaiken heti.
  const esilla = (ui.quizStage ?? 2) >= 2 || quiz.chosen !== null;
  ui.quizOptions.hidden = !esilla;

  const answered = quiz.chosen !== null;
  // Vastauksen jälkeen näytetään ensin pelkkä tuomio, ja vasta aarteen
  // paljastuksen jälkeen löytö ja selitys.
  const revealed = ui.revealShownFor === quiz;

  // Apukeinot: 40 punnalla sanallinen vihje, 80 punnalla kaksi väärää pois.
  const p = game.player;
  const used = quiz.hidden.length > 0;
  // Väittämässä on kaksi vaihtoehtoa ja karttakysymykseen vastataan
  // kartalta, joten 50:50 ei kuulu niihin lainkaan.
  ui.quizFifty.hidden = !esilla || answered || p.isBot || quiz.options.length < 4;
  ui.quizFifty.disabled = used || p.money < FIFTY_FIFTY_PRICE;
  ui.quizFifty.textContent = used ? '50:50 käytetty' : `50:50 (${FIFTY_FIFTY_PRICE} p)`;

  ui.quizHint.hidden = !esilla || answered || p.isBot || !quiz.hint;
  ui.quizHint.disabled = quiz.hintShown || p.money < HINT_PRICE;
  ui.quizHint.textContent = quiz.hintShown ? 'Vihje ostettu' : `Vihje (${HINT_PRICE} p)`;

  ui.quizHintText.hidden = !quiz.hintShown;
  if (quiz.hintShown) ui.quizHintText.textContent = quiz.hint;

  // Tiimalasi käynnistyy vasta, kun vaihtoehdot ovat esillä — lukuaikaa
  // ei kuluteta kirjoituskoneen naksutteluun.
  if (esilla) {
    renderTimer(ui, quiz);
  } else {
    ui.quizTimerEl.hidden = true;
    stopQuizTimer(ui);
  }

  ui.quizResult.hidden = !answered;
  if (answered) {
    ui.quizResult.className = `quiz-result ${quiz.right ? 'right' : 'wrong'}`;
    ui.quizResult.textContent = '';

    if (!revealed) {
      const verdict = quiz.timedOut ? 'Aika loppui!' : quiz.right ? 'Oikein!' : 'Väärin.';
      ui.quizResult.appendChild(html('strong', 'quiz-verdict', verdict));
    } else {
      const found = quiz.found ? game.aarreTyyppi(quiz.found, quiz.cityId) : null;
      const body = html('div');
      if (quiz.gate && quiz.right) {
        body.appendChild(html('strong', '', `◈ Portti aukeaa — ${quiz.gate.label}!`));
        body.appendChild(html('span', 'muted', 'Tieto avasi tien: matka jatkuu ilmaiseksi.'));
      } else if (quiz.right && quiz.found === 'pollo') {
        /*
         * PÖLLÖ KORVASI ENSIMMÄISEN LAATAN AARTEEN (omistaja
         * 18.8.2026): revealToken palautti pöllön eikä laattatyyppiä,
         * joten tuloskortti kertoo löydöksi pöllön — aarrekuvaa tai
         * puntia ei ole, koska laatan sisältöä ei annettu.
         */
        ui.quizResult.appendChild(aarreIkoni(
          { kuva: POLLO_AARRE.kuva, name: POLLO_AARRE.nimi }, 'empty', 56,
        ));
        body.appendChild(html('strong', '', `Löysit: ${POLLO_AARRE.nimi}`));
      } else if (quiz.right && found) {
        // Iso kuva (omistajan toive 10.8.2026: "kuva saisi olla
        // isommalla") — aarre on rivin pääasia, ei kuvake.
        ui.quizResult.appendChild(aarreIkoni(found, quiz.found, 56));
        body.appendChild(html('strong', '', `Löysit: ${found.name}`));
      } else if (quiz.right && quiz.explore) {
        /*
         * Laatattoman kohtaamisen voitto on AARRE eikä pelkkä
         * rahapalkkio (omistajan palaute 10.8.2026 Ateenasta):
         * kaaren aarreteksti sulkee tarinan ja kertoja lukee sen —
         * sama pari kuin laatan paljastuksessa (playTokenReveal).
         */
        const kaariAarre = quiz.kaari ? TARINAKAARI[quiz.cityId]?.aarre : null;
        body.appendChild(html('strong', '', kaariAarre
          ? `Kätkö löytyi! +${EXPLORE_REWARD} puntaa.`
          : `Oikein! Löytöpalkkio +${EXPLORE_REWARD} puntaa.`));
        if (kaariAarre) {
          /*
           * Kätkökuva laatattoman löydön tuloskorttiin (omistajan
           * pilotti 10.8.2026): löytö NÄKYY eikä ole vain rivi
           * tekstiä — sama henki kuin laatan paljastuskortissa.
           */
          const katko = document.createElement('img');
          katko.className = 'katko-kuva';
          katko.src = 'assets/kohtaamiset/kohtaaminen-katko.jpg';
          katko.alt = 'Kätkö';
          katko.onerror = () => katko.remove();
          body.appendChild(katko);
          // KERTOJA EI ENÄÄ LUE AARRETEKSTIÄ (omistajan tilaus
          // 18.8.2026: kertojan ääni pois aarteen tapaamisista) —
          // teksti jää tuloskortille luettavaksi.
          body.appendChild(html('span', 'kohtaaminen-repliikki', kaariAarre));
        }
      } else if (quiz.right) {
        body.appendChild(html('strong', '', 'Oikein!'));
      } else {
        const lead = quiz.timedOut ? 'Aika loppui. ' : '';
        body.appendChild(
          html('strong', '', `${lead}Oikea vastaus oli "${quiz.options[quiz.correct]}".`),
        );
        body.appendChild(
          html('span', 'muted', 'Vuoro vaihtuu — seuraavalla vuorolla saat uuden kysymyksen.'),
        );
      }
      /*
       * Hahmon repliikki päättää kohtaamisen: löytö, tyhjin käsin jäänti
       * tai lohdutus väärästä vastauksesta. Laatan alta löytyy nykyään
       * aina jotain, joten tyhjä repliikki jää tilanteeseen, jossa oikea
       * vastaus ei käännä laattaa lainkaan (esimerkiksi tietoportti).
       */
      if (kohtaaminen) {
        const repliikki = !quiz.right
          ? kohtaaminen.vaarin
          : (quiz.explore || quiz.found)
            ? kohtaaminen.loyto
            : kohtaaminen.tyhja;
        if (repliikki) body.appendChild(html('span', 'kohtaaminen-repliikki', repliikki));
        /*
         * Löytöhetken sananvaihto luetaan ääneen (omistajan rajaus
         * 7.8.2026: hahmon ja pelaajan lyhyt dialogi, "nyt kiireesti
         * seuraavaan paikkaan"). Vain löytö — tyhjä ja väärin jäävät
         * lukematta. renderQuiz ajetaan paljastuksen jälkeen monta
         * kertaa, joten vahti pitää luennan yhdessä aloituksessa.
         */
        if (repliikki === kohtaaminen.loyto && ui.loytoLuentaFor !== quiz
          && kertojaTila() !== 'ei') {
          ui.loytoLuentaFor = quiz;
          // Lukijaääni ensin (14.8.2026); äänite varapolkuna.
          if (!lueKertojana(ui, repliikki, { viive: 300 })
            && KOHTAAMISLUENNAT.has(quiz.cityId)) {
            playDiaryVoice(ui, 
              `assets/audio/puhe-kohtaaminen-${quiz.cityId}-loyto.mp3`,
              { viive: 300 },
            );
          }
        }
      }
      if (quiz.fact) body.appendChild(html('span', 'muted', quiz.fact));
      const quizSource = ui.sourceLine(quiz.source);
      if (quizSource) body.appendChild(quizSource);
      ui.quizResult.appendChild(body);
    }
  }
  ui.quizContinue.hidden = !answered || !revealed || game.player.isBot;

  if (!ui.quizDialog.open) ui.quizDialog.showModal();
}

/** Rosvon kaksintaistelu: 8 vaihtoehtoa ja helpotukset. */
export function renderDuel(ui) {
  const { game } = ui;
  const duel = game.duel;
  const p = game.player;

  ui.quizBadge.hidden = true;
  // Kaksintaistelussa ei ole kohtaamista — edellisen visan tervehdys
  // ja kohtaamiskuva eivät saa jäädä kortille.
  ui.quizKohtaaminen.hidden = true;
  if (ui.quizKohtaaminenKuva) ui.quizKohtaaminenKuva.hidden = true;
  ui.quizCity.textContent = `Rosvon kaksintaistelu — ${p.name}`;
  // Kaksintaistelu ei käytä vaiheittaista paljastusta: vaihtoehdot ovat
  // heti esillä, eikä edellisen kortin piilotus saa jäädä päälle.
  ui.quizStage = 2;
  ui.quizOptions.hidden = false;
  if (ui.typedQuizFor !== duel) {
    ui.typedQuizFor = duel;
    startQuizMusic(ui.game.pack.id);
    ui.typeText(ui.quizQuestion, duel.question, 'quiz');
  } else if (ui.quizQuestion.textContent !== String(duel.question)) {
    // Sama itsekorjaus kuin tietovisassa: teksti ei saa jäädä eriämään.
    ui.quizQuestion.textContent = duel.question;
  }
  ui.syncOptions(duel, (i) => answerDuelUi(ui, i));

  const answered = duel.chosen !== null;
  const revealed = ui.revealShownFor === duel;

  // Helpotus rosvolta: puolet rahoista, puolet vääristä pois.
  const toll = Math.floor(p.money / 2);
  ui.quizFifty.hidden = answered || p.isBot;
  ui.quizFifty.disabled = duel.reliefs >= 2 || toll <= 0;
  if (duel.reliefs >= 2) ui.quizFifty.textContent = 'Helpotukset käytetty';
  else ui.ikonoi(ui.quizFifty, 'kallo', `Helpotus (rosvo vie ${toll} p)`);

  /*
   * Rosvon ohi ei enää pääse maksamatta: hevosenkenkälaatta poistui,
   * kun laatan alta alkoi löytyä aina aarre. Vihjenappi on siksi
   * kaksintaistelussa aina piilossa.
   */
  ui.quizHint.hidden = true;

  ui.quizHintText.hidden = duel.reliefs === 0;
  if (duel.reliefs > 0) {
    ui.quizHintText.textContent = `Rosvo on vienyt ${duel.taken} puntaa.`;
  }

  renderTimer(ui, duel);

  ui.quizResult.hidden = !answered;
  if (answered) {
    ui.quizResult.className = `quiz-result ${duel.right ? 'right' : 'wrong'}`;
    ui.quizResult.textContent = '';
    if (!revealed) {
      const verdict = duel.timedOut ? 'Aika loppui!' : duel.right ? 'Oikein!' : 'Väärin.';
      ui.quizResult.appendChild(html('strong', 'quiz-verdict', verdict));
    } else {
      const body = html('div');
      if (duel.right && duel.prize) {
        body.appendChild(html('strong', '', `Voitit rosvon — saalis ${duel.prize} puntaa!`));
      } else if (duel.right) {
        body.appendChild(html('strong', '', 'Voitit rosvon — loput rahat säilyvät.'));
      } else {
        const lead = duel.timedOut ? 'Aika loppui. ' : '';
        body.appendChild(
          html('strong', '', `${lead}Rosvo vei rahat — oikea vastaus oli "${duel.options[duel.correct]}".`),
        );
      }
      if (duel.fact) body.appendChild(html('span', 'muted', duel.fact));
      const duelSource = ui.sourceLine(duel.source);
      if (duelSource) body.appendChild(duelSource);
      ui.quizResult.appendChild(body);
    }
  }
  ui.quizContinue.hidden = !answered || !revealed || p.isBot;

  if (!ui.quizDialog.open) ui.quizDialog.showModal();
}

/** Vastaus rosvolle: tuomio, tauko ja selitys — kuten tietovisassa. */
export function answerDuelUi(ui, index) {
  const { game } = ui;
  stopQuizTimer(ui);
  ui.run(() => game.answerDuel(index), {
    after: async () => {
      const duel = game.duel;
      if (!duel) return;
      sfx.play(duel.right ? 'correct' : 'robber');
      natiiviVastaus(Boolean(duel.right));
      renderQuiz(ui);
      await ui.wait(ui.reducedMotion ? 200 : 900);
      ui.revealShownFor = duel;
      renderQuiz(ui);
      await ui.wait(ui.reducedMotion ? 0 : 500);
    },
  });
}

// --- tiimalasi ------------------------------------------------------------

/** Käynnistää tai pysäyttää vastausajan sen mukaan, kuka on vuorossa. */
export function renderTimer(ui, quiz) {
  // Toimii sekä tietovisalle että kaksintaistelulle: molemmilla on
  // chosen- ja seconds-kentät.
  // Pulmassa ei ole kelloa: se on päättelytehtävä, ei nopeuskilpailu.
  const show = !ui.game.player.isBot && quiz.chosen === null && quiz.kind !== 'puzzle';
  ui.quizTimerEl.hidden = !show;
  if (!show) {
    stopQuizTimer(ui);
    return;
  }
  if (ui.timedQuiz !== quiz) startQuizTimer(ui, quiz);
}

export function startQuizTimer(ui, quiz) {
  stopQuizTimer(ui);
  ui.timedQuiz = quiz;
  ui.remaining = (quiz.seconds ?? QUIZ_SECONDS) * 1000;
  ui.lastTick = performance.now();
  ui.lastWhole = Math.ceil(ui.remaining / 1000);
  if (!ui.reducedMotion) {
    ui.hourglass.classList.remove('turning');
    void ui.hourglass.getBoundingClientRect();
    ui.hourglass.classList.add('turning');
  }
  updateTimer(ui);
  ui.quizTimer = setInterval(() => tickTimer(ui), 100);
}

export function stopQuizTimer(ui) {
  if (ui.quizTimer) clearInterval(ui.quizTimer);
  ui.quizTimer = null;
  ui.timedQuiz = null;
}

export function tickTimer(ui) {
  const now = performance.now();
  const dt = now - ui.lastTick;
  ui.lastTick = now;
  // Animaatioiden ajaksi kello pysähtyy, jotta aikaa ei kulu odotellessa.
  if (ui.busy) return;

  ui.remaining = Math.max(0, ui.remaining - dt);
  const quiz = ui.game.quiz;
  if (quiz) quiz.seconds = Math.ceil(ui.remaining / 1000);
  updateTimer(ui);

  const whole = Math.ceil(ui.remaining / 1000);
  if (whole !== ui.lastWhole) {
    ui.lastWhole = whole;
    if (whole > 0 && whole <= 10) sfx.play('tick');
  }
  if (ui.remaining <= 0) timeUp(ui);
}

export function updateTimer(ui) {
  const secs = Math.ceil(ui.remaining / 1000);
  ui.quizSeconds.textContent = String(secs);
  ui.quizTimerEl.classList.toggle('urgent', secs <= 10);
  setSand(ui, 1 - ui.remaining / (QUIZ_SECONDS * 1000));
}

/**
 * Piirtää hiekan tiimalasiin: ylhäällä pinta valuu suppilon muotoisena
 * kuoppana kohti kaulaa, alhaalla kasa nousee pyöreänä kekona.
 */
export function setSand(ui, progress) {
  const t = Math.min(1, Math.max(0, progress));
  const cx = 22;

  // Yläkupu: leveä ylhäällä (y 8.4), kapea kaulassa (y 33.6).
  const surface = 8.4 + t * 25.2;
  const topHalf = Math.max(0, 12.8 - (surface - 8.4) * 0.4901);
  const dip = 1.5 * (1 - t) + 0.25;
  ui.hgTopSand.setAttribute(
    'd',
    t >= 0.999
      ? ''
      : `M ${(cx - topHalf).toFixed(2)} ${surface.toFixed(2)} `
        + `Q ${cx} ${(surface + dip * 2).toFixed(2)} ${(cx + topHalf).toFixed(2)} ${surface.toFixed(2)} `
        + `L 22.45 33.6 L 21.55 33.6 Z`,
  );

  // Alakupu: hiekka kertyy pohjalle (y 60.2) ja nousee kohti kaulaa (y 34.4).
  const level = 60.2 - t * 25.8;
  const botHalf = Math.min(12.8, 0.45 + (level - 34.4) * 0.4787);
  const height = 60.2 - level;
  const mound = Math.min(2.6, height * 0.5, (level - 34.4) * 0.4);
  ui.hgBottomSand.setAttribute(
    'd',
    t <= 0.001
      ? ''
      : `M 9.2 60.2 L 34.8 60.2 L ${(cx + botHalf).toFixed(2)} ${level.toFixed(2)} `
        + `Q ${cx} ${(level - mound * 2).toFixed(2)} ${(cx - botHalf).toFixed(2)} ${level.toFixed(2)} Z`,
  );

  // Virtaava hiekka näkyy vain niin kauan kuin sitä riittää.
  const flowing = t > 0.004 && t < 0.999;
  ui.hgStream.style.display = flowing ? '' : 'none';
  ui.hgStream.setAttribute('height', Math.max(0, level - 33.6).toFixed(2));
}

/** Aika loppui: sama rytmi kuin väärässä vastauksessa, mutta ilman paljastusta. */
export function timeUp(ui) {
  stopQuizTimer(ui);
  const { game } = ui;
  if (game.phase === 'duel' && game.duel && game.duel.chosen === null) {
    ui.run(() => game.timeoutDuel(), {
      after: async () => {
        const duel = game.duel;
        if (!duel) return;
        sfx.play('timeout');
        // Aika loppui = väärä vastaus: putki katkeaa.
        natiiviVastaus(false);
        renderQuiz(ui);
        await ui.wait(ui.reducedMotion ? 200 : 900);
        ui.revealShownFor = duel;
        renderQuiz(ui);
        await ui.wait(ui.reducedMotion ? 0 : 500);
      },
    });
    return;
  }
  if (game.phase !== 'quiz' || !game.quiz || game.quiz.chosen !== null) return;
  ui.run(() => game.timeoutQuiz(), {
    after: async () => {
      const quiz = game.quiz;
      if (!quiz) return;
      sfx.play('timeout');
      natiiviVastaus(false);
      renderQuiz(ui);
      await ui.wait(ui.reducedMotion ? 200 : 900);
      ui.revealShownFor = quiz;
      renderQuiz(ui);
      await ui.wait(ui.reducedMotion ? 0 : 500);
    },
  });
}

/**
 * Vastaus tietovisaan: ensin "Oikein!"/"Väärin.", pieni tauko ja sitten
 * aarteen paljastus, jossa löydön generoitu kuva nousee mustasta.
 */
export function answerQuiz(ui, index) {
  const { game } = ui;
  stopQuizTimer(ui);
  ui.run(() => game.answerQuiz(index), {
    after: async () => {
      const quiz = game.quiz;
      if (!quiz) return;
      sfx.play(quiz.right ? 'correct' : 'wrong');
      // Tärähdys ja oikeiden vastausten putki (iOS-kuori).
      natiiviVastaus(Boolean(quiz.right));
      renderQuiz(ui);
      await ui.wait(ui.reducedMotion ? 200 : 850);
      if (quiz.right && quiz.found) await ui.playTokenReveal(quiz.found);
      ui.revealShownFor = quiz;
      renderQuiz(ui);
      if (!quiz.right) await ui.wait(ui.reducedMotion ? 0 : 500);
    },
  });
}
