# Viesti Fablelle: uuden pelikaupungin resepti + Brysselin minimiluonnos

19.9.2026 klo 20.56–21.20 (Suomen aikaa), Opus-agentti, haara `agent-kaupunkiresepti`
(pohja `claude/bold-ride-vow4ki-v1965`, 55592962). Ei versionostoa, ei PR:ää, ei Raamattu-muutoksia, ei selainajoja.

**Tehtävä:** omistaja päätti 19.9.2026, että Belgia, Slovakia ja Slovenia saavat pelikaupungin
(Bryssel, Bratislava, Ljubljana), koska ilman pelikaupunkia maan uusiin karttanostoihin ei pääse.
Alla on MITATTU resepti: jokainen rivi on joko luettu git-historiasta tai todettu ajamalla testit
Brysselin kanssa.

---

## 0. Mittausmenetelmä (mitä tehtiin, jotta luvut eivät ole arvauksia)

1. **Git-historia.** Viimeisimmät kaupunkilisäykset paikannettiin `git log -S`:llä:
   - `8a56f189` v832 "Firenze Euroopan laudalle" (17.8.2026) — **yksi kaupunki, 20 tiedostoa**. Tämä on puhtain malli.
   - `06700559` v831 "Tampere ja Rovaniemi" (17.8.2026) — sama 20 tiedoston muoto.
   - `e70bfcc4` v833 "13 uutta kaupunkia laudoille ja maailmankartalle" (17.8.2026) — kevyt monistuserä.
   - `377add47` v1332 / `6c888322` v1341 / `50f80fad` v1343 (Aallot 4A–4C, 29.–30.8.2026) — nämä EIVÄT lisänneet
     kaupunkeja vaan fokusvirtapakkeja jo olemassa oleviin; ne kertovat silti fokusvirran rekisteröintikohdat
     (`fokusvirrat.js`, `sw.js`, `tools/build-standalone.mjs`).
   - `6f0c1da4` v1351 "Maailmankartta ainoaksi pelilaudaksi" (30.8.2026) — tämän jälkeen `js/packs/europe.js`
     on pelkkä SISÄLTÖLÄHDE eikä lauta. Se muuttaa reseptiä: Euroopan oma `minCityDistance`-portti ei enää aja.
2. **Koeajo.** Bryssel lisättiin koodiin tämän haaran minimillä (ks. luku 3) ja ajettiin `node --test tests/*.test.mjs`.
   Punaiset testit luku 4:ssä ovat SUORAAN ajon tuloksia, eivät päättelyä.
3. **Koordinaatit** laskettiin pelin omalla projektiolla (`tools/vanha-maailma.mjs` `sovitaMaailma`),
   ei silmämääräisesti.

---

## 1. Mitattu koordinaattitilanne kaikille kolmelle kaupungille

Pelilauta on maailmankartta (12000 × 5399, Miller, `minCityDistance` = **60**). `js/packs/europe.js`:n x/y on
vanhan 1000 × 1000 -laudan koordinaatti; maailmankartan generaattori johtaa siitä käänteiskaavalla todellisen
lat/lonin. Kaava: `x = (lon + 11) × 19,2`, `y = (72 − lat) × 26,3`.

| Kaupunki | lat / lon | europe.js x/y | maailmankartta x/y | Lähin naapuri maailmankartalla | Mahtuuko (≥ 60)? |
| --- | --- | --- | --- | --- | --- |
| **Bryssel** | 50,8503 / 4,3517 | **295, 556** | **5978,4 / 1353,0** | Amsterdam **70,2**; Pariisi 110,1; Lontoo 151,7 | **KYLLÄ** |
| **Bratislava** | 48,1486 / 17,1077 | 540, 627 | 6403,6 / 1469,9 | **Wien 23,8**; Budapest 101,9; Praha 122,9 | **EI** |
| **Ljubljana** | 46,0569 / 14,5058 | 490, 682 | 6316,9 / 1558,0 | Venetsia **72,9**; Wien 110,0; Sarajevo 131,2 | **KYLLÄ** |

