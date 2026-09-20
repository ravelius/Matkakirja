# Viesti Fablelle: Ljubljanan kohdekartta

20.9.2026, Sonnet-sessio "Sonnet 3", haara `sonnet3-ljubljana-kohdekartta` (pohja origin/v1972-prep 5bf4ad11).
Versiota ei nostettu, PR:ää ei avattu, Raamattuun ei koskettu.

**Tulos:** `node --test tests/*.test.mjs` 3735 testiä, 3722 läpi, **0 kaatunutta**, 13 ohitettua; niputus ja kaksoisavaimet kunnossa; `tarkista-karttapisteet ljubljana`: kaikki pisteet maalla, mittakaavajana vapaa, kaksi läheisyyshuomiota ("tavallista, ei toimenpidettä"). Selain (Chromium): Ljubljanan liuskassa nyt lehti / Nähtävyydet / Turistiopas; kaikki kohteet avautuvat sisältöineen.

## Sisältö

- `tools/piirra-kaupunkikartta.mjs`: `ljubljana`-rajaus `{ 46.056 N, 46.0455 S, 14.493 W, 14.513 E }` (1,5 × 1,2 km), `laajennus: 1.6`.
- `assets/kartat/ljubljana-keskusta.png` (paperi), `ljubljana-varikartta.png` (väri), 2560 px leveitä; Ljubljanica-joen mutka Linnavuoren ympärillä, Tivoli-puisto lännessä.
- `js/packs/maakartat.js` `KAUPUNKIKARTAT.ljubljana` + `sw.js` (kaksi PNG:tä): esittely 1873-katseella (juna 1849, linna vankilana, Tromostovje yksi kivisilta, Lohikäärmesiltaa ei vielä, 1895 maanjäristys), 8 kohdetta lännestä itään (koordinaatit Overpassista): Tivoli-puisto, Križanke, Prešernin aukio, Tromostovje, Ljubljanan tuomiokirkko, Ljubljanan linna, Keskustori, Lohikäärmesilta.
- fi-Wikipediassa on artikkeli vain Tromostovjesta, linnasta ja tuomiokirkosta (haettu 20.9.); muille viidelle on oma `teksti` (en-Wikipedia, 1873-katse: mikä on jo/ei vielä olemassa) ja yksi Commons-kuva: Tivoli (Lauterbach/French, teräskaiverros noin 1855, PD, tasan isoisän aikaa), Križanke (Ljuba brank CC BY-SA 3.0), Prešernin aukio (Palickap CC BY-SA 4.0), Keskustori (Tiia Monto CC BY-SA 3.0), Lohikäärmesilta (Thomas Ledl CC BY-SA 4.0). Lisenssit ja leveydet tarkistettu Commonsista (≥ 2500 px).
- `tests/kaupunkiliuska.test.mjs`: "opas mutta ei kohdekarttaa" -esimerkki vaihdettu Alppeihin; uusi testi Brysselille ja Ljubljanalle (kaikki kolme yläryhmän riviä).

## Huomiot

- Miniatyyrit (kuvageneraattori) puuttuvat, joten kohteet siirtyvät liuskan "Muut (N)" -riville, kuten Brysselillä.
- Prešernin aukion piste on siirretty muutaman kymmenen metriä fransiskaanikirkon puolelle (46,05165 / 14,50575), jotta se ei ole Tromostovjen päällä.
- Prešernin aukion kuvassa on pieniä ihmisiä keskellä aukiota (ei pääaiheena); vaihdan jos haluat.
