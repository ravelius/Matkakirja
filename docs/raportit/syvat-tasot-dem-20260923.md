# Syvät tasot z9–z10 DEM:stä ja pallon Z9–Z11 (Karttaseppä 23.9.2026)

Tilaus: Ranskan (lon −5,5…9,8, lat 41…51,5) pyramiditasot z9–z10, joiden
rinnevarjo tulee 30 metrin Copernicus GLO-30 -aineistosta 1′-korkeuspalojen
sijaan, sekä pallon Web Mercator -sarja Z9–Z11 samalle alueelle
natiivipeliä varten. Selainpeli ei käytä näitä tasoja.

## Mitä muuttui

| Tiedosto | Muutos |
|---|---|
| `tools/maasto/dem-ikkuna.mjs` (uusi) | Tiheä korkeusikkuna DEM:stä samassa muodossa kuin 1′-ikkuna (Int16, rivi 0 pohjoisin). Puuttuva 1°-ruutu → 1′-arvo, ramppi saumassa, meri 1′:stä. |
| `tools/maasto/tee-maasto.mjs` | `demHakemisto().onRuutu(lat, lon)` (ruudun olemassaolo avaamatta). `korkeus` ennallaan. |
| `tools/generoi-laattapyramidi.mjs` | `--tasoja` katto 11; `--syva-alue`; `--dem`; DEM-ikkuna syville tasoille; syvän tason laatasto alan geometriasta; merkkitasot (nosto/viiva/ranta/nimiö) enintään z8; `korkeus.syvat` + lähdemaininta luetteloon. |
| `tools/polta-paikallisesti.sh` | `--sarjat syva`, `--dem`, `--syva-alue`, `--pallo-alue`; syvän sarjan kaistat; pallon `--alue` läpi. |
| `tools/tee-pallolaatat.mjs` | `laatat.json` saa kentän `alue`, kun sarja on aluesarja. |
| `js/laattapyramidi.js` | `PELIN_SYVIN_TASO = 8` ja `pelinLuettelo()`: luettelon tasot yli z8 jätetään pois haettaessa. |
| `tests/syvat-tasot.test.mjs` (uusi) | 14 testiä (ks. alla). |

Ilman `--dem`- ja `--syva-alue`-lippuja ja ilman tasoja z9+ generaattori on
tavulleen entinen (testi: z0–z8-luettelo `--dem`-lipun kanssa ja ilman on
sama). Pelin guard palauttaa saman olion, jos luettelossa ei ole tasoja yli z8.

## Liput

Generaattori:

```
node tools/generoi-laattapyramidi.mjs <kansio> --tasoja 11 --tasot 10 \
  --syva-alue -5.5,41,9.8,51.5 --dem <GLO-30-kansio> [--sarakkeet a-b] [--alue …] …
```

- `--syva-alue` on pakollinen, jos ajossa on taso ≥ 9 (myös `--vain-luettelo`).
  Se rajaa sekä työlistan että luettelon syvän laataston (sama `alueella`-testi).
  Juuritason `alue` ei muutu.
- `--dem` vaikuttaa vain tasoihin ≥ 9. z9 ja z10 ovat eri ruudukot, joten ne
  ajetaan eri piirtoajoina (sekoitus pysäytetään virheellä).

Polttoskripti:

```
tools/polta-paikallisesti.sh --sarjat syva --dem <GLO-30-kansio> \
  [--syva-alue -5.5,41,9.8,51.5] --data … --yhteisliput "…" \
  --pohjaliput "--ilman-rantaviivaa …(samat kuin version poltossa)" \
  [--pallo --pallotunniste <oma> --pallo-tasot 9-11 [--pallo-alue …]]
```

- Shardit: `syva-z10-NNN` (4 z10-saraketta = 1 lohko) ja `syva-z9-NNN`
  (8 z10-saraketta = 1 z9-lohko). Ranskalle 16 + 8 shardia; kaistat lasketaan
  generaattorin `--vain-lista`-työlistasta (`syva-sarakkeet.txt` välimuistina).
- Laatat menevät ämpärin nykyisen pohjaversion alle (`<versio>/z9`, `/z10`),
  kuten z8 aikanaan — uusia polkuja, ei ylikirjoitusta.
- Skripti kieltäytyy, jos ämpärin pohja on rannaton eikä `--pohjaliput`
  sisällä `--ilman-rantaviivaa`.
- Luettelo kootaan ja eheystarkistetaan, mutta sitä EI viedä (ks. rajoitukset).
- Pallon syvä sarja: oma `--pallotunniste`, `--alue` oletuksena syvä ala
  0,4° kavennettuna (Z10-laatta ulottuu 0,35° reunan yli; ilman kavennusta
  reunalaattoihin tulisi merisävyinen kaista puuttuvan z9-lähteen kohdalle).
  Lähteet luetaan ämpäristä (Z9:n lähde on koko maailman z8), joten
  z9–z10 on vietävä ensin tai annettava `--pallon-lahde`.

## Rinnevarjon valinnat

- **Ruudukon väli = tason pikseli, kattona 1″**: z9 3,75″ (1/960°), z10
  1,875″ (1/1920°). Moottori johtaa varjon askeleen `d` ruudukon välistä
  (`maailmapiirto.js` DLON), joten `maastovarjo.js` saa oikean `d`:n ilman
  muutosta (testattu: `(lon1 − lon0)/(w − 1)` = väli).
