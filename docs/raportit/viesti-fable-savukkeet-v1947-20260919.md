# Savukkeet v1947 — kahdeksan uutta punaista, syyt ja korjaukset

Opus-erä 19.9.2026, haara `claude/bold-ride-vow4ki-savukkeet-v1947`
(pohja `claude/bold-ride-vow4ki-v1947`, commit 03f5ccd7).

PR #2590:n Savukkeet-ajo (run 35394384489) antoi kahdeksan uutta
punaista. Ajo kulki rinnan raskaan paikallisen reliefipoltton kanssa,
joten osan piti olla kuormahäilyä. Tämä erä ajoi savukkeet **kerran
paikallisesti peräkkäin** (ei rinnan, portit 8836–8843) ja erotti
kuormahäilyn aidoista yhteisvaikutuksista.

Ympäristö: Mac Studio, node 22, Chromium 1234. Rinnalla kulki
omistajan reliefipyramidin poltto (kohtalainen kuorma). Kestot:
kohdevalinta 109 s, kerma-reuna 62 s, pallo-nostolaput 44 s,
astro-aani (puhelin) 31 s, kaupunkipopup-390 186 s, kerma-reuna --vanha 63 s.

---

## Yhteenveto

| Savuke | CI (rinnan) | Paikallinen (yksin) | Syy | Tila |
| --- | --- | --- | --- | --- |
| kohdevalinta | 10/14 | **14/14** | savuke mittasi vanhaa maailmaa (PAATOKSET 43 kohta 8) | KORJATTU |
| topografialinssi (Ohita jäänteenä) | punainen | — | Ohita on kohdan 10 mukaan kelluva nappi luennan elinkaarella | KORJATTU (poikkeuslista) |
| topografialinssi (luenta false, välähdys, 600 s) | punainen | **toistuu bitilleen yksin** | savuke odottaa äänen kelloa, jota tämä Chromium ei etene | VELKA, ks. kohta 2 |
| astro-aani, puhelin `soi:false` | punainen | **soi: true, 84 s silmukka** | otos loppui 10 s:iin ennen kuin linssi heräsi kuormassa | KORJATTU (otos soittimen mukaan) |
| astro-aani, `taso 0` (molemmat ruudut) | punainen | punainen, `ctxAika 0` | AudioContext on **suspended** tässä Chromiumissa | VELKA, ks. kohta 3 |
| kerma-reuna V4 | 14/16 | **14/16, samat luvut** | EI kuormaa eikä v1947: `--vanha` antaa bitilleen saman | VELKA (mittausraja), ks. kohta 4 |
| pallo-nostolaput 6–7 | 6/7 | **4/6, sama napautus ohi** | EI kuormaa; deterministinen | VELKA, ks. kohta 5 |
| kaupunkipopup-390 | 6 punaista | punainen samoin | sama juurisyy kuin kohdevalinnassa: kohta 8 | VELKA, ks. kohta 5 |
| pariisi-lahizoom 8c 20 s | punainen | (ajo kesken aikakatossa) | — | ks. kohta 5 |

---

## 1. savuke-kohdevalinta (10/14 → 14/14) — KORJATTU

**Syy.** Savuke mittasi vanhaa maailmaa. PAATOKSET 43 kohta 8 (haara
`kaupungit-piiloon`, `js/pallolauta/lauta.js` `pelinKaupunkirajaus`)
piilottaa pelinäkymässä kohdemaan ULKOPUOLISET kaupungit, kun
siirtovaihe ei ole päällä. Savukkeen vartio 1 napautti Pariisia ILMAN
noppaa (Pariisi on FRA, pelaaja GBR:ssä → piste piilossa, napautus meni
paljaaseen kankaaseen: `"paalla":"CANVAS."`, `auki: null`), ja vartio 2
haki ei-kohdetta kaikista laudan kaupungeista, jolloin ainoat
pisteelliset olivat kohteita tai oma kaupunki
(`hylatyt: ["lontoo:kohde/oma","edinburgh:kohde/oma","pariisi:kohde/oma"]`).
**Peli teki oikein; savuke väitti väärää.**

**Korjaus** (`tools/savukkeet/savuke-kohdevalinta.mjs`). Napautettavat
kaupungit valitaan nyt samasta lähteestä kuin rajaus itse:
`pack.map.cityCountry` → KOHDEMAAN kaupungit (GBR: lontoo, edinburgh,
bermuda, falkland).

* vartio 1 (ilman noppaa): kohdemaan kaupunki, joka ei ole oma —
  Lontoosta **Edinburgh**. Varalla oma kaupunki (aina näkyvissä);
  valinta kirjataan lokiin, jotta vihreästä näkee kumman se mittasi.
