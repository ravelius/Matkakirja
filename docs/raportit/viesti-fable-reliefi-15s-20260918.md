# Viesti Fablelle: 15″-reliefi pääkartan laattapyramidiin (koe Alpeilla)

Opus-agentti 18.9.2026 klo 01.15–02.00 (Suomen aikaa), haara
`claude/bold-ride-vow4ki-reliefi-15s`.

Tehtävä muuttui kesken ajon: ensin 5°×5°:n omat laatat, sitten omistajan
tarkennus (*"Eikö Topografia voisi olla yhtä terävä kuin pää kartta?"*).
Raportti koskee VAIN jälkimmäistä — 5°-laattaversio poistettiin eikä
sitä ole haarassa.

## Luku, joka ratkaisi kaiken

Pyramidin syvin taso **z7 on 240 px/aste**
(`generoi-laattapyramidi.mjs`: TIHEYS 7,2 px/lautayksikkö × 12 000
yksikköä / 360°). 15 kaarisekuntia on 1/240 astetta. **z7 on siis
pikselilleen 15″:n tarkkuus** — ETOPO 2022 15″ ei jätä syvintä tasoa
vajaaksi eikä mene siitä hukkaan. Nykyinen 1′ (60 px/aste) riittää
z5:een; z6 ja z7 ovat sillä pelkkää suurennosta, ja juuri sen omistaja
näki puurona.

## Lähde ja lisenssi

NOAA NCEI **ETOPO 2022 15 Arc-Second Global Relief Model, "surface"**
(jääpinta — sama pinta kuin nykyisessä ETOPO1 Ice Surface -aineistossa,
jottei Grönlanti muutu toiseksi maailmaksi tason rajalla).
doi:10.25921/fd45-gt74. Yhdysvaltain liittovaltion viraston tuottamana
**public domain**.

Luku THREDDS:n **NetCDF Subset Servicellä**:
`https://www.ngdc.noaa.gov/thredds/ncss/grid/global/ETOPO2022/15s/15s_surface_elev_netcdf/ETOPO_2022_v1_15s_<LAATTA>_surface.nc?var=z&south=…&north=…&west=…&east=…&accept=netcdf`

Tämä oli koko selvityksen avain: **NOAA:n omat 15°-laatat ovat
netCDF-4:ää eli HDF5:tä** (tarkistettu: tiedosto alkaa `89 48 44 46`),
jota repon `lueNetCDF` ei osaa lukea eikä koneella ole GDALia
(`which gdalinfo` → ei mitään, ei sudoa). NCSS leikkaa ikkunan
palvelimen päässä ja palauttaa **klassisen netCDF:n (CDF-1)**, jolle
repossa on jo lukija. Uusia npm-paketteja ei tarvittu; WebP-pakkaus
menee `sharp`illa, joka on jo `devDependencies`issä.

## Putki, joka oli ennestään

- `tools/hae-korkeusruudukko.mjs` — 3′ reposta, 1′ R2:n 10°-paloista
  (`korkeuspalat-lukija.mjs`); `lueNetCDF` on sieltä viety ulos.
- `tools/tee-reliefikartta.mjs` — koko maailman ruudukko muistiin,
  varjostus, hypsometrinen väritys, Miller-projektio, **yksi** WebP.
  1′ = 21 600 × 10 800 (466 Mt Int16) on sen katto; **15″ olisi
  86 400 × 43 200 = 3,7 Gpx eli 7,5 Gt**, mikä ei mahdu muistiin eikä
  mihinkään WebP-kuvaan (katto 16 383 px sivulta).
- `js/linssit/topografia-tarkennus.js` — laastari lataa 10 800 px:n
  Miller-kuvan blobina (11,6 Mt) ja rajaa siitä
  `createImageBitmap(blob, sx, sy, sw, sh)`:lla ikkunan, jonka se
  projisoi riveittäin tasaväliseksi. Lähde on 30 px/aste.

## Mitä tein

`tools/tee-reliefipyramidi.mjs` (uusi, ainoa koodimuutos; linssin
koodiin ei koskettu).

- **Sama geometria kuin pääkartalla**: sama arkki (x 0, y −1046,31,
  w 12 000, h 7307,72 — ajo tulostaa ne ja ne täsmäävät
  generaattorin dokumentoituihin lukuihin), sama `tasonMitat`-kaava,
  sama 512 px:n laatta, sama `z<taso>/<sarake>/<rivi>.webp`.
- **Ikkunoittain, ei koko ruudukkoa**: yksi laatta = yksi NCSS-ikkuna
  (n. 518 × 414 solua) + 2 solun reunus. Reunus on pakollinen: ilman
  sitä varjostus peilaa laatan reunan ja jokaisen laatan ympärille jää
  yhden pikselin hiusviiva.
