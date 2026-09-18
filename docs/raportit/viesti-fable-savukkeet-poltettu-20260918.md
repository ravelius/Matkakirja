# Savukkeiden väitteet poltettuun maailmaan (18.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-savukkeet-poltettu`
(pohja `claude/bold-ride-vow4ki-v1945`, 4570b8a5).
VAIN `tools/savukkeet/` muuttui — pelin koodiin ei koskettu, versiota ei
nostettu, buildia ei ajettu, PR:ää ei avattu.

Tausta: PR #2588:n Savukkeet-ajossa (run 35372495949) tuli neljä uutta
punaista, jotka kaikki mittasivat VANHAA maailmaa. Poltto ajaa nyt
merkkiportin kohdemaan säännöllä
(`docs/raportit/viesti-fable-poltto-kohdemaa-20260918.md`, ämpärin
luettelo `2026-09-18c-maittain`), ja Raamattu AGENTIT TARKENNUS 10
kohta 21 sanoo, että savuke päivitetään samassa erässä kuin käytös
muuttuu.

## 0. Mitattu juurisyy (yksi mittaus, joka selittää kaikki neljä)

Ennen korjauksia ajettiin luotain, joka luettelee DOMin elävät
`.pallolauta-nosto`-merkit. Tulos (Chromium, dpr 2, ämpärin oma
luettelo `2026-09-18c-maittain`):

**Ranska, Fogg Pariisissa, 390 × 844** — zoomit 1 / 0,85 / 0,7 / 0,6 / 0,35:

| zoomin osuus | eläviä merkkejä | mitkä |
|---|---|---|
| 1,00 | 5 | vain `nakyva-kaupunki-*` (Toulouse, Bordeaux, Lyon, Nantes, Lille) |
| 0,85 | 4 | vain kaupunkipisteitä |
| 0,70 | 2 | vain kaupunkipisteitä |
| 0,60 | 1 | vain kaupunkipisteitä |
| 0,35 | **0** | — |

**Ranska, 1400 × 900** — samat zoomit: kaupunkipisteitä 7/7/6/6/3 ja
niiden LISÄKSI naapurien eläintäkyjä (`elaintaky-CHE/DEU/AUT/ITA/CZE/HRV`,
mitta 0,7727) saapumisnäkymässä. Sisimmällä mitatulla zoomilla (0,35)
vain kolme kaupunkipistettä.

**Romania, Fogg Bukarestissa, 390 × 844**, savukkeen omat näkymät
(Bukarest ja Transilvania, korkeudet 0,05 ja 0,12):

| näkymä | nimiä | lappuja | kiinteää mustetta | `.pallolauta-nosto-siirto` |
|---|---|---|---|---|
| Bukarest 0,05 | 1 | 0 | 4 | **0** |
| Bukarest 0,12 | 1 | 0 | 10 | **0** |
| Transilvania 0,05 | 1 | 0 | 8 | **0** |
| Transilvania 0,12 | 1 | 0 | 13 | **0** |

Kaksi seurausta, jotka selittävät kaikki neljä punaista:

1. **Ranskan kartalla ELÄVIÄ merkkejä ovat enää kaupunkipisteet.**
   Kaikki kaupungin ulkopuoliset nostot palavat, ja kaupungin sisäiset
   ovat kaupunkiliuskassa eivätkä piirry kartalle millään zoomilla
   (PAATOKSET 34 kohdat 2–3).
2. **`nosto-maalehti-cinematographe` EI ole poikkeus kartalla.** Se jää
   luettelon ulkopuolelle lukitun ankkurin puutteen takia, mutta sen oma
   paikka on 0,6 km Lyonin pisteestä, joten `onKaupunginSisainen`
   laskee sen Lyonin sisäiseksi ja se menee liuskaan. Kartalla sitä ei
   ole yhdelläkään zoomilla — mitattu, ei päätelty.

