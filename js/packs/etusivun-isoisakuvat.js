/*
 * ETUSIVUN PINON KUVAT (js/etusivupallo.js).
 *
 * Omistaja 5.9.2026 klo 22.45, sanatarkasti: *"isoisän kuvat voivat olla
 * blurrattuja ja haalealla ja jäädä tekstin alle"* ja *"ne voisivat
 * pinoutua hieman sikin sokin toistensa päälle"*.
 *
 * Omistaja 5.9.2026 klo 22.50, sanatarkasti: *"käytetään niitä uusia
 * jotka toivottavasti olet saanut kuvaputkelta, jotka ovat aika
 * vaaleita (vinjetti vaaleaan)"* — siksi haaleus ja sumennus ovat
 * KUVAKOHTAISIA kenttiä eivätkä yhtä CSS-vakiota: vaalea vinjettikuva
 * katoaisi kokonaan samalla peittävyydellä, jolla tumma albumiinivedos
 * on sopivan haalea.
 *
 * KAANON (Raamattu: ISOISA JAA ARVOITUKSEKSI, omistaja 5.9.2026 klo
 * 22.55): pinon kuvat ovat joko isoisän itsensä ottamia näkymiä
 * vuodelta 1873 tai kuvia, joissa hän on mukana muttei hahmotu täysin
 * (selkä, kaukana, vinjetti, liike). Kasvokuvaa ei ole. Siksi
 * KUVATEKSTI ON PAIKKA + VUOSI ("Bombay, 1873"), ei koskaan
 * henkilökuvaus eikä "Isoisä (kuvassa)" — hän vain kävi
 * mielenkiintoisissa paikoissa ja aika vauhdilla. Sumennus ja haaleus
 * tukevat samaa: hahmo ei saa erottua tarkasti.
 *
 * ── MITEN KUVAPUTKEN TOIMITUS LISÄTÄÄN ─────────────────────────────
 *
 * Kuvaputken arviointisivulla odottaa 5.9.2026 kaksitoista kuvaa, joita
 * EI VIELÄ OLE pelin R2-ämpärissä. Kun kuvaputki on toimittanut ne
 * ämpäriin (sama kansio kuin nykyisillä, ISOISAN_KUVAJUURI), lisää
 * jokaisesta tähän tauluun YKSI rivi — muuta ei tarvita, koska
 * js/etusivupallo.js lukee pinon kuvat yksin tästä:
 *
 *   1. `tunnus`     = kuvaputken tunnus SELLAISENAAN
 *                     (esim. 'isoisa-aden-hiilisatama-1873-kuva-v1').
 *   2. `osoite`     = `${ISOISAN_KUVAJUURI}<tunnus>.jpg` — polku
 *                     muodostetaan juuresta, ei koskaan käsin.
 *   3. `kuvateksti` = SANASTA SANAAN paikka + vuosi, esim.
 *                     'Adenin hiilisatama, 1873'. Ei henkilökuvausta.
 *   4. `kaupunki`   = se ETUSIVUN_REITIN jakso, jonka laskeutuessa kuva
 *                     tulee pinoon (js/etusivupallo.js ETUSIVUN_REITTI:
 *                     lontoo, pariisi, kairo, mumbai, kolkata,
 *                     singapore, hongkong, tokio, sanfrancisco,
 *                     newyork). Reitin ulkopuolisella kuvalla kenttä on
 *                     null: se tulee kiertovuorollaan.
 *   5. `savy`       = 'vaalea' kuvaputken uusille (vinjetti vaaleaan)
 *                     ja 'tumma' vanhoille albumiinivedoksille.
 *   6. `rajaus`     = vain jos kuvassa on pahvireunus, joka on
 *                     leikattava pois (mitattu kuvasta, osuuksina).
 *
 * Odottavat tunnukset (kuvaputken arviointisivu 5.9.2026) ja niiden
 * reittijakso, jos sellainen on:
 *
 *   isoisa-aden-hiilisatama-1873-kuva-v1         (ei reitillä)
 *   isoisa-kairo-ezbekiyeh-1873-kuva-v1          kairo
 *   isoisa-galatan-silta-1873-kuva-v1            (ei reitillä)
 *   isoisa-colombo-teeplantaasi-1873-kuva-v1     (ei reitillä)
 *   isoisa-singaporen-satama-1873-kuva-v1        singapore
 *   isoisa-jokohaman-ranta-1873-kuva-v1          tokio
 *   isoisa-sanfrancisco-satama-1873-kuva-v1      sanfrancisco
 *   isoisa-newyork-broadway-1873-kuva-v2         newyork
 *   isoisa-wien-maailmannayttely-1873-kuva-v1    (ei reitillä)
 *   isoisa-kapkaupunki-taffelberg-1873-kuva-v2   (ei reitillä)
 *   isoisa-rio-satama-1873-kuva-v1               (ei reitillä)
 *   isoisa-melbourne-kultakentta-1873-kuva-v1    (ei reitillä)
 */
