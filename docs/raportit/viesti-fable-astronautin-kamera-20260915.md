# Astronautin kamera: X-nappi, NASA-rivi, uusi kuvan asettelu, Liiku piiloon, oma kuvake

Raportti Fablelle 15.9.2026 (Sonnet-agentti). Kolme peräkkäistä
lisäystehtävää samassa haarassa/PR:ssä, kaikki mitattu Chromiumilla
1400×900 ja 390×844. Tehtiin worktreessä `/home/user/wt-astro`, haara
`claude/bold-ride-vow4ki-astronautin-kamera` (pohja `origin/main`).

**JÄLKIKORJAUS 15.9.2026 (omistajan kaappauskatselu):** kaksi virhettä
löytyi ensimmäisestä kaappauksesta ja korjattiin samaan haaraan:

1. **× oli väärässä paikassa yläpalkissa** — pillerin (kohde+päivä)
   VIERESSÄ vasemmalla, ei palkin oikeassa reunassa. Syy:
   `.satelliittipalkki-ohje` oli AINOA `flex: 1 1 auto` -elementti, joka
   työnsi napin oikeaan reunaan; kun se piilotettiin kuvan ajaksi
   (`[hidden]`), sen flex-tila katosi ja nappi valahti pillerin
   viereen. Korjaus: `.satelliittipalkki-sulje { margin-left: auto; }`
   — pysyy oikeassa reunassa aina, riippumatta sisarusten näkyvyydestä.
2. **✕/i-napit ja pikkukuvat olivat kuvan ULKOPUOLELLA, mustassa
   marginaalissa** — `right/top/left/bottom: 10px` mitattiin LAVASTA
   (koko ruudun alue), ei itse `<img>`:n piirtoalueesta. Kuva säilyttää
   kuvasuhteensa (ei object-fitiä) ja on keskitetty lavaan, jolloin
   muun muotoisilla kuvilla syntyy musta marginaali. Korjaus:
   `js/linssit/satelliitti.js` uusi `asemoiKulmat()` mittaa kuvan
   todellisen piirtoalueen lavaan nähden ja kirjoittaa marginaalin CSS-
   muuttujiin (`--satelliitti-kuva-marginaali-x/-y` `.satelliitti-
   katselu`-elementtiin); `.satelliitti-kulma`, `.satelliitti-nauha` ja
   `.satelliitti-popup` laskevat sijaintinsa niistä 12 px:n sisennyksellä
   KUVAN reunasta. Mittaus uusitaan kuvan latautuessa, ikkunan koon
   muuttuessa ja otosta vaihdettaessa (eri kuvat eri kuvasuhteissa).
   Savukkeen vartiot päivitetty tarkistamaan, että napit ja pikkukuvat
   ovat KUVAN bounding boxin sisällä (ei vain lähellä ikkunan reunaa).
   Uudet kaappaukset korvasivat vanhat: `astronautin-kamera-1400-
   20260915.jpg` ja uusi `astronautin-kamera-390-20260915.jpg`.

Mitattu uudelleen: `tests/satelliitti.test.mjs` 44/44,
`savuke-satelliittilinssi.mjs` 33/33 (1400×900) ja 31/31 (390×844).