## 1. `savuke-nimikyltti.mjs` — vartiot 6b ja 8c

### 6b (oli punainen sekä puhelimella että työpöydällä)

**Mitä mittasi:** `zoomit.at(-1).nostonMitta`, eli sarjan SISIMMÄN
zoomin ensimmäinen EI-KAUPUNKI-noston mitta. Kaksi ehtoa, jotka
poltetussa maailmassa ovat molemmat tyhjiä: sisimmällä zoomilla ei ole
merkkejä lainkaan (390 px), eikä ei-kaupunkinostoja ole millään
zoomilla. Mittaus antoi 0,00 px → punainen mittaamatta kattoa.

**Uusi väite:** sama väite kohdistettuna ELÄVÄÄN merkkiin. Savuke lukee
nyt joka zoomilta SUURIMMAN elävän merkin mitan
(`.pallolauta-nosto-siirto`, kaupunkipiste tai nosto) ja valitsee
sisimmän zoomin, jolla merkkejä ylipäätään on. Katto on sama
kummallekin merkkilajille (`js/fokusnosto-symbolit.js`: *"KATTO ON
MERKIN MITASSA, EI KAMERAN KERTOIMESSA"* — jokainen merkki pysähtyy
täsmälleen 16 px:iin, kukin omalla zoomillaan), joten väite ei muutu.
Ehtoon lisättiin se, mitä vanhan vartion oma kommentti jo sanoi
(*"mitan on oltava TÄSMÄLLEEN katossa"*): ilman sitä pelkkä
saapumisnäkymän 11,5 px läpäisisi vartion mittaamatta kattoa.

### 8c (oli punainen puhelimella)

**Mitä mittasi:** saapumisnäkymän elävän noston nimiön (0,00 px)
vertailu kaupungin nimiöön (11,50 px). Elävää noston nimiötä ei ole.

**Uusi väite:** sama väite, mutta noston nimiö luetaan POLTETTUNA
MUSTEENA silloin kun elävää ei ole. Kaava on sama, jota
`savuke-pariisi-lahizoom.mjs` vartio 8l jo käyttää: kartan oma mitta
`KARTTANIMI_KOOT.kohde` (8,5 px) kertaa kerroksen oma
`nimenKarttakerroin`. Työpöydällä elävä nosto (naapurin eläintäky)
löytyy yhä, ja silloin mitataan se. Väite on entinen: noston nimiö <
kaupungin nimiö (PAATOKSET 25 kohta 3).

## 2. `savuke-pallo-nostolaput.mjs` — vartio 4 (ja vartio 1)

**Mitä mittasi:** vartio 4 luki `.pallolauta-nosto-siirto`-ryhmän
`transitionDuration`-arvon ja vertasi sovittelun `dx/dy`:tä elementin
muunnokseen. Romaniassa (savukkeen oma tallenne, Fogg Bukarestissa) ei
ole yhtään elävää kartan merkkiä, joten `siirtyma` oli `null` (ei
elementtiä luettavaksi) ja `tasmaa` oli tosi TYHJÄSTÄ silmukasta. Väite
meni punaiseksi mittaamatta mitään — ja vihreäksi se olisi mennyt yhtä
tyhjänä.

**Miksi näkymää ei voi kohdistaa:** elävä lappu on nyt vain Ranskassa
(lisäkaupunkien pisteet, `js/packs/nakyvat-kaupungit-fra.js`). Kohdemaa
seuraa PELAAJAA (`js/fokuskohteet.js` `kohteidenNykyinenIso`), ei
kameraa, joten Bukarestin tallenteella Ranskan merkit eivät herää
vaikka kameran siirtäisi sinne. Romanian omat elävät nostot
(`skandaali-strousbergin-rautatieskandaali`, `nosto-dracula`) ovat
Bukarestin sisäisiä eli liuskassa.

