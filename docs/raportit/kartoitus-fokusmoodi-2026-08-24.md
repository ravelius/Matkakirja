# Koodikartoitus fokusmoodia varten (24.8.2026)

Explore-agentin raportti fokusmoodin toteutusta varten; rivinumerot
haaran `claude/matkakirja-julisteet-finish-h235w7` tilasta 24.8.2026.
Linjaukset: Raamatun osio "Fokusmoodi". Tämä on kertaraportti, ei ohje.

## 1. Maailmankartta

- Piirto: SVG, juuri `index.html:283` (`#board`, viewBox 0 0 1000 1000).
- Täyttö ajossa `js/ui.js` (~4023–4200): drawPaperPohja/drawParchment/
  drawLand/drawMaasto (`js/mapart.js`, 3091 riviä), sitten
  `linssiKerros`, `country-borders`, `country-names`, kaupungit/laatat.
- Staattinen osa (~6500 elementtiä) rasteroidaan bittikartaksi
  suorituskyvyn takia: `js/mapart.js:2447` (pilkoTaide),
  `:2558` (kokoaRuudunTaide). Fokusmoodin sumennus/tarkennus pitää
  sovittaa tähän rasterointiin.
- Kamera/zoom/pan: `js/kartta.js` (luokka Kartta, rivi 166; zoomiTasot
  530, zoomaaMantereelle 952, panorointi 1218). Zoom-napit
  `index.html:322–327`. "Kiikari"-blur-efekti on jo olemassa:
  `index.html:329–331` + `.kiikari` CSS:ssä.
- Maiden muodot: `js/packs/europe.js` mainlandPoints = Natural Earth
  10m, projektio `x=(lon+11)*19.2, y=(72-lat)*26.3`; EI käsin, vaan
  `tools/mapdata/`-työkaluilla. Maailmankartta:
  `js/packs/maailmankartta.js` (koneen kirjoittama, Miller 12000×5399,
  ketju tools/tee-maailmankartta.mjs → satamat-rannalle.mjs →
  korjaa-merireitit.mjs).
