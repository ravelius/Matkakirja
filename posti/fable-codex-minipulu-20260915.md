## 2026-09-15 — FABLE → CODEX: minipulu linssien koko ruudun kuvanäkymiin

Fable-koordinaatioagentti.

### Omistajan päätös (15.9.2026, sanatarkasti)

Omistaja kirjoitti tekstisession kautta sanatarkasti: *"pulu voisi olla tassa
nakymassa esille. pyyda codexia tekemaan pulusta miniversio, jota voidaan
kayttaa tallaisissa tilanteissa."*

"Tämä näkymä" on Astronautin kamera -linssin valokuvanäkymä
(`js/linssit/satelliitti.js`, koko ruudun tumma taustanäkymä, kuva täyttää
ruudun) — ja vastaavat koko ruudun linssi-/kuvanäkymät yleisemmin. Pulu ei
ole siellä tällä hetkellä ollenkaan; tehtävä on tehdä siitä miniversio, joka
voidaan pudottaa tällaisiin näkymiin.

### Lähtötiedot pulun nykyisestä piirtämisestä (pääworktree, luettu 15.9.2026)

Pulu (aiemmin "pöllö" — koodissa käytetään yhä tunnisteita `pollo`/`livia`
muuttumattomina; kaanonissa hahmo on pulu) rakentuu useasta osasta:

- **`js/livia-svg.js`** — itse hahmo on inline-SVG-merkkijono, ei
  `<canvas>`-piirrosta. `livianSvgMalli(s, {right})` laskee asennon
  (siivet, jalat, pää, eleet) tilaolion `s` perusteella, ja
  `livianSvgKuva(s, {right, prefix})` palauttaa `<svg viewBox="0 0
  ${152+right} 304" width="${152+right}" height="304">…</svg>`-merkkijonon.
  Perusmitta on **152 × 304 px** (leveys kasvaa `right`-parametrilla,
  esim. leipäeleissä). Värit ovat harmaansiniset vartalossa/siivissä
  (`#97a5ac`, `#8499a3`, `#87…`/`#738895`-sävyt), jalat ruskeanpunertavat
  (`#ac7b74`), tummemmat ääriviivat `#506b7a`. `luoLivianSvg(element)`
  (rivi 299) piirtää SVG:n annettuun DOM-elementtiin ja palauttaa ohjaimen.
- **`js/livia-eleet.js`** (rivi ~98–101) luo isäntäelementin: `span`
  luokilla `livia-kasvot-pinta livia-svg-pulu livia-lentonayttamo`,
  liittää sen `document.body`:hyn, ja kutsuu `luoLivianSvg(canvas)` (tässä
  `canvas` on toinen `span`, ei `<canvas>`-elementti — nimi on historiallinen).
- **CSS-sijoitus** (`css/styles.css` rivit ~26509–26572):
  `.livia-kasvot-pinta.livia-lentonayttamo { position:fixed; right:auto;
  bottom:auto; width:152px; height:304px; z-index:39; pointer-events:none;
  overflow:hidden; }` — sijainti (`left`/`top` tai `transform`) asetetaan
  ajossa (paikka vaihtelee kohtauksen mukaan, esim. leijunta kartalla,
  saapuminen, luenta). Lehti- ja dialogikontekstissa hahmo skaalataan
  pienemmäksi: `.livia-svg-pulu.livia-lehdessa > span,
  .livia-svg-pulu.livia-dialogissa > span { transform:scale(.72);
  transform-origin:128px 304px; }` → efektiivinen koko noin **109 × 219 px**.
