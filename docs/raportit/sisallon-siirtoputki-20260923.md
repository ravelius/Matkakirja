# Sisällön siirtoputki natiiviin peliin (Siirtoseppä 23.9.2026)

Tehtävä: Fablen tehtävänanto 23.9.2026. Tausta: loki 23.9. klo 09.43
(natiivi iOS-peli rinnalle) ja docs/raportit/3d-selvitys-tehtavananto-20260923.md,
kohta 3. Putki ei riipu moottorista: se tuottaa JSONia ja mediaosoitteita,
jotka Unity, Unreal, Godot tai Swift voi lukea. Peliin ei tehty muutoksia.
Lähde: main `eaeda81cf` (v2143).

## Tulos lyhyesti

- `node tools/vienti/vie-sisalto.mjs` tuottaa `dist/vienti/`-kansioon
  423 tiedostoa (59 Mt) alle sekunnissa. Vienti on deterministinen, eikä
  se tarvitse verkkoa.
- Kaikki 353 js/packs-moduulia ja 38 muuta sisältömoduulia viedään
  häviöttömästi: 544 exporttia. Mukana on 125 funktiota. Ne ovat
  logiikkaa eivätkä dataa, joten ne kulkevat lähdetekstinä ja merkittyinä.
- Datassa on 20 391 mediaviitettä (36 898 esiintymää). Niistä 18 188
  tiedostoviitettä saa valmiin haettavan osoitteen pelin omilla säännöillä
  (js/media.js). Lisäksi viitteissä on 1 681 lähde- ja lisenssilinkkiä.
- 21 kokoelmaa tyypitettyinä entiteetteinä, esimerkiksi kaupungit
  lat/lon-koordinaatein, reitit, kysymykset, lehdet ja kohtaamiset.
- Skeemaversio on **1.9** (`manifest.skeemaversio`): versiossa 1.1
  kaupungit saivat kentät `maa2` (ISO2), `tyyppi`, `lentokentta` ja
  `aloitus` natiivin 3D-proton tarpeen mukaan, versiossa 1.2 `tarkeys`
  (0–3), ja manifest sai tiedostojen koot (`tavuja`), versiossa 1.3
  lehden web-riippuvuudet (`web/lehti.json`), versiossa 1.4 kokoelmat
  `saannot` ja `saapuminen`, versiossa 1.5 funktioiden luettelo
  `manifest.logiikka` ja kokoelma `esilasketut`.
- `tests/vienti.test.mjs` (6 testiä, 3 s) todistaa, ettei mitään jää pois.
  Se vertaa jokaista exporttia suoraan lähdemoduuliin. Testi on todettu
  herkäksi: kun Set muutettiin taulukoksi, testi kaatui.
