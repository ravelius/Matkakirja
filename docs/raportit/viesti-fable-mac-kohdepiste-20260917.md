# Viesti Fablelle: astronautin kameran kohdepiste, Mac-kalibrointi

17.9.2026 klo 18.55 Suomen aikaa · Opus-agentti · haara
`claude/bold-ride-vow4ki-mac-kohdepiste` (origin/main, v1932)

## Mitä mitattiin

Mainin Mac-ajo 35237332631 antoi savuke-astro-pallolle 101/102 ja yhden
punaisen: *kohdepiste on yhä klikattavissa (tyopoyta)* — piste
{x 761,8, y 503,8}, 81,9 px pallon keskiöstä, päällimmäisenä CANVAS,
`jälkeen []`. Puhelimella sama väite oli vihreä (55,3 px keskiöstä).

**Napautuksen mekanismi (kysymys 1).** Kohdepisteet EIVÄT ota osumia
itse: ne ovat CSS2D-elementtejä (`htmlElementsData`, js/pallolauta/
merkit.js, `MERKIN_KORKEUS = 0`) ja `pointer-events: none`
(css/styles.css `.pallolauta-merkki`) — siksi savukkeen mittari lukee
oikein `paalla: CANVAS, merkissa: false`. Osuma ratkeaa globe.gl:n
säteenjäljityksestä: `onGlobeClick` → `napautaPintaan(lat, lng)` →
`lahinLinssimerkki` → `lahin()`, joka projisoi sekä napautetun pinnan
pisteen että merkin takaisin ruudulle (`getScreenCoords`) ja vaatii
alle 44 px:n eron. Korkeus on 0, joten parallaksia ei ole — kierros on
sen sijaan **ruutu → 3D → ruutu**, ja se on herkkä sille, että
säteenjäljityksen kamera ja projisoinnin kamera ovat eri kehyksestä
(avausliu'un jälkisoutu, Macin kehysluku, rinnakkaiskuorma). Työpöydällä
pallo on 809 px (puhelimella 374 px), joten sama kulmapoikkeama on
työpöydällä yli kaksinkertainen pikseleinä — juuri siksi puhelin pysyi
44 px:n sisällä ja työpöytä ei.

## Mitä korjattiin (kysymys 2): PELIN vika

Pelaaja napauttaa näkemäänsä vihreää pistettä; jos kierros heittää,
mitään ei tapahdu. js/pallolauta/lauta.js: linssiportti kysyy nyt
lat/lng-polun jälkeen varapolun `linssimerkkiRuudulta()`, joka mittaa
osuman **sormen omasta ruutupisteestä** (sama `tuoreNapautuskohta()`,
jota viuhka jo käyttää) merkin ruutupisteeseen, sama 44 px:n säde.
Portti ei löysty: vain linssin `napautettavat()`-merkit, vain pallon
etupuolelta (`edessa`), ei kaupunkeja eikä nostoja.
tests/satelliitti.test.mjs ("yksi portti laudassa") päivitettiin
sallimaan varapolku ja vartioimaan sen rajat.

**Vaatii versionoston** (uusi-versio.mjs ajamatta, pelikoodi muuttui).

## Mittaukset

- savuke-astro-pallo (Mac, tyopoyta+puhelin, oma Chrome for Testing):
  **102/102 läpi**. Huomio: ajo käynnistyi ennen korjausta, ja
  työpöydän väite meni läpi jo vanhalla koodilla (piste 155,7 px
  keskiöstä) — punainen on siis kuormasta/geometriasta riippuva, ei
  deterministinen. Varsinainen vastakoe jää Mac-runnerin ajoon.
- `node --test tests/*.test.mjs`: **pass 3572, fail 0** (3585 testiä,
  13 skip).

## Oletukset

- Savuketta ei muutettu: se napauttaa oikeaan pikseliin (pisteen ytimen
  keskipiste, viewport-koordinaatit, dpr ei sotke) ja suodattaa pallon
  takapuolen merkit `pallolauta-takana`-luokalla. Vika oli pelin
  osumatestissä, ei mittarissa.
- Savuke valitsee keskiötä lähimmän pisteen; jos Mac-ajossa punainen
  toistuu vielä varapolun kanssa, seuraava askel on tarkistaa, ehtiikö
  `pallolauta-takana` päivittyä kuormassa ennen valintaa.
