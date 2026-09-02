/*
 * MAAN VAHVISTETTU ÄÄRIVIIVA — kartan ainoa maakorostus lähikuvassa.
 *
 * TUMMENNUS ON POISTETTU (omistaja 2.9.2026, sanatarkasti:
 * *"Tummennuksen voisi ottaa pois myös normaalista pelitilasta.
 * Jätetään pelkkä vahvistettu kartan ääriviiva jäljelle."* ja saman
 * päivän tarkennus: *"kehittäjätilassa ota pois se tummennusvalinta ja
 * pidä pelkkä kartan ääriviivojen tummennus aina päällä. Eli tämä on
 * oletus kummassakin tilassa."*)
 *
 * Kerroksessa on siis enää YKSI asia: nykyisen maan renkaat viivana
 * (`TUMMENNUS_VIIVA`, ks. alla). Naapurimaiden varjoa ei piirretä
 * kummassakaan tilassa, eikä kehittäjän valikossa ole enää kytkintä,
 * josta sen saisi takaisin — piirtäjä, sen säädin (TUMMENNUS_VOIMA),
 * muiden maiden yhteispolku (`muidenPolku`) ja kytkimen koko ketju
 * (js/ui-apurit.js avain, index.html rivi, js/main.js kuuntelija,
 * js/ui.js paivitaKehittajaTummennus) on purettu samalla kertaa.
 *
 * MERI EI TUMMENE MISSÄÄN — eikä maakaan enää. Tämä on entisen
 * *"Merta ei tarvitse tummentaa"* -linjauksen (omistaja 31.8.2026)
 * lopullinen muoto: kerros ei maalaa yhtään pintaa, vain viivan.
 *
 * LENNON PIMENNYS ON ERI MEKANISMI EIKÄ SITÄ KOSKETA. Lentokohtauksen
 * aukoton harso (js/kartta.js aloituslennonNiukkuus, luokka
 * `.fokus-sumu-harso`, css body.kartalento) piilottaa kohdemaan ennen
 * laskeutumista ja jättää kartalle vain Lontoon ja kohteen pisteinä.
 * Se on KOHTAUS eikä karttatila, ja se jää ennalleen.
 *
 * NIMI JÄÄ. Kerros, sen CSS-luokat (`.maatummennus`,
 * `.maatummennus-viiva`) ja tämän moduulin nimi ovat entiset, koska ne
 * ovat kartan kerrosjärjestyksen ja savukkeiden yhteistä sanastoa —
 * uudelleennimeäminen olisi ollut isompi muutos kuin itse tilaus.
 *
 * === NÄKYVYYS: PELAAJAN OMA ZOOMIALUE (omistajan tarkennus 31.8.2026)
 *
 * *"tummennukset riittää tehdä siihen tasoon mitä peli antaa
 * normaalistikin pelaajan zoomata ulos sekä kaikki sitä lähemmät.
 * kehittäjätilassa kun zoomataan enemmän ulos, niin silloin
 * tummennuksia ei tarvita."*
 *
 * Raja EI ole kovakoodattu mittakaava vaan pelin oma uloszoomauksen
 * pohja: js/kartta.js `pelaajanUloinSkaala()` laskee sen maan
 * ikkunasta samalla kaavalla kuin `fokusZoomMinimi` — sama laatikko,
 * sama ULOSZOOMAUS_KERROIN. Ääriviiva on päällä siitä mittakaavasta
 * ylöspäin. Kehittäjän maailmanäkymä ohittaa rajan kamerassa mutta ei
 * täällä: kun kartta on loitonnettu pelaajan rajaa kauemmas, viiva
 * jää pois.
 *
 * === ELEKÄYTÖS: KERROS EI VÄISTY LAINKAAN ==========================
 *
 * Omistaja 1.9.2026: *"Kartan tummennus voisi pysyä panoroitaessa
 * päällä."* ja illalla *"jos ympärivaltoiden tummennus on mahdollista
 * pitää zoomatessa päällä (paitsi jos menee rajan yli missä poistuu),
 * niin sen voisi kytkeä päälle."* Kerros ei siis piiloudu eleen ajaksi
 * kummassakaan eleessä; luokkaa `.kartta-tummennus-piilossa` ei ole
 * olemassa missään. Piilotuksen perustelu kaatui aikanaan mittaukseen
 * (nipistys 1101 → 1125 ms, panorointi 779 → 686 ms; ero on ajojen omaa
 * hajontaa), ja kevennyttyään kerros on entistä halvempi: jäljellä on
 * yksi viiva ilman täyttöä.
 *
 * *"PAITSI JOS MENEE RAJAN YLI MISSÄ POISTUU"* on NÄKYVYYSEHTO EIKÄ
 * ELE-EHTO: `tunniste` antaa kerroksen vain pelaajan omasta uloimmasta
 * zoomista sisäänpäin ja vain nykyiselle maalle. Loitonnus rajan yli
 * tyhjentää kerroksen ja maanvaihto latoo sen uudelle maalle —
 * kumpikin näkymän ASETUTTUA, ei eleen aikana.
 *
 * FEIDAUS SEURAA VIIVAN SYNTYÄ EIKÄ ELETTÄ. Kerroksella on `animation`
 * eikä `transition`, ja `piirra` käynnistää sen uudelleen aina kun
 * viiva rakennetaan — se on ainoa hetki, jossa kerros ilmestyy
 * tyhjästä. Feidattava ominaisuus on peritty `stroke-opacity` eikä
 * ryhmän `opacity` (ryhmän peittävyys teki kerroksesta oman
 * läpinäkyvyystasonsa: savuke-maailmanakyma nipistyksessä 382 →
 * 933–1202 ms), ja animaatio on PORTAIKKO (portaaton feidaus maalasi
 * varjon parikymmentä kertaa, 435–786 ms). Taulukko: css/styles.css
 * samassa lohkossa.
 *
 * KERROS ON STAATTINEN. Polku lasketaan vain kun maa vaihtuu tai
 * näkyvyys kytkeytyy — ei kehystä kohti, ei näkymää kohti, ei eleen
 * aikana.
 *
 * === AINEISTO ON POLTON OMA (1.9.2026) =============================
 *
 * Omistaja: *"saako nuo rajat korjattua, että tummennus ja maan rajan
 * vahvistus menisi samaa reittiä kuin raja kartassa? paksunna maan
 * rajaa myös hieman"*.
 *
 * Kysymys ei ollut piirtäjän vaan LÄHTEEN: tämä kerros piirsi Natural
 * Earthin 50m-polygoneista, kun laattoihin poltettu rajaviiva ja
 * rantaviiva tulevat 10m-aineistosta. Aineisto tehdään nyt samasta
 * 10m-lähteestä ja samalla 0,006 asteen kynnyksellä kuin poltto, joten
 * vahvistusviiva kulkee poltetun rajan päällä (mittaukset:
 * tools/generoi-maapolygonit.mjs).
 *
 * === AINEISTO ON LAISKA (sama malli kuin js/maakayrat.js) ==========
 *
 * assets/data/maapolygonit.json (tools/generoi-maapolygonit.mjs)
 * haetaan vasta kun efektiä ensi kertaa tarvitaan. Yhden tiedoston
 * versioon sitä EI upoteta: siellä haku epäonnistuu, `null` jää
 * muistiin ja efekti jää yksinkertaisesti pois — ei virhettä, ei
 * ilmoitusta. Sama koskee maata, jolle aineistossa ei ole polygonia.
 */

