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

## Löydös 4: Aloituslennon kamerakäsikirjoitus, taivas/maasto ja pisteet (+ hehkurenkaat aloitusvalinnassa)

**Omistaja (alkuperäinen)**: aloituslennossa kaikkien kaupunkien pisteet
piilossa paitsi kohdekaupunki; kamera lentokoneen etuviistosta ja
lähempää, kamera muuttaa jatkuvasti hitaasti kulmaa ja korkeutta.
**Omistaja (Fable 24.9. klo 10.4x, tarkennus RAAMATUN LENTO-ESITYKSEEN)**:
kamerakäsikirjoitus lähelle konetta → kauemmas → kohdekaupungin kierto;
tempo; sininen taivas; 3D-maasto auringon varjoineen; vain kohdepiste
näkyy. Lisäksi: **hehkurenkaat aloitusvalinnassa** (kaupunkivalintaruutu
ennen lentoa) — pariteettikierroksen rivi 2 löysi tämän jo puuttuvana
natiivista.
**Vastuu**: Natiiviseppä. Haarat `natiiviseppa/nostot` + `natiiviseppa/
lento-kamera` (mergetty 21b3baa/18dd519: "lentokamera etuviistosta,
aloituslennolla vain kohdekaupunki") — kameran LISÄVAIHEET (lähelle →
kauemmas → kierto), taivas ja maasto/varjot eivät vielä olleet
mergetyissä committeissa kirjoitushetkellä, tarkista uudelleen. Hehkurenkaat
aloitusvalinnassa: ei vielä nähty korjauskommittia — tarkista.

**TÄRKEÄÄ: todenna kuvasarjana, ei yhdellä kuvalla.** Ota vähintään 5–6
kuvaa tasavälein koko lennon keston ajalta (esim. 0,5 s / 1,5 s / 3 s /
5 s / 7 s / perillä), jotta kameran vaiheet (lähelle/kauemmas/kierto) ja
tempon muutos näkyvät sarjasta, ei arvauksena yhdestä ruudusta.

**Testikomento — aloitusvalinnan hehkurenkaat**: `ui-komento.txt`:
`ui aloitus valinta` (tai vastaava pikakomento kaupunkivalintaruutuun,
tarkista UiKomennot.cs jos nimi muuttunut) ennen minkään kaupungin
valintaa. `kuva aloitusvalinta-renkaat`.

**Testikomento — lentokäsikirjoitus**: `peli-komento.txt`: `uusi-matka
ateena` (HUOM: pelkkä `uusi-peli` EI laukaise lentoa) tai `ui-komento.txt`:
`ui aloita ateena`. Heti komennon jälkeen ota kuvasarja: `kuva lento-00`,
`kuva lento-05`, `kuva lento-15`, `kuva lento-30`, `kuva lento-50`,
`kuva lento-perilla` (aikaleimat sekunteina komennosta, säädä todellisen
lennon kestoon).

**Odotettu tulos**:
- *Pisteet ja kaari (web-pariteetti, `js/kartta.js:2201`
  `aloituslennonNiukkuus()`, `js/ui.js:615-741`)*: vain lähtö- ja
  kohdekaupungin pisteet/nimet näkyvät, muu kartta sumun alla, kaari
  kaartaa pohjoiseen.
- *Hehkurenkaat aloitusvalinnassa (web-pariteetti, `css/styles.css:
  8105-8129`, `js/ui.js:10460`)*: valittavissa olevilla kaupungeilla
  `.target-ring.pick` — kultabronssi ääriviiva `#b08a3c`, leveys 2 px,
  EI hehkusuodatinta (tarkoituksella, suorituskyvyn takia) mutta SYKKIVÄ
  opasiteetti-animaatio `kohde-syke` (0,55→1→0,55, 2,6 s silmukka).
  Kosketuksessa täyttö `rgba(176,138,60,0.18)`, valittuna väri vaihtuu
  `#e8b23c`:iin ja leveys 3 px:ään. Natiivin pitää näyttää sama sykkivä
  rengas jokaisella valittavissa olevalla kaupungilla.
- *Kamerakäsikirjoitus, taivas, maasto/varjot — EI WEB-PARITEETTIA,
  omistajan oma spesifikaatio natiiville*: WEB EI TEE mitään näistä —
  tutkittu ja vahvistettu ettei web-koodissa (`js/pallolauta/avaus.js:
  58-90`) ole lähelle→kauemmas→kierto-vaiheistusta (omistaja on aiemmin
  NIMENOMAAN POISTANUT vastaavan monivaiheisen/nykivän kameran webistä
  ja korvannut sen yhdellä jatkuvalla kaarella/zoomilla), ei sinistä
  taivasta (tausta on tähtitaivas, `js/pallolauta/tahdet.js:130-132`),
  eikä maaston varjostusta (ei `castShadow`/`shadowMap`-koodia, pelkkä
  tasainen valaistus). Tämä on siis PUHTAASTI natiivin oma RAAMATUN
  LENTO-ESITYS-vaatimus — testaa omistajan sanallista kuvausta vasten
  (lähelle konetta → kauemmas → kohdekaupungin kierto, sopiva tempo,
  sininen taivas, 3D-maasto auringonvalolla ja varjoilla), ÄLÄ webin
  koodia vasten, koska web ei tarjoa vertailukohtaa tälle osalle.

**PASS-ehto**: (a) vain kohdekaupunki näkyy koko lennon ajan; (b)
kuvasarjassa erottuu selvästi vähintään kaksi kameran etäisyys-/
kulmavaihetta (lähempänä alussa, kauempana/kiertäen myöhemmin), ei
paikallaan pysyvä kamera; (c) taivas sininen (ei tähtitaivas/musta)
ja maastossa näkyy varjostusta lennon aikana; (d) aloitusvalintaruudussa
kaikilla valittavissa olevilla kaupungeilla sykkivä hehkurengas.
**FAIL**: mikä tahansa yllä olevista puuttuu tai kuvasarja näyttää
staattisen/muuttumattoman kameran.

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

