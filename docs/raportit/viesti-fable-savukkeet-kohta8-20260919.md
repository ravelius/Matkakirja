# Kaksi savuketta vihreiksi — ja PAATOKSET 43 kohta 8 EI ollut kummankaan syy

Opus-erä 19.9.2026, haara `claude/bold-ride-vow4ki-savukkeet-kohta8`
(pohja `claude/bold-ride-vow4ki-v1947`, commit 06c4940b). Versiota ei
nostettu, PR:ää ei avattu. Peliin (`js/`) EI koskettu.

Tehtävä oli kaksi deterministisesti punaista savuketta ajosta
35394384489, ja tehtävänannon (ja edellisen raportin) johtolanka oli
molemmissa **PAATOKSET 43 kohta 8** (muiden maiden kaupungit piiloon).
**Mitattu tulos: kohta 8 ei ole kummankaan syy.** Molemmissa vika oli
savukkeessa, ja molemmissa se oli SAMA vika: sormi painoi kohtaa, jonka
päällä oli pelin oma kaluste, eikä napautus tullut pallon pinnalle asti.

| Savuke | Ennen | Jälkeen | Kesto | Syy |
| --- | --- | --- | --- | --- |
| `savuke-pallo-nostolaput.mjs` | 4/6 | **6/6** | 47 s | päiväkirjakortti Sighișoaran lapun päällä |
| `savuke-kaupunkipopup.mjs#390` | 21/27 | **42/45** | 232 s | auki jäänyt näkymä / kaluste rivin päällä |

Ympäristö: Mac Studio, node 22, Chromium 1234, `PLAYWRIGHT_JS`
worktreen `node_modules`ista. Savukkeet ajettiin peräkkäin, eivät
rinnan; rinnalla kulki omistajan CI-ajo (kohtalainen kuorma).
Kumpikin savuke nostaa oman palvelimensa vapaaseen porttiin
(`palvelin.listen(0)`), joten porttivarausta 8843–8844 ei tarvittu.

---

## 1. savuke-pallo-nostolaput (4/6 → 6/6)

### Mitä mitattiin

Vartiot 6–7 kaatuivat aina samaan napautukseen: Bukarestin näkymässä
*"Sighișoara"* (poltettu muste) ei avannut mitään, vaikka sama lappu
Transilvanian näkymässä avautui. Savukkeeseen lisättiin kolme
mittaria — päällimmäinen elementti napautuspisteessä, `viimeinenNapautus`
ja laudan oma `napautusselitys` — ja ne kertoivat syyn yhdellä rivillä:

```
napautus Bukarest (poltettu): "Sighișoara" → avautui ei mitään —
  sormi 89,125 · päällimmäisenä P.fact-text ·
  pinnalle tullut napautus 45.417,24.914 (3206 ms sitten) ·
  sääntö antaisi nosto:nosto:bran
```

`pinnalle tullut napautus` oli EDELLISEN napautuksen (Branin linna)
asteet — eli Sighișoaran napautus ei koskaan tullut pallolle.
Päällimmäisenä oli `P.fact-text`, eli **päiväkirjakortti**
(`.fact-card`, index.html; paikka js/kartta.js `placeFactCard`).

### Juurisyy

Päiväkirjakortti asettuu sille kartan nurkalle, jossa on eniten merta,
ja se **täyttyy juuri avatun noston tekstillä**. Bukarestin näkymässä
nurkka on vasen yläkulma — täsmälleen siellä, missä Sighișoaran
nimilappu on (laatikko 49,119 → 98,130). Este syntyy siis VASTA
edellisestä napautuksesta: kun Branin linna avattiin, päiväkirja
täyttyi ja peitti Sighișoaran.

**Peli on oikeassa.** Oikea pelaajan sormi osuisi samasta pisteestä
päiväkirjaan eikä karttaan. Vartiot 6–7 väittävät, että lapun TEKSTI
ottaa napautuksen — ne eivät väitä mitään kalusteen alta.

Kolme muuta selitystä suljettiin pois mittaamalla:

* **Ei kohta 8.** Sighișoara on Romaniassa eli kohdemaassa, ja sen
  lappu oli koko ajan `osumaLaatikot()`-listalla oikeassa paikassa —
  ladonta ei siirtänyt sitä minnekään. Nimiladonnan `vain`-portti ei
  siis piilottanut mitään kohdemaan sisältä.
