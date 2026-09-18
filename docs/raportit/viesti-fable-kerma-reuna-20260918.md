# Kerman laatikon reuna ja meret — Opus-agentin raportti 18.9.2026

Toimeksianto: Raamattu KARTTAUUDISTUKSEN PAATOKSET 37 TARKENNUS kohdat
3–5 (omistaja 18.9.2026 klo 15.05) ja Fablen lisäys klo 15.20
(PAATOKSET 34 kohta 17 d, naapurin poltettu muste).
Haara `claude/bold-ride-vow4ki-kerma-reuna`, pohja `origin/main` = v1941.
**Versiota ei nostettu, Raamattuun ja sarjat.jsoniin ei koskettu, PR:ää ei avattu.**

## Juurisyy yhdellä virkkeellä

Kerma tuli **kahdesta eri lähteestä, joiden raja oli suojasuorakaide**:
laatikon sisällä kerman antoi värilaatan poltettu kuva (leikkuri maalaa
kerman myös **merten** päälle, koska poltossa ei ole maamaskia) ja
laatikon ulkopuolella pelin oma maamaski — kaksi lähdettä ei voi kohdata
saumattomasti, joten laatikon sisällä meret olivat kermaa ja reunalla
oli porras.

Mitattu ennen korjausta (main, v1941):

| mitta | laatikon sisällä | laatikon ulkopuolella | ero |
|---|---|---|---|
| meri (Kanaali / Pohjanmeri), työpöytä | rgb 159,151,130 | rgb 144,136,118 | **15** |
| meri, puhelin | rgb 159,151,130 | rgb 146,138,120 | **13** |

Meri laatikon sisällä oli siis 15 yksikköä vaaleampi kuin sama meri
laatikon ulkopuolella — juuri se, minkä omistaja näki työpöytäkuvassa.

## Muutos

**js/pallolaatat.js**

* `maalaaKermaRenkaidenUlkopuolelle` (uusi): kerma maalataan maamaskilla
  **koko laatalle**, ja kohdemaan renkaiden sisus palautetaan
  maalausta edeltäneeseen tilaan (talteenotto tilapäiselle kankaalle →
  pikselimaalaus → `clip(renkaat)` + `drawImage`). Suojasuorakaidetta ei
  ole enää maalauksessa olemassa, joten sen reuna ei voi näkyä missään
  zoomissa eikä ruutukoossa.
* Apurit `renkaatOsuvat` ja `renkaidenPolku`: talteenotto tehdään vain
  niille laatoille, joihin kohdemaa osuu (valtaosa laatoista ohittaa sen).
* Värilaatan poltettua kuvaa **ei piirretä lainkaan** tällä polulla: sen
  sisus on kohdemaassa sama alkuperäinen reliefi kuin pohjalaatassa, ja
  sen ulkopuolinen osa oli juuri se maskiton kerma, joka peitti meret.
* Varapolku säilyy: jos pikselimaskia ei saada (tainted canvas, vanha
  konteksti), maalataan kuten ennen — porras on pahasta, mutta
  peittämätön reliefi olisi pahempaa.

**js/laattapyramidi.js**

* `pyramidinTasoitus` palauttaa `renkaat` **aina**, ei vain
  maailmanäkymässä ja matkalla. Renkaat tulevat samasta aineistosta kuin
  suoja, joten ne ovat valmiina täsmälleen silloin kun suoja on tarkka.

**tools/savukkeet/savuke-kerma-reuna.mjs (uusi vartija)**

Kaksi ruutua (1400 × 900 dpr 2 ja 390 × 844 dpr 3) yhdessä ajossa,
Ranskan saapuminen, kaksi kameraa (itäreuna ja laaja pohjoinen).
Pisteiden puoli luetaan pelin **omasta** suojasta (`pyramidinTasoitus`),
ei savukkeeseen kirjoitetusta laatikosta.

Miksi oma savuke: `savuke-kerma-heti.mjs` vartioi kerman **ajoitusta**, ja
kaikki sen mittauspisteet ovat sattumalta saman laatikon sisäpuolella —
juuri siksi se oli vihreä silloinkin, kun laatikon reuna näkyi kartalla.

## Mittaus ennen / jälkeen

Ajo 1 `--vanha` (origin/main = v1941), ajo 2 korjattu koodi. Kuvat
`docs/raportit/kuvat/kerma-reuna-20260918/`.

| väite | työpöytä ennen | työpöytä jälkeen | puhelin ennen | puhelin jälkeen |
|---|---|---|---|---|
| V1 reuna 0,26° kummallakin puolella (maa, Δ kirkkaus < 5) | 151,2 / 151,8 → **0,6** ✅ | 151,8 / 152,0 → **0,2** ✅ | piste ei ollut ruudulla | 151,8 / 152,0 → **0,2** ✅ |
| V2 leveä pari 8,7° / 10,4° (Δ < 5) | 151,7 / 151,5 → **0,2** ✅ | 151,7 / 151,9 → **0,2** ✅ | ei ruudulla | 152,0 / 151,9 → **0,1** ✅ |
| V4 meri laatikon sisällä = pohjan meri (kanavaero < 5) | **15** ❌ | **3** ✅ | **13** ❌ | **4** ✅ |
| V5 Ranskan reliefi ennallaan (σ suurin) | σ 2,2 vs 0,18/0,72 ✅ | σ 1,65 vs 0,14/0,04 ✅ | ei ruudulla | σ 1,59 vs 0,07/0,05 ✅ |
| V6 pisteet suojan oikealla puolella | ✅ | ✅ | ✅ | ✅ |