**Bratislava on ainoa oikea ongelma.** Se on Wienistä vain 23,8 lautayksikköä eli reilusti alle 60:n, ja
Wien–Budapest-väli on 101,9 — Bratislavan on pakko siirtyä sivuun niiden yhdysviivalta, kuten Firenze ja
Sevilla aikoinaan. Lähin sallittu piste pitää hakea koneellisesti (sama menettely kuin Sevillan
kommentissa `europe.js`:ssä: `isOnLand` + kaikki kaupunkivälit läpi), ja siirto perustellaan koodikommentissa.
Karkeasti: 60 yksikköä Wienistä on maailmankartalla noin 1,8 pituusastetta eli ~135 km — Bratislava joutuisi
Tonavaa alas Győrin suuntaan tai pohjoiseen Malé Karpatyn taakse. **Tämä on omistajan päätöstä vaativa asia,
ei koodikysymys:** joko Bratislava siirtyy ~130 km tai Slovakian pelikaupungiksi otetaan jokin muu
(esim. Košice 48,72 / 21,26, joka on kaukana kaikista nykyisistä pisteistä).

Huomio Brysselistä: vanhan 1000 × 1000 -laudan mitassa Bryssel on Amsterdamista vain 41 yksikköä. **Sillä ei ole
enää merkitystä** — Euroopan erillislauta poistettiin (Raamattu 30.8.2026), `europe.js` ei ole `PACKS`-rekisterissä
eikä `tests/rules.test.mjs` aja sille `minCityDistance`-porttia. Pelilaudalla (maailmankartta) väli on 70,2.

---

## 2. Tiedostotaulukko: mitä uusi pelikaupunki vaatii

**P = pakollinen (testi kaatuu ilman), V = valinnainen (kaupunki toimii ilman).**
Tekijä: **O** = Opus (koodi/rekisteröinti), **S** = Sonnet (mekaaninen sisältö, lisenssit, tarkistukset),
**F** = Fable (tarinateksti, kaanon, luennat).

### MINIMI — kaupunki on pelattava

| # | Tiedosto | Mitä lisätään | P/V | Kuka | Työmäärä |
| --: | --- | --- | :-: | :-: | --- |
| 1 | `js/packs/europe.js` | `EU_CITIES`-rivi (id, name, wiki, ambience, x, y, la/lx/ly) + perustelukommentti | **P** | O | 20 min (Bratislavalla + koneellinen paikkahaku, 1–2 h) |
| 2 | `js/packs/europe.js` | `EU_EDGES`: uusi kaupunki ketjutetaan naapureiden väliin (vanha suora pois) | **P** | O | 15 min |
| 3 | `js/packs/europe.js` | `tokens.counts`: laattoja yhtä monta kuin kaupunkeja (45 → 46) | **P** | O | 5 min |
| 4 | `js/packs/europe-countries.js` | `bryssel: 'BEL'` | **P** | O | 2 min |
| 5 | `js/packs/maailmankartta.js` | **KÄSIN-INTEGROINTI**: kaupunkirivi, reitit, `CITY_COUNTRY`, `counts` (261 → 262) | **P** | O | 30 min |
| 6 | `js/packs/europe-questions.js` | `EUROPE_QUESTIONS.<id>`: vähintään **2** kysymystä (valmiiksi merkityllä laudalla 5) | **P** | F/S | 1–2 h |
| 7 | `js/packs/europe-questions.js` | `EUROPE_FACTS.<id>`: vähintään **2** tiesitkö-tietoa, kumpikin > 20 merkkiä | **P** | F/S | 30 min |
| 8 | `js/packs/europe-valokuvat.js` | kuratoitu valokuva (Commons, lisenssi todennettu) | **P** | S | 1 h |
| 9 | `js/packs/europe-artikkelit.js` | oma Lue lisää -artikkeli, avain = `city.wiki` | **P** | S | 1 h |
| 10 | `js/sisaltotaulut.js` -ketju | saapumisteksti (Euroopan osalta `js/packs/saapumispuheet.js` / fokusvirran matkakirja) | **P** | F | 1 h |
| 11 | `js/packs/fokusvirta-<id>.js` + `js/packs/fokusvirrat.js` | fokusvirtapakki ja sen rekisterirvi | **P** | F/S | 4–8 h (kevyt pakki 2 h) |
| 12 | `sw.js` SHELL + `tools/build-standalone.mjs` MODULES | uusi fokusvirtatiedosto molempiin listoihin | **P** | O | 10 min |
| 13 | `js/packs/radiot.js` | maan radiolähetys (uusi maa) | **P** | S | 30 min |
| 14 | `js/packs/paikallisaarteet.js` | maan oma aarrepari (uusi maa) | **P** | F | 30 min |
| 15 | `js/kaupunkimusiikki.js` `ALUEEN_MAAT` | maan aluerivi (uusi maa) | **P** | O | 10 min |
| 16 | `tests/pallonimet.test.mjs` | kovakoodattu kaupunkiluku 261 → 262 | **P** | O | 2 min |
| 17 | `tests/nostot-kartalla.test.mjs` | "kaupungin kohdalla" -katto, jos uusi kaupunki nostaa sitä (ks. luku 4) | **P*** | O | 15 min tai kohdekartta |

