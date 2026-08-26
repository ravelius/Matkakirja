/*
 * FOKUSKOHTEET — EGYPTI. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle. Kentät ja niiden
 * perustelut on selitetty Kreikan tiedoston alussa (kaksi pintaa yksi
 * lista, `kysymykset` ja `korostukset` pöllöä varten, `nappi`
 * valintakuplan lupauksena); tässä on vain se, mikä Egyptissä on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA (omistajan tilaus 26.8.2026) ───
 *
 * *"Peliin voisi generoida kaikki antiikin kadonneet ihmeet sekä jos
 * on muita vastaavia kadonneita, niin generoidaan ne kaikki."* Kaksi
 * seitsemästä ihmeestä ja antiikin kuuluisin kirjasto ovat samassa
 * kaupungissa, Aleksandriassa, eikä Egyptillä ollut vielä yhtään
 * kohdetta. Maan fokuslehti on jo olemassa (js/packs/fokus-grc.js
 * FOKUS_POHJAT.EGY, tiedosto EGY.webp), joten merkeillä on lehti,
 * jonka päälle asettua — se oli tämän tiedoston ainoa tekninen ehto.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * Egyptin lehti on maailmankartan lauta (FOKUS_POHJAT.EGY: lauta
 * 'maailmankartta'), eikä Euroopan laudalla ole Egyptiä. Rivillä on
 * siis vain `maailmankartta`, ja se on tietoinen valinta samasta
 * syystä kuin Turkin kahdella itäisimmällä kohteella: lauta, jota
 * rivillä ei ole, ei saa kohdetta kartalle lainkaan — ja se on
 * parempi kuin väärään paikkaan piirretty merkki.
 *
 * Kaava on maailmankartan oma Millerin lieriö (LEVEYS 12000 /
 * LON0 −175 / POHJOINEN 76, tools/tee-fokuskartta.mjs
 * laudanProjektio), sama kuin Kreikan tiedostossa. Kaava validoitiin
 * ennen käyttöä kolmella jo kirjatulla kohteella (Ateena, Efesos ja
 * Olympia: lasketut luvut vastasivat kirjattuja 0,1 yksikön
 * tarkkuudella), ja molemmat tämän tiedoston pisteet osuvat EGY-lehden
 * rajaukseen (x 6583–7137, y 2056–2527).
 *
 * ── KUVAT OVAT PELIN OMIA HAVAINNEKUVIA ────────────────────────────
 *
 * Kummastakaan kohteesta ei ole valokuvaa, koska kohdetta ei ole:
 * majakka romahti maanjäristyksissä ja kirjaston paikkaakaan ei
 * tunneta. Kuvakenttä on siksi `osoite` eikä `tiedosto` — polku
 * repoon (assets/kartat/ihmeet/), ei Commonsiin — ja kuvat syntyvät
 * .github/workflows/generoi-ihmeet.yml -ajossa. Kaksi ehtoa, joita ei
 * saa purkaa (sama sääntö kuin Kreikan tiedoston kadonneiden ihmeiden
 * lohkossa): selite alkaa aina sanalla "Havainnekuva" ja kertoo mihin
 * muoto perustuu, ja lähderivi on 'Matkakirjan havainnekuva'. Ennen
 * kuvaerän ajoa tiedostoa ei ole, ja kohde toimii silti — puuttuva
 * kuva poistaa vain kuvapaikan (js/fokuskohteet.js piirraKohdeKuva).
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkeli
 * kerrallaan 26.8.2026 — ei työaineistoa, joten lähderivit osoittavat
 * suoraan artikkeleihin.
 */
