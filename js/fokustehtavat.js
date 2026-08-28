/*
 * KEVYEN KULUN NIMETYT MINITEHTÄVÄT — kaupunkilehden kysymyssivut.
 *
 * Raamatun osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU (omistaja
 * 24.8.2026, ilta): *"Lehden sivuilla 2 ja 3 on KUMMALLAKIN YKSI
 * minitehtävä, erikseen nimettyinä: toinen AARTEEN AVAUS -tehtävä ja
 * toinen JULISTE-tehtävä. Aarteen avaus -tehtävän suoritus sytyttää
 * kartalle PIENEN VIHREÄNÄ HEHKUVAN PISTEEN … juliste-tehtävästä saa
 * julisteen."*
 *
 * ── LEHDEN KYSYMYKSET YHTENÄISENÄ JÄRJESTELMÄNÄ ────────────────────
 *
 * Raamattu, sama osio (omistaja 25.8.2026): *"jokaisella lehden
 * sivulla PAITSI etusivulla (herokuvat) on kysymys lopussa; jokaisesta
 * saa rahaa; jos kysymyksellä ei ole julistepalkintoa, se AVAA
 * AARTEEN (myös vanha kulttuurivisa muuntuu aarteen avaavaksi); kun
 * aarre on jo auki, aarteen avaavista saa enää pelkkää rahaa."*
 *
 * Kaikki kolme sääntöä asuvat tässä tiedostossa, koska ne ovat yhden
 * kysymyksen kolme puolta eivätkä kolme ominaisuutta:
 *
 *   RAHA. Jokainen kysymys maksaa oikeasta vastauksesta — nimetty
 *   tehtävä FOKUS_TEHTAVA_PALKKION (game.actionMinitehtava),
 *   kulttuurivisa oman palkkionsa (js/ui.js naytaKulttuuri,
 *   game.actionKulttuuri). Kahta maksajaa ei ole eikä tarvita.
 *
 *   AARRE. Palkinto ratkaisee roolin: `palkinto: 'juliste'` antaa
 *   julisteen, KAIKKI MUUT avaavat aarteen (avaaAarteen alempana).
 *   Sääntö on kirjoitettu näin päin, jotta uusi kysymys avaa aarteen
 *   ilman että datan tarvitsee sanoa siitä mitään — ja koska
 *   kulttuurivisa, jonka dataa ei tässä omisteta, on juuri sellainen.
 *
 *   AARRE JO AUKI. Kun jälki on jo kartalla (tai aarre kokonaan
 *   löydetty), aarteen avaavalla kysymyksellä ei ole enää mitään
 *   avattavaa. Silloin otsake ja vihjerivi kertovat rehellisesti, mitä
 *   luvassa on: "LEHDEN KYSYMYS" ja "oikeasta vastauksesta rahaa"
 *   (aarreAuki, AARRE_AUKI_*). Lupausta ei anneta kahdesti.
 *
 * ── MIKÄ TÄMÄ ON JA MIKÄ EI ────────────────────────────────────────
 *
 * Tämä EI ole uusi tehtävämekaniikka. Kysymys, vastauslipukkeet,
 * kirjanpito ja palkkio ovat lehden minitehtävän omia
 * (js/game.js actionMinitehtava, js/ui.js piirraMinitehtava): sama
 * avain vastataan kerran, raha maksetaan vain oikeasta vastauksesta ja
 * kaikki kulkee pelitallenteessa. Uutta on kolme asiaa:
 *
 *   1. NIMILAATTA JA VIHJERIVI. Laatikon otsake ei ole "Lehden
 *      minitehtävä" vaan tehtävän oma nimi — "AARTEEN AVAUS" tai
 *      "JULISTE" — ja sen alla lukee yhdellä rivillä, mitä oikeasta
 *      vastauksesta seuraa. Se on koko kokeilun ydin: pelaajan pitää
 *      nähdä sivulta, kumpi tehtävä avaa tien aarteelle ja kumpi antaa
 *      julisteen (omistajan pelitesti 25.8.2026).
 *   2. SIJAINTI SIVUNUMEROSSA. Tehtävä ei tule aihesivun omasta
 *      `tehtava`-kentästä vaan kaupungin fokusvirtadatasta
 *      (js/packs/fokusvirta-ateena.js lehtitehtavat), jossa jokaisella
 *      on sivunumero. Sivun oma tehtävä väistyy nimetyn tieltä, jotta
 *      sivulla on Raamatun vaatima YKSI minitehtävä eikä kahta.
 *   3. PALKINTONA PISTE. AARTEEN AVAUS ei maksa julistetta vaan
 *      sytyttää kartalle vihreän kohtaamispisteen (js/fokuspiste.js).
 *   4. PÖLLÖN KUITTAUS. Oikean vastauksen jälkeen pöllö kertoo
 *      lyhyesti, mitä juuri tapahtui ja mitä on vielä tekemättä —
 *      palkinto tapahtuu lehden ulkopuolella (kartta, matkalaukku),
 *      eikä pelaaja näe sitä sivulta (ks. kuittausTeksti).
 *   5. KULTTUURIVISA SAMAAN JÄRJESTELMÄÄN. Lehden vanha visalaatikko
 *      piirretään js/ui.js:ssä eikä täällä, joten se ei muutu nimetyksi
 *      tehtäväksi — se PUKEUTUU sellaiseksi (fokusVisanKehys): otsake,
 *      vihjerivi ja aarteen avaus tulevat tästä moduulista, kysymys ja
 *      rahapalkkio jäävät sinne, missä ne jo ovat.
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
import { juliste as julisteAvaimella, kaupunginJuliste } from './packs/julisteet.js';
import { fokusvirtaKaupungille } from './packs/fokusvirrat.js';
import { natiiviVastaus } from './natiivi.js';
// Pullavinkin hinta ja kirjanpito ovat pelin omia (ks. PULLA LIVIALLE).
import { PULLA_HINTA } from './game.js';
// Kulttuurivisan kysymysdata: visa on lehden aarteen avaava kysymys,
// mutta sen kysymys asuu yhä sisältötauluissa (ks. fokusVisanKehys).
import { KULTTUURIT } from './sisaltotaulut.js';
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

/**
 * VIHJERIVI NIMILAATAN ALLE (omistajan pelitesti 25.8.2026: *"Tehtävän
 * otsikko saisi vinkata että se avaa aarteen."*).
 *
 * Nimilaatta kertoo MIKÄ tehtävä on, vihjerivi mitä siitä SEURAA.
 * Pelitestissä laatikko luettiin pelkäksi lehden kysymykseksi, koska
 * "AARTEEN AVAUS" ei vielä lupaa mitään — palkinto oli näkymätön siihen
 * asti kunnes vastaus oli annettu.
 *
 * Rivi on sidottu PALKINTOON eikä kaupunkiin, joten jokainen uusi lauta
 * saa sen ilmaiseksi samalla kun se saa nimetyn tehtävän. Pack-data voi
 * silti korvata sen omalla `vihje`-kentällään, jos jonkin kaupungin
 * palkinto on joskus jotain muuta.
 *
 * Rivi EI OLE otsakkeen sisällä vaan sen sisarena: otsakkeen teksti on
 * nimilaatta ja vain se (savuke lukee sen sellaisenaan), ja vihje on
 * eri äänensävyä — pientä kursiivia, ei kapiteelia.
 *
 * Aarteen vihje on OLETUS eikä palkintokohtainen taulukko: jokainen
 * kysymys, joka ei anna julistetta, avaa aarteen (ks. avaaAarteen).
 */
