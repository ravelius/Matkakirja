# Kaupungin klikkaus avaa tiivistetyn kaupunkietusivun

Opus-työagentti Fablelle 14.9.2026. Haara
`claude/bold-ride-vow4ki-kaupunkietusivu` (pohja `claude/bold-ride-vow4ki`).
Omistajan päätös: Raamattu, osio "Kaupungit", **KARTTAUUDISTUKSEN
PAATOKSET 10** (14.9.2026 klo 11.20 UTC).

## 1. Mitä vanha kaupunkilehden etusivu sisältää (mitattu)

Mittaus: Playwright/Chromium, Pariisi, `?lauta=pallo`, ruudut 390×844 ja
1400×900. Lähteet luettiin DOMista ja jäljitettiin funktioihin.

| Osa vanhalla etusivulla | Elementti | Lähdefunktio |
| --- | --- | --- |
| Herokuvat: iso avauskuvien karuselli + pikkurivi | `.lehti-paakuva`, `.lehti-kuvarivi` | `js/lehti.js` `piirraLehtiKuvat` → `latoLehtiKuvat` (data: kansiosaston `avauskuvat`, `kansikuvat`) |
| **Ennen–nyt -pari** (2 kuvaa pikkurivillä) | `.lehti-kuva-ennen`, `.lehti-kuva-nyt` | sama `latoLehtiKuvat`, haara `pari` (data: kansiosaston `ennenNyt`) |
| Esittelyn leipäteksti (Pariisi: 3 kappaletta) | `.arrival-intro > p` | `js/lehti.js` `latoKaupunginEsittely` → `piirraLeipateksti` (data: `ARTIKKELIT[...].intro`) |
| Kohdekartta numeropisteineen | `.kaupunkikartta`, `.kartta-kehys`, `.maakartta-piste` | `js/nahtavyydet.js` `piirraKaupunkiKartta` (data: `KAUPUNKIKARTAT`) |
| **Matkailuliite** (turisti- ja matkustusopas) | `.matkailijalle` | `js/nahtavyydet.js` `piirraMatkailijalle` (data: kansiosaston `matkailijalle`) |
| **Alaosan navigointi** (sivunvaihto, sisällysvalikko, hampurilainen) | `.tutki-alapalkki`, `.tutki-navi`, `.arrival-liuskat`, lehden hampurilainen | `js/lehti.js` `paivitaTutkiAlapalkki`, `paivitaTutkiNavi`, `avaaSisallysvalikko`, `varmistaLehtiHampurilainen` |
| (kartan pop-upin oma alarivi: ovi kaupunkilehteen) | `.kaupunkipopup-lehti` | `js/kaupunkinosto.js` `latoLehtiOvi` |

Lihavoidut rivit ovat ne, jotka omistaja pyysi pois.

## 2. Mitä tehtiin

Uusi ladonta on **erillinen kopio**, joka lukee samaa dataa samoilla
piirtäjillä eikä kirjoita riviäkään uutta tekstiä:

- `js/kaupunkinosto.js` **loppuun** kaksi uutta exporttia (vanhat
  funktiot rivi riviltä koskemattomina):
  - `latoTiivisEtusivu(ui, sisalto, city)` — herokuvat (`latoLehtiKuvat`,
    `ennenNyt: null`) → kohdekartta (`piirraKaupunkiKartta`) →
    leipäteksti (`latoKaupunginEsittely`), josta näkyy vain ensimmäinen
    kappale → nappi **"Lue loppuun"**.
  - `avaaTiivisKaupunkietusivu(ui, city, { ankkuri })` — sama kortti,
    ankkuri, asemointi ja sulkusopimus kuin vanhalla pop-upilla
    (`avaaKortti`), vain sisällys on eri.
- `js/pallolauta/lauta.js`: kaupungin napautus kutsuu nyt
  `avaaTiivisKaupunkietusivu`a (yksi importtinimi + kaksi kutsua samassa
  haarassa). Turisti-info-merkki ja sen pop-up eivät muuttuneet.
