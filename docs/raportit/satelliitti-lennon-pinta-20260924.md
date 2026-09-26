# Satelliittipinta natiivin lentotilaan (Karttaseppä 24.9.2026)

Tilaus (omistaja Fablen kautta): NASA Blue Marble Next Generation Z0–Z7
koko maailma + EOX Sentinel-2 cloudless **2016** Z8–Z11 pelin ~72
kaupungin ympärille (säde 60 km). Rajapinta Natiivisepän kanssa:
ämpärissä `julisteet/pallo/satelliitti/<versio>/bmng/` ja `/s2/`, XYZ
`{z}/{x}/{y}.jpg` (y alaspäin), 256 px, kummassakin `laatat.json`
(s2: kaupungit + laatat8 + sääntö).

Työkalu `tools/tee-satelliitti.mjs`, kaupunkilista
`tools/satelliitti-kaupungit.json`, testit `tests/satelliittisarja.test.mjs`
(12/12 vihreänä 24.9.). Ajoskriptit `/Users/Shared/Claude/satelliitti-koe/aja-bmng.sh`
ja `aja-eox.sh`. **Täyttä ajoa ei ole tehty** — vain koeajo (BMNG osa C1,
EOX Pariisi + Rooma).

## 1. Lähteet ja lisenssit

| kerros | lähde | lisenssi | attribuutio pelissä |
| --- | --- | --- | --- |
| bmng Z0–Z7 | NASA Blue Marble: Next Generation, elokuu 2004, 500 m (Reto Stöckli, NASA Earth Observatory) | public domain (NASA Media Usage Guidelines: "generally are not subject to copyright in the United States") | "NASA Earth Observatory (Blue Marble Next Generation)" — NASA:n BMNG-sivu pyytää mainitsemaan NASA Earth Observatoryn |
| s2 Z8–Z11 | EOxCloudless / Sentinel-2 cloudless 2016, WMTS-taso `s2cloudless_3857` | **CC BY 4.0** (vain 2016; 2018–2025 CC BY-NC-SA 4.0 → ei koskaan) | EOX:n virallinen muoto: "EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016 & 2017)" |

Huomiot:
- EOX:n lisenssisivu antaa 2016-tasolle datavuodet **"2016 & 2017"**
  (eteläisen pallonpuoliskon ja tropiikin kuvat ovat 2017 alusta, EOX:n
  blogi 18.8.2017). WMTS-kuvauksessa lukee pelkkä 2016. Korjasin
  `attribuutioEox`-kentän lisenssisivun mukaiseksi (testi lukitsee).
  Tilauksen lyhyt muoto "Contains modified Copernicus Sentinel data 2016,
  EOX IT Services" on `attribuutio`-kentässä ennallaan — **suositus:
  pelin krediitteihin EOX:n täysi muoto** (CC BY 4.0 vaatii lisenssinantajan
  pyytämän tunnistetiedon).
- BMNG:n attribuutio muutettu "NASA Blue Marble Next Generation" →
  "NASA Earth Observatory (Blue Marble Next Generation)" NASA:n pyynnön
  mukaan.
- 2017-taso (`s2cloudless-2017_3857`): WMTS-kuvaus sanoo CC BY 4.0, mutta
  EOX:n lisenssisivu ei mainitse vuotta 2017 lainkaan (vain 2016 = CC BY,
  2018–2025 = CC BY-NC-SA). **2017 on siksi epäselvä** — pysytään 2016:ssa.
- EOX:n blogi 28.3.2017 (Euroopan ensiversio) puhui CC BY-SA 4.0:sta;
  nykyiset EOX:n lausumat (lisenssisivu, WMTSCapabilities, hinnoittelusivu)
  sanovat 2016:lle CC BY 4.0. Nykyinen lausuma on voimassa.

## 2. EOX: saako WMTS:stä noutaa ~9 200 laattaa offline-sarjaksi?

Erotellaan kaksi asiaa.

**Datan lisenssi (CC BY 4.0, 2016): sallii.** CC BY 4.0 sallii kopioinnin,
muokkauksen (värisovitus, rajaus) ja edelleenjakelun myös kaupallisesti
omasta CDN:stä, kun attribuutio ja lisenssilinkki ovat mukana ja muutokset
kerrotaan (`laatat.json` → `muutokset`). EOX:n kaupallinen "Commercial
Attribution-RestrictedUse 1.2" -lisenssi (joka kieltää suoran
edelleenjakelun) koskee **ostettuja** tuotteita, ei ilmaista 2016-tasoa.