* **Ei vanha asema.** `nostot.osumaLaatikot()` laskee laatikon
  TUOREESTA ruutupisteestä (`ruudulla(o.lat, o.lng)`), ei ladonnan
  muistista, joten savuke ei lukenut vanhaa asemaa.
* **Ei auki jäänyt kortti.** Korttien sulku ja poisto ajettiin
  silmukassa kahden sekunnin ajan; `P.fact-text` ei ole kortti vaan
  pysyvä kaluste, eikä se väistynyt — juuri niin kuin pitääkin.

### Korjaus (vain savuke)

1. Ennen jokaista napautusta odotetaan, että napautuspisteen
   päällimmäisenä on pallon oma kangas. Jos ei ole kahdessa
   sekunnissa, **napautusta ei tehdä eikä lasketa** — se kirjataan
   INFO-rivillä esteen nimen kanssa.
2. Otoksen valinta tarkistaa saman asian jo valintahetkellä
   (`ulottuvilla`), ja kalusteen alle jäävä ehdokas ohitetaan, jolloin
   haku jatkuu seuraavaan lappuun. (Bukarestissa tämä ei vielä auta,
   koska este syntyy vasta ensimmäisestä napautuksesta — siksi
   tarkistus on molemmissa päissä.)
3. Diagnostiikka jää savukkeeseen: päällimmäinen elementti,
   `viimeinenNapautus` ja `napautusselitys` jokaisella tyhjällä
   napautuksella. Seuraavan lukijan ei tarvitse arvata.
4. `.kaupunkipopup` lisättiin suljettavien korttien luetteloon (se oli
   laudan `KORTTIVALITSIN`issa mutta puuttui savukkeen listasta).

### Tulos

**6/6, 47 s.** Otos: Bukarestista 1 lappu × 2 napautusta (Branin
linna), Transilvaniasta 3 lappua × 2 (Bran, Peleș, Sighișoara) —
napautuksia 4, joista vanhan säännön ulottumattomissa 2, poltettua
mustetta 4. Väitteet säilyivät sanasta sanaan.

---

## 2. savuke-kaupunkipopup #390 (21/27 → 42/45)

### Mitä mitattiin

Raportin `viesti-fable-savukkeet-v1947-20260919.md` kohta 5 b arveli,
että Pariisin liuska ei aukea lainkaan, koska Fogg ei ole Ranskassa.
**Se ei pidä paikkaansa:** savukkeen tallenne asettaa Foggin siihen
kaupunkiin, jota mitataan (`start: kaupunki.id`), ja ajon 35394384489
lokissa liuska aukesi ja kymmenen ensimmäistä vartiota olivat vihreitä.
Punaiseksi meni vasta vartio 11 — *"Nähtävyydet-rivi avaa
nähtävyysnäkymän — null"* — ja siitä ketjussa neljä kokoruutuvartiota,
koska ne kaikki lukevat samaa avautumatonta arkkia.

Erillinen koeajo (sama tallenne, sama ruutu, suora kulku kaupungin
napautuksesta Nähtävyydet-riville) avasi näkymän ensimmäisellä
yrityksellä. Ero ei siis ole rivissä eikä pelissä vaan siinä, mitä
ruudulla oli EDELLISEN vartion jäljiltä.

### Korjaus (vain savuke)

`napautaRivi` tekee nyt kolme asiaa ennen jokaista yritystä:

1. sulkee auki jääneen `#tiivis-lehtiarkki`-näkymän (edellisen rivin
   näkymä on dialogi kartan päällä ja nielaisee napautuksen),
2. varmistaa liuskan olevan auki ja lukee rivin pisteen tuoreena,
3. odottaa, että napautuspisteen päällimmäisenä on kangas, ja kirjaa
   esteen, jos se ei väisty.

Epäonnistuneesta yrityksestä kirjataan `napautusselitys`,
`viimeinenNapautus`, liuskan tila ja arkin luokat.

### Tulos

**42/45, 232 s.** Koko Pariisin ketju on vihreä (Nähtävyydet-näkymä,
kokoruutu, +/− 0, sulku, nipistys, panorointi, kohteen napautus).
Vartioiden määrä nousi 27:stä 45:een, koska ketju ei enää katkea
alkuunsa. Punaisiksi jäivät **tasan ne kolme, jotka ovat
sarjat.jsonissa tunnettuja** (`tunnetutPunaisetMaara: 3`):