- **Värit ja varjo bittiä myöten samat** kuin 1′:n reliefillä: sama
  `reliefivarit.mjs` LUT, sama KALVO, liioittelu 12, sama aurinko. Tämä
  on yhteensopivuuden ehto — 15″-laatta liukuu vanhan kuvan päälle.
- Näyte on bilineaarinen Millerin käänteisprojektiolla riveittäin
  (x lineaarinen, y ei).
- Avomerilaatat ohitetaan (max korkeus < −200 m): 15″:n merenpohja on
  ETOPOssa itsessään interpoloitua eikä kerro 1′:tä enempää.
- Levyvälimuisti: keskeytynyt ajo jatkaa siitä mihin jäi.

## Koeajo: Alpit 5–15 °E, 40–48 °N, z7

| mitta | arvo |
| --- | --- |
| laatan koko | 512 × 512 px, 3–117 kt (laatu 88), **ka. 58 kt**; vuoristo 90–117 kt |
| ruudukko/laatta | ~518 × 414 solua = 0,86 Mt Float32 (muistihuippu) |
| aika/laatta | **2,12 s**, josta haku 1,5–2,3 s, väritys 20–36 ms, pakkaus 13–52 ms |
| koeajo | **36 laattaa, 2,05 Mt**, alue 5–15 °E / 40–48 °N |
| z7 koko maailmassa | 86 400 × 52 616 px, **169 × 103 = 17 407 laattaa** |
| kaikki tasot z0–z7 | 23 340 laattaa (z6 4420, z5 1118, z4 286, …) |

Vuoristolaatta on kallein tapaus; tasanko ja rannikko pakkautuvat
selvästi pienemmiksi. Alppikoe on maapainotteinen, joten sen mitattu
keskiarvo 58 kt kelpaa koko maailman arvioon. Oletuksella että ~35 %
arkista koskettaa maata (loput ohitetaan avomerenä):

- **z7: ~6 100 laattaa ≈ 360 Mt**
- **kaikki tasot: ~8 200 laattaa ≈ 430 Mt**
- **rakennusaika: ~3,4 h peräkkäin, ~50 min neljällä rinnakkaisella
  haulla** (aika on lähes kokonaan NOAA:n vasteaikaa, ei laskentaa).

Puhelimen muisti: yksi laatta purkautuu **786 kt:n RGBA-puskuriksi**.
390 px:n ruudulla z7:llä näkyy 2–3 laattaa sivulta eli enintään ~9
laattaa = **~7 Mt**. Vertailuksi nykyinen laastari lataa 11,6 Mt:n
blobin ja antaa purettavaksi 52 Mpx:n kuvan. Pyramidi on siis sekä
neljä kertaa terävämpi että kevyempi.

## Ehdotus: miten linssi kytketään (ei toteutettu)

1. **Topografialinssi lakkaa olemasta kuva.** `topografia-tarkennus.js`
   ja yhden kuvan haku korvataan pääkartan omalla laattapiirrolla:
   `js/laattapyramidi.js` saa toisen luettelo-osoitteen (esim.
   `reliefipyramidi.json`) ja piirtää reliefilaatat samaan arkkiin,
   samoilla tasoilla ja samalla lepokerrostempulla. Linssi ei tarvitse
   omaa moottoria — laastarin kynnyslogiikka (`tarkennusTarpeen`,
   `ikkunaRiittaa`, `millerRajaus`) käy tarpeettomaksi, koska tason
   valinta on jo pyramidissa.
2. **Astronautin kamera saa saman pyramidin.** Pallon kalvo tarvitsee
   tasavälisen ruudun; `piirraTasavaliseksi` osaa jo muuntaa
   Miller → tasaväli riveittäin. Erona vain se, mistä lähdepikselit
   tulevat: yhden ison kuvan rajauksen sijaan ladotaan näkyvän ikkunan
   peittävät pyramidilaatat apukankaalle Miller-avaruudessa, ja sama
   rivimuunnos ajetaan sen yli. Kaukozoomissa pallo pitää nykyisen
   4k/8k-kokopallotekstuurin (`reliefikuva.js`), ja pyramidi syttyy
   vasta kun ruudun tiheys ylittää sen — sama kynnysajatus kuin nyt,
   mutta jatkuvana tasoportaikkona.