**Palvelun (tiles.maps.eox.at) käyttöehdot: ei kieltoa, ei nimenomaista
lupaa massahakuun.**
- Erillisiä WMTS-palvelun käyttöehtoja ei löytynyt. WMTSCapabilities
  `AccessConstraints`: vain attribuutio + "Additional restrictions may
  apply for individual layers" (2016-tason kuvaus: CC BY 4.0).
- cloudless.eox.at/license-non-commercial: "Feel free to use the provided
  service endpoints (WMTS or WMS) directly in your application" ja
  pyyntöjä saa yhdistellä ("you may stitch multiple requests").
- EOX:n yleiset ehdot (eox.at/terms-conditions) koskevat vain tilauksia
  ("By completing an order …") — eivät ilmaista palvelua.
- maps.eox.at: ilmainen palvelu on kuormitettu ja rajoitettu ("we had to
  start applying rate limiting"); offline-kartat sovellukseen ja
  bulk-toimitukset ohjataan myyntiin ("You need an offline map for your
  app … Just get in touch"; "bulk delivery options, please contact us").
- Vanha vaihtoehto, EOX:n requester-pays-ämpäri `eox-s2maps`
  (2016 GeoTIFF-lähdetiilet, blogi 28.3.2017), **ei ole enää olemassa**
  (HTTP 404 NoSuchBucket 24.9.2026).

**Johtopäätös: EPÄSELVÄ → pysäyttävä kunnes Fable/omistaja päättää.**
Juridisesti noutoa ja offline-jakelua ei ole kielletty (CC BY 4.0, ei
palveluehtoja), mutta EOX ohjaa offline-käytön ja bulkin myyntiin ja
rajoittaa ilmaista palvelua. Koeajon ~300 laattaa on haettu; lisää ei
haeta ennen päätöstä.

Vaihtoehdot (suositusjärjestys):
1. **Kysy EOX:ltä** (omistaja tai Fable lähettää, osoite cloudless@eox.at):
   kerrotaan kertanouto 2016-tasosta 9 162 laattaa, ≤ 4 pyyntöä/s,
   attribuutio pelissä, ja pyydetään lupa tai tarjous samasta rajauksesta
   toimitettuna. Luonnos alla. Vastauksen jälkeen `aja-eox.sh` sellaisenaan.
2. **Nouto ilman kysymistä** CC BY 4.0:n ja "use the service endpoints
   directly" -lausuman nojalla, kohteliaalla tahdilla (skripti pysähtyy
   429/503/uudelleenohjaukseen). Juridisesti kestävä, maineriski pieni
   mutta olemassa.
3. **Oma pilvetön mosaiikki Copernicus Sentinel-2 L2A -datasta**
   (Copernicus-datan ehdot: vapaa käyttö ja jakelu, attribuutio
   "Contains modified Copernicus Sentinel data 20xx"). Esim. AWS Open Data
   `sentinel-2-l2a` COG:t, kesän mediaani 72 kaupungin ympäriltä.
   Täysin oma ja riippumaton, mutta arviolta 1–2 päivän työ + värityö;
   Z11 (~38 m/px Pariisin leveydellä) vaatii vain murto-osan 10 m datasta.
4. **Pelkkä BMNG** (Z8–Z11 venytetään Z7:stä, 500 m → selvästi
   pehmeä) tai Landsat-pohjainen PD-mosaiikki (30 m, USGS) — heikompi.

Sähköpostiluonnos (englanniksi, ei lähetetty):

> Subject: Offline use of Sentinel-2 cloudless 2016 tiles in an educational game
>
> Hello EOX team, we are building a Finnish educational adventure game
> (Matkakirja) and would like to use the Sentinel-2 cloudless 2016 layer
> (CC BY 4.0) as the close-range surface around 72 cities (60 km radius,
> zoom 8–11, 9,162 tiles of 256 px, ~140 MB). Our plan is to fetch these
> once from tiles.maps.eox.at (s2cloudless_3857) at ≤ 4 requests/s and
> serve them from our own CDN inside the game, with the attribution
> "EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains
> modified Copernicus Sentinel data 2016 & 2017)". Is this fine with you,
> or would you prefer to deliver the subset another way?

