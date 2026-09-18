# Viesti Fablelle: tekstit piilossa, kuvat lentävät matkakirjaan (18.9.2026)

Raamattu **KARTTAUUDISTUKSEN PAATOKSET 38** (omistaja 18.9.2026 klo 20.10):
*"onhan isoisan ja pulun tekstit piilossa? ne pitavat tulla nakyviin vain
klikattaessa. samoin kun kuvat siirtyvat matkakirjaan, niin se pitaisi vain
nakya animaationa, missa kuvat lentavat matkakirjan ylareunaan, mutta
matkakirja itse pysyy pienennettyna."*

Haara: `claude/bold-ride-vow4ki-kuvat-lentavat`. Versiota EI nostettu (Fable
päättää julkaisun). PR:ää ei avattu ohjeen mukaan.

## 1. Mitä muuttui

### OSA 1 — tekstit piilossa kaikilla laitteilla

`js/ui.js` `kaynnistaLuentavahti` (~rivi 11630): luennan päättyessä kortti
palautui ennen auki työpöydällä (`asetaPaivakirjanKoko(puhelinTila())`).
Nyt haara vain nollaa `luennanKortinKutistus`-lipun eikä kosketa kortin
kokoon: **lappu jää lapuksi kaikilla ruuduilla**, ja kortin avaa vain
pelaajan oma napautus (`factCardin` click- ja keydown-kuuntelija, jotka
olivat jo olemassa). Kommentti "Puhelimella lappu jää lapuksi (v1891),
työpöydällä kortti palaa auki" on korvattu uudella säännöllä.

Muut luennan päättymispolut tarkistettu, EI muutettu:

- `ohitaSaapumisluenta` (js/fokusvirta.js) ei koske korttiin lainkaan.
- `ajastaKortinPalautus` avaa kortin vain kun `luentaKesken()` on tosi JA
  `luennanTekstipiilo()` on epätosi — luennan loppu ei siis kulje siitä.
- Saapumisen alku (`aloitaMerkinta` → `asetaPaivakirjanKoko(tekstitPiilossa())`)
  jätettiin koskematta, kuten tehtävänannossa pyydettiin.

### OSA 2 — kuvat lentävät lapun yläreunaan

Uusi `lennataKuvatMatkakirjaan(ui, elementit)` (js/fokusvirta.js) + css-parit
`.fokusvirta-lentokerros` ja `.fokusvirta-lento` (css/fokusvirta.css).

- FLIP samalla mallilla kuin `avaaSuurennos` (`ankkuriMuunnos`): lähtölaatikko
  luetaan ruudulta, maali lasketaan `.fact-cardin` rectistä lennon alussa, ja
  matka tehdään yhdellä `transform`-siirtymällä. Kesto 600 ms, pehmennys
  `SUURENNOS_PEHMENNYS` (cubic-bezier(0.22, 0.9, 0.24, 1)), häipymä 220 ms
  lennon loppuun ajoitettuna. Useampi kuva porrastuu 120 ms:n välein.
- Kohde: lapun **yläreunan keskikohta**, koko kutistuu pikkukuvan mittaan
  (3,1 rem, luettu juuren fonttikoosta — sama mitta kuin `.fact-pikkukuva`).
- **Lappu ei muutu:** lennossa ei kutsuta `asetaPaivakirjanKoko`-metodia eikä
  kosketa kortin luokkiin. Jos pelaaja on avannut kortin, kuva lentää auki
  olevan kortin yläreunaan avaamatta/sulkematta sitä.
- Klooni omassa kiinteässä kerroksessaan (z-index 47), koska iso päällys
  puretaan samalla hetkellä; päällys poistetaan heti kun lento lähti, jottei
  sama kuva sekä häipyisi paikalleen että lentäisi.
- `prefers-reduced-motion`: `lennataKuvatMatkakirjaan` palauttaa 0, ja kutsuja
  häivyttää kuvan entiseen tapaan paikalleen. Sama jos lappua ei ole DOMissa
  tai sen rect on tyhjä.

Kutsupaikat (kolme, kaikki olemassa olevia poistumispolkuja):

1. `paataLuentakuvasarja` — sarjan loppu (`ISON_KUVAN_LOPPU_MS`, pulun sarjan
   loppu) ja kartan liike (`heti`).
2. `ohitaSaapumisluenta` — **heti Ohita-lipun jälkeen**, ENNEN
   `vaiennaLivianKaupunkipuhe`-kutsua. Tämä oli ensimmäisen mittauksen ainoa
   punainen: vaiennus on kaupungista lähdön tie ja vie luentakuvan mukanaan
   (`piilotaLuentakuva` → `piilotaLuentakuvasarja`), joten sen perässä lentoja
   oli 0. Juurisyy kirjattu koodikommenttiin.
3. `pienennaLuentakuva` (LUENTAKUVAPAKKA_KARTALLA = false -haara) — ankkuroidun
   paneelin poistumishetki (luennan loppu, kartan liike).

Kaupungista lähtö, laudan vaihto ja uuden luennan siivous EIVÄT lennä: niiden
polku on `piilotaLuentakuvasarja`/`piilotaLuentakuva` suoraan, eikä siihen
koskettu. Kortin lopun pikkukuvat (`paivitaMatkakirjanPikkukuvat`) ennallaan.

