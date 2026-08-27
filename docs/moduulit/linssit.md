# Linssit — moduuliohje (linssisopimus)

*(Moduuli: Linssit — docs/moduulirakenne-suunnitelma.md luku 3.
Linjaukset: Raamattu › Karttalinssit. Tämä dokumentti on SITOVA
rakennusohje: koodikommentit (js/linssit/*, js/tokens.js,
js/ui.js, tests/sw.test.mjs) viittaavat sen lukuihin numerolla,
joten LUKUJEN NUMEROT EIVÄT MUUTU — siksi luvut alkavat
ykkösestä ja hyppäävät kuutosesta yhdeksään. Palautettu
arkistosta 17.8.2026 (dokumenttiremontin D4): linssisopimus
arkistoitiin 8.8. suunnitelman mukana, vaikka koodi viittaa
siihen sitovana — luvut 1–6 ja 9 ovat tässä sanatarkasti,
suunnitteluhistoria (luvut 0, 7 ja 8) jäi arkistoon
docs/arkisto/linssit-suunnitelma.md. Tiivis tekijän polku on
CONTRIBUTING.md:n "Uuden linssin lisääminen".)*

## 1. Linssikerroksen arkkitehtuuri

### 1.1 DOM-kohta: oma **elävä** kerros juuriryhmän sisällä

`js/ui.js` `drawBoard` (2887) rakentaa yhden juuriryhmän `g.board-root`
(2896). Linssikerros lisätään **heti `drawMaasto`-kutsun jälkeen
(rivi 2948) ja ennen `clipPath`-lohkoa (rivi 2954)**:

```js
// Linssikerros: staattisen karttakuvan päällä, kaupunkien alla.
this.linssiKerros = el('g', {
  class: 'linssi',
  'pointer-events': 'none',
  ...(pack.map.kiertava ? { 'clip-path': 'url(#linssi-rajaus)' } : {}),
}, root);
```

Perustelut:

* **Juuriryhmän sisään**, koska kiertävä kartta saa sisällön ilmaiseksi:
  `<use href="#lauta-sisalto">` (2917–2923) on elävä viittaus ja seuraa
  kaikkea mitä juuriryhmään lisätään. Jos kerros lisättäisiin suoraan
  `this.svg`:hen, se ei näkyisi sauman toisella puolella lainkaan.
* **Tähän kohtaan**, koska lapsijärjestys on `g.staattinen` (2937) →
  `clipPath#maa-rajaus` (2954) → `g.country-borders` (2960) →
  `g.country-names` (2964) → `g.cities` (3090) → `rect.grain` (3156) →
  nappulat (3158–3162). Linssi on siis koko bittikarttakartan päällä
  mutta kaupunkien, nimien, laattojen, kohderenkaiden ja nappuloiden
  alla — juuri oikein: linssi selittää maailmaa, ei peitä pelitilaa.
* **`pointer-events: none`**, ettei linssi syö kartan omaa
  napautuszoomausta (`js/ui.js` 2700–2740).

Hyväksytty haitta: reitit (`air-routes` 2975, `routes` 3005, `fares`
3035) ovat staattisessa kerroksessa ja siis linssin ALLA. Linssi jää
niiden päälle. Vaihtoehtoa ei ole: reittejä on askelpisteineen noin
tuhat elementtiä (`js/ui.js` 3000–3004), eikä niitä voi nostaa elävään
puuhun. Reitit ovat ohuita viivoja ja näkyvät läpikuultavan linssin
läpi; kaikki linssit piirretään korkeintaan 0,72 peittävyydellä.

### 1.2 Rajaus sauman yli: `clipPath#linssi-rajaus`

Sama `drawBoard`-muutos luo kiertävälle laudalle rajauksen juuriryhmään:

```js
if (pack.map.kiertava) {
  const rajaus = el('clipPath', { id: 'linssi-rajaus' }, root);
  el('rect', { x: 0, y: 0, width: pack.map.width, height: pack.map.height }, rajaus);
}
```

Miksi: `js/mapart.js` `paperi()` 24–41 kertoo mitattu vika: *"jos jatko
on, kopio ja alkuperäinen menevät päällekkäin — ja koska rakeisuus
sekoittuu kertolaskulla, päällekkäinen kaistale tummuu. Ruudulla se
näkyi pystysuorana sävyrajana keskellä merta."* Läpikuultava linssi
tekee tasan saman: peittävyys tuplaantuu vyöhykkeellä, jossa `<use>`
menee alkuperäisen päälle. Mitattu tosiasia: `map.outlines` ulottuu
x = 12178,6 asti eli sisältö todella vuotaa reunan yli.

Rajaus on juuriryhmän sisällä, joten `<use>`-kopio saa saman rajatun
sisällön siirrettynä — kopio kattaa siis tarkalleen `[12000, 24000)`.

### 1.3 Elävä vai rasteroitu: moottori päättää mitatun katon perusteella

Mitatut luvut (`js/mapart.js` 1170–1175): yhdistetyllä laudalla
**7192 elementtiä = 236 ms/kehys** (4 kuvaa/s), Euroopan laudalla
**741 elementtiä = 30 ms/kehys**. Näistä johdettu kustannus on
**0,032 ms/elementti**. 60 kuvaa sekunnissa vaatii alle 16,7 ms/kehys,
ja elävässä puussa on jo noin 700 elementtiä kaupunkeja ja nimiä
(`js/ui.js` 2930–2936). Linssille jää siis muutama sata elementtiä.

Siksi `js/linssit/kerros.js` **laskee elementit ja päättää itse**:

```
LINSSIN_ELEMENTTIKATTO = 400
```

* **≤ 400 elementtiä → elävät vektorit.** Ohut viiva pysyy terävänä
  kaikilla zoomeilla. Tähän menevät kaaret ja viivat: muuttoliike (115 +
  46 kaarta), leviäminen (12 kaarta + 20 pistettä), historia, tuulet, ja
  yökartta (yksi `<image>`).
* **> 400 elementtiä → yksi rasteroitu `<image>` koko laudan alalta.**
  Tähän menevät vyöhykelinssit: topografia (12 vyöhykettä × enintään
  76 rengasta), ilmasto (540 rengasta), kielet (25 kuntaa), maaluvut
  (~200 maata).

Moduulin kirjoittajan ei tarvitse tietää kummalle puolelle hänen
linssinsä osuu. Se on tärkeää: se poistaa yhden päätöksen kymmenestä
rinnakkaisesta työstä.

### 1.4 Rasterointi: yksi koko laudan kuva, ei ruudukkoa

Rasteroitu linssi tehdään **kerran, koko laudan alalta, yhtenä kuvana**
— ei kartan ruudukkokoneistolla.

Miksi ei ruudukkoa (`js/ui.js` `taydennaTaide` 1922–2034):

* Ruudukko pitäisi yleistää ottamaan toinen taidelähde. Se on koko
  suunnitelman riskialttein muutos: rasterointi on korjattu useaan
  kertaan (tyhjä oikea reuna loitonnettuna 1957–1967, ruutujen rajaus
  laudan leveyteen 1979–1980, blob-osoitteiden vapautus 2040–2043).
  Linssi ei ole syy koskea siihen.
* Ikkunaa seuraava ruudukko rikkoisi sauman. `<use>`-kopio näyttää vain
  sen mitä alkuperäisessä on juuri nyt. Sauman kohdalla näkyvä alue on
  yhtä aikaa alkuperäisen `x≈11500…12000` ja kopion `x≈12000…12500`,
  jälkimmäinen alkuperäisen kohdasta `[0,500)`. Ikkunaruudukko ei
  rasteroisi sitä, ja linssi loppuisi pystysuoraan viivaan.
* Koko laudan kuva ei tarvitse panoroinnissa eikä zoomissa mitään
  työtä: se liikkuu CSS-muunnoksen mukana kuten kaikki muu
  (`asetaPan` 1652). **Linssi ei siis maksa yhtään kehystä.**

Tarkkuus ja muisti:

```
LINSSIN_PIKSELIT = 2400   // pisimmän sivun pikselit
```

2400 × 1080 px kattaa laudan 12000 × 5399 → 5,0 laudan yksikköä
pikselillä. Vertailu: yleiskuvassa 420 px leveä paneeli näyttää koko
12000 yksikön leveyden eli 28,6 yksikköä pikselillä — linssi on siis
lähes kuusinkertaisesti tarkempi kuin yleiskuva vaatii, ja lähikuvassa
hieman pehmeä. Se on hyväksyttävää juuri näille linsseille: ilmastoraja,
korkeusvyöhyke ja yövalo ovat pehmeitä reunoja luonnostaan. Sama luku on
jo valittu kertaalleen samasta syystä: `assets/linssit/yokartta.jpg` on
2400 × 1080 (`js/packs/linssi-yokartta.js`).

Muisti: 2400 × 1080 × 4 tavua = **10,4 Mt**. Kartan oma budjetti on
`MUISTIBUDJETTI = 48 Mt` (`js/mapart.js` 1352) ja linssi syö samasta
budjetista, joten:

* kerrallaan on päällä **tarkalleen yksi** linssi,
* vanha blob-osoite **vapautetaan** (`URL.revokeObjectURL`) vaihdossa —
  malli `js/ui.js` 2040–2043,
* `LINSSIN_PIKSELIT` on yksi vakio yhdessä paikassa, jotta sitä voi
  laskea mittauksen perusteella.

Rasterointi noudattaa `rasteroiRuutu`-mallia (`js/mapart.js` 1281–1338):
SVG-merkkijono → blob → `new Image()` → canvas → PNG → **`decode()`
ennen puuhun panemista** (1316–1325, muuten kuva välkkyy vaihtuessaan) →
`el('image', { x, y, width, height, href, preserveAspectRatio: 'none' })`.

`rasteroiRuutu`-funktiota ei kutsuta suoraan, koska sen kovakoodattu
`RUUDUN_PIKSELIT = 1100` -katto koskee kumpaakin sivua erikseen ja
vääristäisi 12000 × 5399 -kuvan. `js/linssit/kerros.js` sisältää oman
`rasteroiLinssi()`-funktion, joka on sama koneisto omalla katolla.
Se on kopio eikä jaettu — sama peruste kuin `tools/hae-topografia.mjs`
11–24: työkalut saavat kehittyä eri suuntiin.

### 1.5 Aineisto projisoidaan rakennusaikana, ei pelissä

`tools/tee-maasto.mjs` 11–18 on repon periaate: *"asteet ja pikselit
pidetään erillään: hakutyökalut tuottavat asteita, tämä tekee
pikseleitä. Jos laudan nollakohta tai leveys joskus muuttuu, vain tämä
ajetaan uudelleen."* `js/`-puolella ei ole yhtään lon/lat-muunnosta
eikä sinne tule.

Jokaisella linssillä on siis oma projisointivaihe:

```
tools/mapdata/linssi-<tunnus>.js      asteet (hakutyökalun tuotos, siirretään tänne)
        ↓  node tools/tee-linssi-<tunnus>.mjs
js/packs/linssi-<tunnus>-lauta.js     laudan pikselit (pelin lukema)
```

Sovitus on tarkalleen sama kuin laudalla ja maastolla:

```js
sovitaMaailma({ leveys: 12000, lon0: -175, etela: -58, pohjoinen: 76 })
```

(`tools/vanha-maailma.mjs` 272; `tools/tee-maasto.mjs` 62–66 käyttää
samaa.) Tästä syntyy `skaala = 1909,8593` ja `korkeus = 5399`, mikä
täsmää `js/packs/maailmankartta.js` kentän `{ width: 12000, height: 5399 }`.

Kolme sääntöä, jotka on **pakko** toistaa jokaisessa projisoinnissa:

1. **Viivoille `muunnaViiva`, ei `muunna`.** Se pitää sauman ylittävän
   viivan yhtenäisenä. Ilman sitä Venäjän pohjoisrannan joet piirtyivät
   vaakaviivana halki kartan (`tools/tee-maasto.mjs` 20–25).
2. **Renkaalle kierron kopio.** `tools/tee-maasto.mjs` 69–81: jos
   `min(xs) < 0`, lisää kopio `x + LEVEYS`; muuten jos `max(xs) > LEVEYS`,
   lisää kopio `x − LEVEYS`. Täyttö ei näy kierron kopiossa, koska
   `<use>` toistaa vain sen mitä on piirretty.
3. **Laudan ulkopuolinen muoto pois enemmistösäännöllä**
   (`tools/tee-maasto.mjs` 83–107): muoto säilyy, jos yli puolet
   pisteistä on välillä `y ∈ [0, 5399]`. Muuten Etelämanner piirtyy
   ruskeana möykkynä kartan alle ja Grönlanti katoaa.

Nämä kolme ovat samat joka kerta, joten ne kirjoitetaan kertaalleen
yhteiseen apuriin `tools/linssiprojektio.mjs` (tehtävä 2), eikä yksikään
linssiagentti kirjoita niitä uudelleen.

Poikkeus: **yökartta** on jo laudan koordinaateissa
(`raja: { x: 0, y: 0, leveys: 12000, korkeus: 5399 }`), koska
`tools/hae-yonkartta.mjs` teki projisoinnin kuvalle. Sillä ei ole
`tee-linssi-*.mjs`-vaihetta.

### 1.6 Linssin vaihto

Vaihto **ei koske karttaan lainkaan**. `js/linssit/kerros.js`:

1. `vapauta()` edelliselle linssille (jos moduuli tarjoaa sen),
2. `URL.revokeObjectURL` edellisen rasterin osoitteelle,
3. `this.linssiKerros.replaceChildren()`,
4. uusi linssi: `await moduuli.LINSSI.lataa?.()` → `piirra(ryhma, tila)`
   → elementtilaskenta → elävä tai rasteroitu → `replaceChildren(tulos)`,
5. `document.body` -luokat: `linssi-paalla`, `linssi-<tunnus>` ja
   `linssi-valokuva` (jos `LINSSI.valokuva`).

Kustannus: raskaalla linssillä yksi rasterointi (mitattavissa
`tools/mittaa-kartta.mjs`:llä; kartan oma ruutu on "satoja
millisekunteja pääsäikeessä", ja linssin muutama sata polkua on
selvästi halvempi kuin kartan 6500 elementtiä). Kevyellä linssillä
kustannus on muutaman sadan elementin luonti eli millisekunteja.

**Mitä vaihto EI vaadi:** ei staattisen taiteen uudelleensarjallistusta
(`valmisteleTaide`, `js/mapart.js` 1253), ei yhdeksän kartturuudun
uudelleenrasterointia, ei `drawBoard`-kutsua. Juuri tästä syystä linssi
ei mene staattiseen kerrokseen, vaikka se olisi visuaalisesti oikeampi
(reittien alla): siellä vaihto olisi noin sekunnin jäätymä
pääsäikeessä, ja alkuperäiset vektorit on jo poistettu
(`poistaVanhatRuudut`, `js/ui.js` 2036–2050).

### 1.7 Ehdottomat kiellot karttakerroksessa

Nämä eivät ole makuasioita vaan korjattuja vikoja.

* **Ei yhtään SVG-suodatinta.** Ei `feTurbulence`, ei `feGaussianBlur`,
  ei `filter`-attribuuttia — ei myöskään rasteroitavan linssin sisällä.
  Perustelu kolmessa paikassa (`js/mapart.js` 72–91, 236–242, 356–358):
  iOS:n webapp-tila palauttaa suodatetun kerroksen **tyhjänä**, kun
  sovellus on ollut taustalla. `js/ui.js` 2986–3004 kertoo lisäopetuksen:
  *"Reittikerros sai pitää suodattimensa, koska se oli pieni.
  Yhdistetyllä laudalla se ei ole pieni."* Linssi kattaa koko maailman —
  se ei ole missään olosuhteissa pieni. Pehmeys ja kohina esilasketaan
  kuvaan tai tehdään esilasketulla `<pattern>`-laatalla kuten
  `grainTile` (`js/mapart.js` 177–222).
* **Ei jatkuvaa animaatiota kartan päällä.** Mitattu: *"Yksikin sykkivä
  elementti suodatetun kartan päällä pakottaa kartan piirtymään
  uudelleen joka kehyksellä (mitattu 15 fps vastaan 60 fps)"*
  (`js/ui.js` 7529–7534). Tämä koskee suoraan aikajanalinssejä
  (historia, leviäminen, muuttoliike): **aikajana on askellettava
  pelaajan komennolla, ei automaattiajastimella.** Jokainen askel
  piirtää kerroksen uudelleen ja jää sitten paikalleen. Kerran
  laukeava 220 ms häivytys vaihdossa on sallittu — se on sama kuvio kuin
  `card-in` korteilla.
* **Ei CSS-luokkia rasteroitavan linssin tyyleissä.** Irrallinen SVG ei
  peri sivun tyylitiedostoa (`js/ui.js` 1858–1866), ja `tyylitSisaan`
  kulkee vain staattisen taiteen läpi. Siksi **jokainen linssin
  visuaalinen ominaisuus annetaan SVG-attribuuttina elementillä
  itsellään** (`fill`, `stroke`, `stroke-width`, `opacity`,
  `stroke-linecap`). Tämä on tarkistettava sääntö eikä tyyliohje: ilman
  sitä rasteroitu linssi on musta läiskä.
* **Ei ulkoisia osoitteita rasteroitavassa merkkijonossa.** Blob-SVG
  ajetaan hiekkalaatikossa, joka ei hae ulkoisia resursseja
  (`js/mapart.js` 1290–1305). Siksi kuvalinssi (yökartta) EI mene
  rasteroinnin läpi vaan on suoraan elävä `<image href="assets/…">`.
* **Ei omia eleitä ilman estoa.** Jos linssiin tulee kosketuseleitä,
  Safarin oma nipistyszoomi on estettävä erikseen (`js/ui.js` 2461–2466).

### 1.8 Paperin rakeisuus

`rect.grain` lisätään juuriryhmään kaupunkien jälkeen (`js/ui.js` 3156)
ja sekoittuu kertolaskulla (`css/styles.css` 2213). Se jää siis linssin
päälle.

Päätös: **piirretyille linsseille rakeisuus jää** — se sitoo linssin
samaan karttaan eikä näytä päälle liimatulta. **Valokuvalinssille
(yökartta) se otetaan pois**, koska valokuva himmenisi ruskeaksi. Toteutus
on valmiina mallina `css/styles.css` 2408:

```css
body.linssi-valokuva .grain { display: none; }
```

---

## 2. Yhteinen rajapinta

Jokainen linssi on **yksi tiedosto** `js/linssit/<tunnus>.js`, joka
vie tarkalleen yhden nimetyn vakion `LINSSI`.

```js
// js/linssit/<tunnus>.js
export const LINSSI = {
  // --- tunniste ---------------------------------------------------------
  tunnus: 'ilmasto',          // pakollinen; sama kuin tiedostonimi ja rekisterin avain
  jarjestys: 30,              // valitsimen järjestys; kymmenen välein, jotta väliin mahtuu
  kerros: true,               // false = ei karttakerrosta (radio, tähtitaivas)

  // --- mitä pelaajalle näytetään ----------------------------------------
  nimi: 'Ilmastolinssi',
  lyhyt: 'Köppenin vyöhykkeet: missä kasvaa sademetsä ja missä aavikko.',
  ikoni: '<path d="M4 14h16"/><path d="M7 10c2-3 8-3 10 0"/>',  // 24x24 polut, ei <svg>-kuorta
  valokuva: false,            // true = paperin rakeisuus pois linssin päältä

  // --- mihin linssi pätee -----------------------------------------------
  laudat: ['maailmankartta'], // pakkatunnukset; '*' = kaikki laudat

  // --- lähdeviite (näytetään linssin tietokortissa) ---------------------
  lahde: {
    aineisto: 'Beck ym. 2018: Present and future Köppen–Geiger climate classification maps',
    lisenssi: 'CC BY 4.0',
    osoite: 'https://doi.org/10.1038/sdata.2018.214',
    haettu: '2026-08-03',
  },

  // --- toiminta ---------------------------------------------------------
  async lataa() { … },              // valinnainen, kutsutaan kerran ennen ensimmäistä piirtoa
  piirra(ryhma, tila) { … },        // pakollinen kun kerros === true
  selite() { … },                   // valinnainen
  askeleet() { … },                 // valinnainen: aikajana tai mittarivalinta
  valitseAskel(avain) { … },        // valinnainen, pari askeleet():lle
  vapauta() { … },                  // valinnainen
};
```

### 2.1 `async lataa()`

Lataa linssin oman aineiston **dynaamisella tuonnilla** ja välimuistittaa
sen moduulin sisäiseen muuttujaan. Palauttaa `undefined`. Kutsutaan
kerran, ennen ensimmäistä `piirra`-kutsua.

```js
let tiedot = null;
export const LINSSI = {
  async lataa() {
    if (!tiedot) ({ ILMASTO_LAUTA: tiedot } = await import('../packs/linssi-ilmasto-lauta.js'));
  },
  …
};
```

Miksi dynaaminen: staattiset tuonnit lataisivat kaikkien linssien
aineiston (yli 1,5 Mt) heti pelin käynnistyessä. Dynaaminen tuonti pitää
aloituksen ennallaan ja maksaa vain sen linssin, jota katsotaan.
Moduulin *metatiedot* (nimi, ikoni, kuvaus) ovat staattisia ja
muutaman kilotavun kokoisia, joten valitsin voi tuoda kaikki
linssimoduulit halvalla.

Seuraus, joka on kirjattava eikä korjattava: `tools/build-standalone.mjs`
(85–163) niputtaa vain `MODULES`-listan moduulit, joten **yhden
tiedoston versio ei saa linssejä**. Se on sama tarkoituksellinen raja
kuin valokuvilla ja äänillä (`js/packs/linssi-yokartta.js` sanoo saman
omasta kuvastaan). Moottori nappaa tuontivirheen ja piilottaa linssin.

### 2.2 `piirra(ryhma, tila)`

**Ainoa pakollinen funktio.** Rakentaa linssin sisällön annettuun
ryhmään.

* `ryhma` — irrallinen `<g>`, jota EI ole vielä puussa. Moduuli lisää
  siihen elementit `el()`-apurilla (`import { el } from '../mapart.js'`).
* `tila` — vain luettava olio:

  ```js
  {
    packId:   'maailmankartta',  // nykyinen lauta
    map,                          // pack.map: width, height, kiertava, outlines, countryShapes
    leveys:   12000,              // map.width, mukavuuskenttä
    korkeus:  5399,               // map.height
    kiertava: true,               // !!map.kiertava
    askel:    null,               // valittu askel (ks. 2.4) tai null
  }
  ```

* Palauttaa `true` tai `undefined` kun sisältöä syntyi, ja **`false` kun
  linssillä ei ole tälle laudalle mitään** — silloin moottori piilottaa
  linssin valitsimesta.

Säännöt:

1. **Vain laudan koordinaatteja.** Moduuli ei laske asteita eikä tunne
   projektiota. Aineisto on jo pikseleinä (luku 1.5).
2. **Kaikki tyylit attribuutteina, ei CSS-luokkina** (luku 1.7).
3. **Ei suodattimia, ei ulkoisia osoitteita, ei animaatioita** (1.7).
4. **Peittävyys enintään 0,72**, jotta reitit ja kaupungit näkyvät läpi.
5. **Ei `id`-attribuutteja**, ellei niitä ole pakko: `<use>`-kopio
   monistaisi ne ja SVG-tunnuksen on oltava yksilöllinen. Jos gradientti
   on välttämätön, tunnisteen alkuun tulee `linssi-<tunnus>-`.
6. **Ei tapahtumakuuntelijoita elementeillä**, koska kerros on
   `pointer-events: none` ja rasterointi hävittäisi ne joka tapauksessa.
   Napautettava sisältö kuuluu luvun 5 paneeliin, ei karttakerrokseen.

### 2.3 `selite()`

Palauttaa taulukon selitysrivejä paneeliin. Ei piirrä mitään.

```js
selite() {
  return [
    { vari: '#3f6b45', teksti: 'Sademetsä' },
    { vari: '#c9a227', teksti: 'Savanni' },
  ];
}
```

Kenttä `vari` on valinnainen (jätä pois viivalinsseille, joissa väri ei
ole luokka). Rivin `teksti` on suomea ja korkeintaan noin 30 merkkiä.

### 2.4 `askeleet()` ja `valitseAskel(avain)`

Vain niille linsseille, joilla on aikataso tai valittava mittari.

```js
askeleet() {
  return {
    otsikko: 'Aika',
    valittu: 'nykyaika',
    vaihtoehdot: [
      { avain: 'historia', nimi: '1800-luku' },
      { avain: 'nykyaika', nimi: 'Nyt' },
    ],
  };
}
valitseAskel(avain) { … }   // asettaa moduulin sisäisen tilan
```

Moottori piirtää vaihtoehdot paneelin liuskoina, kutsuu
`valitseAskel(avain)` ja sen jälkeen piirtää kerroksen uudelleen. Askel
välitetään myös `tila.askel`-kentässä, joten puhtaasti tilaton moduuli
voi lukea sen sieltä eikä tarvitse `valitseAskel`-funktiota lainkaan.

**Askellus on aina pelaajan komennolla.** Ei `setInterval`, ei
`requestAnimationFrame`-silmukkaa (luku 1.7).

### 2.5 `vapauta()`

Kutsutaan kun linssi sammutetaan. Nollaa moduulin sisäisen tilan ja
purkaa mahdolliset ajastimet. Aineiston välimuistin voi jättää — se on
jo ladattu.

### 2.6 Mitä linssimoduuli EI saa tehdä

* Ei tuoda `js/ui.js`:ää, `js/game.js`:ää eikä `js/linssit/kerros.js`:ää
  (kiertoviittaus).
* Ei koskea `document.body`-luokkiin, `localStorage`iin eikä ääniin.
* Ei muokata `tila`-oliota.
* Ei lisätä mitään muuhun DOM-puuhun kuin annettuun ryhmään.

Sallitut tuonnit: `../mapart.js` (`el`, `kasinPiirretty`,
`smoothClosedPath`) ja oma aineistopaketti dynaamisesti.

---

## 3. Rekisteri

`js/linssit/rekisteri.js` on **ainoa yhteinen tiedosto, johon jokainen
linssiagentti koskee**. Siksi siinä on tarkalleen yksi rivi per linssi
eikä yhtään metatietoa — nimet, kuvakset ja kuvakkeet asuvat
linssimoduulissa itsessään, jotta ne eivät koskaan aiheuta
yhdistämisristiriitaa.

```js
// Linssien rekisteri: yksi rivi per linssi, aakkosjärjestyksessä.
//
// Rivillä on vain kolme asiaa: tunnus, manner jonka laatan alta linssi
// löytyy, ja laiska tuonti. Kaikki muu (nimi, kuvake, kuvaus, lähde)
// asuu linssimoduulissa itsessään. Näin uuden linssin lisääminen on
// yhden rivin muutos yhteen tiedostoon, eivätkä kaksi samaan aikaan
// tehtyä linssiä osu samoihin riveihin.
//
// manner: null tarkoittaa, että linssi ansaitaan tietäjäpisteillä eikä
// laatan alta (ks. docs/linssit-suunnitelma.md luku 4).
export const LINSSIT = [
  { tunnus: 'historia',     manner: 'middleeast',    tuo: () => import('./historia.js') },
  { tunnus: 'ilmasto',      manner: 'oceania',       tuo: () => import('./ilmasto.js') },
  { tunnus: 'kielet',       manner: 'europe',        tuo: () => import('./kielet.js') },
  { tunnus: 'leviaminen',   manner: 'africa',        tuo: () => import('./leviaminen.js') },
  { tunnus: 'maaluvut',     manner: null,            tuo: () => import('./maaluvut.js') },
  { tunnus: 'muuttoliike',  manner: null,            tuo: () => import('./muuttoliike.js') },
  { tunnus: 'radio',        manner: null,            tuo: () => import('./radio.js') },
  { tunnus: 'tahdet',       manner: null,            tuo: () => import('./tahdet.js') },
  { tunnus: 'topografia',   manner: 'southamerica',  tuo: () => import('./topografia.js') },
  { tunnus: 'tuulet',       manner: 'asia',          tuo: () => import('./tuulet.js') },
  { tunnus: 'yokartta',     manner: 'northamerica',  tuo: () => import('./yokartta.js') },
];
```

Yhdistämisristiriitojen välttäminen:

* **Aakkosjärjestys tunnuksen mukaan.** Kaksi agenttia lisää rivinsä eri
  kohtaan, joten rinnakkaiset lisäykset eivät osu samalle riville.
* **Ei taulukon lopetusrivin muokkausta.** Rivi lisätään olemassa
  olevien väliin, ei perään.
* **Mantereet on jaettu tässä suunnitelmassa etukäteen** (luku 7), joten
  kaksi agenttia ei voi varata samaa mannerta.
* Rekisteri **ei** sisällä järjestysnumeroa, nimeä eikä ikonia. Ne ovat
  moduulissa.

Rekisteri luodaan kokonaisuudessaan tehtävässä 1 (kaikki yksitoista
riviä valmiina), ja linssiagentit vain **poistavat oman rivinsä edestä
kommenttimerkin**. Se pudottaa ristiriidan todennäköisyyden lähes
nollaan: kaikki rivit ovat jo paikoillaan, eikä kukaan lisää eikä poista
rivejä.

---

## 4. Aarrekytkentä

Omistajan päätökset (`docs/tyolista-opukselle.md` 103–130): yksi aarre
per maanosa; löytäminen laatan alta **ja** tietäjäpisteillä; linssit ovat
pysyviä, varusteet kuluvat.

### 4.1 Uusi laattatyyppi

`js/tokens.js` `TOKEN_TYPES` (9–20) saa kahdeksannen tyypin:

```js
linssi: { id: 'linssi', name: 'Taikalasi', symbol: '◉', value: 0, color: '#7fb3c8' },
```

`value: 0` on olennainen: `revealToken`-switchin `default`-haara
(`js/game.js` 1759–1762) maksaa `token.value` puntaa ja kohtelisi
linssiä jalokivenä. Siksi linssi tarvitsee **oman `case`-haaran ennen
`default`ia**.

### 4.2 Laattamäärät

`js/packs/maailmankartta.js` 4752–4753:

```js
counts: {"star":1,"horseshoe":11,"robber":18,"ruby":30,"emerald":37,"topaz":48,"empty":77,"linssi":7},
```

Summa säilyy: 1 + 11 + 18 + 30 + 37 + 48 + 77 + 7 = **229** =
laattakaupunkien määrä (248 kaupunkia, joista 19 on `start`).
`tests/rules.test.mjs` 124–133 vaatii tämän, ja lisäksi että jokaiselle
`counts`-avaimelle löytyy `types`-määrittely — `themedTokenTypes({})`
antaa sen automaattisesti, kun tyyppi on `TOKEN_TYPES`issa.

Seitsemän laattaa, koska maailmankartalla on seitsemän lähdealuetta
(`LAHTEET`, `js/packs/maailmankartta.js` 39): europe, africa, middleeast,
asia, northamerica, southamerica, oceania. **Yksi laatta per manner** on
siis kirjaimellisesti totta. Loput neljä linssiä ansaitaan
tietäjäpisteillä.

Muut laudat eivät saa linssilaattoja ensimmäisessä erässä: niiden
`counts` pysyy ennallaan.

### 4.3 Manner tunnetaan, laatta jaetaan mantereelle

Kaupungeilla ei ole manner-kenttää, mutta lähdepaketit ovat jo tuotuna.
`js/packs/maailmankartta.js` saa kaksi riviä:

```js
// Mikä manner minkin kaupungin takana on. Tarvitaan linssilaattojen
// jakoon: yksi linssi per manner (omistajan päätös 3.8.2026).
const CITY_MANNER = Object.fromEntries(
  LAHTEET.flatMap((p) => (p.cities ?? []).map((c) => [c.id, p.id])),
);
```

ja `map`-olioon `cityManner: CITY_MANNER`. Muilla laudoilla kenttä
puuttuu ja manner on `pack.id`.

Tarkistettu ajamalla: lähdepakkojen kaupunkilistoissa on yhteensä 252
riviä mutta yhdistetyllä laudalla 248 kaupunkia, eli neljä kaupunkia
esiintyy kahdessa pakassa (esimerkiksi Istanbul Euroopassa ja
Lähi-idässä, Tokio Aasiassa ja Oseaniassa). `Object.fromEntries` antaa
niille **viimeisen** lähdepakan mantereen `LAHTEET`-järjestyksessä.
Se on deterministinen ja riittää: kaupunki on joka tapauksessa vain
yhdellä mantereella pelin kannalta, eikä yksikään niistä ole ainoa
laattakaupunki mantereellaan.

`js/game.js` `enterWorld` (245–263) jakaa laatat nykyisin sekoitettuna
1:1. Linssilaatat **irrotetaan sekoituksesta**:

1. Erota `linssi`-laatat pinosta.
2. Jokaiselle mantereelle, jolla on linssi rekisterissä, valitse pelin
   omalla rng:llä yksi laattakaupunki siltä mantereelta ja aseta siihen
   linssilaatta.
3. Sekoita ja jaa loput laatat lopuille kaupungeille kuten ennen.

Näin joka mantereelta löytyy tarkalleen yksi linssi eikä sattuma voi
kasata kahta samaan maanosaan. Poikkeus kirjataan: jos jollakin
mantereella ei ole yhtään vapaata laattakaupunkia, laatta menee
sekoitukseen mukaan ja arvotaan kuten ennen — peli ei kaadu.

### 4.4 Kumpi linssi laatan alta

`revealToken` (`js/game.js` 1708) saa uuden haaran ennen `default`ia
(1759). Linssi valitaan mantereen mukaan:

```js
case 'linssi': {
  const tunnus = linssiKaupungista(this, cityId);   // js/linssit/omistus.js
  …
}
```

`linssiKaupungista` katsoo `pack.map.cityManner?.[cityId] ?? pack.id`,
etsii rekisteristä sen mantereen linssin, ja jos se on jo omistettu
(mahdollista kehittäjätilassa tai vanhalla tallennuksella), palauttaa
ensimmäisen omistamattoman linssin rekisterijärjestyksessä. Jos kaikki
on omistettu, haara käyttäytyy kuin `empty`: sanoo että kätkö oli tyhjä.

Haaran sisältö on mallinnettu `horseshoe`-haaran (1739–1746) mukaan:
yksi `say`-rivi ja yksi `emit('treasure', …)`, ja lopuksi yhteinen
`checkWin()` + `return type` kuten ennen.

### 4.5 Tietäjäpistereitti

`awardXp` (`js/game.js` 468–471) on **ainoa portti**, jonka läpi jokainen
tietäjäpiste kulkee (kahdeksan kutsupaikkaa: 488, 492, 563, 1330, 1342,
1358, 1373, 1724). Kynnystarkistus kuuluu siis tähän yhteen funktioon:

```js
awardXp(player, amount) {
  const ennen = player.xp ?? 0;
  player.xp = ennen + amount;
  this.tarkistaLinssikynnys(player, ennen, player.xp);
  return amount;
}
```

Kynnykset (`js/linssit/omistus.js`):

```
LINSSIKYNNYKSET = [400, 800, 1400, 2200]
```

Neljä kynnystä, neljä tietäjäpistelinssiä (`manner: null`):
`maaluvut`, `muuttoliike`, `radio`, `tahdet`. Kun kynnys ylittyy, myönnä
seuraava omistamaton `manner: null` -linssi rekisterijärjestyksessä.

Mittakaava: XP-vakiot ovat `XP_NEW_CITY 10`, `XP_NEW_BOARD 50`,
`XP_HARD_ANSWER 25`, `XP_STAR 100`, `XP_PUZZLE 25`, `XP_EXPLORE 15`,
`XP_RECORD 200` (`js/game.js` 88–94). 400 tp on siis noin
kaksikymmentä uutta kaupunkia vastauksineen — ensimmäinen palkinto tulee
selvästi pelin aikana, viimeinen vaatii pitkän matkan.

**Tapahtumalaji on `aid`, ei `treasure`.** `playEvents` suodattaa
`treasure`- ja `robber`-tapahtumat pois (`js/ui.js` 7594–7604), koska ne
nähdään paljastusanimaatiossa. Tietäjäpisteillä ansaittu linssi ei tule
laatan alta, joten `treasure` katoaisi näkymättömiin. `aid`-lajilla on
jo ääni `EVENT_SOUND`-taulussa (`js/ui.js` 714).

### 4.6 Tallennus ja pysyvyys

Kaksi varastoa, eri tarkoitus:

**Pelitallennus** (`matkakirja-save-v1`, `js/game.js` 1791–1832) saa
uuden pelaajakentän `linssit: []` heti `finds`-kentän viereen (rivi 156).
`fromJSON`-spreadiin (1879–1885) tulee oletus:

```js
game.players = data.players.map((p) => ({
  packId: rootPack.id, xp: 0, quizAsked: 0, quizCorrect: 0, linssit: [], ...p,
}));
```

**`toJSON`:n `version`-numeroa EI nosteta.** `fromJSON` hylkää rivillä
1836 kaiken muun kuin `version: 1`, joten numeron nosto tuhoaisi jokaisen
kesken jääneen pelin. Uusi kenttä plus oletusarvo riittää — sama kuvio
kuin `xp`- ja `quizAsked`-kentillä aiemmin. `siirraVanhaMaailma`-tyylistä
rakenteen läpikävelyä (`js/main.js` 91–112) ei tarvita, koska tunnukset
eivät muutu.

**Passi** (`matkakirja.passi.v1`, `js/passport.js`) on ainoa varasto,
joka elää pelin lopun yli. Linssi leimataan sinne omalla etuliitteellä
tarkalleen kuten kunniamerkintä (`js/ui.js` 4416, avain
`kunnia:<packId>`):

```js
stampBoard(`linssi:${tunnus}`, linssi.nimi);
```

`stampBoard` palauttaa `true` vain uudesta leimasta ja kestää estetyn
tallennustilan (palauttaa `false`, peli jatkuu).

**Omistus = passin leimat ∪ pelaajan `linssit`.** Tämä on päätös, ei
sivuseuraus: omistajan sanoin *"Kertakäyttöinen linssi olisi julma —
kerran nähtyä maailmaa ei oteta pois"* (`docs/tyolista-opukselle.md`
128–130). Kerran löydetty linssi toimii siis myös uudessa pelissä.
Pelitallennuksen `linssit`-lista on olemassa siksi, että peli tietää
mitkä linssit löytyivät **tämän** matkan aikana — sitä tarvitaan
laukkunäkymässä ja lokissa.

Kaikki tämä logiikka asuu yhdessä tiedostossa `js/linssit/omistus.js`,
jotta `js/game.js`:ään tulee vain kutsuja:

```js
export function omistetut(game, player)        // Set<tunnus>
export function omistaa(game, player, tunnus)  // boolean
export function myonna(game, player, tunnus)   // { uusi, linssi } — leimaa passiin
export function linssiKaupungista(game, cityId)
export function tarkistaKynnys(game, player, ennen, jalkeen)
```

### 4.7 Näyttöketju: neljä pikkulisäystä, tai linssi on jalokivi

Ilman näitä linssi näkyy timanttina ja kuulostaa timantilta:

1. `REVEAL_SUB` (`js/ui.js` 720–725): rivi `linssi:` — muuten alarivi on
   `+0 puntaa`.
2. `drawTokenIcon` (`js/mapart.js`): oma `case` — `default` on
   jalokivi. Sama kuvake kelpaa `tokenIconSvg`-laukkuun. Paljastus ei
   käytä piirtokuvakkeita lainkaan: se näyttää linssin oman
   varustekuvan (`assets/varusteet/varuste-<tunnus>.jpg`) samassa
   uudessa paljastusnäkymässä kuin aarrekuvat.
3. `treasureSound` (`js/sound.js` 1112–1118): oma haara — `default`
   palauttaa `'gem'`. Ensimmäisessä versiossa `'star'`-ääni kelpaa;
   omaa äänitiedostoa ei lisätä (jokainen uusi mp3 kasvattaa SHELLiä).
4. `renderFinds` (`js/ui.js` 6437–6464): oma rivi ennen jalokivihaaraa.
   Nykyinen suodatin (6455) päästää läpi vain `token.value > 0`, joten
   arvoton linssi ei näkyisi laukussa lainkaan.

---

## 5. Käyttöliittymä

### 5.1 Valitsin: matkalaukussa (18.8.2026)

> **VOIMASSA OLEVA PAIKKA: MATKALAUKKU.** Valitsin (`#linssi-kotelo`,
> `#linssi-valikko`) asuu `#passport-dialog`-ikkunassa "Varusteet"-
> osastona, ja se on ainoa paikka, josta linssit kytketään päälle ja
> pois (omistajan päätös 18.8.2026). Tunnisteet, `js/ui.js`:n
> rakennaLinssivalikko ja koko tahdistus ovat entiset — vain kotelon
> paikka `index.html`:ssä vaihtui, ja kuori purettiin CSS:ssä
> (`.passport-card .linssi-valikko`). Alla oleva kuvaus ylärivin
> napista ja pudotuspaneelista on suunnitteluhistoriaa: nappi siirtyi
> ensin hampurilaisvalikkoon (5.8.2026) ja sieltä laukkuun.

Konkreettinen ratkaisu, ei vaihtoehtolista (historia):

**`.linssi-kotelo` ylärivin `.topbar-actions`-lohkoon kertojanapin
vasemmalle puolelle** (`index.html` 52–63). Nappi näyttää nykyisen
linssin viivakuvakkeen tai, kun linssi on pois päältä, taikalasin
kuvakkeen. Napin painallus avaa pudotuspaneelin, jossa on:

* ylin rivi **"Ei linssiä"** (aina),
* yksi rivi jokaista omistettua linssiä kohti: viivakuvake + nimi +
  `.tappa`-tarke valitulla,
* rivin alla `lyhyt`-kuvaus pienellä, kun rivi on valittu,
* alimpana **"Mistä tämä tieto on?"**, joka avaa `lahde`-kentät
  pergamenttikortissa.

**Nappi näkyy vain, jos pelaaja omistaa vähintään yhden linssin.**
Uudelle pelaajalle ylärivi pysyy siis tarkalleen sellaisena kuin omistaja
sen jätti (`index.html` 45–46: *"tilaa vapautui, kun ylävalikon napit
siirtyivät hampurilaisen alle"*).

Miksi tämä eikä muu:

* Kuvio on valmiina kahdesti: kertojavalikko (`css/styles.css` 182–224)
  ja päävalikko (257–299) ovat sama `.kotelo` + absoluuttinen paneeli
  (`top: calc(100% + 0.35rem)`, `z-index: 60`, `--panel-tausta`,
  `1px --line`, `radius 10px`). `.valittu`-luokka ja `.tappa`-tarke
  (213–224) ovat myös valmiina. Sulkeutumislogiikka on kirjoitettu
  (`js/main.js` 261–288: valinta, `pointerdown` muualle, `Esc`, eivät
  kaksi valikkoa yhtä aikaa).
* **Kosketuslaitteella se toimii.** Ylärivi ei katoa millään
  laitteella. `@media (pointer: coarse) { button { min-height: 46px } }`
  (3796–3799) antaa riveille kosketuskoon ilmaiseksi.
  (Vanha muotoilu neuvoi tässä välttämään kartan oikeaa reunaa, koska
  zoomipainikkeet `.zoomi` piilotettiin siellä kosketuslaitteilta.
  Painikkeet POISTETTIIN kokonaan 27.8.2026 — zoomi ja panorointi
  hoidetaan eleillä — joten kartan oikea reuna on nyt vapaa.)
* Vaaka-asentoon ei suunnitella mitään: `pointer: coarse` +
  `orientation: landscape` piilottaa koko `.appin` (3812–3836).

Kartan päälle ei tule uutta pysyvää käyttöliittymää. Se on tarkoituksella:
`.rail`-kerros on jo kartan päällä (`css/styles.css` 804–818) ja kartta
on peli, ei työpöytä.

### 5.2 Selite ja askeleet: pergamenttikortti kartan nurkassa

Kun linssi on päällä ja `selite()` palauttaa rivejä, kartan alanurkkaan
piirtyy pieni pergamenttikortti `.linssi-selite`, joka nojaa
`.fact-card`-tyyliin (`css/styles.css` 2106–2124): rakeisuus,
katkoviivareuna, `card-in`-saapuminen. Sisältö: linssin nimi, värilaput
ja tekstit, ja `askeleet()`-vaihtoehdot **tutki-ikkunan liuskakuviolla**
(`js/ui.js` `rakennaLiuskat` 5377–5432, `css/styles.css` 4078–4147 ja
4740–4756).

Liuskakuvio on tähän oikea, koska se on tehty juuri yhden asian
valintaan ja mitoitettu mahtumaan yhdelle riville 360 px:n puhelimella
(4740–4756: yhdeksän liuskaa, 18 px kuvake, gap 0.15rem), eikä se vierity
vaakaan — vieritys piilottaisi vaihtoehtoja (4090–4094).

Yksi korjaus kuviota kopioitaessa: nykyiset liuskat saavat
`role="tab"` ja `aria-selected` mutta emo ei saa `role="tablist"` eikä
nuolinäppäimiä ole (`js/ui.js` 5412–5428). Linssin liuskoihin
kirjoitetaan `aria-pressed`-napit `role="tab"`-liuskojen sijaan — se on
oikea rooli ilman puuttuvaa näppäimistönavigointia.

Selitekortti on tavallista DOM:ia kartan päällä eikä SVG:tä, joten
`pointer-events` toimii normaalisti ja kierron kopio ei koske sitä.

### 5.3 Valittu linssi on asetus, ei pelitila

Päällä oleva linssi tallentuu omaan localStorage-avaimeen
`matkakirja-linssi` samaan tapaan kuin `matkakirja-aani` ja
`matkakirja-kertoja`. Se ei kuulu pelitallennukseen: se on katselutila,
ei pelin tapahtuma. Kelvoton tai omistamaton arvo ohitetaan hiljaa.

### 5.4 Kiikaria ei kytketä ensimmäisessä versiossa

`.kiikari` (`index.html` 116, `css/styles.css` 430–530) on olemassa ja
omistaja on varannut sen taikalaseille, mutta se on koko ruudun
sumennus- ja sävykerros. `js/mapart.js` 244–250 ja `js/ui.js` 3150–3155
kertovat mitä koko ruudun sekoituskerrokset ovat aiemmin maksaneet
(*"15 fps pysyvästi, myös silloin kun mitään ei tapahtunut"*). Kiikarin
kytkeminen linssiin on siis oma, **mitattava** tehtävä
(`tools/mittaa-kartta.mjs`) eikä osa tätä erää. Linssin vaihto näkyy
kerran laukeavana 220 ms häivytyksenä kerroksen omalla
`opacity`-siirtymällä.

---

## 6. Kansiorakenne

```
js/linssit/
  kerros.js          moottori: piirto, elementtilaskenta, rasterointi, vaihto
  rekisteri.js       yksitoista riviä, ainoa yhteinen tiedosto
  omistus.js         laatta, tietäjäpistekynnys, passi, tallennus
  historia.js        \
  ilmasto.js          |
  kielet.js           |
  leviaminen.js       |
  maaluvut.js         >  yksi tiedosto per linssi, ei ristiin viittauksia
  muuttoliike.js      |
  radio.js            |
  tahdet.js           |
  topografia.js       |
  tuulet.js           |
  yokartta.js        /

tools/
  linssiprojektio.mjs        yhteinen projisointiapuri (sovitaMaailma + sauma + karsinta)
  tee-linssi-<tunnus>.mjs    yksi per vektorilinssi
  mapdata/linssi-<tunnus>.js hakutyökalun tuotos asteina (siirretään js/packs:ista)

js/packs/
  linssi-<tunnus>-lauta.js   projisoitu aineisto, pelin lukema
  linssi-yokartta.js         jo laudan koordinaateissa, ei projisointia
```

Aineiston siirto `js/packs` → `tools/mapdata` on osa jokaista
linssitehtävää, ja siihen kuuluu myös vastaavan `tools/hae-*.mjs`
-työkalun kirjoituspolun muutos. Syy: asteaineisto on rakennuksen
sisääntulo, ei pelin luettavaa, ja `tests/sw.test.mjs` 30–38 vaatii
jokaisen `js/packs/*.js`-tiedoston SHELL-listalle. Ilman siirtoa
offline-paketti kantaisi saman aineiston kahtena versiona (yli 1,3 Mt
turhaa).

---

## 9. Tarkistuslista ennen kuin linssi on valmis

- [ ] `js/linssit/<tunnus>.js` vie `LINSSI`-vakion, jossa on `tunnus`,
      `nimi`, `lyhyt`, `ikoni`, `laudat`, `lahde` ja `piirra`.
- [ ] Ei `filter`-attribuuttia, ei `feTurbulence`, ei `class`-attribuuttia
      piirretyissä elementeissä.
- [ ] Kaikki värit ja viivanleveydet SVG-attribuutteina; peittävyys ≤ 0,72.
- [ ] Ei ajastimia, ei `requestAnimationFrame`-silmukkaa.
- [ ] Aineisto luetaan `js/packs/linssi-<tunnus>-lauta.js`:stä
      dynaamisella tuonnilla `lataa()`-funktiossa.
- [ ] `tools/tee-linssi-<tunnus>.mjs` käyttää `tools/linssiprojektio.mjs`:ää
      ja kahdentaa sauman ylittävät renkaat.
- [ ] Projisoitu tiedosto alkaa `TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA`
      -otsikolla, jossa on lähde, lisenssi ja hakupäivä.
- [ ] Asteaineisto siirretty `tools/mapdata/`-kansioon ja
      `tools/hae-*.mjs` kirjoittaa sinne.
- [ ] `sw.js` SHELL: projisoitu tiedosto lisätty, siirretty poistettu.
      `CACHE`-riviin ei koskettu.
- [ ] `js/linssit/rekisteri.js`: vain oman rivin kommenttimerkki poistettu.
- [ ] `npm test` vihreä.
- [ ] `tools/mittaa-kartta.mjs` ajettu linssi päällä ja ms/kehys kirjattu.
- [ ] Kaikki kommentit, muuttujat ja tulosteet suomeksi, ja kommentit
      kertovat **miksi** eivät mitä.
