/*
 * MAASTOKOHTEET — CHL. Chilen maasto ja kohteet napautettaviksi.
 *
 * ── MAAILMAN ERÄ M1 (6.9.2026): ETELÄ-AMERIKKA ────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Erän perustelut, kiintiö ja työtapa on kirjattu kokonaisuudessaan
 * sisartiedostoon js/packs/maastokohteet-arg.js.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN
 * (tools/johda-maastokohteet.mjs `laudat`, asteet en-Wikipedian
 * coordinates-propista). Vain maailmankartan rivi.
 *
 * VARTIO 7a PUDOTTI RAPA NUIN. tools/maastoaineisto/CHL.json -tiedostoa
 * ei ole, joten kohteet on valittu käsin — mutta fokuslehden rajaus on
 * (js/packs/fokus-grc.js FOKUS_POHJAT.CHL, x 2893,6…4035,3 ja
 * y 3565,9…5641,6), ja savukkeen vartio 7a pätee tähän erään
 * sellaisenaan. Juuri se pudotti listalta ilmeisimmän ehdokkaan:
 * Pääsiäissaari on lon −109,35, eli laudan x 2188 — yli seitsemänsataa
 * yksikköä lehden vasemman reunan ulkopuolella. Merkki olisi siis
 * olemassa mutta pelaajan ulottumattomissa, ja saari on jätetty pois.
 * Sama tarkistus on ajettu jokaiselle alla olevalle pisteelle.
 *
 * EI YKSIKÄÄN OLE PELIKAUPUNGIN KOHDALLA. Chilessä on seitsemän
 * pelikaupunkia (Antofagasta, Valparaíso, San Ambrosio, Robinson
 * Crusoe, Puerto Montt, Punta Arenas, Kap Horn). Lähin uusi merkki on
 * Isla Negra 23,3 lautayksikön päässä Valparaísosta; raja
 * KAUPUNGIN_KOHDALLA_SADE on 7 (js/fokuskohteet.js). Kaikki yksitoista
 * ovat pääkartan merkkejä.
 *
 * KUVATON ERÄ. Faktat en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_CHL = [
  /* ================================================================
   * MAASTOKOHTEET — vuori, saari, meri.
   * ============================================================== */
  {
    id: 'ojosdelsalado',
    nimi: 'Ojos del Salado',
    tyyppi: 'vuori',
    kysymykset: [
      'Missä on maailman korkein järvi?',
      'Miksi huipulla ei ole jäätikköä?',
    ],
    korostukset: ['kraatterijärvi|kraatterijärvi'],
    nappi: 'Maailman korkein tulivuori',
    // -68.5417 E / -27.1092 N — en-Wikipedia "Ojos del Salado"
    // lähin pelikaupunki: Salta 133,2 lautayksikköä
    laudat: {
      maailmankartta: { x: 3548.6, y: 4137.5 },
    },
    teksti: 'Nevado Ojos del Salado on uinuva tulivuorikompleksi Andeilla Argentiinan '
      + 'ja Chilen rajalla. Se on maailman korkein tulivuori ja Chilen korkein huippu, '
      + '6 893 metriä, ja yläosa muodostuu päällekkäisistä laavakupoleista, laavavirroista '
      + 'ja kraattereista. Vuori on aivan Etelä-Amerikan kuivan diagonaalin tuntumassa, '
      + 'joten ilmasto on äärimmäisen kuiva eikä kunnollisia jäätiköitä tai pysyvää '
      + 'lumipeitettä pääse syntymään — kasvillisuutta ei ole lainkaan. Silti '
      + 'huippukraatterissa on pysyvä, halkaisijaltaan noin satametrinen kraatterijärvi '
      + 'vajaan 6 500 metrin korkeudessa: se on maailman korkeimmalla sijaitseva järvi.',
    lahde: 'en-Wikipedia "Ojos del Salado", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'chiloe',
    nimi: 'Chiloé',
    tyyppi: 'saari',
    kysymykset: [
      'Miksi Chiloén kirkot ovat puuta?',
      'Milloin Chiloé lakkasi olemasta Espanjan aluetta?',
    ],
    korostukset: ['päre|päreitä'],
    nappi: 'Saaristo, joka piti pintansa pisimpään',
    // -73.9 E / -42.6 N — en-Wikipedia "Chiloé Archipelago"
    // lähin pelikaupunki: Puerto Montt 64,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 3370, y: 4723.5 },
    },
    teksti: 'Chiloén saaristo on Chilen rannikon edustalla Los Lagosin alueella, ja '
      + 'sen erottaa mantereesta pohjoisessa Chacaon salmi. Saariston kulttuuri syntyi '
      + 'vuosisatojen eristyksessä huillichejen, espanjalaisten ja chonojen vaikutteista, '
      + 'ja se tunnetaan Chilessä omasta kansanperinteestään, mytologiastaan, '
      + 'perunoistaan ja rakennustavastaan. Siirtomaa-aikana saaristo oli tukikohta '
      + 'hollantilaisia ja brittejä vastaan, ja se oli Chilen viimeinen espanjalainen '
      + 'alue: valloitusyritykset torjuttiin vuoteen 1826 asti. Espanjalaiset ja '
      + 'jesuiitat rakensivat saarille satoja pieniä puukirkkoja; kuusitoista niistä on '
      + 'yhä pystyssä ja maailmanperintökohteita. Kaikki rakennettiin puusta, ja litteitä '
      + 'puisia päreitä käytettiin kattoihin ja seiniin niin yleisesti, että '
      + 'alercen päreistä tuli aikanaan jopa rahaa nimellä real de alerce.',
    lahde: 'en-Wikipedia "Chiloé Archipelago", johdanto-osa sekä osiot "Religion" ja '
      + '"Architecture" (tarkistettu 6.9.2026).',
  },
  {
    id: 'tyynimerichl',
    nimi: 'Tyynimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka suuri osa maapallosta on Tyyntämerta?',
      'Missä on meren syvin kohta?',
    ],
    korostukset: ['Mariaanien hauta|Mariaanien haudassa'],
    nappi: 'Suurempi kuin kaikki maa yhteensä',
    // -75.0 E / -33.0 N — en-Wikipedia "Pacific Ocean" (Chilen rannikon edusta)
    // lähin pelikaupunki: Valparaíso 126,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3333.3, y: 4352.6 },
    },
    teksti: 'Tyynimeri on maapallon suurin ja syvin valtameri. Se ulottuu Jäämereltä '
      + 'pohjoisessa etelänavan vesille asti ja rajautuu lännessä Aasiaan ja Australiaan, '
      + 'idässä Amerikkoihin. Pinta-alaa on 165 250 000 neliökilometriä eli noin 46 '
      + 'prosenttia maapallon vesipinnasta ja 32 prosenttia koko pinta-alasta — enemmän '
      + 'kuin kaikki maa-alueet yhteensä. Coriolisvoiman aiheuttama kierto jakaa sen '
      + 'kahteen jokseenkin itsenäiseen osaan, jotka kohtaavat päiväntasaajalla: '
      + 'Pohjoiseen ja Eteläiseen Tyyneenmereen. Keskisyvyys on 4 000 metriä, ja syvin '
      + 'kohta on Challengerin syvänne Mariaanien haudassa.',
    lahde: 'en-Wikipedia "Pacific Ocean", johdanto-osa (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * ERÄ M1 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'atacama',
    nimi: 'Atacama',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi Atacamassa ei sada?',
      'Miksi Marsin laitteita testataan täällä?',
    ],
    korostukset: ['sadevarjo|sadevarjo'],
    nappi: 'Maailman kuivin aavikko',
    // -69.25 E / -24.5 N — en-Wikipedia "Atacama Desert"
    // lähin pelikaupunki: Antofagasta 40,5 lautayksikköä
    laudat: {
      maailmankartta: { x: 3525, y: 4044.6 },
    },
    teksti: 'Atacama on aavikkoylänkö Pohjois-Chilessä Andien länsipuolella, 1 600 '
      + 'kilometriä pitkä kaistale Tyynenmeren rannikkoa ja 105 000 neliökilometriä. Se '
      + 'on napa-alueiden ulkopuolisista aavikoista kuivin ja maailman suurin sumuaavikko. '
      + 'Syy on kaksipuolinen sadevarjo: Andit ja Chilen rannikkovuoret ovat molemmat '
      + 'niin korkeita, että ne pysäyttävät kosteuden sekä Tyyneltämereltä että '
      + 'Atlantilta, ja viileä Humboldtin virta vahvistaa vaikutusta. Sadetta tulee noin '
      + '15 millimetriä vuodessa, ja joillakin sääasemilla ei ole mitattu sadetta '
      + 'koskaan; on viitteitä siitä, ettei aavikolla satanut merkittävästi vuosien 1570 '
      + 'ja 1971 välillä. Korkeus, kuiva ilma ja valosaasteen puute tekevät siitä yhden '
      + 'maailman parhaista tähtitieteen paikoista, ja maaperä on niin vähäeliöistä, että '
      + 'siellä testataan Mars-lentojen laitteita.',
    lahde: 'en-Wikipedia "Atacama Desert", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'chuquicamata',
    nimi: 'Chuquicamata',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka syvä avolouhos on?',
      'Miksi kaivos muuttui maanalaiseksi?',
    ],
    korostukset: ['Codelco|Codelcon'],
    nappi: 'Suurin kuoppa, jonka kupari on kaivanut',
    // -68.9 E / -22.3 N — en-Wikipedia "Chuquicamata"
    // lähin pelikaupunki: Antofagasta 58,6 lautayksikköä
    laudat: {
      maailmankartta: { x: 3536.7, y: 3967.1 },
    },
    teksti: 'Chuquicamata on kaivetulta tilavuudeltaan maailman suurin '
      + 'kuparin avolouhos. Se on Pohjois-Chilessä aivan Calaman kaupungin vieressä '
      + '2 850 metrin korkeudessa, 215 kilometriä Antofagastasta koilliseen. Louhos on '
      + '850 metriä syvä, mikä tekee siitä maailman toiseksi syvimmän avolouhoksen heti '
      + 'Utahin Bingham Canyonin jälkeen. Vaahdotus ja sulatto rakennettiin 1952 ja '
      + 'jalostusta laajennettiin 1968, minkä jälkeen vuosituotanto ylsi 1970-luvun '
      + 'lopulla puoleen miljoonaan tonniin kuparia. Kaivos kuului aiemmin Anaconda '
      + 'Copperille, mutta kuparin kansallistamisen jälkeen se on ollut Codelcon eli '
      + 'Chilen valtionyhtiön omistuksessa. Huhtikuussa 2019 Chuquicamata aloitti '
      + 'louhinnan uudesta maanalaisesta kaivoksesta.',
    lahde: 'en-Wikipedia "Chuquicamata", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'humberstone',
    nimi: 'Humberstone',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä salpietari oli ja mihin sitä käytettiin?',
      'Miksi Humberstone päätyi uhanalaisten listalle?',
    ],
    korostukset: ['salpietari|salpietarin'],
    nappi: 'Autiokaupunki keskellä aavikkoa',
    // -69.7936 E / -20.2058 N — en-Wikipedia "Humberstone and Santa Laura Saltpeter Works"
    // lähin pelikaupunki: Antofagasta 118,9 lautayksikköä
    laudat: {
      maailmankartta: { x: 3506.9, y: 3894.1 },
    },
    teksti: 'Humberstone ja Santa Laura ovat kaksi entistä salpietarin jalostuslaitosta '
      + 'Pohjois-Chilessä, keskellä Atacamaa noin 48 kilometriä Iquiquesta itään. Ne '
      + 'liitettiin maailmanperintöluetteloon 2005 todisteena siitä, mitä salpietarin '
      + 'louhinta merkitsi Chilelle ja millainen kulttuuri ja yhteiskunta sen ympärille '
      + 'syntyi 1800-luvun lopulla. Santa Laura perustettiin 1872, kun alue kuului vielä '
      + 'Peruun, ja samana vuonna James Thomas Humberstone perusti La Palman laitoksen. '
      + 'Molemmat kasvoivat nopeasti vilkkaiksi kaupungeiksi, joissa oli '
      + 'englantilaistyylistä arkkitehtuuria. Rappeutuneet rakennukset olivat niin '
      + 'hauraita, että kohde vietiin heti uhanalaisen maailmanperinnön listalle; se '
      + 'poistettiin listalta 2019 mittavien korjaustöiden jälkeen.',
    lahde: 'en-Wikipedia "Humberstone and Santa Laura Saltpeter Works", johdanto-osa '
      + 'sekä osiot "Geography" ja "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'chinchorro',
    nimi: 'Chinchorron muumiot',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka paljon Chinchorron muumiot ovat egyptiläisiä vanhempia?',
      'Ketkä muumioitiin?',
    ],
    korostukset: ['muumiointi|muumiointi'],
    nappi: 'Maailman vanhimmat muumiot',
    // -70.3126 E / -18.4783 N — en-Wikipedia "Chinchorro mummies"
    // lähin pelikaupunki: Titicaca 97,3 lautayksikköä
    laudat: {
      maailmankartta: { x: 3489.6, y: 3834.4 },
    },
    teksti: 'Chinchorron muumiot ovat luonnollisesti ja tarkoituksella säilyneitä '
      + 'ihmisjäänteitä Pohjois-Chilen ja Etelä-Perun rannikolta. Vanhin luonnollisesti '
      + 'säilynyt yksilö on noin vuodelta 7020 eaa., ja tahallinen muumiointi alkoi noin '
      + '5050 eaa. — ne ovat siis maailman vanhimmat tunnetut tarkoituksella säilötyt '
      + 'ihmisruumiit, tuhansia vuosia egyptiläisiä vanhempia. Chinchorrot eivät '
      + 'varanneet käsittelyä eliitille: muumioituja on miehiä, naisia ja lapsia kaikista '
      + 'yhteisön osista. Ruumis koottiin ja tuettiin uudelleen, muotoiltiin savella ja '
      + 'sille lisättiin peruukki ja mineraaliväriä. Perinne jatkui noin kolmetuhatta '
      + 'vuotta ja päättyi 1800 eaa. Arican ja Parinacotan alueen asuinpaikat ja '
      + 'hautausmaat ovat olleet maailmanperintökohde vuodesta 2021.',
    lahde: 'en-Wikipedia "Chinchorro mummies", johdanto-osa ja osio "The Chinchorro '
      + 'culture" (tarkistettu 6.9.2026).',
  },
  {
    id: 'sewell',
    nimi: 'Sewell',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi Sewellissä ei ole katuja?',
      'Miksi kaupunki tyhjeni?',
    ],
    korostukset: ['El Teniente|El Teniente'],
    nappi: 'Portaiden kaupunki 2 000 metrissä',
    // -70.3822 E / -34.0847 N — en-Wikipedia "Sewell, Chile"
    // lähin pelikaupunki: Valparaíso 48,8 lautayksikköä
    laudat: {
      maailmankartta: { x: 3487.3, y: 4393.1 },
    },
    teksti: 'Sewell on asumaton chileläinen kaivoskaupunki Andien rinteellä 2 000–2 250 '
      + 'metrin korkeudessa, ja se on ollut maailmanperintökohde vuodesta 2006. Braden '
      + 'Copper Company perusti sen 1906 asuttaakseen El Teniente -kaivoksen — maailman '
      + 'suurimman maanalaisen kuparikaivoksen — työntekijät perheineen, ja nimi tuli '
      + 'yhtiön ensimmäiseltä johtajalta Barton Sewelliltä. Rinne on niin jyrkkä, ettei '
      + 'ajokelpoisia katuja voitu rakentaa: kaupungin tasojen välillä liikuttiin '
      + 'pystysuorin portain. Huippuvuonna 1960 täällä asui noin 16 000 ihmistä. Kun '
      + 'valtio hankki kaivoksesta enemmistön ja kupari kansallistettiin 1971, '
      + 'valtionyhtiö siirsi työntekijät laaksoon ja rakensi heille työmatkatien; osa '
      + 'rakennuksista purettiin 1980-luvulla, osa on kunnostettu.',
    lahde: 'en-Wikipedia "Sewell, Chile", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'paranal',
    nimi: 'Paranalin observatorio',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi neljää kaukoputkea käytetään yhtenä?',
      'Mikä on maailman suurin optinen observatorio?',
    ],
    korostukset: ['interferometria|interferometriaan'],
    nappi: 'Neljä kaukoputkea yhtenä silmänä',
    // -70.4045 E / -24.6275 N — en-Wikipedia "Paranal Observatory"
    // lähin pelikaupunki: Antofagasta 38,7 lautayksikköä
    laudat: {
      maailmankartta: { x: 3486.5, y: 4049.1 },
    },
    teksti: 'Paranalin observatorio on Euroopan eteläisen observatorion ESO:n asema '
      + 'Cerro Paranalilla Atacamassa 2 635 metrin korkeudessa, 120 kilometriä '
      + 'Antofagastasta etelään. Valonkeruupinta-alaltaan se on eteläisen pallonpuoliskon '
      + 'suurin optinen ja infrapuna-observatorio ja koko maailmassa toinen heti Havaijin '
      + 'Mauna Kean jälkeen. Sen tärkein laite on Very Large Telescope, neljä erillistä '
      + '8,2-metristä kaukoputkea, joita voidaan käyttää myös yhtä aikaa: valo '
      + 'yhdistetään interferometriaan, jolloin tarkkuus vastaa paljon suurempaa peiliä. '
      + 'Lisäksi on neljä 1,8-metristä apukaukoputkea, kaksi laajan kentän '
      + 'kartoituskaukoputkea sekä kaksi pienten kaukoputkien ryhmää, jotka etsivät '
      + 'eksoplaneettoja. Lähistölle rakennetaan parhaillaan ESO:n tulevaa jättiläistä '
      + 'Cerro Armazonesin huipulle.',
    lahde: 'en-Wikipedia "Paranal Observatory", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'islanegra',
    nimi: 'Isla Negra',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka nimesi Isla Negran ja miksi?',
      'Onko Isla Negra saari?',
    ],
    korostukset: ['Pablo Neruda|Pablo Neruda'],
    nappi: 'Musta saari, joka ei ole saari',
    // -71.7 E / -33.4333 N — en-Wikipedia "Isla Negra"
    // lähin pelikaupunki: Valparaíso 23,3 lautayksikköä
    laudat: {
      maailmankartta: { x: 3443.3, y: 4368.8 },
    },
    teksti: 'Isla Negra on rannikkoalue El Quiscon kunnassa Keski-Chilessä, noin 45 '
      + 'kilometriä Valparaísosta etelään ja 96 kilometriä Santiagosta länteen. Se '
      + 'tunnetaan runoilija Pablo Nerudan kotina: hän asui Casa de Isla Negrassa '
      + 'vuodesta 1939 kuolemaansa 1973 asti, pitkiä matka- ja maanpakojaksoja lukuun '
      + 'ottamatta. Neruda antoi paikalle nimen rannan edustan tummien kallioiden mukaan '
      + '— nimi tarkoittaa mustaa saarta, vaikka kyse ei ole saaresta. Talo on nykyään '
      + 'museo, ja joka vuosi runoilijan syntymäpäivänä 12. heinäkuuta siellä ja '
      + 'lähistön käsityöläistorilla luetaan runoja, soitetaan musiikkia ja eväsretkeillään '
      + 'rannalla. Alueella asuu myös kirjailijoiden, taiteilijoiden ja käsityöläisten '
      + 'yhteisö.',
    lahde: 'en-Wikipedia "Isla Negra", johdanto-osa sekä osiot "Pablo Neruda" ja '
      + '"Community" (tarkistettu 6.9.2026).',
  },
  {
    id: 'valdivia1960',
    nimi: 'Valdivian maanjäristys',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka voimakas järistys oli?',
      'Miten kaukana tsunami tuntui?',
    ],
    korostukset: ['megasiirrosjäristys|megasiirrosjäristys'],
    nappi: 'Voimakkain koskaan mitattu järistys',
    // -73.2333 E / -39.8167 N — Valdivian kaupunki, en-Wikipedia "1960 Valdivia
    // earthquake" (keskus oli Lumacon lähellä; merkki on pahiten kärsineessä kaupungissa)
    // lähin pelikaupunki: Puerto Montt 66,1 lautayksikköä
    laudat: {
      maailmankartta: { x: 3392.2, y: 4612.9 },
    },
    teksti: 'Valdivian maanjäristys tapahtui 22. toukokuuta 1960 kello 15.11 paikallista '
      + 'aikaa ja kesti kymmenen minuuttia. Useimmat tutkimukset arvioivat sen '
      + 'momenttimagnitudiksi 9,4–9,6, mikä tekee siitä voimakkaimman koskaan mitatun '
      + 'maanjäristyksen. Kyseessä oli megasiirrosjäristys: Nazcan laatta liikahti '
      + 'Etelä-Amerikan laatan alla Peru–Chile-haudassa, ja keskus oli lähellä Lumacoa '
      + 'noin 570 kilometriä Santiagosta etelään, mutta pahiten kärsi Valdivia. '
      + 'Paikalliset tsunamit iskivät Chilen rannikolle jopa 25 metrin aaltoina, ja '
      + 'päätsunami ylitti Tyynenmeren: Havaijin Hilossa mitattiin 10,7 metrin aaltoja yli '
      + '10 000 kilometrin päässä keskuksesta. Aallot havaittiin myös Japanissa, '
      + 'Filippiineillä, Uudessa-Seelannissa, Australiassa ja Aleuteilla. Kuolonuhrien '
      + 'määrää ei tiedetä tarkkaan; arviot vaihtelevat tuhannesta kuuteen tuhanteen.',
    lahde: 'en-Wikipedia "1960 Valdivia earthquake", johdanto-osa sekä osiot '
      + '"Geological context" ja "Tectonic interpretation" (tarkistettu 6.9.2026).',
  },
];