**UUSINTA 24.9. klo 12.2x (SHA 921e0b6, NaN-suojan jälkeen, TUOREELLA
pelillä ilman kartuscha-kutsua)**: `aja 89 0 20 1.5` (pohjoisnapa) EI
kaatanut/spämmännyt — näkyi täyttämätön harmaa/ruskea alue navan
kohdalla, ei mustaa muttei myöskään selkeää jäätä/napakalottia
(`14-napa-pohjoinen-tuore.png`). HETI PERÄÄN `aja -89 0 20 1.5`
(etelänapa) TOI SAMAN "Screen position out of view frustum (screen pos
603.000000, 1311.000000) (Camera rect 0 0 1206 2622)" -spämmin TAKAISIN
(`14-napa-etelainen-tuore.png`) — Antarktis itsessään näytti siistiltä
valkoiselta täytöltä (hyvä merkki), mutta virhelaatikko ja jumiutunut
"KREIKKA"-kartuscha-paneeli (vaikkei sitä avattu tällä kertaa komennolla)
jäivät pysyvästi näkyviin loppuistunnon ajaksi (myös kameran palautus
päiväntasaajalle ei poistanut niitä, ks. `4-renkaat-jumittunut.png`).
**Havainto Natiivisepälle lähetetty**: 603/1311 = tarkalleen ruudun
keskipiste — vaikuttaa NaN-korvausarvolta; bugi liittyy todennäköisesti
mihin tahansa maailmakoordinaatin ruutuprojektioon (esim. maapaneelin
sijoittelu) äärimmäisillä leveysasteilla, ei pelkästään kartuscha-
komentoon. Vaatii sovelluksen UUDELLEENKÄYNNISTYKSEN puhdistuakseen.

**Testikomento**: `komento.txt`: `aja 89 0 20 1.5` (pohjoisnapa) ja
`aja -89 0 20 1.5` (etelänapa), Natiiviseppän oikea 4-parametrinen
syntaksi. `ui jatka` ensin jos peli ei ole Kartta-tilassa. `kuva
napa-pohjoinen`, `kuva napa-etelainen`. KÄYNNISTÄ APPI UUDELLEEN ennen
toista napaa jos ensimmäinen laukaisee spämmin, jotta jälkimmäinen
näkyy puhtaana.

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

## Löydös 17: Aloitusnäyttö — pallo täyttää ruudun, pisteet pois, hidas pyöritys, sumea

**Omistaja (Fable 24.9. klo 10.4x)**: aloitusnäytön (etusivun) pallon
pitää täyttää ruutu, pyöriä hitaasti, olla sumennettu, eikä siinä saa
näkyä kaupunkipisteitä — verrattava webin etusivupalloon.
**Vastuu**: ei vielä nimetty — kirjaa löydös eteenpäin jos ero löytyy.

**Testikomento**: aloitusnäyttö tulee esiin sovelluksen käynnistyessä
ennen mitään pelikomentoa (ei vaadi `uusi-peli`). Käynnistä sovellus
kylmästi simulaattorissa ja ota kuva heti (`ui-komento.txt`: `kuva
etusivu-heti`), ja uudestaan ~5 s myöhemmin (`kuva etusivu-5s`)
pyörimisen näkemiseksi.

**Odotettu tulos webin mukaan** (`js/etusivupallo.js`,
`tools/tee-etusivupallo.mjs`): pallo on ENNALTA RENDERÖITY video
(ei live-3D), 6 px:n sumennus (`SUMENNUS=6`) leivottu videoon
`filter: blur(6px)` esikäsittelyssä. Pallo TÄYTTÄÄ KOKO etusivun ja
jatkuu ruudun reunojen yli (`KIEKON_YLITYS`). EI mitään pisteitä/
nastoja/nimiä koskaan — Globe.gl-alustuksessa ei kutsuta
`.pointsData()`/`.labelsData()`/`.htmlElementsData()` lainkaan, joten
niitä ei tarvitse edes piilottaa, niitä ei koskaan luoda. Pyörimisnopeus
on kiinteä videon reitin/keston mukaan (ei erillistä käyntiaikaista
asetusta) — vertaa silmämääräisesti "hitaaseen" tahtiin, ei tarkkaan
astelukuun koska web ei anna sitä numerona.

**PASS-ehto**: natiivin pallo täyttää ruudun reunasta reunaan, näkyvästi
sumea, pyörii hitaasti kahden kuvan välillä, ei yhtään pistettä/nastaa
näkyvissä. **FAIL**: pallo ei täytä ruutua, terävä (ei sumea), pistoja/
nastoja näkyy, tai pyöriminen pysähtynyt/liian nopea.

---

## Löydös 18: Liiku-nappi täysin läpinäkyväksi

**Omistaja (11.1x, tarkennus löydös 6:een)**: Liiku-nappi läpinäkyväksi
— VAIN teksti ja kevyt reuna, EI puoliläpinäkyvää taustaa (aiempi 6-korjaus
jätti taustan puolilänpinäkyväksi, ei riitä).
**Vastuu**: Natiivi-UI, master `a33385c` — Fable merkitsi tehdyksi
kirjoitushetkellä ("LOYDOKSET 18–19 MASTERISSA a33385c").

**Testikomento**: `ui-komento.txt`: `ui liiku`, `kuva liiku-lapinakyva`.

**Odotettu tulos**: EI web-pariteettia (web käyttää täysin peittävää
kultanappia, ks. löydös 6) — tämä on natiivin oma iPhone-erikoisratkaisu.
Vain teksti "Liiku" ja ohut reunaviiva näkyvät, tausta täysin läpinäkyvä
(kartta näkyy suoraan läpi napin alueelta).

**PASS-ehto**: ei minkäänlaista taustavärjäystä napin alueella, vain
teksti+reunaviiva. **FAIL**: puoliläpinäkyvä tai täysin peittävä tausta
yhä näkyvissä.

---

## Löydös 19: Kartta kevyesti sumennettuna kuvien aikana

**Omistaja (11.1x)**: kartta kevyesti sumennettuna aina kun isoisän tai
pulun kuvia näkyvillä (paikkakupla, kohtaamis-/nostokortti, pulun
puhekupla kuvalla) — sama mekanismi kuin porttiverho (löydös 17) mutta
miedompi. Web ennallaan (natiivin oma parannus).
**Vastuu**: Natiivi-UI, master `a33385c` (kuvat
`natiivi-b6-kuvasumea-luenta/-pulu-iphone.jpg`, Fable hyväksynyt).