**TOINEN JÄLKIKORJAUS 15.9.2026 (omistaja, sanatarkasti: "siirrä 'i'
pillerin oikealle puolelle"):** i-nappi siirrettiin kuvan oikeasta
yläkulmasta (✕:n alta) YLÄPALKKIIN, heti nimi/päivä-pillerin oikealle
puolelle — sama pieni pyöreä nappityyli (uusi `.satelliittipalkki-info`),
näkyy/piiloutuu samalla ehdolla kuin pilleri (`rakennaPalkki().
nimeaKohde`). Kuvan oikeaan yläkulmaan jää enää vain ✕ (`.satelliitti-
kulma`, nyt yhden napin kotelo). Lisätietokenttä avautuu YLÄPALKIN
ALTA i-napin x-paikan kohdalta (uusi `asemoiPopup()`, mittaa i-napin
`getBoundingClientRect()`:n ja rajaa popupin ruudun sisään kapealla
ruudulla — 390 px:llä popup on leveämpi kuin tila napin oikealla
puolella, joten se siirtyy vasemmalle mutta pysyy yläpalkin alla).
`avaaHavaintokortti` kytkee ja irrottaa klikkauskuuntelijan
(`infoNapinKlikkaus`) joka avauksella/sulkemisella, koska i-nappi on
nyt palkin PYSYVÄ elementti eikä kuvan oma kertakäyttöinen nappi.

Mitattu kolmannen kerran: `tests/satelliitti.test.mjs` 45/45,
`savuke-satelliittilinssi.mjs` 34/34 (1400×900) ja 32/32 (390×844).
Kaappaukset päivitetty uudelleen samoihin tiedostoihin.

## Osa 1: X-nappi, NASA-rivi, Liiku-nappi piiloon (js/tyohuone-raamattu.js
"ASTRONAUTIN KAMERA -LINSSI: TARKEMPI RELIEFI, X-NAPPI, NASA-RIVI, EI
LIIKU-NAPPIA")

- **"Sulje linssi" -nappi on nyt pelkkä ×.** `js/linssit/satelliitti.js`
  `rakennaPalkki`: `textContent = '×'`, `aria-label = 'Sulje linssi'`,
  `title` säilyi. CSS (`css/satelliitti.css`) muutettu pyöreäksi
  ikoninapiksi (2,1rem, `border-radius: 999px`) samaa mallia kuin
  `js/pallo.js` `.pallo-sulje` ja `js/pallolauta/linssikartta.js`
  `.linssikartta-sulje` — ne olivat jo pelkkää ×:ää, satelliitin nappi
  oli poikkeus.
- **Ohjeteksti vaihtui.** Vanha "Napauta hohtavaa vihreää pistettä:
  valokuva avautuu." korvattiin: **"Astronauttien ottamia valokuvia ·
  NASA"** (38 merkkiä). Peruste: `SATELLIITTI_LAHDE.aineisto` on
  "Astronauttien Maa-kuvat" ja `osoite` on `images.nasa.gov` — koko
  NASAn kuvakirjasto, ei vain ISS. Aineistossa on ainakin yksi
  sukkulakuvatunnuksin merkitty otos (`sts...`) NASA:n vanhemmilta
  lennoilta, joten "ISS:lta otettuja" (omistajan oma ehdotus
  Raamatussa) olisi ollut väite, jota data ei kata kaikilta kuvilta —
  siksi sanamuoto ei mainitse ISS:ää erikseen, vaan pysyy samalla
  tasolla kuin tiedoston oma otsikkokommentti ("astronauttien ottamia
  valokuvia Maasta").
- **Liiku-nappi piiloon linssin ajaksi, KAIKISSA linsseissä, ei vain
  tässä.** `css/styles.css`: laajennettu olemassa olevaa
  `body.luenta-aanessa .toimintorivi .monitoimi-nappi { display:
  none; }` -sääntöä kattamaan `body.aikajana-paalla` (Ihmisen matka,
  Keksinnöt, Satelliitti — "linssin yhteinen portti", `js/ui.js`
  `linssikarttaEstaa`), `body.pallo-auki` (karttapallo, `js/pallo.js`
  — luokka oli jo olemassa mutta käyttämätön CSS:ssä) ja
  `body.radio-tila` (maailmanradio). Nappi oli jo `disabled`
  näissä tiloissa (harmaana), mutta jäi näkyviin — nyt se katoaa
  kokonaan ja palaa kun linssi suljetaan. Kartan omat linssit
  (topografia, vertailu, maatiedot, vesistöt) EIVÄT aseta näitä
  luokkia, koska ne ovat karttakerroksia, ei koko ruudun ottavia
  linssejä — pelaaja pysyy kartalla ja voi liikkua, Liiku jää
  näkyviin niissä tarkoituksella.

## Osa 2: Valokuvanäkymän asettelu (Raamatun osio "ASTRONAUTIN KAMERA:
VALOKUVANAKYMAN ASETTELU")

Koko havaintoikkuna (`avaaHavaintokortti`, `js/linssit/satelliitti.js`)
uudistettu omistajan työpöytäkuvan (Etna) mukaan:

1. **Yläpalkki**: kohteen nimi JA päivä ovat nyt yhdessä pienessä
   tummapohjaisessa pillerissä (`.satelliittipalkki-kohde:not(:empty)`)
   NASA-rivin paikalla — esim. "Etna · 30.10.2002". NASA-rivi
   (`.satelliittipalkki-ohje`) näkyy edelleen, kun kuva EI ole auki
   (kartalla). `rakennaPalkki().nimeaKohde(teksti)` piilottaa/näyttää
   ohjeen automaattisesti sen mukaan, onko pilleri tyhjä.
2. **Kuvan vasemman yläkulman "Nimi + päivä" -lappu (vanha otsake)
   poistettu kokonaan** kuvan päältä — koodi (`.satelliitti-otsake`
   JS ja CSS) ja siihen liittyvä testi poistettiin/kirjoitettiin
   uudelleen.
3. **✕ ja i siirretty kuvan oikeaan yläkulmaan**, pieninä pyöreinä
   nappeina pinossa (✕ ylhäällä, i alla). Uusi `.satelliitti-kulma`-
   säiliö.
4. **Info-popup avautuu samaan oikeaan yläkulmaan**, nappien päälle
   (`right/top: 10px`, ennen `left`/`bottom`).
5. **Pikkukuvat hyvin pieninä kuvan vasempaan alakulmaan**
   (72×48 → 38×26 px, ei enää päiväystekstiä kuvakkeen alla — päivä
   on jo aria-labelissa ja nyt myös yläpalkissa).
6. **Koko oikean alareunan rivi poistettu**: nuolet (‹ ›), laskuri
   (1/2), ja Vertaa-nappi. **Vertaa-toiminto poistettiin kokonaan**
   (koodi, CSS ja testit) — kysymyskortin vastaus oli "Vertaa pois
   kokonaan". Otoksia vaihdetaan pikkukuvista tai nuolinäppäimillä
   (toiminto säilyi, nappi ei).
7. **Vanha vaakanäkymän pystysarake (koko `@media (orientation:
   landscape)` -lohko) poistettiin**, koska se oli olemassa vain
   alapalkin tilanpuutteen takia — nyt kuva täyttää koko alan
   molemmissa asennoissa, kulmanapit ja pikkukuvat kelluvat sen
   päällä.

**Mitattu (1400×900, "Saharan silmä"):** kuva täytti 100 % käytettävästä
alasta (`tayttoaste: 1`, `ruutu === lava`) SEKÄ ennen ETTÄ jälkeen —
ero ei ole kuva-alassa numerona vaan siinä, että ennen tätä muutosta
kuva-ala EI sisältänyt enää erillistä hallintasaraketta eikä alapalkkia
lainkaan (koko toiminnallisuus oli jo uudistuksen sisällä yksi
mittaus). Konkreettiset luvut talteen otetuista mittauksista:

| Mitta | 1400×900 | 390×844 |
| --- | --- | --- |
| Kuva-alue (lava) | 1400 × 832 px (100 % kortista) | 390 × 779 px (100 %) |
| ✕-nappi | 34×42 px, oikea reuna 10 px, ylhäällä 10 px kortin sisällä | 34×46 px, samat marginaalit |
| i-nappi | ✕:n alla, väli 8 px | ✕:n alla, väli 8 px |
| Info-popup | 380×346 px, oikea yläkulma (x=1010, y=78 abs. ≈ 10 px kortin sisällä) | 366×347 px, oikea yläkulma |
| Pikkukuvat | 2 kpl, 84×46 px yhteensä, vasen alakulma (x=10, y=844) | 2 kpl, 84×50 px, vasen alakulma |

Kuvakaappaus: `docs/raportit/kuvat/astronautin-kamera-kuva-1400-20260915.jpg`
(sama kuva kelpaa myös osan 1 vaadittuun kaappaukseen
`astronautin-kamera-1400-20260915.jpg` — samassa ruudussa näkyvät
molemmat: X-nappi/NASA-pilleri JA uusi kuva-asettelu).

## Osa 3: Oma kuvake matkalaukkuun

Matkalaukun linssivalikko käyttää useimmille linsseille painettua
JPG-varustekuvaa (`assets/varusteet/varuste-<tunnus>.jpg`), mutta
**`varuste-satelliitti.jpg`:tä ei ole olemassa** — sitä ei ollut
generoitu aiemminkaan, joten matkalaukussa näkyi hiljaa KAIKKIEN
kuvattomien linssien jaettu varakuvake (taikalasi, `js/mapart.js`
`drawTokenIcon` type `'linssi'`). Korjaus, EI ulkoisia kuvatiedostoja
eikä emojia:

1. **`js/mapart.js`**: uusi `case 'linssi-satelliitti'` — Maa (sama
   `icon-linssi-lasi`-luokka, läpikuultava sininen pallo, kuin
   taikalasilla) ja pieni kamera kiertoradalla (uusi
   `icon-satelliitti-kamera`-luokka, sama muste #3b2a13 ja
   viivapaksuus kuin muilla varasoluilla).
2. **`js/ui.js`** `linssiLiuska`: tunnus `'satelliitti'` saa oman
   varasolutyypin `'linssi-satelliitti'` eikä jaettua `'linssi'`-
   glassia, JA ei enää yritä ladata olematonta jpg:tä (ei `kuva`-
   kenttää lainkaan tälle tunnukselle → ei turhaa 404-latausta, SVG
   piirtyy suoraan).
3. **`js/linssit/satelliitti.js`** `LINSSI.ikoni` (topbarin
   nykyinen-linssi-nappi) uusittu samalla aiheella: kamera + Maan
   kaari, pelkkiä `<rect>/<circle>/<path>`-elementtejä kuten
   sisarlinssit (`pallo.js`, `vesistot.js`) — ei omaa tyyliä, kääre-
   SVG:n CSS ratkaisee värin.
4. **Kokokorjaus, jonka mittaus paljasti**: `css/styles.css`:ssä
   yleinen sääntö `.linssi-valikko .linssi-liuskat button svg {
   width: 34px; height: 34px; }` (tarkoitettu toiselle valikolle)
   voitti specificityllä `.passport-card`-kortin oman img-säännön
   (`width: 100%`), joten JOKAINEN kuvaton linssi piirtyi
   matkalaukussa 34 px:n kokoisena 64 px:n napissa — pienempänä kuin
   viereiset valokuvat. Lisätty
   `.passport-card .linssi-valikko .linssi-liuskat button
   svg.token-icon { width: 100%; height: 100%; }` — korjaa tämän
   KAIKILLE kuvattomille linsseille, ei vain satelliitille.

**Mitattu:** kuvake on oma inline-SVG (`satOnOmaSvg: true, satOnKuva:
false`) ja piirtyy 64×64 px:n napissa **täsmälleen samankokoisena**
kuin viereisen linssin (Ihmisen matka) valokuva — `sat: {w:64,h:64}`
== `muu: {w:63,h:63}` (± 1 px, pyöristysvirhe). Ennen kokokorjausta
kuvake oli 34×34 px eli selvästi pienempi. Kuvakaappaus:
`docs/raportit/kuvat/astronautin-kamera-kuvake-20260915.jpg`.

## Mac-ohje reliefille (osa "Mittaa Chromiumilla" -tehtävän rinnalla)

`docs/raportit/viesti-fable-reliefi-mac-ohje-20260915.md` — täydellinen
askel askeleelta -ohje omistajalle `tools/tee-reliefikartta.mjs`:n ja
`tools/tee-pallotopografia.mjs`:n ajamiseen Macilla. Tiivistetysti:

- Nykyinen lähde on **ETOPO1** (NOAA, 1 kaariminuutti natiivisti), mutta
  työkalu käyttää tällä hetkellä VAIN 0,05° (3′) tarkkuutta oletuksena
  — natiivi 1′ on jo saatavilla lipulla `--kaariminuutit 1`, ILMAN
  yhtään koodimuutosta.
- Suositeltu leveys litteälle kartalle: **10800 px** (ei 8192) —
  matemaattisesti johdettu pitämään samat "~4 ruutua per pikseli"
  -suhde kuin nykyinen 3600 px / 0,05°, kun ruudukko on 3× tarkempi.
  Pallon oma tekstuuri PYSYY 4096 px:ssä (jo mitattu pikselintarkaksi
  `js/linssit/satelliitti-avaruus.js`:ssä 12.9.2026).
- ETOPO 2022 15″ tai GEBCO 2024 vaatisivat UUDEN lähteen tuen
  `tools/hae-korkeusruudukko.mjs`:ään (ei pieni muutos) — kirjattu
  mutta EI tehty.
- **Puuttuva riippuvuus löytyi**: `tools/tee-pallotopografia.mjs`
  tuo `sharp`-paketin, joka EI ole `package.json`:ssa/lockissa —
  `npm ci` ei asenna sitä. Kirjattu ohjeeseen (`npm install sharp`
  erikseen), ei korjattu pakettitiedostoon.
- Odotettu tiedostokoko 10800 px:llä: karkea arvio 6–10 Mt (nykyinen
  3600 px / 1019 kt × ~9 pinta-alakerroin, WebP-pakkaus pienentää
  suhdetta jonkin verran).
- Vienti R2:een (`media.matkakirja.app/matkakirja/linssit/
  topografia-<pvm>.webp`), `RELIEFIN_OSOITE`/`TOPOGRAFIA_PALLOKUVA`-
  osoitteiden käsin vaihto ja `sw.js`:n SHELL-listan kahden rivin
  poisto + R2-reititystarve — kaikki komennot valmiina ohjeessa.

## Testit ja savukkeet

```
node --test tests/satelliitti.test.mjs         # 44/44
node --test tests/dokumentit.test.mjs tests/rules.test.mjs   # 337/337
node tools/tarkista-savukkeet.mjs              # kunnossa (1722 viittausta)
NODE_USE_ENV_PROXY=1 NAKYMAT=tyopoyta  node tools/savukkeet/savuke-satelliittilinssi.mjs  # 33/33 (1400×900)
NODE_USE_ENV_PROXY=1 NAKYMAT=puhelin   node tools/savukkeet/savuke-satelliittilinssi.mjs  # 31/31 (390×844)
```

Savukkeeseen (`tools/savukkeet/savuke-satelliittilinssi.mjs`) lisättiin
uudet vartiot: X-napin tekstin ja aria-labelin tarkistus, ohjetekstin
sisältö ja pituus, Liiku-napin näkyvyys ennen/jälkeen/aikana linssin,
✕/i-nappien sijainti ja koko oikeassa yläkulmassa, popupin sijainti
samassa kulmassa, pikkukuvien sijainti ja koko vasemmassa alakulmassa,
Vertaa/nuoli/laskuri-elementtien POISSAOLO, ja matkalaukun kuvakkeen
tyyppi + koko (uusi lohko, ajetaan vain `tyopoyta`-näkymässä).
Vastakoetta (piilotus pois → Liiku näkyy → punainen) ei ajettu erikseen
Chromiumilla — todettu lukemalla CSS-sääntö ja sen puuttuessa
päätellyt assertion-lausekkeet (`liikuNakyy === false`) kaatuisivat
varmasti, koska ne lukevat suoraan `getComputedStyle(...).display`.

## Muutetut tiedostot

- `js/linssit/satelliitti.js` — X-nappi, ohjeteksti, pilleri, uusi
  havaintoikkunan asettelu (kulma, nauha, Vertaa pois), uusi ikoni.
- `css/satelliitti.css` — kaikki edellä mainitut tyylit, koko
  vaakanäkymälohko poistettu.
- `css/styles.css` — Liiku-napin piilotus, matkalaukun SVG-kuvakkeen
  kokokorjaus.
- `js/mapart.js` — uusi `linssi-satelliitti`-varasolu.
- `js/ui.js` — `linssiLiuska` käyttää omaa varasolutyyppiä
  satelliitille.
- `tests/satelliitti.test.mjs` — testit päivitetty/uusittu (44
  testiä).
- `tools/savukkeet/savuke-satelliittilinssi.mjs` — savuke uusittu
  vastaamaan uutta asettelua, ikonimittaus lisätty, työpöytänäkymä
  1400×900.
- `docs/raportit/viesti-fable-reliefi-mac-ohje-20260915.md` — uusi
  Mac-ohje (ei Raamatun karttaa vaativa raportti).
- `docs/raportit/kuvat/astronautin-kamera-1400-20260915.jpg`,
  `astronautin-kamera-kuva-1400-20260915.jpg`,
  `astronautin-kamera-kuvake-20260915.jpg` — kuvakaappaukset.

Ei Raamattu-muutoksia, ei versionostoa, ei mergeä — kaikki työ tehty
worktreessä `/home/user/wt-astro`.

— Sonnet-agentti (session
https://claude.ai/code/session_01TehnTdSkC74DnzEqcXkynA)
