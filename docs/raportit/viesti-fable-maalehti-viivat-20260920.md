# Opus 2 → Fable: Maalehden viivat (A rannikko, E joet)

20.9.2026 klo 00.45. Haara `opus2-maalehti-viivat` (pohja origin/main,
v1968). Ei versionostoa eikä PR:ää. Raamatun JONOSSA kohdat A ja E.

## E. Jokien piikit ja siksakit — KORJATTU

### Juurisyy

Vika ei ole `tools/fokuskartta`-puolella. Maalehteen poltetut uomat
tulevat toisesta putkesta:

```
ne_10m_rivers_lake_centerlines
  → tools/hae-vedet.mjs      ketjuta → rdp(0,07°) → pyöristys 0,1°
  → js/packs/maasto-vedet.js
  → tools/tee-maasto.mjs     lautakoordinaatit, pyöristys 0,1 yksikköä
  → tools/tee-maastonimet.mjs
  → js/packs/maailmankartta-nimet.js
  → pohjalaatat (joet jäävät pohjaan, eivät viivatasolle)
```

Kaksi vikaa samassa kohdassa:

1. **Ramer–Douglas–Peucker on jännevirheen yksinkertaistin.** Voimakkaasti
   meanderoivalla joella se säilyttää vain mutkien kärjet ja pudottaa
   kaiken väliltä, jolloin kaksi peräkkäistä jäljelle jäävää pistettä ovat
   meanderirivin vastakkaisilla reunoilla — viiva kääntyy lähes 180°.
   Seinen mutka-amplitudi on juuri yli vanhan toleranssin 0,07°, Loiren
   selvästi alle. Juuri siksi vika näkyi Seinellä eikä Loirella.
2. **Pyöristys 0,1° (≈ 11 km) oli karkeampi kuin toleranssi**, joten se
   siirsi säilytettyjä kärkiä jänteen toiselle puolelle ja teki lisää
   piikkejä.

Vaihe vaiheelta Seine: raaka ketju 353 pistettä / 1 piikki → RDP 0,07°
21 pistettä / 8 piikkiä → pyöristys 21 pistettä / 7 piikkiä. Vaiheen
tulos oli bitilleen sama kuin `maasto-vedet.js`:ssä, eli putki on
todistettu oikeaksi.

Osien järjestys, haarat ja ketjutus eivät ole syy: `viivaPolku` tekee
`moveTo`:n jokaisen osan alussa, eikä `ketjuta` yhdistänyt Seinelle kuin
yhden ketjun.

### Korjaus

`tools/hae-vedet.mjs` (osio UOMAN SILOTUS):
- liukuva keskiarvo (ikkuna 5, päätepisteet paikallaan) ennen harvennusta
- toleranssi 0,07° → 0,04°
- piikkisuodatin: kärki, jossa käännös on yli 120°, pudotetaan
- pyöristys 0,1° → 0,001° (≈ 100 m)

`tools/tee-maasto.mjs`: sama piikkisuodatin lautakoordinaattien
pyöristyksen jälkeen. Neljä piikkiä (Tonava, Kolyma, Don, Olenjok) syntyi
vasta siinä, kun lähde oli jo siisti.

### Mitatut luvut (kulmapiikki = käännös yli 120°)

| aineisto | ennen | jälkeen |
|---|---|---|
| `js/packs/maasto-vedet.js` (169 uomaa) | 225 piikkiä / 4 785 pistettä | **0** / 6 090 |
| `js/packs/maailmankartta-nimet.js` (123 uomaa, tämä poltetaan) | 180 piikkiä / 4 330 pistettä | **0** / 5 525 |
| Seine | 7 piikkiä / 21 pistettä | **0** / 24 |

Pistemäärä kasvaa 28 %, `maasto-vedet.js` 91 → 138 kt ja
`maailmankartta-nimet.js` 152 kt. `node --test`: 3709 / 0.

Pahimmat ennen: RUS 65 piikkiä, CHN 29, BRA 15, IND 15, UKR 15, CAN 11,
ROU 9, USA 9, **FRA 8 (Seine 7)**. 40 maalla oli vähintään yksi.

### SINUN PÄÄTÖKSESI: polttamatta

Joet ovat **pohjalaatoissa**, eivät viivatasolla, joten korjaus näkyy
pelaajalle vasta kun pohjapyramidi poltetaan uudelleen — se on yksi
globaali ajo (n. 23 000 laattaa, 1,2 Gt), ei maakohtainen. En aloittanut
sitä. Kaksi vaihtoehtoa:

1. Poltetaan pohja kerran uusiksi tällä datalla.
2. Siirretään joet pohjasta viivatasolle (kuten reiteille tehtiin
   31.8.2026), jolloin tämä ja tulevat jokikorjaukset maksavat vain
   läpinäkyvän viivatason ajon. Vaatii silti yhden pohja-ajon nyt, jotta
   vanhat piikikkäät uomat katoavat.

## A. Rannikon kaksoisviiva ja irralliset silmukat — MITATTU, EI KORJATTU

### Juurisyy: kaksi eri aineistoa piirtää saman rannikon

Laatat eivät ole syy. Mittasin ämpärin laatat (z7/81/37, Gironde):
pohjalaatassa ei ole rantaviivaa (tummin kirkkaus 189), rantataso ei ole
pallolla käytössä (`laatat.json` `"ranta": null`) ja FRA:n väritaso on
pelkkä kermapeite ilman mustetta.

Viiva tulee **kahdesta vektorikerroksesta**:

| | rannikkoviiva | oman maan korostuskehä |
|---|---|---|
| lähde | `ne_10m_ocean`, harvennus 0,006° | `assets/data/maapolygonit.json` = `ne_10m_admin_0_countries` |
| harvennus | LOD, tarkimmalla tasolla 0 | DP 0,2 lautayksikköä + kvantisointi 0,1 yks (≈ 334 m) |
| leveys | 0,8–1,2 css-px | 2,1–3,1 css-px |
| piirtojärjestys | −0,5 | −0,45 (päällä) |

Korostus on päällä vain pelaajan omassa maassa, joten ilmiö näkyy
Ranskassa eikä muualla — täsmälleen kuten omistaja kuvasi.

Irralliset silmukat ovat korostuksen suljettuja renkaita: Ranskalla 16,
joista 8 alle 100 km kehältään (Ré ja Oléron piirtyvät kahtena
sisäkkäisenä silmukkana). Gironden suisto on molemmissa aineistoissa
55 km pitkänä kapeana lahtena, piirrettynä kahdesti 70–468 m erillään.
Koko maailmassa rannikkomaita on 99 ja korostusrenkaita 2 531, joista
1 844 alle 100 km.

### Mitattu ero ja kokeillut korjaukset

Lähimmässä pallozoomissa (60 lautayksikköä ≈ 98 m/px iPadilla):

| | mediaani | p95 | maksimien mediaani | suurin |
|---|---|---|---|---|
| nykyinen | 72 m | 173 m | 705 m | 1 108 m (Kypros) |
| tarkkuus 0,02 yks + kvantisointi 0,01 | **8 m** | **55 m** | 677 m | 1 093 m |

**Kokeilin tarkkuuden noston ja hylkäsin sen:** tiedosto kasvaa
1,45 → 3,17 Mt, mutta kaappaus Girondesta on silmämääräisesti sama.
Ero on jo alle pikselin siellä, missä aineistot ovat samaa mieltä; se
mikä näkyy, on maksimipoikkeama — kohdat, joissa `admin_0` ja `ocean`
ovat eri mieltä rajan kulusta (suiston sulkeva viiva). Tarkkuus ei siis
korjaa sitä, ja kasvu olisi turha.

**Kokeilin myös sädekehän** (korostus rannikkoviivan ALLE, leveys
3,2–5 px, peitto 0,55): kaappauksessa rannikko lukee yhtenä viivana,
jonka reuna on pehmeä, ja kaksoisviiva häviää siltä osalta kuin
poikkeama on pieni. Suiston sisempi silmukka jää.

### SINUN PÄÄTÖKSESI: mikä on "yksi maski"

1. **Sädekehä** (kevyin, ei aineistomuutosta, ei kokoa): korostus alle ja
   leveämmäksi. Kaappaus `docs/raportit/kaappaukset/maalehti-viivat-20260920/`.
2. **Rakenteellinen, yksi auktoriteetti:** korostuksen rannikko-osuus
   naulataan `ne_10m_ocean`-renkaaseen jo `tools/generoi-maapolygonit.mjs`:ssä
   (kärjet alle 1,5 km päässä siirretään rannikkorenkaalle) tai
   `js/pallovektorit.js` jättää korostusjanat piirtämättä siellä, missä
   rannikkoviiva jo piirtää. Tämä poistaa myös suiston silmukan, mutta
   muuttaa oman maan rannikon korostuksen luonteen.
3. Tarkkuuden nosto — **en suosittele**, ks. mittaus yllä.

Kerro kumpi, niin teen sen. Sivulöydökset:
`tools/maamaski.mjs`:n docstring väittää ne50:n olevan pelin rantaviivan
lähde (ei ole, lähde on 1:10M), ja `pyramidi.json`:sta puuttuu
`pohja.rantaviiva: false`, vaikka pohja on mitatusti rannaton.