const TUMMENNUS_NS = 'http://www.w3.org/2000/svg';

/**
 * Ääriviivan leveys RUUTUPIKSELEINÄ (vector-effect: non-scaling-stroke,
 * css/styles.css).
 *
 * KARTTAVAKIO EIKÄ LAUTAYKSIKKÖ, ja se on mittaustulos eikä makuasia.
 * Pelilaudan rantaviiva ei ole DOMissa vaan POLTETTU laattoihin
 * (tools/fokuskartta/piirto.js osio 7: `lineWidth = 1.35 * S`, eli
 * runsas pikseli laatan omassa tarkkuudessa), joten sen paksuus on
 * ruudun ominaisuus eikä laudan. Lautayksikköinä annettu viiva
 * skaalautuisi zoomin mukana: sama 4,8 yksikköä oli lähikuvassa
 * kymmenkunta pikseliä paksu tolppa, joka peitti Egeanmeren pikkusaaret
 * kokonaan mustiksi läiskiksi (mitattu kuvakaappauksella 31.8.2026).
 *
 * VIIVA OLI ENNEN SAATTAJA, NYT SE ON KOKO EFEKTI. Ensimmäinen versio
 * oli 1,5 px täydellä musteella, ja omistaja katsoi kuvat 31.8.2026:
 * *"Kevyt ääriviiva mutta muut valtiot saisi tummentaa enemmän."* Ero
 * maahan tehtiin silloin PINNALLA eikä reunuksella, ja reunus
 * kevennettiin yhteen ruutupikseliin — hitusen ohuemmaksi kuin
 * poltettu rantaviiva, jottei Egeanmeren pikkusaari lue lähizoomissa
 * tummana renkaana eikä pieni maa kaukonäkymässä raskaana könttänä.
 * Pinta poistui 2.9.2026 (ks. tiedoston alku), mutta leveys jää siihen
 * mihin omistaja sen katsoi: 2 px on vahvistus, ei tolppa. Sävy
 * himmennetään samassa hengessä css/styles.css:ssä.
 *
 * 1 -> 2 PIKSELIÄ (omistaja 1.9.2026, sama kuvakaappaus Bulgarian
 * lehdestä kuin rajojen osuvuudessa, sanatarkasti: *"paksunna maan
 * rajaa myös hieman"*). Kaksi ruutupikseliä on runsas puolitoista
 * kertaa poltettu rantaviiva (piirto.js osio 7: `1,35 * S`), eli maan
 * oma raja erottuu nyt naapurinsa rannikosta ilman että siitä tulee
 * tolppa — se on juuri se, mitä *"hieman"* tarkoittaa. Yhden pikselin
 * viiva näytti samalta kuin rantaviiva sen alla, ja pyynnön syy oli
 * siinä: viivaa ei erottanut korostukseksi.
 *
 * PAKSUNNUS ON MAHDOLLINEN VASTA NYT. Niin kauan kuin viiva kulki eri
 * geometriaa kuin poltettu raja (ks. tools/generoi-maapolygonit.mjs
 * "LÄHDE ON SAMA KUIN POLTETULLA RAJALLA"), paksumpi viiva olisi vain
 * tehnyt eron näkyvämmäksi. Samalla reunalla se peittää poltetun viivan
 * kuten korostuksen kuuluukin.
 */
