# Poltto ajaa merkkiportin kohdemaan asetuksella (18.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-poltto-kohdemaa`
(pohja `claude/bold-ride-vow4ki-v1945`, 8df7ca83).
Ei vientiä ämpäriin, ei versionnostoa, ei PR:ää.

## 1. Sääntömuutos

Fablen mittaus 18.9.2026 klo 19.30 osui oikeaan: polttoketju ajoi
merkkiportin uloimman zoomin asetuksella, vaikka nostotaso on
PAATOKSET 34 kohdan 17 d jälkeen MAAKOHTAINEN.

`tools/fokuskartta/nostot.mjs` rivi ~318 ennen:

```js
const portti = merkkiPortti(ui.fokuskohdeRyhmat, false, (r) => r.kohde ?? null);
```

jälkeen:

```js
const portti = merkkiPortti(
  ui.fokuskohdeRyhmat, false, (r) => r.kohde ?? null, { kohdemaa: maittain },
);
```

PERUSTELU EI OLE UUSI SÄÄNTÖ VAAN PELIN OMA. Elävä kerros ajaa saman
funktion `{ kohdemaa: true }` -asetuksella (`js/pallolauta/nostot.js`
`keraa`, "KOHDEMAA-LIPPU"), koska se kerää merkit vain korostetusta
maasta. Kun `--nostomaa <ISO>` polttaa yhden maan laataston, jonka peli
lataa VAIN silloin kun se maa on kohdemaa (`js/laattapyramidi.js`
`nostotasonKirjaus`), jokaisen maan laatasto on aina kohdemaan
laatasto — siis sama asetus. Katto `PAAKARTAN_MERKKIKATTO` 21 ja
`lahi: true` jäävät voimaan VAIN maailmanlaajuisessa ajossa (ilman
`--nostomaa`), jossa naapurin muste on samassa kuvassa.

Kytkentä kulkee lipulla, ei vakion muutoksella:

- `keraaNostot(pack, { maittain })` → `nostoladontaMerkit({ …, maittain })`
  → `merkkiPortti(…, { kohdemaa: maittain })`.
- `tools/generoi-laattapyramidi.mjs`: `keraaNostot(pack, { maittain: Boolean(NOSTO_MAA) })`.
- `tools/nostomaat.mjs`: `{ maittain: true }` — shardilista tulee samasta
  funktiosta samalla asetuksella kuin ajo itse, muuten listalta voisi
  pudota maa, jolla on poltettavaa vasta kohdemaan asetuksella.

MIKÄ EI MUUTTUNUT: kaupunkipisteet (`nakyva-kaupunki-*`), kaupungin
sisäiset nostot (PAATOKSET 33 TARKENNUS 2, FABLEN RAJAUS a), täkyehto ja
lukitun maan ankkuriehto ovat ennallaan.

## 2. Monen maan merkit — ratkaistu, ei kirjattu auki

"82 monen maan merkkiä eläväksi" oli sääntö `SAMA TUNNUS KAHDESSA MAASSA
EI PALA`: maastokohde (Välimeri, Tonava, Biskajanlahti) latoutuu kerran
per maa, kunkin maan mittatikulla ja eri paikkaan, eikä
maailmanlaajuinen laatasto voi kantaa kuutta eri kopiota samasta
tunnuksesta.

MAAKOHTAISESSA AJOSSA SYY POISTUU, ja se on selvärajaista:

- laatastot eivät sekoitu (`<versio>/nostot/<ISO>/z…`), ja peli lataa
  vain kohdemaan laataston;
- tiivisteluettelo on niin ikään maakohtainen (`nostotasot[ISO].nostot`),
  joten kohdemaan tiiviste vastaa juuri sitä ladontaa, jolla merkki
  poltettiin — naapurin eri paikkaan ladottu kopio ei pääse vaientamaan
  sitä.

Toteutettu: dedup-avain on maakohtaisessa ajossa `ISO|tunnus`, muuten
tunnus kuten ennen. SAMAN MAAN SISÄLLÄ sääntö pysyy, koska yksi tunnus
mahtuu luetteloon vain kerran.

