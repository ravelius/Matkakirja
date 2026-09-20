# Viesti Fablelle: Brysselin kohdekartta (pilotti)

20.9.2026, Sonnet-sessio "Sonnet 3", haara `sonnet3-bryssel-kohdekartta` (pohja origin/v1972-prep 5bf4ad11).
Versiota ei nostettu, PR:ää ei avattu, Raamattuun ei koskettu.

**Tulos:** `node --test tests/*.test.mjs` 3731 testiä, 3718 läpi, **0 kaatunutta**, 13 ohitettua; niputus ja kaksoisavaimet kunnossa; `tarkista-karttapisteet bryssel`: kaikki pisteet maalla, mittakaavajana vapaa, numeroympyrät erillään.
**Selain (Chromium):** Brysselin liuskassa nyt `lehti / Nähtävyydet / Turistiopas` (+ "Muut (7)" -kategoria, jonne siirtyvät kohdekartan kohteet); Nähtävyydet-näkymä näyttää kartan, esittelyn ja "Kokoruutu"-napin; kaikki 7 kohdetta avautuvat.

## Mitä työkalu vaati (vastaus alkukysymykseen)

Ei avaimia: `tools/piirra-kaupunkikartta.mjs` hakee OSM-aineiston Overpassista (avaimeton; overpass-api.de antoi ajoittain 504:n, työkalun uusinta hoiti), piirtää SVG:n pelin paletilla ja rasteroi PNG:ksi paikallisella Chromiumilla (`CHROMIUM=…`, `NODE_PATH=…/node_modules` playwrightia varten). Vain miniatyyripiirrokset (`tools/generoi-miniatyyrit.mjs`, kuvageneraattori) vaatisivat ulkoisen avaimen — ne jätettiin pois (ks. alla).

## Mitä tehtiin

| Tiedosto | Muutos |
| --- | --- |
| `tools/piirra-kaupunkikartta.mjs` | `bryssel`-rajaus `{ pohjoinen: 50.851, etela: 50.8335, lansi: 4.342, ita: 4.376 }` (2,4 × 1,9 km), `laajennus: 1.6`, perustelukommentti |
| `assets/kartat/bryssel-keskusta.png` (paperi), `bryssel-varikartta.png` (väri) | 2560 × 2087 px, piirretty `--vari`-vipuun; katsottu silmin: kaupungin sisärengas, Parc de Bruxelles, Sablon, Mont des Arts, Senne-vesialueita ei (katettu) |
| `js/packs/maakartat.js` | `KAUPUNKIKARTAT.bryssel`: polku, varikartta, rajat, piirtoRajat, esittely (1873-katse: Senne katettu 1867–71, pörssipalatsi 1868–73, Oikeuspalatsi rakenteilla 1866–83, Mont des Arts vasta 1900-luvulla), 7 kohdetta lännestä itään |
| `sw.js` | kaksi PNG:tä SHELLiin |
| `tests/kaupunkiliuska.test.mjs` | Bryssel-testi päivitetty (nyt kaikki kolme riviä); Ljubljana on uusi "opas mutta ei kohdekarttaa" -esimerkki |

Kohteet (koordinaatit Overpassista): Brysselin pörssi, Manneken Pis, Oikeuspalatsi, Grand-Place, Galeries Royales Saint-Hubert, Mont des Arts, Kuninkaanpalatsi. Viisi on fi-Wikipedia-artikkeleilla (`wiki`); **Oikeuspalatsilla ja Mont des Artsilla ei ole fi-artikkelia** (haettu 20.9.), joten niille on oma `teksti` (2 kappaletta, en-Wikipedian faktat, 1873-katse) ja yksi Commons-kuva kummallekin (M0tty CC BY-SA 3.0: kupoli sisältä; Julian Lupyan CC0: Mont des Artsin puutarha; molemmat ≥ 1200 px, katsottu).

## Päätökset ja huomiot

- **Atomium ja Cinquantenaire jäivät pois** (Fablen hyväksymä; Atomium 5,4 km pohjoiseen, Cinquantenaire 2,5 km itään — rajaus olisi mennyt puuroksi). Tilalle Brysselin pörssi (valmistui 1873, joten sopii isoisän katseeseen).
- **Miniatyyrit puuttuvat** (kohta 24, kuvageneraattori/avain): kohteet eivät siksi ole kartalla numeroympyröinä vaan siirtyvät liuskan "Muut (7)" -riville (sama malli kuin Pariisin siirretyillä). Nähtävyydet-arkin kartta näyttää siis vain katuverkon, jos miniatyyrejä ei generoida.
- Kohdekartta ei riko nostot-kartalla-räikkää (testit vihreät).
- Ei tehty: nähtävyysjutut (kohta 19) omina 2–3 kappaleen jutuinaan; Wikipedia-kohteet näyttävät fi-artikkelin johdon.

## Liuska-Historia-bugi (erillinen kysymys, sonnet3-liuska-historia)

Headless-toisto 390 px kosketuksella (hasTouch, isMobile) v1972-prepistä: Ljubljanan liuskassa **ei tule kategoriariviä "Historia (1)" lainkaan** (rivit: `lehti`, `opas`), koska nostorivit (Ljubljanan suo) tulevat pyramidin nostoluettelosta verkosta eikä headless-ajossa löytynyt luetteloa — toistoa ei siis saatu. Staattinen luku: `napautaLiuskasta` (js/pallolauta/nostot.js) käsittelee `kategoria`-rivin **avaamalla haitarin** (`liuska.avattuKategoria` vaihtuu, `ladoUudelleen`), ei sulje liuskaa; sulkeutuminen tapahtuu vain, jos napautus osuu liuskan ulkopuolelle tai yläryhmän riviin. Jos iPhonessa Historia-rivin napautus sulki paneelin, todennäköinen syy on napautuspisteen ruutumitta (simulaattorin screenshot on pikseleinä, tap pisteinä: jakaja ~2,29, ks. muistiinpano) tai se, että "Historia (1)" oli rivi, jonka laatikko (`liuskanKohdat`) ei vastannut piirrettyä. En korjannut mitään; tarvitsen Sonnet 1:ltä tarkan napautuspisteen ja liuskan rivien laatikot (`window.matkakirja.ui.pallolauta.nostot.liuskanRivit()`) simulaattorista, jotta juurisyy voidaan varmistaa.
