# Opus → Fable: kaksi mainissa punaista savuketta — juurisyyt selvillä, molemmat vihreinä (31.8.2026)

Haara `claude/savukkeet-kuntoon`, otettu puhtaana tuoreesta
origin/mainista (`b282b220`, v1381). Ei versionostoa, ei PR:ää.
Muutetut tiedostot: `js/kartta.js`, `tools/savukkeet/savuke-elaintaky.mjs`,
`tools/savukkeet/savuke-nahtavyysihme.mjs`, tämä raportti.

**Lyhyesti:** kolme eri juurisyytä, ja yksi niistä on AITO PELIVIKA
— kartan rullazoomi jää jumiin yleiskuvasta lähennettäessä. Se on
korjattu, koska se oli savukkeen vihreyden välitön edellytys, mutta
lue luku 1 ensin: se on tämän erän tärkein löytö. Yksikään väite ei
ole poistettu, ohitettu eikä löysennetty.

## 0. LUE ENSIN: kaksi sessiota kirjoitti samaan työkopioon

Aloittaessani `/home/user/Matkakirja` oli haarassa
`claude/nostot-laattoihin`, työpuu puhdas. Otin sieltä oman haarani
(`git checkout -B claude/savukkeet-kuntoon origin/main`). Puolen tunnin
päästä huomasin, että samaan hakemistoon kirjoitti koko ajan TOINEN
elävä sessio: `js/fokusryhmat.js` ja `js/karttanimet.js` muuttuivat
kesken ajojeni (nimiön katkaisu, "omistajan sääntö 31.8.2026"), ja
`git worktree list` näytti hakemiston siirtyneen haaraan
`claude/vaiennut-nimio` (`bc77d9d2`, v1382) — eli joku vaihtoi haaran
allani samalla kun minä olin vaihtanut sen hänen altaan.

Tein näin heti kun huomasin:

1. siirsin oman työni omaan worktreehen (`/tmp/claude-0/wt-savukkeet`),
2. palautin jaetusta työkopiosta kaikki koskemani tiedostot
   (`js/kartta.js`, kaksi savuketta, `tools/savukkeet/kaappaukset/`) ja
   poistin ajamani `dist/`-kansion — jaettuun puuhun jäi vain toisen
   session oma työ,
3. **en koskenut haaravalintaan enää**: toisen session kirjoitus oli
   kesken, enkä halunnut viedä sen kirjoittamattomia muutoksia.

Mitään ei menetetty (työpuu oli puhdas molemmilla vaihdon hetkillä,
joten kaikki oli committeina), mutta **noin klo 14:44–14:49 UTC toinen
sessio kirjoitti mainin pohjalle eikä oman haaransa pohjalle** —
`js/fokusryhmat.js` eroaa haarojen välillä 393 riviä. Kannattaa
varmistaa siltä sessiolta, että sen `js/fokusryhmat.js`-muokkaus on yhä
oikealla pohjalla. Ja jatkossa: agentit omiin worktreihin, sillä kaksi
sessiota yhdessä työkopiossa vaihtaa haaraa toistensa alta.

## 1. AITO PELIVIKA: rullazoomi jää jumiin yhden naksun jälkeen

`js/kartta.js` `zoomaaPainikkeella` (= rullan naksu; +/- -napit
poistettiin 27.8.2026, mutta metodi jäi rullan käyttöön) **kieltäytyy
lähentämästä** aina kun zoomiporras on jäänyt fokusikkunan pohjan
alapuolelle.

Mitattu maailmankartalla (Helsinki, katselutila, 1100 x 900):

| rullan naksu sisään | näkyvä leveys | zoomiIndeksi | metodin paluu |
| --- | --- | --- | --- |
| lähtötilanne | 11 640 | 0 | — |
| 1. | 3 002 | 1 | `true` |
| 2. | 3 002 | 1 | **`false`** |
| 3.–6. | 3 002 | 1 | **`false`** |

Kartta jää yleiskuvan ja lähikuvan väliin, eikä siitä pääse pois
rullalla lainkaan. Nipistys ja trackpadin ele käyttävät vapaan
kertoimen reittiä (`zoomiVapaa`) ja toimivat — siksi vika ei ole
näkynyt iPadilla, ja siksi se on maininnut vain hiirikäyttäjää.

**Mekanismi.** Fokusikkunan pohja (`fokusZoomMinimi`) nostaa
piirretyn kertoimen portaikon yli (`zoomiKerroin` rajaa sen
`zoomiRajat`-pohjaan = 4,0037), mutta `zoomiIndeksi` jää siihen
portaaseen, jolla oltiin ennen pohjan ilmestymistä (1, kerroin 1,5).
Silloin `lahin + suunta` = 2 laskee yhä pohjaportaan (4) ALAPUOLELLE,
`pohjalle`-haara osuu päälle myös LÄHENNETTÄESSÄ, ja rivi

```js
if (pohjalle && nykyKerroin > 0 && nykyKerroin <= pohjaKerroin * 1.001) return false;
```

palauttaa `false` — ikuisesti, koska mikään ei liikuta indeksiä.

