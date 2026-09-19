# Viesti Fablelle: nopanheitto saapumisen päälle — juurisyy, korjaus, vartio

*Opus-erä "noppa saapumisen aikana", 19.9.2026 klo 14.12–14.31 Suomen aikaa.
Haara `claude/bold-ride-vow4ki-noppa-saapuminen`. Ei PR:ää, ei versionostoa,
ei Raamattu-muutoksia.*

## 1. Toistuiko

**Kyllä, 100 % Chromiumilla ja WebKitillä 390 × 844 dpr 2**, ja toisto on nyt
koneellinen (`tools/savukkeet/savuke-noppa-saapumisen-aikana.mjs`).

Toistopolku (pallolauta `?lauta=pallo`, tallennus `matkakirja-save-v1`):
Fogg askeleen päässä Amsterdamista Pariisin maantiellä → **Liiku → Liftaus**
(liftaus valitsee tavan ja heittää nopan samalla painalluksella) →
**Amsterdam** → **heti Liiku → Liftaus**.

Mitattu jumitila ennen korjausta (Chromium, ruutu 390 × 844):

| Mitta | Arvo |
| --- | --- |
| vaihe | `move` |
| noppa | 5 |
| `game.moveOptions()` | 2 |
| pallolaudan kohdemerkkejä | 2 |
| kohteita **ruudulla** | **0** — `c:pariisi` @ −758, 556 ja `c:berliini` @ 908, −316 |
| nappula ruudulla | **ei** — @ −243, −233 |
| kamera (lat, lng, korkeus) | **49,60 N 7,85 E, 0,058** |
| Liiku-nappi DOMissa | **ei** |
| uudelleenlatauksen jälkeen | vaihe yhä `move`, Liiku yhä poissa |

49,60 N 7,85 E on tyhjää maata Pariisin ja Berliinin puolivälissä — **juuri
Maastrichtin kaakkoispuolella**, kuten Sonnetin raportin löydös 1 kuvaa.

## 2. Juurisyy

**Kohdemaan uloszoomauskatto kuristaa nopanheiton kohdesovituksen, mutta vasta
sen jälkeen kun kamera on jo panoroitu.**

Kehys kehykseltä mitattuna (sama ajo, 0,5 s:n näytteet):

```
t+0,5 s  pov=52,15 N 4,89 E alt 0,058   nappula 195,390   kohteet: -
t+1,5 s  pov=52,13 N 4,90 E alt 0,059   nappula 193,387   kohteet -291,1190 ja 1311,243
t+2,0 s  pov=51,41 N 5,74 E alt 0,113   nappula  70,214
t+2,5 s  pov=50,39 N 6,93 E alt 0,288   nappula -106,-37
t+3,0 s  pov=49,62 N 7,83 E alt 0,579   nappula -239,-226
t+3,5 s  pov=49,60 N 7,85 E alt 0,058   nappula -243,-233   ← korkeus napsahtaa takaisin
```

Ketju:

1. `js/ui.js sovitaSiirtokohteet` → `sovitaKohteetNakyviin` → pallolaudan
   `ajaKamera` (js/pallolauta/kamera.js) ajaa kameran ulospäin niin, että
   heiton vaihtoehdot ja nappula mahtuvat ruutuun.
2. Ajo kirjoittaa `pointOfView`in **suoraan joka kehyksessä**, joten
   uloszoomaus näyttää onnistuvan: korkeus nousi 0,058 → 0,579.
3. Kohdemaan uloszoomauskatto elää kuitenkin **OrbitControlsin
   `maxDistance`issa** (`js/pallolauta/lauta.js` `tahdistaZoomirajat`,
   `maanZoomiraja`), ja se puree vasta kun ajo lakkaa kirjoittamasta.
4. Ajon päätyttyä ohjain kuristi korkeuden takaisin saapumisnäkymän lukemaan
   **ja jätti panoroidun keskipisteen paikalleen**. Lopputulos on lähikuva
   tyhjää maata kohteiden puolivälissä: nappula ja molemmat kohteet ruudun
   ulkopuolella, mitään ei ole näkyvissä eikä napautettavissa.
5. Vaihe jää `move`iin, ja siinä `renderActions` ei piirrä **yhtään nappia**
   (valinta tehdään kartalta) — myös **Liiku katoaa**. Tila tallentuu
   `matkakirja-save-v1`:een, joten uudelleenlatauskaan ei vapauta. Vain
   "Uusi peli" auttoi.

**Saapumisluenta ei ole juurisyy** — se vain asettaa tiukan katon (saapumisen
lähikuva alt 0,058). Sama umpikuja syntyy mistä tahansa tiukasta kattonäkymästä,
mikä selittää Fablen tarkennuksen: Tangerin laivapolku ilman luentaa tuotti
saman oireen (kamera Kanariansaarten merelle, yksi rengas ruudun yläreunassa).

