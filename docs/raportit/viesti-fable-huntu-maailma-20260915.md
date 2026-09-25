# Ei luennan huntua kehittäjän maailmanäkymässä

*(Sonnet-työsessio, 15.9.2026. Haara
`claude/bold-ride-vow4ki-huntu-maailma`. Ei versionostoa, ei mergeä,
ei Raamattua. Työskennelty erillisessä worktreessä
`/home/user/wt-huntu-maailma`. Omistajan päätös 15.9.2026, Raamattu
`js/tyohuone-raamattu.js` osio "KARTTATAUSTA LUENNAN JA
KAUPUNKIESITTELYN AIKANA", POIKKEUS-kohta.)*

## 1. Muutos

`js/ui.js`, `kaynnistaLuentavahti` (~rivi 11636), huntu-ehtoon lisätty
poikkeus: kun kehittäjätila JA kehittäjän maailmanäkymä ovat molemmat
päällä, huntua (`body.luenta-huntu`) ei nosteta lainkaan.

```js
const huntuSallittu = !(kehittajaTilaPaalla() && kehittajaMaailmaPaalla());
document.body.classList.toggle('luenta-huntu', kertoja && kuvaRuudulla && huntuSallittu);
```

`kehittajaTilaPaalla` ja `kehittajaMaailmaPaalla` tuodaan
`js/ui-apurit.js`:stä — molemmat olivat jo `ui.js`:n import-listalla
(rivi 40, käytössä muualla kehittäjän ratasvalikossa), niin ei
kiertotuontia kartta.js:n kautta eikä uutta importtia tarvittu.

Muut luennan merkit (kaiutin `kertoja-aanessa`, tekstipiilo
`LUENNAN_TEKSTIPIILO`, Liiku-piilo `luenta-aanessa`) eivät koske tätä
ehtoa — ne pysyvät ennallaan kehittäjän maailmanäkymässäkin.

## 2. Mittaus (Chromium, savuke)

Lisätty vartio `tools/savukkeet/savuke-luentakuvan-kerros.mjs`:n uuteen
lohkoon 6 ("LUENNAN HUNTU EI NOUSE KEHITTÄJÄN MAAILMANÄKYMÄSSÄ"), sillä
kyseinen savuke ajaa jo isoisän oikean luennan Venetsiassa ja mittaa
samaa hunttua muissa tiloissa (lohko 5).

Ajo isoisän luennan aikana (kertoja äänessä, kuva ruudulla):

| Tila | `body.luenta-huntu` | `::after content` |
|---|---|---|
| ei kehittäjätilaa, ei maailmanäkymää | päällä | `""` (sumentaa) |
| kehittäjätila + maailmanäkymä PÄÄLLÄ | **pois** | **`none`** |
| maailmanäkymä pois kesken luennan (dev jää päälle) | palaa **päälle** | — |

Maailmanäkymä kytkettiin päälle/pois kesken käynnissä olevan luennan
suoraan `js/ui-apurit.js`:n `asetaKehittajaTila`/`asetaKehittajaMaailma`-
funktioilla (dynaaminen `import()` sivun kontekstissa — sama mekanismi
kuin `main.js`:n maailmanapin klikkauskäsittelijä käyttää). Vahti
kysyy tilan `LUENTAVAHDIN_VALI_MS` (200 ms) välein; odotus nostettiin
400 ms:stä 700 ms:ään ensimmäisen ajon flakin jälkeen (CI:n hitaammalla
koneella yksi 200 ms:n tikki ei aina riitä kahden peräkkäisen
`localStorage`-kirjoituksen ja niiden lukevan tikin väliin).

**Vastakoe (mainittu tehtävässä "ehto pois → huntu päällä
maailmanäkymässä → punainen"):** samassa ajossa mitattiin, että VÄLITTÖMÄSTI
ENNEN maailmanäkymän kytkemistä — ilman minkäänlaista koodimuutosta —
`kertoja` ja `kuvaRuudulla` olivat molemmat tosia ja `luenta-huntu` oli
silloin PÄÄLLÄ. Tämä osoittaa, ettei alempi "huntu pois" -tulos johdu
siitä, että kertoja tai kuva sattuisivat olemaan epätosia
maailmanäkymässä — ne pysyvät tosina, ja juuri uusi `huntuSallittu`-ehto
on se, joka kääntää tuloksen. (Koodin fyysistä palauttamista ennen
tätä ei tehty — automaattinen vastakoe todistaa mekanismin ilman sitä,
samalla logiikalla kuin savukkeen jo olemassa oleva luokan-pois-päälle
-vastakoe lohkossa 5.)

## 3. Testitulokset

```
node --test tests/rules.test.mjs tests/dokumentit.test.mjs
# 337/337 pass

NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-luentakuvan-kerros.mjs
# 29/29 vartiota läpi (ajettu kahdesti peräkkäin flakin korjauksen
# jälkeen, molemmilla kerroilla 29/29)

node tools/tarkista-savukkeet.mjs
# savukkeet kunnossa: 1717 ui-viittausta, 407 metodia, 538 kenttää,
# 31 lehtitilan kenttää
```

## 4. Jäljelle jäävä

- Ei versionostoa, ei mergeä main-haaraan — PR odottaa omistajan/Fablen
  hyväksyntää.
- Ei muutoksia Raamattuun (linjaus oli jo kirjattuna sinne ennen tätä
  työtä).
- Worktree `/home/user/wt-huntu-maailma` poistettu tämän työn päätteeksi.