- **Eleet luennassa ja pluskupla**: eleiden asennot ja voimakkuudet tulevat
  `livianSvgAsento(id, p, {...})`:sta (`js/livia-svg.js` rivi 35) — eri
  `id`-arvot (esim. `reading`/`bookStudy` piirtää pienen kirjan hahmon
  viereen, rivi 273). Kuplapino ja "plus"-palautusnappi ovat
  `js/pollo.js`:ssä: kuplat `.pollo-kuplapino` (rivi ~2647), yksittäinen
  "+"-palautusnappi `.pollo-kuplapalautus` (rivi 2712, tekstinä `+`) —
  se palauttaa viimeisimmän saman kontekstin kuplan pinon supistuttua.
  Kelluva pyöreä pöllö/pulu-nappi (`.pollo-nappi.pollo-kelluu`,
  `css/styles.css` rivi ~20386) on eri, pienempi elementti (2.9rem
  ympyrä, oikea reuna `1.1rem` + turva-alue, pohja `3.6–5.3rem` +
  turva-alue riippuen näkymästä) — se EI ole itse hahmo, vaan chat-paneelin
  avausnappi.

### Astronautin kameran linssin nykyinen valokuvanäkymä (lähtötiedot)

`js/linssit/satelliitti.js` + `css/satelliitti.css`:

- Yläpalkki `rakennaPalkki()` (satelliitti.js rivi ~882): linssin nimi
  "Astronautin kamera", auki olevan kohteen nimi, ohje, ja
  **tekstinapp**i `.satelliittipalkki-sulje` ("Sulje linssi") — koko
  linssin sulkeva nappi, EI kuvanäkymän oma X.
- Itse valokuvanäkymä (`.satelliitti-katselu`, rivi ~341 css:ssä):
  tumma tausta, `.satelliitti-kuva` täyttää alan (rivi ~386), zoomaus ja
  raahaus pointer-eleillä.
- **Kuvanäkymän omat napit** ovat rivissä `.satelliitti-napit`
  (nuoli/vertaa/info/sulku), ja tämä rivi sekä pikkukuvanauha
  `.satelliitti-nauha` (`.satelliitti-pikku`, 72×48 px per pikkukuva)
  asuvat SAMASSA alapalkissa `.satelliitti-ala` (`position: absolute;
  left:0; right:0; bottom:0`, `css/satelliitti.css` rivi 466) — eli
  **pikkukuvat JA sulkuristi ovat molemmat ALAREUNASSA**, ei
  pikkukuvat alavasemmalla + X yläoikealla niin kuin usein oletetaan.
  Sulkuristi itse on `satelliitti.js` rivi 569: `nappi('satelliitti-sulku',
  '×', 'Sulje havainto')` — tekstimerkki `×`, ei kuvake — ja CSS-kommentti
  (`satelliitti.css` rivi ~460–465) sanoo suoraan: *"Sulkuristi on
  omistajan pyynnöstä ALHAALLA OIKEALLA (peukalon ulottuvilla)"*.
  **Codex: tarkista tämä rakenne itse ennen kytkentää** — Fablen
  agentti tarkisti tämän pääworktreestä 15.9.2026, mutta rakenne on
  saattanut muuttua sen jälkeen; alla oleva sijoitusehdotus (oikea
  alakulma) on annettu juuri siksi, että se ei osu kummankaan olemassa
  olevan elementin (pikkukuvarivi, sulkuristi/palkki) päälle riippumatta
  siitä, kumpi tarkka sijainti on voimassa.

### Tehtävä Codexille: MINIPULU koko ruudun linssi-/kuvanäkymiin

Tee pulusta **miniversio**, jota voidaan käyttää Astronautin kameran
valokuvanäkymässä ja vastaavissa koko ruudun linssi-/kuvanäkymissä
(tumma pohja, kuva/sisältö täyttää ruudun):

1. **Sama hahmo, sama väri.** Käytä samaa SVG-mallia ja väripalettia kuin
   `js/livia-svg.js` (`livianSvgMalli`/`livianSvgKuva`) — ei uutta piirrosta,
   vaan pienempi mitta ja yksinkertaistetut eleet samasta lähteestä, jotta
   pulu on selvästi tunnistettavasti sama hahmo eri näkymissä.
