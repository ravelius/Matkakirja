// Peili: pelin kaikista repon ulkopuolelta ladattavista kuvista ja
// äänistä on oma kopio yhdessä paikassa (ämpäri, ks. R2_JUURI alla).
// Peli hakee aineiston ensisijaisesti sieltä, jottei yksi kaatunut
// palvelin tai poistettu tiedosto riko peliä kesken matkan. Alkuperäinen
// osoite jää varareitiksi.
//
// Peilin polku LASKETAAN samalla säännöllä kuin peilaustyökalussa
// (tools/peilaa-media.mjs). Erillistä hakemistotiedostoa ei siis tarvita
// eikä 298 tiedostonimeä toisteta pelin koodissa. tests/media.test.mjs
// vartioi, etteivät säännöt pääse eriytymään: se tarkistaa jokaisen
// paketeissa mainitun tiedoston peilin manifestia vasten.

/*
 * Koko peili on omassa ämpärissään (Cloudflare R2).
 *
 * Aineisto oli GitHub Pagesissa, jonka suositusraja on 1 Gt sivustoa
 * kohti. Pelkkä Euroopan äänipuoli vei 569 Mt, eikä koko maailma olisi
 * mahtunut. Äänet siirtyivät ensin, kuvat ja liput perässä — nyt
 * media-repoa ei enää tarvita lainkaan.
 *
 * Juuria on kaksi vakiota, vaikka ne osoittavat samaan paikkaan. Ne
 * ovat eri asioita: kuvat ja äänet voi tarvittaessa erottaa taas eri
 * palvelimille vaihtamalla toisen. Katkaisija erottaa lajit polusta
 * (peilinLaji alla), ei juuresta, joten yhteinen osoite ei sekoita
 * niitä keskenään.
 *
 * Alkuperäinen lähde (Wikimedia Commons, archive.org, Freesound) jää
 * yhä varareitiksi, jos ämpäri ei vastaa.
 *
 * Ämpärillä on CORS-sääntö, joka sallii GETin osoitteesta
 * https://ravelius.github.io. Sitä tarvitaan kahteen kohtaan:
 * js/sound.js loadRealSamples hakee tehosteet fetchillä ja purkaa ne
 * decodeAudioDatalla, ja sw.js noutaa kuvat omaan pitkäikäiseen
 * koriinsa mode: 'cors' -pyynnöllä. Tavallinen <audio>- ja
 * <img>-lataus ei CORSia tarvitse, joten muualta avattuna — esimerkiksi
 * yhden tiedoston versio levyltä — peli toimii silti: nuo kaksi kohtaa
 * putoavat alkuperäiseen lähteeseen.
 */
// Oma verkkotunnus 6.9.2026 (omistaja osti matkakirja.app:n; R2:n
// pub-*.r2.dev-osoite rajoitti pyyntötahtia ja vastasi 429:llä).
// Liitetty ämpäriin .github/workflows/r2-verkkotunnus.yml:llä.
const R2_JUURI = 'https://media.matkakirja.app/';
export const PEILI_JUURI = R2_JUURI;
export const AANI_JUURI = R2_JUURI;

/*
 * REPON OMAT ÄÄNITIEDOSTOT OVAT MYÖS ÄMPÄRISSÄ (linjaus 16.8.2026).
 *
 * Ämpärissä on kaksi äänikansiota, ja ne ovat eri asioita:
 *
 *   aanet/  ulkopuolelta peilatut äänimaisemat (Freesound, archive.org).
 *           Nimi lasketaan lähdeosoitteesta, ks. peiliAaniPolku.
 *   audio/  pelin omat äänitteet, jotka syntyvät täällä (ElevenLabs-
 *           luennat, tehosteet, huudahdukset, visamusiikki). Nimi on
 *           sama kuin repossa: assets/audio/x.mp3 -> audio/x.mp3.
 *
 * Jälkimmäinen syntyi siitä, että sw.js esilatasi joka asennuksessa 420
 * äänitiedostoa, yhteensä noin 200 megatavua — ja niistä 195 Mt oli
 * luentoja, joista yksittäinen pelaaja kuulee murto-osan. Nyt esiladataan
 * vain ydinsetti (alla) ja loput haetaan ämpäristä sitä mukaa kuin niitä
 * kuunnellaan. Vienti: .github/workflows/vie-aanet.yml.
 *
 * OFFLINE-PELAUS EI OLE TAVOITE (omistajan linjaus 16.8.2026):
 * verkkoyhteyden saa olettaa, ja välimuisti on nopeutta varten.
 */
const AANI_ALIPOLKU = 'audio/';

/*
 * YDINSETTI: esiladataan asennuksessa ja soitetaan repon omasta polusta.
 *
 * Nämä kaksi lajia ovat pelin nopeimmat äänet: tehoste kuuluu samalla
 * hetkellä kun sormi osuu laattaan, ja huudahdus samalla hetkellä kun
 * aarre paljastuu. Verkkohaku ehtisi juuri ja juuri myöhästyä, ja
 * myöhästynyt tehoste on pahempi kuin ei tehostetta lainkaan. Yhteensä
 * ne ovat 39 tiedostoa ja noin 1,3 Mt, eli asennus pysyy kevyenä.
 *
 * Ydinsetti EI kulje ämpärin kautta lainkaan — muuten sw.js:n
 * esilataama kopio jäisi käyttämättä, koska peli pyytäisi eri osoitetta.
 * Nämä tiedostot jäävät siis repoon myös silloin, kun loput poistetaan.
 */
const YDINAANI = /^(?:efekti|huudahdus)-/;

/**
 * Repon oman äänitiedoston nimi polusta, tai null jos polku ei osoita
 * assets/audio-kansioon.
 *
 * Sama polku kirjoitetaan pelissä kahdella tavalla ('assets/audio/x.mp3'
 * ja './assets/audio/x.mp3'), joten molemmat kelpaavat. Kysely- ja
 * ankkuriosat (#alku=20) eivät kuulu nimeen — sama sääntö kuin
 * peiliAaniPolussa.
 */
