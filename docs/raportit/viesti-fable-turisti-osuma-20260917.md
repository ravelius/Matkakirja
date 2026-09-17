# Viesti Fablelle: kyltti voittaa kosketusvaran, saa saman kertoimen ja oman laatikon

**Opus-sessio 17.9.2026. Haara `claude/bold-ride-vow4ki-turisti-osuma`
(pohja origin/main = v1927, `413204c7`). Ei PR:ää, ei versionostoa, ei
Raamattu-muokkausta.**

Tilaus: Raamattu, KARTTAUUDISTUKSEN PAATOKSET 31 **TARKENNUS 2 kohdat
4–6** (omistaja 17.9.2026 klo 03.30 UTC, kaksi korttia). Kaikki kolme on
tehty ja mitattu molemmilla ruuduilla. **Yksi mitattu hinta jäi
maksamatta ja se on sinun päätöksesi** — luku 5.

**Kuva (ennen | jälkeen, 390 × 844 dpr 2, Pariisin sisin sallittu
zoomi):** `docs/raportit/kuvat/turisti-osuma-390-20260917.jpg` (82 kt).
Vasemmalla *Impressionistit…* kulkee *Turisti-infon* läpi, oikealla
kyltti on vapaa.

---

## 1. Kohta 4 — KYLTTI VOITTAA KOSKETUSVARAN

| mitta (Pariisin lähizoomi, napautus kyltin keskelle) | ENNEN (v1927) | JÄLKEEN |
|---|---|---|
| 390 × 844 | ei avannut mitään | **avasi oppaan (Matkailijan Pariisi)** |
| 1400 × 900 | ei avannut mitään | **avasi oppaan (Matkailijan Pariisi)** |
| Bukarestin lappuvartiot 2, 6, 7 (8 px sormenpoikkeama) | vihreät | **vihreät** |

Sääntö on omistajan oma sanamuoto kahtena mittana
(`js/pallolauta/lauta.js` `lahinMerkki`):

1. sormi on kyltin **omalla musteella** (symboli tai nimiöteksti, ei
   kosketusvaraa) → kyltti vie napautuksen;
2. paitsi jos sormi on samalla noston **omalla musteella**
   (`musteeseenOsunut(lat, lng, 0)` eli kosketusvara nollassa) →
   Chambord-sääntö 14.9. säilyy sellaisenaan.

Haara ei koske lainkaan napautuksiin kyltin ulkopuolella, ja juuri siksi
Bukarest pysyy vihreänä: siellä sormi ei ole kyltin päällä, joten
16 px:n kosketusvara on yhä voimassa. **Tähän kaatui 16.9. kokeiltu
korjaus (a)**, joka antoi kyltin voittaa aina kun se oli lähin merkki.

**Vastakoe on kaksiportainen ja se paljasti yhden asian.** Pelkkä
`?kylttiosuma=0` **ei** riitä vastakokeeksi puhelimella: mitattu
17.9.2026, kyltti aukeaa siellä myös ilman tätä sääntöä, koska kohdan 6
laatikkokorjaus siirsi naapurin lapun pois kyltin päältä — työpöydällä
ei aukea. Kohdat 4 ja 6 korjaavat siis saman napautuksen kahdesta päästä.
Vartio 7g kääntää siksi **molemmat** pois
(`?kylttiosuma=0&kylttilaatikko=0`), ja silloin napautus ei avaa mitään
kummallakaan ruudulla — täsmälleen se tila, jossa omistaja vian näki.
Pelkän osumasäännön mittaus jää INFO-riviksi molemmille ruuduille.

## 2. Kohta 5 — KYLTIN KERROIN SAMA KUIN MUILLA MERKEILLÄ

| kyltin nimiö ruudulla | ENNEN (v1927) | JÄLKEEN |
|---|---|---|
| saapumisnäkymä, 390 px | **16,00 px** (katossa jo saapuessa) | **11,50 px** |
| saapumisnäkymä, 1400 px | **8,25 px** (lattiassa) | **11,50 px** |
| lähizoomi, 390 px | 16,00 px | 16,00 px |
| lähizoomi, 1400 px | 16,00 px | 16,00 px |
| merkin mitta lähizoomissa | 1,4545 | 1,4545 |
| vastakoe `?nimiokatto=0`, 390 / 1400 | 79,80 / 22,97 px | **33,77 / 33,77 px** |

