# Viesti Fablelle: Ljubljana pelikaupungiksi, erä 1 (Brysselin minimi)

20.9.2026, Sonnet-sessio "Sonnet 3", haara `sonnet3-ljubljana` (pohja origin/main 2b9b20c3, v1968).
Versiota ei nostettu, PR:ää ei avattu, Raamattuun ei koskettu, ämpäriin ei viety.

**Tulos:** `node --test tests/*.test.mjs` 3723 testiä, 3710 läpi, **0 kaatunutta**, 13 ohitettua.
`tarkista-kaksoisavaimet`: ei kaksoisavaimia. `tarkista-niputus`: kunnossa (426 moduulia). `savuke-reittihelmet`: 18/18.

## Mitä tehtiin (sama minimi kuin Brysselillä)

| Tiedosto | Muutos |
| --- | --- |
| `js/packs/europe.js` | `EU_CITIES`-rivi `ljubljana` (490, 682; todellinen paikka 46,0569 N / 14,5058 E), perustelukommentti; `EU_EDGES`: vanha `wien–venetsia (4)` → `wien–ljubljana (2)` + `ljubljana–venetsia (2)` (matka-aika ennallaan); `pieniAarre` 30 → 31, kommentti 46 → 47 |
| `js/packs/europe-countries.js` | `ljubljana: 'SVN'` |
| `js/packs/maailmankartta.js` | kaupunkirivi (6316,9 / 1558,0; Venetsiaan 72,9 ≥ 60), samat kaksi reittiä, `CITY_COUNTRY`, `pieniAarre` 166 → 167. **Venetsian nimikyltti siirretty vasemmalle** (`la:"end", lx:-20`, ennen `start`/20): oikealla puolella Venetsian nimi peitti Ljubljanan pisteen (`karttanimet`-testi: "nimi Venetsia peittää kaupungin Ljubljana"). Ljubljanan oma nimikyltti `middle`, `ly:-24` |
| `js/packs/europe-questions.js` | `EUROPE_QUESTIONS.ljubljana` (3 kysymystä: pääkaupunki, lohikäärme, ensimmäinen juna Wienistä 1849) + `EUROPE_FACTS.ljubljana` (3 tietoa, yksi isoisän äänellä) |
| `js/packs/europe-artikkelit.js` | `Ljubljana`-artikkeli (intro + teksti + lähde), 1873-katse: Laibach, Krainin herttuakunta, rautatie 1849/1857, linna läänin vankilana 1813–, Tivoli ja Illyria 1809–13, lohikäärme, slovenien ja saksalaisten kilpailu. Maanjäristys 1895, Lohikäärmesilta 1901 ja Plečnik jätetty pois nykyhetken asioina |
| `js/packs/europe-valokuvat.js` | 2 Commons-kuvaa (suoraan Commonsista `tiedosto`-kentällä, ei paikallista kopiota — kuten Bryssel ja tiedoston alkukommentti) |
| `js/packs/fokusvirta-ljubljana.js` (uusi) + `fokusvirrat.js` | kevyt pakki: `matkakirja.paikkarivi` + `teksti` (**LUONNOS, Fable kirjoittaa kaanonin**), `pollo.kommentti` (2 kuplaa ≤125 merkkiä), `pollo.tunne` (utelias 0,5), `pollo.kuva` |
| `sw.js`, `tools/build-standalone.mjs` | `fokusvirta-ljubljana.js` SHELL/MODULES |
| `js/packs/radiot.js` | `SVN`: Radio Prvi (RTV Slovenija), `https://mp3.rtvslo.si/ra1`, tarkistettu hakemalla 20.9.2026: HTTP 200, `audio/aac`, `Access-Control-Allow-Origin: *` (`https://` toimii) |
| `js/packs/paikallisaarteet.js` | `SVN`-pari: pieni "Lipicanhevosen kavioraudan jäljennös" (Lipica, 1580, hevoset Espanjasta), iso "Idrijan elohopeakaivoksen kätkö" (elohopea/sinooperi, UNESCO 2012 Almadénin kanssa); faktat Slovenian nostojen (hahmotelma-svn) en-Wikipedia-tiedoista. Ei kuvaa → `KUVAA_ODOTTAVAT` |
| `js/kaupunkimusiikki.js` | `SVN: 'keski-eurooppa'` (Krainin herttuakunta Itävallassa) |
| `js/packs/pollo-kysymykset.js` | `ljubljana.saapuminen`: "Mikä otus on Ljubljanan vaakunassa ja linnan tornissa?" ja "Millä saksankielisellä nimellä Ljubljanaa kutsuttiin?" (molempiin voi vastata 1873 tiedolla) |

