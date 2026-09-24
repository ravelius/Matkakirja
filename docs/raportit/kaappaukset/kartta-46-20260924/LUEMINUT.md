# Löydös 46: Kreikan peruskartta, kuvavedokset A / B / C (24.9.2026)

Karttasepän apuagentti, haara `karttaseppa-kartta46`. Vain vedoksia: ei
polttoa eikä ämpärikirjoituksia. Kaikki kolme vedosta on piirretty
generaattorin omalla piirrolla (`tools/generoi-laattapyramidi.mjs`), joten
sama resepti voidaan polttaa sellaisenaan. Erillistä kuvankäsittelyä ei ole,
vain laattojen kokoaminen yhdeksi kuvaksi.

## Kuvat

| Tiedosto | Mitä |
| --- | --- |
| `A-nykyinen.jpg` | Tuotanto: pyramidi `2026-09-23a-pohja` + `2026-09-23a-viivat`, z6, koottu ämpärin laatoista |
| `B-rannat-meri.jpg` | B: ranta vektorista + AA-maski, meri rauhallisempi |
| `C-rannat-meri-reliefi.jpg` | C: B + GLO-30-reliefi (monisuuntainen varjo, rinnevarjostus, lämmin hypsometria) |
| `A-lahikuva-peloponnesos-z8-2x.jpg` | Tuotannon pallolaatat `2026-09-23a-pohja-20260923a` Z8 eli se, mitä iPad lataa; 2× lähin pikseli |
| `B-lahikuva-…`, `C-lahikuva-…` | Sama rajaus: pyramidi z7 → pallo Z8 uudella näytteistyksellä (ks. alla); 2× lähin pikseli |

Yleiskuvat: Millerin arkki z6, 1344 × 1087 px, lon 19,0–30,2, lat 34,2–42,0,
sama rajaus joka kuvassa. Viivataso (rajat, reitit) on sama tuotannon
`2026-09-23a-viivat` kaikissa kolmessa. Lähikuvat: Mercator Z8, lon 21,0–23,6,
lat 36,3–38,4, suurennettu 2× lähimmällä pikselillä, jotta porras näkyy
sellaisenaan.

Todennus: A-reseptin uusinta tällä haaralla (uudet liput pois) antoi z6-
laatan 46/20, jonka pikselit ovat tavulleen samat kuin tuotannon laatassa
(keskiero 0, suurin ero 0). Muutokset eivät siis koske nykyisiä polttoja.

## Juurisyyt

**1. Rantaviiva portaikkona.** Neljä kerrosta, joista kolme on pohjassa:

- *Rantaviivaa ei ole natiivin pohjassa lainkaan.* Pohja poltetaan
  `--ilman-rantaviivaa` (rantaviiva on webissä omalla rantatasollaan), ja
  pallon sarja kootaan ilman rantatasoa (`laatat.json`: `"ranta": null`).
  Maan ja meren raja on siis pelkkä väriraja.
- *Väriraja on 1-bittinen.* `maailmapiirto.js` kysyy jokaiselta pikseliltä
  yhden pisteen (keskipiste) meren monikulmiosta, joten raja on
  antialiasoimaton porras (z6:lla porras on 0,93 km).
- *Miller → Mercator lähimmällä pikselillä.* `tee-pallolaatat.mjs` lukee
  lähdetason z = Z − 1 lähimmän pikselin. Kreikan leveyksillä lähde on noin
  1,3 × (vaaka) ja 1,2 × (pysty) tiheämpi kuin kohde, joten joka kolmas tai
  neljäs lähdepikseli jää epäsäännöllisesti väliin. Porras muuttuu
  epätasaiseksi ja ohuet viivat (isobaatit, vesiviivoituksen sisin viiva)
  katkeilevat.
- *JPEG 80, 4:2:0.* Värin alinäytteistys puolittaa ruskean ja harmaan
  rajan 2 × 2 -ruuduiksi.
- *Omistajan kuvan paksu tumma ääriviiva ei ole pohjassa.* Se on natiivin
  `Maaraja` (pelaajan maan korostuskehä, `maapolygonit.geojson`, 1,6–3
  css-px eli iPadilla 3–6 laitepikseliä, GSHHG full + DP 0,2 yksikköä).
  Siksi se kiertää vain Kreikan saaria eikä Turkin rannikkoa. Leveänä
  viivana GSHHG:n täysi yksityiskohta lukee rosoisena. Tämä on
  Natiivisepän kerros: kun ranta on pohjassa (B/C), kehän voi ohentaa
  (≈ 1–1,5 css-px) tai rajata pelkkiin maarajoihin.

