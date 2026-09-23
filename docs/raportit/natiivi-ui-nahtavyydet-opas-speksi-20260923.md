<!-- Natiivi-UI 23.9.2026: toteutusspeksi nähtävyyksille, kohdekartalle ja turistioppaalle (koottu webin koodista ja v12-paketista). Seuraavan Natiivi-UI-session työohje. -->

# Nähtävyydet, kohdekartta ja turistiopas: toteutusspeksi natiiviin Unity UI Toolkit -toteutukseen

Speksi perustuu webin koodiin, v12-sisältöpakettiin ja natiivin nykyisiin UI-tiedostoihin. En muokannut yhtään tiedostoa.

**Lähteet**
- **Web** (juuri `/Users/Shared/Claude/Matkakirja-natiivi-ui/`):
  - `js/nahtavyydet.js`: `piirraKaupunkiKartta` r. 287, `avaaKarttaSuurennos` 1207, `piirraMatkailijalle` 1675, `avaaNahtavyys` 1991, selaus ja valikko 2426–2596, kuvat ja karuselli 2618–2755.
  - `js/opas.js` (koko tiedosto).
  - `js/kaupunkinosto.js`: `avaaTuristiOpas` 690, `latoNahtavyysnakyma` 921, `avaaNahtavyysnakyma` 975, popupit 586–680.
  - `js/lehti.js`: `avaaTiivisLehtiarkki` 2731, lehden etusivun kartta 540–560.
  - `js/pallolauta/kaupunkiliuska.js`: `liuskanRivit` 236.
  - `js/pallolauta/lauta.js`: rivien napautus 3641–3674, `liuskanSisalto` 2289, turisti-infon kyltin kytkin `KYLTTI_KARTALLA = false` 4232.
  - `index.html` 896–940 (`#nahtavyys-dialog`).
  - `css/styles.css`: 13606–13624, 17561–18650, 18848–19310, 19362–19880, 20373–20550.
  - `css/kaupunkinosto.css`.