**Miksi juuri tämä reitti.** Uloszoomauksen esto kumotaan jo lennolla
(`doFly`), matkavalikossa (`avaaMatkavalikko`) ja siirron animaatiossa
(`animatePawn`) — **nopanheiton oma sovitus oli ainoa reitti ilman kumousta.**
Liftaus ei avaa matkavalikkoa lainkaan, ja laivalipun napautus sulkee sen
(`suljeMatkavalikko` → esto takaisin päälle) juuri ennen heittoa. Siksi vika
näkyi liftauksella ja laivalla, ei lennolla.

## 3. Muutokset tiedostoittain

**`js/ui.js` — `sovitaSiirtokohteet()` (1 rivi + perustelulohko).**
`this.matkaZoomivapaus(true)` ennen sovitusta: nopanheiton kohteet ovat
laillisesti maan ikkunan ulkopuolella, joten esto kumotaan samalla tavalla kuin
lennolla ja matkavalikossa. Esto palaa entiseen tapaan perillä
(`palaaMaanRajaukseen`) ja matkavalikon sulkeutuessa — uutta sääntöä ei tullut,
vain puuttuva kutsu.

**`js/main.js` — latauksen välitilan nollaus (2 riviä + perustelulohko).**
`nollaaValitila` ajettiin ennen vain version vaihtuessa. Nyt vaiheet `move` ja
`roll` nollataan **aina** kun peli ladataan, ja nollattu tila kirjoitetaan
levylle. Pelaaja menettää yhden heiton, ei koko peliä — ja Liiku on taas
ruudulla. Vaiheet `quiz`, `offer`, `event` ja `duel` jäävät ennalleen (ne ovat
aitoja jatkettavia kortteja, eivät heiton välitila).

**`tools/savukkeet/savuke-noppa-saapumisen-aikana.mjs` — uusi vartio.**
**`tools/savukkeet/README.md`** — aakkoslista + taulukkorivi.
**`tools/savukkeet/sarjat.json`** — julkaisusarja + `asetukset`-huomautus.

Ei muutoksia Raamattuun, versionumeroon, tarinateksteihin eikä pelisääntöihin.

## 4. Mittaukset

| Ajo | Tulos |
| --- | --- |
| `savuke-noppa-saapumisen-aikana` Chromium + WebKit 390 × 844 | **10/10 läpi** |
| **vastakoe** (korjausrivi pois + latauksen nollaus pois), Chromium | **2/5** — väitteet 2, 3 ja 4 kaatuvat |
| `savuke-laivamatka-tanger` (PAATOKSET 45, regressio) | **14/14 läpi** |
| `node --test tests/*.test.mjs` | **3650 pass / 0 fail** (13 skipped, 3663 testiä, 78 s) |

Korjauksen jälkeen sama hetki, sama ruutu:

| Mitta | Ennen | Jälkeen |
| --- | --- | --- |
| kamera | 49,60 N 7,85 E **alt 0,058** | 49,60 N 7,85 E **alt 0,592** |
| nappula ruudulla | ei (−243, −233) | **kyllä (151, 380)** |
| kohteet ruudulla | 0/2 | **2/2** (27, 421 ja 197, 332) |
| Liiku latauksen jälkeen | ei | **kyllä** (vaihe palaa `action`iin) |

Chromium ja WebKit antoivat identtiset luvut.

## 5. Tallennuksen palautus

Jumitila säilyi ennen tallennuksessa, koska `phase: "move"` kirjoittuu
`matkakirja-save-v1`:een ja `nollaaValitila` ajettiin vain version vaihtuessa.
Lataus palautti siis täsmälleen saman napittoman näkymän, ja ainoa ulospääsy oli
"Uusi peli". Nyt heiton välitila (`move`, `roll`) nollataan jokaisella
latauksella: vaihe palaa `action`iin, Liiku on DOMissa, ja pelaaja jatkaa samasta
kaupungista samoilla rahoilla ja samalla historialla. Väite 4 vartioi tätä.

## 6. Avointa

- **Kaikki muut kamera-ajot, jotka zoomaavat ulos maan ikkunan yli**, kulkevat
  saman kuristuksen läpi. Tarkistin tämän erän polut (lento, matkavalikko,
  siirto, nopanheitto) — ne kumoavat eston. Jos uusia ulossovituksia tulee,
  `matkaZoomivapaus(true)` on muistettava, tai kuristus kannattaisi siirtää
  `ajaKamera`n omaksi ehdoksi (isompi muutos, ei tähän erään).
- Alkuperäinen hypoteesi (välipisteet suodattuvat pois kohdemaan rajauksessa)
  **ei pidä paikkaansa**: kohdemerkit olivat DOMissa ja pallon etupuolella koko
  ajan — ne olivat vain ruudun ulkopuolella.

*Opus-erä päättyy tähän. Vartiot vihreitä, testit vihreitä, työ pushattu.*