**Uusi väite:** vartio 4 on INFO (Raamattu PAATOKSET 34 kohta 17 d ja
AGENTIT TARKENNUS 10 kohta 21, joka hyväksyy poltetun otoksen). Sama
käsittely kuin saman tiedoston vartiolla 5, joka muutettiin INFOksi
18.9.2026. INFO-rivi tulostaa `tasmaa`-arvon ja siirtymän, joten luku ei
katoa näkyvistä, ja vartio palaa vartioksi jos kohdemaahan tulee eläviä
lappuja takaisin. Sovittelun asennon ja 200 ms:n liu'un vartiointi
kuuluu savukkeeseen, joka ajaa RANSKAN tallenteella.

**Vartio 1 (velka, EN korjannut):** *"yksikään nostolappu ei leikkaa
kaupungin nimen laatikkoa"* on nyt tosi ilman lappuja (eläviä lappuja 0
kaikissa neljässä mittauksessa). Väite on yhä oikein eikä sitä muutettu
tässä erässä; lisäsin sen viereen INFO-rivin, joka tulostaa otoksen
koon, jotta tyhjä otos näkyy lukijalle. Sama sääntö poltetulle musteelle
on vartio 2, joka EI ole tyhjä (kiinteää mustetta 4–13 per näkymä).

## 3. `savuke-pariisi-lahizoom.mjs` — vartio 3i2

**Mitä mittasi:** vastakoe käänsi ryhmityksen takaisin päälle
(`?aihemerkit=1`) ja vaati, että aihemerkkejä SYNTYY — ensin kynnyksen
kanssa ilman nimiöitä, sitten `?aihenimiokynnys=0`:lla nimiöiden kanssa.

**Miksi punainen:** ryhmitys tarvitsee ELÄVIÄ jäseniä (se latoo saman
aiheen nostot yhdeksi merkiksi, `js/pallolauta/aihemerkit.js`
`ryhmitaNostot`). Kohdemaan säännöllä poltettuna Ranskan aihemerkkien
jäsenet — Biskajanlahti, Carnac, Chambord ja muut kaupungin ulkopuoliset
— ovat laatassa, joten `?aihemerkit=1` ei voi ryhmittää mitään.
Vastakoe mittasi `aihemerkkejä 0`. Punainen ei kertonut ryhmityksestä
mitään: se kertoi, ettei ryhmitettävää ole.

**Uusi väite:** vastakoe on poistettu, ja jäljelle jäi itse SÄÄNTÖ
(PAATOKSET 34 kohta 17): saapumisnäkymässä aihemerkkejä on 0 eikä
yhtään ryhmän nimiötä ole DOMissa. Mitataan pelin omasta oletustilasta,
ilman lippuja. Sivuhyöty: kolme ylimääräistä ladontaa jää pois molemmilta
perus-riveiltä. Vartioita 3c ja 3g EI muutettu — ne ovat jo INFO
(PAATOKSET 34 jälkeen vanhentuneita) eivätkä ne ole perus-rivillä.

## 4. `savuke-kerma-reuna.mjs`

EI KOSKETTU (Fable korjasi ämpärin luettelon väritasot klo 20.30). Ajettu
kerran vahvistukseksi.

## 5. Tulokset (yksi ajo per savuke, Mac Studio, ämpärin oma luettelo)

| savuke | rivi | tulos | punaiset |
|---|---|---|---|
| `savuke-nimikyltti.mjs` | — | **55/57** | vain `4. puhelin` ja `4. tyopoyta` (tunnettu punainen `sarjat.json` `^4\. `, hajonta 50,30 %) |
| `savuke-pallo-nostolaput.mjs` | — | **6/6** | ei yhtään |
| `savuke-pariisi-lahizoom.mjs` | `390-perus` | **28/28** | ei yhtään |
| `savuke-pariisi-lahizoom.mjs` | `1400-perus` | **28/28** | ei yhtään |
| `savuke-kerma-reuna.mjs` | — | **16/16** | ei yhtään (Fablen ämpärikorjaus vahvistettu) |

