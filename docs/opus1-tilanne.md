# Opus 1:n tilanne (päivitetty 10.8.2026, tilinvaihtoa varten)

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
| C | Egypti + Kuwait | v507 mainissa; Kuwait v511 = **PR #745** |
| D | **Saudi-Arabia + Bahrain** | **ei aloitettu — tästä jatketaan** |

Kuwaitin PR #745 (`claude/country-name-page-titles-1uegdu`) odotti CI:tä
tätä kirjoitettaessa. **Tarkista ensimmäisenä, onko se mainissa.** Jos
se on auki eikä siinä ole punaista, mergeä se squashina; jos siinä on
versiotörmäys, kaava on kohdassa 6. Versionumero vaihtui kahdesti
kesken erän (v510 meni kahdesti toiselle sessiolle), joten älä luota
numeroon vaan katso `js/muutokset.js`:n ylin rivi.

## 2. Erä D: mitä on jo tehty, mitä puuttuu

Erä D:tä **ei ole aloitettu** — omistajan ohje oli jäädä valmiuteen
tilinvaihdon ajaksi. Taustatutkimus oli käynnissä sulkuhetkellä, ja sen
tulokset ovat vain edellisen session kontossa, eli **ne on tehtävä
uudestaan.** Se ei ole iso työ: agenttiajo kartoittaa aiheet ja
tarkistaa faktat noin puolessa tunnissa.

Fablen antamat rajaukset erälle D, sitovina:

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

**Avoin ehdotus Fablelle:** muidenkin sessioiden kirjoittamissa
paketeissa on käsin kirjoitettuja lähdemerkintöjä. Ehdotin, että ne
ajetaan saman työkalun läpi, mutta **en koskenut niihin ilman lupaa.**
Jos Fable antaa luvan, ajo on nopea.

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

## 7. Omat avoimet työt jonon jälkeen

1. **Menovinkkiruutu irti kaupunkilehdestä** (`ui.js`). Kaupunkilehdessä
   on neljä ruutua kolmen tavoitteen sijaan, koska neljäs on
   menovinkkisivu, jonka `ui.js` liittää ajonaikana maalehdestä.
   Ehdotettu omaksi eräkseen kaikille 36 kaupungille. Odottaa päätöstä.
2. **Yksi menovinkkirivi ilman kuvaa** (245/246). Tietoinen valinta:
   riville ei löytynyt kuvaa, joka olisi ollut oikeasta maasta ja
   vapaalla lisenssillä.
3. **Kuvaduplikaatteja on 13** (`node /tmp/dup-kaikki.mjs` -tyylinen
   ajo kertoo tuoreen luvun). Omat on purettu; loput ovat syntyneet
   nähtävyysjuttuerissä, mm. `Baščaršija.jpg` ja Latin Bridge
   (Sarajevo). Nämä on raportoitu Fablelle, ei omalla kaistalla.
   Hyväksytyt duplikaatit ja niiden perustelut ovat
   docs/kuvaduplikaatit.md:ssä.

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
