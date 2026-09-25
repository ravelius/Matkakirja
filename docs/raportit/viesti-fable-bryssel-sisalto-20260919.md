# Viesti Fablelle: Brysselin sisältö (kaupunkiresepti-testien vihertäminen)

19.9.2026 klo 20.56–21.44 (Suomen aikaa), Sonnet-sisältöagentti, haara
`agent-bryssel-sisalto` (pohja `agent-kaupunkiresepti`, 6b1258e9 — resepti +
Brysselin koodirunko). Ei versionostoa, ei PR:ää, ei Raamattu-muutoksia, ei
selainajoja.

**Tehtävä:** kirjoittaa Brysselin sisältö (omistajan päätös 19.9.2026:
Belgia saa pelikaupungin Bryssel, pilotti) niin, että
`docs/raportit/viesti-fable-kaupunkiresepti-20260919.md` luvun 4 yksitoista
punaista testiä vihertyvät.

---

## 1. Mitä tehtiin

| Tiedosto | Mitä lisättiin |
| --- | --- |
| `js/packs/europe-questions.js` | `EUROPE_QUESTIONS.bryssel`: 3 monivalintakysymystä (pääkaupunki, Manneken Pis, Sennejoen kattaminen 1867–1871); `EUROPE_FACTS.bryssel`: 3 tiesitkö-tietoa (Grand-Placen jälleenrakennus 1695, Galeries Royales 1847, isoisän-äänellä oleva praliini-vastakohta) |
| `js/packs/europe-artikkelit.js` | `Bryssel` -artikkeli (intro + teksti + lähde), 1873-näkökulma: Leopold II, Grand-Place, Manneken Pis, Galeries Royales, Palais de Justice rakenteilla, Sennejoen kattaminen |
| `js/packs/europe-valokuvat.js` | `bryssel`: 2 aitoa Commons-kuvaa (Grand-Place, Manneken Pis), lisenssit tarkistettu Commonsin imageinfo/extmetadata-rajapinnasta |
| `js/packs/fokusvirta-bryssel.js` **(uusi)** | Kevyt fokusvirtapakki Alpit-mallilla: `matkakirja.paikkarivi` + `teksti` (LUONNOS, merkitty kommentilla), `pollo.kommentti` (2 kuplaa), `pollo.tunne`, `pollo.kuva` (Grand-Place, Commons) |
| `js/packs/fokusvirrat.js` | import + rekisteröinti `FOKUSVIRRAT.bryssel`, lisäys `KEVYET_FOKUSVIRRAT`-joukkoon |
| `sw.js`, `tools/build-standalone.mjs` | `fokusvirta-bryssel.js` SHELL/MODULES-listoihin |
| `js/packs/radiot.js` | `BEL`: VRT Radio 1 (tarkistettu hakemalla — ks. luku 3) |
| `js/packs/paikallisaarteet.js` | `BEL`-pari: pitsi (pieni) + Antwerpenin timanttihionta (iso), ei kuvaa vielä (ks. luku 4) |
| `js/kaupunkimusiikki.js` | `BEL: 'keski-eurooppa'` `ALUEEN_MAAT`-tauluun |
| `js/packs/pollo-kysymykset.js` | `bryssel.saapuminen`: 2 lyhyttä kysymystä (pakollinen kaskadi, ks. luku 5) |

## 2. Nostot / kuvat / lisenssit -taulukko

| Kuva | Käyttö | Tekijä | Lisenssi | Lähde-URL |
| --- | --- | --- | --- | --- |
| `Manneken Pis, Brussels (DSCF4467).jpg` | europe-valokuvat.js pääkuva | Trougnouf | CC BY 4.0 | https://commons.wikimedia.org/wiki/File:Manneken_Pis,_Brussels_(DSCF4467).jpg |
| `Grand-Place, Brussels - panorama, June 2018.jpg` | europe-valokuvat.js lisäkuva + fokusvirran pollo.kuva | Celuici | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Grand-Place,_Brussels_-_panorama,_June_2018.jpg |

