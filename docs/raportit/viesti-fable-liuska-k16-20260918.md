# Viesti Fablelle: kaupunkiliuskan viimeistely (PAATOKSET 34 kohta 16 a-c)

Opus-erä 18.9.2026. Haara `claude/bold-ride-vow4ki-liuska-k16`, base
`origin/main` (v1939, a43cf9fd). Vain kohdat a-c; d-e (Pariisi- ja
Nähtävyydet-rivien sisällöt) jäivät toiselle agentille, eikä
`js/kaupunkinosto.js`, `js/nahtavyydet.js`, Raamattu tai
`tools/savukkeet/sarjat.json` muuttunut.

## Tila

| Kohta | Tila |
| --- | --- |
| a) kaupunkimerkin piste ei kuulla liuskan läpi | TOTEUTETTU |
| b) väripallot irti tekstistä | TOTEUTETTU |
| c) liuskan animaatio pois kokonaan | TOTEUTETTU |

## Mitä muuttui

**a) Piste piiloon liuskan ajaksi.** Juurisyy: Pariisin piste EI ole
nostokerroksen merkki vaan pallon oma pistekerros
(`pallo.pointsData`), joka piirtyy CSS2D-liuskan alle — ja koska
pohja on läpikuultava (alfa 0,824, kohta 15 a), piste kuulsi läpi.
Liuska ripustetaan Pariisissa näkymättömään ankkuriin, joten mikään
merkin piilotus nostokerroksessa ei olisi sitä poistanut.

Korjaus on sama kaava kuin ison nimen piilotuksella (kohta 14 c):
`js/pallolauta/lauta.js` `paivitaPisteet` pudottaa pistejoukosta sen
kaupungin, jonka liuska on auki (`nostot.liuskanKaupunkiId()`), ja
tunnus on osa `pisteAvain`ta, jotta kirjasto saa uuden joukon.
Lisäksi `js/pallolauta/nostot.js` piilottaa liuskan oman
kaupunkimerkin siltä varalta, että liuska aukeaa pakkojen näkyvästä
kaupungista (Lille), jolla merkki on nostokerroksessa: lippu
`piiloLiuskanAlla` kirjoitetaan **joka ladonnassa** (`merkit.aseta`
yhdistää datumin vanhaan, ks. `piiloListanAlla`-kommentti), ja luokka
`.pallolauta-liuska-merkki-piilossa` piilottaa vain merkin oman
piirtoryhmän — ei koko elementtiä, jonka sisällä liuska itse on.

**b) Väripallo irti tekstistä.** Pallo oli kiinteästi `cx = 7`
(säde 2,4), eli sen reuna 9,4 oli tekstin alun 8,9 **päällä** —
juuri se, minkä omistaja kuvasta näki. Nyt pallon keskipiste
lasketaan nimiön omasta asemoinnista
(`nostosymNimioAsemointi('oikea', 0).x`) miinus 0,6 × kirjasin miinus
säde, joten väli seuraa asemointia eikä ole kopioitu vakio.

**c) Animaatio pois.** Poistettu `css/styles.css`:stä liuskan
150 ms:n feidi (`pallolauta-liuska-saapuu`), pohjan feidi
(`pallolauta-liuska-pohja`), haitarin 200 ms:n korkeusliuku
(`pallolauta-liuska-haitari`) ja niiden reduced-motion-poikkeus, sekä
`js/pallolauta/aihemerkit.js`:stä rivien 30 ms:n porrastus
(`--liuskan-rivi`). Tilalle KIELTO, ei pelkkä poisto: liuska piirtyy
nostomerkin `.pallolauta-viuhka`-ryhmään, jolla oli aihemerkin viuhkan
oma avausanimaatio (`pallolauta-viuhka-avaa`) — sääntö
`.pallolauta-nosto .pallolauta-viuhka, … *` nollaa animaation ja
siirtymän. Aihemerkin oma viuhka säilyy ennallaan, samoin kamera-ajo
(kohta 14 a).

