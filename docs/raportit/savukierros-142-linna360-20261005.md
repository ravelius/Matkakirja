# BUILD 142 linnan 360°-käsipyöritys, 5.10.2026 klo 10.34–10.43

Laitetestaaja (Sonnet 5.5, high). iPhone 18 Pro 1572C658. Build `juna-1.1.142-b42c04de` (BUILD 142 = master 62d5d1bb),
puhtaalla asennuksella. Linnan osoitin 27022c94. Kone kuormassa (Natiivisepän käännös samaan aikaan): toimintatesti,
ei fps- tai laatumittausta. Konsoliloki `kuvat/peli-loki-142-360.txt`, **0 Exception**.

## Tulos: OSITTAIN — veto pyörittää linnaa, täyttä 360°-kierrosta en todentanut

- Linna avautuu (`linssi poikkileikkaus`, ympäristö valmis 17,8 s, kuori huippu 12,7 s, 0 virhettä).
- Oikea veto (`touch_path`, ~510 pt, 7 pistettä) muutti kameraa joka kerta: yleisnäkymä → torni → ylhäältä → kappeli-/
  kierreportaat-lappujen näkymä (`kuvat/linna-360-a…c-142-20261005.png`). Veto siis vastaa.
- **Ei todennettu:** kierros täyteen 360°:een. `poikki mittaus` antoi kameran paikat (8,1/61,1/70,2) → (−66,9/0,5/−8,8) →
  (−67,8/−0,4/−32,1) → (72,9/71,9/103,1), mutta ne eivät ole yksiselitteinen kiertokulma: linnan kertoja (`linna-kertoja-piha`)
  ohjaa kameraa samaan aikaan ja korkeus vaihtelee. Tarvitaan ajo ilman kertojaa (`ui kuunnelma ohita` / kertoja pois) ja
  kiinteä korkeus.
- **Vaakanäkymä (sama kuin 1141 kohta 1):** linna on yhä kierrettynä 90° portrait-ruudulla simulaattorissa (kuvat). Ei
  todennettu fyysisellä laitteella; simulaattorin kierto ei seuraa sovellusta.
- Ruudulle jäi MATKA-paneeli linnan päälle. Se tuli omasta testikomennostani `ui linssi varusteet … paalla` (peli
  oli kartalla), joten en pidä sitä linnan viana; ei toistettu puhtaasti.

## Jäi tekemättä (aika loppui 10.55 rajaan / linnan polun etsintä vei ~8 min)
- 30488e2b:n jääneet kohdat (Laituri, huoneet, Mylly, radio, ISS-taulu, Jatka matkaa, lukijalista, kuvakatselin,
  ääniraita, dB, Kreikka-kortti).
- Zoomin uusinta (1141 kohta 2).
- Päätoimittajalle ei ole vielä äänellistä tallennetta.

## Menetelmä (talteen)
Linna avautuu ilman matkaa: `echo "linssi poikkileikkaus" > Documents/linssi-komento.txt` (peli käynnissä, kartta auki).
Konsoliloki: `perl -e 'use POSIX; fork and exit; setsid; exec @ARGV' xcrun simctl launch --console-pty …`.
Intro: Aloita seikkailu (201,635) → Valitse aloituskaupunki (201,605) → kaupunkimerkki → Ohita (355,803).
Savonlinna ei ole matkakohde (`matka savonlinna` → "tuntematon kaupunki").
