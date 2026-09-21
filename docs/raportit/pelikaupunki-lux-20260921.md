# Luxemburgin pelikaupunki (21.9.2026)

Sonnet-sisältösessio, haara `sisalto-pelikaupunki-lux` (pohja `origin/main`,
de6205b2). Tilaus: Fable hyväksyi 21.9.2026, että kolme maata ilman
pelikaupunkia — Kypros, Luxemburg, Malta — saavat pelikaupungin. Tämä
raportti kattaa Luxemburgin osuuden (Luxemburgin kaupunki).

Luxemburgilla ei ollut ennestään mitään kaupunkimerkkiä pelilaudalla —
tämä on aito uusi kaupunki, toisin kuin Kypros/Nikosia (joka on jo
kartalla). Maan rajaviiva (`js/packs/maailmankartta.js` COUNTRY_SHAPES.LUX)
oli jo olemassa eikä siihen koskettu.

## 1. Mitatut koordinaatit ja etäisyydet

- Todellinen paikka: 49,6117° N, 6,1296° E (Luxemburgin kaupunki).
- Ajettu itse: `node -e "import('./tools/vanha-maailma.mjs').then(({sovitaMaailma}) => console.log(sovitaMaailma({leveys:12000, lon0:-175, etela:-58, pohjoinen:76}).muunna([6.1296, 49.6117])))"`
  → `[6037.7, 1407.0]`. Sama tulos kuin tilauksessa annettu.
- europe.js-kaavalla (x=(lon+11)×19,2, y=(72−lat)×26,3): x=328,9, y=588,8
  → pyöristetty (329, 589).
- Lähin naapuri maailmankartalla: **Bryssel, 80,2 yksikköä** (mitattu
  `MAAILMANKARTTA.cities`-listasta, ei arvattu). Seuraavaksi lähin Alpit
  92,5, Amsterdam 128,8, Pariisi 130,9. `minCityDistance` on 60, joten
  piste kelpaa sellaisenaan — ei tarvinnut siirtää.
- Reitti: mitattu `segDist`-funktiolla jokaiselle land-tyypin edgelle.
  Lähin oli **pariisi–alpit (68,3 yksikköä)**, lähempänä kuin
  pariisi–bryssel (79,9) tai bryssel–amsterdam (80,2). Katkaistiin kahdeksi:
  pariisi–luxemburg (2) + luxemburg–alpit (2), sama periaate kuin Bryssel/
  Ljubljana/Košice.

## 2. Mitä lisättiin (reseptin 17 kohtaa)

| # | Tiedosto | Mitä |
| --: | --- | --- |
| 1–3 | `js/packs/europe.js` | EU_CITIES-rivi, EU_EDGES-katkaisu, counts.pieniAarre 32→33 |
| 4 | `js/packs/europe-countries.js` | `luxemburg: 'LUX'` |
| 5 | `js/packs/maailmankartta.js` | kaupunkirivi (6037.7, 1407.0), kaksi reittiä vanhan (pariisi–alpit) tilalle, CITY_COUNTRY, counts.pieniAarre 168→169 |
| 6–7 | `js/packs/europe-questions.js` | 3 kysymystä + 3 tiesitkö-tietoa `luxemburg`-avaimella |
| 8 | `js/packs/europe-valokuvat.js` | kuratoitu kuva (Bock-kallio, P. Hughes CC BY-SA 4.0) + lisäkuva (Adolphe-silta, Cayambe CC BY-SA 3.0) |
| 9 | `js/packs/europe-artikkelit.js` | oma artikkeli avaimella `'Luxemburg (kaupunki)'` (maan wiki-avain on jo `Luxemburg`) |
| 10–11 | `js/packs/fokusvirta-luxemburg.js` + `fokusvirrat.js` | kevyt fokusvirtapakki (matkakirja + pulun kupla), rekisteröity `KEVYET_FOKUSVIRRAT`-joukkoon |
| 12 | `sw.js`, `tools/build-standalone.mjs` | `fokusvirta-luxemburg.js` molempiin listoihin |
| 13 | `js/packs/radiot.js` | `LUX`: radio 100,7 (ERSL), tarkistettu hakemalla (302 → radiohost.de, audio/mpeg, CORS *) |
| 14 | `js/packs/paikallisaarteet.js` | `LUX`-aarrepari (Moselin riesling, Minette-rautamalmi); lisätty `KUVAA_ODOTTAVAT`-listalle (ei kuvaa vielä, sama kuin BEL/SVN/SVK) |
| 15 | `js/kaupunkimusiikki.js` | `LUX: 'keski-eurooppa'` |
| 16 | `tests/pallonimet.test.mjs` | kaupunkiluku 264 → 265 |
| 17 | nostoräikkä | ks. luku 4 alla — ratkesi kohdekartan myötä |

