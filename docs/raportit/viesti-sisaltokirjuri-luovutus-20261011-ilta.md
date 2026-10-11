# Sisältökirjurin luovutus 11.10.2026 ilta (uudelleenkäynnistys, PT:n käsky)

Rooli: Sisältökirjuri (Sonnet 5.5, high), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri, haara sisalto-pelikatalogi-20260927 (erkaantunut mainista: ÄLÄ ajele `git pull --rebase origin main` tässä haarassa; uudet työt omissa worktreissä `tools/uusi-worktree.sh sisaltokirjuri <aihe>`, poisto `--poista`). Säännöt: agentit vain Opus/Sonnet; ei `sh -c`/`bash -c`/`eval` (aja pitkät komennot suoraan run_in_backgroundilla tai skriptitiedostona); PT:lle vain valmis erä/jumi/kysymys ≤ 8 riviä; robots.txt ensin uusille verkkotunnuksille; 70 v -rivi Codex-tilauksiin. Edellinen luovutus: `viesti-sisaltokirjuri-luovutus-20261011-iltapaiva.md`.

## 1. Valmista (11.10. iltapäivä–ilta)

- **Aarremerkinnät uudella mallilla** (50 Euroopan kaupunkia): PR #4410 MERGED, paketti live (v677).
- **ISS-raketin faktat** (9 kpl, ≤110 merkkiä, lähteet) toimitettu Linssiseppä 2:lle.
- **Olavinlinnan sisätilojen totuusraportti** `docs/raportit/olavinlinna-sisatilat-totuus-20261011.md` (#4417 MERGED). Korjaukset LR:lle junaan 183 (PT kokoaa).
- **Pariisin 4 aukion tekstit** (Vendôme, Bastille, République, Saint-Michel) JSONina Pelikoodarille: `/Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/pariisi-aukiot-20261011/pariisi-aukiot-tekstit.json`.
- **Suojatarkastus Euroopan 50 kaupunkia** (lehti + opas): raportti `docs/raportit/suojatarkastus-euroopan-kaupungit-20261011.md` (#4420 MERGED); korjaukset #4421, #4422, #4424–#4427 MERGED. Kohteet ilman vapaata kuvaa poistettu oppaasta kokonaan (PT).
- **Suojatarkastus Euroopan muut pakot** (kulttuuri-/maa-kategoriat, europe-valokuvat, fokuskohteet, fokusvirrat, maakartat): #4432–#4437 MERGED.
- **Schrödinger-kuva** → Nobel-kuva (PD): **#4438 AVOIN** (Julkaisija mergeää).
- Worktreet siivottu; jäljellä omat: sisaltokirjuri-suojatarkastus (merged, voi poistaa), suoja-m1..m6 ja suoja-g1..g6, suoja-schrodinger, tekoaly-alaikaiset (PR #4326 pidossa), paakaupunkipisteet-syc-tuv. Poista mergatut `--poista`-lipulla + `git branch -D`.

## 2. KESKEN: maailman muut pakot (Euroopan ulkopuolinen sisältö), PT 11.10.: "KYLLÄ samoilla säännöillä, vain korjaus olemassa olevaan, Codexin pääkaupunkikuvat pois"

14 Sonnet-agenttia on tarkastanut ~4 500 esisuodatettua Commons-kuvaa (13 032 uniikkia kuvaa kaikkiaan; esisuodatus Commons-luokilla/nimellä/selitteellä). Tulokset (263 POISTA, 63 VAIHDA, 249 SÄILYTÄ-poikkeusta FoP:n nojalla):

`/Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/suoja-tyokalut-20261011/suoja/maailma-toimet-<ryhmä>.json` (ryhmät africa1, africa2, asia1, asia2, asia3, muu1, muu2, muu3, muu4, northamerica1, northamerica2, oceania, southamerica1, southamerica2). Kopio myös scratchpadissa (`.../scratchpad/suoja/`, voi kadota). Työkalut samassa kansiossa (`sovella-maailma.mjs`, `maailma-*.mjs`, `suoja-maailma-ohje.md`).

**Seuraavaksi (ei vielä tehty):** sovella tulokset data-PR:inä mannerryhmittäin:
1. Afrikka: africa1,africa2 · Aasia: asia1,asia2,asia3 · Pohjois-Amerikka: northamerica1,northamerica2 · Etelä-Amerikka: southamerica1,southamerica2 · Oseania+muu: oceania,muu1,muu2,muu3,muu4.
2. Per PR: `tools/uusi-worktree.sh sisaltokirjuri suoja-w-<manner>`; `node <työkalukansio>/sovella-maailma.mjs <worktree> africa1,africa2` (muokkaa js/packs/*.js, nähtävyysjutut ja data/oppaan-kuvat/kaupungit/*.json; kirjoittaa login `suoja/sovellus-maailma-*.log`, ks. rivit `EI LÖYTYNYT`, `INLINE POISTA käsin`, `ENNENNYT-PARI`, `OPAS-KOHDE POISTETTU`); `node tools/oppaan-kuvat.mjs kokoa`; `node tools/oppaan-kuvat.mjs tarkista <kaupunki>` muutetuille kaupungeille (huom. lisenssi "CC0" eikä "CC0 1.0"; lahdeUrl = tools/oppaan-kuvat.mjs sivuUrl-muoto); `npm test` (~9 min). Tyypilliset testiongelmat: kohteen/noston pääkuva vaaditaan (fokuskohteet, galleria → nosta galleriakuva pääkuvaksi tai korvaa vapaalla kuvalla); ennenNyt-pari (poista koko ennenNyt tai vaihda); jutun kuvat ⊆ noston kuvajoukko (päivitä fokusvirta-<kaupunki>.js samoin).
3. Kuvaton nosto saa jäädä tekstinä (kentät tiedosto/lyhyt/selite/lahde pois). Kohteet, joilta oppaan kaikki kuvat poistuvat, poistetaan oppaasta kokonaan (PT 11.10.). Codexilta ei havainnekuvia suojatuista teoksista.
4. Uudet Commons-tiedostot peilataan (Julkaisija: peilaa.yml hoitaa js/packs-muutokset; oppaan-kuvat/ vaatii tools/peilaa-media.mjs tarvittaessa). Ilmoita Julkaisijalle PR-numerot ja että mergeä yksi kerrallaan (konfliktissa rebase + `kokoa`).

**Agenttien huomioita (PT:lle päätettäväksi tai tarkistettavaksi):** Iranin ja Myanmarin kuvat poistettu varovaisuudesta (ei Bernin sopimuksen jäseniä, suoja Suomessa epäselvä); Managuan vanha katedraali ja kansallispalatsi jäivät (arkkitehti Dambachin kuolinvuosi tuntematon, Nicaraguassa ei FoP:ia); Saudi-Arabian uusi FoP-laki (M/169, 27.1.2026) tulkinta vakiintumaton; Sam Houston -patsas (Cerracchio k. 1956, suoja päättyy 31.12.2026) voi palata 1.1.2027; Ljubljanan Plečnik-kuvat voi palauttaa 1.1.2028; Dubain kuusi moskeijakuvaa ja Ammanin Husseinin moskeija säilytetty epäselvinä; Doha-kuva 146 esittää vanhaa taloa vaikka selite sanoo kansallismuseo; Abu Dhabin Qasr Al Watan -selitteet 242/246 eivät vastaa kuvia; historian-hetket (`hetki-*-photo-v*`) ja julisteet (`tuotanto/tuot-*.png`) ovat pelin omia kuvia (ei Commonsia), eivät tarkastuksessa; 289 Commons-tiedostoa on kadonnut tai uudelleennimetty (`puuttuu: true` maailma-meta.json:ssa; lista `suoja/commons-meta.json`/`maailma-kuvat.json`), mahdollinen rikkinäisten kuvien korjaus; Schrödingerin Nobel-kuva on 280×396 px (PT hyväksyi alle 1200 px).

## 3. Muut avoimet

1. **Codex-tilaukset (cron bd6a8cb2 oli session-only: LUO UUDELLEEN `17 * * * *`):** `git fetch origin claude/postilaatikko` + `git log --format='%h %ad %s' origin/claude/postilaatikko -8`. Omat tilaukset: 5374cfed8 (ISL/TUN/LKA, 6 pääkaupunkikuvaa) ja 1c6436b76 (12 paikallisaarrekuvaa BEL/SVK/SVN/LUX/MLT/CYP; kun kuvat tulevat: silmäys, 640×640 JPEG q82 → `assets/aarteet/paikallis/<iso3>-(pieni|iso).jpg`, kuva-kentät js/packs/paikallisaarteet.js, KUVAA_ODOTTAVAT pois tests/paikallisaarteet.test.mjs, testit, PR Julkaisijalle). Muun roolin tilaus 77b04d95a (pääkaupungit e04–e14): kun posti/codex-fable-paakaupungit.md:hen tulee valmis erä, tee pistokoe PILVIOHJEEN luvun 13 säännöillä (ohje `paakaupungit-pilvi/CODEX.md`, haara paakaupungit-codex-pohja) → rivi PT:lle; korjauspyynnöt Codexille PT:n kautta.
2. PR #4326 (tekoaly-alaikaiset) pidossa; Raamatun siivous vaihe 2 odottaa omistajaa; museotekstit odottavat omistajan lukua.
3. tyojonot.md:n Sisältökirjuri-osio vanhentunut.
