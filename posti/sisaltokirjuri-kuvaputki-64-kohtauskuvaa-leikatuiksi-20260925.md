## 2026-09-25 — SISÄLTÖKIRJURI → KUVAPUTKI: 64 kohtauskuvaa leikattuina kohteina (kaikki paitsi Ateenan pilotin 6)

Fablen ja omistajan päätös 25.9.2026: **kaikki 70 kohtauskuvaa tilataan uudelleen leikattuina kohteina, ei kohtauksina** (löydös 95, build 13: "piirretty tausta on väärin"). Lista: docs/raportit/miniatyyrit-kohtauskuvat-20260925.md, taulukko "Kaikki 70". Ateenan 6 kuvaa on jo tilattu erikseen (posti/sisaltokirjuri-kuvaputki-ateena-leikatut-pilotti-20260925.md), joten ne EIVÄT ole tässä tilauksessa: ateena-akropolis-museo, ateena-diogeneen-astia, ateena-elginin-marmorit, ateena-iliou-melathron, ateena-maratonhuijaus, ateena-niken-temppeli. Tässä ovat loput 64.

Kuvaukset on kirjoitettu kunkin kohteen pelinoston tekstin perusteella (js/packs/nahtavyysjutut.js, fokusvirta-*.js, maakartat.js). `[epävarma]` = omaa nostotekstiä ei löytynyt, kuvaus on päätelty kohteen nimestä.

### Tyylisääntö (sama kuin Ateenan pilotissa; tools/generoi-miniatyyrit.mjs)

- Kuvassa on YKSI KOHDE (rakennus, esine, henkilö tai pieni ryhmä) tasaisella paperitaustalla, joka leikataan pois: läpinäkyvä webp (RGBA), kohteen ympärillä läpinäkyvää pohjaa.
- EI maalattua taustaa, taivasta, maisemaa, katunäkymää, vettä tai huonetta kohteen ympärillä. Kohteen oma jalusta tai maapala saa näkyä, maisema ei.
- 1024×1024, sama tiedostonimi ja polku kuin nyt (assets/kartat/miniatyyrit/<tiedosto>.webp).
- Malli: assets/kartat/miniatyyrit/ateena-akropolis.webp (myös ateena-antiikin-agora.webp, ateena-kallimarmaro.webp): kohde yksin läpinäkyvällä pohjalla.
- Nykyisen kuvan tyyli (akvarelli/seepia) pysyy; nykyiset 512 px kuvat käyvät esimerkkeinä aiheesta. Muutos on vain se, että ympäristö poistetaan.
- Vartija tests/miniatyyrit-leikkaus.test.mjs: läpinäkymättömien pikselien osuus koko kuvasta < 0,6 ja kuvan kehästä ≤ 0,35. Katso jokainen kuva silmin.

### Amsterdam (5)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| amsterdam-herengracht-537.webp | Herengracht 537 (puupaalut) | a narrow brick canal house propped up by a dense lattice of timber shoring beams |
| amsterdam-kapein-talo.webp | Kapein talo | a very narrow two-metre-wide canal house with a hoisting beam and hook under its bell gable |
| amsterdam-kissalaiva.webp | Kissalaiva | the Poezenboot cat houseboat with a few cats on its deck (hull only, no canal water) |
| amsterdam-maitotytto.webp | Maitotyttö | Vermeer's milkmaid pouring milk from a jug at a small table with bread |
| amsterdam-yovartio.webp | Yövartio | the Night Watch painting in a gilt frame with its trimmed-off canvas strips lying beside it |

### Berliini (3)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| berliini-gaertnerin-berliini.webp | Gaertnerin Berliini | a framed Gaertner street view of Unter den Linden on a wooden easel, with a palette |
| berliini-marlene-dietrich.webp | Marlene Dietrich | a top hat, long black gloves and a 1930s microphone resting on a travel trunk |
| berliini-muuri-1961.webp | Muuri 1961 | a short stretch of concrete posts strung with barbed wire on torn-up cobblestones, a wire coil beside it |

### Bryssel (1)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| bryssel-galeries-royales-saint-hubert.webp | Galeries Royales Saint-Hubert | the arcade's neoclassical entrance front with its arched glass roof rising behind |

### Helsinki (1)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| helsinki-suomi-heraa-1899.webp | Suomi herää 1899 | an 1899 conductor's music stand with an open handwritten score and a baton |

