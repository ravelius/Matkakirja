/*
 * PAKETIN FUNKTIOIDEN LUETTELO NATIIVILLE (Siirtoseppä 23.9.2026, skeema
 * 1.5, sisältöpaketin osa 2 erä B).
 *
 * Kaupunkidatasta funktiot on poistettu (pulma.generaattori, tekstipohjat).
 * Jäljelle jääneet 70 funktiota ovat apufunktio-exportteja, linssien
 * LINSSI-olioiden metodeja ja pulmarekistereitä. Niiden lähdeteksti
 * kulkee raakakerroksessa ({ $funktio, lahde }), mutta natiivi ei saa
 * ajaa sitä (raportin osa 5.5, App Store 2.5.2). Tämä luettelo kertoo
 * jokaisesta, mistä natiivi saa sen, mitä funktio tuottaa:
 *
 *   media        tulos on jo media.json:ssa (url, varat, suurennos)
 *   esilaskettu  vienti ajaa funktion ja kirjoittaa tuloksen kokoelmaan
 *                esilasketut (funktio = rivin funktio-kenttä) tai
 *                saapuminen-kokoelmaan
 *   saanto       pieni sääntö, jonka natiivi toteuttaa; saanto-kenttä
 *                kuvaa sen tarkasti
 *   logiikka     piirto- tai ajonaikainen logiikka, jonka natiivi
 *                toteuttaa omana koodinaan tunnisteen mukaan
 *   kuollut      ei kutsujia pelissä; natiivi ei tarvitse
 *
 * Avain: "<moduuli>#<export>[/polku]" — sama polku kuin raakakerroksen
 * JSON pointer. tests/sisaltopaketti.test.mjs vaatii, että luettelo ja
 * paketin funktiot vastaavat toisiaan täsmälleen: uusi funktio pakettiin
 * = uusi rivi tähän (tai funktio pois datasta).
 *
 * Luokitus: kolmen Sonnet-agentin tiedostoittainen analyysi 23.9.2026,
 * tarkistettu viennin tuloksia vasten.
 */
const L = 'js/linssit/';
const P = 'js/packs/';
const logiikka = (tunniste) => ({ luokka: 'logiikka', tunniste });
const saanto = (teksti) => ({ luokka: 'saanto', saanto: teksti });
const esilaskettu = (kohde) => ({ luokka: 'esilaskettu', esilaskettu: kohde });
const media = (kentta) => ({ luokka: 'media', media: kentta });
const kuollut = { luokka: 'kuollut' };
const fokusPoiminta = saanto('Poimii annetut id:t moduulin FOKUSKOHTEET_*-taulukosta; kutsujien tulos on jo fokusvirtojen kohteet-kentässä datana.');
const aikajanaPallolle = logiikka('linssi:aikajana.pallolle');