**Testikomento**: avaa matkakirjakortti (`ui matkakirja ateena fokus`)
ja pulun puhekupla kuvalla (`ui chat` tai vastaava), `kuva
kartta-sumea-luenta`, `kuva kartta-sumea-pulu`.

**Odotettu tulos**: kartta taustalla näkyvästi mutta MIEDOSTI sumea
(vähemmän kuin porttiverhon 6 px) kun isoisän/pulun kuva on näkyvissä;
sumennus poistuu kun kuva sulkeutuu.

**PASS-ehto**: selvä mutta kevyt sumennusero kortin ollessa auki vs.
kiinni. **FAIL**: ei sumennusta ollenkaan tai yhtä voimakas kuin
porttiverho.

---

## Löydökset 20–21: EIVÄT VIELÄ BUILD 6:SSA — siirretty build 7:ään

Fable (24.9.2026 klo 11.37): "LOYDOKSET 20–21 (NATIIVI-UI, KESKEN)
MENEVAT BUILD 7:AAN". Ei testata tässä ajossa.

- **Löydös 20** (klo 11.2x): iPhonen yläreuna kokonaan uusiksi —
  matkalaukkuryhmä kahtena pillerinä Islandin vasemmalla puolella
  ("300£ · 1/80" + kaupungin nimi), hampurilainen+karttanappi oikealla,
  silmälasinappi poistuu, hammasratas ☰-valikon "Kehittäjä"-riviksi.
  Kumoaa osan löydös 5:n aiemmasta ratkaisusta.
- **Löydös 21**: isoisän/pulun tekstit oletuksena piilossa (vain ääni,
  napautuksesta auki, Raamattu 14.–20.9.), pulun animaatio + matkakirjan
  sykkivä kaiutin reagoi aidosti äänitasoon (GetOutputData). Liittyy myös
  radion aitoon VU-mittariin (build 7, ei kiirettä build 6:een).

---

## Yhteenveto-taulukko (täytetään ajon jälkeen)

| # | Löydös | Tila ennen ajoa | PASS/FAIL | Kuva | Huomio |
|---|--------|-----------------|-----------|------|--------|
| 1 | Nostot | Mergetty | **PASS** | 1-2-nostot-varitaso-kreikka.png | Kreikka zoomattuna: kymmeniä tyyppimerkkejä (temppeli/vuori/silta/eläin/salama-ikonit), napautus avasi ryhmälistan (Delfoi/Thermopylai) |
| 2 | Väritaso/ääriviiva | Mergetty (7b3adee) | **PASS** | 1-2-nostot-varitaso-kreikka.png | Kreikka värillinen/teksturoitu + tumma ääriviiva, muu kartta tasaisen sepian värinen |
| 3 | Paikkakupla | Mergetty | **PASS** | 3-paikkakupla-kohtaaminen.png | "Ateena, elokuussa 1873" -pilleri ei mene päällekkäin kohtaamisdialogin puhekuplan kanssa |
| 4 | Aloituslento kamera+taivas+maasto+hehkurenkaat | Osin mergetty (perus) | **PASS (kamera+taivas+piste), EI VOITU TESTATA (hehkurenkaat)** | 4-lento-00/05/09-*.png | Kuvasarja: lähikuva koneesta laskeutuen (frame 0), kaukainen globe-näkymä sininen taivas + vain "Ateena" näkyvissä (frame 5), kiertävä/sukeltava lähestyminen (frame 9). Hehkurenkaat: yritin Natiiviseppän `renkaat ateena,kairo ateena` -komennolla, mutta kamera oli jumissa samassa tyhjässä näkymässä kuin löydös 14:ssä (ks. rivi 14:n huomio debug-ylivuodosta) — ei nähty renkaita, syy todennäköisesti sama tukos |
| 5 | iPhone yläosa | Mergetty | **PASS** | (näkyy kaikissa kuvissa) | Ei ruskeaa palkkia/logoa koko ajon läpi, vain kelluva "300£ 1/80" -pilleri + ratas/hampurilainen oikealla |
| 6 | Liiku-nappi (puoliläpinäkyvä→pienempi) | Mergetty | **KORVATTU löydös 18:lla** | — | Ks. rivi 18 |
| 7 | Linssit pois laukusta | Mergetty | **PASS** | 7-laukku-ei-linsseja.png | Laukun "Matka"-välilehdellä ei linssilistaa; erillinen silmälasikuvake (🕶) näkyy omana nappinaan kartan reunassa |
| 8 | Maapaneeli: Liiku peittää | Mergetty | **PASS** | 8-10-maapaneeli-kreikka.png | Liiku ei näy paneelin päällä avatussa kartuscha-näkymässä |
| 9 | Maapaneeli: pulu/radio peittää | Mergetty | **PASS** | 8-10-maapaneeli-kreikka.png | Pulu näkyy paneelin oikealla puolella tekstin ULKOPUOLELLA, "radio"-ikoni omalla rivillään otsikossa, ei tekstin päällä |
| 10 | Maapaneeli: rivit webin mukaan | Mergetty | **PASS** | 8-10-maapaneeli-kreikka.png | KREIKKA + lippu, alaotsikko "ΕΛΛΑΣ · Hellas · kuningaskunta v. 1873", sitten Väkiluku/Pinta-ala/Demokratia/Keskitulo, Kielet-rivi rivittyy kahdelle riville |
| 11 | Ihmisen matka: tekstilaatikko | Mergetty | **PASS** | 11-ihmisen-matka-teksti.png | `linssi ihmisen-matka`: kertojan teksti leveänä nelirivisenä laatikkona, sanat eivät katkea kesken, ei kapeaa pystykaistaa |
| 12 | Ihmisen matka: loppu/kamera | Mergetty | **PASS (todennäköinen)** | 12-ihmisen-matka-loppu.png | `ihminen tutkimus` (hyppy loppuun): pallo näkyy siistinä, ei mustaa ristikkoa alareunassa. "Afrikasta."-sana oli jo aiemmin Natiivi-UI:n todettu ei-bugiksi (24.9.), joten ei testattu erikseen tässä |
| 13 | Offline: mustat laatat | Mergetty | **PASS** | 13-offline-lataus.png | `alue lataa BGR`: "Ladataan 2 maata · 11 %" -ilmoitin, EI mustia laattaneliöitä latauksen aikana — tausta pysyy vaaleana |
| 14 | Navat | Mergetty (7b3adee) | **EI VOITU LUOTETTAVASTI TESTATA — MAHDOLLINEN UUSI ONGELMA** | 14-napa-pohjoinen-epavarma.png | Natiiviseppän oikealla syntaksilla (`aja 89 0 20 1.5`, `ui jatka` ensin) kamera näytti silti täysin tyhjän/tekstuurittoman alueen (Norja/Islanti-nimet näkyivät mutta EI YHTÄÄN reliefiä/väriä/napakalottia). SAMANAIKAISESTI kehityskonsoli spämmäsi jatkuvasti "Screen position out of view frustum (screen pos 603.000000, 1311.000000) (Camera rect 0 0 1206 2622)" koko ajon loppuosan ajan (ilmestyi `ui kartuscha GRC auki` -komennon jälkeen, ei poistunut). Epäilen että tämä debug-ylivuoto (todennäköisesti KREIKKA-paneelin radio-ikoni tms. jäänyt kiinni pelitilaan) esti kameran/kartan normaalin toiminnan lopputestien ajaksi — myös `renkaat`-testi (ks. rivi 4) epäonnistui samasta syystä. SUOSITUS: seuraava kierros TUOREELLA pelillä ilman `ui kartuscha`-kutsua ennen napa-/rengastestejä. |
| 15 | Karttaselite | Mergetty | **PASS** | 15-karttaselite.png | Paneeli täysin näkyvissä, ei minkään peittämä, NOSTOT/MAAKUNNAT-välilehdet ja lukumäärät näkyvät selvästi |
| 16 | Pulun chat | Melkein (odotti allowlistia) | **PASS (yllättäen)** | 16-pulu-chat-vastaus.png | `ui chat "mikä on demokratiaindeksi"` antoi OIKEAN, asiallisen vastauksen (ei enää "ei vielä auki" -tekstiä) — allowlist tms. vaikuttaa olevan jo kunnossa simulaattorissa |
| 17 | Aloitusnäyttö: pallo, sumennus, pyöritys | Mergetty (7b3adee) | **PASS** | 17-etusivupallo-a.png, 17-etusivupallo-b.png | Kaksi kuvaa 5 s välein: selvästi eri maisema (pallo pyörinyt), koko ruudun täyttävä, sumea, ei yhtään kaupunkipistettä kummassakaan |
| 18 | Liiku-nappi täysin läpinäkyväksi | Mergetty (a33385c) | **EPÄSELVÄ / MAHDOLLINEN FAIL** | 18-liiku-aktiivinen.png | Kulkutapavalitsimen ollessa auki (thumbs-up/tram/boat/plane-rivi näkyvissä) Liiku-nappi on TÄYSIN PEITTÄVÄ kulta/oranssi, ei läpinäkyvä. Voi olla eri komponentti/tila kuin "lepotilan" nappi — tarkistettava kumpaa tilaa löydös 18 koskee |
| 19 | Kartta sumea kuvien aikana | Mergetty (a33385c) | **PASS (todennäköinen)** | 3-paikkakupla-kohtaaminen.png | Kohtaamisdialogin (kuvallinen) taustalla olevat kaupunkinimet selvästi haaleampia/matalakontrastisempia kuin sama alue ilman dialogia (vrt. Kreikka-kuviin) — tulkittu kevyeksi sumennukseksi/himmennykseksi. Ei suoraa ennen/jälkeen-vertailua samasta kohdasta, joten "todennäköinen" ei varma PASS |
| 20 | iPhonen yläreuna uusiksi | EI (build 7) | — | — | Fable 24.9. klo 11.47: siirretty build 7:ään |
| 21 | Isoisän/pulun tekstit piilossa oletuksena | EI (build 7) — ei testata | — | — | Siirretty |

