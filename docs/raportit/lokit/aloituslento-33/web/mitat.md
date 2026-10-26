# Aloituslento (Lontoo → Ateena) — web-mittaus 27.9.2026

Mittaus: Playwright WebKit, iPhone-viewport 402×874 pt, dpr 3, tuotanto
`https://matkakirja.app/`. Simulaattori FBBD41D7 ei ottanut vastaan
synteettisiä napautuksia "Aloita seikkailu" -napista millään yrityksellä
(katso kohta 3), joten mittaus ja video tehtiin Playwright WebKit
-varapolulla, kuten tehtävänannon fallback-ohje salli. Koodiviitteet ovat
`origin/main`-haarasta (`git show origin/main:<polku>`).

## 1. Napautuksesta lennon alkuun — LEIKKAA KAHDESTI, EI JATKA NAPAUTUSNÄKYMÄSTÄ

Lähtökaupungin valinta tapahtuu OMALLA kiinteällä valintanäkymällä
(`aloitusnakyma`, js/pallolauta/lauta.js:2533), joka on aina sama Väli-
meren yllä oleva kuva (`ALOITUSVALINNAN_LAT/LON` = 30/17,
lauta.js:972-973) — pelaajan oma panorointi/zoomi ennen napautusta EI
säily talteen mihinkään. Kun pelaaja napauttaa Ateenan kohdemerkkiä
(`napautaKohde` → `ui.doPickStart('ateena')`, lauta.js:3027-3033),
tapahtuu järjestyksessä (js/ui.js `doPickStart`, rivi 12829 alkaen; ajat
mitattu tässä ajossa, ks. `kamera-naytteet.json`):

1. **Pergamenttiarkki peittää ruudun heti** (`naytaAloitusverho`,
   fade-in `ALOITUSVERHO_SISAAN_MS = 420 ms`, js/ui.js:650).
2. **Arkin TAKANA, näkymättömissä**, tapahtuu KAKSI erillistä kameran
   siirtoa, ei yksi:
   a. Pelitila siirtää pelaajan Ateenaan HETI (`game.actionPickStart`,
      doPickStart-kutsu js/ui.js:12951-12960), ja tavallinen laudan
      päivitys keskittää kameran suoraan Ateenan ylle — mitattu tässä
      ajossa ~1,6 s (t=0,6–2,3 s), päätyen leveyteen ~124 laudan-
      yksikköä (lähelle siirtonäkymän `PALLOLAUDAN_SIIRTOLEVEYS=120`,
      kamera.js:104). Tämä EI ole avauslento-moduulin liike vaan
      pelilaudan tavallinen "keskitä pelaajan kaupunkiin" -reaktio.
   b. Sen jälkeen kamera NOLLATAAN HYPPYNÄ (kesto 0, ei animaatiota)
      takaisin lennon lähtönäkymään Lontoon yllä — `js/ui.js`
      `aloituslentoSisalla`: `await this.kamera().ajaKamera(rajaus,
      {kesto: this.aloitusverho ? 0 : ALOITUSLENNON_AJO_MS, pakota:
      true})` (rivi ~22499). `rajaus` tulee `js/pallolauta/avaus.js`
      `luoAloituslennonKohtaus`:stä: lähtökaupungin (Lontoo) yllä,
      leveys `AVAUSLENNON_ALKULEVEYS = 600` (avaus.js:163).
   c. Rinnalla odotetaan reitin laattojen saapumista (katto
      `ALOITUSLENNON_LAATTA_ODOTUS_MS = 6000 ms`, js/ui.js:694) ja
      pohjatason valmistumista (katto
      `ALOITUSLENNON_POHJA_ODOTUS_MS = 12000 ms`, js/ui.js:679).
3. **Arkki häviää hitaammin** (`ALOITUSVERHO_ULOS_MS = 700 ms`,
   js/ui.js:651), ja paljastaa koneen JO valmiina kiitoradalla Lontoon
   yllä, oikeassa lentosuunnassa (ei kääntymistä).

**Mitattu kokonaisviive napautuksesta siihen, että kone alkaa näkyvästi
liikkua**: tässä ajossa (lämmin välimuisti) ~3,7 s; toisessa ajossa
(kylmempi) ~5,5 s. Ks. `kamera-naytteet.json` t=0…3702 ms (piilossa) ja
t=3702 ms alkaen (näkyvä nousu).

