/*
 * Vanhan ajan radiosoitin ruudun alalaitaan.
 *
 * Maailmanradio-tilassa kartan kaupungit ovat play-nappeja: painallus
 * käynnistää sen maan kanavan. Tämä tiedosto on se laite, jonka pelaaja
 * näkee alalaidassa — puinen 1930-luvun putkiradio, jossa on
 * kaiutinsäleikkö, naapurikaupunkien asteikko, kaksi metallikytkintä,
 * äänenvoimakkuuden nuppi, merkkilamppu ja aukko pistematriisinäytölle.
 *
 * TÄMÄ MODUULI EI SOITA ÄÄNTÄ. Se on pelkkä laite: se näyttää tilan ja
 * kertoo painalluksista takaisinkutsuilla. Syy on sama kuin
 * linssimoottorissa (docs/moduulit/linssit.md luku 2.6): äänet ovat
 * js/sound.js:n hallussa, ja kaksi paikkaa, jotka molemmat pysäyttävät
 * saman virran, päätyy ennen pitkää eri mieltä siitä kumpi soi.
 *
 * SAMASTA SYYSTÄ LAITE EI TUNNE KARTTAA. Asteikon naapurikaupungit
 * lasketaan täällä, mutta kaupunkilista koordinaatteineen tulee
 * kutsujalta (`kaupungit`) — soitin ei tiedä laudasta, kanavista eikä
 * pelaajan vuorosta mitään muuta kuin mitä sille on annettu.
 *
 * OMA TYYLITIEDOSTO. Soitin lataa css/radio.css itse (ks. lataaTyyli).
 * css/styles.css on toisen työvaiheen hallussa, eikä yhteen tiedostoon
 * kirjoita kaksi tekijää yhtä aikaa. Sivun ei siis tarvitse tietää
 * soittimesta mitään muuta kuin mihin sen juuri liitetään.
 *
 */

/*
 * Soittimen tilat. Neljä riittää, ja niiden on oltava neljä eikä
 * kolme: ilman omaa "virittaa"-tilaa suoran lähetyksen ensimmäiset
 * sekunnit näyttäisivät täsmälleen samalta kuin rikkinäinen asema.
 */
export const RADION_TILAT = Object.freeze(['sammuksissa', 'virittaa', 'soi', 'virhe']);

/*
 * VIRITYKSEN VAIHEET — sopimus soittimen ja js/linssit/radio.js:n välillä.
 *
 * Viritys ei ole yksi tapahtuma vaan kolme, ja pelaaja näkee erot:
 * asteikko LIUKUU uuden aseman kohdalle (siirtyma), HAKEE sitä pienellä
 * edestakaisella liikkeellä niin kauan kuin lähetystä odotetaan (haku)
 * ja ASETTUU paikalleen kun asema on löytynyt (lukittuu).
 *
 * NIMET ASUVAT TÄÄLLÄ EIVÄTKÄ radio.js:SSÄ, vaikka ajoitus on siellä.
 * Vaihe on käsky kuorelle — "liu'u", "hae", "asetu" — ja käskyn sanaston
 * omistaa se, joka sen toteuttaa. radio.js tuo listan tästä ja vie sen
 * edelleen omalla nimellään, jotta ajoituksen testit näkevät saman
 * totuuden eikä kopiota. Kaksi erillistä listaa ehtisi eri mieltä
 * ensimmäisessä lisäyksessä.
 */
export const VIRITYKSEN_VAIHEET = Object.freeze(['siirtyma', 'haku', 'lukittuu']);

/*
 * Kauanko "VIRITTÄÄ..." saa kestää, ennen kuin soitin myöntää ettei
 * asemaa kuulu.
 *
 * Suora lähetys avautuu tyypillisesti 1–3 sekunnissa, mutta kaukainen
 * palvelin voi ottaa kymmenenkin. Kaksitoista sekuntia antaa hitaalle
 * asemalle mahdollisuuden ja katkaisee silti ikuisen odotuksen: rikki
 * mennyt lähetysosoite ei useinkaan anna virhettä lainkaan, vaan jää
 * auki hiljaisena — ja hiljaisuus on juuri se, mikä saa laitteen
 * näyttämään rikkinäiseltä (omistajan huomio).
 */
export const VIRITYKSEN_AIKAKATKAISU_MS = 12000;

/*
 * Näytön aukon kuvasuhde (leveys : korkeus) ja kaksi mittaa, joilla se
 * on toteutettu css/radio.css:ssä.
 *
 * SUHDE ON KUUSI EIKÄ VIISI, ja luku tulee suoraan siitä mitä näytössä
 * pitää lukea. js/linssit/pistenaytto.js piirtää merkin 5 × 7 pisteen
 * ruutuun, joten kuudentoista merkin ja kahden rivin ruudukko on
 * 958 × 158 yksikköä eli 6,06 : 1. Kuusitoista merkkiä on se raja, jolla
 * laitteen omat tekstit ("VALITSE KAUPUNKI", "HELSINKI · SUOMI",
 * "ASEMA EI VASTAA") mahtuvat kokonaan näkyviin. Kolmellatoista ne eivät
 * mahtuneet, ja silloin näyttö vieritti tekstiä TAUKOAMATTA — kartan
 * päällä ikuisesti liikkuva elementti on juuri se, mitä tämä tiedosto
 * muuten välttää (ks. css/radio.css: EI JATKUVIA ANIMAATIOITA).
 *
 * Kaksi kokoa riittää — puhelin ja muut — ja niillä on sama kuvasuhde,
 * joten sama piirto kelpaa molempiin. Aukko saa kutistua tästä vain
 * hyvin kapealla ruudulla, jolloin pistenäyttö keskittyy lasille itse
 * eikä veny (SVG:n oma preserveAspectRatio).
 */
export const NAYTON_SUHDE = 6;
export const NAYTON_MITAT = Object.freeze({
  leveä: { leveys: 408, korkeus: 68 },   // yli 700 px:n ruutu
  kapea: { leveys: 324, korkeus: 54 },   // enintään 700 px:n ruutu
});

/*
 * ASTEIKON LEVEYS PAIKKOINA.
 *
 * Omistajan toive 4.8.2026: "Pistematriisin alapuolella olevat kanavat
 * voisi korvata kuitenkin lähikaupunkien nimillä, joten radiossa voisi
 * siirtyä viereisille kanaville niitä klikkaamalla. Tällöin uusi kanava
 * aina olisi keskellä ja sen vasemmalla ja oikealla puolella olisi
 * ympäröivät kaupungit heti valittavissa."
 *
 * Aiemmin asteikolla olivat aikakauden pitkäaaltoasemat (LAHTI, MOTALA,
 * HILVERSUM...). Ne näyttivät oikeilta mutta eivät tehneet mitään, ja
 * juuri se on tässä laitteessa se ero, joka kannattaa maksaa: nimirivi,
 * jota voi painaa, on viritysasteikko — nimirivi, jota ei voi, on tarra.
 *
 * NELJÄ NAAPURIA PER PUOLI eli yhdeksän nimeä. Sama luku kuin ennenkin,
 * ja samasta syystä: asteikko on kotelossa noin 372 pikseliä leveä, ja
 * seitsemän pisteen kirjasimella siihen mahtuu yhdeksän kaupunginnimeä
 * ilman että ne koskettavat toisiaan. Kapeammalla ruudulla uloimmat
 * jäävät pois CSS:ssä (css/radio.css, data-sija) — laskenta on aina sama,
 * jotta viisari osuu keskimmäiseen riippumatta siitä, montako nimeä
 * näkyy.
 */
export const NAAPUREITA_PER_PUOLI = 4;

/*
 * ══════════════════════════════════════════════════════════════════════
 * VIRITYSNAUHAN LIUKU
 * ══════════════════════════════════════════════════════════════════════
 *
 * Omistaja 4.8.2026: "Kaupunkitekstit liikkuvat liian nopeasti
 * viritettäessä. --- Silloin voisi animoida pehmeämmän siirtymän
 * viritysnauhalle ja jatkaa sitten tarpeeksi hidasta edestakaista, hyvin
 * pientä liikettä mikäli lataus vaatii enemmän aikaa."
 *
 * Liu'un PITUUS lasketaan täällä, sen NOPEUS on css/radio.css:ssä. Jako
 * menee siitä, kumpi tietää asian: pikselimatka uuden aseman vanhalta
 * paikalta uudelle on asettelua, jonka vain mittaus kertoo, ja
 * kiihtyvyyskäyrä on tyyliä.
 *
 * MATKA MITATAAN, EI ARVATA. Kun pelaaja napauttaa asteikon naapuria,
 * uusi asema oli hetki sitten näkyvissä tietyssä kohdassa nauhaa, ja
 * juuri sen verran nauhan pitää liukua. Arvattu vakiomatka olisi
 * naapurilla liian pitkä ja toisen mantereen kaupungilla liian lyhyt —
 * ja silloin liuku ei kertoisi mitään siitä, kuinka kaukaa asema
 * haettiin.
 */