**Yhteenveto**: 15 PASS/todennäköinen PASS (1,2,3,4-osin,5,7,8,9,10,11,12,13,15,16,17,19), 1 siirretty build 7:ään Fablen päätöksellä (18: umpikultainen aktiivitila, Natiivi-UI korjaa), 1 ei voitu luotettavasti testata + mahdollinen uusi debug-ylivuoto-ongelma (14), 2 siirretty build 7:ään (20,21). Kuvat: `/Users/Shared/Claude/proto-3d/lokit/build6-tarkistus-20260924/` (ei repossa, jaettu Mac-polku, CLAUDE.md dist-periaate).

**Ajon SHA**: proto-master `7b3adee`, asennettu iPhone 18 Pro
-simulaattoriin (1572C658) Natiiviseppän toimesta 24.9.2026 klo 11.4x.
Natiiviseppän vinkit tähän ajoon: `komento.txt`: `hiljaa` (mykistää koko
sovelluksen), `vari FRA` (pakottaa väritason näkyviin), `portti paalle|pois`
(porttiverho), `renkaat ateena,kairo ateena` (pakottaa hehkurenkaat).

---

# Build 7 -tarkistuslista (runko, kirjoitettu 24.9.2026 klo 12.0x ennen builda)

Fable pyysi rungon valmiiksi ennen build 7:n asennusta, samaan
tiedostoon. Lähde: docs/raamattu-loki (Fable-haara), tarkistettu
olennaisin osin webin lähdekoodista. Täytetään PASS/FAIL-sarake ja
kuvat kun build 7 on asennettu.

## B7-1 (jatkoa löydös 18:aan): Liiku-nappi läpinäkyvä myös aktiivisena

**Omistaja (Fable 24.9. klo 11.52)**: build 6:ssa Liiku on läpinäkyvä
levossa mutta TÄYSIN PEITTÄVÄ KULTA kulkutapavalitsimen ollessa auki
(löydös 18:n alkuperäinen korjaus kattoi vain lepotilan). Myös aktiivisen
tilan pitää olla läpinäkyvä: kultainen reuna ja teksti, kevyt läpikuultava
täyttö, EI umpikultaa.
**Vastuu**: Natiivi-UI, build 7.

**Testikomento**: `ui-komento.txt`: `ui liiku` NIIN ETTÄ aktiivinen peli
on käynnissä (jotta oikea kulkutapavalitsin avautuu, ei mock). `kuva
liiku-aktiivinen-b7`. Vertaa build 6:n kuvaan
`18-liiku-aktiivinen.png` (umpikulta).