const AARTEEN_VIHJE = 'oikea vastaus paljastaa aarteen jäljen kartalle';
const JULISTEEN_VIHJE = 'oikea vastaus tuo julisteen kokoelmaasi';

/**
 * OTSAKE JA VIHJE, KUN AARRE ON JO AUKI (omistaja 25.8.2026).
 *
 * Aarteen avaava kysymys on avannut aarteen vain kerran; sen jälkeen
 * jäljellä on rahapalkkio. Nimilaatta palaa silloin lehden omaksi —
 * "LEHDEN KYSYMYS" on sama sana, jonka kulttuurivisa on kantanut
 * alusta asti (css/styles.css, #arrival-kulttuuri-visa::before) — ja
 * vihjerivi lupaa vain sen, mitä on luvassa.
 */
const AARRE_AUKI_OTSAKE = 'LEHDEN KYSYMYS';
const AARRE_AUKI_VIHJE = 'oikeasta vastauksesta rahaa';

/**
 * AVAAKO TÄMÄ KYSYMYS AARTEEN?
 *
 * Sääntö on kirjoitettu poissulkevasti (omistaja 25.8.2026: *"jos
 * kysymyksellä EI ole julistepalkintoa, se AVAA AARTEEN"*): juliste on
 * ainoa palkinto, joka vie kysymyksen pois aarteen tieltä. Näin uusi
 * kysymys — myös sellainen, jonka dataa ei tässä omisteta, kuten
 * kulttuurivisa — kuuluu järjestelmään ilman omaa lippukenttää.
 */
function avaaAarteen(tehtava) {
  return tehtava?.palkinto !== 'juliste';
}

/** Fokusvirran tyylitiedosto sivulle, jos sitä ei vielä ole. */
const TEHTAVA_TYYLIN_TUNNUS = 'fokusvirta-tyyli';

/*
 * Sama kaava ja sama syy kuin fokusvirralla ja fokuspisteellä:
 * css/styles.css on toisen työvaiheen hallussa, joten kevyen kulun omat
 * rivit asuvat css/fokusvirta.css:ssä. Tunnus on sama kaikilla
 * lataajilla, joten tiedosto tulee sivulle enintään kerran — lehden
 * tehtävälaatikko voi hyvin olla ensimmäinen, joka sitä tarvitsee, sillä
 * korttipintaa ei kevyessä kulussa välttämättä avata koskaan.
 *
 * Nimet on prefiksoitu (lataaTehtavaTyyli, TEHTAVA_*), koska yhden
 * tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs).
 */
function lataaTehtavaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(TEHTAVA_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  // Yhden tiedoston versiossa tyylit ovat jo sivun <style>-lohkossa.
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = TEHTAVA_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusvirta.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/**
 * PÖLLÖN KUITTAUSPINTA — js/fokusvirta.js asettaa tämän latautuessaan.
 *
 * Miksi takaisinkutsu eikä import: niputusjärjestys kulkee tästä
 * moduulista fokusvirtaan päin (ks. tiedoston alun "MIKSI OMA MODUULI"),
 * eikä sitä saa kääntää. Fokusvirta omistaa pöllön kuplan, tämä moduuli
 * omistaa sanat omista tehtävistään — kutsu vie sanat kuplaan.
 */
let kuittausPinta = null;

export function asetaTehtavakuittaus(fn) {
  kuittausPinta = typeof fn === 'function' ? fn : null;
}

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
 * KULTTUURIVISA AARTEEN AVAAJANA — pseudotehtävä, ei pack-dataa.
 *
 * Visan kysymys, vastauslipukkeet ja rahapalkkio asuvat js/ui.js:n
 * naytaKulttuurissa, eikä niitä siirretä minnekään. Tämä olio on vain
 * se osa, jota lehden kysymysjärjestelmä tarvitsee: kirjanpitoavaimen
 * id, nimilaatan teksti ja palkintorooli. `sivu` on tyhjä, koska visan
 * sivunumero vaihtelee kaupungeittain (js/lehti.js naytaTutkiSivu:
 * lehtikaupungeissa sivu 1, muilla etusivu) — pöllön kuittaus osaa
 * jättää sivusuunnan sanomatta, kun sitä ei ole.
 */
const VISA_TEHTAVA = {
  id: 'kulttuurivisa', sivu: null, otsake: 'AARTEEN AVAUS', palkinto: 'aarre',
};

/**
 * VOIKO TÄSSÄ KAUPUNGISSA AVATA AARTEEN LEHDEN KYSYMYKSELLÄ?
 *
 * Vihreä piste tarvitsee kaksi asiaa datassa: kohtaamisen ja sille
 * paikan tällä laudalla (js/packs/fokusvirta-ateena.js kohtaamispiste;
 * ehdot luetaan auki js/fokusvirta.js:n fokusvirtaKohtaaminenPisteessa
 * -kommentissa). Ilman niitä aarteen avaus olisi tyhjä lupaus, ja
 * kulttuurivisa on pelin JOKAISESSA pilottikaupungissa — se ei saa
 * vaihtaa otsakettaan aarteen avaukseksi paikassa, jossa mikään ei
 * syttyisi.
 *
 * Nimetyt lehtitehtävät kulkevat oman datansa mukana eivätkä kysy
 * tätä: jos lauta antaa kaupungille AARTEEN AVAUS -tehtävän, se on
 * laudan oma lupaus.
 */
function aarteenAvausMahdollista(ui, city) {
  if (!FOKUS_LEHTITEHTAVAT || !city || !ui?.game || ui.game.player?.isBot) return false;
  if (!fokusmoodiPaalla()) return false;
  const data = fokusvirtaKaupungille(city.id);
  if (!data?.kohtaaminen) return false;
  const paikka = data.kohtaamispiste?.laudat?.[ui.game.pack?.id];
  return Number.isFinite(paikka?.x) && Number.isFinite(paikka?.y);
}

/** Kaupungin kulttuurivisan kysymys, kun visa kuuluu järjestelmään. */
function kaupunginVisa(ui, city) {
  if (!aarteenAvausMahdollista(ui, city)) return null;
  return (KULTTUURIT[ui.game.pack?.id] ?? {})[city.id]?.kysymys ?? null;
}

/**
 * KAIKKI KAUPUNGIN AARTEEN AVAAVAT KYSYMYKSET.
 *
 * Lehden nimetyt tehtävät ilman julistepalkintoa JA kulttuurivisa —
 * omistajan sääntö 25.8.2026 tekee niistä saman asian. Lista on uusi
 * taulukko joka kutsulla (`filter`), joten visan lisääminen ei kirjoita
 * pack-dataan.
 */
function aarteenAvaajat(ui, city) {
  const lista = kaupunginTehtavat(ui, city).filter(avaaAarteen);
  if (kaupunginVisa(ui, city)) lista.push(VISA_TEHTAVA);
  return lista;
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
 *
 * MIKÄ TAHANSA AVAAJA RIITTÄÄ (omistaja 25.8.2026): aarre voi aueta
 * yhtä hyvin kulttuurivisasta kuin sivun nimetystä tehtävästä. Yksi
 * oikea vastaus riittää, eikä toisen kysymyksen väärä vastaus sammuta
 * jo syttynyttä jälkeä.
 *
 * PULLA ON KOLMAS AVAAJA (omistajan tilaus 28.8.2026). Livialle ostettu
 * pulla antaa saman vinkin kuin oikea vastaus, joten se luetaan tästä
 * yhdestä paikasta — silloin vihreä piste, pelinappula ja kortti ovat
 * kaikki samaa mieltä siitä, että jälki on kartalla (js/fokuspiste.js,
 * js/fokusvirta.js fokusvirtaKohtaaminenPisteessa). Kirjanpito on
 * pelitallenteessa (js/game.js pullaVinkit), ei laitteen muistissa:
 * maksettu vinkki ei saa kadota selaimen siivouksessa.
 */
export function fokusAarreAvattu(ui, city) {
  if (city && ui?.game?.pullaVinkkiOstettu?.(city.id)) return true;
  return aarteenAvaajat(ui, city)
    .some((t) => ui.game.minitehtavatOikein?.has(tehtavanAvain(ui, city, t)));
}

/**
 * ONKO AARTEEN AVAUS UMPIKUJASSA — jokaiseen avaajaan jo vastattu?
 *
 * Tätä tarvitaan umpikujan estoon: kysymykseen vastataan kerran, joten
 * väärin vastannut ei voi enää sytyttää pistettä. Silloin kohtaamisen
 * on löydyttävä muualta, ja lehden oma alanappi palaa (js/ui.js
 * tehtavaNapinTila). Sama oppi kuin fokusvirran täkyportilla: yksi
 * väärä vastaus ei saa lukita pelaajaa kaupunkiin.
 *
 * KAIKKI, EI YKSI: kun aarteen avaajia on useampi, yksi väärä vastaus
 * ei ole vielä umpikuja — jäljellä olevat kysymykset ovat yhä auki, ja
 * lehden alanappi saa pysyä poissa niin kauan kuin niitä on.
 */
export function fokusAarreVastattu(ui, city) {
  const avaajat = aarteenAvaajat(ui, city);
  if (!avaajat.length) return false;
  return avaajat.every((t) => ui.game.minitehtavatVastatut?.has(tehtavanAvain(ui, city, t)));
}

/**
 * ONKO AARRE JO AUKI — eikä avattavaa siis enää ole?
 *
 * Kaksi tapaa, sama lopputulos kysymyksen kannalta:
 *   1. jälki on jo kartalla (jokin avaaja on ratkaistu oikein), tai
 *   2. laatta on käännetty eli aarre on kokonaan löydetty — silloin
 *      vihreä piste on jo sammunut (js/fokusvirta.js
 *      fokusvirtaKohtaaminenPisteessa).
 *
 * Kummassakin tapauksessa aarteen avaavasta kysymyksestä saa enää
 * rahaa, ja otsakkeen ja vihjerivin on kerrottava se.
 */
function aarreAuki(ui, city) {
  if (fokusAarreAvattu(ui, city)) return true;
  return !ui?.game?.tokens?.has(city.id);
}

/* ==================== PULLA LIVIALLE ==================== */

/*
 * VINKKI PULLAA VASTAAN (omistajan tilaus 28.8.2026: *"aarretehtävässä
 * vinkin voisi saada jatkossa ostamalla pullan pululle"*).
 *
 * Aarteen jäljen sai tähän asti vain yhdellä tavalla: vastaamalla
 * oikein lehden AARTEEN AVAUS -kysymykseen. Se on hyvä tie, mutta se on
 * myös ainoa tie — väärin vastannut jäi odottamaan toista kysymystä, ja
 * viimeisen jälkeen ei ollut mitään. Pulla on TOINEN TIE samaan
 * vinkkiin: hinta on puntia eikä oikea vastaus.
 *
 * KOLME SÄÄNTÖÄ:
 *   1. TARJOUS EI KORVAA KYSYMYSTÄ. Kysymys jää sivulle auki
 *      rahapalkkioineen; pulla ostaa vain sen, minkä oikea vastaus
 *      antaisi kaupan päälle — vihreän pisteen kartalle.
 *   2. KERRAN PER AARRE. Kirjanpito on pelitallenteessa
 *      (js/game.js pullaVinkit, avain 'pakka:kaupunki'), joten ostettu
 *      vinkki säilyy tallennuksen yli eikä samaa pullaa myydä kahdesti.
 *   3. EI VAHINGOSSA. Nappi istuu vastauslipukkeiden alapuolella, ja
 *      sormi osuu siihen helposti ohi lipukkeen. Osto vaatii siksi
 *      KAKSI napautusta: ensimmäinen vaihtaa napin varmistukseksi ja
 *      toinen maksaa. Varmistus raukeaa itsestään (PULLA_VARMISTUS_MS),
 *      jottei nappi jää odottamaan toista painallusta seuraavalle
 *      sivulle asti.
 *
 * ── LIVIA, EI PÖLLÖ ────────────────────────────────────────────────
 *
 * Raamattu (PULU-KOKEILU ja LIVIA TUURAAJANA, omistaja 27.8.2026):
 * hahmo on kirjekyyhky Columba Livia, joka "loukkaantuu sanasta pulu
 * mutta antaa heti anteeksi" ja jonka komiikka syntyy arvostuksen
 * puutteesta, ei tyhmyydestä. Siksi kuittaus ottaa pullan vastaan
 * mutta muistuttaa samassa lauseessa suvun ansioista — ja siksi
 * tyhjä kassa ei ole moite vaan pettymys, joka koetetaan peittää.
 * Ei huutomerkkejä (Raamatun karaktäärisääntö).
 */

/**
 * MAAKOHTAINEN PULLAVASTINE.
 *
 * Pelaaja ei osta abstraktia "pullaa" vaan sen, mitä kadulta oikeasti
 * saa: Ateenassa tsourekin, Roomassa maritozzon. Taulu on ISO-koodilla
 * kuten kaikki muukin maakohtainen (js/fokusnosto.js NOSTO_MAAT,
 * js/fokuskohteet.js), ja maa luetaan laudan omasta cityCountry
 * -taulusta — yksi totuus siitä, minkä maan sisältöä ruudulla on.
 *
 * Taulussa on beta-reitin maat ja lähinaapurit, joihin reitti on
 * kasvamassa. Maa, jota ei ole taulussa, saa yleisnimen: väärä
 * paikallisnimi olisi pahempi kuin rehellinen yleisnimi.
 */
const PULLA_NIMET = {
  GRC: 'tsoureki',
  BGR: 'kozunak',
  BIH: 'hurmašica',
  ROU: 'cozonac',
  TUR: 'simit',
  ITA: 'maritozzo',
  DEU: 'Franzbrötchen',
  HUN: 'kakaós csiga',
  HRV: 'kroštule',
  /*
   * ITÄVALTA JA RANSKA (v1301): Wien ja Pariisi saivat oman
   * fokusvirtansa, joten pullatarjous näkyy niissä nyt ensimmäistä
   * kertaa. Kumpikaan nimi ei ole uusi keksintö vaan pelin omaa,
   * hyväksyttyä Livia-aineistoa: hän kertoo Wienissä laskeneensa
   * Buchtelneja ikkunalaudalta ja Pariisissa isoäitinsä saaneen
   * palkakseen briossia (js/fokusvirta.js LIVIAN_SAAPUMISET).
   *
   * ESPANJA JÄÄ TARKOITUKSELLA POIS: pelin aineisto nimeää espanjalaisen
   * leivoksen vain Granadan naapurin piononona (js/packs/
   * maa-kategoriat.js, ESP/herkut), eikä sitä tarjota Madridissa.
   * Rehellinen yleisnimi on parempi kuin väärään kaupunkiin siirretty
   * paikallisnimi.
   */
  AUT: 'Buchtel',
  FRA: 'brioche',
};

/** Maa, jota taulussa ei ole. */
const PULLA_YLEISNIMI = 'makea pulla';

/** Kuinka kauan varmistusnappi odottaa toista napautusta. */
const PULLA_VARMISTUS_MS = 6000;

/** Kaupungin pullavastine — aina jokin, koskaan tyhjä. */
function pullanNimi(ui, city) {
  const iso = ui?.game?.pack?.map?.cityCountry?.[city?.id] ?? null;
  return (iso && PULLA_NIMET[iso]) || PULLA_YLEISNIMI;
}

/** Sama nimi virkkeen alkuun. Vieraskieliset isot kirjaimet säilyvät. */
function pullaIsolla(nimi) {
  return nimi.charAt(0).toUpperCase() + nimi.slice(1);
}

/** Tarjousnappi vastaamattomana. */
function pullaNapinTeksti(nimi) {
  return `Osta ${nimi} Livialle (${PULLA_HINTA} £)`;
}

/** Sama nappi varmistusta odottamassa. */
function pullaVarmistusTeksti(nimi) {
  return `Varmista: ${nimi} Livialle, ${PULLA_HINTA} £`;
}

/** Kassa ei riitä — nappi kertoo sen itse eikä jätä arvailtavaksi. */
function pullaKoyhaTeksti(nimi) {
  return `Kassa ei riitä: ${nimi} ${PULLA_HINTA} £`;
}

/*
 * LIVIAN PETTYMYS ON HIENOVARAINEN (omistajan tilaus): hän ei moiti
 * pelaajaa vaan vakuuttaa ymmärtävänsä — hieman liian nopeasti.
 */
const PULLA_KOYHA_LIVIA = 'Ei se mitään, kyllä minä ymmärrän. '
  + '— Livia sanoo sen vähän liian nopeasti.';

/** Ohje varmistuksen alle: toinen napautus maksaa. */
const PULLA_VARMISTUS_OHJE = 'Toinen napautus maksaa. Muuten tarjous raukeaa.';

/** Kauppa tehty — rivi jää laatikkoon napin tilalle. */
function pullaTehtyTeksti(nimi) {
  return `Livia sai maksunsa (${nimi}, ${PULLA_HINTA} £) ja näytti paikan kartalta.`;
}

/**
 * LIVIAN KIITOS JA VINKKI YHDESSÄ KUPLASSA.
 *
 * Sama kupla ja sama viive kuin oikean vastauksen kuittauksella
 * (js/fokusvirta.js fokusvirtaKuittaus), koska tapahtuma on pelaajan
 * kannalta sama: aarteen jälki syttyi kartalle lehden taakse. Toinen
 * virke on AARRE_SYTTYI omin sanoin — vinkin sisältö ei saa muuttua
 * sen mukaan, kummalla tiellä se ostettiin.
 *
 * Kahden virkkeen katto pitää (Raamattu, PÖLLÖN KARAKTÄÄRI).
 */
function pullaKuittausTeksti(nimi) {
  return `${pullaIsolla(nimi)}. Sukuni kantoi kuninkaiden kirjeitä, mut `
    + 'kyllä tämä kelpaa maksuksi — aarteen jälki syttyi, ja se vihreä '
    + 'piste kartalla näyttää paikan.';
}

/**
 * ONKO PULLA TARJOLLA TÄSSÄ KAUPUNGISSA JUURI NYT?
 *
 * Kaksi ehtoa, samat kuin aarteen avaavalla kysymyksellä:
 *   1. kaupungissa on kohtaaminen ja sille paikka tällä laudalla
 *      (aarteenAvausMahdollista) — muuten pulla ostaisi tyhjän
 *      lupauksen, eikä mikään syttyisi;
 *   2. aarre on yhä auki eli jälki puuttuu kartalta (aarreAuki).
 *      Jo ostettu pulla sammuttaa tarjouksen tätä kautta:
 *      fokusAarreAvattu lukee saman kirjanpidon.
 */
function pullaTarjolla(ui, city) {
  if (!aarteenAvausMahdollista(ui, city)) return false;
  return !aarreAuki(ui, city);
}

/**
 * TARJOUSRIVI LAATIKON LOPPUUN — nappi ja Livian ääni.
 *
 * @param {object}   ui
 * @param {object}   city
 * @param {Element}  kotelo         laatikko, jonka loppuun rivi tulee
 * @param {Function} aarreAvattiin  laatikon oma siivous oston jälkeen
 * @returns {Element|null} rivi, tai null jos tarjousta ei ole
 */
function piirraPullaOstos(ui, city, kotelo, aarreAvattiin) {
  if (!pullaTarjolla(ui, city)) return null;
  const nimi = pullanNimi(ui, city);
  const rivi = html('div', 'fokus-pulla');
  const nappi = html('button', 'fokus-pulla-nappi');
  nappi.type = 'button';
  const huomio = html('p', 'fokus-pulla-huomio');
  let varmistus = false;
  let ajastin = 0;

  const koyha = () => (ui.game.player?.money ?? 0) < PULLA_HINTA;

  const paivita = () => {
    if (koyha()) {
      varmistus = false;
      nappi.disabled = true;
      nappi.classList.remove('fokus-pulla-varmistus');
      nappi.textContent = pullaKoyhaTeksti(nimi);
      huomio.textContent = PULLA_KOYHA_LIVIA;
      huomio.hidden = false;
      return;
    }
    nappi.disabled = false;
    nappi.classList.toggle('fokus-pulla-varmistus', varmistus);
    nappi.textContent = varmistus ? pullaVarmistusTeksti(nimi) : pullaNapinTeksti(nimi);
    huomio.textContent = varmistus ? PULLA_VARMISTUS_OHJE : '';
    huomio.hidden = !varmistus;
  };

  nappi.addEventListener('click', () => {
    if (!varmistus) {
      varmistus = true;
      paivita();
      sfx.play('click');
      clearTimeout(ajastin);
      ajastin = setTimeout(() => {
        varmistus = false;
        paivita();
      }, PULLA_VARMISTUS_MS);
      return;
    }
    clearTimeout(ajastin);
    const vastaus = ui.game.actionPullaVinkki(city.id, PULLA_HINTA);
    if (!vastaus.ok) {
      // Kassa ehti tyhjentyä tai pulla on jo ostettu: nappi kertoo
      // tilanteen eikä jätä pelaajaa varmistustilaan.
      varmistus = false;
      paivita();
      return;
    }
    sfx.play('coin');
    rivi.replaceChildren(html('p', 'fokus-pulla-tehty', pullaTehtyTeksti(nimi)));
    const box = ui.buildToast?.({
      kind: 'stamp',
      icon: 'kukkaro',
      text: `−${PULLA_HINTA} puntaa`,
      sub: `${nimi} Livialle`,
    });
    if (box) setTimeout(() => ui.removeToast(box), TOAST_MS.default);
    /*
     * SAMA JÄRJESTYS KUIN OIKEALLA VASTAUKSELLA: tallennus ja
     * rahapilleri ensin, sitten piste kartalle, ja pöllön kupla
     * viimeisenä — kupla ei saa luvata mitään, mitä kartalla ei vielä
     * ole. Koko render() sulkisi lehden, joten sitä ei kutsuta.
     */
    ui.onChange?.(ui.game);
    ui.renderTurnPill?.();
    ui.paivitaFokuspiste?.();
    aarreAvattiin?.();
    kuittausPinta?.(ui, pullaKuittausTeksti(nimi));
  });

  paivita();
  rivi.append(nappi, huomio);
  kotelo.appendChild(rivi);
  return rivi;
}

/**
 * PÖLLÖN KUITTAUS OIKEAN VASTAUKSEN JÄLKEEN (omistajan pelitesti
 * 25.8.2026).
 *
 * Palkinto tapahtuu muualla kuin siinä laatikossa, johon pelaaja juuri
 * vastasi: aarteen jälki syttyy KARTALLE lehden taakse ja juliste menee
 * MATKALAUKKUUN. Pöllö kertoo lyhyesti mitä tapahtui — ja mitä on vielä
 * tekemättä.
 *
 * KAKSI SÄÄNTÖÄ (omistaja): repliikki mahdollisimman lyhyt, ja jo
 * tehtyä ei luvata uudestaan. Jälkimmäinen ratkaistaan lukemalla toisen
 * tehtävän kirjanpito: jos JULISTE on jo tehty (oikein tai väärin), sitä
 * ei enää tarjota, ja jos aarre on vielä avaamatta, pöllö vinkkaa
 * siihen. Pöllö puhuu nykypäivästä, ei 1873:sta.
 *
 * `auki` on tilanne ENNEN tätä vastausta: kun aarre oli jo auki, kupla
 * ei saa kertoa jäljen syttyneen — se syttyi jo aiemmasta kysymyksestä,
 * ja tästä tuli pelkkää rahaa (omistaja 25.8.2026).
 *
 * ── KARAKTÄÄRI (Raamattu, "Viisas Pöllö" → PÖLLÖN KARAKTÄÄRI,
 * omistaja + Fable 25.8.2026) ──────────────────────────────────────
 *
 * Repliikit ovat Fablen kirjoittamia ja omistajan hyväksymiä. Pöllö on
 * IKIVANHA SILMINNÄKIJÄ-REPORTTERI: kuiva toteavuus, enintään kaksi
 * virkettä, EI HUUTOMERKKEJÄ. Vanhat versiot ("Aarteen jälki hehkuu nyt
 * kartalla vihreänä", "Juliste on nyt kokoelmassasi") olivat pelin
 * kertojaääntä eivätkä kenenkään puhetta — ne kertoivat mitä ruudulla
 * tapahtui, eivät sitä kuka katsoo.
 *
 * KAHDEN VIRKKEEN KATTO PITÄÄ, VAIKKA ASIOITA ON KAKSI. Kun samaan
 * kuplaan kuuluu sekä tulos että vinkki tekemättömästä tehtävästä,
 * TULOS lyhenee (AARRE_RAHAA → AARRE_RAHAA_LYHYT, JULISTE_KEHU →
 * JULISTE_TALTEEN) eikä vinkki jää pois: vinkki on pelaajalle uutta
 * tietoa, kehu ei.
 */

/*
 * Aarteen jälki syttyi juuri. Sanamuoto selkeytettiin omistajan
 * pyynnöstä 26.8.2026 ("liian kryptinen") — opastus voittaa tässä
 * pöllön kuivan heiton, kuten lehtivinkissäkin.
 */
const AARRE_SYTTYI = 'Aarteen jälki syttyi: vihreä piste kartalla näyttää paikan.';
/** Aarre oli jo auki: jäljellä on raha, ja pöllö laskee sen. */
const AARRE_RAHAA = 'Oikein. Puntia matkakassaan — niitä ei laske kukaan muu kuin minä.';
/** Sama asia yhdellä virkkeellä, kun perään tulee vielä julistevinkki. */
const AARRE_RAHAA_LYHYT = 'Oikein, puntia matkakassaan.';
/*
 * Juliste irtosi. Matkalaukku mainitaan aina (omistaja 28.8.2026:
 * pelaajalle kerrotaan minne juliste menee ja mistä sen löytää);
 * kehu jää pois, jos tilalle tulee vinkki.
 */
const JULISTE_TALTEEN = 'Juliste talteen matkalaukkuun.';
const JULISTE_KEHU =
  'Laitetaanpa tää matkalaukkuun talteen, kun on noin hieno. Hyvä silmä.';

function kuittausTeksti(ui, city, tehtava, auki) {
  const vastattu = (t) => Boolean(ui.game.minitehtavatVastatut?.has(tehtavanAvain(ui, city, t)));
  if (avaaAarteen(tehtava)) {
    const juliste = kaupunginTehtavat(ui, city)
      .find((t) => t.palkinto === 'juliste' && !vastattu(t));
    if (!juliste) return auki ? AARRE_RAHAA : AARRE_SYTTYI;
    return `${auki ? AARRE_RAHAA_LYHYT : AARRE_SYTTYI} `
      + `${sivunSuunta(tehtava, juliste)}${juliste.otsake}-tehtävästä irtoaa vielä juliste.`;
  }
  const aarre = auki ? null : aarteenAvaajat(ui, city).find((t) => !vastattu(t));
  if (!aarre) return JULISTE_KEHU;
  return `${JULISTE_TALTEEN} Aarteen jäljen paljastaa ${aarre.otsake} -tehtävä.`;
}

/**
 * "Seuraavan sivun " / "Edellisen sivun " — vai pelkkä "Lehden "?
 *
 * Sivunumerot ovat datassa (js/packs/fokusvirta-ateena.js), joten
 * suunta luetaan sieltä eikä oleteta julistetta aina jälkimmäiseksi.
 * Kulttuurivisalla numeroa ei ole (VISA_TEHTAVA), ja silloin pöllö
 * jättää suunnan sanomatta — väärä suunta olisi pahempi kuin ei mitään.
 */
function sivunSuunta(tehtava, kohde) {
  if (!Number.isFinite(tehtava?.sivu) || !Number.isFinite(kohde?.sivu)) return 'Lehden ';
  return kohde.sivu > tehtava.sivu ? 'Seuraavan sivun ' : 'Edellisen sivun ';
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
 * nimi datasta — se on Raamatun vaatima "näkyvä nimilaatta" — ja sen
 * alla lukee yhdellä rivillä, mitä oikeasta vastauksesta seuraa.
 * Vihjerivi näkyy vain vastaamattomassa laatikossa: ratkaistussa se
 * olisi vanha lupaus, ja palkinto on jo saatu.
 *
 * AARRE JO AUKI → LAATIKKO PALAA LEHDEN KYSYMYKSEKSI (omistaja
 * 25.8.2026). Sivu piirretään uudelleen joka käännöksellä (js/lehti.js
 * naytaTutkiSivu → js/maalehti.js piirraKategoria), joten otsake ja
 * vihje ehtivät muuttua heti, kun aarre aukeaa toisen sivun
 * kysymyksestä.
 */
function piirraNimettyTehtava(ui, kohde, city, tehtava) {
  const visa = tehtava.visa;
  if (!visa?.vaihtoehdot?.length) return;
  lataaTehtavaTyyli();
  /*
   * TEHTÄVÄKOHTAINEN JULISTE VOITTAA KAUPUNGIN OLETUKSEN (omistajan
   * tilaus v1119, kohta 21: *"tehtävä voi kantaa oman juliste-avaimen
   * (esim. tehtava.juliste = 'ateena-nike'), joka voittaa kaupungin
   * oletuksen — pelaaja voi näin saada samasta kaupungista USEAMMAN
   * eri julisteen eri tehtävistä"*).
   *
   * Avain kulkee tästä eteenpäin kaikkialle, missä ennen käytettiin
   * kaupungin tunnusta: kokoelmaan (game.myonnaJuliste), palkintokuvaan
   * ja lunastukseen. Tuntematon avain putoaa kaupungin oletukseen,
   * jottei kirjoitusvirhe datassa vie palkintoa kokonaan.
   */
  const julisteAvain = tehtava.juliste && julisteAvaimella(tehtava.juliste)
    ? tehtava.juliste : city.id;
  const juliste = tehtava.palkinto === 'juliste' ? kaupunginJuliste(julisteAvain) : null;
  // Aarteen avaajan nimilaatta riippuu tilanteesta; juliste on aina
  // juliste, koska sen palkinto ei kulu toisen kysymyksen mukana.
  const rahaaVain = avaaAarteen(tehtava) && aarreAuki(ui, city);
  const nimilaatta = rahaaVain ? AARRE_AUKI_OTSAKE : tehtava.otsake;
  const laatikko = html(
    'div',
    `minitehtava fokus-tehtava${juliste ? ' minitehtava-palkinnollinen' : ''}`,
  );
  const otsikko = html('p', 'minitehtava-otsikko', nimilaatta);
  laatikko.appendChild(otsikko);
  const avain = tehtavanAvain(ui, city, tehtava);

  if (ui.game.minitehtavatVastatut?.has(avain)) {
    /*
     * Takautuva myöntö samalla säännöllä kuin lehden minitehtävässä
     * (js/ui.js piirraMinitehtava): oikein vastannut saa julisteensa,
     * vaikka palkinto olisi lisätty vasta vastauksen jälkeen. Väärin
     * vastannut ei saa sitä takaoven kautta.
     */
    const voitettu = Boolean(juliste)
      && (ui.game.minitehtavatOikein?.has(avain) || ui.game.julisteet?.has(julisteAvain));
    if (juliste) {
      const myonto = voitettu ? ui.game.myonnaJuliste(julisteAvain) : { uusi: false };
      ui.piirraJulistepalkinto(laatikko, julisteAvain, juliste, voitettu);
      if (myonto.uusi) ui.onChange?.(ui.game);
    }
    laatikko.appendChild(html('p', 'minitehtava-kysymys',
      visa.fakta ?? 'Tämän sivun minitehtävä on jo ratkaistu.'));
    /*
     * PULLA JUURI TÄSSÄ ON UMPIKUJAN AVAIN. Väärin vastannut ei voi
     * enää sytyttää jälkeä tästä kysymyksestä — mutta pullan hän voi
     * yhä ostaa, ja tarjous kuuluu siihen laatikkoon, josta lupaus
     * juuri meni. (Tarjous piirtyy vain jos aarre on yhä auki; ks.
     * pullaTarjolla.)
     */
    if (avaaAarteen(tehtava)) {
      piirraPullaOstos(ui, city, laatikko, () => {
        otsikko.textContent = AARRE_AUKI_OTSAKE;
      });
    }
    kohde.appendChild(laatikko);
    return;
  }

  // Vihjerivi heti nimilaatan alle: se kertoo mitä palkinnosta seuraa.
  // Datan oma vihje lupaa aarteen, joten se väistyy kun aarre on auki.
  let vihjeteksti = tehtava.vihje ?? (avaaAarteen(tehtava) ? AARTEEN_VIHJE : JULISTEEN_VIHJE);
  if (rahaaVain) vihjeteksti = AARRE_AUKI_VIHJE;
  const vihjerivi = vihjeteksti ? html('p', 'fokus-tehtava-vihje', vihjeteksti) : null;
  if (vihjerivi) laatikko.appendChild(vihjerivi);
  // Palkinto ensin, jotta teksti kiertää sen (float oikealle, css).
  const palkinto = juliste
    ? ui.piirraJulistepalkinto(laatikko, julisteAvain, juliste, ui.game.julisteet?.has(julisteAvain))
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
      // Tilanne ENNEN vastausta: kuittaus ei saa kertoa jäljen
      // syttyneen, jos se paloi kartalla jo tähän napautettaessa.
      const oliAuki = aarreAuki(ui, city);
      const vastaus = ui.game.actionMinitehtava(
        city.id, tehtavanAihe(tehtava), oikein, FOKUS_TEHTAVA_PALKKIO,
      );
      if (!vastaus.ok) return;
      // Vihjerivi oli lupaus vastaamattomalle; nyt tilalle tulee tulos.
      vihjerivi?.remove();
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
          sub: `${nimilaatta} ratkesi`,
        });
        if (box) setTimeout(() => ui.removeToast(box), TOAST_MS.default);
      }
      if (oikein && juliste) {
        // Juliste kokoelmaan heti, katselu vasta napista (omistajan
        // tilaus 22.8.2026): oikean vastauksen tekstin ehtii lukea.
        ui.game.myonnaJuliste(julisteAvain);
        palkinto?.merkitseVoitetuksi();
        ui.elavoitaLaukku?.();
        const lunasta = html('button', 'minitehtava-lunastus', 'Lunasta juliste');
        lunasta.type = 'button';
        lunasta.addEventListener('click', () => ui.naytaJuliste(julisteAvain));
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
      if (oikein && avaaAarteen(tehtava)) ui.paivitaFokuspiste?.();
      /*
       * PÖLLÖ KERTOO PALKINNOSTA VIIMEISENÄ. Kupla nousee pöllönapista
       * lehden päälle, ja se on tässä vasta kaiken muun jälkeen kahdesta
       * syystä: piste on jo sytytetty (kupla ei saa luvata mitään, mitä
       * kartalla ei ole), ja kirjanpito on jo tallessa — kuittausteksti
       * lukee siitä, kumpi tehtävä on vielä tekemättä.
       */
      if (oikein) kuittausPinta?.(ui, kuittausTeksti(ui, city, tehtava, oliAuki));
    });
    vaihtoehdot.appendChild(nappi);
  });
  laatikko.appendChild(vaihtoehdot);
  laatikko.appendChild(tulos);
  /*
   * TARJOUS VASTAUSLIPUKKEIDEN ALLE, EI NIIDEN SEKAAN. Se on eri asia
   * kuin vastaaminen — toinen tie samaan vinkkiin — ja sen on näytettävä
   * siltä myös laatikossa (css/fokusvirta.css .fokus-pulla).
   */
  if (avaaAarteen(tehtava)) {
    piirraPullaOstos(ui, city, laatikko, () => {
      // Lupaus on lunastettu rahalla: nimilaatta ja vihje kertovat
      // saman kuin sivun seuraava piirto kertoisi (rahaaVain).
      otsikko.textContent = AARRE_AUKI_OTSAKE;
      if (vihjerivi) vihjerivi.textContent = AARRE_AUKI_VIHJE;
    });
  }
  kohde.appendChild(laatikko);
}

