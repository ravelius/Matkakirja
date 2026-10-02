# Pelikoodarin luovutus 2.10.2026 (klo 22.1x, viikkokiintiö 92 %)

## 0. Kärki: kesken olevat erät (omistajan palaute 21.3x, menee ajattelijoiden kierrosten 2–3 edelle)

- **B) Astronautin kamera (web), haara `pelikoodari-astro-hiljaa` (775d670b, pushattu, EI vielä PR:ää).**
  Arvot on sovittu Linssiseppä 2:n kanssa, joka tekee saman natiiviin.
  - **AUTO hiljaa:** AUTOn aikana ✕, Pulu, ‹ › ja AUTO häivytetään (200 ms, paluu 220 ms).
    - Napautus palauttaa napit EIKÄ pysäytä AUTOa, ja napit häipyvät taas 4 s:n kuluttua.
    - ‹ ›, ✕, Pulu, nuolet, veto (> 10 px) ja rulla pysäyttävät AUTOn.
  - **Siirtolappu:** Seuraava/Pysäytä-lappu on poistettu. Siirto tapahtuu hiljaa 3 s luennan jälkeen.
  - **Sumu:** peitot puolitettu (0,15 → 0,08 ja 0,62 → 0,31).
  - Todennettu Playwrightilla (AUTO+5 s: napit opacity 0; napautus: näkyvät, AUTO yhä päällä; 25 s: hiljaa + seuraava kohde).
  - **Puuttuu:**
    - kuvaparit (ennen-kuvat on otettu: scratchpad `as/ennen-*`, jälkeen `as/jalkeen-*`; kokoa `pari.mjs`:llä
      kansioon `proto-3d/lokit/pelikoodari-astro-20261002/`)
    - PR ("Pohja: …"-rivi)
    - viesti Päätoimittajalle ja Linssiseppä 2:lle
  - **Kohta 3 (maapallokuvake isommaksi, vaakatilassa vasempaan alakulmaan):** webissä ei ole maapallokuvaketta.
    Linssiseppä 2 selvittää, mikä se natiivissa on. Jos kuvaketta ei ole webissä, kohta koskee vain natiivia.
  - Testiskripti: scratchpad `astro.mjs` (avaa linssin, sulkee Pulun taulun, napauttaa (200,420) → Dardanellit).
- **A) Topografia-linssin hampurilainen (web), haara `pelikoodari-topo-hampurilainen` (tyhjä, mainista).**
  - Oikean yläkulman pilleri pois, tilalle hampurilainen (OHJAUSNAPPI-neliö 40 pt, kulma.nappi).
  - Valikossa ylimpänä Korkeustasot ja sen alla Sulje linssi. Kartalta poistuvat Korkeustasot-nappi ja ✕.
  - Natiivin tekee Linssiseppä (Natiivi-UI kirjaa listan tyylikirjaan). Linssien hampurilaisen ensimmäinen käyttö.
  - Webin topografian ohjaimet on vielä paikantamatta: `js/linssit/topografia.js` ei sisällä nappeja, joten ohjaimet
    ovat todennäköisesti linssikuoressa (`js/pallolauta/linssikartta.js`) tai `js/ui.js`:n valitseLinssissä.
    Selvitä ensin webin nykyinen kuva.

## 1. Junassa ja mainissa (2.10.)

- **Mainissa:** #3859, #3862, #3864 (v2567), #3866 (kipsipää), #3867 (puhe äänenä), #3869 (poikkeusten tarkennus,
  v2570) ja #3874 (kipsipisteet Sokrates [39.49, 23.98], Marcus [42.82, 12.17]; päät karttamerkkien alla; natiivi puhdas,
  omistaja hyväksyi 20.5x).
- **Junassa:** #3865 (£-woff2), #3870 (GALLERIA-pohja, luokat `tk-kokoelma-*`; Julisteet ensimmäinen käyttäjä),
  #3875 (valikko V2: väliviivat pois paitsi alin, tasolaatta) ja #3877 (Aarteet yhdessä ikkunassa, kehittäjätilassa 7/7).
- **Ilmoita Natiivi-UI:lle,** kun #3870 on mainissa (natiivi korjataan GALLERIAn osalta webin mukaiseksi).

## 2. Jono tämän jälkeen

1. Ajattelijoiden kierrokset 2–3 (`pelikoodari-sokrates-web`-muistio).
2. Linssien hampurilainen muihin linsseihin (Natiivi-UI:n lista).
3. Ajattelijoiden varustekuva `tools/generoi-varustekuvat.mjs` (3 Gemini-ehdokasta, Päätoimittaja valitsee).
4. PWA-nahka vasta, kun omistaja hyväksyy natiivin yläpalkin.

## 3. Työtilat ja työkalut

- **Worktreet:**
  - `wt/pelikoodari-kipsipaa` (astro-hiljaa)
  - `wt/pelikoodari-liiku-liuska` (punta-woff2 / raha-proosa, poistettavissa kun #3865 on mainissa)
  - `wt/pelikoodari-galleria` (aarteet-yksin)
  - Kaikki pushattu; poista `--poista`:lla mergen jälkeen.
- **Scratchpad-skriptit (Playwright, 393×852 @2x):**
  - `kipsi3.mjs` (päät + Rooma)
  - `valikko3.mjs` (valikko + Asetukset)
  - `aarteet.mjs` (KEHITTAJA=1)
  - `astro.mjs`
  - `pari.mjs` (kuvapari)
- **Kuvaparit:** valikko V2 `proto-3d/lokit/pelikoodari-valikko-v2-20261002/siisti/valikko-pari-punta.png`.
- Päätoimittaja on nyt eri sessio (89901-sokkeli) kuin aamulla. Vastaa viestin `from`-osoitteeseen.
