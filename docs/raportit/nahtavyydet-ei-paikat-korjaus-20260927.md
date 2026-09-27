# Nähtävyyskartan ei-paikat: löydös 178:n jälkeinen vuoto — 42 korjattu

Omistajan löydös 12.5x (27.9.2026, Fablen välittämänä): nähtävyyksissä ei
saa olla ei-paikka-kuvia (tapahtumat, henkilöt, esineet, ruoka, ilmiöt) —
esimerkkinä kontaktiarkin (PR #3398) Pariisi: bastilji-1789, curie-1898,
lavoisier-1780, lumière-1895, kyyhkyposti, paras-patonki, "soi",
vrain-lucas, 72-nimeä, torni-romuraudaksi, kirahvin-kävelymatka,
impressionistit, carmenin-ensi-ilta.

## 1. Juurisyy: puuttuva tyyppi, ei suodatinvika

Löydös 178 (v2285/#3353, v2288/#3355, 26.9.2026) rakensi mekanismin oikein:
`kohteenTyyppi`/`kohdeKartalla`/`kaupunginTarinakohteet`
(js/packs/maakartat.js) suodattavat ei-paikat (tyyppi taide/esine/henkilo/
ilmio) kartalta kaupungin nostoihin. **Mekanismi toimii — ongelma on, että
sitä ei ole vielä sovellettu kaikkiin kohteisiin.** Tarkistin (kohta 2):

- Aiemman luokitteluraportin (docs/raportit/nahtavyydet-ei-rakennukset-
  20260926.md, 250 ei-rakennusta) 81 aidosti ei-paikkaa (pois lukien AUKIO
  ja LUONTO, jotka omistajan mukaan OVAT paikkoja ja jäävät) olivat jo
  **79/81 sovellettuna** (70 tyyppi+nosto, 9 poistettu kokonaan datasta
  "galleriaksi" -erässä). Vain 2 pientä jäi (Odessa/Privozin tori, Shanghai/
  Bund) — molemmat on jo luokiteltu 'aukio'-tyyppiin (perusteltu: tori/
  promenadi ovat oikeasti paikkoja), ei siis vika.
- **Owner'in esimerkit (Pariisi) EIVÄT olleet tässä 81:n listassa lainkaan**
  — alkuperäinen sanavihjeluokitin ei tunnistanut niitä ei-rakennuksiksi,
  koska niiden nimissä ei ole ilmeisiä vihjesanoja (patsas/maalaus/laiva).
  Ne ovat silti selvästi tapahtumia/henkilöitä/esineitä sisältönsä
  perusteella (nostoteksti jo olemassa jokaiselle).

## 2. Koneellinen audit: 130 kohdetta joilla nosto MUTTA yhä kartalla

Kaikista 1577 kohteesta 130:lla on jo `nosto`-kenttä (eli tarinasisältö on
KIRJOITETTU) mutta `tyyppi` on silti oletusarvo 'rakennus' — osa näistä on
AIDOSTI rakennuksia/paikkoja joilla on bonus-syvennys (esim. Colosseum,
Louvre — nosto on ylimääräinen lisätarina, ei korvaa paikkaa), osa on
ei-paikkoja jotka jäivät vaille tyyppi-korjausta. Kävin läpi kaikki 130
kohdetta (nimi + nostotekstin alku, ks. liite) yksitellen.

**Varma signaali:** `hetki-`-alkuiset nostot (23 kpl) ovat AINA tapahtumia
— 20/23 oli jo oikein poissa kartalta, 3 vuoti (Konstantinopoli 1453,
Torni 1888, Muuri 1961). `syvennys-`/`skandaali-`/`nosto-`-alkuiset nostot
ovat SEKAKÄYTÖSSÄ (sekä paikkojen bonussyvennyksiä että ei-paikkojen ainoaa
sisältöä) — näille ei ole mekaanista sääntöä, vaan jokainen luettiin läpi.

## 3. Korjattu: 42 kohdetta, 17 kaupunkia

| Kaupunki | Määrä | Kohteet (uusi tyyppi) |
|---|---|---|
| pariisi | 7 | Torni romuraudaksi, Torni 1888, 72 nimeä, Notre-Damen kukko, Pariisi soi, Paras patonki, Pariisin vuosisadat (henkilo/esine/ilmio) |
| berliini | 6 | Lehmän hinnalla, Berliinin karhu, Muuri 1961, Gaertnerin Berliini, Marlene Dietrich, Paavin kosto |
| wien | 5 | Klimtin maalaukset, Saliera, Lipizzanit, Taikahuilu, Vuoristovesijohto |
| madrid | 4 | Tasavallan vuosi, Chotis, Kaksi joukkuetta, Palamaton linna |
| rooma | 3 | Banca Romana, Areenan kellari, Aqua Virgo |
| sofia | 3 | Levski, Ruhtinaskaappaus, Vihellyskonsertti |
| dublin | 2 | Kellsin kirja, Ouzel Galley |
| tukholma | 2 | Setelipankki, Naamiaislaukaus |
| venetsia | 2 | Markuksen hevoset, Aldon paino |
| istanbul, lissabon, praha, lontoo, tallinna, bukarest, oslo, vilna | 1 kukin | Konstantinopoli 1453, Calçada, Tycho Brahe, Cheapsiden kätkö, E-valtio, Kultakana, Huudon varkaus, Kirjankantajat |

Kaikki 42 pysyivät kaupungin nostoissa (nosto-kenttä oli jo olemassa
jokaisella) — vain `tyyppi` muuttui, joten mitään sisältöä ei kadonnut,
vain kartan kaksoisesitys (piste + nosto) poistui.

**Wien/Taikahuilu ja Wien/Vuoristovesijohto** ovat kaksi seitsemästä
"maalattu tausta" -kuvasta jotka lähetin Codexille eilen (posti/
sisaltokirjuri-kuvaputki-7-maalattua-taustaa-20260927.md) — nyt myös
kartalta pois oikein, riippumatta kuvakorjauksesta.

## 4. Vartija ja testit

`tests/nahtavyystyypit.test.mjs` läpäisee (mukaan lukien "≥1 kohde per
kaupunki" -vartija, ei yksikään kaupunki jäänyt tyhjäksi) ja koko
`node --test tests/*.test.mjs` on vihreä.

## 5. Ei korjattu — jätetty ennalleen (matala/keskisuuri varmuus)

Näissä nosto on olemassa mutta jätin tyypin rakennukseksi, koska kyseessä
on todennäköisesti aito fyysinen rakenne (portti, porras, torni) eikä
pelkkä tarina — omistaja/Fable voi tarkentaa jos näistä joku pitäisi
kuitenkin siirtää:

- dublin/St James's Gate (panimon portti — fyysinen rakenne)
- istanbul/Camondon portaat (oikea porras, fyysinen paikka)
- berliini/Hobrechtin putket (viemäri-infrastruktuuri, epäselvä onko "paikka")
- kobenhavn/Tivolin portti (puiston sisäänkäynti, fyysinen rakenne)
- lissabon/Largo da Severa (nimessä "Largo" = aukio, oikea paikka)
- venetsia/Berliinin Maailmankello ei ollut listalla — em. jäi
  epäselväksi datavirheeksi (samat koordinaatit kuin Hobrechtin putket),
  ei muutettu

## 6. Ei koodivikaa — Pelikoodarille ei tarvetta

Kohta 2:n mekanismi (löydös 178) toimii oikein: kun tyyppi on asetettu
oikein JA nosto on olemassa, kohde katoaa kartalta ja ilmestyy kaupungin
nostoihin automaattisesti (myös natiivin sisältöpaketin vientiin,
tools/vienti/karttavalot.mjs ja elava-kartta.mjs lukevat samaa
kohde.tyyppi-kenttää). Tämä oli puhtaasti dataongelma.

## 7. Laajempi jäljellä oleva työ

1577 kohteesta olen nyt käynyt läpi 81 (alkuperäinen raportti) + 130
(nosto+kartalla-audit) = 211 kohdetta yksityiskohtaisesti. Loput ~1366
kohdetta (joilla ei ole nostoa) ovat todennäköisesti aidosti rakennuksia
(oletusarvo), mutta niitä EI ole erikseen käyty läpi rivi riviltä — jos
omistaja haluaa täyden varmuuden koko 1577 kohteen joukosta, seuraava erä
voisi käydä läpi nimet joilla ei ole nostoa mutta jotka voisivat silti olla
ei-paikkoja (ei vielä tarinasisältöä kirjoitettu). Tämä on iso lisätyö
(uuden tarinasisällön kirjoittaminen jokaiselle), joten ehdotan omaa erää.