import { ISOISAN_KUVAJUURI, ISOISAN_VALOKUVAT } from '../isoisan-valokuvat.js';

export { ISOISAN_KUVAJUURI };

/**
 * SÄVYN OLETUKSET. `haalea` on kuvan peittävyys pinossa ja `sumennus`
 * sen sumennus pikseleinä.
 *
 * Tumma albumiinivedos: 0,55 osuu omistajan haarukkaan (noin
 * 0,45–0,55) ja on tarpeeksi haalea, ettei kuva vie huomiota tekstiltä,
 * jonka alle se jää. Vaalea vinjettikuva on jo lähteessään lähes
 * pergamentin sävyinen: samalla peittävyydellä siitä ei näkyisi mitään,
 * joten se saa 0,85 ja kevyemmän sumennuksen (omistaja klo 22.50:
 * *"jotta kuvaputken vaaleat kuvat eivät haalistu liikaa"*).
 */
export const ISOISAKUVAN_SAVYT = {
  tumma: { haalea: 0.55, sumennus: 1.5 },
  vaalea: { haalea: 0.85, sumennus: 1.2 },
};

/**
 * PINON KUVAT LASKEUTUMISJÄRJESTYKSESSÄ. Taulukko on totuus: uusi
 * kuvaputken toimitus lisätään tähän, eikä js/etusivupallo.js:ään
 * kosketa.
 *
 * Nykyiset kaksi ovat kuvaputken aiempia albumiinivedoksia
 * (js/isoisan-valokuvat.js) — samat tiedostot ja sama pahvireunuksen
 * rajaus, mutta kuvateksti on tässä paikka + vuosi, koska etusivun pino
 * ei nimeä isoisää (Raamattu: ISOISA JAA ARVOITUKSEKSI). Lennon
 * valokuvakortilla (js/ui.js) on yhä oma kuvatekstinsä.
 */
export const ETUSIVUN_ISOISAKUVAT = [
  {
    tunnus: 'isoisa-bombay-1873-kulunut-v1',
    osoite: ISOISAN_VALOKUVAT.bombay.osoite,
    kuvateksti: 'Bombay, 1873',
    selite: 'Kulunut valokuva Bombayn satamalaiturilta 1873.',
    kaupunki: 'mumbai',
    savy: 'tumma',
    rajaus: ISOISAN_VALOKUVAT.bombay.rajaus,
  },
  {
    tunnus: 'isoisa-kanton-1873-kulunut-v1',
    osoite: ISOISAN_VALOKUVAT.kanton.osoite,
    kuvateksti: 'Kanton, 1873',
    selite: 'Kulunut valokuva kantonilaisen teehuoneen pöydästä 1873.',
    // Kanton on pelin reitillä lähinnä Hongkongia (ETUSIVUN_REITTI).
    kaupunki: 'hongkong',
    savy: 'tumma',
    rajaus: ISOISAN_VALOKUVAT.kanton.rajaus,
  },
];

/** Kuvan sävyasetukset (kuvakohtainen arvo voittaa sävyn oletuksen). */
export function isoisakuvanSavy(kuva) {
  const oletus = ISOISAKUVAN_SAVYT[kuva?.savy] ?? ISOISAKUVAN_SAVYT.tumma;
  return {
    haalea: Number.isFinite(kuva?.haalea) ? kuva.haalea : oletus.haalea,
    sumennus: Number.isFinite(kuva?.sumennus) ? kuva.sumennus : oletus.sumennus,
  };
}
