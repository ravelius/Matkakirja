/*
 * NOSTOJEN LADONTA ILMAN SELAINTA — se laskenta, joka poltetaan
 * laattoihin, ja se sama laskenta, jonka paalle peli latoo
 * napautusalueensa.
 *
 * OMISTAJAN PÄÄTÖS 31.8.2026 (Raamattu, KARTTANOSTOT POLTETAAN
 * LAATTOIHIN), sanatarkasti: *"mikään karttanostoista ei kuulu kadota
 * laudalta missään vaiheessa peliä, joten ne voidaan aivan hyvin
 * polttaa suoraan karttaan. Ainoa, mitä ei polteta, on ne vilkkuvat
 * valot sekä tietysti muut pelin aikana vaihtelevat asiat, mutta
 * karttamerkit pysyvät aina samoina ja paikallaan ja näkyvissä."* — ja
 * saman päivän tarkennus: *"myös nostojen tekstit on hyvä polttaa
 * suoraan kartalle."*
 *
 * ── TÄMÄ MODUULI EI LADO MITÄÄN ───────────────────────────────────
 *
 * Täällä on VAIN se, mitä poltettu ja elävä kerros tarvitsevat
 * yhteisesti: ladonnan mittakaava ja merkin sisältötiiviste. Itse
 * ladonta on pelin omissa passeissa, ja laattageneraattori ajaa ne
 * sellaisenaan ilman DOMia — tynkä `ui` kootaan
 * tools/fokuskartta/nostot.mjs:ssä, ja passit ovat nämä:
 *
 *   merkkirivit         js/fokuskohteet.js  kohdeKarttarivit
 *   kasaus kaupunkeihin js/fokusniput.js    niputaFokusmerkit
 *   erottelusiirto      js/fokuskohteet.js  eritteleKohdeRyhmat
 *   nimioiden vaisto    js/fokuskohteet.js  paivitaKohdeNimiot
 *   nimion mitta        js/fokusnosto-symbolit.js  nostosymNimioMitta
 *
 * Raamattu vaatii tämän sanatarkasti: *"Poltetun ladonnan ja selaimen
 * osumamuotojen on tultava SAMASTA lähteestä, ettei kahta ladontaa
 * pääse eriytymään."* Jos generaattoriin joskus kirjoitetaan oma kaava
 * jostakin yllä olevasta, poltettu merkki ja sen näkymätön
 * kosketusalue alkavat erota — ensin pyöristyksen verran, sitten
 * kokonaan.
 *
 * ── TÄMÄ ON LEHTIMODUULI, EIKÄ SE SAA TUODA MITÄÄN ────────────────
 *
 * js/fokuskohteet.js kysyy täältä tiivisteen (onko merkki poltettu) ja
 * js/ui.js mittakaavan. Jos tämä toisi kohdekerroksen, syntyisi kehä —
 * ja yhden tiedoston versiossa (tools/build-standalone.mjs) kehä ei ole
 * varoitus vaan ladontajärjestyksen virhe.
 *
 * ── MIKSI TÄMÄ ON MAHDOLLISTA VASTA NYT (v1382) ───────────────────
 *
 * Ladonta riippui neljästä ruudun mitasta v1382:een asti. Siinä
 * erässä ne kiinnitettiin lehden perustason vakioon
 * (`nostoladontaSkaala`, ent. js/ui.js fokusMerkkiSkaalaPohja), ja
 * nimiön leveys siirtyi merkkileveystaulukkoon `measureText`in tilalle
 * (js/fokusnosto-symbolit.js nostosymNimioMitta). Sen jälkeen iPad,
 * iPhone, työpöytä ja Node antavat saman ladonnan.
 *
 * ── MITÄ EI POLTETA, JA MIKSI ─────────────────────────────────────
 *
 * 1. VILKKUVAT VALOT (js/karttavalot.js), PELAAJAN NAPPULA,
 *    VUORORENGAS, NYKYISEN KAUPUNGIN KOROSTUSLAATTA ja VIHREÄ
 *    KOHTAAMISPISTE. Omistajan oma rajaus: nämä vaihtuvat pelin
 *    aikana.
 *
 * 2. NAPAUTUSALUEET. Poltettu merkki on pikseleitä laatassa eikä ota
 *    vastaan kosketusta, joten näkymättömät osumamuodot jäävät
 *    selaimeen — ja ne piirretään TÄSTÄ ladonnasta, samaan pisteeseen.
 *
 * 3. TÄKYNOSTOT (js/fokusnosto.js). Nämä JÄÄVÄT ELÄVIKSI, ja syy on
 *    mitattu eikä mielipide: täkypooli luetaan KAUPUNGIN omasta
 *    paketista (js/fokusvirta.js fokusvirtaSisalto -> `takynostot`) ja
 *    vasta sen puuttuessa maapoolista, joten saman maan kaksi
 *    kaupunkia näyttävät eri joukon täkyjä. Joukko siis muuttuu pelin
 *    aikana — ja koska täky menee samaan sarakkeeseen kuin muut merkit
 *    (js/fokusniput.js), se siirtäisi KOKO sarakkeen rivit — ja
 *    naapureitaan vielä erottelusiirrolla (js/fokuskohteet.js
 *    eritteleKohdeRyhmat). Lisäksi täky ilman omia koordinaatteja
 *    asettuu siihen kaupunkiin, jossa pelaaja sillä hetkellä on
 *    (js/fokusnosto.js nostonPaikka).
 *
 *    SEURAUS ON KIRJATTAVA: MAA, JONKA TÄKYJOUKKO EI OLE VAKAA, JÄÄ
 *    KOKONAAN POLTTAMATTA (jokainen sen merkki saa `poltettava:
 *    false`). Sarakekohtainen esto ei riittäisi, koska täky liikuttaa
 *    myös oman sarakkeensa ulkopuolisia merkkejä. Se on omistajan oma
 *    malli: *"uusia karttanostoja tulee vielä … ne voi väliaikaisesti
 *    tehdä samalla tavalla kuin tähän asti … tehdään vain sitten uusi
 *    poltto kartalle sopivassa vaiheessa."*
 *
 *    MITATTU 31.8.2026: seitsemän maata (BGR, BIH, ESP, GBR, ITA, ROU,
 *    UKR) jäi ulos, ja 624 merkistä poltettiin 413. Jokainen esto oli
 *    korjattavissa DATASSA eikä koodissa — viisi täkyä tarvitsi omat
 *    koordinaatit ja kaksi maata yhtenäisen täkypoolin.
 *
 *    NE VIISI PAIKKA-KENTTÄÄ ON NYT KIRJOITETTU (31.8.2026, sama
 *    päivä): `areena` (BGR), `pyramidi` (BIH), `kissat` (ITA),
 *    `dracula` (ROU) ja `sofian-mosaiikit` (UKR) saivat omat
 *    koordinaattinsa kaupunkipaketteihinsa. Mitattu uudelleen: 628
 *    merkistä poltetaan 510, ja ulos jää enää KAKSI maata (ESP, GBR),
 *    joiden täkypooli vaihtuu kaupungeittain — se on täkyjoukon
 *    sisällön kysymys eikä paikka-kentän, joten se jää päätettäväksi.
 *
 * ── NIMET ON PREFIKSOITU ──────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NOSTOLADONTA_/nostoladonta-etuliitteellä.
 */
