# Viesti Fablelle: reittiviuhka piiloon kun matkasessio ei ole käynnissä

**Erä:** KARTTAUUDISTUKSEN PAATOKSET 9 kohta 6 (omistaja 14.9.2026 klo 11.00 UTC,
sanatarkasti: *"lisaksi reittiviuhka nakyy edelleen vaikka ei olla
liikkumistilassa. korjaa se myos."*)
**Haara:** `claude/bold-ride-vow4ki-viuhka` (pohja `claude/bold-ride-vow4ki`)
**Ei versionostoa** — Fable versioi ja julkaisee.

---

## 1. Juurisyy yhdellä lauseella

**Viuhka on POLTETTU LAATTOIHIN:** v1865 vei naapurireitit pois elävästä
kerroksesta, mutta reittiverkko askelhelmineen on lisäksi poltettuna
laattapyramidin viivatasoon (`.../viivat/z<taso>/…`), jonka pallo latoo joka
laatan kankaalle matkasessiosta riippumatta — eli omistaja katsoi poltettua
mustetta, ei elävää kerrosta.

---

## 2. Toistotaulukko (mitattu Chromiumilla, Pariisi ja Varsova)

Elävä kerros = pallon `pathsData`-reittiviivat ja `pointsData`-askelhelmet
(js/pallolauta/reitit.js). Poltettu = viivatason laatat ruudulla; mitattu
estämällä `/viivat/`-laattapyynnöt ja vertaamalla kuvat pikseleittäin.

| # | Tila | Elävä kerros (viivoja/helmiä) | Poltettu viivataso | Näkyikö viuhka ENNEN | JÄLKEEN |
|---|------|------------------------------|--------------------|----------------------|---------|
| a | Pelin avaus, saapuminen ensimmäiseen kaupunkiin, ei Liikua | 0 / 0 | näkyy | **KYLLÄ (vika)** | ei |
| b | Uusi vuoro kaupungissa (vaihe `roll`, tapa esivalittu) | 0 / 0 | näkyy | **KYLLÄ (vika)** | ei |
| c | Sivunlataus kaupungissa (tallennuksesta palautus) | 0 / 0 | näkyy | **KYLLÄ (vika)** | ei |
| d | Liiku → peruutus (Liiku uudestaan) | 0 / 0 | näkyy | **KYLLÄ (vika)** | ei |
| e | Liiku → peruutus kartalta (`suljeLiuku`) | 0 / 0 | näkyy | **KYLLÄ (vika)** | ei |
| f | Liiku painettu | 4 / 10 | näkyy | kyllä (oikein) | kyllä |
| g | Nopanheiton jälkeen, liuku sulkeutunut | 4 / 10 | näkyy | kyllä (oikein) | kyllä |
| h | Kesken reittiä (sessio tallessa ja ilman) | 1 / 3 | näkyy | kyllä (oikein) | kyllä |
| i | Perillä uudessa kaupungissa (bussi Ateena → Sofia) | 0 / 0 | näkyy | **KYLLÄ (vika)** | ei |
| j | Seuraava vuoro uudessa kaupungissa | 0 / 0 | näkyy | **KYLLÄ (vika)** | ei |
| k | Maalehti auki ja kiinni kaupungissa | seuraa sessiota | näkyy | **KYLLÄ (vika)** | ei |
| l | Kesken reittiä, heitto jatkuu itsestään (`jatkaMatkaaItsestaan`, savukkeen vartiot 4a/4b) | 1 / 3 | näkyy | kyllä (oikein) | kyllä |
| m | Katselutila ja botin vuoro | 0 / 0 | näkyy | **KYLLÄ (vika)** | ei |
| n | Puhelin 390 × 844 | sama kuin työpöydällä | sama | **KYLLÄ (vika)** | ei |
| o | Työpöytä 1400 × 900 | sama | sama | **KYLLÄ (vika)** | ei |

Elävä kerros oli siis **oikein jo v1865:n jälkeen** jokaisessa rivissä — vika oli
kokonaan poltetussa mustessa. Kuvat:
`docs/raportit/kuvat/viuhka-ennen-korjausta.png` (Pariisissa seisten: neljä
haaleaa katkoviivaa Lontooseen, Amsterdamiin, Marseilleen ja Alpeille),
`viuhka-jalkeen-seisten.png` (sama hetki korjattuna: ei yhtään reittiviivaa),
`viuhka-jalkeen-liiku.png` (Liiku painettuna: neljä elävää viivaa helmineen) ja
`viuhka-viivataso-ero.png` (mustavalkoinen ero: mitä viivatason laatat
piirtävät — reittiverkko JA maiden rajat).

---

## 3. Miten juurisyy mitattiin

1. Elävän kerroksen luvut luettiin suoraan pallon kerroksista
   (`pallo.pathsData()`, `pallo.pointsData()`), ei säännön paluuarvosta.
   Kaupungissa seistessä ne ovat nollia kaikissa tiloissa a–e ja i–k.
2. Silti ruudulla oli viivat. Ne eristettiin **estämällä `/viivat/`-laattojen
   haku** selaimessa ja vertaamalla kaappaukset pikseleittäin: ero on
   täsmälleen reittiverkko askelhelmineen sekä maiden rajat
   (`viuhka-viivataso-ero.png`). Mitään muuta ei katoa.
3. Viivataso on omassa läpinäkyvässä pyramidissaan
   (`tools/generoi-laattapyramidi.mjs` VIIVATASO), ja luettelo kertoo sen
   sisällön: `viivataso.versio 2026-09-08a-viivat`, `piirit: false`,
   `rajat: "nykyiset"`. Piirit ovat siis jo pois poltettu, joten tasolla on
   enää **reitit ja rajat**.
4. Rajat pallo piirtää itse vektorina (`js/pallovektorit.js`
   `VEKTORIT_RAJA_LEVEYS_CSS`) — poltettu raja oli vektorin alla
   kaksinkertaisena musteena. Sama havainto kuin rantaviivalla 6.9.2026.

---

## 4. Muutos

**js/pallolaatat.js `lepokerroksenKerrokset`** — pallo ei enää lataa poltettua
viivatasoa lainkaan (`viiva: false`). Sama ratkaisu kuin rantatasolla: kun
pallolla on sama viiva vektorina, poltettua ei ladata. Reittiviuhka tulee siis
yksin elävästä kerroksesta, jonka PAATOKSET 8:n matkasessio ratkaisee
(`js/ui.js matkaSessioKesken`). Versiovahti (sarja ja pyramidi samaa ajoa) jää
ennalleen. **Tasokartta on ennallaan** — se latoo viivatason kuten ennenkin,
eikä siellä ole vektorirajoja.

**js/game.js `actionCancelTravel`** — `autoTravel` ja `jatkaAutomaattisesti`
nollataan peruutuksessa (siirtopromptissa kirjattu vika). `autoTravel`
tarkoittaa *"peli valitsi tavan pelaajan puolesta"*, ja juuri sitä lukee
`matkaSessioKesken`. Lippu jäi päälle "Vaihda matkustustapa" -napin jälkeen,
jolloin pelaajan ITSE valitsema tapa luettiin koneen esivalinnaksi ja
matkasessio katkesi kesken matkan liu'un sulkeutuessa — eli viuhka olisi
kadonnut nopanheiton alta. Lentokaarten sääntöön ei koskettu.

**tools/savukkeet/savuke-reitit-piiloon.mjs** — kaksi uutta vartiota vanhojen
kahdeksan lisäksi:

- **9.** poltettua reittiverkkoa ei ladata pallolle (`/viivat/`-laattapyyntöjä
  on 0 koko ajon aikana). Poltettua mustetta ei voi lukea kerroksista — se on
  laatan kankaassa — joten mittarina on pyyntöjen määrä.
- **10.** sivunlataus kaupungissa: ei viuhkaa eikä sessiota; **10b.** eikä uusi
  sivukaan hae viivatason laattoja.

**tests/pallolepokerros.test.mjs** — versiovahdin odotusarvot (`viiva: false`).

---

## 5. Vastakoe (pakollinen)

Korjaus otettiin pois (`viiva: false` → `viiva: Boolean(viivat)`) ja sama savuke
ajettiin uudestaan:

| Ajo | Tulos | Punaiset |
|-----|-------|----------|
| Korjattu | **18/18 läpi**, viivalaattapyyntöjä 0 | — |
| Korjaus poistettuna (vastakoe) | **16/18 läpi**, viivalaattapyyntöjä 118 (ja 121 sivunlatauksen jälkeen) | vartiot **9** ja **10b** |

Vartiot 1–8 (elävä kerros) pysyvät vihreinä molemmissa ajoissa — **juuri se on
tämän erän opetus:** ne olivat vihreitä jo v1865:ssä, ja silti omistaja näki
viuhkan. Vain vartiot 9 ja 10b erottavat vian.

---

## 6. Portit

```
npm test                             # pass 3354, fail 0
node tools/tarkista-kaksoisavaimet.mjs   # ei kaksoisavaimia
node tools/tarkista-niputus.mjs          # 387 moduulia, ei törmäyksiä
node tools/tarkista-savukkeet.mjs        # 1627 ui-viittausta, kunnossa
savuke-reitit-piiloon.mjs                # 18/18
```

Mittaukset ajettu sekä työpöydällä 1400 × 900 että puhelimessa 390 × 844;
luvut ovat identtiset.

---

## 7. Avoimet havainnot (ei korjattu tässä erässä)

1. **Poltettu reittiverkko on yhä laatoissa ämpärissä.** Peli ei enää lataa sitä
   pallolle, mutta laatat ovat siellä ja **tasokartta** latoo ne yhä. Kun
   viivataso seuraavan kerran poltetaan, reitit kannattaa jättää pois kokonaan
   (`piirraViivataso` `passit.reitit`), jolloin pyramidi kevenee ja sama sääntö
   on voimassa molemmilla laudoilla. Tämä on omistajan/Fablen päätös ja
   poltto-ajo, ei asiakaskoodia.
2. **Poltettu raja katosi pallolta samalla.** Vektoriraja jää ainoaksi rajaksi
   (kuvat 2 ja 3) — mitattuna kartta pikemminkin siistiytyi, koska kaksi rajaa
   päällekkäin tummensi viivaa. Jos omistaja haluaa vahvemman rajan, säätö on
   `js/pallovektorit.js VEKTORIT_RAJA_LEVEYS_CSS`, ei laattojen paluu.
3. **Matkasessio jatkuu vaiheessa `move` liu'un sulkeuduttua.** Pelaaja, joka on
   heittänyt nopan ja sulkee liu'un, näkee viuhkan yhä — tämä on PAATOKSET 8:n
   mukaista (kohteen valinta on matkan vaihe), mutta alarivillä lukee vain
   "Liiku". Jos omistaja pitää tätä samana vikana, sääntö on yhdessä lauseessa
   (`js/ui.js matkaSessioKesken`).
4. **Saapumisen jälkeen liuku jää auki uudessa kaupungissa** (mitattu Sofiassa:
   `liukuAuki` tosi ilman että pelaaja painoi mitään). Viuhka ei siitä synny —
   sessio on päättynyt — mutta alapalkki avautuu itsestään.