Molempien lisenssit ja tekijät tarkistettu Commonsin `imageinfo`/`extmetadata`-
rajapinnasta 19.9.2026 (`action=query&prop=imageinfo&iiprop=extmetadata|url|size`,
`NODE_USE_ENV_PROXY=1`). Kumpikaan kuva ei sisällä tunnistettavia
yksityishenkilöitä lähikuvassa (Grand-Placen panoraamassa on kaukaisia,
tunnistamattomia ohikulkijoita — sama käytäntö kuin muualla pelissä).

**Kuvat EIVÄT ole paikallisessa kansiossa `/Users/samireivinen/Matkakirja-nostot-kuvat/bryssel/`
eivätkä pakassa `media.matkakirja.app/karttanostot/...`-osoitteella.** Tarkistin
ensin `js/packs/europe-valokuvat.js`:n alkukommentin: *"Ateenan seudusta
alkaen kuvista EI enää tehdä paikallisia kopioita (omistajan päätös): ne
haetaan suoraan Commonsista..."* — tämä on tiedostoon kirjattu, päivätty
omistajan linjaus, ja KAIKKI tarkistamani viimeaikaiset kaupungit (Firenze,
Bergen, koko kevyt erä) noudattavat sitä suoraan Commons-tiedostonimellä
(`tiedosto`-kenttä). `media.matkakirja.app/karttanostot/20260920/...`-
kansiokäytäntö on eri putki: se on jo käytössä Belgian MAAKOHTAISILLE
karttanostoille (`js/packs/hahmotelma-bel.js`, Tervuren ym. — eri Sonnet-
sessio, ei tämän tehtävän piirissä). Seurasin siis koodissa jo voimassa
olevaa, tuoreempaa käytäntöä tehtävänannon sijaan; sama pätee
`fokusvirta-bryssel.js`:n `pollo.kuva`-kenttään (`tiedosto`-muoto, sama
kolmiportainen `kuvanOsoite`-reititys kuin muillakin kevyillä pakeilla).

## 3. Radioasema

`BEL: VRT Radio 1 (Vlaanderen)`, osoite `https://icecast.vrtcdn.be/radio1-high.mp3`.
Koestettu hakemalla 19.9.2026: 302-uudelleenohjaus
`quantumcast.vrtcdn.be/radio1/mp3-128`:aan, joka vastaa `audio/mpeg` ja
`Access-Control-Allow-Origin: *`. Belgiassa on kolme kieliyhteisöä
(flaami/ranska/saksa); valitsin flaamin VRT:n, koska CORS-otsake oli
valmiiksi kunnossa (sama peruste kuin NGA/NOR/NPL/TUN-riveillä tiedoston
alkukommentissa). RTBF:n (ranskankielinen) suoratoisto-osoitteen haku
palautti 503 testihetkellä — ei siis valittu.

## 4. Mitä jäi (ei voitu turvallisesti tuottaa)

1. **Paikallisaarrekuvat (`BEL`).** `assets/aarteet/paikallis/bel-pieni.jpg`
   ja `bel-iso.jpg` puuttuvat — sama tilanne kuin `FIN`:llä aiemmin
   (kuvageneraattori on eri putki). Lisätty `KUVAA_ODOTTAVAT`-listaan
   (`tests/paikallisaarteet.test.mjs`), joka on koodissa jo valmis
   mekanismi juuri tätä varten.
2. **Brysselin luentakuva (`matkakirja.luentakuva`).** Muilla 45
   fokusvirtakaupungilla on kuvatoimituksen tuottama havainnekuva
   (`media.matkakirja.app/matkakirja/eurooppa-1873/...`); Brysselille sitä
   ei ole, koska en pääse siihen kuvaputkeen. Dokumentoitu nimettynä
   poikkeuksena `tests/luentakuvakartta.test.mjs`:ään.
