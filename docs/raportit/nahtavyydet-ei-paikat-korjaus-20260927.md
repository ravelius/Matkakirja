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

## 7. Laajempi tarkistus: koko loppuaineisto käyty läpi (27.9. myöhemmin samana päivänä)

Omistajan sääntö koskee koko aineistoa, joten loput 1376 kohdetta (joilla
ei ole `nosto`-kenttää — kohta 7:n aiempi arvio 1366 tarkentui 1376:ksi
tarkassa laskennassa) käytiin läpi kymmenen Sonnet-agentin parvella,
~140 kohteen erissä. Menetelmä: nimi + pelin oma kuvausteksti
ensisijaisena päätösperusteena; R2-miniatyyrikuva
(`https://media.matkakirja.app/kohtaamiset/miniatyyrit/<tunnus>.png`)
tarkistettaisiin vain aidosti epäselvissä tapauksissa — yhtään
kuvahakua ei koko 1376 kohteen sarjassa tarvittu, koska nimi/teksti
riitti joka kerta.

**Tulos: 4 ei-paikkaehdokasta 1376:sta.**

| Kaupunki | Kohde | Ehdotettu tyyppi | Peruste | Varmuus |
|---|---|---|---|---|
| irkutsk | Jäänmurtaja Angara | esine | nimetty yksittäinen jäänmurtaja-alus | keski |
| santacruz | Avión Pirata | esine | puistossa seisova yksittäinen lentokone | korkea |
| vladivostok | Sukellusvene S-56 | esine | museosukellusvene kuivalla maalla | korkea |
| whitehorse | SS Klondike | esine | museoksi säilötty siipiratasalus | korkea |

**Omistajan päätös (Fablen välittämänä 27.9.): nämä neljä ovat kiinteällä
paikalla olevia museoaluksia/-koneita, joissa voi käydä — ne PYSYVÄT
PAIKKOINA nähtävyyksinä. Ei tyyppimuutosta, ei uutta tarinasisältöä.**

Rajatapaukset jotka agentit harkitsivat mutta pitivät PAIKKANA sääntöjen
mukaisesti (ei vaadi toimenpiteitä, mainittu avoimuuden vuoksi): isot
muistomerkit/patsaat/obeliskit, mausoleumit ja hauta-alueet, henkilön
nimeä kantavat RAKENNUKSET (esim. Tippu Tipin talo — kohde on talo, ei
henkilö), sekä paikat joiden tekstissä korostuu tunnelma/tapa mutta jotka
ovat silti fyysinen rakennus tietyssä paikassa (esim. Café Hafa).

**Miksi näin vähän verrattuna kohdan 3 42/130-erään:** kohdan 3 joukko
oli nimenomaan kohteet joilla JO oli kirjoitettu tarinasisältö (nosto) —
sisältötiimi oli siis jo tietoisesti päättänyt niistä tarinapalan, mutta
unohtanut päivittää tyyppi-kentän. Tämä 1376 kohteen joukko on vielä
kirjoittamaton aineisto, joka osoittautui lähtökohtaisesti olevan lähes
puhtaasti oikeita rakennuksia/paikkoja jo nimeämisvaiheessa.

**Kattavuus: koko 1587 kohteen KAUPUNKIKARTAT-aineisto on nyt käyty läpi**
(211 aiemmin yksityiskohtaisesti + 1376 agenttiparvella = kaikki).
Työtiedostot (10 erä-JSON:ia + koontiraportti) olivat tilapäisessä
kansiossa `/Users/Shared/Claude/wt/sisaltokirjuri-nahtavyys-luokittelu-erat/`
tämän raportin kirjoitushetkellä — poistettu tämän PR:n pushauksen jälkeen.