Sama pelitilanne antoi ennen puhelimelle 3,3-kertaisen kyltin
työpöytään nähden; nyt luku on sama molemmilla, ja se on
**kaupunkimerkin oma nimiökoko** (`KAUPUNKIMERKIN_NIMIO_PX` = 11,5 px).
Korjaus ei ole uusi kaava vaan vanhan poisto: mitta tulee samasta
funktiosta kuin kaupunkimerkillä, `nostonMitta(KAUPUNKIMERKIN_KERROIN)`
(`js/pallolauta/lauta.js` `paivitaTuristiInfo`). Vertailuleveys *maan
laatikko × 1,15* ja koko `kaupunkimerkinMitta`-funktio ovat poissa
`js/kaupunkinosto.js`:stä — kerroin ja katto asuvat nyt yhdessä paikassa.

Sivutulos: vastakokeen luku on nyt **sama molemmilla ruuduilla**
(33,77 px), koska kerroinkin on sama. Se on itsessään todiste siitä,
että kohta 5 puri.

`savuke-kaupunkipopup.mjs`:n vartio *"merkki skaalautuu zoomatessa"* on
päivitetty: kaksiosainen haara *"katto puree jo maan näkymässä"* on
poistettu, koska sen ehto ei voi enää toteutua (saapumismitta 1,0455 <
katto 1,4545). Tilalle tuli uusi vartio *"kyltin kerroin on sama kuin
muilla merkeillä (saapuessa 11,5 px)"* — vihreä Pariisissa ja
Marseillessa, molemmilla ruuduilla.

## 3. Kohta 6 — KYLTIN VARAUS LADONNASSA

| mitta (Pariisin lähizoomi) | ENNEN (v1927) | JÄLKEEN |
|---|---|---|
| kyltin varaus `merkit.laatikot('turistiinfo')` | **1,00 × 1,00 px** | **96,62 × 21,53 px** |
| kyltin piirretty ala ruudulla | 97,45 × 21,34 px | 97,45 × 21,34 px |
| kaupunkinimiä varauksen päällä, 390 / 1400 | 0 / 0 | 0 / 0 |
| nostolappuja varauksen päällä, 390 | **1** (*Impressionistit…*) | **0** / 12 |
| nostolappuja varauksen päällä, 1400 | **1** (*Impressionistit…*) | **0** / 19 |
| Bukarest, Ateena, Helsinki, Istanbul (savuke-pallo-nostolaput) | 8/8 | **8/8** |

## 4. Juurisyy kohdassa 6 oli kaksikerroksinen — ja se mitattiin

**Ensimmäinen kerros** on se, jonka edellinen erä jo löysi: merkin svg on
1 × 1 px ja koko piirros elää `overflow: visible` -siirtoryhmässä, joten
`merkit.laatikot('turistiinfo')` palautti PISTEEN. Ilmeinen korjaus on
lukea ryhmän oma laatikko DOMista, ja se kokeiltiin ensin.

**Se ei riittänyt, ja syy mitattiin.** DOM-luku antoi oikean mitan
(97,45 × 21,34 px), mutta *Impressionistit…* jäi silti kyltin päälle
2,35 px:n kaistalla — **molemmilla ruuduilla, toistettavasti**. Kolme
mittausta erottivat syyt toisistaan:

1. kyltin elementin ankkuri oli **täsmälleen** kartan laskemassa
   ruutupisteessä (390 px: 223,09 / 403,71 kumpikin) → paikka ei ollut
   jäljessä;
2. sovittelun saama estelista sisälsi kyltin oikean levyisenä
   (`kiinteitä 1, kyltin leveys 97,45`) → este ei puuttunut;
3. **sama ladonta uudelleen ajettuna (`ladoHeti`) siirsi lapun pois** →
   ladonnan hetkellä luettu ala ei ollut se, minkä DOM antoi hetkeä
   myöhemmin.

Kolmas mittaus on vastaus: merkin **rasteri paistetaan asynkronisesti**
(`js/fokusnosto-symbolit.js` `asetaRasteri`), joten ruudulta luettu ala
on ladonnan hetkellä edellisen portaan ala. Kaksi kokeiltua kiertotietä —
uusi ladontapyyntö, kun varauksen mitta muuttuu, ja sovittelun toinen
kierros — **eivät muuttaneet lukuja lainkaan** (mitattu, molemmat
peruttiin).