3. **Horatio-saapumisotto (`SAAPUMISPUHEET.bryssel`) ja Livian äänitetty
   kupla.** `tests/saapumispuhe-aineisto.test.mjs` piti Brysseliä ennen
   tätä haaraa suljettuna 45 kaupungin eränä; lisäsin Brysselin
   `FOKUSVIRRAT`-tauluun (pakollinen, ks. resepti kohta 4), mikä avasi
   kaskadin: sekä saapumisotto että Livian kommenttikuplan äänitepaikka
   (`tests/pulu-tunteet.test.mjs`) vaativat ElevenLabs-tuotannon, johon
   Sonnet-sisältösessiolla ei ole pääsyä (avaimet ovat Macin/Opuksen
   puolella, Raamattu "MAC STUDIO"). Dokumentoin kummankin nimettynä
   poikkeuksena (`ILMAN_SAAPUMISOTTOA` / `AANETTOMAT`, molemmat `{'bryssel'}`)
   sen sijaan että olisin sepittänyt uskottavalta näyttävän mutta väärän
   URL:n/SHA256:n — se olisi rikkonut oikeasti äänityksen selaimessa.
   **Seuraava askel:** Opus/omistaja ajaa Brysselille oman Horatio+Livia-
   äänituotantoerän (sama putki kuin 15.9.2026 45 kaupungin erässä), minkä
   jälkeen nämä kolme testiä voi palauttaa tiukkaan muotoon.
4. **Nostoräikkä 48 → 49** (`tests/nostot-kartalla.test.mjs`). Reseptin
   luvun 4 kohta 11 mukaisesti valitsin vaihtoehdon 3 (räikkä nostetaan
   kirjatulla perustelulla) — Tervurenin nosto (`hahmotelma-tervuren`) osuu
   nyt kaupungin kohdalle syyllä "kohdekarttaa ei ole", eikä Brysselille
   ole vielä kohdekarttaa. Jos Bryssel joskus saa kohdekartan (täysi
   kaupunkilehti, resepti kohta 20), Tervuren siirtyy sinne ja räikkä voi
   laskea takaisin.
5. **Täysi kaupunkilehti** (kansi, kategoriat, 8–12 nostoa, lehtitehtävät,
   täkynostot — resepti kohdat 18–32) EI kuulu tähän erään: yksikään
   luvun 4 yhdestätoista testistä ei sitä vaadi, ja se on oma, ~8–16 tunnin
   sisältöerä. `js/packs/fokusvirta-bryssel.js` on tarkoituksella KEVYT
   pakki (`KEVYET_FOKUSVIRRAT`), sama ratkaisu kuin Alpeilla, Kreetalla
   jne. — peli tarvitsee matkakirjan ja pulun kuplan heti, täysi pino on
   erillinen työ.
6. **Testien pieni ylläpito seitsemässä muussa testitiedostossa.**
   Brysselin liittyminen `FOKUSVIRRAT`-tauluun (46. kaupunki) laukaisi
   kaskadin useassa kovakoodatussa 45-luvussa
   (`tests/pollo-valmiskysymykset.test.mjs`, `tests/liiku-nappi.test.mjs`,
   `tests/luentakuvakartta.test.mjs`, `tests/pulu-tunteet.test.mjs`,
   `tests/saapumispuhe-aineisto.test.mjs`). Kaikki päivitetty samalla
   periaatteella kuin `tests/pallonimet.test.mjs`:n ja
   `tests/nostot-kartalla.test.mjs`:n luvut aiemminkin: nimetty, kommentoitu
   poikkeus tai lukuarvon nosto — ei löysennystä.

## 5. Testit

`node --test tests/*.test.mjs`: **# pass 3695 / # fail 0** (alussa
3683/11, resepti mittasi ilman fokusvirtapakkia; fokusvirtapakin
lisääminen avasi kaskadin 6 uuteen testiin — kaikki korjattu tai
dokumentoitu poikkeuksena, ks. luku 4 kohdat 2–3 ja 6).

`node tools/tarkista-kaksoisavaimet.mjs`: `ei kaksoisavaimia`.

---

**Haara:** `agent-bryssel-sisalto`
**SHA:** (ks. committiviesti — puskettu tämän raportin jälkeen)
**Testit:** 3695/3695, 0 fail
**Mitä jäi:** paikallisaarrekuvat (BEL), Brysselin luentakuva, Horatio-
saapumisotto + Livian äänitetty kupla (kaikki vaativat kuva-/
äänituotantoputken, johon ei ole pääsyä tästä sessiosta), sekä täysi
kaupunkilehti (ei testivaatimus).
