# Viesti Fablelle: Ranskan KAIKKIEN nostojen tarkistus (PAATOKSET 44 kohta 2)

19.9.2026, Sonnet-tarkistusagentti (lukeva erä, ei muokannut pelin
koodia eikä dataa). Haara `claude/bold-ride-vow4ki-v1948`
(ce9d58b0), tulos pushattu haaraan
`claude/bold-ride-vow4ki-ranska-tarkistus`.

Tehtävä: mitata Ranskan kaikkien fra-pakkojen nostot — teksti,
lähde, kysymykset, kuvien määrä ja lisenssit, sekä HEAD-pyyntö
jokaiseen ämpäriosoitteeseen (`https://media.matkakirja.app/...`,
enintään 3 rinnakkain, Node 22:n omalla fetchillä). `ls js/packs |
grep fra` löysi kuusi tiedostoa; kahta ei tarkisteta sisältönä alla
selitetystä syystä.

## Tarkistetut tiedostot ja rajaus

| Tiedosto | Rivejä | Tarkistettu sisältönä? |
| -------- | ------ | ---------------------- |
| `maastokohteet-fra.js` | 17 | Kyllä |
| `fokuskohteet-fra.js` | 2 | Kyllä (oma rakenne, ks. alla) |
| `hahmotelma-fra.js` | 27 | Kyllä |
| `maalehtinostot-fra.js` | 18 | Kyllä (oma rakenne, ks. alla) |
| `nakyvat-kaupungit-fra.js` | 7 | Kyllä (kaupunkikortit, ei "nostoja") |
| `nostoankkurit-fra.js` | 62 ankkuria | EI — pelkkä lat/lng-lukkotaulu (`NOSTOANKKURIT_FRA`), ei tekstiä, kuvaa eikä kysymyksiä. Ei kuulu PAATOKSET 44 kohdan 2 piiriin. |

Yhteensä **71 sisältöriviä** tarkistettu (64 varsinaista nostoa +
7 kaupunkikorttia).

## Yhteenveto (luvut)

| Mittari | Tulos |
| ------- | ----- |
| Kohteita yhteensä | 71 (64 nostoa + 7 kaupunkikorttia) |
| Ilman tekstiä | 0 |
| "Sisältö tulossa" / tyhjä teksti | 0 |
| Teksti alle 150 merkkiä | 0 |
| Lähde (`lahde`) puuttuu | 0 |
| Alle 2 kuvaa (ks. rakenneselitys alla) | 14 maastokohteet-fra.js:ssä; 2 fokuskohteet-fra.js:ssä (rakenteellisesti, ei puute); 18 maalehtinostot-fra.js:ssä (rakenteellisesti, ei puute); 7 nakyvat-kaupungit-fra.js:ssä (rakenteellisesti, ei puute) |
| Kuvat, HTTP-status muu kuin 200 | 56/56 hahmotelma-fra.js:n kuvaa (404 — TIEDOSSA, odottavat vientiä ampariin, ks. Raamattu PAATOKSET 44 TILA) |
| Epäkelvot lisenssit (NC/ND/GFDL/FAL) | 0 |

**hahmotelma-fra.js on Raamatun kuvauksen mukainen**: kaikilla 27
kohteella teksti (271–1600+ merkkiä ei relevantti tähän, kaikki
selvästi yli 150), lähde, 2 kysymystä ja vähintään 2 kuvaa (yhteensä
56 kuvaa, ~2,07/kohde). Kaikki 56 kuvaosoitetta ovat muotoa
`karttanostot/20260918/...` ja vastaavat 404:llä — tämä on Raamatun
mukaan tiedossa oleva tila (Fable ei ole vielä vienyt niitä
ampariin), ei uusi löydös.

