# Viesti Fablelle: maailmanäkymä on kunnossa — savuke mittasi luennan huntua

**Opus-sessio 16.9.2026. Mittaukset tehtiin mainin ollessa v1920
(ee2f92bb); haara on rebasettu v1921:n (9b055bdf) päälle ja mittaukset
ajettiin uudestaan sen päällä. Ei versionostoa, ei PR:ää, ei
Raamattu-muokkausta. Haara
`claude/bold-ride-vow4ki-maailma-kerma-korjaus`.**

Tehtävänanto: `tools/savukkeet/savuke-maailma-ei-kermaa.mjs` antoi
mainissa 4/6 (V1 ja V3 kaatuivat), ja epäily oli, että v1920:n sisältö
rikkoi maailmanäkymän kermattomuuden (Raamattu, KARTTAUUDISTUKSEN
PAATOKSET 23). **Mittaus osoitti toisin: kartta on oikein, savuke oli
väärässä.** Alla mittaukset ja korjaus.

---

## 1. Juurisyy — kahdessa lauseessa

**(a) Savuke mittasi ajossa A (kerma päällä) LUENNAN HUNTUA, ei kermaa.**
`body.luenta-huntu .map-pane::after` (css/fokusvirta.css) on
`rgba(30, 22, 12, 0.42)` + `backdrop-filter: blur(3.5px)` kartan päällä.
`.map-pane` on pallon kankaan ESIVANHEMPI, ja savukkeen
`piilotaPaallikset` jättää esivanhempien ketjun tahallaan näkyviin —
`visibility: hidden` ei muutenkaan yllä toisen elementin
jälkielementtiin. Huntu on ajossa A päällä ja ajossa B pois, koska
luentavahdilla on nimenomainen poikkeus kehittäjän maailmanäkymälle
(js/ui.js `huntuSallittu`; vartio
`tools/savukkeet/savuke-luentakuvan-kerros.mjs`, kohta *"luenta-huntu EI
ole päällä kehittäjän maailmanäkymässä"*). Savuke siis vertasi
hunnutettua kuvaa hunnuttomaan: kirkkaus KASVOI maailmanäkymässä, ja V1
(*"kirkkauden pitää laskea"*) ja V3 (*"kohdemaan sisällä ei muutosta"*)
kaatuivat mittaamatta kertaakaan kermaa.

**(b) Kaksi viidestä mittauspisteestä oli valunut ruudun ulkopuolelle.**
Sama pakotettu kamera kiinnittyy nyt saapumisnäkymään 163 × 97
lautayksikköä, kun se savukkeen kirjoitushetkellä (v1915) oli
179 × 107. Itävalta/Steiermark (46,8 / 15,7) ja Romania (47,5 / 23,1)
jäivät reunavaran ulkopuolelle, ja savuke laskee ruudun ulkopuolisen
pisteen kaatumiseksi.

**v1920 ei siis rikkonut mitään tässä asiassa.** Todiste: sama savuke
ajettuna v1919:ssä (f5a0b0a0) ja v1915:ssä (12761585) omissa
worktreeissään antoi saman 4/6:n samoilla luvuilla — v1919 jopa
pikselilleen samat (esim. Serbia/Banat A 151,0402 → B 230,1710
molemmissa). Vika oli mittauksessa, ja se oli latentti siitä asti, kun
savuke kirjoitettiin; kone, jolla saapumisluenta ehtii loppuun ennen
ajoa A, sai 6/6.

---

## 2. Mittaukset ennen ja jälkeen (1400 × 900, Fogg Budapestissa)

Kamera on molemmissa ajoissa sama laatikko (V0 vartioi tämän):
näkymä `{x: 6402, y: 1488, w: 163, h: 97}`.

**ENNEN (main, v1920 — 4/6):**

| piste | A (kerma päällä) | B (maailma) | ero |
| --- | --- | --- | --- |
| Itävalta/Steiermark | *ei ruudulla* | *ei ruudulla* | – |
| Romania (Apuseni) | 148,3 | 181,8 | **+33,5** |
| Romania (Szatmár) | *ei ruudulla* | *ei ruudulla* | – |
| Serbia (Banat) | 151,0 | 230,2 | **+79,1** |
| Kroatia (Slavonia) | 151,8 | 231,9 | **+80,1** |
| sisällä Alföld | 142,7 | 227,8 | **+85,1** |
| sisällä Dunántúl | 111,5 | 175,0 | **+63,4** |
| sisällä Mátra | 124,3 | 196,0 | **+71,8** |

A:n luvut ovat täsmälleen hunnun verran tummia: kerma `#faf4d6`
peitolla 0,85 antaa noin 244, ja `0,58 · 244 + 0,42 · 30 ≈ 154` — mitattu
151. Myös Laplace-varianssi paljasti hunnun: A 0,2 (sumennettu litteä
kuva) → B 20,6, eli 102×, kun aito ero on noin 16×.

**JÄLKEEN (tämä haara — 6/6):**

| piste | A (kerma päällä) | B (maailma) | ero |
| --- | --- | --- | --- |
| Kroatia (Podravina) | 244,9 | 230,6 | −14,3 |
| Romania (Apuseni) | 238,0 | 181,8 | −56,1 |
| Romania (Szatmár) | 245,0 | 230,7 | −14,3 |
| Serbia (Banat) | 244,0 | 230,2 | −13,8 |
| Kroatia (Slavonia) | 244,9 | 231,9 | −13,0 |
| sisällä Alföld | 227,8 | 227,8 | **0,0** |
| sisällä Dunántúl | 175,0 | 175,0 | **0,0** |
| sisällä Mátra | 196,0 | 196,0 | **0,0** |

Laplace-varianssi Apusenin vuorilla A 1,3 → B 20,6 (15,8×). Kohdemaan
sisällä ero on nyt tasan nolla kaikissa kolmessa pisteessä — juuri niin
kuin PAATOKSET 23 sanoo: leikkuri on sama rengas kuin laattaan poltettu
reikä.

**VASTAKOE (`--vastakoe`, pakollinen) ajettiin:** kun
`asetaTasoituksenMaailma` syödään, B on sama kuva kuin A (kaikki erot
0,0 ja Laplace 1,00×) ja V1 ja V2 kaatuvat kuten pitääkin. Mittaus siis
mittaa yhä oikeaa asiaa eikä pelkkää kuvakaappausten olemassaoloa.

---

## 3. Korjaus (vain savuke, 1 tiedosto)

`tools/savukkeet/savuke-maailma-ei-kermaa.mjs`:

1. **`piilotaPaallikset` neutraloi luennan hunnun** lisäämällä
   `head`:iin säännön
   `body.luenta-huntu .map-pane::after { content: none !important; }`.
   Luokkaa EI poisteta bodyltä: js/ui.js:n luentavahti ajaa välein ja
   palauttaisi sen kesken mittauksen. `content: none` vie koko
   jälkielementin, siis myös `backdrop-filter`-sumennuksen. Sääntö on
   sama molemmissa ajoissa, joten A ja B ovat yhä vertailukelpoiset.
   Savuke myös kirjaa kummastakin ajosta, oliko huntuluokka päällä
   (`ennen luennan huntu: luokka päällä` / `jalkeen … ei luokkaa`) —
   ilman sitä sama harha olisi taas näkymätöntä.
2. **Kaksi mittauspistettä siirretty ruudulle** samoihin ilmansuuntiin:
   Itävalta/Steiermark (46,8 / 15,7) → Kroatia/Podravina (45,7 / 17,0),
   Romania (47,5 / 23,1) → Romania/Szatmár (47,5 / 22,6). Molemmat ovat
   yhä yli 0,2° Unkarin rajan ulkopuolella — etäisyydet 0,407° ja 0,261°
   mitattuna `assets/data/maapolygonit.json`:in HUN-renkaasta — ja yli
   40 px ruudun reunasta.

Peliin ei koskettu: js/, css/ ja assets/ ovat ennallaan. Aihemerkit,
viuhka ja nappulan kerma-kytkin ovat siis koskemattomat.

---

## 4. Testit ja savukkeet

- `node --test tests/pallolaatat*.test.mjs tests/aihemerkit.test.mjs
  tests/rules.test.mjs tests/dokumentit.test.mjs` → **365/365 läpi**.
- `node --check` savukkeelle → puhdas.
- `savuke-maailma-ei-kermaa` → **6/6** (vastakoe: V1 ja V2 kaatuvat
  odotetusti, 4/6).
- `savuke-nappula-liike` → **17/17**.
- `savuke-nimikyltti` → **58/62** (v1920:n päällä ajettuna). Kaatuvat
  vartiot 4 (puhelin ja työpöytä; tunnettu vanhentunut) sekä **7a ja 7b
  (puhelin/pariisi: ankkurin kylki ja suunta vaihtuvat lähimmällä
  zoomilla — `middle/middle/middle/start`, suunnan hajonta 95,3°)**.
  Kaikki kuusi aihemerkki- ja viuhkavartiota (9a–9f) menevät läpi
  kummallakin laitteella. 7a/7b eivät voi olla tästä korjauksesta:
  haaran ainoat muutokset ovat toinen savuke ja tämä raportti, eli
  pelin koodi on tavulleen mainin koodia.

### Rebase v1921:n päälle — mitattu uudestaan

v1921 (9b055bdf) ei koske kumpaankaan tämän haaran tiedostoon, ja
rebase meni puhtaasti. Sen päällä ajettuna:

- `savuke-maailma-ei-kermaa` → **6/6**; vastakoe 4/6 (V1 ja V2
  kaatuvat odotetusti).
- `node --test` samoille neljälle testitiedostolle → **365/365**.
- Ulkona A 238,0…245,1 → B 181,2…232,3 (erot −12,6…−56,9), sisällä ero
  tasan 0,0 kaikissa kolmessa pisteessä, Laplace 1,2 → 17,8 (14,8×).

Kaksi huomiota v1921:stä: **saapumisrajaus on taas 179 × 107** (v1921
palautti sen leveäksi, ilmeisesti maainfon kiinnityksen myötä) ja
**luennan huntu ei tässä ajossa ehtinyt ajoon A** (`ennen luennan
huntu: ei luokkaa`). Savuke olisi siis voinut mennä läpi v1921:ssä myös
ilman tätä korjausta — mutta se olisi ollut sattumaa: huntu on
ajoituskisa, ja juuri siksi se on nyt sammutettu tyylisäännöllä eikä
jätetty odottamaan. Siirretyt mittauspisteet osuvat ruudulle sekä
kapeassa (163 × 97) että leveässä (179 × 107) rajauksessa.

---

## 5. Kaksi havaintoa Fablelle päätettäväksi

1. **Saapumisrajaus heilui: 179 × 107 (v1915) → 163 × 97
   (v1916…v1919) → 179 × 107 (v1921).** Se ei riko mitään vartiota nyt,
   mutta se on omistajan näkemä rajaus, ja se heilahti kahdesti
   kenenkään mittaamatta.

3. **`savuke-nimikyltti` 7a ja 7b kaatuvat mainissa** (puhelin/pariisi,
   ankkurin kylki ja suunta lähimmällä zoomilla). Ne eivät liity tähän
   haaraan mitenkään, mutta odotus oli 60/62 ja tulos 58/62 — eli
   nimikylttivartiossa on kaksi uutta kaatujaa, jotka joku saa
   selvitettäväkseen.
2. **Luennan huntu on kartan päällä pitkään istunnon alussa** (ajossa A
   se oli yhä päällä noin 15 s latauksesta, isokuva ruudulla). Selaimessa
   ilman puhesynteesiä kertojan "ääni" kestää oman ajastuksensa mukaan.
   Tämä on huntuvartion (`savuke-luentakuvan-kerros`) asia, ei tämän —
   mutta se selittää, miksi kartta näyttää istunnon alussa tummalta ja
   sumealta myös kuvakaappauksissa.
