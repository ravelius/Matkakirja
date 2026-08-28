/*
 * TÄKYNOSTO — tuikkiva keltainen piste kartalla ja sen lunastuskortti.
 *
 * Raamatun osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU (omistaja
 * 25.8.2026): *"aarteen löydyttyä pöllö kertoo että nyt voi matkustaa
 * seuraavaan kaupunkiin tai jäädä tutkimaan maata …, ja samalla
 * kartalta NOUSEE YKSI TÄKYNOSTO: lyhyt KELTAISTEN LEHTIEN
 * KLIKKIOTSIKKOTASOINEN lause (henkilöskandaali tai uskomaton
 * tositarina, lupaus lunastetaan faktalla) + miniatyyrikuva perässä,
 * houkuttelemassa kohteen auki."*
 *
 * ── PELKKÄ PISTE, YKSI KERRALLAAN (omistaja 27.8.2026 ilta) ────────
 *
 * *"muuta täkynostot pelkäksi tuikkivaksi keltaiseksi pisteeksi yksi
 * kerrallaan. uusi piste tuikkii kun edellinen on katsottu. pulu voisi
 * kommentoida ensimmäistä vilkkuvaa täkyä"*
 *
 * Otsikko oli tähän asti KARTALLA: puhekupla, jossa luki koko
 * klikkiotsikko ja jonka perässä oli miniatyyri. Se kertoi jutun jo
 * ennen kuin siihen kosketti ja peitti kartan juuri siitä kohtaa, jota
 * juttu koskee. Nyt kartalla on VAIN merkki siitä, että tässä on
 * jotain: pieni keltainen piste, joka tuikkii (js/fokusnosto-symbolit.js
 * osio TÄYN TUIKKIVA PISTE). Otsikko ja lunastus ovat siellä missä
 * ennenkin — kortissa, jonka napautus avaa.
 *
 * Kolme seurausta, jotka on hyvä tietää:
 *
 *   1. YKSI KERRALLAAN. Kartalla tuikkii poolin ENSIMMÄINEN KATSOMATON
 *      täky (nostoVuorossa). Kun se on luettu, se katoaa laitteen
 *      muistiin (nostoMerkitseLuetuksi) ja seuraava katsomaton syttyy
 *      heti kun kortti sulkeutuu. Vanha "yksi täky per maa" -leikkaus
 *      ja "yksi kupla per istunto" -kiintiö poistuivat kuplan mukana:
 *      molemmat olivat sääntöjä ruudulle ponnahtavasta pinnasta, ja
 *      piste ei ponnahda mihinkään.
 *   2. PISTE ON PAINIKE. Kupla otti ennen napautuksen ja ankkurisymboli
 *      oli mykkä; nyt piste tekee sen työn itse (osuma-alue on sormen
 *      mitta, ks. symbolitiedosto).
 *   3. LIVIA HUOMAUTTAA KERRAN. Ensimmäisellä tuikkivalla täyllä pöllö
 *      (Livia) sanoo kuplassa, että kartalla on nyt jotain katsottavaa
 *      — ks. osio LIVIAN HUOMAUTUS. Yksi kerta riittää: mekaniikka
 *      opitaan kerran.
 *
 * ── LUPAUS LUNASTETAAN, TAI OTSIKKO ON HUIJAUS ─────────────────────
 *
 * Aineiston ensimmäinen sääntö: jokaisen otsikon takana on lähteestä
 * tarkistettu tositarina, joka vastaa nimenomaan siihen, mitä otsikko
 * lupaa. Siksi nosto avaa OMAN korttinsa, jossa lunastus on, eikä
 * pelkkää kartan tietoruutua: Delfoin tietoruutu kertoo Omfaloksesta ja
 * Pythiasta, ei kylästä joka istui oraakkelin päällä — se otsikko jäisi
 * lunastamatta ja Perustuslain totuudellisuuspilari kaatuisi. Kun
 * kohteella on lisäksi oma karttamerkki (`kohde`), kortissa on nappi
 * sinne: nosto siis houkuttelee kohteen auki, kuten tilauksessa
 * sanotaan, mutta lupaus maksetaan ensin.
 *
 * ── PISTE SIIHEN KOHTAAN KARTTAA, JOTA JUTTU KOSKEE ───────────────
 *
 * Omistaja 25.8.2026: *"täkyn pitäisi tulla … siihen kohtaan karttaa
 * jota tapahtuma koskee."* Se sääntö jäi voimaan, vaikka esitystapa
 * vaihtui: piste piirretään täyn omiin koordinaatteihin
 * (js/fokusnosto-symbolit.js), ja se on SVG:tä kartan omassa
 * kerroksessa, koska se ankkuroituu laudan koordinaatteihin ja elää
 * kartan mukana.
 *
 * MUTTA EI KOSKAAN KAUPUNGIN LAATAN PÄÄLLE (omistajan pelitestipalaute
 * v1234). Juttu tapahtui useimmiten kaupungissa, ja kaupungin kohdalla
 * kaksi merkkiä samassa pisteessä on yksi merkki: Kreikan täky tuikki
 * suoraan Ateenan laatan päällä. Piste PIIRRETÄÄN siksi aina jonkin
 * kartan kohdesymbolin päälle — täyn oman `kohde`-merkin, tai sen
 * puuttuessa lähimmän kohdemerkin, joka kaupungin ryppäässä on jo
 * siirretty katkoviivan päähän kasauspassilla (js/fokusniput.js).
 * Valinnan tekee kerros, joka tietää merkkien nykyiset paikat
 * (js/fokusnosto-symbolit.js, osio PISTE AINA SYMBOLIN PÄÄLLE); tämä
 * tiedosto kertoo vain, missä juttu tapahtui.
 *
 * ILMAN PAIKKAA KAUPUNKI, JA VASTA SEN JÄLKEEN LIUSKA. Täyllä ei ole
 * pakko olla `paikka`-kenttää; ilman sitä paikaksi otetaan kaupunki,
 * jossa pelaaja on (nostonPaikka) — ja koska piste hakeutuu sieltä
 * lähimmän kohdesymbolin päälle, se ei jää laatan päälle. Vanha
 * alalaidan liuska on yhä olemassa varapolkuna sille tapaukselle, ettei
 * kaupunkiakaan ole — esimerkiksi katselutilassa.
 *
 * EI SUODATTIMIA missään muodossa (js/fokuskartta.js sääntö 3,
 * tests/rules.test.mjs): tuike on `opacity` ja `transform`, ei blur
 * eikä varjosuodatin.
 *
 * ── KARTAN LIIKE ILMAN UUTTA PIIRTOA ───────────────────────────────
 *
 * Panorointi on CSS-muunnos kartan SIIRTOKUORELLA (js/kartta.js
 * asetaPan) eikä uusi piirto, joten mikään ei kutsu tätä moduulia
 * kesken eleen. Piste on laudan koordinaateissa, joten panorointi
 * siirtää sen itsestään; vain MITTAKAAVA on laskettava uusiksi, ja se
 * näkyy kartan `viewBox`issa. Vahti on siksi MutationObserver yhdellä
 * attribuutilla (nostoVahdiKarttaa), ja työ niputetaan yhteen
 * requestAnimationFrameen: yksi setAttribute per ryhmä, ei uusia
 * solmuja eikä yhtään asettelunlukua. js/ui.js:ään ei tarvita riviä
 * lisää.
 *
 * ── MIKSI document.body EIKÄ .map-pane ─────────────────────────────
 *
 * Kartan eleet (panorointi, zoomi) kuunnellaan karttapaneelista
 * (js/kartta.js: `pane = this.ui.mapPane`), ja paneelin sisällä
 * olevan kelluvan pinnan napautus pitää erikseen tunnistaa
 * KELLUVA_UI-listalta. Bodyssa oleva kiinteä kerros ei ole paneelin
 * jälkeläinen lainkaan, joten sen napautus ei kuplii karttaan eikä
 * js/kartta.js:ää tarvitse koskea — sama ratkaisu kuin fokusvirran
 * kuvasuurennoksella (.fokuszoom).
 *
 * ── LUETUT LAITTEEN MUISTIIN ───────────────────────────────────────
 *
 * Luettu nosto ei nouse enää: se on luettu, ei pelitilanne. Muisti on
 * siksi localStorage eikä pelitallenne — sama try/catch-kaava kuin
 * lehtivinkin ruksilla (js/ui-apurit.js lehtivinkkiPiilotettu).
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NOSTO_/nosto-etuliitteellä.
 */
