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
 *             'linssi:<rivi>' (linssi-komento.txt), 'odota:<s>'. OIKEA LINSSI avataan linssi-komennolla
 *             ("linssi <id>", LinssiOhjain); "ui linssi …" näyttää vain linssin UI-osia esimerkkiaineistolla
 *             (b12g-ajossa rivi 39 jäi radioon, koska radio oli avattu ui-komennolla eikä sulkeutunut).
 *   tunniste  valinnainen: teksti, jonka pitää näkyä natiivin UI-puussa ennen kuvaa (tilavartija). Oletuksena
 *             vartija käyttää webin saman näkymän tekstejä, joita ei ole pelkällä kartalla.
 *   nollaa    true = rivi muuttaa pelitilaa (matka, kysymys): peli aloitetaan alusta ennen seuraavaa
 *   huom      lyhyt huomautus raporttiin (epävarma komento, hyväksytty ero)
 *
 * Linssien kamerat ovat samat kuin webin näkymissä (pariteettikuvat-nakymat.mjs LINSSIT: lat lon korkeus km).
 */
export const KAUPUNKI = 'marseille';
export const SIEMEN = 5;

/** Natiivin alkutila rivien 3–41 edellä (Laitetestaaja: odota-tila Aloitus ennen uusi-peliä). */
export const NATIIVI_ALKU = ['peli:odota-tila Aloitus 30', `peli:uusi-peli ${SIEMEN} ${KAUPUNKI}`, 'peli:odota-tila Kartta 30', 'peli:puhe pois',
  // Kaikki linssit auki kuten webin laukku-linssit-tallenteessa (LinssiOhjain "kehittaja 1").
  'linssi:kehittaja 1', 'odota:2'];

/**
 * Rivien välissä: kaikki kiinni eksplisiittisesti (oikea linssi, linssien testinäkymät, lehti, kortit).
 * tools/pariteetti-ajo.mjs vahvistaa sen jälkeen, että kartta on taas näkyvissä (PERUSTILA).
 */
export const NATIIVI_SIIVOUS = ['linssi:linssi pois', 'ui:ui linssi pois', 'peli:sulje-lehti', 'ui:ui sulje', 'odota:1'];

/** Kartan perustila: tämä teksti näkyy natiivin UI-puussa vain, kun mikään näkymä ei ole auki. */
export const PERUSTILA = 'Liiku';