Lisäksi päivitetty hardcoded-luvut, jotka eivät olleet reseptissä mutta
kaatuivat koeajossa: `tests/liiku-nappi.test.mjs` (KEVYET-lista),
`tests/pollo-valmiskysymykset.test.mjs` (48→49, + `luxemburg.saapuminen`
kaksi kysymystä `js/packs/pollo-kysymykset.js`:ään), `tests/pulu-tunteet.test.mjs`
(48→49, `luxemburg` lisätty `AANETTOMAT`-listalle), `tests/luentakuvakartta.test.mjs`
(`luxemburg` lisätty `ILMAN_LUENTAKUVAA`-listalle), `tests/saapumispuhe-aineisto.test.mjs`
(`luxemburg` lisätty `ILMAN_SAAPUMISOTTOA`-listalle). Kaikki nimettyjä
poikkeuksia, sama malli kuin Bryssel/Ljubljana/Košice — ääntä, Horatio-ottoa
ja luentakuvaa ei voi tuottaa tässä Sonnet-sisältösessiossa.

## 3. Kaupunkilehti (KEVYT kansisivu)

`js/packs/kulttuuri-kategoriat.js` → `KULTTUURI_KATEGORIAT.luxemburg`: vain
aihe `kaupunki` (johdanto, kaksi kansikuvaa, matkailijalle-kappale) — EI
täyttä 6-aiheista lehteä, Fablen tilauksen mukaisesti. Ei minitehtävää
kannella (testattu: "kannella ei ole minitehtävää").

Maa numeroina toimii automaattisesti (`MAA_KATEGORIAT.LUX` oli jo täysi,
ei koskettu; `cityCountry`-linkitys riittää).

## 4. Kohdekartta

`tools/piirra-kaupunkikartta.mjs luxemburg` (paperi) ja `--vari`
(värikartta), OpenStreetMapin Overpass-aineistosta pelin omalla
Chromiumilla. Rajaus (mitattu koeajolla, ei arvattu):

```
rajat:      { pohjoinen: 49.6128, etela: 49.6065, lansi: 6.1245, ita: 6.139 }
piirtoRajat:{ pohjoinen: 49.61469, etela: 49.60461, lansi: 6.12015, ita: 6.14335 }
```

Rajaus kattaa Luxemburgin historiallisen ydinkeskustan: Bock-kallio
koillisessa, Suurherttuallinen palatsi ja Notre-Damen katedraali
keskellä, Guillaume II:n aukio niiden välissä, Adolphe-silta lounaassa
Pétrussen laakson yli. `numeroympyrat: true` (ei miniatyyrejä, kuten
Bryssel/Ljubljana/Košice).

Kartta katsottu silmin (assets/kartat/luxemburg-keskusta.png): Alzette-joen
mutka Bock-kallion ympäri erottuu selvästi, katuverkko lännessä (vanhakaupunki)
ja Pétrussen laakson rakennusrivi etelässä. `node tools/tarkista-karttapisteet.mjs
luxemburg` — **kaikki 6 pistettä maalla**, ei mittakaavajanan päällä, ei
numeroympyröiden päällekkäisyyksiä.

### Kohdekartan kuusi kohdetta

1. **Adolphe-silta** (49,6083 / 6,1270) — kivikaarisilta, valmistui 1903
   (Paul Séjourné ja Albert Rodange), yhdisti vanhankaupungin ja
   asema-alueen Pétrussen laakson yli; ei vielä olemassa isoisän
   matkan aikaan (1873).
2. **Guillaume II:n aukio** (49,6108 / 6,1303) — vanhakaupungin
   pääaukio, "Knuedler"; raatihuone 1829–1838, patsas paljastettu 1844.
3. **Notre-Damen katedraali** (49,6097 / 6,1316) — peruskivi 1613,
   korotettu katedraaliksi 1870 (tuore isoisän matkan aikaan).