- Linssikerros (valmis malli "kartan päälle kytkettävälle
  kerrokselle"): `js/ui.js:4115–4119` + `js/linssit/kerros.js`
  (ladataan vasta aktivoituessa; kerrosjärjestys: staattisen kartan
  päällä, pelitilan alla, pointer-events none).

## 2. Käyty/ei-käyty

- Pelikohtainen: `world.visited` (Set), `js/game.js:372`, visitCity
  820–836; tallentuu pelitallenteeseen (toJSON 2465–2509, avain
  localStorage `matkakirja-save-v1`, `js/main.js:33`).
- Pysyvä lautaleima: `js/passport.js` (STAMP_KEY
  `matkakirja.passi.v1`, lautatasolla, iCloud-synkattu).
- HUOM: pysyvää kaupunki-/maakohtaista käyntitietoa pelikertojen yli
  EI ole — fokusmoodin maiden tarkentuminen kannattaa sitoa
  pelitallenteen `world.visited`-settiin (fokus seuraa käynnissä
  olevaa peliä).

## 3. Alanapit ja pöllö

- Kolme alanappia: `index.html:401–404` (#actions), grid 3 saraketta
  `css/styles.css:15524–15531`; rakennus `js/ui.js:5458–5527`
  (vasen=matkustus/kompassi, keski=pollo-paikka, oikea=Tutki
  5437–5456). Kommenteissa omistajan 12.8. kolmen napin linjaus —
  UUSI 24.8. linjaus (pöllö sivuun, kaksi nappia) ohittaa sen.
- Pöllön kellunta ON JO OLEMASSA: `js/pollo.js` kiinnitysKohde
  1476–1490, ankkuroi/kiinnita 1493–1507, luokka `pollo-kelluu`;
  CSS `css/styles.css:15617–15680` (position fixed, oikea alakulma).
  Pysyvä leijunta = ankkuroinnin oletukseksi kelluva tila.
- Pöllön kuva: `assets/tietaja/viisas-pollo.jpg` (js/pollo.js:618);
  napin SVG-ikoni POLLO_IKONI js/pollo.js:574–583.

## 4. Kehittäjätila ja kytkimet

- Avain `matkakirja-kehittaja`: `js/ui-apurit.js:822–839`
  (kehittajaTilaPaalla/asetaKehittajaTila); kytkentä
  `js/main.js:1014–1065` (SHA-256); nappi muutosloki-dialogissa
  `index.html:84–87`.
- Dev-lisät: laattanapautus (`js/ui.js:4803–4817`), valmiusvärit
  (`4406–4439`), Työhuone-kotelo (`index.html:197–243`),
  kehittäjälehdet (`js/lehti.js:773–789`).
- Matkalaukku = `#turn-pill` YLÄPALKISSA `index.html:119–123`;
  omistajan tilaama fokusmoodi-kytkin (vain dev-tilassa) tulee sen
  oikealle puolelle topbariin; lisäksi dev-nappi sumennukset
  päälle/pois.

## 5. Kreikka/Ateena-sisältö

- Laatta: `js/packs/europe.js:391–393` (id 'ateena', start:true,
  airport:true, x667 y895).
- Kysymykset: `js/packs/europe-questions.js:1023–1061`
  (EUROPE_QUESTIONS.ateena, 5 kpl: Parthenon, demokratia, 1896
  olympialaiset, "akropolis"-sana, Plaka). Poiminta
  `js/game.js:2213–2239` (pickQuestion, id-avain pienellä).
  EUROPE_FACTS:ssa ei ateena-avainta; laudan aarre =
  Meripihkahuone (`js/packs/europe.js:604–647`). "Aarrekysymys"
  fokusmoodissa = laatan kysymys joka paljastaa aarteen.
- Kaupunkilehti: `js/packs/europe-artikkelit.js:605–646` (avain
  'Ateena'); kuvat `europe-valokuvat.js:387–` (ateena.lisat);
  kulttuurinostot `europe-kulttuuri.js:132–`; saapumisteksti +
  luenta `europe-saapumiset.js:70–81` (ääni
  puhe-europe-saapuminen-ateena.mp3).
- Maalehti Kreikka: `europe-artikkelit.js:970–1002`; maan muoto
  `europe-countries.js:95–114` (GRC, kolme rengasta: manner,
  Kreeta, Rodos); liitos `ateena: 'GRC'` rivi 430.
- Avaimet: lehdet wiki-nimellä ('Ateena'/'Kreikka'), kysymykset
  id:llä ('ateena').

## 6. Asetusmalli

Ei keskitettyä asetusnäkymää; vakiintunut kaava = oma
localStorage-avain + try/catch (esim. KEHITTAJA_AVAIN,
js/sound.js:355–372, LINSSI_AVAIN ui-apurit:279). Fokusmoodille oma
avain (esim. `matkakirja-fokusmoodi`) samalla kaavalla; luku kerran
UI-konstruktorissa (vrt. this.kehittajaTila ui.js:1606).

## Kiinnityskohdat (yhteenveto)

1. Kytkin: oma avain ui-apurit-kaavalla; nappi topbariin
   matkalaukun viereen, näkyy vain dev-tilassa (muille aina päällä).
2. Kartan sumennus/tarkennus: laudan piirtoon ui.js ~4406–4439
   -mekanismin tapaan (CSS-luokat per maa/kaupunki) + huomioi
   staattisen taiteen rasterointi.
3. Linssikerros on valmis malli erilliselle fokus-kerrokselle.
4. Pöllön pysyvä leijunta: pollo.js:n ankkurilogiikan oletukseksi
   kelluva tila; alarivin grid 3→2 (Liiku + Tutki).
5. Maakohtainen tarkentuminen sidotaan world.visited-settiin
   (pelitallennekohtainen).