## 3. Koeajon tulokset (`/Users/Shared/Claude/satelliitti-koe/`)

Koeajo: BMNG osa C1 (0–90° E, pohjoinen) molemmat muunnelmat Z3–Z7
(559 laattaa kumpikin), EOX 2016 Pariisi + Rooma Z8–Z11 (294 laattaa,
alkuperäinen ja värisovitettu), 2016 vs 2017 Pariisi Z8 (4 laattaa).
Vertailukuvat `vertailu/` (vasemmalla BMNG Z7 venytettynä, keskellä EOX Z8
sellaisenaan, oikealla EOX sovitettuna).

**BMNG topo vs topo.bathy.** topo.bathyn meri on kirkkaan sininen
batymetrialla (`koe-z4-eurooppa.jpg` näyttää hyvältä kaukaa), mutta
EOX:n meri on tumma laivastonsininen: Rooman rannikolla topo.bathy → EOX
-sauma on voimakas värihyppy. topo-muunnelman meri on lähes musta ja
lähempänä EOX:ää. **Suositus topo** (skriptin oletus). Sivuhyöty:
topon merilaatat ovat ~0,5–0,7 kt (topo.bathy ~1,5 kt), joten sarja on
kevyempi. Huom. EOX:n 2016-merissä on rannikon lähellä vaaleampi vyöhyke,
jonka reuna näkyy terävänä monikulmiona (Rooma) — EOX:n oma merentäyttö,
ei korjattavissa ilman omaa merimaskia.

**EOX 2016 vs 2017 (Pariisi).** 2016 on tummempi ja siinä on selvä
vaalea kaistale (eri kuvauspäivän otos) Pariisista koilliseen; 2017 on
tasaisempi ja kirkkaampi. 2017:n lisenssi on kuitenkin epäselvä (luku 1),
joten pysytään 2016:ssa.

**Värisovitus Z7 → Z8.** Kaupunkikohtainen kvantiilikäyrä (maa-alue,
kanavittain `ulos = 255·a·(sisään/255)^g`, g rajattu ≤ 1,4) tuo EOX:n
keskiarvot 1–3 yksikön päähän BMNG:stä (Pariisi BMNG 83/77/41 → EOX
61/74/60 → sovitettu 84/77/38; Rooma 68/66/35 → 57/69/53 → 68/67/34).
Havainnot:
- BMNG:n elokuu on Pariisissa vaalean ruskea (sadonkorjuu), EOX 2016
  vihreämpi ja sinisempi. Sovitus kääntää EOX:n ruskeaksi, mutta
  voimistaa samalla kohinaa ja 2016:n vaaleaa kaistaletta; sininen kanava
  osuu g-rajaan 1,4.
- Kahden kaupungin mediaanista tehty **yhteinen käyrä** ei riitä: Rooma
  saa punertavan sävyn (sovitettu R 54 > G 48, BMNG 60/59). 72 kaupungin
  mediaani on vakaampi, mutta alueellinen ero (Välimeren kuiva kesä vs.
  Pohjois-Eurooppa) jää.
- Kuukausivertailu (`vertailu/kuukaudet.json`): Pariisissa EOX 2016 on
  väriltään lähimpänä BMNG:n huhtikuuta (etäisyys 21, elokuu 29), Roomassa
  heinä–elokuuta (27). Kuukauden vaihto ei siis ratkaise saumaa kaikkialla,
  ja keväinen BMNG näyttää lumet vuoristoissa — elokuu pysyy.

## 4. Lopulliset koot ja laattamäärät

| sarja | laattoja | koko (arvio) | peruste |
| --- | --- | --- | --- |
| bmng Z0–Z7 (topo) | 21 845 (Z7 16 384) | 70–110 Mt | koeajon Z7 maa ~7–13 kt, meri ~0,6 kt; Mercatorin laatoista ~35–40 % maata |
| bmng topo.bathy (vertailuksi) | 21 845 | 100–150 Mt | meri ~1,5 kt |
| s2 Z8–Z11, 72 kaupunkia | 9 162 (Z8 287, Z9 682, Z10 1 888, Z11 6 305) | 130–145 Mt | koeajo ka. 14,3 kt sovitettu / 15,6 kt alkuperäinen |
| **ämpäriin yhteensä** | **31 007** | **~200–250 Mt** | |

