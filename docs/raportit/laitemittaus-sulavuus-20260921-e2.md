# Sulavuusmittaus, kierros 2 — Pelikoodarin dev-pikatiellä, uusi este löytyi tarkemmin

21.9.2026 n. klo 13.00 Suomen aikaa. Jatkoa: `docs/raportit/
laitemittaus-sulavuus-20260921.md` (haara laitetestaaja-
sulavuusmittaus). Pelikoodari toimitti dev-pikatien
(`?lauta=pallo&dev=<kaupunki>`, haara `pelikoodari-nimiot-sulavat-e2`,
commit `8c288ca1`) ja diagnostiikkafunktion `ui.pallolauta.tila()`.

## Mitä tehtiin

Lokaali http-palvelin (`python3 -m http.server 8792`) tällä haaralla,
iPad Pro 11" (M5) -simulaattori, `http://localhost:8792/
index.html?lauta=pallo&dev=marseille`. Koska sivun oma konsoli ei ole
käytettävissä oikealla laitteella, luin tulokset `localStorage`ista
suoraan (`sqlite3` WebKitin `localstorage.sqlite3`-tiedostosta) —
sama tekniikka kuin aiemmissa kierroksissa. Ajoin `await
window.matkakirja.pikatie`, kirjasin `tila()`-tuloksen, käynnistin
`sulavuus.aloita()`, odotin 7,5 s (ei koskettanut laitetta tällä
kertaa — ensin haluttiin nähdä tuottaako pikatie edes dataa), ja
kirjasin `yhteenveto()`.

## Tulos: pikatie korjasi saapumisluennon/dialogit, MUTTA DOM on yhä tyhjä

`tila()`-luenta n. 1,2 s pikatien valmistumisen jälkeen:

```json
{"nukkuu":false,"kehyksia":335,"lepoTarpeen":false,"kuoriPiilossa":false,
 "sivuPiilossa":false,"saapumiskorttiAuki":false,"dialogejaAuki":0,
 "kotelo":{"w":813,"h":1057},"kuollut":false,"lento":false,"linssi":false,
 "merkkeja":{"nostot":65,"nimet":2,"peli":1},
 "domissa":{"nimet":0,"nostot":0},
 "korkeus":0.2049,"versio":"2026-08-09.1989"}
```

Kaikki tunnetut estoportit ovat KIINNI (ei nukkumista, ei
saapumiskorttia, ei dialogeja, kuori näkyvissä, sivu edessä) —
kameraloki (`matkakirja-kameraloki`) vahvistaa oikean kamera-ajon
tapahtuneen (`2.5 → 0.2049`, laukaisija `avaaPikatie`,
`kaupunki:"marseille"`). **`merkkeja.nostot:65` ja `merkkeja.nimet:2`
kertovat, että ladonta LASKI sijoitukset** (65 nostoehdokasta, 2
nimeä budjetin mukaan) — **mutta `domissa.nimet:0` ja
`domissa.nostot:0`: ei yhtään näistä päätynyt oikeaksi DOM-
elementiksi.**

Sulavuusmittari vahvistaa saman koko 7,5 s:n ikkunan ajalta:

```json
{"kehyksia":406,"fps":55,
 "siirtyma":{"mediaani":0,"p95":0,"n":0,"pahin":null},
 "koko":{"liikkui":0,"liikkuiJaKokoMuuttui":0,"osuus":0,"lepoaskel":0,"liikeaskel":0},
 "dpr":2}
```

**fps on nyt oikea luku (55) — ensimmäistä kertaa saatiin edes
kehysnopeus oikealta laitteelta**, mutta `siirtyma.n:0` koko
mittausikkunan ajan: ei yhtään nimiö/nosto-merkkiä ollut DOM:issa
milloinkaan mitattaessa, joten siirtymä-/kokoluvut ovat tyhjiä. En
ehtinyt koskettaa laitetta oikealla sormella tässä ajossa (halusin
ensin nähdä syntyykö dataa ollenkaan ilman kosketusta) — kosketustesti
on turha ennen kuin `domissa`-luvut saadaan nollasta ylöspäin.

## Ero savukkeeseen

`tools/savukkeet/savuke-nimiot-sulavat.mjs` saa Chromium-selaimessa
oikeat nimiöt/nostot samalla `saavu({kesto:0})`-kutsulla. Pikatie
(`js/kehittaja-pikatie.js`) tekee saman peliobjektin ja saman
`saavu`-kutsun, ja `tila()`:n mukaan mikään tunnettu esto (nukkuminen,
kortti, dialogi, kuori, sivun näkyvyys) ei ole päällä — silti ero
WebKit/iPadOS Safarin ja Chromiumin välillä on täysi (2 vs. 0 nimeä
DOMissa). Epäilen jompaakumpaa: (a) `nimet.lado()`/nostojen
sijoitusfunktio TÄYTTÄÄ paluuarvon (`merkkeja`-luvut vahvistavat tämän)
mutta ei koskaan kutsu itse DOM-liitosta (`appendChild`/`insertBefore`)
WebKitillä — mahdollisesti CSS2D-kirjaston (three.js `CSS2DRenderer`)
oma renderöintisilmukka ei ehdi/käynnisty ajoissa reaalilaitteella,
tai (b) jokin WebKit-spesifi ajoitusero (esim. `requestAnimationFrame`
throttlautuu simulaattorissa eri tavalla kuin Chromiumissa).

## Pyyntö Pelikoodarille

`tila()` on jo erinomainen työkalu — ehdotan seuraavaksi vastaavaa
laskuria itse DOM-liitoskohtaan (esim. `nimet.js`/`nostot.js`:n
`appendChild`-kutsun viereen) tai `tila()`:n laajennusta kertomaan
MILLÄ RIVILLÄ/EHDOLLA sijoitetut merkit hylätään ennen DOM:iin
pääsyä — pelkkä `merkkeja` vs. `domissa`-erotus ei vielä kerro miksi
DOM-liitos ei tapahdu. En mennyt itse koodiin kiinni, koska omistan
vain lukevan/mittaavan roolin ja tämä on nyt selvästi tarkkaa
koodilukua vaativa jatkoselvitys.

## Ympäristö

- iPad Pro 11" (M5), UDID `503000D1-34AC-4C42-BDF8-7E36753A87CD`,
  käynnistetty ja sammutettu tässä sessiossa, Julkaisijalle
  ilmoitettu molemmat kerrat.
- Lokaali http-palvelin `:8792` pysäytetty session lopussa.
- Tilapäinen apuskripti (`js/laitetestaaja-harness2.js` + yksi
  `<script>`-rivi `index.html`:ään) poistettu työhakemistosta,
  EI committoitu — helppo rakentaa uudelleen tästä raportista jos
  Pelikoodari haluaa toistaa saman mittauksen.