/* ==================== KULTTUURIVISA AARTEEN AVAAJANA ================ */

/**
 * KYTKENTÄKOHTA js/lehti.js:n naytaTutkiSivussa.
 *
 * Omistajan tilaus 25.8.2026: *"myös vanha kulttuurivisa ('LEHDEN
 * KYSYMYS' -laatikko) muuntuu aarteen avaavaksi."* Laatikko itse
 * piirretään js/ui.js:n naytaKulttuurissa eikä täällä, joten sitä ei
 * rakenneta uudelleen vaan PUETAAN: nimilaatta ::before-yliajolla
 * (css/fokusvirta.css), vihjerivi ensimmäiseksi lapseksi ja kirjaus
 * aarteen avaajien joukkoon.
 *
 * MIKSI NÄIN EIKÄ UUTENA LAATIKKONA. Visan kysymysdata, rahapalkkio ja
 * oma kirjanpito (game.actionKulttuuri) ovat olleet paikallaan
 * kauemmin kuin koko fokusmoodi, ja ne palvelevat myös kaikkia niitä
 * kaupunkeja, joissa kevyttä kulkua ei ole. Yksi laatikko kahdella
 * otsakkeella on pienempi muutos kuin kaksi laatikkoa samasta
 * kysymyksestä — eikä pelaajan tarvitse oppia uutta pintaa.
 *
 * Kutsu tulee joka sivunäytöllä, myös silloin kun visa on piilossa:
 * silloin funktio siivoaa jälkensä ja palaa. Näin edellisen kaupungin
 * otsake ei jää roikkumaan seuraavan lehteen.
 */
