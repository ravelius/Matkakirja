# Fable max → päätoimittaja: M3 valmis — mallin B pilotti onnistui

17.8.2026, haara `claude/fable-max-m3`.

## M3 (v815): liput, karttazoom ja vertailutila omiksi moduuleiksi

Ensimmäinen METODIEN siirto (malli B — funktiot saavat ui-olion
ensimmäisenä parametrinaan):

- js/liput.js (172 r): avaaLippuikkuna — osoittautui täysin
  this-vapaaksi, siirtyi puhtaana funktiona ilman ui-parametria.
- js/karttazoom.js (339 r): kytkeKarttaZoom-widget — ainoa
  ui-kytkös on reducedMotion-luku.
- js/vertailu.js (373 r): vertailutila + Maiden tiedot -tila,
  12 funktiota + VERTAILU_MAX + VERTAILUVARIT-toisinto (syy:
  maakayrat.js on laiska tuonti — dokumentoitu tiedostossa).
- ui.js: 17 912 → 17 071 riviä (lähtötasosta 19 167 → −2 096, −10,9 %).
- TOAST_MS siirtyi ui-apureihin (vertailu tarvitsee sen ilman
  kiertotuontia).

MALLIN B TARKENNUS pilotista (esitän kirjattavaksi suunnitelmaan):
siirretty koodi saa LUKEA ui:n tilaa ja kutsua sen julkisia
metodeja, ja KIRJOITTAA vain oman piirteensä kenttiä (ui.vertailu*,
ui.maatiedot*) — täyskielto this-kirjoituksille olisi vaatinut
tilan siirtoa moduulitasolle, mikä rikkoisi UI:n elinkaaren
(destroy/uudelleenluonti).

## Portit

739/739 · ei kaksoisavaimia · niputusvartija vihreä (104
moduulia) · standalone käynnistyy selaimessa (5/6, vanha
pöllö-FAIL) · tests/vertailutila.test.mjs päivitetty lukemaan
vertailu.js:ää (7 tekstihakua siirtyi).

## TODENNUS siirretylle widgetille + kaksi vanhaa työkaluvikaa

Ajoin tools/savuke-karttazoom.mjs:n sekä haarallani että puhtaassa
main-työpuussa: TULOKSET IDENTTISET rivi riviltä — kaikki zoom-,
panorointi-, nipistys- ja tuplanapautustarkistukset OK siirretyllä
widgetillä. Samalla paljastui kaksi MAINISSA ENNESTÄÄN olevaa
savukevikaa (en koskenut):

1. "EI numeroympyrä ei paisu zoomatessa (vastaskaalaus)" —
   feilaa myös mainissa.
2. Savuke KAATUU kesken ajon (pyyhkaise, rivi 443:
   getBoundingClientRect null) — myös mainissa; loppupään
   tarkistukset eivät koskaan aja. Kirjaa työjonoon.

## Seuraavaksi

Suunnitelman M4 (opas + nähtävyydet) odottaa O-pakettien
tilannetta — se on SINUN ajoituskutsusi, koska alueet ovat
sisältötyön alla. Jos O-paketit ovat kesken, voin sillä välin
aloittaa dokumenttiremontin D1:n (roolitus-siivous) tai D2:n
(moduulit-kansio + testilaajennus), jotka eivät kosketa koodia.
Kerro merge-kommentissa kumpi — luen sen API:lla kun mergeät
(mergesi herättää minut). Muista poistaa tämä tiedosto ennen
squashia.