Ei tehty (kuten Brysselillä): täysi kaupunkilehti, kohdekartta, Horatio-saapumisotto ja Livian ääni, luentakuva, paikallisaarrekuvat.

## Kuvat ja lisenssit (luettu Commonsin extmetadatasta 20.9.2026)

| Kuva | Käyttö | Tekijä | Lisenssi | Lähde |
| --- | --- | --- | --- | --- |
| `Franciscan Church of the Annunciation and Ljubljanica River in Ljubljana, 20240502 1809 7777.jpg` | pääkuva + fokusvirran pollo.kuva | Jakub Hałun | CC BY 4.0 | https://commons.wikimedia.org/wiki/File:Franciscan_Church_of_the_Annunciation_and_Ljubljanica_River_in_Ljubljana,_20240502_1809_7777.jpg |
| `Castle hill in Ljubljana, Slovenia.jpg` | lisäkuva | Viktar Palstsiuk | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Castle_hill_in_Ljubljana,_Slovenia.jpg |

Kummassakaan ei ole tunnistettavia ihmisiä lähikuvassa; molemmat katsottu esikatselusta. Prešerenin patsasta ei käytetty (patsas pystytettiin vasta 1905, ei 1873).
Kuvia EI ole kansiossa `/Users/samireivinen/Matkakirja-nostot-kuvat/ljubljana/`, koska europe-valokuvat noutaa ne suoraan Commonsista (omistajan päätös Ateenasta lähtien, tiedoston alkukommentti). Jos haluat ne ämpäriin, kerro, niin lataan ne kansioon.

## Nostot-kartalla-räikkä

Tarkistus (`tools/tarkista-nostopaikat.mjs`): uusi pelikaupunki vetää **tasan yhden** SVN-noston kaupungin kohdalle: `hahmotelma-ljubljansko-barje` (Ljubljanan suo, **3,4 yksikköä** Ljubljanasta, syy "kohdekarttaa ei ole"). Muut Slovenian nostot ovat kaukana (esim. Idrija ~16, Lipica ~27). Räikkä 49 → 50 samalla perustelulla kuin Brysselin Tervurenilla (kaupunkiresepti luku 4 kohta 11, vaihtoehto 3), kommentti `tests/nostot-kartalla.test.mjs`:ssä. Vaihtoehdot: (1) Ljubljanalle kohdekartta, jolloin suo siirtyy sinne, (2) suo pois SVN-listalta, (3) räikkä 50 (nyt).

## Nimetyt poikkeukset testeissä (kuten Bryssel)

- `luentakuvakartta`: `ILMAN_LUENTAKUVAA` + ljubljana
- `saapumispuhe-aineisto`: `ILMAN_SAAPUMISOTTOA` + ljubljana (Horatio-otto)
- `pulu-tunteet`: `AANETTOMAT` + ljubljana (Livian kupla)
- `liiku-nappi`: `KEVYET` + ljubljana
- kovakoodatut luvut: `pollo-valmiskysymykset` 46 → 47, `pulu-tunteet` 46 → 47, `pallonimet` 262 → 263
- `paikallisaarteet`: `KUVAA_ODOTTAVAT` + SVN

## Fablen huomioon

- **Saapumisteksti on luonnos** (`fokusvirta-ljubljana.js` `matkakirja.teksti`, 400 merkkiä; paikkarivi "Ljubljana (Laibach), 1873."; päivämäärä ja reitin järjestys jätetty sinulle, `matkakirjanOtsikko` vaatii pilkun ja vuoden). Pulun kuplat ovat Sonnetin kirjoittamat, ei kaanonia.
- Venetsian nimikyltin siirto (yllä) muuttaa Venetsian nimen paikkaa kartalla; muut testit menevät läpi, mutta silmämääräinen tarkistus selaimella jäi tekemättä.
- Ljubljana on sijoitettu Wienin ja Venetsian väliin (ei suoraa Zagreb-yhteyttä: Zagreb ei ole pelikaupunki). Yhteys Dubrovnikiin/Sarajevoon jätetty pois.
- Ljubljanan suo (yllä) ja SVN-nostojen lehti/pallo: nostotason uudelleenpoltto voi olla tarpeen, koska kaupunki liittyi maailmankartalle.