**2. Reliefi haalea ja laikukas.** z0–z6 piirretään ETOPO 3′ -ruudukosta
(5,5 km solu, z6:lla 6 px). Varjo on yksi valo luoteesta (315°/42°, liioittelu
2,6), ja se vain tummentaa (0,46 · (0,5 − valo)): valoisa rinne ei vaalene,
eikä rinteen jyrkkyys näy suunnasta riippumatta. Lisäksi hypsometria saa
korkeuteen kohinaa ±190 m (26 px) ja ±60 m (7 px), ja hypsometria on
0–900 m:n välillä lähes yhtä kermaa. Näistä syntyvät laikut. z7–z8 käyttää
ETOPO 1′:tä, joka on sekin z8:lla 8 px solua kohti.

**3. Meri täynnä käyriä.** `--syvyyskayrat 200,1000,3000 --syvyyskayrapeitto 0.55`
merkitsee isobaatiksi jokaisen pikselin, jonka vyöhyke eroaa naapurista. Viiva
on 1 px, antialiasoimaton, ja sen paikkaa heilutetaan kohinalla (±150 m).
Egeanmeri on lähes kokonaan 200–1000 m, joten 200 ja 1000 metrin käyrät
kiertelevät koko meren. Lisäksi `--vesiviivoitus tumma` (6 viivaa, voima 0,42)
kiertää jokaista luotoa. Rantaetäisyys lasketaan chamfer-kentästä, joten
viivat ovat kulmikkaita.

## Reseptit

Yhteiset kaikille (tuotannon 23a:n mukaan): `--data <gshhs-data>
--rannikon-harvennus 0.004 --laatu 0.9 --patina kevyt --joet-pohjaan
--syvyyskohina lauta --koristeet assets/koristeet/meri/pallo-koristeet.json`.
Vedoksissa `--tasot 6 --kaariminuutit 3 --alue 18.6,33.8,30.4,42.3` ja
lähikuvissa `--tasot 7 --kaariminuutit 1 --alue 20.8,36.0,23.9,38.7`.

**A (tuotanto 23a):** `--ilman-rantaviivaa --vesiviivoitus tumma
--syvyyskayrat 200,1000,3000 --syvyyskayrapeitto 0.55 --resepti-json
'{"syvyys":{"litistys":0.8},"vesiviivoitus":{"harvennus":"haive"}}'`;
pallo `tee-pallolaatat.mjs --ilman-rantaa` (lähin pikseli, JPEG 80).

**B (rannat + meri), muutokset A:han:**

- `--ilman-rantaviivaa` pois: rantaviiva (usva + muste, `RANTATYYLI`)
  poltetaan pohjaan canvas-vetona GSHHG-vektorista, antialiasoituna.
- `--maski-aa 4` (UUSI): maan ja meren raja peittosuhteena. Pikselin
  meriosuus lasketaan neljällä alirivillä, ja rivin sisällä se lasketaan
  tarkasti leikkauskohdista. Sekapikseli saa maan ja meren värien
  sekoituksen. Maski ja rantaviiva tulevat samasta GSHHG-renkaasta.
- `--rantaleveys 0:0.55,4:0.7,5:0.85,6:0.95,7:1,8:1.1` (UUSI):
  rantaviivan leveyskerroin tasoittain. Karkeilla tasoilla muste ohenee,
  jolloin pikkusaaret eivät muutu mustetäpliksi.
- `--syvyyskayrat` pois (isobaatit kokonaan pois; vaimea vaihtoehto on
  `--syvyyskayrat 200 --syvyyskayrapeitto 0.2`).
- `--vesiviivoitus ohut` + `--resepti-json
  '{"syvyys":{"litistys":0.8},"vesiviivoitus":{"harvennus":"haive","voima":0.3}}'`:
  4 hentoa, rannasta häipyvää viivaa (1800-luvun rantaviivoitus) kuuden
  tumman sijaan.
- Pallo: `tee-pallolaatat.mjs --suodatin laatikko --jpeg-laatu 90
  --jpeg-444` (UUSI): 3 × 3 alinäytteen pinta-alakeskiarvo lähimmän pikselin
  sijaan, JPEG 90 ilman värin alinäytteistystä.

**C (B + reliefi), muutokset B:hen:**

- `--dem <copernicus-glo30> --dem-kaikki-tasot` (UUSI lippu): GLO-30-
  ikkuna myös tasoille z0–z8 (ennen vain z9+). Väli = tason pikseli
  (z6 30″, z7 15″, z8 7,5″), COG-yleiskuvista, ETOPO varalla ruutujen
  ulkopuolella (sama häivytys kuin syvillä tasoilla).
