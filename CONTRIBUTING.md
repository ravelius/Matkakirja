# Osallistuminen

Kiitos kiinnostuksesta! Lue ensin pelin perustuslaki: Raamatun osio "Perustuslaki: viisi pilaria" (js/tyohuone-raamattu.js, työhuoneen Raamattu-välilehti) —
ne kertovat, millä perusteilla sisältö hyväksytään peliin. Tämä peli on rakennettu niin, että uusien lautojen ja
kysymysten lisääminen on mahdollisimman helppoa — myös ilman syvää
ohjelmointikokemusta. Kaikki muutokset tehdään pull requesteina, ja testit
tarkistavat automaattisesti, että lisäys on ehjä.

## Helpoin tapa: lisää kysymyksiä tai tietoja

Kysymykset ja paikkatiedot ovat tavallisissa JavaScript-tiedostoissa:

- `js/packs/africa-questions.js` — Afrikan lauta
- `js/packs/europe-questions.js` — Euroopan lauta
- `js/packs/middleeast-questions.js` — Lähi-idän lauta
- `js/packs/istanbul-questions.js` — Istanbulin kaupunkilauta
- `js/packs/maailma-questions.js` — Maailma-lauta

Kysymyksen muoto:

```js
{
  q: 'Minkä maan pääkaupunki Tripoli on?',
  options: ['Libya', 'Tunisia', 'Algeria', 'Marokko'],  // aina 4 vaihtoehtoa
  correct: 0,                     // oikean vastauksen paikka listassa (0–3)
  fact: 'Tripoli on Libyan pääkaupunki ja suurin kaupunki.',  // selitys vastauksen jälkeen
  hint: 'Maan öljyvarat ovat Afrikan suurimmat.',  // ostettava vihje
  level: 2,  // vaikeustaso: 1 = helppo, 2 = perus (oletus), 3 = vaikea
  source: 'https://www.britannica.com/place/Tripoli-Libya',  // vapaaehtoinen lähde
}
```

Vaikeustasot: taso 1 on lapsellekin ratkaistavissa, taso 2 on tavallista
yleistietoa ja taso 3 vaatii erikoistietoa — siitä saa pelissä bonuksen.
Jos `level` puuttuu, kysymys on tasoa 2.

Jokaisella laudalla on lisäksi pieni **rosvon kaksintaistelupakka**
(`duels`-lista paketissa): erityisen kiperiä kysymyksiä, joissa on kahdeksan
vaihtoehtoa ja `fact`, mutta ei vihjettä — helpotukset hoitaa rosvo.

### Lähde

Periaate 2 sanoo, että jokainen pelin väittämä on tarkistettavissa. Siksi
kysymykseen, kaksintaisteluun ja paikkatietoon voi liittää `source`-
kentän. Se näkyy pelaajalle vastauksen jälkeen pienenä "Lähde:" -rivinä.

```js
source: 'https://www.britannica.com/place/Tripoli-Libya'   // verkko-osoite
source: 'Maailman valtiot ja liput, WSOY 2019, s. 88'      // kirja
source: ['https://data.worldbank.org/...', 'YK 2023']      // useampi
```

Verkko-osoitteesta näytetään pelkkä palvelimen nimi (`britannica.com`) ja siitä
tulee linkki; sanallinen viite näytetään sellaisenaan. Vain `http`- ja
`https`-osoitteet kelpaavat.

Paikkatieto on joko pelkkä merkkijono tai teksti lähteineen — vanha
muoto kelpaa yhä sellaisenaan:

```js
kairo: [
  'Kairon halki virtaava Niili on koko Egyptin elämänlanka.',
  { text: 'Kairon asukasluku ylittää 20 miljoonaa.', source: 'YK 2023' },
],
```

**Lähde on toistaiseksi vapaaehtoinen**, koska suurin osa vanhasta sisällöstä on
kirjoitettu ennen kentän olemassaoloa. Uuteen sisältöön se kannattaa aina
merkitä. Nykytilanteen näkee komennolla:

```bash
node tools/source-report.mjs             # kattavuus laudoittain
node tools/source-report.mjs --missing   # lista lähteettömistä
```