- **Solmut maailmanhilassa**: ikkunan kulma on 1′-hilassa ja 1′ on välin
  monikerta → naapurishardien näytteet ovat samat.
- **Valo ja liioittelu ennallaan** (315°, 42°, 2,6): syvät tasot jatkavat
  z8:aa samalla valaistuksella. 30 m:n rinteet ovat todellisia ja jyrkempiä,
  joten vuoristo on tummempi ja uurteisempi kuin 1′:llä — koevedoksessa
  tulos on luettava eikä tukkoinen.
- **Sauma**: DEM:n paino nousee 0 → 1 smoothstepillä 0,05°:n (≈ 5,5 km)
  matkalla puuttuvan naapuriruudun reunasta.
- **Vara-arvo kuutiollinen (Catmull–Rom)**: bilineaarinen 1′ piirsi
  pienellä askeleella jokaisen 1′-solun omaksi tasaiseksi laatakseen
  (porrasruudukko, ks. `reuna-z9-1min-vs-dem-bilineaarinen.png`).
  Kuutiollinen on sileä solurajan yli.
- **Meri**: DEM antaa merelle 0 m; arvo ≤ 0 korvataan min(DEM, 1′).
  Merellä käytetään bilineaarista 1′-arvoa, jolloin isobaatit ovat samoilla
  paikoilla kuin z8:lla (koevedos Nizzan rannikolta).

## Koevedokset

Kansio `/Users/Shared/Claude/pyramidi-poltto/koe-syva/` (vasen 1′, oikea DEM,
tuotannon pohjaliput kuten `ajo-20260923a/aja-1.sh`):

- `mont-blanc-z10-1min-vs-dem.png` — z10, 2 × 2 laattaa (sarakkeet 681–682, rivit 293–294).
- `reuna-z9-1min-vs-dem.png` — z9, 2 laattaa (346/145–146) Bergamon Alpeilla
  10° E:n saumassa. DEM-kansio rajattiin koetta varten alkuperäiseen Ranskan
  155 ruutuun (`dem-ranska-vain/`, symlinkit), koska Italian ruudut ehtivät
  latautua ennen koetta; ramppi näkyy oikeassa reunassa.
- `reuna-z9-1min-vs-dem-bilineaarinen.png` — sama ennen kuutiollista varaa.
- `nizza-ranta-z10-1min-vs-dem.png` — z10, 2 laattaa, meri ja isobaatit.
- `aja-koe.sh`, `rinnakkain.mjs` ja ajojen lokit samassa kansiossa.

Mitattu: 1 lohko (4 × 4 laattaa) z10:llä ≈ 5 s piirtoa + DEM-ikkuna 4–5 s
(≈ 1 µs/solu, NAS-luku mukana), yksi ydin, `nice -n 10`.

## Aika-arvio koko ajolle

| Osa | Laattoja | Arvio (1 ydin) | Arvio (Mac Studio, rinnakkain) |
|---|---|---|---|
| z10 Ranska | 3 009 (≈ 224 lohkoa, 16 shardia) | ≈ 35 min | ≈ 5 min |
| z9 Ranska | 780 (≈ 56 lohkoa, 8 shardia) | ≈ 12 min | ≈ 3 min |
| Pallo Z9–Z11 (kavennettu ala) | 462 + 1 722 + 6 804 = 8 988 | ≈ 20 min | ≈ 5 min + ämpärinoudot |

Shardin DEM-ikkuna on noin 2 200 × 23 000 solua (≈ 100 Mt Int16 z10:llä,
50 Mt z9:llä) ja kokoamiseen menee noin minuutti. Kokonaisuus ennen vientiä
arviolta 15–20 min seinäaikaa; vienti ≈ 3 800 + 9 000 laattaa.

## Tunnetut rajoitukset

1. **Luettelon vienti**: z9–z10 sisältävä `pyramidi.json` on turvallinen vasta,
   kun `js/laattapyramidi.js`:n `PELIN_SYVIN_TASO` on julkaistu. Siihen asti
   `--sarjat syva` ei vie luetteloa; natiivi lukee pallosarjaa eikä
   luetteloa. Julkaisujärjestys: peliversio → (laatat) → luettelo.
2. **Merkkitasoja ei ole syvillä tasoilla**: z9–z10:ssä ei ole viiva-, ranta-,
   nosto- eikä nimiötasoa. Pallon Z10–Z11 on siis ilman rajoja ja rantaviivaa
   (pohja on rannaton); joet ovat mukana, jos pohja poltetaan `--joet-pohjaan`.
3. **Pohjaliput käsin**: syvän sarjan on käytettävä samoja pohja- ja
   yhteislippuja kuin ämpärin version poltto. Vain rantaviiva tarkistetaan
   koneellisesti.
4. **Syvyyskäyrät rannikon lähellä** voivat erota z8:sta muutaman pikselin,
   koska DEM:n rantaviiva on eri kuin ETOPOn.
5. **Int16-metrit**: tasaisella maalla 1 m:n porras voi näkyä 1–2 RGB-tason
   raitana; paperin rae peittää sen koevedoksissa.
6. **Pallon ala** on oletuksena 0,4° syvää alaa kapeampi (−5,1…9,4, 41,4…51,1):
   Manner-Ranskan ääripisteet ovat mukana (Dunkerque 51,05° N, Bretagnen kärki
   −4,8°), mutta Korsikan itärannikko (yli 9,4° E) jää Z10–Z11:n ulkopuolelle.
   Laajempi pallon ala vaatii laajemman `--syva-alue`n.