**Odotettu tulos**: EI web-pariteettia (natiivin oma iPhone-ratkaisu,
ks. build6-listan löydös 6/18). Nappi näyttää samalta läpinäkyvältä
kuin lepotilassa (vrt. `zoom-greece2.png`/`l18-liiku.png`-tyylinen
ohutreunainen tausta), riippumatta siitä onko kulkutapavalitsin auki.

**PASS-ehto**: Liiku-nappi läpikuultava/reunallinen SEKÄ levossa ETTÄ
kulkutapavalitsimen ollessa auki. **FAIL**: kumpi tahansa tila yhä
umpikultainen.

## B7-2: Isoisän/pulun tekstit piilossa oletuksena + aito äänitasokaiutin

**Omistaja (Fable 24.9. klo 11.33, Raamattu 14.–20.9.)**: isoisän ja
pulun tekstit ovat OLETUKSENA PIILOSSA — vain ääni kuuluu, pelaaja
napauttaa tekstiversion auki halutessaan. Matkakirjan oikean reunan
sykkivä kaiutin reagoi AIDOSTI luennan äänitasoon (natiivissa
AudioSource → GetOutputData, ei ajastettu kuvio). Natiivi-UI:n build 6
-kuvissa (a33385c) tekstit näkyivät oletuksena → korjaus build 7:ään.
**Vastuu**: Natiivi-UI, build 7.

**Testikomento**: käynnistä matkakirjan/pulun luenta (`ui matkakirja
<kaupunki> fokus` tai `ui chat`) HETI kun ääni alkaa, ota kuva ENNEN
mitään napautusta: `kuva teksti-piilossa-b7`. Napauta kaiutinkuvaketta,
ota kuva uudestaan: `kuva teksti-auki-b7`. Jos mahdollista, ota
lyhyt kuvasarja (2–3 kuvaa ~0,5 s välein) kaiuttimen ikonista luennan
aikana nähdäksesi sen reagoivan (koon/sykkeen vaihtelu) — verrattuna
tasaiseen/ajastettuun animaatioon.

**Odotettu tulos webin mukaan** (`js/ui-apurit.js:65-79`
`tekstitPiilossa()`/`luennanTekstipiilo()`, `js/ui.js:11699-11744`
`kaynnistaLuentavahti()`): tekstit piilossa kun näyttö on puhelinkokoinen
TAI isoisä puhuu juuri nyt (`body.luenta-tekstit-piiloon`). Matkakirjakortti
kutistuu yhden rivin `.pieni`-tilaan (`asetaPaivakirjanKoko`,
`aria-expanded="false"`, `aria-label="Avaa matkapäiväkirjan merkintä"`),
tapin kohde koko kortti. Pulun uusi puhekupla imeytyy pieneksi
"+"-merkiksi (`imePuhelimenKuplaan`), avautuu "Näytä puhekuplat"
-napista. Kaiutin: `js/kaiutinmittari.js` lukee OIKEAN AnalyserNoden
(`getByteTimeDomainData`, RMS), attack 18 ms / release 120 ms, kolme
kynnystä (0,04/0,10/0,20) sytyttää 0–3 kaarta ikonissa — EI ajastettu
kuvio (varakuvio käytössä VAIN jos AudioContext puuttuu kokonaan, mikä
ei koske natiivia).

**PASS-ehto**: teksti piilossa oletuksena, näkyy vasta napautuksesta;
kaiutin selvästi eri kokoinen/muotoinen eri hetkinä äänekkyyden mukaan
(ei tasainen sykli). **FAIL**: teksti näkyy heti tai kaiutin ei muutu
äänen mukana.

## B7-3 (löydös 22): Maan väritaso, huntu ja meri

**Omistaja (Fable 24.9. klo 11.57, SITOVA)**: 1) huntu ei saa peittää
merialueita — meri pysyy webin mukaisena harmaansinisenä
rantaviivoituksella; 2) Kreikan ääriviiva on liian yksinkertaistettu —
rajaviivan on oltava yhtä tarkka kuin webissä (sama raja-aineisto ja
tarkkuus); 3) huntu on liian voimakas — naapurimaat eivät näy lainkaan,
webissä naapurit näkyvät vaaleana sepiana nimineen (esim. Westfalen,
Piemonte). Juurisyy todennäköisesti Karttasepän väritasolaatoissa,
joissa alueen ulkopuoli on kermana (pitää olla läpinäkyvä, alpha 0), ja
huntu pitää olla erillinen mieto taso VAIN muiden maiden maa-alueille.
**Vastuu**: Natiiviseppä + Karttaseppä, build 7.
**Vertailukuva**: `pariteetti-web-2026-09-24/kartta-393x852.png` vs.
build 6:n `1-2-nostot-varitaso-kreikka.png` — Fable totesi kaikki kolme
eroa näistä.

**Testikomento**: sama kuin build 6:n löydös 1–2 (saavu Kreikkaan,
zoomaa ≥50 % ruudusta), `kuva varitaso-b7`. Zoomaa myös ulos niin että
naapurimaat (Albania/Makedonia/Bulgaria/Turkki) ja meri näkyvät samassa
kuvassa.

**KORJAUS (Fable 24.9. klo 12.2x, Karttasepän osoitus)**: alempi kappale
(`js/maatummennus.js`, viiva-vain-huntu) on VANHENTUNUT/VÄÄRÄ lähde —
oikea, aktiivinen huntumekanismi on `js/laattakerma-shader.js`: kerma
`#faf4d6` peitolla 0,80 (`KERMAN_PEITTO_KIINTEA`) maalataan MUIDEN
maiden MAA-ALUEEN päälle, nykyinen maa on reikä kermassa (näkyy
reliefillä/väritasolla), meri EI SAA kermaa (jää pohjan omaan väriin),
ja nimiotaso näkyy kerman LÄPI (nimet luettavissa vaalean kerman päältä).