**maastokohteet-fra.js on ainoa tiedosto, jossa on aito puute**: 17
kohteesta 11:llä ei ole yhtään kuvaa ja 3:lla on vain yksi (tarvitsee
yhden lisää); vain 3 kohdetta (loire, rhone,
carcassonnen-linnoituskaupunki) täyttää "vähintään kaksi kuvaa"
-vaatimuksen. Teksti, lähde ja kysymykset ovat kunnossa kaikilla 17.
Tiedoston oma kommentti selittää tämän: erän 4 kuusi kohdetta (mm.
avignonin-paavinpalatsi, chambord, douaumont, bayeux-seinavaate,
millaun-silta, carnacin-kivirivit) kirjattiin tarkoituksella
"KUVATTOMANA ERÄNÄ" 6.9.2026 (kuva tuli myöhemmin -periaatteella),
ja loput kuvattomat (valimeri, biskajanlahti, lascaux,
chartresin-katedraali, pont-du-gard) ovat vanhempaa, vielä
kuvittamatonta ainesta.

## Rakenne-erot, joita ei pidä tulkita virheiksi

1. **`fokuskohteet-fra.js`** (tuileries, bastilji): molemmat ovat
   "Matkakirjan ihme" -kohteita (`kadonnut: true`) — palatsia ja
   linnoitusta ei enää ole olemassa. Näillä on VAIN `ihme`-kenttä
   (ei `kuva`/`kuvat`), ja se kantaa yhden pelin oman generoidun
   havainnekuvan (loistoaika-v2, jo ämpärissä, HTTP 200 molemmilla).
   Automaattitarkistukseni liputti nämä "lisenssi puuttuu" -riveinä,
   koska `ihme`-kentässä ei ole `lisenssi`-avainta — tämä on
   rakenteellisesti oikein (generoitu kuva, ei Commons-kuva), EI
   todellinen lisenssiongelma. Teksti (611 ja 684 merkkiä), lähde ja
   2 kysymystä ovat kunnossa molemmilla.
