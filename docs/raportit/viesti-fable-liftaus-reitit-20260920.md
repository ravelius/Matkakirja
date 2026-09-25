# Opus → Fable: reitit heiton kantaman päähän

20.9.2026 klo 15.40. Haara `opus-local-liftaus-reitit` (pohja
origin/v1973-prep, 26ac1230). Ei versionostoa, ei PR:ää.

Alkuperäinen havainto oli oikea mutta syy toinen kuin oletettiin: mitään
ei jäänyt päivittymättä. `matkareittienValinta` piirsi **vain pelaajan
oman kaupungin kaaret** (`game.board.adj.get(kaupunki.id)`), ja
Brysselillä niitä on laudalla tasan kaksi — Pariisi ja Amsterdam, eli
täsmälleen se katkoviiva, joka omistajan kuvassa näkyy. Lontoon,
Berliinin, Alppien ja Marseillen kaaret ovat muiden kaupunkien kaaria,
eikä niitä piirretty ennen heittoa sen paremmin kuin sen jälkeenkään.

Omistajan päätöksen (klo 13.45) mukaisesti kantama otetaan nyt **pelin
omasta laskelmasta**: `game.moves` on juuri tämän heiton lailliset
siirrot (`js/rules.js findMoves`), ja jokainen niistä kantaa polkunsa.
Polkujen kaarten unioni on "kaikki tavoitettavat polut". Kulkutapa,
kielletyt kaaret ja askelmäärät tulevat samalla ilmaiseksi, eikä viiva
voi luvata reittiä, jota peli ei hyväksy. Ennen heittoa kantamaa ei ole,
ja silloin pidetään entinen esikatselu (oman kaupungin kaaret). Avaimeen
lisättiin heiton silmäluku ja kaarten määrä — ilman niitä kerros olisi
jäänyt ensimmäisen heiton näköiseksi.

Mitattuna Brysselistä (maakulku):

| heitto | siirtoja | kaaria | mitä |
|---|---|---|---|
| 1 | 2 | **2** | pariisi\|bryssel, bryssel\|amsterdam |
| 3 | 6 | 6 | + lontoo\|pariisi, pariisi\|marseille, pariisi\|alpit, amsterdam\|berliini |
| 6 | 10 | **10** | + lontoo\|edinburgh, marseille\|alpit, alpit\|venetsia, alpit\|berliini |

Laudalla on 411 kaarta, joten kuutosen kantama on 10/411 — ei koko
lauta.

## Vartiot

- Uusi `tools/savukkeet/savuke-liftaus-reitit.mjs`: **7/7 läpi**. Noppa
  lukitaan, mutta heitto on pelin oma `actionRoll`, joten savuke ei
  rakenna rinnakkaista laskelmaa kantamasta. Mukana vastakoe: pienellä
  heitolla Pariisi–Lontoo ja Amsterdam–Berliini EIVÄT ole mukana.
- `tests/pallolauta.test.mjs` lähdetekstivartio päivitettiin: sääntö on
  yhä yhdessä paikassa ja matkasession takana, muuttunut on vain se,
  mitkä kaaret sessio näyttää.
- `node --test` 3 750 testiä, 0 punaista; `tarkista-savukkeet` kunnossa.

## Klo 13.50 lisäys (himmeät laudan kaaret): EI TOTEUTETTU — syy

Kirjoitin sen ensin litteälle SVG-kartalle (oma kerros, kerran per
lauta, `vector-effect: non-scaling-stroke`, ei uudelleenpiirtoa
panoroinnissa) ja **peruutin sen**, koska se ei olisi näkynyt siellä
missä vika on: maailmankartta on pallolauta, ja mitattuna
`ui.kartta.lepotila === true` — litteä kerros on lepotilassa ja
reittien piirtäjä on `js/pallolauta/reitit.js`. Puolikas kerros, joka
näkyy vain muilla laudoilla, olisi ollut harhaanjohtavampi kuin
puuttuva.

Himmeä kerros pallolaudalle on oma työnsä: 411 kaarta isoympyrätessa-
lointina, oma välimuisti ja näkyvyyskytkin pallon kerrosmallissa. Tämä
erä on nyt vihreänä ja pushattuna; sano, niin teen himmeät omana
eränään pallopiirtäjään.

## Mitä jäi tekemättä

- Selainkuvaa ei ole: savuke mittaa valinnan (`reittiTunnukset`), koska
  piirtäjä on tällä laudalla pallon puolella ja sen oma sääntö on
  *"ui.matkareittienValinta() päättää, tämä vain piirtää"*.
- Lentokaariin en koskenut; niillä on oma sääntönsä (omistaja 1.9.2026).