\* vain jos maassa on jo nostoja kaupungin lähellä — Brysselillä on (`hahmotelma-tervuren`).

**Minimin yhteistyömäärä: ~2 h Opuksen koodia + ~8–14 h sisältöä (Fable/Sonnet).**
Kolmelle kaupungille: **~6 h koodia + ~25–40 h sisältöä**, plus Bratislavan paikkapäätös.

### TÄYSI — kaupunki kuten Firenze/Tampere

Nämä EIVÄT kaada testejä, mutta ilman niitä kaupunki on selvästi köyhempi kuin naapurinsa.

| # | Tiedosto | Mitä lisätään | P/V | Kuka | Työmäärä |
| --: | --- | --- | :-: | :-: | --- |
| 18 | `js/packs/kulttuuri-kategoriat.js` | kaupunkilehden kategoriat, kansikuvat, Matkailijalle-opas | V | S | 8–16 h |
| 19 | `js/packs/nahtavyysjutut.js` | 6 nähtävyysjuttua | V | S | 4–6 h |
| 20 | `js/packs/maakartat.js` + `assets/kartat/<id>-*.png` | kohdekartta (paperi + väri), `tools/piirra-kaupunkikartta.mjs` | V | O+S | 3 h |
| 21 | `js/packs/saatiedot.js` | ERA5-säänormaalit 1991–2020 | V | S | 30 min |
| 22 | `js/packs/europe-kulttuuri.js` | kulttuurivisa | V | F | 1 h |
| 23 | `js/packs/kohtaamiset.js` + `assets/kohtaamiset/` | kohtaaminen + kuva | V | F+S | 3 h |
| 24 | `js/packs/miniatyyrit.js` + `tools/generoi-miniatyyrit.mjs` | kohdekartan miniatyyripiirrokset | V | O | 2 h (vaatii kuva-API-avaimen) |
| 25 | `js/packs/julisteet.js`, `js/packs/iskulauseet.js` | juliste ja iskulause | V | S | 1 h |
| 26 | `js/packs/pollo-kysymykset.js` | pöllön valmiskysymykset | V | S | 1 h |
| 27 | `js/packs/syvennyspaikat.js` | syvennyspaikat | V | S | 1 h |
| 28 | `js/packs/uutislahteet.js` | maan uutislähteet | V | S | 30 min |
| 29 | `js/packs/maailmankartta-pallopisteet.js` | **EI TARVITA**, jos kaupunki on todellisella paikallaan | — | — | — |
| 30 | `assets/audio/puhe-fokus-matkakirja-<id>.mp3` | matkakirjan luenta (ElevenLabs, omistajan avain) | V | F | 1 h |
| 31 | `js/packs/fokuskohteet-<iso>.js` | maan fokuskohteet, jos maata ei vielä ole | V | S | 4–8 h |
| 32 | Kohtaamis- ja pulusisältö (`js/liviapuhe.js`, `js/livia-pilotti-cuet.js`) | pulun repliikit, Livian cuet | V | F | 2–4 h |

**Täyden kaupungin kokonaistyömäärä Firenzen mitassa: ~1 045 lisättyä riviä koodia/dataa + 35 todennettua kuvaa
+ 2 karttakuvaa.** Firenze vei yhden Fable-session kokonaisen päivän.