Hyvä lähde on sellainen, josta väitteen voi oikeasti tarkistaa: tietosanakirja,
tilastolaitos, museo, yliopisto tai kirja sivunumeroineen. Älä merkitse lähdettä,
jota et ole itse lukenut.

Pelisäännöt kysymyksille (testit valvovat näitä):

- tasan neljä erilaista vaihtoehtoa
- `fact` ja `hint` ovat pakollisia
- vihje **ei saa sisältää** oikeaa vastausta sellaisenaan
- sama kysymysteksti ei saa esiintyä laudalla kahdesti
- jos `source` on annettu, se on merkkijono tai lista merkkijonoja, ja
  verkko-osoitteen pitää alkaa `http://` tai `https://`
- tärkeintä: **tarkista faktat!** Peli on opetuspeli, joten jokaisen väitteen
  pitää olla totta.

## Isompi urakka: kokonaan uusi lauta

Jokainen lauta on *karttapaketti* hakemistossa `js/packs/`. Moottoriin ei
tarvitse koskea — paketti kertoo kaiken: kartan ääriviivat, kaupungit, reitit,
laattamäärät, kysymykset ja teeman. Malliksi kannattaa avata
`js/packs/middleeast.js`, joka on kommentoitu tätä varten.

Vaiheet:

1. **Kopioi pohjaksi** `js/packs/middleeast.js` ja `js/packs/middleeast-questions.js`
   uusilla nimillä (esim. `southamerica.js`).
2. **Projisoi kartta.** Valitse alueen pituus- ja leveysastevälit ja laske
   koordinaatit 1000×1000-ruudukkoon samalla kaavalla kuin olemassa olevissa
   paketeissa (kaava on tiedoston alun kommentissa). Rannikko piirretään
   pistelistana, joka pehmennetään automaattisesti käyräksi.
3. **Sijoita kaupungit** todellisille paikoilleen (`start: true` kahdelle
   aloituskaupungille, `airport: true` lentokentille). Kaupunkien on oltava
   vähintään `minCityDistance`-yksikön päässä toisistaan.
4. **Vedä reitit.** `steps` on reitin pituus silmälukuina. Laivareitit saavat
   `type: 'sea'` ja tarvittaessa `via`-pisteet, joilla reitti kiertää rannikon —
   testit tarkistavat, että laivareitit kulkevat veden päällä.
5. **Mitoita laatat.** Laattojen yhteismäärän on oltava sama kuin
   aarrekaupunkien määrä (kaupungit miinus aloituskaupungit), ja pääaarteita
   (`star`-laattoja) on aina tasan yksi. **Keksi laudalle oma aarre:**
   Jokaisella laudalla on oma pääaarteensa — se on aina paikallinen
   legenda, kuten Meripihkahuoneen aarre (Eurooppa), Montezuman aarre
   (Pohjois-Amerikka) tai Lapin kulta (Suomi). Nimi annetaan
   `tokens.types`-kohdassa ja `texts`-teksteissä.
   **Järvet ja kaupunkilaudat:** suuret järvet voi piirtää vetenä maan
   sisään (`map.lakes` — malli: `js/packs/suomi.js`), ja niiden yli voi vetää
   laivareittejä. Kaupunkitason lauta saa `style: 'city'`, jolloin solmut ja
   nimet piirtyvät pienempinä ja maastoon tulee kortteleita (malli:
   `js/packs/istanbul.js`).
6. **Kirjoita sisältö:** vähintään 2 kysymystä joka aarrekaupungille, vähintään
   10 yleiskysymystä ja vähintään 2 paikkatietoa joka kaupungille.
7. **Linkitä lauta maailmaan.** Kaupungille voi antaa `links`-listan, joka
   yhdistää sen toisen laudan kaupunkiin (esim. Kairo on sekä Afrikan että
   Lähi-idän laudalla, ja Lähi-idän Istanbulista laskeudutaan Istanbulin
   kaupunkilaudalle). Vaellustilassa pelaaja voi siirtyä linkkiä pitkin.
   Linkkien on oltava vastavuoroisia: kohdekaupungista pitää päästä myös
   takaisin lähtölaudalle — testit valvovat tätä.
   Kaupunkilauta tehdään täsmälleen samalla paketilla — "kaupungit" ovat
   silloin kaupunginosia ja laivareitit vaikkapa lauttoja (malli:
   `js/packs/istanbul.js`).