### Ljubljana (7)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| ljubljana-keskustori.webp | Keskustori | Plečnik's colonnaded riverside market hall with a few striped market stalls in front |
| ljubljana-kri-anke.webp | Križanke | the former Križanke monastery: baroque church with its undulating dome and an arcaded courtyard wing |
| ljubljana-ljubljanan-linna.webp | Ljubljanan linna | Ljubljana Castle on its small hilltop mound: walls, lookout tower and St George's chapel |
| ljubljana-lohikaarmesilta.webp | Lohikäärmesilta | a winged green copper dragon statue on its stone bridge pedestal |
| ljubljana-pre-ernin-aukio.webp | Prešernin aukio | the pink baroque Franciscan Church of the Annunciation with the Prešeren statue in front |
| ljubljana-tivoli-puisto.webp | Tivoli-puisto | the neoclassical Tivoli Castle manor with its cast-iron dog statues at the steps |
| ljubljana-tromostovje.webp | Tromostovje | the Triple Bridge: three white stone bridges with balustrades fanning out (no river) |

### Lontoo (10)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| lontoo-abbey-roadin-suojatie.webp | Abbey Roadin suojatie | a short zebra crossing on a strip of asphalt between two striped Belisha beacon posts |
| lontoo-canaletto-lontoossa.webp | Canaletto Lontoossa | a framed Canaletto veduta of Westminster Bridge with ceremonial barges, on an easel |
| lontoo-dickensin-pubi.webp | Dickensin pubi (The George) | the George Inn: a galleried timber-framed coaching inn with open balconies |
| lontoo-exchange-alley.webp | Exchange Alley (Etelämeren kupla) | a tipped-over money purse with spilled gold coins and crumpled South Sea Company share certificates |
| lontoo-fleming-1928.webp | Fleming 1928 | a petri dish with a mould spot and a clear halo of dead bacteria, a glass pipette beside it |
| lontoo-globe-1599.webp | Globe 1599 | the round timber-framed Globe theatre with its thatched roof and open yard |
| lontoo-leake-streetin-tunneli.webp | Leake Streetin tunneli | a cluster of spray-paint cans in front of a freestanding graffiti-covered wall slab |
| lontoo-metron-hoyryveturi.webp | Metron höyryveturi (metro 1863) | an 1863 Metropolitan Railway steam locomotive pulling one wooden gas-lit carriage |
| lontoo-palo-1666.webp | Palo 1666 | Thomas Farriner's timber-framed bakery on Pudding Lane with flames at its windows |
| lontoo-turbiinihalli.webp | Turbiinihalli (Tate Modern) | the brick Bankside power station (Tate Modern) with its tall central chimney |

### Luxemburg (3)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| luxemburg-bockin-kasematit.webp | Bockin kasematit | a cut-away block of the Bock rock showing a casemate tunnel with a cannon at its embrasure |
| luxemburg-chemin-de-la-corniche.webp | Chemin de la Corniche | a stretch of the old rampart walkway with its stone parapet (no valley view) |
| luxemburg-suurherttuallinen-palatsi.webp | Suurherttuallinen palatsi | the Grand Ducal Palace's Renaissance facade with Moorish-style ornament and corner turrets |

### Madrid (5)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| madrid-chotis.webp | Chotis | a couple in chulapo dress dancing the chotis on a single paving tile, a street barrel organ beside them |
| madrid-goyan-kansankuvat.webp | Goyan kansankuvat | a framed Goya tapestry cartoon (The Parasol) on a wooden easel |
| madrid-gran-v-a.webp | Gran Vía | the domed Metrópolis corner building at the head of the Gran Vía, with its winged statue |
| madrid-kaksi-joukkuetta.webp | Kaksi joukkuetta | the Cibeles fountain: the goddess in a chariot drawn by two lions, on its basin |
| madrid-tapaskierros.webp | Tapaskierros | a glass of vermouth covered by a slice of ham as a lid, beside small clay dishes of olives and tortilla |

### New York (1)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| newyork-metropolitan-museo.webp | Metropolitan-museo | the Met's Beaux-Arts Fifth Avenue facade with paired columns and wide front steps |

### Nikosia (1)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| nikosia-leventis-museo.webp | Leventis-museo | the museum's old two-storey Nicosia townhouse with green shutters and an iron balcony |

