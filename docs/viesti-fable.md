# Opus 8 → Fable: KUVATEKSTIAUDITOINTI, vaihe 1 valmis (14.8.2026)

Haara `claude/opus8-kuvatekstit` (mainista, `a02afda`).
Kartoitus on tehty, mittatyökalu on repossa, ja korjaukset alkavat
pahimmasta päästä heti tämän raportin jälkeen — en jää odottamaan
vastausta.

## 1. Mitkä selitteet oikeasti näkyvät ruudulla kuvatekstinä

Kävin läpi `js/ui.js`:n ja `js/pollo.js`:n renderöintipolut. Selite-
kenttiä on paljon, mutta vain osa niistä päätyy figcaptioniin. Tämä on
auditoinnin rajaus:

| Kenttä | Renderöityy | Missä |
| --- | --- | --- |
| `kansikuvat[].selite` | `figcaption.kuvateksti` | `piirraLehtiKuvat`, ui.js:10682 |
| `nostot[].selite` | `p.selite` kuvan alla | ui.js:11379 |
| `nostot[].galleria[].selite` | sama `p.selite` (vaihtuu nuolista) | ui.js:12159 |
| nähtävyysjutun `kuvat[].selite` | `figcaption.nahtavyys-kuvateksti` | ui.js:11946 / 11995 |
| menovinkkien 1. kuvallinen kohde | `figcaption.vinkki-hero-teksti` | ui.js:11298 |
| valokuvapakettien `selite` (+ `lisat`) | postikortin `p.kuvateksti` | ui.js:7909 |
| `VUORIKUVAT[].selite`, maastotekstien `kappaleet[].selite` | `#wiki-kuvateksti` | ui.js:12545 |

**EI kuvatekstiä, ei kosketa:**

- menovinkkilistan rivien `selite` → pelkkä `img.alt` (ui.js:11199).
  Saavutettavuustekstiä, pidempi kuvailu on siellä tarkoituksellista.
- `maakartat.js`:n `kohteet` → karttapinnit, ei figcaptionia.
- `quiz.selite` → visan selitysteksti, eri asia.
- kaikki `lahde`-kentät → koskemattomat, kuten ohjeistit.

Mittatyökalu on `tools/kuvateksti-audit.mjs` (`--raja=260`, `--json`).
Se lukee paketit oikeasti importilla, ei regexillä, joten luvut
vastaavat sitä mitä peli renderöi.

## 2. Luvut

**Kuvatekstejä yhteensä 3 582. Yli 260 merkin rajan menee 551 (15 %).**

Vakavuusjakauma:

| pituus | kpl |
| --- | --- |
| 261–320 mrk (lievä ylitys) | 229 |
| 321–400 mrk | 98 |
| 401–550 mrk | 116 |
| **yli 550 mrk (essee)** | **108** |

Tiedostoittain:

| tiedosto · polku | yli / kaikki | pisin |
| --- | --- | --- |
| maa-kategoriat.js · nosto | 205 / 844 | 631 |
| nahtavyysjutut.js · nahtavyys | 132 / 613 | **1073** |
| kulttuuri-kategoriat.js · nosto | 116 / 366 | 819 |
| kulttuuri-kategoriat.js · kansikuva | 54 / 195 | 911 |
| southamerica-valokuvat.js · postikortti | 11 / 31 | 362 |
| northamerica-valokuvat.js · postikortti | 8 / 36 | 334 |
| oceania-valokuvat.js · postikortti | 7 / 30 | 353 |
| asia-valokuvat.js · postikortti | 5 / 36 | 371 |
| southamerica-valokuvat.js · postikortti-lisa | 5 / 107 | 299 |
| asia-lisat-valokuvat.js · postikortti | 3 / 23 | 296 |
| kulttuuri-kategoriat.js · galleria | 2 / 50 | 347 |
| europe/asia/northamerica · postikortti-lisa | 3 / 345 | 289 |

**Puhtaat:** vuori-valokuvat (0/324, pisin 208), maastotekstit
(0/220), menovinkkien herot (0/31), africa- ja europe-valokuvien
pääkuvat. Näissä kuvatekstikuri on jo kunnossa — ne jäävät rauhaan.

## 3. Missä vika on keskittynyt

Ylitykset eivät ole tasaisia: 102 kohteesta pahimmat 20 kattavat yli
puolet. Kärki (kpl yli rajan / pisin):

- **teheran** 15/1073, **tabriz** 15/751 + 9/911, **isfahan**
  14/846 + 9/846, **tokio** 14/766 + 9/801, **luxor** 14/522 + 9/761,
  **ankara** 12/741, **damaskos** 12/579, **halab** 11/571
- Siperia: **irkutsk** 9/819, **jekaterinburg** 9/734 (omistajan
  havainto), **novosibirsk** 9/674
- Maalehdet: **CYP** 20/631, **IDN** 18, **VNM** 18, **PHL** 16,
  **MYS** 15, **YEM** 14, **PAK** 14, **GBR** 13

Kuvio on yksi ja sama: kuvateksti on kirjoitettu kuvailutekstiksi
("etualalla… taempana… vasemmassa alanurkassa on tummanvihreä
jäteastia"). Teheranin Masoudiehin talon 1073 merkin selite on
kokonaan sommittelua — siinä ei ole yhtään faktaa, joka kuuluisi
leipätekstiin. Se on tyypillinen, ei poikkeus: pisimmissä selitteissä
asiasisältö on jo sivun leipätekstissä.

## 4. Miten korjaan

Linjauksesi mukaisesti: **≤ 3 virkettä / ≤ 260 merkkiä**, kuvateksti
kertoo mitä kuvassa on ja miksi se on merkittävä. Sommittelu pois.
Aitoa asiasisältöä siirretään leipätekstiin vain jos se istuu
luontevasti eikä ole jo siellä — uusia faktoja ei keksitä, `lahde`
ei liiku. Kirjaan jokaisen leipätekstisiirron erän PR-kuvaukseen,
jotta voit tarkistaa ne.

Eräjako (yksi looginen kokonaisuus per PR, versionosto ja portit
julkaisusääntöjen mukaan):

1. **kulttuuri-kategoriat.js kansikuvat** (54) — lehden kansirivi,
   näkyvin paikka, omistajan havainto tästä.
2. **kulttuuri-kategoriat.js nostot + galleria** (118), Lähi-itä ja
   Aasia ensin, Siperia mukana.
3. **nahtavyysjutut.js** (132) — pisimmät koko repossa.
4. **maa-kategoriat.js nostot** (205), mantereittain jaettuna jos erä
   paisuu liian isoksi yhdeksi PR:ksi.
5. **valokuvapakettien postikortit** (41) — lievimmät, viimeisenä.

Ennen ja jälkeen kutakin erää ajan Playwright-savukkeen
(`savuke-lehtiotsikko`, `savuke-esilataus`, `savuke-kaupunkitaulut`)
ja katson kaappaukset.

## 5. Havainto sivussa (en korjaa ilman lupaasi)

Sama kuvailutyyli on myös menovinkkilistan `selite`-kentissä, mutta
siellä se on `img.alt` eli saavutettavuustekstiä — jätän ne rauhaan
tarkennuksesi 4 mukaisesti.

— Opus 8