**Korjaus on lähteen vaihto, ei uusi silmukka.** Kyltin laatikko
lasketaan nyt samasta `nostonLaatikko`-kaavasta kuin nostojen omat
laatikot, samalla mitalla ja samalla nimiöllä kuin kyltti piirretään
(`js/pallolauta/lauta.js` `kyltinLaatikot`, `KYLTIN_LADONTA`). Kaava ei
odota ketään — ja juuri siksi nostot lasketaan kaavasta eikä ruudulta
(`js/pallolauta/nostot.js` `sovittele`: *"ei layout-thrashia"*). Sama
laatikko palvelee sekä ladontaa että osumatestiä, joten kaksi laatikkoa
samalle merkille ei voi olla eri mieltä.

## 5. MITATTU HINTA — PÄÄTÖS SINULLE

`savuke-pariisi-lahizoom` **3e4** on punainen molemmilla ruuduilla:

> *"yhdenkään aihenoston nimiö ei ole piilossa — 1 piilossa:
> aihemerkki:syvennys-pariisi-impressionistit"*

Kaksi omistajan omaa sääntöä osuvat yhteen:

- **PAATOKSET 27 TARKENNUS 2 kohta 8** (16.9.): aihenostolla ON nimiö;
- **PAATOKSET 31 TARKENNUS 2 kohta 6** (17.9.): mikään ei lado kyltin
  päälle.