### Pariisi (13)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| pariisi-72-nimea.webp | 72 nimeä | the lower Eiffel Tower up to the first floor, gilded scientists' names on the frieze |
| pariisi-bastilji-1789.webp | Bastilji 1789 | the Bastille fortress with its round towers and drawbridge (no crowd) |
| pariisi-carmenin-ensi-ilta.webp | Carmenin ensi-ilta | a black Spanish fan and a red rose lying on an open Carmen score |
| pariisi-curie-1898.webp | Curie 1898 | an iron cauldron of pitchblende with a stirring rod, a faintly glowing radium test tube beside it |
| pariisi-impressionistit.webp | Impressionistit | Monet's Impression, Sunrise on a wooden easel with a paint-covered palette |
| pariisi-kirahvin-kavelymatka.webp | Kirahvin kävelymatka | the giraffe in its yellow two-piece coat walking beside its keeper |
| pariisi-lumiere-1895.webp | Lumière 1895 | the hand-cranked Lumière Cinématographe on a wooden tripod |
| pariisi-paras-patonki.webp | Paras patonki | a basket of baguettes with a tricolour ribbon and a prize medal |
| pariisi-pariisi-soi.webp | Pariisi soi (Piaf ja Django) | a Selmer-style jazz guitar leaning on a bistro chair beside a gramophone |
| pariisi-pasteur-1862.webp | Pasteur 1862 | two swan-neck flasks of broth: one clear, one with a broken neck and cloudy |
| pariisi-torni-romuraudaksi.webp | Torni romuraudaksi (Lustig) | a small Eiffel Tower model beside a forged ministry letter with a red wax seal |
| pariisi-tuileriain-rauniot.webp | Tuileriain rauniot | the burnt-out shell of the Tuileries Palace: intact stone walls, empty windows, no roof |
| pariisi-vrain-lucas.webp | Vrain-Lucas | a forged "Cleopatra to Caesar" letter on watermarked paper with a wax seal and a quill |

### Pietari (1)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| pietari-janissaari-1703.webp | Jänissaari 1703 | an unrolled plan of the six-bastion Peter and Paul fortress with a surveyor's measuring staff |

### Rooma (4)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| rooma-aqua-virgo.webp | Aqua Virgo | a cut-away section of the underground Roman aqueduct channel with water flowing in it |
| rooma-areenan-kellari.webp | Areenan kellari (Colosseum) | a cut-away slice of the Colosseum showing the hypogeum with an animal lift cage |
| rooma-kolikko-olan-yli.webp | Kolikko olan yli (Trevi) | the Trevi Fountain alone: Oceanus under the central arch and the basin in front |
| rooma-sikstus-1510.webp | Sikstus 1510 | Michelangelo standing on a wooden scaffold, painting overhead with a brush |

### Valletta (4)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| valletta-auberge-de-castille.webp | Auberge de Castille | the baroque Auberge de Castille facade with its central portal |
| valletta-pyhan-elmon-linnake.webp | Pyhän Elmon linnake | a star-shaped limestone fort on a rocky point (no sea) [epävarma] |
| valletta-suurmestarin-palatsi.webp | Suurmestarin palatsi | the Grandmaster's Palace facade with two portals and enclosed wooden corner balconies [epävarma] |
| valletta-ylabarrakka-puutarhat.webp | Yläbarrakan puutarhat | the arched colonnade terrace of the Upper Barrakka with a saluting cannon (no harbour view) |

### Wien (5)

| Tiedosto | Kohde | Kuvaus |
| --- | --- | --- |
| wien-figaro-1786.webp | Figaro 1786 | Mozart conducting from a harpsichord with an open score |
| wien-lipizzanit.webp | Lipizzanit | a white Lipizzaner stallion rearing, with a dark foal beside it |
| wien-taikahuilu.webp | Taikahuilu | Papageno the bird-catcher in his feather costume with panpipes and a birdcage |
| wien-vuoristovesijohto.webp | Vuoristovesijohto | a multi-arched stone aqueduct section of the Vienna mountain spring pipeline (no valley) |
| wien-yhdeksas-1824.webp | Yhdeksäs 1824 | Caroline Unger turning the deaf Beethoven by the sleeve to face the audience |

### Toimitus

- Uudet webp-tiedostot samoille poluille PR:ään. Kaupunki kerrallaan käy hyvin (Siirtoseppä vie paketin sitä mukaa kuin kuvia tulee). Avaa PR, jätä se auki, älä mergeä — Julkaisija ottaa sen junaan.
- Kirjoita tähän postilaatikkoon rivi "PR #n valmis junaan" (mainitse kaupungit).
- Kun kuva on korvattu, poista se tests/miniatyyrit-leikkaus.test.mjs:n TUNNETUT_KOHTAUSKUVAT-listalta samassa PR:ssä. Muuten toinen testi kaatuu.
- Aja `node tools/mittaa-miniatyyrit.mjs` (vaatii devDependency sharpin) ja committoi päivitetty tools/miniatyyri-mitat.json samassa PR:ssä. Jos sharpia ei ole, kirjoita postiin "kuvat vaihdettu, mittaus puuttuu", niin Sisältökirjuri ajaa mittauksen.