NAS:iin lisäksi (ei ämpäriin): BMNG-lähdekuvat ~372 Mt (topo, 8 osaa;
C1 jo ladattu molemmista muunnelmista), EOX:n raakavälimuisti ~143 Mt ja
muuttamaton s2-alkup ~143 Mt. Paikalliselle levylle ei kirjoiteta mitään
suurta — skriptit kirjoittavat NAS:iin
`/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/satelliitti/<versio>/`.

## 5. Kesto ja ajankohta

| vaihe | kesto | kuorma |
| --- | --- | --- |
| BMNG lataus 7 osaa (~290 Mt jäljellä) | 5–15 min | verkko |
| BMNG laskenta Z7–Z2 + Z1–Z0 | 3–5 min | 2 node-prosessia, ~1,2 Gt muistia/osa |
| EOX nouto 9 162 laattaa | ~40 min (≤ 4/s), rajoituksen osuessa jatko myöhemmin | verkko, kevyt CPU |
| värisovitus 72 kaupunkia + sovitettu sarja välimuistista | 5–10 min | 1 prosessi |
| **yhteensä** | **~1–1,5 h** | |

Ehdotus: **BMNG päivällä** heti luvan jälkeen (kevyt, ≤ 2 prosessia, ei
tarvitse EOX-päätöstä). **EOX-vaihe EOX-päätöksen jälkeen** päivällä tai
illalla ennen klo 22 (E28-poltto alkaa klo 22 ja on raskas; nouto on
verkkosidonnainen, mutta ei päällekkäin polton kanssa). Ei ajoa klo 03
eikä 04–05. Ennen ajoa `git fetch` ja versio = ajopäivä.

## 6. Avoimet päätökset Fablelle

1. **EOX-nouto**: vaihtoehto 1 (kysytään EOX:ltä, suositus), 2 (noudetaan
   CC BY:n nojalla), 3 (oma Copernicus-mosaiikki) vai 4 (pelkkä BMNG)?
2. **Värisovitus**: kaupunkikohtainen käyrä, 72 kaupungin yhteinen käyrä
   vai ei sovitusta (`VARIT=0`, sauma pehmennetään natiivissa
   ristihäivytyksellä Z7→Z8)? Koeajon perusteella yhteinen käyrä
   kahdesta kaupungista ei riitä; kaupunkikohtainen toimii keskiarvoissa
   mutta voimistaa 2016:n raitoja.
3. **BMNG-kuukausi**: elokuu (tilaus, suositus pysyä) — huhtikuu olisi
   lähempänä EOX:ää vain Pariisissa, ei Roomassa.
4. **Attribuutio pelissä**: EOX:n täysi muoto (suositus) vai tilauksen
   lyhyt muoto.
5. **topo vs topo.bathy**: suositus topo (Natiivisepän kanssa varmistettava,
   että kaukokuvan musta meri sopii pallon muuhun ilmeeseen).

## Lähteet (luettu 24.9.2026, tallenteet NAS:ssa)

Kansio `/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/satelliitti/lahteet/`,
tarkistussummat `SHA256SUMS-20260924.txt`.

- https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml — tasojen lisenssit, AccessConstraints
- https://cloudless.eox.at/license-non-commercial — vuosien lisenssit, 2016 = CC BY 4.0, palvelupisteiden käyttö
- https://cloudless.eox.at/documentation/license, /license-legal, /license-deed — kaupallinen RestrictedUse 1.2 (ostetut tuotteet)
- https://cloudless.eox.at/pricing, /documentation/usage, /industries/games-simulations — bulk ja offline myynnin kautta
- https://maps.eox.at/ — rate limiting, offline-kartat "get in touch"
- https://eox.at/terms-conditions/ — yleiset ehdot, koskevat tilauksia (sisältö JS-paketista `eox-terms-conditions-sisalto-20260924.js`)
- https://eox.at/2017/03/sentinel-2-cloudless-original-tiles-available/ — S3-ämpäri (nyt poistettu, `eox-s2maps-amparin-tarkistus-20260924.txt`)
- https://eox.at/2017/08/sentinel-2-global-cloudless-mosaic/ — 2016-mosaiikin aikavälit (etelä 11/2016–3/2017)
- https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/ — BMNG, krediittipyyntö
- https://www.nasa.gov/nasa-brand-center/images-and-media/ — NASA Media Usage Guidelines