Ranskaa tämä koskee: `valimeri`, `biskajanlahti` ja `montblanc` palavat
nyt Ranskan laatastoon. Maailmanlaajuinen ajo pitää vanhan säännön.

## 3. Koepoltto Ranskalle (ei vientiä)

```
node tools/generoi-laattapyramidi.mjs <tmp>/koe-fra --tasot 5-5 \
  --nostotaso --nostoversio 2026-09-18c-koe --nostomaa FRA --versio koe
```

| | ennen | jälkeen |
|---|---|---|
| `FRA: N poltettavaa merkkia` | **13** | **61** |
| josta nosto-perhe | 12 | 60 |
| josta eläintäky | 1 | 1 |
| `porttiPiiloon` koko maailmassa | 100 | 0 |
| `monen maan merkkiä eläväksi` | 82 | 0 |
| koko maailman poltettavat | 1608 | 1765 |

Luku 61 osuu odotukseen (55–60 + eläintäky). Laatat piirtyivät
(z5, 5 laattaa, 1,1 s); ämpäriin EI viety.

### Ranskan 60 poltettavaa nostomerkkiä

Uudet 48 (eivät palaneet vanhalla säännöllä) merkitty tähdellä.

avignonin-paavinpalatsi, bayeux-seinavaate*, biskajanlahti,
carcassonnen-linnoituskaupunki, carnacin-kivirivit, chambord,
chartresin-katedraali, douaumont*, hahmotelma-ajaccio*,
hahmotelma-amboise*, hahmotelma-amiens*, hahmotelma-beaune*,
hahmotelma-biarritz*, hahmotelma-bonifacio*, hahmotelma-canal-du-midi*,
hahmotelma-canigou*, hahmotelma-chenonceau*, hahmotelma-cognac*,
hahmotelma-etretat*, hahmotelma-le-puy-en-velay*, hahmotelma-lourdes*,
hahmotelma-mont-ventoux*, hahmotelma-nimesin-areena*,
hahmotelma-pic-du-midi*, hahmotelma-place-stanislas*,
hahmotelma-pointe-du-raz*, hahmotelma-puy-de-sancy*, hahmotelma-reims*,
hahmotelma-rocamadour*, hahmotelma-rouen*, hahmotelma-saint-emilion*,
hahmotelma-saint-malo*, hahmotelma-verdon*, hahmotelma-vezelay*,
hahmotelma-vichy*, lascaux, loire, millaun-silta*, mont-saint-michel,
montblanc, nosto-maalehti-camarguen-hevoset*,
nosto-maalehti-chaine-des-puys*, nosto-maalehti-chandeleur*,
nosto-maalehti-couesnonin-vuorovesi*, nosto-maalehti-dune-du-pilat*,
nosto-maalehti-le-mans*, nosto-maalehti-marseillen-saippua*,
nosto-maalehti-michelin-opas*, nosto-maalehti-montgolfier*,
nosto-maalehti-peilisali*, nosto-maalehti-petanque*,
nosto-maalehti-roquefort*, pont-du-gard, rhone*,
skandaali-kaulanauhajuttu-1785*, syvennys-marseille-cosquer*,
syvennys-marseille-exvotot*, syvennys-marseille-roquefavour*, valimeri*,
vignemale.

Kaikki 27 hahmotelman kohdetta, jotka olivat laudalla Ranskan
kaupungin ulkopuolella, palavat nyt.

### Ranskan 29 eläväksi jäävää — ja syy

**7 kaupunkipistettä** (PAATOKSET 33 TARKENNUS 2 FABLEN RAJAUS a;
kaupungin nimiö on 11,5 px ja napautus avaa liuskan, kumpikaan ei ole
mahdollista musteelle): `nakyva-kaupunki-bordeaux`,
`nakyva-kaupunki-lille`, `nakyva-kaupunki-lyon`,
`nakyva-kaupunki-nantes`, `nakyva-kaupunki-nizza`,
`nakyva-kaupunki-strasbourg`, `nakyva-kaupunki-toulouse`.

