# Opus 1:n tilanne (päivitetty 10.8.2026, erän D jälkeen)

Tämä on **luovutuspaperi**: seuraava Opus-sessio toisella tilillä voi
jatkaa suoraan tästä ilman edellisen session kontekstia. Voimassa olevat
ohjeet ovat CLAUDE.md:ssä ja docs/roolitus.md:ssä — tämä kertoo vain,
mihin oma työ jäi ja mitä kannattaa tietää ennen kuin koskee mihinkään.

Rooli lyhyesti: **Opus 1 = lehdet ja koodi.** Kaupunkilehdet, maalehtien
aihesivut, minitehtävät, menovinkit, lehtien kuvat, UI-koodi ja
työkalut. **Tarinatekstit eivät kuulu tälle kaistalle** — saapumistekstit,
kohtaamiset, aarrevihjeet ja kulttuurivisat kirjoittaa Fable. Jos
tarinatekstissä on vika, se raportoidaan Fablelle eikä korjata itse.

## 1. Missä ollaan juuri nyt

**ME-maiden aihesivujono on erään C asti valmis.**

| Erä | Sisältö | Tila |
|-----|---------|------|
| A | Emiraattien 3. sivu + Jordania | v499 mainissa |
| B | Oman + Qatar | v501 mainissa |
| C | Egypti + Kuwait | v507 ja v511 mainissa |
| D | Saudi-Arabia | **v515 mainissa (#754)** |
| D | **Bahrain** | **JUMISSA — ei lautaa, ks. alla** |

Lisäksi mainissa on **v514 (#752)**: tekijämerkintöjen lupa-ajo
kaikkien pakettien yli, ks. kohta 4.

## 2. Erä D: Saudi valmis, Bahrain odottaa päätöstä

**Saudi-Arabia (v515)** sai kolme sivua: `kalliot` (Hegra, Jubbahin
kalliopiirrokset, AlUlan vanha kaupunki), `vuoret` (Asirin vuoristo,
savitornitalot, al-qatt al-asiri) ja `meri` (Farasanin saaristo,
korallikivi, papukaijakala ja hareed-juhla). Rub al-Khali jätettiin
tietoisesti pois: aavikkosivu on jo ARE:lla, QAT:lla ja KWT:lla.
Fablelta on kysytty, halutaanko se silti.

**Bahrain on valmis mutta liittämättä.** Syy ei ole sisällössä:

- Bahrainilla ei ole maamuotoa yhdelläkään laudalla
  (`middleeast-countries.js` 12 maata, `maailmankartta.js` 84 maata),
  eikä laudalla ole yhtään Bahrainin kaupunkia.
- `avaaMaalehti('BHR')` palaa heti rivillä `if (!maa) return;`.
- `tests/maa-otsikot.test.mjs` kaatuu liittämisen jälkeen:
  *"BHR: maalla on aihesivuja mutta ei nimeä millään laudalla"*.

Valmis sisältö on **`docs/erad-bahrain-valmis.json`** (kaksi sivua,
kuusi juttua, kuvat katsottu, lähteet Commonsin API:sta). Se liitetään
sellaisenaan heti kun Fable päättää esitystavan ja BHR saa
lautageometrian — se tiedosto on Opus 2:n kaistaa, älä koske siihen
itse. **Älä aloita erää E ennen kuin Fable on vastannut tähän.**

Fablen antamat rajaukset erälle D, sitovina (yhä voimassa):

- **Saudi-Arabia: EI Mekkaa eikä Medinaa eikä pyhiinvaellusta.** Pyhät
  kaupungit tulevat myöhemmin omana sivutyyppinään, ja **Fable
  kirjoittaa niiden johdannot** — älä aloita niitä.
  Fablen ehdottamat suunnat: aavikko, kulttuuri, meri. Lupaavia aiheita,
  jotka eivät osu naapureiden sivuihin: AlUlan ja Hegran kalliohaudat,
  Rub al-Khali, Asirin vuoret ja Al-Qatt Al-Asiri -seinämaalaus,
  Farasanin saaret, kalliopiirrokset, arabianleopardi.
- **Bahrain:** helmenkalastus, Dilmunin hautakummut, Qal'at al-Bahrain,
  Elämänpuu, meren pohjan makean veden lähteet, tuulitornit. Öljy ja
  moderni kaupunki ovat jo naapurien sivuilla.
- **Lehdettömät maat (Irak, Iran, Jemen) pysyvät kahden sivun mallissa.**
  Ei aihesivuja niille ilman Fablen eri päätöstä.
- **Ei sotasisältöä. Syyria-linja ennallaan.**

Jonon jälkeen avoinna olevat omat työt ovat kohdassa 7.

## 3. Aihesivun resepti (nykyinen, älä käytä vanhaa)

- **2–4 aihesivua per maa, 3 juttua per sivu + minitehtävä.** Vanha
  4 sivua × 4 juttua -speksi on vanhentunut; docs/tyolista-opukselle.md
  saattaa yhä puhua siitä.
- **Menovinkit aina viimeisenä sivuna**, jos maalla on ne.
- Minitehtävän säännöt, jotka esitarkistin vahtii:
  1. vastaus löytyy **nostotekstistä** (ei pelkästä otsikosta tai
     sivun johdannosta),
  2. vastaus **ei vuoda** otsikkoon eikä johdantoon,
  3. oikea vaihtoehto ei ole selvästi pisin (ero ≥ 3 merkkiä),
  4. kysymys on ainutkertainen koko pelissä,
  5. ei törmää lehtikaupungin kulttuurivisaan.
- Sivun `id` saa toistua eri maissa (`aavikko` on jo ARE:lla, QAT:lla ja
  KWT:lla) — avain on maatunnus.

## 4. Kuvasäännöt, ja se yksi kohta jossa mokasin

- Vain Wikimedia Commons, vapaa lisenssi (PD, CC0, CC BY, CC BY-SA).
  **Ei FAL, ei GODL.**
- Kuvan on oltava **siitä maasta**, jota sivu käsittelee.
- **Jokainen kuva katsotaan silmällä ~480–600 px:n levyisenä ennen kuin
  selite kirjoitetaan.** Commonsin kuvaus ei riitä. Tässä erässä
  katsominen hylkäsi: häkissä olevan fenekkiketun ("aavikolla"),
  muovilaatikossa numerolaput kuorissa olevat kilpikonnat ("villi
  eläin"), ja nubialaistalon kuvan, jonka etualalla oli tunnistettava
  selfietä ottava mies.
- Kuva ei saa olla pelissä ennestään. Duplikaattitutka lukee **kaikki**
  paketit tekstihaulla `tiedosto:` — aiempi versio luki vain
  `kansikuvat`/`nostot` ja päästi kolme duplikaattia läpi.

**Älä koskaan kirjoita `lahde`-kenttää muistista.** Kirjoitin Kuwaitin
kuuden kuvan tekijän nimen käsin ja sain **kaikki kuusi väärin** —
nimet olivat uskottavia, joten mikään ei näyttänyt oudolta. Sama vika
oli lipsahtanut Egyptiin kahdesti. Tekijämerkintä on CC BY:n
lisenssiehto, joten väärä nimi on rikkomus siinä missä puuttuvakin.

Repossa on nyt kaksi työkalua:

    node tools/lisaa-tekijat.mjs            # täydentää PUUTTUVAN tekijän
    node tools/tarkista-tekijat.mjs [pkt]   # vertaa OLEMASSA olevat Commonsiin

Jälkimmäinen on uusi ja tehty juuri tämän vian takia. Sen tulos on
luettava eikä pelkkä virhelista: loppuun jää tahallisia eroja
(suomennetut laitosnimet, translitteroinnit). maa-kategoriat.js:ssä
jää noin 20 riviä kolmesta tuhannesta kuvasta, ja keksitty nimi erottuu
siitä heti.

**Lupa-ajo on tehty (v514, #752).** Omistaja antoi 10.8. luvan ajaa
tarkistin kaikkien pakettien yli. Tulos ja se, mitä siitä opittiin:

- **32 kuvaa `europe-valokuvat.js`:ssä oli kokonaan ilman tekijää** —
  koko merkintä oli `lahde: 'CC BY-SA 4.0'`. Nämä olivat pahin löydös,
  eivät väärät nimet.
- `lisaa-tekijat.mjs`:n tunnistus katsoi vain merkinnän ALKUA, ja
  paketeissa on **kolme eri kenttäjärjestystä** (tekijä alussa,
  suluissa tai lopussa). Sääntö meni väärin molempiin suuntiin: se
  ohitti tekijättömät JA olisi kirjoittanut nimen toiseen kertaan 155
  merkintään, jos työkalu olisi ajettu sellaisenaan `--kirjoita`.
  Korjattu: järjestystä ei enää katsota lainkaan.
- **Aja aina kuivaharjoitus ja LASKE rivit ennen `--kirjoita`.** Tuo
  155 olisi mennyt läpi hiljaa.

Jäljelle jää kaksi asiaa, jotka ovat Fablella eivätkä tällä kaistalla:
neljä kuvaa kielletyllä lisenssillä (FAL/GFDL, `africa-kulttuuri.js`
ja `asia-lisat-valokuvat.js`) ja 383 PD/CC0-kuvaa ilman tekijää (ei
rikkomus).

## 5. Työkalut ja se, mitä niistä katosi

Repossa pysyvästi:

- `tools/uusi-versio.mjs "Muutosrivi"` — **ainoa** sallittu tapa nostaa
  versionumero. Ajetaan vasta juuri ennen buildia.
- `tools/build-standalone.mjs` — yhden tiedoston versio `dist/`-kansioon.
- `tools/lisaa-tekijat.mjs`, `tools/tarkista-tekijat.mjs` — yllä.

**Kertakäyttöiset apuskriptit olivat `/tmp`:ssä ja katosivat kontin
mukana.** Ne kannattaa tehdä uudestaan tarpeen tullen; tässä on mitä ne
tekivät, tärkeysjärjestyksessä:

1. **Esitarkistin** (`esitarkistus-maa2.mjs`): lukee `/tmp/maa-XXX.json`
   ja tarkistaa kohdan 3 minitehtäväsäännöt, sivu- ja juttumäärät sekä
   kuvaduplikaatit **ennen** kuin sivut liitetään pakettiin. Se on
   maksanut itsensä takaisin joka erässä: Omanissa ja Qatarissa se
   löysi kolme vikaa, Egyptissä kaksi. Vastauksen sanahaku käyttää
   ≥ 6 merkin sanojen 7 merkin alkuja, joten "Telttaa" ei löydä sanaa
   "teltta" — vaihtoehto kirjoitetaan siihen muotoon, jossa sana on
   tekstissä.
2. **Liittäjä** (`liita-maa.mjs XXX`): kirjoittaa JSON-sivut
   `js/packs/maa-kategoriat.js`:ään oikeaan kohtaan (menovinkit
   viimeiseksi). Kaupunkiversio `liita-kaupunki.mjs` **pudotti aikanaan
   hiljaa tuntemattomat kentät** ja rikkoi musiikkinäytteet — uusi
   versio kävelee `Object.entries(n)` ja **heittää** poikkeuksen
   tuntemattomasta tyypistä. Jos teet liittäjän uudestaan, tee se näin.
3. **Lähdetäyttäjä** (`taytä-lahteet.mjs XXX`): kirjoittaa jokaisen
   `lahde`-kentän suoraan Commonsin API:sta. Tämän jälkeen kohdan 4
   virhe on mahdoton.
4. **Duplikaattitutka** (`dup-kaikki.mjs`): tekstihaku `tiedosto:`
   kaikista paketeista.
5. **Selainmittari**: Playwright 390 px:n leveydellä. **Kaksi ehtoa,
   joita ilman tulos on merkityksetön:** `serviceWorkers: 'block'`
   (muuten service worker sieppaa kuvapyynnöt eivätkä Commons-kuvat
   lataudu koskaan — "rikki 0" ei silloin todista mitään) ja
   `page.route`-koukku, joka hakee kuvat Nodella proxyn läpi ja
   syöttää tavut selaimelle. Chromium on polussa
   `/opt/pw-browsers/chromium`. Noden fetch tarvitsee
   `NODE_USE_ENV_PROXY=1`.

## 5b. ÄLÄ aja tools/fetch-photos.mjs kevyesti

Se ei hae vain uusia kuvia. Se lukee **kaikki** `tiedosto:`-viittaukset
js/packs-kansiosta ja hakee jokaisen, jota ei vielä ole paikallisesti.
Paikallisia kopioita on 147, mutta viittauksia noin 3 000 — eli ajo
lataa reiluun tuntiin noin 2 900 kuvaa ja paisuttaa repon. Ajoin sen
kerran vahingossa neljän kuvan vaihdon yhteydessä ja jouduin
keskeyttämään sen 1 100 tiedoston kohdalla ja siivoamaan
`git clean -fd assets/valokuvat/`.

Kun vaihdat yksittäisen kuvan, jolla on paikallinen kopio:

1. hae uusi kuva käsin `Special:FilePath/<nimi>?width=1000`
   kansioon `assets/valokuvat/` työkalun nimeämissäännöllä
   (pienet kirjaimet, ei-kirjaimet viivoiksi, enintään 60 merkkiä),
2. `git rm` vanha tiedosto,
3. vaihda sen rivi `js/packs/valokuvat-paikalliset.js`:ssä.

Tiedostossa lukee "Älä muokkaa käsin", ja se pitää paikkansa koko
tiedoston uudelleengeneroinnista — kahden rivin vaihto on silti
turvallisempi kuin 2 900 kuvan lataus.

**Paikallinen kopio on osa lisenssiä.** Jos kuvan lisenssi on
kielletty, pelkkä viittauksen vaihto ei riitä: repo levittää yhä
tiedostoa `assets/valokuvat`-kansiosta. Poista myös tiedosto.

## 6. Julkaisukaava

    git fetch origin main            # VASTA tämän jälkeen versionumero
    node tools/uusi-versio.mjs "Tiivis muutosrivi, ~60 merkkiä"
    node tools/build-standalone.mjs
    node --test tests/*.test.mjs     # lue sekä "# pass" ETTÄ "# fail"
    commit → PR → CI vihreäksi → squash merge

Sessiot julkaisevat rinnakkain, joten versiotörmäys on tavallinen.
Kaava siihen: `git rebase origin/main`, konfliktissa
`git checkout --ours` **vain** generoiduille tiedostoille
(`dist/matkakirja.html`, `dist/matkakirja.partial.html`, `js/main.js`,
`js/muutokset.js`, `sw.js`), sitten `uusi-versio.mjs` uudestaan, build,
`git add -A`, `git rebase --continue`, `push --force-with-lease`.
Sisältöpaketteihin (`js/packs/*`) ei tule konflikteja, jos jokainen
session koskee omiin maihinsa.

**Raportointi vain gitillä.** Älä käytä `create_trigger`-työkalua — se
jää lupakyselyyn. Raportti kirjoitetaan `docs/viesti-fable.md`:n
**alkuun** (tiedosto on yhteinen, muiden sessioiden raportit jäävät
alle) ja pushataan omalle haaralle.

**ÄLÄ PYYDÄ OMISTAJAN HUOMIOTA** (omistajan sitova ohje 10.8.2026).
Älä käytä AskUserQuestion-työkalua äläkä päätä vuoroa avoimeen
kysymykseen tai "odotan hyväksyntää" -tilaan: juuri ne tuottavat
omistajalle turhia tsekkauspyyntöjä puhelimeen. Kaikki kysymykset,
katselmoitavat ja esteet menevät **vain Fablelle gitillä**, ja Fable
poimii ne vahtikierroksellaan.

Vuoro päätetään toteavasti: *"raportti pushattu, jatkan X"* tai
*"jään valmiuteen"*. Jos jokin estää etenemisen, kirjaa este
raporttiin ja **etsi seuraavaksi se työ, joka EI ole estynyt** —
esimerkiksi seuraavan erän tarkastus voidaan ajaa valmiiksi jo
odottaessa, jolloin liitos on kuittauksen jälkeen yhden askeleen työ.

## 7. Omat avoimet työt jonon jälkeen

1. **Menovinkkiruutu irti kaupunkilehdestä** (`ui.js`). Kaupunkilehdessä
   on neljä ruutua kolmen tavoitteen sijaan, koska neljäs on
   menovinkkisivu, jonka `ui.js` liittää ajonaikana maalehdestä.
   Ehdotettu omaksi eräkseen kaikille 36 kaupungille. Odottaa päätöstä.
2. **Yksi menovinkkirivi ilman kuvaa** (245/246). Tietoinen valinta:
   riville ei löytynyt kuvaa, joka olisi ollut oikeasta maasta ja
   vapaalla lisenssillä.
3. **Kuvaduplikaatteja on 17** (10.8.2026 mitattu; oli 13). Omat on
   purettu; loput ovat syntyneet nähtävyysjuttuerissä, mm.
   `Baščaršija.jpg`, Latin Bridge, Gedimino pilis ja Vilnan yliopisto.
   Nämä on raportoitu Fablelle, ei omalla kaistalla. Hyväksytyt
   duplikaatit ja perustelut ovat docs/kuvaduplikaatit.md:ssä.
4. **Kohderyhmä on 13+ eikä lapset** (omistajan päätös 10.8.2026,
   v512). Erän D tekstit on käyty läpi tätä vasten. Uusia tekstejä
   kirjoittaessa: toteava ja numeropitoinen, ei selittävä.

## 7b. Tarkastus eri silmin — tee tämä ENNEN mergeä

Ultracode on käytössä, ja **Fable on hyväksynyt tämän vakiotyötavaksi
10.8.2026: sama ajo tehdään jokaiselle uudelle maalle ENNEN mergeä.**
Se ei ole valinnainen laadunparannus vaan osa julkaisukaavaa. Ajoin Saudi-sivujen
yli kolme agenttia sen jälkeen, kun sisältö oli jo mainissa, ja ne
löysivät 5 asiavirhettä ja 6 väärää kuvatekstiä. Yksi selite väitti
seinissä kivirivejä, joita kuvassa ei ole — ja sivun minitehtävä kysyi
juuri niistä.

**Olin katsonut ne kuvat itse silmällä.** En silti nähnyt puuttuvaa
piirrettä, koska tiesin mitä siellä pitäisi olla. Siksi oma tarkistus
huolellisemmin ei korvaa tätä.

Jako, joka toimi (kolme rinnakkaista agenttia, ~11 min):

1. **Kuvat ja selitteet:** lataa jokainen kuva, katso se, vertaa
   selitteeseen. Käske etsimään: selite väittää jotain mitä kuvassa ei
   näy, kuvassa on jotain häiritsevää jota selite ei mainitse, kuva ei
   esitä sitä mitä otsikko lupaa. Pyydä katsomaan myös 1200 px:n
   rajauksina — 600 px ei riitä pienten piirteiden toteamiseen.
2. **Faktat:** jokainen numero ja vuosiluku alkulähteestä.
   **Unesco-kohteiden luvut Unescolta, EI Wikipediasta** — Hegran
   hautaluku oli väärä juuri siksi, ja Wikipedia oli ristiriidassa
   itsensä kanssa samassa artikkelissa.
3. **Kieli ja rekisteri:** kohderyhmä 13+, verrokkina naapurimaiden
   lohkot samasta tiedostosta.

Älä ota agentin sanaa suoraan: tarkista vakavimmat löydöt itse ennen
korjausta. Kaikki kolme agenttia olivat tässä erässä oikeassa, mutta
yksi väite ("kaunisteltu") oli makuasia eikä virhe.

## 8. Yksi työtapa, joka kannattaa periä

Melkein jokainen tässä työssä löytynyt vika oli **hiljainen**: liittäjä
pudotti kenttiä sanomatta mitään, tarkistin vertasi tyhjää tyhjään ja
sanoi "ei virheitä", selainmittari raportoi "rikki 0" tilanteessa jossa
yksikään kuva ei ollut edes yrittänyt latautua, duplikaattitutka luki
vain kahta kenttää kymmenestä, ja tekijämerkinnän saattoi keksiä ilman
että mikään huomautti. Kaikki löytyivät samalla tempulla: **tee
tarkistimesta näkyvä ja vihamielinen.** Käytännössä kolme tapaa:

1. **Riko se tahallaan.** Ennen kuin uskot "ei virheitä", vaihda yksi
   vastaus vääräksi ja katso, että tarkistin huomaa. Tein tämän
   Kuwaitille, ja vasta se todisti että tarkistin ajoi kyseisen erän.
2. **Tulosta mitä tarkistettiin, ei vain lopputulos.** "Tarkistetaan 6
   kuvaa" paljastaa nollan heti.
3. **Anna tarkistus eri silmille kuin valinta.** Erässä C
   tarkistusagentti latasi ja katsoi jokaisen kuvan, ja löysi kolme
   kuvatekstiä, jotka olivat olennaisesti väärin — kaikki sellaisia,
   joita tiedostonimi ja Commonsin kuvaus eivät kertoneet.