/*
 * LEHDEN OMA PROTOTYYPPILEVEYS JA MERKIN KATTO.
 *
 * Luvut asuivat js/ui.js:ssä (FOKUS_LEHTI_PROTO, FOKUS_MERKKI_KATTO).
 * Ne muuttivat tänne, koska laattageneraattori tarvitsee saman kaavan
 * eikä voi tuoda js/ui.js:ää — se vetäisi mukanaan koko pelin
 * käyttöliittymän. js/ui.js tuo ne nyt täältä, joten kaava on yhdessä
 * paikassa ja sen arvo on täsmälleen entinen.
 *
 * PROTO on tools/fokuskartta/piirto.js:n `S`: lehden kaikki ladonta —
 * kirjainkoot, viivanleveydet, vuorikolmiot — on annettu 1600 pikselin
 * levyisen lehden pikseleinä.
 *
 * KATTO on se, montako lehden omaa pikseliä yksi merkin perustason
 * pikseli saa olla. 2,0 tekee kohdemerkin symbolista lehden
 * vuorikolmion mittaisen ja nimiöstä poltetun vuorennimen kokoisen.
 */
export const NOSTOLADONTA_PROTO = 1600;
export const NOSTOLADONTA_KATTO = 2.0;

/*
 * YKSI GLOBAALI MITTAKAAVA KOKO LAUDALLE (omistajan valinta
 * kysymyskortilla 31.8.2026: "0,60 — Kreikan mitta").
 *
 * Vanha kaava KATTO * rajaus.w / PROTO oli MAAKOHTAINEN: se oli oikea
 * silloin, kun jokainen lehti katsottiin erikseen ruudulle
 * sovitettuna, mutta yhdellä yhteisellä pyramidikartalla se antoi
 * 134 maalle 129-kertaisen hajonnan (RUS 7,215 … SHN 0,056).
 * Mitattuna: Venäjän nostonimiöt olivat 500 km:n janalla 24,4 px kun
 * kartan omat paikannimet ovat 10,5 px; Kreikan 3,0 px samalla
 * janalla.
 *
 * 0,60 on "Kreikan mitta koko maailmalle": omistajan jo hyväksymät
 * maat (GRC 0,585, FIN, ITA, EGY) pysyvät käytännössä ennallaan ja
 * vain jättiläiset kutistuvat (RUS ÷12). Keskizoomilla (z6) nimiö on
 * kartan oman paikannimen kokoinen; syvimmällä tasolla 2,4-kertainen.
 */