Pariisin lähizoomissa *Impressionistit…* -aihemerkki on kyltin laatikon
sisällä, ja **jokainen neljästä kyljestä ja jokainen siirto leikkaa
kyltin laatikkoa**, joten sovittelun viimeinen keino on nimiön
piilotus — merkki itse ja sen viuhka jäävät kartalle. Kokeilin
sovitteluun kolmatta porrasta (*"mieluummin naapurilapun viereen kuin
ilman nimeä"*, `etsi(siirretyt) ?? etsi([])`): **luvut eivät muuttuneet**
lainkaan, koska kiinteä muste tukkii kaikki asennot — porras peruttiin,
koska mittaamatonta ei kannata jättää koodiin.

Vaihtoehdot ovat sinun:

1. **nyt valittu:** kyltti on vapaa, *Impressionistit…* on lähizoomissa
   pelkkä merkki ilman nimiötä (kuvan oikea puoli);
2. nimiö saa jäädä kyltin päälle viimeisenä keinona — silloin 7e
   löystyy eikä kohta 6 pidä Pariisissa;
3. kyltti siirretään kaupungin toiselle puolelle, kun sen laatikko
   tukkisi aihemerkin — uusi sääntö, ei tämän erän asia.

En löysännyt 3e4:ää enkä poistanut sitä. Punainen on mittaustulos.

## 6. Vartiot ja vastakokeet

| vartio | tila | mitä se sanoo |
|---|---|---|
| `savuke-pariisi-lahizoom` **7c** | INFO → **VARTIO**, vihreä | napautus kyltin päälle avaa turisti-infon |
| **7e** *(uusi)* | vihreä | yksikään nimi tai lappu ei lado kyltin laatikon päälle |
| **7f** *(uusi)* | vihreä | kyltti skaalautuu kuin muut merkit (11,5 px → 16 px) |
| **7g** *(uusi vastakoe)* | vihreä | `?kylttiosuma=0&kylttilaatikko=0` → napautus ei avaa opasta |
| **7h** *(uusi vastakoe)* | vihreä | `?kylttilaatikko=0` → varaus 1 × 1 px ja lappu kyltin päällä |
| **3e4** | **punainen** | luku 5 — kahden säännön mitattu ristiriita |
| `savuke-pallo-nostolaput` **2, 6, 7** | vihreät | Bukarestin lappunapautukset kestävät uuden säännön |
| `savuke-kaupunkipopup` *"merkki skaalautuu zoomatessa"* | vihreä, haara poistettu | katto ei enää pure saapuessa |
| `savuke-kaupunkipopup` *"kyltin kerroin on sama kuin muilla"* | **uusi**, vihreä ×4 | saapuessa 11,5 px |

Uudet liput (`js/pallolauta/lauta.js` `pallonSaantoKaytossa`, sama kuvio
kuin `?nimiokatto=0`): **`?kylttiosuma=0`** sammuttaa kohdan 4 säännön ja
**`?kylttilaatikko=0`** palauttaa varauksen 1 × 1 px:n pisteeksi.
Molemmat voi kääntää kesken ajon (`history.replaceState` + `ladoHeti`).

## 7. Ajot

Kaikki 17.9.2026, tässä haarassa, etualalla yksi kerrallaan.

| ajo | tulos |
|---|---|
| `savuke-pariisi-lahizoom` (390 + 1400) | **64/66** — punaisina 3e4 molemmilla ruuduilla (luku 5). Pohja mitattiin samalla savukkeella ennen muutoksia: **56/56** |
| `savuke-pallo-nostolaput` (Bukarest, Ateena, Helsinki, Istanbul) | **8/8** — sama kuin pohja |
| `savuke-kaupunkipopup` (390 + 1400) | **44/61** — 17 punaista, **sama lista kuin pohjalla** (pohja 40/57; erotus on neljä uutta vihreää kerroinvartiota) |
| `node --test` osumareititys, karttamerkit, pallosovittelu, pallonimet, nimiolimitys, aihemerkit, nostot-kartalla, nostomerkit, pallonimikyltti, dokumentit | **93/93** |
| `tools/tarkista-savukkeet.mjs` | kunnossa (1899 ui-viittausta) |
| `tools/tarkista-niputus.mjs` | kunnossa (394 moduulia, ei törmäyksiä) |
| `node --check` muutetuille tiedostoille | puhdas |

## 8. Muutetut tiedostot

| tiedosto | muutos |
|---|---|
| `js/pallolauta/lauta.js` | kohta 4: `kyltinMusteella` + sääntö `lahinMerkki`ssä, `musteeseenOsunut(lat, lng, vara)`; kohta 5: `mitta: nostonMitta(KAUPUNKIMERKIN_KERROIN)`; kohta 6: `KYLTIN_LADONTA` + `kyltinLaatikot()` kaavasta, kyltti sovittelun esteeksi, julkinen `turistiLaatikot()`; vastakokeen liput `pallonSaantoKaytossa` |
| `js/pallolauta/nostot.js` | `sovittele({ nimet, kiinteat })` — muukin liikkumaton muste kuin nimet |
| `js/kaupunkinosto.js` | `kaupunkimerkinMitta`, `KAUPUNKIMERKIN_MITTA_MAX` ja `KAUPUNKIMERKIN_MITTA_MIN` poistettu (kerroin ja katto yhdessä paikassa); perustelu mitattuine lukuineen tiedostossa |
| `tests/osumareititys.test.mjs` | kaksi uutta testiä: säännön kaksi mittaa `musteenVoittaja`lla laskettuna ja sääntöjen järjestys lähteessä |
| `tests/pallosovittelu.test.mjs` | kyltti sovittelun esteenä, varaus kaavasta, vastakokeen lippu |
| `tools/savukkeet/savuke-pariisi-lahizoom.mjs` | 7c vartioksi, uudet 7e, 7f, 7g, 7h; ladonnan kolme laatikkojoukkoa mittaukseen |
| `tools/savukkeet/savuke-kaupunkipopup.mjs` | kerroinvartio kaksiosaisesta yksiosaiseksi + uusi saapumismittavartio |
| `tools/savukkeet/README.md` | savukkeen vartiorivit ja tunnettu punainen |
| `docs/raportit/viesti-fable-turisti-osuma-20260917.md` | tämä |
| `docs/raportit/kuvat/turisti-osuma-390-20260917.jpg` | ennen/jälkeen 390 px |

## 9. Mitä jäi tekemättä

1. **3e4:n ristiriita** (luku 5) — omistajan päätös siitä, kumpi
   väistää: aihenoston nimiö vai kyltin laatikko.
2. `savuke-kaupunkipopup`in **17 vanhaa punaista** (ml. *"turisti-info
   aukesi napautuksesta"*, joka on saapumisnäkymän oma ketju ja kaatuu
   jo aiempaan *"iso pop-up aukesi"* -riviin) — sama lista kuin
   pohjalla, ei tämän erän aiheuttamia.
3. Raamattuun ei koskettu, versiota ei nostettu, PR:ää ei tehty
   (tehtävänannon mukaisesti).