**Odotettu tulos webin mukaan** (`js/laattakerma-shader.js`
`KERMAN_PEITTO_KIINTEA=0.80`, väri `#faf4d6`): (a) meri pohjan omalla
värillä (ei kermaa, ei huntua) — meren väri ei ole kiinteä hex vaan
poltettu per-laatta (`umpimeriSavy`, tools/generoi-laattapyramidi.mjs),
3D-pallon reliefilinssillä kiinteä `MERIVARI = 'rgb(38, 78, 145)'`;
(b) naapurimaat vaalean kerman (#faf4d6, 80 % peitto) alla NIMET YHÄ
NÄKYVISSÄ läpi; (c) nykyinen maa REIKÄ kermassa — näkyy reliefillä/
väritasolla täydessä kontrastissa; (d) rajageometria Natural Earth 10m
admin-0-maat (public domain), Douglas-Peucker-yksinkertaistettu
(mediaani 0,02, maksimi 0,20 laudan yksikköä ≈ alle 0,5 px syvimmässä
zoomissa) — EI karkea polygoni.

**PASS-ehto**: (a) meri POHJAN VÄRINEN, EI kermaa/huntua sen päällä;
(b) naapurimaat vaaleaa kermaa (#faf4d6, ~80 % peitto) NIMET NÄKYVISSÄ
läpi (ei täysin piilossa, ei täysin paljaana); (c) nykyinen maa reikänä
kermassa, reliefi/väritaso täydellä kontrastilla; (d) Kreikan raja yhtä
tarkka/yksityiskohtainen kuin webin kuvassa. **FAIL**: mikä tahansa
neljästä pettää — esim. meri saa kermaa, naapurien nimet peittyvät
kokonaan, tai raja on yksinkertaistettu polygoni.

## B7-4: Maailmanradion aito VU-mittari

**Tausta**: webissä poistettiin 5.8.2026 (WebKit ei päästä suoratoistoa
analysaattoriin). Natiivissa ei ole samaa rajoitusta. Linssiseppä
toteutti mittarin ytimen webin v267-ballistiikan mukaan: τ = 0,065 s
nousu / 0,34 s lasku, asteikko −40…−6 dB, nollakohta 0,76, lepoarvo
0,045; neula liikkuu transformilla ilman uudelleenpiirtoa. Natiiviseppä
tekee AVPlayer-liitännäisen äänitapin (MTAudioProcessingTap → RMS →
MatkakirjaRadio_Taso()); HLS-asemilla ajastettu varakuvio koska tap ei
toimi HLS-virroille. Kotelo Natiivi-UI:lta.
**Vastuu**: Natiiviseppä (tappi) + Linssiseppä (mittari) + Natiivi-UI
(kotelo), build 7.

**Testikomento**: avaa maailmanradiolinssi/-toiminto, valitse
PROGRESSIIVINEN MP3/AAC-asema (ei HLS), tarkkaile neulaa muutaman
sekunnin ajan musiikin/puheen vaihdellessa. Ota kuvasarja (3–4 kuvaa
~1 s välein): `kuva radio-vu-1/2/3`. Kokeile myös HLS-asema jos
tunnistettavissa, varmista varakuvio ei näytä täysin paikallaan
pysyvältä neulalta.

**Odotettu tulos**: neula liikkuu selvästi äänenvoimakkuuden mukana
progressiivisilla asemilla (nopea nousu, hitaampi lasku — ei
symmetrinen), pysyy asteikolla −40…−6 dB, lepoasento lähellä nollaa
hiljaisuudessa. HLS-asemalla varakuvio liikkuu jonkin verran (ei täysin
paikallaan), mutta ei väitä olevansa aito.

**PASS-ehto**: neula reagoi äänenvoimakkuuteen epäsymmetrisellä
nousulla/laskulla progressiivisilla asemilla. **FAIL**: neula
paikallaan/tasainen tai symmetrinen ajastettu liike myös
progressiivisilla asemilla.

## B7-5: Aloituslennon lähikuva (vaiheet 1–2)

**Omistaja (Fable 24.9. klo 11.38, RAAMATUN LENNON ESITYS -tarkennus)**:
lähikuvavaiheessa (1–2) kamera niin lähellä konetta että kone täyttää
~2/3 ruudusta, maasto ja pilvet näkyvät takana. 7b3adeen lentokuvissa
kone oli liian pieni lähivaiheessa.
**Natiiviseppän lähikuvakehys + Fablen lisähuomiot (klo 11.59)**:
rajaus (koko) jo OK yhdellä kehyksellä, mutta: 1) koneen varjo maastossa
on jättimäinen/sumea läntti → poistettava tai oikeaan mittakaavaan;
2) kamera matalammalta etuviistosta niin että TAIVAS JA HORISONTTI
näkyvät koneen takana (ei pelkkä maasto) — pilvet koneen ALLA; 3) kartan
napit (selite, silmälasit) ja pulu piiloon introlennon ajaksi, vain
luennan tekstipalkki näkyy; 4) potkurit näyttävät pysähtyneiltä (kiekko
tulossa erässä 2, EI vielä build 7:ssä — testaa silti nykytila).
**Vastuu**: Natiiviseppä, build 7.

**Testikomento**: `peli-komento.txt`: `uusi-matka <kaupunki>` (uusi kaupunki
jota ei ole vielä käyty), ota kuvasarja HETI lennon alusta (0 s, 1 s, 2 s,
3 s) tiheämmin kuin build 6:n ajossa, jotta lähikuvavaihe (1–2) saadaan
tarkasti kiinni ennen kaukokuvaa. `kuva lento-b7-lahikuva-0/1/2/3`.

**Odotettu tulos**: kone täyttää ~2/3 ruudusta lähikuvassa, taivas+
horisontti näkyvät koneen TAKANA (ei pelkkä alaviisto maastoon), pilvet
koneen alapuolella, EI jättimäistä sumeaa varjoa maastossa, kartan
napit (selite/silmälasit) ja pulu EIVÄT näy lennon aikana (vain
luennan tekstipalkki). Potkurit voivat vielä näyttää hitailta/pysähtyneiltä
— EI lasketa FAILiksi tässä erässä (kiekko tulee myöhemmin).

**PASS-ehto**: rajaus+taivas+ei-jättivarjoa+napit piilossa kaikki
täyttyvät. **FAIL**: mikä tahansa neljästä puuttuu (potkureita
lukuun ottamatta).

## B7-6 (löydös 20): iPhonen yläreuna kokonaan uusiksi