export const NOSTOLADONTA_S = 0.6;

/**
 * MERKKIEN LADONNAN MITTAKAAVA — laudan oma, ei ruudun eikä lehden.
 *
 * Lautayksikköä kirjaston yksikköä kohti. Yksi globaali vakio koko
 * laudalle (NOSTOLADONTA_S) — sama luku joka ruudulla, joka
 * laitteella, joka maassa ja Nodessa — ja juuri se koko, joka
 * laattaan poltetaan.
 *
 * Rajaus on yhä portti: ilman lehden ikkunaa 0, sillä siinä
 * näkymässä ei ole poltettavaakaan, ja kutsuja jää entiseen
 * ruutumittaan. Rajausta ei enää käytetä mittana — se hajotti koon
 * maittain (ks. NOSTOLADONTA_S).
 */
export function nostoladontaSkaala(rajaus) {
  if (!(rajaus?.w > 0)) return 0;
  return NOSTOLADONTA_S;
}

/* ============ TIIVISTE: MUUTOS ON HUOMATTAVA =======================
 *
 * Raamattu 31.8.2026: luettelo kantaa tiedon siitä, MITKÄ nostot
 * ajossa poltettiin, ja *"Pelkkä totuusarvo EI riitä kuten nimiöillä,
 * koska kerrokset ovat rinnakkain eivätkä toisensa poissulkevia."*
 *
 * Tunnus yksin ei riitä sekään: jos noston SISÄLTÖ muuttuu polton
 * jälkeen — kohteelle kirjoitetaan uusi nimi, ryhmään tulee jäsen,
 * merkki siirtyy — laatassa on vanha kuva, ja pelkkään tunnukseen
 * luottava peli vaikenisi ja näyttäisi vanhentunutta. Tiiviste tekee
 * erosta näkyvän: luettelon ja pelin tiivisteet eroavat, peli piirtää
 * merkin elävänä, ja seuraava poltto korjaa laatan.
 *
 * TIIVISTEESEEN KUULUU SE, MIKÄ LAATTAAN MENI JA MIKÄ VOI MUUTTUA
 * DATASSA: tunnus, symboli, merkin laji, nimiö sellaisena kuin se
 * piirtyy (lyhennettynä ja katkaistuna), merkin lopullinen paikka
 * laudalla ja ryhmän jäsenet järjestyksessä.
 *
 * VÄISTÖN PÄÄTÖS — näkyykö nimiö ja kummalla puolella — EI OLE
 * TIIVISTEESSÄ, ja se on tarkoitus. Päätös on FUNKTIO edellisistä:
 * merkkijoukosta, paikoista ja nimiöteksteistä (js/fokuskohteet.js
 * paivitaKohdeNimiot). Jos jokin niistä muuttuu, tiiviste muuttuu jo
 * niiden kautta; jos mikään ei muutu, päätöskin on sama. Ainoa tapa
 * saada päätös muuttumaan tiivisteen huomaamatta on muuttaa väistön
 * ALGORITMIA, ja se on koodimuutos, joka vaatii uuden polton siinä
 * missä symbolin muodon muutoskin.
 *
 * SYY, MIKSI SE ON POIS, ON RAKENTEELLINEN: peli päättää merkin
 * poltetuksi ENNEN väistöpassia (väistö tarvitsee tiedon siitä, mitkä
 * merkit ovat eläviä), joten päätös ei voi olla tiivisteen syötettä
 * ilman kehää.
 *
 * PAIKKA PYÖRISTETÄÄN kolmeen desimaaliin. Ilman sitä kelluvan
 * pisteen viimeinen bitti tekisi jokaisesta ajosta eri tiivisteen,
 * eikä kenttä kertoisi enää mitään; kolme desimaalia on lautayksikön
 * tuhannesosa eli Ateenan leveydellä noin kaksi ja puoli millimetriä.
 *
 * FNV-1a 32 bittiä. Tiiviste ei suojaa miltään — se erottaa kaksi
 * versiota samasta merkistä — joten kryptografista tiivistettä ei
 * tarvita eikä sitä saisi tuoda riippuvuutena kahteen ajoympäristöön.
 * Kahdeksan heksamerkkiä riittää: kuudellasadalla merkillä
 * yhteentörmäyksen todennäköisyys on suuruusluokkaa 4e-5, ja
 * törmäyksen hinta on yksi merkki, joka jää päivittymättä seuraavaan
 * polttoon asti.
 */
export function nostoladontaTiiviste(merkki) {
  const osat = [
    merkki.tunnus,
    merkki.symboli ?? '',
    merkki.laji ?? '',
    merkki.nimio ?? '',
    Number(merkki.x).toFixed(3),
    Number(merkki.y).toFixed(3),
    (merkki.osat ?? []).join('+'),
  ].join('');
  let h = 0x811c9dc5;
  for (let i = 0; i < osat.length; i += 1) {
    h ^= osat.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}
