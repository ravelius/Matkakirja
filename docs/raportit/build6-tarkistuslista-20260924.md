# Build 6 -tarkistuslista: omistajan build 5 -löydökset 1–16 (24.9.2026)

Tarkoitus: kun Natiiviseppä ilmoittaa korjaukset masterissa ja Julkaisija/
Natiiviseppä on asentanut uuden buildin simulaattoriin, aja tämä lista läpi
ja kirjaa PASS/FAIL per löydös. Lähde: docs/raamattu-loki/paatokset-2026-09.md,
otsikot "OMISTAJAN BUILD 5 -LOYDOS" 1–16 (Fable-haaran loki, ei vielä
mainissa kirjoitushetkellä). Kaikki testikomennot ja odotetut tulokset alla
on tarkistettu suoraan webin lähdekoodista (js/, css/) — ei muistinvaraisesti.

**Laitteet**: iPhone 18 Pro -simulaattori (kaikki löydökset raportoitiin
iPhonella). Ääni ei tarvita (paitsi jos joku löydös koskee ääntä — ei koske
näitä 16:ta).

**Komentotiedostot** (kirjoitetaan app-kontin Documents-kansioon,
`xcrun simctl get_app_container <UDID> <bundle-id> data`/Documents):
- `ui-komento.txt` → UiKomennot.cs (+ LinssiKomennot.cs `ui linssi …`) — ei
  vaadi aktiivista peliä.
- `peli-komento.txt` → PeliKomennot.cs — vaatii `uusi-peli`/`uusi-matka`.
- `komento.txt` → Komennot.cs — vanhempi 3D/kamera/offline-komentosarja.
- `linssi-komento.txt` → LinssiOhjain.cs — oikea linssiohjaus.

Jokainen kirjoittaa tuloksen vastaavaan `*-loki.txt`:ään (paitsi `komento.txt`,
joka lokittaa vain konsoliin). Kuva: `ui-komento.txt`: `kuva <nimi>` →
`Documents/ui-<nimi>.png`; `komento.txt`: `kuva <nimi>` → `Documents/<nimi>.png`.
`peli-komento.txt`:ssä ei ole kuva-komentoa — käytä `xcrun simctl io <udid>
screenshot` -kiertotietä (Simulator.app-GUI puuttuu tältä Macilta).

**Tila kirjoitushetkellä (24.9.2026 klo 10.3x, proto-master 333d3f0)**:
korjattu ja mergetty: 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15. EI VIELÄ
korjattu: 2 (maan väritaso/ääriviiva — odottaa Karttasepän osoitteita),
14 (navat — odottaa Karttasepän napalaatta-antia), 16 (pulun kytkentä —
odottaa Pelikoodarin rajapintaa). Tarkista uudelleen ennen ajoa — tilanne
muuttuu nopeasti, tämä ei ole pysyvä totuus.

---

## Löydös 1: Nostot (karttavalot) eivät näy kartalla

**Omistaja**: nostot/karttavalot eivät näy kartalla.
**Vastuu**: Natiiviseppä (NostoKerros) + Natiivi-UI (NostoMerkit). Haara
`natiivi-ui/nostomerkit` (mergetty 333d3f0).

**Testikomento**: siirry maahan jonka pinta-ala täyttää ison osan ruudusta
(esim. `peli-komento.txt`: `uusi-peli 1 ateena` → `odota-tila Kartta`,
odota saapumissekvenssin loppu) tai suoraan `ui-komento.txt`: `ui kartuscha
GRC auki` ei riitä pelkkään karttaan — käytä oikeaa saapumista. Ei ole
suoraa "pakota nosto näkyviin" -komentoa; tarkista silmin kartalta.
Ota kuva: `ui-komento.txt`: `kuva nostot-ateena`.