/*
 * Kartalta valitun kaupungin liukumatka osuutena asteikon leveydestä.
 *
 * Kartalta valittu kaupunki ei yleensä ole nauhalla lainkaan, joten
 * mitattavaa paikkaa ei ole. Puolikas asteikko on se matka, jolla uusi
 * nimi tulee juuri ja juuri reunan takaa: pidempi matka olisi
 * ensimmäisen puolen sekunnin ajan pelkkää tyhjää nauhaa, ja lyhyempi
 * ei erottuisi naapurin valinnasta.
 */
const LIUUN_VARAMATKA = 0.5;

/*
 * Lyhin liuku, joka ylipäätään näytetään.
 *
 * Sama asema uudelleen (virheen jälkeen tehty uusi yritys) ei siirrä
 * nauhaa lainkaan, ja täysin liikkumaton nauha kahden sekunnin ajan on
 * jäätynyt laite eikä virittyvä. Kymmenen pikselin nytkähdys on se, mitä
 * oikea laite tekee, kun viritysnuppia kokeillaan uudelleen samasta
 * kohtaa.
 */
const LIUUN_VAHIN = 10;

/*
 * ══════════════════════════════════════════════════════════════════════
 * NAUHAN NYKÄISEVÄ LIIKE (tarttuu ja irtoaa)
 * ══════════════════════════════════════════════════════════════════════
 *
 * Omistaja: "Kanavalista liikkuu liian pehmeästi. Jos sitä oikeasti
 * kädellä vääntää, niin se menee välillä töksähtäen, tai ei ainakaan noin
 * pehmeästi."
 *
 * Havainto on mekaniikkaa. Viritysrulla ei liu'u vaan TARTTUU JA IRTOAA:
 * sormi painaa, kitka pitää, jännite kasvaa, ote pettää ja nauha hypähtää
 * eteenpäin. Sama ilmiö kirskuu jarrussa ja soi viulunkielessä. Tasainen
 * kiihdytyskäyrä on siis väärä malli — se on moottorin liikettä, ei käden.
 *
 * MITÄ MUUTETAAN JA MITÄ EI. Nauhan MATKA lasketaan yhä mittaamalla
 * (laskeLiuku) ja KESTO on yhä css/radio.css:n oma. Hakuvaiheen pieni
 * edestakainen liike ja virityksen vähimmäisaika (js/linssit/radio.js
 * VIRITYKSEN_AJAT) jäävät koskematta — ne ovat omistajan aiempia toiveita,
 * eikä uusi toive kumoa niitä. Vain se, MITEN matka jakautuu ajalle,
 * vaihtuu tasaisesta käyrästä nykäyksiksi.
 *
 * KEINO ON CSS:N linear()-PEHMENNIN. Animaatio on yhä sama kahden
 * avainkehyksen liuku (matka → nolla), mutta pehmennin on porrasmainen:
 * se seisoo tartunnan ajan paikallaan ja etenee sitten kerralla. Liike
 * pysyy siis yhtenä transform-animaationa — ei ajastinta, ei
 * kehyskohtaista javascriptiä, ei kartan uudelleenpiirtoa. Vanha
 * cubic-bezier jää css/radio.css:ään varalle: jos selain ei tunne
 * linear()-pehmennintä, liuku on entisensä eikä rikki.
 *
 * ARVONTA ON SIEMENNETTÄVISSÄ. Nykäisyt arvotaan joka virityksellä
 * uudelleen — sama ote kahdesti peräkkäin ei ole käden liikettä — mutta
 * arvontalähde tulee kutsujalta samaan tapaan kuin viritysäänessä
 * (js/linssit/viritin.js), joten testi ja demo saavat toistettavan
 * tuloksen antamalla oman lähteensä.
 */

/*
 * Nykäisyn rajat yhdessä paikassa, jäädytettynä. Sama sääntö kuin
 * viritysäänessä (js/linssit/viritin.js VIRITTIMEN_RAJAT): satunnaisuus on
 * ominaisuus, mutta rajaton satunnaisuus tuottaa ennen pitkää liikkeen,
 * joka näyttää vialta. Testi tarkistaa nämä rajat.
 */
export const NYKAISYN_RAJAT = Object.freeze({
  /*
   * Montako otetta yhteen liukuun. Kolme on liian vähän — silloin
   * jokainen nykäisy on niin pitkä, että se ehtii lukea liu'uksi — ja
   * seitsemän niin tiheä, ettei yksittäistä pysähdystä enää erota
   * tärinästä.
   */
  nykaisyja: Object.freeze([4, 6]),
  /*
   * Tartunnan osuus yhden otteen ajasta: kuinka kauan nauha seisoo ennen
   * kuin ote pettää. Alaraja pitää huolen, että pysähdys ehtii näkyä
   * (1,25 s:n liu'ussa viidesosa otteesta on runsaat 50 ms), yläraja
   * siitä, ettei liuku ole enemmän seisomista kuin liikettä.
   */
  tartunta: Object.freeze([0.2, 0.5]),
  /*
   * Otteen ajan vaihtelu kertoimena. Ilman vaihtelua nykäisyt tulisivat
   * tasavälein, ja tasavälinen nykiminen lukee koneeksi — juuri se
   * konemaisuus, jota omistaja ei pyytänyt.
   */
  vaihtelu: Object.freeze([0.75, 1.3]),
  /*
   * Etenemän vaihtelu: paljonko yksi ote saa poiketa siitä, mitä
   * hidastuva kaari sille laskee.
   */
  etenemanVaihtelu: Object.freeze([-0.05, 0.05]),
  /*
   * Ylitys osuutena koko matkasta: viimeinen ote menee kohteen yli ja
   * palaa. Omistajan sanoin loppu saa yhä olla pehmeä muttei liukas —
   * ylitys on juuri se ero. 2–5 % puolikkaasta asteikosta on 4–9 px eli
   * pari kirjaimen leveyttä: se näkyy korjausliikkeenä eikä virheenä.
   */
  ylitys: Object.freeze([0.02, 0.05]),
  /*
   * Paluu ylityksestä kohteeseen, osuutena koko ajasta. Tämä on liu'un
   * viimeinen ele, ja se on nopea: käsi huomaa menneensä yli ja korjaa.
   */
  paluu: Object.freeze([0.09, 0.16]),
  /*
   * Lukittumisen ylitys pikseleinä. Lukkovaiheessa matka on hakuliikkeen
   * mittainen (pari pikseliä), joten osuutena laskettu ylitys jäisi
   * alle puolen pikselin eli näkymättömiin — tässä ylitys on siksi
   * pikseleitä eikä prosentteja.
   */
  lukonYlitys: Object.freeze([0.8, 1.8]),
  /*
   * Hidastuvan kaaren jyrkkyys. Yksi olisi tasainen eteneminen; 2,2
   * antaa saman muodon kuin vanha cubic-bezier eli reipas alku ja
   * viimeisten millien etsintä.
   */
  kaari: 2.2,
});

/** Satunnaisluku väliltä [min, max]. */
function valilta(arvonta, [min, max]) {
  return min + arvonta() * (max - min);
}

/** Kokonaisluku väliltä [min, max], molemmat mukaan luettuina. */
function kokonaisValilta(arvonta, [min, max]) {
  return min + Math.floor(arvonta() * (max - min + 1));
}

