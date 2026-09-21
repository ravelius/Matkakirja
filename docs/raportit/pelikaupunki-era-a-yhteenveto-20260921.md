# Pelikaupunki-erä A: CYP/LUX/MLT — yhteenveto (2026-09-21)

Kolme rinnakkaista Sonnet-agenttia (isoloidut worktreet), Fablen tilaus
21.9.2026. Kunkin oma raportti: docs/raportit/pelikaupunki-cyp-20260921.md,
-lux-20260921.md, -mlt-20260921.md.

## CYP — sisalto-pelikaupunki-cyp (commit ce42f816, origin/main de6205b2)

**Löydös ennen työtä:** Nikosia oli JO pelattava kaupunki — se asuu
`js/packs/middleeast.js`:ssä (ei europe.js:ssä), joten koko "MINIMI"-
resepti oli jo kirjoitettu Lähi-idän tiedostoihin (middleeast-questions.js,
asia-valokuvat.js, asia-artikkelit.js, asia-saapumiset.js, radiot.js) ja
kohdekartta (6 kohdetta) oli valmis jo 12.8.2026 lähtien. Korjaa aiemman
Eurooppa-sisältöinventaarion (docs/raportit/sisaltoinventaario-eurooppa-
20260921.md) virheellisen väitteen "CYP 0 pelikaupunkia" — inventaario
katsoi vain europe-countries.js:ää, ei middleeast.js:ää.

Ainoa puuttunut pakollinen sisältö: paikallisaarrepari, lisätty
paikallisaarteet.js:ään (ei vielä kuvaa, merkitty KUVAA_ODOTTAVAT-listaan
kuten BEL/SVN/SVK).

**Avoin kysymys Fablelle:** kaupunkimusiikin ALUEEN_MAAT-rivi CYP:lle
jätetty tekemättä — koko Lähi-itä on tarkoituksella rajattu tämän
järjestelmän ulkopuolelle, joten pelkän CYP:n lisääminen olisi
epäjohdonmukaista ilman laajempaa päätöstä.

Testit: 3836/0 fail (sama kuin ennen — ei regressiota).

## LUX — sisalto-pelikaupunki-lux (6 committia, origin/main de6205b2)

Aito uusi kaupunki. Piste mitattu (49,6117°N/6,1296°E → maailmankartta
6037,7/1407,0, europe.js 329/589), lähin naapuri Bryssel 80,2 yksikköä
(raja 60, ei siirtoa). Reitti pariisi–alpit (68,3 yks.) katkaistiin
kahdeksi Luxemburgin kautta, sama periaate kuin Bryssel/Ljubljana/Kosice.
Täysi MINIMI-sisältö (kysymykset, tiedot, kuva, artikkeli, kevyt
fokusvirta, radio, aarrepari, kaupunkimusiikin alue), kohdekartta 6
kohteella piirretty ja pistetarkistettu. Nostoräikkä ratkesi itsestään
kohdekartan myötä (kuten Brysselillä).

Testit: 3837/0 fail.

## MLT — sisalto-pelikaupunki-mlt (4 committia: 2798457b, 4f021d7e,
46b25cae, ee121641, origin/main de6205b2)

Aito uusi kaupunki, saari (lisätty `islands`-taulukkoon, meri-reitit
Sisiliaan ja Tripoliin). Piste mitattu (35,8989°N/14,5146°E →
6317,2/1961,4, täsmää jo olemassa olleen hahmotelma-mlt.js:n
Valletta-nostopisteen kanssa). Täysi MINIMI-sisältö. Kohdekartta 6
kohteella. **Iso nostoräikkä-löydös:** 14-15/25 Maltan hahmotelmanostoa
osui "kaupungin kohdalle" -säteelle (paljon enemmän kuin Brysselin 1) —
ratkesi silti itsestään, koska kaikilla 25:llä on jo `lahi: true` ja
kohdekartan synnyttyä luokitin osuu lähizoomi-haaraan ennen kattoa.
`tools/tarkista-nostopaikat.mjs`: kaikki 25 näkyvät yhä "pääkartalla".

