/*
 * PARITEETTIAJON RIVIT (tools/pariteetti-ajo.mjs): pariteettitaulun
 * docs/raportit/pariteetti-natiivi-20260924.md rivit 1–41 sekä 12b, 21b ja 21c.
 *
 * Jokainen rivi on SAMA TILA molemmissa: webin näkymä (tools/pariteettikuvat-nakymat.mjs,
 * tallenne siemen 5 Marseillessa) ja natiivin askeleet (Laitetestaajan komentolista
 * proto-3d/lokit/pariteetti-ajo/natiivi-komennot.md 24.9.2026). Taulun Ateena-, Kreikka- ja
 * Tanger-rivit ajetaan Marseillessa ja Ranskassa, jotta kummallakin puolella on sama tallenne.
 *
 *   web       näkymän nimi (pariteettikuvat --nakymat); null = ei web-vastinetta
 *   peli      true = natiivissa tarvitaan käynnissä oleva peli (uusi-peli 5 marseille)
 *   natiivi   askeleet: 'ui:<rivi>' (ui-komento.txt), 'peli:<rivi>' (peli-komento.txt),
 *             'linssi:<rivi>' (linssi-komento.txt), 'odota:<s>'
 *   nollaa    true = rivi muuttaa pelitilaa (matka, kysymys): peli aloitetaan alusta ennen seuraavaa
 *   huom      lyhyt huomautus raporttiin (epävarma komento, hyväksytty ero)
 */
export const KAUPUNKI = 'marseille';
export const SIEMEN = 5;

/** Natiivin alkutila rivien 3–41 edellä (Laitetestaaja: odota-tila Aloitus ennen uusi-peliä). */
export const NATIIVI_ALKU = ['peli:odota-tila Aloitus 30', `peli:uusi-peli ${SIEMEN} ${KAUPUNKI}`, 'peli:odota-tila Kartta 30', 'peli:puhe pois', 'odota:2'];

/** Rivien välissä: kaikki näkymät kiinni (kartta jää). */
export const NATIIVI_SIIVOUS = ['ui:ui linssi sulje', 'ui:ui sulje', 'odota:1'];