export function fokusVisanKehys(ui) {
  const laatikko = ui?.arrivalKulttuuriVisa;
  if (!laatikko) return;
  laatikko.classList.remove('fokus-visa', 'fokus-visa-aarre');
  laatikko.querySelector('.fokus-tehtava-vihje')?.remove();
  /*
   * PULLARIVI SIIVOTAAN SAMOIN KUIN VIHJERIVI. Visan laatikko on
   * js/ui.js:n oma elementti, joka elää sivulta toiselle — ilman tätä
   * edellisen kaupungin tarjous jäisi roikkumaan seuraavan lehteen ja
   * sama nappi kertyisi laatikkoon monta kertaa.
   */
  laatikko.querySelector('.fokus-pulla')?.remove();
  if (ui.lehtitila?.tutkiTila !== 'kaupunki') return;
  const city = ui.game?.cityOf?.();
  if (!city || ui.lehtitila.arrivalShownFor !== city.id) return;
  if (!kaupunginVisa(ui, city)) return;
  lataaTehtavaTyyli();
  laatikko.classList.add('fokus-visa');
  kytkeVisanNapit(ui, city);
  /*
   * TARJOUS ON VOIMASSA MYÖS VASTATUSSA LAATIKOSSA (umpikujan esto).
   * Visaan vastataan kerran: väärin vastannut ei voi enää sytyttää
   * jälkeä täältä, ja juuri silloin pulla on ainoa jäljellä oleva tie.
   * Tarjous piirtyy vain jos aarre on yhä auki (pullaTarjolla).
   */
  const pullaSiivous = () => {
    laatikko.classList.remove('fokus-visa-aarre');
    const vihje = laatikko.querySelector('.fokus-tehtava-vihje');
    if (vihje) vihje.textContent = AARRE_AUKI_VIHJE;
  };
  // Vastattuun laatikkoon ei kuulu lupausta: sen otsake on lehden oma
  // ja tilalla lukee jo js/ui.js:n kuittaus.
  if (visaanVastattu(ui, city)) {
    piirraPullaOstos(ui, city, laatikko, pullaSiivous);
    return;
  }
  const rahaaVain = aarreAuki(ui, city);
  if (!rahaaVain) laatikko.classList.add('fokus-visa-aarre');
  laatikko.insertBefore(
    html('p', 'fokus-tehtava-vihje', rahaaVain ? AARRE_AUKI_VIHJE : AARTEEN_VIHJE),
    laatikko.firstChild,
  );
  piirraPullaOstos(ui, city, laatikko, pullaSiivous);
}