Velat: Maltan radio ei löytänyt virallista PBS/Radio Malta -streamiä
(ladataan dynaamisesti JS:llä) — käytössä Calypso Radio 101.8 sijasta,
toimivaksi todennettu (CORS *). Ei "arki"-täytenostoa (valinnainen).

Testit: 3837/0 fail.

## Julkaisijalle: yhdistelmävaroitus

LUX ja MLT muokkasivat kumpikin SAMOJA suuria tiedostoja (europe.js,
europe-countries.js, js/packs/maailmankartta.js: CITIES/EDGES/
CITY_COUNTRY/counts) samasta origin/main-kärjestä — mergeissä on siis
odotettavissa rivikonflikteja (ei sisällöllisiä ristiriitoja, vain
samaan kohtaan osuvia rivilisäyksiä). Suositus: mergetä yksi kerrallaan
(esim. CYP ensin — pienin diff, sitten LUX, sitten MLT) ja ratkaise
konfliktit käsin rivi kerrallaan reseptin mukaisesti. Kummankin oma
testiajo (0 fail) on tehty ERI kannalta — yhdistetty haara pitää testata
uudelleen mergen jälkeen.

## PIENOISMALLITILAUS (Codexille, erä B-jatkoksi) — 18 kohdetta, 3 kaupunkia

Tyyli sama kuin 97-erä: yksivärinen seepiamusteluonnos, ei tekstiä,
paperinvärinen tausta, tapahtumat/esineet tunnistettavina siluetteina,
ei muotokuvia.

### Nikosia (6)
- Selimiyen moskeija — goottilaisen entisen katedraalin länsijulkisivu, kaksi kapeaa minareettia, teräväkaarinen ovi
- Büyük Han — karavaanimajatalon kaksikerroksinen sisäpiha, keskellä pieni kahdeksankulmainen moskeijarakennelma
- Faneromenin kirkko — kirkon julkisivu kellotorneineen, vieressä muuri neljällä marmorisarkofagilla
- Omeryen hamam — matala hammam-rakennus, katolla rivi pyöreitä valonlähdekupuja
- Kyproksen museo — neoklassinen pääjulkisivu pylväineen ja portaineen
- Leventis-museo — kaksikerroksinen kaupunkitalo, ylätasanteella rautakaiteinen parveke

### Luxemburg (6)
- Adolphe-silta — yksi suuri kivikaari laakson yli, sivukuva
- Guillaume II:n aukio — ratsastajapatsas raatihuoneen edessä, aukionäkymä (ei lähikuvaa kasvoista)
- Notre-Damen katedraali — kaksi tornia ja pääjulkisivu
- Suurherttuallinen palatsi — renessanssijulkisivu koristelluin ikkunankehyksin, katunäkymä
- Chemin de la Corniche — kävelyreitti vanhalla vallilla, näkymä alas jokilaaksoon (maisema, ei ihmisiä)
- Bockin kasematit — kallioon louhittu käytävä ja tykinampuma-aukko, sisätila/rakenne esineenä

### Valletta (6)
- Auberge de Castille — koristeellinen barokkijulkisivun yksityiskohta
- Pyhän Johanneksen ko-katedraali — hiekkakivinen kaksitorninen julkisivu
- Suurmestarin palatsi — sisäpihan arkadi tai pihatykit
- Yläbarrakka-puutarhat — kaareva pergola ja tervehdyspatteriston tykki
- Piirityskello-muistomerkki — pyöreä pylväikkö ja sen riippuva pronssikello (huom: 1992 muistomerkki, ei 1873-aikainen esine)
- Pyhän Elmon linnake — tähtilinnoituksen muuri/vallihauta, ei hahmoja