export const RIVIT = [
  { rivi: '1', nimi: 'Etusivu / aloitusportti', web: 'aloitusportti', peli: false, natiivi: ['ui:ui aloitus portti', 'odota:3'], huom: 'natiivilla voi olla tallennus (Jatka matkaa)' },
  { rivi: '2', nimi: 'Aloitusvalinta', web: 'aloitusvalinta', peli: false, natiivi: ['ui:ui aloitus valinta', 'odota:3'] },
  { rivi: '3', nimi: 'Kaupunkilehti: kansi', web: 'kaupunkilehti-kansi', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI}`, 'odota:3'] },
  { rivi: '4', nimi: 'Kaupunkilehti: kansi vieritetty (Ennen/Nyt, radio)', web: 'kaupunkilehti-kansi-alas', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI}`, 'odota:3', 'ui:ui lehti vierita 1100', 'odota:1'], huom: 'natiivi vierittää pikseleinä, web ankkurilla' },
  { rivi: '5', nimi: 'Kaupunkilehti: aihesivu 1', web: 'kaupunkilehti-aihe1', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI} 1`, 'odota:3'] },
  { rivi: '6', nimi: 'Kaupunkilehti: aihesivun nostot', web: 'kaupunkilehti-aihe1-nostot', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI} 1`, 'odota:3', 'ui:ui lehti vierita 400', 'odota:1'], huom: 'natiivi vierittää pikseleinä (900 px vei sivun loppuun b12g-ajossa), web ankkurilla' },
  { rivi: '7', nimi: 'Kaupunkilehti: loppu', web: 'kaupunkilehti-loppu', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI}`, 'odota:3', 'ui:ui lehti viimeinen', 'odota:2', 'ui:ui lehti vierita loppu', 'odota:1'] },
  { rivi: '8', nimi: 'Kaupunkilehti: sisällys', web: 'kaupunkilehti-sisallys', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI}`, 'odota:3', 'ui:ui lehti sisallys', 'odota:1'] },
  { rivi: '9', nimi: 'Maalehti: kansi', web: 'maalehti-kansi', peli: true, natiivi: ['ui:ui maalehti FRA', 'odota:3'] },
  { rivi: '10', nimi: 'Matkakirja auki', web: 'matkakirjakortti-auki', peli: true, natiivi: [`ui:ui matkakirja ${KAUPUNKI}`, 'odota:1', 'ui:ui matkakirja auki', 'odota:1'] },
  { rivi: '11', nimi: 'Linssi: keksinnöt', web: 'linssi-keksinnot', peli: true, natiivi: ['linssi:linssi keksinnot', 'odota:4'], huom: 'aikajana: eri vuosi = eri hetki' },
  { rivi: '12', nimi: 'Linssi: selite', web: 'linssi-selite', peli: true, natiivi: ['linssi:linssi topografia', 'odota:3', 'ui:ui linssi selite', 'odota:2'], huom: 'natiivin selite on esimerkkiriveillä (ui linssi selite)' },
  { rivi: '12b', nimi: 'Linssi: selite (keksinnöt)', web: 'linssi-selite', peli: true, natiivi: ['linssi:linssi keksinnot', 'odota:4', 'ui:ui linssi selite', 'odota:2'] },
  { rivi: '13', nimi: 'Linssi: ihmisen matka käynnissä', web: 'linssi-ihmisen-matka-kaynnissa', peli: true, natiivi: ['linssi:linssi ihmisen-matka', 'odota:4', 'linssi:esitys kaynnista', 'odota:16'], huom: 'esitys: alkukortti → Käynnistä (linssi-komento esitys kaynnista, juna/b13) → musta kysymys → pallo' },
  { rivi: '14', nimi: 'Asetukset (ratas)', web: 'ratas', peli: true, natiivi: ['ui:ui asetukset', 'odota:2'] },
  { rivi: '15', nimi: 'Karttaselite', web: 'karttaselite', peli: true, natiivi: ['ui:ui selite', 'odota:2'] },
  { rivi: '16', nimi: 'Kysymys (kohtaamisen visa)', web: 'visa', peli: true, natiivi: ['peli:tutki', 'peli:odota-tila Kysymys 15', 'peli:aloita', 'odota:2'], nollaa: true },
  { rivi: '17', nimi: 'Kaupunkikortti', web: 'kaupunkikortti', peli: true, natiivi: ['ui:ui lisakaupunki lyon', 'odota:3'], huom: 'web: napautaNosto(nakyva-kaupunki-*), natiivi: lisäkaupungin kortti' },
  { rivi: '18', nimi: 'Valikko', web: 'valikko', peli: true, natiivi: ['ui:ui valikko', 'odota:2'] },
  { rivi: '19', nimi: 'Noppa: siirtokohteet kartalla', web: 'noppa-siirtolista', peli: true, natiivi: ['peli:kulkutapa liftaus', 'odota:4'], nollaa: true },
  { rivi: '20', nimi: 'Laukku', web: 'laukku', peli: true, natiivi: ['ui:ui laukku', 'odota:2'] },
  { rivi: '21', nimi: 'Kulkutapaliuska', web: 'liiku', peli: true, natiivi: ['ui:ui liiku', 'odota:2'] },
  { rivi: '21b', nimi: 'Noppa heitetty', web: 'noppa', peli: true, natiivi: ['peli:kulkutapa liftaus', 'odota:2'], nollaa: true, huom: 'web kuvaa nopan ennen siirtovaihetta' },
  { rivi: '21c', nimi: 'Sähke (Sofia)', web: 'sahke', peli: true, natiivi: ['peli:sahketehtava avaa sofia', 'odota:3'] },
  { rivi: '22', nimi: 'Kartta', web: 'kartta', peli: true, natiivi: ['odota:1'] },
  { rivi: '23', nimi: 'Matkakirjakortti kiinni', web: 'matkakirjakortti-kiinni', peli: true, natiivi: [`ui:ui matkakirja ${KAUPUNKI}`, 'odota:2'] },
  { rivi: '24', nimi: 'Kohtaaminen', web: 'kohtaaminen', peli: true, natiivi: ['peli:tutki', 'odota:2'], nollaa: true },
  { rivi: '25', nimi: 'Nostokortti (Pont du Gard)', web: 'nostokortti', peli: true, natiivi: ['ui:ui nosto kohde:pont-du-gard@FRA', 'odota:3'], huom: 'natiivin valo-id varmistamatta' },
  { rivi: '26', nimi: 'Nostovisa (Roquefort)', web: 'nostovisa', peli: true, natiivi: ['ui:ui nosto nosto:maalehti-roquefort lisaa', 'odota:3'], huom: 'natiivin valo-id varmistamatta' },
  { rivi: '27', nimi: 'Eläintäky (Ranska)', web: 'elaintaky', peli: true, natiivi: ['ui:ui nosto elaintaky:FRA', 'odota:3'] },
  { rivi: '28', nimi: 'Aarre (kohtaamisen oikea vastaus)', web: 'aarre', peli: true, natiivi: ['peli:tutki', 'peli:odota-tila Kysymys 15', 'peli:aloita', 'odota:1', 'peli:vastaa oikea', 'odota:4'], nollaa: true },
  { rivi: '29', nimi: 'Pöllö / Livia-chat', web: 'pollo', peli: true, natiivi: ['ui:ui chat', 'odota:3'] },
  { rivi: '30', nimi: 'Linssi: topografia', web: 'linssi-topografia', peli: true, natiivi: ['linssi:linssi topografia', 'odota:2', 'linssi:kamera 45 10 8000', 'odota:3'] },
  { rivi: '31', nimi: 'Linssi: vesistöt', web: 'linssi-vesistot', peli: true, natiivi: ['linssi:linssi vesistot', 'odota:2', 'linssi:kamera 0 20 9000', 'odota:3'] },
  { rivi: '32', nimi: 'Laukku: linssit', web: 'laukku-linssit', peli: true, natiivi: ['ui:ui laukku', 'odota:2'], huom: 'linssit auki kehittaja 1:llä' },
  { rivi: '33', nimi: 'Kaupunkilehti: aihesivu 2', web: 'kaupunkilehti-aihe2', peli: true, natiivi: [`ui:ui lehti ${KAUPUNKI} 2`, 'odota:3'] },
  { rivi: '34', nimi: 'Kaupunkilehti: Lue lisää', web: 'kaupunkilehti-luelisaa', peli: true, natiivi: ['ui:ui wiki Marseille', 'odota:3'] },
  { rivi: '35', nimi: 'Maalehti: aihesivu 1', web: 'maalehti-aihe1', peli: true, natiivi: ['ui:ui maalehti FRA 2', 'odota:3'], huom: 'natiivin aihenumero: 1 = etusivu (b12g-ajossa FRA 1 osui eri sivulle)' },
  { rivi: '36', nimi: 'Maalehti: mediarivi', web: 'maalehti-mediarivi', peli: true, natiivi: ['ui:ui maalehti FRA', 'odota:3', 'ui:ui lehti vierita 900', 'odota:1'], huom: 'natiivi vierittää pikseleinä, web ankkurilla' },
  { rivi: '37', nimi: 'Linssi: radio', web: 'linssi-radio', peli: true, natiivi: ['linssi:linssi radio', 'odota:2', 'linssi:kamera 50 10 6000', 'odota:3'] },
  { rivi: '38', nimi: 'Linssi: satelliitti', web: 'linssi-satelliitti', peli: true, natiivi: ['linssi:linssi satelliitti', 'odota:5'] },
  { rivi: '39', nimi: 'Linssi: vertailu', web: 'linssi-vertailu', peli: true, natiivi: ['linssi:linssi vertailu', 'odota:2', 'linssi:kamera 60 15 5000', 'odota:3'] },
  { rivi: '40', nimi: 'Linssi: karuselli', web: 'linssi-karuselli', peli: true, natiivi: ['linssi:linssi keksinnot', 'odota:3', 'linssi:keksinnot kaynnista', 'odota:3'] },
  { rivi: '41', nimi: 'Linssi: maatiedot', web: 'linssi-maatiedot', peli: true, natiivi: ['linssi:linssi maatiedot', 'odota:2', 'linssi:kamera 36 138 4000', 'odota:2', 'linssi:maa JPN', 'odota:2'] },
];