const TUMMENNUS_VIIVA = 2;

let polygoniLupaus = null;

/**
 * Aineisto kerran per istunto; epäonnistunut haku palauttaa null ja
 * seuraava tarve yrittää uudestaan (siksi lupaus nollataan virheessä).
 * Sanasta sanaan sama malli kuin js/maakayrat.js lataaMaakayrat.
 */
export function lataaMaapolygonit() {
  polygoniLupaus ??= fetch('assets/data/maapolygonit.json')
    .then((v) => (v.ok ? v.json() : null))
    .catch(() => null)
    .then((data) => {
      if (!data?.maat) polygoniLupaus = null;
      return data?.maat ? data : null;
    });
  return polygoniLupaus;
}

/**
 * Yhden maan renkaat SVG-polun d-merkkijonoksi.
 *
 * Aineisto on deltakoodattua kymmenesosayksikköä
 * (tools/generoi-maapolygonit.mjs `koodaa`), joten purku on yksi
 * silmukka eikä yhtään välitaulukkoa: luvut kirjoitetaan suoraan
 * polkuun.
 *
 * KIERTÄVÄN LAUDAN SAUMA. Muutama rengas ylittää laudan sauman (175 W:
 * Tšukotka, Aleutit, Fidži, Uusi-Seelanti), ja aineistossa ne ovat
 * ehjinä laudan välin [0, leveys) ulkopuolella. Rengas monistetaan
 * silloin laudan leveyden verran sivuun, ja kerroksen rajaus leikkaa
 * ylimenevän pois — sama ratkaisu ja sama syy kuin linssikerroksella
 * (js/ui.js drawBoard "Rajaus sauman yli").
 */