8. **Rekisteröi paketti** lisäämällä se `js/pack.js`-tiedoston `PACKS`-listaan
   sekä tiedostolistoihin `sw.js` ja `tools/build-standalone.mjs`.
9. **Aja testit:** `npm test`. Testit ajetaan automaattisesti jokaiselle
   paketille: laudan yhtenäisyys, laattamäärät, kysymyspankin eheys,
   laivareittien sijainti vedellä ja kokonainen bottien pelaama peli.

## Uuden linssin lisääminen

Linssi on läpikuultava karttakerros, joka selittää maailmaa: ilmastovyöhykkeet,
korkeuserot, muuttoliike, yön valot. Pelaaja ansaitsee linssit laattojen alta ja
kokemuspisteillä, ja kerrallaan päällä on tarkalleen yksi. Koko rakennusohje
perusteluineen on [docs/moduulit/linssit.md](docs/moduulit/linssit.md);
tässä on se, mitä tekijän pitää tehdä.

Tunnus (esim. `ilmasto`) on sama joka paikassa: tiedostonimi, rekisterin avain ja
`LINSSI.tunnus`.

### 1. Neljä tiedostoa

| tiedosto | kirjoittaja | sisältö |
|---|---|---|
| `tools/mapdata/linssi-<tunnus>.js` | hakutyökalu `tools/hae-*.mjs` | aineisto **asteina** (lon/lat) |
| `tools/tee-linssi-<tunnus>.mjs` | sinä | projisoi asteet laudan pikseleiksi |
| `js/packs/linssi-<tunnus>-lauta.js` | kone | projisoitu aineisto, jonka peli lukee |
| `js/linssit/<tunnus>.js` | sinä | linssimoduuli: yksi `LINSSI`-vakio |

Asteaineisto asuu `tools/mapdata/`-kansiossa eikä `js/packs/`:issa kahdesta
syystä: `js/`-puolella ei ole yhtään lon/lat-muunnosta (asteet ja pikselit
pidetään erillään, ks. `tools/tee-maasto.mjs`), ja jokainen `js/packs/*.js`
kuuluu offline-pakettiin — sinne jätetty asteaineisto kulkisi pelaajan mukana
turhaan toisena kappaleena. Kun siirrät aineiston, muuta myös hakutyökalun
kirjoituspolku.

### 2. Projisointi

Muunnosta ei kirjoiteta uudelleen. `tools/tee-linssi-<tunnus>.mjs` käyttää
yhteistä apuria:

```js
import { sovitaLinssi } from './linssiprojektio.mjs';

const { piste, viiva, rengas, enimmakseenLaudalla, kirjoita } = sovitaLinssi();
```

- **`viiva`** pitää sauman ylittävän viivan yhtenäisenä. Ilman sitä Venäjän
  pohjoisrannan joet piirtyvät vaakaviivana halki kartan.
- **`rengas`** palauttaa yhden **tai kaksi** rengasta (kierron kopio laudan
  toisella laidalla), joten kutsu on aina `flatMap(rengas)` eikä `map(rengas)`.
- **`enimmakseenLaudalla`** karsii muodot, joista yli puolet jää laudan
  ulkopuolelle. Muuten Etelämanner piirtyy möykkynä kartan alle.
- **`kirjoita`** tekee tiedoston `TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA`
  -otsikolla, jossa on lähde, lisenssi ja hakupäivä.

Aja työkalu ja tarkista tulos:

```bash
node tools/tee-linssi-<tunnus>.mjs
```

### 3. Linssimoduuli

`js/linssit/<tunnus>.js` vie tarkalleen yhden vakion. Pakollisia ovat `tunnus`,
`nimi`, `lyhyt`, `ikoni`, `laudat`, `lahde` ja `piirra` (ellei `kerros: false`):

