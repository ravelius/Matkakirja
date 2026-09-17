# Viesti Fablelle: Astronautin kamera jää tyhjäksi Safari WebAppissa (v1924)

16.9.2026, Opus. Haara `claude/bold-ride-vow4ki-astro-webkit`
(pohjana `claude/bold-ride-vow4ki-pallo-musta`, fc6084e2).
Ei PR:ää, ei versionostoa, ei Raamattu-muutoksia.

Vika: Raamattu, ASTRONAUTIN KAMERA **LISÄYS 11 kohta 34**; Codexin
havainnot `posti/codex-fable-astronaut-webkit-tyhja-20260916.md` ja
`posti/codex-fable-astronaut-live-qa-v1924-20260916.md` (osio
"Safari WebApp — epäonnistunut live-avaus").

---

## 1. Oire sanatarkasti

Asennettu macOS Safari -sovellus (v1910 → v1924 pelin omalla "Hae uusin
versio" -painikkeella). Matkalaukku → Astronautin kamera → Aktivoi:

> ruskea tyhjä näkymä, oikeassa yläkulmassa X, **toisinaan Ateenan
> merkintä vasemmalla**. Ei maapalloa eikä vihreitä pisteitä.
> "Poistu linssistä" toimii. Chrome toimii samasta julkaisusta.

Tämä **ei ole** sama kuin iPhonen musta pallo (siinä pallo, pisteet ja
ISS näkyivät, vain tekstuuri oli musta). Tässä koko globe ja pisteet
puuttuvat: **linssin avaus ei valmistu.**

---

## 2. Mitä mitattiin, ja mikä siitä seurasi

Kontissa ei ole WebKit-selainta (vain `/opt/pw-browsers/chromium`, eikä
`playwright install` ole sallittu). Todennus tehtiin siis kahdella
tavalla: **koodipolkua lukemalla** ja **Chromiumilla, johon vika
lavastettiin** (WebKit-UA, `navigator.standalone = true`,
`display-mode: standalone`, puuttuvia API:ta, estettyjä pyyntöjä).
Lopullinen vahvistus tulee Codexin uusintatestistä (luku 6).

Ajoin seitsemän lavastusta ja katsoin kuvakaappauksen. **Tämä on
raportin tärkein tulos**, koska se rajaa juurisyyn:

| Lavastus | Tulos ruudulla | Vastaako Codexin kuvaa? |
|---|---|---|
| Pelkkä WebKit-UA + standalone | pallo, pisteet, tähdet — kaikki oikein | ei |
| `AudioContext.resume` ei ratkea | kaikki oikein, äänetön | ei |
| `toDataURL` palauttaa roskaa | kaikki oikein (reliefi kantaa) | ei |
| `ImageData` heittää (generoitu pinta pois) | **1873-kartan ruskea pallo**, pisteet näkyvät | osin: ruskea, mutta pallo ja pisteet ovat |
| Kotelon korkeus 0 linssin ajaksi | pallo ja pisteet ennallaan (kangas ei kutistu) | ei |
| Poikkeus kesken `avaa()`:n (avaruusnäkymän jälkeen) | **pallo näkyy, X näkyy, PISTEITÄ EI OLE** | osin: pisteet katosivat oikein |
| **Globe.gl:n lataus estetty** | **tumma ruskea tyhjä pinta, ei palloa, ei pisteitä, ei ilmoitusta** | **kyllä** — paitsi että X puuttui |

Kaksi viimeistä riviä ovat koko juttu. Codexin kuvassa on **sekä**
tyhjä ruskea pinta **että** X. Kumpikaan yksittäinen lavastus ei anna
molempia — mutta ne yhdessä antavat, ja juuri se kertoo missä vika on.

### Se ruskea

Kuvakaappaus lavastuksesta "kirjasto estetty" on
`docs/raportit/kuvat/astro-webkit-kirjasto-estetty-20260916.jpg`.
Taustan sävy on täsmälleen se, mitä Codex kuvasi: se on **pelin oma
`.map-pane`, tummaa nahkaa** (css/styles.css). Se näkyy aina kun pallon
WebGL-kangas ei piirrä mitään — kankaan tausta on
`rgba(0,0,0,0)`. "Ruskea tyhjä pinta" ei siis ole avaruuden tausta
(`#04060e`) eikä 1873-kartta, vaan **laudan pohja ilman lautaa**.

---

## 3. Todennäköisin juurisyy

**Pallokirjaston (Globe.gl) lataus jää WebKitissä kesken ilman
virhettä, ja koko avausketju jää odottamaan lupausta, joka ei koskaan
ratkea.**

Ketju on tämä:

1. `js/pallo.js lataaPallokirjasto` loi `<script>`-elementin, jonka
   `src` on **toisen alkuperän** osoite
   `https://media.matkakirja.app/vendor/globe.gl-2.46.2.min.js`.
2. Lupaus ratkesi VAIN kahdesta tapahtumasta: `load` ja `error`.
   **Aikakatkoa ei ollut.**
3. `js/ui.js avaaPallolauta` odottaa tuota lupausta `await`illa. Jos se
   ei ratkea, `pallolauta` jää nulliksi — eikä `pallolautaVarapolku`
   (joka näyttäisi virheen) koskaan käynnisty, koska mikään ei heittänyt.
4. `valitseLinssi('satelliitti')` → `pallolinssiKelpaa` on epätosi
   (ei lautaa) → `avaaLinssikartta` palauttaa `false` (vanha kartta on
   pois käytöstä, `VANHA_KARTTA_KAYTOSSA = false`) → **ruudulle ei tule
   mitään.** Valinta jää laukkuun päälle, mutta näkymää ei ole.

Miksi juuri WebKit-sovelluksessa: `<script src>` toiseen alkuperään on
`no-cors`-pyyntö, ja palvelutyöntekijän VENDORCACHE-haara
(`sw.js`, `kori.match(event.request.url)`) voi palvella siitä
**opaakin tai keskeneräisen vastauksen**. v1910 → v1924 -päivitys
vaihtaa palvelutyöntekijän kesken istunnon, ja juuri silloin vanha
korikappale ja uusi työntekijä ovat hetken eri mieltä. Chromessa sama
pyyntö meni verkkoon ja onnistui.

**Varmuusaste: kohtalainen (noin 55 %).** Se, mitä tiedän varmasti:
tämä on avausketjun **ainoa odotus, jolla ei ollut aikakatkoa**, ja se
on ainoa lavastus, joka tuottaa täsmälleen Codexin ruskean tyhjän
pinnan **ilman yhtään konsolivirhettä**. Mitä en tiedä: Codexin kuvassa
oli X, jota tämä haara ei tuota. Siksi alla olevat ehdokkaat 2 ja 3
jäävät auki — ja siksi korjaus tehtiin niin, että se kattaa ne kaikki.

### Muut ehdokkaat

**2. Poikkeus kesken `avaa()`:n (arvio 25 %).** Jos `avaa()` heitti
sen jälkeen kun kelluva ✕ oli jo lisätty bodyyn mutta ennen kuin
kohdemerkit lisättiin, lopputulos on: **X ruudulla, ei pisteitä**, ja
`js/ui.js sytytaLinssi` nappasi virheen `console.error`illa ja pudotti
linssin. Kahvaa ei syntynyt, joten `pura()` ei koskaan ajanut ja ✕ jäi
ruudulle. Mitattu Chromiumissa: kuva on täsmälleen tuo (pisteet
katosivat, X jäi). Ainoa mikä ei täsmää: pallo näkyi. Se täsmäisi, jos
poikkeus tuli jo `avaaAvaruusnakyma`n sisällä *karttapintojen
piilotuksen jälkeen*. Tämän haaran mahdollisia WebKit-laukaisijoita
ovat äänikerros (`avaaAstronautinAani`), pulun piilotus ja
tähtitaivas — kaikki kolme ovat nyt omien vartijoidensa takana.

**3. WebGL-kontekstin menetys taustalta palatessa (arvio 15 %).**
Codex toisti vian myös "ikkunan etualalle tuonnin jälkeen". WebKit
vapauttaa GPU-muistia taustalla, ja `webglcontextlost` on
`js/pallolauta/lauta.js`:ssä käsitelty — mutta vain kerran per istunto,
ja jos konteksti kuolee kesken linssin, kuori puretaan ja `pallolinssi`
jää roikkumaan. Tämä tuottaisi myös tyhjän kankaan (= ruskea pohja) ja
jäljelle jääneitä DOM-merkkejä ("Ateenan merkintä vasemmalla").

**4. Karttapintojen piilotus ilman korvaavaa pintaa (arvio 5 %).**
`piilotaKarttapinnat` sulkee pelin laattakerroksen `layers.mask = 0`:lla,
ja korvaava generoitu Maa asetetaan vain jos `maapallonTekstuuri`
onnistui. Mitattu: jos se epäonnistuu, kirjaston oma laattamoottori jää
päälle ja pallo näkyy 1873-karttana — ruskeana, mutta **pallona**.
Ei siis yksin selitä puuttuvaa palloa.

**Hylätyt** (mitattu, eivät tuota kuvaa): AudioContextin jumi,
`toDataURL`in epäonnistuminen, kotelon kutistuminen,
`display-mode: standalone` -CSS (pelissä ei ole yhtään
`@media (display-mode: …)` -sääntöä), `OffscreenCanvas` /
`createImageBitmap` (linssi ei käytä kumpaakaan), moderni JS-syntaksi
(avauspolulla ei ole yhtään Safari 17:n jälkeistä API:a).

---

## 4. Korjaus

Korjauksen periaate on se, minkä vika opetti: **hiljainen keskeneräisyys
on pahempi kuin virhe.** Jokaisella odotuksella on aikakatko, jokainen
vaihe kirjaa itsensä, ja jos ruudulla ei lopulta näy mitään, pelaaja
saa siitä lauseen eikä tyhjää pintaa.

### 4.1 Kirjaston lataus: aikakatko ja välimuistin ohittava uusinta
`js/pallo.js`. `lataaPallokirjasto` ratkeaa nyt aina:

* `PALLOKIRJASTON_AIKAKATKO_MS = 12000` — jos `load` ei tule, yritys
  hylätään nimetyllä syyllä (`kirjaston aikakatko`);
* `PALLOKIRJASTON_YRITYKSET = 2` — toinen yritys hakee osoitteella
  `…globe.gl-2.46.2.min.js?uusi=<n>-<aika>`. Palvelutyöntekijän
  VENDORCACHE hakee korista **täsmäosoitteella**, joten uusi osoite ei
  voi osua vanhaan kappaleeseen vaan menee verkkoon;
* epäonnistunut ketju **nollaa muistinsa**, joten seuraava avaus saa
  yrittää uudestaan (ennen ensimmäinen aikakatko olisi jäänyt päälle
  koko istunnoksi).

### 4.2 Yksi vaihe ei saa viedä koko avausta
`js/linssit/satelliitti.js`. Avaus ajaa nyt jokaisen vaiheen
`vaihe(nimi, työ)` -kääreen läpi: `avaruus`, `pulu`, `aanet`,
`linssiaani`, `pisteet`. Kaatunut vaihe kirjataan vaihelokiin ja
konsoliin, ja **avaus jatkuu**. Kohdepisteet ja poistumistie ovat
tärkeämpiä kuin ääni tai pulu — ja nimenomaan **äänen valmistuminen ei
voi enää estää pallon piirtoa**.

### 4.3 Vartija: tyhjä näkymä ei jää tyhjäksi
Uusi puhdas funktio `avauksenPuute` (`satelliitti-avaruus.js`) lukee
kuusi mitattua asiaa — avaruusnäkymän kahva, WebGL-kontekstin kunto,
piirtokankaan mitat, kotelon mitat, pinnan osoite, kohdepisteiden määrä
DOMissa — ja palauttaa joko `null` tai puutteen nimen. Linssi tarkistaa
sen **kahdesti**: varhain (2,5 s; nappaa sen, ettei mitään ole edes
alkanut) ja aikakatkolla (12 s; hidas laite ehtii perille). Puutteesta
näytetään pelaajalle yksi lause ja nappi ulos
(`js/linssivirhe.js`). Jälkitarkistus (2 s välein, enintään 30 s) ottaa
ilmoituksen pois, jos näkymä valmistuukin myöhässä — ilmoitus ei saa
jäädä valheeksi.

Sama vartija on myös `js/ui.js`:ssä (`varmistaLinssinAvaus`) sitä
tapausta varten, jossa linssi ei pääse edes alkuun, koska lautaa ei
ole: 12 s kuluttua pelaaja saa lauseen *"Maapalloa ei saatu ladattua,
joten linssiä ei voi avata."* Kerroksettomalla pallolinssillä
(`kerros: false`) tasokartan moottorin "valinta tehty" ei kelpaa
todisteeksi — ainoa kelpaava todiste on laudan oma kahva.

### 4.4 `?pallodiag=1` kattaa nyt koko avauksen
Vaihelokin ydin siirtyi omaan moduuliinsa `js/pallodiag.js`, koska
avausketju alkaa jo ENNEN linssiä eikä kirjaston latauksesta saanut
aiemmin yhtään riviä. `js/linssit/satelliitti-avaruus.js` vie samat
nimet edelleen ulos, joten yksikään tuonti ei muuttunut.

Uudet vaiheet lokissa: `kirjasto-haku`, `kirjasto`, `avaruus-alku`
(kotelon ja kankaan mitat, kontekstin kunto, `navigator.standalone`,
dpr), `avaruus-pinta`, `avaruus-valmis`, `vaihe` (jokainen avausvaihe
erikseen) ja `vartija`. Vanha tekstuuriketjun loki (`alku`, `kuva`,
`ladonta`, `blob`, `valmis`) on ennallaan. Loki näkyy myös
virheilmoituksen sisällä, kun `?pallodiag=1` on päällä — silloin QA saa
vaiheet oikeasta laitteesta **ilman konsolia**.

### 4.5 Huoltokartta
`sw.js`: `js/pallodiag.js` ja `js/linssivirhe.js` lisättiin SHELLiin.
Molemmat ovat staattisia tuonteja (`js/pallo.js`, `js/ui.js`), joten
ilman niitä peli ei käynnistyisi verkottomana.

---

## 5. Vartiot ja ajotulokset

### Yksikkötestit
`node --test tests/satelliitti-avaruus.test.mjs tests/satelliitti.test.mjs
tests/pallo.test.mjs tests/pallolinssit.test.mjs tests/pallolauta.test.mjs
tests/sw.test.mjs tests/dokumentit.test.mjs` — **215/215 läpi**
(kahdeksan uutta vartiota):

* `avauksenPuute` nimeää jokaisen puutteen ja palauttaa `null` ehjälle
  näkymälle; jokaiselle puutteelle on pelaajan kielinen lause;
* linssin jokainen avausvaihe ajetaan vartijan läpi, eikä kaatunut
  vaihe heitä eteenpäin; pisteet lisätään äänen JÄLKEEN mutta aina;
* vartijalla on kaksi tarkistusta, varhainen on ennen aikakatkoa, ja
  aikakatko on pidempi kuin reliefin oma 8 s; purku ottaa kellot pois;
* pallokirjastolla on aikakatko ja välimuistin ohittava toinen yritys
  (`?uusi=`-parametri), ja epäonnistunut ketju nollaa muistinsa;
* `js/linssivirhe.js` näkyy ruudulla, katoaa napista, ei kasaa kahta
  ilmoitusta päällekkäin ja on `role="alert"`;
* `?pallodiag=1` näyttää vaiheet vain lipulla, ja avausketjun uudet
  vaiheet ovat lähteessä;
* uudet moduulit ovat sw.js:n SHELLissä;
* `js/ui.js` kutsuu `varmistaLinssinAvaus`ta ja siivoaa vartijansa.

### Savukkeet
`tools/savukkeet/savuke-astro-pallo.mjs`, kaksi uutta väitettä ja
vastakoe (`NAKYMAT=vartija` ajaa vain nämä):

* **9. kirjasto estetty** — kun Globe.gl:n lataus estetään, pelaaja saa
  aikakatkon jälkeen näkyvän ilmoituksen ja napin ulos:
  *"Linssi ei käynnistynyt — Maapalloa ei saatu ladattua…"*.
  Kuva: `docs/raportit/kuvat/astro-webkit-kirjasto-estetty-20260916.jpg`.
* **9b. pinta estetty** — lauta rakentuu, mutta pallon pinta jää
  saamatta (`ImageData` heittää, reliefikuva ei saavu). Vartija nimeää
  puutteen (`pinta`) ja näyttää sen: *"Astronautin kamera ei
  käynnistynyt — Maapallon pintakuva ei latautunut."*
  Kuva: `docs/raportit/kuvat/astro-webkit-pinta-estetty-20260916.jpg`.
* **VASTAKOE** — ehjässä ajossa ilmoitusta EI ole ruudulla, `puute()`
  on `null` ja pisteitä on 64. Ilman vastakoetta mittari näyttäisi
  vihreää myös silloin, jos ilmoitus jäisi päälle aina.

Ajot:

* `savuke-astro-pallo NAKYMAT=vartija` — **4/4 läpi**.
* `savuke-astro-pallo NAKYMAT=puhelin` — **37/37 läpi**. Reliefi 4k,
  ladonta 3 480 ms, keskipisteen kirkkaus 63,8; Safarin rajoilla 91,8.
* `savuke-astro-pallo NAKYMAT=tyopoyta` — **40/41 läpi** (37 vanhaa +
  4 uutta). Reliefi 8k, 7 005 ms, kirkkaus 44,6; Safarin rajoilla
  ladonta putosi 8192 → 4096 → 2048 ja kirkkaus oli 87,0.
* `savuke-satelliittilinssi NAKYMAT=tyopoyta` — **34/34 läpi**.

### Kaksi epävakaata väitettä (eivät liity tähän korjaukseen)

Molemmat kaatuivat kerran ja menivät läpi uusinnassa, ja molempien syy
on sama: **pallo pyörii avauksen jälkeen hitaasti itsekseen** (Raamattu,
LISÄYS 4 kohta 18), kunnes pelaaja koskee siihen. Mittaus ja sitä
seuraava toimenpide osuvat siis eri pyörimisvaiheeseen.

* `savuke-satelliittilinssi`: *"pallon takapuolen merkki ei ota
  napautusta"* — väite lukee merkin ruutupaikan ja napauttaa sitä;
  välissä pallo on ehtinyt kääntyä. (Ensimmäinen ajo kaatui, uusinta
  34/34.)
* `savuke-astro-pallo`: *"varjo ei ulotu puoliväliin asti"* — väite
  vertaa puolivälin renkaan pikseleitä varjo päällä ja pois; välissä
  pallo on kääntynyt, joten näytteen alla on eri maasto (mitattu ero
  73,6 → 77,8 luminanssia). Sama väite meni läpi puhelimella molemmilla
  ajoilla ja työpöydällä edellisellä ajolla.

Korjaus kummallekin on sama ja kuuluu omaan työhönsä: **pyöriminen on
pysäytettävä mittauksen ajaksi** (savuke voi kutsua `avaruus`-kahvan
kautta samaa pysäytystä, jonka pelaajan ote tekee) — ei kynnysten
löysäämistä.

Esimerkki vaihelokista ehjästä työpöytäajosta (`?pallodiag=1`):

```
kirjasto-haku yritys=0 ohi=0
kirjasto yritys=0 ok=1 ms=1242
avaruus-alku kotelo=1379x821 kangas=1379x821 hukassa=0 itsenainen=0 dpr=1
alku lahde=8192x4096 kangas=8192x4096 ruutu=1400 kokoPallo=1
avaruus-pinta tekstuuri=1 tarkkuus=8k
avaruus-valmis alt=1.54 kotelo=1379x821 tahtia=2190 kalvo=1
vaihe nimi=avaruus ok=1 ms=160
vaihe nimi=pulu ok=1 ms=0
vaihe nimi=aanet ok=1 ms=0
vaihe nimi=linssiaani ok=1 ms=1
vaihe nimi=pisteet ok=1 ms=0
kuva px=8192x4096 ms=1716
ladonta koko=8192x4096 ok=1 tapa=suodatin ms=2057
vartija puute=ei pisteita=64 vaiheet=0
blob kt=49686 ms=3210
valmis syy=blob osoite=blob:http:// ms=7004
```

---

## 6. Mitä Codexin on tarkistettava WebAppissa

Avaa asennettu sovellus osoitteella, jonka perässä on **`?pallodiag=1`**
(sovelluksessa: Näytä → Lataa sivu uudelleen lähteestä, tai avaa peli
kerran Safarissa lipulla). Ruudun vasempaan alakulmaan ilmestyy pieni
musta lokilaatikko. Avaa sitten matkalaukku → Astronautin kamera →
Aktivoi ja **lue laatikko**. Viisi kysymystä, tässä järjestyksessä:

1. **`kirjasto yritys=0 ok=?`** — tuliko rivi lainkaan, ja onko
   `ok=1`? Jos rivi on `ok=0 syy=kirjaston aikakatko`, **juurisyy on
   vahvistettu** (luku 3, ehdokas 1). Katso silloin myös, tuliko
   `kirjasto-haku yritys=1 ohi=1` ja pelastiko se tilanteen.
2. **`avaruus-alku`** — mitkä ovat `kotelo` ja `kangas`? Jos jompikumpi
   on `0x0`, vika on asettelussa (ehdokas 4). `hukassa=1` tarkoittaa
   kuollutta WebGL-kontekstia (ehdokas 3). `itsenainen=1` vahvistaa,
   että sovellus tunnistaa itsensä standalone-tilaksi.
3. **`vaihe nimi=… ok=0 syy=…`** — onko yksikään avausvaihe kaatunut?
   Jos on, syy on rivillä sanatarkasti. **Tämä on ehdokas 2**, ja se
   rivi kertoisi minkä moduulin vika se on.
4. **`vartija puute=…`** — mitä vartija näki? `puute=ei` tarkoittaa
   ehjää näkymää. Muut arvot: `avaruusnakyma`, `webgl-konteksti`,
   `kangas`, `kotelo`, `pinta`, `pisteet`.
5. **Näkyykö ilmoitus?** Jos näkymä jää kesken, ruudun keskelle tulee
   viimeistään 12 sekunnissa laatikko *"Astronautin kamera ei
   käynnistynyt"* (tai *"Linssi ei käynnistynyt"*, jos lautaa ei ole)
   ja sen alla koko vaiheloki. **Se laatikko on itsessään mittaustulos:
   sen pelkkä ilmestyminen todistaa, ettei ruutu enää jää tyhjäksi.**
   Kuvakaappaus laatikosta lokeineen riittää juurisyyn naulaamiseen.

Lisäksi kaksi asiaa, jotka vasta oikea WebApp voi kertoa:

* **Toistuuko vika vielä?** Jos ehdokas 1 oli oikea, aikakatko +
  välimuistin ohittava uusinta korjaa sen itsestään — linssi aukeaa
  noin 12 sekunnin viiveellä ensimmäisellä kerralla ja heti sen
  jälkeen. Jos linssi aukeaa mutta hitaasti, se on juuri tämä.
* **Taustalta paluu.** Vie sovellus taustalle linssin ollessa auki,
  odota minuutti ja palaa. Jos pallo katoaa ja ilmoitus ilmestyy
  `puute=webgl-konteksti`, ehdokas 3 on todellinen ja tarvitsee oman
  korjauksensa (kontekstin palautus kesken linssin).

---

## 7. Mitä ei koskettu

Reliefiketju, pallon valinta (`valitseReliefi`), ladontakankaan katto,
kylläisyyden kolme tasoa ja tyhjän kankaan tunnistus ovat
pallo-musta-haaran korjauksia eikä niihin koskettu. Versionumeroa ei
nostettu, Raamattuun ei kirjoitettu, PR:ää ei tehty. Minipulun ruskeaa
hover-taustaa (LISÄYS 11 kohta 33) ei korjattu tässä haarassa — se on
`css/styles.css:2287`-sääntö ja kuuluu omaan muutokseensa, jottei tämä
kiireellinen haara kanna kahta asiaa.