* vartio 2 (siirtovaiheessa): kohdemaan kaupunki, joka EI ole heiton
  kohde eikä oma. Silmällä 4 kohteet ovat Edinburgh ja Pariisi, joten
  ehdokkaiksi jäävät Bermuda ja Falkland; valituksi tuli **Bermuda**.
* uusi apuri `valitseNakyva` ajaa kameran ehdokkaan päälle ja lukee
  pisteen laudan OMASTA pistekerroksesta (`pallo.pointsData`) — samasta
  lähteestä kuin peli piirtää. Vanha, kameran laatikkoon sidottu haku
  (54 riviä) poistettiin: se ei enää vastannut mihinkään kysymykseen.

Väite säilyy sanasta sanaan: kohdekaupungin napautus valitsee siirron
(vartiot 4–6), muu kaupunki avaa liuskan (1–3). Savukkeen
alkukommentissa on viittaus PAATOKSET 43 kohtaan 8 (TARKENNUS 10
kohta 21: savuke päivitetään samassa erässä).

**Tulos.** 14/14 molemmilla ruuduilla, 109 s. Siirto alkoi 84 ms:ssä
(390 px), liuskarivejä 0, ei liuskan kamera-ajoa.

## 2. savuke-topografialinssi — PÄÄTÖS: Ohita saa jäädä

`"linssin aikana kartan päällä ei ole yhtään jäännettä"` löysi
`button.fokusvirta-isokuva-ohita.fokusvirta-ohitanappi.nakyy` (3 013 px²).

**Päätös ja perustelu.** PAATOKSET 43 kohta 10 (omistaja sanatarkasti:
*"Ohita nappi ei saisi havita vaikka pelaaja painaa jostain muualta
ennen kuin kumpikin luenta on loppu."*) teki Ohitasta oman kelluvan
napin, jonka elinkaari on LUENNAN elinkaari: se poistuu vasta, kun
molemmat luennat ovat päättyneet, Ohitaa on painettu tai kaupungista
lähdetään. Jos topografialinssin avaus söisi sen, savuke vartioisi
juuri sitä käytöstä, jonka omistaja kielsi. **Ohita lisättiin
`SALLITUT_PESAT`-listaan** perusteluineen: se ei ole kartan kaluste
vaan luennan ohjain, ja sillä on oma vartionsa
`savuke-luentakuvat.mjs`:ssä (77/77 v1947:ssä). Väite *"linssin omat
kerrokset peittävät kartan"* pysyy muuten sanasta sanaan ennallaan.

**Kolme muuta punaista** (`omistajan tila toistui — luenta false`,
välähdys, 600 s aikakatto) ovat samasta ketjusta, ja `VAIHE=avaus`
**yksin ajettuna toistaa ne bitilleen** — kyse EI ole kuormasta:

```
FAIL  390 px, luenta: omistajan tila toistui — luenta false, kuvapakka false
INFO  390 px, luenta: avauksen maksimikirkkaus 171.3, vakiintunut 134.6,
      suurin paluu ylhäältä alas 150.8, seepia ennen linssiä 171.3
```

Luvut ovat samat kuin CI:ssä (171,3 / 134,6 / 150,8), ja
**jäänneluettelo ennen linssiä on sekin sama**. Ketju on:
`luentaSoi` odottaa `diaryVoice`ilta `!paused && currentTime > 0`
90 sekuntia, se ei tule, savuke pakottaa kuvapakkaa viisi kierrosta,
ja koko ajo venyy 600 s:n aikakattoon — ja välähdysmittaus ottaa
silloin vielä kolme näytettä mediaania varten. Avauksen maksimikirkkaus
171,3 on TÄSMÄLLEEN sama kuin *"seepia ennen linssiä"*, eli mitattu
"välähdys" on paljas seepiakartta: peite ei ole paikallaan, koska
mitattava tila (luenta käynnissä, kuvapakka kartalla) ei koskaan
syntynyt. **Välähdysvartio ei siis mittaa linssiä vaan omaa
lähtötilaansa.**

**Juurisyy on sama kuin kohdassa 3 b:** tämä Chromium ei toista ääntä
(astro-aanessa `ctxAika 0`, tässä `diaryVoice.currentTime` ei etene),
ja kaksi savuketta odottaa AIDON ÄÄNEN etenemistä porttinaan. Kohdan 10
muutos (`fokusvirta.js`) ei koske `diaryVoice`a, ja Ohita-nappi oli sen
ainoa jälki jäänneluettelossa. **Ehdotus Fablelle:** `luentaSoi`-portti
luetaan pelin omasta luennan tilasta eikä äänielementin kellosta, tai
savuke ajetaan äänilipuilla (`--autoplay-policy=no-user-gesture-required`,
kuten astro-aani tekee — topografialinssi ei tee). Tämä on oma eränsä
(Kustannuskuri kohta 1 ja 4).

## 3. savuke-astro-aani (15/24) — puhelin oli kuormaa, `taso` on velka

**a) Puhelimen `soi:false, lahde null` OLI kuormahäilyä — korjattu.**
Yksin ajettuna puhelinnäkymä antaa soivan, silmukoidun soittimen:
`{"lahde":{"alkoi":0,"loop":true,"kesto":84,"pysaytetty":false}}`,
ensimmäinen soiva näyte 400 ms:n kohdalla ja vartio 2 (84 s kierrosraja)
vihreä. CI:ssä otos oli kiinteä 200 × 50 ms = 10 s, eikä v1947:n raskaampi
astronautin linssi (pilvikuori + avaruussumu, PAATOKSET 43 kohta 7;
reliefipyramidin laastari, 41 kohta 4) ehtinyt herätä siinä ajassa
raskaan rinnakkaiskuorman alla — savuke **mittasi tyhjää**.