function maanPolku(renkaat, tarkkuus, leveys) {
  const osat = [];
  for (const r of renkaat) {
    let x = 0;
    let y = 0;
    let minX = Infinity;
    let maxX = -Infinity;
    let d = '';
    for (let i = 0; i < r.length; i += 2) {
      x = i ? x + r[i] : r[i];
      y = i ? y + r[i + 1] : r[i + 1];
      const lx = x / tarkkuus;
      if (lx < minX) minX = lx;
      if (lx > maxX) maxX = lx;
      d += `${i ? 'L' : 'M'}${lx.toFixed(1)} ${(y / tarkkuus).toFixed(1)}`;
    }
    d += 'Z';
    osat.push(d);
    // Sauman yli ulottuva rengas myös laudan toiselle laidalle.
    if (leveys > 0 && minX < 0) osat.push(siirra(d, leveys));
    else if (leveys > 0 && maxX > leveys) osat.push(siirra(d, -leveys));
  }
  return osat.join('');
}

/** Sama polku vaakasuunnassa siirrettynä (vain M/L-komennot). */
function siirra(d, dx) {
  return d.replace(/([ML])(-?[\d.]+)/g, (_, kirjain, luku) => `${kirjain}${(Number(luku) + dx).toFixed(1)}`);
}

/*
 * Maakohtaiset polkumerkkijonot kerran istuntoa kohti.
 *
 * Varjo on JOKAINEN MUU MAA, joten maanvaihto latoisi ilman muistia 133
 * maan renkaat uudestaan — samat luvut, sama tulos. Muisti on
 * moduulitasolla eikä ui-oliossa, koska sen syöte (aineisto + laudan
 * leveys) on sama kaikille laudoille, jotka samaa aineistoa käyttävät;
 * laudan vaihtuessa syöte vaihtuu ja muisti rakennetaan uudelleen.
 */
let polkuMuisti = null;

/** Yhden maan polku muistista tai laskettuna. */
function maanPolkuMuistista(data, iso, tarkkuus, leveys) {
  if (polkuMuisti?.data !== data || polkuMuisti.tarkkuus !== tarkkuus
    || polkuMuisti.leveys !== leveys) {
    polkuMuisti = { data, tarkkuus, leveys, polut: new Map() };
  }
  let d = polkuMuisti.polut.get(iso);
  if (d === undefined) {
    d = maanPolku(data.maat[iso], tarkkuus, leveys);
    polkuMuisti.polut.set(iso, d);
  }
  return d;
}

/**
 * Kerros paikalleen tai pois — kutsutaan näkymän ASETUTTUA
 * (js/ui.js paivitaMaastonimet) ja maan vaihtuessa
 * (js/ui.js paivitaFokusPohja), ei koskaan eleen aikana.
 *
 * Työ tehdään vain kun tunniste muuttuu: sama maa samalla
 * näkyvyydellä ei kirjoita DOMiin mitään.
 */
export function paivitaMaatummennus(ui) {
  const kerros = ui.maatummennusKerros;
  if (!kerros) return;
  const tila = tunniste(ui);
  if (ui.maatummennusAvain === (tila?.avain ?? null)) return;
  if (!tila) {
    ui.maatummennusAvain = null;
    if (kerros.firstChild) kerros.textContent = '';
    return;
  }
  /*
   * Aineisto voi olla vielä matkalla. Avainta EI merkitä ennen kuin
   * polku on piirretty, jotta seuraava asettuminen yrittää uudelleen —
   * ja lupaus on jaettu, joten odottaminen ei tee uutta hakua.
   */
  lataaMaapolygonit().then((data) => {
    if (ui.dead || !data) return;
    // Näkymä on voinut vaihtua haun aikana.
    if (tunniste(ui)?.avain !== tila.avain) return;
    if (ui.maatummennusAvain === tila.avain) return;
    piirra(ui, data, tila);
  });
}

