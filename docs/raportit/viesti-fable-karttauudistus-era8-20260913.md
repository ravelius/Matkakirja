# Karttauudistus erä 8: Liiku-nappi ja neljä kulkutapaa pallolle

*(Opus-työsessio → Fable, 13.9.2026. Haara
`claude/karttauudistus-era8-liiku`, origin/mainista. Versiota EI nostettu,
dist/ ei mukana. Suunnitelma: `karttauudistus-suunnitelma-pallo-20260913.md`
luku 3.7 ja `karttauudistus-suunnitelma-20260913.md` luku 6.)*

## Lyhyesti

Liiku-nappi ja neljä kulkutapaa ovat pallolla: **liftaus** (entinen jalan,
ilmainen, sama noppa ja sama aika, uusi autokyytianimaatio), **bussi**
(50 p, vierekkäinen kaupunki, EI aikakulua), **laiva** ja **lento**
ennallaan. Kartta rajautuu kulkutavan mukaan ja palaa saapumisen jälkeen
maan rajaukseen. Savuke `savuke-liiku.mjs` on **40/40 vihreä**, molemmat
vastakokeet mukana. Kaikki portit vihreitä, `npm test` 3293/0.

## 1. Mitä tehtiin

| Tiedosto | Muutos |
| --- | --- |
| `js/rules.js` | `BUS_FARE = 50` (laivan ja lennon hintojen viereen) |
| `js/game.js` | `busDestinations`, `busPath`, `actionBus`, `travelModes` + `'bus'`, `endTurn({ aikaKuluu })`, `actionTravel` torjuu `'bus'`:in |
| `js/siirtokoreografia.js` | `autokyydinVaihe`, `autokyydinAskel`, `BUSSIN_VAUHTIKERROIN`, `MATKARAJAUKSEN_MARGINAALI/_VAHIN_YKS/_PALUU_MS` |
| `js/pallolauta/siirto.js` | nappula kunnioittaa `vaihe`a (pystykaari pois); uusi `aja(lahto, polku, kesto, { vaihe })` |
| `js/pallolauta/lauta.js` | oma funktio `matkaZoomirajat(vapaa)` (uloszoomauksen esto pois matkan ajaksi) |
| `js/ui.js` | Liiku-nappi, neljä matkanappia, bussilista, `doBus`, `matkarajaus`, `matkaZoomivapaus`, `palaaMaanRajaukseen`, autokyyti siirrossa |
| `js/ui-apurit.js` | kaksi uutta viivakuvaketta: `peukalo` (liftaus) ja `bussi` |
| `css/styles.css` | neljän napin liuku 390 px:llä (`:has(> button:nth-child(4))`) |
| `tools/savukkeet/savuke-liiku.mjs` | uusi savuke, 40 vartiota + kaksi vastakoetta |
| `tests/*` | kolme vartijaa päivitetty uuteen nimistöön (ks. luku 5) |

### Liftaus = noppa uudella nimellä (PAATOKSET 1 kohta 4)

Tunnus `land` **ei muuttunut** datassa, tallennuksissa eikä `findMoves`in
kaarisuodatuksessa — vain napin nimi ("Liftaus", peukalokuvake) ja
animaatio. Aika kuluu täsmälleen kuten ennen (6 h / vuoro), noppa on sama
ja `jalkamatkanAskel`in porrastus on sama luku (`autokyydinAskel`
delegoi siihen).

**Autokyyti.** `hyppaa(a, b, kesto, { vaihe })` tuki vaihekäyrää vain
koneelle; nyt nappula lukee sen samalla sopimuksella, ja oman käyrän
mukana jää pois pystykaari (`nousu = 0`, varjo ei kutistu). Sen päälle
tuli `aja(lahto, polku, kesto, { vaihe })`: **koko nopan matka yhdellä
ajolla ja yhdellä ease-in-out-käyrällä**, ilman askelvälin taukoja.
Osuus jaetaan askelvälien kesken ja kukin väli kulkee reitin omaa polya
(`pointAlong`), joten viiva on sama kuin hyppyketjulla.

Mitattu nappulan nopeusprofiili (390 px, kamera paikallaan):

| | alku | keski | loppu | pystykorkeus |
| --- | ---: | ---: | ---: | ---: |
| autokyyti | 0,020 | **0,104** | 0,042 px/ms | **0,00 px** |
| hyppyketju (vastakoe) | 0,034 | 0,037 | 0,054 px/ms | 17,56 px |

### Bussi

`busDestinations` = naapurikaupungit maakaarta pitkin (sama päättely kuin
`rideTarget`, mutta kaikki kohteet ja vain `land`-kaaret) JA rahat ≥ 50.
`actionBus` on `actionMoven` sisar: veloitus → siirto → `visitCity` →
voittotarkistus → `endTurn({ aikaKuluu: false })`. **Aikakulu on ainoa
ero vuoron päätöksessä**: aika on pelissä `(turnCount − 1) × 6 h`, joten
"ei aikaa" tarkoittaa, ettei kierroslaskuria koroteta. Animaatio on sama
autokyyti, kesto 0,6 × liftauksen (BUSSIN_VAUHTIKERROIN) — bussi on siis
nopeampi myös ruudulla.