- `--reliefi-koe lammin` (UUSI): monisuuntainen rinnevarjo (270° 0,22 /
  315° 0,5 / 0° 0,28, korkeuskulma 45°, liioittelu 1,7). Valo vaalentaa ja
  varjo tummentaa lämpimään ruskeaan (92,70,56). Rinnevarjostus
  (1 − cos kaltevuus) × 0,35. Lämmin hypsometria kermasta (238,229,194)
  ruskeaan (132,94,66) 3 500 m:iin. Korkeuskohina on 25 % entisestä.
  Paperin pigmentti, laikku, patina ja pergamentti säilyvät ennallaan. JSON
  yhdistyy oletuksiin (esim. `'{"liioittelu":2}'`).

Pindos, Taygetos, Parnon, Psiloritis ja Lefka Ori erottuvat z6:lla ylhäältä.
Tessalian ja Makedonian tasangot jäävät kermaksi.

## Koodimuutokset haarassa (kaikki oletuksena pois)

- `tools/fokuskartta/maailmapiirto.js`: asetukset `maskiAA`, `rantaKerroin`
  ja `reliefi`; `rivienLeikkaukset(N)` aliriveille (N = 1 on entinen).
- `tools/generoi-laattapyramidi.mjs`: liput `--maski-aa`, `--rantaleveys`,
  `--reliefi-koe` ja `--dem-kaikki-tasot`.
- `tools/tee-pallolaatat.mjs`: liput `--suodatin laatikko`, `--jpeg-laatu`
  ja `--jpeg-444`.

## Arvio täydestä poltosta ja vaikutukset

Mitattu tässä (sama ala, kuormitettu kone): piirtoaika z6 Kreikka A 64 s,
B 57 s, C 57 s + DEM-ikkuna 37–73 s. AA-maski ja uusi reliefi eivät
siis maksa piirrossa mitään mitattavaa. Kustannus tulee DEM-ikkunoista ja
pallon suodattimesta.

- **B maailmalle:** pohja z0–z8 ~75 min (sama kuin 23a: 71 min, 114
  shardia, 16 ydintä, yöllä). Pallon sarja Z0–Z8 suodattimella ~20–35 min
  (23a lähimmällä pikselillä ~6–10 min; laatikko tekee 9 hakua pikseliä
  kohti). Yhteensä ~1,5–2 h.
- **C:** DEM kaikille tasoille ei mahdu nykyiseen shardijakoon. z0–z6 on
  yksi koko maailman shardi, ja maailman z6-ikkuna 30″:llä olisi ~1,5 Gt
  Int16:ta yhtenä `korkeus.bin`-tiedostona. Tarvitaan z5–z6 kaistoiksi ja
  DEM-ala rajattuna E28-laatikkoon (-25,34,45,72; muualla ETOPO samalla
  reliefikaavalla, tai GLO-90, jota NAS:issa on 26 476 ruutua ja jota varten
  `demHakemisto` tarvitsee tunnuksen 30). Työ on noin puoli päivää koodia.
  Poltto ~2,5–3,5 h (DEM-luku NAS:ilta per kaista) + pallo 20–35 min.
- **Vaikutus muihin sarjoihin:** uusi pohjaversio tarkoittaa kaikkea tätä:
  - uusi pallotunniste, ja natiivin `KarttaKerrokset`- ja
    `PALLO_LAATTA*`-osoittimet vaihtuvat
  - sileä sarja (`…rajaton`, ~20–35 min) poltetaan uudelleen
  - kermahuntu `2026-09-23a-p080` (27 maata + `_maailma`, lasketaan pohjasta)
    lasketaan uudelleen, arviolta 0,5–1 h (ei mitattu)
  - syvät tasot eli Ranska z9–z10 ja E28 z9–z10 (tämän yön ajo ~4,75 h 16
    prosessilla) on poltettava samalla reseptillä, muuten tyyli hyppää
    tasolla Z9/Z10
  - viiva-, nosto- ja nimiötasoa ei tarvitse piirtää uudelleen (sisältö
    sama), mutta polttoskripti vaatii uudet versiot kuten 22b:ssä
  - Webissä rantaviiva on jo rantatasolla. B/C:n ranta pohjassa piirtyisi
    tasokartalla kahdesti, joten tuotantoon valitaan jompikumpi:
    (a) pohja yhä `--ilman-rantaviivaa` ja uusi rantataso samalla
    `--rantaleveys`-kertoimella sekä pallon sarjaan `--pallon-ranta`, tai
    (b) ranta pohjassa ja tasokartta lakkaa lataamasta rantatasoa.
    AA-maski tarvitaan molemmissa.
- **Natiivi:** `Maaraja`-kehän leveys kannattaa arvioida uudelleen, kun
  ranta on pohjassa (ks. juurisyy 1).