**Odotettu tulos webin mukaan** (`js/pallolauta/nostot.js`,
`js/fokuskohteet.js:4544`): nykyisen maan nostot näkyvät merkkeinä
(piste/kynäsymboli/tyyppimerkki aiheesta) heti kun maan bounding box
täyttää **≥50 %** näkymän leveydestä TAI korkeudesta (`lehdenOsuus()`),
tai koko maa on näkyvissä ≥30 %:n osuudella. Nimiöt 11 px kursiivi
halolla. Napautus avaa nostokortin. Enintään 40–120 samanaikaista
merkkiä (`NOSTOJEN_KATTO`).

**PASS-ehto**: merkit näkyvät kartalla ehdon täyttyessä, napautus avaa
kortin. **FAIL**: ei merkkejä ollenkaan tai näkyvät ehdon täyttymättä.

---

## Löydös 2: Muiden maiden huntu puuttuu (väritaso/ääriviiva)

**Omistaja**: webissä muut maat himmennetty ("huntu"), natiivissa ei.
**Fablen korjaus alkuperäiseen käsitykseen**: webissä ei ole huntua (poistettu
2.9.) — oikea ero on VÄRITASO + ÄÄRIVIIVA: webin pohja on sepiaa, VAIN
nykyinen maa saa väritetyt laatat + vahvistetun ääriviivan. Natiivin 23a-pohja
on värillinen kaikkialla.
**Vastuu**: Natiiviseppä (osoitteet Karttasepältä) — **EI VIELÄ KORJATTU
kirjoitushetkellä**, tarkista uudelleen ennen ajoa.

**Testikomento**: sama saapuminen kuin löydös 1. Vertaa pohjan väriä
nykyisen maan sisä- ja ulkopuolella. `kuva vari-ateena`.

**Odotettu tulos webin mukaan** (`js/pallovektorit.js`, `js/laattapyramidi.js`):
- Ääriviiva: väri `#6b5539` (`RAJA_MUSTE`, CSS-muuttuja `--raja-muste`),
  leveys 1,6–3 css-px zoomista riippuen, piirretty rantaviivan ALLE
  "hehkuna" (render-order -0.55), peitto 100 %.
- Väritaso: VAIN nykyinen maa saa värilliset laatat kansiosta
  `<versio>/vari/<ISO>/z…`; muu kartta pysyy sepian sävyisenä; klippaus
  aluevesirajaan asti.

**PASS-ehto**: nykyisen maan sisällä väri, muualla sepia, selvä
tummempi ääriviiva maan rajalla. **FAIL**: koko kartta värillinen tai
ääriviiva puuttuu/ei erotu.

---

## Löydös 3: Paikkakupla piirtyy toisen tekstin päälle

**Omistaja**: paikkakupla "Ateena, elokuussa 1873" piirtyy toisen haalean
tekstin päälle.
**Huom**: termiä "paikkakupla" ei ole natiivin koodissa — vastaa webin
matkakirjakortin otsikkoa (`.fact-card h2.paikka-aika`).
**Vastuu**: Natiivi-UI. Haara `natiivi-ui/paikkakupla` (mergetty 70c3a5f:
"auki olevan kortin aikana pilleri väistyy, ristihäivytysvuorottelu 6 s/3 s").

**Testikomento**: `ui-komento.txt`: `ui matkakirja ateena fokus` (avaa
matkakirjakortin), sitten avaa myös offline-pilleri/muu päällekkäinen
elementti jos komento löytyy, `kuva paikkakupla-ateena`.

**Odotettu tulos webin mukaan** (`js/ui-apurit.js:655`, `css/styles.css:4823`):
otsikko `.fact-card h2.paikka-aika` (font-size 0,86rem, ei isoja kirjaimia,
ei kirjainväliä), alaotsikko `.fact-place.tunnelma` kursiivilla. Ei
suoraa z-järjestys-taistelua — tausta on pergamenttihehku (`::before`,
radial-gradient, z-index -1, `isolation:isolate`), joten teksti ei koskaan
jää toisen tekstin alle; korjaus natiivissa on ristihäivytysvuorottelu
(6 s auki / 3 s piilossa) kilpailevien elementtien kesken.