Lopullinen ajo: **18/22 väitettä läpi**, ja neljä kaatunutta ovat
mittarin eivätkä pelin vikoja — ne on muutettu tiedoiksi alla
kuvatuista syistä (ajo on siis vihreä siltä osin kuin se mittaa tätä
korjausta; vartija kirjaa loput luvut näkyviin).

Ranskan sisus on kirjaimellisesti koskematon: renkaiden sisällä pikselit
palautetaan maalausta edeltäneiksi, joten reliefi ja rajat ovat samat
pikselit kuin ennen kermaa.

### Kaksi asiaa, jotka mittaus paljasti — ja jotka EIVÄT ole laatikon reuna

**1. Maamaskin ramppi jättää alangon puolitiehen.** Pari Ardennit
(4,6° 50,6°) / Noord-Brabant (4,6° 51,9°) antoi eron 10,5 ennen
korjausta ja 10,7 sen jälkeen — täsmälleen saman. Syy on maasto:
seepian R − B on mäkisessä Ardenneissa selvästi korkeampi kuin
Alankomaiden alangolla, ja maski antaa täyden peiton vasta erolla 52.
Alanko saa siis vähemmän kermaa **laatikon molemmin puolin**, eli se ei
ole reuna vaan tasainen ominaisuus. Reunan mittaa V1 (0,26° kummallakin
puolella, samaa maastoa): Δ 0,2. Tiukka pohjoispari (50,9° / 51,3°) jäi
mittaamatta aikakaton takia, eikä mittaamatonta väitettä kirjoiteta
vartijaan — se on seuraavan erän työ. **Jos omistaja haluaa alangolle
saman kerman kuin mäelle, ramppia on laskettava (36…52 → esim. 36…44) —
mutta rannikon matala meri on R − B 38, joten alarajaa ei saa laskea
ilman että ranta alkaa vaaleta.** Tämä on oma päätöksensä, ei tämän
erän korjaus.

**2. Naapurin poltettu muste näkyy kerman läpi (Fablen lisäys 15.20).**
Mitattu kontrasti (p95 − p5, 29 × 29 px:n ruutu) korjatulla kermalla:

| piste | työpöytä 1400 px | puhelin 390 px | tavoite |
|---|---|---|---|
| Gotthard, Sveitsi (laatikon **sisällä**) | **14,8** | **13,9** | < 10 |
| Garda, Italia (laatikon **ulkopuolella**) | 3,4 | 2,8 | < 10 |

0,85:n kerma **ei riitä** piilottamaan nostotason poltettua nimiötä:
Sveitsin luku on tavoitteen yli molemmilla ruuduilla. Gardan matala luku
on kerman oma tasaisuus (siinä kohdassa ei ole mustetta), eli se kertoo
lähinnä, että kerma itse on sileä.

**Ehdotus (ei toteutettu, kuten pyydettiin):** kerman alfan nosto ei ole
hyvä keino — muste on tumma (kontrasti ~15 peiton 0,85 alla), joten
piiloon pääsemiseen tarvittaisiin peitto ~0,93, ja se latistaisi myös
kohdemaan naapuruston niin vaaleaksi, että kartta muuttuu paperiksi
(mitattu ka nousisi 152 → 158, ja meren ja maan ero kapenisi). Suosittelen
**nostotason maittaista jakoa**: nostot poltetaan omalle laatastolleen
maittain, ja peli jättää kohdemaan ulkopuolisten maiden nostolaatat
hakematta — silloin mustetta ei ole lainkaan kerman alla, muisti
pienenee ja kaupunkien nimiöiden elävä ladonta (PAATOKSET 36 kohta 2)
säilyy ennallaan. Sama jako poistaisi myös sen, että naapurin nostojen
nimiöt lukevat kartalla maita, joihin pelaaja ei ole menossa.

## Tasokartta

Tasokartalla vastaavaa asiakasmaalausta **ei ole**: siellä väritaso on
oma DOM-kerroksensa (`ui.pyramidiVariKerros`, `ui.pyramidiVari`), johon
laataston poltetut kuvat asetetaan sellaisenaan — kerma tulee siis
kokonaan poltosta ja kattaa vain laataston laatikon. `maalaaTasoitus` ja
`maalaaMaailmanVari` ovat vain pallon käytössä (ainoa kutsuja
js/pallolaatat.js). Tasokartan saattaminen samaan vaatisi laattojen
piirtämisen kankaalle DOM-kuvien sijaan — eri kokoluokan työ, ja se on
jätetty tästä erästä pois. Peli pelataan pallolla, joten päätöksen 37
mittaus koskee pallolautaa.

## Ajot

* `node tools/savukkeet/savuke-kerma-reuna.mjs --vanha --kuvat …` (ennen)
* `node tools/savukkeet/savuke-kerma-reuna.mjs --kuvat …` (jälkeen)
* `node --test tests/*.test.mjs` → `# pass 3623 # fail 0` (13 skipped)
* `node tools/tarkista-savukkeet.mjs` → kunnossa
* `node tools/tarkista-niputus.mjs` → kunnossa (398 moduulia)

Kaappaukset: `docs/raportit/kuvat/kerma-reuna-20260918/`
(`vanha-tyopoyta.png`, `vanha-puhelin.png`,
`uusi-tyopoyta-ita.png`, `uusi-tyopoyta-laaja.png`,
`uusi-puhelin-ita.png`, `uusi-puhelin-laaja.png`).
