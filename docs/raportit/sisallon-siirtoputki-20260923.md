# Sisällön siirtoputki natiiviin peliin (Siirtoseppä 23.9.2026)

Tehtävä: Fablen tehtävänanto 23.9.2026. Tausta: loki 23.9. klo 09.43
(natiivi iOS-peli rinnalle) ja docs/raportit/3d-selvitys-tehtavananto-20260923.md,
kohta 3. Putki ei riipu moottorista: se tuottaa JSONia ja mediaosoitteita,
jotka Unity, Unreal, Godot tai Swift voi lukea. Peliin ei tehty muutoksia.
Lähde: main `eaeda81cf` (v2143).

## Tulos lyhyesti

- `node tools/vienti/vie-sisalto.mjs` tuottaa `dist/vienti/`-kansioon
  421 tiedostoa (59 Mt) alle sekunnissa. Vienti on deterministinen, eikä
  se tarvitse verkkoa.
- Kaikki 353 js/packs-moduulia ja 38 muuta sisältömoduulia viedään
  häviöttömästi: 544 exporttia. Mukana on 125 funktiota. Ne ovat
  logiikkaa eivätkä dataa, joten ne kulkevat lähdetekstinä ja merkittyinä.
- Datassa on 20 391 mediaviitettä (36 898 esiintymää). Niistä 18 188
  tiedostoviitettä saa valmiin haettavan osoitteen pelin omilla säännöillä
  (js/media.js). Lisäksi viitteissä on 1 681 lähde- ja lisenssilinkkiä.
- 21 kokoelmaa tyypitettyinä entiteetteinä, esimerkiksi kaupungit
  lat/lon-koordinaatein, reitit, kysymykset, lehdet ja kohtaamiset.
- `tests/vienti.test.mjs` (6 testiä, 3 s) todistaa, ettei mitään jää pois.
  Se vertaa jokaista exporttia suoraan lähdemoduuliin. Testi on todettu
  herkäksi: kun Set muutettiin taulukoksi, testi kaatui.
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
  (`kuvaAito`), 8 kaupunkilehdessä ja 1 maalehdessä.
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
  manifest.json          sisällysluettelo: moduulit, exportit, lukumäärät, sha256
  moduulit/js/packs/*.json, moduulit/js/*.json   RAAKAKERROS, häviötön
  kokoelmat/*.json       21 tyypitettyä entiteettikokoelmaa id-viittauksin
  media.json             kaikki mediaviitteet: laji, url, varat, ämpärin avain, esiintymät
  tiedostot/assets/data/ maakayrat.json, maapolygonit.json sellaisinaan
  skeema/*.schema.json   JSON Schema 2020-12 jokaiselle tiedostolajille
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
2. 33 Commons-kuvaa puuttuu ämpäristä (ks. 1.2), koska peilaustyökalu
   ei lue js/linssit-kansiota. Korjaus on laajentaa `tools/peilaa-media.mjs`
   lukemaan js/linssit ja ajaa se uudelleen. Tehtävä kuuluu Julkaisijalle
   tai Pelikoodarille.
3. Osa lipuista on vain repon kopiona eikä ämpärissä. Esimerkiksi
   `liput/flag-of-armenia.png` palauttaa 404. Vienti antaa silloin
   ensisijaiseksi osoitteeksi repon kopion, kuten pelikin.
4. Jerusalemilla ei ole maata datassa. Vienti ei keksi maata vaan pitää
   arvon `null`.
5. `tyohuone-kehitys-data.js` `KAARI_PAKETIT` on tarinakaaren kaanoninen
   lähde, vaikka tiedosto on työhuoneen. Se on viety luokalla `kehittaja`.
6. 163 kaupungilla ei ole tarkkaa lat/lon-pistettä, joten niiden
   sijainti on laudalta laskettu likiarvo (virhe enintään 4,7°).
   Natiivin pallon merkit tarvitsevat tarkat pisteet: tehtävä sopii
   Karttasepälle, ja pohjaksi käy `PALLON_KAUPUNKIPISTEET`.
7. Vienti ei muuta peliä. Sen testi ajetaan normaalissa
   `node --test` -portissa (3 s). `dist/` on .gitignoressa.

Työkalut: `tools/vienti/vie-sisalto.mjs`, `sarjallista.mjs`,
`media.mjs`, `kokoelmat.mjs`, `lahteet.mjs`, `tarkista-media.mjs` ja
`skeema/`. Testi: `tests/vienti.test.mjs`.
