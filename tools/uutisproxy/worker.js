/*
 * Uutisvälitys — pieni Cloudflare Worker, joka hakee RSS-syötteen ja
 * palauttaa sen CORS-otsakkeilla, jotta pelin selainkoodi saa lukea
 * sen. Ilman tätä selain estää haut (uutissivustot eivät salli
 * suoraa hakua toisilta sivustoilta).
 *
 * Käyttöönotto: ks. OHJE.md tässä kansiossa.
 *
 * Turva: worker hakee VAIN sallittujen listalla olevia osoitteita —
 * muuten kuka tahansa voisi käyttää sitä yleisenä välityspalvelimena.
 * Kun js/packs/uutislahteet.js saa uuden syötteen, lisää sen osoite
 * myös tähän listaan ja julkaise worker uudelleen.
 */
/*
 * Sallitut ETULIITTEINÄ (5.8.2026): syötteen lisäksi haetaan myös
 * uutisten artikkelisivut, jotta popupissa näkyy koko leipäteksti —
 * artikkelien osoitteet vaihtuvat, joten tarkka lista ei riitä.
 * Etuliite rajaa haut silti vain uutissivustoon.
 */
const SALLITUT = [
  'https://www.ansa.it/',
  // Britannian uutislähde (Lontoon lehti, 6.8.2026): syöte ja
  // artikkelisivut ovat eri isäntänimillä.
  'https://feeds.bbci.co.uk/',
  'https://www.bbc.co.uk/',
  'https://www.bbc.com/',
  // Egyptin uutislähde (Kairon lehti, 5.8.2026).
  'https://www.youm7.com/',
  // Espanjan uutislähde (Madridin lehti, 6.8.2026): syöte ja
  // artikkelisivut ovat samalla isäntänimellä.
  'https://www.20minutos.es/',
  // Ruotsin uutislähde (Tukholman lehti, 7.8.2026): syöte ja
  // artikkelisivut ovat samalla isäntänimellä.
  'https://www.svt.se/',
  // Saksan uutislähde (Berliinin lehti, 7.8.2026): tagesschaun syöte
  // ja artikkelisivut ovat samalla isäntänimellä.
  'https://www.tagesschau.de/',
  // Kanadan, Meksikon ja Perun uutislähteet (maalehdet 6.9.2026):
  // syöte ja artikkelisivut samalla isäntänimellä.
  'https://globalnews.ca/',
  'https://www.jornada.com.mx/',
  'https://rpp.pe/',
  // Chilen ja Kolumbian uutislähteet (maalehdet 6.9.2026): syöte ja
  // artikkelisivut samalla isäntänimellä. Kuuba jäi ilman lähdettä,
  // ks. js/packs/uutislahteet.js.
  'https://www.lanacion.cl/',
  'https://www.lasillavacia.com/',
  // Papua-Uuden-Guinean ja Salomonsaarten uutislähteet (maalehdet
  // 6.9.2026): syöte ja artikkelisivut samalla isäntänimellä. Fidži jäi
  // ilman lähdettä, ks. js/packs/uutislahteet.js.
  'https://www.postcourier.com.pg/',
  'https://theislandsun.com.sb/',
  // Uruguayn, Paraguayn ja Venezuelan uutislähteet (maalehdet 6.9.2026):
  // syöte ja artikkelisivut samalla isäntänimellä.
  'https://www.montevideo.com.uy/',
  'https://www.abc.com.py/',
  'https://www.elnacional.com/',
  // Kenian, Tansanian ja Ugandan uutislähteet (maalehdet 6.9.2026):
  // syöte ja artikkelisivut samalla isäntänimellä. Capital FM:n osoite
  // on .africa, koska .co.ke ohjaa 301:llä eikä worker seuraa
  // uudelleenohjauksia.
  'https://capitalfm.africa/',
  'https://globalpublishers.co.tz/',
  'https://nilepost.co.ug/',
  // Marokon, Algerian ja Tunisian uutislähteet (maalehdet 6.9.2026):
  // syöte ja artikkelisivut samalla isäntänimellä.
  'https://www.hespress.com/',
  'https://www.tsa-algerie.com/',
  'https://africanmanager.com/',
  // Nigerian, Ghanan ja Senegalin uutislähteet (maalehdet 6.9.2026):
  // syöte ja artikkelisivut samalla isäntänimellä.
  'https://dailytrust.com/',
  'https://www.adomonline.com/',
  'https://aps.sn/',
  // Guatemalan, Nicaraguan ja Panaman uutislähteet (maalehdet 6.9.2026).
  // Confidencialin syöte on www-osoitteessa mutta artikkelilinkit ilman
  // www:tä, joten molemmat isäntänimet ovat listalla.
  'https://lahora.gt/',
  'https://www.confidencial.digital/',
  'https://confidencial.digital/',
  'https://www.panamaamerica.com.pa/',
  // Sudanin ja Etelä-Sudanin uutislähteet (maalehdet 6.9.2026):
  // syöte ja artikkelisivut samalla isäntänimellä. Etiopia jäi
  // ilman lähdettä, ks. js/packs/uutislahteet.js.
  'https://www.dabangasudan.org/',
  'https://www.radiotamazuj.org/',
  // Hongkongin uutislähde (maalehti HKG, 6.9.2026): syöte ja
  // artikkelisivut samalla isäntänimellä, ja syöteosoitteen
  // loppukauttaviiva on pakollinen — ilman sitä palvelin vastaa
  // uudelleenohjauksella, jota worker ei seuraa.
  'https://hongkongfp.com/',
  // Myanmarin uutislähde (maalehti MMR, 6.9.2026): burmankielinen
  // syöte ja artikkelisivut samalla isäntänimellä. Syöteosoitteen
  // loppukauttaviiva on pakollinen — ilman sitä vastaus on 301.
  'https://myanmar-now.org/',
  // Sri Lankan uutislähde (maalehti 6.9.2026): syöte ja artikkelisivut
  // samalla isäntänimellä. Osoite on sinhala.adaderana.lk ja polku
  // rss.xml, koska adaderana.lk ja rss.php vastaavat 301:llä eikä
  // worker seuraa uudelleenohjauksia.
  'https://sinhala.adaderana.lk/',
  // Namibian uutislähde (maalehti NAM, 6.9.2026): syöte ja
  // artikkelisivut samalla isäntänimellä, ilman www-etuliitettä.
  'https://neweralive.na/',
  // Kamerunin uutislähde (maalehti 6.9.2026): syöte ja artikkelisivut
  // samalla isäntänimellä, ilman www-etuliitettä.
  'https://datacameroon.com/',
  // Saint Helenan uutislähde (maalehti 6.9.2026): saaren hallinnon oma
  // syöte, koska molemmat viikkolehdet jäivät pois (ks.
  // js/packs/uutislahteet.js). Syöte ja artikkelisivut ovat samalla
  // isäntänimellä, ja www-alkuinen muoto on pakollinen.
  'https://www.sainthelena.gov.sh/',
  // Kongon demokraattisen tasavallan uutislähde (maalehti COD,
  // 6.9.2026): syöte ja artikkelisivut samalla isäntänimellä.
  'https://www.radiookapi.net/',
  // Nepalin uutislähde (maalehti 6.9.2026): Onlinekhabarin syöte ja
  // artikkelisivut ovat samalla isäntänimellä (www).
  'https://www.onlinekhabar.com/',
  // Madagaskarin uutislähde (maalehti 6.9.2026): L'Express de Madagascar
  // julkaisee Bloggerissa, joten syöte on osoitteessa
  // /feeds/posts/default?alt=rss — syöte ja artikkelisivut ovat samalla
  // isäntänimellä.
  'https://www.lexpress.mg/',
  // Sierra Leonen uutislähde (maalehti 6.9.2026): syöte ja
  // artikkelisivut samalla isäntänimellä, ilman www-etuliitettä.
  'https://sierraloaded.sl/',
  // Kazakstanin uutislähde (maalehti 6.9.2026): NUR.KZ:n
  // kazakinkielinen laitos, syöte ja artikkelisivut samalla
  // isäntänimellä. Osoitteessa on kaz-alkuinen alitunnus, koska
  // venäjänkielinen www.nur.kz on eri isäntänimi.
  'https://kaz.nur.kz/',
  // Afganistanin uutislähde (maalehti 6.9.2026): TOLOnewsin
  // darinkielinen syöte ja artikkelisivut ovat samalla isäntänimellä,
  // ilman www-etuliitettä.
  'https://tolonews.com/',
];

// Kymmenen minuutin välimuisti Cloudflaren reunalla: uutissivusto ei
// kuormitu, vaikka moni pelaaja avaisi lehden yhtä aikaa.
const VALIMUISTI_S = 600;

export default {
  async fetch(pyynto) {
    const kysely = new URL(pyynto.url).searchParams;

    const url = kysely.get('url');
    if (!SALLITUT.some((alku) => url?.startsWith(alku))) {
      return new Response('Osoite ei ole sallittujen listalla', { status: 403 });
    }
    const vastaus = await fetch(url, {
      headers: { 'user-agent': 'matkakirja-uutisvalitys/1.0' },
      cf: { cacheTtl: VALIMUISTI_S, cacheEverything: true },
    });
    return new Response(vastaus.body, {
      status: vastaus.status,
      headers: {
        'content-type': vastaus.headers.get('content-type') ?? 'application/xml; charset=utf-8',
        'access-control-allow-origin': '*',
        'cache-control': `public, max-age=${VALIMUISTI_S}`,
      },
    });
  },
};