Neljä uutta punaista on siis poissa, eikä uusia syntynyt.

Korjattujen vartioiden mitatut luvut:

```
6b  puhelin   elävän merkin nimiö sisimmällä zoomilla, jolla merkkejä on:
              16.00 px (katto 16.00 px), eläviä merkkejä zoomeittain 5/4/2/1/0
6b  tyopoyta  16.00 px (katto 16.00 px), eläviä merkkejä zoomeittain 13/9/7/7/3
8c  puhelin   noston nimiö 8.50 px (POLTETTU MUSTE, kartan kerroin 1.000),
              kaupunki 11.50 px
8c  tyopoyta  noston nimiö 8.50 px (ELÄVÄ MERKKI, naapurin eläintäky),
              kaupunki 11.50 px
4   nostolaput  INFO: tasmaa=true siirtyma=null — eläviä siirtoryhmiä 0
1   nostolaput  OK, INFO-rivi: eläviä lappuja yhteensä 0
3i2 puhelin   aihemerkkejä 0, nimiöllisiä 0, DOM-nimiöitä 0 → OK
3i2 tyopoyta  aihemerkkejä 0, nimiöllisiä 0, DOM-nimiöitä 0 → OK
```

Huomio: `savuke-pallo-nostolaput.mjs`:n tunnettu punainen *"yksikään
kaupunkinimi ei leikkaa liikkumatonta mustetta"* (vartio 2) oli TÄSSÄ
ajossa vihreä, samoin `savuke-pariisi-lahizoom.mjs#1400-perus`:n
Mac-punainen *"8o. tyopoyta: kamera liikkuu <"*. Molemmat ovat häilyviä
kuormassa, ja tämä oli yksinajo — EN poistanut kumpaakaan
`sarjat.json`:sta (sääntö on kaksi peräkkäistä vihreää kuormassa).

Testit ennen committia: `node --test "tests/*.test.mjs"` →
**3641 testiä, pass 3628, fail 0, skipped 13.**

## 6. Viereiset havainnot (EN korjannut)

1. **`savuke-nimikyltti.mjs` vartio 4 on yhä punainen** (tunnettu
   punainen, `sarjat.json` `^4\. `): *"kyltti / maapaneelin teksti sama
   zoomista riippumatta"*, hajonta 50,3 %. Raamattu PAATOKSET 34 kohta
   13 sanoo vartion vanhentuneeksi; se ei kuulunut tähän erään.
2. **Vartio 1 `savuke-pallo-nostolaput.mjs`:ssä on tyhjä** (ks. yllä).
   Jos Fable haluaa väitteen takaisin mitattavaksi, savuke tarvitsee
   Ranskan tallenteen — se on oma eränsä, koska koko savukkeen näkymät
   ja vartiot 6–7 on rakennettu Bukarestin ympärille.
3. **`nosto-maalehti-cinematographe` on kahdesti poissa kartalta:** se ei
   pala (ei lukittua ankkuria) eikä piirry (Lyonin sisäinen). Poltetun
   luettelon *"ainoa velka Ranskassa"* ei siis näy pelaajalle kartalla
   vaan Lyonin liuskassa. Ankkuririvi `js/pallolauta/nostoankkurit.js`
   poistaisi epäselvyyden — Fablen päätettävä.
4. **Naapurien eläintäkyt ovat ainoat elävät ei-kaupunkimerkit Ranskan
   näkymässä** (1400 px, saapuminen: CHE, DEU, AUT, ITA, CZE, HRV).
   Eläintäky on oma kerroksensa (`js/elaintaky.js`) eikä kulje
   kohdekerroksen läpi, joten poltto ei koske siihen. Jos kohdemaan
   sääntö halutaan koskemaan myös eläintäkyä, se on oma päätöksensä.