- **Osa 5 (lisätty 23.9. klo 10.05 tilauksesta): yhteinen sisältölähde.**
  `js/packs` pysyy ainoana lähteenä. CI vie jokaisesta mergestä
  versioidun paketin ämpäriin, ja natiivi lukee sen. Web on sama lähde
  ilman muutoksia, koska se julkaistaan samasta commitista. Tähän kuluu
  3,5–5 sessiota. Maksullista versiota estävät 23 NC-ääntä, jotka on
  korvattava; kuvissa NC-tapauksia ei ole. **Osa 1 on toteutettu
  23.9.2026 (PR #2925):** paketti menee ämpäriin jokaisesta mergestä
  (ks. 5.2). Osa 2 (funktiot tunnisteiksi) alkaa, kun 3D-proto on
  lukenut paketin.
- Mekaaninen osa on nyt valmis. Suurin työ on ei-mekaanisessa osassa eli
  UI:ssa ja Liviassa, ei sisällössä. Arvio on lopussa.

## 1. Inventaario: mitä sisältöä on

### 1.1 Rakenne

Pelin sisältö on ES-moduulien exporteissa. Se on lähes kokonaan puhdasta
literaalidataa, ja kaikki moduulit latautuvat Nodessa ilman selainta.

| Ryhmä | Tiedostoja | Mt | Mitä | Avain ja viittaukset |
|---|---|---|---|---|
| Lauta: `maailmankartta*.js` | 6 | 2,4 | 266 kaupunkia, 414 maa- ja merireittiä, 71 lentoreittiä, 1 407 visakysymystä, 945 paikkatietoa, 42 kaksintaistelua, 11 pulmaa, 135 maan muodot | kaupunki-id; maa ISO3 (`map.cityCountry`); manner (`cityManner`); x,y laudan Miller-yksiköissä (12000×5399, lon0 −175°); 103 kaupungilla tarkka `pallo`-lat/lon |
| Manner-packit (`africa`, `asia`, `europe`…, `-questions`, `-countries`, `-maatiedot`, `-artikkelit`, `-valokuvat`, `-saapumiset`, `-kulttuuri`) | 58 | 3,8 | maailmankartan sisällön lähde: kysymykset, maatiedot, artikkelit, Commons-kuvat | kaupunki-id, ISO3, Commons-tiedostonimi |
| Kaupunkilehti: `kulttuuri-kategoriat.js` | 1 | 3,7 | 195 kaupungin aiheosastot, kansikuvat ja nostot | kaupunki-id → osastot; `tiedosto` = Commons, `ampari` = oma paino |
| Maalehti: `maa-kategoriat.js`, `maalehtinostot-fra.js` | 2 | 2,8 | 119 maan aiheosastot, Ranskan 18 maalehtinostoa | ISO3 |
| Nähtävyydet: `nahtavyysjutut.js`, `henkilot.js` | 2 | 2,6 | 1 520 nähtävyysjuttua 178 kaupungissa | kaupunki-id → nimi → juttu |
| Nostot: `fokuskohteet-<maa>` (22), `hahmotelma-<maa>` (35), `maastokohteet-<maa>` (109), `nostoankkurit-<maa>` (14), `fokus-<maa>` | 181 | 4,6 | nostokohteet, hahmotelmat ja niiden viitekuvat, maastokohteet ja ankkurit | ISO3; `laudat.maailmankartta.{x,y}`; `osoite`/`lahdeUrl`/`lisenssiUrl` |
| Fokusvirrat: `fokusvirrat.js` + `fokusvirta-<kaupunki>` (50) | 51 | 1,8 | kaupunkien virrat: Livian repliikit, täkynostot, kuvat | kaupunki-id |
| Maasto: `maasto-*`, `maastokohteet.js` | 7 | 2,2 | vuoret, vedet, korkeudet, maastotekstit | nimi, x,y |
| Skandaalit | 1 | 0,6 | 250 skandaalia 112 maassa | ISO3, lat/lon |
| Historian hetket | 1 | 0,4 | 49 hetkeä ja 108 kuvaa | ISO3 (`iso`), lat/lon |
| Eläintäyt, paikallisaarteet | 2 | 0,2 | 109 eläintäyttä, 35 maan aarteet | ISO3 |
| Monumentit: `monumentit-eurooppa.js` | 1 | 0,04 | 38 kadonnutta monumenttia 26 maassa | ISO3 |
| Pienoismallit: `miniatyyrit.js` | 1 | 0,06 | 1 076 miniatyyriä 125 kaupungissa | kaupunki-id → nähtävyys → kuva |
| Julisteet | 1 | 0,04 | 114 julistetta | kaupunki-id (2 alikohdetta: ateena-nike*) |
| Kohtaamiset: `kohtaamiset.js` + js/kohtaamiskuvat-data.js | 2 | 0,15 | 46 kohtaamista, 79 kasvokuvaa (71 tarkistettua) | kaupunki-id; kuvissa kaupunki suomeksi → normalisoidaan id:ksi (77/79 osuu, loput 2 eivät ole laudalla) |
| Tarinakaari: `tarinakaari.js` + js/tyohuone-kehitys-data.js | 2 | 0,3 | 42 luennallista kohdetta; lähteessä `KAARI_PAKETIT` 69 kohdetta (27 Lähi-idän kohdetta ilman luentoa) | kaupunki-id |
| Äänet, kuvat ja radiot: `saapumispuheet`, `radiot`, `vanhat-aanet`, `viritysaanet`, `valokuvat-*`, `liput-*`, `lipputiedot`, `lippu-tekijat` | 12 | 0,4 | 45 saapumispuhetta, 115 maan radiot, 400 paikallista kuvakopiota, 352 lippua | kaupunki-id, ISO3, Commons-nimi |
| Linssit: `linssi-*` (11 packia) + js/linssit (14 moduulia) | 25 | 2,5 | tähdet, tuulet, kielet, ilmasto, muuttoliike…; astronautin 64 kysymystä, satelliitin 64 kohdetta, ihmisen matka 20+20+21, keksinnöt 26 | lat/lon, tunnus |
| Livia: js/livia-tilanteet, -pilotti-cuet, liviapuhe, livia, pollo | 5 | 0,2 | 45 luennan cue-taulut, 68 äänitettyä repliikkiä, kestot, tunteet, avausrepliikit | kaupunki-id; ääni `aanet/pulu/versiot/…` |
| Pöllö: `pollo-*`, `pollon-arvonimet` | 4 | 0,1 | valmiskysymykset, poiminnat, arvonimet, asetukset | — |
| Muu: `tokens`, `game` (ASKERS, FORM_WEIGHTS), `tietajatasot`, `lahteet`, `media` (Horation 45 luentaa), `sisaltotaulut`, `fokusnosto-symbolit`… | 16 | 0,5 | säännöt, taksonomiat, lähdeluettelo | — |

Johdettu hakemisto `KOHDE_MAAT` (js/fokuskohteet.js, 4,4 Mt) viedään
mukana valmiina. Se yhdistää packit ja maastokohteet 117 maaksi ja
2 289 kohteeksi, joten tuojan ei tarvitse toistaa yhdistämislogiikkaa.

### 1.2 Media

Media asuu ämpärissä `https://media.matkakirja.app/` (R2). Repossa ei ole
ämpärin sisältöluetteloa: `media/manifesti.json` syntyy vain
`tools/peilaa-media.mjs`-ajossa. Siksi vienti kerää viitteet itse ja
laskee osoitteet samoilla js/media.js:n funktioilla kuin peli.

| Laji | Lkm | Mistä osoite tulee |
|---|---|---|
| kuva-commons | 9 360 | peiliKuvaPolku → `kuvat/…`; peli yrittää ensin repon kopion, sitten Flickrin, sitten ämpärin ja lopuksi Commonsin (`url` + `varat` samassa järjestyksessä) |
| lippu-commons | 183 | `liput/…`, repon kopio ensin (`assets/liput`) |
| juliste | 508 | julisteUrl → `julisteet/…` (oma paino) |
| asset-miniatyyrit, -aarteet, -nostot, -elaimet, -ihmeet | 584 | assetOsoite → `kohtaamiset/<laji>/…` |
| aani-peilattu | 175 | Freesound ja archive.org → `aanet/…` |
| ampari-avain | 90 | valmiit avaimet, esim. Horation ja Livian versioidut äänet |
| aani-oma | 89 | aaniUrl → `audio/…` |
| hetkikuva, kohtaamiskuva | 187 | `kohtaamiset/historian-hetket/…`, `kohtaamiset/[kansio/]…` |
| repo | 397 | pelin juuresta: lehden karttakuvat `assets/kartat/*-keskusta.png` (310 Mt repossa), etusivun kuvat, liput |
| kuva-flickr | 53 | live.staticflickr.com |
| kuva-url, aani-url | 6 562 | ulkoiset suorat osoitteet: hahmotelmien viitekuvat, radiovirrat, saapumispuheet |
| linkki | 1 681 | lähteet, lisenssit, Wikipedia (ei mediaa) |
| tiedosto | 522 | ei koneellista sääntöä: Map-avaimet, Livian `aaniNimi`, viritysäänten nimet ja fokuslehtien 135 vanhaa pohjakuvaa (`<ISO3>.webp`), joita peli ei enää lataa. Tuoja ratkaisee nämä omasta taulustaan |

Verkkotarkistus (`tools/vienti/tarkista-media.mjs`, HEAD-pyyntö
jokaiseen osoitteeseen varareitteineen, ajettu 23.9.2026 kaikille
11 626 pelin omalle mediaosoitteelle): 11 588 vastaa. Poikkeuksia on 38:

- 33 Commons-kuvaa puuttuu ämpäristä: 24 on keksintöjen linssissä
  (`kuvaAito`), 8 kaupunkilehdessä ja 1 maalehdessä. **Korjattu PR:ssä
  #2913:** peilaus lukee js/linssit, ja 8 väärää nimeä korjattiin
  (kaarevat heittomerkit ja Yllästunturi). Uudelleentarkistuksessa
  aukkoja oli 32.
  `tools/peilaa-media.mjs` ei lue js/linssit-kansiota. Varareitti
  Commonsiin on olemassa, mutta Commons vastasi tarkistukseen 429
  (pyyntöraja), joten kuvia ei voitu todentaa sitä kautta.
- 5 on rivien `oma`-varapolkuja (ks. kohta 4, havainto 1).

Kaikki muut lajit vastasivat 100 %: juliste, asset-*, hetki- ja
kohtaamiskuvat, ämpärin avaimet, peilatut äänet, liput, Flickr ja
repon kuvat.

Lisenssit ja tekijät ovat enimmäkseen vapaamuotoisessa `lahde`-tekstissä.
Rakenteisina ne ovat vain lipuissa, Flickr-kuvissa ja hahmotelmissa
(`lisenssiUrl`). Vienti kuljettaa ne sellaisinaan. Rakenteisen lisenssin
saa jokaiselle Commons-kuvalle `tools/peilaa-media.mjs`:n `commonsMeta`lla,
jos App Store -julkaisu sitä vaatii.

### 1.3 Tallennus

Siirrettävää dataa on kahdessa avaimessa. Loput localStorage-avaimet ovat
laiteasetuksia tai kertalippuja.

- `matkakirja-save-v1` = `Game.toJSON()` (js/game.js:3264), versio 2.
  Kentät: packId, seed ja rngCalls (deterministinen mulberry32), players
  (pos, money, finds, findManner, findMaa, xp, linssit, stars), worlds
  (per lauta: tokens, revealed, visited, starsFound), usedQuestions,
  puzzlesSeen, kulttuuriVastatut, minitehtävät, elaintakyLunastetut,
  julisteet, fokusvirrat, explored, kaariYritykset, aarreLukot, log…
  Kaikki viittaukset ovat samoja id:itä kuin viennin kokoelmissa:
  kaupunki-id, ISO3, manner, token-tyyppi ja linssin tunnus.
- `matkakirja.passi.v1`: passin leimat `{packId: {label, date}}`.
- Migraatiot: v1→v2, kymmeniä "puuttuva kenttä = oletus" -kohtia ja
  `siirraErillislaudat` (vanhat `europe:ateena` → `maailmankartta:ateena`).
- iOS-kuoren pilvisynkka koskee vain näitä kahta avainta (uusin voittaa).

## 2. Vientimuoto

```
dist/vienti/
  manifest.json          sisällysluettelo: skeemaversio, moduulit, exportit, lukumäärät, sha256
  moduulit/js/packs/*.json, moduulit/js/*.json   RAAKAKERROS, häviötön
  kokoelmat/*.json       21 tyypitettyä entiteettikokoelmaa id-viittauksin
  media.json             kaikki mediaviitteet: laji, url, varat, ämpärin avain, esiintymät
  tiedostot/assets/data/ maakayrat.json, maapolygonit.json sellaisinaan
  skeema/*.schema.json   JSON Schema 2020-12 jokaiselle tiedostolajille (myös
                         kaupunki.schema.json ja osoitin.schema.json, skeema 1.1)
```

- **Raakakerros** on totuus: jokainen export sellaisenaan. JSONiin
  sopimattomat arvot merkitään $-olioilla: `$map`, `$set`, `$undefined`,
  `$funktio` (lähdeteksti mukana, ei ajeta), `$viittaus` (kehä, JSON
  pointer) ja `$luku` (NaN, −0). Datan omat `$`-avaimet pakotetaan
  (`$x` → `$$x`). Jaetut viittaukset kopioidaan, joten tuoja saa puun.
  Kuvaus: `skeema/arvo.schema.json`; palautus: `tools/vienti/sarjallista.mjs` `palauta()`.
- **Kokoelmat** ovat tuojan lähtöpiste. Jokaisella alkiolla on `id`,
  johdetut kentät (kaupunki, maa, lat, lon, url) päätasolla ja
  alkuperäinen olio kentässä `data`. `viittaukset` kertoo, mihin
  kokoelmaan kenttä osoittaa, ja testi tarkistaa, että jokainen viittaus
  osuu. Kaupunkien lat/lon on tarkka pallopiste 103 kaupungille. Muille
  163 kaupungille se lasketaan laudan projektiosta (`laudaltaAsteiksi`),
  mikä on vain likiarvo. Laudan paikat on sommiteltu: niillä 103
  kaupungilla, joilla tarkka piste on, poikkeama on keskimäärin 0,9° ja
  suurimmillaan 4,7° (Sansibar). Kenttä `sijaintiLahde` kertoo, kumpi arvo
  on käytössä. Tarkat pisteet loppuja 163:a varten ovat avoin tehtävä
  (ks. kohta 4).
- **Kaupungit, skeema 1.1** (`skeema/kaupunki.schema.json`): id, nimi,
  maa (pelin ISO3; Etelä-Sudan `SDS`), `maa2` (ISO2,
  `tools/vienti/iso2.mjs` Wikidatasta), manner, lat, lon,
  sijaintiLahde, saari, `lentokentta`, `aloitus`, `tyyppi` (laudan
  ambience), `tarkeys` (1.2) ja data. Natiivin 3D-proton ensimmäinen
  tarve on id, nimi, lat, lon ja maa2; muita kenttiä käytetään nimien
  harventamiseen. `data` on laudan raakaolio (x, y, la, lx, ly…), johon
  natiivi ei nojaa.
- **Tärkeys (skeema 1.2)**: 3 = pääkaupunki (`tools/vienti/paakaupungit.mjs`,
  staattinen taulu, määritelmä Wikidatan P36) tai aloituskaupunki,
  2 = lentokenttä tai vähintään 6 reittiä, 1 = vähintään 4 reittiä,
  0 = muut. Reitit = laudan `edges` + `airRoutes`. Jakauma 266
  kaupungilla: 0: 130, 1: 25, 2: 23, 3: 88.
- **Media** osoittaa ämpäriin eikä kopioi tiedostoja. Natiivi peli voi
  hakea ne ajon aikana tai esiladata paketiksi.
- **Manifest** antaa tuojalle tarkistuslistan: jos tuoja laskee
  lukumäärät omasta datastaan ja ne täsmäävät manifestiin, mitään ei
  puutu.
- Uudet packit tulevat mukaan automaattisesti. Packien ulkopuoliset
  lähteet luetellaan tiedostossa `tools/vienti/lahteet.mjs`.

Testi (`tests/vienti.test.mjs`) tarkistaa kuusi asiaa:

1. Jokainen pack ja jokainen export on manifestissa oikealla
   lukumäärällä.
2. Jokainen export palautuu JSONista alkuperäisen kanssa samaksi. Tähän
   käytetään omaa vertailijaa eikä viennin koodia.
3. Kaksi ajoa tuottavat tavulleen saman tuloksen.
4. Kokoelmien lukumäärät täsmäävät pakettien lukuihin, ja jokainen
   viittaus osuu.
5. Jokainen mediaesiintymä osoittaa oikeaan merkkijonoon.
6. Tiivisteet täsmäävät tiedostoihin.

Toinen testi (`tests/sisaltopaketti.test.mjs`, 7 testiä) valvoo
julkaisua. Se tarkistaa paketin skeemat `tools/vienti/validoi.mjs`:llä ja
kaupunkien 3D-kentät. Se varmistaa myös, että validaattori hylkää
rikkinäisen arvon, että versiointi toimii (sama sisältö → sama N,
muuttunut → N+1, palautuksen jälkeen ämpärin suurin + 1) ja että
työnkulku kirjoittaa osoittimen vasta paketin jälkeen.

## 3. Mikä on mekaanista, mikä ei

**Mekaanista (valmis):** kaikki tekstit, kysymykset, lehdet, nostot,
nähtävyydet, kohtaamiset, skandaalit, hetket, eläintäyt, monumentit,
pienoismallit, julisteet, linssien data, Livian cue- ja äänitaulut,
reitit, kaupungit ja mediaosoitteet. Natiivin tuojan tarvitsee vain lukea
JSON moottorin tietotyypeiksi.

**Pieni lähdemuutos tarvitaan.** Nämä ovat moduulin sisäisiä muuttujia,
eivät exportteja, joten ne jäävät viennin ulkopuolelle. Koodin omistaja
(Pelikoodari) lisää `export`-sanan tai siirtää datan packiin, minkä
jälkeen rivi lisätään `lahteet.mjs`:ään:

- `fokusvirta.js` `LIVIAN_SAAPUMISET` (10 repliikkiä)
- `sahke.js` sanastot ja saatteet; `SAHKE_POHJAT` sisältää tekstifunktioita
- `fokustehtavat.js` `PULLA_NIMET`
- `reaktiot.js` `LIVIAN_KIITOKSET`
- `havainnekuva.js` `SELITTEET`
- `fokusnosto.js` `NOSTO_MAAT` (Kreikan 4 nostoa, saa myös
  `nostoKaupunginPooli`-funktiolla)
- `sound.js` `REAL_SAMPLES` ja `siirtymamusiikki.js` `RAIDAT` (ääniluettelot)
- `lehti.js` noin 45 ja `maalehti.js` noin 10 tekstiä DOM-rakentajien
  sisällä: lehden vakiotekstit

Arvio: 0,5 sessiota.

**Logiikkaa datan seassa (125 funktiota).** Ne kulkevat lähdetekstinä ja
käännetään käsin:

- pulmageneraattorit (maailmankartan 11 `generate`-funktiota sekä Afrikan
  ja Euroopan pulmat)
- `MAAILMANKARTTA.texts`-olion kaksi tekstifunktiota
- URL-apurit (valokuvaUrl, lippuUrl, hetkenKuvaOsoite…). Vienti on jo
  laskenut niiden tulokset `media.json`:iin, joten niitä ei tarvitse
  kääntää.
- LINSSI-olioiden piirtofunktiot, jotka kuuluvat UI-työhön

Arvio: 1 sessio pulmille ja teksteille.

**Ei mekaanista:**

| Osa-alue | Miksi | Arvio (tekoälysessioita) |
|---|---|---|
| Pelilogiikka (game.js 3 600 riviä, rules, tokens, visa, die, ai, linssien omistus) | käännetään kielestä toiseen; säännöt ovat puhdasta logiikkaa | 3–5 |
| Tallennus | skeeman siirto on suora; vanhojen web-tallennusten luku natiivissa vaatii migraatioiden uudelleentoteutuksen | 0,5–1 (+1–2 jos vanhat matkat siirretään) |
| UI-näkymät: lehdet, nostokortit, kohtaamiskortti, passi, visa, aikajana, 2D-kartta, karttaselite | ui.js yksin on 23 900 riviä, ja UI-kerros yhteensä yli 50 000; kaikki DOM- ja CSS-sidonnaista | 25–40 |
| Maapallo (pallo*.js noin 10 000 riviä, globe.gl/three) | moottorivalinta ratkaisee; Cesiumin tai vastaavan valmis pallo lyhentää tätä | 10–15 (moottorista riippuen) |
| Livia | chat on oikea tekoäly (tools/pollo/worker.js: Claude Haiku 4.5, OpenAI TTS ja kuvat), joten natiivi tarvitsee saman workerin välityspalvelimeksi eikä avaimia appiin; SVG-eleet, kasvot, höyhenet ja äänisynkka toteutetaan uudelleen | 12–20 |
| Palvelimet (sähke D1, ehdotukset R2) | samat workerit käyvät natiiville, kun CORS- ja origin-tarkistukset laajennetaan | 0–8 (suositus: ei ensimmäiseen versioon) |
| Natiivin tuoja | vientimuodon luku moottorin tietotyypeiksi ja mediaesilataus | 1–2 |

**Yhteensä noin 50–90 tekoälysessiota**, joista sisällön osuus on alle 5.
Sisältö ei siis ratkaise aikataulua: sen ratkaisevat UI, pallo ja Livia.
Tämä tukee Fablen hybridiajatusta, jossa ensin tehdään natiivi pallo ja
web-näkymät pidetään kuoressa. Näkymät voivat lukea tätä samaa vientiä.

## 4. Havainnot ja avoimet

1. `aani-oma`-lajin viitteistä osa on rivien `oma`-kentistä
   (`assets/audio/…-lyria.mp3`). Ne ovat repon varapolkuja, eivät
   ensisijaisia. Samalla rivillä oleva `ampari`-kenttä osoittaa oikeaan
   paikkaan (`aanet/…`), ja se on myös viennissä (esim.
   `siirtymamusiikki.js`, `tyohuone-musiikki.js`). Tuojan pitää suosia
   `ampari`-kenttää, kun rivillä on molemmat.
2. ~~33 Commons-kuvaa puuttuu ämpäristä~~. Korjattu PR:ssä #2913
   (peilaus lukee js/linssit, 8 nimeä korjattu), ja PR #2916 poisti
   peilausajosta 357 turhaa 404-virhettä.
3. Osa lipuista on vain repon kopiona eikä ämpärissä. Esimerkiksi
   `liput/flag-of-armenia.png` palauttaa 404. Vienti antaa silloin
   ensisijaiseksi osoitteeksi repon kopion, kuten pelikin.
4. Jerusalemilla ei ole maata datassa. Vienti ei keksi maata vaan pitää
   arvon `null`.
5. `tyohuone-kehitys-data.js` `KAARI_PAKETIT` on tarinakaaren kaanoninen
   lähde, vaikka tiedosto on työhuoneen. Se on viety luokalla `kehittaja`.
6. 163 kaupungilla ei ole tarkkaa lat/lon-pistettä, joten niiden
   sijainti on laudalta laskettu likiarvo (virhe enintään 4,7°).
   **Ehdotukset lähteineen ovat PR:ssä #2922**
   (`docs/raportit/kaupunkien-latlon-20260923.tsv`, Fablen päätökset
   mukana), ja Sisältökirjuri kirjaa ne `PALLON_KAUPUNKIPISTEET`iin.
   Samalla löytyi Gao (374 km) ja Exmouth (89 km). Vartio
   `tools/tarkista-laudan-pisteet.mjs` ilmoittaa nyt myös wiki-kentät,
   joita ei löydy fi-Wikipediasta.
7. Vienti ei muuta peliä. Sen testi ajetaan normaalissa
   `node --test` -portissa (3 s). `dist/` on .gitignoressa.

Työkalut: `tools/vienti/vie-sisalto.mjs`, `sarjallista.mjs`,
`media.mjs`, `kokoelmat.mjs`, `lahteet.mjs`, `tarkista-media.mjs`,
`julkaise-sisalto.mjs`, `validoi.mjs`, `iso2.mjs` ja `skeema/`.
Työnkulku: `.github/workflows/vie-sisalto.yml`. Testit:
`tests/vienti.test.mjs` ja `tests/sisaltopaketti.test.mjs`.

## 5. Yhteinen sisältölähde kahdelle pelille

Omistajan tilaus 23.9.2026 klo 10.05: kun nostoteksti muuttuu tai kuva
lisätään, muutoksen pitää päivittyä sekä web-peliin että natiiviin
iOS-peliin samaan aikaan ja helpoimmalla tavalla. Yksityiskohdat ovat
liitteissä: [web ja julkaisuputki](sisallon-siirtoputki-20260923-liite-web.md)
ja [App Store -säännöt](sisallon-siirtoputki-20260923-liite-app-store.md).

### 5.1 Periaate: yksi lähde, yksi paketti, kaksi lukijaa

Repon `js/packs` pysyy **ainoana muokattavana lähteenä**. Kirjoittajat ja
sessiot muokkaavat sitä kuten nytkin, ja kommentit, päätöshistoria ja
testit säilyvät. Jokaisesta mergestä syntyy kaksi julkaisua samasta
commitista:

- **web**: GitHub Pages julkaisee packit sellaisinaan, eli nykyinen putki
  jatkuu muuttumattomana.
- **sisältöpaketti**: CI ajaa `tools/vienti/vie-sisalto.mjs`:n ja vie
  tuloksen ämpäriin versioituna. Natiivi peli lukee tämän paketin.

Koska molemmat julkaisut syntyvät samasta commitista, sisältö ei voi
eriytyä. Web ei tarvitse ajonaikaista pakettilatausta ollakseen "sama
lähde", koska Pages päivittyy jo jokaisella mergellä. Tämä on liitteen
suositus, ja se on selvästi halvin tapa. Kuvat ja äänet ovat jo nyt
yhteisiä: molemmat pelit hakevat ne samoista ämpärin osoitteista, jotka
vienti kirjaa `media.json`:iin. Uusi kuva ämpärissä ja rivi packissa
riittävät.

### 5.2 Julkaisuputki: repo → CI → ämpäri

Uusi työnkulku `vie-sisalto.yml` käyttää samoja R2-secretejä kuin 33
nykyistä ämpärityönkulkua. Sen osoitinmalli on sama kuin `pyramidi.json`-
ja `laatat.json`-tiedostoilla.

1. Työnkulku laukeaa pushista mainiin polkusuodattimella `js/**`,
   `assets/data/**` ja `tools/vienti/**`.
2. Se ajaa viennin ja testin. Jos paketin tiiviste ei muuttunut, mitään
   ei viedä.
3. Paketti viedään muuttumattomana polkuun `sisalto/1/v<N>/`
   (`Cache-Control: immutable`, vuosi) ja tarkistetaan julkisesta
   osoitteesta.
4. Osoitin `sisalto/1/uusin.json` kirjoitetaan **viimeisenä** (max-age
   60 s). Siinä on `{ $skeema, versio, polku, sha256, skeemaversio,
   minSovellus, edellinen, commit, appVersion, julkaistu }`
   (`skeema/osoitin.schema.json`).
5. Palautus tehdään käsiajolla `palauta: N`, joka vaihtaa osoittimen.
   20 viimeisintä versiota säilytetään.

Sisältöversio N on CI:n laskuri, erillään APP_VERSIONista. Tekstimuutos
ei siis vaadi uutta sovellusversiota kummassakaan pelissä. Natiivi peli
tarkistaa osoittimen käynnistyessä, lataa uuden paketin taustalla ja ottaa
sen käyttöön seuraavalla käynnistyksellä tai näkymänvaihdossa. Peli pitää
aina viimeisen toimivan paketin tallessa. Webissä service worker
välimuistittaa packit kuten nyt.

Arvio: 1–1,5 sessiota työnkululle ja manifestin laajennukselle, 0,5
sessiota sisältöversion näyttämiselle (työhuone ja natiivin tietoja-sivu).

**Toteutus, osa 1 (23.9.2026, Fablen erä):** `.github/workflows/vie-sisalto.yml`,
`tools/vienti/julkaise-sisalto.mjs` (versio, tiiviste, osoitin),
`tools/vienti/validoi.mjs` (skeematarkistus ilman riippuvuuksia) ja
`tests/sisaltopaketti.test.mjs`. Poikkeamat suunnitelmasta:
- N lasketaan ämpärin suurimmasta versiosta eikä osoittimesta, jotta
  palautuksen jälkeen ei kirjoiteta olemassa olevan version päälle.
- Osoitin on myös versiokansiossa (`v<N>/osoitin.json`), ja palautus
  kopioi sen.
- `minSovellus` on `{ ios: 1, web: null }`, koska web ei lue pakettia.
- Skeema 1.1: kaupungeille `maa2` (ISO2), `tyyppi`, `lentokentta` ja
  `aloitus` 3D-proton tarpeen mukaan (3D-selvittäjä 23.9.).
- Skeema 1.4 (osa 2 erä A, matkustus ja saapuminen ensin): kokoelma
  `saannot` sisältää js/rules.js:n ja js/game.js:n vakiot, jotka kootaan
  automaattisesti: hinnat SEA_FEE 100, FLIGHT_PRICE 300 ja BUS_FARE 50,
  aloitusraha, vuoron tunnit, palkkiot ja XP. Nämä puuttuivat paketista
  kokonaan. Kokoelma `saapuminen` antaa jokaiselle kaupungille pelin
  saapumishakujen tulokset valmiiksi laskettuina (fokusvirta, juliste,
  luentakuva, lehti, saapumispuhe, kohtaaminen, paikallisaarteet,
  historian hetket, radio ja vanha tallenne), joten natiivin ei tarvitse
  portata näitä apufunktioita. Liikkumisen logiikka (js/rules.js
  findMoves, reachableCities) on edelleen Pelikoodarin porttaustyötä.
- Skeema 1.3 (Fablen linjaus 23.9.: natiivi etusijalle, lehti aluksi
  web-koodina WKWebView-kuoressa): `web/lehti.json` listaa lehden
  riippuvuudet lähdekoodista laskettuna (`tools/vienti/web-riippuvuudet.mjs`).
  Kuori avaa sivun `index.html?lehti=<kaupunki-id>` (Pelikoodari, PR #2942,
  tapahtumat `lehti-auki` ja `lehti-suljettu` kanavaan
  webkit.messageHandlers.matkakirja). Juuri on js/main.js, koska lehti
  käyttää ui-olion 44 jäsentä. Mukana ovat index.html, JS-sulkeuma (554
  moduulia, 24 dynaamista) ja CSS (14 tiedostoa), yhteensä noin 43 Mt
  koodia. Lisäksi paikallisia tiedostoja ja kansioita on noin 370 Mt,
  joista kohdekartat 263 Mt, ja ne haetaan ajon aikana osoitteesta `juuriUrl`.
  Koodin kokoa pienentäisivät laiskat tuonnit laudalle; niistä ei ole
  vielä päätöstä. Jokaisella
  tiedostolla on sha256, joten kuori tietää, mitä versiota paketti vastaa.
  Manifestissa on `webNakymat`. Vientityönkulku käynnistyy nyt myös
  css/-, assets/- ja index.html-muutoksista.
- Skeema 1.2 (3D-selvittäjän palaute 23.9. klo 14.29): kaupungeille
  `tarkeys` 0–3; manifestiin `tavuja` kokoelmille, medialle ja
  lisätiedostoille (moduuleilla se oli jo); `kaupunki.data` merkitty
  skeemaan raakaolioksi.

Funktiot tunnisteiksi ja sisältöversion näyttäminen ovat myöhempiä osia.

### 5.3 Yhteensopivuus: vanha sovellus ja uusi sisältö

- **Skeeman major.minor.** Nykyinen on 1.9 (`SKEEMAVERSIO_TARKKA`,
  manifestissa ja osoittimessa). `matkakirja-vienti/1` on major. Lisäykset
  (uusi kenttä, uusi kokoelma) nostavat minoria, ja vanha sovellus
  ohittaa tuntemattomat kentät. Poisto tai merkityksen muutos nostaa
  majoria, jolloin osoitin vaihtuu (`sisalto/2/…`). Vanha sovellus ei
  koskaan näe uutta majoria, vaan jää viimeiseen yhteensopivaan
  pakettiin. Historia: 1.0 ensimmäinen vienti; 1.1 kaupunkien maa2,
  tyyppi, lentokentta, aloitus; 1.2 kaupunkien tarkeys ja manifestin
  tavuja; 1.3 web-näkymien riippuvuuslistat (web/lehti.json); 1.4 kokoelmat saannot
  ja saapuminen; 1.5 manifest.logiikka, kokoelma esilasketut ja media.suurennos; 1.6 aarteiden
  arvovälit ja botin taito saannoissa, kokoelma tapahtumat; 1.7 kokoelma
  linssiaineisto; 1.8 kokoelma aanitaulut; 1.9 kokoelmat kuvakysymykset,
  lippumaat ja pulmaaineisto. Raakaoliot (`data`) eivät kuulu sopimukseen: niiden kentät
  voivat muuttua ilman versionnostoa.
- **Pakolliset kentät.** Jokainen sovellus julistaa, mitkä kokoelmat ja
  kentät se vaatii. Tuoja validoi paketin ennen käyttöönottoa, ja jos
  jokin puuttuu, vanha paketti pysyy käytössä. Skeemat
  (`skeema/*.schema.json`) ovat tämän tarkistuksen pohja.
- **`minSovellus`** kirjataan osoittimeen erikseen webille ja iOS:lle,
  nyt `{ ios: 1, web: null }` (web ei lue pakettia). Näin sisältö, joka vaatii uutta koodia (esimerkiksi uusi
  pulmatyyppi), ei mene vanhalle sovellukselle.
- **Avoin riski:** vanhan koodin käytös uusien enum-arvojen kanssa
  (token-tyyppi, linssi-id, pulmageneraattori) on tarkistamatta. Tuojan
  pitää ohittaa tuntematon arvo eikä kaatua.

### 5.4 Mitä webissä pitää muuttaa

Sama lähde toteutuu ilman webin muutoksia (5.1). Jos web halutaan
myöhemmin päivittää sisällön osalta ilman Pages-julkaisua (esimerkiksi
kiireellinen tekstikorjaus), liitteen vaihtoehtojen arvio on seuraava:

| Vaihtoehto | Arvio |
|---|---|
| (a) top-level await -latausmoduuli, packit ämpäristä | **hylätään**: rikkoo yhden tiedoston version, ensikäynnistys ei toimisi offline, ja käynnistys odottaisi noin 27 Mt verkosta. 58 moduulia laskee pack-datasta jo importtihetkellä (esim. `KOHDE_MAAT`), joten "lataa myöhemmin" -malli ei sovi |
| (b) JSON lähteeksi, .js generoidaan siitä | **ei nyt**: 17 % pack-riveistä on päätöskommentteja, projektin build-vaiheettomuus rikkoutuisi, ja 119 testiä lukee packeja suoraan |
| (c) overlay: käynnistysmoduuli lukee ämpärin muutokset IndexedDB:stä ja paikkaa packit ennen main.js:ää | **toimii tarvittaessa**, 2 sessiota ja laitekierros. Kulkee vaiheittain ilman katkoa: overlay on tyhjä oletuksena, ja virhe palauttaa pelin packeihin |

Kummassakin pelissä on tehtävä yksi valmisteleva muutos: **funktiot pois
datasta**. 125 funktiota, esimerkiksi pulmageneraattorit ja kaksi
tekstifunktiota, korvataan tunnisteilla (esim. `generaattori:
'roomalaiset'`), ja kumpikin peli toteuttaa generaattorin omalla
kielellään. Arvio: 2–3 sessiota Pelikoodarille.

**Tehty, erä 1: kaupunkidata (23.9.2026).** Laudan ja lähdepackien
(`cities`-exportit ja `*_PUZZLES`) funktiot on poistettu:
- 11 pulmaa: `generate: fn` → `generaattori: '<tunniste>'`. Rekisteri
  `js/pulmageneraattorit.js` (`PULMAGENERAATTORIT`, `pulmanGeneraattori`).
  Natiivi toteuttaa samat 11 tunnistetta; generaattori on
  `(rng) => { sketch, options, correct }`.
- 11 packin `texts.starFound` ja `texts.winnerStar`: nuolifunktiot →
  pohjat, joissa paikkamerkit `{name}`, `{city}` ja `{money}`. Täyttö
  `js/tekstipohja.js` (`taytaPohja`); tuntematon paikkamerkki jää näkyviin.
- Vartija `tests/sisaltopaketti.test.mjs` ("kaupunkidatassa ei ole
  funktioita") kaataa viennin, jos kaupunkidataan lisätään funktio.

**Tehty, erä 2: loput 70 funktiota luokiteltu (skeema 1.5, 23.9.2026).**
Kolme Sonnet-agenttia analysoi funktiot tiedostoittain.
`tools/vienti/logiikka.mjs` luokittelee jokaisen, ja
`manifest.logiikka` on natiivin porttauslista:
- media (7): kuva- ja lippu-URL:t ovat jo media.json:ssa, ja uusi kenttä
  `suurennos` (1600 px) vastaa funktiota valokuvaSuurennos().
- esilaskettu (14): kokoelmat `saapuminen` (erä A) ja `esilasketut`
  (hetkenKuvat, elaintakynKuvat, maanGenetiivi 135 maalle sisäisine
  poikkeuksineen, linssien selitteet, piirroksen omaavat pulmat).
- saanto (16): pieni sääntö sanallisesti (esim. karttaKuvasuhde,
  viritysPolku, kaariLuentaSoi).
- logiikka (29): linssien piirto ja pallokytkentä, 11 pulmageneraattoria
  ja pulmapiirrokset tunnisteilla (`linssi:topografia.piirra`,
  `pulma:roomalaiset`, `pulmapiirros:<id>`), karttapiste ja mittakaava.
- kuollut (4): paivanKuva, fokuskohteetDeu, juliste, maanAiheOtsikko.
- Kaupungeille `lauta: {x, y}` ja reiteille `askelia` ja `via` päätasolle
  (3D-selvittäjän pyyntö): natiivin reittigeometria lasketaan verkkopelin
  kaavalla laudan pisteistä, eikä sen tarvitse nojata `data`-kenttiin.
- Kokoelma `laatat` (Pelikoodarin pyyntö): MAAILMANKARTTA.tokens
  sellaisenaan yhtenä alkiona, jotta natiivin laattojen jaon ei tarvitse
  lukea 1,6 Mt:n laudan raakamoduulia.
Vartija (`tests/sisaltopaketti.test.mjs`) kaatuu, jos pakettiin tulee
luokittelematon funktio tai jos luettelossa on vanhentunut rivi.
Lähdeteksti jää raakakerrokseen, mutta natiivi ei aja sitä.

Yhteensä: **3,5–5 sessiota** siihen, että sisältö julkaistaan molempiin
peleihin yhdellä mergellä. Overlay lisää tähän 2 sessiota, jos sitä
tarvitaan.

### 5.5 App Store

Liitteessä ovat kohdat ja lähteet. Olennaiset:

- **Sisältö datana on sallittua (2.5.2).** JSON, kuvat ja äänet saa
  ladata palvelimelta ja päivittää ilman arvostelua (2.3.1: sisältö saa
  muuttua, mutta uusia toimintoja ei saa avata palvelimelta). Paketin on
  pysyttävä deklaratiivisena. Tämä on toinen syy poistaa funktiot
  datasta: lähdetekstinä kulkeva `$funktio` ei saa koskaan päätyä
  ajettavaksi natiivissa.
- **Offline.** Sääntö ei vaadi sitä, mutta arvostelija testaa luvatun
  toiminnon. Suositus: viimeisin paketti mukaan sovellukseen (noin
  27–60 Mt JSONia, pakattuna selvästi vähemmän) ja päivitykset verkosta.
  Näin ensikäynnistys toimii ilman verkkoa.
- **Nykyinen WKWebView-kuori** on riskissä kohdan 4.2 (minimitoiminnallisuus)
  takia, jos se on vain verkkosivun kääre. Natiivi peli poistaa riskin.
- **3D-lisäosat (IAP, 3.1.1).** Lukittu digitaalinen sisältö vaatii
  sovelluksen sisäisen oston. Samaa pakettia rajataan näin:
  - Manifestiin tulee lisäosille kenttä `oikeus` (esim.
    `lisaosa:colosseum`). Perussisältö ja lisäosien esittelytekstit ovat
    avoimia.
  - Raskas 3D-data on omissa lisäosapaketeissaan
    (`sisalto/lisaosat/<id>/v<N>/`). Ne ladataan vasta StoreKit 2
    -transaktion jälkeen: worker tarkistaa transaktion palvelimella ja
    antaa lyhytikäisen allekirjoitetun osoitteen. iOS:n Background
    Assets hoitaa suuret lataukset.
  - Webissä ostettu lisäosa saa aueta iOS:ssä (3.1.3(b)), jos sama tuote
    on myynnissä myös IAP:na. Ulkoisten maksulinkkien säännöt ovat
    USA:ssa ja EU:ssa muutoksessa, joten ne tarkistetaan juuri ennen
    julkaisua.
- **Livia-chat (5.1.2(i), vuoden 2025 lisäys).** Kun henkilötietoja
  jaetaan kolmannen osapuolen tekoälylle (Anthropic), siitä on kerrottava
  ja siihen on pyydettävä nimenomainen suostumus ennen ensimmäistä
  viestiä. Ikäluokitus (13+) määräytyy chatin mahdollisen sisällön
  mukaan.

### 5.6 Lisenssit maksullisessa versiossa

Laskettu kaikista 20 391 mediaviitteestä viitteen omien lisenssikenttien
perusteella (`lahde`, `lisenssi`, `nimi`, `musiikkiNayteNimi`). NC- ja
ND-tapaukset ovat rivi riviltä raportissa
docs/raportit/lisenssi-inventaario-20260923.md (PR #2896).

| Laji | n | BY-SA | BY | CC0/PD | NC/ND | Oma tuotanto | Tuntematon |
|---|---|---|---|---|---|---|---|
| Commons-kuvat | 9 360 | 5 590 (60 %) | 1 443 (15 %) | 2 309 (25 %) | **0** | 11 | 0 |
| Ulkoiset kuvaosoitteet (hahmotelmien viitekuvat, nostot) | 6 456 | 4 017 | 660 | 842 | 0 | 912 | 24 |
| Liput | 183 | 8 | – | 141 | 0 | – | 34 |
| Flickr | 53 | 14 | 34 | 1 | 0 | – | 4 |
| Kenttä-äänitteet (Freesound, archive.org) | 175 | 30 | 17 | 104 | **23** | 1 | 0 |
| Julisteet, hetki-, kohtaamis-, aarre-, eläin-, ihme- ja miniatyyrikuvat | 1 279 | – | – | – | 0 | 1 165 | 114 (julisteita ilman lähderiviä) |
| Omat äänet (ElevenLabs, Lyria, textdesk) | 179 | – | – | – | 0 | 179 | 0 |

- **NC:** 23 ääntä ja 0 kuvaa. Kaikki 23 soivat oletuksena, joten ne on
  korvattava ennen maksullista versiota. Korvaus on annettu
  Sisältökirjurille. Kuvissa `js/kuvagalleria.js` `lisenssiKelpaa()`
  estää NC:n ja ND:n jo tuonnissa. Äänistä vastaava portti puuttuu, ja se
  kannattaa lisätä testiksi.
- **SA noin 9 600 kuvaa.** ShareAlike koskee kuvaa itseään, ei koko
  sovellusta. Rajaus ja koon muutos eivät tee pelistä SA-teosta, mutta
  jokaisesta kuvasta on näytettävä tekijä ja lisenssi. Kuvateksti ja
  lähdeluettelo tekevät tämän jo nyt, ja natiivin pitää säilyttää se
  (vienti kuljettaa `lahde`-kentät). Tulkinta on vakiintunut mutta ei
  kiistaton, joten juristin vahvistus kannattaa hankkia ennen maksullista
  julkaisua.
- **Radiovirrat (78 asemaa):** ne eivät kuulu CC-lisenssien piiriin. On
  tarkistettava, saako asemien virtoja soittaa kaupallisessa
  sovelluksessa, tai ne jätetään maksullisesta versiosta pois.
- **Oma tuotanto:** ElevenLabsin kaupallinen käyttö vaatii maksullisen
  tilauksen tuotantohetkellä (js/lahteet.js, tarkistettu 27.8.2026).
  OpenStreetMap-karttakuvat (ODbL) vaativat attribuution.
- **Kolmannen osapuolen äänistä ei yhdeltäkään puutu lisenssiä.**
  Tarkistamatta ovat vain 24 ulkoista kuvaosoitetta, 34 lippua (valtaosa
  PD:tä) ja 114 julistetta, joiden lähderivi puuttuu (oletettavasti omaa
  painoa).

### 5.7 Riskit ja suositus

**Riskit**

1. **NC-äänet maksullisessa versiossa.** Nyt tunnetut 23 ääntä ja tulevat
   lisäykset. Torjunta: korvaus ja äänten lisenssiportti testiin.
2. **Kaksi julkaisua eriytyy**, jos natiivi saa sisältöä muualta kuin
   CI:stä. Torjunta: paketti syntyy vain CI:ssä samasta commitista kuin
   web, ja manifestiin kirjataan commit.
3. **Vanha sovellus ja uusi skeema.** Torjunta: major-kohtainen osoitin,
   `minSovellus` ja tuojan validointi. Uusien enum-arvojen käsittely on
   vielä auditoimatta.
4. **Funktiot datassa.** Ne ovat App Storen kohdan 2.5.2 riski ja estävät
   kahden kielen toteutuksen. Torjunta: generaattoritunnisteet (2–3
   sessiota) ennen kuin natiivi lukee paketin.
5. **Ämpärin aukot.** 33 kuvaa puuttui ämpäristä (korjattu, #2913), ja
   service worker ei välttämättä toimi WKWebView-kuoressa
   (`WKAppBoundDomains` puuttuu, tarkistamatta). Torjunta:
   `tarkista-media.mjs` CI:hin viikoittain ja laitetestaajalle
   kuoritesti.
6. **Apple-säännöt muuttuvat**, erityisesti ulkoiset maksulinkit EU:ssa ja
   USA:ssa. Torjunta: tarkistus juuri ennen julkaisupäätöstä.

**Suositus**

1. **Heti:** NC-äänten korvaus (Sisältökirjuri) ja äänten lisenssiportti
   (Pelikoodari).
2. **Seuraavaksi (3,5–5 sessiota):**
   - `vie-sisalto.yml`: CI vie paketin ämpäriin versioituna ja päivittää
     osoittimen. **Tehty (#2925).**
   - sisältöversio näkyviin
   - funktiot datasta tunnisteiksi.
   Web ei muutu: se on sama lähde, koska Pages ja paketti syntyvät samasta
   commitista.
3. **Natiivi** lukee paketin osoittimen kautta, pitää viimeisimmän paketin
   mukana sovelluksessa (offline) ja päivittää taustalla. 3D-lisäosat ovat
   omina paketteinaan IAP-oikeuden takana (StoreKit 2 ja allekirjoitettu
   osoite workerilta).
4. **Webin overlay** (ämpärin sisältö ajon aikana ilman Pages-julkaisua)
   tehdään vain, jos kiireellisiä korjauksia tarvitaan julkaisujen välillä.
   Nykyinen julkaisutahti (useita kertoja päivässä) ei sitä vaadi.
