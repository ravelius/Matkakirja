# Kaksi velkaa: kokoruudun +/− -napit ja cinématographen ankkuri (18.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-velat-napit`
(pohja `claude/bold-ride-vow4ki-v1945`, 4570b8a5).
Ei versionnostoa, ei vientiä ämpäriin, ei PR:ää.

---

## VELKA 1 — kokoruudun klooni näytti yhä +/− -painikkeet (KORJATTU)

### Juurisyy oli toinen kuin tehtävänannossa

Painikkeet EIVÄT tulleet `cloneNode`n mukana. `piirraKaupunkiKartta`
liittää työkalurivin **lohkoon**, ei kehykseen (`lohko.appendChild(tyokalut)`),
joten kehyksen klooni on aina ollut napiton. Kokoruutu rakensi napit
**itse, ehdoitta**: `avaaKarttaSuurennos` loi oman
`kartta-suurennos-tyokalut`-rivinsä ja `isoNapit`-parinsa riippumatta
siitä, millä asetuksilla kartta oli piirretty. v1944:n `zoomiNapit: false`
oli siis voimassa vain siihen asti, kunnes pelaaja levitti kartan.

### Korjaus (js/nahtavyydet.js)

Lippu kulkee nyt avaajan mukana samalla ehdolla kuin arkin kartalla:

- `avaaKarttaSuurennos` lukee `asetukset.zoomiNapit` (oletus tosi, eli
  `!== false`);
- `isoNapit` on epätotuudella tyhjä olio `{}` ja työkaluriviä ei liitetä
  lainkaan (`if (lava && zoomiNapit)`), joten kortissa ei ole tyhjää
  pilleripariakaan;
- `kytkeKarttaZoom` kestää tyhjän nappitaulun (js/karttazoom.js rivit
  163–164 ja 226–227 ovat kaikki valinnaisia: `napit.lahenna?.`);
- kolme `piirraKaupunkiKartta`n omaa avausta (kehyksen napautus,
  Enter/väli, Kokoruutu-nappi) välittävät `{ avaajat, zoomiNapit }`.

### Muut kokoruutuavaukset säilyttivät nappinsa

Rajaus on tarkalleen sama ehto kuin arkin kartalla, eikä sitä tehty
oletukseksi:

| avaus | `zoomiNapit` | napit kokoruudussa |
| --- | --- | --- |
| nähtävyysarkki (js/kaupunkinosto.js rivi 931) | `false` | **ei** |
| kaupunkilehden kartta (`piirraKaupunkiKartta` oletus) | `true` | kyllä |
| maalehden korkokartta (js/maalehti.js rivi 416) | ei annettu → oletus | kyllä |

Maalehti kutsuu `avaaKarttaSuurennos(ui, iso, kartta, { mitat })` eikä
anna lippua, joten sen kokoruutu on ennallaan.

### Mittaus — savuke, vartio 13

`tools/savukkeet/savuke-kaupunkipopup.mjs`: vartion 13 avausmittaus
palauttaa nyt myös `zoomiNappeja`
(`kortti.querySelectorAll('.kartta-zoomi-nappi').length`) ja sille on
oma väite. Ajo `SAVUKE_RUUTU=390 PORTTI=8818`, kerran:

```
INFO  kokoruudun avaus: {"vw":390,"vh":844,"kortinLeveys":382,"zoomiNappeja":0,
                         "lavanKorkeus":462,"lavanLeveys":611,"kehyksenKorkeus":291}
OK    Pariisi @ 390 px: +/− -painikkeita kokoruudussa 0
OK    Pariisi @ 390 px: kokoruutu avautuu leveyteen sovitettuna (>= 97 % leveydestä)
OK    Pariisi @ 390 px: nipistys sisään täyttää ruudun korkeuden (lava >= 95 %)
OK    Pariisi @ 390 px: zoomattu kehys peittää ruudun ylä- ja alaosan (>= 95 %)
OK    Pariisi @ 390 px: zoomattuna raahaus panoroi lavaa
OK    Pariisi @ 390 px: kohteen napautus toimii zoomattuna kokoruudulla
```

**42/45 vartiota läpi.** Zoomi toimii siis ilman nappeja täsmälleen
kuten v1945:ssä: nipistys vie kertoimen kattoon 3 (`ohjain.suurin` =
`ruudunKatto`), kehys peittää 98 % ruudun korkeudesta, raahaus panoroi ja
kohteen napautus avaa yhä kohteen.

