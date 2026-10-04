# Savukierros 1.1 (139) — UUSINTA, 4.10.2026 klo 19.4x–19.5x

Laitetestaaja (Sonnet 5.5, high). iPhone 18 Pro 1572C658, simulaattori. Aloitettu Julkaisijan luvalla (simu vapaa
19.47). Build 78b2df72 (juna/b13 1010d940, 4d10ee18 + siirtoseppa/valikko-lapaisy c1d84a94 [korjaus edellisen 1139:n
k1-toistobugiin] + linssiseppa2/cupola-mittari 06ce558b). Tarkistus: app poistettu+asennettu uudelleen junasta,
`kaannos.txt` = 78b2df72, binäärin md5 täsmää. Konsoliloki päällä, puhe päällä, **0 Exception / 0 virhe-riviä**
(2015 riviä).

## Tulos: PASS kaikista pyydetyistä osista

### 1) Tavallinen savuke — PASS

### 2) Kertojan neljä jaksoa — PASS (korjaa edellisen kierroksen "todentamatta"-löydöksen)
Löytyi nyt kaikki neljä jaksoa: **jarvelta, tornit, piha, laituri** (kukin 11,8–20,2 s). Edellisellä kierroksella
löytyi vain kolme, koska en käynyt riittävän pitkään — nyt vahvistettu suoraan lokista.

### 3) Nimiruutu, linna avautuu ilman 60 s -virhettä — PASS
"OLAVINLINNA / Savonlinna · 1475" latautui 25,9 s:ssa, selvästi alle 60 s. Puhdas asennus, ei valkoisia palikoita.

### 4) Huoneesta toiseen, k1 kerran per huone — PASS (korjaus vahvistettu, aiempi bugi ei toistu)
Testattu täsmälleen pyydetty kolmen huoneparin sarja Huoneet-valikosta, jokainen varmistettu sekä lokilla että
kuvalla ennen seuraavaa siirtymää:
- **Keittiö → Fatabuuri**: `fatabuuri-k1` alkoi kerran, näkymä pysyi Fatabuurissa (oma huonekortti "AITAN HOITAJA",
  `linna-huoneesta-toiseen-fatabuuri-1139u-20261004.jpg`) — **ei** keittiö-k1:n toistoa.
- **Fatabuuri → Kappeli**: `kappeli-k1` alkoi kerran, näkymä pysyi Kappelissa ("PAPPI",
  `linna-huoneesta-toiseen-kappeli-1139u-20261004.jpg`) — **ei** fatabuuri-k1:n toistoa.
- **Kappeli → Keittiö**: `keittio-k1` alkoi kerran, näkymä palasi Keittiöön ("KOKKI",
  `linna-huoneesta-toiseen-keittio-paluuu-1139u-20261004.jpg`) — **ei** kappeli-k1:n toistoa.

Edellisen kierroksen (d1ece908) FAIL-löydös (Keittiö→Fatabuuri palasi Keittiöön) **ei toistunut kertaakaan** tällä
kierroksella — korjaus c1d84a94 toimii. (Huom: "napautus suoraan huoneeseen yleisnäkymästä" ei ehditty testata
erikseen ajan puitteissa — huonevalikon kautta siirtyminen oli pääfokus ja vahvistettiin perusteellisesti.)

### 5) Cupolan kylmä ensiavaus: Maa terävä heti mustan jälkeen — PASS
Uusi telemetria vahvistaa: `cupolan musta häivyy 2277 ms (… lataamattomia laattoja 0/56, karkeita 0, lataus 93 %)`
ja `cupolan jälkeen 500 ms: … karkeita 0, lataus 100 %`. Kuva heti mustan jälkeen
(`cupola-kylma-maa-terava-1139u-20261004.jpg`): Maapallo näkyy tasaisena, terävänä sinisenä kaarena ilman
sumeutta/mosaiikkia ✔.

Kuvat: `docs/raportit/kuvat/*1139u-20261004*.jpg`, `cupola-kylma-maa-terava-1139u-20261004.jpg`. Täysi loki:
`docs/raportit/kuvat/peli-loki-1139-uusinta.txt`.