export function omaAaniPolku(polku) {
  if (typeof polku !== 'string') return null;
  const osuma = polku.match(/(?:^|\/)assets\/audio\/([^/?#]+)/);
  return osuma ? osuma[1] : null;
}

/**
 * Repon oman äänitiedoston osoite: ämpäri ensin, repon polku varalla.
 *
 * TÄMÄ ON PELIN AINOA PAIKKA, jossa assets/audio-polusta tehdään
 * soitettava osoite. Kutsuja säilyttää alkuperäisen polun ja siirtyy
 * siihen, jos ämpäri pettää (onPeilista + peiliPetti('aanet') kuten
 * äänimaisemilla) — varareitti toimii niin kauan kuin tiedosto on vielä
 * repossa.
 *
 * Ydinsetti ja katkaisijan sammuttama peili palauttavat polun
 * sellaisenaan, jolloin tiedosto tulee pelin omasta välimuistista.
 */
export function aaniUrl(polku) {
  const nimi = omaAaniPolku(polku);
  if (!nimi || YDINAANI.test(nimi)) return polku;
  if (!peiliKaytossa('aanet')) return polku;
  const versio = UUSITUT_AANET[nimi];
  return `${AANI_JUURI}${AANI_ALIPOLKU}${nimi}${versio ? `?v=${versio}` : ''}`;
}

/*
 * MUSIIKKIPALETIN MOOTTORIPÄÄTE — YKSI KYTKIN NELJÄLLE POLULLE
 *
 * Omistajan linjaus 5.9.2026 illalla, sanatarkasti: *"kaikki musiikki
 * lyrialla"*. Siirtymä- ja linssiraidat vaihtuivat Lyria 3.5:een jo
 * aiemmin samana päivänä; paletti (pohjavire, visamusiikki, kaksi
 * aarreaihetta) generoidaan Lyrialla omalla päätteellä `-lyria`, jottei
 * vanhoja ElevenLabs-raitoja ylikirjoiteta ennen kuin uudet on kuultu
 * (tools/generoi-musiikki.mjs, tools/lyria.mjs `raidanTiedosto`).
 *
 * NELJÄ SOITTOKOHTAA, YKSI VAKIO. Pohjavire (js/ambience-stream.js),
 * visamusiikki (js/aani-ehdokkaat.js), kaksi aarreaihetta (js/ui.js) ja
 * työhuoneen kuuntelulehti (js/tyohuone-musiikki.js) rakentavat polkunsa
 * kaikki `musaPolku`-apurilla. Vaihto on siis yhden merkkijonon vaihto
 * eikä neljän tiedoston etsintä — ja paluu vanhaan yhtä helppo.
 *
 * KÄÄNNÄ NÄIN: kun .github/workflows/generoi-musiikki.yml on ajettu
 * moottorilla `lyria` ja raidat vastaavat ämpäristä (HTTP 200
 * osoitteista `<ämpäri>audio/musa-pohja-lyria.mp3`,
 * `…/musa-visa-2-lyria.mp3`, `…/musa-aarre-lyria.mp3` ja
 * `…/musa-paaaarre-lyria.mp3` — työnkulun PR mergetään ensin, koska
 * vie-aanet.yml vie ne vasta silloin), vaihda arvoksi '-lyria'.
 * Ennen sitä arvo on '' ja vanhat raidat soivat: puuttuva tiedosto
 * hiljentäisi paletin, ja hiljainen peli näyttää rikkinäiseltä.
 */
export const MUSIIKIN_PAATE = '-lyria';

/**
 * Musiikkipaletin raidan polku repossa: `musaPolku('musa-pohja')` →
 * `assets/audio/musa-pohja.mp3` (tai `-lyria`, ks. MUSIIKIN_PAATE).
 * Soitto-osoite lasketaan tästä `aaniUrl`/`aaniOsoite`-funktiolla,
 * eli ämpärin `audio/`-kansiosta.
 */
export function musaPolku(nimi) {
  return `assets/audio/${nimi}${MUSIIKIN_PAATE}.mp3`;
}

/*
 * UUSIKSI ÄÄNITETYT tiedostot. Ämpäri ja välimuistit (selaimen HTTP,
 * r2.dev-reuna, sw:n äänikori) pitävät ääntä osoitteen perusteella
 * jopa 30 vrk, joten SAMALLA NIMELLÄ korvattu äänite jäisi pelaajilla
 * vanhaksi viikoiksi. Nimi pysyy nimisäännön takia samana molemmin
 * puolin (ks. vie-aanet.yml), ja tuoreus hoidetaan kyselyversiolla:
 * kun äänite äänitetään uusiksi, sen numero nousee tässä. Ämpäri
 * ohittaa kyselyn, välimuistit näkevät uuden osoitteen.
 */
const UUSITUT_AANET = {
  // 28.8.2026: avaus ja avauslento uusiksi (nimetön perillinen,
  // sinä-muoto).
  'intro-puhe.mp3': 2,
  'puhe-lento-alku.mp3': 2,
};

/*
 * AIKAKAUSJULISTEET (21.8.2026): pelin oma painotuote, joka asuu vain
 * ämpärissä. Omistajan linjaus samalta päivältä on "kaikki aina
 * ämpäriin eikä repoon", joten julisteille ei ole repokopiota eikä
 * ulkopuolista alkuperäislähdettä — varareittiä ei siis ole, ja
 * puuttuva tiedosto tarkoittaa yksinkertaisesti sitä, ettei julistetta
 * ole vielä viety ämpäriin. Kutsuja piilottaa kuvapaikan silloin
 * (js/ui.js), eikä mikään muu rikkoudu.
 *
 * Nimi on sama molemmin puolin (julisteet/istanbul.png) samasta syystä
 * kuin repon omilla äänillä: kaksi kopiota nimeämissäännöstä ehtivät
 * kerran eriytyä, eikä tälle säännölle ole mitään tarvetta.
 */
const JULISTE_ALIPOLKU = 'julisteet/';

/** Aikakausjulisteen osoite ämpärissä. */
export function julisteUrl(tiedosto) {
  return `${PEILI_JUURI}${JULISTE_ALIPOLKU}${tiedosto}`;
}

/*
 * LAATTAPYRAMIDI (30.8.2026): maailmanlaajuinen esirenderöity kartta
 * laattoina (tools/generoi-laattapyramidi.mjs, js/laattapyramidi.js).
 * Sama ämpäri ja sama `julisteet/`-juuri kuin julisteilla, samasta
 * syystä: vie-julisteet.yml vie ämpäriin vain sen kansion.
 *
 * VUOSIKERTAA EI OLE, KOSKA VERSIO ON POLUSSA. Laatta on
 * `pyramidi/<versio>/z3/12/7.webp`, ja uusi ajo saa uuden versio-osan —
 * yksikään vanha osoite ei muutu, joten laatat kelpaavat ikuiseen
 * välimuistiin eikä sisältöpäivitys voi jättää selaimeen puolikasta
 * karttaa kahdesta eri ajosta. Versiopolku pakottaa lataamaan vain ne
 * laatat, joita oikeasti katsotaan.
 */
const PYRAMIDI_ALIPOLKU = 'julisteet/pyramidi/';

/**
 * Laattapyramidin osoite ämpärissä.
 * @param {string} polku esim. 'pyramidi.json' tai 'z3/12/7.webp'
 */
export function pyramidiUrl(polku) {
  return `${PEILI_JUURI}${PYRAMIDI_ALIPOLKU}${polku}`;
}

/*
 * REPON ASSET-KUVAT ÄMPÄRIIN (omistajan päätös 2.9.2026: "R2-ämpäriin,
 * JPG-muodossa").
 *
 * Pelin omat generoidut kuvat — kohdekartan miniatyyrit, eläintäkyjen
 * lähikuvat, aarrekuvat sekä karttanostojen ja Matkakirjan ihmeiden
 * havainnekuvat — ovat tähän asti asuneet repossa. Uudet kuvat menevät
 * vain ämpäriin JPG:nä, ja vanhat siirretään sinne erissä
 * (.github/workflows/vie-assetit.yml). Siirtymä kestää useamman
 * julkaisun, joten pelin on osattava lukea kumpaakin.
 *
 * SIIRTYMÄ ON YKSI KYTKINTAULU EIKÄ SATA POLKUA. `R2_ASSETIT` kertoo
 * lajeittain, onko vanha aineisto jo ämpärissä. Kun erä on viety ja
 * takaisinluku vihreä, lippu kääntyy `true`:ksi — vasta silloin repon
 * polut käännetään ämpäriosoitteiksi, ja vasta sen jälkeen tiedostot
 * voi poistaa reposta. Yksikään datataulu ei muutu siirrosta.
 *
 * PELKKÄ TUNNUS TARKOITTAA AINA ÄMPÄRIÄ. Datassa saa lukea joko vanha
 * repon polku (`assets/kartat/miniatyyrit/x.webp`) tai pelkkä tunnus
 * (`ateena-akropolis-museo`). Tunnuksella ei ole repokopiota lainkaan —
 * se on uusi kuva, joka syntyi suoraan ämpäriin — joten se ei ole
 * kytkimen alainen. Puuttuva kuva on tavallinen tilanne eikä virhe:
 * kutsuja piilottaa kuvapaikan (kohdekartalla piirros putoaa
 * varatäpläksi), kunnes kuvaputki on toimittanut tiedoston.
 */
const ASSET_ALIPOLKU = 'kohtaamiset/';

/**
 * Asset-perheet: lajin tunnus → kansio repossa. Sama nimi on ämpärissä
 * polun `kohtaamiset/<laji>/` alla, joten vientityökalu ja peli eivät
 * voi olla eri mieltä siitä, minne tiedosto meni.
 */
export const ASSET_KANSIOT = {
  miniatyyrit: 'assets/kartat/miniatyyrit',
  elaimet: 'assets/elaimet',
  aarteet: 'assets/aarteet',
  nostot: 'assets/kartat/nostot',
  ihmeet: 'assets/kartat/ihmeet',
};

/**
 * Onko lajin VANHA repoaineisto jo ämpärissä? Oletus on false: peli
 * lukee repon polkua, kunnes erä on viety ja tarkistettu.
 */
export const R2_ASSETIT = {
  miniatyyrit: true,
  elaimet: true,
  aarteet: true,
  nostot: true,
  ihmeet: true,
};

/**
 * Asset-kuvan osoite: ämpäri kun kuva on siellä, repon polku muuten.
 *
 * @param {string} laji ASSET_KANSIOT-avain. Ratkaisee vain PELKÄN
 *   TUNNUKSEN tapauksen — valmis polku kertoo lajinsa itse, jotta
 *   yhteiset kuvakohdat (esim. suurennos, joka näyttää sekä ihme- että
 *   nostokuvia) eivät joudu arvaamaan lajia kutsupaikassa.
 * @param {string} tiedosto repon polku, pelkkä tunnus tai valmis osoite.
 */
export function assetOsoite(laji, tiedosto) {
  if (typeof tiedosto !== 'string' || !tiedosto) return tiedosto;
  // Valmis osoite (ämpäri tai mikä tahansa muu) menee sellaisenaan.
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(tiedosto)) return tiedosto;
  /*
   * Pelkkä tunnus: uusi kuva, joka on vain ämpärissä. Muoto on JPG —
   * paitsi MINIATYYREILLÄ, jotka ovat syvättyjä piirroksia paperin
   * päällä ja tarvitsevat alfakanavan (omistajan havainto 2.9.2026 ilta:
   * "Kuvaputken tekemiä uusia kuvia ei ole syvätty" — M1:n JPG:t
   * näkyivät beigeinä laatikkoina). Miniatyyri luetaan PNG:nä; JPG-
   * versio jää ämpäriin käyttämättä, ja kunnes PNG on siellä, 404
   * pudottaa merkin varatäpläksi kuten ennenkin (Raamattu, KUVAMUOTO
   * ON JPG: poikkeus liput ja miniatyyrit).
   */
  if (!tiedosto.includes('/')) {
    if (!ASSET_KANSIOT[laji]) return tiedosto;
    const pääte = laji === 'miniatyyrit' ? 'png' : 'jpg';
    return `${PEILI_JUURI}${ASSET_ALIPOLKU}${laji}/${tiedosto}.${pääte}`;
  }
  const osuma = Object.entries(ASSET_KANSIOT)
    .map(([nimi, kansio]) => [nimi, tiedosto.indexOf(`${kansio}/`)])
    .find(([, i]) => i !== -1);
  if (!osuma) return tiedosto;
  const [nimi, i] = osuma;
  if (!R2_ASSETIT[nimi]) return tiedosto;
  /*
   * Katkaisijan ollessa auki repon polku on yhä oikea vastaus — niin
   * kauan kuin tiedosto on vielä repossa. Kun se on poistettu, lippu on
   * ollut päällä jo julkaisun verran eikä varareittiä tarvita: 404
   * käyttäytyy silloin samoin kuin ennen siirtoa puuttuva kuva.
   */
  if (!peiliKaytossa('kuvat')) return tiedosto;
  const hanta = tiedosto.slice(i + ASSET_KANSIOT[nimi].length + 1);
  return `${PEILI_JUURI}${ASSET_ALIPOLKU}${nimi}/${hanta}`;
}

/**
 * Turvallinen tiedostonimi mistä tahansa merkkijonosta.
 *
 * Tämä on peilin nimeämissäännön AINOA kopio. Peilaustyökalu
 * (tools/peilaa-media.mjs) tuo tämän ja alla olevat polkufunktiot
 * täältä eikä toista sääntöä omassa koodissaan: kaksi kopiota ehtivät
 * kerran eriytyä niin, että työkalu kirjoitti tiedoston yhdellä
 * nimellä ja peli haki sitä toisella.
 */
export function turvanimi(teksti, pate) {
  const puhdas = teksti
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 90);
  /*
   * KOKONAAN EI-LATINALAINEN NIMI EI SAA KADOTA.
   *
   * Seula pudottaa kaiken a-z0-9:n ulkopuolisen, joten kyrillinen,
   * kreikkalainen, japanilainen tai arabialainen tiedostonimi kutistui
   * tyhjäksi tai pelkäksi välimerkiksi — ja peli haki niitä KAIKKIA
   * samasta osoitteesta. Ämpärissä on tälläkin hetkellä tiedostot
   * `kuvat/.jpg` ja `kuvat/..jpg`, eli oikeita kuvia on jo mennyt
   * toistensa päälle (mitattu 10.8.2026: molemmat vastaavat 200:lla ja
   * ovat kelvollisia JPEG-kuvia — väärä kuva latautuu siis huomaamatta).
   *
   * Ehto on "yksikään KIRJAIN ei jäänyt jäljelle" eikä pelkkä tyhjä.
   * Kaksi askelta opetti sen:
   *   1. Nimestä "Тебердинский заповедник. Вид…" jäi piste, joka kelpasi
   *      nimeksi mutta ei erottanut mitään.
   *   2. Kiinalaisista nimistä "…玉珠峰雪山 02.jpg" ja "…昆仑山 02.jpg"
   *      jäi pelkkä "02" — kaksi eri vuorikuvaa ja yksi ruokakuva
   *      hakivat kaikki osoitetta `kuvat/02.jpg`.
   * Pelkän numeron jättävä nimi on siis yhtä hyödytön kuin tyhjä.
   * Kirjaimen sisältävät nimet eivät muutu, joten jo peilatut
   * tiedostot pysyvät paikallaan.
   *
   * Tiiviste lasketaan ALKUPERÄISESTÄ nimestä, joten se on eri
   * jokaiselle tiedostolle ja aina sama samalle tiedostolle.
   * Latinalaiset nimet eivät muutu tästä lainkaan, joten jo peilatut
   * tiedostot pysyvät paikallaan.
   */
  const nimi = /[a-z]/.test(puhdas) ? puhdas : `kuva-${tiiviste(teksti)}`;
  return pate ? `${nimi}.${pate}` : nimi;
}

/**
 * Lyhyt vakaa tiiviste merkkijonosta (FNV-1a, 32 bittiä).
 *
 * Omatekoinen eikä crypto.subtle: nimi tarvitaan synkronisesti sekä
 * pelissä että peilaustyökalussa, ja tiivisteeltä vaaditaan tässä vain
 * se, että eri nimet eivät osu yhteen — ei salausominaisuuksia.
 */
function tiiviste(teksti) {
  let luku = 0x811c9dc5;
  for (let i = 0; i < teksti.length; i += 1) {
    luku ^= teksti.charCodeAt(i);
    luku = Math.imul(luku, 0x01000193) >>> 0;
  }
  return luku.toString(36);
}

/** Commons-tiedostonimestä peilin polku. Kansio on 'kuvat' tai 'liput'. */
export function peiliKuvaPolku(tiedosto, kansio) {
  const pate = (tiedosto.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  // Peilissä SVG-liput on tallennettu PNG:nä, koska ne haetaan
  // valmiiksi skaalattuina Commonsin renderöijältä.
  return `${kansio}/${turvanimi(tiedosto.replace(/\.[^.]+$/, ''), pate === 'svg' ? 'png' : pate)}`;
}

/*
 * Peilattavia ääniosoitteita on tasan kaksi muotoa, ja molemmat
 * osoittavat suoraan tiedostoon:
 *
 *   https://cdn.freesound.org/previews/511/511005_571436-lq.mp3
 *   https://archive.org/download/aporee_21876_25420/marrakesh.mp3
 *
 * Tunnus otetaan osoitteen pysyvästä osasta: Freesoundin äänen
 * numerosta ja archive.orgin kohteen (item) tunnuksesta. Kumpikin on
 * arkiston oma pysyvä tunniste, joten sama äänite saa saman nimen
 * riippumatta siitä, missä kohtaa lähdelistaa se sattuu olemaan.
 *
 * NIMI EI SAA RIIPPUA JÄRJESTYKSESTÄ. Ennen tätä peilaustyökalu nimesi
 * tunnistamattoman osoitteen silmukan indeksillä (`aporee-50`) ja peli
 * tyhjällä merkkijonolla — sama tiedosto sai kaksi eri nimeä, eikä peli
 * löytänyt sitä peilistä kertaakaan. Indeksi oli lisäksi hiljainen
 * aikapommi: yksi uusi ääni listan alkuun olisi vaihtanut kaikkien
 * perässä olevien nimet, ja jo peilatut tiedostot olisivat jääneet
 * ämpäriin tavoittamattomiksi. Arvausta ei siis ole: joko tunnus
 * luetaan osoitteesta tai osoitetta ei peilata lainkaan.
 */
const AANIMUODOT = [
  [/^https?:\/\/cdn\.freesound\.org\/previews\/\d+\/(\d+)/, 'freesound'],
  [/^https?:\/\/archive\.org\/download\/([^/]+)\/[^/]+$/, 'aporee'],
];

/**
 * Peilin polku äänen osoitteesta, tai null jos osoite ei ole peilattava
 * äänitiedosto.
 *
 * Null on tavallinen vastaus eikä virhe. Paketeissa on archive.org-
 * osoitteita myös lähdeviitteinä — kirjaskannien ja viritysäänten
 * lisenssisivut ovat muotoa `archive.org/details/<tunnus>` — ja ne ovat
 * HTML-sivuja, eivät äänitiedostoja. Sellaista ei ole peilissä eikä
 * pidäkään olla: peli soittaa viritysäänet repon omasta
 * assets/audio-kansiosta ja käyttää details-osoitetta vain linkkinä.
 *
 * Peilaustyökalu päättää tällä samalla funktiolla, minkä osoitteiden
 * kopion se lataa. Kirjoittaja ja lukija eivät siis voi olla eri mieltä
 * siitä, mitä peilissä on ja millä nimellä.
 */
export function peiliAaniPolku(url) {
  if (typeof url !== 'string') return null;
  // Valinta voi kantaa aloituskohdan (#alku=20&voima=1.5). Se ei kuulu
  // tiedoston nimeen.
  const osoite = url.split('#')[0].split('?')[0];
  const osuma = AANIMUODOT
    .map(([kuvio, etuliite]) => [osoite.match(kuvio), etuliite])
    .find(([m]) => m);
  if (!osuma) return null;
  const [m, etuliite] = osuma;
  // Pääte luetaan tiedostonimestä, mutta vain jos se on uskottava pääte.
  // Muuten peilistä tulisi nimiä kuten `…​.2k-hz`.
  const pate = (osoite.split('/').pop() ?? '').split('.').pop()?.toLowerCase() ?? '';
  return `aanet/${turvanimi(`${etuliite}-${m[1]}`, /^[a-z0-9]{2,4}$/.test(pate) ? pate : 'mp3')}`;
}

// --- katkaisija ---------------------------------------------------------------
//
// Peiliä ei kannata kysellä loputtomiin, jos sitä ei ole vielä julkaistu
// tai se on nurin: silloin jokainen kuva maksaisi turhan epäonnistuneen
// pyynnön. Muutaman virheen jälkeen peili jätetään hetkeksi väliin ja
// aineisto haetaan suoraan alkuperäisestä lähteestä. Katkaisu on
// määräaikainen — ks. KATKAISUN_KESTO_MS alla.
//
// Katkaisija on lähdekohtainen. Kuvat ja äänet ovat eri palvelimilla,
// eikä toisen kaatuminen kerro toisesta mitään: yhteinen laskuri sammutti
// kuvapeilin kolmen ääniongelman jälkeen, vaikka kuvapalvelin olisi ollut
// koko ajan kunnossa. Sama koskee tilannetta, jossa osa äänistä
// tarkoituksella jätetään peilaamatta — niiden 404:t eivät saa viedä
// kuvia mukanaan.

const VIRHERAJA = 3;
const LAJIT = ['kuvat', 'aanet'];
const poisAvain = (laji) => `matkakirja-peili-pois-${laji}`;

/*
 * KATKAISIJA PARANEE ITSESTÄÄN VIIDESSÄ MINUUTISSA.
 *
 * Aiemmin katkaisu kesti koko istunnon: `sessionStorage` säilyy myös
 * sivun uudelleenlatauksen yli, joten kerran lauettuaan peili oli
 * poissa käytöstä siihen asti kunnes VÄLILEHTI suljettiin. Omistaja
 * raportoi 6.8.2026: *"Kuvat menevät vieläkin välillä rikki, vaikka
 * lataan sivun uudestaan ja vaikka olen käynnistänyt pelinkin
 * uudestaan."* Juuri niin sen piti käyttäytyä — eikä uusi peli auta,
 * koska kyse ei ole pelitilasta vaan välilehden muistista.
 *
 * Laukeaminen on lisäksi HELPPOA syystä, joka ei kerro peilin
 * kunnosta: R2:n kehitysosoite (pub-*.r2.dev) on Cloudflaren oma
 * rajoitettu osoite, ja lehden kansi pyytää kymmeniä kuvia kerralla.
 * Yksi purske riittää kolmeen virheeseen.
 *
 * Viisi minuuttia on kompromissi: kaatunutta peiliä ei jauheta joka
 * kuvalla, mutta ohimenevä purskerajoitus ei jää päälle. Aika
 * tallennetaan, jotta se kestää uudelleenlatauksen — vanha arvo '1'
 * tulkitsee itsensä ikivanhaksi, eli päivitys avaa peilin heti.
 */
const KATKAISUN_KESTO_MS = 5 * 60 * 1000;

const virheita = { kuvat: 0, aanet: 0 };
const poisAsti = { kuvat: 0, aanet: 0 };
for (const laji of LAJIT) {
  try {
    const tallennettu = Number(globalThis.sessionStorage?.getItem(poisAvain(laji)));
    if (Number.isFinite(tallennettu)) poisAsti[laji] = tallennettu;
  } catch { /* selain voi kieltää tallennuksen — mennään oletuksella */ }
}

/** Onko peili juuri nyt käytössä tälle lajille? */
export function peiliKaytossa(laji = 'kuvat') {
  // Paikallisesti avattu tiedosto (file:) ei saa verkkoyhteyttä samalla
  // tavalla, mutta peili on tavallinen https-osoite ja toimii silti.
  if (Date.now() < (poisAsti[laji] ?? 0)) return false;
  // Katkaisu vanheni: laskuri alkaa alusta, muuten kolme vanhaa
  // virhettä sulkisi peilin heti uudelleen ensimmäisestä yskähdyksestä.
  if (poisAsti[laji]) {
    poisAsti[laji] = 0;
    virheita[laji] = 0;
    try { globalThis.sessionStorage?.removeItem(poisAvain(laji)); } catch { /* ks. yllä */ }
  }
  return true;
}

/** Peili petti: kolmannen virheen jälkeen se laji jätetään hetkeksi väliin. */
export function peiliPetti(laji = 'kuvat') {
  if (!LAJIT.includes(laji) || !peiliKaytossa(laji)) return;
  virheita[laji] += 1;
  if (virheita[laji] < VIRHERAJA) return;
  poisAsti[laji] = Date.now() + KATKAISUN_KESTO_MS;
  try {
    globalThis.sessionStorage?.setItem(poisAvain(laji), String(poisAsti[laji]));
  } catch { /* ks. yllä */ }
}

/** Vain testejä varten: nollaa katkaisijan tila. */
export function nollaaPeili() {
  for (const laji of LAJIT) {
    virheita[laji] = 0;
    poisAsti[laji] = 0;
    try { globalThis.sessionStorage?.removeItem(poisAvain(laji)); } catch { /* ks. yllä */ }
  }
}

// --- äänet --------------------------------------------------------------------

/**
 * Äänitteen osoite peilistä, jos se on peilattu. Peilissä ovat sekä
 * Freesoundin ja archive.orgin äänitteet (aanet/) että repon omat
 * äänitiedostot ydinsettiä lukuun ottamatta (audio/, ks. aaniUrl).
 * Muut osoitteet palautuvat sellaisenaan.
 */
export function aaniOsoite(url) {
  if (!url) return url;
  // Repon oma äänitiedosto kulkee oman sääntönsä kautta (audio/), ja se
  // osaa jättää ydinsetin rauhaan. Ilman tätä haaraa jokainen
  // soittokohta joutuisi valitsemaan kahden funktion väliltä sen
  // mukaan, mistä ääni sattuu tulemaan.
  if (omaAaniPolku(url)) return aaniUrl(url);
  if (!peiliKaytossa('aanet')) return url;
  // peiliAaniPolku tunnistaa itse, mitkä osoitteet ovat peilissä:
  // se palauttaa null kaikelle muulle (arkiston lähdesivut). Erillistä
  // esikarsintaa ei tarvita — se olisi toinen paikka, jossa sääntö
  // voisi eriytyä.
  const polku = peiliAaniPolku(url);
  return polku ? `${AANI_JUURI}${polku}` : url;
}

/**
 * Hakee äänitteen puskuriin peilistä ja putoaa tarvittaessa
 * alkuperäiseen lähteeseen. Palauttaa saman kuin fetch.
 */
export async function haeAani(url) {
  const peili = aaniOsoite(url);
  if (peili !== url) {
    /*
     * Kaksi yritystä ennen varareittiä (6.9.2026, r2.dev 429): ämpäri
     * rajoittaa pyyntötahtia, ja yksi ohimeneva 429 vei ennen tätä
     * äänen alkuperäiseen lähteeseen — ja kolmantena laukaisi peilin
     * katkaisijan koko lajilta. Puuttuva tiedosto (404) palautuu yhä
     * heti, joten varareitti ei hidastu (js/media.js haeSitkeasti).
     */
    const vastaus = await haeSitkeasti(peili, { yrityksia: 2 });
    if (vastaus?.ok) return vastaus;
    peiliPetti('aanet');
  }
  return fetch(url);
}

/**
 * Onko osoite peilistä, ja mistä lajista? Kertoo sekä sen, kannattaako
 * varareittiä yrittää, että sen kummalle katkaisijalle virhe kuuluu.
 * Palauttaa 'kuvat', 'aanet' tai null.
 */
export function peilinLaji(osoite) {
  if (typeof osoite !== 'string') return null;
  // Molemmat äänikansiot kuuluvat äänipeilille: aanet/ on ulkopuolelta
  // peilattu äänimaisema, audio/ pelin oma äänite. Kumpikin vika kertoo
  // samasta palvelimesta, ja kumpikaan ei saa sammuttaa kuvapeiliä.
  if (osoite.startsWith(AANI_JUURI) && /\/(?:aanet|audio)\//.test(osoite)) return 'aanet';
  if (osoite.startsWith(PEILI_JUURI)) return 'kuvat';
  return null;
}

/** Onko osoite peilistä? Kertoo, kannattaako varareittiä yrittää. */
export function onPeilista(osoite) {
  return peilinLaji(osoite) !== null;
}

// --- sitkeä lataus ------------------------------------------------------------

/*
 * R2.DEV RAJOITTAA PYYNTÖJÄ — YKSI PURSKE EI SAA RIKKOA KARTTAA.
 *
 * Omistajan kuvakaappaus 6.9.2026 klo 01.09 (iPhone, Ateenan
 * kaupunkilehti): *"Kartalla pisteitä jotka eivät toimi"* — viisi
 * kohdetta kahdestatoista näkyi pelkkänä täplänä piirroksen sijaan.
 * Juurisyy mitattiin samalta osoitteelta: peli hakee mediansa
 * julkisesta `pub-….r2.dev`-osoitteesta, joka on Cloudflaren OMA
 * rajoitettu kehitysosoite, ja HEAD-kysely kaikille kahdelletoista
 * Ateenan miniatyyrille yhtä aikaa vastasi **429 Too Many Requests**
 * jokaiselle. Tiedostot ovat ämpärissä ja kunnossa; vain pyyntötahti
 * oli liikaa.
 *
 * Kuva ei kerro JS:lle HTTP-statustaan — `<img>` antaa pelkän
 * `error`-tapahtuman — joten 429:ää ei voi erottaa 404:stä kuvapolulla.
 * Siksi jokainen kuvavirhe uusitaan rajallisesti: neljä yritystä,
 * ensimmäinen odotus 800 ms ja siitä kaksinkertaistuen hajonnalla.
 * Puuttuva tiedosto (aito 404) maksaa siis neljä pyyntöä ennen kuin
 * merkki putoaa täpläksi — se on halpaa, koska niitä on vähän, ja
 * väärä päätös toiseen suuntaan näkyy pelaajalle rikkinäisenä karttana.
 * Fetch-polut (js/media.js haeSitkeasti) sen sijaan LUKEVAT statuksen
 * ja uusivat vain 429:n ja 5xx:n — ja kunnioittavat `Retry-After`ia.
 *
 * OSOITE EI MUUTU UUSINNASSA. Vanha asetaKuva lisäsi kolmanteen
 * yritykseen `?yritys=2`-parametrin, jotta selaimen oma välimuisti ei
 * tarjoilisi äsken epäonnistunutta vastausta. Se ei enää käy: sw.js
 * välimuistittaa median POLULLA, joten lisäparametri ohittaisi korin ja
 * tekisi kerran nähdystä kuvasta uuden pyynnön joka kerta. Sama osoite
 * asetetaan uudestaan `src`-sijoituksella; selain lataa rikkinäisen
 * kuvan uudestaan, koska sen tila on "broken" eikä "completely
 * available" (HTML: update the image data).
 *
 * PYSYVÄ KORJAUS ON OMISTAJAN PUOLELLA: kun ämpärille kytketään oma
 * verkkotunnus (Cloudflare R2 → Settings → Public access → Custom
 * domain), r2.dev-rajoitus poistuu kokonaan. Tämä on pelin puolen
 * sietokyky, ei rajoituksen kiertäminen.
 */

/** Montako yritystä yhdelle kuvalle (ensimmäinen mukaan luettuna). */
export const KUVAN_YRITYKSET = 4;
/** Ensimmäinen odotus uusinnan edellä; kaksinkertaistuu joka kierroksella. */
export const UUSINNAN_VIIVE_MS = 800;
/** Odotuksen kerroin (800 → 1600 → 3200 ms, kuhunkin oma hajonta). */
export const UUSINNAN_KERROIN = 2;
/** Montako yritystä fetch-polulla (429/5xx; muut palautuvat heti). */
export const HAUN_YRITYKSET = 3;
/** Kunnioitetaan Retry-Afteria korkeintaan tähän asti. */
export const RETRY_AFTER_KATTO_MS = 10000;

/*
 * PYYNTÖJONO: NELJÄ KERRALLAAN.
 *
 * Kohdekartta pyytää 10–25 miniatyyriä samalla piirrolla, ja juuri se
 * synnytti purskeen, jonka r2.dev torjui. Jono ei hidasta mitään
 * havaittavasti — neljä rinnakkaista pyyntöä on sama luku, jolla
 * laattapyramidi noutaa laattojaan (js/laattapyramidi.js
 * NOUTO_RINNAKKAIN = 4) ja jonka HTTP/1.1-selaimet muutenkin sallivat
 * per palvelin — mutta se levittää pyynnöt niin, ettei peli itse tee
 * purskeita.
 *
 * Jono koskee VAIN sitkeän latauksen kautta kulkevia kuvia. Sivun omat
 * <img src>-elementit (lehden taitto) menevät selaimen omaa reittiä
 * kuten ennenkin.
 */
export const KUVAJONON_LEVEYS = 4;

/*
 * VUORO VAPAUTUU VIIMEISTÄÄN TÄSSÄ AJASSA.
 *
 * Selain ei lupaa `load`- eikä `error`-tapahtumaa jokaisesta pyynnöstä:
 * roikkuva yhteys tai DOM:ista poistettu kuva voi jäädä molempia vaille.
 * Ilman vahtia neljä sellaista lukitsisi jonon lopullisesti, eikä
 * yksikään kuva latautuisi enää istunnon aikana. Vahti EI keskeytä
 * latausta — kuva saa yhä valmistua ja näkyä — se vain päästää
 * seuraavan pyynnön liikkeelle.
 */
export const VUORON_KATTO_MS = 15000;

let jonossaKaynnissa = 0;
const jononOdottajat = [];

function varaaVuoro() {
  if (jonossaKaynnissa < KUVAJONON_LEVEYS) {
    jonossaKaynnissa += 1;
    return null;
  }
  return new Promise((jatka) => { jononOdottajat.push(jatka); });
}

function vapautaVuoro() {
  const seuraava = jononOdottajat.shift();
  // Vuoro siirtyy suoraan seuraavalle: laskuria ei lasketa välissä
  // alas, tai kaksi yhtaikaista vapautusta päästäisi viisi kerralla.
  if (seuraava) seuraava();
  else jonossaKaynnissa = Math.max(0, jonossaKaynnissa - 1);
}

/** Vain mittaukseen ja testeihin: montako pyyntöä menossa ja jonossa. */
export function kuvajononTila() {
  return { kaynnissa: jonossaKaynnissa, jonossa: jononOdottajat.length };
}

/** Vain testejä varten: tyhjentää jonon ja vapauttaa kaikki vuorot. */
export function nollaaKuvajono() {
  jononOdottajat.length = 0;
  jonossaKaynnissa = 0;
}

/*
 * MEDIAMITTARI (kehittäjävalikon "media"-rivi, js/main.js).
 * Omistaja näkee yhdellä silmäyksellä, kuinka moni kuva tuli suoraan,
 * kuinka moni vasta uusinnalla ja kuinka moni jäi kokonaan saamatta —
 * eli näkyykö r2.dev-rajoitus juuri nyt vai ei.
 */
const mediaLaskurit = { onnistui: 0, uusinta: 0, epaonnistui: 0 };

/** Istunnon medialukemat: { onnistui, uusinta, epaonnistui }. */
export function mediaLukemat() {
  return { ...mediaLaskurit };
}

/** Vain testejä varten: nollaa medialukemat. */
export function nollaaMediaLukemat() {
  mediaLaskurit.onnistui = 0;
  mediaLaskurit.uusinta = 0;
  mediaLaskurit.epaonnistui = 0;
}

/** Odotus, jossa on hajontaa: [odotus, 2 × odotus). */
function hajonnalla(odotus) {
  return Math.round(odotus * (1 + Math.random()));
}

/**
 * Lataa kuvan ja uusii saman osoitteen, jos lataus pettää.
 *
 * Palauttaa lupauksen, joka ratkeaa `true`:ksi latauksen onnistuessa ja
 * `false`:ksi vasta kun kaikki yritykset ovat menneet — vasta silloin
 * kutsutaan `onVirhe`, eli vasta silloin kuvaa ei oikeasti ole.
 *
 * Sama `<img>` uusiokäytetään galleriassa ja kohdekartalla, joten
 * jokainen askel tarkistaa, että kuva yhä yrittää juuri sitä osoitetta
 * jolle tämä ketju asetettiin. Muuten vanha ketju jatkaisi uuden kuvan
 * päällä.
 *
 * @param {HTMLImageElement} kuva
 * @param {string} osoite
 * @param {object} [asetukset] yrityksia, viive, kerroin, jonota,
 *   onLatasi, onVirhe
 */
export function lataaKuvaSitkeasti(kuva, osoite, asetukset = {}) {
  const {
    yrityksia = KUVAN_YRITYKSET,
    viive = UUSINNAN_VIIVE_MS,
    kerroin = UUSINNAN_KERROIN,
    jonota = true,
    onLatasi = null,
    onVirhe = null,
  } = asetukset;
  if (!kuva || !osoite) return Promise.resolve(false);

  return new Promise((valmis) => {
    let yritys = 0;
    let odotus = viive;
    let vuorolla = false;
    let vahti = null;
    const yhaTama = () => kuva.getAttribute('src') === osoite;
    const paastaVuoro = () => {
      if (vahti !== null) { clearTimeout(vahti); vahti = null; }
      if (!vuorolla) return;
      vuorolla = false;
      vapautaVuoro();
    };
    const irrota = () => {
      kuva.removeEventListener('load', latasi);
      kuva.removeEventListener('error', petti);
    };

    function latasi() {
      irrota();
      paastaVuoro();
      mediaLaskurit.onnistui += 1;
      onLatasi?.();
      valmis(true);
    }

    function petti() {
      irrota();
      paastaVuoro();
      // Kuva vaihdettiin toiseen kesken latauksen: tämä ketju ei enää
      // koske ketään, eikä sen pidä pudottaa uutta kuvaa täpläksi.
      if (!yhaTama()) { valmis(false); return; }
      if (yritys >= yrityksia) {
        mediaLaskurit.epaonnistui += 1;
        onVirhe?.();
        valmis(false);
        return;
      }
      mediaLaskurit.uusinta += 1;
      const odota = hajonnalla(odotus);
      odotus *= kerroin;
      setTimeout(() => {
        if (!yhaTama()) { valmis(false); return; }
        void aloita();
      }, odota);
    }

    async function aloita() {
      yritys += 1;
      if (jonota) {
        const vuoro = varaaVuoro();
        vuorolla = true;
        if (vuoro) await vuoro;
        // Jonossa odottaessa kuva ehti vaihtua toiseen.
        if (yritys > 1 && !yhaTama()) { paastaVuoro(); valmis(false); return; }
        // Vahti: vuoro ei jää roikkumaan, vaikka kumpikaan tapahtuma
        // ei koskaan tulisi (ks. VUORON_KATTO_MS).
        vahti = setTimeout(paastaVuoro, VUORON_KATTO_MS);
      }
      kuva.addEventListener('load', latasi, { once: true });
      kuva.addEventListener('error', petti, { once: true });
      // Sama osoite uudestaan — EI cache-bustingia, ks. lohkokommentti.
      kuva.src = osoite;
    }

    void aloita();
  });
}

/** Retry-After otsakkeesta millisekunteina, tai null. */
export function retryAfterMs(vastaus) {
  const otsake = vastaus?.headers?.get?.('Retry-After');
  if (!otsake) return null;
  const sekunteina = Number(otsake);
  const ms = Number.isFinite(sekunteina)
    ? sekunteina * 1000
    : Date.parse(otsake) - Date.now();
  if (!Number.isFinite(ms) || ms <= 0) return null;
  return Math.min(ms, RETRY_AFTER_KATTO_MS);
}

/**
 * Fetch, joka uusii vain ohimenevän virheen (429 ja 5xx sekä verkon
 * katkos) ja kunnioittaa `Retry-After`ia. Muut vastaukset — myös 404 —
 * palautuvat heti sellaisenaan: puuttuva tiedosto ei parane odottamalla.
 *
 * Palauttaa saman kuin fetch (tai null, jos verkko ei vastannut
 * kertaakaan), joten kutsuja voi lukea statuksen kuten ennenkin.
 */
export async function haeSitkeasti(osoite, asetukset = {}) {
  const {
    yrityksia = HAUN_YRITYKSET,
    viive = UUSINNAN_VIIVE_MS,
    kerroin = UUSINNAN_KERROIN,
    haku = globalThis.fetch?.bind(globalThis),
    ...init
  } = asetukset;
  if (typeof haku !== 'function') return null;
  let odotus = viive;
  for (let yritys = 1; ; yritys += 1) {
    // eslint-disable-next-line no-await-in-loop
    const vastaus = await haku(osoite, init).catch(() => null);
    if (vastaus?.ok) {
      mediaLaskurit.onnistui += 1;
      return vastaus;
    }
    const ohimeneva = !vastaus || vastaus.status === 429 || vastaus.status >= 500;
    if (!ohimeneva || yritys >= yrityksia) {
      mediaLaskurit.epaonnistui += 1;
      return vastaus;
    }
    mediaLaskurit.uusinta += 1;
    const odota = retryAfterMs(vastaus) ?? hajonnalla(odotus);
    odotus *= kerroin;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((jatka) => { setTimeout(jatka, odota); });
  }
}

// --- kuvan asettaminen --------------------------------------------------------

/**
 * Asettaa kuvan osoitteen niin, että peilin pettäessä siirrytään
 * varareitille. `onVirhe` kutsutaan vasta, kun kumpikin osoite on
 * epäonnistunut kaikilla yrityksillään — silloin kuvaa ei oikeasti ole.
 *
 * Kumpikin osoite kulkee sitkeän latauksen läpi (lataaKuvaSitkeasti),
 * eli neljä yritystä kasvavalla odotuksella. Ketju on siis enintään
 * kahden osoitteen mittainen eikä voi jäädä silmukkaan: varareitille
 * siirrytään vasta kun peiliosoite on lopullisesti pettänyt, ja
 * peilin katkaisija (peiliPetti) saa tiedon vasta silloin — yksi
 * ohimenevä purske ei siis enää sulje koko peiliä.
 */
export function asetaKuva(kuva, osoite, vara, onVirhe = null) {
  const kohde = osoite ?? vara;
  if (!kohde) return;
  if (kuva.getAttribute('src') === kohde) return;

  const varalla = Boolean(vara) && vara !== kohde;

  void lataaKuvaSitkeasti(kuva, kohde, {
    onVirhe: () => {
      if (!varalla) { onVirhe?.(); return; }
      peiliPetti(peilinLaji(kohde) ?? 'kuvat');
      void lataaKuvaSitkeasti(kuva, vara, { onVirhe: () => onVirhe?.() });
    },
  });
}