import { html, jaaKappaleiksi, nielaiseSulkevaNapautus } from './ui-apurit.js';
import { asetaKuva } from './media.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { avaaFokuskohde, suljeFokuskohde } from './fokuskohteet.js';
import { fokuskohteet } from './packs/fokuskohteet-grc.js';
import {
  asemoiNostosymbolit, nollaaNostosymbolit, paivitaNostosymbolit,
} from './fokusnosto-symbolit.js';
import { asetaNostopinta, fokusvirtaLukitseeLehden, fokusvirtaSisalto } from './fokusvirta.js';
import { polloVihje } from './pollo.js';
import { sfx } from './sound.js';

/* ==================== POOLI ==================== */

/*
 * KREIKAN TÄKYNOSTOT (omistajan valinta 25.8.2026).
 *
 * KOLME NOSTOA, EI YKSI (omistajan pelitestipalaute v1234: *"sitten kun
 * sen kävi lukemassa, ei ilmestynyt enää uutta vilkkuvaa pistettä"*).
 *
 * Poolissa oli 26.8.2026 alkaen tasan YKSI nosto, koska silloin täky oli
 * PUHEKUPLA ja omistaja rajasi: *"Täkyjä josta tulee puhekupla pitää olla
 * vain yksi per maa."* Kupla poistui 27.8.2026 ja tilalle tuli sääntö
 * YKSI KERRALLAAN: *"uusi piste tuikkii kun edellinen on katsottu."*
 * Yhden mittainen pooli ei kuitenkaan voi vuorotella — luettu täky
 * katosi eikä mitään syttynyt tilalle, ja mekaniikka näytti rikkinäiseltä
 * vaikka koodi teki juuri niin kuin oli kirjoitettu. Poolin pituus oli
 * siis vika, ei koodi: kartalla tuikkii yhä vain YKSI piste kerrallaan,
 * mutta luetun jälkeen on jotain, mikä syttyy.
 *
 * Kaksi lisättyä nostoa ovat samasta tarkistetusta aineistosta kuin
 * ensimmäinen (docs/mantereet-tyoaineisto/takynostot-kreikka.md,
 * ehdokkaat 10 ja 12, molemmat merkitty VARMOIKSI) ja niiden faktat on
 * tarkistettu uudelleen lähdeartikkeleista 28.8.2026. Kummallakin on
 * `kohde`, joten piste tuikkii nimenomaan sen kohteen symbolin päällä ja
 * kortin nappi vie kohteen omaan tietoruutuun — täky *"houkuttelee
 * kohteen auki"* kuten alkuperäisessä tilauksessa.
 *
 * KUVAA EI OLE KAHDELLA UUDELLA. Aineisto ehdottaa niille Commons-
 * tiedostoja, mutta niiden lisenssi- ja tekijätiedot on tarkistettava
 * Commonsin rajapinnasta ennen käyttöä (omistajan sääntö: ei arvattuja
 * tiedostonimiä). Kuvaton nosto on korttina täysin ehjä — otsikko ja
 * lunastus kantavat sen — ja kuvan voi lisätä myöhemmin yhdellä
 * kentällä.
 *
 * Lunastus on aineiston omaa, lähteestä tarkistettua tekstiä
 * (docs/mantereet-tyoaineisto/takynostot-kreikka.md, ehdokas 2) —
 * siitä on paikoin lyhennetty, muttei lisätty eikä muutettu yhtään
 * faktaväitettä. Lähderivi on kortissa näkyvissä.
 *
 * KUVA on kysytty Commonsin imageinfo-rajapinnalta 25.8.2026 (koko,
 * lisenssi, tekijä, päiväys) — nimeä ei ole arvattu:
 *   - Sophia Schliemann wearing gold jewelry.jpg — 1093×1273, public
 *     domain, n. 1873. Kuva on JO PELISSÄ (js/packs/fokusvirta-ateena.js
 *     matkakirja.kuva), ja miniatyyri on tarkoituksella sama: pelaaja
 *     tunnistaa sen isoisän merkinnästä, ja juuri se tekee otsikosta
 *     koukun.
 *
 * IKÄSOPIVUUS (13+, Perustuslaki): Sofian tarinasta on jätetty pois
 * aineistossa erikseen hylätty avioliittokulma.
 *
 * ── PAIKKA LAUDALLA (omistaja 25.8.2026: täky siihen kohtaan) ──────
 *
 * Koordinaatit on laskettu SAMALLA MENETELMÄLLÄ kuin kohtaamispisteillä
 * (js/packs/fokusvirta-ateena.js) ja kartan kohteilla
 * (js/packs/fokuskohteet-grc.js): pelissä EI ole projektiokoodia, vaan
 * asteet on muunnettu laudan yksiköiksi valmiiksi ja asteet jätetty
 * kommenttiin, jotta luvut voi laskea uudelleen jos lauta vaihtaa
 * projektiota.
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio).
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js).
 *
 * Lauta, jota rivillä ei ole, saa pisteensä kaupunkiin (nostonPaikka):
 * väärään paikkaan ankkuroitu merkki olisi pahempi kuin maan osoite.
 */