**Milloin rikkoutui.** `git bisect`: viimeinen ehjä `ebad659b`
(v1365), ensimmäinen rikki `d3902f24` (**v1366, 30.8.2026, "Purun
jäänteet korjattu"**). Se palautti `ui.fokusPohjaBbox/-Rajauksen`
FOKUS_POHJAT-taulusta, jolloin maailmankartalla ON pohja heti
ensimmäisen lähennyksen jälkeen. Pohja itsessään on haluttu (v1368
löysensi sen tarkoituksella); jumi on `zoomaaPainikkeella`n vanha
oletus siitä, että porrasindeksi ja piirretty kerroin ovat aina samaa
mieltä.

**Korjaus** (`js/kartta.js`, perustelu kommenttina koodissa): portaikon
alle jäänyt indeksi käsitellään samana kuin nipistyksen jäljiltä jäänyt
`zoomiVapaa` — se ON kerroin portaiden välissä. Lähennys hakee siis
ensimmäisen pohjaa suuremman portaan, loitonnus pysähtyy pohjaan
(`pohjalle`-ehto vastaa entiseen tapaan). **Loitonnusraja ei löysty
pykälääkään.** Mitattu korjauksen jälkeen: 3002 → 2374 → 1583 → 1055.

Jos et halua tätä korjausta samassa erässä savukkeiden kanssa, se on
oma committinsa ja irtoaa yksin — mutta silloin savuke-elaintaky jää
punaiseksi, koska ilman lähennystä sen merkkikerros on yleiskuvan
piilossa.

## 2. savuke-elaintaky: kolme väitettä mittasi väärässä paikassa

Kaatui kolmeen vartioon ja sitten `TypeError`iin (`kohde.keski`).
Sama kaatuminen mainin puhtaassa työkopiossa, kuten aiemmat erät
raportoivat — ja syy on juuri luvun 1 pelivika, ei symbolit,
ryhmittely eikä laattapyramidi:

- savuke lähensi neljä kertaa `zoomaaPainikkeella(1)`,
- kartta jäi jumiin 3002 yksikön leveyteen = 150 pituusastetta,
- `ELAINTAKY_NAKYY_ASTETTA` on 90, joten kerros pysyi luokassa
  `elaintakyt-piilossa` (`display: none`),
- piilotetun alipuun `getBoundingClientRect` on 0 × 0 → "58 merkkiä,
  piilossa=true", kaikki mitat `0/0`, eikä yksikään merkki ollut
  "ruudulla" → `find(...)` palautti `undefined` ja rivi 226 kaatui.

Kun luvun 1 korjaus on paikallaan, savuke on 22/23. Viimeinen väite
("osuma-alue on sormen mitta ≥44 px") mittasi 42 px — ja **se väite on
oikeassa, mutta mittapaikka oli vanhentunut**:

> **Mikä muuttui ja milloin:** sama v1366 vei eläinmerkit KARTAN
> MITTAKAAVAAN (commit mittaa sen itse: *"skaala x2,837 → merkki
> x2,837"*). Sitä ennen merkki oli ruutumitassa eli yhtä iso joka
> zoomilla, ja mikä tahansa lähennysporras kelpasi mittapaikaksi.
> Nyt sormenmitta on tosi yhdessä määrätyssä näkymässä: merkin
> peruskoko on ankkuroitu maan fokusikkunaan (`js/ui.js`
> `fokusMerkkiSkaala`), ja juuri siihen pelin oma saapumisajo päätyy.

Mitattu: fokusikkunassa osuma on **täsmälleen 44,0 px** ja kasvaa
siitä lähennettäessä (62,6 → 93,9 → 140,8 → 211,2). Savuke ajaa siis
kameran perustasolle samalla kaavalla kuin savuke-fokuskohteet
(`ajaLehdelle`), ja väite on nyt sanamuodoltaan sama kuin siellä:
*"osuma-alue on lehden perustasolla vähintään 44 px"*. Väitettä ei
löysennetty — sille annettiin se näkymä, jota se koko ajan tarkoitti.
Osion 4 zoomiportaat ajetaan edelleen painikkeella, joten sekin
vartioi nyt luvun 1 korjausta.

**Todiste vanhentumisesta:** ajoin savukkeen sellaisenaan
commitissa `ebad659b` (v1365) → **23/23 läpi**. Seuraava commit
(v1366) rikkoi sen.

Tulos: **23/23**.

## 3. savuke-nahtavyysihme: lehtilukko sulki Ateenan oven

Toisen agentin arvio oli, *"ettei kumpikaan aja kameraa lehden
ikkunaan"*. Mittasin: **se arvio oli väärä.** Savukkeen kymmenen
punaista riviä eivät koske kameraa lainkaan — Ateenan
KAUPUNKIKARTTA EI AUENNUT OLLENKAAN. `openArrival('ateena')` palasi
heti, `arrival-dialog` jäi kiinni, `.kartta-selite`-kylttejä oli
nolla, ja siksi `avaaKohde('Antiikin agora')` palautti `false`.
Pekingin osio (kadonnut kohde) oli koko ajan vihreä, koska Peking ei
ole fokuskaupunki.

Syy on `js/ui.js` `openArrival`in ensimmäinen rivi:
`if (fokusvirtaOhittaaLehden(this, city)) return;`.

> **Mikä muuttui ja milloin:** `git bisect` osoitti commitin
> `1485b245` (**v1323, 29.8.2026**, "Fokusvirran kortit pelaajan
> polkuun") — omistajan päätös *"Päälle — koko kulku testiin"* käänsi
> `FOKUSVIRTA_KORTIT`-lipun päälle, ja sen mukana palasi LEHTILUKKO:
> fokuskaupungin lehti aukeaa vasta kun laatan aarre on löydetty
> (Raamattu, ETENEMINEN). Savuke kirjoitettiin 27.–28.8.2026, siis
> kaksi päivää ennen tuota päätöstä, ja se avasi Ateenan lehden
> suoraan saapumisesta — ovesta, joka on siitä lähtien lukossa pelin
> alussa.

Korjaus: savuke kääntää laatan (`ui.game.tokens.delete(id)`) ennen
lehden avaamista. Se on täsmälleen se tila, johon peli itse vie
oikean vastauksen jälkeen — "aarteen jälkeen vapaa tutkinta" — eli
juuri se tila, jossa pelaaja nähtävyysjutun lukee. Lukko itsessään on
savuke-fokusvirran vartioima asia, ei tämän. **Yhtään väitettä ei
muutettu, poistettu eikä löysennetty**; vain ovi avattiin sillä
avaimella, joka pelissä on.

Tulos: **19/19**.

## 4. Muut savukkeet: koko hakemisto ajettuna

34 savuketta ajettu tällä haaralla (`tools/savukkeet/savuke-*.mjs`),
**27 vihreää**. Jokainen punainen ajettiin sen jälkeen erikseen myös
PUHTAASSA MAINISSA (`b282b220`, oma worktree) — yksikään ei johdu tämän
erän muutoksista, ja `savuke-nappula`n, `savuke-kehittajalehden`,
`savuke-fokusvirran` ja `savuke-mediakanavan` luvut ovat mainissa
pilkulleen samat.

| Savuke | Tämä haara | Puhdas main | Luokka |
| --- | --- | --- | --- |
| savuke-elaintaky | **23/23** | 20/23 + kaatuminen | korjattu tässä |
| savuke-nahtavyysihme | **19/19** | 9/19 | korjattu tässä |
| savuke-fokusvirta | 48/49 | 48/49 (samat luvut) | **ennestään punainen** |
| savuke-kehittajalehti | 6/7 | 6/7 (samat luvut) | **ennestään punainen** |
| savuke-nappula | 22/24 | 22/24 (samat luvut) | **ennestään punainen** |
| savuke-mediakanava | 24/25 | 24/25 (sama rivi) | ympäristö (ks. alla) |
| savuke-pro-tuottaja | kaatuu | kaatuu 3/3 ajossa | **ennestään punainen** |
| savuke-maailmanakyma | 14/16 | 14/16 (3/3 ajossa) | aikabudjetti, ks. alla |
| savuke-laattapyramidi | ei ajettavissa | sama | ympäristö (laatat puuttuvat) |
| savuke-webkit-eleet | ohittaa itsensä | sama | ympäristö (ei WebKitiä) |
| 25 muuta | vihreä | — | — |

**En korjannut yhtäkään näistä** — ohjeesi mukaan aidot peliviat
raportoidaan eikä korjata tässä erässä ilman lupaa. Tässä ne
tärkeysjärjestyksessä:

1. **`savuke-pro-tuottaja` kaatuu heti alkuun (todennäköisin aito
   vika).** Punainen mainissa kolmessa ajossa kolmesta. Pro-osion
   kirjautuminen ei etene: mock-worker saa kyllä `POST /pro-tarkista`
   (näkyy kutsulistassa), mutta väärän parin virheviesti ei ilmesty
   `.pro-kirjautuminen .periaate-huomio`-elementtiin viidessä
   sekunnissa, ja savuke kuolee käsittelemättömään `aikakatkaisu`-
   poikkeukseen (`tools/savukkeet/savuke-pro-tuottaja.mjs:161`) sen
   sijaan että kirjaisi FAILin. Kaikki neljä osiota (kirjautuminen,
   pro-näkymä, profiilin lähetys, työhuone) jäävät mittaamatta.
   Sivutuote: savukkeen pitäisi kaatua siististi FAILiin, ei
   poikkeukseen.
2. **`savuke-nappula` 7b ja 7c: nappularyhmä on laattaa leveämpi**
   (laatta 12,09, ryhmä 12,73, hahmo 8,87 — ryhmä yli reunan 0,32
   kummallakin puolella). Luvut ovat mainissa täsmälleen samat, eli
   kyse on deterministisestä geometriasta eikä ajoituksesta:
   joko laatta on kutistunut (v1371, "kaupunkien laatat 30 %
   pienemmiksi") tai varjo on kasvanut. Pelaajalle näkyvä asia.
3. **`savuke-kehittajalehti`: Tilastot-lehden leveä taulu vierittää
   koko korttia** (`korttiVieritys: true`, pitäisi olla false;
   kotelo vierittyy oikein). Kehittäjätilan lehti, ei siis pelaajan
   pinta — mutta väite on rikki mainissa.
4. **`savuke-fokusvirta`: kartan oma panorointi ei liiku kortin
   ulkopuolelta** puhelinleveydellä (panX/panY eivät muutu vedosta
   lainkaan: −720 / −581,5 ennen ja jälkeen, vara 1440/1163). Sama
   mainissa. Tämä voi olla aito panorointilukko fokusvirran kortin
   ollessa auki.
5. **`savuke-maailmanakyma` 3a ja 4: longtask-budjetit ylittyvät.**
   Tämä on juuri se luokka, josta varoitit. Mittasin mainissa kolme
   kertaa: 3a antoi 385 / 569 / 908 ms (raja 350) ja 4 antoi
   1118 / 1173 / 917 ms (raja 750). **Punainen joka ajossa, mutta
   hajonta on 2,4-kertainen** — kontti on selvästi kuormittunut.
   **En löysentänyt budjettia**, koska kone on hidas; nämä on
   mitattava uudelleen rauhallisessa kontissa ennen kuin sanotaan,
   onko kyseessä vika vai kuorma.
6. **`savuke-mediakanava`: "WebAudio-konteksti on käynnissä —
   suspended".** Sama mainissa. Tämä on todennäköisesti kontin
   äänetön Chromium (ei autoplay-lupaa) eikä pelin vika, mutta en
   varmistanut sitä laitteella.
7. **`savuke-laattapyramidi`** vaatii generoidut laatat
   (`tools/generoi-laattapyramidi.mjs`), enkä ajanut generointi-
   työnkulkua ohjeesi mukaan. **`savuke-webkit-eleet`** ohittaa
   itsensä, koska WebKitiä ei ole asennettu (`npx playwright install
   webkit`). Kumpikaan ei ole vika.

## 5. Portit

Kaikki portit ajettu PUHTAASSA worktreessä (`/tmp/claude-0/wt-savukkeet`,
vain tämän haaran sisältö) — ensimmäinen ajo oli jaetussa työkopiossa
ja sen luvut sisälsivät toisen session testit, joten ne on ajettu
uudelleen:

- `node --test tests/*.test.mjs` → `# tests 1048`, `# pass 1047`,
  `# fail 0`, `# skipped 1`
- `node tools/tarkista-kaksoisavaimet.mjs` → *ei kaksoisavaimia*
- `node tools/tarkista-savukkeet.mjs` → *savukkeet kunnossa: 697
  ui-viittausta, 320 metodia, 436 kenttää, 31 lehtitilan kenttää*
- `node tools/build-standalone.mjs` → `dist/matkakirja.html` 20 461 kt
- `dist/` ja `node_modules` poistettu ennen committia; haaralla vain
  kolme lähdetiedostoa ja tämä raportti.

## 6. Mitä EN tehnyt

- En koskenut `js/tyohuone-raamattu.js`:ään, tarinakaanoniin,
  `tools/fokuskartta/`-hakemistoon, `js/fokusryhmat.js`:ään,
  `js/karttanimet.js`:ään enkä `js/fokusniput.js`:ään.
- En nostanut versiota, en tehnyt PR:ää, en ajanut pyramidin
  generointityönkulkua.
- En poistanut yhtäkään väitettä enkä löysentänyt yhtäkään
  aikabudjettia.

---

# Opus → Fable: "välillä kartta ei piirry ollenkaan" — korjattu (31.8.2026)

Haara `claude/laattojen-esilataus` otettu **puhtaana tuoreesta
origin/mainista** (fda3c08f, v1377) ja siinä on vain tämä korjaus.
Ei versionostoa, ei PR:ää. Muutetut tiedostot: `js/laattapyramidi.js`,
`tools/savukkeet/savuke-laattapyramidi.mjs`,
`docs/moduulit/laattapyramidi.md` (uusi luku 6i). Perustelut ja luvut
ovat myös koodin kommenteissa, kuten pyysit.

## 1. Diagnoosisi oli oikea — ja mittaus löysi kolmannen syyn

Toistin vian ensin. Se ei toistu lämpimällä alueella eikä nopealla
yhteydellä; kolme tekijää tarvitaan yhtä aikaa:

1. kylmä välimuisti (se maailmankolkka ei ole käynyt selaimessa),
2. puhelinyhteys (400 kbit/s, 400 ms) — kytkettynä VASTA käynnistyksen
   jälkeen, kuten omistajalla,
3. kaksi tason vaihtoa peräkkäin ennen kuin edellisen tason laatat
   ehtivät perille (neljä porrasta 150 ms välein).

Näin v1375 antaa **peiton 0 % 202 näytteessä 208:sta** — kartta on poissa
noin kuusi sekuntia. Kuvakaappaus vastaa omistajan kuvausta rivi
riviltä: pergamentti, ja päällä vain nimet, pisteet ja viivaimen
asteluvut.

Syitä oli kolme, ei yksi:

1. **(sinun diagnoosisi)** tason vaihdossa katkaistiin jokainen
   latautumaton vanhan tason laatta → alle ei jäänyt mitään;
2. **(sinun diagnoosisi)** karkea pohja seurasi terävää tasoa ja kulki
   saman katkaisun läpi → molemmat kerrokset saattoivat tyhjentyä
   samalla hetkellä;
3. **(uusi)** `VANHAN_TASON_KATTO_MS` poisti vanhan tason kahdessa
   sekunnissa riippumatta siitä, oliko tilalle tullut mitään.

## 2. Kumpi ehdotuksistasi riitti? Kumpikaan yksinään ei

Sama resepti, sama kone, neljä koodia:

| koodi | tyhjiä näytteitä | pienin peitto |
| --- | --- | --- |
| v1375 (vika) | **202 / 208** | 0 % |
| vain pohjan naulaus (ehdotus 1) | 120 / 204 | 0 % |
| vain katkaisun kavennus (ehdotus 2) | 151 / 211 | 0 % |
| naulaus + katto karsii + kavennus | **0 / 237** | 100 % |

Naulaus yksin kaatuu aikakattoon (syy 3). Kavennus yksin ei auta, koska
kylmällä välimuistilla säästetty laatta ei näytä mitään ennen kuin se
saapuu — ja se vie kaistaa uuden tason laatoilta: peitto palasi vasta
25,7 s kohdalla.

## 3. Mitä tein — ja missä poikkesin kirjaimellisesta ohjeestasi

**1. Pohja naulattu tasolle z3, ehdottomasti.** Kokeilin ensin
lievempää muotoa "seuraa terävää tasoa, enintään z3" — se mitattiin
riittämättömäksi: pohjan taso vaihtui yhä rajalla z4 ↔ z5, ja kymmenen
nopean portaan sarjassa (molempiin suuntiin) ruutu tyhjeni uudestaan,
202 näytettä 233:sta. Ehdottomana naulaus pitää saman sarjan 100 %:ssa
(0 / 249). Hinta on kertaluonteinen: koko maailma on z3:lla 77 laattaa
(~2 Mt), ja peli aloittaa maailmanäkymästä, joten ne ovat lämpiminä jo
ennen ensimmäistä lähikuvaa. Kiinnitettynä pohjaa on 6 laattaa z7:llä
(ennen 45) — **pohja on nyt kevyempi kuin ennen korjausta.**

**2. Katkaisun kavennus VAIN alimmalle kerrokselle.** Tämä on ainoa
kohta, jossa poikkesin ohjeestasi, ja se on mitattu: kun kavennus
annettiin molemmille kerroksille, puussa oli 82…114 kuvaa 47…62:n
sijaan ja nipistyksen longtask-summa nousi 899 ms:iin (main 710 ms) —
eikä se estänyt yhtään tyhjää, jota naulattu pohja ei jo estänyt.
Sääntö on nyt: *se kerros, jonka alla ei ole mitään, ei heitä pois
ruudulla olevaa laattaa; ylempi saa, koska pohja kantaa sillä välin.*
Uloimmilla tasoilla (z0…z3) pohjakerrosta ei ole, jolloin tarkasta
kerroksesta tulee alin ja sääntö siirtyy sille automaattisesti.

**3. Aikakatto karsii, ei tyhjennä.** Katto poistaa vanhasta tasosta
enää sen, mikä ei ole ruudulla.

Katkaisua ei purettu: se on yhä voimassa sille kerrokselle, jonka alla
on pohja — eli juuri siinä, mistä zoomin nopeus tuli.

## 4. Todennus

- Toistoresepti korjatulla: **0 tyhjää näytettä 249:stä** (10 porrasta
  molempiin suuntiin) ja **0 / 263** rankimmassa ajossa (14 porrasta
  100 ms välein, 200 kbit/s, 500 ms viive).
- Kuvakaappaukset ennen/jälkeen samasta hetkestä: ennen pelkkä
  pergamentti + elävä kerros, jälkeen täysi kartta.
- v1375:n luvut pitävät: panoroinnin pienin peitto 100 %, zoomin
  terävöityminen 62…197 ms, purettu muisti **30,4 Mt** (oli 35,7 Mt).
- **Uusi savukeväite P7e**: kahdeksan zoomiporrasta 150 ms välein, ja
  laattavastauksia viivästetään 500 ms; väite kaatuu, jos peitto putoaa
  nollaan. Todennettu molempiin suuntiin: **kaatuu v1375:llä** (0 %,
  42 tyhjää näytettä 194:stä), **menee läpi korjatulla** (100 %). Juuri
  tällaisen väitteen puuttuminen päästi vian läpi.

## 5. Portit

- `node --test tests/*.test.mjs` → **1047 pass / 0 fail** (1 skipped)
- `tarkista-kaksoisavaimet` → ei kaksoisavaimia ·
  `tarkista-niputus` → 293 moduulia, ei törmäyksiä
- `node tools/build-standalone.mjs` → ok, `dist/` poistettu
- savuke-laattapyramidi (oikeat R2-laatat peilattuna) → **18/18**
- savuke-panorointi → 11/11 · savuke-kartan-sujuvuus → 40/40

## 6. Yksi asia, joka sinun on hyvä tietää ennen julkaisua

`savuke-maailmanakyma.mjs`:n longtask-budjetit (3a raja 350 ms, 4 raja
750 ms) kaatuvat tässä kontissa **myös mainilla**: vuorottelevassa
A/B-ajossa (main, korjattu, main, korjattu…) väite 3a antoi mainilla
519/365/635 ms ja korjatulla 535/646/530 ms. Kontti on hidastunut päivän
mittaan — aamulla sama savuke meni läpi 16/16 — joten nämä budjetit
eivät juuri nyt kerro koodista mitään. Nipistyksen summa on korjatulla
noin neljänneksen suurempi (913 ms vs. 718 ms), koska vanhan tason
ruudulla olevat laatat elävät hetken uuden alla; se on suora hinta siitä,
ettei ruutu saa tyhjentyä. Jos haluat budjetin takaisin, säätimet ovat
`VANHAN_TASON_KATTO_MS` ja pohjan reunus `KARKEA_RUUTUJA` — mutta
molemmat ostavat sen ruudun tyhjyydellä, joten en säätänyt niitä itse.

---

# Opus → Fable: laattojen esilataus ja zoomin hitaus (haara claude/laattojen-esilataus)

Erä valmis, pushattu haaralle. **Ei PR:ää, ei versionostoa** (ohjeen
mukaan). Kaikki muutokset: `js/laattapyramidi.js`,
`tools/savukkeet/savuke-laattapyramidi.mjs`,
`docs/moduulit/laattapyramidi.md` (uusi luku 6h). **js/ui.js:ään ei
koskettu lainkaan** — panoroinnin suunta luetaan näkymän keskipisteen
siirtymästä moduulin sisällä.

## 1. Mitä oli vialla ja mitä tehtiin

**Panorointi.** `PUSKURI = 1` oli yksi laatta ≈ 120 CSS-pikseliä. Yksi
sormenveto paljastaa moninkertaisesti enemmän, ja koska laattoja ei
kiinnitetä kesken eleen (omistajan linjaus *"lataus siis aina vain juuri
kun sormi irtoaa"*), ruudulle jäi tyhjä pergamentti. Todennettu
kuvakaappauksella — sama näkymä kuin omistajan kuvassa.

**Ratkaisu on kahtiajako, ei reunuksen kasvattaminen:**

- **NOUTO** = verkko + selaimen HTTP-välimuisti. Laatta on 15–40 kt,
  ja ilman kiinnitystä siitä ei jää purettua bittikarttaa. → noudetaan
  **ruudun verran joka suuntaan**, kuten omistaja pyysi.
- **KIINNITYS** = DOM + purettu bittikartta, kallis vain ruudulla.
  → kiinnitetään **puoli ruutua** joka suuntaan + puoli panoroinnin
  suuntaan (suuntapainotus LISÄÄ, ei korvaa — kuten ohjeistit).
- **KARKEA POHJA** kaksi tasoa alempaa, kahden ruudullisen laajuudelta:
  1/16 laattoja samalle alalle. Tämä on se, mikä kattaa myös LIU'UN,
  jota mikään reunus ei voi kattaa.

**Zoom (laajennuksesi).** Molemmat nimeämäsi syyt pitivät paikkansa, ja
löysin kolmannen, joka oli niistä pahin:

1. Sääntö 2 ei ollut voimassa — korjattu: vanha taso jää alle kunnes
   uuden tason näkyvät laatat ovat load-tapahtuneet (katto 2 s).
2. Karkea pohjakerros lisätty (`KARKEA_ETAISYYS = 2`).
3. **Irrotettu `<image>` ei lopeta lataamista.** Mitattu: kolmen
   zoomiportaan jälkeen selain oli pyytänyt yli 700 laattaa, ja
   ohitettujen tasojen laatat valuivat sisään vielä kymmeniä sekunteja
   *sen tason edellä*, jota pelaaja katsoi — 1,5 Mbit/s:llä
   esilatauskin jäi kokonaan käynnistymättä sen taakse. Poistettavan
   laatan osoite nollataan nyt, mikä katkaisee haun.
4. Viereisten tasojen ennakkonouto (z ± 1) siltä alalta, joka
   zoomiportaan (1,5 ×) jälkeen näkyy — ei nykyinen ala toisella
   tarkkuudella, joka olisi z+1:llä nelinkertainen määrä.
5. `decoding="async"` + `fetchpriority` kaikille laatoille. Lisäksi
   **näkyvät laatat luodaan aina ennen reunuksen laattoja**: järjestys
   pätee joka selaimessa, fetchpriority on vain vihje.

## 2. Mitatut luvut (Chromium, iPhone 390 × 844 dpr 3, z7 Ateena)

Laatat paikallisesta peilistä oikeilla `immutable`-otsakkeilla (ei
Playwrightin routea — se ohittaa selaimen välimuistin, jolloin koko
esilatausta ei voisi mitata). Verkko kuristettu **1,5 Mbit/s + 200 ms**.
"Peitto" = kuinka suuri osa karttaruudusta on ladattujen laattojen alla.

| mitta | ennen (v1369) | jälkeen |
| --- | --- | --- |
| peitto näkymän asetuttua | 17,5 % | **100 %** |
| panorointi itään / ylös, pienin peitto | **0 %** | **100 %** |
| aika täyteen peittoon panoroinnin jälkeen | > 1 800 ms | **3–4 ms** |
| zoom ulos z7→z6, pienin peitto | **0 %** (tyhjä ruutu) | **100 %** |
| zoom ulos z6→z5, terävä kartta | > 6 000 ms | **69 ms** |
| zoom sisään z6→z7, terävä kartta | 246 ms | **68 ms** |
| kiinnitettyjä laattoja | 54 | 98 (karkeaa pohjaa 45) |
| niistä ruudulla | — | 34 |
| purettu muisti (ruudulla olevat) | 56,6 Mt* | **35,7 Mt** |
| sama kaava kaikille kiinnitetyille | 56,6 Mt | 102,8 Mt (yläraja) |
| siirtoa (sama skripti, nopea verkko) | 6,0 Mt | 19,8 Mt |

*Vanha mittari laski kaikki kiinnitetyt purettuina. **Se on väärin, ja
se mitattiin:** 54 → 238 kiinnitettyä laattaa nosti renderöijän RSS:ää
~80 Mt eli ~0,4 Mt/laatta, ei 1 Mt — selain purkaa kuvan vasta kun se
maalataan. Mittari raportoi nyt kaksi lukua: `muistiMt` (ruudulla
olevat) ja `muistiKattoMt` (vanha kaava, nyt yläraja).

**Silmillä todennettu** (kuvakaappaukset kesken pyyhkäisyn, iPhone- ja
iPad-profiili, kuristettu verkko): ennen ruudun yläkolmannes oli
paljasta pergamenttia; jälkeen kartta on täysi myös kolmen peräkkäisen
koko ruudun mittaisen rajun pyyhkäisyn ja niiden liukujen aikana.

## 3. Portit

- `node --test tests/*.test.mjs` → **1047 pass / 0 fail** (1 skipped)
- `tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `tools/tarkista-niputus.mjs` → 293 moduulia, ei törmäyksiä
- `node tools/build-standalone.mjs` → ok, `dist/` poistettu
- savuke-laattapyramidi (oikeat R2-laatat peilattuna) → **17/17**
- savuke-panorointi → 11/11 · savuke-kartan-sujuvuus → 40/40 ·
  savuke-maailmanakyma → 16/16

Savukkeeseen lisättiin P7a–P7d (karkea pohja on olemassa, esilataus
nouti laattoja, kiinnitettyjä on enemmän kuin ruudulla mutta muisti
maltillinen, **zoomatessa peitto ei putoa alle 98 %**). P5a korjattiin
vertaamaan vain saman tason laattoja: karkean pohjan laatat osuvat joka
neljännellä rivillä samalle y-arvolle, jolloin tasot sekaisin mitattuna
"rako" oli kolmen tarkan laatan levyinen — laatat olivat kyllä
paikallaan, mittari oli väärä.

## 4. Päätöksiä, jotka teit puolestani — ja mitä ne maksavat

- **Suuntapainotus** toteutettu sekä kiinnityksen lisäreunuksena
  (0,5 ruutua liikkeen suuntaan) että noutojonon järjestyksenä. Suunta
  luetaan näkymän keskipisteen siirtymästä, joten eleeseen tai ui.js:ään
  ei tarvinnut koskea.
- **Laatasto-bittikartta**: tuotannon `pyramidi.json` (2026-08-30b)
  kertoo `laatasto: null` kaikilla tasoilla eli kaikki laatat ovat
  olemassa. Esilataus kysyy silti `laattaOlemassa`-tarkistuksen kautta,
  joten harva pyramidi ei tuottaisi 404-ryöppyä. Mitattu: 0 epäonnistunutta.
- **Hinta on siirto.** Sama skripti siirtää nyt 19,8 Mt entisen 6,0 Mt
  sijaan — se on omistajan pyytämä ruudullinen joka suuntaan, ja R2:n
  ulosliikenne on maksutonta. Jos mobiilidata huolestuttaa, säädin on
  yksi vakio (`NOUTO_RUUTUJA`), ja viereisten tasojen ennakkonouto on
  jonon perällä eli hitaalla yhteydellä se jää luonnostaan tekemättä.
- **Päivityksen kustannus** nousi 0 ms → ~19 ms per asettunut näkymä
  (kaksinkertainen määrä DOM-solmuja). Se ajetaan kerran eleen lopussa,
  ei kehyksittäin; kehysaika panoroinnissa pysyi p50 16,7 / p95 17,2 ms.

## 5. Mitä EI tehty (rajaus)

- Ei versionostoa, ei PR:ää, ei generointityönkulkua.
- Ei koskettu `js/karttanimet.js`- eikä `js/fokuskohteet.js`-tiedostoihin
  (toinen agentti) eikä `tools/fokuskartta/`-piirtokoodiin (kolmas).
- Raamattuun, tarinaan tai isoisän raamattuun ei kirjoitettu.

## 6. Huomio jatkoa varten (ei korjattu, ei kuulunut erään)

Laattojen latausajat mitattiin kontista (ämpäriin 300–570 ms
välityspalvelimen kanssa). Kehysaika on emulaattoriluku; Raamattu vaatii
kehysajan mittaamisen oikealla iOS-laitteella, eikä tämä erä muuta sitä
vaatimusta. Karkean pohjan hyöty ja esilatauksen viive (300 ms) ovat
molemmat sellaisia, jotka kannattaa katsoa kerran oikealla iPadilla.

---

# Viesti Fablelle — kohdenimiöt yhteiseen ladontaan (haara claude/kohdenimiot)

*(Opus, 30.8.2026. Haara tuoreesta origin/mainista **1d64fa0b = v1369**.
Versiota EI nostettu, PR:ää EI tehty, pyramidin generointityönkulkua EI
ajettu — sinä julkaiset. dist/ ei ole mukana. `tools/fokuskartta/`-
piirtokoodiin ei koskettu: toinen agentti on siellä.)*

Sait minulle kuusi asiaa neljässä viestissä. **Kolme oli koodityötä ja
kolme oli kysymyksiä, joihin vastaus on mittaus.** Kaksi kysymystä
osoittautui siksi, ettei mitään ole rikki — ja yksi diagnoosi
osoittautui vääräksi, joten en tehnyt sitä työtä. Perustelut alla.

Portit: `node --test tests/*.test.mjs` → **# pass 1047, # fail 0**
(1 skipped, sama kuin mainissa). Kaksoisavaimet ja niputus puhtaat,
`build-standalone` kääntyy (20 393 kt), `dist` poistettu. Savukkeet:
fokuskohteet 96/96, maailmanakyma 16/16, kartta-tila 20/20, panorointi
11/11, kartan-sujuvuus 40/40.

---

## 1. Kohdenimiöt samaan ladontaan — TEHTY

Omistajan kortti: *"Sama ladonta kuin paikannimillä."* Kohdenimiöt
menevät nyt `js/karttanimet.js`:n ladontaan. **Omaa rinnakkaista
ladontaa ei tehty** — se oli juuri se vika.

**Vian mitta.** Kohdenimiön koko ei ollut minkään kartan oma mitta vaan
kahden kertoimen tulo: `NOSTOSYM_NIMIO_KOKO` 11 × `KOHDE_SYMBOLI_SKAALA`
11/21 = **5,8 CSS-pikseliä**. Paikannimet ovat 10,5–12. Ero oli siis
kaksinkertainen, ja se näkyi.

| | ENNEN | JÄLKEEN |
| --- | --- | --- |
| kohdenimiön korkeus ruudulla | 5,8 CSS-px (rasteriin paistettuna) | **11,0 CSS-px** |
| kohdenimiöitä Sofian näkymässä, skaala 1,355 | **18** | **12** |
| sama, skaala 2,710 | 18 | 17 |
| sama, skaala 9,214 (lähin) | 18 | 16 |
| sama, skaala 0,955 (kerros piilossa) | 0 | 0 |
| dpr 2 vs dpr 3 | — | **täsmälleen sama tulos** |

Viuhka katoaa siis itsestään, kuten kortilla luvattiin: kaukaa
kourallinen, lähempää useampi.

**Tärkeysjärjestys — päätös ja perustelu (kysyit tätä).** Olit oikeassa:
**kaupungin nimi voittaa.** Ladontajärjestys on kaupungit → kohteet →
maastonimet, ja perustelu on kirjoitettu koodiin:

1. Kaupunki on kartan perusrakennetta ja navigoinnin ankkuri; kohde on
   saman kaupungin yksityiskohta, ja sen kortti aukeaa merkkiä
   napauttamalla myös ilman nimeä. Kaupungin nimen katoaminen ei
   korvaudu millään.
2. **Kohde voittaa maastonimen** — tämän päätin itse, koska et sitä
   kysynyt. Maastonimi on kuvitusta, jota kartta latoo koko maailmaan;
   kohde on pelin omaa sisältöä ja vain siinä maassa, jossa pelaaja on.
   Kaksoisnimivaaraa ei synny: samanniminen kohde jättää nimiönsä pois
   jo lähteellä (`kohteenNimio` → `maastonimiLahella`).

**Yleistys ei tullut mittakaavakynnyksestä, ja se on kertomisen
arvoista.** Kynnys (`KYNNYS.kohdeNimi` 0,45) on sama luku kuin
kaupungeilla, mutta se ei tässä pure: kohdekerros on muutenkin piilossa
ennen kuin lehti täyttää puolet ruudusta, ja siihen mennessä kynnys on
ohitettu. Yleistyksen tekee **väljyysvara** (`NIMION_VALJYYS_X/Y`, 4 ja
5 CSS-px): nimi varaa itseään isomman laatikon, joten se vaatii oikeaa
paperia eikä pelkkää rakoa. Koska merkit elävät kartan mittakaavassa ja
nimet ruudun, rypään sarake levenee lähennettäessä ja päästää lisää
nimiä läpi. Se on sama idea kuin laattojen nimitiheyskynnyksissä, eri
mekanismilla, koska aineisto on erilainen.

**Merkit napautettavina ilman nimeä — todennettu.** Sofian näkymässä
ruudulla oli 6 nimetöntä ja 17 nimellistä merkkiä. Kokeilin kolme
nimetöntä: *Veliko Tarnovo*, *Balkanvuoret* ja *Plovdiv* avasivat
kaikki korttinsa napautuksesta. (Plovdiv näytti ensin kaatuvan, mutta
se oli kokeeni valitsin: sen kortti on `nahtavyys-kortti`, ei
`fokuskohde-popup`. Kortti aukesi.)

## 2. Nostot — jäivät, kuten korjasit

Osoitinviivat jäivät. Kaksi tarkennusta siitä, mitä ruudulla oikeasti
on, koska nimitys meni viesteissä ristiin:

- Kuvakaappauksen katkoviivat ovat **rypään yhdysviivoja** kaupungista
  siirretylle merkille (`js/fokusniput.js`, omistajan tilaus 27.8.).
  Ne eivät ole nimiön ja merkin välisiä. Ne jäivät koskematta
  rakenteeltaan — merkit siirretään yhä sarakkeeksi, koska muuten ne
  kasautuisivat kaupungin pisteen alle eikä niitä voisi napauttaa.
- **Nimi kiinnittyy nyt merkkiinsä**, ei kaupunkiin, joten ketju
  kaupunki → katkoviiva → merkki → nimi pysyy kasassa ja viiva seuraa
  nimeä sinne minne se asettuu. Tämän lisäksi ladonta piirtää **oman
  noston** silloin kun nimi ei mahdu merkin neljään kylkeen: 14 tai 26
  CSS-pikseliä, katkoviiva merkin reunalta nimen viereen. Pidempää ei
  ole — pitkä nosto ei enää kerro kenen nimi on kyseessä, ja silloin
  nimen kuuluu pudota. Paksuus ja katkot ovat **CSS-pikseleitä**
  (paperivakio), kuten pyysit.

Omistajan Ateena-toiveet tehtiin samalla: **katkoviiva kevyemmäksi**
(paksuus 1,2 → 0,8, himmeys 0,42 → 0,3, katko 2,6 → 2,0) ja **sarake
lähemmäs kaupunkia** (`NIPPU_DX` 37 → 28 px). Ateenan litania on
purkautunut: Maratonhuijaus, Elginin marmorit, Akropolis, Marathon ja
Antiikin agora ovat luettavina eri kohdissa eivätkä pinona.

## 3. Maan harmaa sävytys — POISTETTU

`.country-tint` on poissa **koodina eikä CSS-piilotuksena**, kuten
pyysit. Mukana lähtivät sen kerros (`g.country-borders`) ja sen rajaus
(`clipPath#maa-rajaus`): kumpikin oli olemassa vain sävytystä varten.
`drawCountryBorders` jäi siivoamaan maaselaimen kyltin, ei muuta.
Savuke `kartan-sujuvuus` odotti sävytystä — käänsin väitteen
päinvastaiseksi (nyt vaaditaan, ettei kerrosta ole).

**Kysyit jääkö maa ilman visuaalista vihjettä. Ei jää**, ja kaksi
merkkiä on yhä paikallaan:

1. **Kartuutsi vasemmassa alanurkassa** — "BULGARIA · България ·
   osmanivaltakuntaa v. 1873". Näkyy kaikissa kuvakaappauksissani.
2. **Fokusmoodin sumuverho** jättää nykyisen maan ainoaksi tarkaksi ja
   täysvärisenä piirretyksi alueeksi; naapurimaat ovat harmaana
   harson alla. Tämä on itse asiassa vahvempi vihje kuin sävy oli.

En keksinyt korviketta, kuten ohjeistit.

---

# Kolme kysymystä, joihin vastaus on mittaus

## 4. "Miksi osa ympyrä ja osa soikio?" — EI OLE MITTAKAAVAVIKA

**Epäilysi epäuniformista viewBox-mittakaavasta on mitattu vääräksi.**
Luin vaaka- ja pystymittakaavan erikseen kolmessa näkymässä, myös siinä
`kokoLeveys`-haarassa, jota epäilit:

| näkymä | viewBox vaaka | viewBox pysty |
| --- | --- | --- |
| lähikuva | 2,710000 | 2,710000 |
| keskinäkymä | 1,355000 | 1,355000 |
| kokoleveys / sauma | 0,955167 | 0,955167 |

Samat kuuden desimaalin tarkkuudella. (Syy: `nakyvaKorkeus = korkeus /
skaala` antaa pystyyn tasan `skaala`, ja vaakaan pyöristysvirhe on
puoli pikseliä yli 11 600:n eli 0,004 %.)

**Merkit samoissa näkymissä:**

| | leveys/korkeus |
| --- | --- |
| `karttanimet`-merkit (`.karttamerkki-piste`, `-rengas`) | **0,9999 … 1,0001** |
| pelin omat kaupunkilaatat (`.cities .city`) | **0,9104 … 1,0634** |

**Syy on siis pelin omissa kaupunkilaatoissa, ja se on tarkoituksellinen.**
`js/ui.js drawBoard` piirtää ne `<ellipse>`-elementteinä, joiden `rx` ja
`ry` saavat kumpikin oman satunnaisen heilahduksensa
(`vary('city:rx:…', 0.7)` ja `vary('city:ry:…', 0.7)`) plus kiertymän —
käsin piirretyn kartan tuntu. Perussäde on 11,6, joten ero voi olla
kuusi prosenttia suuntaansa, ja **jokainen kaupunki on eri lailla
soikea**.

Se, että tämä alkoi näkyä nyt, on uuden nimikerroksen ansiota: sen
`karttamerkki-piste` on **täydellinen ympyrä keskellä samaa merkintää**,
jonka ulkorengas on käsivarainen soikio. Kahden perheen erimielisyys on
saman merkin sisällä, ja siksi silmä poimii sen.

**En muuttanut sitä.** Heilahdus on kartan tyyliä eikä vika, ja sen
poistaminen on ulkoasupäätös — omistajan, ei minun. **Jos hän haluaa
merkeistä pyöreitä, se on kahden rivin muutos** (`ry = rx`
`drawBoard`issa), ja se koskee kaikkia lautoja. Sano, niin teen sen.

## 5. "Välillä pieni, välillä iso piste" — SÄÄNTÖ ON KUNNOSSA, MUTTA SYY ON TOINEN

Kaksi asiaa, ja kumpikaan ei ole rikki.

**a) `c.airport` on staattista kaupunkidataa, ei pelitilaa.** Vastaus
kysymykseesi 1: se on kiinteä kentän arvo `js/packs/maailmankartta.js`:ssä
(62 kaupungilla `"airport":true`), eikä sitä aseteta koodissa
kertaakaan — grep löytää vain lukijoita. Sama koskee `c.start`ia (19
kaupunkia). **`iso` ei siis voi muuttua pelin aikana**, eikä
välimuistin mitätöintiä tarvita. Kysymyksesi 2 raukeaa.

**Ja kuvasi 1 vahvistaa säännön täsmälleen:** tarkistin ne kaupungit,
jotka luettelit. Praha, Wien, Budapest, Krakova, Venetsia ja Firenze:
**ei `airport`ia eikä `start`ia** → pieni paljas piste. Rooma:
`"airport":true` → rengas. Juuri niin kuin kuvassa. Rengas tarkoittaa
lentoyhteyttä, ja se on mielekästä pelitietoa.

**b) Kuvassa 2 ne olivat kuitenkin isoja — koska ne ovat eri merkkejä.**
Kaupungeilla on kartalla **kaksi merkkiperhettä**, ja ne eivät tiedä
toisistaan:

| perhe | mistä | koko | rengas |
| --- | --- | --- | --- |
| pelin kaupunkilaatta (`.cities .city`) | js/ui.js drawBoard | säde 11,6 (start 20) lautayksikköä | aina |
| nimikerroksen merkki (`.karttamerkki-*`) | js/karttanimet.js | 2,0–2,6 CSS-px | vain `iso` |

Mittasin ne samasta näkymästä: laatta ~24 CSS-px, nimikerroksen piste
4,0–5,2 CSS-px. **Se on se "pieni ja iso".** Kumpi näkyy, riippuu
näkymästä: kuvassasi 1 lauta oli vielä asettumatta (huomasit itsekin
puolivalmiin kartan), jolloin ruudulla oli vain nimikerroksen pienet
pisteet.

**Kirjaan tämän havaintona enkä korjaa sitä:** pyramidilaudalla sama
kaupunki saa nyt kaksi merkkiä päällekkäin, ja niiden koot ja säännöt
eroavat. Se on suurempi linjauskysymys kuin tämä erä — kumpi perhe on
pyramidilaudan kaupunkimerkki? — ja se on sinun ja omistajan
päätettävä. En koskenut siihen.

## 6. Skandaalien koordinaatit — DIAGNOOSI EI PIDÄ PAIKKAANSA, EN TEHNYT TYÖTÄ

Pyysit projisoimaan 83 skandaalin lat/lon laudan koordinaateiksi, koska
`grep maailmankartta js/packs/skandaalit.js` antoi 0 osumaa. **Osuma on
0, mutta johtopäätös ei seuraa siitä: skandaalit projisoidaan jo, vain
ajossa eikä datassa.**

`js/skandaalit.js skandaaliLisakohteet` kutsuu
`projisoiLaudalle(lauta, skandaali.lon, skandaali.lat)`
(`js/fokusmitat.js`), joka lukee juuri ne vakiot jotka annoit:
`FOKUS_LAUTAPROJEKTIOT.maailmankartta = { miller, leveys 12000,
lon0 −175, pohjoinen 76 }`. Siksi laudan koordinaatteja ei ole
tiedostossa — niitä ei kuulukaan olla, ja sama data palvelee jokaista
lautaa.

Ajoin sen läpi ja mittasin tuloksen:

- **83/83 projisoituu**, nolla epäonnistumista
- **83/83 päätyy uniikkiin pisteeseen** — yksikään ei putoa kaupungin
  pisteeseen
- Elginin marmorit → (6624,22 / 1881,94), **0,48 lautayksikköä**
  Ateenan pisteestä (6624,7 / 1882,0). Se ON Akropoliin kohdalla.
- Maratonhuijaus → (6624,70 / 1882,06), 0,06 yksikköä Ateenasta —
  Panathinaikon-stadion, kuten sanoit.

**Litanian syy on mittakaava, ei data.** Yksi lautayksikkö on
päiväntasaajalla noin 3,3 km, ja rypäytyssääntö nappaa kaiken, mikä on
noin 12 lautayksikön (≈ 35 km) sisällä kaupungista. Ateenan
nähtävyydet ja Ateenan skandaalit ovat kaikki sen sisällä — **42 kaikista
83:sta skandaalista** on. Ne eivät voi hajota datalla, koska ne
oikeasti ovat samassa kaupungissa.

Se on siis kohtasi 4 (*"aidosti samassa pisteessä olevat… ratkaise se
ladonnalla"*), ja **se on ratkaistu** ladonnalla ja väljyysvaralla
kohdassa 1. En muuttanut yhtäkään lat/lon-arvoa enkä lisännyt yhtäkään
lautakoordinaattia — data on sinun aluettasi, eikä siinä ollut mitään
korjattavaa.

---

## 7. Mitä muutin tiedostoittain

| tiedosto | mitä |
| --- | --- |
| `js/karttanimet.js` | kohdenimiöt ladontaan (`asetaKohdenimet`, `karttanimetLatovat`), noston viivat, väljyysvara |
| `js/fokuskohteet.js` | `luovutaKohdeNimiot`: antaa nimet ladontaan, sammuttaa omat; merkit ja osumat ennallaan |
| `js/fokusniput.js` | yhdysviiva kevyemmäksi, sarake lähemmäs kaupunkia |
| `js/ui.js` | maan sävytys, sen kerros ja rajaus poistettu; nimikerros ajetaan kohdemerkkien jälkeen |
| `css/styles.css` | `.karttanimi-kohde`, `.karttanimi-nosto`; `.country-tint` poistettu |
| `tools/savuke-kartan-sujuvuus.mjs` | sävytysväite käännetty |
| `docs/moduulit/laattapyramidi.md` | uusi luku 6g.5 |

## 8. Miten todensin

- `node --test tests/*.test.mjs` → 1047 pass / 0 fail / 1 skipped
- kaksoisavaimet, niputus, `build-standalone`, `dist` poistettu
- savukkeet: fokuskohteet 96/96, maailmanakyma 16/16, kartta-tila
  20/20, panorointi 11/11, kartan-sujuvuus 40/40
- **peli ajettu tuotannon oikeilla laatoilla** (ämpärin luettelo
  2026-08-30b, `nimiot: false`) Chromiumissa iPadin mitoilla
  834×1112 — laatat noudettiin Noden kautta, koska kontin selain ei
  näe verkkoa
- **kuvakaappaukset katsottu ennen ja jälkeen** samasta näkymästä,
  Sofiasta ja Ateenasta, **dpr 2 ja dpr 3**
- napautuskoe pudotetun nimen merkeille
- merkkien ruutusuhteet ja viewBoxin vaaka/pystymittakaava mitattu
  kolmesta näkymästä (kohta 4)
- skandaalien projisointi ajettu läpi kaikille 83:lle (kohta 6)

## 9. Avoimet — sinulle ja omistajalle

1. **Kaupunkilaattojen soikeus** (kohta 4): tyylipäätös. Kahden rivin
   korjaus jos halutaan pyöreiksi.
2. **Kaksi kaupunkimerkkiperhettä pyramidilaudalla** (kohta 5b):
   linjauskysymys, kumpi on kaupungin merkki.
3. **Skandaalien data on kunnossa** (kohta 6) — ei tehtävää.

---

# Viesti Fablelle — laattojen viivatyö (haara claude/rantaviivan-kohdistus)

*(Opus, 30.8.2026. Haara alun perin **1d64fa0b = v1369**, rebasettu
main-kärkeen **535311f3 = v1372** (v1370 syvyysramppi, v1371 kaupunkien
laatat, v1372 selitenappi) — rebase meni puhtaasti, ja portit ajettiin
uudestaan sen jälkeen.
Versiota EI nostettu, PR:ää EI tehty, pyramidin generointityönkulkua EI
ajettu — sinä julkaiset ja pyydät omistajalta luvan ajoon. dist/ ei ole
mukana. js/-puoleen ei koskettu lainkaan.*

*Edellinen raportti (nimet laatoista peliin) on gitissä commitissa
1d64fa0b.)*

---

## LYHYESTI

Neljä omistajan havaintoa, kaikki laattoihin poltettavaa viivatyötä,
kaikki samassa erässä koska kaikki vaativat saman pyramidin ajon.

| # | havainto | tila |
| --- | --- | --- |
| 1 | *"Ääriviiva ja korkeus väritys eivät täsmää."* | korjattu, syy mitattu ja todennettu |
| 2 | *"Joet eivät mutkittele pehmeästi vaan kantikkaasti."* | korjattu |
| 3 | *"Poista pituus ja leveyspiiri viivat. Jätä vain 0 ja päiväntasaaja sekä kääntöpiirit ja napapiiri ja nimeä ne."* | tehty |
| 4 | *"Kaupunkien välissä pitäisi näkyä nopanheitto askelmat…"* | tehty, **yksi datakysymys sinulle** (kohta 4) |

Portit: `node --test tests/*.test.mjs` **1047 pass / 0 fail** (sama kuin
main), `tarkista-kaksoisavaimet` ei kaksoisavaimia,
`tarkista-niputus` kunnossa, `build-standalone` ajettu ja `dist/`
poistettu.

Muutetut tiedostot — **kaikki tools/-puolella**:

| tiedosto | mitä |
| --- | --- |
| `tools/fokuskartta/maailma.mjs` | `meriRenkaat` (uusi), `rannikot` johdetaan siitä |
| `tools/fokuskartta/maailmapiirto.js` | maa/meri vektorista, jokien käyrä, erikoispiirit, reittien askelmat |
| `tools/fokuskartta/sisalto.mjs` | reitit ratana askelmineen, meri/maa erotettu |
| `tools/generoi-laattapyramidi.mjs` | renkaat aineisto.jsoniin |
| `docs/moduulit/laattapyramidi.md` | luvut 6h–6l (mittaukset) |

**Moottori ei ole enää jaettu.** Tarkistin sen ennen kuin muutin mitään:
`tools/tee-yleislehti.mjs` ei ole enää olemassa, ja
`grep "fokuskartta/maailma"` löytää tasan yhden kutsujan —
`tools/generoi-laattapyramidi.mjs`. Näiden kahden tiedoston ainoa
käyttö on siis pyramidi, eikä md5-vertailua vanhaan lehteen ole mihin
tehdä. Maalehtien moottori (`piirto.js`) ja `aineisto.mjs` ovat
koskemattomat, ja niiden lukema merimaski jää paikalleen.

---

## 1. Ääriviiva ja maaväri — hypoteesisi piti paikkansa, ja tässä ovat luvut

Syy oli tasan se, minkä arvelit: **rantaviiva vektoreista, maa/meri-jako
rasterista.** Mutta en luottanut siihen vaan mittasin, ja mittaus
muuttaa yhden asian arviossasi: ero ei ole tasaisesti "5 km", vaan se
riippuu rannikon rikkonaisuudesta enemmän kuin ruudun koosta.

Mittatapa: kummankin lähteen maa/meri-vastaus laskettiin TÄSMÄLLEEN
samoille kuvapikseleille kuin moottori ne laskee (sama projektio, sama
bilineaarinen korkeus, sama maski), ja verrattiin.

- **siirtymä** = kuvarivillä mitattu etäisyys vektorin rantaviivan ja
  moottorin värinvaihdoksen välillä (mediaani; 40 px on mittarin katto)
- **vuoto** = erimielisen pikselin etäisyys rantaviivaan

| alue | z5 | z6 | z7 | vuoto enimmillään | eri-% (z7) |
| --- | --- | --- | --- | --- | --- |
| Egeanmeri (omistajan kuvakaappaus) | 1,0 px | 2,5 px | **5,5 px** | 21 px | 3,8 % |
| Länsi-Afrikka (sileä rannikko) | 4,0 px | 3,5 px | **13,0 px** | 11 px | 1,4 % |
| Norja (vuonot) | 20 px | 40 px | **yli 40 px** | 48 px | 10,5 % |
| Chile (saaristo) | 22 px | 32 px | **yli 40 px** | 23 px | 12,3 % |

Kaksi asiaa, jotka kannattaa lukea tästä:

1. **Kilometreinä ero pysyy samana, joten pikseleinä se
   kaksinkertaistuu joka tasolla.** Siksi omistaja näki sen vasta
   lähikuvassa — z3:lla se on nolla.
2. **Egeanmeren otoksessa 9 saarta 29:stä jäi kokonaan ilman
   maaväriä** — pelkkä ääriviiva meren päällä. Se on se, minkä silmä
   poimii ensin, eikä se näy siirtymäluvussa lainkaan.

Sileä rannikko (Länsi-Afrikka) on z7:llä 13 px pielessä, mutta siellä
se näkyy vain vyönä; rikkonaisella rannikolla ruudukko ei näe vuonoja
lainkaan ja koko maa/meri-kuvio on väärä.

### Korjaus

Tein täsmälleen sen, minkä ehdotit, ja vein sen yhden askelen
pidemmälle: **`rannikot` JOHDETAAN nyt samasta harvennetusta
rengasjoukosta, josta täyttö lasketaan.** Ei siis kahta rinnakkaista
polkua samasta lähteestä vaan yksi lista kärkipisteitä kahdessa
muodossa. Viiva ja täyttö eivät voi ajautua erilleen edes
periaatteessa.

Maski lasketaan juovapyyhkäisynä suoraan kuvan tarkkuudella (Millerissä
kuvarivi on tasan yksi leveyspiiri), joten välirasteria ei ole.

**Reunatapauksesi ratkesivat ilman uusia sääntöjä**, koska värit oli jo
kummassakin päässä leikattu — tämä oli minulle yllätys ja tarkistin sen
koodista:

| kysymyksesi | vastaus |
| --- | --- |
| matala meri rannan lähellä, kun ruudukko sanoo maata | `lerpSyvyys(m >= 0)` palauttaa matalimman merisävyn — juuri oikein |
| solu puoliksi maata, lähin ruudukkopiste merellä | `Math.max(0, m + kohina)` → hypsometrian alin sävy, eli rannikkoalanko |
| järvet ja sisävedet | olivat **jo** kunnossa: `ne_10m_lakes` piirretään ja täytetään samoista renkaista, joten ne leikkaavat maavärin pois nyt kuten ennenkin |
| Kaspianmeri / Kuollutmeri / Qattara | säilyivät ennallaan, koska ne ratkeavat siitä onko piste meren monikulmiossa |

### Suorituskyky — mitattu, koska pyysit

| mitta | ennen | jälkeen |
| --- | --- | --- |
| piirtoaika z6 (Eurooppa, 4x4-lohko) | 10,1 s | 10,3 s (**+2 %**) |
| piirtoaika z7 (Egeanmeri, 4x4-lohko) | 9,7 s | 10,0 s (**+3 %**) |
| tavua/px z6 (webp q0,9) | 0,265 | 0,266 (+0,4 %) |

**Monikulmioleikkaus ei moninkertaista piirtoa.** Juovapyyhkäisy tehdään
kerran koko kankaalle ja reunat indeksoidaan kerran koko ajolle, joten
lisätyö on 2–3 % eikä se kasva tasojen mukana. Ämpärin koko ei liiku.

### Todennettu silmillä

Ajoin samat alueet ennen ja jälkeen ja katsoin kuvat:

- **Norja z7** — tämä on selvin. Ennen: maaväri on karkea porrastus,
  joka on täysin irti ääriviivoista — harmaita meriläikkiä keskellä
  saaria, maaväriä vuonojen päällä. Jälkeen: jokainen vuono on vettä
  ja jokainen saari maata, ääriviivaan asti.
- **Chile z7** — ennen vuonot olivat lähes kokonaan maanvärisiä (ruudukko
  ei näe niitä), jälkeen jokainen haara on merta ääriviivaan asti.
- **Egeanmeri z7** — ennen useissa pikkusaarissa oli pelkkä ääriviiva
  ilman maaväriä; jälkeen kaikki ovat täynnä.
- **Peloponnesos z5** — ennallaan silmälle, kuten mittaus lupasi
  (siirtymä 1 px).

---

## 2. Joet kantikkaita — mitattu ensin, sitten silotettu

Ongelma on todellinen ja iso. Mitattuna (123 uomaa, 4 330 pistettä):

| taso | jakso mediaani | p90 | pisin |
| --- | --- | --- | --- |
| z3 | 6,0 px | 13,3 px | 55 px |
| z5 | 23,9 px | 53,4 px | 219 px |
| z6 | 47,9 px | 106,8 px | 438 px |
| z7 | **95,8 px** | 213,5 px | 875 px |

Taitteen mediaanikulma on **49 astetta**. Sadan pikselin välein
puolisuora kulma.

Käytin **sentripetaalista Catmull-Romia (alpha = 0,5)** kuten pyysit,
muunnettuna suoraan kuutiollisiksi Béziereiksi. Perustelu pitää
paikkansa juuri tässä aineistossa: pisin jakso on yli 200-kertainen
lyhimpään, eli pisteet ovat äärimmäisen epätasavälein, ja yhtenäinen
parametrisointi tekisi silmukoita.

**Jatkuvuus laattarajan yli**: silotus nojaa koko uomaan.
`sisalto.joet` on maailmanlaajuinen lista, jota mikään ei rajaa ennen
piirtoa, ja kärjet muunnetaan ARKIN pikseleiksi, jotka ovat samat joka
lohkossa — canvasin leikkuri hoitaa rajauksen vasta rasteroinnissa.
Lohkorajatesti alla (kohta 5): z6–z7 pahin 0.

**Rantaviiva ja järvet EIVÄT tarvitse tätä, ja se on mitattu:**
harvennettu rantaviiva on z7:llä mediaanina **3,55 px** jaksoa kohti
(järvet 3,38) eli 27 kertaa tiheämpi kuin joet. Ja tärkeämpi syy:
rantaviiva on nyt myös maan ja meren raja (kohta 1), joten viivan
silottaminen täyttöä silottamatta palauttaisi juuri sen eron, jonka
äsken korjasin. Reitit ovat kahden kaupungin janoja.

**Silmillä**: Jenisein terävä mutka z6:lla. Ennen: suora kulma ja
V-kärki. Jälkeen: pehmeä meandri, joka kulkee samojen pisteiden kautta,
ei silmukoita eikä yliampumista edes 149 asteen taitteessa.

**Hinta**: sisältyy yllä mitattuun 2–3 %:iin; joet ovat 4 207 jaksoa,
ja `bezierCurveTo` maksaa saman kuin `lineTo`.

---

## 3. Asteverkko pois, viisi piiriä nimineen

Tehty. Tasavälinen 20 asteen verkko on poistettu; jäljellä
nollameridiaani, päiväntasaaja, Kravun ja Kauriin kääntöpiirit
(±23,4365) ja pohjoinen napapiiri (66,5635 °N).

**Eteläinen napapiiri**: tarkistin arkin omista mitoista kuten pyysit
(`pyramidi.json` `rajaus`: y −611,31, h 6422,72 → 84 °N…66 °S). 66,56 °S
on reunan ulkopuolella. Ei piirretä, ei nimiötä, ei mainintaa avoimissa.

### Kynnys: en tarvinnut sitä, ja perustelu on rakenteellinen

Merten nimet ovat kartan mittakaavassa (`S`), koska nimi kuuluu
altaalle jonka se nimeää — siksi niillä ON pakko olla kynnys.

**Nämä nimet nimeävät VIIVAN, ja viivalla ei ole leveyttä, jonka mukaan
nimi kasvaisi.** Siksi ne ovat paperivakioita (`P`): 13 px joka
tasolla. Silloin ne eivät voi olla jättiläisiä syvässä zoomissa eivätkä
näkymättömiä uloimmalla — eli kynnyksen molemmat perusteet katoavat.
Ja koska nämä viivat kulkevat ruudun poikki joka tasolla, nimi on
mielekäs joka tasolla, aivan kuten arvelit.

Kynnyksen työn tekee **toistoväli**: nimi toistetaan noin 2 400
laitepikselin välein, jolloin näkymässä (puhelin 1 170, työpöytä
1 440–3 024) on korkeintaan yksi kappale kutakin nimeä. Määrä lasketaan
arkin mitoista, joten se on sama joka lohkossa:

| taso | z0–z2 | z3 | z4 | z5 | z6 | z7 |
| --- | --- | --- | --- | --- | --- | --- |
| nimiä viivaa kohti | 1 | 2 | 5 | 9 | 18 | 36 |

Jokaisella viivalla on oma faasi (0,17 / 0,26 / 0,5 / 0,74), koska
samalla faasilla kaikki neljä nimeä kasautuivat samaan
pystysarakkeeseen — näin kävi ensimmäisessä ajossa ja se näytti
tekstipalstalta. Nollameridiaanin päälle osuva kappale siirretään
sivuun oman leveytensä verran (z7:llä toistoväli osuu tasan asteelle 0).

### Nollameridiaanin nimi: "Nollameridiaani"

Perustelu on mitta eikä maku: nimi kulkee pystyviivan vartta, jolloin
sen pituus on korkeutta. "Greenwichin meridiaani" on 22 merkkiä eli
paperivakiona noin 150 px pystyyn, ja se leikkaisi kääntöpiirien
nimet. "Nollameridiaani" on 15 merkkiä, yksi sana, ja se on suomalaisen
kartaston oma termi juuri tälle viivalle.

### Todennettu silmillä

- **z0 (koko maailma)**: kaikki neljä viivaa ja viisi nimeä näkyvät ja
  ovat luettavia; asteverkkoa ei ole. Nimet hajautuvat eri kohtiin
  (napapiiri Kanadan yllä, Kravun kääntöpiiri Meksikon yllä,
  päiväntasaaja Afrikan yllä, Kauriin kääntöpiiri Intian valtameren
  yllä).
- **Päiväntasaaja z6 lähikuvassa**: kursiivi harvennettu nimi istuu
  viivan yläpuolella, sama kirjainkoko kuin z0:lla.
- **Kolme z6-laattaa vierekkäin päiväntasaajalla**: viiva jatkuu
  saumattomasti laatasta toiseen eikä nimi toistu — se on 2 400
  pikselin välein eli noin joka viidennessä laatassa.

### Havainto sinulle (en koskenut, koska se on js/-puolella)

`js/fokusmitat.js` piirtää ruudun laitoihin asteviivaimet ("22 °L",
"46 °P"). Ne osoittivat aiemmin kartan yli kulkeviin verkkoviivoihin;
nyt niitä ei ole. Viivaimet ovat yhä oikeita lukemia eivätkä valehtele,
mutta niiltä katosi visuaalinen vastine kartalla. **En koskenut niihin**
(toinen agentti on js/-puolella). Jos ne alkavat näyttää irrallisilta,
se on oma pieni erä.

---

## 4. Reittien askelmat — tehty, ja yksi asia jonka sinun pitää päättää

### Mitä selvitin (en olettanut)

| kysymyksesi | mitä data sanoo |
| --- | --- |
| miten merireitti erotetaan? | **`edges`-riveillä ON `type`-kenttä**: 111 riviä 408:sta on `type: 'sea'`. Sama kenttä, jota `tools/korjaa-merireitit.mjs` käyttää. Ei tarvinnut keksiä sääntöä. |
| miten askelmat jaetaan janalle? | **Vakiintunut tapa löytyi:** `js/rules.js` `edgePolyline` + `pointAlong(poly, idx/steps)`, tasavälein kaarenpituuden mukaan. Käytän niitä suoraan importtaamalla — en kirjoittanut omaa jakoa. |
| montako askelmaa kartalla on? | `steps` yhteensä **1 526**, piirrettyjä merkkejä **1 118** (steps − 1 reunaa kohti; idx 0 ja steps ovat kaupungit). |

Askelmien paikat tulevat siis pelin omista funktioista. Se on tässä
tärkeämpää kuin näyttää: jos työkalu jakaisi janan omalla kaavallaan,
laattaan poltettu ruutu ja nappulan pysähdyspaikka eroaisivat, ja se
olisi pelivirhe eikä ulkoasuvirhe.

### PÄÄTÖSKYSYMYS: lentoreiteillä ei ole askelmia

Tulkintasi oli *"askelmien on näyttävä kaikilla kolmella"*. **Se ei ole
mahdollista nykyisellä datalla eikä nykyisillä säännöillä**, ja kerron
sen sinulle enkä arvaa:

- `airRoutes`-riveillä on **vain `a` ja `b`** — ei `steps`-kenttää.
- Pelissä lentäminen **siirtää nappulan suoraan perille**:
  `js/game.js` `actionMannerLento` asettaa
  `p.pos = { type: 'city', city: cityId }`. Lennolla ei kuluteta
  nopanheittoa eikä pysähdytä matkan varrelle.

Lennolla ei siis ole ruutuja, joita piirtää. Piirsin lentoreitit
omistajan pyytämällä punaisella katkoviivalla ilman helmiä.
**Jos lentoon halutaan askelmat, se on pelimekaniikan muutos
(`steps` lentoreiteille ja lento matkana eikä hyppynä) — se on sinun ja
omistajan päätös, ei minun.**

Tästä syntyi sääntö, joka on mielestäni oikea ja jonka kerron
ääneen jotta voit kumota sen: **muste kertoo kulkutavan, helmet
kertovat askelmat, ja katkoviiva on varattu sille reitille, jolla ei
ole askelmia.**

| reitti | muste | viiva | helmet |
| --- | --- | --- | --- |
| maa (297) | seepia | yhtenäinen | kyllä |
| meri (111) | preussinsininen | yhtenäinen | kyllä |
| lento (71) | poltettu sinooperi | katkoviiva | ei |

### Värit

Preussinsininen (1706) on kaivertajan vakiosininen ja poltettu
sinooperi sen punainen. Käytin `rgba(32,60,98,0.56)` ja
`rgba(150,54,40,0.50)` — murrettuina niin, että ne erottuvat mutta
lukeutuvat musteeksi paperilla eivätkä näytön väriksi. Katsoin
lähikuvat: sininen luetaan siniseksi ja punainen punaiseksi, mutta
kumpikaan ei hyppää seepian päältä.

Askelmahelmi on paperivakio: 2,4 px säde, paperinvaalea täyttö ja
ohut musteinen kehä, eli asemamerkki radalla.

### Kynnys — mitattu, ei valittu

Reitit ilmestyvät jo nyt kynnyksellä `px >= 0,22` (z2). Askelvälit
ovat siellä p10 **11,4 px** ja mediaani **17,9 px**, joten 2,4 pikselin
helmet erottuvat toisistaan heti ensimmäisellä tasolla, jolla reitti
ylipäätään piirretään. **Omaa syvempää kynnystä ei tarvita.**

| taso | askelväli p10 | mediaani | p90 |
| --- | --- | --- | --- |
| z2 | 11,4 px | 17,9 px | 35,1 px |
| z4 | 45,4 px | 71,4 px | 140,2 px |
| z6 | 181,6 px | 285,7 px | 560,9 px |

### Yksi asia korjaantui matkan varrella

Reitin murtoviiva on avattu sauman yli (`avaaSauma`), joten sen x voi
olla laudan ulkopuolella. Vanha koodi piirsi reitit kahden pisteen
janoina ja katkaisi ne saumalla; uusi piirtää jokaisen reitin kolmena
kappaleena (−laudan leveys, 0, +laudan leveys), jolloin **Tokio–San
Francisco näkyy sauman molemmin puolin eikä katkea.** Tämä ei ollut
pyydetty, mutta se oli murtoviivoihin siirtymisen välitön edellytys.

### Todennettu silmillä

- **Kanaali z4**: samassa näkymässä maareittejä helmineen (Lontoo–
  Pariisi–Amsterdam), merireittejä sinisenä helmineen (Lontoo–Dublin,
  Lontoo–Rotterdam) ja lentoreitti punaisena katkoviivana. Kaikki
  kolme erottuvat toisistaan yhdellä silmäyksellä.
- **Lähikuva 4x**: yksittäinen helmi erottuu selvästi renkaana viivan
  päällä.
- **z6 kaukaa**: reitti on yhä luettava viivana ja helmet erottuvat.

---

## 5. Sauma ja jatkuvuus — todiste

`--saumatesti` kaikilla kahdeksalla tasolla, sama kone ja sama
aineisto ennen ja jälkeen. Luku on pahin kanavaero (0–255).

| taso | ennen (main) | jälkeen |
| --- | --- | --- |
| z0–z1 | 0 | **0** |
| z2 | 0 | 5 |
| z3 | 6 | 6 |
| z4 | 2 | 10 |
| z5 | 22 | **5** |
| z6–z7 | **0** | **0** |

**Syvimmät tasot ovat yhä tavulleen samat** — juuri ne, joita pelaaja
katsoo 1:1 ja joilla sauma näkyisi. Väliltä löytyvät erot ovat
hajallaan vektorien reunapehmennyksessä (uudet käyrät, helmet ja nimet
rasteroituvat eri kokoisilla kankailla hitusen eri tavoin), pahin ero
on 10 kanavaa 255:stä eli 4 % eli silmälle näkymätön, eikä työkalun oma
saumavaroitus lauennut. z5 parani 22:sta 5:een.

Kerron suoraan, koska pyysit: **tämä ei ole no-op muille käytöille —
mutta muita käyttöjä ei ole.** `tools/tee-yleislehti.mjs` on poistettu,
ja `maailma.mjs` + `maailmapiirto.js` ovat pyramidin yksinomaisia.
Maalehtien moottori `piirto.js` ja `aineisto.mjs` ovat koskemattomat.

---

## Mitä EN tehnyt

- **En noussut versiota, en tehnyt PR:ää, en ajanut työnkulkua.**
- En koskenut js/-puoleen (toinen agentti on siellä).
- En koskenut Raamattuun, tarina.md:hen tai isoisan-raamattu.md:hen.
  Luvut 6h–6l ovat `docs/moduulit/laattapyramidi.md`:ssä eli MITEN-
  dokumentissa. **Raamattuun tarvitaan sinulta kolme linjausta:**
  vektori maan ja meren auktoriteettina, asteverkon korvaaminen viidellä
  nimetyllä piirillä, ja reittien askelmat + niiden värisääntö.
- En muuttanut umpimerikarsintaa (`--harva`) käyttämään vektoria. Se on
  oletuksena pois päältä, mutta **jos se joskus kytketään päälle, sen
  maa/meri-testi on eri mieltä kuin piirto** — kirjaan sen tähän
  havaintona, en korjannut ohimennen.

## Ajo

Kaikki neljä muutosta näkyvät vasta uudessa pyramidiajossa. Ne kuuluvat
samaan ajoon, ja versio pitää nostaa polussa (`2026-08-30c` tai
myöhempi), koska laattojen osoitteet ovat ikuisessa välimuistissa.