## 2. Mittaus

`tools/savukkeet/savuke-luentakuvat.mjs` (ent. `mittaa-luentakuvat.mjs`,
ks. kohta 4), Pariisin saapuminen, PORTTI=8820, Mac Studio:

```
53/53 vartiota läpi
```

Vanhat PAATOKSET 35 -vartiot (16) ennallaan vihreinä; uusia 37 kpl (osa
molemmilla ruuduilla). Luvut:

| | 390 × 844 | 1400 × 900 |
|---|---|---|
| lentäviä kuvia sarjan lopussa | 2 | 2 |
| näytteitä lennosta (kehyksittäin) | 57 | 54 |
| lähtölaatikko | 287,1 × 194,9 @ y 294,4 | 831,4 × 568,0 @ y 146,3 |
| loppulaatikko | 49,6 × 33,7 @ y 66,2 | 49,6 × 33,9 @ y 73,4 |
| lapun yläreuna / keskilinja | 66,2 / 110 | 73,4 / 123 |
| etäisyys maaliin alku → loppu | 239 → 0 px | 567 → 0 px |
| pikkukuvan koko | 50 px | 50 px |
| lapun näytteitä lennon aikana | 78 | 69 |
| kortti luennan jälkeen | `card fact-card pieni` | `card fact-card pieni` |
| Ohita → lentoja | 1 | 1 |

Vartiot (kaikki vihreitä molemmilla ruuduilla):

- luenta kutistaa kortin lapuksi; **luennan loppu EI avaa korttia**; napautus avaa
- kuvat lähtevät lentoon sarjan lopussa; laatikkoa mitattiin ≥ 3 kehyksessä;
  laatikko liikkuu kohti lapun yläreunaa
- loppupiste lapun yläreunassa ±8 px ja keskilinjalla ±8 px (mitattu 0,0 px ero)
- loppukoko ≤ pikkukuvan koko (49,6 ≤ 50)
- lappu ei liikahda eikä sen luokkalista muutu lennon aikana; lappu on yhä
  `pieni` lennon jälkeen
- Ohita laukaisee saman lennon
- ei sivuvirheitä

Yksikkötestit: `node --test tests/*.test.mjs` → **# pass 3628, # fail 0**
(skipped 13). `node tools/build-standalone.mjs` → dist/matkakirja.html 32713 kt.
`node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia.
`node tools/savukkeet/rakenna-matriisi.mjs julkaisu` rakentuu.

## 3. Kaappaukset (Fable katsoo)

`tools/savukkeet/kaappaukset/kuvat-lentavat/`

- `kuvat-lentavat-1.png` — lento alkaa: ensimmäinen kuva jo pienenä ylhäällä
  matkalla lappuun, toinen vielä isona keskellä (390 px)
- `kuvat-lentavat-2.png` — lennon keskivaihe
- `kuvat-lentavat-3.png` — viimeinen kuva saapuu lapun yläreunaan pikkukuvan
  kokoisena ja häipyy; lappu on yhä yhden rivin lappu
- `lappu-jaa-lapuksi.png` — luennan päätyttyä kortti on lappuna (ei aukea itse)

## 4. Viereiset havainnot (en korjannut)

1. **Savuke nimettiin uudelleen.** `tools/savukkeet/mittaa-luentakuvat.mjs`
   → `tools/savukkeet/savuke-luentakuvat.mjs`, koska
   `tools/savukkeet/rakenna-matriisi.mjs` hyväksyy julkaisusarjaan vain
   `savuke-*.mjs`-nimisiä tiedostoja (`kaikkiSavukeTiedostot`), ja
   sarjat.jsonin rivi olisi muuten kaatanut matriisin. Lisätty
   `sarjat.json`:n `julkaisu`-listaan (`savuke-nimikyltti.mjs`:n jälkeen) ja
   `asetukset`-lohkoon (`kuvakansio: true`). **Raamattu viittaa savukkeeseen
   yhä vanhalla nimellä** (PAATOKSET 35 -osiot, "mittaa-luentakuvat 16/16" ja
   "27/27") — en muokannut Raamattua, koska siihen kirjoittaa vain Fable.
2. Ohitan lentovartiossa lentoja on 1 eikä 2, koska mittari painaa Ohitaa
   600 ms sarjan alusta — silloin ruudulla on vasta yksi kortti. Sarjan
   normaali loppu mittaa porrastuksen (2 kuvaa).
3. `LUENTAKUVAPAKKA_KARTALLA` on yhä `false`, joten ankkuroidun paneelin
   lentopolku (`pienennaLuentakuva`) on käytännössä kuollut koodi tässä
   pelitilassa — se kirjoitettiin siltä varalta, että pakka palautetaan
   kartalle yhdellä rivillä, kuten vakion oma kommentti lupaa. Sitä ei siis
   ole mitattu erikseen.
4. Savuke on nyt pitkä (kaksi lisäkontekstia, n. 40 s lisää): jos
   julkaisusarjan seinäkello kiristyy, sen voi jakaa `#osa`-riveiksi
   (390 / 1400) samalla tavalla kuin astro-pallo ja pariisi-lahizoom.