/**
 * Onko visaan vastattu tässä kaupungissa?
 *
 * Kaksi kirjanpitoa, koska niillä on eri ikä: `kulttuuriVastatut` on
 * visan oma ja tuntee myös ennen tätä ominaisuutta pelatut vastaukset,
 * `minitehtavatVastatut` taas kevyen kulun peili (ks. visaanVastattiin).
 */
function visaanVastattu(ui, city) {
  if (ui.game.minitehtavatVastatut?.has(tehtavanAvain(ui, city, VISA_TEHTAVA))) return true;
  return Boolean(ui.game.kulttuuriVastatut?.has(`${ui.game.pack.id}:${city.id}`));
}

/**
 * Oma kuuntelija visan vastauslipukkeisiin.
 *
 * Lipukkeet syntyvät js/ui.js:n naytaKulttuurissa omine
 * kuuntelijoineen; tämä lisätään niiden PERÄÄN, joten se ajetaan vasta
 * kun raha on maksettu ja visan oma kirjanpito on tallessa. Merkintä
 * lipukkeessa (dataset) pitää huolen siitä, ettei sama nappi saa kahta
 * kuuntelijaa, vaikka sivua selattaisiin edestakaisin.
 *
 * Oikea vaihtoehto luetaan samasta datasta kuin ui.js lukee sen
 * (KULTTUURIT), koska napissa itsessään ei ole tietoa oikeellisuudesta
 * — vain teksti.
 */