**21 Pariisin sisäistä** (PAATOKSET 34 kohdat 2–3, `onKaupunginSisainen`
— ne ovat kaupunkiliuskan kategorioissa eivätkä piirry kartalle millään
zoomilla): `bastilji`, `tuileries`, `nosto-carmenin-ensi-ilta`,
`nosto-guimardin-metro`, `nosto-kirahvin-kavelymatka`,
`nosto-lustig-eiffel`, `nosto-maalehti-bouquinistit`,
`nosto-maalehti-braille`, `nosto-maalehti-pasteur-meister`,
`nosto-maalehti-roland-garros`, `nosto-maalehti-tour-de-france-1903`,
`nosto-notre-damen-kukko`, `nosto-pariisi-soi`, `nosto-pariisin-72-nimea`,
`nosto-pariisin-patonki`, `nosto-pariisin-vuosisadat`,
`skandaali-mona-lisan-varkaus-1911`,
`skandaali-vrain-lucas-kirjevaarennokset`,
`syvennys-pariisi-impressionistit`, `syvennys-pariisi-kyyhkyposti`,
`syvennys-pariisi-tuileriat`.

**1 ilman lukittua ankkuria** (FABLEN RAJAUS b, Ranska on lukittu maa):
`nosto-maalehti-cinematographe`. **Tämä on ainoa velka Ranskassa** —
62 ankkurista puuttuu yksi. Jos Fable haluaa senkin palavan, ankkuri
lisätään `js/pallolauta/nostoankkurit.js`:ään.

## 4. Peli tunnistaa poltetut merkit (tarkistettu, ei muutettu)

Ketju on ehjä ilman koodimuutosta:

1. poltto laskee `merkki.tiiviste = nostoladontaTiiviste(merkki)` ennen
   ankkurisiirtoa;
2. `nostotasot.FRA.nostot` = tunnus→tiiviste (koepoltossa 61 riviä);
3. `js/laattapyramidi.js nostotasonPoltetut()` lukee
   `nostotasot[variMaaNyt].nostot`;
4. `js/pallo.js pallonNostoOnPoltettu` putoaa siihen, kun pallon omassa
   sarjassa ei ole nostoja;
5. `js/fokuskohteet.js maanKohdemerkit` merkitsee `r.poltettu`;
6. `js/pallolauta/nostot.js`: `elavatKaikki = nakyvat.filter((r) => !r.poltettu)`
   — **poltettu merkki ei kilpaile `NOSTOJEN_KATTO` 40:stä**.

MITATTU YHTÄPITÄVYYS (koepolton luettelo vs. pelin oma ladonta
`maanKohdemerkit` samoilla lähderekistereillä):

```
laattaluettelossa 61, pelin ladonnassa 82
tiiviste tasmaa: 60 | eroaa: 0 | ei pelin ladonnassa: 1 (elaintaky-FRA)
```

`elaintaky-FRA` on oma kerroksensa (`js/elaintaky.js`) eikä kulje
kohdekerroksen läpi — se on tarkoitettu ero.

## 5. Skriptikorjaus: kokoa-nostotasot yleiselle polulle

`tools/polta-paikallisesti.sh` ajoi `tools/kokoa-nostotasot.mjs`:n vain
`--nostot-ja-pallo`-polulla (rivi ~1553). Yleisellä `LUETTELO=1`-polulla
(`--sarjat nostot`, `z8`, `kaikki`) sitä ei ajettu, joten luettelon
`nostotasot` jäi nulliksi ja eheystarkistus vertasi maittaisten
shardien summaa yhteen bittikarttaan: *"poltettu 425, luettelo lupaa
251"*. Kokoaminen lisätty samaan kohtaan ennen `tarkista_eheys`ia,
ehdolla `grep -q '^nosto-' "$ULOS/lokit/shardit.txt"` (työkalu poistuu
koodilla 1, jos nostoshardeja ei ole). `bash -n` läpi.