const NOSTO_MAAT = {
  GRC: [
    {
      id: 'sofia-korut',
      otsikko: 'Valokuva paljasti aarrevarkauden — rouva poseerasi Troijan koruissa',
      teksti: 'Heinrich Schliemann salakuljetti Priamoksen aarteen ulos '
        + 'Ottomaanien valtakunnasta. Viranomaisille asia paljastui vasta, kun '
        + 'hänen vaimonsa Sofia esiintyi julkisesti yllään "Helenan korut" — '
        + 'kultainen otsapanta ja kaulakorut.\n\n'
        + 'Kaivausta valvomaan määrätty ottomaanivirkamies Amin Effendi sai '
        + 'vankeustuomion, Schliemannin kaivauslupa peruttiin ja Ottomaanien '
        + 'hallitus haastoi hänet oikeuteen osuudestaan kultaan.',
      lahde: 'en-Wikipedia "Priam\'s Treasure", osio "Art collection" '
        + '(tarkistettu 25.8.2026).',
      /*
       * Iliou Melathron, Schliemannin oma talo Ateenassa (23,7342 E /
       * 37,9814 N — en-Wikipedia "Iliou Melathron"). Juuri siitä talosta
       * Sofia lähti korut yllään, ja se on kadun päässä siitä
       * kansallismuseosta, jonne Troijan löydöt lopulta päätyivät.
       */
      paikka: {
        nimi: 'Ateena',
        laudat: {
          maailmankartta: { x: 6624.5, y: 1881.6 },
          europe: { x: 666.9, y: 894.7 },
        },
      },
      kuva: {
        tiedosto: 'Sophia Schliemann wearing gold jewelry.jpg',
        selite: 'Sofia Schliemann "Helenan koruissa". Juuri tämä kuva '
          + 'kertoi viranomaisille, missä Troijan kulta oli.',
        lahde: 'Tuntematon kuvaaja n. 1873, Wikimedia Commons (public domain)',
      },
    },
    {
      /*
       * Aineiston ehdokas 10. Paikka ja kohde ovat kartan oma Delfoi
       * (js/packs/fokuskohteet-grc.js `delfoi`), joten piste tuikkii
       * Delfoin symbolin päällä — kaukana Ateenan laatasta, kuten
       * omistaja pyysi.
       *
       * LUPAUS LUNASTETAAN OMASSA KORTISSA eikä Delfoin tietoruudussa:
       * tietoruutu kertoo Omfaloksesta ja Pythiasta, ei kylästä joka
       * istui oraakkelin päällä. Kortin nappi vie sinne vasta sitten,
       * kun otsikon lupaus on maksettu.
       */
      id: 'kastrin-kyla',
      kohde: 'delfoi',
      otsikko: 'Kokonainen kylä istui oraakkelin päällä — eikä lähtenyt '
        + 'ennen kuin maa järisi',
      teksti: 'Kun ranskalaiset halusivat kaivaa Delfoin pyhäkön esiin, '
        + 'sen päällä seisoi Kastrin kylä: noin sata taloa ja 200 asukasta, '
        + 'jotka olivat louhineet antiikin kiviä omiin seiniinsä siitä '
        + 'asti kun paikka tuhottiin 300-luvulla.\n\n'
        + 'Kylä olisi pitänyt siirtää ennen kaivauksia, mutta asukkaat '
        + 'kieltäytyivät. Tilaisuus tuli vasta kun maanjäristys vaurioitti '
        + 'kylää pahoin: asukkaille tarjottiin kokonaan uusi kylä vanhan '
        + 'paikan tilalle, ja 1893 Ranskan arkeologinen koulu kuori pois '
        + 'maanvyöryjen massat ja paljasti Apollonin pyhäkön.',
      lahde: 'en-Wikipedia "Delphi", osio "Archaeology of the precinct" '
        + '(tarkistettu 28.8.2026).',
      paikka: {
        nimi: 'Delfoi',
        laudat: {
          maailmankartta: { x: 6583.4, y: 1862.2 },
          europe: { x: 643.2, y: 881.5 },
        },
      },
    },
    {
      /*
       * Aineiston ehdokas 12. Aineiston oma varoitus noudatettu: lähde
       * puhuu ensimmäisestä KIRJATUSTA noususta, joten teksti sanoo
       * "tiettävästi ensimmäinen" eikä väitä, ettei kukaan olisi
       * koskaan käynyt huipulla.
       */
      id: 'olympoksen-huippu',
      kohde: 'olympos',
      otsikko: 'Jumalten vuorelle noustiin vasta 1913 — ja huipulla oli '
        + 'ensimmäisenä vuohenmetsästäjä',
      teksti: 'Olympos oli koko antiikin ajan jumalten koti, mutta sen '
        + 'korkeimmalle huipulle Mytikakselle noustiin tiettävästi '
        + 'ensimmäisen kerran vasta 2. elokuuta 1913 — vuosi sen jälkeen, '
        + 'kun Pohjois-Kreikka vapautui ottomaanivallasta.\n\n'
        + 'Retken maksoivat sveitsiläiset Frédéric Boissonnas ja Daniel '
        + 'Baud-Bovy, mutta kolmikosta huipulle astui ensimmäisenä heidän '
        + 'oppaansa Christos Kakkalos, villivuohien metsästäjä Litohoron '
        + 'kylästä. Hän toimi Olympoksen virallisena oppaana kuolemaansa '
        + 'eli vuoteen 1976 asti.',
      lahde: 'en-Wikipedia "Mount Olympus", osio "History" '
        + '(tarkistettu 28.8.2026).',
      paikka: {
        nimi: 'Ólympos',
        laudat: {
          maailmankartta: { x: 6578.6, y: 1799.5 },
          europe: { x: 640.5, y: 839.3 },
        },
      },
    },
  ],
};

/* ==================== LUETUT LAITTEEN MUISTIIN ==================== */

const NOSTO_AVAIN = 'matkakirja-takynostot-luetut';