function kytkeVisanNapit(ui, city) {
  const kysymys = kaupunginVisa(ui, city);
  const kotelo = ui.arrivalKulttuuriVaihtoehdot;
  if (!kysymys || !kotelo) return;
  [...kotelo.children].forEach((nappi, i) => {
    if (nappi.dataset.fokusVisa) return;
    nappi.dataset.fokusVisa = '1';
    nappi.addEventListener('click', () => visaanVastattiin(ui, city, i === kysymys.correct));
  });
}

/**
 * VISAN VASTAUS KEVYEN KULUN KIRJANPITOON.
 *
 * Visan oma kirjanpito (`game.kulttuuriVastatut`) muistaa VAIN sen,
 * että kysymykseen on vastattu — ei sitä, meniköhän oikein. Aarteen
 * jälki taas saa syttyä vain oikeasta vastauksesta ja sen on
 * säilyttävä tallennuksen yli, joten vastaus peilataan samoihin
 * joukkoihin, joissa lehden nimetyt tehtävät jo asuvat.
 *
 * MIKSI JOUKKOIHIN SUORAAN EIKÄ game.actionMinitehtavan kautta: tämä
 * ei ole uusi pelisiirto vaan MERKINTÄ jo tehdystä siirrosta. Raha on
 * maksettu (game.actionKulttuuri), vuoro kulunut ja tapahtuma kirjattu
 * lokiin; actionMinitehtava kirjaisi saman vastauksen toistamiseen ja
 * lisäisi lokiin rivin "+0 puntaa", jota pelaaja ei ansainnut.
 */
function visaanVastattiin(ui, city, oikein) {
  const avain = tehtavanAvain(ui, city, VISA_TEHTAVA);
  if (ui.game.minitehtavatVastatut?.has(avain)) return;
  // Tilanne ENNEN kirjausta: kertooko pöllö jäljen syttyneen vai rahasta.
  const oliAuki = aarreAuki(ui, city);
  ui.game.minitehtavatVastatut?.add(avain);
  if (oikein) ui.game.minitehtavatOikein?.add(avain);
  ui.onChange?.(ui.game);
  // Lupaus on lunastettu: nimilaatta palaa lehden omaksi ja vihje pois.
  ui.arrivalKulttuuriVisa?.classList.remove('fokus-visa-aarre');
  ui.arrivalKulttuuriVisa?.querySelector('.fokus-tehtava-vihje')?.remove();
  if (!oikein) return;
  // Sama järjestys kuin nimetyssä tehtävässä: piste ensin kartalle,
  // vasta sitten pöllö — kupla ei saa luvata mitään, mitä siellä ei ole.
  ui.paivitaFokuspiste?.();
  kuittausPinta?.(ui, kuittausTeksti(ui, city, VISA_TEHTAVA, oliAuki));
}