```js
let tiedot = null;

export const LINSSI = {
  tunnus: 'ilmasto',
  jarjestys: 30,                 // valitsimen järjestys, kymmenen välein
  nimi: 'Ilmastolinssi',
  lyhyt: 'Köppenin vyöhykkeet: missä kasvaa sademetsä ja missä aavikko.',
  ikoni: '<path d="M4 14h16"/>', // 24x24 polut ilman <svg>-kuorta
  laudat: ['maailmankartta'],    // '*' = kaikki laudat
  lahde: { aineisto: '…', lisenssi: 'CC BY 4.0', osoite: 'https://…', haettu: '2026-08-04' },

  async lataa() {                // aineisto vasta kun linssiä katsotaan
    if (!tiedot) ({ ILMASTO_LAUTA: tiedot } = await import('../packs/linssi-ilmasto-lauta.js'));
  },
  piirra(ryhma, tila) { … },     // palauta false, jos laudalle ei ole mitään
  selite() { … },                // valinnainen: [{ vari, teksti }]
  askeleet() { … },              // valinnainen: aikataso tai mittarivalinta
  vapauta() { … },               // valinnainen
};
```

Säännöt, joita moottori (`js/linssit/kerros.js`) ja testit valvovat:

- **Ei yhtään SVG-suodatinta** — ei `filter`-attribuuttia, ei `feTurbulence`- tai
  muuta `fe*`-alkiota, ei myöskään rasteroitavan linssin sisällä. iOS:n
  webapp-tila palauttaa suodatetun kerroksen **tyhjänä** taustalta palatessa.
  Tämä on repon toistuvin vika, ja se on huomattu joka kerta vasta iPadilta.
  Pehmeys ja kohina esilasketaan kuvaan tai `<pattern>`-laattaan.
- **Ei `class`-attribuutteja.** Rasteroitava SVG on irrallinen eikä peri sivun
  tyylitiedostoa, joten luokkaan nojaava väri katoaa ja jäljelle jää musta
  läiskä. Jokainen väri ja viivanleveys annetaan SVG-attribuuttina.
- **Peittävyys enintään 0,72**, jotta reitit ja kaupungit näkyvät läpi.
- **Ei ajastimia eikä animaatiota.** Yksikin sykkivä elementti kartan päällä
  pudotti ruudunpäivityksen 60:stä 15 kuvaan sekunnissa. Aikajana askelletaan
  pelaajan komennolla `askeleet()`-vaihtoehdoilla.
- **Ei `id`-attribuutteja.** Kiertävän kartan `<use>`-kopio monistaisi ne. Jos
  gradientti on välttämätön, tunnisteen alkuun tulee `linssi-<tunnus>-`.
- **Ei tapahtumakuuntelijoita** — kerros on `pointer-events: none`, ja
  rasterointi hävittäisi ne joka tapauksessa.
- **Vain laudan koordinaatteja.** Moduuli ei laske asteita eikä tunne
  projektiota, ja se lukee aineistonsa dynaamisella tuonnilla `lataa()`:ssa.
- Sallitut tuonnit: `../mapart.js` (`el`, `kasinPiirretty`) ja oma
  aineistopaketti. Ei `js/ui.js`:ää, `js/game.js`:ää eikä moottoria — ne
  toisivat kiertoviittauksen. `smoothClosedPath` on `js/mapart.js`:n sisäinen
  eikä sitä ole viety ulos; jos linssi tarvitsee pehmennettyä käyrää, vienti on
  oma erillinen muutoksensa.

### 4. Listat, joihin linssi lisätään

1. **`js/linssit/rekisteri.js`** — poista oman rivisi edestä kommenttimerkki.
   Tasan yksi muutos: älä lisää, poista äläkä järjestä rivejä.
2. **`sw.js`** — lisää `./js/packs/linssi-<tunnus>-lauta.js` SHELL-listalle ja
   poista sieltä siirtämäsi asteaineisto. **`CACHE`-riviin ei kosketa** — version
   nostaa yksi tekijä kerran, muuten yhtaikaiset nostot rikkovat testin.
3. **`tools/hae-<x>.mjs`** — kirjoituspolku osoittamaan `tools/mapdata/`-kansioon.
4. **`tools/build-standalone.mjs`** — tänne **ei** lisätä mitään. Yhden tiedoston
   versio jää tarkoituksella ilman linssejä, kuten se jää ilman valokuvia ja
   ääniä; moottori nappaa tuontivirheen ja jättää linssin pois valikoimasta.