## 6. Testit ja savuke

- `node --test "tests/*.test.mjs"`: **3641 testiä, pass 3628, fail 0,
  skipped 13** (78 s).
- `tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs` (PORTTI=8816):
  **10/10 vartiota läpi.** Savuke mittaa yhä ämpärin vanhaa laatastoa,
  ja se näyttää juuri sen vian, jonka tämä erä poistaa: 390 px
  DOM-merkkejä 40 (katto täynnä), *"puuttuvia Ranskan nostoja 17"* —
  `montblanc`, `valimeri`, `biskajanlahti`, yhdeksän hahmotelmaa ja
  kaksi Marseillen syvennystä. Kaikki 17 ovat uuden polton
  poltettavien listalla, eli poltto siirtää ne musteeksi eivätkä ne enää
  kilpaile CSS2D-katosta.

**Vartio päivitetty samassa erässä.** `tests/nostopoltto-merkkiportti.test.mjs`
vartioi vain maailmanlaajuista ajoa; sen neljä väitettä jäivät
ennalleen (ne ovat yhä oikein siellä, missä ne mitoitettiin) ja
rinnalle tuli kolme uutta maakohtaisen ajon väitettä:

1. `maakohtaisessa ajossa katto ei pidätä mitään` — `porttiPiiloon === 0`,
   vastakokeena maailmanlaajuinen ajo, joka pidättää yhä;
2. `maakohtaisessa ajossa Ranskan kaupungin ulkopuoliset palavat` —
   ≥ 55 poltettavaa, ≥ 25 hahmotelman kohdetta, `valimeri`,
   `biskajanlahti` ja `montblanc` mukana, `monimaisia === 0`;
3. `kaupunkipiste ja kaupungin sisäinen jäävät eläviksi myös maittain`.

Kiinteitä lukuja ei jätetty: väitteet ovat alarajoja tai kahden
riippumattoman mittauksen yhtäpitävyyksiä, joten sisällön kasvu ei
kaada niitä.

## 7. Viereiset havainnot (EN korjannut)

1. **`nosto-maalehti-cinematographe` ilman lukittua ankkuria.** Ainoa
   Ranskan nosto, joka jää eläväksi muusta kuin kaupunkisyystä.
   Ankkuripöytä `js/pallolauta/nostoankkurit.js` — yksi rivi, Fablen
   päätettävä.
2. **`tilasto.porttiMaat`-rivi ja `nostojenYhteenveto` mainitsevat yhä
   "katto 21"** myös maakohtaisessa ajossa, jossa lukua ei käytetä. Rivi
   ei tulostu (luku on 0), joten en koskenut siihen.
3. **`keraaNostot().luettelo` on maakohtaisessa ajossa harhaanjohtava:**
   sama tunnus voi tulla usean maan ladonnasta ja viimeinen voittaa.
   Generaattori ei käytä sitä (se rakentaa `poltettuLuettelo`n maan
   merkeistä), ja kirjasin varoituksen JSDociin — mutta jos joku uusi
   työkalu lukee kenttää maakohtaisessa ajossa, se saa väärän taulun.
4. **`tools/mittaa-nostomuste.mjs` ja `tools/tarkista-nimiolimitys.mjs`
   kutsuvat `keraaNostot(pack)` ilman `maittain`-lippua**, eli ne
   mittaavat yhä vanhan katon mukaista joukkoa. Nimiölimitysmittari on
   nyt siis optimistinen: maakohtaisessa polttossa Ranskaan tulee 48
   uutta nimiötä, joiden limitystä se ei mittaa. Tämä on oma eränsä
   (mittarin odotusarvot muuttuvat).
5. **`--nostomaa`-ajon `--data` ei ole pakollinen** nostotasolle, mutta
   `PW_CHROMIUM` on (oletus `/opt/pw-browsers/chromium` ei ole Macilla).
   Koepoltto tarvitsi `PW_CHROMIUM`-ympäristömuuttujan; `PLAYWRIGHT_JS`
   oli jo dokumentoitu.
