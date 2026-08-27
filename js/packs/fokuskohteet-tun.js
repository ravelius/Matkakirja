/*
 * FOKUSKOHTEET — TUNISIA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-lby.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Tunisiassa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden VÄLIMEREN ERÄ (27.8.2026). Tunisialla ei ollut
 * vielä yhtään fokuskohdetta, mutta maan fokuslehti on jo olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.TUN, tiedosto TUN.webp,
 * tarkistettu ämpäristä 27.8.2026), joten merkillä on lehti, jonka
 * päälle asettua. Se oli lisäyksen ainoa tekninen ehto. Tiedosto on
 * tarkoituksella yhden kohteen mittainen ja odottaa ensimmäistä
 * varsinaista Tunisia-erää.
 *
 * ── KOHDE ON SATAMA, EI KARTHAGO ───────────────────────────────────
 *
 * Kohde on nimetty PYÖREÄKSI SOTASATAMAKSI eikä Karthagoksi. Syy on
 * sama kuin Forum Romanumilla Roomassa (js/packs/fokuskohteet-ita.js)
 * ja Hippodromilla Istanbulissa: ihmekuva kertoo yhdestä
 * rakennelmasta, ei koko kaupungista, ja selitteen on voitava sanoa
 * täsmälleen mikä on poissa ja mikä ei. Karthagon rauniokenttä on
 * laaja ja suurelta osin paikallaan; sotasataman vajat, pylväikkö ja
 * amiraalin paviljonki eivät ole.
 *
 * ── ESITYSTAPA ON "KADONNUT" (`kadonnut: true`) ────────────────────
 *
 * Rakennelma on poissa: Rooma tuhosi kaupungin vuonna 146 eaa., ja
 * altaan kehältä on jäljellä vain kaivauksissa löydettyjä
 * veistoramppeja. Kartalla on siis tähti ja kortissa vain ihmekuva.
 * MITÄ SELITE EI VÄITÄ: allas itse on yhä maastossa — pyöreä lampi ja
 * sen keskellä saari, jolla on nykyään pieni museo. Selite sanoo sen,
 * jotta pelaaja ei luulisi paikkaa pyyhkäistyksi pois.
 *
 * ── KOORDINAATIT ───────────────────────────────────────────────────
 *
 * 10,325458 E / 36,845561 N — en-Wikipedia "Carthage Punic Ports"
 * (tietolaatikon coordinates, 36°50′44,02″N 10°19′31,65″E). Piste on
 * satama-altaiden oma paikka Karthagon kaakkoislaidalla, ei kaupungin
 * keskipiste (36,8528 / 10,3233 — sama artikkeli "Carthage").
 *
 * Rivillä on KAKSI lautaa. Maailmankartan kaava on Millerin lieriö
 * (LEVEYS 12000 / LON0 −175 / POHJOINEN 76), ja piste osuu TUN-lehden
 * rajaukseen (x 6051–6250, y 1857–2219). Euroopan laudalla piste on
 * kaavan sisällä (kaava kattaa −11°…41° ja 34°…72°) ja Pohjois-Afrikan
 * rannikko on siellä piirretty — Euroopan lauta on yksi ääriviiva,
 * johon Afrikka kuuluu (js/packs/europe.js mainlandPoints) — joten
 * merkki asettuu Tunisian rannalle eikä tyhjään mereen. Sisartiedoston
 * Leptis Magna jää Euroopan laudan eteläpuolelle eikä siksi saa
 * europe-riviä; tämä kohde saa.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkelit
 * "Carthage Punic Ports" ja "Cothon" 27.8.2026 — ei työaineistoa,
 * joten lähderivi osoittaa suoraan artikkeleihin.
 */
export const FOKUSKOHTEET_TUN = [
  {
    id: 'karthagon-sotasatama',
    nimi: 'Karthagon pyöreä sotasatama',
    tyyppi: 'muu',
    symboli: 'merenkulku',
    kysymykset: [
      'Miksi sotasatama piti piilottaa kauppasataman taakse?',
      'Mitä Karthagolle tapahtui vuonna 146 eaa.?',
    ],
    korostukset: ['kothon|kothon', 'Appianos|Appianos'],
    nappi: 'Satama, jonne mahtui 220 sotalaivaa',
    laudat: {
      maailmankartta: { x: 6177.5, y: 1925.2 },
      europe: { x: 409.4, y: 924.6 },
    },
    teksti: 'Karthagon kaksi sisäsatamaa olivat käsin kaivettuja '
      + 'altaita kaupungin kaakkoislaidalla: suorakaiteen muotoinen '
      + 'kauppasatama ja sen takana pyöreä sotasatama. Punilainen nimi '
      + 'oli kothon. Kreikkalainen Appianos kuvasi laitosta '
      + 'Polybioksen kadonneen tekstin pohjalta: sisäänkäynti oli noin '
      + '21 metriä leveä ja se suljettiin rautaketjulla, altaan '
      + 'kehällä ja sen keskellä olevalla saarella oli vajoja 220 '
      + 'sotalaivalle, ja jokaisen vajan edessä seisoi kaksi '
      + 'joonialaista pylvästä, niin että ranta näytti yhtenäiseltä '
      + 'pylväskäytävältä. Vajojen päällä oli varastoja airoille ja '
      + 'köysistölle. Saarella oli amiraalin paviljonki, josta hän näki '
      + 'merelle mutta jonne mereltä ei nähty. Kaivaukset 1970-luvulla '
      + 'vahvistivat altaiden punilaisen alkuperän ja löysivät '
      + 'veistoramppeja: saarella niitä laskettiin kolmisenkymmentä ja '
      + 'altaan kehällä 135–140.',
    lahde: 'en-Wikipedia "Carthage Punic Ports", osiot "Description of '
      + 'Appian", "Admiralty Islet" ja "Commercial port" sekä artikkeli '
      + '"Cothon" (tarkistettu 27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Kortissa on vain tämä kuva.
     *
     * ISOISÄN AIKA OSUU TÄHÄN VÄLIIN, muttei ole selitteessä: kun
     * Chateaubriand tunnisti altaat 1800-luvun alussa, tutkijat
     * kiistelivät vuosikymmeniä siitä, voiko kahdesta pikkulammikosta
     * todella olla kyse — varmistus tuli vasta 1970-luvun kaivauksissa.
     * Se on kohteen tekstissä eikä selitteessä, jotta selite pysyy
     * kysymyksessä "mitä täällä oli ja mitä täällä on nyt".
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-karthagon-satama.webp',
      kadonnut: true,
      selite: 'Karthagon pyöreä sotasatama oli antiikin merkillisimpiä '
        + 'rakennelmia: kaivettu allas, jonka kehällä ja keskisaarella '
        + 'oli vajat 220 sotalaivalle, pylväikkö vajojen edessä ja '
        + 'amiraalin paviljonki saaren huipulla. Rooma tuhosi kaupungin '
        + 'vuonna 146 eaa., ja vajat, pylväät ja paviljonki ovat poissa. '
        + 'Allas itse on yhä maastossa: Karthagon esikaupungin talojen '
        + 'keskellä on noin kahdeksan hehtaarin pyöreä lampi ja sen '
        + 'keskellä saari, jolla on nyt pieni museo.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