Kolme punaista ovat **samat kolme kuin ennen erää** (v1945:n oma mittaus
docs/raportit/viesti-fable-kokoruutu-zoomi-20260918.md luku "Viereiset
havainnot 2": 41/44 läpi, samat kolme). Ne ovat Marseillen liuskan
avauksessa eivätkä koske karttaa:
`kaupunkimerkin napautus avaa liuskan eikä isoa pop-upia`,
`liuskan yläryhmä on 3 riviä`, `vastakoe 1: kuvaton kaupunki avaa
pop-upin silti` (kaksi jälkimmäistä ovat ensimmäisen seurausta).
Tämä erä ei siis muuttanut punaisten määrää: 41/44 → 42/45, uusi vartio
vihreänä.

---

## VELKA 2 — `nosto-maalehti-cinematographe` ilman ankkuria: ANKKURIA EI LISÄTTY

**Päätös: ankkuria ei viety, koska nosto on Lyonin sisäinen ja sen
KUULUU jäädä eläväksi.** Tämä on tehtävänannon oma poikkeusehto.

### Mitattu, ei arvattu

Noston oma paikka (js/packs/maalehtinostot-fra.js, `paikka.nimi: 'Lyon'`)
on **45,768 N / 4,835 E**. Kartan kaupunkipiste `nakyva-kaupunki-lyon` on
**45,773 N / 4,829 E** — ero **0,6 km**. `onKaupunginSisainen` sanoo sen
sisäiseksi KAHTA riippumatonta tietä:

1. **datan oma polku** — noston paikkanimi *on* kaupungin nimi ("Lyon"),
   jolloin jäsenyys ei riipu mitasta lainkaan
   (js/pallolauta/kaupunkiliuska.js rivit 102–106);
2. **säde** — 0,6 km on `KAUPUNGIN_SADE_KM`:n sisällä.

`tools/lukitse-nostoankkurit-maalle.mjs --kuiva` (Mac, node 22) vahvistaa
sen itse: **taulussa 62 ankkuria (0 uutta, 0 siirrettyä)**. Työkalu rajaa
`sisainen`-ehdolla juuri tämän rivin pois, ja sen keskuslista sisältää
`nakyva-kaupunki-*`-pisteet. Ankkuri ei siis ole meressä eikä puutu
vahingossa — se on tarkoituksella pois.

### Miksi ankkurin lisääminen olisi ollut virhe

Elävässä kerroksessa (js/pallolauta/nostot.js `sisaisetAvaimet`, rivit
2307–2325) Lyon on jäsenyyskeskus, koska `nakyva-kaupunki-lyon` saa
`kaupunki: true` (`kohde.tyyppi === 'kaupunki'`, rivi 1619). Cinématographe
ei siis piirry kartalle **millään zoomilla**: se avautuu Lyonin
kaupunkiliuskasta ja Lyonin kaupunkikortin nostolohkosta
(`NAKYVAT_KAUPUNGIT_FRA`, kenttä `korttiNosto`). Lukittu ankkuri
polttaisi mustetta 0,6 km:n päähän Lyonin kaupunkipisteestä, eli
kartalle ilmestyisi merkki, jota elävä kerros ei piirrä — kaupunki
lakkaisi olemasta yksi piste (PAATOKSET 34 kohdat 2–3).

### Mitä tehtiin sen sijaan

Syy kirjattiin sinne, mistä sitä seuraavaksi etsitään: js/packs/
nostoankkurit-fra.js:n tiedostokommenttiin, taulunpäivitysohjeen
perään. Kommentti nimeää mittauksen, molemmat sisäisyyden polut, vartion
(`lukitse-nostoankkurit-maalle.mjs`) ja sen, miksi rivi puuttuu.

`node tools/tarkista-kaksoisavaimet.mjs` → **ei kaksoisavaimia**.

---

## Testit ja build

- `node --test "tests/*.test.mjs"`: **3641 testiä, # pass 3628, # fail 0**,
  skipped 13 (78 s).
- `node tools/build-standalone.mjs`: dist/matkakirja.html 32 701 kt.
- Versiota EI nostettu, PR:ää ei avattu.

Huomio matkan varrelta: ensimmäinen ajo oli **fail 1** —
`tests/vanha-maailma.test.mjs` "suomenkielisistä teksteistä ei puutu ä- ja
ö-kirjaimia" nappasi kirjoittamastani kommentista tiedostonimen
`nakyvat-kaupungit-fra.js` (sana `nakyvat` on EPASANAT-listalla).
Kommentti viittaa nyt export-nimeen `NAKYVAT_KAUPUNGIT_FRA`, joka ei osu
sanarajaan. **Testi toimii kuten pitää** — mutta se tarkoittaa, ettei
js/packs/-kansion kommenteissa voi mainita tuota tiedostoa nimeltä.

---

## Viereiset havainnot (EN korjannut)

1. **Polttoketjun `sisainen`-ehto ei tunne `nakyva-kaupunki-*`-pisteitä.**
   `tools/fokuskartta/nostot.mjs` (rivit ~365–379) rakentaa keskuslistan
   pelkästään pakan laudan kaupungeista (`pariisi`, `marseille`, `cayenne`,
   `noumea`), kun taas `tools/lukitse-nostoankkurit-maalle.mjs` ja pelin
   elävä kerros lukevat mukaan myös kartan kaupunkipisteet (Lyon,
   Bordeaux, Lille, Nantes, Nizza, Strasbourg, Toulouse). Siksi
   cinématographe kirjattiin v1945:n raportissa luokkaan *"ilman lukittua
   ankkuria"* eikä *"kaupungin sisäinen"* — luokka oli väärä, lopputulos
   oikea.
   **Riski on latentti muttei nollassa:** jos jokin tuleva nosto osuu
   lisäkaupungin sisään JA saa lukitun ankkurin, poltto polttaisi sen,
   vaikka elävä kerros piilottaa sen liuskaan — merkki ilmestyisi
   musteena kaupunkipisteen viereen. Tällä hetkellä sitä suojaa vain se,
   että ankkurityökalu rajaa samat rivit pois. Korjaus olisi yhden listan
   yhtenäistäminen; se on oma eränsä, koska se muuttaa polton
   luokittelulukuja (`sisaisia` / `ilmanAnkkuria`) ja siten
   `tests/nostopoltto-merkkiportti.test.mjs`:n odotuksia.
2. **Savukkeen kolme punaista (Marseillen liuska) ovat yhä auki** ja
   samat kuin v1945:ssä — eivät tämän erän aiheuttamia, mutta ne
   peittävät alleen sen, ettei Marseillen liuskaa mitata lainkaan.
3. **`avaaKarttaSuurennos` on 450 riviä pitkä** ja tekee kuusi eri asiaa
   (klooni, valintakerros, selitelista, työkalut, levitys, zoomikytkentä).
   Tämän erän muutos mahtui kolmeen kohtaan, mutta seuraava lippu ei
   välttämättä mahdu — funktio kannattaisi pilkkoa ennen kuin siihen
   tulee neljäs asetus.
