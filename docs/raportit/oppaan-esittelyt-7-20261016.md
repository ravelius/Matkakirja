# Oppaan esittelyt, 7 pääkaupunkia (16.10.2026, Sisältökirjuri)

PT:n tilaus (omistaja 18.18, avaaminen vaatii esittelyt): Monaco, Bern, Belgrad, Zagreb, Bratislava, Tirana, Podgorica. Äänettömät (aaneton: true), kuten 31:n erä. Kohdelista (8 kohdetta/kaupunki, Q-id, sijainti, luokka, koko, katse, kierrosjärjestys): Karttaseppä, proto-3d/_tyo/karttaseppa/paakaupungit-3d-20261016/kohteet.json.

- Aineisto (kaikki lähteet, pudotetut väitteet, ristiriidat): docs/kohtaukset/oppaan-esittelyt/<id>.json.
- Vientipaketti: proto-3d/_valmiit/opas-esittely-v2-paakaupungit-7-vienti-20261016 (opas/esittely-v2/<id>.json, ilman pudotetut/ristiriidat-kenttiä; SHA256SUMS + LAHTEET.md). Vienti: Julkaisija `vie-paketti.sh`.
- tools/pollo/aineistot.js: 7 id:tä esittely-listaan ja esittely_polut-kenttään. Testit (tests/opas-esittely.test.mjs): sallitut ∪ ODOTTAVAT = esittelyt, yksityiskohdat_polut ilman näitä seitsemää; molemmat toimivat ennen ja jälkeen #4713:n.
- Rakenne: avaus (Tervetuloa … + maisema + pallovirke + Kierros alkaa), 8 kohdetta (teksti 500–750 merkkiä, lyhyt 220–380, syventävä, 5 kysymystä, isoisa false, lahteet kaksi lähdettä per väite). Koneellinen tarkistus: kierros = kohdelistan Q-id:t, nimi/luokka/koko/katse kopioitu sellaisenaan.

Huomioita PT:lle:
- `nimi` on Karttasepän wikidata-nimi (esim. "Bundeshaus", "Berner Münster", "Zagrebin katedraali", "Pyhän Savan katedraali", "Monacon ruhtinaallinen palatsi", "Monacon merimuseo"); kartan nimet (Liittopalatsi, Bernin tuomiokirkko, Zagrebin tuomiokirkko, Pyhän Savan temppeli, Ruhtinaanlinna, Valtamerimuseo) ovat Karttasepän nimi_pelissa-kentässä. Kerronta käyttää suomalaisia vakiintuneita nimiä. Jos peli vertaa nimiä (Unity Nimikerros), päätä kumpi viedään.
- Heikoimmat kohdat: Rinian puiston "Taiwan"-kysymys (Tirana, yksi lähde), Tiranan linnoituksen ajoitus (varaukset tekstissä), Nydeggbrücken pituus 190 m vs. kohdelistan 145 m (koko_m on rajausneliö), Podgorican Vanha silta (perimätietona), monissa "hakutulos"-merkityt toiset lähteet (huom-kenttä lahteet-alkiossa), Itsenäisyydenaukion tarkka päivä (yksi lähde, ei tekstissä).
- Yksityiskohtaluettelot ja havainnekuvat (esittely/<id>-v2/…) puuttuvat: erillinen erä, jos halutaan.

## Korjauskierros 16.10. ilta (PT:n riippumaton tarkistus, omistaja 19.51: ei rastia)
- Faktakorjaukset: Tirana (Et'hem Beyn moskeija "1700-luvun lopulla" kartassa + oppaassa; kellotorni "rakentaminen alkoi 1822"; Stalinin patsas ja Taiwan-lempinimi pois, Taiwan-keskus), Monaco (aukiolo "keväästä lokakuun puoliväliin"; Grimaldit menettivät linnoituksen pian, kallio pysyvästi 1419; "vuosina 1793–1814"; Caesar-kysymys "Milloin"), Bern (kukko-esitys alkaa noin 4 min ennen tasatuntia; "yli kolmeksi vuosisadaksi"; kantonien neuvosto), Bratislava (raatihuone 1430-luvulla; 51 m pois; Sininen kirkko "omistettu Pyhälle Elisabet Unkarilaiselle" kartassa), Belgrad (Skadarlijan lyhyt aikajärjestykseen, Ružina pois), Podgorica (kunnostus- ja "serbit"-lauseet pois), Zagreb (Lotrščakin torni "1200-luvulla", Ban Jelačićin aukio 1641 "mainitaan markkinapaikkana").
- Kieli: lukuvälit ajatusviivalla, "Monte Carlon", "Pyhän Martinin" (nimi-kenttä ennallaan), "kod konja" suomalaisin lainausmerkein, Zagrebin kartan esittely 720 merkkiin; "pallokorista"-toisto vähennetty (7 kohdetta).
- Kytkentä: KAUPUNKIKARTAT.<id>.esittely (js/packs/maakartat.js) = docs/kohtaukset/kaupunkiesittelyt/<id>.json (7 kaupunkia). Oppaan korjattu versio uudella polulla opas/esittely-v2a/<id>.json (R2:n objektit muuttumattomia): vientipaketti proto-3d/_valmiit/opas-esittely-v2a-paakaupungit-7-vienti-20261016b; aineistot.js esittely_polut + testin AANELLISET-taulukko.
- Prahan historiaosiot: kaksi kieliehdotusta (docs/kohtaukset/pallokierros/praha-historia-20261014.json).
- Pituuspoikkeamat: Skadarlijan lyhyt 129 merkkiä (Ružina pois), Grassalkovichin palatsin ja Tiranan kellotornin teksti 497/495 (alle 500); sisältö oikein.