3. **Versiointi ja polku R2:ssa.** Kansiotasolla kuten pääkartalla:
   `matkakirja/reliefipyramidi/<versio>/z<taso>/<sarake>/<rivi>.webp`.
   Vienti (omistaja/Fable avaimella, agentti ei vie):

   ```
   aws s3 cp <scratchpad>/alpit/ \
     s3://matkakirja/matkakirja/reliefipyramidi/20260918/ \
     --recursive --exclude "*" --include "*.webp" \
     --content-type image/webp --cache-control "public, max-age=31536000, immutable" \
     --endpoint-url https://<tili>.r2.cloudflarestorage.com
   ```

## Yksi virhe löytyi ja korjattiin

Koeajossa kaksi laattaa (sarake 89, lähdelaatan 15 °E:n raja) tuotti
ruudukon **86 918 × 443** pyydetyn 518 × 443 sijaan: 154 Mt muistia
yhdestä 512 px:n laatasta ja roskaa kuvaan. Syy: NCSS palauttaa
laatasta `N45E015` pituusasteet **375…377** eikä 15…17 — sama
meridiaani, mutta hilaindeksinä maailman toisella puolella. Korjattu
normalisoimalla pituusaste −180…180:een, ja mukaan tuli kaksi
tarkistusta (palan leveys ja sijainti), jotka kaatavat ajon jos NCSS
vastaa vielä joskus toisin. Rajalaatta on nyt 518 × 414 ja 90 kt
(ennen 9 kt roskaa). Yllä olevat koeluvut ovat korjausta EDELTÄVÄSTÄ
ajosta kahden rajalaatan osalta; muut 34 ovat oikein.

## Mitä jäi auki

- **Alemmat tasot (z0–z6) eivät ole ajettu.** Suunnitelma on
  alinäytteistää ne z7:n kuvista (reliefi on kenttä; sen oikea
  pienennös on keskiarvo — sama minkä nykyinen 1′-kuvakin tekee).
  Koodia downsamplaukselle ei ehtinyt tulla; z0–z5 voi myös leikata
  suoraan nykyisestä 1′-kuvasta, jolloin ne ovat valmiina heti.
- **Koko maailmaa ei ajettu** — 3,4 h ei mahtunut 45 minuutin kattoon.
  Alue-koe on ajettu ja työkalu osaa minkä tahansa `--alue`-rajauksen.
- **NOAA-riippuvuus** on kertaluontoinen nouto (kuten 1′:n
  korkeuspalat aikanaan), ei ajonaikainen. Jos halutaan omistajan
  30.8. päätöksen mukainen täysi riippumattomuus, 15″-korkeuspalat
  kannattaa viedä R2:een omaksi aineistokseen samalla kaavalla kuin
  `tee-korkeuspalat.mjs` — silloin pyramidin voi polttaa uudestaan
  ilman verkkoa.