4. **Suurherttuallinen palatsi** (49,6109 / 6,1328) — rakennettu 1572
   kaupungintaloksi, 1873 suurherttuakunnan hallintorakennus.
5. **Chemin de la Corniche** (49,6098 / 6,1345) — entisten muurien
   harjalle avattu kävelytie, juuri tasoitettu linnoituksen purun
   myötä (ennen 1873 jyrkät portaat).
6. **Bockin kasematit** (49,6117 / 6,1369) — kreivi Siegfriedin linna
   963, kasemattikäytävät, purku kesken Lontoon sopimuksen 1867
   vaatimuksesta.

Kuvat: kaikki Commonsista, lisenssit tarkistettu imageinfo/extmetadata-
rajapinnasta 21.9.2026 (CC BY 2.0 / CC BY 3.0 / CC BY-SA 3.0 / CC BY-SA 4.0,
tekijät kirjattu kunkin kuvan yhteyteen tiedostoissa).

### Nostoräikkä (reseptin kohta 17)

Ennen kohdekarttaa `hahmotelma-luxembourg`, `hahmotelma-mondorf` ja
`hahmotelma-altmunster` (kaikki `lahi: true`, ks. `js/packs/hahmotelma-lux.js`)
osuivat uuden kaupungin kohdalle syyllä **"kohdekarttaa ei ole"**, koska
`tools/tarkista-nostopaikat.mjs kaupunginKohdallaSyy` tarkistaa
`KAUPUNKIKARTAT[kaupunki]`-taulun olemassaolon ENNEN `lahi`-lippua.
Kohdekartan lisäyksen jälkeen kaikki kolme palasivat luokkaan
**"lähizoomi"** — täsmälleen tilauksen ennustama itsestään-ratkeaminen.
`node --test tests/nostot-kartalla.test.mjs` on vihreä (kesken=52,
muutKuinHetket=50, molemmat ennallaan — ei räikän nostoa).

## 5. PIENOISMALLITILAUS (Codexille, ei tehty tässä erässä)

Kuusi kohdekartan kohdetta, yksivärinen seepiamusteluonnos per kohde,
ei tekstiä kuvassa, tapahtuma/esine/hetki — ei muotokuvaa:

1. **Adolphe-silta** — kivinen kaarisilta korkealla laakson yli,
   yksittäinen suuri kaari sivukuvana.
2. **Guillaume II:n aukio** — ratsastajapatsas raatihuoneen edessä,
   aukiokuvana (ei henkilön kasvoja lähikuvassa).
3. **Notre-Damen katedraali** — kaksi suippotornia ja pääjulkisivu.
4. **Suurherttuallinen palatsi** — renessanssijulkisivu kaiverretuin
   ikkunapielin, katunäkymä.
5. **Chemin de la Corniche** — kävelytie muurinharjalla, näkymä alas
   jokilaaksoon (maisema, ei henkilöitä).
6. **Bockin kasematit** — louhittu kalliokäytävä ja ampuma-aukko,
   sisätila/rakenne esineenä.

## 6. Testitulos

`node --test tests/*.test.mjs`: **# pass 3837 / # fail 0** (3850
testiä, 13 skipattu — ei liity tähän erään). Ennen muutoksia
(origin/main-lähtötaso): 3849 testiä, 0 fail (baseline mitattu samalla
komennolla).

## 7. Avoimet kysymykset / seuraava erä

- **Äänet ja Horatio-otto puuttuvat** (kuten Bryssel/Ljubljana/Košice):
  Livian ääni, matkakirjan ElevenLabs-luenta ja saapumispuheen Horatio-
  otto vaativat oman tuotantoerän, ei Sonnet-sisältösession pääsyssä.
- **Paikallisaarteiden kuvat** (`assets/aarteet/paikallis/lux-*.jpg`)
  puuttuvat — `LUX` lisätty `KUVAA_ODOTTAVAT`-listalle
  (`tests/paikallisaarteet.test.mjs`), sama tilanne kuin FIN/BEL/SVN/SVK.
- **Pienoismallit** — ei tehty tässä erässä (ks. luku 5), Codexin
  tilauslistalla.
- **Täysi kaupunkilehti** (6 aihetta, nähtävyysjutut, kulttuurivisa jne.)
  on oma, myöhempi sisältöerä — tämä erä toimitti vain kevyen kansisivun
  Fablen tilauksen mukaisesti.