/**
 * Mitä kerroksessa pitäisi nyt olla — tai null, jos ei mitään.
 *
 * AVAIN ON PELKKÄ MAA. Viiva on maan muotoinen eikä laatikko, joten se
 * ei riipu arkista, näkymästä eikä mittakaavasta: panorointi ja
 * zoomaus eivät tee työtä, ja vain maanvaihto tai näkyvyysrajan ylitys
 * latoo polun uudelleen.
 *
 * Arkki oli mukana avaimessa niin kauan kuin kerros oli arkin kokoinen
 * suorakaide (arkki tarkentuu kerran laudan elinaikana, kun pyramidin
 * luettelo saapuu verkosta — js/ui.js paivitaLaudanRajat). Maapolku ei
 * tunne arkkia lainkaan, joten se tarkennus ei enää koske tätä
 * kerrosta.
 *
 * KEHITTÄJÄTILA EI OLE POIKKEUS (omistaja 2.9.2026): sama ääriviiva
 * molemmissa tiloissa, eikä kytkintä ole enää olemassa.
 */
function tunniste(ui) {
  const iso = ui.fokuskarttaAvain;
  if (!iso) return null;
  const raja = ui.kartta?.pelaajanUloinSkaala?.();
  if (!(raja > 0)) return null;
  const skaala = ui.nakyvaAlue?.()?.skaala;
  if (!(skaala > 0)) return null;
  // Pieni sietovara: pelaajan uloin taso itse kuuluu mukaan.
  if (!(skaala >= raja * 0.999)) return null;
  return { iso, avain: iso };
}

/** Nykyisen maan renkaat viivana — kerroksen ainoa sisältö. */
function piirra(ui, data, tila) {
  const kerros = ui.maatummennusKerros;
  const renkaat = data.maat[tila.iso];
  if (!renkaat?.length) {
    /*
     * Maalle ei ole polygonia: efekti jää hiljaa pois. Avain merkitään,
     * ettei jokainen asettuminen etsi polygonia uudelleen.
     */
    ui.maatummennusAvain = tila.avain;
    if (kerros.firstChild) kerros.textContent = '';
    return;
  }
  const map = ui.game?.pack?.map;
  const leveys = map?.kiertava ? (data.lauta?.leveys ?? map.width) : 0;
  const tarkkuus = data.tarkkuus || 10;
  const oma = maanPolkuMuistista(data, tila.iso, tarkkuus, leveys);
  kerros.textContent = '';
  /*
   * VAIN VIIVA, EI YHTÄÄN TÄYTTÖÄ (omistaja 2.9.2026). Naapurimaiden
   * varjo piirrettiin tähän 31.8.2026–2.9.2026; nyt kerros ei maalaa
   * pintaa lainkaan, joten meri, järvet ja naapurit ovat kartan omassa
   * sävyssä ja korostuksena on pelkkä nykyisen maan raja.
   */
  const viiva = document.createElementNS(TUMMENNUS_NS, 'path');
  viiva.setAttribute('class', 'maatummennus-viiva');
  viiva.setAttribute('d', oma);
  viiva.setAttribute('stroke-width', String(TUMMENNUS_VIIVA));
  kerros.appendChild(viiva);
  ui.maatummennusAvain = tila.avain;
  /*
   * FEIDAUS ALKAA TÄSTÄ HETKESTÄ (1.9.2026). Kerros ei enää katoa eleen
   * ajaksi, joten `display: none` → näkyvä ei enää käynnistä
   * css/styles.css:n `maatummennus-esiin`-animaatiota. Varjo ilmestyy
   * nyt vain silloin kun se rakennetaan — maanvaihdossa tai
   * näkyvyysehdon auetessa — ja animaatio käynnistetään siinä käsin.
   *
   * `animation: none` + pakotettu tyylin luku + takaisin on selaimen
   * oma tapa nollata käynnissä oleva animaatio. Luku maksaa yhden
   * tyylilaskennan, ja se tehdään korkeintaan kerran maanvaihtoa
   * kohti — ei näkymää eikä kehystä kohti.
   */
  kerros.style.animation = 'none';
  void getComputedStyle(kerros).animationName;
  kerros.style.animation = '';
}

/** Lauta vaihtui tai peli purettiin: kerros ja avain nollille. */
export function nollaaMaatummennus(ui) {
  ui.maatummennusAvain = null;
  if (ui.maatummennusKerros?.firstChild) ui.maatummennusKerros.textContent = '';
}