**PASS-ehto**: vain yksi teksti näkyy kerrallaan samassa kohdassa,
vuorottelu selkeä. **FAIL**: kaksi tekstiä päällekkäin samanaikaisesti.

---

## Löydös 4: Aloituslennon kamera ja pisteet

**Omistaja**: aloituslennossa kaikkien kaupunkien pisteet pitäisi olla
piilossa paitsi kohdekaupunki; kamera lentokoneen etuviistosta ja
lähempää (ei yläviistosta kaukaa), kamera muuttaa jatkuvasti hitaasti
kulmaa ja korkeutta.
**Vastuu**: Natiiviseppä. Haara `natiiviseppa/nostot` + `natiiviseppa/
lento-kamera` (mergetty 21b3baa/18dd519: "lentokamera etuviistosta,
aloituslennolla vain kohdekaupunki").

**Testikomento**: `peli-komento.txt`: `uusi-matka ateena` (HUOM: pelkkä
`uusi-peli` EI laukaise lentoa, se asettaa tilan suoraan) tai
`ui-komento.txt`: `ui aloita ateena` jos PeliOhjain on jo olemassa.
Ota useita kuvia lennon aikana (`kuva lento-1`, `kuva lento-2` muutaman
sekunnin välein) kamerakulman muutoksen todentamiseksi.

**Odotettu tulos webin mukaan** (`js/kartta.js:2201` `aloituslennonNiukkuus()`,
`js/ui.js:615-741`): vain lähtö- ja kohdekaupungin pisteet/nimet näkyvät
(`.aloituslento-piste`/`-nimi`), muu kartta sumun (`.fokus-sumu-harso.
aloituslento-harso`) alla. Kaari kaartaa aina pohjoiseen. Ei eksplisiittistä
"jatkuvasti muuttuva kulma" -mainintaa webin koodissa — tämä on OMISTAJAN
UUSI TOIVE natiivin omalle esitykselle (RAAMATUN LENTO-ESITYS), ei suora
web-pariteettivaatimus; vertaa silti ettei natiivi näytä muita kaupunkeja
kuin kohteen.

**PASS-ehto**: vain kohdekaupunki näkyy koko lennon ajan, kamera liikkuu
näkyvästi lähempää/etuviistosta eikä ole paikallaan. **FAIL**: muita
kaupunkeja/nastoja näkyvissä TAI kamera pysähtyy/on kaukainen yläviisto.

---

## Löydös 5–7: iPhonen yläosa, Liiku-nappi, linssit pois laukusta

**Omistaja**: (5) koko näytön yläosa hyötykäyttöön — ruskea yläpalkki
+ logo pois, matkalaukun pilleri vasempaan yläreunaan lyhennettynä
("300£ 1/80"), oikeaan yläreunaan vain hampurilainen (+ hammasratas
kehittäjätilassa); (6) Liiku-nappi läpinäkyväksi ja pienemmäksi;
(7) linssit pois matkalaukusta — vain uudesta silmälasikuvakkeesta.
**Fablen rajaus**: koskee VAIN natiivia iPhonella, ei webiä eikä iPadia
(hyväksytty poikkeama "web on oletus" -säännöstä).
**Vastuu**: Natiivi-UI. Haara `natiivi-ui/iphone-yla` (mergetty 6e18ca9:
"ei palkkia eikä logoa, pilleri 300£ 1/80 vasemmalla, ☰ oikealla, Liiku
kevyempi ja pienempi, linssit pois laukusta").

**Testikomento**: `ui-komento.txt`: `ui ylapalkki kelluva` (pakottaa
kelluvan tilan päälle riippumatta laitteesta — käytä tätä varmuuden
vuoksi vaikka pitäisi tulla automaattisesti iPhonella), `kuva ylaosa-kelluva`.
Liiku: `ui liiku` (`kuva liiku-nappi`). Laukku: `ui laukku` — tarkista
ETTEI linssivalikko näy siellä, `kuva laukku-ilman-linsseja`.

**Odotettu tulos**: EI suoraa web-vastinetta layoutille (poikkeus
hyväksytty) — tarkista natiivin OMA speksi: ei ruskeaa palkkia, ei logoa,
pilleri "300£ 1/80" -muodossa vasemmalla, oikealla vain ☰ (+ ratas vain
kehittäjätilassa), puoliläpinäkyvä pergamenttitausta koko yläosalla.
Liiku-nappi puolilänpinäkyvä ja pienempi kuin ennen (vertaa aiempaan
pariteettikuvaan jos saatavilla — web itse käyttää TÄYSIN PEITTÄVÄÄ
kultagradienttia `.monitoimi-nappi`, joten natiivin läpinäkyvyys on
tarkoituksellinen iPhone-poikkeama, ei web-pariteettivirhe). Laukku
avautuu mutta EI näytä linssivalikkoa (linssit vain uudesta
silmälasikuvakkeesta — tarkista onko kuvake jo lisätty; jos ei, kirjaa
puutteeksi).

**PASS-ehto**: kaikki kolme osaa (yläosa, Liiku, laukku) täsmäävät
kuvaukseen. **FAIL**: palkki/logo yhä näkyvissä, Liiku ennallaan, tai
linssit yhä laukussa ilman erillistä kuvaketta.

---

## Löydös 8–10: Maapaneeli (kartuscha, Kreikka)

**Omistaja**: (8) Liiku-nappi peittää pinta-alan ja demokratian arvot;
(9) pulu ja "radio"-merkintä paneelin tekstin päällä; (10) rivit
tarkistettava webiä vasten ("Nyt", tyhjät arvot, keskitulon muoto,
kielirivin katkaisu). Fable laajensi (10): koko paneeli webin mukaan
kuva kuvalta.
**Vastuu**: Natiivi-UI. Haara `natiivi-ui/iphone-yla` sisälsi myös
14b325c: "Maan kortti (kartuscha) webin mukaan — masto ylhäällä ja lippu
nimen perässä, radio oikeassa yläkulmassa, rivit webin mitoin ilman
valtiomuoto-/Nyt-rivejä, kielet muodossa 'turkki · Länsi-Traakia',
Liiku väistyy ja pulu hyppää kortin yläpuolelle" (mergetty).

**Testikomento**: `ui-komento.txt`: `ui kartuscha GRC auki`
(`UiKomennot.cs:754`, ei vaadi aktiivista peliä). `kuva kartuscha-grc`.

**Odotettu tulos webin mukaan** (`js/pallolauta/maapaneeli.js`,
`js/fokusmitat.js:404-415`): rivijärjestys — valinnainen "Valtiomuoto
1873", otsikko "Nyt", sitten Väkiluku / Pinta-ala / Demokratia
(+"· V-Dem") / Keskitulo (esim. "45 000 $/v"), sijaluku näkyy vasta
napautuksesta; viimeisenä aina Kielet-rivi (liput+tervehdykset).
Puuttuvat kentät JÄTETÄÄN KOKONAAN POIS (ei tyhjää riviä). Arvorivit
katkaisevat ilman kolmea pistettä (`overflow:hidden;white-space:nowrap`),
MUTTA kielirivi nimenomaan RIVITTYY (`flex-wrap:wrap;white-space:normal`)
— jos natiivi katkaisee kielirivin, se on virhe.

**HUOM commit-viestin mukaan**: natiivin uusi versio EI näytä
Valtiomuoto-/Nyt-rivejä lainkaan — tarkista tämä täsmää webin
todelliseen käytökseen Kreikalla (onko Kreikalla näitä kenttiä webissä
ylipäätään; jos webillä on Valtiomuoto-rivi Kreikalle eikä natiivilla,
se on ero).

**PASS-ehto**: rivijärjestys ja sisältö täsmäävät, Liiku ja
pulu/radio eivät peitä tekstiä, kielirivi rivittyy eikä katkea.
**FAIL**: mikä tahansa edellä mainituista pettää.

---

## Löydös 11: Ihmisen matka — kertojan tekstilaatikko

**Omistaja**: tekstilaatikko pystysuora kapea kaista, sanat katkeavat
keskeltä; web: `min(31rem, 88 %)` keskitetty.
**Vastuu**: Natiivi-UI. Haara `natiivi-ui/iphone-yla` (a65f32a: "kertojan
laatikko … webin mukaan", mergetty).

**Testikomento**: `linssi-komento.txt`: `linssi ihmisen-matka` (avaa
oikean linssin). `ui-komento.txt`-mockilla nopeampi silmämääräiseen
tarkistukseen: `ui linssi matka jakso 1`. `kuva ihmisen-matka-teksti`.

**Odotettu tulos webin mukaan** (`css/aikajana.css:162`):
`.aikajana-avaus-kehys { width: min(31rem, 88%) }` (kuvallisessa
variantissa `min(52rem, 92%)`), keskitetty. Sanat eivät saa katketa
keskeltä millään näytönleveydellä ≥ tuon minimin.

**PASS-ehto**: teksti leveänä laatikkona (~31rem tai 88 % leveydestä),
sanat kokonaisina. **FAIL**: kapea pystykaista, sanat katkeavat.

---

## Löydös 12: Ihmisen matka — loppu ja kamera

**Omistaja**: esityksen lopussa irrallinen sana "Afrikasta." kartalla,
kamera jättää pallon alareunan mustaksi ristikoksi.
**Vastuu**: Linssiseppä (kamera + tekstin päättyminen). Haara
`linssiseppa/avaruusavaus` (fc77474, mergetty): "Ihmisen matkan avaus
avaruudesta — kamera mustan alla 300 pallonsäteen päähän Afrikan yllä,
tähtitaivas kertoimella 60, PalloKierto.AsetaKaukaa+Etene sallii
alkukorkeuden katon yli."

**Testikomento**: `linssi-komento.txt`: `linssi ihmisen-matka` →
`ihminen tutkimus` (hyppää suoraan loppuun/tutkimusvaiheeseen,
`LinssiOhjain.cs:1004-1011` → `Esitys.Loppuun()`) TAI `esitys tila`
seurataksesi normaalia etenemistä loppuun asti. `kuva ihminen-loppu`.

**Odotettu tulos webin mukaan** (`js/aikajana.js` `lopeta()` ~4923):
kamera vetäytyy koko kaaren näkymään (`sovitaKaareen()`) EI jää
lähikuvaan pallon reunasta; loppupaneelin sisältö KORVATAAN kokonaan
(`vaihdaPaneeli`), ei liitetä vanhan perään — ei jää irrallista sanaa
näkyviin kartalle. Ei löytynyt web-koodista erillistä "irrallinen sana"
-käsittelyä — todennäköisesti natiivin oma virhe tekstin animaation
siivouksessa, ei suora web-vertailu. Kamera-korjaus (fc77474) pitäisi
poistaa mustan ristikon.

**PASS-ehto**: ei irrallista sanaa jäljellä kartalla lopussa, ei mustaa
ristikkoa pallon alareunassa. **FAIL**: jompikumpi näkyy yhä.

---

## Löydös 13: Offline-lataus jättää mustia laattaneliöitä

**Omistaja**: offline-latauksen aikana kartalle jää mustia laattaneliöitä
(Balkan) — näkyvät laatat eivät lataudu ensin.
**Vastuu**: Natiiviseppä. Haara `natiiviseppa/laatat-offline` (mergetty
39452a1/5c982d0: "näkyvät laatat etusijalle, uusintayritykset,
pergamenttivaralaatta mustan sijaan").

**Testikomento**: `komento.txt`: `alue lataa BGR` (tai `alue lataa
maailma` laajempaan testiin) samalla kun liikutat karttaa Balkanilla.
Seuraa `palvelin`-komennon lokia (offline/cache/network/error/
placeholder-laskurit). `kuva offline-lataus-balkan`.

**Odotettu tulos webin mukaan** (`js/laattaesilataus.js`,
`js/pallolaatat.js:3178-3192`): näkyvän näkymän laatat FIFO-jonon
KÄRKEEN (`nakyma()` unshift), maan muut laatat jonon HÄNTÄÄN
(`maa()` push). Puuttuva/latautuva laatta korvataan aina karkeammalla
"vara"-laatalla + taustavärillä — EI KOSKAAN pelkkää mustaa/tyhjää.

**PASS-ehto**: näkyvät laatat latautuvat ensin, puuttuvan tilalla
näkyy vaalea "vara"-laatta, ei mustia neliöitä. **FAIL**: mustia
neliöitä näkyy siirtymän aikana.

---

## Löydös 14: Navat puuttuvat

**Omistaja**: pohjois- ja etelänavalla mustia sektoreita ja harmaita
täpliä (pyramidi loppuu ±85°, ei napakalottia), Etelämanner sumeana.
**Vastuu**: Natiiviseppä (napakalotti webin mukaan) + Karttaseppä
(webin tapa + mahdollinen napalaatta). **EI VIELÄ KORJATTU
kirjoitushetkellä** — tarkista uudelleen ennen ajoa.

**Testikomento**: `komento.txt`: `aja 90 0 20` (pohjoisnapa) ja
`aja -90 0 20` (etelänapa) — geneerinen kamerakomento
(`Komennot.cs:106-108`). `kuva napa-pohjoinen`, `kuva napa-etelainen`.

**Odotettu tulos webin mukaan** (`js/pallo.js:2109+`,
`tools/tee-napakalotit.mjs`): Web Mercator -laattaverkko loppuu 85,05°:ssa,
mutta näkyvä sauma (83,7–84,25°) on peitetty kiinteällä "napakannella"
meren/jään sävyisenä, ja sen päällä oma atsimutaalinen napakalotti-KUVA
(pohjoinen 80–90°, eteläinen leveämpi 60–90° Etelämantereen takia),
reunat sulautettu läpinäkyviksi. Ei mustia sektoreita, ei harmaita
täpliä, ei sumeutta.

**PASS-ehto**: molemmat navat peittyvät saumattomasti, ei mustaa/harmaata,
Etelämanner terävä. **FAIL**: mustia sektoreita tai sumeutta näkyy yhä.

---

## Löydös 15: Karttaselite avautuu paikkakuplan ja silmälasinapin alle

**Omistaja**: selitepaneeli avautuu paikkakuplan ja silmälasinapin alle
(kupla peittää välilehdet, nappi kelluu paneelin päällä).
**Vastuu**: Natiivi-UI (z-järjestys ja väistö webin mukaan). Haara
`natiivi-ui/iphone-yla` (a65f32a: "Karttaselite webin mukaan — paneeli
ei jää silmälasinapin ja lapun alle, ne väistyvät auki ollessa, leveys
221, rivit 27 px…", mergetty).

**Testikomento**: `ui-komento.txt`: `ui selite` (avaa Nostot-välilehdellä),
avaa samaan aikaan matkakirjakortti/silmälasinappi jos komento löytyy
päällekkäisyyden todentamiseksi. `kuva karttaselite-auki`.

**Odotettu tulos webin mukaan** (`css/styles.css:25763-25859`):
suljettu paneeli `top:0.4rem;right:0.4rem;z-index:6`; AUKI ollessa
`.map-pane` nostetaan omaksi `isolation:isolate`-pinoksi z-index 5:een
(EI itse selitteen z-indexiä nosteta rivin z-index 4 yli) — käytännössä
paneeli JA sen konteksti nousee koko muun kartan yläpuolelle, jolloin
mikään map-pane-elementti (rivi, kupla) ei voi jäädä sen päälle.
Leveys 221 px, rivikorkeus 27 px, merkkisarake luontainen leveys,
lukumäärä himmeänä 11,84 px, valittu rivi korostuu pohjavärillä ilman
lihavointia.

**PASS-ehto**: paneeli näkyy kokonaan minkään muun elementin peittämättä,
mitat/tyyli täsmäävät. **FAIL**: kupla tai silmälasinappi peittää
paneelin tai sen välilehdet.

---

## Löydös 16: Pulun chat ei ole kytketty natiivissa

**Omistaja**: vastaus "Livian keskustelu ei vielä ole auki tässä
sovelluksessa. Kupla ja äänet toimivat."
**Vastuu**: Natiivi-UI (kytkee webin pulu-workeriin) + Pelikoodari
(rajapinta ja sallinta). **EI VIELÄ KORJATTU kirjoitushetkellä** —
tämä on iso ominaisuus, ei odoteta build 6:een ellei erikseen ilmoiteta
valmiiksi.

**Testikomento**: `ui-komento.txt`: `ui chat` (avaa paneelin), `ui chat
<kysymys>` (esim. `ui chat mikä on demokratiaindeksi`) — tarkista onko
vastaus yhä oma-aloitteinen "ei vielä auki" -teksti vai oikea vastaus.
`kuva pulu-chat`.

**Odotettu tulos webin mukaan** (`js/packs/pollo-asetukses.js`,
`js/pollo.js:5888-5940`, `js/pollo-haku.js`): osoite
`https://matkakirja-pollo.samireivinen.workers.dev` (Cloudflare Worker),
POST JSON, valinnainen SSE-striimaus (`Accept: text/event-stream`,
tapahtumat `pala`/`loppu`/`virhe`), AINA paikallinen sisältöhaku ensin
(`haeKatkelmat()`/`haeAineisto()`, enintään 4 katkelmaa, painotettu
pelaajan sijainnilla) liitetään kontekstiin ennen kysymyksen lähetystä,
ja spoiler-suojaus (LEHTI_LOHKOT/SPOILERI_LOHKOT-lista) estää
aktiivisen visan/kaksintaistelun sisällön vuotamisen.

**PASS-ehto**: chat vastaa oikeasti kysymyksiin pelin sisällöstä eikä
palauta "ei vielä auki" -tekstiä. **FAIL/ODOTETTU KESKEN**: sama
"ei vielä auki" -vastaus kuin build 5:ssä (ei yllätys, ei tarvitse
raportoida uutena löydöksenä ellei Fable ole ilmoittanut valmiiksi).

---

## Yhteenveto-taulukko (täytetään ajon jälkeen)

| # | Löydös | Tila ennen ajoa | PASS/FAIL | Kuva | Huomio |
|---|--------|-----------------|-----------|------|--------|
| 1 | Nostot | Mergetty | | | |
| 2 | Väritaso/ääriviiva | EI mergetty | | | |
| 3 | Paikkakupla | Mergetty | | | |
| 4 | Aloituslento kamera | Mergetty | | | |
| 5 | iPhone yläosa | Mergetty | | | |
| 6 | Liiku-nappi | Mergetty | | | |
| 7 | Linssit pois laukusta | Mergetty | | | |
| 8 | Maapaneeli: Liiku peittää | Mergetty | | | |
| 9 | Maapaneeli: pulu/radio peittää | Mergetty | | | |
| 10 | Maapaneeli: rivit webin mukaan | Mergetty | | | |
| 11 | Ihmisen matka: tekstilaatikko | Mergetty | | | |
| 12 | Ihmisen matka: loppu/kamera | Mergetty | | | |
| 13 | Offline: mustat laatat | Mergetty | | | |
| 14 | Navat | EI mergetty | | | |
| 15 | Karttaselite | Mergetty | | | |
| 16 | Pulun chat | EI mergetty (iso ominaisuus) | | | |

Muista: "Tila ennen ajoa" -sarake on kirjoitushetken (klo 10.3x) tilanne —
tarkista `git log` proto-3d-repossa uudelleen ennen varsinaista ajoa, koska
useampi sessio korjaa näitä rinnakkain juuri nyt.
