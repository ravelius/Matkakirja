# Pelikoodari → Fable: nimiöiden sulavuus E2 ja E3 (21.9.2026)

Omistaja: "KARTAN SULAVUUS ENSIN". E1 (mittari, c1d7b379 → rebasattu
539d1f27) mittasi juurisyyt; tämä raportti kattaa E2:n ja E3:n.
Haarat (kaikki pushattu, pohja origin/v1973-prep):

| Haara | Commit | Sisältö |
| --- | --- | --- |
| `pelikoodari-dev-pikatie` | adce076a (+ diagnostiikka) | `?lauta=pallo&dev=<kaupunki>`, `ui.pallolauta.tila()` |
| `pelikoodari-nimiot-sulavat` | 539d1f27 | E1 mittari (rebasattu prepiin) |
| `pelikoodari-nimiot-sulavat-e2` | 8c288ca1 | E2 + pikatie-merge |
| `pelikoodari-nimiot-sulavat-e3` | (tämä) | E3, e2:n päällä |

Julkaisijalle järjestys: pikatie → sulavat → sulavat-e2 → sulavat-e3.

## E2 — koko liukuu joka kehyksessä (1af0d609)

- Ladonta kirjoittaa vain POHJAN (nimen `font-size`, noston
  `scale(mitta)`) entiseen tapaan 200 ms:n tahdissa. Kotelon CSS-muuttuja
  `--nimiokerroin` = kameran mittakaava nyt / ladonnan mittakaava
  kirjoitetaan pallon kehyskoukusta (`pisteetKehyksessa`) joka kehys,
  yksi tyylikirjoitus, vain kun luku muuttuu; css skaalaa merkin
  SVG-kuoren (`.pallolauta-nimi > svg`, `.pallolauta-nosto > svg`,
  `.pallolauta-turisti-info > svg`) merkin omasta pisteestä.
- Kuori kertoo kaiken sisällä olevan (kirjasinkoko, kirjainväli, lukon
  dx/dy) samalla kertoimella kuin ladonta itse (`skaalattuLukko`), joten
  pohja × kuori on jatkuva ladonnan yli. `korjaus` = porrastamaton /
  porrastettu kerroin → kuori näyttää porrastamattoman koon, ladonnan
  0,5 %:n porras ei näy.
- Katto (PAATOKSET 31 kohta 2) pätee kehyksittäin: merkin omat
  `--nimio-a` (raaka/katettu) ja `--nimio-b` (katto/katettu) →
  `scale(min(kerroin·a, b))` = min(raaka·kerroin, katto).
- Kehyksessä ei mittoja: kerroin lasketaan kameran korkeudesta
  (`leveysKorkeudesta`), ruudun leveys supistuu pois.
- Luokka `pallolauta-liikkuu` sammuttaa sisäryhmien CSS-siirtymät
  liikkeen ajaksi; pois lepoladonnan JÄLKEISESSÄ kehyksessä.
- `?nostokoko=0` → `pallolauta-nostot-ruutuvakio` (nostot eivät liu'u).
- Sisäryhmien `style.transform` pysyy `scale(mitta)`-muodossa → kaikki
  mittaavat savukkeet (pariisi-lahizoom, nostoankkurit, aihemerkit,
  liuskan-pohja, kohdemaan-merkit) lukevat yhä ladonnan pohjan.

Mitattu ikkunallisena (Mac Studio 60 fps, 390 dpr 2 ja 1400):

| | ennen (E1) | E2 |
| --- | --- | --- |
| koko muuttuu liikkeen kehyksistä | 77–79 % | 97 % |
| yhden kehyksen kokoporras | 15–17 % | 0 |
| zoomin pahin siirtymä | 3,2 / 4,1 px | 0,7 / 0,7 px |
| panorointi | 0 px | 0 px |

Savuke `savuke-nimiot-sulavat` sai vartiot 5 (katto liikkeessä ≤ 16 px
joka kehys) ja 6 (levossa kuori 1 ± 0,3 %, liikkeen luokka pois).

## E3 — kylkivaihdon häivytys ja kehyksen keventäminen

- Kylkivaihto häivyttää, ei hyppää (Fable hyväksyi): kun noston resepti
  eroaa vain kyljen osalta ja nimiö on näkyvissä, vanha nimiökuva jää
  häipymään (`.nostosym-nimio-vanha`, 180 ms, sama siirtymä kuin
  sovittelun piilotus) ja uusi kylki tulee häivytyksellä
  (`.nostosym-nimio-tulee` → pois seuraavassa kehyksessä). Ikoni on oma
  rasterinsa pisteessä eikä liiku. Vartio 7 savukkeessa.
- Kirjaston merkkitween (`htmlTransitionDuration`) pois liikkeen ajaksi
  (`merkit.kirjastonSiirtyma`, prop on triggerUpdate:false → halpa),
  takaisin levossa: lukittu ankkuri ilman tweeniä.
- DOM-kirjoitukset vain muuttuneille (`asetteleNosto`, `asetteleNimi`:
  transform, font-size, text-anchor, font-variant, letter-spacing,
  dataset).
- Pelimerkkien laatikot (`merkit.laatikot('peli')`, getBoundingClientRect)
  luetaan KERRAN per ladonta kolmen sijaan — ennen jokainen luenta
  väliin osuneiden DOM-kirjoitusten jälkeen pakotti uuden asettelun
  (Karttasepän iPad-profiilin "getClientRects 1,2 s").

EI TEHTY (odottaa iPad-mittausta): ladonta paloissa ≤ 4 ms/kehys.
Ladonnan vaiheet (nostot → nimet → sovittelu) kirjoittavat DOMia
välissä, joten paloittelu näyttäisi välikehyksiä; kannattaa vasta kun
Laitetestaajan luku kertoo, paljonko yksi lepoladonta iPadilla nyt
maksaa E2/E3:n jälkeen.

## Laitetestaajan este (iPad: merkkejä 65, DOMissa 0)

Pikatie toimii (nukkuu:false, dialogit kiinni, 55 fps). Uusi
diagnostiikka `tila()`:ssa: `elementit` (datumeja / luotu / liitetty),
`css2d` (kirjaston CSS2D-juuri ja sen lapset) ja `virheet` (pikatie ottaa
talteen error + unhandledrejection). Luotu 0 → `htmlElement`-tehdas
(nostoElementti/nimiElementti) kaatuu WebKitissä; luotu > 0, liitetty 0
→ CSS2DRenderer.render ei aja. Chromiumissa 64/64/64.

## Testit ja savukkeet (E3-haara)

node --test 0 fail. savuke-nimiot-sulavat ikkunallisena 16/16;
headless-sarja ks. viesti.