**Omistaja (klo 11.25, SITOVA, kumoaa osan löydös 5:stä)**: vasemmalla
Dynamic Islandin vieressä matkalaukkuryhmä — kaksi samanlevyistä
pilleriä päällekkäin samassa tyylissä: ylhäällä "300£ · 1/80", alla
pelkkä kaupungin nimi (suljettu matkakirja tiivistettynä nimen
levyiseksi, pitkä nimi lyhennetään). Molemmat avaavat matkalaukun eri
välilehteen (ylempi Matka-osioon, alempi matkakirjakorttiin liuskana).
Oikealla hampurilainen ja karttanappi vierekkäin Islandin rivillä, EI
MUUTA — silmälasinappi POISTUU kokonaan (linssit nyt ☰-valikon kautta,
samassa teemassa), hammasratas ei yläreunaan vaan ☰-valikon viimeiseksi
riviksi "Kehittäjä" (vain kehittäjätilassa; App Store/TestFlight
näyttävät ylhäältä samalta).
**Tarkennus (klo 10.43)**: pilleri + oikean yläkulman napit siirretään
YLEMMÄS, Dynamic Islandin korkeudelle sen kummallekin puolelle (sama
rivi kuin Island, ei sen alapuolelle).
**Natiivi-UI:n ☰-valikon sisältö (Fable vahvisti klo 11.29)**: Linssit
ylimpänä; ohut viiva; sitten Äänentasot, Asetukset, Offline-lataus
(pelaajan toiminnot); ohut viiva; vanhat rivit (Uusi peli, Ehdota
sisältöä, Tekijät ja lähteet, Mitä uutta); aivan alimpana "Kehittäjä"
(vain kehittäjätilassa, avaa koeliput/mittarit/avainkentät).
**Vastuu**: Natiivi-UI, build 7.

**Testikomento**: `ui-komento.txt`: `ui ylapalkki kelluva` (varmista
kelluva tila), `kuva ylaosa-b7`. Avaa molemmat pillerit erikseen
(tarvittaessa kosketuksella, koska tarkkaa komentoa ei tiedetä
etukäteen) ja tarkista kohteet: `kuva pilleri-yla-b7`,
`kuva pilleri-ala-b7`. Avaa hampurilaisvalikko: `kuva hampurilaisvalikko-b7`
— tarkista rivijärjestys ja ettei silmälasinappia näy erikseen kartalla.

**Odotettu tulos**: EI web-pariteettia (natiivin oma iPhone-erikoisratkaisu,
kuten löydös 5/6/7). Kaksi pilleriä päällekkäin Dynamic Islandin
korkeudella vasemmalla, hampurilainen+karttanappi oikealla samalla
rivillä, ei erillistä silmälasinappia kartalla, ☰-valikossa Linssit
ylimpänä ja "Kehittäjä" (jos kehittäjätila päällä) aivan alimpana.

**PASS-ehto**: kaikki edellä mainitut rakenneosat täsmäävät. **FAIL**:
vanha yksi-pilleri-asettelu yhä käytössä, silmälasinappi yhä kartalla,
tai ☰-valikon rivijärjestys väärä.

## B7-7 (löydös 23): Portin/avauksen/lennon tekstit sanatarkasti webin mukaan

**Omistaja (Fable 24.9. klo 12.1x, tarkennettu löydös 23:na klo 12.0x–12.04)**:
portin, avausruudun ja lennon tekstien pitää täsmätä webiin sanatarkasti.
**TUNNETTU BUGI (23A)**: natiivi näyttää/soittaa LENNON AIKANA
avaustekstin (INTRO_TEXT "Vintiltä löytyi…" + "Heathrow, Lontoo" +
intro-puhe.mp3) — VÄÄRIN. Webin kaava: avausruudulla (ennen lentoa)
INTRO_PAIKKA "Heathrow, Lontoo" + kuukausi/vuosi laitteen kellosta +
INTRO_TEXT + luenta `intro-puhe.mp3` (kokoelma id `intro`), nappi
"Valitse aloituskaupunki". LENNON AIKANA vain `flightFirst`-repliikki +
luenta `puhe-lento-alku.mp3` (id `lento-alku`). Lennon jälkeen normaali
saapuminen.
**23B JO KORJATTU** (Natiivi-UI, `natiivi-ui/iphone-island` b779dc8):
`PeliOhjain.LennonVaiheMuuttui` häivyttää yläpalkin, pillerit, ☰/⚙,
kartta-/linssinapin, nostot, Liiku, kartuschan, matkakirjan ja pulun
(0,6 s pois / 0,8 s takaisin), vain tekstikaista jää — TARKISTA tämä
osa silti uudelleen build 7:ssä varmistukseksi.
**Vastuu**: Natiivi-UI (portti/avaus/UI-piilotus), Natiiviseppä (lennon
tila), build 7.

**Testikomento**: kylmäkäynnistys → `kuva portti-b7` (etusivu/portti).
`ui aloita <uusi kaupunki>` → heti avautuvasta ruudusta `kuva avaus-b7`,
sitten lennon alusta `kuva lento-teksti-b7`. Avaa myös ☰-valikko ja
tarkista ettei topbar/pulu/kartuscha näy lennon aikana (jatkokuva
`kuva lento-ui-b7`).

**Odotettu tulos webin mukaan** (`js/ui.js:17372-17409`,
`js/ui-tekstit.js:23-42`, `js/packs/maailma.js:612-614`):
- Portti: teksti "Laita äänet päälle" (kaiutin-ikonilla), nappi
  "Aloita seikkailu" (`start-btn primary`), alempi linkki "Oppiminen
  on hauskaa".
- Avausruutu: paikkarivi "Heathrow, Lontoo" + kuukausi ja vuosi laitteen
  kellosta, sitten `INTRO_TEXT` SANATARKASTI: *"Vintiltä löytyi isoisän
  matkalaukku ja kulunut matkakirja. Juokset sisälle terminaaliin ja
  olet varma, että ukko oli löytänyt jotain. Mutta kuka on repinyt
  kirjasta viimeisen sivun?"* — nappi (kehystetty "1873") tekstillä
  `INTRO_VALINTA` = "Valitse aloituskaupunki" (EI kysymysmuotoinen
  "Mistä aloitan?", se on vanha poistettu versio).
- Lento: `flightFirst`-rivi SANATARKASTI: *"Kone nousee. Isoisän kirja
  aukeaa sylissäni kuin se olisi odottanut tätä hetkeä."* (yksi virke,
  toinen virke poistettu tietoisesti 25.8.2026 lyhyempänä pidoksi).
