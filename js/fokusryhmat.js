/*
 * KATEGORIA PER KAUPUNKI — saman kaupungin samanlajiset kohteet
 * yhdeksi merkiksi kartalle.
 *
 * OMISTAJAN PÄÄTÖS 31.8.2026 (kysymyskortti, valittu vaihtoehto
 * *"Kategoria per kaupunki"*). Sanatarkka havainto, josta työ lähti:
 * *"on vielä ongelma, kun joillain kaupungeilla, varsinkin Ateenalla,
 * on niin monta karttanostoa suoraan kaupungista, että miten sen saisi
 * tyylikkäästi ratkaistua. Ehkä pitää vain yhdistää muutama saman
 * kategorian kohde samalle pop-up-lehdelle. Ja samalla voitaisiin tuoda
 * kaikkia tällaisia merkkejä vielä lähemmäs kaupunkia, niin että
 * katkoviivat eivät olisi niin pitkiä."*
 *
 * ── MIKÄ ONGELMA TÄSSÄ RATKAISTAAN ────────────────────────────────
 *
 * Ateenan laatan ympärillä on KYMMENEN merkkiä, ja jokainen niistä on
 * oikeasti Ateenassa: mitattuna 0,06–0,63 lautayksikköä laatasta eli
 * 0,2–1,6 km. Data ei siis ole väärin — koordinaatit on tarkistettu —
 * vaan ESITYS on: kymmenen merkkiä ei mahdu kaupungin kylkeen ilman
 * pitkää katkoviivasaraketta (js/fokusniput.js). Kartalta katoaa
 * kaupunki, kun sen ympärille latoutuu kymmenen nimiötä.
 *
 * VAIN ESITYS NIPUTTUU, SISÄLTÖ EI. Yhdistetty merkki on KUORI, joka
 * kantaa jäsenensä `osat`-listassa sellaisinaan: jokaisen kohteen oma
 * teksti, kuva, visa, lähde ja avaaja säilyvät koskemattomina, ja
 * napautus avaa lehden, jossa ne ovat omina osioinaan
 * (js/fokuskohteet.js avaaFokuskohde → piirraRyhmanOsiot). Yhtäkään
 * kohdetta ei katoa eikä yhdisty toiseen. Sama sopimus kuin
 * erottelusiirrolla (js/fokuskohteet.js eritteleKohdeRyhmat) ja
 * kasauspassilla (js/fokusniput.js): pakettien data jää koskematta.
 *
 * ── KATEGORIA TULEE DATASTA, EI MAUSTA ────────────────────────────
 *
 * Kategoria on TÄSMÄLLEEN SE, JOLLA MERKKI JO PIIRRETÄÄN kartalle:
 * js/fokuskohteet.js kohteenSymboli (0. kadonnut ihme → tähti,
 * 1. kohteen oma `symboli`-kenttä, 2. kierros → silmä, 3. tyyppijohto
 * KOHDE_TYYPPISYMBOLIT, 4. muuten null). Luokittelija annetaan tälle
 * moduulille parametrina juuri siksi, ettei samaa sääntöä kirjoiteta
 * kahdesti — yhdistetyn merkin symboli on väistämättä sama kuin sen
 * jäsenten, koska se on sama funktio.
 *
 * Kategorioiden nimet ovat symbolikirjaston oma taulu
 * (js/fokusnosto-symbolit.js NOSTOSYM_LUOKAT), jota kohdekortin ylärivi
 * jo käyttää. Uutta kategoriaa ei siis keksitty yhtään.
 *
 * KAUPUNKI EI YHDISTY (RYHMA_EI_YHDISTY). Perustelu on kirjattu jo
 * kohdemerkkien symbolitauluun: *"kaupunki on paikka eikä kategoria"*
 * (js/fokuskohteet.js kohteenSymboli, valintajärjestys kohta 4).
 * Kahden naapurikaupungin niputtaminen "Kaupungit"-merkiksi veisi
 * kartalta juuri ne nimet, jotka lehti on tarkoittanut näyttää.
 *
 * ── RAJA ON LAUDAN YKSIKKÖ, EI RUUDUN PIKSELI ─────────────────────
 *
 * TÄMÄ ON POLTON EHTO (Raamattu 31.8.2026, KARTTANOSTOT POLTETAAN
 * LAATTOIHIN): laattageneraattori joutuu tekemään saman laskennan
 * selaimen ulkopuolella, joten ryhmittely ei saa riippua ruudun
 * koosta, dpr:stä eikä mistään muusta ajonaikaisesta. Jokainen tämän
 * tiedoston luku on LAUDAN YKSIKKÖÄ ja jokainen syöte laudan dataa —
 * funktio on puhdas, ja sama lauta antaa aina saman tuloksen.
 *
 * Tämä on tarkoituksellinen ERO kasauspassin nykyiseen sääntöön 10
 * (js/fokusniput.js), joka mittaa kaupungin päälle osumisen RUUDUN
 * mitassa (NIPPU_KIEKKO_R * s) ja antaa siksi eri vastauksen
 * puhelimella (7,7 yksikköä) ja työpöydällä (4,7). Ryhmittely on
 * ennen kasausta ja sitä ennen kuin ruudusta tiedetään mitään.
 *
 * RAJAN MITTA (5) on luettu datasta eikä valittu. Koko maailman
 * merkkien etäisyys lähimpään kaupunkiin kasautuu kahteen pesään:
 * 118 merkkiä on 1,5 yksikön sisällä ja 154 viiden yksikön sisällä,
 * mutta viidestä viiteentoista yksikköön tulee enää 28 lisää. Raja
 * osuu siis pesien VÄLIIN kaikissa mitatuissa kaupungeissa:
 *
 *   Ateena      kauimmainen kaupunkikohde 0,63 → seuraava 10,26
 *   Rooma       1,33 → 71,98
 *   Istanbul    4,73 → 32,58
 *   Dubrovnik   3,97 → 16,48
 *   Sofia       2,48 → 5,12 (Vitoša-vuori jää ulos, kuten kuuluukin)
 *   Pariisi     1,43 → 7,29 (Kaulanauhajuttu jää omaksi merkikseen)
 *
 * Lautayksikkö on Ateenan leveydellä noin 2,6 km, joten viisi yksikköä
 * on ~13 km — kaupungin mitta, ei maakunnan.
 *
 * ── MITÄ POLTTO VIELÄ TARVITSEE (suunnitelma, EI toteutettu) ──────
 *
 * Omistajan tarkennus 31.8.2026: *"uusia karttanostoja tulee vielä kun
 * maailmaa rakennetaan, niin ne voi väliaikaisesti tehdä samalla
 * tavalla kuin tähän asti … tehdään vain sitten uusi poltto kartalle
 * sopivassa vaiheessa. myös nostojen tekstit on hyvä polttaa suoraan
 * kartalle."* Kartalla on siis pysyvästi KAKSI RINNAKKAISTA KERROSTA:
 * viime ajossa poltetut nostot ja niiden jälkeen lisätyt elävät.
 *
 * VAARA ON KAKSOISPIIRTO, ja se on tapahtunut kerran jo: v1366:ssa
 * sama paikannimi oli kartalla poltettuna ja elävänä. Ratkaisumalli on
 * repossa valmiina (js/laattapyramidi.js laatoissaOnNimet): tieto EI
 * saa asua koodissa, koska julkaisun ja pyramidiajon väliin jäisi
 * ikkuna, jossa nostot olisivat joko kahdesti tai eivät kertaakaan.
 * Tieto tulee LUETTELOSSA (pyramidi.json) laattojen mukana samasta
 * ajosta, jolloin se ei voi olla eri mieltä kuin laatat.
 *
 * ERO NIMIÖIHIN: `nimiot: false` riittää nimille, koska kerrokset ovat
 * toisensa poissulkevat — joko laatat latovat nimet tai peli. Nostoilla
 * kerrokset ovat RINNAKKAISET, joten totuusarvo ei riitä: luettelon on
 * kannettava, MITKÄ nostot kyseisessä ajossa poltettiin. Yksikkö on
 * MERKKI eikä kohde, koska merkki on se, mikä piirretään — tämän
 * moduulin antama `ryhma-<kaupunki>-<kategoria>` tai yksin jääneen
 * kohteen oma tunnus. Kentän luonnos on tunnus → sisällön tiiviste,
 * jolloin sama kenttä vastaa molempiin kysymyksiin: onko merkki
 * poltettu, ja onko sen sisältö sen jälkeen muuttunut.
 *
 * OLETUS ON PÄINVASTAINEN KUIN NIMIÖILLÄ: kun kenttää ei ole (vanha
 * ajo) tai luetteloa ei ole vielä ladattu, MITÄÄN EI OLE POLTETTU ja
 * peli piirtää kaiken elävänä. Perustelu on sama kuin nimiöillä —
 * valitaan se väärinolo, joka ei kadota sisältöä — mutta se kääntyy
 * toisin päin, koska tässä sisällön kadottaisi juuri "on poltettu":
 * omistajan sanatarkka ehto on *"mikään karttanostoista ei kuulu
 * kadota laudalta missään vaiheessa peliä"*. Väärä oletus maksaa
 * silloin enintään hetkellisen kaksoispiirron samaan paikkaan, ja se
 * korjaantuu itsestään luettelon saapuessa.
 *
 * TÄMÄN ERÄN OSUUS suunnitelmasta on se, että ryhmittely on jo
 * poltettavissa: puhdas funktio, laudan yksiköt, vakaa tunnus. Kaksi
 * ladontaa EI VIELÄ TULE SAMASTA LÄHTEESTÄ — kasauspassin sarake
 * (js/fokusniput.js) lasketaan ruudun mitassa — ja se on polttoerän
 * ensimmäinen työ, ei tämän.
 *
 * ── NIMET ON PREFIKSOITU ──────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * RYHMA_/ryhma-etuliitteellä.
 */