export const LOGIIKKA = {
  [`${L}ihmisen-matka.js#LINSSI/pallolle`]: aikajanaPallolle,
  [`${L}keksinnot.js#LINSSI/pallolle`]: aikajanaPallolle,
  [`${L}maatiedot.js#LINSSI/pallolle`]: logiikka('linssi:maatiedot.pallolle'),
  [`${L}vertailu.js#LINSSI/pallolle`]: logiikka('linssi:vertailu.pallolle'),
  [`${L}radio.js#LINSSI/pallolle`]: logiikka('linssi:radio.pallolle'),
  [`${L}radio.js#LINSSI/vapauta`]: logiikka('linssi:radio.vapauta'),
  [`${L}satelliitti.js#LINSSI/pallolle`]: logiikka('linssi:satelliitti.pallolle'),
  [`${L}topografia.js#LINSSI/lataa`]: logiikka('linssi:topografia.lataa'),
  [`${L}topografia.js#LINSSI/piirra`]: logiikka('linssi:topografia.piirra'),
  [`${L}topografia.js#LINSSI/pallolle`]: logiikka('linssi:topografia.pallolle'),
  [`${L}topografia.js#LINSSI/selite`]: esilaskettu('esilasketut#linssiSelite'),
  [`${L}vesistot.js#LINSSI/lataa`]: logiikka('linssi:vesistot.lataa'),
  [`${L}vesistot.js#LINSSI/piirra`]: logiikka('linssi:vesistot.piirra'),
  [`${L}vesistot.js#LINSSI/pallolle`]: logiikka('linssi:vesistot.pallolle'),
  [`${L}vesistot.js#LINSSI/selite`]: esilaskettu('esilasketut#linssiSelite'),

  [`${P}africa-puzzles.js#GENERATORS/hieroglyfit`]: logiikka('pulma:hieroglyfit'),
  [`${P}africa-puzzles.js#GENERATORS/punnukset`]: logiikka('pulma:punnukset'),
  [`${P}africa-puzzles.js#GENERATORS/kuunvaiheet`]: logiikka('pulma:kuunvaiheet'),
  [`${P}africa-puzzles.js#GENERATORS/naksutus`]: logiikka('pulma:naksutus'),
  [`${P}africa-puzzles.js#GENERATORS/vesileilit`]: logiikka('pulma:vesileilit'),
  [`${P}africa-puzzles.js#arvoksi`]: saanto('[sadat, kymmenet, ykkoset] → sadat*100 + kymmenet*10 + ykkoset.'),
  [`${P}africa-puzzles.js#onAfrikanPulma`]: esilaskettu('esilasketut#pulmapiirrokset'),
  [`${P}africa-puzzles.js#piirraAfrikanPulma`]: logiikka('pulmapiirros:<pulman id>'),
  [`${P}africa-puzzles.js#piirraKuu`]: logiikka('pulmapiirros:kuu'),
  [`${P}europe-puzzles.js#EUROPE_GENERATORS/roomalaiset`]: logiikka('pulma:roomalaiset'),
  [`${P}europe-puzzles.js#EUROPE_GENERATORS/pylvaat`]: logiikka('pulma:pylvaat'),
  [`${P}europe-puzzles.js#EUROPE_GENERATORS/suolaaltaat`]: logiikka('pulma:suolaaltaat'),
  [`${P}europe-puzzles.js#EUROPE_GENERATORS/geysir`]: logiikka('pulma:geysir'),
  [`${P}europe-puzzles.js#EUROPE_GENERATORS/laiturit`]: logiikka('pulma:laiturit'),
  [`${P}europe-puzzles.js#EUROPE_GENERATORS/kukko`]: logiikka('pulma:kukko'),
  [`${P}europe-puzzles.js#onEuroopanPulma`]: esilaskettu('esilasketut#pulmapiirrokset'),
  [`${P}europe-puzzles.js#piirraEuroopanPulma`]: logiikka('pulmapiirros:<pulman id>'),

  [`${P}africa-valokuvat.js#valokuvaUrl`]: media('url, varat'),
  [`${P}africa-valokuvat.js#valokuvaVara`]: media('varat'),
  [`${P}africa-valokuvat.js#valokuvaSuurennos`]: media('suurennos'),
  [`${P}africa-valokuvat.js#lippuUrl`]: media('url, varat'),
  [`${P}africa-valokuvat.js#lippuVara`]: media('alkuperainen'),
  [`${P}valokuvat-flickr.js#flickrOsoite`]: media('url (kuva-flickr)'),
  [`${P}historian-hetket.js#hetkenKuvaOsoite`]: media('url (hetkikuva)'),
  [`${P}historian-hetket.js#hetkenKuvat`]: esilaskettu('esilasketut#hetkenKuvat'),
  [`${P}historian-hetket.js#hetketMaassa`]: esilaskettu('saapuminen#historianHetket'),
  [`${P}elaintakyt.js#elaintakynKuvat`]: esilaskettu('esilasketut#elaintakynKuvat'),
  [`${P}vuori-valokuvat.js#vuorikuvat`]: saanto('VUORIKUVAT[avain], tyhjä tai puuttuva = null.'),
  [`${P}etusivun-isoisakuvat.js#isoisakuvanSavy`]: saanto('Oletus ISOISAKUVAN_SAVYT[kuva.savy] (tumma: haalea 0.55, sumennus 1.5; vaalea: 0.85, 1.2; tuntematon = tumma); kuvan omat haalea/sumennus voittavat, jos ne ovat lukuja.'),
  [`${P}paivan-kuvat.js#paivanKuva`]: kuollut,
  [`${P}viritysaanet.js#arvoViritysaani`]: saanto('Satunnainen VIRITYSAANET-alkio, ei sama kuin edellinen.'),
  [`${P}viritysaanet.js#viritysPolku`]: saanto("'assets/audio/' + aani.tiedosto"),
  [`${P}tarinakaari.js#kaariLuentaSoi`]: saanto('Soi, jos kohde on olemassa eikä (kohde.mykistetyt ?? []) sisällä osaa (saapuminen | kohtaaminen | aarre).'),

  [`${P}fokuskohteet-bgr.js#bgrFokuskohteet`]: fokusPoiminta,
  [`${P}fokuskohteet-bih.js#bihFokuskohteet`]: fokusPoiminta,
  [`${P}fokuskohteet-deu.js#fokuskohteetDeu`]: kuollut,
  [`${P}fokuskohteet-grc.js#fokuskohteet`]: fokusPoiminta,
  [`${P}fokuskohteet-ita.js#itaFokuskohteet`]: fokusPoiminta,
  [`${P}fokuskohteet-rou.js#rouFokuskohteet`]: fokusPoiminta,
  [`${P}fokuskohteet-tur.js#turFokuskohteet`]: fokusPoiminta,
  [`${P}fokusvirrat.js#fokusvirtaKaupungille`]: esilaskettu('saapuminen#fokusvirta'),
  [`${P}fokusvirrat.js#luentakuvallisetKaupungit`]: esilaskettu('saapuminen#luentakuva'),
  [`${P}julisteet.js#kaupunginJuliste`]: esilaskettu('saapuminen#juliste'),
  [`${P}julisteet.js#juliste`]: kuollut,
  [`${P}paikallisaarteet.js#paikallisaarre`]: esilaskettu('saapuminen#paikallisaarteet'),
  [`${P}radiot.js#radioMaalle`]: esilaskettu('saapuminen#radio'),
  [`${P}vanhat-aanet.js#vanhaTallenne`]: esilaskettu('saapuminen#vanhaTallenne'),
  [`${P}maa-kategoriat.js#maanGenetiivi`]: esilaskettu('esilasketut#maanGenetiivi'),
  [`${P}maa-kategoriat.js#maanAiheOtsikko`]: kuollut,
  [`${P}pollo-kysymykset.js#haeValmiskysymykset`]: saanto('POLLO_VALMISKYSYMYKSET[kaupunkiId]?.[konteksti] ?? [] (konteksti: laatta | lehti | saapuminen).'),
  [`${P}pollon-arvonimet.js#pollonArvonimi`]: saanto('Satunnainen arvonimi: 40 % maan lista (jos on), muuten 65 % mantereen lista (jos on), muuten yleinen; sama kuin edellinen → seuraava listasta.'),

  [`${P}maakartat.js#karttaKuvasuhde`]: saanto('venytys = 1 / cos((pohjoinen + etela) / 2 radiaaneina); suhde = (ita - lansi) / ((pohjoinen - etela) * venytys).'),
  [`${P}maakartat.js#karttapiste`]: logiikka('kartta:karttapiste'),
  [`${P}maakartat.js#mittakaava`]: logiikka('kartta:mittakaava'),
  [`${P}maakartat.js#ydinAla`]: saanto('Ydinrajaus (rajat) prosentteina piirtorajauksesta (piirtoRajat ?? rajat): x = (r.lansi - p.lansi) / (p.ita - p.lansi) * 100, y = (p.pohjoinen - r.pohjoinen) / (p.pohjoinen - p.etela) * 100, leveys ja korkeus samoin.'),
};

/** Manifestin logiikka-lista: aakkosjärjestyksessä, kohta = avain. */
export function logiikkaLista() {
  return Object.keys(LOGIIKKA).sort().map((kohta) => ({ kohta, ...LOGIIKKA[kohta] }));
}