- UI lennon aikana: pulu piilossa (webissä dokumentoitu), muu
  UI-elementit (yläpalkki/topbar, karttaselite, kartuscha) eivät näy
  lennon aikana webissäkään — vain avauksen/lennon oma teksti-ikkuna.

**PASS-ehto**: avausruudulla INTRO_TEXT+intro-puhe, LENNOLLA
flightFirst+puhe-lento-alku (EI avausteksti toistu lennolla), UI-elementit
piilossa lennon ajan. **FAIL**: lento näyttää/soittaa yhä avaustekstin
tai UI-elementti näkyy lennolla.

## B7-9 (löydös 24A): Aloitusportin ruutu täsmälleen webin mukaan (ei ylimääräistä)

**Omistaja (Fable 24.9. klo 12.08, SITOVA)**: aloitusportin pitää
näyttää TÄSMÄLLEEN sen minkä web näyttää — EI MITÄÄN MUUTA. Webissä
(`js/ui.js` showAloitusportti) portilla on VAIN: "Laita äänet päälle"
+ kaiutin-ikoni, nappi "Aloita seikkailu", alhaalla linkki "Oppiminen
on hauskaa" (Periaatteet-lappu). EI otsikkolohkoa ("MATKAKIRJA /
MAAILMAN YMPÄRI.../OSA II"), EI "Seuraa isoisän..." -ingressiä, EI
"Jatka matkaa" / "Uusi matka" -nappeja. Portin jälkeen tallennus jatkuu
TAI (jos ei tallennusta) avausruutu (Heathrow + INTRO_TEXT + "Valitse
aloituskaupunki").
**TUNNETTU BUGI (havaittu jo tämän session ALKUPUOLELLA, build 6:n
ensimmäisessä kylmäkäynnistyskuvassa, ks. proto-3d/lokit/
build6-tarkistus-20260924/17-etusivupallo-a.png)**: natiivi näyttää
ison otsikkolohkon ("MATKAKIRJA / MAAILMAN YMPÄRI KAHDEKSASSA-
KYMMENESSÄ PÄIVÄSSÄ / OSA II · UNOHDETTU AARRE"), ingressin ("Seuraa
isoisän matkakirjaa...") SEKÄ "Jatka matkaa"/"Uusi matka" -nappiparin
yhden "Aloita seikkailu"-napin sijaan — kaikki tämä pitää POISTAA.
**Vastuu**: Natiivi-UI, build 7.

**Testikomento**: kylmäkäynnistys (poista appi ja asenna uudestaan TAI
tyhjennä tallennus jos komento löytyy, jotta nähdään aidosti tyhjä
tallennustila), `kuva portti-b7-tyhjatila`. Jos tallennus on olemassa,
testaa myös se erikseen: `kuva portti-b7-tallennuksella`.

**PASS-ehto**: portilla näkyy VAIN kolme elementtiä (äänikehote+kaiutin,
"Aloita seikkailu", "Oppiminen on hauskaa") — ei otsikkolohkoa, ei
ingressiä, ei Jatka/Uusi-nappeja. **FAIL**: mikä tahansa ylimääräinen
elementti näkyy yhä (kuten build 6:ssa).

## B7-8 (löydös 24B): ☰-valikon "Uusi peli" palauttaa aloitusporttiin asti

**Omistaja/Fable (24.9. klo 12.1x, tarkennettu 12.08)**: ☰-valikon
"Uusi peli" -rivin pitää palauttaa ALOITUSNÄYTTÖÖN (porttiin) ja siitä
avausruudun kautta kaupunkivalintaan — EI suoraan Lontoon kartalle.
**TUNNETTU BUGI**: build 6:ssa "Uusi peli" vie NYT suoraan Lontoon
kartalle, ohittaen portin ja avausruudun kokonaan.
**Vastuu**: Natiivi-UI, build 7.

**Testikomento**: pelin ollessa käynnissä (esim. Ateenassa), avaa
☰-valikko, valitse "Uusi peli", `kuva uusipeli-vahvistus-b7` (vahvistus,
jos näytetään), hyväksy, `kuva uusipeli-tulos-b7`.

**Odotettu tulos webin mukaan** (`js/main.js:1399-1406`): "Uusi peli"
kysyy ENSIN vahvistuksen (koska passin leimat ja laukun tavarat ovat
pelin AINOA pysyvä kertymä eikä niitä saa takaisin) — POIKKEUS:
voittoruudun oma "Uusi peli" ei kysy eikä tyhjennä, koska pelaaja on
juuri ansainnut kertymänsä (ei koske tätä testiä, joka on ☰-valikosta
kesken pelin). Hyväksynnän jälkeen KAIKKI pelin muisti tyhjenee ja
näyttö palaa ALOITUSPORTTIIN ("Aloita seikkailu" -ruutuun) — EI jää
kartalle tai nykyiseen kaupunkiin. Laitteen omat asetukset (kehittäjätila,
lukijaäänen taso) SÄILYVÄT tyhjennyksessä (omistajan tilaus 14.8.2026).

**PASS-ehto**: vahvistuskysely ennen tyhjennystä (kesken pelin), lopputulos
on aloitusportti eikä pelitila. **FAIL**: ei vahvistusta, tai peli jää
kartalle/muuhun tilaan tyhjennyksen jälkeen.

## Yhteenveto-taulukko, build 7 (täytetään ajon jälkeen)

| # | Löydös | PASS/FAIL | Kuva | Huomio |
|---|--------|-----------|------|--------|
| B7-1 | Liiku läpinäkyvä (myös aktiivinen) | | | |
| B7-2 | Tekstit piilossa + aito kaiutin | | | |
| B7-3 | Väritaso/huntu/meri/raja | | | |
| B7-4 | Radion VU-mittari | | | |
| B7-5 | Lennon lähikuva | | | |
| B7-6 | iPhonen yläreuna uusiksi (löydös 20) | | | |
| B7-7 | Lennon oikea teksti (ei avausteksti) + UI piilossa | | | |
| B7-8 | ☰ Uusi peli → aloitusportti (ei suoraan Lontooseen) | | | |
| B7-9 | Aloitusportti vain 3 elementtiä (ei otsikkolohkoa/Jatka-Uusi) | | | |
| 14 | Navat (uusinta tuoreella pelillä) | | | |
| 4-renkaat | Hehkurenkaat aloitusvalinnassa (uusinta) | | | |
