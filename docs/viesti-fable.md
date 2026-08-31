# Sijaispäätoimittaja → Fable, päätoimittaja: siirto 31.8.2026

Omistaja siirtää kartan viimeistelyn sinulle. Tässä on kaikki, mitä
tarvitset. Kaikki luvut ovat mitattuja, ei arvioita; lähteet on
merkitty, jotta voit tarkistaa ne itse.

## 1. Missä mennään

Laattapyramidi on pelin ainoa maailmankartta. Ajo **2026-08-31b** on
ämpärissä (kaikki kahdeksan tasoa, patina hillitty) ja siinä
**karttanostot on poltettu laattoihin**: 413 merkkiä 624:stä.
Luettelo `julisteet/pyramidi/pyramidi.json` kantaa kentät
`versio: 2026-08-31b`, `nimiot: false` ja `nostot` (id → FNV-1a).

Mainissa: v1380 symbolit, v1381 reitit ja joet karttavakioiksi,
v1382 kategoria per kaupunki ja pilkkulista, v1383 rullazoomin
korjaus, v1384 poltto, v1385 vaienneet nimiöt.

**Avoin PR:**
[#1831 v1386 "Piste vain nimen kanssa"](https://github.com/ravelius/Matkakirja/pull/1831),
haara `claude/piste-vain-nimen-kanssa`. CI oli kesken siirron
hetkellä; kun vihreä, squash-merge. Kaupungin piste piirtyy vain jos
sen nimi (tai maastoparin nimi) oikeasti piirtyy. Mitattu: mittakaavalla
0,11…0,15 kaupunkimerkkejä 62 → 0, 0,22…0,30 273 → 74, lähikuvassa
nimettömät 19 / 11 / 6 → 0, eikä yksikään nimi kadonnut.

Siirron kirjoittamisen jälkeen mainiin meni vielä **v1388: kartan
puolikas laudan sauman kohdalla** (ks. kohta 4) — se on korjattu ja
mergattu, ei enää sinun listallasi.

## 2. Omistajan uusimmat linjaukset — työn kärki

Sanatarkasti 31.8.2026:

> "Kaikki elementit mitä ei ole poltettu pitää poistua näkyvistä kun
> karttaa zoomataan, mutten tulee ikävä hyppäys"
>
> "Kaupungin pisteet eivät saa muuttaa kokoa suhteessa karttaan.
> Niiden koko pitää olla sama kuin ne olisivat poltettu karttaan"
>
> "Mustat merkit ovat siis kaupunkeja"

Kolmas lause on vastaus omistajan omaan kysymykseen "miksi nuo mustat
kaupungit näkyvät noin isolla" — hän vahvisti, että kyse on
kaupungeista. Mittaus (kohta 3) kertoo, mistä kerroksesta.

**Ensimmäinen linjaus** on yleinen: poltettu jälki liikkuu
kompositorilla laatan mukana, elävä ruutuavaruuden ladonta ei — siitä
tulee hyppäys. Eleen ajaksi piilotetaan siis kaikki polttamaton:
elävät karttanostot, kaupunkien nimet ja pisteet, maastonimet,
nostoviivat. Vastaava koneisto on jo olemassa (`js/kartta.js`
MERKKIEN_PALUU_MS, `js/fokusmitat.js` LEPO_MS) — kyse on sen
laajentamisesta, ei uudesta rakenteesta. Pelitila (vilkkuvat valot,
nappula, vuororengas, korostuslaatta, kohtaamispiste) jäi omistajan
sanoissa mainitsematta; jos ne hyppäävät, kysy kortilla.

**Toisessa linjauksessa on ristiriita, joka pitää purkaa omistajan
kanssa ennen toteutusta.** "Ei saa muuttaa kokoa suhteessa karttaan"
tarkoittaa karttavakiota eli lautayksikköä: merkki kutistuu kartan
mukana kuten rantaviiva. "Sama kuin poltettuna" tarkoittaa
paperivakiota: pyramidin laatoissa kaikki painojälki on `paperiS: 1`
eli sama määrä ULOSTULOPIKSELEITÄ joka tasolla, jolloin poltettu
piste olisi ruudulla aina saman kokoinen — eli täsmälleen se, mitä
nykyinen kerros jo tekee. Nämä kaksi eivät voi olla yhtä aikaa totta.

Luultava tarkoitus on karttavakio, ja "kuin poltettuna" kertoo
KOON eikä yksikön: piste on lautayksiköissä sen kokoinen, jonka se
saisi polttohetkellä. Silloin jää valittavaksi VIITETASO, jolta koko
otetaan (z7:llä 7,2 px/lautayksikkö, ja jokainen taso ylöspäin
puolittaa). Tee tästä kysymyskortti — sama kortti kannattaa esittää
yhdessä nostojen kertoimen kanssa (kohta 5), koska kysymys on sama.

## 3. Mitattu: mistä "mustat kaupungit" tulevat

Poltetut kaupunkipisteet **poistettiin laatoista** (maailmapiirto.js
luku 8b, omistajan päätös 30.8.), ja ne piirtää nyt elävä kerros
`js/karttanimet.js`. Se latoo RUUTUpikseleissä
(`laudalle = cssPx / nakyva.skaala`), joten ne eivät kutistu kartan
mukana. Mitattu oikeaa ämpärilaattaa vasten, ruutu 900×1200, dpr 1:

| kerros | yksikkö | 500 km | 1000 km | 2000 km | 5000 km |
|---|---|---|---|---|---|
| `.karttamerkki-piste` | **ruutu** | 4,0 / 5,2 px | 4,0 / 5,2 | 4,0 / 5,2 | pudotettu |
| `.karttamerkki-rengas` | **ruutu** | 9,2 px | 9,2 | 9,2 | pudotettu |
| `.karttamerkki-vuori` | **ruutu** | 8,0 / 10,0 px | sama | sama | pudotettu |
| `.city`-laatta (ui.js) | **lauta** | 15,8 px | 8,3 px | 4,1 px | 1,7 px |
| `.fokuskohde` RUS | **lauta** | 169 px | 134 px | 67 px | 27 px |

Lautayksiköissä piste kasvaa ulos zoomatessa 4,6 → 8,6 → **17,3** ja
rengas 10,5 → 19,9 → **39,8**; maastossa rengas peittää 28 km:stä
**115 km:iin**. Ratkaiseva yksityiskohta: 500 km:llä kermanvalkoinen
`.city`-ellipsi (15,8 px) ympäröi tummaa pistettä, mutta 1000–2000
km:llä ellipsi kutistuu **renkaan alle** (8,3 → 4,1 px) ja merkki
romahtaa yhdeksi umpimustaksi nastaksi (`fill: rgba(58,40,25,0.9)`).
2000 km:n näkymässä ruudulla on 120 pistettä ja 26 rengasta, ja ne
ovat kartan ainoat mustat elementit — juuri se pippuri, jonka
omistaja näkee.

**`js/ui.js drawCities` ei ole vika:** sen kaupunkilaatat ovat jo
karttavakio (18 lautayksikköä joka zoomilla). Korjattava kerros on
`js/karttanimet.js` MERKKI-taulu (`pisteIso: 2.6, piste: 2.0,
rengasIso: 4.6, vuoriIso: 5, vuori: 4`).

Kuvat (tämän session scratchpad, kopioi talteen jos tarvitset):
`mitta-venaja-500km.png`, `mitta-kreikka-500km.png`,
`mitta-eurooppa-afrikka-1000km.png`, `mitta-eurooppa-afrikka-2000km.png`,
`mitta-maailma-5000km.png`, `mitta-mustat-kaupungit-lahikuva.png`,
`mitta-kerroinvertailu-pietari-z6.png`.

## 4. Toinen bugi: kartta piirtyy vain ruudun vasempaan puolikkaaseen

Omistajan kuvakaappaus: terävä PYSTYSAUMA keskellä ruutua, oikea
puolisko tyhjää pergamenttia. Näkymä Tyynenmeren / Kamtšatkan yllä,
jana 1000 km. Tämä ei ole v1379:ssä korjattu "kartta ei piirry
ollenkaan" -vika: raja on puhdas pystysauma eikä tasonvaihdon aukko.

**KORJATTU JA MERGATTU (v1388).** Juurisyy oli laudan kierto:
kiertävällä laudalla koko sisältö on olemassa kahdesti — juuriryhmä
kattaa välin [0, 12000) ja sen `<use>`-kopio välin [12000, 24000) —
ja kopio on juuriryhmän PÄÄLLÄ läpinäkymättömine paperinpohjineen.
Laattapyramidi piirsi sauman takaiset laatat kierroksittain arkin
oikealle puolelle, oikeille paikoilleen ja ladattuina, ja kopion
pergamentti maalasi ne piiloon. Vika oli paikassa, ei ajassa.

Korjaus: laatta piirretään arkille kerran omalle paikalleen, ja kierron
hoitaa laudan kopio; näkyvyys kysytään kiertäen (`osuuKiertaen`).
Mitattu: arkin ulkopuolella olevia laattoja 12/30 → 0/30, vaakapeitto
100 % molemmissa, ruudulla vasen puolikas → koko ruutu.

Huomionarvoista jatkoa varten: savuke `P5` lupasi otsikossaan panoroida
sauman yli mutta **ei siirtänyt kameraa lainkaan**, joten se ei voinut
nähdä vikaa. Se on nyt kirjoitettu uusiksi ja kaatuu korjaamattomalla
koodilla.

## 5. Poltettujen nostojen mittakaava on maakohtainen — ja siksi väärä

`js/nostoladonta.js`: `nostoladontaSkaala(rajaus) = 2,0 × rajaus.w /
1600`, ja `rajaus` on MAAN OMAN fokuslehden rajaus
(`js/packs/fokus-grc.js` FOKUS_POHJAT). Kaava oli oikea silloin, kun
jokainen lehti katsottiin erikseen ruudulle sovitettuna; yhdellä
yhteisellä pyramidikartalla se ei ole.

Mitattu: `nimiörivi = 5,762·s` ja `symboli = 6,810·s` lautayksikköä,
1 lautayksikkö = 3,34 km · cos(lat).

| maa | s | nimiö km | nimiö px z3 / z5 / z7 |
|---|---|---|---|
| RUS | 7,215 | 58 | 18,7 / 74,8 / **299** |
| CAN | 4,681 | 36 | 12,1 / 48,5 / 194 |
| USA | 3,273 | 50 | 8,5 / 33,9 / 136 |
| JPN | 1,297 | 20 | 3,4 / 13,5 / 54 |
| FRA | 0,833 | 11 | 2,2 / 8,6 / 35 |
| GRC | 0,585 | 9 | 1,5 / 6,1 / 24 |
| mediaani (PRY) | 0,476 | 8 | 1,2 / 4,9 / 20 |
| SHN | 0,056 | — | — |

134 maata, hajonta **129-kertainen**. Toisinnus vahvistaa: Venäjän
nostot ovat 500 km:n janalla 24,4 px kun kartan omat paikannimet ovat
10,5 px; Kreikan samalla janalla 3,0 px. Ero 12-kertainen.

Korjaus on yksi globaali vakio koko laudalle. Kolme mitattua
vaihtoehtoa (vertailukohtina laattojen omat painojäljet:
kaupunkipiste 4,0/5,2 px, pääkaupunkirengas 9,2 px, vuorikolmio
8–10 px, paikannimi 10,5 px):

| s | nimiö px z5 / z6 / z7 | luettava kun jana ≈ | GRC / RUS muutos |
|---|---|---|---|
| **0,60** | 6,2 / 12,4 / 24,9 | 200 km | ×1,03 / ÷12,0 |
| **0,48** | 5,0 / 10,0 / 19,9 | 100–200 km | ÷1,22 / ÷15,0 |
| **0,25** | 2,6 / 5,2 / 10,4 | 50 km | ÷2,34 / ÷28,9 |

- **0,60 — "Kreikan mitta koko maailmalle".** Ainoa arvo, joka jättää
  omistajan jo hyväksymät maat (GRC, FIN, ITA, EGY) käytännössä
  ennalleen ja kutistaa vain jättiläiset. z6:lla nimiö ≈ kartan oma
  paikannimi. Valituksen näkymissä nimiö olisi 2,0 px (Venäjä 500 km)
  ja 0,8 px (2000 km) — ongelma katoaa. Haitta: z7:llä 2,4 × kartan
  oma nimi.
- **0,48 — mediaanimaa.** Puhtain typografinen osuma z6:lla.
- **0,25 — syvän tason identiteetti.** z7:llä täsmälleen kartan oman
  nimen kokoinen, mutta merkit ovat olemassa vain lähikuvassa.

**Rakenteellinen huomio, joka kannattaa kertoa omistajalle:** koska
nosto on karttavakio, mikään yksittäinen s ei tee siitä luettavaa
sekä 500 km:n janalla ETTÄ z7:n lähikuvassa. Se on sama syy, jonka
takia paikannimet siirrettiin laatoista elävään ruutumittaiseen
kerrokseen. Jos nimiöiden pitää olla luettavia myös kaukaa, ratkaisu
on siirtää NIMIÖ eläväksi ruutumitaksi (`KOKO.kohde` 10,5 on jo
olemassa `js/karttanimet.js`:ssä) ja jättää laattaan vain symboli.

**Kertoimen muutos vaatii uuden pyramidiajon** — eli omistajan luvan.
Hän on ollut tässä nimenomainen: "Aja pyramidit vasta sitten kun saat
minulta luvan. Kysy siis ensin minulta."

## 6. Omistajan pysyvät ohjeet

- Kompakti sanamuoto chatissa; ei työvaiheiden selostusta.
- **Kysymyskortti aina**, kun omistajan pitää vastata johonkin.
- Agenttiparvet sallittuja ja toivottuja aina kun ne nopeuttavat.
- Älä poista mitään lopullisesti — ota pois vain pelistä, jota
  pelataan.
- Pyramidiajo vain luvalla.
- **Toinen sessio työskentelee samassa työpuussa** ja työstää kuvia.
  Älä vaihda repon juuren haaraa äläkä siivoa tuntemattomia
  untracked-tiedostoja; tee julkaisutyö omassa worktreessa.
- Kontissa `NODE_USE_ENV_PROXY=1`; Chromium `/opt/pw-browsers/chromium`
  (Playwright konfiguroitu, ÄLÄ aja `playwright install`).

## 7. Muut avoimet asiat

- Punaisia savukkeita mainissa: `savuke-pro-tuottaja` (todennäköisesti
  aito bugi — `POST /pro-tarkista` onnistuu mutta virheilmoitus ei
  tule näkyviin), `savuke-nappula` 7b/7c (nappularyhmä 12,73 leveämpi
  kuin laatta 12,09), `savuke-kehittajalehti`, `savuke-fokusvirta`,
  `savuke-maailmanakyma` longtask-budjetit (kontin varianssi 2,4×,
  tarkoituksella löysäämättä).
- iPhonella 8 vaiennutta merkkiä jäljellä (rakenteellinen).
- Vuorikolmio voi yhä jäädä kartalle ilman nimeä. Kerroin omistajalle
  v1386:n yhteydessä; hän ei ole ottanut kantaa.
- Poltosta jäi ulos 211/624 merkkiä: 7 maata (BGR, BIH, ESP, GBR, ITA,
  ROU, UKR), joiden täkyjoukko ei ole vakaa, ja 78 monimaista
  maastokohdetta. Viisi `paikka`-kentän korjausta nostaisi luvun
  noin 500:aan.
- Helenan korujen sijoitus on anakronismi (Iliou Melathron 1878–80,
  paljastus 1873–74; ainoa lähdevarmistettu paikka on Troija).
- Olympieionin desimaali on ristiriidassa oman kommenttinsa kanssa;
  Iliou Melathronilla on pelissä kaksi eri koordinaattia.
- Vanhempia velkoja: aikataulumekaniikan purku, PR #1455:n sulkeminen,
  Kaljazinin RT-64:n sisältö.

## 8. Oppi, joka kannattaa pitää mielessä

Kolme agenttia ohitti punaisen savukkeen merkinnällä "ennestään rikki,
ei tästä". Yksittäin oikein, mutta se piilotti aidon pelivian
puolentoista päivän ajaksi. **Jos sama savuke raportoidaan rikki
toistamiseen, se tutkitaan.** Ja savukeajon tuloste luetaan loppuun
asti eikä grepitä — sijaispäätoimittaja päästi kerran
`ReferenceError`in päähaaraan juuri siksi.