2. **`maalehtinostot-fra.js`**: kortin teksti on kentässä `lunastus`
   (ei `teksti`) ja kuva kentässä `kuva.tiedosto` (Commons-
   tiedostonimi, esim. `Lascaux painting.jpg` — EI ämpäri-URL, vaan
   luetaan `js/packs/maa-kategoriat.js`:n FRA-taulusta ajon aikana).
   Rakenne sallii tarkoituksella vain YHDEN kuvan per kohde ("kuva
   luetaan lehdestä"), joten "alle 2 kuvaa" ei ole puute vaan
   suunniteltu rajoitus. Kaikilla 18:lla on kuva, lähde ja
   riittävä teksti (417–586 merkkiä); 6/18:lla on lisäksi `visa`
   (minikysymys) suunnitelman mukaisesti ("keskimäärin joka
   kolmas"). Lisenssit (kaikki Commons-alkuperäisiä, merkitty
   `kuva.lahde`-tekstinä) tarkistettu silmällä: kaikki PD tai CC
   BY-SA -variantteja. HUOM: automaattiregexini liputti yhden rivin
   (`maalehti-marseillen-saippua`, "Arnaud 25, Wikimedia Commons
   (PD)") virheellisesti, koska se ei tunnistanut lyhennettä "PD" —
   tämä on todellisuudessa kelvollinen public domain -lisenssi,
   väärä hälytys. Näiden kuvien ämpäri-URL:ää ei tarkistettu HEAD-
   pyynnöllä, koska osoite ei ole ämpärissä vaan Commonsissa
   tiedostonimenä.
3. **`nakyvat-kaupungit-fra.js`**: nämä ovat KAUPUNKIKORTTEJA (Lyon,
   Bordeaux, Lille, Strasbourg, Nizza, Toulouse, Nantes), ei
   perinteisiä nostoja — PAATOKSET 44 kohta 2 ei mainitse niitä
   nimeltä, mutta ne löytyivät `ls js/packs | grep fra` -haulla,
   joten ne on tarkistettu mukana. Jokaisella on `herokuva` (1 kpl,
   kaikki HTTP 200, kaikki "Public domain"), `esittely` (198–252
   merkkiä) ja lähdeluettelo `esittelynLahteet`. Vain Lyonilla on
   `korttiNosto` (viite `maalehti-cinematographe`-nostoon) — muilla
   kuudella se on tarkoituksella `null` (dokumentoitu syy: lähin
   maalehtinosto on muualla, ei kaupungissa). Ei puutteita.

## Taulukko: maastokohteet-fra.js (ainoa jossa puutteita)

| id | nimi | teksti (merkkiä) | lähde | kysymykset | kuvia nyt | lisenssit | HTTP |
| -- | ---- | ----------------- | ----- | ---------- | --------- | --------- | ---- |
| montblanc | Mont Blanc | 352 | OK | 2 | 1 (tarvitsee 1 lisää) | CC BY-SA 2.0 France | 200 |
| vignemale | Vignemale | 271 | OK | 2 | 1 (tarvitsee 1 lisää) | CC BY-SA 3.0 | 200 |
| valimeri | Välimeri | 394 | OK | 2 | 0 | — | — |
| biskajanlahti | Biskajanlahti | 306 | OK | 2 | 0 | — | — |
| loire | Loire | 351 | OK | 2 | 2 (OK) | CC BY-SA -variantit | 200/200 |
| rhone | Rhône | 341 | OK | 2 | 2 (OK) | CC BY-SA -variantit | 200/200 |
| mont-saint-michel | Mont-Saint-Michel | 1054 | OK | 2 | 1 (tarvitsee 1 lisää) | — | 200 |
| carcassonnen-linnoituskaupunki | Carcassonne | 1020 | OK | 2 | 2 (OK) | — | 200/200 |
| lascaux | Lascaux | 1036 | OK | 2 | 0 | — | — |
| chartresin-katedraali | Chartresin katedraali | 1239 | OK | 2 | 0 | — | — |
| pont-du-gard | Pont du Gard | 1160 | OK | 2 | 0 | — | — |
| carnacin-kivirivit | Carnacin kivirivit | 1116 | OK | 2 | 0 | — | — |
| avignonin-paavinpalatsi | Avignonin paavinpalatsi | 1587 | OK | 2 | 0 | — | — |
| chambord | Chambord | 1487 | OK | 2 | 0 | — | — |
| douaumont | Douaumont | 1376 | OK | 2 | 0 | — | — |
| bayeux-seinavaate | Bayeux'n seinävaate | 1532 | OK | 2 | 0 | — | — |
| millaun-silta | Millaun silta | 1449 | OK | 2 | 0 | — | — |

(Muut neljä tiedostoa — fokuskohteet-fra.js, hahmotelma-fra.js,
maalehtinostot-fra.js, nakyvat-kaupungit-fra.js — eivät sisällä
kuvapuutteita; niiden rivikohtaiset luvut ovat yllä olevissa
rakenneselityksissä ja koontitaulukossa.)

## TÄYDENNETTÄVÄT — valmis lista seuraavalle Opus-erälle

14 kohdetta `js/packs/maastokohteet-fra.js`:ssä, yhteensä 17 uutta
Commons-kuvaa tarvitaan (samalla tavalla kuin hahmotelma-fra.js:ssä:
`tools/hae-commons.mjs tiedot`, vain PD/CC0/CC BY/CC BY-SA, tekijä +
lisenssi + lähdeUrl kirjattuna, ladattu 900 px leveinä, ei vielä
ämpäriin eikä repoon).

1. **montblanc** (Mont Blanc) — puuttuu: 1 kuva lisää (on jo 1).
   Haku: en "Mont Blanc summit Chamonix", fr "Mont Blanc sommet
   Chamonix" — esim. historiallinen alppikiipeilykuva 1800-luvulta.
2. **vignemale** (Vignemale) — puuttuu: 1 kuva lisää (on jo 1).
   Haku: en "Vignemale glacier Pyrenees", fr "glacier du Vignemale".
3. **mont-saint-michel** (Mont-Saint-Michel) — puuttuu: 1 kuva lisää
   (on jo 1). Haku: en "Mont Saint-Michel 19th century engraving",
   fr "Mont-Saint-Michel gravure ancienne".
4. **valimeri** (Välimeri) — puuttuu: 2 kuvaa. Haku: en
   "Mediterranean Sea French coast", fr "Méditerranée côte
   française" / "Côte d'Azur littoral".
5. **biskajanlahti** (Biskajanlahti) — puuttuu: 2 kuvaa. Haku: en
   "Bay of Biscay France coast", fr "Golfe de Gascogne côte".
6. **lascaux** (Lascaux) — puuttuu: 2 kuvaa. Haku: en "Lascaux cave
   paintings", fr "grotte de Lascaux peintures rupestres" (HUOM:
   alkuperäisluola suljettu — Commonsissa on faksimilekuvia,
   varmista kuvateksti ei väitä alkuperäistä).
7. **chartresin-katedraali** (Chartresin katedraali) — puuttuu: 2
   kuvaa. Haku: en "Chartres Cathedral", fr "Cathédrale Notre-Dame de
   Chartres".
8. **pont-du-gard** (Pont du Gard) — puuttuu: 2 kuvaa. Haku: en/fr
   "Pont du Gard aqueduct".
9. **carnacin-kivirivit** (Carnacin kivirivit) — puuttuu: 2 kuvaa.
   Haku: en "Carnac stones alignments", fr "alignements de Carnac".
10. **avignonin-paavinpalatsi** (Avignonin paavinpalatsi) — puuttuu:
    2 kuvaa. Haku: en "Palace of the Popes Avignon", fr "Palais des
    Papes Avignon".
11. **chambord** (Chambord) — puuttuu: 2 kuvaa. Haku: en/fr "Château
    de Chambord".
12. **douaumont** (Douaumont) — puuttuu: 2 kuvaa. Haku: en "Douaumont
    ossuary Verdun", fr "ossuaire de Douaumont".
13. **bayeux-seinavaate** (Bayeux'n seinävaate) — puuttuu: 2 kuvaa.
    Haku: en "Bayeux Tapestry", fr "tapisserie de Bayeux" (HUOM:
    kuva jo kortin lähdeteoksena `maa-kategoriat.js`:ssä
    `Bayeux Tapestry 32-33 comet Halley Harold.jpg` — voi käyttää
    samaa tai toista kohtausta kunhan lisenssi tarkistetaan erikseen
    tälle kohteelle).
14. **millaun-silta** (Millaun silta) — puuttuu: 2 kuvaa. Haku:
    en/fr "Millau Viaduct" ("Viaduc de Millau").

## Menetelmä ja rajoitukset

- Kaikki kuusi fra-pakkaa importattiin suoraan Node 22:lla (ES-
  moduulit, ei build-vaihetta) ja jokainen kohde normalisoitiin
  yhteiseen muotoon.
- HEAD-pyynnöt ajettiin Node 22:n omalla `fetch`illä, enintään 3
  rinnakkain, jokaiselle `https://media.matkakirja.app/...`-osoitteelle
  (74 uniikkia osoitetta). `NODE_USE_ENV_PROXY` ei ollut tarpeen —
  Mac Studio -ympäristössä fetch toimi suoraan.
- Lisenssit tarkistettiin sekä automaattisella hyväksyntälistalla
  (PD/CC0/CC BY/CC BY-SA hyväksytään, NC/ND/GFDL/FAL liputetaan) että
  silmämääräisesti; kaksi automaattista väärää hälytystä (ks. yllä,
  `ihme`-kentän puuttuva `lisenssi`-avain ja "PD"-lyhenne) on
  selitetty auki eikä lasketa yhteenvedon "epäkelvot lisenssit"
  -lukuun.
- Yhtäkään Commons-kuvan alkuperäistä lisenssisivua ei avattu
  uudelleen Commonsista tässä erässä (aikaraja 30 min); lisenssitieto
  on luettu pakkoihin jo aiemmin kirjatuista kentistä.
- Pelin koodia tai dataa ei muutettu tässä erässä.