/** Luettujen nostojen tunnukset. Rikki mennyt muisti on tyhjä muisti. */
function nostoLuetut() {
  try {
    const raaka = localStorage.getItem(NOSTO_AVAIN);
    const lista = raaka ? JSON.parse(raaka) : [];
    return new Set(Array.isArray(lista) ? lista.filter((x) => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

/** Merkitsee noston luetuksi. Epäonnistunut kirjoitus ei kaada mitään. */
function nostoMerkitseLuetuksi(id) {
  try {
    const luetut = nostoLuetut();
    if (luetut.has(id)) return;
    luetut.add(id);
    localStorage.setItem(NOSTO_AVAIN, JSON.stringify([...luetut]));
  } catch {
    /* Yksityinen selaus tai täysi kiintiö: nosto nousee uudestaan. */
  }
}

/* ==================== TYYLI ==================== */

const NOSTO_TYYLIN_TUNNUS = 'fokusnosto-tyyli';

/**
 * Oma tyylitiedosto sivulle, jos sitä ei vielä ole. Sama kaava ja sama
 * syy kuin fokusvirralla ja fokuskohteilla: css/styles.css on toisen
 * työvaiheen hallussa. Yhden tiedoston versiossa erillistä linkkiä ei
 * ole, koska tyylit ovat jo sivun <style>-lohkossa.
 */
function nostoLataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(NOSTO_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = NOSTO_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusnosto.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/* ==================== MIKÄ NOSTO NOUSEE ==================== */

/** Miniatyyrin ja kortin kuvan pyyntöleveydet pikseleinä. */
const NOSTO_MINI_PX = 160;
const NOSTO_KUVA_PX = 800;

/**
 * MINKÄ MAAN POOLI ON JUURI NYT VOIMASSA?
 *
 * Maa luetaan laudan omasta taulusta, samalla päättelyllä kuin kartan
 * kohteilla (js/fokuskohteet.js nykyisenMaanKohteet) — yksi totuus,
 * ei toista tulkintaa siitä, minkä maan sisältöä ruudulla on.
 */
function nostoMaanPooli(ui, city) {
  /*
   * Kaupungin oma pooli packista ensin (Sofia 25.8.2026: kenttä
   * `takynostot` js/packs/fokusvirta-sofia.js:ssä käyttää lunastus-
   * nimeä tekstille) — näin uusi maa ei vaadi riviä tähän tiedostoon.
   * NOSTO_MAAT jää Kreikan poolille ja varapoluksi.
   *
   * PACKIN POOLI SAA SAMAT KENTÄT: valinnainen `paikka` (pisteen
   * paikka kartalla) kulkee levityksen mukana sellaisenaan, joten
   * kentän lisääminen pakettiin ei vaadi riviä tänne. Vanha
   * `symboli`-kenttä säilyy datassa, mutta kartalla sitä ei enää lueta
   * (ks. nostonMerkinta).
   */
  const oma = fokusvirtaSisalto(ui, city)?.takynostot;
  if (Array.isArray(oma) && oma.length) {
    return oma.map((n) => (n.teksti ? n : { ...n, teksti: n.lunastus }));
  }
  const taulu = ui?.game?.pack?.map?.cityCountry;
  const iso = (taulu && city && taulu[city.id]) || null;
  const pooli = iso ? NOSTO_MAAT[iso] : null;
  return (Array.isArray(pooli) && pooli.length) ? pooli : null;
}

/*
 * POOLI PALAUTETAAN KOKONAAN — LEIKKAUS ON SIIRTYNYT KATSOMISEEN.
 *
 * Tässä oli 26.8.2026 alkaen `nostoYksiPerMaa`, joka leikkasi jokaisen
 * maan poolin yhteen riviin: kartalle sai nousta vain yksi PUHEKUPLA,
 * ja useampi kupla per maa olisi ollut juuri se raskaus, jota purettiin.
 *
 * Kuplaa ei enää ole (omistajan tilaus 27.8.2026 ilta), ja sen mukana
 * lähti leikkauksen syy. Sääntö on nyt "YKSI KERRALLAAN" eikä "yksi per
 * maa": pooli saa olla minkä mittainen tahansa, mutta kartalla tuikkii
 * aina tasan yksi piste — poolin ensimmäinen katsomaton (nostoVuorossa).
 * Seuraava syttyy vasta kun edellinen on luettu.
 */

/**
 * MITKÄ POOLIN NOSTOT OVAT YHÄ TARJOLLA — riippumatta siitä, onko ruutu
 * vapaa?
 *
 * NÄKYVYYSEHDOT OVAT TÄSMÄLLEEN LIUSKAN AIKAISET (omistajan tilaus:
 * sama hetki, sama pooli, sama kirjanpito). Kolme ehtoa, kaikki
 * pakollisia:
 *   1. kaupungilla on fokusvirtasisältö (eli fokusmoodi on päällä,
 *      pelaaja on ihminen ja laudalla on kevyt kulku käytössä);
 *   2. MAAN AARRE ON LÖYTYNYT — laatta on käännetty, eli lehtilukko on
 *      auennut (fokusvirtaLukitseeLehden palauttaa false). Ennen sitä
 *      pelaajalla on kesken toinen asia, eikä nosto saa kilpailla siitä;
 *   3. nosto on lukematon (laitteen muisti) ja ohittamaton (istunto).
 *
 * LUNASTETTU TÄKY EI PALAA KARTALLE: luetut karsitaan tästä yhdestä
 * listasta, ja juuri se tekee "yksi kerrallaan" -vuorottelun — kun
 * ensimmäinen katoaa listasta, seuraava on listan uusi ensimmäinen.
 */
function nostoJaljella(ui) {
  if (typeof document === 'undefined') return [];
  if (!ui || ui.dead || ui.katselu) return [];
  const city = ui.game?.cityOf?.();
  if (!city || !fokusvirtaSisalto(ui, city)) return [];
  if (fokusvirtaLukitseeLehden(ui, city)) return [];
  const pooli = nostoMaanPooli(ui, city);
  if (!pooli) return [];
  const luetut = nostoLuetut();
  const ohitetut = ui.fokusnostoOhitetut ?? new Set();
  return pooli.filter((n) => !luetut.has(n.id) && !ohitetut.has(n.id));
}

/**
 * MIKÄ TÄKY TUIKKII JUURI NYT?
 *
 * POOLIN ENSIMMÄINEN KATSOMATON (omistajan tilaus 27.8.2026 ilta:
 * *"uusi piste tuikkii kun edellinen on katsottu"*). Katsotut on jo
 * karsittu listasta (nostoJaljella lukee saman laitteen muistin, johon
 * lunastus kirjaa), joten järjestys on poolin oma järjestys ja
 * seuraavan sytyttää yksin se, että edellinen on luettu.
 *
 * ISTUNTOKIINTIÖ POISTUI KUPLAN MUKANA. Lippu `fokusnostoKuplaNahty`
 * salli istunnossa vain yhden täyn (omistajan tilaus v1119: *"Ruudulle
 * saa tulla VAIN YKSI täkykupla, eikä sen jälkeen enempää kuplia"*) —
 * sääntö koski nimenomaan RUUDULLE PONNAHTAVAA kuplaa. Piste ei
 * ponnahda eikä peitä mitään: se on kartan merkintä, joka odottaa
 * napautusta, joten kiintiölle ei ole enää perustetta.
 */
function nostoVuorossa(ui, jaljella) {
  return jaljella[0] ?? null;
}

/* ==================== PAIKKA LAUDALLA ==================== */

/**
 * NOSTON PAIKKA TÄLLÄ LAUDALLA, tai null.
 *
 * Kenttä on valinnainen ja se annetaan kahdessa muodossa: `paikka.laudat`
 * (eri koordinaatit maailmankartalle ja maanosalaudalle, kuten
 * kohtaamispisteellä ja kartan kohteilla) tai suoraan `{x, y}`, jos
 * paketti palvelee vain yhtä lautaa.
 *
 * VARAPAIKKA ON KAUPUNKI (27.8.2026 ilta). Kun täky oli puhekupla,
 * paikaton täky sai alalaidan liuskan — kupla ilman ankkuria olisi ollut
 * pahempi kuin ankkuroimaton liuska. Piste ei ole samalla tavalla
 * vaativa: sen lupaus on *"tässä maassa on jotain katsottavaa"*, ja
 * kaupunki on maan oikea osoite silloinkin, kun jutun tarkkoja
 * koordinaatteja ei ole laskettu. PÄÄLLEKKÄISYYS EI JÄÄ TÄHÄN: piste
 * piirtyy lähimmän kohdesymbolin päälle (js/fokusnosto-symbolit.js),
 * ja kaupungin ryppään symbolit ovat jo katkoviivan päässä omassa
 * sarakkeessaan (js/fokusniput.js) — laatan päälle piste ei siis päädy
 * silloinkaan, kun sen oma paikka on kaupungin koordinaatti.
 *
 * Ilman kaupunkiakin (katselutila, laudan vaihto) palautuu null, ja
 * silloin piirtyy vanha alalaidan liuska.
 */
function nostonPaikka(ui, nosto) {
  const paikka = nosto?.paikka;
  const lauta = ui?.game?.pack?.id;
  const koordit = paikka ? (paikka.laudat ? paikka.laudat[lauta] : paikka) : null;
  if (Number.isFinite(koordit?.x) && Number.isFinite(koordit?.y)) {
    return { x: koordit.x, y: koordit.y, nimi: paikka.nimi ?? null };
  }
  const city = ui?.game?.cityOf?.();
  if (Number.isFinite(city?.x) && Number.isFinite(city?.y)) {
    return { x: city.x, y: city.y, nimi: city.name ?? null };
  }
  return null;
}

/**
 * TUIKKIVAN PISTEEN MERKINTÄ, tai null jos täylle ei löydy paikkaa
 * tältä laudalta (silloin piirtyy alalaidan liuska).
 *
 * SYMBOLIA EI ENÄÄ LUETA. Merkintä kantoi ennen täyn `symboli`-kentän
 * (Raamatun SYMBOLITAKSONOMIAN kategoria), jonka mukaan kartalle
 * piirtyi huutomerkki tai pöllönpoikanen. Kartalla täky on nyt pelkkä
 * keltainen piste (omistajan tilaus 27.8.2026 ilta), joten kenttä jää
 * tässä lukematta — datassa se säilyy, ja taksonomia elää kartan
 * kohdemerkeissä ja korttien ylärivillä entiseen tapaan.
 */
function nostonMerkinta(ui, nosto) {
  const paikka = nosto ? nostonPaikka(ui, nosto) : null;
  if (!paikka) return null;
  /*
   * `kohde` kulkee kerrokselle asti, koska PISTE RATSASTAA SYMBOLIN
   * PÄÄLLÄ (js/fokusnosto-symbolit.js, osio PISTE AINA SYMBOLIN
   * PÄÄLLE): nimetty kohde on pisteen ankkuri, ja ilman sitä ankkuriksi
   * kelpaa lähin kohdemerkki. Kumpikaan valinta ei kuulu tänne — tämä
   * tiedosto kertoo missä juttu tapahtui, kerros kertoo minkä merkin
   * päällä se näytetään.
   */
  return {
    id: nosto.id, otsikko: nosto.otsikko, paikka, kohde: nosto.kohde ?? null,
  };
}

/**
 * ONKO RUUTU VAPAA NOSTOLLE?
 *
 * Nosto on houkutus eikä pelin portti, joten se väistää kaiken, mikä on
 * pelaajalla kesken:
 *   - <dialog>: lehti, aarrelappu, valikko;
 *   - lento tai kamera-ajo (kartan muutkin kelluvat merkinnät väistyvät);
 *   - PÖLLÖN KUPLA JA FOKUSVIRRAN KORTTI. Aarrekuittaus tulee samasta
 *     hetkestä kuin nosto itse (js/fokusvirta.js aarreLoytyi) ja kupla
 *     nousee samaan alalaitaan. Kaksi kelluvaa paperia päällekkäin oli
 *     omistajan pelitesteissä toistuva vika, ja järjestys on tässä
 *     luonnostaan oikea: ensin pöllö sanoo sanottavansa, sitten otsikko
 *     nousee. Kuplan sulkeminen ajaa tämän päivityksen heti
 *     (js/fokusvirta.js suljeFokusvirta), eikä nosto siis jää odottamaan
 *     seuraavaa piirtoa.
 */
function nostoRuutuVapaa() {
  if (document.querySelector('dialog[open]')) return false;
  if (document.querySelector('.fokusvirta-kupla, .fokusvirta-kortti')) return false;
  if (document.querySelector('.fokuszoom, .fokuskohde-popup')) return false;
  return !(document.body.classList.contains('flight-active')
    || document.body.classList.contains('kartalento'));
}

/**
 * UUSI YRITYS, KUN RUUTU ON VARATTU.
 *
 * Sama kaava ja sama perustelu kuin pöllön aarrekuittauksella
 * (js/fokusvirta.js kerroAarteesta): peli ei kutsu piirtoa joka kerta
 * kun jokin kelluva pinta sulkeutuu, joten yritystä toistetaan — mutta
 * katto pitää huolen siitä, ettei ajastin jää pyörimään, jos pelaaja
 * jää lukemaan lehteä tai lähtee valikkoon. Seuraava piirto aloittaa
 * uuden yrityssarjan.
 */
const NOSTO_YRITYS_MS = 900;
const NOSTO_YRITYKSIA = 30;
/*
 * Hengähdys sen jälkeen kun ruutu vapautui (pöllön kuittauskupla,
 * lehti, lento). Omistajan tilaus v1119: *"muutaman sekunnin viive
 * pöllön kuplan jälkeen"*.
 */
const NOSTO_KUPLAN_VIIVE_MS = 2600;

/* ==================== NOSTON PIIRTO ==================== */

/**
 * KYTKENTÄ RENDERIIN (js/fokusvirta.js asetaNostopinta → kutsutaan
 * fokusvirtaSaapumisesta, jonka js/ui.js render ajaa joka piirrossa).
 *
 * TYÖ TEHDÄÄN VAIN KUN NOSTO VAIHTUU. Ruudulla oleva nosto jätetään
 * rauhaan, jottei se aloita nousuanimaatiotaan alusta joka piirrossa.
 * Sama sääntö on ankkurikerroksella: se vertaa omaa avaintaan eikä pura
 * yhtäkään solmua turhaan.
 */
export function paivitaFokusnosto(ui, yritys = 0) {
  if (typeof document === 'undefined' || !ui) return;
  clearTimeout(ui.fokusnostoAjastin);
  const jaljella = nostoJaljella(ui);
  if (!jaljella.length) {
    suljeFokusnosto(ui);
    return;
  }
  nostoLataaTyyli();
  const nosto = nostoVuorossa(ui, jaljella);
  const merkinta = nostonMerkinta(ui, nosto);
  /*
   * PISTE KARTALLE. Kerros vertaa omaa avaintaan ja tekee työtä vain
   * kun täky vaihtuu — napautuksen työ annetaan sille valmiina, jotta
   * kerros ei tarvitse tietoa poolista eikä lunastuksesta.
   */
  paivitaNostosymbolit(ui, { merkinta, avaa: () => avaaNosto(ui, nosto) });
  if (merkinta) {
    // Piste on kartalla: vahti pitää sen mittakaavan ajan tasalla, eikä
    // ruudulle jää mitään pintaa — ei kuplaa eikä liuskaa.
    nostoVahdiKarttaa(ui);
    nostoPintaPois(ui);
    nostoLivianVihje(ui);
    return;
  }
  /*
   * VARAPOLKU ILMAN PAIKKAA: alalaidan liuska. Se on ruudun elementti
   * eikä liiku kartan mukana, joten vahtia ei tarvita — ja koska se
   * peittää kartan alalaidan, se väistää kaiken, mikä on pelaajalla
   * kesken (nostoRuutuVapaa) täsmälleen kuten ennen.
   */
  nostoLopetaVahti(ui);
  if (!nostoRuutuVapaa()) {
    nostoPintaPois(ui);
    ui.fokusnostoRuutuOliVarattu = true;
    if (yritys < NOSTO_YRITYKSIA) {
      ui.fokusnostoAjastin = setTimeout(
        () => paivitaFokusnosto(ui, yritys + 1), NOSTO_YRITYS_MS,
      );
    }
    return;
  }
  /*
   * HENGÄHDYS PÖLLÖN KUPLAN JÄLKEEN (omistajan tilaus v1119, kohta
   * 20b: *"ENSIMMÄINEN täkynosto tulee kartalle heti kun aarre on
   * löytynyt JA pöllön kuittauskupla on näytetty — muutaman sekunnin
   * viive pöllön kuplan jälkeen"*).
   *
   * Ruutu vapautui juuri: liuskaa ei nosteta samassa silmänräpäyksessä
   * kuin edellinen pinta katosi, vaan sen verran myöhemmin että pelaaja
   * ehtii nähdä kartan välissä.
   */
  if (ui.fokusnostoRuutuOliVarattu) {
    ui.fokusnostoRuutuOliVarattu = false;
    ui.fokusnostoAjastin = setTimeout(() => paivitaFokusnosto(ui), NOSTO_KUPLAN_VIIVE_MS);
    return;
  }
  /*
   * RUUDULLA OLEVA LIUSKA JÄTETÄÄN RAUHAAN, jottei se aloita
   * nousuanimaatiotaan alusta joka piirrossa.
   */
  if (ui.fokusnosto?.avain === nosto.id && ui.fokusnosto.el?.isConnected) return;
  nostoPintaPois(ui);
  ui.fokusnosto = { avain: nosto.id, id: nosto.id, el: piirraNosto(ui, nosto) };
}

/**
 * TÄKY AUKI — sama työ napautettiinpa kartan pistettä tai varapolun
 * liuskaa.
 *
 * Järjestys on tarkka: täky merkitään luetuksi ENNEN pinnan sulkemista,
 * jotta sulkemisen laukaisema päivitys ei enää löydä samaa täkyä
 * jäljellä olevaksi ja sytytä sen pistettä uudelleen. Seuraava
 * katsomaton syttyy vasta kun kortti suljetaan (suljeNostonKortti).
 */
function avaaNosto(ui, nosto) {
  if (!nosto) return;
  sfx.play('paper');
  nostoMerkitseLuetuksi(nosto.id);
  /*
   * ANKKURIKOHDE TALTEEN ENNEN SULKUA. Piste tuikkii kohdemerkin päällä
   * (js/fokusnosto-symbolit.js), ja kerroksen nollaus unohtaa sen —
   * kortti tarvitsee tiedon sen jälkeen (nostonKarttakohde).
   */
  const ankkuri = ui?.nostosymAnkkuriKohde ?? null;
  suljeFokusnosto(ui);
  avaaNostonKortti(ui, nosto, ankkuri);
}

/* ==================== LIVIAN HUOMAUTUS ==================== */

/**
 * LIVIA KOMMENTOI ENSIMMÄISTÄ VILKKUVAA TÄKYÄ (omistajan tilaus
 * 27.8.2026 ilta: *"pulu voisi kommentoida ensimmäistä vilkkuvaa
 * täkyä"*).
 *
 * Piste on pieni ja hiljainen — se on koko pointti — mutta ensimmäisellä
 * kerralla pelaaja ei tiedä, että kartalla on nyt uusi merkkilaji.
 * Yksi kupla riittää: mekaniikka opitaan kerran, ja sen jälkeen piste
 * puhuu puolestaan.
 *
 * REPLIIKKI ON LIVIAN ÄÄNTÄ (Raamattu, PULU-KOKEILU): asiantunteva
 * viestinviejä, joka puolustautuu refleksinä ja on ylpeä työnsä
 * tarkkuudesta — ei huutomerkkejä. Se VIHJAA eikä paljasta: kartalla
 * tuikkii jotain katsomisen arvoista, mutta mitä, se selviää vasta
 * napautuksesta.
 *
 * SAMA MEKANISMI KUIN SAAPUMISKUPLILLA (js/ui.js saapumisenKuplat):
 * polloVihje, viive ja ruudun vapaus. Jos ruutu ei ole vapaa kun viive
 * kuluu umpeen, lippu palautuu ja seuraava piirto yrittää uudelleen —
 * kupla ei siis huku pöllön kuittauksen tai lehden alle.
 */
const NOSTO_LIVIAN_VIHJE = 'Kartalla tuikkii keltainen piste. Se on '
  + 'minun leikekirjastani, ja tarkistin sen kahdesti — kannattaa käydä '
  + 'katsomassa ennen kuin matkustat eteenpäin.';

function nostoLivianVihje(ui) {
  if (!ui || ui.fokusnostoVihjeNahty) return;
  ui.fokusnostoVihjeNahty = true;
  clearTimeout(ui.fokusnostoVihjeAjastin);
  ui.fokusnostoVihjeAjastin = setTimeout(() => {
    if (!ui || ui.dead) return;
    // Ruutu varattu (pöllön kuittaus, lehti, lento): lippu takaisin,
    // seuraava piirto yrittää uudelleen.
    if (!nostoRuutuVapaa()) { ui.fokusnostoVihjeNahty = false; return; }
    polloVihje(NOSTO_LIVIAN_VIHJE);
  }, NOSTO_KUPLAN_VIIVE_MS);
}

/**
 * Liuska pois ruudulta — kartan tuikkiva piste jää.
 *
 * SIIVOUS TEHDÄÄN VALITSIMELLA eikä pelkällä muistiin jääneellä
 * viitteellä: uusi peli rakentaa uuden UI-olion (js/main.js), jolloin
 * vanha viite katoaa mutta pinta jäisi bodyyn roikkumaan.
 */
function nostoPintaPois(ui) {
  if (ui) ui.fokusnosto = null;
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.fokusnosto')) vanha.remove();
}

/**
 * Nosto pois ruudulta kokonaan: liuska, kartan tuikkiva piste ja kartan
 * liikkeen vahti. Muistiin ei kosketa — se on eri asia.
 */
export function suljeFokusnosto(ui) {
  nostoPintaPois(ui);
  nostoLopetaVahti(ui);
  nollaaNostosymbolit(ui);
}

/* ==================== KARTAN LIIKE ==================== */

/**
 * PISTE SEURAA KARTTAA ILMAN UUTTA PIIRTOA.
 *
 * Panorointi on CSS-muunnos kartan SVG:llä (js/kartta.js asetaPan) ja
 * zoomi kirjoittaa sen `viewBox`-attribuutin — kummastakaan ei seuraa
 * kutsua tähän moduuliin. Vahti kuuntelee siis suoraan noita kahta
 * attribuuttia ja niputtaa työn yhteen requestAnimationFrameen: kaksi
 * setAttributea ryhmää kohti ja yksi ankkurin mittaus. Uusia solmuja ei
 * synny, joten kesken eleen ei ladota mitään.
 *
 * Vahti on IDEMPOTENTTI: se asennetaan kerran samalle SVG:lle, ja
 * laudan vaihto (uusi SVG) asentaa sen uudelleen.
 */
function nostoVahdiKarttaa(ui) {
  if (typeof document === 'undefined' || !ui?.svg) return;
  if (ui.fokusnostoVahti && ui.fokusnostoVahtiSvg === ui.svg) return;
  nostoLopetaVahti(ui);
  /*
   * PANOROINTI EI KOSKE PISTEESEEN LAINKAAN. Piste on laudan
   * koordinaateissa, joten se liikkuu kartan mukana itsestään; vain
   * MITTAKAAVA on laskettava uusiksi, ja se näkyy `viewBox`issa, jonka
   * kartta kirjoittaa aina kun zoomi muuttuu (js/kartta.js fitViewBox,
   * sovitaAloitusZoom). Attribuutin lukeminen ei pakota tyylinlaskentaa;
   * ui.nakyvaAlue() mittaisi kaksi laatikkoa turhaan joka kehyksellä.
   *
   * KUPLAN MUKANA LÄHTI PUOLET VAHDISTA (27.8.2026 ilta): kuoren
   * siirtoa, ikkunan kokoa ja ankkurin ruutupaikkaa ei enää tarvitse
   * seurata, koska mitään ruutuun ankkuroitua pintaa ei ole.
   */
  const asemoi = () => {
    const laatikko = ui.svg?.getAttribute('viewBox') ?? '';
    if (laatikko === ui.fokusnostoViewBox) return;
    ui.fokusnostoViewBox = laatikko;
    asemoiNostosymbolit(ui);
  };
  const pyyda = () => {
    if (ui.fokusnostoKehys) return;
    const rAF = globalThis.requestAnimationFrame;
    if (!rAF) { asemoi(); return; }
    ui.fokusnostoKehys = rAF(() => {
      ui.fokusnostoKehys = 0;
      asemoi();
    });
  };
  const vahti = typeof MutationObserver === 'undefined' ? null : new MutationObserver(pyyda);
  vahti?.observe(ui.svg, { attributes: true, attributeFilter: ['viewBox'] });
  ui.fokusnostoVahtiSvg = ui.svg;
  ui.fokusnostoVahti = () => {
    vahti?.disconnect();
    if (ui.fokusnostoKehys) globalThis.cancelAnimationFrame?.(ui.fokusnostoKehys);
    ui.fokusnostoKehys = 0;
  };
}

/** Vahti pois. Jokainen lisätty kuuntelija on purettava. */
function nostoLopetaVahti(ui) {
  if (!ui) return;
  ui.fokusnostoVahti?.();
  ui.fokusnostoVahti = null;
  ui.fokusnostoVahtiSvg = null;
  ui.fokusnostoViewBox = null;
}

/**
 * ALALAIDAN LIUSKA — VARAPOLKU ILMAN PAIKKAA.
 *
 * Alkuperäinen esitystapa: yksi lause ja sen PERÄSSÄ pieni kuva, koko
 * liuska yhtenä painikkeena, rasti sen kyljessä. Tämä piirtyy enää
 * silloin, kun nostolla ei ole `paikka`-kenttää tälle laudalle — kupla
 * ilman ankkuria olisi pahempi kuin ankkuroimaton liuska. EI POISTETA
 * (omistajan tilaus): uusi maa saattaa tulla peliin ennen kuin sen
 * täkyjen koordinaatit on laskettu.
 */
function piirraNosto(ui, nosto) {
  const liuska = html('div', 'fokusnosto');
  liuska.setAttribute('role', 'group');
  liuska.setAttribute('aria-label', 'Täkynosto');
  liuska.append(nostoKlikkiotsikko(ui, nosto), nostoRasti(ui, nosto));

  document.body.appendChild(liuska);
  // Nousu alkaa vasta seuraavassa kehyksessä: ilman pakotettua
  // tyylinlaskentaa selain niputtaa lähtö- ja maalitilan samaan
  // kehykseen eikä näe niiden välillä eroa (sama oppi kuin fokusvirran
  // suurennoksella).
  void liuska.offsetWidth;
  liuska.classList.add('fokusnosto-nousee');
  return liuska;
}

/**
 * KLIKKIOTSIKKO + MINIATYYRI YHTENÄ PAINIKKEENA — sama pala kuplassa ja
 * liuskassa. Otsikkotaso, teksti ja kuva ovat samat kummassakin; vain
 * kehys ympärillä vaihtuu (omistajan tilaus: *"sama otsikkoteksti +
 * miniatyyri, klikkiotsikkotaso säilyy"*).
 *
 * KUPLASSA PAINIKE ON ITSE PAPERI. Omistaja 26.8.2026 ilta: *"kun täkyä
 * painaa niin sen pitäisi aueta suoraan pop upiksi"* — jos painike olisi
 * kuplan sisällä oma laatikkonsa, paperin reunoille jäisi kuollutta
 * pintaa, joka ei tee mitään. Siksi kutsuja antaa valmiin elementin
 * (`nappi`), ja kuplassa se on `.fokusnosto-kuplapaperi` itse.
 */
function nostoKlikkiotsikko(ui, nosto, nappi = html('button', 'fokusnosto-nappi')) {
  nappi.type = 'button';
  nappi.setAttribute('aria-label', `${nosto.otsikko} — lue lisää`);
  nappi.appendChild(html('span', 'fokusnosto-otsikko', nosto.otsikko));
  if (nosto.kuva) {
    const mini = document.createElement('img');
    mini.className = 'fokusnosto-mini';
    mini.alt = '';
    mini.decoding = 'async';
    mini.draggable = false;
    // Rikkinäinen kuva ei saa jättää tyhjää laatikkoa otsikon perään:
    // otsikko kantaa noston yksinkin.
    asetaKuva(mini, valokuvaUrl(nosto.kuva.tiedosto, NOSTO_MINI_PX),
      valokuvaVara(nosto.kuva.tiedosto, NOSTO_MINI_PX), () => mini.remove());
    nappi.appendChild(mini);
  }
  nappi.addEventListener('click', () => avaaNosto(ui, nosto));
  return nappi;
}

/**
 * RASTI — noston voi työntää syrjään lukematta, ja silloin se ei nouse
 * enää tässä istunnossa (`fokusnostoOhitetut`, ei laitteen muisti).
 */
function nostoRasti(ui, nosto) {
  const sulje = html('button', 'fokusnosto-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Piilota';
  sulje.setAttribute('aria-label', 'Piilota täkynosto');
  sulje.addEventListener('click', () => {
    sfx.play('paper');
    (ui.fokusnostoOhitetut ??= new Set()).add(nosto.id);
    suljeFokusnosto(ui);
    paivitaFokusnosto(ui);
  });
  return sulje;
}

/* ==================== LUNASTUSKORTTI ==================== */

/**
 * NOSTON OMA KORTTI — tässä otsikon lupaus lunastetaan.
 *
 * Kortti on kartan päällä kelluva paperi, ei koko ruudun modaali: sama
 * sääntö kuin fokusvirran kortilla — kartta on näkymä, teksti on annos
 * sen päällä. Napautus kortin ulkopuolelle tai Esc sulkee, ja
 * sulkemisen jälkeen poolin seuraava nosto saa nousta.
 */
function avaaNostonKortti(ui, nosto, ankkuri = null) {
  nostoLataaTyyli();
  suljeNostonKortti(ui);

  const kerros = html('div', 'fokusnosto-kerros');
  const kortti = html('div', 'fokusnosto-kortti');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');
  kortti.setAttribute('aria-label', nosto.otsikko);

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusnosto-sisalto');
  // Ylärivi kertoo KUKA nostoa tarjoaa: pöllö on ikivanha
  // silminnäkijä-reportteri, ja täkynostot ovat sen heiniä (Raamattu,
  // PÖLLÖN KARAKTÄÄRI).
  sisalto.appendChild(html('p', 'fokusnosto-ylarivi', 'Livian leikekirja'));
  sisalto.appendChild(html('h3', 'fokusnosto-kortti-otsikko', nosto.otsikko));
  if (nosto.kuva) piirraNostonKuva(sisalto, nosto.kuva);
  const teksti = html('div', 'fokusnosto-teksti');
  for (const kappale of jaaKappaleiksi(nosto.teksti)) {
    teksti.appendChild(html('p', '', kappale));
  }
  sisalto.appendChild(teksti);
  if (nosto.lahde) sisalto.appendChild(html('p', 'fokusnosto-lahde', nosto.lahde));

  /*
   * KOHDENAPPI, KUN KARTALLA ON SAMA PAIKKA. Nosto *"houkuttelee
   * kohteen auki"* (omistajan tilaus), ja kun kohteella on jo oma
   * karttamerkki, sinne mennään pelin omalla tietoruudulla eikä uudella
   * pinnalla. Kortti sulkeutuu samalla: kaksi korttia päällekkäin olisi
   * juuri sitä raskautta, jota kevyt kulku purkaa.
   */
  const kohde = nostonKarttakohde(ui, nosto, ankkuri);
  if (kohde) {
    const nappi = html('button', 'fokusnosto-kohdenappi', `Katso ${kohde.nimi} kartalla`);
    nappi.type = 'button';
    nappi.addEventListener('click', () => {
      suljeNostonKortti(ui);
      avaaFokuskohde(ui, kohde);
    });
    sisalto.appendChild(nappi);
  }

  kortti.appendChild(sisalto);
  kerros.appendChild(kortti);
  document.body.appendChild(kerros);

  const kiinni = () => {
    sfx.play('paper');
    suljeNostonKortti(ui);
  };
  sulje.addEventListener('click', kiinni);
  /*
   * Napautus kortin ULKOPUOLELLE sulkee; kortin päällä se ei tee mitään,
   * jotta tekstiä voi valita ja nappeja painaa.
   *
   * Sulkeva napautus jää tähän kerrokseen: kerros katoaa jo
   * pointerdownissa, ja ilman nielua selain etsisi saman napautuksen
   * click-kohteen vasta sormen noustessa — kartalta kerroksen alta
   * (sama vuoto kuin pöllön kuplissa, ks. ui-apurit
   * nielaiseSulkevaNapautus).
   */
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.fokusnosto-kortti')) return;
    nielaiseSulkevaNapautus(tapahtuma);
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    tapahtuma.stopPropagation();
    suljeNostonKortti(ui);
  };
  document.addEventListener('keydown', nappain, true);

  ui.fokusnostoKortti = {
    kerros,
    purku: () => document.removeEventListener('keydown', nappain, true),
  };
  void kerros.offsetWidth;
  kerros.classList.add('fokusnosto-kortti-auki');
  sfx.play('paper');
}

/**
 * KOHDE KARTALLA — vain jos sinne oikeasti pääsee juuri nyt.
 *
 * Tietoruutu asemoidaan kohteen karttamerkin viereen (js/fokuskohteet.js
 * asetaKohteenPaikka), joten ilman merkkiä se jäisi ruudun nurkkaan
 * ilman ankkuria. Merkit myös SAMMUVAT, kun fokuslehti ei täytä riittävää
 * osaa näkymästä, ja silloin niiden kerros sulkee avatun ruudun heti.
 * Kummassakin tapauksessa nappi jää pois eikä lupaa mitään, mitä
 * napautus ei tekisi.
 */
function nostonKarttakohde(ui, nosto, ankkuri = null) {
  /*
   * ANKKURIKOHDE KELPAA MYÖS. Piste piirtyy kohdemerkin päälle
   * (js/fokusnosto-symbolit.js) ja vie sen napautuksen niin kauan kuin
   * täky on lukematta; kutsuja kertoo tässä, minkä merkin päällä se
   * istui, jotta kortti tarjoaa sinne oven. Datan oma `kohde` voittaa:
   * se on täyn oikea aihe, ankkuri vain lähin naapuri.
   */
  const tunnus = nosto?.kohde ?? ankkuri ?? null;
  if (!tunnus) return null;
  if (!ui?.fokuskohdeMerkit?.get(tunnus)?.length) return null;
  if (ui.fokuskohdeKerros?.classList?.contains('fokuskohteet-piilossa')) return null;
  // Nykyisen maan taulu ensin (js/fokuskohteet.js): se palvelee kaikkia
  // maita, kun taas suora tuonti tuntee vain Kreikan kohteet.
  return ui.fokuskohdeTiedot?.get(tunnus) ?? fokuskohteet([tunnus])[0] ?? null;
}

/** Kortti pois, kuuntelijat puretaan ja poolin seuraava saa nousta. */
export function suljeNostonKortti(ui) {
  const auki = ui?.fokusnostoKortti;
  if (ui) ui.fokusnostoKortti = null;
  auki?.purku?.();
  if (typeof document !== 'undefined') {
    for (const vanha of document.querySelectorAll('.fokusnosto-kerros')) vanha.remove();
  }
  if (auki) paivitaFokusnosto(ui);
}

/** Kortin kuva selitteineen ja lähteineen (CC BY vaatii tekijän). */
function piirraNostonKuva(kohde, kuva) {
  const kehys = html('figure', 'fokusnosto-kuva');
  const img = document.createElement('img');
  img.alt = kuva.selite ?? '';
  img.decoding = 'async';
  img.draggable = false;
  const piilota = () => { kehys.hidden = true; };
  asetaKuva(img, valokuvaUrl(kuva.tiedosto, NOSTO_KUVA_PX),
    valokuvaVara(kuva.tiedosto, NOSTO_KUVA_PX), piilota);
  kehys.appendChild(img);
  const teksti = html('figcaption', 'fokusnosto-kuvateksti');
  teksti.append(
    html('span', 'fokusnosto-kuvaselite', kuva.selite ?? ''),
    html('span', 'fokusnosto-kuvalahde', kuva.lahde ?? ''),
  );
  kehys.appendChild(teksti);
  kohde.appendChild(kehys);
}

/* ==================== KYTKENTÄ ==================== */

/**
 * KYTKENTÄKOHTA js/main.js:ssä.
 *
 * Kutsu asettaa täkynoston fokusvirran piirtopinnaksi, ja siitä eteenpäin
 * nosto elää pelin oman renderin tahdissa ilman uutta riviä js/ui.js:ssä
 * (ks. js/fokusvirta.js asetaNostopinta).
 *
 * MIKSI ERILLINEN KUTSU EIKÄ SIVUVAIKUTUS MODUULIN LATAUKSESSA:
 * niputuksen vartija (tools/tarkista-niputus.mjs) vaatii, että jokainen
 * listattu moduuli on jonkin toisen listatun moduulin STAATTISESTI
 * tuoma — pelkkä `import './fokusnosto.js';` ei näy sille tuontina.
 * Nimetty kutsu on samalla luettava: käynnistystiedostosta näkee, että
 * täkynosto on osa peliä.
 */
export function kytkeFokusnosto() {
  asetaNostopinta(paivitaFokusnosto);
}

/**
 * Laudan vaihto tai uusi peli: nosto ja kortti pois.
 *
 * Kartan tietoruutu suljetaan samalla, koska nosto on voinut avata sen:
 * uuden laudan päälle jäänyt Delfoin kortti olisi merkintä kartasta,
 * jota ei enää ole.
 */
export function nollaaFokusnosto(ui) {
  if (ui) {
    ui.fokusnostoOhitetut = new Set();
    clearTimeout(ui.fokusnostoVihjeAjastin);
    // Kortin muistiviite pois ENNEN sulkua: muuten sulku kutsuisi
    // paivitaFokusnostoa, joka nostaisi seuraavan noston juuri
    // nollattavan laudan päälle.
    ui.fokusnostoKortti?.purku?.();
    ui.fokusnostoKortti = null;
  }
  suljeNostonKortti(ui);
  suljeFokusnosto(ui);
  suljeFokuskohde(ui);
}