Korjaus: otos päättyy nyt SOITTIMEN mukaan, ei kellon — kun soitin on
soinut 2,5 s (feidi on 2 s) tai 40 s on kulunut. Nopealla koneella
hinta on nolla: otos loppuu samaan ~3 sekuntiin kuin ennen oli sen
alkupää. **Astro-sumu ei siis riko alustusketjua**; sivuvirheitä 0.

**b) `taso 0` on tämän Chromiumin suspended AudioContext — VELKA.**
Sama punainen tulee yksin ajettuna JA molemmilla ruuduilla, ja
vartion 2 loki näyttää syyn suoraan: `"ctxAika":0`. AudioContextin
`currentTime` ei etene, joten ajastettu ramppi ei koskaan ehdi
soveltua ja `gain.value` jää nollaan — vaikka automaatio on tilattu
täsmälleen oikein (`aseta 0 @0` → `ramppi 0,2609 @2`, eli
`nousuSekunteja 2`) ja lähde soi silmukassa 84 s. **Peli on siis
oikeassa; mittari mittaa äänilaitteen puutetta.** Kolme väitettä
nojaa `taso`-lukemaan (nousu, kohteen vaihto, kytkin takaisin päälle).
En muuttanut näitä väitteitä ilman omistajan/Fablen päätöstä
(Kustannuskuri kohta 1); ehdotus: `taso`-alaehto luetaan vain silloin,
kun `ctx.currentTime > 0`, muuten mittana on ajastettu automaatio.
Paikallinen tulos tämän erän korjauksen jälkeen: **9/12 puhelimella**.

## 4. savuke-kerma-reuna V4 — EI kuormahäilyä EIKÄ v1947:n vika

| | CI (rinnan) | paikallinen (yksin, 62 s) |
| --- | --- | --- |
| työpöytä | Kanaali 224,216,194 vs Pohjanmeri 230,222,199 → **6** | **täsmälleen sama: 6** |
| puhelin | 223,215,193 vs 230,222,198 → **7** | **täsmälleen sama: 7** |

Mittaus on deterministinen, ei kuormasta riippuva: **mediaani ei
auttaisi eikä olisi rehellinen**. Muut kerman vartiot (V1 reunan kahta
puolta, V2 leveä pari, V5 Ranskan reliefi, V6 pisteiden puoli) ovat
vihreitä, eli kerma maalataan yhä maamaskilla ilman laatikon reunaa;
poikkeama on vain merten KESKINÄINEN sävyero — noin 2,4 %, samaan
suuntaan kaikilla kanavilla, eli kertoimen kokoinen.

Lähdelukemisen perusteella kumpikaan epäilty v1947:n muutos ei koske
pelinäkymän pohjakarttaa: `maalaaAstronautinValoliuku` on portitettu
`kerrokset.astronautti`-lipulla (js/pallolaatat.js ~2385) ja
`reliefinVaraLahde` / `reliefinTaustavari` ajetaan vain reliefitasolle
(`k.reliefi`, ~2136).

**VERTAILUAJO RATKAISI SEN (63 s).** Savukkeen oma `--vanha` tarjoilee
`origin/main`-version `js/pallolaatat.js`:stä ja
`js/laattapyramidi.js`:stä eli v1947:ää EDELTÄVÄN kerman ja laattojen
maalauksen. Tulos on **bitilleen sama**:

| | v1947 | `--vanha` (origin/main) |
| --- | --- | --- |
| työpöytä | 224,216,194 vs 230,222,199 → 6 | **224,216,194 vs 230,222,199 → 6** |
| puhelin | 223,215,193 vs 230,222,198 → 7 | **223,215,193 vs 230,222,198 → 7** |

**V4 ei siis ole v1947:n aiheuttama eikä reliefi-merten tai astro-yön
sivuvaikutus.** Peli ei muuttunut. Ero on Kanaalin ja Pohjanmeren
välinen, ja pisteet ovat eri leveysasteilla (49,9° ja 53,2°), joten
pallon suunnattu valo tekee niihin juuri tämän kokoisen kertoimen.
Mittausraja 5 on tälle parille liian tiukka. Koska raja on omistajan
päätöksen (PAATOKSET 37 TARKENNUS) mittari enkä muuta väitettä ilman
Fablen päätöstä (Kustannuskuri kohta 1), **ehdotus Fablelle**: joko
raja 8 tälle parille perusteluineen, tai mittauspari samalle
leveysasteelle (esim. Kanaali 49,9° / Biskaja 49,9° suojan
ulkopuolelta), jolloin väite mittaa kermaa eikä valoa.

## 5. Kertaluonteiset tarkistukset

**a) pallo-nostolaput 6–7: EI kuormahäilyä.** Yksin ajettuna 4/6, sama
napautus ohi kuin CI:ssä: Bukarestin näkymässä *"Sighișoara"*
(poltettu) → `avautui ei mitään — sormi 89,125 · ei kylttiä`, sekä
suora napautus että sormen poikkeama. Sama lappu Transilvanian
näkymässä avautuu oikein. Mikään ei vienyt napautusta (ei dialogia, ei
viuhkaa, ei turistikylttiä). **Vahva johtolanka:** PAATOKSET 43 kohta 8
vie rajauksen myös NIMILADONTAAN (`js/pallolauta/lauta.js` ~4029,
`const vain = niukka ?? pelinKaupunkirajaus()`), joten kohdemaan
ulkopuolisten kaupunkien nimet eivät enää osallistu törmäystestiin —
nostolappujen sijoittelu ja siten niiden osumapinta muuttuu juuri
kaupunkinäkymässä. Tämä on oma eränsä (Kustannuskuri kohta 1 ja 4).
Huom: savukkeen vanha tunnettu punainen (*"yksikään kaupunkinimi ei
leikkaa liikkumatonta mustetta"*) oli tässä ajossa **vihreä**.

**b) kaupunkipopup-390: sama juurisyy kuin kohdassa 1.** Paikallisesti
yksin ajettuna Pariisin liuska ei aukea lainkaan (`rivejä 0`), joten
kuusi punaista ovat ketjussa yhden asian takana: savuke napauttaa
Pariisia, joka on PAATOKSET 43 kohta 8:n mukaan piilossa, kun pelaaja
on muussa maassa eikä siirtovaihe ole päällä. **Savuke on korjattava
samalla reseptillä kuin kohdevalinta** (napauta kohdemaan kaupunkia tai
aseta pelaaja Ranskaan) — oma eränsä, ei ehtinyt tähän aikakattoon.

**c) pariisi-lahizoom 8c (20 666 ms):** ajo jäi tämän erän aikakaton
ulkopuolelle. Odotusarvo on kuormahäily (kamerakello); jatko: aja
`SAVUKE_RUUTU=390 SAVUKE_LOHKOT=liuska` yksin.

---

## Portit ennen committia

* `node --test tests/*.test.mjs` → **# pass 3644, # fail 0** (skipped 13, 3 657 väitettä, 78 s)
* `node tools/tarkista-niputus.mjs` → niputus kunnossa, 398 moduulia, ei törmäyksiä
* `node tools/build-standalone.mjs` → dist/matkakirja.html 32 784 kt

Versionumeroa ei nostettu. Muutetut tiedostot:
`tools/savukkeet/savuke-kohdevalinta.mjs`,
`tools/savukkeet/savuke-topografialinssi.mjs`,
`tools/savukkeet/savuke-astro-aani.mjs`, tämä raportti.
Peliin (js/) **ei koskettu** — kaikki kolme punaista, joissa vika oli
mittarissa, korjattiin savukkeeseen; kolme jäljelle jäänyttä velkaa
(3 b, 4, 5 a–c) on kirjattu Fablelle päätettäväksi.
