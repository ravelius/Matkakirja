# Viesti Fablelle: kohdemaalle ei merkkikattoa, lisäkaupungin nimiö 11,5 px

**Opus-sessio 15.9.2026. Pohja: haara `claude/bold-ride-vow4ki-nimikyltit`
(PR #2527, nimikylttikorjaus) — tämä haara SISÄLTÄÄ sen. Ei
versionostoa, ei mergeä, ei Raamattu-muokkausta.**

Omistaja 15.9.2026 klo 17.20 UTC kysymyskortilla, sanatarkasti:
*"Kohdemaalle ei kattoa"* ja *"Isommaksi, n. 11-12 px"* (Raamattu
haarassa `claude/bold-ride-vow4ki`, KARTTAUUDISTUKSEN PAATOKSET 25).
Päätös vastaa edellisen erän mittaukseen (SELVITYS: RANSKAN NOSTOT JA
MUUT KAUPUNGIT PUUTTUVAT): katto `PAAKARTAN_MERKKIKATTO = 21` piilotti
Ranskan 62 merkistä 40, ja lisäkaupunkien nimiö oli 8,5 px.

---

## 1. Mitä tehtiin — neljä muutosta, kaikki `js/pallolauta/nostot.js`

1. **KATTO EI KOSKE KOHDEMAATA.** `merkkiPortti` sai neljännen
   parametrin `{ kohdemaa }`. Pelin oma kerros (`keraa`) antaa sen
   aina, koska se kerää merkit vain korostetusta maasta
   (`kohteidenNykyinenIso`, sama luku kuin laudan `korostusIso`) eikä
   katselutilassa lainkaan. Laattageneraattori ja savukkeet kysyvät
   samaa porttia ILMAN lippua ja saavat katon 21 entisellään — muiden
   maiden merkit pysyvät siis katon alla, ja Fablen sääntö *"raja ei
   nouse hiljaa"* on voimassa siellä, missä se mitoitettiin.
2. **`lahi: true` aukeaa myös kohdemaassa — mitattu, ei tulkittu.**
   Pelkkä katon poisto jätti piiloon täsmälleen 18 merkkiä, ja jokainen
   oli `nosto-maalehti-*`. Niiden `lahi`-lipun perustelu on
   kirjoitettu auki datassa (`js/packs/maalehtinostot-fra.js`):
   *"Pääkartan 21 merkin raja — pysyy, joten tämän erän uudet nostot on
   merkitty `lahi: true` -portin taakse"*. Lippu oli siis kiertotie
   juuri tälle katolle, ja kun omistaja poisti katon, kiertotien syy
   poistui. **Lippua ei poistettu datasta**, koska se tekee vielä
   toista työtä: `lahi`-merkki ohittaa kaupunkiruuhkan kolmen merkin
   katon (`js/fokuskohteet.js karsiKaupunkiruuhka`), ja ilman lippua
   kaupungin kohdalle osuvat nostot putoaisivat kartalta kokonaan.
   **Tämä on ainoa kohta, jossa menin PAATOKSET 25:n sanamuotoa
   pidemmälle** (*"merkkikatto ei koske kohdemaata"*) — ilman sitä
   *"KAIKKI nostot ja kaupungit"* olisi jäänyt 44:ään 62:sta. Jos
   Fable haluaa nämä 18 takaisin lähizoomiin, muutos on yksi ehto.
3. **LISÄKAUPUNGIN NIMIÖ 11,5 px.** `KAUPUNKIMERKIN_NIMIO_PX = 11,5`
   (tilatun välin 11–12 keskellä ja samalla kartan oma vuori-nimiön
   porras) ja siitä kerroin 1,353 kohdenimiön 8,5 px:ään nähden.
   Kerroin on MERKIN MITTA eikä pelkkä kirjasinkoko, koska nimiö ja
   viivamerkki ovat samassa rasterissa — kaupungin piste kasvaa siis
   mukana, mikä on kartografisesti oikein päin. Sama kerroin menee
   piirtoon ja laatikkoon (`nostonLaatikko`), joten ladonta, väistö ja
   osumapinta mittaavat sitä, mikä ruudulla on. Kerroin koskee vain
   ELÄVIÄ kaupunkimerkkejä: poltettua mustetta ei voi suurentaa
   jälkikäteen (sama sääntö kuin "poltettua mustetta ei voi
   piilottaa"). Nimikyltin ankkuri ei muutu (PAATOKSET 24, #2527).
   Kerroin koskee **kaikkia** eläviä kaupunkimerkkejä (`tyyppi:
   'kaupunki'`), ei vain Ranskan seitsemää: se on kartan hierarkia,
   ei pilotin poikkeus. Muissa maissa kaupunkimerkit ovat valtaosin
   poltettuja, joten ruudulla ei muutu mitään ennen seuraavaa polttoa
   (Kreikassa mitattuna ei yhtään elävää kaupunkimerkkiä).
4. **Kaupungit ensin DOM-budjetissa.** Kun kaikki 62 piirtyvät, eläviä
   merkkejä on enemmän kuin CSS2D-budjetti (`NOSTOJEN_KATTO` 40,
   karttapallo.md luku 6) päästää, ja pelkkä etäisyysjärjestys pudotti
   Strasbourgin, Nizzan ja Lillen — kolme seitsemästä lisäkaupungista,
   jotka olivat kartalla ennen tätä erää. Elävien järjestys on nyt
   kohtaamispiste → kaupungit → lähimmät ruudun keskipistettä.

---

## 2. Mittaus ennen / jälkeen — saapumisnäkymä

Väline: `tools/savukkeet/mittaa-kohdemaan-merkit.mjs` (uusi; mitta, ei
savuke), Chromium, pelaaja Pariisissa / Ateenassa, saapumisnäkymä
ajettu loppuun. "Portti" = `merkkiPortti` päästää / jättää lähizoomiin.
Nimiön koko luetaan merkin omasta skaalasta (rasterissa nimiö on 11
yksikköä). "Nimiölaatikot" ovat kerroksen omat laatikot
(`lappuLaatikot`), päällekkäisyys niiden leikkaus.

### Ranska 1400 × 900

| | ennen | jälkeen |
|---|---|---|
| portti päästää / kaikkiaan | 22 / 62 (21 + 1 polttovelka) | **62 / 62** |
| lähizoomiin piiloon | 40 | **0** |
| eläviä merkkielementtejä | 13 | 40 (CSS2D-budjetti) |
| merkkejä ruudulla (elävät + poltetut) | 28 | **55** |
| lisäkaupunkeja ruudulla | 7 | 7 |
| lisäkaupungin nimiö | 8,50 px | **11,50 px** |
| noston nimiö | 8,50 px | 8,50 px |
| nimiöitä näkyvissä | 12 | 39 |
| päällekkäisiä nimiöitä | 0 (0 %) | 14 (35,9 %), 9 paria |

### Ranska 390 × 844

| | ennen | jälkeen |
|---|---|---|
| portti päästää / kaikkiaan | 22 / 62 | **62 / 62** |
| lähizoomiin piiloon | 40 | **0** |
| eläviä merkkielementtejä | 9 | 40 |
| merkkejä ruudulla | 16 | **47** |
| lisäkaupunkeja ruudulla | 4 | 4 |
| lisäkaupungin nimiö | 8,50 px | **11,50 px** |
| nimiöitä näkyvissä | 8 | 39 |
| päällekkäisiä nimiöitä | 0 (0 %) | 16 (41,0 %), 11 paria |

Puhelimella ruudulla on neljä lisäkaupunkia seitsemästä sekä ennen
että jälkeen — Strasbourg, Nizza ja Nantes jäävät pystyruudun
rajauksen ulkopuolelle (PAATOKSET 17: korkeuteen sovitettu
saapumisnäkymä, sivuille panoroidaan). Se ei ole tämän erän tekemä
eikä muuttunut.

### Kreikka 1400 × 900 — ei heikennystä

| | ennen | jälkeen |
|---|---|---|
| portti päästää / kaikkiaan | 29 / 33 (21 + 8 polttovelka) | **33 / 33** |
| piiloon | 4 | **0** |
| eläviä merkkielementtejä | 5 | 9 |
| merkkejä ruudulla | 31 | 35 |
| päällekkäisiä nimiöitä | 0 (0 %) | **0 (0 %)** |

---

## 3. Limitys — mitä se maksoi (PAATOKSET 25 kohta 3)

Nimiöiden päällekkäisyys kasvoi nollasta, ja syy on suoraan
omistajan päätöksessä: samaan näkymään tuli 40 merkkiä lisää.
Sovittelu (`js/pallolauta/sovittelu.js`) väistää minkä voi, mutta
Pariisin seudun ja Lyonin ympäristön tiheydessä kaikki eivät mahdu
erilleen. `savuke-ranska-sisalto`-savukkeen omalla mitalla
(osumalaatikot, joissa on mukana myös poltettu muste):

| ruutu | leikkauksia ennen | jälkeen (kaikki / tämän erän merkit) |
|---|---|---|
| 1400 × 900 | 0 / 0 | 14 / 5 |
| 390 × 844 | 0 / 0 | 15 / 6 |

**Omistajan nimeämä vastaus on jo voimassa:** nostojen nimiö on 8,5 px
ja kaupunkien 11,5 px, eli nostot ovat pienemmällä kuin kaupungit.
Seitsemästä–yhdeksästä parista vain yksi–kaksi koskee kaupunkia
(Lyon × Cinématographe, puhelimella lisäksi Lyon × Michelin-opas);
loput ovat nosto–nosto-pareja Pariisin ruuhkassa. **Lisäkaupungit
eivät mene toistensa päälle yhdelläkään ruudulla.**

Kreikassa limitys pysyi nollassa, ja `tools/tarkista-nimiolimitys.mjs`
(poltettujen laattojen ladonta laudan yksiköissä) antaa saman tuloksen
kuin ennen — tämä erä ei koske poltettuun ladontaan lainkaan.

**Fablen päätettäväksi jää**, riittääkö tämä vai halutaanko nostojen
nimiötä pienentää alle 8,5 px:n. En pienentänyt sitä omin päin, koska
8,5 px on omistajan oma mitta PAATOKSET 14:stä.

---

## 4. Vartiot ja vastakokeet

- `tests/nostopoltto-merkkiportti.test.mjs` (uudet):
  *"kohdemaassa katto ei pidätä mitään — muualla pidättää"*: Ranskan
  aidolla aineistolla kohdemaa-lipulla 62 / 62 ja piiloon 0;
  **vastakoe** ilman lippua: läpi ≤ 21 ja piiloon > 0.
  *"kaupunkimerkin nimiö on isompi kuin noston — ja vain elävänä"*:
  11,5 px välillä 11–12, poltetun kerroin 1.
- `tools/savukkeet/savuke-nimikyltti.mjs` vartio 8 (uusi, molemmat
  ruudut): saapumisnäkymässä portti ei jätä yhtään kohdemaan merkkiä
  piiloon (62, piiloon 0); 8b lisäkaupungin nimiö 11–12 px; 8c noston
  nimiö on pienempi kuin kaupungin; **8d VASTAKOE** ilman selainta:
  sama aineisto ilman kohdemaa-lippua → läpi 21, piiloon 41, eli katto
  puree yhä. Savuke 43 → **50/50 läpi**.
- `tools/savukkeet/savuke-ranska-sisalto.mjs` vartio 4 käännettiin
  ympäri (*"enintään 21"* → *"kaikki 62, piiloon 0"*) ja vartio 6
  jaettiin: **6a** lisäkaupunkien nimiöt eivät mene toistensa päälle
  (tiukka) ja **6b** uusien merkkien leikkauksia enintään budjetti 8
  (mitattu 5–6). Vanha vartio 6 (*"yksikään tämän erän merkki ei mene
  päällekkäin"*) piti vain siksi, että katto päästi saapumisnäkymään
  22 merkkiä 62:sta — se ei voi jäädä sellaisenaan voimaan, kun
  omistaja tilasi kaikki 62 näkyviin.
- `savuke-nimikyltti` vartio 6 lukee merkin mitan nyt merkiltä, joka
  EI ole kaupunki (`:not(.pallolauta-nosto-kaupunki)`) — muuten
  DOM-järjestyksen ensimmäinen merkki vaihtuisi kaupungin ja noston
  välillä ja suhde mittaisi kahta eri mittaa.

## 5. Ajetut testit ja savukkeet

- `node --test` kohdetestit (nostopoltto-merkkiportti, pallonimet,
  karttamerkit, nostoladonta, nimiolimitys, pallonimikyltti) — läpi.
- `tools/savukkeet/savuke-nimikyltti.mjs` — **50/50**.
- `tools/savukkeet/savuke-era12.mjs` — **27/27**.
- `tools/savukkeet/savuke-kaupunkikortit.mjs` — **121/121**.
- `tools/savukkeet/savuke-ranska-sisalto.mjs` — **28/30**. Kaksi
  punaista ovat POHJAHAARASSA ENNESTÄÄN (sama savuke ajettuna
  `origin/claude/bold-ride-vow4ki-nimikyltit`-haarassa: 26/28, samat
  kaksi): *8a puhelimella Strasbourg, Nizza ja Nantes eivät ole
  osumalistalla* (ne ovat pystyruudun rajauksen ulkopuolella,
  PAATOKSET 17) ja *9 minikysymyksen palkkio 390 px:llä*. Kumpikaan
  ei liity tähän erään eikä muuttunut siitä.
- `tools/tarkista-savukkeet.mjs` — kunnossa (1747 ui-viittausta).
- `tools/tarkista-nimiolimitys.mjs` — sama tulos kuin pohjahaarassa
  (naapurimaat 9, sama maa 36, eläintäky 5): poltettu ladonta ei
  muuttunut.
- `node --test tests/dokumentit.test.mjs` — 3/3.

## 6. Kuvat

- `docs/raportit/kuvat/kohdemaan-merkit-1400-20260915.jpg` — Ranskan
  saapumisnäkymä 1400 × 900 korjauksen jälkeen.
- `docs/raportit/kuvat/kohdemaan-merkit-390-20260915.jpg` — sama
  puhelinruudulla 390 × 844.

Molemmissa kuvissa saapumiskortti on suljettu (Escape), koska
puhelimella se peittää kartan; mitta ajetaan kuvan näkymästä vielä
kerran, jotta kuva ja luvut ovat samasta näkymästä (työpöytä 62 /
piiloon 0, 7 lisäkaupunkia; puhelin 62 / piiloon 0, 4 lisäkaupunkia).