import { NOSTOSYM_LUOKAT } from './fokusnosto-symbolit.js';

/**
 * Kuinka läheltä kaupunkia kohde poimitaan sen ryhmään, laudan
 * yksiköinä. Ks. tiedoston alku, "RAJA ON LAUDAN YKSIKKÖ".
 */
export const RYHMA_RAJA = 5;

/**
 * Kategoriat, jotka EIVÄT yhdisty. Kaupunki on paikka eikä kategoria
 * (ks. tiedoston alku).
 */
export const RYHMA_EI_YHDISTY = new Set(['kaupunki']);

/** Yhdistetyn merkin tunnus — vakaa, jotta auki oleva kortti löytää sen. */
export function ryhmaTunnus(cityId, kategoria) {
  return `ryhma-${cityId}-${kategoria}`;
}

/**
 * Onko kohde yhdistetty kuori? Kutsujat lukevat tästä eivätkä
 * `tyyppi`-kentästä, jotta kuoren tunnistus on yhdessä paikassa.
 */
export function ryhmaKuori(kohde) {
  return Array.isArray(kohde?.osat) && kohde.osat.length > 1;
}

/**
 * KAUPUNKI, JOHON KOHDE KUULUU — lähin kaupunki RYHMA_RAJAn sisällä.
 *
 * Tasapelin ratkaisee kaupunkilistan järjestys (pienempi indeksi
 * voittaa), jotta vastaus on sama joka ajolla.
 *
 * @param {{x:number,y:number}} paikka  laudan koordinaatit
 * @param {Array<{id:string,name:string,x:number,y:number}>} kaupungit
 * @returns {?object} kaupunki tai null
 */