/**
 * ARPOO YHDEN LIU'UN NYKÄISYT.
 *
 * MIKSI TÄMÄ ON OMA, PUHDAS FUNKTIONSA: se on tämän liikkeen ainoa osa,
 * jonka voi tarkistaa ilman selainta — animaation ajaa CSS. Sama työnjako
 * kuin viritysäänessä: arvonta erikseen, toteutus erikseen.
 *
 * Palauttaa pisteet aikajärjestyksessä. `aika` on osuus liu'un kestosta
 * (0–1) ja `etenema` osuus matkasta (0 = lähtö, 1 = perillä, yli yhden =
 * kohteen ohi). Peräkkäiset pisteet, joilla on sama etenemä, ovat
 * tartunta: nauha seisoo niiden välisen ajan.
 *
 * @param {() => number} [arvonta] satunnaislähde, oletuksena Math.random
 * @returns {{pisteet: Array<{aika: number, etenema: number}>, ylitys: number}}
 */
export function arvoNykaisyt(arvonta = Math.random) {
  const R = NYKAISYN_RAJAT;
  const otteita = kokonaisValilta(arvonta, R.nykaisyja);
  const ylitys = valilta(arvonta, R.ylitys);
  const paluu = valilta(arvonta, R.paluu);

  /*
   * Otteiden ajat: myöhemmät otteet ovat pidempiä. Kättä käännetään
   * ensin reippaasti ja etsitään sitten viimeisiä millejä, joten
   * loppupään otteet vievät enemmän aikaa ja vähemmän matkaa.
   */
  const painot = [];
  for (let i = 0; i < otteita; i++) {
    painot.push((1 + i * 0.55) * valilta(arvonta, R.vaihtelu));
  }
  const summa = painot.reduce((a, b) => a + b, 0);

  // Liikkeelle jäävä aika: paluu ylityksestä on tämän jälkeen.
  const liikeAika = 1 - paluu;
  const pisteet = [{ aika: 0, etenema: 0 }];
  let aika = 0;
  let edellinen = 0;

  for (let i = 0; i < otteita; i++) {
    const viimeinen = i === otteita - 1;
    const kesto = (painot[i] / summa) * liikeAika;
    // Hidastuva kaari: mihin asti tämän otteen jälkeen ollaan.
    const pohja = 1 - (1 - (i + 1) / otteita) ** R.kaari;
    const kohde = viimeinen
      ? 1 + ylitys
      : Math.min(0.985, Math.max(
        edellinen + 0.02, pohja + valilta(arvonta, R.etenemanVaihtelu),
      ));

    // Tartunta: nauha seisoo paikallaan otteen alkuosan.
    const seisonta = kesto * valilta(arvonta, R.tartunta);
    aika += seisonta;
    pisteet.push({ aika, etenema: edellinen });
    // Irtoaminen: koko otteen matka kerralla.
    aika += kesto - seisonta;
    pisteet.push({ aika, etenema: kohde });
    edellinen = kohde;
  }

  /*
   * Ylityksen huipulla pieni pysähdys ennen paluuta. Ilman sitä ylitys
   * olisi terävä kärki eikä korjausliike: käsi huomaa menneensä yli
   * vasta pysähdyttyään.
   */
  pisteet.push({ aika: liikeAika + paluu * 0.25, etenema: 1 + ylitys });
  pisteet.push({ aika: 1, etenema: 1 });
  return { pisteet, ylitys };
}

/**
 * Nykäisyt CSS:n linear()-pehmentimeksi.
 *
 * Muoto on `linear(0, 0.39 22%, 0.39 31%, …, 1)`: arvo on etenemä ja
 * prosentti sen ajankohta. Selain interpoloi pisteiden välit suoraan,
 * joten sama etenemä kahdesti peräkkäin ON pysähdys.
 */
export function nykaisyKaari(arvonta = Math.random) {
  const { pisteet } = arvoNykaisyt(arvonta);
  const osat = pisteet.map(({ aika, etenema }, i) => {
    const arvo = Math.round(etenema * 1000) / 1000;
    // Ensimmäinen ja viimeinen saavat oletusajankohtansa (0 % ja 100 %).
    if (i === 0 || i === pisteet.length - 1) return String(arvo);
    return `${arvo} ${Math.round(aika * 1000) / 10}%`;
  });
  return `linear(${osat.join(', ')})`;
}

/**
 * Lukittumisen ylitys pikseleinä: mihin nauha käy ennen kuin asettuu.
 *
 * Etumerkki on vastakkainen kuin lähtökohdan, koska ylitys on kohteen
 * TOISELLA puolella: hakuvaiheesta vasemmalta tuleva nauha käy hitusen
 * oikealla ja palaa.
 */
export function lukonYlitys(lahto, arvonta = Math.random) {
  const koko = valilta(arvonta, NYKAISYN_RAJAT.lukonYlitys);
  const suunta = Number(lahto) > 0 ? -1 : 1;
  return Math.round(suunta * koko * 10) / 10;
}

/*
 * Juokseva numero SVG-gradienttien tunnuksiin.
 *
 * Kytkimiä on kaksi ja lamppuja yksi, ja jokaisella on omat liukuvärinsä.
 * Jos tunnukset olisivat kiinteitä, toinen kytkin viittaisi ensimmäisen
 * gradienttiin — sama sivu, sama id — ja kromi katoaisi siitä, joka
 * sattuu jäämään jälkimmäiseksi. Sama koskee kahta soitinta peräkkäin
 * (laudan vaihto ehtii jättää vanhan hetkeksi DOM:iin).
 */
let tunnusLaskuri = 0;

const TILAN_RIVIT = {
  sammuksissa: ['RADIO POIS', 'VALITSE KAUPUNKI'],
  virittaa: ['VIRITTÄÄ...', ''],
  soi: ['', ''],
  virhe: ['EI KUULU', ''],
};

/** Tyylilinkin tunniste, jotta linkki syntyy tasan kerran sivua kohti. */
const TYYLIN_TUNNUS = 'radiosoittimen-tyyli';

/**
 * Liittää css/radio.css sivuun, jos sitä ei vielä ole.
 *
 * Osoite johdetaan pelin OMASTA tyylilinkistä (css/styles.css) eikä
 * kirjoiteta suhteellisena merkkijonona. Kaksi syytä:
 *
 * 1. Peli ajetaan myös GitHub Pagesin alihakemistosta, jossa pelkkä
 *    'css/radio.css' osoittaisi juureen ja jäisi lataamatta.
 * 2. Sama tehtävä hoituisi import.meta.url:lla, mutta se on
 *    KIELLETTY tässä tiedostossa: tools/build-standalone.mjs niputtaa
 *    tämän moduulin tavalliseen <script>-lohkoon, ja import.meta
 *    tavallisessa skriptissä on jäsennysvirhe — koko yhden tiedoston
 *    versio jäisi käynnistymättä, ei vain radio.
 *
 * Jos tyylilinkkiä ei löydy, tyyli jätetään lataamatta. Se on juuri
 * yhden tiedoston versio, jossa tyylit on jo upotettu sivuun eikä
 * erillisiä css-tiedostoja ole olemassakaan.
 */
function lataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('radio.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/** Pieni apuri: elementti luokalla ja tekstillä. */
function osa(tagi, luokka, teksti = '') {
  const solmu = document.createElement(tagi);
  if (luokka) solmu.className = luokka;
  if (teksti) solmu.textContent = teksti;
  return solmu;
}

/**
 * Merkkilamppu: kromattu rengas, kupera punainen lasi ja hehku.
 *
 * Omistaja: "Punainen nappi saisi olla myös isompi, sellainen, jossa on
 * lasikupu päällä ja joka loistaa valoa hieman ympäristöön."
 *
 * Hehku on radiaalinen liukuväri kotelon päällä lasin ympärillä, ei
 * suodatin eikä box-shadow'n sumennus: iOS piirtää sumennetun varjon
 * omalle pinnalleen, ja kartan päällä se maksaa kuvataajuutta. Lasin
 * kuperuus on sama temppu kuin joen uomassa kartalla — vaalea kohokohta
 * ylävasemmalle, tumma reuna alaoikealle — ja ne ovat CSS:ssä
 * (css/radio.css), koska tila vaihtaa niitä.
 */
function teeLamppu() {
  const lamppu = document.createElement('button');
  lamppu.type = 'button';
  lamppu.className = 'radio-lamppu';
  lamppu.title = 'Keskeytä lähetys';
  lamppu.setAttribute('aria-label', 'Keskeytä lähetys');
  lamppu.setAttribute('aria-pressed', 'false');
  lamppu.append(
    osa('span', 'radio-lamppu-hehku'),
    osa('span', 'radio-lamppu-kehys'),
    osa('span', 'radio-lamppu-lasi'),
  );
  return lamppu;
}

function ero(a, b, laudanLeveys) {
  let dx = b.x - a.x;
  if (laudanLeveys > 0) {
    dx = ((dx % laudanLeveys) + laudanLeveys) % laudanLeveys;
    if (dx > laudanLeveys / 2) dx -= laudanLeveys;
  }
  const dy = b.y - a.y;
  return { dx, matka: Math.hypot(dx, dy) };
}

/**
 * Rakentaa radiosoittimen ja palauttaa sen ohjaimen.
 *
 * Valinnat:
 *   onStop()               — soittokytkin käännettiin alas; kutsuja pysäyttää äänen.
 *   onSulje()              — virtakytkin käännettiin off-asentoon. Kutsuja
 *                            sulkee koko radiotilan. Jos tätä ei anneta,
 *                            laite vain katoaa näkyvistä eikä muuta tapahdu
 *                            — soitin ei tunne radiotilaa eikä saa arvata
 *                            sitä (ks. tiedoston alku: ei js/ui.js:ää).
 *   onAani(arvo)           — äänenvoimakkuus 0–1 muuttui.
 *   onTauko(paalle)        — merkkivaloa napautettiin. true = lähetys
 *                            keskeytetään, false = jatketaan. Soitin
 *                            hoitaa vain valon ja nappitilan; itse
 *                            toiston pysäyttäminen on kutsujan työ.
 *   onValitseKaupunki(id)  — asteikolta valittiin kaupunki tai soittokytkin
 *                            käännettiin ylös. Kutsuja soittaa kanavan.
 *   onAikakatkaisu()       — viritys kesti liian kauan; kutsuja sulkee virran.
 *   kaupungit              — asteikon aineisto: [{ id, nimi, x, y }] niistä
 *                            kaupungeista, JOILLA ON KANAVA. Soitin ei
 *                            tarkista kanavia; kutsuja suodattaa listan.
 *   kaikkiKaupungit        — [{ id, x, y }] kaikista laudan kaupungeista.
 *                            Valinnainen; tarvitaan vain siihen, että
 *                            pelaajan sijainti kanavattomassa kaupungissa
 *                            löytää lähimmän kanavakaupungin.
 *   laudanLeveys           — laudan leveys yksiköissä, jos lauta kiertää
 *                            ympäri. 0 = ei kiertoa.
 *   sijainti               — pelaajan kaupungin tunnus. Asteikko keskittyy
 *                            tähän, kun mitään ei soi.
 *   viritysAika            — aikakatkaisu millisekunteina (oletus 12 s).
 *   aani                   — aloitusäänenvoimakkuus 0–1 (oletus 0,8).
 *   arvonta                — satunnaislähde nauhan nykäisyille (oletus
 *                            Math.random). Vain testejä ja demoja varten:
 *                            siemennetty lähde antaa saman liikkeen
 *                            joka kerta, ks. arvoNykaisyt.
 *
 * Palauttaa:
 *   juuri                  — elementti, jonka kutsuja liittää haluamaansa
 *                            paikkaan (soitin asemoi itsensä alalaitaan).
 *   naytaKanava(tiedot)    — { asema, maa, kaupunki, cityId, naytto } tai null.
 *                            `naytto` on valinnainen lyhennetty nimi
 *                            pistenäytölle, ks. rivit(). `cityId` keskittää
 *                            asteikon soivaan kaupunkiin.
 *   asetaTila(tila, viesti)
 *   asetaVirityksenVaihe(vaihe) — 'siirtyma' | 'haku' | 'lukittuu' | null.
 *                            Kertoo nauhalle, MITEN uudelle asemalle
 *                            siirrytään. Ks. VIRITYKSEN_VAIHEET.
 *   asetaNaytto(elementti) — pistematriisinäyttö aukkoon.
 *   asetaAani(arvo)
 *   asetaTauko(paalle)     — merkkivalon taukotila ulkoapäin.
 *   asetaKaupungit(lista, { laudanLeveys, sijainti })
 *   asetaSijainti(cityId)
 *   poista()
 */
export function teeRadiosoitin({
  onStop = null,
  onSulje = null,
  onAani = null,
  onTauko = null,
  onValitseKaupunki = null,
  onAikakatkaisu = null,
  kaupungit = [],
  kaikkiKaupungit: kaikkiAlussa = null,
  laudanLeveys = 0,
  sijainti = null,
  viritysAika = VIRITYKSEN_AIKAKATKAISU_MS,
  aani = 0.8,
  arvonta = Math.random,
} = {}) {
  lataaTyyli();
  const tunniste = `radio-${(tunnusLaskuri += 1)}`;

  const juuri = osa('div', 'radiosoitin');
  juuri.dataset.tila = 'sammuksissa';
  juuri.dataset.virta = 'on';
  // Soitin on laite eikä ilmoitus: ruudunlukija saa kertoa sen sisällön
  // pyydettäessä, mutta tilamuutokset luetaan vain tilarivistä (alla).
  juuri.setAttribute('role', 'group');
  juuri.setAttribute('aria-label', 'Maailmanradio');

  const kotelo = osa('div', 'radio-kotelo');
  juuri.appendChild(kotelo);

  /*
   * ÄÄNENVOIMAKKUUDEN NUPPI POISTETTU (omistajan päätös 4.8.2026:
   * "jätä äänenvoimakkuuden säätönappi pois, se on turha").
   *
   * Se oli turha kahdesta syystä. Pelissä on jo oma äänisäätönsä
   * (js/sound.js), johon radio tottelee, ja laitteen oma nuppi
   * tarjosi toisen totuuden samasta asiasta. Toiseksi se vei tilaa
   * juuri siitä laidasta, jossa kytkimet ja merkkivalo tarvitsevat
   * ilmaa.
   *
   * asetaAani() ja onAani jäävät rajapintaan: kutsuja säätää
   * voimakkuutta yhä, mutta laitteessa ei ole sille kahvaa. Sama
   * arvo ohjaa yhä soittoa.
   */

  // --- keskiö: näyttö, asteikko ja kanavan tiedot ----------------------
  const keskio = osa('div', 'radio-keskio');
  kotelo.appendChild(keskio);

  const naytonKehys = osa('div', 'radio-naytto-kehys');
  const naytto = osa('div', 'radio-naytto');
  /*
   * Aukko on toisen tekijän. Nämä kaksi tietoa ovat sen rajapinta:
   * data-tila kertoo mitä laite tekee ja data-rivit mitä siinä lukee.
   * Lisäksi jokaisesta muutoksesta lähtee tapahtuma 'radio-naytto',
   * jotta näytön ei tarvitse tarkkailla attribuutteja.
   */
  naytto.dataset.tila = 'sammuksissa';
  const naytonVara = osa('div', 'radio-naytto-vara');
  const varaYla = osa('span', 'radio-naytto-rivi radio-naytto-yla');
  const varaAla = osa('span', 'radio-naytto-rivi radio-naytto-ala');
  naytonVara.append(varaYla, varaAla);
  naytto.appendChild(naytonVara);
  naytonKehys.appendChild(naytto);

  // Merkkivalo on tieto eikä koriste: se palaa vain kun ääntä todella
  // tulee, joten pelaaja erottaa soivan laitteen viritettävästä.
  const lamppu = teeLamppu();
  naytonKehys.appendChild(lamppu);

  /*
   * Merkkivalo on myös TAUKONAPPI. Se on laitteen ainoa käyttökytkin:
   * VU-mittari, kaiutinsäleikkö ja kaksi vipukytkintä poistettiin, jotta
   * kotelo mahtuu iPhonen ruudulle. Radiotila suljetaan varusteista,
   * kuten muutkin linssit.
   *
   * TAUKO EIKÄ MYKISTYS. Ensin tämä säätikin vain äänenvoimakkuuden
   * nollaan, ja omistaja raportoi ettei se toimi: "Sitä painamalla
   * lähetys pitäisi mennä tauko tilaan. Se ei vielä toimi." Vaimennus
   * kulkee soivan kanavan tilakoneen läpi (js/linssit/radio.js
   * paivitaAanenvoimakkuus kirjoittaa voimakkuuden VAIN lukittuneelle
   * ja häivyttämättömälle asemalle), joten se putosi hiljaa aina kun
   * jokin oli kesken. `audio.pause()` ei kysy keneltäkään.
   *
   * Ja se on myös oikea toiminto: mykistetty suora lähetys jatkaa
   * juoksemistaan, eli kuluttaa dataa ja karkaa siitä kohdasta, johon
   * kuuntelija sen jätti.
   */
  function asetaTauko(paalle) {
    juuri.dataset.tauko = paalle ? 'on' : 'off';
    lamppu.setAttribute('aria-pressed', String(Boolean(paalle)));
    lamppu.title = paalle ? 'Jatka lähetystä' : 'Keskeytä lähetys';
    lamppu.setAttribute('aria-label', lamppu.title);
  }
  asetaTauko(false);
  lamppu.addEventListener('click', () => {
    const uusi = juuri.dataset.tauko !== 'on';
    asetaTauko(uusi);
    try {
      onTauko?.(uusi);
    } catch (syy) {
      console.warn('Radion taukotilan välitys epäonnistui.', syy);
    }
  });
  keskio.appendChild(naytonKehys);

  // --- asteikko: soiva kaupunki keskellä, naapurit molemmin puolin -----
  const asteikko = osa('div', 'radio-asteikko');
  asteikko.setAttribute('role', 'group');
  asteikko.setAttribute('aria-label', 'Viritysasteikko: naapurikaupunkien kanavat');
  const nimet = osa('div', 'radio-kaupungit');
  asteikko.appendChild(nimet);
  const viisari = osa('div', 'radio-viisari');
  viisari.setAttribute('aria-hidden', 'true');
  viisari.style.left = '50%';
  asteikko.appendChild(viisari);
  keskio.appendChild(asteikko);

  // --- kanavan tiedot ruudunlukijalle ----------------------------------
  /*
   * Omistaja 4.8.2026: "ota alareunan selventävä teksti pois." Rivi
   * kertoi saman kuin näyttö ja asteikko, eli oli toistoa — mutta
   * NÄYTTÖÄ RUUDUNLUKIJA EI OSAA LUKEA. Se on pisteistä piirretty SVG,
   * ja asteikko on nappirivi. Siksi rivi on yhä olemassa mutta
   * visuaalisesti piilotettu (css/radio.css .radio-kanava): silmä ei näe
   * sitä, aria-live kertoo sen.
   */
  const tiedot = osa('p', 'radio-kanava');
  tiedot.setAttribute('aria-live', 'polite');
  const asemaNimi = osa('span', 'radio-asema');
  const erotin = osa('span', 'radio-erotin');
  const maaNimi = osa('span', 'radio-maa');
  tiedot.append(asemaNimi, erotin, maaNimi);
  keskio.appendChild(tiedot);

  /*
   * Erotin kahden span-elementin väliin.
   *
   * Ilman sitä ruudunlukija latoo tekstit kiinni toisiinsa: rivi kuului
   * "France InterVirittää" (mitattu ruudulta 4.8.2026), koska
   * elementtien välissä ei ole välilyöntiä eikä rivinvaihtoa — ja rivi
   * on visuaalisesti piilotettu, joten virhe ei näy silmällä lainkaan.
   * Erotin syntyy vain kun molemmilla puolilla on tekstiä; muuten
   * pelkän aseman perään jäisi lukeva viiva.
   */
  function tahdistaErotin() {
    erotin.textContent = asemaNimi.textContent && maaNimi.textContent ? ' — ' : '';
  }

  // --- tila ------------------------------------------------------------
  let nykyinenTila = 'sammuksissa';
  let nykyinenKanava = null;
  let vahti = 0;
  let aaniArvo = Math.min(1, Math.max(0, Number(aani) || 0));
  // Asetetun näytön oma kirjoitusfunktio, jos sellainen annettiin.
  let naytonKirjoitin = null;
  // Asteikon aineisto: id → { id, nimi, x, y }. Vain kanavalliset kaupungit.
  let asteikonKaupungit = new Map();
  /*
   * Kaikki kaupungit — myös kanavattomat — pelkkinä koordinaatteina.
   *
   * Tarvitaan vain siihen, että pelaajan oma sijainti osaa löytää
   * lähimmän KANAVALLISEN kaupungin silloin, kun pelaaja seisoo
   * kaupungissa, jolla ei ole asemaa. Kutsuja saa jättää listan
   * antamatta; silloin keskus haetaan kanavakaupunkien painopisteestä.
   */
  let kaikkiKaupungit = new Map();
  let kierto = Math.max(0, Number(laudanLeveys) || 0);
  let pelaajanPaikka = sijainti ?? null;
  // Asteikon keskimmäinen kaupunki. Se on soittokytkimen oletusvalinta:
  // ylös käännetty kytkin soittaa sen, mihin viisari osoittaa.
  let keskusId = null;
  /*
   * Viimeksi viritetty kaupunki. Pysäytetty radio EI SIIRRÄ VIISARIA:
   * oikeassa laitteessa asteikko jää siihen, mihin se on viritetty, ja
   * virran kytkeminen takaisin jatkaa samalta asemalta. Ilman tätä stop
   * heittäisi asteikon takaisin pelaajan kotikaupunkiin, ja juuri
   * kuunneltu naapuri katoaisi näkyvistä.
   */
  let viimeisinKeskus = null;
  // Virityksen vaihe ja nauhan liukumatka pikseleinä, ks. laskeLiuku ja
  // asetaVirityksenVaihe. Molemmat ovat merkityksellisiä vain
  // 'virittaa'-tilassa.
  let virityksenVaihe = null;
  let liuunMatka = 0;

  /** Katkaisee viritysvahdin. Kutsutaan jokaisessa tilanvaihdossa. */
  function nollaaVahti() {
    if (!vahti) return;
    clearTimeout(vahti);
    vahti = 0;
  }

  /** Kertoo näytölle mitä siinä lukee — sekä attribuutteina että tapahtumana. */
  function paivitaNaytto(tila, rivit) {
    const [yla, ala] = rivit;
    naytto.dataset.tila = tila;
    naytto.dataset.rivit = JSON.stringify([yla, ala]);
    varaYla.textContent = yla;
    varaAla.textContent = ala;
    try {
      naytonKirjoitin?.([yla, ala]);
    } catch (syy) {
      // Rikkinäinen näyttö ei saa kaataa soitinta: laite jää näyttämään
      // vanhaa tekstiä, mutta kytkimet toimivat yhä.
      console.warn('Radion näytön kirjoitus epäonnistui.', syy);
    }
    naytto.dispatchEvent(new CustomEvent('radio-naytto', {
      bubbles: false,
      detail: { tila, rivit: [yla, ala] },
    }));
  }

  /** Näytön rivit nykytilalle ja -kanavalle. */
  function rivit(tila) {
    const pohja = TILAN_RIVIT[tila] ?? TILAN_RIVIT.sammuksissa;
    /*
     * `naytto` on kutsujan lyhentämä, pistenäytölle kelpaava versio
     * aseman nimestä; `asema` on nimi sellaisenaan. Ne eroavat, koska
     * ne menevät eri paikkoihin: kotelon tekstirivi osaa kreikkalaiset
     * ja kyrilliset kirjaimet, 5 × 7 -pisteruudukko ei. Kumpi tahansa
     * kelpaa yksinään — kutsuja saa jättää `nayton` antamatta.
     */
    const asema = (nykyinenKanava?.naytto ?? nykyinenKanava?.asema ?? '').toUpperCase();
    const paikka = [nykyinenKanava?.kaupunki, nykyinenKanava?.maa]
      .filter(Boolean).join(' · ').toUpperCase();
    if (tila === 'soi') return [asema || 'SUORA LÄHETYS', paikka];
    if (tila === 'virittaa') return [pohja[0], asema];
    if (tila === 'virhe') return [pohja[0], asema || pohja[1]];
    return pohja;
  }

  /*
   * ASTEIKON NAAPURIT.
   *
   * Keskus on soiva kaupunki. Jos mitään ei soi, keskukseksi otetaan
   * pelaajan sijainti — ja jos sitäkään ei tiedetä, kanavakaupunkien
   * keskikohtaa lähinnä oleva kaupunki. Tyhjä asteikko olisi tässä pahin
   * vaihtoehto: laite näyttäisi rikkinäiseltä juuri sillä hetkellä, kun
   * pelaaja avaa sen ensimmäisen kerran eikä ole vielä valinnut mitään.
   *
   * Puolet ratkaisee etumerkillinen dx: lännessä olevat vasemmalle,
   * idässä olevat oikealle. Näin asteikko vastaa karttaa — vasemmalle
   * painamalla siirrytään länteen — ja kiertävällä laudalla suunta on
   * lyhintä matkaa pitkin (ks. ero()).
   *
   * Jos toisella puolella ei ole tarpeeksi kaupunkeja (Uusi-Seelanti,
   * Islanti), vajaa puoli täytetään lähimmillä jäljelle jääneillä. Puoli
   * jää silloin väärälle ilmansuunnalle, mutta täysi asteikko ja
   * napautettavat naapurit ovat tärkeämpiä kuin täydellinen kompassi.
   */
  function laskeKeskus() {
    if (nykyinenKanava?.cityId && asteikonKaupungit.has(nykyinenKanava.cityId)) {
      return nykyinenKanava.cityId;
    }
    if (viimeisinKeskus && asteikonKaupungit.has(viimeisinKeskus)) return viimeisinKeskus;
    if (pelaajanPaikka && asteikonKaupungit.has(pelaajanPaikka)) return pelaajanPaikka;
    if (asteikonKaupungit.size === 0) return null;

    // Pelaajan sijainti voi olla kaupunki ilman kanavaa; silloin
    // keskukseksi kelpaa sitä lähin kanavakaupunki. Ilman sijaintiakin
    // jokin keskus on parempi kuin ei mitään, joten viimeinen vara on
    // aineiston oma painopiste.
    const kaikki = [...asteikonKaupungit.values()];
    const kohde = (pelaajanPaikka && kaikkiKaupungit.get(pelaajanPaikka)) ?? {
      x: kaikki.reduce((s, k) => s + k.x, 0) / kaikki.length,
      y: kaikki.reduce((s, k) => s + k.y, 0) / kaikki.length,
    };
    let paras = null;
    let parasMatka = Infinity;
    for (const kaupunki of kaikki) {
      const { matka } = ero(kohde, kaupunki, kierto);
      if (matka < parasMatka) { parasMatka = matka; paras = kaupunki; }
    }
    return paras?.id ?? null;
  }

  /** Naapurit puolittain: { vasen: [...], keski, oikea: [...] }. */
  function naapurit(keskus) {
    const tyhja = { vasen: [], keski: null, oikea: [] };
    const kohde = asteikonKaupungit.get(keskus);
    if (!kohde) return tyhja;

    const muut = [];
    for (const kaupunki of asteikonKaupungit.values()) {
      if (kaupunki.id === keskus) continue;
      muut.push({ kaupunki, ...ero(kohde, kaupunki, kierto) });
    }
    muut.sort((a, b) => a.matka - b.matka);

    const vasen = [];
    const oikea = [];
    const yli = [];
    for (const kohta of muut) {
      if (vasen.length >= NAAPUREITA_PER_PUOLI && oikea.length >= NAAPUREITA_PER_PUOLI) break;
      const puoli = kohta.dx < 0 ? vasen : oikea;
      if (puoli.length < NAAPUREITA_PER_PUOLI) puoli.push(kohta.kaupunki);
      else yli.push(kohta.kaupunki);
    }
    // Vajaa puoli täydennetään lähimmistä ylijääneistä, ks. yllä.
    while (vasen.length < NAAPUREITA_PER_PUOLI && yli.length) vasen.push(yli.shift());
    while (oikea.length < NAAPUREITA_PER_PUOLI && yli.length) oikea.push(yli.shift());

    // Vasemmalla lähin on keskustaa vasten eli listan loppuun.
    vasen.reverse();
    return { vasen, keski: kohde, oikea };
  }

  /** Yksi asteikon nimi: nappi, joka vaihtaa kanavan välittömästi. */
  function asteikonNappi(kaupunki, puoli, sija) {
    const nappi = document.createElement('button');
    nappi.type = 'button';
    nappi.className = 'radio-kaupunki';
    // Tunnus talteen myös DOM:iin: liu'un matka mitataan nimien
    // paikoista ennen ja jälkeen uudelleenpiirron (ks. laskeLiuku).
    nappi.dataset.id = String(kaupunki.id);
    nappi.dataset.puoli = puoli;
    nappi.dataset.sija = String(sija);
    nappi.textContent = String(kaupunki.nimi ?? kaupunki.id).toUpperCase();
    nappi.setAttribute('aria-label', `Viritä kanava: ${kaupunki.nimi ?? kaupunki.id}`);
    if (puoli === 'keski') nappi.setAttribute('aria-current', 'true');
    nappi.addEventListener('click', () => valitseKaupunki(kaupunki.id));
    return nappi;
  }

  /**
   * Siirtää viisarin keskimmäisen nimen kohdalle.
   *
   * Paikka MITATAAN eikä lasketa prosenttina. Nimet ovat eri levyisiä
   * ("OSLO" ja "SANKT PETERBURG"), joten tasavälinen jako osuisi
   * keskimmäisen nimen viereen eikä sen päälle — ja viisari, joka on
   * nimen vieressä, näyttää siltä että laite on viritetty väärin.
   * Mittaus tehdään kerran nimien vaihtuessa ja kotelon leveyden
   * muuttuessa, ei kehyksittäin.
   */
  function siirraViisari() {
    const keski = nimet.querySelector('.radio-kaupunki[data-puoli="keski"]');
    const leveys = asteikko.offsetWidth;
    if (!keski || !leveys) { viisari.style.left = '50%'; return; }
    const kohta = keski.offsetLeft + keski.offsetWidth / 2;
    viisari.style.left = `${Math.min(99, Math.max(1, (kohta / leveys) * 100))}%`;
  }

  /**
   * Nimien keskikohdat asteikolla juuri nyt: id → x pikseleinä.
   *
   * Mitataan ENNEN uudelleenpiirtoa, koska juuri siitä liu'un matka
   * syntyy: uusi keskus oli hetki sitten jossain, ja nauhan on
   * liu'uttava tuosta kohdasta viisarin alle.
   */
  function nimienPaikat() {
    const paikat = new Map();
    for (const nappi of nimet.querySelectorAll('.radio-kaupunki')) {
      paikat.set(nappi.dataset.id, nappi.offsetLeft + nappi.offsetWidth / 2);
    }
    return paikat;
  }

  /**
   * Liu'un matka pikseleinä: mistä nauha lähtee, kun se päätyy nollaan.
   *
   * Etumerkki on nauhan suunta eikä aseman: idässä oleva asema on
   * viisarin oikealla puolella, joten nauha ALKAA oikealta (+) ja
   * liukuu vasemmalle nollaan. Sama luku syntyy molemmista säännöistä,
   * joten mitatun ja arvatun matkan välillä ei ole suuntaeroa.
   */
  function laskeLiuku(vanhatPaikat, vanhaKeskus, uusiKeskus) {
    if (!uusiKeskus) return 0;
    /*
     * Uusi paikka luetaan samasta taulukosta kuin vanha eikä
     * valitsimella. CSS.escape olisi lyhyempi, mutta kaupungin tunnus
     * tulee laudan aineistosta — merkkijonosta, jota tämä tiedosto ei
     * ole kirjoittanut — eikä valitsimen jäsennysvirhe saa kaataa koko
     * asteikon piirtoa yhden liu'un takia.
     */
    const uusiX = nimienPaikat().get(uusiKeskus) ?? null;
    // 1. Uusi asema näkyi nauhalla: matka on mitattavissa suoraan.
    const vanhaX = vanhatPaikat.get(uusiKeskus);
    if (Number.isFinite(vanhaX) && Number.isFinite(uusiX)) {
      const matka = vanhaX - uusiX;
      if (Math.abs(matka) >= LIUUN_VAHIN) return matka;
      // Sama tai lähes sama paikka: nytkähdys, ks. LIUUN_VAHIN.
      return matka < 0 ? -LIUUN_VAHIN : LIUUN_VAHIN;
    }
    // 2. Kartalta valittu kaupunki: suunta laudalta, matka vakio.
    const varamatka = Math.max(LIUUN_VAHIN, asteikko.offsetWidth * LIUUN_VARAMATKA);
    const vanha = asteikonKaupungit.get(vanhaKeskus);
    const uusi = asteikonKaupungit.get(uusiKeskus);
    if (!vanha || !uusi) return varamatka;
    // dx > 0 = uusi asema on idässä eli viisarin oikealla puolella.
    return ero(vanha, uusi, kierto).dx < 0 ? -varamatka : varamatka;
  }

  /** Piirtää asteikon uudelleen nykyiselle keskukselle. */
  function paivitaAsteikko() {
    const vanhatPaikat = nimienPaikat();
    const vanhaKeskus = keskusId;
    keskusId = laskeKeskus();
    if (keskusId) viimeisinKeskus = keskusId;
    const { vasen, keski, oikea } = naapurit(keskusId);
    nimet.replaceChildren();
    vasen.forEach((kaupunki, i) => {
      nimet.appendChild(asteikonNappi(kaupunki, 'vasen', vasen.length - i));
    });
    if (keski) nimet.appendChild(asteikonNappi(keski, 'keski', 0));
    oikea.forEach((kaupunki, i) => {
      nimet.appendChild(asteikonNappi(kaupunki, 'oikea', i + 1));
    });
    // Viisari piiloon, jos asteikolla ei ole yhtään nimeä: yksinäinen
    // punainen viiva tyhjällä pergamentilla näyttää vialta.
    viisari.hidden = !keski;
    siirraViisari();
    /*
     * Liu'un matka talteen, käytettäköön tai ei. Se on laskettava
     * TÄSSÄ, koska vanhat paikat ovat olemassa vain tämän kutsun ajan;
     * 'siirtyma'-vaihe saapuu vasta seuraavalla rivillä radio.js:ssä,
     * jolloin vanha asettelu on jo poissa. Ilman kanavanvaihtoa
     * tehdyssä piirrossa (laudan vaihto, sijainnin päivitys) luku jää
     * käyttämättä eikä nauha liiku.
     */
    liuunMatka = laskeLiuku(vanhatPaikat, vanhaKeskus, keskusId);
  }

  /**
   * VIRITYKSEN VAIHE KUORELLE. Kutsuu js/linssit/radio.js, ks.
   * VIRITYKSEN_VAIHEET.
   *
   * Kaikki liike on css/radio.css:ssä; täällä kerrotaan vain, mikä
   * vaihe on menossa (juuren data-vaihe) ja mistä kohtaa nauha lähtee
   * tai mihin se jää (kaksi mukautettua ominaisuutta). Sama työnjako
   * kuin muuallakin laitteessa: JS tietää tilan, CSS tietää miltä se
   * näyttää.
   *
   * null lopettaa sarjan. Sen tekee asetaTila() itse aina kun laite
   * poistuu 'virittaa'-tilasta — kuori ei jää heilumaan siksi, että
   * kutsuja unohti kertoa lopusta.
   */
  function asetaVirityksenVaihe(vaihe) {
    const uusi = VIRITYKSEN_VAIHEET.includes(vaihe) ? vaihe : null;
    if (!uusi) {
      virityksenVaihe = null;
      delete juuri.dataset.vaihe;
      return null;
    }

    if (uusi === 'siirtyma') {
      // Nauha lähtee sieltä, missä uusi asema äsken oli (laskeLiuku), ja
      // päätyy nollaan eli viisarin alle.
      juuri.style.setProperty('--radio-liuku', `${Math.round(liuunMatka)}px`);
      /*
       * Nykäisyt arvotaan JOKA LIUULLE UUDELLEEN: sama ote kahdesti
       * peräkkäin ei ole käden liikettä vaan silmukka. Pehmennin on
       * mukautetussa ominaisuudessa, jotta liu'un kesto ja avainkehykset
       * pysyvät css/radio.css:n omina, ks. NYKAISYN_RAJAT.
       */
      juuri.style.setProperty('--radio-liuku-kaari', nykaisyKaari(arvonta));
    } else if (uusi === 'lukittuu') {
      /*
       * Asettuminen alkaa siitä, mihin haku sattui jäämään. Ilman
       * mittausta nauha napsahtaisi ensin nollaan ja vasta sitten
       * "asettuisi" — eli tekisi juuri sen nykäisyn, jonka poistamiseksi
       * koko vaihe on olemassa.
       */
      const lahto = nauhanSiirto();
      juuri.style.setProperty('--radio-lukko', `${lahto}px`);
      // Viimeinen kohdistus käy hitusen yli ja palaa, ks. lukonYlitys.
      juuri.style.setProperty('--radio-lukko-yli', `${lukonYlitys(lahto, arvonta)}px`);
    }

    /*
     * SAMA VAIHE UUDELLEEN ON KÄYNNISTETTÄVÄ KÄSIN. Kesken virityksen
     * valittu uusi kaupunki aloittaa sarjan alusta ('siirtyma' →
     * 'siirtyma'), eikä selain käynnistä animaatiota uudelleen, jos
     * valitsin ja animaation nimi pysyvät samoina — nauha jäisi
     * liukumaan vanhaa matkaansa loppuun uudella nimistöllä. Poisto,
     * pakotettu asettelunluku ja palautus on ainoa tapa, joka toimii
     * kaikissa selaimissa. Hinta on yksi asettelu kanavanvaihtoa kohti,
     * ja sellainen tehdään tässä samassa silmänräpäyksessä jo muutenkin
     * (siirraViisari mittaa nimien paikat).
     */
    if (virityksenVaihe === uusi) {
      nimet.style.animation = 'none';
      void nimet.offsetWidth;
      nimet.style.animation = '';
    }
    virityksenVaihe = uusi;
    juuri.dataset.vaihe = uusi;
    return uusi;
  }

  /**
   * Nauhan nykyinen vaakasiirto pikseleinä.
   *
   * Matriisi luetaan merkkijonosta eikä DOMMatrixilla: kysely tehdään
   * kerran virityksessä, ja käsin poimittu neljäs luku toimii myös
   * niissä selaimissa, joissa DOMMatrixia ei ole. Tunnistamaton muoto
   * on nolla — silloin asettuminen alkaa keskeltä, mikä on väärin mutta
   * vain hiuksenhienosti.
   */
  function nauhanSiirto() {
    const muunnos = getComputedStyle(nimet).transform;
    if (!muunnos || muunnos === 'none') return 0;
    const luvut = muunnos.slice(muunnos.indexOf('(') + 1, -1).split(',').map(Number);
    // matrix(a, b, c, d, tx, ty) ja matrix3d(...): tx on kuudes tai 13.
    const tx = luvut.length === 6 ? luvut[4] : luvut[12];
    return Number.isFinite(tx) ? Math.round(tx * 10) / 10 : 0;
  }

  /** Asteikolta valittu kaupunki: kutsuja soittaa, laite ei. */
  function valitseKaupunki(cityId) {
    if (!cityId) return;
    try {
      onValitseKaupunki?.(cityId);
    } catch (syy) {
      console.warn('Radiosoittimen kanavavalinnan välitys epäonnistui.', syy);
    }
  }

  /**
   * Vaihtaa tilan. viesti korvaa näytön alarivin, kun kutsujalla on
   * tarkempi syy kerrottavana ("VERKKO POIKKI", "ASEMA EI VASTAA").
   */
  function asetaTila(tila, viesti = '') {
    const uusi = RADION_TILAT.includes(tila) ? tila : 'sammuksissa';
    nollaaVahti();
    nykyinenTila = uusi;
    juuri.dataset.tila = uusi;
    /*
     * Vaihesarja päättyy tilan mukana. Kutsuja kertoo alun ja keskikohdan
     * (radio.js kerroVaihe) mutta ei loppua — lopun tietää tila, ja se on
     * oikea paikka: keskeytynyt viritys, virhe ja aikakatkaisu päättyvät
     * kaikki tänne, eikä yhdenkään varassa saa olla, että joku muistaa
     * sammuttaa nauhan liikkeen erikseen.
     */
    if (uusi !== 'virittaa') asetaVirityksenVaihe(null);

    const nayta = rivit(uusi);
    if (viesti) nayta[1] = String(viesti).toUpperCase();
    paivitaNaytto(uusi, nayta);

    /*
     * Ruudunlukijalle tila sanoin. Rivi on visuaalisesti piilotettu,
     * joten tämä on ainoa paikka, josta ruudunlukija saa tilan.
     */
    if (uusi === 'virittaa') maaNimi.textContent = 'Virittää…';
    else if (uusi === 'virhe') maaNimi.textContent = viesti ? String(viesti) : 'Asemaa ei kuulu';
    else if (uusi === 'sammuksissa') maaNimi.textContent = 'Valitse kaupunki kartalta';
    else maaNimi.textContent = [nykyinenKanava?.kaupunki, nykyinenKanava?.maa]
      .filter(Boolean).join(' · ');
    tahdistaErotin();

    if (uusi === 'virittaa' && viritysAika > 0) {
      vahti = setTimeout(() => {
        vahti = 0;
        // Rehellinen loppu ikuiselle odotukselle: laite kertoo ettei
        // asema vastaa, ja kutsuja saa sulkea virran omalta puoleltaan.
        asetaTila('virhe', 'Asema ei vastaa');
        try {
          onAikakatkaisu?.();
        } catch (syy) {
          console.warn('Radiosoittimen aikakatkaisun käsittely epäonnistui.', syy);
        }
      }, viritysAika);
    }
    return uusi;
  }

  /**
   * Näyttää kanavan tiedot. null tyhjentää.
   *
   * Tilaa tämä ei vaihda: kutsuja tietää, onko ääni jo käynnissä vai
   * vasta viritettävänä, eikä soittimen pidä arvata sitä.
   */
  function naytaKanava(kanava) {
    nykyinenKanava = kanava && typeof kanava === 'object' ? kanava : null;
    asemaNimi.textContent = nykyinenKanava?.asema ?? '';
    // Asteikko keskittyy soivaan kaupunkiin: uusi kanava on aina
    // keskellä ja sen naapurit heti valittavissa (omistajan toive).
    paivitaAsteikko();
    // Sama tila uudelleen kirjoittaa näytön ja tekstirivin tuoreilla tiedoilla.
    const nayta = rivit(nykyinenTila);
    paivitaNaytto(nykyinenTila, nayta);
    if (nykyinenTila === 'soi' || nykyinenTila === 'virittaa') {
      maaNimi.textContent = nykyinenTila === 'virittaa'
        ? 'Virittää…'
        : [nykyinenKanava?.kaupunki, nykyinenKanava?.maa].filter(Boolean).join(' · ');
    }
    tahdistaErotin();
    return nykyinenKanava;
  }

  /** Asteikon aineisto. Kutsuja antaa vain kanavalliset kaupungit. */
  function asetaKaupungit(lista = [], asetukset = {}) {
    asteikonKaupungit = new Map();
    for (const kaupunki of lista) {
      if (!kaupunki?.id || !Number.isFinite(kaupunki.x) || !Number.isFinite(kaupunki.y)) continue;
      asteikonKaupungit.set(kaupunki.id, {
        id: kaupunki.id,
        nimi: kaupunki.nimi ?? kaupunki.name ?? kaupunki.id,
        x: kaupunki.x,
        y: kaupunki.y,
      });
    }
    if (Array.isArray(asetukset.kaikki)) {
      kaikkiKaupungit = new Map();
      for (const kaupunki of asetukset.kaikki) {
        if (!kaupunki?.id || !Number.isFinite(kaupunki.x) || !Number.isFinite(kaupunki.y)) continue;
        kaikkiKaupungit.set(kaupunki.id, { id: kaupunki.id, x: kaupunki.x, y: kaupunki.y });
      }
    } else {
      kaikkiKaupungit = asteikonKaupungit;
    }
    if (Number.isFinite(asetukset.laudanLeveys)) {
      kierto = Math.max(0, asetukset.laudanLeveys);
    }
    if ('sijainti' in asetukset) pelaajanPaikka = asetukset.sijainti ?? null;
    paivitaAsteikko();
    return asteikonKaupungit.size;
  }

  /** Pelaajan sijainti: asteikon keskus silloin kun mitään ei soi. */
  function asetaSijainti(cityId) {
    pelaajanPaikka = cityId ?? null;
    if (!nykyinenKanava) paivitaAsteikko();
    return pelaajanPaikka;
  }

  /**
   * Panee pistematriisinäytön aukkoon.
   *
   * Ottaa vastaan kaksi muotoa:
   *   asetaNaytto(elementti)
   *   asetaNaytto({ juuri, naytaTeksti })   — esim. teePistenaytto()
   *
   * Jälkimmäisessä soitin kutsuu naytaTeksti(rivit) itse jokaisessa
   * muutoksessa. Näin kytkentä on yksi rivi eikä kolme, eikä kumpikaan
   * moduuli tunne toista: tunnistus on muodosta, ei tuonnista.
   *
   * ANNETUN NÄYTÖN ON OLTAVA TAUSTATON. Aukko on jo lasi: sillä on
   * nestekidesävy, hieno rasteri ja syvennyksen varjo, ja tilat
   * (sammuksissa, virhe) muuttavat sitä. Jos näyttö tuo oman
   * taustalaattansa, se peittää lasin ja laitteessa on kaksi eri
   * sävyistä ruutua sisäkkäin. Kutsuja antaa siis pistenäytölle
   * `tausta: null, kehys: null` — ks. js/linssit/radio.js.
   *
   * null palauttaa soittimen oman varatekstin — aukko ei saa jäädä
   * tyhjäksi, koska musta kolo näyttää rikkinäiseltä.
   */
  function asetaNaytto(elementti) {
    const solmu = elementti?.juuri ?? elementti;
    naytonKirjoitin = typeof elementti?.naytaTeksti === 'function'
      ? (rivit) => elementti.naytaTeksti(rivit)
      : null;
    naytto.replaceChildren();
    if (solmu) {
      naytto.appendChild(solmu);
      naytto.dataset.oma = 'true';
    } else {
      naytto.appendChild(naytonVara);
      delete naytto.dataset.oma;
    }
    // Uusi näyttö saa heti nykyisen sisällön; muuten se olisi tyhjä
    // siihen asti, kunnes tila sattuu seuraavan kerran vaihtumaan.
    paivitaNaytto(nykyinenTila, rivit(nykyinenTila));
    return naytto;
  }

  /** Äänenvoimakkuus 0–1: nupin asento, aria-arvo ja takaisinkutsu. */
  function asetaAani(arvo, kerro = true) {
    const uusi = Math.min(1, Math.max(0, Number(arvo) || 0));
    aaniArvo = uusi;
    // Nuppi kääntyy ±135°, kuten oikea potentiometri: täysi ympyrä
    // antaisi ymmärtää, että nuppia voi pyörittää loputtomiin.
    // Nuppia ei enää ole; arvo elää vain kutsujan ja soiton välillä.
    if (kerro) {
      try {
        onAani?.(uusi);
      } catch (syy) {
        console.warn('Radiosoittimen äänenvoimakkuuden välitys epäonnistui.', syy);
      }
    }
    return uusi;
  }

  /*
   * Kotelon leveys muuttuu ilman että kanava vaihtuu: ruudun kierto,
   * ikkunan koon muutos, ja ennen kaikkea se hetki, jona CSS piilottaa
   * uloimmat nimet kapealla ruudulla. Silloin keskimmäinen nimi siirtyy
   * ja viisarin on siirryttävä sen mukana. ResizeObserver ei ole
   * jatkuva animaatio: se herää vain kun mitta oikeasti muuttuu.
   */
  const vahtija = typeof ResizeObserver === 'function'
    ? new ResizeObserver(() => siirraViisari())
    : null;
  vahtija?.observe(asteikko);

  /** Sammuttaa vahdin ja irrottaa soittimen sivulta. */
  function poista() {
    nollaaVahti();
    vahtija?.disconnect();
    juuri.remove();
  }

  // Aloitusasento: nuppi paikalleen ilman takaisinkutsua (kutsuja ei ole
  // pyytänyt äänen muutosta, se vain kertoi lähtöarvon), kytkimet alas ja
  // laite pois päältä mutta virta päällä.
  asetaAani(aaniArvo, false);
  asetaKaupungit(kaupungit, {
    laudanLeveys: kierto,
    sijainti: pelaajanPaikka,
    ...(Array.isArray(kaikkiAlussa) ? { kaikki: kaikkiAlussa } : {}),
  });
  naytaKanava(null);
  asetaTila('sammuksissa');

  return {
    juuri,
    naytonAukko: naytto,
    naytaKanava,
    asetaTila,
    asetaVirityksenVaihe,
    asetaNaytto,
    asetaAani,
    // Kutsuja voi nollata taukotilan (esim. kanavan vaihto) ilman että
    // pelaaja on napauttanut valoa; muuten valo jäisi pimeäksi vaikka
    // ääntä tulee.
    asetaTauko,
    asetaKaupungit,
    asetaSijainti,
    poista,
    get tila() { return nykyinenTila; },
    get aani() { return aaniArvo; },
    get keskus() { return keskusId; },
  };
}