2. **Pienempi mitta.** Ehdotus (mittaa itse ja säädä): noin **40–56 px
   korkea puhelimella** (≈390 px leveä ruutu), **64–80 px korkea
   työpöydällä** (≈1400 px leveä ruutu). Suhteet säilyvät (152:304 ≈ 1:2).
3. **Yksinkertaistetut eleet.** Vain kevyt alijoukko nykyisistä eleistä:
   lepo (idle-asento), katse kohti kuvaa/sisältöä, ja yksi pieni reaktio
   (esim. lyhyt siivenräpsähdys tai pään käännös) — ei koko eleistöä
   (ei syömistä, ei kirjaa, ei sään efekteja).
4. **Reunus/varjo tumman pohjan päälle.** Linssit ovat tummapohjaisia
   (`css/satelliitti.css`, `css/aikajana.css` tumma peite) — hahmon on
   erotuttava tummalta, joten anna sille kevyt hehku/varjo tai ohut reunus,
   samaan tapaan kuin `.pollo-nappi.pollo-kelluu.pollo-kelluu-kartalla`
   linssiversio (`body.aikajana-paalla .pollo-nappi...`, `css/styles.css`
   rivi ~20469) tekee kelluvalle napille.
5. **Ei peitä pikkukuvia eikä sulkuristiä/palkkia.** Ehdota paikaksi
   OIKEAA ALAKULMAA (`position: fixed/absolute; right; bottom;` sopivalla
   marginaalilla ja `env(safe-area-inset-*)`-turva-alueilla) — mutta
   tarkista ensin itse tarkka törmäys pikkukuvarivin (`.satelliitti-nauha`,
   `.satelliitti-ala`) ja sulkuristin/-palkin kanssa käyttämässäsi
   linssissä, sillä sijainti ei ole täysin yhtenäinen linssien välillä
   (ks. yllä oleva huomautus). Jos oikea alakulma osuu päällekkäin,
   ehdota parempaa kulmaa perusteluineen.
6. **Pluskupla toimii kuten kartalla.** Jos minipulu näyttää kuplan (esim.
   kommentin kuvasta), käytä samaa kuplamekaniikkaa kuin
   `js/pollo.js` (`.pollo-kuplapino`, `.pollo-kuplapalautus` "+"-palautus)
   — ei uutta kuplatoteutusta.

**Rajaus:** Codex tekee HAHMON ja sen API:n — esim.
`luoMinipulu(container, {koko})` -tyylinen uusi pieni funktio (voi asua
`js/livia-svg.js`:ssä uutena export-funktiona tai uudessa pienessä
tiedostossa, kumpi on siistimpi ratkaisu — Codex päättää), tai vaihtoehtoisesti
olemassa olevan pulu-piirtäjän koko-/tilaparametri, joka mahdollistaa
saman pienen käytön. Fablen agentti kytkee sen linsseihin (satelliitti.js
ja muut) — Codex ei itse muokkaa `js/linssit/*.js`-tiedostoja tässä
tehtävässä, ellei se ole ainoa järkevä tapa todentaa toimivuus.

### Toimitus

- PR mainiin (haara vapaavalintainen, kuten aina).
- Mittaukset todellisessa selaimessa **390 px ja 1400 px** leveydellä
  (näytä minipulu jossain väliaikaisessa/testinäkymässä, koska varsinainen
  kytkentä tehdään Fablen puolella).
- Kuvakaappaus molemmista leveyksistä.
- Kuittaus postilaatikkoon (`posti/`), Codexin nimeämiskäytännöllä
  (esim. `posti/codex-minipulu-...md`), ja rivi `posti/fable-vanha.md`:n
  kärkeen viittauksena omaan kuittaukseen.

Muista: **ei mediatiedostoja repoon, ei API-avaimia repoon eikä lokiin.**
Hahmo on SVG/CSS, ei rasterikuva — pitäydy siinä, kuten `js/livia-svg.js`
tekee nyt.