- **Paketti** `/Users/Shared/Claude/sisalto-koe/v12/`: `kokoelmat/nahtavyydet.json`, `kokoelmat/kaupunkilehdet.json`, `moduulit/js/packs/{maakartat,miniatyyrit,henkilot,saatiedot}.json`, `media.json`.
- **Natiivi** `/Users/Shared/Claude/proto-3d/Matkakirja-proto/Assets/Matkakirja/`: `UI/KaupunkiKortti.cs`, `UI/Lehti/Lehtinakyma.cs`, `UI/Lehti/LehtiSisalto.cs`, `UI/Lehti/Kuvasuurennos.cs`, `UI/NostoSisalto.cs`, `Scripts/Peli/NakymaSopimukset.cs` (`KaupunkiToiminnot`).
- **docs/moduulit/**: vain sivumainintoja.
  - `kaupunkilehti.md` r. 249–293: miniatyyrien sitkeä lataus, jono 4 rinnakkaista, 4 yritystä.
  - `aanet.md` r. 49: linssin musiikki hiljenee, kun nähtävyyskortti on auki.
  - Omaa moduulisivua nähtävyyksille, kohdekartalle tai oppaalle ei ole.

---

## 1. Kulku

**A. Kaupunkiliuskan rivit** (kaupunkimerkin napautus pallolla)
- Yläryhmä järjestyksessä:
  1. Kaupungin nimi (laji `lehti`)
  2. "Nähtävyydet" (`nahtavyydet`)
  3. "Turistiopas" (`opas`)
  4. "Liiku tänne" (`liiku`), vain jos siirto on tarjolla
- Tämän jälkeen hiusviiva ja kategoriarivit, esim. "Historia (5)", haitarina.
- **Näkyvyysehdot** (`lauta.js` 2289):
  - Nähtävyydet näkyy vain, jos kaupungilla on kohdekartta (`KAUPUNKIKARTAT[id]`, 183 kaupunkia).
  - Turistiopas näkyy vain, jos kaupungilla on oppaan artikkeli (`kansi.matkailijalle.artikkeli.teksti`, 193 kaupunkia).
  - Ilman sisältöä rivi jää pois.
- **Mitä rivit avaavat:**
  - Nimirivi avaa kaupungin esittelyn: herokuva, kaksi pikkukuvaa (ennen/nyt) ja leipäteksti. Se ei avaa koko lehteä.
  - "Nähtävyydet" avaa **nähtävyysnäkymän** tiiviiseen lehtiarkkiin (ks. 3a).
  - "Turistiopas" avaa **oppaan** suoraan isona nähtävyysarkkina opastaitolla (ks. 4). Välipopupia ei ole.
- **Natiivissa ero:** `KaupunkiKortti.cs` sisältää rivit "Lue kaupunkilehti", "Mannerlento" ja "Liiku tänne".
  - Lisää "Nähtävyydet" ja "Turistiopas" heti "Lue kaupunkilehti" -rivin alle samoilla ehdoilla.
  - `KaupunkiToiminnot` tarvitsee kentät `Nahtavyydet` ja `Opas` (Action, null piilottaa rivin). Ne lisää Pelikoodari.
  - Ikoniehdotus: Nähtävyydet = silmä (webin symboli `silma`), Turistiopas = kirja tai kompassi.

**B. Lehden etusivun Matkailijalle-lohko** (`piirraMatkailijalle`)
- Sijainti: lehden etusivun lopussa kohdekartan jälkeen.
- Oppaaseen johtaa kolme sisäänkäyntiä, joilla on sama avaaja:
  1. Lohkon oikean yläkulman vino **"Matkaopas"-nauha** (`button.opas-nauha`)
  2. Matkailijalle-kuvan napautus. Se avaa oppaan, ei kuvasuurennosta.
  3. Viimeisen kappaleen perään lisätty linkki **"Lue lisää matkailijan oppaasta →"**
- Natiivin `Lehtinakyma.cs` (r. 246–252) piirtää nyt pelkän otsikon "MATKAILIJALLE", kuvan ja kappaleen. Kaikki kolme sisäänkäyntiä puuttuvat, ja kuva avaa suurennoksen.

**C. Lehden etusivun kohdekartta**
- `piirraKaupunkiKartta` täysversiona: otsikko "Nähtävyydet", esittely kahdessa palstassa, kartta, kohdeluettelo, lähde ja galleria-nappi.
- Kohteen napautus avaa nähtävyysarkin.

**D. Turisti-info-merkki**
- Merkki on web-koodissa **pois päältä** (`KYLTTI_KARTALLA = false`). Sen korvaa liuskan Turistiopas-rivi.
- Myös `avaaTuristiInfo` (välipopup) ja `avaaKaupunkipopup` (iso popup) ovat kuollutta koodia. Natiiviin niitä ei tehdä (ks. 5).

**Sulkeminen**
- **Nähtävyysarkki:**
  - Sulje-nappi alhaalla
  - Napautus taustaan (ensin suljetaan mahdollinen kuvasuurennos)
  - Esc
- **Tiivis lehtiarkki (nähtävyysnäkymä):** ✕ otsikon oikeassa päässä tai napautus taustaan, molemmat ääni `paper`.
- **Kartan kokoruutu:** × kulmassa, Esc tai taustan napautus. Paluu edelliseen näkymään.
- **Pinoutuminen:** kohteen avaus kokoruudusta sulkee ensin kokoruudun. Nähtävyysarkki aukeaa lehtiarkin päälle, ja sen sulkeminen palauttaa lehtiarkin.

---

## 2. Nähtävyysarkki (`#nahtavyys-dialog`, `avaaNahtavyys`)

Arkki on modaali ja keskitetty. Paperi on lehden (`#f5f0e2` rakeella), mutta ilman lehden sivukoristetta (`::before` = none).

**Mitat** (1 rem = 16 px)
- Puhelin (< 700 px): leveys min(90vw, 640 px). Arkki ankkuroidaan alareunaan 0,6 rem + turva-alue. Korkeus enintään ruutu − 2,85 rem − turva-alueet.
- ≥ 700 px: min(92vw, 860 px). Opas ≥ 760 px: min(84vw, 840 px).
- Sisällön padding: 19 / 18 / 16 px (ylä / sivut / ala). Kortti vierittää sisäisesti.

**Rakenne ylhäältä alas**
1. **Kiinteät kulmanapit.** Nämä ovat kortin sisaruksia eivätkä vieritä sisällön mukana.
   - **☰** oikeassa yläkulmassa (top 9 px, right 10 px):
     - Koko 34 × 34 px, pohja rgba(246,231,198,.9), reunus 1 px rgba(70,51,31,.35), kulmapyöristys 6 px, merkki 17 px.
     - Avaa pudotusvalikon (top 46 px, right 10 px):
       - Leveys enintään min(80 %, 320 px), korkeus enintään 60vh, pohja `#f5f0e2`, varjo 0 8 24 rgba(20,14,6,.35), pyöristys 8 px.
       - Rivit: numero + nimi, fontti 14,7 px, padding 7 × 10 px. Nykyinen kohde: pohja rgba(70,51,31,.12), lihavoitu.
     - Valikossa ovat kaikki kartan kohteet, joilla on teksti tai wiki. Nappi piiloon, jos kohteita on alle kaksi, ja aina oppaassa.
   - **←** vasemmassa yläkulmassa: 34 px pyöreä, samat värit. Näkyy vain, kun paluupinossa on jotain, eli henkilölinkki on vaihtanut sisällön. Paluu palauttaa myös vierityskohdan.
   - **‹ ›** pystykeskellä: 32 px pyöreät, fontti 18 px, 16 px kortin reunan yli. ≥ 760 px: 38 px ja 50 px kortin ulkopuolella.
     - Selauslista = kartan kohteet, joilla on **teksti ja vähintään yksi kuva**. Selaus kiertää ympäri.
     - Myös nuolinäppäimet ja 40 px:n vaakapyyhkäisy kortilla, paitsi kuvan tai valikon päällä.
     - Vaihdon ääni `paper`.
2. **Aikarivi:** "KOHDE 5 · 1296–1436" (`Kohde {numero}` · `data.aika`).
   - Konekirjoitusfontti 11,5 px, harvennus .22em, versaali, rgba(70,51,31,.72).
   - Piiloon, jos rivi on tyhjä.
3. **Otsikko h2** = `nimi`: alamarginaali 11 px, riviväli 1.15. Loppuun kaiutin (lukija), joka lukee kortin tekstin.
4. **Kappaleet** (`teksti` jaettuna `\n\n`):
   - Riviväli 1.62, alamarginaali 13,6 px.
   - **Vuosiluvut lihavoidaan** konekirjoitusfontilla 0.95em. Regex `vuosikorosta` r. 2382: 3–4-numeroiset, välit, -luvulla, eaa./jaa.
   - **Henkilölinkit:**
     - `HENKILOLINKIT[kaupunki]`, regex `kuvio`, vain ensimmäinen osuma per henkilö per kappale.
     - Tyyli: väri rgba(107,76,34,.95), pisteviiva-alleviivaus.
     - Napautus avaa henkilön (`HENKILOT[id]`: nimi, aika, teksti, kuvat, lahde) samaan arkkiin ja lisää edellisen jutun pinoon.
   - **Miniatyyripiirros:** jos kohteella on miniatyyri (`MINIATYYRIT[kaupunki][nimi]`), se kelluu **ensimmäisen kappaleen alussa oikealla**. Leveys clamp(112 px, 34 %, 176 px), varjo.
5. **Kuvat** (`data.kuvat`, enintään 5):
   - Ensimmäisen kappaleen jälkeen:
     - yksi kuva → kehys
     - useampi → **karuselli**: ‹ ›, laskuri "1/3", pyyhkäisy 40 px
   - Leveys: vaakakuva 100 %. Pystykuva min(46 %, 420 px), puhelimessa 100 %. Pyöristys 4 px.
   - Kuvan napautus avaa suurennoksen (natiivissa `Kuvasuurennos`).
   - Kuvateksti:
     - `lyhyt ?? selite`, 14 px
     - lähde (`lahde`) konekirjoitusfontilla 10 px, rgba(70,51,31,.66)
6. **Lainaus** (`data.lainaus {teksti, lahde}`):
   - Paikka: kappaleen ceil(n/2) jälkeen.
   - Vasen reunus 3 px rgba(70,51,31,.4).
   - Teksti kursiivilla 17 px. Lähde konekirjoitusfontilla 11,8 px.
7. **Loppuosa:**
   - Jos kohteella on `wiki` (ks. epävarmat kohdat), näytetään nappi **"Lue lisää aiheesta"** (tyyli `wiki-btn`), joka avaa Wikipedian.
   - Muuten lähderivi konekirjoitusfontilla 11,5 px: `"Wikipedia"` → "Matkakirjan oma teksti · lähteenä Wikipedia", muuten lähde sellaisenaan.
8. **Galleria-nappi** "Lisää kuvia": Commons-haku, 500 m säde. Natiivissa valinnainen.
9. **Reaktiot:** sydän ja peukku alas, avain `juttuAvain(kaupunki, nimi)`.
10. **Pöllöpoimintojen pillerit.**
11. **Sulje-nappi** (primary) alhaalla.

**Matkakirjan ihme** (`matkakirjanIhme(nimi)`)
- Jos ihme on kadonnut, sen kuva on ensimmäinen kuva.
- Muuten "Koe ihme" -nappi kuvakehyksen perään.

**Fontit:** leipäteksti Iowan Old Style (`--font-luku`, natiivissa `Kirjasin.Luku`). Aika, lähteet ja vuosiluvut American Typewriter (`--font-type`, `Kirjasin.Kone`).

---

## 3. Kohdekartta

### 3a. Nähtävyysnäkymä (liuskan "Nähtävyydet", `latoNahtavyysnakyma`)
- Tiivis lehtiarkki, jolla on lehden leveys ja paperi.
- Yläosassa vain h2 "Nähtävyydet" (clamp(19 px, 4.5vw, 26 px)) ja ✕.
- Arkki on sisältönsä korkuinen ja keskitetty.
- Sisältö:
  - Oikealla ylhäällä nappi **"⤢ Kokoruutu"**.
  - Kartta **ilman** omaa otsikkoa, ± -nappeja, opastekstejä ja kohdeluetteloa.
  - Kartan alla esittely (`KAUPUNKIKARTAT[id].esittely`):
    - alle 900 merkkiä → koko teksti
    - muuten ensimmäinen lause ja nappi "Lue lisää", joka jatkaa **samaa kappaletta**
  - Ei galleriaa.

### 3b. Kartta itse (`piirraKaupunkiKartta`)
- **Rasterikuva.** Ei vektoria.
  - Käytetään `varikartta`, jos se on olemassa (23 kaupunkia), muuten `polku` (esim. `assets/kartat/firenze-keskusta.png`, OSM-pohjainen juliste).
  - Lähderivi `lahde`, esim. "© OpenStreetMap-tekijät (ODbL)".
- **Kehys:**
  - Kuvasuhde:
    - `piirtoRajat`-kentän kanssa (24 karttaa): `karttaKuvasuhde(rajat)`.
    - Ilman sitä: kuvan omat mitat.
  - Reunus 1 px rgba(70,51,31,.4), pyöristys 2 px.
  - Jos `piirtoRajat` on olemassa, kuva on ydinrajausta laajempi: lava = kehys / `ydinAla`-osuus, negatiivinen siirto. Levossa näkyy täsmälleen ydinrajaus. Reunus paljastuu vasta zoomatessa.
- **Pisteet** (`kohteet[]`: nimi, lat, lon, valinnaiset `nimiPuoli`, `siirto{x,y}` px, `nosto`, `wiki`):
  - Paikka prosentteina lavasta `karttapiste(kartta, lat, lon)`:
    - lineaarinen muunnos `piirtoRajat ?? rajat` -alueelta
    - kainalot (16 karttaa) omilla rajoillaan
    - laea-projektio vain maakartoilla
  - **Piirroskohde** (miniatyyri löytyy):
    - 40 × 40 px, läpinäkyvä webp, varjo, keskitetty pisteeseen.
    - Ensimmäinen napautus valitsee: piirros liukuu kehyksen keskelle ja kasvaa 37,5 %:iin kehyksen korkeudesta (160 ms).
    - Kyltti "8 · Nimi" piirroksen jalan alle: konekirjoitusfontti 15 px, pohja `#f5f0e2`, reunus rgba(70,51,31,.55). Jalan korkeus mitataan kuvan alimmasta peittävästä rivistä.
    - Toinen napautus avaa jutun.
  - **Numeroympyrä** (vain 5 karttaa: luxemburg, bryssel, ljubljana, kosice, valletta):
    - 26 px, pohja `#f3e2b8`, reunus 2 px `#2c2318`, Georgia 700 13 px.
    - Väistää päällekkäisyydet (`laskeNumeroympyroidenVaisto`), kokoa ei skaalata zoomin mukana.
  - **Muut kohteet:** muilla kartoilla piirroksettomia kohteita ei piirretä. Ne siirtyvät liuskan kategorioihin (`kaupunkikartanSiirretyt`) ja avaavat saman arkin.
  - **Pienet nimet** (konekirjoitusfontti 9,6 px, vaalea halo) näkyvät vain zoomattuna. Tähti = Matkakirjan ihme.
  - Päällekkäiset piirrokset hajautetaan (`hajautaPiirrospisteet`).
- **Mittajana:** `mittakaava()`, noin 25 % ydinleveydestä.
- **Zoom** (`karttazoom.js`):
  - Kerroin 1–3, askel ×1,5. Kokoruudussa katto on "koko ruudun korkeus".
  - Nipistys, raahaus ja rulla toimivat vain zoomattuna. Levossa pystypyyhkäisy vierittää sivua.
  - Napautus kartalla (liike alle 6 px, ei kohteen päällä) tai "Kokoruutu" avaa **kokoruudun**:
    - Postikorttikehys ja ×.
    - Sama kartta kloonattuna, alla kohdeluettelo napattavina riveinä ja lähderivi.
    - Kun zoomia kasvatetaan, kortti levenee 98 %:iin ruudusta.

**Natiiviehdotus:** tee kartta UI Toolkitilla (kuvaelementti ja pisteet). Natiivisepän palloa ei tarvita, koska tämä on litteä rasterijuliste eikä pallo.
- `KarttaKehys` (overflow hidden, aspect ratio koodissa) → `Lava` (absoluuttinen, `style.scale` + `translate`) → taustakuva + pisteet (`position: absolute`, left/top prosentteina).
- Pisteiden koko pidetään vakiona vastaskaalauksella 1/zoom, kuten webin `--zoom`.
- Eleet: `PointerDown/Move/Up` kahdella osoittimella nipistykseen. Napautuksen raja 6 px.
- Kokoruutu: sama komponentti isompana omassa `UiKerros`-tasossa.
- `karttapiste`, `ydinAla` ja `karttaKuvasuhde` porttaa C#:iin muutaman rivin koodina. Lähde: `maakartat.json` → `exportit.*.lahde`. `suoraPiste` = lineaarinen, web `js/packs/maakartat.js` r. 16076.

---

## 4. Turistiopas (`avaaTuristiOpas` → `avaaNahtavyys(artikkeli, null, {henkilolinkit: [], valikko: false})`, taitto `opas`)

- **Data:** `kaupunkilehdet.json` → alkio kaupungille → aiheen `data[]` alkio, jolla on kenttä `matkailijalle`:
  - `kappale`
  - `kuva{tiedosto, lyhyt, selite, lahde}`
  - `artikkeli`:
    - `nimi` ("Matkailijan Lontoo")
    - `teksti` (ingressi)
    - `taitto` = "opas"
    - `jaksot[]{otsikko, teksti, kuva[]}`: yhteensä 961, joista 563:ssa kuva. Kuvassa voi olla `asettelu: "kapea"`.
    - `nosto` (lause)
    - `matkailu` (99 kaupunkia):
      - `parasta[]{mita, tahdet 0–3, selite}`
      - `hyvaTietaa[]{otsikko, teksti}`
      - `parasAika`, `kaudet[]{nimi, kk, lampotila, kuvaus}`, `linkit[]{nimi, url}` (43 kaupunkia)
    - `lahde`
  - Säägraafi: `SAATIEDOT[kaupunki]` (`saatiedot.json`, 192 kaupunkia): keskilampo[12], ylin[12], alin[12], sade[12].
- **Paletti:**
  - pohja `#f8efdc`, muste `#3a2a15`, hento muste `#6d5942`
  - aksentti `#a53a22`, aksentin vesi `#f6ddc8`
  - syvä `#1d5a5e`, syvän vesi `#e0eae7`
  - kulta `#7f570b`, sivu `#f2e5c8`
  - viiva rgba(165,58,34,.3)
- **Ero nähtävyysarkkiin:** ei ☰-valikkoa eikä nuolia (opas ei ole selauslistassa), ei aikariviä, ylä-padding 0.
- **Rakenne:**
  1. **Tarttuva otsikko** `artikkeli.nimi`:
     - Iowan 700, clamp(32 px, 6.4vw, 46 px), väri aksentti, riviväli 1.04.
     - Pohja on paperi, joten otsikko pysyy näkyvissä vierittäessä.
     - Kaiutin oikeassa reunassa, 24 px ikoni.
  2. **Ingressi** (`teksti`): Iowan 19,8 px, riviväli 1.45, alareunaviiva.
  3. **Kainalo "Kaupunki lyhyesti":**
     - Kelluu oikealla ensimmäisen jakson sisällä, leveys 256 px. Puhelimessa (< 640 px) täysleveänä jakson alussa.
     - Reunus rgba(58,42,21,.22).
     - Vyö **"PARASTA TÄÄLLÄ"** (pohja `#f6ddc8`):
       - Rivit: `mita` + tähdet ★★★ (kulta, tyhjät opacity .26).
       - Napautus avaa pikkuselosteen, jossa `selite`.
     - Vyö **"HYVÄ TIETÄÄ"** (pohja `#e0eae7`): rivit `otsikko`, napautus avaa `teksti`-selosteen.
     - Vöiden otsikot: konekirjoitusfontti 11 px, 700, versaali. Rivit: konekirjoitusfontti 12,8 px 700 pisteviivalla, erotinviiva.
  4. **Jaksot:**
     - Väliotsikko: konekirjoitusfontti 12 px, 700, harvennus .22em, versaali, aksenttiväri, alaviiva.
     - Teksti: `nahtavyysKappale`, eli vuosikorostus pätee.
     - Kuva tai karuselli tekstin **jälkeen** täysleveänä. Jos `asettelu = "kapea"`: kelluu oikealla 40 %, puhelimessa tekstin perään.
  5. **"MILLOIN MATKAAN?" -laatikko** jakson 1 jälkeen:
     - Pohja `#f2e5c8`, vasen reunus 5 px aksentti.
     - Säägraafi kelluu oikealla, 240 px:
       - Web piirtää SVG:n 300 × 176: lämpökäyrä, ylin/alin-kaista, sadepylväät.
       - Kuvateksti "Sää vuoden mittaan. Napauta suuremmaksi." avaa ison graafin (`naytaVuosiSaa`).
     - `parasAika` Iowan 16 px.
     - Kaudet listana: nimi + kk, lämpötila, kuvaus.
  6. **Nosto** jakson 2 jälkeen:
     - Keskitetty lainaus, ylä- ja alareunassa 3 px tuplaviiva aksenttiväriä.
     - Teksti Iowan kursiivi 21 px, aksenttiväri.
  7. **"SUUNNITTELE MATKA" -laatikko:** linkit ulkoiseen selaimeen (`Application.OpenURL`).
  8. Reaktiot ja Sulje.
- **Natiiviin:**
  - Säägraafi: Painter2D tai `generateVisualContent`.
  - Pikkuseloste: pieni kupla rivin viereen.

---

## 5. Kaupunkipopup ja turisti-info (web, nykyisin käyttämättä)

- **`avaaKaupunkipopup`:**
  - Kortti merkin vieressä: leveys min(544 px, 92vw), pyöristys 12 px, pohja `#f5f0e2`, reunus rgba(122,85,20,.32).
  - Yläosassa ✕ (30 px) ja h3 kaupungin nimi (18,4 px).
  - Sisältö: herokuvat → esittely → kohdekartta → nappi "Kaupunkilehti".
  - Sulkeutuu Escillä ja ulkopuolisella napautuksella. Pöllön paneeli ei sulje korttia.
- **`avaaTuristiInfo`:** sama kortti otsikolla "Turisti-info", sisältönä pelkkä Matkailijalle-lohko.
- **Turisti-infon karttamerkki:** symboli `silma` ja nimiö "Turisti-info", siirretty kaupungista (1,5° / −0,75°). Pois käytöstä.
- **Suositus:** ei natiiviin. Korvaajat ovat `KaupunkiKortti` ja liuskan rivit (kohta 1A) sekä Matkailijalle-lohkon kolme sisäänkäyntiä (1B).

---

## 6. Pelilogiikka (Pelikoodarille)

- **Palkkioita ei ole:** nähtävyysarkki, kohdekartta ja opas eivät anna rahaa, pisteitä eivätkä tehtäviä. Web ei myöskään tallenna luettu-merkintöjä (tarkistettu `nahtavyydet.js`, `opas.js` ja `kaupunkinosto.js`).
- **`KaupunkiToiminnot`:**
  - Uudet kentät `Nahtavyydet` ja `Opas`, null = rivi piiloon.
  - Ehdot:
    - `Nahtavyydet`: `KAUPUNKIKARTAT` sisältää kaupungin.
    - `Opas`: `matkailijalle.artikkeli.teksti` ei ole tyhjä.
- **Kaupunki-id kulkee avauksen mukana:** nähtävyysnäkymä ja opas avautuvat myös muusta kuin pelaajan omasta kaupungista, joten kaikki haut (miniatyyri, henkilölinkit, selauslista, valikko, säätiedot) tehdään **avatun kaupungin** id:llä. Web käyttää globaalia `arrivalShownFor`-kenttää, ks. 8.
- **Paluupino:** henkilölinkki → push {kohde, numero, vierityskohta}. ← pop. Uusi avaus ilman `muista`-lippua tyhjentää pinon.
- **Äänet:**
  - `popup`: nähtävyysarkin avaus
  - `paper`: selausnuolet ja pyyhkäisy, lehtiarkin avaus ja sulku, taustan napautus, popupin sulku
  - Linssin musiikki vaimenee, kun juttu avataan nähtävyyskorttina, ja palaa sulkiessa (`aanet.md`).
- **Lukija:** kaiutin otsikossa. Arkin avaus pysäyttää edellisen lukemisen.
- **Reaktiot ja pöllöpoiminnat:** avain `juttuAvain(kaupunki, kohteen nimi)`. Reaktioiden palvelinyhteys on nykyisen reaktiojärjestelmän asia.
- **Kaupungin sisäiset nostot:** kartan kohteet ilman miniatyyriä (paitsi numeroympyräkartoilla) ovat liuskan kategoriarivejä.
  - Rivin id = kohteen `nosto`-kenttä, tai muuten `kartta:{kaupunki}:{numero}`.
  - Avaus: `teksti` → nähtävyysarkki, muuten wiki.
- **Ihme:** `matkakirjanIhme(nimi)` antaa tähden kartalle ja selitteen "Matkakirjan ihme". Jutussa kadonnut ihme näkyy kuvana, muuten "Koe ihme" -nappina.

---

## 7. Puuttuvat datat paketista (Siirtoseppä)

1. **Kohdekarttojen kuvat puuttuvat paketista.** `assets/kartat/*-keskusta.png`, `*-varikartta.png` ja muut ovat media.jsonissa lajina `repo` osoitteessa https://matkakirja.app/assets/…, joten offline-tilassa ne puuttuvat. Yhteensä 676 viitettä. Ehdotus: CDN-avaimet kuten miniatyyreillä (`asset-miniatyyrit` → media.matkakirja.app).
2. **Kohdekartta on vain web-moduulivientinä.** `KAUPUNKIKARTAT` on `moduulit/js/packs/maakartat.json` → `exportit`, ei kokoelmana. Ehdotus: kokoelma `kohdekartat.json`:
   - `alkiot[{id: kaupunki, data: {polku, varikartta, rajat, piirtoRajat, kainalot, numeroympyrat, lahde, esittely, kohteet[]}}]`
   - Kohteen kentät säilytetään sellaisenaan: nimi, lat, lon, wiki, nosto, nimiPuoli, siirto.
3. **Numerot ja järjestys eivät tule nähtävyyskokoelmasta.** `nahtavyydet.json` ei sisällä järjestystä, numeroita eikä koordinaatteja. Liitos kohdekarttaan tehdään avaimella `kaupunki` + `nimi`, joten natiivin on tehtävä sama yhdistäminen. Kokoelmaan voisi lisätä kentän `numero`.
4. **Apufunktiot ja vakiot puuttuvat vientien lähdekoodista.** `suoraPiste`, `laeaPiste` ja vakio `JANAN_PITUUDET` (mittajana) eivät ole mukana, vaikka `karttapiste` ja `mittakaava` viittaavat niihin.
5. **`wiki`-kenttä ja Wikipedia-tiivistelmät puuttuvat.** Kokoelmasta puuttuu `wiki` (kohdekartan kohteista 226:lla on se). Wikipedia-tiivistelmiä ei ole paketissa, joten "Lue lisää aiheesta" ja pelkän wikin kohteet eivät toimi natiivissa ilman verkkoa tai uutta dataa.
6. **Opasta ei ole omana kokoelmanaan.** Oppaan artikkeli on `kaupunkilehdet.json`-tiedostossa `matkailijalle.artikkeli`-kentässä. `LehtiSisalto.cs` (r. 215) lukee nyt vain kentät `kappale` ja `kuva`, joten jäsennystä on laajennettava. Datassa ei ole puutteita.
7. **Ihmeiden data on hajallaan.** Tähti, kadonnut, nauha ja "Koe ihme" löytyvät vain web-moduulista `fokuskohteet`, `KOHDE_IHMEEN_NIMET` mukaan lukien. Tarvitaan oma kokoelma tai kenttä.
8. **Commons-peiliosoitteet ohitetaan natiivissa.** `media.json` sisältää `kuva-commons`-kuvien peiliosoitteet (media.matkakirja.app), mutta `NostoSisalto.HaeKuva` hylkää ne ja hakee Commonsista. Tämä on korjaus natiiviin eikä pakettiin, mutta vaikuttaa kuvien saatavuuteen.
9. **Henkilöt:** `HENKILOT` sisältää vain Helsingin Engelin. Data on paketissa, mutta sisältö on ohut.
10. **Galleria-nappi** ("Lisää kuvia") tekee Commons-haun verkossa. Paketissa ei ole dataa.

---

## 8. Epävarmat kohdat

- **Webin kaupunkiviittaus on väärä.** `avaaNahtavyys` ja `opas.js` käyttävät `ui.lehtitila.arrivalShownFor`-kenttää. `avaaTiivisLehtiarkki` ei aseta sitä, joten liuskasta avattuna **toisen** kaupungin miniatyyri, valikko, selaus ja sää haetaan väärästä kaupungista. Natiivissa id annetaan eksplisiittisesti. Omistaja voi halutessaan korjata saman webiin.
- **"Lue lisää aiheesta" jää käytännössä piiloon.** Kun juttu yhdistetään karttakohteeseen, kenttä asetetaan `wiki: undefined`, joten jutuissa näkyy aina lähderivi. Nappi näkyy vain kohteille, joilla ei ole juttua (ja ne avaavat wikin suoraan). Onko tämä tarkoitus?
- **Liuskan nimirivi:** webissä se avaa kaupunkiesittelyn, natiivissa "Lue kaupunkilehti" avaa koko lehden. Pidetäänkö natiivin ratkaisu?
- **Otsikon fontti:** `#nahtavyys-otsikko` perii dialogin h2-tyylin, jota en varmistanut (oletus Iowan lihava, kuten lehden nimiö).
- **Ripoteltu kuvataitto:** `taitto: "ripoteltu"` on koodissa, mutta yhdelläkään jutulla ei ole kenttää `taitto`. Jätetään toteuttamatta.
- **Nuolien paikka puhelimessa:** ‹ › ulottuvat kortin reunan yli, mikä voi osua turva-alueeseen. Natiivissa ne kannattaa pitää kortin sisällä.
- **Kohdekarttojen PNG-resoluutiota** en mitannut. Suurin zoomi riippuu siitä.
- **Kuolleet popupit:** `avaaKaupunkipopup` ja `avaaTuristiInfo` voidaan jättää pois, jos omistaja ei halua niitä takaisin.