Bussi EI kulje `actionTravelin` kautta (kohde valitaan, ei heitetä);
`actionTravel('bus')` torjutaan selvällä virheellä.

### Kartta rajautuu kulkutavan mukaan ja palaa

`ennakoiSiirtoZoomi(from, path, tapa)` sai kulkutavan. Kun tapa
tunnetaan, rajaus on **koko matkan laatikko marginaalilla** (liftaus ja
bussi 0,25, laiva 0,5; lennolla on jo oma `lennonRajaus`) eikä enää
nappulan ympäristö kiinteällä lähennyskertoimella. Laatikko ei kutistu
siirtonäkymän vanhan katon (120 yks) alle, joten yhden askeleen liftaus
ei vedä kameraa sisäänpäin.

Perillä `palaaMaanRajaukseen()` ajaa `lauta.saavu()`n eli maan rajauksen
ja palauttaa uloszoomauksen eston. Mitattu (390 × 844, Ateenasta):

| tapa | raha | aika | leveys ennen → matkalla → perillä | matkan laajuus | maan rajaus |
| --- | ---: | ---: | --- | ---: | ---: |
| liftaus | 0 p | 6 h | 316 → 316 → 229 | 90 | 229 (BGR) |
| bussi | 50 p | 0 h | 316 → 316 → 229 | 90 | 229 (BGR) |
| laiva | 100 p | 6 h | 316 → 316 → 316 | 52 | 316 (GRC) |
| lento | 300 p | 6 h | 316 → **637** → 437 | 375 | 437 (ITA) |

Lyhyellä matkalla maan näkymä (316 = Kreikka puhelimella) sisältää jo
koko matkan, joten kamera ei zoomaa ulos turhaan; lennolla ero näkyy
sellaisenaan. Kulkutapakohtaisuus mitataan siksi myös suoraan
rajausfunktiosta: samalla kaarella (Ateena → Sofia) laiva rajaa yli
10 % väljemmin kuin liftaus, bussi täsmälleen kuten liftaus, ja lento
ei rajaa täältä lainkaan.

### Uloszoomauksen esto (rinnakkainen erä 1b+2)

`js/pallolauta/lauta.js`:n `zoomirajaSyrjaytys`-kohtaan **ei koskettu**.
Lisäsin oman funktion `matkaZoomirajat(vapaa)` muualle tiedostoon: se
nostaa syrjäytyksen talteen matkan ajaksi ja panee takaisin saapumisessa.
Kutsupaikat ovat `ui.matkaZoomivapaus(true/false)`: matkavalikon avaus ja
sulku, kulkutapakohtainen ennakkorajaus, lennon lähtö, ja
`palaaMaanRajaukseen`. Tänään funktio on käytännössä tyhjä (mainissa ei
ole estoa), mutta erä 2:n mergen jälkeen se on valmis paikallaan.

## 2. Savuke ja vastakokeet