## Mittaus, 390 px Pariisi (`savuke-pariisi-lahizoom.mjs`, `SAVUKE_RUUTU=390`)

Uudet vartiot 8-sarjassa (saapumisnäkymän liuskalohkossa, jossa
8o-8q jo ovat):

- **8r** kaupungin piste ei ole pistekerroksessa liuskan ollessa auki;
  **8r2** piste palaa sulun jälkeen. (Mitta on kerroksen data, ei
  ruudun pikseli: pallon kangas on WebGL:ää, jota ei voi lukea
  takaisin ilman `preserveDrawingBuffer`ia, ja piirtoon menevä joukko
  on täsmälleen se, mikä pisteen näyttää tai jättää pois.)
- **8s** kategoriarivin väripallon ja tekstin väli ≥ 0,5 × kirjasin,
  ruutupikseleinä (`getBoundingClientRect`).
- **8t** liuskan jokaisella elementillä `animationName: none` ja
  `transitionDuration: 0s`; **8t2** avattu kategoria on täydessä
  koossaan jo avausta seuraavassa kehyksessä (rivilaatikko heti =
  laatikko levon jälkeen ±1 px).

Ennen: 8r/8s/8t eivät olleet olemassa; koodista mitattuna pallon reuna
oli 0,5 yksikköä tekstin alun päällä (väli −0,5 yks. eli −0,8 px, vaatimus
9,0 px), liuskan elementeillä oli neljä animaatiosääntöä ja
piste-erottelua ei ollut lainkaan.

Jälkeen (ajo 18.9.2026):

```
INFO  puhelin · liuskan viimeistely: kaupungin pisteitä 0, liuskan elementtejä 67 (liikkuvia 0), kategoriarivejä 5
OK    8r. puhelin: kaupungin piste ei ole kartalla liuskan ollessa auki
OK    8s. puhelin: väripallon ja tekstin väli >= 0,5 × kirjasin
OK    8t. puhelin: liuskan elementeillä ei ole animaatiota eikä siirtymää
OK    8t2. puhelin: avattu kategoria on täydessä koossaan heti
OK    8r2. puhelin: kaupungin piste palaa kartalle liuskan sulun jälkeen
OK    8q. puhelin: kaupungin iso nimi piilossa liuskan ajan, näkyvissä sulun jälkeen

46/46 vartiota läpi
```

Vanhat liuskavartiot 8c-8q pysyivät vihreinä (mm. 8k keskitys ero
0,00 px, 8l rivit 18,0 px, 8o liike 30,9 ms).

## Muut tarkistukset

- `node --test tests/*.test.mjs`: **# pass 3613, # fail 0** (skipped 13).
  `tests/pallonimet.test.mjs` vartioi pistekerroksen sääntöä sanatarkasti,
  joten sen kaksi väitettä päivitettiin uuteen suodattimeen.
- `node tools/tarkista-savukkeet.mjs`: kunnossa.
- `node tools/tarkista-niputus.mjs`: kunnossa (ei uusia tuonteja;
  `nostosymNimioAsemointi` oli jo tuotu).

## Muutetut tiedostot

- `js/pallolauta/lauta.js` — piste piiloon liuskan ajaksi (a)
- `js/pallolauta/nostot.js` — merkin piilotuslippu ja luokka (a),
  väripallon paikka nimiön asemoinnista (b)
- `js/pallolauta/aihemerkit.js` — rivien porrastus pois (c)
- `css/styles.css` — liuskan animaatiot pois ja kielto (c), merkin
  piilotusluokka (a)
- `tools/savukkeet/savuke-pariisi-lahizoom.mjs` — vartiot 8r, 8r2, 8s,
  8t, 8t2 (vain vartioita, ei rakennemuutoksia; `sarjat.json`
  koskematon PR #2579:n takia)
- `tests/pallonimet.test.mjs` — pistekerroksen sääntövartio ajan tasalle
- `docs/raportit/viesti-fable-liuska-k16-20260918.md` — tämä raportti

Versionumeroa ei nostettu eikä PR:ää avattu (Fablen ohje).