- **`sharp`** on repon devDependency mutta ei työkalujen aiempi
  riippuvuus (`tee-reliefikartta.mjs` pakkaa python3 + Pillow'lla).
  Jos yhtenäisyys on tärkeämpää kuin lyhyys, pakkaaja vaihtuu
  kymmenen rivin muutoksella.
- Testiä ei kirjoitettu: työkalu ei muuta pelikoodia eikä mitään
  olemassa olevaa, ja arkin lukujen vartiointi (että ne pysyvät
  samoina kuin generaattorissa) kannattaa tehdä vasta kun laatat
  otetaan oikeasti käyttöön.

Tulokset (webp-laatat + `reliefipyramidi.json`) jäivät scratchpadiin
`…/scratchpad/reliefi15/alpit/`; repoon ei committoitu binaareja.

---

# Erä 2: luotettava haku, jatko ja alemmat tasot

Opus-agentti 18.9.2026 klo 01.37–02.20, sama haara. Erä 1:n koko
maailman z7-ajo kaatui 55 laatan jälkeen NOAA:n aikakatkoon
(`TypeError: fetch failed … ETIMEDOUT`). Tämä erä teki ajosta
sellaisen, että se kestää sen — eikä aloita alusta.

## 1. Haku kestää NOAA:n huonon hetken

`noudaNcss` sai kolme asiaa:

- **Aikakatko 60 s** (ennen 600 s). Mitattu vaste on 1,3–2,9 s, joten
  60 s on jo viisikymmenkertainen vara; vanha kymmenen minuuttia
  tarkoitti, että jumittunut yhteys söi kymmenen minuuttia ennen kuin
  kukaan huomasi mitään.
- **Viisi yritystä, eksponentiaalinen odotus** 2 → 4 → 8 → 16 s
  (katto 30 s). Uusinta tulostuu lokiin, joten NOAA:n huono hetki
  näkyy ajossa mutta ei kaada sitä.
- **Rinnakkaisuus `--rinnakkain N` (oletus 3)**: laatat ajetaan
  työjonona, N tekijää. Kolme on tarkoituksella pieni — aika on lähes
  kokonaan NOAA:n vasteaikaa, joten kolme kolminkertaistaa läpimenon,
  mutta kymmenen ei kymmenkertaista sitä vaan tuottaa juuri niitä
  aikakatkoja, joilta tässä yritetään välttyä.

**Yksi laatta ei enää kaada ajoa.** Virhe kirjataan, ajo jatkuu, ja
lopussa tulostuu yhteenveto kaatuneista laatoista (`process.exitCode`
= 2, jotta kutsuja huomaa). Sama komento `--jatka` hakee vain ne.

## 2. `--jatka`

Ohittaa laatan, jos **webp on jo kansiossa** TAI se on kirjattu
manifestiin **avomereksi**. Jälkimmäinen on jatkon toinen puolikas:
avomerilaatasta ei synny tiedostoa, ja ilman muistiinpanoa jatkoajo
hakisi jokaisen valtameren laatan uudestaan vain todetakseen sen taas
mereksi — koko maailmassa niitä on tuhansia eli useampi tunti turhaa
hakua. Manifestiin (`reliefipyramidi.json`) tuli siksi tasoittain
`meriLaatat: ["sarake/rivi", …]`, ja manifesti päivittyy **lisäten**:
tasot, joihin ajo ei koskenut, säilyvät. Jokaisen tason kohdalle
kirjataan myös levyn totuus (`laattojaLevylla`, `tavuaLevylla`), joka
luetaan kansiosta eikä laskureista.

`--pakota-laatat z7/89/35,z7/89/39` ajaa nimetyt laatat vaikka
`--jatka` ohittaisi ne (ja poistaa ne merikirjauksesta).

## 3. Alemmat tasot alinäytteistämällä

`--tasot 0-7`: **z7 haetaan NOAA:lta, z6…z0 tehdään z7:stä** neljä
pikseliä yhdeksi. Ajojärjestys pakotetaan (7, sitten 6, 5, …, 0)
riippumatta siitä, missä järjestyksessä numerot kirjoitettiin.

- Keskiarvo lasketaan itse (`puolita`) eikä jätetä sharpin
  resize-ytimen varaan: kahden suhteen pienennöksessä ei ole mitään
  valittavaa, ja lanczos teroittaisi rannikot yhdellä tasolla eri
  tavalla kuin edellisellä. sharp hoitaa vain webp:n purun ja pakkauksen.
- **Puuttuva (avomeri-)lapsi = meriväri**, joka on LUT:n arvo
  −4000 metrissä eli täsmälleen se sävy, jonka poltettu avomerilaatta
  olisi saanut. Jos kaikki neljä lasta ovat merta, vanhempikin on merta
  eikä sitä polteta — se kirjataan manifestiin.
- **Vajaa z7 ei estä alinäytteistystä.** Vanhemmiksi tulevat ne, joilla
  on levyllä edes yksi lapsi; puuttuvat lapset lasketaan ja tulostuvat
  (`12 lasta puuttui (vajaa z7)`).

## 4. Koeajo: Alpit uudestaan

```
NODE_USE_ENV_PROXY=1 node tools/tee-reliefipyramidi.mjs \
  --jatka --tasot 5-7 --rinnakkain 3 --alue 5,40,15,48 \
  --pakota-laatat z7/89/35,z7/89/39 --ulos <scratch>/reliefi15/alpit
```

- z7: **34 laattaa 36:sta ohitettiin valmiina**, 2 pakotettua ajettiin.
- z6: **12 laattaa** syntyi (0,66 Mt), z5: **6 laattaa** (0,18 Mt) —
  ei yhtään hakua.
- Manifesti päivittyi lisäten: z5, z6 ja z7 kaikki mukana.
- Ei virheitä.

Koelaatan z6/44/17 yläpuolisko on merivärinen, koska koealue loppuu
48 °N:ään eikä sen pohjoispuolisia z7-lapsia ole haettu. Koko maailman
ajossa ne ovat olemassa; tämä on juuri se vajaan tason käytös, joka
haluttiin.

## 5. Erä 1:n rajalaatat — ja niistä paljastunut uusi vika

Pakotetut z7/89/35 ja z7/89/39 ovat nyt oikein (silmällä tarkistettu:
Itävallan Alpit jokilaaksoineen ja Kroatian rannikko mannerjalustoineen,
ei tasaista vihreää). **Mutta katsominen paljasti uuden vian, joka ei
liittynyt erä 1:n pituusastebugiin:** laatan halki kulki tummanvihreä
pystyviiva 15 °E:n kohdalla.

Mittaus: liimatussa ruudukossa **yksi ainoa sarake** — 15 °E:n
itäpuolinen ensimmäinen solu — luki **145 m**, kun sen naapurit lukivat
859 ja 869. Syy on lähteessä: NOAA:n 15°-laatan oma pituusakseli on
tallennettu 360° siirrettynä (E015 on 375…390), ja tiedoston
ensimmäinen sarake palautuu tässä kääntymisessä vääränä. Sitä saraketta
ei voi hakea naapurilaatasta, koska naapurin aineisto loppuu
meridiaaniin.

Korjaus: **rajasolu ei ole lähde vaan naapuriensa keskiarvo.** Hinta on
yksi 15″:n sarake (n. 460 m) joka 15. asteella; virhe on korkeintaan
rinteen kaarevuus 460 metrin matkalla. Sama tehdään leveyspiirin
rajalla, jottei sama rakenne yllätä toisessa suunnassa.

Mitattu vaikutus laatassa z7/89/35: pahimman sarakkeen naapurierotus
putosi **295 → 83**, kun laatan oma keskiarvo on 45 — eli sauma katosi
tavalliseen maastoon. **Tämä vika oli koko maailmassa jokaisen 15°:n
meridiaanin kohdalla**, eli erä 1:n 55 laattaa ja Alppikokeen laatat
kannattaa polttaa uusiksi (jatkoajo tekee sen vain, jos ne poistaa
ensin — ks. alla).

## 6. Komento, jolla koko maailman ajo jatkuu

```
NODE_USE_ENV_PROXY=1 node tools/tee-reliefipyramidi.mjs \
  --jatka --tasot 0-7 --rinnakkain 3 \
  --alue -180,-58,180,76 \
  --ulos <scratch>/reliefi15/maailma
```

Ajon voi keskeyttää milloin tahansa ja käynnistää samalla komennolla
uudestaan: valmiit laatat ja kirjatut avomerilaatat ohitetaan.

**Huom. saumakorjaus.** Kansiossa olevat 55 laattaa on poltettu ennen
kohdan 5 korjausta. Jos niissä on 15°:n meridiaani (osalla on), ne
jäävät `--jatka`-ajossa ennalleen. Puhtain on poistaa `maailma/z7`
kokonaan ennen käynnistystä — levyvälimuisti (`$TMPDIR/matkakirja-
reliefi15`) säilyy, joten uusiksi polttaminen ei hae niitä NOAA:lta
vaan lukee levyltä, eli se maksaa sekunteja.

**Arvioitu kesto.** Alue kattaa z7:llä **12 859 laattaa** (koko arkki
17 407). Jokainen vaatii yhden haun, myös avomerilaatta — meri
todetaan vasta aineistosta. Mitattu haku 1,3–2,9 s + käsittely
50–80 ms; kolmella rinnakkaisella **noin 0,75 s/laatta** eli

- **z7 ≈ 2,5–3,5 tuntia**
- z6…z0 (4 439 laattaa) alinäytteistyksenä **noin 4 minuuttia**, ei
  yhtään hakua
- **yhteensä noin 3 tuntia**, NOAA:n vasteajan mukaan

Rinnakkaisuutta voi nostaa (`--rinnakkain 5`) jos NOAA kestää; yli
viiden ei kannata mennä, koska aikakatkot alkavat syödä hyödyn.

**Muisti ja levy.**

- Node: kolme tekijää × (ikkuna 0,86 Mt Float32 + RGB 0,64 Mt + webp)
  ≈ **alle 100 Mt RSS**. Alinäytteistyksen huippu on yksi
  1024 × 1024 × 3 = **3 Mt** puskuri kerrallaan.
- Tulos levylle: z7 arviolta **4 500–6 000 maalaattaa ≈ 260–360 Mt**,
  kaikki tasot yhteensä **noin 350–480 Mt**.
- **Levyvälimuisti `$TMPDIR/matkakirja-reliefi15` kasvaa noin
  2,2 Gt:iin** (mitattu 174 kt/ikkuna × 12 859). Se on välimuisti, ei
  tulos — sen voi poistaa ajon jälkeen, mutta ennen uudelleenpolttoa
  kannattaa säilyttää.

## Mitä yhä on auki

- Laattoja ei ole viety R2:een (agentti ei vie; vientikomento erä 1:n
  osiossa).
- Linssiä ei ole kytketty pyramidiin — ehdotus on erä 1:n osiossa
  "Miten linssi kytketään", eikä `js/linssit/`-koodiin ole koskettu.
- Testiä ei vieläkään ole; työkalu ei muuta pelikoodia.