**Vastaus omistajan kysymykseen**: web EI lennä jatkuvasti siitä
pallonäkymästä, johon pelaaja napautti. Se leikkaa KAHDESTI arkin alla:
ensin (näkymättömästi) suoraan kohdekaupunkiin, sitten hypyllä takaisin
kiinteään Lontoo-näkymään, ja vasta silloin animoitu lento alkaa. Web ei
siis tällä hetkellä toteuta sitä, mitä omistaja pyytää natiivilta —
päinvastoin, web nollaa näkymän kokonaan ennen lentoa.

## 2. Kameran korkeus ja näkyvä ala

**Kaava** (js/pallolauta/kamera.js `korkeusLeveydesta`, rivit 268-284,
fov=`PALLO_FOV=50°` rivi 80):

```
asteet(leveys) = leveys × 360 / 12000
taso           = asteet / (kuvasuhde × 2·tan(25°)·(180/π))
kaari          = 1/cos(asteet/2) − 1                (pallon geometria, iso leveys)
altitude       = max(taso, kaari)                   (Globe.gl "altitude", pallon säteinä)
```

Kamera osoittaa AINA suoraan alas (`pointOfView({lat,lng,altitude})`,
ei kallistusparametria) — nadir-kuva koko lennon ajan.

**Mitattu laite**: pallon canvas 386×801 px (402×874 pt viewport miinus
otsikkopalkki), kuvasuhde ≈ 0,482.

| Vaihe | Lähdeleveys (yks.) | Rivi | Mitattu altitude (R) | Korkeus km (×6371) | Näkyvä leveys | Maan leveys, mitattu | Lat (alilaite) |
|---|---|---|---|---|---|---|---|
| ALKU (Lontoo) | `AVAUSLENNON_ALKULEVEYS`=600 | avaus.js:163 | 0,7043 | 4488 km | 18,0° | ≈1246 km | 51,5°N |
| HUIPPU (35 % kohta) | `AVAUSLENNON_HUIPPULEVEYS`=760 | avaus.js:182 | 0,8917 | 5680 km | 22,8° | ≈1649 km | 49,5°N |
| PERILLÄ (Ateena) | `PALLOLAUDAN_SAAPUMISLEVEYS`=240 | kamera.js:111 | 0,2817 | 1795 km | 7,2° | ≈593–629 km | 38–42°N |

(Maan leveys = asteet × 111,32 km × cos(leveysaste); pyöristetty.)

Mitatut altitude-arvot vastaavat SANATARKASTI koodin kaavalla laskettua
arvoa annetulla kuvasuhteella (esim. ALKU: laskettu 0,70426087,
mitattu 0,70426087 — sama luku 8 desimaaliin). Kaava ja mittaus siis
täsmäävät täydellisesti.

**PERILLÄ-korkeus EI ole suoraan kaupungin päällä**: saapumisasento
(kamera.js "SAAPUMISASENTO" -kommentti, ~rivi 875) siirtää kameran
KATSEPISTEEN kaupungin pohjois- ja hiukan itäpuolelle, jotta kaupunki
jää ruudun alimpaan kolmannekseen. Mitattu katsepiste Ateenan lennolla:
lat 42,19 / lng 24,51 (itse Ateena on 37,98 / 23,73) — ero johtuu
tarkoituksellisesta kuvasommittelusta, ei mittausvirheestä.

**Käyrän muoto** (avaus.js `lennonKorkeus`, rivit 264-282;
`liukuPehmennys`=smoothstep rivi 227; `lennonVaihe` rivi 244): kaksi
logaritmista liukua (`korkeusLiuku`) ease-in-out-käyrällä, nousu
ALKU→HUIPPU osuudella 0…35 % (`AVAUSLENNON_HUIPUN_KOHTA=0,35`,
avaus.js:190) ja lasku HUIPPU→PERILLÄ osuudella 35…100 %. Käyrällä on
täsmälleen yksi maksimi, derivaatta on nolla molemmissa päissä ja
huipulla — yksi tasainen zoomiliike alusta loppuun, ei nykäyksiä.
Sijainti kulkee isoympyrää (`lentokaarenKohta`, reitit.js) SAMALLA
vaiheella kuin korkeus, joten kamera, kone ja kasvava punainen jälki
ovat aina samassa kohdassa — kamera ei "seuraa" konetta erillisellä
viiveellä.