### Kohta 29 tarkennus — pallopiste

`js/packs/maailmankartta-pallopisteet.js` on korjaustaulu kaupungeille, joiden käsin sommiteltu lautapiste
poikkeaa todellisesta koordinaatista. **Uudelle kaupungille sitä ei tarvita, jos piste lasketaan kaavalla
todellisesta lat/lonista** — käänteiskaava palauttaa täsmälleen saman koordinaatin. Bryssel ja Ljubljana ovat
tässä tapauksessa. Bratislava sen sijaan JOUTUU siirtymään, joten **Bratislava tarvitsee pallopisterivin**
(48,1486 / 17,1077) — muuten pallolla kaupunki seisoo väärässä paikassa.

---

## 3. Mitä tälle haaralle on tehty (Brysselin minimiluonnos)

Muutetut tiedostot:

- `js/packs/europe.js` — Brysselin `EU_CITIES`-rivi `(295, 556)` mitattuine perusteluineen;
  `pariisi–amsterdam (3)` korvattu ketjulla `pariisi–bryssel (2)` + `bryssel–amsterdam (2)`
  (sama ratkaisu kuin Firenzellä Venetsia–Roomassa); `counts.pieniAarre` 29 → 30 ja kommentti 45 → 46.
- `js/packs/europe-countries.js` — `bryssel: 'BEL'`.
- `js/packs/maailmankartta.js` — käsin-integrointi: kaupunkirivi `(5978,4, 1353,0)`, kaksi reittiä vanhan
  tilalle, `CITY_COUNTRY`-merkintä `"bryssel":"BEL"`, `counts.pieniAarre` 165 → 166.
  (Generaattoria EI ajettu: `tools/tee-maailmankartta.mjs` vaatii `ne_10m_land.geojson`, jota repossa ei ole —
  repossa on vain `ne50.geojson`. Firenzekin integroitiin käsin, ks. `8a56f189`.)

**Mitatut hyvät uutiset:**
- Brysselin piste läpäisee `minCityDistance`-portin (70,2 ≥ 60) ilman siirtoa.
- Nimikyltti `la: 'end', lx: -20, ly: 5` läpäisee sekä nimipäällekkäisyys- että nimiölimitystestit.
- Reittiverkko pysyy yhtenäisenä ja lauta rakentuu.

---

## 4. MITÄ PUUTTUU — koeajon 11 punaista testiä

`node --test tests/*.test.mjs` tällä haaralla: **# pass 3683 / # fail 11**. Kaikki 11 ovat puuttuvaa
sisältöä tai kovakoodattua lukua; yksikään ei ole rakennevika. Sisältöä EI keksitty (kustannuskuri kohta 1 ja
roolitus: Opus ei kirjoita tarinatekstiä), joten haara jää tarkoituksella punaiseksi.

| # | Testi | Virhe | Mitä tarvitaan | Kuka |
| --: | --- | --- | --- | :-: |
| 1 | `rules.test.mjs:184` | `kaupungilta bryssel puuttuu kysymyksiä (0/2)` | ≥ 2 tietovisakysymystä `europe-questions.js`:ään | F/S |
| 2 | `rules.test.mjs:255` | `bryssel: liian vähän tietoja` | ≥ 2 tiesitkö-tietoa `EUROPE_FACTS`:iin | F/S |
| 3 | `rules.test.mjs:4874` | `+ 'bryssel'` (kuratoitu valokuva) | rivi `europe-valokuvat.js`:ään, lisenssi todennettu | S |
| 4 | `fokusvirta.test.mjs:1339` | `+ 'bryssel'` | `fokusvirta-bryssel.js` + rivi `fokusvirrat.js`:ään | F/S |
| 5 | `vanha-maailma.test.mjs:256` | `+ 'bryssel'` (saapumisteksti) | saapumismerkintä | F |
| 6 | `vanha-maailma.test.mjs:364` | `+ 'bryssel'` (oma artikkeli) | artikkeli `europe-artikkelit.js`:ään, avain `Bryssel` | S |
| 7 | `vanha-maailma.test.mjs:348` | `+ 'BEL'` (radiolähetys) | rivi `js/packs/radiot.js`:ään | S |
| 8 | `paikallisaarteet.test.mjs:154` | `+ 'BEL'` | Belgian aarrepari `paikallisaarteet.js`:ään | F |
| 9 | `musiikkivalitsin.test.mjs:244` | `BEL: maalla ei ole aluetta` | rivi `js/kaupunkimusiikki.js` `ALUEEN_MAAT`-tauluun | O |
| 10 | `pallonimet.test.mjs:224` | `262 !== 261` | kovakoodattu kaupunkiluku testissä 261 → 262 | O |
| 11 | `nostot-kartalla.test.mjs:97` | `muita kuin hetkiä on kaupungin kohdalla 49 — luku saa vain laskea` | ks. alla | O + omistaja |