- `css/kaupunkinosto.css`: `.kaupunkipopup-jatka` jakaa täsmälleen
  vanhan alarivin napin säännöt (ei uusia värejä eikä fontteja),
  `.arrival-intro > p[hidden]` ja kartan alamarginaali.

**Miksi ei uutta tiedostoa `js/kaupunkietusivu.js`:** uusi `js/`-moduuli
pitäisi lisätä `sw.js`:n SHELL-listaan (`tests/sw.test.mjs`: "kaikki
js-moduulit ovat SHELLissä"), ja `sw.js` on toisen agentin työn alla —
minua kiellettiin koskemasta siihen. `js/kaupunkinosto.js` on jo
SHELLissä, on saman aiheen moduuli ja tuo jo kaikki tarvittavat
piirtäjät, joten uusi ladonta meni sen loppuun.

**Loput kappaleet ovat DOMissa piilotettuina** (`p.hidden`), eivät
uudelleenladottavia: nappi ei voi siis lado tekstiä toisin, ja kortin
korkeus lasketaan uudestaan (`asemoiKaupunkipopup`) vasta kun pelaaja
pyytää loput. Kortin koko teksti on siksi yhä merkilleen
`ARTIKKELIT[...].intro`.

### Mitä vanhasta etusivusta jäi pois

1. **Ennen–nyt -vertailupari** (Pariisin ja Marseillen datassa pari on;
   kortti ei lue kenttää).
2. **Matkailuliite** — `piirraMatkailijalle`a ei kutsuta. Opas on yhä
   omassa turisti-info-kortissaan (`avaaTuristiInfo`), joka ei muuttunut.
3. **Alaosan navigointi** — ei sivunvaihtoa, sisällysvalikkoa eikä
   hampurilaista, **eikä myöskään pop-upin vanhaa ovea "Kaupunkilehti"**
   (`latoLehtiOvi`), koska se on juuri se alarivi, jonka omistaja nimesi.
   *Fablelle päätettäväksi:* kaupunkilehti avautuu tämän jälkeen enää
   fokusvirrasta ja nipun kuoresta — ei kartalta. Jos omistaja haluaa
   oven takaisin, se on yhden rivin lisäys `latoTiivisEtusivu`hun.
4. Järjestys muuttui omistajan pyynnöstä: leipäteksti tuli kartan
   **jälkeen** (vanhassa etusivussa ja vanhassa pop-upissa se oli ennen
   karttaa).

### Vanha lehti koskematon

```
$ git diff --stat js/lehti.js
(tyhjä)
$ git diff --stat
 css/kaupunkinosto.css              |  21 ++-
 js/kaupunkinosto.js                |  96 +++++++++
 js/pallolauta/lauta.js             |  14 +-
 tools/savukkeet/savuke-kaupunkipopup.mjs | (yksi vartio käännettiin, ks. alla)
```

`js/lehti.js`, `js/packs/kulttuuri-kategoriat.js` ja
`js/sisaltotaulut.js` eivät muuttuneet lainkaan. `js/kaupunkinosto.js`:n
vanhat `latoKaupunkiSisalto`, `latoLehtiOvi` ja `avaaKaupunkipopup`
jäivät koodiin muuttumattomina — kartta ei vain enää kutsu niitä.

## 3. Kuvat

| Kuva | Mitä näkyy |
| --- | --- |
| `kuvat/kaupunkietusivu-pariisi-390.png` | Puhelin 390×844: kortti aukeaa, herokuvat ylimpänä |
| `kuvat/kaupunkietusivu-pariisi-kartta-ja-nappi.png` | Sama kortti vieritettynä: kohdekartta, **yksi** kappale ja "Lue loppuun" |
| `kuvat/kaupunkietusivu-pariisi-luettu-loppuun.png` | Napin jälkeen: kaikki kolme kappaletta samassa kortissa, nappi poissa |
| `kuvat/kaupunkietusivu-pariisi-1400.png` | Työpöytä 1400×900 (kortti rajattuna) |

## 4. Savuke ja vastakoe

`tools/savukkeet/savuke-kaupunkietusivu.mjs` (uusi). Aito napautus
pallon pinnalle, Pariisi ja Marseille, 390×844 ja 1400×900.

```
NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
  node tools/savukkeet/savuke-kaupunkietusivu.mjs
→ 80/80 vartiota läpi
```

Vartiot: kortti aukeaa napautuksesta ja on karttaruudun sisällä;
herokuvat; kohdekartta numeropisteineen **ennen** leipätekstiä;
leipätekstistä näkyy **tasan yksi** kappale ja se on datan ensimmäinen
merkilleen; kortin koko teksti on merkilleen lehtidatan intro; **ei**
ennen/nyt-paria vaikka data sen antaisi; **ei** matkailuliitettä; **ei**
alaosan navigointia; nappi tuo loput kappaleet paikalleen ilman
sivunvaihtoa ja poistuu käytön jälkeen.

**Vastakoe (ajettu, kirjattu):** `latoTiivisEtusivu`n rivi
`ennenNyt: null` vaihdettiin muotoon `ennenNyt: kansi?.ennenNyt ?? null`
(eli suodatus pois) ja savuke ajettiin Pariisille 390 px:llä:

```
FAIL  Pariisi @ 390 px: EI ennen/nyt -paria vaikka data sen antaisi
      — kortissa 2 rooli-kuvaa, datassa 2
19/20 vartiota läpi   (EXIT=1)
```

Muutos palautettiin heti; `git diff` näyttää `ennenNyt: null`.

**Vanha savuke `savuke-kaupunkipopup.mjs`** ajettiin myös: **99/99
läpi**. Siitä käännettiin yksi vartio: "vanha ovi kaupunkilehteen on
kortissa" → "kortissa ei ole alaosan navigointia (PAATOKSET 10)". Muut
vartiot (esittelyteksti merkilleen, kohdekartan zoom, sulku, Pulun
kerros, turisti-info) pitävät sellaisenaan.

## 5. Portit

| Portti | Tulos |
| --- | --- |
| `npm test` | `# pass 3354`, `# fail 0` |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | niputus kunnossa: 387 moduulia, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | savukkeet kunnossa: 1628 ui-viittausta |
| `savuke-kaupunkietusivu.mjs` | 80/80 |
| `savuke-kaupunkipopup.mjs` | 99/99 |

## 6. Sivuhavainnot (ei korjattu, tehtävänannon mukaan)

1. **Kuvakaappaus kaatuu ajoittain fonttien odotukseen.** `page.screenshot`
   jäi useassa ajossa `waiting for fonts to load` -tilaan yli 30 s.
   Savukkeessa kaappaus on siksi `catch`in takana (kuva on raportin lisä,
   ei vartio) — mutta sama roikkuminen voi hidastaa muitakin savukkeita.
2. **Kohdekartan nähtävyyslista on kortissa pitkä.** Puhelimella
   kartan alle latautuu ~20 nimikylttiä ennen leipätekstiä
   (`piirraKaupunkiKartta`), joten ensimmäinen kappale jää melko
   syvälle vieritykseen. Sama kuin vanhassa pop-upissa; omistajan
   järjestysmuutos vain siirsi tekstin niiden alle. Jos tämä häiritsee,
   kylttilista voisi kortissa olla kokoontaitettu — vaatii oman
   päätöksen.
3. **Uusi moduuli olisi vaatinut `sw.js`-muutoksen** (ks. luku 2). Jos
   Fable haluaa ladonnan omaan tiedostoonsa `js/kaupunkietusivu.js`,
   se on mekaaninen siirto + yksi rivi `sw.js`:n SHELL-listaan sen
   jälkeen kun sw.js-työ on valmis.