function ryhmanKaupunki(paikka, kaupungit) {
  let lahin = null;
  let etaisyys = RYHMA_RAJA;
  for (const kaupunki of kaupungit) {
    if (!Number.isFinite(kaupunki?.x) || !Number.isFinite(kaupunki?.y)) continue;
    const e = Math.hypot(paikka.x - kaupunki.x, paikka.y - kaupunki.y);
    if (e < etaisyys) { etaisyys = e; lahin = kaupunki; }
  }
  return lahin;
}

/**
 * RYHMITTELYPASSI — puhdas funktio laudan koordinaateista.
 *
 * Yksinään jäävä kohde palautetaan SELLAISENAAN (sama olio, sama
 * paikka): yhdistäminen koskee vain paria tai useampaa. Kahden tai
 * useamman jäsenen ryhmä korvautuu yhdellä kuorella, joka
 *
 *   - istuu sen jäsenen paikassa, joka on LÄHINNÄ kaupunkia (kuori on
 *     siis aina oikeassa paikassa kartalla eikä keksityssä
 *     keskipisteessä; tasapelin ratkaisee syötteen järjestys),
 *   - saa jäsentensä yhteisen kategorian symbolikseen ja sen luokan
 *     nimen nimiökseen (NOSTOSYM_LUOKAT),
 *   - ottaa listassa ENSIMMÄISEN jäsenensä paikan, jolloin nimiöiden
 *     väistöjärjestys (js/fokuskohteet.js, "DETERMINISTINEN JÄRJESTYS")
 *     säilyy sellaisena kuin pakettien kirjoittaja sen latoi.
 *
 * @param {Array<{kohde:object,paikka:{x:number,y:number}}>} rivit
 * @param {Array<{id:string,name:string,x:number,y:number}>} kaupungit
 * @param {(kohde:object)=>?string} luokka  kategoria kohteelle — sama
 *   funktio, jolla merkin symboli valitaan (ks. tiedoston alku).
 * @returns {Array<{kohde:object,paikka:{x:number,y:number}}>}
 */