Mitattu korkeussarja 0,2 s välein on tiedostossa `kamera-naytteet.json`
(koko ajo, ml. piilossa oleva esivaihe). Poiminta näkyvästä lennosta
(t nollattu lennon alkuun):

| t (s) | lat | lng | altitude (R) |
|---|---|---|---|
| 0,0 | 51,50 | −0,11 | 0,7051 |
| 0,6 | 51,26 | 1,03 | 0,7490 |
| 1,9 | 49,52 | 7,69 | 0,8917 **(huippu)** |
| 3,5 | 47,65 | 13,14 | 0,7814 |
| 5,3 | 44,28 | 20,70 | 0,4412 |
| 7,3 | 42,45 | 24,07 | 0,2987 |
| 8,3 | 42,20 | 24,50 | 0,1458 → 0,2817 (asettuu) |

Toista aloituskaupunkia ei ehditty mitata erikseen; kaava on kuitenkin
kaupungista riippumaton — ALKU/HUIPPU/PERILLÄ-korkeudet ovat VAKIOITA
(eivät riipu etäisyydestä), vain reitin lat/lng ja lennon KESTO
vaihtelevat kohteittain. Kesto lasketaan saapumisrepliikin sanamäärästä:
`LENNON_POHJA_MS=2200 + sanat×LENNON_SANA_MS(210)`, katto
`LENNON_ENINTAAN_MS=20000` (js/ui.js:546-548).

## 3. Video ja kuvat (iPhone)

Simulaattori FBBD41D7 (natiivisepän oma) BOOTATTIIN tätä varten ja
SAMMUTETTIIN mittauksen jälkeen (vain tämä UDID, ei `shutdown all`).
`xcrun simctl openurl` avasi tuotantosivun ja peli LATAUTUI, mutta
`Aloita seikkailu` -nappi ei reagoinut millään testatulla
tap-koordinaatilla/kestolla simulaattorin oman Safari-selaimen kautta
(neljä yritystä, eri koordinaatit ja pituudet) — todennäköisesti
simulaattori-Safarin oma aloitusportti/gesture-vaatimus, ks. tehtävän
fallback-ohje. Siirryttiin Playwright WebKit -varapolkuun samalla
iPhone-viewportilla (402×874, dpr 3) tuotanto-osoitteessa.

Tiedostot tässä kansiossa:
- `web-aloituslento-iphone.mp4` (21,2 s, rajattu napautuksesta
  saapumiskorttiin asti alkuperäisestä 45,7 s:n istuntotallenteesta)
- `web-koko-sessio-raaka.webm` — koko istunto raakana (varmuuskopio)
- `kuva1-valintanakyma-ennen-napautusta.png` — juuri ennen napautusta
- `kuva2-napautushetki.png` — 80 ms napautuksesta (näkymä ei ole vielä
  muuttunut; arkki ei ole ehtinyt peittää)
- `kuva3-huippu.png` — lennon huippu (kone Saksa/Sveitsi-rajalla,
  repliikki "Kone nousee...")
- `kuva4-saapumiskortti.png` — "ATEENA · PÄIVÄ 1/80" -siirtymäkortti
- `kuva5-lopputulos.png` — Ateenan maalehti (saapumisnäkymä)
- `kamera-naytteet.json` — koko mitattu pointOfView-sarja 0,2 s välein

Ääni ei ollut mittauksen esteenä (Playwright-selain ei toista ääntä
oletuksena); simulaattorin äänenvoimakkuutta ei muutettu pysyvästi.

## Mitä ei onnistunut / rajoitukset

- Simulaattorin oma Safari ei ottanut vastaan `Aloita seikkailu`
  -napautusta millään testatulla tavalla → siirryttiin Playwright
  WebKit -varapolkuun (sallittu tehtävänannossa).
- Toista aloituskaupunkia ei mitattu ajanpuutteen vuoksi; kaava ja
  vakiot (ALKU/HUIPPU/PERILLÄ) ovat kuitenkin samat kaikille kohteille.
- "Kuva3-huippu" napattiin heuristisesti (korkeuden suunnanvaihdosta),
  ei tismalleen 35,0 %:n kohdalta — poikkeama muutama sata ms.
- FBBD41D7 boottaus/sammutus tehtiin itse tämän tehtävän puitteissa;
  muita simulaattoreita ei koskettu.