* `Marseille @ 390 px: kaupunkimerkin napautus avaa liuskan eikä isoa pop-upia`
* `Marseille @ 390 px: liuskan yläryhmä on 3 riviä`
* `vastakoe 1: kuvaton kaupunki avaa pop-upin silti`

---

## 3. sarjat.json — mitä muutettiin ja mitä EI

Sääntö on kaksi peräkkäistä vihreää.

* **`savuke-pallo-nostolaput.mjs`: tunnettu punainen POISTETTU.**
  *"yksikään kaupunkinimi ei leikkaa liikkumatonta mustetta"* oli
  vihreä sekä v1947-raportin paikallisessa yksinajossa (kohta 5 a)
  että tässä ajossa → kaksi peräkkäistä vihreää. Vartiot 6–7 eivät
  olleet listalla (ne olivat uusia punaisia), joten niistä ei ole
  mitään poistettavaa; huomautukseen on kirjattu, mitä niille tehtiin.
* **`savuke-kaupunkipopup.mjs#390`: lukumäärä 3 ENNALLAAN.**
  Marseillen kaksi punaista olivat ajossa 35394384489 vihreitä ja
  tässä ajossa taas punaisia — häilyviä, eivät kahta peräkkäistä
  vihreää. `vastakoe 1` oli punainen molemmissa. Kolme on siis
  edelleen oikea luku; huomautukseen lisättiin tämän ajon mittaus.
* **`savuke-kaupunkipopup.mjs#1400`: lukumäärä 2 ENNALLAAN, ei ajettu.**
  Ajon 35394384489 työpöytärivi oli jo **36/38** ja sen kaksi punaista
  olivat samat Marseillen vartiot — Pariisin ketju ei ollut siellä
  punainen lainkaan. Riviä ei siis ollut mitään korjattavaa, eikä
  tehtävänannon aikakatto riittänyt ylimääräiseen 4 minuutin ajoon.
  Korjaus on samassa koodissa, joten se koskee myös tätä riviä.

---

## 4. FABLELLE (en korjannut, Kustannuskuri kohta 1)

1. **Päiväkirjakortti peittää kartan nostoja.** Tämä ei ole savukkeen
   asia vaan pelaajan: Bukarestin lähikuvassa `.fact-card` makaa
   Sighișoaran nimilapun päällä, eikä lappua voi napauttaa ennen kuin
   karttaa siirtää. `placeFactCard` valitsee merisimmän nurkan, mutta
   se ei tiedä, missä nostojen laput ovat. Jos tämä halutaan pois,
   ratkaisu on oma eränsä: kortin nurkkavalintaan mukaan nostojen ja
   nimien varaukset (`nostot.osumaLaatikot()`), tai kortti kutistetuksi
   silloin kun kartalla on lappuja sen alla.
2. **Edellisen raportin kohta 5 b oli väärässä.** kaupunkipopup-390:n
   kuusi punaista EIVÄT olleet kohta 8:n seurausta; liuska aukeaa
   Pariisissa normaalisti. Kirjaan tämän, koska sama arvaus on
   sarjat.jsonin ja raporttien ketjussa.
3. **`vastakoe 1` (kuvaton kaupunki avaa pop-upin silti) on yhä
   punainen** ja oli sitä myös 18.9. Se on tunnettu punainen eikä
   kuulunut tähän erään; oireet ovat samat kuin korjatuissa
   (napautuksen jälkeen `kortteja 0`), joten sama resepti — este ja
   `napautusselitys` lokiin — todennäköisesti ratkaisee senkin.

---

## Portit ennen committia

* `node --test tests/*.test.mjs` → **# pass 3644, # fail 0**
  (3657 väitettä, skipped 13, 78 s)
* `node tools/tarkista-savukkeet.mjs` → savukkeet kunnossa
  (2152 ui-viittausta, 413 metodia, 546 kenttää)
* `node tools/build-standalone.mjs` EI ajettu: `js/` ei muuttunut.

Muutetut tiedostot: `tools/savukkeet/savuke-pallo-nostolaput.mjs`,
`tools/savukkeet/savuke-kaupunkipopup.mjs`,
`tools/savukkeet/sarjat.json`, tämä raportti.