export function ryhmitaKohteet(rivit, kaupungit, luokka) {
  const lista = rivit ?? [];
  const kaupunkilista = kaupungit ?? [];
  if (!kaupunkilista.length || lista.length < 2) return lista;
  // Avain → { kaupunki, kategoria, jasenet: [{ rivi, etaisyys, jono }] }
  const ryhmat = new Map();
  const avaimet = new Array(lista.length).fill(null);
  lista.forEach((rivi, jono) => {
    const kategoria = luokka?.(rivi.kohde) ?? null;
    if (!kategoria || RYHMA_EI_YHDISTY.has(kategoria)) return;
    const kaupunki = ryhmanKaupunki(rivi.paikka, kaupunkilista);
    if (!kaupunki) return;
    const avain = ryhmaTunnus(kaupunki.id, kategoria);
    avaimet[jono] = avain;
    const ryhma = ryhmat.get(avain) ?? { kaupunki, kategoria, jasenet: [] };
    ryhma.jasenet.push({
      rivi,
      jono,
      etaisyys: Math.hypot(rivi.paikka.x - kaupunki.x, rivi.paikka.y - kaupunki.y),
    });
    ryhmat.set(avain, ryhma);
  });
  const tulos = [];
  const tehdyt = new Set();
  lista.forEach((rivi, jono) => {
    const avain = avaimet[jono];
    const ryhma = avain ? ryhmat.get(avain) : null;
    if (!ryhma || ryhma.jasenet.length < 2) { tulos.push(rivi); return; }
    if (tehdyt.has(avain)) return;
    tehdyt.add(avain);
    tulos.push(ryhmaKuoreksi(ryhma, avain));
  });
  return tulos;
}

/** Yhden ryhmän kuori: paikka lähimmästä jäsenestä, sisältö kaikista. */
function ryhmaKuoreksi(ryhma, avain) {
  const jarjestys = [...ryhma.jasenet]
    .sort((a, b) => (a.etaisyys - b.etaisyys) || (a.jono - b.jono));
  const ankkuri = jarjestys[0].rivi;
  const nimi = NOSTOSYM_LUOKAT[ryhma.kategoria] ?? ryhma.kategoria;
  return {
    kohde: {
      id: avain,
      nimi,
      nimio: nimi,
      tyyppi: 'ryhma',
      symboli: ryhma.kategoria,
      // Kaupungin nimi kortin pikkuriville: kuori kertoo, MISSÄ nämä
      // ovat — se on koko yhdistämisen peruste.
      kaupunki: ryhma.kaupunki.name ?? null,
      // Jäsenet KAUPUNGIN ETÄISYYDEN järjestyksessä: lehden ylin osio
      // on se, joka on lähinnä laattaa.
      osat: jarjestys.map(({ rivi }) => rivi.kohde),
    },
    paikka: { x: ankkuri.paikka.x, y: ankkuri.paikka.y },
  };
}