export const FOKUSKOHTEET_EGY = [
  {
    /*
     * FAROKSEN MAJAKKA. 29,886 E / 31,2148 N — en-Wikipedia
     * "Lighthouse of Alexandria" (tietolaatikon coordinates). Piste on
     * Faroksen saaren kärki, jossa nyt seisoo Qaitbayn linnoitus.
     */
    id: 'faroksen-majakka',
    nimi: 'Faroksen majakka',
    tyyppi: 'muu',
    symboli: 'merenkulku',
    kysymykset: [
      'Miten majakan valo saatiin näkymään näin kauas?',
      'Mitä majakasta on nykyään jäljellä?',
    ],
    korostukset: ['Ptolemaios|Ptolemaios toisen',
      'Qaitbayn linnoitus|Qaitbayn linnoitukseen'],
    nappi: 'Valo, joka näkyi neljänkymmenen kilometrin päähän',
    laudat: {
      maailmankartta: { x: 6829.5, y: 2136.4 },
    },
    teksti: 'Aleksandrian sataman suulla, Faroksen saarella, seisoi '
      + 'antiikin kuuluisin majakka. Ptolemaios toisen aikana (280–247 '
      + 'eaa.) rakennettu torni oli ainakin sata metriä korkea — alaosa '
      + 'nelikulmainen, keskiosa kahdeksankulmainen ja huippu lieriö — '
      + 'ja sen valo kannettiin merelle noin 47 kilometrin päähän. Se '
      + 'oli vuosisatoja maailman korkeimpia rakennuksia ja yksi '
      + 'seitsemästä ihmeestä. Kolme maanjäristystä vuosien 956 ja 1303 '
      + 'välillä rikkoivat sen, ja viimeiset kivet käytettiin 1480 '
      + 'saman paikan Qaitbayn linnoitukseen. Loput löytyivät vasta '
      + '1994, kun ranskalaissukeltajat kartoittivat sataman pohjaa.',
    lahde: 'en-Wikipedia "Lighthouse of Alexandria", johdanto ja '
      + 'tietolaatikko (tarkistettu 26.8.2026).',
    kuva: {
      osoite: 'assets/kartat/ihmeet/faroksen-majakka.webp',
      selite: 'Havainnekuva: Faroksen majakka satamansuulla noin 200 eaa. '
        + 'Kolmiosainen muoto — nelikulmio, kahdeksankulmio ja lieriö — '
        + 'on antiikin kuvauksista ja aikakauden kolikoista; tornista '
        + 'itsestään on jäljellä vain meren pohjan kivilohkareita.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
  {
    /*
     * ALEKSANDRIAN KIRJASTO. Kirjaston tarkkaa paikkaa ei tunneta, ja
     * artikkelin tietolaatikon `coordinates` on tyhjä. Merkki on siksi
     * kaupungin kohdalla (29,9187 E / 31,2001 N — en-Wikipedia
     * "Alexandria"): oikeampi kuin arvattu täsmäpiste kaupungin
     * jossakin korttelissa. Sama sääntö kuin Kreikan merten
     * keskipisteillä.
     */
    id: 'aleksandrian-kirjasto',
    nimi: 'Aleksandrian kirjasto',
    tyyppi: 'muu',
    symboli: 'sana',
    kysymykset: [
      'Mistä kirjasto sai käsikirjoituksensa?',
      'Mitä kirjastolle lopulta tapahtui?',
    ],
    korostukset: ['Mouseion', 'papyruskäärö|papyruskääröjä'],
    nappi: 'Kirjasto, jonka koko on yhä arvailua',
    laudat: {
      maailmankartta: { x: 6830.6, y: 2136.9 },
    },
    teksti: 'Aleksandrian kirjasto oli antiikin suurimpia, ja se kuului '
      + 'laajempaan tutkimuslaitokseen nimeltä Mouseion — "muusien '
      + 'talo". Ajatus kaikki maailman kirjat kokoavasta kirjastosta '
      + 'esitettiin Ptolemaios ensimmäiselle, mutta rakennettu se '
      + 'todennäköisesti vasta hänen poikansa aikana. Papyruskääröjä '
      + 'kertyi nopeasti, sillä kuninkaat ostivat ja takavarikoivat '
      + 'tekstejä määrätietoisesti; arviot kokoelman koosta vaihtelevat '
      + '40 000:sta 700 000:een, eikä kukaan tiedä tarkkaa lukua. Talossa '
      + 'työskenteli aikanaan yli sata oppinutta, heidän joukossaan '
      + 'Kallimakhos, joka laati maailman ensimmäisenä pidetyn '
      + 'kirjastoluettelon.',
    lahde: 'en-Wikipedia "Library of Alexandria", johdanto ja '
      + 'tietolaatikko (tarkistettu 26.8.2026); koordinaatit '
      + 'en-Wikipedia "Alexandria" — kirjaston omaa paikkaa ei tunneta.',
    kuva: {
      osoite: 'assets/kartat/ihmeet/aleksandrian-kirjasto.webp',
      selite: 'Havainnekuva: Aleksandrian kirjaston lukusali käärörullien '
        + 'hyllyineen. Rakennuksesta ei ole löytynyt jälkeäkään eikä '
        + 'sen paikkaakaan tunneta — kuva perustuu antiikin kirjastojen '
        + 'tunnettuun rakenteeseen.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
];