export const RIVIT = [
  { rivi: '1', nimi: 'Etusivu / aloitusportti', web: 'aloitusportti', peli: false, natiivi: ['ui:ui aloitus portti', 'odota:3'], huom: 'natiivilla voi olla tallennus (Jatka matkaa)' },
  { rivi: '2', nimi: 'Aloitusvalinta', web: 'aloitusvalinta', peli: false, natiivi: ['ui:ui aloitus valinta', 'odota:3'] },
  { rivi: '3', nimi: 'Kaupunkilehti: kansi', web: 'kaupunkilehti-kansi', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI}`, 'odota:3'] },
  { rivi: '4', nimi: 'Kaupunkilehti: kansi vieritetty (Ennen/Nyt, radio)', web: 'kaupunkilehti-kansi-alas', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI}`, 'odota:3', 'ui:ui lehti vierita 1100', 'odota:1'], huom: 'natiivi vierittää pikseleinä, web ankkurilla' },
  { rivi: '5', nimi: 'Kaupunkilehti: aihesivu 1', web: 'kaupunkilehti-aihe1', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI} 1`, 'odota:3'] },
  { rivi: '6', nimi: 'Kaupunkilehti: aihesivun nostot', web: 'kaupunkilehti-aihe1-nostot', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI} 1`, 'odota:3', 'ui:ui lehti vierita 900', 'odota:1'], huom: 'natiivi vierittää pikseleinä, web ankkurilla' },
  { rivi: '7', nimi: 'Kaupunkilehti: loppu', web: 'kaupunkilehti-loppu', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI}`, 'odota:3', 'ui:ui lehti viimeinen', 'odota:2', 'ui:ui lehti vierita loppu', 'odota:1'] },
  { rivi: '8', nimi: 'Kaupunkilehti: sisällys', web: 'kaupunkilehti-sisallys', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI}`, 'odota:3', 'ui:ui lehti sisallys', 'odota:1'] },
  { rivi: '9', nimi: 'Maalehti: kansi', web: 'maalehti-kansi', peli: true, natiivi: ['ui:ui maalehti FRA', 'odota:3'] },
  { rivi: '10', nimi: 'Matkakirja auki', web: 'matkakirjakortti-auki', peli: true, natiivi: [`ui:ui matkakirja ${KAUPUNKI}`, 'odota:1', 'ui:ui matkakirja auki', 'odota:1'] },
  { rivi: '11', nimi: 'Linssi: keksinnöt', web: 'linssi-keksinnot', peli: true, natiivi: ['ui:ui linssi keksinnot', 'odota:4'], huom: 'aikajana: eri vuosi = eri hetki' },
  { rivi: '12', nimi: 'Linssi: selite', web: 'linssi-selite', peli: true, natiivi: ['ui:ui linssi selite', 'odota:2'], huom: 'natiivin selite-komento varmistamatta' },
  { rivi: '12b', nimi: 'Linssi: selite (uusinta)', web: 'linssi-selite', peli: true, natiivi: ['ui:ui linssi keksinnot', 'odota:4', 'ui:ui linssi selite', 'odota:2'] },
  { rivi: '13', nimi: 'Linssi: ihmisen matka käynnissä', web: 'linssi-ihmisen-matka-kaynnissa', peli: true, natiivi: ['ui:ui linssi matka', 'odota:8'] },
  { rivi: '14', nimi: 'Asetukset (ratas)', web: 'ratas', peli: true, natiivi: ['ui:ui asetukset', 'odota:2'] },
  { rivi: '15', nimi: 'Karttaselite', web: 'karttaselite', peli: true, natiivi: ['ui:ui selite', 'odota:2'] },
  { rivi: '16', nimi: 'Kysymys (kohtaamisen visa)', web: 'visa', peli: true, natiivi: ['peli:tutki', 'peli:odota-tila Kysymys 15', 'peli:aloita', 'odota:2'], nollaa: true },
  { rivi: '17', nimi: 'Kaupunkikortti', web: 'kaupunkikortti', peli: true, natiivi: ['ui:ui kortti lyon', 'odota:2'] },
  { rivi: '18', nimi: 'Valikko', web: 'valikko', peli: true, natiivi: ['ui:ui valikko', 'odota:2'] },
  { rivi: '19', nimi: 'Noppa: siirtokohteet kartalla', web: 'noppa-siirtolista', peli: true, natiivi: ['peli:kulkutapa liftaus', 'odota:4'], nollaa: true },
  { rivi: '20', nimi: 'Laukku', web: 'laukku', peli: true, natiivi: ['ui:ui laukku', 'odota:2'] },
  { rivi: '21', nimi: 'Kulkutapaliuska', web: 'liiku', peli: true, natiivi: ['ui:ui liiku', 'odota:2'] },
  { rivi: '21b', nimi: 'Noppa heitetty', web: 'noppa', peli: true, natiivi: ['peli:kulkutapa liftaus', 'odota:2'], nollaa: true, huom: 'web kuvaa nopan ennen siirtovaihetta' },
  { rivi: '21c', nimi: 'Sähke (Sofia)', web: 'sahke', peli: true, natiivi: ['peli:sahketehtava avaa sofia', 'odota:3'] },
  { rivi: '22', nimi: 'Kartta', web: 'kartta', peli: true, natiivi: ['odota:1'] },
  { rivi: '23', nimi: 'Matkakirjakortti kiinni', web: 'matkakirjakortti-kiinni', peli: true, natiivi: [`ui:ui matkakirja ${KAUPUNKI}`, 'odota:2'] },
  { rivi: '24', nimi: 'Kohtaaminen', web: 'kohtaaminen', peli: true, natiivi: ['peli:tutki', 'peli:odota-tila Kysymys 15', 'odota:1'], nollaa: true },
  { rivi: '25', nimi: 'Nostokortti (Pont du Gard)', web: 'nostokortti', peli: true, natiivi: ['ui:ui nosto kohde:pont-du-gard@FRA', 'odota:3'], huom: 'natiivin valo-id varmistamatta' },
  { rivi: '26', nimi: 'Nostovisa (Roquefort)', web: 'nostovisa', peli: true, natiivi: ['ui:ui nosto nosto:maalehti-roquefort lisaa', 'odota:3'], huom: 'natiivin valo-id varmistamatta' },
  { rivi: '27', nimi: 'Eläintäky (Ranska)', web: 'elaintaky', peli: true, natiivi: ['ui:ui nosto elaintaky:FRA', 'odota:3'] },
  { rivi: '28', nimi: 'Aarre (kohtaamisen oikea vastaus)', web: 'aarre', peli: true, natiivi: ['peli:tutki', 'peli:odota-tila Kysymys 15', 'peli:aloita', 'odota:1', 'peli:vastaa oikea', 'odota:4'], nollaa: true },
  { rivi: '29', nimi: 'Pöllö / Livia-chat', web: 'pollo', peli: true, natiivi: ['ui:ui chat', 'odota:3'] },
  { rivi: '30', nimi: 'Linssi: topografia', web: 'linssi-topografia', peli: true, natiivi: ['ui:ui linssi topografia', 'odota:3'] },
  { rivi: '31', nimi: 'Linssi: vesistöt', web: 'linssi-vesistot', peli: true, natiivi: ['ui:ui linssi vesistot', 'odota:3'] },
  { rivi: '32', nimi: 'Laukku: linssit', web: 'laukku-linssit', peli: true, natiivi: ['ui:ui linssi varusteet', 'odota:2'], huom: 'natiivi esimerkkiaineistolla' },
  { rivi: '33', nimi: 'Kaupunkilehti: aihesivu 2', web: 'kaupunkilehti-aihe2', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI} 2`, 'odota:3'] },
  { rivi: '34', nimi: 'Kaupunkilehti: Lue lisää', web: 'kaupunkilehti-luelisaa', peli: true, natiivi: ['ui:ui wiki Marseille', 'odota:3'] },
  { rivi: '35', nimi: 'Maalehti: aihesivu 1', web: 'maalehti-aihe1', peli: true, natiivi: ['ui:ui maalehti FRA 1', 'odota:3'] },
  { rivi: '36', nimi: 'Maalehti: mediarivi', web: 'maalehti-mediarivi', peli: true, natiivi: ['ui:ui maalehti FRA', 'odota:3', 'ui:ui lehti vierita 900', 'odota:1'], huom: 'natiivi vierittää pikseleinä, web ankkurilla' },
  { rivi: '37', nimi: 'Linssi: radio', web: 'linssi-radio', peli: true, natiivi: ['ui:ui linssi radio', 'odota:3'] },
  { rivi: '38', nimi: 'Linssi: satelliitti', web: 'linssi-satelliitti', peli: true, natiivi: ['ui:ui linssi satelliitti', 'odota:4'] },
  { rivi: '39', nimi: 'Linssi: vertailu', web: 'linssi-vertailu', peli: true, natiivi: ['ui:ui linssi vertailu', 'odota:3'] },
  { rivi: '40', nimi: 'Linssi: karuselli', web: 'linssi-karuselli', peli: true, natiivi: ['ui:ui linssi keksinnot', 'odota:3'] },
  { rivi: '41', nimi: 'Linssi: maatiedot', web: 'linssi-maatiedot', peli: true, natiivi: ['ui:ui linssi maa', 'odota:3'] },
];