### 5. Testit

```bash
npm test
node tools/mittaa-kartta.mjs maailmankartta   # ms/kehys linssi päällä
```

Mitä testit vahtivat:

- `tests/sw.test.mjs` — jokainen `js/`-, `js/packs/`- ja `js/linssit/`-moduuli on
  `sw.js`:n SHELL-listalla. Unohdus ei näy kehityksessä lainkaan, vaan vasta
  lentokoneessa.
- `tests/sw.test.mjs` — yhdessäkään `js/linssit/*.js`-tiedostossa ei ole
  `filter`-attribuuttia eikä `fe*`-suodatinalkiota.
- `tests/linssiprojektio.test.mjs` — projisointi osuu tunnettuihin pisteisiin
  (Helsinki, Sydney, laudan reunat).

Ennen kuin linssi on valmis, käy läpi tarkistuslista
[docs/moduulit/linssit.md](docs/moduulit/linssit.md) luvusta 9.

## Ennen pull requestia

```bash
npm test                        # kaikkien lautojen testit
node tools/build-standalone.mjs # yhden tiedoston versio kokoontuu virheittä
node tools/source-report.mjs    # lähteiden kattavuus
```

Kerro pull requestin kuvauksessa lyhyesti, mistä lähteistä tarkistit
kysymysten faktat.

## Etukäteispuskurin periaate

Omistajan linjaus 15.8.2026: **jokainen pelin vaihe lataa seuraavan
askeleen sisällön valmiiksi taustalla heti, kun se on tiedettävissä.**
Pelaaja ei koskaan odota sisältöä, jonka peli olisi voinut arvata.

- Kaupunkiin saavuttaessa ladataan molempien lehtien etusivut kokonaan
  taustalla ja generoidaan lukijaäänen ensimmäinen pala kumpaankin.
- Lehteä luettaessa VIEREISET sivut ladataan valmiiksi — seuraava ja
  myös edellinen, jos se ei jo ole ladattu (sisällysluettelosta voi
  hypätä keskelle lehteä).
- Jokaiseen UUTEEN toimintoon suunnitellaan etukäteispuskuri samalla
  kun toiminto lisätään; PR-kuvauksessa kerrotaan mitä puskuroidaan ja
  milloin — tai miksi puskuroitavaa ei ole.

Rajat: puskurointi ei saa tukkia yhteyttä (lataukset jonossa muutama
kerrallaan, ks. ui.js esilataaOsoitteet) eikä kuluttaa
generointikiintiöitä sisältöön, jota pelaaja tuskin tarvitsee.

## Uuden laudan hyväksyminen

Lauta hyväksytään, kun molemmat puolet ovat kunnossa:

**Koneellisesti valvottava osa** (`npm test` on vihreä):

- reittiverkko on yhtenäinen ja jokaiseen kaupunkiin pääsee
- laivareitit kulkevat veden päällä ja kaupungit ovat maalla
- laattoja on täsmälleen yksi jokaiseen aarrekaupunkiin, tähtiä tasan yksi
- jokaisella aarrekaupungilla on kysymyksiä ja jokaisella kaupungilla
  Tiesitkö että -tietoja; vihjeet eivät paljasta vastausta
- botit pystyvät pelaamaan laudalla kokonaisen pelin loppuun

**Ihmisen arvioima osa** (Raamatun pilarit 1–4):

- pelaako lauta hyvin: onko reiteissä valinnanvaraa, ovatko etäisyydet
  tasapainossa, onko meri- ja lentoreiteillä merkitystä?
- ovatko faktat tarkistettuja ja lähteet kerrottu?
- kuvataanko alue kunnioittavasti ja monipuolisesti — myös arkea?
- ovatko kiistanalaiset asiat toteavasti ja tasapuolisesti esitettyjä?
- sopiiko sisältö pelin yleisölle (13+) ja onko vaikeustasoja käytetty
  oikein?

Sama lista pienemmässä koossa koskee yksittäistä kysymystä tai kaupunkia.