`node tools/savukkeet/savuke-liiku.mjs [kansio]` (`NODE_USE_ENV_PROXY=1`,
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`) — **40/40 vihreä**, ei
sivuvirheitä. Kaikki neljä tapaa ajetaan kerran Ateenasta (sieltä lähtee
maa- ja meritie ja siellä on lentokenttä), ja jokaisesta mitataan `money`,
`elapsedHours()` ja kameran näkyvä leveys ennen ja jälkeen.

**VASTAKOE A — ilman rahaa bussi ja laiva eivät ole valittavissa
(vihreä):** `money = 0` → `travelModes()` = `['land', 'stay']`, bussin ja
laivan napit `disabled` ja kertovat hinnan
("Bussilla — bussilippu maksaa 50 puntaa"), liftaus jää valittavaksi.

**VASTAKOE B — vaihekäyrä riisuttuna profiiliväite kaatuu (mitattu
punaiseksi):** sama matka `kyyti: false` eli entisellä hyppyketjulla
antaa profiilin 0,034 · 0,037 · 0,054 px/ms — kiihdytystä ja jarrutusta
ei ole (keski ei ole 1,5× alkua eikä loppua), ja nappulan pystykorkeus
nousee 17,56 pikseliin eli nappula hyppii. Savuke kirjaa sen nimenomaan
vastakokeena: väite on punainen ilman käyrää ja vihreä sen kanssa.

Kuvat: `docs/raportit/kuvat/karttauudistus-8-liiku-390.png` (neljä nappia
390 px:llä) ja `karttauudistus-8-pulu-390.png` (Pulun kupla auki).
Molemmat alle 400 kt.

## 3. Portit

```
npm test                                        # pass 3293, fail 0
node tools/tarkista-kaksoisavaimet.mjs          # ei kaksoisavaimia
node tools/tarkista-niputus.mjs                 # 388 moduulia, ei törmäyksiä
node tools/tarkista-savukkeet.mjs               # savukkeet kunnossa
node tools/build-standalone.mjs                 # dist rakentuu (ei committoitu)
grep -rn '^<<<<<<<' js css tests tools          # tyhjä
```

**Vanhat tallennukset:** origin/mainin `Game`illa tehty tallenne latautuu
uudella koodilla merkki merkiltä samaksi kuin vanhalla
(`vanha→vanha === vanha→uusi`, testattu erikseen). Tallennemuoto ei
muuttunut; `travelMode: 'bus'` ei koskaan päädy tallenteeseen, koska
`endTurn → beginTurn` nollaa sen.

## 4. Päätös, joka on syytä tietää: automaattivalinta

`beginTurn` valitsi matkustustavan valmiiksi, kun tapoja oli yksi
(`autoTravel`). Bussi on aito toinen tapa lähes joka kaupungissa, joten
**sisämaan kaupungissa vuoro ei enää ala suoraan nopanheitosta** silloin
kun rahat riittävät bussilippuun — pelaaja avaa Liiku-napin ja valitsee.
Ilman 50 puntaa tapoja on taas yksi ja vanha oikotie toimii kuten ennen.
Kesken reittiä mikään ei muuttunut: siellä `travelModes` antaa yhä vain
kaaren oman tyypin, joten "matka jatkuu itsestään" (omistaja 2.9.2026)
on ennallaan. Tämä on suora seuraus omistajan neljästä vaihtoehdosta,
mutta se on pelituntuman muutos — kerron sen tässä, en piilota
testimuutokseen.

## 5. Päivitetyt vartijat (kolme, kaikki nimistön vuoksi)

1. `tests/siirtoajoitus.test.mjs`: `jalkamatkanAskel` → `autokyydinAskel`
   siirron kutsussa, ja askelsilmukan teksti `(ajettiin ? [] : path)`.
2. `tests/pulu-matkat-tilanteet.test.mjs`: `vaiennaPaikanPuhe`-viipaleen
   pääte `/** Jalan:` → `/** Liftaus`.
3. `tests/rules.test.mjs`: automaattivalinnan sääntö (luku 4) ja
   `travelModes()`in uusi `bus`.

Mikään vartija ei löystynyt: 1–2 ovat ankkureita, 3 vartioi nyt uutta
sääntöä tiukemmin kuin ennen (molemmat haarat).

## 6. Havainnot Fablelle (EI korjattu — kustannuskuri kohta 1)

1. **Pulun nappi lepää alanappirivin oikean reunan päällä.** Mitattu
   leikkaus 618 px² — ja **täsmälleen sama luku kahden napin rivillä**,
   eli tämä on ollut näin ennen erää 8 (liuku on `position: absolute;
   left: 0; right: 0`, joten rivin oikea reuna ei riipu nappien
   määrästä). Pulun KUPLA ei peity (0 px², mitattu). Uloimmasta napista
   jää yli puolet vapaaksi. Jos tämä halutaan siistiä, se on oma pieni
   eränsä (Pulun napin siirto tai rivin oikea marginaali) ja koskee
   js/pollo.js:ää, joka on Codexin.
2. **Ennakkozoomin vanha tilaus vs. uusi rajaus.** Omistajan 2.9.2026
   tilaus oli *"kartta saa olla suht lähelle zoomattuna, jolloin
   liikkeestä tulee dynaamisemman näköinen"* (SIIRTOZOOMIN_LAHENNYS 2,0).
   Kulkutapakohtainen rajaus korvaa sen maa-, meri- ja bussimatkoilla;
   vanha lähennys jää voimaan silloin, kun kulkutapaa ei tunneta
   (avauslento, mannerlento). Toteutin uuden linjauksen, koska se on
   tuoreempi ja suunnitelman 3.7 mukainen — mutta ero kannattaa katsoa
   omistajan laitteella ennen julkaisua.
3. **Savukkeiden ämpärireititys on vanhentunut.** Pallosavukkeet
   reitittävät `/r2\.dev\//`, mutta ämpäri on nykyään
   `media.matkakirja.app` (js/media.js R2_JUURI). Kontissa tämä kaataa
   ainakin `savuke-siirtokoreografia.mjs --lauta pallo`:n
   `page.goto`-aikakatkaisuun, koska äänipyynnöt jäävät roikkumaan eikä
   `load` valmistu. Oma savukkeeni reitittää uuden osoitteen ja torjuu
   äänet; muut pallosavukkeet tarvitsevat saman korjauksen omana
   pikkuerinään.

## 7. Mitä EI tehty (rajauksen mukaan)

Ei koskettu `js/pollo.js`, `js/livia-*.js`, `js/lehti.js`,
`js/fokusnosto.js`, `js/fokustehtavat.js`, `js/fokusmitat.js`,
`js/pallolaatat.js` eikä `js/laattapyramidi.js`. Ei nostettu versiota,
ei committoitu dist/:tä, ei muutettu nopan lukuja, `steps`-laskentaa,
`stay`-tapaa, aarretta, nostoja eikä lehtiä. `land`-tunnus säilyi
datassa. `zoomirajaSyrjaytys`-kohtaa lauta.js:ssä ei muutettu (erä 1b+2).
