# Karttaseppä: luovutus 2.11.2026 klo 13.45 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261102-1246.md (käsitelty, lisäys 12.50). Syy: kontekstivahti 25 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, T = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kohdetunnisteet-20261102/`.

## TEHTY
1. haamu2 mediassa 54/54 (JU 12.47, KS tarkisti SHA:t); postilaatikko-veneet-worktree poistettu (PT).
2. **haamu3-20261102** (PT kuittasi 13.3x → JU vie, NUI vaihtaa version): 3 jäännöshaamua (#7, #11, #12) vaihdettu naapuripalan
   puhtaaseen piirrokseen. `C/haamu-20261102/jaannos/` (paikka.py, aja-paikka.sh, putki-71h.sh, pari-jaannos-kaikki.jpg) →
   `_valmiit/pariisi-tasot-haamu3-20261102-vienti-20261102` (6/54 laattaa). MUISTIO 13.19.
3. **Tunnisteet (PT:n erä, työlista "Kohteiden sijainnit tarkistettaviksi koneellisesti")**: PT:lle lähetetty suunnitelma 13.3x
   (3 riviä). Uusi työkalu `tools/sisalto/kohdetunnisteet.mjs` (tämä haara): wikittömille kohteille Wikidatan geohaku 250 m
   + nimet/aliakset 32 kielellä + nimivertailu (paikan nimi kohteen nimessä = 0,9, "Millennium Bridgen portaat" → Q44057),
   tasapisteissä sivustolinkit; varmat → `data/kohdetunnisteet.json` (tapa "nimi+säde"), muut + KAUKANA-osumat (sama nimi
   > 250 m, < 30 km: mahdollinen väärä sijainti) → `T/ehdokkaat.json`. Lontoo-koe: 6/18 varmaa, kaikki oikein.
   Vain /w/api.php (robots.txt: Overpass /api/ ja SPARQL kielletty roboteille; Overpass oli myös ruuhkassa).
   **Koko ajo käynnistetty 13.3x taustalle** (`--kaikki`, loki `T/ajo.log`, kaupunki kerrallaan, hidas ~minuutteja/kaupunki).

## AVOIN (järjestyksessä)
0. **ETUSIJA (PT 13.4x, tehdään ENNEN tunnistetyötä, tässä järjestyksessä):**
   a. **Siltaleikkeet (omistajan pyyntö 13.19, NUI pyytää):** Pariisin kanaalin/Seinen veneiden reitin sillat (~15) leikkeinä veneiden
      päälle samalla leikekerroksella kuin kioski (`_valmiit/pariisi-info-kioski-20261102/`, aukio-työ `C/info-kioski-20261102/`).
      NUI:n määrittely (13.4x): jokainen silta, jonka alta seine-reitti.json:n reitti (Cité-saaren eteläinen haara) kulkee; leike = kansi
      + kaiteet + kaaret haamu3-laattojen piirroksesta, RGBA, muu läpinäkyvä, lähitason 1 m/px (tai 2× kuten info/kioski). Paketti
      `_valmiit/pariisi-sillat-<pvm>/leikkeet-sillat-<pvm>/leike-silta-<tunnus>.png` + SHA256SUMS + nui-rivit.txt:
      `("silta-<tunnus>", pohjoinen, etelä, länsi, itä, null)` kuten Leikkeet-taulukossa. Valmis → pari PT:lle + rivi NUI:lle (id
      local_43962c89-fc14-4098-9dd7-6153133ffcea); JU vie PT:n kuittauksen jälkeen.
   b. **Hehkut ja maailmanperintö (omistajan pyyntö 13.21, juna 218):** kuva `docs/raportit/kaappaukset/omistaja-20261102/1321-eurooppa-hehkut-maailmanperinto.png`.
      (1) Kaukozoomissa ei kirkkaita ympyröitä käytyjen/nykyisen kaupungin kohdalla (kuvassa Helsinki, Pariisi). (2) Suurennuslasin
      maailmanperintökytkin päällä → kaikki Euroopan maailmanperintökohteet kipinöinä korostusvärillä, myös valmiit nostot; pois →
      ei korostusta (Ranskan noston kellertävä hehku nyt aina päällä = vika). Kipinät = KS:n työ (a884e7824); ympyrät/nostojen
      hehku mahdollisesti NUI:n koodia → sovi NUI:n kanssa. Pari PT:lle: kytkin päällä / pois + kaukozoom.
1. **Ajo (tunnisteet, vasta kohdan 0 jälkeen; PT kuittasi suunnitelman, Overpass hitaasti ehtojen mukaan):** jos `T/ajo.log` ei kasva (prosessi kuoli nollauksessa), jatka: worktree `/Users/Shared/Claude/wt/karttaseppa-kohdetunnisteet`,
   `node tools/sisalto/kohdetunnisteet.mjs --kaikki --ehdokkaat T/ehdokkaat.json >> T/ajo.log` (taustalle; jatkaa siitä, mihin jäi).
2. **Ajon jälkeen** lisää käsin lukitut 31.10.:n neljä (ajo ylikirjoittaa tiedoston, siksi vasta lopuksi) data/kohdetunnisteet.json:iin:
   `"nouakchott:Nouakchottin yliopisto": {"qid":"Q3119358","tapa":"käsin","huom":"wiki-uudelleenohjaus antoi väärän Q:n"}`,
   `"freetown:Fourah Bay College": {"osm":"way/28548338","tapa":"käsin","huom":"Wikidatan piste = vanha rakennus Cline Townissa"}`,
   `"bamako:Koulouban palatsi": {"osm":"node/8065650962","tapa":"käsin","huom":"Wikidatan piste Koulouban kylässä"}`,
   `"maseru:Basotho Hat Shop": {"osm":"node/5081504528","tapa":"käsin","huom":"Wikidatan piste 0,8 km itään"}` (pvm 2.11.2026).
   Tarkista nimet täsmälleen KAUPUNKIKARTAT-avaimista (id = "kaupunki:nimi").
3. **kohdesijainnit.mjs** käyttämään tunnisteita: lukittu qid ennen wiki-hakua; osm → OSM API `api/0.6/<tyyppi>/<id>.json`
   (way: `/full`, keskipiste) — ei Overpassia; automaattinen qid wikittömille → ero-vertailu. Sitten ero-lista.
4. **Ehdokkaat käsin:** KAUKANA-osumat ensin (mahdolliset väärät sijainnit) → lista PT:lle; sitten ehdokkaat, joissa yksi selvä paikka
   (esim. Abbey Roadin suojatie → Q26675180 Abbey Road -suojatie 8 m, ei albumi Q209651). Tulos `docs/raportit/kohdetunnisteet-20261102.md`
   (määrät: varma/käsin/ehdokas/ei osumaa, KAUKANA-lista), PR (tämä haara, data/kohdetunnisteet.json mukaan vasta valmiina).
5. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; I monistus vasta kun Pariisi valmis; 7.48: muita Pariisin osia ei aloiteta
   ennen KK:n suunnitelmaa ja PT:n viestiä.