### Kohta 11 tarkemmin — tämä on ainoa yllätys

Uusi pelikaupunki vetää maan olemassa olevia karttanostoja "kaupungin kohdalle". Mitattuna
(`tools/tarkista-nostopaikat.mjs`) Brysselin tapauksessa tämä on **tasan yksi nosto:
`hahmotelma-tervuren`** (Tervurenin museo, ~13 km Brysselistä itään), jonka syy on
`kohdekarttaa ei ole`. Se on testin sallittujen syiden listalla, mutta kokonaisluku nousee 48 → 49, ja testi
on räikkä: luku saa vain laskea.

Kolme vaihtoehtoa, päätös Fablelle/omistajalle:
1. **Bryssel saa kohdekartan** (`js/packs/maakartat.js` + kaksi PNG:tä) ja Tervuren siirtyy sinne —
   sääntöjen mukainen ratkaisu, mutta tekee minimistä täyden.
2. **Tervuren pudotetaan tai siirretään** Belgian nostolistalta (`docs/raportit/viesti-fable-nostot-bel-lista-20260919.md`
   kohta 22) — halvin, mutta poistaa yhden hyväksytyn noston.
3. **Räikkä nostetaan 48 → 49** kirjatulla perustelulla, kuten 50 → 52 tehtiin 3.9.2026.

**Sama tarkistus on ajettava Bratislavalle ja Ljubljanalle ennen kuin niiden nostot hyväksytään** — jos maan
nostolistalla on kohde alle `KAUPUNGIN_KOHDALLA_SADE`:n päässä pelikaupungista, sama räikkä laukeaa.

---

## 5. Suositeltu järjestys

1. **Omistajan päätös Bratislavasta** (siirto ~130 km vai toinen kaupunki). Tämä lukitsee koko erän.
2. **Opus-erä (koodi, ~6 h):** kolme `europe.js`-riviä + reitit + laattaluvut, `europe-countries.js`,
   `maailmankartta.js`-käsin-integroinnit, `kaupunkimusiikki.js`, `pallonimet.test.mjs`:n luku,
   Bratislavan pallopiste, `sw.js`/`build-standalone.mjs`-rivit fokusvirroille.
3. **Nostoräikän ratkaisu** kaikille kolmelle maalle (mitattuna, ei arvaten).
4. **Sisältöerä maittain (Sonnet + Fable):** kysymykset, tiedot, valokuva, artikkeli, radio, aarrepari,
   saapuminen, fokusvirta. Yksi maa kerrallaan pilottina (kustannuskuri kohta 2) — ehdotus: **Bryssel ensin**,
   koska sen piste on jo mitattu eikä vaadi siirtoa.
5. Vasta tämän jälkeen täysi kaupunkilehti (kohdat 18–32).

---

## 6. Avoimet asiat Fablelle

- **Bratislavan paikka** — ei mahdu todelliselle paikalleen (23,8 < 60 Wienistä). Vaatii omistajan päätöksen.
- **Tervurenin nosto** — nostoräikkä 48 → 49. Kolme vaihtoehtoa yllä.
- Haara on **punainen tarkoituksella** (11 fail): puuttuva sisältö on sisältötyötä, ei koodia.
  Jos haluat vihreän minimin ilman sisältöä, se ei ole mahdollinen — portit vaativat kysymykset,
  tiedot, kuvan, artikkelin, saapumisen ja fokusvirran.
